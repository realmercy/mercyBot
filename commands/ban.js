const { Permissions } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder().setName("ban").setDescription("bans a member")
  .addUserOption((option) => option.setName("user").setDescription("user who you want to ban"))
  .addStringOption((option) => option.setName("reason").setDescription("reason for the ban")),
    async execute(interaction) {
    const user = interaction.options.getUser("user")
    const ban = "https://cdn.glitch.global/479ccf91-6fd4-43fa-aa8b-6d7c0b85686a/ban.jpg?v=1645443091165"
    const reason = interaction.options.getString("reason")
    const guild = interaction.guild
    if (user) {
      if (interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
        guild.members.ban(user, { days: 7, reason: `${reason}`})
        interaction.reply({ content: `banned ${user.tag}(${user.id})`})
  } else {
        interaction.reply({content:"you need the **BAN_MEMBERS** permission to run this command", files: [ban] })
      }
    } else 
    interaction.reply("provide someone to ban dumbass");
  },
};
