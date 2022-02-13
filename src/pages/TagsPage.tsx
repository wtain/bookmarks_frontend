
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Tag from "../components/UI/TagsEditor/Tag";
import ITagsRepository from "../domain/repository/tags/ITagsRepository";

interface Props {
    tagsRepository: ITagsRepository;
}

const TagsPage = (props: Props) => {

    const navigate = useNavigate();

    let [tags, setTags] = useState(
        [] as string[]
    )

    let [loading, setLoading] = useState(false);

    const loadTags = async(success: (tags: string[]) => void, error: (e: any) => void) => {
        try {
            const tags = await props.tagsRepository.getTags();
            success(tags)
        } catch (e) {
            error(e)
        }
    }

    useEffect(() => {
        setLoading(true);
        loadTags((tags: string[]) => {
            setTags(tags)
            setLoading(false);
        }, 
            (e) => {
                setLoading(false);
            })
    }, [])

    return (
        <>
            {tags.map(tag => <Tag key={tag} tag={{name: tag, id: ""}} onClick={() => {
                navigate("/bookmarks/" + tag)
            }} />)}
        </>
    )
}

export default TagsPage;