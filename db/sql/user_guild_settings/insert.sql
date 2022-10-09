/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:34:22 
 * @Last Modified by:   Noscere 
 * @Last Modified time: 2022-10-09 18:34:22 
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

INSERT INTO
    user_guild_settings(u_id, g_id, settings)
    SELECT
        userIdAndGuild.u,
        userIdAndGuild.g,
        ${settings}
    FROM
        userIdAndGuild
ON CONFLICT DO NOTHING
RETURNING *