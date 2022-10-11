/*
 * @Author: BanderDragon 
 * @Date: 2020-08-29 02:51:12 
 * @Last Modified by: Noscere
 * @Last Modified time: 2022-10-11 02:42:03
 * 
 * Command returns information on the discord guilds that
 * the bot is connected to.
 * 
 */

const library = require('../library');
const config = require('../config.json');

module.exports = {
    name: 'guilds',
    description: `This command returns information the discord guilds (servers) that @BOTNAME is connected to.`,
    usage: `<guild name>`,
    args: false,
    guildOnly: false,
    category: 'utility',
    version: '0.0.2',

    /*eslint no-unused-vars: ["error", { "args": "none" }]*/
    async execute(message, args) {
        const msg = library.Helper.sendStandardWaitMessage(message.channel)

        var guilds = message.client.guilds.cache;
        if(!guilds) {
            guilds = message.client.guilds;
        }
        const count = guilds.size;

        let blocksOf24 = Math.floor(count / 24) + 1;

        if (guilds) {
            const keys = guilds.keys();
            const values = guilds.values();
            var j = Math.min(count, 24);
            for(var i=0;i < blocksOf24;i++) {
                for(let j=i; j < count; j++) {
                    var fields = [];
                    const id = keys.next();
                    const guild = values.next().value;
                    try {
                        var vanityEnabled = false;
                        guild.features.forEach(function(feature) {
                            if (feature.localeCompare('VANITY_URL')) {
                                vanityEnabled = true;
                            }
                        });
                        var vanityCode = "";
                        if (vanityEnabled) {
                            vanityCode = await guild.fetchVanityCode();
                        }
                        var invites = await guild.fetchInvites();;

                        fields.push({"name": `Number of Members:`, "value": `${guild.members.size}`});
                        invites.forEach(function(invite) {
                            fields.push({"name": `Invite link:`, "value": `https://discord.gg/${invite.code}`});
                        } );
                        fields.push({"name": `Invite link`, "value": `https://discord.gg/${vanityCode}`});
                        fields.push({"name": `Invite links`, "value": `${JSON.stringify(invites)}`});
                        library.Helper.sendFullRichMessage(`${id.value} - ${guild.name}`, `${guild.description}`, `${guild.owner.displayName} [${guild.owner.user.username}#${guild.owner.user.discriminator}]`, `${guild.iconURL()}`, fields, message.channel, message.client, config.messageSuccessColor);
                    } catch (e) {
                        console.error(e);
                    }
                }
                if(i == 0) {
                    library.Helper.editWaitRichMessage(msg,
                        `Displaying User Information, page ${i + 1} of ${blocksOf24}`,
                        `I have scoured the Discord network. Here is a list of guilds that I can provide information for:`,
                        fields,
                        config.messageSuccessColor);
                } else {
                    library.Helper.sendRichMessage(msg,`Displaying User Information, page ${i + 1} of ${blocksOf24}`, `I have scoured the Discord network. Here is a list of guilds that I can provide information for:`, fields, message.channel, message.client, config.messageSuccessColor);
                }
            }
        } else {
            library.Helper.sendErrorMessage(`I have scoured the Discord network.  Unfortuately I cannot find any information on any guild.  This indicates a rather large problem, since I should at least be able to provide information for ${message.guild.name}!`);
        }
    } // end execute
}
