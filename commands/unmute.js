async function unmuteCommand(sock, chatId) {
    await sock.groupSettingUpdate(chatId, 'not_announcement'); // Unmute the group
    await sock.sendMessage(chatId, { text: 'le group es ouvert venez bavardé.' });
}

module.exports = unmuteCommand;
