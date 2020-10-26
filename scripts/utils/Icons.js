import React from 'react';

export const Logo = () => (
    <React.Fragment>
        <img src="./images/logo128x128.png" className="app__logo" />
    </React.Fragment>
);

export const PlusLogo = () => (
    <React.Fragment>
        <svg
            className="dl-blk"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
        >
            <path
                fill="#69758C"
                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0zm6 13.5h-4.5V18h-3v-4.5H6v-3h4.5V6h3v4.5H18v3z"
            />
        </svg>
    </React.Fragment>
);

export const DatePickerIcon = () => (
    <React.Fragment>
        <svg
            className="dl-blk"
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 18 18"
        >
            <g fill="#ACB6C6">
                <path d="M15.6 2.7c0-.663-.537-1.2-1.2-1.2h-.3v.9c0 .331-.269.6-.6.6h-.6c.331 0 .6-.269.6-.6V.6c0-.331-.269-.6-.6-.6-.331 0-.6.269-.6.6v.9h-1.5v.9c0 .331-.269.6-.6.6h-.6c.331 0 .6-.269.6-.6V.6c0-.331-.269-.6-.6-.6-.331 0-.6.269-.6.6v.9H7.2v.9c0 .331-.269.6-.6.6H6c.331 0 .6-.269.6-.6V.6C6.6.269 6.331 0 6 0c-.331 0-.6.269-.6.6v.9H3.9v.9c0 .331-.269.6-.6.6h-.6c.331 0 .6-.269.6-.6V.6c0-.331-.269-.6-.6-.6-.331 0-.6.269-.6.6v.9h-.9C.537 1.5 0 2.037 0 2.7v1.8h15.6V2.7zM14.7 11.4c-1.823 0-3.3 1.477-3.3 3.3 0 1.823 1.477 3.3 3.3 3.3 1.823 0 3.3-1.477 3.3-3.3 0-1.823-1.477-3.3-3.3-3.3zm0 3.9c-.077 0-.15-.016-.217-.042l-1.096.876-.375-.468 1.097-.877c-.004-.03-.009-.059-.009-.089 0-.222.121-.413.3-.517V12.3h.6v1.883c.179.104.3.295.3.517 0 .331-.269.6-.6.6z" />
                <path d="M1.2 16.2h9.9c-.193-.462-.3-.968-.3-1.5 0-1.622.99-3.012 2.4-3.6h-1.5V9.3h1.8v1.69c.378-.122.781-.19 1.2-.19.31 0 .61.04.9.109V5.1H0V15c0 .663.537 1.2 1.2 1.2zM11.7 6h1.8v1.8h-1.8V6zM8.4 6h1.8v1.8H8.4V6zm0 3.3h1.8v1.8H8.4V9.3zm0 3.3h1.8v1.8H8.4v-1.8zM5.1 6h1.8v1.8H5.1V6zm0 3.3h1.8v1.8H5.1V9.3zm0 3.3h1.8v1.8H5.1v-1.8zM1.8 6h1.8v1.8H1.8V6zm0 3.3h1.8v1.8H1.8V9.3zm0 3.3h1.8v1.8H1.8v-1.8z" />
            </g>
        </svg>
    </React.Fragment>
);

export const DownArrow = () => (
    <React.Fragment>
        <svg
            className="dl-blk"
            xmlns="http://www.w3.org/2000/svg"
            width={14}
            height={7}
            viewBox="0 0 18 9"
        >
            <path
                fill="#0a2541"
                d="M16.72 1.308L9.558 8.47c-.293.293-.767.293-1.06 0L1.336 1.308c-.292-.293-.292-.767 0-1.06.141-.141.332-.22.53-.22H16.19c.415 0 .75.336.75.75 0 .199-.079.39-.22.53z"
            />
        </svg>
    </React.Fragment>
);

export const LeftArrow = () => (
    <React.Fragment>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={10}
            height={20}
            viewBox="0 0 10 20"
        >
            <path
                fill="#0A2541"
                d="M8.546 1.423L.59 9.38c-.325.325-.325.853 0 1.178l7.957 7.957c.326.326.853.326 1.179 0 .156-.156.244-.368.244-.59V2.013c0-.46-.373-.833-.833-.833-.221 0-.433.087-.59.244z"
            />
        </svg>
    </React.Fragment>
);

