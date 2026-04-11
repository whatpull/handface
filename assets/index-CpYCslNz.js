var ng=Object.defineProperty;var ig=(t,e,n)=>e in t?ng(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var ht=(t,e,n)=>ig(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const vu="183",rg=0,Vh=1,sg=2,so=1,ag=2,js=3,tr=0,pn=1,Ai=2,Li=0,es=1,Gh=2,Hh=3,Wh=4,og=5,gr=100,cg=101,lg=102,ug=103,hg=104,fg=200,dg=201,pg=202,mg=203,al=204,ol=205,gg=206,_g=207,vg=208,xg=209,Mg=210,Sg=211,Eg=212,yg=213,bg=214,cl=0,ll=1,ul=2,ss=3,hl=4,fl=5,dl=6,pl=7,xu=0,Tg=1,Ag=2,oi=0,tp=1,np=2,ip=3,rp=4,sp=5,ap=6,op=7,cp=300,wr=301,as=302,uc=303,hc=304,Lo=306,ml=1e3,Ci=1001,gl=1002,Kt=1003,wg=1004,wa=1005,nn=1006,fc=1007,vr=1008,bn=1009,lp=1010,up=1011,sa=1012,Mu=1013,ui=1014,ri=1015,Di=1016,Su=1017,Eu=1018,aa=1020,hp=35902,fp=35899,dp=1021,pp=1022,Yn=1023,Ui=1026,xr=1027,mp=1028,yu=1029,os=1030,bu=1031,Tu=1033,ao=33776,oo=33777,co=33778,lo=33779,_l=35840,vl=35841,xl=35842,Ml=35843,Sl=36196,El=37492,yl=37496,bl=37488,Tl=37489,Al=37490,wl=37491,Rl=37808,Cl=37809,Pl=37810,Ll=37811,Il=37812,Dl=37813,Ul=37814,Nl=37815,Fl=37816,Ol=37817,Bl=37818,kl=37819,zl=37820,Vl=37821,Gl=36492,Hl=36494,Wl=36495,Xl=36283,ql=36284,Yl=36285,$l=36286,Rg=3200,gp=0,Cg=1,Zi="",On="srgb",cs="srgb-linear",go="linear",st="srgb",Fr=7680,Xh=519,Pg=512,Lg=513,Ig=514,Au=515,Dg=516,Ug=517,wu=518,Ng=519,qh=35044,Yh="300 es",si=2e3,oa=2001;function Fg(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function _o(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function Og(){const t=_o("canvas");return t.style.display="block",t}const $h={};function jh(...t){const e="THREE."+t.shift();console.log(e,...t)}function _p(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function Fe(...t){t=_p(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function Qe(...t){t=_p(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function vo(...t){const e=t.join(" ");e in $h||($h[e]=!0,Fe(...t))}function Bg(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const kg={[cl]:ll,[ul]:dl,[hl]:pl,[ss]:fl,[ll]:cl,[dl]:ul,[pl]:hl,[fl]:ss};class Es{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],dc=Math.PI/180,jl=180/Math.PI;function pa(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Qt[t&255]+Qt[t>>8&255]+Qt[t>>16&255]+Qt[t>>24&255]+"-"+Qt[e&255]+Qt[e>>8&255]+"-"+Qt[e>>16&15|64]+Qt[e>>24&255]+"-"+Qt[n&63|128]+Qt[n>>8&255]+"-"+Qt[n>>16&255]+Qt[n>>24&255]+Qt[i&255]+Qt[i>>8&255]+Qt[i>>16&255]+Qt[i>>24&255]).toLowerCase()}function qe(t,e,n){return Math.max(e,Math.min(n,t))}function zg(t,e){return(t%e+e)%e}function pc(t,e,n){return(1-n)*t+n*e}function zs(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function hn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}class $e{constructor(e=0,n=0){$e.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=qe(this.x,e.x,n.x),this.y=qe(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=qe(this.x,e,n),this.y=qe(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ys{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,a,o){let c=i[r+0],l=i[r+1],h=i[r+2],f=i[r+3],u=s[a+0],m=s[a+1],_=s[a+2],S=s[a+3];if(f!==S||c!==u||l!==m||h!==_){let p=c*u+l*m+h*_+f*S;p<0&&(u=-u,m=-m,_=-_,S=-S,p=-p);let d=1-o;if(p<.9995){const M=Math.acos(p),b=Math.sin(M);d=Math.sin(d*M)/b,o=Math.sin(o*M)/b,c=c*d+u*o,l=l*d+m*o,h=h*d+_*o,f=f*d+S*o}else{c=c*d+u*o,l=l*d+m*o,h=h*d+_*o,f=f*d+S*o;const M=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=M,l*=M,h*=M,f*=M}}e[n]=c,e[n+1]=l,e[n+2]=h,e[n+3]=f}static multiplyQuaternionsFlat(e,n,i,r,s,a){const o=i[r],c=i[r+1],l=i[r+2],h=i[r+3],f=s[a],u=s[a+1],m=s[a+2],_=s[a+3];return e[n]=o*_+h*f+c*m-l*u,e[n+1]=c*_+h*u+l*f-o*m,e[n+2]=l*_+h*m+o*u-c*f,e[n+3]=h*_-o*f-c*u-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(r/2),f=o(s/2),u=c(i/2),m=c(r/2),_=c(s/2);switch(a){case"XYZ":this._x=u*h*f+l*m*_,this._y=l*m*f-u*h*_,this._z=l*h*_+u*m*f,this._w=l*h*f-u*m*_;break;case"YXZ":this._x=u*h*f+l*m*_,this._y=l*m*f-u*h*_,this._z=l*h*_-u*m*f,this._w=l*h*f+u*m*_;break;case"ZXY":this._x=u*h*f-l*m*_,this._y=l*m*f+u*h*_,this._z=l*h*_+u*m*f,this._w=l*h*f-u*m*_;break;case"ZYX":this._x=u*h*f-l*m*_,this._y=l*m*f+u*h*_,this._z=l*h*_-u*m*f,this._w=l*h*f+u*m*_;break;case"YZX":this._x=u*h*f+l*m*_,this._y=l*m*f+u*h*_,this._z=l*h*_-u*m*f,this._w=l*h*f-u*m*_;break;case"XZY":this._x=u*h*f-l*m*_,this._y=l*m*f-u*h*_,this._z=l*h*_+u*m*f,this._w=l*h*f+u*m*_;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],c=n[9],l=n[2],h=n[6],f=n[10],u=i+o+f;if(u>0){const m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(h-c)*m,this._y=(s-l)*m,this._z=(a-r)*m}else if(i>o&&i>f){const m=2*Math.sqrt(1+i-o-f);this._w=(h-c)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+l)/m}else if(o>f){const m=2*Math.sqrt(1+o-i-f);this._w=(s-l)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(c+h)/m}else{const m=2*Math.sqrt(1+f-i-o);this._w=(a-r)/m,this._x=(s+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,a=e._w,o=n._x,c=n._y,l=n._z,h=n._w;return this._x=i*h+a*o+r*l-s*c,this._y=r*h+a*c+s*o-i*l,this._z=s*h+a*l+i*c-r*o,this._w=a*h-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,n){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let c=1-n;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,n=Math.sin(n*l)/h,this._x=this._x*c+i*n,this._y=this._y*c+r*n,this._z=this._z*c+s*n,this._w=this._w*c+a*n,this._onChangeCallback()}else this._x=this._x*c+i*n,this._y=this._y*c+r*n,this._z=this._z*c+s*n,this._w=this._w*c+a*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,n=0,i=0){U.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Kh.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Kh.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*i),h=2*(o*n-s*r),f=2*(s*i-a*n);return this.x=n+c*l+a*f-o*h,this.y=i+c*h+o*l-s*f,this.z=r+c*f+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=qe(this.x,e.x,n.x),this.y=qe(this.y,e.y,n.y),this.z=qe(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=qe(this.x,e,n),this.y=qe(this.y,e,n),this.z=qe(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,a=n.x,o=n.y,c=n.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return mc.copy(this).projectOnVector(e),this.sub(mc)}reflect(e){return this.sub(mc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const mc=new U,Kh=new ys;class ke{constructor(e,n,i,r,s,a,o,c,l){ke.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,c,l)}set(e,n,i,r,s,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=n,h[4]=s,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],f=i[7],u=i[2],m=i[5],_=i[8],S=r[0],p=r[3],d=r[6],M=r[1],b=r[4],E=r[7],w=r[2],A=r[5],P=r[8];return s[0]=a*S+o*M+c*w,s[3]=a*p+o*b+c*A,s[6]=a*d+o*E+c*P,s[1]=l*S+h*M+f*w,s[4]=l*p+h*b+f*A,s[7]=l*d+h*E+f*P,s[2]=u*S+m*M+_*w,s[5]=u*p+m*b+_*A,s[8]=u*d+m*E+_*P,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return n*a*h-n*o*l-i*s*h+i*o*c+r*s*l-r*a*c}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=h*a-o*l,u=o*c-h*s,m=l*s-a*c,_=n*f+i*u+r*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/_;return e[0]=f*S,e[1]=(r*l-h*i)*S,e[2]=(o*i-r*a)*S,e[3]=u*S,e[4]=(h*n-r*c)*S,e[5]=(r*s-o*n)*S,e[6]=m*S,e[7]=(i*c-l*n)*S,e[8]=(a*n-i*s)*S,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+n,0,0,1),this}scale(e,n){return this.premultiply(gc.makeScale(e,n)),this}rotate(e){return this.premultiply(gc.makeRotation(-e)),this}translate(e,n){return this.premultiply(gc.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const gc=new ke,Zh=new ke().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Jh=new ke().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Vg(){const t={enabled:!0,workingColorSpace:cs,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===st&&(r.r=Ii(r.r),r.g=Ii(r.g),r.b=Ii(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===st&&(r.r=ts(r.r),r.g=ts(r.g),r.b=ts(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Zi?go:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return vo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return vo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[cs]:{primaries:e,whitePoint:i,transfer:go,toXYZ:Zh,fromXYZ:Jh,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:On},outputColorSpaceConfig:{drawingBufferColorSpace:On}},[On]:{primaries:e,whitePoint:i,transfer:st,toXYZ:Zh,fromXYZ:Jh,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:On}}}),t}const Ke=Vg();function Ii(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function ts(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Or;class Gg{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Or===void 0&&(Or=_o("canvas")),Or.width=e.width,Or.height=e.height;const r=Or.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Or}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=_o("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Ii(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ii(n[i]/255)*255):n[i]=Ii(n[i]);return{data:n,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Hg=0;class Ru{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Hg++}),this.uuid=pa(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayHeight,n.displayWidth,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(_c(r[a].image)):s.push(_c(r[a]))}else s=_c(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function _c(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?Gg.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}let Wg=0;const vc=new U;class cn extends Es{constructor(e=cn.DEFAULT_IMAGE,n=cn.DEFAULT_MAPPING,i=Ci,r=Ci,s=nn,a=vr,o=Yn,c=bn,l=cn.DEFAULT_ANISOTROPY,h=Zi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Wg++}),this.uuid=pa(),this.name="",this.source=new Ru(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ke,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(vc).x}get height(){return this.source.getSize(vc).y}get depth(){return this.source.getSize(vc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){Fe(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Fe(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==cp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ml:e.x=e.x-Math.floor(e.x);break;case Ci:e.x=e.x<0?0:1;break;case gl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ml:e.y=e.y-Math.floor(e.y);break;case Ci:e.y=e.y<0?0:1;break;case gl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}cn.DEFAULT_IMAGE=null;cn.DEFAULT_MAPPING=cp;cn.DEFAULT_ANISOTROPY=1;class wt{constructor(e=0,n=0,i=0,r=1){wt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const c=e.elements,l=c[0],h=c[4],f=c[8],u=c[1],m=c[5],_=c[9],S=c[2],p=c[6],d=c[10];if(Math.abs(h-u)<.01&&Math.abs(f-S)<.01&&Math.abs(_-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+S)<.1&&Math.abs(_+p)<.1&&Math.abs(l+m+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const b=(l+1)/2,E=(m+1)/2,w=(d+1)/2,A=(h+u)/4,P=(f+S)/4,v=(_+p)/4;return b>E&&b>w?b<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(b),r=A/i,s=P/i):E>w?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=A/r,s=v/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=P/s,r=v/s),this.set(i,r,s,n),this}let M=Math.sqrt((p-_)*(p-_)+(f-S)*(f-S)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(p-_)/M,this.y=(f-S)/M,this.z=(u-h)/M,this.w=Math.acos((l+m+d-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=qe(this.x,e.x,n.x),this.y=qe(this.y,e.y,n.y),this.z=qe(this.z,e.z,n.z),this.w=qe(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=qe(this.x,e,n),this.y=qe(this.y,e,n),this.z=qe(this.z,e,n),this.w=qe(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Xg extends Es{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:nn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new wt(0,0,e,n),this.scissorTest=!1,this.viewport=new wt(0,0,e,n),this.textures=[];const r={width:e,height:n,depth:i.depth},s=new cn(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const n={minFilter:nn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new Ru(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ci extends Xg{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class vp extends cn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class qg extends cn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Kt,this.minFilter=Kt,this.wrapR=Ci,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class yt{constructor(e,n,i,r,s,a,o,c,l,h,f,u,m,_,S,p){yt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,c,l,h,f,u,m,_,S,p)}set(e,n,i,r,s,a,o,c,l,h,f,u,m,_,S,p){const d=this.elements;return d[0]=e,d[4]=n,d[8]=i,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=h,d[10]=f,d[14]=u,d[3]=m,d[7]=_,d[11]=S,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new yt().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinant()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const n=this.elements,i=e.elements,r=1/Br.setFromMatrixColumn(e,0).length(),s=1/Br.setFromMatrixColumn(e,1).length(),a=1/Br.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const u=a*h,m=a*f,_=o*h,S=o*f;n[0]=c*h,n[4]=-c*f,n[8]=l,n[1]=m+_*l,n[5]=u-S*l,n[9]=-o*c,n[2]=S-u*l,n[6]=_+m*l,n[10]=a*c}else if(e.order==="YXZ"){const u=c*h,m=c*f,_=l*h,S=l*f;n[0]=u+S*o,n[4]=_*o-m,n[8]=a*l,n[1]=a*f,n[5]=a*h,n[9]=-o,n[2]=m*o-_,n[6]=S+u*o,n[10]=a*c}else if(e.order==="ZXY"){const u=c*h,m=c*f,_=l*h,S=l*f;n[0]=u-S*o,n[4]=-a*f,n[8]=_+m*o,n[1]=m+_*o,n[5]=a*h,n[9]=S-u*o,n[2]=-a*l,n[6]=o,n[10]=a*c}else if(e.order==="ZYX"){const u=a*h,m=a*f,_=o*h,S=o*f;n[0]=c*h,n[4]=_*l-m,n[8]=u*l+S,n[1]=c*f,n[5]=S*l+u,n[9]=m*l-_,n[2]=-l,n[6]=o*c,n[10]=a*c}else if(e.order==="YZX"){const u=a*c,m=a*l,_=o*c,S=o*l;n[0]=c*h,n[4]=S-u*f,n[8]=_*f+m,n[1]=f,n[5]=a*h,n[9]=-o*h,n[2]=-l*h,n[6]=m*f+_,n[10]=u-S*f}else if(e.order==="XZY"){const u=a*c,m=a*l,_=o*c,S=o*l;n[0]=c*h,n[4]=-f,n[8]=l*h,n[1]=u*f+S,n[5]=a*h,n[9]=m*f-_,n[2]=_*f-m,n[6]=o*h,n[10]=S*f+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Yg,e,$g)}lookAt(e,n,i){const r=this.elements;return vn.subVectors(e,n),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),Gi.crossVectors(i,vn),Gi.lengthSq()===0&&(Math.abs(i.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),Gi.crossVectors(i,vn)),Gi.normalize(),Ra.crossVectors(vn,Gi),r[0]=Gi.x,r[4]=Ra.x,r[8]=vn.x,r[1]=Gi.y,r[5]=Ra.y,r[9]=vn.y,r[2]=Gi.z,r[6]=Ra.z,r[10]=vn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],f=i[5],u=i[9],m=i[13],_=i[2],S=i[6],p=i[10],d=i[14],M=i[3],b=i[7],E=i[11],w=i[15],A=r[0],P=r[4],v=r[8],y=r[12],H=r[1],R=r[5],B=r[9],z=r[13],q=r[2],k=r[6],G=r[10],N=r[14],Q=r[3],K=r[7],le=r[11],ge=r[15];return s[0]=a*A+o*H+c*q+l*Q,s[4]=a*P+o*R+c*k+l*K,s[8]=a*v+o*B+c*G+l*le,s[12]=a*y+o*z+c*N+l*ge,s[1]=h*A+f*H+u*q+m*Q,s[5]=h*P+f*R+u*k+m*K,s[9]=h*v+f*B+u*G+m*le,s[13]=h*y+f*z+u*N+m*ge,s[2]=_*A+S*H+p*q+d*Q,s[6]=_*P+S*R+p*k+d*K,s[10]=_*v+S*B+p*G+d*le,s[14]=_*y+S*z+p*N+d*ge,s[3]=M*A+b*H+E*q+w*Q,s[7]=M*P+b*R+E*k+w*K,s[11]=M*v+b*B+E*G+w*le,s[15]=M*y+b*z+E*N+w*ge,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],f=e[6],u=e[10],m=e[14],_=e[3],S=e[7],p=e[11],d=e[15],M=c*m-l*u,b=o*m-l*f,E=o*u-c*f,w=a*m-l*h,A=a*u-c*h,P=a*f-o*h;return n*(S*M-p*b+d*E)-i*(_*M-p*w+d*A)+r*(_*b-S*w+d*P)-s*(_*E-S*A+p*P)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=e[9],u=e[10],m=e[11],_=e[12],S=e[13],p=e[14],d=e[15],M=n*o-i*a,b=n*c-r*a,E=n*l-s*a,w=i*c-r*o,A=i*l-s*o,P=r*l-s*c,v=h*S-f*_,y=h*p-u*_,H=h*d-m*_,R=f*p-u*S,B=f*d-m*S,z=u*d-m*p,q=M*z-b*B+E*R+w*H-A*y+P*v;if(q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/q;return e[0]=(o*z-c*B+l*R)*k,e[1]=(r*B-i*z-s*R)*k,e[2]=(S*P-p*A+d*w)*k,e[3]=(u*A-f*P-m*w)*k,e[4]=(c*H-a*z-l*y)*k,e[5]=(n*z-r*H+s*y)*k,e[6]=(p*E-_*P-d*b)*k,e[7]=(h*P-u*E+m*b)*k,e[8]=(a*B-o*H+l*v)*k,e[9]=(i*H-n*B-s*v)*k,e[10]=(_*A-S*E+d*M)*k,e[11]=(f*E-h*A-m*M)*k,e[12]=(o*y-a*R-c*v)*k,e[13]=(n*R-i*y+r*v)*k,e[14]=(S*b-_*w-p*M)*k,e[15]=(h*w-f*b+u*M)*k,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,h*o+i,h*c-r*a,0,l*c-r*o,h*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,c=n._w,l=s+s,h=a+a,f=o+o,u=s*l,m=s*h,_=s*f,S=a*h,p=a*f,d=o*f,M=c*l,b=c*h,E=c*f,w=i.x,A=i.y,P=i.z;return r[0]=(1-(S+d))*w,r[1]=(m+E)*w,r[2]=(_-b)*w,r[3]=0,r[4]=(m-E)*A,r[5]=(1-(u+d))*A,r[6]=(p+M)*A,r[7]=0,r[8]=(_+b)*P,r[9]=(p-M)*P,r[10]=(1-(u+S))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return i.set(1,1,1),n.identity(),this;let a=Br.set(r[0],r[1],r[2]).length();const o=Br.set(r[4],r[5],r[6]).length(),c=Br.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Hn.copy(this);const l=1/a,h=1/o,f=1/c;return Hn.elements[0]*=l,Hn.elements[1]*=l,Hn.elements[2]*=l,Hn.elements[4]*=h,Hn.elements[5]*=h,Hn.elements[6]*=h,Hn.elements[8]*=f,Hn.elements[9]*=f,Hn.elements[10]*=f,n.setFromRotationMatrix(Hn),i.x=a,i.y=o,i.z=c,this}makePerspective(e,n,i,r,s,a,o=si,c=!1){const l=this.elements,h=2*s/(n-e),f=2*s/(i-r),u=(n+e)/(n-e),m=(i+r)/(i-r);let _,S;if(c)_=s/(a-s),S=a*s/(a-s);else if(o===si)_=-(a+s)/(a-s),S=-2*a*s/(a-s);else if(o===oa)_=-a/(a-s),S=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=S,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,a,o=si,c=!1){const l=this.elements,h=2/(n-e),f=2/(i-r),u=-(n+e)/(n-e),m=-(i+r)/(i-r);let _,S;if(c)_=1/(a-s),S=a/(a-s);else if(o===si)_=-2/(a-s),S=-(a+s)/(a-s);else if(o===oa)_=-1/(a-s),S=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=f,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=_,l[14]=S,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Br=new U,Hn=new yt,Yg=new U(0,0,0),$g=new U(1,1,1),Gi=new U,Ra=new U,vn=new U,Qh=new yt,ef=new ys;class hi{constructor(e=0,n=0,i=0,r=hi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],h=r[9],f=r[2],u=r[6],m=r[10];switch(n){case"XYZ":this._y=Math.asin(qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-qe(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(qe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Qh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Qh,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return ef.setFromEuler(this),this.setFromQuaternion(ef,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}hi.DEFAULT_ORDER="XYZ";class xp{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let jg=0;const tf=new U,kr=new ys,Si=new yt,Ca=new U,Vs=new U,Kg=new U,Zg=new ys,nf=new U(1,0,0),rf=new U(0,1,0),sf=new U(0,0,1),af={type:"added"},Jg={type:"removed"},zr={type:"childadded",child:null},xc={type:"childremoved",child:null};class ln extends Es{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:jg++}),this.uuid=pa(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ln.DEFAULT_UP.clone();const e=new U,n=new hi,i=new ys,r=new U(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new yt},normalMatrix:{value:new ke}}),this.matrix=new yt,this.matrixWorld=new yt,this.matrixAutoUpdate=ln.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return kr.setFromAxisAngle(e,n),this.quaternion.multiply(kr),this}rotateOnWorldAxis(e,n){return kr.setFromAxisAngle(e,n),this.quaternion.premultiply(kr),this}rotateX(e){return this.rotateOnAxis(nf,e)}rotateY(e){return this.rotateOnAxis(rf,e)}rotateZ(e){return this.rotateOnAxis(sf,e)}translateOnAxis(e,n){return tf.copy(e).applyQuaternion(this.quaternion),this.position.add(tf.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(nf,e)}translateY(e){return this.translateOnAxis(rf,e)}translateZ(e){return this.translateOnAxis(sf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Si.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Ca.copy(e):Ca.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Vs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Si.lookAt(Vs,Ca,this.up):Si.lookAt(Ca,Vs,this.up),this.quaternion.setFromRotationMatrix(Si),r&&(Si.extractRotation(r.matrixWorld),kr.setFromRotationMatrix(Si),this.quaternion.premultiply(kr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(Qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(af),zr.child=e,this.dispatchEvent(zr),zr.child=null):Qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(Jg),xc.child=e,this.dispatchEvent(xc),xc.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Si.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Si.multiply(e.parent.matrixWorld)),e.applyMatrix4(Si),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(af),zr.child=e,this.dispatchEvent(zr),zr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vs,e,Kg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Vs,Zg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*r,s[13]+=i-s[1]*n-s[5]*i-s[9]*r,s[14]+=r-s[2]*n-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const f=c[l];s(e.shapes,f)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(n){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),f=a(e.shapes),u=a(e.skeletons),m=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),m.length>0&&(i.animations=m),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}ln.DEFAULT_UP=new U(0,1,0);ln.DEFAULT_MATRIX_AUTO_UPDATE=!0;ln.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Pa extends ln{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Qg={type:"move"};class Mc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Pa,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Pa,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Pa,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const S of e.hand.values()){const p=n.getJointPose(S,i),d=this._getHandJoint(l,S);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}const h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=h.position.distanceTo(f.position),m=.02,_=.005;l.inputState.pinching&&u>m+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=m-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Qg)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Pa;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const Mp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Hi={h:0,s:0,l:0},La={h:0,s:0,l:0};function Sc(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class Xe{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=On){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=Ke.workingColorSpace){return this.r=e,this.g=n,this.b=i,Ke.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=Ke.workingColorSpace){if(e=zg(e,1),n=qe(n,0,1),i=qe(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=Sc(a,s,e+1/3),this.g=Sc(a,s,e),this.b=Sc(a,s,e-1/3)}return Ke.colorSpaceToWorking(this,r),this}setStyle(e,n=On){function i(s){s!==void 0&&parseFloat(s)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:Fe("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=On){const i=Mp[e.toLowerCase()];return i!==void 0?this.setHex(i,n):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ii(e.r),this.g=Ii(e.g),this.b=Ii(e.b),this}copyLinearToSRGB(e){return this.r=ts(e.r),this.g=ts(e.g),this.b=ts(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=On){return Ke.workingToColorSpace(en.copy(this),e),Math.round(qe(en.r*255,0,255))*65536+Math.round(qe(en.g*255,0,255))*256+Math.round(qe(en.b*255,0,255))}getHexString(e=On){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Ke.workingColorSpace){Ke.workingToColorSpace(en.copy(this),n);const i=en.r,r=en.g,s=en.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=h<=.5?f/(a+o):f/(2-a-o),a){case i:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-i)/f+2;break;case s:c=(i-r)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,n=Ke.workingColorSpace){return Ke.workingToColorSpace(en.copy(this),n),e.r=en.r,e.g=en.g,e.b=en.b,e}getStyle(e=On){Ke.workingToColorSpace(en.copy(this),e);const n=en.r,i=en.g,r=en.b;return e!==On?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Hi),this.setHSL(Hi.h+e,Hi.s+n,Hi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Hi),e.getHSL(La);const i=pc(Hi.h,La.h,n),r=pc(Hi.s,La.s,n),s=pc(Hi.l,La.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const en=new Xe;Xe.NAMES=Mp;class Cu{constructor(e,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new Xe(e),this.density=n}clone(){return new Cu(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class e_ extends ln{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new hi,this.environmentIntensity=1,this.environmentRotation=new hi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Wn=new U,Ei=new U,Ec=new U,yi=new U,Vr=new U,Gr=new U,of=new U,yc=new U,bc=new U,Tc=new U,Ac=new wt,wc=new wt,Rc=new wt;class qn{constructor(e=new U,n=new U,i=new U){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Wn.subVectors(e,n),r.cross(Wn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Wn.subVectors(r,n),Ei.subVectors(i,n),Ec.subVectors(e,n);const a=Wn.dot(Wn),o=Wn.dot(Ei),c=Wn.dot(Ec),l=Ei.dot(Ei),h=Ei.dot(Ec),f=a*l-o*o;if(f===0)return s.set(0,0,0),null;const u=1/f,m=(l*c-o*h)*u,_=(a*h-o*c)*u;return s.set(1-m-_,_,m)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,yi)===null?!1:yi.x>=0&&yi.y>=0&&yi.x+yi.y<=1}static getInterpolation(e,n,i,r,s,a,o,c){return this.getBarycoord(e,n,i,r,yi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,yi.x),c.addScaledVector(a,yi.y),c.addScaledVector(o,yi.z),c)}static getInterpolatedAttribute(e,n,i,r,s,a){return Ac.setScalar(0),wc.setScalar(0),Rc.setScalar(0),Ac.fromBufferAttribute(e,n),wc.fromBufferAttribute(e,i),Rc.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Ac,s.x),a.addScaledVector(wc,s.y),a.addScaledVector(Rc,s.z),a}static isFrontFacing(e,n,i,r){return Wn.subVectors(i,n),Ei.subVectors(e,n),Wn.cross(Ei).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wn.subVectors(this.c,this.b),Ei.subVectors(this.a,this.b),Wn.cross(Ei).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return qn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return qn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return qn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return qn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return qn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let a,o;Vr.subVectors(r,i),Gr.subVectors(s,i),yc.subVectors(e,i);const c=Vr.dot(yc),l=Gr.dot(yc);if(c<=0&&l<=0)return n.copy(i);bc.subVectors(e,r);const h=Vr.dot(bc),f=Gr.dot(bc);if(h>=0&&f<=h)return n.copy(r);const u=c*f-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),n.copy(i).addScaledVector(Vr,a);Tc.subVectors(e,s);const m=Vr.dot(Tc),_=Gr.dot(Tc);if(_>=0&&m<=_)return n.copy(s);const S=m*l-c*_;if(S<=0&&l>=0&&_<=0)return o=l/(l-_),n.copy(i).addScaledVector(Gr,o);const p=h*_-m*f;if(p<=0&&f-h>=0&&m-_>=0)return of.subVectors(s,r),o=(f-h)/(f-h+(m-_)),n.copy(r).addScaledVector(of,o);const d=1/(p+S+u);return a=S*d,o=u*d,n.copy(i).addScaledVector(Vr,a).addScaledVector(Gr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class ma{constructor(e=new U(1/0,1/0,1/0),n=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Xn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Xn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Xn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Xn):Xn.fromBufferAttribute(s,a),Xn.applyMatrix4(e.matrixWorld),this.expandByPoint(Xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ia.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ia.copy(i.boundingBox)),Ia.applyMatrix4(e.matrixWorld),this.union(Ia)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Xn),Xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Gs),Da.subVectors(this.max,Gs),Hr.subVectors(e.a,Gs),Wr.subVectors(e.b,Gs),Xr.subVectors(e.c,Gs),Wi.subVectors(Wr,Hr),Xi.subVectors(Xr,Wr),or.subVectors(Hr,Xr);let n=[0,-Wi.z,Wi.y,0,-Xi.z,Xi.y,0,-or.z,or.y,Wi.z,0,-Wi.x,Xi.z,0,-Xi.x,or.z,0,-or.x,-Wi.y,Wi.x,0,-Xi.y,Xi.x,0,-or.y,or.x,0];return!Cc(n,Hr,Wr,Xr,Da)||(n=[1,0,0,0,1,0,0,0,1],!Cc(n,Hr,Wr,Xr,Da))?!1:(Ua.crossVectors(Wi,Xi),n=[Ua.x,Ua.y,Ua.z],Cc(n,Hr,Wr,Xr,Da))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(bi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),bi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),bi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),bi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),bi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),bi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),bi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),bi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(bi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const bi=[new U,new U,new U,new U,new U,new U,new U,new U],Xn=new U,Ia=new ma,Hr=new U,Wr=new U,Xr=new U,Wi=new U,Xi=new U,or=new U,Gs=new U,Da=new U,Ua=new U,cr=new U;function Cc(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){cr.fromArray(t,s);const o=r.x*Math.abs(cr.x)+r.y*Math.abs(cr.y)+r.z*Math.abs(cr.z),c=e.dot(cr),l=n.dot(cr),h=i.dot(cr);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Dt=new U,Na=new $e;let t_=0;class Tn{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:t_++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=qh,this.updateRanges=[],this.gpuType=ri,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Na.fromBufferAttribute(this,n),Na.applyMatrix3(e),this.setXY(n,Na.x,Na.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyMatrix3(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyMatrix4(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.applyNormalMatrix(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Dt.fromBufferAttribute(this,n),Dt.transformDirection(e),this.setXYZ(n,Dt.x,Dt.y,Dt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=zs(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=hn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=zs(n,this.array)),n}setX(e,n){return this.normalized&&(n=hn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=zs(n,this.array)),n}setY(e,n){return this.normalized&&(n=hn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=zs(n,this.array)),n}setZ(e,n){return this.normalized&&(n=hn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=zs(n,this.array)),n}setW(e,n){return this.normalized&&(n=hn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=hn(n,this.array),i=hn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=hn(n,this.array),i=hn(i,this.array),r=hn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=hn(n,this.array),i=hn(i,this.array),r=hn(r,this.array),s=hn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==qh&&(e.usage=this.usage),e}}class Sp extends Tn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class Ep extends Tn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class $t extends Tn{constructor(e,n,i){super(new Float32Array(e),n,i)}}const n_=new ma,Hs=new U,Pc=new U;class Io{constructor(e=new U,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):n_.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Hs.subVectors(e,this.center);const n=Hs.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(Hs,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Pc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Hs.copy(e.center).add(Pc)),this.expandByPoint(Hs.copy(e.center).sub(Pc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let i_=0;const Dn=new yt,Lc=new ln,qr=new U,xn=new ma,Ws=new ma,Xt=new U;class un extends Es{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:i_++}),this.uuid=pa(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Fg(e)?Ep:Sp)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new ke().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Dn.makeRotationFromQuaternion(e),this.applyMatrix4(Dn),this}rotateX(e){return Dn.makeRotationX(e),this.applyMatrix4(Dn),this}rotateY(e){return Dn.makeRotationY(e),this.applyMatrix4(Dn),this}rotateZ(e){return Dn.makeRotationZ(e),this.applyMatrix4(Dn),this}translate(e,n,i){return Dn.makeTranslation(e,n,i),this.applyMatrix4(Dn),this}scale(e,n,i){return Dn.makeScale(e,n,i),this.applyMatrix4(Dn),this}lookAt(e){return Lc.lookAt(e),Lc.updateMatrix(),this.applyMatrix4(Lc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(qr).negate(),this.translate(qr.x,qr.y,qr.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new $t(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ma);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];xn.setFromBufferAttribute(s),this.morphTargetsRelative?(Xt.addVectors(this.boundingBox.min,xn.min),this.boundingBox.expandByPoint(Xt),Xt.addVectors(this.boundingBox.max,xn.max),this.boundingBox.expandByPoint(Xt)):(this.boundingBox.expandByPoint(xn.min),this.boundingBox.expandByPoint(xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Io);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const i=this.boundingSphere.center;if(xn.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];Ws.setFromBufferAttribute(o),this.morphTargetsRelative?(Xt.addVectors(xn.min,Ws.min),xn.expandByPoint(Xt),Xt.addVectors(xn.max,Ws.max),xn.expandByPoint(Xt)):(xn.expandByPoint(Ws.min),xn.expandByPoint(Ws.max))}xn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Xt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Xt));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Xt.fromBufferAttribute(o,l),c&&(qr.fromBufferAttribute(e,l),Xt.add(qr)),r=Math.max(r,i.distanceToSquared(Xt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Tn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let v=0;v<i.count;v++)o[v]=new U,c[v]=new U;const l=new U,h=new U,f=new U,u=new $e,m=new $e,_=new $e,S=new U,p=new U;function d(v,y,H){l.fromBufferAttribute(i,v),h.fromBufferAttribute(i,y),f.fromBufferAttribute(i,H),u.fromBufferAttribute(s,v),m.fromBufferAttribute(s,y),_.fromBufferAttribute(s,H),h.sub(l),f.sub(l),m.sub(u),_.sub(u);const R=1/(m.x*_.y-_.x*m.y);isFinite(R)&&(S.copy(h).multiplyScalar(_.y).addScaledVector(f,-m.y).multiplyScalar(R),p.copy(f).multiplyScalar(m.x).addScaledVector(h,-_.x).multiplyScalar(R),o[v].add(S),o[y].add(S),o[H].add(S),c[v].add(p),c[y].add(p),c[H].add(p))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let v=0,y=M.length;v<y;++v){const H=M[v],R=H.start,B=H.count;for(let z=R,q=R+B;z<q;z+=3)d(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const b=new U,E=new U,w=new U,A=new U;function P(v){w.fromBufferAttribute(r,v),A.copy(w);const y=o[v];b.copy(y),b.sub(w.multiplyScalar(w.dot(y))).normalize(),E.crossVectors(A,y);const R=E.dot(c[v])<0?-1:1;a.setXYZW(v,b.x,b.y,b.z,R)}for(let v=0,y=M.length;v<y;++v){const H=M[v],R=H.start,B=H.count;for(let z=R,q=R+B;z<q;z+=3)P(e.getX(z+0)),P(e.getX(z+1)),P(e.getX(z+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Tn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,m=i.count;u<m;u++)i.setXYZ(u,0,0,0);const r=new U,s=new U,a=new U,o=new U,c=new U,l=new U,h=new U,f=new U;if(e)for(let u=0,m=e.count;u<m;u+=3){const _=e.getX(u+0),S=e.getX(u+1),p=e.getX(u+2);r.fromBufferAttribute(n,_),s.fromBufferAttribute(n,S),a.fromBufferAttribute(n,p),h.subVectors(a,s),f.subVectors(r,s),h.cross(f),o.fromBufferAttribute(i,_),c.fromBufferAttribute(i,S),l.fromBufferAttribute(i,p),o.add(h),c.add(h),l.add(h),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(S,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let u=0,m=n.count;u<m;u+=3)r.fromBufferAttribute(n,u+0),s.fromBufferAttribute(n,u+1),a.fromBufferAttribute(n,u+2),h.subVectors(a,s),f.subVectors(r,s),h.cross(f),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Xt.fromBufferAttribute(e,n),Xt.normalize(),e.setXYZ(n,Xt.x,Xt.y,Xt.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,f=o.normalized,u=new l.constructor(c.length*h);let m=0,_=0;for(let S=0,p=c.length;S<p;S++){o.isInterleavedBufferAttribute?m=c[S]*o.data.stride+o.offset:m=c[S]*h;for(let d=0;d<h;d++)u[_++]=l[m++]}return new Tn(u,h,f)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new un,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,i);n.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let h=0,f=l.length;h<f;h++){const u=l[h],m=e(u,i);c.push(m)}n.morphAttributes[o]=c}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];n.addGroup(l.start,l.count,l.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let f=0,u=l.length;f<u;f++){const m=l[f];h.push(m.toJSON(e.data))}h.length>0&&(r[c]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const l in r){const h=r[l];this.setAttribute(l,h.clone(n))}const s=e.morphAttributes;for(const l in s){const h=[],f=s[l];for(let u=0,m=f.length;u<m;u++)h.push(f[u].clone(n));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let r_=0;class bs extends Es{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:r_++}),this.uuid=pa(),this.name="",this.type="Material",this.blending=es,this.side=tr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=al,this.blendDst=ol,this.blendEquation=gr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Xe(0,0,0),this.blendAlpha=0,this.depthFunc=ss,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Xh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Fr,this.stencilZFail=Fr,this.stencilZPass=Fr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){Fe(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Fe(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==es&&(i.blending=this.blending),this.side!==tr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==al&&(i.blendSrc=this.blendSrc),this.blendDst!==ol&&(i.blendDst=this.blendDst),this.blendEquation!==gr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ss&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Xh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Fr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Fr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Fr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(n){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Ti=new U,Ic=new U,Fa=new U,qi=new U,Dc=new U,Oa=new U,Uc=new U;class yp{constructor(e=new U,n=new U(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ti)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Ti.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Ti.copy(this.origin).addScaledVector(this.direction,n),Ti.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Ic.copy(e).add(n).multiplyScalar(.5),Fa.copy(n).sub(e).normalize(),qi.copy(this.origin).sub(Ic);const s=e.distanceTo(n)*.5,a=-this.direction.dot(Fa),o=qi.dot(this.direction),c=-qi.dot(Fa),l=qi.lengthSq(),h=Math.abs(1-a*a);let f,u,m,_;if(h>0)if(f=a*c-o,u=a*o-c,_=s*h,f>=0)if(u>=-_)if(u<=_){const S=1/h;f*=S,u*=S,m=f*(f+a*u+2*o)+u*(a*f+u+2*c)+l}else u=s,f=Math.max(0,-(a*u+o)),m=-f*f+u*(u+2*c)+l;else u=-s,f=Math.max(0,-(a*u+o)),m=-f*f+u*(u+2*c)+l;else u<=-_?(f=Math.max(0,-(-a*s+o)),u=f>0?-s:Math.min(Math.max(-s,-c),s),m=-f*f+u*(u+2*c)+l):u<=_?(f=0,u=Math.min(Math.max(-s,-c),s),m=u*(u+2*c)+l):(f=Math.max(0,-(a*s+o)),u=f>0?s:Math.min(Math.max(-s,-c),s),m=-f*f+u*(u+2*c)+l);else u=a>0?-s:s,f=Math.max(0,-(a*u+o)),m=-f*f+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Ic).addScaledVector(Fa,u),m}intersectSphere(e,n){Ti.subVectors(e.center,this.origin);const i=Ti.dot(this.direction),r=Ti.dot(Ti)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,n):this.at(o,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,r=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,r=(e.min.x-u.x)*l),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-u.z)*f,c=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,c=(e.min.z-u.z)*f),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Ti)!==null}intersectTriangle(e,n,i,r,s){Dc.subVectors(n,e),Oa.subVectors(i,e),Uc.crossVectors(Dc,Oa);let a=this.direction.dot(Uc),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;qi.subVectors(this.origin,e);const c=o*this.direction.dot(Oa.crossVectors(qi,Oa));if(c<0)return null;const l=o*this.direction.dot(Dc.cross(qi));if(l<0||c+l>a)return null;const h=-o*qi.dot(Uc);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ts extends bs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Xe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hi,this.combine=xu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const cf=new yt,lr=new yp,Ba=new Io,lf=new U,ka=new U,za=new U,Va=new U,Nc=new U,Ga=new U,uf=new U,Ha=new U;class mn extends ln{constructor(e=new un,n=new Ts){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){Ga.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=o[c],f=s[c];h!==0&&(Nc.fromBufferAttribute(f,e),a?Ga.addScaledVector(Nc,h):Ga.addScaledVector(Nc.sub(n),h))}n.add(Ga)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ba.copy(i.boundingSphere),Ba.applyMatrix4(s),lr.copy(e.ray).recast(e.near),!(Ba.containsPoint(lr.origin)===!1&&(lr.intersectSphere(Ba,lf)===null||lr.origin.distanceToSquared(lf)>(e.far-e.near)**2))&&(cf.copy(s).invert(),lr.copy(e.ray).applyMatrix4(cf),!(i.boundingBox!==null&&lr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,lr)))}_computeIntersections(e,n,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,f=s.attributes.normal,u=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,S=u.length;_<S;_++){const p=u[_],d=a[p.materialIndex],M=Math.max(p.start,m.start),b=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let E=M,w=b;E<w;E+=3){const A=o.getX(E),P=o.getX(E+1),v=o.getX(E+2);r=Wa(this,d,e,i,l,h,f,A,P,v),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=p.materialIndex,n.push(r))}}else{const _=Math.max(0,m.start),S=Math.min(o.count,m.start+m.count);for(let p=_,d=S;p<d;p+=3){const M=o.getX(p),b=o.getX(p+1),E=o.getX(p+2);r=Wa(this,a,e,i,l,h,f,M,b,E),r&&(r.faceIndex=Math.floor(p/3),n.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,S=u.length;_<S;_++){const p=u[_],d=a[p.materialIndex],M=Math.max(p.start,m.start),b=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let E=M,w=b;E<w;E+=3){const A=E,P=E+1,v=E+2;r=Wa(this,d,e,i,l,h,f,A,P,v),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=p.materialIndex,n.push(r))}}else{const _=Math.max(0,m.start),S=Math.min(c.count,m.start+m.count);for(let p=_,d=S;p<d;p+=3){const M=p,b=p+1,E=p+2;r=Wa(this,a,e,i,l,h,f,M,b,E),r&&(r.faceIndex=Math.floor(p/3),n.push(r))}}}}function s_(t,e,n,i,r,s,a,o){let c;if(e.side===pn?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===tr,o),c===null)return null;Ha.copy(o),Ha.applyMatrix4(t.matrixWorld);const l=n.ray.origin.distanceTo(Ha);return l<n.near||l>n.far?null:{distance:l,point:Ha.clone(),object:t}}function Wa(t,e,n,i,r,s,a,o,c,l){t.getVertexPosition(o,ka),t.getVertexPosition(c,za),t.getVertexPosition(l,Va);const h=s_(t,e,n,i,ka,za,Va,uf);if(h){const f=new U;qn.getBarycoord(uf,ka,za,Va,f),r&&(h.uv=qn.getInterpolatedAttribute(r,o,c,l,f,new $e)),s&&(h.uv1=qn.getInterpolatedAttribute(s,o,c,l,f,new $e)),a&&(h.normal=qn.getInterpolatedAttribute(a,o,c,l,f,new U),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new U,materialIndex:0};qn.getNormal(ka,za,Va,u.normal),h.face=u,h.barycoord=f}return h}class a_ extends cn{constructor(e=null,n=1,i=1,r,s,a,o,c,l=Kt,h=Kt,f,u){super(null,a,o,c,l,h,r,s,f,u),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Fc=new U,o_=new U,c_=new ke;class mr{constructor(e=new U(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Fc.subVectors(i,n).cross(o_.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(Fc),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||c_.getNormalMatrix(e),r=this.coplanarPoint(Fc).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ur=new Io,l_=new $e(.5,.5),Xa=new U;class Pu{constructor(e=new mr,n=new mr,i=new mr,r=new mr,s=new mr,a=new mr){this.planes=[e,n,i,r,s,a]}set(e,n,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=si,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],f=s[5],u=s[6],m=s[7],_=s[8],S=s[9],p=s[10],d=s[11],M=s[12],b=s[13],E=s[14],w=s[15];if(r[0].setComponents(l-a,m-h,d-_,w-M).normalize(),r[1].setComponents(l+a,m+h,d+_,w+M).normalize(),r[2].setComponents(l+o,m+f,d+S,w+b).normalize(),r[3].setComponents(l-o,m-f,d-S,w-b).normalize(),i)r[4].setComponents(c,u,p,E).normalize(),r[5].setComponents(l-c,m-u,d-p,w-E).normalize();else if(r[4].setComponents(l-c,m-u,d-p,w-E).normalize(),n===si)r[5].setComponents(l+c,m+u,d+p,w+E).normalize();else if(n===oa)r[5].setComponents(c,u,p,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ur.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),ur.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ur)}intersectsSprite(e){ur.center.set(0,0,0);const n=l_.distanceTo(e.center);return ur.radius=.7071067811865476+n,ur.applyMatrix4(e.matrixWorld),this.intersectsSphere(ur)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Xa.x=r.normal.x>0?e.max.x:e.min.x,Xa.y=r.normal.y>0?e.max.y:e.min.y,Xa.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Xa)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Lu extends bs{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Xe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const hf=new yt,Kl=new yp,qa=new Io,Ya=new U;class bp extends ln{constructor(e=new un,n=new Lu){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),qa.copy(i.boundingSphere),qa.applyMatrix4(r),qa.radius+=s,e.ray.intersectsSphere(qa)===!1)return;hf.copy(r).invert(),Kl.copy(e.ray).applyMatrix4(hf);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,f=i.attributes.position;if(l!==null){const u=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let _=u,S=m;_<S;_++){const p=l.getX(_);Ya.fromBufferAttribute(f,p),ff(Ya,p,c,r,e,n,this)}}else{const u=Math.max(0,a.start),m=Math.min(f.count,a.start+a.count);for(let _=u,S=m;_<S;_++)Ya.fromBufferAttribute(f,_),ff(Ya,_,c,r,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function ff(t,e,n,i,r,s,a){const o=Kl.distanceSqToPoint(t);if(o<n){const c=new U;Kl.closestPointToPoint(t,c),c.applyMatrix4(i);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Tp extends cn{constructor(e=[],n=wr,i,r,s,a,o,c,l,h){super(e,n,i,r,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class ca extends cn{constructor(e,n,i=ui,r,s,a,o=Kt,c=Kt,l,h=Ui,f=1){if(h!==Ui&&h!==xr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:n,depth:f};super(u,r,s,a,o,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ru(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class u_ extends ca{constructor(e,n=ui,i=wr,r,s,a=Kt,o=Kt,c,l=Ui){const h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,n,i,r,s,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Ap extends cn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ga extends un{constructor(e=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],h=[],f=[];let u=0,m=0;_("z","y","x",-1,-1,i,n,e,a,s,0),_("z","y","x",1,-1,i,n,-e,a,s,1),_("x","z","y",1,1,e,i,n,r,a,2),_("x","z","y",1,-1,e,i,-n,r,a,3),_("x","y","z",1,-1,e,n,i,r,s,4),_("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new $t(l,3)),this.setAttribute("normal",new $t(h,3)),this.setAttribute("uv",new $t(f,2));function _(S,p,d,M,b,E,w,A,P,v,y){const H=E/P,R=w/v,B=E/2,z=w/2,q=A/2,k=P+1,G=v+1;let N=0,Q=0;const K=new U;for(let le=0;le<G;le++){const ge=le*R-z;for(let fe=0;fe<k;fe++){const ze=fe*H-B;K[S]=ze*M,K[p]=ge*b,K[d]=q,l.push(K.x,K.y,K.z),K[S]=0,K[p]=0,K[d]=A>0?1:-1,h.push(K.x,K.y,K.z),f.push(fe/P),f.push(1-le/v),N+=1}}for(let le=0;le<v;le++)for(let ge=0;ge<P;ge++){const fe=u+ge+k*le,ze=u+ge+k*(le+1),gt=u+(ge+1)+k*(le+1),mt=u+(ge+1)+k*le;c.push(fe,ze,mt),c.push(ze,gt,mt),Q+=6}o.addGroup(m,Q,y),m+=Q,u+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ga(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Iu extends un{constructor(e=[],n=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:n,radius:i,detail:r};const s=[],a=[];o(r),l(i),h(),this.setAttribute("position",new $t(s,3)),this.setAttribute("normal",new $t(s.slice(),3)),this.setAttribute("uv",new $t(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const b=new U,E=new U,w=new U;for(let A=0;A<n.length;A+=3)m(n[A+0],b),m(n[A+1],E),m(n[A+2],w),c(b,E,w,M)}function c(M,b,E,w){const A=w+1,P=[];for(let v=0;v<=A;v++){P[v]=[];const y=M.clone().lerp(E,v/A),H=b.clone().lerp(E,v/A),R=A-v;for(let B=0;B<=R;B++)B===0&&v===A?P[v][B]=y:P[v][B]=y.clone().lerp(H,B/R)}for(let v=0;v<A;v++)for(let y=0;y<2*(A-v)-1;y++){const H=Math.floor(y/2);y%2===0?(u(P[v][H+1]),u(P[v+1][H]),u(P[v][H])):(u(P[v][H+1]),u(P[v+1][H+1]),u(P[v+1][H]))}}function l(M){const b=new U;for(let E=0;E<s.length;E+=3)b.x=s[E+0],b.y=s[E+1],b.z=s[E+2],b.normalize().multiplyScalar(M),s[E+0]=b.x,s[E+1]=b.y,s[E+2]=b.z}function h(){const M=new U;for(let b=0;b<s.length;b+=3){M.x=s[b+0],M.y=s[b+1],M.z=s[b+2];const E=p(M)/2/Math.PI+.5,w=d(M)/Math.PI+.5;a.push(E,1-w)}_(),f()}function f(){for(let M=0;M<a.length;M+=6){const b=a[M+0],E=a[M+2],w=a[M+4],A=Math.max(b,E,w),P=Math.min(b,E,w);A>.9&&P<.1&&(b<.2&&(a[M+0]+=1),E<.2&&(a[M+2]+=1),w<.2&&(a[M+4]+=1))}}function u(M){s.push(M.x,M.y,M.z)}function m(M,b){const E=M*3;b.x=e[E+0],b.y=e[E+1],b.z=e[E+2]}function _(){const M=new U,b=new U,E=new U,w=new U,A=new $e,P=new $e,v=new $e;for(let y=0,H=0;y<s.length;y+=9,H+=6){M.set(s[y+0],s[y+1],s[y+2]),b.set(s[y+3],s[y+4],s[y+5]),E.set(s[y+6],s[y+7],s[y+8]),A.set(a[H+0],a[H+1]),P.set(a[H+2],a[H+3]),v.set(a[H+4],a[H+5]),w.copy(M).add(b).add(E).divideScalar(3);const R=p(w);S(A,H+0,M,R),S(P,H+2,b,R),S(v,H+4,E,R)}}function S(M,b,E,w){w<0&&M.x===1&&(a[b]=M.x-1),E.x===0&&E.z===0&&(a[b]=w/2/Math.PI+.5)}function p(M){return Math.atan2(M.z,-M.x)}function d(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Iu(e.vertices,e.indices,e.radius,e.detail)}}class Du extends Iu{constructor(e=1,n=0){const i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,n),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:n}}static fromJSON(e){return new Du(e.radius,e.detail)}}class Do extends un{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,a=n/2,o=Math.floor(i),c=Math.floor(r),l=o+1,h=c+1,f=e/o,u=n/c,m=[],_=[],S=[],p=[];for(let d=0;d<h;d++){const M=d*u-a;for(let b=0;b<l;b++){const E=b*f-s;_.push(E,-M,0),S.push(0,0,1),p.push(b/o),p.push(1-d/c)}}for(let d=0;d<c;d++)for(let M=0;M<o;M++){const b=M+l*d,E=M+l*(d+1),w=M+1+l*(d+1),A=M+1+l*d;m.push(b,E,A),m.push(E,w,A)}this.setIndex(m),this.setAttribute("position",new $t(_,3)),this.setAttribute("normal",new $t(S,3)),this.setAttribute("uv",new $t(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Do(e.width,e.height,e.widthSegments,e.heightSegments)}}class Uu extends un{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const h=[],f=new U,u=new U,m=[],_=[],S=[],p=[];for(let d=0;d<=i;d++){const M=[],b=d/i;let E=0;d===0&&a===0?E=.5/n:d===i&&c===Math.PI&&(E=-.5/n);for(let w=0;w<=n;w++){const A=w/n;f.x=-e*Math.cos(r+A*s)*Math.sin(a+b*o),f.y=e*Math.cos(a+b*o),f.z=e*Math.sin(r+A*s)*Math.sin(a+b*o),_.push(f.x,f.y,f.z),u.copy(f).normalize(),S.push(u.x,u.y,u.z),p.push(A+E,1-b),M.push(l++)}h.push(M)}for(let d=0;d<i;d++)for(let M=0;M<n;M++){const b=h[d][M+1],E=h[d][M],w=h[d+1][M],A=h[d+1][M+1];(d!==0||a>0)&&m.push(b,E,A),(d!==i-1||c<Math.PI)&&m.push(E,w,A)}this.setIndex(m),this.setAttribute("position",new $t(_,3)),this.setAttribute("normal",new $t(S,3)),this.setAttribute("uv",new $t(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Uu(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Uo extends un{constructor(e=1,n=.4,i=12,r=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:n,radialSegments:i,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},i=Math.floor(i),r=Math.floor(r);const c=[],l=[],h=[],f=[],u=new U,m=new U,_=new U;for(let S=0;S<=i;S++){const p=a+S/i*o;for(let d=0;d<=r;d++){const M=d/r*s;m.x=(e+n*Math.cos(p))*Math.cos(M),m.y=(e+n*Math.cos(p))*Math.sin(M),m.z=n*Math.sin(p),l.push(m.x,m.y,m.z),u.x=e*Math.cos(M),u.y=e*Math.sin(M),_.subVectors(m,u).normalize(),h.push(_.x,_.y,_.z),f.push(d/r),f.push(S/i)}}for(let S=1;S<=i;S++)for(let p=1;p<=r;p++){const d=(r+1)*S+p-1,M=(r+1)*(S-1)+p-1,b=(r+1)*(S-1)+p,E=(r+1)*S+p;c.push(d,M,E),c.push(M,b,E)}this.setIndex(c),this.setAttribute("position",new $t(l,3)),this.setAttribute("normal",new $t(h,3)),this.setAttribute("uv",new $t(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Uo(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function ls(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function on(t){const e={};for(let n=0;n<t.length;n++){const i=ls(t[n]);for(const r in i)e[r]=i[r]}return e}function h_(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function wp(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const f_={clone:ls,merge:on};var d_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,p_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class fi extends bs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=d_,this.fragmentShader=p_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ls(e.uniforms),this.uniformsGroups=h_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class m_ extends fi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class g_ extends bs{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new Xe(16777215),this.specular=new Xe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Xe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gp,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new hi,this.combine=xu,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class __ extends bs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Rg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class v_ extends bs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Rp extends ln{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new Xe(e),this.intensity=n}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}const Oc=new yt,df=new U,pf=new U;class x_{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $e(512,512),this.mapType=bn,this.map=null,this.mapPass=null,this.matrix=new yt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Pu,this._frameExtents=new $e(1,1),this._viewportCount=1,this._viewports=[new wt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;df.setFromMatrixPosition(e.matrixWorld),n.position.copy(df),pf.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(pf),n.updateMatrixWorld(),Oc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Oc,n.coordinateSystem,n.reversedDepth),n.coordinateSystem===oa||n.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Oc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const $a=new U,ja=new ys,Qn=new U;class Cp extends ln{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new yt,this.projectionMatrix=new yt,this.projectionMatrixInverse=new yt,this.coordinateSystem=si,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose($a,ja,Qn),Qn.x===1&&Qn.y===1&&Qn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose($a,ja,Qn.set(1,1,1)).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorld.decompose($a,ja,Qn),Qn.x===1&&Qn.y===1&&Qn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose($a,ja,Qn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Yi=new U,mf=new $e,gf=new $e;class yn extends Cp{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=jl*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(dc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return jl*2*Math.atan(Math.tan(dc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Yi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yi.x,Yi.y).multiplyScalar(-e/Yi.z),Yi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Yi.x,Yi.y).multiplyScalar(-e/Yi.z)}getViewSize(e,n){return this.getViewBounds(e,mf,gf),n.subVectors(gf,mf)}setViewOffset(e,n,i,r,s,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(dc*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,n-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class M_ extends x_{constructor(){super(new yn(90,1,.5,500)),this.isPointLightShadow=!0}}class Nu extends Rp{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new M_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.distance=this.distance,n.object.decay=this.decay,n.object.shadow=this.shadow.toJSON(),n}}class Pp extends Cp{constructor(e=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+n,c=r-n;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class S_ extends Rp{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}const Yr=-90,$r=1;class E_ extends ln{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new yn(Yr,$r,e,n);r.layers=this.layers,this.add(r);const s=new yn(Yr,$r,e,n);s.layers=this.layers,this.add(s);const a=new yn(Yr,$r,e,n);a.layers=this.layers,this.add(a);const o=new yn(Yr,$r,e,n);o.layers=this.layers,this.add(o);const c=new yn(Yr,$r,e,n);c.layers=this.layers,this.add(c);const l=new yn(Yr,$r,e,n);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,c]=n;for(const l of n)this.remove(l);if(e===si)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===oa)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of n)this.add(l),l.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(n,a),e.setRenderTarget(i,2,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,3,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),e.setRenderTarget(i,4,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),i.texture.generateMipmaps=S,e.setRenderTarget(i,5,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(n,h),e.setRenderTarget(f,u,m),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class y_ extends yn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}function _f(t,e,n,i){const r=b_(i);switch(n){case dp:return t*e;case mp:return t*e/r.components*r.byteLength;case yu:return t*e/r.components*r.byteLength;case os:return t*e*2/r.components*r.byteLength;case bu:return t*e*2/r.components*r.byteLength;case pp:return t*e*3/r.components*r.byteLength;case Yn:return t*e*4/r.components*r.byteLength;case Tu:return t*e*4/r.components*r.byteLength;case ao:case oo:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case co:case lo:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case vl:case Ml:return Math.max(t,16)*Math.max(e,8)/4;case _l:case xl:return Math.max(t,8)*Math.max(e,8)/2;case Sl:case El:case bl:case Tl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case yl:case Al:case wl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Rl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Cl:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case Pl:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Ll:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case Il:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case Dl:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case Ul:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case Nl:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Fl:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Ol:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Bl:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case kl:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case zl:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Vl:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Gl:case Hl:case Wl:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Xl:case ql:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Yl:case $l:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function b_(t){switch(t){case bn:case lp:return{byteLength:1,components:1};case sa:case up:case Di:return{byteLength:2,components:1};case Su:case Eu:return{byteLength:2,components:4};case ui:case Mu:case ri:return{byteLength:4,components:1};case hp:case fp:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:vu}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=vu);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Lp(){let t=null,e=!1,n=null,i=null;function r(s,a){n(s,a),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function T_(t){const e=new WeakMap;function n(o,c){const l=o.array,h=o.usage,f=l.byteLength,u=t.createBuffer();t.bindBuffer(c,u),t.bufferData(c,l,h),o.onUploadCallback();let m;if(l instanceof Float32Array)m=t.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=t.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=t.HALF_FLOAT:m=t.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=t.SHORT;else if(l instanceof Uint32Array)m=t.UNSIGNED_INT;else if(l instanceof Int32Array)m=t.INT;else if(l instanceof Int8Array)m=t.BYTE;else if(l instanceof Uint8Array)m=t.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,c,l){const h=c.array,f=c.updateRanges;if(t.bindBuffer(l,o),f.length===0)t.bufferSubData(l,0,h);else{f.sort((m,_)=>m.start-_.start);let u=0;for(let m=1;m<f.length;m++){const _=f[u],S=f[m];S.start<=_.start+_.count+1?_.count=Math.max(_.count,S.start+S.count-_.start):(++u,f[u]=S)}f.length=u+1;for(let m=0,_=f.length;m<_;m++){const S=f[m];t.bufferSubData(l,S.start*h.BYTES_PER_ELEMENT,h,S.start,S.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(t.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,n(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var A_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,w_=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,R_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,C_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,P_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,L_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,I_=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,D_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,U_=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,N_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,F_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,O_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,B_=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,k_=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,z_=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,V_=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,G_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,H_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,W_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,X_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,q_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Y_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,$_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,j_=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,K_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Z_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,J_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Q_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,e1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,t1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,n1="gl_FragColor = linearToOutputTexel( gl_FragColor );",i1=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,r1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,s1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,a1=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,o1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,c1=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,l1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,u1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,h1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,f1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,d1=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,p1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,m1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,g1=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,_1=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,v1=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,x1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,M1=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,S1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,E1=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,y1=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,b1=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,T1=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,A1=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,w1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,R1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,C1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,P1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,L1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,I1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,D1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,U1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,N1=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,F1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,O1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,B1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,k1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,z1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,V1=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,G1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,H1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,W1=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,X1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,q1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Y1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,$1=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,j1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,K1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Z1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,J1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Q1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,e2=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,t2=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,n2=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,i2=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,r2=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,s2=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,a2=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,o2=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,c2=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,l2=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,u2=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,h2=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,f2=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,d2=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,p2=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,m2=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,g2=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,_2=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,v2=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,x2=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,M2=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,S2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,E2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,y2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,b2=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const T2=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,A2=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,w2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,R2=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,C2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,P2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L2=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,I2=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,D2=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,U2=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,N2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,F2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,O2=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,B2=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,k2=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,z2=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,V2=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,G2=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,H2=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,W2=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,X2=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,q2=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Y2=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,$2=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,j2=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,K2=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Z2=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,J2=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Q2=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ev=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tv=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nv=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,iv=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,rv=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ve={alphahash_fragment:A_,alphahash_pars_fragment:w_,alphamap_fragment:R_,alphamap_pars_fragment:C_,alphatest_fragment:P_,alphatest_pars_fragment:L_,aomap_fragment:I_,aomap_pars_fragment:D_,batching_pars_vertex:U_,batching_vertex:N_,begin_vertex:F_,beginnormal_vertex:O_,bsdfs:B_,iridescence_fragment:k_,bumpmap_pars_fragment:z_,clipping_planes_fragment:V_,clipping_planes_pars_fragment:G_,clipping_planes_pars_vertex:H_,clipping_planes_vertex:W_,color_fragment:X_,color_pars_fragment:q_,color_pars_vertex:Y_,color_vertex:$_,common:j_,cube_uv_reflection_fragment:K_,defaultnormal_vertex:Z_,displacementmap_pars_vertex:J_,displacementmap_vertex:Q_,emissivemap_fragment:e1,emissivemap_pars_fragment:t1,colorspace_fragment:n1,colorspace_pars_fragment:i1,envmap_fragment:r1,envmap_common_pars_fragment:s1,envmap_pars_fragment:a1,envmap_pars_vertex:o1,envmap_physical_pars_fragment:v1,envmap_vertex:c1,fog_vertex:l1,fog_pars_vertex:u1,fog_fragment:h1,fog_pars_fragment:f1,gradientmap_pars_fragment:d1,lightmap_pars_fragment:p1,lights_lambert_fragment:m1,lights_lambert_pars_fragment:g1,lights_pars_begin:_1,lights_toon_fragment:x1,lights_toon_pars_fragment:M1,lights_phong_fragment:S1,lights_phong_pars_fragment:E1,lights_physical_fragment:y1,lights_physical_pars_fragment:b1,lights_fragment_begin:T1,lights_fragment_maps:A1,lights_fragment_end:w1,logdepthbuf_fragment:R1,logdepthbuf_pars_fragment:C1,logdepthbuf_pars_vertex:P1,logdepthbuf_vertex:L1,map_fragment:I1,map_pars_fragment:D1,map_particle_fragment:U1,map_particle_pars_fragment:N1,metalnessmap_fragment:F1,metalnessmap_pars_fragment:O1,morphinstance_vertex:B1,morphcolor_vertex:k1,morphnormal_vertex:z1,morphtarget_pars_vertex:V1,morphtarget_vertex:G1,normal_fragment_begin:H1,normal_fragment_maps:W1,normal_pars_fragment:X1,normal_pars_vertex:q1,normal_vertex:Y1,normalmap_pars_fragment:$1,clearcoat_normal_fragment_begin:j1,clearcoat_normal_fragment_maps:K1,clearcoat_pars_fragment:Z1,iridescence_pars_fragment:J1,opaque_fragment:Q1,packing:e2,premultiplied_alpha_fragment:t2,project_vertex:n2,dithering_fragment:i2,dithering_pars_fragment:r2,roughnessmap_fragment:s2,roughnessmap_pars_fragment:a2,shadowmap_pars_fragment:o2,shadowmap_pars_vertex:c2,shadowmap_vertex:l2,shadowmask_pars_fragment:u2,skinbase_vertex:h2,skinning_pars_vertex:f2,skinning_vertex:d2,skinnormal_vertex:p2,specularmap_fragment:m2,specularmap_pars_fragment:g2,tonemapping_fragment:_2,tonemapping_pars_fragment:v2,transmission_fragment:x2,transmission_pars_fragment:M2,uv_pars_fragment:S2,uv_pars_vertex:E2,uv_vertex:y2,worldpos_vertex:b2,background_vert:T2,background_frag:A2,backgroundCube_vert:w2,backgroundCube_frag:R2,cube_vert:C2,cube_frag:P2,depth_vert:L2,depth_frag:I2,distance_vert:D2,distance_frag:U2,equirect_vert:N2,equirect_frag:F2,linedashed_vert:O2,linedashed_frag:B2,meshbasic_vert:k2,meshbasic_frag:z2,meshlambert_vert:V2,meshlambert_frag:G2,meshmatcap_vert:H2,meshmatcap_frag:W2,meshnormal_vert:X2,meshnormal_frag:q2,meshphong_vert:Y2,meshphong_frag:$2,meshphysical_vert:j2,meshphysical_frag:K2,meshtoon_vert:Z2,meshtoon_frag:J2,points_vert:Q2,points_frag:ev,shadow_vert:tv,shadow_frag:nv,sprite_vert:iv,sprite_frag:rv},ae={common:{diffuse:{value:new Xe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ke}},envmap:{envMap:{value:null},envMapRotation:{value:new ke},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ke}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ke}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ke},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ke},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ke},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ke}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ke}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ke}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Xe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Xe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0},uvTransform:{value:new ke}},sprite:{diffuse:{value:new Xe(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ke},alphaMap:{value:null},alphaMapTransform:{value:new ke},alphaTest:{value:0}}},ii={basic:{uniforms:on([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:Ve.meshbasic_vert,fragmentShader:Ve.meshbasic_frag},lambert:{uniforms:on([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Xe(0)},envMapIntensity:{value:1}}]),vertexShader:Ve.meshlambert_vert,fragmentShader:Ve.meshlambert_frag},phong:{uniforms:on([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new Xe(0)},specular:{value:new Xe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphong_vert,fragmentShader:Ve.meshphong_frag},standard:{uniforms:on([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new Xe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag},toon:{uniforms:on([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new Xe(0)}}]),vertexShader:Ve.meshtoon_vert,fragmentShader:Ve.meshtoon_frag},matcap:{uniforms:on([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:Ve.meshmatcap_vert,fragmentShader:Ve.meshmatcap_frag},points:{uniforms:on([ae.points,ae.fog]),vertexShader:Ve.points_vert,fragmentShader:Ve.points_frag},dashed:{uniforms:on([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ve.linedashed_vert,fragmentShader:Ve.linedashed_frag},depth:{uniforms:on([ae.common,ae.displacementmap]),vertexShader:Ve.depth_vert,fragmentShader:Ve.depth_frag},normal:{uniforms:on([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:Ve.meshnormal_vert,fragmentShader:Ve.meshnormal_frag},sprite:{uniforms:on([ae.sprite,ae.fog]),vertexShader:Ve.sprite_vert,fragmentShader:Ve.sprite_frag},background:{uniforms:{uvTransform:{value:new ke},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ve.background_vert,fragmentShader:Ve.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ke}},vertexShader:Ve.backgroundCube_vert,fragmentShader:Ve.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ve.cube_vert,fragmentShader:Ve.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ve.equirect_vert,fragmentShader:Ve.equirect_frag},distance:{uniforms:on([ae.common,ae.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ve.distance_vert,fragmentShader:Ve.distance_frag},shadow:{uniforms:on([ae.lights,ae.fog,{color:{value:new Xe(0)},opacity:{value:1}}]),vertexShader:Ve.shadow_vert,fragmentShader:Ve.shadow_frag}};ii.physical={uniforms:on([ii.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ke},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ke},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ke},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ke},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ke},sheen:{value:0},sheenColor:{value:new Xe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ke},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ke},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ke},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ke},attenuationDistance:{value:0},attenuationColor:{value:new Xe(0)},specularColor:{value:new Xe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ke},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ke},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ke}}]),vertexShader:Ve.meshphysical_vert,fragmentShader:Ve.meshphysical_frag};const Ka={r:0,b:0,g:0},hr=new hi,sv=new yt;function av(t,e,n,i,r,s){const a=new Xe(0);let o=r===!0?0:1,c,l,h=null,f=0,u=null;function m(M){let b=M.isScene===!0?M.background:null;if(b&&b.isTexture){const E=M.backgroundBlurriness>0;b=e.get(b,E)}return b}function _(M){let b=!1;const E=m(M);E===null?p(a,o):E&&E.isColor&&(p(E,1),b=!0);const w=t.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function S(M,b){const E=m(b);E&&(E.isCubeTexture||E.mapping===Lo)?(l===void 0&&(l=new mn(new ga(1,1,1),new fi({name:"BackgroundCubeMaterial",uniforms:ls(ii.backgroundCube.uniforms),vertexShader:ii.backgroundCube.vertexShader,fragmentShader:ii.backgroundCube.fragmentShader,side:pn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,A,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),hr.copy(b.backgroundRotation),hr.x*=-1,hr.y*=-1,hr.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(hr.y*=-1,hr.z*=-1),l.material.uniforms.envMap.value=E,l.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(sv.makeRotationFromEuler(hr)),l.material.toneMapped=Ke.getTransfer(E.colorSpace)!==st,(h!==E||f!==E.version||u!==t.toneMapping)&&(l.material.needsUpdate=!0,h=E,f=E.version,u=t.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new mn(new Do(2,2),new fi({name:"BackgroundMaterial",uniforms:ls(ii.background.uniforms),vertexShader:ii.background.vertexShader,fragmentShader:ii.background.fragmentShader,side:tr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(E.colorSpace)!==st,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(h!==E||f!==E.version||u!==t.toneMapping)&&(c.material.needsUpdate=!0,h=E,f=E.version,u=t.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function p(M,b){M.getRGB(Ka,wp(t)),n.buffers.color.setClear(Ka.r,Ka.g,Ka.b,b,s)}function d(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,b=1){a.set(M),o=b,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,p(a,o)},render:_,addToRenderList:S,dispose:d}}function ov(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=u(null);let s=r,a=!1;function o(R,B,z,q,k){let G=!1;const N=f(R,q,z,B);s!==N&&(s=N,l(s.object)),G=m(R,q,z,k),G&&_(R,q,z,k),k!==null&&e.update(k,t.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,E(R,B,z,q),k!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function c(){return t.createVertexArray()}function l(R){return t.bindVertexArray(R)}function h(R){return t.deleteVertexArray(R)}function f(R,B,z,q){const k=q.wireframe===!0;let G=i[B.id];G===void 0&&(G={},i[B.id]=G);const N=R.isInstancedMesh===!0?R.id:0;let Q=G[N];Q===void 0&&(Q={},G[N]=Q);let K=Q[z.id];K===void 0&&(K={},Q[z.id]=K);let le=K[k];return le===void 0&&(le=u(c()),K[k]=le),le}function u(R){const B=[],z=[],q=[];for(let k=0;k<n;k++)B[k]=0,z[k]=0,q[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:z,attributeDivisors:q,object:R,attributes:{},index:null}}function m(R,B,z,q){const k=s.attributes,G=B.attributes;let N=0;const Q=z.getAttributes();for(const K in Q)if(Q[K].location>=0){const ge=k[K];let fe=G[K];if(fe===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(fe=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(fe=R.instanceColor)),ge===void 0||ge.attribute!==fe||fe&&ge.data!==fe.data)return!0;N++}return s.attributesNum!==N||s.index!==q}function _(R,B,z,q){const k={},G=B.attributes;let N=0;const Q=z.getAttributes();for(const K in Q)if(Q[K].location>=0){let ge=G[K];ge===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(ge=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(ge=R.instanceColor));const fe={};fe.attribute=ge,ge&&ge.data&&(fe.data=ge.data),k[K]=fe,N++}s.attributes=k,s.attributesNum=N,s.index=q}function S(){const R=s.newAttributes;for(let B=0,z=R.length;B<z;B++)R[B]=0}function p(R){d(R,0)}function d(R,B){const z=s.newAttributes,q=s.enabledAttributes,k=s.attributeDivisors;z[R]=1,q[R]===0&&(t.enableVertexAttribArray(R),q[R]=1),k[R]!==B&&(t.vertexAttribDivisor(R,B),k[R]=B)}function M(){const R=s.newAttributes,B=s.enabledAttributes;for(let z=0,q=B.length;z<q;z++)B[z]!==R[z]&&(t.disableVertexAttribArray(z),B[z]=0)}function b(R,B,z,q,k,G,N){N===!0?t.vertexAttribIPointer(R,B,z,k,G):t.vertexAttribPointer(R,B,z,q,k,G)}function E(R,B,z,q){S();const k=q.attributes,G=z.getAttributes(),N=B.defaultAttributeValues;for(const Q in G){const K=G[Q];if(K.location>=0){let le=k[Q];if(le===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(le=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(le=R.instanceColor)),le!==void 0){const ge=le.normalized,fe=le.itemSize,ze=e.get(le);if(ze===void 0)continue;const gt=ze.buffer,mt=ze.type,$=ze.bytesPerElement,ne=mt===t.INT||mt===t.UNSIGNED_INT||le.gpuType===Mu;if(le.isInterleavedBufferAttribute){const se=le.data,Be=se.stride,Ie=le.offset;if(se.isInstancedInterleavedBuffer){for(let Ue=0;Ue<K.locationSize;Ue++)d(K.location+Ue,se.meshPerAttribute);R.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Ue=0;Ue<K.locationSize;Ue++)p(K.location+Ue);t.bindBuffer(t.ARRAY_BUFFER,gt);for(let Ue=0;Ue<K.locationSize;Ue++)b(K.location+Ue,fe/K.locationSize,mt,ge,Be*$,(Ie+fe/K.locationSize*Ue)*$,ne)}else{if(le.isInstancedBufferAttribute){for(let se=0;se<K.locationSize;se++)d(K.location+se,le.meshPerAttribute);R.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let se=0;se<K.locationSize;se++)p(K.location+se);t.bindBuffer(t.ARRAY_BUFFER,gt);for(let se=0;se<K.locationSize;se++)b(K.location+se,fe/K.locationSize,mt,ge,fe*$,fe/K.locationSize*se*$,ne)}}else if(N!==void 0){const ge=N[Q];if(ge!==void 0)switch(ge.length){case 2:t.vertexAttrib2fv(K.location,ge);break;case 3:t.vertexAttrib3fv(K.location,ge);break;case 4:t.vertexAttrib4fv(K.location,ge);break;default:t.vertexAttrib1fv(K.location,ge)}}}}M()}function w(){y();for(const R in i){const B=i[R];for(const z in B){const q=B[z];for(const k in q){const G=q[k];for(const N in G)h(G[N].object),delete G[N];delete q[k]}}delete i[R]}}function A(R){if(i[R.id]===void 0)return;const B=i[R.id];for(const z in B){const q=B[z];for(const k in q){const G=q[k];for(const N in G)h(G[N].object),delete G[N];delete q[k]}}delete i[R.id]}function P(R){for(const B in i){const z=i[B];for(const q in z){const k=z[q];if(k[R.id]===void 0)continue;const G=k[R.id];for(const N in G)h(G[N].object),delete G[N];delete k[R.id]}}}function v(R){for(const B in i){const z=i[B],q=R.isInstancedMesh===!0?R.id:0,k=z[q];if(k!==void 0){for(const G in k){const N=k[G];for(const Q in N)h(N[Q].object),delete N[Q];delete k[G]}delete z[q],Object.keys(z).length===0&&delete i[B]}}}function y(){H(),a=!0,s!==r&&(s=r,l(s.object))}function H(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:y,resetDefaultState:H,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfObject:v,releaseStatesOfProgram:P,initAttributes:S,enableAttribute:p,disableUnusedAttributes:M}}function cv(t,e,n){let i;function r(l){i=l}function s(l,h){t.drawArrays(i,l,h),n.update(h,i,1)}function a(l,h,f){f!==0&&(t.drawArraysInstanced(i,l,h,f),n.update(h,i,f))}function o(l,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,f);let m=0;for(let _=0;_<f;_++)m+=h[_];n.update(m,i,1)}function c(l,h,f,u){if(f===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<l.length;_++)a(l[_],h[_],u[_]);else{m.multiDrawArraysInstancedWEBGL(i,l,0,h,0,u,0,f);let _=0;for(let S=0;S<f;S++)_+=h[S]*u[S];n.update(_,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function lv(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(P){return!(P!==Yn&&i.convert(P)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const v=P===Di&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==bn&&i.convert(P)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==ri&&!v)}function c(P){if(P==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=n.precision!==void 0?n.precision:"highp";const h=c(l);h!==l&&(Fe("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const f=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),m=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=t.getParameter(t.MAX_TEXTURE_SIZE),p=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),d=t.getParameter(t.MAX_VERTEX_ATTRIBS),M=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),b=t.getParameter(t.MAX_VARYING_VECTORS),E=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),w=t.getParameter(t.MAX_SAMPLES),A=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:m,maxVertexTextures:_,maxTextureSize:S,maxCubemapSize:p,maxAttributes:d,maxVertexUniforms:M,maxVaryings:b,maxFragmentUniforms:E,maxSamples:w,samples:A}}function uv(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new mr,o=new ke,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const m=f.length!==0||u||i!==0||r;return r=u,i=f.length,m},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,u){n=h(f,u,0)},this.setState=function(f,u,m){const _=f.clippingPlanes,S=f.clipIntersection,p=f.clipShadows,d=t.get(f);if(!r||_===null||_.length===0||s&&!p)s?h(null):l();else{const M=s?0:i,b=M*4;let E=d.clippingState||null;c.value=E,E=h(_,u,b,m);for(let w=0;w!==b;++w)E[w]=n[w];d.clippingState=E,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(f,u,m,_){const S=f!==null?f.length:0;let p=null;if(S!==0){if(p=c.value,_!==!0||p===null){const d=m+S*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(p===null||p.length<d)&&(p=new Float32Array(d));for(let b=0,E=m;b!==S;++b,E+=4)a.copy(f[b]).applyMatrix4(M,o),a.normal.toArray(p,E),p[E+3]=a.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,p}}const Qi=4,vf=[.125,.215,.35,.446,.526,.582],_r=20,hv=256,Xs=new Pp,xf=new Xe;let Bc=null,kc=0,zc=0,Vc=!1;const fv=new U;class Mf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,r=100,s={}){const{size:a=256,position:o=fv}=s;Bc=this._renderer.getRenderTarget(),kc=this._renderer.getActiveCubeFace(),zc=this._renderer.getActiveMipmapLevel(),Vc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,o),n>0&&this._blur(c,0,0,n),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=yf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ef(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Bc,kc,zc),this._renderer.xr.enabled=Vc,e.scissorTest=!1,jr(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===wr||e.mapping===as?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Bc=this._renderer.getRenderTarget(),kc=this._renderer.getActiveCubeFace(),zc=this._renderer.getActiveMipmapLevel(),Vc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:nn,minFilter:nn,generateMipmaps:!1,type:Di,format:Yn,colorSpace:cs,depthBuffer:!1},r=Sf(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Sf(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=dv(s)),this._blurMaterial=mv(s,e,n),this._ggxMaterial=pv(s,e,n)}return r}_compileMaterial(e){const n=new mn(new un,e);this._renderer.compile(n,Xs)}_sceneToCubeUV(e,n,i,r,s){const c=new yn(90,1,n,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,m=f.toneMapping;f.getClearColor(xf),f.toneMapping=oi,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new mn(new ga,new Ts({name:"PMREM.Background",side:pn,depthWrite:!1,depthTest:!1})));const S=this._backgroundBox,p=S.material;let d=!1;const M=e.background;M?M.isColor&&(p.color.copy(M),e.background=null,d=!0):(p.color.copy(xf),d=!0);for(let b=0;b<6;b++){const E=b%3;E===0?(c.up.set(0,l[b],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[b],s.y,s.z)):E===1?(c.up.set(0,0,l[b]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[b],s.z)):(c.up.set(0,l[b],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[b]));const w=this._cubeSize;jr(r,E*w,b>2?w:0,w,w),f.setRenderTarget(r),d&&f.render(S,c),f.render(e,c)}f.toneMapping=m,f.autoClear=u,e.background=M}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===wr||e.mapping===as;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=yf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ef());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;jr(n,0,0,3*c,2*c),i.setRenderTarget(n),i.render(a,Xs)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),h=n/(this._lodMeshes.length-1),f=Math.sqrt(l*l-h*h),u=0+l*1.25,m=f*u,{_lodMax:_}=this,S=this._sizeLods[i],p=3*S*(i>_-Qi?i-_+Qi:0),d=4*(this._cubeSize-S);c.envMap.value=e.texture,c.roughness.value=m,c.mipInt.value=_-n,jr(s,p,d,3*S,2*S),r.setRenderTarget(s),r.render(o,Xs),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=_-i,jr(e,p,d,3*S,2*S),r.setRenderTarget(e),r.render(o,Xs)}_blur(e,n,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,n,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Qe("blur direction must be either latitudinal or longitudinal!");const h=3,f=this._lodMeshes[r];f.material=l;const u=l.uniforms,m=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*_r-1),S=s/_,p=isFinite(s)?1+Math.floor(h*S):_r;p>_r&&Fe(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${_r}`);const d=[];let M=0;for(let P=0;P<_r;++P){const v=P/S,y=Math.exp(-v*v/2);d.push(y),P===0?M+=y:P<p&&(M+=2*y)}for(let P=0;P<d.length;P++)d[P]=d[P]/M;u.envMap.value=e.texture,u.samples.value=p,u.weights.value=d,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:b}=this;u.dTheta.value=_,u.mipInt.value=b-i;const E=this._sizeLods[r],w=3*E*(r>b-Qi?r-b+Qi:0),A=4*(this._cubeSize-E);jr(n,w,A,3*E,2*E),c.setRenderTarget(n),c.render(f,Xs)}}function dv(t){const e=[],n=[],i=[];let r=t;const s=t-Qi+1+vf.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let c=1/o;a>t-Qi?c=vf[a-t+Qi-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,f=1+l,u=[h,h,f,h,f,f,h,h,f,f,h,f],m=6,_=6,S=3,p=2,d=1,M=new Float32Array(S*_*m),b=new Float32Array(p*_*m),E=new Float32Array(d*_*m);for(let A=0;A<m;A++){const P=A%3*2/3-1,v=A>2?0:-1,y=[P,v,0,P+2/3,v,0,P+2/3,v+1,0,P,v,0,P+2/3,v+1,0,P,v+1,0];M.set(y,S*_*A),b.set(u,p*_*A);const H=[A,A,A,A,A,A];E.set(H,d*_*A)}const w=new un;w.setAttribute("position",new Tn(M,S)),w.setAttribute("uv",new Tn(b,p)),w.setAttribute("faceIndex",new Tn(E,d)),i.push(new mn(w,null)),r>Qi&&r--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function Sf(t,e,n){const i=new ci(t,e,n);return i.texture.mapping=Lo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function jr(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function pv(t,e,n){return new fi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:hv,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:No(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function mv(t,e,n){const i=new Float32Array(_r),r=new U(0,1,0);return new fi({name:"SphericalGaussianBlur",defines:{n:_r,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:No(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function Ef(){return new fi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:No(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function yf(){return new fi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:No(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Li,depthTest:!1,depthWrite:!1})}function No(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}class Ip extends ci{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Tp(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new ga(5,5,5),s=new fi({name:"CubemapFromEquirect",uniforms:ls(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:pn,blending:Li});s.uniforms.tEquirect.value=n;const a=new mn(r,s),o=n.minFilter;return n.minFilter===vr&&(n.minFilter=nn),new E_(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(s)}}function gv(t){let e=new WeakMap,n=new WeakMap,i=null;function r(u,m=!1){return u==null?null:m?a(u):s(u)}function s(u){if(u&&u.isTexture){const m=u.mapping;if(m===uc||m===hc)if(e.has(u)){const _=e.get(u).texture;return o(_,u.mapping)}else{const _=u.image;if(_&&_.height>0){const S=new Ip(_.height);return S.fromEquirectangularTexture(t,u),e.set(u,S),u.addEventListener("dispose",l),o(S.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const m=u.mapping,_=m===uc||m===hc,S=m===wr||m===as;if(_||S){let p=n.get(u);const d=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==d)return i===null&&(i=new Mf(t)),p=_?i.fromEquirectangular(u,p):i.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,n.set(u,p),p.texture;if(p!==void 0)return p.texture;{const M=u.image;return _&&M&&M.height>0||S&&M&&c(M)?(i===null&&(i=new Mf(t)),p=_?i.fromEquirectangular(u):i.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,n.set(u,p),u.addEventListener("dispose",h),p.texture):null}}}return u}function o(u,m){return m===uc?u.mapping=wr:m===hc&&(u.mapping=as),u}function c(u){let m=0;const _=6;for(let S=0;S<_;S++)u[S]!==void 0&&m++;return m===_}function l(u){const m=u.target;m.removeEventListener("dispose",l);const _=e.get(m);_!==void 0&&(e.delete(m),_.dispose())}function h(u){const m=u.target;m.removeEventListener("dispose",h);const _=n.get(m);_!==void 0&&(n.delete(m),_.dispose())}function f(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function _v(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&vo("WebGLRenderer: "+i+" extension not supported."),r}}}function vv(t,e,n,i){const r={},s=new WeakMap;function a(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const _ in u.attributes)e.remove(u.attributes[_]);u.removeEventListener("dispose",a),delete r[u.id];const m=s.get(u);m&&(e.remove(m),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(f,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,n.memory.geometries++),u}function c(f){const u=f.attributes;for(const m in u)e.update(u[m],t.ARRAY_BUFFER)}function l(f){const u=[],m=f.index,_=f.attributes.position;let S=0;if(_===void 0)return;if(m!==null){const M=m.array;S=m.version;for(let b=0,E=M.length;b<E;b+=3){const w=M[b+0],A=M[b+1],P=M[b+2];u.push(w,A,A,P,P,w)}}else{const M=_.array;S=_.version;for(let b=0,E=M.length/3-1;b<E;b+=3){const w=b+0,A=b+1,P=b+2;u.push(w,A,A,P,P,w)}}const p=new(_.count>=65535?Ep:Sp)(u,1);p.version=S;const d=s.get(f);d&&e.remove(d),s.set(f,p)}function h(f){const u=s.get(f);if(u){const m=f.index;m!==null&&u.version<m.version&&l(f)}else l(f);return s.get(f)}return{get:o,update:c,getWireframeAttribute:h}}function xv(t,e,n){let i;function r(u){i=u}let s,a;function o(u){s=u.type,a=u.bytesPerElement}function c(u,m){t.drawElements(i,m,s,u*a),n.update(m,i,1)}function l(u,m,_){_!==0&&(t.drawElementsInstanced(i,m,s,u*a,_),n.update(m,i,_))}function h(u,m,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,s,u,0,_);let p=0;for(let d=0;d<_;d++)p+=m[d];n.update(p,i,1)}function f(u,m,_,S){if(_===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<u.length;d++)l(u[d]/a,m[d],S[d]);else{p.multiDrawElementsInstancedWEBGL(i,m,0,s,u,0,S,0,_);let d=0;for(let M=0;M<_;M++)d+=m[M]*S[M];n.update(d,i,1)}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function Mv(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:Qe("WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function Sv(t,e,n){const i=new WeakMap,r=new wt;function s(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==f){let H=function(){v.dispose(),i.delete(o),o.removeEventListener("dispose",H)};var m=H;u!==void 0&&u.texture.dispose();const _=o.morphAttributes.position!==void 0,S=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],M=o.morphAttributes.normal||[],b=o.morphAttributes.color||[];let E=0;_===!0&&(E=1),S===!0&&(E=2),p===!0&&(E=3);let w=o.attributes.position.count*E,A=1;w>e.maxTextureSize&&(A=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const P=new Float32Array(w*A*4*f),v=new vp(P,w,A,f);v.type=ri,v.needsUpdate=!0;const y=E*4;for(let R=0;R<f;R++){const B=d[R],z=M[R],q=b[R],k=w*A*4*R;for(let G=0;G<B.count;G++){const N=G*y;_===!0&&(r.fromBufferAttribute(B,G),P[k+N+0]=r.x,P[k+N+1]=r.y,P[k+N+2]=r.z,P[k+N+3]=0),S===!0&&(r.fromBufferAttribute(z,G),P[k+N+4]=r.x,P[k+N+5]=r.y,P[k+N+6]=r.z,P[k+N+7]=0),p===!0&&(r.fromBufferAttribute(q,G),P[k+N+8]=r.x,P[k+N+9]=r.y,P[k+N+10]=r.z,P[k+N+11]=q.itemSize===4?r.w:1)}}u={count:f,texture:v,size:new $e(w,A)},i.set(o,u),o.addEventListener("dispose",H)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let _=0;for(let p=0;p<l.length;p++)_+=l[p];const S=o.morphTargetsRelative?1:1-_;c.getUniforms().setValue(t,"morphTargetBaseInfluence",S),c.getUniforms().setValue(t,"morphTargetInfluences",l)}c.getUniforms().setValue(t,"morphTargetsTexture",u.texture,n),c.getUniforms().setValue(t,"morphTargetsTextureSize",u.size)}return{update:s}}function Ev(t,e,n,i,r){let s=new WeakMap;function a(l){const h=r.render.frame,f=l.geometry,u=e.get(l,f);if(s.get(u)!==h&&(e.update(u),s.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==h&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),s.set(l,h))),l.isSkinnedMesh){const m=l.skeleton;s.get(m)!==h&&(m.update(),s.set(m,h))}return u}function o(){s=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),n.remove(h.instanceMatrix),h.instanceColor!==null&&n.remove(h.instanceColor)}return{update:a,dispose:o}}const yv={[tp]:"LINEAR_TONE_MAPPING",[np]:"REINHARD_TONE_MAPPING",[ip]:"CINEON_TONE_MAPPING",[rp]:"ACES_FILMIC_TONE_MAPPING",[ap]:"AGX_TONE_MAPPING",[op]:"NEUTRAL_TONE_MAPPING",[sp]:"CUSTOM_TONE_MAPPING"};function bv(t,e,n,i,r){const s=new ci(e,n,{type:t,depthBuffer:i,stencilBuffer:r}),a=new ci(e,n,{type:Di,depthBuffer:!1,stencilBuffer:!1}),o=new un;o.setAttribute("position",new $t([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new $t([0,2,0,0,2,0],2));const c=new m_({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),l=new mn(o,c),h=new Pp(-1,1,1,-1,0,1);let f=null,u=null,m=!1,_,S=null,p=[],d=!1;this.setSize=function(M,b){s.setSize(M,b),a.setSize(M,b);for(let E=0;E<p.length;E++){const w=p[E];w.setSize&&w.setSize(M,b)}},this.setEffects=function(M){p=M,d=p.length>0&&p[0].isRenderPass===!0;const b=s.width,E=s.height;for(let w=0;w<p.length;w++){const A=p[w];A.setSize&&A.setSize(b,E)}},this.begin=function(M,b){if(m||M.toneMapping===oi&&p.length===0)return!1;if(S=b,b!==null){const E=b.width,w=b.height;(s.width!==E||s.height!==w)&&this.setSize(E,w)}return d===!1&&M.setRenderTarget(s),_=M.toneMapping,M.toneMapping=oi,!0},this.hasRenderPass=function(){return d},this.end=function(M,b){M.toneMapping=_,m=!0;let E=s,w=a;for(let A=0;A<p.length;A++){const P=p[A];if(P.enabled!==!1&&(P.render(M,w,E,b),P.needsSwap!==!1)){const v=E;E=w,w=v}}if(f!==M.outputColorSpace||u!==M.toneMapping){f=M.outputColorSpace,u=M.toneMapping,c.defines={},Ke.getTransfer(f)===st&&(c.defines.SRGB_TRANSFER="");const A=yv[u];A&&(c.defines[A]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=E.texture,M.setRenderTarget(S),M.render(l,h),S=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){s.dispose(),a.dispose(),o.dispose(),c.dispose()}}const Dp=new cn,Zl=new ca(1,1),Up=new vp,Np=new qg,Fp=new Tp,bf=[],Tf=[],Af=new Float32Array(16),wf=new Float32Array(9),Rf=new Float32Array(4);function As(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=bf[r];if(s===void 0&&(s=new Float32Array(r),bf[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(s,o)}return s}function zt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Vt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Fo(t,e){let n=Tf[e];n===void 0&&(n=new Int32Array(e),Tf[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function Tv(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function Av(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(zt(n,e))return;t.uniform2fv(this.addr,e),Vt(n,e)}}function wv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(zt(n,e))return;t.uniform3fv(this.addr,e),Vt(n,e)}}function Rv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(zt(n,e))return;t.uniform4fv(this.addr,e),Vt(n,e)}}function Cv(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(zt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Vt(n,e)}else{if(zt(n,i))return;Rf.set(i),t.uniformMatrix2fv(this.addr,!1,Rf),Vt(n,i)}}function Pv(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(zt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Vt(n,e)}else{if(zt(n,i))return;wf.set(i),t.uniformMatrix3fv(this.addr,!1,wf),Vt(n,i)}}function Lv(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(zt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Vt(n,e)}else{if(zt(n,i))return;Af.set(i),t.uniformMatrix4fv(this.addr,!1,Af),Vt(n,i)}}function Iv(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function Dv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(zt(n,e))return;t.uniform2iv(this.addr,e),Vt(n,e)}}function Uv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(zt(n,e))return;t.uniform3iv(this.addr,e),Vt(n,e)}}function Nv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(zt(n,e))return;t.uniform4iv(this.addr,e),Vt(n,e)}}function Fv(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function Ov(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(zt(n,e))return;t.uniform2uiv(this.addr,e),Vt(n,e)}}function Bv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(zt(n,e))return;t.uniform3uiv(this.addr,e),Vt(n,e)}}function kv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(zt(n,e))return;t.uniform4uiv(this.addr,e),Vt(n,e)}}function zv(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(Zl.compareFunction=n.isReversedDepthBuffer()?wu:Au,s=Zl):s=Dp,n.setTexture2D(e||s,r)}function Vv(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Np,r)}function Gv(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||Fp,r)}function Hv(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||Up,r)}function Wv(t){switch(t){case 5126:return Tv;case 35664:return Av;case 35665:return wv;case 35666:return Rv;case 35674:return Cv;case 35675:return Pv;case 35676:return Lv;case 5124:case 35670:return Iv;case 35667:case 35671:return Dv;case 35668:case 35672:return Uv;case 35669:case 35673:return Nv;case 5125:return Fv;case 36294:return Ov;case 36295:return Bv;case 36296:return kv;case 35678:case 36198:case 36298:case 36306:case 35682:return zv;case 35679:case 36299:case 36307:return Vv;case 35680:case 36300:case 36308:case 36293:return Gv;case 36289:case 36303:case 36311:case 36292:return Hv}}function Xv(t,e){t.uniform1fv(this.addr,e)}function qv(t,e){const n=As(e,this.size,2);t.uniform2fv(this.addr,n)}function Yv(t,e){const n=As(e,this.size,3);t.uniform3fv(this.addr,n)}function $v(t,e){const n=As(e,this.size,4);t.uniform4fv(this.addr,n)}function jv(t,e){const n=As(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function Kv(t,e){const n=As(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function Zv(t,e){const n=As(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function Jv(t,e){t.uniform1iv(this.addr,e)}function Qv(t,e){t.uniform2iv(this.addr,e)}function ex(t,e){t.uniform3iv(this.addr,e)}function tx(t,e){t.uniform4iv(this.addr,e)}function nx(t,e){t.uniform1uiv(this.addr,e)}function ix(t,e){t.uniform2uiv(this.addr,e)}function rx(t,e){t.uniform3uiv(this.addr,e)}function sx(t,e){t.uniform4uiv(this.addr,e)}function ax(t,e,n){const i=this.cache,r=e.length,s=Fo(n,r);zt(i,s)||(t.uniform1iv(this.addr,s),Vt(i,s));let a;this.type===t.SAMPLER_2D_SHADOW?a=Zl:a=Dp;for(let o=0;o!==r;++o)n.setTexture2D(e[o]||a,s[o])}function ox(t,e,n){const i=this.cache,r=e.length,s=Fo(n,r);zt(i,s)||(t.uniform1iv(this.addr,s),Vt(i,s));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||Np,s[a])}function cx(t,e,n){const i=this.cache,r=e.length,s=Fo(n,r);zt(i,s)||(t.uniform1iv(this.addr,s),Vt(i,s));for(let a=0;a!==r;++a)n.setTextureCube(e[a]||Fp,s[a])}function lx(t,e,n){const i=this.cache,r=e.length,s=Fo(n,r);zt(i,s)||(t.uniform1iv(this.addr,s),Vt(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||Up,s[a])}function ux(t){switch(t){case 5126:return Xv;case 35664:return qv;case 35665:return Yv;case 35666:return $v;case 35674:return jv;case 35675:return Kv;case 35676:return Zv;case 5124:case 35670:return Jv;case 35667:case 35671:return Qv;case 35668:case 35672:return ex;case 35669:case 35673:return tx;case 5125:return nx;case 36294:return ix;case 36295:return rx;case 36296:return sx;case 35678:case 36198:case 36298:case 36306:case 35682:return ax;case 35679:case 36299:case 36307:return ox;case 35680:case 36300:case 36308:case 36293:return cx;case 36289:case 36303:case 36311:case 36292:return lx}}class hx{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=Wv(n.type)}}class fx{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=ux(n.type)}}class dx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,n[o.id],i)}}}const Gc=/(\w+)(\])?(\[|\.)?/g;function Cf(t,e){t.seq.push(e),t.map[e.id]=e}function px(t,e,n){const i=t.name,r=i.length;for(Gc.lastIndex=0;;){const s=Gc.exec(i),a=Gc.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){Cf(n,l===void 0?new hx(o,t,e):new fx(o,t,e));break}else{let f=n.map[o];f===void 0&&(f=new dx(o),Cf(n,f)),n=f}}}class uo{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(n,a),c=e.getUniformLocation(n,o.name);px(o,c,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in n&&i.push(a)}return i}}function Pf(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const mx=37297;let gx=0;function _x(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}const Lf=new ke;function vx(t){Ke._getMatrix(Lf,Ke.workingColorSpace,t);const e=`mat3( ${Lf.elements.map(n=>n.toFixed(4))} )`;switch(Ke.getTransfer(t)){case go:return[e,"LinearTransferOETF"];case st:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function If(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return n.toUpperCase()+`

`+s+`

`+_x(t.getShaderSource(e),o)}else return s}function xx(t,e){const n=vx(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const Mx={[tp]:"Linear",[np]:"Reinhard",[ip]:"Cineon",[rp]:"ACESFilmic",[ap]:"AgX",[op]:"Neutral",[sp]:"Custom"};function Sx(t,e){const n=Mx[e];return n===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Za=new U;function Ex(){Ke.getLuminanceCoefficients(Za);const t=Za.x.toFixed(4),e=Za.y.toFixed(4),n=Za.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function yx(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ks).join(`
`)}function bx(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function Tx(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),a=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function Ks(t){return t!==""}function Df(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Uf(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ax=/^[ \t]*#include +<([\w\d./]+)>/gm;function Jl(t){return t.replace(Ax,Rx)}const wx=new Map;function Rx(t,e){let n=Ve[e];if(n===void 0){const i=wx.get(e);if(i!==void 0)n=Ve[i],Fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Jl(n)}const Cx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Nf(t){return t.replace(Cx,Px)}function Px(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Ff(t){let e=`precision ${t.precision} float;
	precision ${t.precision} int;
	precision ${t.precision} sampler2D;
	precision ${t.precision} samplerCube;
	precision ${t.precision} sampler3D;
	precision ${t.precision} sampler2DArray;
	precision ${t.precision} sampler2DShadow;
	precision ${t.precision} samplerCubeShadow;
	precision ${t.precision} sampler2DArrayShadow;
	precision ${t.precision} isampler2D;
	precision ${t.precision} isampler3D;
	precision ${t.precision} isamplerCube;
	precision ${t.precision} isampler2DArray;
	precision ${t.precision} usampler2D;
	precision ${t.precision} usampler3D;
	precision ${t.precision} usamplerCube;
	precision ${t.precision} usampler2DArray;
	`;return t.precision==="highp"?e+=`
#define HIGH_PRECISION`:t.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:t.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Lx={[so]:"SHADOWMAP_TYPE_PCF",[js]:"SHADOWMAP_TYPE_VSM"};function Ix(t){return Lx[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Dx={[wr]:"ENVMAP_TYPE_CUBE",[as]:"ENVMAP_TYPE_CUBE",[Lo]:"ENVMAP_TYPE_CUBE_UV"};function Ux(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":Dx[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const Nx={[as]:"ENVMAP_MODE_REFRACTION"};function Fx(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":Nx[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Ox={[xu]:"ENVMAP_BLENDING_MULTIPLY",[Tg]:"ENVMAP_BLENDING_MIX",[Ag]:"ENVMAP_BLENDING_ADD"};function Bx(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":Ox[t.combine]||"ENVMAP_BLENDING_NONE"}function kx(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function zx(t,e,n,i){const r=t.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const c=Ix(n),l=Ux(n),h=Fx(n),f=Bx(n),u=kx(n),m=yx(n),_=bx(s),S=r.createProgram();let p,d,M=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Ks).join(`
`),p.length>0&&(p+=`
`),d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Ks).join(`
`),d.length>0&&(d+=`
`)):(p=[Ff(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ks).join(`
`),d=[Ff(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+l:"",n.envMap?"#define "+h:"",n.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==oi?"#define TONE_MAPPING":"",n.toneMapping!==oi?Ve.tonemapping_pars_fragment:"",n.toneMapping!==oi?Sx("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ve.colorspace_pars_fragment,xx("linearToOutputTexel",n.outputColorSpace),Ex(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ks).join(`
`)),a=Jl(a),a=Df(a,n),a=Uf(a,n),o=Jl(o),o=Df(o,n),o=Uf(o,n),a=Nf(a),o=Nf(o),n.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,d=["#define varying in",n.glslVersion===Yh?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Yh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const b=M+p+a,E=M+d+o,w=Pf(r,r.VERTEX_SHADER,b),A=Pf(r,r.FRAGMENT_SHADER,E);r.attachShader(S,w),r.attachShader(S,A),n.index0AttributeName!==void 0?r.bindAttribLocation(S,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(S,0,"position"),r.linkProgram(S);function P(R){if(t.debug.checkShaderErrors){const B=r.getProgramInfoLog(S)||"",z=r.getShaderInfoLog(w)||"",q=r.getShaderInfoLog(A)||"",k=B.trim(),G=z.trim(),N=q.trim();let Q=!0,K=!0;if(r.getProgramParameter(S,r.LINK_STATUS)===!1)if(Q=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,S,w,A);else{const le=If(r,w,"vertex"),ge=If(r,A,"fragment");Qe("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(S,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+k+`
`+le+`
`+ge)}else k!==""?Fe("WebGLProgram: Program Info Log:",k):(G===""||N==="")&&(K=!1);K&&(R.diagnostics={runnable:Q,programLog:k,vertexShader:{log:G,prefix:p},fragmentShader:{log:N,prefix:d}})}r.deleteShader(w),r.deleteShader(A),v=new uo(r,S),y=Tx(r,S)}let v;this.getUniforms=function(){return v===void 0&&P(this),v};let y;this.getAttributes=function(){return y===void 0&&P(this),y};let H=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return H===!1&&(H=r.getProgramParameter(S,mx)),H},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(S),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=gx++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=w,this.fragmentShader=A,this}let Vx=0;class Gx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new Hx(e),n.set(e,i)),i}}class Hx{constructor(e){this.id=Vx++,this.code=e,this.usedTimes=0}}function Wx(t,e,n,i,r,s){const a=new xp,o=new Gx,c=new Set,l=[],h=new Map,f=i.logarithmicDepthBuffer;let u=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return c.add(v),v===0?"uv":`uv${v}`}function S(v,y,H,R,B){const z=R.fog,q=B.geometry,k=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?R.environment:null,G=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,N=e.get(v.envMap||k,G),Q=N&&N.mapping===Lo?N.image.height:null,K=m[v.type];v.precision!==null&&(u=i.getMaxPrecision(v.precision),u!==v.precision&&Fe("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const le=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,ge=le!==void 0?le.length:0;let fe=0;q.morphAttributes.position!==void 0&&(fe=1),q.morphAttributes.normal!==void 0&&(fe=2),q.morphAttributes.color!==void 0&&(fe=3);let ze,gt,mt,$;if(K){const rt=ii[K];ze=rt.vertexShader,gt=rt.fragmentShader}else ze=v.vertexShader,gt=v.fragmentShader,o.update(v),mt=o.getVertexShaderID(v),$=o.getFragmentShaderID(v);const ne=t.getRenderTarget(),se=t.state.buffers.depth.getReversed(),Be=B.isInstancedMesh===!0,Ie=B.isBatchedMesh===!0,Ue=!!v.map,Ht=!!v.matcap,je=!!N,it=!!v.aoMap,lt=!!v.lightMap,Ge=!!v.bumpMap,Ct=!!v.normalMap,C=!!v.displacementMap,It=!!v.emissiveMap,nt=!!v.metalnessMap,dt=!!v.roughnessMap,Ee=v.anisotropy>0,T=v.clearcoat>0,g=v.dispersion>0,I=v.iridescence>0,Y=v.sheen>0,j=v.transmission>0,X=Ee&&!!v.anisotropyMap,_e=T&&!!v.clearcoatMap,ie=T&&!!v.clearcoatNormalMap,Pe=T&&!!v.clearcoatRoughnessMap,De=I&&!!v.iridescenceMap,Z=I&&!!v.iridescenceThicknessMap,ee=Y&&!!v.sheenColorMap,ve=Y&&!!v.sheenRoughnessMap,Me=!!v.specularMap,ue=!!v.specularColorMap,He=!!v.specularIntensityMap,L=j&&!!v.transmissionMap,re=j&&!!v.thicknessMap,te=!!v.gradientMap,pe=!!v.alphaMap,J=v.alphaTest>0,W=!!v.alphaHash,xe=!!v.extensions;let Ne=oi;v.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Ne=t.toneMapping);const pt={shaderID:K,shaderType:v.type,shaderName:v.name,vertexShader:ze,fragmentShader:gt,defines:v.defines,customVertexShaderID:mt,customFragmentShaderID:$,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:Ie,batchingColor:Ie&&B._colorsTexture!==null,instancing:Be,instancingColor:Be&&B.instanceColor!==null,instancingMorph:Be&&B.morphTexture!==null,outputColorSpace:ne===null?t.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:cs,alphaToCoverage:!!v.alphaToCoverage,map:Ue,matcap:Ht,envMap:je,envMapMode:je&&N.mapping,envMapCubeUVHeight:Q,aoMap:it,lightMap:lt,bumpMap:Ge,normalMap:Ct,displacementMap:C,emissiveMap:It,normalMapObjectSpace:Ct&&v.normalMapType===Cg,normalMapTangentSpace:Ct&&v.normalMapType===gp,metalnessMap:nt,roughnessMap:dt,anisotropy:Ee,anisotropyMap:X,clearcoat:T,clearcoatMap:_e,clearcoatNormalMap:ie,clearcoatRoughnessMap:Pe,dispersion:g,iridescence:I,iridescenceMap:De,iridescenceThicknessMap:Z,sheen:Y,sheenColorMap:ee,sheenRoughnessMap:ve,specularMap:Me,specularColorMap:ue,specularIntensityMap:He,transmission:j,transmissionMap:L,thicknessMap:re,gradientMap:te,opaque:v.transparent===!1&&v.blending===es&&v.alphaToCoverage===!1,alphaMap:pe,alphaTest:J,alphaHash:W,combine:v.combine,mapUv:Ue&&_(v.map.channel),aoMapUv:it&&_(v.aoMap.channel),lightMapUv:lt&&_(v.lightMap.channel),bumpMapUv:Ge&&_(v.bumpMap.channel),normalMapUv:Ct&&_(v.normalMap.channel),displacementMapUv:C&&_(v.displacementMap.channel),emissiveMapUv:It&&_(v.emissiveMap.channel),metalnessMapUv:nt&&_(v.metalnessMap.channel),roughnessMapUv:dt&&_(v.roughnessMap.channel),anisotropyMapUv:X&&_(v.anisotropyMap.channel),clearcoatMapUv:_e&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:ie&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pe&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:De&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:ee&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:ve&&_(v.sheenRoughnessMap.channel),specularMapUv:Me&&_(v.specularMap.channel),specularColorMapUv:ue&&_(v.specularColorMap.channel),specularIntensityMapUv:He&&_(v.specularIntensityMap.channel),transmissionMapUv:L&&_(v.transmissionMap.channel),thicknessMapUv:re&&_(v.thicknessMap.channel),alphaMapUv:pe&&_(v.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(Ct||Ee),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!q.attributes.uv&&(Ue||pe),fog:!!z,useFog:v.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||q.attributes.normal===void 0&&Ct===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:se,skinning:B.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:ge,morphTextureStride:fe,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:t.shadowMap.enabled&&H.length>0,shadowMapType:t.shadowMap.type,toneMapping:Ne,decodeVideoTexture:Ue&&v.map.isVideoTexture===!0&&Ke.getTransfer(v.map.colorSpace)===st,decodeVideoTextureEmissive:It&&v.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(v.emissiveMap.colorSpace)===st,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Ai,flipSided:v.side===pn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:xe&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xe&&v.extensions.multiDraw===!0||Ie)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return pt.vertexUv1s=c.has(1),pt.vertexUv2s=c.has(2),pt.vertexUv3s=c.has(3),c.clear(),pt}function p(v){const y=[];if(v.shaderID?y.push(v.shaderID):(y.push(v.customVertexShaderID),y.push(v.customFragmentShaderID)),v.defines!==void 0)for(const H in v.defines)y.push(H),y.push(v.defines[H]);return v.isRawShaderMaterial===!1&&(d(y,v),M(y,v),y.push(t.outputColorSpace)),y.push(v.customProgramCacheKey),y.join()}function d(v,y){v.push(y.precision),v.push(y.outputColorSpace),v.push(y.envMapMode),v.push(y.envMapCubeUVHeight),v.push(y.mapUv),v.push(y.alphaMapUv),v.push(y.lightMapUv),v.push(y.aoMapUv),v.push(y.bumpMapUv),v.push(y.normalMapUv),v.push(y.displacementMapUv),v.push(y.emissiveMapUv),v.push(y.metalnessMapUv),v.push(y.roughnessMapUv),v.push(y.anisotropyMapUv),v.push(y.clearcoatMapUv),v.push(y.clearcoatNormalMapUv),v.push(y.clearcoatRoughnessMapUv),v.push(y.iridescenceMapUv),v.push(y.iridescenceThicknessMapUv),v.push(y.sheenColorMapUv),v.push(y.sheenRoughnessMapUv),v.push(y.specularMapUv),v.push(y.specularColorMapUv),v.push(y.specularIntensityMapUv),v.push(y.transmissionMapUv),v.push(y.thicknessMapUv),v.push(y.combine),v.push(y.fogExp2),v.push(y.sizeAttenuation),v.push(y.morphTargetsCount),v.push(y.morphAttributeCount),v.push(y.numDirLights),v.push(y.numPointLights),v.push(y.numSpotLights),v.push(y.numSpotLightMaps),v.push(y.numHemiLights),v.push(y.numRectAreaLights),v.push(y.numDirLightShadows),v.push(y.numPointLightShadows),v.push(y.numSpotLightShadows),v.push(y.numSpotLightShadowsWithMaps),v.push(y.numLightProbes),v.push(y.shadowMapType),v.push(y.toneMapping),v.push(y.numClippingPlanes),v.push(y.numClipIntersection),v.push(y.depthPacking)}function M(v,y){a.disableAll(),y.instancing&&a.enable(0),y.instancingColor&&a.enable(1),y.instancingMorph&&a.enable(2),y.matcap&&a.enable(3),y.envMap&&a.enable(4),y.normalMapObjectSpace&&a.enable(5),y.normalMapTangentSpace&&a.enable(6),y.clearcoat&&a.enable(7),y.iridescence&&a.enable(8),y.alphaTest&&a.enable(9),y.vertexColors&&a.enable(10),y.vertexAlphas&&a.enable(11),y.vertexUv1s&&a.enable(12),y.vertexUv2s&&a.enable(13),y.vertexUv3s&&a.enable(14),y.vertexTangents&&a.enable(15),y.anisotropy&&a.enable(16),y.alphaHash&&a.enable(17),y.batching&&a.enable(18),y.dispersion&&a.enable(19),y.batchingColor&&a.enable(20),y.gradientMap&&a.enable(21),v.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),v.push(a.mask)}function b(v){const y=m[v.type];let H;if(y){const R=ii[y];H=f_.clone(R.uniforms)}else H=v.uniforms;return H}function E(v,y){let H=h.get(y);return H!==void 0?++H.usedTimes:(H=new zx(t,y,v,r),l.push(H),h.set(y,H)),H}function w(v){if(--v.usedTimes===0){const y=l.indexOf(v);l[y]=l[l.length-1],l.pop(),h.delete(v.cacheKey),v.destroy()}}function A(v){o.remove(v)}function P(){o.dispose()}return{getParameters:S,getProgramCacheKey:p,getUniforms:b,acquireProgram:E,releaseProgram:w,releaseShaderCache:A,programs:l,dispose:P}}function Xx(){let t=new WeakMap;function e(a){return t.has(a)}function n(a){let o=t.get(a);return o===void 0&&(o={},t.set(a,o)),o}function i(a){t.delete(a)}function r(a,o,c){t.get(a)[o]=c}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function qx(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function Of(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Bf(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function a(u){let m=0;return u.isInstancedMesh&&(m+=2),u.isSkinnedMesh&&(m+=1),m}function o(u,m,_,S,p,d){let M=t[e];return M===void 0?(M={id:u.id,object:u,geometry:m,material:_,materialVariant:a(u),groupOrder:S,renderOrder:u.renderOrder,z:p,group:d},t[e]=M):(M.id=u.id,M.object=u,M.geometry=m,M.material=_,M.materialVariant=a(u),M.groupOrder=S,M.renderOrder=u.renderOrder,M.z=p,M.group=d),e++,M}function c(u,m,_,S,p,d){const M=o(u,m,_,S,p,d);_.transmission>0?i.push(M):_.transparent===!0?r.push(M):n.push(M)}function l(u,m,_,S,p,d){const M=o(u,m,_,S,p,d);_.transmission>0?i.unshift(M):_.transparent===!0?r.unshift(M):n.unshift(M)}function h(u,m){n.length>1&&n.sort(u||qx),i.length>1&&i.sort(m||Of),r.length>1&&r.sort(m||Of)}function f(){for(let u=e,m=t.length;u<m;u++){const _=t[u];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:f,sort:h}}function Yx(){let t=new WeakMap;function e(i,r){const s=t.get(i);let a;return s===void 0?(a=new Bf,t.set(i,[a])):r>=s.length?(a=new Bf,s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function $x(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new U,color:new Xe};break;case"SpotLight":n={position:new U,direction:new U,color:new Xe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new U,color:new Xe,distance:0,decay:0};break;case"HemisphereLight":n={direction:new U,skyColor:new Xe,groundColor:new Xe};break;case"RectAreaLight":n={color:new Xe,position:new U,halfWidth:new U,halfHeight:new U};break}return t[e.id]=n,n}}}function jx(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let Kx=0;function Zx(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function Jx(t){const e=new $x,n=jx(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new U);const r=new U,s=new yt,a=new yt;function o(l){let h=0,f=0,u=0;for(let y=0;y<9;y++)i.probe[y].set(0,0,0);let m=0,_=0,S=0,p=0,d=0,M=0,b=0,E=0,w=0,A=0,P=0;l.sort(Zx);for(let y=0,H=l.length;y<H;y++){const R=l[y],B=R.color,z=R.intensity,q=R.distance;let k=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===os?k=R.shadow.map.texture:k=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)h+=B.r*z,f+=B.g*z,u+=B.b*z;else if(R.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(R.sh.coefficients[G],z);P++}else if(R.isDirectionalLight){const G=e.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const N=R.shadow,Q=n.get(R);Q.shadowIntensity=N.intensity,Q.shadowBias=N.bias,Q.shadowNormalBias=N.normalBias,Q.shadowRadius=N.radius,Q.shadowMapSize=N.mapSize,i.directionalShadow[m]=Q,i.directionalShadowMap[m]=k,i.directionalShadowMatrix[m]=R.shadow.matrix,M++}i.directional[m]=G,m++}else if(R.isSpotLight){const G=e.get(R);G.position.setFromMatrixPosition(R.matrixWorld),G.color.copy(B).multiplyScalar(z),G.distance=q,G.coneCos=Math.cos(R.angle),G.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),G.decay=R.decay,i.spot[S]=G;const N=R.shadow;if(R.map&&(i.spotLightMap[w]=R.map,w++,N.updateMatrices(R),R.castShadow&&A++),i.spotLightMatrix[S]=N.matrix,R.castShadow){const Q=n.get(R);Q.shadowIntensity=N.intensity,Q.shadowBias=N.bias,Q.shadowNormalBias=N.normalBias,Q.shadowRadius=N.radius,Q.shadowMapSize=N.mapSize,i.spotShadow[S]=Q,i.spotShadowMap[S]=k,E++}S++}else if(R.isRectAreaLight){const G=e.get(R);G.color.copy(B).multiplyScalar(z),G.halfWidth.set(R.width*.5,0,0),G.halfHeight.set(0,R.height*.5,0),i.rectArea[p]=G,p++}else if(R.isPointLight){const G=e.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity),G.distance=R.distance,G.decay=R.decay,R.castShadow){const N=R.shadow,Q=n.get(R);Q.shadowIntensity=N.intensity,Q.shadowBias=N.bias,Q.shadowNormalBias=N.normalBias,Q.shadowRadius=N.radius,Q.shadowMapSize=N.mapSize,Q.shadowCameraNear=N.camera.near,Q.shadowCameraFar=N.camera.far,i.pointShadow[_]=Q,i.pointShadowMap[_]=k,i.pointShadowMatrix[_]=R.shadow.matrix,b++}i.point[_]=G,_++}else if(R.isHemisphereLight){const G=e.get(R);G.skyColor.copy(R.color).multiplyScalar(z),G.groundColor.copy(R.groundColor).multiplyScalar(z),i.hemi[d]=G,d++}}p>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ae.LTC_FLOAT_1,i.rectAreaLTC2=ae.LTC_FLOAT_2):(i.rectAreaLTC1=ae.LTC_HALF_1,i.rectAreaLTC2=ae.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=u;const v=i.hash;(v.directionalLength!==m||v.pointLength!==_||v.spotLength!==S||v.rectAreaLength!==p||v.hemiLength!==d||v.numDirectionalShadows!==M||v.numPointShadows!==b||v.numSpotShadows!==E||v.numSpotMaps!==w||v.numLightProbes!==P)&&(i.directional.length=m,i.spot.length=S,i.rectArea.length=p,i.point.length=_,i.hemi.length=d,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=b,i.pointShadowMap.length=b,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=b,i.spotLightMatrix.length=E+w-A,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=P,v.directionalLength=m,v.pointLength=_,v.spotLength=S,v.rectAreaLength=p,v.hemiLength=d,v.numDirectionalShadows=M,v.numPointShadows=b,v.numSpotShadows=E,v.numSpotMaps=w,v.numLightProbes=P,i.version=Kx++)}function c(l,h){let f=0,u=0,m=0,_=0,S=0;const p=h.matrixWorldInverse;for(let d=0,M=l.length;d<M;d++){const b=l[d];if(b.isDirectionalLight){const E=i.directional[f];E.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(p),f++}else if(b.isSpotLight){const E=i.spot[m];E.position.setFromMatrixPosition(b.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(b.matrixWorld),r.setFromMatrixPosition(b.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(p),m++}else if(b.isRectAreaLight){const E=i.rectArea[_];E.position.setFromMatrixPosition(b.matrixWorld),E.position.applyMatrix4(p),a.identity(),s.copy(b.matrixWorld),s.premultiply(p),a.extractRotation(s),E.halfWidth.set(b.width*.5,0,0),E.halfHeight.set(0,b.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),_++}else if(b.isPointLight){const E=i.point[u];E.position.setFromMatrixPosition(b.matrixWorld),E.position.applyMatrix4(p),u++}else if(b.isHemisphereLight){const E=i.hemi[S];E.direction.setFromMatrixPosition(b.matrixWorld),E.direction.transformDirection(p),S++}}}return{setup:o,setupView:c,state:i}}function kf(t){const e=new Jx(t),n=[],i=[];function r(h){l.camera=h,n.length=0,i.length=0}function s(h){n.push(h)}function a(h){i.push(h)}function o(){e.setup(n)}function c(h){e.setupView(n,h)}const l={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function Qx(t){let e=new WeakMap;function n(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new kf(t),e.set(r,[o])):s>=a.length?(o=new kf(t),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const e3=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,t3=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,n3=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],i3=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],zf=new yt,qs=new U,Hc=new U;function r3(t,e,n){let i=new Pu;const r=new $e,s=new $e,a=new wt,o=new __,c=new v_,l={},h=n.maxTextureSize,f={[tr]:pn,[pn]:tr,[Ai]:Ai},u=new fi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:e3,fragmentShader:t3}),m=u.clone();m.defines.HORIZONTAL_PASS=1;const _=new un;_.setAttribute("position",new Tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new mn(_,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=so;let d=this.type;this.render=function(A,P,v){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;this.type===ag&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=so);const y=t.getRenderTarget(),H=t.getActiveCubeFace(),R=t.getActiveMipmapLevel(),B=t.state;B.setBlending(Li),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const z=d!==this.type;z&&P.traverse(function(q){q.material&&(Array.isArray(q.material)?q.material.forEach(k=>k.needsUpdate=!0):q.material.needsUpdate=!0)});for(let q=0,k=A.length;q<k;q++){const G=A[q],N=G.shadow;if(N===void 0){Fe("WebGLShadowMap:",G,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;r.copy(N.mapSize);const Q=N.getFrameExtents();r.multiply(Q),s.copy(N.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/Q.x),r.x=s.x*Q.x,N.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/Q.y),r.y=s.y*Q.y,N.mapSize.y=s.y));const K=t.state.buffers.depth.getReversed();if(N.camera._reversedDepth=K,N.map===null||z===!0){if(N.map!==null&&(N.map.depthTexture!==null&&(N.map.depthTexture.dispose(),N.map.depthTexture=null),N.map.dispose()),this.type===js){if(G.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}N.map=new ci(r.x,r.y,{format:os,type:Di,minFilter:nn,magFilter:nn,generateMipmaps:!1}),N.map.texture.name=G.name+".shadowMap",N.map.depthTexture=new ca(r.x,r.y,ri),N.map.depthTexture.name=G.name+".shadowMapDepth",N.map.depthTexture.format=Ui,N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Kt,N.map.depthTexture.magFilter=Kt}else G.isPointLight?(N.map=new Ip(r.x),N.map.depthTexture=new u_(r.x,ui)):(N.map=new ci(r.x,r.y),N.map.depthTexture=new ca(r.x,r.y,ui)),N.map.depthTexture.name=G.name+".shadowMap",N.map.depthTexture.format=Ui,this.type===so?(N.map.depthTexture.compareFunction=K?wu:Au,N.map.depthTexture.minFilter=nn,N.map.depthTexture.magFilter=nn):(N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Kt,N.map.depthTexture.magFilter=Kt);N.camera.updateProjectionMatrix()}const le=N.map.isWebGLCubeRenderTarget?6:1;for(let ge=0;ge<le;ge++){if(N.map.isWebGLCubeRenderTarget)t.setRenderTarget(N.map,ge),t.clear();else{ge===0&&(t.setRenderTarget(N.map),t.clear());const fe=N.getViewport(ge);a.set(s.x*fe.x,s.y*fe.y,s.x*fe.z,s.y*fe.w),B.viewport(a)}if(G.isPointLight){const fe=N.camera,ze=N.matrix,gt=G.distance||fe.far;gt!==fe.far&&(fe.far=gt,fe.updateProjectionMatrix()),qs.setFromMatrixPosition(G.matrixWorld),fe.position.copy(qs),Hc.copy(fe.position),Hc.add(n3[ge]),fe.up.copy(i3[ge]),fe.lookAt(Hc),fe.updateMatrixWorld(),ze.makeTranslation(-qs.x,-qs.y,-qs.z),zf.multiplyMatrices(fe.projectionMatrix,fe.matrixWorldInverse),N._frustum.setFromProjectionMatrix(zf,fe.coordinateSystem,fe.reversedDepth)}else N.updateMatrices(G);i=N.getFrustum(),E(P,v,N.camera,G,this.type)}N.isPointLightShadow!==!0&&this.type===js&&M(N,v),N.needsUpdate=!1}d=this.type,p.needsUpdate=!1,t.setRenderTarget(y,H,R)};function M(A,P){const v=e.update(S);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new ci(r.x,r.y,{format:os,type:Di})),u.uniforms.shadow_pass.value=A.map.depthTexture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,t.setRenderTarget(A.mapPass),t.clear(),t.renderBufferDirect(P,null,v,u,S,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,t.setRenderTarget(A.map),t.clear(),t.renderBufferDirect(P,null,v,m,S,null)}function b(A,P,v,y){let H=null;const R=v.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)H=R;else if(H=v.isPointLight===!0?c:o,t.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const B=H.uuid,z=P.uuid;let q=l[B];q===void 0&&(q={},l[B]=q);let k=q[z];k===void 0&&(k=H.clone(),q[z]=k,P.addEventListener("dispose",w)),H=k}if(H.visible=P.visible,H.wireframe=P.wireframe,y===js?H.side=P.shadowSide!==null?P.shadowSide:P.side:H.side=P.shadowSide!==null?P.shadowSide:f[P.side],H.alphaMap=P.alphaMap,H.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,H.map=P.map,H.clipShadows=P.clipShadows,H.clippingPlanes=P.clippingPlanes,H.clipIntersection=P.clipIntersection,H.displacementMap=P.displacementMap,H.displacementScale=P.displacementScale,H.displacementBias=P.displacementBias,H.wireframeLinewidth=P.wireframeLinewidth,H.linewidth=P.linewidth,v.isPointLight===!0&&H.isMeshDistanceMaterial===!0){const B=t.properties.get(H);B.light=v}return H}function E(A,P,v,y,H){if(A.visible===!1)return;if(A.layers.test(P.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&H===js)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,A.matrixWorld);const z=e.update(A),q=A.material;if(Array.isArray(q)){const k=z.groups;for(let G=0,N=k.length;G<N;G++){const Q=k[G],K=q[Q.materialIndex];if(K&&K.visible){const le=b(A,K,y,H);A.onBeforeShadow(t,A,P,v,z,le,Q),t.renderBufferDirect(v,null,z,le,A,Q),A.onAfterShadow(t,A,P,v,z,le,Q)}}}else if(q.visible){const k=b(A,q,y,H);A.onBeforeShadow(t,A,P,v,z,k,null),t.renderBufferDirect(v,null,z,k,A,null),A.onAfterShadow(t,A,P,v,z,k,null)}}const B=A.children;for(let z=0,q=B.length;z<q;z++)E(B[z],P,v,y,H)}function w(A){A.target.removeEventListener("dispose",w);for(const v in l){const y=l[v],H=A.target.uuid;H in y&&(y[H].dispose(),delete y[H])}}}function s3(t,e){function n(){let L=!1;const re=new wt;let te=null;const pe=new wt(0,0,0,0);return{setMask:function(J){te!==J&&!L&&(t.colorMask(J,J,J,J),te=J)},setLocked:function(J){L=J},setClear:function(J,W,xe,Ne,pt){pt===!0&&(J*=Ne,W*=Ne,xe*=Ne),re.set(J,W,xe,Ne),pe.equals(re)===!1&&(t.clearColor(J,W,xe,Ne),pe.copy(re))},reset:function(){L=!1,te=null,pe.set(-1,0,0,0)}}}function i(){let L=!1,re=!1,te=null,pe=null,J=null;return{setReversed:function(W){if(re!==W){const xe=e.get("EXT_clip_control");W?xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.ZERO_TO_ONE_EXT):xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.NEGATIVE_ONE_TO_ONE_EXT),re=W;const Ne=J;J=null,this.setClear(Ne)}},getReversed:function(){return re},setTest:function(W){W?ne(t.DEPTH_TEST):se(t.DEPTH_TEST)},setMask:function(W){te!==W&&!L&&(t.depthMask(W),te=W)},setFunc:function(W){if(re&&(W=kg[W]),pe!==W){switch(W){case cl:t.depthFunc(t.NEVER);break;case ll:t.depthFunc(t.ALWAYS);break;case ul:t.depthFunc(t.LESS);break;case ss:t.depthFunc(t.LEQUAL);break;case hl:t.depthFunc(t.EQUAL);break;case fl:t.depthFunc(t.GEQUAL);break;case dl:t.depthFunc(t.GREATER);break;case pl:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}pe=W}},setLocked:function(W){L=W},setClear:function(W){J!==W&&(J=W,re&&(W=1-W),t.clearDepth(W))},reset:function(){L=!1,te=null,pe=null,J=null,re=!1}}}function r(){let L=!1,re=null,te=null,pe=null,J=null,W=null,xe=null,Ne=null,pt=null;return{setTest:function(rt){L||(rt?ne(t.STENCIL_TEST):se(t.STENCIL_TEST))},setMask:function(rt){re!==rt&&!L&&(t.stencilMask(rt),re=rt)},setFunc:function(rt,xi,Mi){(te!==rt||pe!==xi||J!==Mi)&&(t.stencilFunc(rt,xi,Mi),te=rt,pe=xi,J=Mi)},setOp:function(rt,xi,Mi){(W!==rt||xe!==xi||Ne!==Mi)&&(t.stencilOp(rt,xi,Mi),W=rt,xe=xi,Ne=Mi)},setLocked:function(rt){L=rt},setClear:function(rt){pt!==rt&&(t.clearStencil(rt),pt=rt)},reset:function(){L=!1,re=null,te=null,pe=null,J=null,W=null,xe=null,Ne=null,pt=null}}}const s=new n,a=new i,o=new r,c=new WeakMap,l=new WeakMap;let h={},f={},u=new WeakMap,m=[],_=null,S=!1,p=null,d=null,M=null,b=null,E=null,w=null,A=null,P=new Xe(0,0,0),v=0,y=!1,H=null,R=null,B=null,z=null,q=null;const k=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,N=0;const Q=t.getParameter(t.VERSION);Q.indexOf("WebGL")!==-1?(N=parseFloat(/^WebGL (\d)/.exec(Q)[1]),G=N>=1):Q.indexOf("OpenGL ES")!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),G=N>=2);let K=null,le={};const ge=t.getParameter(t.SCISSOR_BOX),fe=t.getParameter(t.VIEWPORT),ze=new wt().fromArray(ge),gt=new wt().fromArray(fe);function mt(L,re,te,pe){const J=new Uint8Array(4),W=t.createTexture();t.bindTexture(L,W),t.texParameteri(L,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(L,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let xe=0;xe<te;xe++)L===t.TEXTURE_3D||L===t.TEXTURE_2D_ARRAY?t.texImage3D(re,0,t.RGBA,1,1,pe,0,t.RGBA,t.UNSIGNED_BYTE,J):t.texImage2D(re+xe,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,J);return W}const $={};$[t.TEXTURE_2D]=mt(t.TEXTURE_2D,t.TEXTURE_2D,1),$[t.TEXTURE_CUBE_MAP]=mt(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[t.TEXTURE_2D_ARRAY]=mt(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),$[t.TEXTURE_3D]=mt(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(t.DEPTH_TEST),a.setFunc(ss),Ge(!1),Ct(Vh),ne(t.CULL_FACE),it(Li);function ne(L){h[L]!==!0&&(t.enable(L),h[L]=!0)}function se(L){h[L]!==!1&&(t.disable(L),h[L]=!1)}function Be(L,re){return f[L]!==re?(t.bindFramebuffer(L,re),f[L]=re,L===t.DRAW_FRAMEBUFFER&&(f[t.FRAMEBUFFER]=re),L===t.FRAMEBUFFER&&(f[t.DRAW_FRAMEBUFFER]=re),!0):!1}function Ie(L,re){let te=m,pe=!1;if(L){te=u.get(re),te===void 0&&(te=[],u.set(re,te));const J=L.textures;if(te.length!==J.length||te[0]!==t.COLOR_ATTACHMENT0){for(let W=0,xe=J.length;W<xe;W++)te[W]=t.COLOR_ATTACHMENT0+W;te.length=J.length,pe=!0}}else te[0]!==t.BACK&&(te[0]=t.BACK,pe=!0);pe&&t.drawBuffers(te)}function Ue(L){return _!==L?(t.useProgram(L),_=L,!0):!1}const Ht={[gr]:t.FUNC_ADD,[cg]:t.FUNC_SUBTRACT,[lg]:t.FUNC_REVERSE_SUBTRACT};Ht[ug]=t.MIN,Ht[hg]=t.MAX;const je={[fg]:t.ZERO,[dg]:t.ONE,[pg]:t.SRC_COLOR,[al]:t.SRC_ALPHA,[Mg]:t.SRC_ALPHA_SATURATE,[vg]:t.DST_COLOR,[gg]:t.DST_ALPHA,[mg]:t.ONE_MINUS_SRC_COLOR,[ol]:t.ONE_MINUS_SRC_ALPHA,[xg]:t.ONE_MINUS_DST_COLOR,[_g]:t.ONE_MINUS_DST_ALPHA,[Sg]:t.CONSTANT_COLOR,[Eg]:t.ONE_MINUS_CONSTANT_COLOR,[yg]:t.CONSTANT_ALPHA,[bg]:t.ONE_MINUS_CONSTANT_ALPHA};function it(L,re,te,pe,J,W,xe,Ne,pt,rt){if(L===Li){S===!0&&(se(t.BLEND),S=!1);return}if(S===!1&&(ne(t.BLEND),S=!0),L!==og){if(L!==p||rt!==y){if((d!==gr||E!==gr)&&(t.blendEquation(t.FUNC_ADD),d=gr,E=gr),rt)switch(L){case es:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Gh:t.blendFunc(t.ONE,t.ONE);break;case Hh:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Wh:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:Qe("WebGLState: Invalid blending: ",L);break}else switch(L){case es:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Gh:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case Hh:Qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Wh:Qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qe("WebGLState: Invalid blending: ",L);break}M=null,b=null,w=null,A=null,P.set(0,0,0),v=0,p=L,y=rt}return}J=J||re,W=W||te,xe=xe||pe,(re!==d||J!==E)&&(t.blendEquationSeparate(Ht[re],Ht[J]),d=re,E=J),(te!==M||pe!==b||W!==w||xe!==A)&&(t.blendFuncSeparate(je[te],je[pe],je[W],je[xe]),M=te,b=pe,w=W,A=xe),(Ne.equals(P)===!1||pt!==v)&&(t.blendColor(Ne.r,Ne.g,Ne.b,pt),P.copy(Ne),v=pt),p=L,y=!1}function lt(L,re){L.side===Ai?se(t.CULL_FACE):ne(t.CULL_FACE);let te=L.side===pn;re&&(te=!te),Ge(te),L.blending===es&&L.transparent===!1?it(Li):it(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),s.setMask(L.colorWrite);const pe=L.stencilWrite;o.setTest(pe),pe&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),It(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ne(t.SAMPLE_ALPHA_TO_COVERAGE):se(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ge(L){H!==L&&(L?t.frontFace(t.CW):t.frontFace(t.CCW),H=L)}function Ct(L){L!==rg?(ne(t.CULL_FACE),L!==R&&(L===Vh?t.cullFace(t.BACK):L===sg?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):se(t.CULL_FACE),R=L}function C(L){L!==B&&(G&&t.lineWidth(L),B=L)}function It(L,re,te){L?(ne(t.POLYGON_OFFSET_FILL),(z!==re||q!==te)&&(z=re,q=te,a.getReversed()&&(re=-re),t.polygonOffset(re,te))):se(t.POLYGON_OFFSET_FILL)}function nt(L){L?ne(t.SCISSOR_TEST):se(t.SCISSOR_TEST)}function dt(L){L===void 0&&(L=t.TEXTURE0+k-1),K!==L&&(t.activeTexture(L),K=L)}function Ee(L,re,te){te===void 0&&(K===null?te=t.TEXTURE0+k-1:te=K);let pe=le[te];pe===void 0&&(pe={type:void 0,texture:void 0},le[te]=pe),(pe.type!==L||pe.texture!==re)&&(K!==te&&(t.activeTexture(te),K=te),t.bindTexture(L,re||$[L]),pe.type=L,pe.texture=re)}function T(){const L=le[K];L!==void 0&&L.type!==void 0&&(t.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function g(){try{t.compressedTexImage2D(...arguments)}catch(L){Qe("WebGLState:",L)}}function I(){try{t.compressedTexImage3D(...arguments)}catch(L){Qe("WebGLState:",L)}}function Y(){try{t.texSubImage2D(...arguments)}catch(L){Qe("WebGLState:",L)}}function j(){try{t.texSubImage3D(...arguments)}catch(L){Qe("WebGLState:",L)}}function X(){try{t.compressedTexSubImage2D(...arguments)}catch(L){Qe("WebGLState:",L)}}function _e(){try{t.compressedTexSubImage3D(...arguments)}catch(L){Qe("WebGLState:",L)}}function ie(){try{t.texStorage2D(...arguments)}catch(L){Qe("WebGLState:",L)}}function Pe(){try{t.texStorage3D(...arguments)}catch(L){Qe("WebGLState:",L)}}function De(){try{t.texImage2D(...arguments)}catch(L){Qe("WebGLState:",L)}}function Z(){try{t.texImage3D(...arguments)}catch(L){Qe("WebGLState:",L)}}function ee(L){ze.equals(L)===!1&&(t.scissor(L.x,L.y,L.z,L.w),ze.copy(L))}function ve(L){gt.equals(L)===!1&&(t.viewport(L.x,L.y,L.z,L.w),gt.copy(L))}function Me(L,re){let te=l.get(re);te===void 0&&(te=new WeakMap,l.set(re,te));let pe=te.get(L);pe===void 0&&(pe=t.getUniformBlockIndex(re,L.name),te.set(L,pe))}function ue(L,re){const pe=l.get(re).get(L);c.get(re)!==pe&&(t.uniformBlockBinding(re,pe,L.__bindingPointIndex),c.set(re,pe))}function He(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),a.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),h={},K=null,le={},f={},u=new WeakMap,m=[],_=null,S=!1,p=null,d=null,M=null,b=null,E=null,w=null,A=null,P=new Xe(0,0,0),v=0,y=!1,H=null,R=null,B=null,z=null,q=null,ze.set(0,0,t.canvas.width,t.canvas.height),gt.set(0,0,t.canvas.width,t.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ne,disable:se,bindFramebuffer:Be,drawBuffers:Ie,useProgram:Ue,setBlending:it,setMaterial:lt,setFlipSided:Ge,setCullFace:Ct,setLineWidth:C,setPolygonOffset:It,setScissorTest:nt,activeTexture:dt,bindTexture:Ee,unbindTexture:T,compressedTexImage2D:g,compressedTexImage3D:I,texImage2D:De,texImage3D:Z,updateUBOMapping:Me,uniformBlockBinding:ue,texStorage2D:ie,texStorage3D:Pe,texSubImage2D:Y,texSubImage3D:j,compressedTexSubImage2D:X,compressedTexSubImage3D:_e,scissor:ee,viewport:ve,reset:He}}function a3(t,e,n,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new $e,h=new WeakMap;let f;const u=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(T,g){return m?new OffscreenCanvas(T,g):_o("canvas")}function S(T,g,I){let Y=1;const j=Ee(T);if((j.width>I||j.height>I)&&(Y=I/Math.max(j.width,j.height)),Y<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const X=Math.floor(Y*j.width),_e=Math.floor(Y*j.height);f===void 0&&(f=_(X,_e));const ie=g?_(X,_e):f;return ie.width=X,ie.height=_e,ie.getContext("2d").drawImage(T,0,0,X,_e),Fe("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+X+"x"+_e+")."),ie}else return"data"in T&&Fe("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),T;return T}function p(T){return T.generateMipmaps}function d(T){t.generateMipmap(T)}function M(T){return T.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?t.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function b(T,g,I,Y,j=!1){if(T!==null){if(t[T]!==void 0)return t[T];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let X=g;if(g===t.RED&&(I===t.FLOAT&&(X=t.R32F),I===t.HALF_FLOAT&&(X=t.R16F),I===t.UNSIGNED_BYTE&&(X=t.R8)),g===t.RED_INTEGER&&(I===t.UNSIGNED_BYTE&&(X=t.R8UI),I===t.UNSIGNED_SHORT&&(X=t.R16UI),I===t.UNSIGNED_INT&&(X=t.R32UI),I===t.BYTE&&(X=t.R8I),I===t.SHORT&&(X=t.R16I),I===t.INT&&(X=t.R32I)),g===t.RG&&(I===t.FLOAT&&(X=t.RG32F),I===t.HALF_FLOAT&&(X=t.RG16F),I===t.UNSIGNED_BYTE&&(X=t.RG8)),g===t.RG_INTEGER&&(I===t.UNSIGNED_BYTE&&(X=t.RG8UI),I===t.UNSIGNED_SHORT&&(X=t.RG16UI),I===t.UNSIGNED_INT&&(X=t.RG32UI),I===t.BYTE&&(X=t.RG8I),I===t.SHORT&&(X=t.RG16I),I===t.INT&&(X=t.RG32I)),g===t.RGB_INTEGER&&(I===t.UNSIGNED_BYTE&&(X=t.RGB8UI),I===t.UNSIGNED_SHORT&&(X=t.RGB16UI),I===t.UNSIGNED_INT&&(X=t.RGB32UI),I===t.BYTE&&(X=t.RGB8I),I===t.SHORT&&(X=t.RGB16I),I===t.INT&&(X=t.RGB32I)),g===t.RGBA_INTEGER&&(I===t.UNSIGNED_BYTE&&(X=t.RGBA8UI),I===t.UNSIGNED_SHORT&&(X=t.RGBA16UI),I===t.UNSIGNED_INT&&(X=t.RGBA32UI),I===t.BYTE&&(X=t.RGBA8I),I===t.SHORT&&(X=t.RGBA16I),I===t.INT&&(X=t.RGBA32I)),g===t.RGB&&(I===t.UNSIGNED_INT_5_9_9_9_REV&&(X=t.RGB9_E5),I===t.UNSIGNED_INT_10F_11F_11F_REV&&(X=t.R11F_G11F_B10F)),g===t.RGBA){const _e=j?go:Ke.getTransfer(Y);I===t.FLOAT&&(X=t.RGBA32F),I===t.HALF_FLOAT&&(X=t.RGBA16F),I===t.UNSIGNED_BYTE&&(X=_e===st?t.SRGB8_ALPHA8:t.RGBA8),I===t.UNSIGNED_SHORT_4_4_4_4&&(X=t.RGBA4),I===t.UNSIGNED_SHORT_5_5_5_1&&(X=t.RGB5_A1)}return(X===t.R16F||X===t.R32F||X===t.RG16F||X===t.RG32F||X===t.RGBA16F||X===t.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function E(T,g){let I;return T?g===null||g===ui||g===aa?I=t.DEPTH24_STENCIL8:g===ri?I=t.DEPTH32F_STENCIL8:g===sa&&(I=t.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===ui||g===aa?I=t.DEPTH_COMPONENT24:g===ri?I=t.DEPTH_COMPONENT32F:g===sa&&(I=t.DEPTH_COMPONENT16),I}function w(T,g){return p(T)===!0||T.isFramebufferTexture&&T.minFilter!==Kt&&T.minFilter!==nn?Math.log2(Math.max(g.width,g.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?g.mipmaps.length:1}function A(T){const g=T.target;g.removeEventListener("dispose",A),v(g),g.isVideoTexture&&h.delete(g)}function P(T){const g=T.target;g.removeEventListener("dispose",P),H(g)}function v(T){const g=i.get(T);if(g.__webglInit===void 0)return;const I=T.source,Y=u.get(I);if(Y){const j=Y[g.__cacheKey];j.usedTimes--,j.usedTimes===0&&y(T),Object.keys(Y).length===0&&u.delete(I)}i.remove(T)}function y(T){const g=i.get(T);t.deleteTexture(g.__webglTexture);const I=T.source,Y=u.get(I);delete Y[g.__cacheKey],a.memory.textures--}function H(T){const g=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(g.__webglFramebuffer[Y]))for(let j=0;j<g.__webglFramebuffer[Y].length;j++)t.deleteFramebuffer(g.__webglFramebuffer[Y][j]);else t.deleteFramebuffer(g.__webglFramebuffer[Y]);g.__webglDepthbuffer&&t.deleteRenderbuffer(g.__webglDepthbuffer[Y])}else{if(Array.isArray(g.__webglFramebuffer))for(let Y=0;Y<g.__webglFramebuffer.length;Y++)t.deleteFramebuffer(g.__webglFramebuffer[Y]);else t.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&t.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&t.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let Y=0;Y<g.__webglColorRenderbuffer.length;Y++)g.__webglColorRenderbuffer[Y]&&t.deleteRenderbuffer(g.__webglColorRenderbuffer[Y]);g.__webglDepthRenderbuffer&&t.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const I=T.textures;for(let Y=0,j=I.length;Y<j;Y++){const X=i.get(I[Y]);X.__webglTexture&&(t.deleteTexture(X.__webglTexture),a.memory.textures--),i.remove(I[Y])}i.remove(T)}let R=0;function B(){R=0}function z(){const T=R;return T>=r.maxTextures&&Fe("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),R+=1,T}function q(T){const g=[];return g.push(T.wrapS),g.push(T.wrapT),g.push(T.wrapR||0),g.push(T.magFilter),g.push(T.minFilter),g.push(T.anisotropy),g.push(T.internalFormat),g.push(T.format),g.push(T.type),g.push(T.generateMipmaps),g.push(T.premultiplyAlpha),g.push(T.flipY),g.push(T.unpackAlignment),g.push(T.colorSpace),g.join()}function k(T,g){const I=i.get(T);if(T.isVideoTexture&&nt(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&I.__version!==T.version){const Y=T.image;if(Y===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{$(I,T,g);return}}else T.isExternalTexture&&(I.__webglTexture=T.sourceTexture?T.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,I.__webglTexture,t.TEXTURE0+g)}function G(T,g){const I=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&I.__version!==T.version){$(I,T,g);return}else T.isExternalTexture&&(I.__webglTexture=T.sourceTexture?T.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,I.__webglTexture,t.TEXTURE0+g)}function N(T,g){const I=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&I.__version!==T.version){$(I,T,g);return}n.bindTexture(t.TEXTURE_3D,I.__webglTexture,t.TEXTURE0+g)}function Q(T,g){const I=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&I.__version!==T.version){ne(I,T,g);return}n.bindTexture(t.TEXTURE_CUBE_MAP,I.__webglTexture,t.TEXTURE0+g)}const K={[ml]:t.REPEAT,[Ci]:t.CLAMP_TO_EDGE,[gl]:t.MIRRORED_REPEAT},le={[Kt]:t.NEAREST,[wg]:t.NEAREST_MIPMAP_NEAREST,[wa]:t.NEAREST_MIPMAP_LINEAR,[nn]:t.LINEAR,[fc]:t.LINEAR_MIPMAP_NEAREST,[vr]:t.LINEAR_MIPMAP_LINEAR},ge={[Pg]:t.NEVER,[Ng]:t.ALWAYS,[Lg]:t.LESS,[Au]:t.LEQUAL,[Ig]:t.EQUAL,[wu]:t.GEQUAL,[Dg]:t.GREATER,[Ug]:t.NOTEQUAL};function fe(T,g){if(g.type===ri&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===nn||g.magFilter===fc||g.magFilter===wa||g.magFilter===vr||g.minFilter===nn||g.minFilter===fc||g.minFilter===wa||g.minFilter===vr)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(T,t.TEXTURE_WRAP_S,K[g.wrapS]),t.texParameteri(T,t.TEXTURE_WRAP_T,K[g.wrapT]),(T===t.TEXTURE_3D||T===t.TEXTURE_2D_ARRAY)&&t.texParameteri(T,t.TEXTURE_WRAP_R,K[g.wrapR]),t.texParameteri(T,t.TEXTURE_MAG_FILTER,le[g.magFilter]),t.texParameteri(T,t.TEXTURE_MIN_FILTER,le[g.minFilter]),g.compareFunction&&(t.texParameteri(T,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(T,t.TEXTURE_COMPARE_FUNC,ge[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===Kt||g.minFilter!==wa&&g.minFilter!==vr||g.type===ri&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){const I=e.get("EXT_texture_filter_anisotropic");t.texParameterf(T,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function ze(T,g){let I=!1;T.__webglInit===void 0&&(T.__webglInit=!0,g.addEventListener("dispose",A));const Y=g.source;let j=u.get(Y);j===void 0&&(j={},u.set(Y,j));const X=q(g);if(X!==T.__cacheKey){j[X]===void 0&&(j[X]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,I=!0),j[X].usedTimes++;const _e=j[T.__cacheKey];_e!==void 0&&(j[T.__cacheKey].usedTimes--,_e.usedTimes===0&&y(g)),T.__cacheKey=X,T.__webglTexture=j[X].texture}return I}function gt(T,g,I){return Math.floor(Math.floor(T/I)/g)}function mt(T,g,I,Y){const X=T.updateRanges;if(X.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,g.width,g.height,I,Y,g.data);else{X.sort((Z,ee)=>Z.start-ee.start);let _e=0;for(let Z=1;Z<X.length;Z++){const ee=X[_e],ve=X[Z],Me=ee.start+ee.count,ue=gt(ve.start,g.width,4),He=gt(ee.start,g.width,4);ve.start<=Me+1&&ue===He&&gt(ve.start+ve.count-1,g.width,4)===ue?ee.count=Math.max(ee.count,ve.start+ve.count-ee.start):(++_e,X[_e]=ve)}X.length=_e+1;const ie=t.getParameter(t.UNPACK_ROW_LENGTH),Pe=t.getParameter(t.UNPACK_SKIP_PIXELS),De=t.getParameter(t.UNPACK_SKIP_ROWS);t.pixelStorei(t.UNPACK_ROW_LENGTH,g.width);for(let Z=0,ee=X.length;Z<ee;Z++){const ve=X[Z],Me=Math.floor(ve.start/4),ue=Math.ceil(ve.count/4),He=Me%g.width,L=Math.floor(Me/g.width),re=ue,te=1;t.pixelStorei(t.UNPACK_SKIP_PIXELS,He),t.pixelStorei(t.UNPACK_SKIP_ROWS,L),n.texSubImage2D(t.TEXTURE_2D,0,He,L,re,te,I,Y,g.data)}T.clearUpdateRanges(),t.pixelStorei(t.UNPACK_ROW_LENGTH,ie),t.pixelStorei(t.UNPACK_SKIP_PIXELS,Pe),t.pixelStorei(t.UNPACK_SKIP_ROWS,De)}}function $(T,g,I){let Y=t.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(Y=t.TEXTURE_2D_ARRAY),g.isData3DTexture&&(Y=t.TEXTURE_3D);const j=ze(T,g),X=g.source;n.bindTexture(Y,T.__webglTexture,t.TEXTURE0+I);const _e=i.get(X);if(X.version!==_e.__version||j===!0){n.activeTexture(t.TEXTURE0+I);const ie=Ke.getPrimaries(Ke.workingColorSpace),Pe=g.colorSpace===Zi?null:Ke.getPrimaries(g.colorSpace),De=g.colorSpace===Zi||ie===Pe?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,g.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,De);let Z=S(g.image,!1,r.maxTextureSize);Z=dt(g,Z);const ee=s.convert(g.format,g.colorSpace),ve=s.convert(g.type);let Me=b(g.internalFormat,ee,ve,g.colorSpace,g.isVideoTexture);fe(Y,g);let ue;const He=g.mipmaps,L=g.isVideoTexture!==!0,re=_e.__version===void 0||j===!0,te=X.dataReady,pe=w(g,Z);if(g.isDepthTexture)Me=E(g.format===xr,g.type),re&&(L?n.texStorage2D(t.TEXTURE_2D,1,Me,Z.width,Z.height):n.texImage2D(t.TEXTURE_2D,0,Me,Z.width,Z.height,0,ee,ve,null));else if(g.isDataTexture)if(He.length>0){L&&re&&n.texStorage2D(t.TEXTURE_2D,pe,Me,He[0].width,He[0].height);for(let J=0,W=He.length;J<W;J++)ue=He[J],L?te&&n.texSubImage2D(t.TEXTURE_2D,J,0,0,ue.width,ue.height,ee,ve,ue.data):n.texImage2D(t.TEXTURE_2D,J,Me,ue.width,ue.height,0,ee,ve,ue.data);g.generateMipmaps=!1}else L?(re&&n.texStorage2D(t.TEXTURE_2D,pe,Me,Z.width,Z.height),te&&mt(g,Z,ee,ve)):n.texImage2D(t.TEXTURE_2D,0,Me,Z.width,Z.height,0,ee,ve,Z.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){L&&re&&n.texStorage3D(t.TEXTURE_2D_ARRAY,pe,Me,He[0].width,He[0].height,Z.depth);for(let J=0,W=He.length;J<W;J++)if(ue=He[J],g.format!==Yn)if(ee!==null)if(L){if(te)if(g.layerUpdates.size>0){const xe=_f(ue.width,ue.height,g.format,g.type);for(const Ne of g.layerUpdates){const pt=ue.data.subarray(Ne*xe/ue.data.BYTES_PER_ELEMENT,(Ne+1)*xe/ue.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,J,0,0,Ne,ue.width,ue.height,1,ee,pt)}g.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,J,0,0,0,ue.width,ue.height,Z.depth,ee,ue.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,J,Me,ue.width,ue.height,Z.depth,0,ue.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?te&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,J,0,0,0,ue.width,ue.height,Z.depth,ee,ve,ue.data):n.texImage3D(t.TEXTURE_2D_ARRAY,J,Me,ue.width,ue.height,Z.depth,0,ee,ve,ue.data)}else{L&&re&&n.texStorage2D(t.TEXTURE_2D,pe,Me,He[0].width,He[0].height);for(let J=0,W=He.length;J<W;J++)ue=He[J],g.format!==Yn?ee!==null?L?te&&n.compressedTexSubImage2D(t.TEXTURE_2D,J,0,0,ue.width,ue.height,ee,ue.data):n.compressedTexImage2D(t.TEXTURE_2D,J,Me,ue.width,ue.height,0,ue.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?te&&n.texSubImage2D(t.TEXTURE_2D,J,0,0,ue.width,ue.height,ee,ve,ue.data):n.texImage2D(t.TEXTURE_2D,J,Me,ue.width,ue.height,0,ee,ve,ue.data)}else if(g.isDataArrayTexture)if(L){if(re&&n.texStorage3D(t.TEXTURE_2D_ARRAY,pe,Me,Z.width,Z.height,Z.depth),te)if(g.layerUpdates.size>0){const J=_f(Z.width,Z.height,g.format,g.type);for(const W of g.layerUpdates){const xe=Z.data.subarray(W*J/Z.data.BYTES_PER_ELEMENT,(W+1)*J/Z.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,W,Z.width,Z.height,1,ee,ve,xe)}g.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,ee,ve,Z.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Me,Z.width,Z.height,Z.depth,0,ee,ve,Z.data);else if(g.isData3DTexture)L?(re&&n.texStorage3D(t.TEXTURE_3D,pe,Me,Z.width,Z.height,Z.depth),te&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,ee,ve,Z.data)):n.texImage3D(t.TEXTURE_3D,0,Me,Z.width,Z.height,Z.depth,0,ee,ve,Z.data);else if(g.isFramebufferTexture){if(re)if(L)n.texStorage2D(t.TEXTURE_2D,pe,Me,Z.width,Z.height);else{let J=Z.width,W=Z.height;for(let xe=0;xe<pe;xe++)n.texImage2D(t.TEXTURE_2D,xe,Me,J,W,0,ee,ve,null),J>>=1,W>>=1}}else if(He.length>0){if(L&&re){const J=Ee(He[0]);n.texStorage2D(t.TEXTURE_2D,pe,Me,J.width,J.height)}for(let J=0,W=He.length;J<W;J++)ue=He[J],L?te&&n.texSubImage2D(t.TEXTURE_2D,J,0,0,ee,ve,ue):n.texImage2D(t.TEXTURE_2D,J,Me,ee,ve,ue);g.generateMipmaps=!1}else if(L){if(re){const J=Ee(Z);n.texStorage2D(t.TEXTURE_2D,pe,Me,J.width,J.height)}te&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ee,ve,Z)}else n.texImage2D(t.TEXTURE_2D,0,Me,ee,ve,Z);p(g)&&d(Y),_e.__version=X.version,g.onUpdate&&g.onUpdate(g)}T.__version=g.version}function ne(T,g,I){if(g.image.length!==6)return;const Y=ze(T,g),j=g.source;n.bindTexture(t.TEXTURE_CUBE_MAP,T.__webglTexture,t.TEXTURE0+I);const X=i.get(j);if(j.version!==X.__version||Y===!0){n.activeTexture(t.TEXTURE0+I);const _e=Ke.getPrimaries(Ke.workingColorSpace),ie=g.colorSpace===Zi?null:Ke.getPrimaries(g.colorSpace),Pe=g.colorSpace===Zi||_e===ie?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,g.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);const De=g.isCompressedTexture||g.image[0].isCompressedTexture,Z=g.image[0]&&g.image[0].isDataTexture,ee=[];for(let W=0;W<6;W++)!De&&!Z?ee[W]=S(g.image[W],!0,r.maxCubemapSize):ee[W]=Z?g.image[W].image:g.image[W],ee[W]=dt(g,ee[W]);const ve=ee[0],Me=s.convert(g.format,g.colorSpace),ue=s.convert(g.type),He=b(g.internalFormat,Me,ue,g.colorSpace),L=g.isVideoTexture!==!0,re=X.__version===void 0||Y===!0,te=j.dataReady;let pe=w(g,ve);fe(t.TEXTURE_CUBE_MAP,g);let J;if(De){L&&re&&n.texStorage2D(t.TEXTURE_CUBE_MAP,pe,He,ve.width,ve.height);for(let W=0;W<6;W++){J=ee[W].mipmaps;for(let xe=0;xe<J.length;xe++){const Ne=J[xe];g.format!==Yn?Me!==null?L?te&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe,0,0,Ne.width,Ne.height,Me,Ne.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe,He,Ne.width,Ne.height,0,Ne.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe,0,0,Ne.width,Ne.height,Me,ue,Ne.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe,He,Ne.width,Ne.height,0,Me,ue,Ne.data)}}}else{if(J=g.mipmaps,L&&re){J.length>0&&pe++;const W=Ee(ee[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,pe,He,W.width,W.height)}for(let W=0;W<6;W++)if(Z){L?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,ee[W].width,ee[W].height,Me,ue,ee[W].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,He,ee[W].width,ee[W].height,0,Me,ue,ee[W].data);for(let xe=0;xe<J.length;xe++){const pt=J[xe].image[W].image;L?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe+1,0,0,pt.width,pt.height,Me,ue,pt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe+1,He,pt.width,pt.height,0,Me,ue,pt.data)}}else{L?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,Me,ue,ee[W]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,He,Me,ue,ee[W]);for(let xe=0;xe<J.length;xe++){const Ne=J[xe];L?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe+1,0,0,Me,ue,Ne.image[W]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,xe+1,He,Me,ue,Ne.image[W])}}}p(g)&&d(t.TEXTURE_CUBE_MAP),X.__version=j.version,g.onUpdate&&g.onUpdate(g)}T.__version=g.version}function se(T,g,I,Y,j,X){const _e=s.convert(I.format,I.colorSpace),ie=s.convert(I.type),Pe=b(I.internalFormat,_e,ie,I.colorSpace),De=i.get(g),Z=i.get(I);if(Z.__renderTarget=g,!De.__hasExternalTextures){const ee=Math.max(1,g.width>>X),ve=Math.max(1,g.height>>X);j===t.TEXTURE_3D||j===t.TEXTURE_2D_ARRAY?n.texImage3D(j,X,Pe,ee,ve,g.depth,0,_e,ie,null):n.texImage2D(j,X,Pe,ee,ve,0,_e,ie,null)}n.bindFramebuffer(t.FRAMEBUFFER,T),It(g)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Y,j,Z.__webglTexture,0,C(g)):(j===t.TEXTURE_2D||j>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,Y,j,Z.__webglTexture,X),n.bindFramebuffer(t.FRAMEBUFFER,null)}function Be(T,g,I){if(t.bindRenderbuffer(t.RENDERBUFFER,T),g.depthBuffer){const Y=g.depthTexture,j=Y&&Y.isDepthTexture?Y.type:null,X=E(g.stencilBuffer,j),_e=g.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;It(g)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,C(g),X,g.width,g.height):I?t.renderbufferStorageMultisample(t.RENDERBUFFER,C(g),X,g.width,g.height):t.renderbufferStorage(t.RENDERBUFFER,X,g.width,g.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,_e,t.RENDERBUFFER,T)}else{const Y=g.textures;for(let j=0;j<Y.length;j++){const X=Y[j],_e=s.convert(X.format,X.colorSpace),ie=s.convert(X.type),Pe=b(X.internalFormat,_e,ie,X.colorSpace);It(g)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,C(g),Pe,g.width,g.height):I?t.renderbufferStorageMultisample(t.RENDERBUFFER,C(g),Pe,g.width,g.height):t.renderbufferStorage(t.RENDERBUFFER,Pe,g.width,g.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Ie(T,g,I){const Y=g.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,T),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=i.get(g.depthTexture);if(j.__renderTarget=g,(!j.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),Y){if(j.__webglInit===void 0&&(j.__webglInit=!0,g.depthTexture.addEventListener("dispose",A)),j.__webglTexture===void 0){j.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,j.__webglTexture),fe(t.TEXTURE_CUBE_MAP,g.depthTexture);const De=s.convert(g.depthTexture.format),Z=s.convert(g.depthTexture.type);let ee;g.depthTexture.format===Ui?ee=t.DEPTH_COMPONENT24:g.depthTexture.format===xr&&(ee=t.DEPTH24_STENCIL8);for(let ve=0;ve<6;ve++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,ee,g.width,g.height,0,De,Z,null)}}else k(g.depthTexture,0);const X=j.__webglTexture,_e=C(g),ie=Y?t.TEXTURE_CUBE_MAP_POSITIVE_X+I:t.TEXTURE_2D,Pe=g.depthTexture.format===xr?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(g.depthTexture.format===Ui)It(g)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Pe,ie,X,0,_e):t.framebufferTexture2D(t.FRAMEBUFFER,Pe,ie,X,0);else if(g.depthTexture.format===xr)It(g)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Pe,ie,X,0,_e):t.framebufferTexture2D(t.FRAMEBUFFER,Pe,ie,X,0);else throw new Error("Unknown depthTexture format")}function Ue(T){const g=i.get(T),I=T.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==T.depthTexture){const Y=T.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),Y){const j=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,Y.removeEventListener("dispose",j)};Y.addEventListener("dispose",j),g.__depthDisposeCallback=j}g.__boundDepthTexture=Y}if(T.depthTexture&&!g.__autoAllocateDepthBuffer)if(I)for(let Y=0;Y<6;Y++)Ie(g.__webglFramebuffer[Y],T,Y);else{const Y=T.texture.mipmaps;Y&&Y.length>0?Ie(g.__webglFramebuffer[0],T,0):Ie(g.__webglFramebuffer,T,0)}else if(I){g.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(n.bindFramebuffer(t.FRAMEBUFFER,g.__webglFramebuffer[Y]),g.__webglDepthbuffer[Y]===void 0)g.__webglDepthbuffer[Y]=t.createRenderbuffer(),Be(g.__webglDepthbuffer[Y],T,!1);else{const j=T.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,X=g.__webglDepthbuffer[Y];t.bindRenderbuffer(t.RENDERBUFFER,X),t.framebufferRenderbuffer(t.FRAMEBUFFER,j,t.RENDERBUFFER,X)}}else{const Y=T.texture.mipmaps;if(Y&&Y.length>0?n.bindFramebuffer(t.FRAMEBUFFER,g.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=t.createRenderbuffer(),Be(g.__webglDepthbuffer,T,!1);else{const j=T.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,X=g.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,X),t.framebufferRenderbuffer(t.FRAMEBUFFER,j,t.RENDERBUFFER,X)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Ht(T,g,I){const Y=i.get(T);g!==void 0&&se(Y.__webglFramebuffer,T,T.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),I!==void 0&&Ue(T)}function je(T){const g=T.texture,I=i.get(T),Y=i.get(g);T.addEventListener("dispose",P);const j=T.textures,X=T.isWebGLCubeRenderTarget===!0,_e=j.length>1;if(_e||(Y.__webglTexture===void 0&&(Y.__webglTexture=t.createTexture()),Y.__version=g.version,a.memory.textures++),X){I.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(g.mipmaps&&g.mipmaps.length>0){I.__webglFramebuffer[ie]=[];for(let Pe=0;Pe<g.mipmaps.length;Pe++)I.__webglFramebuffer[ie][Pe]=t.createFramebuffer()}else I.__webglFramebuffer[ie]=t.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){I.__webglFramebuffer=[];for(let ie=0;ie<g.mipmaps.length;ie++)I.__webglFramebuffer[ie]=t.createFramebuffer()}else I.__webglFramebuffer=t.createFramebuffer();if(_e)for(let ie=0,Pe=j.length;ie<Pe;ie++){const De=i.get(j[ie]);De.__webglTexture===void 0&&(De.__webglTexture=t.createTexture(),a.memory.textures++)}if(T.samples>0&&It(T)===!1){I.__webglMultisampledFramebuffer=t.createFramebuffer(),I.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let ie=0;ie<j.length;ie++){const Pe=j[ie];I.__webglColorRenderbuffer[ie]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,I.__webglColorRenderbuffer[ie]);const De=s.convert(Pe.format,Pe.colorSpace),Z=s.convert(Pe.type),ee=b(Pe.internalFormat,De,Z,Pe.colorSpace,T.isXRRenderTarget===!0),ve=C(T);t.renderbufferStorageMultisample(t.RENDERBUFFER,ve,ee,T.width,T.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ie,t.RENDERBUFFER,I.__webglColorRenderbuffer[ie])}t.bindRenderbuffer(t.RENDERBUFFER,null),T.depthBuffer&&(I.__webglDepthRenderbuffer=t.createRenderbuffer(),Be(I.__webglDepthRenderbuffer,T,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(X){n.bindTexture(t.TEXTURE_CUBE_MAP,Y.__webglTexture),fe(t.TEXTURE_CUBE_MAP,g);for(let ie=0;ie<6;ie++)if(g.mipmaps&&g.mipmaps.length>0)for(let Pe=0;Pe<g.mipmaps.length;Pe++)se(I.__webglFramebuffer[ie][Pe],T,g,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Pe);else se(I.__webglFramebuffer[ie],T,g,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);p(g)&&d(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(_e){for(let ie=0,Pe=j.length;ie<Pe;ie++){const De=j[ie],Z=i.get(De);let ee=t.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ee=T.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ee,Z.__webglTexture),fe(ee,De),se(I.__webglFramebuffer,T,De,t.COLOR_ATTACHMENT0+ie,ee,0),p(De)&&d(ee)}n.unbindTexture()}else{let ie=t.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ie=T.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ie,Y.__webglTexture),fe(ie,g),g.mipmaps&&g.mipmaps.length>0)for(let Pe=0;Pe<g.mipmaps.length;Pe++)se(I.__webglFramebuffer[Pe],T,g,t.COLOR_ATTACHMENT0,ie,Pe);else se(I.__webglFramebuffer,T,g,t.COLOR_ATTACHMENT0,ie,0);p(g)&&d(ie),n.unbindTexture()}T.depthBuffer&&Ue(T)}function it(T){const g=T.textures;for(let I=0,Y=g.length;I<Y;I++){const j=g[I];if(p(j)){const X=M(T),_e=i.get(j).__webglTexture;n.bindTexture(X,_e),d(X),n.unbindTexture()}}}const lt=[],Ge=[];function Ct(T){if(T.samples>0){if(It(T)===!1){const g=T.textures,I=T.width,Y=T.height;let j=t.COLOR_BUFFER_BIT;const X=T.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,_e=i.get(T),ie=g.length>1;if(ie)for(let De=0;De<g.length;De++)n.bindFramebuffer(t.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+De,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,_e.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+De,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer);const Pe=T.texture.mipmaps;Pe&&Pe.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,_e.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let De=0;De<g.length;De++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(j|=t.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(j|=t.STENCIL_BUFFER_BIT)),ie){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,_e.__webglColorRenderbuffer[De]);const Z=i.get(g[De]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Z,0)}t.blitFramebuffer(0,0,I,Y,0,0,I,Y,j,t.NEAREST),c===!0&&(lt.length=0,Ge.length=0,lt.push(t.COLOR_ATTACHMENT0+De),T.depthBuffer&&T.resolveDepthBuffer===!1&&(lt.push(X),Ge.push(X),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Ge)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,lt))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),ie)for(let De=0;De<g.length;De++){n.bindFramebuffer(t.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+De,t.RENDERBUFFER,_e.__webglColorRenderbuffer[De]);const Z=i.get(g[De]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,_e.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+De,t.TEXTURE_2D,Z,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const g=T.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[g])}}}function C(T){return Math.min(r.maxSamples,T.samples)}function It(T){const g=i.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function nt(T){const g=a.render.frame;h.get(T)!==g&&(h.set(T,g),T.update())}function dt(T,g){const I=T.colorSpace,Y=T.format,j=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||I!==cs&&I!==Zi&&(Ke.getTransfer(I)===st?(Y!==Yn||j!==bn)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qe("WebGLTextures: Unsupported texture color space:",I)),g}function Ee(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=B,this.setTexture2D=k,this.setTexture2DArray=G,this.setTexture3D=N,this.setTextureCube=Q,this.rebindTextures=Ht,this.setupRenderTarget=je,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=Ct,this.setupDepthRenderbuffer=Ue,this.setupFrameBufferTexture=se,this.useMultisampledRTT=It,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function o3(t,e){function n(i,r=Zi){let s;const a=Ke.getTransfer(r);if(i===bn)return t.UNSIGNED_BYTE;if(i===Su)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Eu)return t.UNSIGNED_SHORT_5_5_5_1;if(i===hp)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===fp)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===lp)return t.BYTE;if(i===up)return t.SHORT;if(i===sa)return t.UNSIGNED_SHORT;if(i===Mu)return t.INT;if(i===ui)return t.UNSIGNED_INT;if(i===ri)return t.FLOAT;if(i===Di)return t.HALF_FLOAT;if(i===dp)return t.ALPHA;if(i===pp)return t.RGB;if(i===Yn)return t.RGBA;if(i===Ui)return t.DEPTH_COMPONENT;if(i===xr)return t.DEPTH_STENCIL;if(i===mp)return t.RED;if(i===yu)return t.RED_INTEGER;if(i===os)return t.RG;if(i===bu)return t.RG_INTEGER;if(i===Tu)return t.RGBA_INTEGER;if(i===ao||i===oo||i===co||i===lo)if(a===st)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ao)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===oo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===co)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===lo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ao)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===oo)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===co)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===lo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===_l||i===vl||i===xl||i===Ml)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===_l)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===vl)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===xl)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ml)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Sl||i===El||i===yl||i===bl||i===Tl||i===Al||i===wl)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Sl||i===El)return a===st?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===yl)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===bl)return s.COMPRESSED_R11_EAC;if(i===Tl)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Al)return s.COMPRESSED_RG11_EAC;if(i===wl)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Rl||i===Cl||i===Pl||i===Ll||i===Il||i===Dl||i===Ul||i===Nl||i===Fl||i===Ol||i===Bl||i===kl||i===zl||i===Vl)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Rl)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Cl)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Pl)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Ll)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Il)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Dl)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ul)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Nl)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Fl)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Ol)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Bl)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===kl)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===zl)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Vl)return a===st?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Gl||i===Hl||i===Wl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Gl)return a===st?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Hl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Wl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Xl||i===ql||i===Yl||i===$l)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Xl)return s.COMPRESSED_RED_RGTC1_EXT;if(i===ql)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Yl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===$l)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===aa?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const c3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,l3=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class u3{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new Ap(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new fi({vertexShader:c3,fragmentShader:l3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new mn(new Do(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class h3 extends Es{constructor(e,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,f=null,u=null,m=null,_=null;const S=typeof XRWebGLBinding<"u",p=new u3,d={},M=n.getContextAttributes();let b=null,E=null;const w=[],A=[],P=new $e;let v=null;const y=new yn;y.viewport=new wt;const H=new yn;H.viewport=new wt;const R=[y,H],B=new y_;let z=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ne=w[$];return ne===void 0&&(ne=new Mc,w[$]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function($){let ne=w[$];return ne===void 0&&(ne=new Mc,w[$]=ne),ne.getGripSpace()},this.getHand=function($){let ne=w[$];return ne===void 0&&(ne=new Mc,w[$]=ne),ne.getHandSpace()};function k($){const ne=A.indexOf($.inputSource);if(ne===-1)return;const se=w[ne];se!==void 0&&(se.update($.inputSource,$.frame,l||a),se.dispatchEvent({type:$.type,data:$.inputSource}))}function G(){r.removeEventListener("select",k),r.removeEventListener("selectstart",k),r.removeEventListener("selectend",k),r.removeEventListener("squeeze",k),r.removeEventListener("squeezestart",k),r.removeEventListener("squeezeend",k),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",N);for(let $=0;$<w.length;$++){const ne=A[$];ne!==null&&(A[$]=null,w[$].disconnect(ne))}z=null,q=null,p.reset();for(const $ in d)delete d[$];e.setRenderTarget(b),m=null,u=null,f=null,r=null,E=null,mt.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,i.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,i.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return f===null&&S&&(f=new XRWebGLBinding(r,n)),f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(b=e.getRenderTarget(),r.addEventListener("select",k),r.addEventListener("selectstart",k),r.addEventListener("selectend",k),r.addEventListener("squeeze",k),r.addEventListener("squeezestart",k),r.addEventListener("squeezeend",k),r.addEventListener("end",G),r.addEventListener("inputsourceschange",N),M.xrCompatible!==!0&&await n.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(P),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let se=null,Be=null,Ie=null;M.depth&&(Ie=M.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,se=M.stencil?xr:Ui,Be=M.stencil?aa:ui);const Ue={colorFormat:n.RGBA8,depthFormat:Ie,scaleFactor:s};f=this.getBinding(),u=f.createProjectionLayer(Ue),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),E=new ci(u.textureWidth,u.textureHeight,{format:Yn,type:bn,depthTexture:new ca(u.textureWidth,u.textureHeight,Be,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const se={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,n,se),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),E=new ci(m.framebufferWidth,m.framebufferHeight,{format:Yn,type:bn,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),mt.setContext(r),mt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function N($){for(let ne=0;ne<$.removed.length;ne++){const se=$.removed[ne],Be=A.indexOf(se);Be>=0&&(A[Be]=null,w[Be].disconnect(se))}for(let ne=0;ne<$.added.length;ne++){const se=$.added[ne];let Be=A.indexOf(se);if(Be===-1){for(let Ue=0;Ue<w.length;Ue++)if(Ue>=A.length){A.push(se),Be=Ue;break}else if(A[Ue]===null){A[Ue]=se,Be=Ue;break}if(Be===-1)break}const Ie=w[Be];Ie&&Ie.connect(se)}}const Q=new U,K=new U;function le($,ne,se){Q.setFromMatrixPosition(ne.matrixWorld),K.setFromMatrixPosition(se.matrixWorld);const Be=Q.distanceTo(K),Ie=ne.projectionMatrix.elements,Ue=se.projectionMatrix.elements,Ht=Ie[14]/(Ie[10]-1),je=Ie[14]/(Ie[10]+1),it=(Ie[9]+1)/Ie[5],lt=(Ie[9]-1)/Ie[5],Ge=(Ie[8]-1)/Ie[0],Ct=(Ue[8]+1)/Ue[0],C=Ht*Ge,It=Ht*Ct,nt=Be/(-Ge+Ct),dt=nt*-Ge;if(ne.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(dt),$.translateZ(nt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Ie[10]===-1)$.projectionMatrix.copy(ne.projectionMatrix),$.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const Ee=Ht+nt,T=je+nt,g=C-dt,I=It+(Be-dt),Y=it*je/T*Ee,j=lt*je/T*Ee;$.projectionMatrix.makePerspective(g,I,Y,j,Ee,T),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function ge($,ne){ne===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ne.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let ne=$.near,se=$.far;p.texture!==null&&(p.depthNear>0&&(ne=p.depthNear),p.depthFar>0&&(se=p.depthFar)),B.near=H.near=y.near=ne,B.far=H.far=y.far=se,(z!==B.near||q!==B.far)&&(r.updateRenderState({depthNear:B.near,depthFar:B.far}),z=B.near,q=B.far),B.layers.mask=$.layers.mask|6,y.layers.mask=B.layers.mask&-5,H.layers.mask=B.layers.mask&-3;const Be=$.parent,Ie=B.cameras;ge(B,Be);for(let Ue=0;Ue<Ie.length;Ue++)ge(Ie[Ue],Be);Ie.length===2?le(B,y,H):B.projectionMatrix.copy(y.projectionMatrix),fe($,B,Be)};function fe($,ne,se){se===null?$.matrix.copy(ne.matrixWorld):($.matrix.copy(se.matrixWorld),$.matrix.invert(),$.matrix.multiply(ne.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ne.projectionMatrix),$.projectionMatrixInverse.copy(ne.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=jl*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(u===null&&m===null))return c},this.setFoveation=function($){c=$,u!==null&&(u.fixedFoveation=$),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=$)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(B)},this.getCameraTexture=function($){return d[$]};let ze=null;function gt($,ne){if(h=ne.getViewerPose(l||a),_=ne,h!==null){const se=h.views;m!==null&&(e.setRenderTargetFramebuffer(E,m.framebuffer),e.setRenderTarget(E));let Be=!1;se.length!==B.cameras.length&&(B.cameras.length=0,Be=!0);for(let je=0;je<se.length;je++){const it=se[je];let lt=null;if(m!==null)lt=m.getViewport(it);else{const Ct=f.getViewSubImage(u,it);lt=Ct.viewport,je===0&&(e.setRenderTargetTextures(E,Ct.colorTexture,Ct.depthStencilTexture),e.setRenderTarget(E))}let Ge=R[je];Ge===void 0&&(Ge=new yn,Ge.layers.enable(je),Ge.viewport=new wt,R[je]=Ge),Ge.matrix.fromArray(it.transform.matrix),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge.projectionMatrix.fromArray(it.projectionMatrix),Ge.projectionMatrixInverse.copy(Ge.projectionMatrix).invert(),Ge.viewport.set(lt.x,lt.y,lt.width,lt.height),je===0&&(B.matrix.copy(Ge.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Be===!0&&B.cameras.push(Ge)}const Ie=r.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&S){f=i.getBinding();const je=f.getDepthInformation(se[0]);je&&je.isValid&&je.texture&&p.init(je,r.renderState)}if(Ie&&Ie.includes("camera-access")&&S){e.state.unbindTexture(),f=i.getBinding();for(let je=0;je<se.length;je++){const it=se[je].camera;if(it){let lt=d[it];lt||(lt=new Ap,d[it]=lt);const Ge=f.getCameraImage(it);lt.sourceTexture=Ge}}}}for(let se=0;se<w.length;se++){const Be=A[se],Ie=w[se];Be!==null&&Ie!==void 0&&Ie.update(Be,ne,l||a)}ze&&ze($,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),_=null}const mt=new Lp;mt.setAnimationLoop(gt),this.setAnimationLoop=function($){ze=$},this.dispose=function(){}}}const fr=new hi,f3=new yt;function d3(t,e){function n(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function i(p,d){d.color.getRGB(p.fogColor.value,wp(t)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function r(p,d,M,b,E){d.isMeshBasicMaterial?s(p,d):d.isMeshLambertMaterial?(s(p,d),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(s(p,d),f(p,d)):d.isMeshPhongMaterial?(s(p,d),h(p,d),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(s(p,d),u(p,d),d.isMeshPhysicalMaterial&&m(p,d,E)):d.isMeshMatcapMaterial?(s(p,d),_(p,d)):d.isMeshDepthMaterial?s(p,d):d.isMeshDistanceMaterial?(s(p,d),S(p,d)):d.isMeshNormalMaterial?s(p,d):d.isLineBasicMaterial?(a(p,d),d.isLineDashedMaterial&&o(p,d)):d.isPointsMaterial?c(p,d,M,b):d.isSpriteMaterial?l(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,n(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,n(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,n(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===pn&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,n(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===pn&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,n(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,n(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const M=e.get(d),b=M.envMap,E=M.envMapRotation;b&&(p.envMap.value=b,fr.copy(E),fr.x*=-1,fr.y*=-1,fr.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(fr.y*=-1,fr.z*=-1),p.envMapRotation.value.setFromMatrix4(f3.makeRotationFromEuler(fr)),p.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap&&(p.lightMap.value=d.lightMap,p.lightMapIntensity.value=d.lightMapIntensity,n(d.lightMap,p.lightMapTransform)),d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,p.aoMapTransform))}function a(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,n(d.map,p.mapTransform))}function o(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function c(p,d,M,b){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*M,p.scale.value=b*.5,d.map&&(p.map.value=d.map,n(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,n(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function l(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,n(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,n(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function h(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function f(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function u(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,p.roughnessMapTransform)),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function m(p,d,M){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===pn&&p.clearcoatNormalScale.value.negate())),d.dispersion>0&&(p.dispersion.value=d.dispersion),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=M.texture,p.transmissionSamplerSize.value.set(M.width,M.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,d){d.matcap&&(p.matcap.value=d.matcap)}function S(p,d){const M=e.get(d).light;p.referencePosition.value.setFromMatrixPosition(M.matrixWorld),p.nearDistance.value=M.shadow.camera.near,p.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function p3(t,e,n,i){let r={},s={},a=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function c(M,b){const E=b.program;i.uniformBlockBinding(M,E)}function l(M,b){let E=r[M.id];E===void 0&&(_(M),E=h(M),r[M.id]=E,M.addEventListener("dispose",p));const w=b.program;i.updateUBOMapping(M,w);const A=e.render.frame;s[M.id]!==A&&(u(M),s[M.id]=A)}function h(M){const b=f();M.__bindingPointIndex=b;const E=t.createBuffer(),w=M.__size,A=M.usage;return t.bindBuffer(t.UNIFORM_BUFFER,E),t.bufferData(t.UNIFORM_BUFFER,w,A),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,b,E),E}function f(){for(let M=0;M<o;M++)if(a.indexOf(M)===-1)return a.push(M),M;return Qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(M){const b=r[M.id],E=M.uniforms,w=M.__cache;t.bindBuffer(t.UNIFORM_BUFFER,b);for(let A=0,P=E.length;A<P;A++){const v=Array.isArray(E[A])?E[A]:[E[A]];for(let y=0,H=v.length;y<H;y++){const R=v[y];if(m(R,A,y,w)===!0){const B=R.__offset,z=Array.isArray(R.value)?R.value:[R.value];let q=0;for(let k=0;k<z.length;k++){const G=z[k],N=S(G);typeof G=="number"||typeof G=="boolean"?(R.__data[0]=G,t.bufferSubData(t.UNIFORM_BUFFER,B+q,R.__data)):G.isMatrix3?(R.__data[0]=G.elements[0],R.__data[1]=G.elements[1],R.__data[2]=G.elements[2],R.__data[3]=0,R.__data[4]=G.elements[3],R.__data[5]=G.elements[4],R.__data[6]=G.elements[5],R.__data[7]=0,R.__data[8]=G.elements[6],R.__data[9]=G.elements[7],R.__data[10]=G.elements[8],R.__data[11]=0):(G.toArray(R.__data,q),q+=N.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,B,R.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function m(M,b,E,w){const A=M.value,P=b+"_"+E;if(w[P]===void 0)return typeof A=="number"||typeof A=="boolean"?w[P]=A:w[P]=A.clone(),!0;{const v=w[P];if(typeof A=="number"||typeof A=="boolean"){if(v!==A)return w[P]=A,!0}else if(v.equals(A)===!1)return v.copy(A),!0}return!1}function _(M){const b=M.uniforms;let E=0;const w=16;for(let P=0,v=b.length;P<v;P++){const y=Array.isArray(b[P])?b[P]:[b[P]];for(let H=0,R=y.length;H<R;H++){const B=y[H],z=Array.isArray(B.value)?B.value:[B.value];for(let q=0,k=z.length;q<k;q++){const G=z[q],N=S(G),Q=E%w,K=Q%N.boundary,le=Q+K;E+=K,le!==0&&w-le<N.storage&&(E+=w-le),B.__data=new Float32Array(N.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=E,E+=N.storage}}}const A=E%w;return A>0&&(E+=w-A),M.__size=E,M.__cache={},this}function S(M){const b={boundary:0,storage:0};return typeof M=="number"||typeof M=="boolean"?(b.boundary=4,b.storage=4):M.isVector2?(b.boundary=8,b.storage=8):M.isVector3||M.isColor?(b.boundary=16,b.storage=12):M.isVector4?(b.boundary=16,b.storage=16):M.isMatrix3?(b.boundary=48,b.storage=48):M.isMatrix4?(b.boundary=64,b.storage=64):M.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Fe("WebGLRenderer: Unsupported uniform value type.",M),b}function p(M){const b=M.target;b.removeEventListener("dispose",p);const E=a.indexOf(b.__bindingPointIndex);a.splice(E,1),t.deleteBuffer(r[b.id]),delete r[b.id],delete s[b.id]}function d(){for(const M in r)t.deleteBuffer(r[M]);a=[],r={},s={}}return{bind:c,update:l,dispose:d}}const m3=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ei=null;function g3(){return ei===null&&(ei=new a_(m3,16,16,os,Di),ei.name="DFG_LUT",ei.minFilter=nn,ei.magFilter=nn,ei.wrapS=Ci,ei.wrapT=Ci,ei.generateMipmaps=!1,ei.needsUpdate=!0),ei}class _3{constructor(e={}){const{canvas:n=Og(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:m=bn}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=a;const S=m,p=new Set([Tu,bu,yu]),d=new Set([bn,ui,sa,aa,Su,Eu]),M=new Uint32Array(4),b=new Int32Array(4);let E=null,w=null;const A=[],P=[];let v=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let H=!1;this._outputColorSpace=On;let R=0,B=0,z=null,q=-1,k=null;const G=new wt,N=new wt;let Q=null;const K=new Xe(0);let le=0,ge=n.width,fe=n.height,ze=1,gt=null,mt=null;const $=new wt(0,0,ge,fe),ne=new wt(0,0,ge,fe);let se=!1;const Be=new Pu;let Ie=!1,Ue=!1;const Ht=new yt,je=new U,it=new wt,lt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ge=!1;function Ct(){return z===null?ze:1}let C=i;function It(x,D){return n.getContext(x,D)}try{const x={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${vu}`),n.addEventListener("webglcontextlost",xe,!1),n.addEventListener("webglcontextrestored",Ne,!1),n.addEventListener("webglcontextcreationerror",pt,!1),C===null){const D="webgl2";if(C=It(D,x),C===null)throw It(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw Qe("WebGLRenderer: "+x.message),x}let nt,dt,Ee,T,g,I,Y,j,X,_e,ie,Pe,De,Z,ee,ve,Me,ue,He,L,re,te,pe;function J(){nt=new _v(C),nt.init(),re=new o3(C,nt),dt=new lv(C,nt,e,re),Ee=new s3(C,nt),dt.reversedDepthBuffer&&u&&Ee.buffers.depth.setReversed(!0),T=new Mv(C),g=new Xx,I=new a3(C,nt,Ee,g,dt,re,T),Y=new gv(y),j=new T_(C),te=new ov(C,j),X=new vv(C,j,T,te),_e=new Ev(C,X,j,te,T),ue=new Sv(C,dt,I),ee=new uv(g),ie=new Wx(y,Y,nt,dt,te,ee),Pe=new d3(y,g),De=new Yx,Z=new Qx(nt),Me=new av(y,Y,Ee,_e,_,c),ve=new r3(y,_e,dt),pe=new p3(C,T,dt,Ee),He=new cv(C,nt,T),L=new xv(C,nt,T),T.programs=ie.programs,y.capabilities=dt,y.extensions=nt,y.properties=g,y.renderLists=De,y.shadowMap=ve,y.state=Ee,y.info=T}J(),S!==bn&&(v=new bv(S,n.width,n.height,r,s));const W=new h3(y,C);this.xr=W,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const x=nt.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=nt.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return ze},this.setPixelRatio=function(x){x!==void 0&&(ze=x,this.setSize(ge,fe,!1))},this.getSize=function(x){return x.set(ge,fe)},this.setSize=function(x,D,V=!0){if(W.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}ge=x,fe=D,n.width=Math.floor(x*ze),n.height=Math.floor(D*ze),V===!0&&(n.style.width=x+"px",n.style.height=D+"px"),v!==null&&v.setSize(n.width,n.height),this.setViewport(0,0,x,D)},this.getDrawingBufferSize=function(x){return x.set(ge*ze,fe*ze).floor()},this.setDrawingBufferSize=function(x,D,V){ge=x,fe=D,ze=V,n.width=Math.floor(x*V),n.height=Math.floor(D*V),this.setViewport(0,0,x,D)},this.setEffects=function(x){if(S===bn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(x){for(let D=0;D<x.length;D++)if(x[D].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}v.setEffects(x||[])},this.getCurrentViewport=function(x){return x.copy(G)},this.getViewport=function(x){return x.copy($)},this.setViewport=function(x,D,V,O){x.isVector4?$.set(x.x,x.y,x.z,x.w):$.set(x,D,V,O),Ee.viewport(G.copy($).multiplyScalar(ze).round())},this.getScissor=function(x){return x.copy(ne)},this.setScissor=function(x,D,V,O){x.isVector4?ne.set(x.x,x.y,x.z,x.w):ne.set(x,D,V,O),Ee.scissor(N.copy(ne).multiplyScalar(ze).round())},this.getScissorTest=function(){return se},this.setScissorTest=function(x){Ee.setScissorTest(se=x)},this.setOpaqueSort=function(x){gt=x},this.setTransparentSort=function(x){mt=x},this.getClearColor=function(x){return x.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor(...arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha(...arguments)},this.clear=function(x=!0,D=!0,V=!0){let O=0;if(x){let F=!1;if(z!==null){const oe=z.texture.format;F=p.has(oe)}if(F){const oe=z.texture.type,de=d.has(oe),ce=Me.getClearColor(),Se=Me.getClearAlpha(),Ae=ce.r,Oe=ce.g,We=ce.b;de?(M[0]=Ae,M[1]=Oe,M[2]=We,M[3]=Se,C.clearBufferuiv(C.COLOR,0,M)):(b[0]=Ae,b[1]=Oe,b[2]=We,b[3]=Se,C.clearBufferiv(C.COLOR,0,b))}else O|=C.COLOR_BUFFER_BIT}D&&(O|=C.DEPTH_BUFFER_BIT),V&&(O|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O!==0&&C.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",xe,!1),n.removeEventListener("webglcontextrestored",Ne,!1),n.removeEventListener("webglcontextcreationerror",pt,!1),Me.dispose(),De.dispose(),Z.dispose(),g.dispose(),Y.dispose(),_e.dispose(),te.dispose(),pe.dispose(),ie.dispose(),W.dispose(),W.removeEventListener("sessionstart",Dh),W.removeEventListener("sessionend",Uh),sr.stop()};function xe(x){x.preventDefault(),jh("WebGLRenderer: Context Lost."),H=!0}function Ne(){jh("WebGLRenderer: Context Restored."),H=!1;const x=T.autoReset,D=ve.enabled,V=ve.autoUpdate,O=ve.needsUpdate,F=ve.type;J(),T.autoReset=x,ve.enabled=D,ve.autoUpdate=V,ve.needsUpdate=O,ve.type=F}function pt(x){Qe("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function rt(x){const D=x.target;D.removeEventListener("dispose",rt),xi(D)}function xi(x){Mi(x),g.remove(x)}function Mi(x){const D=g.get(x).programs;D!==void 0&&(D.forEach(function(V){ie.releaseProgram(V)}),x.isShaderMaterial&&ie.releaseShaderCache(x))}this.renderBufferDirect=function(x,D,V,O,F,oe){D===null&&(D=lt);const de=F.isMesh&&F.matrixWorld.determinant()<0,ce=K0(x,D,V,O,F);Ee.setMaterial(O,de);let Se=V.index,Ae=1;if(O.wireframe===!0){if(Se=X.getWireframeAttribute(V),Se===void 0)return;Ae=2}const Oe=V.drawRange,We=V.attributes.position;let Re=Oe.start*Ae,at=(Oe.start+Oe.count)*Ae;oe!==null&&(Re=Math.max(Re,oe.start*Ae),at=Math.min(at,(oe.start+oe.count)*Ae)),Se!==null?(Re=Math.max(Re,0),at=Math.min(at,Se.count)):We!=null&&(Re=Math.max(Re,0),at=Math.min(at,We.count));const Pt=at-Re;if(Pt<0||Pt===1/0)return;te.setup(F,O,ce,V,Se);let Tt,ot=He;if(Se!==null&&(Tt=j.get(Se),ot=L,ot.setIndex(Tt)),F.isMesh)O.wireframe===!0?(Ee.setLineWidth(O.wireframeLinewidth*Ct()),ot.setMode(C.LINES)):ot.setMode(C.TRIANGLES);else if(F.isLine){let Jt=O.linewidth;Jt===void 0&&(Jt=1),Ee.setLineWidth(Jt*Ct()),F.isLineSegments?ot.setMode(C.LINES):F.isLineLoop?ot.setMode(C.LINE_LOOP):ot.setMode(C.LINE_STRIP)}else F.isPoints?ot.setMode(C.POINTS):F.isSprite&&ot.setMode(C.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)vo("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ot.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(nt.get("WEBGL_multi_draw"))ot.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Jt=F._multiDrawStarts,ye=F._multiDrawCounts,_n=F._multiDrawCount,Je=Se?j.get(Se).bytesPerElement:1,Gn=g.get(O).currentProgram.getUniforms();for(let Jn=0;Jn<_n;Jn++)Gn.setValue(C,"_gl_DrawID",Jn),ot.render(Jt[Jn]/Je,ye[Jn])}else if(F.isInstancedMesh)ot.renderInstances(Re,Pt,F.count);else if(V.isInstancedBufferGeometry){const Jt=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,ye=Math.min(V.instanceCount,Jt);ot.renderInstances(Re,Pt,ye)}else ot.render(Re,Pt)};function Ih(x,D,V){x.transparent===!0&&x.side===Ai&&x.forceSinglePass===!1?(x.side=pn,x.needsUpdate=!0,Aa(x,D,V),x.side=tr,x.needsUpdate=!0,Aa(x,D,V),x.side=Ai):Aa(x,D,V)}this.compile=function(x,D,V=null){V===null&&(V=x),w=Z.get(V),w.init(D),P.push(w),V.traverseVisible(function(F){F.isLight&&F.layers.test(D.layers)&&(w.pushLight(F),F.castShadow&&w.pushShadow(F))}),x!==V&&x.traverseVisible(function(F){F.isLight&&F.layers.test(D.layers)&&(w.pushLight(F),F.castShadow&&w.pushShadow(F))}),w.setupLights();const O=new Set;return x.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const oe=F.material;if(oe)if(Array.isArray(oe))for(let de=0;de<oe.length;de++){const ce=oe[de];Ih(ce,V,F),O.add(ce)}else Ih(oe,V,F),O.add(oe)}),w=P.pop(),O},this.compileAsync=function(x,D,V=null){const O=this.compile(x,D,V);return new Promise(F=>{function oe(){if(O.forEach(function(de){g.get(de).currentProgram.isReady()&&O.delete(de)}),O.size===0){F(x);return}setTimeout(oe,10)}nt.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let cc=null;function j0(x){cc&&cc(x)}function Dh(){sr.stop()}function Uh(){sr.start()}const sr=new Lp;sr.setAnimationLoop(j0),typeof self<"u"&&sr.setContext(self),this.setAnimationLoop=function(x){cc=x,W.setAnimationLoop(x),x===null?sr.stop():sr.start()},W.addEventListener("sessionstart",Dh),W.addEventListener("sessionend",Uh),this.render=function(x,D){if(D!==void 0&&D.isCamera!==!0){Qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(H===!0)return;const V=W.enabled===!0&&W.isPresenting===!0,O=v!==null&&(z===null||V)&&v.begin(y,z);if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(v===null||v.isCompositing()===!1)&&(W.cameraAutoUpdate===!0&&W.updateCamera(D),D=W.getCamera()),x.isScene===!0&&x.onBeforeRender(y,x,D,z),w=Z.get(x,P.length),w.init(D),P.push(w),Ht.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Be.setFromProjectionMatrix(Ht,si,D.reversedDepth),Ue=this.localClippingEnabled,Ie=ee.init(this.clippingPlanes,Ue),E=De.get(x,A.length),E.init(),A.push(E),W.enabled===!0&&W.isPresenting===!0){const de=y.xr.getDepthSensingMesh();de!==null&&lc(de,D,-1/0,y.sortObjects)}lc(x,D,0,y.sortObjects),E.finish(),y.sortObjects===!0&&E.sort(gt,mt),Ge=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,Ge&&Me.addToRenderList(E,x),this.info.render.frame++,Ie===!0&&ee.beginShadows();const F=w.state.shadowsArray;if(ve.render(F,x,D),Ie===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset(),(O&&v.hasRenderPass())===!1){const de=E.opaque,ce=E.transmissive;if(w.setupLights(),D.isArrayCamera){const Se=D.cameras;if(ce.length>0)for(let Ae=0,Oe=Se.length;Ae<Oe;Ae++){const We=Se[Ae];Fh(de,ce,x,We)}Ge&&Me.render(x);for(let Ae=0,Oe=Se.length;Ae<Oe;Ae++){const We=Se[Ae];Nh(E,x,We,We.viewport)}}else ce.length>0&&Fh(de,ce,x,D),Ge&&Me.render(x),Nh(E,x,D)}z!==null&&B===0&&(I.updateMultisampleRenderTarget(z),I.updateRenderTargetMipmap(z)),O&&v.end(y),x.isScene===!0&&x.onAfterRender(y,x,D),te.resetDefaultState(),q=-1,k=null,P.pop(),P.length>0?(w=P[P.length-1],Ie===!0&&ee.setGlobalState(y.clippingPlanes,w.state.camera)):w=null,A.pop(),A.length>0?E=A[A.length-1]:E=null};function lc(x,D,V,O){if(x.visible===!1)return;if(x.layers.test(D.layers)){if(x.isGroup)V=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(D);else if(x.isLight)w.pushLight(x),x.castShadow&&w.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||Be.intersectsSprite(x)){O&&it.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Ht);const de=_e.update(x),ce=x.material;ce.visible&&E.push(x,de,ce,V,it.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||Be.intersectsObject(x))){const de=_e.update(x),ce=x.material;if(O&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),it.copy(x.boundingSphere.center)):(de.boundingSphere===null&&de.computeBoundingSphere(),it.copy(de.boundingSphere.center)),it.applyMatrix4(x.matrixWorld).applyMatrix4(Ht)),Array.isArray(ce)){const Se=de.groups;for(let Ae=0,Oe=Se.length;Ae<Oe;Ae++){const We=Se[Ae],Re=ce[We.materialIndex];Re&&Re.visible&&E.push(x,de,Re,V,it.z,We)}}else ce.visible&&E.push(x,de,ce,V,it.z,null)}}const oe=x.children;for(let de=0,ce=oe.length;de<ce;de++)lc(oe[de],D,V,O)}function Nh(x,D,V,O){const{opaque:F,transmissive:oe,transparent:de}=x;w.setupLightsView(V),Ie===!0&&ee.setGlobalState(y.clippingPlanes,V),O&&Ee.viewport(G.copy(O)),F.length>0&&Ta(F,D,V),oe.length>0&&Ta(oe,D,V),de.length>0&&Ta(de,D,V),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function Fh(x,D,V,O){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[O.id]===void 0){const Re=nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[O.id]=new ci(1,1,{generateMipmaps:!0,type:Re?Di:bn,minFilter:vr,samples:Math.max(4,dt.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace})}const oe=w.state.transmissionRenderTarget[O.id],de=O.viewport||G;oe.setSize(de.z*y.transmissionResolutionScale,de.w*y.transmissionResolutionScale);const ce=y.getRenderTarget(),Se=y.getActiveCubeFace(),Ae=y.getActiveMipmapLevel();y.setRenderTarget(oe),y.getClearColor(K),le=y.getClearAlpha(),le<1&&y.setClearColor(16777215,.5),y.clear(),Ge&&Me.render(V);const Oe=y.toneMapping;y.toneMapping=oi;const We=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),w.setupLightsView(O),Ie===!0&&ee.setGlobalState(y.clippingPlanes,O),Ta(x,V,O),I.updateMultisampleRenderTarget(oe),I.updateRenderTargetMipmap(oe),nt.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let at=0,Pt=D.length;at<Pt;at++){const Tt=D[at],{object:ot,geometry:Jt,material:ye,group:_n}=Tt;if(ye.side===Ai&&ot.layers.test(O.layers)){const Je=ye.side;ye.side=pn,ye.needsUpdate=!0,Oh(ot,V,O,Jt,ye,_n),ye.side=Je,ye.needsUpdate=!0,Re=!0}}Re===!0&&(I.updateMultisampleRenderTarget(oe),I.updateRenderTargetMipmap(oe))}y.setRenderTarget(ce,Se,Ae),y.setClearColor(K,le),We!==void 0&&(O.viewport=We),y.toneMapping=Oe}function Ta(x,D,V){const O=D.isScene===!0?D.overrideMaterial:null;for(let F=0,oe=x.length;F<oe;F++){const de=x[F],{object:ce,geometry:Se,group:Ae}=de;let Oe=de.material;Oe.allowOverride===!0&&O!==null&&(Oe=O),ce.layers.test(V.layers)&&Oh(ce,D,V,Se,Oe,Ae)}}function Oh(x,D,V,O,F,oe){x.onBeforeRender(y,D,V,O,F,oe),x.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),F.onBeforeRender(y,D,V,O,x,oe),F.transparent===!0&&F.side===Ai&&F.forceSinglePass===!1?(F.side=pn,F.needsUpdate=!0,y.renderBufferDirect(V,D,O,F,x,oe),F.side=tr,F.needsUpdate=!0,y.renderBufferDirect(V,D,O,F,x,oe),F.side=Ai):y.renderBufferDirect(V,D,O,F,x,oe),x.onAfterRender(y,D,V,O,F,oe)}function Aa(x,D,V){D.isScene!==!0&&(D=lt);const O=g.get(x),F=w.state.lights,oe=w.state.shadowsArray,de=F.state.version,ce=ie.getParameters(x,F.state,oe,D,V),Se=ie.getProgramCacheKey(ce);let Ae=O.programs;O.environment=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?D.environment:null,O.fog=D.fog;const Oe=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap;O.envMap=Y.get(x.envMap||O.environment,Oe),O.envMapRotation=O.environment!==null&&x.envMap===null?D.environmentRotation:x.envMapRotation,Ae===void 0&&(x.addEventListener("dispose",rt),Ae=new Map,O.programs=Ae);let We=Ae.get(Se);if(We!==void 0){if(O.currentProgram===We&&O.lightsStateVersion===de)return kh(x,ce),We}else ce.uniforms=ie.getUniforms(x),x.onBeforeCompile(ce,y),We=ie.acquireProgram(ce,Se),Ae.set(Se,We),O.uniforms=ce.uniforms;const Re=O.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Re.clippingPlanes=ee.uniform),kh(x,ce),O.needsLights=J0(x),O.lightsStateVersion=de,O.needsLights&&(Re.ambientLightColor.value=F.state.ambient,Re.lightProbe.value=F.state.probe,Re.directionalLights.value=F.state.directional,Re.directionalLightShadows.value=F.state.directionalShadow,Re.spotLights.value=F.state.spot,Re.spotLightShadows.value=F.state.spotShadow,Re.rectAreaLights.value=F.state.rectArea,Re.ltc_1.value=F.state.rectAreaLTC1,Re.ltc_2.value=F.state.rectAreaLTC2,Re.pointLights.value=F.state.point,Re.pointLightShadows.value=F.state.pointShadow,Re.hemisphereLights.value=F.state.hemi,Re.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Re.spotLightMatrix.value=F.state.spotLightMatrix,Re.spotLightMap.value=F.state.spotLightMap,Re.pointShadowMatrix.value=F.state.pointShadowMatrix),O.currentProgram=We,O.uniformsList=null,We}function Bh(x){if(x.uniformsList===null){const D=x.currentProgram.getUniforms();x.uniformsList=uo.seqWithValue(D.seq,x.uniforms)}return x.uniformsList}function kh(x,D){const V=g.get(x);V.outputColorSpace=D.outputColorSpace,V.batching=D.batching,V.batchingColor=D.batchingColor,V.instancing=D.instancing,V.instancingColor=D.instancingColor,V.instancingMorph=D.instancingMorph,V.skinning=D.skinning,V.morphTargets=D.morphTargets,V.morphNormals=D.morphNormals,V.morphColors=D.morphColors,V.morphTargetsCount=D.morphTargetsCount,V.numClippingPlanes=D.numClippingPlanes,V.numIntersection=D.numClipIntersection,V.vertexAlphas=D.vertexAlphas,V.vertexTangents=D.vertexTangents,V.toneMapping=D.toneMapping}function K0(x,D,V,O,F){D.isScene!==!0&&(D=lt),I.resetTextureUnits();const oe=D.fog,de=O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial?D.environment:null,ce=z===null?y.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:cs,Se=O.isMeshStandardMaterial||O.isMeshLambertMaterial&&!O.envMap||O.isMeshPhongMaterial&&!O.envMap,Ae=Y.get(O.envMap||de,Se),Oe=O.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,We=!!V.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Re=!!V.morphAttributes.position,at=!!V.morphAttributes.normal,Pt=!!V.morphAttributes.color;let Tt=oi;O.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(Tt=y.toneMapping);const ot=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Jt=ot!==void 0?ot.length:0,ye=g.get(O),_n=w.state.lights;if(Ie===!0&&(Ue===!0||x!==k)){const Wt=x===k&&O.id===q;ee.setState(O,x,Wt)}let Je=!1;O.version===ye.__version?(ye.needsLights&&ye.lightsStateVersion!==_n.state.version||ye.outputColorSpace!==ce||F.isBatchedMesh&&ye.batching===!1||!F.isBatchedMesh&&ye.batching===!0||F.isBatchedMesh&&ye.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&ye.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&ye.instancing===!1||!F.isInstancedMesh&&ye.instancing===!0||F.isSkinnedMesh&&ye.skinning===!1||!F.isSkinnedMesh&&ye.skinning===!0||F.isInstancedMesh&&ye.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&ye.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&ye.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&ye.instancingMorph===!1&&F.morphTexture!==null||ye.envMap!==Ae||O.fog===!0&&ye.fog!==oe||ye.numClippingPlanes!==void 0&&(ye.numClippingPlanes!==ee.numPlanes||ye.numIntersection!==ee.numIntersection)||ye.vertexAlphas!==Oe||ye.vertexTangents!==We||ye.morphTargets!==Re||ye.morphNormals!==at||ye.morphColors!==Pt||ye.toneMapping!==Tt||ye.morphTargetsCount!==Jt)&&(Je=!0):(Je=!0,ye.__version=O.version);let Gn=ye.currentProgram;Je===!0&&(Gn=Aa(O,D,F));let Jn=!1,ar=!1,Ur=!1;const ut=Gn.getUniforms(),jt=ye.uniforms;if(Ee.useProgram(Gn.program)&&(Jn=!0,ar=!0,Ur=!0),O.id!==q&&(q=O.id,ar=!0),Jn||k!==x){Ee.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),ut.setValue(C,"projectionMatrix",x.projectionMatrix),ut.setValue(C,"viewMatrix",x.matrixWorldInverse);const Vi=ut.map.cameraPosition;Vi!==void 0&&Vi.setValue(C,je.setFromMatrixPosition(x.matrixWorld)),dt.logarithmicDepthBuffer&&ut.setValue(C,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&ut.setValue(C,"isOrthographic",x.isOrthographicCamera===!0),k!==x&&(k=x,ar=!0,Ur=!0)}if(ye.needsLights&&(_n.state.directionalShadowMap.length>0&&ut.setValue(C,"directionalShadowMap",_n.state.directionalShadowMap,I),_n.state.spotShadowMap.length>0&&ut.setValue(C,"spotShadowMap",_n.state.spotShadowMap,I),_n.state.pointShadowMap.length>0&&ut.setValue(C,"pointShadowMap",_n.state.pointShadowMap,I)),F.isSkinnedMesh){ut.setOptional(C,F,"bindMatrix"),ut.setOptional(C,F,"bindMatrixInverse");const Wt=F.skeleton;Wt&&(Wt.boneTexture===null&&Wt.computeBoneTexture(),ut.setValue(C,"boneTexture",Wt.boneTexture,I))}F.isBatchedMesh&&(ut.setOptional(C,F,"batchingTexture"),ut.setValue(C,"batchingTexture",F._matricesTexture,I),ut.setOptional(C,F,"batchingIdTexture"),ut.setValue(C,"batchingIdTexture",F._indirectTexture,I),ut.setOptional(C,F,"batchingColorTexture"),F._colorsTexture!==null&&ut.setValue(C,"batchingColorTexture",F._colorsTexture,I));const zi=V.morphAttributes;if((zi.position!==void 0||zi.normal!==void 0||zi.color!==void 0)&&ue.update(F,V,Gn),(ar||ye.receiveShadow!==F.receiveShadow)&&(ye.receiveShadow=F.receiveShadow,ut.setValue(C,"receiveShadow",F.receiveShadow)),(O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial)&&O.envMap===null&&D.environment!==null&&(jt.envMapIntensity.value=D.environmentIntensity),jt.dfgLUT!==void 0&&(jt.dfgLUT.value=g3()),ar&&(ut.setValue(C,"toneMappingExposure",y.toneMappingExposure),ye.needsLights&&Z0(jt,Ur),oe&&O.fog===!0&&Pe.refreshFogUniforms(jt,oe),Pe.refreshMaterialUniforms(jt,O,ze,fe,w.state.transmissionRenderTarget[x.id]),uo.upload(C,Bh(ye),jt,I)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(uo.upload(C,Bh(ye),jt,I),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&ut.setValue(C,"center",F.center),ut.setValue(C,"modelViewMatrix",F.modelViewMatrix),ut.setValue(C,"normalMatrix",F.normalMatrix),ut.setValue(C,"modelMatrix",F.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const Wt=O.uniformsGroups;for(let Vi=0,Nr=Wt.length;Vi<Nr;Vi++){const zh=Wt[Vi];pe.update(zh,Gn),pe.bind(zh,Gn)}}return Gn}function Z0(x,D){x.ambientLightColor.needsUpdate=D,x.lightProbe.needsUpdate=D,x.directionalLights.needsUpdate=D,x.directionalLightShadows.needsUpdate=D,x.pointLights.needsUpdate=D,x.pointLightShadows.needsUpdate=D,x.spotLights.needsUpdate=D,x.spotLightShadows.needsUpdate=D,x.rectAreaLights.needsUpdate=D,x.hemisphereLights.needsUpdate=D}function J0(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return z},this.setRenderTargetTextures=function(x,D,V){const O=g.get(x);O.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),g.get(x.texture).__webglTexture=D,g.get(x.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:V,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,D){const V=g.get(x);V.__webglFramebuffer=D,V.__useDefaultFramebuffer=D===void 0};const Q0=C.createFramebuffer();this.setRenderTarget=function(x,D=0,V=0){z=x,R=D,B=V;let O=null,F=!1,oe=!1;if(x){const ce=g.get(x);if(ce.__useDefaultFramebuffer!==void 0){Ee.bindFramebuffer(C.FRAMEBUFFER,ce.__webglFramebuffer),G.copy(x.viewport),N.copy(x.scissor),Q=x.scissorTest,Ee.viewport(G),Ee.scissor(N),Ee.setScissorTest(Q),q=-1;return}else if(ce.__webglFramebuffer===void 0)I.setupRenderTarget(x);else if(ce.__hasExternalTextures)I.rebindTextures(x,g.get(x.texture).__webglTexture,g.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const Oe=x.depthTexture;if(ce.__boundDepthTexture!==Oe){if(Oe!==null&&g.has(Oe)&&(x.width!==Oe.image.width||x.height!==Oe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(x)}}const Se=x.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(oe=!0);const Ae=g.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Ae[D])?O=Ae[D][V]:O=Ae[D],F=!0):x.samples>0&&I.useMultisampledRTT(x)===!1?O=g.get(x).__webglMultisampledFramebuffer:Array.isArray(Ae)?O=Ae[V]:O=Ae,G.copy(x.viewport),N.copy(x.scissor),Q=x.scissorTest}else G.copy($).multiplyScalar(ze).floor(),N.copy(ne).multiplyScalar(ze).floor(),Q=se;if(V!==0&&(O=Q0),Ee.bindFramebuffer(C.FRAMEBUFFER,O)&&Ee.drawBuffers(x,O),Ee.viewport(G),Ee.scissor(N),Ee.setScissorTest(Q),F){const ce=g.get(x.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+D,ce.__webglTexture,V)}else if(oe){const ce=D;for(let Se=0;Se<x.textures.length;Se++){const Ae=g.get(x.textures[Se]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Se,Ae.__webglTexture,V,ce)}}else if(x!==null&&V!==0){const ce=g.get(x.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,ce.__webglTexture,V)}q=-1},this.readRenderTargetPixels=function(x,D,V,O,F,oe,de,ce=0){if(!(x&&x.isWebGLRenderTarget)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=g.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&de!==void 0&&(Se=Se[de]),Se){Ee.bindFramebuffer(C.FRAMEBUFFER,Se);try{const Ae=x.textures[ce],Oe=Ae.format,We=Ae.type;if(x.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+ce),!dt.textureFormatReadable(Oe)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!dt.textureTypeReadable(We)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=x.width-O&&V>=0&&V<=x.height-F&&C.readPixels(D,V,O,F,re.convert(Oe),re.convert(We),oe)}finally{const Ae=z!==null?g.get(z).__webglFramebuffer:null;Ee.bindFramebuffer(C.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(x,D,V,O,F,oe,de,ce=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=g.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&de!==void 0&&(Se=Se[de]),Se)if(D>=0&&D<=x.width-O&&V>=0&&V<=x.height-F){Ee.bindFramebuffer(C.FRAMEBUFFER,Se);const Ae=x.textures[ce],Oe=Ae.format,We=Ae.type;if(x.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+ce),!dt.textureFormatReadable(Oe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!dt.textureTypeReadable(We))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Re=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Re),C.bufferData(C.PIXEL_PACK_BUFFER,oe.byteLength,C.STREAM_READ),C.readPixels(D,V,O,F,re.convert(Oe),re.convert(We),0);const at=z!==null?g.get(z).__webglFramebuffer:null;Ee.bindFramebuffer(C.FRAMEBUFFER,at);const Pt=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Bg(C,Pt,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Re),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,oe),C.deleteBuffer(Re),C.deleteSync(Pt),oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,D=null,V=0){const O=Math.pow(2,-V),F=Math.floor(x.image.width*O),oe=Math.floor(x.image.height*O),de=D!==null?D.x:0,ce=D!==null?D.y:0;I.setTexture2D(x,0),C.copyTexSubImage2D(C.TEXTURE_2D,V,0,0,de,ce,F,oe),Ee.unbindTexture()};const eg=C.createFramebuffer(),tg=C.createFramebuffer();this.copyTextureToTexture=function(x,D,V=null,O=null,F=0,oe=0){let de,ce,Se,Ae,Oe,We,Re,at,Pt;const Tt=x.isCompressedTexture?x.mipmaps[oe]:x.image;if(V!==null)de=V.max.x-V.min.x,ce=V.max.y-V.min.y,Se=V.isBox3?V.max.z-V.min.z:1,Ae=V.min.x,Oe=V.min.y,We=V.isBox3?V.min.z:0;else{const jt=Math.pow(2,-F);de=Math.floor(Tt.width*jt),ce=Math.floor(Tt.height*jt),x.isDataArrayTexture?Se=Tt.depth:x.isData3DTexture?Se=Math.floor(Tt.depth*jt):Se=1,Ae=0,Oe=0,We=0}O!==null?(Re=O.x,at=O.y,Pt=O.z):(Re=0,at=0,Pt=0);const ot=re.convert(D.format),Jt=re.convert(D.type);let ye;D.isData3DTexture?(I.setTexture3D(D,0),ye=C.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(I.setTexture2DArray(D,0),ye=C.TEXTURE_2D_ARRAY):(I.setTexture2D(D,0),ye=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,D.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,D.unpackAlignment);const _n=C.getParameter(C.UNPACK_ROW_LENGTH),Je=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Gn=C.getParameter(C.UNPACK_SKIP_PIXELS),Jn=C.getParameter(C.UNPACK_SKIP_ROWS),ar=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,Tt.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Tt.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ae),C.pixelStorei(C.UNPACK_SKIP_ROWS,Oe),C.pixelStorei(C.UNPACK_SKIP_IMAGES,We);const Ur=x.isDataArrayTexture||x.isData3DTexture,ut=D.isDataArrayTexture||D.isData3DTexture;if(x.isDepthTexture){const jt=g.get(x),zi=g.get(D),Wt=g.get(jt.__renderTarget),Vi=g.get(zi.__renderTarget);Ee.bindFramebuffer(C.READ_FRAMEBUFFER,Wt.__webglFramebuffer),Ee.bindFramebuffer(C.DRAW_FRAMEBUFFER,Vi.__webglFramebuffer);for(let Nr=0;Nr<Se;Nr++)Ur&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,g.get(x).__webglTexture,F,We+Nr),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,g.get(D).__webglTexture,oe,Pt+Nr)),C.blitFramebuffer(Ae,Oe,de,ce,Re,at,de,ce,C.DEPTH_BUFFER_BIT,C.NEAREST);Ee.bindFramebuffer(C.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(F!==0||x.isRenderTargetTexture||g.has(x)){const jt=g.get(x),zi=g.get(D);Ee.bindFramebuffer(C.READ_FRAMEBUFFER,eg),Ee.bindFramebuffer(C.DRAW_FRAMEBUFFER,tg);for(let Wt=0;Wt<Se;Wt++)Ur?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,jt.__webglTexture,F,We+Wt):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,jt.__webglTexture,F),ut?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,zi.__webglTexture,oe,Pt+Wt):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,zi.__webglTexture,oe),F!==0?C.blitFramebuffer(Ae,Oe,de,ce,Re,at,de,ce,C.COLOR_BUFFER_BIT,C.NEAREST):ut?C.copyTexSubImage3D(ye,oe,Re,at,Pt+Wt,Ae,Oe,de,ce):C.copyTexSubImage2D(ye,oe,Re,at,Ae,Oe,de,ce);Ee.bindFramebuffer(C.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else ut?x.isDataTexture||x.isData3DTexture?C.texSubImage3D(ye,oe,Re,at,Pt,de,ce,Se,ot,Jt,Tt.data):D.isCompressedArrayTexture?C.compressedTexSubImage3D(ye,oe,Re,at,Pt,de,ce,Se,ot,Tt.data):C.texSubImage3D(ye,oe,Re,at,Pt,de,ce,Se,ot,Jt,Tt):x.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,oe,Re,at,de,ce,ot,Jt,Tt.data):x.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,oe,Re,at,Tt.width,Tt.height,ot,Tt.data):C.texSubImage2D(C.TEXTURE_2D,oe,Re,at,de,ce,ot,Jt,Tt);C.pixelStorei(C.UNPACK_ROW_LENGTH,_n),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Je),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Gn),C.pixelStorei(C.UNPACK_SKIP_ROWS,Jn),C.pixelStorei(C.UNPACK_SKIP_IMAGES,ar),oe===0&&D.generateMipmaps&&C.generateMipmap(ye),Ee.unbindTexture()},this.initRenderTarget=function(x){g.get(x).__webglFramebuffer===void 0&&I.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?I.setTextureCube(x,0):x.isData3DTexture?I.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?I.setTexture2DArray(x,0):I.setTexture2D(x,0),Ee.unbindTexture()},this.resetState=function(){R=0,B=0,z=null,Ee.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=Ke._getDrawingBufferColorSpace(e),n.unpackColorSpace=Ke._getUnpackColorSpace()}}class v3{constructor(){ht(this,"_listeners",new Map)}on(e,n){return this._listeners.has(e)||this._listeners.set(e,new Set),this._listeners.get(e).add(n),this}off(e,n){var i;return(i=this._listeners.get(e))==null||i.delete(n),this}emit(e,n){var i;(i=this._listeners.get(e))==null||i.forEach(r=>r(n))}removeAllListeners(e){return e?this._listeners.delete(e):this._listeners.clear(),this}}var us=typeof self<"u"?self:{};function Op(t,e){e:{for(var n=["CLOSURE_FLAGS"],i=us,r=0;r<n.length;r++)if((i=i[n[r]])==null){n=null;break e}n=i}return(t=n&&n[t])!=null?t:e}function dr(){throw Error("Invalid UTF8")}function Vf(t,e){return e=String.fromCharCode.apply(null,e),t==null?e:t+e}let Ja,Wc;const x3=typeof TextDecoder<"u";let M3;const S3=typeof TextEncoder<"u";function Bp(t){if(S3)t=(M3||(M3=new TextEncoder)).encode(t);else{let n=0;const i=new Uint8Array(3*t.length);for(let r=0;r<t.length;r++){var e=t.charCodeAt(r);if(e<128)i[n++]=e;else{if(e<2048)i[n++]=e>>6|192;else{if(e>=55296&&e<=57343){if(e<=56319&&r<t.length){const s=t.charCodeAt(++r);if(s>=56320&&s<=57343){e=1024*(e-55296)+s-56320+65536,i[n++]=e>>18|240,i[n++]=e>>12&63|128,i[n++]=e>>6&63|128,i[n++]=63&e|128;continue}r--}e=65533}i[n++]=e>>12|224,i[n++]=e>>6&63|128}i[n++]=63&e|128}}t=n===i.length?i:i.subarray(0,n)}return t}function kp(t){us.setTimeout(()=>{throw t},0)}var Ql,E3=Op(610401301,!1),Gf=Op(748402147,!0);function Hf(){var t=us.navigator;return t&&(t=t.userAgent)?t:""}const Wf=us.navigator;function Oo(t){return Oo[" "](t),t}Ql=Wf&&Wf.userAgentData||null,Oo[" "]=function(){};const zp={};let Zs=null;function y3(t){const e=t.length;let n=3*e/4;n%3?n=Math.floor(n):"=.".indexOf(t[e-1])!=-1&&(n="=.".indexOf(t[e-2])!=-1?n-2:n-1);const i=new Uint8Array(n);let r=0;return function(s,a){function o(l){for(;c<s.length;){const h=s.charAt(c++),f=Zs[h];if(f!=null)return f;if(!/^[\s\xa0]*$/.test(h))throw Error("Unknown base64 encoding at char: "+h)}return l}Vp();let c=0;for(;;){const l=o(-1),h=o(0),f=o(64),u=o(64);if(u===64&&l===-1)break;a(l<<2|h>>4),f!=64&&(a(h<<4&240|f>>2),u!=64&&a(f<<6&192|u))}}(t,function(s){i[r++]=s}),r!==n?i.subarray(0,r):i}function Vp(){if(!Zs){Zs={};var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),e=["+/=","+/","-_=","-_.","-_"];for(let n=0;n<5;n++){const i=t.concat(e[n].split(""));zp[n]=i;for(let r=0;r<i.length;r++){const s=i[r];Zs[s]===void 0&&(Zs[s]=r)}}}}var b3=typeof Uint8Array<"u",Gp=!(!(E3&&Ql&&Ql.brands.length>0)&&(Hf().indexOf("Trident")!=-1||Hf().indexOf("MSIE")!=-1))&&typeof btoa=="function";const Xf=/[-_.]/g,T3={"-":"+",_:"/",".":"="};function A3(t){return T3[t]||""}function Hp(t){if(!Gp)return y3(t);t=Xf.test(t)?t.replace(Xf,A3):t,t=atob(t);const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}function Fu(t){return b3&&t!=null&&t instanceof Uint8Array}var hs={};function Rr(){return w3||(w3=new li(null,hs))}function Ou(t){Wp(hs);var e=t.g;return(e=e==null||Fu(e)?e:typeof e=="string"?Hp(e):null)==null?e:t.g=e}var li=class{h(){return new Uint8Array(Ou(this)||0)}constructor(t,e){if(Wp(e),this.g=t,t!=null&&t.length===0)throw Error("ByteString should be constructed with non-empty values")}};let w3,R3;function Wp(t){if(t!==hs)throw Error("illegal external caller")}function Xp(t,e){t.__closure__error__context__984382||(t.__closure__error__context__984382={}),t.__closure__error__context__984382.severity=e}function eu(t){return Xp(t=Error(t),"warning"),t}function fs(t,e){if(t!=null){var n=R3??(R3={}),i=n[t]||0;i>=e||(n[t]=i+1,Xp(t=Error(),"incident"),kp(t))}}function ws(){return typeof BigInt=="function"}var Rs=typeof Symbol=="function"&&typeof Symbol()=="symbol";function pi(t,e,n=!1){return typeof Symbol=="function"&&typeof Symbol()=="symbol"?n&&Symbol.for&&t?Symbol.for(t):t!=null?Symbol(t):Symbol():e}var C3=pi("jas",void 0,!0),qf=pi(void 0,"0di"),Ys=pi(void 0,"1oa"),An=pi(void 0,Symbol()),P3=pi(void 0,"0ub"),L3=pi(void 0,"0ubs"),tu=pi(void 0,"0ubsb"),I3=pi(void 0,"0actk"),ds=pi("m_m","Pa",!0),Yf=pi();const qp={Ga:{value:0,configurable:!0,writable:!0,enumerable:!1}},Yp=Object.defineProperties,be=Rs?C3:"Ga";var Lr;const $f=[];function _a(t,e){Rs||be in t||Yp(t,qp),t[be]|=e}function Gt(t,e){Rs||be in t||Yp(t,qp),t[be]=e}function va(t){return _a(t,34),t}function la(t){return _a(t,8192),t}Gt($f,7),Lr=Object.freeze($f);var ps={};function Rn(t,e){return e===void 0?t.h!==Cr&&!!(2&(0|t.v[be])):!!(2&e)&&t.h!==Cr}const Cr={};function Bu(t,e){if(t!=null){if(typeof t=="string")t=t?new li(t,hs):Rr();else if(t.constructor!==li)if(Fu(t))t=t.length?new li(new Uint8Array(t),hs):Rr();else{if(!e)throw Error();t=void 0}}return t}class jf{constructor(e,n,i){this.g=e,this.h=n,this.l=i}next(){const e=this.g.next();return e.done||(e.value=this.h.call(this.l,e.value)),e}[Symbol.iterator](){return this}}var D3=Object.freeze({});function $p(t,e,n){const i=128&e?0:-1,r=t.length;var s;(s=!!r)&&(s=(s=t[r-1])!=null&&typeof s=="object"&&s.constructor===Object);const a=r+(s?-1:0);for(e=128&e?1:0;e<a;e++)n(e-i,t[e]);if(s){t=t[r-1];for(const o in t)!isNaN(o)&&n(+o,t[o])}}var jp={};function Cs(t){return 128&t?jp:void 0}function Bo(t){return t.Na=!0,t}var U3=Bo(t=>typeof t=="number"),Kf=Bo(t=>typeof t=="string"),N3=Bo(t=>typeof t=="boolean"),ko=typeof us.BigInt=="function"&&typeof us.BigInt(0)=="bigint";function wn(t){var e=t;if(Kf(e)){if(!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(e))throw Error(String(e))}else if(U3(e)&&!Number.isSafeInteger(e))throw Error(String(e));return ko?BigInt(t):t=N3(t)?t?"1":"0":Kf(t)?t.trim()||"0":String(t)}var nu=Bo(t=>ko?t>=O3&&t<=k3:t[0]==="-"?Zf(t,F3):Zf(t,B3));const F3=Number.MIN_SAFE_INTEGER.toString(),O3=ko?BigInt(Number.MIN_SAFE_INTEGER):void 0,B3=Number.MAX_SAFE_INTEGER.toString(),k3=ko?BigInt(Number.MAX_SAFE_INTEGER):void 0;function Zf(t,e){if(t.length>e.length)return!1;if(t.length<e.length||t===e)return!0;for(let n=0;n<t.length;n++){const i=t[n],r=e[n];if(i>r)return!1;if(i<r)return!0}}const z3=typeof Uint8Array.prototype.slice=="function";let V3,Mt=0,Ut=0;function Jf(t){const e=t>>>0;Mt=e,Ut=(t-e)/4294967296>>>0}function ms(t){if(t<0){Jf(-t);const[e,n]=Vu(Mt,Ut);Mt=e>>>0,Ut=n>>>0}else Jf(t)}function ku(t){const e=V3||(V3=new DataView(new ArrayBuffer(8)));e.setFloat32(0,+t,!0),Ut=0,Mt=e.getUint32(0,!0)}function Kp(t,e){const n=4294967296*e+(t>>>0);return Number.isSafeInteger(n)?n:ua(t,e)}function G3(t,e){return wn(ws()?BigInt.asUintN(64,(BigInt(e>>>0)<<BigInt(32))+BigInt(t>>>0)):ua(t,e))}function Zp(t,e){return ws()?wn(BigInt.asIntN(64,(BigInt.asUintN(32,BigInt(e))<<BigInt(32))+BigInt.asUintN(32,BigInt(t)))):wn(zu(t,e))}function ua(t,e){if(t>>>=0,(e>>>=0)<=2097151)var n=""+(4294967296*e+t);else ws()?n=""+(BigInt(e)<<BigInt(32)|BigInt(t)):(t=(16777215&t)+6777216*(n=16777215&(t>>>24|e<<8))+6710656*(e=e>>16&65535),n+=8147497*e,e*=2,t>=1e7&&(n+=t/1e7>>>0,t%=1e7),n>=1e7&&(e+=n/1e7>>>0,n%=1e7),n=e+Qf(n)+Qf(t));return n}function Qf(t){return t=String(t),"0000000".slice(t.length)+t}function zu(t,e){if(2147483648&e)if(ws())t=""+(BigInt(0|e)<<BigInt(32)|BigInt(t>>>0));else{const[n,i]=Vu(t,e);t="-"+ua(n,i)}else t=ua(t,e);return t}function zo(t){if(t.length<16)ms(Number(t));else if(ws())t=BigInt(t),Mt=Number(t&BigInt(4294967295))>>>0,Ut=Number(t>>BigInt(32)&BigInt(4294967295));else{const e=+(t[0]==="-");Ut=Mt=0;const n=t.length;for(let i=e,r=(n-e)%6+e;r<=n;i=r,r+=6){const s=Number(t.slice(i,r));Ut*=1e6,Mt=1e6*Mt+s,Mt>=4294967296&&(Ut+=Math.trunc(Mt/4294967296),Ut>>>=0,Mt>>>=0)}if(e){const[i,r]=Vu(Mt,Ut);Mt=i,Ut=r}}}function Vu(t,e){return e=~e,t?t=1+~t:e+=1,[t,e]}function $n(t){return Array.prototype.slice.call(t)}const xa=typeof BigInt=="function"?BigInt.asIntN:void 0,H3=typeof BigInt=="function"?BigInt.asUintN:void 0,Pr=Number.isSafeInteger,Vo=Number.isFinite,gs=Math.trunc,W3=wn(0);function Js(t){if(t!=null&&typeof t!="number")throw Error(`Value of float/double field must be a number, found ${typeof t}: ${t}`);return t}function ai(t){return t==null||typeof t=="number"?t:t==="NaN"||t==="Infinity"||t==="-Infinity"?Number(t):void 0}function ha(t){if(t!=null&&typeof t!="boolean"){var e=typeof t;throw Error(`Expected boolean but got ${e!="object"?e:t?Array.isArray(t)?"array":e:"null"}: ${t}`)}return t}function Jp(t){return t==null||typeof t=="boolean"?t:typeof t=="number"?!!t:void 0}const X3=/^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;function Ma(t){switch(typeof t){case"bigint":return!0;case"number":return Vo(t);case"string":return X3.test(t);default:return!1}}function Ps(t){if(t==null)return t;if(typeof t=="string"&&t)t=+t;else if(typeof t!="number")return;return Vo(t)?0|t:void 0}function Qp(t){if(t==null)return t;if(typeof t=="string"&&t)t=+t;else if(typeof t!="number")return;return Vo(t)?t>>>0:void 0}function em(t){const e=t.length;return(t[0]==="-"?e<20||e===20&&t<="-9223372036854775808":e<19||e===19&&t<="9223372036854775807")?t:(zo(t),zu(Mt,Ut))}function Gu(t){if(t=gs(t),!Pr(t)){ms(t);var e=Mt,n=Ut;(t=2147483648&n)&&(n=~n>>>0,(e=1+~e>>>0)==0&&(n=n+1>>>0)),t=typeof(e=Kp(e,n))=="number"?t?-e:e:t?"-"+e:e}return t}function tm(t){var e=gs(Number(t));return Pr(e)?String(e):((e=t.indexOf("."))!==-1&&(t=t.substring(0,e)),em(t))}function nm(t){var e=gs(Number(t));return Pr(e)?wn(e):((e=t.indexOf("."))!==-1&&(t=t.substring(0,e)),ws()?wn(xa(64,BigInt(t))):wn(em(t)))}function im(t){return Pr(t)?t=wn(Gu(t)):(t=gs(t),Pr(t)?t=String(t):(ms(t),t=zu(Mt,Ut)),t=wn(t)),t}function xo(t){const e=typeof t;return t==null?t:e==="bigint"?wn(xa(64,t)):Ma(t)?e==="string"?nm(t):im(t):void 0}function rm(t){if(typeof t!="string")throw Error();return t}function Sa(t){if(t!=null&&typeof t!="string")throw Error();return t}function Zt(t){return t==null||typeof t=="string"?t:void 0}function Hu(t,e,n,i){return t!=null&&t[ds]===ps?t:Array.isArray(t)?((i=(n=0|t[be])|32&i|2&i)!==n&&Gt(t,i),new e(t)):(n?2&i?((t=e[qf])||(va((t=new e).v),t=e[qf]=t),e=t):e=new e:e=void 0,e)}function q3(t,e,n){if(e)e:{if(!Ma(e=t))throw eu("int64");switch(typeof e){case"string":e=nm(e);break e;case"bigint":e=wn(xa(64,e));break e;default:e=im(e)}}else e=xo(t);return(t=e)==null?n?W3:void 0:t}const Y3={};let $3=function(){try{return Oo(new class extends Map{constructor(){super()}}),!1}catch{return!0}}();class Xc{constructor(){this.g=new Map}get(e){return this.g.get(e)}set(e,n){return this.g.set(e,n),this.size=this.g.size,this}delete(e){return e=this.g.delete(e),this.size=this.g.size,e}clear(){this.g.clear(),this.size=this.g.size}has(e){return this.g.has(e)}entries(){return this.g.entries()}keys(){return this.g.keys()}values(){return this.g.values()}forEach(e,n){return this.g.forEach(e,n)}[Symbol.iterator](){return this.entries()}}const j3=$3?(Object.setPrototypeOf(Xc.prototype,Map.prototype),Object.defineProperties(Xc.prototype,{size:{value:0,configurable:!0,enumerable:!0,writable:!0}}),Xc):class extends Map{constructor(){super()}};function ed(t){return t}function qc(t){if(2&t.J)throw Error("Cannot mutate an immutable Map")}var Ni=class extends j3{constructor(t,e,n=ed,i=ed){super(),this.J=0|t[be],this.K=e,this.S=n,this.fa=this.K?K3:i;for(let r=0;r<t.length;r++){const s=t[r],a=n(s[0],!1,!0);let o=s[1];e?o===void 0&&(o=null):o=i(s[1],!1,!0,void 0,void 0,this.J),super.set(a,o)}}V(t){return la(Array.from(super.entries(),t))}clear(){qc(this),super.clear()}delete(t){return qc(this),super.delete(this.S(t,!0,!1))}entries(){if(this.K){var t=super.keys();t=new jf(t,Z3,this)}else t=super.entries();return t}values(){if(this.K){var t=super.keys();t=new jf(t,Ni.prototype.get,this)}else t=super.values();return t}forEach(t,e){this.K?super.forEach((n,i,r)=>{t.call(e,r.get(i),i,r)}):super.forEach(t,e)}set(t,e){return qc(this),(t=this.S(t,!0,!1))==null?this:e==null?(super.delete(t),this):super.set(t,this.fa(e,!0,!0,this.K,!1,this.J))}Ma(t){const e=this.S(t[0],!1,!0);t=t[1],t=this.K?t===void 0?null:t:this.fa(t,!1,!0,void 0,!1,this.J),super.set(e,t)}has(t){return super.has(this.S(t,!1,!1))}get(t){t=this.S(t,!1,!1);const e=super.get(t);if(e!==void 0){var n=this.K;return n?((n=this.fa(e,!1,!0,n,this.ra,this.J))!==e&&super.set(t,n),n):e}}[Symbol.iterator](){return this.entries()}};function K3(t,e,n,i,r,s){return t=Hu(t,i,n,s),r&&(t=Xu(t)),t}function Z3(t){return[t,this.get(t)]}let J3;function td(){return J3||(J3=new Ni(va([]),void 0,void 0,void 0,Y3))}function Go(t){return An?t[An]:void 0}function Mo(t,e){for(const n in t)!isNaN(n)&&e(t,+n,t[n])}Ni.prototype.toJSON=void 0;var iu=class{};const Q3={Ka:!0};function eM(t,e){e<100||fs(L3,1)}function Ho(t,e,n,i){const r=i!==void 0;i=!!i;var s,a=An;!r&&Rs&&a&&(s=t[a])&&Mo(s,eM),a=[];var o=t.length;let c;s=4294967295;let l=!1;const h=!!(64&e),f=h?128&e?0:-1:void 0;1&e||(c=o&&t[o-1],c!=null&&typeof c=="object"&&c.constructor===Object?s=--o:c=void 0,!h||128&e||r||(l=!0,s=s-f+f)),e=void 0;for(var u=0;u<o;u++){let m=t[u];if(m!=null&&(m=n(m,i))!=null)if(h&&u>=s){const _=u-f;(e??(e={}))[_]=m}else a[u]=m}if(c)for(let m in c){if((o=c[m])==null||(o=n(o,i))==null)continue;let _;u=+m,h&&!Number.isNaN(u)&&(_=u+f)<s?a[_]=o:(e??(e={}))[m]=o}return e&&(l?a.push(e):a[s]=e),r&&An&&(t=Go(t))&&t instanceof iu&&(a[An]=function(m){const _=new iu;return Mo(m,(S,p,d)=>{_[p]=$n(d)}),_.da=m.da,_}(t)),a}function tM(t){return t[0]=fa(t[0]),t[1]=fa(t[1]),t}function fa(t){switch(typeof t){case"number":return Number.isFinite(t)?t:""+t;case"bigint":return nu(t)?Number(t):""+t;case"boolean":return t?1:0;case"object":if(Array.isArray(t)){var e=0|t[be];return t.length===0&&1&e?void 0:Ho(t,e,fa)}if(t!=null&&t[ds]===ps)return sm(t);if(t instanceof li){if((e=t.g)==null)t="";else if(typeof e=="string")t=e;else{if(Gp){for(var n="",i=0,r=e.length-10240;i<r;)n+=String.fromCharCode.apply(null,e.subarray(i,i+=10240));n+=String.fromCharCode.apply(null,i?e.subarray(i):e),e=btoa(n)}else{n===void 0&&(n=0),Vp(),n=zp[n],i=Array(Math.floor(e.length/3)),r=n[64]||"";let l=0,h=0;for(;l<e.length-2;l+=3){var s=e[l],a=e[l+1],o=e[l+2],c=n[s>>2];s=n[(3&s)<<4|a>>4],a=n[(15&a)<<2|o>>6],o=n[63&o],i[h++]=c+s+a+o}switch(c=0,o=r,e.length-l){case 2:o=n[(15&(c=e[l+1]))<<2]||r;case 1:e=e[l],i[h]=n[e>>2]+n[(3&e)<<4|c>>4]+o+r}e=i.join("")}t=t.g=e}return t}return t instanceof Ni?t=t.size!==0?t.V(tM):void 0:void 0}return t}let nM,iM;function sm(t){return Ho(t=t.v,0|t[be],fa)}function Er(t,e){return am(t,e[0],e[1])}function am(t,e,n,i=0){if(t==null){var r=32;n?(t=[n],r|=128):t=[],e&&(r=-16760833&r|(1023&e)<<14)}else{if(!Array.isArray(t))throw Error("narr");if(r=0|t[be],Gf&&1&r)throw Error("rfarr");if(2048&r&&!(2&r)&&function(){if(Gf)throw Error("carr");fs(I3,5)}(),256&r)throw Error("farr");if(64&r)return(r|i)!==r&&Gt(t,r|i),t;if(n&&(r|=128,n!==t[0]))throw Error("mid");e:{r|=64;var s=(n=t).length;if(s){var a=s-1;const c=n[a];if(c!=null&&typeof c=="object"&&c.constructor===Object){if((a-=e=128&r?0:-1)>=1024)throw Error("pvtlmt");for(var o in c)(s=+o)<a&&(n[s+e]=c[o],delete c[o]);r=-16760833&r|(1023&a)<<14;break e}}if(e){if((o=Math.max(e,s-(128&r?0:-1)))>1024)throw Error("spvt");r=-16760833&r|(1023&o)<<14}}}return Gt(t,64|r|i),t}function rM(t,e){if(typeof t!="object")return t;if(Array.isArray(t)){var n=0|t[be];return t.length===0&&1&n?void 0:nd(t,n,e)}if(t!=null&&t[ds]===ps)return id(t);if(t instanceof Ni){if(2&(e=t.J))return t;if(!t.size)return;if(n=va(t.V()),t.K)for(t=0;t<n.length;t++){const i=n[t];let r=i[1];r=r==null||typeof r!="object"?void 0:r!=null&&r[ds]===ps?id(r):Array.isArray(r)?nd(r,0|r[be],!!(32&e)):void 0,i[1]=r}return n}return t instanceof li?t:void 0}function nd(t,e,n){return 2&e||(!n||4096&e||16&e?t=Ls(t,e,!1,n&&!(16&e)):(_a(t,34),4&e&&Object.freeze(t))),t}function Wu(t,e,n){return t=new t.constructor(e),n&&(t.h=Cr),t.m=Cr,t}function id(t){const e=t.v,n=0|e[be];return Rn(t,n)?t:qu(t,e,n)?Wu(t,e):Ls(e,n)}function Ls(t,e,n,i){return i??(i=!!(34&e)),t=Ho(t,e,rM,i),i=32,n&&(i|=2),Gt(t,e=16769217&e|i),t}function Xu(t){const e=t.v,n=0|e[be];return Rn(t,n)?qu(t,e,n)?Wu(t,e,!0):new t.constructor(Ls(e,n,!1)):t}function Is(t){if(t.h!==Cr)return!1;var e=t.v;return _a(e=Ls(e,0|e[be]),2048),t.v=e,t.h=void 0,t.m=void 0,!0}function Ds(t){if(!Is(t)&&Rn(t,0|t.v[be]))throw Error()}function Ir(t,e){e===void 0&&(e=0|t[be]),32&e&&!(4096&e)&&Gt(t,4096|e)}function qu(t,e,n){return!!(2&n)||!(!(32&n)||4096&n)&&(Gt(e,2|n),t.h=Cr,!0)}const om=wn(0),$i={};function St(t,e,n,i,r){if((e=Fi(t.v,e,n,r))!==null||i&&t.m!==Cr)return e}function Fi(t,e,n,i){if(e===-1)return null;const r=e+(n?0:-1),s=t.length-1;let a,o;if(!(s<1+(n?0:-1))){if(r>=s)if(a=t[s],a!=null&&typeof a=="object"&&a.constructor===Object)n=a[e],o=!0;else{if(r!==s)return;n=a}else n=t[r];if(i&&n!=null){if((i=i(n))==null)return i;if(!Object.is(i,n))return o?a[e]=i:t[r]=i,i}return n}}function ct(t,e,n,i){Ds(t),Bt(t=t.v,0|t[be],e,n,i)}function Bt(t,e,n,i,r){const s=n+(r?0:-1);var a=t.length-1;if(a>=1+(r?0:-1)&&s>=a){const o=t[a];if(o!=null&&typeof o=="object"&&o.constructor===Object)return o[n]=i,e}return s<=a?(t[s]=i,e):(i!==void 0&&(n>=(a=(e??(e=0|t[be]))>>14&1023||536870912)?i!=null&&(t[a+(r?0:-1)]={[n]:i}):t[s]=i),e)}function Mr(){return D3===void 0?2:4}function Sr(t,e,n,i,r){let s=t.v,a=0|s[be];i=Rn(t,a)?1:i,r=!!r||i===3,i===2&&Is(t)&&(s=t.v,a=0|s[be]);let o=(t=Yu(s,e))===Lr?7:0|t[be],c=$u(o,a);var l=!(4&c);if(l){4&c&&(t=$n(t),o=0,c=br(c,a),a=Bt(s,a,e,t));let h=0,f=0;for(;h<t.length;h++){const u=n(t[h]);u!=null&&(t[f++]=u)}f<h&&(t.length=f),n=-513&(4|c),c=n&=-1025,c&=-4097}return c!==o&&(Gt(t,c),2&c&&Object.freeze(t)),cm(t,c,s,a,e,i,l,r)}function cm(t,e,n,i,r,s,a,o){let c=e;return s===1||s===4&&(2&e||!(16&e)&&32&i)?yr(e)||((e|=!t.length||a&&!(4096&e)||32&i&&!(4096&e||16&e)?2:256)!==c&&Gt(t,e),Object.freeze(t)):(s===2&&yr(e)&&(t=$n(t),c=0,e=br(e,i),i=Bt(n,i,r,t)),yr(e)||(o||(e|=16),e!==c&&Gt(t,e))),2&e||!(4096&e||16&e)||Ir(n,i),t}function Yu(t,e,n){return t=Fi(t,e,n),Array.isArray(t)?t:Lr}function $u(t,e){return 2&e&&(t|=2),1|t}function yr(t){return!!(2&t)&&!!(4&t)||!!(256&t)}function lm(t){return Bu(t,!0)}function um(t){t=$n(t);for(let e=0;e<t.length;e++){const n=t[e]=$n(t[e]);Array.isArray(n[1])&&(n[1]=va(n[1]))}return la(t)}function Ki(t,e,n,i){Ds(t),Bt(t=t.v,0|t[be],e,(i==="0"?Number(n)===0:n===i)?void 0:n)}function Us(t,e,n){if(2&e)throw Error();const i=Cs(e);let r=Yu(t,n,i),s=r===Lr?7:0|r[be],a=$u(s,e);return(2&a||yr(a)||16&a)&&(a===s||yr(a)||Gt(r,a),r=$n(r),s=0,a=br(a,e),Bt(t,e,n,r,i)),a&=-13,a!==s&&Gt(r,a),r}function Yc(t,e){var n=t0;return Ku(ju(t=t.v),t,void 0,n)===e?e:-1}function ju(t){if(Rs)return t[Ys]??(t[Ys]=new Map);if(Ys in t)return t[Ys];const e=new Map;return Object.defineProperty(t,Ys,{value:e}),e}function hm(t,e,n,i,r){const s=ju(t),a=Ku(s,t,e,n,r);return a!==i&&(a&&(e=Bt(t,e,a,void 0,r)),s.set(n,i)),e}function Ku(t,e,n,i,r){let s=t.get(i);if(s!=null)return s;s=0;for(let a=0;a<i.length;a++){const o=i[a];Fi(e,o,r)!=null&&(s!==0&&(n=Bt(e,n,s,void 0,r)),s=o)}return t.set(i,s),s}function Zu(t,e,n){let i=0|t[be];const r=Cs(i),s=Fi(t,n,r);let a;if(s!=null&&s[ds]===ps){if(!Rn(s))return Is(s),s.v;a=s.v}else Array.isArray(s)&&(a=s);if(a){const o=0|a[be];2&o&&(a=Ls(a,o))}return a=Er(a,e),a!==s&&Bt(t,i,n,a,r),a}function fm(t,e,n,i,r){let s=!1;if((i=Fi(t,i,r,a=>{const o=Hu(a,n,!1,e);return s=o!==a&&o!=null,o}))!=null)return s&&!Rn(i)&&Ir(t,e),i}function et(t,e,n,i){let r=t.v,s=0|r[be];if((e=fm(r,s,e,n,i))==null)return e;if(s=0|r[be],!Rn(t,s)){const a=Xu(e);a!==e&&(Is(t)&&(r=t.v,s=0|r[be]),s=Bt(r,s,n,e=a,i),Ir(r,s))}return e}function dm(t,e,n,i,r,s,a,o){var c=Rn(t,n);s=c?1:s,a=!!a||s===3,c=o&&!c,(s===2||c)&&Is(t)&&(n=0|(e=t.v)[be]);var l=(t=Yu(e,r))===Lr?7:0|t[be],h=$u(l,n);if(o=!(4&h)){var f=t,u=n;const m=!!(2&h);m&&(u|=2);let _=!m,S=!0,p=0,d=0;for(;p<f.length;p++){const M=Hu(f[p],i,!1,u);if(M instanceof i){if(!m){const b=Rn(M);_&&(_=!b),S&&(S=b)}f[d++]=M}}d<p&&(f.length=d),h|=4,h=S?-4097&h:4096|h,h=_?8|h:-9&h}if(h!==l&&(Gt(t,h),2&h&&Object.freeze(t)),c&&!(8&h||!t.length&&(s===1||s===4&&(2&h||!(16&h)&&32&n)))){for(yr(h)&&(t=$n(t),h=br(h,n),n=Bt(e,n,r,t)),i=t,c=h,l=0;l<i.length;l++)(f=i[l])!==(h=Xu(f))&&(i[l]=h);c|=8,Gt(t,h=c=i.length?4096|c:-4097&c)}return cm(t,h,e,n,r,s,o,a)}function Oi(t,e,n){const i=t.v;return dm(t,i,0|i[be],e,n,Mr(),!1,!0)}function pm(t){return t==null&&(t=void 0),t}function Le(t,e,n,i,r){return ct(t,n,i=pm(i),r),i&&!Rn(i)&&Ir(t.v),t}function Qs(t,e,n,i){e:{var r=i=pm(i);Ds(t);const s=t.v;let a=0|s[be];if(r==null){const o=ju(s);if(Ku(o,s,a,n)!==e)break e;o.set(n,0)}else a=hm(s,a,n,e);Bt(s,a,e,r)}i&&!Rn(i)&&Ir(t.v)}function br(t,e){return-273&(2&e?2|t:-3&t)}function Ju(t,e,n,i){var r=i;Ds(t),t=dm(t,i=t.v,0|i[be],n,e,2,!0),r=r??new n,t.push(r),e=n=t===Lr?7:0|t[be],(r=Rn(r))?(n&=-9,t.length===1&&(n&=-4097)):n|=4096,n!==e&&Gt(t,n),r||Ir(i)}function Bn(t,e,n){return Ps(St(t,e,void 0,n))}function Lt(t,e){return St(t,e,void 0,void 0,ai)??0}function Bi(t,e,n){if(n!=null){if(typeof n!="number"||!Vo(n))throw eu("int32");n|=0}ct(t,e,n)}function Ce(t,e,n){ct(t,e,Js(n))}function Cn(t,e,n){Ki(t,e,Sa(n),"")}function So(t,e,n){{Ds(t);const a=t.v;let o=0|a[be];if(n==null)Bt(a,o,e);else{var i=t=n===Lr?7:0|n[be],r=yr(t),s=r||Object.isFrozen(n);for(r||(t=0),s||(n=$n(n),i=0,t=br(t,o),s=!1),t|=5,t|=(4&t?512&t?512:1024&t?1024:0:void 0)??1024,r=0;r<n.length;r++){const c=n[r],l=rm(c);Object.is(c,l)||(s&&(n=$n(n),i=0,t=br(t,o),s=!1),n[r]=l)}t!==i&&(s&&(n=$n(n),t=br(t,o)),Gt(n,t)),Bt(a,o,e,n)}}}function Wo(t,e,n){Ds(t),Sr(t,e,Zt,2,!0).push(rm(n))}var Kr=class{constructor(t,e,n){if(this.buffer=t,n&&!e)throw Error();this.g=e}};function Qu(t,e){if(typeof t=="string")return new Kr(Hp(t),e);if(Array.isArray(t))return new Kr(new Uint8Array(t),e);if(t.constructor===Uint8Array)return new Kr(t,!1);if(t.constructor===ArrayBuffer)return t=new Uint8Array(t),new Kr(t,!1);if(t.constructor===li)return e=Ou(t)||new Uint8Array(0),new Kr(e,!0,t);if(t instanceof Uint8Array)return t=t.constructor===Uint8Array?t:new Uint8Array(t.buffer,t.byteOffset,t.byteLength),new Kr(t,!1);throw Error()}function eh(t,e){let n,i=0,r=0,s=0;const a=t.h;let o=t.g;do n=a[o++],i|=(127&n)<<s,s+=7;while(s<32&&128&n);if(s>32)for(r|=(127&n)>>4,s=3;s<32&&128&n;s+=7)n=a[o++],r|=(127&n)<<s;if(Tr(t,o),!(128&n))return e(i>>>0,r>>>0);throw Error()}function th(t){let e=0,n=t.g;const i=n+10,r=t.h;for(;n<i;){const s=r[n++];if(e|=s,(128&s)==0)return Tr(t,n),!!(127&e)}throw Error()}function nr(t){const e=t.h;let n=t.g,i=e[n++],r=127&i;if(128&i&&(i=e[n++],r|=(127&i)<<7,128&i&&(i=e[n++],r|=(127&i)<<14,128&i&&(i=e[n++],r|=(127&i)<<21,128&i&&(i=e[n++],r|=i<<28,128&i&&128&e[n++]&&128&e[n++]&&128&e[n++]&&128&e[n++]&&128&e[n++])))))throw Error();return Tr(t,n),r}function di(t){return nr(t)>>>0}function Eo(t){var e=t.h;const n=t.g;var i=e[n],r=e[n+1];const s=e[n+2];return e=e[n+3],Tr(t,t.g+4),t=2*((r=(i<<0|r<<8|s<<16|e<<24)>>>0)>>31)+1,i=r>>>23&255,r&=8388607,i==255?r?NaN:t*(1/0):i==0?1401298464324817e-60*t*r:t*Math.pow(2,i-150)*(r+8388608)}function sM(t){return nr(t)}function Tr(t,e){if(t.g=e,e>t.l)throw Error()}function mm(t,e){if(e<0)throw Error();const n=t.g;if((e=n+e)>t.l)throw Error();return t.g=e,n}function gm(t,e){if(e==0)return Rr();var n=mm(t,e);return t.Y&&t.j?n=t.h.subarray(n,n+e):(t=t.h,n=n===(e=n+e)?new Uint8Array(0):z3?t.slice(n,e):new Uint8Array(t.subarray(n,e))),n.length==0?Rr():new li(n,hs)}var rd=[];function _m(t,e,n,i){if(yo.length){const r=yo.pop();return r.o(i),r.g.init(t,e,n,i),r}return new aM(t,e,n,i)}function vm(t){t.g.clear(),t.l=-1,t.h=-1,yo.length<100&&yo.push(t)}function xm(t){var e=t.g;if(e.g==e.l)return!1;t.m=t.g.g;var n=di(t.g);if(e=n>>>3,!((n&=7)>=0&&n<=5)||e<1)throw Error();return t.l=e,t.h=n,!0}function ho(t){switch(t.h){case 0:t.h!=0?ho(t):th(t.g);break;case 1:Tr(t=t.g,t.g+8);break;case 2:if(t.h!=2)ho(t);else{var e=di(t.g);Tr(t=t.g,t.g+e)}break;case 5:Tr(t=t.g,t.g+4);break;case 3:for(e=t.l;;){if(!xm(t))throw Error();if(t.h==4){if(t.l!=e)throw Error();break}ho(t)}break;default:throw Error()}}function Ea(t,e,n){const i=t.g.l;var r=di(t.g);let s=(r=t.g.g+r)-i;if(s<=0&&(t.g.l=r,n(e,t,void 0,void 0,void 0),s=r-t.g.g),s)throw Error();return t.g.g=r,t.g.l=i,e}function nh(t){var e=di(t.g),n=mm(t=t.g,e);if(t=t.h,x3){var i,r=t;(i=Wc)||(i=Wc=new TextDecoder("utf-8",{fatal:!0})),e=n+e,r=n===0&&e===r.length?r:r.subarray(n,e);try{var s=i.decode(r)}catch(o){if(Ja===void 0){try{i.decode(new Uint8Array([128]))}catch{}try{i.decode(new Uint8Array([97])),Ja=!0}catch{Ja=!1}}throw!Ja&&(Wc=void 0),o}}else{e=(s=n)+e,n=[];let o,c=null;for(;s<e;){var a=t[s++];a<128?n.push(a):a<224?s>=e?dr():(o=t[s++],a<194||(192&o)!=128?(s--,dr()):n.push((31&a)<<6|63&o)):a<240?s>=e-1?dr():(o=t[s++],(192&o)!=128||a===224&&o<160||a===237&&o>=160||(192&(i=t[s++]))!=128?(s--,dr()):n.push((15&a)<<12|(63&o)<<6|63&i)):a<=244?s>=e-2?dr():(o=t[s++],(192&o)!=128||o-144+(a<<28)>>30||(192&(i=t[s++]))!=128||(192&(r=t[s++]))!=128?(s--,dr()):(a=(7&a)<<18|(63&o)<<12|(63&i)<<6|63&r,a-=65536,n.push(55296+(a>>10&1023),56320+(1023&a)))):dr(),n.length>=8192&&(c=Vf(c,n),n.length=0)}s=Vf(c,n)}return s}function Mm(t){const e=di(t.g);return gm(t.g,e)}function Xo(t,e,n){var i=di(t.g);for(i=t.g.g+i;t.g.g<i;)n.push(e(t.g))}var aM=class{constructor(t,e,n,i){if(rd.length){const r=rd.pop();r.init(t,e,n,i),t=r}else t=new class{constructor(r,s,a,o){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.init(r,s,a,o)}init(r,s,a,{Y:o=!1,ea:c=!1}={}){this.Y=o,this.ea=c,r&&(r=Qu(r,this.ea),this.h=r.buffer,this.j=r.g,this.m=s||0,this.l=a!==void 0?this.m+a:this.h.length,this.g=this.m)}clear(){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.Y=!1}}(t,e,n,i);this.g=t,this.m=this.g.g,this.h=this.l=-1,this.o(i)}o({ha:t=!1}={}){this.ha=t}},yo=[];function sd(t){return t?/^\d+$/.test(t)?(zo(t),new ru(Mt,Ut)):null:oM||(oM=new ru(0,0))}var ru=class{constructor(t,e){this.h=t>>>0,this.g=e>>>0}};let oM;function ad(t){return t?/^-?\d+$/.test(t)?(zo(t),new su(Mt,Ut)):null:cM||(cM=new su(0,0))}var su=class{constructor(t,e){this.h=t>>>0,this.g=e>>>0}};let cM;function ns(t,e,n){for(;n>0||e>127;)t.g.push(127&e|128),e=(e>>>7|n<<25)>>>0,n>>>=7;t.g.push(e)}function Ns(t,e){for(;e>127;)t.g.push(127&e|128),e>>>=7;t.g.push(e)}function qo(t,e){if(e>=0)Ns(t,e);else{for(let n=0;n<9;n++)t.g.push(127&e|128),e>>=7;t.g.push(1)}}function ih(t){var e=Mt;t.g.push(e>>>0&255),t.g.push(e>>>8&255),t.g.push(e>>>16&255),t.g.push(e>>>24&255)}function _s(t,e){e.length!==0&&(t.l.push(e),t.h+=e.length)}function zn(t,e,n){Ns(t.g,8*e+n)}function rh(t,e){return zn(t,e,2),e=t.g.end(),_s(t,e),e.push(t.h),e}function sh(t,e){var n=e.pop();for(n=t.h+t.g.length()-n;n>127;)e.push(127&n|128),n>>>=7,t.h++;e.push(n),t.h++}function Yo(t,e,n){zn(t,e,2),Ns(t.g,n.length),_s(t,t.g.end()),_s(t,n)}function bo(t,e,n,i){n!=null&&(e=rh(t,e),i(n,t),sh(t,e))}function mi(){const t=class{constructor(){throw Error()}};return Object.setPrototypeOf(t,t.prototype),t}var ah=mi(),Sm=mi(),oh=mi(),ch=mi(),lh=mi(),Em=mi(),lM=mi(),$o=mi(),ym=mi(),bm=mi();function gi(t,e,n){var i=t.v;An&&An in i&&(i=i[An])&&delete i[e.g],e.h?e.j(t,e.h,e.g,n,e.l):e.j(t,e.g,n,e.l)}var Te=class{constructor(t,e){this.v=am(t,e,void 0,2048)}toJSON(){return sm(this)}j(){var r;var t=WM,e=this.v,n=t.g,i=An;if(Rs&&i&&((r=e[i])==null?void 0:r[n])!=null&&fs(P3,3),e=t.g,Yf&&An&&Yf===void 0&&(i=(n=this.v)[An])&&(i=i.da))try{i(n,e,Q3)}catch(s){kp(s)}return t.h?t.m(this,t.h,t.g,t.l):t.m(this,t.g,t.defaultValue,t.l)}clone(){const t=this.v,e=0|t[be];return qu(this,t,e)?Wu(this,t,!0):new this.constructor(Ls(t,e,!1))}};Te.prototype[ds]=ps,Te.prototype.toString=function(){return this.v.toString()};var Fs=class{constructor(t,e,n){this.g=t,this.h=e,t=ah,this.l=!!t&&n===t||!1}};function jo(t,e){return new Fs(t,e,ah)}function Tm(t,e,n,i,r){bo(t,n,Cm(e,i),r)}const uM=jo(function(t,e,n,i,r){return t.h===2&&(Ea(t,Zu(e,i,n),r),!0)},Tm),hM=jo(function(t,e,n,i,r){return t.h===2&&(Ea(t,Zu(e,i,n),r),!0)},Tm);var Ko=Symbol(),Zo=Symbol(),au=Symbol(),od=Symbol(),cd=Symbol();let Am,wm;function Dr(t,e,n,i){var r=i[t];if(r)return r;(r={}).qa=i,r.T=function(f){switch(typeof f){case"boolean":return nM||(nM=[0,void 0,!0]);case"number":return f>0?void 0:f===0?iM||(iM=[0,void 0]):[-f,void 0];case"string":return[0,f];case"object":return f}}(i[0]);var s=i[1];let a=1;s&&s.constructor===Object&&(r.ba=s,typeof(s=i[++a])=="function"&&(r.ma=!0,Am??(Am=s),wm??(wm=i[a+1]),s=i[a+=2]));const o={};for(;s&&Array.isArray(s)&&s.length&&typeof s[0]=="number"&&s[0]>0;){for(var c=0;c<s.length;c++)o[s[c]]=s;s=i[++a]}for(c=1;s!==void 0;){let f;typeof s=="number"&&(c+=s,s=i[++a]);var l=void 0;if(s instanceof Fs?f=s:(f=uM,a--),f==null?void 0:f.l){s=i[++a],l=i;var h=a;typeof s=="function"&&(s=s(),l[h]=s),l=s}for(h=c+1,typeof(s=i[++a])=="number"&&s<0&&(h-=s,s=i[++a]);c<h;c++){const u=o[c];l?n(r,c,f,l,u):e(r,c,f,u)}}return i[t]=r}function Rm(t){return Array.isArray(t)?t[0]instanceof Fs?t:[hM,t]:[t,void 0]}function Cm(t,e){return t instanceof Te?t.v:Array.isArray(t)?Er(t,e):void 0}function uh(t,e,n,i){const r=n.g;t[e]=i?(s,a,o)=>r(s,a,o,i):r}function hh(t,e,n,i,r){const s=n.g;let a,o;t[e]=(c,l,h)=>s(c,l,h,o||(o=Dr(Zo,uh,hh,i).T),a||(a=fh(i)),r)}function fh(t){let e=t[au];if(e!=null)return e;const n=Dr(Zo,uh,hh,t);return e=n.ma?(i,r)=>Am(i,r,n):(i,r)=>{for(;xm(r)&&r.h!=4;){var s=r.l,a=n[s];if(a==null){var o=n.ba;o&&(o=o[s])&&(o=dM(o))!=null&&(a=n[s]=o)}if(a==null||!a(r,i,s)){if(a=(o=r).m,ho(o),o.ha)var c=void 0;else c=o.g.g-a,o.g.g=a,c=gm(o.g,c);a=void 0,o=i,c&&((a=o[An]??(o[An]=new iu))[s]??(a[s]=[])).push(c)}}return(i=Go(i))&&(i.da=n.qa[cd]),!0},t[au]=e,t[cd]=fM.bind(t),e}function fM(t,e,n,i){var r=this[Zo];const s=this[au],a=Er(void 0,r.T),o=Go(t);if(o){var c=!1,l=r.ba;if(l){if(r=(h,f,u)=>{if(u.length!==0)if(l[f])for(const m of u){h=_m(m);try{c=!0,s(a,h)}finally{vm(h)}}else i==null||i(t,f,u)},e==null)Mo(o,r);else if(o!=null){const h=o[e];h&&r(o,e,h)}if(c){let h=0|t[be];if(2&h&&2048&h&&!(n!=null&&n.Ka))throw Error();const f=Cs(h),u=(m,_)=>{if(Fi(t,m,f)!=null){if((n==null?void 0:n.Qa)===1)return;throw Error()}_!=null&&(h=Bt(t,h,m,_,f)),delete o[m]};e==null?$p(a,0|a[be],(m,_)=>{u(m,_)}):u(e,Fi(a,e,f))}}}}function dM(t){const e=(t=Rm(t))[0].g;if(t=t[1]){const n=fh(t),i=Dr(Zo,uh,hh,t).T;return(r,s,a)=>e(r,s,a,i,n)}return e}function Jo(t,e,n){t[e]=n.h}function Qo(t,e,n,i){let r,s;const a=n.h;t[e]=(o,c,l)=>a(o,c,l,s||(s=Dr(Ko,Jo,Qo,i).T),r||(r=Pm(i)))}function Pm(t){let e=t[od];if(!e){const n=Dr(Ko,Jo,Qo,t);e=(i,r)=>Lm(i,r,n),t[od]=e}return e}function Lm(t,e,n){$p(t,0|t[be],(i,r)=>{if(r!=null){var s=function(a,o){var c=a[o];if(c)return c;if((c=a.ba)&&(c=c[o])){var l=(c=Rm(c))[0].h;if(c=c[1]){const h=Pm(c),f=Dr(Ko,Jo,Qo,c).T;c=a.ma?wm(f,h):(u,m,_)=>l(u,m,_,f,h)}else c=l;return a[o]=c}}(n,i);s?s(e,r,i):i<500||fs(tu,3)}}),(t=Go(t))&&Mo(t,(i,r,s)=>{for(_s(e,e.g.end()),i=0;i<s.length;i++)_s(e,Ou(s[i])||new Uint8Array(0))})}const pM=wn(0);function Os(t,e){if(Array.isArray(e)){var n=0|e[be];if(4&n)return e;for(var i=0,r=0;i<e.length;i++){const s=t(e[i]);s!=null&&(e[r++]=s)}return r<i&&(e.length=r),(t=-1537&(5|n))!==n&&Gt(e,t),2&t&&Object.freeze(e),e}}function sn(t,e,n){return new Fs(t,e,n)}function Bs(t,e,n){return new Fs(t,e,n)}function an(t,e,n){Bt(t,0|t[be],e,n,Cs(0|t[be]))}var mM=jo(function(t,e,n,i,r){if(t.h!==2)return!1;if(t=$n(t=Ea(t,Er([void 0,void 0],i),r)),r=Cs(i=0|e[be]),2&i)throw Error();let s=Fi(e,n,r);if(s instanceof Ni)2&s.J?(s=s.V(),s.push(t),Bt(e,i,n,s,r)):s.Ma(t);else if(Array.isArray(s)){var a=0|s[be];8192&a||Gt(s,a|=8192),2&a&&(s=um(s),Bt(e,i,n,s,r)),s.push(t)}else Bt(e,i,n,la([t]),r);return!0},function(t,e,n,i,r){if(e instanceof Ni)e.forEach((s,a)=>{bo(t,n,Er([a,s],i),r)});else if(Array.isArray(e)){for(let s=0;s<e.length;s++){const a=e[s];Array.isArray(a)&&bo(t,n,Er(a,i),r)}la(e)}});function Im(t,e,n){(e=ai(e))!=null&&(zn(t,n,5),t=t.g,ku(e),ih(t))}function Dm(t,e,n){if(e=function(i){if(i==null)return i;const r=typeof i;if(r==="bigint")return String(xa(64,i));if(Ma(i)){if(r==="string")return tm(i);if(r==="number")return Gu(i)}}(e),e!=null&&(typeof e=="string"&&ad(e),e!=null))switch(zn(t,n,0),typeof e){case"number":t=t.g,ms(e),ns(t,Mt,Ut);break;case"bigint":n=BigInt.asUintN(64,e),n=new su(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),ns(t.g,n.h,n.g);break;default:n=ad(e),ns(t.g,n.h,n.g)}}function Um(t,e,n){(e=Ps(e))!=null&&e!=null&&(zn(t,n,0),qo(t.g,e))}function Nm(t,e,n){(e=Jp(e))!=null&&(zn(t,n,0),t.g.g.push(e?1:0))}function Fm(t,e,n){(e=Zt(e))!=null&&Yo(t,n,Bp(e))}function Om(t,e,n,i,r){bo(t,n,Cm(e,i),r)}function Bm(t,e,n){(e=e==null||typeof e=="string"||e instanceof li?e:void 0)!=null&&Yo(t,n,Qu(e,!0).buffer)}function km(t,e,n){(e=Qp(e))!=null&&e!=null&&(zn(t,n,0),Ns(t.g,e))}function zm(t,e,n){return(t.h===5||t.h===2)&&(e=Us(e,0|e[be],n),t.h==2?Xo(t,Eo,e):e.push(Eo(t.g)),!0)}var Nt=sn(function(t,e,n){return t.h===5&&(an(e,n,Eo(t.g)),!0)},Im,$o),gM=Bs(zm,function(t,e,n){if((e=Os(ai,e))!=null)for(let a=0;a<e.length;a++){var i=t,r=n,s=e[a];s!=null&&(zn(i,r,5),i=i.g,ku(s),ih(i))}},$o),dh=Bs(zm,function(t,e,n){if((e=Os(ai,e))!=null&&e.length){zn(t,n,2),Ns(t.g,4*e.length);for(let i=0;i<e.length;i++)n=t.g,ku(e[i]),ih(n)}},$o),_M=sn(function(t,e,n){return t.h===5&&(an(e,n,(t=Eo(t.g))===0?void 0:t),!0)},Im,$o),ir=sn(function(t,e,n){return t.h!==0?t=!1:(an(e,n,eh(t.g,Zp)),t=!0),t},Dm,Em),$c=sn(function(t,e,n){return t.h!==0?e=!1:(an(e,n,(t=eh(t.g,Zp))===pM?void 0:t),e=!0),e},Dm,Em),vM=sn(function(t,e,n){return t.h!==0?t=!1:(an(e,n,eh(t.g,G3)),t=!0),t},function(t,e,n){if(e=function(i){if(i==null)return i;var r=typeof i;if(r==="bigint")return String(H3(64,i));if(Ma(i)){if(r==="string")return r=gs(Number(i)),Pr(r)&&r>=0?i=String(r):((r=i.indexOf("."))!==-1&&(i=i.substring(0,r)),(r=i[0]!=="-"&&((r=i.length)<20||r===20&&i<="18446744073709551615"))||(zo(i),i=ua(Mt,Ut))),i;if(r==="number")return(i=gs(i))>=0&&Pr(i)||(ms(i),i=Kp(Mt,Ut)),i}}(e),e!=null&&(typeof e=="string"&&sd(e),e!=null))switch(zn(t,n,0),typeof e){case"number":t=t.g,ms(e),ns(t,Mt,Ut);break;case"bigint":n=BigInt.asUintN(64,e),n=new ru(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),ns(t.g,n.h,n.g);break;default:n=sd(e),ns(t.g,n.h,n.g)}},lM),Ot=sn(function(t,e,n){return t.h===0&&(an(e,n,nr(t.g)),!0)},Um,ch),ya=Bs(function(t,e,n){return(t.h===0||t.h===2)&&(e=Us(e,0|e[be],n),t.h==2?Xo(t,nr,e):e.push(nr(t.g)),!0)},function(t,e,n){if((e=Os(Ps,e))!=null&&e.length){n=rh(t,n);for(let i=0;i<e.length;i++)qo(t.g,e[i]);sh(t,n)}},ch),Qr=sn(function(t,e,n){return t.h===0&&(an(e,n,(t=nr(t.g))===0?void 0:t),!0)},Um,ch),Et=sn(function(t,e,n){return t.h===0&&(an(e,n,th(t.g)),!0)},Nm,Sm),Ar=sn(function(t,e,n){return t.h===0&&(an(e,n,(t=th(t.g))===!1?void 0:t),!0)},Nm,Sm),tn=Bs(function(t,e,n){return t.h===2&&(t=nh(t),Us(e,0|e[be],n).push(t),!0)},function(t,e,n){if((e=Os(Zt,e))!=null)for(let a=0;a<e.length;a++){var i=t,r=n,s=e[a];s!=null&&Yo(i,r,Bp(s))}},oh),Ji=sn(function(t,e,n){return t.h===2&&(an(e,n,(t=nh(t))===""?void 0:t),!0)},Fm,oh),ft=sn(function(t,e,n){return t.h===2&&(an(e,n,nh(t)),!0)},Fm,oh),Yt=function(t,e,n=ah){return new Fs(t,e,n)}(function(t,e,n,i,r){return t.h===2&&(i=Er(void 0,i),Us(e,0|e[be],n).push(i),Ea(t,i,r),!0)},function(t,e,n,i,r){if(Array.isArray(e)){for(let s=0;s<e.length;s++)Om(t,e[s],n,i,r);1&(t=0|e[be])||Gt(e,1|t)}}),vt=jo(function(t,e,n,i,r,s){if(t.h!==2)return!1;let a=0|e[be];return hm(e,a,s,n,Cs(a)),Ea(t,e=Zu(e,i,n),r),!0},Om),Vm=sn(function(t,e,n){return t.h===2&&(an(e,n,Mm(t)),!0)},Bm,ym),xM=Bs(function(t,e,n){return(t.h===0||t.h===2)&&(e=Us(e,0|e[be],n),t.h==2?Xo(t,di,e):e.push(di(t.g)),!0)},function(t,e,n){if((e=Os(Qp,e))!=null)for(let a=0;a<e.length;a++){var i=t,r=n,s=e[a];s!=null&&(zn(i,r,0),Ns(i.g,s))}},lh),MM=sn(function(t,e,n){return t.h===0&&(an(e,n,(t=di(t.g))===0?void 0:t),!0)},km,lh),rn=sn(function(t,e,n){return t.h===0&&(an(e,n,nr(t.g)),!0)},function(t,e,n){(e=Ps(e))!=null&&(e=parseInt(e,10),zn(t,n,0),qo(t.g,e))},bm);class SM{constructor(e,n){var i=Ln;this.g=e,this.h=n,this.m=et,this.j=Le,this.defaultValue=void 0,this.l=i.Oa!=null?jp:void 0}register(){Oo(this)}}function _i(t,e){return new SM(t,e)}function rr(t,e){return(n,i)=>{{const s={ea:!0};i&&Object.assign(s,i),n=_m(n,void 0,void 0,s);try{const a=new t,o=a.v;fh(e)(o,n);var r=a}finally{vm(n)}}return r}}function ec(t){return function(){const e=new class{constructor(){this.l=[],this.h=0,this.g=new class{constructor(){this.g=[]}length(){return this.g.length}end(){const a=this.g;return this.g=[],a}}}};Lm(this.v,e,Dr(Ko,Jo,Qo,t)),_s(e,e.g.end());const n=new Uint8Array(e.h),i=e.l,r=i.length;let s=0;for(let a=0;a<r;a++){const o=i[a];n.set(o,s),s+=o.length}return e.l=[n],n}}var ld=class extends Te{constructor(t){super(t)}},ud=[0,Ji,sn(function(t,e,n){return t.h===2&&(an(e,n,(t=Mm(t))===Rr()?void 0:t),!0)},function(t,e,n){if(e!=null){if(e instanceof Te){const i=e.Ra;return void(i?(e=i(e),e!=null&&Yo(t,n,Qu(e,!0).buffer)):fs(tu,3))}if(Array.isArray(e))return void fs(tu,3)}Bm(t,e,n)},ym)];let jc,hd=globalThis.trustedTypes;function fd(t){var e;return jc===void 0&&(jc=function(){let n=null;if(!hd)return n;try{const i=r=>r;n=hd.createPolicy("goog#html",{createHTML:i,createScript:i,createScriptURL:i})}catch{}return n}()),t=(e=jc)?e.createScriptURL(t):t,new class{constructor(n){this.g=n}toString(){return this.g+""}}(t)}function Qa(t,...e){if(e.length===0)return fd(t[0]);let n=t[0];for(let i=0;i<e.length;i++)n+=encodeURIComponent(e[i])+t[i+1];return fd(n)}var Gm=[0,Ot,rn,Et,-1,ya,rn,-1,Et],EM=class extends Te{constructor(t){super(t)}},Hm=[0,Et,ft,Et,rn,-1,Bs(function(t,e,n){return(t.h===0||t.h===2)&&(e=Us(e,0|e[be],n),t.h==2?Xo(t,sM,e):e.push(nr(t.g)),!0)},function(t,e,n){if((e=Os(Ps,e))!=null&&e.length){n=rh(t,n);for(let i=0;i<e.length;i++)qo(t.g,e[i]);sh(t,n)}},bm),ft,-1,[0,Et,-1],rn,Et,-1],Wm=[0,3,Et,-1,2,[0,[2],Ot,vt,[0,sn(function(t,e,n){return t.h===0&&(an(e,n,di(t.g)),!0)},km,lh)]],[0,rn,Et,rn,Et,rn,Et,ft,-1],[0,[3,4],ft,-1,vt,[0,Ot],vt,[0,rn]],[0]],Xm=[0,ft,-2],dd=class extends Te{constructor(t){super(t)}},qm=[0],Ym=[0,Ot,Et,1,Et,-4],Ln=class extends Te{constructor(t){super(t,2)}},kt={};kt[336783863]=[0,ft,Et,-1,Ot,[0,[1,2,3,4,5,6,7,8,9],vt,qm,vt,Hm,vt,Xm,vt,Ym,vt,Gm,vt,[0,ft,-2],vt,[0,ft,rn],vt,Wm,vt,[0,rn,-1,Et]],[0,ft],Et,[0,[1,3],[2,4],vt,[0,ya],-1,vt,[0,tn],-1,Yt,[0,ft,-1]],ft];var pd=[0,$c,-1,Ar,-3,$c,ya,Ji,Qr,$c,-1,Ar,Qr,Ar,-2,Ji];function xt(t,e){Wo(t,3,e)}function Ye(t,e){Wo(t,4,e)}var gn=class extends Te{constructor(t){super(t,500)}o(t){return Le(this,0,7,t)}},ea=[-1,{}],md=[0,ft,1,ea],gd=[0,ft,tn,ea];function Vn(t,e){Ju(t,1,gn,e)}function bt(t,e){Wo(t,10,e)}function tt(t,e){Wo(t,15,e)}var In=class extends Te{constructor(t){super(t,500)}o(t){return Le(this,0,1001,t)}},$m=[-500,Yt,[-500,Ji,-1,tn,-3,[-2,kt,Et],Yt,ud,Qr,-1,md,gd,Yt,[0,Ji,Ar],Ji,pd,Qr,tn,987,tn],4,Yt,[-500,ft,-1,[-1,{}],998,ft],Yt,[-500,ft,tn,-1,[-2,{},Et],997,tn,-1],Qr,Yt,[-500,ft,tn,ea,998,tn],tn,Qr,md,gd,Yt,[0,Ji,-1,ea],tn,-2,pd,Ji,-1,Ar,[0,Ar,MM],978,ea,Yt,ud];In.prototype.g=ec($m);var yM=rr(In,$m),bM=class extends Te{constructor(t){super(t)}},jm=class extends Te{constructor(t){super(t)}g(){return Oi(this,bM,1)}},Km=[0,Yt,[0,Ot,Nt,ft,-1]],tc=rr(jm,Km),TM=class extends Te{constructor(t){super(t)}},AM=class extends Te{constructor(t){super(t)}},Kc=class extends Te{constructor(t){super(t)}l(){return et(this,TM,2)}g(){return Oi(this,AM,5)}},Zm=rr(class extends Te{constructor(t){super(t)}},[0,tn,ya,dh,[0,rn,[0,Ot,-3],[0,Nt,-3],[0,Ot,-1,[0,Yt,[0,Ot,-2]]],Yt,[0,Nt,-1,ft,Nt]],ft,-1,ir,Yt,[0,Ot,Nt],tn,ir]),Jm=class extends Te{constructor(t){super(t)}},is=rr(class extends Te{constructor(t){super(t)}},[0,Yt,[0,Nt,-4]]),Qm=class extends Te{constructor(t){super(t)}},ba=rr(class extends Te{constructor(t){super(t)}},[0,Yt,[0,Nt,-4]]),wM=class extends Te{constructor(t){super(t)}},RM=[0,Ot,-1,dh,rn],e0=class extends Te{constructor(t){super(t)}};e0.prototype.g=ec([0,Nt,-4,ir]);var CM=class extends Te{constructor(t){super(t)}},PM=rr(class extends Te{constructor(t){super(t)}},[0,Yt,[0,1,Ot,ft,Km],ir]),_d=class extends Te{constructor(t){super(t)}},LM=class extends Te{constructor(t){super(t)}na(){const t=St(this,1,void 0,void 0,lm);return t??Rr()}},IM=class extends Te{constructor(t){super(t)}},t0=[1,2],DM=rr(class extends Te{constructor(t){super(t)}},[0,Yt,[0,t0,vt,[0,dh],vt,[0,Vm],Ot,ft],ir]),ph=class extends Te{constructor(t){super(t)}},n0=[0,ft,Ot,Nt,tn,-1],vd=class extends Te{constructor(t){super(t)}},UM=[0,Et,-1],xd=class extends Te{constructor(t){super(t)}},fo=[1,2,3,4,5,6],To=class extends Te{constructor(t){super(t)}g(){return St(this,1,void 0,void 0,lm)!=null}l(){return Zt(St(this,2))!=null}},Rt=class extends Te{constructor(t){super(t)}g(){return Jp(St(this,2))??!1}},i0=[0,Vm,ft,[0,Ot,ir,-1],[0,vM,ir]],Ft=[0,i0,Et,[0,fo,vt,Ym,vt,Hm,vt,Gm,vt,qm,vt,Xm,vt,Wm],rn],nc=class extends Te{constructor(t){super(t)}},mh=[0,Ft,Nt,-1,Ot],NM=_i(502141897,nc);kt[502141897]=mh;var FM=rr(class extends Te{constructor(t){super(t)}},[0,[0,rn,-1,gM,xM],RM]),r0=class extends Te{constructor(t){super(t)}},s0=class extends Te{constructor(t){super(t)}},ou=[0,Ft,Nt,[0,Ft],Et],OM=_i(508968150,s0);kt[508968150]=[0,Ft,mh,ou,Nt,[0,[0,i0]]],kt[508968149]=ou;var Zr=class extends Te{constructor(t){super(t)}l(){return et(this,ph,2)}g(){ct(this,2)}},a0=[0,Ft,n0];kt[478825465]=a0;var BM=class extends Te{constructor(t){super(t)}},o0=class extends Te{constructor(t){super(t)}},gh=class extends Te{constructor(t){super(t)}},_h=class extends Te{constructor(t){super(t)}},c0=class extends Te{constructor(t){super(t)}},Md=[0,Ft,[0,Ft],a0,-1],l0=[0,Ft,Nt,Ot],vh=[0,Ft,Nt],u0=[0,Ft,l0,vh,Nt],kM=_i(479097054,c0);kt[479097054]=[0,Ft,u0,Md],kt[463370452]=Md,kt[464864288]=l0;var zM=_i(462713202,_h);kt[462713202]=u0,kt[474472470]=vh;var VM=class extends Te{constructor(t){super(t)}},h0=class extends Te{constructor(t){super(t)}},f0=class extends Te{constructor(t){super(t)}},d0=class extends Te{constructor(t){super(t)}},xh=[0,Ft,Nt,-1,Ot],cu=[0,Ft,Nt,Et];d0.prototype.g=ec([0,Ft,vh,[0,Ft],mh,ou,xh,cu]);var p0=class extends Te{constructor(t){super(t)}},GM=_i(456383383,p0);kt[456383383]=[0,Ft,n0];var m0=class extends Te{constructor(t){super(t)}},HM=_i(476348187,m0);kt[476348187]=[0,Ft,UM];var g0=class extends Te{constructor(t){super(t)}},Sd=class extends Te{constructor(t){super(t)}},_0=[0,rn,-1],WM=_i(458105876,class extends Te{constructor(t){super(t)}g(){let t;var e=this.v;const n=0|e[be];return t=Rn(this,n),e=function(i,r,s,a){var o=Sd;!a&&Is(i)&&(s=0|(r=i.v)[be]);var c=Fi(r,2);if(i=!1,c==null){if(a)return td();c=[]}else if(c.constructor===Ni){if(!(2&c.J)||a)return c;c=c.V()}else Array.isArray(c)?i=!!(2&(0|c[be])):c=[];if(a){if(!c.length)return td();i||(i=!0,va(c))}else i&&(i=!1,la(c),c=um(c));return!i&&32&s&&_a(c,32),s=Bt(r,s,2,a=new Ni(c,o,q3,void 0)),i||Ir(r,s),a}(this,e,n,t),!t&&Sd&&(e.ra=!0),e}});kt[458105876]=[0,_0,mM,[!0,ir,[0,ft,-1,tn]],[0,ya,Et,rn]];var Mh=class extends Te{constructor(t){super(t)}},v0=_i(458105758,Mh);kt[458105758]=[0,Ft,ft,_0];var Zc=class extends Te{constructor(t){super(t)}},Ed=[0,_M,-1,Ar],XM=class extends Te{constructor(t){super(t)}},x0=class extends Te{constructor(t){super(t)}},lu=[1,2];x0.prototype.g=ec([0,lu,vt,Ed,vt,[0,Yt,Ed]]);var M0=class extends Te{constructor(t){super(t)}},qM=_i(443442058,M0);kt[443442058]=[0,Ft,ft,Ot,Nt,tn,-1,Et,Nt],kt[514774813]=xh;var S0=class extends Te{constructor(t){super(t)}},YM=_i(516587230,S0);function uu(t,e){return e=e?e.clone():new ph,t.displayNamesLocale!==void 0?ct(e,1,Sa(t.displayNamesLocale)):t.displayNamesLocale===void 0&&ct(e,1),t.maxResults!==void 0?Bi(e,2,t.maxResults):"maxResults"in t&&ct(e,2),t.scoreThreshold!==void 0?Ce(e,3,t.scoreThreshold):"scoreThreshold"in t&&ct(e,3),t.categoryAllowlist!==void 0?So(e,4,t.categoryAllowlist):"categoryAllowlist"in t&&ct(e,4),t.categoryDenylist!==void 0?So(e,5,t.categoryDenylist):"categoryDenylist"in t&&ct(e,5),e}function E0(t){const e=Number(t);return Number.isSafeInteger(e)?e:String(t)}function Sh(t,e=-1,n=""){return{categories:t.map(i=>({index:Bn(i,1)??0??-1,score:Lt(i,2)??0,categoryName:Zt(St(i,3))??""??"",displayName:Zt(St(i,4))??""??""})),headIndex:e,headName:n}}function $M(t){const e={classifications:Oi(t,CM,1).map(n=>{var i;return Sh(((i=et(n,jm,4))==null?void 0:i.g())??[],Bn(n,2)??0,Zt(St(n,3))??"")})};return function(n){return n==null?n:typeof n=="bigint"?(nu(n)?n=Number(n):(n=xa(64,n),n=nu(n)?Number(n):String(n)),n):Ma(n)?typeof n=="number"?Gu(n):tm(n):void 0}(St(t,2,void 0,void 0,xo))!=null&&(e.timestampMs=E0(St(t,2,void 0,void 0,xo)??om)),e}function y0(t){var a,o;var e=Sr(t,3,ai,Mr()),n=Sr(t,2,Ps,Mr()),i=Sr(t,1,Zt,Mr()),r=Sr(t,9,Zt,Mr());const s={categories:[],keypoints:[]};for(let c=0;c<e.length;c++)s.categories.push({score:e[c],index:n[c]??-1,categoryName:i[c]??"",displayName:r[c]??""});if((e=(a=et(t,Kc,4))==null?void 0:a.l())&&(s.boundingBox={originX:Bn(e,1,$i)??0,originY:Bn(e,2,$i)??0,width:Bn(e,3,$i)??0,height:Bn(e,4,$i)??0,angle:0}),(o=et(t,Kc,4))==null?void 0:o.g().length)for(const c of et(t,Kc,4).g())s.keypoints.push({x:St(c,1,void 0,$i,ai)??0,y:St(c,2,void 0,$i,ai)??0,score:St(c,4,void 0,$i,ai)??0,label:Zt(St(c,3,void 0,$i))??""});return s}function ic(t){const e=[];for(const n of Oi(t,Qm,1))e.push({x:Lt(n,1)??0,y:Lt(n,2)??0,z:Lt(n,3)??0,visibility:Lt(n,4)??0});return e}function ta(t){const e=[];for(const n of Oi(t,Jm,1))e.push({x:Lt(n,1)??0,y:Lt(n,2)??0,z:Lt(n,3)??0,visibility:Lt(n,4)??0});return e}function yd(t){return Array.from(t,e=>e>127?e-256:e)}function bd(t,e){if(t.length!==e.length)throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${t.length} vs. ${e.length}).`);let n=0,i=0,r=0;for(let s=0;s<t.length;s++)n+=t[s]*e[s],i+=t[s]*t[s],r+=e[s]*e[s];if(i<=0||r<=0)throw Error("Cannot compute cosine similarity on embedding with 0 norm.");return n/Math.sqrt(i*r)}let eo;kt[516587230]=[0,Ft,xh,cu,Nt],kt[518928384]=cu;const jM=new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]);async function b0(t){if(t)return!0;if(eo===void 0)try{await WebAssembly.instantiate(jM),eo=!0}catch{eo=!1}return eo}async function to(t,e,n){return{wasmLoaderPath:`${e}/${t}_${n=`wasm${n?"_module":""}${await b0(n)?"":"_nosimd"}_internal`}.js`,wasmBinaryPath:`${e}/${t}_${n}.wasm`}}var Jr=class{};function T0(){var t=navigator;return typeof OffscreenCanvas<"u"&&(!function(e=navigator){return(e=e.userAgent).includes("Safari")&&!e.includes("Chrome")}(t)||!!((t=t.userAgent.match(/Version\/([\d]+).*Safari/))&&t.length>=1&&Number(t[1])>=17))}async function Td(t){if(typeof importScripts!="function"){const e=document.createElement("script");return e.src=t.toString(),e.crossOrigin="anonymous",new Promise((n,i)=>{e.addEventListener("load",()=>{n()},!1),e.addEventListener("error",r=>{i(r)},!1),document.body.appendChild(e)})}try{importScripts(t.toString())}catch(e){if(!(e instanceof TypeError))throw e;await self.import(t.toString())}}function A0(t){return t.videoWidth!==void 0?[t.videoWidth,t.videoHeight]:t.naturalWidth!==void 0?[t.naturalWidth,t.naturalHeight]:t.displayWidth!==void 0?[t.displayWidth,t.displayHeight]:[t.width,t.height]}function we(t,e,n){t.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"),n(e=t.i.stringToNewUTF8(e)),t.i._free(e)}function Ad(t,e,n){if(!t.i.canvas)throw Error("No OpenGL canvas configured.");if(n?t.i._bindTextureToStream(n):t.i._bindTextureToCanvas(),!(n=t.i.canvas.getContext("webgl2")||t.i.canvas.getContext("webgl")))throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");t.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!0),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,e),t.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1);const[i,r]=A0(e);return!t.l||i===t.i.canvas.width&&r===t.i.canvas.height||(t.i.canvas.width=i,t.i.canvas.height=r),[i,r]}function wd(t,e,n){t.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");const i=new Uint32Array(e.length);for(let r=0;r<e.length;r++)i[r]=t.i.stringToNewUTF8(e[r]);e=t.i._malloc(4*i.length),t.i.HEAPU32.set(i,e>>2),n(e);for(const r of i)t.i._free(r);t.i._free(e)}function ti(t,e,n){t.i.simpleListeners=t.i.simpleListeners||{},t.i.simpleListeners[e]=n}function ji(t,e,n){let i=[];t.i.simpleListeners=t.i.simpleListeners||{},t.i.simpleListeners[e]=(r,s,a)=>{s?(n(i,a),i=[]):i.push(r)}}Jr.forVisionTasks=function(t,e=!1){return to("vision",t??Qa``,e)},Jr.forTextTasks=function(t,e=!1){return to("text",t??Qa``,e)},Jr.forGenAiTasks=function(t,e=!1){return to("genai",t??Qa``,e)},Jr.forAudioTasks=function(t,e=!1){return to("audio",t??Qa``,e)},Jr.isSimdSupported=function(t=!1){return b0(t)};async function KM(t,e,n,i){return t=await(async(r,s,a,o,c)=>{if(s&&await Td(s),!self.ModuleFactory||a&&(await Td(a),!self.ModuleFactory))throw Error("ModuleFactory not set.");return self.Module&&c&&((s=self.Module).locateFile=c.locateFile,c.mainScriptUrlOrBlob&&(s.mainScriptUrlOrBlob=c.mainScriptUrlOrBlob)),c=await self.ModuleFactory(self.Module||c),self.ModuleFactory=self.Module=void 0,new r(c,o)})(t,n.wasmLoaderPath,n.assetLoaderPath,e,{locateFile:r=>r.endsWith(".wasm")?n.wasmBinaryPath.toString():n.assetBinaryPath&&r.endsWith(".data")?n.assetBinaryPath.toString():r}),await t.o(i),t}function Jc(t,e){const n=et(t.baseOptions,To,1)||new To;typeof e=="string"?(ct(n,2,Sa(e)),ct(n,1)):e instanceof Uint8Array&&(ct(n,1,Bu(e,!1)),ct(n,2)),Le(t.baseOptions,0,1,n)}function Rd(t){try{const e=t.H.length;if(e===1)throw Error(t.H[0].message);if(e>1)throw Error("Encountered multiple errors: "+t.H.map(n=>n.message).join(", "))}finally{t.H=[]}}function me(t,e){t.C=Math.max(t.C,e)}function rc(t,e){t.B=new gn,Cn(t.B,2,"PassThroughCalculator"),xt(t.B,"free_memory"),Ye(t.B,"free_memory_unused_out"),bt(e,"free_memory"),Vn(e,t.B)}function vs(t,e){xt(t.B,e),Ye(t.B,e+"_unused_out")}function sc(t){t.g.addBoolToStream(!0,"free_memory",t.C)}var hu=class{constructor(t){this.g=t,this.H=[],this.C=0,this.g.setAutoRenderToScreen(!1)}l(t,e=!0){var n,i,r,s,a,o;if(e){const c=t.baseOptions||{};if((n=t.baseOptions)!=null&&n.modelAssetBuffer&&((i=t.baseOptions)!=null&&i.modelAssetPath))throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");if(!((r=et(this.baseOptions,To,1))!=null&&r.g()||(s=et(this.baseOptions,To,1))!=null&&s.l()||(a=t.baseOptions)!=null&&a.modelAssetBuffer||(o=t.baseOptions)!=null&&o.modelAssetPath))throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");if(function(l,h){let f=et(l.baseOptions,xd,3);if(!f){var u=f=new xd,m=new dd;Qs(u,4,fo,m)}"delegate"in h&&(h.delegate==="GPU"?(h=f,u=new EM,Qs(h,2,fo,u)):(h=f,u=new dd,Qs(h,4,fo,u))),Le(l.baseOptions,0,3,f)}(this,c),c.modelAssetPath)return fetch(c.modelAssetPath.toString()).then(l=>{if(l.ok)return l.arrayBuffer();throw Error(`Failed to fetch model: ${c.modelAssetPath} (${l.status})`)}).then(l=>{try{this.g.i.FS_unlink("/model.dat")}catch{}this.g.i.FS_createDataFile("/","model.dat",new Uint8Array(l),!0,!1,!1),Jc(this,"/model.dat"),this.m(),this.L()});if(c.modelAssetBuffer instanceof Uint8Array)Jc(this,c.modelAssetBuffer);else if(c.modelAssetBuffer)return async function(l){const h=[];for(var f=0;;){const{done:u,value:m}=await l.read();if(u)break;h.push(m),f+=m.length}if(h.length===0)return new Uint8Array(0);if(h.length===1)return h[0];l=new Uint8Array(f),f=0;for(const u of h)l.set(u,f),f+=u.length;return l}(c.modelAssetBuffer).then(l=>{Jc(this,l),this.m(),this.L()})}return this.m(),this.L(),Promise.resolve()}L(){}ca(){let t;if(this.g.ca(e=>{t=yM(e)}),!t)throw Error("Failed to retrieve CalculatorGraphConfig");return t}setGraph(t,e){this.g.attachErrorListener((n,i)=>{this.H.push(Error(i))}),this.g.Ja(),this.g.setGraph(t,e),this.B=void 0,Rd(this)}finishProcessing(){this.g.finishProcessing(),Rd(this)}close(){this.B=void 0,this.g.closeGraph()}};function er(t,e){if(!t)throw Error(`Unable to obtain required WebGL resource: ${e}`);return t}hu.prototype.close=hu.prototype.close;class ZM{constructor(e,n,i,r){this.g=e,this.h=n,this.m=i,this.l=r}bind(){this.g.bindVertexArray(this.h)}close(){this.g.deleteVertexArray(this.h),this.g.deleteBuffer(this.m),this.g.deleteBuffer(this.l)}}function Cd(t,e,n){const i=t.g;if(n=er(i.createShader(n),"Failed to create WebGL shader"),i.shaderSource(n,e),i.compileShader(n),!i.getShaderParameter(n,i.COMPILE_STATUS))throw Error(`Could not compile WebGL shader: ${i.getShaderInfoLog(n)}`);return i.attachShader(t.h,n),n}function Pd(t,e){const n=t.g,i=er(n.createVertexArray(),"Failed to create vertex array");n.bindVertexArray(i);const r=er(n.createBuffer(),"Failed to create buffer");n.bindBuffer(n.ARRAY_BUFFER,r),n.enableVertexAttribArray(t.O),n.vertexAttribPointer(t.O,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),n.STATIC_DRAW);const s=er(n.createBuffer(),"Failed to create buffer");return n.bindBuffer(n.ARRAY_BUFFER,s),n.enableVertexAttribArray(t.L),n.vertexAttribPointer(t.L,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array(e?[0,1,0,0,1,0,1,1]:[0,0,0,1,1,1,1,0]),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,null),n.bindVertexArray(null),new ZM(n,i,r,s)}function Eh(t,e){if(t.g){if(e!==t.g)throw Error("Cannot change GL context once initialized")}else t.g=e}function JM(t,e,n,i){return Eh(t,e),t.h||(t.m(),t.D()),n?(t.u||(t.u=Pd(t,!0)),n=t.u):(t.A||(t.A=Pd(t,!1)),n=t.A),e.useProgram(t.h),n.bind(),t.l(),t=i(),n.g.bindVertexArray(null),t}function w0(t,e,n){return Eh(t,e),t=er(e.createTexture(),"Failed to create texture"),e.bindTexture(e.TEXTURE_2D,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,n??e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,n??e.LINEAR),e.bindTexture(e.TEXTURE_2D,null),t}function R0(t,e,n){Eh(t,e),t.B||(t.B=er(e.createFramebuffer(),"Failed to create framebuffe.")),e.bindFramebuffer(e.FRAMEBUFFER,t.B),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0)}function QM(t){var e;(e=t.g)==null||e.bindFramebuffer(t.g.FRAMEBUFFER,null)}var C0=class{H(){return`
  precision mediump float;
  varying vec2 vTex;
  uniform sampler2D inputTexture;
  void main() {
    gl_FragColor = texture2D(inputTexture, vTex);
  }
 `}m(){const t=this.g;if(this.h=er(t.createProgram(),"Failed to create WebGL program"),this.X=Cd(this,`
  attribute vec2 aVertex;
  attribute vec2 aTex;
  varying vec2 vTex;
  void main(void) {
    gl_Position = vec4(aVertex, 0.0, 1.0);
    vTex = aTex;
  }`,t.VERTEX_SHADER),this.W=Cd(this,this.H(),t.FRAGMENT_SHADER),t.linkProgram(this.h),!t.getProgramParameter(this.h,t.LINK_STATUS))throw Error(`Error during program linking: ${t.getProgramInfoLog(this.h)}`);this.O=t.getAttribLocation(this.h,"aVertex"),this.L=t.getAttribLocation(this.h,"aTex")}D(){}l(){}close(){if(this.h){const t=this.g;t.deleteProgram(this.h),t.deleteShader(this.X),t.deleteShader(this.W)}this.B&&this.g.deleteFramebuffer(this.B),this.A&&this.A.close(),this.u&&this.u.close()}};function wi(t,e){switch(e){case 0:return t.g.find(n=>n instanceof Uint8Array);case 1:return t.g.find(n=>n instanceof Float32Array);case 2:return t.g.find(n=>typeof WebGLTexture<"u"&&n instanceof WebGLTexture);default:throw Error(`Type is not supported: ${e}`)}}function fu(t){var e=wi(t,1);if(!e){if(e=wi(t,0))e=new Float32Array(e).map(i=>i/255);else{e=new Float32Array(t.width*t.height);const i=xs(t);var n=yh(t);if(R0(n,i,P0(t)),"iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"document"in self&&"ontouchend"in self.document){n=new Float32Array(t.width*t.height*4),i.readPixels(0,0,t.width,t.height,i.RGBA,i.FLOAT,n);for(let r=0,s=0;r<e.length;++r,s+=4)e[r]=n[s]}else i.readPixels(0,0,t.width,t.height,i.RED,i.FLOAT,e)}t.g.push(e)}return e}function P0(t){let e=wi(t,2);if(!e){const n=xs(t);e=I0(t);const i=fu(t),r=L0(t);n.texImage2D(n.TEXTURE_2D,0,r,t.width,t.height,0,n.RED,n.FLOAT,i),du(t)}return e}function xs(t){if(!t.canvas)throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");return t.h||(t.h=er(t.canvas.getContext("webgl2"),"You cannot use a canvas that is already bound to a different type of rendering context.")),t.h}function L0(t){if(t=xs(t),!no)if(t.getExtension("EXT_color_buffer_float")&&t.getExtension("OES_texture_float_linear")&&t.getExtension("EXT_float_blend"))no=t.R32F;else{if(!t.getExtension("EXT_color_buffer_half_float"))throw Error("GPU does not fully support 4-channel float32 or float16 formats");no=t.R16F}return no}function yh(t){return t.l||(t.l=new C0),t.l}function I0(t){const e=xs(t);e.viewport(0,0,t.width,t.height),e.activeTexture(e.TEXTURE0);let n=wi(t,2);return n||(n=w0(yh(t),e,t.m?e.LINEAR:e.NEAREST),t.g.push(n),t.j=!0),e.bindTexture(e.TEXTURE_2D,n),n}function du(t){t.h.bindTexture(t.h.TEXTURE_2D,null)}var no,qt=class{constructor(t,e,n,i,r,s,a){this.g=t,this.m=e,this.j=n,this.canvas=i,this.l=r,this.width=s,this.height=a,this.j&&--Ld===0&&console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources.")}Fa(){return!!wi(this,0)}ka(){return!!wi(this,1)}R(){return!!wi(this,2)}ja(){return(e=wi(t=this,0))||(e=fu(t),e=new Uint8Array(e.map(n=>Math.round(255*n))),t.g.push(e)),e;var t,e}ia(){return fu(this)}N(){return P0(this)}clone(){const t=[];for(const e of this.g){let n;if(e instanceof Uint8Array)n=new Uint8Array(e);else if(e instanceof Float32Array)n=new Float32Array(e);else{if(!(e instanceof WebGLTexture))throw Error(`Type is not supported: ${e}`);{const i=xs(this),r=yh(this);i.activeTexture(i.TEXTURE1),n=w0(r,i,this.m?i.LINEAR:i.NEAREST),i.bindTexture(i.TEXTURE_2D,n);const s=L0(this);i.texImage2D(i.TEXTURE_2D,0,s,this.width,this.height,0,i.RED,i.FLOAT,null),i.bindTexture(i.TEXTURE_2D,null),R0(r,i,n),JM(r,i,!1,()=>{I0(this),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.drawArrays(i.TRIANGLE_FAN,0,4),du(this)}),QM(r),du(this)}}t.push(n)}return new qt(t,this.m,this.R(),this.canvas,this.l,this.width,this.height)}close(){this.j&&xs(this).deleteTexture(wi(this,2)),Ld=-1}};qt.prototype.close=qt.prototype.close,qt.prototype.clone=qt.prototype.clone,qt.prototype.getAsWebGLTexture=qt.prototype.N,qt.prototype.getAsFloat32Array=qt.prototype.ia,qt.prototype.getAsUint8Array=qt.prototype.ja,qt.prototype.hasWebGLTexture=qt.prototype.R,qt.prototype.hasFloat32Array=qt.prototype.ka,qt.prototype.hasUint8Array=qt.prototype.Fa;var Ld=250;function jn(...t){return t.map(([e,n])=>({start:e,end:n}))}const eS=function(t){return class extends t{Ja(){this.i._registerModelResourcesGraphService()}}}((Id=class{constructor(t,e){this.l=!0,this.i=t,this.g=null,this.h=0,this.m=typeof this.i._addIntToInputStream=="function",e!==void 0?this.i.canvas=e:T0()?this.i.canvas=new OffscreenCanvas(1,1):(console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."),this.i.canvas=document.createElement("canvas"))}async initializeGraph(t){const e=await(await fetch(t)).arrayBuffer();t=!(t.endsWith(".pbtxt")||t.endsWith(".textproto")),this.setGraph(new Uint8Array(e),t)}setGraphFromString(t){this.setGraph(new TextEncoder().encode(t),!1)}setGraph(t,e){const n=t.length,i=this.i._malloc(n);this.i.HEAPU8.set(t,i),e?this.i._changeBinaryGraph(n,i):this.i._changeTextGraph(n,i),this.i._free(i)}configureAudio(t,e,n,i,r){this.i._configureAudio||console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'),we(this,i||"input_audio",s=>{we(this,r=r||"audio_header",a=>{this.i._configureAudio(s,a,t,e??0,n)})})}setAutoResizeCanvas(t){this.l=t}setAutoRenderToScreen(t){this.i._setAutoRenderToScreen(t)}setGpuBufferVerticalFlip(t){this.i.gpuOriginForWebTexturesIsBottomLeft=t}ca(t){ti(this,"__graph_config__",e=>{t(e)}),we(this,"__graph_config__",e=>{this.i._getGraphConfig(e,void 0)}),delete this.i.simpleListeners.__graph_config__}attachErrorListener(t){this.i.errorListener=t}attachEmptyPacketListener(t,e){this.i.emptyPacketListeners=this.i.emptyPacketListeners||{},this.i.emptyPacketListeners[t]=e}addAudioToStream(t,e,n){this.addAudioToStreamWithShape(t,0,0,e,n)}addAudioToStreamWithShape(t,e,n,i,r){const s=4*t.length;this.h!==s&&(this.g&&this.i._free(this.g),this.g=this.i._malloc(s),this.h=s),this.i.HEAPF32.set(t,this.g/4),we(this,i,a=>{this.i._addAudioToInputStream(this.g,e,n,a,r)})}addGpuBufferToStream(t,e,n){we(this,e,i=>{const[r,s]=Ad(this,t,i);this.i._addBoundTextureToStream(i,r,s,n)})}addBoolToStream(t,e,n){we(this,e,i=>{this.i._addBoolToInputStream(t,i,n)})}addDoubleToStream(t,e,n){we(this,e,i=>{this.i._addDoubleToInputStream(t,i,n)})}addFloatToStream(t,e,n){we(this,e,i=>{this.i._addFloatToInputStream(t,i,n)})}addIntToStream(t,e,n){we(this,e,i=>{this.i._addIntToInputStream(t,i,n)})}addUintToStream(t,e,n){we(this,e,i=>{this.i._addUintToInputStream(t,i,n)})}addStringToStream(t,e,n){we(this,e,i=>{we(this,t,r=>{this.i._addStringToInputStream(r,i,n)})})}addStringRecordToStream(t,e,n){we(this,e,i=>{wd(this,Object.keys(t),r=>{wd(this,Object.values(t),s=>{this.i._addFlatHashMapToInputStream(r,s,Object.keys(t).length,i,n)})})})}addProtoToStream(t,e,n,i){we(this,n,r=>{we(this,e,s=>{const a=this.i._malloc(t.length);this.i.HEAPU8.set(t,a),this.i._addProtoToInputStream(a,t.length,s,r,i),this.i._free(a)})})}addEmptyPacketToStream(t,e){we(this,t,n=>{this.i._addEmptyPacketToInputStream(n,e)})}addBoolVectorToStream(t,e,n){we(this,e,i=>{const r=this.i._allocateBoolVector(t.length);if(!r)throw Error("Unable to allocate new bool vector on heap.");for(const s of t)this.i._addBoolVectorEntry(r,s);this.i._addBoolVectorToInputStream(r,i,n)})}addDoubleVectorToStream(t,e,n){we(this,e,i=>{const r=this.i._allocateDoubleVector(t.length);if(!r)throw Error("Unable to allocate new double vector on heap.");for(const s of t)this.i._addDoubleVectorEntry(r,s);this.i._addDoubleVectorToInputStream(r,i,n)})}addFloatVectorToStream(t,e,n){we(this,e,i=>{const r=this.i._allocateFloatVector(t.length);if(!r)throw Error("Unable to allocate new float vector on heap.");for(const s of t)this.i._addFloatVectorEntry(r,s);this.i._addFloatVectorToInputStream(r,i,n)})}addIntVectorToStream(t,e,n){we(this,e,i=>{const r=this.i._allocateIntVector(t.length);if(!r)throw Error("Unable to allocate new int vector on heap.");for(const s of t)this.i._addIntVectorEntry(r,s);this.i._addIntVectorToInputStream(r,i,n)})}addUintVectorToStream(t,e,n){we(this,e,i=>{const r=this.i._allocateUintVector(t.length);if(!r)throw Error("Unable to allocate new unsigned int vector on heap.");for(const s of t)this.i._addUintVectorEntry(r,s);this.i._addUintVectorToInputStream(r,i,n)})}addStringVectorToStream(t,e,n){we(this,e,i=>{const r=this.i._allocateStringVector(t.length);if(!r)throw Error("Unable to allocate new string vector on heap.");for(const s of t)we(this,s,a=>{this.i._addStringVectorEntry(r,a)});this.i._addStringVectorToInputStream(r,i,n)})}addBoolToInputSidePacket(t,e){we(this,e,n=>{this.i._addBoolToInputSidePacket(t,n)})}addDoubleToInputSidePacket(t,e){we(this,e,n=>{this.i._addDoubleToInputSidePacket(t,n)})}addFloatToInputSidePacket(t,e){we(this,e,n=>{this.i._addFloatToInputSidePacket(t,n)})}addIntToInputSidePacket(t,e){we(this,e,n=>{this.i._addIntToInputSidePacket(t,n)})}addUintToInputSidePacket(t,e){we(this,e,n=>{this.i._addUintToInputSidePacket(t,n)})}addStringToInputSidePacket(t,e){we(this,e,n=>{we(this,t,i=>{this.i._addStringToInputSidePacket(i,n)})})}addProtoToInputSidePacket(t,e,n){we(this,n,i=>{we(this,e,r=>{const s=this.i._malloc(t.length);this.i.HEAPU8.set(t,s),this.i._addProtoToInputSidePacket(s,t.length,r,i),this.i._free(s)})})}addBoolVectorToInputSidePacket(t,e){we(this,e,n=>{const i=this.i._allocateBoolVector(t.length);if(!i)throw Error("Unable to allocate new bool vector on heap.");for(const r of t)this.i._addBoolVectorEntry(i,r);this.i._addBoolVectorToInputSidePacket(i,n)})}addDoubleVectorToInputSidePacket(t,e){we(this,e,n=>{const i=this.i._allocateDoubleVector(t.length);if(!i)throw Error("Unable to allocate new double vector on heap.");for(const r of t)this.i._addDoubleVectorEntry(i,r);this.i._addDoubleVectorToInputSidePacket(i,n)})}addFloatVectorToInputSidePacket(t,e){we(this,e,n=>{const i=this.i._allocateFloatVector(t.length);if(!i)throw Error("Unable to allocate new float vector on heap.");for(const r of t)this.i._addFloatVectorEntry(i,r);this.i._addFloatVectorToInputSidePacket(i,n)})}addIntVectorToInputSidePacket(t,e){we(this,e,n=>{const i=this.i._allocateIntVector(t.length);if(!i)throw Error("Unable to allocate new int vector on heap.");for(const r of t)this.i._addIntVectorEntry(i,r);this.i._addIntVectorToInputSidePacket(i,n)})}addUintVectorToInputSidePacket(t,e){we(this,e,n=>{const i=this.i._allocateUintVector(t.length);if(!i)throw Error("Unable to allocate new unsigned int vector on heap.");for(const r of t)this.i._addUintVectorEntry(i,r);this.i._addUintVectorToInputSidePacket(i,n)})}addStringVectorToInputSidePacket(t,e){we(this,e,n=>{const i=this.i._allocateStringVector(t.length);if(!i)throw Error("Unable to allocate new string vector on heap.");for(const r of t)we(this,r,s=>{this.i._addStringVectorEntry(i,s)});this.i._addStringVectorToInputSidePacket(i,n)})}attachBoolListener(t,e){ti(this,t,e),we(this,t,n=>{this.i._attachBoolListener(n)})}attachBoolVectorListener(t,e){ji(this,t,e),we(this,t,n=>{this.i._attachBoolVectorListener(n)})}attachIntListener(t,e){ti(this,t,e),we(this,t,n=>{this.i._attachIntListener(n)})}attachIntVectorListener(t,e){ji(this,t,e),we(this,t,n=>{this.i._attachIntVectorListener(n)})}attachUintListener(t,e){ti(this,t,e),we(this,t,n=>{this.i._attachUintListener(n)})}attachUintVectorListener(t,e){ji(this,t,e),we(this,t,n=>{this.i._attachUintVectorListener(n)})}attachDoubleListener(t,e){ti(this,t,e),we(this,t,n=>{this.i._attachDoubleListener(n)})}attachDoubleVectorListener(t,e){ji(this,t,e),we(this,t,n=>{this.i._attachDoubleVectorListener(n)})}attachFloatListener(t,e){ti(this,t,e),we(this,t,n=>{this.i._attachFloatListener(n)})}attachFloatVectorListener(t,e){ji(this,t,e),we(this,t,n=>{this.i._attachFloatVectorListener(n)})}attachStringListener(t,e){ti(this,t,e),we(this,t,n=>{this.i._attachStringListener(n)})}attachStringVectorListener(t,e){ji(this,t,e),we(this,t,n=>{this.i._attachStringVectorListener(n)})}attachProtoListener(t,e,n){ti(this,t,e),we(this,t,i=>{this.i._attachProtoListener(i,n||!1)})}attachProtoVectorListener(t,e,n){ji(this,t,e),we(this,t,i=>{this.i._attachProtoVectorListener(i,n||!1)})}attachAudioListener(t,e,n){this.i._attachAudioListener||console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'),ti(this,t,(i,r)=>{i=new Float32Array(i.buffer,i.byteOffset,i.length/4),e(i,r)}),we(this,t,i=>{this.i._attachAudioListener(i,n||!1)})}finishProcessing(){this.i._waitUntilIdle()}closeGraph(){this.i._closeGraph(),this.i.simpleListeners=void 0,this.i.emptyPacketListeners=void 0}},class extends Id{get ga(){return this.i}pa(t,e,n){we(this,e,i=>{const[r,s]=Ad(this,t,i);this.ga._addBoundTextureAsImageToStream(i,r,s,n)})}Z(t,e){ti(this,t,e),we(this,t,n=>{this.ga._attachImageListener(n)})}aa(t,e){ji(this,t,e),we(this,t,n=>{this.ga._attachImageVectorListener(n)})}}));var Id,Kn=class extends eS{};async function Ze(t,e,n){return async function(i,r,s,a){return KM(i,r,s,a)}(t,n.canvas??(T0()?void 0:document.createElement("canvas")),e,n)}function D0(t,e,n,i){if(t.U){const s=new e0;if(n!=null&&n.regionOfInterest){if(!t.oa)throw Error("This task doesn't support region-of-interest.");var r=n.regionOfInterest;if(r.left>=r.right||r.top>=r.bottom)throw Error("Expected RectF with left < right and top < bottom.");if(r.left<0||r.top<0||r.right>1||r.bottom>1)throw Error("Expected RectF values to be in [0,1].");Ce(s,1,(r.left+r.right)/2),Ce(s,2,(r.top+r.bottom)/2),Ce(s,4,r.right-r.left),Ce(s,3,r.bottom-r.top)}else Ce(s,1,.5),Ce(s,2,.5),Ce(s,4,1),Ce(s,3,1);if(n!=null&&n.rotationDegrees){if((n==null?void 0:n.rotationDegrees)%90!=0)throw Error("Expected rotation to be a multiple of 90°.");if(Ce(s,5,-Math.PI*n.rotationDegrees/180),(n==null?void 0:n.rotationDegrees)%180!=0){const[a,o]=A0(e);n=Lt(s,3)*o/a,r=Lt(s,4)*a/o,Ce(s,4,n),Ce(s,3,r)}}t.g.addProtoToStream(s.g(),"mediapipe.NormalizedRect",t.U,i)}t.g.pa(e,t.X,i??performance.now()),t.finishProcessing()}function Zn(t,e,n){var i;if((i=t.baseOptions)!=null&&i.g())throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");D0(t,e,n,t.C+1)}function vi(t,e,n,i){var r;if(!((r=t.baseOptions)!=null&&r.g()))throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");D0(t,e,n,i)}function Ms(t,e,n,i){var r=e.data;const s=e.width,a=s*(e=e.height);if((r instanceof Uint8Array||r instanceof Float32Array)&&r.length!==a)throw Error("Unsupported channel count: "+r.length/a);return t=new qt([r],n,!1,t.g.i.canvas,t.P,s,e),i?t.clone():t}var Pn=class extends hu{constructor(t,e,n,i){super(t),this.g=t,this.X=e,this.U=n,this.oa=i,this.P=new C0}l(t,e=!0){if("runningMode"in t&&ct(this.baseOptions,2,ha(!!t.runningMode&&t.runningMode!=="IMAGE")),t.canvas!==void 0&&this.g.i.canvas!==t.canvas)throw Error("You must create a new task to reset the canvas.");return super.l(t,e)}close(){this.P.close(),super.close()}};Pn.prototype.close=Pn.prototype.close;var Un=class extends Pn{constructor(t,e){super(new Kn(t,e),"image_in","norm_rect_in",!1),this.j={detections:[]},Le(t=this.h=new nc,0,1,e=new Rt),Ce(this.h,2,.5),Ce(this.h,3,.3)}get baseOptions(){return et(this.h,Rt,1)}set baseOptions(t){Le(this.h,0,1,t)}o(t){return"minDetectionConfidence"in t&&Ce(this.h,2,t.minDetectionConfidence??.5),"minSuppressionThreshold"in t&&Ce(this.h,3,t.minSuppressionThreshold??.3),this.l(t)}F(t,e){return this.j={detections:[]},Zn(this,t,e),this.j}G(t,e,n){return this.j={detections:[]},vi(this,t,n,e),this.j}m(){var t=new In;bt(t,"image_in"),bt(t,"norm_rect_in"),tt(t,"detections");const e=new Ln;gi(e,NM,this.h);const n=new gn;Cn(n,2,"mediapipe.tasks.vision.face_detector.FaceDetectorGraph"),xt(n,"IMAGE:image_in"),xt(n,"NORM_RECT:norm_rect_in"),Ye(n,"DETECTIONS:detections"),n.o(e),Vn(t,n),this.g.attachProtoVectorListener("detections",(i,r)=>{for(const s of i)i=Zm(s),this.j.detections.push(y0(i));me(this,r)}),this.g.attachEmptyPacketListener("detections",i=>{me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};Un.prototype.detectForVideo=Un.prototype.G,Un.prototype.detect=Un.prototype.F,Un.prototype.setOptions=Un.prototype.o,Un.createFromModelPath=async function(t,e){return Ze(Un,t,{baseOptions:{modelAssetPath:e}})},Un.createFromModelBuffer=function(t,e){return Ze(Un,t,{baseOptions:{modelAssetBuffer:e}})},Un.createFromOptions=function(t,e){return Ze(Un,t,e)};var bh=jn([61,146],[146,91],[91,181],[181,84],[84,17],[17,314],[314,405],[405,321],[321,375],[375,291],[61,185],[185,40],[40,39],[39,37],[37,0],[0,267],[267,269],[269,270],[270,409],[409,291],[78,95],[95,88],[88,178],[178,87],[87,14],[14,317],[317,402],[402,318],[318,324],[324,308],[78,191],[191,80],[80,81],[81,82],[82,13],[13,312],[312,311],[311,310],[310,415],[415,308]),Th=jn([263,249],[249,390],[390,373],[373,374],[374,380],[380,381],[381,382],[382,362],[263,466],[466,388],[388,387],[387,386],[386,385],[385,384],[384,398],[398,362]),Ah=jn([276,283],[283,282],[282,295],[295,285],[300,293],[293,334],[334,296],[296,336]),U0=jn([474,475],[475,476],[476,477],[477,474]),wh=jn([33,7],[7,163],[163,144],[144,145],[145,153],[153,154],[154,155],[155,133],[33,246],[246,161],[161,160],[160,159],[159,158],[158,157],[157,173],[173,133]),Rh=jn([46,53],[53,52],[52,65],[65,55],[70,63],[63,105],[105,66],[66,107]),N0=jn([469,470],[470,471],[471,472],[472,469]),Ch=jn([10,338],[338,297],[297,332],[332,284],[284,251],[251,389],[389,356],[356,454],[454,323],[323,361],[361,288],[288,397],[397,365],[365,379],[379,378],[378,400],[400,377],[377,152],[152,148],[148,176],[176,149],[149,150],[150,136],[136,172],[172,58],[58,132],[132,93],[93,234],[234,127],[127,162],[162,21],[21,54],[54,103],[103,67],[67,109],[109,10]),F0=[...bh,...Th,...Ah,...wh,...Rh,...Ch],O0=jn([127,34],[34,139],[139,127],[11,0],[0,37],[37,11],[232,231],[231,120],[120,232],[72,37],[37,39],[39,72],[128,121],[121,47],[47,128],[232,121],[121,128],[128,232],[104,69],[69,67],[67,104],[175,171],[171,148],[148,175],[118,50],[50,101],[101,118],[73,39],[39,40],[40,73],[9,151],[151,108],[108,9],[48,115],[115,131],[131,48],[194,204],[204,211],[211,194],[74,40],[40,185],[185,74],[80,42],[42,183],[183,80],[40,92],[92,186],[186,40],[230,229],[229,118],[118,230],[202,212],[212,214],[214,202],[83,18],[18,17],[17,83],[76,61],[61,146],[146,76],[160,29],[29,30],[30,160],[56,157],[157,173],[173,56],[106,204],[204,194],[194,106],[135,214],[214,192],[192,135],[203,165],[165,98],[98,203],[21,71],[71,68],[68,21],[51,45],[45,4],[4,51],[144,24],[24,23],[23,144],[77,146],[146,91],[91,77],[205,50],[50,187],[187,205],[201,200],[200,18],[18,201],[91,106],[106,182],[182,91],[90,91],[91,181],[181,90],[85,84],[84,17],[17,85],[206,203],[203,36],[36,206],[148,171],[171,140],[140,148],[92,40],[40,39],[39,92],[193,189],[189,244],[244,193],[159,158],[158,28],[28,159],[247,246],[246,161],[161,247],[236,3],[3,196],[196,236],[54,68],[68,104],[104,54],[193,168],[168,8],[8,193],[117,228],[228,31],[31,117],[189,193],[193,55],[55,189],[98,97],[97,99],[99,98],[126,47],[47,100],[100,126],[166,79],[79,218],[218,166],[155,154],[154,26],[26,155],[209,49],[49,131],[131,209],[135,136],[136,150],[150,135],[47,126],[126,217],[217,47],[223,52],[52,53],[53,223],[45,51],[51,134],[134,45],[211,170],[170,140],[140,211],[67,69],[69,108],[108,67],[43,106],[106,91],[91,43],[230,119],[119,120],[120,230],[226,130],[130,247],[247,226],[63,53],[53,52],[52,63],[238,20],[20,242],[242,238],[46,70],[70,156],[156,46],[78,62],[62,96],[96,78],[46,53],[53,63],[63,46],[143,34],[34,227],[227,143],[123,117],[117,111],[111,123],[44,125],[125,19],[19,44],[236,134],[134,51],[51,236],[216,206],[206,205],[205,216],[154,153],[153,22],[22,154],[39,37],[37,167],[167,39],[200,201],[201,208],[208,200],[36,142],[142,100],[100,36],[57,212],[212,202],[202,57],[20,60],[60,99],[99,20],[28,158],[158,157],[157,28],[35,226],[226,113],[113,35],[160,159],[159,27],[27,160],[204,202],[202,210],[210,204],[113,225],[225,46],[46,113],[43,202],[202,204],[204,43],[62,76],[76,77],[77,62],[137,123],[123,116],[116,137],[41,38],[38,72],[72,41],[203,129],[129,142],[142,203],[64,98],[98,240],[240,64],[49,102],[102,64],[64,49],[41,73],[73,74],[74,41],[212,216],[216,207],[207,212],[42,74],[74,184],[184,42],[169,170],[170,211],[211,169],[170,149],[149,176],[176,170],[105,66],[66,69],[69,105],[122,6],[6,168],[168,122],[123,147],[147,187],[187,123],[96,77],[77,90],[90,96],[65,55],[55,107],[107,65],[89,90],[90,180],[180,89],[101,100],[100,120],[120,101],[63,105],[105,104],[104,63],[93,137],[137,227],[227,93],[15,86],[86,85],[85,15],[129,102],[102,49],[49,129],[14,87],[87,86],[86,14],[55,8],[8,9],[9,55],[100,47],[47,121],[121,100],[145,23],[23,22],[22,145],[88,89],[89,179],[179,88],[6,122],[122,196],[196,6],[88,95],[95,96],[96,88],[138,172],[172,136],[136,138],[215,58],[58,172],[172,215],[115,48],[48,219],[219,115],[42,80],[80,81],[81,42],[195,3],[3,51],[51,195],[43,146],[146,61],[61,43],[171,175],[175,199],[199,171],[81,82],[82,38],[38,81],[53,46],[46,225],[225,53],[144,163],[163,110],[110,144],[52,65],[65,66],[66,52],[229,228],[228,117],[117,229],[34,127],[127,234],[234,34],[107,108],[108,69],[69,107],[109,108],[108,151],[151,109],[48,64],[64,235],[235,48],[62,78],[78,191],[191,62],[129,209],[209,126],[126,129],[111,35],[35,143],[143,111],[117,123],[123,50],[50,117],[222,65],[65,52],[52,222],[19,125],[125,141],[141,19],[221,55],[55,65],[65,221],[3,195],[195,197],[197,3],[25,7],[7,33],[33,25],[220,237],[237,44],[44,220],[70,71],[71,139],[139,70],[122,193],[193,245],[245,122],[247,130],[130,33],[33,247],[71,21],[21,162],[162,71],[170,169],[169,150],[150,170],[188,174],[174,196],[196,188],[216,186],[186,92],[92,216],[2,97],[97,167],[167,2],[141,125],[125,241],[241,141],[164,167],[167,37],[37,164],[72,38],[38,12],[12,72],[38,82],[82,13],[13,38],[63,68],[68,71],[71,63],[226,35],[35,111],[111,226],[101,50],[50,205],[205,101],[206,92],[92,165],[165,206],[209,198],[198,217],[217,209],[165,167],[167,97],[97,165],[220,115],[115,218],[218,220],[133,112],[112,243],[243,133],[239,238],[238,241],[241,239],[214,135],[135,169],[169,214],[190,173],[173,133],[133,190],[171,208],[208,32],[32,171],[125,44],[44,237],[237,125],[86,87],[87,178],[178,86],[85,86],[86,179],[179,85],[84,85],[85,180],[180,84],[83,84],[84,181],[181,83],[201,83],[83,182],[182,201],[137,93],[93,132],[132,137],[76,62],[62,183],[183,76],[61,76],[76,184],[184,61],[57,61],[61,185],[185,57],[212,57],[57,186],[186,212],[214,207],[207,187],[187,214],[34,143],[143,156],[156,34],[79,239],[239,237],[237,79],[123,137],[137,177],[177,123],[44,1],[1,4],[4,44],[201,194],[194,32],[32,201],[64,102],[102,129],[129,64],[213,215],[215,138],[138,213],[59,166],[166,219],[219,59],[242,99],[99,97],[97,242],[2,94],[94,141],[141,2],[75,59],[59,235],[235,75],[24,110],[110,228],[228,24],[25,130],[130,226],[226,25],[23,24],[24,229],[229,23],[22,23],[23,230],[230,22],[26,22],[22,231],[231,26],[112,26],[26,232],[232,112],[189,190],[190,243],[243,189],[221,56],[56,190],[190,221],[28,56],[56,221],[221,28],[27,28],[28,222],[222,27],[29,27],[27,223],[223,29],[30,29],[29,224],[224,30],[247,30],[30,225],[225,247],[238,79],[79,20],[20,238],[166,59],[59,75],[75,166],[60,75],[75,240],[240,60],[147,177],[177,215],[215,147],[20,79],[79,166],[166,20],[187,147],[147,213],[213,187],[112,233],[233,244],[244,112],[233,128],[128,245],[245,233],[128,114],[114,188],[188,128],[114,217],[217,174],[174,114],[131,115],[115,220],[220,131],[217,198],[198,236],[236,217],[198,131],[131,134],[134,198],[177,132],[132,58],[58,177],[143,35],[35,124],[124,143],[110,163],[163,7],[7,110],[228,110],[110,25],[25,228],[356,389],[389,368],[368,356],[11,302],[302,267],[267,11],[452,350],[350,349],[349,452],[302,303],[303,269],[269,302],[357,343],[343,277],[277,357],[452,453],[453,357],[357,452],[333,332],[332,297],[297,333],[175,152],[152,377],[377,175],[347,348],[348,330],[330,347],[303,304],[304,270],[270,303],[9,336],[336,337],[337,9],[278,279],[279,360],[360,278],[418,262],[262,431],[431,418],[304,408],[408,409],[409,304],[310,415],[415,407],[407,310],[270,409],[409,410],[410,270],[450,348],[348,347],[347,450],[422,430],[430,434],[434,422],[313,314],[314,17],[17,313],[306,307],[307,375],[375,306],[387,388],[388,260],[260,387],[286,414],[414,398],[398,286],[335,406],[406,418],[418,335],[364,367],[367,416],[416,364],[423,358],[358,327],[327,423],[251,284],[284,298],[298,251],[281,5],[5,4],[4,281],[373,374],[374,253],[253,373],[307,320],[320,321],[321,307],[425,427],[427,411],[411,425],[421,313],[313,18],[18,421],[321,405],[405,406],[406,321],[320,404],[404,405],[405,320],[315,16],[16,17],[17,315],[426,425],[425,266],[266,426],[377,400],[400,369],[369,377],[322,391],[391,269],[269,322],[417,465],[465,464],[464,417],[386,257],[257,258],[258,386],[466,260],[260,388],[388,466],[456,399],[399,419],[419,456],[284,332],[332,333],[333,284],[417,285],[285,8],[8,417],[346,340],[340,261],[261,346],[413,441],[441,285],[285,413],[327,460],[460,328],[328,327],[355,371],[371,329],[329,355],[392,439],[439,438],[438,392],[382,341],[341,256],[256,382],[429,420],[420,360],[360,429],[364,394],[394,379],[379,364],[277,343],[343,437],[437,277],[443,444],[444,283],[283,443],[275,440],[440,363],[363,275],[431,262],[262,369],[369,431],[297,338],[338,337],[337,297],[273,375],[375,321],[321,273],[450,451],[451,349],[349,450],[446,342],[342,467],[467,446],[293,334],[334,282],[282,293],[458,461],[461,462],[462,458],[276,353],[353,383],[383,276],[308,324],[324,325],[325,308],[276,300],[300,293],[293,276],[372,345],[345,447],[447,372],[352,345],[345,340],[340,352],[274,1],[1,19],[19,274],[456,248],[248,281],[281,456],[436,427],[427,425],[425,436],[381,256],[256,252],[252,381],[269,391],[391,393],[393,269],[200,199],[199,428],[428,200],[266,330],[330,329],[329,266],[287,273],[273,422],[422,287],[250,462],[462,328],[328,250],[258,286],[286,384],[384,258],[265,353],[353,342],[342,265],[387,259],[259,257],[257,387],[424,431],[431,430],[430,424],[342,353],[353,276],[276,342],[273,335],[335,424],[424,273],[292,325],[325,307],[307,292],[366,447],[447,345],[345,366],[271,303],[303,302],[302,271],[423,266],[266,371],[371,423],[294,455],[455,460],[460,294],[279,278],[278,294],[294,279],[271,272],[272,304],[304,271],[432,434],[434,427],[427,432],[272,407],[407,408],[408,272],[394,430],[430,431],[431,394],[395,369],[369,400],[400,395],[334,333],[333,299],[299,334],[351,417],[417,168],[168,351],[352,280],[280,411],[411,352],[325,319],[319,320],[320,325],[295,296],[296,336],[336,295],[319,403],[403,404],[404,319],[330,348],[348,349],[349,330],[293,298],[298,333],[333,293],[323,454],[454,447],[447,323],[15,16],[16,315],[315,15],[358,429],[429,279],[279,358],[14,15],[15,316],[316,14],[285,336],[336,9],[9,285],[329,349],[349,350],[350,329],[374,380],[380,252],[252,374],[318,402],[402,403],[403,318],[6,197],[197,419],[419,6],[318,319],[319,325],[325,318],[367,364],[364,365],[365,367],[435,367],[367,397],[397,435],[344,438],[438,439],[439,344],[272,271],[271,311],[311,272],[195,5],[5,281],[281,195],[273,287],[287,291],[291,273],[396,428],[428,199],[199,396],[311,271],[271,268],[268,311],[283,444],[444,445],[445,283],[373,254],[254,339],[339,373],[282,334],[334,296],[296,282],[449,347],[347,346],[346,449],[264,447],[447,454],[454,264],[336,296],[296,299],[299,336],[338,10],[10,151],[151,338],[278,439],[439,455],[455,278],[292,407],[407,415],[415,292],[358,371],[371,355],[355,358],[340,345],[345,372],[372,340],[346,347],[347,280],[280,346],[442,443],[443,282],[282,442],[19,94],[94,370],[370,19],[441,442],[442,295],[295,441],[248,419],[419,197],[197,248],[263,255],[255,359],[359,263],[440,275],[275,274],[274,440],[300,383],[383,368],[368,300],[351,412],[412,465],[465,351],[263,467],[467,466],[466,263],[301,368],[368,389],[389,301],[395,378],[378,379],[379,395],[412,351],[351,419],[419,412],[436,426],[426,322],[322,436],[2,164],[164,393],[393,2],[370,462],[462,461],[461,370],[164,0],[0,267],[267,164],[302,11],[11,12],[12,302],[268,12],[12,13],[13,268],[293,300],[300,301],[301,293],[446,261],[261,340],[340,446],[330,266],[266,425],[425,330],[426,423],[423,391],[391,426],[429,355],[355,437],[437,429],[391,327],[327,326],[326,391],[440,457],[457,438],[438,440],[341,382],[382,362],[362,341],[459,457],[457,461],[461,459],[434,430],[430,394],[394,434],[414,463],[463,362],[362,414],[396,369],[369,262],[262,396],[354,461],[461,457],[457,354],[316,403],[403,402],[402,316],[315,404],[404,403],[403,315],[314,405],[405,404],[404,314],[313,406],[406,405],[405,313],[421,418],[418,406],[406,421],[366,401],[401,361],[361,366],[306,408],[408,407],[407,306],[291,409],[409,408],[408,291],[287,410],[410,409],[409,287],[432,436],[436,410],[410,432],[434,416],[416,411],[411,434],[264,368],[368,383],[383,264],[309,438],[438,457],[457,309],[352,376],[376,401],[401,352],[274,275],[275,4],[4,274],[421,428],[428,262],[262,421],[294,327],[327,358],[358,294],[433,416],[416,367],[367,433],[289,455],[455,439],[439,289],[462,370],[370,326],[326,462],[2,326],[326,370],[370,2],[305,460],[460,455],[455,305],[254,449],[449,448],[448,254],[255,261],[261,446],[446,255],[253,450],[450,449],[449,253],[252,451],[451,450],[450,252],[256,452],[452,451],[451,256],[341,453],[453,452],[452,341],[413,464],[464,463],[463,413],[441,413],[413,414],[414,441],[258,442],[442,441],[441,258],[257,443],[443,442],[442,257],[259,444],[444,443],[443,259],[260,445],[445,444],[444,260],[467,342],[342,445],[445,467],[459,458],[458,250],[250,459],[289,392],[392,290],[290,289],[290,328],[328,460],[460,290],[376,433],[433,435],[435,376],[250,290],[290,392],[392,250],[411,416],[416,433],[433,411],[341,463],[463,464],[464,341],[453,464],[464,465],[465,453],[357,465],[465,412],[412,357],[343,412],[412,399],[399,343],[360,363],[363,440],[440,360],[437,399],[399,456],[456,437],[420,456],[456,363],[363,420],[401,435],[435,288],[288,401],[372,383],[383,353],[353,372],[339,255],[255,249],[249,339],[448,261],[261,255],[255,448],[133,243],[243,190],[190,133],[133,155],[155,112],[112,133],[33,246],[246,247],[247,33],[33,130],[130,25],[25,33],[398,384],[384,286],[286,398],[362,398],[398,414],[414,362],[362,463],[463,341],[341,362],[263,359],[359,467],[467,263],[263,249],[249,255],[255,263],[466,467],[467,260],[260,466],[75,60],[60,166],[166,75],[238,239],[239,79],[79,238],[162,127],[127,139],[139,162],[72,11],[11,37],[37,72],[121,232],[232,120],[120,121],[73,72],[72,39],[39,73],[114,128],[128,47],[47,114],[233,232],[232,128],[128,233],[103,104],[104,67],[67,103],[152,175],[175,148],[148,152],[119,118],[118,101],[101,119],[74,73],[73,40],[40,74],[107,9],[9,108],[108,107],[49,48],[48,131],[131,49],[32,194],[194,211],[211,32],[184,74],[74,185],[185,184],[191,80],[80,183],[183,191],[185,40],[40,186],[186,185],[119,230],[230,118],[118,119],[210,202],[202,214],[214,210],[84,83],[83,17],[17,84],[77,76],[76,146],[146,77],[161,160],[160,30],[30,161],[190,56],[56,173],[173,190],[182,106],[106,194],[194,182],[138,135],[135,192],[192,138],[129,203],[203,98],[98,129],[54,21],[21,68],[68,54],[5,51],[51,4],[4,5],[145,144],[144,23],[23,145],[90,77],[77,91],[91,90],[207,205],[205,187],[187,207],[83,201],[201,18],[18,83],[181,91],[91,182],[182,181],[180,90],[90,181],[181,180],[16,85],[85,17],[17,16],[205,206],[206,36],[36,205],[176,148],[148,140],[140,176],[165,92],[92,39],[39,165],[245,193],[193,244],[244,245],[27,159],[159,28],[28,27],[30,247],[247,161],[161,30],[174,236],[236,196],[196,174],[103,54],[54,104],[104,103],[55,193],[193,8],[8,55],[111,117],[117,31],[31,111],[221,189],[189,55],[55,221],[240,98],[98,99],[99,240],[142,126],[126,100],[100,142],[219,166],[166,218],[218,219],[112,155],[155,26],[26,112],[198,209],[209,131],[131,198],[169,135],[135,150],[150,169],[114,47],[47,217],[217,114],[224,223],[223,53],[53,224],[220,45],[45,134],[134,220],[32,211],[211,140],[140,32],[109,67],[67,108],[108,109],[146,43],[43,91],[91,146],[231,230],[230,120],[120,231],[113,226],[226,247],[247,113],[105,63],[63,52],[52,105],[241,238],[238,242],[242,241],[124,46],[46,156],[156,124],[95,78],[78,96],[96,95],[70,46],[46,63],[63,70],[116,143],[143,227],[227,116],[116,123],[123,111],[111,116],[1,44],[44,19],[19,1],[3,236],[236,51],[51,3],[207,216],[216,205],[205,207],[26,154],[154,22],[22,26],[165,39],[39,167],[167,165],[199,200],[200,208],[208,199],[101,36],[36,100],[100,101],[43,57],[57,202],[202,43],[242,20],[20,99],[99,242],[56,28],[28,157],[157,56],[124,35],[35,113],[113,124],[29,160],[160,27],[27,29],[211,204],[204,210],[210,211],[124,113],[113,46],[46,124],[106,43],[43,204],[204,106],[96,62],[62,77],[77,96],[227,137],[137,116],[116,227],[73,41],[41,72],[72,73],[36,203],[203,142],[142,36],[235,64],[64,240],[240,235],[48,49],[49,64],[64,48],[42,41],[41,74],[74,42],[214,212],[212,207],[207,214],[183,42],[42,184],[184,183],[210,169],[169,211],[211,210],[140,170],[170,176],[176,140],[104,105],[105,69],[69,104],[193,122],[122,168],[168,193],[50,123],[123,187],[187,50],[89,96],[96,90],[90,89],[66,65],[65,107],[107,66],[179,89],[89,180],[180,179],[119,101],[101,120],[120,119],[68,63],[63,104],[104,68],[234,93],[93,227],[227,234],[16,15],[15,85],[85,16],[209,129],[129,49],[49,209],[15,14],[14,86],[86,15],[107,55],[55,9],[9,107],[120,100],[100,121],[121,120],[153,145],[145,22],[22,153],[178,88],[88,179],[179,178],[197,6],[6,196],[196,197],[89,88],[88,96],[96,89],[135,138],[138,136],[136,135],[138,215],[215,172],[172,138],[218,115],[115,219],[219,218],[41,42],[42,81],[81,41],[5,195],[195,51],[51,5],[57,43],[43,61],[61,57],[208,171],[171,199],[199,208],[41,81],[81,38],[38,41],[224,53],[53,225],[225,224],[24,144],[144,110],[110,24],[105,52],[52,66],[66,105],[118,229],[229,117],[117,118],[227,34],[34,234],[234,227],[66,107],[107,69],[69,66],[10,109],[109,151],[151,10],[219,48],[48,235],[235,219],[183,62],[62,191],[191,183],[142,129],[129,126],[126,142],[116,111],[111,143],[143,116],[118,117],[117,50],[50,118],[223,222],[222,52],[52,223],[94,19],[19,141],[141,94],[222,221],[221,65],[65,222],[196,3],[3,197],[197,196],[45,220],[220,44],[44,45],[156,70],[70,139],[139,156],[188,122],[122,245],[245,188],[139,71],[71,162],[162,139],[149,170],[170,150],[150,149],[122,188],[188,196],[196,122],[206,216],[216,92],[92,206],[164,2],[2,167],[167,164],[242,141],[141,241],[241,242],[0,164],[164,37],[37,0],[11,72],[72,12],[12,11],[12,38],[38,13],[13,12],[70,63],[63,71],[71,70],[31,226],[226,111],[111,31],[36,101],[101,205],[205,36],[203,206],[206,165],[165,203],[126,209],[209,217],[217,126],[98,165],[165,97],[97,98],[237,220],[220,218],[218,237],[237,239],[239,241],[241,237],[210,214],[214,169],[169,210],[140,171],[171,32],[32,140],[241,125],[125,237],[237,241],[179,86],[86,178],[178,179],[180,85],[85,179],[179,180],[181,84],[84,180],[180,181],[182,83],[83,181],[181,182],[194,201],[201,182],[182,194],[177,137],[137,132],[132,177],[184,76],[76,183],[183,184],[185,61],[61,184],[184,185],[186,57],[57,185],[185,186],[216,212],[212,186],[186,216],[192,214],[214,187],[187,192],[139,34],[34,156],[156,139],[218,79],[79,237],[237,218],[147,123],[123,177],[177,147],[45,44],[44,4],[4,45],[208,201],[201,32],[32,208],[98,64],[64,129],[129,98],[192,213],[213,138],[138,192],[235,59],[59,219],[219,235],[141,242],[242,97],[97,141],[97,2],[2,141],[141,97],[240,75],[75,235],[235,240],[229,24],[24,228],[228,229],[31,25],[25,226],[226,31],[230,23],[23,229],[229,230],[231,22],[22,230],[230,231],[232,26],[26,231],[231,232],[233,112],[112,232],[232,233],[244,189],[189,243],[243,244],[189,221],[221,190],[190,189],[222,28],[28,221],[221,222],[223,27],[27,222],[222,223],[224,29],[29,223],[223,224],[225,30],[30,224],[224,225],[113,247],[247,225],[225,113],[99,60],[60,240],[240,99],[213,147],[147,215],[215,213],[60,20],[20,166],[166,60],[192,187],[187,213],[213,192],[243,112],[112,244],[244,243],[244,233],[233,245],[245,244],[245,128],[128,188],[188,245],[188,114],[114,174],[174,188],[134,131],[131,220],[220,134],[174,217],[217,236],[236,174],[236,198],[198,134],[134,236],[215,177],[177,58],[58,215],[156,143],[143,124],[124,156],[25,110],[110,7],[7,25],[31,228],[228,25],[25,31],[264,356],[356,368],[368,264],[0,11],[11,267],[267,0],[451,452],[452,349],[349,451],[267,302],[302,269],[269,267],[350,357],[357,277],[277,350],[350,452],[452,357],[357,350],[299,333],[333,297],[297,299],[396,175],[175,377],[377,396],[280,347],[347,330],[330,280],[269,303],[303,270],[270,269],[151,9],[9,337],[337,151],[344,278],[278,360],[360,344],[424,418],[418,431],[431,424],[270,304],[304,409],[409,270],[272,310],[310,407],[407,272],[322,270],[270,410],[410,322],[449,450],[450,347],[347,449],[432,422],[422,434],[434,432],[18,313],[313,17],[17,18],[291,306],[306,375],[375,291],[259,387],[387,260],[260,259],[424,335],[335,418],[418,424],[434,364],[364,416],[416,434],[391,423],[423,327],[327,391],[301,251],[251,298],[298,301],[275,281],[281,4],[4,275],[254,373],[373,253],[253,254],[375,307],[307,321],[321,375],[280,425],[425,411],[411,280],[200,421],[421,18],[18,200],[335,321],[321,406],[406,335],[321,320],[320,405],[405,321],[314,315],[315,17],[17,314],[423,426],[426,266],[266,423],[396,377],[377,369],[369,396],[270,322],[322,269],[269,270],[413,417],[417,464],[464,413],[385,386],[386,258],[258,385],[248,456],[456,419],[419,248],[298,284],[284,333],[333,298],[168,417],[417,8],[8,168],[448,346],[346,261],[261,448],[417,413],[413,285],[285,417],[326,327],[327,328],[328,326],[277,355],[355,329],[329,277],[309,392],[392,438],[438,309],[381,382],[382,256],[256,381],[279,429],[429,360],[360,279],[365,364],[364,379],[379,365],[355,277],[277,437],[437,355],[282,443],[443,283],[283,282],[281,275],[275,363],[363,281],[395,431],[431,369],[369,395],[299,297],[297,337],[337,299],[335,273],[273,321],[321,335],[348,450],[450,349],[349,348],[359,446],[446,467],[467,359],[283,293],[293,282],[282,283],[250,458],[458,462],[462,250],[300,276],[276,383],[383,300],[292,308],[308,325],[325,292],[283,276],[276,293],[293,283],[264,372],[372,447],[447,264],[346,352],[352,340],[340,346],[354,274],[274,19],[19,354],[363,456],[456,281],[281,363],[426,436],[436,425],[425,426],[380,381],[381,252],[252,380],[267,269],[269,393],[393,267],[421,200],[200,428],[428,421],[371,266],[266,329],[329,371],[432,287],[287,422],[422,432],[290,250],[250,328],[328,290],[385,258],[258,384],[384,385],[446,265],[265,342],[342,446],[386,387],[387,257],[257,386],[422,424],[424,430],[430,422],[445,342],[342,276],[276,445],[422,273],[273,424],[424,422],[306,292],[292,307],[307,306],[352,366],[366,345],[345,352],[268,271],[271,302],[302,268],[358,423],[423,371],[371,358],[327,294],[294,460],[460,327],[331,279],[279,294],[294,331],[303,271],[271,304],[304,303],[436,432],[432,427],[427,436],[304,272],[272,408],[408,304],[395,394],[394,431],[431,395],[378,395],[395,400],[400,378],[296,334],[334,299],[299,296],[6,351],[351,168],[168,6],[376,352],[352,411],[411,376],[307,325],[325,320],[320,307],[285,295],[295,336],[336,285],[320,319],[319,404],[404,320],[329,330],[330,349],[349,329],[334,293],[293,333],[333,334],[366,323],[323,447],[447,366],[316,15],[15,315],[315,316],[331,358],[358,279],[279,331],[317,14],[14,316],[316,317],[8,285],[285,9],[9,8],[277,329],[329,350],[350,277],[253,374],[374,252],[252,253],[319,318],[318,403],[403,319],[351,6],[6,419],[419,351],[324,318],[318,325],[325,324],[397,367],[367,365],[365,397],[288,435],[435,397],[397,288],[278,344],[344,439],[439,278],[310,272],[272,311],[311,310],[248,195],[195,281],[281,248],[375,273],[273,291],[291,375],[175,396],[396,199],[199,175],[312,311],[311,268],[268,312],[276,283],[283,445],[445,276],[390,373],[373,339],[339,390],[295,282],[282,296],[296,295],[448,449],[449,346],[346,448],[356,264],[264,454],[454,356],[337,336],[336,299],[299,337],[337,338],[338,151],[151,337],[294,278],[278,455],[455,294],[308,292],[292,415],[415,308],[429,358],[358,355],[355,429],[265,340],[340,372],[372,265],[352,346],[346,280],[280,352],[295,442],[442,282],[282,295],[354,19],[19,370],[370,354],[285,441],[441,295],[295,285],[195,248],[248,197],[197,195],[457,440],[440,274],[274,457],[301,300],[300,368],[368,301],[417,351],[351,465],[465,417],[251,301],[301,389],[389,251],[394,395],[395,379],[379,394],[399,412],[412,419],[419,399],[410,436],[436,322],[322,410],[326,2],[2,393],[393,326],[354,370],[370,461],[461,354],[393,164],[164,267],[267,393],[268,302],[302,12],[12,268],[312,268],[268,13],[13,312],[298,293],[293,301],[301,298],[265,446],[446,340],[340,265],[280,330],[330,425],[425,280],[322,426],[426,391],[391,322],[420,429],[429,437],[437,420],[393,391],[391,326],[326,393],[344,440],[440,438],[438,344],[458,459],[459,461],[461,458],[364,434],[434,394],[394,364],[428,396],[396,262],[262,428],[274,354],[354,457],[457,274],[317,316],[316,402],[402,317],[316,315],[315,403],[403,316],[315,314],[314,404],[404,315],[314,313],[313,405],[405,314],[313,421],[421,406],[406,313],[323,366],[366,361],[361,323],[292,306],[306,407],[407,292],[306,291],[291,408],[408,306],[291,287],[287,409],[409,291],[287,432],[432,410],[410,287],[427,434],[434,411],[411,427],[372,264],[264,383],[383,372],[459,309],[309,457],[457,459],[366,352],[352,401],[401,366],[1,274],[274,4],[4,1],[418,421],[421,262],[262,418],[331,294],[294,358],[358,331],[435,433],[433,367],[367,435],[392,289],[289,439],[439,392],[328,462],[462,326],[326,328],[94,2],[2,370],[370,94],[289,305],[305,455],[455,289],[339,254],[254,448],[448,339],[359,255],[255,446],[446,359],[254,253],[253,449],[449,254],[253,252],[252,450],[450,253],[252,256],[256,451],[451,252],[256,341],[341,452],[452,256],[414,413],[413,463],[463,414],[286,441],[441,414],[414,286],[286,258],[258,441],[441,286],[258,257],[257,442],[442,258],[257,259],[259,443],[443,257],[259,260],[260,444],[444,259],[260,467],[467,445],[445,260],[309,459],[459,250],[250,309],[305,289],[289,290],[290,305],[305,290],[290,460],[460,305],[401,376],[376,435],[435,401],[309,250],[250,392],[392,309],[376,411],[411,433],[433,376],[453,341],[341,464],[464,453],[357,453],[453,465],[465,357],[343,357],[357,412],[412,343],[437,343],[343,399],[399,437],[344,360],[360,440],[440,344],[420,437],[437,456],[456,420],[360,420],[420,363],[363,360],[361,401],[401,288],[288,361],[265,372],[372,353],[353,265],[390,339],[339,249],[249,390],[339,448],[448,255],[255,339]);function Dd(t){t.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]}}var At=class extends Pn{constructor(t,e){super(new Kn(t,e),"image_in","norm_rect",!1),this.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]},this.outputFacialTransformationMatrixes=this.outputFaceBlendshapes=!1,Le(t=this.h=new s0,0,1,e=new Rt),this.A=new r0,Le(this.h,0,3,this.A),this.u=new nc,Le(this.h,0,2,this.u),Bi(this.u,4,1),Ce(this.u,2,.5),Ce(this.A,2,.5),Ce(this.h,4,.5)}get baseOptions(){return et(this.h,Rt,1)}set baseOptions(t){Le(this.h,0,1,t)}o(t){return"numFaces"in t&&Bi(this.u,4,t.numFaces??1),"minFaceDetectionConfidence"in t&&Ce(this.u,2,t.minFaceDetectionConfidence??.5),"minTrackingConfidence"in t&&Ce(this.h,4,t.minTrackingConfidence??.5),"minFacePresenceConfidence"in t&&Ce(this.A,2,t.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in t&&(this.outputFaceBlendshapes=!!t.outputFaceBlendshapes),"outputFacialTransformationMatrixes"in t&&(this.outputFacialTransformationMatrixes=!!t.outputFacialTransformationMatrixes),this.l(t)}F(t,e){return Dd(this),Zn(this,t,e),this.j}G(t,e,n){return Dd(this),vi(this,t,n,e),this.j}m(){var t=new In;bt(t,"image_in"),bt(t,"norm_rect"),tt(t,"face_landmarks");const e=new Ln;gi(e,OM,this.h);const n=new gn;Cn(n,2,"mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"),xt(n,"IMAGE:image_in"),xt(n,"NORM_RECT:norm_rect"),Ye(n,"NORM_LANDMARKS:face_landmarks"),n.o(e),Vn(t,n),this.g.attachProtoVectorListener("face_landmarks",(i,r)=>{for(const s of i)i=ba(s),this.j.faceLandmarks.push(ic(i));me(this,r)}),this.g.attachEmptyPacketListener("face_landmarks",i=>{me(this,i)}),this.outputFaceBlendshapes&&(tt(t,"blendshapes"),Ye(n,"BLENDSHAPES:blendshapes"),this.g.attachProtoVectorListener("blendshapes",(i,r)=>{if(this.outputFaceBlendshapes)for(const s of i)i=tc(s),this.j.faceBlendshapes.push(Sh(i.g()??[]));me(this,r)}),this.g.attachEmptyPacketListener("blendshapes",i=>{me(this,i)})),this.outputFacialTransformationMatrixes&&(tt(t,"face_geometry"),Ye(n,"FACE_GEOMETRY:face_geometry"),this.g.attachProtoVectorListener("face_geometry",(i,r)=>{if(this.outputFacialTransformationMatrixes)for(const s of i)(i=et(i=FM(s),wM,2))&&this.j.facialTransformationMatrixes.push({rows:Bn(i,1)??0??0,columns:Bn(i,2)??0??0,data:Sr(i,3,ai,Mr()).slice()??[]});me(this,r)}),this.g.attachEmptyPacketListener("face_geometry",i=>{me(this,i)})),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};At.prototype.detectForVideo=At.prototype.G,At.prototype.detect=At.prototype.F,At.prototype.setOptions=At.prototype.o,At.createFromModelPath=function(t,e){return Ze(At,t,{baseOptions:{modelAssetPath:e}})},At.createFromModelBuffer=function(t,e){return Ze(At,t,{baseOptions:{modelAssetBuffer:e}})},At.createFromOptions=function(t,e){return Ze(At,t,e)},At.FACE_LANDMARKS_LIPS=bh,At.FACE_LANDMARKS_LEFT_EYE=Th,At.FACE_LANDMARKS_LEFT_EYEBROW=Ah,At.FACE_LANDMARKS_LEFT_IRIS=U0,At.FACE_LANDMARKS_RIGHT_EYE=wh,At.FACE_LANDMARKS_RIGHT_EYEBROW=Rh,At.FACE_LANDMARKS_RIGHT_IRIS=N0,At.FACE_LANDMARKS_FACE_OVAL=Ch,At.FACE_LANDMARKS_CONTOURS=F0,At.FACE_LANDMARKS_TESSELATION=O0;var Ph=jn([0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]);function Ud(t){t.gestures=[],t.landmarks=[],t.worldLandmarks=[],t.handedness=[]}function Nd(t){return t.gestures.length===0?{gestures:[],landmarks:[],worldLandmarks:[],handedness:[],handednesses:[]}:{gestures:t.gestures,landmarks:t.landmarks,worldLandmarks:t.worldLandmarks,handedness:t.handedness,handednesses:t.handedness}}function Fd(t,e=!0){const n=[];for(const r of t){var i=tc(r);t=[];for(const s of i.g())i=e&&Bn(s,1)!=null?Bn(s,1)??0:-1,t.push({score:Lt(s,2)??0,index:i,categoryName:Zt(St(s,3))??""??"",displayName:Zt(St(s,4))??""??""});n.push(t)}return n}var dn=class extends Pn{constructor(t,e){super(new Kn(t,e),"image_in","norm_rect",!1),this.gestures=[],this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Le(t=this.j=new c0,0,1,e=new Rt),this.u=new _h,Le(this.j,0,2,this.u),this.D=new gh,Le(this.u,0,3,this.D),this.A=new o0,Le(this.u,0,2,this.A),this.h=new BM,Le(this.j,0,3,this.h),Ce(this.A,2,.5),Ce(this.u,4,.5),Ce(this.D,2,.5)}get baseOptions(){return et(this.j,Rt,1)}set baseOptions(t){Le(this.j,0,1,t)}o(t){var r,s,a,o;if(Bi(this.A,3,t.numHands??1),"minHandDetectionConfidence"in t&&Ce(this.A,2,t.minHandDetectionConfidence??.5),"minTrackingConfidence"in t&&Ce(this.u,4,t.minTrackingConfidence??.5),"minHandPresenceConfidence"in t&&Ce(this.D,2,t.minHandPresenceConfidence??.5),t.cannedGesturesClassifierOptions){var e=new Zr,n=e,i=uu(t.cannedGesturesClassifierOptions,(r=et(this.h,Zr,3))==null?void 0:r.l());Le(n,0,2,i),Le(this.h,0,3,e)}else t.cannedGesturesClassifierOptions===void 0&&((s=et(this.h,Zr,3))==null||s.g());return t.customGesturesClassifierOptions?(Le(n=e=new Zr,0,2,i=uu(t.customGesturesClassifierOptions,(a=et(this.h,Zr,4))==null?void 0:a.l())),Le(this.h,0,4,e)):t.customGesturesClassifierOptions===void 0&&((o=et(this.h,Zr,4))==null||o.g()),this.l(t)}Ha(t,e){return Ud(this),Zn(this,t,e),Nd(this)}Ia(t,e,n){return Ud(this),vi(this,t,n,e),Nd(this)}m(){var t=new In;bt(t,"image_in"),bt(t,"norm_rect"),tt(t,"hand_gestures"),tt(t,"hand_landmarks"),tt(t,"world_hand_landmarks"),tt(t,"handedness");const e=new Ln;gi(e,kM,this.j);const n=new gn;Cn(n,2,"mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"),xt(n,"IMAGE:image_in"),xt(n,"NORM_RECT:norm_rect"),Ye(n,"HAND_GESTURES:hand_gestures"),Ye(n,"LANDMARKS:hand_landmarks"),Ye(n,"WORLD_LANDMARKS:world_hand_landmarks"),Ye(n,"HANDEDNESS:handedness"),n.o(e),Vn(t,n),this.g.attachProtoVectorListener("hand_landmarks",(i,r)=>{for(const s of i){i=ba(s);const a=[];for(const o of Oi(i,Qm,1))a.push({x:Lt(o,1)??0,y:Lt(o,2)??0,z:Lt(o,3)??0,visibility:Lt(o,4)??0});this.landmarks.push(a)}me(this,r)}),this.g.attachEmptyPacketListener("hand_landmarks",i=>{me(this,i)}),this.g.attachProtoVectorListener("world_hand_landmarks",(i,r)=>{for(const s of i){i=is(s);const a=[];for(const o of Oi(i,Jm,1))a.push({x:Lt(o,1)??0,y:Lt(o,2)??0,z:Lt(o,3)??0,visibility:Lt(o,4)??0});this.worldLandmarks.push(a)}me(this,r)}),this.g.attachEmptyPacketListener("world_hand_landmarks",i=>{me(this,i)}),this.g.attachProtoVectorListener("hand_gestures",(i,r)=>{this.gestures.push(...Fd(i,!1)),me(this,r)}),this.g.attachEmptyPacketListener("hand_gestures",i=>{me(this,i)}),this.g.attachProtoVectorListener("handedness",(i,r)=>{this.handedness.push(...Fd(i)),me(this,r)}),this.g.attachEmptyPacketListener("handedness",i=>{me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};function Od(t){return{landmarks:t.landmarks,worldLandmarks:t.worldLandmarks,handednesses:t.handedness,handedness:t.handedness}}dn.prototype.recognizeForVideo=dn.prototype.Ia,dn.prototype.recognize=dn.prototype.Ha,dn.prototype.setOptions=dn.prototype.o,dn.createFromModelPath=function(t,e){return Ze(dn,t,{baseOptions:{modelAssetPath:e}})},dn.createFromModelBuffer=function(t,e){return Ze(dn,t,{baseOptions:{modelAssetBuffer:e}})},dn.createFromOptions=function(t,e){return Ze(dn,t,e)},dn.HAND_CONNECTIONS=Ph;var Mn=class extends Pn{constructor(t,e){super(new Kn(t,e),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Le(t=this.h=new _h,0,1,e=new Rt),this.u=new gh,Le(this.h,0,3,this.u),this.j=new o0,Le(this.h,0,2,this.j),Bi(this.j,3,1),Ce(this.j,2,.5),Ce(this.u,2,.5),Ce(this.h,4,.5)}get baseOptions(){return et(this.h,Rt,1)}set baseOptions(t){Le(this.h,0,1,t)}o(t){return"numHands"in t&&Bi(this.j,3,t.numHands??1),"minHandDetectionConfidence"in t&&Ce(this.j,2,t.minHandDetectionConfidence??.5),"minTrackingConfidence"in t&&Ce(this.h,4,t.minTrackingConfidence??.5),"minHandPresenceConfidence"in t&&Ce(this.u,2,t.minHandPresenceConfidence??.5),this.l(t)}F(t,e){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Zn(this,t,e),Od(this)}G(t,e,n){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],vi(this,t,n,e),Od(this)}m(){var t=new In;bt(t,"image_in"),bt(t,"norm_rect"),tt(t,"hand_landmarks"),tt(t,"world_hand_landmarks"),tt(t,"handedness");const e=new Ln;gi(e,zM,this.h);const n=new gn;Cn(n,2,"mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"),xt(n,"IMAGE:image_in"),xt(n,"NORM_RECT:norm_rect"),Ye(n,"LANDMARKS:hand_landmarks"),Ye(n,"WORLD_LANDMARKS:world_hand_landmarks"),Ye(n,"HANDEDNESS:handedness"),n.o(e),Vn(t,n),this.g.attachProtoVectorListener("hand_landmarks",(i,r)=>{for(const s of i)i=ba(s),this.landmarks.push(ic(i));me(this,r)}),this.g.attachEmptyPacketListener("hand_landmarks",i=>{me(this,i)}),this.g.attachProtoVectorListener("world_hand_landmarks",(i,r)=>{for(const s of i)i=is(s),this.worldLandmarks.push(ta(i));me(this,r)}),this.g.attachEmptyPacketListener("world_hand_landmarks",i=>{me(this,i)}),this.g.attachProtoVectorListener("handedness",(i,r)=>{var s=this.handedness,a=s.push;const o=[];for(const c of i){i=tc(c);const l=[];for(const h of i.g())l.push({score:Lt(h,2)??0,index:Bn(h,1)??0??-1,categoryName:Zt(St(h,3))??""??"",displayName:Zt(St(h,4))??""??""});o.push(l)}a.call(s,...o),me(this,r)}),this.g.attachEmptyPacketListener("handedness",i=>{me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};Mn.prototype.detectForVideo=Mn.prototype.G,Mn.prototype.detect=Mn.prototype.F,Mn.prototype.setOptions=Mn.prototype.o,Mn.createFromModelPath=function(t,e){return Ze(Mn,t,{baseOptions:{modelAssetPath:e}})},Mn.createFromModelBuffer=function(t,e){return Ze(Mn,t,{baseOptions:{modelAssetBuffer:e}})},Mn.createFromOptions=function(t,e){return Ze(Mn,t,e)},Mn.HAND_CONNECTIONS=Ph;var B0=jn([0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]);function Bd(t){t.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]}}function kd(t){try{if(!t.D)return t.h;t.D(t.h)}finally{sc(t)}}function io(t,e){t=ba(t),e.push(ic(t))}var _t=class extends Pn{constructor(t,e){super(new Kn(t,e),"input_frames_image",null,!1),this.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]},this.outputPoseSegmentationMasks=this.outputFaceBlendshapes=!1,Le(t=this.j=new d0,0,1,e=new Rt),this.I=new gh,Le(this.j,0,2,this.I),this.W=new VM,Le(this.j,0,3,this.W),this.u=new nc,Le(this.j,0,4,this.u),this.O=new r0,Le(this.j,0,5,this.O),this.A=new h0,Le(this.j,0,6,this.A),this.M=new f0,Le(this.j,0,7,this.M),Ce(this.u,2,.5),Ce(this.u,3,.3),Ce(this.O,2,.5),Ce(this.A,2,.5),Ce(this.A,3,.3),Ce(this.M,2,.5),Ce(this.I,2,.5)}get baseOptions(){return et(this.j,Rt,1)}set baseOptions(t){Le(this.j,0,1,t)}o(t){return"minFaceDetectionConfidence"in t&&Ce(this.u,2,t.minFaceDetectionConfidence??.5),"minFaceSuppressionThreshold"in t&&Ce(this.u,3,t.minFaceSuppressionThreshold??.3),"minFacePresenceConfidence"in t&&Ce(this.O,2,t.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in t&&(this.outputFaceBlendshapes=!!t.outputFaceBlendshapes),"minPoseDetectionConfidence"in t&&Ce(this.A,2,t.minPoseDetectionConfidence??.5),"minPoseSuppressionThreshold"in t&&Ce(this.A,3,t.minPoseSuppressionThreshold??.3),"minPosePresenceConfidence"in t&&Ce(this.M,2,t.minPosePresenceConfidence??.5),"outputPoseSegmentationMasks"in t&&(this.outputPoseSegmentationMasks=!!t.outputPoseSegmentationMasks),"minHandLandmarksConfidence"in t&&Ce(this.I,2,t.minHandLandmarksConfidence??.5),this.l(t)}F(t,e,n){const i=typeof e!="function"?e:{};return this.D=typeof e=="function"?e:n,Bd(this),Zn(this,t,i),kd(this)}G(t,e,n,i){const r=typeof n!="function"?n:{};return this.D=typeof n=="function"?n:i,Bd(this),vi(this,t,r,e),kd(this)}m(){var t=new In;bt(t,"input_frames_image"),tt(t,"pose_landmarks"),tt(t,"pose_world_landmarks"),tt(t,"face_landmarks"),tt(t,"left_hand_landmarks"),tt(t,"left_hand_world_landmarks"),tt(t,"right_hand_landmarks"),tt(t,"right_hand_world_landmarks");const e=new Ln,n=new ld;Cn(n,1,"type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"),function(r,s){if(s!=null)if(Array.isArray(s))ct(r,2,Ho(s,0,fa));else{if(!(typeof s=="string"||s instanceof li||Fu(s)))throw Error("invalid value in Any.value field: "+s+" expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");Ki(r,2,Bu(s,!1),Rr())}}(n,this.j.g());const i=new gn;Cn(i,2,"mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"),Ju(i,8,ld,n),xt(i,"IMAGE:input_frames_image"),Ye(i,"POSE_LANDMARKS:pose_landmarks"),Ye(i,"POSE_WORLD_LANDMARKS:pose_world_landmarks"),Ye(i,"FACE_LANDMARKS:face_landmarks"),Ye(i,"LEFT_HAND_LANDMARKS:left_hand_landmarks"),Ye(i,"LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"),Ye(i,"RIGHT_HAND_LANDMARKS:right_hand_landmarks"),Ye(i,"RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"),i.o(e),Vn(t,i),rc(this,t),this.g.attachProtoListener("pose_landmarks",(r,s)=>{io(r,this.h.poseLandmarks),me(this,s)}),this.g.attachEmptyPacketListener("pose_landmarks",r=>{me(this,r)}),this.g.attachProtoListener("pose_world_landmarks",(r,s)=>{var a=this.h.poseWorldLandmarks;r=is(r),a.push(ta(r)),me(this,s)}),this.g.attachEmptyPacketListener("pose_world_landmarks",r=>{me(this,r)}),this.outputPoseSegmentationMasks&&(Ye(i,"POSE_SEGMENTATION_MASK:pose_segmentation_mask"),vs(this,"pose_segmentation_mask"),this.g.Z("pose_segmentation_mask",(r,s)=>{this.h.poseSegmentationMasks=[Ms(this,r,!0,!this.D)],me(this,s)}),this.g.attachEmptyPacketListener("pose_segmentation_mask",r=>{this.h.poseSegmentationMasks=[],me(this,r)})),this.g.attachProtoListener("face_landmarks",(r,s)=>{io(r,this.h.faceLandmarks),me(this,s)}),this.g.attachEmptyPacketListener("face_landmarks",r=>{me(this,r)}),this.outputFaceBlendshapes&&(tt(t,"extra_blendshapes"),Ye(i,"FACE_BLENDSHAPES:extra_blendshapes"),this.g.attachProtoListener("extra_blendshapes",(r,s)=>{var a=this.h.faceBlendshapes;this.outputFaceBlendshapes&&(r=tc(r),a.push(Sh(r.g()??[]))),me(this,s)}),this.g.attachEmptyPacketListener("extra_blendshapes",r=>{me(this,r)})),this.g.attachProtoListener("left_hand_landmarks",(r,s)=>{io(r,this.h.leftHandLandmarks),me(this,s)}),this.g.attachEmptyPacketListener("left_hand_landmarks",r=>{me(this,r)}),this.g.attachProtoListener("left_hand_world_landmarks",(r,s)=>{var a=this.h.leftHandWorldLandmarks;r=is(r),a.push(ta(r)),me(this,s)}),this.g.attachEmptyPacketListener("left_hand_world_landmarks",r=>{me(this,r)}),this.g.attachProtoListener("right_hand_landmarks",(r,s)=>{io(r,this.h.rightHandLandmarks),me(this,s)}),this.g.attachEmptyPacketListener("right_hand_landmarks",r=>{me(this,r)}),this.g.attachProtoListener("right_hand_world_landmarks",(r,s)=>{var a=this.h.rightHandWorldLandmarks;r=is(r),a.push(ta(r)),me(this,s)}),this.g.attachEmptyPacketListener("right_hand_world_landmarks",r=>{me(this,r)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};_t.prototype.detectForVideo=_t.prototype.G,_t.prototype.detect=_t.prototype.F,_t.prototype.setOptions=_t.prototype.o,_t.createFromModelPath=function(t,e){return Ze(_t,t,{baseOptions:{modelAssetPath:e}})},_t.createFromModelBuffer=function(t,e){return Ze(_t,t,{baseOptions:{modelAssetBuffer:e}})},_t.createFromOptions=function(t,e){return Ze(_t,t,e)},_t.HAND_CONNECTIONS=Ph,_t.POSE_CONNECTIONS=B0,_t.FACE_LANDMARKS_LIPS=bh,_t.FACE_LANDMARKS_LEFT_EYE=Th,_t.FACE_LANDMARKS_LEFT_EYEBROW=Ah,_t.FACE_LANDMARKS_LEFT_IRIS=U0,_t.FACE_LANDMARKS_RIGHT_EYE=wh,_t.FACE_LANDMARKS_RIGHT_EYEBROW=Rh,_t.FACE_LANDMARKS_RIGHT_IRIS=N0,_t.FACE_LANDMARKS_FACE_OVAL=Ch,_t.FACE_LANDMARKS_CONTOURS=F0,_t.FACE_LANDMARKS_TESSELATION=O0;var Nn=class extends Pn{constructor(t,e){super(new Kn(t,e),"input_image","norm_rect",!0),this.j={classifications:[]},Le(t=this.h=new p0,0,1,e=new Rt)}get baseOptions(){return et(this.h,Rt,1)}set baseOptions(t){Le(this.h,0,1,t)}o(t){return Le(this.h,0,2,uu(t,et(this.h,ph,2))),this.l(t)}sa(t,e){return this.j={classifications:[]},Zn(this,t,e),this.j}ta(t,e,n){return this.j={classifications:[]},vi(this,t,n,e),this.j}m(){var t=new In;bt(t,"input_image"),bt(t,"norm_rect"),tt(t,"classifications");const e=new Ln;gi(e,GM,this.h);const n=new gn;Cn(n,2,"mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"),xt(n,"IMAGE:input_image"),xt(n,"NORM_RECT:norm_rect"),Ye(n,"CLASSIFICATIONS:classifications"),n.o(e),Vn(t,n),this.g.attachProtoListener("classifications",(i,r)=>{this.j=$M(PM(i)),me(this,r)}),this.g.attachEmptyPacketListener("classifications",i=>{me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};Nn.prototype.classifyForVideo=Nn.prototype.ta,Nn.prototype.classify=Nn.prototype.sa,Nn.prototype.setOptions=Nn.prototype.o,Nn.createFromModelPath=function(t,e){return Ze(Nn,t,{baseOptions:{modelAssetPath:e}})},Nn.createFromModelBuffer=function(t,e){return Ze(Nn,t,{baseOptions:{modelAssetBuffer:e}})},Nn.createFromOptions=function(t,e){return Ze(Nn,t,e)};var Sn=class extends Pn{constructor(t,e){super(new Kn(t,e),"image_in","norm_rect",!0),this.h=new m0,this.embeddings={embeddings:[]},Le(t=this.h,0,1,e=new Rt)}get baseOptions(){return et(this.h,Rt,1)}set baseOptions(t){Le(this.h,0,1,t)}o(t){var e=this.h,n=et(this.h,vd,2);return n=n?n.clone():new vd,t.l2Normalize!==void 0?ct(n,1,ha(t.l2Normalize)):"l2Normalize"in t&&ct(n,1),t.quantize!==void 0?ct(n,2,ha(t.quantize)):"quantize"in t&&ct(n,2),Le(e,0,2,n),this.l(t)}za(t,e){return Zn(this,t,e),this.embeddings}Aa(t,e,n){return vi(this,t,n,e),this.embeddings}m(){var t=new In;bt(t,"image_in"),bt(t,"norm_rect"),tt(t,"embeddings_out");const e=new Ln;gi(e,HM,this.h);const n=new gn;Cn(n,2,"mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"),xt(n,"IMAGE:image_in"),xt(n,"NORM_RECT:norm_rect"),Ye(n,"EMBEDDINGS:embeddings_out"),n.o(e),Vn(t,n),this.g.attachProtoListener("embeddings_out",(i,r)=>{i=DM(i),this.embeddings=function(s){return{embeddings:Oi(s,IM,1).map(a=>{var l,h;const o={headIndex:Bn(a,3)??0??-1,headName:Zt(St(a,4))??""??""};var c=a.v;return fm(c,0|c[be],_d,Yc(a,1))!==void 0?(a=Sr(a=et(a,_d,Yc(a,1),void 0),1,ai,Mr()),o.floatEmbedding=a.slice()):(c=new Uint8Array(0),o.quantizedEmbedding=((h=(l=et(a,LM,Yc(a,2),void 0))==null?void 0:l.na())==null?void 0:h.h())??c),o}),timestampMs:E0(St(s,2,void 0,void 0,xo)??om)}}(i),me(this,r)}),this.g.attachEmptyPacketListener("embeddings_out",i=>{me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};Sn.cosineSimilarity=function(t,e){if(t.floatEmbedding&&e.floatEmbedding)t=bd(t.floatEmbedding,e.floatEmbedding);else{if(!t.quantizedEmbedding||!e.quantizedEmbedding)throw Error("Cannot compute cosine similarity between quantized and float embeddings.");t=bd(yd(t.quantizedEmbedding),yd(e.quantizedEmbedding))}return t},Sn.prototype.embedForVideo=Sn.prototype.Aa,Sn.prototype.embed=Sn.prototype.za,Sn.prototype.setOptions=Sn.prototype.o,Sn.createFromModelPath=function(t,e){return Ze(Sn,t,{baseOptions:{modelAssetPath:e}})},Sn.createFromModelBuffer=function(t,e){return Ze(Sn,t,{baseOptions:{modelAssetBuffer:e}})},Sn.createFromOptions=function(t,e){return Ze(Sn,t,e)};var pu=class{constructor(t,e,n){this.confidenceMasks=t,this.categoryMask=e,this.qualityScores=n}close(){var t,e;(t=this.confidenceMasks)==null||t.forEach(n=>{n.close()}),(e=this.categoryMask)==null||e.close()}};function tS(t){var n,i;const e=function(r){return Oi(r,gn,1)}(t.ca()).filter(r=>(Zt(St(r,1))??"").includes("mediapipe.tasks.TensorsToSegmentationCalculator"));if(t.u=[],e.length>1)throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");e.length===1&&(((i=(n=et(e[0],Ln,7))==null?void 0:n.j())==null?void 0:i.g())??new Map).forEach((r,s)=>{t.u[Number(s)]=Zt(St(r,1))??""})}function zd(t){t.categoryMask=void 0,t.confidenceMasks=void 0,t.qualityScores=void 0}function Vd(t){try{const e=new pu(t.confidenceMasks,t.categoryMask,t.qualityScores);if(!t.j)return e;t.j(e)}finally{sc(t)}}pu.prototype.close=pu.prototype.close;var fn=class extends Pn{constructor(t,e){super(new Kn(t,e),"image_in","norm_rect",!1),this.u=[],this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new Mh,this.A=new g0,Le(this.h,0,3,this.A),Le(t=this.h,0,1,e=new Rt)}get baseOptions(){return et(this.h,Rt,1)}set baseOptions(t){Le(this.h,0,1,t)}o(t){return t.displayNamesLocale!==void 0?ct(this.h,2,Sa(t.displayNamesLocale)):"displayNamesLocale"in t&&ct(this.h,2),"outputCategoryMask"in t&&(this.outputCategoryMask=t.outputCategoryMask??!1),"outputConfidenceMasks"in t&&(this.outputConfidenceMasks=t.outputConfidenceMasks??!0),super.l(t)}L(){tS(this)}segment(t,e,n){const i=typeof e!="function"?e:{};return this.j=typeof e=="function"?e:n,zd(this),Zn(this,t,i),Vd(this)}La(t,e,n,i){const r=typeof n!="function"?n:{};return this.j=typeof n=="function"?n:i,zd(this),vi(this,t,r,e),Vd(this)}Da(){return this.u}m(){var t=new In;bt(t,"image_in"),bt(t,"norm_rect");const e=new Ln;gi(e,v0,this.h);const n=new gn;Cn(n,2,"mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"),xt(n,"IMAGE:image_in"),xt(n,"NORM_RECT:norm_rect"),n.o(e),Vn(t,n),rc(this,t),this.outputConfidenceMasks&&(tt(t,"confidence_masks"),Ye(n,"CONFIDENCE_MASKS:confidence_masks"),vs(this,"confidence_masks"),this.g.aa("confidence_masks",(i,r)=>{this.confidenceMasks=i.map(s=>Ms(this,s,!0,!this.j)),me(this,r)}),this.g.attachEmptyPacketListener("confidence_masks",i=>{this.confidenceMasks=[],me(this,i)})),this.outputCategoryMask&&(tt(t,"category_mask"),Ye(n,"CATEGORY_MASK:category_mask"),vs(this,"category_mask"),this.g.Z("category_mask",(i,r)=>{this.categoryMask=Ms(this,i,!1,!this.j),me(this,r)}),this.g.attachEmptyPacketListener("category_mask",i=>{this.categoryMask=void 0,me(this,i)})),tt(t,"quality_scores"),Ye(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",(i,r)=>{this.qualityScores=i,me(this,r)}),this.g.attachEmptyPacketListener("quality_scores",i=>{this.categoryMask=void 0,me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};fn.prototype.getLabels=fn.prototype.Da,fn.prototype.segmentForVideo=fn.prototype.La,fn.prototype.segment=fn.prototype.segment,fn.prototype.setOptions=fn.prototype.o,fn.createFromModelPath=function(t,e){return Ze(fn,t,{baseOptions:{modelAssetPath:e}})},fn.createFromModelBuffer=function(t,e){return Ze(fn,t,{baseOptions:{modelAssetBuffer:e}})},fn.createFromOptions=function(t,e){return Ze(fn,t,e)};var mu=class{constructor(t,e,n){this.confidenceMasks=t,this.categoryMask=e,this.qualityScores=n}close(){var t,e;(t=this.confidenceMasks)==null||t.forEach(n=>{n.close()}),(e=this.categoryMask)==null||e.close()}};mu.prototype.close=mu.prototype.close;var ni=class extends Pn{constructor(t,e){super(new Kn(t,e),"image_in","norm_rect_in",!1),this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new Mh,this.u=new g0,Le(this.h,0,3,this.u),Le(t=this.h,0,1,e=new Rt)}get baseOptions(){return et(this.h,Rt,1)}set baseOptions(t){Le(this.h,0,1,t)}o(t){return"outputCategoryMask"in t&&(this.outputCategoryMask=t.outputCategoryMask??!1),"outputConfidenceMasks"in t&&(this.outputConfidenceMasks=t.outputConfidenceMasks??!0),super.l(t)}segment(t,e,n,i){const r=typeof n!="function"?n:{};if(this.j=typeof n=="function"?n:i,this.qualityScores=this.categoryMask=this.confidenceMasks=void 0,n=this.C+1,i=new x0,e.keypoint&&e.scribble)throw Error("Cannot provide both keypoint and scribble.");if(e.keypoint){var s=new Zc;Ki(s,3,ha(!0),!1),Ki(s,1,Js(e.keypoint.x),0),Ki(s,2,Js(e.keypoint.y),0),Qs(i,1,lu,s)}else{if(!e.scribble)throw Error("Must provide either a keypoint or a scribble.");{const o=new XM;for(s of e.scribble)Ki(e=new Zc,3,ha(!0),!1),Ki(e,1,Js(s.x),0),Ki(e,2,Js(s.y),0),Ju(o,1,Zc,e);Qs(i,2,lu,o)}}this.g.addProtoToStream(i.g(),"mediapipe.tasks.vision.interactive_segmenter.proto.RegionOfInterest","roi_in",n),Zn(this,t,r);e:{try{const o=new mu(this.confidenceMasks,this.categoryMask,this.qualityScores);if(!this.j){var a=o;break e}this.j(o)}finally{sc(this)}a=void 0}return a}m(){var t=new In;bt(t,"image_in"),bt(t,"roi_in"),bt(t,"norm_rect_in");const e=new Ln;gi(e,v0,this.h);const n=new gn;Cn(n,2,"mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraphV2"),xt(n,"IMAGE:image_in"),xt(n,"ROI:roi_in"),xt(n,"NORM_RECT:norm_rect_in"),n.o(e),Vn(t,n),rc(this,t),this.outputConfidenceMasks&&(tt(t,"confidence_masks"),Ye(n,"CONFIDENCE_MASKS:confidence_masks"),vs(this,"confidence_masks"),this.g.aa("confidence_masks",(i,r)=>{this.confidenceMasks=i.map(s=>Ms(this,s,!0,!this.j)),me(this,r)}),this.g.attachEmptyPacketListener("confidence_masks",i=>{this.confidenceMasks=[],me(this,i)})),this.outputCategoryMask&&(tt(t,"category_mask"),Ye(n,"CATEGORY_MASK:category_mask"),vs(this,"category_mask"),this.g.Z("category_mask",(i,r)=>{this.categoryMask=Ms(this,i,!1,!this.j),me(this,r)}),this.g.attachEmptyPacketListener("category_mask",i=>{this.categoryMask=void 0,me(this,i)})),tt(t,"quality_scores"),Ye(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",(i,r)=>{this.qualityScores=i,me(this,r)}),this.g.attachEmptyPacketListener("quality_scores",i=>{this.categoryMask=void 0,me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};ni.prototype.segment=ni.prototype.segment,ni.prototype.setOptions=ni.prototype.o,ni.createFromModelPath=function(t,e){return Ze(ni,t,{baseOptions:{modelAssetPath:e}})},ni.createFromModelBuffer=function(t,e){return Ze(ni,t,{baseOptions:{modelAssetBuffer:e}})},ni.createFromOptions=function(t,e){return Ze(ni,t,e)};var Fn=class extends Pn{constructor(t,e){super(new Kn(t,e),"input_frame_gpu","norm_rect",!1),this.j={detections:[]},Le(t=this.h=new M0,0,1,e=new Rt)}get baseOptions(){return et(this.h,Rt,1)}set baseOptions(t){Le(this.h,0,1,t)}o(t){return t.displayNamesLocale!==void 0?ct(this.h,2,Sa(t.displayNamesLocale)):"displayNamesLocale"in t&&ct(this.h,2),t.maxResults!==void 0?Bi(this.h,3,t.maxResults):"maxResults"in t&&ct(this.h,3),t.scoreThreshold!==void 0?Ce(this.h,4,t.scoreThreshold):"scoreThreshold"in t&&ct(this.h,4),t.categoryAllowlist!==void 0?So(this.h,5,t.categoryAllowlist):"categoryAllowlist"in t&&ct(this.h,5),t.categoryDenylist!==void 0?So(this.h,6,t.categoryDenylist):"categoryDenylist"in t&&ct(this.h,6),this.l(t)}F(t,e){return this.j={detections:[]},Zn(this,t,e),this.j}G(t,e,n){return this.j={detections:[]},vi(this,t,n,e),this.j}m(){var t=new In;bt(t,"input_frame_gpu"),bt(t,"norm_rect"),tt(t,"detections");const e=new Ln;gi(e,qM,this.h);const n=new gn;Cn(n,2,"mediapipe.tasks.vision.ObjectDetectorGraph"),xt(n,"IMAGE:input_frame_gpu"),xt(n,"NORM_RECT:norm_rect"),Ye(n,"DETECTIONS:detections"),n.o(e),Vn(t,n),this.g.attachProtoVectorListener("detections",(i,r)=>{for(const s of i)i=Zm(s),this.j.detections.push(y0(i));me(this,r)}),this.g.attachEmptyPacketListener("detections",i=>{me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};Fn.prototype.detectForVideo=Fn.prototype.G,Fn.prototype.detect=Fn.prototype.F,Fn.prototype.setOptions=Fn.prototype.o,Fn.createFromModelPath=async function(t,e){return Ze(Fn,t,{baseOptions:{modelAssetPath:e}})},Fn.createFromModelBuffer=function(t,e){return Ze(Fn,t,{baseOptions:{modelAssetBuffer:e}})},Fn.createFromOptions=function(t,e){return Ze(Fn,t,e)};var gu=class{constructor(t,e,n){this.landmarks=t,this.worldLandmarks=e,this.segmentationMasks=n}close(){var t;(t=this.segmentationMasks)==null||t.forEach(e=>{e.close()})}};function Gd(t){t.landmarks=[],t.worldLandmarks=[],t.segmentationMasks=void 0}function Hd(t){try{const e=new gu(t.landmarks,t.worldLandmarks,t.segmentationMasks);if(!t.u)return e;t.u(e)}finally{sc(t)}}gu.prototype.close=gu.prototype.close;var En=class extends Pn{constructor(t,e){super(new Kn(t,e),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.outputSegmentationMasks=!1,Le(t=this.h=new S0,0,1,e=new Rt),this.A=new f0,Le(this.h,0,3,this.A),this.j=new h0,Le(this.h,0,2,this.j),Bi(this.j,4,1),Ce(this.j,2,.5),Ce(this.A,2,.5),Ce(this.h,4,.5)}get baseOptions(){return et(this.h,Rt,1)}set baseOptions(t){Le(this.h,0,1,t)}o(t){return"numPoses"in t&&Bi(this.j,4,t.numPoses??1),"minPoseDetectionConfidence"in t&&Ce(this.j,2,t.minPoseDetectionConfidence??.5),"minTrackingConfidence"in t&&Ce(this.h,4,t.minTrackingConfidence??.5),"minPosePresenceConfidence"in t&&Ce(this.A,2,t.minPosePresenceConfidence??.5),"outputSegmentationMasks"in t&&(this.outputSegmentationMasks=t.outputSegmentationMasks??!1),this.l(t)}F(t,e,n){const i=typeof e!="function"?e:{};return this.u=typeof e=="function"?e:n,Gd(this),Zn(this,t,i),Hd(this)}G(t,e,n,i){const r=typeof n!="function"?n:{};return this.u=typeof n=="function"?n:i,Gd(this),vi(this,t,r,e),Hd(this)}m(){var t=new In;bt(t,"image_in"),bt(t,"norm_rect"),tt(t,"normalized_landmarks"),tt(t,"world_landmarks"),tt(t,"segmentation_masks");const e=new Ln;gi(e,YM,this.h);const n=new gn;Cn(n,2,"mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"),xt(n,"IMAGE:image_in"),xt(n,"NORM_RECT:norm_rect"),Ye(n,"NORM_LANDMARKS:normalized_landmarks"),Ye(n,"WORLD_LANDMARKS:world_landmarks"),n.o(e),Vn(t,n),rc(this,t),this.g.attachProtoVectorListener("normalized_landmarks",(i,r)=>{this.landmarks=[];for(const s of i)i=ba(s),this.landmarks.push(ic(i));me(this,r)}),this.g.attachEmptyPacketListener("normalized_landmarks",i=>{this.landmarks=[],me(this,i)}),this.g.attachProtoVectorListener("world_landmarks",(i,r)=>{this.worldLandmarks=[];for(const s of i)i=is(s),this.worldLandmarks.push(ta(i));me(this,r)}),this.g.attachEmptyPacketListener("world_landmarks",i=>{this.worldLandmarks=[],me(this,i)}),this.outputSegmentationMasks&&(Ye(n,"SEGMENTATION_MASK:segmentation_masks"),vs(this,"segmentation_masks"),this.g.aa("segmentation_masks",(i,r)=>{this.segmentationMasks=i.map(s=>Ms(this,s,!0,!this.u)),me(this,r)}),this.g.attachEmptyPacketListener("segmentation_masks",i=>{this.segmentationMasks=[],me(this,i)})),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};En.prototype.detectForVideo=En.prototype.G,En.prototype.detect=En.prototype.F,En.prototype.setOptions=En.prototype.o,En.createFromModelPath=function(t,e){return Ze(En,t,{baseOptions:{modelAssetPath:e}})},En.createFromModelBuffer=function(t,e){return Ze(En,t,{baseOptions:{modelAssetBuffer:e}})},En.createFromOptions=function(t,e){return Ze(En,t,e)},En.POSE_CONNECTIONS=B0;function nS(t,e){return Math.sqrt((t.x-e.x)**2+(t.y-e.y)**2)}function Wd(t,e,n){return t+n*(e-t)}const Ri={WRIST:0,THUMB_TIP:4,INDEX_TIP:8,MIDDLE_TIP:12,INDEX_MCP:5,MIDDLE_MCP:9,RING_MCP:13,PINKY_MCP:17},ro=[Ri.WRIST,Ri.INDEX_MCP,Ri.MIDDLE_MCP,Ri.RING_MCP,Ri.PINKY_MCP],iS={Pointing_Up:"pointing",Closed_Fist:"fist",Open_Palm:"openpalm",Thumb_Up:"thumbsup",Thumb_Down:"thumbsdown",Victory:"victory",ILoveYou:"iloveyou"},rS="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm",sS="https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task";class aS{constructor(e=rS,n=.06,i=null){ht(this,"recognizer",null);this.wasmPath=e,this.clickThreshold=n,this.handednessFilter=i}async init(){const e=await Jr.forVisionTasks(this.wasmPath);this.recognizer=await dn.createFromOptions(e,{baseOptions:{modelAssetPath:sS,delegate:"GPU"},numHands:this.handednessFilter?2:1,runningMode:"VIDEO"})}detect(e,n){if(!this.recognizer)return null;const i=this.recognizer.recognizeForVideo(e,n);if(!i.landmarks||i.landmarks.length===0)return null;let r=0;if(this.handednessFilter){const a=i.handedness.findIndex(o=>{var c;return((c=o[0])==null?void 0:c.categoryName)===this.handednessFilter});if(a===-1)return null;r=a}const s=i.gestures[r]??[];return this.analyze(i.landmarks[r],s)}analyze(e,n){const i=e[Ri.THUMB_TIP],r=e[Ri.INDEX_TIP],s=e[Ri.MIDDLE_TIP],a=e[Ri.WRIST],o={x:ro.reduce((m,_)=>m+e[_].x,0)/ro.length,y:ro.reduce((m,_)=>m+e[_].y,0)/ro.length},c=nS(i,s),l=n[0],h=l?iS[l.categoryName]??null:null,f=(l==null?void 0:l.score)??0;return{gesture:c<this.clickThreshold?"click":h??"none",gestureName:h,gestureConfidence:f,clickPinchDistance:c,indexTip:{x:r.x,y:r.y},wrist:{x:a.x,y:a.y},palmCenter:o}}destroy(){var e;(e=this.recognizer)==null||e.close(),this.recognizer=null}}const Xd="handface_key_bindings";function oS(t){return{" ":"Space",ArrowUp:"↑",ArrowDown:"↓",ArrowLeft:"←",ArrowRight:"→",Escape:"Esc",Backspace:"⌫",Delete:"Del",Enter:"↵",Tab:"Tab",PageUp:"PgUp",PageDown:"PgDn",Home:"Home",End:"End"}[t]??t}class cS{constructor(){ht(this,"bindings",new Map);this.load()}bind(e,n,i){this.bindings.set(e,{gesture:e,key:n,modifiers:i}),this.save()}unbind(e){this.bindings.delete(e),this.save()}getBinding(e){return this.bindings.get(e)}getAll(){return[...this.bindings.values()]}trigger(e){var r,s,a,o;const n=this.bindings.get(e);if(!n)return;const i={key:n.key,bubbles:!0,cancelable:!0,ctrlKey:((r=n.modifiers)==null?void 0:r.ctrl)??!1,altKey:((s=n.modifiers)==null?void 0:s.alt)??!1,shiftKey:((a=n.modifiers)==null?void 0:a.shift)??!1,metaKey:((o=n.modifiers)==null?void 0:o.meta)??!1};document.dispatchEvent(new KeyboardEvent("keydown",i)),document.dispatchEvent(new KeyboardEvent("keyup",i))}save(){try{localStorage.setItem(Xd,JSON.stringify([...this.bindings.entries()]))}catch{}}load(){try{const e=localStorage.getItem(Xd);e&&(this.bindings=new Map(JSON.parse(e)))}catch{}}}const qd={pointing:{icon:"☝️",label:"Pointing Up",labelKo:"검지 가리키기",builtin:!0,builtinAction:"커서 이동"},fist:{icon:"✊",label:"Closed Fist",labelKo:"주먹",builtin:!0,builtinAction:"스크롤 다운"},openpalm:{icon:"🖐️",label:"Open Palm",labelKo:"펼친 손",builtin:!0,builtinAction:"스크롤 업"},thumbsup:{icon:"👍",label:"Thumbs Up",labelKo:"엄지 위",builtin:!1},thumbsdown:{icon:"👎",label:"Thumbs Down",labelKo:"엄지 아래",builtin:!1},victory:{icon:"✌️",label:"Victory",labelKo:"브이",builtin:!1},iloveyou:{icon:"🤟",label:"I Love You",labelKo:"아이 러브 유",builtin:!1}},he="hf-",lS=["thumbsup","thumbsdown","victory","iloveyou"],uS=["pointing","fist","openpalm"];class hS{constructor(e){ht(this,"root");ht(this,"fab");ht(this,"panel");ht(this,"styleEl");ht(this,"isOpen",!1);ht(this,"capturingGesture",null);ht(this,"captureHandler",null);ht(this,"detectedGesture",null);this.mapper=e,this.styleEl=this.injectStyles(),this.fab=this.createFab(),this.panel=this.createPanel(),this.root=document.createElement("div"),this.root.setAttribute("data-handface",""),this.root.appendChild(this.fab),this.root.appendChild(this.panel),document.body.appendChild(this.root),this.fab.addEventListener("click",()=>this.toggle())}setDetected(e,n){this.isOpen&&this.detectedGesture!==e&&(this.detectedGesture=e,this.panel.querySelectorAll(`.${he}row[data-gesture]`).forEach(i=>{const r=i.dataset.gesture;i.classList.toggle(`${he}active`,r===e&&n>.6)}))}destroy(){this.stopCapture(),this.styleEl.remove(),this.root.remove()}toggle(){this.isOpen?this.close():this.open()}open(){this.isOpen=!0,this.renderRows(),this.panel.classList.add(`${he}open`),this.fab.classList.add(`${he}fab-open`)}close(){this.isOpen=!1,this.stopCapture(),this.panel.classList.remove(`${he}open`),this.fab.classList.remove(`${he}fab-open`)}startCapture(e){this.stopCapture(),this.capturingGesture=e,this.captureHandler=n=>{if(n.preventDefault(),n.stopImmediatePropagation(),["Shift","Control","Alt","Meta"].includes(n.key)){document.addEventListener("keydown",this.captureHandler,{once:!0,capture:!0});return}this.mapper.bind(e,n.key,{ctrl:n.ctrlKey||void 0,alt:n.altKey||void 0,shift:n.shiftKey||void 0,meta:n.metaKey||void 0}),this.capturingGesture=null,this.captureHandler=null,this.renderRows()},document.addEventListener("keydown",this.captureHandler,{once:!0,capture:!0}),this.renderRows()}stopCapture(){this.captureHandler&&(document.removeEventListener("keydown",this.captureHandler,{capture:!0}),this.captureHandler=null,this.capturingGesture=null)}createFab(){const e=document.createElement("button");return e.className=`${he}fab`,e.title="handface 제스처 설정",e.innerHTML="✋",e}createPanel(){const e=document.createElement("div");return e.className=`${he}panel`,e.innerHTML=`
      <div class="${he}header">
        <span class="${he}title">✋ handface</span>
        <button class="${he}close-btn" title="닫기">✕</button>
      </div>
      <div class="${he}body">
        <div class="${he}section-label">기본 동작</div>
        <div class="${he}builtin-rows"></div>
        <div class="${he}section-label" style="margin-top:10px">단축키 바인딩</div>
        <div class="${he}binding-rows"></div>
      </div>
    `,e.querySelector(`.${he}close-btn`).addEventListener("click",()=>this.close()),e}renderRows(){this.renderBuiltin(),this.renderBindings()}renderBuiltin(){const e=this.panel.querySelector(`.${he}builtin-rows`);e.innerHTML="",e.appendChild(this.makeReadonlyRow("🤏","엄지+중지 핀치","클릭",null));for(const n of uS){const i=qd[n];e.appendChild(this.makeReadonlyRow(i.icon,i.labelKo,i.builtinAction,n))}}renderBindings(){const e=this.panel.querySelector(`.${he}binding-rows`);e.innerHTML="";for(const n of lS){const i=qd[n],r=this.mapper.getBinding(n),s=this.capturingGesture===n;e.appendChild(this.makeBindingRow(n,i.icon,i.labelKo,(r==null?void 0:r.key)??null,s))}}makeReadonlyRow(e,n,i,r){const s=document.createElement("div");return s.className=`${he}row`,r&&(s.dataset.gesture=r),s.innerHTML=`
      <span class="${he}icon">${e}</span>
      <span class="${he}name">${n}</span>
      <span class="${he}badge">${i}</span>
    `,s}makeBindingRow(e,n,i,r,s){var c;const a=document.createElement("div");a.className=`${he}row`,a.dataset.gesture=e;const o=r?this.buildKeyLabel(this.mapper.getBinding(e)):null;return s?(a.innerHTML=`
        <span class="${he}icon">${n}</span>
        <span class="${he}name">${i}</span>
        <span class="${he}capture-hint">단축키 입력...</span>
        <button class="${he}cancel-btn">취소</button>
      `,a.querySelector(`.${he}cancel-btn`).addEventListener("click",()=>{this.stopCapture(),this.renderRows()})):(a.innerHTML=`
        <span class="${he}icon">${n}</span>
        <span class="${he}name">${i}</span>
        ${o?`<span class="${he}key-tag">${o}</span>
             <button class="${he}bind-btn ${he}clear-btn" data-gesture="${e}" title="제거">✕</button>`:`<span class="${he}no-bind">—</span>`}
        <button class="${he}bind-btn ${he}edit-btn" data-gesture="${e}" title="단축키 설정">✎</button>
      `,a.querySelector(`.${he}edit-btn`).addEventListener("click",()=>this.startCapture(e)),(c=a.querySelector(`.${he}clear-btn`))==null||c.addEventListener("click",()=>{this.mapper.unbind(e),this.renderRows()})),a}buildKeyLabel(e){var i,r,s,a;const n=[];return(i=e.modifiers)!=null&&i.ctrl&&n.push("Ctrl"),(r=e.modifiers)!=null&&r.alt&&n.push("Alt"),(s=e.modifiers)!=null&&s.shift&&n.push("Shift"),(a=e.modifiers)!=null&&a.meta&&n.push("⌘"),n.push(oS(e.key)),n.join("+")}injectStyles(){const e=document.createElement("style");return e.dataset.handface="styles",e.textContent=`
      .${he}fab {
        position: fixed;
        right: 20px;
        bottom: 20px;
        width: 46px;
        height: 46px;
        border-radius: 50%;
        background: linear-gradient(135deg, #7c6af7, #5b4dd4);
        color: #fff;
        border: none;
        cursor: pointer;
        font-size: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 20px rgba(124,106,247,0.45);
        z-index: 999998;
        transition: transform 0.18s, box-shadow 0.18s;
        user-select: none;
      }
      .${he}fab:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(124,106,247,0.65); }
      .${he}fab-open  { transform: rotate(20deg) scale(1.05); }

      .${he}panel {
        position: fixed;
        right: 20px;
        bottom: 76px;
        width: 272px;
        background: rgba(10, 10, 20, 0.97);
        border: 1px solid rgba(124,106,247,0.28);
        border-radius: 16px;
        z-index: 999999;
        -webkit-backdrop-filter: blur(24px);
        backdrop-filter: blur(24px);
        box-shadow: 0 12px 48px rgba(0,0,0,0.55);
        color: #ddddf5;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        font-size: 13px;
        opacity: 0;
        transform: translateY(10px) scale(0.97);
        pointer-events: none;
        transition: opacity 0.2s ease, transform 0.2s ease;
      }
      .${he}open {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: all;
      }

      .${he}header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 13px 16px 11px;
        border-bottom: 1px solid rgba(255,255,255,0.07);
      }
      .${he}title {
        font-weight: 700;
        font-size: 0.85rem;
        letter-spacing: -0.01em;
      }
      .${he}close-btn {
        background: none;
        border: none;
        color: rgba(221,221,245,0.45);
        cursor: pointer;
        font-size: 0.8rem;
        padding: 2px 4px;
        border-radius: 4px;
        transition: color 0.12s;
      }
      .${he}close-btn:hover { color: #ddddf5; }

      .${he}body {
        padding: 12px 14px 14px;
      }
      .${he}section-label {
        font-size: 0.6rem;
        text-transform: uppercase;
        letter-spacing: 0.11em;
        opacity: 0.35;
        margin-bottom: 7px;
      }

      .${he}row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 5px 6px;
        border-radius: 8px;
        margin-bottom: 3px;
        transition: background 0.15s;
      }
      .${he}row.${he}active {
        background: rgba(124,106,247,0.18);
      }

      .${he}icon { font-size: 1rem; width: 22px; text-align: center; flex-shrink: 0; }
      .${he}name { flex: 1; opacity: 0.8; font-size: 0.76rem; }

      .${he}badge {
        font-size: 0.65rem;
        background: rgba(124,106,247,0.25);
        color: #9d8dff;
        padding: 2px 7px;
        border-radius: 99px;
        white-space: nowrap;
      }

      .${he}key-tag {
        font-size: 0.65rem;
        font-family: 'SF Mono', 'Fira Code', monospace;
        background: rgba(78,205,196,0.15);
        color: #4ecdc4;
        padding: 2px 7px;
        border-radius: 6px;
        white-space: nowrap;
        max-width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .${he}no-bind {
        font-size: 0.72rem;
        opacity: 0.3;
      }

      .${he}bind-btn {
        background: none;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        padding: 2px 5px;
        font-size: 0.75rem;
        transition: background 0.12s, color 0.12s;
        flex-shrink: 0;
      }
      .${he}edit-btn  { color: rgba(221,221,245,0.45); }
      .${he}edit-btn:hover  { background: rgba(124,106,247,0.2); color: #9d8dff; }
      .${he}clear-btn { color: rgba(221,221,245,0.3); }
      .${he}clear-btn:hover { background: rgba(255,80,80,0.15); color: #ff6b6b; }

      .${he}capture-hint {
        flex: 1;
        font-size: 0.7rem;
        color: #ffd166;
        animation: ${he}blink 1s step-end infinite;
      }
      .${he}cancel-btn {
        background: none;
        border: 1px solid rgba(255,80,80,0.3);
        color: rgba(255,100,100,0.7);
        border-radius: 5px;
        padding: 2px 7px;
        font-size: 0.65rem;
        cursor: pointer;
        flex-shrink: 0;
      }
      .${he}cancel-btn:hover { background: rgba(255,80,80,0.1); }

      @keyframes ${he}blink {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.3; }
      }
    `,document.head.appendChild(e),e}}const fS=.09,dS=600,Yd=12,pS=900;function mS(t){return t==="right"?"Left":t==="left"?"Right":null}class gS extends v3{constructor(n={}){super();ht(this,"video");ht(this,"detector");ht(this,"rafId",null);ht(this,"stream",null);ht(this,"panel",null);ht(this,"isClicking",!1);ht(this,"lastClickMs",0);ht(this,"lastGestureMs",new Map);ht(this,"smoothX",.5);ht(this,"smoothY",.5);ht(this,"smoothing");ht(this,"flipHorizontal");ht(this,"cursorAnchor");ht(this,"ownedVideo");ht(this,"mapper",new cS);this.smoothing=n.smoothing??.6,this.flipHorizontal=n.flipHorizontal??!0,this.cursorAnchor=n.cursorAnchor??"wrist";const i=n.threshold??.05;n.video?(this.video=n.video,this.ownedVideo=!1):(this.video=this.createHiddenVideo(),this.ownedVideo=!0),this.detector=new aS(n.wasmPath,i,mS(n.handedness??"right"))}async start(){await this.detector.init(),this.stream=await navigator.mediaDevices.getUserMedia({video:!0}),this.video.srcObject=this.stream,await new Promise(n=>{this.video.onloadedmetadata=()=>{this.video.play(),n()}}),this.loop()}stop(){var n,i;this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),(n=this.stream)==null||n.getTracks().forEach(r=>r.stop()),this.stream=null,this.detector.destroy(),(i=this.panel)==null||i.destroy(),this.panel=null,this.ownedVideo&&this.video.remove(),this.removeAllListeners()}createPanel(){return this.panel||(this.panel=new hS(this.mapper)),this.panel}createHiddenVideo(){const n=document.createElement("video");return n.style.cssText="position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;",document.body.appendChild(n),n}loop(){this.rafId=requestAnimationFrame(()=>{this.tick(),this.rafId!==null&&this.loop()})}tick(){var f,u;const n=performance.now(),i=this.detector.detect(this.video,n);if(!i)return;const r=this.cursorAnchor==="index"?i.indexTip:this.cursorAnchor==="palm"?i.palmCenter:i.wrist,s=this.flipHorizontal?1-r.x:r.x,a=r.y;this.smoothX=Wd(this.smoothX,s,1-this.smoothing),this.smoothY=Wd(this.smoothY,a,1-this.smoothing);const o=Math.round(this.smoothX*window.innerWidth),c=Math.round(this.smoothY*window.innerHeight),l={x:this.smoothX,y:this.smoothY,screenX:o,screenY:c};if(this.emit("move",l),i.gesture==="click"){if(!this.isClicking){this.isClicking=!0;const m=Date.now();m-this.lastClickMs>dS&&(this.lastClickMs=m,this.emit("click",l))}}else i.clickPinchDistance>fS&&(this.isClicking=!1);this.isClicking||(i.gestureName==="fist"?this.emit("scroll",{deltaY:Yd}):i.gestureName==="openpalm"&&this.emit("scroll",{deltaY:-Yd}));const h=i.gestureName;if(h){(f=this.panel)==null||f.setDetected(h,i.gestureConfidence);const m=Date.now(),_=this.lastGestureMs.get(h)??0;if(m-_>pS){this.lastGestureMs.set(h,m);const S={gesture:h,...l,confidence:i.gestureConfidence};this.emit(h,S),this.mapper.trigger(h)}}else(u=this.panel)==null||u.setDetected(null,0)}}const ks=new _3({antialias:!0});ks.setSize(window.innerWidth,window.innerHeight);ks.setPixelRatio(Math.min(window.devicePixelRatio,2));ks.setClearColor(460559);document.getElementById("canvas-container").appendChild(ks.domElement);const kn=new e_;kn.fog=new Cu(460559,.016);const da=new yn(55,window.innerWidth/window.innerHeight,.1,500);da.position.z=6;const k0=new Du(1.5,1),Pi=new g_({color:5583837,emissive:1574984,specular:16777215,shininess:160,transparent:!0,opacity:.72}),rs=new mn(k0,Pi);kn.add(rs);const _S=new Ts({color:10325503,wireframe:!0,transparent:!0,opacity:.32});rs.add(new mn(k0,_S));const Ao=new Ts({color:6702318,transparent:!0,opacity:.28}),vS=new mn(new Uu(.85,16,16),Ao);rs.add(vS);function Lh(t,e,n,i,r,s,a){const o=new mn(new Uo(t,e,6,120),new Ts({color:n,transparent:!0,opacity:i}));return o.rotation.set(r,s,a),kn.add(o),o}const xS=Lh(2.4,.012,8153847,.7,Math.PI/3,0,0),$d=Lh(3.1,.008,5164484,.5,-Math.PI/5,0,Math.PI/6),jd=Lh(3.8,.005,16739229,.35,Math.PI/7,Math.PI/4,-Math.PI/3),ki=280,MS=new Float32Array(ki*3),po=new Float32Array(ki*3),na=new Float32Array(ki),ia=new Float32Array(ki),ra=new Float32Array(ki),z0=new Float32Array(ki),Kd=[new Xe(8153847),new Xe(5164484),new Xe(16739229),new Xe(16765286)];for(let t=0;t<ki;t++){na[t]=2.3+Math.random()*2.6,ia[t]=Math.random()*Math.PI*2,ra[t]=Math.acos(2*Math.random()-1),z0[t]=(Math.random()-.5)*.009;const e=Kd[t%Kd.length];po[t*3]=e.r,po[t*3+1]=e.g,po[t*3+2]=e.b}const ac=new un;ac.setAttribute("position",new Tn(MS,3));ac.setAttribute("color",new Tn(po,3));const V0=new bp(ac,new Lu({size:.065,vertexColors:!0,transparent:!0,opacity:.9,sizeAttenuation:!0}));kn.add(V0);const G0=1800,mo=new Float32Array(G0*3);for(let t=0;t<G0;t++)mo[t*3]=(Math.random()-.5)*300,mo[t*3+1]=(Math.random()-.5)*300,mo[t*3+2]=(Math.random()-.5)*300;const H0=new un;H0.setAttribute("position",new Tn(mo,3));const W0=new bp(H0,new Lu({color:16777215,size:.14,transparent:!0,opacity:.45,sizeAttenuation:!0}));kn.add(W0);kn.add(new S_(1710654,2.5));const wo=new Nu(8153847,5,14);wo.position.set(4,3,4);kn.add(wo);const Ro=new Nu(5164484,3,14);Ro.position.set(-4,-2,-3);kn.add(Ro);const Co=new Nu(16739229,2,12);Co.position.set(0,5,-4);kn.add(Co);function Qc(){const t=new Ts({color:10325503,transparent:!0,opacity:.75,wireframe:!0}),e=new mn(new Uo(.3,.018,8,64),t);e.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,0),kn.add(e);let n=.3,i=.75;function r(){n+=.18,i-=.045,e.scale.setScalar(n),t.opacity=Math.max(0,i),i>0?requestAnimationFrame(r):kn.remove(e)}r()}let X0=0,q0=0,el=0,tl=0,Y0=6,nl=6,il=1,_u=1,Zd=0,pr=0;const Po=document.getElementById("cursor"),Jd=document.getElementById("flash"),rl=document.getElementById("s-status"),SS=document.getElementById("s-pos"),ES=document.getElementById("s-clicks"),yS=document.getElementById("s-scroll"),sl=document.getElementById("log");function oc(t,e){const n=document.createElement("div");n.className="log-item"+(t?` ev-${t}`:"");const i=new Date().toLocaleTimeString("ko-KR",{hour12:!1});for(n.textContent=`[${i}] ${e}`,sl.appendChild(n);sl.children.length>9;)sl.children[1].remove()}function bS(t,e){Zd++,ES.textContent=Zd,oc("click",`클릭  ${Math.round(t*100)}% · ${Math.round(e*100)}%`),_u=1.38,setTimeout(()=>{_u=1},220),Pi.emissive.setHex(6702335),Pi.color.setHex(12307711),Ao.opacity=.65,setTimeout(()=>{Pi.emissive.setHex(1574984),Pi.color.setHex(5583837),Ao.opacity=.28},280),Jd.classList.add("on"),setTimeout(()=>Jd.classList.remove("on"),60),Po.classList.add("clicking"),setTimeout(()=>Po.classList.remove("clicking"),200),Qc(),setTimeout(Qc,80),setTimeout(Qc,180);for(let n=0;n<ki;n++)na[n]=2.3+Math.random()*4.8,ra[n]=Math.random()*Math.PI,ia[n]=Math.random()*Math.PI*2}const Ss=new gS({smoothing:.65,handedness:"right",cursorAnchor:"wrist"});Ss.on("move",t=>{Po.style.left=`${t.screenX}px`,Po.style.top=`${t.screenY}px`,SS.textContent=`${t.screenX} · ${t.screenY}`,q0=(t.x-.5)*Math.PI*1.6,X0=(t.y-.5)*Math.PI*.8,wo.position.x=(t.x-.5)*11,wo.position.y=-(t.y-.5)*11});Ss.on("click",t=>bS(t.x,t.y));Ss.on("scroll",t=>{window.scrollBy({top:t.deltaY*9,behavior:"auto"}),oc("scroll",t.deltaY>0?"✊ 스크롤 다운":"🖐 스크롤 업")});window.addEventListener("scroll",()=>{const t=Math.max(1,document.documentElement.scrollHeight-window.innerHeight),e=window.scrollY/t;Y0=8-e*5.5,yS.textContent=`${Math.round(e*100)}%`});const TS={thumbsup:{color:6750105,emissive:1721378},thumbsdown:{color:16737877,emissive:4460817},victory:{color:16768324,emissive:4469521},iloveyou:{color:16746700,emissive:4465203}},AS={thumbsup:"👍 엄지 위",thumbsdown:"👎 엄지 아래",victory:"✌️ 브이",iloveyou:"🤟 아이 러브 유"};for(const[t,e]of Object.entries(TS))Ss.on(t,()=>{Pi.color.setHex(e.color),Pi.emissive.setHex(e.emissive),setTimeout(()=>{Pi.color.setHex(5583837),Pi.emissive.setHex(1574984)},600),oc("",AS[t])});function $0(){requestAnimationFrame($0),pr+=.01,el+=(X0-el)*.04,tl+=(q0-tl)*.04,rs.rotation.x=el,rs.rotation.y=tl+pr*.14,il+=(_u-il)*.11,rs.scale.setScalar(il),Ao.opacity=.28+Math.sin(pr*1.4)*.06,nl+=(Y0-nl)*.055,da.position.z=nl,xS.rotation.z+=.003,$d.rotation.z-=.002,$d.rotation.x-=.001,jd.rotation.y+=.0015,jd.rotation.z+=.001,Ro.position.x=Math.sin(pr*.38)*5,Ro.position.y=Math.cos(pr*.55)*4,Co.position.x=Math.cos(pr*.29)*5,Co.position.z=Math.sin(pr*.47)*5;const t=ac.attributes.position;for(let e=0;e<ki;e++)ia[e]+=z0[e],t.setXYZ(e,na[e]*Math.sin(ra[e])*Math.cos(ia[e]),na[e]*Math.sin(ra[e])*Math.sin(ia[e]),na[e]*Math.cos(ra[e]));t.needsUpdate=!0,V0.rotation.y+=8e-4,W0.rotation.y+=8e-5,ks.render(kn,da)}$0();const $s=document.getElementById("start-btn"),Qd=document.getElementById("overlay"),ep=document.getElementById("load-msg");$s.addEventListener("click",async()=>{$s.disabled=!0,$s.textContent="초기화 중...",ep.textContent="MediaPipe 모델 로딩 중 (3~5초)",rl.textContent="초기화중";try{await Ss.start(),Ss.createPanel(),rl.textContent="감지중",Qd.classList.add("fade-out"),setTimeout(()=>{Qd.style.display="none"},650),oc("","핸드 트래킹 시작")}catch(t){rl.textContent="오류",ep.textContent=`오류: ${t.message}`,$s.disabled=!1,$s.textContent="다시 시도",console.error(t)}});window.addEventListener("resize",()=>{da.aspect=window.innerWidth/window.innerHeight,da.updateProjectionMatrix(),ks.setSize(window.innerWidth,window.innerHeight)});
