var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
var tech = getUrlParameter('technology');
var blog = getUrlParameter('blog');
function focoNombreCaso(idDiv) {
    setTimeout(function () { $('#'+idDiv).focus(); }, 1000);
}
jQuery(document).ready(function () {
    var tipo = getUrlParameter('tipo');
    if (tipo === 'Bullying') {
        $('#liBullying').addClass(" open black");
    }else if (tipo === 'Drogas') {
        $('#liDrogas').addClass(" open black");
    }else if (tipo === 'Robo') {
        $('#liRobo').addClass(" open black");
    } else if (tipo === 'Vandalismo') {
        $('#liVandalismo').addClass(" open black");
    }

});