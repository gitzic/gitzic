export function uuid() {
    return [
        new Date().getTime(),
        ...window.crypto.getRandomValues(new Uint32Array(2)),
    ].join('-');
}

export function fill(len: number, fn: (key: number) => any) {
    return Array(len)
        .fill(null)
        .map((_, key) => fn(key));
}

export function on(isValid: boolean, value: string) {
    return isValid ? value : '';
}
