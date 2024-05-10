export interface GetParams {
  limit: number;
  page: number;
  owner_email: string | undefined;
}

export interface ServiceStore {
  data: any[];
  getData: (params: GetParams) => Promise<any>;
}

export interface RequestServis {
  get_services: (params: GetParams) => any;
}
