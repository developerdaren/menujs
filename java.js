document.addEventListener("DOMContentLoaded", function () {

    const menucito = document.querySelector(".menucito")
    const menu = document.querySelector(".menu")
    const enlaces = document.querySelectorAll("a")

    const BtnCarrito=document.getElementById("boton_carrito")
    const mostrarCarrito=document.getElementById("contenedor-carrito")
    BtnCarrito.addEventListener("click",()=>{
     mostrarCarrito.classList.toggle("mostrar-carrito")

    })

    let contenedorCarrito = []

    menucito.addEventListener("click", () => {

        menu.classList.toggle("mostrar_menu")

    })


    enlaces.forEach((enlace) => {
        enlace.addEventListener("click", () => {
            menu.classList.remove("mostrar_menu")

        })


    })

    const tarjetaProducto = document.querySelectorAll(".productCard")

    tarjetaProducto.forEach(tarjeta => {
        tarjeta.addEventListener("click", e => {
            if (e.target.classList.contains("addToKartBtn")) {

                const infoProducto = {
                    Imagen: tarjeta.querySelector("img").src,
                    Cantidad: 1,
                    Nombre: tarjeta.querySelector(".name").textContent,
                    Precio: parseFloat(tarjeta.querySelector(".price").textContent.slice(1))
                }

                const ProductoExistente = contenedorCarrito.find(producto => infoProducto.Nombre === producto.Nombre)

                if (ProductoExistente) {
                    ProductoExistente.Cantidad++
                } else {

                    contenedorCarrito.push(infoProducto)
                }

                ActualizarCarritoContent()


                console.log(contenedorCarrito)

            }




        })


    })

    const ListadoCarrito = document.querySelector(".listado-carrito")

    function ActualizarCarritoContent() {

        ListadoCarrito.innerHTML = ""
        contenedorCarrito.forEach((item, index) => {
            const li = document.createElement("li")
            li.classList.add("info-carrito")
            li.innerHTML = `  
     <div class="foto-carrito">
                        <img src="${item.Imagen}" alt="">
                    </div>
                    <div class="titulo-carrito">
                        <span class="articulo">${item.Nombre}</span>
                        <div class="precio-cantidad">
                            <span class="precio">$ ${item.Precio}</span>
                            <input type="number" class="cantidad" min="1" value="${item.Cantidad}">
                        </div>
                    </div>
                    <div class="quitar-articulo">
                        <img src="./image/quitar.png" class="quitar" alt="" data-index="${index}">
                    </div>
              
    
    
    `
            ListadoCarrito.appendChild(li)


        })
        ActualizarTotalCompra()
        ContadorDeArticulos()
        CantidadNumber()
        EliminarArticuloCarrito()


    }


    function ActualizarTotalCompra() {
        const TotalDeCompra = document.querySelector(".total-carrito")
        const Total = contenedorCarrito.reduce((acc, item) => acc + item.Precio * item.Cantidad, 0)
        TotalDeCompra.innerHTML = `  <span class="total">Total $</span><span class="precio-total"> ${Total}</span>`

    }

    function ContadorDeArticulos() {
        const ContadorCarrito = document.querySelector(".contador-carrito")
        const Contador = contenedorCarrito.reduce((acc, item) => acc + item.Cantidad, 0)
        ContadorCarrito.innerHTML = ` <span>${Contador}</span> `
    }

    function CantidadNumber() {
        const cantidadInputs = document.querySelectorAll(".cantidad")
        cantidadInputs.forEach((input, index) => {
            input.addEventListener("change", (e) => {
                if (e.target.classList.contains("cantidad")) {
                    contenedorCarrito[index].Cantidad = parseInt(e.target.value) || 1
                    ActualizarTotalCompra()
                    ContadorDeArticulos()
                }
            })
        })

    }

    function EliminarArticuloCarrito(){
        const BotonEliminar=document.querySelectorAll(".quitar")
        BotonEliminar.forEach(item=>{
            item.addEventListener("click",(e)=>{
                if(e.target.classList.contains("quitar")){
                    const index=parseInt(e.target.getAttribute("data-index"))
                    contenedorCarrito.splice(index,1)
                    ActualizarCarritoContent()
                    ActualizarTotalCompra()
                    ContadorDeArticulos()
                    CantidadNumber()
                }
            })
        })

    }













})