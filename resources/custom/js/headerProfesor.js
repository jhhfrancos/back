function loadObjetosDinamicosProfesor(vista) {
    cambiarBotonesProfesor(vista);
}
function cambiarBotonesProfesor(vista) {
    document.getElementById("botonHomeProfesor").className = "classic-menu-dropdown selected";
    document.getElementById("botonCursosProfesor").className = "dropdown dropdown-fw selected";
    document.getElementById("botonComiteProfesor").className = "classic-menu-dropdown selected";
    document.getElementById("botonCaracterizacionComiteProfesor").className = "dropdown dropdown-fw selected";
    document.getElementById("botonCaracterizacionProfesor").className = "dropdown dropdown-fw selected";
    if (vista == "homeProfesor") {
        var x = document.getElementById("botonHomeProfesor").className;
        document.getElementById("botonHomeProfesor").className = x + " open";
    } else if (vista == "comiteProfesor") {
        var x = document.getElementById("botonComiteProfesor").className;
        document.getElementById("botonComiteProfesor").className = x + " open";
    } else if (vista == "cursosProfesor") {
        var x = document.getElementById("botonCursosProfesor").className;
        document.getElementById("botonCursosProfesor").className = x + " open";
    } else if (vista == "caracterizacionProfesor") {
        var x = document.getElementById("botonCaracterizacionComiteProfesor").className;
        document.getElementById("botonCaracterizacionComiteProfesor").className = x + " open";
        var x = document.getElementById("botonCaracterizacionProfesor").className;
        document.getElementById("botonCaracterizacionProfesor").className = x + " open";
    }
}