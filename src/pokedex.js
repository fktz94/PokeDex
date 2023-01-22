const LINK = "https://pokeapi.co/api/v2/pokemon";

const botonIrAtras = $("#ir-atras");
const botonIrAdelante = $("#ir-adelante");
const botonIrPrincipio = $("#ir-principio");
const botonIrFinal = $("#ir-final");

function listarPokemones(url) {
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((respuesta) => {
      const pokemonesListados = $("#grilla-de-pokemones a");
      if (pokemonesListados.length > 0) pokemonesListados.remove();
      respuesta.results.forEach((pokemon) => {
        let indice = pokemon.url.split("/")[6];
        $("#grilla-de-pokemones").append(
          `<a class="pokemon px-6 py-4 rounded-full shadow bg-slate-100/30 shadow-black" id="${indice}">${
            indice < 9 ? `0${indice}` : indice
          }) ${pokemon.name.toUpperCase()}</a>`
        );
      });

      console.log(respuesta.results);
      botonIrAtras[0].href = respuesta.previous;
      botonIrAdelante[0].href = respuesta.next;

      habilitarYDeshabilitarBotones();

      verPokemon();
    });
}

//

const verPokemon = () => {
  $("#grilla-de-pokemones")
    .children()
    .each((i, pokemon) => {
      pokemon.addEventListener("click", getId);
    });
};

function getId(e) {
  const id = e.target.attributes.id.value;
  fetch(`${LINK}/${id}`)
    .then((respuesta) => respuesta.json())
    .then((respuesta) => console.log(respuesta));
}

//

listarPokemones(LINK);

verPokemon();
const irPrincipio = () =>
  botonIrAtras[0].href === null
    ? botonIrAtras.on("click", () => "")
    : listarPokemones(LINK);

const generarUrlAtras = () =>
  botonIrAtras[0].href === null
    ? botonIrAtras.on("click", () => "")
    : listarPokemones(botonIrAtras[0].href);

const generarUrlAdelante = () =>
  botonIrAdelante[0].href === null
    ? botonIrAdelante.on("click", () => "")
    : listarPokemones(botonIrAdelante[0].href);

const irFinal = () =>
  botonIrAdelante[0].href === null
    ? botonIrFinal.on("click", () => "")
    : listarPokemones(`${LINK}?limit=19&offset=1260`);

botonIrPrincipio.on("click", irPrincipio);
botonIrAtras.on("click", generarUrlAtras);
botonIrAdelante.on("click", generarUrlAdelante);
botonIrFinal.on("click", irFinal);

function habilitarYDeshabilitarBotones() {
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
}

// Derivar a cada pokemon ...
// const showEventTarget = (e) => {
//   console.log(e);
//   console.log(e.target);
//   console.log(e.target.attributes.href.value);
// };
