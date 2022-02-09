mapboxgl.accessToken = 'pk.eyJ1IjoibmNvbHN0YWQ0NCIsImEiOiJja3o0dDdqZm0wangyMnN0dnNjMzkxM2JzIn0.o_7QXjC324wVhJbf-X68eQ'

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: [-71.104,42.365],
    zoom: 14
});

async function run(){
	const locations = await getBusLocations();
	console.log(new Date());
	console.log(locations);
	update(locations);
	//timer
	setTimeout(run, 15000);
};

async function getBusLocations(){
    currentMarkers.forEach((oneMarker) => oneMarker.remove())
    currentMarkers = [];
	const url = 'https://api-v3.mbta.com/vehicles?filter[route]=1&include=trip';
	const response = await fetch(url);
	const json = await response.json();
	return json.data;
}
var currentMarkers = [];

async function update(){
    const locations = await getBusLocations();
   

     for (let i=0; i<locations.length; i++){
        const long = locations[i].attributes.longitude;
        const lat = locations[i].attributes.latitude;
        console.log(long, lat);
        locations.forEach(element => {

            const el = document.createElement('div');
            el.className = 'marker';
           
            new mapboxgl.Marker(el)
                .setLngLat([long, lat])
                .addTo(map);
                currentMarkers.push(el)
        });
    }

    const MIT = document.createElement('div');
    MIT.className = 'mitCampus';
    new mapboxgl.Marker(MIT)
    .setLngLat([-71.0942, 42.3601])
    .addTo(map);

    const HU = document.createElement('div');
    HU.className = 'harvard';
    new mapboxgl.Marker(HU)
    .setLngLat([-71.1167, 42.3770])
    .addTo(map);

    const BU = document.createElement('div');
    BU.className = 'BUCampus'
    new mapboxgl.Marker(BU)
    .setLngLat([-71.0984, 42.3495])
    .addTo(map);
}
run();
