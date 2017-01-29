import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    levelOfData: 2
  },

  countyId: 1,

  model: function(params) {
    this.set('countyId', params.county_id);
    return this.get('store').query('group', params);
  },

  setupController: function(controller, model) {
    controller.set('countyId', this.get('countyId'));
    controller.set('model', model);
  }
});
