var setDate = function () {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    // console.log([year, month, day].join('-'))
    document.getElementById("Date").value = [year, month, day].join('-');
}

function getProdDetails() {
    setDate();

    //alert("temp:"+window.location.toString().split("=")[1].split("_")[0]);
    var xmlHttp = new XMLHttpRequest();
    var queryString = "/searchRecord?name=_id&value=" + window.location.toString().split("=")[1].split("_")[0];
    xmlHttp.open("GET", queryString, false); // false for synchronous request
    xmlHttp.send();
    temp = JSON.parse(xmlHttp.responseText);
    document.getElementById("IMEI").innerHTML = temp[0]["_id"]
    document.getElementById("Model").innerHTML = temp[0]["Model"]
    document.getElementById("MRP").innerHTML = temp[0]["MRP"]
    document.getElementById("Discount").value = temp[0]["Discount"]
    document.getElementById("ShopName").innerHTML = temp[0]["ShopName"]
    document.getElementById("Selling Price").innerHTML = document.getElementById("MRP").innerHTML
        - document.getElementById("Discount").value

    //alert("Check Avail:"+temp[0]["Availability"]);

    if (temp[0]["Availability"] == 0 || window.location.toString().split("=")[1].indexOf("_") > -1) {
        //alert("already Sold")
        // Disable Div
        var elems = document.getElementsByTagName('input');
        var len = elems.length;

        for (var i = 0; i < len; i++) {
            if (elems[i].value.indexOf("Print Bill") >= 0)
                document.getElementById("sellPrint").value = "Print Bill";

            else {
                elems[i].style = "background-color: transparent;border:0;";
                elems[i].disabled = true;
            }
        }

        var xmlHttp1 = new XMLHttpRequest();
        var queryString1 = "/searchBillingRecord?name=_id&value=" + window.location.toString().split("=")[1];
        xmlHttp1.open("GET", queryString1, false); // false for synchronous request
        xmlHttp1.send();
        tempBill = JSON.parse(xmlHttp1.responseText);
        document.getElementById("Date").value = tempBill[0]["Date"]
        document.getElementById("CustomerName").value = tempBill[0]["CustName"]
        document.getElementById("Contact").value = tempBill[0]["CustContact"]
        document.getElementById("Address").value = tempBill[0]["CustAddress"]
        document.getElementById("BillNo").innerHTML = tempBill[0]["BillNo"]
        document.getElementById("ShopName").innerHTML = tempBill[0]["ShopName"]
        document.getElementById("Selling Price").value = tempBill[0]["SellingPrice"]
        document.getElementById("Discount").innerHTML = temp[0]["MRP"] - tempBill[0]["SellingPrice"];//temp[0]["MRP"] - tempBill[0]["SellingPrice"]
        //alert("Here:"+tempBill[0]["SellingPrice"])
        // Get Customer Details from billing table
    }
    else if (!document.getElementById("BillNo").innerHTML) {
        // alert('no bill no')
        var xmlHttp1 = new XMLHttpRequest();
        xmlHttp1.open("GET", "/searchBillingRecord", false); // false for synchronous request
        xmlHttp1.send();
        //alert(xmlHttp1.responseText)
        document.getElementById("BillNo").innerHTML = parseInt(xmlHttp1.responseText) + 1;
    }
    else
        ;//This is to handle get bill only for first time; alert('unknown error')
}


function sellFunction() {
    // Insert into Billing Table
    //alert("Sell For:"+document.getElementById("Selling Price").value);
    if (document.getElementById('sellPrint').value == "Sell And Print Bill") {
        var sellConfirm = confirm("Sell For:" + document.getElementById("Selling Price").value);
        if (sellConfirm) {
            var xmlHttp = new XMLHttpRequest();
            var queryString = "/insertBilling?imei=" + document.getElementById("IMEI").innerHTML +
                "&billno=" + document.getElementById("BillNo").innerHTML +
                "&model=" + document.getElementById("Model").innerHTML +
                "&date=" + document.getElementById("Date").value +
                "&name=" + document.getElementById("CustomerName").value +
                "&contact=" + document.getElementById("Contact").value +
                "&address=" + document.getElementById("Address").value +
                "&sellingprice=" + document.getElementById("Selling Price").value +
                "&shopname=" + document.getElementById("ShopName").innerHTML +
                "&comment=" + "";//document.getElementById("Comment").value;
            //alert(document.getElementById("Selling Price").innerHTML)
            xmlHttp.open("GET", queryString, false); // false for synchronous request
            xmlHttp.send();
            //alert(xmlHttp.responseText)

            // Update Inventory table
            queryString1 = "/updateRecord?imei=" + temp[0]["_id"] +
                "&avail=" + (parseInt(temp[0].Availability) - 1).toString();
            var xmlHttp1 = new XMLHttpRequest();
            xmlHttp1.open("GET", queryString1, false); // false for synchronous request
            xmlHttp1.send();
            //alert(xmlHttp1.responseText);
            getProdDetails();

            // Remove Background
            var elems = document.getElementsByTagName('input');
            var len = elems.length;
            for (var i = 0; i < len; i++) {
                if (elems[i].value.indexOf("Print Bill") >= 0)
                    ;
                else {
                    elems[i].style = "background-color: transparent;border:0;";
                    elems[i].disabled = true;
                }
            }
            window.print();
        }
    }
    else
        window.print();
}
