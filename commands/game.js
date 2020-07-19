const Discord = require('discord.js');

const func_map = require('../functions/map.js');
const func_team = require('../functions/team.js');
const func_channel = require('../functions/createChannel.js');
const { tdc } = require('./../games_config.json');
const team = require('../functions/team.js');

module.exports = {
	name: 'game',
  description: 'MessageEmbed Generate Random Map and Teams.',
	execute(message, args, cache, client) {
    var players = [];
    var roles = [];
    client.guilds.cache.forEach(el => {
      el.members.cache.forEach(u => {
        if(u.presence.status === "online"){
          players.push(u)
        }
      });

      el.roles.cache.forEach(role => {
        if(role.name.includes("Team")){
          roles.push(role);  
        }
      })
    });
    
    if (message.member.voice.channel != null) {
      // get Random Map
      if((args.length>0)&&(args[0]==="player")&&(Number.isInteger(parseInt(args[1])))){
        playerPerTeam = players.length/parseInt(args[1]);
        numberTeams = playerPerTeam;
      }else{
        playerPerTeam = players.length/3;
        numberTeams = playerPerTeam;
      }
      var map = func_map.randomMap(tdc, args);

      // get Users and shuffle
      teams = func_team.team(numberTeams, players, map, roles, client);

      const generatedTeam = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Game Generated')
        .addField('Event', map.name, false)
        .addFields(func_team.getTeamNames(numberTeams, teams))
      
      message.channel.send(generatedTeam);
    } else {
      message.channel.send("you need to enter a voice channel");
    }
	}
};

function findMemberRecursive(team, client, role){
  client.guilds.cache.forEach(el => {
    el.members.cache.forEach(u => {
      if(u.user.username === team){
        u.roles.add(role)
      }
    });
  });
}
