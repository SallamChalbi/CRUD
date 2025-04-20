var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCategory = document.getElementById("productCategory")
var productDescription = document.getElementById("productDescription")
var tableData = document.getElementById("tableData")
var searchInput = document.getElementById("searchInput")
var addBtn = document.getElementById("addBtn")
var updateBtn = document.getElementById("updateBtn")
var nameFeedback = document.getElementById("nameFeedback")
var priceFeedback = document.getElementById("priceFeedback")
var categoryFeedback = document.getElementById("categoryFeedback")
var descriptionFeedback = document.getElementById("descriptionFeedback")

var keyStorage = "Products"
var indexInput = 0

var productList = JSON.parse(localStorage.getItem(keyStorage)) || []
displayData();

function addProduct(){
    if(regexName() && regexPrice() && regexCategory() && regexDescription()){
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
    else{
        noValid();
    }
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
    if(regexName() && regexPrice() && regexCategory() && regexDescription()){
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
    else{
        noValid();
    }
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
    productName.classList.remove("is-valid")
    productPrice.classList.remove("is-valid")
    productCategory.classList.remove("is-valid")
}

function regexName(){
    var regex = /^[A-Z][a-z\s?]{2,10}$/
    
    if(regex.test(productName.value)){
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid")
        nameFeedback.classList.add("d-none");
        return true
    }
    else{
        productName.classList.add("is-invalid")
        productName.classList.remove("is-valid")
        nameFeedback.classList.remove("d-none")
        if(productName.value == '')
            nameFeedback.innerHTML = "Product Name is Required"
        else
            nameFeedback.innerHTML = "Invalid Pattern, start with Capital letter, 2-10 small letter"
        return false
    }
}

function regexPrice(){
    var regex = /^[1-9][0-9]{2,5}$/
    
    if(regex.test(productPrice.value)){
        productPrice.classList.add("is-valid");
        productPrice.classList.remove("is-invalid")
        priceFeedback.classList.add("d-none");
        return true
    }
    else{
        productPrice.classList.add("is-invalid")
        productPrice.classList.remove("is-valid")
        priceFeedback.classList.remove("d-none")
        if(productPrice.value == '')
            priceFeedback.innerHTML = "Product Price is Required"
        else
            priceFeedback.innerHTML = "Invalid Pattern, 3-5 positive numbers"
        return false
    }
}

function regexCategory(){
    var regex = /^[A-Z][a-z\s?]{2,15}$/
    
    if(regex.test(productCategory.value)){
        productCategory.classList.add("is-valid");
        productCategory.classList.remove("is-invalid")
        categoryFeedback.classList.add("d-none");
        return true
    }
    else{
        productCategory.classList.add("is-invalid")
        productCategory.classList.remove("is-valid")
        categoryFeedback.classList.remove("d-none")
        if(productCategory.value == '')
            categoryFeedback.innerHTML = "Product Category is Required"
        else
            categoryFeedback.innerHTML = "Invalid Pattern, start with Capital letter, 3-15 small letter"
        return false
    }
}

function regexDescription(){
    var regex = /^$|^[A-Z][a-zA-Z0-9 ,.\-()!'+_]*$/
    
    if(regex.test(productDescription.value)){
        productDescription.classList.remove("is-invalid")
        descriptionFeedback.classList.add("d-none");
        return true
    }
    else{
        productDescription.classList.add("is-invalid")
        descriptionFeedback.classList.remove("d-none")
        descriptionFeedback.innerHTML = "Invalid Pattern, must start with Capital letter, can't use some special characters"
        return false
    }
}

function noValid(){
    regexName();
    regexPrice();
    regexCategory();
    regexDescription();
}