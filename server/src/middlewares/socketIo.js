module.exports = (io) => {
    let participants = {};

    io.on('connection', (socket) => {
        console.log(`Kullanıcı bağlandı: ${socket.id}`);

        socket.on('join-event', ({ eventId, username }) => {
            socket.join(eventId);
            if (!participants[eventId]) participants[eventId] = [];
            participants[eventId].push(username);

            // Odaya katılan herkese bildir
            io.to(eventId).emit('update-participants', participants[eventId]);
        });

        socket.on('disconnect', () => {
            console.log(`Kullanıcı ayrıldı: ${socket.id}`);
            // Katılımcı listesini güncellemek için ekstra yönetim yapılabilir
        });
    });
}