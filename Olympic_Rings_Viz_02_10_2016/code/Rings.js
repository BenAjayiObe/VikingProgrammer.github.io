/*
Code starting point: http://jsfiddle.net/thmain/xL48ru9k/
*/

var employees = [
    {dept: 'A', count : 22}
];
var maxWidth = 750;
var maxHeight = 350;
var outerRadius = 100;
var ringWidth = 10;
var innerRadius = outerRadius - ringWidth;
var opacity = 0.7;
var AREA = Math.PI*(outerRadius*outerRadius)

// Utility Arrays
var ringCoord =[[100,100,"Africa"],[320,100,"Europe"],[540,100,"Asia"],[210,200,"North_America"],[650,200,"South_America"],[430,200,"Oceania"]]
var Continents = ["Africa","Europe","Asia","North_America","South_America","Oceania"]
var ringColours = ["Blue","Black","Red","Yellow","Purple","Green"]
var numCountries = [54,43,47,23,12,14]

// Data
var totalPerContinent = [['AFRICA', 45],['EUROPE', 355],['ASIA', 240],['NORTH_AMERICA', 176],['SOUTH_AMERICA', 34], ['OCEANIA', 48]]

var goldPerContinent = [['AFRICA', 10],['EUROPE', 107],['ASIA', 71],['NORTH_AMERICA', 63],['SOUTH_AMERICA', 13],['OCEANIA', 13]]

var silverPerContinent = [['AFRICA', 18], ['EUROPE', 119],['ASIA', 65],['NORTH_AMERICA', 49],['SOUTH_AMERICA', 10],['OCEANIA', 20]]

var bronzePerContinent = [['AFRICA', 17],['EUROPE', 129],['ASIA', 104],['NORTH_AMERICA', 64], ['SOUTH_AMERICA', 11],['OCEANIA', 15]]

var scale_tot_continent = d3.scale.linear().domain([34,355]).range([0.1, 1]);
var scale_gold_continent = d3.scale.linear().domain([10,107]).range([0.1, 1]);
var scale_silver_continent = d3.scale.linear().domain([10,119]).range([0.1, 1]);
var scale_bronze_continent = d3.scale.linear().domain([11,129]).range([0.1, 1]);


    var pie = d3.layout.pie().value(function (d) {
        return d.count;
    });

    var tooltip = d3.select('body').append('div')
            .attr('class', 'hidden tooltip');

    var color = d3.scale.category10();
    var arc = d3.svg.arc();


    arc.outerRadius(outerRadius)
        .innerRadius(innerRadius);


    var svg = d3.select('.animated-ring svg')
        .attr({
            width : maxWidth,
            height: maxHeight
        })
        .on('click',function(d){
            var temp;
            for(i=0; i<6;i++){
                temp = d3.selectAll('[id="'+totalPerContinent[i][0]+'"]');
                temp
                .transition()
                .duration(1000 - 500*scale_tot_continent(totalPerContinent[i][1]))
                .attr("transform","translate(" + ringCoord[i][0] + ", " + ringCoord[i][1] + ")scale(1)");
            }
            labels.attr("visibility","hidden");
        })

    // AFRICA

    var Africa = svg.selectAll('g#AFRICA.arc')
    .data(pie(employees))
    .enter()
    .append('g')
    .attr({
        'class': 'arc',
        'id':'AFRICA',
        'transform': 'translate(' + ringCoord[0][0] + ', ' + ringCoord[0][1] + ')'
    })
    .append('path')
    .attr({'fill': "Blue","d":arc})
    .style("opacity",opacity)
    .on('mouseenter', function(d) {
        var mouse = d3.mouse(svg.node()).map(function(d) {
            return parseInt(d);
        });
        tooltip.classed('hidden', false)
        .attr('style', 'left:' + (mouse[0]+215) + 'px; top:' + (mouse[1]+12) + 'px')
        .html("<div>"+totalPerContinent[0][1]+"</div>");
    });

    // EUROPE
    var Europe = svg.selectAll('g#EUROPE.arc')
    .data(pie(employees))
    .enter()
    .append('g')
    .attr({
        'class': 'arc',
        'id':'EUROPE',
        'transform': 'translate(' + ringCoord[1][0] + ', ' + ringCoord[1][1] + ')'
    })
    .append('path')
    .attr({'fill': "Black","d":arc})
    .style("opacity",opacity)
    .on('mouseover', function(d){
        console.log("Europe")
    });

    // ASIA
    var Asia = svg.selectAll('g#ASIA.arc')
    .data(pie(employees))
    .enter()
    .append('g')
    .attr({
        'class': 'arc',
        'id':'ASIA',
        'transform': 'translate(' + ringCoord[2][0] + ', ' + ringCoord[2][1] + ')'
    })
    .append('path')
    .attr({'fill': "Red","d":arc})
    .style("opacity",opacity)
    .on('mouseover', function(d){
        console.log("Asia")
    });

    // NORTH AMERICA
    var northAmerica = svg.selectAll('g#NORTH_AMERICA.arc')
    .data(pie(employees))
    .enter()
    .append('g')
    .attr({
        'class': 'arc',
        'id':'NORTH_AMERICA',
        'transform': 'translate(' + ringCoord[3][0] + ', ' + ringCoord[3][1] + ')'
    })
    .append('path')
    .attr({'fill': "Yellow","d":arc})
    .style("opacity",opacity)
    .on('mouseover', function(d){
        console.log("North America")
    });

    // South AMERICA
    var southAmerica = svg.selectAll('g#SOUTH_AMERICA.arc')
    .data(pie(employees))
    .enter()
    .append('g')
    .attr({
        'class': 'arc',
        'id':'SOUTH_AMERICA',
        'transform': 'translate(' + ringCoord[4][0] + ', ' + ringCoord[4][1] + ')'
    })
    .append('path')
    .attr({'fill': "Purple","d":arc})
    .style("opacity",opacity)
    .on('mouseover', function(d){
        console.log("South America")
    });

    // OCEANIA
    var Oceania = svg.selectAll('g#OCEANIA.arc')
    .data(pie(employees))
    .enter()
    .append('g')
    .attr({
        'class': 'arc',
        'id':'OCEANIA',
        'transform': 'translate(' + ringCoord[5][0] + ', ' + ringCoord[5][1] + ')'
    })
    .append('path')
    .attr({'fill': "Green","d":arc})
    .style("opacity",opacity)

    var labels = svg.selectAll('text')
    .data(ringCoord)
    .enter()
    .append('text')
    .attr("x",function(d){ return d[0];})
    .attr("y", function(d){ return d[1];})
    .attr("id",function(d){ return d[2]+"_label";})
    .text(function(d,i){return totalPerContinent[i][1];})
    .style("font-size","14px")
    .style("font-family", "Ariel")
    .attr("visibility","hidden");

    labels.attr("x",function(d){
        var test = document.getElementById(d[2]+"_label");
        test.style.fontSize = 14;
        test.style.fontFamily = "Ariel"
        return d[0]-test.clientWidth/2;
    })
    .attr("y",function(d){
        var test = document.getElementById(d[2]+"_label");
        test.style.fontSize = 14;
        test.style.fontFamily = "Ariel"
        return d[1]+test.clientHeight/2;
    });

