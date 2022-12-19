window.addEventListener("DOMContentLoaded", getData);

const endpoint = "http://www.ali-merkouk.dk/blog/wp-json/wp/v2/item?per_page=100&_embed";

const urlParams = new URLSearchParams(window.location.search);

console.log("URLSearchParams " + window.location);
const the_item_id = urlParams.get("item_id"); 
console.log(the_item_id);

function getData() {
 
  if (the_item_id) {
    console.log("++the_item_id");
    fetch(
      "http://www.ali-merkouk.dk/blog/wp-json/wp/v2/item/" +
        the_item_id +
        "?_embed"
    )
      .then((res) => res.json())
      .then(showitem); 
  } else {

    fetch(endpoint)
      .then((res) => res.json())
      .then(handleData);
  }
}

function handleData(posts) {
  console.log("what", posts);
  posts.forEach(showitem); 
}

function showitem(item) {
  console.log(item);

  const template = document.querySelector("template").content;
  const copy = template.cloneNode(true);
  


  copy.querySelector(".model").textContent = item.title.rendered;
//   copy.querySelector(".price").textContent = item.description; 
//   copy.querySelector(".toPrice").textContent = item.materials_;

     copy.querySelector(".colour").textContent = item.colour;
    
    
    

     copy.querySelector(".item-description").textContent = item.description;
  

  copy.querySelector(".inStock").textContent = item.in_stock_;

  copy.querySelector(".img-item").src =
    item._embedded["wp:featuredmedia"][0].media_details.sizes.full.source_url;
  copy.querySelector(".img-item").alt = item.colour;

  if (item.price_to == false) {
    copy.querySelector(".twoPrices").classList.add("hide");

    

  

  }

  const colorArray = [];



  colorArray.forEach((color) => {
    const col = document.createElement("div");
    col.classList.add("colourDiv");
    col.style.background = color;
    copy.querySelector(".colour").appendChild(col);
  });

  if (item.colours == false) {
    copy.querySelector(".colour").textContent = "N/A";
  }

  const a = copy.querySelector("a");
  if (a) {
    a.href += item.id;
  }


  document.querySelector("main").appendChild(copy);
}







const wait = (delay = 0) =>
  new Promise(resolve => setTimeout(resolve, delay));

const setVisible = (elementOrSelector, visible) => 
  (typeof elementOrSelector === 'string'
    ? document.querySelector(elementOrSelector)
    : elementOrSelector
  ).style.display = visible ? 'block' : 'none';

setVisible('.page', false);
setVisible('#loading1', true);

document.addEventListener('DOMContentLoaded', () =>
  wait(1800).then(() => {
    setVisible('.page', true);
    setVisible('#loading1', false);
  }));

  