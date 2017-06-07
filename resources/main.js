
$(document).ready(function(){
  var listOfAccounts = ["freecodecamp", "avoidingthepuddle", "bighead033", "brunofin", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

  // Used to get twitch information for each endpoint
  function getTwitchEndPoint(account){
    var twitchEndPoint = "https://wind-bow.gomix.me/twitch-api/streams/";
    $.ajax({
      url : twitchEndPoint + account,
      method : "GET",
      dataType : "jsonp",
      crossDomain : true,
      success: function(json){
        if (json.stream == null){
          var streaming = "Nothing";
          var status = "Offline";
          addToTable(account, streaming, status);
        } else {
          var status = json.stream.stream_type; // will show Live
          var descriptionOfContent = json.stream.game; // will show what's showing
          var linkToChannel = json.stream.channel.url;
          var logo = json.stream.channel.logo;
          console.log(linkToChannel);
          addToTable(account, descriptionOfContent, status, linkToChannel, logo);
        }
      }
    });
  }

  // loops through the accounts that I care about
  function getAccountInfo(listOfAccounts){
    for (var i = 0; i < listOfAccounts.length; i++){
      var account = listOfAccounts[i];
      getTwitchEndPoint(account);
    }
  }

  function addToTable(streamer, streamTitle, isLive, linkToIsLive, logo){
    if (isLive == 'live'){
      $(".stream-and-status tr:last").after('<tr><td class="streamer-logo"><img src="'+logo+ '" alt="'+ streamTitle +'"></td><td class="streamer-name">' + streamer + '</td><td class="stream-title">' + streamTitle + '</td><td class="is-live"><a href="'+ linkToIsLive + '"target=_>' + isLive + "</a></td></tr>");
    } else {
      $(".stream-and-status tr:last").after('<tr><td></td><td class="streamer-name">' + streamer + '</td><td class="stream-title">' + streamTitle + '</td><td class="is-live">' + isLive + "</td></tr>")
    }
  }

  getAccountInfo(listOfAccounts);
});
