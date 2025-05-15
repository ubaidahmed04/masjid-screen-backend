let io;

module.exports = {
  init: (server) => {
    io = require("socket.io")(server, {
      cors: {
        origin: "*",
      },
    });

    io.on("connection", (socket) => {
      console.log("Client connected:", socket.id);

      socket.on('joinRoom', (UID) => {
        socket.join(UID);
        console.log(`Socket ${socket.id} joined room ${UID}`);
      });
    });

    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized");
    }
    return io;
  },
};
