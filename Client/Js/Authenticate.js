function pwd() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", '/username', false); // false for synchronous request
  xmlHttp.send();

  if (xmlHttp.responseText == "LNMIUTG") {
    document.getElementById('ShopName').value = "LNMIUTG";
  }
  else if (xmlHttp.responseText == "LNMIPO") {
    document.getElementById('ShopName').value = "LNMIPO";
  }
  else if (xmlHttp.responseText == "MMSHOP1") {
    document.getElementById('ShopName').value = "MMSHOP1";
  }
  else if (xmlHttp.responseText == "MMSHOP2") {
    document.getElementById('ShopName').value = "MMSHOP2";
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
