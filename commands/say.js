const { Permissions } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()

    .setName("say")

    .setDescription("pretty self explanatory").addStringOption((option) => option.setName("text").setDescription("the text you want the bot to say")),

  async execute(interaction) {
    const admin = "https://cdn.glitch.global/479ccf91-6fd4-43fa-aa8b-6d7c0b85686a/admin.jpeg?v=1645605320251"
    const text = interaction.options.getString("text")
    if (text) {
      if (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
        interaction.reply({content: `${text}`})      }
    
    else {
      interaction.reply({content: "you need the **ADMINISTRATOR** permission to run this command", files: [admin]})}
    } else
    interaction.reply({ content: "provide something to say dumbass" });
  },
};
