import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['levelOfData'],
  levelOfData: 1,

  actions: {
    targetButton(item) {
      //this.transitionToRoute(item);
      this.transitionToRoute(item);
    }
  }
});
