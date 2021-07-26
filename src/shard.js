const { ShardingManager } = require("discord.js");
const config = require("./config.json");

const shards = new ShardingManager("./src/processor.js", {
    token: config.token,
    totalShards: "auto"
});

shards.on("shardCreate", shard => {
    console.log(`Launched shard #${shard.id}`);
});

shards.spawn(shards.totalShards, 10000);