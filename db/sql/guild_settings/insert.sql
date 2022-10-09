/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:40:56 
 * @Last Modified by:   Noscere 
 * @Last Modified time: 2022-10-09 18:40:56 
 */

WITH selectGuildId AS (
    SELECT
        id
    FROM
        guilds
    WHERE
        guild_id = ${guildDiscordId}
)

INSERT INTO
    guild_settings(g_id, settings)
    SELECT
        selectGuildId.id,
        ${settings}
    FROM
        selectGuildId
ON CONFLICT DO NOTHING
RETURNING *
