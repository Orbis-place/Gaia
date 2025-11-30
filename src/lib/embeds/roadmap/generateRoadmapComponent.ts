import { Colors } from '@/consts/Colors';

import { Submission } from '@/dal/roadmap';

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

const statusImage = new AttachmentBuilder('./src/assets/roadmap.png');

export function generateRoadmapComponent(submissions: Submission[]): BaseMessageOptions {
   const container = new ContainerBuilder()
      .setAccentColor(Colors.DEFAULT)
      .addSectionComponents(
         new SectionBuilder()
            .addTextDisplayComponents(new TextDisplayBuilder().setContent('## 🗺️ Orbis Roadmap'))
            .setButtonAccessory(
               new ButtonBuilder()
                  .setStyle(ButtonStyle.Link)
                  .setEmoji('🗺️')
                  .setLabel('View Full Roadmap')
                  .setURL('https://orbis.featurebase.app/dashboard/roadmap'),
            ),
      )
      .addTextDisplayComponents(
         new TextDisplayBuilder().setContent(
            '### Building the ultimate Hytale community hub.\n\nFollow our journey from pre-launch to becoming the go-to platform for the Hytale community.\n\n**✨ Community-driven development** - Your feedback shapes our priorities',
         ),
      )
      .addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large))
      .addTextDisplayComponents(new TextDisplayBuilder().setContent("### 🔨 What we're working on"));
   console.log(submissions);
   submissions.forEach((submission) => {
      container.addTextDisplayComponents(
         new TextDisplayBuilder().setContent(
            `*  **${submission.title}**\n*${submission.content || 'No description provided.'}*\n**Upvotes:** \`${submission.upvotes}\` 👍\n`,
         ),
      );
   });
   // add image on bottom
   container.addMediaGalleryComponents(
      new MediaGalleryBuilder().addItems(new MediaGalleryItemBuilder().setURL(`attachment://roadmap.png`)),
   );

   return {
      components: [container.toJSON()],
      files: [statusImage],
   };
}
