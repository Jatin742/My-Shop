export const formatNumber=(digit:number)=>{
    return new Intl.NumberFormat('en-In').format(digit);
}