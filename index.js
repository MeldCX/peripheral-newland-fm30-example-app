/** ELEMENTS */

/** Error Text */
const txtErrorText = document.querySelector('.error-text');

/** Barcode */
const txtBarcodeValue = document.querySelector('.barcode-value');
const txtBarcodeListener = document.querySelector('.barcode-listener-value');
const btnBarcodeGet = document.querySelector('.barcode-get');

/** Product Info */
const txtProductName = document.querySelector('.product-name-value');
const btnProductName = document.querySelector('.product-name-get');

const txtFirmwareVersion = document.querySelector('.firmware-version-value');
const btnFirmwareVersion = document.querySelector('.firmware-version-get');

const txtDecoderVersion = document.querySelector('.decoder-version-value');
const btnDecoderVersion = document.querySelector('.decoder-version-get');

const txtHardwareVersion = document.querySelector('.hardware-version-value');
const btnHardwareVersion = document.querySelector('.hardware-version-get');

const txtSerialNumber = document.querySelector('.serial-number-value');
const btnSerialNumber = document.querySelector('.serial-number-get');

const txtOEMSerialNumber = document.querySelector('.oem-serial-number-value');
const btnOEMSerialNumber = document.querySelector('.oem-serial-number-get');

const txtManufactureDate = document.querySelector('.manufacture-date-value');
const btnManufactureDate = document.querySelector('.manufacture-date-get');

/** Illumination */
const txtIllumination = document.querySelector('.illumination-value');
const btnIlluminationGet = document.querySelector('.illumination-get');
const lstIllumination = document.querySelector('.illumination-select-value');
const btnIlluminationSet = document.querySelector('.illumination-select-set');

/** Good Read Beep */
const txtGoodReadBeepStatus = document.querySelector('.good-read-beep-value');
const btnGoodReadBeepGet = document.querySelector('.good-read-beep-get');
const lstGoodReadBeep = document.querySelector('.good-read-beep-select');
const btnGoodReadBeepSet = document.querySelector('.good-read-beep-set');

/** Good Read Beep - Volume */
const txtGoodReadBeepVolume = document.querySelector('.good-read-beep-volume-value');
const btnGoodReadBeepVolumeGet = document.querySelector('.good-read-beep-volume-get');
const lstGoodReadBeepVolume = document.querySelector('.good-read-beep-volume-select');
const btnGoodReadBeepVolumeSet = document.querySelector('.good-read-beep-volume-set');

/** Good Read Beep - Duration */
const txtGoodReadBeepDuration = document.querySelector('.good-read-beep-duration-value');
const btnGoodReadBeepDurationGet = document.querySelector('.good-read-beep-duration-get');
const lstGoodReadBeepDuration = document.querySelector('.good-read-beep-duration-select');
const btnGoodReadBeepDurationSet = document.querySelector('.good-read-beep-duration-set');

/** Good Read Beep - Frequency */
const txtGoodReadBeepFrequency = document.querySelector('.good-read-beep-frequency-value');
const btnGoodReadBeepFrequencyGet = document.querySelector('.good-read-beep-duration-get');
const lstGoodReadBeepFrequency = document.querySelector('.good-read-beep-frequency-select');
const btnGoodReadBeepFrequencySet = document.querySelector('.good-read-beep-frequency-set');

/** Power On Beep */
const txtPowerOnBeep = document.querySelector('.power-on-beep-value');
const btnPowerOnBeepGet = document.querySelector('.power-on-beep-get');
const lstPowerOnBeep = document.querySelector('.power-on-beep-select');
const btnPowerOnBeepSet = document.querySelector('.power-on-beep-set')

/** Global Vars */
const {Agent} = window;
let FM30 = null;
let taskRunning = false;

const errorMessage = msg => txtErrorText.textContent = msg;

const init = async() => {
    await Agent.onReadyAsync();

    if (!Agent.Peripherals) return errorMessage('No Peripherals Found');
    if (!Agent.Peripherals.BarcodeScanner) return errorMessage('No Barcode Scanners Found');
    if (!Agent.Peripherals.BarcodeScanner.Newland) return errorMessage('No Newland Barcode Scanners Found');
    if (!Agent.Peripherals.BarcodeScanner.Newland.FM30) return errorMessage('No FM30 Barcode Scanner Found');

    ({FM30} = Agent.Peripherals.BarcodeScanner.Newland);

    FM30.onBarcode(b => txtBarcodeListener.value = b);
}

/** Product Information */

const getBarcode = async() => {
    if (taskRunning) return;
    try {
        taskRunning = true;
        txtBarcodeValue.value = '';
        const barcode = await FM30.getBarcode();
        txtBarcodeValue.value = barcode;
    } catch (ex) {
        errorMessage(ex.toString());
    }
    taskRunning = false;
}

