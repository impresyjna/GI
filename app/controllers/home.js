import Ember from 'ember';

export default Ember.Controller.extend({
  lat: 45.519743,
  lng: -122.680522,
  zoom: 10,
  options: {
    title: 'How I spend my days',
    height: 300,
    width: 400,

    animation: {
      startup: true,
      easing: 'inAndOut',
    },
  }

});
