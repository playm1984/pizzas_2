const DOMElementsCart = {
  addPizzasBtn: document.querySelectorAll(".addPizzasBtn"),
  totalPrizzaMain: document.querySelector(".totalPrizzaMain"),
  totalCountMain: document.querySelector(".totalCountMain"),
  returnMain: document.querySelector(".returnMain"),
  cart_items: document.querySelector(".cart_items"),
};

let countPizza = 0;

function getPizzasInfoCookie() {
  let cookies = document.cookie.split("; ");

  let totalPrice = 0;
  let totalCount = 0;
  let arrayPizzas = [];
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].split("=")[0] === "pizza") {
      let cookiePizzasArray = cookies[i].split("=")[1].split(",");
      arrayPizzas = cookiePizzasArray;
      totalCount = cookiePizzasArray.length;
      for (let i = 0; i < cookiePizzasArray.length; i++) {
        const pizza = cookiePizzasArray[i].split("/");
        totalPrice += +pizza[2];
      }
    }
  }
  return {
    totalPrice,
    totalCount,
    arrayPizzas,
  };
}

window.addEventListener("DOMContentLoaded", function () {
  let infoPizzas = getPizzasInfoCookie();

  DOMElementsCart.totalPrizzaMain.innerHTML = infoPizzas.totalPrice;
  DOMElementsCart.totalCountMain.innerHTML = infoPizzas.totalCount;
});

function addPizzasCart(name, type, price, id) {
  DOMElementsCart.totalPrizzaMain.innerHTML =
    +DOMElementsCart.totalPrizzaMain.innerHTML + +price;

  countPizza += 1;
  DOMElementsCart.totalCountMain.innerHTML = countPizza;

  let cookiePizza = `${name}/${type}/${price}/${id}`;
  let isCheck = false;

  let cookies = document.cookie.split("; ");

  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].split("=")[0] === "pizza") {
      isCheck = true;
      document.cookie = `${[cookies[i], cookiePizza].join(",")}; max-age=1000`;
    } else {
      document.cookie = `pizza=${cookiePizza}; max-age=1000`;
    }
  }
}

function displayPizzasCart() {
  let infoPizzas = getPizzasInfoCookie();

  // let objPizzas = {};

  // for (let i = 0; i < infoPizzas.arrayPizzas.length; i++) {
  //   const elem = infoPizzas.arrayPizzas[i];

  //   let key = elem.split("/")[3];

  //   if (objPizzas[key] !== undefined) {
  //     objPizzas[key] += 1;
  //   } else {
  //     objPizzas[key] = 1;
  //   }
  // }

  let items = [];

  for (let i = 0; i < infoPizzas.arrayPizzas.length; i++) {
    const elem = infoPizzas.arrayPizzas[i];

    let name = elem.split("/")[0];
    let typePizza = elem.split("/")[1];
    let price = elem.split("/")[2];

    items.push(`<div class="cart_item">
    <div class="cart_wrapper">
        <div class="item_info">
            <img src="" alt="" />
            <div class="item_info_description">
                <h1>${name}</h1>
                <p>${typePizza} тесто</p>
            </div>
        </div>
        <div class="item_count">
            <button onclick='calcPizzaInCart("-")'>
                <p>-</p>
            </button>
            <p>1</p>
            <button onclick='calcPizzaInCart("+")'>
                <p>+</p>
            </button>
        </div>
    </div>
    <div class="cart_wrapper">
        <h1 class="item_price">${price} P</h1>
        <button class="remove" onclick='removeTypsPizzas()'>
            <img src="../../img/remove.png" alt="remove" />
        </button>
    </div>
  </div>
    `);
  }
  return items;
}

const pizzasItemCart = displayPizzasCart();

DOMElementsCart.cart_items.innerHTML = pizzasItemCart.join("");

DOMElementsCart.returnMain.addEventListener("click", function () {
  DOMElements.main.classList.remove("none");
  DOMElements.cartBtn.classList.remove("none");
  DOMElements.carts.classList.add("none");
});
