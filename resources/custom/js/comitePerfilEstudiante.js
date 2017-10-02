var idPer = getUrlParameter('persona');
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
    url: "PerfilEstudiante.aspx/sociograma"
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
            label: perCur[i].Nombre1 + " " + perCur[i].Apellido1
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

    var vis = d3.select("#sociogramaCurso").append("svg:svg").attr("width", w).attr("height", h);

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
        for (var i = 0; i < nodes.length; i++) {
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