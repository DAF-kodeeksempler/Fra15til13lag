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
