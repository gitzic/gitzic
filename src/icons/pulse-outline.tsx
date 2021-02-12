import { React as fix, ElementNode } from 'async-jsx-html';
const React = fix;

interface Props {
    style?: Object;
    id?: string;
    class?: string;
}

export function PulseOutline({
    style,
    id,
    class: classnames,
}: Props): ElementNode {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            style={style}
            id={id}
            class={classnames}
        >
            <title>Pulse</title>
            <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="M48 320h64l64-256 64 384 64-224 32 96h64"
            />
            <circle
                cx="432"
                cy="320"
                r="32"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
            />
        </svg>
    );
}
