const email = document.querySelector("#email");
const contrasenia = document.querySelector("#password");
const formulario = document.querySelector("#formulario");

async function fetchAll() {
  return await fetch("http://localhost:3000/usuarios").then((respuesta) =>
    respuesta.json()
  );
}

fetchAll().then((data) => {
  const emailjson = data[0].usuario;
  const pass = data[0].contrasenia;

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault(); // Evita que el formulario se envíe automáticamente

    var emailvalue = email.value;
    var contraseniavalue = contrasenia.value;

    if (emailvalue == "" || contraseniavalue == "") {
      alert("Debes completar todos los campos");
    } else if (emailvalue !== emailjson) {
      alert("Usuario no registrado o incorrecto");
      email.focus();
    } else if (contraseniavalue != pass) {
      alert("Contraseña incorrecta");
      contrasenia.focus();
    } else {
      alert("Inicio de sesión exitoso!");
      window.location.href = "../productos.html";
    }
  });
});
