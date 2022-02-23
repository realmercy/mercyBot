const faker = require("@faker-js/faker");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()

    .setName("dox")

    .setDescription("dox a user")
    .addUserOption((option) =>
      option.setName("user").setDescription("user you want to dox")
    ),

  async execute(interaction) {
    const user = interaction.options.getUser("user");
  // faker.seed(`${user.id.toString()}`);
    if (user) {
      let firstname = faker.name.firstName();
      let middlename = faker.name.middleName().toUpperCase();
      let lastname = faker.name.lastName();
      let number = faker.phone.phoneNumber();
      let music = faker.music.genre();
      let email = faker.internet.email();
      interaction.reply({
        content: `${user.tag}'s dox:
      First Name: ${firstname}
      Middle Name: ${middlename}
      Last Name: ${lastname}
      Full Legal Name: ${firstname} ${middlename} ${lastname}
      Email: ${email}
      Phone Number: ${number}
      Fav Music Genre: ${music}`,
      });
    } else {
      interaction.reply({ content: "provide someone to dox dumbass" });
    }
  },
};
