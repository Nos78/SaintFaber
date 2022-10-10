/*
 * @Author: Noscere 
 * @Date: 2022-10-10 17:09:36 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-10 17:22:12
 *
 * Initalise database, run this script on first execution.
 * The bot *should* auto-configure its DB on first startup, but this script
 * will save any headaches. Since nodejs postgres pgp uses promises and async
 * queries, there may be referential problems if one table is created out of order
 * 
 * This script will create our database tables in the right order
 *
 * This is initial execution of version 0.0.1 of the bot. There should
 * be no tables in existance when this script runs. However, you might have
 * tried to run the bot and relied upon it to create its own tables. Therefore,
 * the drop table commands will remove any tables to ensure all tables are created
 * properly with the correct schemas.
 */
DROP TABLE IF EXISTS guilds
DROP TABLE IF EXISTS guild_settings
DROP TABLE IF EXISTS users
DROP TABLE IF EXISTS user_global_settings
DROP TABLE IF EXISTS user_guild_settings
DROP TABLE IF EXISTS ao_guilds
DROP TABLE IF EXISTS ao_players
DROP TABLE IF EXISTS ao_alliances

CREATE TABLE IF NOT EXISTS guilds
(
    id serial PRIMARY KEY,
    guild_id varchar UNIQUE
);

CREATE TABLE IF NOT EXISTS guild_settings
(
    g_id integer references guilds(id) ON DELETE CASCADE,
    settings jsonb,
    UNIQUE (g_id),
    PRIMARY KEY(g_id)
);

CREATE TABLE IF NOT EXISTS users
(
    id serial PRIMARY KEY,
    user_id varchar UNIQUE
);

CREATE TABLE IF NOT EXISTS user_global_settings
(
    u_id integer references users(id) ON DELETE CASCADE,
    settings jsonb,
    UNIQUE (u_id),
    PRIMARY KEY(u_id)
);

CREATE TABLE IF NOT EXISTS user_guild_settings
(
    u_id integer references users(id) ON DELETE CASCADE,
    g_id integer references guilds(id) ON DELETE CASCADE,
    settings jsonb,
    UNIQUE (u_id, g_id),
    PRIMARY KEY(u_id, g_id)
);

CREATE TABLE IF NOT EXISTS ao_guilds
(
    id serial PRIMARY KEY,
    guild_id varchar UNIQUE,
    name varchar,
    discord_guild_id integer references guilds(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS ao_players
(
    id serial PRIMARY KEY,
    player_id varchar UNIQUE,
    name varchar,
    user_id integer references users(id) ON DELETE CASCADE,
    guild_id integer references ao_guilds(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS ao_alliances
(
    id serial PRIMARY KEY,
    alliance_id varchar UNIQUE,
    name varchar,
    discord_guild_id integer references guilds(id) ON DELETE SET NULL
);

