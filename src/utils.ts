
export const groupBy = <T, Q>(array: T[], predicate: (value: T, index: number, array: T[]) => Q) =>
    Array.from(
        array.reduce((map, value, index, array) => {
            const key = predicate(value, index, array);
            map.get(key)?.push(value) ?? map.set(key, [value]);
            return map;
        }, new Map<Q, T[]>())
    );


export const compareNullableStrings = (a: string | null, b: string | null) => {
    if (a === b) return 0;
    if (a === null) return -1;
    if (b === null) return 1;
    return a.localeCompare(b);
}