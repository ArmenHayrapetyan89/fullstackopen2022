const mongoose = require("mongoose");

const password = process.argv[2];
const personName = process.argv[3];
const personNumber = process.argv[4];

const url = `mongodb+srv://fullstackopen2022:${password}@cluster0.sxv0nzg.mongodb.net/phonebookApp?retryWrites=true&w=majority`;
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (password && !personName && !personNumber) {
  console.log("phonebook:");

  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
} else if (!(password && personName && personNumber)) {
  console.log(
    "Please provide a password, a name and a number: node mongo.js <password> <name> <number>"
  );
  console.log(
    "Notice that if the name contains whitespace characters, it must be enclosed in quotes"
  );

  process.exit(1);
} else {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("connected");
      const person = new Person({
        name: personName,
        number: personNumber,
      });

      return person.save();
    })
    .then(() => {
      console.log(`added ${personName} number ${personNumber} to phonebook`);
      return mongoose.connection.close();
    })
    .catch((err) => console.log(err));
}
