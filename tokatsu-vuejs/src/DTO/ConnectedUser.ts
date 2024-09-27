export default class ConnectedUser {
    nom: string;
    prenom: string;
    email: string;
    pseudo: string;
    permissions: string;
    userVerif: boolean;
    token: string;
    constructor(nom: string, prenom: string, email: string, pseudo: string, permissions: string, userVerif: boolean, token: string) {
        this.nom = nom;
        this.prenom = prenom;
        this.email = email;
        this.pseudo = pseudo;
        this.permissions = permissions;
        this.userVerif = userVerif;
        this.token = token;
    }
}