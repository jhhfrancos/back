var ippc;
$(document).ready(function () {
    obtenerIp();
    datos();
    $('#btn_finalizar').click(function () {
        procesar();
    });
});
$(document).ready(
    function () {
        $("#btn_siguiente").click(function () {
            procesar();
        });
    });



function haciaAbajo(divSigId) {
    var divSig = $("#" + divSigId);


    $('html,body').animate({
        scrollTop: divSig.offset().top
    }, 1000, function () { // function to focus here
        divSig.focus();
    });
}

function errores(msg) {
    //msg.responseText tiene el mensaje de error enviado por el servidor
    alertSignal('Error: ' + msg.responseText);
}
function beforeSend() {
    $("#wait").css("display", "block");
}
function complete() {
    $("#wait").css("display", "none");
}
function datos() {



    $.ajax({
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        // data: JSON.stringify(query),
        error: errores,
        beforeSend: beforeSend,
        //complete: complete,
        success: function (data) {
            jsonData = data.d;
            var info = jsonData;
            if (info.valid === true) {

                // alert(data_resutl[0].message);
                sessionStorage.setItem('info', JSON.stringify(info));

                $.ajax({
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    //data: JSON.stringify(query),
                    error: errores,
                    beforeSend: beforeSend,
                    // complete: complete,
                    success: function (data) {
                        jsonData = data.d;
                        var infoPer = jsonData;
                        if (infoPer.valid === true) {
                            sessionStorage.setItem('infoPer', JSON.stringify(infoPer));
                            llenarDatos(info, infoPer.content);
                        }

                    },
                    type: "POST",
                    url: "FormularioR.aspx/personas"
                });

            } else

                if (info.message === "ERROR") {
                    var contError = $("#MessageError");
                    contError.css('display', 'block');
                    contError.html('<li>NO ESTA AUTORIZADO.</li>');
                    contError.focus();
                    window.setTimeout(function () {

                        // Move to a new location or you can do something else
                        $('#btn_siguiente').hide();
                        $('#btn_finalizar').hide();
                        window.location.href = "../Index.aspx";

                    }, 1000);
                }
        },
        type: "POST",
        url: "FormularioR.aspx/jsonData"
    });


}

