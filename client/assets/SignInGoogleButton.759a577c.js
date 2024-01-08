import{u as W,a as X}from"./use-dark.d31b8b89.js";import{m as Z,c as p,h as j,g as F,r as m,ay as J,d as A,w as G,o as L,D as K,z as w,E as $,C as P,a0 as f,B as _,H as C,I as k,aA as Y,_ as ee,aI as te,aJ as ae,A as N,u as se,J as oe,K as ne,aK as ie}from"./index.499e8ed9.js";import{Q as T,p as le}from"./throttle.b8de9102.js";const V=5,S=255,z=8,y=128,re=new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&._-])[A-Za-z\d@$!%*#?&._-]{8,128}$/),ue={true:"inset",item:"item-inset","item-thumbnail":"item-thumbnail-inset"},x={xs:2,sm:4,md:8,lg:16,xl:24};var Me=Z({name:"QSeparator",props:{...W,spaced:[Boolean,String],inset:[Boolean,String],vertical:Boolean,color:String,size:String},setup(t){const u=F(),e=X(t,u.proxy.$q),r=p(()=>t.vertical===!0?"vertical":"horizontal"),h=p(()=>` q-separator--${r.value}`),c=p(()=>t.inset!==!1?`${h.value}-${ue[t.inset]}`:""),o=p(()=>`q-separator${h.value}${c.value}`+(t.color!==void 0?` bg-${t.color}`:"")+(e.value===!0?" q-separator--dark":"")),s=p(()=>{const i={};if(t.size!==void 0&&(i[t.vertical===!0?"width":"height"]=t.size),t.spaced!==!1){const g=t.spaced===!0?`${x.md}px`:t.spaced in x?`${x[t.spaced]}px`:t.spaced,v=t.vertical===!0?["Left","Right"]:["Top","Bottom"];i[`margin${v[0]}`]=i[`margin${v[1]}`]=g}return i});return()=>j("hr",{class:o.value,style:s.value,"aria-orientation":r.value})}});function D(){const t=m("ERROR"),u=m(""),e=m(!1);function r(s){t.value="ERROR",s&&(u.value=s),c()}function h(s){t.value="ERROR",s&&(u.value=s),c()}function c(){e.value=!0}function o(){e.value=!1}return{type:t,message:u,isShowMessage:J(e),showError:r,showInfo:h,show:c,hide:o}}const ce={class:""},Se=A({__name:"EmailInput",setup(t,{expose:u}){const e=D();function r(n){e.message.value=n}const h=e.isShowMessage,c=e.message,o=m(!1),s=m({to:"/",label:"/"}),i=m("");function g(){let n="Input should be valid email";const d=i.value;d.length===0?n="Email should not be empty":d.length<V?n=`Email should be at least ${V} characters`:d.length>S&&(n=`Email should not be longer then ${S} symbols`),r(n)}function v(){r("This email is busy. try another or ")}function E(){r("Email or password are invalid. New user? ")}function b(){s.value.to="/signin",s.value.label="Sign In"}function a(){s.value.to="/signup",s.value.label="Sign Up"}function l(){o.value=!0}function I(){o.value=!1}G(i,(n,d)=>{I(),n.length>0&&!B.value?(g(),e.show()):e.hide()});function M(){e.show()}function H(){v(),M(),b(),l()}function O(){E(),M(),a(),l()}function U(){const n=B.value;return n||M(),n}const B=p(()=>{const n=i.value.toLowerCase().trim(),{testPattern:d}=le;return d.email(n)});return L(()=>{g()}),u({validate:U,value:p(()=>i.value.trim()),showEmailBusyError:H,showEmailInvalidError:O}),(n,d)=>{const q=K("router-link");return w(),$(T,{modelValue:i.value,"onUpdate:modelValue":d[0]||(d[0]=Q=>i.value=Q),label:"Email",type:"email",outlined:"","bottom-slots":"",error:f(h),maxlength:f(S)},{error:P(()=>[_("span",ce,[C(k(f(c))+" ",1),o.value?(w(),$(q,{key:0,to:s.value.to,class:"text-purple"},{default:P(()=>[C(k(s.value.label),1)]),_:1},8,["to"])):Y("",!0)])]),_:1},8,["modelValue","error","maxlength"])}}}),ye=A({__name:"PasswordInput",setup(t,{expose:u}){const e=D();function r(a){e.message.value=a}const h=e.isShowMessage,c=e.message,o=m("");function s(){let a="";const l=o.value;l.length===0?a="Password should not be empty":l.length<z?a=`Password should be at least ${z} characters`:l.match(/[A-Za-z]/)?l.match(/[0-9]/)?l.match(/[@$!%*#?&]/)?l.length>y&&(a=`Password should not be longer then ${y} symbols`):a="Password should include at least 1 special symbol: @$!%*#?&":a="Password should include at least 1 digit":a="Password should include at least 1 letter",r(a)}function i(){r("Email or password are invalid.")}G(o,(a,l)=>{a.length>0&&!b.value?(s(),e.show()):e.hide()});function g(){e.show()}function v(){i(),g()}function E(){const a=b.value;return a||g(),a}const b=p(()=>{const a=o.value.toLowerCase().trim();return re.test(a)});return L(()=>{s()}),u({validate:E,value:p(()=>o.value.trim()),showInvalidPasswordError:v}),(a,l)=>(w(),$(T,{modelValue:o.value,"onUpdate:modelValue":l[0]||(l[0]=I=>o.value=I),label:"Password",type:"password",outlined:"","bottom-slots":"",error:f(h),maxlength:f(y)},{error:P(()=>[C(k(f(c)),1)]),_:1},8,["modelValue","error","maxlength"]))}});const R=t=>(oe("data-v-0fb3763d"),t=t(),ne(),t),de=R(()=>_("div",{class:"gsi-material-button-state"},null,-1)),pe={class:"gsi-material-button-content-wrapper"},he={class:"gsi-material-button-icon"},ge={version:"1.1",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 48 48","xmlns:xlink":"http://www.w3.org/1999/xlink",style:{display:"block"}},me=ie('<path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" data-v-0fb3763d></path><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" data-v-0fb3763d></path><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" data-v-0fb3763d></path><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" data-v-0fb3763d></path><path fill="none" d="M0 0h48v48H0z" data-v-0fb3763d></path>',5),ve=[me],fe=R(()=>_("span",{class:"gsi-material-button-contents"},"Continue with Google",-1)),_e=R(()=>_("span",{style:{display:"none"}},"Continue with Google",-1)),we={__name:"SignInGoogleButton",setup(t){te(),ae();async function u(){const e=new URL("https://accounts.google.com/o/oauth2/v2/auth");e.searchParams.append("scope",["https://www.googleapis.com/auth/identitytoolkit","openid","email","https://www.googleapis.com/auth/userinfo.email"].join(" ")),e.searchParams.append("state",se().$state.deviceId.toString()),e.searchParams.append("response_type","code"),e.searchParams.append("redirect_uri","https://pyshop-konstantin-serebryakov-8ebd937f65cc.herokuapp.com/api/auth/google/callback"),e.searchParams.append("client_id","614117654748-dj87eb7khv1qts67imu3uglonfpt72bm.apps.googleusercontent.com"),e.searchParams.append("access_type","offline"),window.location.href=e.href}return(e,r)=>(w(),N("button",{onClick:u,class:"gsi-material-button"},[de,_("div",pe,[_("div",he,[(w(),N("svg",ge,ve))]),fe,_e])]))}};var xe=ee(we,[["__scopeId","data-v-0fb3763d"]]);export{Me as Q,xe as S,Se as _,ye as a};