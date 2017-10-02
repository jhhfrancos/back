//onChange="prettySelect();"
function prettySelect(){
	var selects = document.getElementsByClassName('form-control');
	var sel;
	//Activar todas las opciones de los selects
	for (var i=0; i < selects.length; i++){
		sel=selects[i];
		for(var k=0; k < sel.options.length;k++){
			sel.options[k].disabled = false;
		}
	}
	//Desactivar las opciones que ya estan seleccionadas
	for (var i=0; i < selects.length; i++){
		sel=selects[i];
		var val=sel.value;
		for(var j=0; j < selects.length; j++){
			if(i==j)continue;
			sel2=selects[j];
			for(var k=0; k < sel2.options.length;k++){
				if(sel2.options[k].value==val){
					sel2.options[k].disabled = true;
				}
			}
		}
	}
}