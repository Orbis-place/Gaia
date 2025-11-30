import { Gaia } from '@/bot';
import { AsyncTask, SimpleIntervalJob } from 'toad-scheduler';
import { generateStatusComponent } from './generateStatusComponent';
import { getCompositeServiceStatus } from '@/dal/status';

export default function scheduleStatusEmbedUpdates(gaia: Gaia) {
   const task = new AsyncTask(
      'status embed updates',
      async () => {
         const statuses = await gaia.database.live_channel_message.findMany({
            where: { type: 'STATUS' },
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
               const statusData = await getCompositeServiceStatus();
               if (!statusData) continue;
               // I dont know why I do the casting here but it fixes issue
               await message.edit(generateStatusComponent(statusData));
               await gaia.database.live_channel_message.update({
                  where: { message_location: statusEntry.message_location },
                  data: { last_fetched: statusData as object },
               });
            } catch (x) {
               gaia.logger.error('Error updating status embed message:');
               gaia.logger.error(x);
            }
         }
         return true;
      },
      (err) => {
         console.log('Error occurred in status embed update task!');
         console.log(err);
      },
   );
   gaia.scheduler.addIntervalJob(new SimpleIntervalJob({ minutes: 1 }, task));
}
