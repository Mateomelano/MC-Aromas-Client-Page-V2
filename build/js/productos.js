// FUNCION WHATSAPP
function abrirWhatsApp() {
  const telefono = "5493534595325"; // sin espacios ni signos
  const mensaje = encodeURIComponent(
    "¡Hola! Quisiera más info sobre los productos."
  );

  const urlMobile = `https://wa.me/${telefono}?text=${mensaje}`;
  const urlWeb = `https://web.whatsapp.com/send?phone=${telefono}&text=${mensaje}`;

  const isMobile = /iPhone|Android|iPad|Mobile/i.test(navigator.userAgent);

  window.open(isMobile ? urlMobile : urlWeb, "_blank");
}

// FUNCION MOVER LOGO
function moverLogo() {
  const logo = document.querySelector(".logo-central");
  const navRight = document.querySelector(".nav-right");
  const navCenter = document.querySelector(".nav-center");

  if (window.innerWidth <= 980) {
    if (!navRight.contains(logo)) {
      navRight.appendChild(logo);
    }
  } else {
    if (!navCenter.contains(logo)) {
      navCenter.appendChild(logo);
    }
  }
}

window.addEventListener("load", moverLogo);
window.addEventListener("resize", moverLogo);

// SIDEBAR

document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".submenu-toggle");

  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const submenu = toggle.nextElementSibling;
      const arrow = toggle.querySelector(".arrow-icon");

      submenu.classList.toggle("show");
      arrow.classList.toggle("rotate");
    });
  });

  // Sidebar open/close (por si usás un ícono de abrir)
  const sidebar = document.getElementById("sidebar");
  const openBtn = document.getElementById("sidebar-icon");
  const closeBtn = document.getElementById("close-sidebar");

  openBtn?.addEventListener("click", () => {
    sidebar.style.transform = "translateX(0)";
  });

  closeBtn?.addEventListener("click", () => {
    sidebar.style.transform = "translateX(-100%)";
  });

  sidebar.style.transform = "translateX(-100%)"; // oculta al iniciar
});

// FUNCIÓN PARA MOSTRAR PRODUCTOS
function mostrarProductos(productos) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  // Si no hay productos, mostramos mensaje
  if (productos.length === 0) {
    contenedor.innerHTML = `
        <div class="no-productos" style="text-align:center; padding:2rem; color:#555;">
          <p>No se encontraron productos.</p>
        </div>
      `;
    return;
  }

  productos.forEach((producto) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img class="card-image" src="${producto.imagen}" alt="${producto.nombre}" onclick="mostrarImagen('${producto.imagen}', '${producto.nombre}')">
      <div class="card-content">
        <h3 class="producto-id" style="display: none;">${producto.id}</h3>
        <h3 class="producto-nombre">${producto.nombre}</h3>
        <p class="producto-descripcion">${producto.descripcion}</p>
        <p class="producto-precio">$ ${parseFloat(
          producto.precio
        ).toLocaleString("es-AR", { minimumFractionDigits: 2 })}</p>
        <p class="precio-mayorista">Precio Mayorista: $ ${parseFloat(
          producto.preciomayorista
        ).toLocaleString("es-AR", { minimumFractionDigits: 2 })}</p>
      <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio}, '${producto.imagen}', ${producto.preciomayorista} , ${producto.id}  )">Agregar al carrito</button>

      </div>
    `; 
    contenedor.appendChild(card);
  });
}
function mostrarImagen(url, nombre) {
  Swal.fire({
    title: nombre,
    imageUrl: url,
    imageAlt: nombre,
    width: '70vh',
    height: 'auto',
    imageWidth: '100%', // ajusta a gusto
    imageHeight: '100%',
    background: '#fff',
    confirmButtonText: 'Cerrar'
  });
}


// FUNCIÓN PARA CARGAR PRODUCTOS CON FILTROS
// Variables globales para filtros
let filtrosActivos = {
  marca: "",
  categoria: "",
  busqueda: "",
};
// FUNCIÓN PARA CARGAR PRODUCTOS CON FILTROS
let paginaActual = 1; 
const limitePorPagina = 50; // o 50 si querés
function cargarProductos(pagina = 1) {
  const limite = 50; // Cantidad de productos por página
  const orden = document.getElementById("filtro-select")?.value || "";

  const url = `src/php/get_productos.php?orden=${orden}&busqueda=${encodeURIComponent(
    filtrosActivos.busqueda
  )}&marca=${encodeURIComponent(
    filtrosActivos.marca
  )}&categoria=${encodeURIComponent(
    filtrosActivos.categoria
  )}&pagina=${pagina}&limite=${limite}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      mostrarProductos(data.productos); // Asumo que data trae {productos: [], total: X}
      mostrarFiltrosAplicados({
        marca: filtrosActivos.marca,
        categoria: filtrosActivos.categoria,
        busqueda: filtrosActivos.busqueda,
      });
      dibujarPaginador(data.total, pagina, limite); // <<< NUEVO
    })
}

