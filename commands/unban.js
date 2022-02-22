const { Permissions } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("unban a user")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("id of the user who you want to unban")
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const guild = interaction.guild;
    if (user) {
      if (interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
        guild.members.unban(user);
        interaction.reply({ content: `unbanned ${user.tag}(${user.id})` });
      } else {
        interaction.reply(
          "you need the ```BAN_MEMBERS``` permission to run this command"
        );
      }
    } else interaction.reply("provide someone to unban dumbass");
  },
};
