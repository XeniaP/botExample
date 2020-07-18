const { prefix } = require('../auth.json');
module.exports = {
	name: 'help',
	description: 'List all of my commands or info about a specific command.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(message, args) {
		const data = [];
    const { commands } = message.client;

    if (!args.length) {
      data.push('Here\'s a list of all my commands:');
      data.push(commands.map(command => `\`${prefix}` + command.name + `\``).join(' | '));
      //data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

      return message.channel.send(data, { split: true })
        .catch(error => {
          console.error(`Could not send help to channel.\n`, error);
        });

    }

	},
};