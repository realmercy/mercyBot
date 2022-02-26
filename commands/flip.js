var coinflip = require('coinflip');
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("flip")
    .setDescription("flip a coin"),
  async execute(interaction) {
    if (coinflip()) {
interaction.reply({content: `heads!`})
//  console.log('Heads!');

} else {

 // console.log('Tails!');


    interaction.reply({ content: "tails!" });
  }
  },
};
