//var gauge2= loadLiquidFillGauge("fillgauge2", 28);
var config2 = liquidFillGaugeDefaultSettings();
config2.circleColor = "#D4AB6A";
config2.textColor = "#553300";
config2.waveTextColor = "#805615";
config2.waveColor = "#AA7D39";
config2.circleThickness = 0.1;
config2.circleFillGap = 0.2;
config2.textVertPosition = 0.8;
config2.waveAnimateTime = 2000;
config2.waveHeight = 0.1;
config2.waveCount = 2;

var config1 = liquidFillGaugeDefaultSettings();
config1.circleColor = "#ceea48";
config1.textColor = "#553300";
config1.waveTextColor = "#805615";
config1.waveColor = "#ceea48";
config1.circleThickness = 0.1;
config1.circleFillGap = 0.2;
config1.textVertPosition = 0.8;
config1.waveAnimateTime = 2000;
config1.waveHeight = 0.1;
config1.waveCount = 2;

var config3 = liquidFillGaugeDefaultSettings();
config3.circleColor = "#ff5722";
config3.textColor = "#553300";
config3.waveTextColor = "#805615";
config3.waveColor = "#ff5722";
config3.circleThickness = 0.1;
config3.circleFillGap = 0.2;
config3.textVertPosition = 0.8;
config3.waveAnimateTime = 2000;
config3.waveHeight = 0.1;
config3.waveCount = 2;

function cargarBarras(indices, indicesPadres) {

    var i = 0;
    var valor = 0;

    for (indice in indicesPadres) {
        /*dataHistogramas = [
        {
            "Hijo": "hijo1",
            "Padre": "Personal- Conflictividad - fisica",
            "peso": Math.random() * 100 + "%"
        },
        {
            "Hijo": "hijo2",
            "Padre": "Personal- Conflictividad - psicologica",
            "peso": Math.random() * 100 + "%"
        },
        {
            "Hijo": "hijo3",
            "Padre": "Personal- Conflictividad - verbal",
            "peso": Math.random() * 100 + "%"
        }
        ];*/
        dataHistogramas = [];
        var itemHijo;
        for (var indiceHisto in indices) {
            if (indices[indiceHisto].indice.idClasificacion_indice === indicesPadres[indice].idPadre) {
                itemHijo = { "Hijo": indices[indiceHisto].indice.nombre_Scla, "Padre": "", "peso": indices[indiceHisto].indice.valorRanking_RIP * 100 + "%" };
                dataHistogramas.push(itemHijo);
            }
        }
        $('#linkButton' + i).click(function () {
            $('#myModal').modal();
            var item = (this.id).replace("linkButton", "");
            var nombre = indicesPadres[item].nombrePadre;
            var idPadre = indicesPadres[item].idPadre;
            $('#ctl00_ctl00_ContentPlaceHolder1_contenidoPrincipal_ModalIndice_lblModalTitle').text(nombre);
            // cargar velocimetro padre
            $('#gaguePadre').html("");
            loadLiquidFillGauge('gaguePadre', indicesPadres[item].valorIndicesPadre, config2);

            // cargar velocimetros hijos
            $('#ctl00_ctl00_ContentPlaceHolder1_contenidoPrincipal_ModalIndice_divHijos').html("");
            var j = 0;
            for (var i in indices) {
                if (indices[i].indice.idClasificacion_indice === indicesPadres[item].idPadre) {
                    $('#ctl00_ctl00_ContentPlaceHolder1_contenidoPrincipal_ModalIndice_divHijos').append('<div class="col-md-4" id="gasGague' + j + '" style="height: 150px; margin-bottom: 10px;"><div class="chart-gauge"></div></div>')
                    var valorHijo = indices[i].indice.valorRanking_RIP * 100;
                    cargarVelocimetros('gasGague' + j, valorHijo);
                    $('#gasGague' + j).append("<p style='text-align: center;'><strong>" + valorHijo + "%</strong> " + indices[i].indice.nombre_Scla + "</p>");
                    j++;
                }
            }

        });
        var ancho = 200;
        var alto = 200;
        var svg = dimple.newSvg("#barrasHorizontal" + i, ancho, alto);
        var myChart = new dimple.chart(svg, dataHistogramas);
        myChart.setBounds(30, 50, ancho - 30, alto / 2);
        var y = myChart.addMeasureAxis("x", "peso");
        myChart.addCategoryAxis("y", "Hijo");
        myChart.addMeasureAxis("z", "peso");
        myChart.addSeries(null, dimple.plot.bar);
        y.overrideMin = 0;
        y.overrideMax = 100;
        myChart.draw();
        i++;
    }
}

function cargarGagues(indices) {
    var html = "";
    console.log(indices);
    //var random = new Random();
    var divVelocimetros = $('#ctl00_ctl00_ContentPlaceHolder1_contenidoPrincipal_divVelocimetros');

    var indicesPadres = [], itemPadre;
    for (var item in indices) {
        itemPadre = { idPadre: indices[item].indice.idClasificacion_indice, nombrePadre: indices[item].indice.nombre_cla, valorIndicesPadre: indices[item].indice.valorCla_RIP * 100, asignacion: indices[item].indice.idAsignacion }
        var itemIter = contains(indicesPadres, itemPadre);
        if (!itemIter) {
            indicesPadres.push(itemPadre);
        } else if (indicesPadres[itemIter].asignacion != indices[item].indice.idAsignacion) {
            indicesPadres[itemIter].asignacion = 3; //Asigna padre en neutro
        }
    }

    function contains(a, obj) {
        if (!a) return false;
        for (var i = 0; i < a.length; i++) {
            if (a[i].idPadre === obj.idPadre) {
                return i;
            }
        }
        return false;
    }
    var i = 0;
    for (var item in indicesPadres) {
        var selector = $('#myModal');
        html = "<div class='col-md-6'>" +
            "<h4 style='text-align: center;'><strong><a id='linkButton" + i + "'> " + indicesPadres[i].nombrePadre + " </a>";

        html = html + "</strong></h4>" +
           "<svg class='col-md-4' style='padding-right: 0px; padding-left: 0px;' id='gague" + i + "' width='20%' height='200' style='padding-right: 0px; padding-left: 0px;'></svg><div class='col-md-8' id='barrasHorizontal" + i + "'></div>" +
           "</div>";
        divVelocimetros.append(html);
        i++;
    }

    var i = 0;
    var valor = 0.0;
    for (indice in indicesPadres) {
        valor = indicesPadres[i].valorIndicesPadre;
        switch (indicesPadres[i].asignacion) {
            case 1:
                loadLiquidFillGauge('gague' + i, valor, config1);
                break;
            case 2:
                loadLiquidFillGauge('gague' + i, valor, config3);
                break;
            case 3:
                loadLiquidFillGauge('gague' + i, valor, config2);
                break;
        }
            
        i++;
    }
    cargarBarras(indices, indicesPadres);
}


$(document).ready(function () {
    document.getElementById('titulo').scrollIntoView();
}
)
