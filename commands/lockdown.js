const { Permissions } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("lockdown")
    .setDescription("lockdown one channel or the entire server")
    .addChannelOption((option) =>
      option.setName("channel").setDescription("channel to lockdown")
    )
    .addStringOption((option) =>
      option.setName("option").setDescription("start or end lockdown")
    ),
  async execute(interaction) {
    const guild = interaction.guild;
    const channel = interaction.options.getChannel("channel");
    const string = interaction.options.getString("option");
    if (interaction.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
      if (channel) {
        if (string === "start") {
          interaction.reply({ content: `done`, ephemeral: true });
          channel.permissionOverwrites.edit(guild.id, { SEND_MESSAGES: false });
          interaction.channel.send({
            content: `<#${channel.id}> is now under lockdown`,
          });
        } else if (string === "end") {
          interaction.reply({ content: `done`, ephemeral: true });
          channel.permissionOverwrites.edit(guild.id, { SEND_MESSAGES: null });
          interaction.channel.send({
            content: `<#${channel.id}> is now no longer under lockdown`,
          });
        } else {
          interaction.reply({ content: `invaild option dumbass` });
        }
      } else {
        if (string === "start") {
          interaction.guild.channels.cache.forEach((channel) =>
            channel.permissionOverwrites.edit(guild.id, {
              SEND_MESSAGES: false,
            })
          );
          interaction.reply({ content: `done`, ephemeral: true });
          interaction.channel.send({
            content: `the server is now under lockdown`,
          });
        } else if (string === "end") {
          interaction.guild.channels.cache.forEach((channel) =>
            channel.permissionOverwrites.edit(guild.id, {
              SEND_MESSAGES: null,
            })
          );
          interaction.reply({ content: `done`, ephemeral: true });
          interaction.channel.send({
            content: `the server is no longer under lockdown`,
          });
        } else {
          interaction.reply({ content: `invaild option dumbass` });
        }
      }
    } else {
      interaction.reply({
        content: `you need the **MANAGE_CHANNELS** permission to run this command`,
      });
    }
  },
};
