var expanded = false;
var coords;
var scale;
var projection;
var path;
var svg
var tooltip
var width = screen.width, height = screen.height;

projection = d3.geo.mercator()
.center([-1.0,53])
.rotate([-370,-6])
.scale(160)
.translate([width / 2, height / 2]);

path = d3.geo.path().projection(projection);

svg = d3.select("body").append("svg").attr("width", width).attr("height", height);

d3.json("https://raw.githubusercontent.com/VikingProgrammer/Data_Data_Everywhere/master/Refugee_Map_09_07_2016/data/custom.json", function(error, countries) {
    console.log(countries)
    if (error) return console.error(error);

    //var subunits = topojson.feature(countries, countries.objects.countries)
    console.log(countries.features)
    svg.selectAll("path").data(countries.features).enter().append("path").attr("d", path)
    //.attr("class", function(d) { return "path " + d.id; })
});

d3.select("body").append("p").text("new paragraph!");