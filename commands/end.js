module.exports = {
	name: 'end',
  description: 'end a channel game',
  execute(message, args, cache) {(async () => {

    message.guild.channels.cache.forEach(channel => {
      if(channel.name === "general") return;
      channel.delete()
    });

    console.log(await cache.get('*'));
    
    if (message.member.voice.channel != null) {
      if (await cache.get(message.member.voice.channel.id) == undefined) {

        message.channel.send("No active game");

      } else {
        
        cacheID = await cache.get(message.member.voice.channel.id);

        message.guild.channels.cache.forEach(mgc=> {

          if (mgc.id == cacheID.category) {
            mgc.delete().catch(console.error);;
          }

          cacheID.id.forEach(c => {

            if (mgc.id == c) {
              mgc.delete().catch(console.error);
            }

          });

        });
    
        await cache.delete(message.member.voice.channel.id);
    
        message.channel.send("Game Over");

      }
    } else {
      message.channel.send("you need to enter a voice channel");
    }
  })()},
};