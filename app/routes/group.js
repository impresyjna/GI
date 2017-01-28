import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    levelOfData: 1,
    groupId: 1
  },

  levelOfData: 2,
  groupId: 2,

  model: function(params) {
    console.log(params);
    this.set('levelOfData',params.levelOfData);
    this.set('groupId', params.group_id);
    return Ember.$.getJSON('http://gi-kp.azurewebsites.net/groups/' + params.group_id +  '/subgroups?levelOfData=' + params.levelOfData );
  },

  serialize: function(model) {
    return {subgroups: model.get('subgroup')};
  },

  setupController: function(controller, model) {
    controller.set('levelOfData', this.get('levelOfData'));
    controller.set('groupId', this.get('groupId'));
    controller.set('model', model);
  }


});
