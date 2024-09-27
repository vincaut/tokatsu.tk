import type EpisodeDTO from "./EpisodeDTO";

export default class SerieDTO {
    id: number;
    title: string;
    description: string;
    episodes: EpisodeDTO[];
    available: boolean;
    nbSaison: number;

    constructor(id: number, title: string, description: string, episodes: EpisodeDTO[], available: boolean = true, nbSaison: number = 1) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.episodes = episodes;
        this.available = available;
        this.nbSaison = nbSaison;
    }
}