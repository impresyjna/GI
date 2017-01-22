import DS from 'ember-data';

ApplicationAdapter = DS.RESTAdapter.extend({
  host: 'http://gi-kp.azurewebsites.net/'
});

export default ApplicationAdapter;
