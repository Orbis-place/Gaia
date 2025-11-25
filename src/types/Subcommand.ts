import { Gaia } from '@/bot';
import CommandInfo from './CommandInfo';

import { AutocompleteInteraction, CommandInteraction } from 'discord.js';

export interface Subcommand {
   name: string;
   group?: string;
   autocomplete?: {
      [k: string]: (gaia: Gaia, interaction: AutocompleteInteraction) => void;
   };
   info: CommandInfo;
   execute?(gaia: Gaia, interaction: CommandInteraction): unknown;
}
