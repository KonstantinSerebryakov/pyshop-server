import{c as v,h as $}from"./render.a82d6ee1.js";import{i as g,q as s,s as k,J as F,c as d,h as P,g as _,d as y,a1 as q,_ as C,r as m,M as u,W as p,V as i,S as r,F as x,X as B,U as Q,N as E,O as S,f as b}from"./index.2b1ca1d5.js";var j=v({name:"QPage",props:{padding:Boolean,styleFn:Function},setup(e,{slots:n}){const{proxy:{$q:c}}=_(),t=g(k,s);if(t===s)return console.error("QPage needs to be a deep child of QLayout"),s;if(g(F,s)===s)return console.error("QPage needs to be child of QPageContainer"),s;const l=d(()=>{const a=(t.header.space===!0?t.header.size:0)+(t.footer.space===!0?t.footer.size:0);if(typeof e.styleFn=="function"){const h=t.isContainer.value===!0?t.containerHeight.value:c.screen.height;return e.styleFn(a,h)}return{minHeight:t.isContainer.value===!0?t.containerHeight.value-a+"px":c.screen.height===0?a!==0?`calc(100vh - ${a}px)`:"100vh":c.screen.height-a+"px"}}),o=d(()=>`q-page${e.padding===!0?" q-layout-padding":""}`);return()=>P("main",{class:o.value,style:l.value},$(n.default))}});function H(){const e=m(0);function n(){return e.value+=1,e.value}return{clickCount:e,increment:n}}function I(e){return{todoCount:d(()=>e.value.length)}}const N=y({name:"ExampleComponent",props:{title:{type:String,required:!0},todos:{type:Array,default:()=>[]},meta:{type:Object,required:!0},active:{type:Boolean}},setup(e){return{...H(),...I(q(e,"todos"))}}});function V(e,n,c,t,f,l){return u(),p("div",null,[i("p",null,r(e.title),1),i("ul",null,[(u(!0),p(x,null,B(e.todos,o=>(u(),p("li",{key:o.id,onClick:n[0]||(n[0]=(...a)=>e.increment&&e.increment(...a))},r(o.id)+" - "+r(o.content),1))),128))]),i("p",null,"Count: "+r(e.todoCount)+" / "+r(e.meta.totalCount),1),i("p",null,"Active: "+r(e.active?"yes":"no"),1),i("p",null,"Clicks on todos: "+r(e.clickCount),1)])}var w=C(N,[["render",V]]);const z=y({name:"IndexPage",components:{ExampleComponent:w},setup(){const e=m([{id:1,content:"ct1"},{id:2,content:"ct2"},{id:3,content:"ct3"},{id:4,content:"ct4"},{id:5,content:"ct5"}]),n=m({totalCount:1200});return{todos:e,meta:n}}});function A(e,n,c,t,f,l){const o=Q("example-component");return u(),E(j,{class:"row items-center justify-evenly"},{default:S(()=>[b(o,{title:"Example component",active:"",todos:e.todos,meta:e.meta},null,8,["todos","meta"])]),_:1})}var L=C(z,[["render",A]]);export{L as default};
