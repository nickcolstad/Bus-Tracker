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
            var oneMarker = new mapboxgl.Marker()
            .setLngLat([long, lat])
            .addTo(map);
            currentMarkers.push(oneMarker)
        });
        

}
}
run();
