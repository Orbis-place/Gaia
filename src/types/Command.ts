import {
   AutocompleteInteraction,
   ChatInputCommandInteraction,
   SlashCommandBuilder,
   SlashCommandOptionsOnlyBuilder,
   SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';
import CommandInfo from './CommandInfo';
import { Gaia } from '@/bot';
import { Subcommand } from './Subcommand';

interface Command {
   data:
      | SlashCommandBuilder
      | SlashCommandOptionsOnlyBuilder
      | SlashCommandSubcommandsOnlyBuilder
      | Omit<SlashCommandBuilder, 'addSubcommandGroup' | 'addSubcommand'>;
   execute?(gaia: Gaia, interaction: ChatInputCommandInteraction): unknown;
   info: CommandInfo;
   autocomplete?: {
      [k: string]: (gaia: Gaia, interaction: AutocompleteInteraction) => void;
   };
   subcommands?: Subcommand[];
}

export default Command;
