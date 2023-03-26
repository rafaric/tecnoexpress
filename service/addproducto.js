const formulario = document.querySelector("#formulario");

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();
  const imagen = document.querySelector("#imagen").value;
  const categoria = document.querySelector("#categoria").value;
  const nombre = document.querySelector("#nombre").value;
  const precio = document.querySelector("#precio").value;
  const descripcion = document.querySelector("#descripcion").value;

  console.log(imagen);
  crearProducto(imagen, categoria, nombre, precio, descripcion).then(
    (respuesta) => alert("producto ingresado correctamente")
  );
});

const crearProducto = (imagen, categoria, nombre, precio, descripcion) => {
  return fetch(`http://localhost:3000/${categoria}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: uuid.v4(),
      imagen,
      nombre,
      precio,
      descripcion,
    }),
  });
};
