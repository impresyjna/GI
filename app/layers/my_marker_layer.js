import MarkerLayer from 'ember-leaflet/layers/marker';
import DraggableMixin from 'ember-leaflet/mixins/draggable';

export default MarkerLayer.extend(DraggableMixin, {});

App.MarkerCollectionLayer = EmberLeaflet.MarkerCollectionLayer.extend({
  content: Ember.computed.alias('controller'),
  itemLayerClass: EmberLeaflet.MarkerLayer.extend({
    location: EmberLeaflet.computed.latLngFromLatLngArray('content.center'),
  })
});
