(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))s(l);new MutationObserver(l=>{for(const a of l)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(l){const a={};return l.integrity&&(a.integrity=l.integrity),l.referrerPolicy&&(a.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?a.credentials="include":l.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(l){if(l.ep)return;l.ep=!0;const a=r(l);fetch(l.href,a)}})();function wu(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var Eo={exports:{}},Cs={},zo={exports:{}},U={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var vr=Symbol.for("react.element"),ku=Symbol.for("react.portal"),bu=Symbol.for("react.fragment"),Su=Symbol.for("react.strict_mode"),Cu=Symbol.for("react.profiler"),Pu=Symbol.for("react.provider"),Eu=Symbol.for("react.context"),zu=Symbol.for("react.forward_ref"),Tu=Symbol.for("react.suspense"),Du=Symbol.for("react.memo"),Au=Symbol.for("react.lazy"),gi=Symbol.iterator;function Mu(e){return e===null||typeof e!="object"?null:(e=gi&&e[gi]||e["@@iterator"],typeof e=="function"?e:null)}var To={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Do=Object.assign,Ao={};function Pn(e,t,r){this.props=e,this.context=t,this.refs=Ao,this.updater=r||To}Pn.prototype.isReactComponent={};Pn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};Pn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function Mo(){}Mo.prototype=Pn.prototype;function ga(e,t,r){this.props=e,this.context=t,this.refs=Ao,this.updater=r||To}var va=ga.prototype=new Mo;va.constructor=ga;Do(va,Pn.prototype);va.isPureReactComponent=!0;var vi=Array.isArray,Io=Object.prototype.hasOwnProperty,ya={current:null},_o={key:!0,ref:!0,__self:!0,__source:!0};function Ro(e,t,r){var s,l={},a=null,i=null;if(t!=null)for(s in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(a=""+t.key),t)Io.call(t,s)&&!_o.hasOwnProperty(s)&&(l[s]=t[s]);var c=arguments.length-2;if(c===1)l.children=r;else if(1<c){for(var o=Array(c),p=0;p<c;p++)o[p]=arguments[p+2];l.children=o}if(e&&e.defaultProps)for(s in c=e.defaultProps,c)l[s]===void 0&&(l[s]=c[s]);return{$$typeof:vr,type:e,key:a,ref:i,props:l,_owner:ya.current}}function Iu(e,t){return{$$typeof:vr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function ja(e){return typeof e=="object"&&e!==null&&e.$$typeof===vr}function _u(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var yi=/\/+/g;function Ys(e,t){return typeof e=="object"&&e!==null&&e.key!=null?_u(""+e.key):t.toString(36)}function Hr(e,t,r,s,l){var a=typeof e;(a==="undefined"||a==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(a){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case vr:case ku:i=!0}}if(i)return i=e,l=l(i),e=s===""?"."+Ys(i,0):s,vi(l)?(r="",e!=null&&(r=e.replace(yi,"$&/")+"/"),Hr(l,t,r,"",function(p){return p})):l!=null&&(ja(l)&&(l=Iu(l,r+(!l.key||i&&i.key===l.key?"":(""+l.key).replace(yi,"$&/")+"/")+e)),t.push(l)),1;if(i=0,s=s===""?".":s+":",vi(e))for(var c=0;c<e.length;c++){a=e[c];var o=s+Ys(a,c);i+=Hr(a,t,r,o,l)}else if(o=Mu(e),typeof o=="function")for(e=o.call(e),c=0;!(a=e.next()).done;)a=a.value,o=s+Ys(a,c++),i+=Hr(a,t,r,o,l);else if(a==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function Pr(e,t,r){if(e==null)return e;var s=[],l=0;return Hr(e,s,"","",function(a){return t.call(r,a,l++)}),s}function Ru(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var Ne={current:null},Wr={transition:null},Ou={ReactCurrentDispatcher:Ne,ReactCurrentBatchConfig:Wr,ReactCurrentOwner:ya};function Oo(){throw Error("act(...) is not supported in production builds of React.")}U.Children={map:Pr,forEach:function(e,t,r){Pr(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return Pr(e,function(){t++}),t},toArray:function(e){return Pr(e,function(t){return t})||[]},only:function(e){if(!ja(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};U.Component=Pn;U.Fragment=bu;U.Profiler=Cu;U.PureComponent=ga;U.StrictMode=Su;U.Suspense=Tu;U.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Ou;U.act=Oo;U.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var s=Do({},e.props),l=e.key,a=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(a=t.ref,i=ya.current),t.key!==void 0&&(l=""+t.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(o in t)Io.call(t,o)&&!_o.hasOwnProperty(o)&&(s[o]=t[o]===void 0&&c!==void 0?c[o]:t[o])}var o=arguments.length-2;if(o===1)s.children=r;else if(1<o){c=Array(o);for(var p=0;p<o;p++)c[p]=arguments[p+2];s.children=c}return{$$typeof:vr,type:e.type,key:l,ref:a,props:s,_owner:i}};U.createContext=function(e){return e={$$typeof:Eu,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Pu,_context:e},e.Consumer=e};U.createElement=Ro;U.createFactory=function(e){var t=Ro.bind(null,e);return t.type=e,t};U.createRef=function(){return{current:null}};U.forwardRef=function(e){return{$$typeof:zu,render:e}};U.isValidElement=ja;U.lazy=function(e){return{$$typeof:Au,_payload:{_status:-1,_result:e},_init:Ru}};U.memo=function(e,t){return{$$typeof:Du,type:e,compare:t===void 0?null:t}};U.startTransition=function(e){var t=Wr.transition;Wr.transition={};try{e()}finally{Wr.transition=t}};U.unstable_act=Oo;U.useCallback=function(e,t){return Ne.current.useCallback(e,t)};U.useContext=function(e){return Ne.current.useContext(e)};U.useDebugValue=function(){};U.useDeferredValue=function(e){return Ne.current.useDeferredValue(e)};U.useEffect=function(e,t){return Ne.current.useEffect(e,t)};U.useId=function(){return Ne.current.useId()};U.useImperativeHandle=function(e,t,r){return Ne.current.useImperativeHandle(e,t,r)};U.useInsertionEffect=function(e,t){return Ne.current.useInsertionEffect(e,t)};U.useLayoutEffect=function(e,t){return Ne.current.useLayoutEffect(e,t)};U.useMemo=function(e,t){return Ne.current.useMemo(e,t)};U.useReducer=function(e,t,r){return Ne.current.useReducer(e,t,r)};U.useRef=function(e){return Ne.current.useRef(e)};U.useState=function(e){return Ne.current.useState(e)};U.useSyncExternalStore=function(e,t,r){return Ne.current.useSyncExternalStore(e,t,r)};U.useTransition=function(){return Ne.current.useTransition()};U.version="18.3.1";zo.exports=U;var j=zo.exports;const Lo=wu(j);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Lu=j,Vu=Symbol.for("react.element"),Uu=Symbol.for("react.fragment"),Fu=Object.prototype.hasOwnProperty,$u=Lu.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Bu={key:!0,ref:!0,__self:!0,__source:!0};function Vo(e,t,r){var s,l={},a=null,i=null;r!==void 0&&(a=""+r),t.key!==void 0&&(a=""+t.key),t.ref!==void 0&&(i=t.ref);for(s in t)Fu.call(t,s)&&!Bu.hasOwnProperty(s)&&(l[s]=t[s]);if(e&&e.defaultProps)for(s in t=e.defaultProps,t)l[s]===void 0&&(l[s]=t[s]);return{$$typeof:Vu,type:e,key:a,ref:i,props:l,_owner:$u.current}}Cs.Fragment=Uu;Cs.jsx=Vo;Cs.jsxs=Vo;Eo.exports=Cs;var n=Eo.exports,bl={},Uo={exports:{}},Ae={},Fo={exports:{}},$o={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(T,M){var L=T.length;T.push(M);e:for(;0<L;){var H=L-1>>>1,Z=T[H];if(0<l(Z,M))T[H]=M,T[L]=Z,L=H;else break e}}function r(T){return T.length===0?null:T[0]}function s(T){if(T.length===0)return null;var M=T[0],L=T.pop();if(L!==M){T[0]=L;e:for(var H=0,Z=T.length,Be=Z>>>1;H<Be;){var Ie=2*(H+1)-1,lt=T[Ie],He=Ie+1,vt=T[He];if(0>l(lt,L))He<Z&&0>l(vt,lt)?(T[H]=vt,T[He]=L,H=He):(T[H]=lt,T[Ie]=L,H=Ie);else if(He<Z&&0>l(vt,L))T[H]=vt,T[He]=L,H=He;else break e}}return M}function l(T,M){var L=T.sortIndex-M.sortIndex;return L!==0?L:T.id-M.id}if(typeof performance=="object"&&typeof performance.now=="function"){var a=performance;e.unstable_now=function(){return a.now()}}else{var i=Date,c=i.now();e.unstable_now=function(){return i.now()-c}}var o=[],p=[],h=1,x=null,m=3,u=!1,v=!1,N=!1,S=typeof setTimeout=="function"?setTimeout:null,f=typeof clearTimeout=="function"?clearTimeout:null,d=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(T){for(var M=r(p);M!==null;){if(M.callback===null)s(p);else if(M.startTime<=T)s(p),M.sortIndex=M.expirationTime,t(o,M);else break;M=r(p)}}function b(T){if(N=!1,g(T),!v)if(r(o)!==null)v=!0,st(P);else{var M=r(p);M!==null&&O(b,M.startTime-T)}}function P(T,M){v=!1,N&&(N=!1,f(C),C=-1),u=!0;var L=m;try{for(g(M),x=r(o);x!==null&&(!(x.expirationTime>M)||T&&!Y());){var H=x.callback;if(typeof H=="function"){x.callback=null,m=x.priorityLevel;var Z=H(x.expirationTime<=M);M=e.unstable_now(),typeof Z=="function"?x.callback=Z:x===r(o)&&s(o),g(M)}else s(o);x=r(o)}if(x!==null)var Be=!0;else{var Ie=r(p);Ie!==null&&O(b,Ie.startTime-M),Be=!1}return Be}finally{x=null,m=L,u=!1}}var z=!1,w=null,C=-1,V=5,R=-1;function Y(){return!(e.unstable_now()-R<V)}function $(){if(w!==null){var T=e.unstable_now();R=T;var M=!0;try{M=w(!0,T)}finally{M?ve():(z=!1,w=null)}}else z=!1}var ve;if(typeof d=="function")ve=function(){d($)};else if(typeof MessageChannel<"u"){var $e=new MessageChannel,gt=$e.port2;$e.port1.onmessage=$,ve=function(){gt.postMessage(null)}}else ve=function(){S($,0)};function st(T){w=T,z||(z=!0,ve())}function O(T,M){C=S(function(){T(e.unstable_now())},M)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(T){T.callback=null},e.unstable_continueExecution=function(){v||u||(v=!0,st(P))},e.unstable_forceFrameRate=function(T){0>T||125<T?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):V=0<T?Math.floor(1e3/T):5},e.unstable_getCurrentPriorityLevel=function(){return m},e.unstable_getFirstCallbackNode=function(){return r(o)},e.unstable_next=function(T){switch(m){case 1:case 2:case 3:var M=3;break;default:M=m}var L=m;m=M;try{return T()}finally{m=L}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(T,M){switch(T){case 1:case 2:case 3:case 4:case 5:break;default:T=3}var L=m;m=T;try{return M()}finally{m=L}},e.unstable_scheduleCallback=function(T,M,L){var H=e.unstable_now();switch(typeof L=="object"&&L!==null?(L=L.delay,L=typeof L=="number"&&0<L?H+L:H):L=H,T){case 1:var Z=-1;break;case 2:Z=250;break;case 5:Z=1073741823;break;case 4:Z=1e4;break;default:Z=5e3}return Z=L+Z,T={id:h++,callback:M,priorityLevel:T,startTime:L,expirationTime:Z,sortIndex:-1},L>H?(T.sortIndex=L,t(p,T),r(o)===null&&T===r(p)&&(N?(f(C),C=-1):N=!0,O(b,L-H))):(T.sortIndex=Z,t(o,T),v||u||(v=!0,st(P))),T},e.unstable_shouldYield=Y,e.unstable_wrapCallback=function(T){var M=m;return function(){var L=m;m=M;try{return T.apply(this,arguments)}finally{m=L}}}})($o);Fo.exports=$o;var Hu=Fo.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wu=j,De=Hu;function E(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)t+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Bo=new Set,tr={};function Yt(e,t){jn(e,t),jn(e+"Capture",t)}function jn(e,t){for(tr[e]=t,e=0;e<t.length;e++)Bo.add(t[e])}var pt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Sl=Object.prototype.hasOwnProperty,Gu=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,ji={},Ni={};function qu(e){return Sl.call(Ni,e)?!0:Sl.call(ji,e)?!1:Gu.test(e)?Ni[e]=!0:(ji[e]=!0,!1)}function Qu(e,t,r,s){if(r!==null&&r.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return s?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Ku(e,t,r,s){if(t===null||typeof t>"u"||Qu(e,t,r,s))return!0;if(s)return!1;if(r!==null)switch(r.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function we(e,t,r,s,l,a,i){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=s,this.attributeNamespace=l,this.mustUseProperty=r,this.propertyName=e,this.type=t,this.sanitizeURL=a,this.removeEmptyString=i}var pe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){pe[e]=new we(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];pe[t]=new we(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){pe[e]=new we(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){pe[e]=new we(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){pe[e]=new we(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){pe[e]=new we(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){pe[e]=new we(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){pe[e]=new we(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){pe[e]=new we(e,5,!1,e.toLowerCase(),null,!1,!1)});var Na=/[\-:]([a-z])/g;function wa(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Na,wa);pe[t]=new we(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Na,wa);pe[t]=new we(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Na,wa);pe[t]=new we(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){pe[e]=new we(e,1,!1,e.toLowerCase(),null,!1,!1)});pe.xlinkHref=new we("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){pe[e]=new we(e,1,!1,e.toLowerCase(),null,!0,!0)});function ka(e,t,r,s){var l=pe.hasOwnProperty(t)?pe[t]:null;(l!==null?l.type!==0:s||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Ku(t,r,l,s)&&(r=null),s||l===null?qu(t)&&(r===null?e.removeAttribute(t):e.setAttribute(t,""+r)):l.mustUseProperty?e[l.propertyName]=r===null?l.type===3?!1:"":r:(t=l.attributeName,s=l.attributeNamespace,r===null?e.removeAttribute(t):(l=l.type,r=l===3||l===4&&r===!0?"":""+r,s?e.setAttributeNS(s,t,r):e.setAttribute(t,r))))}var xt=Wu.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Er=Symbol.for("react.element"),tn=Symbol.for("react.portal"),nn=Symbol.for("react.fragment"),ba=Symbol.for("react.strict_mode"),Cl=Symbol.for("react.profiler"),Ho=Symbol.for("react.provider"),Wo=Symbol.for("react.context"),Sa=Symbol.for("react.forward_ref"),Pl=Symbol.for("react.suspense"),El=Symbol.for("react.suspense_list"),Ca=Symbol.for("react.memo"),jt=Symbol.for("react.lazy"),Go=Symbol.for("react.offscreen"),wi=Symbol.iterator;function In(e){return e===null||typeof e!="object"?null:(e=wi&&e[wi]||e["@@iterator"],typeof e=="function"?e:null)}var ne=Object.assign,Zs;function $n(e){if(Zs===void 0)try{throw Error()}catch(r){var t=r.stack.trim().match(/\n( *(at )?)/);Zs=t&&t[1]||""}return`
`+Zs+e}var Xs=!1;function el(e,t){if(!e||Xs)return"";Xs=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(p){var s=p}Reflect.construct(e,[],t)}else{try{t.call()}catch(p){s=p}e.call(t.prototype)}else{try{throw Error()}catch(p){s=p}e()}}catch(p){if(p&&s&&typeof p.stack=="string"){for(var l=p.stack.split(`
`),a=s.stack.split(`
`),i=l.length-1,c=a.length-1;1<=i&&0<=c&&l[i]!==a[c];)c--;for(;1<=i&&0<=c;i--,c--)if(l[i]!==a[c]){if(i!==1||c!==1)do if(i--,c--,0>c||l[i]!==a[c]){var o=`
`+l[i].replace(" at new "," at ");return e.displayName&&o.includes("<anonymous>")&&(o=o.replace("<anonymous>",e.displayName)),o}while(1<=i&&0<=c);break}}}finally{Xs=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?$n(e):""}function Ju(e){switch(e.tag){case 5:return $n(e.type);case 16:return $n("Lazy");case 13:return $n("Suspense");case 19:return $n("SuspenseList");case 0:case 2:case 15:return e=el(e.type,!1),e;case 11:return e=el(e.type.render,!1),e;case 1:return e=el(e.type,!0),e;default:return""}}function zl(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case nn:return"Fragment";case tn:return"Portal";case Cl:return"Profiler";case ba:return"StrictMode";case Pl:return"Suspense";case El:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Wo:return(e.displayName||"Context")+".Consumer";case Ho:return(e._context.displayName||"Context")+".Provider";case Sa:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case Ca:return t=e.displayName||null,t!==null?t:zl(e.type)||"Memo";case jt:t=e._payload,e=e._init;try{return zl(e(t))}catch{}}return null}function Yu(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return zl(t);case 8:return t===ba?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function It(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function qo(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Zu(e){var t=qo(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),s=""+e[t];if(!e.hasOwnProperty(t)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var l=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return l.call(this)},set:function(i){s=""+i,a.call(this,i)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return s},setValue:function(i){s=""+i},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function zr(e){e._valueTracker||(e._valueTracker=Zu(e))}function Qo(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var r=t.getValue(),s="";return e&&(s=qo(e)?e.checked?"true":"false":e.value),e=s,e!==r?(t.setValue(e),!0):!1}function ns(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Tl(e,t){var r=t.checked;return ne({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function ki(e,t){var r=t.defaultValue==null?"":t.defaultValue,s=t.checked!=null?t.checked:t.defaultChecked;r=It(t.value!=null?t.value:r),e._wrapperState={initialChecked:s,initialValue:r,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Ko(e,t){t=t.checked,t!=null&&ka(e,"checked",t,!1)}function Dl(e,t){Ko(e,t);var r=It(t.value),s=t.type;if(r!=null)s==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(s==="submit"||s==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?Al(e,t.type,r):t.hasOwnProperty("defaultValue")&&Al(e,t.type,It(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function bi(e,t,r){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var s=t.type;if(!(s!=="submit"&&s!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,r||t===e.value||(e.value=t),e.defaultValue=t}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function Al(e,t,r){(t!=="number"||ns(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var Bn=Array.isArray;function fn(e,t,r,s){if(e=e.options,t){t={};for(var l=0;l<r.length;l++)t["$"+r[l]]=!0;for(r=0;r<e.length;r++)l=t.hasOwnProperty("$"+e[r].value),e[r].selected!==l&&(e[r].selected=l),l&&s&&(e[r].defaultSelected=!0)}else{for(r=""+It(r),t=null,l=0;l<e.length;l++){if(e[l].value===r){e[l].selected=!0,s&&(e[l].defaultSelected=!0);return}t!==null||e[l].disabled||(t=e[l])}t!==null&&(t.selected=!0)}}function Ml(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(E(91));return ne({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Si(e,t){var r=t.value;if(r==null){if(r=t.children,t=t.defaultValue,r!=null){if(t!=null)throw Error(E(92));if(Bn(r)){if(1<r.length)throw Error(E(93));r=r[0]}t=r}t==null&&(t=""),r=t}e._wrapperState={initialValue:It(r)}}function Jo(e,t){var r=It(t.value),s=It(t.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),t.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),s!=null&&(e.defaultValue=""+s)}function Ci(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Yo(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Il(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Yo(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Tr,Zo=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,r,s,l){MSApp.execUnsafeLocalFunction(function(){return e(t,r,s,l)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(Tr=Tr||document.createElement("div"),Tr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=Tr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function nr(e,t){if(t){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=t;return}}e.textContent=t}var Gn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Xu=["Webkit","ms","Moz","O"];Object.keys(Gn).forEach(function(e){Xu.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Gn[t]=Gn[e]})});function Xo(e,t,r){return t==null||typeof t=="boolean"||t===""?"":r||typeof t!="number"||t===0||Gn.hasOwnProperty(e)&&Gn[e]?(""+t).trim():t+"px"}function ec(e,t){e=e.style;for(var r in t)if(t.hasOwnProperty(r)){var s=r.indexOf("--")===0,l=Xo(r,t[r],s);r==="float"&&(r="cssFloat"),s?e.setProperty(r,l):e[r]=l}}var ep=ne({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function _l(e,t){if(t){if(ep[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(E(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(E(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(E(61))}if(t.style!=null&&typeof t.style!="object")throw Error(E(62))}}function Rl(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ol=null;function Pa(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Ll=null,hn=null,xn=null;function Pi(e){if(e=Nr(e)){if(typeof Ll!="function")throw Error(E(280));var t=e.stateNode;t&&(t=Ds(t),Ll(e.stateNode,e.type,t))}}function tc(e){hn?xn?xn.push(e):xn=[e]:hn=e}function nc(){if(hn){var e=hn,t=xn;if(xn=hn=null,Pi(e),t)for(e=0;e<t.length;e++)Pi(t[e])}}function rc(e,t){return e(t)}function sc(){}var tl=!1;function lc(e,t,r){if(tl)return e(t,r);tl=!0;try{return rc(e,t,r)}finally{tl=!1,(hn!==null||xn!==null)&&(sc(),nc())}}function rr(e,t){var r=e.stateNode;if(r===null)return null;var s=Ds(r);if(s===null)return null;r=s[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(s=!s.disabled)||(e=e.type,s=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!s;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(E(231,t,typeof r));return r}var Vl=!1;if(pt)try{var _n={};Object.defineProperty(_n,"passive",{get:function(){Vl=!0}}),window.addEventListener("test",_n,_n),window.removeEventListener("test",_n,_n)}catch{Vl=!1}function tp(e,t,r,s,l,a,i,c,o){var p=Array.prototype.slice.call(arguments,3);try{t.apply(r,p)}catch(h){this.onError(h)}}var qn=!1,rs=null,ss=!1,Ul=null,np={onError:function(e){qn=!0,rs=e}};function rp(e,t,r,s,l,a,i,c,o){qn=!1,rs=null,tp.apply(np,arguments)}function sp(e,t,r,s,l,a,i,c,o){if(rp.apply(this,arguments),qn){if(qn){var p=rs;qn=!1,rs=null}else throw Error(E(198));ss||(ss=!0,Ul=p)}}function Zt(e){var t=e,r=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(r=t.return),e=t.return;while(e)}return t.tag===3?r:null}function ac(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function Ei(e){if(Zt(e)!==e)throw Error(E(188))}function lp(e){var t=e.alternate;if(!t){if(t=Zt(e),t===null)throw Error(E(188));return t!==e?null:e}for(var r=e,s=t;;){var l=r.return;if(l===null)break;var a=l.alternate;if(a===null){if(s=l.return,s!==null){r=s;continue}break}if(l.child===a.child){for(a=l.child;a;){if(a===r)return Ei(l),e;if(a===s)return Ei(l),t;a=a.sibling}throw Error(E(188))}if(r.return!==s.return)r=l,s=a;else{for(var i=!1,c=l.child;c;){if(c===r){i=!0,r=l,s=a;break}if(c===s){i=!0,s=l,r=a;break}c=c.sibling}if(!i){for(c=a.child;c;){if(c===r){i=!0,r=a,s=l;break}if(c===s){i=!0,s=a,r=l;break}c=c.sibling}if(!i)throw Error(E(189))}}if(r.alternate!==s)throw Error(E(190))}if(r.tag!==3)throw Error(E(188));return r.stateNode.current===r?e:t}function ic(e){return e=lp(e),e!==null?oc(e):null}function oc(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=oc(e);if(t!==null)return t;e=e.sibling}return null}var cc=De.unstable_scheduleCallback,zi=De.unstable_cancelCallback,ap=De.unstable_shouldYield,ip=De.unstable_requestPaint,se=De.unstable_now,op=De.unstable_getCurrentPriorityLevel,Ea=De.unstable_ImmediatePriority,dc=De.unstable_UserBlockingPriority,ls=De.unstable_NormalPriority,cp=De.unstable_LowPriority,uc=De.unstable_IdlePriority,Ps=null,tt=null;function dp(e){if(tt&&typeof tt.onCommitFiberRoot=="function")try{tt.onCommitFiberRoot(Ps,e,void 0,(e.current.flags&128)===128)}catch{}}var Ke=Math.clz32?Math.clz32:mp,up=Math.log,pp=Math.LN2;function mp(e){return e>>>=0,e===0?32:31-(up(e)/pp|0)|0}var Dr=64,Ar=4194304;function Hn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function as(e,t){var r=e.pendingLanes;if(r===0)return 0;var s=0,l=e.suspendedLanes,a=e.pingedLanes,i=r&268435455;if(i!==0){var c=i&~l;c!==0?s=Hn(c):(a&=i,a!==0&&(s=Hn(a)))}else i=r&~l,i!==0?s=Hn(i):a!==0&&(s=Hn(a));if(s===0)return 0;if(t!==0&&t!==s&&!(t&l)&&(l=s&-s,a=t&-t,l>=a||l===16&&(a&4194240)!==0))return t;if(s&4&&(s|=r&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=s;0<t;)r=31-Ke(t),l=1<<r,s|=e[r],t&=~l;return s}function fp(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function hp(e,t){for(var r=e.suspendedLanes,s=e.pingedLanes,l=e.expirationTimes,a=e.pendingLanes;0<a;){var i=31-Ke(a),c=1<<i,o=l[i];o===-1?(!(c&r)||c&s)&&(l[i]=fp(c,t)):o<=t&&(e.expiredLanes|=c),a&=~c}}function Fl(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function pc(){var e=Dr;return Dr<<=1,!(Dr&4194240)&&(Dr=64),e}function nl(e){for(var t=[],r=0;31>r;r++)t.push(e);return t}function yr(e,t,r){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Ke(t),e[t]=r}function xp(e,t){var r=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var s=e.eventTimes;for(e=e.expirationTimes;0<r;){var l=31-Ke(r),a=1<<l;t[l]=0,s[l]=-1,e[l]=-1,r&=~a}}function za(e,t){var r=e.entangledLanes|=t;for(e=e.entanglements;r;){var s=31-Ke(r),l=1<<s;l&t|e[s]&t&&(e[s]|=t),r&=~l}}var W=0;function mc(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var fc,Ta,hc,xc,gc,$l=!1,Mr=[],Ct=null,Pt=null,Et=null,sr=new Map,lr=new Map,wt=[],gp="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Ti(e,t){switch(e){case"focusin":case"focusout":Ct=null;break;case"dragenter":case"dragleave":Pt=null;break;case"mouseover":case"mouseout":Et=null;break;case"pointerover":case"pointerout":sr.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":lr.delete(t.pointerId)}}function Rn(e,t,r,s,l,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:r,eventSystemFlags:s,nativeEvent:a,targetContainers:[l]},t!==null&&(t=Nr(t),t!==null&&Ta(t)),e):(e.eventSystemFlags|=s,t=e.targetContainers,l!==null&&t.indexOf(l)===-1&&t.push(l),e)}function vp(e,t,r,s,l){switch(t){case"focusin":return Ct=Rn(Ct,e,t,r,s,l),!0;case"dragenter":return Pt=Rn(Pt,e,t,r,s,l),!0;case"mouseover":return Et=Rn(Et,e,t,r,s,l),!0;case"pointerover":var a=l.pointerId;return sr.set(a,Rn(sr.get(a)||null,e,t,r,s,l)),!0;case"gotpointercapture":return a=l.pointerId,lr.set(a,Rn(lr.get(a)||null,e,t,r,s,l)),!0}return!1}function vc(e){var t=Ft(e.target);if(t!==null){var r=Zt(t);if(r!==null){if(t=r.tag,t===13){if(t=ac(r),t!==null){e.blockedOn=t,gc(e.priority,function(){hc(r)});return}}else if(t===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Gr(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var r=Bl(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var s=new r.constructor(r.type,r);Ol=s,r.target.dispatchEvent(s),Ol=null}else return t=Nr(r),t!==null&&Ta(t),e.blockedOn=r,!1;t.shift()}return!0}function Di(e,t,r){Gr(e)&&r.delete(t)}function yp(){$l=!1,Ct!==null&&Gr(Ct)&&(Ct=null),Pt!==null&&Gr(Pt)&&(Pt=null),Et!==null&&Gr(Et)&&(Et=null),sr.forEach(Di),lr.forEach(Di)}function On(e,t){e.blockedOn===t&&(e.blockedOn=null,$l||($l=!0,De.unstable_scheduleCallback(De.unstable_NormalPriority,yp)))}function ar(e){function t(l){return On(l,e)}if(0<Mr.length){On(Mr[0],e);for(var r=1;r<Mr.length;r++){var s=Mr[r];s.blockedOn===e&&(s.blockedOn=null)}}for(Ct!==null&&On(Ct,e),Pt!==null&&On(Pt,e),Et!==null&&On(Et,e),sr.forEach(t),lr.forEach(t),r=0;r<wt.length;r++)s=wt[r],s.blockedOn===e&&(s.blockedOn=null);for(;0<wt.length&&(r=wt[0],r.blockedOn===null);)vc(r),r.blockedOn===null&&wt.shift()}var gn=xt.ReactCurrentBatchConfig,is=!0;function jp(e,t,r,s){var l=W,a=gn.transition;gn.transition=null;try{W=1,Da(e,t,r,s)}finally{W=l,gn.transition=a}}function Np(e,t,r,s){var l=W,a=gn.transition;gn.transition=null;try{W=4,Da(e,t,r,s)}finally{W=l,gn.transition=a}}function Da(e,t,r,s){if(is){var l=Bl(e,t,r,s);if(l===null)pl(e,t,s,os,r),Ti(e,s);else if(vp(l,e,t,r,s))s.stopPropagation();else if(Ti(e,s),t&4&&-1<gp.indexOf(e)){for(;l!==null;){var a=Nr(l);if(a!==null&&fc(a),a=Bl(e,t,r,s),a===null&&pl(e,t,s,os,r),a===l)break;l=a}l!==null&&s.stopPropagation()}else pl(e,t,s,null,r)}}var os=null;function Bl(e,t,r,s){if(os=null,e=Pa(s),e=Ft(e),e!==null)if(t=Zt(e),t===null)e=null;else if(r=t.tag,r===13){if(e=ac(t),e!==null)return e;e=null}else if(r===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return os=e,null}function yc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(op()){case Ea:return 1;case dc:return 4;case ls:case cp:return 16;case uc:return 536870912;default:return 16}default:return 16}}var bt=null,Aa=null,qr=null;function jc(){if(qr)return qr;var e,t=Aa,r=t.length,s,l="value"in bt?bt.value:bt.textContent,a=l.length;for(e=0;e<r&&t[e]===l[e];e++);var i=r-e;for(s=1;s<=i&&t[r-s]===l[a-s];s++);return qr=l.slice(e,1<s?1-s:void 0)}function Qr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Ir(){return!0}function Ai(){return!1}function Me(e){function t(r,s,l,a,i){this._reactName=r,this._targetInst=l,this.type=s,this.nativeEvent=a,this.target=i,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(r=e[c],this[c]=r?r(a):a[c]);return this.isDefaultPrevented=(a.defaultPrevented!=null?a.defaultPrevented:a.returnValue===!1)?Ir:Ai,this.isPropagationStopped=Ai,this}return ne(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=Ir)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=Ir)},persist:function(){},isPersistent:Ir}),t}var En={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ma=Me(En),jr=ne({},En,{view:0,detail:0}),wp=Me(jr),rl,sl,Ln,Es=ne({},jr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Ia,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==Ln&&(Ln&&e.type==="mousemove"?(rl=e.screenX-Ln.screenX,sl=e.screenY-Ln.screenY):sl=rl=0,Ln=e),rl)},movementY:function(e){return"movementY"in e?e.movementY:sl}}),Mi=Me(Es),kp=ne({},Es,{dataTransfer:0}),bp=Me(kp),Sp=ne({},jr,{relatedTarget:0}),ll=Me(Sp),Cp=ne({},En,{animationName:0,elapsedTime:0,pseudoElement:0}),Pp=Me(Cp),Ep=ne({},En,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),zp=Me(Ep),Tp=ne({},En,{data:0}),Ii=Me(Tp),Dp={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ap={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Mp={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ip(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=Mp[e])?!!t[e]:!1}function Ia(){return Ip}var _p=ne({},jr,{key:function(e){if(e.key){var t=Dp[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Qr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Ap[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Ia,charCode:function(e){return e.type==="keypress"?Qr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Qr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Rp=Me(_p),Op=ne({},Es,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),_i=Me(Op),Lp=ne({},jr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Ia}),Vp=Me(Lp),Up=ne({},En,{propertyName:0,elapsedTime:0,pseudoElement:0}),Fp=Me(Up),$p=ne({},Es,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Bp=Me($p),Hp=[9,13,27,32],_a=pt&&"CompositionEvent"in window,Qn=null;pt&&"documentMode"in document&&(Qn=document.documentMode);var Wp=pt&&"TextEvent"in window&&!Qn,Nc=pt&&(!_a||Qn&&8<Qn&&11>=Qn),Ri=" ",Oi=!1;function wc(e,t){switch(e){case"keyup":return Hp.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function kc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var rn=!1;function Gp(e,t){switch(e){case"compositionend":return kc(t);case"keypress":return t.which!==32?null:(Oi=!0,Ri);case"textInput":return e=t.data,e===Ri&&Oi?null:e;default:return null}}function qp(e,t){if(rn)return e==="compositionend"||!_a&&wc(e,t)?(e=jc(),qr=Aa=bt=null,rn=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Nc&&t.locale!=="ko"?null:t.data;default:return null}}var Qp={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Li(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Qp[e.type]:t==="textarea"}function bc(e,t,r,s){tc(s),t=cs(t,"onChange"),0<t.length&&(r=new Ma("onChange","change",null,r,s),e.push({event:r,listeners:t}))}var Kn=null,ir=null;function Kp(e){_c(e,0)}function zs(e){var t=an(e);if(Qo(t))return e}function Jp(e,t){if(e==="change")return t}var Sc=!1;if(pt){var al;if(pt){var il="oninput"in document;if(!il){var Vi=document.createElement("div");Vi.setAttribute("oninput","return;"),il=typeof Vi.oninput=="function"}al=il}else al=!1;Sc=al&&(!document.documentMode||9<document.documentMode)}function Ui(){Kn&&(Kn.detachEvent("onpropertychange",Cc),ir=Kn=null)}function Cc(e){if(e.propertyName==="value"&&zs(ir)){var t=[];bc(t,ir,e,Pa(e)),lc(Kp,t)}}function Yp(e,t,r){e==="focusin"?(Ui(),Kn=t,ir=r,Kn.attachEvent("onpropertychange",Cc)):e==="focusout"&&Ui()}function Zp(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return zs(ir)}function Xp(e,t){if(e==="click")return zs(t)}function em(e,t){if(e==="input"||e==="change")return zs(t)}function tm(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ye=typeof Object.is=="function"?Object.is:tm;function or(e,t){if(Ye(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var r=Object.keys(e),s=Object.keys(t);if(r.length!==s.length)return!1;for(s=0;s<r.length;s++){var l=r[s];if(!Sl.call(t,l)||!Ye(e[l],t[l]))return!1}return!0}function Fi(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function $i(e,t){var r=Fi(e);e=0;for(var s;r;){if(r.nodeType===3){if(s=e+r.textContent.length,e<=t&&s>=t)return{node:r,offset:t-e};e=s}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=Fi(r)}}function Pc(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Pc(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Ec(){for(var e=window,t=ns();t instanceof e.HTMLIFrameElement;){try{var r=typeof t.contentWindow.location.href=="string"}catch{r=!1}if(r)e=t.contentWindow;else break;t=ns(e.document)}return t}function Ra(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function nm(e){var t=Ec(),r=e.focusedElem,s=e.selectionRange;if(t!==r&&r&&r.ownerDocument&&Pc(r.ownerDocument.documentElement,r)){if(s!==null&&Ra(r)){if(t=s.start,e=s.end,e===void 0&&(e=t),"selectionStart"in r)r.selectionStart=t,r.selectionEnd=Math.min(e,r.value.length);else if(e=(t=r.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var l=r.textContent.length,a=Math.min(s.start,l);s=s.end===void 0?a:Math.min(s.end,l),!e.extend&&a>s&&(l=s,s=a,a=l),l=$i(r,a);var i=$i(r,s);l&&i&&(e.rangeCount!==1||e.anchorNode!==l.node||e.anchorOffset!==l.offset||e.focusNode!==i.node||e.focusOffset!==i.offset)&&(t=t.createRange(),t.setStart(l.node,l.offset),e.removeAllRanges(),a>s?(e.addRange(t),e.extend(i.node,i.offset)):(t.setEnd(i.node,i.offset),e.addRange(t)))}}for(t=[],e=r;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<t.length;r++)e=t[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var rm=pt&&"documentMode"in document&&11>=document.documentMode,sn=null,Hl=null,Jn=null,Wl=!1;function Bi(e,t,r){var s=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;Wl||sn==null||sn!==ns(s)||(s=sn,"selectionStart"in s&&Ra(s)?s={start:s.selectionStart,end:s.selectionEnd}:(s=(s.ownerDocument&&s.ownerDocument.defaultView||window).getSelection(),s={anchorNode:s.anchorNode,anchorOffset:s.anchorOffset,focusNode:s.focusNode,focusOffset:s.focusOffset}),Jn&&or(Jn,s)||(Jn=s,s=cs(Hl,"onSelect"),0<s.length&&(t=new Ma("onSelect","select",null,t,r),e.push({event:t,listeners:s}),t.target=sn)))}function _r(e,t){var r={};return r[e.toLowerCase()]=t.toLowerCase(),r["Webkit"+e]="webkit"+t,r["Moz"+e]="moz"+t,r}var ln={animationend:_r("Animation","AnimationEnd"),animationiteration:_r("Animation","AnimationIteration"),animationstart:_r("Animation","AnimationStart"),transitionend:_r("Transition","TransitionEnd")},ol={},zc={};pt&&(zc=document.createElement("div").style,"AnimationEvent"in window||(delete ln.animationend.animation,delete ln.animationiteration.animation,delete ln.animationstart.animation),"TransitionEvent"in window||delete ln.transitionend.transition);function Ts(e){if(ol[e])return ol[e];if(!ln[e])return e;var t=ln[e],r;for(r in t)if(t.hasOwnProperty(r)&&r in zc)return ol[e]=t[r];return e}var Tc=Ts("animationend"),Dc=Ts("animationiteration"),Ac=Ts("animationstart"),Mc=Ts("transitionend"),Ic=new Map,Hi="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Rt(e,t){Ic.set(e,t),Yt(t,[e])}for(var cl=0;cl<Hi.length;cl++){var dl=Hi[cl],sm=dl.toLowerCase(),lm=dl[0].toUpperCase()+dl.slice(1);Rt(sm,"on"+lm)}Rt(Tc,"onAnimationEnd");Rt(Dc,"onAnimationIteration");Rt(Ac,"onAnimationStart");Rt("dblclick","onDoubleClick");Rt("focusin","onFocus");Rt("focusout","onBlur");Rt(Mc,"onTransitionEnd");jn("onMouseEnter",["mouseout","mouseover"]);jn("onMouseLeave",["mouseout","mouseover"]);jn("onPointerEnter",["pointerout","pointerover"]);jn("onPointerLeave",["pointerout","pointerover"]);Yt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Yt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Yt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Yt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Yt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Yt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Wn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),am=new Set("cancel close invalid load scroll toggle".split(" ").concat(Wn));function Wi(e,t,r){var s=e.type||"unknown-event";e.currentTarget=r,sp(s,t,void 0,e),e.currentTarget=null}function _c(e,t){t=(t&4)!==0;for(var r=0;r<e.length;r++){var s=e[r],l=s.event;s=s.listeners;e:{var a=void 0;if(t)for(var i=s.length-1;0<=i;i--){var c=s[i],o=c.instance,p=c.currentTarget;if(c=c.listener,o!==a&&l.isPropagationStopped())break e;Wi(l,c,p),a=o}else for(i=0;i<s.length;i++){if(c=s[i],o=c.instance,p=c.currentTarget,c=c.listener,o!==a&&l.isPropagationStopped())break e;Wi(l,c,p),a=o}}}if(ss)throw e=Ul,ss=!1,Ul=null,e}function K(e,t){var r=t[Jl];r===void 0&&(r=t[Jl]=new Set);var s=e+"__bubble";r.has(s)||(Rc(t,e,2,!1),r.add(s))}function ul(e,t,r){var s=0;t&&(s|=4),Rc(r,e,s,t)}var Rr="_reactListening"+Math.random().toString(36).slice(2);function cr(e){if(!e[Rr]){e[Rr]=!0,Bo.forEach(function(r){r!=="selectionchange"&&(am.has(r)||ul(r,!1,e),ul(r,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Rr]||(t[Rr]=!0,ul("selectionchange",!1,t))}}function Rc(e,t,r,s){switch(yc(t)){case 1:var l=jp;break;case 4:l=Np;break;default:l=Da}r=l.bind(null,t,r,e),l=void 0,!Vl||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(l=!0),s?l!==void 0?e.addEventListener(t,r,{capture:!0,passive:l}):e.addEventListener(t,r,!0):l!==void 0?e.addEventListener(t,r,{passive:l}):e.addEventListener(t,r,!1)}function pl(e,t,r,s,l){var a=s;if(!(t&1)&&!(t&2)&&s!==null)e:for(;;){if(s===null)return;var i=s.tag;if(i===3||i===4){var c=s.stateNode.containerInfo;if(c===l||c.nodeType===8&&c.parentNode===l)break;if(i===4)for(i=s.return;i!==null;){var o=i.tag;if((o===3||o===4)&&(o=i.stateNode.containerInfo,o===l||o.nodeType===8&&o.parentNode===l))return;i=i.return}for(;c!==null;){if(i=Ft(c),i===null)return;if(o=i.tag,o===5||o===6){s=a=i;continue e}c=c.parentNode}}s=s.return}lc(function(){var p=a,h=Pa(r),x=[];e:{var m=Ic.get(e);if(m!==void 0){var u=Ma,v=e;switch(e){case"keypress":if(Qr(r)===0)break e;case"keydown":case"keyup":u=Rp;break;case"focusin":v="focus",u=ll;break;case"focusout":v="blur",u=ll;break;case"beforeblur":case"afterblur":u=ll;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":u=Mi;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":u=bp;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":u=Vp;break;case Tc:case Dc:case Ac:u=Pp;break;case Mc:u=Fp;break;case"scroll":u=wp;break;case"wheel":u=Bp;break;case"copy":case"cut":case"paste":u=zp;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":u=_i}var N=(t&4)!==0,S=!N&&e==="scroll",f=N?m!==null?m+"Capture":null:m;N=[];for(var d=p,g;d!==null;){g=d;var b=g.stateNode;if(g.tag===5&&b!==null&&(g=b,f!==null&&(b=rr(d,f),b!=null&&N.push(dr(d,b,g)))),S)break;d=d.return}0<N.length&&(m=new u(m,v,null,r,h),x.push({event:m,listeners:N}))}}if(!(t&7)){e:{if(m=e==="mouseover"||e==="pointerover",u=e==="mouseout"||e==="pointerout",m&&r!==Ol&&(v=r.relatedTarget||r.fromElement)&&(Ft(v)||v[mt]))break e;if((u||m)&&(m=h.window===h?h:(m=h.ownerDocument)?m.defaultView||m.parentWindow:window,u?(v=r.relatedTarget||r.toElement,u=p,v=v?Ft(v):null,v!==null&&(S=Zt(v),v!==S||v.tag!==5&&v.tag!==6)&&(v=null)):(u=null,v=p),u!==v)){if(N=Mi,b="onMouseLeave",f="onMouseEnter",d="mouse",(e==="pointerout"||e==="pointerover")&&(N=_i,b="onPointerLeave",f="onPointerEnter",d="pointer"),S=u==null?m:an(u),g=v==null?m:an(v),m=new N(b,d+"leave",u,r,h),m.target=S,m.relatedTarget=g,b=null,Ft(h)===p&&(N=new N(f,d+"enter",v,r,h),N.target=g,N.relatedTarget=S,b=N),S=b,u&&v)t:{for(N=u,f=v,d=0,g=N;g;g=en(g))d++;for(g=0,b=f;b;b=en(b))g++;for(;0<d-g;)N=en(N),d--;for(;0<g-d;)f=en(f),g--;for(;d--;){if(N===f||f!==null&&N===f.alternate)break t;N=en(N),f=en(f)}N=null}else N=null;u!==null&&Gi(x,m,u,N,!1),v!==null&&S!==null&&Gi(x,S,v,N,!0)}}e:{if(m=p?an(p):window,u=m.nodeName&&m.nodeName.toLowerCase(),u==="select"||u==="input"&&m.type==="file")var P=Jp;else if(Li(m))if(Sc)P=em;else{P=Zp;var z=Yp}else(u=m.nodeName)&&u.toLowerCase()==="input"&&(m.type==="checkbox"||m.type==="radio")&&(P=Xp);if(P&&(P=P(e,p))){bc(x,P,r,h);break e}z&&z(e,m,p),e==="focusout"&&(z=m._wrapperState)&&z.controlled&&m.type==="number"&&Al(m,"number",m.value)}switch(z=p?an(p):window,e){case"focusin":(Li(z)||z.contentEditable==="true")&&(sn=z,Hl=p,Jn=null);break;case"focusout":Jn=Hl=sn=null;break;case"mousedown":Wl=!0;break;case"contextmenu":case"mouseup":case"dragend":Wl=!1,Bi(x,r,h);break;case"selectionchange":if(rm)break;case"keydown":case"keyup":Bi(x,r,h)}var w;if(_a)e:{switch(e){case"compositionstart":var C="onCompositionStart";break e;case"compositionend":C="onCompositionEnd";break e;case"compositionupdate":C="onCompositionUpdate";break e}C=void 0}else rn?wc(e,r)&&(C="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(C="onCompositionStart");C&&(Nc&&r.locale!=="ko"&&(rn||C!=="onCompositionStart"?C==="onCompositionEnd"&&rn&&(w=jc()):(bt=h,Aa="value"in bt?bt.value:bt.textContent,rn=!0)),z=cs(p,C),0<z.length&&(C=new Ii(C,e,null,r,h),x.push({event:C,listeners:z}),w?C.data=w:(w=kc(r),w!==null&&(C.data=w)))),(w=Wp?Gp(e,r):qp(e,r))&&(p=cs(p,"onBeforeInput"),0<p.length&&(h=new Ii("onBeforeInput","beforeinput",null,r,h),x.push({event:h,listeners:p}),h.data=w))}_c(x,t)})}function dr(e,t,r){return{instance:e,listener:t,currentTarget:r}}function cs(e,t){for(var r=t+"Capture",s=[];e!==null;){var l=e,a=l.stateNode;l.tag===5&&a!==null&&(l=a,a=rr(e,r),a!=null&&s.unshift(dr(e,a,l)),a=rr(e,t),a!=null&&s.push(dr(e,a,l))),e=e.return}return s}function en(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function Gi(e,t,r,s,l){for(var a=t._reactName,i=[];r!==null&&r!==s;){var c=r,o=c.alternate,p=c.stateNode;if(o!==null&&o===s)break;c.tag===5&&p!==null&&(c=p,l?(o=rr(r,a),o!=null&&i.unshift(dr(r,o,c))):l||(o=rr(r,a),o!=null&&i.push(dr(r,o,c)))),r=r.return}i.length!==0&&e.push({event:t,listeners:i})}var im=/\r\n?/g,om=/\u0000|\uFFFD/g;function qi(e){return(typeof e=="string"?e:""+e).replace(im,`
`).replace(om,"")}function Or(e,t,r){if(t=qi(t),qi(e)!==t&&r)throw Error(E(425))}function ds(){}var Gl=null,ql=null;function Ql(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Kl=typeof setTimeout=="function"?setTimeout:void 0,cm=typeof clearTimeout=="function"?clearTimeout:void 0,Qi=typeof Promise=="function"?Promise:void 0,dm=typeof queueMicrotask=="function"?queueMicrotask:typeof Qi<"u"?function(e){return Qi.resolve(null).then(e).catch(um)}:Kl;function um(e){setTimeout(function(){throw e})}function ml(e,t){var r=t,s=0;do{var l=r.nextSibling;if(e.removeChild(r),l&&l.nodeType===8)if(r=l.data,r==="/$"){if(s===0){e.removeChild(l),ar(t);return}s--}else r!=="$"&&r!=="$?"&&r!=="$!"||s++;r=l}while(r);ar(t)}function zt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function Ki(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(t===0)return e;t--}else r==="/$"&&t++}e=e.previousSibling}return null}var zn=Math.random().toString(36).slice(2),et="__reactFiber$"+zn,ur="__reactProps$"+zn,mt="__reactContainer$"+zn,Jl="__reactEvents$"+zn,pm="__reactListeners$"+zn,mm="__reactHandles$"+zn;function Ft(e){var t=e[et];if(t)return t;for(var r=e.parentNode;r;){if(t=r[mt]||r[et]){if(r=t.alternate,t.child!==null||r!==null&&r.child!==null)for(e=Ki(e);e!==null;){if(r=e[et])return r;e=Ki(e)}return t}e=r,r=e.parentNode}return null}function Nr(e){return e=e[et]||e[mt],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function an(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(E(33))}function Ds(e){return e[ur]||null}var Yl=[],on=-1;function Ot(e){return{current:e}}function J(e){0>on||(e.current=Yl[on],Yl[on]=null,on--)}function Q(e,t){on++,Yl[on]=e.current,e.current=t}var _t={},ge=Ot(_t),Se=Ot(!1),Gt=_t;function Nn(e,t){var r=e.type.contextTypes;if(!r)return _t;var s=e.stateNode;if(s&&s.__reactInternalMemoizedUnmaskedChildContext===t)return s.__reactInternalMemoizedMaskedChildContext;var l={},a;for(a in r)l[a]=t[a];return s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=l),l}function Ce(e){return e=e.childContextTypes,e!=null}function us(){J(Se),J(ge)}function Ji(e,t,r){if(ge.current!==_t)throw Error(E(168));Q(ge,t),Q(Se,r)}function Oc(e,t,r){var s=e.stateNode;if(t=t.childContextTypes,typeof s.getChildContext!="function")return r;s=s.getChildContext();for(var l in s)if(!(l in t))throw Error(E(108,Yu(e)||"Unknown",l));return ne({},r,s)}function ps(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||_t,Gt=ge.current,Q(ge,e),Q(Se,Se.current),!0}function Yi(e,t,r){var s=e.stateNode;if(!s)throw Error(E(169));r?(e=Oc(e,t,Gt),s.__reactInternalMemoizedMergedChildContext=e,J(Se),J(ge),Q(ge,e)):J(Se),Q(Se,r)}var it=null,As=!1,fl=!1;function Lc(e){it===null?it=[e]:it.push(e)}function fm(e){As=!0,Lc(e)}function Lt(){if(!fl&&it!==null){fl=!0;var e=0,t=W;try{var r=it;for(W=1;e<r.length;e++){var s=r[e];do s=s(!0);while(s!==null)}it=null,As=!1}catch(l){throw it!==null&&(it=it.slice(e+1)),cc(Ea,Lt),l}finally{W=t,fl=!1}}return null}var cn=[],dn=0,ms=null,fs=0,Re=[],Oe=0,qt=null,ct=1,dt="";function Vt(e,t){cn[dn++]=fs,cn[dn++]=ms,ms=e,fs=t}function Vc(e,t,r){Re[Oe++]=ct,Re[Oe++]=dt,Re[Oe++]=qt,qt=e;var s=ct;e=dt;var l=32-Ke(s)-1;s&=~(1<<l),r+=1;var a=32-Ke(t)+l;if(30<a){var i=l-l%5;a=(s&(1<<i)-1).toString(32),s>>=i,l-=i,ct=1<<32-Ke(t)+l|r<<l|s,dt=a+e}else ct=1<<a|r<<l|s,dt=e}function Oa(e){e.return!==null&&(Vt(e,1),Vc(e,1,0))}function La(e){for(;e===ms;)ms=cn[--dn],cn[dn]=null,fs=cn[--dn],cn[dn]=null;for(;e===qt;)qt=Re[--Oe],Re[Oe]=null,dt=Re[--Oe],Re[Oe]=null,ct=Re[--Oe],Re[Oe]=null}var Te=null,ze=null,X=!1,Qe=null;function Uc(e,t){var r=Le(5,null,null,0);r.elementType="DELETED",r.stateNode=t,r.return=e,t=e.deletions,t===null?(e.deletions=[r],e.flags|=16):t.push(r)}function Zi(e,t){switch(e.tag){case 5:var r=e.type;return t=t.nodeType!==1||r.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Te=e,ze=zt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Te=e,ze=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(r=qt!==null?{id:ct,overflow:dt}:null,e.memoizedState={dehydrated:t,treeContext:r,retryLane:1073741824},r=Le(18,null,null,0),r.stateNode=t,r.return=e,e.child=r,Te=e,ze=null,!0):!1;default:return!1}}function Zl(e){return(e.mode&1)!==0&&(e.flags&128)===0}function Xl(e){if(X){var t=ze;if(t){var r=t;if(!Zi(e,t)){if(Zl(e))throw Error(E(418));t=zt(r.nextSibling);var s=Te;t&&Zi(e,t)?Uc(s,r):(e.flags=e.flags&-4097|2,X=!1,Te=e)}}else{if(Zl(e))throw Error(E(418));e.flags=e.flags&-4097|2,X=!1,Te=e}}}function Xi(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Te=e}function Lr(e){if(e!==Te)return!1;if(!X)return Xi(e),X=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Ql(e.type,e.memoizedProps)),t&&(t=ze)){if(Zl(e))throw Fc(),Error(E(418));for(;t;)Uc(e,t),t=zt(t.nextSibling)}if(Xi(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(E(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(t===0){ze=zt(e.nextSibling);break e}t--}else r!=="$"&&r!=="$!"&&r!=="$?"||t++}e=e.nextSibling}ze=null}}else ze=Te?zt(e.stateNode.nextSibling):null;return!0}function Fc(){for(var e=ze;e;)e=zt(e.nextSibling)}function wn(){ze=Te=null,X=!1}function Va(e){Qe===null?Qe=[e]:Qe.push(e)}var hm=xt.ReactCurrentBatchConfig;function Vn(e,t,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(E(309));var s=r.stateNode}if(!s)throw Error(E(147,e));var l=s,a=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===a?t.ref:(t=function(i){var c=l.refs;i===null?delete c[a]:c[a]=i},t._stringRef=a,t)}if(typeof e!="string")throw Error(E(284));if(!r._owner)throw Error(E(290,e))}return e}function Vr(e,t){throw e=Object.prototype.toString.call(t),Error(E(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function eo(e){var t=e._init;return t(e._payload)}function $c(e){function t(f,d){if(e){var g=f.deletions;g===null?(f.deletions=[d],f.flags|=16):g.push(d)}}function r(f,d){if(!e)return null;for(;d!==null;)t(f,d),d=d.sibling;return null}function s(f,d){for(f=new Map;d!==null;)d.key!==null?f.set(d.key,d):f.set(d.index,d),d=d.sibling;return f}function l(f,d){return f=Mt(f,d),f.index=0,f.sibling=null,f}function a(f,d,g){return f.index=g,e?(g=f.alternate,g!==null?(g=g.index,g<d?(f.flags|=2,d):g):(f.flags|=2,d)):(f.flags|=1048576,d)}function i(f){return e&&f.alternate===null&&(f.flags|=2),f}function c(f,d,g,b){return d===null||d.tag!==6?(d=Nl(g,f.mode,b),d.return=f,d):(d=l(d,g),d.return=f,d)}function o(f,d,g,b){var P=g.type;return P===nn?h(f,d,g.props.children,b,g.key):d!==null&&(d.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===jt&&eo(P)===d.type)?(b=l(d,g.props),b.ref=Vn(f,d,g),b.return=f,b):(b=ts(g.type,g.key,g.props,null,f.mode,b),b.ref=Vn(f,d,g),b.return=f,b)}function p(f,d,g,b){return d===null||d.tag!==4||d.stateNode.containerInfo!==g.containerInfo||d.stateNode.implementation!==g.implementation?(d=wl(g,f.mode,b),d.return=f,d):(d=l(d,g.children||[]),d.return=f,d)}function h(f,d,g,b,P){return d===null||d.tag!==7?(d=Wt(g,f.mode,b,P),d.return=f,d):(d=l(d,g),d.return=f,d)}function x(f,d,g){if(typeof d=="string"&&d!==""||typeof d=="number")return d=Nl(""+d,f.mode,g),d.return=f,d;if(typeof d=="object"&&d!==null){switch(d.$$typeof){case Er:return g=ts(d.type,d.key,d.props,null,f.mode,g),g.ref=Vn(f,null,d),g.return=f,g;case tn:return d=wl(d,f.mode,g),d.return=f,d;case jt:var b=d._init;return x(f,b(d._payload),g)}if(Bn(d)||In(d))return d=Wt(d,f.mode,g,null),d.return=f,d;Vr(f,d)}return null}function m(f,d,g,b){var P=d!==null?d.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return P!==null?null:c(f,d,""+g,b);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Er:return g.key===P?o(f,d,g,b):null;case tn:return g.key===P?p(f,d,g,b):null;case jt:return P=g._init,m(f,d,P(g._payload),b)}if(Bn(g)||In(g))return P!==null?null:h(f,d,g,b,null);Vr(f,g)}return null}function u(f,d,g,b,P){if(typeof b=="string"&&b!==""||typeof b=="number")return f=f.get(g)||null,c(d,f,""+b,P);if(typeof b=="object"&&b!==null){switch(b.$$typeof){case Er:return f=f.get(b.key===null?g:b.key)||null,o(d,f,b,P);case tn:return f=f.get(b.key===null?g:b.key)||null,p(d,f,b,P);case jt:var z=b._init;return u(f,d,g,z(b._payload),P)}if(Bn(b)||In(b))return f=f.get(g)||null,h(d,f,b,P,null);Vr(d,b)}return null}function v(f,d,g,b){for(var P=null,z=null,w=d,C=d=0,V=null;w!==null&&C<g.length;C++){w.index>C?(V=w,w=null):V=w.sibling;var R=m(f,w,g[C],b);if(R===null){w===null&&(w=V);break}e&&w&&R.alternate===null&&t(f,w),d=a(R,d,C),z===null?P=R:z.sibling=R,z=R,w=V}if(C===g.length)return r(f,w),X&&Vt(f,C),P;if(w===null){for(;C<g.length;C++)w=x(f,g[C],b),w!==null&&(d=a(w,d,C),z===null?P=w:z.sibling=w,z=w);return X&&Vt(f,C),P}for(w=s(f,w);C<g.length;C++)V=u(w,f,C,g[C],b),V!==null&&(e&&V.alternate!==null&&w.delete(V.key===null?C:V.key),d=a(V,d,C),z===null?P=V:z.sibling=V,z=V);return e&&w.forEach(function(Y){return t(f,Y)}),X&&Vt(f,C),P}function N(f,d,g,b){var P=In(g);if(typeof P!="function")throw Error(E(150));if(g=P.call(g),g==null)throw Error(E(151));for(var z=P=null,w=d,C=d=0,V=null,R=g.next();w!==null&&!R.done;C++,R=g.next()){w.index>C?(V=w,w=null):V=w.sibling;var Y=m(f,w,R.value,b);if(Y===null){w===null&&(w=V);break}e&&w&&Y.alternate===null&&t(f,w),d=a(Y,d,C),z===null?P=Y:z.sibling=Y,z=Y,w=V}if(R.done)return r(f,w),X&&Vt(f,C),P;if(w===null){for(;!R.done;C++,R=g.next())R=x(f,R.value,b),R!==null&&(d=a(R,d,C),z===null?P=R:z.sibling=R,z=R);return X&&Vt(f,C),P}for(w=s(f,w);!R.done;C++,R=g.next())R=u(w,f,C,R.value,b),R!==null&&(e&&R.alternate!==null&&w.delete(R.key===null?C:R.key),d=a(R,d,C),z===null?P=R:z.sibling=R,z=R);return e&&w.forEach(function($){return t(f,$)}),X&&Vt(f,C),P}function S(f,d,g,b){if(typeof g=="object"&&g!==null&&g.type===nn&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case Er:e:{for(var P=g.key,z=d;z!==null;){if(z.key===P){if(P=g.type,P===nn){if(z.tag===7){r(f,z.sibling),d=l(z,g.props.children),d.return=f,f=d;break e}}else if(z.elementType===P||typeof P=="object"&&P!==null&&P.$$typeof===jt&&eo(P)===z.type){r(f,z.sibling),d=l(z,g.props),d.ref=Vn(f,z,g),d.return=f,f=d;break e}r(f,z);break}else t(f,z);z=z.sibling}g.type===nn?(d=Wt(g.props.children,f.mode,b,g.key),d.return=f,f=d):(b=ts(g.type,g.key,g.props,null,f.mode,b),b.ref=Vn(f,d,g),b.return=f,f=b)}return i(f);case tn:e:{for(z=g.key;d!==null;){if(d.key===z)if(d.tag===4&&d.stateNode.containerInfo===g.containerInfo&&d.stateNode.implementation===g.implementation){r(f,d.sibling),d=l(d,g.children||[]),d.return=f,f=d;break e}else{r(f,d);break}else t(f,d);d=d.sibling}d=wl(g,f.mode,b),d.return=f,f=d}return i(f);case jt:return z=g._init,S(f,d,z(g._payload),b)}if(Bn(g))return v(f,d,g,b);if(In(g))return N(f,d,g,b);Vr(f,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,d!==null&&d.tag===6?(r(f,d.sibling),d=l(d,g),d.return=f,f=d):(r(f,d),d=Nl(g,f.mode,b),d.return=f,f=d),i(f)):r(f,d)}return S}var kn=$c(!0),Bc=$c(!1),hs=Ot(null),xs=null,un=null,Ua=null;function Fa(){Ua=un=xs=null}function $a(e){var t=hs.current;J(hs),e._currentValue=t}function ea(e,t,r){for(;e!==null;){var s=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,s!==null&&(s.childLanes|=t)):s!==null&&(s.childLanes&t)!==t&&(s.childLanes|=t),e===r)break;e=e.return}}function vn(e,t){xs=e,Ua=un=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(be=!0),e.firstContext=null)}function Ue(e){var t=e._currentValue;if(Ua!==e)if(e={context:e,memoizedValue:t,next:null},un===null){if(xs===null)throw Error(E(308));un=e,xs.dependencies={lanes:0,firstContext:e}}else un=un.next=e;return t}var $t=null;function Ba(e){$t===null?$t=[e]:$t.push(e)}function Hc(e,t,r,s){var l=t.interleaved;return l===null?(r.next=r,Ba(t)):(r.next=l.next,l.next=r),t.interleaved=r,ft(e,s)}function ft(e,t){e.lanes|=t;var r=e.alternate;for(r!==null&&(r.lanes|=t),r=e,e=e.return;e!==null;)e.childLanes|=t,r=e.alternate,r!==null&&(r.childLanes|=t),r=e,e=e.return;return r.tag===3?r.stateNode:null}var Nt=!1;function Ha(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Wc(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function ut(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function Tt(e,t,r){var s=e.updateQueue;if(s===null)return null;if(s=s.shared,F&2){var l=s.pending;return l===null?t.next=t:(t.next=l.next,l.next=t),s.pending=t,ft(e,r)}return l=s.interleaved,l===null?(t.next=t,Ba(s)):(t.next=l.next,l.next=t),s.interleaved=t,ft(e,r)}function Kr(e,t,r){if(t=t.updateQueue,t!==null&&(t=t.shared,(r&4194240)!==0)){var s=t.lanes;s&=e.pendingLanes,r|=s,t.lanes=r,za(e,r)}}function to(e,t){var r=e.updateQueue,s=e.alternate;if(s!==null&&(s=s.updateQueue,r===s)){var l=null,a=null;if(r=r.firstBaseUpdate,r!==null){do{var i={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};a===null?l=a=i:a=a.next=i,r=r.next}while(r!==null);a===null?l=a=t:a=a.next=t}else l=a=t;r={baseState:s.baseState,firstBaseUpdate:l,lastBaseUpdate:a,shared:s.shared,effects:s.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=t:e.next=t,r.lastBaseUpdate=t}function gs(e,t,r,s){var l=e.updateQueue;Nt=!1;var a=l.firstBaseUpdate,i=l.lastBaseUpdate,c=l.shared.pending;if(c!==null){l.shared.pending=null;var o=c,p=o.next;o.next=null,i===null?a=p:i.next=p,i=o;var h=e.alternate;h!==null&&(h=h.updateQueue,c=h.lastBaseUpdate,c!==i&&(c===null?h.firstBaseUpdate=p:c.next=p,h.lastBaseUpdate=o))}if(a!==null){var x=l.baseState;i=0,h=p=o=null,c=a;do{var m=c.lane,u=c.eventTime;if((s&m)===m){h!==null&&(h=h.next={eventTime:u,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var v=e,N=c;switch(m=t,u=r,N.tag){case 1:if(v=N.payload,typeof v=="function"){x=v.call(u,x,m);break e}x=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=N.payload,m=typeof v=="function"?v.call(u,x,m):v,m==null)break e;x=ne({},x,m);break e;case 2:Nt=!0}}c.callback!==null&&c.lane!==0&&(e.flags|=64,m=l.effects,m===null?l.effects=[c]:m.push(c))}else u={eventTime:u,lane:m,tag:c.tag,payload:c.payload,callback:c.callback,next:null},h===null?(p=h=u,o=x):h=h.next=u,i|=m;if(c=c.next,c===null){if(c=l.shared.pending,c===null)break;m=c,c=m.next,m.next=null,l.lastBaseUpdate=m,l.shared.pending=null}}while(!0);if(h===null&&(o=x),l.baseState=o,l.firstBaseUpdate=p,l.lastBaseUpdate=h,t=l.shared.interleaved,t!==null){l=t;do i|=l.lane,l=l.next;while(l!==t)}else a===null&&(l.shared.lanes=0);Kt|=i,e.lanes=i,e.memoizedState=x}}function no(e,t,r){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var s=e[t],l=s.callback;if(l!==null){if(s.callback=null,s=r,typeof l!="function")throw Error(E(191,l));l.call(s)}}}var wr={},nt=Ot(wr),pr=Ot(wr),mr=Ot(wr);function Bt(e){if(e===wr)throw Error(E(174));return e}function Wa(e,t){switch(Q(mr,t),Q(pr,e),Q(nt,wr),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:Il(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=Il(t,e)}J(nt),Q(nt,t)}function bn(){J(nt),J(pr),J(mr)}function Gc(e){Bt(mr.current);var t=Bt(nt.current),r=Il(t,e.type);t!==r&&(Q(pr,e),Q(nt,r))}function Ga(e){pr.current===e&&(J(nt),J(pr))}var ee=Ot(0);function vs(e){for(var t=e;t!==null;){if(t.tag===13){var r=t.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var hl=[];function qa(){for(var e=0;e<hl.length;e++)hl[e]._workInProgressVersionPrimary=null;hl.length=0}var Jr=xt.ReactCurrentDispatcher,xl=xt.ReactCurrentBatchConfig,Qt=0,te=null,ae=null,oe=null,ys=!1,Yn=!1,fr=0,xm=0;function fe(){throw Error(E(321))}function Qa(e,t){if(t===null)return!1;for(var r=0;r<t.length&&r<e.length;r++)if(!Ye(e[r],t[r]))return!1;return!0}function Ka(e,t,r,s,l,a){if(Qt=a,te=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Jr.current=e===null||e.memoizedState===null?jm:Nm,e=r(s,l),Yn){a=0;do{if(Yn=!1,fr=0,25<=a)throw Error(E(301));a+=1,oe=ae=null,t.updateQueue=null,Jr.current=wm,e=r(s,l)}while(Yn)}if(Jr.current=js,t=ae!==null&&ae.next!==null,Qt=0,oe=ae=te=null,ys=!1,t)throw Error(E(300));return e}function Ja(){var e=fr!==0;return fr=0,e}function Xe(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return oe===null?te.memoizedState=oe=e:oe=oe.next=e,oe}function Fe(){if(ae===null){var e=te.alternate;e=e!==null?e.memoizedState:null}else e=ae.next;var t=oe===null?te.memoizedState:oe.next;if(t!==null)oe=t,ae=e;else{if(e===null)throw Error(E(310));ae=e,e={memoizedState:ae.memoizedState,baseState:ae.baseState,baseQueue:ae.baseQueue,queue:ae.queue,next:null},oe===null?te.memoizedState=oe=e:oe=oe.next=e}return oe}function hr(e,t){return typeof t=="function"?t(e):t}function gl(e){var t=Fe(),r=t.queue;if(r===null)throw Error(E(311));r.lastRenderedReducer=e;var s=ae,l=s.baseQueue,a=r.pending;if(a!==null){if(l!==null){var i=l.next;l.next=a.next,a.next=i}s.baseQueue=l=a,r.pending=null}if(l!==null){a=l.next,s=s.baseState;var c=i=null,o=null,p=a;do{var h=p.lane;if((Qt&h)===h)o!==null&&(o=o.next={lane:0,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null}),s=p.hasEagerState?p.eagerState:e(s,p.action);else{var x={lane:h,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null};o===null?(c=o=x,i=s):o=o.next=x,te.lanes|=h,Kt|=h}p=p.next}while(p!==null&&p!==a);o===null?i=s:o.next=c,Ye(s,t.memoizedState)||(be=!0),t.memoizedState=s,t.baseState=i,t.baseQueue=o,r.lastRenderedState=s}if(e=r.interleaved,e!==null){l=e;do a=l.lane,te.lanes|=a,Kt|=a,l=l.next;while(l!==e)}else l===null&&(r.lanes=0);return[t.memoizedState,r.dispatch]}function vl(e){var t=Fe(),r=t.queue;if(r===null)throw Error(E(311));r.lastRenderedReducer=e;var s=r.dispatch,l=r.pending,a=t.memoizedState;if(l!==null){r.pending=null;var i=l=l.next;do a=e(a,i.action),i=i.next;while(i!==l);Ye(a,t.memoizedState)||(be=!0),t.memoizedState=a,t.baseQueue===null&&(t.baseState=a),r.lastRenderedState=a}return[a,s]}function qc(){}function Qc(e,t){var r=te,s=Fe(),l=t(),a=!Ye(s.memoizedState,l);if(a&&(s.memoizedState=l,be=!0),s=s.queue,Ya(Yc.bind(null,r,s,e),[e]),s.getSnapshot!==t||a||oe!==null&&oe.memoizedState.tag&1){if(r.flags|=2048,xr(9,Jc.bind(null,r,s,l,t),void 0,null),ce===null)throw Error(E(349));Qt&30||Kc(r,t,l)}return l}function Kc(e,t,r){e.flags|=16384,e={getSnapshot:t,value:r},t=te.updateQueue,t===null?(t={lastEffect:null,stores:null},te.updateQueue=t,t.stores=[e]):(r=t.stores,r===null?t.stores=[e]:r.push(e))}function Jc(e,t,r,s){t.value=r,t.getSnapshot=s,Zc(t)&&Xc(e)}function Yc(e,t,r){return r(function(){Zc(t)&&Xc(e)})}function Zc(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!Ye(e,r)}catch{return!0}}function Xc(e){var t=ft(e,1);t!==null&&Je(t,e,1,-1)}function ro(e){var t=Xe();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:hr,lastRenderedState:e},t.queue=e,e=e.dispatch=ym.bind(null,te,e),[t.memoizedState,e]}function xr(e,t,r,s){return e={tag:e,create:t,destroy:r,deps:s,next:null},t=te.updateQueue,t===null?(t={lastEffect:null,stores:null},te.updateQueue=t,t.lastEffect=e.next=e):(r=t.lastEffect,r===null?t.lastEffect=e.next=e:(s=r.next,r.next=e,e.next=s,t.lastEffect=e)),e}function ed(){return Fe().memoizedState}function Yr(e,t,r,s){var l=Xe();te.flags|=e,l.memoizedState=xr(1|t,r,void 0,s===void 0?null:s)}function Ms(e,t,r,s){var l=Fe();s=s===void 0?null:s;var a=void 0;if(ae!==null){var i=ae.memoizedState;if(a=i.destroy,s!==null&&Qa(s,i.deps)){l.memoizedState=xr(t,r,a,s);return}}te.flags|=e,l.memoizedState=xr(1|t,r,a,s)}function so(e,t){return Yr(8390656,8,e,t)}function Ya(e,t){return Ms(2048,8,e,t)}function td(e,t){return Ms(4,2,e,t)}function nd(e,t){return Ms(4,4,e,t)}function rd(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function sd(e,t,r){return r=r!=null?r.concat([e]):null,Ms(4,4,rd.bind(null,t,e),r)}function Za(){}function ld(e,t){var r=Fe();t=t===void 0?null:t;var s=r.memoizedState;return s!==null&&t!==null&&Qa(t,s[1])?s[0]:(r.memoizedState=[e,t],e)}function ad(e,t){var r=Fe();t=t===void 0?null:t;var s=r.memoizedState;return s!==null&&t!==null&&Qa(t,s[1])?s[0]:(e=e(),r.memoizedState=[e,t],e)}function id(e,t,r){return Qt&21?(Ye(r,t)||(r=pc(),te.lanes|=r,Kt|=r,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,be=!0),e.memoizedState=r)}function gm(e,t){var r=W;W=r!==0&&4>r?r:4,e(!0);var s=xl.transition;xl.transition={};try{e(!1),t()}finally{W=r,xl.transition=s}}function od(){return Fe().memoizedState}function vm(e,t,r){var s=At(e);if(r={lane:s,action:r,hasEagerState:!1,eagerState:null,next:null},cd(e))dd(t,r);else if(r=Hc(e,t,r,s),r!==null){var l=je();Je(r,e,s,l),ud(r,t,s)}}function ym(e,t,r){var s=At(e),l={lane:s,action:r,hasEagerState:!1,eagerState:null,next:null};if(cd(e))dd(t,l);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var i=t.lastRenderedState,c=a(i,r);if(l.hasEagerState=!0,l.eagerState=c,Ye(c,i)){var o=t.interleaved;o===null?(l.next=l,Ba(t)):(l.next=o.next,o.next=l),t.interleaved=l;return}}catch{}finally{}r=Hc(e,t,l,s),r!==null&&(l=je(),Je(r,e,s,l),ud(r,t,s))}}function cd(e){var t=e.alternate;return e===te||t!==null&&t===te}function dd(e,t){Yn=ys=!0;var r=e.pending;r===null?t.next=t:(t.next=r.next,r.next=t),e.pending=t}function ud(e,t,r){if(r&4194240){var s=t.lanes;s&=e.pendingLanes,r|=s,t.lanes=r,za(e,r)}}var js={readContext:Ue,useCallback:fe,useContext:fe,useEffect:fe,useImperativeHandle:fe,useInsertionEffect:fe,useLayoutEffect:fe,useMemo:fe,useReducer:fe,useRef:fe,useState:fe,useDebugValue:fe,useDeferredValue:fe,useTransition:fe,useMutableSource:fe,useSyncExternalStore:fe,useId:fe,unstable_isNewReconciler:!1},jm={readContext:Ue,useCallback:function(e,t){return Xe().memoizedState=[e,t===void 0?null:t],e},useContext:Ue,useEffect:so,useImperativeHandle:function(e,t,r){return r=r!=null?r.concat([e]):null,Yr(4194308,4,rd.bind(null,t,e),r)},useLayoutEffect:function(e,t){return Yr(4194308,4,e,t)},useInsertionEffect:function(e,t){return Yr(4,2,e,t)},useMemo:function(e,t){var r=Xe();return t=t===void 0?null:t,e=e(),r.memoizedState=[e,t],e},useReducer:function(e,t,r){var s=Xe();return t=r!==void 0?r(t):t,s.memoizedState=s.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},s.queue=e,e=e.dispatch=vm.bind(null,te,e),[s.memoizedState,e]},useRef:function(e){var t=Xe();return e={current:e},t.memoizedState=e},useState:ro,useDebugValue:Za,useDeferredValue:function(e){return Xe().memoizedState=e},useTransition:function(){var e=ro(!1),t=e[0];return e=gm.bind(null,e[1]),Xe().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,r){var s=te,l=Xe();if(X){if(r===void 0)throw Error(E(407));r=r()}else{if(r=t(),ce===null)throw Error(E(349));Qt&30||Kc(s,t,r)}l.memoizedState=r;var a={value:r,getSnapshot:t};return l.queue=a,so(Yc.bind(null,s,a,e),[e]),s.flags|=2048,xr(9,Jc.bind(null,s,a,r,t),void 0,null),r},useId:function(){var e=Xe(),t=ce.identifierPrefix;if(X){var r=dt,s=ct;r=(s&~(1<<32-Ke(s)-1)).toString(32)+r,t=":"+t+"R"+r,r=fr++,0<r&&(t+="H"+r.toString(32)),t+=":"}else r=xm++,t=":"+t+"r"+r.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},Nm={readContext:Ue,useCallback:ld,useContext:Ue,useEffect:Ya,useImperativeHandle:sd,useInsertionEffect:td,useLayoutEffect:nd,useMemo:ad,useReducer:gl,useRef:ed,useState:function(){return gl(hr)},useDebugValue:Za,useDeferredValue:function(e){var t=Fe();return id(t,ae.memoizedState,e)},useTransition:function(){var e=gl(hr)[0],t=Fe().memoizedState;return[e,t]},useMutableSource:qc,useSyncExternalStore:Qc,useId:od,unstable_isNewReconciler:!1},wm={readContext:Ue,useCallback:ld,useContext:Ue,useEffect:Ya,useImperativeHandle:sd,useInsertionEffect:td,useLayoutEffect:nd,useMemo:ad,useReducer:vl,useRef:ed,useState:function(){return vl(hr)},useDebugValue:Za,useDeferredValue:function(e){var t=Fe();return ae===null?t.memoizedState=e:id(t,ae.memoizedState,e)},useTransition:function(){var e=vl(hr)[0],t=Fe().memoizedState;return[e,t]},useMutableSource:qc,useSyncExternalStore:Qc,useId:od,unstable_isNewReconciler:!1};function Ge(e,t){if(e&&e.defaultProps){t=ne({},t),e=e.defaultProps;for(var r in e)t[r]===void 0&&(t[r]=e[r]);return t}return t}function ta(e,t,r,s){t=e.memoizedState,r=r(s,t),r=r==null?t:ne({},t,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var Is={isMounted:function(e){return(e=e._reactInternals)?Zt(e)===e:!1},enqueueSetState:function(e,t,r){e=e._reactInternals;var s=je(),l=At(e),a=ut(s,l);a.payload=t,r!=null&&(a.callback=r),t=Tt(e,a,l),t!==null&&(Je(t,e,l,s),Kr(t,e,l))},enqueueReplaceState:function(e,t,r){e=e._reactInternals;var s=je(),l=At(e),a=ut(s,l);a.tag=1,a.payload=t,r!=null&&(a.callback=r),t=Tt(e,a,l),t!==null&&(Je(t,e,l,s),Kr(t,e,l))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var r=je(),s=At(e),l=ut(r,s);l.tag=2,t!=null&&(l.callback=t),t=Tt(e,l,s),t!==null&&(Je(t,e,s,r),Kr(t,e,s))}};function lo(e,t,r,s,l,a,i){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(s,a,i):t.prototype&&t.prototype.isPureReactComponent?!or(r,s)||!or(l,a):!0}function pd(e,t,r){var s=!1,l=_t,a=t.contextType;return typeof a=="object"&&a!==null?a=Ue(a):(l=Ce(t)?Gt:ge.current,s=t.contextTypes,a=(s=s!=null)?Nn(e,l):_t),t=new t(r,a),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=Is,e.stateNode=t,t._reactInternals=e,s&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=l,e.__reactInternalMemoizedMaskedChildContext=a),t}function ao(e,t,r,s){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(r,s),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(r,s),t.state!==e&&Is.enqueueReplaceState(t,t.state,null)}function na(e,t,r,s){var l=e.stateNode;l.props=r,l.state=e.memoizedState,l.refs={},Ha(e);var a=t.contextType;typeof a=="object"&&a!==null?l.context=Ue(a):(a=Ce(t)?Gt:ge.current,l.context=Nn(e,a)),l.state=e.memoizedState,a=t.getDerivedStateFromProps,typeof a=="function"&&(ta(e,t,a,r),l.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof l.getSnapshotBeforeUpdate=="function"||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(t=l.state,typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount(),t!==l.state&&Is.enqueueReplaceState(l,l.state,null),gs(e,r,l,s),l.state=e.memoizedState),typeof l.componentDidMount=="function"&&(e.flags|=4194308)}function Sn(e,t){try{var r="",s=t;do r+=Ju(s),s=s.return;while(s);var l=r}catch(a){l=`
Error generating stack: `+a.message+`
`+a.stack}return{value:e,source:t,stack:l,digest:null}}function yl(e,t,r){return{value:e,source:null,stack:r??null,digest:t??null}}function ra(e,t){try{console.error(t.value)}catch(r){setTimeout(function(){throw r})}}var km=typeof WeakMap=="function"?WeakMap:Map;function md(e,t,r){r=ut(-1,r),r.tag=3,r.payload={element:null};var s=t.value;return r.callback=function(){ws||(ws=!0,ma=s),ra(e,t)},r}function fd(e,t,r){r=ut(-1,r),r.tag=3;var s=e.type.getDerivedStateFromError;if(typeof s=="function"){var l=t.value;r.payload=function(){return s(l)},r.callback=function(){ra(e,t)}}var a=e.stateNode;return a!==null&&typeof a.componentDidCatch=="function"&&(r.callback=function(){ra(e,t),typeof s!="function"&&(Dt===null?Dt=new Set([this]):Dt.add(this));var i=t.stack;this.componentDidCatch(t.value,{componentStack:i!==null?i:""})}),r}function io(e,t,r){var s=e.pingCache;if(s===null){s=e.pingCache=new km;var l=new Set;s.set(t,l)}else l=s.get(t),l===void 0&&(l=new Set,s.set(t,l));l.has(r)||(l.add(r),e=Om.bind(null,e,t,r),t.then(e,e))}function oo(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function co(e,t,r,s,l){return e.mode&1?(e.flags|=65536,e.lanes=l,e):(e===t?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(t=ut(-1,1),t.tag=2,Tt(r,t,1))),r.lanes|=1),e)}var bm=xt.ReactCurrentOwner,be=!1;function ye(e,t,r,s){t.child=e===null?Bc(t,null,r,s):kn(t,e.child,r,s)}function uo(e,t,r,s,l){r=r.render;var a=t.ref;return vn(t,l),s=Ka(e,t,r,s,a,l),r=Ja(),e!==null&&!be?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,ht(e,t,l)):(X&&r&&Oa(t),t.flags|=1,ye(e,t,s,l),t.child)}function po(e,t,r,s,l){if(e===null){var a=r.type;return typeof a=="function"&&!ai(a)&&a.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(t.tag=15,t.type=a,hd(e,t,a,s,l)):(e=ts(r.type,null,s,t,t.mode,l),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!(e.lanes&l)){var i=a.memoizedProps;if(r=r.compare,r=r!==null?r:or,r(i,s)&&e.ref===t.ref)return ht(e,t,l)}return t.flags|=1,e=Mt(a,s),e.ref=t.ref,e.return=t,t.child=e}function hd(e,t,r,s,l){if(e!==null){var a=e.memoizedProps;if(or(a,s)&&e.ref===t.ref)if(be=!1,t.pendingProps=s=a,(e.lanes&l)!==0)e.flags&131072&&(be=!0);else return t.lanes=e.lanes,ht(e,t,l)}return sa(e,t,r,s,l)}function xd(e,t,r){var s=t.pendingProps,l=s.children,a=e!==null?e.memoizedState:null;if(s.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},Q(mn,Ee),Ee|=r;else{if(!(r&1073741824))return e=a!==null?a.baseLanes|r:r,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,Q(mn,Ee),Ee|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},s=a!==null?a.baseLanes:r,Q(mn,Ee),Ee|=s}else a!==null?(s=a.baseLanes|r,t.memoizedState=null):s=r,Q(mn,Ee),Ee|=s;return ye(e,t,l,r),t.child}function gd(e,t){var r=t.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(t.flags|=512,t.flags|=2097152)}function sa(e,t,r,s,l){var a=Ce(r)?Gt:ge.current;return a=Nn(t,a),vn(t,l),r=Ka(e,t,r,s,a,l),s=Ja(),e!==null&&!be?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~l,ht(e,t,l)):(X&&s&&Oa(t),t.flags|=1,ye(e,t,r,l),t.child)}function mo(e,t,r,s,l){if(Ce(r)){var a=!0;ps(t)}else a=!1;if(vn(t,l),t.stateNode===null)Zr(e,t),pd(t,r,s),na(t,r,s,l),s=!0;else if(e===null){var i=t.stateNode,c=t.memoizedProps;i.props=c;var o=i.context,p=r.contextType;typeof p=="object"&&p!==null?p=Ue(p):(p=Ce(r)?Gt:ge.current,p=Nn(t,p));var h=r.getDerivedStateFromProps,x=typeof h=="function"||typeof i.getSnapshotBeforeUpdate=="function";x||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(c!==s||o!==p)&&ao(t,i,s,p),Nt=!1;var m=t.memoizedState;i.state=m,gs(t,s,i,l),o=t.memoizedState,c!==s||m!==o||Se.current||Nt?(typeof h=="function"&&(ta(t,r,h,s),o=t.memoizedState),(c=Nt||lo(t,r,c,s,m,o,p))?(x||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount()),typeof i.componentDidMount=="function"&&(t.flags|=4194308)):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=s,t.memoizedState=o),i.props=s,i.state=o,i.context=p,s=c):(typeof i.componentDidMount=="function"&&(t.flags|=4194308),s=!1)}else{i=t.stateNode,Wc(e,t),c=t.memoizedProps,p=t.type===t.elementType?c:Ge(t.type,c),i.props=p,x=t.pendingProps,m=i.context,o=r.contextType,typeof o=="object"&&o!==null?o=Ue(o):(o=Ce(r)?Gt:ge.current,o=Nn(t,o));var u=r.getDerivedStateFromProps;(h=typeof u=="function"||typeof i.getSnapshotBeforeUpdate=="function")||typeof i.UNSAFE_componentWillReceiveProps!="function"&&typeof i.componentWillReceiveProps!="function"||(c!==x||m!==o)&&ao(t,i,s,o),Nt=!1,m=t.memoizedState,i.state=m,gs(t,s,i,l);var v=t.memoizedState;c!==x||m!==v||Se.current||Nt?(typeof u=="function"&&(ta(t,r,u,s),v=t.memoizedState),(p=Nt||lo(t,r,p,s,m,v,o)||!1)?(h||typeof i.UNSAFE_componentWillUpdate!="function"&&typeof i.componentWillUpdate!="function"||(typeof i.componentWillUpdate=="function"&&i.componentWillUpdate(s,v,o),typeof i.UNSAFE_componentWillUpdate=="function"&&i.UNSAFE_componentWillUpdate(s,v,o)),typeof i.componentDidUpdate=="function"&&(t.flags|=4),typeof i.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof i.componentDidUpdate!="function"||c===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),t.memoizedProps=s,t.memoizedState=v),i.props=s,i.state=v,i.context=o,s=p):(typeof i.componentDidUpdate!="function"||c===e.memoizedProps&&m===e.memoizedState||(t.flags|=4),typeof i.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&m===e.memoizedState||(t.flags|=1024),s=!1)}return la(e,t,r,s,a,l)}function la(e,t,r,s,l,a){gd(e,t);var i=(t.flags&128)!==0;if(!s&&!i)return l&&Yi(t,r,!1),ht(e,t,a);s=t.stateNode,bm.current=t;var c=i&&typeof r.getDerivedStateFromError!="function"?null:s.render();return t.flags|=1,e!==null&&i?(t.child=kn(t,e.child,null,a),t.child=kn(t,null,c,a)):ye(e,t,c,a),t.memoizedState=s.state,l&&Yi(t,r,!0),t.child}function vd(e){var t=e.stateNode;t.pendingContext?Ji(e,t.pendingContext,t.pendingContext!==t.context):t.context&&Ji(e,t.context,!1),Wa(e,t.containerInfo)}function fo(e,t,r,s,l){return wn(),Va(l),t.flags|=256,ye(e,t,r,s),t.child}var aa={dehydrated:null,treeContext:null,retryLane:0};function ia(e){return{baseLanes:e,cachePool:null,transitions:null}}function yd(e,t,r){var s=t.pendingProps,l=ee.current,a=!1,i=(t.flags&128)!==0,c;if((c=i)||(c=e!==null&&e.memoizedState===null?!1:(l&2)!==0),c?(a=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(l|=1),Q(ee,l&1),e===null)return Xl(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(i=s.children,e=s.fallback,a?(s=t.mode,a=t.child,i={mode:"hidden",children:i},!(s&1)&&a!==null?(a.childLanes=0,a.pendingProps=i):a=Os(i,s,0,null),e=Wt(e,s,r,null),a.return=t,e.return=t,a.sibling=e,t.child=a,t.child.memoizedState=ia(r),t.memoizedState=aa,e):Xa(t,i));if(l=e.memoizedState,l!==null&&(c=l.dehydrated,c!==null))return Sm(e,t,i,s,c,l,r);if(a){a=s.fallback,i=t.mode,l=e.child,c=l.sibling;var o={mode:"hidden",children:s.children};return!(i&1)&&t.child!==l?(s=t.child,s.childLanes=0,s.pendingProps=o,t.deletions=null):(s=Mt(l,o),s.subtreeFlags=l.subtreeFlags&14680064),c!==null?a=Mt(c,a):(a=Wt(a,i,r,null),a.flags|=2),a.return=t,s.return=t,s.sibling=a,t.child=s,s=a,a=t.child,i=e.child.memoizedState,i=i===null?ia(r):{baseLanes:i.baseLanes|r,cachePool:null,transitions:i.transitions},a.memoizedState=i,a.childLanes=e.childLanes&~r,t.memoizedState=aa,s}return a=e.child,e=a.sibling,s=Mt(a,{mode:"visible",children:s.children}),!(t.mode&1)&&(s.lanes=r),s.return=t,s.sibling=null,e!==null&&(r=t.deletions,r===null?(t.deletions=[e],t.flags|=16):r.push(e)),t.child=s,t.memoizedState=null,s}function Xa(e,t){return t=Os({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Ur(e,t,r,s){return s!==null&&Va(s),kn(t,e.child,null,r),e=Xa(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Sm(e,t,r,s,l,a,i){if(r)return t.flags&256?(t.flags&=-257,s=yl(Error(E(422))),Ur(e,t,i,s)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(a=s.fallback,l=t.mode,s=Os({mode:"visible",children:s.children},l,0,null),a=Wt(a,l,i,null),a.flags|=2,s.return=t,a.return=t,s.sibling=a,t.child=s,t.mode&1&&kn(t,e.child,null,i),t.child.memoizedState=ia(i),t.memoizedState=aa,a);if(!(t.mode&1))return Ur(e,t,i,null);if(l.data==="$!"){if(s=l.nextSibling&&l.nextSibling.dataset,s)var c=s.dgst;return s=c,a=Error(E(419)),s=yl(a,s,void 0),Ur(e,t,i,s)}if(c=(i&e.childLanes)!==0,be||c){if(s=ce,s!==null){switch(i&-i){case 4:l=2;break;case 16:l=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:l=32;break;case 536870912:l=268435456;break;default:l=0}l=l&(s.suspendedLanes|i)?0:l,l!==0&&l!==a.retryLane&&(a.retryLane=l,ft(e,l),Je(s,e,l,-1))}return li(),s=yl(Error(E(421))),Ur(e,t,i,s)}return l.data==="$?"?(t.flags|=128,t.child=e.child,t=Lm.bind(null,e),l._reactRetry=t,null):(e=a.treeContext,ze=zt(l.nextSibling),Te=t,X=!0,Qe=null,e!==null&&(Re[Oe++]=ct,Re[Oe++]=dt,Re[Oe++]=qt,ct=e.id,dt=e.overflow,qt=t),t=Xa(t,s.children),t.flags|=4096,t)}function ho(e,t,r){e.lanes|=t;var s=e.alternate;s!==null&&(s.lanes|=t),ea(e.return,t,r)}function jl(e,t,r,s,l){var a=e.memoizedState;a===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:s,tail:r,tailMode:l}:(a.isBackwards=t,a.rendering=null,a.renderingStartTime=0,a.last=s,a.tail=r,a.tailMode=l)}function jd(e,t,r){var s=t.pendingProps,l=s.revealOrder,a=s.tail;if(ye(e,t,s.children,r),s=ee.current,s&2)s=s&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&ho(e,r,t);else if(e.tag===19)ho(e,r,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}s&=1}if(Q(ee,s),!(t.mode&1))t.memoizedState=null;else switch(l){case"forwards":for(r=t.child,l=null;r!==null;)e=r.alternate,e!==null&&vs(e)===null&&(l=r),r=r.sibling;r=l,r===null?(l=t.child,t.child=null):(l=r.sibling,r.sibling=null),jl(t,!1,l,r,a);break;case"backwards":for(r=null,l=t.child,t.child=null;l!==null;){if(e=l.alternate,e!==null&&vs(e)===null){t.child=l;break}e=l.sibling,l.sibling=r,r=l,l=e}jl(t,!0,r,null,a);break;case"together":jl(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Zr(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function ht(e,t,r){if(e!==null&&(t.dependencies=e.dependencies),Kt|=t.lanes,!(r&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(E(153));if(t.child!==null){for(e=t.child,r=Mt(e,e.pendingProps),t.child=r,r.return=t;e.sibling!==null;)e=e.sibling,r=r.sibling=Mt(e,e.pendingProps),r.return=t;r.sibling=null}return t.child}function Cm(e,t,r){switch(t.tag){case 3:vd(t),wn();break;case 5:Gc(t);break;case 1:Ce(t.type)&&ps(t);break;case 4:Wa(t,t.stateNode.containerInfo);break;case 10:var s=t.type._context,l=t.memoizedProps.value;Q(hs,s._currentValue),s._currentValue=l;break;case 13:if(s=t.memoizedState,s!==null)return s.dehydrated!==null?(Q(ee,ee.current&1),t.flags|=128,null):r&t.child.childLanes?yd(e,t,r):(Q(ee,ee.current&1),e=ht(e,t,r),e!==null?e.sibling:null);Q(ee,ee.current&1);break;case 19:if(s=(r&t.childLanes)!==0,e.flags&128){if(s)return jd(e,t,r);t.flags|=128}if(l=t.memoizedState,l!==null&&(l.rendering=null,l.tail=null,l.lastEffect=null),Q(ee,ee.current),s)break;return null;case 22:case 23:return t.lanes=0,xd(e,t,r)}return ht(e,t,r)}var Nd,oa,wd,kd;Nd=function(e,t){for(var r=t.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};oa=function(){};wd=function(e,t,r,s){var l=e.memoizedProps;if(l!==s){e=t.stateNode,Bt(nt.current);var a=null;switch(r){case"input":l=Tl(e,l),s=Tl(e,s),a=[];break;case"select":l=ne({},l,{value:void 0}),s=ne({},s,{value:void 0}),a=[];break;case"textarea":l=Ml(e,l),s=Ml(e,s),a=[];break;default:typeof l.onClick!="function"&&typeof s.onClick=="function"&&(e.onclick=ds)}_l(r,s);var i;r=null;for(p in l)if(!s.hasOwnProperty(p)&&l.hasOwnProperty(p)&&l[p]!=null)if(p==="style"){var c=l[p];for(i in c)c.hasOwnProperty(i)&&(r||(r={}),r[i]="")}else p!=="dangerouslySetInnerHTML"&&p!=="children"&&p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(tr.hasOwnProperty(p)?a||(a=[]):(a=a||[]).push(p,null));for(p in s){var o=s[p];if(c=l!=null?l[p]:void 0,s.hasOwnProperty(p)&&o!==c&&(o!=null||c!=null))if(p==="style")if(c){for(i in c)!c.hasOwnProperty(i)||o&&o.hasOwnProperty(i)||(r||(r={}),r[i]="");for(i in o)o.hasOwnProperty(i)&&c[i]!==o[i]&&(r||(r={}),r[i]=o[i])}else r||(a||(a=[]),a.push(p,r)),r=o;else p==="dangerouslySetInnerHTML"?(o=o?o.__html:void 0,c=c?c.__html:void 0,o!=null&&c!==o&&(a=a||[]).push(p,o)):p==="children"?typeof o!="string"&&typeof o!="number"||(a=a||[]).push(p,""+o):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&(tr.hasOwnProperty(p)?(o!=null&&p==="onScroll"&&K("scroll",e),a||c===o||(a=[])):(a=a||[]).push(p,o))}r&&(a=a||[]).push("style",r);var p=a;(t.updateQueue=p)&&(t.flags|=4)}};kd=function(e,t,r,s){r!==s&&(t.flags|=4)};function Un(e,t){if(!X)switch(e.tailMode){case"hidden":t=e.tail;for(var r=null;t!==null;)t.alternate!==null&&(r=t),t=t.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var s=null;r!==null;)r.alternate!==null&&(s=r),r=r.sibling;s===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:s.sibling=null}}function he(e){var t=e.alternate!==null&&e.alternate.child===e.child,r=0,s=0;if(t)for(var l=e.child;l!==null;)r|=l.lanes|l.childLanes,s|=l.subtreeFlags&14680064,s|=l.flags&14680064,l.return=e,l=l.sibling;else for(l=e.child;l!==null;)r|=l.lanes|l.childLanes,s|=l.subtreeFlags,s|=l.flags,l.return=e,l=l.sibling;return e.subtreeFlags|=s,e.childLanes=r,t}function Pm(e,t,r){var s=t.pendingProps;switch(La(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return he(t),null;case 1:return Ce(t.type)&&us(),he(t),null;case 3:return s=t.stateNode,bn(),J(Se),J(ge),qa(),s.pendingContext&&(s.context=s.pendingContext,s.pendingContext=null),(e===null||e.child===null)&&(Lr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Qe!==null&&(xa(Qe),Qe=null))),oa(e,t),he(t),null;case 5:Ga(t);var l=Bt(mr.current);if(r=t.type,e!==null&&t.stateNode!=null)wd(e,t,r,s,l),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!s){if(t.stateNode===null)throw Error(E(166));return he(t),null}if(e=Bt(nt.current),Lr(t)){s=t.stateNode,r=t.type;var a=t.memoizedProps;switch(s[et]=t,s[ur]=a,e=(t.mode&1)!==0,r){case"dialog":K("cancel",s),K("close",s);break;case"iframe":case"object":case"embed":K("load",s);break;case"video":case"audio":for(l=0;l<Wn.length;l++)K(Wn[l],s);break;case"source":K("error",s);break;case"img":case"image":case"link":K("error",s),K("load",s);break;case"details":K("toggle",s);break;case"input":ki(s,a),K("invalid",s);break;case"select":s._wrapperState={wasMultiple:!!a.multiple},K("invalid",s);break;case"textarea":Si(s,a),K("invalid",s)}_l(r,a),l=null;for(var i in a)if(a.hasOwnProperty(i)){var c=a[i];i==="children"?typeof c=="string"?s.textContent!==c&&(a.suppressHydrationWarning!==!0&&Or(s.textContent,c,e),l=["children",c]):typeof c=="number"&&s.textContent!==""+c&&(a.suppressHydrationWarning!==!0&&Or(s.textContent,c,e),l=["children",""+c]):tr.hasOwnProperty(i)&&c!=null&&i==="onScroll"&&K("scroll",s)}switch(r){case"input":zr(s),bi(s,a,!0);break;case"textarea":zr(s),Ci(s);break;case"select":case"option":break;default:typeof a.onClick=="function"&&(s.onclick=ds)}s=l,t.updateQueue=s,s!==null&&(t.flags|=4)}else{i=l.nodeType===9?l:l.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Yo(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=i.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof s.is=="string"?e=i.createElement(r,{is:s.is}):(e=i.createElement(r),r==="select"&&(i=e,s.multiple?i.multiple=!0:s.size&&(i.size=s.size))):e=i.createElementNS(e,r),e[et]=t,e[ur]=s,Nd(e,t,!1,!1),t.stateNode=e;e:{switch(i=Rl(r,s),r){case"dialog":K("cancel",e),K("close",e),l=s;break;case"iframe":case"object":case"embed":K("load",e),l=s;break;case"video":case"audio":for(l=0;l<Wn.length;l++)K(Wn[l],e);l=s;break;case"source":K("error",e),l=s;break;case"img":case"image":case"link":K("error",e),K("load",e),l=s;break;case"details":K("toggle",e),l=s;break;case"input":ki(e,s),l=Tl(e,s),K("invalid",e);break;case"option":l=s;break;case"select":e._wrapperState={wasMultiple:!!s.multiple},l=ne({},s,{value:void 0}),K("invalid",e);break;case"textarea":Si(e,s),l=Ml(e,s),K("invalid",e);break;default:l=s}_l(r,l),c=l;for(a in c)if(c.hasOwnProperty(a)){var o=c[a];a==="style"?ec(e,o):a==="dangerouslySetInnerHTML"?(o=o?o.__html:void 0,o!=null&&Zo(e,o)):a==="children"?typeof o=="string"?(r!=="textarea"||o!=="")&&nr(e,o):typeof o=="number"&&nr(e,""+o):a!=="suppressContentEditableWarning"&&a!=="suppressHydrationWarning"&&a!=="autoFocus"&&(tr.hasOwnProperty(a)?o!=null&&a==="onScroll"&&K("scroll",e):o!=null&&ka(e,a,o,i))}switch(r){case"input":zr(e),bi(e,s,!1);break;case"textarea":zr(e),Ci(e);break;case"option":s.value!=null&&e.setAttribute("value",""+It(s.value));break;case"select":e.multiple=!!s.multiple,a=s.value,a!=null?fn(e,!!s.multiple,a,!1):s.defaultValue!=null&&fn(e,!!s.multiple,s.defaultValue,!0);break;default:typeof l.onClick=="function"&&(e.onclick=ds)}switch(r){case"button":case"input":case"select":case"textarea":s=!!s.autoFocus;break e;case"img":s=!0;break e;default:s=!1}}s&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return he(t),null;case 6:if(e&&t.stateNode!=null)kd(e,t,e.memoizedProps,s);else{if(typeof s!="string"&&t.stateNode===null)throw Error(E(166));if(r=Bt(mr.current),Bt(nt.current),Lr(t)){if(s=t.stateNode,r=t.memoizedProps,s[et]=t,(a=s.nodeValue!==r)&&(e=Te,e!==null))switch(e.tag){case 3:Or(s.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&Or(s.nodeValue,r,(e.mode&1)!==0)}a&&(t.flags|=4)}else s=(r.nodeType===9?r:r.ownerDocument).createTextNode(s),s[et]=t,t.stateNode=s}return he(t),null;case 13:if(J(ee),s=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(X&&ze!==null&&t.mode&1&&!(t.flags&128))Fc(),wn(),t.flags|=98560,a=!1;else if(a=Lr(t),s!==null&&s.dehydrated!==null){if(e===null){if(!a)throw Error(E(318));if(a=t.memoizedState,a=a!==null?a.dehydrated:null,!a)throw Error(E(317));a[et]=t}else wn(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;he(t),a=!1}else Qe!==null&&(xa(Qe),Qe=null),a=!0;if(!a)return t.flags&65536?t:null}return t.flags&128?(t.lanes=r,t):(s=s!==null,s!==(e!==null&&e.memoizedState!==null)&&s&&(t.child.flags|=8192,t.mode&1&&(e===null||ee.current&1?ie===0&&(ie=3):li())),t.updateQueue!==null&&(t.flags|=4),he(t),null);case 4:return bn(),oa(e,t),e===null&&cr(t.stateNode.containerInfo),he(t),null;case 10:return $a(t.type._context),he(t),null;case 17:return Ce(t.type)&&us(),he(t),null;case 19:if(J(ee),a=t.memoizedState,a===null)return he(t),null;if(s=(t.flags&128)!==0,i=a.rendering,i===null)if(s)Un(a,!1);else{if(ie!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(i=vs(e),i!==null){for(t.flags|=128,Un(a,!1),s=i.updateQueue,s!==null&&(t.updateQueue=s,t.flags|=4),t.subtreeFlags=0,s=r,r=t.child;r!==null;)a=r,e=s,a.flags&=14680066,i=a.alternate,i===null?(a.childLanes=0,a.lanes=e,a.child=null,a.subtreeFlags=0,a.memoizedProps=null,a.memoizedState=null,a.updateQueue=null,a.dependencies=null,a.stateNode=null):(a.childLanes=i.childLanes,a.lanes=i.lanes,a.child=i.child,a.subtreeFlags=0,a.deletions=null,a.memoizedProps=i.memoizedProps,a.memoizedState=i.memoizedState,a.updateQueue=i.updateQueue,a.type=i.type,e=i.dependencies,a.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return Q(ee,ee.current&1|2),t.child}e=e.sibling}a.tail!==null&&se()>Cn&&(t.flags|=128,s=!0,Un(a,!1),t.lanes=4194304)}else{if(!s)if(e=vs(i),e!==null){if(t.flags|=128,s=!0,r=e.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),Un(a,!0),a.tail===null&&a.tailMode==="hidden"&&!i.alternate&&!X)return he(t),null}else 2*se()-a.renderingStartTime>Cn&&r!==1073741824&&(t.flags|=128,s=!0,Un(a,!1),t.lanes=4194304);a.isBackwards?(i.sibling=t.child,t.child=i):(r=a.last,r!==null?r.sibling=i:t.child=i,a.last=i)}return a.tail!==null?(t=a.tail,a.rendering=t,a.tail=t.sibling,a.renderingStartTime=se(),t.sibling=null,r=ee.current,Q(ee,s?r&1|2:r&1),t):(he(t),null);case 22:case 23:return si(),s=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==s&&(t.flags|=8192),s&&t.mode&1?Ee&1073741824&&(he(t),t.subtreeFlags&6&&(t.flags|=8192)):he(t),null;case 24:return null;case 25:return null}throw Error(E(156,t.tag))}function Em(e,t){switch(La(t),t.tag){case 1:return Ce(t.type)&&us(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return bn(),J(Se),J(ge),qa(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Ga(t),null;case 13:if(J(ee),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(E(340));wn()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return J(ee),null;case 4:return bn(),null;case 10:return $a(t.type._context),null;case 22:case 23:return si(),null;case 24:return null;default:return null}}var Fr=!1,xe=!1,zm=typeof WeakSet=="function"?WeakSet:Set,A=null;function pn(e,t){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(s){re(e,t,s)}else r.current=null}function ca(e,t,r){try{r()}catch(s){re(e,t,s)}}var xo=!1;function Tm(e,t){if(Gl=is,e=Ec(),Ra(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var s=r.getSelection&&r.getSelection();if(s&&s.rangeCount!==0){r=s.anchorNode;var l=s.anchorOffset,a=s.focusNode;s=s.focusOffset;try{r.nodeType,a.nodeType}catch{r=null;break e}var i=0,c=-1,o=-1,p=0,h=0,x=e,m=null;t:for(;;){for(var u;x!==r||l!==0&&x.nodeType!==3||(c=i+l),x!==a||s!==0&&x.nodeType!==3||(o=i+s),x.nodeType===3&&(i+=x.nodeValue.length),(u=x.firstChild)!==null;)m=x,x=u;for(;;){if(x===e)break t;if(m===r&&++p===l&&(c=i),m===a&&++h===s&&(o=i),(u=x.nextSibling)!==null)break;x=m,m=x.parentNode}x=u}r=c===-1||o===-1?null:{start:c,end:o}}else r=null}r=r||{start:0,end:0}}else r=null;for(ql={focusedElem:e,selectionRange:r},is=!1,A=t;A!==null;)if(t=A,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,A=e;else for(;A!==null;){t=A;try{var v=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var N=v.memoizedProps,S=v.memoizedState,f=t.stateNode,d=f.getSnapshotBeforeUpdate(t.elementType===t.type?N:Ge(t.type,N),S);f.__reactInternalSnapshotBeforeUpdate=d}break;case 3:var g=t.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(E(163))}}catch(b){re(t,t.return,b)}if(e=t.sibling,e!==null){e.return=t.return,A=e;break}A=t.return}return v=xo,xo=!1,v}function Zn(e,t,r){var s=t.updateQueue;if(s=s!==null?s.lastEffect:null,s!==null){var l=s=s.next;do{if((l.tag&e)===e){var a=l.destroy;l.destroy=void 0,a!==void 0&&ca(t,r,a)}l=l.next}while(l!==s)}}function _s(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var r=t=t.next;do{if((r.tag&e)===e){var s=r.create;r.destroy=s()}r=r.next}while(r!==t)}}function da(e){var t=e.ref;if(t!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof t=="function"?t(e):t.current=e}}function bd(e){var t=e.alternate;t!==null&&(e.alternate=null,bd(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[et],delete t[ur],delete t[Jl],delete t[pm],delete t[mm])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function Sd(e){return e.tag===5||e.tag===3||e.tag===4}function go(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||Sd(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function ua(e,t,r){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?r.nodeType===8?r.parentNode.insertBefore(e,t):r.insertBefore(e,t):(r.nodeType===8?(t=r.parentNode,t.insertBefore(e,r)):(t=r,t.appendChild(e)),r=r._reactRootContainer,r!=null||t.onclick!==null||(t.onclick=ds));else if(s!==4&&(e=e.child,e!==null))for(ua(e,t,r),e=e.sibling;e!==null;)ua(e,t,r),e=e.sibling}function pa(e,t,r){var s=e.tag;if(s===5||s===6)e=e.stateNode,t?r.insertBefore(e,t):r.appendChild(e);else if(s!==4&&(e=e.child,e!==null))for(pa(e,t,r),e=e.sibling;e!==null;)pa(e,t,r),e=e.sibling}var de=null,qe=!1;function yt(e,t,r){for(r=r.child;r!==null;)Cd(e,t,r),r=r.sibling}function Cd(e,t,r){if(tt&&typeof tt.onCommitFiberUnmount=="function")try{tt.onCommitFiberUnmount(Ps,r)}catch{}switch(r.tag){case 5:xe||pn(r,t);case 6:var s=de,l=qe;de=null,yt(e,t,r),de=s,qe=l,de!==null&&(qe?(e=de,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):de.removeChild(r.stateNode));break;case 18:de!==null&&(qe?(e=de,r=r.stateNode,e.nodeType===8?ml(e.parentNode,r):e.nodeType===1&&ml(e,r),ar(e)):ml(de,r.stateNode));break;case 4:s=de,l=qe,de=r.stateNode.containerInfo,qe=!0,yt(e,t,r),de=s,qe=l;break;case 0:case 11:case 14:case 15:if(!xe&&(s=r.updateQueue,s!==null&&(s=s.lastEffect,s!==null))){l=s=s.next;do{var a=l,i=a.destroy;a=a.tag,i!==void 0&&(a&2||a&4)&&ca(r,t,i),l=l.next}while(l!==s)}yt(e,t,r);break;case 1:if(!xe&&(pn(r,t),s=r.stateNode,typeof s.componentWillUnmount=="function"))try{s.props=r.memoizedProps,s.state=r.memoizedState,s.componentWillUnmount()}catch(c){re(r,t,c)}yt(e,t,r);break;case 21:yt(e,t,r);break;case 22:r.mode&1?(xe=(s=xe)||r.memoizedState!==null,yt(e,t,r),xe=s):yt(e,t,r);break;default:yt(e,t,r)}}function vo(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new zm),t.forEach(function(s){var l=Vm.bind(null,e,s);r.has(s)||(r.add(s),s.then(l,l))})}}function We(e,t){var r=t.deletions;if(r!==null)for(var s=0;s<r.length;s++){var l=r[s];try{var a=e,i=t,c=i;e:for(;c!==null;){switch(c.tag){case 5:de=c.stateNode,qe=!1;break e;case 3:de=c.stateNode.containerInfo,qe=!0;break e;case 4:de=c.stateNode.containerInfo,qe=!0;break e}c=c.return}if(de===null)throw Error(E(160));Cd(a,i,l),de=null,qe=!1;var o=l.alternate;o!==null&&(o.return=null),l.return=null}catch(p){re(l,t,p)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)Pd(t,e),t=t.sibling}function Pd(e,t){var r=e.alternate,s=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(We(t,e),Ze(e),s&4){try{Zn(3,e,e.return),_s(3,e)}catch(N){re(e,e.return,N)}try{Zn(5,e,e.return)}catch(N){re(e,e.return,N)}}break;case 1:We(t,e),Ze(e),s&512&&r!==null&&pn(r,r.return);break;case 5:if(We(t,e),Ze(e),s&512&&r!==null&&pn(r,r.return),e.flags&32){var l=e.stateNode;try{nr(l,"")}catch(N){re(e,e.return,N)}}if(s&4&&(l=e.stateNode,l!=null)){var a=e.memoizedProps,i=r!==null?r.memoizedProps:a,c=e.type,o=e.updateQueue;if(e.updateQueue=null,o!==null)try{c==="input"&&a.type==="radio"&&a.name!=null&&Ko(l,a),Rl(c,i);var p=Rl(c,a);for(i=0;i<o.length;i+=2){var h=o[i],x=o[i+1];h==="style"?ec(l,x):h==="dangerouslySetInnerHTML"?Zo(l,x):h==="children"?nr(l,x):ka(l,h,x,p)}switch(c){case"input":Dl(l,a);break;case"textarea":Jo(l,a);break;case"select":var m=l._wrapperState.wasMultiple;l._wrapperState.wasMultiple=!!a.multiple;var u=a.value;u!=null?fn(l,!!a.multiple,u,!1):m!==!!a.multiple&&(a.defaultValue!=null?fn(l,!!a.multiple,a.defaultValue,!0):fn(l,!!a.multiple,a.multiple?[]:"",!1))}l[ur]=a}catch(N){re(e,e.return,N)}}break;case 6:if(We(t,e),Ze(e),s&4){if(e.stateNode===null)throw Error(E(162));l=e.stateNode,a=e.memoizedProps;try{l.nodeValue=a}catch(N){re(e,e.return,N)}}break;case 3:if(We(t,e),Ze(e),s&4&&r!==null&&r.memoizedState.isDehydrated)try{ar(t.containerInfo)}catch(N){re(e,e.return,N)}break;case 4:We(t,e),Ze(e);break;case 13:We(t,e),Ze(e),l=e.child,l.flags&8192&&(a=l.memoizedState!==null,l.stateNode.isHidden=a,!a||l.alternate!==null&&l.alternate.memoizedState!==null||(ni=se())),s&4&&vo(e);break;case 22:if(h=r!==null&&r.memoizedState!==null,e.mode&1?(xe=(p=xe)||h,We(t,e),xe=p):We(t,e),Ze(e),s&8192){if(p=e.memoizedState!==null,(e.stateNode.isHidden=p)&&!h&&e.mode&1)for(A=e,h=e.child;h!==null;){for(x=A=h;A!==null;){switch(m=A,u=m.child,m.tag){case 0:case 11:case 14:case 15:Zn(4,m,m.return);break;case 1:pn(m,m.return);var v=m.stateNode;if(typeof v.componentWillUnmount=="function"){s=m,r=m.return;try{t=s,v.props=t.memoizedProps,v.state=t.memoizedState,v.componentWillUnmount()}catch(N){re(s,r,N)}}break;case 5:pn(m,m.return);break;case 22:if(m.memoizedState!==null){jo(x);continue}}u!==null?(u.return=m,A=u):jo(x)}h=h.sibling}e:for(h=null,x=e;;){if(x.tag===5){if(h===null){h=x;try{l=x.stateNode,p?(a=l.style,typeof a.setProperty=="function"?a.setProperty("display","none","important"):a.display="none"):(c=x.stateNode,o=x.memoizedProps.style,i=o!=null&&o.hasOwnProperty("display")?o.display:null,c.style.display=Xo("display",i))}catch(N){re(e,e.return,N)}}}else if(x.tag===6){if(h===null)try{x.stateNode.nodeValue=p?"":x.memoizedProps}catch(N){re(e,e.return,N)}}else if((x.tag!==22&&x.tag!==23||x.memoizedState===null||x===e)&&x.child!==null){x.child.return=x,x=x.child;continue}if(x===e)break e;for(;x.sibling===null;){if(x.return===null||x.return===e)break e;h===x&&(h=null),x=x.return}h===x&&(h=null),x.sibling.return=x.return,x=x.sibling}}break;case 19:We(t,e),Ze(e),s&4&&vo(e);break;case 21:break;default:We(t,e),Ze(e)}}function Ze(e){var t=e.flags;if(t&2){try{e:{for(var r=e.return;r!==null;){if(Sd(r)){var s=r;break e}r=r.return}throw Error(E(160))}switch(s.tag){case 5:var l=s.stateNode;s.flags&32&&(nr(l,""),s.flags&=-33);var a=go(e);pa(e,a,l);break;case 3:case 4:var i=s.stateNode.containerInfo,c=go(e);ua(e,c,i);break;default:throw Error(E(161))}}catch(o){re(e,e.return,o)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Dm(e,t,r){A=e,Ed(e)}function Ed(e,t,r){for(var s=(e.mode&1)!==0;A!==null;){var l=A,a=l.child;if(l.tag===22&&s){var i=l.memoizedState!==null||Fr;if(!i){var c=l.alternate,o=c!==null&&c.memoizedState!==null||xe;c=Fr;var p=xe;if(Fr=i,(xe=o)&&!p)for(A=l;A!==null;)i=A,o=i.child,i.tag===22&&i.memoizedState!==null?No(l):o!==null?(o.return=i,A=o):No(l);for(;a!==null;)A=a,Ed(a),a=a.sibling;A=l,Fr=c,xe=p}yo(e)}else l.subtreeFlags&8772&&a!==null?(a.return=l,A=a):yo(e)}}function yo(e){for(;A!==null;){var t=A;if(t.flags&8772){var r=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:xe||_s(5,t);break;case 1:var s=t.stateNode;if(t.flags&4&&!xe)if(r===null)s.componentDidMount();else{var l=t.elementType===t.type?r.memoizedProps:Ge(t.type,r.memoizedProps);s.componentDidUpdate(l,r.memoizedState,s.__reactInternalSnapshotBeforeUpdate)}var a=t.updateQueue;a!==null&&no(t,a,s);break;case 3:var i=t.updateQueue;if(i!==null){if(r=null,t.child!==null)switch(t.child.tag){case 5:r=t.child.stateNode;break;case 1:r=t.child.stateNode}no(t,i,r)}break;case 5:var c=t.stateNode;if(r===null&&t.flags&4){r=c;var o=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":o.autoFocus&&r.focus();break;case"img":o.src&&(r.src=o.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var p=t.alternate;if(p!==null){var h=p.memoizedState;if(h!==null){var x=h.dehydrated;x!==null&&ar(x)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(E(163))}xe||t.flags&512&&da(t)}catch(m){re(t,t.return,m)}}if(t===e){A=null;break}if(r=t.sibling,r!==null){r.return=t.return,A=r;break}A=t.return}}function jo(e){for(;A!==null;){var t=A;if(t===e){A=null;break}var r=t.sibling;if(r!==null){r.return=t.return,A=r;break}A=t.return}}function No(e){for(;A!==null;){var t=A;try{switch(t.tag){case 0:case 11:case 15:var r=t.return;try{_s(4,t)}catch(o){re(t,r,o)}break;case 1:var s=t.stateNode;if(typeof s.componentDidMount=="function"){var l=t.return;try{s.componentDidMount()}catch(o){re(t,l,o)}}var a=t.return;try{da(t)}catch(o){re(t,a,o)}break;case 5:var i=t.return;try{da(t)}catch(o){re(t,i,o)}}}catch(o){re(t,t.return,o)}if(t===e){A=null;break}var c=t.sibling;if(c!==null){c.return=t.return,A=c;break}A=t.return}}var Am=Math.ceil,Ns=xt.ReactCurrentDispatcher,ei=xt.ReactCurrentOwner,Ve=xt.ReactCurrentBatchConfig,F=0,ce=null,le=null,ue=0,Ee=0,mn=Ot(0),ie=0,gr=null,Kt=0,Rs=0,ti=0,Xn=null,ke=null,ni=0,Cn=1/0,at=null,ws=!1,ma=null,Dt=null,$r=!1,St=null,ks=0,er=0,fa=null,Xr=-1,es=0;function je(){return F&6?se():Xr!==-1?Xr:Xr=se()}function At(e){return e.mode&1?F&2&&ue!==0?ue&-ue:hm.transition!==null?(es===0&&(es=pc()),es):(e=W,e!==0||(e=window.event,e=e===void 0?16:yc(e.type)),e):1}function Je(e,t,r,s){if(50<er)throw er=0,fa=null,Error(E(185));yr(e,r,s),(!(F&2)||e!==ce)&&(e===ce&&(!(F&2)&&(Rs|=r),ie===4&&kt(e,ue)),Pe(e,s),r===1&&F===0&&!(t.mode&1)&&(Cn=se()+500,As&&Lt()))}function Pe(e,t){var r=e.callbackNode;hp(e,t);var s=as(e,e===ce?ue:0);if(s===0)r!==null&&zi(r),e.callbackNode=null,e.callbackPriority=0;else if(t=s&-s,e.callbackPriority!==t){if(r!=null&&zi(r),t===1)e.tag===0?fm(wo.bind(null,e)):Lc(wo.bind(null,e)),dm(function(){!(F&6)&&Lt()}),r=null;else{switch(mc(s)){case 1:r=Ea;break;case 4:r=dc;break;case 16:r=ls;break;case 536870912:r=uc;break;default:r=ls}r=Rd(r,zd.bind(null,e))}e.callbackPriority=t,e.callbackNode=r}}function zd(e,t){if(Xr=-1,es=0,F&6)throw Error(E(327));var r=e.callbackNode;if(yn()&&e.callbackNode!==r)return null;var s=as(e,e===ce?ue:0);if(s===0)return null;if(s&30||s&e.expiredLanes||t)t=bs(e,s);else{t=s;var l=F;F|=2;var a=Dd();(ce!==e||ue!==t)&&(at=null,Cn=se()+500,Ht(e,t));do try{_m();break}catch(c){Td(e,c)}while(!0);Fa(),Ns.current=a,F=l,le!==null?t=0:(ce=null,ue=0,t=ie)}if(t!==0){if(t===2&&(l=Fl(e),l!==0&&(s=l,t=ha(e,l))),t===1)throw r=gr,Ht(e,0),kt(e,s),Pe(e,se()),r;if(t===6)kt(e,s);else{if(l=e.current.alternate,!(s&30)&&!Mm(l)&&(t=bs(e,s),t===2&&(a=Fl(e),a!==0&&(s=a,t=ha(e,a))),t===1))throw r=gr,Ht(e,0),kt(e,s),Pe(e,se()),r;switch(e.finishedWork=l,e.finishedLanes=s,t){case 0:case 1:throw Error(E(345));case 2:Ut(e,ke,at);break;case 3:if(kt(e,s),(s&130023424)===s&&(t=ni+500-se(),10<t)){if(as(e,0)!==0)break;if(l=e.suspendedLanes,(l&s)!==s){je(),e.pingedLanes|=e.suspendedLanes&l;break}e.timeoutHandle=Kl(Ut.bind(null,e,ke,at),t);break}Ut(e,ke,at);break;case 4:if(kt(e,s),(s&4194240)===s)break;for(t=e.eventTimes,l=-1;0<s;){var i=31-Ke(s);a=1<<i,i=t[i],i>l&&(l=i),s&=~a}if(s=l,s=se()-s,s=(120>s?120:480>s?480:1080>s?1080:1920>s?1920:3e3>s?3e3:4320>s?4320:1960*Am(s/1960))-s,10<s){e.timeoutHandle=Kl(Ut.bind(null,e,ke,at),s);break}Ut(e,ke,at);break;case 5:Ut(e,ke,at);break;default:throw Error(E(329))}}}return Pe(e,se()),e.callbackNode===r?zd.bind(null,e):null}function ha(e,t){var r=Xn;return e.current.memoizedState.isDehydrated&&(Ht(e,t).flags|=256),e=bs(e,t),e!==2&&(t=ke,ke=r,t!==null&&xa(t)),e}function xa(e){ke===null?ke=e:ke.push.apply(ke,e)}function Mm(e){for(var t=e;;){if(t.flags&16384){var r=t.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var s=0;s<r.length;s++){var l=r[s],a=l.getSnapshot;l=l.value;try{if(!Ye(a(),l))return!1}catch{return!1}}}if(r=t.child,t.subtreeFlags&16384&&r!==null)r.return=t,t=r;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function kt(e,t){for(t&=~ti,t&=~Rs,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var r=31-Ke(t),s=1<<r;e[r]=-1,t&=~s}}function wo(e){if(F&6)throw Error(E(327));yn();var t=as(e,0);if(!(t&1))return Pe(e,se()),null;var r=bs(e,t);if(e.tag!==0&&r===2){var s=Fl(e);s!==0&&(t=s,r=ha(e,s))}if(r===1)throw r=gr,Ht(e,0),kt(e,t),Pe(e,se()),r;if(r===6)throw Error(E(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Ut(e,ke,at),Pe(e,se()),null}function ri(e,t){var r=F;F|=1;try{return e(t)}finally{F=r,F===0&&(Cn=se()+500,As&&Lt())}}function Jt(e){St!==null&&St.tag===0&&!(F&6)&&yn();var t=F;F|=1;var r=Ve.transition,s=W;try{if(Ve.transition=null,W=1,e)return e()}finally{W=s,Ve.transition=r,F=t,!(F&6)&&Lt()}}function si(){Ee=mn.current,J(mn)}function Ht(e,t){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,cm(r)),le!==null)for(r=le.return;r!==null;){var s=r;switch(La(s),s.tag){case 1:s=s.type.childContextTypes,s!=null&&us();break;case 3:bn(),J(Se),J(ge),qa();break;case 5:Ga(s);break;case 4:bn();break;case 13:J(ee);break;case 19:J(ee);break;case 10:$a(s.type._context);break;case 22:case 23:si()}r=r.return}if(ce=e,le=e=Mt(e.current,null),ue=Ee=t,ie=0,gr=null,ti=Rs=Kt=0,ke=Xn=null,$t!==null){for(t=0;t<$t.length;t++)if(r=$t[t],s=r.interleaved,s!==null){r.interleaved=null;var l=s.next,a=r.pending;if(a!==null){var i=a.next;a.next=l,s.next=i}r.pending=s}$t=null}return e}function Td(e,t){do{var r=le;try{if(Fa(),Jr.current=js,ys){for(var s=te.memoizedState;s!==null;){var l=s.queue;l!==null&&(l.pending=null),s=s.next}ys=!1}if(Qt=0,oe=ae=te=null,Yn=!1,fr=0,ei.current=null,r===null||r.return===null){ie=1,gr=t,le=null;break}e:{var a=e,i=r.return,c=r,o=t;if(t=ue,c.flags|=32768,o!==null&&typeof o=="object"&&typeof o.then=="function"){var p=o,h=c,x=h.tag;if(!(h.mode&1)&&(x===0||x===11||x===15)){var m=h.alternate;m?(h.updateQueue=m.updateQueue,h.memoizedState=m.memoizedState,h.lanes=m.lanes):(h.updateQueue=null,h.memoizedState=null)}var u=oo(i);if(u!==null){u.flags&=-257,co(u,i,c,a,t),u.mode&1&&io(a,p,t),t=u,o=p;var v=t.updateQueue;if(v===null){var N=new Set;N.add(o),t.updateQueue=N}else v.add(o);break e}else{if(!(t&1)){io(a,p,t),li();break e}o=Error(E(426))}}else if(X&&c.mode&1){var S=oo(i);if(S!==null){!(S.flags&65536)&&(S.flags|=256),co(S,i,c,a,t),Va(Sn(o,c));break e}}a=o=Sn(o,c),ie!==4&&(ie=2),Xn===null?Xn=[a]:Xn.push(a),a=i;do{switch(a.tag){case 3:a.flags|=65536,t&=-t,a.lanes|=t;var f=md(a,o,t);to(a,f);break e;case 1:c=o;var d=a.type,g=a.stateNode;if(!(a.flags&128)&&(typeof d.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(Dt===null||!Dt.has(g)))){a.flags|=65536,t&=-t,a.lanes|=t;var b=fd(a,c,t);to(a,b);break e}}a=a.return}while(a!==null)}Md(r)}catch(P){t=P,le===r&&r!==null&&(le=r=r.return);continue}break}while(!0)}function Dd(){var e=Ns.current;return Ns.current=js,e===null?js:e}function li(){(ie===0||ie===3||ie===2)&&(ie=4),ce===null||!(Kt&268435455)&&!(Rs&268435455)||kt(ce,ue)}function bs(e,t){var r=F;F|=2;var s=Dd();(ce!==e||ue!==t)&&(at=null,Ht(e,t));do try{Im();break}catch(l){Td(e,l)}while(!0);if(Fa(),F=r,Ns.current=s,le!==null)throw Error(E(261));return ce=null,ue=0,ie}function Im(){for(;le!==null;)Ad(le)}function _m(){for(;le!==null&&!ap();)Ad(le)}function Ad(e){var t=_d(e.alternate,e,Ee);e.memoizedProps=e.pendingProps,t===null?Md(e):le=t,ei.current=null}function Md(e){var t=e;do{var r=t.alternate;if(e=t.return,t.flags&32768){if(r=Em(r,t),r!==null){r.flags&=32767,le=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ie=6,le=null;return}}else if(r=Pm(r,t,Ee),r!==null){le=r;return}if(t=t.sibling,t!==null){le=t;return}le=t=e}while(t!==null);ie===0&&(ie=5)}function Ut(e,t,r){var s=W,l=Ve.transition;try{Ve.transition=null,W=1,Rm(e,t,r,s)}finally{Ve.transition=l,W=s}return null}function Rm(e,t,r,s){do yn();while(St!==null);if(F&6)throw Error(E(327));r=e.finishedWork;var l=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(E(177));e.callbackNode=null,e.callbackPriority=0;var a=r.lanes|r.childLanes;if(xp(e,a),e===ce&&(le=ce=null,ue=0),!(r.subtreeFlags&2064)&&!(r.flags&2064)||$r||($r=!0,Rd(ls,function(){return yn(),null})),a=(r.flags&15990)!==0,r.subtreeFlags&15990||a){a=Ve.transition,Ve.transition=null;var i=W;W=1;var c=F;F|=4,ei.current=null,Tm(e,r),Pd(r,e),nm(ql),is=!!Gl,ql=Gl=null,e.current=r,Dm(r),ip(),F=c,W=i,Ve.transition=a}else e.current=r;if($r&&($r=!1,St=e,ks=l),a=e.pendingLanes,a===0&&(Dt=null),dp(r.stateNode),Pe(e,se()),t!==null)for(s=e.onRecoverableError,r=0;r<t.length;r++)l=t[r],s(l.value,{componentStack:l.stack,digest:l.digest});if(ws)throw ws=!1,e=ma,ma=null,e;return ks&1&&e.tag!==0&&yn(),a=e.pendingLanes,a&1?e===fa?er++:(er=0,fa=e):er=0,Lt(),null}function yn(){if(St!==null){var e=mc(ks),t=Ve.transition,r=W;try{if(Ve.transition=null,W=16>e?16:e,St===null)var s=!1;else{if(e=St,St=null,ks=0,F&6)throw Error(E(331));var l=F;for(F|=4,A=e.current;A!==null;){var a=A,i=a.child;if(A.flags&16){var c=a.deletions;if(c!==null){for(var o=0;o<c.length;o++){var p=c[o];for(A=p;A!==null;){var h=A;switch(h.tag){case 0:case 11:case 15:Zn(8,h,a)}var x=h.child;if(x!==null)x.return=h,A=x;else for(;A!==null;){h=A;var m=h.sibling,u=h.return;if(bd(h),h===p){A=null;break}if(m!==null){m.return=u,A=m;break}A=u}}}var v=a.alternate;if(v!==null){var N=v.child;if(N!==null){v.child=null;do{var S=N.sibling;N.sibling=null,N=S}while(N!==null)}}A=a}}if(a.subtreeFlags&2064&&i!==null)i.return=a,A=i;else e:for(;A!==null;){if(a=A,a.flags&2048)switch(a.tag){case 0:case 11:case 15:Zn(9,a,a.return)}var f=a.sibling;if(f!==null){f.return=a.return,A=f;break e}A=a.return}}var d=e.current;for(A=d;A!==null;){i=A;var g=i.child;if(i.subtreeFlags&2064&&g!==null)g.return=i,A=g;else e:for(i=d;A!==null;){if(c=A,c.flags&2048)try{switch(c.tag){case 0:case 11:case 15:_s(9,c)}}catch(P){re(c,c.return,P)}if(c===i){A=null;break e}var b=c.sibling;if(b!==null){b.return=c.return,A=b;break e}A=c.return}}if(F=l,Lt(),tt&&typeof tt.onPostCommitFiberRoot=="function")try{tt.onPostCommitFiberRoot(Ps,e)}catch{}s=!0}return s}finally{W=r,Ve.transition=t}}return!1}function ko(e,t,r){t=Sn(r,t),t=md(e,t,1),e=Tt(e,t,1),t=je(),e!==null&&(yr(e,1,t),Pe(e,t))}function re(e,t,r){if(e.tag===3)ko(e,e,r);else for(;t!==null;){if(t.tag===3){ko(t,e,r);break}else if(t.tag===1){var s=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof s.componentDidCatch=="function"&&(Dt===null||!Dt.has(s))){e=Sn(r,e),e=fd(t,e,1),t=Tt(t,e,1),e=je(),t!==null&&(yr(t,1,e),Pe(t,e));break}}t=t.return}}function Om(e,t,r){var s=e.pingCache;s!==null&&s.delete(t),t=je(),e.pingedLanes|=e.suspendedLanes&r,ce===e&&(ue&r)===r&&(ie===4||ie===3&&(ue&130023424)===ue&&500>se()-ni?Ht(e,0):ti|=r),Pe(e,t)}function Id(e,t){t===0&&(e.mode&1?(t=Ar,Ar<<=1,!(Ar&130023424)&&(Ar=4194304)):t=1);var r=je();e=ft(e,t),e!==null&&(yr(e,t,r),Pe(e,r))}function Lm(e){var t=e.memoizedState,r=0;t!==null&&(r=t.retryLane),Id(e,r)}function Vm(e,t){var r=0;switch(e.tag){case 13:var s=e.stateNode,l=e.memoizedState;l!==null&&(r=l.retryLane);break;case 19:s=e.stateNode;break;default:throw Error(E(314))}s!==null&&s.delete(t),Id(e,r)}var _d;_d=function(e,t,r){if(e!==null)if(e.memoizedProps!==t.pendingProps||Se.current)be=!0;else{if(!(e.lanes&r)&&!(t.flags&128))return be=!1,Cm(e,t,r);be=!!(e.flags&131072)}else be=!1,X&&t.flags&1048576&&Vc(t,fs,t.index);switch(t.lanes=0,t.tag){case 2:var s=t.type;Zr(e,t),e=t.pendingProps;var l=Nn(t,ge.current);vn(t,r),l=Ka(null,t,s,e,l,r);var a=Ja();return t.flags|=1,typeof l=="object"&&l!==null&&typeof l.render=="function"&&l.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,Ce(s)?(a=!0,ps(t)):a=!1,t.memoizedState=l.state!==null&&l.state!==void 0?l.state:null,Ha(t),l.updater=Is,t.stateNode=l,l._reactInternals=t,na(t,s,e,r),t=la(null,t,s,!0,a,r)):(t.tag=0,X&&a&&Oa(t),ye(null,t,l,r),t=t.child),t;case 16:s=t.elementType;e:{switch(Zr(e,t),e=t.pendingProps,l=s._init,s=l(s._payload),t.type=s,l=t.tag=Fm(s),e=Ge(s,e),l){case 0:t=sa(null,t,s,e,r);break e;case 1:t=mo(null,t,s,e,r);break e;case 11:t=uo(null,t,s,e,r);break e;case 14:t=po(null,t,s,Ge(s.type,e),r);break e}throw Error(E(306,s,""))}return t;case 0:return s=t.type,l=t.pendingProps,l=t.elementType===s?l:Ge(s,l),sa(e,t,s,l,r);case 1:return s=t.type,l=t.pendingProps,l=t.elementType===s?l:Ge(s,l),mo(e,t,s,l,r);case 3:e:{if(vd(t),e===null)throw Error(E(387));s=t.pendingProps,a=t.memoizedState,l=a.element,Wc(e,t),gs(t,s,null,r);var i=t.memoizedState;if(s=i.element,a.isDehydrated)if(a={element:s,isDehydrated:!1,cache:i.cache,pendingSuspenseBoundaries:i.pendingSuspenseBoundaries,transitions:i.transitions},t.updateQueue.baseState=a,t.memoizedState=a,t.flags&256){l=Sn(Error(E(423)),t),t=fo(e,t,s,r,l);break e}else if(s!==l){l=Sn(Error(E(424)),t),t=fo(e,t,s,r,l);break e}else for(ze=zt(t.stateNode.containerInfo.firstChild),Te=t,X=!0,Qe=null,r=Bc(t,null,s,r),t.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(wn(),s===l){t=ht(e,t,r);break e}ye(e,t,s,r)}t=t.child}return t;case 5:return Gc(t),e===null&&Xl(t),s=t.type,l=t.pendingProps,a=e!==null?e.memoizedProps:null,i=l.children,Ql(s,l)?i=null:a!==null&&Ql(s,a)&&(t.flags|=32),gd(e,t),ye(e,t,i,r),t.child;case 6:return e===null&&Xl(t),null;case 13:return yd(e,t,r);case 4:return Wa(t,t.stateNode.containerInfo),s=t.pendingProps,e===null?t.child=kn(t,null,s,r):ye(e,t,s,r),t.child;case 11:return s=t.type,l=t.pendingProps,l=t.elementType===s?l:Ge(s,l),uo(e,t,s,l,r);case 7:return ye(e,t,t.pendingProps,r),t.child;case 8:return ye(e,t,t.pendingProps.children,r),t.child;case 12:return ye(e,t,t.pendingProps.children,r),t.child;case 10:e:{if(s=t.type._context,l=t.pendingProps,a=t.memoizedProps,i=l.value,Q(hs,s._currentValue),s._currentValue=i,a!==null)if(Ye(a.value,i)){if(a.children===l.children&&!Se.current){t=ht(e,t,r);break e}}else for(a=t.child,a!==null&&(a.return=t);a!==null;){var c=a.dependencies;if(c!==null){i=a.child;for(var o=c.firstContext;o!==null;){if(o.context===s){if(a.tag===1){o=ut(-1,r&-r),o.tag=2;var p=a.updateQueue;if(p!==null){p=p.shared;var h=p.pending;h===null?o.next=o:(o.next=h.next,h.next=o),p.pending=o}}a.lanes|=r,o=a.alternate,o!==null&&(o.lanes|=r),ea(a.return,r,t),c.lanes|=r;break}o=o.next}}else if(a.tag===10)i=a.type===t.type?null:a.child;else if(a.tag===18){if(i=a.return,i===null)throw Error(E(341));i.lanes|=r,c=i.alternate,c!==null&&(c.lanes|=r),ea(i,r,t),i=a.sibling}else i=a.child;if(i!==null)i.return=a;else for(i=a;i!==null;){if(i===t){i=null;break}if(a=i.sibling,a!==null){a.return=i.return,i=a;break}i=i.return}a=i}ye(e,t,l.children,r),t=t.child}return t;case 9:return l=t.type,s=t.pendingProps.children,vn(t,r),l=Ue(l),s=s(l),t.flags|=1,ye(e,t,s,r),t.child;case 14:return s=t.type,l=Ge(s,t.pendingProps),l=Ge(s.type,l),po(e,t,s,l,r);case 15:return hd(e,t,t.type,t.pendingProps,r);case 17:return s=t.type,l=t.pendingProps,l=t.elementType===s?l:Ge(s,l),Zr(e,t),t.tag=1,Ce(s)?(e=!0,ps(t)):e=!1,vn(t,r),pd(t,s,l),na(t,s,l,r),la(null,t,s,!0,e,r);case 19:return jd(e,t,r);case 22:return xd(e,t,r)}throw Error(E(156,t.tag))};function Rd(e,t){return cc(e,t)}function Um(e,t,r,s){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=s,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Le(e,t,r,s){return new Um(e,t,r,s)}function ai(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Fm(e){if(typeof e=="function")return ai(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Sa)return 11;if(e===Ca)return 14}return 2}function Mt(e,t){var r=e.alternate;return r===null?(r=Le(e.tag,t,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=t,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,t=e.dependencies,r.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function ts(e,t,r,s,l,a){var i=2;if(s=e,typeof e=="function")ai(e)&&(i=1);else if(typeof e=="string")i=5;else e:switch(e){case nn:return Wt(r.children,l,a,t);case ba:i=8,l|=8;break;case Cl:return e=Le(12,r,t,l|2),e.elementType=Cl,e.lanes=a,e;case Pl:return e=Le(13,r,t,l),e.elementType=Pl,e.lanes=a,e;case El:return e=Le(19,r,t,l),e.elementType=El,e.lanes=a,e;case Go:return Os(r,l,a,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Ho:i=10;break e;case Wo:i=9;break e;case Sa:i=11;break e;case Ca:i=14;break e;case jt:i=16,s=null;break e}throw Error(E(130,e==null?e:typeof e,""))}return t=Le(i,r,t,l),t.elementType=e,t.type=s,t.lanes=a,t}function Wt(e,t,r,s){return e=Le(7,e,s,t),e.lanes=r,e}function Os(e,t,r,s){return e=Le(22,e,s,t),e.elementType=Go,e.lanes=r,e.stateNode={isHidden:!1},e}function Nl(e,t,r){return e=Le(6,e,null,t),e.lanes=r,e}function wl(e,t,r){return t=Le(4,e.children!==null?e.children:[],e.key,t),t.lanes=r,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function $m(e,t,r,s,l){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=nl(0),this.expirationTimes=nl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=nl(0),this.identifierPrefix=s,this.onRecoverableError=l,this.mutableSourceEagerHydrationData=null}function ii(e,t,r,s,l,a,i,c,o){return e=new $m(e,t,r,c,o),t===1?(t=1,a===!0&&(t|=8)):t=0,a=Le(3,null,null,t),e.current=a,a.stateNode=e,a.memoizedState={element:s,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},Ha(a),e}function Bm(e,t,r){var s=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:tn,key:s==null?null:""+s,children:e,containerInfo:t,implementation:r}}function Od(e){if(!e)return _t;e=e._reactInternals;e:{if(Zt(e)!==e||e.tag!==1)throw Error(E(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(Ce(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(E(171))}if(e.tag===1){var r=e.type;if(Ce(r))return Oc(e,r,t)}return t}function Ld(e,t,r,s,l,a,i,c,o){return e=ii(r,s,!0,e,l,a,i,c,o),e.context=Od(null),r=e.current,s=je(),l=At(r),a=ut(s,l),a.callback=t??null,Tt(r,a,l),e.current.lanes=l,yr(e,l,s),Pe(e,s),e}function Ls(e,t,r,s){var l=t.current,a=je(),i=At(l);return r=Od(r),t.context===null?t.context=r:t.pendingContext=r,t=ut(a,i),t.payload={element:e},s=s===void 0?null:s,s!==null&&(t.callback=s),e=Tt(l,t,i),e!==null&&(Je(e,l,i,a),Kr(e,l,i)),i}function Ss(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function bo(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<t?r:t}}function oi(e,t){bo(e,t),(e=e.alternate)&&bo(e,t)}function Hm(){return null}var Vd=typeof reportError=="function"?reportError:function(e){console.error(e)};function ci(e){this._internalRoot=e}Vs.prototype.render=ci.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(E(409));Ls(e,t,null,null)};Vs.prototype.unmount=ci.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Jt(function(){Ls(null,e,null,null)}),t[mt]=null}};function Vs(e){this._internalRoot=e}Vs.prototype.unstable_scheduleHydration=function(e){if(e){var t=xc();e={blockedOn:null,target:e,priority:t};for(var r=0;r<wt.length&&t!==0&&t<wt[r].priority;r++);wt.splice(r,0,e),r===0&&vc(e)}};function di(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Us(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function So(){}function Wm(e,t,r,s,l){if(l){if(typeof s=="function"){var a=s;s=function(){var p=Ss(i);a.call(p)}}var i=Ld(t,s,e,0,null,!1,!1,"",So);return e._reactRootContainer=i,e[mt]=i.current,cr(e.nodeType===8?e.parentNode:e),Jt(),i}for(;l=e.lastChild;)e.removeChild(l);if(typeof s=="function"){var c=s;s=function(){var p=Ss(o);c.call(p)}}var o=ii(e,0,!1,null,null,!1,!1,"",So);return e._reactRootContainer=o,e[mt]=o.current,cr(e.nodeType===8?e.parentNode:e),Jt(function(){Ls(t,o,r,s)}),o}function Fs(e,t,r,s,l){var a=r._reactRootContainer;if(a){var i=a;if(typeof l=="function"){var c=l;l=function(){var o=Ss(i);c.call(o)}}Ls(t,i,e,l)}else i=Wm(r,t,e,l,s);return Ss(i)}fc=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var r=Hn(t.pendingLanes);r!==0&&(za(t,r|1),Pe(t,se()),!(F&6)&&(Cn=se()+500,Lt()))}break;case 13:Jt(function(){var s=ft(e,1);if(s!==null){var l=je();Je(s,e,1,l)}}),oi(e,1)}};Ta=function(e){if(e.tag===13){var t=ft(e,134217728);if(t!==null){var r=je();Je(t,e,134217728,r)}oi(e,134217728)}};hc=function(e){if(e.tag===13){var t=At(e),r=ft(e,t);if(r!==null){var s=je();Je(r,e,t,s)}oi(e,t)}};xc=function(){return W};gc=function(e,t){var r=W;try{return W=e,t()}finally{W=r}};Ll=function(e,t,r){switch(t){case"input":if(Dl(e,r),t=r.name,r.type==="radio"&&t!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<r.length;t++){var s=r[t];if(s!==e&&s.form===e.form){var l=Ds(s);if(!l)throw Error(E(90));Qo(s),Dl(s,l)}}}break;case"textarea":Jo(e,r);break;case"select":t=r.value,t!=null&&fn(e,!!r.multiple,t,!1)}};rc=ri;sc=Jt;var Gm={usingClientEntryPoint:!1,Events:[Nr,an,Ds,tc,nc,ri]},Fn={findFiberByHostInstance:Ft,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},qm={bundleType:Fn.bundleType,version:Fn.version,rendererPackageName:Fn.rendererPackageName,rendererConfig:Fn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:xt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=ic(e),e===null?null:e.stateNode},findFiberByHostInstance:Fn.findFiberByHostInstance||Hm,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Br=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Br.isDisabled&&Br.supportsFiber)try{Ps=Br.inject(qm),tt=Br}catch{}}Ae.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Gm;Ae.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!di(t))throw Error(E(200));return Bm(e,t,null,r)};Ae.createRoot=function(e,t){if(!di(e))throw Error(E(299));var r=!1,s="",l=Vd;return t!=null&&(t.unstable_strictMode===!0&&(r=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),t=ii(e,1,!1,null,null,r,!1,s,l),e[mt]=t.current,cr(e.nodeType===8?e.parentNode:e),new ci(t)};Ae.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(E(188)):(e=Object.keys(e).join(","),Error(E(268,e)));return e=ic(t),e=e===null?null:e.stateNode,e};Ae.flushSync=function(e){return Jt(e)};Ae.hydrate=function(e,t,r){if(!Us(t))throw Error(E(200));return Fs(null,e,t,!0,r)};Ae.hydrateRoot=function(e,t,r){if(!di(e))throw Error(E(405));var s=r!=null&&r.hydratedSources||null,l=!1,a="",i=Vd;if(r!=null&&(r.unstable_strictMode===!0&&(l=!0),r.identifierPrefix!==void 0&&(a=r.identifierPrefix),r.onRecoverableError!==void 0&&(i=r.onRecoverableError)),t=Ld(t,null,e,1,r??null,l,!1,a,i),e[mt]=t.current,cr(e),s)for(e=0;e<s.length;e++)r=s[e],l=r._getVersion,l=l(r._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[r,l]:t.mutableSourceEagerHydrationData.push(r,l);return new Vs(t)};Ae.render=function(e,t,r){if(!Us(t))throw Error(E(200));return Fs(null,e,t,!1,r)};Ae.unmountComponentAtNode=function(e){if(!Us(e))throw Error(E(40));return e._reactRootContainer?(Jt(function(){Fs(null,null,e,!1,function(){e._reactRootContainer=null,e[mt]=null})}),!0):!1};Ae.unstable_batchedUpdates=ri;Ae.unstable_renderSubtreeIntoContainer=function(e,t,r,s){if(!Us(r))throw Error(E(200));if(e==null||e._reactInternals===void 0)throw Error(E(38));return Fs(e,t,r,!1,s)};Ae.version="18.3.1-next-f1338f8080-20240426";function Ud(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ud)}catch(e){console.error(e)}}Ud(),Uo.exports=Ae;var Qm=Uo.exports,Co=Qm;bl.createRoot=Co.createRoot,bl.hydrateRoot=Co.hydrateRoot;const Km="/api/v1";class Jm{constructor(){this.token=localStorage.getItem("petution_jwt_token")||null,this.sourceHeader="frontend"}setToken(t){this.token=t,t?localStorage.setItem("petution_jwt_token",t):localStorage.removeItem("petution_jwt_token")}getHeaders(){const t={"Content-Type":"application/json","x-petution-source":this.sourceHeader};return this.token&&(t.Authorization=`Bearer ${this.token}`),t}async request(t,r={}){const s=`${Km}${t}`,l={...r,headers:{...this.getHeaders(),...r.headers}};try{const a=await fetch(s,l);if(a.status===401&&this.setToken(null),!a.ok){const i=await a.json().catch(()=>({message:a.statusText}));throw new Error(i.message||`HTTP ${a.status}`)}return await a.json()}catch(a){throw console.warn(`[ApiClient] Network request failed (${t}), using local fallback queue:`,a.message),a}}async getClients(){return this.request("/clients")}async createClient(t){return this.request("/clients",{method:"POST",body:JSON.stringify(t)})}async getPets(){return this.request("/pets")}async createPet(t){return this.request("/pets",{method:"POST",body:JSON.stringify(t)})}async getVisits(){return this.request("/visits")}async createVisit(t){return this.request("/visits",{method:"POST",body:JSON.stringify(t)})}async getProducts(){return this.request("/products")}async createProduct(t){return this.request("/products",{method:"POST",body:JSON.stringify(t)})}async updateProduct(t,r){return this.request(`/products/${t}`,{method:"PUT",body:JSON.stringify(r)})}async deleteProduct(t){return this.request(`/products/${t}`,{method:"DELETE"})}async getInvoices(){return this.request("/invoices")}async createInvoice(t){return this.request("/invoices",{method:"POST",body:JSON.stringify(t)})}async getExpenses(){return this.request("/expenses")}async createExpense(t){return this.request("/expenses",{method:"POST",body:JSON.stringify(t)})}async deleteExpense(t){return this.request(`/expenses/${t}`,{method:"DELETE"})}async getVaccines(){return this.request("/vaccines")}async createVaccine(t){return this.request("/vaccines",{method:"POST",body:JSON.stringify(t)})}async deleteVaccine(t){return this.request(`/vaccines/${t}`,{method:"DELETE"})}async getSoapNotes(){return this.request("/soap-notes")}async saveSoapNote(t){return this.request("/soap-notes",{method:"POST",body:JSON.stringify(t)})}async migrateLocalStorage(t){return this.request("/sync/migrate-localstorage",{method:"POST",body:JSON.stringify(t)})}async getShopifyPetMetaobject(t){return this.request(`/pets/${t}/shopify-metaobject`)}}const Ym=new Jm,Fd=j.createContext(),Zm=[{id:"cli-1",name:"Ahmed Hassan",source:"Facebook Ad",governorate:"Cairo",district:"Maadi",street:"Road 9, Bldg 14",phones:[{phone:"+201001234567",label:"Primary",isPrimary:!0,hasWhatsapp:!0}],tags:["VIP","Regular"],pets:["pet-1"],createdAt:"2026-07-20"},{id:"cli-2",name:"Sarah Mahmoud",source:"Recommendation",governorate:"Giza",district:"Zayed",street:"Compound 4",phones:[{phone:"+201119876543",label:"Primary",isPrimary:!0,hasWhatsapp:!0}],tags:["New Client"],pets:["pet-2"],createdAt:"2026-07-22"}],Xm=[{id:"pet-1",name:"Milo",ageValue:2,ageUnit:"years",species:"cat",gender:"male",vaccinated:!0,deworming:!0,antiflea:!0,castrated:!0,neuterDate:"2025-03-15",breed:"Persian",temperament:"Calm",color:"White",bloodGroup:"A",cardNo:"CRD-9982",protocolNo:"PRT-102",microchipNumber:"985141002938471",microchipDate:"2025-01-10",microchipLocation:"Left Scapular",isAggressive:!1,isDeceased:!1,deathDate:"",privateNotes:"Sensitive skin. Prefers soft handling.",tags:["VIP","Indoor Only"],nutrition:["Dry food","Soft food"],owners:["cli-1"],createdAt:"2026-07-20"},{id:"pet-2",name:"Rocky",ageValue:4,ageUnit:"years",species:"dog",gender:"male",vaccinated:!0,deworming:!0,antiflea:!1,castrated:!1,neuterDate:"",breed:"Golden Retriever",temperament:"Playful",color:"Golden",bloodGroup:"DEA 1.1+",cardNo:"CRD-4410",protocolNo:"PRT-108",microchipNumber:"985141007728192",microchipDate:"2024-06-20",microchipLocation:"Neck",isAggressive:!0,isDeceased:!1,deathDate:"",privateNotes:"Caution: Barking at strange dogs.",tags:["High Energy","Guard Dog"],nutrition:["Dry food"],owners:["cli-2"],createdAt:"2026-07-22"}],ef=[{id:"exp-1",title:"Medical Supplies Wholesaler",vendor:"El-Gomhouria Med",category:"Supplies",amount:4500,date:"2026-07-21",paymentMethod:"Bank Transfer",notes:"Monthly vaccine & syringe order"},{id:"exp-2",title:"Clinic Electricity & Utilities",vendor:"South Cairo Elec",category:"Utilities",amount:1200,date:"2026-07-23",paymentMethod:"Cash",notes:"July utility bill"}],tf=[{id:"vac-1",petId:"pet-1",vaccineName:"Tricat Trio (FVRCP)",manufacturer:"Zoetis",batchNumber:"ZT-99210",administeredDate:"2026-06-15",dueDate:"2027-06-15",vetName:"Dr. Khaled ElGendy",notes:"Booster given. No adverse reaction."},{id:"vac-2",petId:"pet-1",vaccineName:"Rabies Vaccine (Rabisin)",manufacturer:"Boehringer Ingelheim",batchNumber:"RB-44102",administeredDate:"2026-06-15",dueDate:"2027-06-15",vetName:"Dr. Khaled ElGendy",notes:"Annual Rabies shot."},{id:"vac-3",petId:"pet-2",vaccineName:"Vanguard 7 (DHPP + L4)",manufacturer:"Zoetis",batchNumber:"VG-77219",administeredDate:"2026-05-10",dueDate:"2027-05-10",vetName:"Dr. Sarah Mahmoud",notes:"5-in-1 combo vaccine."}],nf=[{id:"soap-1",visitId:"vis-1",petId:"pet-1",vetName:"Dr. Khaled ElGendy",date:"2026-07-24",subjective:"Owner reports mild sneezing for 2 days after indoor stay.",tempC:38.5,weightKg:4.2,heartRateBpm:120,respiratoryRateBpm:24,assessment:"Mild upper respiratory tract inflammation. Hydration good.",plan:"Prescribed oral antibiotic drops and rest. Recheck in 5 days if not improving.",rxMedications:[{name:"Amoxicillin Drops 100mg/ml",dosage:"0.5 ml",frequency:"Twice daily (BID)",duration:"7 days"},{name:"Vet Eye & Nasal Clear Drops",dosage:"2 drops",frequency:"Three times daily",duration:"5 days"}]}],rf=[{id:"vis-1",petId:"pet-1",clientId:"cli-1",doctorName:"Dr. Khaled ElGendy",visitType:"Check-up",date:"2026-07-24",time:"08:00 PM",state:"scheduled",reason:"Annual Checkup"}],sf=[{id:"prod-1",name:"Feline Rabies Vaccine",type:"product",unitType:"Piece",pricingUnit:"Piece",quantity:45,pricePerUnit:350,costPerUnit:200,revenuePerUnit:150,alertThreshold:10,notes:"Keep refrigerated"},{id:"serv-1",name:"General Examination & Consultation",type:"service",unitType:"Session",pricingUnit:"Session",quantity:999,pricePerUnit:500,costPerUnit:100,revenuePerUnit:400,alertThreshold:0,notes:"Standard vet examination"}],lf=[{id:"inv-1",petId:"pet-1",visitId:"vis-1",status:"paid",discountType:"none",discountValue:0,taxPercentage:14,subtotal:500,totalAmount:570,createdAt:"2026-07-24"}],af=[{id:"usr-1",name:"Khaled ElGendy",email:"khaledahmed94.ka@gmail.com",role:"Owner",status:"active"}],of={id:"usr-1",name:"Khaled ElGendy",email:"khaledahmed94.ka@gmail.com",role:"Owner",provider:"email",isAuthenticated:!0},cf={orgName:"Petution",slug:"petution",phone:"+201114022371",address:"12 Main St, Cairo, Egypt",website:"https://app.petution.com"},df=({children:e})=>{const[t,r]=j.useState(()=>{const k=localStorage.getItem("petution_user");return k?JSON.parse(k):of}),[s,l]=j.useState(()=>{const k=localStorage.getItem("petution_workspaces");return k?JSON.parse(k):[{id:"ws-1",name:"Petution",slug:"petution",plan:"Second Plan (Trial)"}]}),[a,i]=j.useState(()=>localStorage.getItem("petution_active_ws")||"ws-1"),[c,o]=j.useState(()=>{const k=localStorage.getItem("petution_clients");return k?JSON.parse(k):Zm}),[p,h]=j.useState(()=>{const k=localStorage.getItem("petution_pets");return k?JSON.parse(k):Xm}),[x,m]=j.useState(()=>{const k=localStorage.getItem("petution_visits");return k?JSON.parse(k):rf}),[u,v]=j.useState(()=>{const k=localStorage.getItem("petution_products");return k?JSON.parse(k):sf}),[N,S]=j.useState(()=>{const k=localStorage.getItem("petution_invoices");return k?JSON.parse(k):lf}),[f,d]=j.useState(()=>{const k=localStorage.getItem("petution_expenses");return k?JSON.parse(k):ef}),[g,b]=j.useState(()=>{const k=localStorage.getItem("petution_vaccines");return k?JSON.parse(k):tf}),[P,z]=j.useState(()=>{const k=localStorage.getItem("petution_soap_notes");return k?JSON.parse(k):nf}),[w,C]=j.useState(()=>{const k=localStorage.getItem("petution_team");return k?JSON.parse(k):af}),[V,R]=j.useState(()=>{const k=localStorage.getItem("petution_settings");if(k){const D=JSON.parse(k);return D.orgName==="Petfast"&&(D.orgName="Petution"),D}return cf}),[Y,$]=j.useState(()=>{const k=localStorage.getItem("petution_notifications");return k?JSON.parse(k):[{id:"n-1",title:"Welcome to Petution!",time:"10m ago",read:!1},{id:"n-2",title:"System trial period active (14 days left)",time:"1h ago",read:!1}]}),[ve,$e]=j.useState("dashboard"),[gt,st]=j.useState(null),[O,T]=j.useState(null),[M,L]=j.useState(!1),[H,Z]=j.useState(!1);j.useEffect(()=>{localStorage.setItem("petution_user",JSON.stringify(t))},[t]),j.useEffect(()=>{localStorage.setItem("petution_workspaces",JSON.stringify(s))},[s]),j.useEffect(()=>{localStorage.setItem("petution_active_ws",a)},[a]),j.useEffect(()=>{localStorage.setItem("petution_settings",JSON.stringify(V))},[V]),j.useEffect(()=>{localStorage.setItem("petution_clients",JSON.stringify(c))},[c]),j.useEffect(()=>{localStorage.setItem("petution_pets",JSON.stringify(p))},[p]),j.useEffect(()=>{localStorage.setItem("petution_visits",JSON.stringify(x))},[x]),j.useEffect(()=>{localStorage.setItem("petution_products",JSON.stringify(u))},[u]),j.useEffect(()=>{localStorage.setItem("petution_invoices",JSON.stringify(N))},[N]),j.useEffect(()=>{localStorage.setItem("petution_expenses",JSON.stringify(f))},[f]),j.useEffect(()=>{localStorage.setItem("petution_vaccines",JSON.stringify(g))},[g]),j.useEffect(()=>{localStorage.setItem("petution_soap_notes",JSON.stringify(P))},[P]),j.useEffect(()=>{localStorage.setItem("petution_notifications",JSON.stringify(Y))},[Y]);const Be=k=>{R(k),l(D=>D.map(y=>y.id===a?{...y,name:k.orgName,slug:k.slug}:y))},Ie=k=>{const D={id:`ws-${Date.now()}`,name:k.clinicName,slug:k.clinicName.toLowerCase().replace(/\s+/g,"-"),plan:k.plan||"Trial Plan"};l(y=>[...y,D]),i(D.id),Be({...V,orgName:k.clinicName,slug:D.slug,phone:k.phone||V.phone,address:`${k.district||""}, ${k.governorate||""}`}),$(y=>[{id:`n-${Date.now()}`,title:`Registered workspace: ${k.clinicName}`,time:"Just now",read:!1},...y])},lt=k=>{const D=s.find(y=>y.id===k);D&&(i(D.id),R(y=>({...y,orgName:D.name,slug:D.slug})))},He=k=>{if(s.length<=1){alert("Cannot delete the only remaining workspace. You must have at least one active clinic.");return}const D=s.find(G=>G.id===k),y=D?D.name:"workspace",q=s.filter(G=>G.id!==k);if(l(q),a===k){const G=q[0];i(G.id),R(_e=>({..._e,orgName:G.name,slug:G.slug}))}alert(`Clinic workspace "${y}" has been deleted.`)},vt=k=>{const D={...k,id:`cli-${Date.now()}`,createdAt:new Date().toISOString().split("T")[0]};o(y=>[D,...y])},hi=k=>{const D={...k,id:`pet-${Date.now()}`,createdAt:new Date().toISOString().split("T")[0]};h(y=>[D,...y])},Tn=k=>{const D={...k,id:`vis-${Date.now()}`};m(y=>[D,...y])},[Dn,An]=j.useState(()=>{const k=localStorage.getItem("petution_stocklogs");return k?JSON.parse(k):[{id:"log-1",itemName:"Feline Rabies Vaccine",change:"+45 units",user:"Khaled ElGendy",date:"2026-07-24"}]});j.useEffect(()=>{localStorage.setItem("petution_stocklogs",JSON.stringify(Dn))},[Dn]);const Gs=k=>{const D={...k,id:`prod-${Date.now()}`,revenuePerUnit:(k.pricePerUnit||0)-(k.costPerUnit||0)};v(y=>[D,...y]),An(y=>[{id:`log-${Date.now()}`,itemName:k.name,change:`+${k.quantity||1} units (Created)`,user:"Khaled ElGendy",date:new Date().toISOString().split("T")[0]},...y])},Mn=(k,D)=>{v(y=>y.map(q=>{if(q.id!==k)return q;const G={...q,...D},_e=G.pricePerUnit!==void 0?Number(G.pricePerUnit):0,Js=G.costPerUnit!==void 0?Number(G.costPerUnit):0;return{...G,revenuePerUnit:_e-Js}})),An(y=>[{id:`log-${Date.now()}`,itemName:D.name||"Product",change:`Updated (${D.quantity!==void 0?D.quantity:"stock"})`,user:"Khaled ElGendy",date:new Date().toISOString().split("T")[0]},...y])},qs=k=>{v(D=>D.filter(y=>y.id!==k))},Qs=k=>{const D={...k,id:`inv-${Date.now()}`,createdAt:new Date().toISOString().split("T")[0]};S(y=>[D,...y])},Cr=k=>{const D={...k,id:`exp-${Date.now()}`,date:k.date||new Date().toISOString().split("T")[0]};d(y=>[D,...y])},I=k=>{d(D=>D.filter(y=>y.id!==k))},su=k=>{const D={...k,id:`vac-${Date.now()}`};b(y=>[D,...y])},lu=k=>{b(D=>D.filter(y=>y.id!==k))},au=k=>{z(D=>{const y=D.findIndex(G=>G.visitId===k.visitId||G.id===k.id);return y>=0?D.map((G,_e)=>_e===y?{...G,...k}:G):[{...k,id:`soap-${Date.now()}`},...D]})},iu=async()=>{try{const k={clients:JSON.parse(localStorage.getItem("petution_clients")||"[]"),pets:JSON.parse(localStorage.getItem("petution_pets")||"[]"),visits:JSON.parse(localStorage.getItem("petution_visits")||"[]"),products:JSON.parse(localStorage.getItem("petution_products")||"[]"),invoices:JSON.parse(localStorage.getItem("petution_invoices")||"[]"),expenses:JSON.parse(localStorage.getItem("petution_expenses")||"[]"),vaccines:JSON.parse(localStorage.getItem("petution_vaccines")||"[]"),soapNotes:JSON.parse(localStorage.getItem("petution_soap_notes")||"[]")},D=await Ym.migrateLocalStorage({legacyData:k});console.log("[AppContext Sync] Local data migrated to backend database:",D)}catch(k){console.warn("[AppContext Sync] Auto-migration offline fallback:",k.message)}},ou=k=>{if(!k||typeof k!="object"){alert("Invalid backup file format.");return}k.clients&&o(k.clients),k.pets&&h(k.pets),k.visits&&m(k.visits),k.products&&v(k.products),k.invoices&&S(k.invoices),k.expenses&&d(k.expenses),k.vaccines&&b(k.vaccines),k.soapNotes&&z(k.soapNotes),k.settings&&Be(k.settings),alert("System backup restored successfully!")},cu=k=>{if(!Array.isArray(k)||k.length===0){alert("No valid client data found in file.");return}const D=k.map((y,q)=>{let G;try{G=y.phones?typeof y.phones=="string"?JSON.parse(y.phones):y.phones:[{phone:y.phone||y.PrimaryPhone||"",label:"Primary",isPrimary:!0}]}catch{G=[{phone:y.phone||y.PrimaryPhone||"",label:"Primary",isPrimary:!0}]}let _e;try{_e=y.tags?typeof y.tags=="string"?JSON.parse(y.tags):y.tags:["Imported"]}catch{_e=["Imported"]}return{id:y.id||`cli-imp-${Date.now()}-${q}`,name:y.name||y.ClientName||y.PetOwnerName||"Imported Client",source:y.source||y.Source||"Imported",governorate:y.governorate||y.Governorate||"Cairo",district:y.district||y.District||"",street:y.street||y.Street||"",phones:G,tags:_e,pets:[],createdAt:y.createdAt||y.CreatedDate||new Date().toISOString().split("T")[0]}});o(y=>[...D,...y]),alert(`Successfully imported ${D.length} clients!`)},du=k=>{if(!Array.isArray(k)||k.length===0){alert("No valid pet data found in file.");return}const D=k.map((y,q)=>({id:y.id||`pet-imp-${Date.now()}-${q}`,name:y.name||y.PetName||"Imported Pet",ageValue:y.ageValue!==void 0&&y.ageValue!==""?Number(y.ageValue):y.Age!==void 0&&y.Age!==""?Number(y.Age):1,ageUnit:y.ageUnit||y.AgeUnit||"years",species:(y.species||y.Species||y.Type||"cat").toLowerCase(),gender:y.gender||y.Gender||"male",vaccinated:String(y.vaccinated??y.Vaccinated??"false").toLowerCase()==="true"||String(y.vaccinated??y.Vaccinated??"")==="Yes",deworming:String(y.deworming??y.Deworming??"false").toLowerCase()==="true"||String(y.deworming??y.Deworming??"")==="Yes",antiflea:String(y.antiflea??y.Antiflea??"false").toLowerCase()==="true"||String(y.antiflea??y.Antiflea??"")==="Yes",castrated:String(y.castrated??y.Castrated??"false").toLowerCase()==="true"||String(y.castrated??y.Castrated??"")==="Yes",neuterDate:y.neuterDate||y.NeuterDate||"",breed:y.breed||y.Breed||"",temperament:y.temperament||y.Temperament||"Calm",color:y.color||y.Color||"",bloodGroup:y.bloodGroup||y.BloodGroup||"Unspecified",cardNo:y.cardNo||y.CardNo||"",protocolNo:y.protocolNo||y.ProtocolNo||"",microchipNumber:y.microchipNumber||y.MicrochipNumber||"",microchipDate:y.microchipDate||y.MicrochipDate||"",microchipLocation:y.microchipLocation||y.MicrochipLocation||"",isAggressive:String(y.isAggressive??y.IsAggressive??"false").toLowerCase()==="true",isDeceased:String(y.isDeceased??y.IsDeceased??"false").toLowerCase()==="true",deathDate:y.deathDate||y.DeathDate||"",privateNotes:y.privateNotes||y.PrivateNotes||"",tags:Array.isArray(y.tags)?y.tags:y.Tags?String(y.Tags).split(","):["Imported"],nutrition:["Dry food"],owners:[],createdAt:y.createdAt||y.CreatedDate||new Date().toISOString().split("T")[0]}));h(y=>[...D,...y]),alert(`Successfully imported ${D.length} pets!`)},uu=k=>{if(!Array.isArray(k)||k.length===0){alert("No valid product data found in file.");return}const D=k.map((y,q)=>{const G=y.pricePerUnit!==void 0&&y.pricePerUnit!==""?Number(y.pricePerUnit):y.PricePerUnit!==void 0&&y.PricePerUnit!==""?Number(y.PricePerUnit):100,_e=y.costPerUnit!==void 0&&y.costPerUnit!==""?Number(y.costPerUnit):y.CostPerUnit!==void 0&&y.CostPerUnit!==""?Number(y.CostPerUnit):50,Js=y.quantity!==void 0&&y.quantity!==""?Number(y.quantity):y.Quantity!==void 0&&y.Quantity!==""?Number(y.Quantity):10,Nu=y.alertThreshold!==void 0&&y.alertThreshold!==""?Number(y.alertThreshold):y.AlertThreshold!==void 0&&y.AlertThreshold!==""?Number(y.AlertThreshold):5;return{id:y.id||`prod-imp-${Date.now()}-${q}`,name:y.name||y.ItemName||"Imported Product",type:y.type||y.Type||"product",unitType:y.unitType||y.UnitType||"Piece",pricingUnit:y.pricingUnit||y.PricingUnit||"Piece",pricePerUnit:G,costPerUnit:_e,revenuePerUnit:G-_e,quantity:Js,alertThreshold:Nu,notes:y.notes||y.Notes||""}});v(y=>[...D,...y]),alert(`Successfully imported ${D.length} products/services!`)},pu=k=>{if(!Array.isArray(k)||k.length===0){alert("No valid invoice data found in file.");return}const D=k.map((y,q)=>({id:y.id||`inv-imp-${Date.now()}-${q}`,petId:y.petId||"",visitId:y.visitId||"",status:y.status||y.Status||"pending",discountType:y.discountType||"none",discountValue:Number(y.discountValue)||0,taxPercentage:Number(y.taxPercentage||y.TaxPercentage)||14,subtotal:Number(y.subtotal||y.Subtotal)||0,totalAmount:Number(y.totalAmount||y.TotalAmount||y.Amount)||0,createdAt:y.createdAt||y.CreatedDate||new Date().toISOString().split("T")[0]}));S(y=>[...D,...y]),alert(`Successfully imported ${D.length} invoices!`)},[Ks,xi]=j.useState(()=>{const k=localStorage.getItem("petution_invitations");return k?JSON.parse(k):[{id:"inv-1",name:"Dr. Sarah Mahmoud",email:"sarah.m@petution.com",role:"Vet",sentAt:"2026-07-23",status:"Pending"}]});j.useEffect(()=>{localStorage.setItem("petution_team",JSON.stringify(w))},[w]),j.useEffect(()=>{localStorage.setItem("petution_invitations",JSON.stringify(Ks))},[Ks]);const mu=k=>{const D={id:`inv-${Date.now()}`,name:k.name,email:k.email,role:k.role||"Vet",sentAt:new Date().toISOString().split("T")[0],status:"Pending"};xi(q=>[D,...q]);const y={id:`usr-${Date.now()}`,name:k.name,email:k.email,role:k.role||"Vet",status:"invited"};C(q=>[y,...q])},fu=(k,D)=>{C(y=>y.map(q=>q.id===k?{...q,role:D}:q))},hu=k=>{C(D=>D.filter(y=>y.id!==k))},xu=k=>{xi(D=>D.filter(y=>y.id!==k))},gu=(k,D)=>{const y={id:`usr-${Date.now()}`,name:k.split("@")[0].replace(/[\._]/g," "),email:k,role:"Owner",provider:"email",isAuthenticated:!0};r(y)},vu=(k,D,y)=>{const q={id:`usr-${Date.now()}`,name:y||(k==="google"?"Dr. Khaled ElGendy":"Khaled ElGendy"),email:D||(k==="google"?"khaledahmed94.ka@gmail.com":"khaled.elgendy@icloud.com"),role:"Owner",provider:k,isAuthenticated:!0};r(q)},yu=(k,D,y,q)=>{const G={id:`usr-${Date.now()}`,name:k,email:D,role:"Owner",provider:"email",isAuthenticated:!0};r(G),Ie({clinicName:q,phone:""})},ju=()=>{r(k=>({...k,isAuthenticated:!1}))};return n.jsx(Fd.Provider,{value:{user:t,loginWithEmail:gu,loginWithProvider:vu,signup:yu,logout:ju,workspaces:s,activeWorkspaceId:a,registerClinic:Ie,switchWorkspace:lt,deleteWorkspace:He,clients:c,addClient:vt,importClientsData:cu,pets:p,addPet:hi,importPetsData:du,visits:x,setVisits:m,addVisit:Tn,products:u,addProduct:Gs,updateProduct:Mn,deleteProduct:qs,importProductsData:uu,stockLogs:Dn,invoices:N,addInvoice:Qs,importFullBackup:ou,importInvoicesData:pu,expenses:f,addExpense:Cr,deleteExpense:I,vaccines:g,addVaccine:su,deleteVaccine:lu,soapNotes:P,saveSOAPNote:au,migrateLocalStorageToCloud:iu,team:w,setTeam:C,invitations:Ks,inviteMember:mu,updateMemberRole:fu,removeMember:hu,cancelInvitation:xu,settings:V,setSettings:Be,notifications:Y,setNotifications:$,activeTab:ve,setActiveTab:$e,activeDrawer:gt,setActiveDrawer:st,activeModalItem:O,setActiveModalItem:T,showWorkspaceMenu:M,setShowWorkspaceMenu:L,showNotifications:H,setShowNotifications:Z},children:e})},B=()=>j.useContext(Fd);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var uf={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pf=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),_=(e,t)=>{const r=j.forwardRef(({color:s="currentColor",size:l=24,strokeWidth:a=2,absoluteStrokeWidth:i,className:c="",children:o,...p},h)=>j.createElement("svg",{ref:h,...uf,width:l,height:l,stroke:s,strokeWidth:i?Number(a)*24/Number(l):a,className:["lucide",`lucide-${pf(e)}`,c].join(" "),...p},[...t.map(([x,m])=>j.createElement(x,m)),...Array.isArray(o)?o:[o]]));return r.displayName=`${e}`,r};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $d=_("AlertTriangle",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z",key:"c3ski4"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ot=_("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mf=_("BarChart3",[["path",{d:"M3 3v18h18",key:"1s2lah"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ff=_("Bell",[["path",{d:"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9",key:"1qo2s2"}],["path",{d:"M10.3 21a1.94 1.94 0 0 0 3.4 0",key:"qgo35s"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hf=_("Building2",[["path",{d:"M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z",key:"1b4qmf"}],["path",{d:"M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2",key:"i71pzd"}],["path",{d:"M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2",key:"10jefs"}],["path",{d:"M10 6h4",key:"1itunk"}],["path",{d:"M10 10h4",key:"tcdvrf"}],["path",{d:"M10 14h4",key:"kelpxr"}],["path",{d:"M10 18h4",key:"1ulq68"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xf=_("Building",[["rect",{width:"16",height:"20",x:"4",y:"2",rx:"2",ry:"2",key:"76otgf"}],["path",{d:"M9 22v-4h6v4",key:"r93iot"}],["path",{d:"M8 6h.01",key:"1dz90k"}],["path",{d:"M16 6h.01",key:"1x0f13"}],["path",{d:"M12 6h.01",key:"1vi96p"}],["path",{d:"M12 10h.01",key:"1nrarc"}],["path",{d:"M12 14h.01",key:"1etili"}],["path",{d:"M16 10h.01",key:"1m94wz"}],["path",{d:"M16 14h.01",key:"1gbofw"}],["path",{d:"M8 10h.01",key:"19clt8"}],["path",{d:"M8 14h.01",key:"6423bh"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $s=_("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gf=_("Camera",[["path",{d:"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z",key:"1tc9qg"}],["circle",{cx:"12",cy:"13",r:"3",key:"1vg3eu"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vf=_("CheckCheck",[["path",{d:"M18 6 7 17l-5-5",key:"116fxf"}],["path",{d:"m22 10-7.5 7.5L13 16",key:"ke71qq"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bd=_("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hd=_("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yf=_("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wd=_("Cpu",[["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"9",y:"9",width:"6",height:"6",key:"o3kz5p"}],["path",{d:"M15 2v2",key:"13l42r"}],["path",{d:"M15 20v2",key:"15mkzm"}],["path",{d:"M2 15h2",key:"1gxd5l"}],["path",{d:"M2 9h2",key:"1bbxkp"}],["path",{d:"M20 15h2",key:"19e6y8"}],["path",{d:"M20 9h2",key:"19tzq7"}],["path",{d:"M9 2v2",key:"165o2o"}],["path",{d:"M9 20v2",key:"i2bqo8"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jf=_("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ui=_("Dog",[["path",{d:"M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5",key:"19br0u"}],["path",{d:"M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5",key:"11n1an"}],["path",{d:"M8 14v.5",key:"1nzgdb"}],["path",{d:"M16 14v.5",key:"1lajdz"}],["path",{d:"M11.25 16.25h1.5L12 17l-.75-.75Z",key:"12kq1m"}],["path",{d:"M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306",key:"wsu29d"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gd=_("DollarSign",[["line",{x1:"12",x2:"12",y1:"2",y2:"22",key:"7eqyqh"}],["path",{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",key:"1b0p4s"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kr=_("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pi=_("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nf=_("Filter",[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wf=_("GripVertical",[["circle",{cx:"9",cy:"12",r:"1",key:"1vctgf"}],["circle",{cx:"9",cy:"5",r:"1",key:"hp0tcf"}],["circle",{cx:"9",cy:"19",r:"1",key:"fkjjf6"}],["circle",{cx:"15",cy:"12",r:"1",key:"1tmaij"}],["circle",{cx:"15",cy:"5",r:"1",key:"19l28e"}],["circle",{cx:"15",cy:"19",r:"1",key:"f4zoj3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qd=_("HeartOff",[["line",{x1:"2",y1:"2",x2:"22",y2:"22",key:"1w4vcy"}],["path",{d:"M16.5 16.5 12 21l-7-7c-1.5-1.45-3-3.2-3-5.5a5.5 5.5 0 0 1 2.14-4.35",key:"3mpagl"}],["path",{d:"M8.76 3.1c1.15.22 2.13.78 3.24 1.9 1.5-1.5 2.74-2 4.5-2A5.5 5.5 0 0 1 22 8.5c0 2.12-1.3 3.78-2.67 5.17",key:"1gh3v3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kf=_("Heart",[["path",{d:"M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z",key:"c3ymky"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bf=_("HelpCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qd=_("LayoutDashboard",[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kd=_("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sf=_("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Jd=_("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cf=_("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yd=_("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mi=_("MessageCircle",[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pf=_("MessageSquare",[["path",{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",key:"1lielz"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ef=_("Package",[["path",{d:"m7.5 4.27 9 5.15",key:"1c824w"}],["path",{d:"M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z",key:"hh9hay"}],["path",{d:"m3.3 7 8.7 5 8.7-5",key:"g66t2b"}],["path",{d:"M12 22V12",key:"d0xqtd"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zf=_("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zd=_("PlusCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 12h8",key:"1wcyev"}],["path",{d:"M12 8v8",key:"napkw2"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rt=_("Plus",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fi=_("Printer",[["polyline",{points:"6 9 6 2 18 2 18 9",key:"1306q4"}],["path",{d:"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2",key:"143wyd"}],["rect",{width:"12",height:"8",x:"6",y:"14",key:"5ipwut"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tf=_("Receipt",[["path",{d:"M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1Z",key:"q3az6g"}],["path",{d:"M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8",key:"1h4pet"}],["path",{d:"M12 17.5v-11",key:"1jc1ny"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const br=_("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Df=_("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xd=_("ShieldAlert",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Bs=_("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eu=_("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Af=_("Stethoscope",[["path",{d:"M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3",key:"1jd90r"}],["path",{d:"M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4",key:"126ukv"}],["circle",{cx:"20",cy:"10",r:"2",key:"ts1r5v"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hs=_("Syringe",[["path",{d:"m18 2 4 4",key:"22kx64"}],["path",{d:"m17 7 3-3",key:"1w1zoj"}],["path",{d:"M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5",key:"1exhtz"}],["path",{d:"m9 11 4 4",key:"rovt3i"}],["path",{d:"m5 19-3 3",key:"59f2uf"}],["path",{d:"m14 4 6 6",key:"yqp9t2"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mf=_("Tag",[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xt=_("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sr=_("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const If=_("UserCheck",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["polyline",{points:"16 11 18 13 22 9",key:"1pwet4"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tu=_("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nu=_("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ru=_("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=_("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),_f=({activeTab:e,setActiveTab:t,onRegisterClick:r,isMobileOpen:s,onCloseMobile:l})=>{const{user:a,settings:i,workspaces:c,activeWorkspaceId:o,switchWorkspace:p,deleteWorkspace:h,showWorkspaceMenu:x,setShowWorkspaceMenu:m,setActiveDrawer:u}=B(),v=f=>{t(f),l&&l()},N=[{id:"dashboard",label:"Dashboard",icon:Qd},{id:"clients",label:"Clients",icon:ru},{id:"pets",label:"Pets",icon:ui},{id:"visits",label:"Visits",icon:$s},{id:"invoices",label:"Invoices",icon:Tf},{id:"expenses",label:"Expenses",icon:Gd},{id:"products",label:"Products & Services",icon:Ef},{id:"analytics",label:"Analytics",icon:mf},{id:"chats",label:"Chats",icon:Pf}],S=[{id:"team",label:"Team",icon:If},{id:"settings",label:"Settings",icon:Df},{id:"help",label:"Get Help",icon:bf}];return n.jsxs(n.Fragment,{children:[s&&n.jsx("div",{className:"sidebar-overlay",onClick:l}),n.jsxs("aside",{className:`sidebar ${s?"mobile-open":""}`,children:[n.jsxs("div",{className:"workspace-header-wrapper",children:[n.jsxs("div",{className:"workspace-header",onClick:()=>m(!x),children:[n.jsx("div",{className:"workspace-logo-circle",children:n.jsx("span",{children:i.orgName?i.orgName.charAt(0):"P"})}),n.jsxs("div",{className:"workspace-title-info",children:[n.jsx("span",{className:"workspace-name",children:i.orgName||"Petution Clinic"}),n.jsx("span",{className:"workspace-slug",children:i.slug||"petution"})]}),n.jsx(yf,{size:14,className:"margin-left-auto text-muted"})]}),x&&n.jsxs("div",{className:"workspace-popover-menu",children:[n.jsx("div",{className:"popover-section-label",children:"SELECT WORKSPACE"}),c.map(f=>n.jsxs("div",{className:`workspace-menu-item ${f.id===o?"active":""}`,onClick:()=>{p(f.id),m(!1)},children:[n.jsx("div",{className:"ws-item-circle",children:f.name.charAt(0)}),n.jsxs("div",{className:"ws-item-info",children:[n.jsx("span",{className:"ws-item-name",children:f.name}),n.jsx("span",{className:"ws-item-plan",children:f.plan||"Active Workspace"})]}),f.id===o&&n.jsx(Hd,{size:14,className:"text-teal margin-right-xs"}),c.length>1&&n.jsx("button",{className:"icon-btn text-rose",title:"Delete Clinic Workspace",onClick:d=>{d.stopPropagation(),confirm(`Permanently delete clinic workspace "${f.name}"?`)&&h(f.id)},children:n.jsx(Xt,{size:13})})]},f.id)),n.jsx("div",{className:"popover-divider"}),n.jsxs("button",{className:"workspace-add-btn",onClick:()=>{m(!1),r&&r()},children:[n.jsx(Zd,{size:16,className:"text-teal"}),n.jsx("span",{children:"+ Register New Clinic"})]})]})]}),n.jsx("nav",{className:"nav-group",children:N.map(f=>{const d=f.icon,g=e===f.id;return n.jsxs("button",{className:`nav-item ${g?"active":""}`,onClick:()=>v(f.id),children:[n.jsx(d,{size:18}),n.jsx("span",{children:f.label})]},f.id)})}),n.jsx("div",{className:"nav-divider"}),n.jsx("nav",{className:"nav-group",children:S.map(f=>{const d=f.icon,g=e===f.id;return n.jsxs("button",{className:`nav-item ${g?"active":""}`,onClick:()=>v(f.id),children:[n.jsx(d,{size:18}),n.jsx("span",{children:f.label})]},f.id)})}),n.jsxs("div",{className:"user-profile-footer clickable",onClick:()=>u("profile"),children:[n.jsx("div",{className:"avatar-circle",children:a!=null&&a.name?a.name.split(" ").map(f=>f[0]).join("").substring(0,2).toUpperCase():"KE"}),n.jsxs("div",{className:"user-details",children:[n.jsx("span",{className:"user-name",children:(a==null?void 0:a.name)||"Khaled ElGendy"}),n.jsx("span",{className:"user-email",children:(a==null?void 0:a.email)||"khaledahmed94.ka@gmail.com"})]})]}),n.jsx("style",{children:`
        .workspace-header-wrapper {
          position: relative;
          margin-bottom: 16px;
        }

        .workspace-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .workspace-header:hover {
          background: #f1f5f9;
        }

        .workspace-popover-menu {
          position: absolute;
          top: calc(100% + 4px);
          left: 0;
          width: 100%;
          max-width: 260px;
          background: #ffffff;
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          z-index: 100;
          padding: 8px;
          animation: fadeIn 0.15s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .popover-section-label {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-light);
          padding: 4px 8px;
          letter-spacing: 0.05em;
        }

        .workspace-menu-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .workspace-menu-item:hover {
          background: #f8fafc;
        }

        .workspace-menu-item.active {
          background: var(--primary-teal-light);
        }

        .ws-item-circle {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--primary-teal);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ws-item-info {
          display: flex;
          flex-direction: column;
          flex: 1;
          overflow: hidden;
        }

        .ws-item-name {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-main);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .ws-item-plan {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .popover-divider {
          height: 1px;
          background: var(--border-card);
          margin: 6px 0;
        }

        .workspace-add-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--primary-teal);
          transition: background 0.15s ease;
        }

        .workspace-add-btn:hover {
          background: var(--primary-teal-light);
        }

        .clickable {
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .clickable:hover {
          background: #f1f5f9;
          border-radius: var(--radius-sm);
        }

        .workspace-logo-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--primary-teal-light);
          color: var(--primary-teal);
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        .workspace-info {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
        }

        .workspace-title {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-main);
          line-height: 1.2;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .workspace-sub {
          font-size: 0.725rem;
          color: var(--text-muted);
        }

        .nav-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
          overflow-y: auto;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--sidebar-text);
          transition: all 0.15s ease;
          width: 100%;
          text-align: left;
          min-height: 44px;
        }

        .nav-item:hover:not(.active) {
          background: #f8fafc;
          color: var(--text-main);
        }

        .nav-item.active {
          background: var(--sidebar-bg-active);
          color: var(--sidebar-text-active);
        }

        .nav-divider {
          height: 1px;
          background: var(--sidebar-border);
          margin: 12px 0;
        }

        .user-profile-footer {
          margin-top: auto;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 10px;
          border-top: 1px solid var(--sidebar-border);
          padding-top: 14px;
        }

        .avatar-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #e2e8f0;
          color: #475569;
          font-size: 0.75rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .user-details {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-width: 0;
        }

        .user-name {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text-main);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-email {
          font-size: 0.7rem;
          color: var(--text-muted);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `})]})]})},Rf=({onMenuToggle:e})=>{const{settings:t,notifications:r,setNotifications:s,showNotifications:l,setShowNotifications:a}=B(),i=r.filter(o=>!o.read).length,c=()=>{s(o=>o.map(p=>({...p,read:!0})))};return n.jsxs("header",{className:"top-header",children:[n.jsxs("div",{className:"header-left",children:[n.jsx("button",{className:"icon-btn mobile-menu-btn",title:"Toggle Navigation Menu",onClick:e,children:n.jsx(Yd,{size:20})}),n.jsxs("div",{className:"breadcrumb",children:[n.jsx("span",{className:"text-muted",children:"Petution"}),n.jsx("span",{style:{color:"var(--text-light)"},children:"/"}),n.jsx("span",{className:"font-semibold",children:t.orgName})]})]}),n.jsx("div",{className:"header-actions",children:n.jsxs("div",{style:{position:"relative"},children:[n.jsxs("button",{className:"icon-btn",title:"Notifications",onClick:()=>a(!l),children:[n.jsx(ff,{size:18}),i>0&&n.jsx("span",{className:"notification-badge",children:i})]}),l&&n.jsxs("div",{className:"notifications-popover",children:[n.jsxs("div",{className:"notif-header",children:[n.jsx("span",{className:"font-semibold text-sm",children:"Notifications"}),i>0&&n.jsxs("button",{className:"text-xs text-teal font-semibold flex items-center gap-xs",onClick:c,children:[n.jsx(vf,{size:14})," Mark all read"]})]}),n.jsx("div",{className:"notif-list",children:r.length===0?n.jsx("div",{className:"text-muted text-xs",style:{padding:"16px",textAlign:"center"},children:"No notifications"}):r.map(o=>n.jsxs("div",{className:`notif-item ${o.read?"":"unread"}`,children:[n.jsx("div",{className:"notif-title",children:o.title}),n.jsx("div",{className:"notif-time",children:o.time})]},o.id))})]})]})}),n.jsx("style",{children:`
        .notifications-popover {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: calc(100vw - 24px);
          max-width: 320px;
          background: #ffffff;
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          z-index: 100;
          overflow: hidden;
        }

        .notif-header {
          padding: 12px 16px;
          border-bottom: 1px solid var(--border-card);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #f8fafc;
        }

        .notif-list {
          max-height: 280px;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        .notif-item {
          padding: 12px 16px;
          border-bottom: 1px solid var(--border-card);
          font-size: 0.85rem;
        }

        .notif-item.unread {
          background: var(--primary-teal-light);
        }

        .notif-title {
          font-weight: 500;
          color: var(--text-main);
        }

        .notif-time {
          font-size: 0.725rem;
          color: var(--text-muted);
          margin-top: 2px;
        }

        @media (max-width: 1023px) {
          .mobile-menu-btn {
            display: flex !important;
          }
        }

        @media (min-width: 1024px) {
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `})]})},Of=({activeTab:e,setActiveTab:t,onMenuToggle:r})=>{const s=[{id:"dashboard",label:"Dashboard",icon:Qd},{id:"clients",label:"Clients",icon:ru},{id:"pets",label:"Pets",icon:ui},{id:"visits",label:"Visits",icon:$s},{id:"more",label:"Menu",icon:Yd,isMenu:!0}];return n.jsxs("nav",{className:"bottom-nav",children:[s.map(l=>{const a=l.icon,i=e===l.id;return n.jsxs("button",{className:`bottom-nav-item ${i?"active":""}`,onClick:()=>{l.isMenu?r():t(l.id)},children:[n.jsx(a,{size:20}),n.jsx("span",{children:l.label})]},l.id)}),n.jsx("style",{children:`
        .bottom-nav {
          display: flex;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: 64px;
          background: #ffffff;
          border-top: 1px solid var(--border-card);
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
          z-index: 180;
          padding: 4px 8px;
          padding-bottom: env(safe-area-inset-bottom, 4px);
        }

        .bottom-nav-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 2px;
          color: var(--text-muted);
          font-size: 0.68rem;
          font-weight: 500;
          background: transparent;
          border: none;
          padding: 6px 0;
          border-radius: var(--radius-sm);
          transition: color 0.15s ease;
          min-height: 44px;
        }

        .bottom-nav-item.active {
          color: var(--primary-teal);
          font-weight: 700;
        }

        @media (min-width: 1024px) {
          .bottom-nav {
            display: none !important;
          }
        }
      `})]})},Lf=({provider:e,onClose:t})=>{const{loginWithProvider:r}=B(),[s,l]=j.useState(null),[a,i]=j.useState(""),[c,o]=j.useState(""),[p,h]=j.useState(!1),[x,m]=j.useState(!1),u=e==="google",v=u?[{name:"Dr. Khaled ElGendy",email:"khaledahmed94.ka@gmail.com",avatar:"👨‍⚕️"},{name:"Petution Admin",email:"admin@petution.com",avatar:"🐾"}]:[{name:"Khaled ElGendy",email:"khaled.elgendy@icloud.com",avatar:"🍏"}],N=f=>{l(f)},S=f=>{f.preventDefault();const d=p?{name:c||a.split("@")[0],email:a}:s||v[0];d.email&&(m(!0),setTimeout(()=>{r(e,d.email,d.name),m(!1),t()},1e3))};return n.jsxs("div",{className:"social-modal-overlay",children:[n.jsxs("div",{className:`social-modal-card ${u?"google-style":"apple-style"}`,children:[n.jsxs("div",{className:"social-modal-header",children:[n.jsx("div",{className:"provider-badge",children:u?n.jsxs("svg",{viewBox:"0 0 24 24",width:"24",height:"24",children:[n.jsx("path",{fill:"#4285F4",d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"}),n.jsx("path",{fill:"#34A853",d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"}),n.jsx("path",{fill:"#FBBC05",d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"}),n.jsx("path",{fill:"#EA4335",d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"})]}):n.jsx("svg",{viewBox:"0 0 24 24",width:"24",height:"24",fill:"currentColor",children:n.jsx("path",{d:"M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.36c.64-.78 1.08-1.85.96-2.93-.93.04-2.06.62-2.73 1.4-.59.68-1.1 1.77-.96 2.84 1.05.08 2.09-.53 2.73-1.31"})})}),n.jsx("button",{className:"close-btn",onClick:t,children:n.jsx(me,{size:18})})]}),n.jsxs("div",{className:"title-area",children:[n.jsxs("h3",{children:["Sign in with ",u?"Google":"Apple"]}),n.jsxs("p",{className:"subtitle",children:["to continue to ",n.jsx("strong",{children:"Petution Veterinary Center"})]})]}),n.jsxs("div",{className:"scope-info",children:[n.jsx(eu,{size:14,className:"text-teal"}),n.jsx("span",{children:"Petution will receive your name, email address, and profile picture."})]}),p?n.jsxs("form",{onSubmit:S,className:"new-account-form",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Your Name"}),n.jsx("input",{type:"text",className:"form-control",placeholder:"Dr. Jane Doe",value:c,onChange:f=>o(f.target.value),required:!0})]}),n.jsxs("div",{className:"form-group margin-top-xs",children:[n.jsxs("label",{children:[u?"Google":"Apple"," Email Address"]}),n.jsx("input",{type:"email",className:"form-control",placeholder:u?"doctor@gmail.com":"doctor@icloud.com",value:a,onChange:f=>i(f.target.value),required:!0})]}),n.jsx("button",{type:"button",className:"text-btn",onClick:()=>h(!1),children:"← Back to saved accounts"})]}):n.jsxs("div",{className:"account-list",children:[v.map((f,d)=>n.jsxs("div",{className:`account-item ${(s==null?void 0:s.email)===f.email||!s&&d===0?"active":""}`,onClick:()=>N(f),children:[n.jsx("div",{className:"avatar-circle",children:f.avatar}),n.jsxs("div",{className:"account-details",children:[n.jsx("div",{className:"acc-name",children:f.name}),n.jsx("div",{className:"acc-email",children:f.email})]}),((s==null?void 0:s.email)===f.email||!s&&d===0)&&n.jsx(Hd,{size:16,className:"check-icon"})]},d)),n.jsxs("button",{className:"add-account-btn",onClick:()=>h(!0),children:[n.jsx(nu,{size:16})," Use another ",u?"Google":"Apple"," account"]})]}),n.jsxs("div",{className:"modal-actions",children:[n.jsx("button",{className:"btn-secondary",onClick:t,disabled:x,children:"Cancel"}),n.jsx("button",{className:"btn-primary",onClick:S,disabled:x,children:x?n.jsxs("span",{className:"flex items-center gap-xs",children:[n.jsx("span",{className:"spinner"})," Signing in..."]}):n.jsxs("span",{className:"flex items-center gap-xs",children:["Continue ",n.jsx(ot,{size:16})]})})]}),n.jsxs("div",{className:"security-footer",children:[n.jsx(Kd,{size:12}),n.jsx("span",{children:"Secure OAuth 2.0 Connection"})]})]}),n.jsx("style",{children:`
        .social-modal-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.65);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }

        .social-modal-card {
          width: 100%;
          max-width: 440px;
          background: #ffffff;
          border-radius: 16px;
          padding: 28px 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          animation: modalPop 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .social-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .provider-badge {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-btn {
          background: transparent;
          border: none;
          color: #94a3b8;
          cursor: pointer;
          padding: 4px;
          border-radius: 6px;
        }

        .close-btn:hover { background: #f1f5f9; color: #334155; }

        .title-area h3 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 2px;
        }

        .subtitle {
          font-size: 0.85rem;
          color: #64748b;
        }

        .scope-info {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          padding: 10px 12px;
          margin: 16px 0;
          font-size: 0.78rem;
          color: #166534;
        }

        .account-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }

        .account-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .account-item:hover {
          border-color: #cbd5e1;
          background: #f8fafc;
        }

        .account-item.active {
          border-color: #0d9488;
          background: #f0fdfa;
        }

        .avatar-circle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
        }

        .account-details { flex: 1; }
        .acc-name { font-size: 0.875rem; font-weight: 600; color: #0f172a; }
        .acc-email { font-size: 0.78rem; color: #64748b; }
        .check-icon { color: #0d9488; }

        .add-account-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: 1px dashed #cbd5e1;
          border-radius: 10px;
          padding: 10px 12px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #475569;
          cursor: pointer;
          width: 100%;
        }

        .add-account-btn:hover { background: #f8fafc; border-color: #94a3b8; }

        .new-account-form { margin-bottom: 20px; }
        .text-btn { background: none; border: none; color: #0d9488; font-size: 0.8rem; font-weight: 600; cursor: pointer; padding: 0; margin-top: 8px; }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          border-top: 1px solid #f1f5f9;
          padding-top: 16px;
        }

        .security-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 0.72rem;
          color: #94a3b8;
          margin-top: 16px;
        }

        .spinner {
          width: 14px;
          height: 14px;
          border: 2px solid #ffffff;
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
      `})]})},Vf=({onClose:e})=>{const[t,r]=j.useState(""),[s,l]=j.useState(!1),[a,i]=j.useState(!1),c=o=>{o.preventDefault(),t&&(i(!0),setTimeout(()=>{i(!1),l(!0)},1e3))};return n.jsxs("div",{className:"modal-overlay",children:[n.jsxs("div",{className:"modal-card",children:[n.jsxs("div",{className:"modal-header",children:[n.jsx("h4",{children:"Reset Password"}),n.jsx("button",{className:"close-btn",onClick:e,children:n.jsx(me,{size:18})})]}),s?n.jsxs("div",{className:"modal-body text-center py-md",children:[n.jsx(Bd,{size:48,className:"text-teal margin-bottom-sm",style:{margin:"0 auto 12px"}}),n.jsx("h4",{children:"Reset Link Sent!"}),n.jsxs("p",{className:"text-muted text-xs margin-top-xs",children:["We sent a password reset link to ",n.jsx("strong",{children:t}),". Check your inbox and spam folder."]}),n.jsx("button",{className:"btn-primary w-full margin-top-md",onClick:e,children:"Back to Sign In"})]}):n.jsxs("form",{onSubmit:c,className:"modal-body",children:[n.jsx("p",{className:"text-muted text-xs margin-bottom-md",children:"Enter your registered email address. We will send you a password reset link to access your clinic workspace."}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Work Email Address"}),n.jsxs("div",{className:"input-with-icon",children:[n.jsx(Jd,{size:16,className:"input-icon"}),n.jsx("input",{type:"email",className:"form-control",placeholder:"doctor@petution.com",value:t,onChange:o=>r(o.target.value),required:!0})]})]}),n.jsxs("div",{className:"modal-footer margin-top-md",children:[n.jsx("button",{type:"button",className:"btn-secondary",onClick:e,children:"Cancel"}),n.jsxs("button",{type:"submit",className:"btn-primary",disabled:a,children:[a?"Sending...":"Send Reset Link",n.jsx(ot,{size:16})]})]})]})]}),n.jsx("style",{children:`
        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          z-index: 9999; padding: 20px;
        }
        .modal-card {
          width: 100%; max-width: 420px; background: #ffffff;
          border-radius: 16px; padding: 24px; box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .modal-header h4 { font-size: 1.15rem; font-weight: 700; color: #0f172a; }
        .close-btn { background: none; border: none; color: #94a3b8; cursor: pointer; }
        .modal-footer { display: flex; justify-content: flex-end; gap: 10px; }
        .margin-bottom-sm { margin-bottom: 8px; }
        .margin-bottom-md { margin-bottom: 16px; }
        .margin-top-md { margin-top: 16px; }
        .py-md { padding: 16px 0; }
        .text-center { text-align: center; }
      `})]})},Uf=()=>{const{loginWithEmail:e,signup:t}=B(),[r,s]=j.useState("login"),[l,a]=j.useState(null),[i,c]=j.useState(!1),[o,p]=j.useState(""),[h,x]=j.useState(""),[m,u]=j.useState(""),[v,N]=j.useState(""),S=d=>{if(d.preventDefault(),r==="login"){if(!o.trim()||!h)return alert("Please enter both email and password.");e(o,h)}else{if(!m.trim()||!o.trim()||!h)return alert("Please fill in all required fields.");t(m,o,h,v||"My Petution Clinic")}},f=()=>{e("khaledahmed94.ka@gmail.com","demo123")};return n.jsxs("div",{className:"auth-wrapper",children:[n.jsxs("div",{className:"auth-card card",children:[n.jsxs("div",{className:"auth-header",children:[n.jsx("div",{className:"auth-logo-circle",children:n.jsx("span",{children:"🐾"})}),n.jsx("h2",{children:"Welcome to Petution"}),n.jsx("p",{className:"text-muted text-xs",children:r==="login"?"Sign in to access your veterinary clinic workspace":"Register your clinic workspace in 30 seconds"})]}),n.jsxs("div",{className:"auth-tabs",children:[n.jsx("button",{className:`auth-tab-btn ${r==="login"?"active":""}`,onClick:()=>s("login"),children:"Sign In"}),n.jsx("button",{className:`auth-tab-btn ${r==="signup"?"active":""}`,onClick:()=>s("signup"),children:"Create Account"})]}),n.jsxs("div",{className:"social-auth-group",children:[n.jsxs("button",{className:"social-btn google-btn",onClick:()=>a("google"),children:[n.jsxs("svg",{className:"social-icon",viewBox:"0 0 24 24",width:"18",height:"18",children:[n.jsx("path",{fill:"#4285F4",d:"M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"}),n.jsx("path",{fill:"#34A853",d:"M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"}),n.jsx("path",{fill:"#FBBC05",d:"M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"}),n.jsx("path",{fill:"#EA4335",d:"M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"})]}),n.jsx("span",{children:"Continue with Google"})]}),n.jsxs("button",{className:"social-btn apple-btn",onClick:()=>a("apple"),children:[n.jsx("svg",{className:"social-icon",viewBox:"0 0 24 24",width:"18",height:"18",fill:"currentColor",children:n.jsx("path",{d:"M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.36c.64-.78 1.08-1.85.96-2.93-.93.04-2.06.62-2.73 1.4-.59.68-1.1 1.77-.96 2.84 1.05.08 2.09-.53 2.73-1.31"})}),n.jsx("span",{children:"Continue with Apple"})]})]}),n.jsx("div",{className:"auth-divider",children:n.jsx("span",{children:"OR WITH EMAIL"})}),n.jsxs("form",{onSubmit:S,className:"auth-form",children:[r==="signup"&&n.jsxs(n.Fragment,{children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Your Name *"}),n.jsxs("div",{className:"input-with-icon",children:[n.jsx(nu,{size:16,className:"input-icon"}),n.jsx("input",{type:"text",className:"form-control",placeholder:"Dr. Khaled ElGendy",value:m,onChange:d=>u(d.target.value),required:!0})]})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Clinic Name"}),n.jsxs("div",{className:"input-with-icon",children:[n.jsx(xf,{size:16,className:"input-icon"}),n.jsx("input",{type:"text",className:"form-control",placeholder:"Petution Vet Center",value:v,onChange:d=>N(d.target.value)})]})]})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Email Address *"}),n.jsxs("div",{className:"input-with-icon",children:[n.jsx(Jd,{size:16,className:"input-icon"}),n.jsx("input",{type:"email",className:"form-control",placeholder:"name@clinic.com",value:o,onChange:d=>p(d.target.value),required:!0})]})]}),n.jsxs("div",{className:"form-group",children:[n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsx("label",{style:{marginBottom:0},children:"Password *"}),r==="login"&&n.jsx("button",{type:"button",className:"text-xs text-teal font-semibold",onClick:()=>c(!0),children:"Forgot?"})]}),n.jsxs("div",{className:"input-with-icon margin-top-xs",children:[n.jsx(Kd,{size:16,className:"input-icon"}),n.jsx("input",{type:"password",className:"form-control",placeholder:"••••••••",value:h,onChange:d=>x(d.target.value),required:!0})]})]}),n.jsxs("button",{type:"submit",className:"btn-primary w-full margin-top-md",children:[r==="login"?"Sign In to Workspace":"Create Clinic Workspace",n.jsx(ot,{size:16})]})]}),n.jsx("div",{className:"demo-box margin-top-lg",children:n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsxs("div",{children:[n.jsxs("span",{className:"font-bold text-xs flex items-center gap-xs text-teal",children:[n.jsx(Bs,{size:14})," Quick Demo Access"]}),n.jsx("p",{className:"text-xs text-muted",children:"Test live clinic workspace instantly"})]}),n.jsx("button",{className:"btn-secondary text-xs",onClick:f,children:"⚡ Demo Login"})]})})]}),n.jsx("style",{children:`
        .auth-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0f172a 0%, #0d9488 100%);
          padding: 20px;
        }

        .auth-card {
          width: 100%;
          max-width: 420px;
          background: #ffffff;
          border-radius: var(--radius-lg);
          padding: 32px 24px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .auth-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .auth-logo-circle {
          width: 54px;
          height: 54px;
          border-radius: 50%;
          background: var(--primary-teal-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.75rem;
          margin: 0 auto 12px;
        }

        .auth-header h2 {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-main);
        }

        .auth-tabs {
          display: flex;
          background: #f1f5f9;
          padding: 4px;
          border-radius: var(--radius-md);
          margin-bottom: 20px;
        }

        .auth-tab-btn {
          flex: 1;
          padding: 8px 0;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--text-muted);
          background: transparent;
          border: none;
          border-radius: var(--radius-sm);
          transition: all 0.15s ease;
        }

        .auth-tab-btn.active {
          background: #ffffff;
          color: var(--primary-teal);
          box-shadow: var(--shadow-sm);
        }

        .social-auth-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 10px 16px;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          font-weight: 600;
          background: #ffffff;
          border: 1px solid var(--border-card);
          color: var(--text-main);
          transition: all 0.15s ease;
          cursor: pointer;
        }

        .social-btn:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }

        .auth-divider {
          display: flex;
          align-items: center;
          text-align: center;
          margin: 16px 0;
        }

        .auth-divider::before, .auth-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid var(--border-card);
        }

        .auth-divider span {
          padding: 0 10px;
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--text-light);
          letter-spacing: 0.05em;
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 12px;
          color: var(--text-muted);
        }

        .input-with-icon .form-control {
          padding-left: 36px;
        }

        .w-full { width: 100%; justify-content: center; }
      `}),l&&n.jsx(Lf,{provider:l,onClose:()=>a(null)}),i&&n.jsx(Vf,{onClose:()=>c(!1)})]})},Po=()=>{const{clients:e,pets:t,visits:r,invoices:s,products:l,expenses:a=[],settings:i,team:c,setActiveDrawer:o,setActiveTab:p}=B(),[h,x]=Lo.useState(!0),m=s.filter(S=>S.status==="paid").reduce((S,f)=>S+f.totalAmount,0),u=[{id:"task-client",title:"Add Customer",desc:"Add your first customer or import from a CSV file.",completed:e.length>0,btnText:"Add Customer",action:()=>o("addClient"),secondaryBtnText:"Import",secondaryAction:()=>o("importClients")},{id:"task-pet",title:"Add Pet Profile",desc:"Register pets with microchips, medical histories, and health cards.",completed:t.length>0,btnText:"Add Pet Record",action:()=>o("addPet"),secondaryBtnText:"Import",secondaryAction:()=>o("importPets")},{id:"task-prod",title:"Add Products & Services",desc:"Create vaccinations, medications, and examination sessions.",completed:l.length>0,btnText:"Add Product / Service",action:()=>o("addItem"),secondaryBtnText:"Import",secondaryAction:()=>o("importProducts")},{id:"task-visit",title:"Schedule Appointment / Visit",desc:"Book clinic consultations, vaccinations, and surgeries.",completed:r.length>0,btnText:"New Visit",action:()=>o("addVisit")},{id:"task-invoice",title:"Create First Invoice",desc:"Bill clients for services rendered with tax and discount calculator.",completed:s.length>0,btnText:"Create Invoice",action:()=>o("addInvoice")},{id:"task-expense",title:"Record Clinic Expense",desc:"Track operational costs, rent, utilities, and wholesaler orders.",completed:a.length>0,btnText:"Record Expense",action:()=>o("addExpense")},{id:"task-hours",title:"Set Clinic Working Hours",desc:"Configure clinic schedule, address, contact details, and organization info.",completed:!!(i.phone&&i.address),btnText:"Clinic Settings",action:()=>p("settings")},{id:"task-team",title:"Invite Team / Vets",desc:"Add associate vets, receptionists, and clinic staff to your workspace.",completed:c.length>1,btnText:"Invite Team Member",action:()=>o("inviteMember")}],v=u.filter(S=>S.completed).length,N=Math.round(v/u.length*100);return n.jsxs("div",{className:"dashboard-page",children:[n.jsxs("div",{className:"greeting-header flex justify-between items-center",children:[n.jsxs("div",{children:[n.jsxs("h2",{children:["Good evening, Khaled ElGendy ",n.jsx("span",{className:"hand-wave",children:"👋"})," ",n.jsx("span",{className:"owner-badge",children:"Owner"})]}),n.jsx("p",{className:"text-muted",children:"Here's your clinic pulse for today."})]}),!h&&n.jsxs("button",{className:"btn-secondary text-xs",onClick:()=>x(!0),children:["🚀 Show Getting Started (",v,"/8)"]})]}),h&&n.jsxs("div",{className:"card onboarding-card margin-bottom-lg",children:[n.jsxs("div",{className:"onboarding-header",children:[n.jsxs("div",{className:"flex items-center gap-xs",children:[n.jsx("span",{className:"rocket-icon",children:"🚀"}),n.jsx("h3",{className:"font-bold",children:"Getting Started"})]}),n.jsx("div",{className:"flex items-center gap-xs",children:n.jsx("button",{className:"icon-btn text-muted",title:"Dismiss Onboarding Widget",onClick:()=>x(!1),children:"✕"})})]}),n.jsxs("div",{className:"progress-section margin-top-sm margin-bottom-md",children:[n.jsxs("div",{className:"flex justify-between text-xs font-semibold margin-bottom-xs",children:[n.jsxs("span",{children:[v," of ",u.length," completed"]}),n.jsxs("span",{className:"text-teal",children:[N,"%"]})]}),n.jsx("div",{className:"progress-bar-bg",children:n.jsx("div",{className:"progress-bar-fill",style:{width:`${N}%`}})})]}),n.jsx("div",{className:"onboarding-grid",children:u.map(S=>n.jsxs("div",{className:`onboarding-item-card ${S.completed?"completed":""}`,children:[n.jsxs("div",{className:"item-header flex items-center justify-between",children:[n.jsxs("div",{className:"flex items-center gap-xs",children:[n.jsx("div",{className:`check-circle ${S.completed?"checked":""}`,children:S.completed?"✓":"👤+"}),n.jsx("h4",{className:"font-semibold text-sm",children:S.title})]}),S.completed&&n.jsx("span",{className:"badge badge-teal text-xs",children:"Done"})]}),n.jsx("p",{className:"text-xs text-muted margin-top-xs margin-bottom-md",children:S.desc}),n.jsxs("div",{className:"flex gap-xs",children:[n.jsx("button",{className:"btn-primary text-xs",onClick:S.action,children:S.btnText}),S.secondaryBtnText&&n.jsx("button",{className:"btn-secondary text-xs",onClick:S.secondaryAction,children:S.secondaryBtnText})]})]},S.id))})]}),n.jsxs("div",{className:"revenue-banner",children:[n.jsxs("div",{className:"revenue-info",children:[n.jsx("span",{className:"banner-sub",children:"TODAY'S REVENUE"}),n.jsxs("h1",{className:"banner-amount",children:[m," EGP"]}),n.jsx("span",{className:"banner-change",children:"+0% vs yesterday"})]}),n.jsxs("button",{className:"view-all-btn",onClick:()=>p("visits"),children:["View All Visits ",n.jsx(ot,{size:16})]})]}),n.jsxs("div",{className:"section-title",children:[n.jsx("h3",{children:"Clinic Pulse"}),n.jsx("p",{className:"text-muted",children:"Live overview of what matters most"})]}),n.jsxs("div",{className:"metrics-grid-7",children:[n.jsxs("div",{className:"card pulse-card",children:[n.jsx("span",{className:"card-val",children:r.length}),n.jsx("span",{className:"card-lbl",children:"Visits Today"})]}),n.jsxs("div",{className:"card pulse-card",children:[n.jsx("span",{className:"card-val",children:r.filter(S=>S.state==="in-progress").length}),n.jsx("span",{className:"card-lbl",children:"In Progress"})]}),n.jsxs("div",{className:"card pulse-card",children:[n.jsx("span",{className:"card-val",children:"0"}),n.jsx("span",{className:"card-lbl",children:"Booked Not Today"})]}),n.jsxs("div",{className:"card pulse-card",children:[n.jsx("span",{className:"card-val",children:r.filter(S=>S.state==="scheduled").length}),n.jsx("span",{className:"card-lbl",children:"Scheduled Queue"})]}),n.jsxs("div",{className:"card pulse-card",children:[n.jsx("span",{className:"card-val",children:"0%"}),n.jsx("span",{className:"card-lbl",children:"% Recurring"})]}),n.jsxs("div",{className:"card pulse-card",children:[n.jsx("span",{className:"card-val",children:"—"}),n.jsx("span",{className:"card-lbl",children:"Avg Rating (30d)"})]}),n.jsxs("div",{className:"card pulse-card",children:[n.jsx("span",{className:"card-val",children:"0"}),n.jsx("span",{className:"card-lbl",children:"No Show"})]})]}),n.jsx("div",{className:"section-title",children:n.jsx("h3",{children:"Tasks need your attention"})}),n.jsxs("div",{className:"alert-cards-grid",children:[n.jsxs("div",{className:"alert-card grad-amber",onClick:()=>p("clients"),children:[n.jsxs("div",{className:"alert-content",children:[n.jsx("span",{className:"alert-val",children:"0"}),n.jsx("span",{className:"alert-lbl",children:"Need action"})]}),n.jsx(ot,{size:18,className:"alert-arrow"})]}),n.jsxs("div",{className:"alert-card grad-rose",onClick:()=>p("products"),children:[n.jsxs("div",{className:"alert-content",children:[n.jsx("span",{className:"alert-val",children:"0"}),n.jsx("span",{className:"alert-lbl",children:"Low stock products"})]}),n.jsx(ot,{size:18,className:"alert-arrow"})]}),n.jsxs("div",{className:"alert-card grad-teal",onClick:()=>p("visits"),children:[n.jsxs("div",{className:"alert-content",children:[n.jsx("span",{className:"alert-val",children:"0"}),n.jsx("span",{className:"alert-lbl",children:"Upcoming Follow-ups"})]}),n.jsx(ot,{size:18,className:"alert-arrow"})]}),n.jsxs("div",{className:"alert-card grad-rose",onClick:()=>p("invoices"),children:[n.jsxs("div",{className:"alert-content",children:[n.jsx("span",{className:"alert-val",children:s.filter(S=>S.status==="pending").length}),n.jsx("span",{className:"alert-lbl",children:"Invoices"})]}),n.jsx(ot,{size:18,className:"alert-arrow"})]})]}),n.jsxs("div",{className:"shortcuts-row",children:[n.jsxs("button",{className:"shortcut-btn",onClick:()=>o("addVisit"),children:[n.jsx(Zd,{size:20,className:"text-teal"}),n.jsx("span",{children:"New Visit"})]}),n.jsxs("button",{className:"shortcut-btn",onClick:()=>o("addClient"),children:[n.jsx(tu,{size:20,className:"text-teal"}),n.jsx("span",{children:"Add Client"})]}),n.jsxs("button",{className:"shortcut-btn",onClick:()=>o("addPet"),children:[n.jsx(ui,{size:20,className:"text-teal"}),n.jsx("span",{children:"Add Pet"})]}),n.jsxs("button",{className:"shortcut-btn",onClick:()=>window.open("https://wa.me/","_blank"),children:[n.jsx(mi,{size:20,className:"text-green"}),n.jsx("span",{children:"WhatsApp"})]})]}),n.jsxs("div",{className:"card queue-card",children:[n.jsx("div",{className:"queue-header",children:n.jsxs("div",{children:[n.jsx("h4",{children:"Visit Queue"}),n.jsx("p",{className:"text-muted",children:"Drag and drop to reorder instantly."})]})}),r.filter(S=>S.state==="scheduled").length===0?n.jsx("div",{className:"empty-state",children:"No scheduled visits in queue."}):n.jsx("div",{className:"queue-list",children:r.filter(S=>S.state==="scheduled").map(S=>{var f;return n.jsxs("div",{className:"queue-item",children:[n.jsx(wf,{size:16,className:"text-light"}),n.jsx("span",{className:"font-semibold",children:((f=t.find(d=>d.id===S.petId))==null?void 0:f.name)||"Pet"}),n.jsx("span",{className:"text-muted",children:S.visitType}),n.jsx("span",{className:"badge badge-teal",children:S.state})]},S.id)})})]}),n.jsx("style",{children:`
        .onboarding-card {
          border: 1px solid var(--border-card);
          padding: 20px;
          margin-top: 16px;
        }

        .onboarding-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .rocket-icon {
          font-size: 1.25rem;
        }

        .progress-bar-bg {
          height: 8px;
          background: #e2e8f0;
          border-radius: 9999px;
          overflow: hidden;
        }

        .progress-bar-fill {
          height: 100%;
          background: var(--primary-teal);
          border-radius: 9999px;
          transition: width 0.3s ease;
        }

        .onboarding-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-top: 14px;
        }

        @media (min-width: 640px) {
          .onboarding-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (min-width: 1024px) {
          .onboarding-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        .onboarding-item-card {
          background: #ffffff;
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          padding: 14px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: all 0.15s ease;
        }

        .onboarding-item-card:hover {
          border-color: var(--primary-teal);
          box-shadow: var(--shadow-sm);
        }

        .onboarding-item-card.completed {
          background: #f8fafc;
          border-color: #e2e8f0;
        }

        .check-circle {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #f1f5f9;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .check-circle.checked {
          background: var(--primary-teal-light);
          color: var(--primary-teal);
        }

        .greeting-header h2 {
          font-size: 1.2rem;
          font-weight: 700;
          line-height: 1.4;
        }

        .owner-badge {
          font-size: 0.7rem;
          background: #f1f5f9;
          padding: 2px 8px;
          border-radius: 9999px;
          color: var(--text-muted);
          vertical-align: middle;
        }

        .revenue-banner {
          background: var(--primary-teal);
          color: #ffffff;
          border-radius: var(--radius-lg);
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 12px;
          margin: 16px 0 20px;
        }

        .banner-sub {
          font-size: 0.7rem;
          letter-spacing: 0.05em;
          opacity: 0.9;
        }

        .banner-amount {
          font-size: 1.75rem;
          font-weight: 800;
          margin: 4px 0;
        }

        .banner-change {
          font-size: 0.8rem;
          opacity: 0.9;
        }

        .view-all-btn {
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
          padding: 10px 20px;
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: background 0.15s ease;
          width: 100%;
          justify-content: center;
        }

        .view-all-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .section-title {
          margin-bottom: 10px;
        }

        .section-title h3 {
          font-size: 1rem;
          font-weight: 600;
        }

        .pulse-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 12px;
          text-align: center;
        }

        .card-val {
          font-size: 1.3rem;
          font-weight: 700;
        }

        .card-lbl {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .alert-card {
          border-radius: var(--radius-md);
          padding: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        .grad-amber { background: var(--grad-amber); }
        .grad-rose { background: var(--grad-rose); }
        .grad-teal { background: var(--grad-teal); }

        .alert-val {
          font-size: 1.5rem;
          font-weight: 800;
          display: block;
        }

        .alert-lbl {
          font-size: 0.78rem;
          font-weight: 600;
          color: rgba(15, 23, 42, 0.8);
        }

        .shortcut-btn {
          background: #ffffff;
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          padding: 14px 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-weight: 600;
          font-size: 0.82rem;
          color: var(--text-main);
          box-shadow: var(--shadow-sm);
          transition: all 0.15s ease;
        }

        .shortcut-btn:hover {
          border-color: var(--primary-teal);
          transform: translateY(-1px);
        }

        .queue-card {
          margin-top: 8px;
        }

        .queue-header h4 {
          font-size: 1rem;
          font-weight: 600;
        }

        .queue-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 12px;
        }

        .queue-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          background: #f8fafc;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-card);
          font-size: 0.85rem;
          flex-wrap: wrap;
        }

        @media (min-width: 640px) {
          .greeting-header h2 {
            font-size: 1.5rem;
          }
          .revenue-banner {
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 28px 32px;
          }
          .view-all-btn {
            width: auto;
          }
          .banner-amount {
            font-size: 2.25rem;
          }
          .alert-val {
            font-size: 1.75rem;
          }
          .alert-card {
            padding: 20px;
          }
          .pulse-card {
            padding: 16px;
          }
          .card-val {
            font-size: 1.5rem;
          }
        }
      `})]})};function Ws(e,t="export.csv"){if(!e||!e.length){alert("No data available to export.");return}const r=new Set;e.forEach(p=>Object.keys(p).forEach(h=>r.add(h)));const s=[...r],l=[];l.push(s.join(","));for(const p of e){const h=s.map(x=>{let m=p[x];return m==null&&(m=""),typeof m=="object"&&(m=JSON.stringify(m)),`"${String(m).replace(/"/g,'""')}"`});l.push(h.join(","))}const a="\uFEFF"+l.join(`
`),i=new Blob([a],{type:"text/csv;charset=utf-8;"}),c=URL.createObjectURL(i),o=document.createElement("a");o.href=c,o.setAttribute("download",t),document.body.appendChild(o),o.click(),document.body.removeChild(o),URL.revokeObjectURL(c)}function Ff(e,t="petution_backup.json"){const r=JSON.stringify(e,null,2),s=new Blob([r],{type:"application/json;charset=utf-8;"}),l=URL.createObjectURL(s),a=document.createElement("a");a.href=l,a.setAttribute("download",t),document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(l)}function $f(e){if(!e||typeof e!="string")return[];let t=e.trim();t.charCodeAt(0)===65279&&(t=t.substring(1));const r=t.split(`
`);if(r.length<2)return[];const s=r[0].split(",").map(a=>a.trim().replace(/^"|"$/g,"")),l=[];for(let a=1;a<r.length;a++){const i=r[a].trim();if(!i)continue;const c=[];let o="",p=!1;for(let x=0;x<i.length;x++){const m=i[x];p?m==='"'?x+1<i.length&&i[x+1]==='"'?(o+='"',x++):p=!1:o+=m:m==='"'?p=!0:m===","?(c.push(o.trim()),o=""):o+=m}c.push(o.trim());const h={};s.forEach((x,m)=>{h[x]=c[m]!==void 0?c[m]:""}),l.push(h)}return l}const Bf=({client:e,onClose:t})=>{var c,o,p;const{pets:r,setActiveDrawer:s,setActiveModalItem:l}=B();if(!e)return null;const a=((c=e.phones)==null?void 0:c.find(h=>h.isPrimary))||((o=e.phones)==null?void 0:o[0]),i=r.filter(h=>{var x,m;return((x=e.pets)==null?void 0:x.includes(h.id))||((m=h.owners)==null?void 0:m.includes(e.id))});return n.jsxs("div",{className:"modal-overlay",children:[n.jsxs("div",{className:"modal-card profile-card",children:[n.jsxs("div",{className:"modal-header",children:[n.jsxs("div",{className:"flex items-center gap-sm",children:[n.jsx("div",{className:"avatar-badge",children:e.name.charAt(0)}),n.jsxs("div",{children:[n.jsx("h4",{style:{margin:0},children:e.name}),n.jsxs("span",{className:"text-muted text-xs",children:["Client ID: ",e.id," • Registered ",e.createdAt]})]})]}),n.jsx("button",{className:"close-btn",onClick:t,children:n.jsx(me,{size:18})})]}),n.jsxs("div",{className:"profile-body",children:[n.jsxs("div",{className:"info-section card",children:[n.jsx("h5",{className:"section-title",children:"Contact & Address Details"}),n.jsxs("div",{className:"info-row",children:[n.jsx(zf,{size:14,className:"text-teal"}),n.jsx("span",{children:(a==null?void 0:a.phone)||"No phone provided"}),(a==null?void 0:a.hasWhatsapp)&&n.jsxs("a",{href:`https://wa.me/${a.phone.replace(/[^0-9]/g,"")}`,target:"_blank",rel:"noreferrer",className:"whatsapp-pill",children:[n.jsx(mi,{size:12})," WhatsApp"]})]}),n.jsxs("div",{className:"info-row",children:[n.jsx(Cf,{size:14,className:"text-teal"}),n.jsx("span",{children:[e.street,e.district,e.governorate].filter(Boolean).join(", ")||"No address stored"})]}),n.jsxs("div",{className:"info-row",children:[n.jsx($s,{size:14,className:"text-teal"}),n.jsxs("span",{children:["Client Source: ",e.source||"Direct Registration"]})]}),n.jsxs("div",{className:"info-row",children:[n.jsx(Mf,{size:14,className:"text-teal"}),n.jsx("div",{className:"flex gap-xs flex-wrap",children:((p=e.tags)==null?void 0:p.map((h,x)=>n.jsx("span",{className:"badge badge-gray text-xs",children:h},x)))||n.jsx("span",{className:"text-muted text-xs",children:"No tags"})})]})]}),n.jsxs("div",{className:"pets-section card margin-top-md",children:[n.jsxs("div",{className:"flex justify-between items-center margin-bottom-sm",children:[n.jsxs("h5",{className:"section-title",style:{marginBottom:0},children:["Registered Pets (",i.length,")"]}),n.jsxs("button",{className:"btn-secondary text-xs",onClick:()=>{t(),s("addPet")},children:[n.jsx(rt,{size:14})," Add Pet"]})]}),i.length===0?n.jsx("p",{className:"text-muted text-xs",children:"No pets registered under this client profile."}):n.jsx("div",{className:"pets-grid",children:i.map(h=>n.jsxs("div",{className:"pet-tile",children:[n.jsxs("div",{className:"pet-tile-header",children:[n.jsx("span",{className:"pet-icon",children:h.species==="cat"?"🐱":"🐶"}),n.jsxs("div",{children:[n.jsx("strong",{className:"pet-name",children:h.name}),n.jsxs("span",{className:"pet-sub text-xs",children:[h.breed||h.species," • ",h.ageValue," ",h.ageUnit]})]})]}),n.jsx("div",{className:"pet-tile-actions margin-top-xs",children:n.jsx("button",{className:"btn-secondary text-xs flex-1",onClick:()=>{t(),l(h.id),s("petPassport")},children:"Passport"})})]},h.id))})]})]}),n.jsx("div",{className:"modal-footer margin-top-md",children:n.jsx("button",{className:"btn-secondary",onClick:t,children:"Close"})})]}),n.jsx("style",{children:`
        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          z-index: 9999; padding: 20px;
        }
        .profile-card { width: 100%; max-width: 520px; background: #fff; border-radius: 16px; padding: 24px; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .avatar-badge { width: 42px; height: 42px; border-radius: 50%; background: #0d9488; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.1rem; }
        .close-btn { background: none; border: none; color: #94a3b8; cursor: pointer; }
        .section-title { font-size: 0.9rem; font-weight: 700; color: #0f172a; margin-bottom: 12px; }
        .info-row { display: flex; align-items: center; gap: 10px; font-size: 0.85rem; color: #334155; margin-bottom: 8px; }
        .whatsapp-pill { background: #dcfce7; color: #15803d; border-radius: 999px; padding: 2px 8px; font-size: 0.72rem; font-weight: 600; text-decoration: none; display: flex; align-items: center; gap: 4px; }
        .pets-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px; margin-top: 8px; }
        .pet-tile { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px; }
        .pet-tile-header { display: flex; items-center; gap: 8px; }
        .pet-icon { font-size: 1.4rem; }
        .pet-name { font-size: 0.85rem; display: block; }
        .pet-sub { color: #64748b; }
        .modal-footer { display: flex; justify-content: flex-end; }
        .margin-top-md { margin-top: 16px; }
        .margin-top-xs { margin-top: 6px; }
        .margin-bottom-sm { margin-bottom: 8px; }
        .flex-1 { flex: 1; }
      `})]})},Hf=()=>{const{clients:e,pets:t,setActiveDrawer:r}=B(),[s,l]=j.useState(""),[a,i]=j.useState(!1),[c,o]=j.useState(""),[p,h]=j.useState(null),x=Array.from(new Set(e.flatMap(v=>v.tags||[]))),m=e.filter(v=>{var f,d;const N=v.name.toLowerCase().includes(s.toLowerCase())||((f=v.phones)==null?void 0:f.some(g=>{var b;return(b=g.phone)==null?void 0:b.includes(s)})),S=c?(d=v.tags)==null?void 0:d.includes(c):!0;return N&&S}),u=()=>{const v=e.map(N=>{var S,f;return{ClientName:N.name,PrimaryPhone:((f=(S=N.phones)==null?void 0:S[0])==null?void 0:f.phone)||"",Source:N.source,Governorate:N.governorate,District:N.district,Street:N.street,CreatedDate:N.createdAt}});Ws(v,"petution_clients_export.csv")};return n.jsxs("div",{className:"clients-page",children:[n.jsxs("div",{className:"page-header",children:[n.jsxs("div",{children:[n.jsx("h2",{children:"Clients"}),n.jsx("p",{className:"text-muted",children:"Manage client records for clinic: petution."})]}),n.jsxs("div",{className:"flex gap-sm",children:[n.jsxs("button",{className:"btn-secondary",onClick:u,title:"Export Clients CSV",children:[n.jsx(kr,{size:16})," Export CSV"]}),n.jsxs("button",{className:"btn-secondary",onClick:()=>r("importClients"),title:"Import Clients CSV",children:[n.jsx(Sr,{size:16})," Import CSV"]}),n.jsxs("button",{className:"btn-primary",onClick:()=>r("addClient"),children:[n.jsx(rt,{size:18}),"Add Client"]})]})]}),n.jsxs("div",{className:"metrics-grid-4",children:[n.jsxs("div",{className:"card",children:[n.jsx("span",{className:"card-title",children:"Total Clients"}),n.jsx("div",{className:"card-value",children:e.length}),n.jsx("span",{className:"text-muted text-xs",children:"Current filtered clients"})]}),n.jsxs("div",{className:"card",children:[n.jsx("span",{className:"card-title",children:"New Clients This Month"}),n.jsx("div",{className:"card-value",children:e.length}),n.jsx("span",{className:"badge badge-teal",children:"~0%"})]}),n.jsxs("div",{className:"card",children:[n.jsx("span",{className:"card-title",children:"New Clients Today"}),n.jsx("div",{className:"card-value",children:"0"}),n.jsx("span",{className:"badge badge-teal",children:"~0%"})]}),n.jsxs("div",{className:"card",children:[n.jsx("span",{className:"card-title",children:"Clients With Pets"}),n.jsx("div",{className:"card-value",children:e.filter(v=>v.pets&&v.pets.length>0).length}),n.jsx("span",{className:"text-muted text-xs",children:"Owners with linked pets"})]})]}),n.jsxs("div",{className:"table-container",children:[n.jsxs("div",{className:"table-controls",children:[n.jsxs("div",{className:"search-input-wrapper",children:[n.jsx(br,{size:16,className:"search-icon"}),n.jsx("input",{type:"text",placeholder:"Search by name or phone",value:s,onChange:v=>l(v.target.value)})]}),n.jsxs("div",{style:{position:"relative"},children:[n.jsxs("button",{className:"btn-secondary",onClick:()=>i(!a),children:[n.jsx(Nf,{size:16}),"Filter tags ",c&&`(${c})`]}),a&&n.jsxs("div",{style:{position:"absolute",top:"100%",right:0,background:"white",border:"1px solid #ccc",padding:"10px",zIndex:10,minWidth:"150px",borderRadius:"4px",marginTop:"4px",boxShadow:"0 2px 5px rgba(0,0,0,0.1)"},children:[n.jsx("div",{style:{marginBottom:"8px",fontWeight:"bold"},children:"Select Tag"}),n.jsx("div",{style:{cursor:"pointer",padding:"4px"},onClick:()=>{o(""),i(!1)},children:"All Tags"}),x.map(v=>n.jsx("div",{style:{cursor:"pointer",padding:"4px",background:c===v?"#eee":"transparent",borderRadius:"4px"},onClick:()=>{o(v),i(!1)},children:v},v))]})]})]}),n.jsxs("table",{className:"data-table",children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{children:"Pet Owner Name"}),n.jsx("th",{children:"Primary Phone"}),n.jsx("th",{children:"Tags"}),n.jsx("th",{children:"Pets"}),n.jsx("th",{children:"Created"}),n.jsx("th",{children:"Actions"})]})}),n.jsx("tbody",{children:m.length===0?n.jsx("tr",{children:n.jsx("td",{colSpan:"6",className:"empty-state",children:"No clients found. Try changing search or tag filters."})}):m.map(v=>{var f,d,g;const N=((f=v.phones)==null?void 0:f.find(b=>b.isPrimary))||((d=v.phones)==null?void 0:d[0]),S=t.filter(b=>{var P,z;return((P=v.pets)==null?void 0:P.includes(b.id))||((z=b.owners)==null?void 0:z.includes(v.id))});return n.jsxs("tr",{children:[n.jsx("td",{className:"font-semibold",children:v.name}),n.jsx("td",{children:n.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"6px"},children:[n.jsx("span",{children:(N==null?void 0:N.phone)||"—"}),(N==null?void 0:N.hasWhatsapp)&&n.jsx(mi,{size:14,className:"text-green",title:"WhatsApp Enabled"})]})}),n.jsx("td",{children:n.jsx("div",{style:{display:"flex",gap:"4px",flexWrap:"wrap"},children:(g=v.tags)==null?void 0:g.map((b,P)=>n.jsx("span",{className:"badge badge-gray",children:b},P))})}),n.jsx("td",{children:S.length>0?S.map(b=>b.name).join(", "):n.jsx("span",{className:"text-muted",children:"No pets"})}),n.jsx("td",{className:"text-muted",children:v.createdAt}),n.jsx("td",{children:n.jsx("button",{className:"btn-secondary text-xs",onClick:()=>h(v),children:"View Profile"})})]},v.id)})})]})]}),p&&n.jsx(Bf,{client:p,onClose:()=>h(null)})]})},Wf=({pet:e,onClose:t})=>{var i,c;const{clients:r,settings:s}=B();if(!e)return null;const l=r.find(o=>{var p;return(p=e.owners)==null?void 0:p.includes(o.id)}),a=()=>{window.print()};return n.jsxs("div",{className:"modal-overlay",children:[n.jsxs("div",{className:"health-card-container",children:[n.jsxs("div",{className:"health-card-header",children:[n.jsxs("div",{className:"flex items-center gap-xs",children:[n.jsx("span",{style:{fontSize:"1.5rem"},children:"🐾"}),n.jsxs("div",{children:[n.jsx("h4",{style:{margin:0,color:"#0f172a"},children:(s==null?void 0:s.orgName)||"Petution Veterinary Center"}),n.jsx("span",{className:"text-muted text-xs",children:"Official Pet Medical Health Passport"})]})]}),n.jsxs("div",{className:"no-print flex gap-xs",children:[n.jsxs("button",{className:"btn-secondary text-xs",onClick:a,children:[n.jsx(fi,{size:14})," Print Card"]}),n.jsx("button",{className:"close-btn",onClick:t,children:n.jsx(me,{size:18})})]})]}),n.jsxs("div",{className:"health-card-body",children:[n.jsxs("div",{className:"pet-main-hero",children:[n.jsx("div",{className:"hero-emoji",children:e.species==="cat"?"🐱":"🐶"}),n.jsxs("div",{className:"hero-info",children:[n.jsx("h3",{children:e.name}),n.jsxs("span",{className:"badge badge-teal",children:[e.species.toUpperCase()," • ",e.breed||"Mixed"]}),n.jsxs("div",{className:"text-xs text-muted margin-top-xs",children:["Card #: ",n.jsx("strong",{children:e.cardNo||"CRD-9982"})," • Protocol: ",n.jsx("strong",{children:e.protocolNo||"PRT-102"})]})]})]}),n.jsxs("div",{className:"vitals-grid margin-top-md",children:[n.jsxs("div",{className:"vital-box",children:[n.jsx("span",{className:"vital-label",children:"Age & Gender"}),n.jsxs("strong",{className:"vital-val",children:[e.ageValue," ",e.ageUnit," • ",e.gender]})]}),n.jsxs("div",{className:"vital-box",children:[n.jsx("span",{className:"vital-label",children:"Blood Group"}),n.jsx("strong",{className:"vital-val text-teal",children:e.bloodGroup||"Unspecified"})]}),n.jsxs("div",{className:"vital-box",children:[n.jsx("span",{className:"vital-label",children:"Microchip ID"}),n.jsx("strong",{className:"vital-val font-mono",children:e.microchipNumber||"Not Microchipped"})]}),n.jsxs("div",{className:"vital-box",children:[n.jsx("span",{className:"vital-label",children:"Microchip Location"}),n.jsx("strong",{className:"vital-val",children:e.microchipLocation||"N/A"})]})]}),n.jsxs("div",{className:"indicators-row margin-top-md",children:[n.jsxs("div",{className:`indicator-pill ${e.vaccinated?"active":""}`,children:[n.jsx(Hs,{size:14})," Vaccinated: ",e.vaccinated?"Yes":"No"]}),n.jsxs("div",{className:`indicator-pill ${e.castrated?"active":""}`,children:[n.jsx(eu,{size:14})," Neutered: ",e.castrated?"Yes":"No"]}),n.jsxs("div",{className:`indicator-pill ${e.deworming?"active":""}`,children:[n.jsx(kf,{size:14})," Dewormed: ",e.deworming?"Yes":"No"]})]}),e.isAggressive&&n.jsxs("div",{className:"alert-box margin-top-md",children:[n.jsx($d,{size:16})," ",n.jsx("strong",{children:"Caution:"})," Aggressive Risk Patient — handle with care."]}),n.jsxs("div",{className:"owner-box card margin-top-md",children:[n.jsx("div",{className:"text-xs text-muted",children:"PET OWNER RECORD"}),n.jsx("strong",{style:{fontSize:"0.95rem"},children:l?l.name:"Unassigned Owner"}),n.jsx("div",{className:"text-xs text-muted",children:((c=(i=l==null?void 0:l.phones)==null?void 0:i[0])==null?void 0:c.phone)||"No phone"})]})]}),n.jsx("div",{className:"health-card-footer margin-top-md",children:n.jsx("button",{className:"btn-secondary no-print w-full",onClick:t,children:"Close Health Card"})})]}),n.jsx("style",{children:`
        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          z-index: 9999; padding: 20px;
        }
        .health-card-container {
          width: 100%; max-width: 480px; background: #ffffff;
          border-radius: 16px; padding: 24px; box-shadow: 0 25px 50px rgba(0,0,0,0.25);
        }
        .health-card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
        .close-btn { background: none; border: none; color: #94a3b8; cursor: pointer; }
        .pet-main-hero { display: flex; align-items: center; gap: 16px; background: #f0fdfa; border: 1px solid #ccfbf1; padding: 16px; border-radius: 12px; }
        .hero-emoji { font-size: 2.2rem; }
        .vitals-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .vital-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px; }
        .vital-label { font-size: 0.72rem; color: #64748b; display: block; }
        .vital-val { font-size: 0.85rem; color: #0f172a; margin-top: 2px; display: block; }
        .indicators-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .indicator-pill { display: flex; align-items: center; gap: 6px; background: #f1f5f9; color: #64748b; border-radius: 999px; padding: 4px 12px; font-size: 0.78rem; font-weight: 600; }
        .indicator-pill.active { background: #dcfce7; color: #15803d; }
        .alert-box { background: #fff1f2; border: 1px solid #fecdd3; color: #be123c; border-radius: 8px; padding: 10px 12px; font-size: 0.8rem; display: flex; align-items: center; gap: 8px; }
        .owner-box { padding: 12px; background: #f8fafc; }
        .margin-top-md { margin-top: 14px; }
        .margin-top-xs { margin-top: 4px; }
        .font-mono { font-family: monospace; }
        @media print { .no-print { display: none !important; } }
      `})]})},Gf=()=>{const{pets:e,clients:t,setActiveDrawer:r,setActiveModalItem:s}=B(),[l,a]=j.useState(""),[i,c]=j.useState("All"),[o,p]=j.useState(null),h=["All","Cat","Dog","Turtle","Bird","Other"],x=e.filter(u=>{const v=u.name.toLowerCase().includes(l.toLowerCase())||u.microchipNumber&&u.microchipNumber.includes(l)||u.cardNo&&u.cardNo.toLowerCase().includes(l.toLowerCase()),N=i==="All"||u.species.toLowerCase()===i.toLowerCase();return v&&N}),m=()=>{const u=e.map(v=>{const N=t.find(S=>{var f;return(f=v.owners)==null?void 0:f.includes(S.id)});return{PetName:v.name,Species:v.species,Breed:v.breed||"",Color:v.color||"",Age:`${v.ageValue} ${v.ageUnit}`,BloodGroup:v.bloodGroup||"Unspecified",MicrochipNumber:v.microchipNumber||"",MicrochipDate:v.microchipDate||"",MicrochipLocation:v.microchipLocation||"",CardNo:v.cardNo||"",ProtocolNo:v.protocolNo||"",Vaccinated:v.vaccinated?"Yes":"No",Deworming:v.deworming?"Yes":"No",Antiflea:v.antiflea?"Yes":"No",Neutered:v.castrated?"Yes":"No",NeuteredDate:v.neuterDate||"",Aggressive:v.isAggressive?"Yes":"No",Deceased:v.isDeceased?"Yes":"No",DeathDate:v.deathDate||"",OwnerName:N?N.name:"Unassigned",CreatedDate:v.createdAt}});Ws(u,"petution_pets_export.csv")};return n.jsxs("div",{className:"pets-page",children:[n.jsxs("div",{className:"page-header",children:[n.jsxs("div",{children:[n.jsx("h2",{children:"Pets"}),n.jsx("p",{className:"text-muted",children:"Manage patient profiles, microchip records, and health cards."})]}),n.jsxs("div",{className:"flex gap-sm",children:[n.jsxs("button",{className:"btn-secondary",onClick:m,title:"Export Pets CSV",children:[n.jsx(kr,{size:16})," Export CSV"]}),n.jsxs("button",{className:"btn-secondary",onClick:()=>r("importPets"),title:"Import Pets CSV",children:[n.jsx(Sr,{size:16})," Import CSV"]}),n.jsxs("button",{className:"btn-primary",onClick:()=>r("addPet"),children:[n.jsx(rt,{size:18}),"Add Pet"]})]})]}),n.jsxs("div",{className:"metrics-grid-4 margin-bottom-lg",children:[n.jsxs("div",{className:"card",children:[n.jsx("span",{className:"card-title",children:"Total Pets Registered"}),n.jsx("div",{className:"card-value",children:e.length}),n.jsx("span",{className:"text-muted text-xs",children:"Patients in database"})]}),n.jsxs("div",{className:"card",children:[n.jsx("span",{className:"card-title",children:"Microchipped Patients"}),n.jsx("div",{className:"card-value",children:e.filter(u=>u.microchipNumber).length}),n.jsxs("span",{className:"badge badge-teal",children:[e.length?Math.round(e.filter(u=>u.microchipNumber).length/e.length*100):0,"% chipped"]})]}),n.jsxs("div",{className:"card",children:[n.jsx("span",{className:"card-title",children:"High Risk / Aggressive"}),n.jsx("div",{className:"card-value text-rose",children:e.filter(u=>u.isAggressive).length}),n.jsx("span",{className:"text-muted text-xs",children:"Caution flag required"})]}),n.jsxs("div",{className:"card",children:[n.jsx("span",{className:"card-title",children:"Neutered / Spayed"}),n.jsx("div",{className:"card-value",children:e.filter(u=>u.castrated).length}),n.jsx("span",{className:"text-muted text-xs",children:"Sterilization complete"})]})]}),n.jsxs("div",{className:"table-container",children:[n.jsxs("div",{className:"table-controls-stack",children:[n.jsxs("div",{className:"search-input-wrapper",children:[n.jsx(br,{size:16,className:"search-icon"}),n.jsx("input",{type:"text",placeholder:"Search by name, microchip #, or card #",value:l,onChange:u=>a(u.target.value)})]}),n.jsx("div",{className:"flex gap-xs",style:{overflowX:"auto",paddingBottom:"4px"},children:h.map(u=>n.jsx("button",{className:`btn-chip ${i===u?"active":""}`,onClick:()=>c(u),children:u},u))})]}),n.jsxs("table",{className:"data-table",children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{children:"Pet Name"}),n.jsx("th",{children:"Owner Name"}),n.jsx("th",{children:"Species & Breed"}),n.jsx("th",{children:"Microchip / Identification"}),n.jsx("th",{children:"Health & Flags"}),n.jsx("th",{children:"Actions"})]})}),n.jsx("tbody",{children:x.length===0?n.jsx("tr",{children:n.jsx("td",{colSpan:"6",className:"empty-state",children:"No pets found. Try changing filters or search."})}):x.map(u=>{const v=t.find(N=>{var S;return(S=u.owners)==null?void 0:S.includes(N.id)});return n.jsxs("tr",{className:u.isDeceased?"row-deceased":"",children:[n.jsx("td",{children:n.jsxs("div",{className:"flex flex-col",children:[n.jsxs("span",{className:"font-semibold flex items-center gap-xs",children:[u.name,u.isDeceased&&n.jsxs("span",{className:"badge badge-rose text-xs",children:[n.jsx(qd,{size:12})," Deceased"]})]}),n.jsxs("span",{className:"text-xs text-muted",children:[u.ageValue," ",u.ageUnit," • ",u.gender]})]})}),n.jsx("td",{children:v?v.name:n.jsx("span",{className:"text-muted",children:"Unassigned"})}),n.jsxs("td",{children:[n.jsx("span",{className:"badge badge-teal",children:u.species.toUpperCase()}),u.breed&&n.jsxs("span",{className:"text-muted text-xs margin-left-xs",children:["(",u.breed,")"]})]}),n.jsxs("td",{children:[u.microchipNumber?n.jsxs("div",{className:"flex items-center gap-xs text-xs font-mono",children:[n.jsx(Wd,{size:14,className:"text-teal"}),n.jsx("span",{children:u.microchipNumber})]}):n.jsx("span",{className:"text-muted text-xs",children:"No microchip"}),u.cardNo&&n.jsxs("div",{className:"text-xs text-muted",children:["Card: ",u.cardNo]})]}),n.jsx("td",{children:n.jsxs("div",{className:"flex gap-xs flex-wrap",children:[u.isAggressive&&n.jsxs("span",{className:"badge badge-rose text-xs font-bold",title:"High Risk - Handle with Caution",children:[n.jsx(Xd,{size:12})," Aggressive"]}),u.vaccinated&&n.jsx("span",{className:"badge badge-gray text-xs",children:"Vaccinated"}),u.castrated&&n.jsx("span",{className:"badge badge-gray text-xs",children:"Neutered"}),u.bloodGroup&&u.bloodGroup!=="Unspecified"&&n.jsxs("span",{className:"badge badge-teal text-xs",children:["Blood: ",u.bloodGroup]})]})}),n.jsx("td",{children:n.jsxs("div",{className:"flex gap-xs",children:[n.jsxs("button",{className:"btn-secondary text-xs flex items-center gap-xs",onClick:()=>{s(u.id),r("petPassport")},children:[n.jsx(Hs,{size:14,className:"text-teal"})," Passport"]}),n.jsx("button",{className:"btn-secondary text-xs",onClick:()=>p(u),children:"Health Card"})]})})]},u.id)})})]})]}),n.jsx("style",{children:`
        .margin-left-xs { margin-left: 6px; }
        .text-rose { color: #e11d48; }
        .badge-rose { background: #ffe4e6; color: #e11d48; border: 1px solid #fecdd3; }
        .row-deceased { opacity: 0.65; background: #fafafa; }
      `}),o&&n.jsx(Wf,{pet:o,onClose:()=>p(null)})]})},qf=({visit:e,onClose:t})=>{const{pets:r,visits:s,setVisits:l,setActiveDrawer:a,setActiveModalItem:i}=B(),[c,o]=j.useState((e==null?void 0:e.state)||"scheduled"),[p,h]=j.useState((e==null?void 0:e.doctorName)||"Dr. Khaled ElGendy"),[x,m]=j.useState((e==null?void 0:e.reason)||"");if(!e)return null;const u=r.find(N=>N.id===e.petId),v=N=>{N.preventDefault(),l(S=>S.map(f=>f.id===e.id?{...f,state:c,doctorName:p,reason:x}:f)),t()};return n.jsxs("div",{className:"modal-overlay",children:[n.jsxs("div",{className:"modal-card",children:[n.jsxs("div",{className:"modal-header",children:[n.jsxs("div",{children:[n.jsx("h4",{style:{margin:0},children:"Visit Details & Status"}),n.jsxs("span",{className:"text-muted text-xs",children:["Visit ID: ",e.id]})]}),n.jsx("button",{className:"close-btn",onClick:t,children:n.jsx(me,{size:18})})]}),n.jsxs("form",{onSubmit:v,className:"modal-body",children:[n.jsxs("div",{className:"pet-info-box card margin-bottom-md flex items-center gap-sm",children:[n.jsx("span",{style:{fontSize:"1.8rem"},children:(u==null?void 0:u.species)==="cat"?"🐱":"🐶"}),n.jsxs("div",{children:[n.jsx("strong",{style:{fontSize:"0.95rem"},children:u?u.name:"Patient Pet"}),n.jsxs("div",{className:"text-muted text-xs",children:[(u==null?void 0:u.breed)||"Species"," • ",e.visitType]})]})]}),n.jsxs("div",{className:"form-group margin-bottom-sm",children:[n.jsx("label",{children:"Visit Status"}),n.jsxs("select",{className:"form-control",value:c,onChange:N=>o(N.target.value),children:[n.jsx("option",{value:"scheduled",children:"Scheduled"}),n.jsx("option",{value:"in-progress",children:"In Progress"}),n.jsx("option",{value:"completed",children:"Completed"}),n.jsx("option",{value:"cancelled",children:"Cancelled"})]})]}),n.jsxs("div",{className:"form-group margin-bottom-sm",children:[n.jsx("label",{children:"Attending Veterinarian"}),n.jsx("input",{type:"text",className:"form-control",value:p,onChange:N=>h(N.target.value),required:!0})]}),n.jsxs("div",{className:"form-group margin-bottom-sm",children:[n.jsx("label",{children:"Reason / Clinical Notes"}),n.jsx("textarea",{className:"form-control",rows:"3",value:x,onChange:N=>m(N.target.value),placeholder:"Primary reason for visit..."})]}),n.jsxs("div",{className:"modal-actions-row margin-top-md",children:[n.jsxs("button",{type:"button",className:"btn-secondary text-xs flex items-center gap-xs",onClick:()=>{t(),i(e.id),a("soapNote")},children:[n.jsx(pi,{size:14,className:"text-teal"})," Open SOAP Note & Rx"]}),n.jsxs("div",{className:"flex gap-xs",children:[n.jsx("button",{type:"button",className:"btn-secondary",onClick:t,children:"Cancel"}),n.jsx("button",{type:"submit",className:"btn-primary",children:"Save Changes"})]})]})]})]}),n.jsx("style",{children:`
        .modal-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(4px);
          display: flex; align-items: center; justify-content: center;
          z-index: 9999; padding: 20px;
        }
        .modal-card { width: 100%; max-width: 440px; background: #ffffff; border-radius: 16px; padding: 24px; }
        .modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
        .close-btn { background: none; border: none; color: #94a3b8; cursor: pointer; }
        .pet-info-box { padding: 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; }
        .modal-actions-row { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 16px; }
        .margin-bottom-sm { margin-bottom: 12px; }
        .margin-bottom-md { margin-bottom: 16px; }
        .margin-top-md { margin-top: 16px; }
      `})]})},Qf=()=>{const{visits:e,pets:t,setActiveDrawer:r,setActiveModalItem:s}=B(),[l,a]=j.useState("all"),[i,c]=j.useState(""),[o,p]=j.useState(""),[h,x]=j.useState(null),m=e.filter(u=>!(l!=="all"&&u.state!==l||i&&u.date<i||o&&u.date>o));return n.jsxs("div",{className:"visits-page",children:[n.jsxs("div",{className:"page-header",children:[n.jsxs("div",{children:[n.jsx("h2",{children:"Visits"}),n.jsx("p",{className:"text-muted",children:"Track visit queue, progress, and outcomes for clinic: petution."})]}),n.jsxs("button",{className:"btn-primary",onClick:()=>r("addVisit"),children:[n.jsx(rt,{size:18}),"Add Visit"]})]}),n.jsxs("div",{className:"metrics-grid-4",children:[n.jsxs("div",{className:"card",children:[n.jsx("span",{className:"card-title",children:"Total Visits"}),n.jsx("div",{className:"card-value",children:e.length}),n.jsx("span",{className:"text-muted text-xs",children:"All visits in this clinic"})]}),n.jsxs("div",{className:"card",children:[n.jsx("span",{className:"card-title",children:"New Visits This Month"}),n.jsx("div",{className:"card-value",children:e.length}),n.jsx("span",{className:"text-muted text-xs",children:"Created this calendar month"})]}),n.jsxs("div",{className:"card",children:[n.jsx("span",{className:"card-title",children:"Completed Visits Today"}),n.jsx("div",{className:"card-value",children:e.filter(u=>u.state==="completed").length}),n.jsx("span",{className:"text-muted text-xs",children:"Resets daily at 12:00 AM"})]}),n.jsxs("div",{className:"card",children:[n.jsx("span",{className:"card-title",children:"Upcoming Visits"}),n.jsx("div",{className:"card-value",children:e.filter(u=>u.state==="scheduled").length}),n.jsx("span",{className:"badge badge-teal",children:"Scheduled"})]})]}),n.jsxs("div",{className:"card info-box margin-bottom-md",children:[n.jsx("h4",{className:"font-semibold",children:"Online Booking Confirmations"}),n.jsx("p",{className:"text-muted text-xs",children:"Review pending online bookings and confirm or reject them."}),n.jsx("div",{className:"empty-subtext",children:"No pending online booking confirmations."})]}),n.jsxs("div",{className:"table-container",children:[n.jsxs("div",{className:"filter-bar",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Filter by state"}),n.jsxs("select",{className:"form-control",value:l,onChange:u=>a(u.target.value),children:[n.jsx("option",{value:"all",children:"all"}),n.jsx("option",{value:"scheduled",children:"scheduled"}),n.jsx("option",{value:"in-progress",children:"in-progress"}),n.jsx("option",{value:"completed",children:"completed"}),n.jsx("option",{value:"cancelled",children:"cancelled"})]})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"From date"}),n.jsx("input",{type:"date",className:"form-control",value:i,onChange:u=>c(u.target.value)})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"To date"}),n.jsx("input",{type:"date",className:"form-control",value:o,onChange:u=>p(u.target.value)})]}),n.jsx("button",{className:"btn-secondary self-end",onClick:()=>{a("all"),c(""),p("")},children:"Clear filters"})]}),n.jsxs("table",{className:"data-table",children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{children:"Visit Date"}),n.jsx("th",{children:"Pet Name"}),n.jsx("th",{children:"Doctor Name"}),n.jsx("th",{children:"Visit Type"}),n.jsx("th",{children:"Visit State"}),n.jsx("th",{children:"Actions"})]})}),n.jsx("tbody",{children:m.length===0?n.jsx("tr",{children:n.jsx("td",{colSpan:"6",className:"empty-state",children:"No visits found. Create a visit to start managing clinic queue."})}):m.map(u=>{const v=t.find(N=>N.id===u.petId);return n.jsxs("tr",{children:[n.jsxs("td",{children:[u.date," ",u.time]}),n.jsx("td",{className:"font-semibold",children:v?v.name:"Unknown Pet"}),n.jsx("td",{children:u.doctorName}),n.jsx("td",{children:u.visitType}),n.jsx("td",{children:n.jsx("span",{className:`badge ${u.state==="scheduled"?"badge-teal":u.state==="in-progress"?"badge-amber":u.state==="completed"?"badge-gray":"badge-rose"}`,children:u.state})}),n.jsx("td",{children:n.jsxs("div",{className:"flex gap-xs",children:[n.jsxs("button",{className:"btn-secondary text-xs flex items-center gap-xs",onClick:()=>{s(u.id),r("soapNote")},children:[n.jsx(pi,{size:14,className:"text-teal"})," SOAP / Rx"]}),n.jsx("button",{className:"btn-secondary text-xs",onClick:()=>x(u),children:"Manage Visit"})]})})]},u.id)})})]})]}),n.jsx("style",{children:`
        .margin-bottom-md { margin-bottom: 24px; }
        .info-box { padding: 16px 20px; }
        .empty-subtext { font-size: 0.85rem; color: var(--text-muted); margin-top: 8px; }
        .filter-bar {
          padding: 16px 20px;
          border-bottom: 1px solid var(--border-card);
          display: flex;
          gap: 16px;
          align-items: flex-end;
        }
        .self-end { align-self: flex-end; }
      `}),h&&n.jsx(qf,{visit:h,onClose:()=>x(null)})]})},Kf=()=>{const{invoices:e,pets:t,setActiveDrawer:r}=B(),[s,l]=j.useState("all"),[a,i]=j.useState(""),[c,o]=j.useState(""),p=e.filter(h=>!(s!=="all"&&h.status!==s||a&&h.createdAt<a||c&&h.createdAt>c));return n.jsxs("div",{className:"invoices-page",children:[n.jsxs("div",{className:"page-header",children:[n.jsxs("div",{children:[n.jsx("h2",{children:"Invoices"}),n.jsx("p",{className:"text-muted",children:"Manage billing and invoice states for clinic: petution."})]}),n.jsx("div",{className:"flex gap-sm",children:n.jsxs("button",{className:"btn-primary",onClick:()=>r("addInvoice"),children:[n.jsx(rt,{size:18}),"Add Invoice"]})})]}),n.jsxs("div",{className:"table-container",children:[n.jsxs("div",{className:"filter-bar",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Filter by state"}),n.jsxs("select",{className:"form-control",value:s,onChange:h=>l(h.target.value),children:[n.jsx("option",{value:"all",children:"all"}),n.jsx("option",{value:"pending",children:"pending"}),n.jsx("option",{value:"paid",children:"paid"}),n.jsx("option",{value:"cancelled",children:"cancelled"})]})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"From date"}),n.jsx("input",{type:"date",className:"form-control",value:a,onChange:h=>i(h.target.value)})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"To date"}),n.jsx("input",{type:"date",className:"form-control",value:c,onChange:h=>o(h.target.value)})]}),n.jsx("button",{className:"btn-secondary self-end",onClick:()=>{l("all"),i(""),o("")},children:"Clear filters"})]}),n.jsxs("table",{className:"data-table",children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{children:"Pet Name"}),n.jsx("th",{children:"Amount"}),n.jsx("th",{children:"Creation Date"}),n.jsx("th",{children:"Status"}),n.jsx("th",{children:"Actions"})]})}),n.jsx("tbody",{children:p.length===0?n.jsx("tr",{children:n.jsx("td",{colSpan:"5",className:"empty-state",children:"No invoices found. Create invoices from visits to start billing."})}):p.map(h=>{const x=t.find(m=>m.id===h.petId);return n.jsxs("tr",{children:[n.jsx("td",{className:"font-semibold",children:x?x.name:"General Client"}),n.jsxs("td",{className:"font-bold",children:[h.totalAmount," EGP"]}),n.jsx("td",{className:"text-muted",children:h.createdAt}),n.jsx("td",{children:n.jsx("span",{className:`badge ${h.status==="paid"?"badge-teal":h.status==="pending"?"badge-amber":"badge-rose"}`,children:h.status})}),n.jsx("td",{children:n.jsx("button",{className:"btn-secondary text-xs",onClick:()=>{window.open("","_blank").document.write(`<html><head><title>Receipt - Petution Clinic</title></head><body style="font-family:sans-serif;padding:30px;"><h2>Petution Clinic Receipt</h2><p>Invoice ID: ${h.id}</p><p>Pet: ${x?x.name:"Client"}</p><h3>Total Amount: ${h.totalAmount} EGP</h3><p>Status: ${h.status.toUpperCase()}</p><button onclick="window.print()">Print</button></body></html>`)},children:"Print Receipt"})})]},h.id)})})]})]})]})},Jf=()=>{const{expenses:e,deleteExpense:t,setActiveDrawer:r}=B(),[s,l]=j.useState(""),[a,i]=j.useState("All"),c=["All","Supplies","Utilities","Rent","Salaries","Equipment Maintenance","Marketing & Ads","Licenses & Taxes","Other"],o=e.filter(u=>{const v=u.title.toLowerCase().includes(s.toLowerCase())||u.vendor&&u.vendor.toLowerCase().includes(s.toLowerCase()),N=a==="All"||u.category===a;return v&&N}),p=e.reduce((u,v)=>u+(Number(v.amount)||0),0),h=new Date().toISOString().substring(0,7),x=e.filter(u=>u.date&&u.date.startsWith(h)).reduce((u,v)=>u+(Number(v.amount)||0),0),m=()=>{const u=e.map(v=>({Title:v.title,Vendor:v.vendor||"",Category:v.category,Amount:v.amount,Date:v.date,PaymentMethod:v.paymentMethod,Notes:v.notes||""}));Ws(u,"petution_expenses_export.csv")};return n.jsxs("div",{className:"expenses-page",children:[n.jsxs("div",{className:"page-header",children:[n.jsxs("div",{children:[n.jsx("h2",{children:"Clinic Expenses"}),n.jsx("p",{className:"text-muted",children:"Track operational costs, medical supplies orders, utilities, and vendor payouts."})]}),n.jsxs("div",{className:"flex gap-sm",children:[n.jsxs("button",{className:"btn-secondary",onClick:m,title:"Export Expenses CSV",children:[n.jsx(kr,{size:16})," Export CSV"]}),n.jsxs("button",{className:"btn-primary",onClick:()=>r("addExpense"),children:[n.jsx(rt,{size:18}),"Record Expense"]})]})]}),n.jsxs("div",{className:"metrics-grid-4 margin-bottom-lg",children:[n.jsxs("div",{className:"card",children:[n.jsx("span",{className:"card-title",children:"Total Recorded Expenses"}),n.jsxs("div",{className:"card-value font-bold text-rose",children:[p.toLocaleString()," EGP"]}),n.jsx("span",{className:"text-muted text-xs",children:"All-time operational cost"})]}),n.jsxs("div",{className:"card",children:[n.jsx("span",{className:"card-title",children:"Expenses This Month"}),n.jsxs("div",{className:"card-value font-bold",children:[x.toLocaleString()," EGP"]}),n.jsx("span",{className:"badge badge-amber",children:"Current Month"})]}),n.jsxs("div",{className:"card",children:[n.jsx("span",{className:"card-title",children:"Total Records"}),n.jsx("div",{className:"card-value",children:e.length}),n.jsx("span",{className:"text-muted text-xs",children:"Individual expense items"})]}),n.jsxs("div",{className:"card",children:[n.jsx("span",{className:"card-title",children:"Top Category"}),n.jsx("div",{className:"card-value text-base font-bold",children:e.length>0?e[0].category:"None"}),n.jsx("span",{className:"text-muted text-xs",children:"Primary cost driver"})]})]}),n.jsxs("div",{className:"table-container",children:[n.jsxs("div",{className:"table-controls-stack",children:[n.jsxs("div",{className:"search-input-wrapper",children:[n.jsx(br,{size:16,className:"search-icon"}),n.jsx("input",{type:"text",placeholder:"Search by expense title or vendor name...",value:s,onChange:u=>l(u.target.value)})]}),n.jsx("div",{className:"flex gap-xs",style:{overflowX:"auto",paddingBottom:"4px"},children:c.map(u=>n.jsx("button",{className:`btn-chip ${a===u?"active":""}`,onClick:()=>i(u),children:u},u))})]}),n.jsxs("table",{className:"data-table",children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{children:"Expense / Item"}),n.jsx("th",{children:"Vendor / Supplier"}),n.jsx("th",{children:"Category"}),n.jsx("th",{children:"Amount"}),n.jsx("th",{children:"Date & Method"}),n.jsx("th",{children:"Actions"})]})}),n.jsx("tbody",{children:o.length===0?n.jsx("tr",{children:n.jsx("td",{colSpan:"6",className:"empty-state",children:"No expense records found matching your filters."})}):o.map(u=>n.jsxs("tr",{children:[n.jsxs("td",{className:"font-semibold",children:[n.jsx("div",{children:u.title}),u.notes&&n.jsx("div",{className:"text-xs text-muted font-normal",children:u.notes})]}),n.jsx("td",{children:u.vendor||n.jsx("span",{className:"text-muted",children:"—"})}),n.jsx("td",{children:n.jsx("span",{className:"badge badge-teal",children:u.category})}),n.jsxs("td",{className:"font-bold text-rose",children:[u.amount.toLocaleString()," EGP"]}),n.jsxs("td",{children:[n.jsx("div",{className:"text-xs font-semibold",children:u.date}),n.jsx("div",{className:"text-xs text-muted",children:u.paymentMethod})]}),n.jsx("td",{children:n.jsx("button",{className:"icon-btn text-rose",title:"Delete Expense",onClick:()=>{confirm(`Are you sure you want to delete expense "${u.title}"?`)&&t(u.id)},children:n.jsx(Xt,{size:16})})})]},u.id))})]})]}),n.jsx("style",{children:`
        .text-rose { color: #e11d48; }
        .text-base { font-size: 1.1rem; }
        .badge-amber { background: #fef3c7; color: #d97706; border: 1px solid #fde68a; }
      `})]})},Yf=()=>{const{products:e,stockLogs:t,setActiveDrawer:r,setActiveModalItem:s}=B(),[l,a]=j.useState("products"),[i,c]=j.useState(""),o=e.filter(m=>{const u=m.name.toLowerCase().includes(i.toLowerCase()),v=l==="products"?m.type==="product":m.type==="service";return u&&v}),p=()=>{const m=e.map(u=>({ItemName:u.name,Type:u.type,UnitType:u.unitType,PricingUnit:u.pricingUnit,Quantity:u.quantity,PricePerUnit:u.pricePerUnit,CostPerUnit:u.costPerUnit,AlertThreshold:u.alertThreshold}));Ws(m,"petution_products_export.csv")},h=()=>{s(null),r("addItem")},x=m=>{s(m),r("addItem")};return n.jsxs("div",{className:"products-page",children:[n.jsxs("div",{className:"page-header",children:[n.jsxs("div",{children:[n.jsx("h2",{children:"Products & Services"}),n.jsx("p",{className:"text-muted",children:"Manage clinic inventory and billable services for clinic."})]}),n.jsxs("div",{className:"flex gap-sm",children:[n.jsxs("button",{className:"btn-secondary",onClick:p,title:"Export Products CSV",children:[n.jsx(kr,{size:16})," Export CSV"]}),n.jsxs("button",{className:"btn-secondary",onClick:()=>r("importProducts"),title:"Import Products CSV",children:[n.jsx(Sr,{size:16})," Import CSV"]}),n.jsxs("button",{className:"btn-primary",onClick:h,children:[n.jsx(rt,{size:18}),"Add Item"]})]})]}),n.jsxs("div",{className:"metrics-grid-4",children:[n.jsxs("div",{className:"card",children:[n.jsx("span",{className:"card-title",children:"Total Products"}),n.jsx("div",{className:"card-value",children:e.filter(m=>m.type==="product").length}),n.jsx("span",{className:"text-muted text-xs",children:"Inventory items with stock tracking"})]}),n.jsxs("div",{className:"card",children:[n.jsx("span",{className:"card-title",children:"Total Services"}),n.jsx("div",{className:"card-value",children:e.filter(m=>m.type==="service").length}),n.jsx("span",{className:"text-muted text-xs",children:"Billable service definitions"})]})]}),n.jsxs("div",{className:"table-container",children:[n.jsxs("div",{className:"table-controls-stack",children:[l!=="logs"&&n.jsxs("div",{className:"search-input-wrapper",children:[n.jsx(br,{size:16,className:"search-icon"}),n.jsx("input",{type:"text",placeholder:`Search ${l} by name`,value:i,onChange:m=>c(m.target.value)})]}),n.jsxs("div",{className:"tab-nav",children:[n.jsxs("button",{className:`tab-btn ${l==="products"?"active":""}`,onClick:()=>a("products"),children:["Products (",e.filter(m=>m.type==="product").length,")"]}),n.jsxs("button",{className:`tab-btn ${l==="services"?"active":""}`,onClick:()=>a("services"),children:["Services (",e.filter(m=>m.type==="service").length,")"]}),n.jsxs("button",{className:`tab-btn ${l==="logs"?"active":""}`,onClick:()=>a("logs"),children:["Stock Logs (",t.length,")"]})]})]}),l==="logs"?n.jsxs("table",{className:"data-table",children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{children:"Item Name"}),n.jsx("th",{children:"Stock Change"}),n.jsx("th",{children:"Logged By"}),n.jsx("th",{children:"Date"})]})}),n.jsx("tbody",{children:t.length===0?n.jsx("tr",{children:n.jsx("td",{colSpan:"4",className:"empty-state",children:"No recent stock logs recorded."})}):t.map(m=>n.jsxs("tr",{children:[n.jsx("td",{className:"font-semibold",children:m.itemName}),n.jsx("td",{children:n.jsx("span",{className:"badge badge-teal",children:m.change})}),n.jsx("td",{children:m.user}),n.jsx("td",{className:"text-muted",children:m.date})]},m.id))})]}):l==="services"?n.jsxs("table",{className:"data-table",children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{children:"Service Name"}),n.jsx("th",{children:"Unit Type"}),n.jsx("th",{children:"Pricing Unit"}),n.jsx("th",{children:"Price per Session"}),n.jsx("th",{children:"Cost per Session"}),n.jsx("th",{children:"Revenue per Session"}),n.jsx("th",{children:"Notes"}),n.jsx("th",{children:"Actions"})]})}),n.jsx("tbody",{children:o.length===0?n.jsx("tr",{children:n.jsx("td",{colSpan:"8",className:"empty-state",children:'No services created yet. Click "+ Add Item" above to add a service.'})}):o.map(m=>n.jsxs("tr",{children:[n.jsx("td",{className:"font-semibold",children:m.name}),n.jsx("td",{children:m.unitType}),n.jsx("td",{children:m.pricingUnit}),n.jsxs("td",{className:"font-bold",children:[m.pricePerUnit," EGP"]}),n.jsxs("td",{children:[m.costPerUnit," EGP"]}),n.jsxs("td",{children:[m.revenuePerUnit," EGP"]}),n.jsx("td",{className:"text-muted",children:m.notes||"—"}),n.jsx("td",{children:n.jsx("button",{className:"btn-secondary text-xs",onClick:()=>x(m),children:"Edit"})})]},m.id))})]}):n.jsxs("table",{className:"data-table",children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{children:"Item Name"}),n.jsx("th",{children:"Unit Type"}),n.jsx("th",{children:"Pricing Unit"}),n.jsx("th",{children:"Stock Quantity"}),n.jsx("th",{children:"Price per Unit"}),n.jsx("th",{children:"Cost per Unit"}),n.jsx("th",{children:"Revenue per Unit"}),n.jsx("th",{children:"Alert Threshold"}),n.jsx("th",{children:"Actions"})]})}),n.jsx("tbody",{children:o.length===0?n.jsx("tr",{children:n.jsx("td",{colSpan:"9",className:"empty-state",children:"No products found."})}):o.map(m=>n.jsxs("tr",{children:[n.jsx("td",{className:"font-semibold",children:m.name}),n.jsx("td",{children:m.unitType}),n.jsx("td",{children:m.pricingUnit}),n.jsx("td",{children:n.jsx("span",{className:`font-bold ${m.quantity<=m.alertThreshold?"text-red":""}`,children:m.quantity})}),n.jsxs("td",{children:[m.pricePerUnit," EGP"]}),n.jsxs("td",{children:[m.costPerUnit," EGP"]}),n.jsxs("td",{children:[m.revenuePerUnit," EGP"]}),n.jsx("td",{children:m.alertThreshold}),n.jsx("td",{children:n.jsx("button",{className:"btn-secondary text-xs",onClick:()=>x(m),children:"Edit"})})]},m.id))})]})]}),n.jsx("style",{children:`
        .text-red { color: #dc2626; font-weight: 700; }
      `})]})},Zf=()=>{const{visits:e,clients:t,pets:r,invoices:s,expenses:l=[]}=B(),[a,i]=j.useState("all"),[c,o]=j.useState("Last 3 months"),p=new Date;let h=new Date;c==="Last 3 months"?h.setMonth(p.getMonth()-3):c==="This month"?h.setDate(1):c==="Year to date"&&h.setMonth(0,1);const x={month:"short",day:"numeric",year:"numeric"},m=`${h.toLocaleDateString("en-US",x)} - ${p.toLocaleDateString("en-US",x)}`,u=w=>w?new Date(w)>=h:!1,v=e.filter(w=>{var R;const C=u(w.date||w.createdAt),V=a==="all"||((R=w.doctorName)==null?void 0:R.toLowerCase().includes(a.toLowerCase()));return C&&V}),N=t.filter(w=>u(w.createdAt)),S=r.filter(w=>u(w.createdAt)),f=s.filter(w=>u(w.createdAt)),d=l.filter(w=>u(w.date)),g=f.filter(w=>w.status==="paid").reduce((w,C)=>w+C.totalAmount,0),b=d.reduce((w,C)=>w+(Number(C.amount)||0),0),P=g-b,z=[{title:"Net revenue",value:`${g} EGP`,sub:"Collected payments after refunds"},{title:"Total visits",value:v.length,sub:"All visits scheduled in the selected period"},{title:"Completion rate",value:"0%",sub:"Completed visits divided by total visits"},{title:"New clients",value:N.length,sub:"Clients created during this period"},{title:"Total clients",value:t.length,sub:"Client base available at end of period"},{title:"Total Expenses",value:`${b} EGP`,sub:"Operational costs & supplier bills"},{title:"Profit estimate",value:`${P} EGP`,sub:"Net revenue minus operational expenses"},{title:"Canceled visits",value:0,sub:"Visits canceled in the period"},{title:"New pets",value:S.length,sub:"Pets created during this period"},{title:"Services sold",value:0,sub:"Total service units added to invoices"},{title:"Returning clients",value:0,sub:"Clients with more than one visit"},{title:"Reopen rate",value:"0%",sub:"Visits reopened after completion"},{title:"Avg revenue per visit",value:"0 EGP",sub:"Net revenue per completed visit"},{title:"Avg time to start",value:"0m",sub:"Average minutes from check-in to start"},{title:"Avg time to complete",value:"0m",sub:"Average minutes from start to completion"},{title:"Average rating",value:"N/A",sub:"Client visit rating average"},{title:"Ratings volume",value:0,sub:"Number of ratings received"},{title:"Rating comment rate",value:"0%",sub:"Ratings that included written comment"}];return n.jsxs("div",{className:"analytics-page",children:[n.jsxs("div",{className:"page-header",children:[n.jsxs("div",{children:[n.jsx("h2",{children:"Analytics"}),n.jsx("p",{className:"text-muted",children:"Useful clinic analytics across clients, visits, revenue, operations, and doctors."})]}),n.jsxs("div",{className:"flex gap-sm",style:{flexWrap:"wrap"},children:[n.jsxs("select",{className:"form-control",value:a,onChange:w=>i(w.target.value),children:[n.jsx("option",{value:"all",children:"Doctor: all"}),n.jsx("option",{value:"khaled",children:"Dr. Khaled ElGendy"})]}),n.jsxs("select",{className:"form-control",value:c,onChange:w=>o(w.target.value),children:[n.jsx("option",{value:"Last 3 months",children:"Last 3 months"}),n.jsx("option",{value:"This month",children:"This month"}),n.jsx("option",{value:"Year to date",children:"Year to date"})]})]})]}),n.jsxs("div",{className:"card summary-banner margin-bottom-lg",children:[n.jsx("span",{className:"text-muted text-xs font-semibold",children:m}),n.jsxs("div",{className:"banner-metrics-row",children:[n.jsxs("div",{children:[n.jsx("span",{className:"card-title",children:"Net revenue"}),n.jsxs("div",{className:"card-value",children:[g," EGP"]})]}),n.jsxs("div",{children:[n.jsx("span",{className:"card-title",children:"Total visits"}),n.jsx("div",{className:"card-value",children:v.length})]}),n.jsxs("div",{children:[n.jsx("span",{className:"card-title",children:"Completion rate"}),n.jsx("div",{className:"card-value",children:"0%"})]}),n.jsxs("div",{children:[n.jsx("span",{className:"card-title",children:"New clients"}),n.jsx("div",{className:"card-value",children:N.length})]}),n.jsxs("div",{children:[n.jsx("span",{className:"card-title",children:"Total clients"}),n.jsx("div",{className:"card-value",children:t.length})]})]}),n.jsx("span",{className:"text-muted text-xs margin-top-xs",children:"0% compared with the previous matching period"})]}),n.jsx("div",{className:"metrics-grid-16",children:z.map((w,C)=>n.jsxs("div",{className:"card kpi-card",children:[n.jsx("span",{className:"card-title",children:w.title}),n.jsx("div",{className:"card-value",children:w.value}),n.jsx("span",{className:"text-muted text-xs",children:w.sub})]},C))}),n.jsx("style",{children:`
        .summary-banner { padding: 16px; }
        .banner-metrics-row {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin: 12px 0;
        }
        .kpi-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        @media (min-width: 640px) {
          .summary-banner { padding: 24px; }
          .banner-metrics-row {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
        }

        @media (min-width: 768px) {
          .banner-metrics-row {
            grid-template-columns: repeat(5, 1fr);
            gap: 20px;
          }
        }
      `})]})},Xf=()=>{const{team:e,invitations:t,setActiveDrawer:r,updateMemberRole:s,removeMember:l,cancelInvitation:a}=B(),[i,c]=j.useState("members"),[o,p]=j.useState(""),[h,x]=j.useState("all"),m=e.filter(N=>{const S=N.name.toLowerCase().includes(o.toLowerCase())||N.email.toLowerCase().includes(o.toLowerCase()),f=h==="all"||N.role.toLowerCase()===h.toLowerCase();return S&&f}),u=N=>{const S=prompt(`Change role for ${N.name}:`,N.role);S&&S!==N.role&&(s(N.id,S),alert(`Role for ${N.name} updated to ${S}`))},v=N=>{window.confirm(`Are you sure you want to remove ${N.name} from clinic team?`)&&l(N.id)};return n.jsxs("div",{className:"team-page",children:[n.jsxs("div",{className:"page-header",children:[n.jsxs("div",{children:[n.jsx("h2",{children:"Team"}),n.jsx("p",{className:"text-muted",children:"Manage members, invitations, and roles for Petution."})]}),n.jsxs("button",{className:"btn-primary",onClick:()=>r("inviteMember"),children:[n.jsx(tu,{size:18}),"Invite member"]})]}),n.jsxs("div",{className:"table-container",children:[n.jsxs("div",{className:"table-controls-stack",children:[n.jsxs("div",{className:"tab-nav",children:[n.jsxs("button",{className:`tab-btn ${i==="members"?"active":""}`,onClick:()=>c("members"),children:["Members (",e.length,")"]}),n.jsxs("button",{className:`tab-btn ${i==="invitations"?"active":""}`,onClick:()=>c("invitations"),children:["Invitations (",t.length,")"]}),n.jsx("button",{className:`tab-btn ${i==="roles"?"active":""}`,onClick:()=>c("roles"),children:"Roles & Permissions"})]}),i==="members"&&n.jsxs("div",{className:"controls-row margin-top-sm flex justify-between align-center",children:[n.jsxs("div",{className:"search-input-wrapper",children:[n.jsx(br,{size:16,className:"search-icon"}),n.jsx("input",{type:"text",placeholder:"Search member",value:o,onChange:N=>p(N.target.value)})]}),n.jsxs("select",{className:"form-control max-w-xs",value:h,onChange:N=>x(N.target.value),children:[n.jsx("option",{value:"all",children:"Role: all"}),n.jsx("option",{value:"owner",children:"Owner"}),n.jsx("option",{value:"vet",children:"Vet"}),n.jsx("option",{value:"receptionist",children:"Receptionist"}),n.jsx("option",{value:"admin",children:"Admin"})]})]})]}),i==="members"&&n.jsxs("table",{className:"data-table",children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{children:"Member"}),n.jsx("th",{children:"Role"}),n.jsx("th",{children:"Actions"})]})}),n.jsx("tbody",{children:m.length===0?n.jsx("tr",{children:n.jsx("td",{colSpan:"3",className:"empty-state",children:"No team members found matching filter."})}):m.map(N=>n.jsxs("tr",{children:[n.jsx("td",{children:n.jsxs("div",{className:"member-cell",children:[n.jsx("div",{className:"avatar-circle",children:N.name.split(" ").map(S=>S[0]).join("")}),n.jsxs("div",{children:[n.jsx("div",{className:"font-semibold",children:N.name}),n.jsx("div",{className:"text-muted text-xs",children:N.email})]})]})}),n.jsx("td",{children:n.jsx("span",{className:`badge ${N.role==="Owner"?"badge-amber":N.role==="Vet"?"badge-teal":"badge-gray"}`,children:N.role})}),n.jsx("td",{children:n.jsxs("div",{className:"flex gap-xs",children:[n.jsx("button",{className:"btn-secondary text-xs",onClick:()=>u(N),children:"Change Role"}),N.role!=="Owner"&&n.jsx("button",{className:"btn-secondary text-xs text-red",onClick:()=>v(N),children:"Remove"})]})})]},N.id))})]}),i==="invitations"&&n.jsxs("table",{className:"data-table",children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{children:"Recipient Name"}),n.jsx("th",{children:"Email"}),n.jsx("th",{children:"Invited Role"}),n.jsx("th",{children:"Sent Date"}),n.jsx("th",{children:"Status"}),n.jsx("th",{children:"Actions"})]})}),n.jsx("tbody",{children:t.length===0?n.jsx("tr",{children:n.jsx("td",{colSpan:"6",className:"empty-state",children:"No pending team invitations."})}):t.map(N=>n.jsxs("tr",{children:[n.jsx("td",{className:"font-semibold",children:N.name}),n.jsx("td",{children:N.email}),n.jsx("td",{children:n.jsx("span",{className:"badge badge-teal",children:N.role})}),n.jsx("td",{className:"text-muted",children:N.sentAt}),n.jsx("td",{children:n.jsx("span",{className:"badge badge-amber",children:N.status})}),n.jsx("td",{children:n.jsxs("div",{className:"flex gap-xs",children:[n.jsx("button",{className:"btn-secondary text-xs",onClick:()=>alert(`Invitation resent to ${N.email}`),children:"Resend"}),n.jsx("button",{className:"btn-secondary text-xs text-red",onClick:()=>a(N.id),children:"Cancel"})]})})]},N.id))})]}),i==="roles"&&n.jsxs("div",{className:"roles-grid p-lg",children:[n.jsxs("div",{className:"card role-card",children:[n.jsxs("div",{className:"role-card-header",children:[n.jsx("span",{className:"badge badge-amber",children:"Owner"}),n.jsx("h4",{className:"font-bold margin-top-xs",children:"Practice Owner"})]}),n.jsx("p",{className:"text-xs text-muted",children:"Full administrative access to clinic settings, billing, team roles, and patient records."})]}),n.jsxs("div",{className:"card role-card",children:[n.jsxs("div",{className:"role-card-header",children:[n.jsx("span",{className:"badge badge-teal",children:"Vet"}),n.jsx("h4",{className:"font-bold margin-top-xs",children:"Veterinarian / Practitioner"})]}),n.jsx("p",{className:"text-xs text-muted",children:"Manage patient visits, health profiles, consultations, prescriptions, and medical notes."})]}),n.jsxs("div",{className:"card role-card",children:[n.jsxs("div",{className:"role-card-header",children:[n.jsx("span",{className:"badge badge-gray",children:"Receptionist"}),n.jsx("h4",{className:"font-bold margin-top-xs",children:"Front Desk Staff"})]}),n.jsx("p",{className:"text-xs text-muted",children:"Register clients and pets, manage daily visit queues, schedule appointments, and create invoices."})]}),n.jsxs("div",{className:"card role-card",children:[n.jsxs("div",{className:"role-card-header",children:[n.jsx("span",{className:"badge badge-gray",children:"Admin"}),n.jsx("h4",{className:"font-bold margin-top-xs",children:"Billing Admin"})]}),n.jsx("p",{className:"text-xs text-muted",children:"Manage inventory pricing, financial invoices, analytics reports, and billing subscriptions."})]})]})]}),n.jsx("style",{children:`
        .member-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .max-w-xs { max-width: 160px; }
        .justify-between { justify-content: space-between; }
        .align-center { align-items: center; }
        .controls-row { display: flex; gap: 16px; align-items: center; }
        .tab-nav {
          display: flex;
          gap: 12px;
          border-bottom: 1px solid var(--border-card);
          margin-top: 8px;
        }
        .tab-btn {
          padding: 8px 16px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-muted);
          border-bottom: 2px solid transparent;
        }
        .tab-btn.active {
          color: var(--primary-teal);
          border-bottom-color: var(--primary-teal);
        }
        .roles-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          padding: 24px;
        }
        .role-card {
          padding: 20px;
        }
        .p-lg { padding: 24px; }
      `})]})},eh=()=>{const{settings:e,setSettings:t,clients:r,pets:s,visits:l,products:a,invoices:i,importFullBackup:c,deleteWorkspace:o,activeWorkspaceId:p}=B(),[h,x]=j.useState({...e}),[m,u]=j.useState("Organization");j.useEffect(()=>{x({...e})},[e]);const v=["Organization","Tags","Prescription","Pre-defined Prescriptions","Integrations","Reminders","Online Booking","Data Backup & Migration"],N=()=>{const d={version:"1.0",exportedAt:new Date().toISOString(),settings:e,clients:r,pets:s,visits:l,products:a,invoices:i};Ff(d,`petution_full_backup_${new Date().toISOString().split("T")[0]}.json`)},S=d=>{const g=d.target.files[0];if(!g)return;const b=new FileReader;b.onload=P=>{try{const z=JSON.parse(P.target.result);c(z)}catch(z){alert(`Failed to restore backup: ${z.message}`)}},b.readAsText(g)},f=d=>{d.preventDefault(),t(h),alert("Organization settings saved successfully!")};return n.jsxs("div",{className:"settings-page",children:[n.jsx("div",{className:"page-header",children:n.jsxs("div",{children:[n.jsx("h2",{children:"Settings"}),n.jsx("p",{className:"text-muted",children:"Manage organization settings and application tags."})]})}),n.jsx("div",{className:"tab-nav margin-bottom-lg",children:v.map(d=>n.jsx("button",{className:`tab-btn ${m===d?"active":""}`,onClick:()=>u(d),children:d},d))}),m==="Organization"?n.jsxs("div",{className:"card settings-card",children:[n.jsxs("div",{className:"card-header-section",children:[n.jsx("h4",{className:"font-semibold",children:"Organization Profile"}),n.jsx("p",{className:"text-xs text-muted",children:"Manage your organization details, slug, and avatar."})]}),n.jsxs("form",{onSubmit:f,className:"settings-form",children:[n.jsx("div",{className:"avatar-upload-row",children:n.jsxs("div",{className:"profile-avatar-circle",children:[n.jsx("span",{children:h.orgName.charAt(0)}),n.jsx("div",{className:"camera-overlay",children:n.jsx(gf,{size:14})})]})}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Organization Name"}),n.jsx("input",{type:"text",className:"form-control",value:h.orgName,onChange:d=>x({...h,orgName:d.target.value})})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Slug"}),n.jsx("input",{type:"text",className:"form-control",value:h.slug,onChange:d=>x({...h,slug:d.target.value})})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Phone Number"}),n.jsx("input",{type:"text",className:"form-control",value:h.phone,onChange:d=>x({...h,phone:d.target.value})})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Address"}),n.jsx("input",{type:"text",className:"form-control",value:h.address,onChange:d=>x({...h,address:d.target.value})})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Website"}),n.jsx("input",{type:"text",className:"form-control",value:h.website,onChange:d=>x({...h,website:d.target.value})})]}),n.jsx("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"16px"},children:n.jsx("button",{type:"submit",className:"btn-primary",children:"Save Changes"})})]}),n.jsxs("div",{className:"danger-zone-card margin-top-lg",children:[n.jsxs("h4",{className:"font-semibold text-rose flex items-center gap-xs",children:[n.jsx($d,{size:18})," Danger Zone: Delete Clinic Workspace"]}),n.jsxs("p",{className:"text-xs text-muted margin-top-xs",children:['Permanently remove this active clinic workspace ("',h.orgName,'"). This action cannot be undone.']}),n.jsx("div",{className:"margin-top-sm",children:n.jsxs("button",{type:"button",className:"btn-secondary text-rose border-rose",style:{borderColor:"#e11d48",color:"#e11d48"},onClick:()=>{confirm(`Are you sure you want to PERMANENTLY DELETE the clinic workspace "${h.orgName}"?`)&&o(p)},children:[n.jsx(Xt,{size:16})," Delete Clinic Workspace"]})})]})]}):m==="Data Backup & Migration"?n.jsxs("div",{className:"card settings-card",children:[n.jsxs("div",{className:"card-header-section",children:[n.jsxs("h4",{className:"font-semibold flex items-center gap-xs",children:[n.jsx(jf,{size:20,className:"text-teal"})," Full System Data Backup & Migration"]}),n.jsx("p",{className:"text-xs text-muted",children:"Export complete clinic records or restore data from another clinic workspace."})]}),n.jsxs("div",{className:"margin-top-md",children:[n.jsxs("div",{className:"card info-card margin-bottom-md",children:[n.jsx("h5",{className:"font-semibold",children:"Full System Backup (.JSON)"}),n.jsxs("p",{className:"text-xs text-muted margin-top-xs",children:["Downloads all Clients (",r.length,"), Pets (",s.length,"), Visits (",l.length,"), Products/Services (",a.length,"), Invoices (",i.length,"), and Clinic Settings into a single portable backup file."]}),n.jsx("div",{className:"margin-top-sm",children:n.jsxs("button",{className:"btn-primary",onClick:N,children:[n.jsx(kr,{size:16})," Export Full System Backup"]})})]}),n.jsxs("div",{className:"card info-card",children:[n.jsx("h5",{className:"font-semibold",children:"Restore / Import System Backup (.JSON)"}),n.jsx("p",{className:"text-xs text-muted margin-top-xs",children:"Upload a previously exported Petution `.json` backup file to restore all clinic data."}),n.jsxs("div",{className:"margin-top-sm",style:{display:"flex",alignItems:"center",gap:"12px",flexWrap:"wrap"},children:[n.jsxs("label",{className:"btn-secondary",style:{cursor:"pointer",display:"inline-flex",alignItems:"center",gap:"6px"},children:[n.jsx(Sr,{size:16})," Choose Backup File",n.jsx("input",{type:"file",accept:".json",onChange:S,className:"file-input-hidden"})]}),n.jsx("span",{className:"text-xs text-muted",children:"Supports `.json` format"})]})]})]})]}):n.jsxs("div",{className:"card empty-state",children:[m," configuration panel ready for customization."]}),n.jsx("style",{children:`
        .settings-card { 
          max-width: 100%; 
        }
        .card-header-section { 
          padding-bottom: 12px; 
          margin-bottom: 16px; 
          border-bottom: 1px solid var(--border-card); 
        }
        .settings-form { 
          display: flex; 
          flex-direction: column; 
          gap: 14px; 
        }
        .avatar-upload-row { 
          display: flex; 
          justify-content: center; 
          margin-bottom: 8px; 
        }
        .profile-avatar-circle {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          background: #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: #475569;
          position: relative;
          cursor: pointer;
        }
        .camera-overlay {
          position: absolute;
          bottom: 2px;
          right: 2px;
          background: #ffffff;
          border: 1px solid var(--border-card);
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
        }
        .info-card {
          padding: 16px;
        }

        @media (min-width: 640px) {
          .settings-card {
            max-width: 680px;
          }
          .profile-avatar-circle {
            width: 80px;
            height: 80px;
            font-size: 1.75rem;
          }
        }
      `})]})},th=({onComplete:e})=>{const{registerClinic:t}=B(),[r,s]=j.useState(""),[l,a]=j.useState(""),[i,c]=j.useState(""),[o,p]=j.useState(""),[h,x]=j.useState(""),[m,u]=j.useState("Cairo"),[v,N]=j.useState(""),[S,f]=j.useState("Second Plan (14-Day Free Trial)"),d=g=>{if(g.preventDefault(),!r.trim()||!l.trim())return alert("Please fill in clinic name and owner name.");t({clinicName:r,ownerName:l,email:i,phone:h,governorate:m,district:v,plan:S}),alert(`Clinic workspace "${r}" registered successfully! Launching workspace...`),e&&e()};return n.jsxs("div",{className:"register-page-container",children:[n.jsxs("div",{className:"register-card",children:[n.jsx("div",{className:"register-top-nav",children:e&&n.jsx("button",{type:"button",className:"btn-secondary text-xs",onClick:e,children:"← Back to Workspace"})}),n.jsxs("div",{className:"register-header",children:[n.jsxs("div",{className:"brand-badge",children:[n.jsx(hf,{size:24,className:"text-teal"}),n.jsx("span",{className:"brand-title",children:"Petution"})]}),n.jsx("h2",{children:"Register Your Clinic"}),n.jsx("p",{className:"text-muted",children:"Create your veterinary clinic workspace in under 60 seconds."})]}),n.jsxs("form",{onSubmit:d,className:"register-form",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Clinic / Practice Name *"}),n.jsx("input",{type:"text",className:"form-control",placeholder:"e.g. Petution Vet Clinic",value:r,onChange:g=>s(g.target.value),required:!0})]}),n.jsxs("div",{className:"form-row",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Owner / Practice Manager *"}),n.jsx("input",{type:"text",className:"form-control",placeholder:"Dr. Khaled ElGendy",value:l,onChange:g=>a(g.target.value),required:!0})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Work Email *"}),n.jsx("input",{type:"email",className:"form-control",placeholder:"doctor@clinic.com",value:i,onChange:g=>c(g.target.value),required:!0})]})]}),n.jsxs("div",{className:"form-row",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Phone Number *"}),n.jsx("input",{type:"text",className:"form-control",placeholder:"+20 100 123 4567",value:h,onChange:g=>x(g.target.value),required:!0})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Password *"}),n.jsx("input",{type:"password",className:"form-control",placeholder:"••••••••",value:o,onChange:g=>p(g.target.value),required:!0})]})]}),n.jsxs("div",{className:"form-row",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Governorate"}),n.jsxs("select",{className:"form-control",value:m,onChange:g=>u(g.target.value),children:[n.jsx("option",{value:"Cairo",children:"Cairo"}),n.jsx("option",{value:"Giza",children:"Giza"}),n.jsx("option",{value:"Alexandria",children:"Alexandria"})]})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"District / City"}),n.jsx("input",{type:"text",className:"form-control",placeholder:"District name",value:v,onChange:g=>N(g.target.value)})]})]}),n.jsxs("div",{className:"form-group margin-top-xs",children:[n.jsx("label",{children:"Select Initial Subscription Plan"}),n.jsxs("div",{className:"plan-radio-options",children:[n.jsxs("label",{className:`plan-radio-card ${S.includes("14-Day")?"active":""}`,children:[n.jsx("input",{type:"radio",name:"plan",checked:S.includes("14-Day"),onChange:()=>f("Second Plan (14-Day Free Trial)")}),n.jsxs("div",{className:"plan-radio-info",children:[n.jsx("span",{className:"font-semibold",children:"14-Day Free Trial"}),n.jsx("span",{className:"text-xs text-muted",children:"Up to 350 active patients & WhatsApp auto reminders"})]})]}),n.jsxs("label",{className:`plan-radio-card ${S.includes("First Plan")?"active":""}`,children:[n.jsx("input",{type:"radio",name:"plan",checked:S.includes("First Plan"),onChange:()=>f("First Plan (150 Patients)")}),n.jsxs("div",{className:"plan-radio-info",children:[n.jsx("span",{className:"font-semibold",children:"First Plan (EGP 1,750/mo)"}),n.jsx("span",{className:"text-xs text-muted",children:"Up to 150 patients for small practice"})]})]})]})]}),n.jsxs("button",{type:"submit",className:"btn-primary btn-large margin-top-sm",children:["Register & Launch Clinic Workspace ",n.jsx(ot,{size:18})]})]}),n.jsxs("div",{className:"register-footer",children:[n.jsx(Bs,{size:16,className:"text-teal"}),n.jsx("span",{children:"Secure SSL Encryption • Instant Clinic Setup"})]})]}),n.jsx("style",{children:`
        .register-page-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #004d4d 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
        }

        .register-card {
          background: #ffffff;
          border-radius: var(--radius-lg);
          max-width: 620px;
          width: 100%;
          padding: 36px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          position: relative;
        }

        .register-top-nav {
          display: flex;
          justify-content: flex-start;
          margin-bottom: 12px;
        }

        .register-header {
          text-align: center;
          margin-bottom: 28px;
        }

        .brand-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--primary-teal-light);
          padding: 6px 16px;
          border-radius: 9999px;
          margin-bottom: 12px;
        }

        .brand-title {
          font-size: 1.1rem;
          font-weight: 800;
          color: var(--primary-teal);
        }

        .register-header h2 {
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--text-main);
        }

        .register-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .btn-large {
          padding: 12px;
          font-size: 1rem;
          justify-content: center;
          border-radius: var(--radius-md);
        }

        .plan-radio-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: 4px;
        }

        .plan-radio-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border: 1px solid var(--border-card);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .plan-radio-card.active {
          border-color: var(--primary-teal);
          background: var(--primary-teal-light);
        }

        .plan-radio-info {
          display: flex;
          flex-direction: column;
        }

        .register-footer {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 24px;
          font-size: 0.8rem;
          color: var(--text-muted);
          border-top: 1px solid var(--border-card);
          padding-top: 16px;
        }
      `})]})},nh=()=>{const{setActiveDrawer:e,addClient:t,pets:r}=B(),[s,l]=j.useState(""),[a,i]=j.useState("Select source"),[c,o]=j.useState("Cairo"),[p,h]=j.useState(""),[x,m]=j.useState(""),[u,v]=j.useState([{phone:"",label:"Primary",isPrimary:!0,hasWhatsapp:!0}]),[N,S]=j.useState([]),f=()=>{v([...u,{phone:"",label:"Secondary",isPrimary:!1,hasWhatsapp:!1}])},d=b=>{v(u.filter((P,z)=>z!==b))},g=b=>{if(b.preventDefault(),!s.trim())return alert("Please enter client owner name.");t({name:s,source:a,governorate:c,district:p,street:x,phones:u,tags:["New Client"],pets:N}),e(null)};return n.jsxs("div",{className:"drawer-backdrop",onClick:()=>e(null),children:[n.jsxs("div",{className:"drawer-panel",onClick:b=>b.stopPropagation(),children:[n.jsxs("div",{className:"drawer-header",children:[n.jsxs("div",{children:[n.jsx("h3",{children:"Add client"}),n.jsx("p",{children:"Save client details, contact info, tags, and pet assignments."})]}),n.jsx("button",{className:"icon-btn",onClick:()=>e(null),children:n.jsx(me,{size:18})})]}),n.jsxs("form",{onSubmit:g,className:"drawer-body",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Pet owner name *"}),n.jsx("input",{type:"text",className:"form-control",placeholder:"Client full name",value:s,onChange:b=>l(b.target.value),required:!0})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"How did you find us? *"}),n.jsxs("select",{className:"form-control",value:a,onChange:b=>i(b.target.value),children:[n.jsx("option",{value:"Select source",children:"Select source"}),n.jsx("option",{value:"Facebook",children:"Facebook"}),n.jsx("option",{value:"Instagram",children:"Instagram"}),n.jsx("option",{value:"Recommendation",children:"Recommendation"}),n.jsx("option",{value:"Walk-in",children:"Walk-in"})]})]}),n.jsxs("div",{className:"form-row",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Governorate *"}),n.jsxs("select",{className:"form-control",value:c,onChange:b=>o(b.target.value),children:[n.jsx("option",{value:"Cairo",children:"Cairo"}),n.jsx("option",{value:"Giza",children:"Giza"}),n.jsx("option",{value:"Alexandria",children:"Alexandria"})]})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"District *"}),n.jsx("input",{type:"text",className:"form-control",placeholder:"District name",value:p,onChange:b=>h(b.target.value)})]})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Street"}),n.jsx("input",{type:"text",className:"form-control",placeholder:"Street name, building, or landmark",value:x,onChange:b=>m(b.target.value)})]}),n.jsxs("div",{className:"form-group",children:[n.jsxs("div",{className:"flex justify-between align-center",children:[n.jsx("label",{children:"Phone numbers *"}),n.jsxs("button",{type:"button",className:"btn-secondary text-xs",onClick:f,children:[n.jsx(rt,{size:14})," Add phone"]})]}),u.map((b,P)=>n.jsxs("div",{className:"phone-repeater-row margin-top-xs",children:[n.jsx("div",{className:"country-code-box",children:"🇪🇬 +20"}),n.jsx("input",{type:"text",className:"form-control flex-1",placeholder:"Enter phone number",value:b.phone,onChange:z=>{const w=[...u];w[P].phone=z.target.value,v(w)}}),u.length>1&&n.jsx("button",{type:"button",className:"icon-btn text-red",onClick:()=>d(P),children:n.jsx(Xt,{size:16})})]},P))]}),n.jsxs("div",{className:"drawer-footer margin-top-auto",children:[n.jsx("button",{type:"button",className:"btn-secondary",onClick:()=>e(null),children:"Cancel"}),n.jsx("button",{type:"submit",className:"btn-primary",children:"Create client"})]})]})]}),n.jsx("style",{children:`
        .phone-repeater-row { display: flex; gap: 8px; align-items: center; }
        .country-code-box {
          padding: 8px 10px;
          background: #f1f5f9;
          border: 1px solid var(--border-card);
          border-radius: var(--radius-sm);
          font-size: 0.85rem;
        }
        .flex-1 { flex: 1; }
        .margin-top-auto { margin-top: auto; }
      `})]})},rh=()=>{var Cr;const{setActiveDrawer:e,addPet:t,clients:r}=B(),[s,l]=j.useState(""),[a,i]=j.useState(1),[c,o]=j.useState("years"),[p,h]=j.useState("cat"),[x,m]=j.useState("male"),[u,v]=j.useState(!0),[N,S]=j.useState(!1),[f,d]=j.useState(!1),[g,b]=j.useState(!1),[P,z]=j.useState(""),[w,C]=j.useState(""),[V,R]=j.useState(""),[Y,$]=j.useState("Calm"),[ve,$e]=j.useState("Unspecified"),[gt,st]=j.useState(""),[O,T]=j.useState(""),[M,L]=j.useState(""),[H,Z]=j.useState(""),[Be,Ie]=j.useState(""),[lt,He]=j.useState(!1),[vt,hi]=j.useState(!1),[Tn,Dn]=j.useState(""),[An,Gs]=j.useState(""),[Mn,qs]=j.useState(((Cr=r[0])==null?void 0:Cr.id)||""),Qs=I=>{if(I.preventDefault(),!s.trim())return alert("Please enter pet name.");t({name:s,ageValue:Number(a)||1,ageUnit:c,species:p,gender:x,vaccinated:u,deworming:N,antiflea:f,castrated:g,neuterDate:P,breed:w,color:V,temperament:Y,bloodGroup:ve,cardNo:gt,protocolNo:O,microchipNumber:M,microchipDate:H,microchipLocation:Be,isAggressive:lt,isDeceased:!!Tn||vt,deathDate:Tn,privateNotes:An,tags:lt?["Aggressive / Handle with Caution"]:[],nutrition:["Dry food"],owners:Mn?[Mn]:[]}),e(null)};return n.jsxs("div",{className:"drawer-backdrop",onClick:()=>e(null),children:[n.jsxs("div",{className:"drawer-panel",onClick:I=>I.stopPropagation(),children:[n.jsxs("div",{className:"drawer-header",children:[n.jsxs("div",{children:[n.jsx("h3",{children:"Add pet"}),n.jsx("p",{children:"Manage pet profile, identification, microchip, and medical info."})]}),n.jsx("button",{className:"icon-btn",onClick:()=>e(null),children:n.jsx(me,{size:18})})]}),n.jsxs("form",{onSubmit:Qs,className:"drawer-body",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Customer / Owner *"}),n.jsxs("select",{className:"form-control",value:Mn,onChange:I=>qs(I.target.value),required:!0,children:[n.jsx("option",{value:"",children:"Select a Customer"}),r.map(I=>n.jsx("option",{value:I.id,children:I.name},I.id))]})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Pet name *"}),n.jsx("input",{type:"text",className:"form-control",placeholder:"e.g. Milo, Rocky",value:s,onChange:I=>l(I.target.value),required:!0})]}),n.jsxs("div",{className:"form-row",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Species *"}),n.jsxs("select",{className:"form-control",value:p,onChange:I=>h(I.target.value),children:[n.jsx("option",{value:"cat",children:"Cat"}),n.jsx("option",{value:"dog",children:"Dog"}),n.jsx("option",{value:"turtle",children:"Turtle"}),n.jsx("option",{value:"bird",children:"Bird"}),n.jsx("option",{value:"other",children:"Other"})]})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Breed"}),n.jsx("input",{type:"text",className:"form-control",placeholder:"Unspecified / Persian",value:w,onChange:I=>C(I.target.value)})]})]}),n.jsxs("div",{className:"form-row",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Age"}),n.jsxs("div",{className:"flex gap-xs",children:[n.jsx("input",{type:"number",className:"form-control",value:a,onChange:I=>i(I.target.value)}),n.jsxs("select",{className:"form-control",value:c,onChange:I=>o(I.target.value),children:[n.jsx("option",{value:"years",children:"years"}),n.jsx("option",{value:"months",children:"months"})]})]})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Gender"}),n.jsxs("select",{className:"form-control",value:x,onChange:I=>m(I.target.value),children:[n.jsx("option",{value:"male",children:"Male"}),n.jsx("option",{value:"female",children:"Female"})]})]})]}),n.jsxs("div",{className:"form-row",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Color"}),n.jsx("input",{type:"text",className:"form-control",placeholder:"e.g. Golden, White",value:V,onChange:I=>R(I.target.value)})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Blood Group"}),n.jsxs("select",{className:"form-control",value:ve,onChange:I=>$e(I.target.value),children:[n.jsx("option",{value:"Unspecified",children:"Unspecified"}),n.jsx("option",{value:"A",children:"A"}),n.jsx("option",{value:"B",children:"B"}),n.jsx("option",{value:"AB",children:"AB"}),n.jsx("option",{value:"DEA 1.1+",children:"DEA 1.1+"}),n.jsx("option",{value:"DEA 1.1-",children:"DEA 1.1-"})]})]})]}),n.jsx("div",{className:"card-section-label",children:"MICROCHIP & IDENTIFICATION"}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Microchip Number"}),n.jsx("input",{type:"text",className:"form-control font-mono",placeholder:"e.g. 985141002938471",value:M,onChange:I=>L(I.target.value)})]}),n.jsxs("div",{className:"form-row",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Microchip Implant Date"}),n.jsx("input",{type:"date",className:"form-control",value:H,onChange:I=>Z(I.target.value)})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Implant Location"}),n.jsx("input",{type:"text",className:"form-control",placeholder:"e.g. Left Scapular",value:Be,onChange:I=>Ie(I.target.value)})]})]}),n.jsxs("div",{className:"form-row",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Card Number"}),n.jsx("input",{type:"text",className:"form-control",placeholder:"e.g. CRD-9982",value:gt,onChange:I=>st(I.target.value)})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Protocol Number"}),n.jsx("input",{type:"text",className:"form-control",placeholder:"e.g. PRT-102",value:O,onChange:I=>T(I.target.value)})]})]}),n.jsx("div",{className:"card-section-label",children:"MEDICAL STATUS & BEHAVIOR"}),n.jsxs("div",{className:"form-row",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Neutered / Spayed"}),n.jsxs("select",{className:"form-control",value:g?"yes":"no",onChange:I=>b(I.target.value==="yes"),children:[n.jsx("option",{value:"no",children:"Unspecified / No"}),n.jsx("option",{value:"yes",children:"Yes (Neutered/Spayed)"})]})]}),g&&n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Neutering Date"}),n.jsx("input",{type:"date",className:"form-control",value:P,onChange:I=>z(I.target.value)})]})]}),n.jsxs("div",{className:"form-row",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Temperament"}),n.jsxs("select",{className:"form-control",value:Y,onChange:I=>$(I.target.value),children:[n.jsx("option",{value:"Calm",children:"Calm"}),n.jsx("option",{value:"Playful",children:"Playful"}),n.jsx("option",{value:"Shy",children:"Shy"}),n.jsx("option",{value:"Friendly",children:"Friendly"})]})]}),n.jsxs("div",{className:"form-group flex items-center gap-xs",style:{marginTop:"26px"},children:[n.jsx("input",{type:"checkbox",id:"aggro-toggle",checked:lt,onChange:I=>He(I.target.checked)}),n.jsxs("label",{htmlFor:"aggro-toggle",className:"font-semibold text-xs flex items-center gap-xs text-rose",style:{margin:0,cursor:"pointer"},children:[n.jsx(Xd,{size:14})," Aggressive / High Risk Flag"]})]})]}),n.jsxs("div",{className:"form-row",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Vaccinated"}),n.jsxs("select",{className:"form-control",value:u?"yes":"no",onChange:I=>v(I.target.value==="yes"),children:[n.jsx("option",{value:"yes",children:"Yes"}),n.jsx("option",{value:"no",children:"No"})]})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Deworming"}),n.jsxs("select",{className:"form-control",value:N?"yes":"no",onChange:I=>S(I.target.value==="yes"),children:[n.jsx("option",{value:"no",children:"No"}),n.jsx("option",{value:"yes",children:"Yes"})]})]})]}),n.jsx("div",{className:"card-section-label",children:"NOTES & LIFECYCLE"}),n.jsxs("div",{className:"form-group",children:[n.jsxs("label",{className:"flex items-center gap-xs",children:["Private Notes ",n.jsx("span",{className:"badge badge-gray text-xs",children:"Private"})]}),n.jsx("textarea",{className:"form-control",rows:"3",placeholder:"Clinical notes, allergies, diet preferences (Internal only)",value:An,onChange:I=>Gs(I.target.value)})]}),n.jsxs("div",{className:"form-group",children:[n.jsxs("label",{className:"flex items-center gap-xs text-muted",children:[n.jsx(qd,{size:14})," Death Date (Deceased Marking)"]}),n.jsx("input",{type:"date",className:"form-control",value:Tn,onChange:I=>Dn(I.target.value)}),n.jsx("span",{className:"text-xs text-muted margin-top-xs",style:{display:"block"},children:"If you enter the death date, the pet will be marked as deceased and all related records will be automatically stopped."})]}),n.jsxs("div",{className:"drawer-footer margin-top-auto",children:[n.jsx("button",{type:"button",className:"btn-secondary",onClick:()=>e(null),children:"Cancel"}),n.jsx("button",{type:"submit",className:"btn-primary",children:"Create pet"})]})]})]}),n.jsx("style",{children:`
        .card-section-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--text-light);
          margin: 18px 0 10px;
          padding-bottom: 4px;
          border-bottom: 1px dashed var(--border-card);
        }
        .text-rose { color: #e11d48; }
        .font-mono { font-family: monospace; letter-spacing: 0.03em; }
      `})]})},sh=()=>{var P,z;const{setActiveDrawer:e,addVisit:t,clients:r,pets:s}=B(),[l,a]=j.useState(((P=r[0])==null?void 0:P.id)||""),[i,c]=j.useState(((z=s[0])==null?void 0:z.id)||""),[o,p]=j.useState("Dr. Khaled ElGendy"),[h,x]=j.useState("Check-up"),[m,u]=j.useState(new Date().toISOString().split("T")[0]),[v,N]=j.useState("08:00 PM"),[S,f]=j.useState("scheduled"),[d,g]=j.useState("General checkup"),b=w=>{if(w.preventDefault(),!i||!m){alert("Please fill out all required fields (Pet and Visit Date).");return}t({clientId:l,petId:i,doctorName:o,visitType:h,date:m,time:v,state:S,reason:d}),e(null)};return n.jsx("div",{className:"drawer-backdrop",onClick:()=>e(null),children:n.jsxs("div",{className:"drawer-panel",onClick:w=>w.stopPropagation(),children:[n.jsxs("div",{className:"drawer-header",children:[n.jsxs("div",{children:[n.jsx("h3",{children:"Add Visit"}),n.jsx("p",{children:"Create a new visit and link it to both a client and a pet."})]}),n.jsx("button",{className:"icon-btn",onClick:()=>e(null),children:n.jsx(me,{size:18})})]}),n.jsxs("form",{onSubmit:b,className:"drawer-body",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Client"}),n.jsx("select",{className:"form-control",value:l,onChange:w=>a(w.target.value),children:r.map(w=>n.jsx("option",{value:w.id,children:w.name},w.id))})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Pet"}),n.jsx("select",{className:"form-control",value:i,onChange:w=>c(w.target.value),children:s.map(w=>n.jsxs("option",{value:w.id,children:[w.name," (",w.species,")"]},w.id))})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Doctor"}),n.jsxs("select",{className:"form-control",value:o,onChange:w=>p(w.target.value),children:[n.jsx("option",{value:"Dr. Khaled ElGendy",children:"Dr. Khaled ElGendy"}),n.jsx("option",{value:"Unassigned",children:"Unassigned"})]})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Visit Type"}),n.jsxs("select",{className:"form-control",value:h,onChange:w=>x(w.target.value),children:[n.jsx("option",{value:"Check-up",children:"Check-up"}),n.jsx("option",{value:"Vaccination",children:"Vaccination"}),n.jsx("option",{value:"Surgery",children:"Surgery"}),n.jsx("option",{value:"Follow-up",children:"Follow-up"}),n.jsx("option",{value:"Emergency",children:"Emergency"})]})]}),n.jsxs("div",{className:"form-row",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Visit Date"}),n.jsx("input",{type:"date",className:"form-control",value:m,onChange:w=>u(w.target.value)})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Time (Africa/Cairo)"}),n.jsx("input",{type:"text",className:"form-control",value:v,onChange:w=>N(w.target.value)})]})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Visit State"}),n.jsxs("select",{className:"form-control",value:S,onChange:w=>f(w.target.value),children:[n.jsx("option",{value:"scheduled",children:"scheduled"}),n.jsx("option",{value:"in-progress",children:"in-progress"}),n.jsx("option",{value:"completed",children:"completed"}),n.jsx("option",{value:"cancelled",children:"cancelled"})]})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Visit Reason"}),n.jsx("input",{type:"text",className:"form-control",placeholder:"Reason for visit",value:d,onChange:w=>g(w.target.value)})]}),n.jsxs("div",{className:"drawer-footer margin-top-auto",children:[n.jsx("button",{type:"button",className:"btn-secondary",onClick:()=>e(null),children:"Cancel"}),n.jsx("button",{type:"submit",className:"btn-primary",children:"Create Visit"})]})]})]})})},lh=()=>{var z,w;const{setActiveDrawer:e,addInvoice:t,pets:r,products:s}=B(),[l,a]=j.useState(((z=r[0])==null?void 0:z.id)||""),[i,c]=j.useState("pending"),[o,p]=j.useState("none"),[h,x]=j.useState(0),[m,u]=j.useState(14),[v,N]=j.useState(((w=s[0])==null?void 0:w.id)||""),S=j.useMemo(()=>{const C=s.find(V=>V.id===v);return C?[{...C,quantity:1}]:[]},[s,v]),f=j.useMemo(()=>S.reduce((C,V)=>C+(Number(V.pricePerUnit)||0)*(Number(V.quantity)||1),0),[S]),d=j.useMemo(()=>{const C=Number(h)||0;return o==="percentage"?f*C/100:o==="fixed_amount"?C:0},[f,o,h]),g=j.useMemo(()=>{const C=Number(m)||0;return Math.max(0,f-d)*C/100},[f,d,m]),b=j.useMemo(()=>Math.max(0,f-d)+g,[f,d,g]),P=C=>{if(C.preventDefault(),!l||!v){alert("Please select both a Pet and a Billable Item/Service.");return}t({petId:l,status:i,discountType:o,discountValue:Number(h),taxPercentage:Number(m),subtotal:f,totalAmount:b}),e(null)};return n.jsxs("div",{className:"drawer-backdrop",onClick:()=>e(null),children:[n.jsxs("div",{className:"drawer-panel",onClick:C=>C.stopPropagation(),children:[n.jsxs("div",{className:"drawer-header",children:[n.jsxs("div",{children:[n.jsx("h3",{children:"Add Invoice"}),n.jsx("p",{children:"Create an invoice linked to a pet and optional visit."})]}),n.jsx("button",{className:"icon-btn",onClick:()=>e(null),children:n.jsx(me,{size:18})})]}),n.jsxs("form",{onSubmit:P,className:"drawer-body",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Pet"}),n.jsx("select",{className:"form-control",value:l,onChange:C=>a(C.target.value),children:r.map(C=>n.jsx("option",{value:C.id,children:C.name},C.id))})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Invoice State"}),n.jsxs("select",{className:"form-control",value:i,onChange:C=>c(C.target.value),children:[n.jsx("option",{value:"pending",children:"pending"}),n.jsx("option",{value:"paid",children:"paid"}),n.jsx("option",{value:"cancelled",children:"cancelled"})]})]}),n.jsxs("div",{className:"form-row",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Discount Type"}),n.jsxs("select",{className:"form-control",value:o,onChange:C=>p(C.target.value),children:[n.jsx("option",{value:"none",children:"none"}),n.jsx("option",{value:"percentage",children:"percentage"}),n.jsx("option",{value:"fixed_amount",children:"fixed amount"})]})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Discount Value"}),n.jsx("input",{type:"number",className:"form-control",value:h,onChange:C=>x(C.target.value)})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Tax %"}),n.jsx("input",{type:"number",className:"form-control",value:m,onChange:C=>u(C.target.value)})]})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Billable Item / Service"}),n.jsx("select",{className:"form-control",value:v,onChange:C=>N(C.target.value),children:s.map(C=>n.jsxs("option",{value:C.id,children:[C.name," - ",C.pricePerUnit," EGP"]},C.id))})]}),n.jsxs("div",{className:"calc-summary-box card margin-top-md",children:[n.jsxs("div",{className:"flex justify-between text-xs",children:[n.jsx("span",{children:"Subtotal"}),n.jsxs("span",{children:["EGP ",f.toFixed(2)]})]}),n.jsxs("div",{className:"flex justify-between text-xs margin-top-xs",children:[n.jsx("span",{children:"Discount"}),n.jsxs("span",{children:["- EGP ",d.toFixed(2)]})]}),n.jsxs("div",{className:"flex justify-between text-xs margin-top-xs",children:[n.jsxs("span",{children:["Tax (",m,"%)"]}),n.jsxs("span",{children:["EGP ",g.toFixed(2)]})]}),n.jsxs("div",{className:"flex justify-between font-bold text-base margin-top-md border-top pt-xs",children:[n.jsx("span",{children:"Total Amount"}),n.jsxs("span",{children:["EGP ",b.toFixed(2)]})]})]}),n.jsxs("div",{className:"drawer-footer margin-top-auto",children:[n.jsx("button",{type:"button",className:"btn-secondary",onClick:()=>e(null),children:"Cancel"}),n.jsx("button",{type:"submit",className:"btn-primary",children:"Create Invoice"})]})]})]}),n.jsx("style",{children:`
        .calc-summary-box { background: #f8fafc; padding: 16px; }
        .text-base { font-size: 1.1rem; }
        .pt-xs { padding-top: 8px; }
        .border-top { border-top: 1px solid var(--border-card); }
      `})]})},ah=()=>{const{setActiveDrawer:e,addExpense:t}=B(),[r,s]=j.useState(""),[l,a]=j.useState(""),[i,c]=j.useState("Supplies"),[o,p]=j.useState(""),[h,x]=j.useState(new Date().toISOString().split("T")[0]),[m,u]=j.useState("Cash"),[v,N]=j.useState(""),S=["Supplies","Utilities","Rent","Salaries","Equipment Maintenance","Marketing & Ads","Licenses & Taxes","Other"],f=d=>{if(d.preventDefault(),!r.trim()||!o)return alert("Please fill in expense title and amount.");t({title:r,vendor:l,category:i,amount:Number(o)||0,date:h,paymentMethod:m,notes:v}),e(null)};return n.jsxs("div",{className:"drawer-backdrop",onClick:()=>e(null),children:[n.jsxs("div",{className:"drawer-panel",onClick:d=>d.stopPropagation(),children:[n.jsxs("div",{className:"drawer-header",children:[n.jsxs("div",{children:[n.jsxs("h3",{className:"flex items-center gap-xs",children:[n.jsx(Gd,{size:20,className:"text-teal"})," Record New Expense"]}),n.jsx("p",{children:"Track operational overhead, wholesaler bills, utilities, and payroll."})]}),n.jsx("button",{className:"icon-btn",onClick:()=>e(null),children:n.jsx(me,{size:18})})]}),n.jsxs("form",{onSubmit:f,className:"drawer-body",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Expense Title / Item *"}),n.jsx("input",{type:"text",className:"form-control",placeholder:"e.g. Monthly Medication Order, July Electricity",value:r,onChange:d=>s(d.target.value),required:!0})]}),n.jsxs("div",{className:"form-row",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Amount (EGP) *"}),n.jsx("input",{type:"number",className:"form-control font-bold",placeholder:"0.00",value:o,onChange:d=>p(d.target.value),required:!0})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Category *"}),n.jsx("select",{className:"form-control",value:i,onChange:d=>c(d.target.value),children:S.map(d=>n.jsx("option",{value:d,children:d},d))})]})]}),n.jsxs("div",{className:"form-row",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Vendor / Supplier Name"}),n.jsx("input",{type:"text",className:"form-control",placeholder:"e.g. El-Gomhouria Med, Landlord",value:l,onChange:d=>a(d.target.value)})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Expense Date *"}),n.jsx("input",{type:"date",className:"form-control",value:h,onChange:d=>x(d.target.value),required:!0})]})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Payment Method"}),n.jsxs("select",{className:"form-control",value:m,onChange:d=>u(d.target.value),children:[n.jsx("option",{value:"Cash",children:"Cash"}),n.jsx("option",{value:"Bank Transfer",children:"Bank Transfer / Instapay"}),n.jsx("option",{value:"Credit Card",children:"Credit Card"}),n.jsx("option",{value:"Check",children:"Check"})]})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Notes / Receipt Reference"}),n.jsx("textarea",{className:"form-control",rows:"3",placeholder:"Invoice # or additional details...",value:v,onChange:d=>N(d.target.value)})]}),n.jsxs("div",{className:"drawer-footer margin-top-auto",children:[n.jsx("button",{type:"button",className:"btn-secondary",onClick:()=>e(null),children:"Cancel"}),n.jsx("button",{type:"submit",className:"btn-primary",children:"Record Expense"})]})]})]}),n.jsx("style",{children:`
        .font-bold { font-weight: 700; }
      `})]})},ih=()=>{const{setActiveDrawer:e,addProduct:t,updateProduct:r,deleteProduct:s,activeModalItem:l,setActiveModalItem:a}=B(),i=!!(l!=null&&l.id),[c,o]=j.useState((l==null?void 0:l.type)||"product"),[p,h]=j.useState((l==null?void 0:l.name)||""),[x,m]=j.useState((l==null?void 0:l.unitType)||"Piece"),[u,v]=j.useState((l==null?void 0:l.pricingUnit)||"Piece"),[N,S]=j.useState((l==null?void 0:l.pricePerUnit)??100),[f,d]=j.useState((l==null?void 0:l.costPerUnit)??50),[g,b]=j.useState((l==null?void 0:l.quantity)??10),[P,z]=j.useState((l==null?void 0:l.alertThreshold)??5),[w,C]=j.useState((l==null?void 0:l.notes)||"");j.useEffect(()=>{l&&(o(l.type||"product"),h(l.name||""),m(l.unitType||"Piece"),v(l.pricingUnit||"Piece"),S(l.pricePerUnit??100),d(l.costPerUnit??50),b(l.quantity??10),z(l.alertThreshold??5),C(l.notes||""))},[l]);const V=()=>{a(null),e(null)},R=$=>{if($.preventDefault(),!p.trim())return alert("Please enter item name.");const ve={name:p,type:c,unitType:x,pricingUnit:u,pricePerUnit:Number(N),costPerUnit:Number(f),quantity:Number(g),alertThreshold:Number(P),notes:w};i?r(l.id,ve):t(ve),V()},Y=()=>{window.confirm(`Are you sure you want to delete ${p}?`)&&(s(l.id),V())};return n.jsxs("div",{className:"drawer-backdrop",onClick:V,children:[n.jsxs("div",{className:"drawer-panel",onClick:$=>$.stopPropagation(),children:[n.jsxs("div",{className:"drawer-header",children:[n.jsxs("div",{children:[n.jsx("h3",{children:i?"Edit Item":"Add Item"}),n.jsx("p",{children:i?"Modify product details, pricing, and stock.":"Create a product for inventory or a service for invoicing."})]}),n.jsx("button",{className:"icon-btn",onClick:V,children:n.jsx(me,{size:18})})]}),n.jsxs("form",{onSubmit:R,className:"drawer-body",children:[n.jsxs("div",{className:"segmented-control",children:[n.jsx("button",{type:"button",className:`segmented-btn ${c==="product"?"active":""}`,onClick:()=>o("product"),children:"Product"}),n.jsx("button",{type:"button",className:`segmented-btn ${c==="service"?"active":""}`,onClick:()=>o("service"),children:"Service"})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Item Name *"}),n.jsx("input",{type:"text",className:"form-control",placeholder:"e.g. Rabies Vaccine",value:p,onChange:$=>h($.target.value),required:!0})]}),n.jsxs("div",{className:"form-row",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Unit Type"}),n.jsxs("select",{className:"form-control",value:x,onChange:$=>m($.target.value),children:[n.jsx("option",{value:"Piece",children:"Piece"}),n.jsx("option",{value:"Box",children:"Box"}),n.jsx("option",{value:"Session",children:"Session"}),n.jsx("option",{value:"Vial",children:"Vial"})]})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Pricing Unit"}),n.jsxs("select",{className:"form-control",value:u,onChange:$=>v($.target.value),children:[n.jsx("option",{value:"Piece",children:"Piece"}),n.jsx("option",{value:"Box",children:"Box"}),n.jsx("option",{value:"Session",children:"Session"}),n.jsx("option",{value:"Vial",children:"Vial"})]})]})]}),n.jsxs("div",{className:"form-row",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Price per Unit (EGP)"}),n.jsx("input",{type:"number",className:"form-control",value:N,onChange:$=>S($.target.value)})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Cost per Unit (EGP)"}),n.jsx("input",{type:"number",className:"form-control",value:f,onChange:$=>d($.target.value)})]})]}),c==="product"&&n.jsxs("div",{className:"form-row",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Stock Quantity"}),n.jsx("input",{type:"number",className:"form-control",value:g,onChange:$=>b($.target.value)})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Low Stock Alert"}),n.jsx("input",{type:"number",className:"form-control",value:P,onChange:$=>z($.target.value)})]})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Notes (Optional)"}),n.jsx("textarea",{className:"form-control",rows:"3",value:w,onChange:$=>C($.target.value)})]}),n.jsxs("div",{className:"drawer-footer margin-top-auto flex justify-between align-center",children:[i?n.jsxs("button",{type:"button",className:"btn-secondary text-red",onClick:Y,children:[n.jsx(Xt,{size:16})," Delete"]}):n.jsx("div",{}),n.jsxs("div",{className:"flex gap-sm",children:[n.jsx("button",{type:"button",className:"btn-secondary",onClick:V,children:"Cancel"}),n.jsx("button",{type:"submit",className:"btn-primary",children:i?"Save Changes":"Save"})]})]})]})]}),n.jsx("style",{children:`
        .segmented-control {
          display: flex;
          background: #f1f5f9;
          padding: 4px;
          border-radius: var(--radius-sm);
        }
        .segmented-btn {
          flex: 1;
          padding: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-muted);
          border-radius: var(--radius-sm);
        }
        .segmented-btn.active {
          background: #ffffff;
          color: var(--text-main);
          box-shadow: var(--shadow-sm);
        }
        .gap-sm { gap: 8px; }
        .text-red { color: #dc2626; }
      `})]})},kl=({targetType:e="clients"})=>{const{setActiveDrawer:t,importClientsData:r,importPetsData:s,importProductsData:l,importFullBackup:a,clients:i,pets:c,visits:o,products:p,invoices:h,settings:x}=B(),[m,u]=j.useState(""),[v,N]=j.useState(""),[S,f]=j.useState("csv"),d=b=>{const P=b.target.files[0];if(!P)return;N(P.name);const z=P.name.endsWith(".json");f(z?"json":"csv");const w=new FileReader;w.onload=C=>{u(C.target.result)},w.readAsText(P)},g=()=>{if(!m)return alert("Please select a file to import.");try{if(S==="json"){const P=JSON.parse(m);a(P),t(null);return}const b=$f(m);if(!b.length)return alert("CSV file is empty or could not be parsed.");e==="clients"?r(b):e==="pets"?s(b):e==="products"?l(b):r(b),t(null)}catch(b){alert(`Import error: ${b.message}`)}};return n.jsxs("div",{className:"drawer-backdrop",onClick:()=>t(null),children:[n.jsxs("div",{className:"drawer-panel",onClick:b=>b.stopPropagation(),children:[n.jsxs("div",{className:"drawer-header",children:[n.jsxs("div",{children:[n.jsxs("h3",{children:["Import Data (",e.toUpperCase(),")"]}),n.jsx("p",{children:"Upload CSV or JSON files from another clinic system to import data."})]}),n.jsx("button",{className:"icon-btn",onClick:()=>t(null),children:n.jsx(me,{size:18})})]}),n.jsxs("div",{className:"drawer-body",children:[n.jsxs("div",{className:"upload-dropzone",children:[n.jsx(Sr,{size:32,className:"text-teal"}),n.jsx("p",{className:"font-semibold margin-top-xs",children:"Click to browse or drop CSV / JSON file"}),n.jsx("span",{className:"text-xs text-muted",children:"Supports CSV rows or Full Petution JSON backups"}),n.jsx("input",{type:"file",accept:".csv,.json",onChange:d,className:"file-input-hidden"})]}),v&&n.jsxs("div",{className:"file-preview-card card margin-top-md flex align-center gap-md",children:[n.jsx(pi,{size:24,className:"text-teal"}),n.jsxs("div",{className:"flex-1",children:[n.jsx("div",{className:"font-semibold text-sm",children:v}),n.jsxs("div",{className:"text-xs text-muted",children:["Format: ",S.toUpperCase()]})]}),n.jsx(Bd,{size:18,className:"text-green"})]}),n.jsxs("div",{className:"margin-top-md card info-card",children:[n.jsx("h5",{className:"font-semibold",children:"Sample CSV Column Headers"}),n.jsxs("p",{className:"text-xs text-muted margin-top-xs",children:[e==="clients"&&"name, phone, governorate, district, street, tags",e==="pets"&&"name, species, breed, ageValue, ageUnit, vaccinated",e==="products"&&"name, type, pricePerUnit, costPerUnit, quantity"]})]}),n.jsxs("div",{className:"drawer-footer margin-top-auto",children:[n.jsx("button",{className:"btn-secondary",onClick:()=>t(null),children:"Cancel"}),n.jsx("button",{className:"btn-primary",onClick:g,disabled:!m,children:"Import Records"})]})]})]}),n.jsx("style",{children:`
        .upload-dropzone {
          border: 2px dashed var(--border-card);
          border-radius: var(--radius-md);
          padding: 32px;
          text-align: center;
          background: #f8fafc;
          position: relative;
          cursor: pointer;
          transition: border 0.15s ease;
        }

        .upload-dropzone:hover {
          border-color: var(--primary-teal);
        }

        .file-input-hidden {
          position: absolute;
          inset: 0;
          opacity: 0;
          cursor: pointer;
        }

        .file-preview-card {
          padding: 12px 16px;
        }

        .info-card {
          background: #f1f5f9;
          padding: 12px 16px;
        }
      `})]})},oh=()=>{const{setActiveDrawer:e,inviteMember:t}=B(),[r,s]=j.useState(""),[l,a]=j.useState(""),[i,c]=j.useState("Vet"),o=p=>{if(p.preventDefault(),!r.trim()||!l.trim())return alert("Please fill in name and email address.");t({name:r,email:l,role:i}),alert(`Invitation sent to ${l} as ${i}!`),e(null)};return n.jsx("div",{className:"drawer-backdrop",onClick:()=>e(null),children:n.jsxs("div",{className:"drawer-panel",onClick:p=>p.stopPropagation(),children:[n.jsxs("div",{className:"drawer-header",children:[n.jsxs("div",{children:[n.jsx("h3",{children:"Invite Team Member"}),n.jsx("p",{children:"Send an invitation to join Petution clinic workspace."})]}),n.jsx("button",{className:"icon-btn",onClick:()=>e(null),children:n.jsx(me,{size:18})})]}),n.jsxs("form",{onSubmit:o,className:"drawer-body",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Member Full Name *"}),n.jsx("input",{type:"text",className:"form-control",placeholder:"e.g. Dr. Sarah Mahmoud",value:r,onChange:p=>s(p.target.value),required:!0})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Email Address *"}),n.jsx("input",{type:"email",className:"form-control",placeholder:"sarah@clinic.com",value:l,onChange:p=>a(p.target.value),required:!0})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Assign Role *"}),n.jsxs("select",{className:"form-control",value:i,onChange:p=>c(p.target.value),children:[n.jsx("option",{value:"Vet",children:"Vet / Practitioner"}),n.jsx("option",{value:"Receptionist",children:"Receptionist / Staff"}),n.jsx("option",{value:"Admin",children:"Billing Admin"}),n.jsx("option",{value:"Owner",children:"Co-Owner"})]})]}),n.jsxs("div",{className:"drawer-footer margin-top-auto",children:[n.jsx("button",{type:"button",className:"btn-secondary",onClick:()=>e(null),children:"Cancel"}),n.jsx("button",{type:"submit",className:"btn-primary",children:"Send Invitation"})]})]})]})})},ch=({petId:e})=>{var x,m;const{setActiveDrawer:t,pets:r,clients:s,vaccines:l,deleteVaccine:a,settings:i}=B(),c=r.find(u=>u.id===e)||r[0],o=s.find(u=>{var v;return(v=c==null?void 0:c.owners)==null?void 0:v.includes(u.id)}),p=l.filter(u=>u.petId===(c==null?void 0:c.id)),h=()=>{window.print()};return c?n.jsxs("div",{className:"drawer-backdrop",onClick:()=>t(null),children:[n.jsxs("div",{className:"drawer-panel passport-panel",onClick:u=>u.stopPropagation(),children:[n.jsxs("div",{className:"drawer-header no-print",children:[n.jsxs("div",{children:[n.jsxs("h3",{className:"flex items-center gap-xs",children:[n.jsx(Hs,{size:20,className:"text-teal"})," Digital Pet Passport & Vaccine Card"]}),n.jsx("p",{children:"Official immunization record and medical identity passport."})]}),n.jsxs("div",{className:"flex gap-xs",children:[n.jsxs("button",{className:"btn-secondary text-xs flex items-center gap-xs",onClick:h,children:[n.jsx(fi,{size:16})," Print Passport"]}),n.jsx("button",{className:"icon-btn",onClick:()=>t(null),children:n.jsx(me,{size:18})})]})]}),n.jsx("div",{className:"drawer-body passport-body",children:n.jsxs("div",{className:"passport-card",children:[n.jsxs("div",{className:"passport-clinic-header",children:[n.jsxs("div",{className:"flex items-center gap-sm",children:[n.jsx("div",{className:"passport-logo-circle",children:"🐾"}),n.jsxs("div",{children:[n.jsx("h2",{className:"font-bold text-lg",children:i.orgName||"Petution Veterinary Center"}),n.jsxs("p",{className:"text-xs opacity-90",children:[i.address||"Cairo, Egypt"," • ",i.phone||"+20 100 000 0000"]})]})]}),n.jsx("div",{className:"passport-badge-tag",children:"OFFICIAL VACCINE PASSPORT"})]}),n.jsxs("div",{className:"passport-identity-grid",children:[n.jsx("div",{className:"pet-photo-avatar",children:n.jsx("span",{children:c.species==="dog"?"🐶":c.species==="cat"?"🐱":"🐾"})}),n.jsxs("div",{className:"pet-main-details",children:[n.jsx("h3",{className:"font-bold text-xl",children:c.name}),n.jsxs("p",{className:"text-xs text-muted",children:[c.species.toUpperCase()," • ",c.breed||"Cross Breed"," • ",c.gender.toUpperCase()]}),n.jsxs("div",{className:"passport-tags-row margin-top-xs",children:[n.jsxs("span",{className:"passport-tag",children:[n.jsx(Wd,{size:12})," Chip: ",c.microchipNumber||"Not Chipped"]}),n.jsxs("span",{className:"passport-tag",children:["Blood: ",c.bloodGroup||"Unspecified"]}),n.jsxs("span",{className:"passport-tag",children:["Neutered: ",c.castrated?"Yes":"No"]})]})]}),n.jsxs("div",{className:"owner-side-info border-left pl-md",children:[n.jsx("span",{className:"text-xs text-muted block",children:"REGISTERED OWNER"}),n.jsx("span",{className:"font-semibold text-sm block",children:o?o.name:"Unassigned"}),n.jsx("span",{className:"text-xs text-muted block margin-top-xs",children:((m=(x=o==null?void 0:o.phones)==null?void 0:x[0])==null?void 0:m.phone)||"No phone"}),n.jsxs("span",{className:"text-xs text-muted block",children:["Card #: ",c.cardNo||"CRD-AUTO"]})]})]}),n.jsxs("div",{className:"passport-section-title flex justify-between items-center margin-top-lg",children:[n.jsxs("h4",{className:"font-bold flex items-center gap-xs text-sm",children:[n.jsx(Bs,{size:16,className:"text-teal"})," Immunization & Vaccination History"]}),n.jsxs("button",{className:"btn-primary text-xs no-print",onClick:()=>t("addVaccine"),children:[n.jsx(rt,{size:14})," Record Vaccine Shot"]})]}),n.jsxs("table",{className:"passport-table margin-top-sm",children:[n.jsx("thead",{children:n.jsxs("tr",{children:[n.jsx("th",{children:"Date Given"}),n.jsx("th",{children:"Vaccine Name & Manufacturer"}),n.jsx("th",{children:"Batch / Serial #"}),n.jsx("th",{children:"Next Due Date"}),n.jsx("th",{children:"Administered By"}),n.jsx("th",{className:"no-print",children:"Action"})]})}),n.jsx("tbody",{children:p.length===0?n.jsx("tr",{children:n.jsx("td",{colSpan:"6",className:"empty-state",children:'No immunization records logged yet. Click "+ Record Vaccine Shot" to add doses.'})}):p.map(u=>n.jsxs("tr",{children:[n.jsx("td",{className:"font-semibold",children:u.administeredDate}),n.jsxs("td",{children:[n.jsx("div",{className:"font-bold text-sm",children:u.vaccineName}),n.jsx("span",{className:"text-xs text-muted",children:u.manufacturer||"Authorized Vet Spec"})]}),n.jsx("td",{className:"font-mono text-xs",children:u.batchNumber||"N/A"}),n.jsx("td",{children:n.jsxs("span",{className:"badge badge-amber text-xs font-semibold",children:[n.jsx($s,{size:12})," ",u.dueDate||"1 Year"]})}),n.jsx("td",{className:"text-xs",children:u.vetName||"Dr. Khaled ElGendy"}),n.jsx("td",{className:"no-print",children:n.jsx("button",{className:"icon-btn text-rose",title:"Delete Vaccine Record",onClick:()=>{confirm(`Delete vaccine record for ${u.vaccineName}?`)&&a(u.id)},children:n.jsx(Xt,{size:14})})})]},u.id))})]}),n.jsxs("div",{className:"passport-footer-stamp margin-top-xl",children:[n.jsx("div",{children:n.jsx("div",{className:"stamp-box",children:"CLINIC OFFICIAL STAMP"})}),n.jsxs("div",{className:"text-right",children:[n.jsx("div",{className:"sig-line",children:"Dr. Khaled ElGendy, DVM"}),n.jsx("span",{className:"text-xs text-muted",children:"Licensed Veterinary Surgeon"})]})]})]})})]}),n.jsx("style",{children:`
        .passport-panel { max-width: 720px; }
        .passport-card {
          background: #ffffff;
          border: 2px solid #e2e8f0;
          border-radius: var(--radius-md);
          padding: 24px;
        }
        .passport-clinic-header {
          background: var(--primary-teal);
          color: #ffffff;
          padding: 16px 20px;
          border-radius: var(--radius-md);
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .passport-logo-circle {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.4rem;
        }
        .passport-badge-tag {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          background: rgba(255, 255, 255, 0.25);
          padding: 4px 10px;
          border-radius: 9999px;
        }
        .passport-identity-grid {
          display: flex;
          gap: 16px;
          background: #f8fafc;
          padding: 16px;
          border-radius: var(--radius-md);
          border: 1px solid #e2e8f0;
        }
        .pet-photo-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: #e2e8f0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          flex-shrink: 0;
        }
        .pet-main-details { flex: 1; }
        .passport-tags-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .passport-tag {
          font-size: 0.7rem;
          font-weight: 600;
          background: #ffffff;
          border: 1px solid #cbd5e1;
          padding: 2px 8px;
          border-radius: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .border-left { border-left: 1px solid #cbd5e1; }
        .pl-md { padding-left: 16px; }
        .passport-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.85rem;
        }
        .passport-table th {
          background: #f1f5f9;
          text-align: left;
          padding: 8px 10px;
          font-size: 0.75rem;
          color: var(--text-muted);
          border-bottom: 2px solid #cbd5e1;
        }
        .passport-table td {
          padding: 10px;
          border-bottom: 1px solid #e2e8f0;
        }
        .passport-footer-stamp {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-top: 20px;
          border-top: 2px dashed #cbd5e1;
        }
        .stamp-box {
          width: 140px;
          height: 60px;
          border: 2px dashed var(--primary-teal);
          color: var(--primary-teal);
          font-size: 0.65rem;
          font-weight: 800;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-sm);
        }
        .sig-line {
          font-weight: 700;
          font-size: 0.9rem;
          border-top: 1px solid #000;
          padding-top: 4px;
          min-width: 180px;
        }
        @media print {
          .no-print { display: none !important; }
          .drawer-backdrop { background: none; position: static; }
          .drawer-panel { max-width: 100%; box-shadow: none; border: none; }
          body { background: #ffffff; }
        }
      `})]}):null},dh=()=>{var z;const{setActiveDrawer:e,pets:t,addVaccine:r}=B(),[s,l]=j.useState(((z=t[0])==null?void 0:z.id)||""),[a,i]=j.useState("Tricat Trio (FVRCP)"),[c,o]=j.useState("Zoetis"),[p,h]=j.useState(""),[x,m]=j.useState(new Date().toISOString().split("T")[0]),u=new Date;u.setFullYear(u.getFullYear()+1);const[v,N]=j.useState(u.toISOString().split("T")[0]),[S,f]=j.useState("Dr. Khaled ElGendy"),[d,g]=j.useState(""),b=["Tricat Trio (FVRCP)","Rabies Vaccine (Rabisin)","Vanguard 7 (DHPP + L4)","Nobivac DHPPi","Nobivac KC (Kennel Cough)","Fel-O-Vax PCT","Deworming Tablet (Drontal)","Other"],P=w=>{if(w.preventDefault(),!s||!a.trim())return alert("Please select a pet and vaccine name.");r({petId:s,vaccineName:a,manufacturer:c,batchNumber:p,administeredDate:x,dueDate:v,vetName:S,notes:d}),e("petPassport")};return n.jsxs("div",{className:"drawer-backdrop",onClick:()=>e("petPassport"),children:[n.jsxs("div",{className:"drawer-panel",onClick:w=>w.stopPropagation(),children:[n.jsxs("div",{className:"drawer-header",children:[n.jsxs("div",{children:[n.jsxs("h3",{className:"flex items-center gap-xs",children:[n.jsx(Hs,{size:20,className:"text-teal"})," Record Vaccine Shot"]}),n.jsx("p",{children:"Log dose administration, manufacturer batch #, and next due date."})]}),n.jsx("button",{className:"icon-btn",onClick:()=>e("petPassport"),children:n.jsx(me,{size:18})})]}),n.jsxs("form",{onSubmit:P,className:"drawer-body",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Select Patient / Pet *"}),n.jsx("select",{className:"form-control",value:s,onChange:w=>l(w.target.value),required:!0,children:t.map(w=>n.jsxs("option",{value:w.id,children:[w.name," (",w.species.toUpperCase()," • ",w.breed||"Cross",")"]},w.id))})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Vaccine Name *"}),n.jsx("select",{className:"form-control",value:a,onChange:w=>i(w.target.value),children:b.map(w=>n.jsx("option",{value:w,children:w},w))})]}),n.jsxs("div",{className:"form-row",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Manufacturer"}),n.jsx("input",{type:"text",className:"form-control",placeholder:"e.g. Zoetis, Boehringer",value:c,onChange:w=>o(w.target.value)})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Batch / Serial #"}),n.jsx("input",{type:"text",className:"form-control font-mono",placeholder:"e.g. ZT-99210",value:p,onChange:w=>h(w.target.value)})]})]}),n.jsxs("div",{className:"form-row",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Date Administered *"}),n.jsx("input",{type:"date",className:"form-control",value:x,onChange:w=>m(w.target.value),required:!0})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Next Due Date (Booster) *"}),n.jsx("input",{type:"date",className:"form-control",value:v,onChange:w=>N(w.target.value),required:!0})]})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Administering Vet"}),n.jsx("input",{type:"text",className:"form-control",value:S,onChange:w=>f(w.target.value)})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Clinical Notes / Observation"}),n.jsx("textarea",{className:"form-control",rows:"2",placeholder:"Observation after injection, booster notes...",value:d,onChange:w=>g(w.target.value)})]}),n.jsxs("div",{className:"drawer-footer margin-top-auto",children:[n.jsx("button",{type:"button",className:"btn-secondary",onClick:()=>e("petPassport"),children:"Back to Passport"}),n.jsx("button",{type:"submit",className:"btn-primary",children:"Log Vaccine Dose"})]})]})]}),n.jsx("style",{children:`
        .font-mono { font-family: monospace; }
      `})]})},uh=({visitId:e})=>{const{setActiveDrawer:t,visits:r,pets:s,clients:l,soapNotes:a,saveSOAPNote:i,settings:c}=B(),o=r.find(O=>O.id===e)||r[0],p=s.find(O=>O.id===(o==null?void 0:o.petId)),h=l.find(O=>{var T;return(T=p==null?void 0:p.owners)==null?void 0:T.includes(O.id)}),x=a.find(O=>O.visitId===(o==null?void 0:o.id)),[m,u]=j.useState((x==null?void 0:x.subjective)||(o==null?void 0:o.reason)||""),[v,N]=j.useState((x==null?void 0:x.tempC)||38.5),[S,f]=j.useState((x==null?void 0:x.weightKg)||4.2),[d,g]=j.useState((x==null?void 0:x.heartRateBpm)||120),[b,P]=j.useState((x==null?void 0:x.respiratoryRateBpm)||24),[z,w]=j.useState((x==null?void 0:x.assessment)||""),[C,V]=j.useState((x==null?void 0:x.plan)||""),[R,Y]=j.useState((x==null?void 0:x.rxMedications)||[{name:"Amoxicillin Drops 100mg/ml",dosage:"0.5 ml",frequency:"Twice daily (BID)",duration:"7 days"}]),$=()=>{Y(O=>[...O,{name:"",dosage:"",frequency:"Once daily (SID)",duration:"5 days"}])},ve=O=>{Y(T=>T.filter((M,L)=>L!==O))},$e=(O,T,M)=>{Y(L=>L.map((H,Z)=>Z===O?{...H,[T]:M}:H))},gt=O=>{O&&O.preventDefault(),i({id:x==null?void 0:x.id,visitId:o==null?void 0:o.id,petId:p==null?void 0:p.id,vetName:(o==null?void 0:o.doctorName)||"Dr. Khaled ElGendy",date:(o==null?void 0:o.date)||new Date().toISOString().split("T")[0],subjective:m,tempC:Number(v)||0,weightKg:Number(S)||0,heartRateBpm:Number(d)||0,respiratoryRateBpm:Number(b)||0,assessment:z,plan:C,rxMedications:R}),alert("SOAP Clinical Note & Prescriptions saved successfully!"),t(null)},st=()=>{window.print()};return!o||!p?null:n.jsxs("div",{className:"drawer-backdrop",onClick:()=>t(null),children:[n.jsxs("div",{className:"drawer-panel soap-panel",onClick:O=>O.stopPropagation(),children:[n.jsxs("div",{className:"drawer-header no-print",children:[n.jsxs("div",{children:[n.jsxs("h3",{className:"flex items-center gap-xs",children:[n.jsx(Af,{size:20,className:"text-teal"})," SOAP Medical Record & Rx Prescriptions"]}),n.jsxs("p",{children:["Clinical consultation notes for ",p.name," (",p.species.toUpperCase(),")."]})]}),n.jsxs("div",{className:"flex gap-xs",children:[n.jsxs("button",{className:"btn-secondary text-xs flex items-center gap-xs",onClick:st,children:[n.jsx(fi,{size:16})," Print Prescription (Rx)"]}),n.jsx("button",{className:"icon-btn",onClick:()=>t(null),children:n.jsx(me,{size:18})})]})]}),n.jsx("div",{className:"drawer-body soap-body",children:n.jsxs("div",{className:"rx-printable-card",children:[n.jsx("div",{className:"rx-header",children:n.jsxs("div",{className:"flex justify-between items-center",children:[n.jsxs("div",{children:[n.jsx("h2",{className:"font-bold text-lg",children:c.orgName||"Petution Veterinary Center"}),n.jsxs("p",{className:"text-xs text-muted",children:[c.address||"Cairo, Egypt"," • Tel: ",c.phone||"+20 100 000 000"]})]}),n.jsx("div",{className:"rx-symbol",children:"℞"})]})}),n.jsxs("div",{className:"rx-patient-bar margin-top-sm margin-bottom-md",children:[n.jsxs("div",{className:"flex justify-between text-xs",children:[n.jsxs("span",{children:[n.jsx("strong",{children:"Patient:"})," ",p.name," (",p.species," • ",p.breed||"Cross",")"]}),n.jsxs("span",{children:[n.jsx("strong",{children:"Owner:"})," ",h?h.name:"Unassigned"]}),n.jsxs("span",{children:[n.jsx("strong",{children:"Date:"})," ",o.date]})]}),n.jsxs("div",{className:"flex justify-between text-xs margin-top-xs",children:[n.jsxs("span",{children:[n.jsx("strong",{children:"Weight:"})," ",S," kg"]}),n.jsxs("span",{children:[n.jsx("strong",{children:"Temp:"})," ",v," °C"]}),n.jsxs("span",{children:[n.jsx("strong",{children:"Vet:"})," ",o.doctorName||"Dr. Khaled ElGendy"]})]})]}),n.jsxs("form",{onSubmit:gt,className:"soap-form",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{className:"font-bold text-teal text-xs",children:"S — SUBJECTIVE (Client Complaint & History)"}),n.jsx("textarea",{className:"form-control",rows:"2",placeholder:"Primary complaint, duration of symptoms, appetite, energy...",value:m,onChange:O=>u(O.target.value)})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{className:"font-bold text-teal text-xs",children:"O — OBJECTIVE (Vitals & Physical Exam)"}),n.jsxs("div",{className:"vitals-grid",children:[n.jsxs("div",{children:[n.jsx("span",{className:"text-xs text-muted",children:"Temp (°C)"}),n.jsx("input",{type:"number",step:"0.1",className:"form-control font-bold",value:v,onChange:O=>N(O.target.value)})]}),n.jsxs("div",{children:[n.jsx("span",{className:"text-xs text-muted",children:"Weight (kg)"}),n.jsx("input",{type:"number",step:"0.1",className:"form-control font-bold",value:S,onChange:O=>f(O.target.value)})]}),n.jsxs("div",{children:[n.jsx("span",{className:"text-xs text-muted",children:"Heart Rate (bpm)"}),n.jsx("input",{type:"number",className:"form-control",value:d,onChange:O=>g(O.target.value)})]}),n.jsxs("div",{children:[n.jsx("span",{className:"text-xs text-muted",children:"Resp Rate (rpm)"}),n.jsx("input",{type:"number",className:"form-control",value:b,onChange:O=>P(O.target.value)})]})]})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{className:"font-bold text-teal text-xs",children:"A — ASSESSMENT (Diagnosis & Findings)"}),n.jsx("textarea",{className:"form-control",rows:"2",placeholder:"Primary diagnosis, tentative diagnosis, differential findings...",value:z,onChange:O=>w(O.target.value)})]}),n.jsxs("div",{className:"form-group",children:[n.jsxs("div",{className:"flex justify-between items-center margin-bottom-xs",children:[n.jsx("label",{className:"font-bold text-teal text-xs",children:"P — PLAN & PRESCRIPTION MEDICATIONS (Rx)"}),n.jsxs("button",{type:"button",className:"btn-secondary text-xs no-print",onClick:$,children:[n.jsx(rt,{size:14})," Add Medication"]})]}),n.jsx("div",{className:"rx-items-stack",children:R.map((O,T)=>n.jsxs("div",{className:"rx-item-row card",children:[n.jsxs("div",{className:"form-row",children:[n.jsxs("div",{className:"form-group flex-2",children:[n.jsx("label",{className:"text-xs",children:"Medication Name"}),n.jsx("input",{type:"text",className:"form-control text-xs font-bold",placeholder:"e.g. Amoxicillin Drops",value:O.name,onChange:M=>$e(T,"name",M.target.value)})]}),n.jsxs("div",{className:"form-group flex-1",children:[n.jsx("label",{className:"text-xs",children:"Dosage"}),n.jsx("input",{type:"text",className:"form-control text-xs",placeholder:"e.g. 0.5 ml",value:O.dosage,onChange:M=>$e(T,"dosage",M.target.value)})]})]}),n.jsxs("div",{className:"form-row margin-top-xs",children:[n.jsxs("div",{className:"form-group flex-1",children:[n.jsx("label",{className:"text-xs",children:"Frequency"}),n.jsxs("select",{className:"form-control text-xs",value:O.frequency,onChange:M=>$e(T,"frequency",M.target.value),children:[n.jsx("option",{value:"Once daily (SID)",children:"Once daily (SID)"}),n.jsx("option",{value:"Twice daily (BID)",children:"Twice daily (BID)"}),n.jsx("option",{value:"Three times daily (TID)",children:"Three times daily (TID)"}),n.jsx("option",{value:"Every 8 hours",children:"Every 8 hours"}),n.jsx("option",{value:"As needed (PRN)",children:"As needed (PRN)"})]})]}),n.jsxs("div",{className:"form-group flex-1",children:[n.jsx("label",{className:"text-xs",children:"Duration"}),n.jsx("input",{type:"text",className:"form-control text-xs",placeholder:"e.g. 7 days",value:O.duration,onChange:M=>$e(T,"duration",M.target.value)})]}),n.jsx("div",{className:"form-group flex-0 no-print",style:{justifyContent:"flex-end",paddingTop:"22px"},children:n.jsx("button",{type:"button",className:"icon-btn text-rose",onClick:()=>ve(T),children:n.jsx(Xt,{size:14})})})]})]},T))}),n.jsxs("div",{className:"form-group margin-top-sm",children:[n.jsx("label",{className:"text-xs text-muted",children:"Additional Treatment Plan & Advice"}),n.jsx("textarea",{className:"form-control",rows:"2",placeholder:"Dietary instructions, follow-up recommendations...",value:C,onChange:O=>V(O.target.value)})]})]}),n.jsx("div",{className:"rx-footer-sig margin-top-lg",children:n.jsxs("div",{className:"text-right",children:[n.jsx("div",{className:"sig-line-doctor",children:o.doctorName||"Dr. Khaled ElGendy"}),n.jsx("span",{className:"text-xs text-muted",children:"Veterinary Surgeon Signature"})]})}),n.jsxs("div",{className:"drawer-footer margin-top-lg no-print",children:[n.jsx("button",{type:"button",className:"btn-secondary",onClick:()=>t(null),children:"Cancel"}),n.jsx("button",{type:"submit",className:"btn-primary",children:"Save SOAP Record & Rx"})]})]})]})})]}),n.jsx("style",{children:`
        .soap-panel { max-width: 760px; }
        .rx-printable-card {
          background: #ffffff;
          border: 1px solid var(--border-card);
          border-radius: var(--radius-md);
          padding: 20px;
        }
        .rx-header {
          border-bottom: 2px solid var(--primary-teal);
          padding-bottom: 12px;
        }
        .rx-symbol {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--primary-teal);
          font-family: serif;
        }
        .rx-patient-bar {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 10px 14px;
          border-radius: var(--radius-sm);
        }
        .vitals-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
        }
        .rx-items-stack {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .rx-item-row {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 12px;
        }
        .flex-2 { flex: 2; }
        .flex-1 { flex: 1; }
        .flex-0 { flex: 0; }
        .sig-line-doctor {
          font-weight: 700;
          font-size: 0.9rem;
          border-top: 1px solid #000;
          padding-top: 4px;
          display: inline-block;
          min-width: 200px;
        }
        @media print {
          .no-print { display: none !important; }
          .drawer-backdrop { background: none; position: static; }
          .drawer-panel { max-width: 100%; box-shadow: none; border: none; }
          body { background: #ffffff; }
        }
      `})]})},ph=()=>{const[e,t]=j.useState(!1),[r,s]=j.useState(!1),{user:l,logout:a,activeTab:i,setActiveTab:c,activeDrawer:o,setActiveDrawer:p,activeModalItem:h}=B();if(!(l!=null&&l.isAuthenticated))return n.jsx(Uf,{});if(e)return n.jsx(th,{onComplete:()=>t(!1)});const x=()=>{switch(i){case"dashboard":return n.jsx(Po,{});case"clients":return n.jsx(Hf,{});case"pets":return n.jsx(Gf,{});case"visits":return n.jsx(Qf,{});case"invoices":return n.jsx(Kf,{});case"expenses":return n.jsx(Jf,{});case"products":return n.jsx(Yf,{});case"analytics":return n.jsx(Zf,{});case"chats":return n.jsx("div",{className:"page-wrapper",children:n.jsxs("div",{className:"card",children:[n.jsx("h3",{children:"WhatsApp Messaging Hub"}),n.jsx("p",{className:"text-muted margin-top-xs",children:"Integrated clinic chat system ready for WhatsApp API configuration."})]})});case"team":return n.jsx(Xf,{});case"billing":return n.jsx("div",{className:"page-wrapper",children:n.jsxs("div",{className:"card",children:[n.jsx("h3",{children:"Billing & Subscription"}),n.jsx("p",{className:"text-muted margin-top-xs",children:"Subscription and billing management coming soon."})]})});case"settings":return n.jsx(eh,{});case"help":return n.jsx("div",{className:"page-wrapper",children:n.jsxs("div",{className:"card",children:[n.jsx("h3",{children:"Support & Help Center"}),n.jsx("p",{className:"text-muted margin-top-xs",children:"Search documentation or contact Petution technical support team."})]})});default:return n.jsx(Po,{})}};return n.jsxs("div",{className:"app-container",children:[n.jsx(_f,{activeTab:i,setActiveTab:c,onRegisterClick:()=>t(!0),isMobileOpen:r,onCloseMobile:()=>s(!1)}),n.jsxs("div",{className:"main-content",children:[n.jsx(Rf,{onMenuToggle:()=>s(m=>!m)}),n.jsx("div",{className:"page-wrapper",children:x()})]}),n.jsx(Of,{activeTab:i,setActiveTab:c,onMenuToggle:()=>s(m=>!m)}),o==="addClient"&&n.jsx(nh,{}),o==="addPet"&&n.jsx(rh,{}),o==="addVisit"&&n.jsx(sh,{}),o==="addInvoice"&&n.jsx(lh,{}),o==="addExpense"&&n.jsx(ah,{}),o==="addItem"&&n.jsx(ih,{}),o==="inviteMember"&&n.jsx(oh,{}),o==="importClients"&&n.jsx(kl,{targetType:"clients"}),o==="importPets"&&n.jsx(kl,{targetType:"pets"}),o==="importProducts"&&n.jsx(kl,{targetType:"products"}),o==="petPassport"&&n.jsx(ch,{petId:h}),o==="addVaccine"&&n.jsx(dh,{}),o==="soapNote"&&n.jsx(uh,{visitId:h}),o==="profile"&&n.jsx("div",{className:"drawer-backdrop",onClick:()=>p(null),children:n.jsxs("div",{className:"drawer-panel",onClick:m=>m.stopPropagation(),children:[n.jsxs("div",{className:"drawer-header",children:[n.jsxs("div",{children:[n.jsx("h3",{children:"User Account"}),n.jsx("p",{children:"Manage your login credentials, provider, and role settings."})]}),n.jsx("button",{className:"icon-btn",onClick:()=>p(null),children:n.jsx(me,{size:18})})]}),n.jsxs("div",{className:"drawer-body",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Full Name"}),n.jsx("input",{type:"text",className:"form-control font-semibold",value:(l==null?void 0:l.name)||"Khaled ElGendy",readOnly:!0})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Email Address"}),n.jsx("input",{type:"email",className:"form-control",value:(l==null?void 0:l.email)||"khaledahmed94.ka@gmail.com",readOnly:!0})]}),n.jsxs("div",{className:"form-row",children:[n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Workspace Role"}),n.jsx("input",{type:"text",className:"form-control",value:(l==null?void 0:l.role)||"Owner",readOnly:!0})]}),n.jsxs("div",{className:"form-group",children:[n.jsx("label",{children:"Authentication Method"}),n.jsxs("div",{className:"form-control flex items-center gap-xs font-semibold text-xs text-teal",children:[n.jsx(Bs,{size:14})," ",l!=null&&l.provider?l.provider.toUpperCase():"EMAIL"]})]})]}),n.jsxs("div",{className:"margin-top-lg border-top pt-md flex flex-col gap-sm",children:[n.jsx("button",{className:"btn-secondary w-full",onClick:()=>{p(null),t(!0)},children:"Switch / Register Clinic"}),n.jsxs("button",{className:"btn-primary w-full bg-rose text-white",style:{background:"#e11d48",borderColor:"#e11d48"},onClick:()=>{p(null),a()},children:[n.jsx(Sf,{size:16})," Sign Out of Petution"]})]})]})]})})]})};function mh(){return n.jsx(df,{children:n.jsx(ph,{})})}bl.createRoot(document.getElementById("root")).render(n.jsx(Lo.StrictMode,{children:n.jsx(mh,{})}));
