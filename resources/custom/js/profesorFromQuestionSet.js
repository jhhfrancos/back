var counterFromPlantilla = 2;
var limitFromPlantilla = 20;

function agregarOpcionSetPreguntas(divName) {
    if (counterFromPlantilla == limitFromPlantilla) {
        alert("Has alcanzado el l\xEDmite de " + limitFromPlantilla
            + " preguntas");
    } else {
        counterFromPlantilla++;
        var newdiv = document.createElement('div');
        newdiv.setAttribute("class", "form-group");
        /*
         newdiv.innerHTML = "<div class='col-md-12'> <label class='col-md-2'>Pregunta "
         + counterFromPlantilla
         + "</label><span class='required'>*</span> <div class='col-md-7'> <textarea class='form-control' name='txt_pregunta"
         + counterFromPlantilla
         + "' required> Opci&oacute;n "
         + counterFromPlantilla
         +"</textarea> <label for='fileopc"
         + counterFromPlantilla
         + "' class='btn btn-default'> Agregar imagen </label> <label id='lblopc"
         + counterFromPlantilla
         + "'></label> <input id='fileopc"
         + counterFromPlantilla
         + "' type='file' accept='.jpg, .png, .bmp' name='file_img_opc"
         + counterFromPlantilla
         + "' style='display:none;' onchange='publicarOpcRuta(\"fileopc"+ counterFromPlantilla+"\","+"\"lblopc"+ counterFromPlantilla+"\")>"
         +"</div><div class='col-md-3'><label> <input type='checkbox' name='correcta' value=\"opcion2"+ counterFromPlantilla+"\"+> &Eacute;sta es la respuesta correcta</label>  </div>";
         */

        newdiv.innerHTML = "<div class=\"col-md-12\">\n"
            + "<label class=\"col-md-2\">Opci&oacute;n 2</label>\n"
            + "<span class=\"required\">*</span>\n"
            + "<div class=\"col-md-7\">\n"
            + "    <textarea class=\"form-control\" name=\"txt_opcion" + counterFromPlantilla + "\" placeholder=\"Opcion " + counterFromPlantilla + "\" required>\n"
            + "    </textarea>\n"
            + "    <label for=\"fileopc" + counterFromPlantilla + "\" class=\"btn btn-default\">\n"
            + "        Agregar imagen</label>\n"
            + "    <label id=\"lblopc" + counterFromPlantilla + "\"></label>\n"
            + "    <input id=\"fileopc" + counterFromPlantilla + "\" type=\"file\" accept=\".jpg, .png, .bmp\" name=\"file_img_opc" + counterFromPlantilla + "\" style=\"display : none ;\" onchange=\"publicarOpcRuta('fileopc" + counterFromPlantilla + "','lblopc" + counterFromPlantilla + "');\">\n"
            + "</div>\n"
            + "<div class=\"col-md-3\">\n"
            + "    <label> <input type=\"checkbox\" name=\"correcta\"\n"
            + "    value=\"opcion" + counterFromPlantilla + "\"> &Eacute;\n"
            + "        sta es la respuesta correcta\n"
            + "    </label>\n"
            + "</div>\n"
            + "</div>";
        alert("hola mundo");
        alert(newdiv.toString());
        console.debug(newdiv.toString());
        document.getElementById(divName).appendChild(newdiv);
    }
}