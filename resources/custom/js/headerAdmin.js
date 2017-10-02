function loadObjetosDinamicosAdmin(vista){
	cambiarBotonesAdmin(vista);
}
function cambiarBotonesAdmin(vista){
	document.getElementById("botonHomeAdmin").className = "classic-menu-dropdown selected";
	document.getElementById("botonCursosAdmin").className = "classic-menu-dropdown selected";
	document.getElementById("botonUsuariosAdmin").className = "dropdown dropdown-fw selected";
	document.getElementById("botonAlgoritmoAdmin").className = "dropdown dropdown-fw selected";
	document.getElementById("botonComiteAdmin").className = "classic-menu-dropdown selected";
	document.getElementById("botonCaracterizacionAdmin").className = "dropdown dropdown-fw selected";
	if(vista == "homeAdmin"){
		var x = document.getElementById("botonHomeAdmin").className;
		document.getElementById("botonHomeAdmin").className = x + " open";
	} else if(vista == "comiteAdmin"){
		var x = document.getElementById("botonComiteAdmin").className;
		document.getElementById("botonComiteAdmin").className = x + " open";
	} else if(vista == "cursosAdmin"){
		var x = document.getElementById("botonCursosAdmin").className;
		document.getElementById("botonCursosAdmin").className = x + " open";
	} else if(vista == "caracterizacionAdmin"){
		var x = document.getElementById("botonCaracterizacionAdmin").className;
		document.getElementById("botonCaracterizacionAdmin").className = x + " open";
	} else if(vista == "usuariosAdmin"){
		var x = document.getElementById("botonUsuariosAdmin").className;
		document.getElementById("botonUsuariosAdmin").className = x + " open";
	} else if(vista == "algoritmoAdmin"){
		var x = document.getElementById("botonAlgoritmoAdmin").className;
		document.getElementById("botonAlgoritmoAdmin").className = x + " open";
	}
}