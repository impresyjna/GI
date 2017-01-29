import Ember from 'ember';

export default Ember.Controller.extend({
  chartsData: [],
  cDimension: 1,
  bDimension: 1,
  aDimension: 1,
  dimensions: 0,
  groupName: "",
  fromDate: [],
  toDate: [],
  showDate: [],
  selectedFrom: 0,
  selectedTo: 0,

  actions: {
    generateChartData: function(dimensions, data) {
      var matrixForDimensions = null;
      if(dimensions.length>0) {
        matrixForDimensions = new Array(dimensions[0]['options'].length);
        this.set('aDimension',dimensions[0]['options'].length);
        for (var i = 0; i < dimensions[0]['options'].length; i++) {
          if(dimensions.length>1) {
            matrixForDimensions[i] = new Array(dimensions[1]['options'].length);
            this.set('bDimension', dimensions[1]['options'].length);
            for (var j = 0; j < dimensions[1]['options'].length; j++) {
              if (dimensions.length > 2) {
                matrixForDimensions[i][j] = new Array(dimensions[2]['options'].length);
                this.set('cDimension', dimensions[2]['options'].length);
                for (var k = 0; k < dimensions[2]['options'].length; k++) {
                  matrixForDimensions[i][j][k] = [];
                  matrixForDimensions[i][j][k].push(["Rok", data[0]['unitOfMeasure']]);
                }
              } else {
                matrixForDimensions[i][j] = [];
                matrixForDimensions[i][j].push(["Rok", data[0]['unitOfMeasure']]);
              }
            }
          } else {
            matrixForDimensions[i] = [];
            matrixForDimensions[i].push(["Rok", data[0]['unitOfMeasure']]);
          }
        }
      } else {
        matrixForDimensions = [];
        matrixForDimensions.push(["Rok", data[0]['unitOfMeasure']]);
      }

      data.forEach(function(entry) {
        if (dimensions.length == 3) {
          matrixForDimensions[entry[dimensions[0]['parameterName']]][entry[dimensions[1]['parameterName']]][entry[dimensions[2]['parameterName']]].push([entry['year'].toString(), entry['value'].toFixed(2)]);
        } else if (dimensions.length == 2) {
          matrixForDimensions[entry[dimensions[0]['parameterName']]][entry[dimensions[1]['parameterName']]].push([entry['year'].toString(), entry['value'].toFixed(2)]);
        } else if (dimensions.length == 1) {
          matrixForDimensions[entry[dimensions[0]['parameterName']]].push([entry['year'].toString(), entry['value'].toFixed(2)]);
        } else {
          matrixForDimensions.push([entry['year'].toString(), entry['value'].toFixed(2)]);
        }
      });

      if(dimensions.length>0) {
        for (var i = 0; i < dimensions[0]['options'].length; i++) {
          if(dimensions.length>1) {
            for (var j = 0; j < dimensions[1]['options'].length; j++) {
              if (dimensions.length > 2) {
                for (var k = 0; k < dimensions[2]['options'].length; k++) {
                  var param1 = dimensions[0]['options'].filter(function( obj ) {
                    return obj.key == i;
                  });
                  var param2 = dimensions[1]['options'].filter(function( obj ) {
                    return obj.key == j;
                  });
                  var param3 = dimensions[2]['options'].filter(function( obj ) {
                    return obj.key == k;
                  });

                  var chartData = this.store.createRecord('chart-data', {
                    grid_header: [param1[0]['value'], param2[0]['value'], param3[0]['value']],
                    chart_data: matrixForDimensions[i][j][k]
                  });

                  this.get('chartsData').pushObject(chartData);
                }
              } else {
                var param1 = dimensions[0]['options'].filter(function( obj ) {
                  return obj.key == i;
                });
                var param2 = dimensions[1]['options'].filter(function( obj ) {
                  return obj.key == j;
                });

                var chartData = this.store.createRecord('chart-data', {
                  grid_header: [param1[0]['value'], param2[0]['value']],
                  chart_data: matrixForDimensions[i][j]
                });

                this.get('chartsData').pushObject(chartData);
              }
            }
          } else {
            var param1 = dimensions[0]['options'].filter(function( obj ) {
              return obj.key == i;
            });

            var chartData = this.store.createRecord('chart-data', {
              grid_header: [param1[0]['value']],
              chart_data: matrixForDimensions[i]
            });

            this.get('chartsData').pushObject(chartData);
          }
        }
      } else {
        var chartData = this.store.createRecord('chart-data', {
          grid_header: [],
          chart_data: matrixForDimensions
        });

        this.get('chartsData').pushObject(chartData);
      }
      console.log(this.get('chartsData'));
      this.set('chartsData', this.get('chartsData'));
      var dimensions = (this.get('aDimension')*this.get('bDimension')*this.get('cDimension'));
      if(dimensions == 1) {
        this.set('dimensions', 5);
      } else {
        this.set('dimensions', dimensions%3);
      }
    },

    getSubgroupInfo: function (subgroup) {
      this.set('chartsData', []);
      this.set('fromDate', []);
      this.set('toDate', []);
      this.set('showDate', []);
      var dimensionsHttp = new XMLHttpRequest();
      dimensionsHttp.open("GET", 'http://gi-kp.azurewebsites.net/groups/' + this.get('groupId') + '/subgroups/' + subgroup.id + '/dimensions?levelOfData=' + this.get('levelOfData') + "&counties=" + this.get('county'), false); // false for synchronous request
      dimensionsHttp.send(null);
      var dimensions = JSON.parse(dimensionsHttp.responseText)['dimensions'];
      var years = JSON.parse(dimensionsHttp.responseText)['yearsRange'];

      for (var i=years["firstYear"]; i<= years["lastYear"]; i++) {
        this.get('fromDate').pushObject(i);
        this.get('toDate').pushObject(i);
        this.get('showDate').pushObject(i);
      }

      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", 'http://gi-kp.azurewebsites.net/groups/' + this.get('groupId') + '/subgroups/' + subgroup.id + '?levelOfData=' + this.get('levelOfData') + "&counties=" + this.get('county'), false); // false for synchronous request
      xmlHttp.send(null);
      var jsonResponse = JSON.parse(xmlHttp.responseText);
      var data = [];
      if (jsonResponse.hasOwnProperty('data')) {
        data = jsonResponse['data'];
      } else {
        data = jsonResponse;
      }

      this.send('generateChartData', dimensions, data);
    },

    filterData: function (subgroup, selectedFrom, selectedTo) {
      this.set('chartsData', []);
      var dimensionsHttp = new XMLHttpRequest();
      dimensionsHttp.open("GET", 'http://gi-kp.azurewebsites.net/groups/' + this.get('groupId') + '/subgroups/' + subgroup.id + '/dimensions?levelOfData=' + this.get('levelOfData') + "&counties=" + this.get('county'), false); // false for synchronous request
      dimensionsHttp.send(null);
      var dimensions = JSON.parse(dimensionsHttp.responseText)['dimensions'];

      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", 'http://gi-kp.azurewebsites.net/groups/' + this.get('groupId') + '/subgroups/' + subgroup.id + '?levelOfData=' + this.get('levelOfData') + "&counties=" + this.get('county'), false); // false for synchronous request
      xmlHttp.send(null);
      var jsonResponse = JSON.parse(xmlHttp.responseText);
      var data = [];

      if (jsonResponse.hasOwnProperty('data')) {
        data = jsonResponse['data'];
      } else {
        data = jsonResponse;
      }

      data = data.filter(function (el) {
        return el.year >= selectedFrom &&
          el.year <= selectedTo;
      });

      var dates = this.get('showDate');
      dates = dates.filter(function (el) {
        return el >= selectedFrom &&
          el <= selectedTo;
      });
      this.set('showDate', dates);
      //
      this.send('generateChartData', dimensions, data);
    }
  }
});
