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

export function toggleChildClass(parent: HTMLElement, classname: string) {
    return parent.childNodes.forEach((el) =>
        (el as HTMLElement).classList?.toggle(classname),
    );
}

export function toggleAttr(
    el: HTMLElement,
    name: string,
    val1: string,
    val2: string,
) {
    if (el.getAttribute(name) === val1) {
        el.setAttribute(name, val2);
    } else {
        el.setAttribute(name, val1);
    }
}

export function elById(id: string) {
    return document.getElementById(id);
}
