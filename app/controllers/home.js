import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    targetButton(item) {
      //this.transitionToRoute(item);
      this.transitionToRoute(item);
    }
  }
});
