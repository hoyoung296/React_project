import React, { useEffect } from "react";

const test = () => {
    console.log("api 테스트")
}

const PortOneApiCom = () => {
    useEffect(() => {
        console.log("api 테스트");
    }, []);

    return null;
};

export default PortOneApiCom;