/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:52:00 
 * @Last Modified by:   Noscere 
 * @Last Modified time: 2022-10-09 18:52:00 
 *
 * see if the users table exist.
 */
SELECT EXISTS (
  SELECT table_name FROM information_schema.tables
  WHERE table_name = 'ao_players'
);
