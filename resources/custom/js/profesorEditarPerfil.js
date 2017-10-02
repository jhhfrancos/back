function verificarNuevoPWD(){
	var  newpwd= document.getElementById('newpwd');
	var newpwdrepeat = document.getElementById('newpwdrepeat');
	if(newpwd.value!=newpwdrepeat.value){
		document.getElementById('erroresChangePWD').style.display="block";
		document.getElementById('main-content').scrollIntoView();
		document.getElementById('msgerrorChangePWD').innerHTML="Las contrase&ntilde;as deben ser iguales";
		document.getElementById('btncontrasenias').disabled=true;
	}else{
		document.getElementById('erroresChangePWD').style.display="none";
		document.getElementById('btncontrasenias').disabled=false;
	}
}