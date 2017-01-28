import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    levelOfData: 1,
    groupId: 1
  },

  levelOfData: 1,
  groupId: 1,

  model: function(params) {
    console.log(params);
    this.set('levelOfData',params.levelOfData);
    this.set('groupId', params.group_id);
    return Ember.$.getJSON('http://gi-kp.azurewebsites.net/groups/' + params.group_id +  '/subgroups?levelOfData=' + params.levelOfData );
  },

  serialize: function(model) {
    return {subgroups: model.get('subgroup')};
  },

  actions: {
    getSubgroupInfo: function (subgroup) {
      var dimensionsHttp = new XMLHttpRequest();
      dimensionsHttp.open( "GET", 'http://gi-kp.azurewebsites.net/groups/' + this.get('groupId') + '/subgroups/' + subgroup.id + '/dimensions?levelOfData=' + this.get('levelOfData'), false ); // false for synchronous request
      dimensionsHttp.send(null);
      var dimensions = JSON.parse(dimensionsHttp.responseText)['dimensions'];


      var xmlHttp = new XMLHttpRequest();
      xmlHttp.open( "GET", 'http://gi-kp.azurewebsites.net/groups/' + this.get('groupId') + '/subgroups/' + subgroup.id + '?levelOfData=' + this.get('levelOfData'), false ); // false for synchronous request
      xmlHttp.send( null );
      var jsonResponse = JSON.parse(xmlHttp.responseText);
      var data = jsonResponse['data'];


      var matrixForDimensions = null;
      if(dimensions.length>0) {
         matrixForDimensions = new Array(dimensions[0]['options'].length);
        for (var i = 0; i < dimensions[0]['options'].length; i++) {
          if(dimensions.length>1) {
            matrixForDimensions[i] = new Array(dimensions[1]['options'].length);
            for (var j = 0; j < dimensions[1]['options'].length; j++) {
              if (dimensions.length > 2) {
                matrixForDimensions[i][j] = new Array(dimensions[2]['options'].length);
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
          matrixForDimensions[entry[dimensions[0]['parameterName']]][entry[dimensions[1]['parameterName']]][entry[dimensions[2]['parameterName']]].push([entry['year'], entry['value']]);
        } else if (dimensions.length == 2) {
          matrixForDimensions[entry[dimensions[0]['parameterName']]][entry[dimensions[1]['parameterName']]].push([entry['year'], entry['value']]);
        } else if (dimensions.length == 1) {
          matrixForDimensions[entry[dimensions[0]['parameterName']]].push([entry['year'], entry['value']]);
        } else {
          matrixForDimensions.push([entry['year'], entry['value']]);
        }
      });

    }
  }
});
