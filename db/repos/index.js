/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:45:34 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-09 18:46:23
 */

'use strict';

// Renaming and exporting all repository classes:

module.exports = {
    // Discord tables
    Users: require('./users'),
    Guilds: require('./guilds'),

    // Albion Online (AO) tables
    AOGuilds: require('./ao_guilds')
    AOPlayers: require('./ao_players')

    // Configuration settings table (guild is discord guild, not game specific, eg not AO_guild)
    UserGlobalSettings: require('./user_global_settings'),
    UserGuildSettings: require('./user_guild_settings'),
    GuildSettings: require('./guild_settings')
};
