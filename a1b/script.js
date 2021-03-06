/*globals alert, document, d3, console*/
// These keep JSHint quiet if you're using it (highly recommended!)


// let selection = d3.select("#firstbar");
// var svgcon = document.getElementById("firstbar");
// var bars = svgcon.children;
// var temp = document.getElementById("1");
// for(var i = 0 ; i < bars.length; i++) {
//     var strBar = String(i);
//     var idBar = "#" + strBar;
//     document.getElementById(strBar)
//         .addEventListener("mouseover", function (event) {
//             selection
//                 .select(idBar)
//                 .attr("fill", "red");
//         });
// }


// var svgcon = document.getElementById("firstbar");
// var bars = svgcon.children;
// for(var i = 0 ; i < bars.length; i++){
//     var strBar = "#" + String(i);
//     d3.select("#firstbar")
//         .on("mouseover", function(){
//             d3.select(strBar)
//                 .style.fill("red");
//         });
// }

// var selection = d3.select("#firstbar");
// document.getElementById("1")
//     .addEventListener("mouseenter", function(event){
//         selection
//             .select("#1")
//             .attr("fill", "red");
//     });
// document.getElementById("1")
//     .addEventListener("mouseout", function(event){
//         selection
//             .select("#1")
//             .attr("fill", "green");
//     });
function staircase() {
    var bars = document.getElementById("firstbar");
    var children = bars.children;
    for(var i = 0 ; i < children.length; i++){
        children[i].style.width = String(i * 10 + 10) + "px";
    }
}

