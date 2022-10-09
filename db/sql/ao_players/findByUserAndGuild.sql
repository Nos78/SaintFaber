/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:23:49 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-09 18:53:03
 *
 * Finds a scores record using both the discord user id and discord guild id
 */

SELECT
	users.user_id,
	users.id,
	guilds.guild_id,
	guilds.id,
	ao_guilds.name,
	ao_guilds.id,
	ao_players.player_id,
	ao_players.name,
	ao_players.id
FROM
	ao_players
JOIN users ON users.id = ao_players.user_id
JOIN ao_guilds ON ao_guilds.id = ao_players.guild_id
JOIN guilds ON guilds.id = ao_guilds.discord_guild_id
WHERE guilds.guild_id = ${guildId} AND users.user_id = ${userId}
;
