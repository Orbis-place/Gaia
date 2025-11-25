import { GatewayIntentBits } from 'discord.js';

export const GaiaIntents = [
   GatewayIntentBits.Guilds,
   GatewayIntentBits.GuildMembers,
   GatewayIntentBits.GuildModeration,
   GatewayIntentBits.GuildMessages,
   GatewayIntentBits.GuildMessageReactions,
   GatewayIntentBits.GuildVoiceStates,
   GatewayIntentBits.DirectMessages,
   GatewayIntentBits.DirectMessageReactions,
   GatewayIntentBits.MessageContent,
];
