import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';

function MapScreen() {
  const P0 = {latitude: 38.07510838708869, longitude: 128.6250264365656};
  const P1 = {latitude: 38.07294951566119, longitude: 128.6234972427233};
  const P2 = {latitude: 38.072847035378096, longitude: 128.62178565345724};
  const P3 = {latitude: 38.07855732743033, longitude: 128.62446457943497};

  return (
    <NaverMapView
      style={{width: '100%', height: '100%'}}
      showsMyLocationButton={true}
      center={{...P0, zoom: 16}}
      onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
      onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
      onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
      <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />
      <Marker
        coordinate={P1}
        // pinColor="blue"
        onClick={() => console.warn('onClick! p1')}
      />
      <Marker
        coordinate={P2}
        // pinColor="red"
        onClick={() => console.warn('onClick! p2')}
      />
      <Marker coordinate={P3} />
      {/* <Path
        coordinates={[P0, P1]}
        onClick={() => console.warn('onClick! path')}
        width={10}
      /> */}
      {/* <Polyline
        coordinates={[P1, P2]}
        onClick={() => console.warn('onClick! polyline')}
      /> */}
      {/* <Circle
        coordinate={P0}
        color={'rgba(255,0,0,0.3)'}
        radius={200}
        onClick={() => console.warn('onClick! circle')}
      /> */}
      {/* <Polygon
        coordinates={[P0, P1, P2]}
        color={`rgba(0, 0, 0, 0.5)`}
        onClick={() => console.warn('onClick! polygon')}
      /> */}
    </NaverMapView>
  );
}

export default MapScreen;
