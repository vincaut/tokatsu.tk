function elmt(elmt) {
    return document.getElementById(elmt);
}


var debutTelechargement;

function upload(e, isSerie = true) {
    debutTelechargement = new Date().getTime();

    let datas = {};
    var where = '/admin/video/add';

    if (isSerie) {

        if (e == 'edit') {
            where = '/admin/video/edit';
        } else if (elmt('titre').value == '' || elmt('description').value == '' || elmt('episode').value == '' || elmt('saison').value == '' || elmt('image').files[0] == null || elmt('video').files[0] == null || elmt('serie_id').value == '') {
            alert('Veuillez remplir tous les champs');
            return;
        }

        datas = {
            "id": elmt('id').value,
            "titre": elmt('titre').value,
            "description": elmt('description').value,
            "episode": elmt('episode').value,
            "saison": elmt('saison').value,
            "image": elmt('image').files[0],
            "video": elmt('video').files[0],
            "serie_id": elmt('serie_id').value
        };

    } else {

        if (e == 'edit') {
            where = '/admin/video/edit';
        } else if (elmt('titre').value == '' || elmt('description').value == '' || elmt('episode').value == '' || elmt('image').files[0] == null || elmt('video').files[0] == null || elmt('film_id').value == '') {
            alert('Veuillez remplir tous les champs');
            return;
        }

        datas = {
            "id": elmt('id').value,
            "titre": elmt('titre').value,
            "description": elmt('description').value,
            "episode": elmt('episode').value,
            "image": elmt('image').files[0],
            "video": elmt('video').files[0],
            "film_id": elmt('film_id').value
        };

    }
    ajax(where, datas);
    elmt('save').disabled = true;
}

function progressHandler(e) {

    // Calcul de la durée écoulée depuis le début du téléchargement
    var tempsEcoule = new Date().getTime() - debutTelechargement;

    // Calcul de la vitesse de téléversement en octets par seconde (Bps)
    var vitesseTeleversement = e.loaded / (tempsEcoule / 1000);

    // Affichage de la vitesse de téléversement en kilobits par seconde (Kbps)
    var vitesseMos = (Math.round((vitesseTeleversement / 1048576) * 100) / 100);
    // elmt('vitesse').innerHTML = "Vitesse de téléversement : " + vitesseMos + " Mo/s";

    // Calcul du temps restant estimé
    var tailleRestante = e.total - e.loaded;
    var tempsRestant = tailleRestante / vitesseTeleversement;
    var minutes = Math.floor(tempsRestant / 60);
    var secondes = Math.round(tempsRestant % 60);

    if (e.loaded.toString().length > 3) {
        if (e.loaded.toString().length > 6) {
            if (e.loaded.toString().length > 9) {
                var loaded = (Math.round((e.loaded / 1073741824) * 100) / 100) + ' Go';
            } else {
                var loaded = (Math.round((e.loaded / 1048576) * 100) / 100) + ' Mo';
            }
        } else {
            var loaded = (Math.round((e.loaded / 1024) * 100) / 100) + ' Ko';
        }
    } else {
        var loaded = e.loaded;
    }

    if (e.total.toString().length > 3) {
        if (e.total.toString().length > 6) {
            if (e.total.toString().length > 9) {
                var total = (Math.round((e.total / 1073741824) * 100) / 100) + ' Go';
            } else {
                var total = (Math.round((e.total / 1048576) * 100) / 100) + ' Mo';
            }
        } else {
            var total = (Math.round((e.total / 1024) * 100) / 100) + ' Ko';
        }
    } else {
        var total = e.total;
    }
    elmt('tempsRestant').innerHTML = "Temps restant estimé : " + minutes + " min " + secondes + " sec";
    elmt('tailleChargee').innerHTML = loaded + ' chargé sur ' + total;
    elmt('vitesse').innerHTML = vitesseMos + ' Mo/s';
    var pourcentage = (e.loaded / e.total) * 100;
    elmt('pourcentage').innerHTML = Math.round(pourcentage) + '%';

    elmt('save').disabled = true;
    var a = document.querySelectorAll('a');
    for (var i = 0; i < a.length; i++) {
        a[i].style.pointerEvents = 'none';
        a[i].style.cursor = 'default';
        a[i].style.opacity = '0.5';
        a[i].style.filter = 'alpha(opacity=50)';
        a[i].href = '';
    }

    elmt('title').innerHTML = Math.round(pourcentage) + '%' + ' | ' + elmt('titre').value + ' - ep.' + elmt('episode').value;
}

function completeHandler(e) {
    let response = JSON.parse(e.target.responseText);
    if (response['success']) {

        if (response['serie_id'] != null) {
            elmt('status').innerHTML = response['message'];
            document.location.href = '/admin/serie/' + response['serie_id'];
        } else {
            elmt('status').innerHTML = response['message'];
            document.location.href = '/admin/film/' + response['film_id'];
        }

    } else
        elmt('status').innerHTML = response['message'];
}

function errorHandler() {
    elmt('status').innerHTML = "Echoué";
    elmt('save').disabled = false;
    elmt('title').innerHTML = 'Échoué' + ' | ' + elmt('titre').value + ' - ep.' + elmt('episode').value;
}

function abortHandler() {
    elmt('status').innerHTML = "Annulé";
    elmt('save').disabled = false;
    elmt('title').innerHTML = 'Annulé' + ' | ' + elmt('titre').value + ' - ep.' + elmt('episode').value;
}