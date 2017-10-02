//var gauge2= loadLiquidFillGauge("fillgauge2", 28);
var config2 = liquidFillGaugeDefaultSettings();
config2.circleColor = "#ceea48";
config2.textColor = "#553300";
config2.waveTextColor = "#805615";
config2.waveColor = "#ceea48";
config2.circleThickness = 0.1;
config2.circleFillGap = 0.2;
config2.textVertPosition = 0.8;
config2.waveAnimateTime = 2000;
config2.waveHeight = 0.1;
config2.waveCount = 2;
var config4 = liquidFillGaugeDefaultSettings();
config4.circleColor = "#3A6EFF";
config4.textColor = "#553300";
config4.waveTextColor = "#805615";
config4.waveColor = "#3A6EFF";
config4.circleThickness = 0.1;
config4.circleFillGap = 0.2;
config4.textVertPosition = 0.8;
config4.waveAnimateTime = 2000;
config4.waveHeight = 0.1;
config4.waveCount = 2;
var config1 = liquidFillGaugeDefaultSettings();
config1.circleColor = "#ff5722";
config1.textColor = "#553300";
config1.waveTextColor = "#805615";
config1.waveColor = "#ff5722";
config1.circleThickness = 0.1;
config1.circleFillGap = 0.2;
config1.textVertPosition = 0.8;
config1.waveAnimateTime = 2000;
config1.waveHeight = 0.1;
config1.waveCount = 2;
var config3 = liquidFillGaugeDefaultSettings();
config3.circleColor = "#D4AB6A";
config3.textColor = "#553300";
config3.waveTextColor = "#805615";
config3.waveColor = "#AA7D39";
config3.circleThickness = 0.1;
config3.circleFillGap = 0.2;
config3.textVertPosition = 0.8;
config3.waveAnimateTime = 2000;
config3.waveHeight = 0.1;
config3.waveCount = 2;

