// CONTROLADOR

const MODEL = Symbol("RestaurantModel");
const VIEW = Symbol("RestaurantView");
const LOAD_RESTAURANT_OBJECTS = Symbol("Load Restaurant Objects");

// Uso de cookies y sesiones
const AUTH = Symbol("AUTH");
const USER = Symbol("USER");
const LANGUAGE = Symbol("LANGUAGE");

import { getCookie } from "./Util.js";

class RestaurantController {
  constructor(model, view, auth) {
    this[MODEL] = model; // Modelo
    this[VIEW] = view; // Vista
    this[AUTH] = auth; // Instancia de la autenticacion
    this[USER] = null; // Usuario

    this.onLoad(); // Solo se inicializa cuando se carga la página
    // this.onInit(); // La diferencia es que este se ejecuta en respuesta a una petición del usuario de reiniciar el estado de la aplicación.

    this[VIEW].bindInit(this.handleInit);
  }

  // Mediante un método de nombre de propiedad computado vamos a crear
  // Un método creado privado para instanciar los objetos
  [LOAD_RESTAURANT_OBJECTS]() {
    const bigMac = this[MODEL].createDish(
      "Big Mac",
      "Descubre nuestra icónica Big Mac ahora más caliente, más jugosa y ¡mucho más sabrosa.",
      ["Pan", "Carne", "Queso", "Ensalada", "Salsa Big Mac"],
      "./Imagenes/Hamburguesas/BigMac.png"
    );
    const mcCrispy = this[MODEL].createDish(
      "McCrispy",
      "Si eres un amante del pollo, ¡esta es tu hamburguesa! Disfruta de la irresistible McCrispy®con deliciosa salsa buffalo. ",
      ["Pan", "Pollo", "Queso", "Ensalada", "Bacon", "Salsa Buffalo"],
      "./Imagenes/Hamburguesas/McCrispy.png"
    );

    const McExtremeHuevoDoble = this[MODEL].createDish(
      "McExtreme Huevo",
      "Disfruta de la nueva Grand McExtreme Intense Cheddar con huevo, salsa de queso cheddar, doble bacon crujiente, cebolla crispy y doble queso cheddar... ¡Te encantará!",
      ["Pan", "Carne", "Queso", "Huevo", "Bacon", "Salsa Queso Cheedar"],
      "./Imagenes/Hamburguesas/McExtremeHuevoDoble.png"
    );
    const cbo = this[MODEL].createDish(
      "CBO",
      "Qué esperas para probar nuestra hamburguesa CBO®? Es una de las favoritas en McDonald's",
      [
        "Pan",
        "Pollo",
        "Queso",
        "Ensalada",
        "Cebolla Crispy",
        "Bacon",
        "Salsa CBO",
      ],
      "./Imagenes/Hamburguesas/CBO.png"
    );

    const patatasFritas = this[MODEL].createDish(
      "Patatas Fritas",
      "Son las estrellas del restaurante",
      ["Patatas"],
      "./Imagenes/Hamburguesas/PatatasFritas.png"
    );
    const patatasDeluxe = this[MODEL].createDish(
      "Patatas Deluxe",
      "Estos sabrosos gajos de patata especiadas, servidas con piel y acompañadas " +
        "de una salsa especial a la cebolleta, son una alternativa a las famosas patatas fritas.",
      ["Patatas"],
      "./Imagenes/Hamburguesas/PatatasDeluxe.png"
    );
    const patatasBaconCheese = this[MODEL].createDish(
      "Patatas B&C",
      "La versión más top de nuestras patatas. Acompañadas de salsa de queso y bacon",
      ["Patatas"],
      "./Imagenes/Hamburguesas/PatatasBacon&CheeseMini.png"
    );

    const patatasBaconCheeseDeluxe = this[MODEL].createDish(
      "Patatas B&C Deluxe",
      "Tus patatas favoritas, ahora, con sabor a sour La versión más top de nuestras patatas. Acompañadas de salsa de queso y bacon, ¡no podrás resistirte a ellas!",
      ["Patatas"],
      "./Imagenes/Hamburguesas/PatatasBacon&Cheese.png"
    );

    const cono = this[MODEL].createDish(
      "Cono",
      "Disfruta de nuestro delicioso cono de helado...¡riquísimo!",
      ["Leche"],
      "./Imagenes/Hamburguesas/Cono.png"
    );

    const mcFlurry = this[MODEL].createDish(
      "McFlurry",
      "El inconfundible sabor de Oreo®, los pequeños trozos de galletas de chocolate rellenas de crema junto con nuestra base de helado McFlurry®",
      ["Leche", "Oreo"],
      "./Imagenes/Hamburguesas/McFlurry.png"
    );
    const sundae = this[MODEL].createDish(
      "Sundae",
      "¿Eres un fan de los clásicos? Riquísimo helado sabor vainilla combinado con topping de chocolate",
      ["Leche"],
      "./Imagenes/Hamburguesas/Sundae.png"
    );

    const miniMcFlurry = this[MODEL].createDish(
      "Mini McFlurry",
      "El inconfundible sabor de Oreo®, los pequeños trozos de galletas de chocolate rellenas de crema junto con nuestra base de helado McFlurry®",
      ["Leche", "Oreo"],
      "./Imagenes/Hamburguesas/MiniMcFlurry.png"
    );

    this[MODEL].addDish(
      bigMac,
      mcCrispy,
      McExtremeHuevoDoble,
      cbo,
      patatasFritas,
      patatasDeluxe,
      patatasBaconCheese,
      patatasBaconCheeseDeluxe,
      cono,
      mcFlurry,
      sundae,
      miniMcFlurry
    );

    const mcdonaldCiudadReal = this[MODEL].createRestaurant(
      "Mcdonald Ciudad Real",
      "Mcdonald",
      "Av. de Europa, s/n, 13004 Ciudad Real"
    );
    const mcdonaldGranada = this[MODEL].createRestaurant(
      "Mcdonald Granada",
      "Mcdonald",
      "C. Gran Vía de Colón, 8, Centro, 18010 Granada"
    );
    const mcdonaldNewYork = this[MODEL].createRestaurant(
      "Mcdonald New York",
      "Mcdonald",
      "966 3rd Ave, Estados Unidos, NY 10022, New York"
    );

    this[MODEL].addRestaurant(
      mcdonaldCiudadReal,
      mcdonaldGranada,
      mcdonaldNewYork
    );

    const hamburguesas = this[MODEL].createCategory(
      "Hamburguesas",
      "Hamburguesas",
      "./Imagenes/Hamburguesas/BigMac.png"
    );
    const patatas = this[MODEL].createCategory(
      "Patatas Fritas",
      "Patatas Fritas",
      "./Imagenes/Hamburguesas/PatatasFritas.png"
    );

    const helados = this[MODEL].createCategory(
      "Helados",
      "Helados",
      "./Imagenes/Hamburguesas/Cono.png"
    );

    this[MODEL].addCategory(hamburguesas, patatas, helados);

    const queso = this[MODEL].createAllergen("Queso", "Alergia al Queso");
    const leche = this[MODEL].createAllergen("Leche ", "Alergia a la Leche");
    const pan = this[MODEL].createAllergen("Pan", "Alergia al Pan");
    const bacon = this[MODEL].createAllergen("Bacon", "Alergia al Bacon");

    this[MODEL].addAllergen(queso, leche, pan);

    const menuDeluxe = this[MODEL].createMenu("Menu Deluxe", "Menu Deluxe");
    const menuHappyMeal = this[MODEL].createMenu("Happy Meal", "Happy Meal");
    const mcMenu = this[MODEL].createMenu("McMenu", "McMenu");

    this[MODEL].addMenu(menuDeluxe, menuHappyMeal, mcMenu);

    // Ahora añadimos las categorias y alergias a los platos, y los platos a los menus

    this[MODEL].assignCategoryToDish(bigMac, hamburguesas);
    this[MODEL].assignCategoryToDish(mcCrispy, hamburguesas);
    this[MODEL].assignCategoryToDish(McExtremeHuevoDoble, hamburguesas);
    this[MODEL].assignCategoryToDish(cbo, hamburguesas);
    this[MODEL].assignCategoryToDish(patatasFritas, patatas);
    this[MODEL].assignCategoryToDish(patatasDeluxe, patatas);
    this[MODEL].assignCategoryToDish(patatasBaconCheese, patatas);
    this[MODEL].assignCategoryToDish(patatasBaconCheeseDeluxe, patatas);
    this[MODEL].assignCategoryToDish(cono, helados);
    this[MODEL].assignCategoryToDish(mcFlurry, helados);
    this[MODEL].assignCategoryToDish(sundae, helados);
    this[MODEL].assignCategoryToDish(miniMcFlurry, helados);

    this[MODEL].assignAllergenToDish(bigMac, pan);
    this[MODEL].assignAllergenToDish(mcCrispy, pan, queso);
    this[MODEL].assignAllergenToDish(McExtremeHuevoDoble, pan, bacon, queso);
    this[MODEL].assignAllergenToDish(cbo, pan, bacon);
    this[MODEL].assignAllergenToDish(patatasBaconCheeseDeluxe, queso, bacon);
    this[MODEL].assignAllergenToDish(patatasBaconCheese, queso, bacon);
    this[MODEL].assignAllergenToDish(cono, leche);
    this[MODEL].assignAllergenToDish(mcFlurry, leche);
    this[MODEL].assignAllergenToDish(sundae, leche);
    this[MODEL].assignAllergenToDish(miniMcFlurry, leche);

    this[MODEL].assignDishToMenu(
      menuDeluxe,
      McExtremeHuevoDoble,
      patatasBaconCheeseDeluxe,
      mcFlurry
    );
    this[MODEL].assignDishToMenu(menuHappyMeal, bigMac, patatasFritas, cono);
    this[MODEL].assignDishToMenu(mcMenu, cbo, patatasDeluxe, sundae);
  }

