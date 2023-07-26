var xmlHttp;
function createXMLHttpRequest() { 
  if (window.ActiveXObject) // Internet Explorer 
    xmlHttp=new ActiveXObject("Microsoft.XMLHTTP"); 
  else // Firefox, Opera 8.0+, Safari 
    xmlHttp=new XMLHttpRequest();
}

function stateChange() {
    if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete") { 
        if (xmlHttp.status == 200) {
          var avatarName = xmlHttp.responseText;
          alert("Mr. "+ avatarName);
          alert(avatarName);
          document.getElementById("welcome-message").innerHTML = "Welcome..." + avatarName + "!!";
          
        
          var avatars = ['./avatar/avatar1.jpg', './avatar/avatar2.jpg', './avatar/avatar3.jpg', './avatar/avatar4.jpg', './avatar/avatar5.jpg', './avatar/avatar6.jpg'];
          var avatarIndex = avatars.indexOf('./avatar/' + avatarName + '.jpg');
          if (avatarIndex > -1) {
            document.getElementById("avatar-big").src = avatars[avatarIndex];
            document.getElementById("hid").value = avatars[avatarIndex];
          }
          alert("<img src='./avatar/" + avatarName + ".jpg'>");
        }
      }
    }
 

function showAvatar(str) {
  createXMLHttpRequest();
  xmlHttp.onreadystatechange = stateChange;
  var url = "avatar.php";
  url = url + "?nickname=" + str; 
  xmlHttp.open("GET",url,true);
  xmlHttp.send(null); 
}




  