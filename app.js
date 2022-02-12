const Discord = require("discord.js")
const fs = require("fs")
const client = new Discord.Client({
    intents: 32767
})
require("dotenv").config()
const prefix = "$"
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(join(__dirname, "commands", `${file}`));
    client.commands.set(command.name, command);
}

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.guild) return;

    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;

    const [, matchedPrefix] = message.content.match(prefixRegex);

    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command =
        client.commands.get(commandName) ||
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Collection());
    }

    client.on('ready', () => {
        client.user.setActivity(`${prefix}help and ${prefix}play`, { type: "LISTENING" });
        console.log(`${client.user.tag} is online in ${client.guilds.cache.size} servers les gooo`)
    })
    
    try {
        command.execute(message, args);
      } catch (error) {
        console.error(error);
        message.reply(i18n.__("common.errorCommand")).catch(console.error);
      }
    });
    client.login(process.env.token)