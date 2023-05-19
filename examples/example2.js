import {Decimal,decimal_init} from "mpdecimal.js";

decimal_init(10)
let x=new Decimal("10")
x.print()

let y=new Decimal("2.5")
y.print()

let z= x.add(y)
z.print()

let w= x.sub(y)
w.print()

let a= x.mul(y)
a.print()

let b= x.div(y)
b.print()