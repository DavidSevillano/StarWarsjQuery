$(document).ready(function () {
    getPersonajes();

    function getPersonajes() {
        $.ajax({
            url: "https://swapi.dev/api/people", 
            method: "GET",
        }).done(function (resp) {
            $("#ListaPersonajesSW").html("");
            var listadoPersonajes = resp.results;
            
            listadoPersonajes.forEach(function (people) {
                var peopleId = people.url.split("/")[5];

                var template = `
                <div class="col-md-3 mb-4 mt-4">
                    <a class="text-decoration-none" href="detail.html?pid=${peopleId}">
                        <div class="card h-70 bg-secondary text-white p-3">
                            <div class="d-flex justify-content-between align-items-start mb-1">
                                <h5 class="text-white mb-0">${people.name}</h5>
                                <span class="text-white mb-0">ID: ${peopleId}</span>
                            </div>
                            <div class="d-flex justify-content-start mt-2">
                                <span class="badge bg-info me-2">Altura: ${people.height}cm</span>
                                <span class="badge bg-warning me-2">Peso: ${people.mass}kg</span>
                            </div>
                        </div>
                    </a>
                </div>
            `;    
                    $("#ListaPersonajesSW").append(template);
                });
            });
        }
});