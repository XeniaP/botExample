const fs = require('fs');
const Discord = require('discord.js');
const Keyv = require('keyv');
const { prefix, token } = require('./auth.json');
const { cli } = require('winston/lib/winston/config');
const { isRegExp } = require('util');

const client = new Discord.Client();
client.commands = new Discord.Collection();
const cache = new Keyv();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log('Ready!');
  console.log(`Logged in as ${client.user.tag}!`);

  setInterval(function(){
    count = [];
    client.guilds.cache.forEach(el => {
        count.push(el);
    });
  }, 10000);

  /**var countChannels = [];
  client.channels.cache.forEach(channel =>{
    countChannels.push(channel);   
  });

  var countRoles = [];
  client.guilds.cache.forEach(el =>{
    el.roles.cache.forEach(role => {
      countRoles.push(role);  
    })
  });**/

});

client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
  if (!channel) return;
  channel.send(`Welcome to the Cyberwomen Challenge, ${member}!`);
});

client.on('message', message => {  
  var adminRole;
  var trenderRole;
  client.guilds.cache.forEach(el => {
    el.roles.cache.forEach(role => {
      if(role.name === "Admin"){
        adminRole = role;
      }else if(role.name === "Trender"){
        trenderRole = role;
      } 
    })
    el.members.cache.forEach(u => {
      if((u.user.username === message.author.username) || (message.author.bot)){
        //Se valida si el usuario tiene privilegios
        if(!message.member.roles.cache.some(role => role.name === "Trender") || !message.member.roles.cache.some(role => role.name === "Admin")) return;

        if (!message.content.startsWith(prefix) || message.author.bot) return;
    
        const args = message.content.slice(prefix.length).split(/ +/);
        const commandName = args.shift().toLowerCase();

        if (!client.commands.has(commandName)) return;

        const command = client.commands.get(commandName);

        if (command.args && !args.length) {

          let reply = `You didn't provide any arguments, ${message.author}!`;

          if (command.usage) {
            reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
          }
          return message.channel.send(reply);

        }

        try {
          command.execute(message, args, cache, client);
        } catch (error) {
          console.error(error);
          message.reply('there was an error trying to execute that command!');
        }
      }
    });
  });
});

client.login(token);