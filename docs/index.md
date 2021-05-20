# Ændring af mængden af lag på kortservices
Den <span style="color:red">xxxxx</span> skifter 6 WMTS services på Datafordeleren over til 13 lags zoomdybde, i stedet for 15

Følgende services skifter fra 15 til 13 lag:

* dhm_terraen_skyggekort
* dhm_terraen_overflade
* dhm_historik_hillshade
* topo_skaermkort_wmts
* topo_skaermkort_daempet
* topo_skaermkort_graa

## Hvorfor?
<span style="color:red">Skal vi have det med?</span>

De inderste 2 lag tilføjer ikke mere information, og er opskalerede versioner af lag 13. De fjernes derfor for at spare diskplads og tid når cachen opdateres.

## Hvordan påvirker det mig?
Hvis du har opsat WMTS i din applikation, hvor alle zoomdybder bruges, skal du fjerne de inderste 2 dybder.

Lagenes dimensioner: (Lig mærke til 14 og 15, som fjernes)


| TileMatrix | MatrixHeight | MatrixWidth | PixelSize: meter/pixel | Bredde i meter for 256-tile |
| --- | --- | --- | --- | --- |
| 0 (L00) | 2 | 3 | 1.638,4 | 419.430,4 |
| 1 (L01) | 4 | 6 | 819,20 | 209.715,2 |
| 2 (L02) | 8 | 12 | 409,60 | 104.857,6 |
| 3 (L03) | 16 | 24 | 204,80 | 52.428,8 |
| 4 (L04) | 32 | 48 | 102,40 | 26.214,4 |
| 5 (L05) | 64 | 96 | 51,20 | 13.107,2 |
| 6 (L06) | 128 | 192 | 25,60 | 6.553,6 |
| 7 (L07) | 256 | 384 | 12,80 | 3.276,8 |
| 8 (L08) | 512 | 768 | 6,40 | 1.638,4 |
| 9 (L09) | 1.024 | 1.536 | 3,20 | 819,2 |
| 10 (L10) | 2.048 | 3.072 | 1,60 | 409,6 |
| 11 (L11) | 4.096 | 6.144 | 0,80 | 204,8 |
| 12 (L12) | 8.192 | 12.288 | 0,4 | 102,4 |
| 13 (L13) | 16.384 | 24.576 | 0,2 | 51,2 |
| <span style="color:red">14 (L14)</span> | 32.768 | 49.152 | 0,1 | 25.6 |
| <span style="color:red">15 (L15)</span> | 65.536 | 98.304 | 0,05 | 12.8 |

## Eksempler
I dette github repository ([https://github.com/DAF-kodeeksempler/Fra15til13lag](https://github.com/DAF-kodeeksempler/Fra15til13lag))
findes eksempler for overleaf og openlayers.

I de følgende eksempler vises hvordan det inderste zoomlag kan udskiftes med WMS services, i stedet for WMTS.

Ekstra omskrevne eksempler fra kortforsyningen til Datafordeler findes her: ([https://github.com/DAF-kodeeksempler/Demo](https://github.com/DAF-kodeeksempler/Demo))


### Overleaf


<span style="text-decoration: underline">Kodeeksempel</span>: [eksempel](/examples/overleaf/example_wms_zoom.html)

### Openlayers

<span style="text-decoration: underline">Kodeeksempel</span>: [eksempel](/examples/openlayers/example_wms_zoom.html)

