* TOC
{:toc}

# Hvad ændres?
6 WMTS services på Datafordeleren skifter over til 13 zoom niveauer, i stedet for 15.

Ændringen sker under release 31, den 31 august.

Du kan teste ændringen på test04. Se mere under sektionen "Hvor kan jeg teste det?"

Følg med på [Datafordeler nyheder](https://datafordeler.dk/artikler/nyheder/) eller [Datafordeler releases](https://datafordeler.dk/drift/releases) for opdateringer.

Følgende services skifter fra 15 til 13 zoom niveauer:

* dhm_terraen_skyggekort
* dhm_terraen_overflade
* dhm_historik_hillshade
* topo_skaermkort_wmts
* topo_skaermkort_daempet
* topo_skaermkort_graa

# Hvorfor?
De inderste 2 zoom niveauer tilføjer ikke mere information og er opskalerede versioner af zoom niveau 13. De bliver fjernet for at spare diskplads og tid, når cachen bliver opdateret.

# Hvordan påvirker det mig?
Brugere af standalone gis applikationer som ArcGis, QGis eller lign. bliver ikke påvirket af ændringen, og kan bruge services som normalt.

Hvis du har opsat din webgis applikation til automatisk at tage zoom niveau information fra GetCapability kaldet, bliver du ikke påvirket af ændringen.

Hvis du har opsat din webgis applikation, hvor alle zoom niveauer bliver brugt, skal du fjerne de inderste 2 niveauer.

Bemærk at du kan bruge WMS som supplement for zoom niveau 14 og 15. Se hvordan under "Eksempler" længere nede.

Bemærk også, at tjenester fra Kortforsyningen bruger 13 zoom niveauer.

Zoom niveauernes dimensioner: (Læg mærke til 14 og 15, som bliver fjernet)

| TileMatrix | MatrixHeight | MatrixWidth | PixelSize: meter/pixel | Bredde i meter for 256-tile |
| --- | --- | --- | --- | --- |
| 0 | 2 | 3 | 1.638,4 | 419.430,4 |
| 1 | 4 | 6 | 819,2 | 209.715,2 |
| 2 | 8 | 12 | 409,6 | 104.857,6 |
| 3 | 16 | 24 | 204,8 | 52.428,8 |
| 4 | 32 | 48 | 102,4 | 26.214,4 |
| 5 | 64 | 96 | 51,2 | 13.107,2 |
| 6 | 128 | 192 | 25,6 | 6.553,6 |
| 7 | 256 | 384 | 12,8 | 3.276,8 |
| 8 | 512 | 768 | 6,4 | 1.638,4 |
| 9 | 1.024 | 1.536 | 3,2 | 819,2 |
| 10 | 2.048 | 3.072 | 1,6 | 409,6 |
| 11 | 4.096 | 6.144 | 0,8 | 204,8 |
| 12 | 8.192 | 12.288 | 0,4 | 102,4 |
| 13 | 16.384 | 24.576 | 0,2 | 51,2 |
| <span style="color:red">14</span> | <span style="color:red">32.768</span> | <span style="color:red">49.152</span> | <span style="color:red">0,1</span> | <span style="color:red">25,6</span> |
| <span style="color:red">15</span> | <span style="color:red">65.536</span> | <span style="color:red">98.304</span> | <span style="color:red">0,05</span> | <span style="color:red">12,8</span> |

# Hvor kan jeg teste det?
Ændringerne er implementeret på Datafordelerens test04 miljø.

Du kan for eksempel tilgå topo_skaermkort_wmts via:
```
https://test04-services.datafordeler.dk/DKskaermkort/topo_skaermkort_wmts/1.0.0/WMTS
```
Husk at opret en webbruger og tjenstebruger med password på test04 test04-selfservice.datafordeler.dk

# Eksempler

## Jeg vil gerne bruge WMS services som udskiftning for de inderste 2 lag
Skift til WMS services ved de inderste zoom niveauer.

I dette github repository ([https://github.com/DAF-kodeeksempler/Fra15til13zoom](https://github.com/DAF-kodeeksempler/Fra15til13zoom))
finder du eksempler for Leaflet og Openlayers, der viser hvordan de inderste zoom niveauer kan udskiftes med WMS services i stedet for WMTS.

### Leaflet eksempel
<span style="text-decoration: underline">Leaflet Kodeeksempel</span>: [eksempel](/examples/leaflet/example_wms_zoom.html)

### Openlayers eksempel
<span style="text-decoration: underline">Openlayers Kodeeksempel</span>: [eksempel](/examples/openlayers/example_wms_zoom.html)

## Jeg vil gerne automatisk finde zoom niveauer ud fra GetCapability kald

### Openlayers eksempel
<span style="text-decoration: underline">Openlayers Kodeeksempel</span>: [eksempel](/examples/openlayers/example_getCapabilities.html)