import { AnySelectMenuInteraction } from 'discord.js';
import { Gaia } from '@/bot';

export default interface SelectMenu {
   name: string;
   command?: string;
   execute(gaia: Gaia, interaction: AnySelectMenuInteraction): void;
   allowedDefault?: boolean;
}