  onLoad = () => {
    // Si no existe la cookie mostramos el mensaje donde tiene que aceptars
    this[LOAD_RESTAURANT_OBJECTS]();
    this.onAddCategory();
    this.onAddAllergen();
    this.onAddMenu();
    this.ondAddRestaurant();
    this.onInit();

    if (getCookie("accetedCookieMessage") !== "true") {
      this[VIEW].showCookiesMessage();
    }
    const userCookie = getCookie("activeUser");
    console.log(userCookie);

    if (userCookie) {
      const user = this[AUTH].getUser(userCookie);
      if (user) {
        this[USER] = user;
        this.onOpenSession();
      }
    } else {
      this[VIEW].showIdentificationLink();
      this[VIEW].bindIdentificationLink(this.handleLoginForm);
    }
  };

  onInit = () => {
    this[VIEW].showCategories(this[MODEL].getterCategories());
    this[VIEW].showRandomDishes(this[MODEL].getterDishes());
    this[VIEW].bindRandomDishes(this.handleDishInformation);
    this[VIEW].bindCategoryDishes(this.handleDishesCategory);
  };

  onCloseSession() {
    this[USER] = null;
    this[VIEW].deleteUserCookie();
    this[VIEW].showIdentificationLink();
    this[VIEW].bindIdentificationLink(this.handleLoginForm);
    this[VIEW].removeAdminMenu();
  }

