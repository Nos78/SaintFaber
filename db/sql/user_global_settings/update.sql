/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:41:39 
 * @Last Modified by:   Noscere 
 * @Last Modified time: 2022-10-09 18:41:39 
 */

WITH selectUserId AS (
    SELECT
        id
    FROM
        users
    WHERE
        user_id = ${userDiscordId}
)

UPDATE
    user_global_settings
SET
    settings = ${settings}
FROM (
    SELECT
        id
    FROM
        selectUserId
    ) AS sui
WHERE 
    u_id = sui.id
RETURNING *
