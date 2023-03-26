const todos = document.querySelector("#todos");
const urls = [
  "http://localhost:3000/StarWars",
  "http://localhost:3000/Consolas",
  "http://localhost:3000/Varios",
];

const articulo_linea = (id, imagen, nombre, precio) => {
  const elemento = document.createElement("div");
  // console.log(id);

  const contenido = `
            <img
            src="${imagen}"
            alt=""
            class="main__productos_card_imagen"
          />
          <div class="main__prductos_card_imagen-botones" id="botones">
            <a href="" class="elimina" data-id="${id}"><svg
              width="14"
              height="18"
              viewBox="0 0 14 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM14 1H10.5L9.5 0H4.5L3.5 1H0V3H14V1Z"
                fill="white"
              />
            </svg></a>
            <a href="../editarProducto.html?id=${id}"
              ><svg
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 15.25V19H3.75L14.81 7.94L11.06 4.19L0 15.25ZM17.71 5.04C18.1 4.65 18.1 4.02 17.71 3.63L15.37 1.29C14.98 0.900001 14.35 0.900001 13.96 1.29L12.13 3.12L15.88 6.87L17.71 5.04Z"
                  fill="white"
                />
              </svg>
            </a>
          </div>
          <p class="main__productos_card-nombre">${nombre}</p>
          <p class="main__productos_card-precio">$ ${precio}</p>
          <p class="main__productos_card-descripcion">${id}</p>
          `;
  elemento.classList.add("main__productos_card");
  elemento.innerHTML = contenido;

  return elemento;
};
window.addEventListener("load", function () {
  const a = document.querySelectorAll(".elimina");
  console.log(a.length);
  a.forEach((button) => {
    const id = button.getAttribute("data-id");
    button.addEventListener("click", (e) => {
      e.preventDefault();
      eliminarProducto(id);
    });
  });
});
async function fetchAll(linea) {
  return await fetch(`http://localhost:3000/${linea}`).then((respuesta) =>
    respuesta.json()
  );
}

function eliminarProducto(id) {
  console.log(id);
  urls.forEach((elemento) => {
    console.log("eliminado");
    fetch(`${elemento}/${id}`, {
      method: "DELETE",
    });
  });
}

fetchAll("StarWars").then((data) => {
  data.map((elemento) => {
    todos.appendChild(
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
    todos.appendChild(
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
    todos.appendChild(
      articulo_linea(
        elemento.id,
        elemento.imagen,
        elemento.nombre,
        elemento.precio
      )
    );
  });
});

/* a[0].addEventListener("click", () => {
  console.log("hola");
}); */
