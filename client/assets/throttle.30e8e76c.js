import{m as ne,aF as Be,aG as Ee,c as y,h as k,n as Y,r as L,P as $e,ak as Se,as as Me,o as ie,g as J,al as Pe,$ as fe,M as W,aH as qe,i as Te,w as U,q as se,ar as Oe,ag as Re,at as Ie,x as je,ab as ee,a4 as me,a2 as ze,a1 as De,ax as Ne,am as Le,aw as he}from"./index.3fa07472.js";import{u as Fe,a as Ae}from"./use-dark.ef4c9cfb.js";var mt=ne({name:"QCardActions",props:{...Be,vertical:Boolean},setup(e,{slots:t}){const u=Ee(e),i=y(()=>`q-card__actions ${u.value} q-card__actions--${e.vertical===!0?"vert column":"horiz row"}`);return()=>k("div",{class:i.value},Y(t.default))}});let G=[],te=[];function Ve(e){te=te.filter(t=>t!==e)}function ht(e){Ve(e),te.push(e)}function bt(e){Ve(e),te.length===0&&G.length!==0&&(G[G.length-1](),G=[])}function ge(e){te.length===0?e():G.push(e)}function Ue(e){G=G.filter(t=>t!==e)}var pt=ne({name:"QForm",props:{autofocus:Boolean,noErrorFocus:Boolean,noResetFocus:Boolean,greedy:Boolean,onSubmit:Function},emits:["reset","validationSuccess","validationError"],setup(e,{slots:t,emit:u}){const i=J(),s=L(null);let f=0;const c=[];function x(v){const A=typeof v=="boolean"?v:e.noErrorFocus!==!0,D=++f,I=(F,V)=>{u("validation"+(F===!0?"Success":"Error"),V)},j=F=>{const V=F.validate();return typeof V.then=="function"?V.then(_=>({valid:_,comp:F}),_=>({valid:!1,comp:F,err:_})):Promise.resolve({valid:V,comp:F})};return(e.greedy===!0?Promise.all(c.map(j)).then(F=>F.filter(V=>V.valid!==!0)):c.reduce((F,V)=>F.then(()=>j(V).then(_=>{if(_.valid===!1)return Promise.reject(_)})),Promise.resolve()).catch(F=>[F])).then(F=>{if(F===void 0||F.length===0)return D===f&&I(!0),!0;if(D===f){const{comp:V,err:_}=F[0];if(_!==void 0&&console.error(_),I(!1,V),A===!0){const S=F.find(({comp:w})=>typeof w.focus=="function"&&Pe(w.$)===!1);S!==void 0&&S.comp.focus()}}return!1})}function $(){f++,c.forEach(v=>{typeof v.resetValidation=="function"&&v.resetValidation()})}function q(v){v!==void 0&&fe(v);const A=f+1;x().then(D=>{A===f&&D===!0&&(e.onSubmit!==void 0?u("submit",v):v!==void 0&&v.target!==void 0&&typeof v.target.submit=="function"&&v.target.submit())})}function C(v){v!==void 0&&fe(v),u("reset"),W(()=>{$(),e.autofocus===!0&&e.noResetFocus!==!0&&g()})}function g(){ge(()=>{if(s.value===null)return;const v=s.value.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]")||s.value.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]")||s.value.querySelector("[autofocus], [data-autofocus]")||Array.prototype.find.call(s.value.querySelectorAll("[tabindex]"),A=>A.tabIndex>-1);v!=null&&v.focus({preventScroll:!0})})}$e(qe,{bindComponent(v){c.push(v)},unbindComponent(v){const A=c.indexOf(v);A>-1&&c.splice(A,1)}});let Q=!1;return Se(()=>{Q=!0}),Me(()=>{Q===!0&&e.autofocus===!0&&g()}),ie(()=>{e.autofocus===!0&&g()}),Object.assign(i.proxy,{validate:x,resetValidation:$,submit:q,reset:C,focus:g,getValidationComponents:()=>c}),()=>k("form",{class:"q-form",ref:s,onSubmit:q,onReset:C},Y(t.default))}}),yt=ne({name:"QCard",props:{...Fe,tag:{type:String,default:"div"},square:Boolean,flat:Boolean,bordered:Boolean},setup(e,{slots:t}){const{proxy:{$q:u}}=J(),i=Ae(e,u),s=y(()=>"q-card"+(i.value===!0?" q-card--dark q-dark":"")+(e.bordered===!0?" q-card--bordered":"")+(e.square===!0?" q-card--square no-border-radius":"")+(e.flat===!0?" q-card--flat no-shadow":""));return()=>k(e.tag,{class:s.value},Y(t.default))}});function Ze({validate:e,resetValidation:t,requiresQForm:u}){const i=Te(qe,!1);if(i!==!1){const{props:s,proxy:f}=J();Object.assign(f,{validate:e,resetValidation:t}),U(()=>s.disable,c=>{c===!0?(typeof t=="function"&&t(),i.unbindComponent(f)):i.bindComponent(f)}),ie(()=>{s.disable!==!0&&i.bindComponent(f)}),se(()=>{s.disable!==!0&&i.unbindComponent(f)})}else u===!0&&console.error("Parent QForm not found on useFormChild()!")}const be=/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/,pe=/^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/,ye=/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,ae=/^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/,oe=/^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/,re={date:e=>/^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(e),time:e=>/^([0-1]?\d|2[0-3]):[0-5]\d$/.test(e),fulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(e),timeOrFulltime:e=>/^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(e),email:e=>/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(e),hexColor:e=>be.test(e),hexaColor:e=>pe.test(e),hexOrHexaColor:e=>ye.test(e),rgbColor:e=>ae.test(e),rgbaColor:e=>oe.test(e),rgbOrRgbaColor:e=>ae.test(e)||oe.test(e),hexOrRgbColor:e=>be.test(e)||ae.test(e),hexaOrRgbaColor:e=>pe.test(e)||oe.test(e),anyColor:e=>ye.test(e)||ae.test(e)||oe.test(e)};var kt={testPattern:re};const Ke=[!0,!1,"ondemand"],Qe={modelValue:{},error:{type:Boolean,default:null},errorMessage:String,noErrorIcon:Boolean,rules:Array,reactiveRules:Boolean,lazyRules:{type:[Boolean,String],validator:e=>Ke.includes(e)}};function He(e,t){const{props:u,proxy:i}=J(),s=L(!1),f=L(null),c=L(null);Ze({validate:A,resetValidation:v});let x=0,$;const q=y(()=>u.rules!==void 0&&u.rules!==null&&u.rules.length!==0),C=y(()=>u.disable!==!0&&q.value===!0),g=y(()=>u.error===!0||s.value===!0),Q=y(()=>typeof u.errorMessage=="string"&&u.errorMessage.length!==0?u.errorMessage:f.value);U(()=>u.modelValue,()=>{D()}),U(()=>u.reactiveRules,j=>{j===!0?$===void 0&&($=U(()=>u.rules,()=>{D(!0)})):$!==void 0&&($(),$=void 0)},{immediate:!0}),U(e,j=>{j===!0?c.value===null&&(c.value=!1):c.value===!1&&(c.value=!0,C.value===!0&&u.lazyRules!=="ondemand"&&t.value===!1&&I())});function v(){x++,t.value=!1,c.value=null,s.value=!1,f.value=null,I.cancel()}function A(j=u.modelValue){if(C.value!==!0)return!0;const E=++x,F=t.value!==!0?()=>{c.value=!0}:()=>{},V=(S,w)=>{S===!0&&F(),s.value=S,f.value=w||null,t.value=!1},_=[];for(let S=0;S<u.rules.length;S++){const w=u.rules[S];let O;if(typeof w=="function"?O=w(j,re):typeof w=="string"&&re[w]!==void 0&&(O=re[w](j)),O===!1||typeof O=="string")return V(!0,O),!1;O!==!0&&O!==void 0&&_.push(O)}return _.length===0?(V(!1),!0):(t.value=!0,Promise.all(_).then(S=>{if(S===void 0||Array.isArray(S)===!1||S.length===0)return E===x&&V(!1),!0;const w=S.find(O=>O===!1||typeof O=="string");return E===x&&V(w!==void 0,w),w===void 0},S=>(E===x&&(console.error(S),V(!0)),!1)))}function D(j){C.value===!0&&u.lazyRules!=="ondemand"&&(c.value===!0||u.lazyRules!==!0&&j!==!0)&&I()}const I=Oe(A,0);return se(()=>{$!==void 0&&$(),I.cancel()}),Object.assign(i,{resetValidation:v,validate:A}),Re(i,"hasError",()=>g.value),{isDirtyModel:c,hasRules:q,hasError:g,errorMessage:Q,validate:A,resetValidation:v}}const ke=/^on[A-Z]/;function We(e,t){const u={listeners:L({}),attributes:L({})};function i(){const s={},f={};for(const c in e)c!=="class"&&c!=="style"&&ke.test(c)===!1&&(s[c]=e[c]);for(const c in t.props)ke.test(c)===!0&&(f[c]=t.props[c]);u.attributes.value=s,u.listeners.value=f}return Ie(i),i(),u}let de,le=0;const z=new Array(256);for(let e=0;e<256;e++)z[e]=(e+256).toString(16).substring(1);const Ye=(()=>{const e=typeof crypto!="undefined"?crypto:typeof window!="undefined"?window.crypto||window.msCrypto:void 0;if(e!==void 0){if(e.randomBytes!==void 0)return e.randomBytes;if(e.getRandomValues!==void 0)return t=>{const u=new Uint8Array(t);return e.getRandomValues(u),u}}return t=>{const u=[];for(let i=t;i>0;i--)u.push(Math.floor(Math.random()*256));return u}})(),xe=4096;function Ge(){(de===void 0||le+16>xe)&&(le=0,de=Ye(xe));const e=Array.prototype.slice.call(de,le,le+=16);return e[6]=e[6]&15|64,e[8]=e[8]&63|128,z[e[0]]+z[e[1]]+z[e[2]]+z[e[3]]+"-"+z[e[4]]+z[e[5]]+"-"+z[e[6]]+z[e[7]]+"-"+z[e[8]]+z[e[9]]+"-"+z[e[10]]+z[e[11]]+z[e[12]]+z[e[13]]+z[e[14]]+z[e[15]]}function ce(e){return e===void 0?`f_${Ge()}`:e}function ve(e){return e!=null&&(""+e).length!==0}const Je={...Fe,...Qe,label:String,stackLabel:Boolean,hint:String,hideHint:Boolean,prefix:String,suffix:String,labelColor:String,color:String,bgColor:String,filled:Boolean,outlined:Boolean,borderless:Boolean,standout:[Boolean,String],square:Boolean,loading:Boolean,labelSlot:Boolean,bottomSlots:Boolean,hideBottomSpace:Boolean,rounded:Boolean,dense:Boolean,itemAligned:Boolean,counter:Boolean,clearable:Boolean,clearIcon:String,disable:Boolean,readonly:Boolean,autofocus:Boolean,for:String,maxlength:[Number,String]},Xe=["update:modelValue","clear","focus","blur","popupShow","popupHide"];function et(){const{props:e,attrs:t,proxy:u,vnode:i}=J();return{isDark:Ae(e,u.$q),editable:y(()=>e.disable!==!0&&e.readonly!==!0),innerLoading:L(!1),focused:L(!1),hasPopupOpen:!1,splitAttrs:We(t,i),targetUid:L(ce(e.for)),rootRef:L(null),targetRef:L(null),controlRef:L(null)}}function tt(e){const{props:t,emit:u,slots:i,attrs:s,proxy:f}=J(),{$q:c}=f;let x=null;e.hasValue===void 0&&(e.hasValue=y(()=>ve(t.modelValue))),e.emitValue===void 0&&(e.emitValue=n=>{u("update:modelValue",n)}),e.controlEvents===void 0&&(e.controlEvents={onFocusin:l,onFocusout:o}),Object.assign(e,{clearValue:d,onControlFocusin:l,onControlFocusout:o,focus:w}),e.computedCounter===void 0&&(e.computedCounter=y(()=>{if(t.counter!==!1){const n=typeof t.modelValue=="string"||typeof t.modelValue=="number"?(""+t.modelValue).length:Array.isArray(t.modelValue)===!0?t.modelValue.length:0,p=t.maxlength!==void 0?t.maxlength:t.maxValues;return n+(p!==void 0?" / "+p:"")}}));const{isDirtyModel:$,hasRules:q,hasError:C,errorMessage:g,resetValidation:Q}=He(e.focused,e.innerLoading),v=e.floatingLabel!==void 0?y(()=>t.stackLabel===!0||e.focused.value===!0||e.floatingLabel.value===!0):y(()=>t.stackLabel===!0||e.focused.value===!0||e.hasValue.value===!0),A=y(()=>t.bottomSlots===!0||t.hint!==void 0||q.value===!0||t.counter===!0||t.error!==null),D=y(()=>t.filled===!0?"filled":t.outlined===!0?"outlined":t.borderless===!0?"borderless":t.standout?"standout":"standard"),I=y(()=>`q-field row no-wrap items-start q-field--${D.value}`+(e.fieldClass!==void 0?` ${e.fieldClass.value}`:"")+(t.rounded===!0?" q-field--rounded":"")+(t.square===!0?" q-field--square":"")+(v.value===!0?" q-field--float":"")+(E.value===!0?" q-field--labeled":"")+(t.dense===!0?" q-field--dense":"")+(t.itemAligned===!0?" q-field--item-aligned q-item-type":"")+(e.isDark.value===!0?" q-field--dark":"")+(e.getControl===void 0?" q-field--auto-height":"")+(e.focused.value===!0?" q-field--focused":"")+(C.value===!0?" q-field--error":"")+(C.value===!0||e.focused.value===!0?" q-field--highlighted":"")+(t.hideBottomSpace!==!0&&A.value===!0?" q-field--with-bottom":"")+(t.disable===!0?" q-field--disabled":t.readonly===!0?" q-field--readonly":"")),j=y(()=>"q-field__control relative-position row no-wrap"+(t.bgColor!==void 0?` bg-${t.bgColor}`:"")+(C.value===!0?" text-negative":typeof t.standout=="string"&&t.standout.length!==0&&e.focused.value===!0?` ${t.standout}`:t.color!==void 0?` text-${t.color}`:"")),E=y(()=>t.labelSlot===!0||t.label!==void 0),F=y(()=>"q-field__label no-pointer-events absolute ellipsis"+(t.labelColor!==void 0&&C.value!==!0?` text-${t.labelColor}`:"")),V=y(()=>({id:e.targetUid.value,editable:e.editable.value,focused:e.focused.value,floatingLabel:v.value,modelValue:t.modelValue,emitValue:e.emitValue})),_=y(()=>{const n={for:e.targetUid.value};return t.disable===!0?n["aria-disabled"]="true":t.readonly===!0&&(n["aria-readonly"]="true"),n});U(()=>t.for,n=>{e.targetUid.value=ce(n)});function S(){const n=document.activeElement;let p=e.targetRef!==void 0&&e.targetRef.value;p&&(n===null||n.id!==e.targetUid.value)&&(p.hasAttribute("tabindex")===!0||(p=p.querySelector("[tabindex]")),p&&p!==n&&p.focus({preventScroll:!0}))}function w(){ge(S)}function O(){Ue(S);const n=document.activeElement;n!==null&&e.rootRef.value.contains(n)&&n.blur()}function l(n){x!==null&&(clearTimeout(x),x=null),e.editable.value===!0&&e.focused.value===!1&&(e.focused.value=!0,u("focus",n))}function o(n,p){x!==null&&clearTimeout(x),x=setTimeout(()=>{x=null,!(document.hasFocus()===!0&&(e.hasPopupOpen===!0||e.controlRef===void 0||e.controlRef.value===null||e.controlRef.value.contains(document.activeElement)!==!1))&&(e.focused.value===!0&&(e.focused.value=!1,u("blur",n)),p!==void 0&&p())})}function d(n){fe(n),c.platform.is.mobile!==!0?(e.targetRef!==void 0&&e.targetRef.value||e.rootRef.value).focus():e.rootRef.value.contains(document.activeElement)===!0&&document.activeElement.blur(),t.type==="file"&&(e.inputRef.value.value=null),u("update:modelValue",null),u("clear",t.modelValue),W(()=>{Q(),c.platform.is.mobile!==!0&&($.value=!1)})}function r(){const n=[];return i.prepend!==void 0&&n.push(k("div",{class:"q-field__prepend q-field__marginal row no-wrap items-center",key:"prepend",onClick:ee},i.prepend())),n.push(k("div",{class:"q-field__control-container col relative-position row no-wrap q-anchor--skip"},h())),C.value===!0&&t.noErrorIcon===!1&&n.push(R("error",[k(me,{name:c.iconSet.field.error,color:"negative"})])),t.loading===!0||e.innerLoading.value===!0?n.push(R("inner-loading-append",i.loading!==void 0?i.loading():[k(ze,{color:t.color})])):t.clearable===!0&&e.hasValue.value===!0&&e.editable.value===!0&&n.push(R("inner-clearable-append",[k(me,{class:"q-field__focusable-action",tag:"button",name:t.clearIcon||c.iconSet.field.clear,tabindex:0,type:"button","aria-hidden":null,role:null,onClick:d})])),i.append!==void 0&&n.push(k("div",{class:"q-field__append q-field__marginal row no-wrap items-center",key:"append",onClick:ee},i.append())),e.getInnerAppend!==void 0&&n.push(R("inner-append",e.getInnerAppend())),e.getControlChild!==void 0&&n.push(e.getControlChild()),n}function h(){const n=[];return t.prefix!==void 0&&t.prefix!==null&&n.push(k("div",{class:"q-field__prefix no-pointer-events row items-center"},t.prefix)),e.getShadowControl!==void 0&&e.hasShadow.value===!0&&n.push(e.getShadowControl()),e.getControl!==void 0?n.push(e.getControl()):i.rawControl!==void 0?n.push(i.rawControl()):i.control!==void 0&&n.push(k("div",{ref:e.targetRef,class:"q-field__native row",tabindex:-1,...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0},i.control(V.value))),E.value===!0&&n.push(k("div",{class:F.value},Y(i.label,t.label))),t.suffix!==void 0&&t.suffix!==null&&n.push(k("div",{class:"q-field__suffix no-pointer-events row items-center"},t.suffix)),n.concat(Y(i.default))}function m(){let n,p;C.value===!0?g.value!==null?(n=[k("div",{role:"alert"},g.value)],p=`q--slot-error-${g.value}`):(n=Y(i.error),p="q--slot-error"):(t.hideHint!==!0||e.focused.value===!0)&&(t.hint!==void 0?(n=[k("div",t.hint)],p=`q--slot-hint-${t.hint}`):(n=Y(i.hint),p="q--slot-hint"));const Z=t.counter===!0||i.counter!==void 0;if(t.hideBottomSpace===!0&&Z===!1&&n===void 0)return;const M=k("div",{key:p,class:"q-field__messages col"},n);return k("div",{class:"q-field__bottom row items-start q-field__bottom--"+(t.hideBottomSpace!==!0?"animated":"stale"),onClick:ee},[t.hideBottomSpace===!0?M:k(De,{name:"q-transition--field-message"},()=>M),Z===!0?k("div",{class:"q-field__counter"},i.counter!==void 0?i.counter():e.computedCounter.value):null])}function R(n,p){return p===null?null:k("div",{key:n,class:"q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"},p)}let b=!1;return Se(()=>{b=!0}),Me(()=>{b===!0&&t.autofocus===!0&&f.focus()}),ie(()=>{je.value===!0&&t.for===void 0&&(e.targetUid.value=ce()),t.autofocus===!0&&f.focus()}),se(()=>{x!==null&&clearTimeout(x)}),Object.assign(f,{focus:w,blur:O}),function(){const p=e.getControl===void 0&&i.control===void 0?{...e.splitAttrs.attributes.value,"data-autofocus":t.autofocus===!0||void 0,..._.value}:_.value;return k("label",{ref:e.rootRef,class:[I.value,s.class],style:s.style,...p},[i.before!==void 0?k("div",{class:"q-field__before q-field__marginal row no-wrap items-center",onClick:ee},i.before()):null,k("div",{class:"q-field__inner relative-position col self-stretch"},[k("div",{ref:e.controlRef,class:j.value,tabindex:-1,...e.controlEvents},r()),A.value===!0?m():null]),i.after!==void 0?k("div",{class:"q-field__after q-field__marginal row no-wrap items-center",onClick:ee},i.after()):null])}}const Ce={date:"####/##/##",datetime:"####/##/## ##:##",time:"##:##",fulltime:"##:##:##",phone:"(###) ### - ####",card:"#### #### #### ####"},ue={"#":{pattern:"[\\d]",negate:"[^\\d]"},S:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]"},N:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]"},A:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleUpperCase()},a:{pattern:"[a-zA-Z]",negate:"[^a-zA-Z]",transform:e=>e.toLocaleLowerCase()},X:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleUpperCase()},x:{pattern:"[0-9a-zA-Z]",negate:"[^0-9a-zA-Z]",transform:e=>e.toLocaleLowerCase()}},_e=Object.keys(ue);_e.forEach(e=>{ue[e].regex=new RegExp(ue[e].pattern)});const nt=new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|(["+_e.join("")+"])|(.)","g"),we=/[.*+?^${}()|[\]\\]/g,P=String.fromCharCode(1),at={mask:String,reverseFillMask:Boolean,fillMask:[Boolean,String],unmaskedValue:Boolean};function ot(e,t,u,i){let s,f,c,x,$,q;const C=L(null),g=L(v());function Q(){return e.autogrow===!0||["textarea","text","search","url","tel","password"].includes(e.type)}U(()=>e.type+e.autogrow,D),U(()=>e.mask,l=>{if(l!==void 0)I(g.value,!0);else{const o=w(g.value);D(),e.modelValue!==o&&t("update:modelValue",o)}}),U(()=>e.fillMask+e.reverseFillMask,()=>{C.value===!0&&I(g.value,!0)}),U(()=>e.unmaskedValue,()=>{C.value===!0&&I(g.value)});function v(){if(D(),C.value===!0){const l=_(w(e.modelValue));return e.fillMask!==!1?O(l):l}return e.modelValue}function A(l){if(l<s.length)return s.slice(-l);let o="",d=s;const r=d.indexOf(P);if(r>-1){for(let h=l-d.length;h>0;h--)o+=P;d=d.slice(0,r)+o+d.slice(r)}return d}function D(){if(C.value=e.mask!==void 0&&e.mask.length!==0&&Q(),C.value===!1){x=void 0,s="",f="";return}const l=Ce[e.mask]===void 0?e.mask:Ce[e.mask],o=typeof e.fillMask=="string"&&e.fillMask.length!==0?e.fillMask.slice(0,1):"_",d=o.replace(we,"\\$&"),r=[],h=[],m=[];let R=e.reverseFillMask===!0,b="",n="";l.replace(nt,(T,a,B,H,K)=>{if(H!==void 0){const N=ue[H];m.push(N),n=N.negate,R===!0&&(h.push("(?:"+n+"+)?("+N.pattern+"+)?(?:"+n+"+)?("+N.pattern+"+)?"),R=!1),h.push("(?:"+n+"+)?("+N.pattern+")?")}else if(B!==void 0)b="\\"+(B==="\\"?"":B),m.push(B),r.push("([^"+b+"]+)?"+b+"?");else{const N=a!==void 0?a:K;b=N==="\\"?"\\\\\\\\":N.replace(we,"\\\\$&"),m.push(N),r.push("([^"+b+"]+)?"+b+"?")}});const p=new RegExp("^"+r.join("")+"("+(b===""?".":"[^"+b+"]")+"+)?"+(b===""?"":"["+b+"]*")+"$"),Z=h.length-1,M=h.map((T,a)=>a===0&&e.reverseFillMask===!0?new RegExp("^"+d+"*"+T):a===Z?new RegExp("^"+T+"("+(n===""?".":n)+"+)?"+(e.reverseFillMask===!0?"$":d+"*")):new RegExp("^"+T));c=m,x=T=>{const a=p.exec(e.reverseFillMask===!0?T:T.slice(0,m.length+1));a!==null&&(T=a.slice(1).join(""));const B=[],H=M.length;for(let K=0,N=T;K<H;K++){const X=M[K].exec(N);if(X===null)break;N=N.slice(X.shift().length),B.push(...X)}return B.length!==0?B.join(""):T},s=m.map(T=>typeof T=="string"?T:P).join(""),f=s.split(P).join(o)}function I(l,o,d){const r=i.value,h=r.selectionEnd,m=r.value.length-h,R=w(l);o===!0&&D();const b=_(R),n=e.fillMask!==!1?O(b):b,p=g.value!==n;r.value!==n&&(r.value=n),p===!0&&(g.value=n),document.activeElement===r&&W(()=>{if(n===f){const M=e.reverseFillMask===!0?f.length:0;r.setSelectionRange(M,M,"forward");return}if(d==="insertFromPaste"&&e.reverseFillMask!==!0){const M=r.selectionEnd;let T=h-1;for(let a=$;a<=T&&a<M;a++)s[a]!==P&&T++;E.right(r,T);return}if(["deleteContentBackward","deleteContentForward"].indexOf(d)>-1){const M=e.reverseFillMask===!0?h===0?n.length>b.length?1:0:Math.max(0,n.length-(n===f?0:Math.min(b.length,m)+1))+1:h;r.setSelectionRange(M,M,"forward");return}if(e.reverseFillMask===!0)if(p===!0){const M=Math.max(0,n.length-(n===f?0:Math.min(b.length,m+1)));M===1&&h===1?r.setSelectionRange(M,M,"forward"):E.rightReverse(r,M)}else{const M=n.length-m;r.setSelectionRange(M,M,"backward")}else if(p===!0){const M=Math.max(0,s.indexOf(P),Math.min(b.length,h)-1);E.right(r,M)}else{const M=h-1;E.right(r,M)}});const Z=e.unmaskedValue===!0?w(n):n;String(e.modelValue)!==Z&&(e.modelValue!==null||Z!=="")&&u(Z,!0)}function j(l,o,d){const r=_(w(l.value));o=Math.max(0,s.indexOf(P),Math.min(r.length,o)),$=o,l.setSelectionRange(o,d,"forward")}const E={left(l,o){const d=s.slice(o-1).indexOf(P)===-1;let r=Math.max(0,o-1);for(;r>=0;r--)if(s[r]===P){o=r,d===!0&&o++;break}if(r<0&&s[o]!==void 0&&s[o]!==P)return E.right(l,0);o>=0&&l.setSelectionRange(o,o,"backward")},right(l,o){const d=l.value.length;let r=Math.min(d,o+1);for(;r<=d;r++)if(s[r]===P){o=r;break}else s[r-1]===P&&(o=r);if(r>d&&s[o-1]!==void 0&&s[o-1]!==P)return E.left(l,d);l.setSelectionRange(o,o,"forward")},leftReverse(l,o){const d=A(l.value.length);let r=Math.max(0,o-1);for(;r>=0;r--)if(d[r-1]===P){o=r;break}else if(d[r]===P&&(o=r,r===0))break;if(r<0&&d[o]!==void 0&&d[o]!==P)return E.rightReverse(l,0);o>=0&&l.setSelectionRange(o,o,"backward")},rightReverse(l,o){const d=l.value.length,r=A(d),h=r.slice(0,o+1).indexOf(P)===-1;let m=Math.min(d,o+1);for(;m<=d;m++)if(r[m-1]===P){o=m,o>0&&h===!0&&o--;break}if(m>d&&r[o-1]!==void 0&&r[o-1]!==P)return E.leftReverse(l,d);l.setSelectionRange(o,o,"forward")}};function F(l){t("click",l),q=void 0}function V(l){if(t("keydown",l),Ne(l)===!0||l.altKey===!0)return;const o=i.value,d=o.selectionStart,r=o.selectionEnd;if(l.shiftKey||(q=void 0),l.keyCode===37||l.keyCode===39){l.shiftKey&&q===void 0&&(q=o.selectionDirection==="forward"?d:r);const h=E[(l.keyCode===39?"right":"left")+(e.reverseFillMask===!0?"Reverse":"")];if(l.preventDefault(),h(o,q===d?r:d),l.shiftKey){const m=o.selectionStart;o.setSelectionRange(Math.min(q,m),Math.max(q,m),"forward")}}else l.keyCode===8&&e.reverseFillMask!==!0&&d===r?(E.left(o,d),o.setSelectionRange(o.selectionStart,r,"backward")):l.keyCode===46&&e.reverseFillMask===!0&&d===r&&(E.rightReverse(o,r),o.setSelectionRange(d,o.selectionEnd,"forward"))}function _(l){if(l==null||l==="")return"";if(e.reverseFillMask===!0)return S(l);const o=c;let d=0,r="";for(let h=0;h<o.length;h++){const m=l[d],R=o[h];if(typeof R=="string")r+=R,m===R&&d++;else if(m!==void 0&&R.regex.test(m))r+=R.transform!==void 0?R.transform(m):m,d++;else return r}return r}function S(l){const o=c,d=s.indexOf(P);let r=l.length-1,h="";for(let m=o.length-1;m>=0&&r>-1;m--){const R=o[m];let b=l[r];if(typeof R=="string")h=R+h,b===R&&r--;else if(b!==void 0&&R.regex.test(b))do h=(R.transform!==void 0?R.transform(b):b)+h,r--,b=l[r];while(d===m&&b!==void 0&&R.regex.test(b));else return h}return h}function w(l){return typeof l!="string"||x===void 0?typeof l=="number"?x(""+l):l:x(l)}function O(l){return f.length-l.length<=0?l:e.reverseFillMask===!0&&l.length!==0?f.slice(0,-l.length)+l:l+f.slice(l.length)}return{innerValue:g,hasMask:C,moveCursorForPaste:j,updateMaskValue:I,onMaskedKeydown:V,onMaskedClick:F}}const lt={name:String};function rt(e){return y(()=>e.name||e.for)}function ut(e,t){function u(){const i=e.modelValue;try{const s="DataTransfer"in window?new DataTransfer:"ClipboardEvent"in window?new ClipboardEvent("").clipboardData:void 0;return Object(i)===i&&("length"in i?Array.from(i):[i]).forEach(f=>{s.items.add(f)}),{files:s.files}}catch{return{files:void 0}}}return t===!0?y(()=>{if(e.type==="file")return u()}):y(u)}const it=/[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/,st=/[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u,dt=/[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/,ft=/[a-z0-9_ -]$/i;function ct(e){return function(u){if(u.type==="compositionend"||u.type==="change"){if(u.target.qComposing!==!0)return;u.target.qComposing=!1,e(u)}else u.type==="compositionupdate"&&u.target.qComposing!==!0&&typeof u.data=="string"&&(Le.is.firefox===!0?ft.test(u.data)===!1:it.test(u.data)===!0||st.test(u.data)===!0||dt.test(u.data)===!0)===!0&&(u.target.qComposing=!0)}}var xt=ne({name:"QInput",inheritAttrs:!1,props:{...Je,...at,...lt,modelValue:{required:!1},shadowText:String,type:{type:String,default:"text"},debounce:[String,Number],autogrow:Boolean,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...Xe,"paste","change","keydown","click","animationend"],setup(e,{emit:t,attrs:u}){const{proxy:i}=J(),{$q:s}=i,f={};let c=NaN,x,$,q=null,C;const g=L(null),Q=rt(e),{innerValue:v,hasMask:A,moveCursorForPaste:D,updateMaskValue:I,onMaskedKeydown:j,onMaskedClick:E}=ot(e,t,b,g),F=ut(e,!0),V=y(()=>ve(v.value)),_=ct(m),S=et(),w=y(()=>e.type==="textarea"||e.autogrow===!0),O=y(()=>w.value===!0||["text","search","url","tel","password"].includes(e.type)),l=y(()=>{const a={...S.splitAttrs.listeners.value,onInput:m,onPaste:h,onChange:p,onBlur:Z,onFocus:he};return a.onCompositionstart=a.onCompositionupdate=a.onCompositionend=_,A.value===!0&&(a.onKeydown=j,a.onClick=E),e.autogrow===!0&&(a.onAnimationend=R),a}),o=y(()=>{const a={tabindex:0,"data-autofocus":e.autofocus===!0||void 0,rows:e.type==="textarea"?6:void 0,"aria-label":e.label,name:Q.value,...S.splitAttrs.attributes.value,id:S.targetUid.value,maxlength:e.maxlength,disabled:e.disable===!0,readonly:e.readonly===!0};return w.value===!1&&(a.type=e.type),e.autogrow===!0&&(a.rows=1),a});U(()=>e.type,()=>{g.value&&(g.value.value=e.modelValue)}),U(()=>e.modelValue,a=>{if(A.value===!0){if($===!0&&($=!1,String(a)===c))return;I(a)}else v.value!==a&&(v.value=a,e.type==="number"&&f.hasOwnProperty("value")===!0&&(x===!0?x=!1:delete f.value));e.autogrow===!0&&W(n)}),U(()=>e.autogrow,a=>{a===!0?W(n):g.value!==null&&u.rows>0&&(g.value.style.height="auto")}),U(()=>e.dense,()=>{e.autogrow===!0&&W(n)});function d(){ge(()=>{const a=document.activeElement;g.value!==null&&g.value!==a&&(a===null||a.id!==S.targetUid.value)&&g.value.focus({preventScroll:!0})})}function r(){g.value!==null&&g.value.select()}function h(a){if(A.value===!0&&e.reverseFillMask!==!0){const B=a.target;D(B,B.selectionStart,B.selectionEnd)}t("paste",a)}function m(a){if(!a||!a.target)return;if(e.type==="file"){t("update:modelValue",a.target.files);return}const B=a.target.value;if(a.target.qComposing===!0){f.value=B;return}if(A.value===!0)I(B,!1,a.inputType);else if(b(B),O.value===!0&&a.target===document.activeElement){const{selectionStart:H,selectionEnd:K}=a.target;H!==void 0&&K!==void 0&&W(()=>{a.target===document.activeElement&&B.indexOf(a.target.value)===0&&a.target.setSelectionRange(H,K)})}e.autogrow===!0&&n()}function R(a){t("animationend",a),n()}function b(a,B){C=()=>{q=null,e.type!=="number"&&f.hasOwnProperty("value")===!0&&delete f.value,e.modelValue!==a&&c!==a&&(c=a,B===!0&&($=!0),t("update:modelValue",a),W(()=>{c===a&&(c=NaN)})),C=void 0},e.type==="number"&&(x=!0,f.value=a),e.debounce!==void 0?(q!==null&&clearTimeout(q),f.value=a,q=setTimeout(C,e.debounce)):C()}function n(){requestAnimationFrame(()=>{const a=g.value;if(a!==null){const B=a.parentNode.style,{scrollTop:H}=a,{overflowY:K,maxHeight:N}=s.platform.is.firefox===!0?{}:window.getComputedStyle(a),X=K!==void 0&&K!=="scroll";X===!0&&(a.style.overflowY="hidden"),B.marginBottom=a.scrollHeight-1+"px",a.style.height="1px",a.style.height=a.scrollHeight+"px",X===!0&&(a.style.overflowY=parseInt(N,10)<a.scrollHeight?"auto":"hidden"),B.marginBottom="",a.scrollTop=H}})}function p(a){_(a),q!==null&&(clearTimeout(q),q=null),C!==void 0&&C(),t("change",a.target.value)}function Z(a){a!==void 0&&he(a),q!==null&&(clearTimeout(q),q=null),C!==void 0&&C(),x=!1,$=!1,delete f.value,e.type!=="file"&&setTimeout(()=>{g.value!==null&&(g.value.value=v.value!==void 0?v.value:"")})}function M(){return f.hasOwnProperty("value")===!0?f.value:v.value!==void 0?v.value:""}se(()=>{Z()}),ie(()=>{e.autogrow===!0&&n()}),Object.assign(S,{innerValue:v,fieldClass:y(()=>`q-${w.value===!0?"textarea":"input"}`+(e.autogrow===!0?" q-textarea--autogrow":"")),hasShadow:y(()=>e.type!=="file"&&typeof e.shadowText=="string"&&e.shadowText.length!==0),inputRef:g,emitValue:b,hasValue:V,floatingLabel:y(()=>V.value===!0&&(e.type!=="number"||isNaN(v.value)===!1)||ve(e.displayValue)),getControl:()=>k(w.value===!0?"textarea":"input",{ref:g,class:["q-field__native q-placeholder",e.inputClass],style:e.inputStyle,...o.value,...l.value,...e.type!=="file"?{value:M()}:F.value}),getShadowControl:()=>k("div",{class:"q-field__native q-field__shadow absolute-bottom no-pointer-events"+(w.value===!0?"":" text-no-wrap")},[k("span",{class:"invisible"},M()),k("span",e.shadowText)])});const T=tt(S);return Object.assign(i,{focus:d,select:r,getNativeElement:()=>g.value}),Re(i,"nativeEl",()=>g.value),T}}),Ct=ne({name:"QCardSection",props:{tag:{type:String,default:"div"},horizontal:Boolean},setup(e,{slots:t}){const u=y(()=>`q-card__section q-card__section--${e.horizontal===!0?"horiz row no-wrap":"vert"}`);return()=>k(e.tag,{class:u.value},Y(t.default))}});function wt(e,t){let u=!1,i,s;return function f(...c){if(u){i=c,s=this;return}u=!0,e.apply(this,c),setTimeout(function(){u=!1,i&&(f.apply(s,i),i=s=null)},t)}}export{xt as Q,Xe as a,tt as b,et as c,ht as d,ge as e,lt as f,rt as g,ve as h,ct as i,yt as j,Ct as k,pt as l,mt as m,kt as p,bt as r,wt as t,Je as u};
