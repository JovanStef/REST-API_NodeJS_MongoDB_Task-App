const calculateTip = (total, tipPrecent) => {
    const tip = total * tipPrecent;
    return total + tip;
};

const farenheitToCelsius = (farenheit) => {
    return (farenheit - 32) / 1.8;
};

const celsiusToFarenheit = (celsius) => {
    return (celsius * 1.8) + 32;
};

const add = (a,b)=>{
    return new Promise((res,rej)=>{
        setTimeout(()=>{
(a<0 || b<0)?'Numbers must be positive integers':res(a+b);
        },2000);
    })
}

module.exports = {
    calculateTip,
    farenheitToCelsius,
    celsiusToFarenheit,
    add
}