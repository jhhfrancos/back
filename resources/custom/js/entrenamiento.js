var nombre, colegio, texto, paso=0;
var texto1 = $('#texto1');
var texto2 = $('#texto2');
var texto3 = $('#texto3');
var textoAyuda = $('#textAyuda');
var opcion = $('#textoOpcion');
var animaciondiv = $('#animacion');
var imagenNube = $('#imagenNube');

$(document).ready(
    function () {
        $("#btn_siguiente").click(function () {
            $('#form_wizard_1').bootstrapWizard('next');
        });
        $("select").select2({ width: '100%', margin: '10px' });
    });
function validarColor(div) {
    var rta = validarPregunta(div.id);
    var thiDiv = $('#' + div.id);
    if (rta.mensaje === "ok") {
        thiDiv.css('border', 'solid 1px rgb(64, 232, 28)');
    } else {
        thiDiv.css('border', 'solid 3px rgb(255, 147, 147)');
    }
}
function validarPregunta(idDiv) {
    var mensaje = "";
    var nombreIdControl, items = [];
    switch (idDiv) {
        case 'scroll1check':
            nombreIdControl = 'checkName1';
            $("input[name='" + nombreIdControl + "']:checked").each(function () { items.push($(this).val()); });
            mensaje = items.length > 0 ? "ok" : "";
            break;
        case 'scroll2check':
            nombreIdControl = 'checkName2';
            $("input[name='" + nombreIdControl + "']:checked").each(function () { items.push($(this).val()); });
            mensaje = items.length > 0 ? "ok" : "";
            break;
        case 'tablaRadios':
            var valor1, valor2, valor3, valor4, valor5, valor6;
            valor1 = $("input[name=" + 'radioNameSub1' + "]:checked").val();
            valor2 = $("input[name=" + 'radioNameSub2' + "]:checked").val();
            valor3 = $("input[name=" + 'radioNameSub3' + "]:checked").val();
            valor4 = $("input[name=" + 'radioNameSub4' + "]:checked").val();
            valor5 = $("input[name=" + 'radioNameSub5' + "]:checked").val();
            valor6 = $("input[name=" + 'radioNameSub6' + "]:checked").val();
            if (valor1 != null && valor1 != "" && valor2 != null && valor2 != "" && valor3 != null && valor3 != ""
                && valor4 != null && valor4 != "" && valor5 != null && valor5 != "" && valor6 != null && valor6 != "") {
                pulsos('radiosTable', false);
                showPaso(9);
                mensaje = "ok";
            } else {
                mensaje = "";
            }
            break;
        case 'radios1':
            nombreIdControl = 'radioName1';
            valor = $("input[name=" + nombreIdControl + "]:checked").val();
            if (valor != null && valor != "") {
                mensaje = "ok";
            } else {
                mensaje = "";
            }
            break;
        case 'radios2':
            nombreIdControl = 'radioName2';
            valor = $("input[name=" + nombreIdControl + "]:checked").val();
            if (valor != null && valor != "") {
                mensaje = "ok";
            } else {
                mensaje = "";
            }
            break;
        case 'radios3':
            nombreIdControl = 'radioName3';
            valor = $("input[name=" + nombreIdControl + "]:checked").val();
            if (valor != null && valor != "") {
                mensaje = "ok";
            } else {
                mensaje = "";
            }
            break;
        case 'autofill1':
        case 'autofill2':
            $("#" + idDiv + " select").each(function (index) {
                items.push($(this).val());
            });
            for (var i = 0; i < items.length; i++) {
                if (items[i] != "") {
                    mensaje = "ok";
                    break;
                }
            }
            break;
        case 'textoabierta':
            var texto = $('#textId').val();
            if (texto === "") {
                mensaje = "";
            } else {
                mensaje = "ok";
            }
            break;
    }
    var sendInfo = {
        mensaje: mensaje
    };
    return sendInfo;
}
function cargarNombre() {
    
    if ($('#textAyuda').css('display') != 'none'){
        texto = $('#textAyuda').val();
        if (texto != '') {
            switch (opcion.html()) {
                case "1":
                    nombre = texto;
                    resetValues();
                    texto2.html("Cual es tu colegio?");
                    opcion.html("2");
                    break;
                case "2":
                    colegio = texto;
                    resetValues();
                    App.unblockUI('#contenidoWizard');
                    showPaso(++paso);
                    break;
            }
        } else {
            alert("Escribe un texto valido");
        }
    } else {
        App.unblockUI('#contenidoWizard');
        showNube(false);
    }
}
function resetValues() {
    texto1.html("");
    texto2.html("");
    texto3.html("");
    textoAyuda.val("");
    
}
function cambiarImagen(index) {
    var random = Math.floor((Math.random() * 3) + 1);
    switch(random){
        case 1:
            $("#imagenAnimacion").attr("src", "../resources/assets/imagenes/entrenamiento/tutores/bear" + index + ".png");
            break;
        case 2:
            $("#imagenAnimacion").attr("src", "../resources/assets/imagenes/entrenamiento/tutores/fox" + index + ".png");
            break;
        case 3:
            $("#imagenAnimacion").attr("src", "../resources/assets/imagenes/entrenamiento/tutores/owl" + index + ".png");
            break;
    }
}
function showNube(show,tex1,tex2,tex3) {
    $('#animacion').css('display', 'block');
    resetValues();
    if(show){
        $('#imagenNube').css('display', 'block');
        $('#textAyuda').css('display', 'none');
        texto1.html(tex1);
        texto2.html(tex2);
        texto3.html(tex3);
        UIBlockUI.init();
    } else {
        $('#imagenNube').css('display', 'none');
        App.unblockUI('#contenidoWizard');
    }
}
function pulsos(idDiv, show) {
    if(show){
        if (jQuery().pulsate) {
            jQuery('#'+idDiv).pulsate({
                color: "#bf1c56"
            });
        }
    } else {
        if (jQuery().pulsate) {
            jQuery('#' + idDiv).pulsate({
                color: "#26C281",
                repeat: false
            });
        }
    }
    return false;
}
function showPaso(showIndex) {
    switch(showIndex){
        case 1:
            $('#btnOk').html("Entendido");
            $('#btnOk').css("width", "27px");
            $('#scroll1check').removeClass('opac');
            showNube(true, '', 'Elige la opción que esta brillando', '');
            pulsos('checkId1ex',true);
            break;
        case 2:
            showNube(true, '', 'Elege más de un deporte', '');
            pulsos('checkId1Total', true);
            break;
        case 3:
            $('#scroll1check').scroll();
            $("#scroll1check").animate({
                scrollTop: 100
            }, 2000);
            showNube(true, 'Hay mas deportes acá abajo', 'Usa la barra para bajar', 'y selecciona otro de abajo');
            break;
        case 4:
            $('#scroll2check').removeClass('opac');
            pulsos('check2IdTotal', true);
            showNube(true, 'Ahora hazlo tu solo', 'Recuerda, usa la barra para bajar', 'Selecciona 3 comidas');
            
            break;
        case 5:
            showNube(true, '', 'Muy bien!', '');
            setTimeout(function () { showPaso(6); }, 3000);
            
            break;
        case 6:
            $('#radios1').removeClass('opac');
            
            pulsos('radioIdTotal', true);
            showNube(true, 'Usa la barra y encuentra más animales', "Solo puedes seleccionar uno", '');
            break;
        case 7:
            showNube(true, 'Muy bien!', 'Hemos terminado esta pagina', 'Da click en siguiente');
            
            break;
        case 8:
            $('#tablaRadios').removeClass('opac');
            showNube(true, '', "Elige si o no", 'hasta que el cuadro esté color verde');
            pulsos('radiosTable',true);
            break;
        case 9:
            showNube(true, '', 'Muy bien!', '');
            setTimeout(function () { showPaso(10); }, 3000);

            break;
        case 10:
            $('#autofill1').removeClass('opac');
            showNube(true, 'Da click en el cuadro brillante', "escribe las 3 primeras letras de tu respuesta", 'y haz click sobre la que quieres');
            pulsos('selectorId1Total', true);
      
            break;
        case 11:
            $('#autofill1').removeClass('opac');
            showNube(true, 'Si quieres,', " puedes seleccionar mas colores", '(Opcionál)');
            pulsos('selectorIdTotal', false);
            setTimeout(function () { showPaso(12); }, 5000);
            break;
        case 12:
            $('#autofill2').removeClass('opac');
            showNube(true, '', "Repite el ejercicio anterior", '');
            pulsos('selector2IdTotal', true);
            
            break;
        case 13:
            showNube(true, 'Muy bien!', 'Hemos terminado esta pagina', 'Da click en siguiente');
            break;
        case 14:
            $('#radios3').removeClass('opac');
            $('#radios2').removeClass('opac');
            $('#textoabierta').removeClass('opac');
            showNube(true, 'Aplica lo aprendido y termina el', 'cuestionario. Recuerda, los cuadros deben', 'estar verdes para continuar');
            break;
        case 15:
            showNube(true, "", "Muy bien!", "");
            setTimeout(function () { showNube(false, "", "", ""); }, 2000);
            break;
        case 16:
            showNube(true, "Has terminado el tutorial " + nombre, "Te enviaré a la pagina principal", "Que tengas un buena día!");
            setTimeout(function () { window.location.href = "/" }, 15000);
            break;
    }
}
$("#checkId1").change(function () {
    pulsos('checkId1ex', false);
    showPaso(2);
});
$("#checkId7, #checkId2, #checkId3, #checkId4, #checkId5, #checkId6, #checkId8, #checkId9, #checkId10").change(function () {
    pulsos('checkId1Total', false);
    showPaso(3);
});
$("#checkId11, #checkId12, #checkId13, #checkId14, #checkId15, #checkId16, #checkId18, #checkId19, #checkId20, #checkId21, #checkId17").change(function () {
    pulsos('checkId1Total', false);
    showPaso(4);
});
var contador = 0;
$("#check2Id1, #check2Id2, #check2Id3, #check2Id4, #check2Id5, #check2Id6, #check2Id7, #check2Id8, #check2Id9, #check2Id10, #check2Id11, #check2Id12").change(function () {
    if ($(this).is(':checked')) {
        contador++;
    } else {
        contador--;
    }
    if(contador == 3){
        pulsos('check2IdTotal', false);
        showPaso(5);
    }
});
$("input[name='radioName1']").change(function () {
    pulsos('radioIdTotal', false);
    showPaso(7);
});
$("input[name='radioName3']").change(function () {
    
    showPaso(15);
});
$("input[name='radioName2']").change(function () {

    showPaso(15);
});
$("#selectorId1").change(function () {
    pulsos('selectorId1Total', false);
    showPaso(11);
});
$("#selector2Id1").change(function () {
    pulsos('selector2IdTotal', false);
    showPaso(13);
});
$('#btn_finalizar').click(function(){
    showPaso(16);
    
});

