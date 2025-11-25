import { Gaia } from '@/bot';
import { ModalSubmitInteraction } from 'discord.js';

export default interface Modal {
   name: string;
   command?: string;
   execute(gaia: Gaia, interaction: ModalSubmitInteraction): void;
   allowedDefault?: boolean;
}
