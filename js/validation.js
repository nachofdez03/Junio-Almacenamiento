// Script que creamos para submit y validación del formulario

// Funcion con la que mostraremos le feedback al usuario, es decir indica si es valido o no un campo del formulario que le hemos pasado
function showFeedBack(input, valid, message) {
  const validClass = valid ? "is-valid" : "is-invalid";
  const messageDiv = valid
    ? input.parentElement.querySelector("div.valid-feedback")
    : input.parentElement.querySelector("div.invalid-feedback");
  for (const div of input.parentElement.getElementsByTagName("div")) {
    div.classList.remove("d-block");
  }
  messageDiv.classList.remove("d-none");
  messageDiv.classList.add("d-block");
  input.classList.remove("is-valid");
  input.classList.remove("is-invalid");
  input.classList.add(validClass);
  if (message) {
    messageDiv.innerHTML = message;
  }
}

function defaultCheckElement(event) {
  this.value = this.value.trim();
  if (!this.checkValidity()) {
    showFeedBack(this, false);
  } else {
    showFeedBack(this, true);
  }
}

// Creamos el metodo con el que validaremos el plato del formualario
export function newDishValidation(handler) {
  console.log("entramos en la funcion de validar");
  // Obtenemos el formulario que vamos a validar
  const form = document.forms.fNewDish;

  form.setAttribute("novalidate", true);

  // Evento para cuando pulsemos el boton de enviar en el formulario seleccionado
  // validamos todos los datos
  form.addEventListener("submit", function (event) {
    console.log("le has dado a enviar");
    // Creamos las variables necesarias

    let isValid = true; // Variable booleana donde indicaremos si los valores son validos
    let firstInvalidElement = null;

    // EL THIS VA A SER EL EVENTO

    // Validamos el nombre
    if (!this.ndName.checkValidity()) {
      isValid = false;

      showFeedBack(this.ndName, false);
      firstInvalidElement = this.ndName;
    } else {
      console.log("nombreeeeeeeeeeeee");
      showFeedBack(this.ndName, true);
    }

    // Validamos la descripcion
    if (!this.ndDescription.checkValidity()) {
      isValid = false;
      showFeedBack(this.ndDescription, false);
      firstInvalidElement = this.ndDescription;
    } else {
      console.log("descripcion");
      showFeedBack(this.ndDescription, true);
    }

    // Validamos el string de ingredientes
    if (!this.ndIngredients.checkValidity()) {
      isValid = false;
      showFeedBack(this.ndIngredients, false);
      firstInvalidElement = this.ndIngredients;
    } else {
      console.log("ingredientes");
      showFeedBack(this.ndIngredients, true);
    }

    // Validamos que haya al menos una categoria seleccionada
    if (!this.ndCategories.checkValidity()) {
      isValid = false;
      showFeedBack(this.ndCategories, false);
      firstInvalidElement = this.ndCategories;
    } else {
      console.log("categorias");

      showFeedBack(this.ndCategories, true);
    }

    // Validamos que haya al menos un alergeno seleccionado
    if (!this.ndAllergens.checkValidity()) {
      isValid = false;
      showFeedBack(this.ndAllergens, false);
      firstInvalidElement = this.ndAllergens;
    } else {
      console.log("alergenos");
      showFeedBack(this.ndAllergens, true);
    }

    // Validamos que la foto esta bien
    if (!this.ndImage.checkValidity()) {
      isValid = false;
      showFeedBack(this.ndImage, false);
      firstInvalidElement = this.ndImage;
    } else {
      console.log("foto");
      showFeedBack(this.ndImage, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
      console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB");
    } else {
      console.log("entra al recoger los datos");
      // Recogemos las categorias seleccionadas y las pasamos a map
      const categories = [...this.ndCategories.selectedOptions].map(
        (option) => option.value
      );

      // Recogemos los alergenos seleccionados y los pasamos a map
      const allergens = [...this.ndAllergens.selectedOptions].map(
        (option) => option.value
      );

      // Le pasamos a nuestro handler todos los valores para la creacion del plato

      //AQUI SI QUE LLEGA, Y HACE UN CONSOLE LOG DE TODO
      console.log(this.ndName.value);
      console.log(this.ndDescription.value);
      console.log(this.ndIngredients.value);

      handler(
        this.ndName.value,
        this.ndDescription.value,
        this.ndIngredients.value,
        this.ndImage.value,
        categories,
        allergens
      );
    }

    // Quitamos los valores por defecto
    event.preventDefault();
    event.stopPropagation();
  });

  // Evento para cuando pulsemos el boton de cancelar
  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.ndName.focus();
  });

  form.ndName.addEventListener("change", defaultCheckElement);
  form.ndDescription.addEventListener("change", defaultCheckElement);
  form.ndIngredients.addEventListener("change", defaultCheckElement);
  form.ndImage.addEventListener("change", defaultCheckElement);
}

