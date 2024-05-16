export interface ModalProps {
    open: boolean,
    handelClose:()=>void,
    item?:any
}

export interface Header {
    title:string,
    value:string
}
export interface BodyItem {
    id: string,
    [key:string]:any
}

export interface TableProps {
    headers: Header[],
    body: BodyItem[],
    isLoading: boolean,
    deleteItem:(id:string)=>void
    editeItem:(item:any)=>void
}