const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id"); //ID del objeto que queremos buscar
console.log(id);
var servidor;
const urls = [
  "http://localhost:3000/StarWars",
  "http://localhost:3000/Consolas",
  "http://localhost:3000/Varios",
];

const promesas = urls.map(async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  const objetoEncontrado = data.find((objeto) => objeto.id == id);
  if (objetoEncontrado) {
    return {
      datos: {
        id: objetoEncontrado.id,
        imagen: objetoEncontrado.imagen,
        nombre: objetoEncontrado.nombre,
        precio: objetoEncontrado.precio,
        descripcion: objetoEncontrado.descripcion,
      },
      servidor: url,
    };
  }
});

Promise.all(promesas)
  .then((resultados) => {
    const objetoEncontrado = resultados.find(
      (resultado) => resultado !== undefined
    );
    if (objetoEncontrado) {
      console.log(
        "El objeto fue encontrado en el servidor:",
        objetoEncontrado.servidor
      );
      servidor = objetoEncontrado.servidor;
      document.getElementById("nombre").value = objetoEncontrado.datos.nombre;
      console.log(objetoEncontrado.servidor);
      if (objetoEncontrado.servidor === "http://localhost:3000/StarWars") {
        document.getElementById("categoria").value = "StarWars";
      } else if (
        objetoEncontrado.servidor === "http://localhost:3000/Consolas"
      ) {
        document.getElementById("categoria").value = "consolas";
      } else {
        document.getElementById("categoria").value = "varios";
      }

      document.getElementById("imagen").value = objetoEncontrado.datos.imagen;
      document.getElementById("precio").value = objetoEncontrado.datos.precio;
      document.getElementById("descripcion").value =
        objetoEncontrado.datos.descripcion;
    } else {
      console.log("El objeto no fue encontrado en ninguno de los servidores.");
    }
  })
  .catch((error) => {
    console.error("Error al buscar el objeto:", error);
  });

document
  .querySelector("#formulario")
  .addEventListener("submit", function (evento) {
    evento.preventDefault();
    const nombre = document.getElementById("nombre").value;
    const imagen = document.getElementById("imagen").value;
    const categoria = document.getElementById("categoria").value;
    const precio = document.getElementById("precio").value;
    const descripcion = document.getElementById("descripcion").value;
    console.log(nombre, imagen, categoria, precio, descripcion);
    editarProducto(id, imagen, categoria, nombre, precio, descripcion).then(
      (respuesta) => alert("producto editado correctamente")
    );
  });

const editarProducto = (id, imagen, categoria, nombre, precio, descripcion) => {
  return fetch(`${servidor}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      imagen,
      nombre,
      categoria,
      precio,
      descripcion,
    }),
  });
};
