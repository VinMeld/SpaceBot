const Discord = require('discord.js');
const fetch = require('node-fetch');
const fs = require("fs")
const {
    convertFile
} = require('convert-svg-to-png');
module.exports = {
    name: 'displayTourney',
    description: 'Shows image from tournament',
    async execute(message, args) {
        console.log("here")
        const response = await fetch(`https://Vinaycat:8HnjZ5EeX7Phmyv1uUpgmOUavKh8IYsTtCdpe1Wb@api.challonge.com/v1/tournaments/njzw8ris.json`);
        if (response) {
            try {
                const json = await response.json();
                const UUID = Math.floor((Math.random() * 100000) + 1);
                let response2 = await fetch(json.tournament.live_image_url);
                let textOfResponse = await response2.text();
                fs.writeFileSync(`temp-${UUID}.svg`, textOfResponse)
                const inputFilePath = `temp-${UUID}.svg`;
                const outputFilePath = await convertFile(inputFilePath);
                const attachment = new Discord.MessageAttachment(`temp-${UUID}.png`)
                let embed = new Discord.MessageEmbed()
                    .setTitle("Tournamet")
                    .setColor("BLUE")
                    .attachFiles(attachment)
                    .setImage(`attachment://temp-${UUID}.png`);
                await message.channel.send(embed);
                const path = `./temp-${UUID}.svg`
                try {
                    fs.unlinkSync(path)
                } catch (err) {
                    console.error(err)
                }
                let path1 = `./temp-${UUID}.png`
                try {
                    fs.unlinkSync(path1)
                } catch (err) {
                    console.error(err)
                }
            } catch (e) {}
        }
    }
}