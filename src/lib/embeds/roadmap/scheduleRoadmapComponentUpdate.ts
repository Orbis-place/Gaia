import { Gaia } from '@/bot';
import { AsyncTask, SimpleIntervalJob } from 'toad-scheduler';
import { generateRoadmapComponent } from './generateRoadmapComponent';
import { getRoadmapData } from '@/dal/roadmap';

export default function scheduleRoadmapEmbedUpdates(gaia: Gaia) {
   const task = new AsyncTask(
      'roadmap embed updates',
      async () => {
         const statuses = await gaia.database.live_channel_message.findMany({
            where: { type: 'ROADMAP' },
         });

         for (const statusEntry of statuses) {
            try {
               const [guildId, channelId, messageId] = statusEntry.message_location.split('_');
               const guild = gaia.guilds.cache.get(guildId);
               if (!guild) continue;
               const channel = guild.channels.cache.get(channelId);
               if (!channel || !channel.isTextBased()) continue;
               const message = await channel.messages.fetch(messageId);
               if (!message) continue;
               const summaries = await getRoadmapData();
               if (!summaries) continue;
               // I dont know why I do the casting here but it fixes issue
               await message.edit(generateRoadmapComponent(summaries));
               await gaia.database.live_channel_message.update({
                  where: { message_location: statusEntry.message_location },
                  data: { last_fetched: summaries as object },
               });
            } catch (x) {
               gaia.logger.error('Error updating roadmap embed message:');
               gaia.logger.error(x);
            }
         }
         return true;
      },
      (err) => {
         console.log('Error occurred in roadmap embed update task!');
         console.log(err);
      },
   );
   gaia.scheduler.addIntervalJob(new SimpleIntervalJob({ seconds: 30 }, task));
}
