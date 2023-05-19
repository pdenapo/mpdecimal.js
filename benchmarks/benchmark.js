import { run, bench, group, baseline } from 'mitata';
import {Decimal,decimal_init} from "mpdecimal.js";
import {Decimal as Decimal_decimal_js} from  'decimal.js';

decimal_init(10)

function suma_de_1_al_1000()
{
  let s=new Decimal(0)
  for (let k=1;k<=1000;k++)
  {
    let x=new Decimal(k)
    //console.log(x.toString())
    s=s.add(x)
  }
  //console.log("s usando_mp_decimal=",s.toString())
  return s     
} 

function suma_de_1_al_1000_usando_decimal_js()
{
  let s=new Decimal_decimal_js(0)
  for (let k=1;k<=1000;k++)
  {
    let x=new Decimal_decimal_js(k)
    //console.log(x.toString())
    s=s.add(x)
  }
  //console.log("s usando_decimal_js=",s.toString())
  return s     
}

function factorial()
{
  let s=new Decimal(1)
  for (let k=1;k<=10;k++)
  {
    let x=new Decimal(k)
    //console.log(x.toString())
    s=s.mul(x)
  }
  //console.log("s usando_mp_decimal=",s.toString())
  return s     
}

function factorial_usando_decimal_js()
{
  let s=new Decimal_decimal_js(1)
  for (let k=1;k<=10;k++)
  {
    let x=new Decimal_decimal_js(k)
    //console.log(x.toString())
    s=s.mul(x)
  }
  //console.log("s usando_mp_decimal=",s.toString())
  return s     
}


bench('suma del 1 al 1000', suma_de_1_al_1000);
bench('suma del 1 al 1000 usando decimal.js', suma_de_1_al_1000_usando_decimal_js);

bench('factorial', suma_de_1_al_1000);
bench('factorial usando decimal.js', suma_de_1_al_1000_usando_decimal_js);


await run()