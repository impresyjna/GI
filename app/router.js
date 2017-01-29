import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('home', {path: '/'});
  this.route('county', {path: '/county/:county_id'});
  this.route('group', { path: '/groups/:group_id' });
  this.route('county-group', {path: '/county-groups/:group_id'});
});

export default Router;
