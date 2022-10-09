/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:44:03 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-09 18:54:29
 *
 * Creates table Guilds.
 * NOTE: We only add schema here to demonstrate the ability of class QueryFile
 * to pre-format SQL with static formatting parameters when needs to be.
 */
CREATE TABLE ${schema~}.guilds
(
    id serial PRIMARY KEY,
    guild_id varchar UNIQUE
);
