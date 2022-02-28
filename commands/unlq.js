const { Permissions } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("unlq")
    .setDescription("unlq an user").addUserOption((option) => option.setName("user").setDescription("user to lq")),
  async execute(interaction) {
    const member = interaction.options.getMember("user")
   // const role = interaction.options.getRole('947415733120413786')
  if (member) {
      if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
        if (member.roles.cache.some(role => role.name === 'low quality')) { 	
          member.roles.remove(`947415733120413786`)    
         return interaction.reply({content: `unlqed ${member}`})
         // interaction.reply({content: `that user isn't lqed, what are you doing dumbass`})
        }
        else
        interaction.reply({content: `that user isn't lqed, what are you trying to do dumbass`})
       // member.roles.remove('947415733120413786')
        
     // return interaction.reply({ content: `unlqed ${member}`})
  } else {
        interaction.reply("you need the **MANAGE_MESSAGES** permission to run this command")
      }
    } else 
    interaction.reply("provide someone to lq dumbass");
  },
  }