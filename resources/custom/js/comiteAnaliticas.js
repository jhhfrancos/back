var reportes, casos, parametros, reportesCursos;

function cargarReportesCasos(dataReportes, dataCasos,param, reportesCurso) {
    reportes = dataReportes;
    casos = dataCasos;
    parametros = param;
    reportesCursos = reportesCurso;
    document.onreadystatechange = () => {
        if (document.readyState === 'complete') {
            crearGraficas();
        }
    };
    
    
}
function crearGraficas() {
    
    var dataHisto = []
    var temp = [];
    
    for (var item in parametros) {
        temp[parametros[item].idConsecutivo_par] = 0;
    }
    for (var item in reportes) {
        var idTipo = reportes[item].idTipo_rte;
        temp[idTipo] = temp[idTipo] + 1;
    }
    for (var item in temp) {
        var tipoRte = parametros.find(x => x.idConsecutivo_par === parseInt(item))
            
        dataHisto.push({
            'Numero de reportes': temp[item],
            'Tipo reporte': tipoRte.detalle_par
        });
    }
    
    /****** Histograma *******/
    var histoX = 500;
    var histoY = 500;
    var divClasHisto = ("#reportesClasificacionHisto");
    var svg = dimple.newSvg(divClasHisto, histoX, histoY);
    var myChart = new dimple.chart(svg, dataHisto);
    myChart.setBounds(60, 30, histoX - 90, histoY - 200)
    var x = myChart.addCategoryAxis("x", "Tipo reporte");
    myChart.addMeasureAxis("y", "Numero de reportes");
    myChart.addSeries(null, dimple.plot.bar);
    myChart.draw();
    /****** Pie *******/
    var pieX = 450, pieY = 450;
    var divClasPie = ("#reportesClasificacionPie");
    var svgPie = dimple.newSvg(divClasPie, pieX, pieY);
    var myChartPie = new dimple.chart(svgPie, dataHisto);
    myChartPie.setBounds(20, 20, pieX-100, pieY-100)
    myChartPie.addMeasureAxis("p", "Numero de reportes");
    myChartPie.addSeries("Tipo reporte", dimple.plot.pie);
    myChartPie.addLegend(pieX -100, 20, 90, 300, "left");
    myChartPie.draw();

    /*** histograma dividido gravedad **/
    var data = transformacionGravedad(reportesCursos);
        /*[
            { "Tipo 1": "4", "Tipo 2": "7", "Tipo 3": "22", State: "1" },
            { "Tipo 1": "15", "Tipo 2": "23", "Tipo 3": "19", State: "2" },
            { "Tipo 1": "9", "Tipo 2": "5", "Tipo 3": "25", State: "3" },
            { "Tipo 1": "12", "Tipo 2": "27", "Tipo 3": "11", State: "4" },
            { "Tipo 1": "22", "Tipo 2": "15", "Tipo 3": "19", State: "5" },
            { "Tipo 1": "17", "Tipo 2": "7", "Tipo 3": "10", State: "6" },
            { "Tipo 1": "16", "Tipo 2": "14", "Tipo 3": "26", State: "7" },
            { "Tipo 1": "12", "Tipo 2": "27", "Tipo 3": "29", State: "8" },
            { "Tipo 1": "16", "Tipo 2": "5", "Tipo 3": "13", State: "9" },
            { "Tipo 1": "16", "Tipo 2": "5", "Tipo 3": "13", State: "10" },
            { "Tipo 1": "16", "Tipo 2": "5", "Tipo 3": "13", State: "11" }
        ];*/
    histogramaDividido("histoDivGrav", data);

    /*** histograma dividido tipo ***/
    var data = transformacionTipo(reportesCursos);
        /*[
            { Bullying: "4", Drogas: "7", Vandalismo: "22", Robo: "22",State: "1" },
            { Bullying: "15", Drogas: "23", Vandalismo: "19", Robo: "2",State: "2" },
            { Bullying: "9", Drogas: "5", Vandalismo: "25",Robo: "10" ,State: "3" },
            { Bullying: "12", Drogas: "27", Vandalismo: "11", Robo: "12",State: "4" },
            { Bullying: "22", Drogas: "15", Vandalismo: "19",Robo: "2" ,State: "5" },
            { Bullying: "17", Drogas: "7", Vandalismo: "10",Robo: "20" ,State: "6" },
            { Bullying: "16", Drogas: "14", Vandalismo: "26",Robo: "12" ,State: "7" },
            { Bullying: "12", Drogas: "27", Vandalismo: "29",Robo: "20" ,State: "8" },
            { Bullying: "16", Drogas: "5", Vandalismo: "13", Robo: "1", State: "9" },
            { Bullying: "5", Drogas: "5", Vandalismo: "9", Robo: "1", State: "10" },
            { Bullying: "6", Drogas: "15", Vandalismo: "3", Robo: "12", State: "11" }
        ];*/
    histogramaDividido("histoDivTipo", data);

    transformacionGravedad(reportesCursos);
}
function transformacionGravedad(datos) {
    var arregloGravedad = [];
    for (var i = 0; i < datos.length; i++) {
        var cont =contains(arregloGravedad, datos[i]); 
        if (!cont) {
            var item = { "Tipo 1": (datos[i].reporte.idTipo_rte == 1) ? 1 : 0, "Tipo 2": (datos[i].reporte.idTipo_rte == 2) ? 1 : 0, "Tipo 3": (datos[i].reporte.idTipo_rte == 3) ? 1 : 0, State: datos[i].curso };
            arregloGravedad.push(item);
        } else {
            var item = arregloGravedad[cont];
            item["Tipo 1"] = (datos[i].reporte.idTipo_rte == 1) ? item["Tipo 1"] + 1 : item["Tipo 1"];
            item["Tipo 2"] = (datos[i].reporte.idTipo_rte == 2) ? item["Tipo 2"] + 1 : item["Tipo 2"];
            item["Tipo 3"] = (datos[i].reporte.idTipo_rte == 3) ? item["Tipo 3"] + 1 : item["Tipo 3"];
        }
    }
    function contains(a, obj) {
        if (!a) return false;
        for (var i = 0; i < a.length; i++) {
            if (a[i].State === obj.curso) {
                return i;
            }
        }
        return false;
    }
    return arregloGravedad;
}
function transformacionTipo(datos) {
    var arregloGravedad = [];
    for (var i = 0; i < datos.length; i++) {
        var cont = contains(arregloGravedad, datos[i]);
        if (!cont) {
            var item = { "Bullying": (datos[i].reporte.idGravedad == 1) ? 1 : 0, "Robo": (datos[i].reporte.idGravedad == 2) ? 1 : 0, "Drogas": (datos[i].reporte.idGravedad == 3) ? 1 : 0, "Vandalismo" : (datos[i].reporte.idGravedad == 4) ? 1 : 0, State: datos[i].curso };
            arregloGravedad.push(item);
        } else {
            var item = arregloGravedad[cont];
            item["Bullying"] = (datos[i].reporte.idTipo_rte == 1) ? item["Bullying"] + 1 : item["Bullying"];
            item["Robo"] = (datos[i].reporte.idTipo_rte == 2) ? item["Robo"] + 1 : item["Robo"];
            item["Vandalismo"] = (datos[i].reporte.idTipo_rte == 4) ? item["Vandalismo"] + 1 : item["Vandalismo"];
            item["Drogas"] = (datos[i].reporte.idTipo_rte == 3) ? item["Drogas"] + 1 : item["Drogas"];
            
        }
    }
    function contains(a, obj) {
        if (!a) return false;
        for (var i = 0; i < a.length; i++) {
            if (a[i].State === obj.curso) {
                return i;
            }
        }
        return false;
    }
    return arregloGravedad;
}
function histogramaDividido(idDiv, data) {
    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
                width = 960 - margin.left - margin.right,
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
        .tickFormat(d3.format("d"));

    var svg = d3.select("#"+idDiv).append("svg")
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
            .call(xAxis);

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
        //.attr("transform", function(d) { return "translate(" + x(d.State) + ",0)"; })

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

                 svg.append("text")
                 .attr("x",xPos)
                 .attr("y",yPos +height/2)
                 .attr("class","tooltip")
                 .text(d.name +": "+ delta);

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
                        return color(d);
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