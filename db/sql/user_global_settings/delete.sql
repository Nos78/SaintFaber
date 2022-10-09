/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:42:28 
 * @Last Modified by:   Noscere 
 * @Last Modified time: 2022-10-09 18:42:28 
 */

DELETE FROM
    user_global_settings ugs
USING
    guilds AS g
WHERE
    ugs.g_id = g.id
    AND g.guild_id = $1
