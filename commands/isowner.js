/*
 * @Author: BanderDragon 
 * @Date:
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-11 02:55:11
 * 
 * Command to determine whether the command issuer is regarded as an owner of the bot.
 */
const library = require('../library');

module.exports = {
	name: 'isowner',
	description: `Are you my owner? This command will let you know!`,
	cooldown: 30,
	category: 'utility',
	args: false,
	guildOnly: true,
	version: '1.1.2',

    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
	execute(message, args) {
    let owner = "is not";
    if(library.Admin.isOwner(message.author.id, message.guild.id, message.client)) {
      owner = "is"
    }
    message.channel.send(`According to my records, ${message.author} ${owner} recorded as being my owner.`);
	},
};

