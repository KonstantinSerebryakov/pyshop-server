var m=Object.defineProperty;var p=(e,a,s)=>a in e?m(e,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[a]=s;var t=(e,a,s)=>(p(e,typeof a!="symbol"?a+"":a,s),s);import{Q as c,a as u,b as h,c as _}from"./QPage.c1ad0483.js";import{b as r}from"./QBtn.eaac0ed6.js";import{_ as b,d as f,r as g,z as x,A as Q,B as d,E as n,j as o,D as B}from"./index.cc854539.js";import"./dom.8a48b212.js";class i{constructor(a){t(this,"id");t(this,"userId");t(this,"name");t(this,"phone");t(this,"address");t(this,"about");this.id=a.id,this.userId=a.userId,this.name=a.name,this.phone=a.phone,this.address=a.address,this.about=a.about}static get Empty(){return new i({})}getUpdate(){return{name:this.name,phone:this.phone,address:this.address,about:this.about}}}const V=f({name:"IndexPage",setup(){return{data:g(i.Empty)}}}),y={class:"q-mx-auto",style:{"max-width":"600px"}},C=n("div",{class:"text-h5"},"Name",-1),N=n("span",{class:""},B("err"),-1);function $(e,a,s,q,v,w){return x(),Q(c,{class:"q-pt-md"},{default:d(()=>[n("div",y,[o(_,{class:"col-12 q-pa-md"},{default:d(()=>[C,o(u,{modelValue:e.data.name,"onUpdate:modelValue":a[0]||(a[0]=l=>e.data.name=l),label:"Name",outlined:"","bottom-slots":"",error:!0,maxlength:255},{error:d(()=>[N]),_:1},8,["modelValue"]),o(h,null,{default:d(()=>[o(r,{label:"submit changes"}),o(r,{label:"reset changes"}),o(r,{label:"clear info"})]),_:1})]),_:1})])]),_:1})}var U=b(V,[["render",$]]);export{U as default};
