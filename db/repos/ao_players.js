/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:28:45 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-12 01:28:02
 */

'use strict';

const sql = require('../sql').ao_players;

const Logger = require('winston');

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
        var created = this.db.task(t => {
            return t.none(sql.create)
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in ao_players create()`);
            Logger.error(e);
        });
        return created;
    }

    exists() {
        var exist = this.db.task(t => {
            return t.result(sql.exists, [])
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in ao_guilds exists()`);
            Logger.error(e);
        });

        // successful result() returns the query result with a boolean field, 'exists'
        // some logic error check first (exist shouldnt be null)
        if(exist) {
            return exist.rows[0].exists;
        } else {
            return false;
        }
    }

    // Drops the table;
    drop() {
        var dropped = this.db.task(t => {
            return t.none(sql.drop)
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in ao_players drop()`);
            Logger.error(e);
        });
        return dropped;
    }

    // Removes all records from the table;
    empty() {
        var emptied = this.db.task(t => {
            return t.none(sql.empty)
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in ao_players empty()`);
            Logger.error(e);
        });
        return emptied;
    }

    // Adds a new player, and returns the new object;
    // returns null if the player already exists
    add(player_id) {
        var added = this.db.task(t => {
            return t.oneOrNone(sql.add, player_id)
                .then(player => {
                    if (player == null || player.length == 0) {
                        this.findPlayerById(player_id)
                            .then (player => {
                                return player;
                            });
                    }
                    return player;
                });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in ao_players add(${player_id})`);
            Logger.error(e);
        });
        return added;
    }

    // Tries to delete a player by id, and returns the number of records deleted;
    removePlayer(player_id) {
        var removed = this.db.task(t => {
            return t.one('DELETE FROM ao_players WHERE player_id = $1', player_id)
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in ao_players removePlayer(${player_id})`);
            Logger.error(e);
        });
        return removed;
    }

    // Tries to delete one or more players by user id, and returns the numberof records deleted
    removeUser(user_id) {
        var removedPlayerByUserId = this.db.task(t => {
            return t.result('DELETE FROM ao_players WHERE user_id = $1', +user_id, r => r.rowCount)
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            //sucess
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in ao_players removeUser(${user_id})`);
            Logger.error(e);
        });
        return removedPlayerByUserId;
    }

    // Tries to find a player from their discord player id;
    findPlayerById(player_id) {
        var foundPlayerById = this.db.task(t => {
            return t.oneOrNone('SELECT * FROM ao_players WHERE player_id = $1', player_id)
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // sucess
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in ao_players findPlayerById(${player_id})`);
            Logger.error(e);
        });
        return foundPlayerById;
    }

    // Tries to find a player from their name
    findPlayerByName(name) {
        // TODO if player does not exist
        // We could query the AO API directly and add the player?
        // If there is more than one returned, which do we add? This will need a
        // prompt by the bot, so this may be the wrong context to add this functionality
        var foundPlayerByName = this.db.task(t => {
            return t.manyOrNone('SELECT * FROM ao_players WHERE name = $1', name)
                .then(retval => {
                    return retval;
                    // TODO - if player does not exist we could look them up here?
                    // Or this logic might be better placed elsewhere depending
                    // on if this function fails to find?
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in ao_players findPlayerByName(${name})`);
            Logger.error(e);
        });
        return foundPlayerByName;
    }

    // Returns all player records;
    all() {
        var allRecords = this.db.task(t => {
            return t.any('SELECT * FROM ao_players')
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in ao_players all()`);
            Logger.error(e);
        });
        return allRecords;
    }

    // Returns the total number of ao_players;
    total() {
        var totalCount = this.db.task(t => {
            return t.one('SELECT count(*) FROM ao_players', [], a => +a.count)
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in ao_players total()`);
            Logger.error(e);
        });
        return totalCount;
    }

    // insert new player or update existing
    upsert(values) {
        var upserted = this.db.task(t => {
            return t.one(sql.upsert, {
                        userId: values.user_id,
                        discordGuildId: values.guild_id,
                        AOGuildId: values.ao_guild_id,
                        playerId: values.player_id,
                        playerName: values.player_name})    
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in ao_players upsert(${JSON.stringify(values)})`);
            Logger.error(e);
        });
        return upserted;
    }
        
    // Tries to find a user's players from id;
    findByUser(userId) {
        var foundByUserId = this.db.task(t => {
            return t.manyOrNone(sql.findByUser, {
                        userId: userId})
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r
        }).catch(e => {
            Logger.info(`An error occurred in ao_players findByUser(${userId})`);
            Logger.error(e);
        });
        return foundByUserId;
    }
    
    // Finds players by guild (individual discord server)
    findByGuild(guildId, orderBy) {
        if (orderBy == null || orderBy.length == 0) {
            orderBy = 'user_id';
        }
        Logger.debug(`findByGuild(${guildId}, ${orderBy}`);

        var foundByGuildId = this.db.task(t => {
            return t.any(sql.findByGuild, {
                        guildId: guildId, orderBy: orderBy})
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in ao_players findByGuild(${guildId}, ${orderBy})`);
            Logger.error(e);
        });
        return foundByGuildId;
    }
    
    // Finds players by ao guild
    findByAOGuild(AOGuildId, orderBy) {
        if (orderBy == null || orderBy.length == 0) {
        orderBy = 'user_id';
        }
        Logger.debug(`findByGuild(${AOGuildId}, ${orderBy}`);

        var foundByAOGuildId = this.db.task(t => {
            return t.any(sql.findByAOGuild, {
                        AOGuildId: AOGuildId, orderBy: orderBy})
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in ao_players findByAOGuild(${AOGuildId}, ${orderBy})`);
            Logger.error(e);
        });
        return foundByAOGuildId;
    }

    findByUserAndGuild(userId, guildId) {
        var foundByUserAndGuild = this.db.task(t => {
            return t.oneOrNone(sql.findByUserAndGuild, {
                        userId: userId, guildId: guildId})
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).error(e => {
            Logger.info(`An error occurred in ao_players findByUserAndGuild(${userId}, ${guildId})`);
            Logger.error(e);
        });
        return foundByUserAndGuild;
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