function llenarDatos(info, infoPer) {
    var configuracionJson = info.content.configuracion;
    configuracionOBJ = JSON.parse(configuracionJson);
    var divBordeados = new Array();
    var divScroll = new Array();
    var preguntasF = info.content.preguntasF;
    var rtas = null;
    var respuestaArray = null;
    var respuesta = "";
    var perCur = infoPer.perCur;
    var rtaPta = info.content.rtaPta;
    var perCol = infoPer.perCol;
    var contenidoWizard = $("#contenidoWizard");
    var mw = $("#menuWizard");
    var mensaje = $("#MessageError");
    if (rtaPta != "") {
        rtas = JSON.parse(rtaPta);
    }


    elementosXtab = info.content.preguntasXpagina;
    var bootstrap_Col_md = 12;
    if (elementosXtab < 3) {
        bootstrap_Col_md /= elementosXtab;
    } else {
        bootstrap_Col_md /= 3;
    }
    residuo = 0;
    cociente = 0;
    panelAdicional = (residuo > 0 ? 1 : 0);
    totalPanel = (tamanho / elementosXtab) + panelAdicional;
    var jsonOpciones = "", idControl = "";
    var tamanho = preguntasF.length;
    var html = "";
    residuo = tamanho % elementosXtab;
    for (var i = 0; i < tamanho; i++) {
        bordeada = "";
        var pta = preguntasF[i];
        confPgtaObj = null;
        if (pta.configuracion != null && pta.configuracion!="") {
            confPgtaObj = JSON.parse(pta.configuracion);
        }
        
        itemPreResuelta = buscarRespuestaForm(rtas, pta.idPregunta);

        idControl = "p_" + i + "t_" + pta.tipoPta;
        residuo = i % elementosXtab;
        cociente = i / elementosXtab;
        if (residuo == 0) {
            tabStr = "tab" + (cociente + 1);
            mw.append(" <li><a href='#" + tabStr + "' data-toggle='tab'>" + (cociente + 1) + "</a></li>");
            contenidoWizard.append("<div class='tab-pane' id='" + tabStr + "'></div>");
            var tab = $("#tab" + (cociente + 1));

        }
        var divImg = '';
        if (confPgtaObj !=null && confPgtaObj.multimedia[0].visible=='true' ) {
            divImg = '<div><img alt="bebe1" height="151" src="{0}" width="225"></div>'.format(confPgtaObj.multimedia[0].src);
        }

        html = "<div class='form-group col-md-{0} bordes ' {1} id='{2}' onchange='javaScript: validarColor(this)'>{3}<label class='lbPregunta'>{4}. {5}  </label>".
            format(bootstrap_Col_md, "style='border:solid 3px rgb(255, 147, 147)'", pta.idPregunta, divImg, (i + 1), pta.descripcionPta);
        
        html += "<br/><div class='divInterno' > ";
        try {
            var opciones = JSON.parse(pta.opcionesPta);
        }
        catch (err) {
            alertSignal(err.message + " pregunta->" + (i + 1));
        }
        switch (pta.tipoPta) {
            case 1:

                // html += "<p>Tipo de pregunta=" + pta.tipoPta + "</p>";
                respuesta = "";
                if (itemPreResuelta != null && itemPreResuelta.respuesta != null) {
                    respuestaArray = itemPreResuelta.respuesta.split(",");
                    if (validarResPregunta(pta.tipoPta, itemPreResuelta.respuesta)) {
                        divBordeados.push(pta.idPregunta);
                    }
                }
                for (j = 0; j < opciones.cuantos; j++) {
                    html += " <select id='{0}'>".format(idControl + "n_" + (j + 1));
                    if (respuestaArray != null) {
                        respuesta = respuestaArray[j];
                    }

                    html += llenarControl(perCur, -1, respuesta);
                    html += " </select></br>";



                }

                break;
            case 2:

                // html += "<p>Tipo de pregunta=" + pta.tipoPta + "</p>";

                if (itemPreResuelta != null) {
                    respuesta = itemPreResuelta.respuesta;
                    if (validarResPregunta(pta.tipoPta, respuesta)) {
                        divBordeados.push(pta.idPregunta);
                    }

                }
                html += " <select id='{0}'  required>".format(idControl);
                html += "<option value='{0}'>{1}</option>".format("", "Seleccione una opción");
                for (j = 0; j < opciones.opciones.length; j++) {
                    select = "";
                    var value = opciones.opciones[j];
                    if (respuesta != "") {

                        if (respuesta === value + "") {
                            select = "selected";
                        }
                    }
                    html += "<option value='{0}' {1}>{2}</option>".format(value, select, value);
                }
                html += " </select>";




                break;
            case 3:
                var contadorI1 = 1;
                var texto = "";
                if (itemPreResuelta != null) {
                    respuesta = itemPreResuelta.respuesta;
                    if (validarResPregunta(pta.tipoPta, itemPreResuelta.respuesta)) {
                        divBordeados.push(pta.idPregunta);
                    }
                }

                // html += "<p>Tipo de pregunta=" + pta.tipoPta + "</p>";

                html += "<div class='md-radio-list'>";
                for (j = 0; j < opciones.opciones.length; j++) {
                    var value = opciones.opciones[j];
                    if (value.indexOf("<img") > -1) {
                        texto = "Imagen" + contadorI1;
                        divScroll.push(pta.idPregunta);
                    } else {
                        texto = value;
                    }
                    select = "";
                    if (respuesta != null && respuesta != "") {
                        if (respuesta === texto) {

                            select = "checked";
                        }
                    }
                    html += getRadio(idControl + "n_" + contadorI1, idControl, texto, value, select)
                    contadorI1++;
                }
                html += "</div>";

                break;
            case 4:

                // html += "<p>Tipo de pregunta=" + pta.tipoPta + "</p>";
                var genero = opciones.clasificacion === "ellos" ? 1 : 2;
                respuesta = "";
                if (itemPreResuelta != null && itemPreResuelta.respuesta != null) {
                    respuestaArray = itemPreResuelta.respuesta.split(",");
                    if (validarResPregunta(pta.tipoPta, itemPreResuelta.respuesta)) {
                        divBordeados.push(pta.idPregunta);
                    }
                }

                for (iterador = 0; iterador < opciones.cuantos; iterador++) {
                    html += " <select id='{0}'>".format(idControl + "n_" + (iterador + 1));
                    if (itemPreResuelta != null && itemPreResuelta.respuesta != null) {
                        respuesta = respuestaArray[iterador];
                    }
                    html += llenarControl(perCur, genero, respuesta);
                    html += " </select></br>";
                }


                break;
            case 5:
                var contadorI1 = 1;
                var texto = "";

                // html += "<p>Tipo de pregunta=" + pta.tipoPta + "</p>";

                if (opciones.opciones.length > 9) {
                    divScroll.push(pta.idPregunta);
                }
                if (itemPreResuelta != null && itemPreResuelta.respuesta != null) {
                    respuestaArray = itemPreResuelta.respuesta.split(",");
                    if (validarResPregunta(pta.tipoPta, itemPreResuelta.respuesta)) {
                        divBordeados.push(pta.idPregunta);
                    }
                }
                html += "<div class='md-checkbox-list' " + scroll + ">";

                for (iterador = 0; iterador < opciones.opciones.length; iterador++) {
                    var value = opciones.opciones[iterador];
                    if (value.indexOf("<img") > -1) {
                        texto = "Imagen" + contadorI1;
                        divScroll.push(pta.idPregunta);
                    } else {
                        texto = value;
                    }

                    respuesta = "";
                    if (itemPreResuelta != null && itemPreResuelta.respuesta != null) {
                        for (var a = 0; a < respuestaArray.length; a++) {
                            if (respuestaArray[a] === texto) {
                                select = "checked";
                                break;
                            }
                        }
                    }

                    html += getCheck(idControl + "n_" + contadorI1, idControl, texto, value, select)
                    select = "";
                    contadorI1++;
                }
                html += "</div>";


                break;
            case 6:


                var texto = "";

                // html += "<p>Tipo de pregunta=" + pta.tipoPta + "</p>";
                respuesta = "";
                if (itemPreResuelta != null && itemPreResuelta.respuesta != null) {
                    respuestaArray = itemPreResuelta.respuesta.split(",");
                    if (validarResPregunta(pta.tipoPta, itemPreResuelta.respuesta)) {
                        divBordeados.push(pta.idPregunta);
                    }
                }
                html += "<div class='md-checkbox-list'>";
                for (iterador = 0; iterador < opciones.cuantos; iterador++) {
                    if (itemPreResuelta != null && itemPreResuelta.respuesta != null) {

                        respuesta = respuestaArray[iterador];

                    }
                    html += getText(idControl + "n_" + (iterador + 1), idControl, respuesta) + "<br/><br/>";

                }



                break;
            case 7:
                // html += "<p>Tipo de pregunta=" + pta.tipoPta + "</p>";
                html += "<table class='table table-hover' > ";
                select = "";
                contador2 = 0;
                listaSubRespuestas = null;
                if (itemPreResuelta != null && itemPreResuelta.respuesta != null) {
                    listaSubRespuestas = JSON.parse(itemPreResuelta.respuesta);

                    if (validarResPregunta(pta.tipoPta, itemPreResuelta.respuesta)) {
                        divBordeados.push(pta.idPregunta);
                    }
                }

                
                iteradorSubOpeciones = 0;
                for (var iterador = 0; iterador < opciones.length; iterador++) {
                    var itemSubpregunta = opciones[iterador];
                    iteradorSubOpeciones += itemSubpregunta.opciones.length;
                    html += "<tr>";
                    html += "<td>";
                    html += itemSubpregunta.subPregunta;
                    html += "</td>";
                    html += "<td>";

                    restaSubPregunta = "-";
                    if (listaSubRespuestas != null && listaSubRespuestas.length > 0) {
                       
                        for (var x = 0; x < listaSubRespuestas.length; x++) {
                            if (listaSubRespuestas[x].pregunta === itemSubpregunta.subPregunta) {
                                restaSubPregunta = listaSubRespuestas[x].respuesta;
                                break;
                            }
                        }

                    }

                    html += "<div class='md-radio-list'>";
                    for (subIterador = 0; subIterador < itemSubpregunta.opciones.length; subIterador++) {
                        var value = itemSubpregunta.opciones[subIterador];
                        if (value.indexOf("<img") > -1) {
                            texto = "Imagen" + iterador;
                           // divScroll.push(pta.idPregunta);
                        } else {
                            texto = value;
                        }
                        if (restaSubPregunta === texto) {
                            select = "checked";
                        }


                        html += getRadio(idControl + "n_" + iterador + "s_" + subIterador, idControl + "n_" + iterador, texto, value, select)
                        select = "";

                    }
                    html += "</div>";
                    html += "</td>";
                    html += "</tr>";

                }

                if (iteradorSubOpeciones > 7) {
                    divScroll.push(pta.idPregunta);
                }

                break;
            case 8:

                // html += "<p>Tipo de pregunta=" + pta.tipoPta + "</p>";

                respuesta = "";
                if (itemPreResuelta != null && itemPreResuelta.respuesta != null) {
                    respuestaArray = itemPreResuelta.respuesta.split(",");
                    if (validarResPregunta(pta.tipoPta, itemPreResuelta.respuesta)) {
                        divBordeados.push(pta.idPregunta);
                    }
                }
                for (j = 0; j < opciones.cuantos; j++) {
                    html += " <select id='{0}'>".format(idControl + "n_" + (j + 1));
                    if (itemPreResuelta != null && itemPreResuelta.respuesta != null) {
                        respuesta = respuestaArray[j];
                    }
                    html += llenarControl(perCol, -1, respuesta);
                    html += " </select></br>";



                }

                break;

        }
        html += "</div></div>";
        tab.append(html);
        //$("#" + divAcambiar).css("overflow", "scroll");

    }
    iniciarWizard();
    enableTab();
    formulariosDinamicos.init();

    for (var i = 0; i < divBordeados.length; i++) {
        idDiv = divBordeados[i];
        $('#' + idDiv).css('border', 'solid 1px rgb(64, 232, 28)');
    }
    for (var i = 0; i < divScroll.length; i++) {
        idDiv = divScroll[i];
        $('#' + idDiv).css("overflow", "scroll");
    }
    $("#wait").css("display", "none");


}

