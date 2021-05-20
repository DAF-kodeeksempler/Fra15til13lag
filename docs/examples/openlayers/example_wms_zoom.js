(function() {
    // Variables with "Dynamic" are for the dynamic map, "Static" for the static one

    // Userinformation from your Datafordeler user
    var dafusername = 'IMFMTAMIDI'
    var dafpassword = 'EnLangKodeTilTest1!'

    // Set projection as we are not using the default OpenLayers projections
    // You can define it yourself or you can use the proj4 library as done below
    proj4.defs('EPSG:25832', "+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs");
    ol.proj.proj4.register(proj4);
    var myProjection = ol.proj.get('EPSG:25832');
    var extent = [120000, 5661139.2, 1378291.2, 6500000];
    myProjection.setExtent(extent);

    // All map settings for the dynamic map

    // Set the WMTS tile grid. We do this on an overall basis as all the
    var tileGridDynamic = new ol.tilegrid.WMTS({
        extent: extent,
        resolutions: [1638.4,819.2,409.6,204.8,102.4,51.2,25.6,12.8,6.4,3.2,1.6,0.8,0.4,0.2],
        matrixIds: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13'],
    });

    // Set the attribution (the copyright statement shown in the lower right corner)
    // We do this as we want the same attributions for all layers
    var myAttributionTextDynamic = 'Dynamic';

    // WMS source
    var wmsSourceDynamic = new ol.source.TileWMS({
        attributions: myAttributionTextDynamic,
        url: 'https://services.datafordeler.dk/Dkskaermkort/topo_skaermkort/1.0.0/wms?username='+ dafusername + '&password=' + dafpassword,
        params:{
            'LAYERS':'dtk_skaermkort',
            'VERSION':'1.1.1',
            'TRANSPARENT':'FALSE',
            'FORMAT': "image/png",
            'STYLES':''
        }
    });

    // WMTS source
    var wmtsSourceDynamic = new ol.source.WMTS({
        attributions: myAttributionTextDynamic,
        url: 'https://services.datafordeler.dk/Dkskaermkort/topo_skaermkort_wmts/1.0.0/wmts?username='+ dafusername + '&password=' + dafpassword,
        layer: "topo_skaermkort",
        matrixSet: "View1",
        format: "image/jpeg",
        tileGrid: tileGridDynamic,
        style: 'default',
        size: [256, 256]
    });

    // Skærmkort layer [WMTS:topo_skaermkort]
    var skaermkortDynamic = new ol.layer.Tile({
        opacity: 1.0,
        title:'Skærmkort - Dynmaic',
        type:'base',
        visible: true, // by default this layer is visible
        source: wmtsSourceDynamic // start with wmts source
    });

    // Shared view
    var sharedView = new ol.View({
        center: [654500, 6176450], // start center position
        zoom: 9, // start zoom level
        resolutions: [1638.4,819.2,409.6,204.8,102.4,51.2,25.6,12.8,6.4,3.2,1.6,0.8,0.4,0.2,0.1,0.05], // Equal to WMTS resolutions with three more detailed levels
        projection: myProjection // use our custom projection defined earlier
    })

    // Initialize the map
    var mapDynamic = new ol.Map({
        target: 'mapDynamic',
        layers: [
            new ol.layer.Group({
                'title': 'Base maps', // This title of the group is shown in the layer switcher
                layers: [
                    skaermkortDynamic
                ]
            })
        ],
        // turn off the default attribution control as we will create a new one later on
        controls: ol.control.defaults({ attribution: false }),
        // make the view
        view: sharedView
    });

    // switch to WMS when zoom level is greater than 13.
    mapDynamic.on('moveend', function (e) {
        if (e.map.getView().getZoom() > 13) {
            skaermkortDynamic.setSource(wmsSourceDynamic);
        } else {
            skaermkortDynamic.setSource(wmtsSourceDynamic);
        }
    });

    // Add additional controls to map
    mapDynamic.addControl(new ol.control.ScaleLine()); // add a scale line
    mapDynamic.addControl(new ol.control.LayerSwitcher()); // add a layer switcher, notice this one requires an external library
    mapDynamic.addControl(new ol.control.Attribution({ collapsible: false })); // add a custom attribution





    // All map settings for the static map

    // Set the WMTS tile grid. We do this on an overall basis as all the
    var tileGridStatic = new ol.tilegrid.WMTS({
        extent: extent,
        resolutions: [1638.4,819.2,409.6,204.8,102.4,51.2,25.6,12.8,6.4,3.2,1.6,0.8,0.4,0.2,0.1,0.05],
        matrixIds: ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'],
    });

    // Set the attribution (the copyright statement shown in the lower right corner)
    // We do this as we want the same attributions for all layers
    var myAttributionTextStatic = 'Static';

    // WMTS source
    var wmtsSourceStatic = new ol.source.WMTS({
        attributions: myAttributionTextStatic,
        url: 'https://services.datafordeler.dk/Dkskaermkort/topo_skaermkort_wmts/1.0.0/wmts?username='+ dafusername + '&password=' + dafpassword,
        layer: "topo_skaermkort",
        matrixSet: "View1",
        format: "image/jpeg",
        tileGrid: tileGridStatic,
        style: 'default',
        size: [256, 256]
    });

    // Skærmkort layer [WMTS:topo_skaermkort]
    var skaermkortStatic = new ol.layer.Tile({
        opacity: 1.0,
        title:'Skærmkort - Static',
        type:'base',
        visible: true, // by default this layer is visible
        source: wmtsSourceStatic // start with wmts source
    });

    // Initialize the map
    var mapStatic = new ol.Map({
        target: 'mapStatic',
        layers: [
            new ol.layer.Group({
                'title': 'Base maps', // This title of the group is shown in the layer switcher
                layers: [
                    skaermkortStatic
                ]
            })
        ],
        // turn off the default attribution control as we will create a new one later on
        controls: ol.control.defaults({ attribution: false }),
        // make the view
        view: sharedView
    });


    // Add additional controls to map
    mapStatic.addControl(new ol.control.ScaleLine()); // add a scale line
    mapStatic.addControl(new ol.control.LayerSwitcher()); // add a layer switcher, notice this one requires an external library
    mapStatic.addControl(new ol.control.Attribution({ collapsible: false })); // add a custom attribution
})();
