#!/usr/bin/env bun
// @bun
var Yu=Object.defineProperty;var qu=(e)=>e;function Vu(e,t){this[e]=qu.bind(null,t)}var no=(e,t)=>{for(var n in t)Yu(e,n,{get:t[n],enumerable:!0,configurable:!0,set:Vu.bind(t,n)})};var cn={};no(cn,{ZodISODate:()=>ft,ZodISODateTime:()=>pt,ZodISODuration:()=>ht,ZodISOTime:()=>dt,date:()=>Vp,datetime:()=>qp,duration:()=>Xp,time:()=>Kp});var un={};no(un,{bigint:()=>nf,boolean:()=>tf,date:()=>rf,number:()=>ef,string:()=>Qp});var je="0.1.0",An="wpsync/v1",Rn="wpsync-bridge",ro="wpsync-bridge/wpsync-bridge.php";var ae={info:"/info",dbTables:"/db/tables",dbRows:"/db/rows",filesList:"/files/list",filesFetch:"/files/fetch",filesRead:"/files/read"},oo=["wp-config.php",".maintenance",".git",".svn","error_log","wp-content/plugins/wpsync-bridge","wp-content/uploads/wpsync-*","wp-content/cache","wp-content/upgrade","wp-content/upgrade-temp-backup","wp-content/debug.log","wp-content/ai1wm-backups","wp-content/updraft","wp-content/backups-dup-lite","wp-content/backups-dup-pro","wp-content/wpvividbackups","wp-content/wflogs"];var $t=8000000,so=500;function et(e){let t=Object.values(e).filter((r)=>typeof r==="number");return Object.entries(e).filter(([r,o])=>t.indexOf(+r)===-1).map(([r,o])=>o)}function Cn(e,t="|"){return e.map((n)=>Ln(n)).join(t)}function tt(e,t){if(typeof t==="bigint")return t.toString();return t}class io{constructor(e){this._getter=e,this._value=void 0}get value(){let e=this._getter;if(e!==void 0)this._value=e(),this._getter=void 0;return this._value}}function xt(e){return new io(e)}function ao(e){return e===null||e===void 0}function St(e){let t=e.startsWith("^")?1:0,n=e.endsWith("$")?e.length-1:e.length;return e.slice(t,n)}function co(e,t){let n=e/t,r=Math.round(n),o=4*Number.EPSILON*Math.max(Math.abs(n),1);if(Math.abs(n-r)<o)return 0;return n-r}function ce(e,t,n){Object.defineProperty(e,t,{value:n,writable:!0,enumerable:!0,configurable:!0})}function Pt(e){let t=Object.getOwnPropertyDescriptor(e,"shape");return t?.get?t.get.raw:t?.value}function we(e){return Pt(e._zod.def)??e._zod.def.shape}function uo(e,t,n){Object.defineProperty(e,t,{get(){let r=n();return ce(this,t,r),r},enumerable:!0,configurable:!0})}function lo(e,t,n){if(t in e)ce(e,t,n);else e[t]=n}function Re(e,t,n,r){let o=we(t);for(let s of n){let i=Object.getOwnPropertyDescriptor(o,s);if(!i.enumerable)continue;if(i.get)uo(e,s,()=>{let a=t._zod.def.shape[s];return r?r(a,s):a});else lo(e,s,r?r(i.value,s):i.value)}}function Ku(e,t){for(let n of Reflect.ownKeys(t)){let r=Object.getOwnPropertyDescriptor(t,n);if(!r.enumerable)continue;if(r.get)uo(e,n,()=>t[n]);else lo(e,n,r.value)}}function Q(...e){let t={};for(let n of e){let r=Object.getOwnPropertyDescriptors(n);Object.assign(t,r)}return Object.defineProperties({},t)}function po(e){return JSON.stringify(e)}function fo(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/[\s_-]+/g,"-").replace(/^-+|-+$/g,"")}var Dn="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function Qe(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)}var ho=xt(()=>{if(q.jitless)return!1;if(typeof navigator<"u"&&navigator?.userAgent?.includes("Cloudflare"))return!1;try{return new Function(""),!0}catch(e){return!1}});function Ze(e){if(Qe(e)===!1)return!1;let t=e.constructor;if(t===void 0)return!0;if(typeof t!=="function")return!0;let n=t.prototype;if(Qe(n)===!1)return!1;if(Object.prototype.hasOwnProperty.call(n,"isPrototypeOf")===!1)return!1;return!0}function Nn(e){if(Ze(e))return{...e};if(Array.isArray(e))return[...e];if(e instanceof Map)return new Map(e);if(e instanceof Set)return new Set(e);return e}var mo=new Set(["string","number","symbol"]);function Te(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function me(e,t,n){let r=new e._zod.constr(t??e._zod.def);if(!t||n?.parent)r._zod.parent=e;return r}function v(e){let t=e;if(!t)return{};if(typeof t==="string")return{error:()=>t};if(t?.message!==void 0){if(t?.error!==void 0)throw Error("Cannot specify both `message` and `error` params");t.error=t.message}if(delete t.message,typeof t.error==="string")return{...t,error:()=>t.error};return t}function Ln(e){if(typeof e==="bigint")return e.toString()+"n";if(typeof e==="string")return`"${e}"`;return`${e}`}function go(e){return Object.keys(e).filter((t)=>e[t]._zod.optin!==void 0&&e[t]._zod.optout==="optional")}var zt=(()=>({safeint:[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-340282346638528860000000000000000000000,340282346638528860000000000000000000000],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]}))(),Un={int64:[BigInt("-9223372036854775808"),BigInt("9223372036854775807")],uint64:[BigInt(0),BigInt("18446744073709551615")]};function Xu(e,t){let n=e._zod.def,r=n.checks;if(r&&r.length>0)throw Error(".pick() cannot be used on object schemas containing refinements");let s={};return Re(s,e,Et(e,t)),me(e,Q(n,{shape:s,checks:[]}))}function Et(e,t){let n=we(e),r=[];for(let o of Reflect.ownKeys(t)){if(!Object.getOwnPropertyDescriptor(n,o)?.enumerable)throw Error(`Unrecognized key: "${String(o)}"`);if(t[o])r.push(o)}return r}function Qu(e,t){let n=e._zod.def,r=n.checks;if(r&&r.length>0)throw Error(".omit() cannot be used on object schemas containing refinements");let s=new Set(Et(e,t)),i={};return Re(i,e,Reflect.ownKeys(we(e)).filter((a)=>!s.has(a))),me(e,Q(n,{shape:i,checks:[]}))}function el(e,t){if(!Ze(t))throw Error("Invalid input to extend: expected a plain object");let n=e._zod.def.checks;if(n&&n.length>0){let o=we(e);for(let s of Reflect.ownKeys(t))if(Object.getOwnPropertyDescriptor(o,s)!==void 0)throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.")}return me(e,Q(e._zod.def,{shape:_o(e,t)}))}function _o(e,t){let n={};return Re(n,e,Reflect.ownKeys(we(e))),Ku(n,t),n}function tl(e,t){if(!Ze(t))throw Error("Invalid input to safeExtend: expected a plain object");return me(e,Q(e._zod.def,{shape:_o(e,t)}))}function nl(e,t){if(!t?._zod?.def)throw Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");if(e._zod.def.checks?.length)throw Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");let n={};Re(n,e,Reflect.ownKeys(we(e))),Re(n,t,Reflect.ownKeys(we(t)));let r=Q(e._zod.def,{shape:n,get catchall(){return t._zod.def.catchall},checks:t._zod.def.checks??[]});return me(e,r)}function yo(e,t,n,r="partial"){let s=t._zod.def.checks;if(s&&s.length>0)throw Error(`.${r}() cannot be used on object schemas containing refinements`);let a=n?new Set(Et(t,n)):void 0,c={};return Re(c,t,Reflect.ownKeys(we(t)),e&&((u,l)=>a&&!a.has(l)?u:new e({type:"optional",innerType:u}))),me(t,Q(t._zod.def,{shape:c,checks:[]}))}function rl(e,t,n){let r=n?new Set(Et(t,n)):void 0,o={};return Re(o,t,Reflect.ownKeys(we(t)),(s,i)=>r&&!r.has(i)?s:new e({type:"nonoptional",innerType:s})),me(t,Q(t._zod.def,{shape:o}))}function ge(e,t=0){if(e.aborted===!0)return!0;for(let n=t;n<e.issues.length;n++)if(e.issues[n]?.continue!==!0)return!0;return!1}function vo(e,t=0){if(e.aborted===!0)return!0;for(let n=t;n<e.issues.length;n++)if(e.issues[n]?.continue===!1)return!0;return!1}function Oe(e,t){return t.map((n)=>{var r;return(r=n).path??(r.path=[]),n.path.unshift(e),n})}function Xe(e){return typeof e==="string"?e:e?.message}function Fn(e){let t=[];for(let n of e??[]){let r=n._zod.def;if(!/_(length|size)$|_equals$/.test(r.check))break;let o=r.maximum??r.length??r.size;if(o>=0)t.push([o,n])}return t}function kt(e,t,n){var r;for(let o=t;o<e.length;o++)(r=e[o]).schema??(r.schema=n)}function _e(e,t,n){var r;let o=e.inst?._zod?.traits;if(o?.has("$ZodType"))if(o.has("$ZodCheck"))(r=e).schema??(r.schema=e.inst);else e.schema=e.inst;let s=e.schema!==e.inst?e.schema?._zod.def?.error:void 0,i=e.message?e.message:Xe(e.inst?._zod.def?.error?.(e))??Xe(s?.(e))??Xe(t?.error?.(e))??Xe(n.customError?.(e))??Xe(n.localeError?.(e))??"Invalid input",a={};for(let c of Object.keys(e)){if(c==="inst"||c==="schema"||c==="continue"||c==="input"||c==="__proto__")continue;a[c]=e[c]}if(a.path??(a.path=[]),a.message=i,t?.reportInput)a.input=e.input;return a}var ol=/[\uD800-\uDBFF]/;function Tt(e){let t=e.length;if(!ol.test(e))return t;let n=t;for(let r=0;r<t-1;r++)if((e.charCodeAt(r)&64512)===55296&&(e.charCodeAt(r+1)&64512)===56320)n--,r++;return n}function Ot(e){if(Array.isArray(e))return"array";if(typeof e==="string")return"string";return"unknown"}function wo(e){let t=typeof e;switch(t){case"number":return Number.isNaN(e)?"nan":"number";case"object":{if(e===null)return"null";if(Array.isArray(e))return"array";let n=e;if(n&&Object.getPrototypeOf(n)!==Object.prototype&&"constructor"in n&&n.constructor)return n.constructor.name}}return t}function Ce(...e){let[t,n,r]=e;if(typeof t==="string")return{message:t,code:"custom",input:n,inst:r};return{...t}}function bo(e,t){for(let n in t){let r=Object.getOwnPropertyDescriptor(t,n);if(r.get)Object.defineProperty(e,n,{...r,enumerable:!1});else sl(e,n,r.value)}}function be(e,t,n,r=!0){return Object.defineProperty(e,t,{configurable:!0,writable:!0,enumerable:r,value:n}),n}function It(e,t,n){return be(e,t,n,!1)}function At(e,t){for(let n in e){let r=e[n];Object.defineProperty(t,n,{configurable:!0,enumerable:!0,get(){return be(this,n,r(this))},set(o){be(this,n,o)}})}return t}function sl(e,t,n){Object.defineProperty(e,t,{configurable:!0,get(){return this==null?n:be(this,t,n.bind(this))},set(r){be(this,t,r)}})}function il(e,t){let n=Object.getPrototypeOf(e);return t in n?void 0:n}var Zn,ke=!1,al={configurable:!0,get(){ke=!0;return}};function O(e,t,n){let r=Object.getPrototypeOf(e._zod);if(t in r&&Zn!==e._zod){Zn=void 0;return}Zn=e._zod,Object.defineProperty(r,t,{configurable:!0,get(){Object.defineProperty(this,t,al);let o=ke;ke=!1;try{let s=n(this);if(ke)delete this[t];else Object.defineProperty(this,t,{configurable:!0,writable:!0,value:s});return ke=ke||o,s}catch(s){throw delete this[t],ke=ke||o,s}},set(o){Object.defineProperty(this,t,{configurable:!0,writable:!0,value:o})}})}function cl(e,t,n,r){let o=il(e,t);if(!o)return;Object.defineProperty(o,t,{configurable:!0,get(){let s={configurable:!0,writable:!0,enumerable:r,value:void 0};return Object.defineProperty(this,t,s),s.value=n(this),Object.defineProperty(this,t,s),s.value},set(s){Object.defineProperty(this,t,{configurable:!0,writable:!0,enumerable:r,value:s})}})}var ul="~constantCatch";function $o(e){let t=()=>e;return t[ul]=!0,t}var xo;var jn={value:void 0,enumerable:!1},So="captureStackTrace"in Error?Error:null;function ll(e){let t=So;if(t){let n=t.stackTraceLimit;if(typeof n==="number"){try{t.stackTraceLimit=0}catch{return So=null,new e}try{return new e}finally{t.stackTraceLimit=n}}}return new e}function h(e,t,n,r){let o={};function s(d){this.def=d,this.constr=p,this.traits=new Set}s.prototype=o;let i=n,a=i&&new WeakSet;function c(d,f){if(!d._zod){jn.value=new s(f);try{Object.defineProperty(d,"_zod",jn)}finally{jn.value=void 0}}else if(d._zod.traits.has(e))return;if(d._zod.traits.add(e),t(d,f),a){let g=Object.getPrototypeOf(d),y=d._zod.constr.prototype,S=g;while(S&&S!==y)S=Object.getPrototypeOf(S);let I=S??g;if(!a.has(I))a.add(I),bo(I,i)}let m=p.prototype;for(let g in m){if(!Object.prototype.hasOwnProperty.call(m,g))continue;if(!(g in d))d[g]=m[g].bind(d)}}let u=r?.Parent??Object;class l extends u{}Object.defineProperty(l,"name",{value:e});function p(d){let f=r?.Parent?ll(l):this;c(f,d);let m=f._zod.deferred;if(m){for(let y of m)y();f._zod.deferred=void 0}let g=globalThis.__zod_globalConfig?.postProcessor;if(g)g(f);return f}return Object.defineProperty(p,"init",{value:c}),Object.defineProperty(p,Symbol.hasInstance,{value:(d)=>{if(r?.Parent&&d instanceof r.Parent)return!0;return d?._zod?.traits?.has(e)}}),Object.defineProperty(p,"name",{value:e}),p}class ye extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}}class nt extends Error{constructor(e){super(`Encountered unidirectional transform during encode: ${e}`);this.name="ZodEncodeError"}}(xo=globalThis).__zod_globalConfig??(xo.__zod_globalConfig={});var q=globalThis.__zod_globalConfig;function ee(e){if(e)Object.assign(q,e);return q}function pl(){let e=this._zod;return e.message??(e.message=JSON.stringify(e.def,tt,2)),e.message}function fl(e){this._zod.message=e}var dl={get:pl,set:fl,enumerable:!0,configurable:!0},Mn={value:void 0,enumerable:!1},Po=new WeakSet([Object.prototype,Error.prototype]),zo=(e,t)=>{e.name="$ZodError",Mn.value=t,Object.defineProperty(e,"issues",Mn),Mn.value=void 0,Object.defineProperty(e,"message",dl);let n=Object.getPrototypeOf(e);if(!Po.has(n))Po.add(n),Object.defineProperty(n,"toString",{configurable:!0,enumerable:!1,get(){let r=()=>this.message;return Object.defineProperty(this,"toString",{value:r,configurable:!0,writable:!0}),r},set(r){Object.defineProperty(this,"toString",{value:r,configurable:!0,writable:!0})}})},Eo=h("$ZodError",zo),Wd=h("$ZodError",zo,void 0,{Parent:Error});function hl(e,t,n){if(!Object.prototype.hasOwnProperty.call(e,t))if(t==="__proto__")Object.defineProperty(e,t,{value:n(),writable:!0,enumerable:!0,configurable:!0});else e[t]=n();return e[t]}function ko(e,t=(n)=>n.message){let n={},r=[];for(let o of e.issues)if(o.path.length>0)hl(n,o.path[0],()=>[]).push(t(o));else r.push(t(o));return{formErrors:r,fieldErrors:n}}function To(e,t=(n)=>n.message){let n={_errors:[]},r=(o,s=[])=>{for(let i of o.issues)if(i.code==="invalid_union"&&i.errors.length)i.errors.map((a)=>r({issues:a},[...s,...i.path]));else if(i.code==="invalid_key")r({issues:i.issues},[...s,...i.path]);else if(i.code==="invalid_element")r({issues:i.issues},[...s,...i.path]);else{let a=[...s,...i.path];if(a.length===0)n._errors.push(t(i));else{let c=n,u=0;while(u<a.length){let l=a[u],p=u===a.length-1;if(l==="_errors"){if(p)c._errors.push(t(i));u++;continue}if(!Object.prototype.hasOwnProperty.call(c,l))Object.defineProperty(c,l,{value:{_errors:[]},enumerable:!0,writable:!0,configurable:!0});let d=c[l];if(p)d._errors.push(t(i));c=d,u++}}}};return r(e),n}function Rt(e,t){return{callee:t?.callee??e,Err:t?.Err}}var Zt=(e)=>{let t=(n,r,o,s)=>{let i=o?{...o,async:!1}:{async:!1},a=n._zod.run({value:r,issues:[]},i);if(a instanceof Promise)throw new ye;if(a.issues.length){let c=new(s?.Err??e)(a.issues.map((u)=>_e(u,i,ee())));throw Dn(c,s?.callee??t),c}return a.value};return t};var Ct=(e)=>{let t=async(n,r,o,s)=>{let i=o?{...o,async:!0}:{async:!0},a=n._zod.run({value:r,issues:[]},i);if(a instanceof Promise)a=await a;if(a.issues.length){let c=new(s?.Err??e)(a.issues.map((u)=>_e(u,i,ee())));throw Dn(c,s?.callee??t),c}return a.value};return t};var Dt=(e)=>(t,n,r)=>{let o=r?{...r,async:!1}:{async:!1},s=t._zod.run({value:n,issues:[]},o);if(s instanceof Promise)throw new ye;return s.issues.length?Oo(e,s.issues,o):{success:!0,data:s.value}};function Oo(e,t,n){let r;return{success:!1,get error(){if(!r)r=new e(t.map((o)=>_e(o,n,ee()))),t=void 0,n=void 0;return r},set error(o){r=o,t=void 0,n=void 0}}}var Nt=(e)=>async(t,n,r)=>{let o=r?{...r,async:!0}:{async:!0},s=t._zod.run({value:n,issues:[]},o);if(s instanceof Promise)s=await s;return s.issues.length?Oo(e,s.issues,o):{success:!0,data:s.value}};var ml=Symbol.for("zod.compile.invalid"),gl=Symbol.for("zod.compile.fallback"),Wn=(e,t,n)=>{let r=e._zod.bag.validator;if(r!==void 0){if(r(t)!==ml)return!0;if(r.definite===!0&&n===void 0)return!1}return _l(e,t,n)};function _l(e,t,n){let r=n?{...n,async:!1,abortEarly:!0}:{async:!1,abortEarly:!0},o=e._zod.bag.fallbackRun,s;if(o)r[gl]=!0,s=o({value:t,issues:[]},r);else s=e._zod.run({value:t,issues:[]},r);if(s instanceof Promise)throw new ye;return s.issues.length===0}var Hn=async(e,t,n)=>{let r=n?{...n,async:!0,abortEarly:!0}:{async:!0,abortEarly:!0},o=e._zod.run({value:t,issues:[]},r);if(o instanceof Promise)o=await o;return o.issues.length===0},Io=(e)=>{let t=Zt(e),n=(r,o,s,i)=>{let a=s?{...s,direction:"backward"}:{direction:"backward"};return t(r,o,a,Rt(n,i))};return n};var Ao=(e)=>{let t=Zt(e),n=(r,o,s,i)=>t(r,o,s,Rt(n,i));return n};var Ro=(e)=>{let t=Ct(e),n=async(r,o,s,i)=>{let a=s?{...s,direction:"backward"}:{direction:"backward"};return await t(r,o,a,Rt(n,i))};return n};var Zo=(e)=>{let t=Ct(e),n=async(r,o,s,i)=>await t(r,o,s,Rt(n,i));return n};var Co=(e)=>(t,n,r)=>{let o=r?{...r,direction:"backward"}:{direction:"backward"};return Dt(e)(t,n,o)};var Do=(e)=>(t,n,r)=>Dt(e)(t,n,r);var No=(e)=>async(t,n,r)=>{let o=r?{...r,direction:"backward"}:{direction:"backward"};return Nt(e)(t,n,o)};var Lo=(e)=>async(t,n,r)=>Nt(e)(t,n,r);var Uo=/^[cC][0-9a-z]{6,}$/,Fo=/^[0-9a-z]+$/,jo=/^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/,Bo=/^[0-9a-vA-V]{20}$/,Mo=/^[A-Za-z0-9]{27}$/,Wo=/^[a-zA-Z0-9_-]{21}$/;function Ho(e){return new RegExp(`^[a-zA-Z0-9_-]{${e}}$`)}var Go=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;var Jo=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,Jn=(e)=>{if(!e)return/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`)};var Yo=/^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;var yl="^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";function qo(){return new RegExp(yl,"u")}var Vo=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,Ko=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;var Xo=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,Qo=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,es=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,ts=/^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;var ns=/^https?$/,rs=/^\+[1-9]\d{6,14}$/;var os="(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";function vl(e){return new RegExp(`^${e}$`)}var ss=vl(os);function Gn(e){return typeof e.precision==="number"?e.precision===-1?"(?:[01]\\d|2[0-3]):[0-5]\\d":e.precision===0?"(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d":`(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d\\.\\d{${e.precision}}`:e.seconds?"(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:\\.\\d+)?":"(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(?:\\.\\d+)?)?"}function is(e){return new RegExp(`^${Gn(e)}$`)}function as(e){let t=["Z"];if(e.offset)t.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");let n=`${Gn({precision:e.precision,seconds:!0})}(?:${t.join("|")})`,r=e.local?`${n}|${Gn({precision:e.precision})}`:n;return new RegExp(`^${os}T(?:${r})$`)}var cs=/^[\s\S]{0,}$/;var us=/^-?\d+n?$/,Yn=/^-?\d+$/,rt=/^-?\d+(?:\.\d+)?$/,ls=/^(?:true|false)$/i;var ps=/^[^A-Z]*$/,fs=/^[^a-z]*$/;var j=h("$ZodCheck",(e,t)=>{var n;e._zod??(e._zod={}),e._zod.def=t,(n=e._zod).onattach??(n.onattach=[])});var qn=(e)=>{let t=e.value;return!ao(t)&&t.length!==void 0},Lt={number:"number",bigint:"bigint",object:"date"},Vn=h("$ZodCheckLessThan",(e,t)=>{j.init(e,t);let n=Lt[typeof t.value];e._zod.check=(r)=>{if(t.inclusive?r.value<=t.value:r.value<t.value)return;r.issues.push({origin:Lt[typeof r.value]??n,code:"too_big",maximum:typeof t.value==="object"?t.value.getTime():t.value,input:r.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),Kn=h("$ZodCheckGreaterThan",(e,t)=>{j.init(e,t);let n=Lt[typeof t.value];e._zod.check=(r)=>{if(t.inclusive?r.value>=t.value:r.value>t.value)return;r.issues.push({origin:Lt[typeof r.value]??n,code:"too_small",minimum:typeof t.value==="object"?t.value.getTime():t.value,input:r.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),ds=h("$ZodCheckMultipleOf",(e,t)=>{j.init(e,t),e._zod.check=(n)=>{if(typeof n.value!==typeof t.value)throw Error("Cannot mix number and bigint in multiple_of check.");if(typeof n.value==="bigint"?t.value!==BigInt(0)&&n.value%t.value===BigInt(0):co(n.value,t.value)===0)return;n.issues.push({origin:typeof n.value,code:"not_multiple_of",divisor:t.value,input:n.value,inst:e,continue:!t.abort})}}),hs=h("$ZodCheckNumberFormat",(e,t)=>{j.init(e,t),t.format=t.format||"float64";let n=t.format?.includes("int"),r=n?"int":"number",[o,s]=zt[t.format];e._zod.check=(i)=>{let a=i.value;if(n){if(!Number.isInteger(a)){i.issues.push({expected:r,format:t.format,code:"invalid_type",continue:!1,input:a,inst:e});return}if(!Number.isSafeInteger(a)){if(a>0)i.issues.push({input:a,code:"too_big",maximum:Number.MAX_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:r,inclusive:!0,continue:!t.abort});else i.issues.push({input:a,code:"too_small",minimum:Number.MIN_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:r,inclusive:!0,continue:!t.abort});return}}if(a<o)i.issues.push({origin:"number",input:a,code:"too_small",minimum:o,inclusive:!0,inst:e,continue:!t.abort});if(a>s)i.issues.push({origin:"number",input:a,code:"too_big",maximum:s,inclusive:!0,inst:e,continue:!t.abort})}});var ms=h("$ZodCheckMaxLength",(e,t)=>{var n;j.init(e,t),(n=e._zod.def).when??(n.when=qn),e._zod.check=(r)=>{let o=r.value,s=o.length;if((typeof o==="string"&&s>t.maximum?Tt(o):s)<=t.maximum)return;let a=Ot(o);r.issues.push({origin:a,code:"too_big",maximum:t.maximum,inclusive:!0,input:o,inst:e,continue:!t.abort})}}),gs=h("$ZodCheckMinLength",(e,t)=>{var n;j.init(e,t),(n=e._zod.def).when??(n.when=qn),e._zod.check=(r)=>{let o=r.value,s=o.length;if((typeof o==="string"&&s>=t.minimum&&s<t.minimum*2?Tt(o):s)>=t.minimum)return;let a=Ot(o);r.issues.push({origin:a,code:"too_small",minimum:t.minimum,inclusive:!0,input:o,inst:e,continue:!t.abort})}}),_s=h("$ZodCheckLengthEquals",(e,t)=>{var n;j.init(e,t),(n=e._zod.def).when??(n.when=qn),e._zod.check=(r)=>{let o=r.value,s=o.length,i=typeof o==="string"&&s>=t.length&&s<=t.length*2?Tt(o):s;if(i===t.length)return;let a=Ot(o),c=i>t.length;r.issues.push({origin:a,...c?{code:"too_big",maximum:t.length}:{code:"too_small",minimum:t.length},inclusive:!0,exact:!0,input:r.value,inst:e,continue:!t.abort})}}),st=h("$ZodCheckStringFormat",(e,t)=>{var n,r;if(j.init(e,t),t.pattern)(n=e._zod).check??(n.check=(o)=>{if(t.pattern.lastIndex=0,t.pattern.test(o.value))return;o.issues.push({origin:"string",code:"invalid_format",format:t.format,input:o.value,...t.pattern?{pattern:t.pattern.toString()}:{},inst:e,continue:!t.abort})});else(r=e._zod).check??(r.check=()=>{})}),ys=h("$ZodCheckRegex",(e,t)=>{st.init(e,t),e._zod.check=(n)=>{if(t.pattern.lastIndex=0,t.pattern.test(n.value))return;n.issues.push({origin:"string",code:"invalid_format",format:"regex",input:n.value,pattern:t.pattern.toString(),inst:e,continue:!t.abort})}}),vs=h("$ZodCheckLowerCase",(e,t)=>{t.pattern??(t.pattern=ps),st.init(e,t)}),ws=h("$ZodCheckUpperCase",(e,t)=>{t.pattern??(t.pattern=fs),st.init(e,t)}),bs=h("$ZodCheckIncludes",(e,t)=>{j.init(e,t);let n=Te(t.includes),r=new RegExp(typeof t.position==="number"?`^.{${t.position},}${n}`:n);t.pattern=r,e._zod.check=(o)=>{if(o.value.includes(t.includes,t.position))return;o.issues.push({origin:"string",code:"invalid_format",format:"includes",includes:t.includes,input:o.value,inst:e,continue:!t.abort})}}),$s=h("$ZodCheckStartsWith",(e,t)=>{j.init(e,t);let n=new RegExp(`^${Te(t.prefix)}.*`);t.pattern??(t.pattern=n),e._zod.check=(r)=>{if(r.value.startsWith(t.prefix))return;r.issues.push({origin:"string",code:"invalid_format",format:"starts_with",prefix:t.prefix,input:r.value,inst:e,continue:!t.abort})}}),xs=h("$ZodCheckEndsWith",(e,t)=>{j.init(e,t);let n=new RegExp(`.*${Te(t.suffix)}$`);t.pattern??(t.pattern=n),e._zod.check=(r)=>{if(r.value.endsWith(t.suffix))return;r.issues.push({origin:"string",code:"invalid_format",format:"ends_with",suffix:t.suffix,input:r.value,inst:e,continue:!t.abort})}});var Ss=h("$ZodCheckOverwrite",(e,t)=>{j.init(e,t),e._zod.check=(n)=>{n.value=t.tx(n.value)}});class Xn{constructor(e=[],t={}){this.content=[],this.indent=0,this.args=e,this.closed=t}indented(e){this.indent+=1;try{e(this)}finally{this.indent-=1}}write(e){if(typeof e==="function"){e(this,{execution:"sync"}),e(this,{execution:"async"});return}let n=e.split(`
`).filter((s)=>s),r=Math.min(...n.map((s)=>s.length-s.trimStart().length)),o=n.map((s)=>s.slice(r)).map((s)=>" ".repeat(this.indent*2)+s);for(let s of o)this.content.push(s)}compile(){let e=Function,t=this?.content??[""];return new e(...Object.keys(this.closed),`return function (${this.args.join(", ")}) {
${t.join(`
`)}
};`)(...Object.values(this.closed))}}var zs={major:4,minor:6,patch:7};var R=h("$ZodType",(e,t)=>{var n;e??(e={}),e._zod.def=t,e._zod.bag=e._zod.bag||{},e._zod.version=zs;let r=e._zod.def.checks,o=e._zod.traits.has("$ZodCheck")?[e,...r??[]]:r?.length?[...r]:[];for(let s of o)for(let i of s._zod.onattach)i(e);if(o.length===0)(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let s=(a,c,u)=>{if(a.memo)return a;let l=ge(a),p;for(let d of c){if(d._zod.def.when){if(vo(a))continue;if(!d._zod.def.when(a))continue}else if(l)continue;let f=a.issues.length,m=d._zod.check(a);if(m instanceof Promise&&u?.async===!1)throw new ye;if(p||m instanceof Promise)p=(p??Promise.resolve()).then(async()=>{if(await m,a.issues.length===f)return;if(kt(a.issues,f,e),!l)l=ge(a,f)});else{if(a.issues.length===f)continue;if(kt(a.issues,f,e),!l)l=ge(a,f)}}if(p)return p.then(()=>a);return a},i=(a,c,u)=>{if(ge(a))return a.aborted=!0,a;let l=s(c,o,u);if(l instanceof Promise){if(u.async===!1)throw new ye;return l.then((p)=>e._zod.parse(p,u))}return e._zod.parse(l,u)};e._zod.run=(a,c)=>{if(c.skipChecks)return e._zod.parse(a,c);if(c.direction==="backward"){let l=e._zod.parse({value:a.value,issues:[]},{...c,skipChecks:!0});if(l instanceof Promise)return l.then((p)=>i(p,a,c));return i(l,a,c)}let u=e._zod.parse(a,c);if(u instanceof Promise){if(c.async===!1)throw new ye;return u.then((l)=>s(l,o,c))}return s(u,o,c)}}},{get "~standard"(){return It(this,"~standard",er(this))},set "~standard"(e){be(this,"~standard",e)}}),Ns=(e,t)=>e.issues.length?{issues:e.issues.map((n)=>_e(n,t,ee()))}:{value:e.value};async function wl(e,t){let n={async:!0};return Ns(await e._zod.run({value:t,issues:[]},n),n)}function er(e){return{validate:(t)=>{let n={async:!1};try{let r=e._zod.run({value:t,issues:[]},n);if(!(r instanceof Promise))return Ns(r,n)}catch(r){}return wl(e,t)},vendor:"zod",version:1}}var Bt=h("$ZodString",(e,t)=>{R.init(e,t),e._zod.pattern=t.pattern??cs,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=String(n.value)}catch(o){}if(typeof n.value==="string")return n;return n.issues.push({expected:"string",code:"invalid_type",input:n.value,inst:e}),n}}),C=h("$ZodStringFormat",(e,t)=>{st.init(e,t),Bt.init(e,t)}),Ls=h("$ZodGUID",(e,t)=>{t.pattern??(t.pattern=Jo),C.init(e,t)}),Us=h("$ZodUUID",(e,t)=>{if(t.version){let r={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[t.version];if(r===void 0)throw Error(`Invalid UUID version: "${t.version}"`);t.pattern??(t.pattern=Jn(r))}else t.pattern??(t.pattern=Jn());C.init(e,t)}),Fs=h("$ZodEmail",(e,t)=>{t.pattern??(t.pattern=Yo),C.init(e,t)}),js=1,Ft=2;function Bs(e){try{if(typeof URL<"u"&&typeof URL.canParse==="function")return URL.canParse(e);return new URL(e),!0}catch{return!1}}function bl(e,t){if(!("normalize"in t)&&!("hostname"in t)&&!("protocol"in t))return Bs(e)||Ft;return $l(e,t)}function $l(e,t){if(!t.normalize&&t.protocol?.source===ns.source&&!/^https?:\/\//i.test(e))return js;try{if(typeof URL<"u"){let n=URL;if(typeof n.parse==="function")return n.parse(e)??Ft}return new URL(e)}catch{return Ft}}var xl=/[\t\n\r]/g;function Es(e){return e.replace(xl,"")}function Sl(e,t){return t.lastIndex=0,t.test(e.hostname)}function Pl(e,t){return t.lastIndex=0,t.test(e.protocol.endsWith(":")?e.protocol.slice(0,-1):e.protocol)}var Ms=h("$ZodURL",(e,t)=>{C.init(e,t),e._zod.check=(n)=>{try{let r=n.value.trim(),o=bl(r,t);if(o===js){n.issues.push({code:"invalid_format",format:"url",note:"Invalid URL format",input:n.value,inst:e,continue:!t.abort});return}if(o===Ft){n.issues.push({code:"invalid_format",format:"url",input:n.value,inst:e,continue:!t.abort});return}if(o===!0){n.value=Es(r);return}if(t.hostname&&!Sl(o,t.hostname))n.issues.push({code:"invalid_format",format:"url",note:"Invalid hostname",pattern:t.hostname.source,input:n.value,inst:e,continue:!t.abort});if(t.protocol&&!Pl(o,t.protocol))n.issues.push({code:"invalid_format",format:"url",note:"Invalid protocol",pattern:t.protocol.source,input:n.value,inst:e,continue:!t.abort});n.value=t.normalize?o.href:Es(r);return}catch(r){n.issues.push({code:"invalid_format",format:"url",input:n.value,inst:e,continue:!t.abort})}}}),Ws=h("$ZodEmoji",(e,t)=>{t.pattern??(t.pattern=qo()),C.init(e,t)}),Hs=h("$ZodNanoID",(e,t)=>{if(t.length!==void 0&&(!Number.isInteger(t.length)||t.length<1))throw Error(`Invalid nanoid length: ${t.length}`);t.pattern??(t.pattern=t.length===void 0?Wo:Ho(t.length)),C.init(e,t)}),Gs=h("$ZodCUID",(e,t)=>{t.pattern??(t.pattern=Uo),C.init(e,t)}),Js=h("$ZodCUID2",(e,t)=>{t.pattern??(t.pattern=Fo),C.init(e,t)}),Ys=h("$ZodULID",(e,t)=>{t.pattern??(t.pattern=jo),C.init(e,t)}),qs=h("$ZodXID",(e,t)=>{t.pattern??(t.pattern=Bo),C.init(e,t)}),Vs=h("$ZodKSUID",(e,t)=>{t.pattern??(t.pattern=Mo),C.init(e,t)}),Ks=h("$ZodISODateTime",(e,t)=>{t.pattern??(t.pattern=as(t)),C.init(e,t)}),Xs=h("$ZodISODate",(e,t)=>{t.pattern??(t.pattern=ss),C.init(e,t)}),Qs=h("$ZodISOTime",(e,t)=>{t.pattern??(t.pattern=is(t)),C.init(e,t)}),ei=h("$ZodISODuration",(e,t)=>{t.pattern??(t.pattern=Go),C.init(e,t)}),ti=h("$ZodIPv4",(e,t)=>{t.pattern??(t.pattern=Vo),C.init(e,t)}),zl=/^[0-9a-fA-F:.]+$/;function ni(e){if(!zl.test(e))return!1;return Bs(`http://[${e}]`)}var ri=h("$ZodIPv6",(e,t)=>{t.pattern??(t.pattern=Ko),C.init(e,t),e._zod.check=(n)=>{if(!ni(n.value))n.issues.push({code:"invalid_format",format:"ipv6",input:n.value,inst:e,continue:!t.abort})}});var oi=h("$ZodCIDRv4",(e,t)=>{t.pattern??(t.pattern=Xo),C.init(e,t)});function El(e){let t=e.split("/");if(t.length!==2)return!1;let[n,r]=t;if(!r)return!1;let o=Number(r);if(`${o}`!==r)return!1;if(o<0||o>128)return!1;return ni(n)}var si=h("$ZodCIDRv6",(e,t)=>{t.pattern??(t.pattern=Qo),C.init(e,t),e._zod.check=(n)=>{if(!El(n.value))n.issues.push({code:"invalid_format",format:"cidrv6",input:n.value,inst:e,continue:!t.abort})}});function ii(e){if(e==="")return!0;if(/\s/.test(e))return!1;if(e.length%4!==0)return!1;try{return atob(e),!0}catch{return!1}}var tr=/^[0-9a-zA-Z+/]*={0,2}$/,ai=h("$ZodBase64",(e,t)=>{t.pattern??(t.pattern=tr),C.init(e,t),e._zod.check=(n)=>{if(ii(n.value))return;n.issues.push({code:"invalid_format",format:"base64",input:n.value,inst:e,continue:!t.abort})}}),Mt=/^[A-Za-z0-9_-]*$/;function kl(e){if(!Mt.test(e))return!1;let t=e.replace(/[-_]/g,(r)=>r==="-"?"+":"/"),n=t.padEnd(Math.ceil(t.length/4)*4,"=");return ii(n)}var ci=h("$ZodBase64URL",(e,t)=>{t.pattern??(t.pattern=Mt),C.init(e,t),e._zod.check=(n)=>{if(kl(n.value))return;n.issues.push({code:"invalid_format",format:"base64url",input:n.value,inst:e,continue:!t.abort})}}),ui=h("$ZodE164",(e,t)=>{t.pattern??(t.pattern=rs),C.init(e,t)});function Tl(e,t=null){try{let n=e.split(".");if(n.length!==3)return!1;let[r]=n;if(!r)return!1;let o=JSON.parse(atob(r));if("typ"in o&&o?.typ!=="JWT")return!1;if(!o.alg)return!1;if(t&&(!("alg"in o)||o.alg!==t))return!1;return!0}catch{return!1}}var li=h("$ZodJWT",(e,t)=>{C.init(e,t),e._zod.check=(n)=>{if(Tl(n.value,t.alg))return;n.issues.push({code:"invalid_format",format:"jwt",input:n.value,inst:e,continue:!t.abort})}});var nr=h("$ZodNumber",(e,t)=>{R.init(e,t),e._zod.pattern=rt,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=Number(n.value)}catch(i){}let o=n.value;if(typeof o==="number"&&!Number.isNaN(o)&&Number.isFinite(o))return n;let s=typeof o==="number"?Number.isNaN(o)?"NaN":!Number.isFinite(o)?String(o):void 0:void 0;return n.issues.push({expected:"number",code:"invalid_type",input:o,inst:e,...s?{received:s}:{}}),n}}),pi=h("$ZodNumberFormat",(e,t)=>{hs.init(e,t),nr.init(e,t)}),fi=h("$ZodBoolean",(e,t)=>{R.init(e,t),e._zod.pattern=ls,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=Boolean(n.value)}catch(s){}let o=n.value;if(typeof o==="boolean")return n;return n.issues.push({expected:"boolean",code:"invalid_type",input:o,inst:e}),n}}),di=h("$ZodBigInt",(e,t)=>{R.init(e,t),e._zod.pattern=us,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=BigInt(n.value)}catch(o){}if(typeof n.value==="bigint")return n;return n.issues.push({expected:"bigint",code:"invalid_type",input:n.value,inst:e}),n}});var hi=h("$ZodUnknown",(e,t)=>{R.init(e,t),e._zod.parse=(n)=>n}),mi=h("$ZodNever",(e,t)=>{R.init(e,t),e._zod.parse=(n,r)=>(n.issues.push({expected:"never",code:"invalid_type",input:n.value,inst:e}),n)});var gi=h("$ZodDate",(e,t)=>{R.init(e,t),e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=new Date(n.value)}catch(a){}let o=n.value,s=o instanceof Date;if(s&&!Number.isNaN(o.getTime()))return n;return n.issues.push({expected:"date",code:"invalid_type",input:o,...s?{received:"Invalid Date"}:{},inst:e}),n}});function Ol(e,t){let n=Fn(e._zod.def.checks);if(!n.length)return;let r=Math.min(...n.map((s)=>s[0])),o=e._zod.parse;e._zod.parse=(s,i)=>{let a=t(s.value);if(a>r&&!i?.skipChecks&&i?.direction!=="backward"){for(let[c,u]of Fn(e._zod.def.checks))if(a>c&&u._zod.def.when(s)){let l=s.issues.length;return u._zod.check(s),s.issues[l].continue=!1,kt(s.issues,l,e),s}}return o(s,i)}}var Il=(e)=>Array.isArray(e)?e.length:-1;function ks(e,t,n){if(e.issues.length)t.issues.push(...Oe(n,e.issues));t.value[n]=e.value}var _i=h("$ZodArray",(e,t)=>{R.init(e,t);let n=q.memoizer;n?.attach(e),e._zod.parse=(r,o)=>{let s=r.value;if(!Array.isArray(s))return r.issues.push({expected:"array",code:"invalid_type",input:s,inst:e}),r;r.value=n?n.alloc(e,r,Array(s.length),o):Array(s.length);let i=[],a=o?.abortEarly;for(let c=0;c<s.length;c++){let u=s[c],l=t.element._zod.run({value:u,issues:[]},o);if(l instanceof Promise)i.push(l.then((p)=>ks(p,r,c)));else if(ks(l,r,c),a&&l.issues.length!==0&&ge(l))break}if(i.length)return Promise.all(i).then(()=>r);return r},Ol(e,Il)});function jt(e,t,n,r,o,s){let i=n in r,a=s==="optional";if(!i&&a&&o==="optional")return;if(e.issues.length){if(o!==void 0&&a&&!i)return;t.issues.push(...Oe(n,e.issues))}if(!i&&o===void 0){if(!e.issues.length)t.issues.push({code:"invalid_type",expected:"nonoptional",input:void 0,path:[n]});return}if(e.value===void 0){if(i||o==="defaulted"&&!a)t.value[n]=void 0}else t.value[n]=e.value}var Al=[];function yi(e){let t=Object.keys(e.shape),n=Object.getOwnPropertySymbols(e.shape),r=n.length?n:Al,o=r.length?[...t,...r]:t;for(let i of o)if(!e.shape?.[i]?._zod?.traits?.has("$ZodType"))throw Error(`Invalid element at key "${String(i)}": expected a Zod schema`);let s=go(e.shape);return{...e,allKeys:o,symbolKeys:r,keySet:new Set(t),numKeys:t.length,optionalKeys:new Set(s)}}function vi(e,t,n,r,o,s,i){let a=[],c=o.keySet,u=o.catchall._zod,l=u.def.type,{optin:p,optout:d}=u,f=0;for(let m in t){if(i&&n.issues.length!==f){if(ge(n,f))break;f=n.issues.length}if(c.has(m))continue;if(m==="__proto__"){if(l==="never")a.push(m);continue}if(l==="never"){a.push(m);continue}let g=u.run({value:t[m],issues:[]},r);if(g instanceof Promise)e.push(g.then((y)=>jt(y,n,m,t,p,d)));else jt(g,n,m,t,p,d)}if(a.length)n.issues.push({code:"unrecognized_keys",keys:a,input:t,inst:s,continue:!0});if(!e.length)return n;return Promise.all(e).then(()=>n)}var Rl=h("$ZodObject",(e,t)=>{R.init(e,t);let n=Object.getOwnPropertyDescriptor(t,"shape"),r=n?.get?n.get.raw:t.shape??{};if(r){let u=()=>{let l={...r};return Object.defineProperty(t,"shape",{value:l}),u.raw=l,l};u.raw=r,Object.defineProperty(t,"shape",{get:u})}let o=xt(()=>yi(t));O(e,"propValues",(u)=>{let l=u.def.shape,p={};for(let d in l){let f=l[d]._zod;if(f.values){if(!Object.prototype.hasOwnProperty.call(p,d))ce(p,d,new Set);for(let m of f.values)p[d].add(m);if(f.optin!==void 0)p[d].add(void 0)}}return p});let s=Qe,i=t.catchall,a,c=q.memoizer;c?.attach(e),e._zod.parse=(u,l)=>{a??(a=o.value);let p=u.value;if(!s(p))return u.issues.push({expected:"object",code:"invalid_type",input:p,inst:e}),u;u.value=c?c.alloc(e,u,{},l):{};let d=[],f=a.shape,m=l?.abortEarly,g=u.issues.length;for(let y of a.allKeys){if(m&&u.issues.length!==g){if(ge(u,g))break;g=u.issues.length}if(y==="__proto__")continue;let S=f[y],I=S._zod.optin,N=S._zod.optout,Z=S._zod.run({value:p[y],issues:[]},l);if(Z instanceof Promise)d.push(Z.then((z)=>jt(z,u,y,p,I,N)));else jt(Z,u,y,p,I,N)}if(!i)return d.length?Promise.all(d).then(()=>u):u;return vi(d,p,u,l,o.value,e,m===!0)}}),wi=h("$ZodObjectJIT",(e,t)=>{Rl.init(e,t);let n=e._zod.parse,r=xt(()=>yi(t)),o=q.memoizer,s=(f)=>{let m=r.value,g=m.symbolKeys,y=new Xn(["payload","ctx"],{shape:f,inst:e,memo:o,syms:g}),S=(z)=>`shape[${z}]._zod.run({ value: input[${z}], issues: [] }, ctx)`,I=(z,x)=>`
          let ${z}_ab = false;
          for (let i = 0; i < ${z}.issues.length; i++) {
            const iss = ${z}.issues[i];
            iss.path = iss.path ? [${x}, ...iss.path] : [${x}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${z}_ab = true;
          }
          if (${z}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;y.write("const input = payload.value;");let N=Object.create(null),Z=0;for(let z of m.allKeys)N[z]=`key_${Z++}`;y.write(o?"const newResult = memo.alloc(inst, payload, {}, ctx);":"const newResult = {};");for(let z of m.allKeys){if(z==="__proto__")continue;let x=N[z],k=typeof z==="symbol"?`syms[${g.indexOf(z)}]`:po(z),P=`${k} in input`,b=f[z],A=b?._zod?.optin,X=A!==void 0,J=b?._zod?.optout==="optional";if(y.write(`const ${x} = ${S(k)};`),X&&J){let ze=A==="optional"?`${x}_present`:`${x}.value !== undefined || ${x}_present`;y.write(`
        const ${x}_present = ${P};
        if (!${x}.issues.length || ${x}_present) {
          if (${x}.issues.length) {${I(x,k)}
          }

          if (${ze}) {
            newResult[${k}] = ${x}.value;
          }
        }

      `)}else if(!X)y.write(`
        const ${x}_present = ${P};
        if (${x}.issues.length) {${I(x,k)}
        }
        if (!${x}_present && !${x}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${k}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${x}_present) {
          newResult[${k}] = ${x}.value;
        }

      `);else if(y.write(`
        if (${x}.issues.length) {${I(x,k)}
        }
      `),A==="defaulted")y.write(`newResult[${k}] = ${x}.value;`);else y.write(`
        if (${x}.value !== undefined || ${P}) {
          newResult[${k}] = ${x}.value;
        }
      `)}return y.write("payload.value = newResult;"),y.write("return payload;"),y.compile()},i,a=Qe,c=!q.jitless,l=c&&ho.value,p=t.catchall,d;e._zod.parse=(f,m)=>{d??(d=r.value);let g=f.value;if(!a(g))return f.issues.push({expected:"object",code:"invalid_type",input:g,inst:e}),f;if(c&&l&&m?.async===!1&&m.jitless!==!0){if(!i)i=s(t.shape);if(f=i(f,m),!p)return f;return vi([],g,f,m,d,e,m?.abortEarly===!0)}return n(f,m)}});function Ts(e,t,n,r){for(let s of e)if(s.issues.length===0)return t.value=s.value,t;let o=e.filter((s)=>!ge(s));if(o.length===1)return t.value=o[0].value,o[0];return t.issues.push({code:"invalid_union",input:t.value,inst:n,errors:e.map((s)=>s.issues.map((i)=>_e(i,r,ee())))}),t}var bi=h("$ZodUnion",(e,t)=>{R.init(e,t),O(e,"optin",(r)=>r.def.options.some((o)=>o._zod.optin==="defaulted")?"defaulted":r.def.options.some((o)=>o._zod.optin!==void 0)?"optional":void 0),O(e,"optout",(r)=>r.def.options.some((o)=>o._zod.optout==="optional")?"optional":void 0),O(e,"values",(r)=>{if(r.def.options.every((o)=>o._zod.values))return new Set(r.def.options.flatMap((o)=>Array.from(o._zod.values)));return}),O(e,"pattern",(r)=>{if(r.def.options.every((o)=>o._zod.pattern)){let o=r.def.options.map((s)=>s._zod.pattern);return new RegExp(`^(${o.map((s)=>St(s.source)).join("|")})$`)}return});let n=t.options.length===1?t.options[0]._zod.run:null;e._zod.parse=(r,o)=>{if(n)return n(r,o);let s=!1,i=[];for(let a of t.options){let c=a._zod.run({value:r.value,issues:[]},o);if(c instanceof Promise)i.push(c),s=!0;else{if(c.issues.length===0)return c;i.push(c)}}if(!s)return Ts(i,r,e,o);return Promise.all(i).then((a)=>Ts(a,r,e,o))}});var $i=h("$ZodIntersection",(e,t)=>{R.init(e,t),e._zod.parse=(n,r)=>{let o=n.value,s=t.left._zod.run({value:o,issues:[]},r),i=t.right._zod.run({value:o,issues:[]},r);if(s instanceof Promise||i instanceof Promise)return Promise.all([s,i]).then(([c,u])=>Os(n,c,u));return Os(n,s,i)}});function Qn(e,t){if(e===t)return{valid:!0,data:e};if(e instanceof Date&&t instanceof Date&&+e===+t)return{valid:!0,data:e};if(Ze(e)&&Ze(t)){let n=Object.keys(t),r=Object.keys(e).filter((s)=>n.indexOf(s)!==-1),o={...e,...t};if(Object.prototype.hasOwnProperty.call(o,"__proto__"))delete o.__proto__;for(let s of r){if(s==="__proto__")continue;let i=Qn(e[s],t[s]);if(!i.valid)return{valid:!1,mergeErrorPath:[s,...i.mergeErrorPath]};o[s]=i.data}return{valid:!0,data:o}}if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return{valid:!1,mergeErrorPath:[]};let n=[];for(let r=0;r<e.length;r++){let o=e[r],s=t[r],i=Qn(o,s);if(!i.valid)return{valid:!1,mergeErrorPath:[r,...i.mergeErrorPath]};n.push(i.data)}return{valid:!0,data:n}}return{valid:!1,mergeErrorPath:[]}}function Os(e,t,n){let r=new Map,o,s=new Map,i=(u,l)=>{let p;if(u.code==="unrecognized_keys"&&!u.path?.length)o??(o=u),p=u.keys;else if(u.code==="invalid_key"&&u.origin==="record"&&u.path?.length===1){let d=String(u.path[0]);if(!s.has(d))s.set(d,u);p=[d]}else return!1;for(let d of p){if(!r.has(d))r.set(d,{});r.get(d)[l]=!0}return!0};for(let u of t.issues)if(!i(u,"l"))e.issues.push(u);for(let u of n.issues)if(!i(u,"r"))e.issues.push(u);let a=[...r].filter(([,u])=>u.l&&u.r).map(([u])=>u);if(a.length){let u=o?a.filter((l)=>o.keys.includes(l)):[];if(u.length)e.issues.push({...o,keys:u});for(let l of a)if(!u.includes(l)&&s.has(l))e.issues.push(s.get(l))}let c=Qn(t.value,n.value);if(!c.valid){if(ge(e))return e;throw Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`)}return e.value=c.data,e}var xi=h("$ZodRecord",(e,t)=>{R.init(e,t);let n=q.memoizer;n?.attach(e),e._zod.parse=(r,o)=>{let s=r.value;if(!Ze(s))return r.issues.push({expected:"record",code:"invalid_type",input:s,inst:e}),r;let i=[],a=t.keyType._zod.values;if(a&&!t.partial){r.value=n?n.alloc(e,r,{},o):{};let c=new Set;for(let l of a)if(typeof l==="string"||typeof l==="number"||typeof l==="symbol"){if(c.add(typeof l==="number"?l.toString():l),l==="__proto__")continue;let p=t.keyType._zod.run({value:l,issues:[]},o);if(p instanceof Promise)throw Error("Async schemas not supported in object keys currently");if(p.issues.length){r.issues.push({code:"invalid_key",origin:"record",issues:p.issues.map((m)=>_e(m,o,ee())),input:l,path:[l],inst:e});continue}let d=p.value;if(d==="__proto__")continue;let f=t.valueType._zod.run({value:s[l],issues:[]},o);if(f instanceof Promise)i.push(f.then((m)=>{if(m.issues.length)r.issues.push(...Oe(l,m.issues));r.value[d]=m.value}));else{if(f.issues.length)r.issues.push(...Oe(l,f.issues));r.value[d]=f.value}}let u;for(let l in s)if(!c.has(l))if(t.mode==="loose"){if(l==="__proto__")continue;r.value[l]=s[l]}else u=u??[],u.push(l);if(u&&u.length>0)r.issues.push({code:"unrecognized_keys",input:s,inst:e,keys:u,continue:!0})}else{r.value=n?n.alloc(e,r,{},o):{};let c;for(let u of Reflect.ownKeys(s)){if(u==="__proto__")continue;if(!Object.prototype.propertyIsEnumerable.call(s,u))continue;let l=t.keyType._zod.run({value:u,issues:[]},o);if(l instanceof Promise)throw Error("Async schemas not supported in object keys currently");if(typeof u==="string"&&rt.test(u)&&l.issues.length){let m=t.keyType._zod.run({value:Number(u),issues:[]},o);if(m instanceof Promise)throw Error("Async schemas not supported in object keys currently");if(m.issues.length===0)l=m}if(l.issues.length){if(t.mode==="loose")r.value[u]=s[u];else if(a)c=c??[],c.push(u);else r.issues.push({code:"invalid_key",origin:"record",issues:l.issues.map((m)=>_e(m,o,ee())),input:u,path:[u],inst:e});continue}let d=l.value;if(d==="__proto__")continue;let f=t.valueType._zod.run({value:s[u],issues:[]},o);if(f instanceof Promise)i.push(f.then((m)=>{if(m.issues.length)r.issues.push(...Oe(u,m.issues));r.value[d]=m.value}));else{if(f.issues.length)r.issues.push(...Oe(u,f.issues));r.value[d]=f.value}}if(c&&c.length>0)r.issues.push({code:"unrecognized_keys",input:s,inst:e,keys:c,continue:!0})}if(i.length)return Promise.all(i).then(()=>r);return r}});var Si=h("$ZodEnum",(e,t)=>{R.init(e,t);let n=et(t.entries),r=new Set(n);e._zod.values=r,O(e,"pattern",(o)=>{let s=et(o.def.entries).filter((i)=>mo.has(typeof i));return new RegExp(s.length?`^(${s.map((i)=>Te(i.toString())).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(o,s)=>{let i=o.value;if(r.has(i))return o;return o.issues.push({code:"invalid_value",values:n,input:i,inst:e}),o}}),Pi=h("$ZodLiteral",(e,t)=>{R.init(e,t);let n=new Set(t.values);e._zod.values=n,O(e,"pattern",(r)=>{let o=r.def.values;return new RegExp(o.length?`^(${o.map((s)=>typeof s==="string"?Te(s):s?Te(s.toString()):String(s)).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(r,o)=>{let s=r.value;if(n.has(s))return r;return r.issues.push({code:"invalid_value",values:t.values,input:s,inst:e}),r}});var zi=h("$ZodTransform",(e,t)=>{R.init(e,t),e._zod.optin="optional",q.memoizer?.guard(e),e._zod.parse=(n,r)=>{if(r.direction==="backward")throw new nt(e.constructor.name);let o=t.transform(n.value,n);if(r.async)return(o instanceof Promise?o:Promise.resolve(o)).then((i)=>(n.value=i,n));if(o instanceof Promise)throw new ye;return n.value=o,n}});function Is(e,t){return e.value=t.issues.length?void 0:t.value,e}var rr=h("$ZodOptional",(e,t)=>{R.init(e,t),O(e,"optin",(n)=>n.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),e._zod.optout="optional",O(e,"values",(n)=>{let r=n.def.innerType._zod.values;return r?new Set([...r,void 0]):void 0}),O(e,"pattern",(n)=>{let r=n.def.innerType._zod.pattern;return r?new RegExp(`^(${St(r.source)})?$`):void 0}),e._zod.parse=(n,r)=>{if(n.value===void 0){if(t.innerType._zod.optin!=="defaulted")return n;let o=t.innerType._zod.run({value:n.value,issues:[]},r);if(o instanceof Promise)return o.then((s)=>Is(n,s));return Is(n,o)}return t.innerType._zod.run(n,r)}}),Ei=h("$ZodExactOptional",(e,t)=>{rr.init(e,t),O(e,"values",(n)=>n.def.innerType._zod.values),O(e,"pattern",(n)=>n.def.innerType._zod.pattern),e._zod.parse=(n,r)=>t.innerType._zod.run(n,r)}),ki=h("$ZodNullable",(e,t)=>{R.init(e,t),O(e,"optin",(n)=>n.def.innerType._zod.optin),O(e,"optout",(n)=>n.def.innerType._zod.optout),O(e,"pattern",(n)=>{let r=n.def.innerType._zod.pattern;return r?new RegExp(`^(${St(r.source)}|null)$`):void 0}),O(e,"values",(n)=>n.def.innerType._zod.values?new Set([...n.def.innerType._zod.values,null]):void 0),e._zod.parse=(n,r)=>{if(n.value===null)return n;return t.innerType._zod.run(n,r)}}),Ti=h("$ZodDefault",(e,t)=>{R.init(e,t),e._zod.optin="defaulted",O(e,"values",(n)=>n.def.innerType._zod.values),e._zod.parse=(n,r)=>{if(r.direction==="backward")return t.innerType._zod.run(n,r);if(n.value===void 0)return n.value=t.defaultValue,n;let o=t.innerType._zod.run(n,r);if(o instanceof Promise)return o.then((s)=>As(s,t));return As(o,t)}});function As(e,t){if(e.value===void 0)e.value=t.defaultValue;return e}var Oi=h("$ZodPrefault",(e,t)=>{R.init(e,t),e._zod.optin="defaulted",O(e,"values",(n)=>n.def.innerType._zod.values),e._zod.parse=(n,r)=>{if(r.direction==="backward")return t.innerType._zod.run(n,r);if(n.value===void 0)n.value=t.defaultValue;return t.innerType._zod.run(n,r)}}),Ii=h("$ZodNonOptional",(e,t)=>{R.init(e,t),O(e,"values",(n)=>{let r=n.def.innerType._zod.values;return r?new Set([...r].filter((o)=>o!==void 0)):void 0}),e._zod.parse=(n,r)=>{let o=t.innerType._zod.run(n,r);if(o instanceof Promise)return o.then((s)=>Rs(s,e));return Rs(o,e)}});function Rs(e,t){if(!e.issues.length&&e.value===void 0)e.issues.push({code:"invalid_type",expected:"nonoptional",input:e.value,inst:t});return e}function Zs(e,t,n,r){if(!t.issues.length){if(e.value=t.value,t.memo)e.memo=!0;return e}return e.value=n.catchValue({...t,value:e.value,error:{issues:t.issues.map((o)=>_e(o,r,ee()))},input:e.value}),e}var Ai=h("$ZodCatch",(e,t)=>{R.init(e,t),O(e,"optin",(n)=>n.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),O(e,"optout",(n)=>n.def.innerType._zod.optout),O(e,"values",(n)=>n.def.innerType._zod.values),e._zod.parse=(n,r)=>{if(r.direction==="backward")return t.innerType._zod.run(n,r);let o=t.innerType._zod.run({value:n.value,issues:[]},r);if(o instanceof Promise)return o.then((s)=>Zs(n,s,t,r));return Zs(n,o,t,r)}});var Ri=h("$ZodPipe",(e,t)=>{R.init(e,t),O(e,"values",(n)=>n.def.in._zod.values),O(e,"optin",(n)=>n.def.in._zod.optin),O(e,"optout",(n)=>n.def.out._zod.optout),O(e,"propValues",(n)=>n.def.in._zod.propValues),e._zod.parse=(n,r)=>{if(r.direction==="backward"){let s=t.out._zod.run(n,r);if(s instanceof Promise)return s.then((i)=>Ut(i,t.in,r));return Ut(s,t.in,r)}let o=t.in._zod.run(n,r);if(o instanceof Promise)return o.then((s)=>Ut(s,t.out,r));return Ut(o,t.out,r)}});function Ut(e,t,n){if(e.issues.some((r)=>r.code!=="unrecognized_keys"))return e.aborted=!0,e;return t._zod.run({value:e.value,issues:e.issues},n)}var Zi=h("$ZodReadonly",(e,t)=>{R.init(e,t),O(e,"propValues",(n)=>n.def.innerType._zod.propValues),O(e,"values",(n)=>n.def.innerType._zod.values),O(e,"optin",(n)=>n.def.innerType?._zod?.optin),O(e,"optout",(n)=>n.def.innerType?._zod?.optout),e._zod.parse=(n,r)=>{if(r.direction==="backward")return t.innerType._zod.run(n,r);let o=t.innerType._zod.run(n,r);if(o instanceof Promise)return o.then(Cs);return Cs(o)}});function Cs(e){if(!e.memo)e.value=Object.freeze(e.value);return e}var Ci=h("$ZodCustom",(e,t)=>{j.init(e,t),R.init(e,t),e._zod.parse=(n,r)=>n,e._zod.check=(n)=>{let r=n.value,o=t.fn(r);if(o instanceof Promise)return o.then((s)=>Ds(s,n,r,e));Ds(o,n,r,e);return}});function Ds(e,t,n,r){if(!e){let o={code:"custom",input:n,inst:r,path:[...r._zod.def.path??[]],continue:!r._zod.def.abort};if(r._zod.def.params)o.params=r._zod.def.params;t.issues.push(Ce(o))}}class Ni extends Error{constructor(){super("Cannot parse a reference cycle that closes through a transform");this.name="ZodCyclicError"}}var sr="~memo",Di=[];function Li(e){return e!==null&&typeof e==="object"}function or(e){return e.map((t)=>t.path?{...t,path:t.path.slice()}:{...t})}var Ui=new WeakMap,it=0,Gt=1,at=2;function Jt(e,t,n){let r=Ui.get(e);if(r!==void 0)return r?at:it;if(t.has(e))return at;t.add(e);let o=it,s=(l)=>{if(o!==at&&l?._zod){let p=Jt(l,t,n);if(p>o)o=p}},i=(l,p)=>{let d=it;for(let f of Reflect.ownKeys(l)){let m=Object.getOwnPropertyDescriptor(l,f);if(p&&!m.enumerable)continue;let g=m.get?Gt:m.value?._zod?Jt(m.value,t,n):it;if(g>d)d=g}return d},a=(l)=>{if(l>o)o=l},c=e._zod.def,u=c.type;switch(u){case"object":{let l=Pt(c);a(l?i(l,!0):Gt),s(c.catchall);break}case"array":s(c.element);break;case"tuple":for(let l of c.items)s(l);s(c.rest);break;case"record":case"map":s(c.keyType),s(c.valueType);break;case"set":s(c.valueType);break;case"union":for(let l of c.options)s(l);break;case"intersection":s(c.left),s(c.right);break;case"optional":case"nullable":case"default":case"prefault":case"catch":case"readonly":case"nonoptional":case"promise":case"success":s(c.innerType);break;case"pipe":s(c.in),s(c.out);break;case"function":s(c.input),s(c.output);break;case"lazy":{let l=c._cachedInner??(n?e._zod.innerType:void 0);a(l?Jt(l,t,!1):Gt);break}case"template_literal":case"string":case"number":case"int":case"boolean":case"bigint":case"symbol":case"undefined":case"null":case"void":case"never":case"any":case"unknown":case"date":case"nan":case"enum":case"literal":case"file":case"transform":case"custom":break;default:for(let l in c){let p=Object.getOwnPropertyDescriptor(c,l);if(!p||p.get)continue;let d=p.value;if(!d||typeof d!=="object")continue;if(d._zod)s(d);else if(Array.isArray(d))for(let f of d)s(f)}}return t.delete(e),Zl(e,o)}function Zl(e,t){if(t!==Gt)Ui.set(e,t===at);return t}function Cl(e,t){let n=e.buckets.get(t);if(!n)n=new WeakMap,e.buckets.set(t,n);return n}var Wt,Ht=[],Dl={alloc(e,t,n){let r=Wt;if(!r)return n;Wt=void 0;let o={value:n,issues:null};return r.set(t.value,o),Ht.push(o),n},guard(e){var t;(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred.push(()=>{let n=e._zod.parse,r=(o,s)=>{if(s.direction!=="backward"&&Nl(s,o.value))throw new Ni;return n(o,s)};if(e._zod.parse=r,e._zod.run===n)e._zod.run=r})},attach(e){var t;let n,r=!1,o,s;(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred.push(()=>{let i=e._zod.parse,a=(c,u)=>{if(n===void 0){let S=Jt(e,new Set,!1);if(S===it){if(e._zod.parse=i,e._zod.run===a)e._zod.run=i;return i(c,u)}if(S===at||r)n=!0;else r=!0}let l=c.value;if(!Li(l))return i(c,u);let p=u[sr];if(!p)p={buckets:new WeakMap,backEdges:void 0},u[sr]=p;let d;if(o===u)d=s;else d=Cl(p,e),o=u,s=d;let f=d.get(l);if(f){if(c.value=f.value,f.issues){if(f.issues.length)c.issues.push(...or(f.issues))}else c.memo=!0,p.backEdges??(p.backEdges=new WeakSet),p.backEdges.add(f.value);return c}Wt=d;let m=Ht.length,g=i(c,u);Wt=void 0;let y=Ht.length>m?Ht.pop():void 0;if(g instanceof Promise)return g.then((S)=>{if(y)y.issues=S.issues.length?or(S.issues):Di;return S});if(y)y.issues=g.issues.length?or(g.issues):Di;return g};if(e._zod.parse=a,e._zod.run===i)e._zod.run=a})}};function Fi(){return Dl}function Nl(e,t){let n=e[sr]?.backEdges;return n!==void 0&&Li(t)&&n.has(t)}var Ll=()=>{let e={string:{unit:"characters",verb:"to have"},file:{unit:"bytes",verb:"to have"},array:{unit:"items",verb:"to have"},set:{unit:"items",verb:"to have"},map:{unit:"entries",verb:"to have"}};function t(s){return e[s]??null}let n={regex:"input",email:"email address",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO datetime",date:"ISO date",time:"ISO time",duration:"ISO duration",ipv4:"IPv4 address",ipv6:"IPv6 address",mac:"MAC address",cidrv4:"IPv4 range",cidrv6:"IPv6 range",base64:"base64-encoded string",base64url:"base64url-encoded string",json_string:"JSON string",e164:"E.164 number",currency_code:"currency code",credit_card:"credit card number",iban:"IBAN",jwt:"JWT",template_literal:"input"},r={nan:"NaN"};function o(s,i){if(s==="number"&&typeof i==="number"&&!Number.isFinite(i))return String(i);return r[s]??s}return(s)=>{switch(s.code){case"invalid_type":{let i=o(s.expected),a=wo(s.input),c=o(a,s.input);return`Invalid input: expected ${i}, received ${c}`}case"invalid_value":if(s.values.length===1)return`Invalid input: expected ${Ln(s.values[0])}`;return`Invalid option: expected one of ${Cn(s.values,"|")}`;case"too_big":{let i=s.exact?"exactly ":s.inclusive?"<=":"<",a=t(s.origin);if(a)return`Too big: expected ${s.origin??"value"} to have ${i}${s.maximum.toString()} ${a.unit??"elements"}`;return`Too big: expected ${s.origin??"value"} to be ${i}${s.maximum.toString()}`}case"too_small":{let i=s.exact?"exactly ":s.inclusive?">=":">",a=t(s.origin);if(a)return`Too small: expected ${s.origin} to have ${i}${s.minimum.toString()} ${a.unit}`;return`Too small: expected ${s.origin} to be ${i}${s.minimum.toString()}`}case"invalid_format":{let i=s;if(i.format==="starts_with")return`Invalid string: must start with "${i.prefix}"`;if(i.format==="ends_with")return`Invalid string: must end with "${i.suffix}"`;if(i.format==="includes")return`Invalid string: must include "${i.includes}"`;if(i.format==="regex")return`Invalid string: must match pattern ${i.pattern}`;return`Invalid ${n[i.format]??s.format}`}case"not_multiple_of":return`Invalid number: must be a multiple of ${s.divisor}`;case"unrecognized_keys":return`Unrecognized key${s.keys.length>1?"s":""}: ${Cn(s.keys,", ")}`;case"invalid_key":return`Invalid key in ${s.origin}`;case"invalid_union":if(s.options&&Array.isArray(s.options)&&s.options.length>0)return`Invalid discriminator value. Expected ${s.options.map((a)=>`'${a}'`).join(" | ")}`;if(s.inclusive===!1)return"Invalid input: more than one option matched";return"Invalid input";case"invalid_element":return`Invalid value in ${s.origin}`;default:return"Invalid input"}}};function ir(){return{localeError:Ll()}}var ji;class Bi{constructor(){this._map=new WeakMap,this._idmap=new Map}add(e,...t){let n=t[0];if(this._map.set(e,n),n&&typeof n==="object"&&"id"in n)this._idmap.set(n.id,e);return this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(e){let t=this._map.get(e);if(t&&typeof t==="object"&&"id"in t)this._idmap.delete(t.id);return this._map.delete(e),this}get(e){let t=e._zod.parent;if(t){let n={...this.get(t)??{}};delete n.id;let r={...n,...this._map.get(e)};return Object.keys(r).length?r:void 0}return this._map.get(e)}has(e){return this._map.has(e)}}function Ul(){return new Bi}(ji=globalThis).__zod_globalRegistry??(ji.__zod_globalRegistry=Ul());var De=globalThis.__zod_globalRegistry;function Yt(e){if(e.checks)e.checks=[...e.checks];return e}function Mi(e,t){return new e(Yt({type:"string",...v(t)}))}function Wi(e,t){return new e(Yt({type:"string",coerce:!0,...v(t)}))}function Hi(e,t){return new e({type:"string",format:"email",check:"string_format",abort:!1,...v(t)})}function Gi(e,t){return new e({type:"string",format:"guid",check:"string_format",abort:!1,...v(t)})}function Ji(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,...v(t)})}function Yi(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v4",...v(t)})}function qi(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v6",...v(t)})}function Vi(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v7",...v(t)})}function ar(e,t){return new e({type:"string",format:"url",check:"string_format",abort:!1,...v(t)})}function Ki(e,t){return new e({type:"string",format:"emoji",check:"string_format",abort:!1,...v(t)})}function Xi(e,t){return new e({type:"string",format:"nanoid",check:"string_format",abort:!1,...v(t)})}function Qi(e,t){return new e({type:"string",format:"cuid",check:"string_format",abort:!1,...v(t)})}function ea(e,t){return new e({type:"string",format:"cuid2",check:"string_format",abort:!1,...v(t)})}function ta(e,t){return new e({type:"string",format:"ulid",check:"string_format",abort:!1,...v(t)})}function na(e,t){return new e({type:"string",format:"xid",check:"string_format",abort:!1,...v(t)})}function ra(e,t){return new e({type:"string",format:"ksuid",check:"string_format",abort:!1,...v(t)})}function oa(e,t){return new e({type:"string",format:"ipv4",check:"string_format",abort:!1,...v(t)})}function sa(e,t){return new e({type:"string",format:"ipv6",check:"string_format",abort:!1,...v(t)})}function ia(e,t){return new e({type:"string",format:"cidrv4",check:"string_format",abort:!1,...v(t)})}function aa(e,t){return new e({type:"string",format:"cidrv6",check:"string_format",abort:!1,...v(t)})}function ca(e,t){return new e({type:"string",format:"base64",check:"string_format",abort:!1,...v(t)})}function ua(e,t){return new e({type:"string",format:"base64url",check:"string_format",abort:!1,...v(t)})}function la(e,t){return new e({type:"string",format:"e164",check:"string_format",abort:!1,...v(t)})}function pa(e,t){return new e({type:"string",format:"jwt",check:"string_format",abort:!1,...v(t)})}function qt(e,t){return new e({type:"string",format:"datetime",check:"string_format",offset:!1,local:!1,precision:null,...v(t)})}function Vt(e,t){return new e({type:"string",format:"date",check:"string_format",...v(t)})}function Kt(e,t){return new e({type:"string",format:"time",check:"string_format",precision:null,...v(t)})}function Xt(e,t){return new e({type:"string",format:"duration",check:"string_format",...v(t)})}function fa(e,t){return new e(Yt({type:"number",checks:[],...v(t)}))}function da(e,t){return new e(Yt({type:"number",coerce:!0,checks:[],...v(t)}))}function ha(e,t){return new e({type:"number",check:"number_format",abort:!1,format:"safeint",...v(t)})}function ma(e,t){return new e({type:"boolean",...v(t)})}function ga(e,t){return new e({type:"boolean",coerce:!0,...v(t)})}function _a(e,t){return new e({type:"bigint",coerce:!0,...v(t)})}function ya(e){return new e({type:"unknown"})}function va(e,t){return new e({type:"never",...v(t)})}function wa(e,t){return new e({type:"date",coerce:!0,...v(t)})}function Be(e,t){return new Vn({check:"less_than",...v(t),value:e,inclusive:!1})}function $e(e,t){return new Vn({check:"less_than",...v(t),value:e,inclusive:!0})}function Me(e,t){return new Kn({check:"greater_than",...v(t),value:e,inclusive:!1})}function xe(e,t){return new Kn({check:"greater_than",...v(t),value:e,inclusive:!0})}function ct(e,t){return new ds({check:"multiple_of",...v(t),value:e})}function Qt(e,t){return new ms({check:"max_length",...v(t),maximum:e})}function We(e,t){return new gs({check:"min_length",...v(t),minimum:e})}function en(e,t){return new _s({check:"length_equals",...v(t),length:e})}function cr(e,t){return new ys({check:"string_format",format:"regex",...v(t),pattern:e})}function ur(e){return new vs({check:"string_format",format:"lowercase",...v(e)})}function lr(e){return new ws({check:"string_format",format:"uppercase",...v(e)})}function pr(e,t){return new bs({check:"string_format",format:"includes",...v(t),includes:e})}function fr(e,t){return new $s({check:"string_format",format:"starts_with",...v(t),prefix:e})}function dr(e,t){return new xs({check:"string_format",format:"ends_with",...v(t),suffix:e})}function Ie(e){return new Ss({check:"overwrite",tx:e})}function hr(e){return Ie((t)=>t.normalize(e))}function mr(){return Ie((e)=>e.trim())}function gr(){return Ie((e)=>e.toLowerCase())}function _r(){return Ie((e)=>e.toUpperCase())}function yr(){return Ie((e)=>fo(e))}function ba(e,t,n){return new e({type:"array",element:t,...v(n)})}function $a(e,t,n){return new e({type:"custom",check:"custom",fn:t,...v(n)})}function xa(e,t){let n=Fl((r)=>(r.addIssue=(o)=>{if(typeof o==="string")r.issues.push(Ce(o,r.value,n._zod.def));else{let s=o;if(s.fatal)s.continue=!1;if(s.code??(s.code="custom"),!("input"in s))s.input=r.value;s.inst??(s.inst=n),s.continue??(s.continue=!n._zod.def.abort),r.issues.push(Ce(s))}},e(r.value,r)),t);return n}function Fl(e,t){let n=new j({check:"custom",...v(t)});return n._zod.check=e,n}function ut(e,...t){for(let n of t)for(let r of Reflect.ownKeys(n))if(Object.prototype.propertyIsEnumerable.call(n,r))ce(e,r,n[r]);return e}function wr(e){let t=e?.target??"draft-2020-12";if(t==="draft-4")t="draft-04";if(t==="draft-7")t="draft-07";return{processors:e.processors??{},metadataRegistry:e?.metadata??De,target:t,unrepresentable:e?.unrepresentable??"throw",override:e?.override??(()=>{}),io:e?.io??"output",counter:0,seen:new Map,sharedDefsExtractedFor:void 0,sharedEmitDoneFor:void 0,cycles:e?.cycles??"ref",reused:e?.reused??"inline",intersections:[],deferred:[],external:e?.external??void 0}}function le(e,t,n,r,o){let s=typeof t.unrepresentable==="function"?t.unrepresentable({zodSchema:e,path:r.path,message:o}):t.unrepresentable;if(s==="any")return!1;if(s===void 0||s==="throw")throw Error(o);return Object.assign(n,s),!0}function U(e,t,n={path:[],schemaPath:[]}){var r;let o=e._zod.def,s=t.seen.get(e);if(s){if(s.count++,n.schemaPath.includes(e))s.cycle=n.path;return s.schema}let i={schema:{},count:1,cycle:void 0,path:n.path};t.seen.set(e,i),t.sharedDefsExtractedFor=void 0,t.sharedEmitDoneFor=void 0;let a=e._zod.toJSONSchema?.();if(a)i.schema=a;else{let l={...n,schemaPath:[...n.schemaPath,e],path:n.path};if(e._zod.processJSONSchema)e._zod.processJSONSchema(t,i.schema,l);else{let d=i.schema,f=t.processors[o.type];if(!f)throw Error(`[toJSONSchema]: Non-representable type encountered: ${o.type}`);f(e,t,d,l)}let p=e._zod.parent;if(p){if(!i.ref)i.ref=p;U(p,t,l),t.seen.get(p).isParent=!0}}let c=t.metadataRegistry.get(e);if(c)ut(i.schema,c);if(t.io==="input"&&Y(e))delete i.schema.examples,delete i.schema.default;if(t.io==="input"&&"_prefault"in i.schema)(r=i.schema).default??(r.default=i.schema._prefault);return delete i.schema._prefault,t.seen.get(e).schema}function Sa(e){return e.replace(/~/g,"~0").replace(/\//g,"~1")}function br(e,t){let n=e.seen.get(t);if(!n)throw Error("Unprocessed schema. This is a bug in Zod.");if(e.external&&e.sharedDefsExtractedFor===e.external)return;let r=new Map;for(let i of e.seen.entries()){let a=e.metadataRegistry.get(i[0])?.id;if(a){let c=r.get(a);if(c&&c!==i[0])throw Error(`Duplicate schema id "${a}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);r.set(a,i[0])}}let o=(i)=>{let a=e.target==="draft-2020-12"?"$defs":"definitions";if(e.external){let p=e.external.registry.get(i[0])?.id,d=e.external.uri??((m)=>m);if(p)return{ref:d(p)};let f=i[1].defId??i[1].schema.id??`schema${e.counter++}`;return i[1].defId=f,{defId:f,ref:`${d("__shared")}#/${a}/${Sa(f)}`}}let c="#",u=`${c}/${a}/`;if(i[1]===n&&!i[1].schema.id)return{ref:c};let l=i[1].schema.id??`__schema${e.counter++}`;return{defId:l,ref:u+Sa(l)}},s=(i)=>{if(i[1].schema.$ref)return;let a=i[1],{ref:c,defId:u}=o(i);if(a.def={...a.schema},u)a.defId=u;let l=a.schema;for(let p in l)delete l[p];l.$ref=c};if(e.cycles==="throw")for(let i of e.seen.entries()){let a=i[1];if(a.cycle)throw Error(`Cycle detected: #/${a.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`)}for(let i of e.seen.entries()){let a=i[1];if(t===i[0]){s(i);continue}if(e.external){let u=e.external.registry.get(i[0])?.id;if(t!==i[0]&&u){s(i);continue}}if(e.metadataRegistry.get(i[0])?.id){s(i);continue}if(a.cycle){s(i);continue}if(a.count>1){if(e.reused==="ref")s(i)}}if(e.external)e.sharedDefsExtractedFor=e.external}function Ea(e){let t=e.anyOf;if(!Array.isArray(t)||t.length===0||e.type!==void 0)return;let n=[];for(let r of t){if(!r||typeof r!=="object")return;Ea(r);let o=Object.keys(r);if(o.length!==1||o[0]!=="type")return;let s=r.type;for(let i of Array.isArray(s)?s:[s]){if(typeof i!=="string")return;if(!n.includes(i))n.push(i)}}delete e.anyOf,e.type=n.length===1?n[0]:n}var ka=new Set(["type","properties","required","additionalProperties"]),Pa=["oneOf","anyOf"];function za(e){let t=e.additionalProperties;if(t===void 0||t===!1||typeof t!=="object"||t===null)return null;return Object.keys(t).length?t:null}function vr(e){let t=[];for(let s of e){if(typeof s!=="object"||s.type!=="object")return null;for(let i in s)if(!ka.has(i))return null;t.push(s)}let n={},r=new Set;for(let s of t){for(let i in s.properties){if(Object.prototype.hasOwnProperty.call(n,i))continue;let a=[];for(let u of t){let l=u.properties?.[i]??za(u);if(l===null||l===void 0)continue;if(!a.some((p)=>JSON.stringify(p)===JSON.stringify(l)))a.push(l)}let c=a.length===1?a[0]:vr(a)??{allOf:a};ce(n,i,c)}for(let i of s.required??[])r.add(i)}let o={type:"object",properties:n};if(r.size)o.required=[...r];if(t.every((s)=>s.additionalProperties===!1))o.additionalProperties=!1;else{let s=[];for(let i of t){let a=za(i);if(a&&!s.some((c)=>JSON.stringify(c)===JSON.stringify(a)))s.push(a)}if(s.length===1)o.additionalProperties=s[0];else if(s.length>1)o.additionalProperties={allOf:s}}return o}function jl(e){let t=e.allOf;if(!Array.isArray(t)||t.length<2)return;for(let o of ka)if(o in e)return;let n=t.filter((o)=>Pa.some((s)=>Array.isArray(o[s]))),r=null;if(!n.length)r=vr(t);else{let o=n[0],s=Pa.find((c)=>Array.isArray(o[c]));if(Object.keys(o).length!==1)return;let i=t.filter((c)=>c!==o),a=o[s].map((c)=>vr([...i,c]));if(a.some((c)=>!c))return;r={[s]:a}}if(!r)return;delete e.allOf,ut(e,r)}function $r(e,t){let n=e.seen.get(t);if(!n)throw Error("Unprocessed schema. This is a bug in Zod.");let r=(a)=>{let c=e.seen.get(a);if(c.ref===null)return;let u=c.def??c.schema,l={...u},p=c.ref;if(c.ref=null,p){r(p);let f=e.seen.get(p),m=f.schema;if(m.$ref&&(e.target==="draft-07"||e.target==="draft-04"||e.target==="openapi-3.0"))u.allOf=u.allOf??[],u.allOf.push(m);else ut(u,m);if(ut(u,l),a._zod.parent===p)for(let y in u){if(y==="$ref"||y==="allOf")continue;if(!(y in l))delete u[y]}if(m.$ref&&f.def)for(let y in u){if(y==="$ref"||y==="allOf")continue;if(y in f.def&&JSON.stringify(u[y])===JSON.stringify(f.def[y]))delete u[y]}}let d=a._zod.parent;if(d&&d!==p){r(d);let f=e.seen.get(d);if(f?.schema.$ref){if(u.$ref=f.schema.$ref,f.def)for(let m in u){if(m==="$ref"||m==="allOf")continue;if(m in f.def&&JSON.stringify(u[m])===JSON.stringify(f.def[m]))delete u[m]}}}e.override({zodSchema:a,jsonSchema:u,path:c.path??[]})};if(!e.external||e.sharedEmitDoneFor!==e.external){for(let a of[...e.seen.entries()].reverse())r(a[0]);if(e.target!=="openapi-3.0")for(let a of e.seen.entries())Ea(a[1].def??a[1].schema);for(let a of e.deferred)a();if(e.intersections.length){let a=new Map;for(let c of e.seen.values())for(let u of[c.schema,c.def]){let l=u?.allOf;if(!Array.isArray(l))continue;let p=a.get(l);if(p)p.push(u);else a.set(l,[u])}for(let c of e.intersections)for(let u of a.get(c)??[])jl(u)}}let o={};if(e.target==="draft-2020-12")o.$schema="https://json-schema.org/draft/2020-12/schema";else if(e.target==="draft-07")o.$schema="http://json-schema.org/draft-07/schema#";else if(e.target==="draft-04")o.$schema="http://json-schema.org/draft-04/schema#";else if(e.target==="openapi-3.0");if(e.external?.uri){let a=e.external.registry.get(t)?.id;if(!a)throw Error("Schema is missing an `id` property");o.$id=e.external.uri(a)}ut(o,n.defId?n.schema:n.def??n.schema);let s=e.metadataRegistry.get(t)?.id;if(s!==void 0&&o.id===s)delete o.id;let i=e.external?.defs??{};if(!e.external||e.sharedEmitDoneFor!==e.external)for(let a of e.seen.entries()){let c=a[1];if(c.def&&c.defId){if(c.def.id===c.defId)delete c.def.id;ce(i,c.defId,c.def)}}if(e.external)e.sharedEmitDoneFor=e.external;if(e.external);else if(Object.keys(i).length>0)if(e.target==="draft-2020-12")o.$defs=i;else o.definitions=i;try{let a=JSON.parse(JSON.stringify(o));return Object.defineProperty(a,"~standard",{value:{...t["~standard"],jsonSchema:{input:lt(t,"input",e.processors),output:lt(t,"output",e.processors)}},enumerable:!1,writable:!1}),a}catch(a){throw Error("Error converting schema to JSON.")}}function Y(e,t){let n=t??{seen:new Set};if(n.seen.has(e))return!1;n.seen.add(e);let r=e._zod.def;if(r.type==="transform")return!0;if(r.type==="array")return Y(r.element,n);if(r.type==="set")return Y(r.valueType,n);if(r.type==="lazy")return Y(r.getter(),n);if(r.type==="promise"||r.type==="optional"||r.type==="nonoptional"||r.type==="nullable"||r.type==="readonly"||r.type==="default"||r.type==="prefault"||r.type==="catch")return Y(r.innerType,n);if(r.type==="intersection")return Y(r.left,n)||Y(r.right,n);if(r.type==="record"||r.type==="map")return Y(r.keyType,n)||Y(r.valueType,n);if(r.type==="pipe"){if(e._zod.traits.has("$ZodCodec"))return!0;return Y(r.in,n)||Y(r.out,n)}if(r.type==="object"){for(let o in r.shape)if(Y(r.shape[o],n))return!0;return!1}if(r.type==="union"){for(let o of r.options)if(Y(o,n))return!0;return!1}if(r.type==="tuple"){for(let o of r.items)if(Y(o,n))return!0;if(r.rest&&Y(r.rest,n))return!0;return!1}return!1}var Ta=(e,t={})=>(n)=>{let r=wr({...n,processors:t});return U(e,r),br(r,e),$r(r,e)},lt=(e,t,n={})=>(r)=>{let{libraryOptions:o,target:s}=r??{},i=wr({...o??{},target:s,io:t,processors:n});return U(e,i),br(i,e),$r(i,e)};var He=(e,t,n)=>{if(e[t]===void 0||n>e[t])e[t]=n},Ge=(e,t,n)=>{if(e[t]===void 0||n<e[t])e[t]=n},Oa=(e,t)=>{He(e,"minimum",t),Ge(e,"maximum",t)},Za=(e,t)=>{if(e.multipleOf??(e.multipleOf=[]),!e.multipleOf.includes(t))e.multipleOf.push(t)},Ca=(e,t)=>{e.patterns??(e.patterns=new Set),e.patterns.add(t)},Da=(e,t)=>{e.mime=e.mime?e.mime.filter((n)=>t.includes(n)):[...t]},Na=(e,t)=>{if(e.format=t,t.includes("int"))e.isInt=!0},Ia=(e,t)=>He(e,"minimum",t.minimum),Aa=(e,t)=>Ge(e,"maximum",t.maximum),Ra=(e)=>(t,n)=>{Na(t,n.format);let[r,o]=e[n.format];He(t,"minimum",r),Ge(t,"maximum",o)},Bl={greater_than:(e,t)=>He(e,t.inclusive?"minimum":"exclusiveMinimum",t.value),less_than:(e,t)=>Ge(e,t.inclusive?"maximum":"exclusiveMaximum",t.value),multiple_of:(e,t)=>Za(e,t.value),number_format:Ra(zt),bigint_format:Ra(Un),min_length:Ia,max_length:Aa,length_equals:(e,t)=>Oa(e,t.length),min_size:Ia,max_size:Aa,size_equals:(e,t)=>Oa(e,t.size),string_format:(e,t)=>{if(Na(e,t.format),t.pattern)Ca(e,t.pattern);if(t.format==="base64"||t.format==="base64url")e.contentEncoding=t.format;if(t.local||t.precision===-1)e.laxFormat=!0},mime_type:(e,t)=>Da(e,t.mime)};function B(e){let t={},n=e._zod.def,r=e._zod.traits.has("$ZodCheck")?[e,...n.checks??[]]:n.checks??[];for(let s of r)Bl[s._zod.def.check]?.(t,s._zod.def);let o=e._zod.bag;if(o.minimum!==void 0)He(t,"minimum",o.minimum);if(o.exclusiveMinimum!==void 0)He(t,"exclusiveMinimum",o.exclusiveMinimum);if(o.maximum!==void 0)Ge(t,"maximum",o.maximum);if(o.exclusiveMaximum!==void 0)Ge(t,"exclusiveMaximum",o.exclusiveMaximum);if(o.multipleOf!==void 0)Za(t,o.multipleOf);if(o.format!==void 0){if(t.format??(t.format=o.format),o.format.includes("int"))t.isInt=!0}if(o.mime)Da(t,o.mime);for(let s of o.patterns??[])Ca(t,s);return t}var Ml={guid:"uuid",url:"uri",datetime:"date-time",json_string:"json-string",regex:""},Wl=new Map([[tr,es],[Mt,ts]]),La=(e)=>Wl.get(e)??e,Ua=(e,t,n,r)=>{let o=n;o.type="string";let{minimum:s,maximum:i,format:a,patterns:c,contentEncoding:u,laxFormat:l}=B(e);if(typeof s==="number")o.minLength=s;if(typeof i==="number")o.maxLength=i;if(a){if(o.format=Ml[a]??a,o.format==="")delete o.format;if(a==="time"||l)delete o.format}if(u)o.contentEncoding=u;if(c&&c.size>0){let p=[...c].map(La);if(p.length===1)o.pattern=p[0].source;else if(p.length>1)o.allOf=[...p.map((d)=>({...t.target==="draft-07"||t.target==="draft-04"||t.target==="openapi-3.0"?{type:"string"}:{},pattern:d.source}))]}},Fa=(e,t,n,r)=>{let o=n,{minimum:s,maximum:i,multipleOf:a,exclusiveMaximum:c,exclusiveMinimum:u,isInt:l}=B(e);o.type=l?"integer":"number";let p=typeof u==="number"&&u>=(s??Number.NEGATIVE_INFINITY),d=typeof c==="number"&&c<=(i??Number.POSITIVE_INFINITY),f=t.target==="draft-04"||t.target==="openapi-3.0";if(p)if(f)o.minimum=u,o.exclusiveMinimum=!0;else o.exclusiveMinimum=u;else if(typeof s==="number")o.minimum=s;if(d)if(f)o.maximum=c,o.exclusiveMaximum=!0;else o.exclusiveMaximum=c;else if(typeof i==="number")o.maximum=i;if(a){let m=new Set;for(let S of a)if(Number.isFinite(S)&&S!==0)m.add(Math.abs(S));else le(e,t,o,r,`A multipleOf divisor of ${S} cannot be represented in JSON Schema`);let[g,...y]=m;if(g!==void 0)o.multipleOf=g;if(y.length)o.allOf=[...o.allOf??[],...y.map((S)=>({multipleOf:S}))]}},ja=(e,t,n,r)=>{n.type="boolean"},Ba=(e,t,n,r)=>{le(e,t,n,r,"BigInt cannot be represented in JSON Schema")};var Ma=(e,t,n,r)=>{n.not={}};var Wa=(e,t,n,r)=>{},Ha=(e,t,n,r)=>{le(e,t,n,r,"Date cannot be represented in JSON Schema")},Ga=(e,t,n,r)=>{let o=e._zod.def,s=et(o.entries);if(s.length===0){n.not={};return}if(s.every((i)=>typeof i==="number"))n.type="number";if(s.every((i)=>typeof i==="string"))n.type="string";n.enum=s},Ja=(e,t,n,r)=>{let o=e._zod.def;if(o.values.length===0){n.not={};return}let s=[];for(let i of o.values)if(i===void 0){if(le(e,t,n,r,"Literal `undefined` cannot be represented in JSON Schema"))return}else if(typeof i==="bigint"){if(le(e,t,n,r,"BigInt literals cannot be represented in JSON Schema"))return;s.push(Number(i))}else s.push(i);if(s.length===0);else if(s.length===1){let i=s[0];if(n.type=i===null?"null":typeof i,t.target==="draft-04"||t.target==="openapi-3.0")n.enum=[i];else n.const=i}else{if(s.every((i)=>typeof i==="number"))n.type="number";if(s.every((i)=>typeof i==="string"))n.type="string";if(s.every((i)=>typeof i==="boolean"))n.type="boolean";if(s.every((i)=>i===null))n.type="null";n.enum=s}};var Ya=(e,t,n,r)=>{le(e,t,n,r,"Custom types cannot be represented in JSON Schema")};var qa=(e,t,n,r)=>{le(e,t,n,r,"Transforms cannot be represented in JSON Schema")};var Va=(e,t,n,r)=>{let o=n,s=e._zod.def,{minimum:i,maximum:a}=B(e);if(typeof i==="number")o.minItems=i;if(typeof a==="number")o.maxItems=a;o.type="array",o.items=U(s.element,t,{...r,path:[...r.path,"items"]})};function tn(e){let t=e._zod.def;if(t.type==="pipe"&&t.in._zod.traits.has("$ZodTransform"))return tn(t.out);if(t.type==="catch")return tn(t.innerType);return e._zod.optin}var Ka=(e,t,n,r)=>{let o=n,s=e._zod.def,i=s.shape;if(Object.getOwnPropertySymbols(i).length&&le(e,t,o,r,"Symbol keys cannot be represented in JSON Schema"))return;o.type="object",o.properties={};for(let u in i)ce(o.properties,u,U(i[u],t,{...r,path:[...r.path,"properties",u]}));let c=[];for(let u of Object.keys(i)){let l=s.shape[u];if(t.io==="input"?tn(l)===void 0:l._zod.optout===void 0)c.push(u)}if(c.length>0)o.required=c;if(s.catchall?._zod.def.type==="never")o.additionalProperties=!1;else if(!s.catchall){if(t.io==="output")o.additionalProperties=!1}else if(s.catchall)o.additionalProperties=U(s.catchall,t,{...r,path:[...r.path,"additionalProperties"]})},Xa=(e,t,n,r)=>{let o=e._zod.def,s=o.inclusive===!1,i=o.options.map((a,c)=>U(a,t,{...r,path:[...r.path,s?"oneOf":"anyOf",c]}));if(s)n.oneOf=i;else n.anyOf=i},Qa=(e,t,n,r)=>{let o=e._zod.def,s=U(o.left,t,{...r,path:[...r.path,"allOf",0]}),i=U(o.right,t,{...r,path:[...r.path,"allOf",1]}),a=(u)=>("allOf"in u)&&Object.keys(u).length===1,c=[...a(s)?s.allOf:[s],...a(i)?i.allOf:[i]];n.allOf=c,t.intersections.push(c)};function xr(e,t,n){if(t.$ref){if(n.has(t))return t;n.add(t);let m=e.get(t)?.def;if(!m)return t;let g=xr(e,m,n);return g===m?t:g}for(let m of["anyOf","oneOf"]){let g=t[m];if(!Array.isArray(g))continue;let y=g.map((S)=>xr(e,S,n));if(y.some((S,I)=>S!==g[I]))t={...t,[m]:y}}let r=Array.isArray(t.type)?t.type:[t.type],o=!r.includes("string")&&r.some((m)=>m==="number"||m==="integer"),s=t.enum??(t.const!==void 0?[t.const]:void 0);if(!o&&!s?.some((m)=>typeof m==="number"))return t;let{minimum:i,maximum:a,exclusiveMinimum:c,exclusiveMaximum:u,multipleOf:l,format:p,id:d,...f}=t;if(f.enum)f.enum=f.enum.map((m)=>typeof m==="number"?String(m):m);else if(typeof f.const==="number")f.const=String(f.const);if(!o)return f;if(f.type="string",!s)f.pattern=(r.includes("number")?rt:Yn).source;return f}var Sr=new WeakMap;function Hl(e){let t=new Map;for(let r of e.seen.values())if(r.def&&!t.has(r.schema))t.set(r.schema,r);let n=new Map;for(let r of Sr.get(e)??[]){let o=e.seen.get(r),s=(o?.def??o?.schema)?.propertyNames;if(!s||s===!0||n.has(s))continue;let i=xr(t,s,new Set);if(i!==s)n.set(s,i)}if(!n.size)return;for(let r of e.seen.values())for(let o of[r.schema,r.def]){let s=o&&n.get(o.propertyNames);if(s)o.propertyNames=s}}var ec=(e,t,n,r)=>{let o=n,s=e._zod.def;o.type="object";let i=s.keyType,a=B(i).patterns;if(s.mode==="loose"&&a&&a.size>0){let l=U(s.valueType,t,{...r,path:[...r.path,"patternProperties","*"]});o.patternProperties={};for(let p of a)ce(o.patternProperties,La(p).source,l)}else{if(t.target==="draft-07"||t.target==="draft-2020-12"){o.propertyNames=U(s.keyType,t,{...r,path:[...r.path,"propertyNames"]});let l=Sr.get(t);if(!l)l=[],Sr.set(t,l),t.deferred.push(()=>Hl(t));l.push(e)}o.additionalProperties=U(s.valueType,t,{...r,path:[...r.path,"additionalProperties"]})}let c=i._zod.values,u=t.io==="input"&&tn(s.valueType)!==void 0;if(c&&!s.partial&&!u){let l=[...c].filter((p)=>typeof p==="string"||typeof p==="number");if(l.length>0)o.required=l.map(String)}},tc=(e,t,n,r)=>{let o=e._zod.def,s=U(o.innerType,t,r),i=t.seen.get(e);if(t.target==="openapi-3.0")i.ref=o.innerType,n.nullable=!0;else n.anyOf=[s,{type:"null"}]},nc=(e,t,n,r)=>{let o=e._zod.def;U(o.innerType,t,r);let s=t.seen.get(e);s.ref=o.innerType},Pr=Symbol();function rc(e,t,n,r,o){let s=!1,i=JSON.stringify(e,(a,c)=>{if(typeof c!=="bigint")return c;return s=!0,null});if(!s)return JSON.parse(i);return le(t,n,r,o,"BigInt defaults cannot be represented in JSON Schema"),Pr}var oc=(e,t,n,r)=>{let o=e._zod.def;U(o.innerType,t,r);let s=t.seen.get(e);s.ref=o.innerType;let i=rc(o.defaultValue,e,t,n,r);if(i!==Pr)n.default=i},sc=(e,t,n,r)=>{let o=e._zod.def;U(o.innerType,t,r);let s=t.seen.get(e);if(s.ref=o.innerType,t.io!=="input")return;let i=rc(o.defaultValue,e,t,n,r);if(i!==Pr)n._prefault=i},ic=(e,t,n,r)=>{let o=e._zod.def;U(o.innerType,t,r);let s=t.seen.get(e);s.ref=o.innerType;let i;try{i=o.catchValue(void 0)}catch{le(e,t,n,r,"Dynamic catch values are not supported in JSON Schema");return}n.default=i},ac=(e,t,n,r)=>{let o=e._zod.def,s=o.in._zod.traits.has("$ZodTransform"),i=t.io==="input"?s?o.out:o.in:o.out;U(i,t,r);let a=t.seen.get(e);a.ref=i},cc=(e,t,n,r)=>{let o=e._zod.def;U(o.innerType,t,r);let s=t.seen.get(e);s.ref=o.innerType,n.readOnly=!0};var zr=(e,t,n,r)=>{let o=e._zod.def;U(o.innerType,t,r);let s=t.seen.get(e);s.ref=o.innerType};var uc=new WeakSet([Object.prototype,Error.prototype]);function nn(e,t,n){Object.defineProperty(e,t,{configurable:!0,enumerable:!1,get(){let r=n(this);return Object.defineProperty(this,t,{value:r,configurable:!0,writable:!0}),r},set(r){Object.defineProperty(this,t,{value:r,configurable:!0,writable:!0})}})}var ep=(e,t)=>{Eo.init(e,t),e.name="ZodError";let n=Object.getPrototypeOf(e);if(uc.has(n))return;uc.add(n),nn(n,"format",(r)=>(o)=>To(r,o)),nn(n,"flatten",(r)=>(o)=>ko(r,o)),nn(n,"addIssue",(r)=>(o)=>{r.issues.push(o),r.message=JSON.stringify(r.issues,tt,2)}),nn(n,"addIssues",(r)=>(o)=>{r.issues.push(...o),r.message=JSON.stringify(r.issues,tt,2)}),Object.defineProperty(n,"isEmpty",{configurable:!0,enumerable:!1,get(){return this.issues.length===0}})};var te=h("ZodError",ep,void 0,{Parent:Error});var lc=Zt(te),pc=Ct(te),fc=Dt(te),dc=Nt(te),hc=Io(te),mc=Ao(te),gc=Ro(te),_c=Zo(te),yc=Co(te),vc=Do(te),wc=No(te),bc=Lo(te);function np(){if(!q.localeError)ee(ir())}function sn(){if(!q.memoizer)ee({memoizer:Fi()})}var D=h("ZodType",(e,t)=>(np(),R.init(e,t),e.def=t,e.type=t.type,e),{check(...e){let t=this.def;return this.clone(Q(t,{checks:[...t.checks??[],...e.map((n)=>typeof n==="function"?{_zod:{check:n,def:{check:"custom"},onattach:[]}}:n)]}),{parent:!0})},with(...e){return this.check(...e)},clone(e,t){return me(this,e,t)},brand(){return this},register(e,t){return e.add(this,t),this},refine(e,t){return this.check(Gp(e,t))},superRefine(e,t){return this.check(Jp(e,t))},overwrite(e){return this.check(Ie(e))},optional(){return Sc(this)},exactOptional(){return Rp(this)},nullable(){return Pc(this)},nullish(){return Sc(Pc(this))},nonoptional(e){return Up(this,e)},array(){return pe(this)},or(e){return Or([this,e])},and(e){return kp(this,e)},transform(e){return zc(this,Ap(e))},default(e){return Dp(this,e)},prefault(e){return Lp(this,e)},catch(e){return jp(this,e)},pipe(e){return zc(this,e)},readonly(){return Wp(this)},describe(e){let t=this.clone();return De.add(t,{description:e}),t},meta(...e){if(e.length===0)return De.get(this);let t=this.clone();return De.add(t,e[0]),t},isOptional(){return this.safeParse(void 0).success},isNullable(){return this.safeParse(null).success},apply(e,...t){return t.length===0?e(this):e(this,...t)},get "~standard"(){return It(this,"~standard",{...er(this),jsonSchema:{input:lt(this,"input"),output:lt(this,"output")}})},set "~standard"(e){be(this,"~standard",e)},parse:function e(t,n){return lc(this,t,n,{callee:e})},parseAsync:async function e(t,n){return await pc(this,t,n,{callee:e})},safeParse(e,t){return fc(this,e,t)},async safeParseAsync(e,t){return dc(this,e,t)},get spa(){return this?.safeParseAsync},set spa(e){be(this,"spa",e)},validate(e,t){return Wn(this,e,t)},validateAsync(e,t){return Hn(this,e,t)},encode:function e(t,n){return hc(this,t,n,{callee:e})},decode:function e(t,n){return mc(this,t,n,{callee:e})},encodeAsync:async function e(t,n){return await gc(this,t,n,{callee:e})},decodeAsync:async function e(t,n){return await _c(this,t,n,{callee:e})},safeEncode(e,t){return yc(this,e,t)},safeDecode(e,t){return vc(this,e,t)},async safeEncodeAsync(e,t){return wc(this,e,t)},async safeDecodeAsync(e,t){return bc(this,e,t)},toJSONSchema(e){return Ta(this,{})(e)},get description(){return De.get(this)?.description},get _def(){return this._zod.def}}),Ec=h("_ZodString",(e,t)=>{Bt.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Ua(e,n,r,o)},At({format:(e)=>B(e).format??null,minLength:(e)=>B(e).minimum??null,maxLength:(e)=>B(e).maximum??null},{regex(...e){return this.check(cr(...e))},includes(...e){return this.check(pr(...e))},startsWith(...e){return this.check(fr(...e))},endsWith(...e){return this.check(dr(...e))},min(...e){return this.check(We(...e))},max(...e){return this.check(Qt(...e))},length(...e){return this.check(en(...e))},nonempty(...e){return this.check(We(1,...e))},lowercase(e){return this.check(ur(e))},uppercase(e){return this.check(lr(e))},trim(){return this.check(mr())},normalize(...e){return this.check(hr(...e))},toLowerCase(){return this.check(gr())},toUpperCase(){return this.check(_r())},slugify(){return this.check(yr())}})),kr=h("ZodString",(e,t)=>{Bt.init(e,t),Ec.init(e,t)},{email(e){return this.check(Hi(rp,e))},url(e){return this.check(ar(kc,e))},jwt(e){return this.check(pa(vp,e))},emoji(e){return this.check(Ki(sp,e))},guid(e){return this.check(Gi(op,e))},uuid(e){return this.check(Ji(rn,e))},uuidv4(e){return this.check(Yi(rn,e))},uuidv6(e){return this.check(qi(rn,e))},uuidv7(e){return this.check(Vi(rn,e))},nanoid(e){return this.check(Xi(ip,e))},cuid(e){return this.check(Qi(ap,e))},cuid2(e){return this.check(ea(cp,e))},ulid(e){return this.check(ta(up,e))},base64(e){return this.check(ca(gp,e))},base64url(e){return this.check(ua(_p,e))},xid(e){return this.check(na(lp,e))},ksuid(e){return this.check(ra(pp,e))},ipv4(e){return this.check(oa(fp,e))},ipv6(e){return this.check(sa(dp,e))},cidrv4(e){return this.check(ia(hp,e))},cidrv6(e){return this.check(aa(mp,e))},e164(e){return this.check(la(yp,e))},datetime(e){return this.check(qt(pt,e))},date(e){return this.check(Vt(ft,e))},time(e){return this.check(Kt(dt,e))},duration(e){return this.check(Xt(ht,e))}});function _(e){return Mi(kr,e)}var L=h("ZodStringFormat",(e,t)=>{C.init(e,t),Ec.init(e,t)}),pt=h("ZodISODateTime",(e,t)=>{Ks.init(e,t),L.init(e,t)}),ft=h("ZodISODate",(e,t)=>{Xs.init(e,t),L.init(e,t)}),dt=h("ZodISOTime",(e,t)=>{Qs.init(e,t),L.init(e,t)}),ht=h("ZodISODuration",(e,t)=>{ei.init(e,t),L.init(e,t)}),rp=h("ZodEmail",(e,t)=>{Fs.init(e,t),L.init(e,t)});var op=h("ZodGUID",(e,t)=>{Ls.init(e,t),L.init(e,t)});var rn=h("ZodUUID",(e,t)=>{Us.init(e,t),L.init(e,t)});var kc=h("ZodURL",(e,t)=>{Ms.init(e,t),L.init(e,t)});function Tc(e){return ar(kc,e)}var sp=h("ZodEmoji",(e,t)=>{Ws.init(e,t),L.init(e,t)});var ip=h("ZodNanoID",(e,t)=>{Hs.init(e,t),L.init(e,t)});var ap=h("ZodCUID",(e,t)=>{Gs.init(e,t),L.init(e,t)});var cp=h("ZodCUID2",(e,t)=>{Js.init(e,t),L.init(e,t)});var up=h("ZodULID",(e,t)=>{Ys.init(e,t),L.init(e,t)});var lp=h("ZodXID",(e,t)=>{qs.init(e,t),L.init(e,t)});var pp=h("ZodKSUID",(e,t)=>{Vs.init(e,t),L.init(e,t)});var fp=h("ZodIPv4",(e,t)=>{ti.init(e,t),L.init(e,t)});var dp=h("ZodIPv6",(e,t)=>{ri.init(e,t),L.init(e,t)});var hp=h("ZodCIDRv4",(e,t)=>{oi.init(e,t),L.init(e,t)});var mp=h("ZodCIDRv6",(e,t)=>{si.init(e,t),L.init(e,t)});var gp=h("ZodBase64",(e,t)=>{ai.init(e,t),L.init(e,t)});var _p=h("ZodBase64URL",(e,t)=>{ci.init(e,t),L.init(e,t)});var yp=h("ZodE164",(e,t)=>{ui.init(e,t),L.init(e,t)});var vp=h("ZodJWT",(e,t)=>{li.init(e,t),L.init(e,t)});var an=h("ZodNumber",(e,t)=>{nr.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Fa(e,n,r,o),e.isFinite=!0},At({minValue:(e)=>{let{minimum:t,exclusiveMinimum:n}=B(e);return Math.max(t??Number.NEGATIVE_INFINITY,n??Number.NEGATIVE_INFINITY)},maxValue:(e)=>{let{maximum:t,exclusiveMaximum:n}=B(e);return Math.min(t??Number.POSITIVE_INFINITY,n??Number.POSITIVE_INFINITY)},isInt:(e)=>{let{isInt:t,multipleOf:n}=B(e);return!!t||!!n?.some(Number.isSafeInteger)},format:(e)=>B(e).format??null},{gt(e,t){return this.check(Me(e,t))},gte(e,t){return this.check(xe(e,t))},min(e,t){return this.check(xe(e,t))},lt(e,t){return this.check(Be(e,t))},lte(e,t){return this.check($e(e,t))},max(e,t){return this.check($e(e,t))},int(e){return this.check($c(e))},safe(e){return this.check($c(e))},positive(e){return this.check(Me(0,e))},nonnegative(e){return this.check(xe(0,e))},negative(e){return this.check(Be(0,e))},nonpositive(e){return this.check($e(0,e))},multipleOf(e,t){return this.check(ct(e,t))},step(e,t){return this.check(ct(e,t))},finite(){return this}}));function ne(e){return fa(an,e)}var wp=h("ZodNumberFormat",(e,t)=>{pi.init(e,t),an.init(e,t)});function $c(e){return ha(wp,e)}var Tr=h("ZodBoolean",(e,t)=>{fi.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>ja(e,n,r,o)});function Ne(e){return ma(Tr,e)}var Oc=h("ZodBigInt",(e,t)=>{di.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Ba(e,n,r,o)},At({minValue:(e)=>B(e).minimum??null,maxValue:(e)=>B(e).maximum??null,format:(e)=>B(e).format??null},{gte(e,t){return this.check(xe(e,t))},min(e,t){return this.check(xe(e,t))},gt(e,t){return this.check(Me(e,t))},lt(e,t){return this.check(Be(e,t))},lte(e,t){return this.check($e(e,t))},max(e,t){return this.check($e(e,t))},positive(e){return this.check(Me(BigInt(0),e))},negative(e){return this.check(Be(BigInt(0),e))},nonpositive(e){return this.check($e(BigInt(0),e))},nonnegative(e){return this.check(xe(BigInt(0),e))},multipleOf(e,t){return this.check(ct(e,t))}}));var bp=h("ZodUnknown",(e,t)=>{hi.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Wa(e,n,r,o)});function on(){return ya(bp)}var $p=h("ZodNever",(e,t)=>{mi.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Ma(e,n,r,o)});function xp(e){return va($p,e)}var Ic=h("ZodDate",(e,t)=>{gi.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Ha(e,n,r,o),e.min=(n,r)=>e.check(xe(n,r)),e.max=(n,r)=>e.check($e(n,r))},At({minDate:(e)=>{let{minimum:t}=B(e);return t?new Date(t):null},maxDate:(e)=>{let{maximum:t}=B(e);return t?new Date(t):null}},{}));var Sp=h("ZodArray",(e,t)=>{sn(),_i.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Va(e,n,r,o),e.element=t.element},{min(e,t){return this.check(We(e,t))},nonempty(e){return this.check(We(1,e))},max(e,t){return this.check(Qt(e,t))},length(e,t){return this.check(en(e,t))},unwrap(){return this.element}});function pe(e,t){return ba(Sp,e,t)}var Pp=h("ZodObject",(e,t)=>{sn(),wi.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Ka(e,n,r,o),cl(e,"shape",(n)=>n._zod.def.shape,!1)},{keyof(){return Ir(Object.keys(this._zod.def.shape))},catchall(e){return this.clone(Q(this._zod.def,{catchall:e}))},passthrough(){return this.clone(Q(this._zod.def,{catchall:on()}))},loose(){return this.clone(Q(this._zod.def,{catchall:on()}))},strict(){return this.clone(Q(this._zod.def,{catchall:xp()}))},strip(){return this.clone(Q(this._zod.def,{catchall:void 0}))},extend(e){return el(this,e)},safeExtend(e){return tl(this,e)},merge(e){return nl(this,e)},pick(e){return Xu(this,e)},omit(e){return Qu(this,e)},partial(...e){return yo(Rc,this,e[0])},exactPartial(...e){return yo(Zc,this,e[0],"exactPartial")},required(...e){return rl(Cc,this,e[0])}});function T(e,t){let n={type:"object",shape:e??{},...v(t)};return new Pp(n)}var zp=h("ZodUnion",(e,t)=>{bi.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Xa(e,n,r,o),e.options=t.options});function Or(e,t){return new zp({type:"union",options:e,...v(t)})}var Ep=h("ZodIntersection",(e,t)=>{$i.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Qa(e,n,r,o)});function kp(e,t){return new Ep({type:"intersection",left:e,right:t})}var xc=h("ZodRecord",(e,t)=>{sn(),xi.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>ec(e,n,r,o),e.keyType=t.keyType,e.valueType=t.valueType});function Tp(e,t,n){if(!t||!t._zod)return new xc({type:"record",keyType:_(),valueType:e,...v(t)});return new xc({type:"record",keyType:e,valueType:t,...v(n)})}var Er=h("ZodEnum",(e,t)=>{Si.init(e,t),D.init(e,t),e._zod.processJSONSchema=(r,o,s)=>Ga(e,r,o,s),e.enum=t.entries,e.options=[...e._zod.values];let n=new Set(Object.keys(t.entries));e.extract=(r,o)=>{let s={};for(let i of r)if(n.has(i))s[i]=t.entries[i];else throw Error(`Key ${i} not found in enum`);return new Er({...t,checks:[],...v(o),entries:s})},e.exclude=(r,o)=>{let s={...t.entries};for(let i of r)if(n.has(i))delete s[i];else throw Error(`Key ${i} not found in enum`);return new Er({...t,checks:[],...v(o),entries:s})}});function Ir(e,t){let n=Array.isArray(e)?Object.fromEntries(e.map((r)=>[r,r])):e;return new Er({type:"enum",entries:n,...v(t)})}var Op=h("ZodLiteral",(e,t)=>{Pi.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Ja(e,n,r,o),e.values=new Set(t.values),Object.defineProperty(e,"value",{get(){if(t.values.length>1)throw Error("This schema contains multiple valid literal values. Use `.values` instead.");return t.values[0]}})});function Ac(e,t){return new Op({type:"literal",values:Array.isArray(e)?e:[e],...v(t)})}var Ip=h("ZodTransform",(e,t)=>{sn(),zi.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>qa(e,n,r,o),e._zod.parse=(n,r)=>{if(r.direction==="backward")throw new nt(e.constructor.name);n.addIssue=(s)=>{if(typeof s==="string")n.issues.push(Ce(s,n.value,t));else{let i=s;if(i.fatal)i.continue=!1;if(i.code??(i.code="custom"),!("input"in i))i.input=n.value;i.inst??(i.inst=e),n.issues.push(Ce(i))}};let o=t.transform(n.value,n);if(o instanceof Promise)return o.then((s)=>(n.value=s,n));return n.value=o,n}});function Ap(e){return new Ip({type:"transform",transform:e})}var Rc=h("ZodOptional",(e,t)=>{rr.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>zr(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function Sc(e){return new Rc({type:"optional",innerType:e})}var Zc=h("ZodExactOptional",(e,t)=>{Ei.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>zr(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function Rp(e){return new Zc({type:"optional",innerType:e})}var Zp=h("ZodNullable",(e,t)=>{ki.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>tc(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function Pc(e){return new Zp({type:"nullable",innerType:e})}var Cp=h("ZodDefault",(e,t)=>{Ti.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>oc(e,n,r,o),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});function Dp(e,t){return new Cp({type:"default",innerType:e,get defaultValue(){return typeof t==="function"?t():Nn(t)}})}var Np=h("ZodPrefault",(e,t)=>{Oi.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>sc(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function Lp(e,t){return new Np({type:"prefault",innerType:e,get defaultValue(){return typeof t==="function"?t():Nn(t)}})}var Cc=h("ZodNonOptional",(e,t)=>{Ii.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>nc(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function Up(e,t){return new Cc({type:"nonoptional",innerType:e,...v(t)})}var Fp=h("ZodCatch",(e,t)=>{Ai.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>ic(e,n,r,o),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});function jp(e,t){return new Fp({type:"catch",innerType:e,catchValue:typeof t==="function"?t:$o(t)})}var Bp=h("ZodPipe",(e,t)=>{Ri.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>ac(e,n,r,o),e.in=t.in,e.out=t.out});function zc(e,t){return new Bp({type:"pipe",in:e,out:t})}var Mp=h("ZodReadonly",(e,t)=>{Zi.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>cc(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function Wp(e){return new Mp({type:"readonly",innerType:e})}var Hp=h("ZodCustom",(e,t)=>{Ci.init(e,t),D.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Ya(e,n,r,o)});function Gp(e,t={}){return $a(Hp,e,t)}function Jp(e,t){return xa(e,t)}function qp(e){return qt(pt,e)}function Vp(e){return Vt(ft,e)}function Kp(e){return Kt(dt,e)}function Xp(e){return Xt(ht,e)}function Qp(e){return Wi(kr,e)}function ef(e){return da(an,e)}function tf(e){return ga(Tr,e)}function nf(e){return _a(Oc,e)}function rf(e){return wa(Ic,e)}var of=T({name:_(),createSql:_(),approxRows:ne().int().nonnegative(),dataBytes:ne().int().nonnegative(),primaryKey:pe(_()).nullable()}),Dc=T({charset:_(),tables:pe(of)}),mg=T({table:_(),cursor:_().optional()}),Nc=T({sql:_(),rows:ne().int().nonnegative(),next:_().nullable()});var Ar=T({code:_(),message:_(),data:T({status:ne().int()}).loose().nullable().optional()});var Lc=T({path:_(),size:ne().int().nonnegative(),mtime:ne().int()}),wg=T({cursor:_().optional()}),Uc=T({entries:pe(Lc),next:_().nullable()}),bg=T({paths:pe(_()).min(1)}),Fc=Or([Lc.extend({missing:Ac(!1).optional()}),T({path:_(),missing:Ac(!0)})]),$g=T({path:_(),offset:un.number().int().nonnegative(),length:un.number().int().positive()}),jc="X-Wpsync-File-Size";var ln=ne().int().nonnegative(),sf=Ir(["mariadb","mysql","unknown"]),af=T({file:_(),name:_(),version:_(),active:Ne()}),cf=T({file:_(),name:_(),version:_()}),uf=T({file:_(),name:_()}),pn=T({bridge:T({version:_(),protocolVersion:ne().int(),deadline:cn.datetime({offset:!0})}),site:T({siteUrl:Tc(),homeUrl:Tc(),name:_(),multisite:Ne(),locale:_(),timezone:_(),environment:_()}),wordpress:T({version:_()}),php:T({version:_(),sapi:_(),extensions:pe(_()),memoryLimit:ln.nullable(),maxExecutionTime:ne().int().nonnegative(),uploadMaxFilesize:ln.nullable(),postMaxSize:ln.nullable()}),server:T({software:_().nullable(),time:cn.datetime({offset:!0})}),database:T({engine:sf,version:_(),serverInfo:_(),charset:_(),collate:_(),tablePrefix:_()}),theme:T({stylesheet:_(),template:_(),name:_(),version:_()}),plugins:pe(af),muPlugins:pe(cf),dropins:pe(uf),paths:T({abspath:_(),contentDir:_(),pluginsDir:_(),uploadsDir:_()}),capabilities:T({fileModsAllowed:Ne(),filesystemMethod:_(),writable:T({abspath:Ne(),contentDir:Ne(),uploadsDir:Ne()}),diskFreeBytes:ln.nullable()})});function lf(e,t){if(!e.includes("*"))return e===t;return new RegExp(`^${e.split("*").map(pf).join(".*")}$`).test(t)}function pf(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Rr(e,t=oo){let n=e.split("/");return t.some((r)=>{let o=r.split("/");if(o.length>n.length)return!1;return o.every((s,i)=>lf(s,n[i]))})}function Bc(e){if(e===""||e.startsWith("/")||e.includes("\\")||e.includes("\x00"))return!1;return e.split("/").every((t)=>t!==""&&t!=="."&&t!=="..")}import{hostname as Zf}from"os";class w extends Error{code;hint;constructor(e,t,n){super(t);this.code=e;this.hint=n;this.name="WpsyncError"}}class Zr{cookies=new Map;set(e,t){this.cookies.set(e,t)}has(e){return[...this.cookies.keys()].some((t)=>t.startsWith(e))}absorb(e){for(let t of e.getSetCookie()){let[n="",...r]=t.split(";"),o=n.indexOf("=");if(o<=0)continue;let s=n.slice(0,o).trim(),i=n.slice(o+1).trim();if(ff(r)||i===""||i==="deleted")this.cookies.delete(s);else this.cookies.set(s,i)}}header(){if(this.cookies.size===0)return;return[...this.cookies].map(([e,t])=>`${e}=${t}`).join("; ")}}function ff(e){for(let t of e){let[n="",r=""]=t.trim().split("=",2);if(n.toLowerCase()==="max-age"&&Number(r)<=0)return!0;if(n.toLowerCase()==="expires"){let o=Date.parse(r);if(!Number.isNaN(o)&&o<Date.now())return!0}}return!1}var df="wpsync/0.1 (+https://github.com/AlexMaghen/wp-dev-automation)",hf=5;async function V(e,t={}){let n=t.method??"GET",r=t.follow??n==="GET",o=e;for(let s=0;;s++){let i={"User-Agent":df,...t.headers},a=t.jar?.header();if(a)i.Cookie=a;let c;try{c=await fetch(o,{method:s===0?n:"GET",headers:i,body:s===0?t.body:void 0,redirect:"manual"})}catch(p){let d=p instanceof Error&&p.cause instanceof Error?p.cause.message:String(p);throw new w("unreachable",`Couldn't reach ${new URL(o).origin}: ${d}`)}t.jar?.absorb(c.headers);let u=c.headers.get("location");if(r&&u&&c.status>=300&&c.status<400&&s<hf){await c.arrayBuffer(),o=new URL(u,o).toString();continue}let l=Buffer.from(await c.arrayBuffer());return{status:c.status,url:o,headers:c.headers,bytes:l,text:l.toString("utf8")}}}function Ae(e){try{return JSON.parse(e)}catch{return}}class fn{site;jar;constructor(e,t){this.site=e;this.jar=t}static async login(e,t,n){let r=new Zr;r.set("wordpress_test_cookie","WP%20Cookie%20check");let o=`${e.siteUrl}/wp-login.php`,s=await V(o,{jar:r});if(s.status===404||!/name=["']log["']/.test(s.text))throw new w("login_page_missing",`The site's login page isn't at ${o}.`,"A security plugin may have moved it. Create an Application Password yourself (Users \u2192 Profile) and use that instead.");let i=await V(o,{method:"POST",jar:r,headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({log:t,pwd:n,"wp-submit":"Log In",redirect_to:`${e.siteUrl}/wp-admin/`,testcookie:"1"}).toString()});if(r.has("wordpress_logged_in_"))return new fn(e,r);let a=/<div[^>]+id=["']login_error["'][^>]*>([\s\S]*?)<\/div>/i.exec(i.text);if(a?.[1])throw new w("login_failed",`WordPress refused the login: ${mf(a[1])}`);throw new w("login_blocked","The login didn't complete. The site probably asks for a second step, such as two-factor or a CAPTCHA.","Create an Application Password yourself (Users \u2192 Profile \u2192 Application Passwords) and use that instead.")}async restNonce(){let e=await V(`${this.site.siteUrl}/wp-admin/admin-ajax.php?action=rest-nonce`,{jar:this.jar}),t=e.text.trim();if(e.status!==200||!/^[a-f0-9]{6,}$/i.test(t))throw new w("nonce_failed","WordPress didn't hand out a REST nonce for the login session.");return t}async rest(e,t,n){let r={Accept:"application/json","X-WP-Nonce":await this.restNonce()};if(n!==void 0)r["Content-Type"]="application/json";let o=await V(this.site.restUrl(t),{method:e,jar:this.jar,headers:r,body:n===void 0?void 0:JSON.stringify(n)});return{status:o.status,body:Ae(o.text)??o.text}}async createApplicationPassword(e){let t=await this.rest("POST","/wp/v2/users/me/application-passwords",{name:e}),n=T({uuid:_(),password:_()}).safeParse(t.body);if(t.status!==201||!n.success){let r=t.body?.code;throw new w("application_password_failed",`WordPress wouldn't create an Application Password (HTTP ${t.status}${r?`, ${r}`:""}).`,r==="application_passwords_disabled"?"A plugin or setting has turned Application Passwords off. Turn them back on and connect again.":void 0)}return n.data}async deleteApplicationPassword(e){let t=await this.rest("DELETE",`/wp/v2/users/me/application-passwords/${e}`);if(t.status!==200&&t.status!==404)throw new w("application_password_delete_failed",`Couldn't revoke an old wpsync key (HTTP ${t.status}).`)}async uploadPlugin(e,t){let n=await V(`${this.site.siteUrl}/wp-admin/plugin-install.php?tab=upload`,{jar:this.jar}),r=n.text.slice(Math.max(0,n.text.indexOf("plugin-upload-form"))),o=/name=["']_wpnonce["']\s+value=["']([^"']+)["']/.exec(r)?.[1];if(n.status!==200||!o)throw new w("plugin_upload_unavailable","This site doesn't allow uploading plugins from wp-admin.","The host has probably turned plugin installs off (DISALLOW_FILE_MODS). wpsync needs them for its bridge.");let s=new FormData;s.set("_wpnonce",o),s.set("_wp_http_referer",new URL(`${this.site.siteUrl}/wp-admin/plugin-install.php?tab=upload`).pathname+"?tab=upload"),s.set("pluginzip",new Blob([new Uint8Array(e)],{type:"application/zip"}),t),s.set("install-plugin-submit","Install Now");let i=await V(`${this.site.siteUrl}/wp-admin/update.php?action=upload-plugin`,{method:"POST",jar:this.jar,body:s});if(/request-filesystem-credentials-form/.test(i.text))throw new w("filesystem_credentials","WordPress asked for FTP details to install the bridge: it can't write plugin files itself on this host.")}async logout(){try{let e=await V(`${this.site.siteUrl}/wp-admin/`,{jar:this.jar}),t=/wp-login\.php\?action=logout(?:&#038;|&amp;|&)_wpnonce=([a-f0-9]+)/i.exec(e.text);if(t?.[1])await V(`${this.site.siteUrl}/wp-login.php?action=logout&_wpnonce=${t[1]}`,{jar:this.jar})}catch{}}}function mf(e){return e.replace(/<[^>]+>/g," ").replace(/&nbsp;|&#160;/g," ").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#0?39;|&apos;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\s+/g," ").replace(/\s*Lost your password\?\s*$/i,"").trim()}import{createRequire as gf}from"module";var _f=gf("/"),Ye,yf,vf;try{Ye=_f("worker_threads"),yf=Ye.Worker,vf=Ye.isMarkedAsUntransferable}catch(e){}var H=Uint8Array,re=Uint16Array,Fr=Int32Array,jr=new H([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Br=new H([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Mc=new H([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),qc=function(e,t){var n=new re(31);for(var r=0;r<31;++r)n[r]=t+=1<<e[r-1];var o=new Fr(n[30]);for(var r=1;r<30;++r)for(var s=n[r];s<n[r+1];++s)o[s]=s-n[r]<<5|r;return{b:n,r:o}},Ye=qc(jr,2),wf=Ye.b,Dr=Ye.r;wf[28]=258,Dr[258]=28;var Vc=qc(Br,0),{b:Mg,r:Wc}=Vc,Nr=new re(32768);for(E=0;E<32768;++E)ve=(E&43690)>>1|(E&21845)<<1,ve=(ve&52428)>>2|(ve&13107)<<2,ve=(ve&61680)>>4|(ve&3855)<<4,Nr[E]=((ve&65280)>>8|(ve&255)<<8)>>1;var ve,E,_t=function(e,t,n){var r=e.length,o=0,s=new re(t);for(;o<r;++o)if(e[o])++s[e[o]-1];var i=new re(t);for(o=1;o<t;++o)i[o]=i[o-1]+s[o-1]<<1;var a;if(n){a=new re(1<<t);var c=15-t;for(o=0;o<r;++o)if(e[o]){var u=o<<4|e[o],l=t-e[o],p=i[e[o]-1]++<<l;for(var d=p|(1<<l)-1;p<=d;++p)a[Nr[p]>>c]=u}}else{a=new re(r);for(o=0;o<r;++o)if(e[o])a[o]=Nr[i[e[o]-1]++]>>15-e[o]}return a},Le=new H(288);for(E=0;E<144;++E)Le[E]=8;var E;for(E=144;E<256;++E)Le[E]=9;var E;for(E=256;E<280;++E)Le[E]=7;var E;for(E=280;E<288;++E)Le[E]=8;var E,dn=new H(32);for(E=0;E<32;++E)dn[E]=5;var E,bf=_t(Le,9,0);var $f=_t(dn,5,0);var Kc=function(e){return(e+7)/8|0},Xc=function(e,t,n){if(t==null||t<0)t=0;if(n==null||n>e.length)n=e.length;return new H(e.subarray(t,n))};var xf=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],mn=function(e,t,n){var r=Error(t||xf[e]);if(r.code=e,Error.captureStackTrace)Error.captureStackTrace(r,mn);if(!n)throw r;return r};var Pe=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8},mt=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8,e[r+2]|=n>>16},Cr=function(e,t){var n=[];for(var r=0;r<e.length;++r)if(e[r])n.push({s:r,f:e[r]});var o=n.length,s=n.slice();if(!o)return{t:eu,l:0};if(o==1){var i=new H(n[0].s+1);return i[n[0].s]=1,{t:i,l:1}}n.sort(function(z,x){return z.f-x.f}),n.push({s:-1,f:25001});var a=n[0],c=n[1],u=0,l=1,p=2;n[0]={s:-1,f:a.f+c.f,l:a,r:c};while(l!=o-1)a=n[n[u].f<n[p].f?u++:p++],c=n[u!=l&&n[u].f<n[p].f?u++:p++],n[l++]={s:-1,f:a.f+c.f,l:a,r:c};var d=s[0].s;for(var r=1;r<o;++r)if(s[r].s>d)d=s[r].s;var f=new re(d+1),m=Lr(n[l-1],f,0);if(m>t){var r=0,g=0,y=m-t,S=1<<y;s.sort(function(x,k){return f[k.s]-f[x.s]||x.f-k.f});for(;r<o;++r){var I=s[r].s;if(f[I]>t)g+=S-(1<<m-f[I]),f[I]=t;else break}g>>=y;while(g>0){var N=s[r].s;if(f[N]<t)g-=1<<t-f[N]++-1;else++r}for(;r>=0&&g;--r){var Z=s[r].s;if(f[Z]==t)--f[Z],++g}m=t}return{t:new H(f),l:m}},Lr=function(e,t,n){return e.s==-1?Math.max(Lr(e.l,t,n+1),Lr(e.r,t,n+1)):t[e.s]=n},Hc=function(e){var t=e.length;while(t&&!e[--t]);var n=new re(++t),r=0,o=e[0],s=1,i=function(c){n[r++]=c};for(var a=1;a<=t;++a)if(e[a]==o&&a!=t)++s;else{if(!o&&s>2){for(;s>138;s-=138)i(32754);if(s>2)i(s>10?s-11<<5|28690:s-3<<5|12305),s=0}else if(s>3){i(o),--s;for(;s>6;s-=6)i(8304);if(s>2)i(s-3<<5|8208),s=0}while(s--)i(o);s=1,o=e[a]}return{c:n.subarray(0,r),n:t}},gt=function(e,t){var n=0;for(var r=0;r<t.length;++r)n+=e[r]*t[r];return n},Qc=function(e,t,n){var r=n.length,o=Kc(t+2);e[o]=r&255,e[o+1]=r>>8,e[o+2]=e[o]^255,e[o+3]=e[o+1]^255;for(var s=0;s<r;++s)e[o+s+4]=n[s];return(o+4+r)*8},Gc=function(e,t,n,r,o,s,i,a,c,u,l){Pe(t,l++,n),++o[256];var p=Cr(o,15),{t:d,l:f}=p,m=Cr(s,15),{t:g,l:y}=m,S=Hc(d),{c:I,n:N}=S,Z=Hc(g),{c:z,n:x}=Z,k=new re(19);for(var P=0;P<I.length;++P)++k[I[P]&31];for(var P=0;P<z.length;++P)++k[z[P]&31];var b=Cr(k,7),{t:A,l:X}=b,J=19;for(;J>4&&!A[Mc[J-1]];--J);var ze=u+5<<3,oe=gt(o,Le)+gt(s,dn)+i,se=gt(o,d)+gt(s,g)+i+14+3*J+gt(k,A)+2*k[16]+3*k[17]+7*k[18];if(c>=0&&ze<=oe&&ze<=se)return Qc(t,l,e.subarray(c,c+u));var fe,F,ie,Ee;if(Pe(t,l,1+(se<oe)),l+=2,se<oe){fe=_t(d,f,0),F=d,ie=_t(g,y,0),Ee=g;var kn=_t(A,X,0);Pe(t,l,N-257),Pe(t,l+5,x-1),Pe(t,l+10,J-4),l+=14;for(var P=0;P<J;++P)Pe(t,l+3*P,A[Mc[P]]);l+=3*J;var de=[I,z];for(var Ke=0;Ke<2;++Ke){var Ue=de[Ke];for(var P=0;P<Ue.length;++P){var he=Ue[P]&31;if(Pe(t,l,kn[he]),l+=A[he],he>15)Pe(t,l,Ue[P]>>5&127),l+=Ue[P]>>12}}}else fe=bf,F=Le,ie=$f,Ee=dn;for(var P=0;P<a;++P){var W=r[P];if(W>255){var he=W>>18&31;if(mt(t,l,fe[he+257]),l+=F[he+257],he>7)Pe(t,l,W>>23&31),l+=jr[he];var Fe=W&31;if(mt(t,l,ie[Fe]),l+=Ee[Fe],Fe>3)mt(t,l,W>>5&8191),l+=Br[Fe]}else mt(t,l,fe[W]),l+=F[W]}return mt(t,l,fe[256]),l+F[256]},Sf=new Fr([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),eu=new H(0),Pf=function(e,t,n,r,o,s){var i=s.z||e.length,a=new H(r+i+5*(1+Math.ceil(i/7000))+o),c=a.subarray(r,a.length-o),u=s.l,l=(s.r||0)&7;if(t){if(l)c[0]=s.r>>3;var p=Sf[t-1],d=p>>13,f=p&8191,m=(1<<n)-1,g=s.p||new re(32768),y=s.h||new re(m+1),S=Math.ceil(n/3),I=2*S,N=function(In){return(e[In]^e[In+1]<<S^e[In+2]<<I)&m},Z=new Fr(25000),z=new re(288),x=new re(32),k=0,P=0,b=s.i||0,A=0,X=s.w||0,J=0;for(;b+2<i;++b){var ze=N(b),oe=b&32767,se=y[ze];if(g[oe]=se,y[ze]=oe,X<=b){var fe=i-b;if((k>7000||A>24576)&&(fe>423||!u)){l=Gc(e,c,0,Z,z,x,P,A,J,b-J,l),A=k=P=0,J=b;for(var F=0;F<286;++F)z[F]=0;for(var F=0;F<30;++F)x[F]=0}var ie=2,Ee=0,kn=f,de=oe-se&32767;if(fe>2&&ze==N(b-de)){var Ke=Math.min(d,fe)-1,Ue=Math.min(32767,b),he=Math.min(258,fe);while(de<=Ue&&--kn&&oe!=se){if(e[b+ie]==e[b+ie-de]){var W=0;for(;W<he&&e[b+W]==e[b+W-de];++W);if(W>ie){if(ie=W,Ee=de,W>Ke)break;var Fe=Math.min(de,W-2),Xr=0;for(var F=0;F<Fe;++F){var Tn=b-de+F&32767,Ju=g[Tn],Qr=Tn-Ju&32767;if(Qr>Xr)Xr=Qr,se=Tn}}}oe=se,se=g[oe],de+=oe-se&32767}}if(Ee){Z[A++]=268435456|Dr[ie]<<18|Wc[Ee];var eo=Dr[ie]&31,to=Wc[Ee]&31;P+=jr[eo]+Br[to],++z[257+eo],++x[to],X=b+ie,++k}else Z[A++]=e[b],++z[e[b]]}}for(b=Math.max(b,X);b<i;++b)Z[A++]=e[b],++z[e[b]];if(l=Gc(e,c,u,Z,z,x,P,A,J,b-J,l),!u)s.r=l&7|c[l/8|0]<<3,l-=7,s.h=y,s.p=g,s.i=b,s.w=X}else{for(var b=s.w||0;b<i+u;b+=65535){var On=b+65535;if(On>=i)c[l/8|0]=u,On=i;l=Qc(c,l+1,e.subarray(b,On))}s.i=i}return Xc(a,0,r+Kc(l)+o)},zf=function(){var e=new Int32Array(256);for(var t=0;t<256;++t){var n=t,r=9;while(--r)n=(n&1&&-306674912)^n>>>1;e[t]=n}return e}(),Ef=function(){var e=-1;return{p:function(t){var n=e;for(var r=0;r<t.length;++r)n=zf[n&255^t[r]]^n>>>8;e=n},d:function(){return~e}}};var kf=function(e,t,n,r,o){if(!o){if(o={l:1},t.dictionary){var s=t.dictionary.subarray(-32768),i=new H(s.length+e.length);i.set(s),i.set(e,s.length),e=i,o.w=s.length}}return Pf(e,t.level==null?6:t.level,t.mem==null?o.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,n,r,o)},tu=function(e,t){var n={};for(var r in e)n[r]=e[r];for(var r in t)n[r]=t[r];return n};var M=function(e,t,n){for(;n;++t)e[t]=n,n>>>=8};function Tf(e,t){return kf(e,t||{},0,0)}var nu=function(e,t,n,r){for(var o in e){var s=e[o],i=t+o,a=r;if(Array.isArray(s))a=tu(r,s[1]),s=s[0];if(ArrayBuffer.isView(s))n[i]=[s,a];else n[i+="/"]=[new H(0),a],nu(s,i,n,r)}},Jc=typeof TextEncoder<"u"&&new TextEncoder,Of=typeof TextDecoder<"u"&&new TextDecoder,If=0;try{Of.decode(eu,{stream:!0}),If=1}catch(e){}function hn(e,t){if(t){var n=new H(e.length);for(var r=0;r<e.length;++r)n[r]=e.charCodeAt(r);return n}if(Jc)return Jc.encode(e);var o=e.length,s=new H(e.length+(e.length>>1)),i=0,a=function(l){s[i++]=l};for(var r=0;r<o;++r){if(i+5>s.length){var c=new H(i+8+(o-r<<1));c.set(s),s=c}var u=e.charCodeAt(r);if(u<128||t)a(u);else if(u<2048)a(192|u>>6),a(128|u&63);else if(u>55295&&u<57344)u=65536+(u&1047552)|e.charCodeAt(++r)&1023,a(240|u>>18),a(128|u>>12&63),a(128|u>>6&63),a(128|u&63);else a(224|u>>12),a(128|u>>6&63),a(128|u&63)}return Xc(s,0,i)}var Ur=function(e){var t=0;if(e)for(var n in e){var r=e[n].length;if(r>65535)mn(9);t+=r+4}return t},Yc=function(e,t,n,r,o,s,i,a){var c=r.length,u=n.extra,l=a&&a.length,p=Ur(u);if(M(e,t,i!=null?33639248:67324752),t+=4,i!=null)e[t++]=20,e[t++]=n.os;e[t]=20,t+=2,e[t++]=n.flag<<1|(s<0&&8),e[t++]=o&&8,e[t++]=n.compression&255,e[t++]=n.compression>>8;var d=new Date(n.mtime==null?Date.now():n.mtime),f=d.getFullYear()-1980;if(f<0||f>119)mn(10);if(M(e,t,f<<25|d.getMonth()+1<<21|d.getDate()<<16|d.getHours()<<11|d.getMinutes()<<5|d.getSeconds()>>1),t+=4,s!=-1)M(e,t,n.crc),M(e,t+4,s<0?-s-2:s),M(e,t+8,n.size);if(M(e,t+12,c),M(e,t+14,p),t+=16,i!=null)M(e,t,l),M(e,t+6,n.attrs),M(e,t+10,i),t+=14;if(e.set(r,t),t+=c,p)for(var m in u){var g=u[m],y=g.length;M(e,t,+m),M(e,t+2,y),e.set(g,t+4),t+=4+y}if(l)e.set(a,t),t+=l;return t},Af=function(e,t,n,r,o){M(e,t,101010256),M(e,t+8,n),M(e,t+10,n),M(e,t+12,r),M(e,t+16,o)};function ru(e,t){if(!t)t={};var n={},r=[];nu(e,"",n,t);var o=0,s=0;for(var i in n){var a=n[i],c=a[0],u=a[1],l=u.level==0?0:8,p=hn(i),d=p.length,f=u.comment,m=f&&hn(f),g=m&&m.length,y=Ur(u.extra);if(d>65535)mn(11);var S=l?Tf(c,u):c,I=S.length,N=Ef();N.p(c),r.push(tu(u,{size:c.length,crc:N.d(),c:S,f:p,m,u:d!=i.length||m&&f.length!=g,o,compression:l})),o+=30+d+y+I,s+=76+2*(d+y)+(g||0)+I}var Z=new H(s+22),z=o,x=s-o;for(var k=0;k<r.length;++k){var p=r[k];Yc(Z,p.o,p,p.f,p.u,p.c.length);var P=30+p.f.length+Ur(p.extra);Z.set(p.c,p.o+P),Yc(Z,o,p,p.f,p.u,p.c.length,p.o,p.m),o+=16+P+(p.m?p.m.length:0)}return Af(Z,o,r.length,x,z),Z}var ou={"includes/class-wpsync-db.php":`<?php
/**
 * Database export: GET db/tables and GET db/rows.
 * Shapes: DbTablesResponse and DbRowsResponse in packages/protocol/src/db.ts.
 *
 * Rows are paged by primary key (WHERE (pk...) > (last...) ORDER BY pk), so each chunk is a
 * cheap index range however big the table is. Tables without a primary key page by offset.
 *
 * @package WpsyncBridge
 */

defined( 'ABSPATH' ) || exit;

class Wpsync_Db {

	public static function handle_tables() {
		global $wpdb;
		$tables = array();
		foreach ( self::table_names() as $name ) {
			$create = $wpdb->get_row( 'SHOW CREATE TABLE ' . self::ident( $name ), ARRAY_N );
			$status = $wpdb->get_row( $wpdb->prepare( 'SHOW TABLE STATUS LIKE %s', $name ), ARRAY_A );
			$tables[] = array(
				'name'       => $name,
				'createSql'  => $create[1],
				'approxRows' => max( 0, (int) ( isset( $status['Rows'] ) ? $status['Rows'] : 0 ) ),
				'dataBytes'  => max( 0, (int) ( isset( $status['Data_length'] ) ? $status['Data_length'] : 0 ) ),
				'primaryKey' => self::primary_key( $name ),
			);
		}
		return rest_ensure_response(
			array(
				'charset' => (string) $wpdb->charset,
				'tables'  => $tables,
			)
		);
	}

	public static function handle_rows( WP_REST_Request $request ) {
		global $wpdb;

		$table = (string) $request->get_param( 'table' );
		if ( ! in_array( $table, self::table_names(), true ) ) {
			return new WP_Error( WPSYNC_ERROR_NOT_FOUND, 'No such table.', array( 'status' => 404 ) );
		}
		$cursor = self::decode_cursor( $request->get_param( 'cursor' ) );
		if ( false === $cursor ) {
			return new WP_Error( WPSYNC_ERROR_BAD_REQUEST, 'Bad cursor.', array( 'status' => 400 ) );
		}

		$columns = self::columns( $table );
		$pk      = self::primary_key( $table );
		$names   = array_keys( $columns );
		$select  = implode( ', ', array_map( array( __CLASS__, 'ident' ), $names ) );
		$sql     = "SELECT {$select} FROM " . self::ident( $table );

		if ( $pk ) {
			if ( isset( $cursor['after'] ) ) {
				$sql .= ' WHERE (' . implode( ', ', array_map( array( __CLASS__, 'ident' ), $pk ) ) . ') > ('
					. implode( ', ', array_map( array( __CLASS__, 'literal_text' ), $cursor['after'] ) ) . ')';
			}
			$sql .= ' ORDER BY ' . implode( ', ', array_map( array( __CLASS__, 'ident' ), $pk ) );
			$sql .= ' LIMIT ' . WPSYNC_DB_ROWS_LIMIT;
		} else {
			$offset = isset( $cursor['offset'] ) ? (int) $cursor['offset'] : 0;
			$sql   .= ' LIMIT ' . $offset . ', ' . WPSYNC_DB_ROWS_LIMIT;
		}

		$rows = $wpdb->get_results( $sql, ARRAY_A ); // phpcs:ignore WordPress.DB.PreparedSQL -- identifiers quoted, values escaped above.
		if ( null === $rows && '' !== $wpdb->last_error ) {
			return new WP_Error( WPSYNC_ERROR_BAD_REQUEST, 'Database error reading ' . $table . ': ' . $wpdb->last_error, array( 'status' => 500 ) );
		}

		$prefix     = 'INSERT INTO ' . self::ident( $table ) . ' (' . $select . ') VALUES ';
		$out        = '';
		$statement  = '';
		$count      = 0;
		$last       = null;
		$deadline   = microtime( true ) + WPSYNC_TIME_BUDGET_SECONDS;

		foreach ( $rows as $row ) {
			$values = array();
			foreach ( $columns as $name => $is_binary ) {
				$values[] = self::literal( $row[ $name ], $is_binary );
			}
			$tuple = '(' . implode( ',', $values ) . ')';

			// Close the statement before it gets big; most MySQL servers cap packets around 16 MB.
			if ( '' !== $statement && strlen( $statement ) + strlen( $tuple ) > 500000 ) {
				$out      .= $statement . ";\\n";
				$statement = '';
			}
			$statement .= ( '' === $statement ? $prefix : ',' ) . $tuple;
			$count++;
			$last = $row;

			if ( strlen( $out ) + strlen( $statement ) >= WPSYNC_DB_CHUNK_BYTES || microtime( true ) > $deadline ) {
				break;
			}
		}
		if ( '' !== $statement ) {
			$out .= $statement . ";\\n";
		}

		$next = null;
		if ( $count > 0 && ( $count < count( $rows ) || count( $rows ) === WPSYNC_DB_ROWS_LIMIT ) ) {
			if ( $pk ) {
				$after = array();
				foreach ( $pk as $column ) {
					$after[] = $last[ $column ];
				}
				$next = self::encode_cursor( array( 'after' => $after ) );
			} else {
				$offset = isset( $cursor['offset'] ) ? (int) $cursor['offset'] : 0;
				$next   = self::encode_cursor( array( 'offset' => $offset + $count ) );
			}
		}

		return rest_ensure_response(
			array(
				'sql'  => $out,
				'rows' => $count,
				'next' => $next,
			)
		);
	}

	/** Base tables that belong to this WordPress (its table prefix), sorted by name. */
	private static function table_names() {
		global $wpdb;
		$names = $wpdb->get_col(
			$wpdb->prepare(
				"SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME LIKE %s",
				$wpdb->esc_like( $wpdb->base_prefix ) . '%'
			)
		);
		$names = array_map( 'strval', (array) $names );
		sort( $names, SORT_STRING );
		return $names;
	}

	private static function primary_key( $table ) {
		global $wpdb;
		$keys = $wpdb->get_results( 'SHOW KEYS FROM ' . self::ident( $table ) . " WHERE Key_name = 'PRIMARY'", ARRAY_A ); // phpcs:ignore WordPress.DB.PreparedSQL
		if ( empty( $keys ) ) {
			return null;
		}
		usort(
			$keys,
			function ( $a, $b ) {
				return (int) $a['Seq_in_index'] - (int) $b['Seq_in_index'];
			}
		);
		return array_map(
			function ( $key ) {
				return $key['Column_name'];
			},
			$keys
		);
	}

	/**
	 * Columns to copy, mapped to whether they hold binary data (written as hex). Generated
	 * columns are left out: the database fills them in itself and refuses inserts into them.
	 */
	private static function columns( $table ) {
		global $wpdb;
		$columns = array();
		foreach ( (array) $wpdb->get_results( 'SHOW COLUMNS FROM ' . self::ident( $table ), ARRAY_A ) as $column ) { // phpcs:ignore WordPress.DB.PreparedSQL
			if ( false !== stripos( (string) $column['Extra'], 'generated' ) ) {
				continue;
			}
			$type                           = strtolower( (string) $column['Type'] );
			$columns[ $column['Field'] ] = ( false !== strpos( $type, 'blob' ) || false !== strpos( $type, 'binary' ) );
		}
		return $columns;
	}

	private static function literal( $value, $is_binary ) {
		if ( null === $value ) {
			return 'NULL';
		}
		if ( $is_binary ) {
			return '' === $value ? "''" : '0x' . bin2hex( $value );
		}
		return self::literal_text( $value );
	}

	private static function literal_text( $value ) {
		global $wpdb;
		if ( null === $value ) {
			return 'NULL';
		}
		// _real_escape() adds WordPress's % placeholder escaping; take it back out for raw SQL.
		return "'" . $wpdb->remove_placeholder_escape( $wpdb->_real_escape( (string) $value ) ) . "'";
	}

	private static function ident( $name ) {
		return '\`' . str_replace( '\`', '\`\`', $name ) . '\`';
	}

	private static function encode_cursor( $data ) {
		return rtrim( strtr( base64_encode( wp_json_encode( $data ) ), '+/', '-_' ), '=' );
	}

	/** Decoded cursor array, null for none, or false when it's malformed. */
	private static function decode_cursor( $raw ) {
		if ( null === $raw || '' === $raw ) {
			return null;
		}
		$json = base64_decode( strtr( (string) $raw, '-_', '+/' ), true );
		$data = false === $json ? null : json_decode( $json, true );
		if ( ! is_array( $data ) ) {
			return false;
		}
		if ( isset( $data['after'] ) && ! is_array( $data['after'] ) ) {
			return false;
		}
		return $data;
	}
}
`,"includes/class-wpsync-files.php":`<?php
/**
 * File transfer: GET files/list, POST files/fetch, GET files/read.
 * Shapes and the fetch stream's framing: packages/protocol/src/files.ts.
 *
 * Paths are relative to the WordPress root. Excluded paths, symbolic links and anything outside
 * the root are never listed or served.
 *
 * @package WpsyncBridge
 */

defined( 'ABSPATH' ) || exit;

class Wpsync_Files {

	public static function handle_list( WP_REST_Request $request ) {
		$raw    = $request->get_param( 'cursor' );
		$cursor = null;
		if ( null !== $raw && '' !== $raw ) {
			$cursor = base64_decode( strtr( (string) $raw, '-_', '+/' ), true );
			if ( false === $cursor || ! Wpsync_Paths::is_safe_relative( $cursor ) ) {
				return new WP_Error( WPSYNC_ERROR_BAD_REQUEST, 'Bad cursor.', array( 'status' => 400 ) );
			}
		}

		$out      = array();
		$complete = self::walk( Wpsync_Paths::root(), '', $cursor, $out, microtime( true ) + WPSYNC_TIME_BUDGET_SECONDS );
		$next     = null;
		if ( ! $complete && ! empty( $out ) ) {
			$last = end( $out );
			$next = rtrim( strtr( base64_encode( $last['path'] ), '+/', '-_' ), '=' );
		}
		return rest_ensure_response(
			array(
				'entries' => $out,
				'next'    => $next,
			)
		);
	}

	/**
	 * Depth-first walk in Wpsync_Paths::compare order, collecting files after $cursor.
	 * Returns false when it stopped early (page full or time budget spent).
	 */
	private static function walk( $absolute, $relative, $cursor, &$out, $deadline ) {
		$names = @scandir( $absolute ); // phpcs:ignore WordPress.PHP.NoSilencedErrors -- unreadable folders are skipped.
		if ( false === $names ) {
			return true;
		}
		usort( $names, 'strcmp' );

		foreach ( $names as $name ) {
			if ( '.' === $name || '..' === $name ) {
				continue;
			}
			$child_rel = '' === $relative ? $name : $relative . '/' . $name;
			$child_abs = $absolute . '/' . $name;
			if ( Wpsync_Paths::is_excluded( $child_rel ) || is_link( $child_abs ) ) {
				continue;
			}

			if ( is_dir( $child_abs ) ) {
				// Skip a whole folder that sorts before the cursor and doesn't contain it.
				if ( null !== $cursor && Wpsync_Paths::compare( $child_rel, $cursor ) < 0 && 0 !== strpos( $cursor, $child_rel . '/' ) ) {
					continue;
				}
				if ( ! self::walk( $child_abs, $child_rel, $cursor, $out, $deadline ) ) {
					return false;
				}
			} elseif ( is_file( $child_abs ) ) {
				if ( null !== $cursor && Wpsync_Paths::compare( $child_rel, $cursor ) <= 0 ) {
					continue;
				}
				if ( count( $out ) >= WPSYNC_FILES_LIST_LIMIT || ( ! empty( $out ) && microtime( true ) > $deadline ) ) {
					return false;
				}
				$stat  = @stat( $child_abs ); // phpcs:ignore WordPress.PHP.NoSilencedErrors
				$out[] = array(
					'path'  => $child_rel,
					'size'  => $stat ? (int) $stat['size'] : 0,
					'mtime' => $stat ? (int) $stat['mtime'] : 0,
				);
			}
		}
		return true;
	}

	public static function handle_fetch( WP_REST_Request $request ) {
		$body  = $request->get_json_params();
		$paths = isset( $body['paths'] ) && is_array( $body['paths'] ) ? $body['paths'] : null;
		if ( empty( $paths ) || count( $paths ) > WPSYNC_FETCH_BATCH_FILES ) {
			return new WP_Error( WPSYNC_ERROR_BAD_REQUEST, 'paths must list 1 to ' . WPSYNC_FETCH_BATCH_FILES . ' files.', array( 'status' => 400 ) );
		}

		self::begin_stream();
		foreach ( $paths as $relative ) {
			$absolute = is_string( $relative ) ? Wpsync_Paths::resolve_file( $relative ) : null;
			// Read whole, so the size in the header is exactly what follows even if the file changes.
			$content = null === $absolute ? false : @file_get_contents( $absolute ); // phpcs:ignore WordPress.PHP.NoSilencedErrors, WordPress.WP.AlternativeFunctions
			if ( false === $content || strlen( $content ) > WPSYNC_FETCH_BATCH_BYTES ) {
				echo wp_json_encode( array( 'path' => (string) $relative, 'missing' => true ) ) . "\\n"; // phpcs:ignore WordPress.Security.EscapeOutput
				continue;
			}
			echo wp_json_encode( // phpcs:ignore WordPress.Security.EscapeOutput
				array(
					'path'  => $relative,
					'size'  => strlen( $content ),
					'mtime' => (int) @filemtime( $absolute ), // phpcs:ignore WordPress.PHP.NoSilencedErrors
				)
			) . "\\n";
			echo $content; // phpcs:ignore WordPress.Security.EscapeOutput -- raw file bytes.
		}
		exit;
	}

	public static function handle_read( WP_REST_Request $request ) {
		$relative = (string) $request->get_param( 'path' );
		$offset   = (int) $request->get_param( 'offset' );
		$length   = (int) $request->get_param( 'length' );
		if ( $offset < 0 || $length < 1 || $length > WPSYNC_FETCH_BATCH_BYTES ) {
			return new WP_Error( WPSYNC_ERROR_BAD_REQUEST, 'Bad offset or length.', array( 'status' => 400 ) );
		}
		$absolute = Wpsync_Paths::resolve_file( $relative );
		$handle   = null === $absolute ? false : @fopen( $absolute, 'rb' ); // phpcs:ignore WordPress.PHP.NoSilencedErrors, WordPress.WP.AlternativeFunctions
		if ( false === $handle ) {
			return new WP_Error( WPSYNC_ERROR_NOT_FOUND, 'No such file.', array( 'status' => 404 ) );
		}
		$stat = fstat( $handle );

		self::begin_stream();
		header( WPSYNC_FILE_SIZE_HEADER . ': ' . (int) $stat['size'] );
		header( WPSYNC_FILE_MTIME_HEADER . ': ' . (int) $stat['mtime'] );
		fseek( $handle, $offset );
		$left = $length;
		while ( $left > 0 && ! feof( $handle ) ) {
			$chunk = fread( $handle, min( 1048576, $left ) ); // phpcs:ignore WordPress.WP.AlternativeFunctions
			if ( false === $chunk || '' === $chunk ) {
				break;
			}
			echo $chunk; // phpcs:ignore WordPress.Security.EscapeOutput -- raw file bytes.
			$left -= strlen( $chunk );
		}
		fclose( $handle ); // phpcs:ignore WordPress.WP.AlternativeFunctions
		exit;
	}

	/** Drops any buffered output and starts a raw binary response. */
	private static function begin_stream() {
		while ( ob_get_level() > 0 ) {
			ob_end_clean();
		}
		status_header( 200 );
		nocache_headers();
		header( 'Content-Type: application/octet-stream' );
		header( 'X-Content-Type-Options: nosniff' );
	}
}
`,"includes/class-wpsync-guard.php":`<?php
/**
 * Who may use the bridge, and for how long.
 *
 * - Every route needs a logged-in user (in practice, an Application Password) with
 *   manage_options, over HTTPS (plain HTTP only on a site whose environment type is "local").
 * - Activation sets a deadline WPSYNC_DEADLINE_SECONDS ahead. Once it passes, the bridge
 *   refuses every request and deactivates itself, so a crashed run never leaves it on.
 *
 * @package WpsyncBridge
 */

defined( 'ABSPATH' ) || exit;

class Wpsync_Guard {

	/** Set when this request found the deadline passed and deactivated the plugin. */
	private static $expired = false;

	public static function on_activate() {
		update_option( WPSYNC_OPTION_DEADLINE, time() + WPSYNC_DEADLINE_SECONDS, false );
	}

	public static function on_deactivate() {
		delete_option( WPSYNC_OPTION_DEADLINE );
	}

	/** Unix time the bridge stops working, or 0 if none is set. */
	public static function deadline() {
		return (int) get_option( WPSYNC_OPTION_DEADLINE, 0 );
	}

	/**
	 * Runs on every page load while active. A missing deadline counts as expired: it means the
	 * plugin was switched on without its activation hook (for example by editing the database).
	 */
	public static function check_deadline() {
		if ( self::deadline() > time() ) {
			return;
		}
		self::$expired = true;
		if ( ! function_exists( 'deactivate_plugins' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}
		deactivate_plugins( WPSYNC_PLUGIN_FILE, true );
		delete_option( WPSYNC_OPTION_DEADLINE );
	}

	/**
	 * permission_callback for every bridge route.
	 *
	 * @return true|WP_Error
	 */
	public static function permission() {
		if ( self::$expired ) {
			return new WP_Error(
				WPSYNC_ERROR_EXPIRED,
				'The wpsync bridge passed its deadline and has deactivated itself. Activate it again to continue.',
				array( 'status' => 403 )
			);
		}
		if ( ! is_ssl() && 'local' !== wp_get_environment_type() ) {
			return new WP_Error(
				WPSYNC_ERROR_HTTPS_REQUIRED,
				'The wpsync bridge only answers over HTTPS.',
				array( 'status' => 403 )
			);
		}
		if ( ! is_user_logged_in() ) {
			return new WP_Error(
				WPSYNC_ERROR_NOT_LOGGED_IN,
				'Sign in with an administrator Application Password.',
				array( 'status' => 401 )
			);
		}
		if ( ! current_user_can( 'manage_options' ) ) {
			return new WP_Error(
				WPSYNC_ERROR_FORBIDDEN,
				'Only administrators can use the wpsync bridge.',
				array( 'status' => 403 )
			);
		}
		return true;
	}
}
`,"includes/class-wpsync-info.php":`<?php
/**
 * GET /wpsync/v1/info: the site's versions, layout and limits.
 * Shape: InfoResponse in packages/protocol/src/info.ts.
 *
 * @package WpsyncBridge
 */

defined( 'ABSPATH' ) || exit;

class Wpsync_Info {

	public static function handle() {
		return rest_ensure_response( self::build() );
	}

	public static function build() {
		global $wpdb;

		if ( ! function_exists( 'get_plugins' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}
		if ( ! function_exists( 'get_filesystem_method' ) ) {
			require_once ABSPATH . 'wp-admin/includes/file.php';
		}

		$uploads    = wp_get_upload_dir();
		$theme      = wp_get_theme();
		$server_raw = (string) $wpdb->db_server_info();

		return array(
			'bridge'       => array(
				'version'         => WPSYNC_BRIDGE_VERSION,
				'protocolVersion' => WPSYNC_PROTOCOL_VERSION,
				'deadline'        => gmdate( 'c', Wpsync_Guard::deadline() ),
			),
			'site'         => array(
				'siteUrl'     => get_option( 'siteurl' ),
				'homeUrl'     => get_option( 'home' ),
				'name'        => get_bloginfo( 'name' ),
				'multisite'   => is_multisite(),
				'locale'      => get_locale(),
				'timezone'    => wp_timezone_string(),
				'environment' => wp_get_environment_type(),
			),
			'wordpress'    => array(
				'version' => get_bloginfo( 'version' ),
			),
			'php'          => array(
				'version'           => PHP_VERSION,
				'sapi'              => PHP_SAPI,
				'extensions'        => self::extensions(),
				'memoryLimit'       => self::ini_bytes( 'memory_limit' ),
				'maxExecutionTime'  => max( 0, (int) ini_get( 'max_execution_time' ) ),
				'uploadMaxFilesize' => self::ini_bytes( 'upload_max_filesize' ),
				'postMaxSize'       => self::ini_bytes( 'post_max_size' ),
			),
			'server'       => array(
				'software' => isset( $_SERVER['SERVER_SOFTWARE'] ) ? sanitize_text_field( wp_unslash( $_SERVER['SERVER_SOFTWARE'] ) ) : null,
				'time'     => gmdate( 'c' ),
			),
			'database'     => array(
				'engine'     => self::db_engine( $server_raw ),
				'version'    => self::db_version( $server_raw, (string) $wpdb->db_version() ),
				'serverInfo' => $server_raw,
				'charset'    => (string) $wpdb->charset,
				'collate'    => (string) $wpdb->collate,
				'tablePrefix' => (string) $wpdb->base_prefix,
			),
			'theme'        => array(
				'stylesheet' => get_stylesheet(),
				'template'   => get_template(),
				'name'       => (string) $theme->get( 'Name' ),
				'version'    => (string) $theme->get( 'Version' ),
			),
			'plugins'      => self::plugins(),
			'muPlugins'    => self::mu_plugins(),
			'dropins'      => self::dropins(),
			'paths'        => array(
				'abspath'    => ABSPATH,
				'contentDir' => WP_CONTENT_DIR,
				'pluginsDir' => WP_PLUGIN_DIR,
				'uploadsDir' => $uploads['basedir'],
			),
			'capabilities' => array(
				'fileModsAllowed'  => ! ( defined( 'DISALLOW_FILE_MODS' ) && DISALLOW_FILE_MODS ),
				'filesystemMethod' => (string) get_filesystem_method(),
				'writable'         => array(
					'abspath'    => wp_is_writable( ABSPATH ),
					'contentDir' => wp_is_writable( WP_CONTENT_DIR ),
					'uploadsDir' => wp_is_writable( $uploads['basedir'] ),
				),
				'diskFreeBytes'    => self::disk_free( ABSPATH ),
			),
		);
	}

	private static function extensions() {
		$list = array_map( 'strtolower', get_loaded_extensions() );
		sort( $list );
		return array_values( array_unique( $list ) );
	}

	/** An ini size setting in bytes; null when hidden. A "-1" (unlimited) memory limit reports as null too. */
	private static function ini_bytes( $key ) {
		$raw = ini_get( $key );
		if ( false === $raw || '' === $raw || '-1' === trim( $raw ) ) {
			return null;
		}
		return max( 0, (int) wp_convert_hr_to_bytes( $raw ) );
	}

	private static function db_engine( $server_info ) {
		if ( false !== stripos( $server_info, 'mariadb' ) ) {
			return 'mariadb';
		}
		if ( preg_match( '/^\\d+\\.\\d+/', $server_info ) ) {
			return 'mysql';
		}
		return 'unknown';
	}

	/**
	 * Numeric version. Older MariaDB servers report "5.5.5-10.11.6-MariaDB": the real version
	 * follows the "5.5.5-" compatibility prefix.
	 */
	private static function db_version( $server_info, $fallback ) {
		$info = preg_replace( '/^5\\.5\\.5-/', '', $server_info );
		if ( preg_match( '/^(\\d+\\.\\d+(?:\\.\\d+)?)/', $info, $m ) ) {
			return $m[1];
		}
		return $fallback;
	}

	private static function plugins() {
		$out = array();
		foreach ( get_plugins() as $file => $data ) {
			$out[] = array(
				'file'    => $file,
				'name'    => (string) $data['Name'],
				'version' => (string) $data['Version'],
				'active'  => is_plugin_active( $file ),
			);
		}
		return $out;
	}

	private static function mu_plugins() {
		$out = array();
		foreach ( get_mu_plugins() as $file => $data ) {
			$out[] = array(
				'file'    => $file,
				'name'    => (string) $data['Name'],
				'version' => (string) $data['Version'],
			);
		}
		return $out;
	}

	private static function dropins() {
		$out = array();
		foreach ( get_dropins() as $file => $data ) {
			$out[] = array(
				'file' => $file,
				'name' => (string) $data['Name'],
			);
		}
		return $out;
	}

	private static function disk_free( $path ) {
		if ( ! function_exists( 'disk_free_space' ) ) {
			return null;
		}
		$free = @disk_free_space( $path ); // phpcs:ignore WordPress.PHP.NoSilencedErrors -- open_basedir hosts warn here.
		return false === $free ? null : (int) $free;
	}
}
`,"includes/class-wpsync-paths.php":`<?php
/**
 * Path rules: a port of packages/protocol/src/paths.ts. Both must agree on
 * packages/protocol/test-vectors/paths.json (test/php/paths-test.php checks this side).
 *
 * @package WpsyncBridge
 */

defined( 'ABSPATH' ) || exit;

class Wpsync_Paths {

	/** True when the path, or any folder above it, matches a WPSYNC_PULL_EXCLUDES pattern. */
	public static function is_excluded( $path, $excludes = WPSYNC_PULL_EXCLUDES ) {
		$segments = explode( '/', $path );
		foreach ( $excludes as $pattern ) {
			$parts = explode( '/', $pattern );
			if ( count( $parts ) > count( $segments ) ) {
				continue;
			}
			$all = true;
			foreach ( $parts as $i => $part ) {
				if ( ! self::segment_matches( $part, $segments[ $i ] ) ) {
					$all = false;
					break;
				}
			}
			if ( $all ) {
				return true;
			}
		}
		return false;
	}

	private static function segment_matches( $pattern, $segment ) {
		if ( false === strpos( $pattern, '*' ) ) {
			return $pattern === $segment;
		}
		$quoted = array_map(
			function ( $piece ) {
				return preg_quote( $piece, '/' );
			},
			explode( '*', $pattern )
		);
		return 1 === preg_match( '/^' . implode( '.*', $quoted ) . '$/s', $segment );
	}

	/** Segment-by-segment byte order: the order a folder-by-folder walk visits paths. */
	public static function compare( $a, $b ) {
		$as = explode( '/', $a );
		$bs = explode( '/', $b );
		$n  = min( count( $as ), count( $bs ) );
		for ( $i = 0; $i < $n; $i++ ) {
			$cmp = strcmp( $as[ $i ], $bs[ $i ] );
			if ( 0 !== $cmp ) {
				return $cmp < 0 ? -1 : 1;
			}
		}
		return count( $as ) <=> count( $bs );
	}

	public static function is_safe_relative( $path ) {
		if ( ! is_string( $path ) || '' === $path || '/' === $path[0] || false !== strpos( $path, '\\\\' ) || false !== strpos( $path, "\\0" ) ) {
			return false;
		}
		foreach ( explode( '/', $path ) as $segment ) {
			if ( '' === $segment || '.' === $segment || '..' === $segment ) {
				return false;
			}
		}
		return true;
	}

	/** The WordPress root without its trailing slash. */
	public static function root() {
		return untrailingslashit( ABSPATH );
	}

	/**
	 * Absolute path for a relative one the CLI asked for, or null when it isn't a safe, included,
	 * regular file inside the WordPress root (symbolic links included: they're never served).
	 */
	public static function resolve_file( $relative ) {
		if ( ! self::is_safe_relative( $relative ) || self::is_excluded( $relative ) ) {
			return null;
		}
		$absolute = self::root() . '/' . $relative;
		if ( is_link( $absolute ) || ! is_file( $absolute ) ) {
			return null;
		}
		return $absolute;
	}
}
`,"includes/protocol.php":`<?php
/**
 * GENERATED from packages/protocol/src/constants.ts by \`pnpm generate\`. Do not edit.
 */

defined( 'ABSPATH' ) || exit;

const WPSYNC_PROTOCOL_VERSION = 1;
const WPSYNC_BRIDGE_VERSION = '0.1.0';
const WPSYNC_REST_NAMESPACE = 'wpsync/v1';
const WPSYNC_PLUGIN_FILE = 'wpsync-bridge/wpsync-bridge.php';
const WPSYNC_DEADLINE_SECONDS = 7200;
const WPSYNC_OPTION_DEADLINE = 'wpsync_bridge_deadline';

const WPSYNC_DB_CHUNK_BYTES = 2000000;
const WPSYNC_DB_ROWS_LIMIT = 2000;
const WPSYNC_FILES_LIST_LIMIT = 5000;
const WPSYNC_FETCH_BATCH_BYTES = 8000000;
const WPSYNC_FETCH_BATCH_FILES = 500;
const WPSYNC_TIME_BUDGET_SECONDS = 15;
const WPSYNC_FILE_SIZE_HEADER = 'X-Wpsync-File-Size';
const WPSYNC_FILE_MTIME_HEADER = 'X-Wpsync-File-Mtime';

const WPSYNC_PULL_EXCLUDES = array(
	'wp-config.php',
	'.maintenance',
	'.git',
	'.svn',
	'error_log',
	'wp-content/plugins/wpsync-bridge',
	'wp-content/uploads/wpsync-*',
	'wp-content/cache',
	'wp-content/upgrade',
	'wp-content/upgrade-temp-backup',
	'wp-content/debug.log',
	'wp-content/ai1wm-backups',
	'wp-content/updraft',
	'wp-content/backups-dup-lite',
	'wp-content/backups-dup-pro',
	'wp-content/wpvividbackups',
	'wp-content/wflogs',
);

const WPSYNC_ROUTE_INFO = '/info';
const WPSYNC_ROUTE_DB_TABLES = '/db/tables';
const WPSYNC_ROUTE_DB_ROWS = '/db/rows';
const WPSYNC_ROUTE_FILES_LIST = '/files/list';
const WPSYNC_ROUTE_FILES_FETCH = '/files/fetch';
const WPSYNC_ROUTE_FILES_READ = '/files/read';

const WPSYNC_ERROR_NOT_LOGGED_IN = 'wpsync_not_logged_in';
const WPSYNC_ERROR_FORBIDDEN = 'wpsync_forbidden';
const WPSYNC_ERROR_HTTPS_REQUIRED = 'wpsync_https_required';
const WPSYNC_ERROR_EXPIRED = 'wpsync_expired';
const WPSYNC_ERROR_BAD_REQUEST = 'wpsync_bad_request';
const WPSYNC_ERROR_NOT_FOUND = 'wpsync_not_found';
const WPSYNC_ERROR_UNSUPPORTED = 'wpsync_unsupported';
`,"wpsync-bridge.php":`<?php
/**
 * Plugin Name:       wpsync bridge
 * Description:       Temporary bridge used by the wpsync command-line tool to copy this site to a local development copy and publish it back. It stays inactive between runs and deactivates itself two hours after activation.
 * Version:           0.1.0
 * Requires at least: 5.6
 * Requires PHP:      7.4
 * Author:            wp-dev-automation
 * License:           GPL-2.0-or-later
 *
 * @package WpsyncBridge
 */

defined( 'ABSPATH' ) || exit;

define( 'WPSYNC_BRIDGE_MAIN', __FILE__ );

require_once __DIR__ . '/includes/protocol.php';
require_once __DIR__ . '/includes/class-wpsync-guard.php';
require_once __DIR__ . '/includes/class-wpsync-info.php';
require_once __DIR__ . '/includes/class-wpsync-paths.php';
require_once __DIR__ . '/includes/class-wpsync-db.php';
require_once __DIR__ . '/includes/class-wpsync-files.php';

register_activation_hook( __FILE__, array( 'Wpsync_Guard', 'on_activate' ) );
register_deactivation_hook( __FILE__, array( 'Wpsync_Guard', 'on_deactivate' ) );

add_action( 'plugins_loaded', array( 'Wpsync_Guard', 'check_deadline' ) );
add_action( 'rest_api_init', 'wpsync_register_routes' );

/**
 * Registers the bridge's REST routes. Every route uses the same permission check.
 */
function wpsync_register_routes() {
	$routes = array(
		WPSYNC_ROUTE_INFO        => array( 'GET', array( 'Wpsync_Info', 'handle' ), array() ),
		WPSYNC_ROUTE_DB_TABLES   => array( 'GET', array( 'Wpsync_Db', 'handle_tables' ), array() ),
		WPSYNC_ROUTE_DB_ROWS     => array(
			'GET',
			array( 'Wpsync_Db', 'handle_rows' ),
			array(
				'table'  => array(
					'type'     => 'string',
					'required' => true,
				),
				'cursor' => array( 'type' => 'string' ),
			),
		),
		WPSYNC_ROUTE_FILES_LIST  => array( 'GET', array( 'Wpsync_Files', 'handle_list' ), array( 'cursor' => array( 'type' => 'string' ) ) ),
		WPSYNC_ROUTE_FILES_FETCH => array( 'POST', array( 'Wpsync_Files', 'handle_fetch' ), array() ),
		WPSYNC_ROUTE_FILES_READ  => array(
			'GET',
			array( 'Wpsync_Files', 'handle_read' ),
			array(
				'path'   => array(
					'type'     => 'string',
					'required' => true,
				),
				'offset' => array(
					'type'     => 'integer',
					'required' => true,
				),
				'length' => array(
					'type'     => 'integer',
					'required' => true,
				),
			),
		),
	);
	foreach ( $routes as $path => $route ) {
		register_rest_route(
			WPSYNC_REST_NAMESPACE,
			$path,
			array(
				'methods'             => $route[0],
				'callback'            => $route[1],
				'permission_callback' => array( 'Wpsync_Guard', 'permission' ),
				'args'                => $route[2],
			)
		);
	}
}
`},su={"CLAUDE.md.tmpl":`<!--
  PURPOSE: Instructions to Claude for working on one WordPress site project made by wpsync.
  USED BY: \`wpsync init\` renders this into the project's CLAUDE.md. Afterwards wpsync rewrites
  only the two marked blocks: wpsync:facts on every pull, wpsync:rules on \`wpsync update-rules\`
  (from claude-plugin/rules/). Everything outside them is the team's to edit.
-->
# {{SITE_NAME}}: local WordPress copy

This folder is a local copy of **{{HOME_URL}}**, made by wpsync. Work happens here; the live
site changes only when the developer asks to publish.

<!-- wpsync:facts:start -->
{{FACTS}}
<!-- wpsync:facts:end -->

## How to work here

- \`ddev start\` brings the local site up; \`ddev launch\` opens it in the browser; \`ddev wp \u2026\`
  runs WP-CLI. Log in to the local wp-admin with the same account as on the live site.
- \`wpsync pull {{HOME_URL}}\` refreshes this copy from live (database and changed files). Run it
  before starting new work, so you build on what's live now.
- \`wpsync push --dry-run\` shows what publishing would change. \`wpsync push\` **replaces the live
  site** with this copy, and only ever runs when the developer says so.
- Git tracks only code the team writes (see \`.gitignore\`). Commit as you go.

<!-- wpsync:rules:start -->
{{RULES}}
<!-- wpsync:rules:end -->
`,"claude-settings.json":`{
  "permissions": {
    "allow": [
      "Bash(ddev *)",
      "Bash(git *)",
      "Bash(brew *)",
      "Bash(wpsync connect *)",
      "Bash(wpsync pull *)",
      "Bash(wpsync init *)",
      "Bash(wpsync status *)",
      "Bash(wpsync doctor *)",
      "Bash(wpsync update-rules *)",
      "Bash(wpsync push --dry-run *)",
      "Bash(*/bin/wpsync connect *)",
      "Bash(*/bin/wpsync pull *)",
      "Bash(*/bin/wpsync init *)",
      "Bash(*/bin/wpsync status *)",
      "Bash(*/bin/wpsync doctor *)",
      "Bash(*/bin/wpsync update-rules *)",
      "Bash(*/bin/wpsync push --dry-run *)"
    ],
    "ask": [
      "Bash(wpsync push)",
      "Bash(wpsync push --confirm *)",
      "Bash(wpsync rollback *)",
      "Bash(wpsync finalize *)",
      "Bash(wpsync disconnect *)",
      "Bash(*/bin/wpsync push)",
      "Bash(*/bin/wpsync push --confirm *)",
      "Bash(*/bin/wpsync rollback *)",
      "Bash(*/bin/wpsync finalize *)",
      "Bash(*/bin/wpsync disconnect *)"
    ]
  }
}
`,gitignore:`# wpsync site project. Git tracks only code the team writes; everything else in wp/ can be
# pulled from the live site again. To track a theme or plugin you're changing, add a line like:
#   !wp/wp-content/themes/my-theme/
wp/*
!wp/wp-content/
wp/wp-content/*
!wp/wp-content/themes/
wp/wp-content/themes/*
!wp/wp-content/plugins/
wp/wp-content/plugins/*

# Database dumps and pull backups: they hold users' emails and password hashes.
backups/

# DDEV: keep config.yaml, ignore machine-local state
.ddev/*
!.ddev/config.yaml

# Personal Claude Code settings
.claude/settings.local.json

.DS_Store
`},Mr={"definition-of-done.md":`<!--
  PURPOSE: Instructions to Claude on when a change to a WordPress site counts as finished.
  USED BY: copied into each site project's CLAUDE.md with the other rules (see
  wordpress-native.md).
  EDIT HERE, not in a site's CLAUDE.md.
-->
## A change is done when

1. It's built locally and, where possible, uses the WordPress-native options above.
2. The affected pages load on the local site with no PHP errors or notices (\`ddev logs\` is clean), and look right in a browser, checked at desktop and phone widths.
3. Editors can still change it in wp-admin: anything they'd want to edit is editable there.
4. Code changes are committed with a message describing the change.
5. The developer has seen it working locally. Publishing is a separate step, done only when the developer asks.
`,"safety.md":`<!--
  PURPOSE: Instructions to Claude about what it must never do, or never do without asking,
  while working on a wpsync site project.
  USED BY: copied into each site project's CLAUDE.md with the other rules (see
  wordpress-native.md); the "publish" skill repeats the publishing part.
  EDIT HERE, not in a site's CLAUDE.md.
-->
## Safety rules

- **Nothing touches the live site without the developer's yes for that specific action.** That covers \`wpsync push\`, \`wpsync rollback\` and \`wpsync finalize\`. \`wpsync pull\` only reads the live site and needs no extra yes.
- **Publishing replaces the whole live site** (database and files) with the local copy. Anything people changed on live since the last pull is lost unless it was pulled first. Always run \`wpsync push --dry-run\` and show the developer its summary before a real push.
- **Never handle a site password.** \`wpsync connect\` asks for it in its own macOS dialog. Never ask the developer to type a password into the chat, never put one in a command, a file or a commit.
- **Never put secrets in git or in chat:** passwords, Application Passwords, license keys, or anything from \`backups/\` (database dumps hold users' emails and password hashes).
- **Never edit WordPress core** (\`wp/wp-admin/\`, \`wp/wp-includes/\`, the PHP files in \`wp/\`), parent themes, or third-party plugins. Never edit \`wp/wp-config.php\` beyond what DDEV writes: it doesn't go live.
- **Always use \`ddev wp \u2026\`** for WP-CLI, never a bare \`wp\`: WordPress runs inside DDEV.
- **Do one task at a time.** Don't refactor code you weren't asked about.
- **Git:** commit the code you change (child theme, custom plugins) with clear messages. If the site's own code isn't tracked yet, add its folder to \`.gitignore\`'s allow-list (the comment at the top shows how) before changing it, so \`wpsync pull\` can protect it.
`,"wordpress-native.md":`<!--
  PURPOSE: Instructions to Claude for every change it makes to a WordPress site: keep the site
  a normal WordPress site that people who don't code can run from wp-admin.
  USED BY: wpsync copies this file into each site project's CLAUDE.md (between the
  wpsync:rules markers); \`wpsync update-rules\` refreshes it there. The "work" skill also reads it.
  EDIT HERE, not in a site's CLAUDE.md: edits there are replaced on the next update-rules.
-->
## Keep it a WordPress site

**Every change should leave the site fully manageable in standard WordPress Admin** by someone who doesn't code. Build with WordPress's own tools first. Write PHP only when those tools truly can't do the job.

Before building anything, go down this list and use the first option that works:

1. **Content in wp-admin:** a Page, a Post, a menu item, a widget, a category, or a Reusable Block / Pattern. For example, a new section of the site is Pages with a menu entry, not a custom template.
2. **The block editor and the theme's own options:** core blocks, block patterns, the Site Editor or Customizer, and the theme's options panel.
3. **A plugin that's already installed and active** on this site. Check the site's plugin list first.
4. **A new, well-known, maintained plugin**, named to the developer and approved before installing. Check its last update date, active installs, and support for the site's PHP version.
5. **Child theme changes:** CSS in a child theme, or a template override copied from the parent theme into the child theme. Never edit a parent theme or any third-party plugin: their updates wipe out the changes. If the site has no child theme and one is needed, propose creating it first.
6. **Custom PHP, last:** only when 1\u20135 can't do it. Put it in a small custom plugin named after the site and the feature (for example \`<site>-<feature>\`), prefix every function, class, option and hook with the same prefix, and keep the theme for looks only. Anything an editor might want to change (text, links, numbers, on/off) goes in a settings field, a block, or post meta that shows in wp-admin, never hard-coded.

Also:

- No hard-coded page content, URLs or menu items in templates. Editors must be able to change them in wp-admin.
- When a change needs content on the live site (a new page or menu entry), remember that publishing replaces the whole live site with this local copy: make the content here, in the local wp-admin, so it goes live with the code.
- If a request can only be met by moving away from WordPress's way of doing things, say so and explain the trade-off before building it.
`};var iu=`${Rn}.zip`,Rf=new Date("2026-01-01T00:00:00Z");function au(){let e={};for(let[t,n]of Object.entries(ou))e[`${Rn}/${t}`]=[hn(n),{mtime:Rf}];return ru(e,{level:9})}var gn=`/wp/v2/plugins/${ro.replace(/\.php$/,"")}`,cu=4;class yt{site;username;applicationPassword;constructor(e,t,n){this.site=e;this.username=t;this.applicationPassword=n}async send(e,t,n,r){let o={Accept:r,Authorization:`Basic ${Buffer.from(`${this.username}:${this.applicationPassword}`).toString("base64")}`};if(n.body!==void 0)o["Content-Type"]="application/json";let s=this.site.restUrl(t,n.query),i=n.body===void 0?void 0:JSON.stringify(n.body);for(let a=1;;a++){try{let c=await V(s,{method:e,headers:o,body:i});if(c.status<500||c.status===501||a===cu)return c}catch(c){if(!(c instanceof w)||c.code!=="unreachable"||a===cu)throw c}await new Promise((c)=>setTimeout(c,500*2**a))}}async call(e,t,n={}){let r=await this.send(e,t,n,"application/json"),o=Ae(r.text)??r.text,s=r.status>=400?Ar.safeParse(o):void 0;return{status:r.status,body:o,errorCode:s?.success?s.data.code:void 0}}get(e,t){return this.call("GET",e,{query:t})}async bridge(e,t,n={}){let r=await this.call(n.method??"GET",`/${An}${t}`,n),o=e.safeParse(r.body);if(r.status!==200||!o.success)throw uu(t,r.status,r.errorCode,typeof r.body==="string"?r.body:void 0);return o.data}async bridgeRaw(e,t={}){let n=await this.send(t.method??"GET",`/${An}${e}`,t,"application/octet-stream");if(n.status!==200||!(n.headers.get("content-type")??"").includes("application/octet-stream")){let r=Ar.safeParse(Ae(n.text));throw uu(e,n.status,r.success?r.data.code:void 0,n.text)}return n}async setBridgeActive(e){let t=await this.call("PUT",gn,{body:{status:e?"active":"inactive"}});if(t.status!==200)throw new w(e?"bridge_activation_failed":"bridge_deactivation_failed",`WordPress wouldn't ${e?"activate":"deactivate"} the wpsync bridge (HTTP ${t.status}${t.errorCode?`, ${t.errorCode}`:""}).`)}async withBridge(e){await this.setBridgeActive(!0);try{return await e()}finally{await this.setBridgeActive(!1).catch(()=>{})}}}function uu(e,t,n,r){let o=!n&&r?r.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim().slice(0,200):"";return new w("bridge_error",`The bridge failed on ${e} (HTTP ${t}${n?`, ${n}`:""})${o?`: ${o}`:"."}`)}var lu=T({name:_(),url:_(),home:_(),namespaces:pe(_()),authentication:Or([Tp(_(),on()),pe(on())]).optional()});function Wr(e,t=!1){let n=/^[a-z]+:\/\//i.test(e)?e:`https://${e}`,r;try{r=new URL(n)}catch{throw new w("bad_url",`"${e}" isn't a web address.`)}if(r.protocol==="http:"&&!t)throw new w("http_refused",`${r.origin} uses plain HTTP, which would send the site's keys unencrypted.`,"Use the site's https:// address.");if(r.protocol!=="https:"&&r.protocol!=="http:")throw new w("bad_url",`"${e}" isn't a web address.`);return`${r.origin}${r.pathname}`.replace(/\/+$/,"")}function vt(e){return e.replace(/\/+$/,"")}async function _n(e,t={}){let n=Wr(e,t.allowHttp),r=await V(`${n}/wp-json/`,{headers:{Accept:"application/json"}}),o=lu.safeParse(Ae(r.text)),s;if(o.success){let u=vt(r.url.replace(/\/wp-json\/?$/,""));s=(l,p={})=>{let d=new URL(`${u}/wp-json${l}`);for(let[f,m]of Object.entries(p))d.searchParams.set(f,m);return d.toString()}}else{let u=await V(`${n}/?rest_route=/`,{headers:{Accept:"application/json"}});if(o=lu.safeParse(Ae(u.text)),!o.success)throw new w("not_wordpress",`${n} didn't answer like a WordPress site (no REST API at /wp-json/ or /?rest_route=/).`,"Check the address. If it is WordPress, a security plugin may be blocking the REST API.");let l=vt(new URL(u.url).origin+new URL(u.url).pathname);s=(p,d={})=>{let f=new URL(`${l}/`);f.searchParams.set("rest_route",p);for(let[m,g]of Object.entries(d))f.searchParams.set(m,g);return f.toString()}}let i=o.data;if(!i.namespaces.includes("wp/v2"))throw new w("rest_limited",`${n} has its WordPress REST API turned off.`);let a=i.authentication,c=!!a&&!Array.isArray(a)&&"application-passwords"in a;return{siteUrl:vt(i.url),homeUrl:vt(i.home),name:i.name,restUrl:s,applicationPasswords:c}}function yn(e){let t=new URL(e);return`${t.protocol}//${t.host.toLowerCase()}${vt(t.pathname)}`}async function pu(e,t){let n=e.log??(()=>{}),r=t.now??(()=>new Date);n(`Looking up ${e.url}\u2026`);let o=await _n(e.url,{allowHttp:e.allowHttp});if(!o.applicationPasswords)throw new w("application_passwords_unavailable",`${o.homeUrl} doesn't offer Application Passwords, which wpsync uses to sign in.`,"WordPress turns them off on sites without HTTPS, and some security plugins turn them off. Fix that and connect again.");let s=yn(o.homeUrl),i=await t.store.get(s),a=await t.credentials({name:o.name,homeUrl:o.homeUrl},e.username??i?.username);n("Signing in\u2026");let c=await fn.login(o,a.username,a.password),u;try{let l=`wpsync ${t.machineName??Cf()} ${r().toISOString().slice(0,10)}`;u=await c.createApplicationPassword(l);let p=new yt(o,a.username,u.password);if(await Df(p),i&&i.applicationPasswordUuid!==u.uuid)await c.deleteApplicationPassword(i.applicationPasswordUuid);let d={homeUrl:o.homeUrl,siteUrl:o.siteUrl,username:a.username,applicationPassword:u.password,applicationPasswordUuid:u.uuid,applicationPasswordName:l,connectedAt:r().toISOString()};await t.store.set(s,d);let f=await Nf(p,c,n);n("Checking the bridge\u2026");let m=await Lf(p);if(m.bridge.version!==je)n(`Note: the site has bridge ${m.bridge.version}; this wpsync ships ${je}.`);return{site:o,info:m,bridge:f,connection:d}}catch(l){if(u)await c.deleteApplicationPassword(u.uuid).catch(()=>{});throw l}finally{await c.logout()}}function Cf(){return Zf().replace(/\.local$/,"")}async function Df(e){let t=await e.get("/wp/v2/users/me",{context:"edit"});if(t.status===401)throw new w("authorization_header_stripped","The site's server drops the Authorization header, so WordPress never sees wpsync's key.","This is a hosting setting (common on some Apache setups). Ask the host to pass the Authorization header to PHP.");let n=t.body.capabilities??{};if(t.status!==200||!n.manage_options||!n.install_plugins)throw new w("not_administrator","That account isn't an administrator who can install plugins.","Sign in with an administrator account.")}async function Nf(e,t,n){let r=await e.get(gn);if(r.status===200)return"already-installed";if(r.status!==404)throw new w("plugin_check_failed",`Couldn't check the site's plugins (HTTP ${r.status}).`);if(n("Installing the wpsync bridge (it stays switched off between runs)\u2026"),await t.uploadPlugin(au(),iu),(await e.get(gn)).status!==200)throw new w("bridge_upload_failed","WordPress didn't install the wpsync bridge from the upload.");return"uploaded"}function Lf(e){return e.withBridge(()=>e.bridge(pn,ae.info))}import{execFileSync as Uf}from"child_process";function Hr(e){return`"${e.replace(/\\/g,"\\\\").replace(/"/g,"\\\"")}"`}function Ff(e,t,n=""){let r=`Sign in to ${e} (${t}) as an administrator.`,o="wpsync uses the password once, to create its own revocable key on the site. It never saves the password.";return[`set u to text returned of (display dialog ${Hr(`${r}

Username:`)} default answer ${Hr(n)} with title "wpsync" buttons {"Cancel", "Next"} default button "Next" cancel button "Cancel")`,`set p to text returned of (display dialog ("Password for " & u & ":" & return & return & ${Hr("wpsync uses the password once, to create its own revocable key on the site. It never saves the password.")}) default answer "" with hidden answer with title "wpsync" buttons {"Cancel", "Connect"} default button "Connect" cancel button "Cancel")`,"return u & linefeed & p"].join(`
`)}var fu=async(e,t)=>{let n;try{n=Uf("osascript",["-"],{input:Ff(e.name,e.homeUrl,t),encoding:"utf8",stdio:["pipe","pipe","pipe"]})}catch(a){let c=a.stderr??"";if(/-128/.test(c))throw new w("cancelled","Sign-in cancelled.");throw new w("dialog_failed","Couldn't show the sign-in dialog.","Run wpsync from a Mac where you're logged in to the desktop.")}let r=n.replace(/\n$/,""),o=r.indexOf(`
`),s=r.slice(0,o).trim(),i=r.slice(o+1);if(o<0||!s||!i)throw new w("cancelled","No username or password entered.");return{username:s,password:i}};function G(e){return e.toLocaleString("en-US")}function wt(e){if(e<1024)return`${G(e)} bytes`;let t=["KB","MB","GB","TB"],n=e/1024,r=0;while(n>=1024&&r<t.length-1)n/=1024,r++;return`${n.toLocaleString("en-US",{maximumFractionDigits:1})} ${t[r]}`}import{existsSync as Vf}from"fs";import{resolve as Kf}from"path";import{execFileSync as bu,spawnSync as Wf}from"child_process";import{existsSync as qe,mkdirSync as wn,readFileSync as Hf,writeFileSync as bn}from"fs";import{homedir as Gf}from"os";import{join as K,resolve as Jf}from"path";import{existsSync as jf,readFileSync as du,writeFileSync as Gr}from"fs";function Jr(e){let t=su[e];if(t===void 0)throw Error(`site template file ${e} missing from the build`);return t}var hu=Jr("gitignore"),mu=Jr("claude-settings.json");function gu(e){return e.replace(/^\s*<!--[\s\S]*?-->\s*/,"")}function _u(){return Object.keys(Mr).sort().map((e)=>gu(Mr[e]).trim()).join(`

`)}function Bf(){return process.env.WPSYNC_COMMAND||"wpsync"}function yu(e){let t=[`**Status:** ${e.status}`,""];if(t.push(`- **Live site:** ${e.homeUrl}`),e.localUrl)t.push(`- **Local copy:** ${e.localUrl}`);let n=e.info;if(n){let r=n.theme.template!==n.theme.stylesheet?`${n.theme.name} ${n.theme.version} (child theme of ${n.theme.template})`:`${n.theme.name} ${n.theme.version}`,o=n.plugins.filter((s)=>s.active&&!s.file.startsWith("wpsync-bridge/"));if(t.push(`- **WordPress:** ${n.wordpress.version}; **theme:** ${r}`),t.push(`- **Live server:** PHP ${n.php.version}, ${n.database.engine} ${n.database.version}, ${n.server.software??"unknown web server"}`),t.push(`- **Active plugins (${o.length}):** ${o.map((s)=>`${s.name} ${s.version}`).join(", ")||"none"}`),n.muPlugins.length)t.push(`- **Must-use plugins (from the host):** ${n.muPlugins.map((s)=>s.name||s.file).join(", ")}`)}if(e.ddev)t.push(`- **Local DDEV:** PHP ${e.ddev.phpVersion}, ${e.ddev.webserver}, ${e.ddev.database}`);return t.push("",`In this file, \`wpsync\` means: \`${Bf()}\``),t.join(`
`)}function Mf(e,t){return gu(Jr("CLAUDE.md.tmpl")).replaceAll("{{SITE_NAME}}",e).replaceAll("{{HOME_URL}}",t.homeUrl).replace("{{FACTS}}",yu(t)).replace("{{RULES}}",_u())}function vu(e,t,n){let r=`<!-- wpsync:${t}:start -->`,o=`<!-- wpsync:${t}:end -->`,s=e.indexOf(r),i=e.indexOf(o);if(s<0||i<s)return`${e.trimEnd()}

${r}
${n}
${o}
`;return`${e.slice(0,s+r.length)}
${n}
${e.slice(i)}`}function vn(e,t,n){if(!jf(e)){Gr(e,Mf(t,n));return}Gr(e,vu(du(e,"utf8"),"facts",yu(n)))}function wu(e){let t=du(e,"utf8"),n=vu(t,"rules",_u());if(n===t)return!1;return Gr(e,n),!0}var Yf=K(Gf(),"wp-sites"),qf=T({homeUrl:_(),setup:Ir(["pending","ready"]).default("ready"),siteUrl:_().optional(),ddevName:_().optional(),localUrl:_().optional(),tablePrefix:_().optional(),lastPull:T({at:_(),tables:ne(),rows:ne(),files:ne(),bytes:ne()}).optional(),lastPush:T({at:_(),stageId:_(),finalized:Ne()}).optional()});class $u{dir;constructor(e){this.dir=e}get wpDir(){return K(this.dir,"wp")}get backupsDir(){return K(this.dir,"backups")}get metaPath(){return K(this.dir,".wpsync.json")}get ddevConfigPath(){return K(this.dir,".ddev","config.yaml")}get claudeMdPath(){return K(this.dir,"CLAUDE.md")}exists(){return qe(this.metaPath)}read(){let e=qf.safeParse(JSON.parse(Hf(this.metaPath,"utf8")));if(!e.success)throw new w("bad_project",`${this.metaPath} isn't a wpsync project file.`);return e.data}write(e){bn(this.metaPath,`${JSON.stringify(e,null,2)}
`)}init(e,t){wn(K(this.dir,".claude"),{recursive:!0});let n=K(this.dir,".claude","settings.json");if(!qe(n))bn(n,mu);if(!qe(K(this.dir,".gitignore")))bn(K(this.dir,".gitignore"),hu);vn(this.claudeMdPath,t,{status:"set up, not pulled yet (run wpsync pull)",homeUrl:e}),this.write({homeUrl:e,setup:"pending"})}prepare(e,t,n){if(!qe(this.metaPath))this.init(e.homeUrl,n);if(wn(K(this.dir,".ddev"),{recursive:!0}),wn(this.wpDir,{recursive:!0}),wn(this.backupsDir,{recursive:!0}),bn(this.ddevConfigPath,t),this.write(e),!qe(K(this.dir,".git")))$n(this.dir,"init","-q","-b","main"),$n(this.dir,"add",".gitignore",".wpsync.json",".ddev/config.yaml","CLAUDE.md",".claude/settings.json"),$n(this.dir,"-c","user.name=wpsync","-c","user.email=wpsync@localhost","commit","-q","-m",`wpsync: local copy of ${e.homeUrl}`)}trackedWpFiles(){if(!qe(K(this.dir,".git")))return new Set;let e=$n(this.dir,"ls-files","-z","--","wp");return new Set(e.split("\x00").filter(Boolean).map((t)=>t.replace(/^wp\//,"")))}ddev(e,t={}){let n=Wf("ddev",e,{cwd:this.dir,encoding:"utf8",stdio:["ignore",t.show?"inherit":"pipe","pipe"],maxBuffer:67108864});if(n.error)throw new w("ddev_missing","Couldn't run DDEV.","Install it with: brew install ddev/ddev/ddev");if(n.status!==0){let r=(n.stderr||n.stdout||"").trim().split(`
`).slice(-3).join(" ");throw new w("ddev_failed",`ddev ${e.join(" ")} failed: ${r}`)}return(n.stdout??"").trim()}wp(...e){return this.ddev(["wp",...e])}syncFiles(){try{this.ddev(["mutagen","sync"])}catch{}}}function $n(e,...t){return bu("git",["-C",e,...t],{encoding:"utf8",stdio:["ignore","pipe","pipe"]})}function xn(e){let t=new URL(e),n=`${t.host}${t.pathname}`.replace(/\/+$/,"").replace(/[/:]+/g,"-");return K(Yf,n)}function bt(e){return new $u(Jf(e))}function xu(){try{bu("docker",["info"],{stdio:"ignore"})}catch{throw new w("docker_not_running","Docker isn't running.","Start Docker Desktop and try again.")}}function Su(e,t={}){let n=Wr(e,t.allowHttp),r=bt(t.dir??xn(n));if(r.exists()){let o=r.read();if(o.setup==="ready")throw new w("already_set_up",`${r.dir} is already a pulled copy of ${o.homeUrl}.`,`To refresh it, run: wpsync pull ${o.homeUrl}`);return{project:r,homeUrl:o.homeUrl,created:!1}}return r.init(n,new URL(n).host),{project:r,homeUrl:n,created:!0}}function Pu(e=process.cwd()){let t=bt(Kf(e));if(!t.exists()||!Vf(t.claudeMdPath))throw new w("not_a_project",`${t.dir} isn't a wpsync site project.`,"Run this inside a site's folder, or pass --dir.");return{path:t.claudeMdPath,changed:wu(t.claudeMdPath)}}import{readdirSync as vd,readFileSync as Mu,rmSync as wd,writeFileSync as bd}from"fs";import{join as qr,relative as $d,sep as xd}from"path";import{createWriteStream as Xf}from"fs";import{once as zu}from"events";import{createGzip as Qf}from"zlib";function ed(e){return`\`${e.replace(/`/g,"``")}\``}async function Eu(e,t,n=()=>{}){let{charset:r,tables:o}=await e.bridge(Dc,ae.dbTables),s=Qf(),i=Xf(t);s.pipe(i);let a={tables:o.length,rows:0,sqlBytes:0},c=async(u)=>{if(a.sqlBytes+=Buffer.byteLength(u),!s.write(u))await zu(s,"drain")};await c([`-- wpsync database download, ${new Date().toISOString()}`,`SET NAMES ${r||"utf8mb4"};`,"SET FOREIGN_KEY_CHECKS=0;","SET UNIQUE_CHECKS=0;","SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO';",""].join(`
`));for(let[u,l]of o.entries()){n(l.name,u,o.length),await c(`
DROP TABLE IF EXISTS ${ed(l.name)};
${l.createSql};
`);let p;do{let d={table:l.name};if(p)d.cursor=p;let f=await e.bridge(Nc,ae.dbRows,{query:d});if(f.sql)await c(f.sql);a.rows+=f.rows,p=f.next}while(p)}return await c(`
SET FOREIGN_KEY_CHECKS=1;
SET UNIQUE_CHECKS=1;
`),s.end(),await zu(i,"finish"),a}var td=["5.6","7.0","7.1","7.2","7.3","7.4","8.0","8.1","8.2","8.3","8.4","8.5"],nd=["5.5","10.0","10.1","10.2","10.3","10.4","10.5","10.6","10.7","10.8","10.11","11.4","11.8"],rd=["5.5","5.6","5.7","8.0","8.4"];function Yr(e){let[t="0",n="0"]=e.split(".");return[Number.parseInt(t,10)||0,Number.parseInt(n,10)||0]}function ku(e,t){let[n,r]=Yr(e),[o,s]=Yr(t);return n-o||r-s}function Tu(e,t){let[n,r]=Yr(e),o=`${n}.${r}`,s=[...t].sort(ku);return s.find((i)=>ku(i,o)>=0)??s[s.length-1]}function Ou(e){let t=new URL(e);return`${t.hostname}${t.pathname}`.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,63).replace(/-+$/,"")||"site"}function Iu(e,t){let n=(e.server.software??"").toLowerCase(),r=n.includes("apache")||n.includes("litespeed")?"apache-fpm":"nginx-fpm",o=e.database.engine==="mysql"?"mysql":"mariadb";return{name:t,phpVersion:Tu(e.php.version,td),webserver:r,database:{type:o,version:Tu(e.database.version,o==="mysql"?rd:nd)}}}function Au(e,t){return`# Local copy of ${t}, written by wpsync to match the live site's server.
# Changing php_version is safe; changing the database type or version means pulling again.
name: ${e.name}
type: wordpress
docroot: wp
php_version: "${e.phpVersion}"
webserver_type: ${e.webserver}
database:
  type: ${e.database.type}
  version: "${e.database.version}"
web_environment:
  - WP_ENVIRONMENT_TYPE=local
`}import{lstatSync as od,mkdirSync as sd,readdirSync as id,readFileSync as ad,renameSync as cd,rmSync as ud,utimesSync as ld,writeFileSync as pd}from"fs";import{dirname as fd,join as Sn}from"path";var dd=["wp-config.php","wp-config-ddev.php"],hd=4;async function Zu(e,t=()=>{}){let n=[],r;do{let o=await e.bridge(Uc,ae.filesList,{query:r?{cursor:r}:{}});for(let s of o.entries){if(!Bc(s.path))throw new w("bad_path",`The site listed an unsafe path: ${s.path}`);n.push(s)}t(n.length),r=o.next}while(r);return n}function Cu(e){let t=new Map,n=(r,o)=>{let s;try{s=id(r)}catch{return}for(let i of s){let a=o?`${o}/${i}`:i;if(Rr(a)||Rr(a,dd)||i.endsWith(".wpsync-tmp"))continue;let c=Sn(r,i),u=od(c);if(u.isSymbolicLink())continue;if(u.isDirectory())n(c,a);else if(u.isFile())t.set(a,{size:u.size,mtime:Math.floor(u.mtimeMs/1000)})}};return n(e,""),t}function md(e,t){return!!t&&t.size===e.size&&Math.abs(t.mtime-e.mtime)<=1}function Du(e,t,n){let r={fetch:[],remove:[],unchanged:0},o=new Set;for(let s of e){if(o.add(s.path),n.has(s.path))continue;if(md(s,t.get(s.path)))r.unchanged++;else r.fetch.push(s)}for(let s of t.keys())if(!o.has(s)&&!n.has(s))r.remove.push(s);return r}function gd(e){let t=[],n=0;while(n<e.length){let r=e.indexOf(10,n);if(r<0)throw new w("bad_stream","The site's file stream ended in the middle of a header.");let o=Fc.parse(JSON.parse(e.subarray(n,r).toString("utf8")));if(n=r+1,o.missing){t.push({header:o,content:null});continue}if(n+o.size>e.length)throw new w("bad_stream",`The site's file stream was cut off in ${o.path}.`);t.push({header:o,content:e.subarray(n,n+o.size)}),n+=o.size}return t}function Nu(e){let t=[],n=[],r=[],o=0;for(let s of e){if(s.size>$t){n.push(s);continue}if(r.length&&(o+s.size>$t||r.length>=so))t.push(r),r=[],o=0;r.push(s),o+=s.size}if(r.length)t.push(r);return{small:t,large:n}}async function Lu(e,t){let n=await e.bridgeRaw(ae.filesFetch,{method:"POST",body:{paths:t}});return gd(n.bytes)}async function Uu(e,t){let n=[],r=0,o=Number.POSITIVE_INFINITY;while(r<o){let s=await e.bridgeRaw(ae.filesRead,{query:{path:t,offset:String(r),length:String($t)}}).catch((i)=>{if(i instanceof w&&/HTTP 404/.test(i.message))return null;throw i});if(!s)return null;if(o=Number(s.headers.get(jc)??"0"),s.bytes.length===0)break;n.push(s.bytes),r+=s.bytes.length}return{content:Buffer.concat(n),size:r}}function Ru(e,t,n,r){let o=Sn(e,t);sd(fd(o),{recursive:!0});let s=`${o}.wpsync-tmp`;pd(s,n),cd(s,o),ld(o,r,r)}async function _d(e,t){let n=0,r=Array.from({length:Math.min(hd,e.length)},async()=>{while(n<e.length){let o=e[n++];await t(o)}});await Promise.all(r)}async function Fu(e,t,n,r=()=>{}){let o={files:0,bytes:0,vanished:[]},{small:s,large:i}=Nu(n),a=(c)=>{o.files++,o.bytes+=c,r(o.files,o.bytes)};await _d(s,async(c)=>{for(let{header:u,content:l}of await Lu(e,c.map((p)=>p.path))){if(u.missing||!l){o.vanished.push(u.path);continue}Ru(t,u.path,l,u.mtime),a(l.length)}});for(let c of i){let u=await Uu(e,c.path);if(!u){o.vanished.push(c.path);continue}Ru(t,c.path,u.content,c.mtime),a(u.content.length)}return o}async function yd(e,t){let n=new Map,{small:r,large:o}=Nu(t);for(let s of r)for(let{header:i,content:a}of await Lu(e,s.map((c)=>c.path)))n.set(i.path,a);for(let s of o)n.set(s.path,(await Uu(e,s.path))?.content??null);return n}function ju(e,t){for(let n of t)ud(Sn(e,n),{force:!0})}async function Bu(e,t,n,r){if(n.size===0)return[];let o=new Map(r.map((c)=>[c.path,c])),s=[],i=[];for(let c of n){let u=o.get(c);if(u)i.push(u);else s.push(`${c} (not on the live site)`)}let a=await yd(e,i);for(let c of i){let u=null;try{u=ad(Sn(t,c.path))}catch{}let l=a.get(c.path);if(!u||!l||!u.equals(l))s.push(c.path)}return s.sort()}var Sd=5;async function Wu(e,t){let n=e.log??(()=>{}),r=t.now??(()=>new Date);xu();let o=await _n(e.url,{allowHttp:e.allowHttp}),s=await t.store.get(yn(o.homeUrl));if(!s)throw new w("not_connected",`wpsync isn't connected to ${o.homeUrl} yet.`,`Run: wpsync connect ${o.homeUrl}`);let i=new yt(o,s.username,s.applicationPassword);return i.withBridge(async()=>{let a=await i.bridge(pn,ae.info);Pd(a);let c=bt(e.dir??xn(o.homeUrl)),u=c.exists()?c.read():void 0,l=!u||u.setup==="pending",p=[];if(u&&!l&&u.homeUrl!==o.homeUrl)throw new w("project_mismatch",`${c.dir} is a copy of ${u.homeUrl}, not ${o.homeUrl}.`);let d=!l&&u?.ddevName||e.name||Ou(o.homeUrl),f=Iu(a,d),m=`https://${d}.ddev.site`,g={...u,homeUrl:o.homeUrl,setup:"ready",siteUrl:o.siteUrl,ddevName:d,localUrl:m,tablePrefix:a.database.tablePrefix};if(l)n(`Setting up ${c.dir}`),n(`  DDEV: PHP ${f.phpVersion}, ${f.webserver}, ${f.database.type} ${f.database.version}`),c.prepare(g,Au(f,o.homeUrl),a.site.name);else p.push(...zd(c,f));n("Listing the site's files\u2026");let y=await Zu(i),S=Cu(c.wpDir),I=c.trackedWpFiles();if(I.size&&!e.overwriteCode){let b=await Bu(i,c.wpDir,I,y);if(b.length){let A=b.slice(0,15).map((X)=>`  ${X}`);if(b.length>15)A.push(`  \u2026and ${G(b.length-15)} more`);throw new w("code_drift",`Code tracked in git differs on the live site, so pulling would overwrite your work:
${A.join(`
`)}`,"Compare the live copies with yours, then pull again with --overwrite-code to take live's, or keep yours and publish them.")}}let N=Du(y,S,e.overwriteCode?new Set:I),Z=r().toISOString().replace(/[:.]/g,"-"),z=qr(c.backupsDir,`pull-${Z}.sql.gz`);n("Downloading the database\u2026");let x=await Eu(i,z,(b,A,X)=>n(`  ${A+1}/${X} ${b}`));n(`  ${G(x.tables)} tables, ${G(x.rows)} rows, ${wt(x.sqlBytes)} of SQL`),Td(c),n(`Files: ${G(N.fetch.length)} to download, ${G(N.remove.length)} to delete, ${G(N.unchanged)} unchanged`);let k=0,P=await Fu(i,c.wpDir,N.fetch,(b,A)=>{if(b-k>=500)k=b,n(`  ${G(b)} files, ${wt(A)}`)});if(ju(c.wpDir,N.remove),P.vanished.length)p.push(`${G(P.vanished.length)} files disappeared from live during the pull.`);n("Starting DDEV and loading the database\u2026"),c.ddev(["start","-y"]),Ed(c,a.database.tablePrefix),c.syncFiles(),c.ddev(["import-db",`--file=${z}`]),n("Switching addresses to the local copy\u2026");for(let[b,A]of kd(o.siteUrl,o.homeUrl,m))c.wp("search-replace",b,A,"--all-tables-with-prefix","--precise","--quiet");return c.wp("cache","flush"),c.wp("rewrite","flush"),c.write({...g,lastPull:{at:r().toISOString(),tables:x.tables,rows:x.rows,files:y.length,bytes:P.bytes}}),vn(c.claudeMdPath,a.site.name,{status:`pulled from live ${r().toISOString().slice(0,16).replace("T"," ")} UTC`,homeUrl:o.homeUrl,localUrl:m,info:a,ddev:{phpVersion:f.phpVersion,webserver:f.webserver,database:`${f.database.type} ${f.database.version}`}}),{projectDir:c.dir,localUrl:m,firstPull:l,tables:x.tables,rows:x.rows,sqlBytes:x.sqlBytes,filesFetched:P.files,bytesFetched:P.bytes,filesDeleted:N.remove.length,filesUnchanged:N.unchanged,warnings:p}})}function Pd(e){if(e.site.multisite)throw new w("unsupported","This is a WordPress multisite network, which wpsync doesn't support yet.");let t=$d(e.paths.abspath,e.paths.contentDir);if(t.startsWith("..")||t.startsWith(xd))throw new w("unsupported","This site keeps wp-content outside its WordPress folder, which wpsync doesn't support yet.")}function zd(e,t){let n=Mu(e.ddevConfigPath,"utf8"),r=/php_version:\s*"?([\d.]+)"?/.exec(n)?.[1],o=/database:\s*\n\s*type:\s*(\w+)\s*\n\s*version:\s*"?([\d.]+)"?/.exec(n),s=[];if(r&&r!==t.phpVersion)s.push(`Live now runs PHP ${t.phpVersion}; the local copy uses ${r} (.ddev/config.yaml).`);if(o&&(o[1]!==t.database.type||o[2]!==t.database.version))s.push(`Live's database is now ${t.database.type} ${t.database.version}; the local copy uses ${o[1]} ${o[2]}.`);return s}function Ed(e,t){if(!/^[A-Za-z0-9_]+$/.test(t))throw new w("bad_prefix",`The site's table prefix "${t}" isn't usable.`);let n=qr(e.wpDir,"wp-config.php"),r=Mu(n,"utf8"),o=r.replace(/\$table_prefix\s*=\s*['"][^'"]*['"]\s*;/,`$table_prefix = '${t}';`);if(o!==r)bd(n,o)}function kd(e,t,n){let r=[],o=(s)=>{let i=new URL(s),a=i.pathname.replace(/\/+$/,"");for(let c of["https","http"]){let u=`${c}://${i.host}${a}`,l=`${n}${a}`;if(r.some(([p])=>p===u))continue;r.push([u,l]),r.push([u.replace(/\//g,"\\/"),l.replace(/\//g,"\\/")])}};return o(e),o(t),r.sort((s,i)=>i[0].length-s[0].length)}function Td(e){let t=vd(e.backupsDir).filter((n)=>/^pull-.*\.sql\.gz$/.test(n)).sort().reverse();for(let n of t.slice(Sd))wd(qr(e.backupsDir,n),{force:!0})}import{execFileSync as Vr}from"child_process";var Od=T({homeUrl:_(),siteUrl:_(),username:_(),applicationPassword:_(),applicationPasswordUuid:_(),applicationPasswordName:_(),connectedAt:_()});class zn{service;constructor(e="wpsync"){this.service=e}async get(e){let t;try{t=Vr("security",["find-generic-password","-s",this.service,"-a",e,"-w"],{encoding:"utf8",stdio:["ignore","pipe","ignore"]}).trim()}catch{return null}let n=Od.safeParse(Id(t));return n.success?n.data:null}async set(e,t){let n=Buffer.from(JSON.stringify(t)).toString("base64"),r=`add-generic-password -U -s ${Pn(this.service)} -a ${Pn(e)} -l ${Pn(`wpsync ${e}`)} -w ${Pn(n)}
`;if(Vr("security",["-i"],{input:r,stdio:["pipe","ignore","ignore"]}),(await this.get(e))?.applicationPasswordUuid!==t.applicationPasswordUuid)throw new w("keychain_failed","Couldn't save the site's key in the macOS Keychain.")}async delete(e){try{Vr("security",["delete-generic-password","-s",this.service,"-a",e],{stdio:"ignore"})}catch{}}}function Pn(e){if(/["\\\n]/.test(e))throw Error(`can't pass ${JSON.stringify(e)} to security -i`);return`"${e}"`}function Id(e){try{return JSON.parse(Buffer.from(e,"base64").toString("utf8"))}catch{return}}var Kr="0.1.0",Hu=`wpsync ${Kr}

Usage:
  wpsync init <site-url> [--dir <folder>]
      Make the site's project folder (default ~/wp-sites/<host>) with its CLAUDE.md
      and Claude Code permissions, ready for a session started in it. Contacts nothing.

  wpsync connect <site-url> [--user <username>]
      Sign in once (a macOS dialog asks for the password), create wpsync's own
      Application Password, and install the wpsync bridge, switched off.

  wpsync pull <site-url> [--dir <folder>] [--name <ddev-name>] [--overwrite-code]
      Copy the live site into a local DDEV project (default folder:
      ~/wp-sites/<host>). The first pull creates the project; later
      pulls download only what changed. Code you track in git is never
      overwritten unless you add --overwrite-code. The live site is only read.

  wpsync update-rules [--dir <folder>]
      Refresh the WordPress rules in a project's CLAUDE.md from this wpsync.

  wpsync --version
  wpsync help

For local development sites only, --allow-http accepts an http:// address.
`,Ad=new Set(["user","dir","name"]);function En(e,t){let n=e.flags.get(t);return typeof n==="string"?n:void 0}function Rd(e){let t=[],n=new Map;for(let r=0;r<e.length;r++){let o=e[r];if(!o.startsWith("--")){t.push(o);continue}let[s,i]=o.slice(2).split("=",2),a=e[r+1];if(i!==void 0)n.set(s,i);else if(Ad.has(s)&&a&&!a.startsWith("--"))n.set(s,e[++r]);else n.set(s,!0)}return{command:t.shift(),positional:t,flags:n}}async function Zd(e){let t=e.positional[0];if(!t)throw new Ve("connect needs the site's address, e.g. wpsync connect https://example.com");let n=e.flags.get("user"),r=await pu({url:t,username:typeof n==="string"?n:void 0,allowHttp:e.flags.has("allow-http"),log:(i)=>console.log(i)},{credentials:fu,store:new zn}),{info:o}=r,s=o.plugins.filter((i)=>i.active&&i.file!=="wpsync-bridge/wpsync-bridge.php").length;if(console.log(`
Connected to ${o.site.name} (${r.site.homeUrl})
  Signed in as   ${r.connection.username}; key "${r.connection.applicationPasswordName}" saved in the Keychain
  Bridge         ${r.bridge==="uploaded"?"installed":"already installed"}, version ${o.bridge.version}, switched off
  WordPress      ${o.wordpress.version}${o.site.multisite?" (multisite: not supported yet)":""}
  PHP            ${o.php.version}
  Database       ${o.database.engine} ${o.database.version}
  Web server     ${o.server.software??"unknown"}
  Theme          ${o.theme.name} ${o.theme.version}${o.theme.template!==o.theme.stylesheet?` (child of ${o.theme.template})`:""}
  Plugins        ${s} active of ${o.plugins.length-1}`),!o.capabilities.fileModsAllowed)console.log(`
Warning: this site doesn't allow file changes (DISALLOW_FILE_MODS). Publishing to it won't work.`)}async function Cd(e){let t=e.positional[0];if(!t)throw new Ve("pull needs the site's address, e.g. wpsync pull https://example.com");let n=await Wu({url:t,dir:En(e,"dir"),name:En(e,"name"),allowHttp:e.flags.has("allow-http"),overwriteCode:e.flags.has("overwrite-code"),log:(r)=>console.log(r)},{store:new zn});console.log(`
${n.firstPull?"Pulled":"Refreshed"} the local copy
  Folder     ${n.projectDir}
  Local URL  ${n.localUrl}
  Database   ${G(n.tables)} tables, ${G(n.rows)} rows
  Files      ${G(n.filesFetched)} downloaded (${wt(n.bytesFetched)}), ${G(n.filesDeleted)} deleted, ${G(n.filesUnchanged)} unchanged`);for(let r of n.warnings)console.log(`
Note: ${r}`)}function Dd(e){let t=e.positional[0];if(!t)throw new Ve("init needs the site's address, e.g. wpsync init https://example.com");let n=Su(t,{dir:En(e,"dir"),allowHttp:e.flags.has("allow-http")});console.log(`${n.created?"Created":"Already set up"}: ${n.project.dir}
  Site: ${n.homeUrl} (setup pending: nothing has been pulled yet)

Next: start a new Claude Code session in that folder, so its CLAUDE.md and permissions load.
  Desktop app: start a new session on the folder; optionally set the permission mode to
               Bypass permissions.
  Terminal:    cd "${n.project.dir}" && claude
               (or claude --dangerously-skip-permissions to skip prompts)
Then say "continue wp-dev".`)}function Nd(e){let t=Pu(En(e,"dir"));console.log(t.changed?`Updated the rules in ${t.path}`:`The rules in ${t.path} are already current.`)}class Ve extends Error{}async function Ld(e){let t=Rd(e);try{switch(t.command){case"connect":return await Zd(t),0;case"pull":return await Cd(t),0;case"init":return Dd(t),0;case"update-rules":return Nd(t),0;case void 0:case"help":return console.log(Hu),0;default:if(t.flags.has("version"))return console.log(`wpsync ${Kr} (bridge ${je})`),0;throw new Ve(`Unknown command "${t.command}".`)}}catch(n){if(n instanceof Ve)return console.error(`${n.message}

${Hu}`),2;if(n instanceof w)return console.error(`
${n.message}${n.hint?`
${n.hint}`:""}`),1;throw n}}var Gu=process.argv.slice(2);if(Gu[0]==="--version")console.log(`wpsync ${Kr} (bridge ${je})`);else process.exitCode=await Ld(Gu);