function enableTab() {
    var tab = $('#rootwizard').bootstrapWizard("currentIndex");
    var total = $('#rootwizard').bootstrapWizard('navigationLength');
    for (var i = 0; i <= total; i++) {
        if (i > tab) {
            $('#rootwizard').bootstrapWizard('hide', i);
        } else {
            $('#rootwizard').bootstrapWizard('display', i);
        }
    }
}

function validarResPregunta(idTipo, respuesta) {
    respuesta = respuesta != null ? respuesta : "";
    switch (idTipo) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 8:

            respuestaArray = respuesta.split(",");
            join = respuestaArray.join('')
            valida = join != "";
            return valida;

        case 7:
            var subPreguntas = JSON.parse(respuesta);
            var rtaVacia = 0;
            for (var i = 0; i < subPreguntas.length; i++) {
                if (subPreguntas[i].respuesta === "") {
                    rtaVacia++;
                }
            }
            valida = (rtaVacia === 0);
            return valida;
    }

}

function getRadio(id, name, value, label, select) {

    html = "<div class='md-radio'><input " + select + "  type='radio' id='{0}'   name='{1}' value='{2}' class='md-radiobtn'>         <label for='{3}'>             <span class='inc'></span>             <span class='check'></span>             <span class='box'></span> {4}         </label>    </div>".format(id, name, value, id, label);
    return html;
}
function getCheck(id, name, value, label, select) {
    html = "<div class='md-checkbox'><input " + select + "  type='checkbox' id='{0}'  class='md-check' name='{1}' value='{2}'><label for='{3}'>  <span class='inc'></span>  <span class='check'></span>  <span class='box'></span> {4} </label></div>".format(id, name, value, id, label);
    return html;
}
function getText(id, name, texto) {
    html = "<input type='text' id='{0}' name='{1}' value='{2}'>".format(id, name, texto);
    return html;
}
function llenarControl(lista, genero, respuesta) {
    item = "";
    select = "";
    item += "<option value='{0}'>{1}</option>".format("", "Seleccione una opción");
    if (respuesta != "") {
        if (respuesta === "00000000-0000-0000-0000-000000000000") {
            select = "selected";
        }
    }
    item += "<option value='{0}' {1}>{2}</option>".format("00000000-0000-0000-0000-000000000000", select, "Ninguna ");
    for (x = 0; x < lista.length; x++) {
        if (genero === -1 || lista[x].genero === genero || lista[x].genero === 0) {
            if (respuesta != "") {
                if (respuesta === lista[x].Id) {
                    select = "selected";
                }
            }
            item += "<option value='{0}' {1}>{2}</option>".format(lista[x].Id, select, lista[x].Nombre);
            select = "";
        }


    }
    return item;
}
function buscarRespuestaForm(respuestasFormulario, idPregunta) {
    if (respuestasFormulario != null) {
        for (var i = 0; i < respuestasFormulario.length; i++) {
            if (respuestasFormulario[i].pregunta === idPregunta) {
                return respuestasFormulario[i];
            }
        }
    }

    return null;
}
function iniciarWizard() {
    $('#rootwizard').bootstrapWizard({
        'tabClass': 'nav nav-pills',
        onTabShow: function (tab, navigation, index) {
            var $total = navigation.find('li').length;
            var $current = index + 1;
            var $percent = ($current / $total) * 100;
            var progreso = $('#rootwizard').find('.bar');
            //si el indice del tab es mayor o igual al ultimo indice de tabs, entonces ocultamos el btn siguiente
            if ($current >= $total) {
                $('#btn_siguiente').hide();
                $('#btn_finalizar').show();
            } else {
                $('#btn_siguiente').show();
                $('#btn_finalizar').hide();
            }


            progreso.css("width", $percent + '%');

        },
        onNext: function (tab, navigation, index) {



        }
    });
    window.prettyPrint && prettyPrint()
}


