const varios = document.querySelector("#varios__contenido");
const starWar = document.querySelector("#starWar__contenido");
const consolas = document.querySelector("#consolas__contenido");

const articulo_linea = (id, imagen, nombre, precio) => {
  const elemento = document.createElement("article");
  console.log(id);
  const contenido = `
            <a href="producto.html?id=${id}"><img
              src=${imagen}
              alt=""
              class="main__linea_card-img"
              
            /><a>
            <p class="main__linea_card_nombre">${nombre}</p>
            <p class="main__linea_card_precio">$ ${precio}</p>
            <a href="" class="main__linea_card_mas">Ver producto</a>
          `;
  elemento.classList.add("main__linea__card");
  elemento.innerHTML = contenido;
  return elemento;
};

async function fetchAll(linea) {
  return await fetch(`http://localhost:3000/${linea}`).then((respuesta) =>
    respuesta.json()
  );
}

fetchAll("StarWars").then((data) => {
  data.map((elemento) => {
    starWar.appendChild(
      articulo_linea(
        elemento.id,
        elemento.imagen,
        elemento.nombre,
        elemento.precio
      )
    );
  });
});
fetchAll("varios").then((data) => {
  data.map((elemento) => {
    varios.appendChild(
      articulo_linea(
        elemento.id,
        elemento.imagen,
        elemento.nombre,
        elemento.precio
      )
    );
  });
});
fetchAll("consolas").then((data) => {
  data.map((elemento) => {
    consolas.appendChild(
      articulo_linea(
        elemento.id,
        elemento.imagen,
        elemento.nombre,
        elemento.precio
      )
    );
  });
});
