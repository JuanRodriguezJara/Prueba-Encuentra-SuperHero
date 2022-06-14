$(document).ready(function () {
    $("form").submit(function (event) {
        event.preventDefault()
        let valueInput = $("#superheroInput").val();

        $.ajax({
            url: "https://superheroapi.com/api/4905856019427443/" + valueInput,
            success: function (data) {
                let imagen = data.image.url;
                let nombre = data.name;
                let conexiones = data.connections["group-affiliation"];
                let publicado = data.biography.publisher;
                let ocupacion = data.work.occupation;
                let firstap = data.biography["first-appearance"];
                let altura = data.appearance.height;
                let peso = data.appearance.weight;
                let alianzas = data.biography.aliases;


                $("#superheroImg").html(`
                    <div class="text-center">
                    <img src="${imagen}" width="200"  />
                    </div>
                `);
                $("#superheroInfo").html(`
                    <div class="table">  
                    <h3>SuperHeroe Encontrado</h3>                  
                    <h5><strong>Nombre:</strong> ${nombre}</h5>
                    <h6><strong>Conexiones:</strong> ${conexiones}</h6>
                    <h6><strong>Publicado por:</strong> ${publicado}</h6>
                    <h6><strong>Ocupación:</strong> ${ocupacion}</h6>
                    <h6><strong>Primera Aparición:</strong> ${firstap}</h6>
                    <h6><strong>Altura:</strong> ${altura}</h6>
                    <h6><strong>Peso:</strong> ${peso}</h6>
                    <h6><strong>Alianzas:</strong> ${alianzas}</h6>
                </div>
                <br>
                `);

                let estadisticas = []

                estadisticas.push({
                    y: data.powerstats.intelligence,
                    label: "Inteligencia"
                }, {
                    y: data.powerstats.strength,
                    label: "Fuerza"
                }, {
                    y: data.powerstats.speed,
                    label: "Velocidad"
                }, {
                    y: data.powerstats.durability,
                    label: "Durabilidad"
                }, {
                    y: data.powerstats.power,
                    label: "Poder"
                }, {
                    y: data.powerstats.combat,
                    label: "combate"
                });

                let config = {
                    animationEnabled: true,
                    title: {
                        text: `Estadisticas de Poder para ${nombre}`
                    },
                    data: [{
                        type: "pie",
                        startAngle: 25,
                        tootTipContent: "<b>{label</b>: {y}%",
                        showInLegend: "true",
                        legendText: "{label}",
                        indexLabelFontSize: 16,
                        indexLabel: "{label} ({y})",
                        dataPoints: estadisticas,
                        },
                    ],
                };

                let chart = new CanvasJS.Chart("superheroStats", config);
                chart.render();
                console.log(estadisticas)
            },
        });
    });
});