const getProductName = async() => {
    if (taskRunning) return;
    try {
        taskRunning = true;
        const productName = await FM30.productName();
        txtProductName.textContent = productName.split(':')[1];
    } catch(ex) {
        errorMessage(ex.toString());
    }
    taskRunning = false;
}

const getFirmwareVersion = async() => {
    if (taskRunning) return;
    try {
        taskRunning = true;
        const firmwareVersion = await FM30.firmwareVersion();
        txtFirmwareVersion.textContent = firmwareVersion.split(':')[1];
    } catch(ex) {
        errorMessage(ex.toString());
    }
    taskRunning = false;
}

const getDecoderVersion = async() => {
    if (taskRunning) return;
    try {
        taskRunning = true;
        const decoderVersion = await FM30.decoderVersion();
        txtDecoderVersion.textContent = decoderVersion.split(':')[1];
    } catch(ex) {
        errorMessage(ex.toString());
    }
    taskRunning = false;
}

const getHardwareVersion = async() => {
    if (taskRunning) return;
    try {
        taskRunning = true;
        const hardwareVersion = await FM30.hardwareVersion();
        txtHardwareVersion.textContent = hardwareVersion.split(':')[1];
    } catch(ex) {
        errorMessage(ex.toString());
    }
    taskRunning = false;
}

const getSerialNumber = async() => {
    if (taskRunning) return;
    try {
        taskRunning = true;
        const serialNumber = await FM30.productSerialNumber();
        txtSerialNumber.textContent = serialNumber.split(':')[1];
    } catch(ex) {
        errorMessage(ex.toString());
    }
    taskRunning = false;
}

const getOEMSerialNumber = async() => {
    if (taskRunning) return;
    try {
        taskRunning = true;
        const oemSerialNumber = await FM30.OEMSerialNumber();
        txtOEMSerialNumber.textContent = oemSerialNumber.split(':')[1];
    } catch(ex) {
        errorMessage(ex.toString());
    }
    taskRunning = false;
}

const getManufactureDate = async() => {
    if (taskRunning) return;
    try {
        taskRunning = true;
        const manufactureDate = await FM30.manufactureDate();
        txtManufactureDate.textContent = manufactureDate.split(':')[1];
    } catch(ex) {
        errorMessage(ex.toString());
    }
    taskRunning = false;
}

/** Illumination */

const getIllumination = async() => {
    if (taskRunning) return;
    try {
        taskRunning = true;
        const state = await FM30.illuminationState();
        txtIllumination.textContent = state;
        lstIllumination.value = state;
    } catch (ex) {
        errorMessage(ex.toString());
    }
    taskRunning = false;
}

const setIllumination = async() => {
    if (taskRunning) return;
    try {
        taskRunning = true;
        const state = lstIllumination.value;
        switch (state) {
            case '2':
                const onResult = await FM30.illuminationOn();

                console.log({onResult});
                break;

            case '0':
                const offResult = await FM30.illuminationOff();

                console.log({offResult});
                break;

            case '1':
                const normalResult = await FM30.illuminationNormal();

                console.log({normalResult});
                break;
        }

        await getIllumination();
    } catch (ex) {
        errorMessage(ex.toString());
    }
    taskRunning = false;
}

const getGoodReadBeepState = async() => {
    if (taskRunning) return;
    try {
        taskRunning = true;
        const state = await FM30.goodReadBeepState();
        txtGoodReadBeepStatus.textContent = state;
        lstGoodReadBeep.value = state;
    } catch (ex) {
        errorMessage(ex.toString());
    }
    taskRunning = false;
}

const setGoodReadBeepState = async() => {
    if (taskRunning) return;
    try {
        taskRunning = true;
        const state = lstGoodReadBeep.value;
        switch (state) {
            case 'ON':
                const onResult = await FM30.goodReadBeepEnable();

                console.log({onResult});
                break;

            case 'OFF':
                const offResult = await FM30.goodReadBeepDisable();

                console.log({offResult});
                break;
        }

        await getGoodReadBeepState();
    } catch (ex) {
        errorMessage(ex.toString());
    }
    taskRunning = false;
}

const getGoodReadBeepVolume = async() => {
    if (taskRunning) return;
    try {
        taskRunning = true;
        const state = await FM30.getGoodReadBeepVolume();
        txtGoodReadBeepVolume.textContent = state;
        lstGoodReadBeepVolume.value = state;
    } catch (ex) {
        errorMessage(ex.toString());
    }
    taskRunning = false;
}

const setGoodReadBeepVolume = async() => {
    if (taskRunning) return;
    try {
        taskRunning = true;
        const volume = lstGoodReadBeepVolume.value;
        const result = await FM30.setGoodReadBeepVolume(volume);
        console.log({result});
        await getGoodReadBeepVolume();
    } catch (ex) {
        errorMessage(ex.toString());
    }
    taskRunning = false;
}

