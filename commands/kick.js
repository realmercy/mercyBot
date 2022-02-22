const { Permissions } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder().setName("kick").setDescription("kicks a member")
  .addUserOption((option) => option.setName("user").setDescription("user who you want to kick"))
  .addStringOption((option) => option.setName("reason").setDescription("reason for the kick")),
    async execute(interaction) {
    const user = interaction.options.getUser("user")
    const kick = "https://cdn.glitch.global/479ccf91-6fd4-43fa-aa8b-6d7c0b85686a/kick.jpg?v=1645444317987"
    const reason = interaction.options.getString("reason")
    const guild = interaction.guild
    if (user) {
      if (interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
        guild.members.kick(user, { days: 7, reason: `${reason}`})
        interaction.reply({ content: `kicked ${user.tag}(${user.id})`})
  } else {
        interaction.reply({content:"you need the **KICK_MEMBERS** permission to run this command", files: [kick]})
      }
    } else 
    interaction.reply("provide someone to kick dumbass");
  },
};
