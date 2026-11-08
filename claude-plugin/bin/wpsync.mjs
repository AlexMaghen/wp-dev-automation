#!/usr/bin/env bun
// @bun
var ap=Object.defineProperty;var cp=(e)=>e;function lp(e,t){this[e]=cp.bind(null,t)}var Ko=(e,t)=>{for(var n in t)ap(e,n,{get:t[n],enumerable:!0,configurable:!0,set:lp.bind(t,n)})};var Nn={};Ko(Nn,{ZodISODate:()=>It,ZodISODateTime:()=>Ot,ZodISODuration:()=>Dt,ZodISOTime:()=>Nt,date:()=>lf,datetime:()=>cf,duration:()=>pf,time:()=>uf});var Zt={};Ko(Zt,{bigint:()=>mf,boolean:()=>hf,date:()=>gf,number:()=>ff,string:()=>df});var Ge="0.1.2",hr="wpsync/v1",mr="wpsync-bridge",Xo="wpsync-bridge/wpsync-bridge.php";var W={info:"/info",dbTables:"/db/tables",dbRows:"/db/rows",filesList:"/files/list",filesFetch:"/files/fetch",filesRead:"/files/read",changes:"/changes",stageBegin:"/stage/begin",stageChunk:"/stage/chunk",stageApply:"/stage/apply",rollback:"/rollback",finalize:"/finalize",selfUpdate:"/self-update"},Qo=["wp-config.php",".maintenance",".git",".svn","error_log","wp-content/plugins/wpsync-bridge","wp-content/uploads/wpsync-stage-*","wp-content/cache","wp-content/upgrade","wp-content/upgrade-temp-backup","wp-content/debug.log","wp-content/ai1wm-backups","wp-content/updraft","wp-content/backups-dup-lite","wp-content/backups-dup-pro","wp-content/wpvividbackups","wp-content/wflogs"],gr=[".htaccess",".gitignore",".user.ini","php.ini","web.config",".well-known","wp-content/mu-plugins","wp-content/object-cache.php","wp-content/advanced-cache.php","wp-content/db.php","wp-content/sunrise.php"],es=4000000;var Yt=8000000,ts=500;function vt(e){let t=Object.values(e).filter((r)=>typeof r==="number");return Object.entries(e).filter(([r,o])=>t.indexOf(+r)===-1).map(([r,o])=>o)}function wr(e,t="|"){return e.map((n)=>br(n)).join(t)}function Pt(e,t){if(typeof t==="bigint")return t.toString();return t}class ns{constructor(e){this._getter=e,this._value=void 0}get value(){let e=this._getter;if(e!==void 0)this._value=e(),this._getter=void 0;return this._value}}function Gt(e){return new ns(e)}function rs(e){return e===null||e===void 0}function Vt(e){let t=e.startsWith("^")?1:0,n=e.endsWith("$")?e.length-1:e.length;return e.slice(t,n)}function os(e,t){let n=e/t,r=Math.round(n),o=4*Number.EPSILON*Math.max(Math.abs(n),1);if(Math.abs(n-r)<o)return 0;return n-r}function _e(e,t,n){Object.defineProperty(e,t,{value:n,writable:!0,enumerable:!0,configurable:!0})}function Jt(e){let t=Object.getOwnPropertyDescriptor(e,"shape");return t?.get?t.get.raw:t?.value}function Ne(e){return Jt(e._zod.def)??e._zod.def.shape}function ss(e,t,n){Object.defineProperty(e,t,{get(){let r=n();return _e(this,t,r),r},enumerable:!0,configurable:!0})}function is(e,t,n){if(t in e)_e(e,t,n);else e[t]=n}function Ve(e,t,n,r){let o=Ne(t);for(let s of n){let i=Object.getOwnPropertyDescriptor(o,s);if(!i.enumerable)continue;if(i.get)ss(e,s,()=>{let a=t._zod.def.shape[s];return r?r(a,s):a});else is(e,s,r?r(i.value,s):i.value)}}function up(e,t){for(let n of Reflect.ownKeys(t)){let r=Object.getOwnPropertyDescriptor(t,n);if(!r.enumerable)continue;if(r.get)ss(e,n,()=>t[n]);else is(e,n,r.value)}}function le(...e){let t={};for(let n of e){let r=Object.getOwnPropertyDescriptors(n);Object.assign(t,r)}return Object.defineProperties({},t)}function as(e){return JSON.stringify(e)}function cs(e){return e.toLowerCase().trim().replace(/[^\w\s-]/g,"").replace(/[\s_-]+/g,"-").replace(/^-+|-+$/g,"")}var _r="captureStackTrace"in Error?Error.captureStackTrace:(...e)=>{};function bt(e){return typeof e==="object"&&e!==null&&!Array.isArray(e)}var ls=Gt(()=>{if(re.jitless)return!1;if(typeof navigator<"u"&&navigator?.userAgent?.includes("Cloudflare"))return!1;try{return new Function(""),!0}catch(e){return!1}});function Je(e){if(bt(e)===!1)return!1;let t=e.constructor;if(t===void 0)return!0;if(typeof t!=="function")return!0;let n=t.prototype;if(bt(n)===!1)return!1;if(Object.prototype.hasOwnProperty.call(n,"isPrototypeOf")===!1)return!1;return!0}function $r(e){if(Je(e))return{...e};if(Array.isArray(e))return[...e];if(e instanceof Map)return new Map(e);if(e instanceof Set)return new Set(e);return e}var us=new Set(["string","number","symbol"]);function Me(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Se(e,t,n){let r=new e._zod.constr(t??e._zod.def);if(!t||n?.parent)r._zod.parent=e;return r}function P(e){let t=e;if(!t)return{};if(typeof t==="string")return{error:()=>t};if(t?.message!==void 0){if(t?.error!==void 0)throw Error("Cannot specify both `message` and `error` params");t.error=t.message}if(delete t.message,typeof t.error==="string")return{...t,error:()=>t.error};return t}function br(e){if(typeof e==="bigint")return e.toString()+"n";if(typeof e==="string")return`"${e}"`;return`${e}`}function ps(e){return Object.keys(e).filter((t)=>e[t]._zod.optin!==void 0&&e[t]._zod.optout==="optional")}var Kt=(()=>({safeint:[Number.MIN_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],int32:[-2147483648,2147483647],uint32:[0,4294967295],float32:[-340282346638528860000000000000000000000,340282346638528860000000000000000000000],float64:[-Number.MAX_VALUE,Number.MAX_VALUE]}))(),vr={int64:[BigInt("-9223372036854775808"),BigInt("9223372036854775807")],uint64:[BigInt(0),BigInt("18446744073709551615")]};function pp(e,t){let n=e._zod.def,r=n.checks;if(r&&r.length>0)throw Error(".pick() cannot be used on object schemas containing refinements");let s={};return Ve(s,e,Xt(e,t)),Se(e,le(n,{shape:s,checks:[]}))}function Xt(e,t){let n=Ne(e),r=[];for(let o of Reflect.ownKeys(t)){if(!Object.getOwnPropertyDescriptor(n,o)?.enumerable)throw Error(`Unrecognized key: "${String(o)}"`);if(t[o])r.push(o)}return r}function dp(e,t){let n=e._zod.def,r=n.checks;if(r&&r.length>0)throw Error(".omit() cannot be used on object schemas containing refinements");let s=new Set(Xt(e,t)),i={};return Ve(i,e,Reflect.ownKeys(Ne(e)).filter((a)=>!s.has(a))),Se(e,le(n,{shape:i,checks:[]}))}function fp(e,t){if(!Je(t))throw Error("Invalid input to extend: expected a plain object");let n=e._zod.def.checks;if(n&&n.length>0){let o=Ne(e);for(let s of Reflect.ownKeys(t))if(Object.getOwnPropertyDescriptor(o,s)!==void 0)throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.")}return Se(e,le(e._zod.def,{shape:ds(e,t)}))}function ds(e,t){let n={};return Ve(n,e,Reflect.ownKeys(Ne(e))),up(n,t),n}function hp(e,t){if(!Je(t))throw Error("Invalid input to safeExtend: expected a plain object");return Se(e,le(e._zod.def,{shape:ds(e,t)}))}function mp(e,t){if(!t?._zod?.def)throw Error("Invalid input to merge: expected an object schema. To merge a plain shape, use `.extend()`.");if(e._zod.def.checks?.length)throw Error(".merge() cannot be used on object schemas containing refinements. Use .safeExtend() instead.");let n={};Ve(n,e,Reflect.ownKeys(Ne(e))),Ve(n,t,Reflect.ownKeys(Ne(t)));let r=le(e._zod.def,{shape:n,get catchall(){return t._zod.def.catchall},checks:t._zod.def.checks??[]});return Se(e,r)}function fs(e,t,n,r="partial"){let s=t._zod.def.checks;if(s&&s.length>0)throw Error(`.${r}() cannot be used on object schemas containing refinements`);let a=n?new Set(Xt(t,n)):void 0,c={};return Ve(c,t,Reflect.ownKeys(Ne(t)),e&&((l,u)=>a&&!a.has(u)?l:new e({type:"optional",innerType:l}))),Se(t,le(t._zod.def,{shape:c,checks:[]}))}function gp(e,t,n){let r=n?new Set(Xt(t,n)):void 0,o={};return Ve(o,t,Reflect.ownKeys(Ne(t)),(s,i)=>r&&!r.has(i)?s:new e({type:"nonoptional",innerType:s})),Se(t,le(t._zod.def,{shape:o}))}function ke(e,t=0){if(e.aborted===!0)return!0;for(let n=t;n<e.issues.length;n++)if(e.issues[n]?.continue!==!0)return!0;return!1}function hs(e,t=0){if(e.aborted===!0)return!0;for(let n=t;n<e.issues.length;n++)if(e.issues[n]?.continue===!1)return!0;return!1}function He(e,t){return t.map((n)=>{var r;return(r=n).path??(r.path=[]),n.path.unshift(e),n})}function $t(e){return typeof e==="string"?e:e?.message}function Pr(e){let t=[];for(let n of e??[]){let r=n._zod.def;if(!/_(length|size)$|_equals$/.test(r.check))break;let o=r.maximum??r.length??r.size;if(o>=0)t.push([o,n])}return t}function Qt(e,t,n){var r;for(let o=t;o<e.length;o++)(r=e[o]).schema??(r.schema=n)}function Ee(e,t,n){var r;let o=e.inst?._zod?.traits;if(o?.has("$ZodType"))if(o.has("$ZodCheck"))(r=e).schema??(r.schema=e.inst);else e.schema=e.inst;let s=e.schema!==e.inst?e.schema?._zod.def?.error:void 0,i=e.message?e.message:$t(e.inst?._zod.def?.error?.(e))??$t(s?.(e))??$t(t?.error?.(e))??$t(n.customError?.(e))??$t(n.localeError?.(e))??"Invalid input",a={};for(let c of Object.keys(e)){if(c==="inst"||c==="schema"||c==="continue"||c==="input"||c==="__proto__")continue;a[c]=e[c]}if(a.path??(a.path=[]),a.message=i,t?.reportInput)a.input=e.input;return a}var yp=/[\uD800-\uDBFF]/;function en(e){let t=e.length;if(!yp.test(e))return t;let n=t;for(let r=0;r<t-1;r++)if((e.charCodeAt(r)&64512)===55296&&(e.charCodeAt(r+1)&64512)===56320)n--,r++;return n}function tn(e){if(Array.isArray(e))return"array";if(typeof e==="string")return"string";return"unknown"}function ms(e){let t=typeof e;switch(t){case"number":return Number.isNaN(e)?"nan":"number";case"object":{if(e===null)return"null";if(Array.isArray(e))return"array";let n=e;if(n&&Object.getPrototypeOf(n)!==Object.prototype&&"constructor"in n&&n.constructor)return n.constructor.name}}return t}function Ke(...e){let[t,n,r]=e;if(typeof t==="string")return{message:t,code:"custom",input:n,inst:r};return{...t}}function gs(e,t){for(let n in t){let r=Object.getOwnPropertyDescriptor(t,n);if(r.get)Object.defineProperty(e,n,{...r,enumerable:!1});else wp(e,n,r.value)}}function De(e,t,n,r=!0){return Object.defineProperty(e,t,{configurable:!0,writable:!0,enumerable:r,value:n}),n}function nn(e,t,n){return De(e,t,n,!1)}function rn(e,t){for(let n in e){let r=e[n];Object.defineProperty(t,n,{configurable:!0,enumerable:!0,get(){return De(this,n,r(this))},set(o){De(this,n,o)}})}return t}function wp(e,t,n){Object.defineProperty(e,t,{configurable:!0,get(){return this==null?n:De(this,t,n.bind(this))},set(r){De(this,t,r)}})}function _p(e,t){let n=Object.getPrototypeOf(e);return t in n?void 0:n}var yr,je=!1,$p={configurable:!0,get(){je=!0;return}};function I(e,t,n){let r=Object.getPrototypeOf(e._zod);if(t in r&&yr!==e._zod){yr=void 0;return}yr=e._zod,Object.defineProperty(r,t,{configurable:!0,get(){Object.defineProperty(this,t,$p);let o=je;je=!1;try{let s=n(this);if(je)delete this[t];else Object.defineProperty(this,t,{configurable:!0,writable:!0,value:s});return je=je||o,s}catch(s){throw delete this[t],je=je||o,s}},set(o){Object.defineProperty(this,t,{configurable:!0,writable:!0,value:o})}})}function bp(e,t,n,r){let o=_p(e,t);if(!o)return;Object.defineProperty(o,t,{configurable:!0,get(){let s={configurable:!0,writable:!0,enumerable:r,value:void 0};return Object.defineProperty(this,t,s),s.value=n(this),Object.defineProperty(this,t,s),s.value},set(s){Object.defineProperty(this,t,{configurable:!0,writable:!0,enumerable:r,value:s})}})}var vp="~constantCatch";function ys(e){let t=()=>e;return t[vp]=!0,t}var ws;var xr={value:void 0,enumerable:!1},_s="captureStackTrace"in Error?Error:null;function Pp(e){let t=_s;if(t){let n=t.stackTraceLimit;if(typeof n==="number"){try{t.stackTraceLimit=0}catch{return _s=null,new e}try{return new e}finally{t.stackTraceLimit=n}}}return new e}function m(e,t,n,r){let o={};function s(d){this.def=d,this.constr=p,this.traits=new Set}s.prototype=o;let i=n,a=i&&new WeakSet;function c(d,h){if(!d._zod){xr.value=new s(h);try{Object.defineProperty(d,"_zod",xr)}finally{xr.value=void 0}}else if(d._zod.traits.has(e))return;if(d._zod.traits.add(e),t(d,h),a){let g=Object.getPrototypeOf(d),_=d._zod.constr.prototype,b=g;while(b&&b!==_)b=Object.getPrototypeOf(b);let R=b??g;if(!a.has(R))a.add(R),gs(R,i)}let f=p.prototype;for(let g in f){if(!Object.prototype.hasOwnProperty.call(f,g))continue;if(!(g in d))d[g]=f[g].bind(d)}}let l=r?.Parent??Object;class u extends l{}Object.defineProperty(u,"name",{value:e});function p(d){let h=r?.Parent?Pp(u):this;c(h,d);let f=h._zod.deferred;if(f){for(let _ of f)_();h._zod.deferred=void 0}let g=globalThis.__zod_globalConfig?.postProcessor;if(g)g(h);return h}return Object.defineProperty(p,"init",{value:c}),Object.defineProperty(p,Symbol.hasInstance,{value:(d)=>{if(r?.Parent&&d instanceof r.Parent)return!0;return d?._zod?.traits?.has(e)}}),Object.defineProperty(p,"name",{value:e}),p}class ze extends Error{constructor(){super("Encountered Promise during synchronous parse. Use .parseAsync() instead.")}}class xt extends Error{constructor(e){super(`Encountered unidirectional transform during encode: ${e}`);this.name="ZodEncodeError"}}(ws=globalThis).__zod_globalConfig??(ws.__zod_globalConfig={});var re=globalThis.__zod_globalConfig;function ue(e){if(e)Object.assign(re,e);return re}function xp(){let e=this._zod;return e.message??(e.message=JSON.stringify(e.def,Pt,2)),e.message}function Sp(e){this._zod.message=e}var kp={get:xp,set:Sp,enumerable:!0,configurable:!0},kr={value:void 0,enumerable:!1},$s=new WeakSet([Object.prototype,Error.prototype]),bs=(e,t)=>{e.name="$ZodError",kr.value=t,Object.defineProperty(e,"issues",kr),kr.value=void 0,Object.defineProperty(e,"message",kp);let n=Object.getPrototypeOf(e);if(!$s.has(n))$s.add(n),Object.defineProperty(n,"toString",{configurable:!0,enumerable:!1,get(){let r=()=>this.message;return Object.defineProperty(this,"toString",{value:r,configurable:!0,writable:!0}),r},set(r){Object.defineProperty(this,"toString",{value:r,configurable:!0,writable:!0})}})},vs=m("$ZodError",bs),Bm=m("$ZodError",bs,void 0,{Parent:Error});function Ep(e,t,n){if(!Object.prototype.hasOwnProperty.call(e,t))if(t==="__proto__")Object.defineProperty(e,t,{value:n(),writable:!0,enumerable:!0,configurable:!0});else e[t]=n();return e[t]}function Ps(e,t=(n)=>n.message){let n={},r=[];for(let o of e.issues)if(o.path.length>0)Ep(n,o.path[0],()=>[]).push(t(o));else r.push(t(o));return{formErrors:r,fieldErrors:n}}function xs(e,t=(n)=>n.message){let n={_errors:[]},r=(o,s=[])=>{for(let i of o.issues)if(i.code==="invalid_union"&&i.errors.length)i.errors.map((a)=>r({issues:a},[...s,...i.path]));else if(i.code==="invalid_key")r({issues:i.issues},[...s,...i.path]);else if(i.code==="invalid_element")r({issues:i.issues},[...s,...i.path]);else{let a=[...s,...i.path];if(a.length===0)n._errors.push(t(i));else{let c=n,l=0;while(l<a.length){let u=a[l],p=l===a.length-1;if(u==="_errors"){if(p)c._errors.push(t(i));l++;continue}if(!Object.prototype.hasOwnProperty.call(c,u))Object.defineProperty(c,u,{value:{_errors:[]},enumerable:!0,writable:!0,configurable:!0});let d=c[u];if(p)d._errors.push(t(i));c=d,l++}}}};return r(e),n}function on(e,t){return{callee:t?.callee??e,Err:t?.Err}}var sn=(e)=>{let t=(n,r,o,s)=>{let i=o?{...o,async:!1}:{async:!1},a=n._zod.run({value:r,issues:[]},i);if(a instanceof Promise)throw new ze;if(a.issues.length){let c=new(s?.Err??e)(a.issues.map((l)=>Ee(l,i,ue())));throw _r(c,s?.callee??t),c}return a.value};return t};var an=(e)=>{let t=async(n,r,o,s)=>{let i=o?{...o,async:!0}:{async:!0},a=n._zod.run({value:r,issues:[]},i);if(a instanceof Promise)a=await a;if(a.issues.length){let c=new(s?.Err??e)(a.issues.map((l)=>Ee(l,i,ue())));throw _r(c,s?.callee??t),c}return a.value};return t};var cn=(e)=>(t,n,r)=>{let o=r?{...r,async:!1}:{async:!1},s=t._zod.run({value:n,issues:[]},o);if(s instanceof Promise)throw new ze;return s.issues.length?Ss(e,s.issues,o):{success:!0,data:s.value}};function Ss(e,t,n){let r;return{success:!1,get error(){if(!r)r=new e(t.map((o)=>Ee(o,n,ue()))),t=void 0,n=void 0;return r},set error(o){r=o,t=void 0,n=void 0}}}var ln=(e)=>async(t,n,r)=>{let o=r?{...r,async:!0}:{async:!0},s=t._zod.run({value:n,issues:[]},o);if(s instanceof Promise)s=await s;return s.issues.length?Ss(e,s.issues,o):{success:!0,data:s.value}};var zp=Symbol.for("zod.compile.invalid"),Tp=Symbol.for("zod.compile.fallback"),Er=(e,t,n)=>{let r=e._zod.bag.validator;if(r!==void 0){if(r(t)!==zp)return!0;if(r.definite===!0&&n===void 0)return!1}return Rp(e,t,n)};function Rp(e,t,n){let r=n?{...n,async:!1,abortEarly:!0}:{async:!1,abortEarly:!0},o=e._zod.bag.fallbackRun,s;if(o)r[Tp]=!0,s=o({value:t,issues:[]},r);else s=e._zod.run({value:t,issues:[]},r);if(s instanceof Promise)throw new ze;return s.issues.length===0}var zr=async(e,t,n)=>{let r=n?{...n,async:!0,abortEarly:!0}:{async:!0,abortEarly:!0},o=e._zod.run({value:t,issues:[]},r);if(o instanceof Promise)o=await o;return o.issues.length===0},ks=(e)=>{let t=sn(e),n=(r,o,s,i)=>{let a=s?{...s,direction:"backward"}:{direction:"backward"};return t(r,o,a,on(n,i))};return n};var Es=(e)=>{let t=sn(e),n=(r,o,s,i)=>t(r,o,s,on(n,i));return n};var zs=(e)=>{let t=an(e),n=async(r,o,s,i)=>{let a=s?{...s,direction:"backward"}:{direction:"backward"};return await t(r,o,a,on(n,i))};return n};var Ts=(e)=>{let t=an(e),n=async(r,o,s,i)=>await t(r,o,s,on(n,i));return n};var Rs=(e)=>(t,n,r)=>{let o=r?{...r,direction:"backward"}:{direction:"backward"};return cn(e)(t,n,o)};var As=(e)=>(t,n,r)=>cn(e)(t,n,r);var Cs=(e)=>async(t,n,r)=>{let o=r?{...r,direction:"backward"}:{direction:"backward"};return ln(e)(t,n,o)};var Os=(e)=>async(t,n,r)=>ln(e)(t,n,r);var Is=/^[cC][0-9a-z]{6,}$/,Ns=/^[0-9a-z]+$/,Ds=/^[0-7][0-9A-HJKMNP-TV-Za-hjkmnp-tv-z]{25}$/,Ws=/^[0-9a-vA-V]{20}$/,Zs=/^[A-Za-z0-9]{27}$/,Us=/^[a-zA-Z0-9_-]{21}$/;function Ls(e){return new RegExp(`^[a-zA-Z0-9_-]{${e}}$`)}var Fs=/^P(?:(\d+W)|(?!.*W)(?=\d|T\d)(\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+([.,]\d+)?S)?)?)$/;var Bs=/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/,Rr=(e)=>{if(!e)return/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-8][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}|00000000-0000-0000-0000-000000000000|ffffffff-ffff-ffff-ffff-ffffffffffff)$/;return new RegExp(`^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-${e}[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12})$`)};var js=/^(?:[A-Za-z0-9_'+\-]+\.)*[A-Za-z0-9_'+\-]*[A-Za-z0-9_+-]@(?:[A-Za-z0-9][A-Za-z0-9\-]*\.)+[A-Za-z]{2,}$/;var Ap="^(?=[\\s\\S]*[\\p{Extended_Pictographic}\\p{Regional_Indicator}\\u20E3])[\\p{Extended_Pictographic}\\p{Emoji_Component}]+$";function Ms(){return new RegExp(Ap,"u")}var Hs=/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,qs=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))$/;var Ys=/^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/([0-9]|[1-2][0-9]|3[0-2])$/,Gs=/^(([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,Vs=/^$|^(?:[0-9a-zA-Z+/]{4})*(?:(?:[0-9a-zA-Z+/]{2}==)|(?:[0-9a-zA-Z+/]{3}=))?$/,Js=/^(?:[A-Za-z0-9_-]{4})*(?:[A-Za-z0-9_-]{2,3})?$/;var Ks=/^https?$/,Xs=/^\+[1-9]\d{6,14}$/;var Qs="(?:(?:\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12]\\d|3[01])|(?:0[469]|11)-(?:0[1-9]|[12]\\d|30)|(?:02)-(?:0[1-9]|1\\d|2[0-8])))";function Cp(e){return new RegExp(`^${e}$`)}var ei=Cp(Qs);function Tr(e){return typeof e.precision==="number"?e.precision===-1?"(?:[01]\\d|2[0-3]):[0-5]\\d":e.precision===0?"(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d":`(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d\\.\\d{${e.precision}}`:e.seconds?"(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d(?:\\.\\d+)?":"(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d(?:\\.\\d+)?)?"}function ti(e){return new RegExp(`^${Tr(e)}$`)}function ni(e){let t=["Z"];if(e.offset)t.push("([+-](?:[01]\\d|2[0-3]):[0-5]\\d)");let n=`${Tr({precision:e.precision,seconds:!0})}(?:${t.join("|")})`,r=e.local?`${n}|${Tr({precision:e.precision})}`:n;return new RegExp(`^${Qs}T(?:${r})$`)}var ri=/^[\s\S]{0,}$/;var oi=/^-?\d+n?$/,Ar=/^-?\d+$/,St=/^-?\d+(?:\.\d+)?$/,si=/^(?:true|false)$/i;var ii=/^[^A-Z]*$/,ai=/^[^a-z]*$/;var G=m("$ZodCheck",(e,t)=>{var n;e._zod??(e._zod={}),e._zod.def=t,(n=e._zod).onattach??(n.onattach=[])});var Cr=(e)=>{let t=e.value;return!rs(t)&&t.length!==void 0},un={number:"number",bigint:"bigint",object:"date"},Or=m("$ZodCheckLessThan",(e,t)=>{G.init(e,t);let n=un[typeof t.value];e._zod.check=(r)=>{if(t.inclusive?r.value<=t.value:r.value<t.value)return;r.issues.push({origin:un[typeof r.value]??n,code:"too_big",maximum:typeof t.value==="object"?t.value.getTime():t.value,input:r.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),Ir=m("$ZodCheckGreaterThan",(e,t)=>{G.init(e,t);let n=un[typeof t.value];e._zod.check=(r)=>{if(t.inclusive?r.value>=t.value:r.value>t.value)return;r.issues.push({origin:un[typeof r.value]??n,code:"too_small",minimum:typeof t.value==="object"?t.value.getTime():t.value,input:r.value,inclusive:t.inclusive,inst:e,continue:!t.abort})}}),ci=m("$ZodCheckMultipleOf",(e,t)=>{G.init(e,t),e._zod.check=(n)=>{if(typeof n.value!==typeof t.value)throw Error("Cannot mix number and bigint in multiple_of check.");if(typeof n.value==="bigint"?t.value!==BigInt(0)&&n.value%t.value===BigInt(0):os(n.value,t.value)===0)return;n.issues.push({origin:typeof n.value,code:"not_multiple_of",divisor:t.value,input:n.value,inst:e,continue:!t.abort})}}),li=m("$ZodCheckNumberFormat",(e,t)=>{G.init(e,t),t.format=t.format||"float64";let n=t.format?.includes("int"),r=n?"int":"number",[o,s]=Kt[t.format];e._zod.check=(i)=>{let a=i.value;if(n){if(!Number.isInteger(a)){i.issues.push({expected:r,format:t.format,code:"invalid_type",continue:!1,input:a,inst:e});return}if(!Number.isSafeInteger(a)){if(a>0)i.issues.push({input:a,code:"too_big",maximum:Number.MAX_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:r,inclusive:!0,continue:!t.abort});else i.issues.push({input:a,code:"too_small",minimum:Number.MIN_SAFE_INTEGER,note:"Integers must be within the safe integer range.",inst:e,origin:r,inclusive:!0,continue:!t.abort});return}}if(a<o)i.issues.push({origin:"number",input:a,code:"too_small",minimum:o,inclusive:!0,inst:e,continue:!t.abort});if(a>s)i.issues.push({origin:"number",input:a,code:"too_big",maximum:s,inclusive:!0,inst:e,continue:!t.abort})}});var ui=m("$ZodCheckMaxLength",(e,t)=>{var n;G.init(e,t),(n=e._zod.def).when??(n.when=Cr),e._zod.check=(r)=>{let o=r.value,s=o.length;if((typeof o==="string"&&s>t.maximum?en(o):s)<=t.maximum)return;let a=tn(o);r.issues.push({origin:a,code:"too_big",maximum:t.maximum,inclusive:!0,input:o,inst:e,continue:!t.abort})}}),pi=m("$ZodCheckMinLength",(e,t)=>{var n;G.init(e,t),(n=e._zod.def).when??(n.when=Cr),e._zod.check=(r)=>{let o=r.value,s=o.length;if((typeof o==="string"&&s>=t.minimum&&s<t.minimum*2?en(o):s)>=t.minimum)return;let a=tn(o);r.issues.push({origin:a,code:"too_small",minimum:t.minimum,inclusive:!0,input:o,inst:e,continue:!t.abort})}}),di=m("$ZodCheckLengthEquals",(e,t)=>{var n;G.init(e,t),(n=e._zod.def).when??(n.when=Cr),e._zod.check=(r)=>{let o=r.value,s=o.length,i=typeof o==="string"&&s>=t.length&&s<=t.length*2?en(o):s;if(i===t.length)return;let a=tn(o),c=i>t.length;r.issues.push({origin:a,...c?{code:"too_big",maximum:t.length}:{code:"too_small",minimum:t.length},inclusive:!0,exact:!0,input:r.value,inst:e,continue:!t.abort})}}),Et=m("$ZodCheckStringFormat",(e,t)=>{var n,r;if(G.init(e,t),t.pattern)(n=e._zod).check??(n.check=(o)=>{if(t.pattern.lastIndex=0,t.pattern.test(o.value))return;o.issues.push({origin:"string",code:"invalid_format",format:t.format,input:o.value,...t.pattern?{pattern:t.pattern.toString()}:{},inst:e,continue:!t.abort})});else(r=e._zod).check??(r.check=()=>{})}),fi=m("$ZodCheckRegex",(e,t)=>{Et.init(e,t),e._zod.check=(n)=>{if(t.pattern.lastIndex=0,t.pattern.test(n.value))return;n.issues.push({origin:"string",code:"invalid_format",format:"regex",input:n.value,pattern:t.pattern.toString(),inst:e,continue:!t.abort})}}),hi=m("$ZodCheckLowerCase",(e,t)=>{t.pattern??(t.pattern=ii),Et.init(e,t)}),mi=m("$ZodCheckUpperCase",(e,t)=>{t.pattern??(t.pattern=ai),Et.init(e,t)}),gi=m("$ZodCheckIncludes",(e,t)=>{G.init(e,t);let n=Me(t.includes),r=new RegExp(typeof t.position==="number"?`^.{${t.position},}${n}`:n);t.pattern=r,e._zod.check=(o)=>{if(o.value.includes(t.includes,t.position))return;o.issues.push({origin:"string",code:"invalid_format",format:"includes",includes:t.includes,input:o.value,inst:e,continue:!t.abort})}}),yi=m("$ZodCheckStartsWith",(e,t)=>{G.init(e,t);let n=new RegExp(`^${Me(t.prefix)}.*`);t.pattern??(t.pattern=n),e._zod.check=(r)=>{if(r.value.startsWith(t.prefix))return;r.issues.push({origin:"string",code:"invalid_format",format:"starts_with",prefix:t.prefix,input:r.value,inst:e,continue:!t.abort})}}),wi=m("$ZodCheckEndsWith",(e,t)=>{G.init(e,t);let n=new RegExp(`.*${Me(t.suffix)}$`);t.pattern??(t.pattern=n),e._zod.check=(r)=>{if(r.value.endsWith(t.suffix))return;r.issues.push({origin:"string",code:"invalid_format",format:"ends_with",suffix:t.suffix,input:r.value,inst:e,continue:!t.abort})}});var _i=m("$ZodCheckOverwrite",(e,t)=>{G.init(e,t),e._zod.check=(n)=>{n.value=t.tx(n.value)}});class Nr{constructor(e=[],t={}){this.content=[],this.indent=0,this.args=e,this.closed=t}indented(e){this.indent+=1;try{e(this)}finally{this.indent-=1}}write(e){if(typeof e==="function"){e(this,{execution:"sync"}),e(this,{execution:"async"});return}let n=e.split(`
`).filter((s)=>s),r=Math.min(...n.map((s)=>s.length-s.trimStart().length)),o=n.map((s)=>s.slice(r)).map((s)=>" ".repeat(this.indent*2)+s);for(let s of o)this.content.push(s)}compile(){let e=Function,t=this?.content??[""];return new e(...Object.keys(this.closed),`return function (${this.args.join(", ")}) {
${t.join(`
`)}
};`)(...Object.values(this.closed))}}var bi={major:4,minor:6,patch:7};var Z=m("$ZodType",(e,t)=>{var n;e??(e={}),e._zod.def=t,e._zod.bag=e._zod.bag||{},e._zod.version=bi;let r=e._zod.def.checks,o=e._zod.traits.has("$ZodCheck")?[e,...r??[]]:r?.length?[...r]:[];for(let s of o)for(let i of s._zod.onattach)i(e);if(o.length===0)(n=e._zod).deferred??(n.deferred=[]),e._zod.deferred?.push(()=>{e._zod.run=e._zod.parse});else{let s=(a,c,l)=>{if(a.memo)return a;let u=ke(a),p;for(let d of c){if(d._zod.def.when){if(hs(a))continue;if(!d._zod.def.when(a))continue}else if(u)continue;let h=a.issues.length,f=d._zod.check(a);if(f instanceof Promise&&l?.async===!1)throw new ze;if(p||f instanceof Promise)p=(p??Promise.resolve()).then(async()=>{if(await f,a.issues.length===h)return;if(Qt(a.issues,h,e),!u)u=ke(a,h)});else{if(a.issues.length===h)continue;if(Qt(a.issues,h,e),!u)u=ke(a,h)}}if(p)return p.then(()=>a);return a},i=(a,c,l)=>{if(ke(a))return a.aborted=!0,a;let u=s(c,o,l);if(u instanceof Promise){if(l.async===!1)throw new ze;return u.then((p)=>e._zod.parse(p,l))}return e._zod.parse(u,l)};e._zod.run=(a,c)=>{if(c.skipChecks)return e._zod.parse(a,c);if(c.direction==="backward"){let u=e._zod.parse({value:a.value,issues:[]},{...c,skipChecks:!0});if(u instanceof Promise)return u.then((p)=>i(p,a,c));return i(u,a,c)}let l=e._zod.parse(a,c);if(l instanceof Promise){if(c.async===!1)throw new ze;return l.then((u)=>s(u,o,c))}return s(l,o,c)}}},{get "~standard"(){return nn(this,"~standard",Wr(this))},set "~standard"(e){De(this,"~standard",e)}}),Ci=(e,t)=>e.issues.length?{issues:e.issues.map((n)=>Ee(n,t,ue()))}:{value:e.value};async function Op(e,t){let n={async:!0};return Ci(await e._zod.run({value:t,issues:[]},n),n)}function Wr(e){return{validate:(t)=>{let n={async:!1};try{let r=e._zod.run({value:t,issues:[]},n);if(!(r instanceof Promise))return Ci(r,n)}catch(r){}return Op(e,t)},vendor:"zod",version:1}}var hn=m("$ZodString",(e,t)=>{Z.init(e,t),e._zod.pattern=t.pattern??ri,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=String(n.value)}catch(o){}if(typeof n.value==="string")return n;return n.issues.push({expected:"string",code:"invalid_type",input:n.value,inst:e}),n}}),F=m("$ZodStringFormat",(e,t)=>{Et.init(e,t),hn.init(e,t)}),Oi=m("$ZodGUID",(e,t)=>{t.pattern??(t.pattern=Bs),F.init(e,t)}),Ii=m("$ZodUUID",(e,t)=>{if(t.version){let r={v1:1,v2:2,v3:3,v4:4,v5:5,v6:6,v7:7,v8:8}[t.version];if(r===void 0)throw Error(`Invalid UUID version: "${t.version}"`);t.pattern??(t.pattern=Rr(r))}else t.pattern??(t.pattern=Rr());F.init(e,t)}),Ni=m("$ZodEmail",(e,t)=>{t.pattern??(t.pattern=js),F.init(e,t)}),Di=1,dn=2;function Wi(e){try{if(typeof URL<"u"&&typeof URL.canParse==="function")return URL.canParse(e);return new URL(e),!0}catch{return!1}}function Ip(e,t){if(!("normalize"in t)&&!("hostname"in t)&&!("protocol"in t))return Wi(e)||dn;return Np(e,t)}function Np(e,t){if(!t.normalize&&t.protocol?.source===Ks.source&&!/^https?:\/\//i.test(e))return Di;try{if(typeof URL<"u"){let n=URL;if(typeof n.parse==="function")return n.parse(e)??dn}return new URL(e)}catch{return dn}}var Dp=/[\t\n\r]/g;function vi(e){return e.replace(Dp,"")}function Wp(e,t){return t.lastIndex=0,t.test(e.hostname)}function Zp(e,t){return t.lastIndex=0,t.test(e.protocol.endsWith(":")?e.protocol.slice(0,-1):e.protocol)}var Zi=m("$ZodURL",(e,t)=>{F.init(e,t),e._zod.check=(n)=>{try{let r=n.value.trim(),o=Ip(r,t);if(o===Di){n.issues.push({code:"invalid_format",format:"url",note:"Invalid URL format",input:n.value,inst:e,continue:!t.abort});return}if(o===dn){n.issues.push({code:"invalid_format",format:"url",input:n.value,inst:e,continue:!t.abort});return}if(o===!0){n.value=vi(r);return}if(t.hostname&&!Wp(o,t.hostname))n.issues.push({code:"invalid_format",format:"url",note:"Invalid hostname",pattern:t.hostname.source,input:n.value,inst:e,continue:!t.abort});if(t.protocol&&!Zp(o,t.protocol))n.issues.push({code:"invalid_format",format:"url",note:"Invalid protocol",pattern:t.protocol.source,input:n.value,inst:e,continue:!t.abort});n.value=t.normalize?o.href:vi(r);return}catch(r){n.issues.push({code:"invalid_format",format:"url",input:n.value,inst:e,continue:!t.abort})}}}),Ui=m("$ZodEmoji",(e,t)=>{t.pattern??(t.pattern=Ms()),F.init(e,t)}),Li=m("$ZodNanoID",(e,t)=>{if(t.length!==void 0&&(!Number.isInteger(t.length)||t.length<1))throw Error(`Invalid nanoid length: ${t.length}`);t.pattern??(t.pattern=t.length===void 0?Us:Ls(t.length)),F.init(e,t)}),Fi=m("$ZodCUID",(e,t)=>{t.pattern??(t.pattern=Is),F.init(e,t)}),Bi=m("$ZodCUID2",(e,t)=>{t.pattern??(t.pattern=Ns),F.init(e,t)}),ji=m("$ZodULID",(e,t)=>{t.pattern??(t.pattern=Ds),F.init(e,t)}),Mi=m("$ZodXID",(e,t)=>{t.pattern??(t.pattern=Ws),F.init(e,t)}),Hi=m("$ZodKSUID",(e,t)=>{t.pattern??(t.pattern=Zs),F.init(e,t)}),qi=m("$ZodISODateTime",(e,t)=>{t.pattern??(t.pattern=ni(t)),F.init(e,t)}),Yi=m("$ZodISODate",(e,t)=>{t.pattern??(t.pattern=ei),F.init(e,t)}),Gi=m("$ZodISOTime",(e,t)=>{t.pattern??(t.pattern=ti(t)),F.init(e,t)}),Vi=m("$ZodISODuration",(e,t)=>{t.pattern??(t.pattern=Fs),F.init(e,t)}),Ji=m("$ZodIPv4",(e,t)=>{t.pattern??(t.pattern=Hs),F.init(e,t)}),Up=/^[0-9a-fA-F:.]+$/;function Ki(e){if(!Up.test(e))return!1;return Wi(`http://[${e}]`)}var Xi=m("$ZodIPv6",(e,t)=>{t.pattern??(t.pattern=qs),F.init(e,t),e._zod.check=(n)=>{if(!Ki(n.value))n.issues.push({code:"invalid_format",format:"ipv6",input:n.value,inst:e,continue:!t.abort})}});var Qi=m("$ZodCIDRv4",(e,t)=>{t.pattern??(t.pattern=Ys),F.init(e,t)});function Lp(e){let t=e.split("/");if(t.length!==2)return!1;let[n,r]=t;if(!r)return!1;let o=Number(r);if(`${o}`!==r)return!1;if(o<0||o>128)return!1;return Ki(n)}var ea=m("$ZodCIDRv6",(e,t)=>{t.pattern??(t.pattern=Gs),F.init(e,t),e._zod.check=(n)=>{if(!Lp(n.value))n.issues.push({code:"invalid_format",format:"cidrv6",input:n.value,inst:e,continue:!t.abort})}});function ta(e){if(e==="")return!0;if(/\s/.test(e))return!1;if(e.length%4!==0)return!1;try{return atob(e),!0}catch{return!1}}var Zr=/^[0-9a-zA-Z+/]*={0,2}$/,na=m("$ZodBase64",(e,t)=>{t.pattern??(t.pattern=Zr),F.init(e,t),e._zod.check=(n)=>{if(ta(n.value))return;n.issues.push({code:"invalid_format",format:"base64",input:n.value,inst:e,continue:!t.abort})}}),mn=/^[A-Za-z0-9_-]*$/;function Fp(e){if(!mn.test(e))return!1;let t=e.replace(/[-_]/g,(r)=>r==="-"?"+":"/"),n=t.padEnd(Math.ceil(t.length/4)*4,"=");return ta(n)}var ra=m("$ZodBase64URL",(e,t)=>{t.pattern??(t.pattern=mn),F.init(e,t),e._zod.check=(n)=>{if(Fp(n.value))return;n.issues.push({code:"invalid_format",format:"base64url",input:n.value,inst:e,continue:!t.abort})}}),oa=m("$ZodE164",(e,t)=>{t.pattern??(t.pattern=Xs),F.init(e,t)});function Bp(e,t=null){try{let n=e.split(".");if(n.length!==3)return!1;let[r]=n;if(!r)return!1;let o=JSON.parse(atob(r));if("typ"in o&&o?.typ!=="JWT")return!1;if(!o.alg)return!1;if(t&&(!("alg"in o)||o.alg!==t))return!1;return!0}catch{return!1}}var sa=m("$ZodJWT",(e,t)=>{F.init(e,t),e._zod.check=(n)=>{if(Bp(n.value,t.alg))return;n.issues.push({code:"invalid_format",format:"jwt",input:n.value,inst:e,continue:!t.abort})}});var Ur=m("$ZodNumber",(e,t)=>{Z.init(e,t),e._zod.pattern=St,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=Number(n.value)}catch(i){}let o=n.value;if(typeof o==="number"&&!Number.isNaN(o)&&Number.isFinite(o))return n;let s=typeof o==="number"?Number.isNaN(o)?"NaN":!Number.isFinite(o)?String(o):void 0:void 0;return n.issues.push({expected:"number",code:"invalid_type",input:o,inst:e,...s?{received:s}:{}}),n}}),ia=m("$ZodNumberFormat",(e,t)=>{li.init(e,t),Ur.init(e,t)}),aa=m("$ZodBoolean",(e,t)=>{Z.init(e,t),e._zod.pattern=si,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=Boolean(n.value)}catch(s){}let o=n.value;if(typeof o==="boolean")return n;return n.issues.push({expected:"boolean",code:"invalid_type",input:o,inst:e}),n}}),ca=m("$ZodBigInt",(e,t)=>{Z.init(e,t),e._zod.pattern=oi,e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=BigInt(n.value)}catch(o){}if(typeof n.value==="bigint")return n;return n.issues.push({expected:"bigint",code:"invalid_type",input:n.value,inst:e}),n}});var la=m("$ZodUnknown",(e,t)=>{Z.init(e,t),e._zod.parse=(n)=>n}),ua=m("$ZodNever",(e,t)=>{Z.init(e,t),e._zod.parse=(n,r)=>(n.issues.push({expected:"never",code:"invalid_type",input:n.value,inst:e}),n)});var pa=m("$ZodDate",(e,t)=>{Z.init(e,t),e._zod.parse=(n,r)=>{if(t.coerce)try{n.value=new Date(n.value)}catch(a){}let o=n.value,s=o instanceof Date;if(s&&!Number.isNaN(o.getTime()))return n;return n.issues.push({expected:"date",code:"invalid_type",input:o,...s?{received:"Invalid Date"}:{},inst:e}),n}});function jp(e,t){let n=Pr(e._zod.def.checks);if(!n.length)return;let r=Math.min(...n.map((s)=>s[0])),o=e._zod.parse;e._zod.parse=(s,i)=>{let a=t(s.value);if(a>r&&!i?.skipChecks&&i?.direction!=="backward"){for(let[c,l]of Pr(e._zod.def.checks))if(a>c&&l._zod.def.when(s)){let u=s.issues.length;return l._zod.check(s),s.issues[u].continue=!1,Qt(s.issues,u,e),s}}return o(s,i)}}var Mp=(e)=>Array.isArray(e)?e.length:-1;function Pi(e,t,n){if(e.issues.length)t.issues.push(...He(n,e.issues));t.value[n]=e.value}var da=m("$ZodArray",(e,t)=>{Z.init(e,t);let n=re.memoizer;n?.attach(e),e._zod.parse=(r,o)=>{let s=r.value;if(!Array.isArray(s))return r.issues.push({expected:"array",code:"invalid_type",input:s,inst:e}),r;r.value=n?n.alloc(e,r,Array(s.length),o):Array(s.length);let i=[],a=o?.abortEarly;for(let c=0;c<s.length;c++){let l=s[c],u=t.element._zod.run({value:l,issues:[]},o);if(u instanceof Promise)i.push(u.then((p)=>Pi(p,r,c)));else if(Pi(u,r,c),a&&u.issues.length!==0&&ke(u))break}if(i.length)return Promise.all(i).then(()=>r);return r},jp(e,Mp)});function fn(e,t,n,r,o,s){let i=n in r,a=s==="optional";if(!i&&a&&o==="optional")return;if(e.issues.length){if(o!==void 0&&a&&!i)return;t.issues.push(...He(n,e.issues))}if(!i&&o===void 0){if(!e.issues.length)t.issues.push({code:"invalid_type",expected:"nonoptional",input:void 0,path:[n]});return}if(e.value===void 0){if(i||o==="defaulted"&&!a)t.value[n]=void 0}else t.value[n]=e.value}var Hp=[];function fa(e){let t=Object.keys(e.shape),n=Object.getOwnPropertySymbols(e.shape),r=n.length?n:Hp,o=r.length?[...t,...r]:t;for(let i of o)if(!e.shape?.[i]?._zod?.traits?.has("$ZodType"))throw Error(`Invalid element at key "${String(i)}": expected a Zod schema`);let s=ps(e.shape);return{...e,allKeys:o,symbolKeys:r,keySet:new Set(t),numKeys:t.length,optionalKeys:new Set(s)}}function ha(e,t,n,r,o,s,i){let a=[],c=o.keySet,l=o.catchall._zod,u=l.def.type,{optin:p,optout:d}=l,h=0;for(let f in t){if(i&&n.issues.length!==h){if(ke(n,h))break;h=n.issues.length}if(c.has(f))continue;if(f==="__proto__"){if(u==="never")a.push(f);continue}if(u==="never"){a.push(f);continue}let g=l.run({value:t[f],issues:[]},r);if(g instanceof Promise)e.push(g.then((_)=>fn(_,n,f,t,p,d)));else fn(g,n,f,t,p,d)}if(a.length)n.issues.push({code:"unrecognized_keys",keys:a,input:t,inst:s,continue:!0});if(!e.length)return n;return Promise.all(e).then(()=>n)}var qp=m("$ZodObject",(e,t)=>{Z.init(e,t);let n=Object.getOwnPropertyDescriptor(t,"shape"),r=n?.get?n.get.raw:t.shape??{};if(r){let l=()=>{let u={...r};return Object.defineProperty(t,"shape",{value:u}),l.raw=u,u};l.raw=r,Object.defineProperty(t,"shape",{get:l})}let o=Gt(()=>fa(t));I(e,"propValues",(l)=>{let u=l.def.shape,p={};for(let d in u){let h=u[d]._zod;if(h.values){if(!Object.prototype.hasOwnProperty.call(p,d))_e(p,d,new Set);for(let f of h.values)p[d].add(f);if(h.optin!==void 0)p[d].add(void 0)}}return p});let s=bt,i=t.catchall,a,c=re.memoizer;c?.attach(e),e._zod.parse=(l,u)=>{a??(a=o.value);let p=l.value;if(!s(p))return l.issues.push({expected:"object",code:"invalid_type",input:p,inst:e}),l;l.value=c?c.alloc(e,l,{},u):{};let d=[],h=a.shape,f=u?.abortEarly,g=l.issues.length;for(let _ of a.allKeys){if(f&&l.issues.length!==g){if(ke(l,g))break;g=l.issues.length}if(_==="__proto__")continue;let b=h[_],R=b._zod.optin,A=b._zod.optout,k=b._zod.run({value:p[_],issues:[]},u);if(k instanceof Promise)d.push(k.then((T)=>fn(T,l,_,p,R,A)));else fn(k,l,_,p,R,A)}if(!i)return d.length?Promise.all(d).then(()=>l):l;return ha(d,p,l,u,o.value,e,f===!0)}}),ma=m("$ZodObjectJIT",(e,t)=>{qp.init(e,t);let n=e._zod.parse,r=Gt(()=>fa(t)),o=re.memoizer,s=(h)=>{let f=r.value,g=f.symbolKeys,_=new Nr(["payload","ctx"],{shape:h,inst:e,memo:o,syms:g}),b=(T)=>`shape[${T}]._zod.run({ value: input[${T}], issues: [] }, ctx)`,R=(T,x)=>`
          let ${T}_ab = false;
          for (let i = 0; i < ${T}.issues.length; i++) {
            const iss = ${T}.issues[i];
            iss.path = iss.path ? [${x}, ...iss.path] : [${x}];
            payload.issues.push(iss);
            if (iss.continue !== true) ${T}_ab = true;
          }
          if (${T}_ab && ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }`;_.write("const input = payload.value;");let A=Object.create(null),k=0;for(let T of f.allKeys)A[T]=`key_${k++}`;_.write(o?"const newResult = memo.alloc(inst, payload, {}, ctx);":"const newResult = {};");for(let T of f.allKeys){if(T==="__proto__")continue;let x=A[T],z=typeof T==="symbol"?`syms[${g.indexOf(T)}]`:as(T),E=`${z} in input`,v=h[T],N=v?._zod?.optin,O=N!==void 0,L=v?._zod?.optout==="optional";if(_.write(`const ${x} = ${b(z)};`),O&&L){let Q=N==="optional"?`${x}_present`:`${x}.value !== undefined || ${x}_present`;_.write(`
        const ${x}_present = ${E};
        if (!${x}.issues.length || ${x}_present) {
          if (${x}.issues.length) {${R(x,z)}
          }

          if (${Q}) {
            newResult[${z}] = ${x}.value;
          }
        }

      `)}else if(!O)_.write(`
        const ${x}_present = ${E};
        if (${x}.issues.length) {${R(x,z)}
        }
        if (!${x}_present && !${x}.issues.length) {
          payload.issues.push({
            code: "invalid_type",
            expected: "nonoptional",
            input: undefined,
            path: [${z}]
          });
          if (ctx && ctx.abortEarly) {
            payload.value = newResult;
            return payload;
          }
        }

        if (${x}_present) {
          newResult[${z}] = ${x}.value;
        }

      `);else if(_.write(`
        if (${x}.issues.length) {${R(x,z)}
        }
      `),N==="defaulted")_.write(`newResult[${z}] = ${x}.value;`);else _.write(`
        if (${x}.value !== undefined || ${E}) {
          newResult[${z}] = ${x}.value;
        }
      `)}return _.write("payload.value = newResult;"),_.write("return payload;"),_.compile()},i,a=bt,c=!re.jitless,u=c&&ls.value,p=t.catchall,d;e._zod.parse=(h,f)=>{d??(d=r.value);let g=h.value;if(!a(g))return h.issues.push({expected:"object",code:"invalid_type",input:g,inst:e}),h;if(c&&u&&f?.async===!1&&f.jitless!==!0){if(!i)i=s(t.shape);if(h=i(h,f),!p)return h;return ha([],g,h,f,d,e,f?.abortEarly===!0)}return n(h,f)}});function xi(e,t,n,r){for(let s of e)if(s.issues.length===0)return t.value=s.value,t;let o=e.filter((s)=>!ke(s));if(o.length===1)return t.value=o[0].value,o[0];return t.issues.push({code:"invalid_union",input:t.value,inst:n,errors:e.map((s)=>s.issues.map((i)=>Ee(i,r,ue())))}),t}var ga=m("$ZodUnion",(e,t)=>{Z.init(e,t),I(e,"optin",(r)=>r.def.options.some((o)=>o._zod.optin==="defaulted")?"defaulted":r.def.options.some((o)=>o._zod.optin!==void 0)?"optional":void 0),I(e,"optout",(r)=>r.def.options.some((o)=>o._zod.optout==="optional")?"optional":void 0),I(e,"values",(r)=>{if(r.def.options.every((o)=>o._zod.values))return new Set(r.def.options.flatMap((o)=>Array.from(o._zod.values)));return}),I(e,"pattern",(r)=>{if(r.def.options.every((o)=>o._zod.pattern)){let o=r.def.options.map((s)=>s._zod.pattern);return new RegExp(`^(${o.map((s)=>Vt(s.source)).join("|")})$`)}return});let n=t.options.length===1?t.options[0]._zod.run:null;e._zod.parse=(r,o)=>{if(n)return n(r,o);let s=!1,i=[];for(let a of t.options){let c=a._zod.run({value:r.value,issues:[]},o);if(c instanceof Promise)i.push(c),s=!0;else{if(c.issues.length===0)return c;i.push(c)}}if(!s)return xi(i,r,e,o);return Promise.all(i).then((a)=>xi(a,r,e,o))}});var ya=m("$ZodIntersection",(e,t)=>{Z.init(e,t),e._zod.parse=(n,r)=>{let o=n.value,s=t.left._zod.run({value:o,issues:[]},r),i=t.right._zod.run({value:o,issues:[]},r);if(s instanceof Promise||i instanceof Promise)return Promise.all([s,i]).then(([c,l])=>Si(n,c,l));return Si(n,s,i)}});function Dr(e,t){if(e===t)return{valid:!0,data:e};if(e instanceof Date&&t instanceof Date&&+e===+t)return{valid:!0,data:e};if(Je(e)&&Je(t)){let n=Object.keys(t),r=Object.keys(e).filter((s)=>n.indexOf(s)!==-1),o={...e,...t};if(Object.prototype.hasOwnProperty.call(o,"__proto__"))delete o.__proto__;for(let s of r){if(s==="__proto__")continue;let i=Dr(e[s],t[s]);if(!i.valid)return{valid:!1,mergeErrorPath:[s,...i.mergeErrorPath]};o[s]=i.data}return{valid:!0,data:o}}if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return{valid:!1,mergeErrorPath:[]};let n=[];for(let r=0;r<e.length;r++){let o=e[r],s=t[r],i=Dr(o,s);if(!i.valid)return{valid:!1,mergeErrorPath:[r,...i.mergeErrorPath]};n.push(i.data)}return{valid:!0,data:n}}return{valid:!1,mergeErrorPath:[]}}function Si(e,t,n){let r=new Map,o,s=new Map,i=(l,u)=>{let p;if(l.code==="unrecognized_keys"&&!l.path?.length)o??(o=l),p=l.keys;else if(l.code==="invalid_key"&&l.origin==="record"&&l.path?.length===1){let d=String(l.path[0]);if(!s.has(d))s.set(d,l);p=[d]}else return!1;for(let d of p){if(!r.has(d))r.set(d,{});r.get(d)[u]=!0}return!0};for(let l of t.issues)if(!i(l,"l"))e.issues.push(l);for(let l of n.issues)if(!i(l,"r"))e.issues.push(l);let a=[...r].filter(([,l])=>l.l&&l.r).map(([l])=>l);if(a.length){let l=o?a.filter((u)=>o.keys.includes(u)):[];if(l.length)e.issues.push({...o,keys:l});for(let u of a)if(!l.includes(u)&&s.has(u))e.issues.push(s.get(u))}let c=Dr(t.value,n.value);if(!c.valid){if(ke(e))return e;throw Error(`Unmergable intersection. Error path: ${JSON.stringify(c.mergeErrorPath)}`)}return e.value=c.data,e}var wa=m("$ZodRecord",(e,t)=>{Z.init(e,t);let n=re.memoizer;n?.attach(e),e._zod.parse=(r,o)=>{let s=r.value;if(!Je(s))return r.issues.push({expected:"record",code:"invalid_type",input:s,inst:e}),r;let i=[],a=t.keyType._zod.values;if(a&&!t.partial){r.value=n?n.alloc(e,r,{},o):{};let c=new Set;for(let u of a)if(typeof u==="string"||typeof u==="number"||typeof u==="symbol"){if(c.add(typeof u==="number"?u.toString():u),u==="__proto__")continue;let p=t.keyType._zod.run({value:u,issues:[]},o);if(p instanceof Promise)throw Error("Async schemas not supported in object keys currently");if(p.issues.length){r.issues.push({code:"invalid_key",origin:"record",issues:p.issues.map((f)=>Ee(f,o,ue())),input:u,path:[u],inst:e});continue}let d=p.value;if(d==="__proto__")continue;let h=t.valueType._zod.run({value:s[u],issues:[]},o);if(h instanceof Promise)i.push(h.then((f)=>{if(f.issues.length)r.issues.push(...He(u,f.issues));r.value[d]=f.value}));else{if(h.issues.length)r.issues.push(...He(u,h.issues));r.value[d]=h.value}}let l;for(let u in s)if(!c.has(u))if(t.mode==="loose"){if(u==="__proto__")continue;r.value[u]=s[u]}else l=l??[],l.push(u);if(l&&l.length>0)r.issues.push({code:"unrecognized_keys",input:s,inst:e,keys:l,continue:!0})}else{r.value=n?n.alloc(e,r,{},o):{};let c;for(let l of Reflect.ownKeys(s)){if(l==="__proto__")continue;if(!Object.prototype.propertyIsEnumerable.call(s,l))continue;let u=t.keyType._zod.run({value:l,issues:[]},o);if(u instanceof Promise)throw Error("Async schemas not supported in object keys currently");if(typeof l==="string"&&St.test(l)&&u.issues.length){let f=t.keyType._zod.run({value:Number(l),issues:[]},o);if(f instanceof Promise)throw Error("Async schemas not supported in object keys currently");if(f.issues.length===0)u=f}if(u.issues.length){if(t.mode==="loose")r.value[l]=s[l];else if(a)c=c??[],c.push(l);else r.issues.push({code:"invalid_key",origin:"record",issues:u.issues.map((f)=>Ee(f,o,ue())),input:l,path:[l],inst:e});continue}let d=u.value;if(d==="__proto__")continue;let h=t.valueType._zod.run({value:s[l],issues:[]},o);if(h instanceof Promise)i.push(h.then((f)=>{if(f.issues.length)r.issues.push(...He(l,f.issues));r.value[d]=f.value}));else{if(h.issues.length)r.issues.push(...He(l,h.issues));r.value[d]=h.value}}if(c&&c.length>0)r.issues.push({code:"unrecognized_keys",input:s,inst:e,keys:c,continue:!0})}if(i.length)return Promise.all(i).then(()=>r);return r}});var _a=m("$ZodEnum",(e,t)=>{Z.init(e,t);let n=vt(t.entries),r=new Set(n);e._zod.values=r,I(e,"pattern",(o)=>{let s=vt(o.def.entries).filter((i)=>us.has(typeof i));return new RegExp(s.length?`^(${s.map((i)=>Me(i.toString())).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(o,s)=>{let i=o.value;if(r.has(i))return o;return o.issues.push({code:"invalid_value",values:n,input:i,inst:e}),o}}),$a=m("$ZodLiteral",(e,t)=>{Z.init(e,t);let n=new Set(t.values);e._zod.values=n,I(e,"pattern",(r)=>{let o=r.def.values;return new RegExp(o.length?`^(${o.map((s)=>typeof s==="string"?Me(s):s?Me(s.toString()):String(s)).join("|")})$`:"^[^\\s\\S]$")}),e._zod.parse=(r,o)=>{let s=r.value;if(n.has(s))return r;return r.issues.push({code:"invalid_value",values:t.values,input:s,inst:e}),r}});var ba=m("$ZodTransform",(e,t)=>{Z.init(e,t),e._zod.optin="optional",re.memoizer?.guard(e),e._zod.parse=(n,r)=>{if(r.direction==="backward")throw new xt(e.constructor.name);let o=t.transform(n.value,n);if(r.async)return(o instanceof Promise?o:Promise.resolve(o)).then((i)=>(n.value=i,n));if(o instanceof Promise)throw new ze;return n.value=o,n}});function ki(e,t){return e.value=t.issues.length?void 0:t.value,e}var Lr=m("$ZodOptional",(e,t)=>{Z.init(e,t),I(e,"optin",(n)=>n.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),e._zod.optout="optional",I(e,"values",(n)=>{let r=n.def.innerType._zod.values;return r?new Set([...r,void 0]):void 0}),I(e,"pattern",(n)=>{let r=n.def.innerType._zod.pattern;return r?new RegExp(`^(${Vt(r.source)})?$`):void 0}),e._zod.parse=(n,r)=>{if(n.value===void 0){if(t.innerType._zod.optin!=="defaulted")return n;let o=t.innerType._zod.run({value:n.value,issues:[]},r);if(o instanceof Promise)return o.then((s)=>ki(n,s));return ki(n,o)}return t.innerType._zod.run(n,r)}}),va=m("$ZodExactOptional",(e,t)=>{Lr.init(e,t),I(e,"values",(n)=>n.def.innerType._zod.values),I(e,"pattern",(n)=>n.def.innerType._zod.pattern),e._zod.parse=(n,r)=>t.innerType._zod.run(n,r)}),Pa=m("$ZodNullable",(e,t)=>{Z.init(e,t),I(e,"optin",(n)=>n.def.innerType._zod.optin),I(e,"optout",(n)=>n.def.innerType._zod.optout),I(e,"pattern",(n)=>{let r=n.def.innerType._zod.pattern;return r?new RegExp(`^(${Vt(r.source)}|null)$`):void 0}),I(e,"values",(n)=>n.def.innerType._zod.values?new Set([...n.def.innerType._zod.values,null]):void 0),e._zod.parse=(n,r)=>{if(n.value===null)return n;return t.innerType._zod.run(n,r)}}),xa=m("$ZodDefault",(e,t)=>{Z.init(e,t),e._zod.optin="defaulted",I(e,"values",(n)=>n.def.innerType._zod.values),e._zod.parse=(n,r)=>{if(r.direction==="backward")return t.innerType._zod.run(n,r);if(n.value===void 0)return n.value=t.defaultValue,n;let o=t.innerType._zod.run(n,r);if(o instanceof Promise)return o.then((s)=>Ei(s,t));return Ei(o,t)}});function Ei(e,t){if(e.value===void 0)e.value=t.defaultValue;return e}var Sa=m("$ZodPrefault",(e,t)=>{Z.init(e,t),e._zod.optin="defaulted",I(e,"values",(n)=>n.def.innerType._zod.values),e._zod.parse=(n,r)=>{if(r.direction==="backward")return t.innerType._zod.run(n,r);if(n.value===void 0)n.value=t.defaultValue;return t.innerType._zod.run(n,r)}}),ka=m("$ZodNonOptional",(e,t)=>{Z.init(e,t),I(e,"values",(n)=>{let r=n.def.innerType._zod.values;return r?new Set([...r].filter((o)=>o!==void 0)):void 0}),e._zod.parse=(n,r)=>{let o=t.innerType._zod.run(n,r);if(o instanceof Promise)return o.then((s)=>zi(s,e));return zi(o,e)}});function zi(e,t){if(!e.issues.length&&e.value===void 0)e.issues.push({code:"invalid_type",expected:"nonoptional",input:e.value,inst:t});return e}function Ti(e,t,n,r){if(!t.issues.length){if(e.value=t.value,t.memo)e.memo=!0;return e}return e.value=n.catchValue({...t,value:e.value,error:{issues:t.issues.map((o)=>Ee(o,r,ue()))},input:e.value}),e}var Ea=m("$ZodCatch",(e,t)=>{Z.init(e,t),I(e,"optin",(n)=>n.def.innerType._zod.optin==="defaulted"?"defaulted":"optional"),I(e,"optout",(n)=>n.def.innerType._zod.optout),I(e,"values",(n)=>n.def.innerType._zod.values),e._zod.parse=(n,r)=>{if(r.direction==="backward")return t.innerType._zod.run(n,r);let o=t.innerType._zod.run({value:n.value,issues:[]},r);if(o instanceof Promise)return o.then((s)=>Ti(n,s,t,r));return Ti(n,o,t,r)}});var za=m("$ZodPipe",(e,t)=>{Z.init(e,t),I(e,"values",(n)=>n.def.in._zod.values),I(e,"optin",(n)=>n.def.in._zod.optin),I(e,"optout",(n)=>n.def.out._zod.optout),I(e,"propValues",(n)=>n.def.in._zod.propValues),e._zod.parse=(n,r)=>{if(r.direction==="backward"){let s=t.out._zod.run(n,r);if(s instanceof Promise)return s.then((i)=>pn(i,t.in,r));return pn(s,t.in,r)}let o=t.in._zod.run(n,r);if(o instanceof Promise)return o.then((s)=>pn(s,t.out,r));return pn(o,t.out,r)}});function pn(e,t,n){if(e.issues.some((r)=>r.code!=="unrecognized_keys"))return e.aborted=!0,e;return t._zod.run({value:e.value,issues:e.issues},n)}var Ta=m("$ZodReadonly",(e,t)=>{Z.init(e,t),I(e,"propValues",(n)=>n.def.innerType._zod.propValues),I(e,"values",(n)=>n.def.innerType._zod.values),I(e,"optin",(n)=>n.def.innerType?._zod?.optin),I(e,"optout",(n)=>n.def.innerType?._zod?.optout),e._zod.parse=(n,r)=>{if(r.direction==="backward")return t.innerType._zod.run(n,r);let o=t.innerType._zod.run(n,r);if(o instanceof Promise)return o.then(Ri);return Ri(o)}});function Ri(e){if(!e.memo)e.value=Object.freeze(e.value);return e}var Ra=m("$ZodCustom",(e,t)=>{G.init(e,t),Z.init(e,t),e._zod.parse=(n,r)=>n,e._zod.check=(n)=>{let r=n.value,o=t.fn(r);if(o instanceof Promise)return o.then((s)=>Ai(s,n,r,e));Ai(o,n,r,e);return}});function Ai(e,t,n,r){if(!e){let o={code:"custom",input:n,inst:r,path:[...r._zod.def.path??[]],continue:!r._zod.def.abort};if(r._zod.def.params)o.params=r._zod.def.params;t.issues.push(Ke(o))}}class Ca extends Error{constructor(){super("Cannot parse a reference cycle that closes through a transform");this.name="ZodCyclicError"}}var Br="~memo",Aa=[];function Oa(e){return e!==null&&typeof e==="object"}function Fr(e){return e.map((t)=>t.path?{...t,path:t.path.slice()}:{...t})}var Ia=new WeakMap,zt=0,wn=1,Tt=2;function _n(e,t,n){let r=Ia.get(e);if(r!==void 0)return r?Tt:zt;if(t.has(e))return Tt;t.add(e);let o=zt,s=(u)=>{if(o!==Tt&&u?._zod){let p=_n(u,t,n);if(p>o)o=p}},i=(u,p)=>{let d=zt;for(let h of Reflect.ownKeys(u)){let f=Object.getOwnPropertyDescriptor(u,h);if(p&&!f.enumerable)continue;let g=f.get?wn:f.value?._zod?_n(f.value,t,n):zt;if(g>d)d=g}return d},a=(u)=>{if(u>o)o=u},c=e._zod.def,l=c.type;switch(l){case"object":{let u=Jt(c);a(u?i(u,!0):wn),s(c.catchall);break}case"array":s(c.element);break;case"tuple":for(let u of c.items)s(u);s(c.rest);break;case"record":case"map":s(c.keyType),s(c.valueType);break;case"set":s(c.valueType);break;case"union":for(let u of c.options)s(u);break;case"intersection":s(c.left),s(c.right);break;case"optional":case"nullable":case"default":case"prefault":case"catch":case"readonly":case"nonoptional":case"promise":case"success":s(c.innerType);break;case"pipe":s(c.in),s(c.out);break;case"function":s(c.input),s(c.output);break;case"lazy":{let u=c._cachedInner??(n?e._zod.innerType:void 0);a(u?_n(u,t,!1):wn);break}case"template_literal":case"string":case"number":case"int":case"boolean":case"bigint":case"symbol":case"undefined":case"null":case"void":case"never":case"any":case"unknown":case"date":case"nan":case"enum":case"literal":case"file":case"transform":case"custom":break;default:for(let u in c){let p=Object.getOwnPropertyDescriptor(c,u);if(!p||p.get)continue;let d=p.value;if(!d||typeof d!=="object")continue;if(d._zod)s(d);else if(Array.isArray(d))for(let h of d)s(h)}}return t.delete(e),Yp(e,o)}function Yp(e,t){if(t!==wn)Ia.set(e,t===Tt);return t}function Gp(e,t){let n=e.buckets.get(t);if(!n)n=new WeakMap,e.buckets.set(t,n);return n}var gn,yn=[],Vp={alloc(e,t,n){let r=gn;if(!r)return n;gn=void 0;let o={value:n,issues:null};return r.set(t.value,o),yn.push(o),n},guard(e){var t;(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred.push(()=>{let n=e._zod.parse,r=(o,s)=>{if(s.direction!=="backward"&&Jp(s,o.value))throw new Ca;return n(o,s)};if(e._zod.parse=r,e._zod.run===n)e._zod.run=r})},attach(e){var t;let n,r=!1,o,s;(t=e._zod).deferred??(t.deferred=[]),e._zod.deferred.push(()=>{let i=e._zod.parse,a=(c,l)=>{if(n===void 0){let b=_n(e,new Set,!1);if(b===zt){if(e._zod.parse=i,e._zod.run===a)e._zod.run=i;return i(c,l)}if(b===Tt||r)n=!0;else r=!0}let u=c.value;if(!Oa(u))return i(c,l);let p=l[Br];if(!p)p={buckets:new WeakMap,backEdges:void 0},l[Br]=p;let d;if(o===l)d=s;else d=Gp(p,e),o=l,s=d;let h=d.get(u);if(h){if(c.value=h.value,h.issues){if(h.issues.length)c.issues.push(...Fr(h.issues))}else c.memo=!0,p.backEdges??(p.backEdges=new WeakSet),p.backEdges.add(h.value);return c}gn=d;let f=yn.length,g=i(c,l);gn=void 0;let _=yn.length>f?yn.pop():void 0;if(g instanceof Promise)return g.then((b)=>{if(_)_.issues=b.issues.length?Fr(b.issues):Aa;return b});if(_)_.issues=g.issues.length?Fr(g.issues):Aa;return g};if(e._zod.parse=a,e._zod.run===i)e._zod.run=a})}};function Na(){return Vp}function Jp(e,t){let n=e[Br]?.backEdges;return n!==void 0&&Oa(t)&&n.has(t)}var Kp=()=>{let e={string:{unit:"characters",verb:"to have"},file:{unit:"bytes",verb:"to have"},array:{unit:"items",verb:"to have"},set:{unit:"items",verb:"to have"},map:{unit:"entries",verb:"to have"}};function t(s){return e[s]??null}let n={regex:"input",email:"email address",url:"URL",emoji:"emoji",uuid:"UUID",uuidv4:"UUIDv4",uuidv6:"UUIDv6",nanoid:"nanoid",guid:"GUID",cuid:"cuid",cuid2:"cuid2",ulid:"ULID",xid:"XID",ksuid:"KSUID",datetime:"ISO datetime",date:"ISO date",time:"ISO time",duration:"ISO duration",ipv4:"IPv4 address",ipv6:"IPv6 address",mac:"MAC address",cidrv4:"IPv4 range",cidrv6:"IPv6 range",base64:"base64-encoded string",base64url:"base64url-encoded string",json_string:"JSON string",e164:"E.164 number",currency_code:"currency code",credit_card:"credit card number",iban:"IBAN",jwt:"JWT",template_literal:"input"},r={nan:"NaN"};function o(s,i){if(s==="number"&&typeof i==="number"&&!Number.isFinite(i))return String(i);return r[s]??s}return(s)=>{switch(s.code){case"invalid_type":{let i=o(s.expected),a=ms(s.input),c=o(a,s.input);return`Invalid input: expected ${i}, received ${c}`}case"invalid_value":if(s.values.length===1)return`Invalid input: expected ${br(s.values[0])}`;return`Invalid option: expected one of ${wr(s.values,"|")}`;case"too_big":{let i=s.exact?"exactly ":s.inclusive?"<=":"<",a=t(s.origin);if(a)return`Too big: expected ${s.origin??"value"} to have ${i}${s.maximum.toString()} ${a.unit??"elements"}`;return`Too big: expected ${s.origin??"value"} to be ${i}${s.maximum.toString()}`}case"too_small":{let i=s.exact?"exactly ":s.inclusive?">=":">",a=t(s.origin);if(a)return`Too small: expected ${s.origin} to have ${i}${s.minimum.toString()} ${a.unit}`;return`Too small: expected ${s.origin} to be ${i}${s.minimum.toString()}`}case"invalid_format":{let i=s;if(i.format==="starts_with")return`Invalid string: must start with "${i.prefix}"`;if(i.format==="ends_with")return`Invalid string: must end with "${i.suffix}"`;if(i.format==="includes")return`Invalid string: must include "${i.includes}"`;if(i.format==="regex")return`Invalid string: must match pattern ${i.pattern}`;return`Invalid ${n[i.format]??s.format}`}case"not_multiple_of":return`Invalid number: must be a multiple of ${s.divisor}`;case"unrecognized_keys":return`Unrecognized key${s.keys.length>1?"s":""}: ${wr(s.keys,", ")}`;case"invalid_key":return`Invalid key in ${s.origin}`;case"invalid_union":if(s.options&&Array.isArray(s.options)&&s.options.length>0)return`Invalid discriminator value. Expected ${s.options.map((a)=>`'${a}'`).join(" | ")}`;if(s.inclusive===!1)return"Invalid input: more than one option matched";return"Invalid input";case"invalid_element":return`Invalid value in ${s.origin}`;default:return"Invalid input"}}};function jr(){return{localeError:Kp()}}var Da;class Wa{constructor(){this._map=new WeakMap,this._idmap=new Map}add(e,...t){let n=t[0];if(this._map.set(e,n),n&&typeof n==="object"&&"id"in n)this._idmap.set(n.id,e);return this}clear(){return this._map=new WeakMap,this._idmap=new Map,this}remove(e){let t=this._map.get(e);if(t&&typeof t==="object"&&"id"in t)this._idmap.delete(t.id);return this._map.delete(e),this}get(e){let t=e._zod.parent;if(t){let n={...this.get(t)??{}};delete n.id;let r={...n,...this._map.get(e)};return Object.keys(r).length?r:void 0}return this._map.get(e)}has(e){return this._map.has(e)}}function Xp(){return new Wa}(Da=globalThis).__zod_globalRegistry??(Da.__zod_globalRegistry=Xp());var Xe=globalThis.__zod_globalRegistry;function $n(e){if(e.checks)e.checks=[...e.checks];return e}function Za(e,t){return new e($n({type:"string",...P(t)}))}function Ua(e,t){return new e($n({type:"string",coerce:!0,...P(t)}))}function La(e,t){return new e({type:"string",format:"email",check:"string_format",abort:!1,...P(t)})}function Fa(e,t){return new e({type:"string",format:"guid",check:"string_format",abort:!1,...P(t)})}function Ba(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,...P(t)})}function ja(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v4",...P(t)})}function Ma(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v6",...P(t)})}function Ha(e,t){return new e({type:"string",format:"uuid",check:"string_format",abort:!1,version:"v7",...P(t)})}function Mr(e,t){return new e({type:"string",format:"url",check:"string_format",abort:!1,...P(t)})}function qa(e,t){return new e({type:"string",format:"emoji",check:"string_format",abort:!1,...P(t)})}function Ya(e,t){return new e({type:"string",format:"nanoid",check:"string_format",abort:!1,...P(t)})}function Ga(e,t){return new e({type:"string",format:"cuid",check:"string_format",abort:!1,...P(t)})}function Va(e,t){return new e({type:"string",format:"cuid2",check:"string_format",abort:!1,...P(t)})}function Ja(e,t){return new e({type:"string",format:"ulid",check:"string_format",abort:!1,...P(t)})}function Ka(e,t){return new e({type:"string",format:"xid",check:"string_format",abort:!1,...P(t)})}function Xa(e,t){return new e({type:"string",format:"ksuid",check:"string_format",abort:!1,...P(t)})}function Qa(e,t){return new e({type:"string",format:"ipv4",check:"string_format",abort:!1,...P(t)})}function ec(e,t){return new e({type:"string",format:"ipv6",check:"string_format",abort:!1,...P(t)})}function tc(e,t){return new e({type:"string",format:"cidrv4",check:"string_format",abort:!1,...P(t)})}function nc(e,t){return new e({type:"string",format:"cidrv6",check:"string_format",abort:!1,...P(t)})}function rc(e,t){return new e({type:"string",format:"base64",check:"string_format",abort:!1,...P(t)})}function oc(e,t){return new e({type:"string",format:"base64url",check:"string_format",abort:!1,...P(t)})}function sc(e,t){return new e({type:"string",format:"e164",check:"string_format",abort:!1,...P(t)})}function ic(e,t){return new e({type:"string",format:"jwt",check:"string_format",abort:!1,...P(t)})}function bn(e,t){return new e({type:"string",format:"datetime",check:"string_format",offset:!1,local:!1,precision:null,...P(t)})}function vn(e,t){return new e({type:"string",format:"date",check:"string_format",...P(t)})}function Pn(e,t){return new e({type:"string",format:"time",check:"string_format",precision:null,...P(t)})}function xn(e,t){return new e({type:"string",format:"duration",check:"string_format",...P(t)})}function ac(e,t){return new e($n({type:"number",checks:[],...P(t)}))}function cc(e,t){return new e($n({type:"number",coerce:!0,checks:[],...P(t)}))}function lc(e,t){return new e({type:"number",check:"number_format",abort:!1,format:"safeint",...P(t)})}function uc(e,t){return new e({type:"boolean",...P(t)})}function pc(e,t){return new e({type:"boolean",coerce:!0,...P(t)})}function dc(e,t){return new e({type:"bigint",coerce:!0,...P(t)})}function fc(e){return new e({type:"unknown"})}function hc(e,t){return new e({type:"never",...P(t)})}function mc(e,t){return new e({type:"date",coerce:!0,...P(t)})}function st(e,t){return new Or({check:"less_than",...P(t),value:e,inclusive:!1})}function We(e,t){return new Or({check:"less_than",...P(t),value:e,inclusive:!0})}function it(e,t){return new Ir({check:"greater_than",...P(t),value:e,inclusive:!1})}function Ze(e,t){return new Ir({check:"greater_than",...P(t),value:e,inclusive:!0})}function Rt(e,t){return new ci({check:"multiple_of",...P(t),value:e})}function Sn(e,t){return new ui({check:"max_length",...P(t),maximum:e})}function at(e,t){return new pi({check:"min_length",...P(t),minimum:e})}function kn(e,t){return new di({check:"length_equals",...P(t),length:e})}function Hr(e,t){return new fi({check:"string_format",format:"regex",...P(t),pattern:e})}function qr(e){return new hi({check:"string_format",format:"lowercase",...P(e)})}function Yr(e){return new mi({check:"string_format",format:"uppercase",...P(e)})}function Gr(e,t){return new gi({check:"string_format",format:"includes",...P(t),includes:e})}function Vr(e,t){return new yi({check:"string_format",format:"starts_with",...P(t),prefix:e})}function Jr(e,t){return new wi({check:"string_format",format:"ends_with",...P(t),suffix:e})}function qe(e){return new _i({check:"overwrite",tx:e})}function Kr(e){return qe((t)=>t.normalize(e))}function Xr(){return qe((e)=>e.trim())}function Qr(){return qe((e)=>e.toLowerCase())}function eo(){return qe((e)=>e.toUpperCase())}function to(){return qe((e)=>cs(e))}function gc(e,t,n){return new e({type:"array",element:t,...P(n)})}function yc(e,t,n){return new e({type:"custom",check:"custom",fn:t,...P(n)})}function wc(e,t){let n=Qp((r)=>(r.addIssue=(o)=>{if(typeof o==="string")r.issues.push(Ke(o,r.value,n._zod.def));else{let s=o;if(s.fatal)s.continue=!1;if(s.code??(s.code="custom"),!("input"in s))s.input=r.value;s.inst??(s.inst=n),s.continue??(s.continue=!n._zod.def.abort),r.issues.push(Ke(s))}},e(r.value,r)),t);return n}function Qp(e,t){let n=new G({check:"custom",...P(t)});return n._zod.check=e,n}function At(e,...t){for(let n of t)for(let r of Reflect.ownKeys(n))if(Object.prototype.propertyIsEnumerable.call(n,r))_e(e,r,n[r]);return e}function ro(e){let t=e?.target??"draft-2020-12";if(t==="draft-4")t="draft-04";if(t==="draft-7")t="draft-07";return{processors:e.processors??{},metadataRegistry:e?.metadata??Xe,target:t,unrepresentable:e?.unrepresentable??"throw",override:e?.override??(()=>{}),io:e?.io??"output",counter:0,seen:new Map,sharedDefsExtractedFor:void 0,sharedEmitDoneFor:void 0,cycles:e?.cycles??"ref",reused:e?.reused??"inline",intersections:[],deferred:[],external:e?.external??void 0}}function be(e,t,n,r,o){let s=typeof t.unrepresentable==="function"?t.unrepresentable({zodSchema:e,path:r.path,message:o}):t.unrepresentable;if(s==="any")return!1;if(s===void 0||s==="throw")throw Error(o);return Object.assign(n,s),!0}function H(e,t,n={path:[],schemaPath:[]}){var r;let o=e._zod.def,s=t.seen.get(e);if(s){if(s.count++,n.schemaPath.includes(e))s.cycle=n.path;return s.schema}let i={schema:{},count:1,cycle:void 0,path:n.path};t.seen.set(e,i),t.sharedDefsExtractedFor=void 0,t.sharedEmitDoneFor=void 0;let a=e._zod.toJSONSchema?.();if(a)i.schema=a;else{let u={...n,schemaPath:[...n.schemaPath,e],path:n.path};if(e._zod.processJSONSchema)e._zod.processJSONSchema(t,i.schema,u);else{let d=i.schema,h=t.processors[o.type];if(!h)throw Error(`[toJSONSchema]: Non-representable type encountered: ${o.type}`);h(e,t,d,u)}let p=e._zod.parent;if(p){if(!i.ref)i.ref=p;H(p,t,u),t.seen.get(p).isParent=!0}}let c=t.metadataRegistry.get(e);if(c)At(i.schema,c);if(t.io==="input"&&te(e))delete i.schema.examples,delete i.schema.default;if(t.io==="input"&&"_prefault"in i.schema)(r=i.schema).default??(r.default=i.schema._prefault);return delete i.schema._prefault,t.seen.get(e).schema}function _c(e){return e.replace(/~/g,"~0").replace(/\//g,"~1")}function oo(e,t){let n=e.seen.get(t);if(!n)throw Error("Unprocessed schema. This is a bug in Zod.");if(e.external&&e.sharedDefsExtractedFor===e.external)return;let r=new Map;for(let i of e.seen.entries()){let a=e.metadataRegistry.get(i[0])?.id;if(a){let c=r.get(a);if(c&&c!==i[0])throw Error(`Duplicate schema id "${a}" detected during JSON Schema conversion. Two different schemas cannot share the same id when converted together.`);r.set(a,i[0])}}let o=(i)=>{let a=e.target==="draft-2020-12"?"$defs":"definitions";if(e.external){let p=e.external.registry.get(i[0])?.id,d=e.external.uri??((f)=>f);if(p)return{ref:d(p)};let h=i[1].defId??i[1].schema.id??`schema${e.counter++}`;return i[1].defId=h,{defId:h,ref:`${d("__shared")}#/${a}/${_c(h)}`}}let c="#",l=`${c}/${a}/`;if(i[1]===n&&!i[1].schema.id)return{ref:c};let u=i[1].schema.id??`__schema${e.counter++}`;return{defId:u,ref:l+_c(u)}},s=(i)=>{if(i[1].schema.$ref)return;let a=i[1],{ref:c,defId:l}=o(i);if(a.def={...a.schema},l)a.defId=l;let u=a.schema;for(let p in u)delete u[p];u.$ref=c};if(e.cycles==="throw")for(let i of e.seen.entries()){let a=i[1];if(a.cycle)throw Error(`Cycle detected: #/${a.cycle?.join("/")}/<root>

Set the \`cycles\` parameter to \`"ref"\` to resolve cyclical schemas with defs.`)}for(let i of e.seen.entries()){let a=i[1];if(t===i[0]){s(i);continue}if(e.external){let l=e.external.registry.get(i[0])?.id;if(t!==i[0]&&l){s(i);continue}}if(e.metadataRegistry.get(i[0])?.id){s(i);continue}if(a.cycle){s(i);continue}if(a.count>1){if(e.reused==="ref")s(i)}}if(e.external)e.sharedDefsExtractedFor=e.external}function vc(e){let t=e.anyOf;if(!Array.isArray(t)||t.length===0||e.type!==void 0)return;let n=[];for(let r of t){if(!r||typeof r!=="object")return;vc(r);let o=Object.keys(r);if(o.length!==1||o[0]!=="type")return;let s=r.type;for(let i of Array.isArray(s)?s:[s]){if(typeof i!=="string")return;if(!n.includes(i))n.push(i)}}delete e.anyOf,e.type=n.length===1?n[0]:n}var Pc=new Set(["type","properties","required","additionalProperties"]),$c=["oneOf","anyOf"];function bc(e){let t=e.additionalProperties;if(t===void 0||t===!1||typeof t!=="object"||t===null)return null;return Object.keys(t).length?t:null}function no(e){let t=[];for(let s of e){if(typeof s!=="object"||s.type!=="object")return null;for(let i in s)if(!Pc.has(i))return null;t.push(s)}let n={},r=new Set;for(let s of t){for(let i in s.properties){if(Object.prototype.hasOwnProperty.call(n,i))continue;let a=[];for(let l of t){let u=l.properties?.[i]??bc(l);if(u===null||u===void 0)continue;if(!a.some((p)=>JSON.stringify(p)===JSON.stringify(u)))a.push(u)}let c=a.length===1?a[0]:no(a)??{allOf:a};_e(n,i,c)}for(let i of s.required??[])r.add(i)}let o={type:"object",properties:n};if(r.size)o.required=[...r];if(t.every((s)=>s.additionalProperties===!1))o.additionalProperties=!1;else{let s=[];for(let i of t){let a=bc(i);if(a&&!s.some((c)=>JSON.stringify(c)===JSON.stringify(a)))s.push(a)}if(s.length===1)o.additionalProperties=s[0];else if(s.length>1)o.additionalProperties={allOf:s}}return o}function ed(e){let t=e.allOf;if(!Array.isArray(t)||t.length<2)return;for(let o of Pc)if(o in e)return;let n=t.filter((o)=>$c.some((s)=>Array.isArray(o[s]))),r=null;if(!n.length)r=no(t);else{let o=n[0],s=$c.find((c)=>Array.isArray(o[c]));if(Object.keys(o).length!==1)return;let i=t.filter((c)=>c!==o),a=o[s].map((c)=>no([...i,c]));if(a.some((c)=>!c))return;r={[s]:a}}if(!r)return;delete e.allOf,At(e,r)}function so(e,t){let n=e.seen.get(t);if(!n)throw Error("Unprocessed schema. This is a bug in Zod.");let r=(a)=>{let c=e.seen.get(a);if(c.ref===null)return;let l=c.def??c.schema,u={...l},p=c.ref;if(c.ref=null,p){r(p);let h=e.seen.get(p),f=h.schema;if(f.$ref&&(e.target==="draft-07"||e.target==="draft-04"||e.target==="openapi-3.0"))l.allOf=l.allOf??[],l.allOf.push(f);else At(l,f);if(At(l,u),a._zod.parent===p)for(let _ in l){if(_==="$ref"||_==="allOf")continue;if(!(_ in u))delete l[_]}if(f.$ref&&h.def)for(let _ in l){if(_==="$ref"||_==="allOf")continue;if(_ in h.def&&JSON.stringify(l[_])===JSON.stringify(h.def[_]))delete l[_]}}let d=a._zod.parent;if(d&&d!==p){r(d);let h=e.seen.get(d);if(h?.schema.$ref){if(l.$ref=h.schema.$ref,h.def)for(let f in l){if(f==="$ref"||f==="allOf")continue;if(f in h.def&&JSON.stringify(l[f])===JSON.stringify(h.def[f]))delete l[f]}}}e.override({zodSchema:a,jsonSchema:l,path:c.path??[]})};if(!e.external||e.sharedEmitDoneFor!==e.external){for(let a of[...e.seen.entries()].reverse())r(a[0]);if(e.target!=="openapi-3.0")for(let a of e.seen.entries())vc(a[1].def??a[1].schema);for(let a of e.deferred)a();if(e.intersections.length){let a=new Map;for(let c of e.seen.values())for(let l of[c.schema,c.def]){let u=l?.allOf;if(!Array.isArray(u))continue;let p=a.get(u);if(p)p.push(l);else a.set(u,[l])}for(let c of e.intersections)for(let l of a.get(c)??[])ed(l)}}let o={};if(e.target==="draft-2020-12")o.$schema="https://json-schema.org/draft/2020-12/schema";else if(e.target==="draft-07")o.$schema="http://json-schema.org/draft-07/schema#";else if(e.target==="draft-04")o.$schema="http://json-schema.org/draft-04/schema#";else if(e.target==="openapi-3.0");if(e.external?.uri){let a=e.external.registry.get(t)?.id;if(!a)throw Error("Schema is missing an `id` property");o.$id=e.external.uri(a)}At(o,n.defId?n.schema:n.def??n.schema);let s=e.metadataRegistry.get(t)?.id;if(s!==void 0&&o.id===s)delete o.id;let i=e.external?.defs??{};if(!e.external||e.sharedEmitDoneFor!==e.external)for(let a of e.seen.entries()){let c=a[1];if(c.def&&c.defId){if(c.def.id===c.defId)delete c.def.id;_e(i,c.defId,c.def)}}if(e.external)e.sharedEmitDoneFor=e.external;if(e.external);else if(Object.keys(i).length>0)if(e.target==="draft-2020-12")o.$defs=i;else o.definitions=i;try{let a=JSON.parse(JSON.stringify(o));return Object.defineProperty(a,"~standard",{value:{...t["~standard"],jsonSchema:{input:Ct(t,"input",e.processors),output:Ct(t,"output",e.processors)}},enumerable:!1,writable:!1}),a}catch(a){throw Error("Error converting schema to JSON.")}}function te(e,t){let n=t??{seen:new Set};if(n.seen.has(e))return!1;n.seen.add(e);let r=e._zod.def;if(r.type==="transform")return!0;if(r.type==="array")return te(r.element,n);if(r.type==="set")return te(r.valueType,n);if(r.type==="lazy")return te(r.getter(),n);if(r.type==="promise"||r.type==="optional"||r.type==="nonoptional"||r.type==="nullable"||r.type==="readonly"||r.type==="default"||r.type==="prefault"||r.type==="catch")return te(r.innerType,n);if(r.type==="intersection")return te(r.left,n)||te(r.right,n);if(r.type==="record"||r.type==="map")return te(r.keyType,n)||te(r.valueType,n);if(r.type==="pipe"){if(e._zod.traits.has("$ZodCodec"))return!0;return te(r.in,n)||te(r.out,n)}if(r.type==="object"){for(let o in r.shape)if(te(r.shape[o],n))return!0;return!1}if(r.type==="union"){for(let o of r.options)if(te(o,n))return!0;return!1}if(r.type==="tuple"){for(let o of r.items)if(te(o,n))return!0;if(r.rest&&te(r.rest,n))return!0;return!1}return!1}var xc=(e,t={})=>(n)=>{let r=ro({...n,processors:t});return H(e,r),oo(r,e),so(r,e)},Ct=(e,t,n={})=>(r)=>{let{libraryOptions:o,target:s}=r??{},i=ro({...o??{},target:s,io:t,processors:n});return H(e,i),oo(i,e),so(i,e)};var ct=(e,t,n)=>{if(e[t]===void 0||n>e[t])e[t]=n},lt=(e,t,n)=>{if(e[t]===void 0||n<e[t])e[t]=n},Sc=(e,t)=>{ct(e,"minimum",t),lt(e,"maximum",t)},Tc=(e,t)=>{if(e.multipleOf??(e.multipleOf=[]),!e.multipleOf.includes(t))e.multipleOf.push(t)},Rc=(e,t)=>{e.patterns??(e.patterns=new Set),e.patterns.add(t)},Ac=(e,t)=>{e.mime=e.mime?e.mime.filter((n)=>t.includes(n)):[...t]},Cc=(e,t)=>{if(e.format=t,t.includes("int"))e.isInt=!0},kc=(e,t)=>ct(e,"minimum",t.minimum),Ec=(e,t)=>lt(e,"maximum",t.maximum),zc=(e)=>(t,n)=>{Cc(t,n.format);let[r,o]=e[n.format];ct(t,"minimum",r),lt(t,"maximum",o)},td={greater_than:(e,t)=>ct(e,t.inclusive?"minimum":"exclusiveMinimum",t.value),less_than:(e,t)=>lt(e,t.inclusive?"maximum":"exclusiveMaximum",t.value),multiple_of:(e,t)=>Tc(e,t.value),number_format:zc(Kt),bigint_format:zc(vr),min_length:kc,max_length:Ec,length_equals:(e,t)=>Sc(e,t.length),min_size:kc,max_size:Ec,size_equals:(e,t)=>Sc(e,t.size),string_format:(e,t)=>{if(Cc(e,t.format),t.pattern)Rc(e,t.pattern);if(t.format==="base64"||t.format==="base64url")e.contentEncoding=t.format;if(t.local||t.precision===-1)e.laxFormat=!0},mime_type:(e,t)=>Ac(e,t.mime)};function V(e){let t={},n=e._zod.def,r=e._zod.traits.has("$ZodCheck")?[e,...n.checks??[]]:n.checks??[];for(let s of r)td[s._zod.def.check]?.(t,s._zod.def);let o=e._zod.bag;if(o.minimum!==void 0)ct(t,"minimum",o.minimum);if(o.exclusiveMinimum!==void 0)ct(t,"exclusiveMinimum",o.exclusiveMinimum);if(o.maximum!==void 0)lt(t,"maximum",o.maximum);if(o.exclusiveMaximum!==void 0)lt(t,"exclusiveMaximum",o.exclusiveMaximum);if(o.multipleOf!==void 0)Tc(t,o.multipleOf);if(o.format!==void 0){if(t.format??(t.format=o.format),o.format.includes("int"))t.isInt=!0}if(o.mime)Ac(t,o.mime);for(let s of o.patterns??[])Rc(t,s);return t}var nd={guid:"uuid",url:"uri",datetime:"date-time",json_string:"json-string",regex:""},rd=new Map([[Zr,Vs],[mn,Js]]),Oc=(e)=>rd.get(e)??e,Ic=(e,t,n,r)=>{let o=n;o.type="string";let{minimum:s,maximum:i,format:a,patterns:c,contentEncoding:l,laxFormat:u}=V(e);if(typeof s==="number")o.minLength=s;if(typeof i==="number")o.maxLength=i;if(a){if(o.format=nd[a]??a,o.format==="")delete o.format;if(a==="time"||u)delete o.format}if(l)o.contentEncoding=l;if(c&&c.size>0){let p=[...c].map(Oc);if(p.length===1)o.pattern=p[0].source;else if(p.length>1)o.allOf=[...p.map((d)=>({...t.target==="draft-07"||t.target==="draft-04"||t.target==="openapi-3.0"?{type:"string"}:{},pattern:d.source}))]}},Nc=(e,t,n,r)=>{let o=n,{minimum:s,maximum:i,multipleOf:a,exclusiveMaximum:c,exclusiveMinimum:l,isInt:u}=V(e);o.type=u?"integer":"number";let p=typeof l==="number"&&l>=(s??Number.NEGATIVE_INFINITY),d=typeof c==="number"&&c<=(i??Number.POSITIVE_INFINITY),h=t.target==="draft-04"||t.target==="openapi-3.0";if(p)if(h)o.minimum=l,o.exclusiveMinimum=!0;else o.exclusiveMinimum=l;else if(typeof s==="number")o.minimum=s;if(d)if(h)o.maximum=c,o.exclusiveMaximum=!0;else o.exclusiveMaximum=c;else if(typeof i==="number")o.maximum=i;if(a){let f=new Set;for(let b of a)if(Number.isFinite(b)&&b!==0)f.add(Math.abs(b));else be(e,t,o,r,`A multipleOf divisor of ${b} cannot be represented in JSON Schema`);let[g,..._]=f;if(g!==void 0)o.multipleOf=g;if(_.length)o.allOf=[...o.allOf??[],..._.map((b)=>({multipleOf:b}))]}},Dc=(e,t,n,r)=>{n.type="boolean"},Wc=(e,t,n,r)=>{be(e,t,n,r,"BigInt cannot be represented in JSON Schema")};var Zc=(e,t,n,r)=>{n.not={}};var Uc=(e,t,n,r)=>{},Lc=(e,t,n,r)=>{be(e,t,n,r,"Date cannot be represented in JSON Schema")},Fc=(e,t,n,r)=>{let o=e._zod.def,s=vt(o.entries);if(s.length===0){n.not={};return}if(s.every((i)=>typeof i==="number"))n.type="number";if(s.every((i)=>typeof i==="string"))n.type="string";n.enum=s},Bc=(e,t,n,r)=>{let o=e._zod.def;if(o.values.length===0){n.not={};return}let s=[];for(let i of o.values)if(i===void 0){if(be(e,t,n,r,"Literal `undefined` cannot be represented in JSON Schema"))return}else if(typeof i==="bigint"){if(be(e,t,n,r,"BigInt literals cannot be represented in JSON Schema"))return;s.push(Number(i))}else s.push(i);if(s.length===0);else if(s.length===1){let i=s[0];if(n.type=i===null?"null":typeof i,t.target==="draft-04"||t.target==="openapi-3.0")n.enum=[i];else n.const=i}else{if(s.every((i)=>typeof i==="number"))n.type="number";if(s.every((i)=>typeof i==="string"))n.type="string";if(s.every((i)=>typeof i==="boolean"))n.type="boolean";if(s.every((i)=>i===null))n.type="null";n.enum=s}};var jc=(e,t,n,r)=>{be(e,t,n,r,"Custom types cannot be represented in JSON Schema")};var Mc=(e,t,n,r)=>{be(e,t,n,r,"Transforms cannot be represented in JSON Schema")};var Hc=(e,t,n,r)=>{let o=n,s=e._zod.def,{minimum:i,maximum:a}=V(e);if(typeof i==="number")o.minItems=i;if(typeof a==="number")o.maxItems=a;o.type="array",o.items=H(s.element,t,{...r,path:[...r.path,"items"]})};function En(e){let t=e._zod.def;if(t.type==="pipe"&&t.in._zod.traits.has("$ZodTransform"))return En(t.out);if(t.type==="catch")return En(t.innerType);return e._zod.optin}var qc=(e,t,n,r)=>{let o=n,s=e._zod.def,i=s.shape;if(Object.getOwnPropertySymbols(i).length&&be(e,t,o,r,"Symbol keys cannot be represented in JSON Schema"))return;o.type="object",o.properties={};for(let l in i)_e(o.properties,l,H(i[l],t,{...r,path:[...r.path,"properties",l]}));let c=[];for(let l of Object.keys(i)){let u=s.shape[l];if(t.io==="input"?En(u)===void 0:u._zod.optout===void 0)c.push(l)}if(c.length>0)o.required=c;if(s.catchall?._zod.def.type==="never")o.additionalProperties=!1;else if(!s.catchall){if(t.io==="output")o.additionalProperties=!1}else if(s.catchall)o.additionalProperties=H(s.catchall,t,{...r,path:[...r.path,"additionalProperties"]})},Yc=(e,t,n,r)=>{let o=e._zod.def,s=o.inclusive===!1,i=o.options.map((a,c)=>H(a,t,{...r,path:[...r.path,s?"oneOf":"anyOf",c]}));if(s)n.oneOf=i;else n.anyOf=i},Gc=(e,t,n,r)=>{let o=e._zod.def,s=H(o.left,t,{...r,path:[...r.path,"allOf",0]}),i=H(o.right,t,{...r,path:[...r.path,"allOf",1]}),a=(l)=>("allOf"in l)&&Object.keys(l).length===1,c=[...a(s)?s.allOf:[s],...a(i)?i.allOf:[i]];n.allOf=c,t.intersections.push(c)};function io(e,t,n){if(t.$ref){if(n.has(t))return t;n.add(t);let f=e.get(t)?.def;if(!f)return t;let g=io(e,f,n);return g===f?t:g}for(let f of["anyOf","oneOf"]){let g=t[f];if(!Array.isArray(g))continue;let _=g.map((b)=>io(e,b,n));if(_.some((b,R)=>b!==g[R]))t={...t,[f]:_}}let r=Array.isArray(t.type)?t.type:[t.type],o=!r.includes("string")&&r.some((f)=>f==="number"||f==="integer"),s=t.enum??(t.const!==void 0?[t.const]:void 0);if(!o&&!s?.some((f)=>typeof f==="number"))return t;let{minimum:i,maximum:a,exclusiveMinimum:c,exclusiveMaximum:l,multipleOf:u,format:p,id:d,...h}=t;if(h.enum)h.enum=h.enum.map((f)=>typeof f==="number"?String(f):f);else if(typeof h.const==="number")h.const=String(h.const);if(!o)return h;if(h.type="string",!s)h.pattern=(r.includes("number")?St:Ar).source;return h}var ao=new WeakMap;function od(e){let t=new Map;for(let r of e.seen.values())if(r.def&&!t.has(r.schema))t.set(r.schema,r);let n=new Map;for(let r of ao.get(e)??[]){let o=e.seen.get(r),s=(o?.def??o?.schema)?.propertyNames;if(!s||s===!0||n.has(s))continue;let i=io(t,s,new Set);if(i!==s)n.set(s,i)}if(!n.size)return;for(let r of e.seen.values())for(let o of[r.schema,r.def]){let s=o&&n.get(o.propertyNames);if(s)o.propertyNames=s}}var Vc=(e,t,n,r)=>{let o=n,s=e._zod.def;o.type="object";let i=s.keyType,a=V(i).patterns;if(s.mode==="loose"&&a&&a.size>0){let u=H(s.valueType,t,{...r,path:[...r.path,"patternProperties","*"]});o.patternProperties={};for(let p of a)_e(o.patternProperties,Oc(p).source,u)}else{if(t.target==="draft-07"||t.target==="draft-2020-12"){o.propertyNames=H(s.keyType,t,{...r,path:[...r.path,"propertyNames"]});let u=ao.get(t);if(!u)u=[],ao.set(t,u),t.deferred.push(()=>od(t));u.push(e)}o.additionalProperties=H(s.valueType,t,{...r,path:[...r.path,"additionalProperties"]})}let c=i._zod.values,l=t.io==="input"&&En(s.valueType)!==void 0;if(c&&!s.partial&&!l){let u=[...c].filter((p)=>typeof p==="string"||typeof p==="number");if(u.length>0)o.required=u.map(String)}},Jc=(e,t,n,r)=>{let o=e._zod.def,s=H(o.innerType,t,r),i=t.seen.get(e);if(t.target==="openapi-3.0")i.ref=o.innerType,n.nullable=!0;else n.anyOf=[s,{type:"null"}]},Kc=(e,t,n,r)=>{let o=e._zod.def;H(o.innerType,t,r);let s=t.seen.get(e);s.ref=o.innerType},co=Symbol();function Xc(e,t,n,r,o){let s=!1,i=JSON.stringify(e,(a,c)=>{if(typeof c!=="bigint")return c;return s=!0,null});if(!s)return JSON.parse(i);return be(t,n,r,o,"BigInt defaults cannot be represented in JSON Schema"),co}var Qc=(e,t,n,r)=>{let o=e._zod.def;H(o.innerType,t,r);let s=t.seen.get(e);s.ref=o.innerType;let i=Xc(o.defaultValue,e,t,n,r);if(i!==co)n.default=i},el=(e,t,n,r)=>{let o=e._zod.def;H(o.innerType,t,r);let s=t.seen.get(e);if(s.ref=o.innerType,t.io!=="input")return;let i=Xc(o.defaultValue,e,t,n,r);if(i!==co)n._prefault=i},tl=(e,t,n,r)=>{let o=e._zod.def;H(o.innerType,t,r);let s=t.seen.get(e);s.ref=o.innerType;let i;try{i=o.catchValue(void 0)}catch{be(e,t,n,r,"Dynamic catch values are not supported in JSON Schema");return}n.default=i},nl=(e,t,n,r)=>{let o=e._zod.def,s=o.in._zod.traits.has("$ZodTransform"),i=t.io==="input"?s?o.out:o.in:o.out;H(i,t,r);let a=t.seen.get(e);a.ref=i},rl=(e,t,n,r)=>{let o=e._zod.def;H(o.innerType,t,r);let s=t.seen.get(e);s.ref=o.innerType,n.readOnly=!0};var lo=(e,t,n,r)=>{let o=e._zod.def;H(o.innerType,t,r);let s=t.seen.get(e);s.ref=o.innerType};var ol=new WeakSet([Object.prototype,Error.prototype]);function zn(e,t,n){Object.defineProperty(e,t,{configurable:!0,enumerable:!1,get(){let r=n(this);return Object.defineProperty(this,t,{value:r,configurable:!0,writable:!0}),r},set(r){Object.defineProperty(this,t,{value:r,configurable:!0,writable:!0})}})}var fd=(e,t)=>{vs.init(e,t),e.name="ZodError";let n=Object.getPrototypeOf(e);if(ol.has(n))return;ol.add(n),zn(n,"format",(r)=>(o)=>xs(r,o)),zn(n,"flatten",(r)=>(o)=>Ps(r,o)),zn(n,"addIssue",(r)=>(o)=>{r.issues.push(o),r.message=JSON.stringify(r.issues,Pt,2)}),zn(n,"addIssues",(r)=>(o)=>{r.issues.push(...o),r.message=JSON.stringify(r.issues,Pt,2)}),Object.defineProperty(n,"isEmpty",{configurable:!0,enumerable:!1,get(){return this.issues.length===0}})};var pe=m("ZodError",fd,void 0,{Parent:Error});var sl=sn(pe),il=an(pe),al=cn(pe),cl=ln(pe),ll=ks(pe),ul=Es(pe),pl=zs(pe),dl=Ts(pe),fl=Rs(pe),hl=As(pe),ml=Cs(pe),gl=Os(pe);function md(){if(!re.localeError)ue(jr())}function An(){if(!re.memoizer)ue({memoizer:Na()})}var B=m("ZodType",(e,t)=>(md(),Z.init(e,t),e.def=t,e.type=t.type,e),{check(...e){let t=this.def;return this.clone(le(t,{checks:[...t.checks??[],...e.map((n)=>typeof n==="function"?{_zod:{check:n,def:{check:"custom"},onattach:[]}}:n)]}),{parent:!0})},with(...e){return this.check(...e)},clone(e,t){return Se(this,e,t)},brand(){return this},register(e,t){return e.add(this,t),this},refine(e,t){return this.check(of(e,t))},superRefine(e,t){return this.check(sf(e,t))},overwrite(e){return this.check(qe(e))},optional(){return _l(this)},exactOptional(){return Hd(this)},nullable(){return $l(this)},nullish(){return _l($l(this))},nonoptional(e){return Kd(this,e)},array(){return de(this)},or(e){return On([this,e])},and(e){return Fd(this,e)},transform(e){return bl(this,Md(e))},default(e){return Gd(this,e)},prefault(e){return Jd(this,e)},catch(e){return Qd(this,e)},pipe(e){return bl(this,e)},readonly(){return nf(this)},describe(e){let t=this.clone();return Xe.add(t,{description:e}),t},meta(...e){if(e.length===0)return Xe.get(this);let t=this.clone();return Xe.add(t,e[0]),t},isOptional(){return this.safeParse(void 0).success},isNullable(){return this.safeParse(null).success},apply(e,...t){return t.length===0?e(this):e(this,...t)},get "~standard"(){return nn(this,"~standard",{...Wr(this),jsonSchema:{input:Ct(this,"input"),output:Ct(this,"output")}})},set "~standard"(e){De(this,"~standard",e)},parse:function e(t,n){return sl(this,t,n,{callee:e})},parseAsync:async function e(t,n){return await il(this,t,n,{callee:e})},safeParse(e,t){return al(this,e,t)},async safeParseAsync(e,t){return cl(this,e,t)},get spa(){return this?.safeParseAsync},set spa(e){De(this,"spa",e)},validate(e,t){return Er(this,e,t)},validateAsync(e,t){return zr(this,e,t)},encode:function e(t,n){return ll(this,t,n,{callee:e})},decode:function e(t,n){return ul(this,t,n,{callee:e})},encodeAsync:async function e(t,n){return await pl(this,t,n,{callee:e})},decodeAsync:async function e(t,n){return await dl(this,t,n,{callee:e})},safeEncode(e,t){return fl(this,e,t)},safeDecode(e,t){return hl(this,e,t)},async safeEncodeAsync(e,t){return ml(this,e,t)},async safeDecodeAsync(e,t){return gl(this,e,t)},toJSONSchema(e){return xc(this,{})(e)},get description(){return Xe.get(this)?.description},get _def(){return this._zod.def}}),vl=m("_ZodString",(e,t)=>{hn.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Ic(e,n,r,o)},rn({format:(e)=>V(e).format??null,minLength:(e)=>V(e).minimum??null,maxLength:(e)=>V(e).maximum??null},{regex(...e){return this.check(Hr(...e))},includes(...e){return this.check(Gr(...e))},startsWith(...e){return this.check(Vr(...e))},endsWith(...e){return this.check(Jr(...e))},min(...e){return this.check(at(...e))},max(...e){return this.check(Sn(...e))},length(...e){return this.check(kn(...e))},nonempty(...e){return this.check(at(1,...e))},lowercase(e){return this.check(qr(e))},uppercase(e){return this.check(Yr(e))},trim(){return this.check(Xr())},normalize(...e){return this.check(Kr(...e))},toLowerCase(){return this.check(Qr())},toUpperCase(){return this.check(eo())},slugify(){return this.check(to())}})),po=m("ZodString",(e,t)=>{hn.init(e,t),vl.init(e,t)},{email(e){return this.check(La(gd,e))},url(e){return this.check(Mr(Pl,e))},jwt(e){return this.check(ic(Cd,e))},emoji(e){return this.check(qa(wd,e))},guid(e){return this.check(Fa(yd,e))},uuid(e){return this.check(Ba(Tn,e))},uuidv4(e){return this.check(ja(Tn,e))},uuidv6(e){return this.check(Ma(Tn,e))},uuidv7(e){return this.check(Ha(Tn,e))},nanoid(e){return this.check(Ya(_d,e))},cuid(e){return this.check(Ga($d,e))},cuid2(e){return this.check(Va(bd,e))},ulid(e){return this.check(Ja(vd,e))},base64(e){return this.check(rc(Td,e))},base64url(e){return this.check(oc(Rd,e))},xid(e){return this.check(Ka(Pd,e))},ksuid(e){return this.check(Xa(xd,e))},ipv4(e){return this.check(Qa(Sd,e))},ipv6(e){return this.check(ec(kd,e))},cidrv4(e){return this.check(tc(Ed,e))},cidrv6(e){return this.check(nc(zd,e))},e164(e){return this.check(sc(Ad,e))},datetime(e){return this.check(bn(Ot,e))},date(e){return this.check(vn(It,e))},time(e){return this.check(Pn(Nt,e))},duration(e){return this.check(xn(Dt,e))}});function w(e){return Za(po,e)}var M=m("ZodStringFormat",(e,t)=>{F.init(e,t),vl.init(e,t)}),Ot=m("ZodISODateTime",(e,t)=>{qi.init(e,t),M.init(e,t)}),It=m("ZodISODate",(e,t)=>{Yi.init(e,t),M.init(e,t)}),Nt=m("ZodISOTime",(e,t)=>{Gi.init(e,t),M.init(e,t)}),Dt=m("ZodISODuration",(e,t)=>{Vi.init(e,t),M.init(e,t)}),gd=m("ZodEmail",(e,t)=>{Ni.init(e,t),M.init(e,t)});var yd=m("ZodGUID",(e,t)=>{Oi.init(e,t),M.init(e,t)});var Tn=m("ZodUUID",(e,t)=>{Ii.init(e,t),M.init(e,t)});var Pl=m("ZodURL",(e,t)=>{Zi.init(e,t),M.init(e,t)});function xl(e){return Mr(Pl,e)}var wd=m("ZodEmoji",(e,t)=>{Ui.init(e,t),M.init(e,t)});var _d=m("ZodNanoID",(e,t)=>{Li.init(e,t),M.init(e,t)});var $d=m("ZodCUID",(e,t)=>{Fi.init(e,t),M.init(e,t)});var bd=m("ZodCUID2",(e,t)=>{Bi.init(e,t),M.init(e,t)});var vd=m("ZodULID",(e,t)=>{ji.init(e,t),M.init(e,t)});var Pd=m("ZodXID",(e,t)=>{Mi.init(e,t),M.init(e,t)});var xd=m("ZodKSUID",(e,t)=>{Hi.init(e,t),M.init(e,t)});var Sd=m("ZodIPv4",(e,t)=>{Ji.init(e,t),M.init(e,t)});var kd=m("ZodIPv6",(e,t)=>{Xi.init(e,t),M.init(e,t)});var Ed=m("ZodCIDRv4",(e,t)=>{Qi.init(e,t),M.init(e,t)});var zd=m("ZodCIDRv6",(e,t)=>{ea.init(e,t),M.init(e,t)});var Td=m("ZodBase64",(e,t)=>{na.init(e,t),M.init(e,t)});var Rd=m("ZodBase64URL",(e,t)=>{ra.init(e,t),M.init(e,t)});var Ad=m("ZodE164",(e,t)=>{oa.init(e,t),M.init(e,t)});var Cd=m("ZodJWT",(e,t)=>{sa.init(e,t),M.init(e,t)});var Cn=m("ZodNumber",(e,t)=>{Ur.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Nc(e,n,r,o),e.isFinite=!0},rn({minValue:(e)=>{let{minimum:t,exclusiveMinimum:n}=V(e);return Math.max(t??Number.NEGATIVE_INFINITY,n??Number.NEGATIVE_INFINITY)},maxValue:(e)=>{let{maximum:t,exclusiveMaximum:n}=V(e);return Math.min(t??Number.POSITIVE_INFINITY,n??Number.POSITIVE_INFINITY)},isInt:(e)=>{let{isInt:t,multipleOf:n}=V(e);return!!t||!!n?.some(Number.isSafeInteger)},format:(e)=>V(e).format??null},{gt(e,t){return this.check(it(e,t))},gte(e,t){return this.check(Ze(e,t))},min(e,t){return this.check(Ze(e,t))},lt(e,t){return this.check(st(e,t))},lte(e,t){return this.check(We(e,t))},max(e,t){return this.check(We(e,t))},int(e){return this.check(yl(e))},safe(e){return this.check(yl(e))},positive(e){return this.check(it(0,e))},nonnegative(e){return this.check(Ze(0,e))},negative(e){return this.check(st(0,e))},nonpositive(e){return this.check(We(0,e))},multipleOf(e,t){return this.check(Rt(e,t))},step(e,t){return this.check(Rt(e,t))},finite(){return this}}));function U(e){return ac(Cn,e)}var Od=m("ZodNumberFormat",(e,t)=>{ia.init(e,t),Cn.init(e,t)});function yl(e){return lc(Od,e)}var fo=m("ZodBoolean",(e,t)=>{aa.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Dc(e,n,r,o)});function Ue(e){return uc(fo,e)}var Sl=m("ZodBigInt",(e,t)=>{ca.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Wc(e,n,r,o)},rn({minValue:(e)=>V(e).minimum??null,maxValue:(e)=>V(e).maximum??null,format:(e)=>V(e).format??null},{gte(e,t){return this.check(Ze(e,t))},min(e,t){return this.check(Ze(e,t))},gt(e,t){return this.check(it(e,t))},lt(e,t){return this.check(st(e,t))},lte(e,t){return this.check(We(e,t))},max(e,t){return this.check(We(e,t))},positive(e){return this.check(it(BigInt(0),e))},negative(e){return this.check(st(BigInt(0),e))},nonpositive(e){return this.check(We(BigInt(0),e))},nonnegative(e){return this.check(Ze(BigInt(0),e))},multipleOf(e,t){return this.check(Rt(e,t))}}));var Id=m("ZodUnknown",(e,t)=>{la.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Uc(e,n,r,o)});function Rn(){return fc(Id)}var Nd=m("ZodNever",(e,t)=>{ua.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Zc(e,n,r,o)});function Dd(e){return hc(Nd,e)}var kl=m("ZodDate",(e,t)=>{pa.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Lc(e,n,r,o),e.min=(n,r)=>e.check(Ze(n,r)),e.max=(n,r)=>e.check(We(n,r))},rn({minDate:(e)=>{let{minimum:t}=V(e);return t?new Date(t):null},maxDate:(e)=>{let{maximum:t}=V(e);return t?new Date(t):null}},{}));var Wd=m("ZodArray",(e,t)=>{An(),da.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Hc(e,n,r,o),e.element=t.element},{min(e,t){return this.check(at(e,t))},nonempty(e){return this.check(at(1,e))},max(e,t){return this.check(Sn(e,t))},length(e,t){return this.check(kn(e,t))},unwrap(){return this.element}});function de(e,t){return gc(Wd,e,t)}var Zd=m("ZodObject",(e,t)=>{An(),ma.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>qc(e,n,r,o),bp(e,"shape",(n)=>n._zod.def.shape,!1)},{keyof(){return Wt(Object.keys(this._zod.def.shape))},catchall(e){return this.clone(le(this._zod.def,{catchall:e}))},passthrough(){return this.clone(le(this._zod.def,{catchall:Rn()}))},loose(){return this.clone(le(this._zod.def,{catchall:Rn()}))},strict(){return this.clone(le(this._zod.def,{catchall:Dd()}))},strip(){return this.clone(le(this._zod.def,{catchall:void 0}))},extend(e){return fp(this,e)},safeExtend(e){return hp(this,e)},merge(e){return mp(this,e)},pick(e){return pp(this,e)},omit(e){return dp(this,e)},partial(...e){return fs(El,this,e[0])},exactPartial(...e){return fs(zl,this,e[0],"exactPartial")},required(...e){return gp(Tl,this,e[0])}});function S(e,t){let n={type:"object",shape:e??{},...P(t)};return new Zd(n)}var Ud=m("ZodUnion",(e,t)=>{ga.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Yc(e,n,r,o),e.options=t.options});function On(e,t){return new Ud({type:"union",options:e,...P(t)})}var Ld=m("ZodIntersection",(e,t)=>{ya.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Gc(e,n,r,o)});function Fd(e,t){return new Ld({type:"intersection",left:e,right:t})}var wl=m("ZodRecord",(e,t)=>{An(),wa.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Vc(e,n,r,o),e.keyType=t.keyType,e.valueType=t.valueType});function ho(e,t,n){if(!t||!t._zod)return new wl({type:"record",keyType:w(),valueType:e,...P(t)});return new wl({type:"record",keyType:e,valueType:t,...P(n)})}var uo=m("ZodEnum",(e,t)=>{_a.init(e,t),B.init(e,t),e._zod.processJSONSchema=(r,o,s)=>Fc(e,r,o,s),e.enum=t.entries,e.options=[...e._zod.values];let n=new Set(Object.keys(t.entries));e.extract=(r,o)=>{let s={};for(let i of r)if(n.has(i))s[i]=t.entries[i];else throw Error(`Key ${i} not found in enum`);return new uo({...t,checks:[],...P(o),entries:s})},e.exclude=(r,o)=>{let s={...t.entries};for(let i of r)if(n.has(i))delete s[i];else throw Error(`Key ${i} not found in enum`);return new uo({...t,checks:[],...P(o),entries:s})}});function Wt(e,t){let n=Array.isArray(e)?Object.fromEntries(e.map((r)=>[r,r])):e;return new uo({type:"enum",entries:n,...P(t)})}var Bd=m("ZodLiteral",(e,t)=>{$a.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Bc(e,n,r,o),e.values=new Set(t.values),Object.defineProperty(e,"value",{get(){if(t.values.length>1)throw Error("This schema contains multiple valid literal values. Use `.values` instead.");return t.values[0]}})});function In(e,t){return new Bd({type:"literal",values:Array.isArray(e)?e:[e],...P(t)})}var jd=m("ZodTransform",(e,t)=>{An(),ba.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Mc(e,n,r,o),e._zod.parse=(n,r)=>{if(r.direction==="backward")throw new xt(e.constructor.name);n.addIssue=(s)=>{if(typeof s==="string")n.issues.push(Ke(s,n.value,t));else{let i=s;if(i.fatal)i.continue=!1;if(i.code??(i.code="custom"),!("input"in i))i.input=n.value;i.inst??(i.inst=e),n.issues.push(Ke(i))}};let o=t.transform(n.value,n);if(o instanceof Promise)return o.then((s)=>(n.value=s,n));return n.value=o,n}});function Md(e){return new jd({type:"transform",transform:e})}var El=m("ZodOptional",(e,t)=>{Lr.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>lo(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function _l(e){return new El({type:"optional",innerType:e})}var zl=m("ZodExactOptional",(e,t)=>{va.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>lo(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function Hd(e){return new zl({type:"optional",innerType:e})}var qd=m("ZodNullable",(e,t)=>{Pa.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Jc(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function $l(e){return new qd({type:"nullable",innerType:e})}var Yd=m("ZodDefault",(e,t)=>{xa.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Qc(e,n,r,o),e.unwrap=()=>e._zod.def.innerType,e.removeDefault=e.unwrap});function Gd(e,t){return new Yd({type:"default",innerType:e,get defaultValue(){return typeof t==="function"?t():$r(t)}})}var Vd=m("ZodPrefault",(e,t)=>{Sa.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>el(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function Jd(e,t){return new Vd({type:"prefault",innerType:e,get defaultValue(){return typeof t==="function"?t():$r(t)}})}var Tl=m("ZodNonOptional",(e,t)=>{ka.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>Kc(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function Kd(e,t){return new Tl({type:"nonoptional",innerType:e,...P(t)})}var Xd=m("ZodCatch",(e,t)=>{Ea.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>tl(e,n,r,o),e.unwrap=()=>e._zod.def.innerType,e.removeCatch=e.unwrap});function Qd(e,t){return new Xd({type:"catch",innerType:e,catchValue:typeof t==="function"?t:ys(t)})}var ef=m("ZodPipe",(e,t)=>{za.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>nl(e,n,r,o),e.in=t.in,e.out=t.out});function bl(e,t){return new ef({type:"pipe",in:e,out:t})}var tf=m("ZodReadonly",(e,t)=>{Ta.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>rl(e,n,r,o),e.unwrap=()=>e._zod.def.innerType});function nf(e){return new tf({type:"readonly",innerType:e})}var rf=m("ZodCustom",(e,t)=>{Ra.init(e,t),B.init(e,t),e._zod.processJSONSchema=(n,r,o)=>jc(e,n,r,o)});function of(e,t={}){return yc(rf,e,t)}function sf(e,t){return wc(e,t)}function cf(e){return bn(Ot,e)}function lf(e){return vn(It,e)}function uf(e){return Pn(Nt,e)}function pf(e){return xn(Dt,e)}function df(e){return Ua(po,e)}function ff(e){return cc(Cn,e)}function hf(e){return pc(fo,e)}function mf(e){return dc(Sl,e)}function gf(e){return mc(kl,e)}var yf=S({name:w(),createSql:w(),approxRows:U().int().nonnegative(),dataBytes:U().int().nonnegative(),primaryKey:de(w()).nullable()}),Dn=S({charset:w(),tables:de(yf)}),fw=S({table:w(),cursor:w().optional()}),Rl=S({sql:w(),rows:U().int().nonnegative(),next:w().nullable()});var mo=S({code:w(),message:w(),data:S({status:U().int()}).loose().nullable().optional()});var Al=S({path:w(),size:U().int().nonnegative(),mtime:U().int()}),ww=S({cursor:w().optional()}),Cl=S({entries:de(Al),next:w().nullable()}),_w=S({paths:de(w()).min(1)}),Ol=On([Al.extend({missing:In(!1).optional()}),S({path:w(),missing:In(!0)})]),$w=S({path:w(),offset:Zt.number().int().nonnegative(),length:Zt.number().int().positive()}),Il="X-Wpsync-File-Size";var Wn=U().int().nonnegative(),wf=Wt(["mariadb","mysql","unknown"]),_f=S({file:w(),name:w(),version:w(),active:Ue()}),$f=S({file:w(),name:w(),version:w()}),bf=S({file:w(),name:w()}),Re=S({bridge:S({version:w(),protocolVersion:U().int(),deadline:Nn.datetime({offset:!0})}),site:S({siteUrl:xl(),homeUrl:xl(),name:w(),multisite:Ue(),locale:w(),timezone:w(),environment:w()}),wordpress:S({version:w()}),php:S({version:w(),sapi:w(),extensions:de(w()),memoryLimit:Wn.nullable(),maxExecutionTime:U().int().nonnegative(),uploadMaxFilesize:Wn.nullable(),postMaxSize:Wn.nullable()}),server:S({software:w().nullable(),time:Nn.datetime({offset:!0})}),database:S({engine:wf,version:w(),serverInfo:w(),charset:w(),collate:w(),tablePrefix:w()}),theme:S({stylesheet:w(),template:w(),name:w(),version:w()}),plugins:de(_f),muPlugins:de($f),dropins:de(bf),paths:S({abspath:w(),contentDir:w(),pluginsDir:w(),uploadsDir:w()}),capabilities:S({fileModsAllowed:Ue(),filesystemMethod:w(),writable:S({abspath:Ue(),contentDir:Ue(),uploadsDir:Ue()}),diskFreeBytes:Wn.nullable()})});function vf(e,t){if(!e.includes("*"))return e===t;return new RegExp(`^${e.split("*").map(Pf).join(".*")}$`).test(t)}function Pf(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function Qe(e,t=Qo){let n=e.split("/");return t.some((r)=>{let o=r.split("/");if(o.length>n.length)return!1;return o.every((s,i)=>vf(s,n[i]))})}function Nl(e){if(e===""||e.startsWith("/")||e.includes("\\")||e.includes("\x00"))return!1;return e.split("/").every((t)=>t!==""&&t!=="."&&t!=="..")}var Ew=S({since:w()}),Dl=S({since:w(),posts:ho(w(),U().int().nonnegative()),comments:U().int().nonnegative(),users:U().int().nonnegative()}),zw=S({dbBytes:U().int().nonnegative(),filesBytes:U().int().nonnegative(),includeHtaccess:Ue()}),Wl=S({stageId:w(),newPrefix:w(),chunkBytes:U().int().positive()}),xf=Wt(["db","files"]),Tw=S({stage:w(),part:xf,seq:Zt.number().int().nonnegative(),sha256:w().regex(/^[0-9a-f]{64}$/)}),Zl=S({received:U().int().nonnegative()}),Rw=On([S({path:w(),size:U().int().nonnegative(),mtime:U().int(),delete:In(!1).optional()}),S({path:w(),delete:In(!0)})]),Aw=S({stage:w(),chunks:S({db:U().int().nonnegative(),files:U().int().nonnegative()})}),Sf=Wt(["assemble","import","carry","maintenance","files","swap","cleanup","applied","rollback-maintenance","rollback-files","rollback-swap","rolled-back","finalize","finalized","failed"]),Ul=S({stageId:w(),step:Sf,done:Ue(),progress:S({done:U(),total:U()}).nullable(),skipped:de(w()),error:w().nullable()}),Cw=S({stage:w()}),Ow=S({version:w(),files:ho(w(),w())}),Ll=S({version:w()});import{mkdirSync as gh,writeFileSync as yh}from"fs";import{homedir as wh,hostname as _h}from"os";import{join as vu}from"path";class y extends Error{code;hint;constructor(e,t,n){super(t);this.code=e;this.hint=n;this.name="WpsyncError"}}class go{cookies=new Map;set(e,t){this.cookies.set(e,t)}has(e){return[...this.cookies.keys()].some((t)=>t.startsWith(e))}absorb(e){for(let t of e.getSetCookie()){let[n="",...r]=t.split(";"),o=n.indexOf("=");if(o<=0)continue;let s=n.slice(0,o).trim(),i=n.slice(o+1).trim();if(kf(r)||i===""||i==="deleted")this.cookies.delete(s);else this.cookies.set(s,i)}}header(){if(this.cookies.size===0)return;return[...this.cookies].map(([e,t])=>`${e}=${t}`).join("; ")}}function kf(e){for(let t of e){let[n="",r=""]=t.trim().split("=",2);if(n.toLowerCase()==="max-age"&&Number(r)<=0)return!0;if(n.toLowerCase()==="expires"){let o=Date.parse(r);if(!Number.isNaN(o)&&o<Date.now())return!0}}return!1}var Ef="wpsync/0.1 (+https://github.com/AlexMaghen/wp-dev-automation)",zf=5;async function j(e,t={}){let n=t.method??"GET",r=t.follow??n==="GET",o=e;for(let s=0;;s++){let i={"User-Agent":Ef,...t.headers},a=t.jar?.header();if(a)i.Cookie=a;let c;try{c=await fetch(o,{method:s===0?n:"GET",headers:i,body:s===0?t.body:void 0,redirect:"manual"})}catch(p){let d=p instanceof Error&&p.cause instanceof Error?p.cause.message:String(p);throw new y("unreachable",`Couldn't reach ${new URL(o).origin}: ${d}`)}t.jar?.absorb(c.headers);let l=c.headers.get("location");if(r&&l&&c.status>=300&&c.status<400&&s<zf){await c.arrayBuffer(),o=new URL(l,o).toString();continue}let u=Buffer.from(await c.arrayBuffer());return{status:c.status,url:o,headers:c.headers,bytes:u,text:u.toString("utf8")}}}function fe(e){try{return JSON.parse(e)}catch{return}}class Zn{site;jar;constructor(e,t){this.site=e;this.jar=t}static async login(e,t,n){let r=new go;r.set("wordpress_test_cookie","WP%20Cookie%20check");let o=`${e.siteUrl}/wp-login.php`,s=await j(o,{jar:r});if(s.status===404||!/name=["']log["']/.test(s.text))throw new y("login_page_missing",`The site's login page isn't at ${o}.`,"A security plugin may have moved it. Create an Application Password yourself (Users \u2192 Profile) and use that instead.");let i=await j(o,{method:"POST",jar:r,headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({log:t,pwd:n,"wp-submit":"Log In",redirect_to:`${e.siteUrl}/wp-admin/`,testcookie:"1"}).toString()});if(r.has("wordpress_logged_in_"))return new Zn(e,r);let a=/<div[^>]+id=["']login_error["'][^>]*>([\s\S]*?)<\/div>/i.exec(i.text);if(a?.[1])throw new y("login_failed",`WordPress refused the login: ${Tf(a[1])}`);throw new y("login_blocked","The login didn't complete. The site probably asks for a second step, such as two-factor or a CAPTCHA.","Create an Application Password yourself (Users \u2192 Profile \u2192 Application Passwords) and use that instead.")}async restNonce(){let e=await j(`${this.site.siteUrl}/wp-admin/admin-ajax.php?action=rest-nonce`,{jar:this.jar}),t=e.text.trim();if(e.status!==200||!/^[a-f0-9]{6,}$/i.test(t))throw new y("nonce_failed","WordPress didn't hand out a REST nonce for the login session.");return t}async rest(e,t,n){let r={Accept:"application/json","X-WP-Nonce":await this.restNonce()};if(n!==void 0)r["Content-Type"]="application/json";let o=await j(this.site.restUrl(t),{method:e,jar:this.jar,headers:r,body:n===void 0?void 0:JSON.stringify(n)});return{status:o.status,body:fe(o.text)??o.text}}async createApplicationPassword(e){let t=await this.rest("POST","/wp/v2/users/me/application-passwords",{name:e}),n=S({uuid:w(),password:w()}).safeParse(t.body);if(t.status!==201||!n.success){let r=t.body?.code;throw new y("application_password_failed",`WordPress wouldn't create an Application Password (HTTP ${t.status}${r?`, ${r}`:""}).`,r==="application_passwords_disabled"?"A plugin or setting has turned Application Passwords off. Turn them back on and connect again.":void 0)}return n.data}async deleteApplicationPassword(e){let t=await this.rest("DELETE",`/wp/v2/users/me/application-passwords/${e}`);if(t.status!==200&&t.status!==404)throw new y("application_password_delete_failed",`Couldn't revoke an old wpsync key (HTTP ${t.status}).`)}async uploadPlugin(e,t){let n=await j(`${this.site.siteUrl}/wp-admin/plugin-install.php?tab=upload`,{jar:this.jar}),r=n.text.slice(Math.max(0,n.text.indexOf("plugin-upload-form"))),o=/name=["']_wpnonce["']\s+value=["']([^"']+)["']/.exec(r)?.[1];if(n.status!==200||!o)throw new y("plugin_upload_unavailable","This site doesn't allow uploading plugins from wp-admin.","The host has probably turned plugin installs off (DISALLOW_FILE_MODS). wpsync needs them for its bridge.");let s=new FormData;s.set("_wpnonce",o),s.set("_wp_http_referer",new URL(`${this.site.siteUrl}/wp-admin/plugin-install.php?tab=upload`).pathname+"?tab=upload"),s.set("pluginzip",new Blob([new Uint8Array(e)],{type:"application/zip"}),t),s.set("install-plugin-submit","Install Now");let i=await j(`${this.site.siteUrl}/wp-admin/update.php?action=upload-plugin`,{method:"POST",jar:this.jar,body:s});if(/request-filesystem-credentials-form/.test(i.text))throw new y("filesystem_credentials","WordPress asked for FTP details to install the bridge: it can't write plugin files itself on this host.")}async logout(){try{let e=await j(`${this.site.siteUrl}/wp-admin/`,{jar:this.jar}),t=/wp-login\.php\?action=logout(?:&#038;|&amp;|&)_wpnonce=([a-f0-9]+)/i.exec(e.text);if(t?.[1])await j(`${this.site.siteUrl}/wp-login.php?action=logout&_wpnonce=${t[1]}`,{jar:this.jar})}catch{}}}function Tf(e){return e.replace(/<[^>]+>/g," ").replace(/&nbsp;|&#160;/g," ").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&#0?39;|&apos;/g,"'").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\s+/g," ").replace(/\s*Lost your password\?\s*$/i,"").trim()}import{createRequire as Rf}from"module";var Af=Rf("/"),pt,Cf,Of;try{pt=Af("worker_threads"),Cf=pt.Worker,Of=pt.isMarkedAsUntransferable}catch(e){}var X=Uint8Array,he=Uint16Array,vo=Int32Array,Po=new X([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),xo=new X([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),Fl=new X([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Yl=function(e,t){var n=new he(31);for(var r=0;r<31;++r)n[r]=t+=1<<e[r-1];var o=new vo(n[30]);for(var r=1;r<30;++r)for(var s=n[r];s<n[r+1];++s)o[s]=s-n[r]<<5|r;return{b:n,r:o}},pt=Yl(Po,2),If=pt.b,wo=pt.r;If[28]=258,wo[258]=28;var Gl=Yl(xo,0),{b:Kw,r:Bl}=Gl,_o=new he(32768);for(C=0;C<32768;++C)Ae=(C&43690)>>1|(C&21845)<<1,Ae=(Ae&52428)>>2|(Ae&13107)<<2,Ae=(Ae&61680)>>4|(Ae&3855)<<4,_o[C]=((Ae&65280)>>8|(Ae&255)<<8)>>1;var Ae,C,Ft=function(e,t,n){var r=e.length,o=0,s=new he(t);for(;o<r;++o)if(e[o])++s[e[o]-1];var i=new he(t);for(o=1;o<t;++o)i[o]=i[o-1]+s[o-1]<<1;var a;if(n){a=new he(1<<t);var c=15-t;for(o=0;o<r;++o)if(e[o]){var l=o<<4|e[o],u=t-e[o],p=i[e[o]-1]++<<u;for(var d=p|(1<<u)-1;p<=d;++p)a[_o[p]>>c]=l}}else{a=new he(r);for(o=0;o<r;++o)if(e[o])a[o]=_o[i[e[o]-1]++]>>15-e[o]}return a},et=new X(288);for(C=0;C<144;++C)et[C]=8;var C;for(C=144;C<256;++C)et[C]=9;var C;for(C=256;C<280;++C)et[C]=7;var C;for(C=280;C<288;++C)et[C]=8;var C,Un=new X(32);for(C=0;C<32;++C)Un[C]=5;var C,Nf=Ft(et,9,0);var Df=Ft(Un,5,0);var Vl=function(e){return(e+7)/8|0},Jl=function(e,t,n){if(t==null||t<0)t=0;if(n==null||n>e.length)n=e.length;return new X(e.subarray(t,n))};var Wf=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Fn=function(e,t,n){var r=Error(t||Wf[e]);if(r.code=e,Error.captureStackTrace)Error.captureStackTrace(r,Fn);if(!n)throw r;return r};var Le=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8},Ut=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8,e[r+2]|=n>>16},yo=function(e,t){var n=[];for(var r=0;r<e.length;++r)if(e[r])n.push({s:r,f:e[r]});var o=n.length,s=n.slice();if(!o)return{t:Xl,l:0};if(o==1){var i=new X(n[0].s+1);return i[n[0].s]=1,{t:i,l:1}}n.sort(function(T,x){return T.f-x.f}),n.push({s:-1,f:25001});var a=n[0],c=n[1],l=0,u=1,p=2;n[0]={s:-1,f:a.f+c.f,l:a,r:c};while(u!=o-1)a=n[n[l].f<n[p].f?l++:p++],c=n[l!=u&&n[l].f<n[p].f?l++:p++],n[u++]={s:-1,f:a.f+c.f,l:a,r:c};var d=s[0].s;for(var r=1;r<o;++r)if(s[r].s>d)d=s[r].s;var h=new he(d+1),f=$o(n[u-1],h,0);if(f>t){var r=0,g=0,_=f-t,b=1<<_;s.sort(function(x,z){return h[z.s]-h[x.s]||x.f-z.f});for(;r<o;++r){var R=s[r].s;if(h[R]>t)g+=b-(1<<f-h[R]),h[R]=t;else break}g>>=_;while(g>0){var A=s[r].s;if(h[A]<t)g-=1<<t-h[A]++-1;else++r}for(;r>=0&&g;--r){var k=s[r].s;if(h[k]==t)--h[k],++g}f=t}return{t:new X(h),l:f}},$o=function(e,t,n){return e.s==-1?Math.max($o(e.l,t,n+1),$o(e.r,t,n+1)):t[e.s]=n},jl=function(e){var t=e.length;while(t&&!e[--t]);var n=new he(++t),r=0,o=e[0],s=1,i=function(c){n[r++]=c};for(var a=1;a<=t;++a)if(e[a]==o&&a!=t)++s;else{if(!o&&s>2){for(;s>138;s-=138)i(32754);if(s>2)i(s>10?s-11<<5|28690:s-3<<5|12305),s=0}else if(s>3){i(o),--s;for(;s>6;s-=6)i(8304);if(s>2)i(s-3<<5|8208),s=0}while(s--)i(o);s=1,o=e[a]}return{c:n.subarray(0,r),n:t}},Lt=function(e,t){var n=0;for(var r=0;r<t.length;++r)n+=e[r]*t[r];return n},Kl=function(e,t,n){var r=n.length,o=Vl(t+2);e[o]=r&255,e[o+1]=r>>8,e[o+2]=e[o]^255,e[o+3]=e[o+1]^255;for(var s=0;s<r;++s)e[o+s+4]=n[s];return(o+4+r)*8},Ml=function(e,t,n,r,o,s,i,a,c,l,u){Le(t,u++,n),++o[256];var p=yo(o,15),{t:d,l:h}=p,f=yo(s,15),{t:g,l:_}=f,b=jl(d),{c:R,n:A}=b,k=jl(g),{c:T,n:x}=k,z=new he(19);for(var E=0;E<R.length;++E)++z[R[E]&31];for(var E=0;E<T.length;++E)++z[T[E]&31];var v=yo(z,7),{t:N,l:O}=v,L=19;for(;L>4&&!N[Fl[L-1]];--L);var Q=l+5<<3,ie=Lt(o,et)+Lt(s,Un)+i,ae=Lt(o,d)+Lt(s,g)+i+14+3*L+Lt(z,N)+2*z[16]+3*z[17]+7*z[18];if(c>=0&&Q<=ie&&Q<=ae)return Kl(t,u,e.subarray(c,c+l));var ee,q,ne,ce;if(Le(t,u,1+(ae<ie)),u+=2,ae<ie){ee=Ft(d,h,0),q=d,ne=Ft(g,_,0),ce=g;var ur=Ft(N,O,0);Le(t,u,A-257),Le(t,u+5,x-1),Le(t,u+10,L-4),u+=14;for(var E=0;E<L;++E)Le(t,u+3*E,N[Fl[E]]);u+=3*L;var Pe=[R,T];for(var _t=0;_t<2;++_t){var rt=Pe[_t];for(var E=0;E<rt.length;++E){var xe=rt[E]&31;if(Le(t,u,ur[xe]),u+=N[xe],xe>15)Le(t,u,rt[E]>>5&127),u+=rt[E]>>12}}}else ee=Nf,q=et,ne=Df,ce=Un;for(var E=0;E<a;++E){var K=r[E];if(K>255){var xe=K>>18&31;if(Ut(t,u,ee[xe+257]),u+=q[xe+257],xe>7)Le(t,u,K>>23&31),u+=Po[xe];var ot=K&31;if(Ut(t,u,ne[ot]),u+=ce[ot],ot>3)Ut(t,u,K>>5&8191),u+=xo[ot]}else Ut(t,u,ee[K]),u+=q[K]}return Ut(t,u,ee[256]),u+q[256]},Zf=new vo([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Xl=new X(0),Uf=function(e,t,n,r,o,s){var i=s.z||e.length,a=new X(r+i+5*(1+Math.ceil(i/7000))+o),c=a.subarray(r,a.length-o),l=s.l,u=(s.r||0)&7;if(t){if(u)c[0]=s.r>>3;var p=Zf[t-1],d=p>>13,h=p&8191,f=(1<<n)-1,g=s.p||new he(32768),_=s.h||new he(f+1),b=Math.ceil(n/3),R=2*b,A=function(fr){return(e[fr]^e[fr+1]<<b^e[fr+2]<<R)&f},k=new vo(25000),T=new he(288),x=new he(32),z=0,E=0,v=s.i||0,N=0,O=s.w||0,L=0;for(;v+2<i;++v){var Q=A(v),ie=v&32767,ae=_[Q];if(g[ie]=ae,_[Q]=ie,O<=v){var ee=i-v;if((z>7000||N>24576)&&(ee>423||!l)){u=Ml(e,c,0,k,T,x,E,N,L,v-L,u),N=z=E=0,L=v;for(var q=0;q<286;++q)T[q]=0;for(var q=0;q<30;++q)x[q]=0}var ne=2,ce=0,ur=h,Pe=ie-ae&32767;if(ee>2&&Q==A(v-Pe)){var _t=Math.min(d,ee)-1,rt=Math.min(32767,v),xe=Math.min(258,ee);while(Pe<=rt&&--ur&&ie!=ae){if(e[v+ne]==e[v+ne-Pe]){var K=0;for(;K<xe&&e[v+K]==e[v+K-Pe];++K);if(K>ne){if(ne=K,ce=Pe,K>_t)break;var ot=Math.min(Pe,K-2),Yo=0;for(var q=0;q<ot;++q){var pr=v-Pe+q&32767,ip=g[pr],Go=pr-ip&32767;if(Go>Yo)Yo=Go,ae=pr}}}ie=ae,ae=g[ie],Pe+=ie-ae&32767}}if(ce){k[N++]=268435456|wo[ne]<<18|Bl[ce];var Vo=wo[ne]&31,Jo=Bl[ce]&31;E+=Po[Vo]+xo[Jo],++T[257+Vo],++x[Jo],O=v+ne,++z}else k[N++]=e[v],++T[e[v]]}}for(v=Math.max(v,O);v<i;++v)k[N++]=e[v],++T[e[v]];if(u=Ml(e,c,l,k,T,x,E,N,L,v-L,u),!l)s.r=u&7|c[u/8|0]<<3,u-=7,s.h=_,s.p=g,s.i=v,s.w=O}else{for(var v=s.w||0;v<i+l;v+=65535){var dr=v+65535;if(dr>=i)c[u/8|0]=l,dr=i;u=Kl(c,u+1,e.subarray(v,dr))}s.i=i}return Jl(a,0,r+Vl(u)+o)},Lf=function(){var e=new Int32Array(256);for(var t=0;t<256;++t){var n=t,r=9;while(--r)n=(n&1&&-306674912)^n>>>1;e[t]=n}return e}(),Ff=function(){var e=-1;return{p:function(t){var n=e;for(var r=0;r<t.length;++r)n=Lf[n&255^t[r]]^n>>>8;e=n},d:function(){return~e}}};var Bf=function(e,t,n,r,o){if(!o){if(o={l:1},t.dictionary){var s=t.dictionary.subarray(-32768),i=new X(s.length+e.length);i.set(s),i.set(e,s.length),e=i,o.w=s.length}}return Uf(e,t.level==null?6:t.level,t.mem==null?o.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,n,r,o)},Ql=function(e,t){var n={};for(var r in e)n[r]=e[r];for(var r in t)n[r]=t[r];return n};var J=function(e,t,n){for(;n;++t)e[t]=n,n>>>=8};function jf(e,t){return Bf(e,t||{},0,0)}var eu=function(e,t,n,r){for(var o in e){var s=e[o],i=t+o,a=r;if(Array.isArray(s))a=Ql(r,s[1]),s=s[0];if(ArrayBuffer.isView(s))n[i]=[s,a];else n[i+="/"]=[new X(0),a],eu(s,i,n,r)}},Hl=typeof TextEncoder<"u"&&new TextEncoder,Mf=typeof TextDecoder<"u"&&new TextDecoder,Hf=0;try{Mf.decode(Xl,{stream:!0}),Hf=1}catch(e){}function Ln(e,t){if(t){var n=new X(e.length);for(var r=0;r<e.length;++r)n[r]=e.charCodeAt(r);return n}if(Hl)return Hl.encode(e);var o=e.length,s=new X(e.length+(e.length>>1)),i=0,a=function(u){s[i++]=u};for(var r=0;r<o;++r){if(i+5>s.length){var c=new X(i+8+(o-r<<1));c.set(s),s=c}var l=e.charCodeAt(r);if(l<128||t)a(l);else if(l<2048)a(192|l>>6),a(128|l&63);else if(l>55295&&l<57344)l=65536+(l&1047552)|e.charCodeAt(++r)&1023,a(240|l>>18),a(128|l>>12&63),a(128|l>>6&63),a(128|l&63);else a(224|l>>12),a(128|l>>6&63),a(128|l&63)}return Jl(s,0,i)}var bo=function(e){var t=0;if(e)for(var n in e){var r=e[n].length;if(r>65535)Fn(9);t+=r+4}return t},ql=function(e,t,n,r,o,s,i,a){var c=r.length,l=n.extra,u=a&&a.length,p=bo(l);if(J(e,t,i!=null?33639248:67324752),t+=4,i!=null)e[t++]=20,e[t++]=n.os;e[t]=20,t+=2,e[t++]=n.flag<<1|(s<0&&8),e[t++]=o&&8,e[t++]=n.compression&255,e[t++]=n.compression>>8;var d=new Date(n.mtime==null?Date.now():n.mtime),h=d.getFullYear()-1980;if(h<0||h>119)Fn(10);if(J(e,t,h<<25|d.getMonth()+1<<21|d.getDate()<<16|d.getHours()<<11|d.getMinutes()<<5|d.getSeconds()>>1),t+=4,s!=-1)J(e,t,n.crc),J(e,t+4,s<0?-s-2:s),J(e,t+8,n.size);if(J(e,t+12,c),J(e,t+14,p),t+=16,i!=null)J(e,t,u),J(e,t+6,n.attrs),J(e,t+10,i),t+=14;if(e.set(r,t),t+=c,p)for(var f in l){var g=l[f],_=g.length;J(e,t,+f),J(e,t+2,_),e.set(g,t+4),t+=4+_}if(u)e.set(a,t),t+=u;return t},qf=function(e,t,n,r,o){J(e,t,101010256),J(e,t+8,n),J(e,t+10,n),J(e,t+12,r),J(e,t+16,o)};function tu(e,t){if(!t)t={};var n={},r=[];eu(e,"",n,t);var o=0,s=0;for(var i in n){var a=n[i],c=a[0],l=a[1],u=l.level==0?0:8,p=Ln(i),d=p.length,h=l.comment,f=h&&Ln(h),g=f&&f.length,_=bo(l.extra);if(d>65535)Fn(11);var b=u?jf(c,l):c,R=b.length,A=Ff();A.p(c),r.push(Ql(l,{size:c.length,crc:A.d(),c:b,f:p,m:f,u:d!=i.length||f&&h.length!=g,o,compression:u})),o+=30+d+_+R,s+=76+2*(d+_)+(g||0)+R}var k=new X(s+22),T=o,x=s-o;for(var z=0;z<r.length;++z){var p=r[z];ql(k,p.o,p,p.f,p.u,p.c.length);var E=30+p.f.length+bo(p.extra);k.set(p.c,p.o+E),ql(k,o,p,p.f,p.u,p.c.length,p.o,p.m),o+=16+E+(p.m?p.m.length:0)}return qf(k,o,r.length,x,T),k}var dt={"includes/class-wpsync-changes.php":`<?php
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
					. implode( ', ', self::key_literals( $pk, $columns, self::cursor_values( $cursor['after'] ) ) ) . ')';
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
					// Binary keys (Wordfence uses MD5 hashes) don't survive JSON as text: send hex.
					$after[] = ( ! empty( $columns[ $column ] ) && null !== $last[ $column ] ) ? array( 'x' => bin2hex( $last[ $column ] ) ) : $last[ $column ];
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

	/** SQL literals for a key's values, as hex for binary columns. */
	private static function key_literals( $pk, $columns, $values ) {
		$out = array();
		foreach ( $pk as $i => $column ) {
			$out[] = self::literal( isset( $values[ $i ] ) ? $values[ $i ] : null, ! empty( $columns[ $column ] ) );
		}
		return $out;
	}

	/** Cursor key values back to raw values ({"x": hex} \u2192 bytes). */
	private static function cursor_values( $after ) {
		return array_map(
			function ( $value ) {
				return is_array( $value ) && isset( $value['x'] ) ? (string) hex2bin( (string) $value['x'] ) : $value;
			},
			(array) $after
		);
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
						. implode( ', ', self::key_literals( $pk, $columns, $after ) ) . ')';
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
 * A stage lives in wp-content/uploads/wpsync-stage-<id>/ (never served, never pulled or pushed) with
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
		return self::base_dir() . '/wpsync-stage-' . $id;
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
`,"includes/class-wpsync-update.php":`<?php
/**
 * POST self-update: replaces the bridge's own folder with the files the CLI sends (a newer
 * version of this plugin). Shapes: SelfUpdateRequest in packages/protocol/src/push.ts.
 *
 * The new files are written to a sibling folder first, then the folders are swapped with two
 * renames, so a failure part-way leaves the working version in place. An administrator can
 * already upload any plugin, so this gives the CLI no more power than the login it holds.
 *
 * @package WpsyncBridge
 */

defined( 'ABSPATH' ) || exit;

class Wpsync_Update {

	public static function handle( WP_REST_Request $request ) {
		$body    = (array) $request->get_json_params();
		$version = isset( $body['version'] ) ? (string) $body['version'] : '';
		$files   = isset( $body['files'] ) && is_array( $body['files'] ) ? $body['files'] : array();
		if ( ! preg_match( '/^\\d+\\.\\d+\\.\\d+$/', $version ) || ! isset( $files['wpsync-bridge.php'] ) ) {
			return new WP_Error( WPSYNC_ERROR_BAD_REQUEST, 'A version and the plugin\\'s main file are required.', array( 'status' => 400 ) );
		}

		$current = untrailingslashit( plugin_dir_path( WPSYNC_BRIDGE_MAIN ) );
		$suffix  = strtolower( wp_generate_password( 8, false, false ) );
		$staging = $current . '.new-' . $suffix;
		$retired = $current . '.old-' . $suffix;

		foreach ( $files as $relative => $content ) {
			$relative = (string) $relative;
			$bytes    = base64_decode( (string) $content, true );
			if ( ! Wpsync_Paths::is_safe_relative( $relative ) || false === $bytes ) {
				self::remove( $staging );
				return new WP_Error( WPSYNC_ERROR_BAD_REQUEST, 'Bad file in the update: ' . $relative, array( 'status' => 400 ) );
			}
			$target = $staging . '/' . $relative;
			if ( ! wp_mkdir_p( dirname( $target ) ) || false === file_put_contents( $target, $bytes ) ) { // phpcs:ignore WordPress.WP.AlternativeFunctions
				self::remove( $staging );
				return new WP_Error( WPSYNC_ERROR_UNSUPPORTED, 'Could not write the update on the server.', array( 'status' => 500 ) );
			}
		}
		if ( false === strpos( (string) file_get_contents( $staging . '/wpsync-bridge.php' ), 'Version:           ' . $version ) ) { // phpcs:ignore WordPress.WP.AlternativeFunctions
			self::remove( $staging );
			return new WP_Error( WPSYNC_ERROR_BAD_REQUEST, 'The update\\'s version doesn\\'t match its plugin header.', array( 'status' => 400 ) );
		}

		if ( ! @rename( $current, $retired ) ) { // phpcs:ignore WordPress.PHP.NoSilencedErrors, WordPress.WP.AlternativeFunctions
			self::remove( $staging );
			return new WP_Error( WPSYNC_ERROR_UNSUPPORTED, 'Could not move the old bridge aside.', array( 'status' => 500 ) );
		}
		if ( ! @rename( $staging, $current ) ) { // phpcs:ignore WordPress.PHP.NoSilencedErrors, WordPress.WP.AlternativeFunctions
			@rename( $retired, $current ); // phpcs:ignore WordPress.PHP.NoSilencedErrors, WordPress.WP.AlternativeFunctions
			return new WP_Error( WPSYNC_ERROR_UNSUPPORTED, 'Could not put the new bridge in place.', array( 'status' => 500 ) );
		}
		self::remove( $retired );
		if ( function_exists( 'opcache_reset' ) ) {
			@opcache_reset(); // phpcs:ignore WordPress.PHP.NoSilencedErrors
		}
		return rest_ensure_response( array( 'version' => $version ) );
	}

	private static function remove( $dir ) {
		if ( ! is_dir( $dir ) ) {
			return;
		}
		$items = new RecursiveIteratorIterator( new RecursiveDirectoryIterator( $dir, FilesystemIterator::SKIP_DOTS ), RecursiveIteratorIterator::CHILD_FIRST );
		foreach ( $items as $item ) {
			$item->isDir() ? @rmdir( $item->getPathname() ) : @unlink( $item->getPathname() ); // phpcs:ignore WordPress.PHP.NoSilencedErrors, WordPress.WP.AlternativeFunctions
		}
		@rmdir( $dir ); // phpcs:ignore WordPress.PHP.NoSilencedErrors, WordPress.WP.AlternativeFunctions
	}
}
`,"includes/protocol.php":`<?php
/**
 * GENERATED from packages/protocol/src/constants.ts by \`pnpm generate\`. Do not edit.
 */

defined( 'ABSPATH' ) || exit;

const WPSYNC_PROTOCOL_VERSION = 1;
const WPSYNC_BRIDGE_VERSION = '0.1.2';
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
	'wp-content/uploads/wpsync-stage-*',
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
	'.gitignore',
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
const WPSYNC_ROUTE_SELF_UPDATE = '/self-update';

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
 * Version:           0.1.2
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
require_once __DIR__ . '/includes/class-wpsync-update.php';

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
		WPSYNC_ROUTE_SELF_UPDATE => array( 'POST', array( 'Wpsync_Update', 'handle' ), array() ),
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
`},nu={"export.php":`<?php
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
`},ru={"CLAUDE.md.tmpl":`<!--
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
      "Bash(wpsync new *)",
      "Bash(wpsync init *)",
      "Bash(wpsync connect *)",
      "Bash(wpsync pull *)",
      "Bash(wpsync status*)",
      "Bash(wpsync doctor *)",
      "Bash(wpsync verify*)",
      "Bash(wpsync update-rules*)",
      "Bash(wpsync push --dry-run*)",
      "Bash(*/bin/wpsync new *)",
      "Bash(*/bin/wpsync init *)",
      "Bash(*/bin/wpsync connect *)",
      "Bash(*/bin/wpsync pull *)",
      "Bash(*/bin/wpsync status*)",
      "Bash(*/bin/wpsync doctor *)",
      "Bash(*/bin/wpsync verify*)",
      "Bash(*/bin/wpsync update-rules*)",
      "Bash(*/bin/wpsync push --dry-run*)"
    ],
    "ask": [
      "Bash(wpsync push)",
      "Bash(wpsync push --dir *)",
      "Bash(wpsync push --include-htaccess*)",
      "Bash(wpsync rollback*)",
      "Bash(wpsync finalize*)",
      "Bash(wpsync disconnect *)",
      "Bash(*/bin/wpsync push)",
      "Bash(*/bin/wpsync push --dir *)",
      "Bash(*/bin/wpsync push --include-htaccess*)",
      "Bash(*/bin/wpsync rollback*)",
      "Bash(*/bin/wpsync finalize*)",
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
`},So={"1-wordpress-editing.md":`<!--
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
`};var ko=`${mr}.zip`,Yf=new Date("2026-01-01T00:00:00Z");function Eo(){let e={};for(let[t,n]of Object.entries(dt))e[`${mr}/${t}`]=[Ln(n),{mtime:Yf}];return tu(e,{level:9})}function Gf(e,t){let n=e.split(".").map((o)=>Number.parseInt(o,10)||0),r=t.split(".").map((o)=>Number.parseInt(o,10)||0);for(let o=0;o<Math.max(n.length,r.length);o++){let s=(n[o]??0)-(r[o]??0);if(s!==0)return Math.sign(s)}return 0}async function ft(e,t,n=()=>{}){if(Gf(t.bridge.version,Ge)>=0)return t;n(`Updating the site's wpsync bridge from ${t.bridge.version} to ${Ge}\u2026`);let r={};for(let[o,s]of Object.entries(dt))r[o]=Buffer.from(s).toString("base64");return await e.bridge(Ll,W.selfUpdate,{method:"POST",body:{version:Ge,files:r}}),e.bridge(Re,W.info)}import{spawnSync as lh}from"child_process";import{lookup as uh}from"dns/promises";import{existsSync as qn,statfsSync as ph}from"fs";import{homedir as _u}from"os";import{join as dh}from"path";var To=["5.6","7.0","7.1","7.2","7.3","7.4","8.0","8.1","8.2","8.3","8.4","8.5"],Ro=["5.5","10.0","10.1","10.2","10.3","10.4","10.5","10.6","10.7","10.8","10.11","11.4","11.8"],Ao=["5.5","5.6","5.7","8.0","8.4"];function zo(e){let[t="0",n="0"]=e.split(".");return[Number.parseInt(t,10)||0,Number.parseInt(n,10)||0]}function ou(e,t){let[n,r]=zo(e),[o,s]=zo(t);return n-o||r-s}function su(e,t){let[n,r]=zo(e),o=`${n}.${r}`,s=[...t].sort(ou);return s.find((i)=>ou(i,o)>=0)??s[s.length-1]}function iu(e){let t=new URL(e);return`${t.hostname}${t.pathname}`.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,63).replace(/-+$/,"")||"site"}function au(e,t){let n=(e.server.software??"").toLowerCase(),r=n.includes("apache")||n.includes("litespeed")?"apache-fpm":"nginx-fpm",o=e.database.engine==="mysql"?"mysql":"mariadb";return{name:t,phpVersion:su(e.php.version,To),webserver:r,database:{type:o,version:su(e.database.version,o==="mysql"?Ao:Ro)}}}function cu(e,t){return`# Local copy of ${t}, written by wpsync to match the live site's server.
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
`}import{lstatSync as Vf,mkdirSync as Jf,readdirSync as Kf,readFileSync as Xf,renameSync as Qf,rmSync as eh,utimesSync as th,writeFileSync as nh}from"fs";import{dirname as rh,join as Bn}from"path";var oh=["wp-config.php","wp-config-ddev.php"],sh=4;async function Ye(e,t=()=>{}){let n=[],r;do{let o=await e.bridge(Cl,W.filesList,{query:r?{cursor:r}:{}});for(let s of o.entries){if(!Nl(s.path))throw new y("bad_path",`The site listed an unsafe path: ${s.path}`);n.push(s)}if(t(n.length),o.next&&o.next===r)throw new y("paging_stuck","The bridge kept returning the same files, so wpsync stopped.");r=o.next}while(r);return n}function jn(e){let t=new Map,n=(r,o)=>{let s;try{s=Kf(r)}catch{return}for(let i of s){let a=o?`${o}/${i}`:i;if(Qe(a)||Qe(a,oh)||i.endsWith(".wpsync-tmp"))continue;let c=Bn(r,i),l=Vf(c);if(l.isSymbolicLink())continue;if(l.isDirectory())n(c,a);else if(l.isFile())t.set(a,{size:l.size,mtime:Math.floor(l.mtimeMs/1000)})}};return n(e,""),t}function Co(e,t){return!!t&&t.size===e.size&&Math.abs(t.mtime-e.mtime)<=1}function uu(e,t,n){let r={fetch:[],remove:[],unchanged:0},o=new Set;for(let s of e){if(o.add(s.path),n.has(s.path))continue;if(Co(s,t.get(s.path)))r.unchanged++;else r.fetch.push(s)}for(let s of t.keys())if(!o.has(s)&&!n.has(s))r.remove.push(s);return r}function ih(e){let t=[],n=0;while(n<e.length){let r=e.indexOf(10,n);if(r<0)throw new y("bad_stream","The site's file stream ended in the middle of a header.");let o=Ol.parse(JSON.parse(e.subarray(n,r).toString("utf8")));if(n=r+1,o.missing){t.push({header:o,content:null});continue}if(n+o.size>e.length)throw new y("bad_stream",`The site's file stream was cut off in ${o.path}.`);t.push({header:o,content:e.subarray(n,n+o.size)}),n+=o.size}return t}function pu(e){let t=[],n=[],r=[],o=0;for(let s of e){if(s.size>Yt){n.push(s);continue}if(r.length&&(o+s.size>Yt||r.length>=ts))t.push(r),r=[],o=0;r.push(s),o+=s.size}if(r.length)t.push(r);return{small:t,large:n}}async function du(e,t){let n=await e.bridgeRaw(W.filesFetch,{method:"POST",body:{paths:t}});return ih(n.bytes)}async function fu(e,t,n=()=>{}){let r=[],o=0,s=Number.POSITIVE_INFINITY;while(o<s){let i=await e.bridgeRaw(W.filesRead,{query:{path:t,offset:String(o),length:String(Yt)}}).catch((a)=>{if(a instanceof y&&/HTTP 404/.test(a.message))return null;throw a});if(!i)return null;if(s=Number(i.headers.get(Il)??"0"),i.bytes.length===0)break;r.push(i.bytes),o+=i.bytes.length,n()}return{content:Buffer.concat(r),size:o}}function lu(e,t,n,r){let o=Bn(e,t);Jf(rh(o),{recursive:!0});let s=`${o}.wpsync-tmp`;nh(s,n),Qf(s,o),th(o,r,r)}async function ah(e,t){let n=0,r=Array.from({length:Math.min(sh,e.length)},async()=>{while(n<e.length){let o=e[n++];await t(o)}});await Promise.all(r)}async function Mn(e,t,n,r=()=>{},o=()=>{}){let s={files:0,bytes:0,vanished:[]},{small:i,large:a}=pu(n),c=(l)=>{s.files++,s.bytes+=l,r(s.files,s.bytes)};await ah(i,async(l)=>{for(let{header:u,content:p}of await du(e,l.map((d)=>d.path))){if(u.missing||!p){s.vanished.push(u.path);continue}lu(t,u.path,p,u.mtime),c(p.length)}});for(let l of a){let u=await fu(e,l.path,o);if(!u){s.vanished.push(l.path);continue}lu(t,l.path,u.content,l.mtime),c(u.content.length)}return s}async function ch(e,t){let n=new Map,{small:r,large:o}=pu(t);for(let s of r)for(let{header:i,content:a}of await du(e,s.map((c)=>c.path)))n.set(i.path,a);for(let s of o)n.set(s.path,(await fu(e,s.path))?.content??null);return n}function hu(e,t){for(let n of t)eh(Bn(e,n),{force:!0})}async function mu(e,t,n,r){if(n.size===0)return[];let o=new Map(r.map((c)=>[c.path,c])),s=[],i=[];for(let c of n){let l=o.get(c);if(l)i.push(l);else s.push(`${c} (not on the live site)`)}let a=await ch(e,i);for(let c of i){let l=null;try{l=Xf(Bn(t,c.path))}catch{}let u=a.get(c.path);if(!l||!u||!l.equals(u))s.push(c.path)}return s.sort()}function D(e){return e.toLocaleString("en-US")}function Y(e){if(e<1024)return`${D(e)} bytes`;let t=["KB","MB","GB","TB"],n=e/1024,r=0;while(n>=1024&&r<t.length-1)n/=1024,r++;return`${n.toLocaleString("en-US",{maximumFractionDigits:1})} ${t[r]}`}var Ce=`/wp/v2/plugins/${Xo.replace(/\.php$/,"")}`,gu=4;class me{site;username;applicationPassword;constructor(e,t,n){this.site=e;this.username=t;this.applicationPassword=n}async send(e,t,n,r){let o={Accept:r,Authorization:`Basic ${Buffer.from(`${this.username}:${this.applicationPassword}`).toString("base64")}`},s;if(n.bytes)o["Content-Type"]="application/octet-stream",s=n.bytes;else if(n.body!==void 0)o["Content-Type"]="application/json",s=JSON.stringify(n.body);let i=this.site.restUrl(t,n.query);for(let a=1;;a++){try{let c=await j(i,{method:e,headers:o,body:s});if(c.status<500||c.status===501||a===gu)return c}catch(c){if(!(c instanceof y)||c.code!=="unreachable"||a===gu)throw c}await new Promise((c)=>setTimeout(c,500*2**a))}}async call(e,t,n={}){let r=await this.send(e,t,n,"application/json"),o=fe(r.text)??r.text,s=r.status>=400?mo.safeParse(o):void 0;return{status:r.status,body:o,errorCode:s?.success?s.data.code:void 0}}get(e,t){return this.call("GET",e,{query:t})}async bridge(e,t,n={}){let r=await this.call(n.method??"GET",`/${hr}${t}`,n),o=e.safeParse(r.body);if(r.status!==200||!o.success)throw yu(t,r.status,r.errorCode,typeof r.body==="string"?r.body:void 0);return o.data}async bridgeRaw(e,t={}){let n=await this.send(t.method??"GET",`/${hr}${e}`,t,"application/octet-stream");if(n.status!==200||!(n.headers.get("content-type")??"").includes("application/octet-stream")){let r=mo.safeParse(fe(n.text));throw yu(e,n.status,r.success?r.data.code:void 0,n.text)}return n}async setBridgeActive(e){let t=await this.call("PUT",Ce,{body:{status:e?"active":"inactive"}});if(t.status!==200)throw new y(e?"bridge_activation_failed":"bridge_deactivation_failed",`WordPress wouldn't ${e?"activate":"deactivate"} the wpsync bridge (HTTP ${t.status}${t.errorCode?`, ${t.errorCode}`:""}).`)}async withBridge(e){await this.setBridgeActive(!0);let t=(n)=>{console.error(`
Stopping (${n}): switching the wpsync bridge off first\u2026`),this.setBridgeActive(!1).catch(()=>{}).finally(()=>process.exit(n==="SIGINT"?130:143))};process.once("SIGINT",t),process.once("SIGTERM",t),process.once("SIGHUP",t);try{return await e()}finally{process.off("SIGINT",t),process.off("SIGTERM",t),process.off("SIGHUP",t),await this.setBridgeActive(!1).catch(()=>{})}}}function yu(e,t,n,r){let o=!n&&r?r.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim().slice(0,200):"";return new y("bridge_error",`The bridge failed on ${e} (HTTP ${t}${n?`, ${n}`:""})${o?`: ${o}`:"."}`)}var wu=S({name:w(),url:w(),home:w(),namespaces:de(w()),authentication:On([ho(w(),Rn()),de(Rn())]).optional()});function Oe(e,t=!1){let n=/^[a-z]+:\/\//i.test(e)?e:`https://${e}`,r;try{r=new URL(n)}catch{throw new y("bad_url",`"${e}" isn't a web address.`)}if(r.protocol==="http:"&&!t)throw new y("http_refused",`${r.origin} uses plain HTTP, which would send the site's keys unencrypted.`,"Use the site's https:// address.");if(r.protocol!=="https:"&&r.protocol!=="http:")throw new y("bad_url",`"${e}" isn't a web address.`);return`${r.origin}${r.pathname}`.replace(/\/+$/,"")}function Bt(e){return e.replace(/\/+$/,"")}async function ge(e,t={}){let n=Oe(e,t.allowHttp),r=await j(`${n}/wp-json/`,{headers:{Accept:"application/json"}}),o=wu.safeParse(fe(r.text)),s;if(o.success){let l=Bt(r.url.replace(/\/wp-json\/?$/,""));s=(u,p={})=>{let d=new URL(`${l}/wp-json${u}`);for(let[h,f]of Object.entries(p))d.searchParams.set(h,f);return d.toString()}}else{let l=await j(`${n}/?rest_route=/`,{headers:{Accept:"application/json"}});if(o=wu.safeParse(fe(l.text)),!o.success)throw new y("not_wordpress",`${n} didn't answer like a WordPress site (no REST API at /wp-json/ or /?rest_route=/).`,"Check the address. If it is WordPress, a security plugin may be blocking the REST API.");let u=Bt(new URL(l.url).origin+new URL(l.url).pathname);s=(p,d={})=>{let h=new URL(`${u}/`);h.searchParams.set("rest_route",p);for(let[f,g]of Object.entries(d))h.searchParams.set(f,g);return h.toString()}}let i=o.data;if(!i.namespaces.includes("wp/v2"))throw new y("rest_limited",`${n} has its WordPress REST API turned off.`);let a=i.authentication,c=!!a&&!Array.isArray(a)&&"application-passwords"in a;return{siteUrl:Bt(i.url),homeUrl:Bt(i.home),name:i.name,restUrl:s,applicationPasswords:c}}function ye(e){let t=new URL(e);return`${t.protocol}//${t.host.toLowerCase()}${Bt(t.pathname)}`}function jt(e,t){return[`1. Open ${fh(e)} (sign in to wp-admin if it asks).`,'2. The page jumps to "Disable WordPress application passwords", under Brute Force Protection.',`3. ${t?"Switch it back on (ticked)":"Switch it off (unticked)"}.`,"4. Click Save Changes at the top of the page."].join(`
`)}function fh(e){return`${e}/wp-admin/admin.php?page=WordfenceWAF&subpage=waf_options#wf-option-loginSec-disableApplicationPasswords-label`}async function Oo(e){let t=await j(`${e}/wp-content/plugins/wordfence/readme.txt`).catch(()=>null);return!!t&&t.status===200&&/Wordfence/i.test(t.text.slice(0,500))}function tt(e,t){let n=lh(e,t,{encoding:"utf8",stdio:["ignore","pipe","pipe"],timeout:30000});return{ok:n.status===0,out:`${n.stdout??""}${n.stderr??""}`.trim()}}var hh=["/opt/homebrew/bin","/usr/local/bin"];function $u(e,t={onPath:(n)=>{let r=tt("/usr/bin/which",[n]);return r.ok&&r.out?r.out.split(`
`)[0]:null},exists:qn}){let n=t.onPath(e);if(n)return{path:n,onPath:!0};for(let r of hh){let o=`${r}/${e}`;if(t.exists(o))return{path:o,onPath:!1}}return null}function Hn(e,t){return tt($u(e)?.path??e,t)}function bu(e){try{let t=ph(e);return t.bavail*t.bsize}catch{return null}}async function Yn(){let e=[],t=tt("sw_vers",["-productVersion"]),n=tt("uname",["-m"]);e.push({id:"macos",label:"macOS",ok:t.ok,detail:t.ok?`${t.out} on ${n.out==="arm64"?"Apple silicon":"Intel"}`:"not macOS",fix:"wpsync runs on macOS."});let r=tt("xcode-select",["-p"]);e.push({id:"xcode-clt",label:"Xcode Command Line Tools (git)",ok:r.ok&&tt("git",["--version"]).ok,detail:r.ok?r.out:"not installed",fix:"Run xcode-select --install and click Install in the window that opens.",needsPerson:!0});let o=$u("brew"),s=o?tt(o.path,["--version"]):{ok:!1,out:""};if(o&&!o.onPath)e.push({id:"homebrew",label:"Homebrew",ok:!1,detail:`installed at ${o.path}, but not on the PATH yet`,fix:`Run the "Next steps" lines Homebrew's installer printed, or add this line to ~/.zprofile and open a new Terminal window:
eval "$(${o.path} shellenv)"
(No need to install Homebrew again.)`});else e.push({id:"homebrew",label:"Homebrew",ok:s.ok,detail:s.ok?s.out.split(`
`)[0]:"not installed",fix:"Install it from https://brew.sh (paste its one-line command into Terminal; it asks for your Mac password).",needsPerson:!0});let i=qn("/Applications/OrbStack.app"),a=qn("/Applications/Docker.app"),c=Hn("docker",["--version"]);e.push({id:"docker-installed",label:"Docker (OrbStack or Docker Desktop)",ok:i||a||c.ok,detail:i?"OrbStack":a?"Docker Desktop":c.ok?c.out:"not installed",fix:"brew install --cask orbstack (lighter) or brew install --cask docker, then open it once and accept its terms."});let l=Hn("docker",["info","--format","{{.ServerVersion}}"]);if(e.push({id:"docker-running",label:"Docker running",ok:l.ok,detail:l.ok?`engine ${l.out}`:"not running",fix:`Open ${i?"OrbStack":"Docker Desktop"} and wait until it says it's running. The first launch asks you to accept its terms (and, for Docker Desktop, for your password).`,needsPerson:!l.ok}),a&&!i)e.push({id:"docker-disk",label:"Docker Desktop disk",ok:!0,warning:!0,detail:"Docker Desktop keeps containers in a virtual disk with a fixed size.",fix:"For a big site, check Docker Desktop \u2192 Settings \u2192 Resources \u2192 Virtual disk limit has room for about twice the site's size."});let u=Hn("ddev",["version","--json-output"]),p=u.ok?/"DDEV version":\s*"([^"]+)"/.exec(u.out)?.[1]??"installed":"";e.push({id:"ddev",label:"DDEV",ok:u.ok,detail:u.ok?p:"not installed",fix:"brew install ddev/ddev/ddev"});let d=Hn("mkcert",["-CAROOT"]),h=d.ok&&qn(dh(d.out,"rootCA.pem"));e.push({id:"mkcert",label:"Trusted HTTPS for local sites (mkcert)",ok:h,warning:!h,detail:h?"installed":"not set up: local sites work, but browsers warn about their certificate",fix:"Run mkcert -install in Terminal (it asks for your Mac password), then restart the browser.",needsPerson:!0});let f=bu(_u());return e.push({id:"local-disk",label:"Free disk space",ok:f===null||f>5368709120,detail:f===null?"unknown":`${Y(f)} free`,fix:"Free up space: a local copy needs about 2.5 times the site's size."}),e.push(await mh()),e}async function mh(){let e="";try{e=(await uh("wpsync-check.ddev.site",{family:4})).address}catch{}return{id:"ddev-dns",label:"Local site addresses (*.ddev.site)",ok:e==="127.0.0.1",detail:e?`resolve to ${e}`:"don't resolve",fix:'Your router or DNS blocks addresses that point at this Mac. Turn off "DNS rebinding protection" for ddev.site in the router, or use a public DNS (1.1.1.1).',needsPerson:!0}}async function Mt(e,t,n={}){let r=[],o;try{Oe(e,n.allowHttp),o=await ge(e,n)}catch(k){return r.push({id:"wordpress",label:"WordPress site with its REST API",ok:!1,detail:k instanceof y?k.message:String(k),fix:k instanceof y?k.hint:void 0}),r}r.push({id:"wordpress",label:"WordPress site with its REST API",ok:!0,detail:`${o.name} at ${o.homeUrl}`});let s=!o.applicationPasswords&&await Oo(o.homeUrl);r.push({id:"application-passwords",label:"Application Passwords",ok:o.applicationPasswords,detail:o.applicationPasswords?"available":s?"turned off, most likely by Wordfence":"turned off",fix:s?`Wordfence turns them off by default. While wpsync works on the site, switch that off:
${jt(o.siteUrl,!1)}
(If that box is already unticked, another security plugin is doing it: look in its settings for Application Passwords.)`:"WordPress offers them only over HTTPS, and security plugins can turn them off: look in the security plugin's settings for Application Passwords.",needsPerson:!0,cause:s?"wordfence-application-passwords":void 0});let i=await t.get(ye(o.homeUrl));if(!i)return r.push({id:"authorization-header",label:"Authorization header reaches WordPress",ok:!0,warning:!0,detail:"checked when wpsync connects"}),r.push({id:"connected",label:"Connected",ok:!0,warning:!0,detail:"not yet: the rest is checked after wpsync connect"}),r;let a=new me(o,i.username,i.applicationPassword),c=await a.get("/wp/v2/users/me"),l=c.status===401&&c.errorCode==="rest_not_logged_in";if(r.push({id:"authorization-header",label:"Authorization header reaches WordPress",ok:!l,detail:l?"the host drops it":"passes through",fix:"Ask the host to pass the HTTP Authorization header to PHP (on Apache: CGIPassAuth On, or a RewriteRule setting HTTP_AUTHORIZATION)."}),r.push({id:"connected",label:"wpsync's key still works",ok:c.status===200,detail:c.status===200?`signed in as ${i.username}`:`refused (HTTP ${c.status})`,fix:`Someone revoked it, or the user changed. Run: wpsync connect ${o.homeUrl}`}),c.status!==200)return r;if((await a.get(Ce)).status!==200)return r.push({id:"bridge",label:"wpsync bridge installed",ok:!1,detail:"missing",fix:`Run: wpsync connect ${o.homeUrl}`}),r;let{info:p,dbBytes:d,fileBytes:h}=await a.withBridge(async()=>{let k=await a.bridge(Re,W.info),T=await a.bridge(Dn,W.dbTables),x=await Ye(a);return{info:k,dbBytes:T.tables.reduce((z,E)=>z+E.dataBytes,0),fileBytes:x.reduce((z,E)=>z+E.size,0)}});r.push({id:"bridge",label:"wpsync bridge",ok:!0,detail:`version ${p.bridge.version}`}),r.push({id:"multisite",label:"Single site (not multisite)",ok:!p.site.multisite,detail:p.site.multisite?"multisite network":"single site",fix:"wpsync doesn't support multisite networks yet."}),r.push({id:"file-mods",label:"WordPress may change its own files",ok:p.capabilities.fileModsAllowed&&p.capabilities.writable.contentDir,detail:p.capabilities.fileModsAllowed?`filesystem: ${p.capabilities.filesystemMethod}`:"DISALLOW_FILE_MODS is set",fix:"Publishing needs it; pulling works without. Ask the host to allow plugin installs."});let f=p.php.version.split(".").slice(0,2).join("."),g=p.database.version.split(".").slice(0,2).join("."),_=p.database.engine==="mysql"?Ao:Ro;r.push({id:"versions",label:"PHP and database versions DDEV offers",ok:!0,warning:!To.includes(f)||!_.includes(g),detail:`live: PHP ${p.php.version}, ${p.database.engine} ${p.database.version}`,fix:"DDEV doesn't offer the exact version; the local copy uses the nearest newer one. Test carefully."});let b=d+h,R=bu(_u());r.push({id:"local-space",label:"Room on this Mac for the copy",ok:R===null||R>2.5*b,detail:`site is about ${Y(b)}; ${R===null?"free space unknown":`${Y(R)} free`}`,fix:`Free up at least ${Y(2.5*b)} on this Mac.`});let A=p.capabilities.diskFreeBytes;return r.push({id:"server-space",label:"Room on the server for publishing",ok:A===null||A>2*b,warning:A===null,detail:A===null?"the host doesn't say":`${Y(A)} free`,fix:`Publishing needs about ${Y(2*b)} free on the server (staging area plus the saved old version).`}),r}function Fe(e){return e.every((t)=>t.ok||t.warning)}function Gn(e){return e.map((t)=>{let r=[`${t.warning?"note":t.ok?"ok  ":"FIX "} ${t.label}: ${t.detail}`],o=t.fix?.replace(/\n/g,`
         `);if(!t.ok&&o)r.push(`       \u2192 ${o}${t.needsPerson?`
         (you need to do this yourself)`:""}`);else if(t.warning&&o)r.push(`       ${o}`);return r.join(`
`)}).join(`
`)}async function Vn(e,t){let n=e.log??(()=>{}),r=t.now??(()=>new Date);n(`Looking up ${e.url}\u2026`);let o=await ge(e.url,{allowHttp:e.allowHttp});await Ht(o);let s=ye(o.homeUrl),i=await t.store.get(s);if(e.useApplicationPassword)return vh(o,i,e,t);let a=await t.credentials({name:o.name,homeUrl:o.homeUrl},e.username??i?.username);n("Signing in\u2026");let c=await Zn.login(o,a.username,a.password),l;try{let u=`wpsync ${t.machineName??$h()} ${r().toISOString().slice(0,10)}`;l=await c.createApplicationPassword(u);let p=new me(o,a.username,l.password);if(await Pu(p),i&&i.applicationPasswordUuid!==l.uuid)await c.deleteApplicationPassword(i.applicationPasswordUuid);let d={homeUrl:o.homeUrl,siteUrl:o.siteUrl,username:a.username,applicationPassword:l.password,applicationPasswordUuid:l.uuid,applicationPasswordName:u,connectedAt:r().toISOString()};await t.store.set(s,d);let h=await bh(p,c,n);n("Checking the bridge\u2026");let f=await xu(p,n);return{site:o,info:f,bridge:h,connection:d}}catch(u){if(l)await c.deleteApplicationPassword(l.uuid).catch(()=>{});throw u}finally{await c.logout()}}async function Ht(e){if(e.applicationPasswords)return;if(await Oo(e.homeUrl))throw new y("wordfence_application_passwords",`${e.homeUrl} has Application Passwords switched off, most likely by Wordfence (it does that by default). wpsync needs them while it works on the site.`,`Switch Wordfence's setting off:
${jt(e.siteUrl,!1)}
Then run this again. Switch it back on when you're done; wpsync will remind you.`);throw new y("application_passwords_unavailable",`${e.homeUrl} doesn't offer Application Passwords, which wpsync uses to sign in.`,"WordPress turns them off on sites without HTTPS, and security plugins can too: look in the security plugin's settings for Application Passwords.")}function $h(){return _h().replace(/\.local$/,"")}async function Pu(e){let t=await e.get("/wp/v2/users/me",{context:"edit"});if(t.status===401)throw new y("authorization_header_stripped","The site's server drops the Authorization header, so WordPress never sees wpsync's key.","This is a hosting setting (common on some Apache setups). Ask the host to pass the Authorization header to PHP.");let n=t.body.capabilities??{};if(t.status!==200||!n.manage_options||!n.install_plugins)throw new y("not_administrator","That account isn't an administrator who can install plugins.","Sign in with an administrator account.")}async function bh(e,t,n){let r=await e.get(Ce);if(r.status===200)return"already-installed";if(r.status!==404)throw new y("plugin_check_failed",`Couldn't check the site's plugins (HTTP ${r.status}).`);if(n("Installing the wpsync bridge (it stays switched off between runs)\u2026"),await t.uploadPlugin(Eo(),ko),(await e.get(Ce)).status!==200)throw new y("bridge_upload_failed","WordPress didn't install the wpsync bridge from the upload.");return"uploaded"}function xu(e,t){return e.withBridge(async()=>ft(e,await e.bridge(Re,W.info),t))}async function vh(e,t,n,r){let o=n.log??(()=>{}),s=r.now??(()=>new Date);if(!r.applicationPassword)throw new y("dialog_failed","No way to ask for the Application Password.");let i=await r.applicationPassword({name:e.name,homeUrl:e.homeUrl},n.username??t?.username),a=new me(e,i.username,i.applicationPassword);await Pu(a);let c=await a.get("/wp/v2/users/me/application-passwords"),l=Array.isArray(c.body)?c.body:[],u=l.filter((f)=>f.last_used).sort((f,g)=>String(g.last_used).localeCompare(String(f.last_used)))[0]??l[l.length-1],p={homeUrl:e.homeUrl,siteUrl:e.siteUrl,username:i.username,applicationPassword:i.applicationPassword,applicationPasswordUuid:u?.uuid??"unknown",applicationPasswordName:u?.name??"(made by you)",connectedAt:s().toISOString()};if(await r.store.set(ye(e.homeUrl),p),(await a.get(Ce)).status!==200){let f=r.downloadsDir??vu(wh(),"Downloads");gh(f,{recursive:!0});let g=vu(f,ko);throw yh(g,Eo()),new y("bridge_upload_needed",`Saved your key. One manual step is left: the wpsync bridge isn't on the site, and an Application Password can't upload plugins. The bridge is at ${g}.`,`In ${e.siteUrl}/wp-admin go to Plugins \u2192 Add New \u2192 Upload Plugin, upload that file and click Install Now (don't activate it). Then run wpsync connect ${e.homeUrl} --application-password again.`)}o("Checking the bridge\u2026");let h=await xu(a,o);return{site:e,info:h,bridge:"already-installed",connection:p}}async function Su(e,t){let n=await ge(e.url,{allowHttp:e.allowHttp}),r=ye(n.homeUrl),o=await t.store.get(r);if(!o)throw new y("not_connected",`wpsync isn't connected to ${n.homeUrl}.`);let s=new me(n,o.username,o.applicationPassword);await s.setBridgeActive(!1).catch(()=>{});let i=await s.call("DELETE",Ce),a=o.applicationPasswordUuid==="unknown"?{status:0}:await s.call("DELETE",`/wp/v2/users/me/application-passwords/${o.applicationPasswordUuid}`);return await t.store.delete(r),{bridgeRemoved:i.status===200,keyRevoked:a.status===200,homeUrl:n.homeUrl}}import{existsSync as Ch}from"fs";import{resolve as Oh}from"path";import{execFileSync as Iu,spawnSync as kh}from"child_process";import{existsSync as ht,mkdirSync as Kn,readFileSync as Eh,writeFileSync as Xn}from"fs";import{homedir as zh}from"os";import{join as oe,resolve as Th}from"path";import{existsSync as Ph,readFileSync as ku,writeFileSync as Io}from"fs";function No(e){let t=ru[e];if(t===void 0)throw Error(`site template file ${e} missing from the build`);return t}var Eu=No("gitignore"),zu=No("claude-settings.json");function Tu(e){return e.replace(/^\s*<!--[\s\S]*?-->\s*/,"")}function Ru(){return Object.keys(So).sort().map((e)=>Tu(So[e]).trim()).join(`

`)}function xh(){return process.env.WPSYNC_COMMAND||"wpsync"}function Au(e){let t=[`**Status:** ${e.status}`,""];if(t.push(`- **Live site:** ${e.homeUrl}`),e.localUrl)t.push(`- **Local copy:** ${e.localUrl}`);let n=e.info;if(n){let r=n.theme.template!==n.theme.stylesheet?`${n.theme.name} ${n.theme.version} (child theme of ${n.theme.template})`:`${n.theme.name} ${n.theme.version}`,o=n.plugins.filter((s)=>s.active&&!s.file.startsWith("wpsync-bridge/"));if(t.push(`- **WordPress:** ${n.wordpress.version}; **theme:** ${r}`),t.push(`- **Live server:** PHP ${n.php.version}, ${n.database.engine} ${n.database.version}, ${n.server.software??"unknown web server"}`),t.push(`- **Active plugins (${o.length}):** ${o.map((s)=>`${s.name} ${s.version}`).join(", ")||"none"}`),n.muPlugins.length)t.push(`- **Must-use plugins (from the host):** ${n.muPlugins.map((s)=>s.name||s.file).join(", ")}`)}if(e.ddev)t.push(`- **Local DDEV:** PHP ${e.ddev.phpVersion}, ${e.ddev.webserver}, ${e.ddev.database}`);return t.push("",`In this file, \`wpsync\` means: \`${xh()}\``),t.join(`
`)}function Sh(e,t){return Tu(No("CLAUDE.md.tmpl")).replaceAll("{{SITE_NAME}}",e).replaceAll("{{HOME_URL}}",t.homeUrl).replace("{{FACTS}}",Au(t)).replace("{{RULES}}",Ru())}function Cu(e,t,n){let r=`<!-- wpsync:${t}:start -->`,o=`<!-- wpsync:${t}:end -->`,s=e.indexOf(r),i=e.indexOf(o);if(s<0||i<s)return`${e.trimEnd()}

${r}
${n}
${o}
`;return`${e.slice(0,s+r.length)}
${n}
${e.slice(i)}`}function Jn(e,t,n){if(!Ph(e)){Io(e,Sh(t,n));return}Io(e,Cu(ku(e,"utf8"),"facts",Au(n)))}function Ou(e){let t=ku(e,"utf8"),n=Cu(t,"rules",Ru());if(n===t)return!1;return Io(e,n),!0}var Rh=oe(zh(),"wp-sites"),Ah=S({homeUrl:w(),setup:Wt(["pending","ready"]).default("ready"),siteUrl:w().optional(),ddevName:w().optional(),localUrl:w().optional(),tablePrefix:w().optional(),lastPull:S({at:w(),tables:U(),rows:U(),files:U(),bytes:U(),activePlugins:de(w()).optional(),theme:w().optional()}).optional(),wordfence:S({switchedOffAt:w()}).optional(),lastPush:S({at:w(),stageId:w(),finalized:Ue()}).optional()});class Nu{dir;constructor(e){this.dir=e}get wpDir(){return oe(this.dir,"wp")}get backupsDir(){return oe(this.dir,"backups")}get metaPath(){return oe(this.dir,".wpsync.json")}get ddevConfigPath(){return oe(this.dir,".ddev","config.yaml")}get claudeMdPath(){return oe(this.dir,"CLAUDE.md")}exists(){return ht(this.metaPath)}read(){let e=Ah.safeParse(JSON.parse(Eh(this.metaPath,"utf8")));if(!e.success)throw new y("bad_project",`${this.metaPath} isn't a wpsync project file.`);return e.data}write(e){Xn(this.metaPath,`${JSON.stringify(e,null,2)}
`)}init(e,t){Kn(oe(this.dir,".claude"),{recursive:!0});let n=oe(this.dir,".claude","settings.json");if(!ht(n))Xn(n,zu);if(!ht(oe(this.dir,".gitignore")))Xn(oe(this.dir,".gitignore"),Eu);Jn(this.claudeMdPath,t,{status:"set up, not pulled yet (run wpsync pull)",homeUrl:e}),this.write({homeUrl:e,setup:"pending"})}prepare(e,t,n){if(!ht(this.metaPath))this.init(e.homeUrl,n);if(Kn(oe(this.dir,".ddev"),{recursive:!0}),Kn(this.wpDir,{recursive:!0}),Kn(this.backupsDir,{recursive:!0}),Xn(this.ddevConfigPath,t),this.write(e),!ht(oe(this.dir,".git")))Qn(this.dir,"init","-q","-b","main"),Qn(this.dir,"add",".gitignore",".wpsync.json",".ddev/config.yaml","CLAUDE.md",".claude/settings.json"),Qn(this.dir,"-c","user.name=wpsync","-c","user.email=wpsync@localhost","commit","-q","-m",`wpsync: local copy of ${e.homeUrl}`)}trackedWpFiles(){if(!ht(oe(this.dir,".git")))return new Set;let e=Qn(this.dir,"ls-files","-z","--","wp");return new Set(e.split("\x00").filter(Boolean).map((t)=>t.replace(/^wp\//,"")))}ddev(e,t={}){let n=kh("ddev",e,{cwd:this.dir,encoding:"utf8",stdio:["ignore",t.show?"inherit":"pipe","pipe"],maxBuffer:67108864});if(n.error)throw new y("ddev_missing","Couldn't run DDEV.","Install it with: brew install ddev/ddev/ddev");if(n.status!==0){let r=(n.stderr||n.stdout||"").trim().split(`
`).slice(-3).join(" ");throw new y("ddev_failed",`ddev ${e.join(" ")} failed: ${r}`)}return(n.stdout??"").trim()}wp(...e){return this.ddev(["wp",...e])}syncFiles(){try{this.ddev(["mutagen","sync"])}catch{}}}function nt(e,t,n=new Date){let r=se(e);if(!r.exists())return;let o=r.read();if(new URL(o.homeUrl).host!==new URL(t).host||o.wordfence)return;r.write({...o,wordfence:{switchedOffAt:n.toISOString()}})}function Qn(e,...t){return Iu("git",["-C",e,...t],{encoding:"utf8",stdio:["ignore","pipe","pipe"]})}function mt(e){let t=new URL(e),n=`${t.host}${t.pathname}`.replace(/\/+$/,"").replace(/[/:]+/g,"-");return oe(Rh,n)}function se(e){return new Nu(Th(e))}function gt(){try{Iu("docker",["info"],{stdio:"ignore"})}catch{throw new y("docker_not_running","Docker isn't running.","Start Docker Desktop and try again.")}}function er(e,t={}){let n=Oe(e,t.allowHttp),r=se(t.dir??mt(n));if(r.exists()){let o=r.read();if(o.setup==="ready")throw new y("already_set_up",`${r.dir} is already a pulled copy of ${o.homeUrl}.`,`To refresh it, run: wpsync pull ${o.homeUrl}`);return{project:r,homeUrl:o.homeUrl,created:!1}}return r.init(n,new URL(n).host),{project:r,homeUrl:n,created:!0}}function Du(e=process.cwd()){let t=se(Oh(e));if(!t.exists()||!Ch(t.claudeMdPath))throw new y("not_a_project",`${t.dir} isn't a wpsync site project.`,"Run this inside a site's folder, or pass --dir.");return{path:t.claudeMdPath,changed:Ou(t.claudeMdPath)}}import{readdirSync as Zh,readFileSync as Zu,rmSync as Uh,writeFileSync as Lh}from"fs";import{join as Wo,relative as Fh,sep as Bh}from"path";import{createWriteStream as Ih}from"fs";import{once as Wu}from"events";import{createGzip as Nh}from"zlib";function Dh(e){return`\`${e.replace(/`/g,"``")}\``}async function tr(e,t,n=()=>{},r=()=>{}){let{charset:o,tables:s}=await e.bridge(Dn,W.dbTables),i=Nh(),a=Ih(t);i.pipe(a);let c={tables:s.length,rows:0,sqlBytes:0},l=async(u)=>{if(c.sqlBytes+=Buffer.byteLength(u),!i.write(u))await Wu(i,"drain")};await l([`-- wpsync database download, ${new Date().toISOString()}`,`SET NAMES ${o||"utf8mb4"};`,"SET FOREIGN_KEY_CHECKS=0;","SET UNIQUE_CHECKS=0;","SET SQL_MODE='NO_AUTO_VALUE_ON_ZERO';",""].join(`
`));for(let[u,p]of s.entries()){n(p.name,u,s.length),await l(`
DROP TABLE IF EXISTS ${Dh(p.name)};
${p.createSql};
`);let d;do{let h={table:p.name};if(d)h.cursor=d;let f=await e.bridge(Rl,W.dbRows,{query:h});if(f.next&&f.next===d)throw new y("paging_stuck",`The bridge kept returning the same rows of ${p.name}, so wpsync stopped the download.`,"This is a bug in wpsync's bridge; please report the table's name.");if(f.sql)await l(f.sql);c.rows+=f.rows,r(c),d=f.next}while(d)}return await l(`
SET FOREIGN_KEY_CHECKS=1;
SET UNIQUE_CHECKS=1;
`),i.end(),await Wu(a,"finish"),c}import{execFileSync as Wh}from"child_process";class qt{log;options;started=0;lastActivity=0;lastStallReport=0;stepName="starting";detail="";done=0;total;unit="";byteCount=0;network=!0;timer;constructor(e,t={}){this.log=e;this.options=t;this.started=this.now(),this.lastActivity=this.started}now(){return this.options.now?.()??Date.now()}start(){let e=this.options.intervalMs??15000;return this.timer=setInterval(()=>this.tick(),Math.min(e,5000)),this.timer.unref?.(),this.lastPrinted=this.now(),this}stop(){if(this.timer)clearInterval(this.timer);this.timer=void 0}step(e,t={}){this.stepName=e,this.total=t.total,this.unit=t.unit??"",this.network=t.network??!0,this.done=0,this.byteCount=0,this.detail="",this.activity()}update(e){if(e.done!==void 0)this.done=e.done;if(e.total!==void 0)this.total=e.total;if(e.bytes!==void 0)this.byteCount=e.bytes;if(e.detail!==void 0)this.detail=e.detail;this.activity()}activity(){this.lastActivity=this.now(),this.lastStallReport=0}lastPrinted=0;tick(){let e=this.now(),t=e-this.lastActivity,n=this.options.stallMs??60000;if(this.network&&t>=n&&e-this.lastStallReport>=n){this.lastStallReport=e,this.log(`stalled: no data for ${Do(t)} during ${this.stepName}${this.detail?` (${this.detail})`:""}`);return}if(e-this.lastPrinted>=(this.options.intervalMs??15000))this.lastPrinted=e,this.log(this.line(e))}line(e=this.now()){let t=[this.stepName];if(this.total!==void 0)t[0]+=` ${D(this.done)}/${D(this.total)}${this.unit?` ${this.unit}`:""}`;else if(this.done)t[0]+=` ${D(this.done)}${this.unit?` ${this.unit}`:""}`;if(this.byteCount)t[0]+=`, ${Y(this.byteCount)}`;if(this.detail)t[0]+=` (${this.detail})`;if(t.push(Do(e-this.started)),this.network)t.push(`last data ${Do(e-this.lastActivity)} ago`);return`progress: ${t.join(" \xB7 ")}`}}function Do(e){let t=Math.max(0,Math.round(e/1000));if(t<60)return`${t}s`;let n=Math.floor(t/60);if(n<60)return`${n}m ${t%60}s`;return`${Math.floor(n/60)}h ${n%60}m`}function nr(e,t){let n=(r)=>`"${r.replace(/\\/g,"\\\\").replace(/"/g,"\\\"")}"`;try{Wh("osascript",["-"],{input:`display notification ${n(t)} with title ${n(e)}`,stdio:["pipe","ignore","ignore"],timeout:5000})}catch{}}var jh=5;async function rr(e,t){let n=e.log??(()=>{}),r=t.now??(()=>new Date);gt();let o=await ge(e.url,{allowHttp:e.allowHttp});await Ht(o);let s=await t.store.get(ye(o.homeUrl));if(!s)throw new y("not_connected",`wpsync isn't connected to ${o.homeUrl} yet.`,`Run: wpsync connect ${o.homeUrl}`);let i=new me(o,s.username,s.applicationPassword),a=new qt(n,e.progress).start();try{return await i.withBridge(()=>Mh(e,t,o,i,a))}finally{a.stop()}}async function Mh(e,t,n,r,o){let s=e.log??(()=>{}),i=t.now??(()=>new Date);{o.step("checking the site");let a=await ft(r,await r.bridge(Re,W.info),s);Yh(a);let c=se(e.dir??mt(n.homeUrl)),l=c.exists()?c.read():void 0,u=!l||l.setup==="pending",p=[];if(l&&!u&&l.homeUrl!==n.homeUrl)throw new y("project_mismatch",`${c.dir} is a copy of ${l.homeUrl}, not ${n.homeUrl}.`);let d=!u&&l?.ddevName||e.name||iu(n.homeUrl),h=au(a,d),f=`https://${d}.ddev.site`,g={...l,homeUrl:n.homeUrl,setup:"ready",siteUrl:n.siteUrl,ddevName:d,localUrl:f,tablePrefix:a.database.tablePrefix};if(u)s(`Setting up ${c.dir}`),s(`  DDEV: PHP ${h.phpVersion}, ${h.webserver}, ${h.database.type} ${h.database.version}`),c.prepare({...g,setup:"pending"},cu(h,n.homeUrl),a.site.name);else p.push(...Gh(c,h));s("Listing the site's files\u2026"),o.step("listing files",{unit:"files"});let _=await Ye(r,(v)=>o.update({done:v})),b=jn(c.wpDir),R=c.trackedWpFiles();if(R.size&&!e.overwriteCode){let v=await mu(r,c.wpDir,R,_);if(v.length){let N=v.slice(0,15).map((O)=>`  ${O}`);if(v.length>15)N.push(`  \u2026and ${D(v.length-15)} more`);throw new y("code_drift",`Code tracked in git differs on the live site, so pulling would overwrite your work:
${N.join(`
`)}`,"Compare the live copies with yours, then pull again with --overwrite-code to take live's, or keep yours and publish them.")}}let A=uu(_,b,e.overwriteCode?new Set:R),k=i().toISOString().replace(/[:.]/g,"-"),T=Wo(c.backupsDir,`pull-${k}.sql.gz`);s("Downloading the database\u2026"),o.step("database",{unit:"tables"});let x=await tr(r,T,(v,N,O)=>o.update({done:N,total:O,detail:v}),(v)=>o.update({bytes:v.sqlBytes}));s(`  ${D(x.tables)} tables, ${D(x.rows)} rows, ${Y(x.sqlBytes)} of SQL`),Kh(c),s(`Files: ${D(A.fetch.length)} to download, ${D(A.remove.length)} to delete, ${D(A.unchanged)} unchanged`),o.step("files",{total:A.fetch.length,unit:"files"});let z=await Mn(r,c.wpDir,A.fetch,(v,N)=>o.update({done:v,bytes:N}),()=>o.activity());if(hu(c.wpDir,A.remove),z.vanished.length)p.push(`${D(z.vanished.length)} files disappeared from live during the pull.`);s("Starting DDEV and loading the database (this runs on this Mac: a few minutes for a big site)\u2026"),o.step("loading into DDEV",{network:!1}),c.ddev(["start","-y"]),Vh(c,a.database.tablePrefix),c.syncFiles(),c.ddev(["import-db",`--file=${T}`]),s("Switching addresses to the local copy\u2026"),o.step("switching addresses",{network:!1});for(let[v,N]of Jh(n.siteUrl,n.homeUrl,f))c.wp("search-replace",v,N,"--all-tables-with-prefix","--precise","--quiet");if(c.wp("cache","flush"),c.wp("rewrite","flush"),c.write({...g,lastPull:{at:i().toISOString(),tables:x.tables,rows:x.rows,files:_.length,bytes:z.bytes,activePlugins:qh(a),theme:a.theme.stylesheet}}),Jn(c.claudeMdPath,a.site.name,{status:`pulled from live ${i().toISOString().slice(0,16).replace("T"," ")} UTC`,homeUrl:n.homeUrl,localUrl:f,info:a,ddev:{phpVersion:h.phpVersion,webserver:h.webserver,database:`${h.database.type} ${h.database.version}`}}),a.plugins.some((v)=>v.active&&v.file.startsWith("wordfence/")))nt(c.dir,n.homeUrl,i());let E=a.plugins.filter((v)=>v.active&&Hh.test(`${v.file} ${v.name}`));if(E.length)p.push(`These active plugins may hold live payment, email or API keys: ${E.map((v)=>v.name).join(", ")}. The local copy has live's settings: switch them to test mode in the local wp-admin before trying them.`);return{projectDir:c.dir,localUrl:f,firstPull:u,tables:x.tables,rows:x.rows,sqlBytes:x.sqlBytes,filesFetched:z.files,bytesFetched:z.bytes,filesDeleted:A.remove.length,filesUnchanged:A.unchanged,warnings:p}}}var Hh=/woocommerce|stripe|paypal|square|braintree|authorize|mollie|klarna|mailchimp|hubspot|klaviyo|sendgrid|mailgun|postmark|smtp|twilio|zapier|webhook|salesforce|activecampaign|convertkit|give(wp)?\b|memberpress|easy-digital-downloads|gravityforms/i;function qh(e){return e.plugins.filter((t)=>t.active&&!t.file.startsWith("wpsync-bridge/")).map((t)=>t.file.includes("/")?t.file.split("/")[0]:t.file.replace(/\.php$/,"")).sort()}function Yh(e){if(e.site.multisite)throw new y("unsupported","This is a WordPress multisite network, which wpsync doesn't support yet.");let t=Fh(e.paths.abspath,e.paths.contentDir);if(t.startsWith("..")||t.startsWith(Bh))throw new y("unsupported","This site keeps wp-content outside its WordPress folder, which wpsync doesn't support yet.")}function Gh(e,t){let n=Zu(e.ddevConfigPath,"utf8"),r=/php_version:\s*"?([\d.]+)"?/.exec(n)?.[1],o=/database:\s*\n\s*type:\s*(\w+)\s*\n\s*version:\s*"?([\d.]+)"?/.exec(n),s=[];if(r&&r!==t.phpVersion)s.push(`Live now runs PHP ${t.phpVersion}; the local copy uses ${r} (.ddev/config.yaml).`);if(o&&(o[1]!==t.database.type||o[2]!==t.database.version))s.push(`Live's database is now ${t.database.type} ${t.database.version}; the local copy uses ${o[1]} ${o[2]}.`);return s}function Vh(e,t){if(!/^[A-Za-z0-9_]+$/.test(t))throw new y("bad_prefix",`The site's table prefix "${t}" isn't usable.`);let n=Wo(e.wpDir,"wp-config.php"),r=Zu(n,"utf8"),o=r.replace(/\$table_prefix\s*=\s*['"][^'"]*['"]\s*;/,`$table_prefix = '${t}';`);if(o!==r)Lh(n,o)}function Jh(e,t,n){let r=[],o=(s)=>{let i=new URL(s),a=i.pathname.replace(/\/+$/,"");for(let c of["https","http"]){let l=`${c}://${i.host}${a}`,u=`${n}${a}`;if(r.some(([p])=>p===l))continue;r.push([l,u]),r.push([l.replace(/\//g,"\\/"),u.replace(/\//g,"\\/")])}};return o(e),o(t),r.sort((s,i)=>i[0].length-s[0].length)}function Kh(e){let t=Zh(e.backupsDir).filter((n)=>/^pull-.*\.sql\.gz$/.test(n)).sort().reverse();for(let n of t.slice(jh))Uh(Wo(e.backupsDir,n),{force:!0})}import{existsSync as Xh}from"fs";import{spawnSync as Qh}from"child_process";async function or(e,t){let n=se(e.dir??process.cwd());if(!n.exists())return{dir:n.dir,phase:"no-project",next:"Start a new wp-dev project: wpsync init <site-url> (the start gate)."};let r=n.read(),o={dir:n.dir,phase:"start-gate",homeUrl:r.homeUrl,localUrl:r.localUrl,lastPull:r.lastPull?.at,lastPush:r.lastPush?{at:r.lastPush.at,finalized:r.lastPush.finalized}:void 0,next:""},s=await t.get(ye(r.homeUrl)).catch(()=>null);if(o.connected=!!s,s)try{let i=await ge(r.homeUrl,{allowHttp:e.allowHttp}),a=new me(i,s.username,s.applicationPassword),c=await a.get("/wp/v2/users/me");if(o.keyWorks=c.status===200,o.keyWorks){let l=await a.get(Ce);o.bridgeVersion=l.status===200?String(l.body.version??""):null}}catch{o.keyWorks=!1}if(r.wordfence){let i=await ge(r.homeUrl,{allowHttp:e.allowHttp}).catch(()=>null);o.wordfence=i&&!i.applicationPasswords?"back-on":"switched-off",o.wordfenceSteps=jt(i?.siteUrl??r.siteUrl??r.homeUrl,o.wordfence==="switched-off")}if(Xh(n.ddevConfigPath)){let i=Qh("ddev",["describe","-j"],{cwd:n.dir,encoding:"utf8"});o.ddevRunning=i.status===0&&/"status":\s*"running"/.test(i.stdout??"")}if(o.wordfence==="back-on"&&s)return o.phase=r.setup!=="ready"?"pull":r.lastPush&&!r.lastPush.finalized?"publish-pending":"work",o.next=`Wordfence's "Disable WordPress application passwords" is on, as it should be between work sessions. Local work needs nothing; switch it off again before the next pull or publish.`,o;if(!s||o.keyWorks===!1)o.phase="connect",o.next=`Connect: wpsync connect ${r.homeUrl} (a macOS dialog asks for the admin login).`;else if(r.setup!=="ready")o.phase="pull",o.next=`Pull the site: wpsync pull ${r.homeUrl} --dir .`;else if(r.lastPush&&!r.lastPush.finalized)o.phase="publish-pending",o.next="The last publish is waiting: check live, then wpsync finalize (keep it) or wpsync rollback (undo it).";else o.phase="work",o.next=o.wordfence==="switched-off"?`Ready to work on the local copy. When you're done with pulls and publishes for now, switch Wordfence's "Disable WordPress application passwords" back on.`:"Ready to work on the local copy.";return o}async function sr(e={}){let t=se(e.dir??process.cwd());if(!t.exists())throw new y("not_a_project",`${t.dir} isn't a wpsync site project.`);let n=t.read();if(n.setup!=="ready"||!n.localUrl)throw new y("not_pulled","This project hasn't been pulled yet.");gt(),t.ddev(["start","-y"]);let r=n.localUrl.replace(/^https:/,"http:"),o=[],s=async(f,g,_)=>{let b=await j(_).catch(()=>null),R=b?.status??0,A=!!b&&/There has been a critical error|Fatal error|Parse error|Warning: .* on line \d+/i.test(b.text);return o.push({id:f,label:g,ok:R===200&&!A,detail:!b?"no answer":A?`HTTP ${R}, with a PHP error on the page`:`HTTP ${R}`,fix:"Look at ddev logs for the PHP error, or compare the page with live."}),b};await s("home","Home page",`${r}/`),await s("login","wp-admin login page",`${r}/wp-login.php`);let i=[];for(let f of["pages","posts"]){let g=await j(`${r}/wp-json/wp/v2/${f}?per_page=2&_fields=link`).catch(()=>null),_=g?.status===200?fe(g.text):null;if(Array.isArray(_)){for(let b of _)if(typeof b?.link==="string")i.push(b.link)}}for(let[f,g]of i.entries())await s(`content-${f+1}`,"Content page",g.replace(/^https:/,"http:"));let a=t.wp("option","get","permalink_structure");o.push({id:"permalinks",label:"Pretty permalinks",ok:i.length===0||o.filter((f)=>f.id.startsWith("content-")).every((f)=>f.ok),detail:a?`structure ${a}`:"plain (?p=123) links",fix:"Run ddev wp rewrite flush; on Apache sites, check .htaccess came across."});let c=new URL(n.homeUrl).host,l=Number(t.wp("search-replace",`//${c}`,`//${new URL(n.localUrl).host}`,"--all-tables-with-prefix","--dry-run","--format=count")||"0");o.push({id:"live-urls",label:"No live addresses left in the database",ok:l===0,detail:l===0?"none":`${l} still point at ${c}`,fix:"Pull again; if they stay, they may be in a format wpsync can't rewrite (for example base64 in a page builder)."});let u=await j(`${r}/wp-json/wp/v2/media?per_page=3&_fields=source_url`).catch(()=>null),p=u?.status===200?fe(u.text)??[]:[];if(p.length){let g=(await Promise.all(p.map((_)=>_.source_url?j(_.source_url.replace(/^https:/,"http:")).catch(()=>null):null))).filter((_)=>_?.status!==200).length;o.push({id:"images",label:"Images load",ok:g===0,detail:g===0?`${p.length} checked`:`${g} of ${p.length} don't load`,fix:"Pull again: the files may not have come across."})}if(n.lastPull?.activePlugins){let f=new Set(t.wp("plugin","list","--status=active","--field=name").split(`
`).filter(Boolean)),g=n.lastPull.activePlugins.filter((_)=>!f.has(_));o.push({id:"plugins",label:"Same active plugins as live",ok:g.length===0,detail:g.length?`not active locally: ${g.join(", ")}`:`${f.size} active`,fix:"A plugin may have switched itself off locally (for example a license check). Look in the local wp-admin's Plugins page."})}if(n.lastPull?.theme){let f=t.wp("option","get","stylesheet");o.push({id:"theme",label:"Same theme as live",ok:f===n.lastPull.theme,detail:f,fix:`Live uses ${n.lastPull.theme}.`})}let h=(()=>{try{return t.ddev(["logs","-s","web","--tail","200"])}catch{return""}})().split(`
`).filter((f)=>/PHP Fatal error/.test(f));return o.push({id:"php-log",label:"No PHP fatal errors in the web server log",ok:h.length===0,detail:h.length?h[h.length-1].slice(0,200):"none in the last 200 lines",fix:"Fix the error shown, then run wpsync verify again."}),o}async function Uu(e,t,n){let r=t.log??(()=>{}),o=Oe(e,t.allowHttp),s=t.dir??mt(o),i=se(s);if(!i.exists()){let d=er(e,{dir:s,allowHttp:t.allowHttp});return{stoppedAt:"start-gate",dir:d.project.dir,homeUrl:d.homeUrl,checks:[]}}r("Checking this Mac\u2026");let a=await Yn();if(!Fe(a))return{stoppedAt:"mac-checks",dir:i.dir,homeUrl:o,checks:a};r("Checking the site\u2026");let c=await Mt(o,n.store,t);if(c.some((d)=>d.cause==="wordfence-application-passwords"))nt(i.dir,o);if(!Fe(c))return{stoppedAt:"site-checks",dir:i.dir,homeUrl:o,checks:[...a,...c]};if((await or({dir:i.dir,allowHttp:t.allowHttp},n.store)).phase==="connect"){if(r("Connecting (a macOS dialog asks for the admin login)\u2026"),await Vn({url:o,allowHttp:t.allowHttp,log:r},{credentials:n.credentials,store:n.store}),c=await Mt(o,n.store,t),!Fe(c))return{stoppedAt:"site-checks",dir:i.dir,homeUrl:o,checks:[...a,...c]}}let u;if(i.read().setup!=="ready")r("Pulling the site\u2026"),u=await rr({url:o,dir:i.dir,allowHttp:t.allowHttp,log:r},{store:n.store});r("Verifying the local copy\u2026");let p=await sr({dir:i.dir});return{stoppedAt:"done",dir:i.dir,homeUrl:o,checks:[...a,...c,...p],pull:u,localUrl:i.read().localUrl}}import{execFileSync as em}from"child_process";function ir(e){return`"${e.replace(/\\/g,"\\\\").replace(/"/g,"\\\"")}"`}function tm(e,t=""){let n=`Enter an admin username and password for ${e}.`,r="wpsync uses the password once, to create its own revocable key on the site. It never saves the password.";return[`set u to text returned of (display dialog ${ir(`${n}

Username:`)} default answer ${ir(t)} with title "wpsync" buttons {"Cancel", "Next"} default button "Next" cancel button "Cancel")`,`set p to text returned of (display dialog ("Password for " & u & " at " & ${ir(e)} & ":" & return & return & ${ir("wpsync uses the password once, to create its own revocable key on the site. It never saves the password.")}) default answer "" with hidden answer with title "wpsync" buttons {"Cancel", "Connect"} default button "Connect" cancel button "Cancel")`,"return u & linefeed & p"].join(`
`)}var Zo=async(e,t)=>{let n;try{n=em("osascript",["-"],{input:tm(e.homeUrl,t),encoding:"utf8",stdio:["pipe","pipe","pipe"]})}catch(a){let c=a.stderr??"";if(/-128/.test(c))throw new y("cancelled","Sign-in cancelled.");throw new y("dialog_failed","Couldn't show the sign-in dialog.","Run wpsync from a Mac where you're logged in to the desktop.")}let r=n.replace(/\n$/,""),o=r.indexOf(`
`),s=r.slice(0,o).trim(),i=r.slice(o+1);if(o<0||!s||!i)throw new y("cancelled","No username or password entered.");return{username:s,password:i}};import{execFileSync as am}from"child_process";import{createHash as cm}from"crypto";import{mkdirSync as lm,rmSync as um}from"fs";import{join as Lo}from"path";import{gzipSync as pm}from"zlib";import{closeSync as Bu,mkdirSync as ju,openSync as Mu,readdirSync as nm,readFileSync as rm,readSync as om,rmSync as Uo,statSync as Hu,writeFileSync as Lu,writeSync as sm}from"fs";import{dirname as qu,join as Ie}from"path";function ar(e){return Ie(e.dir,".wpsync-tmp")}function Fu(e,t){let n=t?gr.filter((r)=>r!==".htaccess"):gr;return Qe(e)||Qe(e,n)||Qe(e,["wp-config-ddev.php"])}function Yu(e,t,n){let r=new Map(e.map((s)=>[s.path,s])),o={upload:[],remove:[],uploadBytes:0};for(let[s,i]of t){if(Fu(s,n))continue;let a=r.get(s);if(a&&Co(a,i))continue;o.upload.push({path:s,size:i.size,mtime:i.mtime}),o.uploadBytes+=i.size}for(let s of e)if(!t.has(s.path)&&!Fu(s.path,n))o.remove.push(s.path);return o.upload.sort((s,i)=>s.path<i.path?-1:1),o.remove.sort(),o}function Gu(e,t){let n=Ie(ar(e),"files.wpa");ju(qu(n),{recursive:!0});let r=Mu(n,"w"),o=0,s=(i)=>{sm(r,i),o+=i.length};try{for(let i of t.upload){let a=rm(Ie(e.wpDir,i.path)),c=Math.floor(Hu(Ie(e.wpDir,i.path)).mtimeMs/1000);s(Buffer.from(`${JSON.stringify({path:i.path,size:a.length,mtime:c})}
`)),s(a)}for(let i of t.remove)s(Buffer.from(`${JSON.stringify({path:i,delete:!0})}
`))}finally{Bu(r)}return{path:n,bytes:o}}function Vu(e,t,n,r){let o=ar(e),s=Ie(o,"bridge");Uo(s,{recursive:!0,force:!0});for(let u of["includes/protocol.php","includes/class-wpsync-db.php"]){let p=Ie(s,u);ju(qu(p),{recursive:!0}),Lu(p,dt[u])}Lu(Ie(s,"export.php"),nu["export.php"]);let i=Ie(o,"db.frames");Uo(i,{force:!0}),e.syncFiles();let a=`wpsync-push-${Date.now()}`;r("  Saving a snapshot of the local database\u2026"),e.ddev(["snapshot","--name",a]);let c;try{r("  Switching addresses to live's for the export\u2026");for(let[p,d]of n)e.wp("search-replace",p,d,"--all-tables-with-prefix","--precise","--quiet");r("  Exporting the database\u2026");let u=e.wp("eval-file","/var/www/html/.wpsync-tmp/bridge/export.php","/var/www/html/.wpsync-tmp/db.frames",t);c=JSON.parse(u.split(`
`).pop()??"{}")}finally{r("  Restoring the local database from the snapshot\u2026"),e.ddev(["snapshot","restore",a]),im(e,a)}e.syncFiles();let l;try{l=Hu(i).size}catch{throw new y("export_failed","The local database export didn't produce a file.")}if(!c.tables)throw new y("export_failed","The local database export found no tables.");return{path:i,bytes:l,...c}}function im(e,t){let n=Ie(e.dir,".ddev","db_snapshots");try{for(let r of nm(n))if(r.startsWith(t))Uo(Ie(n,r),{recursive:!0,force:!0})}catch{}}function*Ju(e,t){let n=Mu(e,"r");try{let r=Buffer.alloc(t);for(;;){let o=om(n,r,0,t,null);if(o===0)return;yield Buffer.from(r.subarray(0,o))}}finally{Bu(n)}}function Ku(e,t,n){let r=[],o=new URL(n),s=(i)=>{let a=new URL(i).pathname.replace(/\/+$/,""),c=i.replace(/\/+$/,"");for(let l of["https","http"]){let u=`${l}://${o.host}${a}`;if(r.some(([p])=>p===u))continue;r.push([u,c]),r.push([u.replace(/\//g,"\\/"),c.replace(/\//g,"\\/")])}};return s(e),s(t),r.sort((i,a)=>a[0].length-i[0].length)}async function Fo(e,t){if(!e.confirm)throw new y("not_confirmed","Changing the live site needs the developer's confirmation.");if(!await e.confirm(t))throw new y("not_confirmed",t.action==="push"?`The domain typed wasn't ${t.host}, so nothing was published.`:"Not confirmed, so nothing was changed.")}async function Bo(e,t){let n=se(e.dir??process.cwd());if(!n.exists())throw new y("not_a_project",`${n.dir} isn't a wpsync site project.`,"Run this in the site's folder, or pass --dir.");let r=n.read();if(r.setup!=="ready"||!r.localUrl||!r.siteUrl)throw new y("not_pulled","This project hasn't been pulled yet, so there's nothing to publish.",`Run: wpsync pull ${r.homeUrl}`);let o=await ge(r.homeUrl,{allowHttp:e.allowHttp});await Ht(o);let s=await t.get(ye(o.homeUrl));if(!s)throw new y("not_connected",`wpsync isn't connected to ${o.homeUrl}.`,`Run: wpsync connect ${o.homeUrl}`);return{project:n,meta:r,site:o,rest:new me(o,s.username,s.applicationPassword),log:e.log??(()=>{})}}function dm(e){try{return am("git",["-C",e.dir,"status","--porcelain","--untracked-files=no","--","wp"],{encoding:"utf8"}).split(`
`).filter(Boolean).map((n)=>n.slice(3))}catch{return[]}}function fm(e){return e.includes("/")?e.split("/")[0]:e.replace(/\.php$/,"")}function hm(e,t){let n=JSON.parse(t.wp("plugin","list","--format=json","--fields=name,status,version")),r=new Map(e.plugins.filter((i)=>!i.file.startsWith("wpsync-bridge/")).map((i)=>[fm(i.file),i])),o=new Map(n.filter((i)=>i.status!=="must-use"&&i.status!=="dropin").map((i)=>[i.name,i])),s={added:[],removed:[],updated:[]};for(let[i,a]of o){let c=r.get(i);if(!c)s.added.push({name:i,local:a.version});else if(c.version!==a.version)s.updated.push({name:i,live:c.version,local:a.version})}for(let[i,a]of r)if(!o.has(i))s.removed.push({name:i,live:a.version});return s}async function mm(e,t,n){let{project:r,meta:o,rest:s,log:i}=e,a=[o.lastPull?.at,o.lastPush?.at].filter((h)=>!!h).sort().pop(),c=a?await s.bridge(Dl,W.changes,{query:{since:a}}):null;i("Comparing files with live\u2026");let l=Yu(await Ye(s),jn(r.wpDir),n),[u="0",p="0"]=r.wp("db","query","SELECT COUNT(*), COALESCE(SUM(DATA_LENGTH + INDEX_LENGTH), 0) FROM information_schema.TABLES WHERE TABLE_SCHEMA = DATABASE()","--skip-column-names").split(/\s+/),d=r.wp("option","get","stylesheet");return{homeUrl:e.site.homeUrl,host:new URL(e.site.homeUrl).host,lastPull:o.lastPull?.at,liveChanges:c,files:l,plugins:hm(t,r),theme:{live:t.theme.stylesheet,local:d},database:{tables:Number(u),bytes:Number(p)}}}async function Qu(e,t){let n=await Bo(e,t.store),{project:r,meta:o,site:s,rest:i,log:a}=n,c=t.now??(()=>new Date),l=!!e.includeHtaccess;if(gt(),o.lastPush&&!o.lastPush.finalized)throw new y("push_pending","The last push is still waiting to be finalized or rolled back.","Check the live site, then run wpsync finalize (keep it) or wpsync rollback (undo it).");let u=dm(r);if(u.length&&!e.dryRun)throw new y("uncommitted_code",`Commit your code before publishing:
${u.map((p)=>`  ${p}`).join(`
`)}`);return r.ddev(["start","-y"]),i.withBridge(async()=>{let p=await ft(i,await i.bridge(Re,W.info),a);if(!p.capabilities.writable.abspath||!p.capabilities.writable.contentDir)throw new y("not_writable","WordPress can't write its own files on this host, so wpsync can't publish to it.");let d=await mm(n,p,l);if(e.dryRun)return{plan:d,applied:!1};let h=p.capabilities.diskFreeBytes,f=2*(d.database.bytes+d.files.uploadBytes);if(h!==null&&h<f)throw new y("insufficient_space",`The live server has ${Y(h)} free; publishing needs about ${Y(f)}.`,"Ask the host for more space, or delete old backups on the server.");await Fo(t,{action:"push",host:d.host,summary:jo(d)});let g=c().toISOString().replace(/[:.]/g,"-"),_=Lo(r.backupsDir,`push-${g}`);lm(_,{recursive:!0});let b=new qt(a,e.progress).start();try{a("Backing up live's database\u2026"),b.step("backing up live's database",{unit:"tables"}),await tr(i,Lo(_,"live.sql.gz"),(O,L,Q)=>b.update({done:L,total:Q,detail:O}),(O)=>b.update({bytes:O.sqlBytes}));let R=new Set((await Ye(i)).map((O)=>O.path)),A=[...d.files.upload.filter((O)=>R.has(O.path)).map((O)=>O.path),...d.files.remove];if(A.length){a(`Backing up ${D(A.length)} live files this push replaces or deletes\u2026`);let O=(await Ye(i)).filter((L)=>A.includes(L.path));b.step("backing up live's files",{total:O.length,unit:"files"}),await Mn(i,Lo(_,"files"),O,(L,Q)=>b.update({done:L,bytes:Q}),()=>b.activity())}let k=await i.bridge(Wl,W.stageBegin,{method:"POST",body:{dbBytes:d.database.bytes,filesBytes:d.files.uploadBytes,includeHtaccess:l}}),T=c().toISOString(),{lastPush:x,...z}=o;r.write({...z,lastPush:{at:T,stageId:k.stageId,finalized:!1}});let E=()=>r.write(z),v=!1,N=!1;try{a("Preparing the local copy for live\u2026"),b.step("preparing the local copy",{network:!1});let O=Vu(r,k.newPrefix,Ku(o.siteUrl,o.homeUrl,o.localUrl),a),L=Gu(r,d.files),Q=Math.max(16384,Math.min(es,k.chunkBytes-4096));a(`Uploading the database (${Y(O.bytes)})\u2026`),b.step("uploading the database",{unit:"pieces"});let ie=await Xu(i,k.stageId,"db",O.path,Q,b);a(`Uploading ${D(d.files.upload.length)} files (${Y(L.bytes)})\u2026`),b.step("uploading files",{unit:"pieces"});let ae=await Xu(i,k.stageId,"files",L.path,Q,b);a("Publishing\u2026"),b.step("publishing on the server");let ee=await yt(i,W.stageApply,{stage:k.stageId,chunks:{db:ie,files:ae}},a,b);if(ee.step!=="applied")throw a(`Publishing failed: ${ee.error??"unknown error"}. Rolling back\u2026`),await yt(i,W.rollback,{stage:k.stageId},a,b),N=!0,new y("push_failed",`Publishing failed and live was put back as it was: ${ee.error??"unknown error"}`);v=!0,a("Checking the live site\u2026"),b.step("checking the live site");let q=await gm(s),ne=q.filter((ce)=>!ce.ok);if(ne.length)throw a("Live pages aren't loading properly. Rolling back\u2026"),await yt(i,W.rollback,{stage:k.stageId},a,b),N=!0,new y("push_broke_site",`The published site didn't load properly, so wpsync put the old one back:
${ne.map((ce)=>`  ${ce.url} (HTTP ${ce.status})`).join(`
`)}`,"Check those pages locally (ddev logs shows PHP errors), fix, and publish again.");return{plan:d,applied:!0,stageId:k.stageId,checks:q,skipped:ee.skipped,backupDir:_}}catch(O){if(N)E();else if(!v){if(await yt(i,W.finalize,{stage:k.stageId},()=>{}).then(()=>!0,()=>!1))E();else if(O instanceof y)throw new y(O.code,`${O.message}
Live may be part-way changed.`,"Run wpsync rollback to put it back exactly as it was.")}throw O}finally{um(ar(r),{recursive:!0,force:!0})}}finally{b.stop()}})}function jo(e){let t=[`Publishing would replace ${e.homeUrl} with this local copy:`];t.push(`  Database   ${D(e.database.tables)} tables (${Y(e.database.bytes)})`),t.push(`  Files      ${D(e.files.upload.length)} to upload (${Y(e.files.uploadBytes)}), ${D(e.files.remove.length)} to delete on live`);for(let i of e.files.remove.slice(0,10))t.push(`               delete ${i}`);if(e.files.remove.length>10)t.push(`               \u2026and ${D(e.files.remove.length-10)} more`);if(e.theme.live!==e.theme.local)t.push(`  Theme      ${e.theme.live} \u2192 ${e.theme.local}`);let{added:n,removed:r,updated:o}=e.plugins;if(n.length)t.push(`  Plugins added    ${n.map((i)=>`${i.name} ${i.local}`).join(", ")}`);if(r.length)t.push(`  Plugins removed  ${r.map((i)=>`${i.name} ${i.live}`).join(", ")}`);if(o.length)t.push(`  Plugins updated  ${o.map((i)=>`${i.name} ${i.live} \u2192 ${i.local}`).join(", ")}`);let s=e.liveChanges;if(s){let a=[...Object.entries(s.posts).map(([c,l])=>`${D(l)} ${c}`),s.comments?`${D(s.comments)} comments`:"",s.users?`${D(s.users)} new users`:""].filter(Boolean);t.push(a.length?`
Warning: since ${s.since}, people changed things on live that publishing will overwrite: ${a.join(", ")}. Pull first to keep them.`:`
Nothing changed on live since ${s.since}.`)}else t.push(`
wpsync can't tell what changed on live: this copy has no pull time.`);return t.join(`
`)}async function Xu(e,t,n,r,o,s){let i=[],a=0;for(let p of Ju(r,o))i.push({seq:a++,data:pm(p)});let c=0,l=0,u=0;return s?.update({done:0,total:i.length}),await Promise.all(Array.from({length:Math.min(3,i.length)},async()=>{while(c<i.length){let{seq:p,data:d}=i[c++];await e.bridge(Zl,W.stageChunk,{method:"PUT",query:{stage:t,part:n,seq:String(p),sha256:cm("sha256").update(d).digest("hex")},bytes:d}),s?.update({done:++l,bytes:u+=d.length})}})),i.length}async function yt(e,t,n,r,o){let s="";for(;;){let i=await e.bridge(Ul,t,{method:"POST",body:n});o?.update({done:i.progress?.done??0,total:i.progress?.total,detail:i.step});let a=i.progress?`${i.step} (${Math.round(100*i.progress.done/Math.max(1,i.progress.total))}%)`:i.step;if(a!==s)r(`  ${a}`);if(s=a,i.done)return i}}async function gm(e){let t=new Set([`${e.homeUrl}/`]);for(let[r,o]of[["/wp/v2/pages","2"],["/wp/v2/posts","1"]]){let s=await j(e.restUrl(r,{per_page:o,_fields:"link"})).catch(()=>null),i=s?.status===200?fe(s.text):null;if(Array.isArray(i)){for(let a of i)if(typeof a?.link==="string")t.add(a.link)}}let n=[];for(let r of t){let o=await j(r).catch(()=>null),s=o?.status??0,i=!o||/There has been a critical error|Fatal error|Parse error/i.test(o.text);n.push({url:r,status:s,ok:s===200&&!i})}return n}async function ep(e,t){let n=await Bo(e,t.store),r=n.meta.lastPush;if(!r||r.finalized)throw new y("nothing_to_roll_back","There's no push to roll back (the last one was finalized, or there wasn't one).");await Fo(t,{action:"rollback",host:new URL(n.site.homeUrl).host,summary:`The publish of ${r.at} will be undone.`}),await n.rest.withBridge(async()=>{let i=await yt(n.rest,W.rollback,{stage:r.stageId},n.log);if(i.step!=="rolled-back")throw new y("rollback_failed",`Rollback stopped: ${i.error??"unknown error"}`)});let{lastPush:o,...s}=n.meta;n.project.write(s)}async function tp(e,t){let n=await Bo(e,t.store),r=n.meta.lastPush;if(!r||r.finalized)throw new y("nothing_to_finalize","There's no push waiting to be finalized.");await Fo(t,{action:"finalize",host:new URL(n.site.homeUrl).host,summary:`Keeps the publish of ${r.at}.`}),await n.rest.withBridge(async()=>{let o=await yt(n.rest,W.finalize,{stage:r.stageId},n.log);if(o.step!=="finalized")throw new y("finalize_failed",`Finalize stopped: ${o.error??"unknown error"}`)}),n.project.write({...n.meta,lastPush:{...r,finalized:!0}})}import{execFileSync as ym}from"child_process";function wt(e){return`"${e.replace(/\\/g,"\\\\").replace(/"/g,"\\\"")}"`}function np(e){try{return ym("osascript",["-"],{input:e,encoding:"utf8",stdio:["pipe","pipe","pipe"]}).replace(/\n$/,"")}catch(t){let n=t.stderr??"";if(/-128/.test(n))throw new y("cancelled","Cancelled in the dialog; nothing was changed.");throw new y("dialog_failed","Couldn't show the confirmation dialog.","Run wpsync on a Mac where you're logged in to the desktop.")}}function wm(e){let t=e.summary.length>900?`${e.summary.slice(0,900)}\u2026`:e.summary;if(e.action==="push"){let o=`Publishing REPLACES the live site ${e.host} with your local copy.

${t}

To go ahead, type the live site's domain:`;return`text returned of (display dialog ${wt(o)} default answer "" with title "wpsync: publish" with icon caution buttons {"Cancel", "Publish"} default button "Publish" cancel button "Cancel")`}let n=e.action==="rollback"?"Roll back":"Finalize",r=e.action==="rollback"?`Put ${e.host} back as it was before the last publish?

${t}`:`Keep the last publish on ${e.host} and delete the old version saved on the server? After this, rollback is no longer possible.

${t}`;return`button returned of (display dialog ${wt(r)} with title "wpsync: ${n.toLowerCase()}" with icon caution buttons {"Cancel", ${wt(n)}} default button "Cancel" cancel button "Cancel")`}var cr=async(e)=>{let t=np(wm(e)).trim();if(e.action==="push")return t.toLowerCase()===e.host.toLowerCase();return t.length>0},rp=async(e,t="")=>{let n=`Enter an admin username and an Application Password for ${e.homeUrl}.

To make one: in that site's wp-admin, go to Users \u2192 Profile \u2192 Application Passwords, add one named "wpsync", and copy it.

Username:`,r=[`set u to text returned of (display dialog ${wt(n)} default answer ${wt(t)} with title "wpsync" buttons {"Cancel", "Next"} default button "Next" cancel button "Cancel")`,`set p to text returned of (display dialog ("Application Password for " & u & " at " & ${wt(e.homeUrl)} & ":") default answer "" with hidden answer with title "wpsync" buttons {"Cancel", "Connect"} default button "Connect" cancel button "Cancel")`,"return u & linefeed & p"].join(`
`),o=np(r),s=o.indexOf(`
`),i=o.slice(0,s).trim(),a=o.slice(s+1).trim();if(s<0||!i||!a)throw new y("cancelled","No username or Application Password entered.");return{username:i,applicationPassword:a}};import{execFileSync as Mo}from"child_process";var _m=S({homeUrl:w(),siteUrl:w(),username:w(),applicationPassword:w(),applicationPasswordUuid:w(),applicationPasswordName:w(),connectedAt:w()});class ve{service;constructor(e="wpsync"){this.service=e}async get(e){let t;try{t=Mo("security",["find-generic-password","-s",this.service,"-a",e,"-w"],{encoding:"utf8",stdio:["ignore","pipe","ignore"]}).trim()}catch{return null}let n=_m.safeParse($m(t));return n.success?n.data:null}async set(e,t){let n=Buffer.from(JSON.stringify(t)).toString("base64"),r=`add-generic-password -U -s ${lr(this.service)} -a ${lr(e)} -l ${lr(`wpsync ${e}`)} -w ${lr(n)}
`;if(Mo("security",["-i"],{input:r,stdio:["pipe","ignore","ignore"]}),(await this.get(e))?.applicationPasswordUuid!==t.applicationPasswordUuid)throw new y("keychain_failed","Couldn't save the site's key in the macOS Keychain.")}async delete(e){try{Mo("security",["delete-generic-password","-s",this.service,"-a",e],{stdio:"ignore"})}catch{}}}function lr(e){if(/["\\\n]/.test(e))throw Error(`can't pass ${JSON.stringify(e)} to security -i`);return`"${e}"`}function $m(e){try{return JSON.parse(Buffer.from(e,"base64").toString("utf8"))}catch{return}}var Ho="0.1.0",op=`wpsync ${Ho}

Usage:
  wpsync new <site-url> [--dir <folder>]
      Set up a local copy, step by step, picking up where it stopped: the folder (start
      gate), checks of this Mac and the site, connect, pull, verify. Stops at the first
      thing you need to do, listing everything that needs fixing.

  wpsync init <site-url> [--dir <folder>]
      Make the site's project folder (default ~/wp-sites/<host>) with its CLAUDE.md
      and Claude Code permissions, ready for a session started in it. Contacts nothing.

  wpsync connect <site-url> [--user <username>] [--application-password]
      Sign in once (a macOS dialog asks for the password), create wpsync's own
      Application Password, and install the wpsync bridge, switched off. For sites with
      a protected login, --application-password asks for one you made in your profile.

  wpsync doctor --local | <site-url> [--json]
      Check this Mac, or a site, before anything changes; lists every problem with its fix.

  wpsync status [--dir <folder>] [--json]
      Where a site project stands, and what to do next.

  wpsync verify [--dir <folder>] [--json]
      Check the local copy works: pages, wp-admin, permalinks, leftover live addresses,
      images, and the same plugins and theme as live.

  wpsync disconnect <site-url>
      Remove the bridge from the site and revoke wpsync's key.

  wpsync pull <site-url> [--dir <folder>] [--name <ddev-name>] [--overwrite-code]
      Copy the live site into a local DDEV project (default folder:
      ~/wp-sites/<host>). The first pull creates the project; later
      pulls download only what changed. Code you track in git is never
      overwritten unless you add --overwrite-code. The live site is only read.

  wpsync push [--dry-run] [--include-htaccess] [--dir <folder>]
      Publish: replace the live site (database and files) with the local copy. A macOS
      dialog shows what will change and asks you to type the live domain; --dry-run
      only shows it. Live's wp-config.php, .htaccess and host-added files are kept.
      Backs up what changes into backups/ first; checks live after.

  wpsync rollback [--dir <folder>]
      Put live back as it was before the last push (confirmed in a dialog).

  wpsync finalize [--dir <folder>]
      Keep the last push and delete the old version saved on the server (confirmed in
      a dialog).

  wpsync update-rules [--dir <folder>]
      Refresh the WordPress rules in a project's CLAUDE.md from this wpsync.

  wpsync --version
  wpsync help

For local development sites only, --allow-http accepts an http:// address.
`,bm=new Set(["user","dir","name"]);function we(e,t){let n=e.flags.get(t);return typeof n==="string"?n:void 0}function vm(e){let t=[],n=new Map;for(let r=0;r<e.length;r++){let o=e[r];if(!o.startsWith("--")){t.push(o);continue}let[s,i]=o.slice(2).split("=",2),a=e[r+1];if(i!==void 0)n.set(s,i);else if(bm.has(s)&&a&&!a.startsWith("--"))n.set(s,e[++r]);else n.set(s,!0)}return{command:t.shift(),positional:t,flags:n}}async function Pm(e){let t=e.positional[0];if(!t)throw new Be("connect needs the site's address, e.g. wpsync connect https://example.com");let n=e.flags.get("user"),r=await Vn({url:t,username:typeof n==="string"?n:void 0,useApplicationPassword:e.flags.has("application-password"),allowHttp:e.flags.has("allow-http"),log:(i)=>console.log(i)},{credentials:Zo,applicationPassword:rp,store:new ve}),{info:o}=r,s=o.plugins.filter((i)=>i.active&&i.file!=="wpsync-bridge/wpsync-bridge.php").length;if(console.log(`
Connected to ${o.site.name} (${r.site.homeUrl})
  Signed in as   ${r.connection.username}; key "${r.connection.applicationPasswordName}" saved in the Keychain
  Bridge         ${r.bridge==="uploaded"?"installed":"already installed"}, version ${o.bridge.version}, switched off
  WordPress      ${o.wordpress.version}${o.site.multisite?" (multisite: not supported yet)":""}
  PHP            ${o.php.version}
  Database       ${o.database.engine} ${o.database.version}
  Web server     ${o.server.software??"unknown"}
  Theme          ${o.theme.name} ${o.theme.version}${o.theme.template!==o.theme.stylesheet?` (child of ${o.theme.template})`:""}
  Plugins        ${s} active of ${o.plugins.length-1}`),!o.capabilities.fileModsAllowed)console.log(`
Warning: this site doesn't allow file changes (DISALLOW_FILE_MODS). Publishing to it won't work.`)}async function xm(e){let t=e.positional[0];if(!t)throw new Be("pull needs the site's address, e.g. wpsync pull https://example.com");let n=await rr({url:t,dir:we(e,"dir"),name:we(e,"name"),allowHttp:e.flags.has("allow-http"),overwriteCode:e.flags.has("overwrite-code"),log:(r)=>console.log(r)},{store:new ve});console.log(`
${n.firstPull?"Pulled":"Refreshed"} the local copy
  Folder     ${n.projectDir}
  Local URL  ${n.localUrl}
  Database   ${D(n.tables)} tables, ${D(n.rows)} rows
  Files      ${D(n.filesFetched)} downloaded (${Y(n.bytesFetched)}), ${D(n.filesDeleted)} deleted, ${D(n.filesUnchanged)} unchanged`);for(let r of n.warnings)console.log(`
Note: ${r}`);nr("wpsync: pull finished",`The local copy of ${t} is ready.`)}function Sm(e){let t=e.positional[0];if(!t)throw new Be("init needs the site's address, e.g. wpsync init https://example.com");let n=er(t,{dir:we(e,"dir"),allowHttp:e.flags.has("allow-http")});console.log(`${n.created?"Created":"Already set up"}: ${n.project.dir}
  Site: ${n.homeUrl} (setup pending: nothing has been pulled yet)

Next: start a new Claude Code session in that folder, so its CLAUDE.md and permissions load.
  Desktop app: start a new session on the folder; optionally set the permission mode to
               Bypass permissions.
  Terminal:    cd "${n.project.dir}" && claude
               (or claude --dangerously-skip-permissions to skip prompts)
Then say "continue my wp-dev project".`)}function km(e){let t=Du(we(e,"dir"));console.log(t.changed?`Updated the rules in ${t.path}`:`The rules in ${t.path} are already current.`)}async function Em(e){let t=e.flags.has("dry-run"),n=await Qu({dir:we(e,"dir"),dryRun:t,includeHtaccess:e.flags.has("include-htaccess"),allowHttp:e.flags.has("allow-http"),log:(r)=>console.log(r)},{store:new ve,confirm:cr});if(!n.applied){console.log(jo(n.plan)),console.log(`
To publish: wpsync push (a dialog asks you to type the live domain).`);return}console.log(`
Published to ${n.plan.homeUrl}`),nr("wpsync: publish finished",`${n.plan.homeUrl} now has the local copy. Check it, then finalize or roll back.`);for(let r of n.checks??[])console.log(`  ${r.ok?"ok ":"BAD"} ${r.status} ${r.url}`);if(n.skipped?.length)console.log(`  Left alone on live (protected): ${n.skipped.join(", ")}`);console.log(`  Backup of what changed: ${n.backupDir}`),console.log(`
The old version stays saved on the server. When you're happy: wpsync finalize. To undo: wpsync rollback.`)}async function zm(e){await ep({dir:we(e,"dir"),allowHttp:e.flags.has("allow-http"),log:(t)=>console.log(t)},{store:new ve,confirm:cr}),console.log("Rolled back: live is as it was before the last push.")}async function Tm(e){await tp({dir:we(e,"dir"),allowHttp:e.flags.has("allow-http"),log:(t)=>console.log(t)},{store:new ve,confirm:cr}),console.log("Finalized: the previous version on the server is deleted. (backups/ still has a local copy.)")}function qo(e,t,n){console.log(e.flags.has("json")?JSON.stringify(t,null,2):n)}async function Rm(e){let t=e.positional[0];if(!t&&!e.flags.has("local"))throw new Be("doctor needs --local or a site address.");let n=t?await Mt(t,new ve,{allowHttp:e.flags.has("allow-http")}):await Yn();if(t&&n.some((r)=>r.cause==="wordfence-application-passwords"))nt(we(e,"dir")??process.cwd(),Oe(t,e.flags.has("allow-http")));return qo(e,n,`${Gn(n)}

${Fe(n)?"Nothing to fix.":"Fix the FIX lines above, then run this again."}`),Fe(n)?0:1}async function Am(e){let t=await or({dir:we(e,"dir"),allowHttp:e.flags.has("allow-http")},new ve),n=[`Folder   ${t.dir}`,`Phase    ${t.phase}`];if(t.homeUrl)n.push(`Live     ${t.homeUrl}${t.connected?t.keyWorks?" (connected)":" (key no longer works)":" (not connected)"}`);if(t.localUrl)n.push(`Local    ${t.localUrl}${t.ddevRunning?" (running)":""}`);if(t.lastPull)n.push(`Pulled   ${t.lastPull}`);if(t.lastPush)n.push(`Pushed   ${t.lastPush.at}${t.lastPush.finalized?"":" (waiting for finalize or rollback)"}`);if(t.wordfence==="switched-off")n.push('Wordfence  "Disable WordPress application passwords" is off for wpsync: switch it back on when done');if(t.wordfence==="back-on")n.push('Wordfence  "Disable WordPress application passwords" is on (switch it off before pulling or publishing)');n.push(`Next     ${t.next}`),qo(e,t,n.join(`
`))}async function Cm(e){let t=await sr({dir:we(e,"dir")});return qo(e,t,`${Gn(t)}

${Fe(t)?"The local copy works.":"Fix the FIX lines above, then run wpsync verify again."}`),Fe(t)?0:1}async function Om(e){let t=e.positional[0];if(!t)throw new Be("new needs the site's address, e.g. wpsync new https://example.com");let n=await Uu(t,{dir:we(e,"dir"),allowHttp:e.flags.has("allow-http"),log:(r)=>console.log(r)},{store:new ve,credentials:Zo});if(e.flags.has("json"))console.log(JSON.stringify(n,null,2));else if(n.stoppedAt==="start-gate")console.log(`Created ${n.dir} for ${n.homeUrl}.

Next: start a new Claude Code session in that folder (optionally with Bypass permissions),
then say "continue my wp-dev project" (or run wpsync new ${n.homeUrl} there).`);else console.log(Gn(n.checks)),console.log(n.stoppedAt==="done"?`
Local site is ready at ${n.localUrl}.`:`
Stopped at the ${n.stoppedAt==="mac-checks"?"Mac":"site"} checks: fix the FIX lines, then run wpsync new ${n.homeUrl} again.`);return n.stoppedAt==="done"||n.stoppedAt==="start-gate"?0:1}async function Im(e){let t=e.positional[0];if(!t)throw new Be("disconnect needs the site's address.");let n=await Su({url:t,allowHttp:e.flags.has("allow-http")},{store:new ve});console.log(`Disconnected from ${n.homeUrl}.
  Bridge plugin  ${n.bridgeRemoved?"removed":"not removed: delete wpsync bridge under Plugins in wp-admin"}
  wpsync's key   ${n.keyRevoked?"revoked":"not revoked: remove it under Users \u2192 Profile \u2192 Application Passwords"}
  Keychain       forgotten`)}var Nm=new Set(["pull","push","rollback","finalize","new"]);class Be extends Error{}async function Dm(e){let t=vm(e);try{switch(t.command){case"connect":return await Pm(t),0;case"pull":return await xm(t),0;case"push":return await Em(t),0;case"rollback":return await zm(t),0;case"finalize":return await Tm(t),0;case"new":return await Om(t);case"doctor":return await Rm(t);case"status":return await Am(t),0;case"verify":return await Cm(t);case"disconnect":return await Im(t),0;case"init":return Sm(t),0;case"update-rules":return km(t),0;case void 0:case"help":return console.log(op),0;default:if(t.flags.has("version"))return console.log(`wpsync ${Ho} (bridge ${Ge})`),0;throw new Be(`Unknown command "${t.command}".`)}}catch(n){if(n instanceof Be)return console.error(`${n.message}

${op}`),2;if(n instanceof y){if(Nm.has(t.command??"")&&n.code!=="cancelled"&&n.code!=="not_confirmed")nr(`wpsync: ${t.command} stopped`,n.message.split(`
`)[0].slice(0,180));if(n.code==="wordfence_application_passwords"&&t.positional[0])try{nt(we(t,"dir")??process.cwd(),Oe(t.positional[0],t.flags.has("allow-http")))}catch{}return console.error(`
${n.message}${n.hint?`
${n.hint}`:""}`),1}throw n}}var sp=process.argv.slice(2);if(sp[0]==="--version")console.log(`wpsync ${Ho} (bridge ${Ge})`);else process.exitCode=await Dm(sp);
