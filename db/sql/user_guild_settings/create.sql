/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:32:09 
 * @Last Modified by:   Noscere 
 * @Last Modified time: 2022-10-09 18:32:09 
 */

CREATE TABLE ${schema~}.user_guild_settings
(
    u_id integer references users(id) ON DELETE CASCADE,
    g_id integer references guilds(id) ON DELETE CASCADE,
    settings jsonb,
    UNIQUE (u_id, g_id),
    PRIMARY KEY(u_id, g_id)
);
