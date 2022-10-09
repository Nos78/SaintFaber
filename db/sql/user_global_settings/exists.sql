/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:42:47 
 * @Last Modified by:   Noscere 
 * @Last Modified time: 2022-10-09 18:42:47 
 * see if the user_global_settings table exist.
 */
 
SELECT EXISTS (
  SELECT table_name FROM information_schema.tables
  WHERE table_name = 'user_global_settings'
);