function procesar() {
    var error_message = '';
    var tabActual = $('#rootwizard').bootstrapWizard("currentIndex");
    var total = $('#rootwizard').bootstrapWizard('navigationLength');
    respuestasInvalidas = "";
    var respuestas = new Array();
    if (sessionStorage.getItem("info")) {
        info = JSON.parse(sessionStorage.getItem("info"));
        var preguntasF = info.content.preguntasF;
        var tamanho = preguntasF.length;
       var elementosXtab = info.content.preguntasXpagina;
        var pta = null;
        for (var i = 0; i < tamanho; i++) {
            var tabPregunta = Math.floor(i / elementosXtab);
            pta = preguntasF[i];
            var rta = validarPregunta(pta.idPregunta);
            respuestas.push(rta.resForm);
            if (rta.mensaje != "ok" && tabPregunta <= tabActual) {
                thiDiv = $('#' + pta.idPregunta);
                thiDiv.css('border', 'solid 3px rgb(255, 147, 147)');
                respuestasInvalidas = "responde todas las preguntas que estan bordeadas en rojo";
            }

        }

        if (respuestasInvalidas != "") {
            alertSignal(respuestasInvalidas);

        } else {



            /*
            envio datos

            */
            estado = tabActual === total ? 2 : 1;
            
            
            

            var data = { tab: tabActual, respuestas: respuestas, estado: estado, preguntasXpagina: elementosXtab, ip: ippc };

            $.ajax({
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "POST",
                url: "FormularioR.aspx/guardarData",
                data: JSON.stringify(data),
                error: errores,
                beforeSend: beforeSend,
                //complete: complete,
                success: function (data) {
                    jsonData = data.d;
                    var info = jsonData;
                    if (info.valid === true) {
                        if (estado === 1) {
                            $("html, body").animate({ scrollTop: 110}, "slow");
                            $('#rootwizard').bootstrapWizard('next');
                            enableTab();
                            complete();
                        } else {

                            url = info.content.url;
                            complete();
                            alertSignal("GRACIAS se ha guardado la información correctamente");
                            //borrar datos de session
                            sessionStorage.clear();
                            $('#btn_siguiente').hide();
                            $('#btn_finalizar').hide();


                            // Move to a new location or you can do something else                              

                            window.location.href = url;


                        }

                    } else {
                        complete();
                        alertSignal(info.message);


                    }

                }
            });
        }

    } else {
        alertSignal("Error no se encuentran los recursos solicitados");
    }


}
function obtenerIp() {
    $.getJSON("http://jsonip.com/?callback=?", function (data) {
        ippc = data.ip;
    });
};




