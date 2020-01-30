export interface Show {
    id: number;
    name: string;
    description: string;
    year: string;
}

export interface Cast {
    id: number;
    name: string;
    actingRole: string;
}

export interface QueryResult<T> {
    children: T[],
    total: number;
}