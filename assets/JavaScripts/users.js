const api = axios.create({
  baseURL: 'https://686fa5f091e85fac42a1f019.mockapi.io',
});

const box = document.querySelector(".prods");
const headerColors = ['header-blue', 'header-pink', 'header-green', 'header-orange', 'header-purple'];

function showData(users) {
  box.innerHTML = "";
  
  users.forEach((user) => {
    const randomColor = headerColors[Math.floor(Math.random() * headerColors.length)];
    
    box.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card">
        <div class="card-header ${randomColor}"></div>
        <img class="avatar" src="${user.avatar}" alt="${user.name}" />
        <div class="card-body">
          <div class="name">${user.name}</div>
          <div class="email">${user.email}</div>
          <button class="follow-btn">Follow</button>
        </div>
      </div>
      `
    );
  });
}

async function getData() {
  try {
    const { data } = await api.get("/users"); // Change to your endpoint if different
    showData(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    box.innerHTML = "<p>Error loading profiles. Check console for details.</p>";
    console.log("Tried to fetch from:", api.defaults.baseURL + "/users");
  }
}

getData();