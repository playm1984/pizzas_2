const DOMElements = {
  pizzasCard: document.querySelector(".pizzasCard"),
};

function displayPizzas() {
  let items = [];

  for (let i = 0; i < pizzas.length; i++) {
    let typeActiveID = pizzas[i].type.map((el) => el.isActive).indexOf(true);
    items.push(
      `<div class="card">
        <img src="${pizzas[i].image}" alt="" />
        <p>${pizzas[i].name}</p>
        <div class="choice_wrapper">
          <div class="type">
            ${pizzas[i].type
              .map((el) => {
                return `
                    <button 
                    ${el.isVisble ? "" : "disabled"}
                    class="
                    ${el.isVisble === true ? "" : "notVisible"} ${
                  el.isActive === true ? "activeType" : "notActiveType"
                }" 
                    >${el.name}</button>
                `;
              })
              .join("")}
          </div>
        </div>
        <div class="price_buy">
          <p>от <span>${pizzas[i].type[typeActiveID].price}</span> KZT</p>
          <button>+ Добавить</button>
        </div>
      </div>`
    );
  }

  return items;
}

const pizzasItem = displayPizzas();

DOMElements.pizzasCard.innerHTML = pizzasItem.join("");
