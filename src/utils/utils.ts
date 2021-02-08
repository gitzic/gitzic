export function uuid() {
    return [
        new Date().getTime(),
        ...window.crypto.getRandomValues(new Uint32Array(2)),
    ].join('-');
}
