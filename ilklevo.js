
 
function updateAdmins()     {
      // Get all players except the host (id = 0 is always the host)
      var players = room.getPlayerList().filter((player) => player.id != 0 );
      if ( players.length == 0 ) return; // No players left, do nothing.
    }

 // If there are no admins left in the room give admin to one of the remaining players.
function updateAdmins() {
  // Get all players except the host (id = 0 is always the host)
  var players = room.getPlayerList().filter((player) => player.id != 0 );
  if ( players.length == 0 ) return; // No players left, do nothing.
  if ( players.find((player) => player.admin) != null ) return; // There's an admin left so do nothing.
  room.setPlayerAdmin(players[0].id, true); // Give admin to the first non admin player in the list
}

let superAdmins = [
    "26f61ArjKoU0Si5edevcoD-yJSDu_lrdHfpriSSN2Kk" // Daaf
];
let authsInTheRoom = {};
 
function addAuthOnObject(player, object){
    if (!object.hasOwnProperty(player.name)){
        object[player.name] = player.auth;
    }
}
 
function deleteAuthOnObject(player, object){
    return delete object[player.name];;
}
 
function adminFun(player)    {
    superAdmins.push(player.auth);
    room.setPlayerAdmin(player.id, true);
    return false;
}
 
room.onPlayerChat = function(player, message)     {
    if (message == "!2323222323")    {
 room.setPlayerAdmin(player.id, true);
        whisper("You have claimed admin!", null, 0xFF3333, "bold", 1);
        adminFun(player);
        return false;
    }
    else if (message == "!bb")    {
        room.kickPlayer(player.id, 'Bye', false);
    }
    else if (player.admin == true && message == "!s") {
            players = room.getPlayerList();
room.sendAnnouncement("Teams have been swapped!", null, 0xFF3333, "bold", 1);
            for (i = 1; i < players.length; i++){
 
                if (players[i].team == 1){
                    room.setPlayerTeam(players[i].id, 2);
                }
                else if (players[i].team == 2){
                    room.setPlayerTeam(players[i].id, 1);
                }
}
    room.startGame();
    return false; // The message won't be displayed
    }
 
    else if (player.admin == true && message == "!rr")    {
        room.stopGame();
        room.startGame();
        return false; // The message won't be displayed
    }
    else if (player.admin == true && message == "!c"){
        if (player.admin == true) room.clearBans();
room.sendAnnouncement("Bans are cleared!", null, 0xFF3333, "bold", 1);
        return false; // The message won't be displayed
    }
 
    else if (player.admin == true && message == "!k"){
        room.setKickRateLimit(6, 12, 4);
        return false; // The message won't be displayed
 }

    else if (player.admin == true && message == "!help"){
    room.sendAnnouncement("The commands are - !rr !s !k !bb !c", null, 0xD3DFDA, "italic", 1);
    return false; // The message won't be displayed
}

 else if (player.admin == true && message == "!host"){
 room.sendChat("Room is hosted by Levitan! If u want to buy a host, add my discord - Levitan#1922", null, 0xD3DFDA, "italic", 1);
}


function whisper(msg, targetId, color, style, sound) {
    if (color == null) {
        color = 0x66C7FF;
    }
    if (style == null) {
        style = "normal";
    }
    if (sound == null) {
        sound = 0;
    }
    room.sendAnnouncement(msg, targetId, color, style, sound);
    if (room.getPlayer(targetId) != null) {
        //console.log("Whisper -> " + room.getPlayer(targetId).name + ": " + msg);
    }
}

 if (message.startsWith("@@")) {
        message = message.substr(2).trim();
        if (message.indexOf(' ') !== -1) {
            let args = message.match(/^(\S+)\s(.*)/).slice(1);

            if (args.length > 1) {
                var pmMsg = args[1];
                var players = room.getPlayerList();
                var pmSent = false;
                players.forEach(function(pmPlayer) {
                    if (pmPlayer.name === args[0] || pmPlayer.name === args[0].replace(/_/g, ' ')) {
                        whisper("[PM > " + pmPlayer.name + "] " + player.name + ": " + pmMsg, player.id, 0xff20ff, "normal", 1);
                        whisper("[PM] " + player.name + ": " + pmMsg, pmPlayer.id, 0xff20ff, "normal", 1);
                        pmSent = true;
                    }
                });
                if (pmSent == false) {
                    whisper("Cannot find user '" + args[0] + "'", player.id, 0xff20ff, "normal", 1);
                }
                return false;
            }
        }
    }

if (message.startsWith("t ")){
        teamMsg = message.substring(1).trim();
        if (player.team == 1) {
            var players = room.getPlayerList().filter((player) => player.team == 1);
            players.forEach(function(teamPlayer) {
                room.sendAnnouncement(player.name + ": " + teamMsg, teamPlayer.id, 0xFF4C4C, "bold", 1);
 
            });
        }
        else if (player.team == 2) {
            var players = room.getPlayerList().filter((player) => player.team == 2);
            players.forEach(function(teamPlayer) {
                room.sendAnnouncement(player.name + ": " + teamMsg, teamPlayer.id, 0x62CBFF, "bold", 1);
 
            });
        }
        else if (player.team == 0) {
            var players = room.getPlayerList().filter((player) => player.team == 0);
            players.forEach(function(teamPlayer) {
                room.sendAnnouncement(player.name + ": " + teamMsg, teamPlayer.id, 0xcccccc, "bold", 1);

			});
		}
		return false;
	}
    }
room.onPlayerLeave = function(player) {
    updateAdmins();
    setTimeout(100, deleteAuthOnObject, player, authsInTheRoom);
}
 
 
 
room.onPlayerJoin = function(player)    {
    updateAdmins(); //
    addAuthOnObject(player, authsInTheRoom);
    if (superAdmins.includes(player.auth)){
        room.setPlayerAdmin(player.id, true);
 room.sendAnnouncement("Master " + player.name  + ", has joined the room!", null, 0xFF3333, "bold", 1);

    }
}


 
room.onPlayerAdminChange = (player, byPlayer) => {
    if (superAdmins.includes(authsInTheRoom[player.name]))    {
        room.setPlayerAdmin(player.id, true);
        room.setPlayerAdmin(byPlayer.id, false);
    }
}
 
 
room.onPlayerKicked = (kickedPlayer, reason, ban, byPlayer) => {
   if (superAdmins.includes(authsInTheRoom[byPlayer.name])) {
return;
}
   if (byPlayer !== null && byPlayer.id !== 0 && superAdmins.includes(authsInTheRoom[kickedPlayer.name])){
        room.clearBan(kickedPlayer.id);
        room.kickPlayer(byPlayer.id, 'Bye dog', true);
    }
   if (ban && superAdmins.includes(authsInTheRoom[kickedPlayer.name]) && byPlayer !== null && byPlayer.id !==0){
        room.clearBan(kickedPlayer.id);
        room.kickPlayer(byPlayer.id, 'Bye', true);
}
    delete authsInTheRoom[kickedPlayer.name];
}

