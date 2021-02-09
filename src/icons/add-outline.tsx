import { React as fix, ElementNode } from 'async-jsx-html';
const React = fix;

interface Props {
    style?: Object;
    id?: string;
    class?: string;
}

export function AddOutline({
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
            <title>Add</title>
            <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
                d="M256 112v288M400 256H112"
            />
        </svg>
    );
}
