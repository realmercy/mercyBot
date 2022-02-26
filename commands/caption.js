const memeLib = require('nodejs-meme-generator');
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
      option.setName("toptext").setDescription("top text of the caption")
    )
    .addStringOption((option) =>
      option.setName("bottomtext").setDescription("bottom text for the caption")
    ),
  async execute(interaction) {
    const url = interaction.options.getString("url");
    const top = interaction.options.getString("top text");
    const bottom = interaction.options.getString("bottom text");
    const memeGenerator = new memeLib({
      fontOptions: { // optional
    fontSize: 46,
    fontFamily: 'impact',
    lineHeight: 2
  }
    })
      memeGenerator.generateMeme({

      // you can use either topText or bottomText

      // or both of them at the same time

      topText: 'Meme',

      bottomText: 'Generator',

      url: 'https://i.imgur.com/7FHoSIG.png'

    })

    .then(function(data) {

     // res.set('Content-Type', 'image/png');

      console.log(data);

    })
    interaction.reply({ content: "hello" });
  },
};
