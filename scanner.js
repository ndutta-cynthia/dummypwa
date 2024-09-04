const startScanBtn = document.getElementById('startScanBtn');
const scannerContainer = document.getElementById('scanner-container');
const scannerOutput = document.getElementById('scanner-output');

// Start the barcode scanner
startScanBtn.addEventListener('click', () => {
    // Show the scanner container
    scannerContainer.style.display = 'block';

    // Initialize QuaggaJS
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: document.querySelector('#interactive'), // The video feed container
            constraints: {
                width: 640,  // Ideal width for the camera stream
                height: 480, // Ideal height for the camera stream
                facingMode: "environment" // Use the rear camera
            }
        },
        decoder: {
            readers: [
                "code_128_reader",  // Support for CODE_128 barcodes
                "ean_reader",       // Support for EAN-13 barcodes
                "ean_8_reader",     // Support for EAN-8 barcodes
                "upc_reader",       // Support for UPC-A barcodes
                "upc_e_reader",     // Support for UPC-E barcodes
                "code_39_reader",   // Support for CODE-39 barcodes
                "qr_reader"         // Support for QR codes
            ]
        },
        locate: true,  // Improved detection (at the cost of slower performance)
    }, function(err) {
        if (err) {
            console.error("Error initializing Quagga:", err);
            scannerOutput.innerText = "Error initializing scanner.";
            return;
        }
        console.log("Initialization finished. Ready to start scanning.");
        Quagga.start();  // Start scanning
    });

    // Process the barcode/QR code and display the result
    Quagga.onDetected(function(result) {
        if (result && result.codeResult && result.codeResult.code) {
            const code = result.codeResult.code;
            scannerOutput.innerText = `Scanned Code: ${code}`;  // Display the scanned code
            console.log("Scanned Code:", code);
            Quagga.stop();  // Stop scanning after a successful detection

            // Prompt the user to search the scanned code on Google
            const userConfirmed = confirm(`Scanned Code: ${code}. Do you want to search it on Google?`);
            if (userConfirmed) {
                window.open(`https://www.google.com/search?q=${code}`, '_blank');  // Open Google search in a new tab
            }
        }
    });

    // Display "Scanning..." when no code is detected
    Quagga.onProcessed(function(result) {
        if (!result || !result.codeResult) {
            scannerOutput.innerText = "Scanning...";  // Update the status to "Scanning..."
        }
    });
});
