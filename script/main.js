var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCategory = document.getElementById("productCategory")
var productDescription = document.getElementById("productDescription")
var tableData = document.getElementById("tableData")
var searchInput = document.getElementById("searchInput")
var addBtn = document.getElementById("addBtn")
var updateBtn = document.getElementById("updateBtn")

var keyStorage = "Products"
var indexInput = 0

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
    clearForm()
}

function setData(index){
    indexInput = index

    productName.value = productList[index].name
    productPrice.value = productList[index].price
    productCategory.value = productList[index].category
    productDescription.value = productList[index].desc

    addBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")
}

function updateProduct(){
    var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        desc: productDescription.value
    }
    productList.splice(indexInput, 1, product)
    localStorage.setItem(keyStorage, JSON.stringify(productList))
    displayData()

    addBtn.classList.remove("d-none")
    updateBtn.classList.add("d-none")

    clearForm()
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
                    <button class="btn btn-outline-warning btn-sm" onclick="setData(${i})">Update</button>
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
                    <button class="btn btn-outline-warning btn-sm" onclick="setData(${i})">Update</button>
                    <button class="btn btn-outline-danger btn-sm" onclick="deleteProduct(${i})">Delete</button>
                </td>
            </tr>
        `
        }
    }
    tableData.innerHTML = box
}

function clearForm(){
    productName.value = ""
    productPrice.value = ""
    productCategory.value = ""
    productDescription.value = ""
}