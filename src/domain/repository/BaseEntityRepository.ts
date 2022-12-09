import axios from "axios";
import EntityDto from "../dto/EntityDto";
// import BaseEntity from "./BaseEntity";
import ICrudEndpoints from "./ICrudEndpoints";
import IEntityRepository from "./IEntityRepository";

//class BaseEntityRepository<TEntityDto extends BaseEntity> implements IEntityRepository<TEntityDto> {
class BaseEntityRepository<TEntityDto extends EntityDto> implements IEntityRepository<TEntityDto> {

  public constructor(private crudEndpoints: ICrudEndpoints) {

  }

  // do we really need that?
  // protected convertEntity()

  public async list(): Promise<TEntityDto[]> {
    return await axios
          .get<TEntityDto[]>(this.crudEndpoints.listEndpoint())
          .then((response) => response.data);
  }
  
  public async get(id: string): Promise<TEntityDto> {
    return await axios
          .get<TEntityDto>(this.crudEndpoints.getEndpoint(id))
          .then((response) => response.data);
  }

  public async create(entity: TEntityDto): Promise<TEntityDto> {
    return await axios
          .post<TEntityDto>(this.crudEndpoints.createEndpoint(), entity)
          .then((response) => response.data);
  }

  public async update(entity: TEntityDto): Promise<TEntityDto> {
    return await axios
          .put<TEntityDto>(this.crudEndpoints.updateEndpoint(entity.id), entity)
          .then((response) => response.data);
  }

  public async delete(id: string): Promise<void> {
      await axios
          .delete<TEntityDto>(this.crudEndpoints.deleteEndpoint(id))
          .then((response) => response.data);
  }

}

export default BaseEntityRepository;