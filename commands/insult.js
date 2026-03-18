const insults = [
    "meuno gua nek ndy nite book!",
    "boye damaye dmrm!",
    "katale sa khone dmrm.",
    "gniapale sa khone imbecile que tu est.",
    "merd waye ahhh tu me enerve.",
    "sou niaré digua ndy khame dmrm.",
    "boy doucement rk guaye woné wou ni.",
    "khana deume gua?'",
    "yoe bagne ma ndy moytou rk dmrm bi.",
    "imbecil bigua ndy done.",
    "boul takhe ma ndy sagua sa yaye deh.",
    "koula ndy nokou gua beugue.",
    "khana woubi gua.",
    "na gooré wala mou djiguéné book.",
    "boy respect ma waye dmrm bigua done.",
    "damaye deugue sa khone deh dmrm."
];

async function insultCommand(sock, chatId, message) {
    try {
        if (!message || !chatId) {
            console.log('Invalid message or chatId:', { message, chatId });
            return;
        }

        let userToInsult;
        
        // Check for mentioned users
        if (message.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
            userToInsult = message.message.extendedTextMessage.contextInfo.mentionedJid[0];
        }
        // Check for replied message
        else if (message.message?.extendedTextMessage?.contextInfo?.participant) {
            userToInsult = message.message.extendedTextMessage.contextInfo.participant;
        }
        
        if (!userToInsult) {
            await sock.sendMessage(chatId, { 
                text: 'Please mention someone or reply to their message to insult them!'
            });
            return;
        }

        const insult = insults[Math.floor(Math.random() * insults.length)];

        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));

        await sock.sendMessage(chatId, { 
            text: `Hey @${userToInsult.split('@')[0]}, ${insult}`,
            mentions: [userToInsult]
        });
    } catch (error) {
        console.error('Error in insult command:', error);
        if (error.data === 429) {
            await new Promise(resolve => setTimeout(resolve, 2000));
            try {
                await sock.sendMessage(chatId, { 
                    text: 'Please try again in a few seconds.'
                });
            } catch (retryError) {
                console.error('Error sending retry message:', retryError);
            }
        } else {
            try {
                await sock.sendMessage(chatId, { 
                    text: 'An error occurred while sending the insult.'
                });
            } catch (sendError) {
                console.error('Error sending error message:', sendError);
            }
        }
    }
}

module.exports = { insultCommand };
