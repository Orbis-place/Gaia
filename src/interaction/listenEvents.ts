import { Gaia } from '@/bot';
import { BaseInteraction } from 'discord.js';
import onReady from './events/client/onReady';
import slashCreate from './events/interaction/slashCreate';

export default function listenEvents(gaia: Gaia) {
   gaia.once('clientReady', () => onReady(gaia));
   gaia.on('interactionCreate', (interaction: BaseInteraction) => {
      if (interaction.isChatInputCommand()) slashCreate(gaia, interaction);
      // TODO: this can be uncoommented as bot becomes more intricate
      //else if (interaction.isAnySelectMenu())
      //  selectMenuCreate(gaia, interaction);
      //else if (interaction.isModalSubmit()) modalSubmit(gaia, interaction);
      //else if (interaction.isAutocomplete()) autocomplete(gaia, interaction);
      //else if (interaction.isButton()) buttonCreate(gaia, interaction);
      //else if (interaction.isContextMenuCommand())
      //  contextCreate(gaia, interaction);
   });
}
