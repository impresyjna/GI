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
  }


});
