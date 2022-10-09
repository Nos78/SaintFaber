/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:40:12 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-09 18:41:02
 */

DELETE FROM
    guild_settings gs
USING
    guilds AS g
WHERE
    gs.g_id = g.id
    AND g.guild_id = $1
