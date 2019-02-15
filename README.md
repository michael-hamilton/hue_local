# Hue Local
A simple node.js command line application for controlling Hue lights on a local network.

## Usage
Uses upnp to find a local Hue Bridge and establish a connection (therefore your network must support upnp for this to work).  Before executing the script, press the button on the Hue Bridge you want to control.  After pressing the button, start the appliction with `npm start` (or `node hue.js`). Presently supports on/off control of up to 9 bulbs (currently only tested with Hue A19 Color bulbs).  Pressing a number key will turn the bulb with the corresponding ID on, and pressing space will turn all lights off. `ctrl + c` will exit the application.
