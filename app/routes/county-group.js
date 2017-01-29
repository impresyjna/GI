import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    levelOfData: 1,
    groupId: 1,
    county: 2,
  },

  levelOfData: 2,
  groupId: 2,
  county: 2,

  model: function(params) {
    this.set('levelOfData',params.levelOfData);
    this.set('groupId', params.group_id);
    this.set('county', params.county);
    return Ember.$.getJSON('http://gi-kp.azurewebsites.net/groups/' + params.group_id +  '/subgroups?levelOfData=' + params.levelOfData +"&counties=" + params.county);
  },

  serialize: function(model) {
    return {subgroups: model.get('subgroup')};
  },

  setupController: function(controller, model) {
    controller.set('levelOfData', this.get('levelOfData'));
    controller.set('groupId', this.get('groupId'));
    controller.set('county', this.get('county'));
    controller.set('model', model);
  }
});
