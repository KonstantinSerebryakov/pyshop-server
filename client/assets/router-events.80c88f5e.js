import{k as p}from"./index.cc854539.js";import{EVENT_AUTH as u}from"./event-bus.3db7307f.js";var l=p(({app:s,store:i,router:t})=>{const o=s.config.globalProperties.$eventBus;o.on(u.LOGIN_SUCCESS,a=>{var r,n;const c=(n=(r=t.currentRoute.value.query.from)==null?void 0:r.toString())!=null?n:"/";t.push(c)}),o.on(u.LOGOUT_SUCCESS,()=>{const e=`/signin?from=${t.currentRoute.value.path}`;t.push(e)})});export{l as default};
