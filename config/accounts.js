import { AccountsServer } from "@accounts/server";
import { AccountsPassword } from "@accounts/password";
import { accountsMongo } from "./db";

const accountsPassword = new AccountsPassword({
  //TODO Customise password service
});

console.log(accountsMongo);

const accountsServer = new AccountsServer(
  {
    db: accountsMongo,
    tokenSecret: "F0UND4710N",
  },
  { password: accountsPassword }
);

export { accountsServer };
