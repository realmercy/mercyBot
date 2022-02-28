const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("get a user's or your own avatar")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("user whose avatar you want to see")
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user");
    if (user) {
      const embed = new MessageEmbed()
        .setImage(`${user.displayAvatarURL({ dynamic: true, size: 4096 })}`)
        .setTimestamp()
        .setColor("RANDOM")
        .setTitle(`${user.username}'s avatar`)
        .setURL(`${user.displayAvatarURL({ dynamic: true, size: 4096 })}`)
        .setFooter(`command ran by ${interaction.user.tag}`);
      return interaction.reply({ embeds: [embed] });
    } else {
      const embed = new MessageEmbed()
        .setImage(
          `${interaction.user.displayAvatarURL({ dynamic: true, size: 4096 })}`
        )
        .setTimestamp()
        .setColor("RANDOM")
        .setTitle(`${interaction.user.username}'s avatar`)
        .setURL(
          `${interaction.user.displayAvatarURL({ dynamic: true, size: 4096 })}`
        );
      return interaction.reply({ embeds: [embed] })
    }
  },
};
