
### Getting Started

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
