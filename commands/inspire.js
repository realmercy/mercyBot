const axios = require("axios");
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("inspire")
    .setDescription(
      "get ai generated inspirational quotes from inspirobot.me"
    ),
  async execute(interaction) {
    axios.get("https://inspirobot.me/api?generate=true").then((res) => {
      interaction.reply({ content: `${res.data}` });
    });
  },
};
