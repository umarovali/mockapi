const api = axios.create({
  baseURL: "https://686fa5f091e85fac42a1f019.mockapi.io",
})

let photo = document.querySelector(".inputPhoto");
let name = document.querySelector(".inputName");
let mail = document.querySelector(".inputMail");
let password = document.querySelector(".inputPassword");
let password2 = document.querySelector(".inputPassword2");

let btn = document.querySelector(".btn");

let arrData = []

// get data from backend
async function getData() {
  let { data } = await api.get("/users");
  arrData.push(...data);
}
getData()

// create users data from login page
async function create_data_login_page(user_data) {
  let { data } = await api.post("/users", user_data);
  console.log(data);
  
}


// btn datasi uchun data_btn obyekt ochildi
let data_btn = {};

// btn orqali ma'lumotlarni olish
btn.addEventListener("click", (e) => {

  data_btn = {
    photo: photo.value,
    name: name.value,
    mail: mail.value,
    password: password.value,
    password2: password2.value,
  }

  arrData.map((el) => {
    if (el.name === data_btn.name) {
      alert("Bunaqa ismli foydalanuvchi mavjud!")
    } else if (password.value !== password2.value) {
      alert("Parol tasdiqlanmadi!")
    } else if(!(mail.value).endsWith("@gmail.com")){
      alert("Email notugri kiritildi!")
    }else{
      create_data_login_page(data_btn);
    }
    }
  )
})
