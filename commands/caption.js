const { MessageAttachment } = require("discord.js");
const axios = require("axios");
var Jimp = require("jimp");
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("caption")
    .setDescription("caption an image")
    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription("url to the image you want to caption")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("toptext")
        .setDescription("top text of the caption")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("bottomtext")
        .setDescription("bottom text for the caption")
        .setRequired(true)
    ),
  async execute(interaction) {
    interaction.reply({ content: `pls wait this might take a while` });
    const url = interaction.options.getString("url");
    const top = interaction.options.getString("toptext");
    const bottom = interaction.options.getString("bottomtext");

    axios

      .post(
        "https://api.imgflip.com/caption_image",

        {},

        {
          params: {
            template_id: "374161761",

            username: process.env.username,

            password: process.env.password,

            text0: `${top}`,

            text1: `${bottom}`,
          },
        }
      )

      .then((response) => {
        //interaction.reply({content: `${response.data}`})
        const img = response.data.data.url;
        // interaction.reply({ content: `${img}` });
        Jimp.read(`${url}`)
          .then((image) => {
            image.resize(512, 512);

            Jimp.read(`${img}`, (err, file) => {
              if (err) console.log(err);
              else
                file
                  .resize(512, 512)
                  .composite(image, 0, 0, {
                    mode: Jimp.BLEND_SCREEN,
                  })
                  .getBuffer(Jimp.AUTO, (err, res) => {
                    if (err) {
                      interaction.reply(err);
                    } else {
                      const file = new MessageAttachment(res);
                      interaction.followUp({ files: [file] });
                    }
                  });
              //   console.log(file)
              //      interaction.reply({files: [file]})
            });
          })
          .catch((e) => {
            // return console.log(e);
            //  interaction.reply({content: `${e}`})
          });
      });
  },
};
