var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCategory = document.getElementById("productCategory")
var productDescription = document.getElementById("productDescription")
var tableData = document.getElementById("tableData")
var searchInput = document.getElementById("searchInput")
var keyStorage = "Products"

var productList = JSON.parse(localStorage.getItem(keyStorage)) || []
displayData();

function addProduct(){
    var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDescription.value
    }
    productList.push(product);
    localStorage.setItem(keyStorage, JSON.stringify(productList))
    displayData()
}

function deleteProduct(element){
    productList.splice(element, 1)
    localStorage.setItem(keyStorage, JSON.stringify(productList))
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
                    <button class="btn btn-outline-danger btn-sm" onclick="deleteProduct(${i})">Delete</button>
                </td>
            </tr>
        `
    }
    tableData.innerHTML = box
}

function searchProduct(){
    var term = searchInput.value.toLowerCase()
    var box = ''
    for(var i = 0; i < productList.length; i++){
        if(productList[i].name.toLowerCase().includes(term)){
            box += `
            <tr>
                <td>${productList[i].name}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].category}</td>
                <td>${productList[i].desc}</td>
                <td>
                    <button class="btn btn-outline-warning btn-sm">Update</button>
                    <button class="btn btn-outline-danger btn-sm" onclick="deleteProduct(${i})">Delete</button>
                </td>
            </tr>
        `
        }
    }
    tableData.innerHTML = box
}