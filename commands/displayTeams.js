//https://i.imgur.com/kn2ynaQ.png
const Discord = require('discord.js');
module.exports = {
    name: 'teamDisplay',
    description: 'Team command',
    execute(message, args) {
        let embed = new Discord.MessageEmbed()
        .setTitle("Teams")
        .setColor("BLUE")
        .setImage(`https://i.imgur.com/kn2ynaQ.png`);
    message.channel.send(embed);
    }
}