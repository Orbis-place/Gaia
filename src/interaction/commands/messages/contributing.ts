import { Components } from '@/consts/Components';
import { Embeds } from '@/consts/Embeds';
import Command from '@/types/Command';
import { ChannelType, MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

const command: Command = {
   data: new SlashCommandBuilder()
      .setName('contributing')
      .setDescription('Send the contributing embed in a specific channel.')
      .addChannelOption((option) =>
         option
            .setName('channel')
            .setDescription('The channel to send the contributing embed in.')
            .addChannelTypes(ChannelType.GuildText, ChannelType.GuildAnnouncement)
            .setRequired(true),
      ),
   info: {
      description: 'Send the contributing embed in a specific channel.',
      usageExample: '/contributing (channel)',
      permissionsRequired: [PermissionFlagsBits.Administrator],
   },
   async execute(gaia, interaction) {
      const channel = interaction.options.getChannel('channel', true, [
         ChannelType.GuildAnnouncement,
         ChannelType.GuildText,
      ]);

      try {
         channel.send({ ...Components.CONTRIBUTING, flags: [MessageFlags.IsComponentsV2] }).then(async () => {
            return interaction.reply({
               embeds: [Embeds.SUCCESS.setDescription(`Successfully sent contributing embed in ${channel}.`)],
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
