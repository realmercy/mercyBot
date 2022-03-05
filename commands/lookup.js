const search = require("discord.js-search");
const { SlashCommandBuilder } = require("@discordjs/builders");

const client = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()

    .setName("lookup")

    .setDescription("lookup if a number is taken or not")

    .addStringOption((option) =>
      option.setName("number").setDescription("number you want to look for")
    ),

  async execute(interaction, message, members) {
    const guild = interaction.guild;
    const nick = interaction.options.getString("number");
    search.searchMember(interaction, `newfag/${nick}`).then((x) => {
      // console.log(x)
      if (x.nickname === `newfag/${nick}`) {
        interaction.reply({
          content: `${x}`,
        });
      } else {
        //console.log(x.user.id);
      //console.log(x);
      interaction.reply({ content: `could not find newfag/${nick}` });
        }
    });
  },
};
