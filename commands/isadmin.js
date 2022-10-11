/*
 * @Author: BanderDragon 
 * @Date: 2020-08-25 02:55:56 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-11 02:48:16
 * 
 * Command to determine whether the command issuer is 
 * known as an admin of the current server.
 */

 const library = require('../library');

module.exports = {
	name: 'isadmin',
	description: `Are you an admin of this server? This command will let you know! This command will indicate whether @BOTNAME considers you to have administration privileges and able to use commands that require elevated permissions.`,
	cooldown: 30,
	args: false,
	guildOnly: true,
	version: '1.0.3',
	category: 'utility',

	/*eslint no-unused-vars: ["error", { "args": "none" }]*/
	execute(message, args) {
    let admin = "is not";
    if(library.Admin.isAdmin(message.author.id, message.guild.id, message.client)) {
      admin = "is"
    }
    message.channel.send(`According to my records, ${message.author} ${admin} recorded as an admin of ${message.guild.name}.`);
	},
};
