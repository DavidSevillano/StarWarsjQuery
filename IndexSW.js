$(document).ready(function () {
    getPokemonListV2();

    function getPokemonListV2() {
        $.ajax({
            url: "https://swapi.dev/api/people", 
            method: "GET",
        }).done(function (resp) {
            $("#ListaPersonajesSW").html("");
            var listradoPersonajes = resp.results;
            
            listradoPersonajes.forEach(function (people) {
                var peopleId = people.url.split("/")[6];

                $.ajax({
                    url: pokemon.url,
                    method: "GET",
                }).done(function (pokemonDetail) {
                    var types = pokemonDetail.types.map(function (type) {
                        return `<span class="${type.type.name}-box me-2 fs-6">${type.type.name.toUpperCase()}</span>`;
                    }).join("");

                    var template = `
                        <div class="col-md-3 mb-4 mt-4">
                            <a class="text-decoration-none" href="detail.html?pid=${pokemonId}">
                                <div class=>
                                    <div class="d-flex justify-content-between align-items-start mb-1 p-2">
                                        <h5 class="text-white mb-0">${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h5>
                                        <span class="text-white mb-0">N.º ${pokemonId}</span>
                                    </div>
                                    <div class="card h-70 bg-secondary text-white">
                                        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png" class="card-img" alt="${pokemon.name}">
                                    </div>
                                    <div class="d-flex justify-content-start mt-2">
                                        ${types}
                                    </div>
                                </div>
                            </a>
                        </div>
                    `;
                    
                    $("#ListaPersonajesSW").append(template);
                });
            });
        });
    }
});