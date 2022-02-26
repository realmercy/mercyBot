const { Permissions } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("purge messages")
    .addIntegerOption((option) =>
      option.setName("amount").setDescription("number of messages to purge")
    ),
  async execute(interaction) {
    const file = `https://cdn.glitch.global/479ccf91-6fd4-43fa-aa8b-6d7c0b85686a/purge.jpg?v=1645853039304`
    
    const amount = interaction.options.getInteger("amount");
    if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
    if (amount <= 1 || amount > 100) {
      return interaction.reply({
        content: "provide the number of messages you want to purge dumbass",
        ephemeral: false,
      });
    }
    await interaction.channel.bulkDelete(amount, true).catch((error) => {
      console.error(error);
      interaction.reply({
        content: "there was an error trying to purge messages in this channel",
        ephemeral: false,
      });
    });
    await interaction.reply({
      content: `purged **${amount}** messages`,
      ephemeral: true,
    });
      }
    else interaction.reply({content: `you need the **MANAGE_MESSAGES** permission to run this command`, files: [file]})
   // await interaction.deleteReply();
  },
};
