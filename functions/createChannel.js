module.exports = {
  createChannel: async function (message, cache, numTeams, map) {
    cacheID = { 'category': '', 'id': [] };

    // create category channel
    category = message.guild.channels.create('RTG: ' + message.member.voice.channel.name + ' - Game', { type: 'category' });

    createdCategory = await category;
    cacheID.category = createdCategory.id;

    for (let i = 0; i < numTeams; i++) {
      // create voice channel
      channel = message.guild.channels.create(map.teams[i], {
        type: 'voice',
        parent: createdCategory.id
        // position: message.member.voice.channel.position
      });

      createdChannel = await channel;
      cacheID.id.push(createdChannel.id);
    }
  
    await cache.set(message.member.voice.channel.id, cacheID);
  }
}

// channel = message.guild.channels.create("test", {
//   type: 'voice',
//   // userLimit: maxPlayer,
//   // position: message.member.voice.channel.position
// });

// c = await channel;

// await cache.set('id', c.id);