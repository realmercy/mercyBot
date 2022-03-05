const { convert } = require("discord-emoji-convert")
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("bigtext")
    .setDescription("text to emoji (regional indicator)")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("text that you want to convert to emojis")
        .setRequired(true)
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    interaction.reply({content: convert(`${text}`)})
  },
};
