function setDefaultFechaEvento() {
	var actualTime=new Date();
	if (document.getElementById('fechaevento').value == "") {
		document.getElementById('fechaevento').valueAsDate = actualTime;
	}
}

function setDefaultFechaAlerta(){
	var actualTime=new Date();
	if (document.getElementById('fechaalerta').value == "") {
		document.getElementById('fechaalerta').valueAsDate = new Date();
	}
}