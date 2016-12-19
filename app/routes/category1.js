import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      years: [
        2014, 2015, 2016
      ],
      charts: [
        ['Rok', 'Tys.'],
        ['2010', 11],
        ['2011', 2],
        ['2012', 2],
        ['2013', 2],
        ['2014', 7],
      ],
      districts: [
        ["Bydgoszcz"], ["Grudziądz"], ["Toruń"], ["Włocławek"], ["powiat aleksandrowski"],
        ["powiat brodnicki"], ["powiat bydgoski"], ["powiat chełmiński"], ["powiat golubsko-dobrzyński"], ["powiat grudziądzki"],
        ["powiat inowrocławski"], ["powiat lipnowski"], ["powiat mogileński"], ["powiat nakielski"], ["powiat radziejowski"],
        ["powiat rypiński"], ["powiat sępoleński"], ["powiat świecki"], ["powiat toruński"], ["powiat tucholski"],
        ["powiat wąbrzeski"], ["powiat włocławski"], ["powiat żniński"]
      ]
    });
  }


});
