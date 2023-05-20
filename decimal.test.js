import {Decimal,decimal_init} from "mpdecimal.js";
import { expect, test } from "bun:test";

decimal_init(10)

test("undefined",()=>{
    let x = new Decimal()
    expect(
        x.toString()
    ).toBe("undefined");
    let y = new Decimal(2)
    expect(x.add(y).toString() ).toBe("undefined");
    expect(y.add(x).toString() ).toBe("undefined");
    expect(x.sub(y).toString() ).toBe("undefined");
    expect(x.mul(y).toString() ).toBe("undefined");
    expect(x.div(y).toString() ).toBe("undefined");
})

test("2 + 2=4", () => {
    let x = new Decimal(2)
    let y = new Decimal('2')
    let z = x.add(y)
    console.log("vivo")
    expect(
        z.toString()
    ).toBe("4");
});

test("2.5 - 1.3=1.2", () => {
    let x = new Decimal(2.5)
    let y = new Decimal('1.3')
    let z = x.sub(y)
    expect(
        z.toString()
    ).toBe("1.2");
});

test("2.5 * 3.2= 8", () => {
    let x = new Decimal(2.5)
    let y = new Decimal('3.2')
    let z = x.mul(y)
    expect(
        z.toString()
    ).toBe("8.00");
});

test("10 /2 = 5", () => {
    let x = new Decimal(10)
    let y = new Decimal('2')
    let z = x.div(y)
    expect(
        z.toString()
    ).toBe("5");
});