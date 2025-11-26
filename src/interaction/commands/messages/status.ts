import { Embeds } from '@/consts/Embeds';
import { getCompositeServiceStatus } from '@/dal/status';
import { generateStatusComponent } from '@/lib/embeds/generateStatusEmbed';
import Command from '@/types/Command';
import { ChannelType, MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

const command: Command = {
   data: new SlashCommandBuilder()
      .setName('status')
      .setDescription('Send the status embed in a specific channel.')
      .addChannelOption((option) =>
         option
            .setName('channel')
            .setDescription('The channel to send the status embed in.')
            .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
            .setRequired(true),
      ),
   info: {
      description: 'Send the status embed in a specific channel.',
      usageExample: '/status (channel)',
      permissionsRequired: [PermissionFlagsBits.Administrator],
   },
   async execute(gaia, interaction) {
      const channel = interaction.options.getChannel('channel', true, [
         ChannelType.GuildAnnouncement,
         ChannelType.GuildText,
      ]);

      const statusData = await getCompositeServiceStatus();
      if (!statusData) {
         return gaia.error('STATUS_FETCH_FAIL', 'Failed to fetch service status data.', interaction, true);
      }
      try {
         channel
            .send({ ...generateStatusComponent(statusData), flags: [MessageFlags.IsComponentsV2] })
            .then(async (msg) => {
               await gaia.database.live_channel_message.create({
                  data: {
                     message_location: `${msg.guildId}_${msg.channelId}_${msg.id}`,
                     last_fetched: statusData as object,
                  },
               });
               return interaction.reply({
                  embeds: [Embeds.SUCCESS.setDescription(`Successfully sent status embed in ${channel}.`)],
               });
            });
      } catch (x) {
         gaia.logger.error('Error sending status embed:');
         gaia.logger.error(x);
         gaia.error('STATUS_EMBED_SEND_FAIL', 'An error occurred trying to send the status embed.', interaction, true);
         return;
      }
   },
};

export default command;
