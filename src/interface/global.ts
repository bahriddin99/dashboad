export interface ModalProps {
    open: boolean,
    handleClose:()=>void
}

export interface Header {
    title:string,
    value:string
}
export interface BodyItem {
    id: number,
    [key:string]:any
}

export interface TableProps {
    headers: Header[],
    body: BodyItem[],
    isLoading: boolean
}