const Discord = require('discord.js');
var schedule = require('node-schedule');
const fetch = require('node-fetch');
function between(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    )
}
module.exports = {
    name: 'displayNasaDaily',
    description: 'Displaying APOD from NASA on a timer',
    async execute(channel) {
        var rule = new schedule.RecurrenceRule();
        rule.hour = parseInt(between(12, 20));
        rule.minute = parseInt(between(1, 59));
        var j = schedule.scheduleJob(rule, async function () {
            const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY`);
            const json = await response.json();
            let embed = new Discord.MessageEmbed()
                .setColor("BLUE")
                .setTitle(json.title)
                .setImage(json.url)
                .setDescription(json.explanation)
                .setFooter(`Date: ${json.date} \nCopyright: ${json.copyright}`);
            channel.send(embed)
        }) 
    }
}