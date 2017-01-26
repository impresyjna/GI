import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    levelOfData: 1
  },

  model: function(params) {
    console.log(params);
    return Ember.$.getJSON('http://gi-kp.azurewebsites.net/groups/' + params.group_id +  '/subgroups?levelOfData=' + params.levelOfData );
  },

  serialize: function(model) {
    return { subgroups: model.get('subgroup') };
  },

  actions: {
    getSubgroupInfo: function(subgroup,params) {
      console.log("SIEMA");
      console.log(params.group_id);
      console.log(subgroup.id);
      console.log(params.levelOfData);
      // var subgroupInfoForChart = Ember.$.getJSON('http://gi-kp.azurewebsites.net/groups/' + params.group_id +  '/subgroups/' + subgroup.id + '?levelOfData=' + params.levelOfData );
      // console.log(subgroupInfoForChart);
    }
  }


});
