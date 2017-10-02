function resumenCaso(divcaso) {
	var listDivs = document.getElementsByName("casoresumenpanel");
	var i;
	for (i = 0; i < listDivs.length; i++) {
		listDivs[i].style.display = "none";
	}
	var divcaso = document.getElementById(divcaso);
	if (divcaso.style.display == "block") {
		divcaso.style.display = "none";
	} else {
		divcaso.style.display = "block";
	}
}