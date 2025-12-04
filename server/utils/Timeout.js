export const timeoutp = (promise,ms=4000)=>{
    return Promise.race([
        promise,
        new Promise((_,reject)=>
            setTimeout(()=>reject(new Error("Timeout after "+ ms + " ms")),ms)
        )
    ])
}