const DOMElements = {
  pizzasCard: document.querySelector(".pizzasCard"),
  filterBtns: document.querySelectorAll(".filterBtn"),
  sortSelect: document.querySelector(".sortSelect"),
};

let tempFiltredPizzas = pizzas;

function displayPizzas(pizzasItem) {
  let items = [];

  for (let i = 0; i < pizzasItem.length; i++) {
    let typeActiveID = pizzasItem[i].type
      .map((el) => el.isActive)
      .indexOf(true);
    items.push(
      `<div class="card">
        <img src="${pizzasItem[i].image}" alt="" />
        <p>${pizzasItem[i].name}</p>
        <div class="choice_wrapper">
          <div class="type">
            ${pizzasItem[i].type
              .map((el) => {
                return `
                    <button 
                    ${el.isVisble ? "" : "disabled"}
                    class="
                    ${el.isVisble === true ? "" : "notVisible"} ${
                  el.isActive === true ? "activeType" : "notActiveType"
                }" 
                onclick='chageTypePizza("${el.name}", "${pizzasItem[i].id}")'
                    >${el.name}</button>
                `;
              })
              .join("")}
          </div>
        </div>
        <div class="price_buy">
          <p>от <span>${pizzasItem[i].type[typeActiveID].price}</span> KZT</p>
          <button class='addPizzasBtn' onclick='addPizzasCart("${
            pizzasItem[i].name
          }", "${
        pizzasItem[i].type.filter((el) => el.isActive === true)[0].name
      }", "${
        pizzasItem[i].type.filter((el) => el.isActive === true)[0].price
      }")'>+ Добавить</button>
        </div>
      </div>`
    );
  }

  return items;
}

const pizzasItem = displayPizzas(pizzas);

DOMElements.pizzasCard.innerHTML = pizzasItem.join("");

for (let i = 0; i < DOMElements.filterBtns.length; i++) {
  const element = DOMElements.filterBtns[i];

  element.addEventListener("click", function () {
    DOMElements.filterBtns.forEach(function (el) {
      el.classList.remove("active");
      element.classList.add("active");
    });

    const filtredPizzas = pizzas.filter((el) => {
      if (element.innerHTML === "Все") {
        return el;
      } else {
        return el.filter === element.innerHTML;
      }
    });

    tempFiltredPizzas = filtredPizzas;

    const pizzasItem = displayPizzas(filtredPizzas);

    DOMElements.pizzasCard.innerHTML = pizzasItem.join("");
  });
}

DOMElements.sortSelect.addEventListener("change", function (event) {
  const sorted = event.target.value;

  const tempPizzas = tempFiltredPizzas.map(function (el) {
    let currentPrice = el.type.filter(function (t) {
      if (t.isActive) {
        return t.price;
      }
    });
    return { ...el, price: currentPrice[0].price };
  });

  const sortedPizzas = tempPizzas.sort((a, b) => {
    return a[sorted] > b[sorted] ? 1 : -1;
  });

  const pizzasItem = displayPizzas(sortedPizzas);

  DOMElements.pizzasCard.innerHTML = pizzasItem.join("");
});

function chageTypePizza(type, id) {
  const changeTypePizzas = tempFiltredPizzas.map(function (el) {
    if (el.id === id) {
      return {
        ...el,
        type: el.type.map(function (elem) {
          if (elem.name === type) {
            return { ...elem, isActive: true };
          } else {
            return { ...elem, isActive: false };
          }
        }),
      };
    } else {
      return el;
    }
  });

  tempFiltredPizzas = changeTypePizzas;

  const pizzasItem = displayPizzas(changeTypePizzas);

  DOMElements.pizzasCard.innerHTML = pizzasItem.join("");
}
