$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var peopleId = urlParams.get('pid') || 1; 

    getPeopleDetails(peopleId);

    function getPeopleDetails(peopleId) {
        $.ajax({
            url: `https://swapi.dev/api/people/${peopleId}`, 
            method: "GET",
        }).done(function (peopleDetail) {
            $("#PeopleDetail").html("");

            var template = `
                <div class="container mt-5">
                    <div class="row align-items-center">
                        <div class="row justify-content-between align-items-center mb-4">
                            <div class="col-md-3 text-start">
                                <a href="?pid=${parseInt(peopleId) - 1}" class="btn btn-outline-light btn-lg d-flex align-items-center justify-content-start">
                                    <i class="bi bi-arrow-left-circle"></i>
                                    <span class="ms-2">N.º ${parseInt(peopleId) - 1} </span>
                                </a>
                            </div>

                            <div class="col-md-3 text-end">
                                <a href="?pid=${parseInt(peopleId) + 1}" class="btn btn-outline-light btn-lg d-flex align-items-center justify-content-end">
                                    <span class="me-2">N.º ${parseInt(peopleId) + 1} </span>
                                    <i class="bi bi-arrow-right-circle"></i>
                                </a>
                            </div>
                        </div>
                        
                        <div class="col-md-8 mx-auto">
                            <h1 class="mb-3 text-center">${peopleDetail.name.charAt(0).toUpperCase() + peopleDetail.name.slice(1)} <small>N.º ${peopleDetail.id}</small></h1>
                            <div class="d-flex align-items-center">
                                <div class="pkm-card col-md-4 me-auto">
                                    <img src="${peopleDetail.sprites.front_default}" alt="${peopleDetail.name}" class="pkm-img" style="max-width: 100%;">
                                </div>
                                <div class="col-md-8">
                                    <p>${peopleDetail.description}</p>
                                    <div class="pokemon-details p-3">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <ul class="list-unstyled">
                                                    <li><strong>Altura:</strong> ${peopleDetail.height}</li>
                                                    <li><strong>Peso:</strong> ${peopleDetail.mass}</li>
                                                    <li><strong>Color pelo:</strong> ${peopleDetail.hair_color}</li>
                                                </ul>
                                            </div>
                                            <div class="col-md-6">
                                                <ul class="list-unstyled">
                                                    <li><strong>Género:</strong>${peopleDetail.gender} </li>
                                                    <li><strong>Color ojos:</strong> ${peopleDetail.eye_color}</li>
                                                    <li><strong>Cumpleaños: </strong>${peopleDetail.birth_year}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6 mt-5">
                                            <h5>Tipo</h5>
                                            ${types}
                                        </div>

                                        <div class="col-md-6 mt-5">
                                            <div id="weaknesses"> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            $("#PeopleDetail").append(template); 
        });
    }
    
});