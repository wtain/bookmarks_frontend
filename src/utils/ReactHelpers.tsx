
import { MutableRefObject } from "react";

const scrollToRef = (ref: MutableRefObject<null | HTMLDivElement>) => {
    if (ref.current) {
        ref.current!.scrollIntoView({
            behavior: "smooth",
          });
        // On mobile Chrome smooth is not supported, so let's 
        // make sure we're scrolled anyway
        // ref.current!.scrollIntoView(true);
    }
};

const ReactHelpers = {
    scrollToRef
}

export default ReactHelpers;