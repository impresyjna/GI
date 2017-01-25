import DS from 'ember-data';
import attr from 'ember-data/attr';
import { hasMany } from 'ember-data/relationships';

var Group = DS.Model.extend({
  groupName: attr(),
  icon: attr(),
  subgroupsCount: attr(),
  subgroups: hasMany('subgroup')
});

export default Group;
