const Discord = require('discord.js');

const func_approve = require('../functions/approve.js');
const func_team = require('../functions/team.js');
const func_createChannel = require('../functions/createChannel.js');

module.exports = {
	name: 'game',
  description: 'MessageEmbed Generate Random Teams.',
  execute(message, args, cache) {(async () => {
    var ap = await func_approve.game(message, cache);
    if (ap.status) {
      let teams = func_team.team(argsCheck(args), message.member.voice.channel.members);

      // creates the voice channels
      func_createChannel.createChannel(message, cache, argsCheck(args), arraTeam(teams));

      const generatedTeam = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Team Generated')
        .addFields(teams);
    
          
      message.channel.send(generatedTeam);
    } else {
      message.channel.send(ap.msg);
    }
  })()}
};

function argsCheck(args) {
  if (args.length == 1) {
    return args[0];
  } else {
    return 2
  }
}

function arraTeam(teams) {
  arr = [];
  for (let i = 0; i < teams.length; i++) {
    arr.push(teams[i].name);
  }
  return { teams: arr };
}

// get user id
//userID = message.channel.guild.ownerID;
//author = message.channel.members.get(userID);
//console.log(userID);

// get voice channel id
//channel = message.member.voice.channel;
//channel = message.member.voice.channelID;
//console.log(channel);

// get all voice channel members
//message.member.voice.channel.members


// fazer como que crei dois canais como o nome das teams e mudar o respetivo pessoal para la.
// talvez mete iamgem do mapa e das equipas
// problema - quando cria as teams ao fazer !end numa dessas teams nao termina a session