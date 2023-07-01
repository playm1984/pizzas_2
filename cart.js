const DOMElementsCart = {
  addPizzasBtn: document.querySelectorAll(".addPizzasBtn"),
  returnMain: document.querySelector(".returnMain"),
  cart_items: document.querySelector(".cart_items"),
  cartCountPizzas: document.querySelector(".countPizzas"),
  cartTotalPrice: document.querySelector(".totalPrice"),
};

function addPizzasCart(name, type, price, id) {
  DOMElements.totalPrizzaMain.innerHTML =
    +DOMElements.totalPrizzaMain.innerHTML + +price;

  DOMElements.totalCountMain.innerHTML =
    +DOMElements.totalCountMain.innerHTML + 1;

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

  DOMElementsCart.cartCountPizzas.innerHTML = infoPizzas.totalCount;
  DOMElementsCart.cartTotalPrice.innerHTML = infoPizzas.totalPrice;

  let sortedPizzas = [];

  let items = [];

  for (const key in infoPizzas.objPizzas) {
    let id = key.split("_")[0];
    let count = infoPizzas.objPizzas[key];

    for (let i = 0; i < pizzas.length; i++) {
      let pizza = pizzas[i];
      if (pizza.id === id) {
        for (let k = 0; k < pizza.type.length; k++) {
          const typePizza = pizza.type[k];
          if (typePizza.id === key) {
            let result = {
              ...typePizza,
              image: pizza.image,
              count,
              pizza: pizza.name,
            };
            sortedPizzas.push(result);
          }
        }
      }
    }
  }

  for (let i = 0; i < sortedPizzas.length; i++) {
    const elem = sortedPizzas[i];

    items.push(`<div class="cart_item">
    <div class="cart_wrapper">
        <div class="item_info">
            <img src="${elem.image}" alt="" />
            <div class="item_info_description">
                <h1>${elem.pizza}</h1>
                <p>${elem.name} тесто</p>
            </div>
        </div>
        <div class="item_count">
            <button onclick='calcPizzaInCart("${elem.id}", "-")'>
                <p>-</p>
            </button>
            <p>${elem.count}</p>
            <button onclick='calcPizzaInCart("${elem.id}", "+")'>
                <p>+</p>
            </button>
        </div>
    </div>
    <div class="cart_wrapper">
        <h1 class="item_price">${elem.price * elem.count} P</h1>
        <button class="remove" onclick='removeTypsPizzas()'>
            <img src="./image/icon/remove.png" alt="remove" />
        </button>
    </div>
  </div>
    `);
  }
  return items;
}

const pizzasItemCart = displayPizzasCart();

DOMElementsCart.cart_items.innerHTML = pizzasItemCart.join("");

function calcPizzaInCart(id, operator) {
  let pizzasCookie = getPizzasInfoCookie();

  for (const key in pizzasCookie.objPizzas) {
    if (key === id) {
      if (operator === "+") {
        pizzasCookie.objPizzas[key] += 1;
        addPizzasCookie(id);
        displayPizzasCart();
      }
      if (operator === "-") {
        pizzasCookie.objPizzas[key] -= 1;
      }
    }
  }
}

DOMElementsCart.returnMain.addEventListener("click", function () {
  DOMElements.main.classList.remove("none");
  DOMElements.cartBtn.classList.remove("none");
  DOMElements.carts.classList.add("none");
});
