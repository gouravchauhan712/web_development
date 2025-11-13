function sum(n1, n2){
    console.log(`Sum = ${n1+n2}`);
}
// sum(23,45);

const mul=(n1,n2)=>{
    console.log(`Multiply=${n1*n2}`);
}
// mul(23,44);

function calc(calculate){
    calculate(23,45);
}


calc(sum);
calc(mul);