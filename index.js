const fs = require('fs');
const Discord = require('discord.js');
const Keyv = require('keyv');
const { prefix, token } = require('./auth.json');

console.log(token)
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

  const channelvoice = client.channels.cache.find(c => c.type === 'voice').id;
  console.log(channelvoice)
  setInterval(function(){
    count = [];
    client.guilds.cache.forEach(el => {
        count.push(el);
    });
    console.log(count.length);
  }, 10000);
});

client.on('guildMemberAdd', member => {

  const channelvoice = client.channels.cache.find(c => c.type === 'voice').id;


	const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
  if (!channel) return;
  channel.send(`Welcome to the server, ${member}!`);
});

client.on('message', message => {

  const channelvoice = client.channels.cache.find(c => c.type === 'voice').id;
  
  client.guilds.cache.forEach(el => {
    el.members.cache.forEach(u => {
      if((u.user.username === "YesseniaB")||(u.user.username === "xeniadev")){
        console.log("***")
        console.log(u.user.username)
      }
    });
  });


	if (!message.content.startsWith(prefix) || message.author.bot) return;
    
	const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  console.log(args)

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
  
});

client.login(token);