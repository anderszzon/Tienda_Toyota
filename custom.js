//variables
let allContainerCart = document.querySelector(".products");
let containerBuyCart = document.querySelector(".card-items");
let priceTotal = document.querySelector(".price-total");
let amountProduct = document.querySelector(".count-product");

let buyThings = [];
let totalCard = 0;
let countProduct = 0;
let countInventario = 10;

//functions
loadEventListenrs();
function loadEventListenrs() {
  allContainerCart.addEventListener("click", addProduct);

  containerBuyCart.addEventListener("click", deleteProduct);
}

function addProduct(e) {
  e.preventDefault(); //SOLUCIONA EL TARGET DEL BOTON

  if (e.target.classList.contains("btn-add-cart")) {
    //SOLAMENTE CUANDO HACCEMOS CLICK EN EL BTN YA NO DEJA HACER TARGET A LOS DEMAS ELEMENTOS DEL CONTAINER
    const selectProduct = e.target.parentElement;
    //OBTIENE EL TARGET Y EL PADRE DEL ELEMENTO  DIV CLASS CART
    readTheContent(selectProduct);
  }
}

//BORRAR PRODUCTO

function deleteProduct(e) {
  if (e.target.classList.contains("delete-product")) {
    const deleteId = e.target.getAttribute("data-id");

    buyThings.forEach((value) => {
      if (value.id == deleteId) {
        let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
        totalCard = totalCard - priceReduce;
        totalCard = totalCard.toFixed(2);
      }
    });
    buyThings = buyThings.filter((product) => product.id !== deleteId);

    countProduct--;
    countInventario++;
  }

  // ENVIAR LA INFORMACION OBTENIDA AL DESPLEGABLE

  //FIX: El contador se quedaba con "1" aunque ubiera 0 productos
  if (buyThings.length === 0) {
    priceTotal.innerHTML = 0;
    amountProduct.innerHTML = 0;
  }
  loadHtml();
}

// SACAR TODOS LOS ATRIBITOS DE CADA PRODUCTOS IMAGEN DESCRIPCION ETC

function readTheContent(product) {
  const infoProduct = {
    // DESDE AQUI DIRECCIONO DONDE ESTA MI INFORMACION , CON ESTO SOLUCIONO LO DE LA GALERIA QUE ESTABA CREANDO AL PRINCIPIO
    image: product.querySelector("div img").src, // LA IMAGEN
    title: product.querySelector(".title").textContent, // LA DESCRIPCION
    price: product.querySelector("div p span").textContent, // EL SPAN
    id: product.querySelector("a").getAttribute("data-id"), // EL ATRIBUTO DE CADA BOTON
    amount: 1, //LA CANTIDAD POR DEFECTO 1 Y SUMA CADA VEZ UN PRODUCTO
    inventario: 10,
  };

  totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
  totalCard = totalCard.toFixed(2);

  const exist = buyThings.some((product) => product.id === infoProduct.id);
  if (exist) {
    const pro = buyThings.map((product) => {
      if (product.id === infoProduct.id) {
        product.amount++;
        product.inventario++;
        return product;
      } else {
        return product;
      }
    });
    buyThings = [...pro];
  } else {
    buyThings = [...buyThings, infoProduct];
    countProduct++;
    countInventario--;
  }
  loadHtml();
  //console.log(infoProduct);
}

function loadHtml() {
  clearHtml();
  buyThings.forEach((product) => {
    // ASIGNARLE LOS ATRIBUTOS AL OBJETO
    const { image, title, price, amount, id } = product;
    //CREA LA ESTRUCTURA HTML
    const row = document.createElement("div");
    row.classList.add("item");
    row.innerHTML = `
            <img src="${image}" alt="">
            
            <div class="item-content">

                <h5 class="cart-price">${price}$</h5>
                <h6>Cantidad: ${amount}</h6>
                
                <h6>Inventario: ${10 - amount}</h6>

            </div>
            <span class="delete-product" data-id="${id}">X</span>

        `;

    containerBuyCart.appendChild(row); // funcion para ir añadiendo la informacion en el desplegable

    priceTotal.innerHTML = totalCard;

    amountProduct.innerHTML = countProduct;
  });
}
function clearHtml() {
  containerBuyCart.innerHTML = "";
}
