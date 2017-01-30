import Ember from 'ember';

export default Ember.Controller.extend({
  chartsData: [],
  countiesData: [],
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
  countyFilterOn: false,
  multipleCounties: false,
  options: {
    annotations: {
      alwaysOutside: false
    },
    hAxis: {
      viewWindowMode: 'explicit',
      viewWindow: {
        max: '2015',
        min: '2010'
      }
    }

  },

  districts: [
    {key: 1, value: "Bydgoszcz", checked: false}, {key: 4, value: "Grudziądz", checked: false}, {
      key: 2,
      value: "Toruń",
      checked: false
    }, {
      key: 3,
      value: "Włocławek", checked: false
    }, {key: 5, value: "powiat aleksandrowski", checked: false},
    {key: 6, value: "powiat brodnicki", checked: false}, {key: 7, value: "powiat bydgoski", checked: false}, {
      key: 8,
      value: "powiat chełmiński", checked: false
    }, {key: 9, value: "powiat golubsko-dobrzyński", checked: false}, {
      key: 10,
      value: "powiat grudziądzki",
      checked: false
    },
    {key: 11, value: "powiat inowrocławski", checked: false}, {key: 12, value: "powiat lipnowski", checked: false}, {
      key: 13,
      value: "powiat mogileński", checked: false
    }, {key: 14, value: "powiat nakielski", checked: false}, {key: 15, value: "powiat radziejowski", checked: false},
    {key: 16, value: "powiat rypiński", checked: false}, {key: 17, value: "powiat sępoleński", checked: false}, {
      key: 18,
      value: "powiat świecki", checked: false
    }, {key: 19, value: "powiat toruński", checked: false}, {key: 20, value: "powiat tucholski", checked: false},
    {key: 21, value: "powiat wąbrzeski", checked: false}, {
      key: 22,
      value: "powiat włocławski",
      checked: false
    }, {key: 23, value: "powiat żniński", checked: false}
  ],

  actions: {
    generateChartData: function (dimensions, data, maxValue) {
      this.set('aDimension', 1);
      this.set('bDimension', 1);
      this.set('cDimension', 1);
      this.set('chartsData', []);
      var matrixForDimensions = null;
      if (dimensions.length > 0) {
        matrixForDimensions = new Array(dimensions[0]['options'].length);
        this.set('aDimension', dimensions[0]['options'].length);
        for (var i = 0; i < dimensions[0]['options'].length; i++) {
          if (dimensions.length > 1) {
            matrixForDimensions[i] = new Array(dimensions[1]['options'].length);
            this.set('bDimension', dimensions[1]['options'].length);
            for (var j = 0; j < dimensions[1]['options'].length; j++) {
              if (dimensions.length > 2) {
                matrixForDimensions[i][j] = new Array(dimensions[2]['options'].length);
                this.set('cDimension', dimensions[2]['options'].length);
                for (var k = 0; k < dimensions[2]['options'].length; k++) {
                  matrixForDimensions[i][j][k] = [];
                  matrixForDimensions[i][j][k].push(["Rok", data[0]['unitOfMeasure']]);
                  matrixForDimensions[i][j][k].push(["0", maxValue]);
                }
              } else {
                matrixForDimensions[i][j] = [];
                matrixForDimensions[i][j].push(["Rok", data[0]['unitOfMeasure']]);
                matrixForDimensions[i][j].push(["0", maxValue]);
              }
            }
          } else {
            matrixForDimensions[i] = [];
            matrixForDimensions[i].push(["Rok", data[0]['unitOfMeasure']]);
            matrixForDimensions[i].push(["0", maxValue]);
          }
        }
      } else {
        matrixForDimensions = [];
        matrixForDimensions.push(["Rok", data[0]['unitOfMeasure']]);
        matrixForDimensions.push(["0", maxValue]);
      }

      data.forEach(function (entry) {
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

      if (dimensions.length > 0) {
        for (var i = 0; i < dimensions[0]['options'].length; i++) {
          if (dimensions.length > 1) {
            for (var j = 0; j < dimensions[1]['options'].length; j++) {
              if (dimensions.length > 2) {
                for (var k = 0; k < dimensions[2]['options'].length; k++) {
                  var param1 = dimensions[0]['options'].filter(function (obj) {
                    return obj.key == i;
                  });
                  var param2 = dimensions[1]['options'].filter(function (obj) {
                    return obj.key == j;
                  });
                  var param3 = dimensions[2]['options'].filter(function (obj) {
                    return obj.key == k;
                  });

                  var chartData = this.store.createRecord('chart-data', {
                    grid_header: [param1[0]['value'], param2[0]['value'], param3[0]['value']],
                    chart_data: matrixForDimensions[i][j][k]
                  });

                  this.get('chartsData').pushObject(chartData);
                }
              } else {
                var param1 = dimensions[0]['options'].filter(function (obj) {
                  return obj.key == i;
                });
                var param2 = dimensions[1]['options'].filter(function (obj) {
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
            var param1 = dimensions[0]['options'].filter(function (obj) {
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
      var dimensions = this.get('aDimension') * this.get('bDimension') * this.get('cDimension');
      if (dimensions == 1) {
        this.set('dimensions', 5);
      } if (dimensions == 8) {
        this.set('dimensions', 8);
      } else {
        this.set('dimensions', dimensions % 3);
      }
    }
    ,

    getSubgroupInfo: function (subgroup) {
      this.set('chartsData', []);
      this.set('countiesData', []);
      this.set('fromDate', []);
      this.set('toDate', []);
      this.set('showDate', []);
      this.set('countyFilterOn', false);
      this.set('multipleCounties', false);
      var dimensionsHttp = new XMLHttpRequest();
      dimensionsHttp.open("GET", 'http://gi-kp.azurewebsites.net/groups/' + this.get('groupId') + '/subgroups/' + subgroup.id + '/dimensions?levelOfData=' + this.get('levelOfData'), false); // false for synchronous request
      dimensionsHttp.send(null);
      var dimensions = JSON.parse(dimensionsHttp.responseText)['dimensions'];
      var years = JSON.parse(dimensionsHttp.responseText)['yearsRange'];

      var groupsReq = new XMLHttpRequest();
      groupsReq.open("GET", 'http://gi-kp.azurewebsites.net/groups/' + this.get('groupId') + '/subgroups/' + subgroup.id + '?levelOfData=2&counties=1', false); // false for synchronous request
      groupsReq.send(null);
      var groupsResp = JSON.parse(groupsReq.responseText);
      var groups = [];
      if (groupsResp.hasOwnProperty('data')) {
        groups = groupsResp['data'];
      } else {
        groups = groupsResp;
      }

      if (groups[0].hasOwnProperty('county')) {
        this.set('countyFilterOn', true);
        console.log(this.get('countyFilterOn'));
      }


      for (var i = years["firstYear"]; i <= years["lastYear"]; i++) {
        this.get('fromDate').pushObject(i);
        this.get('toDate').pushObject(i);
        this.get('showDate').pushObject(i);
      }

      console.log(years["firstYear"]);
      this.set('options.hAxis.viewWindow.min', years["firstYear"].toString());

      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", 'http://gi-kp.azurewebsites.net/groups/' + this.get('groupId') + '/subgroups/' + subgroup.id + '?levelOfData=' + this.get('levelOfData'), false); // false for synchronous request
      xmlHttp.send(null);
      var jsonResponse = JSON.parse(xmlHttp.responseText);
      var data = [];
      if (jsonResponse.hasOwnProperty('data')) {
        data = jsonResponse['data'];
      } else {
        data = jsonResponse;
      }

      var maxValue = Math.max.apply(Math, data.map(function (o) {
        return o.value;
      }));

      this.send('generateChartData', dimensions, data, maxValue);
    }
    ,

    filterData: function (subgroup, selectedFrom, selectedTo) {
      this.set('chartsData', []);
      this.set('countiesData', []);
      this.set('fromDate', []);
      this.set('toDate', []);
      this.set('showDate', []);
      this.set('multipleCounties', false);
      var multipleCounties = false;
      var dimensionsHttp = new XMLHttpRequest();
      dimensionsHttp.open("GET", 'http://gi-kp.azurewebsites.net/groups/' + this.get('groupId') + '/subgroups/' + subgroup.id + '/dimensions?levelOfData=2', false); // false for synchronous request
      dimensionsHttp.send(null);
      var dimensions = JSON.parse(dimensionsHttp.responseText)['dimensions'];

      var xmlHttp = new XMLHttpRequest();
      var requestForData = 'http://gi-kp.azurewebsites.net/groups/' + this.get('groupId') + '/subgroups/' + subgroup.id + '?levelOfData=';
      if (this.get('countyFilterOn')) {
        requestForData += 2;
      } else {
        requestForData += this.get('levelOfData');
      }
      var districts = this.get('districts');
      districts.forEach(function (entry) {
        if (entry.checked) {
          requestForData += "&counties=" + entry.key;
          multipleCounties = true;
        }
      });

      xmlHttp.open("GET", requestForData, false); // false for synchronous request
      xmlHttp.send(null);
      var jsonResponse = JSON.parse(xmlHttp.responseText);
      console.log(jsonResponse);
      var data = [];

      if (jsonResponse.hasOwnProperty('data')) {
        data = jsonResponse['data'];
      } else {
        data = jsonResponse;
      }

      if (selectedFrom != 0 && selectedTo != 0) {
        console.log("Date picked");
        this.set('options.hAxis.viewWindow.min', selectedFrom.toString());
        this.set('options.hAxis.viewWindow.max', selectedTo.toString());

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
      }

      var maxValue = Math.max.apply(Math, data.map(function (o) {
        return o.value;
      }));
      //
      if(multipleCounties) {
        var controller = this;
        districts.forEach(function (entry) {
          if (entry.checked) {
            var newData = data;
            newData = newData.filter(function (el) {
              return el.county==entry.key;
            });
            console.log("New data");
            console.log(entry.key);
            console.log(newData);
            controller.send('generateChartData', dimensions, newData, maxValue);
            var countyData = controller.store.createRecord('county-chart-data', {
              countyName: entry.value,
              chartsData: Object.create(controller.get('chartsData'))
            });
            controller.get('countiesData').pushObject(countyData);
          }
        });
      } else {
        this.send('generateChartData', dimensions, data, maxValue);
      }
      this.set('multipleCounties', multipleCounties);
      console.log(this.get('options'));
    },
    goBack: function(){
      var appController = this.controllerFor('application');
      this.transitionTo(appController.get('lastRoute'));
    }
  }
})
;
