import DS from 'ember-data';
import attr from 'ember-data/attr';

export default DS.Model.extend({
  groupId: attr('id'),
  groupName: attr(),
  icon: attr(),
  subgroupsCount: attr()
});
