// FUNCION BANNERS
document.addEventListener("DOMContentLoaded", function () {
  
  const modal        = document.getElementById('auth-modal');
  const userIcon     = document.getElementById('user-icon');
  const closeBtn     = modal.querySelector('.close-btn');
  const loginForm    = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const showRegLink  = document.getElementById('show-register');
  const showLogLink  = document.getElementById('show-login');

  userIcon.addEventListener('click', e => {
    e.preventDefault();
    modal.style.display = 'block';
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  });

  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });

  showRegLink.addEventListener('click', e => {
    e.preventDefault();
    loginForm.style.display    = 'none';
    registerForm.style.display = 'block';
  });
  showLogLink.addEventListener('click', e => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display    = 'block';
  });

  const slider = document.querySelector(".slider");
  const indicatorsContainer = document.querySelector(".indicators");

  if (!slider || !indicatorsContainer) return;

  // Detectar si estamos en mobile
  const isMobile = window.innerWidth < 750;

  // Elegir el endpoint según la resolución
  const endpoint = isMobile
    ? "src/php/get_bannersCel.php"
    : "src/php/get_banners.php";

  fetch(endpoint)
    .then((response) => response.json())
    .then((banners) => {
      if (!banners.length) {
        console.warn("No hay banners disponibles.");
        return;
      }

      // Insertar los banners
      banners.forEach((url) => {
        const slide = document.createElement("div");
        slide.classList.add("slide");
        slide.innerHTML = `<img src="${url}" alt="Banner">`;
        slider.appendChild(slide);
      });

      const slides = document.querySelectorAll(".slide");

      // Crear indicadores
      banners.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        dot.addEventListener("click", () => {
          currentIndex = i;
          updateSlider();
        });
        indicatorsContainer.appendChild(dot);
      });

      const indicators = indicatorsContainer.querySelectorAll(".dot");
      let currentIndex = 0;

      function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        indicators.forEach((dot, i) =>
          dot.classList.toggle("active", i === currentIndex)
        );
      }

      function autoSlide() {
        currentIndex = (currentIndex + 1) % banners.length;
        updateSlider();
      }

      updateSlider();
      setInterval(autoSlide, 5000);
    })
    .catch((error) => console.error("Error al cargar banners:", error));
});


// FUNCION PRODUCTOS DESTACADOS
document.addEventListener("DOMContentLoaded", () => {
  fetch("src/php/get_prod_dest.php")
    .then((res) => res.json())
    .then((productos) => {
      const container = document.getElementById("productos-container");

      productos.forEach((producto, index) => {
        const card = document.createElement("div");
        card.className = "product-card";
        card.style.animationDelay = `${index * 0.15}s`; // animación escalonada

        card.innerHTML = `
          <div class="product-image">
            <span class="badge">Destacado</span>
            <img src="${producto.imagen}" alt="${producto.nombre}" />
          </div>
          <h3 class="product-title">${producto.nombre}</h3>
          <p class="product-price">$${parseFloat(producto.precio).toLocaleString(
            "es-AR", { minimumFractionDigits: 2 }
          )}</p>
          <p class="product-price-mayorista">Precio Mayorista: $${parseFloat(
            producto.preciomayorista
          ).toLocaleString("es-AR", { minimumFractionDigits: 2 })}</p>
        `;
        container.appendChild(card);
      });
    })
    .catch((error) => {
      console.error("Error al cargar productos:", error);
    });
});


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

//SEARCHBAR

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".btn-buscar").forEach((btn) => {
    btn.addEventListener("click", () => {
      const contenedor = btn.closest(".search-container");
      const input = contenedor.querySelector(".busqueda");
      if (input && input.value.trim() !== "") {
        const busqueda = encodeURIComponent(input.value.trim());
        window.location.href = `productos.php?busqueda=${busqueda}`;
      }
    });
  });

  // Si querés también que funcione con Enter:
  document.querySelectorAll(".busqueda").forEach((input) => {
    input.addEventListener("keyup", (e) => {
      if (e.key === "Enter" && input.value.trim() !== "") {
        const busqueda = encodeURIComponent(input.value.trim());
        window.location.href = `productos.php?busqueda=${busqueda}`;
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



function login(){
    const modal        = document.getElementById('auth-modal');
  const userIcon     = document.getElementById('user-icon');
  const closeBtn     = modal.querySelector('.close-btn');
  const loginForm    = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const showRegLink  = document.getElementById('show-register');
  const showLogLink  = document.getElementById('show-login');

  userIcon.addEventListener('click', e => {
    e.preventDefault();
    modal.style.display = 'block';
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  });

  closeBtn.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', e => {
    if (e.target === modal) modal.style.display = 'none';
  });

  showRegLink.addEventListener('click', e => {
    e.preventDefault();
    loginForm.style.display    = 'none';
    registerForm.style.display = 'block';
  });
  showLogLink.addEventListener('click', e => {
    e.preventDefault();
    registerForm.style.display = 'none';
    loginForm.style.display    = 'block';
  });
}