/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:33:33 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-09 18:33:55
 *
 * See if the user_guild_settings table exist.
 */
 
SELECT EXISTS (
  SELECT table_name FROM information_schema.tables
  WHERE table_name = 'user_guild_settings'
);
