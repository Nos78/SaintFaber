/**
 * @Author: BanderDragon
 * @Date:   2019-05-06T08:09:56+01:00
 * @Email:  noscere1978@gmail.com
 * @Project: SaintFaber
 * @Filename: create.sql
 * @Last modified by:   BanderDragon
 * @Last modified time: 2019-05-06T20:53:37+01:00
 *
 * Creates table ao_players.
 * NOTE: We only add schema here to demonstrate the ability of class QueryFile
 * to pre-format SQL with static formatting parameters when needs to be.
 *
 * API URL:
 *
 * API JSON Output example:
 * {"guilds":[],
 *  "players":[
    {"Id":"8wa5KI8sS3-PTDbHNF65VQ",
     "Name":"Noscere",
     "GuildId":"M9UHNimbSvqVbifbx_VFcA",
     "GuildName":"Wallet Warlords",
     "AllianceId":"",
     "AllianceName":null,
     "Avatar":"",
     "AvatarRing":"",
     "KillFame":0,
     "DeathFame":0,
     "FameRatio":0.0,
     "totalKills":null,
     "gvgKills":null,
     "gvgWon":null}]}
 *
 * Since we can pull this info from the API, we really only need to store the key and/or the name!
 * Players know their name when searching to add themselves, and you cannot change your name, so
 * these can be safely stored knowing both will never change. Guilds, etc, may change. But not name/id
 *
 * We might want to store the related user &/or related discord guilds? keys.
 *
 * Since this is a discord bot, although players may not have a guild in-game, they do need to be associated with
 * a discord server (also a guild, confusing...) but we can ignore this, as long as we do associate with their
 * discord user id at the least - after all, they may belong to many discord guilds! So we don't want to referential
 * delete players just because a (discord) guild has been deleted
*/

/* CREATE TABLE ao_players
 * id
 * player_id // api.players.Id
 * name // api.players.Name
 * user_id // users(id)
 */
CREATE TABLE ${schema~}.ao_players
(
    id serial PRIMARY KEY,
    player_id varchar UNIQUE,
    name varchar,
    user_id integer references users(id) ON DELETE CASCADE,
    guild_id integer references ao_guilds(id) ON DELETE SET NULL
);
