import { Colors } from '@/consts/Colors';
import { CustomEmojis } from '@/consts/CustomEmojis';
import { StatusData } from '@/types/StatusData';
import {
   AttachmentBuilder,
   BaseMessageOptions,
   ButtonBuilder,
   ButtonStyle,
   ContainerBuilder,
   MediaGalleryBuilder,
   MediaGalleryItemBuilder,
   SectionBuilder,
   SeparatorBuilder,
   SeparatorSpacingSize,
   TextDisplayBuilder,
} from 'discord.js';

const statusImage = new AttachmentBuilder('./src/assets/status.png');

export function generateStatusComponent(statusData: StatusData): BaseMessageOptions {
   const container = new ContainerBuilder()
      .setAccentColor(Colors.DEFAULT)
      .addSectionComponents(
         new SectionBuilder()
            .addTextDisplayComponents(new TextDisplayBuilder().setContent('## 🌍 Orbis Status Overview'))
            .setButtonAccessory(
               new ButtonBuilder()
                  .setStyle(ButtonStyle.Link)
                  .setLabel('Status Page')
                  .setURL('https://orbis.place/status'),
            ),
      )
      .addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large));

   const data = Object.values(statusData);
   // use text display instead opf section for text component and use seperators to seperate
   for (let i = 0; i < data.length; i++) {
      container.addTextDisplayComponents(
         new TextDisplayBuilder().setContent(
            `### ${data[i].name}\n${Object.values(data[i].status)
               .map((isOperational) => `${isOperational ? CustomEmojis.ONLINE : CustomEmojis.OFFLINE}`)
               .join(' ')}` + (Object.values(data[i].status).every((v) => v) ? ' **Operational**' : ' **Faulty**'),
         ),
      );
      if (i !== data.length - 1)
         container.addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large));
   }
   // add image on bottom
   container.addMediaGalleryComponents(
      new MediaGalleryBuilder().addItems(new MediaGalleryItemBuilder().setURL(`attachment://status.png`)),
   );

   return {
      components: [container.toJSON()],
      files: [statusImage],
   };
}
