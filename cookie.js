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

  let objPizzas = {};

  for (let i = 0; i < arrayPizzas.length; i++) {
    const elem = arrayPizzas[i];

    let key = elem.split("/")[3];

    if (objPizzas[key] !== undefined) {
      objPizzas[key] += 1;
    } else {
      objPizzas[key] = 1;
    }
  }

  return {
    totalPrice,
    totalCount,
    objPizzas,
  };
}

function addPizzasCookie(pizzaId) {
  let item = "";

  let id = pizzaId.split("_")[0];
  let subId = pizzaId.split("_")[1];
  for (let i = 0; i < pizzas.length; i++) {
    if (id === pizzas[i].id) {
      for (let k = 0; k < pizzas[i].type.length; k++) {
        const typeObj = pizzas[i].type[k];
        const typeId = pizzas[i].type[k].id.split("_")[1];
        if (typeId === subId) {
          item = `${pizzas[i].name}/${typeObj.name}/${typeObj.price}/${typeObj.id}`;
        }
      }
    }
  }

  let cookies = document.cookie.split("; ");

  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].split("=")[0] === "pizza") {
      let cookie = `pizza=${cookies[i].split("=")[1]},${item}`;
      document.cookie = cookie;
    }
  }
}
