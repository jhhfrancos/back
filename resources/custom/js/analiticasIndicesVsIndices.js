var dimX =780; //590
var dimY =500; //400
$(document).on('change', "#selectorIndices", function () {
    var item = $(this).val();
    switch (item) {
        case "0":
            $('#chartContainer1').html("");
            break;
        case "1":
            cargar1('chartContainer1');
            break;
        case "2":
            cargar2('chartContainer1');
            break;
        case "3":
            cargar3('chartContainer1');
            break;
        case "4":
            cargar4('chartContainer1');
            break;
        case "5":
            cargar5('chartContainer1');
            break;
    }
});
function cargar1(idDiv) {
    $('#' + idDiv).html("");
	var data1 = [
		{ 'Propension a ser victima': '0.41', 'Desercion - interes': '0.12', 'estudiante': 'MANUELA  PATIÑO SANCHEZ' },
		{ 'Propension a ser victima': '0.18', 'Desercion - interes': '0.05', 'estudiante': 'SAMUEL EDUARDO FLOREZ ZULUAGA' },
		{ 'Propension a ser victima': '0.86', 'Desercion - interes': '0.26', 'estudiante': 'JUAN ANDRES OBANDO VELEZ' },
		{ 'Propension a ser victima': '0.4', 'Desercion - interes': '0.12', 'estudiante': 'DANIELA  RODRIGUEZ BENJUMEA' },
		{ 'Propension a ser victima': '0.51', 'Desercion - interes': '0.15', 'estudiante': 'LAURA MARIA ANGULO RODRIGUEZ' },
		{ 'Propension a ser victima': '0.26', 'Desercion - interes': '0.08', 'estudiante': 'DANIELA  FORERO MENDEZ' },
		{ 'Propension a ser victima': '0.7', 'Desercion - interes': '0.21', 'estudiante': 'LAURA ALEJANDRA RODRIGUEZ DIAZ' },
		{ 'Propension a ser victima': '0.07', 'Desercion - interes': '0.02', 'estudiante': 'TATIANA ALEJANDRA CRUZ BELTRAN' },
		{ 'Propension a ser victima': '1', 'Desercion - interes': '0.3', 'estudiante': 'ISABELLA  NARANJO HERNANDEZ' },
		{ 'Propension a ser victima': '0.36', 'Desercion - interes': '0.11', 'estudiante': 'ALEJANDRO  ARIAS ORTIZ' },
		{ 'Propension a ser victima': '0.49', 'Desercion - interes': '0.15', 'estudiante': 'SIMON  HERRERA ULLOA' },
		{ 'Propension a ser victima': '0.39', 'Desercion - interes': '0.12', 'estudiante': 'LAURA VALENTINA HERRERA APONTE' },
		{ 'Propension a ser victima': '0.16', 'Desercion - interes': '0.05', 'estudiante': 'MIGUEL ANGEL RUEDA AGUILERA' },
		{ 'Propension a ser victima': '0.93', 'Desercion - interes': '0.28', 'estudiante': 'JACOB  MURPHY BEJARANO' },
		{ 'Propension a ser victima': '0.07', 'Desercion - interes': '0.02', 'estudiante': 'MELISSA ALEXANDRA GARCIA VASQUEZ' },
		{ 'Propension a ser victima': '0.33', 'Desercion - interes': '0.1', 'estudiante': 'JUAN DIEGO BELTRAN PARIS' },
		{ 'Propension a ser victima': '0.38', 'Desercion - interes': '0.08', 'estudiante': 'VANEZA  GOMEZ SEGURA' },
		{ 'Propension a ser victima': '0.47', 'Desercion - interes': '0.05', 'estudiante': 'JUAN ESTEBAN LESMES OSORIO' },
		{ 'Propension a ser victima': '0.02', 'Desercion - interes': '0.01', 'estudiante': 'DAVID ALFONSO AYALA MOJICA' },
		{ 'Propension a ser victima': '0.74', 'Desercion - interes': '0.37', 'estudiante': 'SEBASTIAN  VIDALES BOHORQUEZ' },
		{ 'Propension a ser victima': '0.93', 'Desercion - interes': '0.47', 'estudiante': 'SILVANA  ARIAS SALAZAR' },
		{ 'Propension a ser victima': '0.54', 'Desercion - interes': '0.27', 'estudiante': 'LAURA MILENA CELIS HERRERA' },
		{ 'Propension a ser victima': '0.99', 'Desercion - interes': '0.49', 'estudiante': 'DAVID  MORANTES MUÑOZ' },
		{ 'Propension a ser victima': '0.53', 'Desercion - interes': '0.27', 'estudiante': 'VANESSA ALEXANDRA ZAHRINGER REYES' },
		{ 'Propension a ser victima': '0.56', 'Desercion - interes': '0.28', 'estudiante': 'SERGIO ISAAC MISERQUE MEDINA' },
		{ 'Propension a ser victima': '0.02', 'Desercion - interes': '0.01', 'estudiante': 'CAMILO ANDRES SALAS D`ANTONIO' },
		{ 'Propension a ser victima': '0.97', 'Desercion - interes': '0.48', 'estudiante': 'SILVIA  REINEL VANEGAS' },
		{ 'Propension a ser victima': '0.37', 'Desercion - interes': '0.18', 'estudiante': 'ZULAY  URIBE GARCIA' },
		{ 'Propension a ser victima': '0.23', 'Desercion - interes': '0.11', 'estudiante': 'CATALINA  BONILLA PARRA' },
		{ 'Propension a ser victima': '0.81', 'Desercion - interes': '0.26', 'estudiante': 'JUAN ANDRES RIVERA ROMERO' },
		{ 'Propension a ser victima': '0.86', 'Desercion - interes': '0.28', 'estudiante': 'CATALINA  SAENZ RODRIGUEZ' },
		{ 'Propension a ser victima': '0.92', 'Desercion - interes': '0.3', 'estudiante': 'VALENTINA  PINO GUIZA' },
		{ 'Propension a ser victima': '0.98', 'Desercion - interes': '0.32', 'estudiante': 'JUAN FELIPE QUINTERO PULIDO' },
		{ 'Propension a ser victima': '0.57', 'Desercion - interes': '0.18', 'estudiante': 'NICOLAS  PATIÑO ROMO' },
		{ 'Propension a ser victima': '0.32', 'Desercion - interes': '0.1', 'estudiante': 'JUAN PABLO GIL CARDENAS' },
		{ 'Propension a ser victima': '0.88', 'Desercion - interes': '0.29', 'estudiante': 'JUAN NICOLAS GALINDO MANTILLA' }
	];
	var svg = dimple.newSvg("#" + idDiv, dimX, dimY);
	var myChart = new dimple.chart(svg, data1);
	myChart.setBounds(60, 30, dimX - 90, dimY -70)
	myChart.addMeasureAxis("x", "Propension a ser victima");
	myChart.addMeasureAxis("y", "Desercion - interes");
	myChart.addCategoryAxis("z", "estudiante");
	var s = myChart.addSeries("Correlación 0.9", dimple.plot.bubble);
	myChart.addLegend(200, 10, 360, 20, "right");
	myChart.draw();
}
function cargar2(idDiv) {
    $('#' + idDiv).html("");
    var data1 = [
		{ 'Apoyo padres': '0.36', 'Popularidad': '0.15', 'estudiante': 'MANUELA  PATIÑO SANCHEZ' },
{ 'Apoyo padres': '0.89', 'Popularidad': '0.02', 'estudiante': 'SAMUEL EDUARDO FLOREZ ZULUAGA' },
{ 'Apoyo padres': '0.63', 'Popularidad': '0.07', 'estudiante': 'JUAN ANDRES OBANDO VELEZ' },
{ 'Apoyo padres': '0.47', 'Popularidad': '0.11', 'estudiante': 'DANIELA  RODRIGUEZ BENJUMEA' },
{ 'Apoyo padres': '0.96', 'Popularidad': '0.01', 'estudiante': 'LAURA MARIA ANGULO RODRIGUEZ' },
{ 'Apoyo padres': '0.48', 'Popularidad': '0.11', 'estudiante': 'DANIELA  FORERO MENDEZ' },
{ 'Apoyo padres': '0.36', 'Popularidad': '0.15', 'estudiante': 'LAURA ALEJANDRA RODRIGUEZ DIAZ' },
{ 'Apoyo padres': '0.93', 'Popularidad': '0.01', 'estudiante': 'TATIANA ALEJANDRA CRUZ BELTRAN' },
{ 'Apoyo padres': '0.11', 'Popularidad': '0.56', 'estudiante': 'ISABELLA  NARANJO HERNANDEZ' },
{ 'Apoyo padres': '0.19', 'Popularidad': '0.42', 'estudiante': 'ALEJANDRO  ARIAS ORTIZ' },
{ 'Apoyo padres': '0.89', 'Popularidad': '0.03', 'estudiante': 'SIMON  HERRERA ULLOA' },
{ 'Apoyo padres': '0.92', 'Popularidad': '0.02', 'estudiante': 'LAURA VALENTINA HERRERA APONTE' },
{ 'Apoyo padres': '0.76', 'Popularidad': '0.07', 'estudiante': 'MIGUEL ANGEL RUEDA AGUILERA' },
{ 'Apoyo padres': '0.92', 'Popularidad': '0.02', 'estudiante': 'JACOB  MURPHY BEJARANO' },
{ 'Apoyo padres': '0.62', 'Popularidad': '0.12', 'estudiante': 'MELISSA ALEXANDRA GARCIA VASQUEZ' },
{ 'Apoyo padres': '0.13', 'Popularidad': '0.5', 'estudiante': 'JUAN DIEGO BELTRAN PARIS' },
{ 'Apoyo padres': '0.14', 'Popularidad': '0.5', 'estudiante': 'VANEZA  GOMEZ SEGURA' },
{ 'Apoyo padres': '0.01', 'Popularidad': '0.56', 'estudiante': 'JUAN ESTEBAN LESMES OSORIO' },
{ 'Apoyo padres': '0.08', 'Popularidad': '0.63', 'estudiante': 'DAVID ALFONSO AYALA MOJICA' },
{ 'Apoyo padres': '0.59', 'Popularidad': '0.13', 'estudiante': 'SEBASTIAN  VIDALES BOHORQUEZ' },
{ 'Apoyo padres': '0.86', 'Popularidad': '0.02', 'estudiante': 'SILVANA  ARIAS SALAZAR' },
{ 'Apoyo padres': '0.67', 'Popularidad': '0.04', 'estudiante': 'LAURA MILENA CELIS HERRERA' },
{ 'Apoyo padres': '0.78', 'Popularidad': '0.03', 'estudiante': 'DAVID  MORANTES MUÑOZ' },
{ 'Apoyo padres': '0.41', 'Popularidad': '0.1', 'estudiante': 'VANESSA ALEXANDRA ZAHRINGER REYES' },
{ 'Apoyo padres': '0.74', 'Popularidad': '0.03', 'estudiante': 'SERGIO ISAAC MISERQUE MEDINA' },
{ 'Apoyo padres': '0.26', 'Popularidad': '0.15', 'estudiante': 'CAMILO ANDRES SALAS D`ANTONIO' },
{ 'Apoyo padres': '0.52', 'Popularidad': '0.07', 'estudiante': 'SILVIA  REINEL VANEGAS' },
{ 'Apoyo padres': '0.63', 'Popularidad': '0.05', 'estudiante': 'ZULAY  URIBE GARCIA' },
{ 'Apoyo padres': '0.55', 'Popularidad': '0.07', 'estudiante': 'CATALINA  BONILLA PARRA' },
{ 'Apoyo padres': '0.6', 'Popularidad': '0.06', 'estudiante': 'JUAN ANDRES RIVERA ROMERO' },
{ 'Apoyo padres': '0.51', 'Popularidad': '0.07', 'estudiante': 'CATALINA  SAENZ RODRIGUEZ' },
{ 'Apoyo padres': '0.05', 'Popularidad': '0.33', 'estudiante': 'VALENTINA  PINO GUIZA' },
{ 'Apoyo padres': '0.36', 'Popularidad': '0.11', 'estudiante': 'JUAN FELIPE QUINTERO PULIDO' },
{ 'Apoyo padres': '0.86', 'Popularidad': '0.02', 'estudiante': 'NICOLAS  PATIÑO ROMO' },
{ 'Apoyo padres': '0.07', 'Popularidad': '0.3', 'estudiante': 'JUAN PABLO GIL CARDENAS' },
{ 'Apoyo padres': '0.06', 'Popularidad': '0.32', 'estudiante': 'JUAN NICOLAS GALINDO MANTILLA' }
    ];

    var svg = dimple.newSvg("#" + idDiv, dimX, dimY);

    var myChart = new dimple.chart(svg, data1);
    myChart.setBounds(60, 30, dimX - 90, dimY - 70)
    myChart.addMeasureAxis("x", "Apoyo padres");
    myChart.addMeasureAxis("y", "Popularidad");
    myChart.addCategoryAxis("z", "estudiante");
    var s = myChart.addSeries("Correlación -0.86", dimple.plot.bubble);
    myChart.addLegend(200, 10, 360, 20, "right");
    myChart.draw();
}

