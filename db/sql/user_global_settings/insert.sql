/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:43:09 
 * @Last Modified by:   Noscere 
 * @Last Modified time: 2022-10-09 18:43:09 
 */

WITH selectUserId AS (
    SELECT
        id
    FROM
        users
    WHERE
        user_id = ${userDiscordId}
)

INSERT INTO
    user_global_settings(u_id, settings)
SELECT
  selectUserId.id, ${settings}
FROM
    selectUserId
ON CONFLICT DO NOTHING