const getGoodReadBeepDuration = async() => {
    if (taskRunning) return;
    try {
        taskRunning = true;
        const state = await FM30.getGoodReadBeepDuration();
        txtGoodReadBeepDuration.textContent = state;
        lstGoodReadBeepDuration.value = state;
    } catch (ex) {
        errorMessage(ex.toString());
    }
    taskRunning = false;
}

const setGoodReadBeepDuration = async() => {
    if (taskRunning) return;
    try {
        taskRunning = true;
        const duration = lstGoodReadBeepDuration.value;
        const result = await FM30.setGoodReadBeepDuration(duration);
        console.log({result});
        await getGoodReadBeepDuration();
    } catch (ex) {
        errorMessage(ex.toString());
    }
    taskRunning = false;
}

const getGoodReadBeepFrequency = async() => {
    if (taskRunning) return;
    try {
        taskRunning = true;
        const frequency = await FM30.getGoodReadBeepFrequency();
        txtGoodReadBeepFrequency.textContent = frequency;
        lstGoodReadBeepFrequency.value = frequency;
    } catch (ex) {
        errorMessage(ex.toString());
    }
    taskRunning = false;
}

const setGoodReadBeepFrequency = async() => {
    if (taskRunning) return;
    try {
        taskRunning = true;
        const frequency = lstGoodReadBeepFrequency.value;
        const result = await FM30.setGoodReadBeepFrequency(frequency);
        console.log({result});
        await getGoodReadBeepFrequency();
    } catch (ex) {
        errorMessage(ex.toString());
    }
    taskRunning = false;
}

const getPowerOnBeep = async() => {
    if (taskRunning) return;
    try {
        taskRunning = true;
        const state = await FM30.powerOnBeepState();
        txtPowerOnBeep.textContent = state;
        lstPowerOnBeep.value = state;
    } catch (ex) {
        errorMessage(ex.toString());
    }
    taskRunning = false;
}

const setPowerOnBeep = async() => {
    if (taskRunning) return;
    try {
        taskRunning = true;
        const state = lstPowerOnBeep.value;
        switch (state) {
            case '0':
                const offResult = await FM30.powerOnBeepDisable();

                console.log({offResult});
                break;

            case '1':
                const onResult = await FM30.powerOnBeepEnable();

                console.log({onResult});
                break;
        }
    } catch (ex) {
        errorMessage(ex.toString());
    }
    taskRunning = false;
}

init().then(async() => {
    if (!FM30) return;

    await getProductName();
    await getFirmwareVersion();
    await getDecoderVersion();
    await getHardwareVersion();
    await getSerialNumber();
    await getOEMSerialNumber();
    await getManufactureDate();

    await getIllumination();

    await getGoodReadBeepState();
    await getGoodReadBeepVolume();
    await getGoodReadBeepDuration();
    await getGoodReadBeepFrequency();

    await getPowerOnBeep();
});

/** Add Event Handlers */
btnBarcodeGet.addEventListener('click', () => getBarcode());

btnProductName.addEventListener('click', () => getProductName());
btnFirmwareVersion.addEventListener('click', () => getFirmwareVersion());
btnDecoderVersion.addEventListener('click', () => getDecoderVersion());
btnHardwareVersion.addEventListener('click', () => getHardwareVersion());
btnSerialNumber.addEventListener('click', () => getSerialNumber());
btnOEMSerialNumber.addEventListener('click', () => getOEMSerialNumber());
btnManufactureDate.addEventListener('click', () => getManufactureDate());

btnIlluminationGet.addEventListener('click', () => getIllumination());
btnIlluminationSet.addEventListener('click', () => setIllumination());

btnGoodReadBeepGet.addEventListener('click', () => getGoodReadBeepState());
btnGoodReadBeepSet.addEventListener('click', () => setGoodReadBeepState());
btnGoodReadBeepVolumeGet.addEventListener('click', () => getGoodReadBeepVolume());
btnGoodReadBeepVolumeSet.addEventListener('click', () => setGoodReadBeepVolume());
btnGoodReadBeepDurationGet.addEventListener('click', () => getGoodReadBeepDuration());
btnGoodReadBeepDurationSet.addEventListener('click', () => setGoodReadBeepDuration());
btnGoodReadBeepFrequencyGet.addEventListener('click', () => getGoodReadBeepFrequency());
btnGoodReadBeepFrequencySet.addEventListener('click', () => setGoodReadBeepFrequency());
btnPowerOnBeepGet.addEventListener('click', () => getPowerOnBeep());
btnPowerOnBeepSet.addEventListener('click', () => setPowerOnBeep());
