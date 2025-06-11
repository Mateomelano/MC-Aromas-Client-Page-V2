<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" type="image/jpeg"
        href="https://res.cloudinary.com/dzfzqzdcu/image/upload/v1743554383/ari6vwivcy0ndoeqpmmw.jpg">
    <!-- Estilos -->
    <link rel="stylesheet" href="build/css/app.css?v=<?php echo time(); ?>">
    <!-- FUENTE MONTSERRAT -->
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet">
    <!-- CDN sin CORS para íconos -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

    <title>MC Aromas</title>
</head>

<body>

    <!--  NAVBAR  -->

    <nav class="navbar">
        <div class="nav-left">
            <i id="sidebar-icon" class="fas fa-bars"></i>
            <div class="search-container">
                <input type="text" class="busqueda" placeholder="Buscar...">
                <button type="submit" class="btn-buscar"><i class="fas fa-search"></i></button>
            </div>
        </div>

        <div class="nav-center">
            <a href="index.php">
                <img class="logo-central"
                    src="https://res.cloudinary.com/dzfzqzdcu/image/upload/v1744059260/ea4zbrhdcpl4eu9mdgwz.png"
                    alt="Logo">
            </a>
        </div>

        <div class="nav-right">
            <div class="icono-carrito-contenedor">
                <img id="iconoCarrito"
                    src="https://res.cloudinary.com/dzfzqzdcu/image/upload/v1744059294/y0illgpwo5zv2yhyhvxs.png"
                    class="carrito" alt="Carrito">
                <span id="contadorCarrito" class="contador-carrito">0</span>
            </div>
        </div>

    </nav>


    <!-- SIDEBAR -->
    <section>
        <div id="sidebar" class="sidebar">
            <div class="sidebar-header">
                <i id="close-sidebar" class="fas fa-times"></i>
            </div>
            <ul class="sidebar-menu">
                <li><a class="all-products" href="index.php">INICIO</a></li> 
                <li><a href="productos.php">VER TODOS LOS PRODUCTOS</a></li>

                <li class="has-submenu">
                    <div class="submenu-toggle">
                        <span>SAPHIRUS</span>
                        <i class="fas fa-chevron-right arrow-icon"></i>
                    </div>
                    <ul class="submenu">
                        <li><a href="productos.php?marca=saphirus">Todo Saphirus</a></li>
                        <li><a href="productos.php?marca=saphirus&categoria=Textil">Textil</a></li>
                        <li><a href="productos.php?marca=saphirus&categoria=Home Spray">Home Spray</a></li>
                        <li><a href="productos.php?marca=saphirus&categoria=Aerosol">Aerosol</a></li>
                        <li><a href="productos.php?marca=saphirus&categoria=Difusor">Difusor</a></li>
                        <li><a href="productos.php?marca=saphirus&categoria=Difusor Premium">Difusor Premium</a></li>
                        <li><a href="productos.php?marca=saphirus&categoria=Miniconcentrado">Mini concentrado</a></li>
                        <li><a href="productos.php?marca=saphirus&categoria=Aparatos">Aparatos</a></li>
                        <li><a href="productos.php?marca=saphirus&categoria=Aceite Esencial">Aceite Esencial</a></li>
                        <li><a href="productos.php?marca=saphirus&categoria=Antihumedad">Antihumedad</a></li>
                        <li><a href="productos.php?marca=saphirus&categoria=Aromatizantes Varios">Aromatizantes
                                Varios</a></li>
                        <li><a href="productos.php?marca=saphirus&categoria=Shiny">Línea Shiny</a></li>
                        <li><a href="productos.php?marca=saphirus&categoria=Perfumes Milano">Perfumes Milano</a></li>
                    </ul>
                </li>

                <li class="has-submenu">
                    <div class="submenu-toggle">
                        <span>AROMANZA</span>
                        <i class="fas fa-chevron-right arrow-icon"></i>
                    </div>
                    <ul class="submenu">
                        <li><a href="productos.php?marca=aromanza">Todo Aromanza</a></li>
                        <li><a href="productos.php?marca=aromanza&categoria=Tibetanosx8">Tibetanos x8</a></li>
                        <li><a href="productos.php?marca=aromanza&categoria=Tibetanos Premium">Tibetanos Premium</a>
                        </li>
                        <li><a href="productos.php?marca=aromanza&categoria=Tibetanos Slim">Tibetanos Slim</a></li>
                        <li><a href="productos.php?marca=aromanza&categoria=Momentos">Momentos</a></li>
                        <li><a href="productos.php?marca=aromanza&categoria=Conos">Conos</a></li>
                        <li><a href="productos.php?marca=aromanza&categoria=Mini Tibetanos">Mini Tibetanos</a></li>
                        <li><a href="productos.php?marca=aromanza&categoria=Magicos">Mágicos</a></li>
                        <li><a href="productos.php?marca=aromanza&categoria=Rama">Rama</a></li>
                        <li><a href="productos.php?marca=aromanza&categoria=Esferas Magicas">Esferas Mágicas</a></li>
                        <li><a href="productos.php?marca=aromanza&categoria=Kits">Kits</a></li>
                        <li><a href="productos.php?marca=aromanza&categoria=Mini Buena Onda">Mini Buena Onda</a></li>
                        <li><a href="productos.php?marca=aromanza&categoria=Buena Onda">Buena Onda</a></li>
                        <li><a href="productos.php?marca=aromanza&categoria=Velas Aromaticas">Velas Aromáticas</a></li>
                        <li><a href="productos.php?marca=aromanza&categoria=Difusor">Difusor</a></li>
                        <li><a href="productos.php?marca=aromanza&categoria=difusor de auto">Difusor de Auto</a></li>
                        <li><a href="productos.php?marca=aromanza&categoria=textil">Textil</a></li>
                        <li><a href="productos.php?marca=aromanza&categoria=Rocio Aurico">Rocío Aurico</a></li>

                    </ul>
                </li>

                <li class="has-submenu">
                    <div class="submenu-toggle">
                        <span>SANDRA MARZZAN</span>
                        <i class="fas fa-chevron-right arrow-icon"></i>
                    </div>
                    <ul class="submenu">
                        <li><a href="productos.php?marca=Sandra Marzzan">Todo Sandra Marzzan</a></li>
                        <li><a href="productos.php?marca=sandra%20marzzan&categoria=Linea Hogar">Línea Hogar</a></li>
                        <li><a href="productos.php?marca=sandra%20marzzan&categoria=Linea Bebe Infantil">Línea
                                Bebé/Infantil</a></li>
                        <li><a href="productos.php?marca=sandra%20marzzan&categoria=Linea Perfume">Línea Perfume</a>
                        </li>
                        <li><a href="productos.php?marca=sandra%20marzzan&categoria=Difusor">Difusor</a></li>
                        <li><a href="productos.php?marca=sandra%20marzzan&categoria=Aerosol">Aerosol</a></li>

                    </ul>
                </li>

                <li class="has-submenu">
                    <div class="submenu-toggle">
                        <span>SAGRADA MADRE</span>
                        <i class="fas fa-chevron-right arrow-icon"></i>
                    </div>
                    <ul class="submenu">
                        <li><a href="productos.php?marca=Sagrada Madre">Todo Sagrada Madre</a></li>
                        <li><a href="productos.php?marca=sagrada%20madre&categoria=Palo Santo">Palo Santo</a></li>
                        <li><a href="productos.php?marca=sagrada%20madre&categoria=Natural">Natural</a></li>
                        <li><a href="productos.php?marca=sagrada%20madre&categoria=Botanicos">Botánicos</a></li>
                        <li><a href="productos.php?marca=sagrada%20madre&categoria=Patagonia">Patagonia</a></li>
                        <li><a href="productos.php?marca=sagrada%20madre&categoria=Cannabis">Cannabis</a></li>
                        <li><a href="productos.php?marca=sagrada%20madre&categoria=9 Hierbas">9 Hierbas</a></li>
                        <li><a href="productos.php?marca=sagrada%20madre&categoria=Sagrado">Sagrado</a></li>
                        <li><a href="productos.php?marca=sagrada%20madre&categoria=Ritual">Ritual</a></li>
                        <li><a href="productos.php?marca=sagrada%20madre&categoria=5 Elementos">5 elementos</a></li>
                        <li><a href="productos.php?marca=sagrada%20madre&categoria=Yagra">Yagra</a></li>
                        <li><a href="productos.php?marca=sagrada%20madre&categoria=India">India</a></li>
                        <li><a href="productos.php?marca=sagrada%20madre&categoria=Varios">Varios</a></li>
                        <li><a href="productos.php?marca=sagrada%20madre&categoria=Defumacion">Defumación</a></li>

                    </ul>
                </li>

                <li class="has-submenu">
                    <div class="submenu-toggle">
                        <span>Otros</span>
                        <i class="fas fa-chevron-right arrow-icon"></i>
                    </div>
                    <ul class="submenu">

                        <li><a href="productos.php?marca=otros&categoria=Iluminarte">Iluminarte</a></li>
                        <li><a href="productos.php?marca=otros&categoria=Sahumerios Importados">Sahumerios
                                importados</a></li>
                        <li><a href="productos.php?marca=otros&categoria=Sahumerios Nacionales">Sahumerios
                                nacionales</a></li>
                        <li><a href="productos.php?marca=otros&categoria=Velas">Velas</a></li>
                        <li><a href="productos.php?marca=otros&categoria=Humidificadores">Humidificadores</a></li>
                        <li><a href="productos.php?marca=otros&categoria=Figuras">Figuras</a></li>
                        <li><a href="productos.php?marca=otros&categoria=Cascadas De Humo">Cascadas de humo</a></li>
                        <li><a href="productos.php?marca=otros&categoria=Lamparas De Sal">Lámparas de Sal</a></li>
                        <li><a href="productos.php?marca=otros&categoria=Porta Sahumerios">Portasahumerios</a></li>
                        <li><a href="productos.php?marca=otros&categoria=Varios">Varios</a></li>

                    </ul>
                </li>

                <!-- Repetí esto mismo para otras marcas -->
                <li><a href="#info">CONTACTANOS</a></li>
            </ul>
        </div>
    </section>



  <!-- CARRITO DESLIZANTE -->
  <section>
    <div id="carrito" class="carrito-drawer">
      <div class="carrito-header">
        <h2>Carrito de compras</h2>
        <button id="cerrarCarrito">&times;</button>
      </div>
      <div id="carritoContenido" class="carrito-contenido">
        <!-- Los productos se inyectan por JS -->
      </div>
      <div class="carrito-footer">
        <div class="carrito-info-mayorista">
          <p><strong>RECORDÁ:</strong> Si es tu primera vez comprando por <strong>MAYOR</strong> el monto mínimo de
            compra es de <strong>$60.000</strong>.</p>
          <p>Para ventas minoristas no hay mínimo de compra.</p>
        </div>
        <div class="carrito-total">
          <div class="linea-total">
            <span>Total:</span>
            <strong id="carritoTotal">$0,00</strong>
          </div>
          <div class="linea-total-mayorista">
            <span>Total Mayorista:</span>
            <strong id="carritoTotalMayorista">$0,00</strong>
          </div>
        </div>
        <button class="btn-iniciar-compra">Iniciar compra a WhatsApp</button>
      </div>

    </div>
  </section>


    <!-- FILTROS -->
    <section class="filtros">
        <div class="filtro-container">
        <!--    <label for="filtro-select"><i class="fas fa-filter"></i> Filtrar</label> -->
            <select id="filtro-select">
                <option value="preciomenor">Precio: Menor a Mayor</option>
                <option value="preciomayor">Precio: Mayor a Menor</option>
                <option value="az">A - Z</option>
                <option value="za">Z - A</option>
            </select>
            <button id="btn-reset-filtros">Ver todos los productos</button>
        </div>
    </section>


    <!-- PRODUCTOS -->
    <section class="productos">
        <div id="filtros-aplicados" class="filtros-activos" style="text-align:center; font-weight:500; margin: 10px 0;">
        </div>

        <div id="contenedor-productos" class="cards-container"></div>
        <div id="paginador" style="text-align:center; margin-top: 20px;"></div>


    </section>

    <!-- FOOTER -->
    <section class="footer">
        <div class="footer-container">
            <div class="footer-column">
                <h3>Dónde encontrarnos</h3>
                <p>San Martin 235 Villa Maria</p>
                <p>Whatsapp: +54 9 353 459-5325</p>
                <p>Tel: 353 459 5325</p>
                <div class="footer-social">
                    <a href="https://www.instagram.com/merceriachela" target="_blank"><i
                            class="fab fa-instagram"></i></a>
                    <a href="#" onclick="abrirWhatsApp(); return false;" target="_blank" class="info-item"><i
                            class="fab fa-whatsapp"></i></a>
                </div>
            </div>

            <div class="footer-column">
                <h3>Nuestras marcas</h3>
                <ul>
                    <li><a href="productos.php?marca=saphirus">Saphirus</a></li>
                    <li><a href="productos.php?marca=aromanza">Aromanza</a></li>
                    <li><a href="productos.php?marca=sagrada madre">Sagrada Madre</a></li>
                    <li><a href="productos.php?marca=sandra marzzan">Sandra Marzan</a></li>
                    <li><a href="productos.php">Todos los productos</a></li>
                </ul>
            </div>

            <div class="footer-column">
                <h3>Enlaces de interés</h3>
                <ul>
                    <li><a href="#">Contacto</a></li>
                    <li><a href="#">Quienes somos</a></li>
                </ul>
            </div>

        </div>

        <div class="footer-bottom">
            <p>MC AROMAS © 2025</p>
            <p>DEV + DESIGN BY <a href="https://mateomelano-portfolio.netlify.app/">MateoMelano</a></p>
        </div>
    </section>


    <!-- Botón de WhatsApp -->
    <a href="https://wa.me/1234567890" onclick="abrirWhatsApp(); " class="whatsapp-button" target="_blank"
        title="Chatea con nosotros en WhatsApp">
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/WhatsApp_icon.png" alt="WhatsApp" />
    </a>

    <!-- Botón de subir arriba -->
    <a href="#" id="btnSubirArriba">
        <img src="https://cdn-icons-png.flaticon.com/512/14024/14024921.png" alt="Subir" />
    </a>

    <!-- JS -->
    <script src="build/js/productos.js?v=<?php echo time(); ?>"></script>
</body>

</html>