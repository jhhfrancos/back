function loadObjetosDinamicos(numeroTareasPendientes,vista){
	var numeroTareas = numeroTareasPendientes;
	var suma = 0;
	for (var i = 0; i < numeroTareas.length; i++) {
		suma = suma + numeroTareas[i];
	}
	document.getElementById("numeroTareas").innerHTML = suma;
	document.getElementById("completoNumeroTareas").innerHTML = suma + " tareas";
	cambiarBotones(vista);
}
function cambiarBotones(vista){
	document.getElementById("botonHomeEstudiante").className = "classic-menu-dropdown selected";
	document.getElementById("botonCursosEstudiante").className = "dropdown dropdown-fw selected";
	document.getElementById("botonReporteEstudiante").className = "dropdown more-dropdown selected";
	if(vista == "estudianteHome"){
		var x = document.getElementById("botonHomeEstudiante").className;
		document.getElementById("botonHomeEstudiante").className = x + " open";
	} else if(vista == "estudianteCurso"){
		var x = document.getElementById("botonCursosEstudiante").className;
		document.getElementById("botonCursosEstudiante").className = x + " open";
	} else if(vista == "estudianteReporte"){
		var x = document.getElementById("botonReporteEstudiante").className;
		document.getElementById("botonReporteEstudiante").className = x + " open";
	}
}