const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });
const fs = require("fs");
const { Client, Collection } = require("discord.js");
const redis = require("redis");
const red = new redis.createClient({
  url: process.env.url,
});
red.connect(console.log("ell"));

///HELP ME IM IN CONSTANT PAIN AND AGONY
client.commands = new Discord.Collection();
client.on("ready", () => {
  console.log("penis-balls-cum");
  client.user.setPresence({
    activities: [{ name: "competitive sex championship", type: "COMPETING" }],
  });
});

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));
for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: `${error}`,
      ephemeral: false,
    });
  }
});
client.on("guildMemberAdd", async (member, client) => {
  var n = await red.sendCommand(["GET", "key"]);
  console.log(n);
  n++;
  member.setNickname("№" + `${n}`);
  console.log(n);
 await red.sendCommand(["INCR", "key"]);
});
client.login(process.env.token);
