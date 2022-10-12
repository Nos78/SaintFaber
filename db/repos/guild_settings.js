/*
 * @Author: BanderDragon 
 * @Date: 2020-08-31 20:55:32
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-12 01:52:06
 */

'use strict';

const Logger = require('winston');

const sql = require('../sql').guild_settings;

const cs = {}; // Reusable ColumnSet objects.

 /**
  * @class GuildSettingsRepository
  * @description Class representing the GuildSettingsRepository. This class encapsulates the logic required
  * to access the data source(s) and the data contained within the model layer.
  */
class GuildSettingsRepository {
    /**
     * Constructor, creates an instance of GuildSettingsRepository.
     * @date 31/08/2020
     * @param {Database} db
     * @param {pg-promise} pgp
     * @memberof GuildSettingsRepository
     */
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;
        
        // set-up all ColumnSet objects, if needed:
        createColumnsets(pgp);
    }

    // ************************************************************************
    // TABLE Operations
    // Create, drop, empty and check if 'guild_settings' table exists.
    // ************************************************************************

    promiseState (p) {
        /* var a = Promise.resolve();
           var b = Promise.reject();
           var c = new Promise(() => {});
           
           promiseState(a).then(state => console.log(state)); // fulfilled
           promiseState(b).then(state => console.log(state)); // rejected
           promiseState(c).then(state => console.log(state)); // pending
        */
        const t = {};
        return Promise.race([p, t])
            .then(v => (v === t)? "pending" : "fulfilled", () => "rejected");
    }

    /**
     * @description Creates the guild_settings table using the defined SQL query. A successful call
     * to this function, once the promise is completed, should return no data. Any data returned by
     * the query will represent an error.
     * @returns {Promise<QueryResultError>} A promise object representing the result.
     * @memberof GuildSettingsRepository
     */
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
            Logger.info(`An error occurred in guild_settings create()`);
            Logger.error(e);
        });
        return created;
    }

    /**
     * @description Check if the guild_settings table exists. The database query will
     * give a {Promise<Result>} the result of the query, with a boolean 'exists' field.
     * Instead of returning this object, this function returns this boolean field directly
     * @returns Boolean true or false if the table exists.
     * @memberof GuildSettingsRepository
     */
    exists() {
        var exist = this.db.task(t => {
            return t.result(sql.exists, [])
                .then(retval => {
                    return retval;
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
            Logger.info(`An error occurred in guild_settings exists()`);
            Logger.error(e);
        });

        return exist;
    }

    /**
     * @description Drops (deletes) the guild_settings table.  Once the promise is completed, a successful
     * result will contain no data. Any data return will describe the error encountered.
     * @returns {Promise<QueryResultError>} A promise object defining the result of the query.
     * @memberof GuildSettingsRepository
     */
    drop() {
        var dropped = this.db.task(t => {
            return t.none('DROP TABLE guild_settings')
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in guild_settings drop()`);
            Logger.error(e);
        });
        return dropped;
    }

    /**
     * @description Empties the guild_settings table, but keeps the table in the database.  Once the promise
     * is completed, a successful operation will contain no data.  Any data returned will describe the error
     * encountered.
     * @returns {Promise<QueryResultError>} A promise object defining the result of the query.
     * @memberof GuildSettingsRepository
     */
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
            Logger.info(`An error occurred in guild_settings empty()`);
            Logger.error(e);
        });
        return emptied
    }

    // ************************************************************************
    // DATA ACCESS
    // Perform operations that manipulate the data contained within the
    // 'guild_settings' table
    // add, update/insert (upsert), remove
    // ************************************************************************

    /**
     * @description Adds a new record for guildId & settings object (JSON), and returns the object.  The
     * return value may be null if the add operation was unsuccessful.
     * @param {string} guildId
     * @param {Object} settings json object
     * @returns {Promise<Result>} resolves with 1 row, or null - multiple results generate a {QueryResultError}
     * @memberof GuildSettingsRepository
     */
    add(guildId, settings) {
        var added = this.db.task(t => {
            return t.oneOrNone(sql.insert, {guildDiscordId: guildId, settings: settings})
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            //success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in guild_settings add(${guildId}, ${JSON.stringify(settings)})`);
            Logger.error(e);
        });
        return added;
    }

    /**
     * @description Adds (inserts) a new record for guildId & settings object (JSON), and returns the object.  The
     * return value may be null if the add operation was unsuccessful.
     * @param {string} guildId
     * @param {Object} settings json object
     * @returns {Promise<Result>} resolves with 1 row, or null - multiple results generate a {QueryResultError}
     * @memberof GuildSettingsRepository
     */
    insert(guildId, settings) {
        return this.add(guildId, settings);
    }

    /**
     * @description Updates or Inserts a new record for a given guildId and settings object.
     * @param {string} guildId - the guild id (the discord alphanumeric id string)
     * @param {Object} settings - Json object describing the settings for guildId
     * @returns {Promise<Result>} A single row object containing the new record, or null. A failure returns a QueryResultError
     * @memberof GuildSettingsRepository
     */
    async upsert(guildId, settings) {
        var guildSettingsObj = await this.add(guildId, settings);
        if (guildSettingsObj == null) {
            guildSettingsObj = this.update(guildId, settings);
        }
        return guildSettingsObj;
    }

    /**
     * @description Updates the record for guild with the given discord guild id.
     * @param {string} guildId - the discord id of the guild being updated.
     * @param {Object} settings - a Json describing the settings for a given guild id.
     * @returns {Promise<Result>} - either a single row object on success, or a QueryResultError on failure
     * @memberof GuildSettingsRepository
     */
    update(guildId, settings) {
        var update = this.db.task(t => {
            return t.one(sql.update, {
                        guildDiscordId: guildId,
                        settings: settings})
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            //success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in guild_settings update(${guildId}, ${JSON.stringify(settings)})`);
            Logger.error(e);
        });
        return update;
    }

    /**
     * @description Removes a record with the given discord guild id from the guild_settings table.
     * @param {string} guildId - the discord ID of the guild
     * @return {*}  
     * @memberof GuildSettingsRepository
     */
    remove(guildId) {
        var removed = this.db.task(t => {
            return t.result(sql.remove, +guildId, r => r.rowCount)
                .then(retval => {
                    return retval;
            });
        }).then(res => {
            // success
            return res;
        }).catch(e => {
            Logger.info(`An error occurred in guild_settings remove(${guildId})`);
            Logger.error(e);
        });
        return removed;
    }

    // ************************************************************************
    // FIND Operations
    // methods to find records in the guild_settings table.
    // ************************************************************************

    /**
     * Finds the record for a given discord guild id.
     * @param {string} guildId 
     * @returns {Promise<Result>} On resolution of the promise, returns the row
     * or null. A failure produces a QueryResultError.
     */
    findGuildSettingsById(guildId) {
        var result = this.db.task(t => {
            return t.oneOrNone(sql.find, guildId)
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in guild_settings findGuildById(${guildId}`);
            Logger.error(e);
        });
        return result;
    }

    /**
     * @description Returns all the records within the 'guild_settings' table.
     * @returns {Promise<Result>} When the Promise is resolved, contains an
     * array of rows. If the table is empty, returns an empty array.
     * @memberof GuildSettingsRepository
     */
    all() {
        var allObj = this.db.task(t => {
            return t.any('SELECT * FROM guild_settings gs JOIN guilds g ON g.id = gs.g_id')
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in guild_settings add()`);
            Logger.error(e);
        });
        return allObj;
    }
    
    // ************************************************************************
    // UTILITY Operations
    // Miscellaneous methods not defined by one of the categories above.
    // ************************************************************************

    // Returns the total number of guild_settings;
    total() {
        var totalRecords = this.db.task(t => {
            return t.one('SELECT count(*) FROM guild_settings', [], a => +a.count)
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in guild_settings total()`);
            Logger.error(e);
        });
        return totalRecords;
    }
}

//////////////////////////////////////////////////////////
// Example of statically initializing ColumnSet objects:

function createColumnsets(pgp) {
    // create all ColumnSet objects only once:
    if (!cs.insert) {
        // Type TableName is useful when schema isn't default "public" ,
        // otherwise you can just pass in a string for the table name.
        const table = new pgp.helpers.TableName({table: 'guild_settings', schema: 'public'});

        cs.insert = new pgp.helpers.ColumnSet(['g_id'], {table});
        cs.update = cs.insert.extend({ name: 'settings', mod: ':raw'});
    }
    return cs;
}

module.exports = GuildSettingsRepository;
