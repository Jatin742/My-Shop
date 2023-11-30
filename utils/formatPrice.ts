export const formatPrice=(amount:number)=>{
    return new Intl.NumberFormat('en-In',{
        style:"currency",
        currency:"INR",
    }).format(amount);
}