function cargar3(idDiv) {
    $('#' + idDiv).html("");
    var data1 = [
		{ 'Prosocialidad': '0.05', 'Popularidad': '0.35', 'estudiante': 'MANUELA  PATIÑO SANCHEZ' },
{ 'Prosocialidad': '0.26', 'Popularidad': '0.43', 'estudiante': 'SAMUEL EDUARDO FLOREZ ZULUAGA' },
{ 'Prosocialidad': '0.36', 'Popularidad': '0.48', 'estudiante': 'JUAN ANDRES OBANDO VELEZ' },
{ 'Prosocialidad': '0.01', 'Popularidad': '0.34', 'estudiante': 'DANIELA  RODRIGUEZ BENJUMEA' },
{ 'Prosocialidad': '0.8', 'Popularidad': '0.74', 'estudiante': 'LAURA MARIA ANGULO RODRIGUEZ' },
{ 'Prosocialidad': '0.83', 'Popularidad': '0.76', 'estudiante': 'DANIELA  FORERO MENDEZ' },
{ 'Prosocialidad': '0.25', 'Popularidad': '0.43', 'estudiante': 'LAURA ALEJANDRA RODRIGUEZ DIAZ' },
{ 'Prosocialidad': '0.68', 'Popularidad': '0.66', 'estudiante': 'TATIANA ALEJANDRA CRUZ BELTRAN' },
{ 'Prosocialidad': '0.93', 'Popularidad': '0.85', 'estudiante': 'ISABELLA  NARANJO HERNANDEZ' },
{ 'Prosocialidad': '0.58', 'Popularidad': '0.6', 'estudiante': 'ALEJANDRO  ARIAS ORTIZ' },
{ 'Prosocialidad': '0.1', 'Popularidad': '0.37', 'estudiante': 'SIMON  HERRERA ULLOA' },
{ 'Prosocialidad': '0.75', 'Popularidad': '0.71', 'estudiante': 'LAURA VALENTINA HERRERA APONTE' },
{ 'Prosocialidad': '0.77', 'Popularidad': '0.72', 'estudiante': 'MIGUEL ANGEL RUEDA AGUILERA' },
{ 'Prosocialidad': '0.28', 'Popularidad': '0.44', 'estudiante': 'JACOB  MURPHY BEJARANO' },
{ 'Prosocialidad': '0.92', 'Popularidad': '0.84', 'estudiante': 'MELISSA ALEXANDRA GARCIA VASQUEZ' },
{ 'Prosocialidad': '0.77', 'Popularidad': '0.72', 'estudiante': 'JUAN DIEGO BELTRAN PARIS' },
{ 'Prosocialidad': '0.27', 'Popularidad': '0.43', 'estudiante': 'VANEZA  GOMEZ SEGURA' },
{ 'Prosocialidad': '0', 'Popularidad': '0.33', 'estudiante': 'JUAN ESTEBAN LESMES OSORIO' },
{ 'Prosocialidad': '0.62', 'Popularidad': '0.62', 'estudiante': 'DAVID ALFONSO AYALA MOJICA' },
{ 'Prosocialidad': '0.98', 'Popularidad': '0.89', 'estudiante': 'SEBASTIAN  VIDALES BOHORQUEZ' },
{ 'Prosocialidad': '0.71', 'Popularidad': '0.68', 'estudiante': 'SILVANA  ARIAS SALAZAR' },
{ 'Prosocialidad': '0.75', 'Popularidad': '0.71', 'estudiante': 'LAURA MILENA CELIS HERRERA' },
{ 'Prosocialidad': '0.82', 'Popularidad': '0.76', 'estudiante': 'DAVID  MORANTES MUÑOZ' },
{ 'Prosocialidad': '0.16', 'Popularidad': '0.39', 'estudiante': 'VANESSA ALEXANDRA ZAHRINGER REYES' },
{ 'Prosocialidad': '0.14', 'Popularidad': '0.38', 'estudiante': 'SERGIO ISAAC MISERQUE MEDINA' },
{ 'Prosocialidad': '0.62', 'Popularidad': '0.62', 'estudiante': 'CAMILO ANDRES SALAS D`ANTONIO' },
{ 'Prosocialidad': '0.35', 'Popularidad': '0.47', 'estudiante': 'SILVIA  REINEL VANEGAS' },
{ 'Prosocialidad': '0.61', 'Popularidad': '0.62', 'estudiante': 'ZULAY  URIBE GARCIA' },
{ 'Prosocialidad': '0.74', 'Popularidad': '0.7', 'estudiante': 'CATALINA  BONILLA PARRA' },
{ 'Prosocialidad': '0.24', 'Popularidad': '0.42', 'estudiante': 'JUAN ANDRES RIVERA ROMERO' },
{ 'Prosocialidad': '0.36', 'Popularidad': '0.48', 'estudiante': 'CATALINA  SAENZ RODRIGUEZ' },
{ 'Prosocialidad': '0.53', 'Popularidad': '0.57', 'estudiante': 'VALENTINA  PINO GUIZA' },
{ 'Prosocialidad': '0.4', 'Popularidad': '0.37', 'estudiante': 'JUAN FELIPE QUINTERO PULIDO' },
{ 'Prosocialidad': '0.59', 'Popularidad': '0.45', 'estudiante': 'NICOLAS  PATIÑO ROMO' },
{ 'Prosocialidad': '0.15', 'Popularidad': '0.29', 'estudiante': 'JUAN PABLO GIL CARDENAS' },
{ 'Prosocialidad': '0.6', 'Popularidad': '0.46', 'estudiante': 'JUAN NICOLAS GALINDO MANTILLA' }
    ];

    var svg = dimple.newSvg("#" + idDiv, dimX, dimY);

    var myChart = new dimple.chart(svg, data1);
    myChart.setBounds(60, 30, dimX - 90, dimY - 70)
    myChart.addMeasureAxis("x", "Prosocialidad");
    myChart.addMeasureAxis("y", "Popularidad");
    myChart.addCategoryAxis("z", "estudiante");
    var s = myChart.addSeries("Correlación 0.95", dimple.plot.bubble);
    myChart.addLegend(200, 10, 360, 20, "right");
    myChart.draw();
}

