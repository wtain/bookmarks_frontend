
import { MutableRefObject } from "react";

const scrollToRef = (ref: MutableRefObject<null | HTMLDivElement>) => {
    // On mobile Chrome smooth is not supported, so let's 
        // make sure we're scrolled anyway
        // ref.current!.scrollIntoView(true);
    ref.current?.scrollIntoView({
        behavior: "smooth",
    });
};

const ReactHelpers = {
    scrollToRef
}

export default ReactHelpers;