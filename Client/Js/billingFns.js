   function getProdDetails()
    {
        //alert(window.location.toString().split("=")[1])
        document.getElementById("Date").value =0// "08/08/2017"
        var xmlHttp = new XMLHttpRequest();
        var queryString="/searchRecord?name=_id&value="+ window.location.toString().split("=")[1];
        xmlHttp.open( "GET", queryString, false ); // false for synchronous request
        xmlHttp.send();
        temp = JSON.parse(xmlHttp.responseText);
        //alert(temp.length)
        // Set values
        document.getElementById("IMEI").innerHTML = temp[0]["_id"]
        
        document.getElementById("Model").innerHTML=temp[0]["Model"]
        document.getElementById("MRP").innerHTML=temp[0]["MRP"]
        document.getElementById("Discount").value=temp[0]["Discount"]
        document.getElementById("Selling Price").innerHTML = document.getElementById("MRP").innerHTML 
                                                    - document.getElementById("Discount").value
    
        if(temp[0]["Availability"]=="Sold")
            {
                //alert("alredy Sold")
                // Disable Div
                var elems = document.getElementsByTagName('input');
                var len = elems.length;

                for (var i = 0; i < len; i++) {
                    if(elems[i].value.indexOf("Print Bill")>=0)
                        document.getElementById("sellPrint").value="Print Bill";
                    
                    else{elems[i].style = "background-color: transparent;border:0;";
                        elems[i].disabled = true;}
                }

                var xmlHttp1 = new XMLHttpRequest();
                var queryString1="/searchBillingRecord?name=_id&value="+ window.location.toString().split("=")[1];
                xmlHttp1.open( "GET", queryString1, false ); // false for synchronous request
                xmlHttp1.send();
                tempBill = JSON.parse(xmlHttp1.responseText);
                //alert(tempBill[0]["Date"])
                document.getElementById("Date").value = tempBill[0]["Date"]
                document.getElementById("CustomerName").value = tempBill[0]["CustName"]
                document.getElementById("Contact").value = tempBill[0]["CustContact"]
                document.getElementById("Address").value = tempBill[0]["CustAddress"]
                document.getElementById("BillNo").innerHTML = tempBill[0]["BillNo"]
                document.getElementById("Selling Price").innerHTML = tempBill[0]["SellingPrice"]
                //document.getElementById("Discount").innerHTML = "test"
                document.getElementById("Discount").value = temp[0]["MRP"] - tempBill[0]["SellingPrice"];//temp[0]["MRP"] - tempBill[0]["SellingPrice"]
                //alert(document.getElementById("Discount").innerHTML )
                // Get Customer Details from billing table
            }
        else{
        //alert(JSON.parse(xmlHttp.responseText)[0]["_id"]);
            document.getElementById("Date").value = Date();
            // Generate Bill Number
            var xmlHttp1 = new XMLHttpRequest();
            xmlHttp1.open( "GET", "/searchBillingRecord", false ); // false for synchronous request
            xmlHttp1.send();
            //alert(xmlHttp1.responseText)
            document.getElementById("BillNo").innerHTML = parseInt(xmlHttp1.responseText) + 1;
            }
    }
        

function sellFunction(){
        // Insert into Billing Table
    if(document.getElementById('sellPrint').value=="Sell And Print Bill")
            {
            var sellConfirm = confirm("Are You Sure Want to Sell?");
            if(sellConfirm)
            {
            var xmlHttp = new XMLHttpRequest();
            var queryString="/insertBilling?imei="+document.getElementById("IMEI").innerHTML+
                            "&billno="+document.getElementById("BillNo").innerHTML+
                            "&date="+document.getElementById("Date").value +
                            "&name="+document.getElementById("CustomerName").value +
                            "&contact="+document.getElementById("Contact").value +
                            "&address="+document.getElementById("Address").value +
                            "&sellingprice="+document.getElementById("Selling Price").innerHTML +
                            "&comment="+"";//document.getElementById("Comment").value;
            //alert(document.getElementById("Selling Price").innerHTML)
            xmlHttp.open( "GET", queryString, false ); // false for synchronous request
            xmlHttp.send();
            //alert(xmlHttp.responseText)

            // Update Inventory table
            queryString1  = "/updateRecord?imei="+temp[0]["_id"] +
                            "&avail="+"Sold";   
            var xmlHttp1 = new XMLHttpRequest();
            xmlHttp1.open( "GET", queryString1, false ); // false for synchronous request
            xmlHttp1.send();
            //alert(xmlHttp1.responseText);
            getProdDetails();

            // Remove Background
            var elems = document.getElementsByTagName('input');
            var len = elems.length;
            for (var i = 0; i < len; i++) {
                if(elems[i].value.indexOf("Print Bill")>=0)
                    ;
                else{elems[i].style = "background-color: transparent;border:0;";
                    elems[i].disabled = true;}
                }
            window.print();
            }           
            }
    else
        window.print();
        
     
}

    /*function printDiv(divName) {
     //var printContents = document.getElementById(divName).innerHTML;
     //var originalContents = document.body.innerHTML;
     //document.body.innerHTML = printContents;
     //window.print();
     //document.body.innerHTML = originalContents;
    }*/