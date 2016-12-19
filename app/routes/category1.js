import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      years: [
        2014, 2015, 2016
      ],
      charts: [
        ['Rok', 'Km'],
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Watch TV', 2],
        ['Sleep', 7],
      ]
    });
  }

});
