var randomUser = require("random-user");
var Jimp = require("jimp");
const axios = require("axios");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageAttachment } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("face-dox")
    .setDescription("get 100% totally accurate face dox of someone")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("user you'd like to face-dox")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
interaction.reply({content: `face doxxing ${user} just gimme a sec`})
    randomUser()
      .then((data) => {
        Jimp.read(`${data.picture.large}`, (err, file) => {
          if (err) throw err;
          else
            file.resize(1080, 1080)
            file.getBuffer(Jimp.AUTO, (err, res) => {
              if (err) {
                interaction.reply(err);
              } else {
                const file = new MessageAttachment(res);

                interaction.followUp({ content: `${user}'s face dox`, files: [file] });
              }
            });
        });
      })
      .catch((err) => console.log(err));
  },
};
