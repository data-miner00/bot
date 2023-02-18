const mineflayer = require("mineflayer");
const toolPlugin = require("mineflayer-tool").plugin;
const {
  pathfinder,
  Movements,
  goals: { GoalNear },
  goals,
} = require("mineflayer-pathfinder");
const { Vec3 } = require("vec3");

const bot = mineflayer.createBot({
  host: "localhost",
  port: 25565,
  username: "3060ti",
});

bot.loadPlugin(pathfinder);
bot.loadPlugin(toolPlugin);

async function* generateMine(target) {
  while (true) {
    yield await bot.dig(target);
  }
}

module.exports = {
  bot,
  lookAtPlayer() {
    const filterPlayer = (entity) => entity.type === "player";
    const playerEntity = bot.nearestEntity(filterPlayer);

    if (!playerEntity) return;

    const position = playerEntity.position.offset(0, playerEntity.height, 0);
    bot.lookAt(position);
  },
  sayItems() {
    const items = bot.inventory.items();
    const output = items.map((i) =>
      i ? `${i.name}x${i.count}` : "nothing in inventory"
    );
    bot.chat(output.join(", ") || "nothing in inventory");
  },
  goToPlayer(username) {
    const defaultMove = new Movements(bot);
    const target = bot.players[username]?.entity;

    if (!target) {
      bot.chat("Don't see you!");
      return;
    }

    const player = target.position;

    bot.pathfinder.setMovements(defaultMove);
    bot.pathfinder.setGoal(new GoalNear(player.x, player.y, player.z, 1));
  },
  async equipPickaxe() {
    let itemsByName;
    if (bot.supportFeature("itemsAreNotBlocks")) {
      itemsByName = "itemsByName";
    } else if (bot.supportFeature("itemsAreAlsoBlocks")) {
      itemsByName = "itemsAreAlsoBlocks";
    }
    try {
      await bot.equip(bot.registry[itemsByName].stone_pickaxe.id, "hand");
      bot.chat("equipped dirt");
    } catch (err) {
      bot.chat(`unable to equip dirt: ${err.message}`);
    }
  },
  async mine() {
    const defaultMove = new Movements(bot);
    // var target = bot.blockAt(new Vec3(-12, 64, -8));
    var target = bot.blockAt(new Vec3(19, 69, -59));
    var stand = target.position.offset(2, -1, 0);

    bot.pathfinder.setMovements(defaultMove);
    bot.pathfinder.setGoal(new GoalNear(17, 68, -59, 1));
    while (!bot.pathfinder.isMoving) {
      break;
    }
    bot.chat("reach");
    for (;;) {
      try {
        await bot.tool.equipForBlock(target, {
          requireHarvest: true,
        });
        await bot.dig(target);
      } catch (e) {
        bot.chat(String(e));
        break;
      }
    }
  },
  async expunge() {
    var inventoryItemCount = bot.inventory.items().length;
    if (inventoryItemCount === 0) return;

    while (inventoryItemCount > 0) {
      const item = bot.inventory.items()[0];
      // bot.chat(`Throwed ${item.name}`);
      await bot.tossStack(item);
      inventoryItemCount--;
    }
  },
};
