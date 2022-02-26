const redis = require("redis")
const red = new redis.createClient({
  url: process.env.url
})
red.connect()
const { SlashCommandBuilder } = require("@discordjs/builders");

const client = require("discord.js")

module.exports = {

  data: new SlashCommandBuilder()

    .setName("newnumber")

    .setDescription("looks up the latest number which will be assigned"),

  async execute(interaction) {
    var f = await red.sendCommand(["GET", "key"])
    f++
    interaction.reply({content: `next number to be assigned is ${f}`});

  },

};