
export async function loginManul () {
    
    try{
        const res = await fetch("http://next.genzuni.website/api/auth/login",{
            method: "POST",
            body:JSON.stringify({
                email:"merasd@gmail.com",
                password:"11111"
            })
        })

        return res.json;
    }catch(err){
        return err;
    }

}