# Ændring af mængden af zoom dybder på WMTS kortservices
Den <span style="color:red">xxxxx</span> skifter 6 WMTS services på Datafordeleren over til 13 zoom dybder, i stedet for 15.

Følgende services skifter fra 15 til 13 zoom dybder:

* dhm_terraen_skyggekort
* dhm_terraen_overflade
* dhm_historik_hillshade
* topo_skaermkort_wmts
* topo_skaermkort_daempet
* topo_skaermkort_graa

## Hvorfor?
<span style="color:red">Skal vi have det med?</span>

De inderste 2 zoom dybder tilføjer ikke mere information, og er opskalerede versioner af zoom dybde 13. De fjernes derfor for at spare diskplads og tid når cachen opdateres.

## Hvordan påvirker det mig?
Hvis du har opsat WMTS i din webgis applikation, hvor alle zoom dybder bruges, skal du fjerne de inderste 2 dybder.

Zoom dybdernes dimensioner: (Læg mærke til 14 og 15, som fjernes)


| TileMatrix | MatrixHeight | MatrixWidth | PixelSize: meter/pixel | Bredde i meter for 256-tile |
| --- | --- | --- | --- | --- |
| 0 (L00) | 2 | 3 | 1.638,4 | 419.430,4 |
| 1 (L01) | 4 | 6 | 819,2 | 209.715,2 |
| 2 (L02) | 8 | 12 | 409,6 | 104.857,6 |
| 3 (L03) | 16 | 24 | 204,8 | 52.428,8 |
| 4 (L04) | 32 | 48 | 102,4 | 26.214,4 |
| 5 (L05) | 64 | 96 | 51,2 | 13.107,2 |
| 6 (L06) | 128 | 192 | 25,6 | 6.553,6 |
| 7 (L07) | 256 | 384 | 12,8 | 3.276,8 |
| 8 (L08) | 512 | 768 | 6,4 | 1.638,4 |
| 9 (L09) | 1.024 | 1.536 | 3,2 | 819,2 |
| 10 (L10) | 2.048 | 3.072 | 1,6 | 409,6 |
| 11 (L11) | 4.096 | 6.144 | 0,8 | 204,8 |
| 12 (L12) | 8.192 | 12.288 | 0,4 | 102,4 |
| 13 (L13) | 16.384 | 24.576 | 0,2 | 51,2 |
| <span style="color:red">14 (L14)</span> | <span style="color:red">32.768</span> | <span style="color:red">49.152</span> | <span style="color:red">0,1</span> | <span style="color:red">25.6</span> |
| <span style="color:red">15 (L15)</span> | <span style="color:red">65.536</span> | <span style="color:red">98.304</span> | <span style="color:red">0,05</span> | <span style="color:red">12.8</span> |

## Løsningsmuligheder
Skift til WMS services ved de inderste zoom dybder.

I dette github repository ([https://github.com/DAF-kodeeksempler/Fra15til13lag](https://github.com/DAF-kodeeksempler/Fra15til13lag))
findes eksempler for Leaflet og Openlayers, der viser hvordan de inderste zoom dybder kan udskiftes med WMS services, i stedet for WMTS.

<span style="text-decoration: underline">Leaflet Kodeeksempel</span>: [eksempel](/examples/leaflet/example_wms_zoom.html)

<span style="text-decoration: underline">Openlayers Kodeeksempel</span>: [eksempel](/examples/openlayers/example_wms_zoom.html)

Ekstra omskrevne eksempler fra kortforsyningen til Datafordeler findes her: ([https://github.com/DAF-kodeeksempler/Demo](https://github.com/DAF-kodeeksempler/Demo))