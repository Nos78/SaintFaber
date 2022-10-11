/*
 * @Author: BanderDragon 
 * @Date: 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-11 03:06:07
 * 
 * Returns the user who is registered as being the owner of the bot.
 */
const library = require('../library');

module.exports = {
	name: 'guildowner',
	aliases: ['serverowner','owner', 'listowner'],
	cooldown: 30,
	args: false,
	description: `Returns the user who is recorded as being the owner of @SERVERNAME. This is usually the person who created the server, unless ownership has been transferred.\n**This is NOT the same as my owner!**`,
	guildOnly: true,
	version: '0.0.1',
	category: 'utility',

	/*eslint no-unused-vars: ["error", { "args": "none" }]*/
	execute(message, args) {
		var owner = library.Admin.owner(message.guild.id, message.client);
        message.channel.send(`According to my records, the current owner of ${message.guild.name} is ${owner.displayName} - pulling up their details for you:`);
	
		const ownerID = library.Admin.owner(message.guild.id, message.client);
		var msg = library.Helper.sendStandardWaitMessage(message.channel);
		message.client.fetchUser(ownerID)
			.then(function (creatorUser) {
				var embedMsg = global.library.Helper.userCard(creatorUser, message.channel, message.client, owner);
				library.Helper.editMessageEmbed(msg, embedMsg);
		}.bind(this));
	}
};
