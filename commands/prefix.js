/**
 * @Author: BanderDragon
 * @Date:   2019-05-10T19:54:25+01:00
 * @Email:  noscere1978@gmail.com
 * @Project: SaintFaber
 * @Filename: privilegedrole.js
 * @Last modified by:
 * @Last modified time: 2019-05-20T19:03:58+01:00
 * 
 * Command to display the prefix for the bot on the server from which
 * the command was issued. The default is displayed where none is set.
 */

const library = require('../library');
const config = require('../config.json');

module.exports = {
    name: 'showprefix',
    description: `Displays the current command prefix for @BOTNAME on your server, which defaults to ${config.prefix} if none has been specified. This prefix can be changed using the setprefix command.`,
    aliases: ['prefix', 'commandprefix', 'showcommandprefix'],
    args: false,
    version: '1.0.2',
    category: 'config',
    guildOnly: true,

    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    execute(message, args) {
        let msg = library.Helper.sendStandardWaitMessage(message.channel);
        var prefix = library.System.getPrefix(message.guild.id);
        prefix.then(prefix => {
            library.Helper.editWaitSuccessMessage(msg, `${message.author}, the command prefix for ${message.guild.name} is ${prefix}`);
        }).catch(err => {
            library.Helper.editWaitSuccessMessage(msg, `Something went wrong, ${message.author}, but I was unable to read from the database.\n\n${err.name}`);
        });
    }
}
