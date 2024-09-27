function _0x3d23(){var _0x8f8b76=['14YPklwK','open','3405410lMNtRX','upload','entries','419661bqZTxG','send','abort','append','188581lYdiun','addEventListener','12aQZyJD','POST','progress','984408UCpzKL','1678875bbTeCL','2216094yAbKjV','14808NMdwIu','2SzMgLt','error','load'];_0x3d23=function(){return _0x8f8b76;};return _0x3d23();}function _0x22c9(_0x13741e,_0xbdc7d1){var _0x3d2316=_0x3d23();return _0x22c9=function(_0x22c921,_0xec239d){_0x22c921=_0x22c921-0x1eb;var _0x523cba=_0x3d2316[_0x22c921];return _0x523cba;},_0x22c9(_0x13741e,_0xbdc7d1);}(function(_0xbc1244,_0x503ed6){var _0x40e571=_0x22c9,_0x110c66=_0xbc1244();while(!![]){try{var _0x39c56f=parseInt(_0x40e571(0x1f1))/0x1*(parseInt(_0x40e571(0x1fa))/0x2)+parseInt(_0x40e571(0x1f9))/0x3*(parseInt(_0x40e571(0x1f3))/0x4)+-parseInt(_0x40e571(0x1f7))/0x5+parseInt(_0x40e571(0x1f8))/0x6+-parseInt(_0x40e571(0x1fd))/0x7*(-parseInt(_0x40e571(0x1f6))/0x8)+parseInt(_0x40e571(0x1ed))/0x9+-parseInt(_0x40e571(0x1ff))/0xa;if(_0x39c56f===_0x503ed6)break;else _0x110c66['push'](_0x110c66['shift']());}catch(_0x25fae8){_0x110c66['push'](_0x110c66['shift']());}}}(_0x3d23,0x2e2e1));function ajax(_0x3b8dd9,_0x3b979c){var _0x5056e2=_0x22c9,_0x19b748=new FormData();for(const [_0x146beb,_0x24370c]of Object[_0x5056e2(0x1ec)](_0x3b979c)){_0x19b748[_0x5056e2(0x1f0)](_0x146beb,_0x24370c);};var _0xf8daa3=new XMLHttpRequest();_0xf8daa3[_0x5056e2(0x1eb)][_0x5056e2(0x1f2)](_0x5056e2(0x1f5),progressHandler,![]),_0xf8daa3[_0x5056e2(0x1f2)](_0x5056e2(0x1fc),completeHandler,![]),_0xf8daa3['addEventListener'](_0x5056e2(0x1fb),errorHandler,![]),_0xf8daa3['addEventListener'](_0x5056e2(0x1ef),abortHandler,![]),_0xf8daa3[_0x5056e2(0x1fe)](_0x5056e2(0x1f4),_0x3b8dd9),_0xf8daa3[_0x5056e2(0x1ee)](_0x19b748);}

// function progressHandler(e) {
//     let percent = (e.loaded / e.total) * 100;
//     elmt('status').innerHTML = Math.round(percent) + '%';
// }

// function completeHandler(e) {
//     let response = JSON.parse(e.target.responseText);
//     if (response['success']) {

//         elmt('status').innerHTML = response['message'];
//         window.location.reload();

//     } else
//         elmt('status').innerHTML = response['message']; 
// }

// function errorHandler() {
//     elmt('status').innerHTML = "Echoué";
// }

// function abortHandler() {
//     elmt('status').innerHTML = "Annulé";
// }