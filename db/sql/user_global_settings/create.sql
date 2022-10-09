/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:41:50 
 * @Last Modified by:   Noscere 
 * @Last Modified time: 2022-10-09 18:41:50 
 */

CREATE TABLE ${schema~}.user_global_settings
(
    u_id integer references users(id) ON DELETE CASCADE,
    settings jsonb,
    UNIQUE (u_id),
    PRIMARY KEY(u_id)
);
