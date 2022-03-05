const eightball = require('8ball')()
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription(
      "8ball on discord, 100% accurate"
    ).addStringOption((option) => option.setName("question").setDescription("yes/no question to ask the 8ball").setRequired(true)),
  async execute(interaction) {
    interaction.reply({content: `${eightball}`})
  },
};
