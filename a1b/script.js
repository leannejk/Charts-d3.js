/*globals alert, document, d3, console*/
// These keep JSHint quiet if you're using it (highly recommended!)

function staircase() {
    var bars = document.getElementById("firstbar");
    var children = bars.children;
    for(var i = 0 ; i < children.length; i++){
        children[children.length - 1 - i].style.width = String(i * 10 + 10) + "px";
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

    // ****** TODO: PART III (you will also edit in PART V) ******
    d3.selectAll("svg > *").remove();
    // TODO: Select and update the 'a' bar chart bars
    // var firstBar = document.getElementById("firstbar");
    // removeAllChildNodes(firstBar);


    // TODO: Select and update the 'b' bar chart bars


    // TODO: Select and update the 'a' line chart path using this line generator
    var aLineGenerator = d3.line()
        .x(function (d, i) {
            return iScale(i);
        })
        .y(function (d) {
            return aScale(d.a);
        });


    var aData = []
    for (var i = 0; i < data.length; i++)
    {
        aData.push({a: 0});
        console.log(typeof data[i].a);
        aData[i].a = data[i].a;
    }
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

    var bData = []
    for (i = 0; i < data.length; i++)
    {
        bData.push({b: 0});
        bData[i].b = data[i].b;
    }
    var lineb = bLineGenerator(bData);
    console.log(lineb)
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

    var areaAData = []
    for (i = 0; i < data.length; i++)
    {
        areaAData.push({a: 0});
        areaAData[i].a = data[i].a;
    }
    var areaA = aAreaGenerator(areaAData);
    console.log(areaA)
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

    var areaBData = []
    for (i = 0; i < data.length; i++)
    {
        areaBData.push({b: 0});
        areaBData[i].b = data[i].b;
    }
    var areaB = bAreaGenerator(areaBData);
    console.log(areaB)
    var newAreaB = document.createElementNS('http://www.w3.org/2000/svg',"path");
    newAreaB.setAttributeNS(null, "class", "areas");
    newAreaB.setAttributeNS(null, "d", areaB);
    document.getElementById("Barea").appendChild(newAreaB);

    // TODO: Select and update the scatterplot points


    // ****** TODO: PART IV ******
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
            update(subset);
        });
    }
    else{
        changeData();
    }
}
