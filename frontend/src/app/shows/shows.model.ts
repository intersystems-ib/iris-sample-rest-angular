export interface Show {
    id: number;
    name: string;
    description: string;
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