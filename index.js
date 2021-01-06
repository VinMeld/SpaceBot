const Discord = require('discord.js');
const client = new Discord.Client();
const token = require('./token.js').token
const fs = require("fs");
const prefix = "&";
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}
client.on("ready", async () => {
    client.user.setActivity("To INFINITY and BEYOND!!");
    let channel = client.channels.cache.get('726258797462552578');
    client.commands.get('displayNasaDaily').execute(channel);
});
client.on("message", async message => {
    if (message.content.startsWith(prefix)) {
        const args = message.content.substring(prefix.length).split(" ");
        const command  = args[0].toLowerCase();
        if(command === "ping"){
            client.commands.get('ping').execute(message, args);
        }
        if(command == "displayimage" && args[1] != null){ 
            let channel = client.channels.cache.get(args[1]);
            client.commands.get('displayNASA').execute(message, args, channel);
        }
    }
});
client.login(token);
// &ping
// pong!
