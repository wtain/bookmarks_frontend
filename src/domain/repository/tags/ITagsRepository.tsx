
interface ITagsRepository {
    getTags: () => Promise<string[]>;
}

export default ITagsRepository;