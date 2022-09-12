
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import TagCloud from "../components/UI/TagCloud/TagCloud";
import Tag from "../components/UI/TagsEditor/Tag";
import ITagsRepository from "../domain/repository/tags/ITagsRepository";

interface Props {
    tagsRepository: ITagsRepository;
}

const TagsPage = (props: Props) => {

    return (
        <TagCloud tagsRepository={props.tagsRepository} />
    )
}

export default TagsPage;