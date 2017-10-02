function publicarRuta(){
  var evFile=document.getElementById("file-evidencia").value;
  if(evFile){
	  document.getElementById("ruta-archivo").innerHTML=evFile.replace(/.*[\/\\]/, '');
  }else{
	  document.getElementById("ruta-archivo").innerHTML="No se ha cargado un archivo"
  }
}

function agradecerReporte() {
	var divShadow = document.getElementById("shadow");
	divShadow.style.display = "block";
	divShadow.style.width = "100%";
	divShadow.style.height = "100%";
	divShadow.style.opacity = "0.6";

	var divAgradecimientos = document.getElementById("divConfirmacion");
	divAgradecimientos.style.display = "block";

	var divFormReporte = document.getElementById("formulario-reporte");
	divFormReporte.style.pointerEvents = "none";

	document.getElementById("main-content").scrollIntoView();
}

function confirmarEnvioReporte() {
	var divDate = document.getElementById("fechaCreacion");
	divDate.valueAsDate=new Date();
	
	var divAgradecimientos = document.getElementById("divConfirmacion");
	divAgradecimientos.style.display = "none";

	var divConfirmacion = document.getElementById("divAgradecimientos");
	divConfirmacion.style.display = "block";
	
	divConfirmacion.scrollIntoView();

}

function editarReporte() {
	var divShadow = document.getElementById("shadow");
	divShadow.style.display = "none";
	var divAgradecimientos = document.getElementById("divAgradecimientos");
	divAgradecimientos.style.display = "none";
	var divConfirmacion = document.getElementById("divConfirmacion");
	divConfirmacion.style.display = "none";

	var divFormReporte = document.getElementById("formulario-reporte");
	divFormReporte.style.pointerEvents = "initial";
}

var counterVic = 1;
var limitVic = 5;
function mostrarOtraVictima() {
	if (counterVic == limitVic) {
		alert("Has alcanzado el l\xEDmite de " + limitVic + " v\xEDctimas ");
		document.getElementById("btnVictimas").disabled = true;
	} else {
		counterVic++;
		var divvictima = document.getElementById("divvictima" + counterVic);
		if (divvictima.style.display == "none") {
			divvictima.style.display = "block";
		}
	}
}

function eliminarVictima(){
	if(counterVic==1){
		alert("Debe existir al menos una v\xEDctima");
	} else {
		counterVic--;
		var divvictima=document.getElementById("divvictima"+counterVic);
		if(divvictima.style.display=="block"){
			divvictima.style.display="none";
			document.getElementById("btnVictimas").disabled = false;
		}
	}
}

var counterBull = 1;
var limitBull = 5;

function mostrarOtroVictimario() {
	if (counterBull == limitBull) {
		alert("Has alcanzado el l\xEDmite de " + limitBull + " v\xEDctimarios");
		document.getElementById("btnvictimarios").disabled = true;
	} else {
		counterBull++;
		var divvictimarios = document.getElementById("divvictimarios"
				+ counterBull);
		if (divvictimarios.style.display == "none") {
			divvictimarios.style.display = "block";
		}
	}
}

function eliminarVictimario(){
	if(counterBull==1){
		alert("Debe existir al menos una v\xEDctimario");
	} else {
		counterBull--;
		var divvictimarios = document.getElementById("divvictimarios"
				+ counterBull);
		if (divvictimarios.style.display == "block") {
			divvictimarios.style.display = "none";
			document.getElementById("btnvictimarios").disabled = false;
		}
	}
}