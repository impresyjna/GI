import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    levelOfData: 1
  },

  model: function(params) {
    console.log(params);
    return {};
    // return Ember.$.getJSON('/groups/' +  '/subgroups/');
  },

  serialize: function(model) {
    return { subgroups: model.get('subgroup') };
  }
});
