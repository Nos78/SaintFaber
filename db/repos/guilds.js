/*
 * @Author: BanderDragon 
 * @Date: 2019-05-06 08:09:56 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-12 01:59:34
 */

'use strict';

const sql = require('../sql').guilds;

const cs = {}; // Reusable ColumnSet objects.

const Logger = require('winston');

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

class GuildsRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;

        // set-up all ColumnSet objects, if needed:
        createColumnsets(pgp);
    }

    // Creates the table
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
            Logger.info(`An error occurred in guilds create()`);
            Logger.error(e);
        });

        return created;
    }

    /**
     * Queries database and returns whether the guilds table exists
     * @returns boolean true or false if the table exists
     */
    exists() {
        var exist = this.db.task(t => {
            return t.result(sql.exists, [])
                .then(retval => {
                    return retval
            });
        }).then(r => {
            // success
            
            // successful result() returns the query result with a boolean field, 'exists'
            // some logic error check first (exist shouldn't be null)
            if(r && r.rows) {
                return r.rows[0].exists;
            } else {
                return false;
            }
        }).catch(e => {
            Logger.info(`An error occurred in guilds exists()`);
            Logger.error(e);
        });

        return exist;
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
            Logger.info(`An error occurred in guilds drop()`);
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
            Logger.info(`An error occurred in guilds empty()`);
            Logger.error(e);
        });
        return emptied;
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
        var added = this.db.task(t => {
            return t.oneOrNone(sql.add, guildId)
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in guilds add(${guildId})`);
            Logger.error(e);
        });
        return added;
    }

    // Tries to delete a user by id, and returns the number of records deleted;
    remove(guildId) {
        var removed = this.db.task(t => {
            return t.result('DELETE FROM guilds WHERE guild_id = $1', +guildId, r => r.rowCount)
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`Àn error occurred in guilds remove(${guildId})`);
            Logger.error(e);
        });
        return removed;
    }

    // Tries to find a guild from their discord guild id;
    findGuildById(guildId) {
        var foundGuildById = this.db.task(t => {
            return t.oneOrNone('SELECT * FROM guilds WHERE guild_id = $1', guildId)
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in guilds findGuildById(${guildId})`);
            Logger.error(e);
        });
        return foundGuildById;
    }

    // Returns all user records;
    all() {
        var allRecords = this.db.task(t => {
            return t.any('SELECT * FROM guilds')
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in guilds all()`);
            Logger.error(e);
        });
        return allRecords;
    }

    // Returns the total number of guilds;
    total() {
        var totalCount = this.db.task(t => {
            return t.one('SELECT count(*) FROM guilds', [], a => +a.count)
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in guilds total()`);
            Logger.error(e);
        });
        return totalCount;
    }
}

//////////////////////////////////////////////////////////
// Example of statically initializing ColumnSet objects:

function createColumnsets(pgp) {
    // create all ColumnSet objects only once:
    if (!cs.insert) {
        // Type TableName is useful when schema isn't default "public" ,
        // otherwise you can just pass in a string for the table name.
        const table = new pgp.helpers.TableName({table: 'guilds', schema: 'public'});

        cs.insert = new pgp.helpers.ColumnSet(['guild_id'], {table});
        cs.update = cs.insert.extend(['?id']);
    }
    return cs;
}

module.exports = GuildsRepository;
