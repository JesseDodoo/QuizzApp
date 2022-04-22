const rooms = [];

const handleJoin = (user, room, quizData) => {
  user = user.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (!user || !room) {
    return { error: "Username and room are required" };
  }
  let roomExists = rooms.find((r) => r.id === room);
  if (!roomExists) {
    rooms.push({ id: room, players: [user], quizData: quizData });
    roomExists = rooms.find((r) => r.id === room);
  } else {
    roomExists.players.push(user);
  }

  return roomExists;
};

module.exports = { handleJoin };
