const Discord = require("discord.js");
const client = new Discord.Client({ intents: 32767 });
const fs = require("fs");
const { Client, Collection, WebhookClient } = require("discord.js");
const webhook = new Discord.WebhookClient({
  id: process.env.id,
  token: process.env.webtoken,
});
//const redis = require("redis");
//const red = new redis.createClient({
//  url: process.env.url,
//});
//red.connect(console.log("ell"));

///HELP ME IM IN CONSTANT PAIN AND AGONY
client.commands = new Discord.Collection();
client.on("ready", () => {
  console.warn("penis-balls-cum");
  client.user.setPresence({
    activities: [{ name: "with pointers", type: "PLAYING" }],
  });
});

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
  console.log(`${command.data.name} loaded`);
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
  // var n = await red.sendCommand(["GET", "key"]);
  //  console.log(n);
  //  n++;
  //  member.setNickname("№" + `${n}`);
  // console.log(n);
  // await red.sendCommand(["INCR", "key"]);
});
//FUCK YEAH FINNALY FIGURED OUT PINBOT LETS FUCKING GOOO 
client.on("channelPinsUpdate", async (channel) => {
  let PIN = channel.messages.fetchPinned().then((messages) => {
    let message = messages.last();

    if (message === undefined) return;
    
      webhook.edit({
        name: message.member.nickname,
        avatar: message.author.displayAvatarURL({
          dynamic: false,
          format: "png",
        }),
      }).then(webhook => {
if (message.attachments.size === 0) {
      webhook.send({ content: `${message.content}` })

      return channel.messages.unpin(message.id)
  }
      else 
      {
            webhook.send({ content: `${message.content.toString()}` + "_  _", files: [...message.attachments.values()] })

      return channel.messages.unpin(message.id)
      }
      })
  });
});

client.login(process.env.token);
