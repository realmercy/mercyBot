
const db = require("quick.db")
const backup = require("discord-backup");
const { Permissions } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("loadbackup")
    .setDescription("load a backup of the server")
    .addStringOption((option) =>
      option
        .setName("password")
        .setDescription("do you really need a description for that?")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("id")
        .setDescription("id of the backup to load")
        .setRequired(true)
    ),
  async execute(interaction) {
    const guild = interaction.guild;
    const password = interaction.options.getString("password");
    const id = interaction.options.getString("id");
    if (interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) {
      if (password === process.env.yotsuba) {
        const data = db.get(`backup_${id}`)
        backup
          .load(data, guild)
          .then((data) => {
            interaction.user.send({
              content: `backup loaded with id ${data.id}`,
            });
          })
          .catch((err) => {
            interaction.reply({
              content: `could not find backup with an id of **${id}**`,
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
