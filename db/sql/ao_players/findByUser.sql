/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:29:01 
 * @Last Modified by:   Noscere 
 * @Last Modified time: 2022-10-09 18:29:01 
 */

SELECT
	users.user_id, users.id,
	ao_guilds.guild_id, ao_guilds.id, ao_guilds.name
	guilds.guild_id, guilds.id,
	ao_players.id, player_id, ao_players.name
FROM
	ao_players
JOIN users ON users.id = ao_players.user_id
JOIN ao_guilds ON ao_guilds.id = ao_players.guild_id
JOIN guilds ON guilds.id = ao_guilds.discord_guild_id
WHERE users.user_id = ${userId}
;
