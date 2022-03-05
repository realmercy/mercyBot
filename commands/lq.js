const { Permissions } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("lq")
    .setDescription("lq an user").addUserOption((option) => option.setName("user").setDescription("user to lq")),
  async execute(interaction) {
    const member = interaction.options.getMember("user")
  if (member) {
      if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
        member.roles.add(process.env.lq)
        
       return interaction.reply({ content: `lqed ${member}`})
  } else {
        interaction.reply("you need the **MANAGE_MESSAGES** permission to run this command")
      }
    } else 
    interaction.reply("provide someone to lq dumbass");
  },
  }