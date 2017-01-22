import DS from 'ember-data';
import attr from 'ember-data/attr';

var Group = DS.Model.extend({
  groupName: attr(),
  icon: attr(),
  subgroupsCount: attr()
});

export default Group;
