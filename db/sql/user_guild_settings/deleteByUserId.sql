/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:32:56 
 * @Last Modified by:   Noscere 
 * @Last Modified time: 2022-10-09 18:32:56 
 */

DELETE FROM
    user_guild_settings ugs
USING
    users AS u
WHERE
    ugs.u_id = u.id
    AND g.user_id = $1
