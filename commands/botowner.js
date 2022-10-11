/*
 * @Author: BanderDragon 
 * @Date: 2020-04-14
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-11 02:29:03
 * 
 * Command to display the discord ID of the bot owner to the sending channel
 */
const library = require('../library');

module.exports = {
	name: 'botowner',
	description: `Returns the ID of my owner on this server`,
	cooldown: 30,
	category: 'utility',
	version: '1.0.3',
	args: false,
	guildOnly: true,

	/*eslint no-unused-vars: ["error", { "args": "none" }]*/
	execute(message, args) {
        message.channel.send(`According to my records, the bot owner for discord server *${global.library.Discord.getGuildName(message.guild)}* is ${library.Admin.owner(message.guild.id, message.client)}`);
	},
};
