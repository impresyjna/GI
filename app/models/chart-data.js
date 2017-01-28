import DS from 'ember-data';

export default DS.Model.extend({
  grid_header: DS.attr(),
  chart_data: DS.attr()
});