function updateData(medal) {
    var temp;
    for(i=0; i<6;i++){
        temp = d3.selectAll('[id="'+totalPerContinent[i][0]+'"]');
        temp
        .transition()
        .duration(1000 - 500*1)
        .attr("transform","translate(" + ringCoord[i][0] + ", " + ringCoord[i][1] + ")scale(1)");
    }
    console.log(medal)
    var temp;
    var medalList; 
    var medalScale;
    if(medal=="Total"){
        medalList = totalPerContinent;
        medalScale = scale_tot_continent;
        labels.text(function(d,i){return totalPerContinent[i][1];}).attr("visibility","visible");
    } else if(medal=="Gold"){
        medalList = goldPerContinent;
        medalScale = scale_gold_continent;
        labels.text(function(d,i){return goldPerContinent[i][1];}).attr("visibility","visible");
    } else if(medal=="Silver"){
        medalList = silverPerContinent;
        medalScale = scale_silver_continent;
        labels.text(function(d,i){return silverPerContinent[i][1];}).attr("visibility","visible");
    } else if(medal=="Bronze"){
        medalList = bronzePerContinent;
        medalScale = scale_bronze_continent;
        labels.text(function(d,i){return bronzePerContinent[i][1];}).attr("visibility","visible");
    }

    for(i=0; i<6;i++){
        temp = d3.selectAll('[id="'+medalList[i][0]+'"]');
        temp
        .transition()
        .duration(1000 - 500*medalScale(medalList[i][1]))
        .attr("transform","translate(" + ringCoord[i][0] + ", " + ringCoord[i][1] + ")scale("+produceScaleFactor(medalScale(medalList[i][1]))+")");
    }
}

function produceScaleFactor(linScale){
    var targetArea = AREA*linScale; // Area I want to get to.
    var radius = Math.sqrt(targetArea/Math.PI) // Radius I want to get to.
    return radius/outerRadius; // Scale of new radius from old radius.
}