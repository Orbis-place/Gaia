import {
   AttachmentBuilder,
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
import { Colors } from './Colors';

const contributingImage = new AttachmentBuilder('./src/assets/opensource.png');
export const Components = {
   CONTRIBUTING: {
      components: [
         new ContainerBuilder()
            .setAccentColor(Colors.DEFAULT)
            .addSectionComponents(
               new SectionBuilder()
                  .addTextDisplayComponents(new TextDisplayBuilder().setContent('## 🤝 Contributing to Orbis'))
                  .setButtonAccessory(
                     new ButtonBuilder()
                        .setStyle(ButtonStyle.Link)
                        .setLabel('View on GitHub')
                        .setEmoji('🤝')
                        .setURL('https://github.com/Orbis-place'),
                  ),
            )
            .addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Large))
            .addTextDisplayComponents(
               new TextDisplayBuilder().setContent(
                  `### 👥 Orbis is open-source and community-driven\n\nWe believe in building together. Whether you're a developer, designer, or just passionate about Hytale—your contributions matter.\n\n**✨ This is YOUR platform. Let's shape it together.**`,
               ),
            )
            .addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small))
            .addTextDisplayComponents(
               new TextDisplayBuilder().setContent(
                  `### 🔧 How to Contribute
Each repository has a \`CONTRIBUTING.md\` with guidelines, setup instructions, and coding standards.`,
               ),
            )
            .addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small))
            .addTextDisplayComponents(
               new TextDisplayBuilder().setContent(
                  `### 💡 What You Can Do\n* Fix bugs & add features\n* Improve documentation\n* Design UI/UX\n* Suggest ideas & feedback\n* Translate content`,
               ),
            )
            .addSeparatorComponents(new SeparatorBuilder().setSpacing(SeparatorSpacingSize.Small))
            .addTextDisplayComponents(
               new TextDisplayBuilder().setContent(
                  `### 🌟 Why Contribute?\nBe part of building the #1 Hytale hub. Help shape the platform from day one. Join a passionate community.`,
               ),
            )
            .addMediaGalleryComponents(
               new MediaGalleryBuilder().addItems(new MediaGalleryItemBuilder().setURL(`attachment://opensource.png`)),
            ),
      ],
      files: [contributingImage],
   },
};
