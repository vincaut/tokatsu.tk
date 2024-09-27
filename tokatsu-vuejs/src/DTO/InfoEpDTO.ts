export default class InfoEpDTO {
    id: number;
    title: string;
    description: string;
    episode: number;
    saison: number;
    content: any;

    constructor(id: number, title: string, description: string, episode: number, saison: number, content: any) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.episode = episode;
        this.saison = saison;
        this.content = content;
    }
}