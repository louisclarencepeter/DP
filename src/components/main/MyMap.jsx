import { useEffect, useRef, useCallback } from 'react';

function MyMap() {
  const mapRef = useRef(null);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  const initializeMap = useCallback(() => {
    if (!window.google?.maps) return;

    const mapOptions = {
      center: { lat: -6.163657188415527, lng: 39.18870162963867 },
      zoom: 14,
      mapId: 'f9d217ab22987daf',
    };

    const map = new window.google.maps.Map(mapRef.current, mapOptions);

    new window.google.maps.Marker({
      position: mapOptions.center,
      map: map,  // Use the map instance here
      title: 'My location',
    });
  }, []);

  const loadGoogleMapsScript = useCallback(() => {
    const scriptId = 'google-maps-script';

    if (window.google?.maps) {
      initializeMap();
      return;
    }

    if (document.getElementById(scriptId)) {
      // Script is already loading
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.type = 'text/javascript';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
    script.async = true;
    script.defer = true;
    script.onload = initializeMap;
    document.head.appendChild(script);
  }, [apiKey, initializeMap]);

  useEffect(() => {
    if (!apiKey) {
      console.error('Google Maps API key is missing');
      return;
    }

    loadGoogleMapsScript();
  }, [apiKey, loadGoogleMapsScript]);

  return <div style={{ height: '50vh', width: '100%' }} ref={mapRef}></div>;
}

export default MyMap;
