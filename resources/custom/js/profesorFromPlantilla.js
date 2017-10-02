function deleteDefaultTxt(txt) {
	var txtElement = document.getElementById(txt);
	if (txtElement.value.startsWith(" - ")) {
		txtElement.value = "";
	}
}

function setDefaultTxt(txt, img) {
	var txtElement = document.getElementById(txt);
	var imgElement = document.getElementById(img);
	if (!txtElement.value && imgElement.value) {
		txtElement.value = " - En la siguiente imagen encuentras la informaci\xF3n";
	}
}

function verificarPreguntayEnviar() {
	var completado = true;
	var strmensaje = "";
	if (document.getElementById('txtDescripPreg').value == "") {
		strmensaje += "No has puesto una descripcion.";
		completado = false;
	}
	if (document.getElementById('tiempoRespuesta').value == "") {
		strmensaje += "No has establecido un tiempo de respuesta. ";
		completado = false;
	}
	var checkeada = false;
	var listOpciones = document.getElementsByName('correcta');
	for (var i = 0; i < listOpciones.length && checkeada == false; i++) {
		if (listOpciones[i].checked) {
			checkeada = true;
		}
	}
	if (!checkeada) {
		strmensaje += "No has seleccionado ninguna respuesta correcta. ";
		completado = false;
	}

	if (completado) {
		document.getElementsByTagName('FORM')[0].submit();
	} else {
		document.getElementById('erroresFromPlantilla').style.display = "block";
		document.getElementById('main-content').scrollIntoView();
		document.getElementById('msgerrorFromPlantilla').innerHTML = strmensaje;
		// alert(strmensaje);
	}
}

function publicarOpcRuta(fileopc, lblpathopc) {
	var evFile = document.getElementById(fileopc).value;
	if (evFile) {
		document.getElementById(lblpathopc).innerHTML = evFile.replace(
				/.*[\/\\]/, '');
	} else {
		document.getElementById(lblpathopc).innerHTML = "No se ha cargado ninguna imagen";
	}
}

function asignarValorDescripcion() {
	var evFile = document.getElementById('filedescrip').value;
	document.getElementById('lbldescrip').innerHTML = evFile.replace(
			/.*[\/\\]/, '');
	document.getElementById('txtDescripPreg').value = document
			.getElementById('txtDescripPreg').value
			+ " - En la siguiente imagen puedes ver la informaci\xF3n";
}

function setHeight(fieldId) {
	document.getElementById(fieldId).style.height = document
			.getElementById(fieldId).scrollHeight
			+ 'px';
}

var counterFromPlantilla = 2;
var limitFromPlantilla = 5;

function agregarOpcion(divName) {
	if (counterFromPlantilla == limitFromPlantilla) {
		alert("Has alcanzado el l\xEDmite de " + limitFromPlantilla
				+ " opciones");
	} else {
		counterFromPlantilla++;
		var newdiv = document.createElement('div');
		newdiv.setAttribute("class", "form-group");
		newdiv.innerHTML = "<div class='col-md-12'> <label class='col-md-2'>Opción "
				+ counterFromPlantilla
				+ "</label><span class='required'>*</span> <div class='col-md-7'> <textarea id='txtopc"
				+ counterFromPlantilla
				+ "' class='form-control' name='txt_opcion"
				+ counterFromPlantilla
				+ "' required onfocus=\"deleteDefaultTxt(\'txtopc"
				+ counterFromPlantilla
				+ "\');\" onblur=\"setDefaultTxt(\'txtopc"
				+ counterFromPlantilla
				+ "\',\'fileopc"
				+ counterFromPlantilla
				+ "\');\" placeholder='Opci&oacute;n "
				+ counterFromPlantilla
				+ "'></textarea> <label for='fileopc"
				+ counterFromPlantilla
				+ "' class='btn btn-default'> Agregar imagen </label> <label id='lblopc"
				+ counterFromPlantilla
				+ "'>No se ha cargado ninguna imagen</label> <input id='fileopc"
				+ counterFromPlantilla
				+ "' type='file' accept='.jpg, .png, .bmp' name='file_img_opc"
				+ counterFromPlantilla
				+ "' style='display:none;' onchange='publicarOpcRuta(\"fileopc"
				+ counterFromPlantilla
				+ "\",\"lblopc"
				+ counterFromPlantilla
				+ "\");'> </div> <div class='col-md-3'>  <label> <input type='checkbox' value='opcion"
				+ counterFromPlantilla
				+ "' name='correcta'> &Eacute;sta es la respuesta correcta</label></div></div>";
		document.getElementById(divName).appendChild(newdiv);
	}
}
