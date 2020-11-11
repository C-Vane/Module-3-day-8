window.onload = async () => {
  const url = " https://striveschool-api.herokuapp.com/api/product/";
  let current_event = document.getElementById("products");
  let response = {};

  try {
    response = await fetch(url, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmFiYzViNzRiY2RlMTAwMTc2MTZhODkiLCJpYXQiOjE2MDUxMDIzMjAsImV4cCI6MTYwNjMxMTkyMH0.h3FKiwW98JXPE0Ot2gKvKuBP0LN-YSOF0SfMLPbZQU0",
      },
    });
    let events = await response.json();
    console.log(events);
    if (events.length > 0) {
      events.forEach((event) => {
        let card = document.createElement("div");
        card.classList.add("col-3", "mb-4");
        card.innerHTML = `
        <div class="card h-100">
            <img src="${event.imageUrl}" class="card-img" alt="${event.name}">    
            <div class="card-body">
                <h5 class="card-title">${event.name}</h5>
                <p class="card-text">${event.description}</p>
                <p class="card-text"><small class="text-muted">${event.brand}</small></p>
                <h3>Price: €${event.price}</h3>
                <button onclick="addToCart(event)" class="btn btn-outline-primary"> <i
                        class="fa fa-cart-plus" aria-hidden="true"></i>Add to cart</button>
            </div>
            
      </div>
      
              `;
        current_event.appendChild(card);
      });
    }
  } catch (err) {
    console.log(err);
  }
};
let sum = 0;
const addToCart = (event) => {
  const book = event.target.parentNode.parentNode.parentNode;
  const title = book.querySelector(".card-title").innerText;
  const price = book.querySelector("h3").innerText.split(" ");
  book.classList.add("selected");
  const destination = document.querySelector(".dropdown-menu");
  sum = sum + Number(price[1].split("€")[1]);
  const total = destination.querySelectorAll("div div h4")[1];
  total.innerText = sum.toFixed(2);
  let cart_item = document.createElement("div");
  cart_item.classList.add("dropdown-item", "d-flex", "justify-content-between", "text-left");
  cart_item.innerHTML = `
    <p class="mr-5 text-left"><i class="fa fa-book-open" aria-hidden="true"></i> ${title}</p>
    <div> <span>${price[1]}</span> <button class="btn cancel-btn" onclick="cancelOrder(event)">x</button></div>`;
  destination.insertBefore(cart_item, destination.firstChild);
};
const cancelOrder = (event) => {
  let card = event.target.parentNode.parentNode;
  let price = card.querySelectorAll("span")[0].innerText.split("€");
  sum = sum - Number(price[1]);
  const total = document.querySelector(".dropdown-menu").querySelectorAll("div div h4")[1];
  total.innerText = sum.toFixed(2);
  card.remove();
};
const removeAll = () => {
  document.querySelectorAll(".dropdown-item .cancel-btn").forEach((el) => el.click());
  document.querySelectorAll(".selected").forEach((el) => el.classList.remove("selected"));
};
