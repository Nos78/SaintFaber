/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:42:00 
 * @Last Modified by:   Noscere 
 * @Last Modified time: 2022-10-09 18:42:00 
 */

SELECT
    ugs.settings
FROM
    user_global_settings ugs
    JOIN users u ON ugs.u_id = u.id
WHERE
    u.user_id = $1