## Example App

This project is an example application for use with MeldCX AgentM, the application demonstates the use of the Newland FM30 barcode scanner with AgentM.

![Screenshot](https://raw.githubusercontent.com/MeldCX/peripheral-newland-fm30-example-app/master/screen_shot.png)

## Getting Started with Newland FM30 in AgentM

### Configuring your Newland FM30 Scanner

You will need to put your Newland FM30 Barcode Scanner into `USB CDC` mode, to do this follow the below instructions:

1. Enter Setup by scanning the `Enter Setup` Barcode below:

![Enter Setup](https://raw.githubusercontent.com/MeldCX/peripheral-newland-fm30-example-app/master/barcode_enter_setup.png)

2. Configure USB CDC mode by scanning the `USB CDC` Barcode below:

![USB CDC Mode](https://raw.githubusercontent.com/MeldCX/peripheral-newland-fm30-example-app/master/barcode_usb_cdc.png)

3. Exit Setup Mode by scanning the `Exit Setup` Barcode below:

![Exit Setup](https://raw.githubusercontent.com/MeldCX/peripheral-newland-fm30-example-app/master/barcode_exit_setup.png)

### Code Dependancies
To use the newland scanner in conjuntion with MeldCX agentM you will need to include the MeldCX AgentM Library, instructions using this can be found here: [https://docs.meld.cx/](https://docs.meld.cx/)

The MeldCX Agent will manage the connection and disconnection of the Barcode Scanner.

Example checking if Newland Scanner is connected:

```javascript
// Inside an async function
await agent.onReadyAsync();

if (!agent.Peripherals) throw new Error('No Peripherals Found');
if (!agent.Peripherals.BarcodeScanner) throw new Error('No Barcode Scanner Found');
if (!agent.Peripherals.BarcodeScanner.Newland) throw new Error('No Newland Scanners found');
if (!agent.Peripherals.BarcodeScanner.Newland.FM30) throw new Error('No Newland FM30 Scanner found');

const {FM30} = agent.Peripherals.BarcodeScanner.Newland;

// The FM30 gives you access and control of the barcode scanner.
```

In order for the scanner to scan successfully you will need to turn on the laser then wait for the barcode to be scanned, once the barcode is scanned you can turn of the laser.

Example of enabling laser, waiting for barcode and switching laser off:

```javascript
...

const waitForBarcode = async() => {
    await FM30.illuminationOn();

    const barcode = await FM30.getBarcode();

    await FM30.illuminationOff();

    return barcode;
}

try {
    const barcode = await waitForBarcode();
    console.log(`Received barcode: ${barcode}`);
} catch (ex) {
    console.error('Failed to receive barcode');
    console.error(ex);
}
```

Optionally you can pass in the amount of time in seconds to wait for a barcode before timing out:

```javascript
...

// Wait 30 seconds before timing out and throwing an error.
const barcode = await FM30.getBarcode(30);

```

