import ICrudEndpoints from "./ICrudEndpoints";

// is that useful?
class SimpleCrudEndpoints implements ICrudEndpoints {

  public constructor(private baseEndpoint: string) {

  }
  
  public listEndpoint(): string {
    return this.baseEndpoint;
  }

  public createEndpoint(): string {
    return this.baseEndpoint;
  }

  public getEndpoint(id: string): string {
    return this.baseEndpoint + id;
  }

  public updateEndpoint(id: string): string {
    return this.baseEndpoint + id;
  }

  public deleteEndpoint(id: string): string {
    return this.baseEndpoint + id;
  }
  
}

export default SimpleCrudEndpoints;