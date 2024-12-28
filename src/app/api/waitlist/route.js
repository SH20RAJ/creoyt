


export const GET =()=>{

    return new Response("Hello World", {
        headers: {
            "content-type": "text/plain",
        },
    });
}