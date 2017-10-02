function addCamposRequeridos() {
    $('#ContentPlaceHolder1_contenidoPrincipal_modalRte_ddl_tipoRtes').attr('required', 'true');
    $('#ContentPlaceHolder1_contenidoPrincipal_modalRte_ddl_gravedadRte').attr('required', 'true');
}
function removeCamposRequeridos() {
    $('#ContentPlaceHolder1_contenidoPrincipal_modalRte_ddl_tipoRtes').removeAttr('required');
    $('#ContentPlaceHolder1_contenidoPrincipal_modalRte_ddl_gravedadRte').removeAttr('required');
}
function limpiarSelectores() {
    $('#ContentPlaceHolder1_contenidoPrincipal_modalRte_ddl_tipoRtes').val("");
    $('#ContentPlaceHolder1_contenidoPrincipal_modalRte_ddl_gravedadRte').val("");
}
function focoNombreCaso() {
    $('#ContentPlaceHolder1_contenidoPrincipal_modalRte_txt_nombreCaso').focus();
}
function ocultarDivReporte() {
    $('#divNvoReporte').hide("slow");
}
function verDivReporte() {
    $('#divNvoReporte').show();
    $('#ContentPlaceHolder1_contenidoPrincipal_txtDescripcion').focus();
}
function verDarDictamen() {
    $('#myModalSolucion').modal();
}

function ocultarDivComentario() {
    $('#divComentario').hide("slow");
    return false;
}
function verDivComentario() {
    $('#divComentario').show("slow");
    $(txtDescripcionInterv).val("");
    return false;
}
var sliders = function () {
    return {
        init: function () {
            
            $("#ContentPlaceHolder1_contenidoPrincipal_rankSolucion").ionRangeSlider({
                type: "single",
                values: ["Mala","Regular","Buena", "Muy buena","Excelente"]
            });

            // Save slider instance to var
            var slider = $("#ContentPlaceHolder1_contenidoPrincipal_rankSolucion").data("ionRangeSlider");

            // Call sliders update method with any params
            
        }
    }
}();

var dropDowns = function () {

    return {
        
        init: function () {
            function format(state) {
                if (!state.id) return state.text; // optgroup
                return "<img class='flag' src='../../assets/global/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
            }

            $("select").select2({
                placeholder: "Selecciona una opción...",
                allowClear: true,
                formatResult: format,
                formatSelection: format,
                width: '100%',
                escapeMarkup: function (m) {
                    return m;
                }
            });
        }

    };

}();


jQuery(document).ready(function () {
    dropDowns.init();
    sliders.init();
    $("[src*=minus]").on("click", function () {
        $(this).attr("src", "../../resources/assets/imagenes/plus.png");
        $(this).closest("tr").next().remove();
    });

    $("[src*=plus]").on("click", function () {
        $(this).closest("tr").after("<tr><td></td><td colspan = '999'>" + $(this).next().html() + "</td></tr>")
        $(this).attr("src", "../../resources/assets/imagenes/minus.png");
    });
});