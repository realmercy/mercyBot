
const db = require("quick.db")
const backup = require("discord-backup");
const { Permissions } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("backup")
    .setDescription("backup the server")
    .addStringOption((option) =>
      option
        .setName("password")
        .setDescription("do you really need a description for that?")
        .setRequired(true)
    ),
  async execute(interaction) {
    const guild = interaction.guild;
    const password = interaction.options.getString("password");
    if (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      if (password === process.env.yotsuba) {
        interaction.reply({content: `please wait a sec this might take a while`})
        backup
          .create(guild, {
            maxMessagesPerChannel: 999999,
            saveImages: "base64",
          })
          .then((data) => {
            db.set(`backup_${data.id}`, data);

            interaction.followUp({
              content: `backup created with id **${data.id}**`,
            });
          });
      } else {
        interaction.reply({ content: `wrong password dumbass` });
      }
    } else {
      interaction.reply({
        content: `you need the **ADMINISTRATOR** permission to run this command`,
      });
    }
  },
};
