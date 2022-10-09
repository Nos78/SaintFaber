/*
 * @Author: Noscere 
 * @Date: 2022-10-09 18:42:11 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-09 18:42:37
 *
 * Quickly deletes all records from table user_global_settings
*/
TRUNCATE TABLE ${schema~}.user_global_settings CASCADE
