import AbstractSeeder from "./AbstractSeeder";

class DirectorSeeder extends AbstractSeeder {
  constructor() {
    super({ table: "Director", truncate: true });
  }
  async run() {
    for (let i = 0; i < 10; i += 1) {
      await this.insert({
        Firstname: this.faker.person.firstName(),
        Lastname: this.faker.person.lastName(),
        Biography: this.faker.lorem.paragraph(),
        refName: `director_${i}`,
      });
    }
  }
}
export default DirectorSeeder;
