function getPizzasInfoCookie() {
  let cookies = document.cookie.split("; ");

  let totalPrice = 0;
  let totalCount = 0;
  let arrayPizzas = [];

  for (let i = 0; i < cookies.length; i++) {
    if (cookies[i].split("=")[0] === "pizza") {
      let cookiePizzasArray = cookies[i].split("=")[1].split(",").slice(1, -1);

      arrayPizzas = cookiePizzasArray;
      totalCount = cookiePizzasArray.length;

      for (let k = 0; k < arrayPizzas.length; k++) {
        let pizzaId = arrayPizzas[k].split("_")[0];

        for (let j = 0; j < pizzas.length; j++) {
          if (pizzaId === pizzas[j].id) {
            let pizza = pizzas[j];

            for (let m = 0; m < pizza.type.length; m++) {
              const typePizza = pizza.type[m];

              if (typePizza.id === arrayPizzas[k]) {
                totalPrice += typePizza.price;
              }
            }
          }
        }
      }
    }
  }

  let objPizzas = {};

  for (let i = 0; i < arrayPizzas.length; i++) {
    const key = arrayPizzas[i];

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
