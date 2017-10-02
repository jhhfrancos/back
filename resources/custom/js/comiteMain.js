function limpiarSelectores() {
    $('#ContentPlaceHolder1_contenidoPrincipal_modalRte_ddl_tipoRtes').val("");
    $('#ContentPlaceHolder1_contenidoPrincipal_modalRte_ddl_gravedadRte').val("");
}
function focoNombreCaso() {
    $('#ContentPlaceHolder1_contenidoPrincipal_modalRte_txt_nombreCaso').focus();
}
function addCamposRequeridos() {
    $('#ContentPlaceHolder1_contenidoPrincipal_modalRte_ddl_tipoRtes').attr('required', 'true');
    $('#ContentPlaceHolder1_contenidoPrincipal_modalRte_ddl_gravedadRte').attr('required','true');
}
function removeCamposRequeridos() {
    $('#ContentPlaceHolder1_contenidoPrincipal_modalRte_ddl_tipoRtes').removeAttr('required');
    $('#ContentPlaceHolder1_contenidoPrincipal_modalRte_ddl_gravedadRte').removeAttr('required');
}
jQuery(document).ready(function () {
    
});