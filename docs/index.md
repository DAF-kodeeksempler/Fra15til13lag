# Ændring af mængden af lag på kortservices
Den xxxx skifter 6 WMTS services på Datafordeleren over til 13 lags zoomdybde, i stedet for 15

Følgende services skifter fra 15 til 13 lag:

* dhm_terraen_skyggekort
* dhm_terraen_overflade
* dhm_historik_hillshade
* topo_skaermkort_wmts
* topo_skaermkort_daempet
* topo_skaermkort_graa

## Hvorfor?
<span style="color:red">Skal vi have det med?</span>

## Hvordan påvirker det mig?
Hvis du har opsat WMTS i din applikation, hvor alle zoomdybder bruges, skal du fjerne de inderste 2 dybder.

## Eksempler
I dette github repository ([https://github.com/DAF-kodeeksempler/Fra15til13lag](https://github.com/DAF-kodeeksempler/Fra15til13lag))
findes eksempler for overleaf og openlayers.

Omskrevede eksempler fra kortforsyningen findes her: ([https://github.com/DAF-kodeeksempler/Demo](https://github.com/DAF-kodeeksempler/Demo))


### Overleaf

<span style="text-decoration: underline">Kodeeksempel</span>

Se følgende [eksempel](/examples/overleaf/example_wms_zoom.html)

### Openlayers

<span style="text-decoration: underline">Kodeeksempel</span>

Se følgende [eksempel](/examples/openlayer/example_wms_zoom.html)
