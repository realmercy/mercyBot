const Discord = require("discord.js");
const client = new Discord.Client({ intents: 4871 });
const fs = require("fs");
const jetpack = require("fs-jetpack");
const { Client, Collection } = require("discord.js");
// const PIN = process.env.channel;
const f = require("./f.json");
const child_process = require("child_process");
const mysql = require("mysql");
var con = mysql.createConnection({
  host: process.env.host,

  user: process.env.user,

  password: process.env.password,
  // port: process.env.port,
});
// const Keyv = require('keyv');
// const keyv = new Keyv()
client.commands = new Discord.Collection();
client.on("ready", () => {
  console.log("penis-balls-cum");
  client.user.setPresence({
    activities: [
      { name: "sex | competitive sex championship", type: "COMPETING" },
    ],
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
// client.on("channelPinsUpdate", async (message, webhook) => {

// })
//keyv.on('error', err => console.error('Keyv connection error:', err));
con.connect(console.log("hello"));
client.on("guildMemberAdd", (member, client) => {
  //var n = keyv.get(n)
  // var n = 0
  var n = process.env.n;
  n++;
  member.setNickname("user" + `${n}`);
  // let data = `{ "n": ${n} }`
  // jetpack.write("./f.json", data)
  // child_process.exec('export n='+`${n}`+"")
  // keyv.set(n, n)
});
client.login(process.env.token);
