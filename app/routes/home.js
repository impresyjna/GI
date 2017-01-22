import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    levelOfData: 1
  },

  model: function(params) {
    return this.get('store').query('group', params);
  }
});
