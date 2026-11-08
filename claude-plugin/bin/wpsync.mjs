#!/usr/bin/env bun
// @bun
var Sl=Object.defineProperty;var El=(e)=>e;function kl(e,t){this[e]=El.bind(null,t)}var yo=(e,t)=>{for(var n in t)Sl(e,n,{get:t[n],enumerable:!0,configurable:!0,set:kl.bind(t,n)})};var bn={};yo(bn,{ZodISODate:()=>Pt,ZodISODateTime:()=>xt,ZodISODuration:()=>Et,ZodISOTime:()=>St,date:()=>kf,datetime:()=>Ef,duration:()=>Tf,time:()=>zf});var zt={};yo(zt,{bigint:()=>Of,boolean:()=>Cf,date:()=>If,number:()=>Af,string:()=>Rf});var Ge="0.1.0",Hn="wpsync/v1",qn="wpsync-bridge",$o="wpsync-bridge/wpsync-bridge.php";var U={info:"/info",dbTables:"/db/tables",dbRows:"/db/rows",filesList:"/files/list",filesFetch:"/files/fetch",filesRead:"/files/read",changes:"/changes",stageBegin:"/stage/begin",stageChunk:"/stage/chunk",stageApply:"/stage/apply",rollback:"/rollback",finalize:"/finalize"},wo=["wp-config.php",".maintenance",".git",".svn","error_log","wp-content/plugins/wpsync-bridge","wp-content/uploads/wpsync-*","wp-content/cache","wp-content/upgrade","wp-content/upgrade-temp-backup","wp-content/debug.log","wp-content/ai1wm-backups","wp-content/updraft","wp-content/backups-dup-lite","wp-content/backups-dup-pro","wp-content/wpvividbackups","wp-content/wflogs"],Yn=[".htaccess",".user.ini","php.ini","web.config",".well-known","wp-content/mu-plugins","wp-content/object-cache.php","wp-content/advanced-cache.php","wp-content/db.php","wp-content/sunrise.php"],bo=4000000;var Ot=8000000,vo=500;function ft(e){let t=Object.values(e).filter((r)=>typeof r==="number");return Object.entries(e).filter(([r,o])=>t.indexOf(+r)===-1).map(([r,o])=>o)}function Jn(e,t="|"){return e.map((n)=>Xn(n)).join(t)}function dt(e,t){if(typeof t==="bigint")return t.toString();return t}class xo{constructor(e){this._getter=e,this._value=void 0}get value(){let e=this._getter;if(e!==void 0)this._value=e(),this._getter=void 0;return this._value}}function It(e){return new xo(e)}function Po(e){return e===null||e===void 0}function Nt(e){let t=e.startsWith("^")?1:0,n=e.endsWith("$")?e.length-1:e.length;return e.slice(t,n)}function So(e,t){let n=e/t,r=Math.round(n),o=4*Number.EPSILON*Math.max(Math.abs(n),1);if(Math.abs(n-r)<o)return 0;return n-r}function ue(e,t,n){Object.defineProperty(e,t,{value:n,writable:!0,enumerable:!0,configurable:!0})}function Dt(e){let t=Object.getOwnPropertyDescriptor(e,"shape");return t?.get?t.get.raw:t?.value}function Pe(e){return Dt(e._zod.def)??e._zod.def.shape}function Eo(e,t,n){Object.defineProperty(e,t,{get(){let r=n();return ue(this,t,r),r},enumerable:!0,configurable:!0})}function ko(e,t,n){if(t in e)ue(e,t,n);else e[t]=n}function Ze(e,t,n,r){let o=Pe(t);for(let s of n){let i=Object.getOwnPropertyDescriptor(o,s);if(!i.enumerable)continue;if(i.get)Eo(e,s,()=>{let a=t._zod.def.shape[s];return r?r(a,s):a});else ko(e,s,r?r(i.value,s):i.value)}}function zl(e,t){for(let n of Reflect.ownKeys(t)){let r=Object.getOwnPropertyDescriptor(t,n);if(!r.enumerable)continue;if(r.get)Eo(e,n,()=>t[n]);else ko(e,n,r.value)}}function te(...e){let t={};for(let n of e){let r=Object.getOwnPropertyDescriptors(n);Object.assign(t,r)}return Object.defineProperties({},t)}function zo(e){return JSON.stringify(e)}function To(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/[\s_-]+/g,"-").replace(/^-+|-+$/g,"")}var Vn="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function pt(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)}var Ro=It(()=>{if(Q.jitless)return!1;if(typeof navigator<"u"&&navigator?.userAgent?.includes("Cloudflare"))return!1;try{return new Function(""),!0}catch(e){return!1}});function We(e){if(pt(e)===!1)return!1;let t=e.constructor;if(t===void 0)return!0;if(typeof t!=="function")return!0;let n=t.prototype;if(pt(n)===!1)return!1;if(Object.prototype.hasOwnProperty.call(n,"isPrototypeOf")===!1)return!1;return!0}function Kn(e){if(We(e))return{...e};if(Array.isArray(e))return[...e];if(e instanceof Map)return new Map(e);if(e instanceof Set)return new Set(e);return e}var Ao=new Set(["string","number","symbol"]);function Oe(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function me(e,t,n){let r=new e._zod.constr(t??e._zod.def);if(!t||n?.parent)r._zod.parent=e;return r}function b(e){let t=e;if(!t)return{};if(typeof t==="string")return{error:()=>t};if(t?.message!==void 0){if(t?.error!==void 0)throw Error("Cannot specify both `message` and `error` params");t.error=t.message}if(delete t.message,typeof t.error==="string")return{...t,error:()=>t.error};return t}function Xn(e){if(typeof e==="bigint")return e.toString()+"n";if(typeof e==="string")return`"${e}"`;return`${e}`}function Co(e){return Object.keys(e).filter((t)=>e[t]._zod.optin!==void 0&&e[t]._zod.optout==="optional")}var Zt=(()=>({safeint:[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-340282346638528860000000000000000000000,340282346638528860000000000000000000000],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]}))(),Qn={int64:[BigInt("-9223372036854775808"),BigInt("9223372036854775807")],uint64:[BigInt(0),BigInt("18446744073709551615")]};function Tl(e,t){let n=e._zod.def,r=n.checks;if(r&&r.length>0)throw Error(".pick() cannot be used on object schemas containing refinements");let s={};return Ze(s,e,Wt(e,t)),me(e,te(n,{shape:s,checks:[]}))}function Wt(e,t){let n=Pe(e),r=[];for(let o of Reflect.ownKeys(t)){if(!Object.getOwnPropertyDescriptor(n,o)?.enumerable)throw Error(`Unrecognized key: "${String(o)}"`);if(t[o])r.push(o)}return r}function Rl(e,t){let n=e._zod.def,r=n.checks;if(r&&r.length>0)throw Error(".omit() cannot be used on object schemas containing refinements");let s=new Set(Wt(e,t)),i={};return Ze(i,e,Reflect.ownKeys(Pe(e)).filter((a)=>!s.has(a))),me(e,te(n,{shape:i,checks:[]}))}function Al(e,t){if(!We(t))throw Error("Invalid input to extend: expected a plain object");let n=e._zod.def.checks;if(n&&n.length>0){let o=Pe(e);for(let s of Reflect.ownKeys(t))if(Object.getOwnPropertyDescriptor(o,s)!==void 0)throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.")}return me(e,te(e._zod.def,{shape:Oo(e,t)}))}function Oo(e,t){let n={};return Ze(n,e,Reflect.ownKeys(Pe(e))),zl(n,t),n}function Cl(e,t){if(!We(t))throw Error("Invalid input to safeExtend: expected a plain object");return me(e,te(e._zod.def,{shape:Oo(e,t)}))}function Ol(e,t){if(!t?._zod?.def)throw Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");if(e._zod.def.checks?.length)throw Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");let n={};Ze(n,e,Reflect.ownKeys(Pe(e))),Ze(n,t,Reflect.ownKeys(Pe(t)));let r=te(e._zod.def,{shape:n,get catchall(){return t._zod.def.catchall},checks:t._zod.def.checks??[]});return me(e,r)}function Io(e,t,n,r="partial"){let s=t._zod.def.checks;if(s&&s.length>0)throw Error(`.${r}() cannot be used on object schemas containing refinements`);let a=n?new Set(Wt(t,n)):void 0,c={};return Ze(c,t,Reflect.ownKeys(Pe(t)),e&&((u,l)=>a&&!a.has(l)?u:new e({type:"optional",innerType:u}))),me(t,te(t._zod.def,{shape:c,checks:[]}))}function Il(e,t,n){let r=n?new Set(Wt(t,n)):void 0,o={};return Ze(o,t,Reflect.ownKeys(Pe(t)),(s,i)=>r&&!r.has(i)?s:new e({type:"nonoptional",innerType:s})),me(t,te(t._zod.def,{shape:o}))}function ge(e,t=0){if(e.aborted===!0)return!0;for(let n=t;n<e.issues.length;n++)if(e.issues[n]?.continue!==!0)return!0;return!1}function No(e,t=0){if(e.aborted===!0)return!0;for(let n=t;n<e.issues.length;n++)if(e.issues[n]?.continue===!1)return!0;return!1}function Ie(e,t){return t.map((n)=>{var r;return(r=n).path??(r.path=[]),n.path.unshift(e),n})}function lt(e){return typeof e==="string"?e:e?.message}function er(e){let t=[];for(let n of e??[]){let r=n._zod.def;if(!/_(length|size)$|_equals$/.test(r.check))break;let o=r.maximum??r.length??r.size;if(o>=0)t.push([o,n])}return t}function Lt(e,t,n){var r;for(let o=t;o<e.length;o++)(r=e[o]).schema??(r.schema=n)}function _e(e,t,n){var r;let o=e.inst?._zod?.traits;if(o?.has("$ZodType"))if(o.has("$ZodCheck"))(r=e).schema??(r.schema=e.inst);else e.schema=e.inst;let s=e.schema!==e.inst?e.schema?._zod.def?.error:void 0,i=e.message?e.message:lt(e.inst?._zod.def?.error?.(e))??lt(s?.(e))??lt(t?.error?.(e))??lt(n.customError?.(e))??lt(n.localeError?.(e))??"Invalid input",a={};for(let c of Object.keys(e)){if(c==="inst"||c==="schema"||c==="continue"||c==="input"||c==="__proto__")continue;a[c]=e[c]}if(a.path??(a.path=[]),a.message=i,t?.reportInput)a.input=e.input;return a}var Nl=/[\uD800-\uDBFF]/;function Ft(e){let t=e.length;if(!Nl.test(e))return t;let n=t;for(let r=0;r<t-1;r++)if((e.charCodeAt(r)&64512)===55296&&(e.charCodeAt(r+1)&64512)===56320)n--,r++;return n}function Ut(e){if(Array.isArray(e))return"array";if(typeof e==="string")return"string";return"unknown"}function Do(e){let t=typeof e;switch(t){case"number":return Number.isNaN(e)?"nan":"number";case"object":{if(e===null)return"null";if(Array.isArray(e))return"array";let n=e;if(n&&Object.getPrototypeOf(n)!==Object.prototype&&"constructor"in n&&n.constructor)return n.constructor.name}}return t}function Le(...e){let[t,n,r]=e;if(typeof t==="string")return{message:t,code:"custom",input:n,inst:r};return{...t}}function Zo(e,t){for(let n in t){let r=Object.getOwnPropertyDescriptor(t,n);if(r.get)Object.defineProperty(e,n,{...r,enumerable:!1});else Dl(e,n,r.value)}}function Se(e,t,n,r=!0){return Object.defineProperty(e,t,{configurable:!0,writable:!0,enumerable:r,value:n}),n}function Bt(e,t,n){return Se(e,t,n,!1)}function jt(e,t){for(let n in e){let r=e[n];Object.defineProperty(t,n,{configurable:!0,enumerable:!0,get(){return Se(this,n,r(this))},set(o){Se(this,n,o)}})}return t}function Dl(e,t,n){Object.defineProperty(e,t,{configurable:!0,get(){return this==null?n:Se(this,t,n.bind(this))},set(r){Se(this,t,r)}})}function Zl(e,t){let n=Object.getPrototypeOf(e);return t in n?void 0:n}var Gn,Ce=!1,Wl={configurable:!0,get(){Ce=!0;return}};function C(e,t,n){let r=Object.getPrototypeOf(e._zod);if(t in r&&Gn!==e._zod){Gn=void 0;return}Gn=e._zod,Object.defineProperty(r,t,{configurable:!0,get(){Object.defineProperty(this,t,Wl);let o=Ce;Ce=!1;try{let s=n(this);if(Ce)delete this[t];else Object.defineProperty(this,t,{configurable:!0,writable:!0,value:s});return Ce=Ce||o,s}catch(s){throw delete this[t],Ce=Ce||o,s}},set(o){Object.defineProperty(this,t,{configurable:!0,writable:!0,value:o})}})}function Ll(e,t,n,r){let o=Zl(e,t);if(!o)return;Object.defineProperty(o,t,{configurable:!0,get(){let s={configurable:!0,writable:!0,enumerable:r,value:void 0};return Object.defineProperty(this,t,s),s.value=n(this),Object.defineProperty(this,t,s),s.value},set(s){Object.defineProperty(this,t,{configurable:!0,writable:!0,enumerable:r,value:s})}})}var Fl="~constantCatch";function Wo(e){let t=()=>e;return t[Fl]=!0,t}var Lo;var tr={value:void 0,enumerable:!1},Fo="captureStackTrace"in Error?Error:null;function Ul(e){let t=Fo;if(t){let n=t.stackTraceLimit;if(typeof n==="number"){try{t.stackTraceLimit=0}catch{return Fo=null,new e}try{return new e}finally{t.stackTraceLimit=n}}}return new e}function m(e,t,n,r){let o={};function s(f){this.def=f,this.constr=p,this.traits=new Set}s.prototype=o;let i=n,a=i&&new WeakSet;function c(f,d){if(!f._zod){tr.value=new s(d);try{Object.defineProperty(f,"_zod",tr)}finally{tr.value=void 0}}else if(f._zod.traits.has(e))return;if(f._zod.traits.add(e),t(f,d),a){let _=Object.getPrototypeOf(f),w=f._zod.constr.prototype,v=_;while(v&&v!==w)v=Object.getPrototypeOf(v);let A=v??_;if(!a.has(A))a.add(A),Zo(A,i)}let h=p.prototype;for(let _ in h){if(!Object.prototype.hasOwnProperty.call(h,_))continue;if(!(_ in f))f[_]=h[_].bind(f)}}let u=r?.Parent??Object;class l extends u{}Object.defineProperty(l,"name",{value:e});function p(f){let d=r?.Parent?Ul(l):this;c(d,f);let h=d._zod.deferred;if(h){for(let w of h)w();d._zod.deferred=void 0}let _=globalThis.__zod_globalConfig?.postProcessor;if(_)_(d);return d}return Object.defineProperty(p,"init",{value:c}),Object.defineProperty(p,Symbol.hasInstance,{value:(f)=>{if(r?.Parent&&f instanceof r.Parent)return!0;return f?._zod?.traits?.has(e)}}),Object.defineProperty(p,"name",{value:e}),p}class ye extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}}class ht extends Error{constructor(e){super(`Encountered unidirectional transform during encode: ${e}`);this.name="ZodEncodeError"}}(Lo=globalThis).__zod_globalConfig??(Lo.__zod_globalConfig={});var Q=globalThis.__zod_globalConfig;function ne(e){if(e)Object.assign(Q,e);return Q}function Bl(){let e=this._zod;return e.message??(e.message=JSON.stringify(e.def,dt,2)),e.message}function jl(e){this._zod.message=e}var Ml={get:Bl,set:jl,enumerable:!0,configurable:!0},rr={value:void 0,enumerable:!1},Uo=new WeakSet([Object.prototype,Error.prototype]),Bo=(e,t)=>{e.name="$ZodError",rr.value=t,Object.defineProperty(e,"issues",rr),rr.value=void 0,Object.defineProperty(e,"message",Ml);let n=Object.getPrototypeOf(e);if(!Uo.has(n))Uo.add(n),Object.defineProperty(n,"toString",{configurable:!0,enumerable:!1,get(){let r=()=>this.message;return Object.defineProperty(this,"toString",{value:r,configurable:!0,writable:!0}),r},set(r){Object.defineProperty(this,"toString",{value:r,configurable:!0,writable:!0})}})},jo=m("$ZodError",Bo),Fh=m("$ZodError",Bo,void 0,{Parent:Error});function Hl(e,t,n){if(!Object.prototype.hasOwnProperty.call(e,t))if(t==="__proto__")Object.defineProperty(e,t,{value:n(),writable:!0,enumerable:!0,configurable:!0});else e[t]=n();return e[t]}function Mo(e,t=(n)=>n.message){let n={},r=[];for(let o of e.issues)if(o.path.length>0)Hl(n,o.path[0],()=>[]).push(t(o));else r.push(t(o));return{formErrors:r,fieldErrors:n}}function Ho(e,t=(n)=>n.message){let n={_errors:[]},r=(o,s=[])=>{for(let i of o.issues)if(i.code==="invalid_union"&&i.errors.length)i.errors.map((a)=>r({issues:a},[...s,...i.path]));else if(i.code==="invalid_key")r({issues:i.issues},[...s,...i.path]);else if(i.code==="invalid_element")r({issues:i.issues},[...s,...i.path]);else{let a=[...s,...i.path];if(a.length===0)n._errors.push(t(i));else{let c=n,u=0;while(u<a.length){let l=a[u],p=u===a.length-1;if(l==="_errors"){if(p)c._errors.push(t(i));u++;continue}if(!Object.prototype.hasOwnProperty.call(c,l))Object.defineProperty(c,l,{value:{_errors:[]},enumerable:!0,writable:!0,configurable:!0});let f=c[l];if(p)f._errors.push(t(i));c=f,u++}}}};return r(e),n}function Mt(e,t){return{callee:t?.callee??e,Err:t?.Err}}var Ht=(e)=>{let t=(n,r,o,s)=>{let i=o?{...o,async:!1}:{async:!1},a=n._zod.run({value:r,issues:[]},i);if(a instanceof Promise)throw new ye;if(a.issues.length){let c=new(s?.Err??e)(a.issues.map((u)=>_e(u,i,ne())));throw Vn(c,s?.callee??t),c}return a.value};return t};var qt=(e)=>{let t=async(n,r,o,s)=>{let i=o?{...o,async:!0}:{async:!0},a=n._zod.run({value:r,issues:[]},i);if(a instanceof Promise)a=await a;if(a.issues.length){let c=new(s?.Err??e)(a.issues.map((u)=>_e(u,i,ne())));throw Vn(c,s?.callee??t),c}return a.value};return t};var Yt=(e)=>(t,n,r)=>{let o=r?{...r,async:!1}:{async:!1},s=t._zod.run({value:n,issues:[]},o);if(s instanceof Promise)throw new ye;return s.issues.length?qo(e,s.issues,o):{success:!0,data:s.value}};function qo(e,t,n){let r;return{success:!1,get error(){if(!r)r=new e(t.map((o)=>_e(o,n,ne()))),t=void 0,n=void 0;return r},set error(o){r=o,t=void 0,n=void 0}}}var Gt=(e)=>async(t,n,r)=>{let o=r?{...r,async:!0}:{async:!0},s=t._zod.run({value:n,issues:[]},o);if(s instanceof Promise)s=await s;return s.issues.length?qo(e,s.issues,o):{success:!0,data:s.value}};var ql=Symbol.for("zod.compile.invalid"),Yl=Symbol.for("zod.compile.fallback"),or=(e,t,n)=>{let r=e._zod.bag.validator;if(r!==void 0){if(r(t)!==ql)return!0;if(r.definite===!0&&n===void 0)return!1}return Gl(e,t,n)};function Gl(e,t,n){let r=n?{...n,async:!1,abortEarly:!0}:{async:!1,abortEarly:!0},o=e._zod.bag.fallbackRun,s;if(o)r[Yl]=!0,s=o({value:t,issues:[]},r);else s=e._zod.run({value:t,issues:[]},r);if(s instanceof Promise)throw new ye;return s.issues.length===0}var sr=async(e,t,n)=>{let r=n?{...n,async:!0,abortEarly:!0}:{async:!0,abortEarly:!0},o=e._zod.run({value:t,issues:[]},r);if(o instanceof Promise)o=await o;return o.issues.length===0},Yo=(e)=>{let t=Ht(e),n=(r,o,s,i)=>{let a=s?{...s,direction:"backward"}:{direction:"backward"};return t(r,o,a,Mt(n,i))};return n};var Go=(e)=>{let t=Ht(e),n=(r,o,s,i)=>t(r,o,s,Mt(n,i));return n};var Jo=(e)=>{let t=qt(e),n=async(r,o,s,i)=>{let a=s?{...s,direction:"backward"}:{direction:"backward"};return await t(r,o,a,Mt(n,i))};return n};var Vo=(e)=>{let t=qt(e),n=async(r,o,s,i)=>await t(r,o,s,Mt(n,i));return n};var Ko=(e)=>(t,n,r)=>{let o=r?{...r,direction:"backward"}:{direction:"backward"};return Yt(e)(t,n,o)};var Xo=(e)=>(t,n,r)=>Yt(e)(t,n,r);var Qo=(e)=>async(t,n,r)=>{let o=r?{...r,direction:"backward"}:{direction:"backward"};return Gt(e)(t,n,o)};var es=(e)=>async(t,n,r)=>Gt(e)(t,n,r);var ts=/^[cC][0-9a-z]{6,}$/,ns=/^[0-9a-z]+$/,rs=/^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/,os=/^[0-9a-vA-V]{20}$/,ss=/^[A-Za-z0-9]{27}$/,is=/^[a-zA-Z0-9_-]{21}$/;function as(e){return new RegExp(`^[a-zA-Z0-9_-]{${e}}$`)}var cs=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;var us=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,ar=(e)=>{if(!e)return/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`)};var ls=/^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;var Jl="^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";function ps(){return new RegExp(Jl,"u")}var fs=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,ds=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;var hs=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,ms=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,gs=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,_s=/^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;var ys=/^https?$/,$s=/^\+[1-9]\d{6,14}$/;var ws="(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";function Vl(e){return new RegExp(`^${e}$`)}var bs=Vl(ws);function ir(e){return typeof e.precision==="number"?e.precision===-1?"(?:[01]\\d|2[0-3]):[0-5]\\d":e.precision===0?"(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d":`(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d\\.\\d{${e.precision}}`:e.seconds?"(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:\\.\\d+)?":"(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(?:\\.\\d+)?)?"}function vs(e){return new RegExp(`^${ir(e)}$`)}function xs(e){let t=["Z"];if(e.offset)t.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");let n=`${ir({precision:e.precision,seconds:!0})}(?:${t.join("|")})`,r=e.local?`${n}|${ir({precision:e.precision})}`:n;return new RegExp(`^${ws}T(?:${r})$`)}var Ps=/^[\s\S]{0,}$/;var Ss=/^-?\d+n?$/,cr=/^-?\d+$/,mt=/^-?\d+(?:\.\d+)?$/,Es=/^(?:true|false)$/i;var ks=/^[^A-Z]*$/,zs=/^[^a-z]*$/;var H=m("$ZodCheck",(e,t)=>{var n;e._zod??(e._zod={}),e._zod.def=t,(n=e._zod).onattach??(n.onattach=[])});var ur=(e)=>{let t=e.value;return!Po(t)&&t.length!==void 0},Jt={number:"number",bigint:"bigint",object:"date"},lr=m("$ZodCheckLessThan",(e,t)=>{H.init(e,t);let n=Jt[typeof t.value];e._zod.check=(r)=>{if(t.inclusive?r.value<=t.value:r.value<t.value)return;r.issues.push({origin:Jt[typeof r.value]??n,code:"too_big",maximum:typeof t.value==="object"?t.value.getTime():t.value,input:r.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),pr=m("$ZodCheckGreaterThan",(e,t)=>{H.init(e,t);let n=Jt[typeof t.value];e._zod.check=(r)=>{if(t.inclusive?r.value>=t.value:r.value>t.value)return;r.issues.push({origin:Jt[typeof r.value]??n,code:"too_small",minimum:typeof t.value==="object"?t.value.getTime():t.value,input:r.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),Ts=m("$ZodCheckMultipleOf",(e,t)=>{H.init(e,t),e._zod.check=(n)=>{if(typeof n.value!==typeof t.value)throw Error("Cannot mix number and bigint in multiple_of check.");if(typeof n.value==="bigint"?t.value!==BigInt(0)&&n.value%t.value===BigInt(0):So(n.value,t.value)===0)return;n.issues.push({origin:typeof n.value,code:"not_multiple_of",divisor:t.value,input:n.value,inst:e,continue:!t.abort})}}),Rs=m("$ZodCheckNumberFormat",(e,t)=>{H.init(e,t),t.format=t.format||"float64";let n=t.format?.includes("int"),r=n?"int":"number",[o,s]=Zt[t.format];e._zod.check=(i)=>{let a=i.value;if(n){if(!Number.isInteger(a)){i.issues.push({expected:r,format:t.format,code:"invalid_type",continue:!1,input:a,inst:e});return}if(!Number.isSafeInteger(a)){if(a>0)i.issues.push({input:a,code:"too_big",maximum:Number.MAX_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:r,inclusive:!0,continue:!t.abort});else i.issues.push({input:a,code:"too_small",minimum:Number.MIN_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:r,inclusive:!0,continue:!t.abort});return}}if(a<o)i.issues.push({origin:"number",input:a,code:"too_small",minimum:o,inclusive:!0,inst:e,continue:!t.abort});if(a>s)i.issues.push({origin:"number",input:a,code:"too_big",maximum:s,inclusive:!0,inst:e,continue:!t.abort})}});var As=m("$ZodCheckMaxLength",(e,t)=>{var n;H.init(e,t),(n=e._zod.def).when??(n.when=ur),e._zod.check=(r)=>{let o=r.value,s=o.length;if((typeof o==="string"&&s>t.maximum?Ft(o):s)<=t.maximum)return;let a=Ut(o);r.issues.push({origin:a,code:"too_big",maximum:t.maximum,inclusive:!0,input:o,inst:e,continue:!t.abort})}}),Cs=m("$ZodCheckMinLength",(e,t)=>{var n;H.init(e,t),(n=e._zod.def).when??(n.when=ur),e._zod.check=(r)=>{let o=r.value,s=o.length;if((typeof o==="string"&&s>=t.minimum&&s<t.minimum*2?Ft(o):s)>=t.minimum)return;let a=Ut(o);r.issues.push({origin:a,code:"too_small",minimum:t.minimum,inclusive:!0,input:o,inst:e,continue:!t.abort})}}),Os=m("$ZodCheckLengthEquals",(e,t)=>{var n;H.init(e,t),(n=e._zod.def).when??(n.when=ur),e._zod.check=(r)=>{let o=r.value,s=o.length,i=typeof o==="string"&&s>=t.length&&s<=t.length*2?Ft(o):s;if(i===t.length)return;let a=Ut(o),c=i>t.length;r.issues.push({origin:a,...c?{code:"too_big",maximum:t.length}:{code:"too_small",minimum:t.length},inclusive:!0,exact:!0,input:r.value,inst:e,continue:!t.abort})}}),_t=m("$ZodCheckStringFormat",(e,t)=>{var n,r;if(H.init(e,t),t.pattern)(n=e._zod).check??(n.check=(o)=>{if(t.pattern.lastIndex=0,t.pattern.test(o.value))return;o.issues.push({origin:"string",code:"invalid_format",format:t.format,input:o.value,...t.pattern?{pattern:t.pattern.toString()}:{},inst:e,continue:!t.abort})});else(r=e._zod).check??(r.check=()=>{})}),Is=m("$ZodCheckRegex",(e,t)=>{_t.init(e,t),e._zod.check=(n)=>{if(t.pattern.lastIndex=0,t.pattern.test(n.value))return;n.issues.push({origin:"string",code:"invalid_format",format:"regex",input:n.value,pattern:t.pattern.toString(),inst:e,continue:!t.abort})}}),Ns=m("$ZodCheckLowerCase",(e,t)=>{t.pattern??(t.pattern=ks),_t.init(e,t)}),Ds=m("$ZodCheckUpperCase",(e,t)=>{t.pattern??(t.pattern=zs),_t.init(e,t)}),Zs=m("$ZodCheckIncludes",(e,t)=>{H.init(e,t);let n=Oe(t.includes),r=new RegExp(typeof t.position==="number"?`^.{${t.position},}${n}`:n);t.pattern=r,e._zod.check=(o)=>{if(o.value.includes(t.includes,t.position))return;o.issues.push({origin:"string",code:"invalid_format",format:"includes",includes:t.includes,input:o.value,inst:e,continue:!t.abort})}}),Ws=m("$ZodCheckStartsWith",(e,t)=>{H.init(e,t);let n=new RegExp(`^${Oe(t.prefix)}.*`);t.pattern??(t.pattern=n),e._zod.check=(r)=>{if(r.value.startsWith(t.prefix))return;r.issues.push({origin:"string",code:"invalid_format",format:"starts_with",prefix:t.prefix,input:r.value,inst:e,continue:!t.abort})}}),Ls=m("$ZodCheckEndsWith",(e,t)=>{H.init(e,t);let n=new RegExp(`.*${Oe(t.suffix)}$`);t.pattern??(t.pattern=n),e._zod.check=(r)=>{if(r.value.endsWith(t.suffix))return;r.issues.push({origin:"string",code:"invalid_format",format:"ends_with",suffix:t.suffix,input:r.value,inst:e,continue:!t.abort})}});var Fs=m("$ZodCheckOverwrite",(e,t)=>{H.init(e,t),e._zod.check=(n)=>{n.value=t.tx(n.value)}});class fr{constructor(e=[],t={}){this.content=[],this.indent=0,this.args=e,this.closed=t}indented(e){this.indent+=1;try{e(this)}finally{this.indent-=1}}write(e){if(typeof e==="function"){e(this,{execution:"sync"}),e(this,{execution:"async"});return}let n=e.split(`
`).filter((s)=>s),r=Math.min(...n.map((s)=>s.length-s.trimStart().length)),o=n.map((s)=>s.slice(r)).map((s)=>" ".repeat(this.indent*2)+s);for(let s of o)this.content.push(s)}compile(){let e=Function,t=this?.content??[""];return new e(...Object.keys(this.closed),`return function (${this.args.join(", ")}) {
${t.join(`
`)}
};`)(...Object.values(this.closed))}}var Bs={major:4,minor:6,patch:7};var N=m("$ZodType",(e,t)=>{var n;e??(e={}),e._zod.def=t,e._zod.bag=e._zod.bag||{},e._zod.version=Bs;let r=e._zod.def.checks,o=e._zod.traits.has("$ZodCheck")?[e,...r??[]]:r?.length?[...r]:[];for(let s of o)for(let i of s._zod.onattach)i(e);if(o.length===0)(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let s=(a,c,u)=>{if(a.memo)return a;let l=ge(a),p;for(let f of c){if(f._zod.def.when){if(No(a))continue;if(!f._zod.def.when(a))continue}else if(l)continue;let d=a.issues.length,h=f._zod.check(a);if(h instanceof Promise&&u?.async===!1)throw new ye;if(p||h instanceof Promise)p=(p??Promise.resolve()).then(async()=>{if(await h,a.issues.length===d)return;if(Lt(a.issues,d,e),!l)l=ge(a,d)});else{if(a.issues.length===d)continue;if(Lt(a.issues,d,e),!l)l=ge(a,d)}}if(p)return p.then(()=>a);return a},i=(a,c,u)=>{if(ge(a))return a.aborted=!0,a;let l=s(c,o,u);if(l instanceof Promise){if(u.async===!1)throw new ye;return l.then((p)=>e._zod.parse(p,u))}return e._zod.parse(l,u)};e._zod.run=(a,c)=>{if(c.skipChecks)return e._zod.parse(a,c);if(c.direction==="backward"){let l=e._zod.parse({value:a.value,issues:[]},{...c,skipChecks:!0});if(l instanceof Promise)return l.then((p)=>i(p,a,c));return i(l,a,c)}let u=e._zod.parse(a,c);if(u instanceof Promise){if(c.async===!1)throw new ye;return u.then((l)=>s(l,o,c))}return s(u,o,c)}}},{get "~standard"(){return Bt(this,"~standard",hr(this))},set "~standard"(e){Se(this,"~standard",e)}}),Qs=(e,t)=>e.issues.length?{issues:e.issues.map((n)=>_e(n,t,ne()))}:{value:e.value};async function Kl(e,t){let n={async:!0};return Qs(await e._zod.run({value:t,issues:[]},n),n)}function hr(e){return{validate:(t)=>{let n={async:!1};try{let r=e._zod.run({value:t,issues:[]},n);if(!(r instanceof Promise))return Qs(r,n)}catch(r){}return Kl(e,t)},vendor:"zod",version:1}}var Qt=m("$ZodString",(e,t)=>{N.init(e,t),e._zod.pattern=t.pattern??Ps,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=String(n.value)}catch(o){}if(typeof n.value==="string")return n;return n.issues.push({expected:"string",code:"invalid_type",input:n.value,inst:e}),n}}),W=m("$ZodStringFormat",(e,t)=>{_t.init(e,t),Qt.init(e,t)}),ei=m("$ZodGUID",(e,t)=>{t.pattern??(t.pattern=us),W.init(e,t)}),ti=m("$ZodUUID",(e,t)=>{if(t.version){let r={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[t.version];if(r===void 0)throw Error(`Invalid UUID version: "${t.version}"`);t.pattern??(t.pattern=ar(r))}else t.pattern??(t.pattern=ar());W.init(e,t)}),ni=m("$ZodEmail",(e,t)=>{t.pattern??(t.pattern=ls),W.init(e,t)}),ri=1,Kt=2;function oi(e){try{if(typeof URL<"u"&&typeof URL.canParse==="function")return URL.canParse(e);return new URL(e),!0}catch{return!1}}function Xl(e,t){if(!("normalize"in t)&&!("hostname"in t)&&!("protocol"in t))return oi(e)||Kt;return Ql(e,t)}function Ql(e,t){if(!t.normalize&&t.protocol?.source===ys.source&&!/^https?:\/\//i.test(e))return ri;try{if(typeof URL<"u"){let n=URL;if(typeof n.parse==="function")return n.parse(e)??Kt}return new URL(e)}catch{return Kt}}var ep=/[\t\n\r]/g;function js(e){return e.replace(ep,"")}function tp(e,t){return t.lastIndex=0,t.test(e.hostname)}function np(e,t){return t.lastIndex=0,t.test(e.protocol.endsWith(":")?e.protocol.slice(0,-1):e.protocol)}var si=m("$ZodURL",(e,t)=>{W.init(e,t),e._zod.check=(n)=>{try{let r=n.value.trim(),o=Xl(r,t);if(o===ri){n.issues.push({code:"invalid_format",format:"url",note:"Invalid URL format",input:n.value,inst:e,continue:!t.abort});return}if(o===Kt){n.issues.push({code:"invalid_format",format:"url",input:n.value,inst:e,continue:!t.abort});return}if(o===!0){n.value=js(r);return}if(t.hostname&&!tp(o,t.hostname))n.issues.push({code:"invalid_format",format:"url",note:"Invalid hostname",pattern:t.hostname.source,input:n.value,inst:e,continue:!t.abort});if(t.protocol&&!np(o,t.protocol))n.issues.push({code:"invalid_format",format:"url",note:"Invalid protocol",pattern:t.protocol.source,input:n.value,inst:e,continue:!t.abort});n.value=t.normalize?o.href:js(r);return}catch(r){n.issues.push({code:"invalid_format",format:"url",input:n.value,inst:e,continue:!t.abort})}}}),ii=m("$ZodEmoji",(e,t)=>{t.pattern??(t.pattern=ps()),W.init(e,t)}),ai=m("$ZodNanoID",(e,t)=>{if(t.length!==void 0&&(!Number.isInteger(t.length)||t.length<1))throw Error(`Invalid nanoid length: ${t.length}`);t.pattern??(t.pattern=t.length===void 0?is:as(t.length)),W.init(e,t)}),ci=m("$ZodCUID",(e,t)=>{t.pattern??(t.pattern=ts),W.init(e,t)}),ui=m("$ZodCUID2",(e,t)=>{t.pattern??(t.pattern=ns),W.init(e,t)}),li=m("$ZodULID",(e,t)=>{t.pattern??(t.pattern=rs),W.init(e,t)}),pi=m("$ZodXID",(e,t)=>{t.pattern??(t.pattern=os),W.init(e,t)}),fi=m("$ZodKSUID",(e,t)=>{t.pattern??(t.pattern=ss),W.init(e,t)}),di=m("$ZodISODateTime",(e,t)=>{t.pattern??(t.pattern=xs(t)),W.init(e,t)}),hi=m("$ZodISODate",(e,t)=>{t.pattern??(t.pattern=bs),W.init(e,t)}),mi=m("$ZodISOTime",(e,t)=>{t.pattern??(t.pattern=vs(t)),W.init(e,t)}),gi=m("$ZodISODuration",(e,t)=>{t.pattern??(t.pattern=cs),W.init(e,t)}),_i=m("$ZodIPv4",(e,t)=>{t.pattern??(t.pattern=fs),W.init(e,t)}),rp=/^[0-9a-fA-F:.]+$/;function yi(e){if(!rp.test(e))return!1;return oi(`http://[${e}]`)}var $i=m("$ZodIPv6",(e,t)=>{t.pattern??(t.pattern=ds),W.init(e,t),e._zod.check=(n)=>{if(!yi(n.value))n.issues.push({code:"invalid_format",format:"ipv6",input:n.value,inst:e,continue:!t.abort})}});var wi=m("$ZodCIDRv4",(e,t)=>{t.pattern??(t.pattern=hs),W.init(e,t)});function op(e){let t=e.split("/");if(t.length!==2)return!1;let[n,r]=t;if(!r)return!1;let o=Number(r);if(`${o}`!==r)return!1;if(o<0||o>128)return!1;return yi(n)}var bi=m("$ZodCIDRv6",(e,t)=>{t.pattern??(t.pattern=ms),W.init(e,t),e._zod.check=(n)=>{if(!op(n.value))n.issues.push({code:"invalid_format",format:"cidrv6",input:n.value,inst:e,continue:!t.abort})}});function vi(e){if(e==="")return!0;if(/\s/.test(e))return!1;if(e.length%4!==0)return!1;try{return atob(e),!0}catch{return!1}}var mr=/^[0-9a-zA-Z+/]*={0,2}$/,xi=m("$ZodBase64",(e,t)=>{t.pattern??(t.pattern=mr),W.init(e,t),e._zod.check=(n)=>{if(vi(n.value))return;n.issues.push({code:"invalid_format",format:"base64",input:n.value,inst:e,continue:!t.abort})}}),en=/^[A-Za-z0-9_-]*$/;function sp(e){if(!en.test(e))return!1;let t=e.replace(/[-_]/g,(r)=>r==="-"?"+":"/"),n=t.padEnd(Math.ceil(t.length/4)*4,"=");return vi(n)}var Pi=m("$ZodBase64URL",(e,t)=>{t.pattern??(t.pattern=en),W.init(e,t),e._zod.check=(n)=>{if(sp(n.value))return;n.issues.push({code:"invalid_format",format:"base64url",input:n.value,inst:e,continue:!t.abort})}}),Si=m("$ZodE164",(e,t)=>{t.pattern??(t.pattern=$s),W.init(e,t)});function ip(e,t=null){try{let n=e.split(".");if(n.length!==3)return!1;let[r]=n;if(!r)return!1;let o=JSON.parse(atob(r));if("typ"in o&&o?.typ!=="JWT")return!1;if(!o.alg)return!1;if(t&&(!("alg"in o)||o.alg!==t))return!1;return!0}catch{return!1}}var Ei=m("$ZodJWT",(e,t)=>{W.init(e,t),e._zod.check=(n)=>{if(ip(n.value,t.alg))return;n.issues.push({code:"invalid_format",format:"jwt",input:n.value,inst:e,continue:!t.abort})}});var gr=m("$ZodNumber",(e,t)=>{N.init(e,t),e._zod.pattern=mt,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=Number(n.value)}catch(i){}let o=n.value;if(typeof o==="number"&&!Number.isNaN(o)&&Number.isFinite(o))return n;let s=typeof o==="number"?Number.isNaN(o)?"NaN":!Number.isFinite(o)?String(o):void 0:void 0;return n.issues.push({expected:"number",code:"invalid_type",input:o,inst:e,...s?{received:s}:{}}),n}}),ki=m("$ZodNumberFormat",(e,t)=>{Rs.init(e,t),gr.init(e,t)}),zi=m("$ZodBoolean",(e,t)=>{N.init(e,t),e._zod.pattern=Es,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=Boolean(n.value)}catch(s){}let o=n.value;if(typeof o==="boolean")return n;return n.issues.push({expected:"boolean",code:"invalid_type",input:o,inst:e}),n}}),Ti=m("$ZodBigInt",(e,t)=>{N.init(e,t),e._zod.pattern=Ss,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=BigInt(n.value)}catch(o){}if(typeof n.value==="bigint")return n;return n.issues.push({expected:"bigint",code:"invalid_type",input:n.value,inst:e}),n}});var Ri=m("$ZodUnknown",(e,t)=>{N.init(e,t),e._zod.parse=(n)=>n}),Ai=m("$ZodNever",(e,t)=>{N.init(e,t),e._zod.parse=(n,r)=>(n.issues.push({expected:"never",code:"invalid_type",input:n.value,inst:e}),n)});var Ci=m("$ZodDate",(e,t)=>{N.init(e,t),e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=new Date(n.value)}catch(a){}let o=n.value,s=o instanceof Date;if(s&&!Number.isNaN(o.getTime()))return n;return n.issues.push({expected:"date",code:"invalid_type",input:o,...s?{received:"Invalid Date"}:{},inst:e}),n}});function ap(e,t){let n=er(e._zod.def.checks);if(!n.length)return;let r=Math.min(...n.map((s)=>s[0])),o=e._zod.parse;e._zod.parse=(s,i)=>{let a=t(s.value);if(a>r&&!i?.skipChecks&&i?.direction!=="backward"){for(let[c,u]of er(e._zod.def.checks))if(a>c&&u._zod.def.when(s)){let l=s.issues.length;return u._zod.check(s),s.issues[l].continue=!1,Lt(s.issues,l,e),s}}return o(s,i)}}var cp=(e)=>Array.isArray(e)?e.length:-1;function Ms(e,t,n){if(e.issues.length)t.issues.push(...Ie(n,e.issues));t.value[n]=e.value}var Oi=m("$ZodArray",(e,t)=>{N.init(e,t);let n=Q.memoizer;n?.attach(e),e._zod.parse=(r,o)=>{let s=r.value;if(!Array.isArray(s))return r.issues.push({expected:"array",code:"invalid_type",input:s,inst:e}),r;r.value=n?n.alloc(e,r,Array(s.length),o):Array(s.length);let i=[],a=o?.abortEarly;for(let c=0;c<s.length;c++){let u=s[c],l=t.element._zod.run({value:u,issues:[]},o);if(l instanceof Promise)i.push(l.then((p)=>Ms(p,r,c)));else if(Ms(l,r,c),a&&l.issues.length!==0&&ge(l))break}if(i.length)return Promise.all(i).then(()=>r);return r},ap(e,cp)});function Xt(e,t,n,r,o,s){let i=n in r,a=s==="optional";if(!i&&a&&o==="optional")return;if(e.issues.length){if(o!==void 0&&a&&!i)return;t.issues.push(...Ie(n,e.issues))}if(!i&&o===void 0){if(!e.issues.length)t.issues.push({code:"invalid_type",expected:"nonoptional",input:void 0,path:[n]});return}if(e.value===void 0){if(i||o==="defaulted"&&!a)t.value[n]=void 0}else t.value[n]=e.value}var up=[];function Ii(e){let t=Object.keys(e.shape),n=Object.getOwnPropertySymbols(e.shape),r=n.length?n:up,o=r.length?[...t,...r]:t;for(let i of o)if(!e.shape?.[i]?._zod?.traits?.has("$ZodType"))throw Error(`Invalid element at key "${String(i)}": expected a Zod schema`);let s=Co(e.shape);return{...e,allKeys:o,symbolKeys:r,keySet:new Set(t),numKeys:t.length,optionalKeys:new Set(s)}}function Ni(e,t,n,r,o,s,i){let a=[],c=o.keySet,u=o.catchall._zod,l=u.def.type,{optin:p,optout:f}=u,d=0;for(let h in t){if(i&&n.issues.length!==d){if(ge(n,d))break;d=n.issues.length}if(c.has(h))continue;if(h==="__proto__"){if(l==="never")a.push(h);continue}if(l==="never"){a.push(h);continue}let _=u.run({value:t[h],issues:[]},r);if(_ instanceof Promise)e.push(_.then((w)=>Xt(w,n,h,t,p,f)));else Xt(_,n,h,t,p,f)}if(a.length)n.issues.push({code:"unrecognized_keys",keys:a,input:t,inst:s,continue:!0});if(!e.length)return n;return Promise.all(e).then(()=>n)}var lp=m("$ZodObject",(e,t)=>{N.init(e,t);let n=Object.getOwnPropertyDescriptor(t,"shape"),r=n?.get?n.get.raw:t.shape??{};if(r){let u=()=>{let l={...r};return Object.defineProperty(t,"shape",{value:l}),u.raw=l,l};u.raw=r,Object.defineProperty(t,"shape",{get:u})}let o=It(()=>Ii(t));C(e,"propValues",(u)=>{let l=u.def.shape,p={};for(let f in l){let d=l[f]._zod;if(d.values){if(!Object.prototype.hasOwnProperty.call(p,f))ue(p,f,new Set);for(let h of d.values)p[f].add(h);if(d.optin!==void 0)p[f].add(void 0)}}return p});let s=pt,i=t.catchall,a,c=Q.memoizer;c?.attach(e),e._zod.parse=(u,l)=>{a??(a=o.value);let p=u.value;if(!s(p))return u.issues.push({expected:"object",code:"invalid_type",input:p,inst:e}),u;u.value=c?c.alloc(e,u,{},l):{};let f=[],d=a.shape,h=l?.abortEarly,_=u.issues.length;for(let w of a.allKeys){if(h&&u.issues.length!==_){if(ge(u,_))break;_=u.issues.length}if(w==="__proto__")continue;let v=d[w],A=v._zod.optin,z=v._zod.optout,O=v._zod.run({value:p[w],issues:[]},l);if(O instanceof Promise)f.push(O.then((k)=>Xt(k,u,w,p,A,z)));else Xt(O,u,w,p,A,z)}if(!i)return f.length?Promise.all(f).then(()=>u):u;return Ni(f,p,u,l,o.value,e,h===!0)}}),Di=m("$ZodObjectJIT",(e,t)=>{lp.init(e,t);let n=e._zod.parse,r=It(()=>Ii(t)),o=Q.memoizer,s=(d)=>{let h=r.value,_=h.symbolKeys,w=new fr(["payload","ctx"],{shape:d,inst:e,memo:o,syms:_}),v=(k)=>`shape[${k}]._zod.run({ value: input[${k}], issues: [] }, ctx)`,A=(k,P)=>`
          let ${k}_ab = false;
          for (let i = 0; i < ${k}.issues.length; i++) {
            const iss = ${k}.issues[i];
            iss.path = iss.path ? [${P}, ...iss.path] : [${P}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${k}_ab = true;
          }
          if (${k}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;w.write("const input = payload.value;");let z=Object.create(null),O=0;for(let k of h.allKeys)z[k]=`key_${O++}`;w.write(o?"const newResult = memo.alloc(inst, payload, {}, ctx);":"const newResult = {};");for(let k of h.allKeys){if(k==="__proto__")continue;let P=z[k],R=typeof k==="symbol"?`syms[${_.indexOf(k)}]`:zo(k),S=`${R} in input`,x=d[k],I=x?._zod?.optin,j=I!==void 0,K=x?._zod?.optout==="optional";if(w.write(`const ${P} = ${v(R)};`),j&&K){let Re=I==="optional"?`${P}_present`:`${P}.value !== undefined || ${P}_present`;w.write(`
        const ${P}_present = ${S};
        if (!${P}.issues.length || ${P}_present) {
          if (${P}.issues.length) {${A(P,R)}
          }

          if (${Re}) {
            newResult[${R}] = ${P}.value;
          }
        }

      `)}else if(!j)w.write(`
        const ${P}_present = ${S};
        if (${P}.issues.length) {${A(P,R)}
        }
        if (!${P}_present && !${P}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${R}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${P}_present) {
          newResult[${R}] = ${P}.value;
        }

      `);else if(w.write(`
        if (${P}.issues.length) {${A(P,R)}
        }
      `),I==="defaulted")w.write(`newResult[${R}] = ${P}.value;`);else w.write(`
        if (${P}.value !== undefined || ${S}) {
          newResult[${R}] = ${P}.value;
        }
      `)}return w.write("payload.value = newResult;"),w.write("return payload;"),w.compile()},i,a=pt,c=!Q.jitless,l=c&&Ro.value,p=t.catchall,f;e._zod.parse=(d,h)=>{f??(f=r.value);let _=d.value;if(!a(_))return d.issues.push({expected:"object",code:"invalid_type",input:_,inst:e}),d;if(c&&l&&h?.async===!1&&h.jitless!==!0){if(!i)i=s(t.shape);if(d=i(d,h),!p)return d;return Ni([],_,d,h,f,e,h?.abortEarly===!0)}return n(d,h)}});function Hs(e,t,n,r){for(let s of e)if(s.issues.length===0)return t.value=s.value,t;let o=e.filter((s)=>!ge(s));if(o.length===1)return t.value=o[0].value,o[0];return t.issues.push({code:"invalid_union",input:t.value,inst:n,errors:e.map((s)=>s.issues.map((i)=>_e(i,r,ne())))}),t}var Zi=m("$ZodUnion",(e,t)=>{N.init(e,t),C(e,"optin",(r)=>r.def.options.some((o)=>o._zod.optin==="defaulted")?"defaulted":r.def.options.some((o)=>o._zod.optin!==void 0)?"optional":void 0),C(e,"optout",(r)=>r.def.options.some((o)=>o._zod.optout==="optional")?"optional":void 0),C(e,"values",(r)=>{if(r.def.options.every((o)=>o._zod.values))return new Set(r.def.options.flatMap((o)=>Array.from(o._zod.values)));return}),C(e,"pattern",(r)=>{if(r.def.options.every((o)=>o._zod.pattern)){let o=r.def.options.map((s)=>s._zod.pattern);return new RegExp(`^(${o.map((s)=>Nt(s.source)).join("|")})$`)}return});let n=t.options.length===1?t.options[0]._zod.run:null;e._zod.parse=(r,o)=>{if(n)return n(r,o);let s=!1,i=[];for(let a of t.options){let c=a._zod.run({value:r.value,issues:[]},o);if(c instanceof Promise)i.push(c),s=!0;else{if(c.issues.length===0)return c;i.push(c)}}if(!s)return Hs(i,r,e,o);return Promise.all(i).then((a)=>Hs(a,r,e,o))}});var Wi=m("$ZodIntersection",(e,t)=>{N.init(e,t),e._zod.parse=(n,r)=>{let o=n.value,s=t.left._zod.run({value:o,issues:[]},r),i=t.right._zod.run({value:o,issues:[]},r);if(s instanceof Promise||i instanceof Promise)return Promise.all([s,i]).then(([c,u])=>qs(n,c,u));return qs(n,s,i)}});function dr(e,t){if(e===t)return{valid:!0,data:e};if(e instanceof Date&&t instanceof Date&&+e===+t)return{valid:!0,data:e};if(We(e)&&We(t)){let n=Object.keys(t),r=Object.keys(e).filter((s)=>n.indexOf(s)!==-1),o={...e,...t};if(Object.prototype.hasOwnProperty.call(o,"__proto__"))delete o.__proto__;for(let s of r){if(s==="__proto__")continue;let i=dr(e[s],t[s]);if(!i.valid)return{valid:!1,mergeErrorPath:[s,...i.mergeErrorPath]};o[s]=i.data}return{valid:!0,data:o}}if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return{valid:!1,mergeErrorPath:[]};let n=[];for(let r=0;r<e.length;r++){let o=e[r],s=t[r],i=dr(o,s);if(!i.valid)return{valid:!1,mergeErrorPath:[r,...i.mergeErrorPath]};n.push(i.data)}return{valid:!0,data:n}}return{valid:!1,mergeErrorPath:[]}}function qs(e,t,n){let r=new Map,o,s=new Map,i=(u,l)=>{let p;if(u.code==="unrecognized_keys"&&!u.path?.length)o??(o=u),p=u.keys;else if(u.code==="invalid_key"&&u.origin==="record"&&u.path?.length===1){let f=String(u.path[0]);if(!s.has(f))s.set(f,u);p=[f]}else return!1;for(let f of p){if(!r.has(f))r.set(f,{});r.get(f)[l]=!0}return!0};for(let u of t.issues)if(!i(u,"l"))e.issues.push(u);for(let u of n.issues)if(!i(u,"r"))e.issues.push(u);let a=[...r].filter(([,u])=>u.l&&u.r).map(([u])=>u);if(a.length){let u=o?a.filter((l)=>o.keys.includes(l)):[];if(u.length)e.issues.push({...o,keys:u});for(let l of a)if(!u.includes(l)&&s.has(l))e.issues.push(s.get(l))}let c=dr(t.value,n.value);if(!c.valid){if(ge(e))return e;throw Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`)}return e.value=c.data,e}var Li=m("$ZodRecord",(e,t)=>{N.init(e,t);let n=Q.memoizer;n?.attach(e),e._zod.parse=(r,o)=>{let s=r.value;if(!We(s))return r.issues.push({expected:"record",code:"invalid_type",input:s,inst:e}),r;let i=[],a=t.keyType._zod.values;if(a&&!t.partial){r.value=n?n.alloc(e,r,{},o):{};let c=new Set;for(let l of a)if(typeof l==="string"||typeof l==="number"||typeof l==="symbol"){if(c.add(typeof l==="number"?l.toString():l),l==="__proto__")continue;let p=t.keyType._zod.run({value:l,issues:[]},o);if(p instanceof Promise)throw Error("Async schemas not supported in object keys currently");if(p.issues.length){r.issues.push({code:"invalid_key",origin:"record",issues:p.issues.map((h)=>_e(h,o,ne())),input:l,path:[l],inst:e});continue}let f=p.value;if(f==="__proto__")continue;let d=t.valueType._zod.run({value:s[l],issues:[]},o);if(d instanceof Promise)i.push(d.then((h)=>{if(h.issues.length)r.issues.push(...Ie(l,h.issues));r.value[f]=h.value}));else{if(d.issues.length)r.issues.push(...Ie(l,d.issues));r.value[f]=d.value}}let u;for(let l in s)if(!c.has(l))if(t.mode==="loose"){if(l==="__proto__")continue;r.value[l]=s[l]}else u=u??[],u.push(l);if(u&&u.length>0)r.issues.push({code:"unrecognized_keys",input:s,inst:e,keys:u,continue:!0})}else{r.value=n?n.alloc(e,r,{},o):{};let c;for(let u of Reflect.ownKeys(s)){if(u==="__proto__")continue;if(!Object.prototype.propertyIsEnumerable.call(s,u))continue;let l=t.keyType._zod.run({value:u,issues:[]},o);if(l instanceof Promise)throw Error("Async schemas not supported in object keys currently");if(typeof u==="string"&&mt.test(u)&&l.issues.length){let h=t.keyType._zod.run({value:Number(u),issues:[]},o);if(h instanceof Promise)throw Error("Async schemas not supported in object keys currently");if(h.issues.length===0)l=h}if(l.issues.length){if(t.mode==="loose")r.value[u]=s[u];else if(a)c=c??[],c.push(u);else r.issues.push({code:"invalid_key",origin:"record",issues:l.issues.map((h)=>_e(h,o,ne())),input:u,path:[u],inst:e});continue}let f=l.value;if(f==="__proto__")continue;let d=t.valueType._zod.run({value:s[u],issues:[]},o);if(d instanceof Promise)i.push(d.then((h)=>{if(h.issues.length)r.issues.push(...Ie(u,h.issues));r.value[f]=h.value}));else{if(d.issues.length)r.issues.push(...Ie(u,d.issues));r.value[f]=d.value}}if(c&&c.length>0)r.issues.push({code:"unrecognized_keys",input:s,inst:e,keys:c,continue:!0})}if(i.length)return Promise.all(i).then(()=>r);return r}});var Fi=m("$ZodEnum",(e,t)=>{N.init(e,t);let n=ft(t.entries),r=new Set(n);e._zod.values=r,C(e,"pattern",(o)=>{let s=ft(o.def.entries).filter((i)=>Ao.has(typeof i));return new RegExp(s.length?`^(${s.map((i)=>Oe(i.toString())).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(o,s)=>{let i=o.value;if(r.has(i))return o;return o.issues.push({code:"invalid_value",values:n,input:i,inst:e}),o}}),Ui=m("$ZodLiteral",(e,t)=>{N.init(e,t);let n=new Set(t.values);e._zod.values=n,C(e,"pattern",(r)=>{let o=r.def.values;return new RegExp(o.length?`^(${o.map((s)=>typeof s==="string"?Oe(s):s?Oe(s.toString()):String(s)).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(r,o)=>{let s=r.value;if(n.has(s))return r;return r.issues.push({code:"invalid_value",values:t.values,input:s,inst:e}),r}});var Bi=m("$ZodTransform",(e,t)=>{N.init(e,t),e._zod.optin="optional",Q.memoizer?.guard(e),e._zod.parse=(n,r)=>{if(r.direction==="backward")throw new ht(e.constructor.name);let o=t.transform(n.value,n);if(r.async)return(o instanceof Promise?o:Promise.resolve(o)).then((i)=>(n.value=i,n));if(o instanceof Promise)throw new ye;return n.value=o,n}});function Ys(e,t){return e.value=t.issues.length?void 0:t.value,e}var _r=m("$ZodOptional",(e,t)=>{N.init(e,t),C(e,"optin",(n)=>n.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),e._zod.optout="optional",C(e,"values",(n)=>{let r=n.def.innerType._zod.values;return r?new Set([...r,void 0]):void 0}),C(e,"pattern",(n)=>{let r=n.def.innerType._zod.pattern;return r?new RegExp(`^(${Nt(r.source)})?$`):void 0}),e._zod.parse=(n,r)=>{if(n.value===void 0){if(t.innerType._zod.optin!=="defaulted")return n;let o=t.innerType._zod.run({value:n.value,issues:[]},r);if(o instanceof Promise)return o.then((s)=>Ys(n,s));return Ys(n,o)}return t.innerType._zod.run(n,r)}}),ji=m("$ZodExactOptional",(e,t)=>{_r.init(e,t),C(e,"values",(n)=>n.def.innerType._zod.values),C(e,"pattern",(n)=>n.def.innerType._zod.pattern),e._zod.parse=(n,r)=>t.innerType._zod.run(n,r)}),Mi=m("$ZodNullable",(e,t)=>{N.init(e,t),C(e,"optin",(n)=>n.def.innerType._zod.optin),C(e,"optout",(n)=>n.def.innerType._zod.optout),C(e,"pattern",(n)=>{let r=n.def.innerType._zod.pattern;return r?new RegExp(`^(${Nt(r.source)}|null)$`):void 0}),C(e,"values",(n)=>n.def.innerType._zod.values?new Set([...n.def.innerType._zod.values,null]):void 0),e._zod.parse=(n,r)=>{if(n.value===null)return n;return t.innerType._zod.run(n,r)}}),Hi=m("$ZodDefault",(e,t)=>{N.init(e,t),e._zod.optin="defaulted",C(e,"values",(n)=>n.def.innerType._zod.values),e._zod.parse=(n,r)=>{if(r.direction==="backward")return t.innerType._zod.run(n,r);if(n.value===void 0)return n.value=t.defaultValue,n;let o=t.innerType._zod.run(n,r);if(o instanceof Promise)return o.then((s)=>Gs(s,t));return Gs(o,t)}});function Gs(e,t){if(e.value===void 0)e.value=t.defaultValue;return e}var qi=m("$ZodPrefault",(e,t)=>{N.init(e,t),e._zod.optin="defaulted",C(e,"values",(n)=>n.def.innerType._zod.values),e._zod.parse=(n,r)=>{if(r.direction==="backward")return t.innerType._zod.run(n,r);if(n.value===void 0)n.value=t.defaultValue;return t.innerType._zod.run(n,r)}}),Yi=m("$ZodNonOptional",(e,t)=>{N.init(e,t),C(e,"values",(n)=>{let r=n.def.innerType._zod.values;return r?new Set([...r].filter((o)=>o!==void 0)):void 0}),e._zod.parse=(n,r)=>{let o=t.innerType._zod.run(n,r);if(o instanceof Promise)return o.then((s)=>Js(s,e));return Js(o,e)}});function Js(e,t){if(!e.issues.length&&e.value===void 0)e.issues.push({code:"invalid_type",expected:"nonoptional",input:e.value,inst:t});return e}function Vs(e,t,n,r){if(!t.issues.length){if(e.value=t.value,t.memo)e.memo=!0;return e}return e.value=n.catchValue({...t,value:e.value,error:{issues:t.issues.map((o)=>_e(o,r,ne()))},input:e.value}),e}var Gi=m("$ZodCatch",(e,t)=>{N.init(e,t),C(e,"optin",(n)=>n.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),C(e,"optout",(n)=>n.def.innerType._zod.optout),C(e,"values",(n)=>n.def.innerType._zod.values),e._zod.parse=(n,r)=>{if(r.direction==="backward")return t.innerType._zod.run(n,r);let o=t.innerType._zod.run({value:n.value,issues:[]},r);if(o instanceof Promise)return o.then((s)=>Vs(n,s,t,r));return Vs(n,o,t,r)}});var Ji=m("$ZodPipe",(e,t)=>{N.init(e,t),C(e,"values",(n)=>n.def.in._zod.values),C(e,"optin",(n)=>n.def.in._zod.optin),C(e,"optout",(n)=>n.def.out._zod.optout),C(e,"propValues",(n)=>n.def.in._zod.propValues),e._zod.parse=(n,r)=>{if(r.direction==="backward"){let s=t.out._zod.run(n,r);if(s instanceof Promise)return s.then((i)=>Vt(i,t.in,r));return Vt(s,t.in,r)}let o=t.in._zod.run(n,r);if(o instanceof Promise)return o.then((s)=>Vt(s,t.out,r));return Vt(o,t.out,r)}});function Vt(e,t,n){if(e.issues.some((r)=>r.code!=="unrecognized_keys"))return e.aborted=!0,e;return t._zod.run({value:e.value,issues:e.issues},n)}var Vi=m("$ZodReadonly",(e,t)=>{N.init(e,t),C(e,"propValues",(n)=>n.def.innerType._zod.propValues),C(e,"values",(n)=>n.def.innerType._zod.values),C(e,"optin",(n)=>n.def.innerType?._zod?.optin),C(e,"optout",(n)=>n.def.innerType?._zod?.optout),e._zod.parse=(n,r)=>{if(r.direction==="backward")return t.innerType._zod.run(n,r);let o=t.innerType._zod.run(n,r);if(o instanceof Promise)return o.then(Ks);return Ks(o)}});function Ks(e){if(!e.memo)e.value=Object.freeze(e.value);return e}var Ki=m("$ZodCustom",(e,t)=>{H.init(e,t),N.init(e,t),e._zod.parse=(n,r)=>n,e._zod.check=(n)=>{let r=n.value,o=t.fn(r);if(o instanceof Promise)return o.then((s)=>Xs(s,n,r,e));Xs(o,n,r,e);return}});function Xs(e,t,n,r){if(!e){let o={code:"custom",input:n,inst:r,path:[...r._zod.def.path??[]],continue:!r._zod.def.abort};if(r._zod.def.params)o.params=r._zod.def.params;t.issues.push(Le(o))}}class Qi extends Error{constructor(){super("Cannot parse a reference cycle that closes through a transform");this.name="ZodCyclicError"}}var $r="~memo",Xi=[];function ea(e){return e!==null&&typeof e==="object"}function yr(e){return e.map((t)=>t.path?{...t,path:t.path.slice()}:{...t})}var ta=new WeakMap,yt=0,rn=1,$t=2;function on(e,t,n){let r=ta.get(e);if(r!==void 0)return r?$t:yt;if(t.has(e))return $t;t.add(e);let o=yt,s=(l)=>{if(o!==$t&&l?._zod){let p=on(l,t,n);if(p>o)o=p}},i=(l,p)=>{let f=yt;for(let d of Reflect.ownKeys(l)){let h=Object.getOwnPropertyDescriptor(l,d);if(p&&!h.enumerable)continue;let _=h.get?rn:h.value?._zod?on(h.value,t,n):yt;if(_>f)f=_}return f},a=(l)=>{if(l>o)o=l},c=e._zod.def,u=c.type;switch(u){case"object":{let l=Dt(c);a(l?i(l,!0):rn),s(c.catchall);break}case"array":s(c.element);break;case"tuple":for(let l of c.items)s(l);s(c.rest);break;case"record":case"map":s(c.keyType),s(c.valueType);break;case"set":s(c.valueType);break;case"union":for(let l of c.options)s(l);break;case"intersection":s(c.left),s(c.right);break;case"optional":case"nullable":case"default":case"prefault":case"catch":case"readonly":case"nonoptional":case"promise":case"success":s(c.innerType);break;case"pipe":s(c.in),s(c.out);break;case"function":s(c.input),s(c.output);break;case"lazy":{let l=c._cachedInner??(n?e._zod.innerType:void 0);a(l?on(l,t,!1):rn);break}case"template_literal":case"string":case"number":case"int":case"boolean":case"bigint":case"symbol":case"undefined":case"null":case"void":case"never":case"any":case"unknown":case"date":case"nan":case"enum":case"literal":case"file":case"transform":case"custom":break;default:for(let l in c){let p=Object.getOwnPropertyDescriptor(c,l);if(!p||p.get)continue;let f=p.value;if(!f||typeof f!=="object")continue;if(f._zod)s(f);else if(Array.isArray(f))for(let d of f)s(d)}}return t.delete(e),pp(e,o)}function pp(e,t){if(t!==rn)ta.set(e,t===$t);return t}function fp(e,t){let n=e.buckets.get(t);if(!n)n=new WeakMap,e.buckets.set(t,n);return n}var tn,nn=[],dp={alloc(e,t,n){let r=tn;if(!r)return n;tn=void 0;let o={value:n,issues:null};return r.set(t.value,o),nn.push(o),n},guard(e){var t;(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred.push(()=>{let n=e._zod.parse,r=(o,s)=>{if(s.direction!=="backward"&&hp(s,o.value))throw new Qi;return n(o,s)};if(e._zod.parse=r,e._zod.run===n)e._zod.run=r})},attach(e){var t;let n,r=!1,o,s;(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred.push(()=>{let i=e._zod.parse,a=(c,u)=>{if(n===void 0){let v=on(e,new Set,!1);if(v===yt){if(e._zod.parse=i,e._zod.run===a)e._zod.run=i;return i(c,u)}if(v===$t||r)n=!0;else r=!0}let l=c.value;if(!ea(l))return i(c,u);let p=u[$r];if(!p)p={buckets:new WeakMap,backEdges:void 0},u[$r]=p;let f;if(o===u)f=s;else f=fp(p,e),o=u,s=f;let d=f.get(l);if(d){if(c.value=d.value,d.issues){if(d.issues.length)c.issues.push(...yr(d.issues))}else c.memo=!0,p.backEdges??(p.backEdges=new WeakSet),p.backEdges.add(d.value);return c}tn=f;let h=nn.length,_=i(c,u);tn=void 0;let w=nn.length>h?nn.pop():void 0;if(_ instanceof Promise)return _.then((v)=>{if(w)w.issues=v.issues.length?yr(v.issues):Xi;return v});if(w)w.issues=_.issues.length?yr(_.issues):Xi;return _};if(e._zod.parse=a,e._zod.run===i)e._zod.run=a})}};function na(){return dp}function hp(e,t){let n=e[$r]?.backEdges;return n!==void 0&&ea(t)&&n.has(t)}var mp=()=>{let e={string:{unit:"characters",verb:"to have"},file:{unit:"bytes",verb:"to have"},array:{unit:"items",verb:"to have"},set:{unit:"items",verb:"to have"},map:{unit:"entries",verb:"to have"}};function t(s){return e[s]??null}let n={regex:"input",email:"email address",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO datetime",date:"ISO date",time:"ISO time",duration:"ISO duration",ipv4:"IPv4 address",ipv6:"IPv6 address",mac:"MAC address",cidrv4:"IPv4 range",cidrv6:"IPv6 range",base64:"base64-encoded string",base64url:"base64url-encoded string",json_string:"JSON string",e164:"E.164 number",currency_code:"currency code",credit_card:"credit card number",iban:"IBAN",jwt:"JWT",template_literal:"input"},r={nan:"NaN"};function o(s,i){if(s==="number"&&typeof i==="number"&&!Number.isFinite(i))return String(i);return r[s]??s}return(s)=>{switch(s.code){case"invalid_type":{let i=o(s.expected),a=Do(s.input),c=o(a,s.input);return`Invalid input: expected ${i}, received ${c}`}case"invalid_value":if(s.values.length===1)return`Invalid input: expected ${Xn(s.values[0])}`;return`Invalid option: expected one of ${Jn(s.values,"|")}`;case"too_big":{let i=s.exact?"exactly ":s.inclusive?"<=":"<",a=t(s.origin);if(a)return`Too big: expected ${s.origin??"value"} to have ${i}${s.maximum.toString()} ${a.unit??"elements"}`;return`Too big: expected ${s.origin??"value"} to be ${i}${s.maximum.toString()}`}case"too_small":{let i=s.exact?"exactly ":s.inclusive?">=":">",a=t(s.origin);if(a)return`Too small: expected ${s.origin} to have ${i}${s.minimum.toString()} ${a.unit}`;return`Too small: expected ${s.origin} to be ${i}${s.minimum.toString()}`}case"invalid_format":{let i=s;if(i.format==="starts_with")return`Invalid string: must start with "${i.prefix}"`;if(i.format==="ends_with")return`Invalid string: must end with "${i.suffix}"`;if(i.format==="includes")return`Invalid string: must include "${i.includes}"`;if(i.format==="regex")return`Invalid string: must match pattern ${i.pattern}`;return`Invalid ${n[i.format]??s.format}`}case"not_multiple_of":return`Invalid number: must be a multiple of ${s.divisor}`;case"unrecognized_keys":return`Unrecognized key${s.keys.length>1?"s":""}: ${Jn(s.keys,", ")}`;case"invalid_key":return`Invalid key in ${s.origin}`;case"invalid_union":if(s.options&&Array.isArray(s.options)&&s.options.length>0)return`Invalid discriminator value. Expected ${s.options.map((a)=>`'${a}'`).join(" | ")}`;if(s.inclusive===!1)return"Invalid input: more than one option matched";return"Invalid input";case"invalid_element":return`Invalid value in ${s.origin}`;default:return"Invalid input"}}};function wr(){return{localeError:mp()}}var ra;class oa{constructor(){this._map=new WeakMap,this._idmap=new Map}add(e,...t){let n=t[0];if(this._map.set(e,n),n&&typeof n==="object"&&"id"in n)this._idmap.set(n.id,e);return this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(e){let t=this._map.get(e);if(t&&typeof t==="object"&&"id"in t)this._idmap.delete(t.id);return this._map.delete(e),this}get(e){let t=e._zod.parent;if(t){let n={...this.get(t)??{}};delete n.id;let r={...n,...this._map.get(e)};return Object.keys(r).length?r:void 0}return this._map.get(e)}has(e){return this._map.has(e)}}function gp(){return new oa}(ra=globalThis).__zod_globalRegistry??(ra.__zod_globalRegistry=gp());var Fe=globalThis.__zod_globalRegistry;function sn(e){if(e.checks)e.checks=[...e.checks];return e}function sa(e,t){return new e(sn({type:"string",...b(t)}))}function ia(e,t){return new e(sn({type:"string",coerce:!0,...b(t)}))}function aa(e,t){return new e({type:"string",format:"email",check:"string_format",abort:!1,...b(t)})}function ca(e,t){return new e({type:"string",format:"guid",check:"string_format",abort:!1,...b(t)})}function ua(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,...b(t)})}function la(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v4",...b(t)})}function pa(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v6",...b(t)})}function fa(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v7",...b(t)})}function br(e,t){return new e({type:"string",format:"url",check:"string_format",abort:!1,...b(t)})}function da(e,t){return new e({type:"string",format:"emoji",check:"string_format",abort:!1,...b(t)})}function ha(e,t){return new e({type:"string",format:"nanoid",check:"string_format",abort:!1,...b(t)})}function ma(e,t){return new e({type:"string",format:"cuid",check:"string_format",abort:!1,...b(t)})}function ga(e,t){return new e({type:"string",format:"cuid2",check:"string_format",abort:!1,...b(t)})}function _a(e,t){return new e({type:"string",format:"ulid",check:"string_format",abort:!1,...b(t)})}function ya(e,t){return new e({type:"string",format:"xid",check:"string_format",abort:!1,...b(t)})}function $a(e,t){return new e({type:"string",format:"ksuid",check:"string_format",abort:!1,...b(t)})}function wa(e,t){return new e({type:"string",format:"ipv4",check:"string_format",abort:!1,...b(t)})}function ba(e,t){return new e({type:"string",format:"ipv6",check:"string_format",abort:!1,...b(t)})}function va(e,t){return new e({type:"string",format:"cidrv4",check:"string_format",abort:!1,...b(t)})}function xa(e,t){return new e({type:"string",format:"cidrv6",check:"string_format",abort:!1,...b(t)})}function Pa(e,t){return new e({type:"string",format:"base64",check:"string_format",abort:!1,...b(t)})}function Sa(e,t){return new e({type:"string",format:"base64url",check:"string_format",abort:!1,...b(t)})}function Ea(e,t){return new e({type:"string",format:"e164",check:"string_format",abort:!1,...b(t)})}function ka(e,t){return new e({type:"string",format:"jwt",check:"string_format",abort:!1,...b(t)})}function an(e,t){return new e({type:"string",format:"datetime",check:"string_format",offset:!1,local:!1,precision:null,...b(t)})}function cn(e,t){return new e({type:"string",format:"date",check:"string_format",...b(t)})}function un(e,t){return new e({type:"string",format:"time",check:"string_format",precision:null,...b(t)})}function ln(e,t){return new e({type:"string",format:"duration",check:"string_format",...b(t)})}function za(e,t){return new e(sn({type:"number",checks:[],...b(t)}))}function Ta(e,t){return new e(sn({type:"number",coerce:!0,checks:[],...b(t)}))}function Ra(e,t){return new e({type:"number",check:"number_format",abort:!1,format:"safeint",...b(t)})}function Aa(e,t){return new e({type:"boolean",...b(t)})}function Ca(e,t){return new e({type:"boolean",coerce:!0,...b(t)})}function Oa(e,t){return new e({type:"bigint",coerce:!0,...b(t)})}function Ia(e){return new e({type:"unknown"})}function Na(e,t){return new e({type:"never",...b(t)})}function Da(e,t){return new e({type:"date",coerce:!0,...b(t)})}function Je(e,t){return new lr({check:"less_than",...b(t),value:e,inclusive:!1})}function Ee(e,t){return new lr({check:"less_than",...b(t),value:e,inclusive:!0})}function Ve(e,t){return new pr({check:"greater_than",...b(t),value:e,inclusive:!1})}function ke(e,t){return new pr({check:"greater_than",...b(t),value:e,inclusive:!0})}function wt(e,t){return new Ts({check:"multiple_of",...b(t),value:e})}function pn(e,t){return new As({check:"max_length",...b(t),maximum:e})}function Ke(e,t){return new Cs({check:"min_length",...b(t),minimum:e})}function fn(e,t){return new Os({check:"length_equals",...b(t),length:e})}function vr(e,t){return new Is({check:"string_format",format:"regex",...b(t),pattern:e})}function xr(e){return new Ns({check:"string_format",format:"lowercase",...b(e)})}function Pr(e){return new Ds({check:"string_format",format:"uppercase",...b(e)})}function Sr(e,t){return new Zs({check:"string_format",format:"includes",...b(t),includes:e})}function Er(e,t){return new Ws({check:"string_format",format:"starts_with",...b(t),prefix:e})}function kr(e,t){return new Ls({check:"string_format",format:"ends_with",...b(t),suffix:e})}function Ne(e){return new Fs({check:"overwrite",tx:e})}function zr(e){return Ne((t)=>t.normalize(e))}function Tr(){return Ne((e)=>e.trim())}function Rr(){return Ne((e)=>e.toLowerCase())}function Ar(){return Ne((e)=>e.toUpperCase())}function Cr(){return Ne((e)=>To(e))}function Za(e,t,n){return new e({type:"array",element:t,...b(n)})}function Wa(e,t,n){return new e({type:"custom",check:"custom",fn:t,...b(n)})}function La(e,t){let n=_p((r)=>(r.addIssue=(o)=>{if(typeof o==="string")r.issues.push(Le(o,r.value,n._zod.def));else{let s=o;if(s.fatal)s.continue=!1;if(s.code??(s.code="custom"),!("input"in s))s.input=r.value;s.inst??(s.inst=n),s.continue??(s.continue=!n._zod.def.abort),r.issues.push(Le(s))}},e(r.value,r)),t);return n}function _p(e,t){let n=new H({check:"custom",...b(t)});return n._zod.check=e,n}function bt(e,...t){for(let n of t)for(let r of Reflect.ownKeys(n))if(Object.prototype.propertyIsEnumerable.call(n,r))ue(e,r,n[r]);return e}function Ir(e){let t=e?.target??"draft-2020-12";if(t==="draft-4")t="draft-04";if(t==="draft-7")t="draft-07";return{processors:e.processors??{},metadataRegistry:e?.metadata??Fe,target:t,unrepresentable:e?.unrepresentable??"throw",override:e?.override??(()=>{}),io:e?.io??"output",counter:0,seen:new Map,sharedDefsExtractedFor:void 0,sharedEmitDoneFor:void 0,cycles:e?.cycles??"ref",reused:e?.reused??"inline",intersections:[],deferred:[],external:e?.external??void 0}}function pe(e,t,n,r,o){let s=typeof t.unrepresentable==="function"?t.unrepresentable({zodSchema:e,path:r.path,message:o}):t.unrepresentable;if(s==="any")return!1;if(s===void 0||s==="throw")throw Error(o);return Object.assign(n,s),!0}function B(e,t,n={path:[],schemaPath:[]}){var r;let o=e._zod.def,s=t.seen.get(e);if(s){if(s.count++,n.schemaPath.includes(e))s.cycle=n.path;return s.schema}let i={schema:{},count:1,cycle:void 0,path:n.path};t.seen.set(e,i),t.sharedDefsExtractedFor=void 0,t.sharedEmitDoneFor=void 0;let a=e._zod.toJSONSchema?.();if(a)i.schema=a;else{let l={...n,schemaPath:[...n.schemaPath,e],path:n.path};if(e._zod.processJSONSchema)e._zod.processJSONSchema(t,i.schema,l);else{let f=i.schema,d=t.processors[o.type];if(!d)throw Error(`[toJSONSchema]: Non-representable type encountered: ${o.type}`);d(e,t,f,l)}let p=e._zod.parent;if(p){if(!i.ref)i.ref=p;B(p,t,l),t.seen.get(p).isParent=!0}}let c=t.metadataRegistry.get(e);if(c)bt(i.schema,c);if(t.io==="input"&&X(e))delete i.schema.examples,delete i.schema.default;if(t.io==="input"&&"_prefault"in i.schema)(r=i.schema).default??(r.default=i.schema._prefault);return delete i.schema._prefault,t.seen.get(e).schema}function Fa(e){return e.replace(/~/g,"~0").replace(/\//g,"~1")}function Nr(e,t){let n=e.seen.get(t);if(!n)throw Error("Unprocessed schema. This is a bug in Zod.");if(e.external&&e.sharedDefsExtractedFor===e.external)return;let r=new Map;for(let i of e.seen.entries()){let a=e.metadataRegistry.get(i[0])?.id;if(a){let c=r.get(a);if(c&&c!==i[0])throw Error(`Duplicate schema id "${a}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);r.set(a,i[0])}}let o=(i)=>{let a=e.target==="draft-2020-12"?"$defs":"definitions";if(e.external){let p=e.external.registry.get(i[0])?.id,f=e.external.uri??((h)=>h);if(p)return{ref:f(p)};let d=i[1].defId??i[1].schema.id??`schema${e.counter++}`;return i[1].defId=d,{defId:d,ref:`${f("__shared")}#/${a}/${Fa(d)}`}}let c="#",u=`${c}/${a}/`;if(i[1]===n&&!i[1].schema.id)return{ref:c};let l=i[1].schema.id??`__schema${e.counter++}`;return{defId:l,ref:u+Fa(l)}},s=(i)=>{if(i[1].schema.$ref)return;let a=i[1],{ref:c,defId:u}=o(i);if(a.def={...a.schema},u)a.defId=u;let l=a.schema;for(let p in l)delete l[p];l.$ref=c};if(e.cycles==="throw")for(let i of e.seen.entries()){let a=i[1];if(a.cycle)throw Error(`Cycle detected: #/${a.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`)}for(let i of e.seen.entries()){let a=i[1];if(t===i[0]){s(i);continue}if(e.external){let u=e.external.registry.get(i[0])?.id;if(t!==i[0]&&u){s(i);continue}}if(e.metadataRegistry.get(i[0])?.id){s(i);continue}if(a.cycle){s(i);continue}if(a.count>1){if(e.reused==="ref")s(i)}}if(e.external)e.sharedDefsExtractedFor=e.external}function ja(e){let t=e.anyOf;if(!Array.isArray(t)||t.length===0||e.type!==void 0)return;let n=[];for(let r of t){if(!r||typeof r!=="object")return;ja(r);let o=Object.keys(r);if(o.length!==1||o[0]!=="type")return;let s=r.type;for(let i of Array.isArray(s)?s:[s]){if(typeof i!=="string")return;if(!n.includes(i))n.push(i)}}delete e.anyOf,e.type=n.length===1?n[0]:n}var Ma=new Set(["type","properties","required","additionalProperties"]),Ua=["oneOf","anyOf"];function Ba(e){let t=e.additionalProperties;if(t===void 0||t===!1||typeof t!=="object"||t===null)return null;return Object.keys(t).length?t:null}function Or(e){let t=[];for(let s of e){if(typeof s!=="object"||s.type!=="object")return null;for(let i in s)if(!Ma.has(i))return null;t.push(s)}let n={},r=new Set;for(let s of t){for(let i in s.properties){if(Object.prototype.hasOwnProperty.call(n,i))continue;let a=[];for(let u of t){let l=u.properties?.[i]??Ba(u);if(l===null||l===void 0)continue;if(!a.some((p)=>JSON.stringify(p)===JSON.stringify(l)))a.push(l)}let c=a.length===1?a[0]:Or(a)??{allOf:a};ue(n,i,c)}for(let i of s.required??[])r.add(i)}let o={type:"object",properties:n};if(r.size)o.required=[...r];if(t.every((s)=>s.additionalProperties===!1))o.additionalProperties=!1;else{let s=[];for(let i of t){let a=Ba(i);if(a&&!s.some((c)=>JSON.stringify(c)===JSON.stringify(a)))s.push(a)}if(s.length===1)o.additionalProperties=s[0];else if(s.length>1)o.additionalProperties={allOf:s}}return o}function yp(e){let t=e.allOf;if(!Array.isArray(t)||t.length<2)return;for(let o of Ma)if(o in e)return;let n=t.filter((o)=>Ua.some((s)=>Array.isArray(o[s]))),r=null;if(!n.length)r=Or(t);else{let o=n[0],s=Ua.find((c)=>Array.isArray(o[c]));if(Object.keys(o).length!==1)return;let i=t.filter((c)=>c!==o),a=o[s].map((c)=>Or([...i,c]));if(a.some((c)=>!c))return;r={[s]:a}}if(!r)return;delete e.allOf,bt(e,r)}function Dr(e,t){let n=e.seen.get(t);if(!n)throw Error("Unprocessed schema. This is a bug in Zod.");let r=(a)=>{let c=e.seen.get(a);if(c.ref===null)return;let u=c.def??c.schema,l={...u},p=c.ref;if(c.ref=null,p){r(p);let d=e.seen.get(p),h=d.schema;if(h.$ref&&(e.target==="draft-07"||e.target==="draft-04"||e.target==="openapi-3.0"))u.allOf=u.allOf??[],u.allOf.push(h);else bt(u,h);if(bt(u,l),a._zod.parent===p)for(let w in u){if(w==="$ref"||w==="allOf")continue;if(!(w in l))delete u[w]}if(h.$ref&&d.def)for(let w in u){if(w==="$ref"||w==="allOf")continue;if(w in d.def&&JSON.stringify(u[w])===JSON.stringify(d.def[w]))delete u[w]}}let f=a._zod.parent;if(f&&f!==p){r(f);let d=e.seen.get(f);if(d?.schema.$ref){if(u.$ref=d.schema.$ref,d.def)for(let h in u){if(h==="$ref"||h==="allOf")continue;if(h in d.def&&JSON.stringify(u[h])===JSON.stringify(d.def[h]))delete u[h]}}}e.override({zodSchema:a,jsonSchema:u,path:c.path??[]})};if(!e.external||e.sharedEmitDoneFor!==e.external){for(let a of[...e.seen.entries()].reverse())r(a[0]);if(e.target!=="openapi-3.0")for(let a of e.seen.entries())ja(a[1].def??a[1].schema);for(let a of e.deferred)a();if(e.intersections.length){let a=new Map;for(let c of e.seen.values())for(let u of[c.schema,c.def]){let l=u?.allOf;if(!Array.isArray(l))continue;let p=a.get(l);if(p)p.push(u);else a.set(l,[u])}for(let c of e.intersections)for(let u of a.get(c)??[])yp(u)}}let o={};if(e.target==="draft-2020-12")o.$schema="https://json-schema.org/draft/2020-12/schema";else if(e.target==="draft-07")o.$schema="http://json-schema.org/draft-07/schema#";else if(e.target==="draft-04")o.$schema="http://json-schema.org/draft-04/schema#";else if(e.target==="openapi-3.0");if(e.external?.uri){let a=e.external.registry.get(t)?.id;if(!a)throw Error("Schema is missing an `id` property");o.$id=e.external.uri(a)}bt(o,n.defId?n.schema:n.def??n.schema);let s=e.metadataRegistry.get(t)?.id;if(s!==void 0&&o.id===s)delete o.id;let i=e.external?.defs??{};if(!e.external||e.sharedEmitDoneFor!==e.external)for(let a of e.seen.entries()){let c=a[1];if(c.def&&c.defId){if(c.def.id===c.defId)delete c.def.id;ue(i,c.defId,c.def)}}if(e.external)e.sharedEmitDoneFor=e.external;if(e.external);else if(Object.keys(i).length>0)if(e.target==="draft-2020-12")o.$defs=i;else o.definitions=i;try{let a=JSON.parse(JSON.stringify(o));return Object.defineProperty(a,"~standard",{value:{...t["~standard"],jsonSchema:{input:vt(t,"input",e.processors),output:vt(t,"output",e.processors)}},enumerable:!1,writable:!1}),a}catch(a){throw Error("Error converting schema to JSON.")}}function X(e,t){let n=t??{seen:new Set};if(n.seen.has(e))return!1;n.seen.add(e);let r=e._zod.def;if(r.type==="transform")return!0;if(r.type==="array")return X(r.element,n);if(r.type==="set")return X(r.valueType,n);if(r.type==="lazy")return X(r.getter(),n);if(r.type==="promise"||r.type==="optional"||r.type==="nonoptional"||r.type==="nullable"||r.type==="readonly"||r.type==="default"||r.type==="prefault"||r.type==="catch")return X(r.innerType,n);if(r.type==="intersection")return X(r.left,n)||X(r.right,n);if(r.type==="record"||r.type==="map")return X(r.keyType,n)||X(r.valueType,n);if(r.type==="pipe"){if(e._zod.traits.has("$ZodCodec"))return!0;return X(r.in,n)||X(r.out,n)}if(r.type==="object"){for(let o in r.shape)if(X(r.shape[o],n))return!0;return!1}if(r.type==="union"){for(let o of r.options)if(X(o,n))return!0;return!1}if(r.type==="tuple"){for(let o of r.items)if(X(o,n))return!0;if(r.rest&&X(r.rest,n))return!0;return!1}return!1}var Ha=(e,t={})=>(n)=>{let r=Ir({...n,processors:t});return B(e,r),Nr(r,e),Dr(r,e)},vt=(e,t,n={})=>(r)=>{let{libraryOptions:o,target:s}=r??{},i=Ir({...o??{},target:s,io:t,processors:n});return B(e,i),Nr(i,e),Dr(i,e)};var Xe=(e,t,n)=>{if(e[t]===void 0||n>e[t])e[t]=n},Qe=(e,t,n)=>{if(e[t]===void 0||n<e[t])e[t]=n},qa=(e,t)=>{Xe(e,"minimum",t),Qe(e,"maximum",t)},Va=(e,t)=>{if(e.multipleOf??(e.multipleOf=[]),!e.multipleOf.includes(t))e.multipleOf.push(t)},Ka=(e,t)=>{e.patterns??(e.patterns=new Set),e.patterns.add(t)},Xa=(e,t)=>{e.mime=e.mime?e.mime.filter((n)=>t.includes(n)):[...t]},Qa=(e,t)=>{if(e.format=t,t.includes("int"))e.isInt=!0},Ya=(e,t)=>Xe(e,"minimum",t.minimum),Ga=(e,t)=>Qe(e,"maximum",t.maximum),Ja=(e)=>(t,n)=>{Qa(t,n.format);let[r,o]=e[n.format];Xe(t,"minimum",r),Qe(t,"maximum",o)},$p={greater_than:(e,t)=>Xe(e,t.inclusive?"minimum":"exclusiveMinimum",t.value),less_than:(e,t)=>Qe(e,t.inclusive?"maximum":"exclusiveMaximum",t.value),multiple_of:(e,t)=>Va(e,t.value),number_format:Ja(Zt),bigint_format:Ja(Qn),min_length:Ya,max_length:Ga,length_equals:(e,t)=>qa(e,t.length),min_size:Ya,max_size:Ga,size_equals:(e,t)=>qa(e,t.size),string_format:(e,t)=>{if(Qa(e,t.format),t.pattern)Ka(e,t.pattern);if(t.format==="base64"||t.format==="base64url")e.contentEncoding=t.format;if(t.local||t.precision===-1)e.laxFormat=!0},mime_type:(e,t)=>Xa(e,t.mime)};function q(e){let t={},n=e._zod.def,r=e._zod.traits.has("$ZodCheck")?[e,...n.checks??[]]:n.checks??[];for(let s of r)$p[s._zod.def.check]?.(t,s._zod.def);let o=e._zod.bag;if(o.minimum!==void 0)Xe(t,"minimum",o.minimum);if(o.exclusiveMinimum!==void 0)Xe(t,"exclusiveMinimum",o.exclusiveMinimum);if(o.maximum!==void 0)Qe(t,"maximum",o.maximum);if(o.exclusiveMaximum!==void 0)Qe(t,"exclusiveMaximum",o.exclusiveMaximum);if(o.multipleOf!==void 0)Va(t,o.multipleOf);if(o.format!==void 0){if(t.format??(t.format=o.format),o.format.includes("int"))t.isInt=!0}if(o.mime)Xa(t,o.mime);for(let s of o.patterns??[])Ka(t,s);return t}var wp={guid:"uuid",url:"uri",datetime:"date-time",json_string:"json-string",regex:""},bp=new Map([[mr,gs],[en,_s]]),ec=(e)=>bp.get(e)??e,tc=(e,t,n,r)=>{let o=n;o.type="string";let{minimum:s,maximum:i,format:a,patterns:c,contentEncoding:u,laxFormat:l}=q(e);if(typeof s==="number")o.minLength=s;if(typeof i==="number")o.maxLength=i;if(a){if(o.format=wp[a]??a,o.format==="")delete o.format;if(a==="time"||l)delete o.format}if(u)o.contentEncoding=u;if(c&&c.size>0){let p=[...c].map(ec);if(p.length===1)o.pattern=p[0].source;else if(p.length>1)o.allOf=[...p.map((f)=>({...t.target==="draft-07"||t.target==="draft-04"||t.target==="openapi-3.0"?{type:"string"}:{},pattern:f.source}))]}},nc=(e,t,n,r)=>{let o=n,{minimum:s,maximum:i,multipleOf:a,exclusiveMaximum:c,exclusiveMinimum:u,isInt:l}=q(e);o.type=l?"integer":"number";let p=typeof u==="number"&&u>=(s??Number.NEGATIVE_INFINITY),f=typeof c==="number"&&c<=(i??Number.POSITIVE_INFINITY),d=t.target==="draft-04"||t.target==="openapi-3.0";if(p)if(d)o.minimum=u,o.exclusiveMinimum=!0;else o.exclusiveMinimum=u;else if(typeof s==="number")o.minimum=s;if(f)if(d)o.maximum=c,o.exclusiveMaximum=!0;else o.exclusiveMaximum=c;else if(typeof i==="number")o.maximum=i;if(a){let h=new Set;for(let v of a)if(Number.isFinite(v)&&v!==0)h.add(Math.abs(v));else pe(e,t,o,r,`A multipleOf divisor of ${v} cannot be represented in JSON Schema`);let[_,...w]=h;if(_!==void 0)o.multipleOf=_;if(w.length)o.allOf=[...o.allOf??[],...w.map((v)=>({multipleOf:v}))]}},rc=(e,t,n,r)=>{n.type="boolean"},oc=(e,t,n,r)=>{pe(e,t,n,r,"BigInt cannot be represented in JSON Schema")};var sc=(e,t,n,r)=>{n.not={}};var ic=(e,t,n,r)=>{},ac=(e,t,n,r)=>{pe(e,t,n,r,"Date cannot be represented in JSON Schema")},cc=(e,t,n,r)=>{let o=e._zod.def,s=ft(o.entries);if(s.length===0){n.not={};return}if(s.every((i)=>typeof i==="number"))n.type="number";if(s.every((i)=>typeof i==="string"))n.type="string";n.enum=s},uc=(e,t,n,r)=>{let o=e._zod.def;if(o.values.length===0){n.not={};return}let s=[];for(let i of o.values)if(i===void 0){if(pe(e,t,n,r,"Literal `undefined` cannot be represented in JSON Schema"))return}else if(typeof i==="bigint"){if(pe(e,t,n,r,"BigInt literals cannot be represented in JSON Schema"))return;s.push(Number(i))}else s.push(i);if(s.length===0);else if(s.length===1){let i=s[0];if(n.type=i===null?"null":typeof i,t.target==="draft-04"||t.target==="openapi-3.0")n.enum=[i];else n.const=i}else{if(s.every((i)=>typeof i==="number"))n.type="number";if(s.every((i)=>typeof i==="string"))n.type="string";if(s.every((i)=>typeof i==="boolean"))n.type="boolean";if(s.every((i)=>i===null))n.type="null";n.enum=s}};var lc=(e,t,n,r)=>{pe(e,t,n,r,"Custom types cannot be represented in JSON Schema")};var pc=(e,t,n,r)=>{pe(e,t,n,r,"Transforms cannot be represented in JSON Schema")};var fc=(e,t,n,r)=>{let o=n,s=e._zod.def,{minimum:i,maximum:a}=q(e);if(typeof i==="number")o.minItems=i;if(typeof a==="number")o.maxItems=a;o.type="array",o.items=B(s.element,t,{...r,path:[...r.path,"items"]})};function dn(e){let t=e._zod.def;if(t.type==="pipe"&&t.in._zod.traits.has("$ZodTransform"))return dn(t.out);if(t.type==="catch")return dn(t.innerType);return e._zod.optin}var dc=(e,t,n,r)=>{let o=n,s=e._zod.def,i=s.shape;if(Object.getOwnPropertySymbols(i).length&&pe(e,t,o,r,"Symbol keys cannot be represented in JSON Schema"))return;o.type="object",o.properties={};for(let u in i)ue(o.properties,u,B(i[u],t,{...r,path:[...r.path,"properties",u]}));let c=[];for(let u of Object.keys(i)){let l=s.shape[u];if(t.io==="input"?dn(l)===void 0:l._zod.optout===void 0)c.push(u)}if(c.length>0)o.required=c;if(s.catchall?._zod.def.type==="never")o.additionalProperties=!1;else if(!s.catchall){if(t.io==="output")o.additionalProperties=!1}else if(s.catchall)o.additionalProperties=B(s.catchall,t,{...r,path:[...r.path,"additionalProperties"]})},hc=(e,t,n,r)=>{let o=e._zod.def,s=o.inclusive===!1,i=o.options.map((a,c)=>B(a,t,{...r,path:[...r.path,s?"oneOf":"anyOf",c]}));if(s)n.oneOf=i;else n.anyOf=i},mc=(e,t,n,r)=>{let o=e._zod.def,s=B(o.left,t,{...r,path:[...r.path,"allOf",0]}),i=B(o.right,t,{...r,path:[...r.path,"allOf",1]}),a=(u)=>("allOf"in u)&&Object.keys(u).length===1,c=[...a(s)?s.allOf:[s],...a(i)?i.allOf:[i]];n.allOf=c,t.intersections.push(c)};function Zr(e,t,n){if(t.$ref){if(n.has(t))return t;n.add(t);let h=e.get(t)?.def;if(!h)return t;let _=Zr(e,h,n);return _===h?t:_}for(let h of["anyOf","oneOf"]){let _=t[h];if(!Array.isArray(_))continue;let w=_.map((v)=>Zr(e,v,n));if(w.some((v,A)=>v!==_[A]))t={...t,[h]:w}}let r=Array.isArray(t.type)?t.type:[t.type],o=!r.includes("string")&&r.some((h)=>h==="number"||h==="integer"),s=t.enum??(t.const!==void 0?[t.const]:void 0);if(!o&&!s?.some((h)=>typeof h==="number"))return t;let{minimum:i,maximum:a,exclusiveMinimum:c,exclusiveMaximum:u,multipleOf:l,format:p,id:f,...d}=t;if(d.enum)d.enum=d.enum.map((h)=>typeof h==="number"?String(h):h);else if(typeof d.const==="number")d.const=String(d.const);if(!o)return d;if(d.type="string",!s)d.pattern=(r.includes("number")?mt:cr).source;return d}var Wr=new WeakMap;function vp(e){let t=new Map;for(let r of e.seen.values())if(r.def&&!t.has(r.schema))t.set(r.schema,r);let n=new Map;for(let r of Wr.get(e)??[]){let o=e.seen.get(r),s=(o?.def??o?.schema)?.propertyNames;if(!s||s===!0||n.has(s))continue;let i=Zr(t,s,new Set);if(i!==s)n.set(s,i)}if(!n.size)return;for(let r of e.seen.values())for(let o of[r.schema,r.def]){let s=o&&n.get(o.propertyNames);if(s)o.propertyNames=s}}var gc=(e,t,n,r)=>{let o=n,s=e._zod.def;o.type="object";let i=s.keyType,a=q(i).patterns;if(s.mode==="loose"&&a&&a.size>0){let l=B(s.valueType,t,{...r,path:[...r.path,"patternProperties","*"]});o.patternProperties={};for(let p of a)ue(o.patternProperties,ec(p).source,l)}else{if(t.target==="draft-07"||t.target==="draft-2020-12"){o.propertyNames=B(s.keyType,t,{...r,path:[...r.path,"propertyNames"]});let l=Wr.get(t);if(!l)l=[],Wr.set(t,l),t.deferred.push(()=>vp(t));l.push(e)}o.additionalProperties=B(s.valueType,t,{...r,path:[...r.path,"additionalProperties"]})}let c=i._zod.values,u=t.io==="input"&&dn(s.valueType)!==void 0;if(c&&!s.partial&&!u){let l=[...c].filter((p)=>typeof p==="string"||typeof p==="number");if(l.length>0)o.required=l.map(String)}},_c=(e,t,n,r)=>{let o=e._zod.def,s=B(o.innerType,t,r),i=t.seen.get(e);if(t.target==="openapi-3.0")i.ref=o.innerType,n.nullable=!0;else n.anyOf=[s,{type:"null"}]},yc=(e,t,n,r)=>{let o=e._zod.def;B(o.innerType,t,r);let s=t.seen.get(e);s.ref=o.innerType},Lr=Symbol();function $c(e,t,n,r,o){let s=!1,i=JSON.stringify(e,(a,c)=>{if(typeof c!=="bigint")return c;return s=!0,null});if(!s)return JSON.parse(i);return pe(t,n,r,o,"BigInt defaults cannot be represented in JSON Schema"),Lr}var wc=(e,t,n,r)=>{let o=e._zod.def;B(o.innerType,t,r);let s=t.seen.get(e);s.ref=o.innerType;let i=$c(o.defaultValue,e,t,n,r);if(i!==Lr)n.default=i},bc=(e,t,n,r)=>{let o=e._zod.def;B(o.innerType,t,r);let s=t.seen.get(e);if(s.ref=o.innerType,t.io!=="input")return;let i=$c(o.defaultValue,e,t,n,r);if(i!==Lr)n._prefault=i},vc=(e,t,n,r)=>{let o=e._zod.def;B(o.innerType,t,r);let s=t.seen.get(e);s.ref=o.innerType;let i;try{i=o.catchValue(void 0)}catch{pe(e,t,n,r,"Dynamic catch values are not supported in JSON Schema");return}n.default=i},xc=(e,t,n,r)=>{let o=e._zod.def,s=o.in._zod.traits.has("$ZodTransform"),i=t.io==="input"?s?o.out:o.in:o.out;B(i,t,r);let a=t.seen.get(e);a.ref=i},Pc=(e,t,n,r)=>{let o=e._zod.def;B(o.innerType,t,r);let s=t.seen.get(e);s.ref=o.innerType,n.readOnly=!0};var Fr=(e,t,n,r)=>{let o=e._zod.def;B(o.innerType,t,r);let s=t.seen.get(e);s.ref=o.innerType};var Sc=new WeakSet([Object.prototype,Error.prototype]);function hn(e,t,n){Object.defineProperty(e,t,{configurable:!0,enumerable:!1,get(){let r=n(this);return Object.defineProperty(this,t,{value:r,configurable:!0,writable:!0}),r},set(r){Object.defineProperty(this,t,{value:r,configurable:!0,writable:!0})}})}var Ap=(e,t)=>{jo.init(e,t),e.name="ZodError";let n=Object.getPrototypeOf(e);if(Sc.has(n))return;Sc.add(n),hn(n,"format",(r)=>(o)=>Ho(r,o)),hn(n,"flatten",(r)=>(o)=>Mo(r,o)),hn(n,"addIssue",(r)=>(o)=>{r.issues.push(o),r.message=JSON.stringify(r.issues,dt,2)}),hn(n,"addIssues",(r)=>(o)=>{r.issues.push(...o),r.message=JSON.stringify(r.issues,dt,2)}),Object.defineProperty(n,"isEmpty",{configurable:!0,enumerable:!1,get(){return this.issues.length===0}})};var re=m("ZodError",Ap,void 0,{Parent:Error});var Ec=Ht(re),kc=qt(re),zc=Yt(re),Tc=Gt(re),Rc=Yo(re),Ac=Go(re),Cc=Jo(re),Oc=Vo(re),Ic=Ko(re),Nc=Xo(re),Dc=Qo(re),Zc=es(re);function Op(){if(!Q.localeError)ne(wr())}function _n(){if(!Q.memoizer)ne({memoizer:na()})}var L=m("ZodType",(e,t)=>(Op(),N.init(e,t),e.def=t,e.type=t.type,e),{check(...e){let t=this.def;return this.clone(te(t,{checks:[...t.checks??[],...e.map((n)=>typeof n==="function"?{_zod:{check:n,def:{check:"custom"},onattach:[]}}:n)]}),{parent:!0})},with(...e){return this.check(...e)},clone(e,t){return me(this,e,t)},brand(){return this},register(e,t){return e.add(this,t),this},refine(e,t){return this.check(xf(e,t))},superRefine(e,t){return this.check(Pf(e,t))},overwrite(e){return this.check(Ne(e))},optional(){return Fc(this)},exactOptional(){return lf(this)},nullable(){return Uc(this)},nullish(){return Fc(Uc(this))},nonoptional(e){return gf(this,e)},array(){return se(this)},or(e){return $n([this,e])},and(e){return sf(this,e)},transform(e){return Bc(this,uf(e))},default(e){return df(this,e)},prefault(e){return mf(this,e)},catch(e){return yf(this,e)},pipe(e){return Bc(this,e)},readonly(){return bf(this)},describe(e){let t=this.clone();return Fe.add(t,{description:e}),t},meta(...e){if(e.length===0)return Fe.get(this);let t=this.clone();return Fe.add(t,e[0]),t},isOptional(){return this.safeParse(void 0).success},isNullable(){return this.safeParse(null).success},apply(e,...t){return t.length===0?e(this):e(this,...t)},get "~standard"(){return Bt(this,"~standard",{...hr(this),jsonSchema:{input:vt(this,"input"),output:vt(this,"output")}})},set "~standard"(e){Se(this,"~standard",e)},parse:function e(t,n){return Ec(this,t,n,{callee:e})},parseAsync:async function e(t,n){return await kc(this,t,n,{callee:e})},safeParse(e,t){return zc(this,e,t)},async safeParseAsync(e,t){return Tc(this,e,t)},get spa(){return this?.safeParseAsync},set spa(e){Se(this,"spa",e)},validate(e,t){return or(this,e,t)},validateAsync(e,t){return sr(this,e,t)},encode:function e(t,n){return Rc(this,t,n,{callee:e})},decode:function e(t,n){return Ac(this,t,n,{callee:e})},encodeAsync:async function e(t,n){return await Cc(this,t,n,{callee:e})},decodeAsync:async function e(t,n){return await Oc(this,t,n,{callee:e})},safeEncode(e,t){return Ic(this,e,t)},safeDecode(e,t){return Nc(this,e,t)},async safeEncodeAsync(e,t){return Dc(this,e,t)},async safeDecodeAsync(e,t){return Zc(this,e,t)},toJSONSchema(e){return Ha(this,{})(e)},get description(){return Fe.get(this)?.description},get _def(){return this._zod.def}}),jc=m("_ZodString",(e,t)=>{Qt.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>tc(e,n,r,o)},jt({format:(e)=>q(e).format??null,minLength:(e)=>q(e).minimum??null,maxLength:(e)=>q(e).maximum??null},{regex(...e){return this.check(vr(...e))},includes(...e){return this.check(Sr(...e))},startsWith(...e){return this.check(Er(...e))},endsWith(...e){return this.check(kr(...e))},min(...e){return this.check(Ke(...e))},max(...e){return this.check(pn(...e))},length(...e){return this.check(fn(...e))},nonempty(...e){return this.check(Ke(1,...e))},lowercase(e){return this.check(xr(e))},uppercase(e){return this.check(Pr(e))},trim(){return this.check(Tr())},normalize(...e){return this.check(zr(...e))},toLowerCase(){return this.check(Rr())},toUpperCase(){return this.check(Ar())},slugify(){return this.check(Cr())}})),Br=m("ZodString",(e,t)=>{Qt.init(e,t),jc.init(e,t)},{email(e){return this.check(aa(Ip,e))},url(e){return this.check(br(Mc,e))},jwt(e){return this.check(ka(Vp,e))},emoji(e){return this.check(da(Dp,e))},guid(e){return this.check(ca(Np,e))},uuid(e){return this.check(ua(mn,e))},uuidv4(e){return this.check(la(mn,e))},uuidv6(e){return this.check(pa(mn,e))},uuidv7(e){return this.check(fa(mn,e))},nanoid(e){return this.check(ha(Zp,e))},cuid(e){return this.check(ma(Wp,e))},cuid2(e){return this.check(ga(Lp,e))},ulid(e){return this.check(_a(Fp,e))},base64(e){return this.check(Pa(Yp,e))},base64url(e){return this.check(Sa(Gp,e))},xid(e){return this.check(ya(Up,e))},ksuid(e){return this.check($a(Bp,e))},ipv4(e){return this.check(wa(jp,e))},ipv6(e){return this.check(ba(Mp,e))},cidrv4(e){return this.check(va(Hp,e))},cidrv6(e){return this.check(xa(qp,e))},e164(e){return this.check(Ea(Jp,e))},datetime(e){return this.check(an(xt,e))},date(e){return this.check(cn(Pt,e))},time(e){return this.check(un(St,e))},duration(e){return this.check(ln(Et,e))}});function g(e){return sa(Br,e)}var F=m("ZodStringFormat",(e,t)=>{W.init(e,t),jc.init(e,t)}),xt=m("ZodISODateTime",(e,t)=>{di.init(e,t),F.init(e,t)}),Pt=m("ZodISODate",(e,t)=>{hi.init(e,t),F.init(e,t)}),St=m("ZodISOTime",(e,t)=>{mi.init(e,t),F.init(e,t)}),Et=m("ZodISODuration",(e,t)=>{gi.init(e,t),F.init(e,t)}),Ip=m("ZodEmail",(e,t)=>{ni.init(e,t),F.init(e,t)});var Np=m("ZodGUID",(e,t)=>{ei.init(e,t),F.init(e,t)});var mn=m("ZodUUID",(e,t)=>{ti.init(e,t),F.init(e,t)});var Mc=m("ZodURL",(e,t)=>{si.init(e,t),F.init(e,t)});function Hc(e){return br(Mc,e)}var Dp=m("ZodEmoji",(e,t)=>{ii.init(e,t),F.init(e,t)});var Zp=m("ZodNanoID",(e,t)=>{ai.init(e,t),F.init(e,t)});var Wp=m("ZodCUID",(e,t)=>{ci.init(e,t),F.init(e,t)});var Lp=m("ZodCUID2",(e,t)=>{ui.init(e,t),F.init(e,t)});var Fp=m("ZodULID",(e,t)=>{li.init(e,t),F.init(e,t)});var Up=m("ZodXID",(e,t)=>{pi.init(e,t),F.init(e,t)});var Bp=m("ZodKSUID",(e,t)=>{fi.init(e,t),F.init(e,t)});var jp=m("ZodIPv4",(e,t)=>{_i.init(e,t),F.init(e,t)});var Mp=m("ZodIPv6",(e,t)=>{$i.init(e,t),F.init(e,t)});var Hp=m("ZodCIDRv4",(e,t)=>{wi.init(e,t),F.init(e,t)});var qp=m("ZodCIDRv6",(e,t)=>{bi.init(e,t),F.init(e,t)});var Yp=m("ZodBase64",(e,t)=>{xi.init(e,t),F.init(e,t)});var Gp=m("ZodBase64URL",(e,t)=>{Pi.init(e,t),F.init(e,t)});var Jp=m("ZodE164",(e,t)=>{Si.init(e,t),F.init(e,t)});var Vp=m("ZodJWT",(e,t)=>{Ei.init(e,t),F.init(e,t)});var yn=m("ZodNumber",(e,t)=>{gr.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>nc(e,n,r,o),e.isFinite=!0},jt({minValue:(e)=>{let{minimum:t,exclusiveMinimum:n}=q(e);return Math.max(t??Number.NEGATIVE_INFINITY,n??Number.NEGATIVE_INFINITY)},maxValue:(e)=>{let{maximum:t,exclusiveMaximum:n}=q(e);return Math.min(t??Number.POSITIVE_INFINITY,n??Number.POSITIVE_INFINITY)},isInt:(e)=>{let{isInt:t,multipleOf:n}=q(e);return!!t||!!n?.some(Number.isSafeInteger)},format:(e)=>q(e).format??null},{gt(e,t){return this.check(Ve(e,t))},gte(e,t){return this.check(ke(e,t))},min(e,t){return this.check(ke(e,t))},lt(e,t){return this.check(Je(e,t))},lte(e,t){return this.check(Ee(e,t))},max(e,t){return this.check(Ee(e,t))},int(e){return this.check(Wc(e))},safe(e){return this.check(Wc(e))},positive(e){return this.check(Ve(0,e))},nonnegative(e){return this.check(ke(0,e))},negative(e){return this.check(Je(0,e))},nonpositive(e){return this.check(Ee(0,e))},multipleOf(e,t){return this.check(wt(e,t))},step(e,t){return this.check(wt(e,t))},finite(){return this}}));function D(e){return za(yn,e)}var Kp=m("ZodNumberFormat",(e,t)=>{ki.init(e,t),yn.init(e,t)});function Wc(e){return Ra(Kp,e)}var jr=m("ZodBoolean",(e,t)=>{zi.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>rc(e,n,r,o)});function ze(e){return Aa(jr,e)}var qc=m("ZodBigInt",(e,t)=>{Ti.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>oc(e,n,r,o)},jt({minValue:(e)=>q(e).minimum??null,maxValue:(e)=>q(e).maximum??null,format:(e)=>q(e).format??null},{gte(e,t){return this.check(ke(e,t))},min(e,t){return this.check(ke(e,t))},gt(e,t){return this.check(Ve(e,t))},lt(e,t){return this.check(Je(e,t))},lte(e,t){return this.check(Ee(e,t))},max(e,t){return this.check(Ee(e,t))},positive(e){return this.check(Ve(BigInt(0),e))},negative(e){return this.check(Je(BigInt(0),e))},nonpositive(e){return this.check(Ee(BigInt(0),e))},nonnegative(e){return this.check(ke(BigInt(0),e))},multipleOf(e,t){return this.check(wt(e,t))}}));var Xp=m("ZodUnknown",(e,t)=>{Ri.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>ic(e,n,r,o)});function gn(){return Ia(Xp)}var Qp=m("ZodNever",(e,t)=>{Ai.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>sc(e,n,r,o)});function ef(e){return Na(Qp,e)}var Yc=m("ZodDate",(e,t)=>{Ci.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>ac(e,n,r,o),e.min=(n,r)=>e.check(ke(n,r)),e.max=(n,r)=>e.check(Ee(n,r))},jt({minDate:(e)=>{let{minimum:t}=q(e);return t?new Date(t):null},maxDate:(e)=>{let{maximum:t}=q(e);return t?new Date(t):null}},{}));var tf=m("ZodArray",(e,t)=>{_n(),Oi.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>fc(e,n,r,o),e.element=t.element},{min(e,t){return this.check(Ke(e,t))},nonempty(e){return this.check(Ke(1,e))},max(e,t){return this.check(pn(e,t))},length(e,t){return this.check(fn(e,t))},unwrap(){return this.element}});function se(e,t){return Za(tf,e,t)}var nf=m("ZodObject",(e,t)=>{_n(),Di.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>dc(e,n,r,o),Ll(e,"shape",(n)=>n._zod.def.shape,!1)},{keyof(){return kt(Object.keys(this._zod.def.shape))},catchall(e){return this.clone(te(this._zod.def,{catchall:e}))},passthrough(){return this.clone(te(this._zod.def,{catchall:gn()}))},loose(){return this.clone(te(this._zod.def,{catchall:gn()}))},strict(){return this.clone(te(this._zod.def,{catchall:ef()}))},strip(){return this.clone(te(this._zod.def,{catchall:void 0}))},extend(e){return Al(this,e)},safeExtend(e){return Cl(this,e)},merge(e){return Ol(this,e)},pick(e){return Tl(this,e)},omit(e){return Rl(this,e)},partial(...e){return Io(Jc,this,e[0])},exactPartial(...e){return Io(Vc,this,e[0],"exactPartial")},required(...e){return Il(Kc,this,e[0])}});function E(e,t){let n={type:"object",shape:e??{},...b(t)};return new nf(n)}var rf=m("ZodUnion",(e,t)=>{Zi.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>hc(e,n,r,o),e.options=t.options});function $n(e,t){return new rf({type:"union",options:e,...b(t)})}var of=m("ZodIntersection",(e,t)=>{Wi.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>mc(e,n,r,o)});function sf(e,t){return new of({type:"intersection",left:e,right:t})}var Lc=m("ZodRecord",(e,t)=>{_n(),Li.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>gc(e,n,r,o),e.keyType=t.keyType,e.valueType=t.valueType});function Gc(e,t,n){if(!t||!t._zod)return new Lc({type:"record",keyType:g(),valueType:e,...b(t)});return new Lc({type:"record",keyType:e,valueType:t,...b(n)})}var Ur=m("ZodEnum",(e,t)=>{Fi.init(e,t),L.init(e,t),e._zod.processJSONSchema=(r,o,s)=>cc(e,r,o,s),e.enum=t.entries,e.options=[...e._zod.values];let n=new Set(Object.keys(t.entries));e.extract=(r,o)=>{let s={};for(let i of r)if(n.has(i))s[i]=t.entries[i];else throw Error(`Key ${i} not found in enum`);return new Ur({...t,checks:[],...b(o),entries:s})},e.exclude=(r,o)=>{let s={...t.entries};for(let i of r)if(n.has(i))delete s[i];else throw Error(`Key ${i} not found in enum`);return new Ur({...t,checks:[],...b(o),entries:s})}});function kt(e,t){let n=Array.isArray(e)?Object.fromEntries(e.map((r)=>[r,r])):e;return new Ur({type:"enum",entries:n,...b(t)})}var af=m("ZodLiteral",(e,t)=>{Ui.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>uc(e,n,r,o),e.values=new Set(t.values),Object.defineProperty(e,"value",{get(){if(t.values.length>1)throw Error("This schema contains multiple valid literal values. Use `.values` instead.");return t.values[0]}})});function wn(e,t){return new af({type:"literal",values:Array.isArray(e)?e:[e],...b(t)})}var cf=m("ZodTransform",(e,t)=>{_n(),Bi.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>pc(e,n,r,o),e._zod.parse=(n,r)=>{if(r.direction==="backward")throw new ht(e.constructor.name);n.addIssue=(s)=>{if(typeof s==="string")n.issues.push(Le(s,n.value,t));else{let i=s;if(i.fatal)i.continue=!1;if(i.code??(i.code="custom"),!("input"in i))i.input=n.value;i.inst??(i.inst=e),n.issues.push(Le(i))}};let o=t.transform(n.value,n);if(o instanceof Promise)return o.then((s)=>(n.value=s,n));return n.value=o,n}});function uf(e){return new cf({type:"transform",transform:e})}var Jc=m("ZodOptional",(e,t)=>{_r.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Fr(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function Fc(e){return new Jc({type:"optional",innerType:e})}var Vc=m("ZodExactOptional",(e,t)=>{ji.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Fr(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function lf(e){return new Vc({type:"optional",innerType:e})}var pf=m("ZodNullable",(e,t)=>{Mi.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>_c(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function Uc(e){return new pf({type:"nullable",innerType:e})}var ff=m("ZodDefault",(e,t)=>{Hi.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>wc(e,n,r,o),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});function df(e,t){return new ff({type:"default",innerType:e,get defaultValue(){return typeof t==="function"?t():Kn(t)}})}var hf=m("ZodPrefault",(e,t)=>{qi.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>bc(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function mf(e,t){return new hf({type:"prefault",innerType:e,get defaultValue(){return typeof t==="function"?t():Kn(t)}})}var Kc=m("ZodNonOptional",(e,t)=>{Yi.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>yc(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function gf(e,t){return new Kc({type:"nonoptional",innerType:e,...b(t)})}var _f=m("ZodCatch",(e,t)=>{Gi.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>vc(e,n,r,o),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});function yf(e,t){return new _f({type:"catch",innerType:e,catchValue:typeof t==="function"?t:Wo(t)})}var $f=m("ZodPipe",(e,t)=>{Ji.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>xc(e,n,r,o),e.in=t.in,e.out=t.out});function Bc(e,t){return new $f({type:"pipe",in:e,out:t})}var wf=m("ZodReadonly",(e,t)=>{Vi.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Pc(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function bf(e){return new wf({type:"readonly",innerType:e})}var vf=m("ZodCustom",(e,t)=>{Ki.init(e,t),L.init(e,t),e._zod.processJSONSchema=(n,r,o)=>lc(e,n,r,o)});function xf(e,t={}){return Wa(vf,e,t)}function Pf(e,t){return La(e,t)}function Ef(e){return an(xt,e)}function kf(e){return cn(Pt,e)}function zf(e){return un(St,e)}function Tf(e){return ln(Et,e)}function Rf(e){return ia(Br,e)}function Af(e){return Ta(yn,e)}function Cf(e){return Ca(jr,e)}function Of(e){return Oa(qc,e)}function If(e){return Da(Yc,e)}var Nf=E({name:g(),createSql:g(),approxRows:D().int().nonnegative(),dataBytes:D().int().nonnegative(),primaryKey:se(g()).nullable()}),Xc=E({charset:g(),tables:se(Nf)}),p_=E({table:g(),cursor:g().optional()}),Qc=E({sql:g(),rows:D().int().nonnegative(),next:g().nullable()});var Mr=E({code:g(),message:g(),data:E({status:D().int()}).loose().nullable().optional()});var eu=E({path:g(),size:D().int().nonnegative(),mtime:D().int()}),g_=E({cursor:g().optional()}),tu=E({entries:se(eu),next:g().nullable()}),__=E({paths:se(g()).min(1)}),nu=$n([eu.extend({missing:wn(!1).optional()}),E({path:g(),missing:wn(!0)})]),y_=E({path:g(),offset:zt.number().int().nonnegative(),length:zt.number().int().positive()}),ru="X-Wpsync-File-Size";var vn=D().int().nonnegative(),Df=kt(["mariadb","mysql","unknown"]),Zf=E({file:g(),name:g(),version:g(),active:ze()}),Wf=E({file:g(),name:g(),version:g()}),Lf=E({file:g(),name:g()}),tt=E({bridge:E({version:g(),protocolVersion:D().int(),deadline:bn.datetime({offset:!0})}),site:E({siteUrl:Hc(),homeUrl:Hc(),name:g(),multisite:ze(),locale:g(),timezone:g(),environment:g()}),wordpress:E({version:g()}),php:E({version:g(),sapi:g(),extensions:se(g()),memoryLimit:vn.nullable(),maxExecutionTime:D().int().nonnegative(),uploadMaxFilesize:vn.nullable(),postMaxSize:vn.nullable()}),server:E({software:g().nullable(),time:bn.datetime({offset:!0})}),database:E({engine:Df,version:g(),serverInfo:g(),charset:g(),collate:g(),tablePrefix:g()}),theme:E({stylesheet:g(),template:g(),name:g(),version:g()}),plugins:se(Zf),muPlugins:se(Wf),dropins:se(Lf),paths:E({abspath:g(),contentDir:g(),pluginsDir:g(),uploadsDir:g()}),capabilities:E({fileModsAllowed:ze(),filesystemMethod:g(),writable:E({abspath:ze(),contentDir:ze(),uploadsDir:ze()}),diskFreeBytes:vn.nullable()})});function Ff(e,t){if(!e.includes("*"))return e===t;return new RegExp(`^${e.split("*").map(Uf).join(".*")}$`).test(t)}function Uf(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Ue(e,t=wo){let n=e.split("/");return t.some((r)=>{let o=r.split("/");if(o.length>n.length)return!1;return o.every((s,i)=>Ff(s,n[i]))})}function ou(e){if(e===""||e.startsWith("/")||e.includes("\\")||e.includes("\x00"))return!1;return e.split("/").every((t)=>t!==""&&t!=="."&&t!=="..")}var S_=E({since:g()}),su=E({since:g(),posts:Gc(g(),D().int().nonnegative()),comments:D().int().nonnegative(),users:D().int().nonnegative()}),E_=E({dbBytes:D().int().nonnegative(),filesBytes:D().int().nonnegative(),includeHtaccess:ze()}),iu=E({stageId:g(),newPrefix:g(),chunkBytes:D().int().positive()}),Bf=kt(["db","files"]),k_=E({stage:g(),part:Bf,seq:zt.number().int().nonnegative(),sha256:g().regex(/^[0-9a-f]{64}$/)}),au=E({received:D().int().nonnegative()}),z_=$n([E({path:g(),size:D().int().nonnegative(),mtime:D().int(),delete:wn(!1).optional()}),E({path:g(),delete:wn(!0)})]),T_=E({stage:g(),chunks:E({db:D().int().nonnegative(),files:D().int().nonnegative()})}),jf=kt(["assemble","import","carry","maintenance","files","swap","cleanup","applied","rollback-maintenance","rollback-files","rollback-swap","rolled-back","finalize","finalized","failed"]),cu=E({stageId:g(),step:jf,done:ze(),progress:E({done:D(),total:D()}).nullable(),skipped:se(g()),error:g().nullable()}),R_=E({stage:g()});import{hostname as fd}from"os";class y extends Error{code;hint;constructor(e,t,n){super(t);this.code=e;this.hint=n;this.name="WpsyncError"}}class Hr{cookies=new Map;set(e,t){this.cookies.set(e,t)}has(e){return[...this.cookies.keys()].some((t)=>t.startsWith(e))}absorb(e){for(let t of e.getSetCookie()){let[n="",...r]=t.split(";"),o=n.indexOf("=");if(o<=0)continue;let s=n.slice(0,o).trim(),i=n.slice(o+1).trim();if(Mf(r)||i===""||i==="deleted")this.cookies.delete(s);else this.cookies.set(s,i)}}header(){if(this.cookies.size===0)return;return[...this.cookies].map(([e,t])=>`${e}=${t}`).join("; ")}}function Mf(e){for(let t of e){let[n="",r=""]=t.trim().split("=",2);if(n.toLowerCase()==="max-age"&&Number(r)<=0)return!0;if(n.toLowerCase()==="expires"){let o=Date.parse(r);if(!Number.isNaN(o)&&o<Date.now())return!0}}return!1}var Hf="wpsync/0.1 (+https://github.com/AlexMaghen/wp-dev-automation)",qf=5;async function Y(e,t={}){let n=t.method??"GET",r=t.follow??n==="GET",o=e;for(let s=0;;s++){let i={"User-Agent":Hf,...t.headers},a=t.jar?.header();if(a)i.Cookie=a;let c;try{c=await fetch(o,{method:s===0?n:"GET",headers:i,body:s===0?t.body:void 0,redirect:"manual"})}catch(p){let f=p instanceof Error&&p.cause instanceof Error?p.cause.message:String(p);throw new y("unreachable",`Couldn't reach ${new URL(o).origin}: ${f}`)}t.jar?.absorb(c.headers);let u=c.headers.get("location");if(r&&u&&c.status>=300&&c.status<400&&s<qf){await c.arrayBuffer(),o=new URL(u,o).toString();continue}let l=Buffer.from(await c.arrayBuffer());return{status:c.status,url:o,headers:c.headers,bytes:l,text:l.toString("utf8")}}}function we(e){try{return JSON.parse(e)}catch{return}}class xn{site;jar;constructor(e,t){this.site=e;this.jar=t}static async login(e,t,n){let r=new Hr;r.set("wordpress_test_cookie","WP%20Cookie%20check");let o=`${e.siteUrl}/wp-login.php`,s=await Y(o,{jar:r});if(s.status===404||!/name=["']log["']/.test(s.text))throw new y("login_page_missing",`The site's login page isn't at ${o}.`,"A security plugin may have moved it. Create an Application Password yourself (Users \u2192 Profile) and use that instead.");let i=await Y(o,{method:"POST",jar:r,headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({log:t,pwd:n,"wp-submit":"Log In",redirect_to:`${e.siteUrl}/wp-admin/`,testcookie:"1"}).toString()});if(r.has("wordpress_logged_in_"))return new xn(e,r);let a=/<div[^>]+id=["']login_error["'][^>]*>([\s\S]*?)<\/div>/i.exec(i.text);if(a?.[1])throw new y("login_failed",`WordPress refused the login: ${Yf(a[1])}`);throw new y("login_blocked","The login didn't complete. The site probably asks for a second step, such as two-factor or a CAPTCHA.","Create an Application Password yourself (Users \u2192 Profile \u2192 Application Passwords) and use that instead.")}async restNonce(){let e=await Y(`${this.site.siteUrl}/wp-admin/admin-ajax.php?action=rest-nonce`,{jar:this.jar}),t=e.text.trim();if(e.status!==200||!/^[a-f0-9]{6,}$/i.test(t))throw new y("nonce_failed","WordPress didn't hand out a REST nonce for the login session.");return t}async rest(e,t,n){let r={Accept:"application/json","X-WP-Nonce":await this.restNonce()};if(n!==void 0)r["Content-Type"]="application/json";let o=await Y(this.site.restUrl(t),{method:e,jar:this.jar,headers:r,body:n===void 0?void 0:JSON.stringify(n)});return{status:o.status,body:we(o.text)??o.text}}async createApplicationPassword(e){let t=await this.rest("POST","/wp/v2/users/me/application-passwords",{name:e}),n=E({uuid:g(),password:g()}).safeParse(t.body);if(t.status!==201||!n.success){let r=t.body?.code;throw new y("application_password_failed",`WordPress wouldn't create an Application Password (HTTP ${t.status}${r?`, ${r}`:""}).`,r==="application_passwords_disabled"?"A plugin or setting has turned Application Passwords off. Turn them back on and connect again.":void 0)}return n.data}async deleteApplicationPassword(e){let t=await this.rest("DELETE",`/wp/v2/users/me/application-passwords/${e}`);if(t.status!==200&&t.status!==404)throw new y("application_password_delete_failed",`Couldn't revoke an old wpsync key (HTTP ${t.status}).`)}async uploadPlugin(e,t){let n=await Y(`${this.site.siteUrl}/wp-admin/plugin-install.php?tab=upload`,{jar:this.jar}),r=n.text.slice(Math.max(0,n.text.indexOf("plugin-upload-form"))),o=/name=["']_wpnonce["']\s+value=["']([^"']+)["']/.exec(r)?.[1];if(n.status!==200||!o)throw new y("plugin_upload_unavailable","This site doesn't allow uploading plugins from wp-admin.","The host has probably turned plugin installs off (DISALLOW_FILE_MODS). wpsync needs them for its bridge.");let s=new FormData;s.set("_wpnonce",o),s.set("_wp_http_referer",new URL(`${this.site.siteUrl}/wp-admin/plugin-install.php?tab=upload`).pathname+"?tab=upload"),s.set("pluginzip",new Blob([new Uint8Array(e)],{type:"application/zip"}),t),s.set("install-plugin-submit","Install Now");let i=await Y(`${this.site.siteUrl}/wp-admin/update.php?action=upload-plugin`,{method:"POST",jar:this.jar,body:s});if(/request-filesystem-credentials-form/.test(i.text))throw new y("filesystem_credentials","WordPress asked for FTP details to install the bridge: it can't write plugin files itself on this host.")}async logout(){try{let e=await Y(`${this.site.siteUrl}/wp-admin/`,{jar:this.jar}),t=/wp-login\.php\?action=logout(?:&#038;|&amp;|&)_wpnonce=([a-f0-9]+)/i.exec(e.text);if(t?.[1])await Y(`${this.site.siteUrl}/wp-login.php?action=logout&_wpnonce=${t[1]}`,{jar:this.jar})}catch{}}}function Yf(e){return e.replace(/<[^>]+>/g," ").replace(/&nbsp;|&#160;/g," ").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#0?39;|&apos;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\s+/g," ").replace(/\s*Lost your password\?\s*$/i,"").trim()}import{createRequire as Gf}from"module";var Jf=Gf("/"),nt,Vf,Kf;try{nt=Jf("worker_threads"),Vf=nt.Worker,Kf=nt.isMarkedAsUntransferable}catch(e){}var V=Uint8Array,oe=Uint16Array,Kr=Int32Array,Xr=new V([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Qr=new V([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),uu=new V([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),mu=function(e,t){var n=new oe(31);for(var r=0;r<31;++r)n[r]=t+=1<<e[r-1];var o=new Kr(n[30]);for(var r=1;r<30;++r)for(var s=n[r];s<n[r+1];++s)o[s]=s-n[r]<<5|r;return{b:n,r:o}},nt=mu(Xr,2),Xf=nt.b,Yr=nt.r;Xf[28]=258,Yr[258]=28;var gu=mu(Qr,0),{b:G_,r:lu}=gu,Gr=new oe(32768);for(T=0;T<32768;++T)be=(T&43690)>>1|(T&21845)<<1,be=(be&52428)>>2|(be&13107)<<2,be=(be&61680)>>4|(be&3855)<<4,Gr[T]=((be&65280)>>8|(be&255)<<8)>>1;var be,T,At=function(e,t,n){var r=e.length,o=0,s=new oe(t);for(;o<r;++o)if(e[o])++s[e[o]-1];var i=new oe(t);for(o=1;o<t;++o)i[o]=i[o-1]+s[o-1]<<1;var a;if(n){a=new oe(1<<t);var c=15-t;for(o=0;o<r;++o)if(e[o]){var u=o<<4|e[o],l=t-e[o],p=i[e[o]-1]++<<l;for(var f=p|(1<<l)-1;p<=f;++p)a[Gr[p]>>c]=u}}else{a=new oe(r);for(o=0;o<r;++o)if(e[o])a[o]=Gr[i[e[o]-1]++]>>15-e[o]}return a},Be=new V(288);for(T=0;T<144;++T)Be[T]=8;var T;for(T=144;T<256;++T)Be[T]=9;var T;for(T=256;T<280;++T)Be[T]=7;var T;for(T=280;T<288;++T)Be[T]=8;var T,Pn=new V(32);for(T=0;T<32;++T)Pn[T]=5;var T,Qf=At(Be,9,0);var ed=At(Pn,5,0);var _u=function(e){return(e+7)/8|0},yu=function(e,t,n){if(t==null||t<0)t=0;if(n==null||n>e.length)n=e.length;return new V(e.subarray(t,n))};var td=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],En=function(e,t,n){var r=Error(t||td[e]);if(r.code=e,Error.captureStackTrace)Error.captureStackTrace(r,En);if(!n)throw r;return r};var Te=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8},Tt=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8,e[r+2]|=n>>16},qr=function(e,t){var n=[];for(var r=0;r<e.length;++r)if(e[r])n.push({s:r,f:e[r]});var o=n.length,s=n.slice();if(!o)return{t:wu,l:0};if(o==1){var i=new V(n[0].s+1);return i[n[0].s]=1,{t:i,l:1}}n.sort(function(k,P){return k.f-P.f}),n.push({s:-1,f:25001});var a=n[0],c=n[1],u=0,l=1,p=2;n[0]={s:-1,f:a.f+c.f,l:a,r:c};while(l!=o-1)a=n[n[u].f<n[p].f?u++:p++],c=n[u!=l&&n[u].f<n[p].f?u++:p++],n[l++]={s:-1,f:a.f+c.f,l:a,r:c};var f=s[0].s;for(var r=1;r<o;++r)if(s[r].s>f)f=s[r].s;var d=new oe(f+1),h=Jr(n[l-1],d,0);if(h>t){var r=0,_=0,w=h-t,v=1<<w;s.sort(function(P,R){return d[R.s]-d[P.s]||P.f-R.f});for(;r<o;++r){var A=s[r].s;if(d[A]>t)_+=v-(1<<h-d[A]),d[A]=t;else break}_>>=w;while(_>0){var z=s[r].s;if(d[z]<t)_-=1<<t-d[z]++-1;else++r}for(;r>=0&&_;--r){var O=s[r].s;if(d[O]==t)--d[O],++_}h=t}return{t:new V(d),l:h}},Jr=function(e,t,n){return e.s==-1?Math.max(Jr(e.l,t,n+1),Jr(e.r,t,n+1)):t[e.s]=n},pu=function(e){var t=e.length;while(t&&!e[--t]);var n=new oe(++t),r=0,o=e[0],s=1,i=function(c){n[r++]=c};for(var a=1;a<=t;++a)if(e[a]==o&&a!=t)++s;else{if(!o&&s>2){for(;s>138;s-=138)i(32754);if(s>2)i(s>10?s-11<<5|28690:s-3<<5|12305),s=0}else if(s>3){i(o),--s;for(;s>6;s-=6)i(8304);if(s>2)i(s-3<<5|8208),s=0}while(s--)i(o);s=1,o=e[a]}return{c:n.subarray(0,r),n:t}},Rt=function(e,t){var n=0;for(var r=0;r<t.length;++r)n+=e[r]*t[r];return n},$u=function(e,t,n){var r=n.length,o=_u(t+2);e[o]=r&255,e[o+1]=r>>8,e[o+2]=e[o]^255,e[o+3]=e[o+1]^255;for(var s=0;s<r;++s)e[o+s+4]=n[s];return(o+4+r)*8},fu=function(e,t,n,r,o,s,i,a,c,u,l){Te(t,l++,n),++o[256];var p=qr(o,15),{t:f,l:d}=p,h=qr(s,15),{t:_,l:w}=h,v=pu(f),{c:A,n:z}=v,O=pu(_),{c:k,n:P}=O,R=new oe(19);for(var S=0;S<A.length;++S)++R[A[S]&31];for(var S=0;S<k.length;++S)++R[k[S]&31];var x=qr(R,7),{t:I,l:j}=x,K=19;for(;K>4&&!I[uu[K-1]];--K);var Re=u+5<<3,ie=Rt(o,Be)+Rt(s,Pn)+i,ae=Rt(o,f)+Rt(s,_)+i+14+3*K+Rt(R,I)+2*R[16]+3*R[17]+7*R[18];if(c>=0&&Re<=ie&&Re<=ae)return $u(t,l,e.subarray(c,c+u));var fe,M,ce,Ae;if(Te(t,l,1+(ae<ie)),l+=2,ae<ie){fe=At(f,d,0),M=f,ce=At(_,w,0),Ae=_;var Un=At(I,j,0);Te(t,l,z-257),Te(t,l+5,P-1),Te(t,l+10,K-4),l+=14;for(var S=0;S<K;++S)Te(t,l+3*S,I[uu[S]]);l+=3*K;var de=[A,k];for(var ut=0;ut<2;++ut){var qe=de[ut];for(var S=0;S<qe.length;++S){var he=qe[S]&31;if(Te(t,l,Un[he]),l+=I[he],he>15)Te(t,l,qe[S]>>5&127),l+=qe[S]>>12}}}else fe=Qf,M=Be,ce=ed,Ae=Pn;for(var S=0;S<a;++S){var J=r[S];if(J>255){var he=J>>18&31;if(Tt(t,l,fe[he+257]),l+=M[he+257],he>7)Te(t,l,J>>23&31),l+=Xr[he];var Ye=J&31;if(Tt(t,l,ce[Ye]),l+=Ae[Ye],Ye>3)Tt(t,l,J>>5&8191),l+=Qr[Ye]}else Tt(t,l,fe[J]),l+=M[J]}return Tt(t,l,fe[256]),l+M[256]},nd=new Kr([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),wu=new V(0),rd=function(e,t,n,r,o,s){var i=s.z||e.length,a=new V(r+i+5*(1+Math.ceil(i/7000))+o),c=a.subarray(r,a.length-o),u=s.l,l=(s.r||0)&7;if(t){if(l)c[0]=s.r>>3;var p=nd[t-1],f=p>>13,d=p&8191,h=(1<<n)-1,_=s.p||new oe(32768),w=s.h||new oe(h+1),v=Math.ceil(n/3),A=2*v,z=function(Mn){return(e[Mn]^e[Mn+1]<<v^e[Mn+2]<<A)&h},O=new Kr(25000),k=new oe(288),P=new oe(32),R=0,S=0,x=s.i||0,I=0,j=s.w||0,K=0;for(;x+2<i;++x){var Re=z(x),ie=x&32767,ae=w[Re];if(_[ie]=ae,w[Re]=ie,j<=x){var fe=i-x;if((R>7000||I>24576)&&(fe>423||!u)){l=fu(e,c,0,O,k,P,S,I,K,x-K,l),I=R=S=0,K=x;for(var M=0;M<286;++M)k[M]=0;for(var M=0;M<30;++M)P[M]=0}var ce=2,Ae=0,Un=d,de=ie-ae&32767;if(fe>2&&Re==z(x-de)){var ut=Math.min(f,fe)-1,qe=Math.min(32767,x),he=Math.min(258,fe);while(de<=qe&&--Un&&ie!=ae){if(e[x+ce]==e[x+ce-de]){var J=0;for(;J<he&&e[x+J]==e[x+J-de];++J);if(J>ce){if(ce=J,Ae=de,J>ut)break;var Ye=Math.min(de,J-2),ho=0;for(var M=0;M<Ye;++M){var Bn=x-de+M&32767,Pl=_[Bn],mo=Bn-Pl&32767;if(mo>ho)ho=mo,ae=Bn}}}ie=ae,ae=_[ie],de+=ie-ae&32767}}if(Ae){O[I++]=268435456|Yr[ce]<<18|lu[Ae];var go=Yr[ce]&31,_o=lu[Ae]&31;S+=Xr[go]+Qr[_o],++k[257+go],++P[_o],j=x+ce,++R}else O[I++]=e[x],++k[e[x]]}}for(x=Math.max(x,j);x<i;++x)O[I++]=e[x],++k[e[x]];if(l=fu(e,c,u,O,k,P,S,I,K,x-K,l),!u)s.r=l&7|c[l/8|0]<<3,l-=7,s.h=w,s.p=_,s.i=x,s.w=j}else{for(var x=s.w||0;x<i+u;x+=65535){var jn=x+65535;if(jn>=i)c[l/8|0]=u,jn=i;l=$u(c,l+1,e.subarray(x,jn))}s.i=i}return yu(a,0,r+_u(l)+o)},od=function(){var e=new Int32Array(256);for(var t=0;t<256;++t){var n=t,r=9;while(--r)n=(n&1&&-306674912)^n>>>1;e[t]=n}return e}(),sd=function(){var e=-1;return{p:function(t){var n=e;for(var r=0;r<t.length;++r)n=od[n&255^t[r]]^n>>>8;e=n},d:function(){return~e}}};var id=function(e,t,n,r,o){if(!o){if(o={l:1},t.dictionary){var s=t.dictionary.subarray(-32768),i=new V(s.length+e.length);i.set(s),i.set(e,s.length),e=i,o.w=s.length}}return rd(e,t.level==null?6:t.level,t.mem==null?o.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,n,r,o)},bu=function(e,t){var n={};for(var r in e)n[r]=e[r];for(var r in t)n[r]=t[r];return n};var G=function(e,t,n){for(;n;++t)e[t]=n,n>>>=8};function ad(e,t){return id(e,t||{},0,0)}var vu=function(e,t,n,r){for(var o in e){var s=e[o],i=t+o,a=r;if(Array.isArray(s))a=bu(r,s[1]),s=s[0];if(ArrayBuffer.isView(s))n[i]=[s,a];else n[i+="/"]=[new V(0),a],vu(s,i,n,r)}},du=typeof TextEncoder<"u"&&new TextEncoder,cd=typeof TextDecoder<"u"&&new TextDecoder,ud=0;try{cd.decode(wu,{stream:!0}),ud=1}catch(e){}function Sn(e,t){if(t){var n=new V(e.length);for(var r=0;r<e.length;++r)n[r]=e.charCodeAt(r);return n}if(du)return du.encode(e);var o=e.length,s=new V(e.length+(e.length>>1)),i=0,a=function(l){s[i++]=l};for(var r=0;r<o;++r){if(i+5>s.length){var c=new V(i+8+(o-r<<1));c.set(s),s=c}var u=e.charCodeAt(r);if(u<128||t)a(u);else if(u<2048)a(192|u>>6),a(128|u&63);else if(u>55295&&u<57344)u=65536+(u&1047552)|e.charCodeAt(++r)&1023,a(240|u>>18),a(128|u>>12&63),a(128|u>>6&63),a(128|u&63);else a(224|u>>12),a(128|u>>6&63),a(128|u&63)}return yu(s,0,i)}var Vr=function(e){var t=0;if(e)for(var n in e){var r=e[n].length;if(r>65535)En(9);t+=r+4}return t},hu=function(e,t,n,r,o,s,i,a){var c=r.length,u=n.extra,l=a&&a.length,p=Vr(u);if(G(e,t,i!=null?33639248:67324752),t+=4,i!=null)e[t++]=20,e[t++]=n.os;e[t]=20,t+=2,e[t++]=n.flag<<1|(s<0&&8),e[t++]=o&&8,e[t++]=n.compression&255,e[t++]=n.compression>>8;var f=new Date(n.mtime==null?Date.now():n.mtime),d=f.getFullYear()-1980;if(d<0||d>119)En(10);if(G(e,t,d<<25|f.getMonth()+1<<21|f.getDate()<<16|f.getHours()<<11|f.getMinutes()<<5|f.getSeconds()>>1),t+=4,s!=-1)G(e,t,n.crc),G(e,t+4,s<0?-s-2:s),G(e,t+8,n.size);if(G(e,t+12,c),G(e,t+14,p),t+=16,i!=null)G(e,t,l),G(e,t+6,n.attrs),G(e,t+10,i),t+=14;if(e.set(r,t),t+=c,p)for(var h in u){var _=u[h],w=_.length;G(e,t,+h),G(e,t+2,w),e.set(_,t+4),t+=4+w}if(l)e.set(a,t),t+=l;return t},ld=function(e,t,n,r,o){G(e,t,101010256),G(e,t+8,n),G(e,t+10,n),G(e,t+12,r),G(e,t+16,o)};function xu(e,t){if(!t)t={};var n={},r=[];vu(e,"",n,t);var o=0,s=0;for(var i in n){var a=n[i],c=a[0],u=a[1],l=u.level==0?0:8,p=Sn(i),f=p.length,d=u.comment,h=d&&Sn(d),_=h&&h.length,w=Vr(u.extra);if(f>65535)En(11);var v=l?ad(c,u):c,A=v.length,z=sd();z.p(c),r.push(bu(u,{size:c.length,crc:z.d(),c:v,f:p,m:h,u:f!=i.length||h&&d.length!=_,o,compression:l})),o+=30+f+w+A,s+=76+2*(f+w)+(_||0)+A}var O=new V(s+22),k=o,P=s-o;for(var R=0;R<r.length;++R){var p=r[R];hu(O,p.o,p,p.f,p.u,p.c.length);var S=30+p.f.length+Vr(p.extra);O.set(p.c,p.o+S),hu(O,o,p,p.f,p.u,p.c.length,p.o,p.m),o+=16+S+(p.m?p.m.length:0)}return ld(O,o,r.length,P,k),O}var kn={"includes/class-wpsync-changes.php":`<?php
/**
 * GET changes?since=<ISO time>: what people changed on live since the last pull, which a push
 * would overwrite. Shape: ChangesResponse in packages/protocol/src/push.ts.
 *
 * @package WpsyncBridge
 */

defined( 'ABSPATH' ) || exit;

class Wpsync_Changes {

	public static function handle( WP_REST_Request $request ) {
		global $wpdb;
		$since = strtotime( (string) $request->get_param( 'since' ) );
		if ( false === $since ) {
			return new WP_Error( WPSYNC_ERROR_BAD_REQUEST, 'since must be a date and time.', array( 'status' => 400 ) );
		}
		$gmt = gmdate( 'Y-m-d H:i:s', $since );

		$posts = array();
		$rows  = $wpdb->get_results(
			$wpdb->prepare(
				"SELECT post_type, COUNT(*) AS n FROM {$wpdb->posts} WHERE post_modified_gmt > %s AND post_type NOT IN ('revision', 'auto-draft', 'customize_changeset', 'oembed_cache') AND post_status <> 'auto-draft' GROUP BY post_type",
				$gmt
			)
		);
		foreach ( (array) $rows as $row ) {
			$posts[ $row->post_type ] = (int) $row->n;
		}

		return rest_ensure_response(
			array(
				'since'    => gmdate( 'c', $since ),
				'posts'    => (object) $posts,
				'comments' => (int) $wpdb->get_var( $wpdb->prepare( "SELECT COUNT(*) FROM {$wpdb->comments} WHERE comment_date_gmt > %s", $gmt ) ),
				'users'    => (int) $wpdb->get_var( $wpdb->prepare( "SELECT COUNT(*) FROM {$wpdb->users} WHERE user_registered > %s", $gmt ) ),
			)
		);
	}
}
`,"includes/class-wpsync-db.php":`<?php
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
	public static function table_names() {
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

	public static function primary_key( $table ) {
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
	public static function columns( $table ) {
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

	public static function literal( $value, $is_binary ) {
		if ( null === $value ) {
			return 'NULL';
		}
		if ( $is_binary ) {
			return '' === $value ? "''" : '0x' . bin2hex( $value );
		}
		return self::literal_text( $value );
	}

	public static function literal_text( $value ) {
		global $wpdb;
		if ( null === $value ) {
			return 'NULL';
		}
		// _real_escape() adds WordPress's % placeholder escaping; take it back out for raw SQL.
		return "'" . $wpdb->remove_placeholder_escape( $wpdb->_real_escape( (string) $value ) ) . "'";
	}

	public static function ident( $name ) {
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

	/**
	 * Writes one table as framed SQL (see packages/protocol/src/push.ts) under a new name:
	 * DROP, CREATE, then INSERTs of at most ~500 KB each. Used on the local copy when pushing.
	 *
	 * @param resource $out Open file handle.
	 */
	public static function export_framed( $table, $new_name, $out ) {
		global $wpdb;
		$create = $wpdb->get_row( 'SHOW CREATE TABLE ' . self::ident( $table ), ARRAY_N );
		// SHOW CREATE TABLE starts with exactly "CREATE TABLE \`name\`": swap the name there only.
		$create_sql = preg_replace( '/^CREATE TABLE \`(?:[^\`]|\`\`)+\`/', 'CREATE TABLE ' . self::ident( $new_name ), $create[1], 1 );
		self::frame( $out, 'DROP TABLE IF EXISTS ' . self::ident( $new_name ) );
		self::frame( $out, $create_sql );

		$columns = self::columns( $table );
		$pk      = self::primary_key( $table );
		$select  = implode( ', ', array_map( array( __CLASS__, 'ident' ), array_keys( $columns ) ) );
		$prefix  = 'INSERT INTO ' . self::ident( $new_name ) . ' (' . $select . ') VALUES ';
		$after   = null;
		$offset  = 0;
		$rows    = 0;
		do {
			$sql = "SELECT {$select} FROM " . self::ident( $table );
			if ( $pk ) {
				if ( null !== $after ) {
					$sql .= ' WHERE (' . implode( ', ', array_map( array( __CLASS__, 'ident' ), $pk ) ) . ') > ('
						. implode( ', ', array_map( array( __CLASS__, 'literal_text' ), $after ) ) . ')';
				}
				$sql .= ' ORDER BY ' . implode( ', ', array_map( array( __CLASS__, 'ident' ), $pk ) ) . ' LIMIT ' . WPSYNC_DB_ROWS_LIMIT;
			} else {
				$sql .= ' LIMIT ' . $offset . ', ' . WPSYNC_DB_ROWS_LIMIT;
			}
			$batch     = (array) $wpdb->get_results( $sql, ARRAY_A ); // phpcs:ignore WordPress.DB.PreparedSQL
			$statement = '';
			foreach ( $batch as $row ) {
				$values = array();
				foreach ( $columns as $name => $is_binary ) {
					$values[] = self::literal( $row[ $name ], $is_binary );
				}
				$tuple = '(' . implode( ',', $values ) . ')';
				if ( '' !== $statement && strlen( $statement ) + strlen( $tuple ) > 500000 ) {
					self::frame( $out, $statement );
					$statement = '';
				}
				$statement .= ( '' === $statement ? $prefix : ',' ) . $tuple;
			}
			if ( '' !== $statement ) {
				self::frame( $out, $statement );
			}
			$rows += count( $batch );
			if ( $pk && $batch ) {
				$last  = end( $batch );
				$after = array();
				foreach ( $pk as $column ) {
					$after[] = $last[ $column ];
				}
			}
			$offset += count( $batch );
		} while ( count( $batch ) === WPSYNC_DB_ROWS_LIMIT );
		return $rows;
	}

	/** Writes one statement framed as "<byte length>\\n<statement>\\n". */
	public static function frame( $out, $statement ) {
		fwrite( $out, strlen( $statement ) . "\\n" . $statement . "\\n" ); // phpcs:ignore WordPress.WP.AlternativeFunctions
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

	/** Pushes back the deadline while a long push is still working. */
	public static function extend() {
		update_option( WPSYNC_OPTION_DEADLINE, time() + WPSYNC_DEADLINE_SECONDS, false );
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
`,"includes/class-wpsync-maintenance.php":`<?php
/**
 * The maintenance page during a push. WordPress's own .maintenance file would block the
 * bridge's requests too (it's checked before any plugin loads), so the bridge runs its own:
 * while the OPTION_MAINTENANCE time is in the future, every request except the bridge's own
 * REST calls (and WP-CLI) gets a 503 page.
 *
 * The time is renewed by every push step, so a push that crashes leaves the site down for at
 * most WPSYNC_MAINTENANCE_SECONDS; the bridge's own deadline switches it off sooner or later
 * anyway.
 *
 * @package WpsyncBridge
 */

defined( 'ABSPATH' ) || exit;

class Wpsync_Maintenance {

	public static function start() {
		update_option( WPSYNC_OPTION_MAINTENANCE, time() + WPSYNC_MAINTENANCE_SECONDS, true );
	}

	public static function stop() {
		delete_option( WPSYNC_OPTION_MAINTENANCE );
	}

	/** Runs while the plugin file loads: as early as a plugin can stop a request. */
	public static function gate() {
		if ( ( defined( 'WP_CLI' ) && WP_CLI ) || (int) get_option( WPSYNC_OPTION_MAINTENANCE, 0 ) <= time() ) {
			return;
		}
		if ( self::is_bridge_request() ) {
			return;
		}
		status_header( 503 );
		header( 'Retry-After: 120' );
		header( 'Content-Type: text/html; charset=utf-8' );
		nocache_headers();
		echo '<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Updating</title></head>'
			. '<body style="font-family:system-ui,sans-serif;max-width:32rem;margin:15vh auto;padding:0 1rem;color:#333">'
			. '<h1 style="font-weight:600">Back in a moment</h1><p>This site is being updated. Please try again in a few minutes.</p></body></html>';
		exit;
	}

	/** The bridge's own routes, and core's plugin route it uses to switch itself on and off. */
	private static function is_bridge_request() {
		$uri   = isset( $_SERVER['REQUEST_URI'] ) ? (string) wp_unslash( $_SERVER['REQUEST_URI'] ) : ''; // phpcs:ignore WordPress.Security.ValidatedSanitizedInput
		$route = isset( $_GET['rest_route'] ) ? (string) wp_unslash( $_GET['rest_route'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification, WordPress.Security.ValidatedSanitizedInput
		foreach ( array( '/' . WPSYNC_REST_NAMESPACE . '/', '/wp/v2/plugins' ) as $prefix ) {
			if ( false !== strpos( $uri, '/wp-json' . $prefix ) || 0 === strpos( $route, $prefix ) ) {
				return true;
			}
		}
		return false;
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
`,"includes/class-wpsync-stage.php":`<?php
/**
 * Publishing: POST stage/begin, PUT stage/chunk, POST stage/apply, POST rollback, POST finalize.
 * Shapes and the uploaded formats: packages/protocol/src/push.ts.
 *
 * A stage lives in wp-content/uploads/wpsync-<id>/ (never served, never pulled or pushed) with
 * state.json. Apply, rollback and finalize each work for at most WPSYNC_TIME_BUDGET_SECONDS per
 * call and are called again until done, so no host time limit stops them. Every step can be
 * repeated after a crash without harm.
 *
 * Apply: assemble \u2192 import \u2192 carry \u2192 maintenance \u2192 files \u2192 swap \u2192 cleanup \u2192 applied.
 * Live's tables don't change until swap, a single atomic RENAME TABLE. Before that, the only
 * change on live is the files step, under the maintenance page, writing each file's original
 * to backup/ and a line to journal.ndjson first, so rollback can put everything back.
 *
 * @package WpsyncBridge
 */

defined( 'ABSPATH' ) || exit;

class Wpsync_Stage_Failure extends Exception {}

class Wpsync_Stage {

	const APPLY_STEPS    = array( 'assemble', 'import', 'carry', 'maintenance', 'files', 'swap', 'cleanup', 'applied' );
	const ROLLBACK_STEPS = array( 'rollback-maintenance', 'rollback-files', 'rollback-swap', 'rolled-back' );

	/* ---------------------------------------------------------------- endpoints */

	public static function handle_begin( WP_REST_Request $request ) {
		$body = (array) $request->get_json_params();
		$db   = isset( $body['dbBytes'] ) ? (int) $body['dbBytes'] : 0;
		$fs   = isset( $body['filesBytes'] ) ? (int) $body['filesBytes'] : 0;

		$current = self::current();
		if ( $current ) {
			if ( 'applied' === $current['step'] ) {
				return new WP_Error( WPSYNC_ERROR_CONFLICT, 'The previous push is still waiting to be finalized or rolled back.', array( 'status' => 409 ) );
			}
			if ( ! empty( $current['filesTouched'] ) || ! empty( $current['swapped'] ) ) {
				return new WP_Error( WPSYNC_ERROR_CONFLICT, 'An earlier push stopped part-way. Roll it back first.', array( 'status' => 409 ) );
			}
			self::abort( $current );
		}

		$free = function_exists( 'disk_free_space' ) ? @disk_free_space( self::base_dir() ) : false; // phpcs:ignore WordPress.PHP.NoSilencedErrors
		$need = 2 * ( $db + $fs ) + 50 * 1024 * 1024;
		if ( false !== $free && $free < $need ) {
			return new WP_Error( WPSYNC_ERROR_INSUFFICIENT_SPACE, sprintf( 'The server has %d MB free; this push needs about %d MB.', $free / 1048576, $need / 1048576 ), array( 'status' => 507 ) );
		}

		$id  = strtolower( wp_generate_password( 12, false, false ) );
		$dir = self::dir( $id );
		if ( ! wp_mkdir_p( $dir . '/backup' ) ) {
			return new WP_Error( WPSYNC_ERROR_UNSUPPORTED, 'Could not create the staging folder in uploads.', array( 'status' => 500 ) );
		}
		file_put_contents( $dir . '/index.php', "<?php // Silence.\\n" ); // phpcs:ignore WordPress.WP.AlternativeFunctions
		file_put_contents( $dir . '/.htaccess', "Require all denied\\nDeny from all\\n" ); // phpcs:ignore WordPress.WP.AlternativeFunctions
		file_put_contents( $dir . '/web.config', '<configuration><system.webServer><authorization><deny users="*" /></authorization></system.webServer></configuration>' ); // phpcs:ignore WordPress.WP.AlternativeFunctions

		$state = array(
			'id'              => $id,
			'step'            => 'assemble',
			'created'         => time(),
			'user'            => get_current_user_id(),
			'includeHtaccess' => ! empty( $body['includeHtaccess'] ),
			'newPrefix'       => 'wpsync_n_' . $id . '_',
			'oldPrefix'       => 'wpsync_o_' . $id . '_',
			'chunks'          => null,
			'assembled'       => array( 'db' => 0, 'files' => 0 ),
			'assembledSize'   => array( 'db' => 0, 'files' => 0 ),
			'dbOffset'        => 0,
			'filesOffset'     => 0,
			'rollbackIndex'   => 0,
			'filesTouched'    => false,
			'swapped'         => false,
			'skipped'         => array(),
			'error'           => null,
		);
		self::save( $state );
		update_option( WPSYNC_OPTION_STAGE, $id, false );

		$post_max = wp_convert_hr_to_bytes( (string) ini_get( 'post_max_size' ) );
		$chunk    = WPSYNC_PUSH_CHUNK_BYTES + 65536;
		if ( $post_max > 0 ) {
			$chunk = (int) min( $chunk, floor( $post_max * 0.9 ) );
		}
		return rest_ensure_response(
			array(
				'stageId'    => $id,
				'newPrefix'  => $state['newPrefix'],
				'chunkBytes' => max( 65536, $chunk ),
			)
		);
	}

	public static function handle_chunk( WP_REST_Request $request ) {
		$state = self::load( (string) $request->get_param( 'stage' ) );
		if ( is_wp_error( $state ) ) {
			return $state;
		}
		$part = (string) $request->get_param( 'part' );
		$seq  = (int) $request->get_param( 'seq' );
		$body = $request->get_body();
		if ( 'assemble' !== $state['step'] || null !== $state['chunks'] ) {
			return new WP_Error( WPSYNC_ERROR_CONFLICT, 'This push is already being applied.', array( 'status' => 409 ) );
		}
		if ( ! in_array( $part, array( 'db', 'files' ), true ) || $seq < 0 ) {
			return new WP_Error( WPSYNC_ERROR_BAD_REQUEST, 'Bad part or seq.', array( 'status' => 400 ) );
		}
		if ( ! hash_equals( (string) $request->get_param( 'sha256' ), hash( 'sha256', $body ) ) ) {
			return new WP_Error( WPSYNC_ERROR_BAD_REQUEST, 'Checksum mismatch: the chunk was damaged on the way.', array( 'status' => 400 ) );
		}
		$path = self::chunk_path( $state['id'], $part, $seq );
		file_put_contents( $path . '.tmp', $body ); // phpcs:ignore WordPress.WP.AlternativeFunctions
		rename( $path . '.tmp', $path ); // phpcs:ignore WordPress.WP.AlternativeFunctions
		return rest_ensure_response( array( 'received' => strlen( $body ) ) );
	}

	public static function handle_apply( WP_REST_Request $request ) {
		$body  = (array) $request->get_json_params();
		$state = self::load( isset( $body['stage'] ) ? (string) $body['stage'] : '' );
		if ( is_wp_error( $state ) ) {
			return $state;
		}
		if ( null === $state['chunks'] ) {
			$chunks = isset( $body['chunks'] ) ? (array) $body['chunks'] : array();
			$state['chunks'] = array(
				'db'    => isset( $chunks['db'] ) ? (int) $chunks['db'] : 0,
				'files' => isset( $chunks['files'] ) ? (int) $chunks['files'] : 0,
			);
		}
		if ( ! in_array( $state['step'], self::APPLY_STEPS, true ) ) {
			return self::progress( $state, null );
		}
		return self::run( $state, 'apply_step', 'applied' );
	}

	public static function handle_rollback( WP_REST_Request $request ) {
		$body  = (array) $request->get_json_params();
		$state = self::load( isset( $body['stage'] ) ? (string) $body['stage'] : '' );
		if ( is_wp_error( $state ) ) {
			return $state;
		}
		if ( 'rolled-back' === $state['step'] || in_array( $state['step'], self::ROLLBACK_STEPS, true ) ) {
			return self::run( $state, 'rollback_step', 'rolled-back' );
		}
		if ( 'applied' !== $state['step'] && 'failed' !== $state['step'] ) {
			return new WP_Error( WPSYNC_ERROR_CONFLICT, 'This push is still being applied; wait for it to finish or fail.', array( 'status' => 409 ) );
		}
		$state['step']          = 'rollback-maintenance';
		$state['error']         = null;
		$state['rollbackIndex'] = 0;
		return self::run( $state, 'rollback_step', 'rolled-back' );
	}

	public static function handle_finalize( WP_REST_Request $request ) {
		$body  = (array) $request->get_json_params();
		$state = self::load( isset( $body['stage'] ) ? (string) $body['stage'] : '' );
		if ( is_wp_error( $state ) ) {
			return $state;
		}
		if ( 'failed' === $state['step'] && ( $state['filesTouched'] || $state['swapped'] ) ) {
			return new WP_Error( WPSYNC_ERROR_CONFLICT, 'This push changed live before it failed. Roll it back instead.', array( 'status' => 409 ) );
		}
		if ( ! in_array( $state['step'], array( 'applied', 'failed', 'finalize', 'assemble' ), true ) ) {
			return new WP_Error( WPSYNC_ERROR_CONFLICT, 'Only a finished push can be finalized.', array( 'status' => 409 ) );
		}
		$state['step'] = 'finalize';
		return self::run( $state, 'finalize_step', 'finalized' );
	}

	/* ---------------------------------------------------------------- the step loop */

	/** Runs steps until done, failed, or out of time; then saves and reports. */
	private static function run( $state, $stepper, $final ) {
		Wpsync_Guard::extend();
		$deadline = microtime( true ) + WPSYNC_TIME_BUDGET_SECONDS;
		try {
			while ( $state['step'] !== $final && 'failed' !== $state['step'] && microtime( true ) < $deadline ) {
				$progress = self::$stepper( $state, $deadline );
				if ( null !== $progress ) {
					// The step stopped for time with this much done.
					self::save( $state );
					return self::progress( $state, $progress );
				}
			}
		} catch ( Wpsync_Stage_Failure $failure ) {
			$state['error'] = $failure->getMessage();
			$state['step']  = 'failed';
			if ( ! $state['filesTouched'] && ! $state['swapped'] ) {
				// Nothing on live changed: just take the maintenance page down.
				Wpsync_Maintenance::stop();
			}
		}
		if ( 'finalized' !== $state['step'] && 'rolled-back' !== $state['step'] ) {
			self::save( $state );
		}
		return self::progress( $state, null );
	}

	private static function progress( $state, $progress ) {
		$terminal = array( 'applied', 'rolled-back', 'finalized', 'failed' );
		return rest_ensure_response(
			array(
				'stageId'  => $state['id'],
				'step'     => $state['step'],
				'done'     => in_array( $state['step'], $terminal, true ),
				'progress' => $progress,
				'skipped'  => array_values( $state['skipped'] ),
				'error'    => $state['error'],
			)
		);
	}

	/** One apply step. Returns null when it moved on, or {done,total} when it ran out of time. */
	private static function apply_step( &$state, $deadline ) {
		switch ( $state['step'] ) {
			case 'assemble':
				return self::assemble( $state, $deadline );
			case 'import':
				return self::import( $state, $deadline );
			case 'carry':
				self::carry( $state );
				$state['step'] = 'maintenance';
				return null;
			case 'maintenance':
				Wpsync_Maintenance::start();
				$state['step'] = 'files';
				return null;
			case 'files':
				return self::apply_files( $state, $deadline );
			case 'swap':
				self::swap( $state );
				$state['step'] = 'cleanup';
				return null;
			case 'cleanup':
				global $wpdb;
				$wpdb->query( $wpdb->prepare( 'DELETE FROM ' . Wpsync_Db::ident( $state['oldPrefix'] . 'options' ) . ' WHERE option_name = %s', WPSYNC_OPTION_MAINTENANCE ) ); // phpcs:ignore WordPress.DB.PreparedSQL
				@unlink( self::dir( $state['id'] ) . '/db.dat' ); // phpcs:ignore WordPress.PHP.NoSilencedErrors, WordPress.WP.AlternativeFunctions
				@unlink( self::dir( $state['id'] ) . '/files.dat' ); // phpcs:ignore WordPress.PHP.NoSilencedErrors, WordPress.WP.AlternativeFunctions
				$state['step'] = 'applied';
				return null;
		}
		throw new Wpsync_Stage_Failure( 'Unknown step ' . $state['step'] );
	}

	/* ---------------------------------------------------------------- apply steps */

	/** Un-gzips the uploaded chunks, in order, into db.dat and files.dat. */
	private static function assemble( &$state, $deadline ) {
		foreach ( array( 'db', 'files' ) as $part ) {
			$target = self::dir( $state['id'] ) . '/' . $part . '.dat';
			while ( $state['assembled'][ $part ] < $state['chunks'][ $part ] ) {
				if ( microtime( true ) > $deadline ) {
					return array(
						'done'  => $state['assembled']['db'] + $state['assembled']['files'],
						'total' => $state['chunks']['db'] + $state['chunks']['files'],
					);
				}
				$seq  = $state['assembled'][ $part ];
				$path = self::chunk_path( $state['id'], $part, $seq );
				if ( ! is_file( $path ) ) {
					throw new Wpsync_Stage_Failure( "Chunk $seq of the $part upload is missing." );
				}
				$data = gzdecode( file_get_contents( $path ) ); // phpcs:ignore WordPress.WP.AlternativeFunctions
				if ( false === $data ) {
					throw new Wpsync_Stage_Failure( "Chunk $seq of the $part upload isn't valid gzip." );
				}
				// Trim back to the size saved after the last finished chunk, so a crash between
				// appending and saving never leaves a chunk in twice.
				$size = isset( $state['assembledSize'][ $part ] ) ? (int) $state['assembledSize'][ $part ] : 0;
				$out  = fopen( $target, 'c+b' ); // phpcs:ignore WordPress.WP.AlternativeFunctions
				ftruncate( $out, $size );
				fseek( $out, $size );
				fwrite( $out, $data ); // phpcs:ignore WordPress.WP.AlternativeFunctions
				fclose( $out ); // phpcs:ignore WordPress.WP.AlternativeFunctions
				$state['assembled'][ $part ]++;
				$state['assembledSize'][ $part ] = $size + strlen( $data );
				self::save( $state );
				@unlink( $path ); // phpcs:ignore WordPress.PHP.NoSilencedErrors, WordPress.WP.AlternativeFunctions
			}
			if ( ! is_file( $target ) ) {
				touch( $target );
			}
		}
		$state['step'] = 'import';
		return null;
	}

	/** Runs the uploaded SQL, which may only create and fill tables under the stage's prefix. */
	private static function import( &$state, $deadline ) {
		global $wpdb;
		$path   = self::dir( $state['id'] ) . '/db.dat';
		$total  = (int) filesize( $path );
		$handle = fopen( $path, 'rb' ); // phpcs:ignore WordPress.WP.AlternativeFunctions
		fseek( $handle, $state['dbOffset'] );
		$wpdb->query( 'SET FOREIGN_KEY_CHECKS = 0' );
		$wpdb->query( "SET SESSION sql_mode = 'NO_AUTO_VALUE_ON_ZERO'" );
		$allowed = '/^(DROP TABLE IF EXISTS|CREATE TABLE|INSERT INTO) \`' . preg_quote( $state['newPrefix'], '/' ) . '[^\`]+\`( |$)/';

		while ( $state['dbOffset'] < $total ) {
			if ( microtime( true ) > $deadline ) {
				fclose( $handle ); // phpcs:ignore WordPress.WP.AlternativeFunctions
				return array( 'done' => $state['dbOffset'], 'total' => $total );
			}
			$length    = (int) fgets( $handle );
			$statement = self::read_exact( $handle, $length );
			fgetc( $handle );
			if ( 1 !== preg_match( $allowed, $statement ) ) {
				throw new Wpsync_Stage_Failure( 'The uploaded database contains a statement wpsync does not allow.' );
			}
			if ( false === $wpdb->query( $statement ) ) { // phpcs:ignore WordPress.DB.PreparedSQL -- the CLI's export, checked above.
				throw new Wpsync_Stage_Failure( 'Database error while loading the new version: ' . $wpdb->last_error );
			}
			$wpdb->flush();
			$state['dbOffset'] = ftell( $handle );
		}
		fclose( $handle ); // phpcs:ignore WordPress.WP.AlternativeFunctions

		foreach ( array( 'options', 'users', 'usermeta' ) as $needed ) {
			if ( ! self::table_exists( $state['newPrefix'] . $needed ) ) {
				throw new Wpsync_Stage_Failure( "The uploaded database has no $needed table." );
			}
		}
		$state['step'] = 'carry';
		return null;
	}

	/**
	 * Copies into the new tables what must survive the swap: the bridge switched on (with its
	 * deadline), this push's id, and the publishing user's Application Passwords, so wpsync
	 * can still sign in to finish, check, roll back and switch the bridge off.
	 */
	private static function carry( $state ) {
		global $wpdb;
		$options  = $state['newPrefix'] . 'options';
		$users    = $state['newPrefix'] . 'users';
		$usermeta = $state['newPrefix'] . 'usermeta';

		$active = maybe_unserialize( $wpdb->get_var( $wpdb->prepare( 'SELECT option_value FROM ' . Wpsync_Db::ident( $options ) . ' WHERE option_name = %s', 'active_plugins' ) ) ); // phpcs:ignore WordPress.DB.PreparedSQL
		$active = is_array( $active ) ? $active : array();
		if ( ! in_array( WPSYNC_PLUGIN_FILE, $active, true ) ) {
			$active[] = WPSYNC_PLUGIN_FILE;
		}
		self::put_option( $options, 'active_plugins', serialize( array_values( $active ) ), 'yes' ); // phpcs:ignore WordPress.PHP.DiscouragedPHPFunctions
		self::put_option( $options, WPSYNC_OPTION_DEADLINE, (string) Wpsync_Guard::deadline(), 'no' );
		self::put_option( $options, WPSYNC_OPTION_STAGE, $state['id'], 'no' );

		$me = get_userdata( (int) $state['user'] );
		if ( ! $me ) {
			throw new Wpsync_Stage_Failure( 'The publishing user no longer exists on live.' );
		}
		$new_id = $wpdb->get_var( $wpdb->prepare( 'SELECT ID FROM ' . Wpsync_Db::ident( $users ) . ' WHERE user_login = %s', $me->user_login ) ); // phpcs:ignore WordPress.DB.PreparedSQL
		if ( ! $new_id ) {
			throw new Wpsync_Stage_Failure( "Your account ({$me->user_login}) isn't in the local copy, so publishing would lock you out." );
		}
		$caps = maybe_unserialize( $wpdb->get_var( $wpdb->prepare( 'SELECT meta_value FROM ' . Wpsync_Db::ident( $usermeta ) . ' WHERE user_id = %d AND meta_key = %s', $new_id, $wpdb->base_prefix . 'capabilities' ) ) ); // phpcs:ignore WordPress.DB.PreparedSQL
		if ( ! is_array( $caps ) || empty( $caps['administrator'] ) ) {
			throw new Wpsync_Stage_Failure( "Your account ({$me->user_login}) isn't an administrator in the local copy, so publishing would lock you out." );
		}
		$passwords = get_user_meta( $me->ID, '_application_passwords', true );
		$wpdb->delete( $usermeta, array( 'user_id' => $new_id, 'meta_key' => '_application_passwords' ) ); // phpcs:ignore WordPress.DB.SlowDBQuery
		$wpdb->insert( $usermeta, array( 'user_id' => $new_id, 'meta_key' => '_application_passwords', 'meta_value' => maybe_serialize( $passwords ) ) ); // phpcs:ignore WordPress.DB.SlowDBQuery
	}

	/** Writes the uploaded files into place, saving each original first. */
	private static function apply_files( &$state, $deadline ) {
		Wpsync_Maintenance::start();
		$dir     = self::dir( $state['id'] );
		$path    = $dir . '/files.dat';
		$total   = (int) filesize( $path );
		$handle  = fopen( $path, 'rb' ); // phpcs:ignore WordPress.WP.AlternativeFunctions
		$journal = fopen( $dir . '/journal.ndjson', 'ab' ); // phpcs:ignore WordPress.WP.AlternativeFunctions
		$root    = Wpsync_Paths::root();
		fseek( $handle, $state['filesOffset'] );

		while ( $state['filesOffset'] < $total ) {
			if ( microtime( true ) > $deadline ) {
				fclose( $handle ); // phpcs:ignore WordPress.WP.AlternativeFunctions
				fclose( $journal ); // phpcs:ignore WordPress.WP.AlternativeFunctions
				return array( 'done' => $state['filesOffset'], 'total' => $total );
			}
			$header = json_decode( (string) fgets( $handle ), true );
			if ( ! is_array( $header ) || ! isset( $header['path'] ) ) {
				throw new Wpsync_Stage_Failure( 'The uploaded files archive is damaged.' );
			}
			$relative = (string) $header['path'];
			$delete   = ! empty( $header['delete'] );
			$size     = $delete ? 0 : (int) $header['size'];

			if ( ! self::pushable( $relative, $state['includeHtaccess'] ) ) {
				$state['skipped'][] = $relative;
				fseek( $handle, $size, SEEK_CUR );
				$state['filesOffset'] = ftell( $handle );
				continue;
			}
			$target = $root . '/' . $relative;
			$backup = $dir . '/backup/' . $relative;
			if ( is_link( $target ) || is_dir( $target ) ) {
				$state['skipped'][] = $relative;
				fseek( $handle, $size, SEEK_CUR );
				$state['filesOffset'] = ftell( $handle );
				continue;
			}

			$exists = is_file( $target );
			if ( $delete && ! $exists ) {
				$state['filesOffset'] = ftell( $handle );
				continue;
			}
			// Journal first, then act: after a crash, rollback knows about every change.
			$op = $delete ? 'deleted' : ( $exists ? 'replaced' : 'added' );
			fwrite( $journal, wp_json_encode( array( 'op' => $op, 'path' => $relative ) ) . "\\n" ); // phpcs:ignore WordPress.WP.AlternativeFunctions
			fflush( $journal );
			$state['filesTouched'] = true;

			if ( $exists && ! file_exists( $backup ) ) {
				wp_mkdir_p( dirname( $backup ) );
				self::move( $target, $backup );
			}
			if ( $delete ) {
				if ( is_file( $target ) ) {
					@unlink( $target ); // phpcs:ignore WordPress.PHP.NoSilencedErrors, WordPress.WP.AlternativeFunctions
				}
			} else {
				wp_mkdir_p( dirname( $target ) );
				$temp = $target . '.wpsync-tmp';
				$out  = fopen( $temp, 'wb' ); // phpcs:ignore WordPress.WP.AlternativeFunctions
				if ( ! $out ) {
					throw new Wpsync_Stage_Failure( "Can't write $relative on the server." );
				}
				self::copy_bytes( $handle, $out, $size );
				fclose( $out ); // phpcs:ignore WordPress.WP.AlternativeFunctions
				if ( ! rename( $temp, $target ) ) { // phpcs:ignore WordPress.WP.AlternativeFunctions
					throw new Wpsync_Stage_Failure( "Can't put $relative in place on the server." );
				}
				touch( $target, (int) $header['mtime'] );
			}
			$state['filesOffset'] = ftell( $handle );
		}
		fclose( $handle ); // phpcs:ignore WordPress.WP.AlternativeFunctions
		fclose( $journal ); // phpcs:ignore WordPress.WP.AlternativeFunctions
		if ( function_exists( 'opcache_reset' ) ) {
			@opcache_reset(); // phpcs:ignore WordPress.PHP.NoSilencedErrors -- new PHP files must be read fresh.
		}
		$state['step'] = 'swap';
		return null;
	}

	/** Live's tables to the saved prefix and the new ones into place, in one atomic statement. */
	private static function swap( &$state ) {
		global $wpdb;
		$base  = $wpdb->base_prefix;
		$pairs = array();
		foreach ( self::live_tables() as $table ) {
			$pairs[] = Wpsync_Db::ident( $table ) . ' TO ' . Wpsync_Db::ident( $state['oldPrefix'] . substr( $table, strlen( $base ) ) );
		}
		foreach ( self::tables_with_prefix( $state['newPrefix'] ) as $table ) {
			$pairs[] = Wpsync_Db::ident( $table ) . ' TO ' . Wpsync_Db::ident( $base . substr( $table, strlen( $state['newPrefix'] ) ) );
		}
		if ( false === $wpdb->query( 'RENAME TABLE ' . implode( ', ', $pairs ) ) ) { // phpcs:ignore WordPress.DB.PreparedSQL
			throw new Wpsync_Stage_Failure( 'Swapping in the new tables failed: ' . $wpdb->last_error );
		}
		$state['swapped'] = true;
		self::save( $state );
		wp_cache_flush();
	}

	/* ---------------------------------------------------------------- rollback and finalize */

	private static function rollback_step( &$state, $deadline ) {
		global $wpdb;
		switch ( $state['step'] ) {
			case 'rollback-maintenance':
				Wpsync_Maintenance::start();
				$state['step'] = 'rollback-files';
				return null;

			case 'rollback-files':
				$entries = self::journal( $state['id'] );
				$dir     = self::dir( $state['id'] );
				$root    = Wpsync_Paths::root();
				while ( $state['rollbackIndex'] < count( $entries ) ) {
					if ( microtime( true ) > $deadline ) {
						return array( 'done' => $state['rollbackIndex'], 'total' => count( $entries ) );
					}
					$entry  = $entries[ $state['rollbackIndex'] ];
					$target = $root . '/' . $entry['path'];
					$backup = $dir . '/backup/' . $entry['path'];
					if ( 'added' === $entry['op'] ) {
						@unlink( $target ); // phpcs:ignore WordPress.PHP.NoSilencedErrors, WordPress.WP.AlternativeFunctions
					} elseif ( file_exists( $backup ) ) {
						@unlink( $target ); // phpcs:ignore WordPress.PHP.NoSilencedErrors, WordPress.WP.AlternativeFunctions
						wp_mkdir_p( dirname( $target ) );
						self::move( $backup, $target );
					}
					$state['rollbackIndex']++;
				}
				if ( function_exists( 'opcache_reset' ) ) {
					@opcache_reset(); // phpcs:ignore WordPress.PHP.NoSilencedErrors
				}
				$state['step'] = 'rollback-swap';
				return null;

			case 'rollback-swap':
				if ( $state['swapped'] ) {
					$base    = $wpdb->base_prefix;
					$discard = 'wpsync_d_' . $state['id'] . '_';
					$pairs   = array();
					foreach ( self::live_tables() as $table ) {
						$pairs[] = Wpsync_Db::ident( $table ) . ' TO ' . Wpsync_Db::ident( $discard . substr( $table, strlen( $base ) ) );
					}
					foreach ( self::tables_with_prefix( $state['oldPrefix'] ) as $table ) {
						$pairs[] = Wpsync_Db::ident( $table ) . ' TO ' . Wpsync_Db::ident( $base . substr( $table, strlen( $state['oldPrefix'] ) ) );
					}
					if ( false === $wpdb->query( 'RENAME TABLE ' . implode( ', ', $pairs ) ) ) { // phpcs:ignore WordPress.DB.PreparedSQL
						throw new Wpsync_Stage_Failure( 'Swapping the old tables back failed: ' . $wpdb->last_error );
					}
					$state['swapped'] = false;
					self::save( $state );
					self::drop_prefix( $discard );
				} else {
					self::drop_prefix( $state['newPrefix'] );
				}
				wp_cache_flush();
				Wpsync_Maintenance::stop();
				delete_option( WPSYNC_OPTION_STAGE );
				self::remove_tree( self::dir( $state['id'] ), PHP_INT_MAX );
				$state['step'] = 'rolled-back';
				return null;
		}
		throw new Wpsync_Stage_Failure( 'Unknown rollback step ' . $state['step'] );
	}

	private static function finalize_step( &$state, $deadline ) {
		self::drop_prefix( $state['swapped'] ? $state['oldPrefix'] : $state['newPrefix'] );
		if ( ! self::remove_tree( self::dir( $state['id'] ), $deadline ) ) {
			return array( 'done' => 0, 'total' => 1 );
		}
		if ( get_option( WPSYNC_OPTION_STAGE ) === $state['id'] ) {
			delete_option( WPSYNC_OPTION_STAGE );
		}
		$state['step'] = 'finalized';
		return null;
	}

	/** Throws away a push that never touched live (a leftover from an interrupted upload). */
	private static function abort( $state ) {
		self::drop_prefix( $state['newPrefix'] );
		self::remove_tree( self::dir( $state['id'] ), PHP_INT_MAX );
		delete_option( WPSYNC_OPTION_STAGE );
	}

	/* ---------------------------------------------------------------- helpers */

	private static function base_dir() {
		$uploads = wp_get_upload_dir();
		return $uploads['basedir'];
	}

	private static function dir( $id ) {
		return self::base_dir() . '/wpsync-' . $id;
	}

	private static function chunk_path( $id, $part, $seq ) {
		return self::dir( $id ) . '/' . $part . '.' . str_pad( (string) $seq, 6, '0', STR_PAD_LEFT ) . '.gz';
	}

	private static function current() {
		$id = (string) get_option( WPSYNC_OPTION_STAGE, '' );
		if ( '' === $id ) {
			return null;
		}
		$state = self::load( $id );
		return is_wp_error( $state ) ? null : $state;
	}

	private static function load( $id ) {
		if ( ! preg_match( '/^[a-z0-9]{12}$/', $id ) || ! is_file( self::dir( $id ) . '/state.json' ) ) {
			return new WP_Error( WPSYNC_ERROR_NOT_FOUND, 'No such push on this site.', array( 'status' => 404 ) );
		}
		$state = json_decode( (string) file_get_contents( self::dir( $id ) . '/state.json' ), true ); // phpcs:ignore WordPress.WP.AlternativeFunctions
		return is_array( $state ) ? $state : new WP_Error( WPSYNC_ERROR_NOT_FOUND, 'The push state is damaged.', array( 'status' => 500 ) );
	}

	private static function save( $state ) {
		$path = self::dir( $state['id'] ) . '/state.json';
		file_put_contents( $path . '.tmp', wp_json_encode( $state ) ); // phpcs:ignore WordPress.WP.AlternativeFunctions
		rename( $path . '.tmp', $path ); // phpcs:ignore WordPress.WP.AlternativeFunctions
	}

	/** Journal entries, first one per path: that one says what the path was like before the push. */
	private static function journal( $id ) {
		$seen    = array();
		$entries = array();
		$path    = self::dir( $id ) . '/journal.ndjson';
		if ( ! is_file( $path ) ) {
			return array();
		}
		foreach ( file( $path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES ) as $line ) {
			$entry = json_decode( $line, true );
			if ( is_array( $entry ) && isset( $entry['path'], $entry['op'] ) && ! isset( $seen[ $entry['path'] ] ) ) {
				$seen[ $entry['path'] ] = true;
				$entries[]              = $entry;
			}
		}
		return $entries;
	}

	private static function pushable( $relative, $include_htaccess ) {
		if ( ! Wpsync_Paths::is_safe_relative( $relative ) || Wpsync_Paths::is_excluded( $relative ) ) {
			return false;
		}
		$protected = WPSYNC_PUSH_PROTECTED;
		if ( $include_htaccess ) {
			$protected = array_values( array_diff( $protected, array( '.htaccess' ) ) );
		}
		return ! Wpsync_Paths::is_excluded( $relative, $protected );
	}

	/** This site's own tables, leaving out any wpsync stage tables. */
	private static function live_tables() {
		return array_values(
			array_filter(
				Wpsync_Db::table_names(),
				function ( $table ) {
					return 0 !== strpos( $table, 'wpsync_' );
				}
			)
		);
	}

	private static function tables_with_prefix( $prefix ) {
		global $wpdb;
		return array_map(
			'strval',
			(array) $wpdb->get_col(
				$wpdb->prepare(
					"SELECT TABLE_NAME FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE() AND TABLE_TYPE = 'BASE TABLE' AND TABLE_NAME LIKE %s",
					$wpdb->esc_like( $prefix ) . '%'
				)
			)
		);
	}

	private static function table_exists( $name ) {
		return in_array( $name, self::tables_with_prefix( $name ), true );
	}

	private static function drop_prefix( $prefix ) {
		global $wpdb;
		if ( ! preg_match( '/^wpsync_[nod]_[a-z0-9]{12}_$/', $prefix ) ) {
			return; // Never drop anything but wpsync's own stage tables.
		}
		$tables = self::tables_with_prefix( $prefix );
		if ( $tables ) {
			$wpdb->query( 'SET FOREIGN_KEY_CHECKS = 0' );
			$wpdb->query( 'DROP TABLE IF EXISTS ' . implode( ', ', array_map( array( 'Wpsync_Db', 'ident' ), $tables ) ) ); // phpcs:ignore WordPress.DB.PreparedSQL
		}
	}

	private static function put_option( $table, $name, $value, $autoload ) {
		global $wpdb;
		$wpdb->delete( $table, array( 'option_name' => $name ) );
		$wpdb->insert(
			$table,
			array(
				'option_name'  => $name,
				'option_value' => $value,
				'autoload'     => $autoload,
			)
		);
	}

	private static function read_exact( $handle, $length ) {
		$data = '';
		while ( strlen( $data ) < $length && ! feof( $handle ) ) {
			$piece = fread( $handle, $length - strlen( $data ) ); // phpcs:ignore WordPress.WP.AlternativeFunctions
			if ( false === $piece || '' === $piece ) {
				break;
			}
			$data .= $piece;
		}
		if ( strlen( $data ) !== $length ) {
			throw new Wpsync_Stage_Failure( 'The uploaded database is cut off.' );
		}
		return $data;
	}

	private static function copy_bytes( $from, $to, $length ) {
		$left = $length;
		while ( $left > 0 ) {
			$piece = fread( $from, min( 1048576, $left ) ); // phpcs:ignore WordPress.WP.AlternativeFunctions
			if ( false === $piece || '' === $piece ) {
				throw new Wpsync_Stage_Failure( 'The uploaded files archive is cut off.' );
			}
			fwrite( $to, $piece ); // phpcs:ignore WordPress.WP.AlternativeFunctions
			$left -= strlen( $piece );
		}
	}

	/** rename(), falling back to copy-and-delete across filesystems. */
	private static function move( $from, $to ) {
		if ( @rename( $from, $to ) ) { // phpcs:ignore WordPress.PHP.NoSilencedErrors, WordPress.WP.AlternativeFunctions
			return;
		}
		if ( ! @copy( $from, $to ) ) { // phpcs:ignore WordPress.PHP.NoSilencedErrors
			throw new Wpsync_Stage_Failure( "Can't move $from on the server." );
		}
		@unlink( $from ); // phpcs:ignore WordPress.PHP.NoSilencedErrors, WordPress.WP.AlternativeFunctions
	}

	/** Deletes a folder tree, stopping at $deadline. Returns true when it's gone. */
	private static function remove_tree( $dir, $deadline ) {
		if ( ! is_dir( $dir ) ) {
			return true;
		}
		$items = new RecursiveIteratorIterator( new RecursiveDirectoryIterator( $dir, FilesystemIterator::SKIP_DOTS ), RecursiveIteratorIterator::CHILD_FIRST );
		foreach ( $items as $item ) {
			if ( microtime( true ) > $deadline ) {
				return false;
			}
			$item->isDir() && ! $item->isLink() ? @rmdir( $item->getPathname() ) : @unlink( $item->getPathname() ); // phpcs:ignore WordPress.PHP.NoSilencedErrors, WordPress.WP.AlternativeFunctions
		}
		return @rmdir( $dir ); // phpcs:ignore WordPress.PHP.NoSilencedErrors, WordPress.WP.AlternativeFunctions
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
const WPSYNC_OPTION_MAINTENANCE = 'wpsync_maintenance';
const WPSYNC_OPTION_STAGE = 'wpsync_stage';
const WPSYNC_MAINTENANCE_SECONDS = 1800;
const WPSYNC_PUSH_CHUNK_BYTES = 4000000;

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

const WPSYNC_PUSH_PROTECTED = array(
	'.htaccess',
	'.user.ini',
	'php.ini',
	'web.config',
	'.well-known',
	'wp-content/mu-plugins',
	'wp-content/object-cache.php',
	'wp-content/advanced-cache.php',
	'wp-content/db.php',
	'wp-content/sunrise.php',
);

const WPSYNC_ROUTE_INFO = '/info';
const WPSYNC_ROUTE_DB_TABLES = '/db/tables';
const WPSYNC_ROUTE_DB_ROWS = '/db/rows';
const WPSYNC_ROUTE_FILES_LIST = '/files/list';
const WPSYNC_ROUTE_FILES_FETCH = '/files/fetch';
const WPSYNC_ROUTE_FILES_READ = '/files/read';
const WPSYNC_ROUTE_CHANGES = '/changes';
const WPSYNC_ROUTE_STAGE_BEGIN = '/stage/begin';
const WPSYNC_ROUTE_STAGE_CHUNK = '/stage/chunk';
const WPSYNC_ROUTE_STAGE_APPLY = '/stage/apply';
const WPSYNC_ROUTE_ROLLBACK = '/rollback';
const WPSYNC_ROUTE_FINALIZE = '/finalize';

const WPSYNC_ERROR_NOT_LOGGED_IN = 'wpsync_not_logged_in';
const WPSYNC_ERROR_FORBIDDEN = 'wpsync_forbidden';
const WPSYNC_ERROR_HTTPS_REQUIRED = 'wpsync_https_required';
const WPSYNC_ERROR_EXPIRED = 'wpsync_expired';
const WPSYNC_ERROR_BAD_REQUEST = 'wpsync_bad_request';
const WPSYNC_ERROR_NOT_FOUND = 'wpsync_not_found';
const WPSYNC_ERROR_UNSUPPORTED = 'wpsync_unsupported';
const WPSYNC_ERROR_CONFLICT = 'wpsync_conflict';
const WPSYNC_ERROR_INSUFFICIENT_SPACE = 'wpsync_insufficient_space';
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
require_once __DIR__ . '/includes/class-wpsync-maintenance.php';
require_once __DIR__ . '/includes/class-wpsync-changes.php';
require_once __DIR__ . '/includes/class-wpsync-stage.php';

// As early as a plugin can: during a push, everyone but the bridge sees the maintenance page.
Wpsync_Maintenance::gate();

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
		WPSYNC_ROUTE_CHANGES     => array(
			'GET',
			array( 'Wpsync_Changes', 'handle' ),
			array(
				'since' => array(
					'type'     => 'string',
					'required' => true,
				),
			),
		),
		WPSYNC_ROUTE_STAGE_BEGIN => array( 'POST', array( 'Wpsync_Stage', 'handle_begin' ), array() ),
		WPSYNC_ROUTE_STAGE_CHUNK => array(
			'PUT',
			array( 'Wpsync_Stage', 'handle_chunk' ),
			array(
				'stage'  => array(
					'type'     => 'string',
					'required' => true,
				),
				'part'   => array(
					'type'     => 'string',
					'required' => true,
				),
				'seq'    => array(
					'type'     => 'integer',
					'required' => true,
				),
				'sha256' => array(
					'type'     => 'string',
					'required' => true,
				),
			),
		),
		WPSYNC_ROUTE_STAGE_APPLY => array( 'POST', array( 'Wpsync_Stage', 'handle_apply' ), array() ),
		WPSYNC_ROUTE_ROLLBACK    => array( 'POST', array( 'Wpsync_Stage', 'handle_rollback' ), array() ),
		WPSYNC_ROUTE_FINALIZE    => array( 'POST', array( 'Wpsync_Stage', 'handle_finalize' ), array() ),
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
`},Pu={"export.php":`<?php
/**
 * Local half of a push: exports this (local DDEV) site's tables as framed SQL under the stage's
 * new table prefix. wpsync copies this file and the bridge's includes into the project's
 * .wpsync-tmp/ folder and runs, inside DDEV:
 *   wp eval-file /var/www/html/.wpsync-tmp/bridge/export.php <output file> <new prefix>
 * Prints one JSON line: {"tables": n, "rows": n}.
 */

global $wpdb;
require_once __DIR__ . '/includes/protocol.php';
require_once __DIR__ . '/includes/class-wpsync-db.php';

list( $output, $new_prefix ) = $args;
if ( ! preg_match( '/^[A-Za-z0-9_]+$/', $new_prefix ) ) {
	WP_CLI::error( 'Bad table prefix.' );
}
$out = fopen( $output, 'wb' ); // phpcs:ignore WordPress.WP.AlternativeFunctions
if ( ! $out ) {
	WP_CLI::error( "Can't write $output" );
}

$base   = $wpdb->base_prefix;
$tables = 0;
$rows   = 0;
foreach ( Wpsync_Db::table_names() as $table ) {
	$rows += Wpsync_Db::export_framed( $table, $new_prefix . substr( $table, strlen( $base ) ), $out );
	$tables++;
}
fclose( $out ); // phpcs:ignore WordPress.WP.AlternativeFunctions
echo wp_json_encode( array( 'tables' => $tables, 'rows' => $rows ) ) . "\\n";
`},Su={"CLAUDE.md.tmpl":`<!--
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
# wpsync's scratch space while publishing
.wpsync-tmp/

# DDEV: keep config.yaml, ignore machine-local state
.ddev/*
!.ddev/config.yaml

# Personal Claude Code settings
.claude/settings.local.json

.DS_Store
`},eo={"1-wordpress-editing.md":`<!--
  PURPOSE: The WordPress editing rules. Instructions to Claude for every change it makes to a
  WordPress site: keep the site a normal WordPress site that people who don't code can run
  from wp-admin. Add new editing rules here, as their own numbered rule.
  USED BY: wpsync copies every file in this folder, in file-name order (hence the number
  prefixes), into each site project's CLAUDE.md between the wpsync:rules markers;
  \`wpsync update-rules\` refreshes it there. The "work" skill also points Claude here.
  After editing, run \`pnpm generate\` so the CLI carries the new text.
  EDIT HERE, not in a site's CLAUDE.md: edits there are replaced on the next update-rules.
-->
## WordPress editing rules

**Every change should leave the site fully manageable in standard WordPress Admin** by someone
who doesn't code. These rules apply to every change, however small.

### Rule 1: Work with WordPress, don't override it

Make changes an administrator can **see and change in wp-admin** (the block editor, the Site
Editor, the Customizer, menus, widgets, settings), rather than writing PHP, hard-coded markup or
custom CSS that does the same thing behind their back.

- Prefer a setting, block, block style, pattern or theme option over code. For example: a color
  or font change goes in the Site Editor's Styles (or the theme's options), not a CSS file; a
  layout goes in blocks on the page, not a template with HTML in it.
- Don't replace or switch off something WordPress already does (menus, the block editor,
  widgets, image sizes, comments, search, the admin bar) unless the developer asks for exactly
  that.
- **When code is truly the only way to get the designed effect, tell the developer and go
  ahead.** Say briefly what you're writing, why wp-admin can't do it, and how an editor can still
  control it (if they can). Don't stop to ask unless the change also needs something only they
  can approve (a new plugin, or a change on the live site).

### Rule 2: The theme holds looks, not content

Content lives in WordPress, where editors can change it: Pages, Posts, menus, media, widgets,
reusable patterns. The theme (and any child theme) only says how things look.

- **The home page is a WordPress Page** (usually named "Home"), set as the home page under
  Settings \u2192 Reading \u2192 "A static page" (\`ddev wp option update show_on_front page\` and
  \`ddev wp option update page_on_front <page ID>\`). Its content is built with blocks in that
  Page, never written into the theme's front-page template or the Site Editor's template for it.
  Likewise, a blog listing is a Page named "Blog" set as the posts page.
- Headlines, paragraphs, images, buttons, phone numbers, addresses, links and menu items are
  content. They never go into theme files or theme templates. A template may hold layout and
  site-wide parts (header, footer) built from blocks an editor can change, with menus and the
  site logo/title coming from WordPress settings.
- If the site you pulled already has content in its theme, point it out to the developer and
  offer to move it into Pages (or patterns) before building on it.

### How to choose the way to build something

Go down this list and use the first option that works:

1. **Content in wp-admin:** a Page, a Post, a menu item, a widget, a category, or a synced
   pattern. For example, a new section of the site is Pages with a menu entry, not a custom
   template.
2. **The block editor and the theme's own options:** core blocks, block styles and patterns,
   the Site Editor or Customizer, and the theme's options panel.
3. **A plugin that's already installed and active** on this site. Check the site's plugin list
   first.
4. **A new, well-known, maintained plugin**, named to the developer and approved before
   installing. Check its last update date, active installs, and support for the site's PHP
   version.
5. **Child theme changes:** CSS in a child theme, or a template override copied from the parent
   theme into the child theme (layout only, per rule 2). Never edit a parent theme or any
   third-party plugin: their updates wipe out the changes. If the site has no child theme and
   one is needed, propose creating it first.
6. **Custom PHP, last:** only when 1\u20135 can't do it (and say so, per rule 1). Put it in a small
   custom plugin named after the site and the feature (for example \`<site>-<feature>\`), prefix
   every function, class, option and hook with the same prefix, and keep the theme for looks
   only. Anything an editor might want to change (text, links, numbers, on/off) goes in a
   settings field, a block, or post meta that shows in wp-admin, never hard-coded.

### Also

- When a change needs content on the live site (a new page or menu entry), remember that
  publishing replaces the whole live site with this local copy: make the content here, in the
  local wp-admin (or with \`ddev wp\`), so it goes live with the code.
- When you report a change, say how an editor would maintain it in wp-admin.
`,"2-safety.md":`<!--
  PURPOSE: Instructions to Claude about what it must never do, or never do without asking,
  while working on a wpsync site project.
  USED BY: copied into each site project's CLAUDE.md with the other rules (see
  1-wordpress-editing.md); the "publish" skill repeats the publishing part.
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
`,"3-definition-of-done.md":`<!--
  PURPOSE: Instructions to Claude on when a change to a WordPress site counts as finished.
  USED BY: copied into each site project's CLAUDE.md with the other rules (see
  1-wordpress-editing.md).
  EDIT HERE, not in a site's CLAUDE.md.
-->
## A change is done when

1. It's built locally and, where possible, follows the WordPress editing rules above.
2. The affected pages load on the local site with no PHP errors or notices (\`ddev logs\` is clean), and look right in a browser, checked at desktop and phone widths.
3. Editors can still change it in wp-admin: anything they'd want to edit is editable there.
4. Code changes are committed with a message describing the change.
5. The developer has seen it working locally. Publishing is a separate step, done only when the developer asks.
`};var Eu=`${qn}.zip`,pd=new Date("2026-01-01T00:00:00Z");function ku(){let e={};for(let[t,n]of Object.entries(kn))e[`${qn}/${t}`]=[Sn(n),{mtime:pd}];return xu(e,{level:9})}var zn=`/wp/v2/plugins/${$o.replace(/\.php$/,"")}`,zu=4;class je{site;username;applicationPassword;constructor(e,t,n){this.site=e;this.username=t;this.applicationPassword=n}async send(e,t,n,r){let o={Accept:r,Authorization:`Basic ${Buffer.from(`${this.username}:${this.applicationPassword}`).toString("base64")}`},s;if(n.bytes)o["Content-Type"]="application/octet-stream",s=n.bytes;else if(n.body!==void 0)o["Content-Type"]="application/json",s=JSON.stringify(n.body);let i=this.site.restUrl(t,n.query);for(let a=1;;a++){try{let c=await Y(i,{method:e,headers:o,body:s});if(c.status<500||c.status===501||a===zu)return c}catch(c){if(!(c instanceof y)||c.code!=="unreachable"||a===zu)throw c}await new Promise((c)=>setTimeout(c,500*2**a))}}async call(e,t,n={}){let r=await this.send(e,t,n,"application/json"),o=we(r.text)??r.text,s=r.status>=400?Mr.safeParse(o):void 0;return{status:r.status,body:o,errorCode:s?.success?s.data.code:void 0}}get(e,t){return this.call("GET",e,{query:t})}async bridge(e,t,n={}){let r=await this.call(n.method??"GET",`/${Hn}${t}`,n),o=e.safeParse(r.body);if(r.status!==200||!o.success)throw Tu(t,r.status,r.errorCode,typeof r.body==="string"?r.body:void 0);return o.data}async bridgeRaw(e,t={}){let n=await this.send(t.method??"GET",`/${Hn}${e}`,t,"application/octet-stream");if(n.status!==200||!(n.headers.get("content-type")??"").includes("application/octet-stream")){let r=Mr.safeParse(we(n.text));throw Tu(e,n.status,r.success?r.data.code:void 0,n.text)}return n}async setBridgeActive(e){let t=await this.call("PUT",zn,{body:{status:e?"active":"inactive"}});if(t.status!==200)throw new y(e?"bridge_activation_failed":"bridge_deactivation_failed",`WordPress wouldn't ${e?"activate":"deactivate"} the wpsync bridge (HTTP ${t.status}${t.errorCode?`, ${t.errorCode}`:""}).`)}async withBridge(e){await this.setBridgeActive(!0);try{return await e()}finally{await this.setBridgeActive(!1).catch(()=>{})}}}function Tu(e,t,n,r){let o=!n&&r?r.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim().slice(0,200):"";return new y("bridge_error",`The bridge failed on ${e} (HTTP ${t}${n?`, ${n}`:""})${o?`: ${o}`:"."}`)}var Ru=E({name:g(),url:g(),home:g(),namespaces:se(g()),authentication:$n([Gc(g(),gn()),se(gn())]).optional()});function to(e,t=!1){let n=/^[a-z]+:\/\//i.test(e)?e:`https://${e}`,r;try{r=new URL(n)}catch{throw new y("bad_url",`"${e}" isn't a web address.`)}if(r.protocol==="http:"&&!t)throw new y("http_refused",`${r.origin} uses plain HTTP, which would send the site's keys unencrypted.`,"Use the site's https:// address.");if(r.protocol!=="https:"&&r.protocol!=="http:")throw new y("bad_url",`"${e}" isn't a web address.`);return`${r.origin}${r.pathname}`.replace(/\/+$/,"")}function Ct(e){return e.replace(/\/+$/,"")}async function rt(e,t={}){let n=to(e,t.allowHttp),r=await Y(`${n}/wp-json/`,{headers:{Accept:"application/json"}}),o=Ru.safeParse(we(r.text)),s;if(o.success){let u=Ct(r.url.replace(/\/wp-json\/?$/,""));s=(l,p={})=>{let f=new URL(`${u}/wp-json${l}`);for(let[d,h]of Object.entries(p))f.searchParams.set(d,h);return f.toString()}}else{let u=await Y(`${n}/?rest_route=/`,{headers:{Accept:"application/json"}});if(o=Ru.safeParse(we(u.text)),!o.success)throw new y("not_wordpress",`${n} didn't answer like a WordPress site (no REST API at /wp-json/ or /?rest_route=/).`,"Check the address. If it is WordPress, a security plugin may be blocking the REST API.");let l=Ct(new URL(u.url).origin+new URL(u.url).pathname);s=(p,f={})=>{let d=new URL(`${l}/`);d.searchParams.set("rest_route",p);for(let[h,_]of Object.entries(f))d.searchParams.set(h,_);return d.toString()}}let i=o.data;if(!i.namespaces.includes("wp/v2"))throw new y("rest_limited",`${n} has its WordPress REST API turned off.`);let a=i.authentication,c=!!a&&!Array.isArray(a)&&"application-passwords"in a;return{siteUrl:Ct(i.url),homeUrl:Ct(i.home),name:i.name,restUrl:s,applicationPasswords:c}}function ot(e){let t=new URL(e);return`${t.protocol}//${t.host.toLowerCase()}${Ct(t.pathname)}`}async function Au(e,t){let n=e.log??(()=>{}),r=t.now??(()=>new Date);n(`Looking up ${e.url}\u2026`);let o=await rt(e.url,{allowHttp:e.allowHttp});if(!o.applicationPasswords)throw new y("application_passwords_unavailable",`${o.homeUrl} doesn't offer Application Passwords, which wpsync uses to sign in.`,"WordPress turns them off on sites without HTTPS, and some security plugins turn them off. Fix that and connect again.");let s=ot(o.homeUrl),i=await t.store.get(s),a=await t.credentials({name:o.name,homeUrl:o.homeUrl},e.username??i?.username);n("Signing in\u2026");let c=await xn.login(o,a.username,a.password),u;try{let l=`wpsync ${t.machineName??dd()} ${r().toISOString().slice(0,10)}`;u=await c.createApplicationPassword(l);let p=new je(o,a.username,u.password);if(await hd(p),i&&i.applicationPasswordUuid!==u.uuid)await c.deleteApplicationPassword(i.applicationPasswordUuid);let f={homeUrl:o.homeUrl,siteUrl:o.siteUrl,username:a.username,applicationPassword:u.password,applicationPasswordUuid:u.uuid,applicationPasswordName:l,connectedAt:r().toISOString()};await t.store.set(s,f);let d=await md(p,c,n);n("Checking the bridge\u2026");let h=await gd(p);if(h.bridge.version!==Ge)n(`Note: the site has bridge ${h.bridge.version}; this wpsync ships ${Ge}.`);return{site:o,info:h,bridge:d,connection:f}}catch(l){if(u)await c.deleteApplicationPassword(u.uuid).catch(()=>{});throw l}finally{await c.logout()}}function dd(){return fd().replace(/\.local$/,"")}async function hd(e){let t=await e.get("/wp/v2/users/me",{context:"edit"});if(t.status===401)throw new y("authorization_header_stripped","The site's server drops the Authorization header, so WordPress never sees wpsync's key.","This is a hosting setting (common on some Apache setups). Ask the host to pass the Authorization header to PHP.");let n=t.body.capabilities??{};if(t.status!==200||!n.manage_options||!n.install_plugins)throw new y("not_administrator","That account isn't an administrator who can install plugins.","Sign in with an administrator account.")}async function md(e,t,n){let r=await e.get(zn);if(r.status===200)return"already-installed";if(r.status!==404)throw new y("plugin_check_failed",`Couldn't check the site's plugins (HTTP ${r.status}).`);if(n("Installing the wpsync bridge (it stays switched off between runs)\u2026"),await t.uploadPlugin(ku(),Eu),(await e.get(zn)).status!==200)throw new y("bridge_upload_failed","WordPress didn't install the wpsync bridge from the upload.");return"uploaded"}function gd(e){return e.withBridge(()=>e.bridge(tt,U.info))}import{execFileSync as _d}from"child_process";function no(e){return`"${e.replace(/\\/g,"\\\\").replace(/"/g,"\\\"")}"`}function yd(e,t,n=""){let r=`Sign in to ${e} (${t}) as an administrator.`,o="wpsync uses the password once, to create its own revocable key on the site. It never saves the password.";return[`set u to text returned of (display dialog ${no(`${r}

Username:`)} default answer ${no(n)} with title "wpsync" buttons {"Cancel", "Next"} default button "Next" cancel button "Cancel")`,`set p to text returned of (display dialog ("Password for " & u & ":" & return & return & ${no("wpsync uses the password once, to create its own revocable key on the site. It never saves the password.")}) default answer "" with hidden answer with title "wpsync" buttons {"Cancel", "Connect"} default button "Connect" cancel button "Cancel")`,"return u & linefeed & p"].join(`
`)}var Cu=async(e,t)=>{let n;try{n=_d("osascript",["-"],{input:yd(e.name,e.homeUrl,t),encoding:"utf8",stdio:["pipe","pipe","pipe"]})}catch(a){let c=a.stderr??"";if(/-128/.test(c))throw new y("cancelled","Sign-in cancelled.");throw new y("dialog_failed","Couldn't show the sign-in dialog.","Run wpsync from a Mac where you're logged in to the desktop.")}let r=n.replace(/\n$/,""),o=r.indexOf(`
`),s=r.slice(0,o).trim(),i=r.slice(o+1);if(o<0||!s||!i)throw new y("cancelled","No username or password entered.");return{username:s,password:i}};function Z(e){return e.toLocaleString("en-US")}function ve(e){if(e<1024)return`${Z(e)} bytes`;let t=["KB","MB","GB","TB"],n=e/1024,r=0;while(n>=1024&&r<t.length-1)n/=1024,r++;return`${n.toLocaleString("en-US",{maximumFractionDigits:1})} ${t[r]}`}import{existsSync as zd}from"fs";import{resolve as Td}from"path";import{execFileSync as Uu,spawnSync as vd}from"child_process";import{existsSync as st,mkdirSync as Rn,readFileSync as xd,writeFileSync as An}from"fs";import{homedir as Pd}from"os";import{join as ee,resolve as Sd}from"path";import{existsSync as $d,readFileSync as Ou,writeFileSync as ro}from"fs";function oo(e){let t=Su[e];if(t===void 0)throw Error(`site template file ${e} missing from the build`);return t}var Iu=oo("gitignore"),Nu=oo("claude-settings.json");function Du(e){return e.replace(/^\s*<!--[\s\S]*?-->\s*/,"")}function Zu(){return Object.keys(eo).sort().map((e)=>Du(eo[e]).trim()).join(`

`)}function wd(){return process.env.WPSYNC_COMMAND||"wpsync"}function Wu(e){let t=[`**Status:** ${e.status}`,""];if(t.push(`- **Live site:** ${e.homeUrl}`),e.localUrl)t.push(`- **Local copy:** ${e.localUrl}`);let n=e.info;if(n){let r=n.theme.template!==n.theme.stylesheet?`${n.theme.name} ${n.theme.version} (child theme of ${n.theme.template})`:`${n.theme.name} ${n.theme.version}`,o=n.plugins.filter((s)=>s.active&&!s.file.startsWith("wpsync-bridge/"));if(t.push(`- **WordPress:** ${n.wordpress.version}; **theme:** ${r}`),t.push(`- **Live server:** PHP ${n.php.version}, ${n.database.engine} ${n.database.version}, ${n.server.software??"unknown web server"}`),t.push(`- **Active plugins (${o.length}):** ${o.map((s)=>`${s.name} ${s.version}`).join(", ")||"none"}`),n.muPlugins.length)t.push(`- **Must-use plugins (from the host):** ${n.muPlugins.map((s)=>s.name||s.file).join(", ")}`)}if(e.ddev)t.push(`- **Local DDEV:** PHP ${e.ddev.phpVersion}, ${e.ddev.webserver}, ${e.ddev.database}`);return t.push("",`In this file, \`wpsync\` means: \`${wd()}\``),t.join(`
`)}function bd(e,t){return Du(oo("CLAUDE.md.tmpl")).replaceAll("{{SITE_NAME}}",e).replaceAll("{{HOME_URL}}",t.homeUrl).replace("{{FACTS}}",Wu(t)).replace("{{RULES}}",Zu())}function Lu(e,t,n){let r=`<!-- wpsync:${t}:start -->`,o=`<!-- wpsync:${t}:end -->`,s=e.indexOf(r),i=e.indexOf(o);if(s<0||i<s)return`${e.trimEnd()}

${r}
${n}
${o}
`;return`${e.slice(0,s+r.length)}
${n}
${e.slice(i)}`}function Tn(e,t,n){if(!$d(e)){ro(e,bd(t,n));return}ro(e,Lu(Ou(e,"utf8"),"facts",Wu(n)))}function Fu(e){let t=Ou(e,"utf8"),n=Lu(t,"rules",Zu());if(n===t)return!1;return ro(e,n),!0}var Ed=ee(Pd(),"wp-sites"),kd=E({homeUrl:g(),setup:kt(["pending","ready"]).default("ready"),siteUrl:g().optional(),ddevName:g().optional(),localUrl:g().optional(),tablePrefix:g().optional(),lastPull:E({at:g(),tables:D(),rows:D(),files:D(),bytes:D()}).optional(),lastPush:E({at:g(),stageId:g(),finalized:ze()}).optional()});class Bu{dir;constructor(e){this.dir=e}get wpDir(){return ee(this.dir,"wp")}get backupsDir(){return ee(this.dir,"backups")}get metaPath(){return ee(this.dir,".wpsync.json")}get ddevConfigPath(){return ee(this.dir,".ddev","config.yaml")}get claudeMdPath(){return ee(this.dir,"CLAUDE.md")}exists(){return st(this.metaPath)}read(){let e=kd.safeParse(JSON.parse(xd(this.metaPath,"utf8")));if(!e.success)throw new y("bad_project",`${this.metaPath} isn't a wpsync project file.`);return e.data}write(e){An(this.metaPath,`${JSON.stringify(e,null,2)}
`)}init(e,t){Rn(ee(this.dir,".claude"),{recursive:!0});let n=ee(this.dir,".claude","settings.json");if(!st(n))An(n,Nu);if(!st(ee(this.dir,".gitignore")))An(ee(this.dir,".gitignore"),Iu);Tn(this.claudeMdPath,t,{status:"set up, not pulled yet (run wpsync pull)",homeUrl:e}),this.write({homeUrl:e,setup:"pending"})}prepare(e,t,n){if(!st(this.metaPath))this.init(e.homeUrl,n);if(Rn(ee(this.dir,".ddev"),{recursive:!0}),Rn(this.wpDir,{recursive:!0}),Rn(this.backupsDir,{recursive:!0}),An(this.ddevConfigPath,t),this.write(e),!st(ee(this.dir,".git")))Cn(this.dir,"init","-q","-b","main"),Cn(this.dir,"add",".gitignore",".wpsync.json",".ddev/config.yaml","CLAUDE.md",".claude/settings.json"),Cn(this.dir,"-c","user.name=wpsync","-c","user.email=wpsync@localhost","commit","-q","-m",`wpsync: local copy of ${e.homeUrl}`)}trackedWpFiles(){if(!st(ee(this.dir,".git")))return new Set;let e=Cn(this.dir,"ls-files","-z","--","wp");return new Set(e.split("\x00").filter(Boolean).map((t)=>t.replace(/^wp\//,"")))}ddev(e,t={}){let n=vd("ddev",e,{cwd:this.dir,encoding:"utf8",stdio:["ignore",t.show?"inherit":"pipe","pipe"],maxBuffer:67108864});if(n.error)throw new y("ddev_missing","Couldn't run DDEV.","Install it with: brew install ddev/ddev/ddev");if(n.status!==0){let r=(n.stderr||n.stdout||"").trim().split(`
`).slice(-3).join(" ");throw new y("ddev_failed",`ddev ${e.join(" ")} failed: ${r}`)}return(n.stdout??"").trim()}wp(...e){return this.ddev(["wp",...e])}syncFiles(){try{this.ddev(["mutagen","sync"])}catch{}}}function Cn(e,...t){return Uu("git",["-C",e,...t],{encoding:"utf8",stdio:["ignore","pipe","pipe"]})}function On(e){let t=new URL(e),n=`${t.host}${t.pathname}`.replace(/\/+$/,"").replace(/[/:]+/g,"-");return ee(Ed,n)}function Me(e){return new Bu(Sd(e))}function In(){try{Uu("docker",["info"],{stdio:"ignore"})}catch{throw new y("docker_not_running","Docker isn't running.","Start Docker Desktop and try again.")}}function ju(e,t={}){let n=to(e,t.allowHttp),r=Me(t.dir??On(n));if(r.exists()){let o=r.read();if(o.setup==="ready")throw new y("already_set_up",`${r.dir} is already a pulled copy of ${o.homeUrl}.`,`To refresh it, run: wpsync pull ${o.homeUrl}`);return{project:r,homeUrl:o.homeUrl,created:!1}}return r.init(n,new URL(n).host),{project:r,homeUrl:n,created:!0}}function Mu(e=process.cwd()){let t=Me(Td(e));if(!t.exists()||!zd(t.claudeMdPath))throw new y("not_a_project",`${t.dir} isn't a wpsync site project.`,"Run this inside a site's folder, or pass --dir.");return{path:t.claudeMdPath,changed:Fu(t.claudeMdPath)}}import{readdirSync as Vd,readFileSync as ol,rmSync as Kd,writeFileSync as Xd}from"fs";import{join as ao,relative as Qd,sep as eh}from"path";import{createWriteStream as Rd}from"fs";import{once as Hu}from"events";import{createGzip as Ad}from"zlib";function Cd(e){return`\`${e.replace(/`/g,"``")}\``}async function Nn(e,t,n=()=>{}){let{charset:r,tables:o}=await e.bridge(Xc,U.dbTables),s=Ad(),i=Rd(t);s.pipe(i);let a={tables:o.length,rows:0,sqlBytes:0},c=async(u)=>{if(a.sqlBytes+=Buffer.byteLength(u),!s.write(u))await Hu(s,"drain")};await c([`-- wpsync database download, ${new Date().toISOString()}`,`SET NAMES ${r||"utf8mb4"};`,"SET FOREIGN_KEY_CHECKS=0;","SET UNIQUE_CHECKS=0;","SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO';",""].join(`
`));for(let[u,l]of o.entries()){n(l.name,u,o.length),await c(`
DROP TABLE IF EXISTS ${Cd(l.name)};
${l.createSql};
`);let p;do{let f={table:l.name};if(p)f.cursor=p;let d=await e.bridge(Qc,U.dbRows,{query:f});if(d.sql)await c(d.sql);a.rows+=d.rows,p=d.next}while(p)}return await c(`
SET FOREIGN_KEY_CHECKS=1;
SET UNIQUE_CHECKS=1;
`),s.end(),await Hu(i,"finish"),a}var Od=["5.6","7.0","7.1","7.2","7.3","7.4","8.0","8.1","8.2","8.3","8.4","8.5"],Id=["5.5","10.0","10.1","10.2","10.3","10.4","10.5","10.6","10.7","10.8","10.11","11.4","11.8"],Nd=["5.5","5.6","5.7","8.0","8.4"];function so(e){let[t="0",n="0"]=e.split(".");return[Number.parseInt(t,10)||0,Number.parseInt(n,10)||0]}function qu(e,t){let[n,r]=so(e),[o,s]=so(t);return n-o||r-s}function Yu(e,t){let[n,r]=so(e),o=`${n}.${r}`,s=[...t].sort(qu);return s.find((i)=>qu(i,o)>=0)??s[s.length-1]}function Gu(e){let t=new URL(e);return`${t.hostname}${t.pathname}`.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,63).replace(/-+$/,"")||"site"}function Ju(e,t){let n=(e.server.software??"").toLowerCase(),r=n.includes("apache")||n.includes("litespeed")?"apache-fpm":"nginx-fpm",o=e.database.engine==="mysql"?"mysql":"mariadb";return{name:t,phpVersion:Yu(e.php.version,Od),webserver:r,database:{type:o,version:Yu(e.database.version,o==="mysql"?Nd:Id)}}}function Vu(e,t){return`# Local copy of ${t}, written by wpsync to match the live site's server.
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
`}import{lstatSync as Dd,mkdirSync as Zd,readdirSync as Wd,readFileSync as Ld,renameSync as Fd,rmSync as Ud,utimesSync as Bd,writeFileSync as jd}from"fs";import{dirname as Md,join as Dn}from"path";var Hd=["wp-config.php","wp-config-ddev.php"],qd=4;async function it(e,t=()=>{}){let n=[],r;do{let o=await e.bridge(tu,U.filesList,{query:r?{cursor:r}:{}});for(let s of o.entries){if(!ou(s.path))throw new y("bad_path",`The site listed an unsafe path: ${s.path}`);n.push(s)}t(n.length),r=o.next}while(r);return n}function Zn(e){let t=new Map,n=(r,o)=>{let s;try{s=Wd(r)}catch{return}for(let i of s){let a=o?`${o}/${i}`:i;if(Ue(a)||Ue(a,Hd)||i.endsWith(".wpsync-tmp"))continue;let c=Dn(r,i),u=Dd(c);if(u.isSymbolicLink())continue;if(u.isDirectory())n(c,a);else if(u.isFile())t.set(a,{size:u.size,mtime:Math.floor(u.mtimeMs/1000)})}};return n(e,""),t}function io(e,t){return!!t&&t.size===e.size&&Math.abs(t.mtime-e.mtime)<=1}function Xu(e,t,n){let r={fetch:[],remove:[],unchanged:0},o=new Set;for(let s of e){if(o.add(s.path),n.has(s.path))continue;if(io(s,t.get(s.path)))r.unchanged++;else r.fetch.push(s)}for(let s of t.keys())if(!o.has(s)&&!n.has(s))r.remove.push(s);return r}function Yd(e){let t=[],n=0;while(n<e.length){let r=e.indexOf(10,n);if(r<0)throw new y("bad_stream","The site's file stream ended in the middle of a header.");let o=nu.parse(JSON.parse(e.subarray(n,r).toString("utf8")));if(n=r+1,o.missing){t.push({header:o,content:null});continue}if(n+o.size>e.length)throw new y("bad_stream",`The site's file stream was cut off in ${o.path}.`);t.push({header:o,content:e.subarray(n,n+o.size)}),n+=o.size}return t}function Qu(e){let t=[],n=[],r=[],o=0;for(let s of e){if(s.size>Ot){n.push(s);continue}if(r.length&&(o+s.size>Ot||r.length>=vo))t.push(r),r=[],o=0;r.push(s),o+=s.size}if(r.length)t.push(r);return{small:t,large:n}}async function el(e,t){let n=await e.bridgeRaw(U.filesFetch,{method:"POST",body:{paths:t}});return Yd(n.bytes)}async function tl(e,t){let n=[],r=0,o=Number.POSITIVE_INFINITY;while(r<o){let s=await e.bridgeRaw(U.filesRead,{query:{path:t,offset:String(r),length:String(Ot)}}).catch((i)=>{if(i instanceof y&&/HTTP 404/.test(i.message))return null;throw i});if(!s)return null;if(o=Number(s.headers.get(ru)??"0"),s.bytes.length===0)break;n.push(s.bytes),r+=s.bytes.length}return{content:Buffer.concat(n),size:r}}function Ku(e,t,n,r){let o=Dn(e,t);Zd(Md(o),{recursive:!0});let s=`${o}.wpsync-tmp`;jd(s,n),Fd(s,o),Bd(o,r,r)}async function Gd(e,t){let n=0,r=Array.from({length:Math.min(qd,e.length)},async()=>{while(n<e.length){let o=e[n++];await t(o)}});await Promise.all(r)}async function Wn(e,t,n,r=()=>{}){let o={files:0,bytes:0,vanished:[]},{small:s,large:i}=Qu(n),a=(c)=>{o.files++,o.bytes+=c,r(o.files,o.bytes)};await Gd(s,async(c)=>{for(let{header:u,content:l}of await el(e,c.map((p)=>p.path))){if(u.missing||!l){o.vanished.push(u.path);continue}Ku(t,u.path,l,u.mtime),a(l.length)}});for(let c of i){let u=await tl(e,c.path);if(!u){o.vanished.push(c.path);continue}Ku(t,c.path,u.content,c.mtime),a(u.content.length)}return o}async function Jd(e,t){let n=new Map,{small:r,large:o}=Qu(t);for(let s of r)for(let{header:i,content:a}of await el(e,s.map((c)=>c.path)))n.set(i.path,a);for(let s of o)n.set(s.path,(await tl(e,s.path))?.content??null);return n}function nl(e,t){for(let n of t)Ud(Dn(e,n),{force:!0})}async function rl(e,t,n,r){if(n.size===0)return[];let o=new Map(r.map((c)=>[c.path,c])),s=[],i=[];for(let c of n){let u=o.get(c);if(u)i.push(u);else s.push(`${c} (not on the live site)`)}let a=await Jd(e,i);for(let c of i){let u=null;try{u=Ld(Dn(t,c.path))}catch{}let l=a.get(c.path);if(!u||!l||!u.equals(l))s.push(c.path)}return s.sort()}var th=5;async function sl(e,t){let n=e.log??(()=>{}),r=t.now??(()=>new Date);In();let o=await rt(e.url,{allowHttp:e.allowHttp}),s=await t.store.get(ot(o.homeUrl));if(!s)throw new y("not_connected",`wpsync isn't connected to ${o.homeUrl} yet.`,`Run: wpsync connect ${o.homeUrl}`);let i=new je(o,s.username,s.applicationPassword);return i.withBridge(async()=>{let a=await i.bridge(tt,U.info);nh(a);let c=Me(e.dir??On(o.homeUrl)),u=c.exists()?c.read():void 0,l=!u||u.setup==="pending",p=[];if(u&&!l&&u.homeUrl!==o.homeUrl)throw new y("project_mismatch",`${c.dir} is a copy of ${u.homeUrl}, not ${o.homeUrl}.`);let f=!l&&u?.ddevName||e.name||Gu(o.homeUrl),d=Ju(a,f),h=`https://${f}.ddev.site`,_={...u,homeUrl:o.homeUrl,setup:"ready",siteUrl:o.siteUrl,ddevName:f,localUrl:h,tablePrefix:a.database.tablePrefix};if(l)n(`Setting up ${c.dir}`),n(`  DDEV: PHP ${d.phpVersion}, ${d.webserver}, ${d.database.type} ${d.database.version}`),c.prepare(_,Vu(d,o.homeUrl),a.site.name);else p.push(...rh(c,d));n("Listing the site's files\u2026");let w=await it(i),v=Zn(c.wpDir),A=c.trackedWpFiles();if(A.size&&!e.overwriteCode){let x=await rl(i,c.wpDir,A,w);if(x.length){let I=x.slice(0,15).map((j)=>`  ${j}`);if(x.length>15)I.push(`  \u2026and ${Z(x.length-15)} more`);throw new y("code_drift",`Code tracked in git differs on the live site, so pulling would overwrite your work:
${I.join(`
`)}`,"Compare the live copies with yours, then pull again with --overwrite-code to take live's, or keep yours and publish them.")}}let z=Xu(w,v,e.overwriteCode?new Set:A),O=r().toISOString().replace(/[:.]/g,"-"),k=ao(c.backupsDir,`pull-${O}.sql.gz`);n("Downloading the database\u2026");let P=await Nn(i,k,(x,I,j)=>n(`  ${I+1}/${j} ${x}`));n(`  ${Z(P.tables)} tables, ${Z(P.rows)} rows, ${ve(P.sqlBytes)} of SQL`),ih(c),n(`Files: ${Z(z.fetch.length)} to download, ${Z(z.remove.length)} to delete, ${Z(z.unchanged)} unchanged`);let R=0,S=await Wn(i,c.wpDir,z.fetch,(x,I)=>{if(x-R>=500)R=x,n(`  ${Z(x)} files, ${ve(I)}`)});if(nl(c.wpDir,z.remove),S.vanished.length)p.push(`${Z(S.vanished.length)} files disappeared from live during the pull.`);n("Starting DDEV and loading the database\u2026"),c.ddev(["start","-y"]),oh(c,a.database.tablePrefix),c.syncFiles(),c.ddev(["import-db",`--file=${k}`]),n("Switching addresses to the local copy\u2026");for(let[x,I]of sh(o.siteUrl,o.homeUrl,h))c.wp("search-replace",x,I,"--all-tables-with-prefix","--precise","--quiet");return c.wp("cache","flush"),c.wp("rewrite","flush"),c.write({..._,lastPull:{at:r().toISOString(),tables:P.tables,rows:P.rows,files:w.length,bytes:S.bytes}}),Tn(c.claudeMdPath,a.site.name,{status:`pulled from live ${r().toISOString().slice(0,16).replace("T"," ")} UTC`,homeUrl:o.homeUrl,localUrl:h,info:a,ddev:{phpVersion:d.phpVersion,webserver:d.webserver,database:`${d.database.type} ${d.database.version}`}}),{projectDir:c.dir,localUrl:h,firstPull:l,tables:P.tables,rows:P.rows,sqlBytes:P.sqlBytes,filesFetched:S.files,bytesFetched:S.bytes,filesDeleted:z.remove.length,filesUnchanged:z.unchanged,warnings:p}})}function nh(e){if(e.site.multisite)throw new y("unsupported","This is a WordPress multisite network, which wpsync doesn't support yet.");let t=Qd(e.paths.abspath,e.paths.contentDir);if(t.startsWith("..")||t.startsWith(eh))throw new y("unsupported","This site keeps wp-content outside its WordPress folder, which wpsync doesn't support yet.")}function rh(e,t){let n=ol(e.ddevConfigPath,"utf8"),r=/php_version:\s*"?([\d.]+)"?/.exec(n)?.[1],o=/database:\s*\n\s*type:\s*(\w+)\s*\n\s*version:\s*"?([\d.]+)"?/.exec(n),s=[];if(r&&r!==t.phpVersion)s.push(`Live now runs PHP ${t.phpVersion}; the local copy uses ${r} (.ddev/config.yaml).`);if(o&&(o[1]!==t.database.type||o[2]!==t.database.version))s.push(`Live's database is now ${t.database.type} ${t.database.version}; the local copy uses ${o[1]} ${o[2]}.`);return s}function oh(e,t){if(!/^[A-Za-z0-9_]+$/.test(t))throw new y("bad_prefix",`The site's table prefix "${t}" isn't usable.`);let n=ao(e.wpDir,"wp-config.php"),r=ol(n,"utf8"),o=r.replace(/\$table_prefix\s*=\s*['"][^'"]*['"]\s*;/,`$table_prefix = '${t}';`);if(o!==r)Xd(n,o)}function sh(e,t,n){let r=[],o=(s)=>{let i=new URL(s),a=i.pathname.replace(/\/+$/,"");for(let c of["https","http"]){let u=`${c}://${i.host}${a}`,l=`${n}${a}`;if(r.some(([p])=>p===u))continue;r.push([u,l]),r.push([u.replace(/\//g,"\\/"),l.replace(/\//g,"\\/")])}};return o(e),o(t),r.sort((s,i)=>i[0].length-s[0].length)}function ih(e){let t=Vd(e.backupsDir).filter((n)=>/^pull-.*\.sql\.gz$/.test(n)).sort().reverse();for(let n of t.slice(th))Kd(ao(e.backupsDir,n),{force:!0})}import{execFileSync as fh}from"child_process";import{createHash as dh}from"crypto";import{mkdirSync as hh,rmSync as mh}from"fs";import{join as uo}from"path";import{gzipSync as gh}from"zlib";import{closeSync as cl,mkdirSync as ul,openSync as ll,readdirSync as ah,readFileSync as ch,readSync as uh,rmSync as co,statSync as pl,writeFileSync as il,writeSync as lh}from"fs";import{dirname as fl,join as xe}from"path";function Ln(e){return xe(e.dir,".wpsync-tmp")}function al(e,t){let n=t?Yn.filter((r)=>r!==".htaccess"):Yn;return Ue(e)||Ue(e,n)||Ue(e,["wp-config-ddev.php"])}function dl(e,t,n){let r=new Map(e.map((s)=>[s.path,s])),o={upload:[],remove:[],uploadBytes:0};for(let[s,i]of t){if(al(s,n))continue;let a=r.get(s);if(a&&io(a,i))continue;o.upload.push({path:s,size:i.size,mtime:i.mtime}),o.uploadBytes+=i.size}for(let s of e)if(!t.has(s.path)&&!al(s.path,n))o.remove.push(s.path);return o.upload.sort((s,i)=>s.path<i.path?-1:1),o.remove.sort(),o}function hl(e,t){let n=xe(Ln(e),"files.wpa");ul(fl(n),{recursive:!0});let r=ll(n,"w"),o=0,s=(i)=>{lh(r,i),o+=i.length};try{for(let i of t.upload){let a=ch(xe(e.wpDir,i.path)),c=Math.floor(pl(xe(e.wpDir,i.path)).mtimeMs/1000);s(Buffer.from(`${JSON.stringify({path:i.path,size:a.length,mtime:c})}
`)),s(a)}for(let i of t.remove)s(Buffer.from(`${JSON.stringify({path:i,delete:!0})}
`))}finally{cl(r)}return{path:n,bytes:o}}function ml(e,t,n,r){let o=Ln(e),s=xe(o,"bridge");co(s,{recursive:!0,force:!0});for(let l of["includes/protocol.php","includes/class-wpsync-db.php"]){let p=xe(s,l);ul(fl(p),{recursive:!0}),il(p,kn[l])}il(xe(s,"export.php"),Pu["export.php"]);let i=xe(o,"db.frames");co(i,{force:!0}),e.syncFiles();let a=`wpsync-push-${Date.now()}`;r("  Saving a snapshot of the local database\u2026"),e.ddev(["snapshot","--name",a]);let c;try{r("  Switching addresses to live's for the export\u2026");for(let[p,f]of n)e.wp("search-replace",p,f,"--all-tables-with-prefix","--precise","--quiet");r("  Exporting the database\u2026");let l=e.wp("eval-file","/var/www/html/.wpsync-tmp/bridge/export.php","/var/www/html/.wpsync-tmp/db.frames",t);c=JSON.parse(l.split(`
`).pop()??"{}")}finally{r("  Restoring the local database from the snapshot\u2026"),e.ddev(["snapshot","restore",a]),ph(e,a)}e.syncFiles();let u;try{u=pl(i).size}catch{throw new y("export_failed","The local database export didn't produce a file.")}if(!c.tables)throw new y("export_failed","The local database export found no tables.");return{path:i,bytes:u,...c}}function ph(e,t){let n=xe(e.dir,".ddev","db_snapshots");try{for(let r of ah(n))if(r.startsWith(t))co(xe(n,r),{recursive:!0,force:!0})}catch{}}function*gl(e,t){let n=ll(e,"r");try{let r=Buffer.alloc(t);for(;;){let o=uh(n,r,0,t,null);if(o===0)return;yield Buffer.from(r.subarray(0,o))}}finally{cl(n)}}function _l(e,t,n){let r=[],o=new URL(n),s=(i)=>{let a=new URL(i).pathname.replace(/\/+$/,""),c=i.replace(/\/+$/,"");for(let u of["https","http"]){let l=`${u}://${o.host}${a}`;if(r.some(([p])=>p===l))continue;r.push([l,c]),r.push([l.replace(/\//g,"\\/"),c.replace(/\//g,"\\/")])}};return s(e),s(t),r.sort((i,a)=>a[0].length-i[0].length)}async function lo(e,t){let n=Me(e.dir??process.cwd());if(!n.exists())throw new y("not_a_project",`${n.dir} isn't a wpsync site project.`,"Run this in the site's folder, or pass --dir.");let r=n.read();if(r.setup!=="ready"||!r.localUrl||!r.siteUrl)throw new y("not_pulled","This project hasn't been pulled yet, so there's nothing to publish.",`Run: wpsync pull ${r.homeUrl}`);let o=await rt(r.homeUrl,{allowHttp:e.allowHttp}),s=await t.get(ot(o.homeUrl));if(!s)throw new y("not_connected",`wpsync isn't connected to ${o.homeUrl}.`,`Run: wpsync connect ${o.homeUrl}`);return{project:n,meta:r,site:o,rest:new je(o,s.username,s.applicationPassword),log:e.log??(()=>{})}}function _h(e){try{return fh("git",["-C",e.dir,"status","--porcelain","--untracked-files=no","--","wp"],{encoding:"utf8"}).split(`
`).filter(Boolean).map((n)=>n.slice(3))}catch{return[]}}function yh(e){return e.includes("/")?e.split("/")[0]:e.replace(/\.php$/,"")}function $h(e,t){let n=JSON.parse(t.wp("plugin","list","--format=json","--fields=name,status,version")),r=new Map(e.plugins.filter((i)=>!i.file.startsWith("wpsync-bridge/")).map((i)=>[yh(i.file),i])),o=new Map(n.filter((i)=>i.status!=="must-use"&&i.status!=="dropin").map((i)=>[i.name,i])),s={added:[],removed:[],updated:[]};for(let[i,a]of o){let c=r.get(i);if(!c)s.added.push({name:i,local:a.version});else if(c.version!==a.version)s.updated.push({name:i,live:c.version,local:a.version})}for(let[i,a]of r)if(!o.has(i))s.removed.push({name:i,live:a.version});return s}async function wh(e,t,n){let{project:r,meta:o,rest:s,log:i}=e,a=[o.lastPull?.at,o.lastPush?.at].filter((d)=>!!d).sort().pop(),c=a?await s.bridge(su,U.changes,{query:{since:a}}):null;i("Comparing files with live\u2026");let u=dl(await it(s),Zn(r.wpDir),n),[l="0",p="0"]=r.wp("db","query","SELECT COUNT(*), COALESCE(SUM(DATA_LENGTH + INDEX_LENGTH), 0) FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE()","--skip-column-names").split(/\s+/),f=r.wp("option","get","stylesheet");return{homeUrl:e.site.homeUrl,host:new URL(e.site.homeUrl).host,lastPull:o.lastPull?.at,liveChanges:c,files:u,plugins:$h(t,r),theme:{live:t.theme.stylesheet,local:f},database:{tables:Number(l),bytes:Number(p)}}}async function $l(e,t){let n=await lo(e,t.store),{project:r,meta:o,site:s,rest:i,log:a}=n,c=t.now??(()=>new Date),u=!!e.includeHtaccess;if(In(),o.lastPush&&!o.lastPush.finalized)throw new y("push_pending","The last push is still waiting to be finalized or rolled back.","Check the live site, then run wpsync finalize (keep it) or wpsync rollback (undo it).");let l=_h(r);if(l.length&&!e.dryRun)throw new y("uncommitted_code",`Commit your code before publishing:
${l.map((p)=>`  ${p}`).join(`
`)}`);return r.ddev(["start","-y"]),i.withBridge(async()=>{let p=await i.bridge(tt,U.info);if(!p.capabilities.writable.abspath||!p.capabilities.writable.contentDir)throw new y("not_writable","WordPress can't write its own files on this host, so wpsync can't publish to it.");let f=await wh(n,p,u);if(e.dryRun||!e.confirm)return{plan:f,applied:!1};if(e.confirm.toLowerCase()!==f.host.toLowerCase())throw new y("confirm_mismatch",`--confirm must be the live site's host, ${f.host}.`);let d=c().toISOString().replace(/[:.]/g,"-"),h=uo(r.backupsDir,`push-${d}`);hh(h,{recursive:!0}),a("Backing up live's database\u2026"),await Nn(i,uo(h,"live.sql.gz"));let _=new Set((await it(i)).map((z)=>z.path)),w=[...f.files.upload.filter((z)=>_.has(z.path)).map((z)=>z.path),...f.files.remove];if(w.length){a(`Backing up ${Z(w.length)} live files this push replaces or deletes\u2026`);let z=(await it(i)).filter((O)=>w.includes(O.path));await Wn(i,uo(h,"files"),z)}let v=await i.bridge(iu,U.stageBegin,{method:"POST",body:{dbBytes:f.database.bytes,filesBytes:f.files.uploadBytes,includeHtaccess:u}}),A=!1;try{a("Preparing the local copy for live\u2026");let z=ml(r,v.newPrefix,_l(o.siteUrl,o.homeUrl,o.localUrl),a),O=hl(r,f.files),k=Math.max(16384,Math.min(bo,v.chunkBytes-4096));a(`Uploading the database (${ve(z.bytes)})\u2026`);let P=await yl(i,v.stageId,"db",z.path,k);a(`Uploading ${Z(f.files.upload.length)} files (${ve(O.bytes)})\u2026`);let R=await yl(i,v.stageId,"files",O.path,k);a("Publishing\u2026");let S=await at(i,U.stageApply,{stage:v.stageId,chunks:{db:P,files:R}},a);if(S.step!=="applied")throw a(`Publishing failed: ${S.error??"unknown error"}. Rolling back\u2026`),await at(i,U.rollback,{stage:v.stageId},a),new y("push_failed",`Publishing failed and live was put back as it was: ${S.error??"unknown error"}`);A=!0,a("Checking the live site\u2026");let x=await bh(s),I=x.filter((j)=>!j.ok);if(I.length)throw a("Live pages aren't loading properly. Rolling back\u2026"),await at(i,U.rollback,{stage:v.stageId},a),new y("push_broke_site",`The published site didn't load properly, so wpsync put the old one back:
${I.map((j)=>`  ${j.url} (HTTP ${j.status})`).join(`
`)}`,"Check those pages locally (ddev logs shows PHP errors), fix, and publish again.");return r.write({...o,lastPush:{at:c().toISOString(),stageId:v.stageId,finalized:!1}}),{plan:f,applied:!0,stageId:v.stageId,checks:x,skipped:S.skipped,backupDir:h}}catch(z){if(!A)await at(i,U.finalize,{stage:v.stageId},()=>{}).catch(()=>{});throw z}finally{mh(Ln(r),{recursive:!0,force:!0})}})}async function yl(e,t,n,r,o){let s=[],i=0;for(let c of gl(r,o))s.push({seq:i++,data:gh(c)});let a=0;return await Promise.all(Array.from({length:Math.min(3,s.length)},async()=>{while(a<s.length){let{seq:c,data:u}=s[a++];await e.bridge(au,U.stageChunk,{method:"PUT",query:{stage:t,part:n,seq:String(c),sha256:dh("sha256").update(u).digest("hex")},bytes:u})}})),s.length}async function at(e,t,n,r){let o="";for(;;){let s=await e.bridge(cu,t,{method:"POST",body:n}),i=s.progress?`${s.step} (${Math.round(100*s.progress.done/Math.max(1,s.progress.total))}%)`:s.step;if(i!==o)r(`  ${i}`);if(o=i,s.done)return s}}async function bh(e){let t=new Set([`${e.homeUrl}/`]);for(let[r,o]of[["/wp/v2/pages","2"],["/wp/v2/posts","1"]]){let s=await Y(e.restUrl(r,{per_page:o,_fields:"link"})).catch(()=>null),i=s?.status===200?we(s.text):null;if(Array.isArray(i)){for(let a of i)if(typeof a?.link==="string")t.add(a.link)}}let n=[];for(let r of t){let o=await Y(r).catch(()=>null),s=o?.status??0,i=!o||/There has been a critical error|Fatal error|Parse error/i.test(o.text);n.push({url:r,status:s,ok:s===200&&!i})}return n}async function wl(e,t){let n=await lo(e,t.store),r=n.meta.lastPush;if(!r||r.finalized)throw new y("nothing_to_roll_back","There's no push to roll back (the last one was finalized, or there wasn't one).");await n.rest.withBridge(async()=>{let i=await at(n.rest,U.rollback,{stage:r.stageId},n.log);if(i.step!=="rolled-back")throw new y("rollback_failed",`Rollback stopped: ${i.error??"unknown error"}`)});let{lastPush:o,...s}=n.meta;n.project.write(s)}async function bl(e,t){let n=await lo(e,t.store),r=n.meta.lastPush;if(!r||r.finalized)throw new y("nothing_to_finalize","There's no push waiting to be finalized.");await n.rest.withBridge(async()=>{let o=await at(n.rest,U.finalize,{stage:r.stageId},n.log);if(o.step!=="finalized")throw new y("finalize_failed",`Finalize stopped: ${o.error??"unknown error"}`)}),n.project.write({...n.meta,lastPush:{...r,finalized:!0}})}import{execFileSync as po}from"child_process";var vh=E({homeUrl:g(),siteUrl:g(),username:g(),applicationPassword:g(),applicationPasswordUuid:g(),applicationPasswordName:g(),connectedAt:g()});class He{service;constructor(e="wpsync"){this.service=e}async get(e){let t;try{t=po("security",["find-generic-password","-s",this.service,"-a",e,"-w"],{encoding:"utf8",stdio:["ignore","pipe","ignore"]}).trim()}catch{return null}let n=vh.safeParse(xh(t));return n.success?n.data:null}async set(e,t){let n=Buffer.from(JSON.stringify(t)).toString("base64"),r=`add-generic-password -U -s ${Fn(this.service)} -a ${Fn(e)} -l ${Fn(`wpsync ${e}`)} -w ${Fn(n)}
`;if(po("security",["-i"],{input:r,stdio:["pipe","ignore","ignore"]}),(await this.get(e))?.applicationPasswordUuid!==t.applicationPasswordUuid)throw new y("keychain_failed","Couldn't save the site's key in the macOS Keychain.")}async delete(e){try{po("security",["delete-generic-password","-s",this.service,"-a",e],{stdio:"ignore"})}catch{}}}function Fn(e){if(/["\\\n]/.test(e))throw Error(`can't pass ${JSON.stringify(e)} to security -i`);return`"${e}"`}function xh(e){try{return JSON.parse(Buffer.from(e,"base64").toString("utf8"))}catch{return}}var fo="0.1.0",vl=`wpsync ${fo}

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

  wpsync push [--dry-run] [--confirm <live-host>] [--include-htaccess] [--dir <folder>]
      Publish: replace the live site (database and files) with the local copy. Without
      --confirm it only shows what would change. Live's wp-config.php, .htaccess and
      host-added files are kept. Backs up live into backups/ first; checks live after.

  wpsync rollback [--dir <folder>]
      Put live back as it was before the last push.

  wpsync finalize [--dir <folder>]
      Keep the last push and delete the old version saved on the server.

  wpsync update-rules [--dir <folder>]
      Refresh the WordPress rules in a project's CLAUDE.md from this wpsync.

  wpsync --version
  wpsync help

For local development sites only, --allow-http accepts an http:// address.
`,Ph=new Set(["user","dir","name","confirm"]);function De(e,t){let n=e.flags.get(t);return typeof n==="string"?n:void 0}function Sh(e){let t=[],n=new Map;for(let r=0;r<e.length;r++){let o=e[r];if(!o.startsWith("--")){t.push(o);continue}let[s,i]=o.slice(2).split("=",2),a=e[r+1];if(i!==void 0)n.set(s,i);else if(Ph.has(s)&&a&&!a.startsWith("--"))n.set(s,e[++r]);else n.set(s,!0)}return{command:t.shift(),positional:t,flags:n}}async function Eh(e){let t=e.positional[0];if(!t)throw new ct("connect needs the site's address, e.g. wpsync connect https://example.com");let n=e.flags.get("user"),r=await Au({url:t,username:typeof n==="string"?n:void 0,allowHttp:e.flags.has("allow-http"),log:(i)=>console.log(i)},{credentials:Cu,store:new He}),{info:o}=r,s=o.plugins.filter((i)=>i.active&&i.file!=="wpsync-bridge/wpsync-bridge.php").length;if(console.log(`
Connected to ${o.site.name} (${r.site.homeUrl})
  Signed in as   ${r.connection.username}; key "${r.connection.applicationPasswordName}" saved in the Keychain
  Bridge         ${r.bridge==="uploaded"?"installed":"already installed"}, version ${o.bridge.version}, switched off
  WordPress      ${o.wordpress.version}${o.site.multisite?" (multisite: not supported yet)":""}
  PHP            ${o.php.version}
  Database       ${o.database.engine} ${o.database.version}
  Web server     ${o.server.software??"unknown"}
  Theme          ${o.theme.name} ${o.theme.version}${o.theme.template!==o.theme.stylesheet?` (child of ${o.theme.template})`:""}
  Plugins        ${s} active of ${o.plugins.length-1}`),!o.capabilities.fileModsAllowed)console.log(`
Warning: this site doesn't allow file changes (DISALLOW_FILE_MODS). Publishing to it won't work.`)}async function kh(e){let t=e.positional[0];if(!t)throw new ct("pull needs the site's address, e.g. wpsync pull https://example.com");let n=await sl({url:t,dir:De(e,"dir"),name:De(e,"name"),allowHttp:e.flags.has("allow-http"),overwriteCode:e.flags.has("overwrite-code"),log:(r)=>console.log(r)},{store:new He});console.log(`
${n.firstPull?"Pulled":"Refreshed"} the local copy
  Folder     ${n.projectDir}
  Local URL  ${n.localUrl}
  Database   ${Z(n.tables)} tables, ${Z(n.rows)} rows
  Files      ${Z(n.filesFetched)} downloaded (${ve(n.bytesFetched)}), ${Z(n.filesDeleted)} deleted, ${Z(n.filesUnchanged)} unchanged`);for(let r of n.warnings)console.log(`
Note: ${r}`)}function zh(e){let t=e.positional[0];if(!t)throw new ct("init needs the site's address, e.g. wpsync init https://example.com");let n=ju(t,{dir:De(e,"dir"),allowHttp:e.flags.has("allow-http")});console.log(`${n.created?"Created":"Already set up"}: ${n.project.dir}
  Site: ${n.homeUrl} (setup pending: nothing has been pulled yet)

Next: start a new Claude Code session in that folder, so its CLAUDE.md and permissions load.
  Desktop app: start a new session on the folder; optionally set the permission mode to
               Bypass permissions.
  Terminal:    cd "${n.project.dir}" && claude
               (or claude --dangerously-skip-permissions to skip prompts)
Then say "continue wp-dev".`)}function Th(e){let t=Mu(De(e,"dir"));console.log(t.changed?`Updated the rules in ${t.path}`:`The rules in ${t.path} are already current.`)}function Rh(e){let t=[`Publishing would replace ${e.homeUrl} with this local copy:`];t.push(`  Database   ${Z(e.database.tables)} tables (${ve(e.database.bytes)})`),t.push(`  Files      ${Z(e.files.upload.length)} to upload (${ve(e.files.uploadBytes)}), ${Z(e.files.remove.length)} to delete on live`);for(let i of e.files.remove.slice(0,10))t.push(`               delete ${i}`);if(e.files.remove.length>10)t.push(`               \u2026and ${Z(e.files.remove.length-10)} more`);if(e.theme.live!==e.theme.local)t.push(`  Theme      ${e.theme.live} \u2192 ${e.theme.local}`);let{added:n,removed:r,updated:o}=e.plugins;if(n.length)t.push(`  Plugins +  ${n.map((i)=>`${i.name} ${i.local}`).join(", ")}`);if(r.length)t.push(`  Plugins \u2212  ${r.map((i)=>`${i.name} ${i.live}`).join(", ")}`);if(o.length)t.push(`  Plugins    ${o.map((i)=>`${i.name} ${i.live} \u2192 ${i.local}`).join(", ")}`);let s=e.liveChanges;if(s){let a=[...Object.entries(s.posts).map(([c,u])=>`${Z(u)} ${c}`),s.comments?`${Z(s.comments)} comments`:"",s.users?`${Z(s.users)} new users`:""].filter(Boolean);t.push(a.length?`
  Warning: since ${s.since}, people changed things on live that publishing will overwrite: ${a.join(", ")}. Pull first to keep them.`:`
  Nothing changed on live since ${s.since}.`)}else t.push(`
  wpsync can't tell what changed on live: this copy has no pull time.`);console.log(t.join(`
`))}async function Ah(e){let t=De(e,"confirm"),n=await $l({dir:De(e,"dir"),dryRun:e.flags.has("dry-run")||!t,confirm:t,includeHtaccess:e.flags.has("include-htaccess"),allowHttp:e.flags.has("allow-http"),log:(r)=>console.log(r)},{store:new He});if(!n.applied){Rh(n.plan),console.log(`
To publish: wpsync push --confirm ${n.plan.host}`);return}console.log(`
Published to ${n.plan.homeUrl}`);for(let r of n.checks??[])console.log(`  ${r.ok?"ok ":"BAD"} ${r.status} ${r.url}`);if(n.skipped?.length)console.log(`  Left alone on live (protected): ${n.skipped.join(", ")}`);console.log(`  Backup of what changed: ${n.backupDir}`),console.log(`
The old version stays saved on the server. When you're happy: wpsync finalize. To undo: wpsync rollback.`)}async function Ch(e){await wl({dir:De(e,"dir"),allowHttp:e.flags.has("allow-http"),log:(t)=>console.log(t)},{store:new He}),console.log("Rolled back: live is as it was before the last push.")}async function Oh(e){await bl({dir:De(e,"dir"),allowHttp:e.flags.has("allow-http"),log:(t)=>console.log(t)},{store:new He}),console.log("Finalized: the previous version on the server is deleted. (backups/ still has a local copy.)")}class ct extends Error{}async function Ih(e){let t=Sh(e);try{switch(t.command){case"connect":return await Eh(t),0;case"pull":return await kh(t),0;case"push":return await Ah(t),0;case"rollback":return await Ch(t),0;case"finalize":return await Oh(t),0;case"init":return zh(t),0;case"update-rules":return Th(t),0;case void 0:case"help":return console.log(vl),0;default:if(t.flags.has("version"))return console.log(`wpsync ${fo} (bridge ${Ge})`),0;throw new ct(`Unknown command "${t.command}".`)}}catch(n){if(n instanceof ct)return console.error(`${n.message}

${vl}`),2;if(n instanceof y)return console.error(`
${n.message}${n.hint?`
${n.hint}`:""}`),1;throw n}}var xl=process.argv.slice(2);if(xl[0]==="--version")console.log(`wpsync ${fo} (bridge ${Ge})`);else process.exitCode=await Ih(xl);
