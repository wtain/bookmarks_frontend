
import { useEffect, useState } from "react";
import ITagsRepository from "../../../domain/repository/tags/ITagsRepository";
import Tag from "../TagsEditor/Tag";

interface Props {
    tagsRepository: ITagsRepository;
    onTagClick?: (tag: string) => void;
    onTagSelected?: (tag: string) => void;
    onTagDeSelected?: (tag: string) => void;
    onClearTagsClick?: () => void;
}

const TagCloud = (props: Props) => {

    let [tags, setTags] = useState(
        [] as string[]
    )

    let [, setLoading] = useState(false);
    
    const [selectedTags, setSelectedTags] = useState<string[]>([]); // new Set() ?

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
            <Tag tag={{ name: "❌", id: "" }} onClick={() => {
                if (props.onClearTagsClick) {
                    props.onClearTagsClick!();
                }
                setSelectedTags([]);
            }} />
            {tags.map(tag => <Tag key={tag} tag={{ name: tag, id: "" }}
                isSelected={selectedTags.includes(tag)}
                onClick={() => {
                    if (props.onTagClick) {
                        props.onTagClick!(tag);      
                    }
                    if (selectedTags.includes(tag)) {
                        //selectedTags.delete(tag);
                        setSelectedTags(selectedTags.filter(v => v !== tag));
                        if (props.onTagDeSelected) {
                            props.onTagDeSelected!(tag);
                        }
                    }
                    else {
                        //selectedTags.add(tag);
                        setSelectedTags([...selectedTags, tag]);
                        if (props.onTagSelected) {
                            props.onTagSelected!(tag);
                        }
                    }
                }} />)}
        </>
    )
}

export default TagCloud;