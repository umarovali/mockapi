const api = axios.create({
    baseURL: 'https://686fa5f091e85fac42a1f019.mockapi.io',
});

let id = localStorage.getItem("active");
let card = document.querySelector(".single_card");

async function getSingle() {
    let { data } = await api(`/products/${id}`);

    card.insertAdjacentHTML("beforeend", `
        <div class="card">
            <img src="${data.image}" alt="${data.title}" />
            <div class="info">
                <h1>${data.title}</h1>
                <p class="desc">${data.desc}</p>
                <p class="price">$${data.price}</p>
            </div>
        </div>`)
}

getSingle();