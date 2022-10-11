/*
 * @Author: Noscere 
 * @Date: 2022-10-11 03:16:00 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-11 03:16:32
 * 
 * Command to return information about the bot. Displayed as a user card.
 *
 */


const library = require('../library');

module.exports = {
    name: `${library.Config.packageName()}`,
    description: 'Returns some rudimentary information about me. This command displays the discord user details of @BOTNAME.',
    cooldown: 60,
    args: false,
    category: 'utility',
    version: '1.0.2',

    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    async execute(message, args) {
        var msg = library.Helper.sendStandardWaitMessage(message.channel);
        var embedMsg = global.library.Helper.userCard(message.client.user, message.channel, message.client);
        library.Helper.editMessageEmbed(msg, embedMsg);
    }
};