function cargar4(idDiv) {
    $('#' + idDiv).html("");
    var data1 = [
		{ 'Apoyo padres': '0.64', 'Reconocimiento acádemica': '0.41', 'estudiante': 'MANUELA  PATIÑO SANCHEZ' },
{ 'Apoyo padres': '0.36', 'Reconocimiento acádemica': '0.13', 'estudiante': 'SAMUEL EDUARDO FLOREZ ZULUAGA' },
{ 'Apoyo padres': '0.43', 'Reconocimiento acádemica': '0.19', 'estudiante': 'JUAN ANDRES OBANDO VELEZ' },
{ 'Apoyo padres': '0.51', 'Reconocimiento acádemica': '0.26', 'estudiante': 'DANIELA  RODRIGUEZ BENJUMEA' },
{ 'Apoyo padres': '0.11', 'Reconocimiento acádemica': '0.01', 'estudiante': 'LAURA MARIA ANGULO RODRIGUEZ' },
{ 'Apoyo padres': '0.7', 'Reconocimiento acádemica': '0.49', 'estudiante': 'DANIELA  FORERO MENDEZ' },
{ 'Apoyo padres': '0.42', 'Reconocimiento acádemica': '0.18', 'estudiante': 'LAURA ALEJANDRA RODRIGUEZ DIAZ' },
{ 'Apoyo padres': '0.18', 'Reconocimiento acádemica': '0.03', 'estudiante': 'TATIANA ALEJANDRA CRUZ BELTRAN' },
{ 'Apoyo padres': '0.91', 'Reconocimiento acádemica': '0.82', 'estudiante': 'ISABELLA  NARANJO HERNANDEZ' },
{ 'Apoyo padres': '0.46', 'Reconocimiento acádemica': '0.21', 'estudiante': 'ALEJANDRO  ARIAS ORTIZ' },
{ 'Apoyo padres': '0.71', 'Reconocimiento acádemica': '0.51', 'estudiante': 'SIMON  HERRERA ULLOA' },
{ 'Apoyo padres': '0.82', 'Reconocimiento acádemica': '0.67', 'estudiante': 'LAURA VALENTINA HERRERA APONTE' },
{ 'Apoyo padres': '0.69', 'Reconocimiento acádemica': '0.48', 'estudiante': 'MIGUEL ANGEL RUEDA AGUILERA' },
{ 'Apoyo padres': '0.31', 'Reconocimiento acádemica': '0.1', 'estudiante': 'JACOB  MURPHY BEJARANO' },
{ 'Apoyo padres': '0.03', 'Reconocimiento acádemica': '0', 'estudiante': 'MELISSA ALEXANDRA GARCIA VASQUEZ' },
{ 'Apoyo padres': '0.8', 'Reconocimiento acádemica': '0.64', 'estudiante': 'JUAN DIEGO BELTRAN PARIS' },
{ 'Apoyo padres': '0.61', 'Reconocimiento acádemica': '0.37', 'estudiante': 'VANEZA  GOMEZ SEGURA' },
{ 'Apoyo padres': '0.95', 'Reconocimiento acádemica': '0.85', 'estudiante': 'JUAN ESTEBAN LESMES OSORIO' },
{ 'Apoyo padres': '0.79', 'Reconocimiento acádemica': '0.49', 'estudiante': 'DAVID ALFONSO AYALA MOJICA' },
{ 'Apoyo padres': '0.65', 'Reconocimiento acádemica': '0.28', 'estudiante': 'SEBASTIAN  VIDALES BOHORQUEZ' },
{ 'Apoyo padres': '0.92', 'Reconocimiento acádemica': '0.79', 'estudiante': 'SILVANA  ARIAS SALAZAR' },
{ 'Apoyo padres': '0.28', 'Reconocimiento acádemica': '0.02', 'estudiante': 'LAURA MILENA CELIS HERRERA' },
{ 'Apoyo padres': '0.01', 'Reconocimiento acádemica': '0', 'estudiante': 'DAVID  MORANTES MUÑOZ' },
{ 'Apoyo padres': '0.56', 'Reconocimiento acádemica': '0.17', 'estudiante': 'VANESSA ALEXANDRA ZAHRINGER REYES' },
{ 'Apoyo padres': '0.15', 'Reconocimiento acádemica': '0', 'estudiante': 'SERGIO ISAAC MISERQUE MEDINA' },
{ 'Apoyo padres': '0.08', 'Reconocimiento acádemica': '0', 'estudiante': 'CAMILO ANDRES SALAS D`ANTONIO' },
{ 'Apoyo padres': '0.35', 'Reconocimiento acádemica': '0.04', 'estudiante': 'SILVIA  REINEL VANEGAS' },
{ 'Apoyo padres': '0.54', 'Reconocimiento acádemica': '0.16', 'estudiante': 'ZULAY  URIBE GARCIA' },
{ 'Apoyo padres': '0.85', 'Reconocimiento acádemica': '0.62', 'estudiante': 'CATALINA  BONILLA PARRA' },
{ 'Apoyo padres': '0.28', 'Reconocimiento acádemica': '0.02', 'estudiante': 'JUAN ANDRES RIVERA ROMERO' },
{ 'Apoyo padres': '0.47', 'Reconocimiento acádemica': '0.1', 'estudiante': 'CATALINA  SAENZ RODRIGUEZ' },
{ 'Apoyo padres': '0.22', 'Reconocimiento acádemica': '0.01', 'estudiante': 'VALENTINA  PINO GUIZA' },
{ 'Apoyo padres': '0.84', 'Reconocimiento acádemica': '0.6', 'estudiante': 'JUAN FELIPE QUINTERO PULIDO' },
{ 'Apoyo padres': '0.27', 'Reconocimiento acádemica': '0.02', 'estudiante': 'NICOLAS  PATIÑO ROMO' },
{ 'Apoyo padres': '0.15', 'Reconocimiento acádemica': '0', 'estudiante': 'JUAN PABLO GIL CARDENAS' },
{ 'Apoyo padres': '0.53', 'Reconocimiento acádemica': '0.15', 'estudiante': 'JUAN NICOLAS GALINDO MANTILLA' }
    ];

    var svg = dimple.newSvg("#" + idDiv, dimX, dimY);

    var myChart = new dimple.chart(svg, data1);
    myChart.setBounds(60, 30, dimX - 90, dimY - 70)
    myChart.addMeasureAxis("x", "Apoyo padres");
    myChart.addMeasureAxis("y", "Reconocimiento acádemica");
    myChart.addCategoryAxis("z", "estudiante");
    var s = myChart.addSeries("Correlación 0.94", dimple.plot.bubble);
    myChart.addLegend(200, 10, 360, 20, "right");
    myChart.draw();
}


