import { ContextMenuCommandBuilder, ContextMenuCommandInteraction } from 'discord.js';

import { Gaia } from '@/bot';
import CommandInfo from './CommandInfo';

export interface ContextMenu {
   data: ContextMenuCommandBuilder;
   command?: string;
   name: string;
   execute?(gaia: Gaia, interaction: ContextMenuCommandInteraction): unknown;
   info: CommandInfo;
}
