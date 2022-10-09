/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:40:23 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-09 18:40:46
 *
 * See if the guild_settings table exist.
*/
SELECT EXISTS (
  SELECT table_name FROM information_schema.tables
  WHERE table_name = 'guild_settings'
);
