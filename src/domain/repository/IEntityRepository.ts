import BaseEntity from "./BaseEntity";

interface IEntityRepository<TEntityDto extends BaseEntity> {

    list: () => Promise<TEntityDto[]>;

    get: (id: string) => Promise<TEntityDto>;
  
    create: (entity: TEntityDto) => Promise<TEntityDto>;

    update: (entity: TEntityDto) => Promise<TEntityDto>;

    delete: (id: string) => Promise<void>;

}

export default IEntityRepository;