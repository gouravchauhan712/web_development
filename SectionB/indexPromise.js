// promise

const checkAge = new Promise((resolve,reject)=>{
    let age = 2;
    if(age>=18){
        resolve("yes you can vote");
    }
    else{
        reject("sorry!, you can't vote!");
    }
})

checkAge.then(msg=>console.log(msg))
    .catch(error=> console.log(error))

await checkAge();