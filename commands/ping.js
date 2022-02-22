const { SlashCommandBuilder } = require("@discordjs/builders");
const client = require("discord.js")
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("ping pong"),
  async execute(interaction) {
    return interaction.reply(`<a:ping:939781996182376468> ping is ${Date.now() - interaction.createdTimestamp} ms`);
  },
};
