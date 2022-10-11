/*
 * @Author: BanderDragon 
 * @Date: 2020-09-28 23:00:57 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-11 02:29:11
 * 
 * Command returns the a discord user card of the bot creator,
 * as defined in the config json.
 */

const library = require('../library');

module.exports = {
    name: 'creator',
    description: 'Returns the discord username of my creator.',
    cooldown: 60,
    args: false,
    version: '0.1.1',
    category: 'utility',

    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    async execute(message, args) {
        const creatorID = global.library.Admin.botOwnerId();
        var msg = library.Helper.sendStandardWaitMessage(message.channel);
        message.client.fetchUser(creatorID)
            .then(function (creatorUser) {
                var member = null;
                if(message.guild.member(creatorID)) {
                    member = message.guild.members.cache.get(creatorID);
                }
                var embedMsg = global.library.Helper.userCard(creatorUser, message.channel, message.client, member);
                library.Helper.editMessageEmbed(msg, embedMsg);
        }.bind(this));
    }
};
