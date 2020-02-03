/**
 * Show
 */
export interface Show {
    id: number;
    name: string;
    description: string;
}

/**
 * Cast of a Show
 */
export interface Cast {
    id: number;
    name: string;
    actingRole: string;
}

/**
 * Query result (template)
 */
export interface QueryResult<T> {
    children: T[],
    total: number;
}