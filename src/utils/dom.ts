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

export function applyToChild(
    parent: HTMLElement,
    fn: (el: HTMLElement, index?: number) => void,
) {
    return parent.childNodes.forEach((el, index) =>
        fn(el as HTMLElement, index),
    );
}

export function toggleChildClass(parent: HTMLElement, classname: string) {
    return applyToChild(parent, (el) => el.classList.toggle(classname));
}

export function addChildClass(parent: HTMLElement, classname: string) {
    return applyToChild(parent, (el) => el.classList.add(classname));
}

export function removeChildClass(parent: HTMLElement, classname: string) {
    return applyToChild(parent, (el) => el.classList.remove(classname));
}

export function toggleSiblingClass(el: HTMLElement, classname: string) {
    if (el.classList.contains(classname)) {
        addChildClass(el.parentElement, classname);
        el.classList.remove(classname);
    } else {
        removeChildClass(el.parentElement, classname);
        el.classList.add(classname);
    }
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
