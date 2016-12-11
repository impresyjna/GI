import Ember from 'ember';

export default Ember.Route.extend({

  model() {
    return [
      ['Task', 'Hours per Day'],
      ['Work', 11],
      ['Eat', 2],
      ['Commute', 2],
      ['Watch TV', 2],
      ['Sleep', 7],
    ];
  },
  options: {
    title: 'How I spend my days',
    height: 300,
    width: 400,

    animation: {
      startup: true,
      easing: 'inAndOut',
    },
  },

});
