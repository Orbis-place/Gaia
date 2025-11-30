import { ActivityType, BaseInteraction, Client, Collection, MessageFlags, REST } from 'discord.js';

import { emojify } from 'node-emoji';
import pino from 'pino';
import { GaiaIntents } from './consts/bot/GaiaIntents';
import { GaiaPartials } from './consts/bot/GaiaPartials';
import env from './lib/env';
import Command from './types/Command';
import Button from './types/Button';
import SelectMenu from './types/SelectMenu';
import Modal from './types/Modal';
import { ContextMenu } from './types/ContextMenu';
import refreshInteractions from './interaction/refreshInteractions';
import { Embeds } from './consts/Embeds';
import listenEvents from './interaction/listenEvents';
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { ToadScheduler } from 'toad-scheduler';
import scheduleStatusEmbedUpdates from './lib/embeds/status/scheduleStatusComponentUpdates';
import scheduleRoadmapEmbedUpdates from './lib/embeds/roadmap/scheduleRoadmapComponentUpdate';
const TOKEN = env.DISCORD_BOT_TOKEN;
const CLIENT_ID = env.DISCORD_BOT_CLIENT_ID;

/**
 * Represents the Gaia class.
 * @class Gaia
 * @extends Client
 */
export class Gaia extends Client {
   logger = pino({
      level: 'info',
      transport: {
         target: 'pino-pretty',
         options: {
            colorize: true,
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname',
         },
      },
   });

   /**
    * Collection of commands registered in Gaia.
    */
   commands: Collection<string, Command> = new Collection();

   /**
    * Prisma client used for interacting with database.
    */
   database: PrismaClient;
   /**
    * Collection of buttons registered in Gaia.
    */
   buttons: Collection<string, Button> = new Collection();

   /**
    * Collection of select menus registered in Gaia.
    */
   select_menus: Collection<string, SelectMenu> = new Collection();

   /**
    * Collection of modals registered in Gaia.
    */
   modals: Collection<string, Modal> = new Collection();

   /**
    * Collection of context menus registered in Gaia.
    */
   context_menus: Collection<string, ContextMenu> = new Collection();

   /**
    * Scheduler for scheduling tasks in Gaia.
    */
   scheduler: ToadScheduler = new ToadScheduler();

   /**
    * Creates an instance of Gaia, and initializes the instance, using the DISCORD_BOT_TOKEN and DISCORD_BOT_CLIENT_ID
    */
   constructor() {
      if (!TOKEN) throw new Error('You need to include a discord token in .env!');
      if (!CLIENT_ID) throw new Error('You need to include a client id in .env!');
      super({
         intents: GaiaIntents,
         partials: GaiaPartials,
         presence: {
            activities: [
               {
                  type: ActivityType.Custom,
                  name: 'Gaia',
                  url: 'https://orbis.place',
                  state: `⌚ Loading...`,
               },
            ],
         },
      });
      this.init();
   }
   /**
    * Initializes the Gaia instance, connecting to the Prisma client, setting up interactions, and listening for events.
    */
   async connectPrisma() {
      const pool = new Pool({ connectionString: env.DATABASE_URL });
      const adapter = new PrismaPg(pool);
      this.database = new PrismaClient({ adapter });

      try {
         this.database.$connect().then(() => this.logger.info('Successfully connected to DB!'));
      } catch (x) {
         this.logger.error('An error occurred trying to connect to the DB using Prisma!');
         this.logger.error(x);
         return undefined;
      }
   }
   async init() {
      this.logger.info('Connecting Prisma Client...');
      await this.connectPrisma();
      this.logger.info('Declaring client variables...');
      const rest = new REST({
         version: '10',
      }).setToken(TOKEN);
      refreshInteractions(this, rest, CLIENT_ID);
      this.logger.info('Listening for events...');
      listenEvents(this);
      this.logger.info('Logging into client...');
      this.login(TOKEN)
         .then(async () => {
            this.updateDiscordStatus(env.DISCORD_STATUS);
            this.logger.info('Scheduling schedulers...');
            scheduleStatusEmbedUpdates(this);
            scheduleRoadmapEmbedUpdates(this);
         })
         .catch((reason) => {
            this.logger.error('! Error signing into Gaia!');
            this.logger.error(reason);
         });
   }

   /**
    * Function to connect to the Prisma client.
    * @returns A promise that resolves when the connection is established.
    */
   /* async connectPrisma() {
      try {
         await this.database.$connect().then(() => this.logger.info("Successfully connected to DB!"));
      } catch (x) {
         this.logger.error("An error occurred trying to connect to the DB using Prisma!");
         this.logger.error(x);
         return undefined;
      }
   }*/

   /**
    * Function to get the total number of members in Gaia.
    * @returns A promise that resolves to the number of members.
    */
   async getMembers() {
      return await this.guilds.cache.reduce(
         async (acc: Promise<number> | number, guild) =>
            (await acc) + (guild.memberCount || (await guild.fetch()).memberCount || 0),
         0,
      );
   }

   /**
    * Function to update the Discord status of Gaia.
    * @param message - The status message to be displayed.
    * @returns A promise that resolves to the updated client presence.
    */
   async updateDiscordStatus(message: string) {
      // replace all emojis surrounded by colons with their unicode equivalent
      if (this.user)
         return this.user.setPresence({
            activities: [
               {
                  type: ActivityType.Custom,
                  name: 'Gaia',
                  url: 'https://orbis.place',
                  state: `${emojify(message)}`,
               },
            ],
         });
      return undefined;
   }

   async error(error: string, error_message: string, interaction: BaseInteraction, ephemeral?: boolean) {
      const errorEmbed = Embeds.ERROR.setAuthor({ name: `An error occurred!` })
         .setDescription(`${error_message}`)
         .setFooter({ text: `Error code: ${error}` });
      return interaction.isRepliable() && interaction.deferred
         ? interaction.editReply({ embeds: [errorEmbed] })
         : interaction.isRepliable() && !interaction.replied
           ? interaction.reply({
                embeds: [errorEmbed],
                flags: !!ephemeral ? [MessageFlags.Ephemeral] : [],
             })
           : interaction.channel.send({ embeds: [errorEmbed] });
   }
}
