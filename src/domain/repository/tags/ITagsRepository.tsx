
import React from "react";

interface ITagsRepository {
    getTags: () => Promise<string[]>;
}

export default ITagsRepository;