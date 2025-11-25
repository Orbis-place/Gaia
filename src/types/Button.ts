import { MessageComponentInteraction } from 'discord.js';

import { Gaia } from '@/bot';

export default interface Button {
   name: string;
   command?: string;
   execute(gaia: Gaia, interaction: MessageComponentInteraction): void;
   allowedDefault?: boolean;
}
