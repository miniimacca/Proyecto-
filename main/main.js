import { Producto } from "./producto.js";

// INICIALIZACION
var productos = [];
var carrito = [];

// Validacion
const validar = localStorage.getItem("productos");
const menuList = document.querySelector(".cardContainer");
const checkAdmin = JSON.parse(localStorage.getItem("User"));

// Navegacion
const landingBtn = document.querySelector("#label1");
const menuBtn = document.querySelector("#label2");
const cartBtn = document.querySelector("#label3");
const logOutBtn = document.querySelector("#label4");

// CRUD
const addProductBtn = document.querySelector("#addProductBtn");
const cancelProductBtn = document.querySelector("#cancelProduct");
const createProductBtn = document.querySelector("#createProduct");

// Display
const landingDisplay = document.querySelector(".landingContainer");
const menuDisplay = document.querySelector(".cardContainer");
const cartDisplay = document.querySelector(".cartContainer");
const cartContent = document.querySelector(".cartContent");
const createProductDisplay = document.querySelector(".createProductForm");

// Carrito
const totalDisplay = document.querySelector("#totalDisplay");
const resetCartBtn = document.querySelector("#cancelCart");
const confirmCartBtn = document.querySelector("#confirmCart");
let total = 0;

if (checkAdmin.type != "Admin") {
  addProductBtn.classList.add("hidden");
}
if (validar != null) {
  productos = JSON.parse(validar);

  productos.forEach((producto) => {
    cargarProductos(producto);
  });
  getAddBtns();
}

// Navegacion
landingBtn.addEventListener("click", function () {
  landingDisplay.classList.remove("hidden");
  menuDisplay.classList.add("hidden");
  cartDisplay.classList.add("hidden");
  createProductDisplay.classList.add("hidden");
});
menuBtn.addEventListener("click", function () {
  landingDisplay.classList.add("hidden");
  menuDisplay.classList.remove("hidden");
  cartDisplay.classList.add("hidden");
  createProductDisplay.classList.add("hidden");
});
cartBtn.addEventListener("click", function () {
  landingDisplay.classList.add("hidden");
  menuDisplay.classList.add("hidden");
  cartDisplay.classList.remove("hidden");
  createProductDisplay.classList.add("hidden");
});
logOutBtn.addEventListener("click", function () {
  localStorage.removeItem("User");
  location.replace("../inicio/index.html");
});

// CRUD Inicializar
addProductBtn.addEventListener("click", function () {
  menuDisplay.classList.add("hidden");
  createProductDisplay.classList.remove("hidden");
});
cancelProductBtn.addEventListener("click", function () {
  menuDisplay.classList.remove("hidden");
  createProductDisplay.classList.add("hidden");
});
createProductBtn.addEventListener("click", function () {
  crearProducto();
});

// CRUD Crear
function crearProducto() {
  let id = productos.length + 1;
  let nombre = document.querySelector("#nombre").value;
  let descripcion = document.querySelector("#descripcion").value;
  let precio = parseInt(document.querySelector("#precio").value);
  let imagen = document.querySelector("#imagen").value;
  let newProducto = new Producto(id, nombre, descripcion, precio, imagen);

  if (
    nombre == "" ||
    descripcion == "" ||
    precio <= 0 ||
    Number.isNaN(precio) ||
    imagen == "-1"
  ) {
    alert("Complete todos los campos correctamente.");
  } else {
    for (let i = 0; i < productos.length; i++) {
      const eliminar = document.querySelector(".card");
      menuList.removeChild(eliminar);
    }

    productos.push(newProducto);

    localStorage.setItem("productos", JSON.stringify(productos));

    productos.forEach((producto) => {
      cargarProductos(producto);
    });

    getAddBtns();

    alert("Producto creado.");

    document.querySelector("#nombre").value = "";
    document.querySelector("#descripcion").value = "";
    document.querySelector("#precio").value = "";
    document.querySelector("#imagen").value = "-1";
  }
}

// CRUD Mostrar
function cargarProductos(producto) {
  let newCard = document.createElement("div");
  newCard.classList.add("card");

  newCard.innerHTML = `
          <div class="cardFront">
              <img src="${producto.imagen}" />
          </div>
          <div class="cardBack">
              <div class="descripcion">
                  <b>${[producto.nombre]}</b>
                  <br>
                  ${[producto.descripcion]}
              </div>
              <div class="actions">
                  <div class="precio">Precio:$${[producto.precio]}</div>
                  <button id="${producto.id}" class="addToCartBtn">
                      <ion-icon name="cart-outline"></ion-icon>
                  </button>
              </div>
          </div>`;
  menuList.appendChild(newCard);
}

// CARRITO

// Botones
resetCartBtn.addEventListener("click", function () {
  resetCart();
});
confirmCartBtn.addEventListener("click", function () {
  alert(
    "Su lista ha sido enviada. (Trabajo en proceso)"
  );
});
function getAddBtns() {
  const addToCartBtns = document.querySelectorAll(".addToCartBtn");

  for (let i = 0; i < addToCartBtns.length; i++) {
    addToCartBtns[i].addEventListener("click", function () {
      addToCart(addToCartBtns[i].id);
    });
  }
}

// Agregar
function addToCart(id) {
  let cartProductDetected = false;

  carrito.find((producto) => {
    if (producto.id == id) {
      cartProductDetected = true;
      alert("Producto ya agregado.");
    }
  });
  if (cartProductDetected == false) {
    productos.find((producto) => {
      if (producto.id == id) {
        carrito.push(producto);
        total += parseInt(producto.precio);
        totalDisplay.innerHTML = `Total: $${total}`;
        displayCartContent(producto);
      }
    });
  } else {
    alert("Aumentando cantidad.");
  }

  console.log(carrito);
  // console.log(cartContent);
}

// Mostrar
function displayCartContent(producto) {
  let newTR = document.createElement("tr");
  newTR.id = producto.id;
  newTR.classList.add("productLine");

  newTR.innerHTML = `<td>${carrito.length}</td>
    <td>${producto.nombre}</td>
    <td>${producto.precio}</td>
    <td>${1}</td>
    <td>${producto.precio}</td>`;

  cartContent.appendChild(newTR);
}

// Reiniciar
function resetCart() {
  for (let i = 0; i < carrito.length; i++) {
    const eliminar = document.querySelector(".productLine");
    cartContent.removeChild(eliminar);
  }
  totalDisplay.innerHTML = "Total: 0";
  carrito = [];
  total = 0;
}
