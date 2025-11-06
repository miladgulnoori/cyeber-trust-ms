import concurrently from "concurrently";

concurrently([
  {
    name: "server",
    command: "npm run dev",
    prefixColor: "red",
    cwd: "packages/server",
  },
  {
    name: "web",
    command: "npm run dev",
    prefixColor: "blue",
    cwd: "app/web",
  },
  // {
  //   name: "mobile",
  //   command: "npx expo start",
  //   prefixColor: "green",
  //   cwd: "app/mobile",
  // },
]);
