/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:21:12 
 * @Last Modified by:   Noscere 
 * @Last Modified time: 2022-10-09 18:21:12 
 */

SELECT
	users.user_id, users.id,
	guilds.guild_id, guilds.id,
	ao_guilds.guild_id, ao_guilds.name, ao_guilds.id,
    ao_players.id, ao_players.player_id, ao_players.name
FROM
	ao_players
JOIN users ON users.id = scores.user_id
JOIN ao_guilds ON ao_guilds.id = ao_players.guild_id
JOIN guilds ON guilds.id = ao_guilds.discord_guild_id
WHERE guilds.guild_id = ${guildId}
ORDER BY ${orderBy:raw}
;
