$(document).ready(function () {
    var urlParams = new URLSearchParams(window.location.search);
    var peopleId = urlParams.get('pid') || 1; 

    getPeopleDetails(peopleId);

    function getPeopleDetails(peopleId) {
        $.ajax({
            url: `https://swapi.dev/api/people/${peopleId}/`, 
            method: "GET",
        }).done(function (peopleDetail) {
            $("#PeopleDetail").html(""); 

            $.ajax({
                url: peopleDetail.homeworld,
                method: "GET",
            }).done(function (planetDetail) {
                var template = `
                    <div class="container mt-5">
                        <div class="row justify-content-between mb-4">
                            <div class="col-md-3 text-start">
                                ${peopleId > 1 ? `
                                <a href="?pid=${parseInt(peopleId) - 1}" class="btn btn-outline-light btn-lg d-flex align-items-center justify-content-start">
                                    <i class="bi bi-arrow-left-circle"></i>
                                    <span class="ms-2">N.º ${parseInt(peopleId) - 1}</span>
                                </a>
                                ` : ''}
                            </div>
                            <div class="col-md-3 text-end">
                                <a href="?pid=${parseInt(peopleId) + 1}" class="btn btn-outline-light btn-lg d-flex align-items-center justify-content-end">
                                    <span class="me-2">N.º ${parseInt(peopleId) + 1}</span>
                                    <i class="bi bi-arrow-right-circle"></i>
                                </a>
                            </div>
                        </div>
                        <div class="row justify-content-center">
                            <div class="col-md-8">
                                <h1 class="mx-auto text-center mb-5">${peopleDetail.name.charAt(0).toUpperCase() + peopleDetail.name.slice(1)}</h1>
                                <div class="card mx-auto text-center">
                                    <div class="card-body">
                                        <ul class="list-unstyled">
                                            <li><strong>Planeta natal:</strong> ${planetDetail.name}</li>
                                            <li><strong>Altura:</strong> ${peopleDetail.height} cm</li>
                                            <li><strong>Peso:</strong> ${peopleDetail.mass} kg</li>
                                            <li><strong>Color pelo:</strong> ${peopleDetail.hair_color}</li>
                                            <li><strong>Género:</strong> ${peopleDetail.gender}</li>
                                            <li><strong>Color ojos:</strong> ${peopleDetail.eye_color}</li>
                                            <li><strong>Año de nacimiento:</strong> ${peopleDetail.birth_year}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                $("#PeopleDetail").append(template); 
            });
        });
    }
});
