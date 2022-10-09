/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:39:54 
 * @Last Modified by:   Noscere 
 * @Last Modified time: 2022-10-09 18:39:54 
 */

CREATE TABLE ${schema~}.guild_settings
(
    g_id integer references guilds(id) ON DELETE CASCADE,
    settings jsonb,
    UNIQUE (g_id),
    PRIMARY KEY(g_id)
);
