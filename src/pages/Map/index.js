import React, { useRef, useEffect, useState } from 'react';
import MapView, { Marker, UrlTile } from 'react-native-maps';

import axios from 'axios';

import CardCheers from '~/components/CardCheers';
import CardInfo from '~/components/CardInfo';
import Header from '~/components/Header';

import { Container, MarkerImage } from './styles';

export default function Map() {
  const mapRef = useRef();
  const [ubss, setUbss] = useState(null);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    axios
      .get(
        'https://cartaosusdigital.saude.gov.br/cartaosus/rest/estabelecimento/ubs',
        {
          params: {
            latitude: -0.0473944,
            longitude: -51.1700786,
            registroInicial: 1,
            quantidadeRegistros: 100,
          },
        }
      )
      .then(response => {
        setUbss(response.data);
      });
  }, []);

  return (
    <Container style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: -0.0486491,
          longitude: -51.1697809, // unifap
          latitudeDelta: 0.0134,
          longitudeDelta: 0.0134,
        }}
        loadingEnabled
        showsUserLocation
        // minZoomLevel={16}
        ref={mapRef}
        /* onLayout={() =>
          mapRef.setMapBoundaries(
            { latitude: 0.0016, longitude: -51.0823 },
            { latitude: -0.00998, longitude: -51.08885 }
          )
        } */
      >
        {ubss?.map(ubs => (
          <Marker
            onPress={() => {
              setSelected(ubs);
            }}
            coordinate={{
              latitude: ubs.latitude,
              longitude: ubs.longitude,
            }}
          >
            <MarkerImage source />
          </Marker>
        ))}
      </MapView>
      {selected && (
        <CardInfo ubs={selected} onClose={() => setSelected(null)} />
      )}
      <CardCheers />
    </Container>
  );
}

Map.navigationOptions = {
  headerTitle: () => (
    <Header
      title="Mapa"
      subtitle="Veja as Unidades Básicas de Saúde por perto."
    />
  ),
};
