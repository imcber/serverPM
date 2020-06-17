import mongoose, { Mongoose, mongo } from "mongoose";
import dotenv from "dotenv";
import MongoDBInterface from "@accounts/mongo";
import { AccountsServer } from "@accounts/server";
import { AccountsPassword } from "@accounts/password";

//Get env variables
dotenv.config({ path: "variables.env" });

//Connection to DataBase of Mongo
mongoose.connect(process.env.DB_MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("DB Connect");
//Tell account-js to use mongo connection
const accountsMongo = new MongoDBInterface(mongoose.connection);

const accountsPassword = new AccountsPassword({
  validateNewUser: (user) => {
    console.log(user);

    if (user.profile.firstName.length < 2) {
      throw new Error("First name too short");
    }
    return user;
  },
});

//initialize account-js module
const accountsServer = new AccountsServer(
  {
    db: accountsMongo,
    tokenSecret: "F0UND4710N",
  },
  { password: accountsPassword }
);

export { accountsServer };
