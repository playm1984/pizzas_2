const DOMElementsCart = {
  addPizzasBtn: document.querySelectorAll(".addPizzasBtn"),
  returnMain: document.querySelector(".returnMain"),
  cart_items: document.querySelector(".cart_items"),
  cartCountPizzas: document.querySelector(".countPizzas"),
  cartTotalPrice: document.querySelector(".totalPrice"),
  trashText: document.querySelector(".trash_text"),
  emptyPage: document.querySelector(".emptyPage"),
  returnMainInEmpty: document.querySelector(".returnMainInEmpty"),
};

function displayPizzasCart() {
  const infoPizzas = getPizzasInfoCookie();

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
              pizza: pizza.name,
              id: typePizza.id,
              name: typePizza.name,
              price: typePizza.price,
              count,
              image: pizza.image,
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
        <button class="remove" onclick='removeTypePizzas("${elem.id}")'>
            <img src="./image/icon/remove.png" alt="remove" />
        </button>
    </div>
  </div>
    `);
  }

  DOMElementsCart.cart_items.innerHTML = items.join("");
}

function calcPizzaInCart(id, operator) {
  let pizzasCookie = getPizzasInfoCookie();

  let editCookie = "";

  for (const key in pizzasCookie.objPizzas) {
    if (key === id) {
      if (operator === "+") {
        pizzasCookie.objPizzas[key] += 1;
      }
      if (operator === "-") {
        pizzasCookie.objPizzas[key] -= 1;
      }
    }
  }

  for (const key in pizzasCookie.objPizzas) {
    for (let i = 0; i < pizzasCookie.objPizzas[key]; i++) {
      editCookie += `${key},`;
    }
  }
  document.cookie = `pizza=1000,${editCookie}; max=age=1000000`;

  displayPizzasCart();
}

DOMElementsCart.returnMain.addEventListener("click", function () {
  DOMElements.main.classList.remove("none");
  DOMElements.cartBtn.classList.remove("none");
  DOMElements.carts.classList.add("none");
});

displayPizzasCart();

DOMElementsCart.trashText.addEventListener("click", function () {
  document.cookie = "pizza=;max-age=-1";

  DOMElements.carts.classList.add("none");
  DOMElementsCart.emptyPage.classList.remove("none");
});

DOMElementsCart.returnMainInEmpty.addEventListener("click", function () {
  DOMElementsCart.emptyPage.classList.add("none");
  DOMElements.main.classList.remove("none");
  DOMElements.cartBtn.classList.remove("none");
  location.reload();
});

function removeTypePizzas(idPizza) {
  let pizzasCookie = getPizzasInfoCookie();

  let editCookie = "";

  delete pizzasCookie.objPizzas[idPizza];

  for (const key in pizzasCookie.objPizzas) {
    for (let i = 0; i < pizzasCookie.objPizzas[key]; i++) {
      editCookie += `${key},`;
    }
  }

  document.cookie = `pizza=1000,${editCookie}; max=age=1000000`;

  displayPizzasCart();
}
