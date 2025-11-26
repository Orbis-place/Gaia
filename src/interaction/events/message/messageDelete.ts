import { Gaia } from '@/bot';
import { Message, OmitPartialGroupDMChannel, PartialMessage } from 'discord.js';

export async function messageDelete(
   gaia: Gaia,
   message: OmitPartialGroupDMChannel<Message<boolean> | PartialMessage<boolean>>,
) {
   const activeMessage = await gaia.database.live_channel_message.findUnique({
      where: { message_location: `${message.guildId}_${message.channelId}_${message.id}` },
   });
   if (activeMessage) {
      await gaia.database.live_channel_message
         .delete({
            where: { message_location: `${message.guildId}_${message.channelId}_${message.id}` },
         })
         .catch(() => undefined);
      gaia.logger.info(`Deleted live channel message entry for message ID ${message.id}.`);
   }
}
