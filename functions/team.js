alphabet = ["A", "B", "C", "D", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

module.exports = {
  team: function (args, members, map = null) {
    var data = [];
    var guild = [];
    /**members.guild.channels.create('new-channel', { type: 'text', permissionOverwrites: permissionOverwriteArray, reason: 'New channel added for fun!' });**/
    members.forEach(el => {
      data.push(el.user.username);
    });
    
    var shuff = shuffle(data);
    var splyShuff = splitUp(shuff, args);

    embedTeams = [];
    
    if (map == null) {
      for (let i = 0; i < args; i++) {
        teamID = i+1
        embedTeams.push({ "name": 'Team ' + teamID, "value": splyShuff[i], "inline": true }); 
      }
    } else {
      for (let i = 0; i < map.teams.length; i++) {
        embedTeams.push({ "name": map.teams[i], "value": splyShuff[i], "inline": true });
      }
    }

    return embedTeams;
  }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;  
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    
    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

function splitUp(arr, n) {
  var rest = arr.length % n, // how much to divide
      restUsed = rest, // to keep track of the division over the elements
      partLength = Math.floor(arr.length / n),
      result = [];

  for(var i = 0; i < arr.length; i += partLength) {
      var end = partLength + i,
          add = false;

      if(rest !== 0 && restUsed) { // should add one element for the division
          end++;
          restUsed--; // we've used one division element now
          add = true;
      }

      result.push(arr.slice(i, end)); // part of the array

      if(add) {
          i++; // also increment i in the case we added an extra element for division
      }
  }

  return result;
}