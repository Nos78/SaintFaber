/*
 * @Author: BanderDragon 
 * @Date: 2019-05-05 18:46:55
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-11 02:34:56
 * 
 * Command to return the discord id of the current discord guild.
 */

const config = require('../config.json');

module.exports = {
  name: 'guildid',
  aliases: ['serverid', 'gid'],
  description: 'Returns the discord Id of the current guild (server).',
  cooldown: 60,
  version: '1.0.1',
  category: 'utility',
  args: false,

  /*eslint no-unused-vars: ["error", { "args": "none" }]*/
  async execute(message, args) {
    message.channel.send({embed: {
        color:config.standardMessageColor,
        description: `This guild is called ${message.guild.name}.  The Id is ${message.guild.id}`
      }});
  },
};
