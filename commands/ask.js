const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("ask")
    .setDescription("ask the bot something")
    .addStringOption((option) =>
      option
        .setName("text")
        .setDescription("the thing you want to ask")
        .setRequired(true)
    ),
  async execute(interaction) {
    const text = interaction.options.getString("text");
    const fetch = require("node-fetch").default;
    fetch(`https://api.snowflakedev.org/api/chatbot?message=${text}`, {
      headers: {
        Authorization: process.env.api,
      },
    })
      .then((res) => res.json())
      .then((data) =>
        interaction.reply({ content: `${data.message}` })
      )
      .catch((e) =>

        interaction.reply({ content: `${e}` })
      );
  },
};
