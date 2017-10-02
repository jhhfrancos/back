function confirmarCaract() {
	var divShadow = document.getElementById("shadow");
	divShadow.style.display = "block";
	divShadow.style.width = "100%";
	divShadow.style.height = "100%";
	divShadow.style.opacity = "0.6";

	var divConfirmacion = document.getElementById("divConfirmacion");
	divConfirmacion.style.display = "block";
	
	document.getElementById("main-content").scrollIntoView();
}