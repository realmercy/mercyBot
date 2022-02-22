const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("purge")
    .setDescription("purge messages")
    .addIntegerOption((option) =>
      option.setName("amount").setDescription("number of messages to purge")
    ),
  async execute(interaction) {
    const amount = interaction.options.getInteger("amount");
    if (amount <= 1 || amount > 100) {
      return interaction.reply({
        content: "you need to provide a number between 1 and 100",
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
      content: `<@${interaction.user.id}> purged **${amount}** messages`,
      ephemeral: false,
    });
    await interaction.deleteReply();
  },
};