// ACTUALIZAR LA BÚSQUEDA DESDE INPUTS
function actualizarBusquedaYRecargar() {
  document.querySelectorAll(".busqueda").forEach((input) => {
    if (input.value.trim() !== "") {
      filtrosActivos.busqueda = input.value.trim();
      filtrosActivos.marca = ""; // <<< LIMPIAMOS FILTROS
      filtrosActivos.categoria = ""; // <<< LIMPIAMOS FILTROS
    }
  });

  cargarProductos();
}

// MOSTRAR FILTROS ACTIVOS
function mostrarFiltrosAplicados({ marca, categoria, busqueda }) {
  const contenedor = document.getElementById("filtros-aplicados");
  let texto = "";

  // Si hay marca o categoría, empezamos el texto
  if (marca || categoria) {
    texto = "Mostrando:";
    if (marca) texto += ` ${capitalizar(marca)}`;
    if (categoria) texto += ` - ${capitalizar(categoria)}`;
  }

  // Si también hay búsqueda, la agregamos al final
  if (busqueda) {
    // Si ya hay texto previo (marca o categoría), lo combinamos
    if (texto) {
      texto += ` - ${busqueda}`;
    } else {
      texto = `Resultados para: "${busqueda}"`;
    }
  }

  contenedor.textContent = texto;
}

// FUNCIONES AUXILIARES
function capitalizar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// RESETEAR FILTROS
function agregarResetListener() {
  const btnReset = document.getElementById("btn-reset-filtros");
  if (btnReset) {
    btnReset.addEventListener("click", () => {
      window.location.href = "productos.php";
    });
  }
}

// INICIALIZACIÓN
document.addEventListener("DOMContentLoaded", () => {
  //SUBIR ARRIBA BOTON
  // Suavemente hace scroll hasta arriba
  document
    .getElementById("btnSubirArriba")
    .addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  const urlParams = new URLSearchParams(window.location.search);

  // Guardar filtros iniciales desde la URL
  filtrosActivos.busqueda = urlParams.get("busqueda") || "";
  filtrosActivos.marca = urlParams.get("marca") || "";
  filtrosActivos.categoria = urlParams.get("categoria") || "";

  // Reflejar búsqueda en inputs
  if (filtrosActivos.busqueda) {
    document.querySelectorAll(".busqueda").forEach((input) => {
      input.value = filtrosActivos.busqueda;
    });
  }

  // Carga inicial
  cargarProductos();
  agregarResetListener();

  // Evento de cambio de orden
  const filtro = document.getElementById("filtro-select");
  if (filtro) {
    filtro.addEventListener("change", () => cargarProductos(1));
  }

  // Buscar con botón
  document.querySelectorAll(".btn-buscar").forEach((btn) => {
    btn.addEventListener("click", () => {
      actualizarBusquedaYRecargar();
    });
  });

  // Buscar con Enter
  document.querySelectorAll(".busqueda").forEach((input) => {
    input.addEventListener("keyup", function (e) {
      if (e.key === "Enter") {
        actualizarBusquedaYRecargar();
      }
    });
  });
});

//CARRITO
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


function agregarAlCarrito(nombre, precio, imagenUrl, preciomayorista, id) {
  const productoExistente = carrito.find((p) => p.nombre === nombre);
  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ id, nombre, precio: parseFloat(precio), imagenUrl, preciomayorista: parseFloat(preciomayorista) , cantidad: 1 });
  }
  actualizarCarrito();
  mostrarCarrito();
}

