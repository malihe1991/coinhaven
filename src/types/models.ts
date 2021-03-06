export type ISocketResponse = {
    a: string;
    b: string;
    c: string;
    ch: string;
    cp: string;
    dp: string;
    h: string;
    id: string;
    l: string;
    lc: string;
    s: string;
    sp: string;
    t: number;
};

export type ISocketData = {
    [key in string]: ISocketResponse;
};

export type ICountry = { name: string, emoji: string };


export type ICountriesName = 'United States' | 'Germany' | 'Ukraine' | 'Hungary';

