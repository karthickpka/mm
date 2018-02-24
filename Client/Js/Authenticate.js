function pwd()
{
  if(document.getElementById("Password").value=="123" ){
      document.getElementById("Edit").disabled = false;
      document.getElementById("Delete").disabled = false;}
  else{
    document.getElementById("Edit").disabled = true;
    document.getElementById("Delete").disabled = true;}
}
//http://localhost:4444/insertRecord?imei=1&model=1&mrp=1&mop=1&discount=1&comment=xyz
 /*if(document.getElementById("IMEI").value)
    {
    queryString  = "/insertRecord?imei="+document.getElementById("IMEI").value +
                    "&date="+document.getElementById("Date").value +
                    "&model="+document.getElementById("Model").value +
                    "&mrp="+document.getElementById("MRP").value +
                    "&mop="+document.getElementById("MOP").value +
                    "&discount="+document.getElementById("Discount").value +
                    "&comment="+document.getElementById("Comment").value +
                    "&avail="+document.getElementById("Availability").value
    
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", queryString, false ); // false for synchronous request
        xmlHttp.send();
        alert(xmlHttp.responseText);
        viewAll();
    }
  else
  {alert("Ener atleast IMEI number before trying to ADD")}
}
*/