  onOpenSession() {
    this.onInit();
    this[VIEW].initHistory();
    this[VIEW].showAuthUserProfile(this[USER]);
    this[VIEW].showAdminMenu();
    this[VIEW].bindCloseSession(this.handleCloseSession);
    this[VIEW].bindAdminMenu(
      this.handleNewDishForm,
      this.handleRemoveDishForm,
      this.handleNewCategoryForm,
      this.handleRemoveCategoryForm,
      this.handleAssignDish,
      this.handlDesssingDish,
      this.handleNewRestaurantForm
    );
  }

  //handleAssignDish handlDesssingDish

  handleInit = () => {
    this.onInit();
  };

  onAddCategory = () => {
    this[VIEW].showCategoriesinMenu(this[MODEL].getterCategories());
    this[VIEW].bindCategoryDishesMenu(this.handleDishesCategory);
  };

  onAddAllergen = () => {
    this[VIEW].showAllergensinMenu(this[MODEL].getterAllergens());
    this[VIEW].bindAllergenDishesMenu(this.handleDishesAllergen);
  };

  onAddMenu = () => {
    this[VIEW].showMenusinMenu(this[MODEL].getterMenus());
    this[VIEW].bindMenuDishesMenu(this.handleDishesMenus);
  };

  ondAddRestaurant = () => {
    this[VIEW].showRestaurantsinMenu(this[MODEL].getterRestaurants());
    this[VIEW].bindRestaurantMenu(this.handleRestaurant);
  };

  handleDishesCategory = (categoryName) => {
    const category = this[MODEL].getCategory(categoryName);
    console.log(category.name);
    const dishes = this[MODEL].getDishesInCategory(category);
    this[VIEW].showDishes(dishes);
    this[VIEW].bindDish(this.handleDishInformation);
  };

