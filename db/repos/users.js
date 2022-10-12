/**
 * @Date:   2019-04-24T09:29:15+01:00
 * @Email:  noscere1978@gmail.com
 * @Project: SaintFaberaber
 * @Filename: users.js
 * @Last modified time: 2019-05-06T01:42:52+01:00
 */

'use strict';

const sql = require('../sql').users;

const cs = {}; // Reusable ColumnSet objects.

const Logger = require ('winston');

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

class UsersRepository {
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
            Logger.info(`An error occurred in users create()`);
            Logger.error(e);
        });
        return created;
    }

    exists() {
        var exist = this.db.task(t => {
            return t.result(sql.exists, [])
                .then(retval => {
                    return retval
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in guilds exists()`);
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
        }).ten(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in users drop()`);
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
            Logger.info(`An error occurred in users empty()`);
            Logger.error(e);
        });
        return emptied;
    }

    // Adds a new user, and returns the new object;
    // returns null if the user already exists
    add(user_id) {
        var added = this.db.task(t => {
            return t.oneOrNone(sql.add, user_id)
                .then(user => {
                    if (user == null || user.length == 0) {
                        this.findUserById(user_id)
                            .then (user => {
                                return user;
                        });
                    }
                    return user;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in users add(${user_id})`);
            Logger.error(e);
        });
        return added;
    }

    // Tries to delete a user by id, and returns the number of records deleted;
    remove(user_id) {
        var removed = this.db.task(t => {
            return t.result('DELETE FROM users WHERE user_id = $1', +user_id, r => r.rowCount)
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in users remove(${user_id})`);
            Logger.error(e);
        });
        return removed;
    }

    // Tries to find a user from their discord user id;
    findUserById(user_id) {
        var foundUserById = this.db.task(t => {
            return t.oneOrNone('SELECT * FROM users WHERE user_id = $1', user_id)
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in users findUserById(${user_id})`);
            Logger.error(e);
        });
        return foundUserById;
    }

    // Returns all user records;
    all() {
        var allRecords = this.db.task(t => {
            return t.any('SELECT * FROM users')
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in users all()`);
            Logger.error(e);
        });
        return allRecords;
    }

    // Returns the total number of users;
    total() {
        var totalCount = this.db.task(t => {
            return t.one('SELECT count(*) FROM users', [], a => +a.count)
                .then(retval => {
                    return retval;
            });
        }).then(r => {
            // success
            return r;
        }).catch(e => {
            Logger.info(`An error occurred in users total()`);
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
        const table = new pgp.helpers.TableName({table: 'users', schema: 'public'});

        cs.insert = new pgp.helpers.ColumnSet(['user_id'], {table});
        cs.update = cs.insert.extend(['?id']);
    }
    return cs;
}

module.exports = UsersRepository;
