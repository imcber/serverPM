import mongoose, { Mongoose, mongo } from "mongoose";
import dotenv from "dotenv";
import { Mongo } from "@accounts/mongo";
import { AccountsServer } from "@accounts/server";
import { AccountsPassword } from "@accounts/password";
import pick from "object.pick";

//Get env variables
dotenv.config({ path: "variables.env" });

//Connection to DataBase of Mongo
mongoose.connect(process.env.DB_MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log("DB Connect");
//Tell account-js to use mongo connection
const accountsMongo = new Mongo(mongoose.connection);

const accountsPassword = new AccountsPassword({
  validateNewUser: async (user) => {
    console.log(user);

    return pick(user, ["email", "password", "profile"]);
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
