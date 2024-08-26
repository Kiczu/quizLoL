export type ApiResponse = {
    type: string;
    format: string;
    version: string;
    data: ApiData;
};

export type ApiData = Record<string, ChampionDetails>;

export type User = {
    name: string;
    surname: string;
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
            cooldown: [number];
            cooldownBurn: string;
            cost: [number];
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