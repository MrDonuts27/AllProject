var xmlHttp;

function createXMLHttpRequest() {
    if (window.ActiveXObject) { // Internet Explorer
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } else { // Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
    }
}//end function createXMLHttpRequest()
function stateChange()
{
 if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete") { 
    var data = JSON.parse(xmlHttp.responseText);
    var message = "Firstname: " + data.firstname + "Lastname: " + data.lastname + "Age: " + data.age + "Gender: " + data.gender + "Photo: " + data.photo;
    alert(message);
    document.myForm.name.value = data.firstname;
    document.myForm.lastname.value = data.lastname;
    document.myForm.age.value = data.age;
    document.myForm.gender.value = data.gender;
    document.getElementById("pic").innerHTML='<img src="' + data.photo + '">';
    document.getElementById("hid").value = data.photo;
 } 
}
      
 // end function statechange()

 function searchName(str)
 {
  createXMLHttpRequest();
  xmlHttp.onreadystatechange = stateChange;
  var url = "data.php?name=" + str; 
  xmlHttp.open("GET",url,true);
  xmlHttp.send(null); 
 } //end function showHint(str)