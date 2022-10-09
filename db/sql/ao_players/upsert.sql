/*
 * @Author: Noscere 
 * @Date: 2022-10-09 16:48:10 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-09 17:55:27

   UPSERT
   ======
   This complex set of SQL instructions:
    + inserts or selects our user from the user table,
    + selects our discord guild from the guilds table
      (we assume this will exist, so no insert - this record MUST exist for a server to have joined the bot)
    + inserts or updates our ao guild from the ao_guilds table, with the int id of the discord guild above
    + finally, inserts or updates our ao player using all the ids from above and the given data to insert or update

    Parameters needed:
        ${userId}
        ${discordGuildId}
        ${AOGuildId},
        ${AOGuildName},
        ${playerId},
        ${playerName}
 */

WITH insUser AS (
	INSERT INTO users (user_id)
	VALUES (${userId})
	ON CONFLICT DO NOTHING
    RETURNING id
), selUser AS (
	SELECT insUser.id FROM insUser
		UNION ALL
	SELECT id FROM users WHERE user_id = ${userId}
), discordGuild AS (
    SELECT id FROM guilds WHERE guild_id = ${discordGuildId}
), upsertAOGuild AS (
    INSERT INTO ao_guilds (guild_id, discord_guild_id, name)
    VALUES (${AOGuildId}, discordGuild.id, ${AOGuildName})
    ON CONFLICT (guild_id) DO UPDATE SET
        name = ${AOGuildName},
        discord_guild_id = discordGuild.id,
    RETURNING id
), discordUserAndAOGuild(u, aog) AS (
	VALUES(
        (SELECT selUser.id FROM selUser),
        (SELECT upsertAOGuild.id FROM upsertAOGuild)
    )
)

INSERT INTO
  ao_players (
		player_id, name, user_id, guild_id
	)
SELECT
  discordUserAndAOGuild.u, discordUserAndAOGuild.aog,
  ${playerId}, ${playerName}
FROM
    discordUserAndAOGuild
ON CONFLICT (player_id) DO UPDATE SET
  name = ${playerName},
  player_id = ${playerId},
  guild_id = discordUserAndAOGuild.aog,
  user_id = discordUserAndAOGuild.u,
RETURNING *
