// INICIALIZACION
const usuarios = [
  {
    username: "Ignacio",
    password: "123456",
    type: "Admin",
  },
  {
    username: "Macca",
    password: "654321",
    type: "Admin",
  },
  {
    username: "Tomas",
    password: "LosChanchines",
    type: "user",
  },
];
serializedUsers = JSON.stringify(usuarios);
localStorage.setItem("Usuarios", serializedUsers);

// ESTETICA
const signinBtn = document.querySelector(".signinBtn");
const signupBtn = document.querySelector(".signupBtn");
const formBx = document.querySelector(".formBx");
const body = document.querySelector("body");

signupBtn.onclick = function () {
  formBx.classList.add("active");
  body.classList.add("active");
};
signinBtn.onclick = function () {
  formBx.classList.remove("active");
  body.classList.remove("active");
};

// LogIn
const logInBtn = document.querySelector("#logInBtn");

logInBtn.addEventListener("click", function () {
  const username = document.querySelector("#username").value;
  const password = document.querySelector("#password").value;
  let userVal = false;

  if (username == "" || password == "") {
    alert("Complete todos los campos.");
  } else {
    usuarios.find((user) => {
      if (user.username == username && user.password == password) {
        alert("Bienvenido/a" + user.username);
        localStorage.setItem("User", JSON.stringify(user));
        userVal = true;
        location.replace("../main/main.html");
      }
    });
    if (!userVal) {
      alert("Contraseña y/o Usuario incorrectos.");
    }
  }
});
