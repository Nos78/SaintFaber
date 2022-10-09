/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:32:27 
 * @Last Modified by:   Noscere 
 * @Last Modified time: 2022-10-09 18:32:27 
 */

DELETE FROM
    user_guild_settings ugs
USING
    guilds AS g,
    users AS u
WHERE
    ugs.g_id = g.id
    AND ugs.u_id = u.id
    AND g.guild_id = ${guildDiscordId}
    AND u.user_id = ${userDiscordId}
