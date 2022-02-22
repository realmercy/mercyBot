module.exports = {
	name: 'interactionCreate',
	execute(interaction) {
    const channel = interaction.guild.channels.cache.get('939775708463525888')
    channel.send(`${interaction.user.tag} ran a command in ${interaction.channel.name}`)
	
    // console.log(`${interaction.user.tag} in #${interaction.channel.name}`);
	},
}