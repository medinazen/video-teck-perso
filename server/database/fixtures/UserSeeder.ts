import AbstractSeeder from "./AbstractSeeder";

class UserSeeder extends AbstractSeeder {
  constructor() {
    // Call the constructor of the parent class (AbstractSeeder) with appropriate options
    super({ table: "User", truncate: true });
  }

  // The run method - Populate the 'user' table with fake data

  async run() {
    // Generate and insert fake data into the 'user' table
    for (let i = 0; i < 10; i += 1) {
      // Generate fake user data
     await this.insert({
      Firstname: this.faker.person.firstName(),
        Lastname: this.faker.person.lastName(),
        Email: this.faker.internet.email(), // Generate a fake email using faker library
        Password: this.faker.internet.password(), // Generate a fake password using faker library
        refName: `user_${i}`, // Create a reference name for the user
      });
    }
  }
}

// Export the UserSeeder class
export default UserSeeder;
