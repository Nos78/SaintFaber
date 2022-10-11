/*
 * @Author: BanderDragon 
 * @Date: 2019-03-14 22:12:49
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-11 03:07:41
 * 
 * Calculates the ping, or round trip latency, between
 * sending and returning a message.
 * 
 * Two pings - the first being the send/return latency, the
 * second being the average latency between bot and
 * websocket (one way).
 */

module.exports = {
	name: 'ping',
	description: 'Calculates the ping between sending a message and editing it, calculating round-trip latency! The second ping is the average latency between the bot and the web-socket (one way).',
	cooldown: 5,
	version: '1.0.1',
	category: 'utility',
	args: false,

	/*eslint no-unused-vars: ["error", { "args": "none" }]*/
	async execute(message, args) {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send(`Ping?`);
    m.edit(`Pong! ${message.author} Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(message.client.ws.ping)}ms`);
	},
};
