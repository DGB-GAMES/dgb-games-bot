const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    if (!message.member.roles.find("name", "BotPerms"))

        return message.reply(":no_entry_sign: Je hebt geen toegang tot dit commando! :no_entry_sign:");

    var messageArray = 1;
    var item = "";
    var time;
    var winnerCount;

    // /g.create 1(WinnerCount) 60(60 seconds) Item for Giveaway //

    for (var i = 3; i < messageArray.length; i++){
        item += (messageArray[i] + " ");
    }
    winnerCount = Number(messageArray[1]);
    time = Number(messageArray[2]);
    var embed = new discord.RichEmbed();
    embed.setDescription(item);
    var embedSent = await message.channel.send(embed);
    embedSent.react("🎉");
    setTimeout(function(){
        var peopleReacted = reactions.get("🎉").users;
        var index = Math.floor(Math.random() * peopleReacted.length);
        var winners = [];
        var winnerMessage = "";
        for (var i = 0; i < winnerCount; i++){
            winnerCount.push(peopleReacted[index]);
        }
        for (var i = 0; i < winners.length; i++){
            winnerMessage += (winners[1].toString() + " ");
        }
        var haveHas = "has";
        if (winnerCount.length == 1){
            haveHas = "has"
        }
        else {
            haveHas = "have";
        }

        message.channel.send(winnerMessage + " " + haveHas + `${item}`);

    }, time * 1000);
}

module.exports.help = {
    name: "g.create"
}