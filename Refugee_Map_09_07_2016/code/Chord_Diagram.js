var unique_countries = ['ABW', 'AFG', 'ALB', 'ALG', 'ANG', 'ANT', 'ARE', 'ARG', 'ARM', 'AUL', 'AUS', 'AZE', 'BAH', 'BAR', 'BDI', 'BEL', 'BEN', 'BGD', 'BHS', 'BHU', 'BKF', 'BLR', 'BOL', 'BOT', 'BRA', 'BSN', 'BUL', 'BZE', 'CAM', 'CAN', 'CAR', 'CAY', 'CHD', 'CHI', 'CHL', 'CMR', 'COB', 'COD', 'COI', 'COL', 'COS', 'CUB', 'CUW', 'CVI', 'CYP', 'CZE', 'DEN', 'DJB', 'DMA', 'DOM', 'ECU', 'EGU', 'ERT', 'EST', 'ETH', 'FIJ', 'FIN', 'FRA', 'GAB', 'GAM', 'GAZ', 'GBR', 'GEO', 'GFR', 'GHA', 'GNB', 'GRE', 'GRN', 'GUA', 'GUI', 'GUY', 'HAI', 'HKG', 'HON', 'HRV', 'HUN', 'ICE', 'ICO', 'IND', 'INS', 'IRE', 'IRN', 'IRQ', 'ISR', 'ITA', 'JAM', 'JOR', 'JPN', 'KAZ', 'KEN', 'KGZ', 'KOR', 'KOS', 'KRN', 'KUW', 'LAO', 'LBR', 'LBY', 'LCA', 'LEB', 'LES', 'LIE', 'LKA', 'LTU', 'LUX', 'LVA', 'MAD', 'MAU', 'MCD', 'MCO', 'MDA', 'MDV', 'MEX', 'MLI', 'MLS', 'MLW', 'MNE', 'MNG', 'MOR', 'MOZ', 'MTA', 'MTS', 'MYA', 'NAM', 'NEP', 'NET', 'NGR', 'NIC', 'NIG', 'NIU', 'NOR', 'NRU', 'NZL', 'OMN', 'PAK', 'PAN', 'PAR', 'PER', 'PHI', 'PLW', 'PNG', 'POL', 'POR', 'QAT', 'ROM', 'RSA', 'RUS', 'RWA', 'SAL', 'SAU', 'SEN', 'SEY', 'SIN', 'SLE', 'SOL', 'SOM', 'SPA', 'SRB', 'SRV', 'SSD', 'STA', 'STK', 'STP', 'SUD', 'SUR', 'SVK', 'SVN', 'SWA', 'SWE', 'SWI', 'SYR', 'TAN', 'TCI', 'THA', 'TIB', 'TJK', 'TKM', 'TMP', 'TOG', 'TON', 'TRT', 'TUN', 'TUR', 'UAE', 'UGA', 'UKR', 'URU', 'USA', 'UZB', 'VAR', 'VCT', 'VEN', 'WSH', 'YEM', 'ZAM', 'ZIM']
var test_countries = ['BEL','ICO','SYR','GBR','GHA']
var outerRadius = (screen.height*0.9) / 2,
    innerRadius = outerRadius - 130;

var fill = d3.scale.category20c();

var chord = d3.layout.chord()
    .padding(.04)
    .sortSubgroups(d3.descending)
    .sortChords(d3.descending);

var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(innerRadius + 20);

var svg = d3.select("body").append("svg")
    .attr("width", outerRadius * 2)
    .attr("height", outerRadius * 2)
  .append("g")
    .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

var datatset = []

d3.csv("https://raw.githubusercontent.com/VikingProgrammer/VikingProgrammer.github.io/master/Refugee_Map_09_07_2016/data/clean_refugee_2015.csv", function(error,data) {
  if (error) throw error;
  console.log(data)
  dataset = data.map(function(d){return [d["country of asylum"],d["country of origin"],+d["total movement"]];})
  var matrix = [],
      new_matrix = []

  var i,j
  for(i=0;i<196;i++){
    matrix[unique_countries[i]] = []
    for(j=0;j<196;j++){
      matrix[unique_countries[i]][unique_countries[j]] = 0
    }
  }
  console.log(dataset)
  dataset.forEach(function(d){
    if ((unique_countries.indexOf(d[0])>=0 && unique_countries.indexOf(d[1])>=0)){
      if (d[2] < 0){
        matrix[d[0]][d[1]] = 0
      } else {
        matrix[d[0]][d[1]] = d[2]
      }
    }
  });
for(i=0;i<196;i++){
    new_matrix[i] = new Array(196);
    for(j=0;j<196;j++){
      new_matrix[i][j] = matrix[unique_countries[i]][unique_countries[j]] 
    }
  }

  console.log(new_matrix)
  chord.matrix(new_matrix);
  console.log(chord);
  var g = svg.selectAll(".group")
      .data(chord.groups)
    .enter().append("g")
      .attr("class", "group");

  g.append("path")
      .style("fill", function(d) { return fill(d.index); })
      .style("stroke", function(d) { return fill(d.index); })
      .attr("d", arc);

  g.append("text")
      .each(function(d) { d.angle = (d.startAngle + d.endAngle) / 2; })
      .attr("dy", ".35em")
      .attr("transform", function(d) {
        return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
            + "translate(" + (innerRadius + 26) + ")"
            + (d.angle > Math.PI ? "rotate(180)" : "");
      })
      .style("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
      .text(function(d) { return d[2]; });

  svg.selectAll(".chord")
      .data(chord.chords)
    .enter().append("path")
      .attr("class", "chord")
      .style("stroke", function(d) { return d3.rgb(fill(d.source.index)).darker(); })
      .style("fill", function(d) { return fill(d.source.index); })
      .attr("d", d3.svg.chord().radius(innerRadius));

});

d3.select(self.frameElement).style("height", outerRadius * 2 + "px");