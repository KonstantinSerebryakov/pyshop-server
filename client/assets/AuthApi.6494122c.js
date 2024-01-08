import{H as u,A as c}from"./index.c8a79a65.js";import{U as i,a as d,b as p,c as m}from"./ApiConstants.90e07401.js";import{eventBus as b,EVENT_AUTH as U}from"./event-bus.321b2154.js";import{u as f}from"./index.499e8ed9.js";import{A as l}from"./ApiService.6104b024.js";class I{static async register(o){const r=d,a=l.abortableRequest({method:"post",url:r,params:{[i]:!0},data:o}),n=a.requestPromise.then(t=>{const e=t.status,s=t.data;return e===u.Created&&s?{status:e,data:s}:{status:e,data:s}}).catch(t=>{if(t instanceof c&&t.response){const e=t.response.status,s=t.response.data;switch(e){case u.Conflict:break}return{status:e,data:s!=null?s:null}}return null});return{abort:a.abort,apiPromise:n}}static extractDeviceId(){return f().$state.deviceId}static async login(o){const r=p,a=l.abortableRequest({method:"post",url:r,params:{[i]:!0},data:{...o,deviceId:this.extractDeviceId()}}),n=a.requestPromise.then(t=>{const e=t.status,s=t.data;return e===u.Created&&s?(b.emit(U.LOGIN_SUCCESS,s),{status:e,data:s}):{status:e,data:null}}).catch(t=>{if(t instanceof c&&t.response){const e=t.response.status,s=t.response.data;switch(e){case u.NotFound:break;case u.Unauthorized:break}return{status:e,data:s!=null?s:null}}return Promise.resolve(null)});return{abort:a.abort,apiPromise:n}}static logout(o){if(!o)return;const r=m,a=l.abortableRequest({method:"post",url:r,params:{[i]:!0},data:{token:o}}),n=a.requestPromise.catch(t=>{if(t instanceof c&&t.response){const e=t.response.status,s=t.response.data;return{status:e,data:s!=null?s:null}}return Promise.resolve(null)});return{abort:a.abort,apiPromise:n}}}export{I as A};