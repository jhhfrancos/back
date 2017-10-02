function loadObjetosDinamicosDirectivo(vista){
	cambiarBotonesDirectivo(vista);
}
function cambiarBotonesDirectivo(vista){
	document.getElementById("botonHomeDirectivo").className = "classic-menu-dropdown selected";
	document.getElementById("botonCircularesDirectivo").className = "dropdown dropdown-fw selected";
	document.getElementById("botonNotasDirectivo").className = "dropdown dropdown-fw selected";
	document.getElementById("botonEstadisticasDirectivo").className = "classic-menu-dropdown selected";
	if(vista == "homeDirectivo"){
		var x = document.getElementById("botonHomeDirectivo").className;
		document.getElementById("botonHomeDirectivo").className = x + " open";
	} else if(vista == "circularesDirectivo"){
		var x = document.getElementById("botonCircularesDirectivo").className;
		document.getElementById("botonCircularesDirectivo").className = x + " open";
	} else if(vista == "notasDirectivo"){
		var x = document.getElementById("botonNotasDirectivo").className;
		document.getElementById("botonNotasDirectivo").className = x + " open";
	} else if(vista == "estadisticasDirectivo"){
		var x = document.getElementById("botonEstadisticasDirectivo").className;
		document.getElementById("botonEstadisticasDirectivo").className = x + " open";
	}
}