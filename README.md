# F1 2021 UDP Telemetry Client



The F1 series of games support the outputting of key game data via a UDP data stream. This data can be interpreted by external apps or connected peripherals for a range of different uses, including providing additional telemetry information, customised HUD displays, motion platform hardware support or providing force feedback data for custom steering wheels.

This is a TypeScript UDP client and telemetry parser for Codemaster's F1 2021 game that enables the consumption of such information.

## Installing

```
$ npm install f1-2021-udp
```

or

```
$ yarn add f1-2021-udp
```

## Running the playground

```
$ npm run start
```

or

```
$ yarn start
```

## Usage

```
import { F1TelemetryClient, constants } from "f1-telemetry-client";
// or: const { F1TelemetryClient, constants } = require('f1-telemetry-client');
const { PACKETS } = constants;

/*
*   'port' is optional, defaults to 20777
*   'bigintEnabled' is optional, setting it to false makes the parser skip bigint values,
*                   defaults to true
*   'forwardAddresses' is optional, it's an array of Address objects to forward unparsed telemetry to. each address object is comprised of a port and an optional ip address
*                   defaults to undefined
*   'skipParsing' is optional, setting it to true will make the client not parse and emit content. You can consume telemetry data using forwardAddresses instead.
*                   defaults to false
*/
const client = new F1TelemetryClient({ port: 20777 });
client.on(PACKETS.event, console.log);
client.on(PACKETS.motion, console.log);
client.on(PACKETS.carSetups, console.log);
client.on(PACKETS.lapData, console.log);
client.on(PACKETS.session, console.log);
client.on(PACKETS.participants, console.log);
client.on(PACKETS.carTelemetry, console.log);
client.on(PACKETS.carStatus, console.log);
client.on(PACKETS.finalClassification, console.log);
client.on(PACKETS.lobbyInfo, console.log);
client.on(PACKETS.history, console.log);
client.on(PACKETS.carDamage, console.log);


// to start listening:
client.start();

// and when you want to stop:
client.stop();
```

## Documentation

The following links contain information that summarises the UDP data structures so that developers of supporting hardware or software are able to configure these to work correctly with the F1 game.

[F1 2021 UDP Spec](https://forums.codemasters.com/topic/80231-f1-2021-udp-specification/)  

## License

This project is originally a fork of [f1-telemetry-client](https://github.com/racehub-io/f1-telemetry-client).  
Licensed under the MIT License.
