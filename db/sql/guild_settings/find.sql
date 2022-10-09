/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:40:42 
 * @Last Modified by:   Noscere 
 * @Last Modified time: 2022-10-09 18:40:42 
 */

SELECT
    gs.settings
FROM
    guild_settings gs
    JOIN guilds g ON gs.g_id = g.id
WHERE
    g.guild_id = $1