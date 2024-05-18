export interface GetParams {
  limit: number;
  page: number;
  owner_id?: string | undefined;
}
export interface PostService {
  name:string,
  // created_at: string;
  // id: string,
  // updated_at: string,
  price: number | string,
  owner_id?: string | undefined
}

export interface UpdatService extends PostService {
  id:string
}

export interface ServiceStore {
  data: any[];
  totalCount:number,
  isLoading: boolean
  getData: (params: GetParams) => Promise<any>;
  createData:(data: PostService) => Promise<any>;
  deletData:(id:string)=> Promise<any>;
  updateData:(data:UpdatService)=> Promise<any>;
}


export interface RequestServis {
  get_services: (params: GetParams) => any;
  get_delet: (id:string) => any;
  create_service: (data:PostService)=>any
  update_service: (data:UpdatService)=>Promise<any>
}
