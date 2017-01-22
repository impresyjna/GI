import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    levelOfData: 1
  },

  model: function(params) {
    var levelOfData = 1;
    var query = {levelOfData: levelOfData};
    console.log(query)
    return this.get('store').query('group', params);
  }
});
