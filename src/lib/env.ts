import { cleanEnv, str } from 'envalid';
import 'dotenv/config';

const env = cleanEnv(process.env, {
   NODE_ENV: str({
      choices: ['PROD', 'DEV'],
      default: 'PROD',
      devDefault: 'DEV',
   }),
   DISCORD_BOT_TOKEN: str({ desc: 'The Discord bot token from Discord.' }),
   DISCORD_BOT_CLIENT_ID: str({
      desc: 'The Discord bot Client ID from Discord.',
   }),
   DISCORD_STATUS: str({
      desc: "The bot's Discord Status.",
      default: 'Serving Orbis...',
   }),
   WEBPAGE: str({
      desc: 'The webpage URL for Orbis.place',
      default: 'https://orbis.place',
   }),
   DATABASE_URL: str({
      desc: 'The database connection URL for Prisma.',
   }),
});

export default env;
