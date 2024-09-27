function elmt(elmt){
    return document.getElementById(elmt);
}

function upload(e)
{
    var where = '/admin/video/add';
    if (e == 'edit'){
        where = '/admin/video/edit';
    }else if (elmt('titre').value == '' || elmt('description').value == '' || elmt('episode').value == '' || elmt('saison').value == '' || elmt('image').files[0] == null || elmt('video').files[0] == null || elmt('serie_id').value == '') {
        alert('Veuillez remplir tous les champs');
        return;
    }

    let datas = {
        "id": elmt('id').value,
        "titre": elmt('titre').value,
        "description": elmt('description').value,
        "episode": elmt('episode').value,
        "saison": elmt('saison').value,
        "image": elmt('image').files[0],
        "video": elmt('video').files[0],
        "serie_id": elmt('serie_id').value
    };

    ajax(where, datas);
}

function progressHandler(e) {
    let percent = (e.loaded / e.total) * 100;
    elmt('status').innerHTML = Math.round(percent) + '%';
}

function completeHandler(e) {
    let response = JSON.parse(e.target.responseText);
    if (response['success']) {

        elmt('status').innerHTML = response['message'];
        document.location.href = '/admin/serie/' + response['serie_id'];

    } else
        elmt('status').innerHTML = response['message']; 
}

function errorHandler() {
    elmt('status').innerHTML = "Echoué";
}

function abortHandler() {
    elmt('status').innerHTML = "Annulé";
}