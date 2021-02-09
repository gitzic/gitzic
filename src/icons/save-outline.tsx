import { React as fix, ElementNode } from 'async-jsx-html';
const React = fix;

interface Props {
    style?: Object;
    id?: string;
    class?: string;
    loading?: boolean;
}

export function SaveOutline({
    style,
    id,
    class: classnames,
    loading,
}: Props): ElementNode {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            style={style}
            id={id}
            class={classnames}
        >
            <title>Save</title>
            <g>
                <path
                    d="M380.93 57.37A32 32 0 00358.3 48H94.22A46.21 46.21 0 0048 94.22v323.56A46.21 46.21 0 0094.22 464h323.56A46.36 46.36 0 00464 417.78V153.7a32 32 0 00-9.37-22.63zM256 416a64 64 0 1164-64 63.92 63.92 0 01-64 64zm48-224H112a16 16 0 01-16-16v-64a16 16 0 0116-16h192a16 16 0 0116 16v64a16 16 0 01-16 16z"
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="32"
                />
                {loading && (
                    <animate
                        attributeName="opacity"
                        values="1;0"
                        keyTimes="0;1"
                        dur="1s"
                        begin="-0.9166666666666666s"
                        repeatCount="indefinite"
                    ></animate>
                )}
            </g>
        </svg>
    );
}
