import { Gaia } from '@/bot';
import Command from '@/types/Command';
import { Subcommand } from '@/types/Subcommand';

export function findCommand(
   gaia: Gaia,
   command: string,
   subcommand?: string[],
): { commandData: Command; subcommandData?: Subcommand } | undefined {
   const commandData = gaia.commands.get(command),
      subcommandData = commandData?.subcommands?.find((i) =>
         subcommand.length > 1 ? i.name == subcommand[1] && i.group == subcommand[0] : i.name == subcommand[0],
      );
   if (!commandData || (subcommand.length >= 1 && !subcommandData)) {
      return undefined;
   }
   return { commandData, subcommandData };
}
