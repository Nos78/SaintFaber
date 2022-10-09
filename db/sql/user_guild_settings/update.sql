/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:34:32 
 * @Last Modified by:   Noscere 
 * @Last Modified time: 2022-10-09 18:34:32 
 */

WITH selectGuildId AS (
	SELECT
        id
    FROM
        guilds g
    WHERE
        g.guild_id = ${guildDiscordId}
), userIdAndGuild (u, g) AS (
	VALUES((SELECT id FROM users WHERE user_id = ${userDiscordId}),
        (SELECT selectGuildId.id FROM selectGuildId)
	)
)

UPDATE
    user_guild_settings
SET
    settings = ${settings}
FROM (
    SELECT
        u, g
    FROM
        userIdAndGuild
    ) AS uag
WHERE 
    g_id = uag.g
    AND u_id = uag.u
RETURNING *
