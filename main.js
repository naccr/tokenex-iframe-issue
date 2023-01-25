function twoDigit(n) {
    return (n < 10 ? '0' : '') + n;
}

var d = new Date();
var formattedDate = d.getUTCFullYear() + twoDigit(d.getUTCMonth() + 1) + twoDigit(d.getUTCDate()) + twoDigit(d.getUTCHours()) + twoDigit(d.getUTCMinutes()) + twoDigit(d.getUTCSeconds());
var txSecretKey = "qr7aj514cRwGIIS9Hh0Ju3Vdp8qas6D0khxaMmPT";
var txID = "6468548879812671";
var txTokenScheme = "1";
var txOrigin = "https://naccr.github.io,https://naccr.github.io";
// var txOrigin = "file://";
var message = (txID + "|" + txOrigin + "|" + formattedDate + "|" + txTokenScheme);
console.log("Message: " + message);

var hash = CryptoJS.HmacSHA256(message, txSecretKey);
var authkey = CryptoJS.enc.Base64.stringify(hash);


var iframeConfig = {
    origin: txOrigin,
    timestamp: formattedDate,
    tokenExID: txID,
    tokenScheme: txTokenScheme,
    authenticationKey: authkey,
    pci: true, // change to true and inputMaxLength is not respected
    cvv: true,
    inputType: 'text',
    inputMaxLength: 16,
    cvvContainerID: "cvvID"
}

var iframe = new TokenEx.Iframe("tokenExIframeDiv", iframeConfig);
iframe.load();
