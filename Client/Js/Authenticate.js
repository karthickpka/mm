function pwd() {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", '/username', false); // false for synchronous request
  xmlHttp.send();

  if (xmlHttp.responseText == "shop1") {
    document.getElementById('ShopName').value = "Shop1";
  }
  else if (xmlHttp.responseText == "shop2") {
    document.getElementById('ShopName').value = "Shop2";
  }
  else if (xmlHttp.responseText == "shop3") {
    document.getElementById('ShopName').value = "Shop3";
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
