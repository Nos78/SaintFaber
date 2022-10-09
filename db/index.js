/*
 * @Author: Noscere 
 * @Date: 2022-10-09 19:05:44 
 * @Last Modified by:   Noscere 
 * @Last Modified time: 2022-10-09 19:05:44 
 */
'use strict';

// Bluebird is the best promise library available today,
// and is the one recommended here:
const promise = require('bluebird');

const repos = require('./repos'); // loading all repositories

const config = require('../config.json'); // load the config file

const configSecret = require('../config-secret.json');

// pg-promise initialization options:
const initOptions = {

    // Use a custom promise library, instead of the default ES6 Promise:
    promiseLib: promise,

    // Extending the database protocol with our custom repositories;
    // API: http://vitaly-t.github.io/pg-promise/global.html#event:extend
    extend(obj, dc) {
        // Database Context (dc) is mainly useful when extending multiple databases
        // with different access API-s.

        // Do not use 'require()' here, because this event occurs for every task
        // and transaction being executed, which should be as fast as possible.
        obj.users = new repos.Users(obj, pgp);
        obj.guilds = new repos.Guilds(obj, pgp);
        obj.aoguilds = new repos.AOGuilds(obj, pgp);
        obj.aoplayers = new repos.AOPlayers(obj, pgp);
        obj.userGuildSettings = new repos.UserGuildSettings(obj, pgp);
        obj.userGlobalSettings = new repos.UserGlobalSettings(obj, pgp);
        obj.guildSettings = new repos.GuildSettings(obj, pgp);
    }
};

// Load and initialize pg-promise:
const pgp = require('pg-promise')(initOptions);

// Create the database instance:
const db = pgp(configSecret.db);

// Load and initialize optional diagnostics:
const diagnostics = require('./diagnostics');
diagnostics.init(initOptions);

// If you ever need access to the library's root (pgp object), you can do it via db.$config.pgp
// See: http://vitaly-t.github.io/pg-promise/Database.html#.$config
module.exports = db;
