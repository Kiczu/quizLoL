export type ApiResponse = {
    type: string;
    format: string;
    version: string;
    data: ApiData;
};

export type ApiData = Record<string, ChampionDetails>;

export type UserDetails = {
    name: string;
    surname: string;
    email: string;
    password: string;
    totalPoints: number;
}

export type Character = {
    id: string;
    key: string;
    name: string;
    title: string;
    blurb: string;
    info: {
        attack: number;
        defense: number;
        magic: number;
        difficulty: number;
    };
    image: {
        full: string;
        sprite: string;
        group: string;
        x: number;
        y: number;
        w: number;
        h: number;
    };
    tags: string[];
};

export type UserData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}


export type ChampionDetails = {
    id: string;
    key: string;
    name: string;
    title: string;
    blurb: string;
    lore: string;
    partype: string;
    tags: string[];
    image: {
        full: string;
        sprite: string;
        group: string;
        x: number;
        y: number;
        w: number;
        h: number;
    };
    passive: {
        description: string;
        name: string;
    };
    spells: [
        {
            id: string;
            cooldown: number[];
            cooldownBurn: string;
            cost: number[];
            costBurn: string;
            description: string;
            image: {
                full: string;
            }
            tooltip: string;
            name: string;
        }
    ];
};

export enum GameState {
    NotStarted = "NotStarted",
    InProgress = "InProgress",
    Finished = "Finished",
}