import { EmbedBuilder, ChatInputCommandInteraction, GuildMember } from 'discord.js';
import { Gaia } from '@/bot';
import { Colors } from '@/consts/Colors';
import { testCommandPermission } from '@/features/permissions/testCommandPermission';

export default async function slashCreate(gaia: Gaia, interaction: ChatInputCommandInteraction) {
   if (!gaia.commands) return;
   const command = gaia.commands.get(interaction.commandName);
   if (!command) return;

   const subcommandArgs = [
      interaction.options.getSubcommandGroup(false),
      interaction.options.getSubcommand(false),
   ].filter((i) => i);

   const commandData =
      command.subcommands?.find((subcommand) =>
         subcommand && subcommandArgs.length > 1
            ? subcommand.name == subcommandArgs[1] && subcommand.group == subcommandArgs[0]
            : subcommand.name == subcommandArgs[0] && subcommand.group == null,
      ) || command;

   if (!interaction.guild) {
      if (!command.info.dmableCommand && !commandData.info.dmableCommand) {
         const discordServerOnlyEmbed = new EmbedBuilder().setColor(Colors.DENIED).toJSON();
         discordServerOnlyEmbed.title = '⛔ Nope!';
         discordServerOnlyEmbed.description = `This command can only be used in Discord Servers!`;
         return await interaction.reply({
            embeds: [discordServerOnlyEmbed],
         });
      }
   }

   if (interaction.guild) {
      const permissionTest = testCommandPermission(gaia, interaction, interaction.commandName, subcommandArgs);
      if (permissionTest !== true) {
         const noPermissionEmbed = new EmbedBuilder().setColor(Colors.DENIED).toJSON();
         noPermissionEmbed.title = '⛔ Permission Denied';
         noPermissionEmbed.description = permissionTest.toString().includes('noperm')
            ? `You do not have permission to use this command. ${
                 permissionTest.toString().includes('-')
                    ? ` (Missing Permission: \`${permissionTest.toString().split('-')[1]}\`)`
                    : ''
              }`
            : permissionTest == 'notfound'
              ? `This command is not found.`
              : `This command is not available in this server.`;
         return await interaction.reply({
            ephemeral: true,
            embeds: [noPermissionEmbed],
         });
      }
   }
   if (!commandData || !commandData.execute)
      return gaia.error(
         'INVALID_COMMAND_OR_SUBCOMMAND',
         'This command is invalid or incomplete! Please report this to our server.',
         interaction,
      );
   try {
      await commandData.execute(gaia, interaction);
   } catch (x) {
      gaia.logger.error(`User ${interaction.user.username} experienced an error running command /${command.data.name}`);
      gaia.logger.error(x);
      return gaia.error(
         'COMMAND_ERROR',
         'This command has produced an uncaught error! Please report this to our server.',
         interaction,
      );
   }
}