  handleDishesAllergen = (allergenName) => {
    const allergen = this[MODEL].getAllergen(allergenName);
    const dishes = this[MODEL].getDishesWithAllergen(allergen);
    this[VIEW].showDishes(dishes);
    this[VIEW].bindDish(this.handleDishInformation);
  };

  handleDishesMenus = (menuName) => {
    const menu = this[MODEL].getMenu(menuName);
    const dishes = this[MODEL].getDishesInMenu(menu);
    this[VIEW].showDishes(dishes);
    this[VIEW].bindDish(this.handleDishInformation);
  };

  handleRestaurant = (restaurantName) => {
    const restaurant = this[MODEL].getRestaurant(restaurantName);
    this[VIEW].showRestaurantInformation(restaurant);
  };

  // Manejador para enseñar la informacion de un plato
  handleDishInformation = (dishName) => {
    const dish = this[MODEL].getDish(dishName);
    this[VIEW].showDishInformation(dish);
    this[VIEW].bindShowDishInNewWindow(this.handleShowDishInNewWindow);
    this[VIEW].closeWindow();
  };

  // Manejador para
  handleShowDishInNewWindow = (dishName) => {
    const dish = this[MODEL].getDish(dishName);
    this[VIEW].showDishInNewWindow(dish);
  };

  // Manejador para el formulario
  handleNewDishForm = () => {
    this[VIEW].showNewDishForm(
      this[MODEL].getterCategories(),
      this[MODEL].getterAllergens()
    );

    this[VIEW].bindNewDishForm(this.handleCreateDish);
  };

  handleRemoveDishForm = () => {
    this[VIEW].showRemoveDishForm(this[MODEL].getterCategories());
    this[VIEW].bindRemoveProductSelects(this.handleRemoveProductListByCategory);
  };

  handleRemoveProductListByCategory = (categoryName) => {
    console.log(categoryName);
    const category = this[MODEL].getCategory(categoryName);
    this[VIEW].showRemoveDishList(this[MODEL].getDishesInCategory(category));
    this[VIEW].bindRemoveProduct(this.handleRemoveProduct);
  };

  handleNewCategoryForm = () => {
    this[VIEW].showNewCategoryForm();
    this[VIEW].bindNewCategoryForm(this.handleCreateCategory);
  };

  handleRemoveCategoryForm = () => {
    this[VIEW].showRemoveCategoryForm(this[MODEL].getterCategories());
    this[VIEW].bindRemoveCategoryForm(this.handleRemoveCategory);
  };

  handleAssignDish = () => {
    this[VIEW].showAssignDishForm(
      this[MODEL].getterMenus(),
      this[MODEL].getterDishes()
    );
    this[VIEW].bindAssignDishForm(this.handleAssignDishMenu);
  };

  handlDesssingDish = () => {
    this[VIEW].showDesAssignDishForm(
      this[MODEL].getterMenus(),
      this[MODEL].getterDishes()
    );
    this[VIEW].bindDesAssignDishForm(this.handleDesAssingDishMenu);
  };

  handleNewRestaurantForm = () => {
    this[VIEW].showNewRestaurantForm(this[MODEL].getterCategories());
    this[VIEW].bindNewRestaurantForm(this.handleCreateRestaurant);
  };

  handleCreateDish = (
    name,
    description,
    ingredients,
    image,
    categories,
    allergens
  ) => {
    // Creamos nuestro plato pasandole el nombre
    const newDish = this[MODEL].createDish(name);

    // Asignamos los demas valores al plato si estos existen
    if (description) newDish.description = description; // Añadimos descripcion

    // Pasamos la cadena de texto con los ingredientes a array y se lo añadimos a nuestro plato
    if (ingredients) newDish.ingredients = ingredients.split(",");

    let done;
    let error;

    // Ahora asignamos los alergenos y categorias al plato

    try {
      // Añadimos el plato lo primero de todo
      this[MODEL].addDish(newDish);
      console.log("lo añade?");

      categories.forEach((name) => {
        const category = this[MODEL].createCategory(name);

        this[MODEL].assignCategoryToDish(newDish, category);
      });

      allergens.forEach((name) => {
        const allergen = this[MODEL].createAllergen(name);
        this[MODEL].assignAllergenToDish(newDish, allergen);

        // Asignamos que todo fue correctamente
        done = true;
      });
    } catch (exeption) {
      // Si ha salido mal

      done = false;
      error = exeption;
    }

    this[VIEW].showDishModal(done, newDish, error);
  };

