const { SlashCommandBuilder } = require("@discordjs/builders")
const QRCODE = require("qrcode")
const { MessageAttachment } = require("discord.js")
module.exports = {
  
  data: new SlashCommandBuilder()
  .setName("qr")
  .setDescription("make a qr code")
  .addStringOption((option) => option.setName("text").setDescription("text to make a qr code out of")),
  async execute(interaction) {
    const qrcode = interaction.options.getString("text")
    if (qrcode) {
    const text = interaction.options.getString('text')
    let image = await QRCODE.toBuffer(text)
    const file = new MessageAttachment(image, "qr.png")
    return interaction.reply({ files: [file] })
      } else {
        interaction.reply({ content: "provide some text dumbass"})
      }
  }
}