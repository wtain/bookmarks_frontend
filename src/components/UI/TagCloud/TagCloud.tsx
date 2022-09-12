
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ITagsRepository from "../../../domain/repository/tags/ITagsRepository";
import Tag from "../TagsEditor/Tag";

interface Props {
  tagsRepository: ITagsRepository;
}

const TagCloud = (props: Props) => {

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
          <Tag tag={{name: "(Clear)", id: ""}} onClick={() => {
              navigate("/bookmarks")
          }} />
          {tags.map(tag => <Tag key={tag} tag={{name: tag, id: ""}} onClick={() => {
              navigate("/bookmarks/" + tag)
          }} />)}
      </>
  )
}

export default TagCloud;