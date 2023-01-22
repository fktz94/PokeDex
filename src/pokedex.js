const LINK = "https://pokeapi.co/api/v2/pokemon";

const botonIrAtras = $("#ir-atras");
const botonIrAdelante = $("#ir-adelante");
const botonIrPrincipio = $("#ir-principio");
const botonIrFinal = $("#ir-final");

function listarPokemones(url) {
  moverse = {
    avanzar: Boolean,
    retroceder: Boolean,
  };

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((respuesta) => {
      const pokemonesListados = $("#grilla-de-pokemones a");
      if (pokemonesListados.length > 0) pokemonesListados.remove();
      respuesta.results.forEach((pokemon) => {
        let indice = pokemon.url.split("/")[6];
        indice < 9 ? (indice = `0${indice}`) : indice;
        $("#grilla-de-pokemones").append(
          `<a class="px-6 py-4 bg-slate-100/30 rounded-full shadow shadow-black" id="${
            pokemon.name
          }"><strong>${indice}) </strong>${pokemon.name.toUpperCase()}</a>`
        );
      });

      botonIrAtras[0].href = respuesta.previous;
      botonIrAdelante[0].href = respuesta.next;

      if (botonIrAtras[0].href === null) {
        botonIrAtras.addClass("disabled");
        botonIrPrincipio.addClass("disabled");
      } else {
        botonIrAtras.removeClass("disabled");
        botonIrPrincipio.removeClass("disabled");
      }

      if (botonIrAdelante[0].href === null) {
        botonIrAdelante.addClass("disabled");
        botonIrFinal.addClass("disabled");
      } else {
        botonIrAdelante.removeClass("disabled");
        botonIrFinal.removeClass("disabled");
      }
    });
}

listarPokemones(LINK);

const irPrincipio = () => {
  if (botonIrAtras[0].href === null) {
    botonIrAtras.on("click", () => "");
  } else {
    listarPokemones(LINK);
  }
};

function generarUrlAtras() {
  if (botonIrAtras[0].href === null) {
    botonIrAtras.on("click", () => "");
    botonIrAtras.addClass("disabled");
  } else {
    listarPokemones(botonIrAtras[0].href);
  }
}

function generarUrlAdelante() {
  if (botonIrAdelante[0].href === null) {
    botonIrAdelante.on("click", () => "");
  } else {
    listarPokemones(botonIrAdelante[0].href);
  }
}

const irFinal = () => {
  if (botonIrAdelante[0].href === null) {
    botonIrFinal.on("click", () => "");
  } else {
    listarPokemones(`${LINK}?limit=19&offset=1260`);
  }
};

botonIrPrincipio.on("click", irPrincipio);
botonIrAtras.on("click", generarUrlAtras);
botonIrAdelante.on("click", generarUrlAdelante);
botonIrFinal.on("click", irFinal);

// Para derivar a cada pokemon ...
const showEventTarget = (e) => {
  console.log(e.target);
  console.log(e);
  console.log(e.target.attributes.href.value);
};

$("#h1").on("click", showEventTarget);
