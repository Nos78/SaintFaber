/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:28:45 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-10 15:51:35
 */

'use strict';

const sql = require('../sql').ao_players;

const cs = {}; // Reusable ColumnSet objects.

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

class AOPlayersRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;

        // set-up all ColumnSet objects, if needed:
        createColumnsets(pgp);
    }

    // Creates the table;
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

    // Adds a new player, and returns the new object;
    // returns null if the player already exists
    add(player_id) {
        return this.db.oneOrNone(sql.add, player_id)
          .then (player => {
            if (player == null || player.length == 0) {
              findPlayerById(player_id)
                .then (player => {
                  return player;
              })
            }
            return player;
        });
    }

    // Tries to delete a player by id, and returns the number of records deleted;
    removePlayer(player_id) {
        return this.db.one('DELETE FROM ao_players WHERE player_id = $1', player_id);
    }

    // Tries to delete one or more players by user id, and returns the numberof records deleted
    removeUser(user_id) {
        return this.db.result('DELETE FROM ao_players WHERE user_id = $1', +user_id, r => r.rowCount);
    }

    // Tries to find a player from their discord player id;
    findPlayerById(player_id) {
        return this.db.oneOrNone('SELECT * FROM ao_players WHERE player_id = $1', player_id);
    }

    // Tries to find a player from their name
    findPlayerByName(name) {
        // TODO if player does not exist
        // We could query the AO API directly and add the player?
        // If there is more than one returned, which do we add? This will need a
        // prompt by the bot, so this may be the wrong context to add this functionality
        return this.db.manyOrNone('SELECT * FROM ao_players WHERE name = $1', name);
    }

    // Returns all player records;
    all() {
        return this.db.any('SELECT * FROM ao_players');
    }

    // Returns the total number of ao_players;
    total() {
        return this.db.one('SELECT count(*) FROM ao_players', [], a => +a.count);
    }

    // insert new player or update existing
    upsert(values) {
        return this.db.one(sql.upsert, {
            userId: values.user_id,
            discordGuildId: values.guild_id,
            AOGuildId: values.ao_guild_id,
            playerId: values.player_id,
            playerName: values.player_name
        });
    }
        
    // Tries to find a user's players from id;
    findByUser(userId) {
        return this.db.manyOrNone(sql.findByUser, {
            userId: userId
        });
    }
    
    // Finds players by guild (individual discord server)
    findByGuild(guildId, orderBy) {
        if (orderBy == null || orderBy.length == 0) {
        orderBy = 'user_id';
        }
        logger.debug(`findByGuild(${guildId}, ${orderBy}`);
        return this.db.any(sql.findByGuild, {
        guildId: guildId, orderBy: orderBy
        });
    }
    
    // Finds players by ao guild
    findByAOGuild(AOGuildId, orderBy) {
        if (orderBy == null || orderBy.length == 0) {
        orderBy = 'user_id';
        }
        logger.debug(`findByGuild(${AOGuildId}, ${orderBy}`);
        return this.db.any(sql.findByAOGuild, {
            AOGuildId: AOGuildId, orderBy: orderBy
        });
    }

    findByUserAndGuild(userId, guildId) {
        return this.db.oneOrNone(sql.findByUserAndGuild, {
        userId: userId, guildId: guildId
        });
    }
}

//////////////////////////////////////////////////////////
// Example of statically initializing ColumnSet objects:

function createColumnsets(pgp) {
    // create all ColumnSet objects only once:
    if (!cs.insert) {
        // Type TableName is useful when schema isn't default "public" ,
        // otherwise you can just pass in a string for the table name.
        const table = new pgp.helpers.TableName({table: 'ao_players', schema: 'public'});

        cs.insert = new pgp.helpers.ColumnSet(['player_id'], {table});
        cs.update = cs.insert.extend(['?id']);
        cs.update = cs.insert.extend({ name: 'name', mod:'varchar', def:null});
        cs.update = cs.insert.extend({ name: 'discord_guild_id', mod:'int', def:null});
        cs.update = cs.insert.extend({ name: 'alliance_id', mod:'int', def:null});
    }
    return cs;
}

module.exports = AOPlayersRepository;
