/*
 * @Author: BanderDragon 
 * @Date: 2019-07-02 00:57:15
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-11 02:54:07
 *
 * Command to determine whether the command issuer is
 * known as the creator of the bot, as defined in the
 * config json.
 */

const library = require('../library');
const logger = require('winston');

module.exports = {
    name: 'iscreator',
    description: 'Checks if you are registered as my creator',
    cooldown: 60,
    args: false,
    category: 'utility',
    usage: '<@memberName>',
    version: '1.1.1',

    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    async execute(message, args) {
        logger.debug(`Creator command requested. Author id = ${message.author.id} and botOwnerId = ${library.Admin.botOwnerId()}`);

        if(library.Admin.isBotCreator(message.author.id)) {
            message.channel.send(`Greetings, ${message.author}, you are my creator!`);
        } else {
          message.channel.send(`Greetings, ${message.author}, alas you are not my creator.`);
        }
    }
};
