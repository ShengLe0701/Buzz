
function getBase64FromImageUrl(src, callback) {
    var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    img = new Image();

    img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var dataURL = canvas.toDataURL("image/jpeg");
        var dataURL1 = dataURL.replace(/^data:image\/(png|jpeg);base64,/, "");  
             
        callback(dataURL1);
    }
    img.src = src;
}


// function getBase64FromImageUrl(url, callback) {
//     var file = new File(url);

//     var fileReader = new FileReader();
//     fileReader.onload = function(fileLoadedEvent) {
//         var srcData = fileLoadedEvent.target.result; // <--- data: base64

//         callback(srcData);
//     }

//     fileReader.readAsDataURL(file);
// }

// function getFileContentAsBase64(path,callback){
//     window.resolveLocalFileSystemURL(path, gotFile, fail);
            
//     function fail(e) {
//           alert('Cannot found requested file');
//     }

//     function gotFile(fileEntry) {
//            fileEntry.file(function(file) {
//               var reader = new FileReader();
//               reader.onloadend = function(e) {
//                    var content = this.result;
//                    callback(content);
//               };
//               // The most important point, use the readAsDatURL Method from the file plugin
//               reader.readAsDataURL(file);
//            });
//     }
// }