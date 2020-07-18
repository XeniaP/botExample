module.exports = {
  game: async function (message, cache) {

    if (message.member.voice.channel == null) { // check if are in a voice channel
      return { 'status': false, 'msg': 'You need to enter a voice channel' };
    } else if (await cache.get(message.member.voice.channel.id) !== undefined) { // check if there is an active game already
      return { 'status': false, 'msg': 'There is an active game in this channel' };
    } else if (playerCount(message) < 2) { // check if it only you in the voice channel
      return { 'status': false, 'msg': 'You need more friends' };
    }

    return { 'status': true };
  }
}

function playerCount(message) {
  numPlayers = [];
  message.member.voice.channel.members.forEach(key => {
    numPlayers.push(key.id);
  });
  return numPlayers.length;
}