function actualizarCarrito() {
  let contenedor = document.getElementById("carritoContenido");
  contenedor.innerHTML = "";

  carrito.forEach((prod, index) => {
    let div = document.createElement("div");
    div.classList.add("carrito-producto");
    div.innerHTML = `
      <img src="${prod.imagenUrl}" alt="${prod.nombre}" class="carrito-img">
      <div class="carrito-producto-info">
        <div class="nombre">${prod.nombre}</div>
        <div class="precio"><strong>$${(prod.precio * prod.cantidad).toLocaleString("es-AR", { minimumFractionDigits: 2 })}</strong></div>
        <span class="etiqueta-mayorista">Mayorista:</span>
        <div class="preciomayorista"><strong>$${(prod.preciomayorista * prod.cantidad).toLocaleString("es-AR", { minimumFractionDigits: 2 })}</strong></div>
        <div class="cantidad-control">
          <button onclick="cambiarCantidad(${index}, -1)">−</button>
          <span>${prod.cantidad}</span>
          <button onclick="cambiarCantidad(${index}, 1)">+</button>
          <button class="eliminar" onclick="eliminarProducto(${index})"><i class="fa-regular fa-trash-can"></i></button>
        </div>
      </div>
    `;
    contenedor.appendChild(div);
  });

  const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
  const totalmayorista = carrito.reduce((sum, p) => sum + p.preciomayorista * p.cantidad, 0);
  document.getElementById("carritoTotal").innerText = `$${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;
  document.getElementById("carritoTotalMayorista").innerText = `$${totalmayorista.toLocaleString("es-AR", { minimumFractionDigits: 2 })}`;


  const totalCantidad = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
  const contador = document.getElementById("contadorCarrito");

  contador.textContent = totalCantidad;
  contador.style.display = totalCantidad > 0 ? "inline-block" : "none";

  localStorage.setItem("carrito", JSON.stringify(carrito));

}

function cambiarCantidad(index, delta) {
  carrito[index].cantidad += delta;
  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }
  actualizarCarrito();
}

function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function mostrarCarrito() {
  document.getElementById("carrito").classList.add("abierto");
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("cerrarCarrito").addEventListener("click", () => {
    document.getElementById("carrito").classList.remove("abierto");
  });

  const iconoCarrito = document.getElementById("iconoCarrito");
  if (iconoCarrito) {
    iconoCarrito.addEventListener("click", mostrarCarrito);
  }
  actualizarCarrito(); // ← Muy importante para que cargue lo guardado

});

//Whataspp Carrito Compra
function enviarPedidoWhatsApp() {
  const telefono = "5493534595325";
  if (carrito.length === 0) {
    Swal.fire({
      icon: 'info',
      title: 'Carrito vacío',
      text: 'El carrito está vacío.',
      confirmButtonText: 'Aceptar'
    })
    return;
  }

  let mensaje = "*🛒 Pedido desde la tienda online:*\n\n";

  carrito.forEach((prod) => {
    mensaje += `• *${prod.nombre}*\n`;
    mensaje += `  Cantidad: ${prod.cantidad}\n`;
    mensaje += `  Precio: $${(prod.precio * prod.cantidad).toLocaleString("es-AR", { minimumFractionDigits: 2 })}\n`;
    mensaje += `  Precio Mayorista: $${(prod.preciomayorista * prod.cantidad).toLocaleString("es-AR", { minimumFractionDigits: 2 })}\n\n`;
  });

  const total = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
  const totalMayorista = carrito.reduce((sum, p) => sum + p.preciomayorista * p.cantidad, 0);

  mensaje += `*💵 Total: $${total.toLocaleString("es-AR", { minimumFractionDigits: 2 })}*\n`;
  mensaje += `*📦 Total Mayorista: $${totalMayorista.toLocaleString("es-AR", { minimumFractionDigits: 2 })}*`;

    // 👉 ENVIAMOS A PHP
    fetch("src/php/guardar_ventas.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        productos: carrito,
        total,
        total_mayorista: totalMayorista
      })
    });


  const mensajeCodificado = encodeURIComponent(mensaje);
  const urlMobile = `https://wa.me/${telefono}?text=${mensajeCodificado}`;
  const urlWeb = `https://web.whatsapp.com/send?phone=${telefono}&text=${mensajeCodificado}`;

  const isMobile = /iPhone|Android|iPad|Mobile/i.test(navigator.userAgent);
  window.open(isMobile ? urlMobile : urlWeb, "_blank");

    // 🧹 Vaciar el carrito
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
  const botonCompra = document.querySelector(".btn-iniciar-compra");
  if (botonCompra) {
    botonCompra.addEventListener("click", enviarPedidoWhatsApp);
  }
});

// PAGINADOR


function dibujarPaginador(totalProductos, paginaActual, limite) {
  const contenedor = document.getElementById("paginador");
  contenedor.innerHTML = "";

  const totalPaginas = Math.ceil(totalProductos / limite);
  if (totalPaginas <= 1) return;

  const crearBoton = (numero) => {
    const btn = document.createElement("button");
    btn.textContent = numero;
    if (numero === paginaActual) {
      btn.disabled = true;
      btn.classList.add("activo");
      btn.style.fontWeight = "bold";
    }
    btn.onclick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      cargarProductos(numero);
    };
    return btn;
  };

  const agregarElipsis = () => {
    const span = document.createElement("span");
    span.textContent = "...";
    span.style.padding = "0 5px";
    contenedor.appendChild(span);
  };

  // Botón Anterior
  if (paginaActual > 1) {
    const btnAnterior = document.createElement("button");
    btnAnterior.textContent = "Anterior";
    btnAnterior.onclick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      cargarProductos(paginaActual - 1);
    };
    contenedor.appendChild(btnAnterior);
  }

  // Siempre mostrar la primera página
  contenedor.appendChild(crearBoton(1));

  if (paginaActual > 4) agregarElipsis();

  // Mostrar páginas cercanas a la actual
  for (let i = paginaActual - 2; i <= paginaActual + 2; i++) {
    if (i > 1 && i < totalPaginas) {
      contenedor.appendChild(crearBoton(i));
    }
  }

  if (paginaActual < totalPaginas - 3) agregarElipsis();

  // Siempre mostrar la última página si no es la misma que la primera
  if (totalPaginas > 1) {
    contenedor.appendChild(crearBoton(totalPaginas));
  }

  // Botón Siguiente
  if (paginaActual < totalPaginas) {
    const btnSiguiente = document.createElement("button");
    btnSiguiente.textContent = "Siguiente";
    btnSiguiente.onclick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      cargarProductos(paginaActual + 1);
    };
    contenedor.appendChild(btnSiguiente);
  }
}


