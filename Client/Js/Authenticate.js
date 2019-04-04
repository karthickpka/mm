function pwd() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", '/username', false); // false for synchronous request
  xmlHttp.send();

  if (xmlHttp.responseText == "LMobiles") {
    document.getElementById('ShopName').value = "LMobiles";
  }
  else if (xmlHttp.responseText == "MMMI") {
    document.getElementById('ShopName').value = "MMMI";
  }
  else if (xmlHttp.responseText == "shop3") {
    document.getElementById('ShopName').value = "Shop3";
  }
  else if (xmlHttp.responseText == "shop4") {
    document.getElementById('ShopName').value = "Shop4";
  }
  else if (xmlHttp.responseText == "admin") {
    document.getElementById('ShopName').value = "All";
    document.getElementById('Edit').disabled = false;
    document.getElementById('Delete').disabled = false;
    document.getElementById('ShopName').disabled = false;
  }
  else {
    window.location.replace('/');  //repalce will remove from browser back history
  }
}
