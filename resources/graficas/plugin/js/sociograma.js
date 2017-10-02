var tipoSociogramaMostrar = 2;
var idPersonaRest, estudianteRest, vinculosRest, estudiantesGlobal, vinculosGlobal;

function inicializarSociogramas(idPer, estudiantes,jsonPersonas, links) {
    idPersonaRest = idPer;
    for (var item in estudiantes) {
        estudiantes[item] = JSON.parse(estudiantes[item]);
    }
    for (var item in jsonPersonas) {
        jsonPersonas[item].listaIndices = estudiantes[item];
    }
    estudiantes = jsonPersonas;
    estudianteRest = estudiantes;
    vinculosRest = links;
    /*crearsociograma('divsvg', estudiantes);
    crearsociograma2(idPer, 'sociogramaCurso');*/
    $('#btnCambiarSociograma').prop('disabled', false);
    crearsociograma2(idPersonaRest, 'sociogramaCurso');
}
function cambiarSociograma() {
    tipoSociogramaMostrar = (tipoSociogramaMostrar == 1) ? 2 : 1;
    $('#sociogramaCurso').html("");
    $('#tituloSociograma').html("");
    switch (tipoSociogramaMostrar) {
        case 1:
            $('#btnCambiarSociograma').prop('value', 'Mostrar por Curso');
            $('#sociogramaCurso').attr('class', 'col-md-12')
                .append("<div id='lateralPanel' class='col-md-2'></div> <div class='col-md-10'>" +
            "<div id='edit-pane' class='col-md-12'></div>" +
            "<div id='divsvg' class='col-md-12'></div></div>");
            $('#tituloSociograma').html("Por indices");

            crearsociograma('divsvg', estudianteRest, vinculosRest);
            break;
        case 2:
            $('#btnCambiarSociograma').prop('value', 'Mostrar por Indices');
            $('#sociogramaCurso').attr('class', 'col-md-12 col-md-offset-1');
            $('#tituloSociograma').html("Por amigos confirmados");
            crearsociograma2(idPersonaRest, 'sociogramaCurso');
            break;
        default:

    }
    $(document).ready(function () {
        window.scrollTo(0, 200);
    })
    return false;
}
function crearsociograma2(idPer, idSociogramaDiv) {
    //var idPer = getUrlParameter('persona');
    $.ajax({
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify({ idPersona: idPer }),
        error: errores,
        beforeSend: beforeSend,
        // complete: complete,
        success: function (data) {
            jsonData = data.d;

            if (jsonData.valid === true) {
                var infoPer = jsonData.content.perCur;
                var jsonas = jsonData.content.links;
                var linksPers = JSON.parse(jsonas);
                sessionStorage.setItem('infoPer', JSON.stringify(infoPer));
                llenarNodos(infoPer, linksPers);
            }

        },
        type: "POST",
        url: "NivelPersonal.aspx/sociograma"
    });

    function llenarNodos(personas, vinculos) {
        var perCur = personas;
        var vinCur = vinculos;
        var nodesEst = [];
        var linksEst = [];
        for (var i = 0; i < perCur.length; i++) {
            nodesEst.push({
                /*key: perCur[i].Id.toLowerCase(),
                label: perCur[i].Nombre1 + " " + perCur[i].Apellido1*/
                key: perCur[i].Id,
                label: perCur[i].Nombre1 +" "+ perCur[i].Apellido1
            });
        }
        for (var i = 0; i < vinCur.length; i++) {
            linksEst.push({
                source: vinCur[i].source,
                target: vinCur[i].target,
                weight: Math.random()
            });
        }
        crearSVG(nodesEst, linksEst);
    }
    function errores(msg) {
        //msg.responseText tiene el mensaje de error enviado por el servidor
        //alertSignal('Error: ' + msg.responseText);
    }
    function beforeSend() {
        //$("#wait").css("display", "block");
    }
    function crearSVG(nodesEst, vinculosEst) {
        var w = 960, h = 600;

        var labelDistance = 0;

        var vis = d3.select("#" + idSociogramaDiv).append("svg:svg").attr("width", w).attr("height", h);

        var nodes = nodesEst;
        var labelAnchors = [];
        var labelAnchorLinks = [];
        var links = [];

        //nodes = [{ key: "0", label: "niño 0" }, { key: "1", label: "niño 1" }, { key: "2", label: "niño 2" }, { key: "3", label: "niño 3" }, { key: "4", label: "niño 4" }, { key: "5", label: "niño 5" }];
        //links = [{ "source": 5, "target": 0, "weight": 0.9 }, { "source": 2, "target": 0, "weight": 0.1 }, { "source": 3, "target": 0, "weight": 0.1 }, { "source": 4, "target": 0, "weight": 0.1 }, { "source": 5, "target": 0, "weight": 0.1 }];

        var max_weight = d3.max(links, function (d) { return d.weight });
        var weight_scale = d3.scale.linear().domain([0, max_weight]).range([1, 5]);

        for (var i = 0; i < nodes.length; i++) {
            /*var node = {
                label: "node " + i
            };
            nodes.push(node);*/
            /*labelAnchors.push({
                node: nodes[i]
            });
            labelAnchors.push({
                node: nodes[i]
            });*/
        };

        for (var i = 0; i < vinculosEst.length; i++) {
            var src = buscarEst(vinculosEst[i].source);
            var tar = buscarEst(vinculosEst[i].target);
                links.push({
                    source: src,
                    target: tar,
                    weight: 1
                });
            
            /*labelAnchorLinks.push({
                source: src * 2,
                target: src * 2 + 1,
                weight: 1
            });*/
        };
        function buscarEst(idEst) {
            for (var i = 0; i < nodes.length;i++){
                if (nodes[i].key.toLowerCase() === idEst) {
                    return i;
                }
            }
            return null;
        }
        /*for (var i = 0; i < nodes.length; i++) {
            for (var j = 0; j < i; j++) {
                if (Math.random() > .90)
                    links.push({
                        source: i,
                        target: j,
                        weight: Math.random()
                    });
            }
            labelAnchorLinks.push({
                source: i * 2,
                target: i * 2 + 1,
                weight: 1
            });
        };*/

        var force = d3.layout.force()
            .size([w, h])
            .nodes(nodes)
            .links(links)
            .gravity(1)
            .linkDistance(100)
            .charge(-3000)
            .linkStrength(function (x) {
                return x.weight * 10
            });


        force.start();

        var force2 = d3.layout.force()
            .nodes(labelAnchors)
            .links(labelAnchorLinks)
            .gravity(0)
            .linkDistance(0)
            .linkStrength(8)
            .charge(-100)
            .size([w, h]);
        force2.start();

        var link = vis.selectAll("line.link")
            .data(links)
            .enter()
            .append("svg:line")
            .attr("class", "link")
            .style("stroke", "#CCC")
            .style("stroke-width", function (d) { return weight_scale(d.weight); });

        var node = vis.selectAll("g.node")
            .data(force.nodes())
            .enter()
            .append("svg:g")
            .attr("class", "node");

        node.append("svg:circle")
            .attr("class", "nodematch")
            .attr("r", 7)
            .style("fill", '#a30500')
            .style("stroke", "#FFF")
            .style("stroke-width", 3);

        node.call(force.drag);

        
        node.append('svg:text')
                .attr('x', 0)
                .attr('y', -12)
                .attr('class', 'id')
                .text(function (d) { return d.label });

        var anchorLink = vis.selectAll("line.anchorLink")
            .data(labelAnchorLinks);//.enter().append("svg:line").attr("class", "anchorLink").style("stroke", "#999");

        var anchorNode = vis.selectAll("g.anchorNode")
            .data(force2.nodes())
            .enter()
            .append("svg:g")
            .attr("class", "anchorNode");

        anchorNode.append("svg:circle").attr("r", 0).style("fill", "#FFF");
        anchorNode.append("svg:text").text(function (d, i) {
            return i % 2 == 0 ? "" : d.node.label
        }).style("fill", "#555").style("font-family", "Arial").style("font-size", 12);

        var updateLink = function () {
            this.attr("x1", function (d) {
                return d.source.x;
            }).attr("y1", function (d) {
                return d.source.y;
            }).attr("x2", function (d) {
                return d.target.x;
            }).attr("y2", function (d) {
                return d.target.y;
            });

        }

        var updateNode = function () {
            this.attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        }


        force.on("tick", function () {

            force2.start();

            node.call(updateNode);

            anchorNode.each(function (d, i) {
                if (i % 2 == 0) {
                    d.x = d.node.x;
                    d.y = d.node.y;
                } else {
                    var b = this.childNodes[1].getBBox();

                    var diffX = d.x - d.node.x;
                    var diffY = d.y - d.node.y;

                    var dist = Math.sqrt(diffX * diffX + diffY * diffY);

                    var shiftX = b.width * (diffX - dist) / (dist * 2);
                    shiftX = Math.max(-b.width, Math.min(0, shiftX));
                    var shiftY = 5;
                    this.childNodes[1].setAttribute("transform", "translate(" + shiftX + "," + shiftY + ")");
                }
            });


            anchorNode.call(updateNode);

            link.call(updateLink);
            anchorLink.call(updateLink);

        });
    }

}

