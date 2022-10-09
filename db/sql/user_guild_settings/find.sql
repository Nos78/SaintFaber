/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:34:11 
 * @Last Modified by:   Noscere 
 * @Last Modified time: 2022-10-09 18:34:11 
 */

SELECT
    ugs.settings
FROM
    user_guild_settings ugs
    JOIN users u ON ugs.u_id = u.id
    JOIN guilds g ON ugs.g_id = g.id
WHERE
    u.user_id = ${userDiscordId}
    AND g.guild_id = ${guildDiscordId}