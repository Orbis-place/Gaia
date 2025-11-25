import { EmbedBuilder } from 'discord.js';
import { Colors } from './Colors';

export const Embeds = {
   ERROR: new EmbedBuilder()
      .setColor(Colors.DENIED)
      .setTitle('⛔ Error!')
      .setDescription('An error occurred trying to do this. Try again later!'),
};
