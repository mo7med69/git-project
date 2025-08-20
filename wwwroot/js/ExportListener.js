import { keepAlive } from './HubUtils.js'
export var exportConnection = new signalR.HubConnectionBuilder().withUrl("/ExportHub").withAutomaticReconnect().build();
var keepAliveInterval;
export async function start() {
    try {
        await exportConnection.start();
        console.log("SignalR Connected.");
        keepAliveInterval = setInterval(() => keepAlive(exportConnection, "KeepAlive"), 60000);

    } catch (err) {
        console.log(err);
        clearInterval(keepAliveInterval);
        setTimeout(start, 5000);
    }
};

//export const invokeExport = (para, controller, method, params) => exportConnection.invoke("Export", para, controller, method, params);;
export const invokeExport = (para, controller) => exportConnection.invoke("Export", para, controller);


await start();

exportConnection.onreconnecting(err => {
    toastObj.icon = 'error';
    toastObj.text = "connection with server lost trying to reconnect this might cause losing some files";
    toastObj.heading = "Export Status";
    $.toast(toastObj);
})

exportConnection.on("iAmAlive", () => {
    console.log("iam alive");
});

var toastObj = {
    text: "", // Text that is to be shown in the toast
    heading: '', // Optional heading to be shown on the toast
    icon: '', // Type of toast icon
    showHideTransition: 'slide', // fade, slide or plain
    allowToastClose: true, // Boolean value true or false
    hideAfter: false, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
    stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
    position: 'bottom-center', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values
    textAlign: 'left',  // Text alignment i.e. left, right or center
    loader: true,  // Whether to show loader or not. True by default
    loaderBg: '#9EC600',  // Background color of the toast loader
};

exportConnection.on("csvErrorRecevied", async (batch) => {

    toastObj.icon = 'error';
    toastObj.text = "something wrong happend in batch number " + batch;
    toastObj.heading = "Export Status";
    $.toast(toastObj);

});

exportConnection.on("missedFilesRecived", async (files, reqId) => {
    console.log("tttttttttt", reqId, files);
    files.forEach(f => {
        console.log(f.fileName);
        downloadfile(f.file, f.fileName);

        toastObj.icon = 'success';
        toastObj.text = `export done for this file : ${f.fileName}, check your downloads`;
        toastObj.heading = "Export Status";
        $.toast(toastObj);
    });
    exportConnection.invoke("ClearExportFolder", reqId);
    localStorage.removeItem(reqId);

});

exportConnection.on("FinishedExportFor", async (reqId, len) => {
    var recivedFiles = JSON.parse(localStorage.getItem(reqId));
    console.log(reqId, len, recivedFiles.length);
    if (len === recivedFiles.length) {
        console.log("clr");
        //exportConnection.invoke("ClearExportFolder", reqId);
    }

    else {
        var missedFiles = [];
        for (var j = 0; j <= len; j++) {

            if (!recivedFiles.includes(j)) {
                console.log(j + 1);
                missedFiles.push(j + 1);
            }

        }
        exportConnection.invoke("GetMissedFiles", reqId, missedFiles);
    }
});
exportConnection.on("csvRecevied", async (file, fileName, i, guid) => {
    console.log(file);
    var recivedFiles = JSON.parse(localStorage.getItem(guid));
    if (recivedFiles)
        localStorage.setItem(guid, JSON.stringify([...recivedFiles, i]));
    else
        localStorage.setItem(guid, JSON.stringify([i]));
    //var lastItem = JSON.stringify(localStorage.getItem(guid));
    //if (!lastItem)
    //    localStorage.setItem(guid, { lastItem: i, lostRanges: []});
    //else {
    //    if (parseInt(i) - parseInt(lastItem.lastItem) != 1)
    //        exportConnection.invoke("ExportLost", guid, [...lastItem.lostRanges, { From: parseInt(lastItem.lastItem) + 1, To: i }])

    //    localStorage.setItem(guid, { lastItem: i, lostRanges: [...lastItem.lostRanges, { From: parseInt(lastItem.lastItem) + 1,To: i}]});
    //}
    // Assuming you have a byte array called 'byteArray' containing the bytes
    // You can also get the 'byteArray' from a server response, FileReader, or other sources.

    // Convert bytes to a Uint8Array (assuming the byteArray is Uint8Array)
    downloadfile(file, fileName);

    toastObj.icon = 'success';
    toastObj.text = `export done for this file : ${fileName}, check your downloads`;
    toastObj.heading = "Export Status";
    $.toast(toastObj);
})

function downloadfile(file, fileName) {
    console.log(file);
    const uint8Array = atob(file);
    console.log(uint8Array);

    var bytes = new Uint8Array(uint8Array.length);
    for (var i = 0; i < uint8Array.length; i++) {
        bytes[i] = uint8Array.charCodeAt(i);
    }
    // Create a Blob from the Uint8Array data
    console.log(bytes);
    const csvBlob = new Blob(["\ufeff", bytes], { type: 'text/csv; charset=utf-8' });
    // Create an object URL from the Blob
    const objectURL = URL.createObjectURL(csvBlob);

    // Now you can use the 'objectURL' to create a downloadable link or perform other operations
    // For example, creating a download link:
    const downloadLink = document.createElement('a');
    downloadLink.href = objectURL;
    downloadLink.download = fileName;
    downloadLink.click(); // Simulate a click on the link to trigger the download

    // Don't forget to revoke the object URL to free up memory after the download is initiated.
    URL.revokeObjectURL(objectURL);
}