function crearsociograma(idDiv, estudiantes, vinculos) {
    //console.log(estudiantes);
    // set up SVG for D3

    var width = 960,
        height = 500,
        colors = d3.scale.category10();
    var colores = [];
    //for (var estudiante in estudiantes) {
    var listaIndices = estudiantes[0].listaIndices;
    for (var indice in listaIndices) {
        var color = "#" + ((1 << 24) * Math.random() | 0).toString(16);
        colores.push(color);
        $('#lateralPanel').append(
            "<div class='md-radio'>" +
            "<input type='radio' id='radio" + indice + "' name='opcionesIndices' class='md-radiobtn'>" +
            "<label for='radio" + indice + "' style='color: " + color + ";'>" +
            "<span></span>" +
            "<span class='check'></span>" +
            "<span class='box'></span> " + listaIndices[indice].indice.nombre_cla + " " + listaIndices[indice].indice.nombre_Scla + "</label>" +
            "</div>");
    }
    $("input[name='opcionesIndices']").change(function () {
        var item = (this.id).replace("radio", "");
        for (var nuevoNodo in nodes) {
            nodes[nuevoNodo].wid = estudiantes[nuevoNodo].listaIndices[item].indice.valorRanking_RIP * 100;
        }
        var nodosCambiar = d3.selectAll(".node");
        force.start();
        nodosCambiar.transition().duration(1000)
            .each("start", function () { d3.select(this).attr("r", 0).style("fill", '#FFF'); })
            .style("fill", colores[item])
            .attr("r", function (d) { return d.wid / 5 });
    });
    //}

    var svg = d3.select('#' + idDiv)
      .append('svg')
      .attr('oncontextmenu', 'return false;')
      .attr('width', width)
      .attr('height', height);

    // set up initial nodes and links
    //  - nodes are known by 'id', not by index in array.
    //  - reflexive edges are indicated on the node (as a bold black circle).
    //  - links are always source < target; edge directions are set by 'left' and 'right'.
    /*var nodes = [
        { id: 0, reflexive: false, wid: 10, lbl: 'niño1' },
        { id: 1, reflexive: true, wid: 10, lbl: 'niño2' },
        { id: 3, reflexive: false, wid: 10, lbl: 'niño3' },
        { id: 4, reflexive: false, wid: 10, lbl: 'niño4' },
        { id: 5, reflexive: false, wid: 10, lbl: 'niño5' },
        { id: 6, reflexive: false, wid: 10, lbl: 'niño6' },
        { id: 7, reflexive: false, wid: 10, lbl: 'niño7' },
        { id: 8, reflexive: false, wid: 10, lbl: 'niño8' },
        { id: 9, reflexive: false, wid: 10, lbl: 'niño9' },
        { id: 10, reflexive: false, wid: 10, lbl: 'niño10' },
        { id: 11, reflexive: false, wid: 10, lbl: 'niño11' },
        { id: 12, reflexive: false, wid: 10, lbl: 'niño12' },
        { id: 13, reflexive: false, wid: 10, lbl: 'niño13' },
        { id: 15, reflexive: false, wid: 10, lbl: 'niño14' },
        { id: 14, reflexive: false, wid: 10, lbl: 'niño15' }
    ],*/
    var nodes = [];
    var links = [];
    var estudiante, vinculo, i = 0;
    for (item in estudiantes) {
        estudiante = { id: "node" + i, reflexive: false, wid: 10, lblCompleto: estudiantes[item].persona.Nombre, lbl: estudiantes[item].persona.Nombre1 + " " + estudiantes[item].persona.Apellido1, indice: estudiantes[item].listaIndices, idEstudiante: estudiantes[item].persona.Id };
        nodes.push(estudiante);
        i++;
    }
    i = 0;
    for (item in vinculos) {
        var vinculo = { source: retornarNodo(vinculos[item].source), target: retornarNodo(vinculos[item].target), left: vinculos[item].left, right: vinculos[item].right, wid: 2 }
        links.push(vinculo);
        i++;

    }
    function retornarNodo(idPersona) {
        for (node in nodes) {
            var idEstudiante = nodes[node].idEstudiante;
            if (idEstudiante.toLowerCase() == idPersona) {
                return nodes[node];
            }
        }
        return null;
    }

    /*for (var i = 0; i < nodes.length; i++) {
        for (var j = 0; j < i; j++) {
            if (Math.random() > .95)
                links.push({
                    source: nodes[i],
                    target: nodes[j],
                    left: Math.random() < .5? true:false,
                    right:Math.random() < .5? true:false,
                    wid: 2
                });
        }
    };*/
    /*links = [
      { source: nodes[0], target: nodes[1], left: true, right: true, wid: 2 },
      { source: nodes[10], target: nodes[2], left: false, right: true, wid: 2 },
      { source: nodes[1], target: nodes[10], left: false, right: true, wid: 2 },
      { source: nodes[8], target: nodes[12], left: false, right: true, wid: 2 },
      { source: nodes[12], target: nodes[8], left: false, right: true, wid: 2 },
      { source: nodes[10], target: nodes[3], left: false, right: true, wid: 2 },
      { source: nodes[13], target: nodes[2], left: false, right: true, wid: 2 },
      { source: nodes[7], target: nodes[2], left: false, right: true, wid: 2 }
    ];*/

    // init D3 force layout
    var force = d3.layout.force()
        .nodes(nodes)
        .links(links)
        .size([width, height])
        .linkDistance(80)
        .charge(-300)
        .on('tick', tick)

    // define arrow markers for graph links
    svg.append('svg:defs').append('svg:marker')
        .attr('id', 'end-arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 6)
        .attr('markerWidth', 3)
        .attr('markerHeight', 3)
        .attr('orient', 'auto')
      .append('svg:path')
        .attr('d', 'M0,-5L10,0L0,5')
        .attr('fill', '#000');

    svg.append('svg:defs').append('svg:marker')
        .attr('id', 'start-arrow')
        .attr('viewBox', '0 -5 10 10')
        .attr('refX', 4)
        .attr('markerWidth', 3)
        .attr('markerHeight', 3)
        .attr('orient', 'auto')
      .append('svg:path')
        .attr('d', 'M10,-5L0,0L10,5')
        .attr('fill', '#000');

    // line displayed when dragging new nodes
    var drag_line = svg.append('svg:path')
      .attr('class', 'link dragline hidden')
      .attr('d', 'M0,0L0,0');

    // handles to link and node element groups
    var path = svg.append('svg:g').selectAll('path'),
        circle = svg.append('svg:g').selectAll('g');

    // mouse event vars
    var selected_node = null,
        selected_link = null,
        mousedown_link = null,
        mousedown_node = null,
        mouseover_node = null,
        mouseup_node = null;

    function resetMouseVars() {
        mousedown_node = null;
        mouseup_node = null;
        mouseover_node = null;
        mousedown_link = null;
    }

    // update force layout (called automatically each iteration)
    function tick() {
        // draw directed edges with proper padding from node centers
        path.attr('d', function (d) {
            var deltaX = d.target.x - d.source.x,
                deltaY = d.target.y - d.source.y,
                dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY),
                normX = deltaX / dist,
                normY = deltaY / dist,
                sourcePadding = d.left ? 17 : 12,
                targetPadding = d.right ? 17 : 12,
                sourceX = d.source.x + (sourcePadding * normX),
                sourceY = d.source.y + (sourcePadding * normY),
                targetX = d.target.x - (targetPadding * normX),
                targetY = d.target.y - (targetPadding * normY);
            return 'M' + sourceX + ',' + sourceY + 'L' + targetX + ',' + targetY;
        });

        circle.attr('transform', function (d) {
            return 'translate(' + d.x + ',' + d.y + ')';
        });
    }

    // update graph (called when needed)
    function restart() {

        // path (link) group
        path = path.data(links);

        // update existing links
        path.classed('selected', function (d) { return d === selected_link; })
          .style('marker-start', function (d) { return d.left ? 'url(#start-arrow)' : ''; })
          .style('marker-end', function (d) { return d.right ? 'url(#end-arrow)' : ''; });


        // add new links
        path.enter().append('svg:path')
          .attr('class', 'link')
          .classed('selected', function (d) { return d === selected_link; })
          .style('marker-start', function (d) { return d.left ? 'url(#start-arrow)' : ''; })
          .style('marker-end', function (d) { return d.right ? 'url(#end-arrow)' : ''; })
          .attr('stroke-width', function (d) { return d.wid })
          .on('mousedown', function (d) {
              //if(d3.event.ctrlKey) return;

              // select link
              mousedown_link = d;
              if (mousedown_link === selected_link) selected_link = null;
              else selected_link = mousedown_link;
              selected_node = null;
              //restart();
          });

        // remove old links
        path.exit().remove();


        // circle (node) group
        // NB: the function arg is crucial here! nodes are known by id, not by index!
        circle = circle.data(nodes, function (d) { return d.id; });

        // update existing nodes (reflexive & selected visual states)
        circle.selectAll('circle')
          .style('fill', function (d) { return (d === selected_node) ? d3.rgb(colors(d.id)).brighter().toString() : colors(d.id); })
          .classed('reflexive', function (d) { return d.reflexive; });

        // add new nodes
        var g = circle.enter().append('svg:g');

        g.append('svg:circle')
          .attr('class', 'node')
          .attr('r', function (d) { return d.wid })
          .style('fill', function (d) { return (d === selected_node) ? d3.rgb(colors(d.id)).brighter().toString() : colors(d.id); })
          .style('stroke', '#FFF')
          .classed('reflexive', function (d) { return d.reflexive; })
          .on('mouseover', function (d) {
              //if (!mousedown_node || d === mousedown_node) return;
              // enlarge target node
              d3.select(this).attr('transform', 'scale(1.1)');
              mouseover_node = d;
              g.selectAll('text').text("");
              agregarTextoNodos();
          })
          .on('mouseout', function (d) {
              if (!mousedown_node || d === mousedown_node) return;
              // unenlarge target node
              d3.select(this).attr('transform', '');
          })
          .on('mousedown', function (d) {
              if (d3.event.ctrlKey) return;

              // select node
              mousedown_node = d;
              if (mousedown_node === selected_node) selected_node = null;
              else setSelectedNode(mousedown_node);
              selected_link = null;
              circle.call(force.drag);

              //restart();
          });

        // show node IDs
        agregarTextoNodos();
        function agregarTextoNodos() {
            g.append('svg:text')
                .attr('x', 0)
                .attr('y', -12)
                .attr('class', 'id')
                .text(function (d) {
                    if (mouseover_node === d) {
                        return mouseover_node.lblCompleto
                    } else {
                        return d.lbl;
                    }
                });
        }

        // remove old nodes
        circle.exit().remove();

        // set the graph in motion
        force.start();
        //$('#radio0').attr('checked', 'checked');
    }



    function spliceLinksForNode(node) {
        var toSplice = links.filter(function (l) {
            return (l.source === node || l.target === node);
        });
        toSplice.map(function (l) {
            links.splice(links.indexOf(l), 1);
        });
    }


    // set selected node and notify panel of changes
    function setSelectedNode(node) {
        selected_node = node;
        var selectedNodeLabel = d3.select('#edit-pane');
        // update selected node label
        selectedNodeLabel.html(selected_node ? '<strong>' + selected_node.lbl + ': ' + selected_node.wid + '</strong>' : 'No state selected');

    }

    restart();

}