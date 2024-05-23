import  Cookies from  "js-cookie"


export const getDataFromCookie = (title:string)=>{
    return Cookies.get(title)
}

export const setDataToCookie =(title:string, data:string)=>{
    Cookies.set(title,data)
}
export const removeMultipleCookies =(cookies:[string, string, string])=>{
    cookies.forEach(cookies => removeDataToCookie(cookies))
}
export const removeDataToCookie =(title:string)=>{
    Cookies.remove(title)
}

export const isAuthenticated =(): boolean=>{
    return !! getDataFromCookie('access_token')}