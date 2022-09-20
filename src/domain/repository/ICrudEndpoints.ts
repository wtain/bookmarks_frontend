
interface ICrudEndpoints {
  listEndpoint: () => string;
  
  getEndpoint: (id: string) => string;

  createEndpoint: () => string;

  updateEndpoint: (id: string) => string;
  
  deleteEndpoint: (id: string) => string;
}

export default ICrudEndpoints;