//https://discord.com/oauth2/authorize?client_id=820440348227534878&scope=bot
require("dotenv").config();

const Discord = require('discord.js');

const counterControllerPath = require('./controllers/CounterController');
const counterController = new counterControllerPath();
const Events = require('./enums/EventsEnum');
const Commands = require('./enums/CommandsEnum');


const client = new Discord.Client();

let lastCommand = "";
let lastArgument = "";
let counterOwner = "";

client.on(Events.READY, () => {
    console.log(`${client.user.username} is running...`);
});

client.on(Events.MESSAGE, (message) => {
    
    if(message.author.username !== "DiscordJS Bot") {
        if(message.content[0] === "?") {
            const fullCommand = message.content.split(" ");
            console.log(fullCommand);
            lastCommand = fullCommand[0];
            lastArgument = fullCommand[1];
            switch(lastCommand) {
                case Commands.START_COUNTER : {
                    if(!lastArgument) {
                        message.channel.send("In order to count I need a limit, please type the command like: ?startcounter 666");    
                    } else {
                        if(counterController.getIsCounting()) {
                            message.channel.send("Another counter in progress, please wait :laughing:");
                        } else {
                            message.channel.send("Counter started: 0");
                            counterOwner = message.author.id;
                        }
                    }
                } 
                    break;
                default: message.channel.send("`Not a valid command! :( `");
            }
        }
    } else {
        if(message.content.includes("Counter started:")) {
            setTimeout(() => {
                counterController.setUpdateMessageId(message.id);
                console.log(parseInt(lastArgument));
                counterController.startCounter(lastArgument);
                counterController.progressCounter();
                message.edit(`Counter started: ${counterController.getCounter()}`);
            }, 1000);
        }
    }
});

client.on(Events.MESSAGE_UPDATE, (message) => {
    if(counterController.getIsCounting() 
        && message.id === counterController.getUpdateMessageId()) {
            setTimeout(() => {
                counterController.progressCounter();
                message.edit(`Counter started: ${counterController.getCounter()}`);
            }, 1000);
    }

    if(!counterController.getIsCounting() 
        && message.id === counterController.getUpdateMessageId()) {
            message.channel.send(`<@${counterOwner}> your counter has finished!!! :yum:`);
    }
});

client.login(process.env.DISCORDJS_BOT_TOKEN);