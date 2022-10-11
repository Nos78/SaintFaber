/*
 * @Author: BanderDragon 
 * @Date: 2019-05-06 08:09:56
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-11 02:34:07
 * 
 * Command to export all the discord guilds that the
 * bot is currently connected to. This is returned
 * as a text file and DM'ed to the message sender.
 */

const library = require('../library');
const moment = require('moment');

// Set up the logger for debug/info
const logger = require('winston');

module.exports = {
    name: 'exportguilds',
    description: 'Export all the discord guilds that @BOTNAME is connected to into a text file.',
    args: false,
    usage: 'export',
    cooldown: 3,
    version: '0.0.1',
    category: 'owner',    
    guildOnly: true,

    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    execute(message, args) {
        var msg = library.Helper.sendStandardWaitMessage(message.channel);
        if (!library.Admin.isBotOwner(message.author.id)) {
            return library.Helper.editWaitErrorMessage(msg, `Sorry ${message.author}, this is a privileged command. Only my owner can use this command.`);
        }
        const client = message.client;
        var data = [];
        data.push(`__Here is a list of all the guilds that I am currently connected to:__\n`);
        data.push(`ID,Name%Members%Joined%Deleted?%Owner%Region`);
        var connectedIds = client.guilds.map(guild => guild.id).sort();
        for(var i = 0; i < connectedIds.length; i++) {
            var guild = client.guilds.cache.get(connectedIds[i]);
            var joined = moment(guild.joinedAt).format('DD/MM/YYYY');
            data.push(`${guild.id}%${guild.name}%${guild.memberCount}%${joined}%${guild.deleted}%${guild.owner}%${guild.region}`)
        }
        message.author.send(data, { split: true })
            .then(() => {
                if (message.channel.type === 'dm') return;
                library.Helper.editWaitSuccessMessage(msg, `${message.author}, I've sent you a DM where you will find a text file that contains all the discord guilds that I am connected to.`);
            })
            .catch(error => {
                logger.error(`Could not send DM to ${message.author.tag}.\n`, error);
                message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
        });
    } // execute
} // module.exports
