import DS from 'ember-data';

export default DS.Model.extend({
  id: DS.attr('int'),
  name: DS.attr('string')
});
