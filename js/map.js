
const maps = {
    "id": "7777649",
    "arbetsplatsId": "0",
    "organisationsnummer": "5568146327",
    "logotyp": null,
    "publiceringsdatum": 1529423995000,
    "sistaAnsokningsdatum": 1530568799000,
    "rubrik": "Pusselfantast sökes (=Personalkoordinator)",
    "yrkesroll": {
      "id": "2284",
      "namn": "Butikssäljare / Medarbetare, dagligvaror"
    },
    "erbjudenArbetsplats": {
      "land": {
        "id": "199",
        "namn": "Sverige"
      },
      "lan": {
        "id": "01",
        "namn": "Stockholms län"
      },
      "kommun": {
        "id": "0180",
        "namn": "Stockholm"
      },
      "geoPosition": {
        "id": null,
        "namn": null,
        "distans": null,
        "longitud": 18.053808021,
        "latitud": 59.287330948,
        "gatuadress": null
      }
    },
    "arbetsgivarenamn": "Plockbolaget i Sverige AB",
    "postadressArbetsplatsNamn": "Plockbolaget",
    "kalla": "VIA_PLATSBANKEN_DXA",
    "erbjudenArbetsplatsNamn": null,
    "arbetsomfattning": {
      "max": 100,
      "min": 100
    },
    "anstallningstyp": {
      "id": "1",
      "namn": "Vanlig anställning"
    },
    "varaktighet": {
      "id": "2",
      "namn": "6 månader eller längre"
    },
    "matchningsresultat": {
      "combinedScore": 100,
      "otherScore": 100,
      "erbjudande": [
        {
          "varde": "180",
          "score": 100,
          "totalScore": 100,
          "typ": "ARBETSPLATS_KOMMUN",
          "erbjudet": "Stockholm",
          "efterfragat": "Stockholm",
          "efterfragatKravniva": null,
          "niva": {
            "varde": null,
            "score": null,
            "typ": null,
            "erbjudet": null,
            "efterfragat": null
          }
        }
      ],
      "efterfragat": []
    }
  }
          


var map;
  function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 59.3293, lng: 18.0686},
      zoom: 9,
      styles: [
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e9e9e9"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f5f5"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 17
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 29
                },
                {
                    "weight": 0.2
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 18
                }
            ]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f5f5"
                },
                {
                    "lightness": 21
                }
            ]
        },
        {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dedede"
                },
                {
                    "lightness": 21
                }
            ]
        },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "visibility": "on"
                },
                {
                    "color": "#ffffff"
                },
                {
                    "lightness": 16
                }
            ]
        },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "saturation": 36
                },
                {
                    "color": "#333333"
                },
                {
                    "lightness": 40
                }
            ]
        },
        {
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f2f2f2"
                },
                {
                    "lightness": 19
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#fefefe"
                },
                {
                    "lightness": 20
                }
            ]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#fefefe"
                },
                {
                    "lightness": 17
                },
                {
                    "weight": 1.2
                }
            ]
        }
    ]
    });

  }

  function showMapWithJobs(jobs) {
    for (const item of jobs) {
        var image = 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png';
        var marker = new google.maps.Marker({
        position: {lat: item.erbjudenArbetsplats.geoPosition.latitud, lng: item.erbjudenArbetsplats.geoPosition.longitud},
            map: map,
            icon: image
        });

        var infoWindow = new google.maps.InfoWindow({
            content: item.yrkesroll.namn
        });
        //infowindow.open(map,marker)
        map.setZoom(11.5);

        google.maps.event.addListener(marker, 'click', (function(infoWindow, marker) {
            return function() {
                infoWindow.open(map,marker);
            }
        })(infoWindow, marker));

    }
}    
