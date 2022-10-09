/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:32:38 
 * @Last Modified by:   Noscere 
 * @Last Modified time: 2022-10-09 18:32:38 
 */

DELETE FROM
    user_guild_settings ugs
USING
    guilds AS g
WHERE
    ugs.g_id = g.id
    AND g.guild_id = $1