function cargarGaguesPadres(indices, idDiv, configuracion) {
    var html = "";

    var divVelocimetros = $('#' + idDiv);

    var i = 0;
    for (var item in indices) {
        var selector = $('#myModal');
        html = "<div class='col-md-6'>" +
            "<div style='height: 60px;'><h5 style='text-align: center;'><strong><a id='linkButton" + idDiv + i + "'> " + indices[i].indicePadre.nombrecat + " " + indices[i].indicePadre.nombrecla + " </a>";

        html = html + "</strong></h5></div>" +
           "<svg class='col-md-12' style='padding-right: 0px; padding-left: 0px;' id='gague" + idDiv + i + "' style='padding-right: 0px; padding-left: 0px;'></svg>" +
           "</div>";
        divVelocimetros.append(html);
        i++;
    }

    var i = 0;
    var valor = 0.0;
    for (indice in indices) {
        valor = indices[i].valorCla;
        loadLiquidFillGauge('gague' + idDiv + i, valor, configuracion, 5);
        $('#linkButton' + idDiv + i).click(function () {
            $('#myModal').modal();
            var item = this.id.substr(this.id.length - 1)//(this.id).replace("linkButton", "");
            var nombre = indices[item].indicePadre.nombrecat + " " + indices[item].indicePadre.nombrecla;
            var idPadre = indices[item].indicePadre.idcla;
            $('#ContentPlaceHolder1_contenidoPrincipal_ModalIndice_lblModalTitle').text(nombre);
            // cargar velocimetro padre
            $('#gaguePadre').html("");
            loadLiquidFillGauge('gaguePadre', indices[item].valorCla, config4);

            // cargar velocimetros hijos
            $('#ContentPlaceHolder1_contenidoPrincipal_ModalIndice_divHijos').html("");
            var j = 0;
            var hijosIndice = indices[item].indicePadre.IndicesHijos;
            for (var indexHijo in hijosIndice) {
                
                    $('#ContentPlaceHolder1_contenidoPrincipal_ModalIndice_divHijos').append('<div class="col-md-4" id="gasGague' + j + '" style="height: 150px; margin-bottom: 10px;"><div class="chart-gauge"></div></div>')
                    var valorHijo = hijosIndice[indexHijo].valorHijo * 100;
                    cargarVelocimetros('gasGague' + j, valorHijo);
                    $('#gasGague' + j).append("<p style='text-align: center;'><strong>" + valorHijo + "%</strong> " + hijosIndice[indexHijo].nombreScla + "</p>");
                    j++;
                
            }

        });
        i++;
    }
}
/*
function cargarGagues(indices, idDiv, configuracion) {
    var html = "";

    //var random = new Random();
    var divVelocimetros = $('#' + idDiv);

    var indicesPadres = [], itemPadre;
    for (var item in indices) {
        itemPadre = { idPadre: indices[item].indice.idClasificacion_indice, nombrePadre: indices[item].indice.nombre_cla, valorIndicesPadre: indices[item].indice.valor_RIP }
        if (!contains(indicesPadres, itemPadre)) {
            indicesPadres.push(itemPadre);
        }
    }
    function contains(a, obj) {
        if (!a) return false;
        for (var i = 0; i < a.length; i++) {
            if (a[i].idPadre === obj.idPadre) {
                return true;
            }
        }
        return false;
    }
    var i = 0;
    for (var item in indicesPadres) {
        var selector = $('#myModal');
        html = "<div class='col-md-6'>" +
            "<div style='height: 60px;'><h5 style='text-align: center;'><strong><a id='linkButton" + idDiv + i + "'> " + indicesPadres[i].nombrePadre + " </a>";

        html = html + "</strong></h5></div>" +
           "<svg class='col-md-12' style='padding-right: 0px; padding-left: 0px;' id='gague" + idDiv + i + "' style='padding-right: 0px; padding-left: 0px;'></svg>" +
           "</div>";
        divVelocimetros.append(html);
        i++;
    }

    var i = 0;
    var valor = 0.0;
    for (indice in indicesPadres) {
        valor = indicesPadres[i].valorIndicesPadre;
        loadLiquidFillGauge('gague' + idDiv + i, valor, configuracion, 5);
        $('#linkButton' + idDiv + i).click(function () {
            $('#myModal').modal();
            var item = this.id.substr(this.id.length - 1)//(this.id).replace("linkButton", "");
            var nombre = indicesPadres[item].nombrePadre;
            var idPadre = indicesPadres[item].idPadre;
            $('#ContentPlaceHolder1_contenidoPrincipal_ModalIndice_lblModalTitle').text(nombre);
            // cargar velocimetro padre
            $('#gaguePadre').html("");
            loadLiquidFillGauge('gaguePadre', indicesPadres[item].valorIndicesPadre, config2);

            // cargar velocimetros hijos
            $('#ContentPlaceHolder1_contenidoPrincipal_ModalIndice_divHijos').html("");
            var j = 0;
            for (var i in indices) {
                if (indices[i].indice.idClasificacion_indice === indicesPadres[item].idPadre) {
                    $('#ContentPlaceHolder1_contenidoPrincipal_ModalIndice_divHijos').append('<div class="col-md-4" id="gasGague' + j + '" style="height: 150px; margin-bottom: 10px;"><div class="chart-gauge"></div></div>')
                    var valorHijo = (Math.random() * 100).toFixed(2);
                    cargarVelocimetros('gasGague' + j, valorHijo);
                    $('#gasGague' + j).append("<p style='text-align: center;'><strong>" + valorHijo + "%</strong> " + indices[i].indice.nombre_Scla + "</p>");
                    j++;
                }
            }

        });
        i++;
    }

    //cargarBarras(indices, indicesPadres);
}
*/
function histogramaDividido(data) {
    var margin = { top: 20, right: 20, bottom: 150, left: 40 },
                width = 1000 - margin.left - margin.right,
                height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .rangeRound([height, 0]);

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    var svg = d3.select("#graph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var active_link = "0"; //to control legend selections and hover
    var legendClicked; //to control legend selections
    var legendClassArray = []; //store legend classes to select bars in plotSingle()
    var y_orig; //to store original y-posn


    crearHistoDividi(data);
    function crearHistoDividi(data) {
        color.domain(d3.keys(data[0]).filter(function (key) { return key !== "State"; }));

        data.forEach(function (d) {
            var mystate = d.State; //add to stock code
            var y0 = 0;
            //d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
            d.ages = color.domain().map(function (name) { return { mystate: mystate, name: name, y0: y0, y1: y0 += +d[name] }; });
            d.total = d.ages[d.ages.length - 1].y1;
        });

        data.sort(function (a, b) { return b.total - a.total; });

        x.domain(data.map(function (d) { return d.State; }));
        y.domain([0, d3.max(data, function (d) { return d.total; })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis).
            selectAll("text")
             .style("text-anchor", "end")
             .attr("dx", "-.8em")
             .attr("dy", ".15em")
             .attr("transform", "rotate(-65)");;

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end");
        //.text("Population");

        var state = svg.selectAll(".state")
            .data(data)
          .enter().append("g")
            .attr("class", "g")
            .attr("transform", function (d) { return "translate(" + "0" + ",0)"; });
        //.attr("transform", function (d) { return "translate(" + x(d.State) + ",0)"; });

        state.selectAll("rect")
            .data(function (d) {
                return d.ages;
            })
          .enter().append("rect")
            .attr("width", x.rangeBand())
            .attr("y", function (d) { return y(d.y1); })
            .attr("x", function (d) { //add to stock code
                return x(d.mystate)
            })
            .attr("height", function (d) { return y(d.y0) - y(d.y1); })
            .attr("class", function (d) {
                classLabel = d.name.replace(/\s/g, ''); //remove spaces
                return "class" + classLabel;
            })
            .style("fill", function (d) {
                var nombre = d.name;
                switch (nombre) {
                    case "Fortalezas":
                        return "#8bc34a";
                        break;
                    case "Oportunidades":
                        return "#2196f3";
                        break;
                    case "Debilidades":
                        return "#f44336";
                        break;
                    default:
                        return color(d.name);
                }

            });

        state.selectAll("rect")
             .on("mouseover", function (d) {

                 var delta = d.y1 - d.y0;
                 var xPos = parseFloat(d3.select(this).attr("x"));
                 var yPos = parseFloat(d3.select(this).attr("y"));
                 var height = parseFloat(d3.select(this).attr("height"))

                 d3.select(this).attr("stroke", "blue").attr("stroke-width", 0.8);

                 /*svg.append("text")
                 .attr("x",xPos)
                 .attr("y",yPos +height/2)
                 .attr("class","tooltip")
                 .text(d.name +": "+ delta); */

             })
             .on("mouseout", function () {
                 svg.select(".tooltip").remove();
                 d3.select(this).attr("stroke", "pink").attr("stroke-width", 0.2);

             })
             .on("click", function (d) {
                 var delta = d.y1 - d.y0;
                 var xPos = parseFloat(d3.select(this).attr("x"));
                 var yPos = parseFloat(d3.select(this).attr("y"));
                 var height = parseFloat(d3.select(this).attr("height"))

                 d3.select(this).attr("stroke", "blue").attr("stroke-width", 0.8);

                 svg.append("text")
                 .attr("x", xPos)
                 .attr("y", yPos + height / 2)
                 .attr("class", "tooltip")
                 .text(d.name + ": " + delta + " " + d.mystate + " Click!!! ");
             })


        var legend = svg.selectAll(".legend")
            .data(color.domain().slice().reverse())
          .enter().append("g")
            //.attr("class", "legend")
            .attr("class", function (d) {
                legendClassArray.push(d.replace(/\s/g, '')); //remove spaces
                return "legend";
            })
            .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

        //reverse order to match order in which bars are stacked    
        legendClassArray = legendClassArray.reverse();

        legend.append("rect")
            .attr("x", width - 18)
            .attr("width", 18)
            .attr("height", 18)
            .style("fill", function (d) {
                var nombre = d;
                switch (nombre) {
                    case "Fortalezas":
                        return "#8bc34a";
                        break;
                    case "Oportunidades":
                        return "#2196f3";
                        break;
                    case "Debilidades":
                        return "#f44336";
                        break;
                    default:
                        return color;
                }
            })
            .attr("id", function (d, i) {
                return "jh" + d.replace(/\s/g, '');
            })
            .on("mouseover", function () {

                if (active_link === "0") d3.select(this).style("cursor", "pointer");
                else {
                    if (active_link.split("class").pop() === this.id.split("jh").pop()) {
                        d3.select(this).style("cursor", "pointer");
                    } else d3.select(this).style("cursor", "auto");
                }
            })
            .on("click", function (d) {

                if (active_link === "0") { //nothing selected, turn on this selection
                    d3.select(this)
                      .style("stroke", "black")
                      .style("stroke-width", 2);

                    active_link = this.id.split("jh").pop();
                    plotSingle(this);

                    //gray out the others
                    for (i = 0; i < legendClassArray.length; i++) {
                        if (legendClassArray[i] != active_link) {
                            d3.select("#jh" + legendClassArray[i])
                              .style("opacity", 0.5);
                        }
                    }

                } else { //deactivate
                    if (active_link === this.id.split("jh").pop()) {//active square selected; turn it OFF
                        d3.select(this)
                          .style("stroke", "none");

                        active_link = "0"; //reset

                        //restore remaining boxes to normal opacity
                        for (i = 0; i < legendClassArray.length; i++) {
                            d3.select("#jh" + legendClassArray[i])
                              .style("opacity", 1);
                        }

                        //restore plot to original
                        restorePlot(d);

                    }

                } //end active_link check


            });

        legend.append("text")
            .attr("x", width - 24)
            .attr("y", 9)
            .attr("dy", ".35em")
            .style("text-anchor", "end")
            .text(function (d) { return d; });

        function restorePlot(d) {

            state.selectAll("rect").forEach(function (d, i) {
                //restore shifted bars to original posn
                d3.select(d[idx])
                  .transition()
                  .duration(1000)
                  .attr("y", y_orig[i]);
            })

            //restore opacity of erased bars
            for (i = 0; i < legendClassArray.length; i++) {
                if (legendClassArray[i] != class_keep) {
                    d3.selectAll(".class" + legendClassArray[i])
                      .transition()
                      .duration(1000)
                      .delay(750)
                      .style("opacity", 1);
                }
            }

        }

        function plotSingle(d) {

            class_keep = d.id.split("jh").pop();
            idx = legendClassArray.indexOf(class_keep);

            //erase all but selected bars by setting opacity to 0
            for (i = 0; i < legendClassArray.length; i++) {
                if (legendClassArray[i] != class_keep) {
                    d3.selectAll(".class" + legendClassArray[i])
                      .transition()
                      .duration(1000)
                      .style("opacity", 0);
                }
            }

            //lower the bars to start on x-axis
            y_orig = [];
            state.selectAll("rect").forEach(function (d, i) {

                //get height and y posn of base bar and selected bar
                h_keep = d3.select(d[idx]).attr("height");
                y_keep = d3.select(d[idx]).attr("y");
                //store y_base in array to restore plot
                y_orig.push(y_keep);

                h_base = d3.select(d[0]).attr("height");
                y_base = d3.select(d[0]).attr("y");

                h_shift = h_keep - h_base;
                y_new = y_base - h_shift;

                //reposition selected bars
                d3.select(d[idx])
                  .transition()
                  .ease("bounce")
                  .duration(1000)
                  .delay(750)
                  .attr("y", y_new);

            })

        }

    };

}

function cargarDataHistoDivi(indicesColegio) {
    var dataCompleto = [], indicesPositivos = [], indicesNegativos = [], indicesNeutros = [];
    var data = [];

    for (var item in indicesColegio) {
        var indicePadre = indicesColegio[item].indicePadre;
        var indicesHijos = indicePadre.IndicesHijos;
        var asignacionPadre; //Inicia positivo
        for (var itemHijo in indicesHijos) {
            if (itemHijo == 0) { asignacionPadre = indicesHijos[itemHijo].idAsignacion }
            var valorIndice = indicesHijos[itemHijo].valorHijo * 100;
            var indiceCompleto = { idInd: indicesHijos[itemHijo].idResultado, Debilidades: valorIndice / 3, Fortalezas: valorIndice / 3, Oportunidades: valorIndice / 3, State: indicesColegio[item].indicePadre.nombrecla + " " + indicesHijos[itemHijo].nombreScla };
            var indiceHijo = { Debilidades: valorIndice / 3, Fortalezas: valorIndice / 3, Oportunidades: valorIndice / 3, State: indicesColegio[item].indicePadre.nombrecla + " " + indicesHijos[itemHijo].nombreScla };
            if (asignacionPadre != indicesHijos[itemHijo].idAsignacion) { asignacionPadre = 3 }
            if (!contains(dataCompleto, indiceCompleto)) {
                dataCompleto.push(indiceCompleto);
                data.push(indiceHijo);
            }
        }
        switch (asignacionPadre) {
            case 1:
                indicesPositivos.push(indicesColegio[item]);
                break;
            case 2:
                indicesNegativos.push(indicesColegio[item]);
                break;
            default:
                indicesNeutros.push(indicesColegio[item]);
                break;
        }
    }

    function contains(a, obj) {
        if (!a) return false;
        for (var i = 0; i < a.length; i++) {
            if (a[i].idInd === obj.idInd) {
                return true;
            }
        }
        return false;
    }

    histogramaDividido(data);
    // Ordenar los indices

    // Separar los indices
    var fortalezas = [], debilidades = [], oportunidades = [], longitud;

    indicesOrdenados = indicesPositivos;
    longitud = indicesOrdenados.length;
    fortalezas = indicesOrdenados.slice(0, longitud / 3);
    oportunidades = indicesOrdenados.slice(longitud / 3, 2 * longitud / 3);
    debilidades = indicesOrdenados.slice(2 * longitud / 3);
    cargarGaguesPadres(fortalezas, "postivosFortalezas", config2);
    cargarGaguesPadres(debilidades, "postivosDebilidades", config2);
    cargarGaguesPadres(oportunidades, "postivosOportunidades", config2);

    indicesOrdenados = indicesNegativos;
    longitud = indicesOrdenados.length;
    fortalezas = indicesOrdenados.slice(0, longitud / 3);
    oportunidades = indicesOrdenados.slice(longitud / 3, 2 * longitud / 3);
    debilidades = indicesOrdenados.slice(2 * longitud / 3);
    cargarGaguesPadres(oportunidades, "negativosOportunidades", config1);
    cargarGaguesPadres(fortalezas, "negativosFortalezas", config1);
    cargarGaguesPadres(debilidades, "negativosDebilidades", config1);

    indicesOrdenados = indicesNeutros;
    longitud = indicesOrdenados.length;
    fortalezas = indicesOrdenados.slice(0, longitud / 3);
    oportunidades = indicesOrdenados.slice(longitud / 3, 2 * longitud / 3);
    debilidades = indicesOrdenados.slice(2 * longitud / 3);
    cargarGaguesPadres(fortalezas, "neutrosFortalezas", config3);
    cargarGaguesPadres(oportunidades, "neutrosOportunidades", config3);
    cargarGaguesPadres(debilidades, "neutrosDebilidades", config3);
}

$(document).ready(function () {
    //document.getElementById('titulo').scrollIntoView();
    /*var indices =
        [
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                    "nombrecat": "Personal",
                    "idcla": "ef77861d-5497-45b6-80ae-06b2ba021988",
                    "nombrecla": "Propension a ser victima",
                    "IndicesHijos": [
                    {
                        "idScla": "60929569-1011-46dc-b2fd-a9df2f47e351",
                        "nombreScla": "recreo ",
                        "valorHijo": 0.1529,
                        "idAsignacion": 2,
                        "idResultado": "940feb70-64f8-4054-9cf3-02405cc1bd61"
                    },
                    {
                        "idScla": "32479ed5-8006-40ae-a950-b33a56f86c00",
                        "nombreScla": "bullying",
                        "valorHijo": 0.0968,
                        "idAsignacion": 2,
                        "idResultado": "deec93de-0013-4f15-896f-178b36753cea"
                    },
                    {
                        "idScla": "30dffc27-cfb1-4d71-bf5c-329986e567d6",
                        "nombreScla": "psicologico",
                        "valorHijo": 0.1332,
                        "idAsignacion": 2,
                        "idResultado": "27b2fafc-1126-43c6-9023-31dbe8fe66e3"
                    },
                    {
                        "idScla": "d80c6590-4111-4d72-ae63-358c0a1f5f7e",
                        "nombreScla": "Bus ",
                        "valorHijo": 0.1264,
                        "idAsignacion": 2,
                        "idResultado": "b8792c63-d6a9-44b9-8e4c-6e76726f7afe"
                    },
                    {
                        "idScla": "70a58487-adbf-4858-8e7b-15d6d692d4a0",
                        "nombreScla": "fisico",
                        "valorHijo": 0.1618,
                        "idAsignacion": 2,
                        "idResultado": "dd5d97c6-6efc-425b-a4f0-7f437b551de4"
                    },
                    {
                        "idScla": "fa151cca-c65a-4077-b7d0-b0473496222f",
                        "nombreScla": "rechazo",
                        "valorHijo": 0.2442,
                        "idAsignacion": 2,
                        "idResultado": "8ac459c6-6c6a-4f3f-931a-8e8911a09a82"
                    },
                    {
                        "idScla": "fa7a9d18-68a6-4f3d-931b-6f41fa7daece",
                        "nombreScla": "clase",
                        "valorHijo": 0.1794,
                        "idAsignacion": 2,
                        "idResultado": "cc06d24e-dea4-4d37-bc73-9ee3868c819d"
                    },
                    {
                        "idScla": "e03d779c-0e64-48a6-bb3d-c7a12f263ec8",
                        "nombreScla": "material",
                        "valorHijo": 0.2140,
                        "idAsignacion": 2,
                        "idResultado": "e5bf17fa-b182-4dd6-838c-aca56328ee85"
                    },
                    {
                        "idScla": "95ee1a0d-e6ff-4823-b3ac-bdd1a70404fa",
                        "nombreScla": "Cyberbullying",
                        "valorHijo": 0.0136,
                        "idAsignacion": 2,
                        "idResultado": "770723a8-3c50-4a91-aa3d-b5ed1c60583c"
                    },
                    {
                        "idScla": "8382e9f5-58f5-4390-9864-2c5c04ae5d6a",
                        "nombreScla": "verbal",
                        "valorHijo": 0.2204,
                        "idAsignacion": 2,
                        "idResultado": "b8cf9164-587b-4084-a92f-ba505bc95083"
                    },
                    {
                        "idScla": "cc311a57-1525-4c98-a504-a26b01c74895",
                        "nombreScla": "armas",
                        "valorHijo": 0.1264,
                        "idAsignacion": 2,
                        "idResultado": "611dfdf3-05d4-4214-825a-dded5c53e0d0"
                    },
                    {
                        "idScla": "d3d25930-c8eb-4b25-8411-46ae7af1e2bd",
                        "nombreScla": "Robo",
                        "valorHijo": 0.4441,
                        "idAsignacion": null,
                        "idResultado": "4c39daad-a030-425f-b120-eca02797e436"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                    "nombrecat": "Personal",
                    "idcla": "15ab3cd4-3bbd-461a-b3a1-eb3c6aca7701",
                    "nombrecla": "Habilidades",
                    "IndicesHijos": [
                    {
                        "idScla": "bd0eee66-d5dc-400a-afe6-de61c661986f",
                        "nombreScla": "deportes practicados",
                        "valorHijo": 1.0000,
                        "idAsignacion": 1,
                        "idResultado": "06d3e6e9-1e11-4ce4-818e-06afdf5fcd37"
                    },
                    {
                        "idScla": "0cf9a842-c599-4d20-8304-e96b92345cd8",
                        "nombreScla": "Atrevido",
                        "valorHijo": 0.1010,
                        "idAsignacion": null,
                        "idResultado": "6722956b-38cf-483a-bfbd-2b2dc0701ef7"
                    },
                    {
                        "idScla": "9ffc196c-cb1e-4cd9-a75e-bf1ea623b749",
                        "nombreScla": "Confiabilidad",
                        "valorHijo": 0.0926,
                        "idAsignacion": null,
                        "idResultado": "0fb9ceb7-5332-461f-9720-5e57b829c8a1"
                    },
                    {
                        "idScla": "f62bae97-54a3-4e62-ba06-3f1d938f3214",
                        "nombreScla": "Timidez",
                        "valorHijo": 0.2017,
                        "idAsignacion": 3,
                        "idResultado": "be908627-6389-4f3e-bd4d-8e5f719bef25"
                    },
                    {
                        "idScla": "cad285a6-2bb7-43be-8fe2-5f93f3009e7e",
                        "nombreScla": "Equipo del colegio",
                        "valorHijo": 0.6294,
                        "idAsignacion": 1,
                        "idResultado": "08b10532-382b-4690-bce4-9e7251878201"
                    },
                    {
                        "idScla": "daf101e9-841a-45d5-a5fe-b7bf6b17230c",
                        "nombreScla": "social",
                        "valorHijo": 0.3032,
                        "idAsignacion": 1,
                        "idResultado": "d6c040ff-6952-4b35-a4b6-b77dcdcbc5f7"
                    },
                    {
                        "idScla": "9b18a4f5-eda0-4206-827c-3793d359d3a4",
                        "nombreScla": "emprendimiento",
                        "valorHijo": 0.1894,
                        "idAsignacion": 1,
                        "idResultado": "f92adaec-d7f6-4432-929d-c3890fbe97ef"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                    "nombrecat": "Personal",
                    "idcla": "1b3d3c2a-5f59-483e-b823-62658ee80def",
                    "nombrecla": "Barrio",
                    "IndicesHijos": [
                    {
                        "idScla": "354585cc-faf3-4e38-ba88-252c2160d0a8",
                        "nombreScla": "seguridad",
                        "valorHijo": 0.8014,
                        "idAsignacion": 1,
                        "idResultado": "64c9e46e-c9ae-470c-ac8b-0b5364be6df7"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                    "nombrecat": "Personal",
                    "idcla": "9c6f7fc3-bdd6-48c8-a9a9-83d143dcbb09",
                    "nombrecla": "Familia",
                    "IndicesHijos": [
                    {
                        "idScla": "66fe7c35-6018-4a2b-b7e7-0cfdc79e6e44",
                        "nombreScla": "obediencia",
                        "valorHijo": 0.4351,
                        "idAsignacion": 1,
                        "idResultado": "77203124-709c-4d78-8118-1a794f389eac"
                    },
                    {
                        "idScla": "08f72f3e-267a-4b75-aac0-63fb2e1dda2f",
                        "nombreScla": "relación",
                        "valorHijo": 0.7947,
                        "idAsignacion": 3,
                        "idResultado": "8bdc255d-876b-4df2-a85f-a77d32a90ce6"
                    },
                    {
                        "idScla": "4b7ce2f8-1fe5-487c-9c8e-08c9259da28a",
                        "nombreScla": "Supervision",
                        "valorHijo": 0.3766,
                        "idAsignacion": 2,
                        "idResultado": "02cf4738-3492-4799-af9d-c913c55113cf"
                    },
                    {
                        "idScla": "9c360d5a-9123-4d18-8aa8-ecb0af156e7b",
                        "nombreScla": "castigo",
                        "valorHijo": 0.3423,
                        "idAsignacion": 3,
                        "idResultado": "85b7af3b-a987-439d-9b98-c9d33d49d50d"
                    },
                    {
                        "idScla": "02bf3f3a-6ee7-4983-b089-82285434cb2d",
                        "nombreScla": "Conflictividad",
                        "valorHijo": 0.4879,
                        "idAsignacion": 2,
                        "idResultado": "20c24e4d-a6fe-4cd6-9fc2-d6b65d9db923"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                    "nombrecat": "Personal",
                    "idcla": "a7fc52af-80d3-4d6b-9cd5-ecf343f836d6",
                    "nombrecla": "Disciplina",
                    "IndicesHijos": [
                    {
                        "idScla": "6fa9eeb2-eeec-483b-bfb9-9258e102609d",
                        "nombreScla": "Disciplina",
                        "valorHijo": 0.2643,
                        "idAsignacion": 1,
                        "idResultado": "6c2884eb-fe35-4cdd-a418-398271076cb6"
                    },
                    {
                        "idScla": "89c9f7a6-b261-41dc-9ba5-bae14a5589ce",
                        "nombreScla": "Indisciplina academica",
                        "valorHijo": 0.2010,
                        "idAsignacion": 2,
                        "idResultado": "49a2587a-242b-4147-8292-5036ae4aa92f"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                    "nombrecat": "Personal",
                    "idcla": "b5a8ee95-1d31-474c-8f25-8da5dfa8c6fa",
                    "nombrecla": "Reconocimiento",
                    "IndicesHijos": [
                    {
                        "idScla": "7cc43aea-49a5-40e7-88d2-dbc18a35e2cc",
                        "nombreScla": "Deportes",
                        "valorHijo": 0.1347,
                        "idAsignacion": 1,
                        "idResultado": "8e56ec51-3a6b-4f44-839b-3ca294db8cf7"
                    },
                    {
                        "idScla": "7f24cf30-a1e5-4fe4-8c5b-23ee03b6a7c2",
                        "nombreScla": "Académico",
                        "valorHijo": 0.1368,
                        "idAsignacion": 1,
                        "idResultado": "e2baafbf-bb45-464e-9873-8fb78c84e63e"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                    "nombrecat": "Personal",
                    "idcla": "3f58e2d9-190b-42d0-b2df-66df3b462dcc",
                    "nombrecla": "adaptacion ",
                    "IndicesHijos": [
                    {
                        "idScla": "0299e133-400d-4dc2-9e11-ad2f3f593643",
                        "nombreScla": "salon",
                        "valorHijo": 0.8941,
                        "idAsignacion": 1,
                        "idResultado": "dcf3cbad-bece-4410-bb7e-3d4c67a95b12"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                    "nombrecat": "Personal",
                    "idcla": "c839b755-563a-4e2e-a34c-318b5cba5d61",
                    "nombrecla": "popularidad ",
                    "IndicesHijos": [
                    {
                        "idScla": "70a58487-adbf-4858-8e7b-15d6d692d4a0",
                        "nombreScla": "fisico",
                        "valorHijo": 0.1231,
                        "idAsignacion": 3,
                        "idResultado": "e5b4319b-0045-4331-8ee4-42054e978808"
                    },
                    {
                        "idScla": "d1e6485c-1a8d-463a-902d-9d8a8a5fffb1",
                        "nombreScla": "popularidad",
                        "valorHijo": 0.1442,
                        "idAsignacion": 3,
                        "idResultado": "77bdc722-fcb0-4b1a-9709-6c6dadb310f9"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "3815b3fc-b272-4af5-aab6-b6e6cc9e6965",
                    "nombrecat": "Sistema",
                    "idcla": "d7aaf37c-b734-49d0-a774-aa8e2e6c1df6",
                    "nombrecla": "Desercion ",
                    "IndicesHijos": [
                    {
                        "idScla": "353e2b0e-24bd-45d7-b916-2f4e1c848b10",
                        "nombreScla": "Inseguridad",
                        "valorHijo": 0.1000,
                        "idAsignacion": 2,
                        "idResultado": "862af6d9-de41-4483-a7b7-4a71cbf72f39"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "f374a557-67a9-4ad5-a793-eda4bf692754",
                    "nombrecat": "Ambiente escolar",
                    "idcla": "92919621-0a17-4fb2-899a-c0b505191695",
                    "nombrecla": "Conflictividad",
                    "IndicesHijos": [
                    {
                        "idScla": "815fca8f-6aa2-4683-b909-9caa77cddb21",
                        "nombreScla": "frecuencia",
                        "valorHijo": 0.4030,
                        "idAsignacion": 2,
                        "idResultado": "5679ca0d-c525-4636-b4f0-4f8189f207ba"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                    "nombrecat": "Personal",
                    "idcla": "2e2e0034-1734-4ca8-8044-5af6d2d833b7",
                    "nombrecla": "red social externa",
                    "IndicesHijos": [
                    {
                        "idScla": "deb598be-763e-43b2-b17c-fa7d29dbe50b",
                        "nombreScla": "Barrio",
                        "valorHijo": 0.4397,
                        "idAsignacion": 3,
                        "idResultado": "1f0b809a-42c1-4c7a-9eb2-550c8c528ff7"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                    "nombrecat": "Personal",
                    "idcla": "7a5a1009-32bb-406d-9af1-1b95a8b7cd9f",
                    "nombrecla": "carácter",
                    "IndicesHijos": [
                    {
                        "idScla": "12d6ccf4-5740-40b4-bf43-0a9d897d243b",
                        "nombreScla": "Fuerte",
                        "valorHijo": 0.1789,
                        "idAsignacion": 2,
                        "idResultado": "735a9b5a-ef2c-4277-bd71-65b88cd070a3"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "e61975cb-5a91-4e33-b0d0-0408bffbb2f6",
                    "nombrecat": "Factores personales",
                    "idcla": "facfcc6e-ef42-48ea-97c2-71f34e4b8ead",
                    "nombrecla": "Genero",
                    "IndicesHijos": [
                    {
                        "idScla": null,
                        "nombreScla": null,
                        "valorHijo": 0.0100,
                        "idAsignacion": 3,
                        "idResultado": "4327aaa8-74a0-47fa-a443-74266fa2a4ca"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                    "nombrecat": "Personal",
                    "idcla": "d7aaf37c-b734-49d0-a774-aa8e2e6c1df6",
                    "nombrecla": "Desercion ",
                    "IndicesHijos": [
                    {
                        "idScla": "002556aa-95b8-4d65-8a59-6080f240c0fd",
                        "nombreScla": "interes",
                        "valorHijo": 0.3382,
                        "idAsignacion": 2,
                        "idResultado": "dcf2f134-0e58-4e38-afe7-79461d7dafce"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "e61975cb-5a91-4e33-b0d0-0408bffbb2f6",
                    "nombrecat": "Factores personales",
                    "idcla": "b1c513cd-91cf-4072-a066-4f45c80bdfc1",
                    "nombrecla": "intereses",
                    "IndicesHijos": [
                    {
                        "idScla": "11158042-89ba-4555-b1ec-f2ef84f8cb04",
                        "nombreScla": "early adopters",
                        "valorHijo": 0.1031,
                        "idAsignacion": 3,
                        "idResultado": "e5e9ab50-bd40-46f7-93c7-8096d6c0a139"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                    "nombrecat": "Personal",
                    "idcla": "521cb3d2-ba70-4c26-af30-325cd263b913",
                    "nombrecla": "Apoyo",
                    "IndicesHijos": [
                    {
                        "idScla": "a4522694-ba76-4cff-98d1-bb11c995cabd",
                        "nombreScla": "FAMILIA",
                        "valorHijo": 0.6996,
                        "idAsignacion": 1,
                        "idResultado": "e5eacfbb-27c5-4191-b276-852e44f9f0aa"
                    },
                    {
                        "idScla": "d9742888-447e-4b06-896a-702aa4762cd3",
                        "nombreScla": "profesores",
                        "valorHijo": 0.5606,
                        "idAsignacion": 1,
                        "idResultado": "a0075aff-23dd-4d74-b31f-c8689d52c088"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                    "nombrecat": "Personal",
                    "idcla": "33cfe0bf-34e9-450d-8ac9-66d8d5cafd24",
                    "nombrecla": "Ambiente social",
                    "IndicesHijos": [
                    {
                        "idScla": "81966c9b-d3fa-4d0b-bee2-52fd925f7519",
                        "nombreScla": "percepcion de soledad",
                        "valorHijo": 0.2588,
                        "idAsignacion": 2,
                        "idResultado": "1c0035b4-46de-4754-9622-86fc388adbae"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "e61975cb-5a91-4e33-b0d0-0408bffbb2f6",
                    "nombrecat": "Factores personales",
                    "idcla": "9b81f123-e7c0-4657-bc65-42b23d1066a6",
                    "nombrecla": "Ley del silencio",
                    "IndicesHijos": [
                    {
                        "idScla": null,
                        "nombreScla": null,
                        "valorHijo": 0.2145,
                        "idAsignacion": 3,
                        "idResultado": "5e6cc4a6-e20a-40bc-a4db-87ff287cb3a1"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                    "nombrecat": "Personal",
                    "idcla": "92919621-0a17-4fb2-899a-c0b505191695",
                    "nombrecla": "Conflictividad",
                    "IndicesHijos": [
                    {
                        "idScla": "8382e9f5-58f5-4390-9864-2c5c04ae5d6a",
                        "nombreScla": "verbal",
                        "valorHijo": 0.2562,
                        "idAsignacion": 2,
                        "idResultado": "d8de3346-2353-4bcb-ade3-88a4512878cc"
                    },
                    {
                        "idScla": "1dc2152d-916c-4fb9-a0ca-828365b7875a",
                        "nombreScla": "fisica",
                        "valorHijo": 0.0578,
                        "idAsignacion": 2,
                        "idResultado": "3639f65a-a463-4798-88e7-97e99874d388"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                    "nombrecat": "Personal",
                    "idcla": "60663dc7-3638-4fa4-8f33-b5cac7aea496",
                    "nombrecla": "liderazgo",
                    "IndicesHijos": [
                    {
                        "idScla": null,
                        "nombreScla": null,
                        "valorHijo": 0.1115,
                        "idAsignacion": 3,
                        "idResultado": "71cb1ed5-9bd8-4c89-bb32-89a0b3accbd0"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "f374a557-67a9-4ad5-a793-eda4bf692754",
                    "nombrecat": "Ambiente escolar",
                    "idcla": "33cfe0bf-34e9-450d-8ac9-66d8d5cafd24",
                    "nombrecla": "Ambiente social",
                    "IndicesHijos": [
                    {
                        "idScla": "e79d3441-94b8-4865-9ea4-2563428620ef",
                        "nombreScla": "Compañerismo",
                        "valorHijo": 0.8040,
                        "idAsignacion": 1,
                        "idResultado": "c811ca5d-79af-4e9f-92f9-9db9fffa562e"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "3815b3fc-b272-4af5-aab6-b6e6cc9e6965",
                    "nombrecat": "Sistema",
                    "idcla": "15ab3cd4-3bbd-461a-b3a1-eb3c6aca7701",
                    "nombrecla": "Habilidades",
                    "IndicesHijos": [
                    {
                        "idScla": "59b85183-4a88-49aa-942a-f90b769bc8cb",
                        "nombreScla": "Frecuencia en deportes",
                        "valorHijo": 0.8970,
                        "idAsignacion": 1,
                        "idResultado": "c3dd5835-73de-47e4-b658-9f6233c0f5dc"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                    "nombrecat": "Personal",
                    "idcla": "5a79081f-1a43-43e2-acc2-86d55fb63b81",
                    "nombrecla": "potenciales",
                    "IndicesHijos": [
                    {
                        "idScla": "7f24cf30-a1e5-4fe4-8c5b-23ee03b6a7c2",
                        "nombreScla": "Académico",
                        "valorHijo": 0.1389,
                        "idAsignacion": 1,
                        "idResultado": "1bcb53bf-f03e-46a6-9bea-a8190420dab5"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "3815b3fc-b272-4af5-aab6-b6e6cc9e6965",
                    "nombrecat": "Sistema",
                    "idcla": "59a563b6-d14b-4f23-85bb-62b91fa9fbd6",
                    "nombrecla": "academico",
                    "IndicesHijos": [
                    {
                        "idScla": "988d206c-ec23-4de9-8402-4c5d7977a35b",
                        "nombreScla": "Facilidad en concentracion ",
                        "valorHijo": 0.5242,
                        "idAsignacion": 1,
                        "idResultado": "4eb761a9-f005-497c-b4d9-bf304216a672"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "f374a557-67a9-4ad5-a793-eda4bf692754",
                    "nombrecat": "Ambiente escolar",
                    "idcla": "b415b775-01c2-4463-9a1e-b7bfd5a79ead",
                    "nombrecla": "Metodos de defensa ",
                    "IndicesHijos": [
                    {
                        "idScla": "db4ca04a-3c1e-45c4-bc75-e406093d5728",
                        "nombreScla": "agresividad",
                        "valorHijo": 0.2090,
                        "idAsignacion": 2,
                        "idResultado": "77635e58-f812-43ed-a74f-cada89bdd78e"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "3815b3fc-b272-4af5-aab6-b6e6cc9e6965",
                    "nombrecat": "Sistema",
                    "idcla": "33cfe0bf-34e9-450d-8ac9-66d8d5cafd24",
                    "nombrecla": "Ambiente social",
                    "IndicesHijos": [
                    {
                        "idScla": "cf595590-e38c-4ba1-a90f-427cacf75c4f",
                        "nombreScla": " Relación con profesores",
                        "valorHijo": 0.7121,
                        "idAsignacion": 3,
                        "idResultado": "2b0e7692-73c0-4f76-b95f-ce897e9b36f9"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                    "nombrecat": "Personal",
                    "idcla": "358362f6-533a-4cc2-8da4-1b8dfe2459b2",
                    "nombrecla": "Prosocial",
                    "IndicesHijos": [
                    {
                        "idScla": null,
                        "nombreScla": null,
                        "valorHijo": 0.5186,
                        "idAsignacion": 3,
                        "idResultado": "79e41285-b0d0-4350-9dc1-d18647a2349c"
                    }
                    ]
                }
            },
            {
                "idImplementacion": "ef651a8d-cd2b-4fb9-ba3e-487c62f42712",
                "idnivel": 1,
                "idGrado": null,
                "nombreGrado": null,
                "idCurso": "3613e17b-903b-44fb-8fe6-2eecaed93cab",
                "nombreCurso": null,
                "Nroestudiantes": null,
                "valorCla":  Math.random() * 100,
                "valorCat": null,
                "indicePadre": {
                    "idcat": "3815b3fc-b272-4af5-aab6-b6e6cc9e6965",
                    "nombrecat": "Sistema",
                    "idcla": "b1c513cd-91cf-4072-a066-4f45c80bdfc1",
                    "nombrecla": "intereses",
                    "IndicesHijos": [
                    {
                        "idScla": "7f24cf30-a1e5-4fe4-8c5b-23ee03b6a7c2",
                        "nombreScla": "Académico",
                        "valorHijo": 0.6454,
                        "idAsignacion": 1,
                        "idResultado": "a67316eb-6ae8-4eda-8f71-d1c8f4fb7e72"
                    }
                    ]
                }
            }
        ];
    cargarGaguesPadres(indices, "postivosFortalezas", config2);
    indices =
        [{
            "idRIP": "1eb3ec4c-5741-437c-abc6-bd0badddf7e9",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "3a481fd7-b223-4fc3-a2ff-2db8860e0308",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "92919621-0a17-4fb2-899a-c0b505191695",
                "idSubClasificacion_indice": "8382e9f5-58f5-4390-9864-2c5c04ae5d6a",
                "nombre_Scla": "verbal",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Percepción de habilidades sociales",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        },
        {
            "idRIP": "9705fe43-0ff4-475d-a68b-74fbcc9b0c7f",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "a8fd56ce-2f37-4479-b7e4-317fc90a1ee5",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "92911-0a17-4fb2-899a-c0b505191695",
                "idSubClasificacion_indice": "1dc2152d-916c-4fb9-a0ca-828365b7875a",
                "nombre_Scla": "fisica",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Conflictividad",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        },
        {
            "idRIP": "c0298713-8394-4bde-9308-e1c30a3cdc63",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "d06e21ea-0653-432a-ae10-ccf504ca77c8",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "92919621-0a17-4f-899a-c0b505191695",
                "idSubClasificacion_indice": "941e0a27-d128-455a-aa22-24064cd7ce4f",
                "nombre_Scla": "psicologica",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Conflictividad",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        },
        {
            "idRIP": "73c6f49a-8bd3-4084-8a6a-3894f2af8eb7",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1", "indice": { "id_indice": "bb0e7a16-1d37-49df-ac5d-05cb1fc409a5", "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30", "idClasificacion_indice": "ef77861d-5497-45b6-80ae-06b2ba021988", "idSubClasificacion_indice": "30dffc27-cfb1-4d71-bf5c-329986e567d6", "nombre_Scla": "psicologico", "descripcion_Scla": "", "nombre_cat": "Personal", "descripcion_cat": "", "nombre_cla": "Prosocial", "descripcion_cla": "", "valor_RIP": Math.random() * 40 + 60, "valorCla_RIP": null, "valorCat_RIP": null }
        },
        {
            "idRIP": "c2dca62f-357a-46f1-8ee0-38902d67c512",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "a9cac38c-0993-4182-98b6-85f253a12244",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "ef77861d-5497-45b6-80ae-06b2ba021988",
                "idSubClasificacion_indice": "32479ed5-8006-40ae-a950-b33a56f86c00",
                "nombre_Scla": "bullying",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Propension a ser victima",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        },
        {
            "idRIP": "306e6ed1-4c12-435e-b9f7-bc55e86da220",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "ca7b57e1-1262-4dfb-8472-ff857b971028",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "ef77861d-5497-45b6-80ae-06b2ba021988",
                "idSubClasificacion_indice": "cc311a57-1525-4c98-a504-a26b01c74895",
                "nombre_Scla": "armas",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Propension a ser victima",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        }];
    cargarGagues(indices, "postivosDebilidades", config2);
    indices =
        [{
            "idRIP": "1eb3ec4c-5741-437c-abc6-bd0badddf7e9",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "3a481fd7-b223-4fc3-a2ff-2db8860e0308",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "92919621-0a17-4fb2-899a-c0b505191695",
                "idSubClasificacion_indice": "8382e9f5-58f5-4390-9864-2c5c04ae5d6a",
                "nombre_Scla": "verbal",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Intereses académicos",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        },
        {
            "idRIP": "9705fe43-0ff4-475d-a68b-74fbcc9b0c7f",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "a8fd56ce-2f37-4479-b7e4-317fc90a1ee5",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "92919621-0a17-4fb2-899a-c0b505191695",
                "idSubClasificacion_indice": "1dc2152d-916c-4fb9-a0ca-828365b7875a",
                "nombre_Scla": "fisica",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Conflictividad",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        },
        {
            "idRIP": "c0298713-8394-4bde-9308-e1c30a3cdc63",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "d06e21ea-0653-432a-ae10-ccf504ca77c8",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "92919621-0a17-4fb2-899a-c0b505191695",
                "idSubClasificacion_indice": "941e0a27-d128-455a-aa22-24064cd7ce4f",
                "nombre_Scla": "psicologica",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Conflictividad",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        },
        {
            "idRIP": "73c6f49a-8bd3-4084-8a6a-3894f2af8eb7",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1", "indice": { "id_indice": "bb0e7a16-1d37-49df-ac5d-05cb1fc409a5", "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30", "idClasificacion_indice": "ef77861d-5497-45b6-80ae-06b2ba021988", "idSubClasificacion_indice": "30dffc27-cfb1-4d71-bf5c-329986e567d6", "nombre_Scla": "psicologico", "descripcion_Scla": "", "nombre_cat": "Personal", "descripcion_cat": "", "nombre_cla": "Apoyo - Compañeros", "descripcion_cla": "", "valor_RIP": Math.random() * 40 + 60, "valorCla_RIP": null, "valorCat_RIP": null }
        },
        {
            "idRIP": "c2dca62f-357a-46f1-8ee0-38902d67c512",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "a9cac38c-0993-4182-98b6-85f253a12244",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "ef77861d-5497-45b6-80ae-06b2ba021988",
                "idSubClasificacion_indice": "32479ed5-8006-40ae-a950-b33a56f86c00",
                "nombre_Scla": "bullying",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Propension a ser victima",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        },
        {
            "idRIP": "306e6ed1-4c12-435e-b9f7-bc55e86da220",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "ca7b57e1-1262-4dfb-8472-ff857b971028",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "ef77861d-5497-45b6-80ae-06b2ba021988",
                "idSubClasificacion_indice": "cc311a57-1525-4c98-a504-a26b01c74895",
                "nombre_Scla": "armas",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Propension a ser victima",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        }];
    cargarGagues(indices, "postivosOportunidades", config2);
    indices =
        [{
            "idRIP": "1eb3ec4c-5741-437c-abc6-bd0badddf7e9",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "3a481fd7-b223-4fc3-a2ff-2db8860e0308",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "92919621-0a17-4fb2-899a-c0b505191695",
                "idSubClasificacion_indice": "8382e9f5-58f5-4390-9864-2c5c04ae5d6a",
                "nombre_Scla": "verbal",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Métodos de defensa - Aislamiento",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        },
        {
            "idRIP": "9705fe43-0ff4-475d-a68b-74fbcc9b0c7f",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "a8fd56ce-2f37-4479-b7e4-317fc90a1ee5",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "92919621-0a17-4fb2-899a-c0b505191695",
                "idSubClasificacion_indice": "1dc2152d-916c-4fb9-a0ca-828365b7875a",
                "nombre_Scla": "fisica",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Conflictividad",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        },
        {
            "idRIP": "c0298713-8394-4bde-9308-e1c30a3cdc63",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "d06e21ea-0653-432a-ae10-ccf504ca77c8",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "92919621-0a17-4fb2-899a-c0b505191695",
                "idSubClasificacion_indice": "941e0a27-d128-455a-aa22-24064cd7ce4f",
                "nombre_Scla": "psicologica",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Conflictividad",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        },
        {
            "idRIP": "73c6f49a-8bd3-4084-8a6a-3894f2af8eb7",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1", "indice": { "id_indice": "bb0e7a16-1d37-49df-ac5d-05cb1fc409a5", "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30", "idClasificacion_indice": "ef77861d-5497-45b6-80ae-06b2ba021988", "idSubClasificacion_indice": "30dffc27-cfb1-4d71-bf5c-329986e567d6", "nombre_Scla": "psicologico", "descripcion_Scla": "", "nombre_cat": "Personal", "descripcion_cat": "", "nombre_cla": "Propension a ser victima", "descripcion_cla": "", "valor_RIP": Math.random() * 40 + 60, "valorCla_RIP": null, "valorCat_RIP": null }
        },
        {
            "idRIP": "c2dca62f-357a-46f1-8ee0-38902d67c512",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "a9cac38c-0993-4182-98b6-85f253a12244",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "ef77861d-5497-45b6-80ae-06b2ba021988",
                "idSubClasificacion_indice": "32479ed5-8006-40ae-a950-b33a56f86c00",
                "nombre_Scla": "bullying",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Propension a ser victima",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        },
        {
            "idRIP": "306e6ed1-4c12-435e-b9f7-bc55e86da220",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "ca7b57e1-1262-4dfb-8472-ff857b971028",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "ef77861d-5497-45b6-80ae-06b2ba021988",
                "idSubClasificacion_indice": "cc311a57-1525-4c98-a504-a26b01c74895",
                "nombre_Scla": "armas",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Propension a ser victima",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        }];
    cargarGagues(indices, "negativosOportunidades", config1);
    indices =
        [{
            "idRIP": "1eb3ec4c-5741-437c-abc6-bd0badddf7e9",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "3a481fd7-b223-4fc3-a2ff-2db8860e0308",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "92919621-0a17-4fb2-899a-c0b505191695",
                "idSubClasificacion_indice": "8382e9f5-58f5-4390-9864-2c5c04ae5d6a",
                "nombre_Scla": "verbal",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Métodos de defensa - agresividad",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        },
        {
            "idRIP": "9705fe43-0ff4-475d-a68b-74fbcc9b0c7f",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "a8fd56ce-2f37-4479-b7e4-317fc90a1ee5",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "92919621-0a17-4fb2-899a-c0b505191695",
                "idSubClasificacion_indice": "1dc2152d-916c-4fb9-a0ca-828365b7875a",
                "nombre_Scla": "fisica",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Conflictividad",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        },
        {
            "idRIP": "c0298713-8394-4bde-9308-e1c30a3cdc63",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "d06e21ea-0653-432a-ae10-ccf504ca77c8",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "92919621-0a17-4fb2-899a-c0b505191695",
                "idSubClasificacion_indice": "941e0a27-d128-455a-aa22-24064cd7ce4f",
                "nombre_Scla": "psicologica",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Conflictividad",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        },
        {
            "idRIP": "73c6f49a-8bd3-4084-8a6a-3894f2af8eb7",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1", "indice": { "id_indice": "bb0e7a16-1d37-49df-ac5d-05cb1fc409a5", "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30", "idClasificacion_indice": "ef77861d-5497-45b6-80ae-06b2ba021988", "idSubClasificacion_indice": "30dffc27-cfb1-4d71-bf5c-329986e567d6", "nombre_Scla": "psicologico", "descripcion_Scla": "", "nombre_cat": "Personal", "descripcion_cat": "", "nombre_cla": "Propension a ser victima - físico", "descripcion_cla": "", "valor_RIP": Math.random() * 40 + 60, "valorCla_RIP": null, "valorCat_RIP": null }
        },
        {
            "idRIP": "c2dca62f-357a-46f1-8ee0-38902d67c512",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "a9cac38c-0993-4182-98b6-85f253a12244",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "ef77861d-5497-45b6-80ae-06b2ba021988",
                "idSubClasificacion_indice": "32479ed5-8006-40ae-a950-b33a56f86c00",
                "nombre_Scla": "bullying",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Propension a ser victima",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        },
        {
            "idRIP": "306e6ed1-4c12-435e-b9f7-bc55e86da220",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "ca7b57e1-1262-4dfb-8472-ff857b971028",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "ef77861d-5497-45b6-80ae-06b2ba021988",
                "idSubClasificacion_indice": "cc311a57-1525-4c98-a504-a26b01c74895",
                "nombre_Scla": "armas",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Propension a ser victima",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        }];
    cargarGagues(indices, "negativosFortalezas", config1);
    indices =
        [
        {
            "idRIP": "1eb3ec4c-5741-437c-abc6-bd0badddf7e9",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "3a481fd7-b223-4fc3-a2ff-2db8860e0308",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "92919621-0a17-4fb2-899a-c0b505191695",
                "idSubClasificacion_indice": "8382e9f5-58f5-4390-9864-2c5c04ae5d6a",
                "nombre_Scla": "verbal",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Deserción - académica",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        },
        {
            "idRIP": "9705fe43-0ff4-475d-a68b-74fbcc9b0c7f",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "a8fd56ce-2f37-4479-b7e4-317fc90a1ee5",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "92919621-0a17-4fb2-899a-c0b505191695",
                "idSubClasificacion_indice": "1dc2152d-916c-4fb9-a0ca-828365b7875a",
                "nombre_Scla": "fisica",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Conflictividad",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        },
        {
            "idRIP": "c0298713-8394-4bde-9308-e1c30a3cdc63",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "d06e21ea-0653-432a-ae10-ccf504ca77c8",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "92919621-0a17-4fb2-899a-c0b505191695",
                "idSubClasificacion_indice": "941e0a27-d128-455a-aa22-24064cd7ce4f",
                "nombre_Scla": "psicologica",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Conflictividad",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        },
        {
            "idRIP": "73c6f49a-8bd3-4084-8a6a-3894f2af8eb7",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1", "indice": { "id_indice": "bb0e7a16-1d37-49df-ac5d-05cb1fc409a5", "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30", "idClasificacion_indice": "ef77861d-5497-45b6-80ae-06b2ba021988", "idSubClasificacion_indice": "30dffc27-cfb1-4d71-bf5c-329986e567d6", "nombre_Scla": "psicologico", "descripcion_Scla": "", "nombre_cat": "Personal", "descripcion_cat": "", "nombre_cla": "Propension a ser victima - cyberbullying", "descripcion_cla": "", "valor_RIP": Math.random() * 40 + 60, "valorCla_RIP": null, "valorCat_RIP": null }
        },
        {
            "idRIP": "c2dca62f-357a-46f1-8ee0-38902d67c512",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "a9cac38c-0993-4182-98b6-85f253a12244",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "ef77861d-5497-45b6-80ae-06b2ba021988",
                "idSubClasificacion_indice": "32479ed5-8006-40ae-a950-b33a56f86c00",
                "nombre_Scla": "bullying",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Propension a ser victima",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        },
        {
            "idRIP": "306e6ed1-4c12-435e-b9f7-bc55e86da220",
            "idCursoCol_RIP": "af218cd4-72e5-4973-8bbc-1608355c70df",
            "idPersona": "633b53cd-73bb-4e6e-8e00-e2d29a73cbc1",
            "indice": {
                "id_indice": "ca7b57e1-1262-4dfb-8472-ff857b971028",
                "idCategoria_indice": "a1fd50a3-7843-40e6-ae7f-b4eb54c05b30",
                "idClasificacion_indice": "ef77861d-5497-45b6-80ae-06b2ba021988",
                "idSubClasificacion_indice": "cc311a57-1525-4c98-a504-a26b01c74895",
                "nombre_Scla": "armas",
                "descripcion_Scla": "",
                "nombre_cat": "Personal",
                "descripcion_cat": "",
                "nombre_cla": "Propension a ser victima",
                "descripcion_cla": "",
                "valor_RIP": Math.random() * 40 + 60,
                "valorCla_RIP": null,
                "valorCat_RIP": null
            }
        }];
    cargarGagues(indices, "negativosDebilidades", config1);
    */
}
)
