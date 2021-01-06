const Discord = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
    name: 'displayNASA',
    description: 'Displays an image taken by Nasa',
    async execute(message, args, channel) {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`);
        const json = await response.json();
        let embed = new Discord.MessageEmbed()
            .setColor("BLUE")
            .setTitle(json.title)
            .setImage(json.url)
            .setDescription(json.explanation)
            .setFooter(`Date: ${json.date} \n Copyright: ${json.copyright}`);
        channel.send(embed)
    }
}