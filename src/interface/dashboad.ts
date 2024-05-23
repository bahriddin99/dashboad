export interface GetParams {
  start: string,
  end: string
  }
  
  export interface RequestDashboad {
    get_dashboad: (params: GetParams) => Promise<any>;
   
  }
  