function cargar5(idDiv) {
    $('#' + idDiv).html("");
    var data1 = [
		{ 'Deportes': '0.85', 'Propension a ser victima': '0.1557', 'estudiante': 'MANUELA  PATIÑO SANCHEZ' },
{ 'Deportes': '0.01', 'Propension a ser victima': '0.991', 'estudiante': 'SAMUEL EDUARDO FLOREZ ZULUAGA' },
{ 'Deportes': '0.88', 'Propension a ser victima': '0.0924', 'estudiante': 'JUAN ANDRES OBANDO VELEZ' },
{ 'Deportes': '0.41', 'Propension a ser victima': '0.9983', 'estudiante': 'DANIELA  RODRIGUEZ BENJUMEA' },
{ 'Deportes': '0.19', 'Propension a ser victima': '0.7946', 'estudiante': 'LAURA MARIA ANGULO RODRIGUEZ' },
{ 'Deportes': '0.93', 'Propension a ser victima': '0.2649', 'estudiante': 'DANIELA  FORERO MENDEZ' },
{ 'Deportes': '0.95', 'Propension a ser victima': '0.211', 'estudiante': 'LAURA ALEJANDRA RODRIGUEZ DIAZ' },
{ 'Deportes': '0.7', 'Propension a ser victima': '0.4842', 'estudiante': 'TATIANA ALEJANDRA CRUZ BELTRAN' },
{ 'Deportes': '0', 'Propension a ser victima': '0.9982', 'estudiante': 'ISABELLA  NARANJO HERNANDEZ' },
{ 'Deportes': '0.55', 'Propension a ser victima': '0.7736', 'estudiante': 'ALEJANDRO  ARIAS ORTIZ' },
{ 'Deportes': '0.54', 'Propension a ser victima': '0.7886', 'estudiante': 'SIMON  HERRERA ULLOA' },
{ 'Deportes': '0.68', 'Propension a ser victima': '0.5326', 'estudiante': 'LAURA VALENTINA HERRERA APONTE' },
{ 'Deportes': '0.16', 'Propension a ser victima': '0.8221', 'estudiante': 'MIGUEL ANGEL RUEDA AGUILERA' },
{ 'Deportes': '0.36', 'Propension a ser victima': '0.5718', 'estudiante': 'JACOB  MURPHY BEJARANO' },
{ 'Deportes': '0.36', 'Propension a ser victima': '0.5645', 'estudiante': 'MELISSA ALEXANDRA GARCIA VASQUEZ' },
{ 'Deportes': '0.92', 'Propension a ser victima': '0.0016', 'estudiante': 'JUAN DIEGO BELTRAN PARIS' },
{ 'Deportes': '0.3', 'Propension a ser victima': '0.653', 'estudiante': 'VANEZA  GOMEZ SEGURA' },
{ 'Deportes': '0.53', 'Propension a ser victima': '0.2928', 'estudiante': 'JUAN ESTEBAN LESMES OSORIO' },
{ 'Deportes': '0.51', 'Propension a ser victima': '0.3372', 'estudiante': 'DAVID ALFONSO AYALA MOJICA' },
{ 'Deportes': '0.28', 'Propension a ser victima': '0.6724', 'estudiante': 'SEBASTIAN  VIDALES BOHORQUEZ' },
{ 'Deportes': '0.11', 'Propension a ser victima': '0.8826', 'estudiante': 'SILVANA  ARIAS SALAZAR' },
{ 'Deportes': '0.41', 'Propension a ser victima': '0.4863', 'estudiante': 'LAURA MILENA CELIS HERRERA' },
{ 'Deportes': '0.98', 'Propension a ser victima': '0.1269', 'estudiante': 'DAVID  MORANTES MUÑOZ' },
{ 'Deportes': '1', 'Propension a ser victima': '0.0917', 'estudiante': 'VANESSA ALEXANDRA ZAHRINGER REYES' },
{ 'Deportes': '0.89', 'Propension a ser victima': '0.3762', 'estudiante': 'SERGIO ISAAC MISERQUE MEDINA' },
{ 'Deportes': '0.51', 'Propension a ser victima': '0.33', 'estudiante': 'CAMILO ANDRES SALAS D`ANTONIO' },
{ 'Deportes': '0.39', 'Propension a ser victima': '0.5194', 'estudiante': 'SILVIA  REINEL VANEGAS' },
{ 'Deportes': '0.93', 'Propension a ser victima': '0.274', 'estudiante': 'ZULAY  URIBE GARCIA' },
{ 'Deportes': '0.66', 'Propension a ser victima': '0.858', 'estudiante': 'CATALINA  BONILLA PARRA' },
{ 'Deportes': '0.91', 'Propension a ser victima': '0.3268', 'estudiante': 'JUAN ANDRES RIVERA ROMERO' },
{ 'Deportes': '0.58', 'Propension a ser victima': '0.2207', 'estudiante': 'CATALINA  SAENZ RODRIGUEZ' },
{ 'Deportes': '0.24', 'Propension a ser victima': '0.7308', 'estudiante': 'VALENTINA  PINO GUIZA' },
{ 'Deportes': '0.09', 'Propension a ser victima': '0.9043', 'estudiante': 'JUAN FELIPE QUINTERO PULIDO' },
{ 'Deportes': '0.28', 'Propension a ser victima': '0.6782', 'estudiante': 'NICOLAS  PATIÑO ROMO' },
{ 'Deportes': '0.34', 'Propension a ser victima': '0.5934', 'estudiante': 'JUAN PABLO GIL CARDENAS' },
{ 'Deportes': '0.34', 'Propension a ser victima': '0.dimX6', 'estudiante': 'JUAN NICOLAS GALINDO MANTILLA' }
    ];

    var svg = dimple.newSvg("#" + idDiv, dimX, dimY);

    var myChart = new dimple.chart(svg, data1);
    myChart.setBounds(60, 30, dimX - 90, dimY - 70)
    myChart.addMeasureAxis("x", "Deportes");
    myChart.addMeasureAxis("y", "Propension a ser victima");
    myChart.addCategoryAxis("z", "estudiante");
    var s = myChart.addSeries("Correlación -0.83", dimple.plot.bubble);
    myChart.addLegend(200, 10, 360, 20, "right");
    myChart.draw();
}