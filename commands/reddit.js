const memes = require("random-memes");
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("reddit")
    .setDescription("sends a random reddit meme"),
  async execute(interaction) {
    memes.fromReddit("en").then((meme)=>{

//console.log(meme);

//console.log(meme.image);
    interaction.reply({content: `${meme.image}`})
    })
  },
};
