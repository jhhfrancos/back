function setDefaultFechas() {
	var actualTime=new Date();
	if (document.getElementById('inputfechastart').value == "") {
		document.getElementById('inputfechastart').valueAsDate = actualTime;
		var horaActual=actualTime.getHours();
		if(horaActual<10){
			horaActual="0"+horaActual;
		}
		var minActual=actualTime.getMinutes();

		document.getElementById('inputhorastart').value=horaActual+":"+minActual;
	}
	if (document.getElementById('inputfechavenc').value == "") {
		document.getElementById('inputfechavenc').valueAsDate = new Date();
	}

}

function verificarFechasActivDev1() {
	var fechaInit = document.getElementById("inputfechastart").value;
	var fechaFin = document.getElementById("inputfechavenc").value;
	if (fechaInit > fechaFin) {
		document.getElementById('erroresActivDev1').style.display="block";
		document.getElementById('main-content').scrollIntoView();
		document.getElementById('msgerrorActivDev1').innerHTML="La fecha de vencimiento no puede ser anterior a la fecha de inicio.";
		//alert("La fecha de vencimiento no puede ser anterior a la fecha de inicio.");
		document.getElementById("inputfechavenc").value = "";
	}
}

function masOpciones() {
	var masOpcionesDiv = document.getElementById("masOpcionesDiv");
	// based on condition you can change visibility
	if (masOpcionesDiv.style.display == "block") {
		masOpcionesDiv.style.display = "none";
	} else {
		masOpcionesDiv.style.display = "block";
		masOpcionesDiv.scrollIntoView();
		masOpcionesDiv.blur();
	}
}
