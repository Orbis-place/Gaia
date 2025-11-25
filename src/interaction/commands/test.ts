import Command from "@/types/Command";
import { MessageFlags, SlashCommandBuilder } from "discord.js";

const command: Command = {
  data: new SlashCommandBuilder().setName("test").setDescription("test"),
  info: {
    description: "Test command",
    usageExample: "/test",
    allowedDefault: true,
    permissionsRequired: null,
  },
  execute(gaia, interaction) {
    interaction.reply({ content: "Test", flags: [MessageFlags.Ephemeral] });
  },
};

export default command;
