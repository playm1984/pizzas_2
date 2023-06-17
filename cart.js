const DOMElementsCart = {
  addPizzasBtn: document.querySelectorAll(".addPizzasBtn"),
  totalPrizzaMain: document.querySelector(".totalPrizzaMain"),
  totalCountMain: document.querySelector(".totalCountMain"),
};

let countPizza = 0;

window.addEventListener("DOMContentLoaded", function () {
  let cookies = document.cookie.split("; ");

  let totalPrice = 0;
  let totalCount = 0;
  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].split("=")[0] === "pizza") {
      let cookiePizzasArray = cookies[i].split("=")[1].split(",");
      totalCount = cookiePizzasArray.length;
      for (let i = 0; i < cookiePizzasArray.length; i++) {
        const pizza = cookiePizzasArray[i].split("/");
        totalPrice += +pizza[2];
      }
    }
  }
  DOMElementsCart.totalPrizzaMain.innerHTML = totalPrice;
  DOMElementsCart.totalCountMain.innerHTML = totalCount;
});

function addPizzasCart(name, type, price) {
  DOMElementsCart.totalPrizzaMain.innerHTML =
    +DOMElementsCart.totalPrizzaMain.innerHTML + +price;

  countPizza += 1;
  DOMElementsCart.totalCountMain.innerHTML = countPizza;

  let cookiePizza = `${name}/${type}/${price}`;
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
