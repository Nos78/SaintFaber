/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:38:39 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-12 01:35:52
 */

'use strict';

const Logger = require('winston');

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
        var returnval = this.db.task(t => {
            return t.none(sql.create)
                .then(retval => {
                    return retval;
            });
        }).then(r => {
                // success
                return r;
        }).catch(e => {
                Logger.info(`An error occurred in ao_guilds create()`);
                Logger.error(e);
        });
        return returnval;
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
        var result = this.db.task(t => {
            return t.none(sql.drop)
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success!
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in ao_guilds drop()`);
            Logger.error(e);
        });
        return result;
    }

    // Removes all records from the table;
    empty() {
        var result = this.db.task(t => {
            return t.none(sql.empty)
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in ao_guilds empty()`);
            Logger.error(e);            
        })
        return result;
    }

    // Adds a new guild, and returns the new object, and finds it if it exists;
    addOrFind(guildId) {
        return this.add(guildId)
          .then (guild => {
            if (guild == null) {
              return this.findGuildById(guildId);
            }
        }).catch(e => {
            Logger.info(`An error occurred in ao_guilds addOrFind(${guildId})`);
            Logger.error(e);
        });
    }

    // Adds a new guild, and returns the new object or null if it exists
    add(guildId) {
        var result = this.db.task(t => {
            return t.oneOrNone(sql.add, guildId)
                .then(guild => {
                    return guild;
            });
        }).then(guild => {
            // success
            return guild;
        }).catch(error => {
            // catch the error?
            Logger.info(`An error occurred in ao_guilds add(${guildId})`);
            Logger.error(error);
        });
        return result;
    }

    // Tries to delete a guild by id, and returns the number of records deleted;
    remove(guildId) {
        var result = this.db.task(t => {
            return t.result('DELETE FROM ao_guilds WHERE guild_id = $1', +guildId, r => r.rowCount)
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in ao_guilds remove(${guildId})`);
            Logger.error(e);
        });
        return result;
    }

    // Tries to find a guild from their discord guild id;
    findGuildById(guildId) {
        var result = this.db.task(t => {
            return t.oneOrNone('SELECT * FROM ao_guilds WHERE guild_id = $1', guildId)
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success!
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in ao_guilds findGuildById(${guildId})`);
            Logger.error(e);
        })
        return result;
    }

    findGuildByName(name) {
        var result = this.db.task(t => {
            return t.manyOrNone('SELECT * FROM ao_guilds WHERE name = $1', name)
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success!
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in ao_guilds findGuildByName(${name})`);
            Logger.error(e);
        })
        return result;
    }

    // Returns all guild records;
    all() {
        var result = this.db.task(t => {
            return t.any('SELECT * FROM ao_guilds')
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success!
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in ao_guilds all()`);
            Logger.error(e);
        })
        return result;
    }

    // Returns the total number of ao_guilds;
    total() {
        var total = this.db.task(t => {
            return t.one('SELECT count(*) FROM ao_guilds', [], a => +a.count)
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in ao_guilds total()`);
            Logger.error(e);
        });
        return total;
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
        cs.update = cs.insert.extend({ name: 'name', mod:'varchar', def:null});
        cs.update = cs.insert.extend({ name: 'discord_guild_id', mod:'int', def:null});
        // TODO put this back when alliance is added
        // cs.update = cs.insert.extend({ name: 'alliance_id', mod:'int', def:null});

    }
    return cs;
}

module.exports = AOGuildsRepository;
