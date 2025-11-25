import { generateStatusComponent } from '@/features/embeds/generateStatusEmbed';
import Command from '@/types/Command';
import { ChannelType, PermissionFlagsBits, SlashCommandBuilder } from 'discord.js';

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
      description: 'Send the status embed in a specifiic channel.',
      usageExample: '/status (channel)',
      permissionsRequired: [PermissionFlagsBits.Administrator],
   },
   execute(gaia, interaction) {
      const channel = interaction.options.getChannel('channel', true, [
         ChannelType.GuildAnnouncement,
         ChannelType.GuildText,
      ]);
      channel.send(
         generateStatusComponent({
            web: {
               name: '🌐 Orbis Website',
               status: { 1: true, 2: true, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true },
            },
            cdn: {
               name: '📦 Orbis CDN',
               status: { 1: true, 2: false, 3: true, 4: true, 5: true, 6: true, 7: true, 8: true, 9: true },
            },
         }),
      );
   },
};

export default command;
