const Discord = require("discord.js")

const client = new Discord.Client({

  intents: 32767

})

require("dotenv").config()


client.on('ready', () => {

  console.log(`${client.user.tag} is online in ${client.guilds.size.cache} servers les gooo`)

})


client.login(process.env.token)

