var xmlHttp;

function createXMLHttpRequest() {
    if (window.ActiveXObject) { // Internet Explorer
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    } else { // Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
    }
}//end function createXMLHttpRequest()
function stateChange() {
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
        var response = JSON.parse(xmlHttp.responseText); // Parse JSON response
        alert("JSON Data: " + JSON.stringify(response)); // Alert JSON data
        var data = response[0]; // Get the first object in the response array
        var message = "Firstname: " + data.firstname + " Lastname: " + data.lastname + " Age: " + data.age + " Gender: " + data.gender + " Photo: " + data.photo;
        alert(message);
        document.myForm.firstname.value = data.firstname;
        document.myForm.lastname.value = data.lastname;
        document.myForm.age.value = data.age;
        document.myForm.gender.value = data.gender;
        document.getElementById("pic").innerHTML='<img src="' + data.photo + '">';
        document.getElementById("hid").value = data.photo;
    }
}
      
 // end function statechange()

 function searchName(str) {
    createXMLHttpRequest();
    xmlHttp.onreadystatechange = stateChange;
    var url = "data.php";
    url = url + "?name=" + str; 
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}