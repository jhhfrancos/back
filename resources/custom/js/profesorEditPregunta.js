function setHeight(fieldId){
    document.getElementById(fieldId).style.height = document.getElementById(fieldId).scrollHeight+'px';
}

var counter = 0;
var limit = 4;
function agregarOpcionEdit(divName) {
	while (document.getElementbyId("divopcion" + counter) != null) {
		counter++;
	}

	if (counter == limit) {
		alert("Has alcanzado el l\xEDmite de " + limit + " opciones");
	} else {
		var newdiv = document.createElement('div');
		newdiv.setAttribute("class", "form-group");
		newdiv.setAttribute("id", "divopcion" + counter);
		newdiv.innerHTML = "<div class='col-md-12'> <label class='col-md-1'>Opci&oacute;n "
			+ counter
			+ "</label><span class='required'>*</span> <div class='col-md-7'> <textarea class='form-control' name='txt_opcion"
			+ counter
			+ "' required></textarea> <label> Agregar imagen<input type='file' accept='.jpg, .png, .bmp' name='file_img_opc"
			+ counter
			+ "'></label> </div> <div class='col-md-2'>  <label> <input type='checkbox' value='opcion"
			+ counter
			+ "' name='correcta'> &Eacute;sta es la respuesta</label></div></div>";
		document.getElementById(divName).appendChild(newdiv);
		counter++;
	}
}