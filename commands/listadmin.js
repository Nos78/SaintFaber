/*
 * @Author: BanderDragon 
 * @Date: 2019-05-10 19:54:25
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-11 03:01:31
 * 
 * Command to list all the users that are considered to
 * be admins of the current discord server.
 */
const library = require('../library');

module.exports = {
    name: 'listadmin',
    description: `This command lists all the users who are considered administrators of this guild.`,
    aliases: ['lista'],
    category: 'admin',
    version: '0.0.4',
    guildOnly: true,

    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    execute(message, args) {
        let countTotal = 0;
        let msgResponse = `Guild ${message.guild.name}, has the following admins:\n`;
        message.guild.members.cache.forEach(function(member) {
            if (library.Admin.isAdmin(member.id, message.guild.id, message.client)) {
               msgResponse = msgResponse + member.displayName + `\n`;
               countTotal++;
            }
        });
        msgResponse = msgResponse + `\nA total of ${countTotal} members`
        message.channel.send(`${msgResponse}`);
            
    }
}

