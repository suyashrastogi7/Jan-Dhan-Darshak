import React from "react";

import Svg, { Path } from "react-native-svg";

const Back = () => {
    return (
        <Svg
            width={35}
            height={25}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#101010"
        >
            <Path
                stroke="#000"
                strokeWidth={3}
                strokeLinecap="round"
                d="M2 7h22M1 6.586 6.586 1M7.071 12.657 1.414 7"
            />
        </Svg>
    );
};

export default Back;
