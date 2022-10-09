/*
 * @Author: Noscere 
 * @Date: 2019-03-10
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-09 19:03:17
 */

'use strict';

const QueryFile = require('pg-promise').QueryFile;
const path = require('path');

///////////////////////////////////////////////////////////////////////////////////////////////
// Criteria for deciding whether to place a particular query into an external SQL file or to
// keep it in-line (hard-coded):
//
// - Size / complexity of the query, because having it in a separate file will let you develop
//   the query and see the immediate updates without having to restart your application.
//
// - The necessity to document your query, and possibly keeping its multiple versions commented
//   out in the query file.
//
// In fact, the only reason one might want to keep a query in-line within the code is to be able
// to easily see the relation between the query logic and its formatting parameters. However, this
// is very easy to overcome by using only Named Parameters for your query formatting.
////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = {
    // Discord tables
    users: {
      create: sql('users/create.sql'),
      empty: sql('users/empty.sql'),
      drop: sql('users/drop.sql'),
      add: sql('users/add.sql'),
      exists: sql('users/exists.sql')
    },

    guilds: {
      create: sql('guilds/create.sql'),
      empty: sql('guilds/empty.sql'),
      drop: sql('guilds/drop.sql'),
      add: sql('guilds/add.sql'),
      exists: sql('guilds/exists.sql')
    },

    // AO tables
    ao_guilds: {
        add: sql('ao_guilds/add.sql'),
        create: sql('ao_guilds/create.sql'),
        drop: sql('ao_guilds/drop.sql'),
        empty: sql('ao_guilds/empty.sql'),
        exists: sql('ao_guilds/exists.sql')
    },

    ao_players: {
        add: sql('ao_players/add.sql'),
        create: sql('ao_players/create.sql'),
        deleteByGuild: sql('ao_players/deleteByGuild.sql'),
        deleteByUser: sql('ao_players/deleteByUser.sql'),
        deleteByUserAndGuild: sql('ao_players/deleteByUserAndGuild.sql'),
        drop: sql('ao_players/drop.sql'),
        empty: sql('ao_players/empty.sql'),
        exists: sql('ao_players/exists.sql'),
        findByAOGuild: sql('ao_players/findByAOGuild.sql'),
        findByGuild: sql('ao_players/findByGuild.sql'),
        findByUser: sql('ao_players/findByUser.sql'),
        findByUserAndGuild: sql('ao_players/findByUserAndGuild.sql'), 
        upsert: sql('ao_players/upsert.sql')
    },

    guild_settings: {
        create: sql('guild_settings/create.sql'),
        exists: sql('guild_settings/exists.sql'),
        empty: sql('guild_settings/empty.sql'),
        insert: sql('guild_settings/insert.sql'),
        update: sql('guild_settings/update.sql'),
        remove: sql('guild_settings/delete.sql'),
        find: sql('guild_settings/find.sql')
    },

    user_guild_settings: {
        create: sql('user_guild_settings/create.sql'),
        exists: sql('user_guild_settings/exists.sql'),
        empty: sql('user_guild_settings/empty.sql'),
        insert: sql('user_guild_settings/insert.sql'),
        update: sql('user_guild_settings/update.sql'),
        remove: sql('user_guild_settings/delete.sql'),
        removeByUserId: sql('user_guild_settings/deleteByUserId.sql'),
        removeByGuildId: sql('user_guild_settings/deleteByGuildId.sql'),
        find: sql('user_guild_settings/find.sql')
    },

    user_global_settings: {
        create: sql('user_global_settings/create.sql'),
        exists: sql('user_global_settings/exists.sql'),
        empty: sql('user_global_settings/empty.sql'),
        insert: sql('user_global_settings/insert.sql'),
        update: sql('user_global_settings/update.sql'),
        remove: sql('user_global_settings/delete.sql'),
        find: sql('user_global_settings/find.sql')
    }
};

///////////////////////////////////////////////
// Helper for linking to external query files;
function sql(file) {

    const fullPath = path.join(__dirname, file); // generating full path;

    const options = {

        // minifying the SQL is always advised;
        // see also option 'compress' in the API;
        minify: true,

        // Showing how to use static pre-formatting parameters -
        // we have variable 'schema' in each SQL (as an example);
        params: {
            schema: 'public' // replace ${schema~} with "public"
        }
    };

    const qf = new QueryFile(fullPath, options);

    if (qf.error) {
        // Something is wrong with our query file :(
        // Testing all files through queries can be cumbersome,
        // so we also report it here, while loading the module:
        console.error(qf.error);
    }

    return qf;

    // See QueryFile API:
    // http://vitaly-t.github.io/pg-promise/QueryFile.html
}
