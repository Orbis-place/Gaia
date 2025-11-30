import { Embeds } from '@/consts/Embeds';
import { getRoadmapData } from '@/dal/roadmap';
import { generateRoadmapComponent } from '@/lib/embeds/roadmap/generateRoadmapComponent';
import Command from '@/types/Command';
import { ChannelType, MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

const command: Command = {
   data: new SlashCommandBuilder()
      .setName('roadmap')
      .setDescription('Send the roadmap embed in a specific channel.')
      .addChannelOption((option) =>
         option
            .setName('channel')
            .setDescription('The channel to send the roadmap embed in.')
            .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
            .setRequired(true),
      ),
   info: {
      description: 'Send the roadmap embed in a specific channel.',
      usageExample: '/roadmap (channel)',
      permissionsRequired: [PermissionFlagsBits.Administrator],
   },
   async execute(gaia, interaction) {
      const channel = interaction.options.getChannel('channel', true, [
         ChannelType.GuildAnnouncement,
         ChannelType.GuildText,
      ]);

      const roadmapData = await getRoadmapData();
      if (!roadmapData || roadmapData.length === 0) {
         return gaia.error('ROADMAP_FETCH_FAIL', 'Failed to fetch roadmap data.', interaction, true);
      }
      try {
         channel
            .send({ ...generateRoadmapComponent(roadmapData), flags: [MessageFlags.IsComponentsV2] })
            .then(async (msg) => {
               await gaia.database.live_channel_message.create({
                  data: {
                     message_location: `${msg.guildId}_${msg.channelId}_${msg.id}`,
                     last_fetched: roadmapData as object,
                     type: 'ROADMAP',
                  },
               });
               return interaction.reply({
                  embeds: [Embeds.SUCCESS.setDescription(`Successfully sent roadmap embed in ${channel}.`)],
               });
            });
      } catch (x) {
         gaia.logger.error('Error sending roadmap embed:');
         gaia.logger.error(x);
         gaia.error(
            'ROADMAP_EMBED_SEND_FAIL',
            'An error occurred trying to send the roadmap embed.',
            interaction,
            true,
         );
         return;
      }
   },
};

export default command;
