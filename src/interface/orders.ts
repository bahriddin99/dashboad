export interface GetParams {
    limit: number;
    page: number;
  }
  
  
  export interface OrdersStore {
    data: any[];
    totalCount: number
    isLoading: boolean
    getData: (params: GetParams) => Promise<any>;
    createData:(data:CreateOrders)=>Promise<any>;
    deletData:(id:string)=>Promise<any>;
    updateData:(data:UpdatOrders)=>Promise<any>;
  
  }
  export interface UpdatOrders {
    amount: number | string,
    client_id:string,
    service_id: string,
    id:string,
    status:string,

  }
  
  export interface CreateOrders {
    client_full_name: string,
    client_phone_number: string,
    service_id: string,
    amount: number | string,
  }
  export interface RequestOrders {
    get_orders: (params: GetParams) => Promise<any>;
    create_order:(data:CreateOrders)=>Promise<any>,
    delet_orders:(id:string)=>any;
    update_orders: (data:UpdatOrders) => Promise<any>,
   
  }
  