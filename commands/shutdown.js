/*
 * @Author: BanderDragon 
 * @Date: 2020-09-09 02:55:51 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-11 03:20:25
 * 
 * Command to shut down the bot on the VM (Virtual machine).
 * Unless there is a script such as systemd to restart the process,
 * the bot will not come back online without logging into the VM.
 */
const library = require('../library');
const process = require('process');

module.exports = {
	name: 'shutdown',
	description: `Shuts down @BOTNAME - this command can only be performed by my owner. Without any systemd or other such process to restart the bot, the bot will not come back online unless you access the host machine directly.`,
	cooldown: 30,
	args: false,
	category: 'owner',
	version: '0.0.2',
	guildOnly: true,
	
	/*eslint no-unused-vars: ["error", { "args": "none" }]*/
	async execute(message, args) {
		if(library.Admin.isBotOwner(message.author.id)) {
			try {
				await library.Helper.sendSuccessMessage(`${message.author}, shut down of my critical systems has been activated.`, message.channel);
				process.exit();
			} catch (e) {
				library.Helper.sendErrorMessage(`${message.author}, shut down failed: ERROR ${e.message}.`, message.channel);
			}
		} else {
			library.Helper.sendErrorMessage(`Sorry, ${message.author}, this command can only be performed by my owner.`, message.channel);
		}
	}
};
