import { Decimal, decimal_init } from "mpdecimal.js";
//import { expect, test } from "bun:test";

decimal_init(10)

test("undefined", () => {
    let x = new Decimal()
    expect(
        x.toString()
    ).toBe("undefined");
    let y = new Decimal(2)
    expect(x.add(y).toString()).toBe("undefined");
    expect(y.add(x).toString()).toBe("undefined");
    expect(x.sub(y).toString()).toBe("undefined");
    expect(x.mul(y).toString()).toBe("undefined");
    expect(x.div(y).toString()).toBe("undefined");
})

test("2 + 2 = 4", () => {
    let x = new Decimal(2)
    let y = new Decimal('2')
    let z = x.add(y)
    expect(
        z.toString()
    ).toBe("4");
});

test("2.5 - 1.3 = 1.2", () => {
    let x = new Decimal(2.5)
    let y = new Decimal('1.3')
    let z = x.sub(y)
    expect(
        z.toString()
    ).toBe("1.2");
});

test("2.5 * 3.2 = 8", () => {
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

test("Json", () => {
    let x = new Decimal(10)
    expect(JSON.stringify(x)).toBe("\"10\"");
})

test("abs(-10)= 10", () => {
    let x = new Decimal(-10)
    let y = x.abs()
    expect(
        y.toString()
    ).toBe("10");
});


test("abs(10.5)= 10.5", () => {
    let x = new Decimal(10.5)
    let y = x.abs()
    expect(
        y.toString()
    ).toBe("10.5");
});

test("floor(10.5)= 10", () => {
    let x = new Decimal(10.5)
    let y = x.floor()
    expect(
        y.toString()
    ).toBe("10");
});

test("floor(-10.5)= -11", () => {
    let x = new Decimal(-10.5)
    let y = x.floor()
    expect(
        y.toString()
    ).toBe("-11");
});

test("ceil(10.5)= 11", () => {
    let x = new Decimal(10.5)
    let y = x.ceil()
    expect(
        y.toString()
    ).toBe("11");
});

test("ceil(-10.5)= -10", () => {
    let x = new Decimal(-10.5)
    let y = x.ceil()
    expect(
        y.toString()
    ).toBe("-10");
});

test("trunc(10.5)= 10", () => {
    let x = new Decimal(10.5)
    let y = x.trunc()
    expect(
        y.toString()
    ).toBe("10");
});

test("trunc(-10.5)= -10", () => {
    let x = new Decimal(-10.5)
    let y = x.trunc()
    expect(
        y.toString()
    ).toBe("-10");
});

test("1<2", () => {
    let x = new Decimal(1)
    let y = new Decimal(2)
    expect(x.cmp(y)).toBe(-1);
    expect(x.is_less_than(y)).toBe(true);
    expect(x.is_greater_than(y)).toBe(false);
    expect(x.is_equal_to(y)).toBe(false);
});

test("2<1", () => {
    let x = new Decimal(2)
    let y = new Decimal(1)
    expect(x.cmp(y)).toBe(1);
    expect(x.is_less_than(y)).toBe(false);
    expect(x.is_greater_than(y)).toBe(true);
    expect(x.is_equal_to(y)).toBe(false);
});

test("1==1", () => {
    let x = new Decimal(1)
    let y = new Decimal(1)
    expect(x.cmp(y)).toBe(0);
    expect(x.is_less_than(y)).toBe(false);
    expect(x.is_greater_than(y)).toBe(false);
    expect(x.is_equal_to(y)).toBe(true);
});


