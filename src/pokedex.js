const LINK = "https://pokeapi.co/api/v2/pokemon";

const botonIrAtras = $("#ir-atras");
const botonIrAdelante = $("#ir-adelante");
const botonIrPrincipio = $("#ir-principio");
const botonIrFinal = $("#ir-final");

function listarPokemones(url) {
  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((respuesta) => {
      console.log(respuesta);
      const pokemonesListados = $("#grilla-de-pokemones a");
      if (pokemonesListados.length > 0) pokemonesListados.remove();
      respuesta.results.forEach((pokemon) => {
        let indice = pokemon.url.split("/")[6];
        indice < 9 ? (indice = `0${indice}`) : indice;
        $("#grilla-de-pokemones").append(
          `<a class="pl-6 py-4 bg-slate-100/30 rounded-full shadow shadow-black" id="${
            pokemon.name
          }"><strong>${indice}) </strong>${pokemon.name.toUpperCase()}</a>`
        );
      });

      if (respuesta.next === null) {
        botonIrAdelante.prop("disabled", true);
      } else {
        botonIrAdelante[0].href = respuesta.next;
      }
      if (respuesta.previous === null) {
        botonIrAtras.prop("disabled", true);
      } else {
        botonIrAtras[0].href = respuesta.previous;
      }
    });
}

listarPokemones(LINK);

function generarUrlAtras() {
  listarPokemones(botonIrAtras[0].href);
}
function generarUrlAdelante() {
  listarPokemones(botonIrAdelante[0].href);
}

botonIrAdelante.on("click", generarUrlAdelante);
botonIrAtras.on("click", generarUrlAtras);

// Para derivar a cada pokemon ...
const showEventTarget = (e) => {
  console.log(e.target);
  console.log(e);
  console.log(e.target.attributes.href.value);
};

$("#h1").on("click", showEventTarget);
