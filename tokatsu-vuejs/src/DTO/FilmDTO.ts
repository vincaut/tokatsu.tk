import type EpisodeDTO from "./EpisodeDTO";

export default class FilmDTO {
    id: number;
    title: string;
    description: string;
    nbFilms: number;
    films: EpisodeDTO[];
    available: boolean;

    constructor(id: number, title: string, description: string, nbFilms: number, films: EpisodeDTO[], available: boolean = true) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.nbFilms = nbFilms;
        this.films = films;
        this.available = available;
    }
}