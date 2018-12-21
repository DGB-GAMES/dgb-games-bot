const discord = require("discord.js");
const botConfig = require("./botconfig.json");

const fs = require("fs");

const bot = new discord.Client();
bot.commands = new discord.Collection();

fs.readdir("./commands/", (err, files) => {

    if (err) console.log(err);

    var jsFiles = files.filter(f => f.split(".").pop() === "js");

    if (jsFiles.length <= 0) {
        console.log("Kan geen files vinden.");
        return;
    }

    jsFiles.forEach((f, i) => {

        var fileGet = require(`./commands/${f}`);
        console.log(`De file ${f} is geladen`)

        bot.commands.set(fileGet.help.name, fileGet);

    })

});

// var swearWords = ["kkr", "kanker", "fuck"];

bot.on("ready", async () => {

    console.log(`${bot.user.username} is online!`)

    bot.user.setActivity("DGB-GAMES", { type: "WATCHING" });

});

/// Welkoms Bericht ///
bot.on("guildMemberAdd", member => {

    var role = member.guild.roles.find("name", "Member");

    if (!role) return;

    var regels = member.guild.channels.find("name", "regels");

    if (!regels) return;

    member.addRole(role);

    const channel = member.guild.channels.find("name", "welkom-totziens");

    if (!channel) return;

    channel.send(`${member} Welkom op de DGB-GAMES Discord server! Lees ${regels} even door voor de regels die gelden op deze server. Veel Plezier! `);

});

/// Leave Bericht ///
bot.on("guildMemberRemove", member => {

    var role = member.guild.roles.find("name", "Member");

    if (!role) return;

    member.removeRole(role);

    const channel = member.guild.channels.find("name", "welkom-totziens");

    if (!channel) return;

    channel.send(`${member} Jammer dat je weggaat!`);

});

/// Test commando ///
bot.on("message", async message => {

    if (message.author.bot) return;

    if (message.channel.type === "dm") return;

    var prefixes = JSON.parse(fs.readFileSync("./data/prefixes.json"));

    if (!prefixes[message.guild.id]){
        prefixes[message.guild.id] = {
        prefixes: botConfig.prefix
        };
    }

    var prefix = prefixes[message.guild.id].prefixes;

    if (!message.content.startsWith(prefix)) return;
    

    // var prefix = botConfig.prefix;

    var messageArray = message.content.split(" ");

    var command = messageArray[0];

    var args = messageArray.slice(1);


    var commands = bot.commands.get(command.slice(prefix.length));

    if (commands) commands.run(bot, message, args);


    // var msg = message.content.toLocaleLowerCase();

    // for(var i = 0; i < swearWords.length; i++) {

    //     if(msg.includes(swearWords[i])) {

    //         message.delete();

    //         return message.reply("Let op je taalgebruik!").then(msg => message.delete(3000));

    //     }

    // }

    var swearWords = JSON.parse(fs.readFileSync("./data/swearWords.json"));

    var msg = message.content.toLocaleLowerCase();

    for (var i = 0; i < swearWords["vloekwoorden"].length; i++) {

        if (msg.includes(swearWords["vloekwoorden"][i])) {

            message.delete();

            return message.reply("Let op je taalgebruik!").then(msg => msg.delete(6000));

        }

    };



// /// Hi antwoord ///

// var hallo = JSON.parse(fs.readFileSync("./data/fun.json"));

// var msg = message.content.toLocaleLowerCase();

// for (var i = 0; i < hallo["woorden"].length;) {

//       return message.channel.send("Waarom alleen dat woord?");

//     };




});


bot.login(process.env.BOT_TOKEN);
