const LINK = "https://pokeapi.co/api/v2/pokemon";

const botonIrAtras = $("#ir-atras");
const botonIrAdelante = $("#ir-adelante");
const botonIrPrincipio = $("#ir-principio");
const botonIrFinal = $("#ir-final");
const botonVolverAtras = $("#volver-atras");

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

      botonIrAtras[0].href = respuesta.previous;
      botonIrAdelante[0].href = respuesta.next;
      botonVolverAtras[0].href = url;

      habilitarYDeshabilitarBotones();

      getId();
    });
}
listarPokemones(LINK);

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

const getId = () => {
  $("#grilla-de-pokemones")
    .children()
    .each((i, pokemon) => {
      pokemon.addEventListener("click", llamarPokemon);
    });
};

function llamarPokemon(e) {
  const id = e.target.attributes.id.value;

  fetch(`${LINK}/${id}`)
    .then((respuesta) => respuesta.json())
    .then((respuesta) => {
      console.log(respuesta);
      $("#h2").hide();
      $("#grilla-de-pokemones").hide();
      $("#flechas").hide();
      $("#nombre-pokemon")
        .removeClass("hidden")
        .text(respuesta.name.toUpperCase());
      $("#imagen-pokemon")
        .removeClass("hidden")
        .attr("src", `${respuesta.sprites.other.home.front_default}`);
      $("#data-pokemon").removeClass("hidden");

      // TRAER INFO DE C/POKEMON

      respuesta.types.forEach((tipo, i) => {
        i === 0
          ? $("#tipo-pokemon").append($(`<strong> ${tipo.type.name}</strong>`))
          : $("#tipo-pokemon").append(
              $(`<strong>, ${tipo.type.name}</strong>`)
            );
      });

      $("#peso-pokemon").append(`<strong> ${respuesta.weight}</strong>`);

      respuesta.abilities.forEach((habilidad, i) => {
        i === 0
          ? $("#habilidad-pokemon").append(
              $(`<strong> ${habilidad.ability.name}</strong>`)
            )
          : $("#habilidad-pokemon").append(
              $(`<strong>, ${habilidad.ability.name}</strong>`)
            );
      });

      $("#altura-pokemon").append(`<strong> ${respuesta.height}</strong>`);

      $("#volver-atras").removeClass("hidden");
    });
}

const volverAtras = () => {
  $("#h2").show();
  $("#grilla-de-pokemones").show();
  $("#flechas").show();
  $("#nombre-pokemon").addClass("hidden");
  $("#imagen-pokemon").addClass("hidden");
  $("#data-pokemon").addClass("hidden");
  $("#tipo-pokemon strong").remove();
  $("#peso-pokemon strong").remove();
  $("#habilidad-pokemon strong").remove();
  $("#altura-pokemon strong").remove();

  botonVolverAtras.addClass("hidden");
  listarPokemones(botonVolverAtras[0].href);
};

botonVolverAtras.on("click", volverAtras);
