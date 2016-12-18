import Ember from 'ember';

export default Ember.Controller.extend({
  lat: 53.01375,
  lng: 18.59814,
  zoom: 7,
  emberConfLocation: [45.528298, -122.662986],
  hotel: [45.530891, -122.655504],
  options: {
    title: 'How I spend my days',
    height: 300,
    width: 400,

    animation: {
      startup: true,
      easing: 'inAndOut',
    },
  },

  actions: {
    targetButton(item) {
      //this.transitionToRoute(item);
      this.transitionToRoute(item);
    }
  }

});
