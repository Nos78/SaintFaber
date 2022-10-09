/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:38:39 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-09 18:39:07
 */

'use strict';

const sql = require('../sql').ao_guilds;

const cs = {}; // Reusable ColumnSet objects.

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

class AOGuildsRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;

        // set-up all ColumnSet objects, if needed:
        createColumnsets(pgp);
    }

    // Creates the table
    create() {
        return this.db.none(sql.create);
    }

    exists() {
        return this.db.result(sql.exists, []);
    }

    // Drops the table;
    drop() {
        return this.db.none(sql.drop);
    }

    // Removes all records from the table;
    empty() {
        return this.db.none(sql.empty);
    }

    // Adds a new guild, and returns the new object, and finds it if it exists;
    addOrFind(guildId) {
        return this.add(guildId)
          .then (guild => {
            if (guild == null) {
              return this.findGuildById(guildId);
            }
        })
    }

    // Adds a new guild, and returns the new object or null if it exists
    add(guildId) {
        return this.db.oneOrNone(sql.add, guildId);
    }

    // Tries to delete a guild by id, and returns the number of records deleted;
    remove(guildId) {
        return this.db.result('DELETE FROM ao_guilds WHERE guild_id = $1', +guildId, r => r.rowCount);
    }

    // Tries to find a guild from their discord guild id;
    findGuildById(guildId) {
        return this.db.oneOrNone('SELECT * FROM ao_guilds WHERE guild_id = $1', guildId);
    }

    findGuildByName(name) {
        return this.db.manyOrNone('SELECT * FROM ao_guilds WHERE name = $1', name);
    }

    // Returns all guild records;
    all() {
        return this.db.any('SELECT * FROM ao_guilds');
    }

    // Returns the total number of ao_guilds;
    total() {
        return this.db.one('SELECT count(*) FROM ao_guilds', [], a => +a.count);
    }
}

//////////////////////////////////////////////////////////
// Example of statically initializing ColumnSet objects:

function createColumnsets(pgp) {
    // create all ColumnSet objects only once:
    if (!cs.insert) {
        // Type TableName is useful when schema isn't default "public" ,
        // otherwise you can just pass in a string for the table name.
        const table = new pgp.helpers.TableName({table: 'ao_guilds', schema: 'public'});

        cs.insert = new pgp.helpers.ColumnSet(['guild_id'], {table});
        cs.update = cs.insert.extend(['?id']);
        cs.update = cs.insert.({ name: 'name', mod:'varchar', def:null});
        cs.update = cs.insert.({ name: 'discord_guild_id', mod:'int', def:null});
        cs.update = cs.insert.({ name: 'alliance_id', mod:'int', def:null});
        /*id serial PRIMARY KEY,
        guild_id varchar UNIQUE,
        name varchar,
        discord_guild_id integer references guilds(id) ON DELETE SET NULL,
        alliance_id integer references ao_alliances(id) ON DELETE SET NULL,*/
    }
    return cs;
}

module.exports = AOGuildsRepository;
