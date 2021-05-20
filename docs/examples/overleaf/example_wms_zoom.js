(function() {

    // Userinformation from your Datafordeler user
    var dafusername = 'IMFMTAMIDI'
    var dafpassword = 'EnLangKodeTilTest1!'

    var myAttributionTextDynamic = 'Dynamic';
    var myAttributionTextStatic = 'Static';

    // Make the map object using the custom projection
    //proj4.defs('EPSG:25832', "+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs");
    var crs = new L.Proj.CRS('EPSG:25832',
	'+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs', {
        resolutions: [1638.4,819.2,409.6,204.8,102.4,51.2,25.6,12.8,6.4,3.2,1.6,0.8,0.4,0.2,0.1,0.05],
        origin: [120000,6500000],
        bounds: L.bounds([120000, 5661139.2],[1378291.2, 6500000])
    });


    // Make the map object using the custom projection
    var mapDynamic = new L.Map('mapDynamic', {
        crs: crs,
        continuousWorld: true,
        center: [55.709155, 11.459081], // Set center location
        zoom: 9, // Set zoom level
        minzoom: 0,
        maxzoom: 15
    });

    var mapStatic = new L.Map('mapStatic', {
        crs: crs,
        continuousWorld: true,
        center: [55.709155, 11.459081], // Set center location
        zoom: 9, // Set zoom level
        minzoom: 0,
        maxzoom: 15
    });

    var wmtsDynamic = L.tileLayer('https://services.datafordeler.dk/Dkskaermkort/topo_skaermkort_wmts/1.0.0/wmts?username='+ dafusername + '&password=' + dafpassword + '&request=GetTile&version=1.0.0&service=WMTS&Layer=topo_skaermkort&style=default&format=image/jpeg&TileMatrixSet=View1&TileMatrix={zoom}&TileRow={y}&TileCol={x}', {
        attribution: myAttributionTextDynamic,
        crossOrigin: true,
        zoom: function (data) {
            var zoomlevel = data.z;
            return zoomlevel
        }
    }).addTo(mapDynamic);

    var wmtsStatic = L.tileLayer('https://services.datafordeler.dk/Dkskaermkort/topo_skaermkort_wmts/1.0.0/wmts?username='+ dafusername + '&password=' + dafpassword + '&request=GetTile&version=1.0.0&service=WMTS&Layer=topo_skaermkort&style=default&format=image/jpeg&TileMatrixSet=View1&TileMatrix={zoom}&TileRow={y}&TileCol={x}', {
	    attribution: myAttributionTextStatic,
        crossOrigin: true,
        zoom: function (data) {
            var zoomlevel = data.z;
            return zoomlevel
        }
    }).addTo(mapStatic);

    // Define the wms service
    var wmsDynamic = L.tileLayer.wms('https://services.datafordeler.dk/Dkskaermkort/topo_skaermkort/1.0.0/wms?username='+ dafusername + '&password=' + dafpassword , {
        layers: 'dtk_skaermkort',
        transparent: 'FALSE',
        format: 'image/png',
        attribution: myAttributionTextDynamic
    });

    // Define layer groups for layer control
    var baseLayersDynamic = {
        "Skærmkort - Dynamic": wmtsDynamic
    };

    var baseLayersStatic = {
        "Skærmkort - Static": wmtsStatic
    };


    // Add layer control to map
    L.control.layers(baseLayersDynamic).addTo(mapDynamic);
    L.control.layers(baseLayersStatic).addTo(mapStatic);


    // Switch to WMS in zoomlevel > 13
    mapDynamic.on('zoomend', function () {
        if (mapDynamic.getZoom() > 13) {
            if (mapDynamic.hasLayer(wmtsDynamic)) {
                mapDynamic.removeLayer(wmtsDynamic);
            }
            if (!mapDynamic.hasLayer(wmsDynamic)) {
                mapDynamic.addLayer(wmsDynamic);
            }
        } else {
            if (mapDynamic.hasLayer(wmsDynamic)) {
                mapDynamic.removeLayer(wmsDynamic);
            }
            if (!mapDynamic.hasLayer(wmtsDynamic)) {
                mapDynamic.addLayer(wmtsDynamic);
            }
        }
    });

    // Add scale line to map
    L.control.scale({imperial: false}).addTo(mapDynamic); // disable feet units
    L.control.scale({imperial: false}).addTo(mapStatic); // disable feet units

    // Sync the maps
    mapDynamic.sync(mapStatic);
    mapStatic.sync(mapDynamic);

})();