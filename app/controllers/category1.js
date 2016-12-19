import Ember from 'ember';

export default Ember.Controller.extend({
  options: {
    title: 'Powiat toruński',
    animation: {
      startup: true,
      easing: 'inAndOut',
    },
  },
});
