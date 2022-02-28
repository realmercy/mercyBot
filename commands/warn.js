const { Permissions } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("warn an user")
    .addUserOption((option) =>
      option.setName("user").setDescription("user who you want to warn")
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("reason for warning")
    ),
  async execute(interaction) {
    const reason = interaction.options.getString("reason");
    const user = interaction.options.getUser("user");
    const guild = interaction.guild;
    if (user) {
      if (
        interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)
      ) {
        if (reason) {
          await user.send({
            content: `you were warned in ${guild.name} for ${reason}`,
          });
          await interaction.reply({
            content: `${user} has been warned for ${reason}`,
          });
        } else {
          await user.send({ content: `you were warned in ${guild.name}` });
          await interaction.reply({ content: `${user} has been warned` });
        }
      } else {
        interaction.reply({
          content: `you need the **MANAGE_MESSAGES** permission to run this command`,
        });
      }
    }
    interaction.reply({ content: "provide someone to warn dumbass" });
  },
};
