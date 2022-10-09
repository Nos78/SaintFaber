/**
 * @Author: BanderDragon
 * @Date:   2019-05-06T08:09:56+01:00
 * @Email:  noscere1978@gmail.com
 * @Project: SaintFaber
 * @Filename: create.sql
 * @Last modified by:   BanderDragon
 * @Last modified time: 2019-05-06T20:52:57+01:00
 *
 * Creates table Guilds.
 * NOTE: We only add schema here to demonstrate the ability of class QueryFile
 * to pre-format SQL with static formatting parameters when needs to be.
 *
 * API URL:
 *
 * API JSON Output example:
 * {"guilds":[
    {"Id":"M9UHNimbSvqVbifbx_VFcA",
     "Name":"Wallet Warlords",
     "AllianceId":"",
     "AllianceName":"",
     "KillFame":null,
     "DeathFame":84573628}
    ],
    "players":[]}
 *
 * Since we can pull this info from the API, we really only need to store the key and/or the name!
 * Guilds know their name when searching to add themselves, and you cannot change your name, so
 * these can be safely stored knowing both will never change. Alliances, etc, may change. But not name/id
 *Guilds
 * We might want to store the related discord guild &/or related alliance discord? keys.
 *
 * Since this is a discord bot, although guilds may not have a discord server, they do if they are adding to this bot
 * since the interface is on discord!
 * a discord server (also a guild, confusing...) can be deleted, and since ao_guild info can be pulled from the API,
 * and we need some sort of referential integrity, then cascade delete this record. No discord? No ao_guild.
*/

/* CREATE TABLE ao_guilds
 * id
 * guild_id // api.guilds.Id
 * name // api.guilds.Name
 * discord_guild_id // guilds(id)
 */

CREATE TABLE ${schema~}.ao_guilds
(
    id serial PRIMARY KEY,
    guild_id varchar UNIQUE,
    name varchar,
    discord_guild_id integer references guilds(id) ON DELETE SET NULL,
    alliance_id integer references ao_alliances(id) ON DELETE SET NULL,
);
