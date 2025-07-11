const api = axios.create({
    baseURL: 'https://686fa5f091e85fac42a1f019.mockapi.io',
});

let list = document.querySelector(".product_list");
let url = document.querySelector(".url")
let title = document.querySelector(".title")
let desc = document.querySelector(".desc")
let price = document.querySelector(".price")
let create_btn = document.querySelector(".create_btn")

function showProduct(products) {
    list.innerHTML = ""
    products.forEach(e => {
        list.insertAdjacentHTML("beforeend", `
        <li class="product_item">
            <p class="id">${e.id}</p>
            <img class="img" src=${e.image} alt="">
            <h3 class="title">${e.title}</h3>
            <p class="desc">${e.desc}</p>
            <p class="price">$ ${e.price}</p>
              <div class="rating">
                <input value="5" name="rate-${e.id}" id="star5-${e.id}" type="radio">
                <label title="text" for="star5-${e.id}"></label>
                <input value="4" name="rate-${e.id}" id="star4-${e.id}" type="radio">
                <label title="text" for="star4-${e.id}"></label>
                <input value="3" name="rate-${e.id}" id="star3-${e.id}" type="radio" checked="">
                <label title="text" for="star3-${e.id}"></label>
                <input value="2" name="rate-${e.id}" id="star2-${e.id}" type="radio">
                <label title="text" for="star2-${e.id}"></label>
                <input value="1" name="rate-${e.id}" id="star1-${e.id}" type="radio">
                <label title="text" for="star1-${e.id}"></label>
            </div>
            <button class="btn">Single</button>
        </li>`)
    });
}

async function getProduct() {
    let { data } = await api("/products")

    showProduct(data)
}

getProduct()

async function createProduct(dataProduct) {
    let { data } = await api.post("/products ", dataProduct)

    alert(`Товар ${data.title} успешно добавлено!`)

    getProduct()
}

create_btn.addEventListener("click", (e) => {
    let obj = {
        image: url.value,
        title: title.value,
        desc: desc.value,
        price: price.value,
    }

    createProduct(obj)
})

list.addEventListener("click", (e) => {
    let cur = e.target;

    if (cur.textContent == "Single") {
        let card = cur.closest(".product_item")
        let id = card.firstElementChild.textContent

        localStorage.setItem("active", id);

        window.location.href = "single.html";
    }
})