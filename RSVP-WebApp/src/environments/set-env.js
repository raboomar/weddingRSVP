const setDevEnv = () => {
  console.log("in here");

  const fs = require("fs");
  const writeFile = fs.writeFile;
  const targetPath = "src/environments/environment.development.ts";
  const appVersion = require("../../package.json").version;
  require("dotenv").config({
    path: "src/environments/.env",
  });
  const envConfigFile = `export const environment = {
  apiUrl: '${process.env.API_URL}',
  firebase: ${process.env.FIREBASE_KEY},
  appVersion: '${appVersion}',
  production: true,
};
`;
  console.log(
    "The file `environment.ts` will be written with the following content: \n"
  );
  writeFile(targetPath, envConfigFile, (err: any) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        `Angular environment.ts file generated correctly at ${targetPath} \n`
      );
    }
  });
};

const setEnv = () => {
  console.log("in here");

  const fs = require("fs");
  const writeFile = fs.writeFile;
  const targetPath = "src/environments/environment.ts";
  const appVersion = require("../../package.json").version;
  require("dotenv").config({
    path: "src/environments/.env",
  });
  const envConfigFile = `export const environment = {
  apiUrl: '${process.env.API_URL}',
  firebase: ${process.env.FIREBASE_KEY},
  appVersion: '${appVersion}',
  production: true,
};
`;
  console.log(
    "The file `environment.ts` will be written with the following content: \n"
  );
  writeFile(targetPath, envConfigFile, (err) => {
    if (err) {
      console.error(err);
      throw err;
    } else {
      console.log(
        `Angular environment.ts file generated correctly at ${targetPath} \n`
      );
    }
  });
};

setEnv();
setDevEnv();
