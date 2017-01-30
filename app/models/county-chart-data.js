import DS from 'ember-data';

export default DS.Model.extend({
  countyName: DS.attr(),
  chartsData: DS.attr()
});
