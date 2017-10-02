var contador = 0;
var contadorPreguntas = 0;
var contadorMax = 6;
var rebote = 0; //Previene el rebote de keydown
var keys = {};
var formulariosDinamicos = function () {

    return {
        //main function to initiate the module
        init: function () {
            $('.form-group').each(function () {
                //alert(this.scrollHeight);
                if (this.scrollHeight > 300) {
                    this.style.height = 400;
                }
            });
            function format(state) {
                if (!state.id) return state.text; // optgroup
                return "<img class='flag' src='../../assets/global/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
            }
            $("select").select2({
                placeholder: "Selecciona una...",
                allowClear: true,
                formatResult: format,
                width: 'auto',
                formatSelection: format,
                escapeMarkup: function (m) {
                    return m;
                }
            });
            contador = 0;
            //cambiarScroll('db1b3e9b-7476-4f48-afce-cb94e717decd');
        }

    };

}();
function cambiarScroll(divAcambiar) {
    
    
    $("#" + divAcambiar).css("overflow", "scroll");
}

function cambiarColor(divAcambiar,id) {
    if ($("#" + divAcambiar).hasClass("tablas")) {
        if (document.getElementById(divAcambiar).style.border != "solid rgb(64, 232, 28)" && document.getElementById(divAcambiar).style.border != "solid blue") {
            var cantidadSubPreguntas = $("#" + divAcambiar + " .md-radio-list").length;
            contadorMax = contadorMax + cantidadSubPreguntas;
            document.getElementById(divAcambiar).style.border = "solid"
            document.getElementById(divAcambiar).style.borderColor = "blue";
            contador++;
            contadorPreguntas++;
            wizardUpdate();
        }
        //divAcambiar = $('#' + divAcambiar + ' .md-radio-list')[0].id;
        var nuevoDiv = document.getElementById(id).parentElement.parentElement.parentElement.parentElement;
        cambiarColorSubPregunta(nuevoDiv);
    } else if (document.getElementById(divAcambiar).style.border != "solid rgb(64, 232, 28)") {
        document.getElementById(divAcambiar).style.border = "solid"
        document.getElementById(divAcambiar).style.borderColor = "#40E81C";
        contador++;
        contadorPreguntas++;
    }
};
function cambiarColorSubPregunta(laFila) {
    if (laFila.style.border != "solid rgb(64, 232, 28)") {
        laFila.style.border = "solid";
        laFila.style.borderColor = "#40E81C";
        contador++;
        contadorPreguntas++;
    }
};

jQuery(document).ready(function () {
    formulariosDinamicos.init();
    $(document).bind('keypress', function (event) {
        if (event.which === 69 && event.shiftKey && rebote==0) {
            $('#rootwizard').bootstrapWizard('previous');
            rebote = 1;
        } else if (event.which === 75 && event.shiftKey && rebote == 0) {
            $('#rootwizard').bootstrapWizard('next');
            rebote = 1;
        } else {
            rebote = 0;
        }
    });
});

function Func(indiceTab) {
   
    $('#rootwizard').bootstrapWizard('show', indiceTab);
   
    formulariosDinamicos.init();

    
};