
import React, { MutableRefObject } from "react";

const scrollToRef = (ref: MutableRefObject<null | HTMLDivElement>) => {
    if (ref.current) {
        // console.log(window.navigator)
        ref.current!.scrollIntoView({
            behavior: "smooth",
          });
        // On mobile Chrome smooth is not supported, so let's 
        // make sure we're scrolled anyway
        // ref.current!.scrollIntoView(true);
    }
};

const delay = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const ReactHelpers = {
    scrollToRef, delay
}

export default ReactHelpers;