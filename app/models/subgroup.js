import DS from 'ember-data';
import { belongsTo } from 'ember-data/relationships';

export default DS.Model.extend({
  subgroupName: DS.attr(),
  group: belongsTo('group'),
  chartData: DS.attr()
});
