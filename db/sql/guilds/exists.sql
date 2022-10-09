/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:44:49 
 * @Last Modified by:   Noscere 
 * @Last Modified time: 2022-10-09 18:44:49 
 *
 * see if the guilds table exist.
 */
SELECT EXISTS (
  SELECT table_name FROM information_schema.tables
  WHERE table_name = 'guilds'
);
