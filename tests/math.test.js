
const {calculateTip , farenheitToCelsius, celsiusToFarenheit, add} = require('../src/math')

// test('Hello-World' , ()=>{

// });

// test('calculateTip test', ()=>{
//     const total = calculateTip(10,3);
//    expect(total).toBe(40)
// });

// test('calculate farenheit' , ()=>{
//     const celsius = farenheitToCelsius(32);
//     expect(celsius).toBe(0);
// });

// test('calculate celsius' , ()=>{
//     const farenheit = celsiusToFarenheit(0);
//     expect(farenheit).toBe(32);
// });

// test('Async func test',(done)=>{
//         setTimeout(()=>{
//             expect(1).toBe(2);
//             done();
//         },2000);
// });

test('Test promisses with then' , (done)=>{
    add(2,3).then((sum)=>{
        expect(sum).toBe(5);
        done();
    });
});

test('Test promisses with async / await' , async ()=>{
    const sum = await add(2,3);
    expect(sum).toBe(5);
})