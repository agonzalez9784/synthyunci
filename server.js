const { Client, Intents } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus, AudioPlayer} = require("@discordjs/voice");
const ytdl = require('ytdl-core');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });
var isReady = true;

const prefix = prfx;

client.once('ready', () => {
    console.log('Ready!'); 
});


//Vars for music bot
var connection = null;
var player = null;
var resource = null;

client.on('messageCreate', async message => {
        if(message.author.id != 955555821826232340)
        {
            if (message.content.toLowerCase() === prefix + 'help')
            {
                message.channel.send("These are the commands: \n" +
                                    prefix + "play <youtube link> - If you want to play youtube audio \n" +
                                    prefix + "stop - If you want to stop the audio \n" +
                                    prefix + "leave - If you want the bot to leave the voice channel \n" + 
                                    prefix + "setvolume <volume> - If you want the bot to be a certain volume! \n" +
                                    prefix + "merp - If you want merp.");
            }

            if(message.content.toLowerCase() === prefix + 'merp')
            {
                message.channel.send("Merp merp merp.");
            }
           
            //Set Volume Command WIP
            /*
            if(message.content.toLowerCase().indexOf(prefix + 'setvolume') != -1)
            {
                const vol = message.content.substring(message.content.indexOf(' ') + 1, message.content.length);
                resource.volume.setVolume(vol);
            }
            */ 

            if(message.content.toLowerCase().indexOf(prefix + 'play') != -1)
            {
                player = createAudioPlayer();
                connection = await joinVoiceChannel({
                    channelId: message.member.voice.channelId,
                    guildId: message.member.guild.id,
                    adapterCreator: message.member.guild.voiceAdapterCreator,
                });

                const link = message.content.substring(message.content.indexOf(' ') + 1, message.content.length);
                const stream = await ytdl(link, {filter: 'audioonly'});

                resource = createAudioResource(stream, {seek:0, volume:1});
                player.play(resource, {inline: true});
        
                player.on(AudioPlayerStatus.Playing, () => {
                    message.channel.send("Playing " + link)
                    console.log("The audio player has started playing!");
                });
                
                player.on(AudioPlayerStatus.Idle, () => {
                    console.log("The audio is idle");
                    player.stop();
                    connection.destroy();
                });

                connection.subscribe(player);
                
                
            }       

            if(message.content.toLowerCase().indexOf(prefix + 'stop') != -1)
            {
                player.pause();
                player.stop();
            }
            
            if(message.content.toLowerCase() === prefix + 'leave')
            {
                player.pause();
                player.stop();
                connection.destroy();
                connection = null;
            }
        }
});
client.login("OTU1NTU1ODIxODI2MjMyMzQw.YjjYtQ.FBDWEGswvtxfwTDoCXimWkgoLOY");
