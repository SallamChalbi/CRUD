var productName = document.getElementById("productName")
var productPrice = document.getElementById("productPrice")
var productCategory = document.getElementById("productCategory")
var productDescription = document.getElementById("productDescription")

function getData(){
    document.getElementById("data").innerHTML = productName.value + productPrice.value + productCategory.value + productDescription.value
}