const { mineflayer: mineflayerViewer } = require("prismarine-viewer");
const {
  bot,
  lookAtPlayer,
  sayItems,
  goToPlayer,
  equipPickaxe,
  mine,
  expunge,
} = require("./actions");

const queue = [];

bot.once("spawn", () => {
  // const controller = new AbortController()
  // AbortSignal;
  console.log("Ready");

  bot.chat("Hello server");

  // mineflayerViewer(bot, { port: 3007, firstPerson: false });

  bot.on("chat", function (username, message) {
    if (username === bot.username) return;
    const tokens = message.split(" ");
    switch (tokens[0]) {
      case "loaded":
        bot.waitForChunksToLoad().then(() => bot.chat("Ready!"));
        break;
      case "list":
        sayItems();
        break;
      case "equip":
        equipPickaxe();
        break;
      case "minex":
        mine();
        break;
      case "comex":
        goToPlayer(username);
        break;
      case "stop":
        break;
      case "throw":
        expunge();
        break;
      default:
        const a = 1;
    }
  });
});

bot.on("kicked", console.log);
bot.on("error", console.log);
