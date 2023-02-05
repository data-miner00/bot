const mineflayer = require("mineflayer");

const bot = mineflayer.createBot({
  host: "localhost",
  port: 45565,
  username: "3060ti",
});

function lookAtPlayer() {
  const filterPlayer = (entity) => entity.type === "player";
  const playerEntity = bot.nearestEntity(filterPlayer);

  if (!playerEntity) return;

  const position = playerEntity.position.offset(0, playerEntity.height, 0);
  bot.lookAt(position);
}

bot.once("spawn", () => {
  bot.chat("Hello server");
});

bot.on("physicTick", lookAtPlayer);

bot.on("kicked", console.log);
bot.on("error", console.log);
