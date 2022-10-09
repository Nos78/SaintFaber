/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:41:17 
 * @Last Modified by:   Noscere 
 * @Last Modified time: 2022-10-09 18:41:17 
 */

WITH selectGuildId AS (
	SELECT
        id
    FROM
        guilds g
    WHERE
        g.guild_id = ${guildDiscordId}
)

UPDATE
    guild_settings
SET
    settings = ${settings}
FROM (
    SELECT
        id
    FROM
        selectGuildId
    ) AS sgi
WHERE 
    g_id = sgi.id
RETURNING *
