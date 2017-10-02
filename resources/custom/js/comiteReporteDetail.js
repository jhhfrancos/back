function mostrarEvidenciaCaso(divImgEvidencia,btnevidencia){
  var divImgEvidencia =document.getElementById(divImgEvidencia);
  var btnevidencia=document.getElementById(btnevidencia);
  if(divImgEvidencia.style.display == "block") {
    divImgEvidencia.style.display = "none";
    btnevidencia.firstChild.data="Ver";
  }
  else {
    divImgEvidencia.style.display = "block";
    btnevidencia.firstChild.data="Ocultar";
  }
}

//Caso Detail
function detallesReporte(divDetallesReporte){
  var divDetalles = document.getElementById(divDetallesReporte);
  if(divDetalles.style.display == "block") {
    divDetalles.style.display = "none";
  }
  else {
    divDetalles.style.display = "block";
  }
}