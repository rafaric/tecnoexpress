const parametro = new URLSearchParams(window.location.search);
const id = parametro.get("id");
const datos = document.querySelector("#producto");
const detalle = (id, imagen, nombre, precio, descripcion) => {
  const div = document.createElement("div");
  const contenido = `<section class="cover">
          <img class="cover__imagen" src=${imagen} alt="">
        </section>
        <section class="datos" id="datos"><article><h2>${nombre}</h2><p>Precio: $ ${precio}</p><p>${descripcion}</p></article></section>`;
  div.classList.add("producto");
  div.innerHTML = contenido;
  return div;
};

const urls = [
  "http://localhost:3000/StarWars",
  "http://localhost:3000/Consolas",
  "http://localhost:3000/Varios",
];

urls.forEach((url) => {
  async function fetchAll() {
    return await fetch(url).then((respuesta) => respuesta.json());
  }

  fetchAll().then((data) => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].id == id) {
        datos.appendChild(
          detalle(
            data[i].id,
            data[i].imagen,
            data[i].nombre,
            data[i].precio,
            data[i].descripcion
          )
        );
      }
    }
  });
});
