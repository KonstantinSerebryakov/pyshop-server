import{k as d}from"./index.5e6f857f.js";const l="85aa0052-6db5-4e83-8e43-7236b9ed8175",p="v3";function i(t){var c;const e=["ru_RU","ru_UA","uk_UA","tr_TR","en_RU","en_US","he_IL","en_IL"],a="en_RU",o=(c=e.find(s=>s===t))!=null?c:a;let n="https://api-maps.yandex.ru/";return n+=p,n+="/?apikey=",n+=l,n+="&lang=",n+=o,n}let r=t=>{};function u(t){const e=document.createElement("script");return e.src=i(t),e.type="text/javascript",e.async=!0,e}var m=d(({app:t})=>{const e=u();e.onload=r;const o=document.documentElement.childNodes;o.item(o.length-1).appendChild(e)});const _=new Promise((t,e)=>{r=t});var h=Object.freeze(Object.defineProperty({__proto__:null,default:m,scriptLoaded:_},Symbol.toStringTag,{value:"Module"}));export{l as A,_ as s,h as y};