export const RightArrow = () => (
    <React.Fragment>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={10}
            height={20}
            viewBox="0 0 10 20"
        >
            <path
                fill="#0A2541"
                d="M1.454 1.423L9.41 9.38c.325.325.325.853 0 1.178l-7.957 7.957c-.326.326-.853.326-1.179 0-.156-.156-.244-.368-.244-.59V2.013c0-.46.373-.833.833-.833.221 0 .433.087.59.244z"
            />
        </svg>
    </React.Fragment>
);

export const ReloadIcon = () => (
    <React.Fragment>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 20 20"
        >
            <g fill="#0A2541">
                <path d="M3.692 5.988C5.022 3.898 7.344 2.5 10 2.5c2.71 0 5.08 1.448 6.398 3.607L18.3 4.421C16.503 1.754 13.457 0 10 0 4.477 0 0 4.477 0 10c0 1.14.2 2.23.55 3.25l5.075-4.5-1.933-2.762zM19.45 6.75l-5.075 4.5 1.934 2.762C14.977 16.102 12.656 17.5 10 17.5c-2.71 0-5.08-1.448-6.398-3.607L1.7 15.579C3.497 18.246 6.543 20 10 20c5.523 0 10-4.477 10-10 0-1.139-.2-2.23-.55-3.25z" />
            </g>
        </svg>
    </React.Fragment>
);

export const EditIcon = () => (
    <React.Fragment>
        <svg className="dl-blk" width={18} height={18} viewBox="0 0 18 18">
            <defs>
                <filter id="a">
                    <feColorMatrix
                        in="SourceGraphic"
                        values="0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 1.000000 0"
                    />
                </filter>
            </defs>
            <g
                fill="none"
                fillRule="evenodd"
                filter="url(#a)"
                transform="translate(-270)"
            >
                <path
                    fill="#FFF"
                    fillRule="nonzero"
                    d="M270 14.248v3.75h3.75l11.065-11.066-3.75-3.75zm17.705-11.621L285.37.293a1.002 1.002 0 00-1.415 0l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.026 0-1.416z"
                />
            </g>
        </svg>
    </React.Fragment>
);

export const DeleteIcon = () => (
    <React.Fragment>
        <svg className="dl-blk" width={14} height={18} viewBox="0 0 14 18">
            <defs>
                <filter id="a">
                    <feColorMatrix
                        in="SourceGraphic"
                        values="0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 0 1.000000 0 0 0 1.000000 0"
                    />
                </filter>
            </defs>
            <g
                fill="none"
                fillRule="evenodd"
                filter="url(#a)"
                transform="translate(-309)"
            >
                <path
                    fill="#FFF"
                    fillRule="nonzero"
                    d="M314.497 1.087h3.009v.506h1.086v-.577c0-.56-.455-1.016-1.015-1.016h-3.151c-.56 0-1.015.456-1.015 1.016v.577h1.086v-.506zm6.604 4.81h-10.199c-.28 0-.5.239-.477.518l.853 10.543A1.131 1.131 0 00312.406 18h7.191c.59 0 1.08-.453 1.128-1.042l.853-10.543a.478.478 0 00-.477-.518zm-7.73 10.978l-.033.002a.544.544 0 01-.542-.51l-.534-8.657a.543.543 0 111.084-.067l.534 8.657a.541.541 0 01-.508.575zm3.18-.542a.543.543 0 11-1.087 0V7.677a.544.544 0 011.087 0v8.656zm3.19-8.624l-.51 8.656a.542.542 0 01-.541.511h-.033a.543.543 0 01-.51-.575l.51-8.656a.542.542 0 111.084.064zm3.239-3.489l-.357-1.069a.69.69 0 00-.655-.472h-11.933c-.297 0-.56.19-.655.472l-.357 1.07a.45.45 0 00.426.59h13.106a.447.447 0 00.425-.59z"
                />
            </g>
        </svg>
    </React.Fragment>
);

export const CloseBtnIcon = () => (
    <React.Fragment>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            viewBox="0 0 10 10"
        >
            <path
                fill="#FFF"
                stroke="#FFF"
                strokeWidth="0.5"
                d="M5.722 4.994l3.109-3.108a.517.517 0 10-.732-.731L4.991 4.263 1.883 1.155a.517.517 0 10-.731.731L4.26 4.994 1.152 8.103a.514.514 0 000 .73.515.515 0 00.731.001l3.108-3.108L8.1 8.834a.52.52 0 00.732 0 .517.517 0 000-.731l-3.11-3.109z"
            ></path>
        </svg>
    </React.Fragment>
);
