
import { useEffect, useState } from "react";
import ITagsRepository from "../../../domain/repository/tags/ITagsRepository";
import {Tag} from '@shopify/polaris';

interface Props {
    tagsRepository: ITagsRepository;
    onTagClick?: (tag: string) => void;
    onTagSelected?: (tag: string) => void;
    onTagDeSelected?: (tag: string) => void;
    onClearTagsClick?: () => void;
    tagSelectionEnabled?: boolean;
}

const TagCloud = (props: Props) => {

    const [tags, setTags] = useState(
        [] as string[]
    )

    const [, setLoading] = useState(false);
    
    const [selectedTags, setSelectedTags] = useState<string[]>([]); // new Set() ?

    const loadTags = async(success: (tags: string[]) => void, error: (e: any) => void) => {
        try {
            const tags = await props.tagsRepository.getTags();
            success(tags)
        } catch (e) {
            error(e)
        }
    }

    const isSelectionEnabled = props.tagSelectionEnabled!;

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
            <Tag onClick={() => {
                props.onClearTagsClick?.();
                setSelectedTags([]);
            }}>❌</Tag>
            {tags.map(tag => <Tag key={tag} 
                onClick={() => {
                    props.onTagClick?.(tag);
                    if (selectedTags.includes(tag)) {
                        setSelectedTags(selectedTags.filter(v => v !== tag));
                        props.onTagDeSelected?.(tag);
                    }
                    else {
                        setSelectedTags([...selectedTags, tag]);
                        props.onTagSelected?.(tag);
                    }
                }}>{tag}</Tag>)}
        </>
    )
}

export default TagCloud;