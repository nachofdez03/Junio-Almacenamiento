// VISTA

import {
  newDishValidation,
  newCategoryValidation,
  assignValidationForm,
  desAssignValidationForm,
  newRestaurantValidation,
} from "./validation.js";

import { setCookie } from "./Util.js";

// Simbolo para el metodo del history
const EXCECUTE_HANDLER = Symbol("excecuteHandler");

class RestaurantView {
  constructor() {
    this.main = document.getElementById("main")[0]; // Main
    this.menu = document.querySelector(".nav_lista"); // Menu de navegacion
    this.categories = document.getElementById("categories"); // Contenedor donde iran las categorias
    this.categoriesMenu = document.getElementById("navCats");
    this.dishes = document.getElementById("dishes");
    this.dishWindow = null; // Referencia a la nueva ventana
    this.ventanas = []; // Array donde almacenamos las ventanas abiertas
    this.contador = 0; // Contador para el nombre al abrir una nueva ventana
  }

  [EXCECUTE_HANDLER](
    handler, // Función de manejo que se ejecutará
    handlerArguments, // Argumentos que se pasarán a la función de manejo
    scrollElement, // Elemento en la página hacia el cual se realizará un desplazamiento
    data, // Datos asociados con la entrada del historial
    url, // URL que se asocia con la entrada del historial
    event // Objeto de evento asociado con la acción
  ) {
    handler(...handlerArguments);
    const scroll = document.querySelector(scrollElement);
    console.log(scroll);
    if (scroll) scroll.scrollIntoView();
    //$(scrollElement).get(0).scrollIntoView();
    history.pushState(data, null, url);
    event.preventDefault();
  }