function update(data) {

    // D3 loads all CSV data as strings;
    // while Javascript is pretty smart
    // about interpreting strings as
    // numbers when you do things like
    // multiplication, it will still
    // treat them as strings where it makes
    // sense (e.g. adding strings will
    // concatenate them, not add the values
    // together, or comparing strings
    // will do string comparison, not
    // numeric comparison).

    // We need to explicitly convert values
    // to numbers so that comparisons work
    // when we call d3.max()
    var padding = 5;
    console.log(data.length)
    data.forEach(function (d) {
        d.a = parseInt(d.a);
        d.b = parseFloat(d.b);
    });


    // Set up the scales
    var aScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return d.a;
        })])
        .range([0, 150]);
    var bScale = d3.scaleLinear()
        .domain([0, d3.max(data, function (d) {
            return d.b;
        })])
        .range([0, 150]);
    var iScale = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, 110]);
    var iScale2 = d3.scaleLinear()
        .domain([0, data.length])
        .range([0, 200]);

    let aData = []
    for (var i = 0; i < data.length; i++)
    {
        aData.push({a: 0});
        aData[i].a = data[i].a;
    }

    var bData = []
    for (i = 0; i < data.length; i++)
    {
        bData.push({b: 0});
        bData[i].b = data[i].b;
    }
    d3.selectAll("svg > *").remove();

    // TODO: Select and update the 'a' bar chart bars
    var deleteSvg = document.getElementById("firstbar")
    deleteSvg.parentNode.removeChild(deleteSvg);

    var svg = d3.select("#aBar").append("svg")
        .attr("width", 200)
        .attr("height", 200)
        .attr("id", "firstbar")
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", 10)
        .attr("width",function(d) { return aScale(d.a); })
        .attr("height", 200/data.length)
        .attr("y", function(d, i) { return iScale2(i)})
        .attr("onmouseenter", "mouseEnter(this)")
        .attr("onmouseout", "mouseOut(this)")


    // TODO: Select and update the 'b' bar chart bars
    var deleteSvg2 = document.getElementById("secondbar")
    deleteSvg2.parentNode.removeChild(deleteSvg2);

    var svg = d3.select("#bBar").append("svg")
        .attr("width", 200)
        .attr("height", 200)
        .attr("id", "secondbar")
    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", 10)
        .attr("width",function(d) { return bScale(d.b); })
        .attr("height", 200/data.length)
        .attr("y", function(d, i) { return iScale2(i)})
        .attr("onmouseenter", "mouseEnter(this)")
        .attr("onmouseout", "mouseOut(this)")

    // TODO: Select and update the 'a' line chart path using this line generator
    var aLineGenerator = d3.line()
        .x(function (d, i) {
            return iScale(i);
        })
        .y(function (d) {
            return aScale(d.a);
        });

    var linea = aLineGenerator(aData);
    var newpath = document.createElementNS('http://www.w3.org/2000/svg',"path");
    newpath.setAttributeNS(null, "class", "lines");
    newpath.setAttributeNS(null, "d", linea);
    document.getElementById("Aline").appendChild(newpath);

    // TODO: Select and update the 'b' line chart path (create your own generator)
    var bLineGenerator = d3.line()
        .x(function (d, i) {
            return iScale(i);
        })
        .y(function (d) {
            return bScale(d.b);
        });


    var lineb = bLineGenerator(bData);
    var newpath2 = document.createElementNS('http://www.w3.org/2000/svg',"path");
    newpath2.setAttributeNS(null, "class", "lines");
    newpath2.setAttributeNS(null, "d", lineb);
    document.getElementById("Bline").appendChild(newpath2);

    // TODO: Select and update the 'a' area chart path using this line generator
    var aAreaGenerator = d3.area()
        .x(function (d, i) {
            return iScale(i);
        })
        .y0(200)
        .y1(function (d) {
            return aScale(d.a);
        });

    var areaA = aAreaGenerator(aData);
    var newArea = document.createElementNS('http://www.w3.org/2000/svg',"path");
    newArea.setAttributeNS(null, "class", "areas");
    newArea.setAttributeNS(null, "d", areaA);
    document.getElementById("Aarea").appendChild(newArea);

    // TODO: Select and update the 'b' area chart path (create your own generator)
    var bAreaGenerator = d3.area()
        .x(function (d, i) {
            return iScale(i);
        })
        .y0(200)
        .y1(function (d) {
            return bScale(d.b);
        });

    var areaB = bAreaGenerator(bData);
    var newAreaB = document.createElementNS('http://www.w3.org/2000/svg',"path");
    newAreaB.setAttributeNS(null, "class", "areas");
    newAreaB.setAttributeNS(null, "d", areaB);
    document.getElementById("Barea").appendChild(newAreaB);

    // TODO: Select and update the scatterplot points
    var deleteSvg3 = document.getElementById("scatter")
    deleteSvg3.parentNode.removeChild(deleteSvg3);
    var svg = d3.select("#scat").append("svg")
        .attr("width", 200)
        .attr("height", 200)
        .attr("id", "scatter")
    svg.selectAll("circle")
        .data(data)
        .enter().append("circle")
        .attr("r", 5)
        .attr("cx", function (d){
            return aScale(d.a); })
        .attr("cy", function (d){ return bScale(d.b); })
        .attr("onclick", "CircleC(this)");


    d3.select("#scatter").append("path")
        .attr("class", "frame")
        .attr("d", "M 5 0 L 200 0 L 200 200 L 5 200 L 5 0")

}

function changeData() {
    // // Load the file indicated by the select menu
    var dataFile = document.getElementById('dataset').value;
    if (document.getElementById('random').checked) {
        randomSubset();
    }
    else{
        d3.csv('data/' + dataFile + '.csv').then(update);
    }
}

function randomSubset() {
    // Load the file indicated by the select menu,
    // and then slice out a random chunk before
    // passing the data to update()
    var dataFile = document.getElementById('dataset').value;
    if (document.getElementById('random').checked) {
        d3.csv('data/' + dataFile + '.csv').then(function(data) {
            var subset = [];
            data.forEach(function (d) {
                if (Math.random() > 0.5) {
                    subset.push(d);
                }
            });
            console.log(subset.length)
            update(subset);
        });
    }
    else{
        changeData();
    }
}

function mouseEnter(node){
    d3.select(node)
        .attr("fill", "red");
}

function mouseOut(node){
    d3.select(node)
        .attr("fill", "steelblue");
}

function CircleC(node){
    var x = node.getAttribute('cx');
    var y = node.getAttribute('cy');
    console.log("x: " + x + " y: " + y);
}
