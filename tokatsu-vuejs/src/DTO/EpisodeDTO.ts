export default class EpisodeDTO {
    id: number;
    title: string;
    description: string;
    numEpisode: number;
    numSaison: number;

    constructor(id: number, title: string, description: string, numEpisode: number, numSaison: number = 0) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.numEpisode = numEpisode;
        this.numSaison = numSaison;
    }
}