export function newCategoryValidation(handler) {
  const form = document.forms.fNewCategory;
  form.setAttribute("novalidate", true);
  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    this.ncDescription.value = this.ncDescription.value.trim();
    showFeedBack(this.ncDescription, true);

    if (!this.ncUrl.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncUrl, false);
      firstInvalidElement = this.ncUrl;
    } else {
      showFeedBack(this.ncUrl, true);
    }
    if (!this.ncTitle.checkValidity()) {
      isValid = false;
      showFeedBack(this.ncTitle, false);
      firstInvalidElement = this.ncTitle;
    } else {
      showFeedBack(this.ncTitle, true);
    }
    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(this.ncTitle.value, this.ncDescription.value, this.ncUrl.value);
    }
    event.preventDefault();
    event.stopPropagation();
  });
  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.ncTitle.focus();
  });
  form.ncTitle.addEventListener("change", defaultCheckElement);
  form.ncUrl.addEventListener("change", defaultCheckElement);
}

export function assignValidationForm(handler) {
  // Obtenemos el formulario que vamos a validar
  const form = document.forms.fAssignDish;
  form.setAttribute("novalidate", true);

  // Evento para cuando pulsemos el boton de enviar
  // realizamos la validadcion de todos los datos
  form.addEventListener("submit", function (event) {
    // Creamos las variables necesarias
    let isValid = true; // Variable booleana donde indicaremos si los valores son validos
    let firstInvalidElement = null;

    // Validamos que se haya seleccionado un menu
    if (!this.ndMenus.checkValidity()) {
      isValid = false;
      showFeedBack(this.ndMenus, false);
      firstInvalidElement = this.ndMenus;
    } else {
      showFeedBack(this.ndMenus, true);
    }

    // Validamos que se haya seleccionado un plato
    if (!this.ndDishes.checkValidity()) {
      isValid = false;
      showFeedBack(this.ndDishes, false);
      firstInvalidElement = this.ndDishes;
    } else {
      showFeedBack(this.ndDishes, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      // Recogemos los platos seleccionados
      const dishes = [...this.ndDishes.selectedOptions].map(
        (option) => option.value
      );

      // Le pasamos a nuestro handler todos los valores para la creacion del plato
      handler(this.ndMenus.value, dishes);
    }

    // Quitamos los valores por defecto
    event.preventDefault();
    event.stopPropagation();
  });

  // Evento para cuando pulsemos el boton de cancelar
  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.ndMenus.focus();
  });
}

export function desAssignValidationForm(handler) {
  // Obtenemos el formulario que vamos a validar
  const form = document.forms.fDesAssignDish;
  form.setAttribute("novalidate", true);

  // Evento para cuando pulsemos el boton de enviar
  // realizamos la validadcion de todos los datos
  form.addEventListener("submit", function (event) {
    // Creamos las variables necesarias
    let isValid = true; // Variable booleana donde indicaremos si los valores son validos
    let firstInvalidElement = null;

    // Validamos que se haya seleccionado un menu
    if (!this.ndMenus.checkValidity()) {
      isValid = false;
      showFeedBack(this.ndMenus, false);
      firstInvalidElement = this.ndMenus;
    } else {
      showFeedBack(this.ndMenus, true);
    }

    // Validamos que se haya seleccionado un plato
    if (!this.ndDishes.checkValidity()) {
      isValid = false;
      showFeedBack(this.ndDishes, false);
      firstInvalidElement = this.ndDishes;
    } else {
      showFeedBack(this.ndDishes, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      // Recogemos los platos seleccionados
      const dishes = [...this.ndDishes.selectedOptions].map(
        (option) => option.value
      );

      // Le pasamos a nuestro handler todos los valores para la creacion del plato
      handler(this.ndMenus.value, dishes);
    }

    // Quitamos los valores por defecto
    event.preventDefault();
    event.stopPropagation();
  });

  // Evento para cuando pulsemos el boton de cancelar
  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.ndMenus.focus();
  });
}

export function newRestaurantValidation(handler) {
  const form = document.forms.fNewRestaurant;
  form.setAttribute("novalidate", "");

  form.addEventListener("submit", function (event) {
    let isValid = true;
    let firstInvalidElement = null;

    this.nrDescription.value = this.nrDescription.value.trim();
    showFeedBack(this.nrDescription, true);

    this.nrLocation.value = this.nrLocation.value.trim();
    showFeedBack(this.nrLocation, true);

    if (!this.nrName.checkValidity()) {
      isValid = false;
      showFeedBack(this.nrName, false);
      firstInvalidElement = this.nrName;
    } else {
      showFeedBack(this.nrName, true);
    }

    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      handler(
        this.nrName.value,
        this.nrLocation.value,
        this.nrDescription.value
      );
    }

    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback"
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.nrName.focus();
  });

  form.nrName.addEventListener("change", defaultCheckElement);
  form.nrLocation.addEventListener("change", defaultCheckElement);
}
