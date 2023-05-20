import {Decimal,decimal_init,set_debug_memory} from "mpdecimal.js";

set_debug_memory(true)

// Example to test if the memory is free
// https://javascript.plainenglish.io/javascript-finalizer-2859f0832f07

function prueba()
{
decimal_init(10)
let x=new Decimal("10")
process.stdout.write("x=")
x.print()

let y=new Decimal("2.5")
process.stdout.write("y=")
y.print()

let z= x.add(y)
process.stdout.write("z=")
z.print()

let w= x.sub(y)
process.stdout.write("w=")
w.print()

let a= x.mul(y)
process.stdout.write("a=")
a.print()

let b= x.div(y)
process.stdout.write("b=")
b.print()

let s= x.toString()
console.log(s)

}

prueba()

const registerFinalizer = new FinalizationRegistry(message => {
    console.log(message)
  });
  
  setInterval(function() {
    Bun.gc(true) // manually call the garbage collector
  }, 1000)