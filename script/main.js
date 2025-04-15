var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCategory = document.getElementById("productCategory")
var productDescription = document.getElementById("productDescription")
var tableData = document.getElementById("tableData")

var productList = []

function addData(){
    var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDescription.value
    }
    productList.push(product);
    displayData()
}

function displayData(){
    var box = ''
    for(var i = 0; i < productList.length; i++){
        box += `
            <tr>
                <td>${productList[i].name}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].category}</td>
                <td>${productList[i].desc}</td>
                <td>
                    <button class="btn btn-outline-warning btn-sm">Update</button>
                    <button class="btn btn-outline-danger btn-sm">Delete</button>
                </td>
            </tr>
        `
    }
    tableData.innerHTML = box
}