function validarColor(div) {
    var btn = $(".botonAbajo");
    btn.each(function () {
        $(this).remove();
    });
    btn.remove();
    var rta = validarPregunta(div.id);
    var thiDiv = $('#' + div.id);
    if (rta.mensaje === "ok") {
        thiDiv.css('border', 'solid 1px rgb(64, 232, 28)');
        var divSig = thiDiv.next();
        var offset1 = thiDiv.offset();
        var offset2 = divSig.offset();
        if (offset1 != undefined && offset2 != undefined) {
            if (offset1.top === offset2.top) {
                $('html,body').animate({

                }, 1000, function () { // function to focus here
                    divSig.focus();

                });
            } else {


                var boton = "";
                boton = '<a href="#" class="botonAbajo" onclick="javaScript: haciaAbajo(\'' + divSig.attr("id") + '\')"> Continuar</br><img class="ImgbotonAbajo" src="../resources/custom/images/flecha-imagen-animada-0011.gif" /></a>';


                thiDiv.append(boton);


            }
        }


    } else {
        thiDiv.css('border', 'solid 3px rgb(255, 147, 147)');

    }
}
function validarPregunta(idDiv) {

    var pregunta = "";
    var respuesta = "";
    var mensaje = "";
    if (sessionStorage.getItem("info")) {
        info = JSON.parse(sessionStorage.getItem("info"));
        var preguntasF = info.content.preguntasF;
        var tamanho = preguntasF.length;
        var pta = null;
        for (var i = 0; i < tamanho; i++) {


            if (preguntasF[i].idPregunta === idDiv) {
                pta = preguntasF[i];
                break;
            }
        }
        if (pta != null) {
            pregunta = pta.idPregunta;
            var opciones = JSON.parse(pta.opcionesPta);
            idControl = "p_" + i + "t_" + pta.tipoPta;
            switch (pta.tipoPta) {
                case 1:
                case 2:
                case 4:
                case 8:
                    var items = [];
                    $("#" + idDiv + " select").each(function (index) {
                        items.push($(this).val());
                    });
                    for (var i = 0; i < items.length; i++) {
                        if (items[i] != "") {
                            mensaje = "ok";
                            break;
                        }
                    }

                    respuesta = items.join(",");
                    break;

                case 3:
                    name = idControl;
                    valor = $("input[name=" + name + "]:checked").val();
                    respuesta = valor;
                    if (valor != null && valor != "") {
                        mensaje = "ok";
                    } else {
                        valor = "";
                    }
                    break;

                case 5:



                    var items = [];
                    $("input[name='" + idControl + "']:checked").each(function () { items.push($(this).val()); });
                    mensaje = items.length > 0 ? "ok" : "";
                    respuesta = items.join(",");

                    break;
                case 6:

                    var texto = "";
                    listaRespuestas = new Array();
                    preguntaResuelta = false;
                    for (iterador = 0; iterador < opciones.cuantos; iterador++) {
                        valor = $("#" + idControl + "n_" + (iterador + 1)).val();
                        if (!(valor == null || valor == "")) {
                            preguntaResuelta = true;

                        } else {
                            valor = "";
                        }
                        listaRespuestas.push(valor);
                    }
                    if (preguntaResuelta) {
                        mensaje = "ok";
                    }

                    respuesta = listaRespuestas.join(",");
                    break;
                case 7:
                    contador = 0;
                    listaSubPreguntas = new Array();
                    for (var iterador = 0; iterador < opciones.length; iterador++) {
                        var itemSubpregunta = opciones[iterador];
                        name = idControl + "n_" + iterador;
                        valor = $("input[name=" + name + "]:checked").val();
                        //valor = $("input:radio[name='" + name+ "']:checked").val();

                        listaSubPreguntas.push(new RespuestaForm(itemSubpregunta.subPregunta, valor == null || valor == "" ? "" : valor));
                        if (valor != null && valor != "") {
                            contador++;
                        }
                    }
                    if (contador === opciones.length) {
                        mensaje = "ok";
                    }
                    respuesta = JSON.stringify(listaSubPreguntas);
                    break;

            }
        }
    }
    var respuestaFormulario = new RespuestaForm(pregunta, respuesta);
    var sendInfo = {
        mensaje: mensaje,
        resForm: respuestaFormulario
    };
    return sendInfo;
}
function RespuestaForm(pregunta, respuesta) {

    this.pregunta = pregunta;
    this.respuesta = respuesta;

}

$(document).ready(function () {




    // Disable step
    $('#disable-step').on('click', function () {
        $('#rootwizard').bootstrapWizard('disable', $('#stepid').val());
    });

    // Enable step
    $('#enable-step').on('click', function () {
        $('#rootwizard').bootstrapWizard('enable', $('#stepid').val());
    });

    // Remove step
    $('#remove-step').on('click', function () {
        $('#rootwizard').bootstrapWizard('remove', $('#stepid').val(), true);
    });

    // Show step
    $('#show-step').on('click', function () {
        $('#rootwizard').bootstrapWizard('display', $('#stepid').val());
    });

    // Hide step
    $('#hide-step').on('click', function () {
        $('#rootwizard').bootstrapWizard('hide', $('#stepid').val());
    });

});

function alertSignal(mensaje) {
    smoke.alert(mensaje, function (e) {

    }, {
        ok: "Aceptar",
        classname: "custom-class"
    });
}
