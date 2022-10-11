/*
 * @Author: BanderDragon 
 * @Date: 2019-05-16 22:04:42
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-11 03:17:58
 * 
 * Command to send a message as the bot. IE the message will
 * appear to have originated from the bot itself. Observant
 * folks will notice the command issuer sending the originating
 * command, although the bot will immediately delete this.
 */

const library = require('../library');

module.exports = {
    name: 'sendmessage',
    description: `Use this command to send a message as the bot.  Your message will be deleted.  Only administrators can use this command.`,
    aliases: ['send', 'sendmsg'],
    usage: '<message>`',
    args: true,
    category: 'admin',
    version: '0.1.3',
    guildOnly: true,
    execute(message, args) {
        if (library.Admin.isAdmin(message.author.id, message.guild.id, message.client)) {
            var msgToSend = library.collateArgs(0, args);
            message.channel.send(`${msgToSend}`);
            message.delete();
        }
    },
}
