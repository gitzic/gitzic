// export function evNumVal(fn: (nb: number) => void) {
//     return ({ target: { value } }: Event) => {
//         fn(Number(value));
//     };
// }

// export function evStrVal(fn: (val: string) => void) {
//     return ({ target: { value } }: ChangeEvent<HTMLSelectElement>) => {
//         fn(value);
//     };
// }

export function evStrVal(fn: (val: string) => void) {
    return ({ target }: Event) => {
        fn((target as HTMLInputElement).value);
    };
}
