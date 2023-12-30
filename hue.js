/* Hue Local
 * A simple node.js command line application for controlling Hue lights over a local network 
 * Copyright 2019 - Michael Hamilton
 */

const hue = require('node-hue-api');
const readline = require('readline');
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// Press the Hue Bridge pairing button before executing
(async () => {

	// Searches for a Hue Bridge using upnp
	const bridge = await hue.nupnpSearch();
	const host = bridge[0].ipaddress;
	console.log(`Bridge: ${JSON.stringify(bridge)}`);
	
	let api = new hue.HueApi();

	const username = await api.registerUser(bridge[0].ipaddress, 'HUE TEST');
	console.log(`Username: ${username}`);

	// Establish a connection with the Hue Bridge using host/username 
	api = new hue.HueApi(host, username);

	// Create a list of IDs from lights connected to the Hue Bridge
	const lights = await api.lights();
	const lightIDs = lights.lights.map(light => light.id);

	// Sets a light state for all lights
	const setAllLights = state => lightIDs.forEach( id => api.setLightState(id, state) );

	// Sets a light state for a single light
	const setSingleLight = (id, state) => api.setLightState(id, state);

	console.log('Press number keys to turn individual lights on, and space to turn them all off.\nWaiting for input...');

	// Waits for a keypress and handles execution accordingly.  Number keys turn individual lights on, space turns them all off.
	process.stdin.on('keypress', (str, key) => {
		if(key.ctrl && key.name === 'c') {
			console.log('Exit');
			process.exit();
		}
		else if (key.name === 'space') {
			console.log(`Turn all lights off`);
			setAllLights(hue.lightState.create().off().white(500, 100));
		}

		lightIDs.forEach(id => {
			if (key.name === id) {
				console.log(`Turn light ${id} on`);
				setSingleLight(id, hue.lightState.create().on().white(500, 100));
			}
		})
	});
})();