  // Bind para los enlaces de inicio y del logo y le pasamos el OnInit por parametro
  bindInit(handler) {
    document.getElementById("inicio").addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        handler,
        [],
        "body",
        { action: "init" },
        "#",
        event
      );
    });
    document.getElementById("logo").addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        handler,
        [],
        "body",
        { action: "init" },
        "#",
        event
      );
    });
  }

  // Método para mostrar las categorías
  showCategories(categories) {
    this.categories.replaceChildren();

    // Creamos el div que será dodne iteraremos con las categorias
    const container = document.createElement("div");
    container.id = "category-list";

    const h1 = document.createElement("h1");
    h1.classList.add("textoH1");
    h1.textContent = "DESCUBRE NUESTROS PRODUCTOS";
    this.categories.appendChild(h1);

    for (const category of categories) {
      // Vamos insertando las categorias al final
      container.insertAdjacentHTML(
        "beforeend",
        `<div class="category-item">
            <a data-category="${category.name}" class = "enlaceCategorias" href="#categorylist">
              <div class = "fotoCategoria">
                <img class="category-image ${category.name}" src="${category.image}"/>
              </div>
              <div class = "TextoCategorias">
                <h3>${category.name}</h3>
              </div>
            </a>
          </div>`
      );
    }
    this.categories.append(container);
  }

  // Iteramos sobre las categorias pero esta vez las mostramos en el menu de navegacion
  showCategoriesinMenu(categories) {
    const navCats = document.getElementById("navCats");
    const container = navCats.nextElementSibling;
    container.replaceChildren();
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-category="${category.name}" class="dropdown-item" href="#categorylist">${category.name}</a></li>`
      );
    }
  }

  // Mostrar alergenos en el menu
  showAllergensinMenu(allergens) {
    const navCats = document.getElementById("navAler");
    const container = navCats.nextElementSibling;
    container.replaceChildren();
    for (const allergen of allergens) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-allergen="${allergen.name}" class="dropdown-item" href="#allergen">${allergen.name}</a></li>`
      );
    }
  }

  // Mostrar los menus en en menu nav
  showMenusinMenu(menus) {
    const navCats = document.getElementById("navMenus");
    const container = navCats.nextElementSibling;
    container.replaceChildren();
    for (const menu of menus) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-menu="${menu.name}" class="dropdown-item" href="#menu">${menu.name}</a></li>`
      );
    }
  }

  showRestaurantsinMenu(restaurants) {
    const navRes = document.getElementById("navRes");
    const container = navRes.nextElementSibling;
    container.replaceChildren();
    for (const restaurant of restaurants) {
      container.insertAdjacentHTML(
        "beforeend",
        `<li><a data-restaurant="${restaurant.name}" class="dropdown-item" href="#restaurantlist">${restaurant.name}</a></li>`
      );
    }
  }

  // Mostrar plato cuando se le da a una categoria, alérgeno, menu en el menu nav, o las categorias en el main
  showDishes(dishes) {
    this.dishes.replaceChildren();
    this.dishes.classList.remove("colorFondo");

    const container = document.createElement("div");
    container.id = "dish-list";
    container.classList.add("flex");

    for (const dish of dishes) {
      container.insertAdjacentHTML(
        "beforeend",
        `
            <div class="plate-item">
            <a data-dish="${dish.name}" href="#showDish">
            <div id = "fotoDish">
                        <img class="dish-image" src="${dish.image}" />
                    </div>
                    <div >
                        <h3 class = "nombreDish">${dish.name}</h3>
                    </div>
                </a>
            </div>
            `
      );
    }

    this.dishes.append(container);
    this.dishes.scrollIntoView({ behavior: "smooth" });
  }

  showDishInformation(dish) {
    this.dishes.replaceChildren();
    this.dishes.classList.remove("colorFondo");

    this.dishes.insertAdjacentHTML(
      "beforeend",
      `
      <div class ="contenedorPlato">
        <div class = "contenedorElementos">

          <div class = "contenedorFotoPlato" >
            <img class="fotoPlato" src=${dish.image}   />     
          </div>

          <div class = "contenedorElementosPlato">

            <div class ="contenedorElementosPlato1">
              <b><h5 class = h5Plato >${dish.name}</h5></b>
            </div>
            <div class = "contenedorElementosPlato2">
              <p> ${dish.description}</p>
            </div>
            <div class = "contenedorElementosPlato3">
              <button class="btn btn-primary" onclick="comprar('${dish.name}')">Comprar</button>
              <button id="b-open" data-serial="${dish.name}" class="btn btn-primary">Abrir en nueva ventana</button>
            </div>

                </div>
          </div>
          <button id="botonCerrarVentanas" data-serial="${dish.name}" class="btn btn-primary">Cerrar Ventanas</button>

            
        </div>
      </div>
        `
    );

    // div
    //  div foto /div
    // div
  }
  showRandomDishes(dishes) {
    this.dishes.replaceChildren();
    this.dishes.classList.remove("colorFondo");

    let copiaDishes = [];
    let platosAleatorios = [];
    let numeroPlatos = 3;

    const container = document.createElement("div");
    container.id = "random-dishes";
    container.classList.add("flex");

    // Añadimos cada plato a la copia
    for (const dish of dishes) {
      copiaDishes.push(dish);
    }
    for (let index = 0; index < numeroPlatos; index++) {
      let indiceAleatorio = Math.floor(Math.random() * copiaDishes.length);
      platosAleatorios.push(copiaDishes[indiceAleatorio]);

      let plato = copiaDishes[indiceAleatorio];

      container.insertAdjacentHTML(
        "beforeend",
        `
            <div class="random-item">
                <a data-dish="${plato.name}" href ='#randomDish'>
                    <div class = "platosRandom">
                        <img class="random-image" src=${plato.image} />
                    </div>
                    <div class = "TextoCategorias">
                        <h3>${plato.name}</h3>
                    </div>
                </a>
            </div>
            `
      );

      //Borramos el plato que hemos seleccionado para que no salga de nuevo
      copiaDishes.splice(indiceAleatorio, 1);
    }
    this.dishes.append(container);
  }

  showRestaurantInformation(restaurant) {
    this.dishes.replaceChildren();
    this.dishes.classList.remove("colorFondo");

    const container = document.createElement("div");
    container.classList.add("flex2");

    container.insertAdjacentHTML(
      "beforeend",
      `<div class = "textoH1 restaurantFlex">
        <h1><b> Información ${restaurant.name} </b></h1> <br>
       <h3> NOMBRE: ${restaurant.name}</h3>
       <h3> ESTILO: ${restaurant.description}</h3>
       <h3> LOCATION: ${restaurant.location}</h3>
      </div>
      </a>
      </div>`
    );
    this.dishes.append(container);
    this.dishes.scrollIntoView({ behavior: "smooth" });
  }

  showDishInNewWindow(dish) {
    // Cogemos los elementos de la nueva ventana
    const main = this.dishWindow.document.querySelector("main");
    const header = this.dishWindow.document.querySelector("header nav");

    // Los vaciamos
    main.replaceChildren();
    let container;

    // Si existe el plato
    if (dish) {
      this.dishWindow.document.title = dish.name;
      container = document.createElement("div");
      container.id = "single-product";
      container.classList.add(`${dish.constructor.name}-style`);
      container.classList.add("container");
      container.classList.add("mt-5");
      container.classList.add("mb-5");
      container.insertAdjacentHTML(
        "beforeend",
        `
        <div class ="contenedorPlato" style = "height:70%";>
          <div class = "contenedorElementos">
  
            <div class = "contenedorFotoPlato" >
              <img class="fotoPlato" src=${dish.image}   />     
            </div>
  
            <div class = "contenedorElementosPlato">
  
              <div class ="contenedorElementosPlato1">
                <b><h5 class = h5Plato >${dish.name}</h5></b>
              </div>
              <div class = "contenedorElementosPlato2">
                <p> ${dish.description}</p>
              </div>
              <div class = "contenedorElementosPlato3">
                <button class="btn btn-primary" onclick="comprar('${dish.name}')">Comprar</button>
              </div>
  
                  </div>
            </div>
              
          </div>
        </div>
          `
      );

      container.insertAdjacentHTML(
        "beforeend",
        '<button class="btn btn-primary text-uppercase m-2 px-4" onClick="window.close()">Cerrar</button>'
      );
      main.append(container);
    }
  }

  // Mostrar formulario

  showAdminMenu() {
    const menuOption = document.createElement("li");
    menuOption.classList.add("nav-item");
    menuOption.classList.add("dropdown");
    menuOption.insertAdjacentHTML(
      "beforeend",
      '<a class="nav-link dropdown-toggle li" href="#" id="navServices" role="button" data-bs-toggle="dropdown" aria-expanded="false">Adminitración</a>'
    );

    const suboptions = document.createElement("ul");
    suboptions.classList.add("dropdown-menu");
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="newDish" class="dropdown-item" href="#newDish">Crear Plato</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="removeDish" class="dropdown-item" href="#remove-dish">Eliminar Plato</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="assignDish" class="dropdown-item" href="#assignDish">Asignar Platos Menu</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="desAssignDish" class="dropdown-item" href="#desAssignDish"> Desasignar Platos Menu</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="newCategory" class="dropdown-item" href="#newCategory">Crear Categoria</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="deleteCategory" class="dropdown-item" href="#deleteCategory">Borrar Categoria</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="newRestaurant" class="dropdown-item" href="#newRestaurant">Crear Restaurante</a></li>'
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="modCategoryDish" class="dropdown-item" href="#del-product">Modificar Cateogrias Plato</a></li>'
    );

    menuOption.append(suboptions);
    this.menu.append(menuOption);
  }

  showNewDishForm(categories, allergens) {
    this.dishes.replaceChildren();

    this.dishes.classList.add("colorFondo");

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");

    container.id = "new-product";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Nuevo producto</h1>'
    );

    const form = document.createElement("form");
    form.name = "fNewDish";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-5 mb-3">
                    <label class="form-label" for="ndName">Nombre *</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-key"></i></span>
                        <input type="text" class="form-control" id="ndName" name="ndName" value="" required>
                        <div class="invalid-feedback">El número de serie es obligatorio. Debe ser un entero.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`
    );
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-5 mb-3">
                    <label class="form-label" for="ndImage">Foto *</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-card-image"></i></span>
                        <input class="form-control" id="ndImage" name="ndImage"
                            placeholder="Ruta de la imagen" value="" min="0" step="1" required>
                        <div class="invalid-feedback">La URL no es válida.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`
    );
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-5 mb-3">
                    <label class="form-label" for="ndCategories">Categorías *</label>
                    <div class="input-group">
                        <label class="input-group-text" for="ndCategories"><i class="bi bi-card-checklist"></i></label>
                        <select class="form-select" name="ndCategories" id="ndCategories" multiple required>
                        </select>
                        <div class="invalid-feedback">El producto debe pertenecer al menos a una categoría.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`
    );

    const npCategories = form.querySelector("#ndCategories");
    for (const category of categories) {
      npCategories.insertAdjacentHTML(
        "beforeend",
        `<option value="${category.name}">${category.name}</option>`
      );
    }

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-5 mb-3">
                    <label class="form-label" for="ndAllergens">Alergenos *</label>
                    <div class="input-group">
                        <label class="input-group-text" for="ndAllergens"><i class="bi bi-card-checklist"></i></label>
                        <select class="form-select" name="ndAllergens" id="ndAllergens" multiple required>
                        </select>
                        <div class="invalid-feedback">El producto debe pertenecer al menos a una categoría.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`
    );

    const npAllergen = form.querySelector("#ndAllergens");
    for (const allergen of allergens) {
      npAllergen.insertAdjacentHTML(
        "beforeend",
        `<option value="${allergen.name}">${allergen.name}</option>`
      );
    }

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-4 mb-0">
                    <label class="form-label" for="ndDescription">Descripción</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-text-paragraph"></i></span>
                        <textarea class="form-control" id="ndDescription" name="ndDescription" rows="4">
                        </textarea>
                        <div class="invalid-feedback"></div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`
    );
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-3 mb-0">
                    <label class="form-label" for="ndIngredients">Ingredintes</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-text-paragraph"></i></span>
                        <textarea class="form-control" id="ndIngredients" name="ndIngredients" rows="4">
                        </textarea>
                        <div class="invalid-feedback"></div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`
    );
    form.insertAdjacentHTML(
      "beforeend",
      `<div class="mb-12">
                    <button class="btn btn-primary" type="submit">Enviar</button>
                    <button class="btn btn-primary" type="reset">Cancelar</button>
                </div>`
    );

    container.append(form);
    this.dishes.append(container);
  }

  showRemoveDishForm(categories) {
    this.dishes.replaceChildren();
    this.dishes.classList.add("colorFondo");

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "remove-product";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Eliminar un plato</h1>'
    );

    const form = document.createElement("form");
    form.name = "fNewProduct";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-6 mb-3">
                    <label class="form-label" for="npCategories">Categorías del producto</label>
                    <div class="input-group">
                        <label class="input-group-text" for="rpCategories"><i class="bi bi-card-checklist"></i></label>
                        <select class="form-select" name="rpCategories" id="rpCategories">
                            <option disabled selected>Selecciona una categoría</option>
                        </select>
                    </div>
                </div>`
    );
    const rpCategories = form.querySelector("#rpCategories");
    for (const category of categories) {
      rpCategories.insertAdjacentHTML(
        "beforeend",
        `<option value="${category.name}">${category.name}</option>`
      );
    }

    container.append(form);
    container.insertAdjacentHTML(
      "beforeend",
      '<div id="product-list" class="container my-3"><div class="row"></div></div>'
    );

    this.dishes.append(container);
  }

  showRemoveDishList(dishes) {
    const listContainer = document
      .getElementById("product-list")
      .querySelector("div.row");
    listContainer.replaceChildren();

    let exist = false;
    for (const dish of dishes) {
      exist = true;
      listContainer.insertAdjacentHTML(
        "beforeend",
        `<div class="col-md-4 rProduct">
                    <figure class="card card-product-grid card-lg"> <a data-serial="${dish.name}" href="#single-product" class="img-wrap"><img class="${dish.name}-style" src="${dish.image}" style="width: 100px; height: 100px;></a>
                        <figcaption class="info-wrap">
                            <div class="row">
                                <div class="col-md-8"> <a data-serial="${dish.name}" href="#single-product" class="title">${dish.name} - ${dish.name}</a> </div>
                                <div class="col-md-4">
                                    <div class="rating text-right"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
                                </div>
                            </div>
                        </figcaption>
                        <div class="bottom-wrap"> <a href="#" data-serial="${dish.name}" class="btn btn-primary float-right"> Eliminar </a>
                            <div class="price-wrap"> <span class="price h5">${dish.name}</span> <br> <small class="text-success">Free shipping</small> </div>
                        </div>
                    </figure>
                </div>`
      );
    }
    if (!exist) {
      this.dishes.insertAdjacentHTML(
        "beforeend",
        '<p class="text-danger"><i class="bi bi-exclamation-triangle"></i> No existen productos para esta categoría o tipo.</p>'
      );
    }
  }
  showNewCategoryForm() {
    this.dishes.replaceChildren();
    this.dishes.classList.add("colorFondo");

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "new-category";
    container.insertAdjacentHTML(
      "afterbegin",
      `<h1 class="display-5">Nueva categoría</h1>`
    );
    container.insertAdjacentHTML(
      "beforeend",
      `<form name="fNewCategory" role="form" class="row g-3" novalidate>
				<div class="col-md-6 mb-3">
					<label class="form-label" for="ncTitle">Título *</label>
					<div class="input-group">
						<span class="input-group-text"><i class="bi bi-type"></i></span>
						<input type="text" class="form-control" id="ncTitle"
							name="ncTitle"
							placeholder="Título de categoría" value="" required>
							<div class="invalid-feedback">El título es obligatorio.</div>
							<div class="valid-feedback">Correcto.</div>
					</div>
				</div>
				<div class="col-md-6 mb-3">
					<label class="form-label" for="ncUrl">URL de la imagen *</label>
					<div class="input-group">
						<span class="input-group-text"><i class="bi bi-fileimage"></i></span>
						<input type="text" class="form-control" id="ncUrl" name="ncUrl"
							placeholder="URL de la imagen"
							value="" required>
							<div class="invalid-feedback">La URL no es válida.</div>
							<div class="valid-feedback">Correcto.</div>
					</div>
				</div>
				<div class="col-md-12 mb-3">
					<label class="form-label" for="ncDescription">Descripción</label>
					<div class="input-group">
						<span class="input-group-text"><i class="bi bi-bodytext"></i></span>
						<input type="text" class="form-control" id="ncDescription"
							name="ncDescription" value="">
							<div class="invalid-feedback"></div>
							<div class="valid-feedback">Correcto.</div>
					</div>
				</div>
				<div class="mb-12">
					<button class="btn btn-primary" type="submit">Enviar</button>
					<button class="btn btn-primary" type="reset">Cancelar</button>
				</div>
			</form>`
    );
    this.dishes.append(container);
  }

  showRemoveCategoryForm(categories) {
    this.dishes.replaceChildren();
    this.dishes.classList.add("colorFondo");

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "remove-category";
    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5 text-center">Eliminar una categoría</h1>'
    );
    const row = document.createElement("div");
    row.classList.add("category");
    row.classList.add("flex6");
    for (const category of categories) {
      row.insertAdjacentHTML(
        "beforeend",
        `
                <div class="category__container" >
                    <a data-category="${category.name}" href="#product-list">
                        <div class="cat-list-image category__photo"><img alt="${category.name}"
                        src="${category.image}" style="width: 100px; height: 100px; />
                        </div>
                        <div class="cat-list-text category_info">
                            <h3>${category.name}</h3>
                            <p>${category.description}</p>
                        </div>
                        <div class="btn_elim"><button class="btn btn-primary" data-category="${category.name}" type='button'>Eliminar</button></div>
                    </a>
                </div>`
      );
    }
    container.append(row);
    this.dishes.append(container);
  }

  showAssignDishForm(menus, dishes) {
    // Primero borraremos el contenido del main
    this.dishes.replaceChildren();
    this.dishes.classList.add("colorFondo");

    // Creamos el div donde ira nuestro formulario de creacion del plato
    const container = document.createElement("div");

    // Le añadimos las clases y las ids correspondientes a nuestro contenedor
    container.classList.add("container", "my-3");
    container.id = "assign-dish";

    // Le añadimos el titulo a nuestro contenedor
    container.insertAdjacentHTML(
      "afterbegin",
      "<h1>Asignación de plato a menú</h1>"
    );

    // Añadimos el formulario para la creacion del plato a nuestro contenedor
    container.insertAdjacentHTML(
      "beforeend",
      `     
      <form name="fAssignDish" role="form" id="fAssignDish" class="booking_frm black"  novalidate> 
      
        <div class="mt-4">
          <div class="input-group">
            <label for="ndMenus">Menus <span class="letter_red">*</span></label>
            <select class="input-style" id="ndMenus" name="ndMenus"  size="3" required>
            </select>
            <div class="invalid-feedback">Debe seleccionar un menu.</div>
            <div class="valid-feedback">Correcto.</div>
          </div>
        </div>

        <div class="mt-4">
          <div class="input-group">
            <label for="ndDishes">Platos <span class="letter_red">*</span></label>
            <select class="input-style" id="ndDishes" name="ndDishes" size="4" multiple required>
            </select>
            <div class="invalid-feedback">Debe seleccionar al menos un plato.</div>
            <div class="valid-feedback">Correcto.</div>
          </div>
        </div>

        <div class="mt-4">
          <button class="button red" type="submit">Enviar</button>
          <button class="button red" type="reset">Cancelar</button>
        </div>
      </form>
      `
    );

    // Añadimos el formulario a nuestra pagina
    this.dishes.append(container);

    const menuSelector = document.getElementById("ndMenus");

    // Recorremos los menus que nos llegan
    // y las añadimos a nuestro selector de menus
    for (const menu of menus) {
      menuSelector.insertAdjacentHTML(
        "beforeend",
        `
           <option value='${menu.name}'>${menu.name}</option>
         `
      );
    }
    // Obtenemos el selector donde iran nuestro menus
    const dishesSelector = document.getElementById("ndDishes");

    // Recorremos los menus que nos llegan
    // y las añadimos a nuestro selector de menus
    for (const dish of dishes) {
      dishesSelector.insertAdjacentHTML(
        "beforeend",
        `
             <option value='${dish.name}'>${dish.name}</option>
           `
      );
    }
  }
  showDesAssignDishForm(menus, dishes) {
    // Primero borraremos el contenido del main
    this.dishes.replaceChildren();
    this.dishes.classList.add("colorFondo");

    // Creamos el div donde ira nuestro formulario de creacion del plato
    const container = document.createElement("div");

    // Le añadimos las clases y las ids correspondientes a nuestro contenedor
    container.classList.add("container", "my-3");
    container.id = "desassign-dish";

    // Le añadimos el titulo a nuestro contenedor
    container.insertAdjacentHTML(
      "afterbegin",
      "<h1>Desasignación de plato a menú</h1>"
    );

    // Añadimos el formulario para la creacion del plato a nuestro contenedor
    container.insertAdjacentHTML(
      "beforeend",
      `     
      <form name="fDesAssignDish" role="form" id="fDesAssignDish" class="booking_frm black"  novalidate> 
       
        <div class="mt-4">
          <div class="input-group">
            <label for="ndMenus">Menus <span class="letter_red">*</span></label>
            <select class="input-style" id="ndMenus" name="ndMenus"  size="3" required>
            </select>
            <div class="invalid-feedback">Debe seleccionar un menu.</div>
            <div class="valid-feedback">Correcto.</div>
          </div>
        </div>

        <div class="mt-4">
          <div class="input-group">
            <label for="ndDishes">Platos <span class="letter_red">*</span></label>
            <select class="input-style" id="ndDishes" name="ndDishes" size="4" multiple required>
            </select>
            <div class="invalid-feedback">Debe seleccionar al menos un plato.</div>
            <div class="valid-feedback">Correcto.</div>
          </div>
        </div>

        <div class="mt-4">
          <button class="button red" type="submit">Enviar</button>
          <button class="button red" type="reset">Cancelar</button>
        </div>
      </form>
      `
    );

    // Añadimos el formulario a nuestra pagina
    this.dishes.append(container);

    // Obtenemos el selector donde iran nuestro menus
    const menuSelector = document.getElementById("ndMenus");

    // Recorremos los menus que nos llegan
    // y las añadimos a nuestro selector de menus
    for (const menu of menus) {
      menuSelector.insertAdjacentHTML(
        "beforeend",
        `
            <option value='${menu.name}'>${menu.name}</option>
          `
      );
    }

    // Obtenemos el selector donde iran nuestro menus
    const dishesSelector = document.getElementById("ndDishes");

    // Recorremos los menus que nos llegan
    // y las añadimos a nuestro selector de menus
    for (const dish of dishes) {
      dishesSelector.insertAdjacentHTML(
        "beforeend",
        `
             <option value='${dish.name}'>${dish.name}</option>
           `
      );
    }
  }

  showNewRestaurantForm() {
    this.dishes.replaceChildren();
    this.dishes.classList.add("colorFondo");

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "new-restaurant";

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Nuevo restaurante</h1>'
    );

    const form = document.createElement("form");
    form.name = "fNewRestaurant";
    form.setAttribute("role", "form");
    form.setAttribute("novalidate", "");
    form.classList.add("row");
    form.classList.add("g-3");

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-5 mb-3">
                    <label class="form-label" for="nrName">Nombre *</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-key"></i></span>
                        <input type="text" class="form-control" id="nrName" name="nrName" value="" required>
                        <div class="invalid-feedback">El número de serie es obligatorio. Debe ser un entero.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`
    );

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-5 mb-3">
                    <label class="form-label" for="nrLocation">Localización</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-key"></i></span>
                        <input type="text" class="form-control" id="nrLocation" name="nrLocation" value="" required>
                        <div class="invalid-feedback">El número de serie es obligatorio. Debe ser un entero.</div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`
    );

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="col-md-4 mb-0">
                    <label class="form-label" for="nrDescription">Descripción</label>
                    <div class="input-group">
                        <span class="input-group-text"><i class="bi bi-text-paragraph"></i></span>
                        <textarea class="form-control" id="nrDescription" name="nrDescription" rows="4">
                        </textarea>
                        <div class="invalid-feedback"></div>
                        <div class="valid-feedback">Correcto.</div>
                    </div>
                </div>`
    );

    form.insertAdjacentHTML(
      "beforeend",
      `<div class="mb-12">
                    <button class="btn btn-primary" type="submit">Enviar</button>
                    <button class="btn btn-primary" type="reset">Cancelar</button>
                </div>`
    );

    container.append(form);
    this.dishes.append(container);
  }

  showDishModal(done, dish, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Plato creada";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${dish.name}</strong> ha sido creado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El plato <strong>${dish.name}</strong> se ha creado correctamente.</div>`
      );
    }

    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewDish.reset();
      }
      document.fNewDish.ndName.focus();
      messageModalContainer.addEventListener("hidden.bs.modal", listener, {
        once: true,
      });
    };
  }
  showRemoveProductModal(done, product, error) {
    const productList = document.getElementById("product-list");
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Producto eliminado";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El plato <strong>${product.name}</strong> ha sido eliminado correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        '<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El plato <strong>${product.name}</strong> no existe en el manager.</div>'
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        const button = productList.querySelector(
          `a.btn[data-serial="${product.name}"]`
        );
        button.parentElement.parentElement.parentElement.remove();
      }
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showNewCategoryModal(done, cat, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");
    const name = document.getElementById("messageModalTitle");
    name.innerHTML = "Nueva Categoría";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">La categoría
		<strong>${cat.name}</strong> ha sido creada correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamationtriangle"></i> La categoría <strong>${cat.name}</strong> ya está
		creada.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewCategory.reset();
      }
      document.fNewCategory.ncTitle.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showRemoveCategoryModal(done, category, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");
    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Borrado de categoría";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">La categoría
		<strong>${category.name}</strong> ha sido eliminada correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3">
                    <i class="bi bi-exclamation-triangle"></i>
                    La categoría <strong>${category.name}</strong> no se ha podido
                    borrar.</div>`
      );
    }
    messageModal.show();
  }
  showAssignDishModal(done, menu, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Asignación plato menu";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">Los platos han sido agregados al <strong>${menu.name}</strong>.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i>El <strong>${menu.name}</strong> ya contiene alguno de los platos que esta intentando agregar.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fAssignDish.reset();
      }
      document.fAssignDish.ndMenus.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showDesAssignDishModal(done, menu, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Desasignación plato menu";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">Los platos han sido desasignados del <strong>${menu.name}</strong>.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i>El <strong>${menu.name}</strong> no contiene alguno de los platos seleccionados.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fDesAssignDish.reset();
      }
      document.fDesAssignDish.ndMenus.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  showNewRestaurantModal(done, restaurant, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Nuevo Restaurante";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">El restaurante <strong>${restaurant.name}</strong> ha sido creada correctamente.</div>`
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> El restaurante <strong>${restaurant.name}</strong> no ha podido crearse correctamente.</div>`
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        document.fNewRestaurant.reset();
      }
      document.fNewRestaurant.nrName.focus();
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  bindCategoryDishes(handler) {
    // Cogemos el elemento de la lista
    let lista = document.getElementById("category-list");
    // Cogemos todos los elementos hijos que son los div con clase .category-item
    const links = lista.children;

    // Y ahora recorreremos cada uno de esos elementos y le añadimos un enlace de clickear
    for (const li of links) {
      li.querySelector("a").addEventListener("click", (event) => {
        const category = event.currentTarget.dataset.category;
        this[EXCECUTE_HANDLER](
          handler,
          [category],
          "#product-list",
          { action: "dishCategoryList", category },
          "#categorylist",
          event
        );
      });
    }
  }

  bindCategoryDishesMenu(handler) {
    // Cogemos el elemento de la lista
    const lista = document.getElementById("navCats");

    // nextSibling pasamos al siguiente hermano y ahi buscamos los elementos a
    const links = lista.nextElementSibling.querySelectorAll("a");

    for (const link of links) {
      link.addEventListener("click", (event) => {
        const category = event.currentTarget.dataset.category;
        this[EXCECUTE_HANDLER](
          handler,
          [category],
          "#dish-list",
          { action: "dishCategoryListMenu", category },
          "#categorylistmenu",
          event
        );
      });
    }
  }

  bindAllergenDishesMenu(handler) {
    // Cogemos el elemento de la lista
    let lista = document.getElementById("navAler");
    // nextSibling pasamos al siguiente hermano y ahi buscamos los elementos a
    const links = lista.nextElementSibling.querySelectorAll("a");

    // Recorremos cada enlace y le añadimos el evento con el que se activira la callback
    for (const li of links) {
      li.addEventListener("click", (event) => {
        const allergen = event.currentTarget.dataset.allergen;
        this[EXCECUTE_HANDLER](
          handler,
          [allergen],
          "#dish-list",
          { action: "dishAllergenListMenu", allergen },
          "#allergenlistmenu",
          event
        );
      });
    }
  }

  bindMenuDishesMenu(handler) {
    // Cogemos el elemento de la lista
    let lista = document.getElementById("navMenus");
    const links = lista.nextElementSibling.querySelectorAll("a");

    // Recorremos cada enlace y le añadimos el evento con el que se activira la callback
    for (const li of links) {
      li.addEventListener("click", (event) => {
        const { menu } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [menu],
          "#dish-list",
          { action: "dishMenuListMenu", menu },
          "#menulistmenu",
          event
        );
      });
    }
  }

  bindRestaurantMenu(handler) {
    // Cogemos el elemento de la lista
    let lista = document.getElementById("navRes");
    const links = lista.nextElementSibling.querySelectorAll("a");

    // Recorremos cada enlace y le añadimos el evento con el que se activira la callback
    for (const li of links) {
      li.addEventListener("click", (event) => {
        const { restaurant } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [restaurant],
          "#dish-list",
          { action: "restaurantListMenu", restaurant },
          "#restaurantlistmenu",
          event
        );
      });
    }
  }

  bindDish(handler) {
    const div = document.getElementById("dish-list");

    // Obtenemos todos los enlaces que son descendientes de los divs hijos del div principal
    const enlaces = div.querySelectorAll("a");

    // Iteramos sobre los enlaces
    for (const enlace of enlaces) {
      enlace.addEventListener("click", (event) => {
        // Accedemos al atributo 'data-dish' del enlace y lo pasamos al manejador
        const { dish } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [dish],
          "#dish-list",
          { action: "showDish", dish },
          "#showDish",
          event
        );
      });
    }
  }

  bindRandomDishes(handler) {
    const div = document.getElementById("random-dishes");
    const enlaces = div.querySelectorAll("a");

    for (const enlace of enlaces) {
      enlace.addEventListener("click", (event) => {
        const { dish } = event.currentTarget.dataset;
        this[EXCECUTE_HANDLER](
          handler,
          [dish],
          "#dish-list",
          { action: "randomDish", dish },
          "#randomDish",
          event
        );
      });
    }
  }

  bindShowDishInNewWindow(handler) {
    // Botón de Abrir en nueva ventana
    const bOpen = document.getElementById("b-open");
    // Verificamos si la ventana es nula o esta cerrada para abrirla si no lo esta
    bOpen.addEventListener("click", (event) => {
      this.contador++;
      let nombre = "dishWindow" + this.contador;

      this.dishWindow = window.open(
        "Dish.html",
        nombre,
        "width=800, height=600, top=250, left=250, titlebar=yes, toolbar=no, menubar=no, location=no"
      );

      this.ventanas.push(this.dishWindow);

      // Agregamos el evento que se ejecutará cuando el contenido de la ventana emergente se cargue
      this.dishWindow.addEventListener("load", () => {
        handler(event.target.dataset.serial);
      });
    });
  }

  // Bind del formulario
  bindAdminMenu(
    newDish,
    removeDish,
    newCategory,
    removeCategory,
    assignDish,
    desAssignDish,
    newRestaurant,
    modCategoryDish
  ) {
    const newDishLink = document.getElementById("newDish");
    newDishLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        newDish,
        [],
        "#newDish",
        { action: "newDish" },
        "#",
        event
      );
    });

    const removeDishLink = document.getElementById("removeDish");
    removeDishLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        removeDish,
        [],
        "#removeDish",
        { action: "removeDish" },
        "#",
        event
      );
    });

    const newCategoryLink = document.getElementById("newCategory");
    newCategoryLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        newCategory,
        [],
        "#newCategory",
        { action: "newCategory" },
        "#",
        event
      );
    });
    const removeCategoryLink = document.getElementById("deleteCategory");
    removeCategoryLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        removeCategory,
        [],
        "#removeCategory",
        { action: "removeCategory" },
        "#",
        event
      );
    });
    const assignDishLink = document.getElementById("assignDish");
    assignDishLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        assignDish,
        [],
        "#assignDish",
        { action: "assignDish" },
        "#",
        event
      );
    });
    const desAssignDishLink = document.getElementById("desAssignDish");
    desAssignDishLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        desAssignDish,
        [],
        "#desAssignDish",
        { action: "desAssignDish" },
        "#",
        event
      );
    });
    const newRestaurantLink = document.getElementById("newRestaurant");
    newRestaurantLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        newRestaurant,
        [],
        "#newRestaurant",
        { action: "newRestaurant" },
        "#",
        event
      );
    });

    const modCategoryDishLink = document.getElementById("modCategoryDish");
    modCategoryDishLink.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        modCategoryDish,
        [],
        "#modCategoryDish",
        { action: "modCategoryDish" },
        "#",
        event
      );
    });
  }

  bindNewDishForm(handler) {
    newDishValidation(handler);
  }
  bindNewCategoryForm(handler) {
    newCategoryValidation(handler);
  }

  bindAssignDishForm(handler) {
    assignValidationForm(handler);
  }

  bindDesAssignDishForm(handler) {
    desAssignValidationForm(handler);
  }

  bindNewRestaurantForm(handler) {
    newRestaurantValidation(handler);
  }

  bindRemoveProductSelects(hCategories) {
    const rpCategories = document.getElementById("rpCategories");
    rpCategories.addEventListener("change", (event) => {
      this[EXCECUTE_HANDLER](
        hCategories,
        [event.currentTarget.value],
        "#remove-product",
        {
          action: "removeProductByCategory",
          category: event.currentTarget.value,
        },
        "#remove-product",
        event
      );
    });
  }

  bindRemoveProduct(handler) {
    const productList = document.getElementById("product-list");
    const buttons = productList.querySelectorAll("a.btn");
    for (const button of buttons) {
      button.addEventListener("click", function (event) {
        handler(this.dataset.serial);
        event.preventDefault();
      });
    }
  }

  bindRemoveCategoryForm(handler) {
    const removeContainer = document.getElementById("remove-category");
    const buttons = removeContainer.getElementsByTagName("button");
    for (const button of buttons) {
      button.addEventListener("click", function (event) {
        handler(this.dataset.category);
      });
    }
  }

  // Cerrar todas las ventanas
  closeWindow() {
    const botonCerrarVentanas = document.getElementById("botonCerrarVentanas");

    botonCerrarVentanas.addEventListener("click", (event) => {
      for (const ventana of this.ventanas) {
        // Comprobamos si existe la ventana o no esta cerrada para cerrarla
        if (ventana || ventana.closed()) {
          ventana.close();
        }
      }
    });
  }

  // Metodo para mostrar el mensaje de la cookie y el mensaje en el caso de que se haya denegado
  showCookiesMessage() {
    const toast = `<div class="fixed-top p-5 mt-5">
        <div id="cookies-message" class="toast fade show bg-dark text-white w-100 mw-100" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="toast-header">
            <h4 class="me-auto">Aviso de uso de cookies</h4>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close" id="btnDismissCookie"></button>
          </div>
          <div class="toast-body p-4 d-flex flex-column">
            <p>
              Este sitio web almacenda datos en cookies para activar su funcionalidad, entre las que se encuentra
              datos analíticos y personalización. Para poder utilizar este sitio, estás automáticamente aceptando
              que
              utilizamos cookies.
            </p>
            <div class="ml-auto">
              <button type="button" class="btn btn-outline-light mr-3 deny" id="btnDenyCookie" data-bs-dismiss="toast">
                Denegar
              </button>
              <button type="button" class="btn btn-primary" id="btnAcceptCookie" data-bs-dismiss="toast">
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>`;
    document.body.insertAdjacentHTML("afterbegin", toast);

    const cookiesMessage = document.getElementById("cookies-message");
    cookiesMessage.addEventListener("hidden.bs.toast", (event) => {
      event.currentTarget.parentElement.remove();
    });

    // Evento que si acepta la cookie, esta la cambiamos a que si ha sido aceptada
    const btnAcceptCookie = document.getElementById("btnAcceptCookie");
    btnAcceptCookie.addEventListener("click", (event) => {
      setCookie("accetedCookieMessage", "true", 1);
    });

    const denyCookieFunction = (event) => {
      this.dishes.replaceChildren();
      this.dishes.insertAdjacentHTML(
        "afterbegin",
        `<div class="container my-3"><div class="alert alert-warning" role="alert">
            <strong>Para utilizar esta web es necesario aceptar el uso de cookies. Debe recargar la página y aceptar las condicones para seguir navegando. Gracias.</strong>
          </div></div>`
      );
      this.categories.remove();
    };

    // Si no ha sido aceptada añadimos el evento de que necesita recargar
    const btnDenyCookie = document.getElementById("btnDenyCookie");
    btnDenyCookie.addEventListener("click", denyCookieFunction);
    const btnDismissCookie = document.getElementById("btnDismissCookie");
    btnDismissCookie.addEventListener("click", denyCookieFunction);
  }

  showIdentificationLink() {
    // Accede al área de usuario
    const userArea = document.getElementById("userArea");
    // Limpia el área
    userArea.replaceChildren();
    userArea.insertAdjacentHTML(
      "afterbegin",
      `<div
				class="account d-flex
		mx-2 flex-column"
				style="text-align: right; height: 40px"
			>
				<a id="login" href="#">
					<i class="bi bi-person-circle identificate" ariahidden="true"></i> Identificate
				</a>
			</div>`
    );
  }

  showLogin() {
    this.dishes.replaceChildren();
    const login = `<div class="container h-100" style="height: 20vh;">
    <div class="d-flex justify-content-center h-100" style="height: 40vh; margin-top: 50px;">
    <div class="user_card" style='height: 80%;'>
            <div class="d-flex justify-content-center form_container" style='height: 60%;'>
                <form name="fLogin" role="form" novalidate>
                    <div class="input-group mb-3">
                        <div class="input-group-append">
                            <span class="input-group-text"><i class="bi bi-person-circle"></i></span>
                        </div>
                        <input type="text" name="username" class="form-control input_user" value="" placeholder="usuario">
                    </div>
                    <div class="input-group mb-2">
                        <div class="input-group-append">
                            <span class="input-group-text"><i class="bi bi-key-fill"></i></span>
                        </div>
                        <input type="password" name="password" class="form-control input_pass" value="" placeholder="contraseña">
                    </div>
                    <div class="form-group">
                        <div class="custom-control custom-checkbox">
                            <input name="remember" type="checkbox" class="custom-control-input" id="customControlInline">
                            <label class="custom-control-label" for="customControlInline">Recuerdame</label>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center mt-3 login_container">
                        <button class="btn login_btn" type="submit">Acceder</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
`;
    this.dishes.insertAdjacentHTML("afterbegin", login);
  }

  bindIdentificationLink(handler) {
    const login = document.getElementById("login");
    login.addEventListener("click", (event) => {
      this[EXCECUTE_HANDLER](
        handler,
        [],
        "#dishes",
        { action: "login" },
        "#",
        event
      );
    });
  }

  bindLogin(handler) {
    const form = document.forms.fLogin;
    form.addEventListener("submit", (event) => {
      handler(form.username.value, form.password.value, form.remember.checked);
      event.preventDefault();
    });
  }

  showInvalidUserMessage() {
    this.dishes.insertAdjacentHTML(
      "beforeend",
      `<div class="container my-3"><div class="alert alert-warning" role="alert">
		<strong>El usuario y la contraseña no son válidos. Inténtelo nuevamente.</strong>
	</div></div>`
    );
    document.forms.fLogin.reset();
    document.forms.fLogin.username.focus();
    alert("El usuario y la contraseña no son válidos. Inténtelo nuevamente");
  }

  initHistory() {
    history.replaceState({ action: "init" }, null);
  }

  showAuthUserProfile(user) {
    const userArea = document.getElementById("userArea");
    userArea.replaceChildren();
    userArea.insertAdjacentHTML(
      "afterbegin",
      `<div class="account d-flex mx-2 flex-column" style="text-align: right">
				${user.username} <a id="aCloseSession" href="#">Cerrar sesión</a>
			</div>`
    );
  }

  setUserCookie(user) {
    setCookie("activeUser", user.username, 1);
  }

  deleteUserCookie() {
    setCookie("activeUser", "", 0);
  }

  removeAdminMenu() {
    const adminMenu = document.getElementById("navServices");
    if (adminMenu) adminMenu.parentElement.remove();
  }
  bindCloseSession(handler) {
    document
      .getElementById("aCloseSession")
      .addEventListener("click", (event) => {
        handler();
        event.preventDefault();
      });
  }
}

export default RestaurantView;
