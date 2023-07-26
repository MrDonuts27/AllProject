function createXMLHttpRequest() {
  var xmlHttp;
  if (window.XMLHttpRequest) {
    // code for modern browsers
    xmlHttp = new XMLHttpRequest();
  } else {
    // code for old IE browsers
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  return xmlHttp;
}

function stateChange() {
  var xmlHttp = this;
  if (xmlHttp.readyState == 4 || xmlHttp.readyState == "complete") {
    // Get the response from the server
    var response = xmlHttp.responseText;

    // Parse the JSON response
    var names = JSON.parse(response);

    // Get the datalist element
    var dataList = document.getElementById("name" );

    // Clear the options in the datalist
    dataList.innerHTML = "";

    // Add options to the datalist for each name
    for (var i = 0; i < names.length; i++) {
      var option = document.createElement("option");
      option.value = names[i];
      dataList.appendChild(option);
    }
  }
}

function searchName(str) {
  var xmlHttp = createXMLHttpRequest();
  xmlHttp.onreadystatechange = stateChange;
  var url = "name.php?name=" + str;
  xmlHttp.open("GET", url, true);
  xmlHttp.send(null);
}
