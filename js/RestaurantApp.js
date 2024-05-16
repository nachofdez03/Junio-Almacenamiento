import RestaurantsManager from "./Restaurant.js";
import RestaurantController from "./RestaurantController.js";
import RestaurantView from "./RestaurantView.js";
import AuthenticationService from "./Authentication.js";

const RestaurantApp = new RestaurantController(
  RestaurantsManager.getInstance(),
  new RestaurantView(),
  AuthenticationService.getInstance()
);

window.addEventListener("popstate", (event) => {
  if (event.state) {
    historyActions[event.state.action](event);
  }
});

// Objeto que contiene funciones asociadas con acciones específicas del historial
const historyActions = {
  init: () => {
    RestaurantApp.handleInit();
  },

  dishCategoryList: (event) => {
    RestaurantApp.handleDishesCategory(event.state.category);
  },
  dishCategoryListMenu: (event) => {
    RestaurantApp.handleDishesCategory(event.state.category);
  },
  dishAllergenListMenu: (event) => {
    RestaurantApp.handleDishesAllergen(event.state.allergen);
  },
  dishMenuListMenu: (event) => {
    RestaurantApp.handleDishesMenus(event.state.menu);
  },
  restaurantListMenu: (event) => {
    RestaurantApp.handleRestaurant(event.state.restaurant);
  },
  showDish: (event) => {
    RestaurantApp.handleDishInformation(event.state.dish);
  },
  randomDish: (event) => {
    RestaurantApp.handleDishInformation(event.state.dish);
  },
  newDish: () => {
    RestaurantApp.handleNewDishForm();
  },
  removeDish: () => {
    RestaurantApp.handleRemoveDishForm();
  },
  newCategory: () => {
    RestaurantApp.handleNewCategoryForm();
  },
  removeCategory: () => {
    RestaurantApp.handleRemoveCategoryForm();
  },
  assignDish: () => {
    RestaurantApp.handleAssignDish();
  },
  desAssignDish: () => {
    RestaurantApp.handlDesssingDish();
  },
  newRestaurant: () => {
    RestaurantApp.handleNewRestaurantForm();
  },
};

// Reemplaza el estado actual en la historia del navegador con un nuevo estado ('init' en este caso)
history.replaceState({ action: "init" }, null);

export default RestaurantApp;
