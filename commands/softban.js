const { Permissions } = require("discord.js");

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("softban")
    .setDescription(
      "bans a member and immediately unbans them effectively deleting their messages"
    )

    .addUserOption((option) =>
      option.setName("user").setDescription("user who you want to softban")
    )

    .addStringOption((option) =>
      option.setName("reason").setDescription("reason for the softban")
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
    const softban = "https://cdn.glitch.global/479ccf91-6fd4-43fa-aa8b-6d7c0b85686a/ban.jpg?v=1645443091165";
    const reason = interaction.options.getString("reason");

    const guild = interaction.guild;

    if (user) {
      if (interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) {
        guild.members.ban(user, { days: 7, reason: `${reason}` });
        await guild.members.unban(user, `ban was a softban`);
        interaction.reply({ content: `softbanned ${user.tag}(${user.id})` });
      } else {
        interaction.reply({
          content:
            "you need the **BAN_MEMBERS** permission to run this command", files: [softban]
        });
      }
    } else {
      interaction.reply({
        content: `provide someone to softban dumbass`
      });
    }
  },
};
