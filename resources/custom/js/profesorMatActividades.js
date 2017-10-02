function editarPesosActividades(){
	var counter=0;
	var inputNumber = document.getElementById("peso"+counter);
	while(inputNumber!=null){
		inputNumber.disabled="false";
		counter++;
		var inputNumber = document.getElementbyId("peso"+counter);
	}
	document.getElementById("btnEditar").disabled=true;
}