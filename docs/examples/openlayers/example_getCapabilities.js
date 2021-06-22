(function () {
    // Variables with "GetCap" are for the GetCapabilities map, "Static" for the static one

    // Userinformation from your Datafordeler user
    var dafusername = 'IMFMTAMIDI'
    var dafpassword = 'EnLangKodeTilTest1!'

    var dafusernameTest04 = 'IFRYPUTVND'
    var dafpasswordTest04 = 'EnLangKodeTilTest1!'


    // Set projection as we are not using the default OpenLayers projections
    // You can define it yourself or you can use the proj4 library as done below
    proj4.defs('EPSG:25832', "+proj=utm +zone=32 +ellps=GRS80 +units=m +no_defs");
    ol.proj.proj4.register(proj4);
    var myProjection = ol.proj.get('EPSG:25832');
    var extent = [120000, 5661139.2, 1378291.2, 6500000];
    myProjection.setExtent(extent);

    // Shared view
    var sharedView = new ol.View({
        center: [654500, 6176450], // start center position
        zoom: 9, // start zoom level
        resolutions: [1638.4, 819.2, 409.6, 204.8, 102.4, 51.2, 25.6, 12.8, 6.4, 3.2, 1.6, 0.8, 0.4, 0.2, 0.1, 0.05], // Equal to WMTS resolutions with three more detailed levels
        projection: myProjection // use our custom projection defined earlier
    })

    // All map settings for the GetCap map

    // We define the wmts from the current datafordeler
    var parserGetCap = new ol.format.WMTSCapabilities();
    var wmtsSourceGetCap;
    fetch('https://services.datafordeler.dk/Dkskaermkort/topo_skaermkort_wmts/1.0.0/wmts?username=' + dafusername + '&password=' + dafpassword + '&request=GetCapabilities&service=WMTS')
        .then(function (response) {
            return response.text();
        })
        .then(function (text) {
            var result = parserGetCap.read(text);
            console.log({ 'text': 'prod', 'data': result })

            // Set the attribution (the copyright statement shown in the lower right corner)
            // We do this as we want the same attributions for all layers
            var myAttributionTextGetCap = 'GetCap';

            var options = ol.source.WMTS.optionsFromCapabilities(result, {
                attributions: myAttributionTextGetCap,
                layer: "topo_skaermkort",
                matrixSet: "View1",
                format: "image/jpeg",
                style: 'default',
                size: [256, 256]
            });

            wmtsSourceGetCap = new ol.source.WMTS(options);



            // Skærmkort layer [WMTS:topo_skaermkort]
            var skaermkortGetCap = new ol.layer.Tile({
                opacity: 1.0,
                title: 'Skærmkort - Dynmaic',
                type: 'base',
                visible: true, // by default this layer is visible
                source: wmtsSourceGetCap // start with wmts source
            });


            // Initialize the map
            var mapGetCap = new ol.Map({
                target: 'mapGetCap',
                layers: [
                    new ol.layer.Group({
                        'title': 'Base maps', // This title of the group is shown in the layer switcher
                        layers: [
                            skaermkortGetCap
                        ]
                    })
                ],
                // turn off the default attribution control as we will create a new one later on
                controls: ol.control.defaults({ attribution: false }),
                // Use the shared view
                view: sharedView
            });

            // Add additional controls to map
            mapGetCap.addControl(new ol.control.ScaleLine()); // add a scale line
            mapGetCap.addControl(new ol.control.LayerSwitcher()); // add a layer switcher, notice this one requires an external library
            mapGetCap.addControl(new ol.control.Attribution({ collapsible: false })); // add a custom attribution
        });


    var parserGetCapTest = new ol.format.WMTSCapabilities();
    var wmtsSourceGetCapTest;
    fetch('https://test04-services.datafordeler.dk/Dkskaermkort/topo_skaermkort_wmts/1.0.0/wmts?username=' + dafusernameTest04 + '&password=' + dafpasswordTest04 + '&request=GetCapabilities&service=WMTS')
        .then(function (response) {
            return response.text();
        })
        .then(function (text) {
            var result = parserGetCapTest.read(text);
            console.log({ 'text': 'test04', 'data': result })

            // Set the attribution (the copyright statement shown in the lower right corner)
            // We do this as we want the same attributions for all layers
            var myAttributionTextGetCapTest = 'GetCapTest';


            var options = ol.source.WMTS.optionsFromCapabilities(result, {
                attributions: myAttributionTextGetCapTest,
                layer: "topo_skaermkort",
                matrixSet: "View1",
                format: "image/jpeg",
                style: 'default',
                size: [256, 256]
            });

            wmtsSourceGetCapTest = new ol.source.WMTS(options);


            // Skærmkort layer [WMTS:topo_skaermkort]
            var skaermkortGetCapTest = new ol.layer.Tile({
                opacity: 1.0,
                title: 'Skærmkort - Dynmaic',
                type: 'base',
                visible: true, // by default this layer is visible
                source: wmtsSourceGetCapTest // start with wmts source
            });


            // Initialize the map
            var mapGetCapTest = new ol.Map({
                target: 'mapGetCapTest',
                layers: [
                    new ol.layer.Group({
                        'title': 'Base maps', // This title of the group is shown in the layer switcher
                        layers: [
                            skaermkortGetCapTest
                        ]
                    })
                ],
                // turn off the default attribution control as we will create a new one later on
                controls: ol.control.defaults({ attribution: false }),
                // Use the shared view
                view: sharedView
            });

            // Add additional controls to map
            mapGetCapTest.addControl(new ol.control.ScaleLine()); // add a scale line
            mapGetCapTest.addControl(new ol.control.LayerSwitcher()); // add a layer switcher, notice this one requires an external library
            mapGetCapTest.addControl(new ol.control.Attribution({ collapsible: false })); // add a custom attribution
        });





    // All map settings for the static map

    // Set the WMTS tile grid. We do this on an overall basis as all the
    var tileGridStatic = new ol.tilegrid.WMTS({
        extent: extent,
        resolutions: [1638.4, 819.2, 409.6, 204.8, 102.4, 51.2, 25.6, 12.8, 6.4, 3.2, 1.6, 0.8, 0.4, 0.2, 0.1, 0.05],
        matrixIds: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
    });

    // Set the attribution (the copyright statement shown in the lower right corner)
    // We do this as we want the same attributions for all layers
    var myAttributionTextStatic = 'Static';

    // WMTS source
    var wmtsSourceStatic = new ol.source.WMTS({
        attributions: myAttributionTextStatic,
        url: 'https://services.datafordeler.dk/Dkskaermkort/topo_skaermkort_wmts/1.0.0/wmts?username=' + dafusername + '&password=' + dafpassword,
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
        title: 'Skærmkort - Static',
        type: 'base',
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