  handleRemoveProduct = (serial) => {
    let done;
    let error;
    let product;
    try {
      console.log(serial);
      product = this[MODEL].getDish(serial);
      console.log(product);
      this[MODEL].removeDish(product);
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }

    this[VIEW].showRemoveProductModal(done, product, error);
  };
  handleCreateCategory = (categoryName, description, url) => {
    const cat = this[MODEL].createCategory(categoryName, description, url);
    let done;
    let error;
    try {
      this[MODEL].addCategory(cat);
      this.onAddCategory();
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showNewCategoryModal(done, cat, error);
  };

  handleRemoveCategory = (categoryName) => {
    let done;
    let error;
    let category;
    try {
      category = this[MODEL].getCategory(categoryName);
      this[MODEL].removeCategory(category);
      done = true;
      this.onAddCategory();
      this.handleRemoveCategoryForm();
    } catch (exception) {
      done = false;
      error = exception;
    }
    this[VIEW].showRemoveCategoryModal(done, category, error);
  };

  // Asignacion de platos a menu
  handleAssignDishMenu = (menuName, dishes) => {
    // Declaramos las variables de nuestro handler
    let done;
    let error;
    let dishObj;
    let menuObj;

    try {
      // Cogemos el menu, ya que existe por lo cual nos lo va a devolver
      menuObj = this[MODEL].createMenu(menuName);
      let platosMenu = this[MODEL].getDishesInMenu(menuObj);

      console.log(menuObj.name);

      console.log(dishes);
      // Hacemos exactamente lo mismo con los platos y se lo asignamos al menu
      for (const dish of dishes) {
        // Recogemos el plato
        console.log(dish);
        dishObj = this[MODEL].createDish(dish);
        console.log(dishObj);

        // Asignamos el plato al menu, primero comprobando que no existe

        for (const platoMenu of platosMenu) {
          if (dishObj.name == platoMenu.name) {
            console.log("FALSO");
            done = false;
            break;
          } else {
            done = true;
          }
        }
        if ((done = true)) {
          this[MODEL].assignDishToMenu(menuObj, dishObj);
        }
      }
    } catch (exception) {
      console.log(exception);
      done = false;
      error = exception;
    }

    // Modal
    this[VIEW].showAssignDishModal(done, menuObj, error);
  };

  handleDesAssingDishMenu = (menuName, dishes) => {
    // Declaramos las variables de nuestro handler
    let done;
    let error;
    let dishObj;
    let menuObj;

    try {
      // Recogemos el menu
      menuObj = this[MODEL].createMenu(menuName);
      console.log(menuObj);

      // Iteramos sobre los platos y se lo asignamos al menu
      for (const dish of dishes) {
        // Recogemos el plato
        dishObj = this[MODEL].createDish(dish);

        // Asignamos el plato al menu
        this[MODEL].deassignDishToMenu(menuObj, dishObj);
      }

      // Indicamos que la operacion se ha cumplido
      done = true;
    } catch (exception) {
      console.log(exception);
      done = false;
      error = exception;
    }

    // Modal
    this[VIEW].showDesAssignDishModal(done, menuObj, error);
  };

  handleCreateRestaurant = (name, location, description) => {
    // Creamos el restaurante pasandole el nombre
    const restaurant = this[MODEL].createRestaurant(
      name,
      description,
      location
    );
    // Asignamos los demas valores la restaurante

    let done;
    let error;

    try {
      // Añadimos el plato al array
      this[MODEL].addRestaurant(restaurant);
      this.ondAddRestaurant();
      // Indicamos que las operaciones se han realizado de manera correcta
      done = true;
    } catch (exception) {
      done = false;
      error = exception;
    }

    // Modal
    this[VIEW].showNewRestaurantModal(done, restaurant, error);
  };

  handleLoginForm = () => {
    this[VIEW].showLogin();
    this[VIEW].bindLogin(this.handleLogin);
  };

  handleLogin = (username, password, remember) => {
    if (this[AUTH].validateUser(username, password)) {
      this[USER] = this[AUTH].getUser(username);
      this.onOpenSession();
      console.log("Todo correcto");

      if (remember) {
        this[VIEW].setUserCookie(this[USER]);
      }
    } else {
      this[VIEW].showInvalidUserMessage();
    }
  };

  // Manejador para cerrar la sesión
  handleCloseSession = () => {
    // Realiza determinadas acciones
    this.onCloseSession();
    this.onInit();
    this[VIEW].initHistory();
  };
}

export default RestaurantController;
