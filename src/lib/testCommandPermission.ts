import { Gaia } from "@/bot";
import { BaseInteraction, GuildMember, PermissionFlagsBits } from "discord.js";
import { findCommand } from "./findCommand";

export function testDiscordCommandPermissions(
  permissions: bigint[],
  member: GuildMember
) {
  for (const permission of permissions) {
    if (!member.permissions.has(permission))
      return `noperm-${Object.keys(PermissionFlagsBits).find(
        (i) => PermissionFlagsBits[i] == permission
      )}`;
  }

  return true;
}

/**
 * Tests the permission of a command for a given user in a guild.
 * @param auxdibot - The Auxdibot instance.
 * @param interaction - The interaction object representing the command interaction.
 * @param guildID - The ID of the guild where the command is being executed.
 * @param command - The name of the command.
 * @param subcommand - Optional. An array of subcommand names, if applicable.
 * @returns A boolean indicating whether the user has permission to execute the command, or a string indicating the reason for lack of permission (notfound, noperm, disabled, noperm-channel).
 */
export function testCommandPermission(
  gaia: Gaia,
  interaction: BaseInteraction,
  command: string,
  subcommand?: string[]
) {
  const member = interaction.guild
    ? interaction.guild.members.resolve(interaction.user.id)
    : null;
  if (!member) return false;
  if (
    member.id == member.guild.ownerId ||
    member.permissions.has(PermissionFlagsBits.Administrator)
  )
    return true;
  const data = findCommand(gaia, command, subcommand);
  if (!data) return "notfound";
  const { commandData, subcommandData } = data;

  const allowedDefault = subcommandData
    ? subcommandData.info.allowedDefault
    : commandData.info.allowedDefault;

  let permissions =
    (subcommandData?.info?.permissionsRequired !== undefined
      ? subcommandData.info.permissionsRequired
      : commandData.info.permissionsRequired) ?? [];

  if (
    permissions &&
    permissions.length > 0 &&
    allowedDefault !== false &&
    !member.permissions.has(PermissionFlagsBits.Administrator)
  ) {
    const permissionTest = testDiscordCommandPermissions(permissions, member);
    if (permissionTest !== true) return permissionTest;
  }
  let result: string | boolean = true;
  return result;
}
