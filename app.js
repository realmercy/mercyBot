const Discord = require("discord.js")
const fs = require("fs")
const client = new Discord.Client({ intents: 32767
})
require("dotenv").config()
const prefix = "$"
client.on('ready', () => {
 console.log(`${client.user.tag} is online in ${client.guilds.cache.size} servers les gooo`)
})
client.login(process.env.token)

