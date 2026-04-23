var p_=Object.defineProperty;var m_=(t,e,n)=>e in t?p_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Le=(t,e,n)=>m_(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const cu="183",g_=0,Dd=1,__=2,Vo=1,v_=2,Aa=3,_r=0,dn=1,vi=2,Wi=0,Ms=1,Ti=2,Id=3,Ud=4,x_=5,Dr=100,M_=101,S_=102,y_=103,E_=104,b_=200,T_=201,A_=202,w_=203,Hl=204,Wl=205,R_=206,C_=207,P_=208,L_=209,D_=210,I_=211,U_=212,N_=213,F_=214,Xl=0,Yl=1,ql=2,Cs=3,$l=4,jl=5,Kl=6,Zl=7,lu=0,O_=1,B_=2,yi=0,am=1,om=2,cm=3,lm=4,hm=5,um=6,dm=7,fm=300,qr=301,Ps=302,Xc=303,Yc=304,mc=306,Jl=1e3,Hi=1001,Ql=1002,Jt=1003,k_=1004,ro=1005,Kt=1006,qc=1007,Nr=1008,Xn=1009,pm=1010,mm=1011,Ua=1012,hu=1013,Ai=1014,xi=1015,qi=1016,uu=1017,du=1018,Na=1020,gm=35902,_m=35899,vm=1021,xm=1022,si=1023,$i=1026,Fr=1027,Mm=1028,fu=1029,Ls=1030,pu=1031,mu=1033,Go=33776,Ho=33777,Wo=33778,Xo=33779,eh=35840,th=35841,nh=35842,ih=35843,rh=36196,sh=37492,ah=37496,oh=37488,ch=37489,lh=37490,hh=37491,uh=37808,dh=37809,fh=37810,ph=37811,mh=37812,gh=37813,_h=37814,vh=37815,xh=37816,Mh=37817,Sh=37818,yh=37819,Eh=37820,bh=37821,Th=36492,Ah=36494,wh=36495,Rh=36283,Ch=36284,Ph=36285,Lh=36286,z_=3200,Sm=0,V_=1,ur="",wn="srgb",Ds="srgb-linear",ec="linear",at="srgb",ns=7680,Nd=519,G_=512,H_=513,W_=514,gu=515,X_=516,Y_=517,_u=518,q_=519,Fd=35044,Od="300 es",Mi=2e3,tc=2001;function $_(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function nc(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function j_(){const t=nc("canvas");return t.style.display="block",t}const Bd={};function kd(...t){const e="THREE."+t.shift();console.log(e,...t)}function ym(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function Ne(...t){t=ym(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function Qe(...t){t=ym(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function ic(...t){const e=t.join(" ");e in Bd||(Bd[e]=!0,Ne(...t))}function K_(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const Z_={[Xl]:Yl,[ql]:Kl,[$l]:Zl,[Cs]:jl,[Yl]:Xl,[Kl]:ql,[Zl]:$l,[jl]:Cs};class Zs{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],$c=Math.PI/180,Dh=180/Math.PI;function Va(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(tn[t&255]+tn[t>>8&255]+tn[t>>16&255]+tn[t>>24&255]+"-"+tn[e&255]+tn[e>>8&255]+"-"+tn[e>>16&15|64]+tn[e>>24&255]+"-"+tn[n&63|128]+tn[n>>8&255]+"-"+tn[n>>16&255]+tn[n>>24&255]+tn[i&255]+tn[i>>8&255]+tn[i>>16&255]+tn[i>>24&255]).toLowerCase()}function Ye(t,e,n){return Math.max(e,Math.min(n,t))}function J_(t,e){return(t%e+e)%e}function jc(t,e,n){return(1-n)*t+n*e}function pa(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function mn(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}class it{constructor(e=0,n=0){it.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Js{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,a,o){let c=i[r+0],l=i[r+1],h=i[r+2],d=i[r+3],u=s[a+0],f=s[a+1],g=s[a+2],M=s[a+3];if(d!==M||c!==u||l!==f||h!==g){let m=c*u+l*f+h*g+d*M;m<0&&(u=-u,f=-f,g=-g,M=-M,m=-m);let p=1-o;if(m<.9995){const S=Math.acos(m),T=Math.sin(S);p=Math.sin(p*S)/T,o=Math.sin(o*S)/T,c=c*p+u*o,l=l*p+f*o,h=h*p+g*o,d=d*p+M*o}else{c=c*p+u*o,l=l*p+f*o,h=h*p+g*o,d=d*p+M*o;const S=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=S,l*=S,h*=S,d*=S}}e[n]=c,e[n+1]=l,e[n+2]=h,e[n+3]=d}static multiplyQuaternionsFlat(e,n,i,r,s,a){const o=i[r],c=i[r+1],l=i[r+2],h=i[r+3],d=s[a],u=s[a+1],f=s[a+2],g=s[a+3];return e[n]=o*g+h*d+c*f-l*u,e[n+1]=c*g+h*u+l*d-o*f,e[n+2]=l*g+h*f+o*u-c*d,e[n+3]=h*g-o*d-c*u-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(r/2),d=o(s/2),u=c(i/2),f=c(r/2),g=c(s/2);switch(a){case"XYZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"YZX":this._x=u*h*d+l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d-u*f*g;break;case"XZY":this._x=u*h*d-l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d+u*f*g;break;default:Ne("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],c=n[9],l=n[2],h=n[6],d=n[10],u=i+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(a-r)*f}else if(i>o&&i>d){const f=2*Math.sqrt(1+i-o-d);this._w=(h-c)/f,this._x=.25*f,this._y=(r+a)/f,this._z=(s+l)/f}else if(o>d){const f=2*Math.sqrt(1+o-i-d);this._w=(s-l)/f,this._x=(r+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-i-o);this._w=(a-r)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ye(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,a=e._w,o=n._x,c=n._y,l=n._z,h=n._w;return this._x=i*h+a*o+r*l-s*c,this._y=r*h+a*c+s*o-i*l,this._z=s*h+a*l+i*c-r*o,this._w=a*h-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,n){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let c=1-n;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,n=Math.sin(n*l)/h,this._x=this._x*c+i*n,this._y=this._y*c+r*n,this._z=this._z*c+s*n,this._w=this._w*c+a*n,this._onChangeCallback()}else this._x=this._x*c+i*n,this._y=this._y*c+r*n,this._z=this._z*c+s*n,this._w=this._w*c+a*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class I{constructor(e=0,n=0,i=0){I.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(zd.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(zd.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*i),h=2*(o*n-s*r),d=2*(s*i-a*n);return this.x=n+c*l+a*d-o*h,this.y=i+c*h+o*l-s*d,this.z=r+c*d+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this.z=Ye(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this.z=Ye(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,a=n.x,o=n.y,c=n.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Kc.copy(this).projectOnVector(e),this.sub(Kc)}reflect(e){return this.sub(Kc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Ye(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Kc=new I,zd=new Js;class ze{constructor(e,n,i,r,s,a,o,c,l){ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,c,l)}set(e,n,i,r,s,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=n,h[4]=s,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],d=i[7],u=i[2],f=i[5],g=i[8],M=r[0],m=r[3],p=r[6],S=r[1],T=r[4],y=r[7],R=r[2],A=r[5],C=r[8];return s[0]=a*M+o*S+c*R,s[3]=a*m+o*T+c*A,s[6]=a*p+o*y+c*C,s[1]=l*M+h*S+d*R,s[4]=l*m+h*T+d*A,s[7]=l*p+h*y+d*C,s[2]=u*M+f*S+g*R,s[5]=u*m+f*T+g*A,s[8]=u*p+f*y+g*C,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return n*a*h-n*o*l-i*s*h+i*o*c+r*s*l-r*a*c}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=h*a-o*l,u=o*c-h*s,f=l*s-a*c,g=n*d+i*u+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/g;return e[0]=d*M,e[1]=(r*l-h*i)*M,e[2]=(o*i-r*a)*M,e[3]=u*M,e[4]=(h*n-r*c)*M,e[5]=(r*s-o*n)*M,e[6]=f*M,e[7]=(i*c-l*n)*M,e[8]=(a*n-i*s)*M,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+n,0,0,1),this}scale(e,n){return this.premultiply(Zc.makeScale(e,n)),this}rotate(e){return this.premultiply(Zc.makeRotation(-e)),this}translate(e,n){return this.premultiply(Zc.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Zc=new ze,Vd=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Gd=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Q_(){const t={enabled:!0,workingColorSpace:Ds,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===at&&(r.r=Xi(r.r),r.g=Xi(r.g),r.b=Xi(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===at&&(r.r=Ss(r.r),r.g=Ss(r.g),r.b=Ss(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===ur?ec:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return ic("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return ic("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[Ds]:{primaries:e,whitePoint:i,transfer:ec,toXYZ:Vd,fromXYZ:Gd,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:wn},outputColorSpaceConfig:{drawingBufferColorSpace:wn}},[wn]:{primaries:e,whitePoint:i,transfer:at,toXYZ:Vd,fromXYZ:Gd,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:wn}}}),t}const Ke=Q_();function Xi(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Ss(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let is;class e1{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{is===void 0&&(is=nc("canvas")),is.width=e.width,is.height=e.height;const r=is.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=is}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=nc("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Xi(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Xi(n[i]/255)*255):n[i]=Xi(n[i]);return{data:n,width:e.width,height:e.height}}else return Ne("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let t1=0;class vu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:t1++}),this.uuid=Va(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayHeight,n.displayWidth,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(Jc(r[a].image)):s.push(Jc(r[a]))}else s=Jc(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function Jc(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?e1.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(Ne("Texture: Unable to serialize Texture."),{})}let n1=0;const Qc=new I;class cn extends Zs{constructor(e=cn.DEFAULT_IMAGE,n=cn.DEFAULT_MAPPING,i=Hi,r=Hi,s=Kt,a=Nr,o=si,c=Xn,l=cn.DEFAULT_ANISOTROPY,h=ur){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:n1++}),this.uuid=Va(),this.name="",this.source=new vu(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new it(0,0),this.repeat=new it(1,1),this.center=new it(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Qc).x}get height(){return this.source.getSize(Qc).y}get depth(){return this.source.getSize(Qc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){Ne(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Ne(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==fm)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Jl:e.x=e.x-Math.floor(e.x);break;case Hi:e.x=e.x<0?0:1;break;case Ql:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Jl:e.y=e.y-Math.floor(e.y);break;case Hi:e.y=e.y<0?0:1;break;case Ql:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}cn.DEFAULT_IMAGE=null;cn.DEFAULT_MAPPING=fm;cn.DEFAULT_ANISOTROPY=1;class Dt{constructor(e=0,n=0,i=0,r=1){Dt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const c=e.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],g=c[9],M=c[2],m=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-M)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+M)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const T=(l+1)/2,y=(f+1)/2,R=(p+1)/2,A=(h+u)/4,C=(d+M)/4,v=(g+m)/4;return T>y&&T>R?T<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(T),r=A/i,s=C/i):y>R?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=A/r,s=v/r):R<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(R),i=C/s,r=v/s),this.set(i,r,s,n),this}let S=Math.sqrt((m-g)*(m-g)+(d-M)*(d-M)+(u-h)*(u-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(d-M)/S,this.z=(u-h)/S,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Ye(this.x,e.x,n.x),this.y=Ye(this.y,e.y,n.y),this.z=Ye(this.z,e.z,n.z),this.w=Ye(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Ye(this.x,e,n),this.y=Ye(this.y,e,n),this.z=Ye(this.z,e,n),this.w=Ye(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Ye(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class i1 extends Zs{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Kt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new Dt(0,0,e,n),this.scissorTest=!1,this.viewport=new Dt(0,0,e,n),this.textures=[];const r={width:e,height:n,depth:i.depth},s=new cn(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const n={minFilter:Kt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new vu(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ei extends i1{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class Em extends cn{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=Hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class r1 extends cn{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=Jt,this.minFilter=Jt,this.wrapR=Hi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class bt{constructor(e,n,i,r,s,a,o,c,l,h,d,u,f,g,M,m){bt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,c,l,h,d,u,f,g,M,m)}set(e,n,i,r,s,a,o,c,l,h,d,u,f,g,M,m){const p=this.elements;return p[0]=e,p[4]=n,p[8]=i,p[12]=r,p[1]=s,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=M,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new bt().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinant()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const n=this.elements,i=e.elements,r=1/rs.setFromMatrixColumn(e,0).length(),s=1/rs.setFromMatrixColumn(e,1).length(),a=1/rs.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const u=a*h,f=a*d,g=o*h,M=o*d;n[0]=c*h,n[4]=-c*d,n[8]=l,n[1]=f+g*l,n[5]=u-M*l,n[9]=-o*c,n[2]=M-u*l,n[6]=g+f*l,n[10]=a*c}else if(e.order==="YXZ"){const u=c*h,f=c*d,g=l*h,M=l*d;n[0]=u+M*o,n[4]=g*o-f,n[8]=a*l,n[1]=a*d,n[5]=a*h,n[9]=-o,n[2]=f*o-g,n[6]=M+u*o,n[10]=a*c}else if(e.order==="ZXY"){const u=c*h,f=c*d,g=l*h,M=l*d;n[0]=u-M*o,n[4]=-a*d,n[8]=g+f*o,n[1]=f+g*o,n[5]=a*h,n[9]=M-u*o,n[2]=-a*l,n[6]=o,n[10]=a*c}else if(e.order==="ZYX"){const u=a*h,f=a*d,g=o*h,M=o*d;n[0]=c*h,n[4]=g*l-f,n[8]=u*l+M,n[1]=c*d,n[5]=M*l+u,n[9]=f*l-g,n[2]=-l,n[6]=o*c,n[10]=a*c}else if(e.order==="YZX"){const u=a*c,f=a*l,g=o*c,M=o*l;n[0]=c*h,n[4]=M-u*d,n[8]=g*d+f,n[1]=d,n[5]=a*h,n[9]=-o*h,n[2]=-l*h,n[6]=f*d+g,n[10]=u-M*d}else if(e.order==="XZY"){const u=a*c,f=a*l,g=o*c,M=o*l;n[0]=c*h,n[4]=-d,n[8]=l*h,n[1]=u*d+M,n[5]=a*h,n[9]=f*d-g,n[2]=g*d-f,n[6]=o*h,n[10]=M*d+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(s1,e,a1)}lookAt(e,n,i){const r=this.elements;return Sn.subVectors(e,n),Sn.lengthSq()===0&&(Sn.z=1),Sn.normalize(),nr.crossVectors(i,Sn),nr.lengthSq()===0&&(Math.abs(i.z)===1?Sn.x+=1e-4:Sn.z+=1e-4,Sn.normalize(),nr.crossVectors(i,Sn)),nr.normalize(),so.crossVectors(Sn,nr),r[0]=nr.x,r[4]=so.x,r[8]=Sn.x,r[1]=nr.y,r[5]=so.y,r[9]=Sn.y,r[2]=nr.z,r[6]=so.z,r[10]=Sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],d=i[5],u=i[9],f=i[13],g=i[2],M=i[6],m=i[10],p=i[14],S=i[3],T=i[7],y=i[11],R=i[15],A=r[0],C=r[4],v=r[8],b=r[12],q=r[1],P=r[5],k=r[9],z=r[13],X=r[2],B=r[6],G=r[10],N=r[14],Q=r[3],K=r[7],le=r[11],ge=r[15];return s[0]=a*A+o*q+c*X+l*Q,s[4]=a*C+o*P+c*B+l*K,s[8]=a*v+o*k+c*G+l*le,s[12]=a*b+o*z+c*N+l*ge,s[1]=h*A+d*q+u*X+f*Q,s[5]=h*C+d*P+u*B+f*K,s[9]=h*v+d*k+u*G+f*le,s[13]=h*b+d*z+u*N+f*ge,s[2]=g*A+M*q+m*X+p*Q,s[6]=g*C+M*P+m*B+p*K,s[10]=g*v+M*k+m*G+p*le,s[14]=g*b+M*z+m*N+p*ge,s[3]=S*A+T*q+y*X+R*Q,s[7]=S*C+T*P+y*B+R*K,s[11]=S*v+T*k+y*G+R*le,s[15]=S*b+T*z+y*N+R*ge,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],M=e[7],m=e[11],p=e[15],S=c*f-l*u,T=o*f-l*d,y=o*u-c*d,R=a*f-l*h,A=a*u-c*h,C=a*d-o*h;return n*(M*S-m*T+p*y)-i*(g*S-m*R+p*A)+r*(g*T-M*R+p*C)-s*(g*y-M*A+m*C)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],M=e[13],m=e[14],p=e[15],S=n*o-i*a,T=n*c-r*a,y=n*l-s*a,R=i*c-r*o,A=i*l-s*o,C=r*l-s*c,v=h*M-d*g,b=h*m-u*g,q=h*p-f*g,P=d*m-u*M,k=d*p-f*M,z=u*p-f*m,X=S*z-T*k+y*P+R*q-A*b+C*v;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/X;return e[0]=(o*z-c*k+l*P)*B,e[1]=(r*k-i*z-s*P)*B,e[2]=(M*C-m*A+p*R)*B,e[3]=(u*A-d*C-f*R)*B,e[4]=(c*q-a*z-l*b)*B,e[5]=(n*z-r*q+s*b)*B,e[6]=(m*y-g*C-p*T)*B,e[7]=(h*C-u*y+f*T)*B,e[8]=(a*k-o*q+l*v)*B,e[9]=(i*q-n*k-s*v)*B,e[10]=(g*A-M*y+p*S)*B,e[11]=(d*y-h*A-f*S)*B,e[12]=(o*b-a*P-c*v)*B,e[13]=(n*P-i*b+r*v)*B,e[14]=(M*T-g*R-m*S)*B,e[15]=(h*R-d*T+u*S)*B,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,h*o+i,h*c-r*a,0,l*c-r*o,h*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,c=n._w,l=s+s,h=a+a,d=o+o,u=s*l,f=s*h,g=s*d,M=a*h,m=a*d,p=o*d,S=c*l,T=c*h,y=c*d,R=i.x,A=i.y,C=i.z;return r[0]=(1-(M+p))*R,r[1]=(f+y)*R,r[2]=(g-T)*R,r[3]=0,r[4]=(f-y)*A,r[5]=(1-(u+p))*A,r[6]=(m+S)*A,r[7]=0,r[8]=(g+T)*C,r[9]=(m-S)*C,r[10]=(1-(u+M))*C,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return i.set(1,1,1),n.identity(),this;let a=rs.set(r[0],r[1],r[2]).length();const o=rs.set(r[4],r[5],r[6]).length(),c=rs.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Zn.copy(this);const l=1/a,h=1/o,d=1/c;return Zn.elements[0]*=l,Zn.elements[1]*=l,Zn.elements[2]*=l,Zn.elements[4]*=h,Zn.elements[5]*=h,Zn.elements[6]*=h,Zn.elements[8]*=d,Zn.elements[9]*=d,Zn.elements[10]*=d,n.setFromRotationMatrix(Zn),i.x=a,i.y=o,i.z=c,this}makePerspective(e,n,i,r,s,a,o=Mi,c=!1){const l=this.elements,h=2*s/(n-e),d=2*s/(i-r),u=(n+e)/(n-e),f=(i+r)/(i-r);let g,M;if(c)g=s/(a-s),M=a*s/(a-s);else if(o===Mi)g=-(a+s)/(a-s),M=-2*a*s/(a-s);else if(o===tc)g=-a/(a-s),M=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=M,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,a,o=Mi,c=!1){const l=this.elements,h=2/(n-e),d=2/(i-r),u=-(n+e)/(n-e),f=-(i+r)/(i-r);let g,M;if(c)g=1/(a-s),M=a/(a-s);else if(o===Mi)g=-2/(a-s),M=-(a+s)/(a-s);else if(o===tc)g=-1/(a-s),M=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=M,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const rs=new I,Zn=new bt,s1=new I(0,0,0),a1=new I(1,1,1),nr=new I,so=new I,Sn=new I,Hd=new bt,Wd=new Js;class wi{constructor(e=0,n=0,i=0,r=wi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],h=r[9],d=r[2],u=r[6],f=r[10];switch(n){case"XYZ":this._y=Math.asin(Ye(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ye(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Ye(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ye(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ne("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Hd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Hd,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Wd.setFromEuler(this),this.setFromQuaternion(Wd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wi.DEFAULT_ORDER="XYZ";class bm{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let o1=0;const Xd=new I,ss=new Js,Fi=new bt,ao=new I,ma=new I,c1=new I,l1=new Js,Yd=new I(1,0,0),qd=new I(0,1,0),$d=new I(0,0,1),jd={type:"added"},h1={type:"removed"},as={type:"childadded",child:null},el={type:"childremoved",child:null};class fn extends Zs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:o1++}),this.uuid=Va(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=fn.DEFAULT_UP.clone();const e=new I,n=new wi,i=new Js,r=new I(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new bt},normalMatrix:{value:new ze}}),this.matrix=new bt,this.matrixWorld=new bt,this.matrixAutoUpdate=fn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=fn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new bm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return ss.setFromAxisAngle(e,n),this.quaternion.multiply(ss),this}rotateOnWorldAxis(e,n){return ss.setFromAxisAngle(e,n),this.quaternion.premultiply(ss),this}rotateX(e){return this.rotateOnAxis(Yd,e)}rotateY(e){return this.rotateOnAxis(qd,e)}rotateZ(e){return this.rotateOnAxis($d,e)}translateOnAxis(e,n){return Xd.copy(e).applyQuaternion(this.quaternion),this.position.add(Xd.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Yd,e)}translateY(e){return this.translateOnAxis(qd,e)}translateZ(e){return this.translateOnAxis($d,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Fi.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?ao.copy(e):ao.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),ma.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Fi.lookAt(ma,ao,this.up):Fi.lookAt(ao,ma,this.up),this.quaternion.setFromRotationMatrix(Fi),r&&(Fi.extractRotation(r.matrixWorld),ss.setFromRotationMatrix(Fi),this.quaternion.premultiply(ss.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(Qe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(jd),as.child=e,this.dispatchEvent(as),as.child=null):Qe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(h1),el.child=e,this.dispatchEvent(el),el.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Fi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Fi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Fi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(jd),as.child=e,this.dispatchEvent(as),as.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ma,e,c1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ma,l1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*r,s[13]+=i-s[1]*n-s[5]*i-s[9]*r,s[14]+=r-s[2]*n-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];s(e.shapes,d)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(n){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}fn.DEFAULT_UP=new I(0,1,0);fn.DEFAULT_MATRIX_AUTO_UPDATE=!0;fn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Or extends fn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const u1={type:"move"};class tl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Or,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Or,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Or,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const M of e.hand.values()){const m=n.getJointPose(M,i),p=this._getHandJoint(l,M);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&u>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(u1)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Or;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const Tm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ir={h:0,s:0,l:0},oo={h:0,s:0,l:0};function nl(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class qe{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=wn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=Ke.workingColorSpace){return this.r=e,this.g=n,this.b=i,Ke.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=Ke.workingColorSpace){if(e=J_(e,1),n=Ye(n,0,1),i=Ye(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=nl(a,s,e+1/3),this.g=nl(a,s,e),this.b=nl(a,s,e-1/3)}return Ke.colorSpaceToWorking(this,r),this}setStyle(e,n=wn){function i(s){s!==void 0&&parseFloat(s)<1&&Ne("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:Ne("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);Ne("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=wn){const i=Tm[e.toLowerCase()];return i!==void 0?this.setHex(i,n):Ne("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xi(e.r),this.g=Xi(e.g),this.b=Xi(e.b),this}copyLinearToSRGB(e){return this.r=Ss(e.r),this.g=Ss(e.g),this.b=Ss(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=wn){return Ke.workingToColorSpace(nn.copy(this),e),Math.round(Ye(nn.r*255,0,255))*65536+Math.round(Ye(nn.g*255,0,255))*256+Math.round(Ye(nn.b*255,0,255))}getHexString(e=wn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Ke.workingColorSpace){Ke.workingToColorSpace(nn.copy(this),n);const i=nn.r,r=nn.g,s=nn.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case i:c=(r-s)/d+(r<s?6:0);break;case r:c=(s-i)/d+2;break;case s:c=(i-r)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,n=Ke.workingColorSpace){return Ke.workingToColorSpace(nn.copy(this),n),e.r=nn.r,e.g=nn.g,e.b=nn.b,e}getStyle(e=wn){Ke.workingToColorSpace(nn.copy(this),e);const n=nn.r,i=nn.g,r=nn.b;return e!==wn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(ir),this.setHSL(ir.h+e,ir.s+n,ir.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(ir),e.getHSL(oo);const i=jc(ir.h,oo.h,n),r=jc(ir.s,oo.s,n),s=jc(ir.l,oo.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const nn=new qe;qe.NAMES=Tm;class xu{constructor(e,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new qe(e),this.density=n}clone(){return new xu(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class d1 extends fn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wi,this.environmentIntensity=1,this.environmentRotation=new wi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Jn=new I,Oi=new I,il=new I,Bi=new I,os=new I,cs=new I,Kd=new I,rl=new I,sl=new I,al=new I,ol=new Dt,cl=new Dt,ll=new Dt;class ti{constructor(e=new I,n=new I,i=new I){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Jn.subVectors(e,n),r.cross(Jn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Jn.subVectors(r,n),Oi.subVectors(i,n),il.subVectors(e,n);const a=Jn.dot(Jn),o=Jn.dot(Oi),c=Jn.dot(il),l=Oi.dot(Oi),h=Oi.dot(il),d=a*l-o*o;if(d===0)return s.set(0,0,0),null;const u=1/d,f=(l*c-o*h)*u,g=(a*h-o*c)*u;return s.set(1-f-g,g,f)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Bi)===null?!1:Bi.x>=0&&Bi.y>=0&&Bi.x+Bi.y<=1}static getInterpolation(e,n,i,r,s,a,o,c){return this.getBarycoord(e,n,i,r,Bi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Bi.x),c.addScaledVector(a,Bi.y),c.addScaledVector(o,Bi.z),c)}static getInterpolatedAttribute(e,n,i,r,s,a){return ol.setScalar(0),cl.setScalar(0),ll.setScalar(0),ol.fromBufferAttribute(e,n),cl.fromBufferAttribute(e,i),ll.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ol,s.x),a.addScaledVector(cl,s.y),a.addScaledVector(ll,s.z),a}static isFrontFacing(e,n,i,r){return Jn.subVectors(i,n),Oi.subVectors(e,n),Jn.cross(Oi).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Jn.subVectors(this.c,this.b),Oi.subVectors(this.a,this.b),Jn.cross(Oi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ti.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return ti.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return ti.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return ti.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ti.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let a,o;os.subVectors(r,i),cs.subVectors(s,i),rl.subVectors(e,i);const c=os.dot(rl),l=cs.dot(rl);if(c<=0&&l<=0)return n.copy(i);sl.subVectors(e,r);const h=os.dot(sl),d=cs.dot(sl);if(h>=0&&d<=h)return n.copy(r);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),n.copy(i).addScaledVector(os,a);al.subVectors(e,s);const f=os.dot(al),g=cs.dot(al);if(g>=0&&f<=g)return n.copy(s);const M=f*l-c*g;if(M<=0&&l>=0&&g<=0)return o=l/(l-g),n.copy(i).addScaledVector(cs,o);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return Kd.subVectors(s,r),o=(d-h)/(d-h+(f-g)),n.copy(r).addScaledVector(Kd,o);const p=1/(m+M+u);return a=M*p,o=u*p,n.copy(i).addScaledVector(os,a).addScaledVector(cs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Ga{constructor(e=new I(1/0,1/0,1/0),n=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Qn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Qn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Qn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Qn):Qn.fromBufferAttribute(s,a),Qn.applyMatrix4(e.matrixWorld),this.expandByPoint(Qn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),co.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),co.copy(i.boundingBox)),co.applyMatrix4(e.matrixWorld),this.union(co)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Qn),Qn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ga),lo.subVectors(this.max,ga),ls.subVectors(e.a,ga),hs.subVectors(e.b,ga),us.subVectors(e.c,ga),rr.subVectors(hs,ls),sr.subVectors(us,hs),br.subVectors(ls,us);let n=[0,-rr.z,rr.y,0,-sr.z,sr.y,0,-br.z,br.y,rr.z,0,-rr.x,sr.z,0,-sr.x,br.z,0,-br.x,-rr.y,rr.x,0,-sr.y,sr.x,0,-br.y,br.x,0];return!hl(n,ls,hs,us,lo)||(n=[1,0,0,0,1,0,0,0,1],!hl(n,ls,hs,us,lo))?!1:(ho.crossVectors(rr,sr),n=[ho.x,ho.y,ho.z],hl(n,ls,hs,us,lo))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Qn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ki[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ki[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ki[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ki[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ki[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ki[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ki[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ki[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ki),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ki=[new I,new I,new I,new I,new I,new I,new I,new I],Qn=new I,co=new Ga,ls=new I,hs=new I,us=new I,rr=new I,sr=new I,br=new I,ga=new I,lo=new I,ho=new I,Tr=new I;function hl(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){Tr.fromArray(t,s);const o=r.x*Math.abs(Tr.x)+r.y*Math.abs(Tr.y)+r.z*Math.abs(Tr.z),c=e.dot(Tr),l=n.dot(Tr),h=i.dot(Tr);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Ut=new I,uo=new it;let f1=0;class an{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:f1++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Fd,this.updateRanges=[],this.gpuType=xi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)uo.fromBufferAttribute(this,n),uo.applyMatrix3(e),this.setXY(n,uo.x,uo.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ut.fromBufferAttribute(this,n),Ut.applyMatrix3(e),this.setXYZ(n,Ut.x,Ut.y,Ut.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Ut.fromBufferAttribute(this,n),Ut.applyMatrix4(e),this.setXYZ(n,Ut.x,Ut.y,Ut.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Ut.fromBufferAttribute(this,n),Ut.applyNormalMatrix(e),this.setXYZ(n,Ut.x,Ut.y,Ut.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Ut.fromBufferAttribute(this,n),Ut.transformDirection(e),this.setXYZ(n,Ut.x,Ut.y,Ut.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=pa(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=mn(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=pa(n,this.array)),n}setX(e,n){return this.normalized&&(n=mn(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=pa(n,this.array)),n}setY(e,n){return this.normalized&&(n=mn(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=pa(n,this.array)),n}setZ(e,n){return this.normalized&&(n=mn(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=pa(n,this.array)),n}setW(e,n){return this.normalized&&(n=mn(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=mn(n,this.array),i=mn(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=mn(n,this.array),i=mn(i,this.array),r=mn(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=mn(n,this.array),i=mn(i,this.array),r=mn(r,this.array),s=mn(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Fd&&(e.usage=this.usage),e}}class Am extends an{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class wm extends an{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class wt extends an{constructor(e,n,i){super(new Float32Array(e),n,i)}}const p1=new Ga,_a=new I,ul=new I;class Ha{constructor(e=new I,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):p1.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_a.subVectors(e,this.center);const n=_a.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(_a,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ul.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_a.copy(e.center).add(ul)),this.expandByPoint(_a.copy(e.center).sub(ul))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let m1=0;const Fn=new bt,dl=new fn,ds=new I,yn=new Ga,va=new Ga,qt=new I;class Vt extends Zs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:m1++}),this.uuid=Va(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new($_(e)?wm:Am)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new ze().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Fn.makeRotationFromQuaternion(e),this.applyMatrix4(Fn),this}rotateX(e){return Fn.makeRotationX(e),this.applyMatrix4(Fn),this}rotateY(e){return Fn.makeRotationY(e),this.applyMatrix4(Fn),this}rotateZ(e){return Fn.makeRotationZ(e),this.applyMatrix4(Fn),this}translate(e,n,i){return Fn.makeTranslation(e,n,i),this.applyMatrix4(Fn),this}scale(e,n,i){return Fn.makeScale(e,n,i),this.applyMatrix4(Fn),this}lookAt(e){return dl.lookAt(e),dl.updateMatrix(),this.applyMatrix4(dl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ds).negate(),this.translate(ds.x,ds.y,ds.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new wt(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&Ne("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ga);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];yn.setFromBufferAttribute(s),this.morphTargetsRelative?(qt.addVectors(this.boundingBox.min,yn.min),this.boundingBox.expandByPoint(qt),qt.addVectors(this.boundingBox.max,yn.max),this.boundingBox.expandByPoint(qt)):(this.boundingBox.expandByPoint(yn.min),this.boundingBox.expandByPoint(yn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ha);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Qe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const i=this.boundingSphere.center;if(yn.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];va.setFromBufferAttribute(o),this.morphTargetsRelative?(qt.addVectors(yn.min,va.min),yn.expandByPoint(qt),qt.addVectors(yn.max,va.max),yn.expandByPoint(qt)):(yn.expandByPoint(va.min),yn.expandByPoint(va.max))}yn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)qt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(qt));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)qt.fromBufferAttribute(o,l),c&&(ds.fromBufferAttribute(e,l),qt.add(ds)),r=Math.max(r,i.distanceToSquared(qt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Qe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Qe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new an(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let v=0;v<i.count;v++)o[v]=new I,c[v]=new I;const l=new I,h=new I,d=new I,u=new it,f=new it,g=new it,M=new I,m=new I;function p(v,b,q){l.fromBufferAttribute(i,v),h.fromBufferAttribute(i,b),d.fromBufferAttribute(i,q),u.fromBufferAttribute(s,v),f.fromBufferAttribute(s,b),g.fromBufferAttribute(s,q),h.sub(l),d.sub(l),f.sub(u),g.sub(u);const P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(M.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(P),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),o[v].add(M),o[b].add(M),o[q].add(M),c[v].add(m),c[b].add(m),c[q].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let v=0,b=S.length;v<b;++v){const q=S[v],P=q.start,k=q.count;for(let z=P,X=P+k;z<X;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const T=new I,y=new I,R=new I,A=new I;function C(v){R.fromBufferAttribute(r,v),A.copy(R);const b=o[v];T.copy(b),T.sub(R.multiplyScalar(R.dot(b))).normalize(),y.crossVectors(A,b);const P=y.dot(c[v])<0?-1:1;a.setXYZW(v,T.x,T.y,T.z,P)}for(let v=0,b=S.length;v<b;++v){const q=S[v],P=q.start,k=q.count;for(let z=P,X=P+k;z<X;z+=3)C(e.getX(z+0)),C(e.getX(z+1)),C(e.getX(z+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new an(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);const r=new I,s=new I,a=new I,o=new I,c=new I,l=new I,h=new I,d=new I;if(e)for(let u=0,f=e.count;u<f;u+=3){const g=e.getX(u+0),M=e.getX(u+1),m=e.getX(u+2);r.fromBufferAttribute(n,g),s.fromBufferAttribute(n,M),a.fromBufferAttribute(n,m),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,M),l.fromBufferAttribute(i,m),o.add(h),c.add(h),l.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(M,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,f=n.count;u<f;u+=3)r.fromBufferAttribute(n,u+0),s.fromBufferAttribute(n,u+1),a.fromBufferAttribute(n,u+2),h.subVectors(a,s),d.subVectors(r,s),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)qt.fromBufferAttribute(e,n),qt.normalize(),e.setXYZ(n,qt.x,qt.y,qt.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h);let f=0,g=0;for(let M=0,m=c.length;M<m;M++){o.isInterleavedBufferAttribute?f=c[M]*o.data.stride+o.offset:f=c[M]*h;for(let p=0;p<h;p++)u[g++]=l[f++]}return new an(u,h,d)}if(this.index===null)return Ne("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Vt,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,i);n.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let h=0,d=l.length;h<d;h++){const u=l[h],f=e(u,i);c.push(f)}n.morphAttributes[o]=c}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];n.addGroup(l.start,l.count,l.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d];h.push(f.toJSON(e.data))}h.length>0&&(r[c]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const l in r){const h=r[l];this.setAttribute(l,h.clone(n))}const s=e.morphAttributes;for(const l in s){const h=[],d=s[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(n));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let g1=0;class ji extends Zs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:g1++}),this.uuid=Va(),this.name="",this.type="Material",this.blending=Ms,this.side=_r,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Hl,this.blendDst=Wl,this.blendEquation=Dr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new qe(0,0,0),this.blendAlpha=0,this.depthFunc=Cs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Nd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ns,this.stencilZFail=ns,this.stencilZPass=ns,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){Ne(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Ne(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ms&&(i.blending=this.blending),this.side!==_r&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Hl&&(i.blendSrc=this.blendSrc),this.blendDst!==Wl&&(i.blendDst=this.blendDst),this.blendEquation!==Dr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Cs&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Nd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ns&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ns&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ns&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(n){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const zi=new I,fl=new I,fo=new I,ar=new I,pl=new I,po=new I,ml=new I;class Mu{constructor(e=new I,n=new I(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,zi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=zi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(zi.copy(this.origin).addScaledVector(this.direction,n),zi.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){fl.copy(e).add(n).multiplyScalar(.5),fo.copy(n).sub(e).normalize(),ar.copy(this.origin).sub(fl);const s=e.distanceTo(n)*.5,a=-this.direction.dot(fo),o=ar.dot(this.direction),c=-ar.dot(fo),l=ar.lengthSq(),h=Math.abs(1-a*a);let d,u,f,g;if(h>0)if(d=a*c-o,u=a*o-c,g=s*h,d>=0)if(u>=-g)if(u<=g){const M=1/h;d*=M,u*=M,f=d*(d+a*u+2*o)+u*(a*d+u+2*c)+l}else u=s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u=-s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-a*s+o)),u=d>0?-s:Math.min(Math.max(-s,-c),s),f=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-s,-c),s),f=u*(u+2*c)+l):(d=Math.max(0,-(a*s+o)),u=d>0?s:Math.min(Math.max(-s,-c),s),f=-d*d+u*(u+2*c)+l);else u=a>0?-s:s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(fl).addScaledVector(fo,u),f}intersectSphere(e,n){zi.subVectors(e.center,this.origin);const i=zi.dot(this.direction),r=zi.dot(zi)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,n):this.at(o,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,r=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,r=(e.min.x-u.x)*l),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),d>=0?(o=(e.min.z-u.z)*d,c=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,c=(e.min.z-u.z)*d),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,zi)!==null}intersectTriangle(e,n,i,r,s){pl.subVectors(n,e),po.subVectors(i,e),ml.crossVectors(pl,po);let a=this.direction.dot(ml),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ar.subVectors(this.origin,e);const c=o*this.direction.dot(po.crossVectors(ar,po));if(c<0)return null;const l=o*this.direction.dot(pl.cross(ar));if(l<0||c+l>a)return null;const h=-o*ar.dot(ml);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Qs extends ji{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new qe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.combine=lu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Zd=new bt,Ar=new Mu,mo=new Ha,Jd=new I,go=new I,_o=new I,vo=new I,gl=new I,xo=new I,Qd=new I,Mo=new I;class pn extends fn{constructor(e=new Vt,n=new Qs){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){xo.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=o[c],d=s[c];h!==0&&(gl.fromBufferAttribute(d,e),a?xo.addScaledVector(gl,h):xo.addScaledVector(gl.sub(n),h))}n.add(xo)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),mo.copy(i.boundingSphere),mo.applyMatrix4(s),Ar.copy(e.ray).recast(e.near),!(mo.containsPoint(Ar.origin)===!1&&(Ar.intersectSphere(mo,Jd)===null||Ar.origin.distanceToSquared(Jd)>(e.far-e.near)**2))&&(Zd.copy(s).invert(),Ar.copy(e.ray).applyMatrix4(Zd),!(i.boundingBox!==null&&Ar.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Ar)))}_computeIntersections(e,n,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,M=u.length;g<M;g++){const m=u[g],p=a[m.materialIndex],S=Math.max(m.start,f.start),T=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let y=S,R=T;y<R;y+=3){const A=o.getX(y),C=o.getX(y+1),v=o.getX(y+2);r=So(this,p,e,i,l,h,d,A,C,v),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const g=Math.max(0,f.start),M=Math.min(o.count,f.start+f.count);for(let m=g,p=M;m<p;m+=3){const S=o.getX(m),T=o.getX(m+1),y=o.getX(m+2);r=So(this,a,e,i,l,h,d,S,T,y),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,M=u.length;g<M;g++){const m=u[g],p=a[m.materialIndex],S=Math.max(m.start,f.start),T=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let y=S,R=T;y<R;y+=3){const A=y,C=y+1,v=y+2;r=So(this,p,e,i,l,h,d,A,C,v),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=m.materialIndex,n.push(r))}}else{const g=Math.max(0,f.start),M=Math.min(c.count,f.start+f.count);for(let m=g,p=M;m<p;m+=3){const S=m,T=m+1,y=m+2;r=So(this,a,e,i,l,h,d,S,T,y),r&&(r.faceIndex=Math.floor(m/3),n.push(r))}}}}function _1(t,e,n,i,r,s,a,o){let c;if(e.side===dn?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===_r,o),c===null)return null;Mo.copy(o),Mo.applyMatrix4(t.matrixWorld);const l=n.ray.origin.distanceTo(Mo);return l<n.near||l>n.far?null:{distance:l,point:Mo.clone(),object:t}}function So(t,e,n,i,r,s,a,o,c,l){t.getVertexPosition(o,go),t.getVertexPosition(c,_o),t.getVertexPosition(l,vo);const h=_1(t,e,n,i,go,_o,vo,Qd);if(h){const d=new I;ti.getBarycoord(Qd,go,_o,vo,d),r&&(h.uv=ti.getInterpolatedAttribute(r,o,c,l,d,new it)),s&&(h.uv1=ti.getInterpolatedAttribute(s,o,c,l,d,new it)),a&&(h.normal=ti.getInterpolatedAttribute(a,o,c,l,d,new I),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new I,materialIndex:0};ti.getNormal(go,_o,vo,u.normal),h.face=u,h.barycoord=d}return h}class v1 extends cn{constructor(e=null,n=1,i=1,r,s,a,o,c,l=Jt,h=Jt,d,u){super(null,a,o,c,l,h,r,s,d,u),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const _l=new I,x1=new I,M1=new ze;class Lr{constructor(e=new I(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=_l.subVectors(i,n).cross(x1.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(_l),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||M1.getNormalMatrix(e),r=this.coplanarPoint(_l).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const wr=new Ha,S1=new it(.5,.5),yo=new I;class Rm{constructor(e=new Lr,n=new Lr,i=new Lr,r=new Lr,s=new Lr,a=new Lr){this.planes=[e,n,i,r,s,a]}set(e,n,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=Mi,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],d=s[5],u=s[6],f=s[7],g=s[8],M=s[9],m=s[10],p=s[11],S=s[12],T=s[13],y=s[14],R=s[15];if(r[0].setComponents(l-a,f-h,p-g,R-S).normalize(),r[1].setComponents(l+a,f+h,p+g,R+S).normalize(),r[2].setComponents(l+o,f+d,p+M,R+T).normalize(),r[3].setComponents(l-o,f-d,p-M,R-T).normalize(),i)r[4].setComponents(c,u,m,y).normalize(),r[5].setComponents(l-c,f-u,p-m,R-y).normalize();else if(r[4].setComponents(l-c,f-u,p-m,R-y).normalize(),n===Mi)r[5].setComponents(l+c,f+u,p+m,R+y).normalize();else if(n===tc)r[5].setComponents(c,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),wr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),wr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(wr)}intersectsSprite(e){wr.center.set(0,0,0);const n=S1.distanceTo(e.center);return wr.radius=.7071067811865476+n,wr.applyMatrix4(e.matrixWorld),this.intersectsSphere(wr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(yo.x=r.normal.x>0?e.max.x:e.min.x,yo.y=r.normal.y>0?e.max.y:e.min.y,yo.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(yo)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class ys extends ji{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new qe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const rc=new I,sc=new I,ef=new bt,xa=new Mu,Eo=new Ha,vl=new I,tf=new I;class y1 extends fn{constructor(e=new Vt,n=new ys){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)rc.fromBufferAttribute(n,r-1),sc.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=rc.distanceTo(sc);e.setAttribute("lineDistance",new wt(i,1))}else Ne("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Eo.copy(i.boundingSphere),Eo.applyMatrix4(r),Eo.radius+=s,e.ray.intersectsSphere(Eo)===!1)return;ef.copy(r).invert(),xa.copy(e.ray).applyMatrix4(ef);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let M=f,m=g-1;M<m;M+=l){const p=h.getX(M),S=h.getX(M+1),T=bo(this,e,xa,c,p,S,M);T&&n.push(T)}if(this.isLineLoop){const M=h.getX(g-1),m=h.getX(f),p=bo(this,e,xa,c,M,m,g-1);p&&n.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let M=f,m=g-1;M<m;M+=l){const p=bo(this,e,xa,c,M,M+1,M);p&&n.push(p)}if(this.isLineLoop){const M=bo(this,e,xa,c,g-1,f,g-1);M&&n.push(M)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function bo(t,e,n,i,r,s,a){const o=t.geometry.attributes.position;if(rc.fromBufferAttribute(o,r),sc.fromBufferAttribute(o,s),n.distanceSqToSegment(rc,sc,vl,tf)>i)return;vl.applyMatrix4(t.matrixWorld);const l=e.ray.origin.distanceTo(vl);if(!(l<e.near||l>e.far))return{distance:l,point:tf.clone().applyMatrix4(t.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:t}}const nf=new I,rf=new I;class ac extends y1{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)nf.fromBufferAttribute(n,r),rf.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+nf.distanceTo(rf);e.setAttribute("lineDistance",new wt(i,1))}else Ne("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class fr extends ji{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new qe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const sf=new bt,Ih=new Mu,To=new Ha,Ao=new I;class Es extends fn{constructor(e=new Vt,n=new fr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),To.copy(i.boundingSphere),To.applyMatrix4(r),To.radius+=s,e.ray.intersectsSphere(To)===!1)return;sf.copy(r).invert(),Ih.copy(e.ray).applyMatrix4(sf);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,d=i.attributes.position;if(l!==null){const u=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let g=u,M=f;g<M;g++){const m=l.getX(g);Ao.fromBufferAttribute(d,m),af(Ao,m,c,r,e,n,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=u,M=f;g<M;g++)Ao.fromBufferAttribute(d,g),af(Ao,g,c,r,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function af(t,e,n,i,r,s,a){const o=Ih.distanceSqToPoint(t);if(o<n){const c=new I;Ih.closestPointToPoint(t,c),c.applyMatrix4(i);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Cm extends cn{constructor(e=[],n=qr,i,r,s,a,o,c,l,h){super(e,n,i,r,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class E1 extends cn{constructor(e,n,i,r,s,a,o,c,l){super(e,n,i,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Fa extends cn{constructor(e,n,i=Ai,r,s,a,o=Jt,c=Jt,l,h=$i,d=1){if(h!==$i&&h!==Fr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:n,depth:d};super(u,r,s,a,o,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new vu(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class b1 extends Fa{constructor(e,n=Ai,i=qr,r,s,a=Jt,o=Jt,c,l=$i){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,n,i,r,s,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Pm extends cn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Wa extends Vt{constructor(e=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,i,n,e,a,s,0),g("z","y","x",1,-1,i,n,-e,a,s,1),g("x","z","y",1,1,e,i,n,r,a,2),g("x","z","y",1,-1,e,i,-n,r,a,3),g("x","y","z",1,-1,e,n,i,r,s,4),g("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new wt(l,3)),this.setAttribute("normal",new wt(h,3)),this.setAttribute("uv",new wt(d,2));function g(M,m,p,S,T,y,R,A,C,v,b){const q=y/C,P=R/v,k=y/2,z=R/2,X=A/2,B=C+1,G=v+1;let N=0,Q=0;const K=new I;for(let le=0;le<G;le++){const ge=le*P-z;for(let de=0;de<B;de++){const Ve=de*q-k;K[M]=Ve*S,K[m]=ge*T,K[p]=X,l.push(K.x,K.y,K.z),K[M]=0,K[m]=0,K[p]=A>0?1:-1,h.push(K.x,K.y,K.z),d.push(de/C),d.push(1-le/v),N+=1}}for(let le=0;le<v;le++)for(let ge=0;ge<C;ge++){const de=u+ge+B*le,Ve=u+ge+B*(le+1),gt=u+(ge+1)+B*(le+1),mt=u+(ge+1)+B*le;c.push(de,Ve,mt),c.push(Ve,gt,mt),Q+=6}o.addGroup(f,Q,b),f+=Q,u+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wa(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class T1{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ne("Curve: .getPoint() not implemented.")}getPointAt(e,n){const i=this.getUtoTmapping(e);return this.getPoint(i,n)}getPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return n}getSpacedPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPointAt(i/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,r=this.getPoint(0),s=0;n.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),s+=i.distanceTo(r),n.push(s),r=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n=null){const i=this.getLengths();let r=0;const s=i.length;let a;n?a=n:a=e*i[s-1];let o=0,c=s-1,l;for(;o<=c;)if(r=Math.floor(o+(c-o)/2),l=i[r]-a,l<0)o=r+1;else if(l>0)c=r-1;else{c=r;break}if(r=c,i[r]===a)return r/(s-1);const h=i[r],u=i[r+1]-h,f=(a-h)/u;return(r+f)/(s-1)}getTangent(e,n){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);const a=this.getPoint(r),o=this.getPoint(s),c=n||(a.isVector2?new it:new I);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,n){const i=this.getUtoTmapping(e);return this.getTangent(i,n)}computeFrenetFrames(e,n=!1){const i=new I,r=[],s=[],a=[],o=new I,c=new bt;for(let f=0;f<=e;f++){const g=f/e;r[f]=this.getTangentAt(g,new I)}s[0]=new I,a[0]=new I;let l=Number.MAX_VALUE;const h=Math.abs(r[0].x),d=Math.abs(r[0].y),u=Math.abs(r[0].z);h<=l&&(l=h,i.set(1,0,0)),d<=l&&(l=d,i.set(0,1,0)),u<=l&&i.set(0,0,1),o.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],o),a[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(r[f-1],r[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ye(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(c.makeRotationAxis(o,g))}a[f].crossVectors(r[f],s[f])}if(n===!0){let f=Math.acos(Ye(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(o.crossVectors(s[0],s[e]))>0&&(f=-f);for(let g=1;g<=e;g++)s[g].applyMatrix4(c.makeRotationAxis(r[g],f*g)),a[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}function A1(t,e){const n=1-t;return n*n*e}function w1(t,e){return 2*(1-t)*t*e}function R1(t,e){return t*t*e}function xl(t,e,n,i){return A1(t,e)+w1(t,n)+R1(t,i)}class C1 extends T1{constructor(e=new I,n=new I,i=new I){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new I){const i=n,r=this.v0,s=this.v1,a=this.v2;return i.set(xl(e,r.x,s.x,a.x),xl(e,r.y,s.y,a.y),xl(e,r.z,s.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class Xa extends Vt{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,a=n/2,o=Math.floor(i),c=Math.floor(r),l=o+1,h=c+1,d=e/o,u=n/c,f=[],g=[],M=[],m=[];for(let p=0;p<h;p++){const S=p*u-a;for(let T=0;T<l;T++){const y=T*d-s;g.push(y,-S,0),M.push(0,0,1),m.push(T/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let S=0;S<o;S++){const T=S+l*p,y=S+l*(p+1),R=S+1+l*(p+1),A=S+1+l*p;f.push(T,y,A),f.push(y,R,A)}this.setIndex(f),this.setAttribute("position",new wt(g,3)),this.setAttribute("normal",new wt(M,3)),this.setAttribute("uv",new wt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Xa(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ya extends Vt{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const h=[],d=new I,u=new I,f=[],g=[],M=[],m=[];for(let p=0;p<=i;p++){const S=[],T=p/i;let y=0;p===0&&a===0?y=.5/n:p===i&&c===Math.PI&&(y=-.5/n);for(let R=0;R<=n;R++){const A=R/n;d.x=-e*Math.cos(r+A*s)*Math.sin(a+T*o),d.y=e*Math.cos(a+T*o),d.z=e*Math.sin(r+A*s)*Math.sin(a+T*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),M.push(u.x,u.y,u.z),m.push(A+y,1-T),S.push(l++)}h.push(S)}for(let p=0;p<i;p++)for(let S=0;S<n;S++){const T=h[p][S+1],y=h[p][S],R=h[p+1][S],A=h[p+1][S+1];(p!==0||a>0)&&f.push(T,y,A),(p!==i-1||c<Math.PI)&&f.push(y,R,A)}this.setIndex(f),this.setAttribute("position",new wt(g,3)),this.setAttribute("normal",new wt(M,3)),this.setAttribute("uv",new wt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ya(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Is(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(Ne("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function un(t){const e={};for(let n=0;n<t.length;n++){const i=Is(t[n]);for(const r in i)e[r]=i[r]}return e}function P1(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Lm(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const L1={clone:Is,merge:un};var D1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,I1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class oi extends ji{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=D1,this.fragmentShader=I1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Is(e.uniforms),this.uniformsGroups=P1(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class U1 extends oi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class N1 extends ji{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new qe(16777215),this.specular=new qe(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new qe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Sm,this.normalScale=new it(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.combine=lu,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class F1 extends ji{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=z_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class O1 extends ji{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const of={enabled:!1,files:{},add:function(t,e){this.enabled!==!1&&(cf(t)||(this.files[t]=e))},get:function(t){if(this.enabled!==!1&&!cf(t))return this.files[t]},remove:function(t){delete this.files[t]},clear:function(){this.files={}}};function cf(t){try{const e=t.slice(t.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class B1{constructor(e,n,i){const r=this;let s=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=n,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,s===!1&&r.onStart!==void 0&&r.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,r.onProgress!==void 0&&r.onProgress(h,a,o),a===o&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){const d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){const f=l[d],g=l[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const k1=new B1;class Su{constructor(e){this.manager=e!==void 0?e:k1,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,n){const i=this;return new Promise(function(r,s){i.load(e,r,n,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Su.DEFAULT_MATERIAL_NAME="__DEFAULT";const Vi={};class z1 extends Error{constructor(e,n){super(e),this.response=n}}class V1 extends Su{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,n,i,r){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=of.get(`file:${e}`);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{n&&n(s),this.manager.itemEnd(e)},0),s;if(Vi[e]!==void 0){Vi[e].push({onLoad:n,onProgress:i,onError:r});return}Vi[e]=[],Vi[e].push({onLoad:n,onProgress:i,onError:r});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Ne("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=Vi[e],d=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=u?parseInt(u):0,g=f!==0;let M=0;const m=new ReadableStream({start(p){S();function S(){d.read().then(({done:T,value:y})=>{if(T)p.close();else{M+=y.byteLength;const R=new ProgressEvent("progress",{lengthComputable:g,loaded:M,total:f});for(let A=0,C=h.length;A<C;A++){const v=h[A];v.onProgress&&v.onProgress(R)}p.enqueue(y),S()}},T=>{p.error(T)})}}});return new Response(m)}else throw new z1(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{const d=/charset="?([^;"\s]*)"?/i.exec(o),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{of.add(`file:${e}`,l);const h=Vi[e];delete Vi[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=Vi[e];if(h===void 0)throw this.manager.itemError(e),l;delete Vi[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const wo=new I,Ro=new Js,di=new I;class Dm extends fn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new bt,this.projectionMatrix=new bt,this.projectionMatrixInverse=new bt,this.coordinateSystem=Mi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(wo,Ro,di),di.x===1&&di.y===1&&di.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(wo,Ro,di.set(1,1,1)).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorld.decompose(wo,Ro,di),di.x===1&&di.y===1&&di.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(wo,Ro,di.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const or=new I,lf=new it,hf=new it;class Gn extends Dm{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Dh*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan($c*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Dh*2*Math.atan(Math.tan($c*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){or.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(or.x,or.y).multiplyScalar(-e/or.z),or.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(or.x,or.y).multiplyScalar(-e/or.z)}getViewSize(e,n){return this.getViewBounds(e,lf,hf),n.subVectors(hf,lf)}setViewOffset(e,n,i,r,s,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan($c*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,n-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class Im extends Dm{constructor(e=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+n,c=r-n;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const fs=-90,ps=1;class G1 extends fn{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Gn(fs,ps,e,n);r.layers=this.layers,this.add(r);const s=new Gn(fs,ps,e,n);s.layers=this.layers,this.add(s);const a=new Gn(fs,ps,e,n);a.layers=this.layers,this.add(a);const o=new Gn(fs,ps,e,n);o.layers=this.layers,this.add(o);const c=new Gn(fs,ps,e,n);c.layers=this.layers,this.add(c);const l=new Gn(fs,ps,e,n);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,c]=n;for(const l of n)this.remove(l);if(e===Mi)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===tc)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of n)this.add(l),l.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,a),e.setRenderTarget(i,2,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,3,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),e.setRenderTarget(i,4,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,r),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class H1 extends Gn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}function uf(t,e,n,i){const r=W1(i);switch(n){case vm:return t*e;case Mm:return t*e/r.components*r.byteLength;case fu:return t*e/r.components*r.byteLength;case Ls:return t*e*2/r.components*r.byteLength;case pu:return t*e*2/r.components*r.byteLength;case xm:return t*e*3/r.components*r.byteLength;case si:return t*e*4/r.components*r.byteLength;case mu:return t*e*4/r.components*r.byteLength;case Go:case Ho:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Wo:case Xo:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case th:case ih:return Math.max(t,16)*Math.max(e,8)/4;case eh:case nh:return Math.max(t,8)*Math.max(e,8)/2;case rh:case sh:case oh:case ch:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case ah:case lh:case hh:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case uh:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case dh:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case fh:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case ph:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case mh:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case gh:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case _h:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case vh:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case xh:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Mh:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Sh:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case yh:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Eh:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case bh:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case Th:case Ah:case wh:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Rh:case Ch:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Ph:case Lh:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function W1(t){switch(t){case Xn:case pm:return{byteLength:1,components:1};case Ua:case mm:case qi:return{byteLength:2,components:1};case uu:case du:return{byteLength:2,components:4};case Ai:case hu:case xi:return{byteLength:4,components:1};case gm:case _m:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:cu}}));typeof window<"u"&&(window.__THREE__?Ne("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=cu);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Um(){let t=null,e=!1,n=null,i=null;function r(s,a){n(s,a),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function X1(t){const e=new WeakMap;function n(o,c){const l=o.array,h=o.usage,d=l.byteLength,u=t.createBuffer();t.bindBuffer(c,u),t.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=t.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=t.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=t.HALF_FLOAT:f=t.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=t.SHORT;else if(l instanceof Uint32Array)f=t.UNSIGNED_INT;else if(l instanceof Int32Array)f=t.INT;else if(l instanceof Int8Array)f=t.BYTE;else if(l instanceof Uint8Array)f=t.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,c,l){const h=c.array,d=c.updateRanges;if(t.bindBuffer(l,o),d.length===0)t.bufferSubData(l,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],M=d[f];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++u,d[u]=M)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const M=d[f];t.bufferSubData(l,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(t.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,n(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var Y1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,q1=`#ifdef USE_ALPHAHASH
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
#endif`,$1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,j1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,K1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Z1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,J1=`#ifdef USE_AOMAP
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
#endif`,Q1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,ev=`#ifdef USE_BATCHING
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
#endif`,tv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,nv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,iv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,rv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,sv=`#ifdef USE_IRIDESCENCE
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
#endif`,av=`#ifdef USE_BUMPMAP
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
#endif`,ov=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,cv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,lv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,hv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,uv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,dv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,fv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,pv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,mv=`#define PI 3.141592653589793
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
} // validated`,gv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,_v=`vec3 transformedNormal = objectNormal;
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
#endif`,vv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,xv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Mv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Sv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,yv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ev=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,bv=`#ifdef USE_ENVMAP
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
#endif`,Tv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Av=`#ifdef USE_ENVMAP
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
#endif`,wv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Rv=`#ifdef USE_ENVMAP
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
#endif`,Cv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Pv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Lv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Dv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Iv=`#ifdef USE_GRADIENTMAP
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
}`,Uv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Nv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Fv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ov=`uniform bool receiveShadow;
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
#endif`,Bv=`#ifdef USE_ENVMAP
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
#endif`,kv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,zv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Vv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Gv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Hv=`PhysicalMaterial material;
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
#endif`,Wv=`uniform sampler2D dfgLUT;
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
}`,Xv=`
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
#endif`,Yv=`#if defined( RE_IndirectDiffuse )
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
#endif`,qv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$v=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,jv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Zv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Jv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Qv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,e2=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,t2=`#if defined( USE_POINTS_UV )
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
#endif`,n2=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,i2=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,r2=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,s2=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,a2=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,o2=`#ifdef USE_MORPHTARGETS
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
#endif`,c2=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,l2=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,h2=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,u2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,d2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,f2=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,p2=`#ifdef USE_NORMALMAP
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
#endif`,m2=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,g2=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,_2=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,v2=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,x2=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,M2=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,S2=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,y2=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,E2=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,b2=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,T2=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,A2=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,w2=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,R2=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,C2=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,P2=`float getShadowMask() {
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
}`,L2=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,D2=`#ifdef USE_SKINNING
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
#endif`,I2=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,U2=`#ifdef USE_SKINNING
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
#endif`,N2=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,F2=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,O2=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,B2=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,k2=`#ifdef USE_TRANSMISSION
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
#endif`,z2=`#ifdef USE_TRANSMISSION
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
#endif`,V2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,G2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,H2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,W2=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const X2=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Y2=`uniform sampler2D t2D;
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
}`,q2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$2=`#ifdef ENVMAP_TYPE_CUBE
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
}`,j2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,K2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Z2=`#include <common>
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
}`,J2=`#if DEPTH_PACKING == 3200
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
}`,Q2=`#define DISTANCE
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
}`,ex=`#define DISTANCE
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
}`,tx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,nx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ix=`uniform float scale;
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
}`,rx=`uniform vec3 diffuse;
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
}`,sx=`#include <common>
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
}`,ax=`uniform vec3 diffuse;
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
}`,ox=`#define LAMBERT
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
}`,cx=`#define LAMBERT
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
}`,lx=`#define MATCAP
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
}`,hx=`#define MATCAP
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
}`,ux=`#define NORMAL
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
}`,dx=`#define NORMAL
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
}`,fx=`#define PHONG
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
}`,px=`#define PHONG
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
}`,mx=`#define STANDARD
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
}`,gx=`#define STANDARD
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
}`,_x=`#define TOON
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
}`,vx=`#define TOON
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
}`,xx=`uniform float size;
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
}`,Mx=`uniform vec3 diffuse;
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
}`,Sx=`#include <common>
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
}`,yx=`uniform vec3 color;
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
}`,Ex=`uniform float rotation;
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
}`,bx=`uniform vec3 diffuse;
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
}`,Ge={alphahash_fragment:Y1,alphahash_pars_fragment:q1,alphamap_fragment:$1,alphamap_pars_fragment:j1,alphatest_fragment:K1,alphatest_pars_fragment:Z1,aomap_fragment:J1,aomap_pars_fragment:Q1,batching_pars_vertex:ev,batching_vertex:tv,begin_vertex:nv,beginnormal_vertex:iv,bsdfs:rv,iridescence_fragment:sv,bumpmap_pars_fragment:av,clipping_planes_fragment:ov,clipping_planes_pars_fragment:cv,clipping_planes_pars_vertex:lv,clipping_planes_vertex:hv,color_fragment:uv,color_pars_fragment:dv,color_pars_vertex:fv,color_vertex:pv,common:mv,cube_uv_reflection_fragment:gv,defaultnormal_vertex:_v,displacementmap_pars_vertex:vv,displacementmap_vertex:xv,emissivemap_fragment:Mv,emissivemap_pars_fragment:Sv,colorspace_fragment:yv,colorspace_pars_fragment:Ev,envmap_fragment:bv,envmap_common_pars_fragment:Tv,envmap_pars_fragment:Av,envmap_pars_vertex:wv,envmap_physical_pars_fragment:Bv,envmap_vertex:Rv,fog_vertex:Cv,fog_pars_vertex:Pv,fog_fragment:Lv,fog_pars_fragment:Dv,gradientmap_pars_fragment:Iv,lightmap_pars_fragment:Uv,lights_lambert_fragment:Nv,lights_lambert_pars_fragment:Fv,lights_pars_begin:Ov,lights_toon_fragment:kv,lights_toon_pars_fragment:zv,lights_phong_fragment:Vv,lights_phong_pars_fragment:Gv,lights_physical_fragment:Hv,lights_physical_pars_fragment:Wv,lights_fragment_begin:Xv,lights_fragment_maps:Yv,lights_fragment_end:qv,logdepthbuf_fragment:$v,logdepthbuf_pars_fragment:jv,logdepthbuf_pars_vertex:Kv,logdepthbuf_vertex:Zv,map_fragment:Jv,map_pars_fragment:Qv,map_particle_fragment:e2,map_particle_pars_fragment:t2,metalnessmap_fragment:n2,metalnessmap_pars_fragment:i2,morphinstance_vertex:r2,morphcolor_vertex:s2,morphnormal_vertex:a2,morphtarget_pars_vertex:o2,morphtarget_vertex:c2,normal_fragment_begin:l2,normal_fragment_maps:h2,normal_pars_fragment:u2,normal_pars_vertex:d2,normal_vertex:f2,normalmap_pars_fragment:p2,clearcoat_normal_fragment_begin:m2,clearcoat_normal_fragment_maps:g2,clearcoat_pars_fragment:_2,iridescence_pars_fragment:v2,opaque_fragment:x2,packing:M2,premultiplied_alpha_fragment:S2,project_vertex:y2,dithering_fragment:E2,dithering_pars_fragment:b2,roughnessmap_fragment:T2,roughnessmap_pars_fragment:A2,shadowmap_pars_fragment:w2,shadowmap_pars_vertex:R2,shadowmap_vertex:C2,shadowmask_pars_fragment:P2,skinbase_vertex:L2,skinning_pars_vertex:D2,skinning_vertex:I2,skinnormal_vertex:U2,specularmap_fragment:N2,specularmap_pars_fragment:F2,tonemapping_fragment:O2,tonemapping_pars_fragment:B2,transmission_fragment:k2,transmission_pars_fragment:z2,uv_pars_fragment:V2,uv_pars_vertex:G2,uv_vertex:H2,worldpos_vertex:W2,background_vert:X2,background_frag:Y2,backgroundCube_vert:q2,backgroundCube_frag:$2,cube_vert:j2,cube_frag:K2,depth_vert:Z2,depth_frag:J2,distance_vert:Q2,distance_frag:ex,equirect_vert:tx,equirect_frag:nx,linedashed_vert:ix,linedashed_frag:rx,meshbasic_vert:sx,meshbasic_frag:ax,meshlambert_vert:ox,meshlambert_frag:cx,meshmatcap_vert:lx,meshmatcap_frag:hx,meshnormal_vert:ux,meshnormal_frag:dx,meshphong_vert:fx,meshphong_frag:px,meshphysical_vert:mx,meshphysical_frag:gx,meshtoon_vert:_x,meshtoon_frag:vx,points_vert:xx,points_frag:Mx,shadow_vert:Sx,shadow_frag:yx,sprite_vert:Ex,sprite_frag:bx},ae={common:{diffuse:{value:new qe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new it(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new qe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new qe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new qe(16777215)},opacity:{value:1},center:{value:new it(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},_i={basic:{uniforms:un([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:un([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new qe(0)},envMapIntensity:{value:1}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:un([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new qe(0)},specular:{value:new qe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:un([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new qe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:un([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new qe(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:un([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:un([ae.points,ae.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:un([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:un([ae.common,ae.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:un([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:un([ae.sprite,ae.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:un([ae.common,ae.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:un([ae.lights,ae.fog,{color:{value:new qe(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};_i.physical={uniforms:un([_i.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new it(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new qe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new it},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new qe(0)},specularColor:{value:new qe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new it},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const Co={r:0,b:0,g:0},Rr=new wi,Tx=new bt;function Ax(t,e,n,i,r,s){const a=new qe(0);let o=r===!0?0:1,c,l,h=null,d=0,u=null;function f(S){let T=S.isScene===!0?S.background:null;if(T&&T.isTexture){const y=S.backgroundBlurriness>0;T=e.get(T,y)}return T}function g(S){let T=!1;const y=f(S);y===null?m(a,o):y&&y.isColor&&(m(y,1),T=!0);const R=t.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,s):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||T)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function M(S,T){const y=f(T);y&&(y.isCubeTexture||y.mapping===mc)?(l===void 0&&(l=new pn(new Wa(1,1,1),new oi({name:"BackgroundCubeMaterial",uniforms:Is(_i.backgroundCube.uniforms),vertexShader:_i.backgroundCube.vertexShader,fragmentShader:_i.backgroundCube.fragmentShader,side:dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(R,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),Rr.copy(T.backgroundRotation),Rr.x*=-1,Rr.y*=-1,Rr.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Rr.y*=-1,Rr.z*=-1),l.material.uniforms.envMap.value=y,l.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Tx.makeRotationFromEuler(Rr)),l.material.toneMapped=Ke.getTransfer(y.colorSpace)!==at,(h!==y||d!==y.version||u!==t.toneMapping)&&(l.material.needsUpdate=!0,h=y,d=y.version,u=t.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new pn(new Xa(2,2),new oi({name:"BackgroundMaterial",uniforms:Is(_i.background.uniforms),vertexShader:_i.background.vertexShader,fragmentShader:_i.background.fragmentShader,side:_r,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(y.colorSpace)!==at,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||u!==t.toneMapping)&&(c.material.needsUpdate=!0,h=y,d=y.version,u=t.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function m(S,T){S.getRGB(Co,Lm(t)),n.buffers.color.setClear(Co.r,Co.g,Co.b,T,s)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,T=1){a.set(S),o=T,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,m(a,o)},render:g,addToRenderList:M,dispose:p}}function wx(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=u(null);let s=r,a=!1;function o(P,k,z,X,B){let G=!1;const N=d(P,X,z,k);s!==N&&(s=N,l(s.object)),G=f(P,X,z,B),G&&g(P,X,z,B),B!==null&&e.update(B,t.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,y(P,k,z,X),B!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function c(){return t.createVertexArray()}function l(P){return t.bindVertexArray(P)}function h(P){return t.deleteVertexArray(P)}function d(P,k,z,X){const B=X.wireframe===!0;let G=i[k.id];G===void 0&&(G={},i[k.id]=G);const N=P.isInstancedMesh===!0?P.id:0;let Q=G[N];Q===void 0&&(Q={},G[N]=Q);let K=Q[z.id];K===void 0&&(K={},Q[z.id]=K);let le=K[B];return le===void 0&&(le=u(c()),K[B]=le),le}function u(P){const k=[],z=[],X=[];for(let B=0;B<n;B++)k[B]=0,z[B]=0,X[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:z,attributeDivisors:X,object:P,attributes:{},index:null}}function f(P,k,z,X){const B=s.attributes,G=k.attributes;let N=0;const Q=z.getAttributes();for(const K in Q)if(Q[K].location>=0){const ge=B[K];let de=G[K];if(de===void 0&&(K==="instanceMatrix"&&P.instanceMatrix&&(de=P.instanceMatrix),K==="instanceColor"&&P.instanceColor&&(de=P.instanceColor)),ge===void 0||ge.attribute!==de||de&&ge.data!==de.data)return!0;N++}return s.attributesNum!==N||s.index!==X}function g(P,k,z,X){const B={},G=k.attributes;let N=0;const Q=z.getAttributes();for(const K in Q)if(Q[K].location>=0){let ge=G[K];ge===void 0&&(K==="instanceMatrix"&&P.instanceMatrix&&(ge=P.instanceMatrix),K==="instanceColor"&&P.instanceColor&&(ge=P.instanceColor));const de={};de.attribute=ge,ge&&ge.data&&(de.data=ge.data),B[K]=de,N++}s.attributes=B,s.attributesNum=N,s.index=X}function M(){const P=s.newAttributes;for(let k=0,z=P.length;k<z;k++)P[k]=0}function m(P){p(P,0)}function p(P,k){const z=s.newAttributes,X=s.enabledAttributes,B=s.attributeDivisors;z[P]=1,X[P]===0&&(t.enableVertexAttribArray(P),X[P]=1),B[P]!==k&&(t.vertexAttribDivisor(P,k),B[P]=k)}function S(){const P=s.newAttributes,k=s.enabledAttributes;for(let z=0,X=k.length;z<X;z++)k[z]!==P[z]&&(t.disableVertexAttribArray(z),k[z]=0)}function T(P,k,z,X,B,G,N){N===!0?t.vertexAttribIPointer(P,k,z,B,G):t.vertexAttribPointer(P,k,z,X,B,G)}function y(P,k,z,X){M();const B=X.attributes,G=z.getAttributes(),N=k.defaultAttributeValues;for(const Q in G){const K=G[Q];if(K.location>=0){let le=B[Q];if(le===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(le=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(le=P.instanceColor)),le!==void 0){const ge=le.normalized,de=le.itemSize,Ve=e.get(le);if(Ve===void 0)continue;const gt=Ve.buffer,mt=Ve.type,$=Ve.bytesPerElement,ne=mt===t.INT||mt===t.UNSIGNED_INT||le.gpuType===hu;if(le.isInterleavedBufferAttribute){const se=le.data,ke=se.stride,Ie=le.offset;if(se.isInstancedInterleavedBuffer){for(let Fe=0;Fe<K.locationSize;Fe++)p(K.location+Fe,se.meshPerAttribute);P.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let Fe=0;Fe<K.locationSize;Fe++)m(K.location+Fe);t.bindBuffer(t.ARRAY_BUFFER,gt);for(let Fe=0;Fe<K.locationSize;Fe++)T(K.location+Fe,de/K.locationSize,mt,ge,ke*$,(Ie+de/K.locationSize*Fe)*$,ne)}else{if(le.isInstancedBufferAttribute){for(let se=0;se<K.locationSize;se++)p(K.location+se,le.meshPerAttribute);P.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let se=0;se<K.locationSize;se++)m(K.location+se);t.bindBuffer(t.ARRAY_BUFFER,gt);for(let se=0;se<K.locationSize;se++)T(K.location+se,de/K.locationSize,mt,ge,de*$,de/K.locationSize*se*$,ne)}}else if(N!==void 0){const ge=N[Q];if(ge!==void 0)switch(ge.length){case 2:t.vertexAttrib2fv(K.location,ge);break;case 3:t.vertexAttrib3fv(K.location,ge);break;case 4:t.vertexAttrib4fv(K.location,ge);break;default:t.vertexAttrib1fv(K.location,ge)}}}}S()}function R(){b();for(const P in i){const k=i[P];for(const z in k){const X=k[z];for(const B in X){const G=X[B];for(const N in G)h(G[N].object),delete G[N];delete X[B]}}delete i[P]}}function A(P){if(i[P.id]===void 0)return;const k=i[P.id];for(const z in k){const X=k[z];for(const B in X){const G=X[B];for(const N in G)h(G[N].object),delete G[N];delete X[B]}}delete i[P.id]}function C(P){for(const k in i){const z=i[k];for(const X in z){const B=z[X];if(B[P.id]===void 0)continue;const G=B[P.id];for(const N in G)h(G[N].object),delete G[N];delete B[P.id]}}}function v(P){for(const k in i){const z=i[k],X=P.isInstancedMesh===!0?P.id:0,B=z[X];if(B!==void 0){for(const G in B){const N=B[G];for(const Q in N)h(N[Q].object),delete N[Q];delete B[G]}delete z[X],Object.keys(z).length===0&&delete i[k]}}}function b(){q(),a=!0,s!==r&&(s=r,l(s.object))}function q(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:b,resetDefaultState:q,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfObject:v,releaseStatesOfProgram:C,initAttributes:M,enableAttribute:m,disableUnusedAttributes:S}}function Rx(t,e,n){let i;function r(l){i=l}function s(l,h){t.drawArrays(i,l,h),n.update(h,i,1)}function a(l,h,d){d!==0&&(t.drawArraysInstanced(i,l,h,d),n.update(h,i,d))}function o(l,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];n.update(f,i,1)}function c(l,h,d,u){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)a(l[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(i,l,0,h,0,u,0,d);let g=0;for(let M=0;M<d;M++)g+=h[M]*u[M];n.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function Cx(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(C){return!(C!==si&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const v=C===qi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Xn&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==xi&&!v)}function c(C){if(C==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=n.precision!==void 0?n.precision:"highp";const h=c(l);h!==l&&(Ne("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),p=t.getParameter(t.MAX_VERTEX_ATTRIBS),S=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),T=t.getParameter(t.MAX_VARYING_VECTORS),y=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),R=t.getParameter(t.MAX_SAMPLES),A=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:T,maxFragmentUniforms:y,maxSamples:R,samples:A}}function Px(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new Lr,o=new ze,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||i!==0||r;return r=u,i=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){n=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,M=d.clipIntersection,m=d.clipShadows,p=t.get(d);if(!r||g===null||g.length===0||s&&!m)s?h(null):l();else{const S=s?0:i,T=S*4;let y=p.clippingState||null;c.value=y,y=h(g,u,T,f);for(let R=0;R!==T;++R)y[R]=n[R];p.clippingState=y,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,f,g){const M=d!==null?d.length:0;let m=null;if(M!==0){if(m=c.value,g!==!0||m===null){const p=f+M*4,S=u.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let T=0,y=f;T!==M;++T,y+=4)a.copy(d[T]).applyMatrix4(S,o),a.normal.toArray(m,y),m[y+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,m}}const pr=4,df=[.125,.215,.35,.446,.526,.582],Ir=20,Lx=256,Ma=new Im,ff=new qe;let Ml=null,Sl=0,yl=0,El=!1;const Dx=new I;class pf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,r=100,s={}){const{size:a=256,position:o=Dx}=s;Ml=this._renderer.getRenderTarget(),Sl=this._renderer.getActiveCubeFace(),yl=this._renderer.getActiveMipmapLevel(),El=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,o),n>0&&this._blur(c,0,0,n),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=_f(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=gf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ml,Sl,yl),this._renderer.xr.enabled=El,e.scissorTest=!1,ms(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===qr||e.mapping===Ps?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ml=this._renderer.getRenderTarget(),Sl=this._renderer.getActiveCubeFace(),yl=this._renderer.getActiveMipmapLevel(),El=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Kt,minFilter:Kt,generateMipmaps:!1,type:qi,format:si,colorSpace:Ds,depthBuffer:!1},r=mf(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=mf(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Ix(s)),this._blurMaterial=Nx(s,e,n),this._ggxMaterial=Ux(s,e,n)}return r}_compileMaterial(e){const n=new pn(new Vt,e);this._renderer.compile(n,Ma)}_sceneToCubeUV(e,n,i,r,s){const c=new Gn(90,1,n,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(ff),d.toneMapping=yi,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(r),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new pn(new Wa,new Qs({name:"PMREM.Background",side:dn,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,m=M.material;let p=!1;const S=e.background;S?S.isColor&&(m.color.copy(S),e.background=null,p=!0):(m.color.copy(ff),p=!0);for(let T=0;T<6;T++){const y=T%3;y===0?(c.up.set(0,l[T],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[T],s.y,s.z)):y===1?(c.up.set(0,0,l[T]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[T],s.z)):(c.up.set(0,l[T],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[T]));const R=this._cubeSize;ms(r,y*R,T>2?R:0,R,R),d.setRenderTarget(r),p&&d.render(M,c),d.render(e,c)}d.toneMapping=f,d.autoClear=u,e.background=S}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===qr||e.mapping===Ps;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=_f()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=gf());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;ms(n,0,0,3*c,2*c),i.setRenderTarget(n),i.render(a,Ma)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),h=n/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=0+l*1.25,f=d*u,{_lodMax:g}=this,M=this._sizeLods[i],m=3*M*(i>g-pr?i-g+pr:0),p=4*(this._cubeSize-M);c.envMap.value=e.texture,c.roughness.value=f,c.mipInt.value=g-n,ms(s,m,p,3*M,2*M),r.setRenderTarget(s),r.render(o,Ma),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=g-i,ms(e,m,p,3*M,2*M),r.setRenderTarget(e),r.render(o,Ma)}_blur(e,n,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,n,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Qe("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[r];d.material=l;const u=l.uniforms,f=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Ir-1),M=s/g,m=isFinite(s)?1+Math.floor(h*M):Ir;m>Ir&&Ne(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ir}`);const p=[];let S=0;for(let C=0;C<Ir;++C){const v=C/M,b=Math.exp(-v*v/2);p.push(b),C===0?S+=b:C<m&&(S+=2*b)}for(let C=0;C<p.length;C++)p[C]=p[C]/S;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:T}=this;u.dTheta.value=g,u.mipInt.value=T-i;const y=this._sizeLods[r],R=3*y*(r>T-pr?r-T+pr:0),A=4*(this._cubeSize-y);ms(n,R,A,3*y,2*y),c.setRenderTarget(n),c.render(d,Ma)}}function Ix(t){const e=[],n=[],i=[];let r=t;const s=t-pr+1+df.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let c=1/o;a>t-pr?c=df[a-t+pr-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,M=3,m=2,p=1,S=new Float32Array(M*g*f),T=new Float32Array(m*g*f),y=new Float32Array(p*g*f);for(let A=0;A<f;A++){const C=A%3*2/3-1,v=A>2?0:-1,b=[C,v,0,C+2/3,v,0,C+2/3,v+1,0,C,v,0,C+2/3,v+1,0,C,v+1,0];S.set(b,M*g*A),T.set(u,m*g*A);const q=[A,A,A,A,A,A];y.set(q,p*g*A)}const R=new Vt;R.setAttribute("position",new an(S,M)),R.setAttribute("uv",new an(T,m)),R.setAttribute("faceIndex",new an(y,p)),i.push(new pn(R,null)),r>pr&&r--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function mf(t,e,n){const i=new Ei(t,e,n);return i.texture.mapping=mc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ms(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function Ux(t,e,n){return new oi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Lx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:gc(),fragmentShader:`

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
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function Nx(t,e,n){const i=new Float32Array(Ir),r=new I(0,1,0);return new oi({name:"SphericalGaussianBlur",defines:{n:Ir,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:gc(),fragmentShader:`

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
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function gf(){return new oi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:gc(),fragmentShader:`

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
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function _f(){return new oi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:gc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Wi,depthTest:!1,depthWrite:!1})}function gc(){return`

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
	`}class Nm extends Ei{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Cm(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Wa(5,5,5),s=new oi({name:"CubemapFromEquirect",uniforms:Is(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:dn,blending:Wi});s.uniforms.tEquirect.value=n;const a=new pn(r,s),o=n.minFilter;return n.minFilter===Nr&&(n.minFilter=Kt),new G1(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(s)}}function Fx(t){let e=new WeakMap,n=new WeakMap,i=null;function r(u,f=!1){return u==null?null:f?a(u):s(u)}function s(u){if(u&&u.isTexture){const f=u.mapping;if(f===Xc||f===Yc)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const M=new Nm(g.height);return M.fromEquirectangularTexture(t,u),e.set(u,M),u.addEventListener("dispose",l),o(M.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const f=u.mapping,g=f===Xc||f===Yc,M=f===qr||f===Ps;if(g||M){let m=n.get(u);const p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return i===null&&(i=new pf(t)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,n.set(u,m),m.texture;if(m!==void 0)return m.texture;{const S=u.image;return g&&S&&S.height>0||M&&S&&c(S)?(i===null&&(i=new pf(t)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,n.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===Xc?u.mapping=qr:f===Yc&&(u.mapping=Ps),u}function c(u){let f=0;const g=6;for(let M=0;M<g;M++)u[M]!==void 0&&f++;return f===g}function l(u){const f=u.target;f.removeEventListener("dispose",l);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function h(u){const f=u.target;f.removeEventListener("dispose",h);const g=n.get(f);g!==void 0&&(n.delete(f),g.dispose())}function d(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:d}}function Ox(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&ic("WebGLRenderer: "+i+" extension not supported."),r}}}function Bx(t,e,n,i){const r={},s=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete r[u.id];const f=s.get(u);f&&(e.remove(f),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(d,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,n.memory.geometries++),u}function c(d){const u=d.attributes;for(const f in u)e.update(u[f],t.ARRAY_BUFFER)}function l(d){const u=[],f=d.index,g=d.attributes.position;let M=0;if(g===void 0)return;if(f!==null){const S=f.array;M=f.version;for(let T=0,y=S.length;T<y;T+=3){const R=S[T+0],A=S[T+1],C=S[T+2];u.push(R,A,A,C,C,R)}}else{const S=g.array;M=g.version;for(let T=0,y=S.length/3-1;T<y;T+=3){const R=T+0,A=T+1,C=T+2;u.push(R,A,A,C,C,R)}}const m=new(g.count>=65535?wm:Am)(u,1);m.version=M;const p=s.get(d);p&&e.remove(p),s.set(d,m)}function h(d){const u=s.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return s.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function kx(t,e,n){let i;function r(u){i=u}let s,a;function o(u){s=u.type,a=u.bytesPerElement}function c(u,f){t.drawElements(i,f,s,u*a),n.update(f,i,1)}function l(u,f,g){g!==0&&(t.drawElementsInstanced(i,f,s,u*a,g),n.update(f,i,g))}function h(u,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];n.update(m,i,1)}function d(u,f,g,M){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)l(u[p]/a,f[p],M[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,s,u,0,M,0,g);let p=0;for(let S=0;S<g;S++)p+=f[S]*M[S];n.update(p,i,1)}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function zx(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:Qe("WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function Vx(t,e,n){const i=new WeakMap,r=new Dt;function s(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==d){let q=function(){v.dispose(),i.delete(o),o.removeEventListener("dispose",q)};var f=q;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,M=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let y=0;g===!0&&(y=1),M===!0&&(y=2),m===!0&&(y=3);let R=o.attributes.position.count*y,A=1;R>e.maxTextureSize&&(A=Math.ceil(R/e.maxTextureSize),R=e.maxTextureSize);const C=new Float32Array(R*A*4*d),v=new Em(C,R,A,d);v.type=xi,v.needsUpdate=!0;const b=y*4;for(let P=0;P<d;P++){const k=p[P],z=S[P],X=T[P],B=R*A*4*P;for(let G=0;G<k.count;G++){const N=G*b;g===!0&&(r.fromBufferAttribute(k,G),C[B+N+0]=r.x,C[B+N+1]=r.y,C[B+N+2]=r.z,C[B+N+3]=0),M===!0&&(r.fromBufferAttribute(z,G),C[B+N+4]=r.x,C[B+N+5]=r.y,C[B+N+6]=r.z,C[B+N+7]=0),m===!0&&(r.fromBufferAttribute(X,G),C[B+N+8]=r.x,C[B+N+9]=r.y,C[B+N+10]=r.z,C[B+N+11]=X.itemSize===4?r.w:1)}}u={count:d,texture:v,size:new it(R,A)},i.set(o,u),o.addEventListener("dispose",q)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const M=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(t,"morphTargetBaseInfluence",M),c.getUniforms().setValue(t,"morphTargetInfluences",l)}c.getUniforms().setValue(t,"morphTargetsTexture",u.texture,n),c.getUniforms().setValue(t,"morphTargetsTextureSize",u.size)}return{update:s}}function Gx(t,e,n,i,r){let s=new WeakMap;function a(l){const h=r.render.frame,d=l.geometry,u=e.get(l,d);if(s.get(u)!==h&&(e.update(u),s.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==h&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),s.set(l,h))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return u}function o(){s=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),n.remove(h.instanceMatrix),h.instanceColor!==null&&n.remove(h.instanceColor)}return{update:a,dispose:o}}const Hx={[am]:"LINEAR_TONE_MAPPING",[om]:"REINHARD_TONE_MAPPING",[cm]:"CINEON_TONE_MAPPING",[lm]:"ACES_FILMIC_TONE_MAPPING",[um]:"AGX_TONE_MAPPING",[dm]:"NEUTRAL_TONE_MAPPING",[hm]:"CUSTOM_TONE_MAPPING"};function Wx(t,e,n,i,r){const s=new Ei(e,n,{type:t,depthBuffer:i,stencilBuffer:r}),a=new Ei(e,n,{type:qi,depthBuffer:!1,stencilBuffer:!1}),o=new Vt;o.setAttribute("position",new wt([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new wt([0,2,0,0,2,0],2));const c=new U1({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new pn(o,c),h=new Im(-1,1,1,-1,0,1);let d=null,u=null,f=!1,g,M=null,m=[],p=!1;this.setSize=function(S,T){s.setSize(S,T),a.setSize(S,T);for(let y=0;y<m.length;y++){const R=m[y];R.setSize&&R.setSize(S,T)}},this.setEffects=function(S){m=S,p=m.length>0&&m[0].isRenderPass===!0;const T=s.width,y=s.height;for(let R=0;R<m.length;R++){const A=m[R];A.setSize&&A.setSize(T,y)}},this.begin=function(S,T){if(f||S.toneMapping===yi&&m.length===0)return!1;if(M=T,T!==null){const y=T.width,R=T.height;(s.width!==y||s.height!==R)&&this.setSize(y,R)}return p===!1&&S.setRenderTarget(s),g=S.toneMapping,S.toneMapping=yi,!0},this.hasRenderPass=function(){return p},this.end=function(S,T){S.toneMapping=g,f=!0;let y=s,R=a;for(let A=0;A<m.length;A++){const C=m[A];if(C.enabled!==!1&&(C.render(S,R,y,T),C.needsSwap!==!1)){const v=y;y=R,R=v}}if(d!==S.outputColorSpace||u!==S.toneMapping){d=S.outputColorSpace,u=S.toneMapping,c.defines={},Ke.getTransfer(d)===at&&(c.defines.SRGB_TRANSFER="");const A=Hx[u];A&&(c.defines[A]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=y.texture,S.setRenderTarget(M),S.render(l,h),M=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){s.dispose(),a.dispose(),o.dispose(),c.dispose()}}const Fm=new cn,Uh=new Fa(1,1),Om=new Em,Bm=new r1,km=new Cm,vf=[],xf=[],Mf=new Float32Array(16),Sf=new Float32Array(9),yf=new Float32Array(4);function ea(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=vf[r];if(s===void 0&&(s=new Float32Array(r),vf[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(s,o)}return s}function Gt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Ht(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function _c(t,e){let n=xf[e];n===void 0&&(n=new Int32Array(e),xf[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function Xx(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function Yx(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Gt(n,e))return;t.uniform2fv(this.addr,e),Ht(n,e)}}function qx(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Gt(n,e))return;t.uniform3fv(this.addr,e),Ht(n,e)}}function $x(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Gt(n,e))return;t.uniform4fv(this.addr,e),Ht(n,e)}}function jx(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Gt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Ht(n,e)}else{if(Gt(n,i))return;yf.set(i),t.uniformMatrix2fv(this.addr,!1,yf),Ht(n,i)}}function Kx(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Gt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Ht(n,e)}else{if(Gt(n,i))return;Sf.set(i),t.uniformMatrix3fv(this.addr,!1,Sf),Ht(n,i)}}function Zx(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Gt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Ht(n,e)}else{if(Gt(n,i))return;Mf.set(i),t.uniformMatrix4fv(this.addr,!1,Mf),Ht(n,i)}}function Jx(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function Qx(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Gt(n,e))return;t.uniform2iv(this.addr,e),Ht(n,e)}}function e3(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Gt(n,e))return;t.uniform3iv(this.addr,e),Ht(n,e)}}function t3(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Gt(n,e))return;t.uniform4iv(this.addr,e),Ht(n,e)}}function n3(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function i3(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Gt(n,e))return;t.uniform2uiv(this.addr,e),Ht(n,e)}}function r3(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Gt(n,e))return;t.uniform3uiv(this.addr,e),Ht(n,e)}}function s3(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Gt(n,e))return;t.uniform4uiv(this.addr,e),Ht(n,e)}}function a3(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(Uh.compareFunction=n.isReversedDepthBuffer()?_u:gu,s=Uh):s=Fm,n.setTexture2D(e||s,r)}function o3(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Bm,r)}function c3(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||km,r)}function l3(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||Om,r)}function h3(t){switch(t){case 5126:return Xx;case 35664:return Yx;case 35665:return qx;case 35666:return $x;case 35674:return jx;case 35675:return Kx;case 35676:return Zx;case 5124:case 35670:return Jx;case 35667:case 35671:return Qx;case 35668:case 35672:return e3;case 35669:case 35673:return t3;case 5125:return n3;case 36294:return i3;case 36295:return r3;case 36296:return s3;case 35678:case 36198:case 36298:case 36306:case 35682:return a3;case 35679:case 36299:case 36307:return o3;case 35680:case 36300:case 36308:case 36293:return c3;case 36289:case 36303:case 36311:case 36292:return l3}}function u3(t,e){t.uniform1fv(this.addr,e)}function d3(t,e){const n=ea(e,this.size,2);t.uniform2fv(this.addr,n)}function f3(t,e){const n=ea(e,this.size,3);t.uniform3fv(this.addr,n)}function p3(t,e){const n=ea(e,this.size,4);t.uniform4fv(this.addr,n)}function m3(t,e){const n=ea(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function g3(t,e){const n=ea(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function _3(t,e){const n=ea(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function v3(t,e){t.uniform1iv(this.addr,e)}function x3(t,e){t.uniform2iv(this.addr,e)}function M3(t,e){t.uniform3iv(this.addr,e)}function S3(t,e){t.uniform4iv(this.addr,e)}function y3(t,e){t.uniform1uiv(this.addr,e)}function E3(t,e){t.uniform2uiv(this.addr,e)}function b3(t,e){t.uniform3uiv(this.addr,e)}function T3(t,e){t.uniform4uiv(this.addr,e)}function A3(t,e,n){const i=this.cache,r=e.length,s=_c(n,r);Gt(i,s)||(t.uniform1iv(this.addr,s),Ht(i,s));let a;this.type===t.SAMPLER_2D_SHADOW?a=Uh:a=Fm;for(let o=0;o!==r;++o)n.setTexture2D(e[o]||a,s[o])}function w3(t,e,n){const i=this.cache,r=e.length,s=_c(n,r);Gt(i,s)||(t.uniform1iv(this.addr,s),Ht(i,s));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||Bm,s[a])}function R3(t,e,n){const i=this.cache,r=e.length,s=_c(n,r);Gt(i,s)||(t.uniform1iv(this.addr,s),Ht(i,s));for(let a=0;a!==r;++a)n.setTextureCube(e[a]||km,s[a])}function C3(t,e,n){const i=this.cache,r=e.length,s=_c(n,r);Gt(i,s)||(t.uniform1iv(this.addr,s),Ht(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||Om,s[a])}function P3(t){switch(t){case 5126:return u3;case 35664:return d3;case 35665:return f3;case 35666:return p3;case 35674:return m3;case 35675:return g3;case 35676:return _3;case 5124:case 35670:return v3;case 35667:case 35671:return x3;case 35668:case 35672:return M3;case 35669:case 35673:return S3;case 5125:return y3;case 36294:return E3;case 36295:return b3;case 36296:return T3;case 35678:case 36198:case 36298:case 36306:case 35682:return A3;case 35679:case 36299:case 36307:return w3;case 35680:case 36300:case 36308:case 36293:return R3;case 36289:case 36303:case 36311:case 36292:return C3}}class L3{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=h3(n.type)}}class D3{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=P3(n.type)}}class I3{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,n[o.id],i)}}}const bl=/(\w+)(\])?(\[|\.)?/g;function Ef(t,e){t.seq.push(e),t.map[e.id]=e}function U3(t,e,n){const i=t.name,r=i.length;for(bl.lastIndex=0;;){const s=bl.exec(i),a=bl.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){Ef(n,l===void 0?new L3(o,t,e):new D3(o,t,e));break}else{let d=n.map[o];d===void 0&&(d=new I3(o),Ef(n,d)),n=d}}}class Yo{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(n,a),c=e.getUniformLocation(n,o.name);U3(o,c,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in n&&i.push(a)}return i}}function bf(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const N3=37297;let F3=0;function O3(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}const Tf=new ze;function B3(t){Ke._getMatrix(Tf,Ke.workingColorSpace,t);const e=`mat3( ${Tf.elements.map(n=>n.toFixed(4))} )`;switch(Ke.getTransfer(t)){case ec:return[e,"LinearTransferOETF"];case at:return[e,"sRGBTransferOETF"];default:return Ne("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function Af(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return n.toUpperCase()+`

`+s+`

`+O3(t.getShaderSource(e),o)}else return s}function k3(t,e){const n=B3(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const z3={[am]:"Linear",[om]:"Reinhard",[cm]:"Cineon",[lm]:"ACESFilmic",[um]:"AgX",[dm]:"Neutral",[hm]:"Custom"};function V3(t,e){const n=z3[e];return n===void 0?(Ne("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Po=new I;function G3(){Ke.getLuminanceCoefficients(Po);const t=Po.x.toFixed(4),e=Po.y.toFixed(4),n=Po.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function H3(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(wa).join(`
`)}function W3(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function X3(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),a=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function wa(t){return t!==""}function wf(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Rf(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Y3=/^[ \t]*#include +<([\w\d./]+)>/gm;function Nh(t){return t.replace(Y3,$3)}const q3=new Map;function $3(t,e){let n=Ge[e];if(n===void 0){const i=q3.get(e);if(i!==void 0)n=Ge[i],Ne('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Nh(n)}const j3=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Cf(t){return t.replace(j3,K3)}function K3(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Pf(t){let e=`precision ${t.precision} float;
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
#define LOW_PRECISION`),e}const Z3={[Vo]:"SHADOWMAP_TYPE_PCF",[Aa]:"SHADOWMAP_TYPE_VSM"};function J3(t){return Z3[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Q3={[qr]:"ENVMAP_TYPE_CUBE",[Ps]:"ENVMAP_TYPE_CUBE",[mc]:"ENVMAP_TYPE_CUBE_UV"};function eM(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":Q3[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const tM={[Ps]:"ENVMAP_MODE_REFRACTION"};function nM(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":tM[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const iM={[lu]:"ENVMAP_BLENDING_MULTIPLY",[O_]:"ENVMAP_BLENDING_MIX",[B_]:"ENVMAP_BLENDING_ADD"};function rM(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":iM[t.combine]||"ENVMAP_BLENDING_NONE"}function sM(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function aM(t,e,n,i){const r=t.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const c=J3(n),l=eM(n),h=nM(n),d=rM(n),u=sM(n),f=H3(n),g=W3(s),M=r.createProgram();let m,p,S=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(wa).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(wa).join(`
`),p.length>0&&(p+=`
`)):(m=[Pf(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(wa).join(`
`),p=[Pf(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+l:"",n.envMap?"#define "+h:"",n.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==yi?"#define TONE_MAPPING":"",n.toneMapping!==yi?Ge.tonemapping_pars_fragment:"",n.toneMapping!==yi?V3("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,k3("linearToOutputTexel",n.outputColorSpace),G3(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(wa).join(`
`)),a=Nh(a),a=wf(a,n),a=Rf(a,n),o=Nh(o),o=wf(o,n),o=Rf(o,n),a=Cf(a),o=Cf(o),n.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",n.glslVersion===Od?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Od?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const T=S+m+a,y=S+p+o,R=bf(r,r.VERTEX_SHADER,T),A=bf(r,r.FRAGMENT_SHADER,y);r.attachShader(M,R),r.attachShader(M,A),n.index0AttributeName!==void 0?r.bindAttribLocation(M,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(M,0,"position"),r.linkProgram(M);function C(P){if(t.debug.checkShaderErrors){const k=r.getProgramInfoLog(M)||"",z=r.getShaderInfoLog(R)||"",X=r.getShaderInfoLog(A)||"",B=k.trim(),G=z.trim(),N=X.trim();let Q=!0,K=!0;if(r.getProgramParameter(M,r.LINK_STATUS)===!1)if(Q=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,M,R,A);else{const le=Af(r,R,"vertex"),ge=Af(r,A,"fragment");Qe("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(M,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+B+`
`+le+`
`+ge)}else B!==""?Ne("WebGLProgram: Program Info Log:",B):(G===""||N==="")&&(K=!1);K&&(P.diagnostics={runnable:Q,programLog:B,vertexShader:{log:G,prefix:m},fragmentShader:{log:N,prefix:p}})}r.deleteShader(R),r.deleteShader(A),v=new Yo(r,M),b=X3(r,M)}let v;this.getUniforms=function(){return v===void 0&&C(this),v};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let q=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return q===!1&&(q=r.getProgramParameter(M,N3)),q},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(M),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=F3++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=R,this.fragmentShader=A,this}let oM=0;class cM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new lM(e),n.set(e,i)),i}}class lM{constructor(e){this.id=oM++,this.code=e,this.usedTimes=0}}function hM(t,e,n,i,r,s){const a=new bm,o=new cM,c=new Set,l=[],h=new Map,d=i.logarithmicDepthBuffer;let u=i.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return c.add(v),v===0?"uv":`uv${v}`}function M(v,b,q,P,k){const z=P.fog,X=k.geometry,B=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?P.environment:null,G=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,N=e.get(v.envMap||B,G),Q=N&&N.mapping===mc?N.image.height:null,K=f[v.type];v.precision!==null&&(u=i.getMaxPrecision(v.precision),u!==v.precision&&Ne("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const le=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ge=le!==void 0?le.length:0;let de=0;X.morphAttributes.position!==void 0&&(de=1),X.morphAttributes.normal!==void 0&&(de=2),X.morphAttributes.color!==void 0&&(de=3);let Ve,gt,mt,$;if(K){const st=_i[K];Ve=st.vertexShader,gt=st.fragmentShader}else Ve=v.vertexShader,gt=v.fragmentShader,o.update(v),mt=o.getVertexShaderID(v),$=o.getFragmentShaderID(v);const ne=t.getRenderTarget(),se=t.state.buffers.depth.getReversed(),ke=k.isInstancedMesh===!0,Ie=k.isBatchedMesh===!0,Fe=!!v.map,Xt=!!v.matcap,je=!!N,rt=!!v.aoMap,ht=!!v.lightMap,He=!!v.bumpMap,Ct=!!v.normalMap,w=!!v.displacementMap,It=!!v.emissiveMap,nt=!!v.metalnessMap,ft=!!v.roughnessMap,ye=v.anisotropy>0,E=v.clearcoat>0,_=v.dispersion>0,D=v.iridescence>0,Y=v.sheen>0,j=v.transmission>0,W=ye&&!!v.anisotropyMap,_e=E&&!!v.clearcoatMap,ie=E&&!!v.clearcoatNormalMap,Pe=E&&!!v.clearcoatRoughnessMap,Ue=D&&!!v.iridescenceMap,Z=D&&!!v.iridescenceThicknessMap,ee=Y&&!!v.sheenColorMap,ve=Y&&!!v.sheenRoughnessMap,Me=!!v.specularMap,he=!!v.specularColorMap,We=!!v.specularIntensityMap,L=j&&!!v.transmissionMap,re=j&&!!v.thicknessMap,te=!!v.gradientMap,pe=!!v.alphaMap,J=v.alphaTest>0,H=!!v.alphaHash,xe=!!v.extensions;let Oe=yi;v.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Oe=t.toneMapping);const pt={shaderID:K,shaderType:v.type,shaderName:v.name,vertexShader:Ve,fragmentShader:gt,defines:v.defines,customVertexShaderID:mt,customFragmentShaderID:$,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:Ie,batchingColor:Ie&&k._colorsTexture!==null,instancing:ke,instancingColor:ke&&k.instanceColor!==null,instancingMorph:ke&&k.morphTexture!==null,outputColorSpace:ne===null?t.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Ds,alphaToCoverage:!!v.alphaToCoverage,map:Fe,matcap:Xt,envMap:je,envMapMode:je&&N.mapping,envMapCubeUVHeight:Q,aoMap:rt,lightMap:ht,bumpMap:He,normalMap:Ct,displacementMap:w,emissiveMap:It,normalMapObjectSpace:Ct&&v.normalMapType===V_,normalMapTangentSpace:Ct&&v.normalMapType===Sm,metalnessMap:nt,roughnessMap:ft,anisotropy:ye,anisotropyMap:W,clearcoat:E,clearcoatMap:_e,clearcoatNormalMap:ie,clearcoatRoughnessMap:Pe,dispersion:_,iridescence:D,iridescenceMap:Ue,iridescenceThicknessMap:Z,sheen:Y,sheenColorMap:ee,sheenRoughnessMap:ve,specularMap:Me,specularColorMap:he,specularIntensityMap:We,transmission:j,transmissionMap:L,thicknessMap:re,gradientMap:te,opaque:v.transparent===!1&&v.blending===Ms&&v.alphaToCoverage===!1,alphaMap:pe,alphaTest:J,alphaHash:H,combine:v.combine,mapUv:Fe&&g(v.map.channel),aoMapUv:rt&&g(v.aoMap.channel),lightMapUv:ht&&g(v.lightMap.channel),bumpMapUv:He&&g(v.bumpMap.channel),normalMapUv:Ct&&g(v.normalMap.channel),displacementMapUv:w&&g(v.displacementMap.channel),emissiveMapUv:It&&g(v.emissiveMap.channel),metalnessMapUv:nt&&g(v.metalnessMap.channel),roughnessMapUv:ft&&g(v.roughnessMap.channel),anisotropyMapUv:W&&g(v.anisotropyMap.channel),clearcoatMapUv:_e&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:ie&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pe&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Ue&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:ee&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:ve&&g(v.sheenRoughnessMap.channel),specularMapUv:Me&&g(v.specularMap.channel),specularColorMapUv:he&&g(v.specularColorMap.channel),specularIntensityMapUv:We&&g(v.specularIntensityMap.channel),transmissionMapUv:L&&g(v.transmissionMap.channel),thicknessMapUv:re&&g(v.thicknessMap.channel),alphaMapUv:pe&&g(v.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Ct||ye),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!X.attributes.uv&&(Fe||pe),fog:!!z,useFog:v.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||X.attributes.normal===void 0&&Ct===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:se,skinning:k.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:ge,morphTextureStride:de,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:t.shadowMap.enabled&&q.length>0,shadowMapType:t.shadowMap.type,toneMapping:Oe,decodeVideoTexture:Fe&&v.map.isVideoTexture===!0&&Ke.getTransfer(v.map.colorSpace)===at,decodeVideoTextureEmissive:It&&v.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(v.emissiveMap.colorSpace)===at,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===vi,flipSided:v.side===dn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:xe&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xe&&v.extensions.multiDraw===!0||Ie)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return pt.vertexUv1s=c.has(1),pt.vertexUv2s=c.has(2),pt.vertexUv3s=c.has(3),c.clear(),pt}function m(v){const b=[];if(v.shaderID?b.push(v.shaderID):(b.push(v.customVertexShaderID),b.push(v.customFragmentShaderID)),v.defines!==void 0)for(const q in v.defines)b.push(q),b.push(v.defines[q]);return v.isRawShaderMaterial===!1&&(p(b,v),S(b,v),b.push(t.outputColorSpace)),b.push(v.customProgramCacheKey),b.join()}function p(v,b){v.push(b.precision),v.push(b.outputColorSpace),v.push(b.envMapMode),v.push(b.envMapCubeUVHeight),v.push(b.mapUv),v.push(b.alphaMapUv),v.push(b.lightMapUv),v.push(b.aoMapUv),v.push(b.bumpMapUv),v.push(b.normalMapUv),v.push(b.displacementMapUv),v.push(b.emissiveMapUv),v.push(b.metalnessMapUv),v.push(b.roughnessMapUv),v.push(b.anisotropyMapUv),v.push(b.clearcoatMapUv),v.push(b.clearcoatNormalMapUv),v.push(b.clearcoatRoughnessMapUv),v.push(b.iridescenceMapUv),v.push(b.iridescenceThicknessMapUv),v.push(b.sheenColorMapUv),v.push(b.sheenRoughnessMapUv),v.push(b.specularMapUv),v.push(b.specularColorMapUv),v.push(b.specularIntensityMapUv),v.push(b.transmissionMapUv),v.push(b.thicknessMapUv),v.push(b.combine),v.push(b.fogExp2),v.push(b.sizeAttenuation),v.push(b.morphTargetsCount),v.push(b.morphAttributeCount),v.push(b.numDirLights),v.push(b.numPointLights),v.push(b.numSpotLights),v.push(b.numSpotLightMaps),v.push(b.numHemiLights),v.push(b.numRectAreaLights),v.push(b.numDirLightShadows),v.push(b.numPointLightShadows),v.push(b.numSpotLightShadows),v.push(b.numSpotLightShadowsWithMaps),v.push(b.numLightProbes),v.push(b.shadowMapType),v.push(b.toneMapping),v.push(b.numClippingPlanes),v.push(b.numClipIntersection),v.push(b.depthPacking)}function S(v,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),v.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),v.push(a.mask)}function T(v){const b=f[v.type];let q;if(b){const P=_i[b];q=L1.clone(P.uniforms)}else q=v.uniforms;return q}function y(v,b){let q=h.get(b);return q!==void 0?++q.usedTimes:(q=new aM(t,b,v,r),l.push(q),h.set(b,q)),q}function R(v){if(--v.usedTimes===0){const b=l.indexOf(v);l[b]=l[l.length-1],l.pop(),h.delete(v.cacheKey),v.destroy()}}function A(v){o.remove(v)}function C(){o.dispose()}return{getParameters:M,getProgramCacheKey:m,getUniforms:T,acquireProgram:y,releaseProgram:R,releaseShaderCache:A,programs:l,dispose:C}}function uM(){let t=new WeakMap;function e(a){return t.has(a)}function n(a){let o=t.get(a);return o===void 0&&(o={},t.set(a,o)),o}function i(a){t.delete(a)}function r(a,o,c){t.get(a)[o]=c}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function dM(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function Lf(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Df(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,M,m,p){let S=t[e];return S===void 0?(S={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:M,renderOrder:u.renderOrder,z:m,group:p},t[e]=S):(S.id=u.id,S.object=u,S.geometry=f,S.material=g,S.materialVariant=a(u),S.groupOrder=M,S.renderOrder=u.renderOrder,S.z=m,S.group=p),e++,S}function c(u,f,g,M,m,p){const S=o(u,f,g,M,m,p);g.transmission>0?i.push(S):g.transparent===!0?r.push(S):n.push(S)}function l(u,f,g,M,m,p){const S=o(u,f,g,M,m,p);g.transmission>0?i.unshift(S):g.transparent===!0?r.unshift(S):n.unshift(S)}function h(u,f){n.length>1&&n.sort(u||dM),i.length>1&&i.sort(f||Lf),r.length>1&&r.sort(f||Lf)}function d(){for(let u=e,f=t.length;u<f;u++){const g=t[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:d,sort:h}}function fM(){let t=new WeakMap;function e(i,r){const s=t.get(i);let a;return s===void 0?(a=new Df,t.set(i,[a])):r>=s.length?(a=new Df,s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function pM(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new I,color:new qe};break;case"SpotLight":n={position:new I,direction:new I,color:new qe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new I,color:new qe,distance:0,decay:0};break;case"HemisphereLight":n={direction:new I,skyColor:new qe,groundColor:new qe};break;case"RectAreaLight":n={color:new qe,position:new I,halfWidth:new I,halfHeight:new I};break}return t[e.id]=n,n}}}function mM(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new it,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let gM=0;function _M(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function vM(t){const e=new pM,n=mM(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new I);const r=new I,s=new bt,a=new bt;function o(l){let h=0,d=0,u=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let f=0,g=0,M=0,m=0,p=0,S=0,T=0,y=0,R=0,A=0,C=0;l.sort(_M);for(let b=0,q=l.length;b<q;b++){const P=l[b],k=P.color,z=P.intensity,X=P.distance;let B=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Ls?B=P.shadow.map.texture:B=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=k.r*z,d+=k.g*z,u+=k.b*z;else if(P.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(P.sh.coefficients[G],z);C++}else if(P.isDirectionalLight){const G=e.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const N=P.shadow,Q=n.get(P);Q.shadowIntensity=N.intensity,Q.shadowBias=N.bias,Q.shadowNormalBias=N.normalBias,Q.shadowRadius=N.radius,Q.shadowMapSize=N.mapSize,i.directionalShadow[f]=Q,i.directionalShadowMap[f]=B,i.directionalShadowMatrix[f]=P.shadow.matrix,S++}i.directional[f]=G,f++}else if(P.isSpotLight){const G=e.get(P);G.position.setFromMatrixPosition(P.matrixWorld),G.color.copy(k).multiplyScalar(z),G.distance=X,G.coneCos=Math.cos(P.angle),G.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),G.decay=P.decay,i.spot[M]=G;const N=P.shadow;if(P.map&&(i.spotLightMap[R]=P.map,R++,N.updateMatrices(P),P.castShadow&&A++),i.spotLightMatrix[M]=N.matrix,P.castShadow){const Q=n.get(P);Q.shadowIntensity=N.intensity,Q.shadowBias=N.bias,Q.shadowNormalBias=N.normalBias,Q.shadowRadius=N.radius,Q.shadowMapSize=N.mapSize,i.spotShadow[M]=Q,i.spotShadowMap[M]=B,y++}M++}else if(P.isRectAreaLight){const G=e.get(P);G.color.copy(k).multiplyScalar(z),G.halfWidth.set(P.width*.5,0,0),G.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=G,m++}else if(P.isPointLight){const G=e.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity),G.distance=P.distance,G.decay=P.decay,P.castShadow){const N=P.shadow,Q=n.get(P);Q.shadowIntensity=N.intensity,Q.shadowBias=N.bias,Q.shadowNormalBias=N.normalBias,Q.shadowRadius=N.radius,Q.shadowMapSize=N.mapSize,Q.shadowCameraNear=N.camera.near,Q.shadowCameraFar=N.camera.far,i.pointShadow[g]=Q,i.pointShadowMap[g]=B,i.pointShadowMatrix[g]=P.shadow.matrix,T++}i.point[g]=G,g++}else if(P.isHemisphereLight){const G=e.get(P);G.skyColor.copy(P.color).multiplyScalar(z),G.groundColor.copy(P.groundColor).multiplyScalar(z),i.hemi[p]=G,p++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ae.LTC_FLOAT_1,i.rectAreaLTC2=ae.LTC_FLOAT_2):(i.rectAreaLTC1=ae.LTC_HALF_1,i.rectAreaLTC2=ae.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;const v=i.hash;(v.directionalLength!==f||v.pointLength!==g||v.spotLength!==M||v.rectAreaLength!==m||v.hemiLength!==p||v.numDirectionalShadows!==S||v.numPointShadows!==T||v.numSpotShadows!==y||v.numSpotMaps!==R||v.numLightProbes!==C)&&(i.directional.length=f,i.spot.length=M,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=y+R-A,i.spotLightMap.length=R,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=C,v.directionalLength=f,v.pointLength=g,v.spotLength=M,v.rectAreaLength=m,v.hemiLength=p,v.numDirectionalShadows=S,v.numPointShadows=T,v.numSpotShadows=y,v.numSpotMaps=R,v.numLightProbes=C,i.version=gM++)}function c(l,h){let d=0,u=0,f=0,g=0,M=0;const m=h.matrixWorldInverse;for(let p=0,S=l.length;p<S;p++){const T=l[p];if(T.isDirectionalLight){const y=i.directional[d];y.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),d++}else if(T.isSpotLight){const y=i.spot[f];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(T.matrixWorld),r.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(m),f++}else if(T.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(m),a.identity(),s.copy(T.matrixWorld),s.premultiply(m),a.extractRotation(s),y.halfWidth.set(T.width*.5,0,0),y.halfHeight.set(0,T.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(T.isPointLight){const y=i.point[u];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(m),u++}else if(T.isHemisphereLight){const y=i.hemi[M];y.direction.setFromMatrixPosition(T.matrixWorld),y.direction.transformDirection(m),M++}}}return{setup:o,setupView:c,state:i}}function If(t){const e=new vM(t),n=[],i=[];function r(h){l.camera=h,n.length=0,i.length=0}function s(h){n.push(h)}function a(h){i.push(h)}function o(){e.setup(n)}function c(h){e.setupView(n,h)}const l={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function xM(t){let e=new WeakMap;function n(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new If(t),e.set(r,[o])):s>=a.length?(o=new If(t),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const MM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,SM=`uniform sampler2D shadow_pass;
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
}`,yM=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],EM=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],Uf=new bt,Sa=new I,Tl=new I;function bM(t,e,n){let i=new Rm;const r=new it,s=new it,a=new Dt,o=new F1,c=new O1,l={},h=n.maxTextureSize,d={[_r]:dn,[dn]:_r,[vi]:vi},u=new oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new it},radius:{value:4}},vertexShader:MM,fragmentShader:SM}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new Vt;g.setAttribute("position",new an(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new pn(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Vo;let p=this.type;this.render=function(A,C,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;this.type===v_&&(Ne("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Vo);const b=t.getRenderTarget(),q=t.getActiveCubeFace(),P=t.getActiveMipmapLevel(),k=t.state;k.setBlending(Wi),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const z=p!==this.type;z&&C.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(B=>B.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,B=A.length;X<B;X++){const G=A[X],N=G.shadow;if(N===void 0){Ne("WebGLShadowMap:",G,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;r.copy(N.mapSize);const Q=N.getFrameExtents();r.multiply(Q),s.copy(N.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/Q.x),r.x=s.x*Q.x,N.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/Q.y),r.y=s.y*Q.y,N.mapSize.y=s.y));const K=t.state.buffers.depth.getReversed();if(N.camera._reversedDepth=K,N.map===null||z===!0){if(N.map!==null&&(N.map.depthTexture!==null&&(N.map.depthTexture.dispose(),N.map.depthTexture=null),N.map.dispose()),this.type===Aa){if(G.isPointLight){Ne("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}N.map=new Ei(r.x,r.y,{format:Ls,type:qi,minFilter:Kt,magFilter:Kt,generateMipmaps:!1}),N.map.texture.name=G.name+".shadowMap",N.map.depthTexture=new Fa(r.x,r.y,xi),N.map.depthTexture.name=G.name+".shadowMapDepth",N.map.depthTexture.format=$i,N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Jt,N.map.depthTexture.magFilter=Jt}else G.isPointLight?(N.map=new Nm(r.x),N.map.depthTexture=new b1(r.x,Ai)):(N.map=new Ei(r.x,r.y),N.map.depthTexture=new Fa(r.x,r.y,Ai)),N.map.depthTexture.name=G.name+".shadowMap",N.map.depthTexture.format=$i,this.type===Vo?(N.map.depthTexture.compareFunction=K?_u:gu,N.map.depthTexture.minFilter=Kt,N.map.depthTexture.magFilter=Kt):(N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Jt,N.map.depthTexture.magFilter=Jt);N.camera.updateProjectionMatrix()}const le=N.map.isWebGLCubeRenderTarget?6:1;for(let ge=0;ge<le;ge++){if(N.map.isWebGLCubeRenderTarget)t.setRenderTarget(N.map,ge),t.clear();else{ge===0&&(t.setRenderTarget(N.map),t.clear());const de=N.getViewport(ge);a.set(s.x*de.x,s.y*de.y,s.x*de.z,s.y*de.w),k.viewport(a)}if(G.isPointLight){const de=N.camera,Ve=N.matrix,gt=G.distance||de.far;gt!==de.far&&(de.far=gt,de.updateProjectionMatrix()),Sa.setFromMatrixPosition(G.matrixWorld),de.position.copy(Sa),Tl.copy(de.position),Tl.add(yM[ge]),de.up.copy(EM[ge]),de.lookAt(Tl),de.updateMatrixWorld(),Ve.makeTranslation(-Sa.x,-Sa.y,-Sa.z),Uf.multiplyMatrices(de.projectionMatrix,de.matrixWorldInverse),N._frustum.setFromProjectionMatrix(Uf,de.coordinateSystem,de.reversedDepth)}else N.updateMatrices(G);i=N.getFrustum(),y(C,v,N.camera,G,this.type)}N.isPointLightShadow!==!0&&this.type===Aa&&S(N,v),N.needsUpdate=!1}p=this.type,m.needsUpdate=!1,t.setRenderTarget(b,q,P)};function S(A,C){const v=e.update(M);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new Ei(r.x,r.y,{format:Ls,type:qi})),u.uniforms.shadow_pass.value=A.map.depthTexture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,t.setRenderTarget(A.mapPass),t.clear(),t.renderBufferDirect(C,null,v,u,M,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,t.setRenderTarget(A.map),t.clear(),t.renderBufferDirect(C,null,v,f,M,null)}function T(A,C,v,b){let q=null;const P=v.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)q=P;else if(q=v.isPointLight===!0?c:o,t.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const k=q.uuid,z=C.uuid;let X=l[k];X===void 0&&(X={},l[k]=X);let B=X[z];B===void 0&&(B=q.clone(),X[z]=B,C.addEventListener("dispose",R)),q=B}if(q.visible=C.visible,q.wireframe=C.wireframe,b===Aa?q.side=C.shadowSide!==null?C.shadowSide:C.side:q.side=C.shadowSide!==null?C.shadowSide:d[C.side],q.alphaMap=C.alphaMap,q.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,q.map=C.map,q.clipShadows=C.clipShadows,q.clippingPlanes=C.clippingPlanes,q.clipIntersection=C.clipIntersection,q.displacementMap=C.displacementMap,q.displacementScale=C.displacementScale,q.displacementBias=C.displacementBias,q.wireframeLinewidth=C.wireframeLinewidth,q.linewidth=C.linewidth,v.isPointLight===!0&&q.isMeshDistanceMaterial===!0){const k=t.properties.get(q);k.light=v}return q}function y(A,C,v,b,q){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&q===Aa)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,A.matrixWorld);const z=e.update(A),X=A.material;if(Array.isArray(X)){const B=z.groups;for(let G=0,N=B.length;G<N;G++){const Q=B[G],K=X[Q.materialIndex];if(K&&K.visible){const le=T(A,K,b,q);A.onBeforeShadow(t,A,C,v,z,le,Q),t.renderBufferDirect(v,null,z,le,A,Q),A.onAfterShadow(t,A,C,v,z,le,Q)}}}else if(X.visible){const B=T(A,X,b,q);A.onBeforeShadow(t,A,C,v,z,B,null),t.renderBufferDirect(v,null,z,B,A,null),A.onAfterShadow(t,A,C,v,z,B,null)}}const k=A.children;for(let z=0,X=k.length;z<X;z++)y(k[z],C,v,b,q)}function R(A){A.target.removeEventListener("dispose",R);for(const v in l){const b=l[v],q=A.target.uuid;q in b&&(b[q].dispose(),delete b[q])}}}function TM(t,e){function n(){let L=!1;const re=new Dt;let te=null;const pe=new Dt(0,0,0,0);return{setMask:function(J){te!==J&&!L&&(t.colorMask(J,J,J,J),te=J)},setLocked:function(J){L=J},setClear:function(J,H,xe,Oe,pt){pt===!0&&(J*=Oe,H*=Oe,xe*=Oe),re.set(J,H,xe,Oe),pe.equals(re)===!1&&(t.clearColor(J,H,xe,Oe),pe.copy(re))},reset:function(){L=!1,te=null,pe.set(-1,0,0,0)}}}function i(){let L=!1,re=!1,te=null,pe=null,J=null;return{setReversed:function(H){if(re!==H){const xe=e.get("EXT_clip_control");H?xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.ZERO_TO_ONE_EXT):xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.NEGATIVE_ONE_TO_ONE_EXT),re=H;const Oe=J;J=null,this.setClear(Oe)}},getReversed:function(){return re},setTest:function(H){H?ne(t.DEPTH_TEST):se(t.DEPTH_TEST)},setMask:function(H){te!==H&&!L&&(t.depthMask(H),te=H)},setFunc:function(H){if(re&&(H=Z_[H]),pe!==H){switch(H){case Xl:t.depthFunc(t.NEVER);break;case Yl:t.depthFunc(t.ALWAYS);break;case ql:t.depthFunc(t.LESS);break;case Cs:t.depthFunc(t.LEQUAL);break;case $l:t.depthFunc(t.EQUAL);break;case jl:t.depthFunc(t.GEQUAL);break;case Kl:t.depthFunc(t.GREATER);break;case Zl:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}pe=H}},setLocked:function(H){L=H},setClear:function(H){J!==H&&(J=H,re&&(H=1-H),t.clearDepth(H))},reset:function(){L=!1,te=null,pe=null,J=null,re=!1}}}function r(){let L=!1,re=null,te=null,pe=null,J=null,H=null,xe=null,Oe=null,pt=null;return{setTest:function(st){L||(st?ne(t.STENCIL_TEST):se(t.STENCIL_TEST))},setMask:function(st){re!==st&&!L&&(t.stencilMask(st),re=st)},setFunc:function(st,Ui,Ni){(te!==st||pe!==Ui||J!==Ni)&&(t.stencilFunc(st,Ui,Ni),te=st,pe=Ui,J=Ni)},setOp:function(st,Ui,Ni){(H!==st||xe!==Ui||Oe!==Ni)&&(t.stencilOp(st,Ui,Ni),H=st,xe=Ui,Oe=Ni)},setLocked:function(st){L=st},setClear:function(st){pt!==st&&(t.clearStencil(st),pt=st)},reset:function(){L=!1,re=null,te=null,pe=null,J=null,H=null,xe=null,Oe=null,pt=null}}}const s=new n,a=new i,o=new r,c=new WeakMap,l=new WeakMap;let h={},d={},u=new WeakMap,f=[],g=null,M=!1,m=null,p=null,S=null,T=null,y=null,R=null,A=null,C=new qe(0,0,0),v=0,b=!1,q=null,P=null,k=null,z=null,X=null;const B=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,N=0;const Q=t.getParameter(t.VERSION);Q.indexOf("WebGL")!==-1?(N=parseFloat(/^WebGL (\d)/.exec(Q)[1]),G=N>=1):Q.indexOf("OpenGL ES")!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),G=N>=2);let K=null,le={};const ge=t.getParameter(t.SCISSOR_BOX),de=t.getParameter(t.VIEWPORT),Ve=new Dt().fromArray(ge),gt=new Dt().fromArray(de);function mt(L,re,te,pe){const J=new Uint8Array(4),H=t.createTexture();t.bindTexture(L,H),t.texParameteri(L,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(L,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let xe=0;xe<te;xe++)L===t.TEXTURE_3D||L===t.TEXTURE_2D_ARRAY?t.texImage3D(re,0,t.RGBA,1,1,pe,0,t.RGBA,t.UNSIGNED_BYTE,J):t.texImage2D(re+xe,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,J);return H}const $={};$[t.TEXTURE_2D]=mt(t.TEXTURE_2D,t.TEXTURE_2D,1),$[t.TEXTURE_CUBE_MAP]=mt(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[t.TEXTURE_2D_ARRAY]=mt(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),$[t.TEXTURE_3D]=mt(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(t.DEPTH_TEST),a.setFunc(Cs),He(!1),Ct(Dd),ne(t.CULL_FACE),rt(Wi);function ne(L){h[L]!==!0&&(t.enable(L),h[L]=!0)}function se(L){h[L]!==!1&&(t.disable(L),h[L]=!1)}function ke(L,re){return d[L]!==re?(t.bindFramebuffer(L,re),d[L]=re,L===t.DRAW_FRAMEBUFFER&&(d[t.FRAMEBUFFER]=re),L===t.FRAMEBUFFER&&(d[t.DRAW_FRAMEBUFFER]=re),!0):!1}function Ie(L,re){let te=f,pe=!1;if(L){te=u.get(re),te===void 0&&(te=[],u.set(re,te));const J=L.textures;if(te.length!==J.length||te[0]!==t.COLOR_ATTACHMENT0){for(let H=0,xe=J.length;H<xe;H++)te[H]=t.COLOR_ATTACHMENT0+H;te.length=J.length,pe=!0}}else te[0]!==t.BACK&&(te[0]=t.BACK,pe=!0);pe&&t.drawBuffers(te)}function Fe(L){return g!==L?(t.useProgram(L),g=L,!0):!1}const Xt={[Dr]:t.FUNC_ADD,[M_]:t.FUNC_SUBTRACT,[S_]:t.FUNC_REVERSE_SUBTRACT};Xt[y_]=t.MIN,Xt[E_]=t.MAX;const je={[b_]:t.ZERO,[T_]:t.ONE,[A_]:t.SRC_COLOR,[Hl]:t.SRC_ALPHA,[D_]:t.SRC_ALPHA_SATURATE,[P_]:t.DST_COLOR,[R_]:t.DST_ALPHA,[w_]:t.ONE_MINUS_SRC_COLOR,[Wl]:t.ONE_MINUS_SRC_ALPHA,[L_]:t.ONE_MINUS_DST_COLOR,[C_]:t.ONE_MINUS_DST_ALPHA,[I_]:t.CONSTANT_COLOR,[U_]:t.ONE_MINUS_CONSTANT_COLOR,[N_]:t.CONSTANT_ALPHA,[F_]:t.ONE_MINUS_CONSTANT_ALPHA};function rt(L,re,te,pe,J,H,xe,Oe,pt,st){if(L===Wi){M===!0&&(se(t.BLEND),M=!1);return}if(M===!1&&(ne(t.BLEND),M=!0),L!==x_){if(L!==m||st!==b){if((p!==Dr||y!==Dr)&&(t.blendEquation(t.FUNC_ADD),p=Dr,y=Dr),st)switch(L){case Ms:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Ti:t.blendFunc(t.ONE,t.ONE);break;case Id:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Ud:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:Qe("WebGLState: Invalid blending: ",L);break}else switch(L){case Ms:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Ti:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case Id:Qe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ud:Qe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qe("WebGLState: Invalid blending: ",L);break}S=null,T=null,R=null,A=null,C.set(0,0,0),v=0,m=L,b=st}return}J=J||re,H=H||te,xe=xe||pe,(re!==p||J!==y)&&(t.blendEquationSeparate(Xt[re],Xt[J]),p=re,y=J),(te!==S||pe!==T||H!==R||xe!==A)&&(t.blendFuncSeparate(je[te],je[pe],je[H],je[xe]),S=te,T=pe,R=H,A=xe),(Oe.equals(C)===!1||pt!==v)&&(t.blendColor(Oe.r,Oe.g,Oe.b,pt),C.copy(Oe),v=pt),m=L,b=!1}function ht(L,re){L.side===vi?se(t.CULL_FACE):ne(t.CULL_FACE);let te=L.side===dn;re&&(te=!te),He(te),L.blending===Ms&&L.transparent===!1?rt(Wi):rt(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),s.setMask(L.colorWrite);const pe=L.stencilWrite;o.setTest(pe),pe&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),It(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ne(t.SAMPLE_ALPHA_TO_COVERAGE):se(t.SAMPLE_ALPHA_TO_COVERAGE)}function He(L){q!==L&&(L?t.frontFace(t.CW):t.frontFace(t.CCW),q=L)}function Ct(L){L!==g_?(ne(t.CULL_FACE),L!==P&&(L===Dd?t.cullFace(t.BACK):L===__?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):se(t.CULL_FACE),P=L}function w(L){L!==k&&(G&&t.lineWidth(L),k=L)}function It(L,re,te){L?(ne(t.POLYGON_OFFSET_FILL),(z!==re||X!==te)&&(z=re,X=te,a.getReversed()&&(re=-re),t.polygonOffset(re,te))):se(t.POLYGON_OFFSET_FILL)}function nt(L){L?ne(t.SCISSOR_TEST):se(t.SCISSOR_TEST)}function ft(L){L===void 0&&(L=t.TEXTURE0+B-1),K!==L&&(t.activeTexture(L),K=L)}function ye(L,re,te){te===void 0&&(K===null?te=t.TEXTURE0+B-1:te=K);let pe=le[te];pe===void 0&&(pe={type:void 0,texture:void 0},le[te]=pe),(pe.type!==L||pe.texture!==re)&&(K!==te&&(t.activeTexture(te),K=te),t.bindTexture(L,re||$[L]),pe.type=L,pe.texture=re)}function E(){const L=le[K];L!==void 0&&L.type!==void 0&&(t.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function _(){try{t.compressedTexImage2D(...arguments)}catch(L){Qe("WebGLState:",L)}}function D(){try{t.compressedTexImage3D(...arguments)}catch(L){Qe("WebGLState:",L)}}function Y(){try{t.texSubImage2D(...arguments)}catch(L){Qe("WebGLState:",L)}}function j(){try{t.texSubImage3D(...arguments)}catch(L){Qe("WebGLState:",L)}}function W(){try{t.compressedTexSubImage2D(...arguments)}catch(L){Qe("WebGLState:",L)}}function _e(){try{t.compressedTexSubImage3D(...arguments)}catch(L){Qe("WebGLState:",L)}}function ie(){try{t.texStorage2D(...arguments)}catch(L){Qe("WebGLState:",L)}}function Pe(){try{t.texStorage3D(...arguments)}catch(L){Qe("WebGLState:",L)}}function Ue(){try{t.texImage2D(...arguments)}catch(L){Qe("WebGLState:",L)}}function Z(){try{t.texImage3D(...arguments)}catch(L){Qe("WebGLState:",L)}}function ee(L){Ve.equals(L)===!1&&(t.scissor(L.x,L.y,L.z,L.w),Ve.copy(L))}function ve(L){gt.equals(L)===!1&&(t.viewport(L.x,L.y,L.z,L.w),gt.copy(L))}function Me(L,re){let te=l.get(re);te===void 0&&(te=new WeakMap,l.set(re,te));let pe=te.get(L);pe===void 0&&(pe=t.getUniformBlockIndex(re,L.name),te.set(L,pe))}function he(L,re){const pe=l.get(re).get(L);c.get(re)!==pe&&(t.uniformBlockBinding(re,pe,L.__bindingPointIndex),c.set(re,pe))}function We(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),a.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),h={},K=null,le={},d={},u=new WeakMap,f=[],g=null,M=!1,m=null,p=null,S=null,T=null,y=null,R=null,A=null,C=new qe(0,0,0),v=0,b=!1,q=null,P=null,k=null,z=null,X=null,Ve.set(0,0,t.canvas.width,t.canvas.height),gt.set(0,0,t.canvas.width,t.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ne,disable:se,bindFramebuffer:ke,drawBuffers:Ie,useProgram:Fe,setBlending:rt,setMaterial:ht,setFlipSided:He,setCullFace:Ct,setLineWidth:w,setPolygonOffset:It,setScissorTest:nt,activeTexture:ft,bindTexture:ye,unbindTexture:E,compressedTexImage2D:_,compressedTexImage3D:D,texImage2D:Ue,texImage3D:Z,updateUBOMapping:Me,uniformBlockBinding:he,texStorage2D:ie,texStorage3D:Pe,texSubImage2D:Y,texSubImage3D:j,compressedTexSubImage2D:W,compressedTexSubImage3D:_e,scissor:ee,viewport:ve,reset:We}}function AM(t,e,n,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new it,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,_){return f?new OffscreenCanvas(E,_):nc("canvas")}function M(E,_,D){let Y=1;const j=ye(E);if((j.width>D||j.height>D)&&(Y=D/Math.max(j.width,j.height)),Y<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const W=Math.floor(Y*j.width),_e=Math.floor(Y*j.height);d===void 0&&(d=g(W,_e));const ie=_?g(W,_e):d;return ie.width=W,ie.height=_e,ie.getContext("2d").drawImage(E,0,0,W,_e),Ne("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+W+"x"+_e+")."),ie}else return"data"in E&&Ne("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),E;return E}function m(E){return E.generateMipmaps}function p(E){t.generateMipmap(E)}function S(E){return E.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?t.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function T(E,_,D,Y,j=!1){if(E!==null){if(t[E]!==void 0)return t[E];Ne("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let W=_;if(_===t.RED&&(D===t.FLOAT&&(W=t.R32F),D===t.HALF_FLOAT&&(W=t.R16F),D===t.UNSIGNED_BYTE&&(W=t.R8)),_===t.RED_INTEGER&&(D===t.UNSIGNED_BYTE&&(W=t.R8UI),D===t.UNSIGNED_SHORT&&(W=t.R16UI),D===t.UNSIGNED_INT&&(W=t.R32UI),D===t.BYTE&&(W=t.R8I),D===t.SHORT&&(W=t.R16I),D===t.INT&&(W=t.R32I)),_===t.RG&&(D===t.FLOAT&&(W=t.RG32F),D===t.HALF_FLOAT&&(W=t.RG16F),D===t.UNSIGNED_BYTE&&(W=t.RG8)),_===t.RG_INTEGER&&(D===t.UNSIGNED_BYTE&&(W=t.RG8UI),D===t.UNSIGNED_SHORT&&(W=t.RG16UI),D===t.UNSIGNED_INT&&(W=t.RG32UI),D===t.BYTE&&(W=t.RG8I),D===t.SHORT&&(W=t.RG16I),D===t.INT&&(W=t.RG32I)),_===t.RGB_INTEGER&&(D===t.UNSIGNED_BYTE&&(W=t.RGB8UI),D===t.UNSIGNED_SHORT&&(W=t.RGB16UI),D===t.UNSIGNED_INT&&(W=t.RGB32UI),D===t.BYTE&&(W=t.RGB8I),D===t.SHORT&&(W=t.RGB16I),D===t.INT&&(W=t.RGB32I)),_===t.RGBA_INTEGER&&(D===t.UNSIGNED_BYTE&&(W=t.RGBA8UI),D===t.UNSIGNED_SHORT&&(W=t.RGBA16UI),D===t.UNSIGNED_INT&&(W=t.RGBA32UI),D===t.BYTE&&(W=t.RGBA8I),D===t.SHORT&&(W=t.RGBA16I),D===t.INT&&(W=t.RGBA32I)),_===t.RGB&&(D===t.UNSIGNED_INT_5_9_9_9_REV&&(W=t.RGB9_E5),D===t.UNSIGNED_INT_10F_11F_11F_REV&&(W=t.R11F_G11F_B10F)),_===t.RGBA){const _e=j?ec:Ke.getTransfer(Y);D===t.FLOAT&&(W=t.RGBA32F),D===t.HALF_FLOAT&&(W=t.RGBA16F),D===t.UNSIGNED_BYTE&&(W=_e===at?t.SRGB8_ALPHA8:t.RGBA8),D===t.UNSIGNED_SHORT_4_4_4_4&&(W=t.RGBA4),D===t.UNSIGNED_SHORT_5_5_5_1&&(W=t.RGB5_A1)}return(W===t.R16F||W===t.R32F||W===t.RG16F||W===t.RG32F||W===t.RGBA16F||W===t.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function y(E,_){let D;return E?_===null||_===Ai||_===Na?D=t.DEPTH24_STENCIL8:_===xi?D=t.DEPTH32F_STENCIL8:_===Ua&&(D=t.DEPTH24_STENCIL8,Ne("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Ai||_===Na?D=t.DEPTH_COMPONENT24:_===xi?D=t.DEPTH_COMPONENT32F:_===Ua&&(D=t.DEPTH_COMPONENT16),D}function R(E,_){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==Jt&&E.minFilter!==Kt?Math.log2(Math.max(_.width,_.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?_.mipmaps.length:1}function A(E){const _=E.target;_.removeEventListener("dispose",A),v(_),_.isVideoTexture&&h.delete(_)}function C(E){const _=E.target;_.removeEventListener("dispose",C),q(_)}function v(E){const _=i.get(E);if(_.__webglInit===void 0)return;const D=E.source,Y=u.get(D);if(Y){const j=Y[_.__cacheKey];j.usedTimes--,j.usedTimes===0&&b(E),Object.keys(Y).length===0&&u.delete(D)}i.remove(E)}function b(E){const _=i.get(E);t.deleteTexture(_.__webglTexture);const D=E.source,Y=u.get(D);delete Y[_.__cacheKey],a.memory.textures--}function q(E){const _=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(_.__webglFramebuffer[Y]))for(let j=0;j<_.__webglFramebuffer[Y].length;j++)t.deleteFramebuffer(_.__webglFramebuffer[Y][j]);else t.deleteFramebuffer(_.__webglFramebuffer[Y]);_.__webglDepthbuffer&&t.deleteRenderbuffer(_.__webglDepthbuffer[Y])}else{if(Array.isArray(_.__webglFramebuffer))for(let Y=0;Y<_.__webglFramebuffer.length;Y++)t.deleteFramebuffer(_.__webglFramebuffer[Y]);else t.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&t.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&t.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Y=0;Y<_.__webglColorRenderbuffer.length;Y++)_.__webglColorRenderbuffer[Y]&&t.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);_.__webglDepthRenderbuffer&&t.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const D=E.textures;for(let Y=0,j=D.length;Y<j;Y++){const W=i.get(D[Y]);W.__webglTexture&&(t.deleteTexture(W.__webglTexture),a.memory.textures--),i.remove(D[Y])}i.remove(E)}let P=0;function k(){P=0}function z(){const E=P;return E>=r.maxTextures&&Ne("WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),P+=1,E}function X(E){const _=[];return _.push(E.wrapS),_.push(E.wrapT),_.push(E.wrapR||0),_.push(E.magFilter),_.push(E.minFilter),_.push(E.anisotropy),_.push(E.internalFormat),_.push(E.format),_.push(E.type),_.push(E.generateMipmaps),_.push(E.premultiplyAlpha),_.push(E.flipY),_.push(E.unpackAlignment),_.push(E.colorSpace),_.join()}function B(E,_){const D=i.get(E);if(E.isVideoTexture&&nt(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&D.__version!==E.version){const Y=E.image;if(Y===null)Ne("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Ne("WebGLRenderer: Texture marked for update but image is incomplete");else{$(D,E,_);return}}else E.isExternalTexture&&(D.__webglTexture=E.sourceTexture?E.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,D.__webglTexture,t.TEXTURE0+_)}function G(E,_){const D=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&D.__version!==E.version){$(D,E,_);return}else E.isExternalTexture&&(D.__webglTexture=E.sourceTexture?E.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,D.__webglTexture,t.TEXTURE0+_)}function N(E,_){const D=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&D.__version!==E.version){$(D,E,_);return}n.bindTexture(t.TEXTURE_3D,D.__webglTexture,t.TEXTURE0+_)}function Q(E,_){const D=i.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&D.__version!==E.version){ne(D,E,_);return}n.bindTexture(t.TEXTURE_CUBE_MAP,D.__webglTexture,t.TEXTURE0+_)}const K={[Jl]:t.REPEAT,[Hi]:t.CLAMP_TO_EDGE,[Ql]:t.MIRRORED_REPEAT},le={[Jt]:t.NEAREST,[k_]:t.NEAREST_MIPMAP_NEAREST,[ro]:t.NEAREST_MIPMAP_LINEAR,[Kt]:t.LINEAR,[qc]:t.LINEAR_MIPMAP_NEAREST,[Nr]:t.LINEAR_MIPMAP_LINEAR},ge={[G_]:t.NEVER,[q_]:t.ALWAYS,[H_]:t.LESS,[gu]:t.LEQUAL,[W_]:t.EQUAL,[_u]:t.GEQUAL,[X_]:t.GREATER,[Y_]:t.NOTEQUAL};function de(E,_){if(_.type===xi&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Kt||_.magFilter===qc||_.magFilter===ro||_.magFilter===Nr||_.minFilter===Kt||_.minFilter===qc||_.minFilter===ro||_.minFilter===Nr)&&Ne("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(E,t.TEXTURE_WRAP_S,K[_.wrapS]),t.texParameteri(E,t.TEXTURE_WRAP_T,K[_.wrapT]),(E===t.TEXTURE_3D||E===t.TEXTURE_2D_ARRAY)&&t.texParameteri(E,t.TEXTURE_WRAP_R,K[_.wrapR]),t.texParameteri(E,t.TEXTURE_MAG_FILTER,le[_.magFilter]),t.texParameteri(E,t.TEXTURE_MIN_FILTER,le[_.minFilter]),_.compareFunction&&(t.texParameteri(E,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(E,t.TEXTURE_COMPARE_FUNC,ge[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Jt||_.minFilter!==ro&&_.minFilter!==Nr||_.type===xi&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const D=e.get("EXT_texture_filter_anisotropic");t.texParameterf(E,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Ve(E,_){let D=!1;E.__webglInit===void 0&&(E.__webglInit=!0,_.addEventListener("dispose",A));const Y=_.source;let j=u.get(Y);j===void 0&&(j={},u.set(Y,j));const W=X(_);if(W!==E.__cacheKey){j[W]===void 0&&(j[W]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,D=!0),j[W].usedTimes++;const _e=j[E.__cacheKey];_e!==void 0&&(j[E.__cacheKey].usedTimes--,_e.usedTimes===0&&b(_)),E.__cacheKey=W,E.__webglTexture=j[W].texture}return D}function gt(E,_,D){return Math.floor(Math.floor(E/D)/_)}function mt(E,_,D,Y){const W=E.updateRanges;if(W.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,_.width,_.height,D,Y,_.data);else{W.sort((Z,ee)=>Z.start-ee.start);let _e=0;for(let Z=1;Z<W.length;Z++){const ee=W[_e],ve=W[Z],Me=ee.start+ee.count,he=gt(ve.start,_.width,4),We=gt(ee.start,_.width,4);ve.start<=Me+1&&he===We&&gt(ve.start+ve.count-1,_.width,4)===he?ee.count=Math.max(ee.count,ve.start+ve.count-ee.start):(++_e,W[_e]=ve)}W.length=_e+1;const ie=t.getParameter(t.UNPACK_ROW_LENGTH),Pe=t.getParameter(t.UNPACK_SKIP_PIXELS),Ue=t.getParameter(t.UNPACK_SKIP_ROWS);t.pixelStorei(t.UNPACK_ROW_LENGTH,_.width);for(let Z=0,ee=W.length;Z<ee;Z++){const ve=W[Z],Me=Math.floor(ve.start/4),he=Math.ceil(ve.count/4),We=Me%_.width,L=Math.floor(Me/_.width),re=he,te=1;t.pixelStorei(t.UNPACK_SKIP_PIXELS,We),t.pixelStorei(t.UNPACK_SKIP_ROWS,L),n.texSubImage2D(t.TEXTURE_2D,0,We,L,re,te,D,Y,_.data)}E.clearUpdateRanges(),t.pixelStorei(t.UNPACK_ROW_LENGTH,ie),t.pixelStorei(t.UNPACK_SKIP_PIXELS,Pe),t.pixelStorei(t.UNPACK_SKIP_ROWS,Ue)}}function $(E,_,D){let Y=t.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Y=t.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Y=t.TEXTURE_3D);const j=Ve(E,_),W=_.source;n.bindTexture(Y,E.__webglTexture,t.TEXTURE0+D);const _e=i.get(W);if(W.version!==_e.__version||j===!0){n.activeTexture(t.TEXTURE0+D);const ie=Ke.getPrimaries(Ke.workingColorSpace),Pe=_.colorSpace===ur?null:Ke.getPrimaries(_.colorSpace),Ue=_.colorSpace===ur||ie===Pe?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);let Z=M(_.image,!1,r.maxTextureSize);Z=ft(_,Z);const ee=s.convert(_.format,_.colorSpace),ve=s.convert(_.type);let Me=T(_.internalFormat,ee,ve,_.colorSpace,_.isVideoTexture);de(Y,_);let he;const We=_.mipmaps,L=_.isVideoTexture!==!0,re=_e.__version===void 0||j===!0,te=W.dataReady,pe=R(_,Z);if(_.isDepthTexture)Me=y(_.format===Fr,_.type),re&&(L?n.texStorage2D(t.TEXTURE_2D,1,Me,Z.width,Z.height):n.texImage2D(t.TEXTURE_2D,0,Me,Z.width,Z.height,0,ee,ve,null));else if(_.isDataTexture)if(We.length>0){L&&re&&n.texStorage2D(t.TEXTURE_2D,pe,Me,We[0].width,We[0].height);for(let J=0,H=We.length;J<H;J++)he=We[J],L?te&&n.texSubImage2D(t.TEXTURE_2D,J,0,0,he.width,he.height,ee,ve,he.data):n.texImage2D(t.TEXTURE_2D,J,Me,he.width,he.height,0,ee,ve,he.data);_.generateMipmaps=!1}else L?(re&&n.texStorage2D(t.TEXTURE_2D,pe,Me,Z.width,Z.height),te&&mt(_,Z,ee,ve)):n.texImage2D(t.TEXTURE_2D,0,Me,Z.width,Z.height,0,ee,ve,Z.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){L&&re&&n.texStorage3D(t.TEXTURE_2D_ARRAY,pe,Me,We[0].width,We[0].height,Z.depth);for(let J=0,H=We.length;J<H;J++)if(he=We[J],_.format!==si)if(ee!==null)if(L){if(te)if(_.layerUpdates.size>0){const xe=uf(he.width,he.height,_.format,_.type);for(const Oe of _.layerUpdates){const pt=he.data.subarray(Oe*xe/he.data.BYTES_PER_ELEMENT,(Oe+1)*xe/he.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,J,0,0,Oe,he.width,he.height,1,ee,pt)}_.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,J,0,0,0,he.width,he.height,Z.depth,ee,he.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,J,Me,he.width,he.height,Z.depth,0,he.data,0,0);else Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?te&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,J,0,0,0,he.width,he.height,Z.depth,ee,ve,he.data):n.texImage3D(t.TEXTURE_2D_ARRAY,J,Me,he.width,he.height,Z.depth,0,ee,ve,he.data)}else{L&&re&&n.texStorage2D(t.TEXTURE_2D,pe,Me,We[0].width,We[0].height);for(let J=0,H=We.length;J<H;J++)he=We[J],_.format!==si?ee!==null?L?te&&n.compressedTexSubImage2D(t.TEXTURE_2D,J,0,0,he.width,he.height,ee,he.data):n.compressedTexImage2D(t.TEXTURE_2D,J,Me,he.width,he.height,0,he.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?te&&n.texSubImage2D(t.TEXTURE_2D,J,0,0,he.width,he.height,ee,ve,he.data):n.texImage2D(t.TEXTURE_2D,J,Me,he.width,he.height,0,ee,ve,he.data)}else if(_.isDataArrayTexture)if(L){if(re&&n.texStorage3D(t.TEXTURE_2D_ARRAY,pe,Me,Z.width,Z.height,Z.depth),te)if(_.layerUpdates.size>0){const J=uf(Z.width,Z.height,_.format,_.type);for(const H of _.layerUpdates){const xe=Z.data.subarray(H*J/Z.data.BYTES_PER_ELEMENT,(H+1)*J/Z.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,H,Z.width,Z.height,1,ee,ve,xe)}_.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,ee,ve,Z.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Me,Z.width,Z.height,Z.depth,0,ee,ve,Z.data);else if(_.isData3DTexture)L?(re&&n.texStorage3D(t.TEXTURE_3D,pe,Me,Z.width,Z.height,Z.depth),te&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,ee,ve,Z.data)):n.texImage3D(t.TEXTURE_3D,0,Me,Z.width,Z.height,Z.depth,0,ee,ve,Z.data);else if(_.isFramebufferTexture){if(re)if(L)n.texStorage2D(t.TEXTURE_2D,pe,Me,Z.width,Z.height);else{let J=Z.width,H=Z.height;for(let xe=0;xe<pe;xe++)n.texImage2D(t.TEXTURE_2D,xe,Me,J,H,0,ee,ve,null),J>>=1,H>>=1}}else if(We.length>0){if(L&&re){const J=ye(We[0]);n.texStorage2D(t.TEXTURE_2D,pe,Me,J.width,J.height)}for(let J=0,H=We.length;J<H;J++)he=We[J],L?te&&n.texSubImage2D(t.TEXTURE_2D,J,0,0,ee,ve,he):n.texImage2D(t.TEXTURE_2D,J,Me,ee,ve,he);_.generateMipmaps=!1}else if(L){if(re){const J=ye(Z);n.texStorage2D(t.TEXTURE_2D,pe,Me,J.width,J.height)}te&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ee,ve,Z)}else n.texImage2D(t.TEXTURE_2D,0,Me,ee,ve,Z);m(_)&&p(Y),_e.__version=W.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function ne(E,_,D){if(_.image.length!==6)return;const Y=Ve(E,_),j=_.source;n.bindTexture(t.TEXTURE_CUBE_MAP,E.__webglTexture,t.TEXTURE0+D);const W=i.get(j);if(j.version!==W.__version||Y===!0){n.activeTexture(t.TEXTURE0+D);const _e=Ke.getPrimaries(Ke.workingColorSpace),ie=_.colorSpace===ur?null:Ke.getPrimaries(_.colorSpace),Pe=_.colorSpace===ur||_e===ie?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);const Ue=_.isCompressedTexture||_.image[0].isCompressedTexture,Z=_.image[0]&&_.image[0].isDataTexture,ee=[];for(let H=0;H<6;H++)!Ue&&!Z?ee[H]=M(_.image[H],!0,r.maxCubemapSize):ee[H]=Z?_.image[H].image:_.image[H],ee[H]=ft(_,ee[H]);const ve=ee[0],Me=s.convert(_.format,_.colorSpace),he=s.convert(_.type),We=T(_.internalFormat,Me,he,_.colorSpace),L=_.isVideoTexture!==!0,re=W.__version===void 0||Y===!0,te=j.dataReady;let pe=R(_,ve);de(t.TEXTURE_CUBE_MAP,_);let J;if(Ue){L&&re&&n.texStorage2D(t.TEXTURE_CUBE_MAP,pe,We,ve.width,ve.height);for(let H=0;H<6;H++){J=ee[H].mipmaps;for(let xe=0;xe<J.length;xe++){const Oe=J[xe];_.format!==si?Me!==null?L?te&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+H,xe,0,0,Oe.width,Oe.height,Me,Oe.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+H,xe,We,Oe.width,Oe.height,0,Oe.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+H,xe,0,0,Oe.width,Oe.height,Me,he,Oe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+H,xe,We,Oe.width,Oe.height,0,Me,he,Oe.data)}}}else{if(J=_.mipmaps,L&&re){J.length>0&&pe++;const H=ye(ee[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,pe,We,H.width,H.height)}for(let H=0;H<6;H++)if(Z){L?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,0,0,ee[H].width,ee[H].height,Me,he,ee[H].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,We,ee[H].width,ee[H].height,0,Me,he,ee[H].data);for(let xe=0;xe<J.length;xe++){const pt=J[xe].image[H].image;L?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+H,xe+1,0,0,pt.width,pt.height,Me,he,pt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+H,xe+1,We,pt.width,pt.height,0,Me,he,pt.data)}}else{L?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,0,0,Me,he,ee[H]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,We,Me,he,ee[H]);for(let xe=0;xe<J.length;xe++){const Oe=J[xe];L?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+H,xe+1,0,0,Me,he,Oe.image[H]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+H,xe+1,We,Me,he,Oe.image[H])}}}m(_)&&p(t.TEXTURE_CUBE_MAP),W.__version=j.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function se(E,_,D,Y,j,W){const _e=s.convert(D.format,D.colorSpace),ie=s.convert(D.type),Pe=T(D.internalFormat,_e,ie,D.colorSpace),Ue=i.get(_),Z=i.get(D);if(Z.__renderTarget=_,!Ue.__hasExternalTextures){const ee=Math.max(1,_.width>>W),ve=Math.max(1,_.height>>W);j===t.TEXTURE_3D||j===t.TEXTURE_2D_ARRAY?n.texImage3D(j,W,Pe,ee,ve,_.depth,0,_e,ie,null):n.texImage2D(j,W,Pe,ee,ve,0,_e,ie,null)}n.bindFramebuffer(t.FRAMEBUFFER,E),It(_)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Y,j,Z.__webglTexture,0,w(_)):(j===t.TEXTURE_2D||j>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,Y,j,Z.__webglTexture,W),n.bindFramebuffer(t.FRAMEBUFFER,null)}function ke(E,_,D){if(t.bindRenderbuffer(t.RENDERBUFFER,E),_.depthBuffer){const Y=_.depthTexture,j=Y&&Y.isDepthTexture?Y.type:null,W=y(_.stencilBuffer,j),_e=_.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;It(_)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,w(_),W,_.width,_.height):D?t.renderbufferStorageMultisample(t.RENDERBUFFER,w(_),W,_.width,_.height):t.renderbufferStorage(t.RENDERBUFFER,W,_.width,_.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,_e,t.RENDERBUFFER,E)}else{const Y=_.textures;for(let j=0;j<Y.length;j++){const W=Y[j],_e=s.convert(W.format,W.colorSpace),ie=s.convert(W.type),Pe=T(W.internalFormat,_e,ie,W.colorSpace);It(_)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,w(_),Pe,_.width,_.height):D?t.renderbufferStorageMultisample(t.RENDERBUFFER,w(_),Pe,_.width,_.height):t.renderbufferStorage(t.RENDERBUFFER,Pe,_.width,_.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Ie(E,_,D){const Y=_.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,E),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=i.get(_.depthTexture);if(j.__renderTarget=_,(!j.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Y){if(j.__webglInit===void 0&&(j.__webglInit=!0,_.depthTexture.addEventListener("dispose",A)),j.__webglTexture===void 0){j.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,j.__webglTexture),de(t.TEXTURE_CUBE_MAP,_.depthTexture);const Ue=s.convert(_.depthTexture.format),Z=s.convert(_.depthTexture.type);let ee;_.depthTexture.format===$i?ee=t.DEPTH_COMPONENT24:_.depthTexture.format===Fr&&(ee=t.DEPTH24_STENCIL8);for(let ve=0;ve<6;ve++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,ee,_.width,_.height,0,Ue,Z,null)}}else B(_.depthTexture,0);const W=j.__webglTexture,_e=w(_),ie=Y?t.TEXTURE_CUBE_MAP_POSITIVE_X+D:t.TEXTURE_2D,Pe=_.depthTexture.format===Fr?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(_.depthTexture.format===$i)It(_)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Pe,ie,W,0,_e):t.framebufferTexture2D(t.FRAMEBUFFER,Pe,ie,W,0);else if(_.depthTexture.format===Fr)It(_)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Pe,ie,W,0,_e):t.framebufferTexture2D(t.FRAMEBUFFER,Pe,ie,W,0);else throw new Error("Unknown depthTexture format")}function Fe(E){const _=i.get(E),D=E.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==E.depthTexture){const Y=E.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Y){const j=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Y.removeEventListener("dispose",j)};Y.addEventListener("dispose",j),_.__depthDisposeCallback=j}_.__boundDepthTexture=Y}if(E.depthTexture&&!_.__autoAllocateDepthBuffer)if(D)for(let Y=0;Y<6;Y++)Ie(_.__webglFramebuffer[Y],E,Y);else{const Y=E.texture.mipmaps;Y&&Y.length>0?Ie(_.__webglFramebuffer[0],E,0):Ie(_.__webglFramebuffer,E,0)}else if(D){_.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(n.bindFramebuffer(t.FRAMEBUFFER,_.__webglFramebuffer[Y]),_.__webglDepthbuffer[Y]===void 0)_.__webglDepthbuffer[Y]=t.createRenderbuffer(),ke(_.__webglDepthbuffer[Y],E,!1);else{const j=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,W=_.__webglDepthbuffer[Y];t.bindRenderbuffer(t.RENDERBUFFER,W),t.framebufferRenderbuffer(t.FRAMEBUFFER,j,t.RENDERBUFFER,W)}}else{const Y=E.texture.mipmaps;if(Y&&Y.length>0?n.bindFramebuffer(t.FRAMEBUFFER,_.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=t.createRenderbuffer(),ke(_.__webglDepthbuffer,E,!1);else{const j=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,W=_.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,W),t.framebufferRenderbuffer(t.FRAMEBUFFER,j,t.RENDERBUFFER,W)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Xt(E,_,D){const Y=i.get(E);_!==void 0&&se(Y.__webglFramebuffer,E,E.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),D!==void 0&&Fe(E)}function je(E){const _=E.texture,D=i.get(E),Y=i.get(_);E.addEventListener("dispose",C);const j=E.textures,W=E.isWebGLCubeRenderTarget===!0,_e=j.length>1;if(_e||(Y.__webglTexture===void 0&&(Y.__webglTexture=t.createTexture()),Y.__version=_.version,a.memory.textures++),W){D.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer[ie]=[];for(let Pe=0;Pe<_.mipmaps.length;Pe++)D.__webglFramebuffer[ie][Pe]=t.createFramebuffer()}else D.__webglFramebuffer[ie]=t.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer=[];for(let ie=0;ie<_.mipmaps.length;ie++)D.__webglFramebuffer[ie]=t.createFramebuffer()}else D.__webglFramebuffer=t.createFramebuffer();if(_e)for(let ie=0,Pe=j.length;ie<Pe;ie++){const Ue=i.get(j[ie]);Ue.__webglTexture===void 0&&(Ue.__webglTexture=t.createTexture(),a.memory.textures++)}if(E.samples>0&&It(E)===!1){D.__webglMultisampledFramebuffer=t.createFramebuffer(),D.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let ie=0;ie<j.length;ie++){const Pe=j[ie];D.__webglColorRenderbuffer[ie]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,D.__webglColorRenderbuffer[ie]);const Ue=s.convert(Pe.format,Pe.colorSpace),Z=s.convert(Pe.type),ee=T(Pe.internalFormat,Ue,Z,Pe.colorSpace,E.isXRRenderTarget===!0),ve=w(E);t.renderbufferStorageMultisample(t.RENDERBUFFER,ve,ee,E.width,E.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ie,t.RENDERBUFFER,D.__webglColorRenderbuffer[ie])}t.bindRenderbuffer(t.RENDERBUFFER,null),E.depthBuffer&&(D.__webglDepthRenderbuffer=t.createRenderbuffer(),ke(D.__webglDepthRenderbuffer,E,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(W){n.bindTexture(t.TEXTURE_CUBE_MAP,Y.__webglTexture),de(t.TEXTURE_CUBE_MAP,_);for(let ie=0;ie<6;ie++)if(_.mipmaps&&_.mipmaps.length>0)for(let Pe=0;Pe<_.mipmaps.length;Pe++)se(D.__webglFramebuffer[ie][Pe],E,_,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Pe);else se(D.__webglFramebuffer[ie],E,_,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);m(_)&&p(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(_e){for(let ie=0,Pe=j.length;ie<Pe;ie++){const Ue=j[ie],Z=i.get(Ue);let ee=t.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ee=E.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ee,Z.__webglTexture),de(ee,Ue),se(D.__webglFramebuffer,E,Ue,t.COLOR_ATTACHMENT0+ie,ee,0),m(Ue)&&p(ee)}n.unbindTexture()}else{let ie=t.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ie=E.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ie,Y.__webglTexture),de(ie,_),_.mipmaps&&_.mipmaps.length>0)for(let Pe=0;Pe<_.mipmaps.length;Pe++)se(D.__webglFramebuffer[Pe],E,_,t.COLOR_ATTACHMENT0,ie,Pe);else se(D.__webglFramebuffer,E,_,t.COLOR_ATTACHMENT0,ie,0);m(_)&&p(ie),n.unbindTexture()}E.depthBuffer&&Fe(E)}function rt(E){const _=E.textures;for(let D=0,Y=_.length;D<Y;D++){const j=_[D];if(m(j)){const W=S(E),_e=i.get(j).__webglTexture;n.bindTexture(W,_e),p(W),n.unbindTexture()}}}const ht=[],He=[];function Ct(E){if(E.samples>0){if(It(E)===!1){const _=E.textures,D=E.width,Y=E.height;let j=t.COLOR_BUFFER_BIT;const W=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,_e=i.get(E),ie=_.length>1;if(ie)for(let Ue=0;Ue<_.length;Ue++)n.bindFramebuffer(t.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ue,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,_e.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ue,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer);const Pe=E.texture.mipmaps;Pe&&Pe.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,_e.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let Ue=0;Ue<_.length;Ue++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(j|=t.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(j|=t.STENCIL_BUFFER_BIT)),ie){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,_e.__webglColorRenderbuffer[Ue]);const Z=i.get(_[Ue]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Z,0)}t.blitFramebuffer(0,0,D,Y,0,0,D,Y,j,t.NEAREST),c===!0&&(ht.length=0,He.length=0,ht.push(t.COLOR_ATTACHMENT0+Ue),E.depthBuffer&&E.resolveDepthBuffer===!1&&(ht.push(W),He.push(W),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,He)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,ht))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),ie)for(let Ue=0;Ue<_.length;Ue++){n.bindFramebuffer(t.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ue,t.RENDERBUFFER,_e.__webglColorRenderbuffer[Ue]);const Z=i.get(_[Ue]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,_e.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ue,t.TEXTURE_2D,Z,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){const _=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[_])}}}function w(E){return Math.min(r.maxSamples,E.samples)}function It(E){const _=i.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function nt(E){const _=a.render.frame;h.get(E)!==_&&(h.set(E,_),E.update())}function ft(E,_){const D=E.colorSpace,Y=E.format,j=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||D!==Ds&&D!==ur&&(Ke.getTransfer(D)===at?(Y!==si||j!==Xn)&&Ne("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qe("WebGLTextures: Unsupported texture color space:",D)),_}function ye(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=k,this.setTexture2D=B,this.setTexture2DArray=G,this.setTexture3D=N,this.setTextureCube=Q,this.rebindTextures=Xt,this.setupRenderTarget=je,this.updateRenderTargetMipmap=rt,this.updateMultisampleRenderTarget=Ct,this.setupDepthRenderbuffer=Fe,this.setupFrameBufferTexture=se,this.useMultisampledRTT=It,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function wM(t,e){function n(i,r=ur){let s;const a=Ke.getTransfer(r);if(i===Xn)return t.UNSIGNED_BYTE;if(i===uu)return t.UNSIGNED_SHORT_4_4_4_4;if(i===du)return t.UNSIGNED_SHORT_5_5_5_1;if(i===gm)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===_m)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===pm)return t.BYTE;if(i===mm)return t.SHORT;if(i===Ua)return t.UNSIGNED_SHORT;if(i===hu)return t.INT;if(i===Ai)return t.UNSIGNED_INT;if(i===xi)return t.FLOAT;if(i===qi)return t.HALF_FLOAT;if(i===vm)return t.ALPHA;if(i===xm)return t.RGB;if(i===si)return t.RGBA;if(i===$i)return t.DEPTH_COMPONENT;if(i===Fr)return t.DEPTH_STENCIL;if(i===Mm)return t.RED;if(i===fu)return t.RED_INTEGER;if(i===Ls)return t.RG;if(i===pu)return t.RG_INTEGER;if(i===mu)return t.RGBA_INTEGER;if(i===Go||i===Ho||i===Wo||i===Xo)if(a===at)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Go)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ho)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Wo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Xo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Go)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ho)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Wo)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Xo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===eh||i===th||i===nh||i===ih)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===eh)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===th)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===nh)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===ih)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===rh||i===sh||i===ah||i===oh||i===ch||i===lh||i===hh)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===rh||i===sh)return a===at?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===ah)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===oh)return s.COMPRESSED_R11_EAC;if(i===ch)return s.COMPRESSED_SIGNED_R11_EAC;if(i===lh)return s.COMPRESSED_RG11_EAC;if(i===hh)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===uh||i===dh||i===fh||i===ph||i===mh||i===gh||i===_h||i===vh||i===xh||i===Mh||i===Sh||i===yh||i===Eh||i===bh)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===uh)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===dh)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===fh)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ph)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===mh)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===gh)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===_h)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===vh)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===xh)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Mh)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Sh)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===yh)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Eh)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===bh)return a===at?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Th||i===Ah||i===wh)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===Th)return a===at?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ah)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===wh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Rh||i===Ch||i===Ph||i===Lh)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Rh)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Ch)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ph)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Lh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Na?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const RM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,CM=`
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

}`;class PM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new Pm(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new oi({vertexShader:RM,fragmentShader:CM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new pn(new Xa(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class LM extends Zs{constructor(e,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,g=null;const M=typeof XRWebGLBinding<"u",m=new PM,p={},S=n.getContextAttributes();let T=null,y=null;const R=[],A=[],C=new it;let v=null;const b=new Gn;b.viewport=new Dt;const q=new Gn;q.viewport=new Dt;const P=[b,q],k=new H1;let z=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ne=R[$];return ne===void 0&&(ne=new tl,R[$]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function($){let ne=R[$];return ne===void 0&&(ne=new tl,R[$]=ne),ne.getGripSpace()},this.getHand=function($){let ne=R[$];return ne===void 0&&(ne=new tl,R[$]=ne),ne.getHandSpace()};function B($){const ne=A.indexOf($.inputSource);if(ne===-1)return;const se=R[ne];se!==void 0&&(se.update($.inputSource,$.frame,l||a),se.dispatchEvent({type:$.type,data:$.inputSource}))}function G(){r.removeEventListener("select",B),r.removeEventListener("selectstart",B),r.removeEventListener("selectend",B),r.removeEventListener("squeeze",B),r.removeEventListener("squeezestart",B),r.removeEventListener("squeezeend",B),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",N);for(let $=0;$<R.length;$++){const ne=A[$];ne!==null&&(A[$]=null,R[$].disconnect(ne))}z=null,X=null,m.reset();for(const $ in p)delete p[$];e.setRenderTarget(T),f=null,u=null,d=null,r=null,y=null,mt.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,i.isPresenting===!0&&Ne("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,i.isPresenting===!0&&Ne("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&M&&(d=new XRWebGLBinding(r,n)),d},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(T=e.getRenderTarget(),r.addEventListener("select",B),r.addEventListener("selectstart",B),r.addEventListener("selectend",B),r.addEventListener("squeeze",B),r.addEventListener("squeezestart",B),r.addEventListener("squeezeend",B),r.addEventListener("end",G),r.addEventListener("inputsourceschange",N),S.xrCompatible!==!0&&await n.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(C),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let se=null,ke=null,Ie=null;S.depth&&(Ie=S.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,se=S.stencil?Fr:$i,ke=S.stencil?Na:Ai);const Fe={colorFormat:n.RGBA8,depthFormat:Ie,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(Fe),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new Ei(u.textureWidth,u.textureHeight,{format:si,type:Xn,depthTexture:new Fa(u.textureWidth,u.textureHeight,ke,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const se={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,n,se),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Ei(f.framebufferWidth,f.framebufferHeight,{format:si,type:Xn,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),mt.setContext(r),mt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function N($){for(let ne=0;ne<$.removed.length;ne++){const se=$.removed[ne],ke=A.indexOf(se);ke>=0&&(A[ke]=null,R[ke].disconnect(se))}for(let ne=0;ne<$.added.length;ne++){const se=$.added[ne];let ke=A.indexOf(se);if(ke===-1){for(let Fe=0;Fe<R.length;Fe++)if(Fe>=A.length){A.push(se),ke=Fe;break}else if(A[Fe]===null){A[Fe]=se,ke=Fe;break}if(ke===-1)break}const Ie=R[ke];Ie&&Ie.connect(se)}}const Q=new I,K=new I;function le($,ne,se){Q.setFromMatrixPosition(ne.matrixWorld),K.setFromMatrixPosition(se.matrixWorld);const ke=Q.distanceTo(K),Ie=ne.projectionMatrix.elements,Fe=se.projectionMatrix.elements,Xt=Ie[14]/(Ie[10]-1),je=Ie[14]/(Ie[10]+1),rt=(Ie[9]+1)/Ie[5],ht=(Ie[9]-1)/Ie[5],He=(Ie[8]-1)/Ie[0],Ct=(Fe[8]+1)/Fe[0],w=Xt*He,It=Xt*Ct,nt=ke/(-He+Ct),ft=nt*-He;if(ne.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(ft),$.translateZ(nt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Ie[10]===-1)$.projectionMatrix.copy(ne.projectionMatrix),$.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const ye=Xt+nt,E=je+nt,_=w-ft,D=It+(ke-ft),Y=rt*je/E*ye,j=ht*je/E*ye;$.projectionMatrix.makePerspective(_,D,Y,j,ye,E),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function ge($,ne){ne===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ne.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let ne=$.near,se=$.far;m.texture!==null&&(m.depthNear>0&&(ne=m.depthNear),m.depthFar>0&&(se=m.depthFar)),k.near=q.near=b.near=ne,k.far=q.far=b.far=se,(z!==k.near||X!==k.far)&&(r.updateRenderState({depthNear:k.near,depthFar:k.far}),z=k.near,X=k.far),k.layers.mask=$.layers.mask|6,b.layers.mask=k.layers.mask&-5,q.layers.mask=k.layers.mask&-3;const ke=$.parent,Ie=k.cameras;ge(k,ke);for(let Fe=0;Fe<Ie.length;Fe++)ge(Ie[Fe],ke);Ie.length===2?le(k,b,q):k.projectionMatrix.copy(b.projectionMatrix),de($,k,ke)};function de($,ne,se){se===null?$.matrix.copy(ne.matrixWorld):($.matrix.copy(se.matrixWorld),$.matrix.invert(),$.matrix.multiply(ne.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ne.projectionMatrix),$.projectionMatrixInverse.copy(ne.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Dh*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function($){c=$,u!==null&&(u.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(k)},this.getCameraTexture=function($){return p[$]};let Ve=null;function gt($,ne){if(h=ne.getViewerPose(l||a),g=ne,h!==null){const se=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let ke=!1;se.length!==k.cameras.length&&(k.cameras.length=0,ke=!0);for(let je=0;je<se.length;je++){const rt=se[je];let ht=null;if(f!==null)ht=f.getViewport(rt);else{const Ct=d.getViewSubImage(u,rt);ht=Ct.viewport,je===0&&(e.setRenderTargetTextures(y,Ct.colorTexture,Ct.depthStencilTexture),e.setRenderTarget(y))}let He=P[je];He===void 0&&(He=new Gn,He.layers.enable(je),He.viewport=new Dt,P[je]=He),He.matrix.fromArray(rt.transform.matrix),He.matrix.decompose(He.position,He.quaternion,He.scale),He.projectionMatrix.fromArray(rt.projectionMatrix),He.projectionMatrixInverse.copy(He.projectionMatrix).invert(),He.viewport.set(ht.x,ht.y,ht.width,ht.height),je===0&&(k.matrix.copy(He.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),ke===!0&&k.cameras.push(He)}const Ie=r.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&M){d=i.getBinding();const je=d.getDepthInformation(se[0]);je&&je.isValid&&je.texture&&m.init(je,r.renderState)}if(Ie&&Ie.includes("camera-access")&&M){e.state.unbindTexture(),d=i.getBinding();for(let je=0;je<se.length;je++){const rt=se[je].camera;if(rt){let ht=p[rt];ht||(ht=new Pm,p[rt]=ht);const He=d.getCameraImage(rt);ht.sourceTexture=He}}}}for(let se=0;se<R.length;se++){const ke=A[se],Ie=R[se];ke!==null&&Ie!==void 0&&Ie.update(ke,ne,l||a)}Ve&&Ve($,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),g=null}const mt=new Um;mt.setAnimationLoop(gt),this.setAnimationLoop=function($){Ve=$},this.dispose=function(){}}}const Cr=new wi,DM=new bt;function IM(t,e){function n(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Lm(t)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,S,T,y){p.isMeshBasicMaterial?s(m,p):p.isMeshLambertMaterial?(s(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),M(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,S,T):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,n(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,n(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===dn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,n(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===dn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,n(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,n(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,n(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=e.get(p),T=S.envMap,y=S.envMapRotation;T&&(m.envMap.value=T,Cr.copy(y),Cr.x*=-1,Cr.y*=-1,Cr.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Cr.y*=-1,Cr.z*=-1),m.envMapRotation.value.setFromMatrix4(DM.makeRotationFromEuler(Cr)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,n(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,n(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,n(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,S,T){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=T*.5,p.map&&(m.map.value=p.map,n(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,n(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,n(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,n(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,n(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,n(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,n(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,n(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,n(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===dn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,n(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,n(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,n(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,n(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,n(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,n(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,n(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function M(m,p){const S=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function UM(t,e,n,i){let r={},s={},a=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,T){const y=T.program;i.uniformBlockBinding(S,y)}function l(S,T){let y=r[S.id];y===void 0&&(g(S),y=h(S),r[S.id]=y,S.addEventListener("dispose",m));const R=T.program;i.updateUBOMapping(S,R);const A=e.render.frame;s[S.id]!==A&&(u(S),s[S.id]=A)}function h(S){const T=d();S.__bindingPointIndex=T;const y=t.createBuffer(),R=S.__size,A=S.usage;return t.bindBuffer(t.UNIFORM_BUFFER,y),t.bufferData(t.UNIFORM_BUFFER,R,A),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,T,y),y}function d(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return Qe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(S){const T=r[S.id],y=S.uniforms,R=S.__cache;t.bindBuffer(t.UNIFORM_BUFFER,T);for(let A=0,C=y.length;A<C;A++){const v=Array.isArray(y[A])?y[A]:[y[A]];for(let b=0,q=v.length;b<q;b++){const P=v[b];if(f(P,A,b,R)===!0){const k=P.__offset,z=Array.isArray(P.value)?P.value:[P.value];let X=0;for(let B=0;B<z.length;B++){const G=z[B],N=M(G);typeof G=="number"||typeof G=="boolean"?(P.__data[0]=G,t.bufferSubData(t.UNIFORM_BUFFER,k+X,P.__data)):G.isMatrix3?(P.__data[0]=G.elements[0],P.__data[1]=G.elements[1],P.__data[2]=G.elements[2],P.__data[3]=0,P.__data[4]=G.elements[3],P.__data[5]=G.elements[4],P.__data[6]=G.elements[5],P.__data[7]=0,P.__data[8]=G.elements[6],P.__data[9]=G.elements[7],P.__data[10]=G.elements[8],P.__data[11]=0):(G.toArray(P.__data,X),X+=N.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,k,P.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function f(S,T,y,R){const A=S.value,C=T+"_"+y;if(R[C]===void 0)return typeof A=="number"||typeof A=="boolean"?R[C]=A:R[C]=A.clone(),!0;{const v=R[C];if(typeof A=="number"||typeof A=="boolean"){if(v!==A)return R[C]=A,!0}else if(v.equals(A)===!1)return v.copy(A),!0}return!1}function g(S){const T=S.uniforms;let y=0;const R=16;for(let C=0,v=T.length;C<v;C++){const b=Array.isArray(T[C])?T[C]:[T[C]];for(let q=0,P=b.length;q<P;q++){const k=b[q],z=Array.isArray(k.value)?k.value:[k.value];for(let X=0,B=z.length;X<B;X++){const G=z[X],N=M(G),Q=y%R,K=Q%N.boundary,le=Q+K;y+=K,le!==0&&R-le<N.storage&&(y+=R-le),k.__data=new Float32Array(N.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=y,y+=N.storage}}}const A=y%R;return A>0&&(y+=R-A),S.__size=y,S.__cache={},this}function M(S){const T={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(T.boundary=4,T.storage=4):S.isVector2?(T.boundary=8,T.storage=8):S.isVector3||S.isColor?(T.boundary=16,T.storage=12):S.isVector4?(T.boundary=16,T.storage=16):S.isMatrix3?(T.boundary=48,T.storage=48):S.isMatrix4?(T.boundary=64,T.storage=64):S.isTexture?Ne("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ne("WebGLRenderer: Unsupported uniform value type.",S),T}function m(S){const T=S.target;T.removeEventListener("dispose",m);const y=a.indexOf(T.__bindingPointIndex);a.splice(y,1),t.deleteBuffer(r[T.id]),delete r[T.id],delete s[T.id]}function p(){for(const S in r)t.deleteBuffer(r[S]);a=[],r={},s={}}return{bind:c,update:l,dispose:p}}const NM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let fi=null;function FM(){return fi===null&&(fi=new v1(NM,16,16,Ls,qi),fi.name="DFG_LUT",fi.minFilter=Kt,fi.magFilter=Kt,fi.wrapS=Hi,fi.wrapT=Hi,fi.generateMipmaps=!1,fi.needsUpdate=!0),fi}class OM{constructor(e={}){const{canvas:n=j_(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Xn}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const M=f,m=new Set([mu,pu,fu]),p=new Set([Xn,Ai,Ua,Na,uu,du]),S=new Uint32Array(4),T=new Int32Array(4);let y=null,R=null;const A=[],C=[];let v=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=yi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let q=!1;this._outputColorSpace=wn;let P=0,k=0,z=null,X=-1,B=null;const G=new Dt,N=new Dt;let Q=null;const K=new qe(0);let le=0,ge=n.width,de=n.height,Ve=1,gt=null,mt=null;const $=new Dt(0,0,ge,de),ne=new Dt(0,0,ge,de);let se=!1;const ke=new Rm;let Ie=!1,Fe=!1;const Xt=new bt,je=new I,rt=new Dt,ht={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let He=!1;function Ct(){return z===null?Ve:1}let w=i;function It(x,U){return n.getContext(x,U)}try{const x={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${cu}`),n.addEventListener("webglcontextlost",xe,!1),n.addEventListener("webglcontextrestored",Oe,!1),n.addEventListener("webglcontextcreationerror",pt,!1),w===null){const U="webgl2";if(w=It(U,x),w===null)throw It(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw Qe("WebGLRenderer: "+x.message),x}let nt,ft,ye,E,_,D,Y,j,W,_e,ie,Pe,Ue,Z,ee,ve,Me,he,We,L,re,te,pe;function J(){nt=new Ox(w),nt.init(),re=new wM(w,nt),ft=new Cx(w,nt,e,re),ye=new TM(w,nt),ft.reversedDepthBuffer&&u&&ye.buffers.depth.setReversed(!0),E=new zx(w),_=new uM,D=new AM(w,nt,ye,_,ft,re,E),Y=new Fx(b),j=new X1(w),te=new wx(w,j),W=new Bx(w,j,E,te),_e=new Gx(w,W,j,te,E),he=new Vx(w,ft,D),ee=new Px(_),ie=new hM(b,Y,nt,ft,te,ee),Pe=new IM(b,_),Ue=new fM,Z=new xM(nt),Me=new Ax(b,Y,ye,_e,g,c),ve=new bM(b,_e,ft),pe=new UM(w,E,ft,ye),We=new Rx(w,nt,E),L=new kx(w,nt,E),E.programs=ie.programs,b.capabilities=ft,b.extensions=nt,b.properties=_,b.renderLists=Ue,b.shadowMap=ve,b.state=ye,b.info=E}J(),M!==Xn&&(v=new Wx(M,n.width,n.height,r,s));const H=new LM(b,w);this.xr=H,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){const x=nt.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=nt.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return Ve},this.setPixelRatio=function(x){x!==void 0&&(Ve=x,this.setSize(ge,de,!1))},this.getSize=function(x){return x.set(ge,de)},this.setSize=function(x,U,V=!0){if(H.isPresenting){Ne("WebGLRenderer: Can't change size while VR device is presenting.");return}ge=x,de=U,n.width=Math.floor(x*Ve),n.height=Math.floor(U*Ve),V===!0&&(n.style.width=x+"px",n.style.height=U+"px"),v!==null&&v.setSize(n.width,n.height),this.setViewport(0,0,x,U)},this.getDrawingBufferSize=function(x){return x.set(ge*Ve,de*Ve).floor()},this.setDrawingBufferSize=function(x,U,V){ge=x,de=U,Ve=V,n.width=Math.floor(x*V),n.height=Math.floor(U*V),this.setViewport(0,0,x,U)},this.setEffects=function(x){if(M===Xn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(x){for(let U=0;U<x.length;U++)if(x[U].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}v.setEffects(x||[])},this.getCurrentViewport=function(x){return x.copy(G)},this.getViewport=function(x){return x.copy($)},this.setViewport=function(x,U,V,O){x.isVector4?$.set(x.x,x.y,x.z,x.w):$.set(x,U,V,O),ye.viewport(G.copy($).multiplyScalar(Ve).round())},this.getScissor=function(x){return x.copy(ne)},this.setScissor=function(x,U,V,O){x.isVector4?ne.set(x.x,x.y,x.z,x.w):ne.set(x,U,V,O),ye.scissor(N.copy(ne).multiplyScalar(Ve).round())},this.getScissorTest=function(){return se},this.setScissorTest=function(x){ye.setScissorTest(se=x)},this.setOpaqueSort=function(x){gt=x},this.setTransparentSort=function(x){mt=x},this.getClearColor=function(x){return x.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor(...arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha(...arguments)},this.clear=function(x=!0,U=!0,V=!0){let O=0;if(x){let F=!1;if(z!==null){const oe=z.texture.format;F=m.has(oe)}if(F){const oe=z.texture.type,fe=p.has(oe),ce=Me.getClearColor(),Se=Me.getClearAlpha(),Ae=ce.r,Be=ce.g,Xe=ce.b;fe?(S[0]=Ae,S[1]=Be,S[2]=Xe,S[3]=Se,w.clearBufferuiv(w.COLOR,0,S)):(T[0]=Ae,T[1]=Be,T[2]=Xe,T[3]=Se,w.clearBufferiv(w.COLOR,0,T))}else O|=w.COLOR_BUFFER_BIT}U&&(O|=w.DEPTH_BUFFER_BIT),V&&(O|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O!==0&&w.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",xe,!1),n.removeEventListener("webglcontextrestored",Oe,!1),n.removeEventListener("webglcontextcreationerror",pt,!1),Me.dispose(),Ue.dispose(),Z.dispose(),_.dispose(),Y.dispose(),_e.dispose(),te.dispose(),pe.dispose(),ie.dispose(),H.dispose(),H.removeEventListener("sessionstart",bd),H.removeEventListener("sessionend",Td),yr.stop()};function xe(x){x.preventDefault(),kd("WebGLRenderer: Context Lost."),q=!0}function Oe(){kd("WebGLRenderer: Context Restored."),q=!1;const x=E.autoReset,U=ve.enabled,V=ve.autoUpdate,O=ve.needsUpdate,F=ve.type;J(),E.autoReset=x,ve.enabled=U,ve.autoUpdate=V,ve.needsUpdate=O,ve.type=F}function pt(x){Qe("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function st(x){const U=x.target;U.removeEventListener("dispose",st),Ui(U)}function Ui(x){Ni(x),_.remove(x)}function Ni(x){const U=_.get(x).programs;U!==void 0&&(U.forEach(function(V){ie.releaseProgram(V)}),x.isShaderMaterial&&ie.releaseShaderCache(x))}this.renderBufferDirect=function(x,U,V,O,F,oe){U===null&&(U=ht);const fe=F.isMesh&&F.matrixWorld.determinant()<0,ce=c_(x,U,V,O,F);ye.setMaterial(O,fe);let Se=V.index,Ae=1;if(O.wireframe===!0){if(Se=W.getWireframeAttribute(V),Se===void 0)return;Ae=2}const Be=V.drawRange,Xe=V.attributes.position;let Re=Be.start*Ae,ot=(Be.start+Be.count)*Ae;oe!==null&&(Re=Math.max(Re,oe.start*Ae),ot=Math.min(ot,(oe.start+oe.count)*Ae)),Se!==null?(Re=Math.max(Re,0),ot=Math.min(ot,Se.count)):Xe!=null&&(Re=Math.max(Re,0),ot=Math.min(ot,Xe.count));const Pt=ot-Re;if(Pt<0||Pt===1/0)return;te.setup(F,O,ce,V,Se);let At,ct=We;if(Se!==null&&(At=j.get(Se),ct=L,ct.setIndex(At)),F.isMesh)O.wireframe===!0?(ye.setLineWidth(O.wireframeLinewidth*Ct()),ct.setMode(w.LINES)):ct.setMode(w.TRIANGLES);else if(F.isLine){let en=O.linewidth;en===void 0&&(en=1),ye.setLineWidth(en*Ct()),F.isLineSegments?ct.setMode(w.LINES):F.isLineLoop?ct.setMode(w.LINE_LOOP):ct.setMode(w.LINE_STRIP)}else F.isPoints?ct.setMode(w.POINTS):F.isSprite&&ct.setMode(w.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ic("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ct.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(nt.get("WEBGL_multi_draw"))ct.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const en=F._multiDrawStarts,Ee=F._multiDrawCounts,Mn=F._multiDrawCount,Je=Se?j.get(Se).bytesPerElement:1,Kn=_.get(O).currentProgram.getUniforms();for(let ui=0;ui<Mn;ui++)Kn.setValue(w,"_gl_DrawID",ui),ct.render(en[ui]/Je,Ee[ui])}else if(F.isInstancedMesh)ct.renderInstances(Re,Pt,F.count);else if(V.isInstancedBufferGeometry){const en=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Ee=Math.min(V.instanceCount,en);ct.renderInstances(Re,Pt,Ee)}else ct.render(Re,Pt)};function Ed(x,U,V){x.transparent===!0&&x.side===vi&&x.forceSinglePass===!1?(x.side=dn,x.needsUpdate=!0,io(x,U,V),x.side=_r,x.needsUpdate=!0,io(x,U,V),x.side=vi):io(x,U,V)}this.compile=function(x,U,V=null){V===null&&(V=x),R=Z.get(V),R.init(U),C.push(R),V.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(R.pushLight(F),F.castShadow&&R.pushShadow(F))}),x!==V&&x.traverseVisible(function(F){F.isLight&&F.layers.test(U.layers)&&(R.pushLight(F),F.castShadow&&R.pushShadow(F))}),R.setupLights();const O=new Set;return x.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const oe=F.material;if(oe)if(Array.isArray(oe))for(let fe=0;fe<oe.length;fe++){const ce=oe[fe];Ed(ce,V,F),O.add(ce)}else Ed(oe,V,F),O.add(oe)}),R=C.pop(),O},this.compileAsync=function(x,U,V=null){const O=this.compile(x,U,V);return new Promise(F=>{function oe(){if(O.forEach(function(fe){_.get(fe).currentProgram.isReady()&&O.delete(fe)}),O.size===0){F(x);return}setTimeout(oe,10)}nt.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let Hc=null;function o_(x){Hc&&Hc(x)}function bd(){yr.stop()}function Td(){yr.start()}const yr=new Um;yr.setAnimationLoop(o_),typeof self<"u"&&yr.setContext(self),this.setAnimationLoop=function(x){Hc=x,H.setAnimationLoop(x),x===null?yr.stop():yr.start()},H.addEventListener("sessionstart",bd),H.addEventListener("sessionend",Td),this.render=function(x,U){if(U!==void 0&&U.isCamera!==!0){Qe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(q===!0)return;const V=H.enabled===!0&&H.isPresenting===!0,O=v!==null&&(z===null||V)&&v.begin(b,z);if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),H.enabled===!0&&H.isPresenting===!0&&(v===null||v.isCompositing()===!1)&&(H.cameraAutoUpdate===!0&&H.updateCamera(U),U=H.getCamera()),x.isScene===!0&&x.onBeforeRender(b,x,U,z),R=Z.get(x,C.length),R.init(U),C.push(R),Xt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),ke.setFromProjectionMatrix(Xt,Mi,U.reversedDepth),Fe=this.localClippingEnabled,Ie=ee.init(this.clippingPlanes,Fe),y=Ue.get(x,A.length),y.init(),A.push(y),H.enabled===!0&&H.isPresenting===!0){const fe=b.xr.getDepthSensingMesh();fe!==null&&Wc(fe,U,-1/0,b.sortObjects)}Wc(x,U,0,b.sortObjects),y.finish(),b.sortObjects===!0&&y.sort(gt,mt),He=H.enabled===!1||H.isPresenting===!1||H.hasDepthSensing()===!1,He&&Me.addToRenderList(y,x),this.info.render.frame++,Ie===!0&&ee.beginShadows();const F=R.state.shadowsArray;if(ve.render(F,x,U),Ie===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset(),(O&&v.hasRenderPass())===!1){const fe=y.opaque,ce=y.transmissive;if(R.setupLights(),U.isArrayCamera){const Se=U.cameras;if(ce.length>0)for(let Ae=0,Be=Se.length;Ae<Be;Ae++){const Xe=Se[Ae];wd(fe,ce,x,Xe)}He&&Me.render(x);for(let Ae=0,Be=Se.length;Ae<Be;Ae++){const Xe=Se[Ae];Ad(y,x,Xe,Xe.viewport)}}else ce.length>0&&wd(fe,ce,x,U),He&&Me.render(x),Ad(y,x,U)}z!==null&&k===0&&(D.updateMultisampleRenderTarget(z),D.updateRenderTargetMipmap(z)),O&&v.end(b),x.isScene===!0&&x.onAfterRender(b,x,U),te.resetDefaultState(),X=-1,B=null,C.pop(),C.length>0?(R=C[C.length-1],Ie===!0&&ee.setGlobalState(b.clippingPlanes,R.state.camera)):R=null,A.pop(),A.length>0?y=A[A.length-1]:y=null};function Wc(x,U,V,O){if(x.visible===!1)return;if(x.layers.test(U.layers)){if(x.isGroup)V=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(U);else if(x.isLight)R.pushLight(x),x.castShadow&&R.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||ke.intersectsSprite(x)){O&&rt.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Xt);const fe=_e.update(x),ce=x.material;ce.visible&&y.push(x,fe,ce,V,rt.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||ke.intersectsObject(x))){const fe=_e.update(x),ce=x.material;if(O&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),rt.copy(x.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),rt.copy(fe.boundingSphere.center)),rt.applyMatrix4(x.matrixWorld).applyMatrix4(Xt)),Array.isArray(ce)){const Se=fe.groups;for(let Ae=0,Be=Se.length;Ae<Be;Ae++){const Xe=Se[Ae],Re=ce[Xe.materialIndex];Re&&Re.visible&&y.push(x,fe,Re,V,rt.z,Xe)}}else ce.visible&&y.push(x,fe,ce,V,rt.z,null)}}const oe=x.children;for(let fe=0,ce=oe.length;fe<ce;fe++)Wc(oe[fe],U,V,O)}function Ad(x,U,V,O){const{opaque:F,transmissive:oe,transparent:fe}=x;R.setupLightsView(V),Ie===!0&&ee.setGlobalState(b.clippingPlanes,V),O&&ye.viewport(G.copy(O)),F.length>0&&no(F,U,V),oe.length>0&&no(oe,U,V),fe.length>0&&no(fe,U,V),ye.buffers.depth.setTest(!0),ye.buffers.depth.setMask(!0),ye.buffers.color.setMask(!0),ye.setPolygonOffset(!1)}function wd(x,U,V,O){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(R.state.transmissionRenderTarget[O.id]===void 0){const Re=nt.has("EXT_color_buffer_half_float")||nt.has("EXT_color_buffer_float");R.state.transmissionRenderTarget[O.id]=new Ei(1,1,{generateMipmaps:!0,type:Re?qi:Xn,minFilter:Nr,samples:Math.max(4,ft.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace})}const oe=R.state.transmissionRenderTarget[O.id],fe=O.viewport||G;oe.setSize(fe.z*b.transmissionResolutionScale,fe.w*b.transmissionResolutionScale);const ce=b.getRenderTarget(),Se=b.getActiveCubeFace(),Ae=b.getActiveMipmapLevel();b.setRenderTarget(oe),b.getClearColor(K),le=b.getClearAlpha(),le<1&&b.setClearColor(16777215,.5),b.clear(),He&&Me.render(V);const Be=b.toneMapping;b.toneMapping=yi;const Xe=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),R.setupLightsView(O),Ie===!0&&ee.setGlobalState(b.clippingPlanes,O),no(x,V,O),D.updateMultisampleRenderTarget(oe),D.updateRenderTargetMipmap(oe),nt.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let ot=0,Pt=U.length;ot<Pt;ot++){const At=U[ot],{object:ct,geometry:en,material:Ee,group:Mn}=At;if(Ee.side===vi&&ct.layers.test(O.layers)){const Je=Ee.side;Ee.side=dn,Ee.needsUpdate=!0,Rd(ct,V,O,en,Ee,Mn),Ee.side=Je,Ee.needsUpdate=!0,Re=!0}}Re===!0&&(D.updateMultisampleRenderTarget(oe),D.updateRenderTargetMipmap(oe))}b.setRenderTarget(ce,Se,Ae),b.setClearColor(K,le),Xe!==void 0&&(O.viewport=Xe),b.toneMapping=Be}function no(x,U,V){const O=U.isScene===!0?U.overrideMaterial:null;for(let F=0,oe=x.length;F<oe;F++){const fe=x[F],{object:ce,geometry:Se,group:Ae}=fe;let Be=fe.material;Be.allowOverride===!0&&O!==null&&(Be=O),ce.layers.test(V.layers)&&Rd(ce,U,V,Se,Be,Ae)}}function Rd(x,U,V,O,F,oe){x.onBeforeRender(b,U,V,O,F,oe),x.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),F.onBeforeRender(b,U,V,O,x,oe),F.transparent===!0&&F.side===vi&&F.forceSinglePass===!1?(F.side=dn,F.needsUpdate=!0,b.renderBufferDirect(V,U,O,F,x,oe),F.side=_r,F.needsUpdate=!0,b.renderBufferDirect(V,U,O,F,x,oe),F.side=vi):b.renderBufferDirect(V,U,O,F,x,oe),x.onAfterRender(b,U,V,O,F,oe)}function io(x,U,V){U.isScene!==!0&&(U=ht);const O=_.get(x),F=R.state.lights,oe=R.state.shadowsArray,fe=F.state.version,ce=ie.getParameters(x,F.state,oe,U,V),Se=ie.getProgramCacheKey(ce);let Ae=O.programs;O.environment=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?U.environment:null,O.fog=U.fog;const Be=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap;O.envMap=Y.get(x.envMap||O.environment,Be),O.envMapRotation=O.environment!==null&&x.envMap===null?U.environmentRotation:x.envMapRotation,Ae===void 0&&(x.addEventListener("dispose",st),Ae=new Map,O.programs=Ae);let Xe=Ae.get(Se);if(Xe!==void 0){if(O.currentProgram===Xe&&O.lightsStateVersion===fe)return Pd(x,ce),Xe}else ce.uniforms=ie.getUniforms(x),x.onBeforeCompile(ce,b),Xe=ie.acquireProgram(ce,Se),Ae.set(Se,Xe),O.uniforms=ce.uniforms;const Re=O.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Re.clippingPlanes=ee.uniform),Pd(x,ce),O.needsLights=h_(x),O.lightsStateVersion=fe,O.needsLights&&(Re.ambientLightColor.value=F.state.ambient,Re.lightProbe.value=F.state.probe,Re.directionalLights.value=F.state.directional,Re.directionalLightShadows.value=F.state.directionalShadow,Re.spotLights.value=F.state.spot,Re.spotLightShadows.value=F.state.spotShadow,Re.rectAreaLights.value=F.state.rectArea,Re.ltc_1.value=F.state.rectAreaLTC1,Re.ltc_2.value=F.state.rectAreaLTC2,Re.pointLights.value=F.state.point,Re.pointLightShadows.value=F.state.pointShadow,Re.hemisphereLights.value=F.state.hemi,Re.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Re.spotLightMatrix.value=F.state.spotLightMatrix,Re.spotLightMap.value=F.state.spotLightMap,Re.pointShadowMatrix.value=F.state.pointShadowMatrix),O.currentProgram=Xe,O.uniformsList=null,Xe}function Cd(x){if(x.uniformsList===null){const U=x.currentProgram.getUniforms();x.uniformsList=Yo.seqWithValue(U.seq,x.uniforms)}return x.uniformsList}function Pd(x,U){const V=_.get(x);V.outputColorSpace=U.outputColorSpace,V.batching=U.batching,V.batchingColor=U.batchingColor,V.instancing=U.instancing,V.instancingColor=U.instancingColor,V.instancingMorph=U.instancingMorph,V.skinning=U.skinning,V.morphTargets=U.morphTargets,V.morphNormals=U.morphNormals,V.morphColors=U.morphColors,V.morphTargetsCount=U.morphTargetsCount,V.numClippingPlanes=U.numClippingPlanes,V.numIntersection=U.numClipIntersection,V.vertexAlphas=U.vertexAlphas,V.vertexTangents=U.vertexTangents,V.toneMapping=U.toneMapping}function c_(x,U,V,O,F){U.isScene!==!0&&(U=ht),D.resetTextureUnits();const oe=U.fog,fe=O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial?U.environment:null,ce=z===null?b.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:Ds,Se=O.isMeshStandardMaterial||O.isMeshLambertMaterial&&!O.envMap||O.isMeshPhongMaterial&&!O.envMap,Ae=Y.get(O.envMap||fe,Se),Be=O.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Xe=!!V.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Re=!!V.morphAttributes.position,ot=!!V.morphAttributes.normal,Pt=!!V.morphAttributes.color;let At=yi;O.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(At=b.toneMapping);const ct=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,en=ct!==void 0?ct.length:0,Ee=_.get(O),Mn=R.state.lights;if(Ie===!0&&(Fe===!0||x!==B)){const Yt=x===B&&O.id===X;ee.setState(O,x,Yt)}let Je=!1;O.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==Mn.state.version||Ee.outputColorSpace!==ce||F.isBatchedMesh&&Ee.batching===!1||!F.isBatchedMesh&&Ee.batching===!0||F.isBatchedMesh&&Ee.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ee.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ee.instancing===!1||!F.isInstancedMesh&&Ee.instancing===!0||F.isSkinnedMesh&&Ee.skinning===!1||!F.isSkinnedMesh&&Ee.skinning===!0||F.isInstancedMesh&&Ee.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ee.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ee.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ee.instancingMorph===!1&&F.morphTexture!==null||Ee.envMap!==Ae||O.fog===!0&&Ee.fog!==oe||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==ee.numPlanes||Ee.numIntersection!==ee.numIntersection)||Ee.vertexAlphas!==Be||Ee.vertexTangents!==Xe||Ee.morphTargets!==Re||Ee.morphNormals!==ot||Ee.morphColors!==Pt||Ee.toneMapping!==At||Ee.morphTargetsCount!==en)&&(Je=!0):(Je=!0,Ee.__version=O.version);let Kn=Ee.currentProgram;Je===!0&&(Kn=io(O,U,F));let ui=!1,Er=!1,es=!1;const ut=Kn.getUniforms(),Zt=Ee.uniforms;if(ye.useProgram(Kn.program)&&(ui=!0,Er=!0,es=!0),O.id!==X&&(X=O.id,Er=!0),ui||B!==x){ye.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),ut.setValue(w,"projectionMatrix",x.projectionMatrix),ut.setValue(w,"viewMatrix",x.matrixWorldInverse);const tr=ut.map.cameraPosition;tr!==void 0&&tr.setValue(w,je.setFromMatrixPosition(x.matrixWorld)),ft.logarithmicDepthBuffer&&ut.setValue(w,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&ut.setValue(w,"isOrthographic",x.isOrthographicCamera===!0),B!==x&&(B=x,Er=!0,es=!0)}if(Ee.needsLights&&(Mn.state.directionalShadowMap.length>0&&ut.setValue(w,"directionalShadowMap",Mn.state.directionalShadowMap,D),Mn.state.spotShadowMap.length>0&&ut.setValue(w,"spotShadowMap",Mn.state.spotShadowMap,D),Mn.state.pointShadowMap.length>0&&ut.setValue(w,"pointShadowMap",Mn.state.pointShadowMap,D)),F.isSkinnedMesh){ut.setOptional(w,F,"bindMatrix"),ut.setOptional(w,F,"bindMatrixInverse");const Yt=F.skeleton;Yt&&(Yt.boneTexture===null&&Yt.computeBoneTexture(),ut.setValue(w,"boneTexture",Yt.boneTexture,D))}F.isBatchedMesh&&(ut.setOptional(w,F,"batchingTexture"),ut.setValue(w,"batchingTexture",F._matricesTexture,D),ut.setOptional(w,F,"batchingIdTexture"),ut.setValue(w,"batchingIdTexture",F._indirectTexture,D),ut.setOptional(w,F,"batchingColorTexture"),F._colorsTexture!==null&&ut.setValue(w,"batchingColorTexture",F._colorsTexture,D));const er=V.morphAttributes;if((er.position!==void 0||er.normal!==void 0||er.color!==void 0)&&he.update(F,V,Kn),(Er||Ee.receiveShadow!==F.receiveShadow)&&(Ee.receiveShadow=F.receiveShadow,ut.setValue(w,"receiveShadow",F.receiveShadow)),(O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial)&&O.envMap===null&&U.environment!==null&&(Zt.envMapIntensity.value=U.environmentIntensity),Zt.dfgLUT!==void 0&&(Zt.dfgLUT.value=FM()),Er&&(ut.setValue(w,"toneMappingExposure",b.toneMappingExposure),Ee.needsLights&&l_(Zt,es),oe&&O.fog===!0&&Pe.refreshFogUniforms(Zt,oe),Pe.refreshMaterialUniforms(Zt,O,Ve,de,R.state.transmissionRenderTarget[x.id]),Yo.upload(w,Cd(Ee),Zt,D)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(Yo.upload(w,Cd(Ee),Zt,D),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&ut.setValue(w,"center",F.center),ut.setValue(w,"modelViewMatrix",F.modelViewMatrix),ut.setValue(w,"normalMatrix",F.normalMatrix),ut.setValue(w,"modelMatrix",F.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const Yt=O.uniformsGroups;for(let tr=0,ts=Yt.length;tr<ts;tr++){const Ld=Yt[tr];pe.update(Ld,Kn),pe.bind(Ld,Kn)}}return Kn}function l_(x,U){x.ambientLightColor.needsUpdate=U,x.lightProbe.needsUpdate=U,x.directionalLights.needsUpdate=U,x.directionalLightShadows.needsUpdate=U,x.pointLights.needsUpdate=U,x.pointLightShadows.needsUpdate=U,x.spotLights.needsUpdate=U,x.spotLightShadows.needsUpdate=U,x.rectAreaLights.needsUpdate=U,x.hemisphereLights.needsUpdate=U}function h_(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return z},this.setRenderTargetTextures=function(x,U,V){const O=_.get(x);O.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),_.get(x.texture).__webglTexture=U,_.get(x.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:V,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,U){const V=_.get(x);V.__webglFramebuffer=U,V.__useDefaultFramebuffer=U===void 0};const u_=w.createFramebuffer();this.setRenderTarget=function(x,U=0,V=0){z=x,P=U,k=V;let O=null,F=!1,oe=!1;if(x){const ce=_.get(x);if(ce.__useDefaultFramebuffer!==void 0){ye.bindFramebuffer(w.FRAMEBUFFER,ce.__webglFramebuffer),G.copy(x.viewport),N.copy(x.scissor),Q=x.scissorTest,ye.viewport(G),ye.scissor(N),ye.setScissorTest(Q),X=-1;return}else if(ce.__webglFramebuffer===void 0)D.setupRenderTarget(x);else if(ce.__hasExternalTextures)D.rebindTextures(x,_.get(x.texture).__webglTexture,_.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const Be=x.depthTexture;if(ce.__boundDepthTexture!==Be){if(Be!==null&&_.has(Be)&&(x.width!==Be.image.width||x.height!==Be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");D.setupDepthRenderbuffer(x)}}const Se=x.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(oe=!0);const Ae=_.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Ae[U])?O=Ae[U][V]:O=Ae[U],F=!0):x.samples>0&&D.useMultisampledRTT(x)===!1?O=_.get(x).__webglMultisampledFramebuffer:Array.isArray(Ae)?O=Ae[V]:O=Ae,G.copy(x.viewport),N.copy(x.scissor),Q=x.scissorTest}else G.copy($).multiplyScalar(Ve).floor(),N.copy(ne).multiplyScalar(Ve).floor(),Q=se;if(V!==0&&(O=u_),ye.bindFramebuffer(w.FRAMEBUFFER,O)&&ye.drawBuffers(x,O),ye.viewport(G),ye.scissor(N),ye.setScissorTest(Q),F){const ce=_.get(x.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+U,ce.__webglTexture,V)}else if(oe){const ce=U;for(let Se=0;Se<x.textures.length;Se++){const Ae=_.get(x.textures[Se]);w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0+Se,Ae.__webglTexture,V,ce)}}else if(x!==null&&V!==0){const ce=_.get(x.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,ce.__webglTexture,V)}X=-1},this.readRenderTargetPixels=function(x,U,V,O,F,oe,fe,ce=0){if(!(x&&x.isWebGLRenderTarget)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=_.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&fe!==void 0&&(Se=Se[fe]),Se){ye.bindFramebuffer(w.FRAMEBUFFER,Se);try{const Ae=x.textures[ce],Be=Ae.format,Xe=Ae.type;if(x.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+ce),!ft.textureFormatReadable(Be)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ft.textureTypeReadable(Xe)){Qe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=x.width-O&&V>=0&&V<=x.height-F&&w.readPixels(U,V,O,F,re.convert(Be),re.convert(Xe),oe)}finally{const Ae=z!==null?_.get(z).__webglFramebuffer:null;ye.bindFramebuffer(w.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(x,U,V,O,F,oe,fe,ce=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=_.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&fe!==void 0&&(Se=Se[fe]),Se)if(U>=0&&U<=x.width-O&&V>=0&&V<=x.height-F){ye.bindFramebuffer(w.FRAMEBUFFER,Se);const Ae=x.textures[ce],Be=Ae.format,Xe=Ae.type;if(x.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+ce),!ft.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ft.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Re=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,Re),w.bufferData(w.PIXEL_PACK_BUFFER,oe.byteLength,w.STREAM_READ),w.readPixels(U,V,O,F,re.convert(Be),re.convert(Xe),0);const ot=z!==null?_.get(z).__webglFramebuffer:null;ye.bindFramebuffer(w.FRAMEBUFFER,ot);const Pt=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await K_(w,Pt,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,Re),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,oe),w.deleteBuffer(Re),w.deleteSync(Pt),oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,U=null,V=0){const O=Math.pow(2,-V),F=Math.floor(x.image.width*O),oe=Math.floor(x.image.height*O),fe=U!==null?U.x:0,ce=U!==null?U.y:0;D.setTexture2D(x,0),w.copyTexSubImage2D(w.TEXTURE_2D,V,0,0,fe,ce,F,oe),ye.unbindTexture()};const d_=w.createFramebuffer(),f_=w.createFramebuffer();this.copyTextureToTexture=function(x,U,V=null,O=null,F=0,oe=0){let fe,ce,Se,Ae,Be,Xe,Re,ot,Pt;const At=x.isCompressedTexture?x.mipmaps[oe]:x.image;if(V!==null)fe=V.max.x-V.min.x,ce=V.max.y-V.min.y,Se=V.isBox3?V.max.z-V.min.z:1,Ae=V.min.x,Be=V.min.y,Xe=V.isBox3?V.min.z:0;else{const Zt=Math.pow(2,-F);fe=Math.floor(At.width*Zt),ce=Math.floor(At.height*Zt),x.isDataArrayTexture?Se=At.depth:x.isData3DTexture?Se=Math.floor(At.depth*Zt):Se=1,Ae=0,Be=0,Xe=0}O!==null?(Re=O.x,ot=O.y,Pt=O.z):(Re=0,ot=0,Pt=0);const ct=re.convert(U.format),en=re.convert(U.type);let Ee;U.isData3DTexture?(D.setTexture3D(U,0),Ee=w.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(D.setTexture2DArray(U,0),Ee=w.TEXTURE_2D_ARRAY):(D.setTexture2D(U,0),Ee=w.TEXTURE_2D),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,U.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,U.unpackAlignment);const Mn=w.getParameter(w.UNPACK_ROW_LENGTH),Je=w.getParameter(w.UNPACK_IMAGE_HEIGHT),Kn=w.getParameter(w.UNPACK_SKIP_PIXELS),ui=w.getParameter(w.UNPACK_SKIP_ROWS),Er=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,At.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,At.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Ae),w.pixelStorei(w.UNPACK_SKIP_ROWS,Be),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Xe);const es=x.isDataArrayTexture||x.isData3DTexture,ut=U.isDataArrayTexture||U.isData3DTexture;if(x.isDepthTexture){const Zt=_.get(x),er=_.get(U),Yt=_.get(Zt.__renderTarget),tr=_.get(er.__renderTarget);ye.bindFramebuffer(w.READ_FRAMEBUFFER,Yt.__webglFramebuffer),ye.bindFramebuffer(w.DRAW_FRAMEBUFFER,tr.__webglFramebuffer);for(let ts=0;ts<Se;ts++)es&&(w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,_.get(x).__webglTexture,F,Xe+ts),w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,_.get(U).__webglTexture,oe,Pt+ts)),w.blitFramebuffer(Ae,Be,fe,ce,Re,ot,fe,ce,w.DEPTH_BUFFER_BIT,w.NEAREST);ye.bindFramebuffer(w.READ_FRAMEBUFFER,null),ye.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else if(F!==0||x.isRenderTargetTexture||_.has(x)){const Zt=_.get(x),er=_.get(U);ye.bindFramebuffer(w.READ_FRAMEBUFFER,d_),ye.bindFramebuffer(w.DRAW_FRAMEBUFFER,f_);for(let Yt=0;Yt<Se;Yt++)es?w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Zt.__webglTexture,F,Xe+Yt):w.framebufferTexture2D(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,Zt.__webglTexture,F),ut?w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,er.__webglTexture,oe,Pt+Yt):w.framebufferTexture2D(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,er.__webglTexture,oe),F!==0?w.blitFramebuffer(Ae,Be,fe,ce,Re,ot,fe,ce,w.COLOR_BUFFER_BIT,w.NEAREST):ut?w.copyTexSubImage3D(Ee,oe,Re,ot,Pt+Yt,Ae,Be,fe,ce):w.copyTexSubImage2D(Ee,oe,Re,ot,Ae,Be,fe,ce);ye.bindFramebuffer(w.READ_FRAMEBUFFER,null),ye.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else ut?x.isDataTexture||x.isData3DTexture?w.texSubImage3D(Ee,oe,Re,ot,Pt,fe,ce,Se,ct,en,At.data):U.isCompressedArrayTexture?w.compressedTexSubImage3D(Ee,oe,Re,ot,Pt,fe,ce,Se,ct,At.data):w.texSubImage3D(Ee,oe,Re,ot,Pt,fe,ce,Se,ct,en,At):x.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,oe,Re,ot,fe,ce,ct,en,At.data):x.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,oe,Re,ot,At.width,At.height,ct,At.data):w.texSubImage2D(w.TEXTURE_2D,oe,Re,ot,fe,ce,ct,en,At);w.pixelStorei(w.UNPACK_ROW_LENGTH,Mn),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,Je),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Kn),w.pixelStorei(w.UNPACK_SKIP_ROWS,ui),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Er),oe===0&&U.generateMipmaps&&w.generateMipmap(Ee),ye.unbindTexture()},this.initRenderTarget=function(x){_.get(x).__webglFramebuffer===void 0&&D.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?D.setTextureCube(x,0):x.isData3DTexture?D.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?D.setTexture2DArray(x,0):D.setTexture2D(x,0),ye.unbindTexture()},this.resetState=function(){P=0,k=0,z=null,ye.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=Ke._getDrawingBufferColorSpace(e),n.unpackColorSpace=Ke._getUnpackColorSpace()}}const BM=/^[og]\s*(.+)?/,kM=/^mtllib /,zM=/^usemtl /,VM=/^usemap /,Nf=/\s+/,Ff=new I,Al=new I,Of=new I,Bf=new I,On=new I,Lo=new qe;function GM(){const t={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(e,n){if(this.object&&this.object.fromDeclaration===!1){this.object.name=e,this.object.fromDeclaration=n!==!1;return}const i=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:n!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(r,s){const a=this._finalize(!1);a&&(a.inherited||a.groupCount<=0)&&this.materials.splice(a.index,1);const o={index:this.materials.length,name:r||"",mtllib:Array.isArray(s)&&s.length>0?s[s.length-1]:"",smooth:a!==void 0?a.smooth:this.smooth,groupStart:a!==void 0?a.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(c){const l={index:typeof c=="number"?c:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return l.clone=this.clone.bind(l),l}};return this.materials.push(o),o},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(r){const s=this.currentMaterial();if(s&&s.groupEnd===-1&&(s.groupEnd=this.geometry.vertices.length/3,s.groupCount=s.groupEnd-s.groupStart,s.inherited=!1),r&&this.materials.length>1)for(let a=this.materials.length-1;a>=0;a--)this.materials[a].groupCount<=0&&this.materials.splice(a,1);return r&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),s}},i&&i.name&&typeof i.clone=="function"){const r=i.clone(0);r.inherited=!0,this.object.materials.push(r)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(e,n){const i=parseInt(e,10);return(i>=0?i-1:i+n/3)*3},parseNormalIndex:function(e,n){const i=parseInt(e,10);return(i>=0?i-1:i+n/3)*3},parseUVIndex:function(e,n){const i=parseInt(e,10);return(i>=0?i-1:i+n/2)*2},addVertex:function(e,n,i){const r=this.vertices,s=this.object.geometry.vertices;s.push(r[e+0],r[e+1],r[e+2]),s.push(r[n+0],r[n+1],r[n+2]),s.push(r[i+0],r[i+1],r[i+2])},addVertexPoint:function(e){const n=this.vertices;this.object.geometry.vertices.push(n[e+0],n[e+1],n[e+2])},addVertexLine:function(e){const n=this.vertices;this.object.geometry.vertices.push(n[e+0],n[e+1],n[e+2])},addNormal:function(e,n,i){const r=this.normals,s=this.object.geometry.normals;s.push(r[e+0],r[e+1],r[e+2]),s.push(r[n+0],r[n+1],r[n+2]),s.push(r[i+0],r[i+1],r[i+2])},addFaceNormal:function(e,n,i){const r=this.vertices,s=this.object.geometry.normals;Ff.fromArray(r,e),Al.fromArray(r,n),Of.fromArray(r,i),On.subVectors(Of,Al),Bf.subVectors(Ff,Al),On.cross(Bf),On.normalize(),s.push(On.x,On.y,On.z),s.push(On.x,On.y,On.z),s.push(On.x,On.y,On.z)},addColor:function(e,n,i){const r=this.colors,s=this.object.geometry.colors;r[e]!==void 0&&s.push(r[e+0],r[e+1],r[e+2]),r[n]!==void 0&&s.push(r[n+0],r[n+1],r[n+2]),r[i]!==void 0&&s.push(r[i+0],r[i+1],r[i+2])},addUV:function(e,n,i){const r=this.uvs,s=this.object.geometry.uvs;s.push(r[e+0],r[e+1]),s.push(r[n+0],r[n+1]),s.push(r[i+0],r[i+1])},addDefaultUV:function(){const e=this.object.geometry.uvs;e.push(0,0),e.push(0,0),e.push(0,0)},addUVLine:function(e){const n=this.uvs;this.object.geometry.uvs.push(n[e+0],n[e+1])},addFace:function(e,n,i,r,s,a,o,c,l){const h=this.vertices.length;let d=this.parseVertexIndex(e,h),u=this.parseVertexIndex(n,h),f=this.parseVertexIndex(i,h);if(this.addVertex(d,u,f),this.addColor(d,u,f),o!==void 0&&o!==""){const g=this.normals.length;d=this.parseNormalIndex(o,g),u=this.parseNormalIndex(c,g),f=this.parseNormalIndex(l,g),this.addNormal(d,u,f)}else this.addFaceNormal(d,u,f);if(r!==void 0&&r!==""){const g=this.uvs.length;d=this.parseUVIndex(r,g),u=this.parseUVIndex(s,g),f=this.parseUVIndex(a,g),this.addUV(d,u,f),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(e){this.object.geometry.type="Points";const n=this.vertices.length;for(let i=0,r=e.length;i<r;i++){const s=this.parseVertexIndex(e[i],n);this.addVertexPoint(s),this.addColor(s)}},addLineGeometry:function(e,n){this.object.geometry.type="Line";const i=this.vertices.length,r=this.uvs.length;for(let s=0,a=e.length;s<a;s++)this.addVertexLine(this.parseVertexIndex(e[s],i));for(let s=0,a=n.length;s<a;s++)this.addUVLine(this.parseUVIndex(n[s],r))}};return t.startObject("",!1),t}class HM extends Su{constructor(e){super(e),this.materials=null}load(e,n,i,r){const s=this,a=new V1(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{n(s.parse(o))}catch(c){r?r(c):console.error(c),s.manager.itemError(e)}},i,r)}setMaterials(e){return this.materials=e,this}parse(e){const n=new GM;e.indexOf(`\r
`)!==-1&&(e=e.replace(/\r\n/g,`
`)),e.indexOf(`\\
`)!==-1&&(e=e.replace(/\\\n/g,""));const i=e.split(`
`);let r=[];for(let o=0,c=i.length;o<c;o++){const l=i[o].trimStart();if(l.length===0)continue;const h=l.charAt(0);if(h!=="#")if(h==="v"){const d=l.split(Nf);switch(d[0]){case"v":n.vertices.push(parseFloat(d[1]),parseFloat(d[2]),parseFloat(d[3])),d.length>=7?(Lo.setRGB(parseFloat(d[4]),parseFloat(d[5]),parseFloat(d[6]),wn),n.colors.push(Lo.r,Lo.g,Lo.b)):n.colors.push(void 0,void 0,void 0);break;case"vn":n.normals.push(parseFloat(d[1]),parseFloat(d[2]),parseFloat(d[3]));break;case"vt":n.uvs.push(parseFloat(d[1]),parseFloat(d[2]));break}}else if(h==="f"){const u=l.slice(1).trim().split(Nf),f=[];for(let M=0,m=u.length;M<m;M++){const p=u[M];if(p.length>0){const S=p.split("/");f.push(S)}}const g=f[0];for(let M=1,m=f.length-1;M<m;M++){const p=f[M],S=f[M+1];n.addFace(g[0],p[0],S[0],g[1],p[1],S[1],g[2],p[2],S[2])}}else if(h==="l"){const d=l.substring(1).trim().split(" ");let u=[];const f=[];if(l.indexOf("/")===-1)u=d;else for(let g=0,M=d.length;g<M;g++){const m=d[g].split("/");m[0]!==""&&u.push(m[0]),m[1]!==""&&f.push(m[1])}n.addLineGeometry(u,f)}else if(h==="p"){const u=l.slice(1).trim().split(" ");n.addPointGeometry(u)}else if((r=BM.exec(l))!==null){const d=(" "+r[0].slice(1).trim()).slice(1);n.startObject(d)}else if(zM.test(l))n.object.startMaterial(l.substring(7).trim(),n.materialLibraries);else if(kM.test(l))n.materialLibraries.push(l.substring(7).trim());else if(VM.test(l))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(h==="s"){if(r=l.split(" "),r.length>1){const u=r[1].trim().toLowerCase();n.object.smooth=u!=="0"&&u!=="off"}else n.object.smooth=!0;const d=n.object.currentMaterial();d&&(d.smooth=n.object.smooth)}else{if(l==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+l+'"')}}n.finalize();const s=new Or;if(s.materialLibraries=[].concat(n.materialLibraries),!(n.objects.length===1&&n.objects[0].geometry.vertices.length===0)===!0)for(let o=0,c=n.objects.length;o<c;o++){const l=n.objects[o],h=l.geometry,d=l.materials,u=h.type==="Line",f=h.type==="Points";let g=!1;if(h.vertices.length===0)continue;const M=new Vt;M.setAttribute("position",new wt(h.vertices,3)),h.normals.length>0&&M.setAttribute("normal",new wt(h.normals,3)),h.colors.length>0&&(g=!0,M.setAttribute("color",new wt(h.colors,3))),h.hasUVIndices===!0&&M.setAttribute("uv",new wt(h.uvs,2));const m=[];for(let S=0,T=d.length;S<T;S++){const y=d[S],R=y.name+"_"+y.smooth+"_"+g;let A=n.materials[R];if(this.materials!==null){if(A=this.materials.create(y.name),u&&A&&!(A instanceof ys)){const C=new ys;ji.prototype.copy.call(C,A),C.color.copy(A.color),A=C}else if(f&&A&&!(A instanceof fr)){const C=new fr({size:10,sizeAttenuation:!1});ji.prototype.copy.call(C,A),C.color.copy(A.color),C.map=A.map,A=C}}A===void 0&&(u?A=new ys:f?A=new fr({size:1,sizeAttenuation:!1}):A=new N1,A.name=y.name,A.flatShading=!y.smooth,A.vertexColors=g,n.materials[R]=A),m.push(A)}let p;if(m.length>1){for(let S=0,T=d.length;S<T;S++){const y=d[S];M.addGroup(y.groupStart,y.groupCount,S)}u?p=new ac(M,m):f?p=new Es(M,m):p=new pn(M,m)}else u?p=new ac(M,m[0]):f?p=new Es(M,m[0]):p=new pn(M,m[0]);p.name=l.name,s.add(p)}else if(n.vertices.length>0){const o=new fr({size:1,sizeAttenuation:!1}),c=new Vt;c.setAttribute("position",new wt(n.vertices,3)),n.colors.length>0&&n.colors[0]!==void 0&&(c.setAttribute("color",new wt(n.colors,3)),o.vertexColors=!0);const l=new Es(c,o);s.add(l)}return s}}const WM="/handface/assets/brain-pNXWhVO6.obj";class XM{constructor(){Le(this,"_listeners",new Map)}on(e,n){return this._listeners.has(e)||this._listeners.set(e,new Set),this._listeners.get(e).add(n),this}off(e,n){var i;return(i=this._listeners.get(e))==null||i.delete(n),this}emit(e,n){var i;(i=this._listeners.get(e))==null||i.forEach(r=>r(n))}removeAllListeners(e){return e?this._listeners.delete(e):this._listeners.clear(),this}}var Us=typeof self<"u"?self:{};function zm(t,e){e:{for(var n=["CLOSURE_FLAGS"],i=Us,r=0;r<n.length;r++)if((i=i[n[r]])==null){n=null;break e}n=i}return(t=n&&n[t])!=null?t:e}function Pr(){throw Error("Invalid UTF8")}function kf(t,e){return e=String.fromCharCode.apply(null,e),t==null?e:t+e}let Do,wl;const YM=typeof TextDecoder<"u";let qM;const $M=typeof TextEncoder<"u";function Vm(t){if($M)t=(qM||(qM=new TextEncoder)).encode(t);else{let n=0;const i=new Uint8Array(3*t.length);for(let r=0;r<t.length;r++){var e=t.charCodeAt(r);if(e<128)i[n++]=e;else{if(e<2048)i[n++]=e>>6|192;else{if(e>=55296&&e<=57343){if(e<=56319&&r<t.length){const s=t.charCodeAt(++r);if(s>=56320&&s<=57343){e=1024*(e-55296)+s-56320+65536,i[n++]=e>>18|240,i[n++]=e>>12&63|128,i[n++]=e>>6&63|128,i[n++]=63&e|128;continue}r--}e=65533}i[n++]=e>>12|224,i[n++]=e>>6&63|128}i[n++]=63&e|128}}t=n===i.length?i:i.subarray(0,n)}return t}function Gm(t){Us.setTimeout(()=>{throw t},0)}var Fh,jM=zm(610401301,!1),zf=zm(748402147,!0);function Vf(){var t=Us.navigator;return t&&(t=t.userAgent)?t:""}const Gf=Us.navigator;function vc(t){return vc[" "](t),t}Fh=Gf&&Gf.userAgentData||null,vc[" "]=function(){};const Hm={};let Ra=null;function KM(t){const e=t.length;let n=3*e/4;n%3?n=Math.floor(n):"=.".indexOf(t[e-1])!=-1&&(n="=.".indexOf(t[e-2])!=-1?n-2:n-1);const i=new Uint8Array(n);let r=0;return function(s,a){function o(l){for(;c<s.length;){const h=s.charAt(c++),d=Ra[h];if(d!=null)return d;if(!/^[\s\xa0]*$/.test(h))throw Error("Unknown base64 encoding at char: "+h)}return l}Wm();let c=0;for(;;){const l=o(-1),h=o(0),d=o(64),u=o(64);if(u===64&&l===-1)break;a(l<<2|h>>4),d!=64&&(a(h<<4&240|d>>2),u!=64&&a(d<<6&192|u))}}(t,function(s){i[r++]=s}),r!==n?i.subarray(0,r):i}function Wm(){if(!Ra){Ra={};var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),e=["+/=","+/","-_=","-_.","-_"];for(let n=0;n<5;n++){const i=t.concat(e[n].split(""));Hm[n]=i;for(let r=0;r<i.length;r++){const s=i[r];Ra[s]===void 0&&(Ra[s]=r)}}}}var ZM=typeof Uint8Array<"u",Xm=!(!(jM&&Fh&&Fh.brands.length>0)&&(Vf().indexOf("Trident")!=-1||Vf().indexOf("MSIE")!=-1))&&typeof btoa=="function";const Hf=/[-_.]/g,JM={"-":"+",_:"/",".":"="};function QM(t){return JM[t]||""}function Ym(t){if(!Xm)return KM(t);t=Hf.test(t)?t.replace(Hf,QM):t,t=atob(t);const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}function yu(t){return ZM&&t!=null&&t instanceof Uint8Array}var Ns={};function $r(){return eS||(eS=new bi(null,Ns))}function Eu(t){qm(Ns);var e=t.g;return(e=e==null||yu(e)?e:typeof e=="string"?Ym(e):null)==null?e:t.g=e}var bi=class{h(){return new Uint8Array(Eu(this)||0)}constructor(t,e){if(qm(e),this.g=t,t!=null&&t.length===0)throw Error("ByteString should be constructed with non-empty values")}};let eS,tS;function qm(t){if(t!==Ns)throw Error("illegal external caller")}function $m(t,e){t.__closure__error__context__984382||(t.__closure__error__context__984382={}),t.__closure__error__context__984382.severity=e}function Oh(t){return $m(t=Error(t),"warning"),t}function Fs(t,e){if(t!=null){var n=tS??(tS={}),i=n[t]||0;i>=e||(n[t]=i+1,$m(t=Error(),"incident"),Gm(t))}}function ta(){return typeof BigInt=="function"}var na=typeof Symbol=="function"&&typeof Symbol()=="symbol";function Ci(t,e,n=!1){return typeof Symbol=="function"&&typeof Symbol()=="symbol"?n&&Symbol.for&&t?Symbol.for(t):t!=null?Symbol(t):Symbol():e}var nS=Ci("jas",void 0,!0),Wf=Ci(void 0,"0di"),ya=Ci(void 0,"1oa"),Cn=Ci(void 0,Symbol()),iS=Ci(void 0,"0ub"),rS=Ci(void 0,"0ubs"),Bh=Ci(void 0,"0ubsb"),sS=Ci(void 0,"0actk"),Os=Ci("m_m","Pa",!0),Xf=Ci();const jm={Ga:{value:0,configurable:!0,writable:!0,enumerable:!1}},Km=Object.defineProperties,be=na?nS:"Ga";var Zr;const Yf=[];function qa(t,e){na||be in t||Km(t,jm),t[be]|=e}function Wt(t,e){na||be in t||Km(t,jm),t[be]=e}function $a(t){return qa(t,34),t}function Oa(t){return qa(t,8192),t}Wt(Yf,7),Zr=Object.freeze(Yf);var Bs={};function Ln(t,e){return e===void 0?t.h!==jr&&!!(2&(0|t.v[be])):!!(2&e)&&t.h!==jr}const jr={};function bu(t,e){if(t!=null){if(typeof t=="string")t=t?new bi(t,Ns):$r();else if(t.constructor!==bi)if(yu(t))t=t.length?new bi(new Uint8Array(t),Ns):$r();else{if(!e)throw Error();t=void 0}}return t}class qf{constructor(e,n,i){this.g=e,this.h=n,this.l=i}next(){const e=this.g.next();return e.done||(e.value=this.h.call(this.l,e.value)),e}[Symbol.iterator](){return this}}var aS=Object.freeze({});function Zm(t,e,n){const i=128&e?0:-1,r=t.length;var s;(s=!!r)&&(s=(s=t[r-1])!=null&&typeof s=="object"&&s.constructor===Object);const a=r+(s?-1:0);for(e=128&e?1:0;e<a;e++)n(e-i,t[e]);if(s){t=t[r-1];for(const o in t)!isNaN(o)&&n(+o,t[o])}}var Jm={};function ia(t){return 128&t?Jm:void 0}function xc(t){return t.Na=!0,t}var oS=xc(t=>typeof t=="number"),$f=xc(t=>typeof t=="string"),cS=xc(t=>typeof t=="boolean"),Mc=typeof Us.BigInt=="function"&&typeof Us.BigInt(0)=="bigint";function Pn(t){var e=t;if($f(e)){if(!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(e))throw Error(String(e))}else if(oS(e)&&!Number.isSafeInteger(e))throw Error(String(e));return Mc?BigInt(t):t=cS(t)?t?"1":"0":$f(t)?t.trim()||"0":String(t)}var kh=xc(t=>Mc?t>=hS&&t<=dS:t[0]==="-"?jf(t,lS):jf(t,uS));const lS=Number.MIN_SAFE_INTEGER.toString(),hS=Mc?BigInt(Number.MIN_SAFE_INTEGER):void 0,uS=Number.MAX_SAFE_INTEGER.toString(),dS=Mc?BigInt(Number.MAX_SAFE_INTEGER):void 0;function jf(t,e){if(t.length>e.length)return!1;if(t.length<e.length||t===e)return!0;for(let n=0;n<t.length;n++){const i=t[n],r=e[n];if(i>r)return!1;if(i<r)return!0}}const fS=typeof Uint8Array.prototype.slice=="function";let pS,St=0,Nt=0;function Kf(t){const e=t>>>0;St=e,Nt=(t-e)/4294967296>>>0}function ks(t){if(t<0){Kf(-t);const[e,n]=wu(St,Nt);St=e>>>0,Nt=n>>>0}else Kf(t)}function Tu(t){const e=pS||(pS=new DataView(new ArrayBuffer(8)));e.setFloat32(0,+t,!0),Nt=0,St=e.getUint32(0,!0)}function Qm(t,e){const n=4294967296*e+(t>>>0);return Number.isSafeInteger(n)?n:Ba(t,e)}function mS(t,e){return Pn(ta()?BigInt.asUintN(64,(BigInt(e>>>0)<<BigInt(32))+BigInt(t>>>0)):Ba(t,e))}function e0(t,e){return ta()?Pn(BigInt.asIntN(64,(BigInt.asUintN(32,BigInt(e))<<BigInt(32))+BigInt.asUintN(32,BigInt(t)))):Pn(Au(t,e))}function Ba(t,e){if(t>>>=0,(e>>>=0)<=2097151)var n=""+(4294967296*e+t);else ta()?n=""+(BigInt(e)<<BigInt(32)|BigInt(t)):(t=(16777215&t)+6777216*(n=16777215&(t>>>24|e<<8))+6710656*(e=e>>16&65535),n+=8147497*e,e*=2,t>=1e7&&(n+=t/1e7>>>0,t%=1e7),n>=1e7&&(e+=n/1e7>>>0,n%=1e7),n=e+Zf(n)+Zf(t));return n}function Zf(t){return t=String(t),"0000000".slice(t.length)+t}function Au(t,e){if(2147483648&e)if(ta())t=""+(BigInt(0|e)<<BigInt(32)|BigInt(t>>>0));else{const[n,i]=wu(t,e);t="-"+Ba(n,i)}else t=Ba(t,e);return t}function Sc(t){if(t.length<16)ks(Number(t));else if(ta())t=BigInt(t),St=Number(t&BigInt(4294967295))>>>0,Nt=Number(t>>BigInt(32)&BigInt(4294967295));else{const e=+(t[0]==="-");Nt=St=0;const n=t.length;for(let i=e,r=(n-e)%6+e;r<=n;i=r,r+=6){const s=Number(t.slice(i,r));Nt*=1e6,St=1e6*St+s,St>=4294967296&&(Nt+=Math.trunc(St/4294967296),Nt>>>=0,St>>>=0)}if(e){const[i,r]=wu(St,Nt);St=i,Nt=r}}}function wu(t,e){return e=~e,t?t=1+~t:e+=1,[t,e]}function ai(t){return Array.prototype.slice.call(t)}const ja=typeof BigInt=="function"?BigInt.asIntN:void 0,gS=typeof BigInt=="function"?BigInt.asUintN:void 0,Kr=Number.isSafeInteger,yc=Number.isFinite,zs=Math.trunc,_S=Pn(0);function Ca(t){if(t!=null&&typeof t!="number")throw Error(`Value of float/double field must be a number, found ${typeof t}: ${t}`);return t}function Si(t){return t==null||typeof t=="number"?t:t==="NaN"||t==="Infinity"||t==="-Infinity"?Number(t):void 0}function ka(t){if(t!=null&&typeof t!="boolean"){var e=typeof t;throw Error(`Expected boolean but got ${e!="object"?e:t?Array.isArray(t)?"array":e:"null"}: ${t}`)}return t}function t0(t){return t==null||typeof t=="boolean"?t:typeof t=="number"?!!t:void 0}const vS=/^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;function Ka(t){switch(typeof t){case"bigint":return!0;case"number":return yc(t);case"string":return vS.test(t);default:return!1}}function ra(t){if(t==null)return t;if(typeof t=="string"&&t)t=+t;else if(typeof t!="number")return;return yc(t)?0|t:void 0}function n0(t){if(t==null)return t;if(typeof t=="string"&&t)t=+t;else if(typeof t!="number")return;return yc(t)?t>>>0:void 0}function i0(t){const e=t.length;return(t[0]==="-"?e<20||e===20&&t<="-9223372036854775808":e<19||e===19&&t<="9223372036854775807")?t:(Sc(t),Au(St,Nt))}function Ru(t){if(t=zs(t),!Kr(t)){ks(t);var e=St,n=Nt;(t=2147483648&n)&&(n=~n>>>0,(e=1+~e>>>0)==0&&(n=n+1>>>0)),t=typeof(e=Qm(e,n))=="number"?t?-e:e:t?"-"+e:e}return t}function r0(t){var e=zs(Number(t));return Kr(e)?String(e):((e=t.indexOf("."))!==-1&&(t=t.substring(0,e)),i0(t))}function s0(t){var e=zs(Number(t));return Kr(e)?Pn(e):((e=t.indexOf("."))!==-1&&(t=t.substring(0,e)),ta()?Pn(ja(64,BigInt(t))):Pn(i0(t)))}function a0(t){return Kr(t)?t=Pn(Ru(t)):(t=zs(t),Kr(t)?t=String(t):(ks(t),t=Au(St,Nt)),t=Pn(t)),t}function oc(t){const e=typeof t;return t==null?t:e==="bigint"?Pn(ja(64,t)):Ka(t)?e==="string"?s0(t):a0(t):void 0}function o0(t){if(typeof t!="string")throw Error();return t}function Za(t){if(t!=null&&typeof t!="string")throw Error();return t}function Qt(t){return t==null||typeof t=="string"?t:void 0}function Cu(t,e,n,i){return t!=null&&t[Os]===Bs?t:Array.isArray(t)?((i=(n=0|t[be])|32&i|2&i)!==n&&Wt(t,i),new e(t)):(n?2&i?((t=e[Wf])||($a((t=new e).v),t=e[Wf]=t),e=t):e=new e:e=void 0,e)}function xS(t,e,n){if(e)e:{if(!Ka(e=t))throw Oh("int64");switch(typeof e){case"string":e=s0(e);break e;case"bigint":e=Pn(ja(64,e));break e;default:e=a0(e)}}else e=oc(t);return(t=e)==null?n?_S:void 0:t}const MS={};let SS=function(){try{return vc(new class extends Map{constructor(){super()}}),!1}catch{return!0}}();class Rl{constructor(){this.g=new Map}get(e){return this.g.get(e)}set(e,n){return this.g.set(e,n),this.size=this.g.size,this}delete(e){return e=this.g.delete(e),this.size=this.g.size,e}clear(){this.g.clear(),this.size=this.g.size}has(e){return this.g.has(e)}entries(){return this.g.entries()}keys(){return this.g.keys()}values(){return this.g.values()}forEach(e,n){return this.g.forEach(e,n)}[Symbol.iterator](){return this.entries()}}const yS=SS?(Object.setPrototypeOf(Rl.prototype,Map.prototype),Object.defineProperties(Rl.prototype,{size:{value:0,configurable:!0,enumerable:!0,writable:!0}}),Rl):class extends Map{constructor(){super()}};function Jf(t){return t}function Cl(t){if(2&t.J)throw Error("Cannot mutate an immutable Map")}var Ki=class extends yS{constructor(t,e,n=Jf,i=Jf){super(),this.J=0|t[be],this.K=e,this.S=n,this.fa=this.K?ES:i;for(let r=0;r<t.length;r++){const s=t[r],a=n(s[0],!1,!0);let o=s[1];e?o===void 0&&(o=null):o=i(s[1],!1,!0,void 0,void 0,this.J),super.set(a,o)}}V(t){return Oa(Array.from(super.entries(),t))}clear(){Cl(this),super.clear()}delete(t){return Cl(this),super.delete(this.S(t,!0,!1))}entries(){if(this.K){var t=super.keys();t=new qf(t,bS,this)}else t=super.entries();return t}values(){if(this.K){var t=super.keys();t=new qf(t,Ki.prototype.get,this)}else t=super.values();return t}forEach(t,e){this.K?super.forEach((n,i,r)=>{t.call(e,r.get(i),i,r)}):super.forEach(t,e)}set(t,e){return Cl(this),(t=this.S(t,!0,!1))==null?this:e==null?(super.delete(t),this):super.set(t,this.fa(e,!0,!0,this.K,!1,this.J))}Ma(t){const e=this.S(t[0],!1,!0);t=t[1],t=this.K?t===void 0?null:t:this.fa(t,!1,!0,void 0,!1,this.J),super.set(e,t)}has(t){return super.has(this.S(t,!1,!1))}get(t){t=this.S(t,!1,!1);const e=super.get(t);if(e!==void 0){var n=this.K;return n?((n=this.fa(e,!1,!0,n,this.ra,this.J))!==e&&super.set(t,n),n):e}}[Symbol.iterator](){return this.entries()}};function ES(t,e,n,i,r,s){return t=Cu(t,i,n,s),r&&(t=Lu(t)),t}function bS(t){return[t,this.get(t)]}let TS;function Qf(){return TS||(TS=new Ki($a([]),void 0,void 0,void 0,MS))}function Ec(t){return Cn?t[Cn]:void 0}function cc(t,e){for(const n in t)!isNaN(n)&&e(t,+n,t[n])}Ki.prototype.toJSON=void 0;var zh=class{};const AS={Ka:!0};function wS(t,e){e<100||Fs(rS,1)}function bc(t,e,n,i){const r=i!==void 0;i=!!i;var s,a=Cn;!r&&na&&a&&(s=t[a])&&cc(s,wS),a=[];var o=t.length;let c;s=4294967295;let l=!1;const h=!!(64&e),d=h?128&e?0:-1:void 0;1&e||(c=o&&t[o-1],c!=null&&typeof c=="object"&&c.constructor===Object?s=--o:c=void 0,!h||128&e||r||(l=!0,s=s-d+d)),e=void 0;for(var u=0;u<o;u++){let f=t[u];if(f!=null&&(f=n(f,i))!=null)if(h&&u>=s){const g=u-d;(e??(e={}))[g]=f}else a[u]=f}if(c)for(let f in c){if((o=c[f])==null||(o=n(o,i))==null)continue;let g;u=+f,h&&!Number.isNaN(u)&&(g=u+d)<s?a[g]=o:(e??(e={}))[f]=o}return e&&(l?a.push(e):a[s]=e),r&&Cn&&(t=Ec(t))&&t instanceof zh&&(a[Cn]=function(f){const g=new zh;return cc(f,(M,m,p)=>{g[m]=ai(p)}),g.da=f.da,g}(t)),a}function RS(t){return t[0]=za(t[0]),t[1]=za(t[1]),t}function za(t){switch(typeof t){case"number":return Number.isFinite(t)?t:""+t;case"bigint":return kh(t)?Number(t):""+t;case"boolean":return t?1:0;case"object":if(Array.isArray(t)){var e=0|t[be];return t.length===0&&1&e?void 0:bc(t,e,za)}if(t!=null&&t[Os]===Bs)return c0(t);if(t instanceof bi){if((e=t.g)==null)t="";else if(typeof e=="string")t=e;else{if(Xm){for(var n="",i=0,r=e.length-10240;i<r;)n+=String.fromCharCode.apply(null,e.subarray(i,i+=10240));n+=String.fromCharCode.apply(null,i?e.subarray(i):e),e=btoa(n)}else{n===void 0&&(n=0),Wm(),n=Hm[n],i=Array(Math.floor(e.length/3)),r=n[64]||"";let l=0,h=0;for(;l<e.length-2;l+=3){var s=e[l],a=e[l+1],o=e[l+2],c=n[s>>2];s=n[(3&s)<<4|a>>4],a=n[(15&a)<<2|o>>6],o=n[63&o],i[h++]=c+s+a+o}switch(c=0,o=r,e.length-l){case 2:o=n[(15&(c=e[l+1]))<<2]||r;case 1:e=e[l],i[h]=n[e>>2]+n[(3&e)<<4|c>>4]+o+r}e=i.join("")}t=t.g=e}return t}return t instanceof Ki?t=t.size!==0?t.V(RS):void 0:void 0}return t}let CS,PS;function c0(t){return bc(t=t.v,0|t[be],za)}function zr(t,e){return l0(t,e[0],e[1])}function l0(t,e,n,i=0){if(t==null){var r=32;n?(t=[n],r|=128):t=[],e&&(r=-16760833&r|(1023&e)<<14)}else{if(!Array.isArray(t))throw Error("narr");if(r=0|t[be],zf&&1&r)throw Error("rfarr");if(2048&r&&!(2&r)&&function(){if(zf)throw Error("carr");Fs(sS,5)}(),256&r)throw Error("farr");if(64&r)return(r|i)!==r&&Wt(t,r|i),t;if(n&&(r|=128,n!==t[0]))throw Error("mid");e:{r|=64;var s=(n=t).length;if(s){var a=s-1;const c=n[a];if(c!=null&&typeof c=="object"&&c.constructor===Object){if((a-=e=128&r?0:-1)>=1024)throw Error("pvtlmt");for(var o in c)(s=+o)<a&&(n[s+e]=c[o],delete c[o]);r=-16760833&r|(1023&a)<<14;break e}}if(e){if((o=Math.max(e,s-(128&r?0:-1)))>1024)throw Error("spvt");r=-16760833&r|(1023&o)<<14}}}return Wt(t,64|r|i),t}function LS(t,e){if(typeof t!="object")return t;if(Array.isArray(t)){var n=0|t[be];return t.length===0&&1&n?void 0:ep(t,n,e)}if(t!=null&&t[Os]===Bs)return tp(t);if(t instanceof Ki){if(2&(e=t.J))return t;if(!t.size)return;if(n=$a(t.V()),t.K)for(t=0;t<n.length;t++){const i=n[t];let r=i[1];r=r==null||typeof r!="object"?void 0:r!=null&&r[Os]===Bs?tp(r):Array.isArray(r)?ep(r,0|r[be],!!(32&e)):void 0,i[1]=r}return n}return t instanceof bi?t:void 0}function ep(t,e,n){return 2&e||(!n||4096&e||16&e?t=sa(t,e,!1,n&&!(16&e)):(qa(t,34),4&e&&Object.freeze(t))),t}function Pu(t,e,n){return t=new t.constructor(e),n&&(t.h=jr),t.m=jr,t}function tp(t){const e=t.v,n=0|e[be];return Ln(t,n)?t:Du(t,e,n)?Pu(t,e):sa(e,n)}function sa(t,e,n,i){return i??(i=!!(34&e)),t=bc(t,e,LS,i),i=32,n&&(i|=2),Wt(t,e=16769217&e|i),t}function Lu(t){const e=t.v,n=0|e[be];return Ln(t,n)?Du(t,e,n)?Pu(t,e,!0):new t.constructor(sa(e,n,!1)):t}function aa(t){if(t.h!==jr)return!1;var e=t.v;return qa(e=sa(e,0|e[be]),2048),t.v=e,t.h=void 0,t.m=void 0,!0}function oa(t){if(!aa(t)&&Ln(t,0|t.v[be]))throw Error()}function Jr(t,e){e===void 0&&(e=0|t[be]),32&e&&!(4096&e)&&Wt(t,4096|e)}function Du(t,e,n){return!!(2&n)||!(!(32&n)||4096&n)&&(Wt(e,2|n),t.h=jr,!0)}const h0=Pn(0),cr={};function yt(t,e,n,i,r){if((e=Zi(t.v,e,n,r))!==null||i&&t.m!==jr)return e}function Zi(t,e,n,i){if(e===-1)return null;const r=e+(n?0:-1),s=t.length-1;let a,o;if(!(s<1+(n?0:-1))){if(r>=s)if(a=t[s],a!=null&&typeof a=="object"&&a.constructor===Object)n=a[e],o=!0;else{if(r!==s)return;n=a}else n=t[r];if(i&&n!=null){if((i=i(n))==null)return i;if(!Object.is(i,n))return o?a[e]=i:t[r]=i,i}return n}}function lt(t,e,n,i){oa(t),kt(t=t.v,0|t[be],e,n,i)}function kt(t,e,n,i,r){const s=n+(r?0:-1);var a=t.length-1;if(a>=1+(r?0:-1)&&s>=a){const o=t[a];if(o!=null&&typeof o=="object"&&o.constructor===Object)return o[n]=i,e}return s<=a?(t[s]=i,e):(i!==void 0&&(n>=(a=(e??(e=0|t[be]))>>14&1023||536870912)?i!=null&&(t[a+(r?0:-1)]={[n]:i}):t[s]=i),e)}function Br(){return aS===void 0?2:4}function kr(t,e,n,i,r){let s=t.v,a=0|s[be];i=Ln(t,a)?1:i,r=!!r||i===3,i===2&&aa(t)&&(s=t.v,a=0|s[be]);let o=(t=Iu(s,e))===Zr?7:0|t[be],c=Uu(o,a);var l=!(4&c);if(l){4&c&&(t=ai(t),o=0,c=Gr(c,a),a=kt(s,a,e,t));let h=0,d=0;for(;h<t.length;h++){const u=n(t[h]);u!=null&&(t[d++]=u)}d<h&&(t.length=d),n=-513&(4|c),c=n&=-1025,c&=-4097}return c!==o&&(Wt(t,c),2&c&&Object.freeze(t)),u0(t,c,s,a,e,i,l,r)}function u0(t,e,n,i,r,s,a,o){let c=e;return s===1||s===4&&(2&e||!(16&e)&&32&i)?Vr(e)||((e|=!t.length||a&&!(4096&e)||32&i&&!(4096&e||16&e)?2:256)!==c&&Wt(t,e),Object.freeze(t)):(s===2&&Vr(e)&&(t=ai(t),c=0,e=Gr(e,i),i=kt(n,i,r,t)),Vr(e)||(o||(e|=16),e!==c&&Wt(t,e))),2&e||!(4096&e||16&e)||Jr(n,i),t}function Iu(t,e,n){return t=Zi(t,e,n),Array.isArray(t)?t:Zr}function Uu(t,e){return 2&e&&(t|=2),1|t}function Vr(t){return!!(2&t)&&!!(4&t)||!!(256&t)}function d0(t){return bu(t,!0)}function f0(t){t=ai(t);for(let e=0;e<t.length;e++){const n=t[e]=ai(t[e]);Array.isArray(n[1])&&(n[1]=$a(n[1]))}return Oa(t)}function hr(t,e,n,i){oa(t),kt(t=t.v,0|t[be],e,(i==="0"?Number(n)===0:n===i)?void 0:n)}function ca(t,e,n){if(2&e)throw Error();const i=ia(e);let r=Iu(t,n,i),s=r===Zr?7:0|r[be],a=Uu(s,e);return(2&a||Vr(a)||16&a)&&(a===s||Vr(a)||Wt(r,a),r=ai(r),s=0,a=Gr(a,e),kt(t,e,n,r,i)),a&=-13,a!==s&&Wt(r,a),r}function Pl(t,e){var n=rg;return Fu(Nu(t=t.v),t,void 0,n)===e?e:-1}function Nu(t){if(na)return t[ya]??(t[ya]=new Map);if(ya in t)return t[ya];const e=new Map;return Object.defineProperty(t,ya,{value:e}),e}function p0(t,e,n,i,r){const s=Nu(t),a=Fu(s,t,e,n,r);return a!==i&&(a&&(e=kt(t,e,a,void 0,r)),s.set(n,i)),e}function Fu(t,e,n,i,r){let s=t.get(i);if(s!=null)return s;s=0;for(let a=0;a<i.length;a++){const o=i[a];Zi(e,o,r)!=null&&(s!==0&&(n=kt(e,n,s,void 0,r)),s=o)}return t.set(i,s),s}function Ou(t,e,n){let i=0|t[be];const r=ia(i),s=Zi(t,n,r);let a;if(s!=null&&s[Os]===Bs){if(!Ln(s))return aa(s),s.v;a=s.v}else Array.isArray(s)&&(a=s);if(a){const o=0|a[be];2&o&&(a=sa(a,o))}return a=zr(a,e),a!==s&&kt(t,i,n,a,r),a}function m0(t,e,n,i,r){let s=!1;if((i=Zi(t,i,r,a=>{const o=Cu(a,n,!1,e);return s=o!==a&&o!=null,o}))!=null)return s&&!Ln(i)&&Jr(t,e),i}function et(t,e,n,i){let r=t.v,s=0|r[be];if((e=m0(r,s,e,n,i))==null)return e;if(s=0|r[be],!Ln(t,s)){const a=Lu(e);a!==e&&(aa(t)&&(r=t.v,s=0|r[be]),s=kt(r,s,n,e=a,i),Jr(r,s))}return e}function g0(t,e,n,i,r,s,a,o){var c=Ln(t,n);s=c?1:s,a=!!a||s===3,c=o&&!c,(s===2||c)&&aa(t)&&(n=0|(e=t.v)[be]);var l=(t=Iu(e,r))===Zr?7:0|t[be],h=Uu(l,n);if(o=!(4&h)){var d=t,u=n;const f=!!(2&h);f&&(u|=2);let g=!f,M=!0,m=0,p=0;for(;m<d.length;m++){const S=Cu(d[m],i,!1,u);if(S instanceof i){if(!f){const T=Ln(S);g&&(g=!T),M&&(M=T)}d[p++]=S}}p<m&&(d.length=p),h|=4,h=M?-4097&h:4096|h,h=g?8|h:-9&h}if(h!==l&&(Wt(t,h),2&h&&Object.freeze(t)),c&&!(8&h||!t.length&&(s===1||s===4&&(2&h||!(16&h)&&32&n)))){for(Vr(h)&&(t=ai(t),h=Gr(h,n),n=kt(e,n,r,t)),i=t,c=h,l=0;l<i.length;l++)(d=i[l])!==(h=Lu(d))&&(i[l]=h);c|=8,Wt(t,h=c=i.length?4096|c:-4097&c)}return u0(t,h,e,n,r,s,o,a)}function Ji(t,e,n){const i=t.v;return g0(t,i,0|i[be],e,n,Br(),!1,!0)}function _0(t){return t==null&&(t=void 0),t}function De(t,e,n,i,r){return lt(t,n,i=_0(i),r),i&&!Ln(i)&&Jr(t.v),t}function Pa(t,e,n,i){e:{var r=i=_0(i);oa(t);const s=t.v;let a=0|s[be];if(r==null){const o=Nu(s);if(Fu(o,s,a,n)!==e)break e;o.set(n,0)}else a=p0(s,a,n,e);kt(s,a,e,r)}i&&!Ln(i)&&Jr(t.v)}function Gr(t,e){return-273&(2&e?2|t:-3&t)}function Bu(t,e,n,i){var r=i;oa(t),t=g0(t,i=t.v,0|i[be],n,e,2,!0),r=r??new n,t.push(r),e=n=t===Zr?7:0|t[be],(r=Ln(r))?(n&=-9,t.length===1&&(n&=-4097)):n|=4096,n!==e&&Wt(t,n),r||Jr(i)}function Yn(t,e,n){return ra(yt(t,e,void 0,n))}function Lt(t,e){return yt(t,e,void 0,void 0,Si)??0}function Qi(t,e,n){if(n!=null){if(typeof n!="number"||!yc(n))throw Oh("int32");n|=0}lt(t,e,n)}function Ce(t,e,n){lt(t,e,Ca(n))}function Dn(t,e,n){hr(t,e,Za(n),"")}function lc(t,e,n){{oa(t);const a=t.v;let o=0|a[be];if(n==null)kt(a,o,e);else{var i=t=n===Zr?7:0|n[be],r=Vr(t),s=r||Object.isFrozen(n);for(r||(t=0),s||(n=ai(n),i=0,t=Gr(t,o),s=!1),t|=5,t|=(4&t?512&t?512:1024&t?1024:0:void 0)??1024,r=0;r<n.length;r++){const c=n[r],l=o0(c);Object.is(c,l)||(s&&(n=ai(n),i=0,t=Gr(t,o),s=!1),n[r]=l)}t!==i&&(s&&(n=ai(n),t=Gr(t,o)),Wt(n,t)),kt(a,o,e,n)}}}function Tc(t,e,n){oa(t),kr(t,e,Qt,2,!0).push(o0(n))}var gs=class{constructor(t,e,n){if(this.buffer=t,n&&!e)throw Error();this.g=e}};function ku(t,e){if(typeof t=="string")return new gs(Ym(t),e);if(Array.isArray(t))return new gs(new Uint8Array(t),e);if(t.constructor===Uint8Array)return new gs(t,!1);if(t.constructor===ArrayBuffer)return t=new Uint8Array(t),new gs(t,!1);if(t.constructor===bi)return e=Eu(t)||new Uint8Array(0),new gs(e,!0,t);if(t instanceof Uint8Array)return t=t.constructor===Uint8Array?t:new Uint8Array(t.buffer,t.byteOffset,t.byteLength),new gs(t,!1);throw Error()}function zu(t,e){let n,i=0,r=0,s=0;const a=t.h;let o=t.g;do n=a[o++],i|=(127&n)<<s,s+=7;while(s<32&&128&n);if(s>32)for(r|=(127&n)>>4,s=3;s<32&&128&n;s+=7)n=a[o++],r|=(127&n)<<s;if(Hr(t,o),!(128&n))return e(i>>>0,r>>>0);throw Error()}function Vu(t){let e=0,n=t.g;const i=n+10,r=t.h;for(;n<i;){const s=r[n++];if(e|=s,(128&s)==0)return Hr(t,n),!!(127&e)}throw Error()}function vr(t){const e=t.h;let n=t.g,i=e[n++],r=127&i;if(128&i&&(i=e[n++],r|=(127&i)<<7,128&i&&(i=e[n++],r|=(127&i)<<14,128&i&&(i=e[n++],r|=(127&i)<<21,128&i&&(i=e[n++],r|=i<<28,128&i&&128&e[n++]&&128&e[n++]&&128&e[n++]&&128&e[n++]&&128&e[n++])))))throw Error();return Hr(t,n),r}function Ri(t){return vr(t)>>>0}function hc(t){var e=t.h;const n=t.g;var i=e[n],r=e[n+1];const s=e[n+2];return e=e[n+3],Hr(t,t.g+4),t=2*((r=(i<<0|r<<8|s<<16|e<<24)>>>0)>>31)+1,i=r>>>23&255,r&=8388607,i==255?r?NaN:t*(1/0):i==0?1401298464324817e-60*t*r:t*Math.pow(2,i-150)*(r+8388608)}function DS(t){return vr(t)}function Hr(t,e){if(t.g=e,e>t.l)throw Error()}function v0(t,e){if(e<0)throw Error();const n=t.g;if((e=n+e)>t.l)throw Error();return t.g=e,n}function x0(t,e){if(e==0)return $r();var n=v0(t,e);return t.Y&&t.j?n=t.h.subarray(n,n+e):(t=t.h,n=n===(e=n+e)?new Uint8Array(0):fS?t.slice(n,e):new Uint8Array(t.subarray(n,e))),n.length==0?$r():new bi(n,Ns)}var np=[];function M0(t,e,n,i){if(uc.length){const r=uc.pop();return r.o(i),r.g.init(t,e,n,i),r}return new IS(t,e,n,i)}function S0(t){t.g.clear(),t.l=-1,t.h=-1,uc.length<100&&uc.push(t)}function y0(t){var e=t.g;if(e.g==e.l)return!1;t.m=t.g.g;var n=Ri(t.g);if(e=n>>>3,!((n&=7)>=0&&n<=5)||e<1)throw Error();return t.l=e,t.h=n,!0}function qo(t){switch(t.h){case 0:t.h!=0?qo(t):Vu(t.g);break;case 1:Hr(t=t.g,t.g+8);break;case 2:if(t.h!=2)qo(t);else{var e=Ri(t.g);Hr(t=t.g,t.g+e)}break;case 5:Hr(t=t.g,t.g+4);break;case 3:for(e=t.l;;){if(!y0(t))throw Error();if(t.h==4){if(t.l!=e)throw Error();break}qo(t)}break;default:throw Error()}}function Ja(t,e,n){const i=t.g.l;var r=Ri(t.g);let s=(r=t.g.g+r)-i;if(s<=0&&(t.g.l=r,n(e,t,void 0,void 0,void 0),s=r-t.g.g),s)throw Error();return t.g.g=r,t.g.l=i,e}function Gu(t){var e=Ri(t.g),n=v0(t=t.g,e);if(t=t.h,YM){var i,r=t;(i=wl)||(i=wl=new TextDecoder("utf-8",{fatal:!0})),e=n+e,r=n===0&&e===r.length?r:r.subarray(n,e);try{var s=i.decode(r)}catch(o){if(Do===void 0){try{i.decode(new Uint8Array([128]))}catch{}try{i.decode(new Uint8Array([97])),Do=!0}catch{Do=!1}}throw!Do&&(wl=void 0),o}}else{e=(s=n)+e,n=[];let o,c=null;for(;s<e;){var a=t[s++];a<128?n.push(a):a<224?s>=e?Pr():(o=t[s++],a<194||(192&o)!=128?(s--,Pr()):n.push((31&a)<<6|63&o)):a<240?s>=e-1?Pr():(o=t[s++],(192&o)!=128||a===224&&o<160||a===237&&o>=160||(192&(i=t[s++]))!=128?(s--,Pr()):n.push((15&a)<<12|(63&o)<<6|63&i)):a<=244?s>=e-2?Pr():(o=t[s++],(192&o)!=128||o-144+(a<<28)>>30||(192&(i=t[s++]))!=128||(192&(r=t[s++]))!=128?(s--,Pr()):(a=(7&a)<<18|(63&o)<<12|(63&i)<<6|63&r,a-=65536,n.push(55296+(a>>10&1023),56320+(1023&a)))):Pr(),n.length>=8192&&(c=kf(c,n),n.length=0)}s=kf(c,n)}return s}function E0(t){const e=Ri(t.g);return x0(t.g,e)}function Ac(t,e,n){var i=Ri(t.g);for(i=t.g.g+i;t.g.g<i;)n.push(e(t.g))}var IS=class{constructor(t,e,n,i){if(np.length){const r=np.pop();r.init(t,e,n,i),t=r}else t=new class{constructor(r,s,a,o){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.init(r,s,a,o)}init(r,s,a,{Y:o=!1,ea:c=!1}={}){this.Y=o,this.ea=c,r&&(r=ku(r,this.ea),this.h=r.buffer,this.j=r.g,this.m=s||0,this.l=a!==void 0?this.m+a:this.h.length,this.g=this.m)}clear(){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.Y=!1}}(t,e,n,i);this.g=t,this.m=this.g.g,this.h=this.l=-1,this.o(i)}o({ha:t=!1}={}){this.ha=t}},uc=[];function ip(t){return t?/^\d+$/.test(t)?(Sc(t),new Vh(St,Nt)):null:US||(US=new Vh(0,0))}var Vh=class{constructor(t,e){this.h=t>>>0,this.g=e>>>0}};let US;function rp(t){return t?/^-?\d+$/.test(t)?(Sc(t),new Gh(St,Nt)):null:NS||(NS=new Gh(0,0))}var Gh=class{constructor(t,e){this.h=t>>>0,this.g=e>>>0}};let NS;function bs(t,e,n){for(;n>0||e>127;)t.g.push(127&e|128),e=(e>>>7|n<<25)>>>0,n>>>=7;t.g.push(e)}function la(t,e){for(;e>127;)t.g.push(127&e|128),e>>>=7;t.g.push(e)}function wc(t,e){if(e>=0)la(t,e);else{for(let n=0;n<9;n++)t.g.push(127&e|128),e>>=7;t.g.push(1)}}function Hu(t){var e=St;t.g.push(e>>>0&255),t.g.push(e>>>8&255),t.g.push(e>>>16&255),t.g.push(e>>>24&255)}function Vs(t,e){e.length!==0&&(t.l.push(e),t.h+=e.length)}function $n(t,e,n){la(t.g,8*e+n)}function Wu(t,e){return $n(t,e,2),e=t.g.end(),Vs(t,e),e.push(t.h),e}function Xu(t,e){var n=e.pop();for(n=t.h+t.g.length()-n;n>127;)e.push(127&n|128),n>>>=7,t.h++;e.push(n),t.h++}function Rc(t,e,n){$n(t,e,2),la(t.g,n.length),Vs(t,t.g.end()),Vs(t,n)}function dc(t,e,n,i){n!=null&&(e=Wu(t,e),i(n,t),Xu(t,e))}function Pi(){const t=class{constructor(){throw Error()}};return Object.setPrototypeOf(t,t.prototype),t}var Yu=Pi(),b0=Pi(),qu=Pi(),$u=Pi(),ju=Pi(),T0=Pi(),FS=Pi(),Cc=Pi(),A0=Pi(),w0=Pi();function Li(t,e,n){var i=t.v;Cn&&Cn in i&&(i=i[Cn])&&delete i[e.g],e.h?e.j(t,e.h,e.g,n,e.l):e.j(t,e.g,n,e.l)}var Te=class{constructor(t,e){this.v=l0(t,e,void 0,2048)}toJSON(){return c0(this)}j(){var r;var t=_y,e=this.v,n=t.g,i=Cn;if(na&&i&&((r=e[i])==null?void 0:r[n])!=null&&Fs(iS,3),e=t.g,Xf&&Cn&&Xf===void 0&&(i=(n=this.v)[Cn])&&(i=i.da))try{i(n,e,AS)}catch(s){Gm(s)}return t.h?t.m(this,t.h,t.g,t.l):t.m(this,t.g,t.defaultValue,t.l)}clone(){const t=this.v,e=0|t[be];return Du(this,t,e)?Pu(this,t,!0):new this.constructor(sa(t,e,!1))}};Te.prototype[Os]=Bs,Te.prototype.toString=function(){return this.v.toString()};var ha=class{constructor(t,e,n){this.g=t,this.h=e,t=Yu,this.l=!!t&&n===t||!1}};function Pc(t,e){return new ha(t,e,Yu)}function R0(t,e,n,i,r){dc(t,n,D0(e,i),r)}const OS=Pc(function(t,e,n,i,r){return t.h===2&&(Ja(t,Ou(e,i,n),r),!0)},R0),BS=Pc(function(t,e,n,i,r){return t.h===2&&(Ja(t,Ou(e,i,n),r),!0)},R0);var Lc=Symbol(),Dc=Symbol(),Hh=Symbol(),sp=Symbol(),ap=Symbol();let C0,P0;function Qr(t,e,n,i){var r=i[t];if(r)return r;(r={}).qa=i,r.T=function(d){switch(typeof d){case"boolean":return CS||(CS=[0,void 0,!0]);case"number":return d>0?void 0:d===0?PS||(PS=[0,void 0]):[-d,void 0];case"string":return[0,d];case"object":return d}}(i[0]);var s=i[1];let a=1;s&&s.constructor===Object&&(r.ba=s,typeof(s=i[++a])=="function"&&(r.ma=!0,C0??(C0=s),P0??(P0=i[a+1]),s=i[a+=2]));const o={};for(;s&&Array.isArray(s)&&s.length&&typeof s[0]=="number"&&s[0]>0;){for(var c=0;c<s.length;c++)o[s[c]]=s;s=i[++a]}for(c=1;s!==void 0;){let d;typeof s=="number"&&(c+=s,s=i[++a]);var l=void 0;if(s instanceof ha?d=s:(d=OS,a--),d==null?void 0:d.l){s=i[++a],l=i;var h=a;typeof s=="function"&&(s=s(),l[h]=s),l=s}for(h=c+1,typeof(s=i[++a])=="number"&&s<0&&(h-=s,s=i[++a]);c<h;c++){const u=o[c];l?n(r,c,d,l,u):e(r,c,d,u)}}return i[t]=r}function L0(t){return Array.isArray(t)?t[0]instanceof ha?t:[BS,t]:[t,void 0]}function D0(t,e){return t instanceof Te?t.v:Array.isArray(t)?zr(t,e):void 0}function Ku(t,e,n,i){const r=n.g;t[e]=i?(s,a,o)=>r(s,a,o,i):r}function Zu(t,e,n,i,r){const s=n.g;let a,o;t[e]=(c,l,h)=>s(c,l,h,o||(o=Qr(Dc,Ku,Zu,i).T),a||(a=Ju(i)),r)}function Ju(t){let e=t[Hh];if(e!=null)return e;const n=Qr(Dc,Ku,Zu,t);return e=n.ma?(i,r)=>C0(i,r,n):(i,r)=>{for(;y0(r)&&r.h!=4;){var s=r.l,a=n[s];if(a==null){var o=n.ba;o&&(o=o[s])&&(o=zS(o))!=null&&(a=n[s]=o)}if(a==null||!a(r,i,s)){if(a=(o=r).m,qo(o),o.ha)var c=void 0;else c=o.g.g-a,o.g.g=a,c=x0(o.g,c);a=void 0,o=i,c&&((a=o[Cn]??(o[Cn]=new zh))[s]??(a[s]=[])).push(c)}}return(i=Ec(i))&&(i.da=n.qa[ap]),!0},t[Hh]=e,t[ap]=kS.bind(t),e}function kS(t,e,n,i){var r=this[Dc];const s=this[Hh],a=zr(void 0,r.T),o=Ec(t);if(o){var c=!1,l=r.ba;if(l){if(r=(h,d,u)=>{if(u.length!==0)if(l[d])for(const f of u){h=M0(f);try{c=!0,s(a,h)}finally{S0(h)}}else i==null||i(t,d,u)},e==null)cc(o,r);else if(o!=null){const h=o[e];h&&r(o,e,h)}if(c){let h=0|t[be];if(2&h&&2048&h&&!(n!=null&&n.Ka))throw Error();const d=ia(h),u=(f,g)=>{if(Zi(t,f,d)!=null){if((n==null?void 0:n.Qa)===1)return;throw Error()}g!=null&&(h=kt(t,h,f,g,d)),delete o[f]};e==null?Zm(a,0|a[be],(f,g)=>{u(f,g)}):u(e,Zi(a,e,d))}}}}function zS(t){const e=(t=L0(t))[0].g;if(t=t[1]){const n=Ju(t),i=Qr(Dc,Ku,Zu,t).T;return(r,s,a)=>e(r,s,a,i,n)}return e}function Ic(t,e,n){t[e]=n.h}function Uc(t,e,n,i){let r,s;const a=n.h;t[e]=(o,c,l)=>a(o,c,l,s||(s=Qr(Lc,Ic,Uc,i).T),r||(r=I0(i)))}function I0(t){let e=t[sp];if(!e){const n=Qr(Lc,Ic,Uc,t);e=(i,r)=>U0(i,r,n),t[sp]=e}return e}function U0(t,e,n){Zm(t,0|t[be],(i,r)=>{if(r!=null){var s=function(a,o){var c=a[o];if(c)return c;if((c=a.ba)&&(c=c[o])){var l=(c=L0(c))[0].h;if(c=c[1]){const h=I0(c),d=Qr(Lc,Ic,Uc,c).T;c=a.ma?P0(d,h):(u,f,g)=>l(u,f,g,d,h)}else c=l;return a[o]=c}}(n,i);s?s(e,r,i):i<500||Fs(Bh,3)}}),(t=Ec(t))&&cc(t,(i,r,s)=>{for(Vs(e,e.g.end()),i=0;i<s.length;i++)Vs(e,Eu(s[i])||new Uint8Array(0))})}const VS=Pn(0);function ua(t,e){if(Array.isArray(e)){var n=0|e[be];if(4&n)return e;for(var i=0,r=0;i<e.length;i++){const s=t(e[i]);s!=null&&(e[r++]=s)}return r<i&&(e.length=r),(t=-1537&(5|n))!==n&&Wt(e,t),2&t&&Object.freeze(e),e}}function ln(t,e,n){return new ha(t,e,n)}function da(t,e,n){return new ha(t,e,n)}function hn(t,e,n){kt(t,0|t[be],e,n,ia(0|t[be]))}var GS=Pc(function(t,e,n,i,r){if(t.h!==2)return!1;if(t=ai(t=Ja(t,zr([void 0,void 0],i),r)),r=ia(i=0|e[be]),2&i)throw Error();let s=Zi(e,n,r);if(s instanceof Ki)2&s.J?(s=s.V(),s.push(t),kt(e,i,n,s,r)):s.Ma(t);else if(Array.isArray(s)){var a=0|s[be];8192&a||Wt(s,a|=8192),2&a&&(s=f0(s),kt(e,i,n,s,r)),s.push(t)}else kt(e,i,n,Oa([t]),r);return!0},function(t,e,n,i,r){if(e instanceof Ki)e.forEach((s,a)=>{dc(t,n,zr([a,s],i),r)});else if(Array.isArray(e)){for(let s=0;s<e.length;s++){const a=e[s];Array.isArray(a)&&dc(t,n,zr(a,i),r)}Oa(e)}});function N0(t,e,n){(e=Si(e))!=null&&($n(t,n,5),t=t.g,Tu(e),Hu(t))}function F0(t,e,n){if(e=function(i){if(i==null)return i;const r=typeof i;if(r==="bigint")return String(ja(64,i));if(Ka(i)){if(r==="string")return r0(i);if(r==="number")return Ru(i)}}(e),e!=null&&(typeof e=="string"&&rp(e),e!=null))switch($n(t,n,0),typeof e){case"number":t=t.g,ks(e),bs(t,St,Nt);break;case"bigint":n=BigInt.asUintN(64,e),n=new Gh(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),bs(t.g,n.h,n.g);break;default:n=rp(e),bs(t.g,n.h,n.g)}}function O0(t,e,n){(e=ra(e))!=null&&e!=null&&($n(t,n,0),wc(t.g,e))}function B0(t,e,n){(e=t0(e))!=null&&($n(t,n,0),t.g.g.push(e?1:0))}function k0(t,e,n){(e=Qt(e))!=null&&Rc(t,n,Vm(e))}function z0(t,e,n,i,r){dc(t,n,D0(e,i),r)}function V0(t,e,n){(e=e==null||typeof e=="string"||e instanceof bi?e:void 0)!=null&&Rc(t,n,ku(e,!0).buffer)}function G0(t,e,n){(e=n0(e))!=null&&e!=null&&($n(t,n,0),la(t.g,e))}function H0(t,e,n){return(t.h===5||t.h===2)&&(e=ca(e,0|e[be],n),t.h==2?Ac(t,hc,e):e.push(hc(t.g)),!0)}var Ft=ln(function(t,e,n){return t.h===5&&(hn(e,n,hc(t.g)),!0)},N0,Cc),HS=da(H0,function(t,e,n){if((e=ua(Si,e))!=null)for(let a=0;a<e.length;a++){var i=t,r=n,s=e[a];s!=null&&($n(i,r,5),i=i.g,Tu(s),Hu(i))}},Cc),Qu=da(H0,function(t,e,n){if((e=ua(Si,e))!=null&&e.length){$n(t,n,2),la(t.g,4*e.length);for(let i=0;i<e.length;i++)n=t.g,Tu(e[i]),Hu(n)}},Cc),WS=ln(function(t,e,n){return t.h===5&&(hn(e,n,(t=hc(t.g))===0?void 0:t),!0)},N0,Cc),xr=ln(function(t,e,n){return t.h!==0?t=!1:(hn(e,n,zu(t.g,e0)),t=!0),t},F0,T0),Ll=ln(function(t,e,n){return t.h!==0?e=!1:(hn(e,n,(t=zu(t.g,e0))===VS?void 0:t),e=!0),e},F0,T0),XS=ln(function(t,e,n){return t.h!==0?t=!1:(hn(e,n,zu(t.g,mS)),t=!0),t},function(t,e,n){if(e=function(i){if(i==null)return i;var r=typeof i;if(r==="bigint")return String(gS(64,i));if(Ka(i)){if(r==="string")return r=zs(Number(i)),Kr(r)&&r>=0?i=String(r):((r=i.indexOf("."))!==-1&&(i=i.substring(0,r)),(r=i[0]!=="-"&&((r=i.length)<20||r===20&&i<="18446744073709551615"))||(Sc(i),i=Ba(St,Nt))),i;if(r==="number")return(i=zs(i))>=0&&Kr(i)||(ks(i),i=Qm(St,Nt)),i}}(e),e!=null&&(typeof e=="string"&&ip(e),e!=null))switch($n(t,n,0),typeof e){case"number":t=t.g,ks(e),bs(t,St,Nt);break;case"bigint":n=BigInt.asUintN(64,e),n=new Vh(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),bs(t.g,n.h,n.g);break;default:n=ip(e),bs(t.g,n.h,n.g)}},FS),Bt=ln(function(t,e,n){return t.h===0&&(hn(e,n,vr(t.g)),!0)},O0,$u),Qa=da(function(t,e,n){return(t.h===0||t.h===2)&&(e=ca(e,0|e[be],n),t.h==2?Ac(t,vr,e):e.push(vr(t.g)),!0)},function(t,e,n){if((e=ua(ra,e))!=null&&e.length){n=Wu(t,n);for(let i=0;i<e.length;i++)wc(t.g,e[i]);Xu(t,n)}},$u),xs=ln(function(t,e,n){return t.h===0&&(hn(e,n,(t=vr(t.g))===0?void 0:t),!0)},O0,$u),Et=ln(function(t,e,n){return t.h===0&&(hn(e,n,Vu(t.g)),!0)},B0,b0),Wr=ln(function(t,e,n){return t.h===0&&(hn(e,n,(t=Vu(t.g))===!1?void 0:t),!0)},B0,b0),rn=da(function(t,e,n){return t.h===2&&(t=Gu(t),ca(e,0|e[be],n).push(t),!0)},function(t,e,n){if((e=ua(Qt,e))!=null)for(let a=0;a<e.length;a++){var i=t,r=n,s=e[a];s!=null&&Rc(i,r,Vm(s))}},qu),dr=ln(function(t,e,n){return t.h===2&&(hn(e,n,(t=Gu(t))===""?void 0:t),!0)},k0,qu),dt=ln(function(t,e,n){return t.h===2&&(hn(e,n,Gu(t)),!0)},k0,qu),jt=function(t,e,n=Yu){return new ha(t,e,n)}(function(t,e,n,i,r){return t.h===2&&(i=zr(void 0,i),ca(e,0|e[be],n).push(i),Ja(t,i,r),!0)},function(t,e,n,i,r){if(Array.isArray(e)){for(let s=0;s<e.length;s++)z0(t,e[s],n,i,r);1&(t=0|e[be])||Wt(e,1|t)}}),vt=Pc(function(t,e,n,i,r,s){if(t.h!==2)return!1;let a=0|e[be];return p0(e,a,s,n,ia(a)),Ja(t,e=Ou(e,i,n),r),!0},z0),W0=ln(function(t,e,n){return t.h===2&&(hn(e,n,E0(t)),!0)},V0,A0),YS=da(function(t,e,n){return(t.h===0||t.h===2)&&(e=ca(e,0|e[be],n),t.h==2?Ac(t,Ri,e):e.push(Ri(t.g)),!0)},function(t,e,n){if((e=ua(n0,e))!=null)for(let a=0;a<e.length;a++){var i=t,r=n,s=e[a];s!=null&&($n(i,r,0),la(i.g,s))}},ju),qS=ln(function(t,e,n){return t.h===0&&(hn(e,n,(t=Ri(t.g))===0?void 0:t),!0)},G0,ju),on=ln(function(t,e,n){return t.h===0&&(hn(e,n,vr(t.g)),!0)},function(t,e,n){(e=ra(e))!=null&&(e=parseInt(e,10),$n(t,n,0),wc(t.g,e))},w0);class $S{constructor(e,n){var i=Un;this.g=e,this.h=n,this.m=et,this.j=De,this.defaultValue=void 0,this.l=i.Oa!=null?Jm:void 0}register(){vc(this)}}function Di(t,e){return new $S(t,e)}function Sr(t,e){return(n,i)=>{{const s={ea:!0};i&&Object.assign(s,i),n=M0(n,void 0,void 0,s);try{const a=new t,o=a.v;Ju(e)(o,n);var r=a}finally{S0(n)}}return r}}function Nc(t){return function(){const e=new class{constructor(){this.l=[],this.h=0,this.g=new class{constructor(){this.g=[]}length(){return this.g.length}end(){const a=this.g;return this.g=[],a}}}};U0(this.v,e,Qr(Lc,Ic,Uc,t)),Vs(e,e.g.end());const n=new Uint8Array(e.h),i=e.l,r=i.length;let s=0;for(let a=0;a<r;a++){const o=i[a];n.set(o,s),s+=o.length}return e.l=[n],n}}var op=class extends Te{constructor(t){super(t)}},cp=[0,dr,ln(function(t,e,n){return t.h===2&&(hn(e,n,(t=E0(t))===$r()?void 0:t),!0)},function(t,e,n){if(e!=null){if(e instanceof Te){const i=e.Ra;return void(i?(e=i(e),e!=null&&Rc(t,n,ku(e,!0).buffer)):Fs(Bh,3))}if(Array.isArray(e))return void Fs(Bh,3)}V0(t,e,n)},A0)];let Dl,lp=globalThis.trustedTypes;function hp(t){var e;return Dl===void 0&&(Dl=function(){let n=null;if(!lp)return n;try{const i=r=>r;n=lp.createPolicy("goog#html",{createHTML:i,createScript:i,createScriptURL:i})}catch{}return n}()),t=(e=Dl)?e.createScriptURL(t):t,new class{constructor(n){this.g=n}toString(){return this.g+""}}(t)}function Io(t,...e){if(e.length===0)return hp(t[0]);let n=t[0];for(let i=0;i<e.length;i++)n+=encodeURIComponent(e[i])+t[i+1];return hp(n)}var X0=[0,Bt,on,Et,-1,Qa,on,-1,Et],jS=class extends Te{constructor(t){super(t)}},Y0=[0,Et,dt,Et,on,-1,da(function(t,e,n){return(t.h===0||t.h===2)&&(e=ca(e,0|e[be],n),t.h==2?Ac(t,DS,e):e.push(vr(t.g)),!0)},function(t,e,n){if((e=ua(ra,e))!=null&&e.length){n=Wu(t,n);for(let i=0;i<e.length;i++)wc(t.g,e[i]);Xu(t,n)}},w0),dt,-1,[0,Et,-1],on,Et,-1],q0=[0,3,Et,-1,2,[0,[2],Bt,vt,[0,ln(function(t,e,n){return t.h===0&&(hn(e,n,Ri(t.g)),!0)},G0,ju)]],[0,on,Et,on,Et,on,Et,dt,-1],[0,[3,4],dt,-1,vt,[0,Bt],vt,[0,on]],[0]],$0=[0,dt,-2],up=class extends Te{constructor(t){super(t)}},j0=[0],K0=[0,Bt,Et,1,Et,-4],Un=class extends Te{constructor(t){super(t,2)}},zt={};zt[336783863]=[0,dt,Et,-1,Bt,[0,[1,2,3,4,5,6,7,8,9],vt,j0,vt,Y0,vt,$0,vt,K0,vt,X0,vt,[0,dt,-2],vt,[0,dt,on],vt,q0,vt,[0,on,-1,Et]],[0,dt],Et,[0,[1,3],[2,4],vt,[0,Qa],-1,vt,[0,rn],-1,jt,[0,dt,-1]],dt];var dp=[0,Ll,-1,Wr,-3,Ll,Qa,dr,xs,Ll,-1,Wr,xs,Wr,-2,dr];function xt(t,e){Tc(t,3,e)}function $e(t,e){Tc(t,4,e)}var xn=class extends Te{constructor(t){super(t,500)}o(t){return De(this,0,7,t)}},La=[-1,{}],fp=[0,dt,1,La],pp=[0,dt,rn,La];function jn(t,e){Bu(t,1,xn,e)}function Tt(t,e){Tc(t,10,e)}function tt(t,e){Tc(t,15,e)}var Nn=class extends Te{constructor(t){super(t,500)}o(t){return De(this,0,1001,t)}},Z0=[-500,jt,[-500,dr,-1,rn,-3,[-2,zt,Et],jt,cp,xs,-1,fp,pp,jt,[0,dr,Wr],dr,dp,xs,rn,987,rn],4,jt,[-500,dt,-1,[-1,{}],998,dt],jt,[-500,dt,rn,-1,[-2,{},Et],997,rn,-1],xs,jt,[-500,dt,rn,La,998,rn],rn,xs,fp,pp,jt,[0,dr,-1,La],rn,-2,dp,dr,-1,Wr,[0,Wr,qS],978,La,jt,cp];Nn.prototype.g=Nc(Z0);var KS=Sr(Nn,Z0),ZS=class extends Te{constructor(t){super(t)}},J0=class extends Te{constructor(t){super(t)}g(){return Ji(this,ZS,1)}},Q0=[0,jt,[0,Bt,Ft,dt,-1]],Fc=Sr(J0,Q0),JS=class extends Te{constructor(t){super(t)}},QS=class extends Te{constructor(t){super(t)}},Il=class extends Te{constructor(t){super(t)}l(){return et(this,JS,2)}g(){return Ji(this,QS,5)}},eg=Sr(class extends Te{constructor(t){super(t)}},[0,rn,Qa,Qu,[0,on,[0,Bt,-3],[0,Ft,-3],[0,Bt,-1,[0,jt,[0,Bt,-2]]],jt,[0,Ft,-1,dt,Ft]],dt,-1,xr,jt,[0,Bt,Ft],rn,xr]),tg=class extends Te{constructor(t){super(t)}},Ts=Sr(class extends Te{constructor(t){super(t)}},[0,jt,[0,Ft,-4]]),ng=class extends Te{constructor(t){super(t)}},eo=Sr(class extends Te{constructor(t){super(t)}},[0,jt,[0,Ft,-4]]),ey=class extends Te{constructor(t){super(t)}},ty=[0,Bt,-1,Qu,on],ig=class extends Te{constructor(t){super(t)}};ig.prototype.g=Nc([0,Ft,-4,xr]);var ny=class extends Te{constructor(t){super(t)}},iy=Sr(class extends Te{constructor(t){super(t)}},[0,jt,[0,1,Bt,dt,Q0],xr]),mp=class extends Te{constructor(t){super(t)}},ry=class extends Te{constructor(t){super(t)}na(){const t=yt(this,1,void 0,void 0,d0);return t??$r()}},sy=class extends Te{constructor(t){super(t)}},rg=[1,2],ay=Sr(class extends Te{constructor(t){super(t)}},[0,jt,[0,rg,vt,[0,Qu],vt,[0,W0],Bt,dt],xr]),ed=class extends Te{constructor(t){super(t)}},sg=[0,dt,Bt,Ft,rn,-1],gp=class extends Te{constructor(t){super(t)}},oy=[0,Et,-1],_p=class extends Te{constructor(t){super(t)}},$o=[1,2,3,4,5,6],fc=class extends Te{constructor(t){super(t)}g(){return yt(this,1,void 0,void 0,d0)!=null}l(){return Qt(yt(this,2))!=null}},Rt=class extends Te{constructor(t){super(t)}g(){return t0(yt(this,2))??!1}},ag=[0,W0,dt,[0,Bt,xr,-1],[0,XS,xr]],Ot=[0,ag,Et,[0,$o,vt,K0,vt,Y0,vt,X0,vt,j0,vt,$0,vt,q0],on],Oc=class extends Te{constructor(t){super(t)}},td=[0,Ot,Ft,-1,Bt],cy=Di(502141897,Oc);zt[502141897]=td;var ly=Sr(class extends Te{constructor(t){super(t)}},[0,[0,on,-1,HS,YS],ty]),og=class extends Te{constructor(t){super(t)}},cg=class extends Te{constructor(t){super(t)}},Wh=[0,Ot,Ft,[0,Ot],Et],hy=Di(508968150,cg);zt[508968150]=[0,Ot,td,Wh,Ft,[0,[0,ag]]],zt[508968149]=Wh;var _s=class extends Te{constructor(t){super(t)}l(){return et(this,ed,2)}g(){lt(this,2)}},lg=[0,Ot,sg];zt[478825465]=lg;var uy=class extends Te{constructor(t){super(t)}},hg=class extends Te{constructor(t){super(t)}},nd=class extends Te{constructor(t){super(t)}},id=class extends Te{constructor(t){super(t)}},ug=class extends Te{constructor(t){super(t)}},vp=[0,Ot,[0,Ot],lg,-1],dg=[0,Ot,Ft,Bt],rd=[0,Ot,Ft],fg=[0,Ot,dg,rd,Ft],dy=Di(479097054,ug);zt[479097054]=[0,Ot,fg,vp],zt[463370452]=vp,zt[464864288]=dg;var fy=Di(462713202,id);zt[462713202]=fg,zt[474472470]=rd;var py=class extends Te{constructor(t){super(t)}},pg=class extends Te{constructor(t){super(t)}},mg=class extends Te{constructor(t){super(t)}},gg=class extends Te{constructor(t){super(t)}},sd=[0,Ot,Ft,-1,Bt],Xh=[0,Ot,Ft,Et];gg.prototype.g=Nc([0,Ot,rd,[0,Ot],td,Wh,sd,Xh]);var _g=class extends Te{constructor(t){super(t)}},my=Di(456383383,_g);zt[456383383]=[0,Ot,sg];var vg=class extends Te{constructor(t){super(t)}},gy=Di(476348187,vg);zt[476348187]=[0,Ot,oy];var xg=class extends Te{constructor(t){super(t)}},xp=class extends Te{constructor(t){super(t)}},Mg=[0,on,-1],_y=Di(458105876,class extends Te{constructor(t){super(t)}g(){let t;var e=this.v;const n=0|e[be];return t=Ln(this,n),e=function(i,r,s,a){var o=xp;!a&&aa(i)&&(s=0|(r=i.v)[be]);var c=Zi(r,2);if(i=!1,c==null){if(a)return Qf();c=[]}else if(c.constructor===Ki){if(!(2&c.J)||a)return c;c=c.V()}else Array.isArray(c)?i=!!(2&(0|c[be])):c=[];if(a){if(!c.length)return Qf();i||(i=!0,$a(c))}else i&&(i=!1,Oa(c),c=f0(c));return!i&&32&s&&qa(c,32),s=kt(r,s,2,a=new Ki(c,o,xS,void 0)),i||Jr(r,s),a}(this,e,n,t),!t&&xp&&(e.ra=!0),e}});zt[458105876]=[0,Mg,GS,[!0,xr,[0,dt,-1,rn]],[0,Qa,Et,on]];var ad=class extends Te{constructor(t){super(t)}},Sg=Di(458105758,ad);zt[458105758]=[0,Ot,dt,Mg];var Ul=class extends Te{constructor(t){super(t)}},Mp=[0,WS,-1,Wr],vy=class extends Te{constructor(t){super(t)}},yg=class extends Te{constructor(t){super(t)}},Yh=[1,2];yg.prototype.g=Nc([0,Yh,vt,Mp,vt,[0,jt,Mp]]);var Eg=class extends Te{constructor(t){super(t)}},xy=Di(443442058,Eg);zt[443442058]=[0,Ot,dt,Bt,Ft,rn,-1,Et,Ft],zt[514774813]=sd;var bg=class extends Te{constructor(t){super(t)}},My=Di(516587230,bg);function qh(t,e){return e=e?e.clone():new ed,t.displayNamesLocale!==void 0?lt(e,1,Za(t.displayNamesLocale)):t.displayNamesLocale===void 0&&lt(e,1),t.maxResults!==void 0?Qi(e,2,t.maxResults):"maxResults"in t&&lt(e,2),t.scoreThreshold!==void 0?Ce(e,3,t.scoreThreshold):"scoreThreshold"in t&&lt(e,3),t.categoryAllowlist!==void 0?lc(e,4,t.categoryAllowlist):"categoryAllowlist"in t&&lt(e,4),t.categoryDenylist!==void 0?lc(e,5,t.categoryDenylist):"categoryDenylist"in t&&lt(e,5),e}function Tg(t){const e=Number(t);return Number.isSafeInteger(e)?e:String(t)}function od(t,e=-1,n=""){return{categories:t.map(i=>({index:Yn(i,1)??0??-1,score:Lt(i,2)??0,categoryName:Qt(yt(i,3))??""??"",displayName:Qt(yt(i,4))??""??""})),headIndex:e,headName:n}}function Sy(t){const e={classifications:Ji(t,ny,1).map(n=>{var i;return od(((i=et(n,J0,4))==null?void 0:i.g())??[],Yn(n,2)??0,Qt(yt(n,3))??"")})};return function(n){return n==null?n:typeof n=="bigint"?(kh(n)?n=Number(n):(n=ja(64,n),n=kh(n)?Number(n):String(n)),n):Ka(n)?typeof n=="number"?Ru(n):r0(n):void 0}(yt(t,2,void 0,void 0,oc))!=null&&(e.timestampMs=Tg(yt(t,2,void 0,void 0,oc)??h0)),e}function Ag(t){var a,o;var e=kr(t,3,Si,Br()),n=kr(t,2,ra,Br()),i=kr(t,1,Qt,Br()),r=kr(t,9,Qt,Br());const s={categories:[],keypoints:[]};for(let c=0;c<e.length;c++)s.categories.push({score:e[c],index:n[c]??-1,categoryName:i[c]??"",displayName:r[c]??""});if((e=(a=et(t,Il,4))==null?void 0:a.l())&&(s.boundingBox={originX:Yn(e,1,cr)??0,originY:Yn(e,2,cr)??0,width:Yn(e,3,cr)??0,height:Yn(e,4,cr)??0,angle:0}),(o=et(t,Il,4))==null?void 0:o.g().length)for(const c of et(t,Il,4).g())s.keypoints.push({x:yt(c,1,void 0,cr,Si)??0,y:yt(c,2,void 0,cr,Si)??0,score:yt(c,4,void 0,cr,Si)??0,label:Qt(yt(c,3,void 0,cr))??""});return s}function Bc(t){const e=[];for(const n of Ji(t,ng,1))e.push({x:Lt(n,1)??0,y:Lt(n,2)??0,z:Lt(n,3)??0,visibility:Lt(n,4)??0});return e}function Da(t){const e=[];for(const n of Ji(t,tg,1))e.push({x:Lt(n,1)??0,y:Lt(n,2)??0,z:Lt(n,3)??0,visibility:Lt(n,4)??0});return e}function Sp(t){return Array.from(t,e=>e>127?e-256:e)}function yp(t,e){if(t.length!==e.length)throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${t.length} vs. ${e.length}).`);let n=0,i=0,r=0;for(let s=0;s<t.length;s++)n+=t[s]*e[s],i+=t[s]*t[s],r+=e[s]*e[s];if(i<=0||r<=0)throw Error("Cannot compute cosine similarity on embedding with 0 norm.");return n/Math.sqrt(i*r)}let Uo;zt[516587230]=[0,Ot,sd,Xh,Ft],zt[518928384]=Xh;const yy=new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]);async function wg(t){if(t)return!0;if(Uo===void 0)try{await WebAssembly.instantiate(yy),Uo=!0}catch{Uo=!1}return Uo}async function No(t,e,n){return{wasmLoaderPath:`${e}/${t}_${n=`wasm${n?"_module":""}${await wg(n)?"":"_nosimd"}_internal`}.js`,wasmBinaryPath:`${e}/${t}_${n}.wasm`}}var Ur=class{};function Rg(){var t=navigator;return typeof OffscreenCanvas<"u"&&(!function(e=navigator){return(e=e.userAgent).includes("Safari")&&!e.includes("Chrome")}(t)||!!((t=t.userAgent.match(/Version\/([\d]+).*Safari/))&&t.length>=1&&Number(t[1])>=17))}async function Ep(t){if(typeof importScripts!="function"){const e=document.createElement("script");return e.src=t.toString(),e.crossOrigin="anonymous",new Promise((n,i)=>{e.addEventListener("load",()=>{n()},!1),e.addEventListener("error",r=>{i(r)},!1),document.body.appendChild(e)})}try{importScripts(t.toString())}catch(e){if(!(e instanceof TypeError))throw e;await self.import(t.toString())}}function Cg(t){return t.videoWidth!==void 0?[t.videoWidth,t.videoHeight]:t.naturalWidth!==void 0?[t.naturalWidth,t.naturalHeight]:t.displayWidth!==void 0?[t.displayWidth,t.displayHeight]:[t.width,t.height]}function we(t,e,n){t.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"),n(e=t.i.stringToNewUTF8(e)),t.i._free(e)}function bp(t,e,n){if(!t.i.canvas)throw Error("No OpenGL canvas configured.");if(n?t.i._bindTextureToStream(n):t.i._bindTextureToCanvas(),!(n=t.i.canvas.getContext("webgl2")||t.i.canvas.getContext("webgl")))throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");t.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!0),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,e),t.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1);const[i,r]=Cg(e);return!t.l||i===t.i.canvas.width&&r===t.i.canvas.height||(t.i.canvas.width=i,t.i.canvas.height=r),[i,r]}function Tp(t,e,n){t.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");const i=new Uint32Array(e.length);for(let r=0;r<e.length;r++)i[r]=t.i.stringToNewUTF8(e[r]);e=t.i._malloc(4*i.length),t.i.HEAPU32.set(i,e>>2),n(e);for(const r of i)t.i._free(r);t.i._free(e)}function pi(t,e,n){t.i.simpleListeners=t.i.simpleListeners||{},t.i.simpleListeners[e]=n}function lr(t,e,n){let i=[];t.i.simpleListeners=t.i.simpleListeners||{},t.i.simpleListeners[e]=(r,s,a)=>{s?(n(i,a),i=[]):i.push(r)}}Ur.forVisionTasks=function(t,e=!1){return No("vision",t??Io``,e)},Ur.forTextTasks=function(t,e=!1){return No("text",t??Io``,e)},Ur.forGenAiTasks=function(t,e=!1){return No("genai",t??Io``,e)},Ur.forAudioTasks=function(t,e=!1){return No("audio",t??Io``,e)},Ur.isSimdSupported=function(t=!1){return wg(t)};async function Ey(t,e,n,i){return t=await(async(r,s,a,o,c)=>{if(s&&await Ep(s),!self.ModuleFactory||a&&(await Ep(a),!self.ModuleFactory))throw Error("ModuleFactory not set.");return self.Module&&c&&((s=self.Module).locateFile=c.locateFile,c.mainScriptUrlOrBlob&&(s.mainScriptUrlOrBlob=c.mainScriptUrlOrBlob)),c=await self.ModuleFactory(self.Module||c),self.ModuleFactory=self.Module=void 0,new r(c,o)})(t,n.wasmLoaderPath,n.assetLoaderPath,e,{locateFile:r=>r.endsWith(".wasm")?n.wasmBinaryPath.toString():n.assetBinaryPath&&r.endsWith(".data")?n.assetBinaryPath.toString():r}),await t.o(i),t}function Nl(t,e){const n=et(t.baseOptions,fc,1)||new fc;typeof e=="string"?(lt(n,2,Za(e)),lt(n,1)):e instanceof Uint8Array&&(lt(n,1,bu(e,!1)),lt(n,2)),De(t.baseOptions,0,1,n)}function Ap(t){try{const e=t.H.length;if(e===1)throw Error(t.H[0].message);if(e>1)throw Error("Encountered multiple errors: "+t.H.map(n=>n.message).join(", "))}finally{t.H=[]}}function me(t,e){t.C=Math.max(t.C,e)}function kc(t,e){t.B=new xn,Dn(t.B,2,"PassThroughCalculator"),xt(t.B,"free_memory"),$e(t.B,"free_memory_unused_out"),Tt(e,"free_memory"),jn(e,t.B)}function Gs(t,e){xt(t.B,e),$e(t.B,e+"_unused_out")}function zc(t){t.g.addBoolToStream(!0,"free_memory",t.C)}var $h=class{constructor(t){this.g=t,this.H=[],this.C=0,this.g.setAutoRenderToScreen(!1)}l(t,e=!0){var n,i,r,s,a,o;if(e){const c=t.baseOptions||{};if((n=t.baseOptions)!=null&&n.modelAssetBuffer&&((i=t.baseOptions)!=null&&i.modelAssetPath))throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");if(!((r=et(this.baseOptions,fc,1))!=null&&r.g()||(s=et(this.baseOptions,fc,1))!=null&&s.l()||(a=t.baseOptions)!=null&&a.modelAssetBuffer||(o=t.baseOptions)!=null&&o.modelAssetPath))throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");if(function(l,h){let d=et(l.baseOptions,_p,3);if(!d){var u=d=new _p,f=new up;Pa(u,4,$o,f)}"delegate"in h&&(h.delegate==="GPU"?(h=d,u=new jS,Pa(h,2,$o,u)):(h=d,u=new up,Pa(h,4,$o,u))),De(l.baseOptions,0,3,d)}(this,c),c.modelAssetPath)return fetch(c.modelAssetPath.toString()).then(l=>{if(l.ok)return l.arrayBuffer();throw Error(`Failed to fetch model: ${c.modelAssetPath} (${l.status})`)}).then(l=>{try{this.g.i.FS_unlink("/model.dat")}catch{}this.g.i.FS_createDataFile("/","model.dat",new Uint8Array(l),!0,!1,!1),Nl(this,"/model.dat"),this.m(),this.L()});if(c.modelAssetBuffer instanceof Uint8Array)Nl(this,c.modelAssetBuffer);else if(c.modelAssetBuffer)return async function(l){const h=[];for(var d=0;;){const{done:u,value:f}=await l.read();if(u)break;h.push(f),d+=f.length}if(h.length===0)return new Uint8Array(0);if(h.length===1)return h[0];l=new Uint8Array(d),d=0;for(const u of h)l.set(u,d),d+=u.length;return l}(c.modelAssetBuffer).then(l=>{Nl(this,l),this.m(),this.L()})}return this.m(),this.L(),Promise.resolve()}L(){}ca(){let t;if(this.g.ca(e=>{t=KS(e)}),!t)throw Error("Failed to retrieve CalculatorGraphConfig");return t}setGraph(t,e){this.g.attachErrorListener((n,i)=>{this.H.push(Error(i))}),this.g.Ja(),this.g.setGraph(t,e),this.B=void 0,Ap(this)}finishProcessing(){this.g.finishProcessing(),Ap(this)}close(){this.B=void 0,this.g.closeGraph()}};function gr(t,e){if(!t)throw Error(`Unable to obtain required WebGL resource: ${e}`);return t}$h.prototype.close=$h.prototype.close;class by{constructor(e,n,i,r){this.g=e,this.h=n,this.m=i,this.l=r}bind(){this.g.bindVertexArray(this.h)}close(){this.g.deleteVertexArray(this.h),this.g.deleteBuffer(this.m),this.g.deleteBuffer(this.l)}}function wp(t,e,n){const i=t.g;if(n=gr(i.createShader(n),"Failed to create WebGL shader"),i.shaderSource(n,e),i.compileShader(n),!i.getShaderParameter(n,i.COMPILE_STATUS))throw Error(`Could not compile WebGL shader: ${i.getShaderInfoLog(n)}`);return i.attachShader(t.h,n),n}function Rp(t,e){const n=t.g,i=gr(n.createVertexArray(),"Failed to create vertex array");n.bindVertexArray(i);const r=gr(n.createBuffer(),"Failed to create buffer");n.bindBuffer(n.ARRAY_BUFFER,r),n.enableVertexAttribArray(t.O),n.vertexAttribPointer(t.O,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),n.STATIC_DRAW);const s=gr(n.createBuffer(),"Failed to create buffer");return n.bindBuffer(n.ARRAY_BUFFER,s),n.enableVertexAttribArray(t.L),n.vertexAttribPointer(t.L,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array(e?[0,1,0,0,1,0,1,1]:[0,0,0,1,1,1,1,0]),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,null),n.bindVertexArray(null),new by(n,i,r,s)}function cd(t,e){if(t.g){if(e!==t.g)throw Error("Cannot change GL context once initialized")}else t.g=e}function Ty(t,e,n,i){return cd(t,e),t.h||(t.m(),t.D()),n?(t.u||(t.u=Rp(t,!0)),n=t.u):(t.A||(t.A=Rp(t,!1)),n=t.A),e.useProgram(t.h),n.bind(),t.l(),t=i(),n.g.bindVertexArray(null),t}function Pg(t,e,n){return cd(t,e),t=gr(e.createTexture(),"Failed to create texture"),e.bindTexture(e.TEXTURE_2D,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,n??e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,n??e.LINEAR),e.bindTexture(e.TEXTURE_2D,null),t}function Lg(t,e,n){cd(t,e),t.B||(t.B=gr(e.createFramebuffer(),"Failed to create framebuffe.")),e.bindFramebuffer(e.FRAMEBUFFER,t.B),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0)}function Ay(t){var e;(e=t.g)==null||e.bindFramebuffer(t.g.FRAMEBUFFER,null)}var Dg=class{H(){return`
  precision mediump float;
  varying vec2 vTex;
  uniform sampler2D inputTexture;
  void main() {
    gl_FragColor = texture2D(inputTexture, vTex);
  }
 `}m(){const t=this.g;if(this.h=gr(t.createProgram(),"Failed to create WebGL program"),this.X=wp(this,`
  attribute vec2 aVertex;
  attribute vec2 aTex;
  varying vec2 vTex;
  void main(void) {
    gl_Position = vec4(aVertex, 0.0, 1.0);
    vTex = aTex;
  }`,t.VERTEX_SHADER),this.W=wp(this,this.H(),t.FRAGMENT_SHADER),t.linkProgram(this.h),!t.getProgramParameter(this.h,t.LINK_STATUS))throw Error(`Error during program linking: ${t.getProgramInfoLog(this.h)}`);this.O=t.getAttribLocation(this.h,"aVertex"),this.L=t.getAttribLocation(this.h,"aTex")}D(){}l(){}close(){if(this.h){const t=this.g;t.deleteProgram(this.h),t.deleteShader(this.X),t.deleteShader(this.W)}this.B&&this.g.deleteFramebuffer(this.B),this.A&&this.A.close(),this.u&&this.u.close()}};function Gi(t,e){switch(e){case 0:return t.g.find(n=>n instanceof Uint8Array);case 1:return t.g.find(n=>n instanceof Float32Array);case 2:return t.g.find(n=>typeof WebGLTexture<"u"&&n instanceof WebGLTexture);default:throw Error(`Type is not supported: ${e}`)}}function jh(t){var e=Gi(t,1);if(!e){if(e=Gi(t,0))e=new Float32Array(e).map(i=>i/255);else{e=new Float32Array(t.width*t.height);const i=Hs(t);var n=ld(t);if(Lg(n,i,Ig(t)),"iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"document"in self&&"ontouchend"in self.document){n=new Float32Array(t.width*t.height*4),i.readPixels(0,0,t.width,t.height,i.RGBA,i.FLOAT,n);for(let r=0,s=0;r<e.length;++r,s+=4)e[r]=n[s]}else i.readPixels(0,0,t.width,t.height,i.RED,i.FLOAT,e)}t.g.push(e)}return e}function Ig(t){let e=Gi(t,2);if(!e){const n=Hs(t);e=Ng(t);const i=jh(t),r=Ug(t);n.texImage2D(n.TEXTURE_2D,0,r,t.width,t.height,0,n.RED,n.FLOAT,i),Kh(t)}return e}function Hs(t){if(!t.canvas)throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");return t.h||(t.h=gr(t.canvas.getContext("webgl2"),"You cannot use a canvas that is already bound to a different type of rendering context.")),t.h}function Ug(t){if(t=Hs(t),!Fo)if(t.getExtension("EXT_color_buffer_float")&&t.getExtension("OES_texture_float_linear")&&t.getExtension("EXT_float_blend"))Fo=t.R32F;else{if(!t.getExtension("EXT_color_buffer_half_float"))throw Error("GPU does not fully support 4-channel float32 or float16 formats");Fo=t.R16F}return Fo}function ld(t){return t.l||(t.l=new Dg),t.l}function Ng(t){const e=Hs(t);e.viewport(0,0,t.width,t.height),e.activeTexture(e.TEXTURE0);let n=Gi(t,2);return n||(n=Pg(ld(t),e,t.m?e.LINEAR:e.NEAREST),t.g.push(n),t.j=!0),e.bindTexture(e.TEXTURE_2D,n),n}function Kh(t){t.h.bindTexture(t.h.TEXTURE_2D,null)}var Fo,$t=class{constructor(t,e,n,i,r,s,a){this.g=t,this.m=e,this.j=n,this.canvas=i,this.l=r,this.width=s,this.height=a,this.j&&--Cp===0&&console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources.")}Fa(){return!!Gi(this,0)}ka(){return!!Gi(this,1)}R(){return!!Gi(this,2)}ja(){return(e=Gi(t=this,0))||(e=jh(t),e=new Uint8Array(e.map(n=>Math.round(255*n))),t.g.push(e)),e;var t,e}ia(){return jh(this)}N(){return Ig(this)}clone(){const t=[];for(const e of this.g){let n;if(e instanceof Uint8Array)n=new Uint8Array(e);else if(e instanceof Float32Array)n=new Float32Array(e);else{if(!(e instanceof WebGLTexture))throw Error(`Type is not supported: ${e}`);{const i=Hs(this),r=ld(this);i.activeTexture(i.TEXTURE1),n=Pg(r,i,this.m?i.LINEAR:i.NEAREST),i.bindTexture(i.TEXTURE_2D,n);const s=Ug(this);i.texImage2D(i.TEXTURE_2D,0,s,this.width,this.height,0,i.RED,i.FLOAT,null),i.bindTexture(i.TEXTURE_2D,null),Lg(r,i,n),Ty(r,i,!1,()=>{Ng(this),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.drawArrays(i.TRIANGLE_FAN,0,4),Kh(this)}),Ay(r),Kh(this)}}t.push(n)}return new $t(t,this.m,this.R(),this.canvas,this.l,this.width,this.height)}close(){this.j&&Hs(this).deleteTexture(Gi(this,2)),Cp=-1}};$t.prototype.close=$t.prototype.close,$t.prototype.clone=$t.prototype.clone,$t.prototype.getAsWebGLTexture=$t.prototype.N,$t.prototype.getAsFloat32Array=$t.prototype.ia,$t.prototype.getAsUint8Array=$t.prototype.ja,$t.prototype.hasWebGLTexture=$t.prototype.R,$t.prototype.hasFloat32Array=$t.prototype.ka,$t.prototype.hasUint8Array=$t.prototype.Fa;var Cp=250;function ci(...t){return t.map(([e,n])=>({start:e,end:n}))}const wy=function(t){return class extends t{Ja(){this.i._registerModelResourcesGraphService()}}}((Pp=class{constructor(t,e){this.l=!0,this.i=t,this.g=null,this.h=0,this.m=typeof this.i._addIntToInputStream=="function",e!==void 0?this.i.canvas=e:Rg()?this.i.canvas=new OffscreenCanvas(1,1):(console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."),this.i.canvas=document.createElement("canvas"))}async initializeGraph(t){const e=await(await fetch(t)).arrayBuffer();t=!(t.endsWith(".pbtxt")||t.endsWith(".textproto")),this.setGraph(new Uint8Array(e),t)}setGraphFromString(t){this.setGraph(new TextEncoder().encode(t),!1)}setGraph(t,e){const n=t.length,i=this.i._malloc(n);this.i.HEAPU8.set(t,i),e?this.i._changeBinaryGraph(n,i):this.i._changeTextGraph(n,i),this.i._free(i)}configureAudio(t,e,n,i,r){this.i._configureAudio||console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'),we(this,i||"input_audio",s=>{we(this,r=r||"audio_header",a=>{this.i._configureAudio(s,a,t,e??0,n)})})}setAutoResizeCanvas(t){this.l=t}setAutoRenderToScreen(t){this.i._setAutoRenderToScreen(t)}setGpuBufferVerticalFlip(t){this.i.gpuOriginForWebTexturesIsBottomLeft=t}ca(t){pi(this,"__graph_config__",e=>{t(e)}),we(this,"__graph_config__",e=>{this.i._getGraphConfig(e,void 0)}),delete this.i.simpleListeners.__graph_config__}attachErrorListener(t){this.i.errorListener=t}attachEmptyPacketListener(t,e){this.i.emptyPacketListeners=this.i.emptyPacketListeners||{},this.i.emptyPacketListeners[t]=e}addAudioToStream(t,e,n){this.addAudioToStreamWithShape(t,0,0,e,n)}addAudioToStreamWithShape(t,e,n,i,r){const s=4*t.length;this.h!==s&&(this.g&&this.i._free(this.g),this.g=this.i._malloc(s),this.h=s),this.i.HEAPF32.set(t,this.g/4),we(this,i,a=>{this.i._addAudioToInputStream(this.g,e,n,a,r)})}addGpuBufferToStream(t,e,n){we(this,e,i=>{const[r,s]=bp(this,t,i);this.i._addBoundTextureToStream(i,r,s,n)})}addBoolToStream(t,e,n){we(this,e,i=>{this.i._addBoolToInputStream(t,i,n)})}addDoubleToStream(t,e,n){we(this,e,i=>{this.i._addDoubleToInputStream(t,i,n)})}addFloatToStream(t,e,n){we(this,e,i=>{this.i._addFloatToInputStream(t,i,n)})}addIntToStream(t,e,n){we(this,e,i=>{this.i._addIntToInputStream(t,i,n)})}addUintToStream(t,e,n){we(this,e,i=>{this.i._addUintToInputStream(t,i,n)})}addStringToStream(t,e,n){we(this,e,i=>{we(this,t,r=>{this.i._addStringToInputStream(r,i,n)})})}addStringRecordToStream(t,e,n){we(this,e,i=>{Tp(this,Object.keys(t),r=>{Tp(this,Object.values(t),s=>{this.i._addFlatHashMapToInputStream(r,s,Object.keys(t).length,i,n)})})})}addProtoToStream(t,e,n,i){we(this,n,r=>{we(this,e,s=>{const a=this.i._malloc(t.length);this.i.HEAPU8.set(t,a),this.i._addProtoToInputStream(a,t.length,s,r,i),this.i._free(a)})})}addEmptyPacketToStream(t,e){we(this,t,n=>{this.i._addEmptyPacketToInputStream(n,e)})}addBoolVectorToStream(t,e,n){we(this,e,i=>{const r=this.i._allocateBoolVector(t.length);if(!r)throw Error("Unable to allocate new bool vector on heap.");for(const s of t)this.i._addBoolVectorEntry(r,s);this.i._addBoolVectorToInputStream(r,i,n)})}addDoubleVectorToStream(t,e,n){we(this,e,i=>{const r=this.i._allocateDoubleVector(t.length);if(!r)throw Error("Unable to allocate new double vector on heap.");for(const s of t)this.i._addDoubleVectorEntry(r,s);this.i._addDoubleVectorToInputStream(r,i,n)})}addFloatVectorToStream(t,e,n){we(this,e,i=>{const r=this.i._allocateFloatVector(t.length);if(!r)throw Error("Unable to allocate new float vector on heap.");for(const s of t)this.i._addFloatVectorEntry(r,s);this.i._addFloatVectorToInputStream(r,i,n)})}addIntVectorToStream(t,e,n){we(this,e,i=>{const r=this.i._allocateIntVector(t.length);if(!r)throw Error("Unable to allocate new int vector on heap.");for(const s of t)this.i._addIntVectorEntry(r,s);this.i._addIntVectorToInputStream(r,i,n)})}addUintVectorToStream(t,e,n){we(this,e,i=>{const r=this.i._allocateUintVector(t.length);if(!r)throw Error("Unable to allocate new unsigned int vector on heap.");for(const s of t)this.i._addUintVectorEntry(r,s);this.i._addUintVectorToInputStream(r,i,n)})}addStringVectorToStream(t,e,n){we(this,e,i=>{const r=this.i._allocateStringVector(t.length);if(!r)throw Error("Unable to allocate new string vector on heap.");for(const s of t)we(this,s,a=>{this.i._addStringVectorEntry(r,a)});this.i._addStringVectorToInputStream(r,i,n)})}addBoolToInputSidePacket(t,e){we(this,e,n=>{this.i._addBoolToInputSidePacket(t,n)})}addDoubleToInputSidePacket(t,e){we(this,e,n=>{this.i._addDoubleToInputSidePacket(t,n)})}addFloatToInputSidePacket(t,e){we(this,e,n=>{this.i._addFloatToInputSidePacket(t,n)})}addIntToInputSidePacket(t,e){we(this,e,n=>{this.i._addIntToInputSidePacket(t,n)})}addUintToInputSidePacket(t,e){we(this,e,n=>{this.i._addUintToInputSidePacket(t,n)})}addStringToInputSidePacket(t,e){we(this,e,n=>{we(this,t,i=>{this.i._addStringToInputSidePacket(i,n)})})}addProtoToInputSidePacket(t,e,n){we(this,n,i=>{we(this,e,r=>{const s=this.i._malloc(t.length);this.i.HEAPU8.set(t,s),this.i._addProtoToInputSidePacket(s,t.length,r,i),this.i._free(s)})})}addBoolVectorToInputSidePacket(t,e){we(this,e,n=>{const i=this.i._allocateBoolVector(t.length);if(!i)throw Error("Unable to allocate new bool vector on heap.");for(const r of t)this.i._addBoolVectorEntry(i,r);this.i._addBoolVectorToInputSidePacket(i,n)})}addDoubleVectorToInputSidePacket(t,e){we(this,e,n=>{const i=this.i._allocateDoubleVector(t.length);if(!i)throw Error("Unable to allocate new double vector on heap.");for(const r of t)this.i._addDoubleVectorEntry(i,r);this.i._addDoubleVectorToInputSidePacket(i,n)})}addFloatVectorToInputSidePacket(t,e){we(this,e,n=>{const i=this.i._allocateFloatVector(t.length);if(!i)throw Error("Unable to allocate new float vector on heap.");for(const r of t)this.i._addFloatVectorEntry(i,r);this.i._addFloatVectorToInputSidePacket(i,n)})}addIntVectorToInputSidePacket(t,e){we(this,e,n=>{const i=this.i._allocateIntVector(t.length);if(!i)throw Error("Unable to allocate new int vector on heap.");for(const r of t)this.i._addIntVectorEntry(i,r);this.i._addIntVectorToInputSidePacket(i,n)})}addUintVectorToInputSidePacket(t,e){we(this,e,n=>{const i=this.i._allocateUintVector(t.length);if(!i)throw Error("Unable to allocate new unsigned int vector on heap.");for(const r of t)this.i._addUintVectorEntry(i,r);this.i._addUintVectorToInputSidePacket(i,n)})}addStringVectorToInputSidePacket(t,e){we(this,e,n=>{const i=this.i._allocateStringVector(t.length);if(!i)throw Error("Unable to allocate new string vector on heap.");for(const r of t)we(this,r,s=>{this.i._addStringVectorEntry(i,s)});this.i._addStringVectorToInputSidePacket(i,n)})}attachBoolListener(t,e){pi(this,t,e),we(this,t,n=>{this.i._attachBoolListener(n)})}attachBoolVectorListener(t,e){lr(this,t,e),we(this,t,n=>{this.i._attachBoolVectorListener(n)})}attachIntListener(t,e){pi(this,t,e),we(this,t,n=>{this.i._attachIntListener(n)})}attachIntVectorListener(t,e){lr(this,t,e),we(this,t,n=>{this.i._attachIntVectorListener(n)})}attachUintListener(t,e){pi(this,t,e),we(this,t,n=>{this.i._attachUintListener(n)})}attachUintVectorListener(t,e){lr(this,t,e),we(this,t,n=>{this.i._attachUintVectorListener(n)})}attachDoubleListener(t,e){pi(this,t,e),we(this,t,n=>{this.i._attachDoubleListener(n)})}attachDoubleVectorListener(t,e){lr(this,t,e),we(this,t,n=>{this.i._attachDoubleVectorListener(n)})}attachFloatListener(t,e){pi(this,t,e),we(this,t,n=>{this.i._attachFloatListener(n)})}attachFloatVectorListener(t,e){lr(this,t,e),we(this,t,n=>{this.i._attachFloatVectorListener(n)})}attachStringListener(t,e){pi(this,t,e),we(this,t,n=>{this.i._attachStringListener(n)})}attachStringVectorListener(t,e){lr(this,t,e),we(this,t,n=>{this.i._attachStringVectorListener(n)})}attachProtoListener(t,e,n){pi(this,t,e),we(this,t,i=>{this.i._attachProtoListener(i,n||!1)})}attachProtoVectorListener(t,e,n){lr(this,t,e),we(this,t,i=>{this.i._attachProtoVectorListener(i,n||!1)})}attachAudioListener(t,e,n){this.i._attachAudioListener||console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'),pi(this,t,(i,r)=>{i=new Float32Array(i.buffer,i.byteOffset,i.length/4),e(i,r)}),we(this,t,i=>{this.i._attachAudioListener(i,n||!1)})}finishProcessing(){this.i._waitUntilIdle()}closeGraph(){this.i._closeGraph(),this.i.simpleListeners=void 0,this.i.emptyPacketListeners=void 0}},class extends Pp{get ga(){return this.i}pa(t,e,n){we(this,e,i=>{const[r,s]=bp(this,t,i);this.ga._addBoundTextureAsImageToStream(i,r,s,n)})}Z(t,e){pi(this,t,e),we(this,t,n=>{this.ga._attachImageListener(n)})}aa(t,e){lr(this,t,e),we(this,t,n=>{this.ga._attachImageVectorListener(n)})}}));var Pp,li=class extends wy{};async function Ze(t,e,n){return async function(i,r,s,a){return Ey(i,r,s,a)}(t,n.canvas??(Rg()?void 0:document.createElement("canvas")),e,n)}function Fg(t,e,n,i){if(t.U){const s=new ig;if(n!=null&&n.regionOfInterest){if(!t.oa)throw Error("This task doesn't support region-of-interest.");var r=n.regionOfInterest;if(r.left>=r.right||r.top>=r.bottom)throw Error("Expected RectF with left < right and top < bottom.");if(r.left<0||r.top<0||r.right>1||r.bottom>1)throw Error("Expected RectF values to be in [0,1].");Ce(s,1,(r.left+r.right)/2),Ce(s,2,(r.top+r.bottom)/2),Ce(s,4,r.right-r.left),Ce(s,3,r.bottom-r.top)}else Ce(s,1,.5),Ce(s,2,.5),Ce(s,4,1),Ce(s,3,1);if(n!=null&&n.rotationDegrees){if((n==null?void 0:n.rotationDegrees)%90!=0)throw Error("Expected rotation to be a multiple of 90°.");if(Ce(s,5,-Math.PI*n.rotationDegrees/180),(n==null?void 0:n.rotationDegrees)%180!=0){const[a,o]=Cg(e);n=Lt(s,3)*o/a,r=Lt(s,4)*a/o,Ce(s,4,n),Ce(s,3,r)}}t.g.addProtoToStream(s.g(),"mediapipe.NormalizedRect",t.U,i)}t.g.pa(e,t.X,i??performance.now()),t.finishProcessing()}function hi(t,e,n){var i;if((i=t.baseOptions)!=null&&i.g())throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");Fg(t,e,n,t.C+1)}function Ii(t,e,n,i){var r;if(!((r=t.baseOptions)!=null&&r.g()))throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");Fg(t,e,n,i)}function Ws(t,e,n,i){var r=e.data;const s=e.width,a=s*(e=e.height);if((r instanceof Uint8Array||r instanceof Float32Array)&&r.length!==a)throw Error("Unsupported channel count: "+r.length/a);return t=new $t([r],n,!1,t.g.i.canvas,t.P,s,e),i?t.clone():t}var In=class extends $h{constructor(t,e,n,i){super(t),this.g=t,this.X=e,this.U=n,this.oa=i,this.P=new Dg}l(t,e=!0){if("runningMode"in t&&lt(this.baseOptions,2,ka(!!t.runningMode&&t.runningMode!=="IMAGE")),t.canvas!==void 0&&this.g.i.canvas!==t.canvas)throw Error("You must create a new task to reset the canvas.");return super.l(t,e)}close(){this.P.close(),super.close()}};In.prototype.close=In.prototype.close;var Bn=class extends In{constructor(t,e){super(new li(t,e),"image_in","norm_rect_in",!1),this.j={detections:[]},De(t=this.h=new Oc,0,1,e=new Rt),Ce(this.h,2,.5),Ce(this.h,3,.3)}get baseOptions(){return et(this.h,Rt,1)}set baseOptions(t){De(this.h,0,1,t)}o(t){return"minDetectionConfidence"in t&&Ce(this.h,2,t.minDetectionConfidence??.5),"minSuppressionThreshold"in t&&Ce(this.h,3,t.minSuppressionThreshold??.3),this.l(t)}F(t,e){return this.j={detections:[]},hi(this,t,e),this.j}G(t,e,n){return this.j={detections:[]},Ii(this,t,n,e),this.j}m(){var t=new Nn;Tt(t,"image_in"),Tt(t,"norm_rect_in"),tt(t,"detections");const e=new Un;Li(e,cy,this.h);const n=new xn;Dn(n,2,"mediapipe.tasks.vision.face_detector.FaceDetectorGraph"),xt(n,"IMAGE:image_in"),xt(n,"NORM_RECT:norm_rect_in"),$e(n,"DETECTIONS:detections"),n.o(e),jn(t,n),this.g.attachProtoVectorListener("detections",(i,r)=>{for(const s of i)i=eg(s),this.j.detections.push(Ag(i));me(this,r)}),this.g.attachEmptyPacketListener("detections",i=>{me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};Bn.prototype.detectForVideo=Bn.prototype.G,Bn.prototype.detect=Bn.prototype.F,Bn.prototype.setOptions=Bn.prototype.o,Bn.createFromModelPath=async function(t,e){return Ze(Bn,t,{baseOptions:{modelAssetPath:e}})},Bn.createFromModelBuffer=function(t,e){return Ze(Bn,t,{baseOptions:{modelAssetBuffer:e}})},Bn.createFromOptions=function(t,e){return Ze(Bn,t,e)};var hd=ci([61,146],[146,91],[91,181],[181,84],[84,17],[17,314],[314,405],[405,321],[321,375],[375,291],[61,185],[185,40],[40,39],[39,37],[37,0],[0,267],[267,269],[269,270],[270,409],[409,291],[78,95],[95,88],[88,178],[178,87],[87,14],[14,317],[317,402],[402,318],[318,324],[324,308],[78,191],[191,80],[80,81],[81,82],[82,13],[13,312],[312,311],[311,310],[310,415],[415,308]),ud=ci([263,249],[249,390],[390,373],[373,374],[374,380],[380,381],[381,382],[382,362],[263,466],[466,388],[388,387],[387,386],[386,385],[385,384],[384,398],[398,362]),dd=ci([276,283],[283,282],[282,295],[295,285],[300,293],[293,334],[334,296],[296,336]),Og=ci([474,475],[475,476],[476,477],[477,474]),fd=ci([33,7],[7,163],[163,144],[144,145],[145,153],[153,154],[154,155],[155,133],[33,246],[246,161],[161,160],[160,159],[159,158],[158,157],[157,173],[173,133]),pd=ci([46,53],[53,52],[52,65],[65,55],[70,63],[63,105],[105,66],[66,107]),Bg=ci([469,470],[470,471],[471,472],[472,469]),md=ci([10,338],[338,297],[297,332],[332,284],[284,251],[251,389],[389,356],[356,454],[454,323],[323,361],[361,288],[288,397],[397,365],[365,379],[379,378],[378,400],[400,377],[377,152],[152,148],[148,176],[176,149],[149,150],[150,136],[136,172],[172,58],[58,132],[132,93],[93,234],[234,127],[127,162],[162,21],[21,54],[54,103],[103,67],[67,109],[109,10]),kg=[...hd,...ud,...dd,...fd,...pd,...md],zg=ci([127,34],[34,139],[139,127],[11,0],[0,37],[37,11],[232,231],[231,120],[120,232],[72,37],[37,39],[39,72],[128,121],[121,47],[47,128],[232,121],[121,128],[128,232],[104,69],[69,67],[67,104],[175,171],[171,148],[148,175],[118,50],[50,101],[101,118],[73,39],[39,40],[40,73],[9,151],[151,108],[108,9],[48,115],[115,131],[131,48],[194,204],[204,211],[211,194],[74,40],[40,185],[185,74],[80,42],[42,183],[183,80],[40,92],[92,186],[186,40],[230,229],[229,118],[118,230],[202,212],[212,214],[214,202],[83,18],[18,17],[17,83],[76,61],[61,146],[146,76],[160,29],[29,30],[30,160],[56,157],[157,173],[173,56],[106,204],[204,194],[194,106],[135,214],[214,192],[192,135],[203,165],[165,98],[98,203],[21,71],[71,68],[68,21],[51,45],[45,4],[4,51],[144,24],[24,23],[23,144],[77,146],[146,91],[91,77],[205,50],[50,187],[187,205],[201,200],[200,18],[18,201],[91,106],[106,182],[182,91],[90,91],[91,181],[181,90],[85,84],[84,17],[17,85],[206,203],[203,36],[36,206],[148,171],[171,140],[140,148],[92,40],[40,39],[39,92],[193,189],[189,244],[244,193],[159,158],[158,28],[28,159],[247,246],[246,161],[161,247],[236,3],[3,196],[196,236],[54,68],[68,104],[104,54],[193,168],[168,8],[8,193],[117,228],[228,31],[31,117],[189,193],[193,55],[55,189],[98,97],[97,99],[99,98],[126,47],[47,100],[100,126],[166,79],[79,218],[218,166],[155,154],[154,26],[26,155],[209,49],[49,131],[131,209],[135,136],[136,150],[150,135],[47,126],[126,217],[217,47],[223,52],[52,53],[53,223],[45,51],[51,134],[134,45],[211,170],[170,140],[140,211],[67,69],[69,108],[108,67],[43,106],[106,91],[91,43],[230,119],[119,120],[120,230],[226,130],[130,247],[247,226],[63,53],[53,52],[52,63],[238,20],[20,242],[242,238],[46,70],[70,156],[156,46],[78,62],[62,96],[96,78],[46,53],[53,63],[63,46],[143,34],[34,227],[227,143],[123,117],[117,111],[111,123],[44,125],[125,19],[19,44],[236,134],[134,51],[51,236],[216,206],[206,205],[205,216],[154,153],[153,22],[22,154],[39,37],[37,167],[167,39],[200,201],[201,208],[208,200],[36,142],[142,100],[100,36],[57,212],[212,202],[202,57],[20,60],[60,99],[99,20],[28,158],[158,157],[157,28],[35,226],[226,113],[113,35],[160,159],[159,27],[27,160],[204,202],[202,210],[210,204],[113,225],[225,46],[46,113],[43,202],[202,204],[204,43],[62,76],[76,77],[77,62],[137,123],[123,116],[116,137],[41,38],[38,72],[72,41],[203,129],[129,142],[142,203],[64,98],[98,240],[240,64],[49,102],[102,64],[64,49],[41,73],[73,74],[74,41],[212,216],[216,207],[207,212],[42,74],[74,184],[184,42],[169,170],[170,211],[211,169],[170,149],[149,176],[176,170],[105,66],[66,69],[69,105],[122,6],[6,168],[168,122],[123,147],[147,187],[187,123],[96,77],[77,90],[90,96],[65,55],[55,107],[107,65],[89,90],[90,180],[180,89],[101,100],[100,120],[120,101],[63,105],[105,104],[104,63],[93,137],[137,227],[227,93],[15,86],[86,85],[85,15],[129,102],[102,49],[49,129],[14,87],[87,86],[86,14],[55,8],[8,9],[9,55],[100,47],[47,121],[121,100],[145,23],[23,22],[22,145],[88,89],[89,179],[179,88],[6,122],[122,196],[196,6],[88,95],[95,96],[96,88],[138,172],[172,136],[136,138],[215,58],[58,172],[172,215],[115,48],[48,219],[219,115],[42,80],[80,81],[81,42],[195,3],[3,51],[51,195],[43,146],[146,61],[61,43],[171,175],[175,199],[199,171],[81,82],[82,38],[38,81],[53,46],[46,225],[225,53],[144,163],[163,110],[110,144],[52,65],[65,66],[66,52],[229,228],[228,117],[117,229],[34,127],[127,234],[234,34],[107,108],[108,69],[69,107],[109,108],[108,151],[151,109],[48,64],[64,235],[235,48],[62,78],[78,191],[191,62],[129,209],[209,126],[126,129],[111,35],[35,143],[143,111],[117,123],[123,50],[50,117],[222,65],[65,52],[52,222],[19,125],[125,141],[141,19],[221,55],[55,65],[65,221],[3,195],[195,197],[197,3],[25,7],[7,33],[33,25],[220,237],[237,44],[44,220],[70,71],[71,139],[139,70],[122,193],[193,245],[245,122],[247,130],[130,33],[33,247],[71,21],[21,162],[162,71],[170,169],[169,150],[150,170],[188,174],[174,196],[196,188],[216,186],[186,92],[92,216],[2,97],[97,167],[167,2],[141,125],[125,241],[241,141],[164,167],[167,37],[37,164],[72,38],[38,12],[12,72],[38,82],[82,13],[13,38],[63,68],[68,71],[71,63],[226,35],[35,111],[111,226],[101,50],[50,205],[205,101],[206,92],[92,165],[165,206],[209,198],[198,217],[217,209],[165,167],[167,97],[97,165],[220,115],[115,218],[218,220],[133,112],[112,243],[243,133],[239,238],[238,241],[241,239],[214,135],[135,169],[169,214],[190,173],[173,133],[133,190],[171,208],[208,32],[32,171],[125,44],[44,237],[237,125],[86,87],[87,178],[178,86],[85,86],[86,179],[179,85],[84,85],[85,180],[180,84],[83,84],[84,181],[181,83],[201,83],[83,182],[182,201],[137,93],[93,132],[132,137],[76,62],[62,183],[183,76],[61,76],[76,184],[184,61],[57,61],[61,185],[185,57],[212,57],[57,186],[186,212],[214,207],[207,187],[187,214],[34,143],[143,156],[156,34],[79,239],[239,237],[237,79],[123,137],[137,177],[177,123],[44,1],[1,4],[4,44],[201,194],[194,32],[32,201],[64,102],[102,129],[129,64],[213,215],[215,138],[138,213],[59,166],[166,219],[219,59],[242,99],[99,97],[97,242],[2,94],[94,141],[141,2],[75,59],[59,235],[235,75],[24,110],[110,228],[228,24],[25,130],[130,226],[226,25],[23,24],[24,229],[229,23],[22,23],[23,230],[230,22],[26,22],[22,231],[231,26],[112,26],[26,232],[232,112],[189,190],[190,243],[243,189],[221,56],[56,190],[190,221],[28,56],[56,221],[221,28],[27,28],[28,222],[222,27],[29,27],[27,223],[223,29],[30,29],[29,224],[224,30],[247,30],[30,225],[225,247],[238,79],[79,20],[20,238],[166,59],[59,75],[75,166],[60,75],[75,240],[240,60],[147,177],[177,215],[215,147],[20,79],[79,166],[166,20],[187,147],[147,213],[213,187],[112,233],[233,244],[244,112],[233,128],[128,245],[245,233],[128,114],[114,188],[188,128],[114,217],[217,174],[174,114],[131,115],[115,220],[220,131],[217,198],[198,236],[236,217],[198,131],[131,134],[134,198],[177,132],[132,58],[58,177],[143,35],[35,124],[124,143],[110,163],[163,7],[7,110],[228,110],[110,25],[25,228],[356,389],[389,368],[368,356],[11,302],[302,267],[267,11],[452,350],[350,349],[349,452],[302,303],[303,269],[269,302],[357,343],[343,277],[277,357],[452,453],[453,357],[357,452],[333,332],[332,297],[297,333],[175,152],[152,377],[377,175],[347,348],[348,330],[330,347],[303,304],[304,270],[270,303],[9,336],[336,337],[337,9],[278,279],[279,360],[360,278],[418,262],[262,431],[431,418],[304,408],[408,409],[409,304],[310,415],[415,407],[407,310],[270,409],[409,410],[410,270],[450,348],[348,347],[347,450],[422,430],[430,434],[434,422],[313,314],[314,17],[17,313],[306,307],[307,375],[375,306],[387,388],[388,260],[260,387],[286,414],[414,398],[398,286],[335,406],[406,418],[418,335],[364,367],[367,416],[416,364],[423,358],[358,327],[327,423],[251,284],[284,298],[298,251],[281,5],[5,4],[4,281],[373,374],[374,253],[253,373],[307,320],[320,321],[321,307],[425,427],[427,411],[411,425],[421,313],[313,18],[18,421],[321,405],[405,406],[406,321],[320,404],[404,405],[405,320],[315,16],[16,17],[17,315],[426,425],[425,266],[266,426],[377,400],[400,369],[369,377],[322,391],[391,269],[269,322],[417,465],[465,464],[464,417],[386,257],[257,258],[258,386],[466,260],[260,388],[388,466],[456,399],[399,419],[419,456],[284,332],[332,333],[333,284],[417,285],[285,8],[8,417],[346,340],[340,261],[261,346],[413,441],[441,285],[285,413],[327,460],[460,328],[328,327],[355,371],[371,329],[329,355],[392,439],[439,438],[438,392],[382,341],[341,256],[256,382],[429,420],[420,360],[360,429],[364,394],[394,379],[379,364],[277,343],[343,437],[437,277],[443,444],[444,283],[283,443],[275,440],[440,363],[363,275],[431,262],[262,369],[369,431],[297,338],[338,337],[337,297],[273,375],[375,321],[321,273],[450,451],[451,349],[349,450],[446,342],[342,467],[467,446],[293,334],[334,282],[282,293],[458,461],[461,462],[462,458],[276,353],[353,383],[383,276],[308,324],[324,325],[325,308],[276,300],[300,293],[293,276],[372,345],[345,447],[447,372],[352,345],[345,340],[340,352],[274,1],[1,19],[19,274],[456,248],[248,281],[281,456],[436,427],[427,425],[425,436],[381,256],[256,252],[252,381],[269,391],[391,393],[393,269],[200,199],[199,428],[428,200],[266,330],[330,329],[329,266],[287,273],[273,422],[422,287],[250,462],[462,328],[328,250],[258,286],[286,384],[384,258],[265,353],[353,342],[342,265],[387,259],[259,257],[257,387],[424,431],[431,430],[430,424],[342,353],[353,276],[276,342],[273,335],[335,424],[424,273],[292,325],[325,307],[307,292],[366,447],[447,345],[345,366],[271,303],[303,302],[302,271],[423,266],[266,371],[371,423],[294,455],[455,460],[460,294],[279,278],[278,294],[294,279],[271,272],[272,304],[304,271],[432,434],[434,427],[427,432],[272,407],[407,408],[408,272],[394,430],[430,431],[431,394],[395,369],[369,400],[400,395],[334,333],[333,299],[299,334],[351,417],[417,168],[168,351],[352,280],[280,411],[411,352],[325,319],[319,320],[320,325],[295,296],[296,336],[336,295],[319,403],[403,404],[404,319],[330,348],[348,349],[349,330],[293,298],[298,333],[333,293],[323,454],[454,447],[447,323],[15,16],[16,315],[315,15],[358,429],[429,279],[279,358],[14,15],[15,316],[316,14],[285,336],[336,9],[9,285],[329,349],[349,350],[350,329],[374,380],[380,252],[252,374],[318,402],[402,403],[403,318],[6,197],[197,419],[419,6],[318,319],[319,325],[325,318],[367,364],[364,365],[365,367],[435,367],[367,397],[397,435],[344,438],[438,439],[439,344],[272,271],[271,311],[311,272],[195,5],[5,281],[281,195],[273,287],[287,291],[291,273],[396,428],[428,199],[199,396],[311,271],[271,268],[268,311],[283,444],[444,445],[445,283],[373,254],[254,339],[339,373],[282,334],[334,296],[296,282],[449,347],[347,346],[346,449],[264,447],[447,454],[454,264],[336,296],[296,299],[299,336],[338,10],[10,151],[151,338],[278,439],[439,455],[455,278],[292,407],[407,415],[415,292],[358,371],[371,355],[355,358],[340,345],[345,372],[372,340],[346,347],[347,280],[280,346],[442,443],[443,282],[282,442],[19,94],[94,370],[370,19],[441,442],[442,295],[295,441],[248,419],[419,197],[197,248],[263,255],[255,359],[359,263],[440,275],[275,274],[274,440],[300,383],[383,368],[368,300],[351,412],[412,465],[465,351],[263,467],[467,466],[466,263],[301,368],[368,389],[389,301],[395,378],[378,379],[379,395],[412,351],[351,419],[419,412],[436,426],[426,322],[322,436],[2,164],[164,393],[393,2],[370,462],[462,461],[461,370],[164,0],[0,267],[267,164],[302,11],[11,12],[12,302],[268,12],[12,13],[13,268],[293,300],[300,301],[301,293],[446,261],[261,340],[340,446],[330,266],[266,425],[425,330],[426,423],[423,391],[391,426],[429,355],[355,437],[437,429],[391,327],[327,326],[326,391],[440,457],[457,438],[438,440],[341,382],[382,362],[362,341],[459,457],[457,461],[461,459],[434,430],[430,394],[394,434],[414,463],[463,362],[362,414],[396,369],[369,262],[262,396],[354,461],[461,457],[457,354],[316,403],[403,402],[402,316],[315,404],[404,403],[403,315],[314,405],[405,404],[404,314],[313,406],[406,405],[405,313],[421,418],[418,406],[406,421],[366,401],[401,361],[361,366],[306,408],[408,407],[407,306],[291,409],[409,408],[408,291],[287,410],[410,409],[409,287],[432,436],[436,410],[410,432],[434,416],[416,411],[411,434],[264,368],[368,383],[383,264],[309,438],[438,457],[457,309],[352,376],[376,401],[401,352],[274,275],[275,4],[4,274],[421,428],[428,262],[262,421],[294,327],[327,358],[358,294],[433,416],[416,367],[367,433],[289,455],[455,439],[439,289],[462,370],[370,326],[326,462],[2,326],[326,370],[370,2],[305,460],[460,455],[455,305],[254,449],[449,448],[448,254],[255,261],[261,446],[446,255],[253,450],[450,449],[449,253],[252,451],[451,450],[450,252],[256,452],[452,451],[451,256],[341,453],[453,452],[452,341],[413,464],[464,463],[463,413],[441,413],[413,414],[414,441],[258,442],[442,441],[441,258],[257,443],[443,442],[442,257],[259,444],[444,443],[443,259],[260,445],[445,444],[444,260],[467,342],[342,445],[445,467],[459,458],[458,250],[250,459],[289,392],[392,290],[290,289],[290,328],[328,460],[460,290],[376,433],[433,435],[435,376],[250,290],[290,392],[392,250],[411,416],[416,433],[433,411],[341,463],[463,464],[464,341],[453,464],[464,465],[465,453],[357,465],[465,412],[412,357],[343,412],[412,399],[399,343],[360,363],[363,440],[440,360],[437,399],[399,456],[456,437],[420,456],[456,363],[363,420],[401,435],[435,288],[288,401],[372,383],[383,353],[353,372],[339,255],[255,249],[249,339],[448,261],[261,255],[255,448],[133,243],[243,190],[190,133],[133,155],[155,112],[112,133],[33,246],[246,247],[247,33],[33,130],[130,25],[25,33],[398,384],[384,286],[286,398],[362,398],[398,414],[414,362],[362,463],[463,341],[341,362],[263,359],[359,467],[467,263],[263,249],[249,255],[255,263],[466,467],[467,260],[260,466],[75,60],[60,166],[166,75],[238,239],[239,79],[79,238],[162,127],[127,139],[139,162],[72,11],[11,37],[37,72],[121,232],[232,120],[120,121],[73,72],[72,39],[39,73],[114,128],[128,47],[47,114],[233,232],[232,128],[128,233],[103,104],[104,67],[67,103],[152,175],[175,148],[148,152],[119,118],[118,101],[101,119],[74,73],[73,40],[40,74],[107,9],[9,108],[108,107],[49,48],[48,131],[131,49],[32,194],[194,211],[211,32],[184,74],[74,185],[185,184],[191,80],[80,183],[183,191],[185,40],[40,186],[186,185],[119,230],[230,118],[118,119],[210,202],[202,214],[214,210],[84,83],[83,17],[17,84],[77,76],[76,146],[146,77],[161,160],[160,30],[30,161],[190,56],[56,173],[173,190],[182,106],[106,194],[194,182],[138,135],[135,192],[192,138],[129,203],[203,98],[98,129],[54,21],[21,68],[68,54],[5,51],[51,4],[4,5],[145,144],[144,23],[23,145],[90,77],[77,91],[91,90],[207,205],[205,187],[187,207],[83,201],[201,18],[18,83],[181,91],[91,182],[182,181],[180,90],[90,181],[181,180],[16,85],[85,17],[17,16],[205,206],[206,36],[36,205],[176,148],[148,140],[140,176],[165,92],[92,39],[39,165],[245,193],[193,244],[244,245],[27,159],[159,28],[28,27],[30,247],[247,161],[161,30],[174,236],[236,196],[196,174],[103,54],[54,104],[104,103],[55,193],[193,8],[8,55],[111,117],[117,31],[31,111],[221,189],[189,55],[55,221],[240,98],[98,99],[99,240],[142,126],[126,100],[100,142],[219,166],[166,218],[218,219],[112,155],[155,26],[26,112],[198,209],[209,131],[131,198],[169,135],[135,150],[150,169],[114,47],[47,217],[217,114],[224,223],[223,53],[53,224],[220,45],[45,134],[134,220],[32,211],[211,140],[140,32],[109,67],[67,108],[108,109],[146,43],[43,91],[91,146],[231,230],[230,120],[120,231],[113,226],[226,247],[247,113],[105,63],[63,52],[52,105],[241,238],[238,242],[242,241],[124,46],[46,156],[156,124],[95,78],[78,96],[96,95],[70,46],[46,63],[63,70],[116,143],[143,227],[227,116],[116,123],[123,111],[111,116],[1,44],[44,19],[19,1],[3,236],[236,51],[51,3],[207,216],[216,205],[205,207],[26,154],[154,22],[22,26],[165,39],[39,167],[167,165],[199,200],[200,208],[208,199],[101,36],[36,100],[100,101],[43,57],[57,202],[202,43],[242,20],[20,99],[99,242],[56,28],[28,157],[157,56],[124,35],[35,113],[113,124],[29,160],[160,27],[27,29],[211,204],[204,210],[210,211],[124,113],[113,46],[46,124],[106,43],[43,204],[204,106],[96,62],[62,77],[77,96],[227,137],[137,116],[116,227],[73,41],[41,72],[72,73],[36,203],[203,142],[142,36],[235,64],[64,240],[240,235],[48,49],[49,64],[64,48],[42,41],[41,74],[74,42],[214,212],[212,207],[207,214],[183,42],[42,184],[184,183],[210,169],[169,211],[211,210],[140,170],[170,176],[176,140],[104,105],[105,69],[69,104],[193,122],[122,168],[168,193],[50,123],[123,187],[187,50],[89,96],[96,90],[90,89],[66,65],[65,107],[107,66],[179,89],[89,180],[180,179],[119,101],[101,120],[120,119],[68,63],[63,104],[104,68],[234,93],[93,227],[227,234],[16,15],[15,85],[85,16],[209,129],[129,49],[49,209],[15,14],[14,86],[86,15],[107,55],[55,9],[9,107],[120,100],[100,121],[121,120],[153,145],[145,22],[22,153],[178,88],[88,179],[179,178],[197,6],[6,196],[196,197],[89,88],[88,96],[96,89],[135,138],[138,136],[136,135],[138,215],[215,172],[172,138],[218,115],[115,219],[219,218],[41,42],[42,81],[81,41],[5,195],[195,51],[51,5],[57,43],[43,61],[61,57],[208,171],[171,199],[199,208],[41,81],[81,38],[38,41],[224,53],[53,225],[225,224],[24,144],[144,110],[110,24],[105,52],[52,66],[66,105],[118,229],[229,117],[117,118],[227,34],[34,234],[234,227],[66,107],[107,69],[69,66],[10,109],[109,151],[151,10],[219,48],[48,235],[235,219],[183,62],[62,191],[191,183],[142,129],[129,126],[126,142],[116,111],[111,143],[143,116],[118,117],[117,50],[50,118],[223,222],[222,52],[52,223],[94,19],[19,141],[141,94],[222,221],[221,65],[65,222],[196,3],[3,197],[197,196],[45,220],[220,44],[44,45],[156,70],[70,139],[139,156],[188,122],[122,245],[245,188],[139,71],[71,162],[162,139],[149,170],[170,150],[150,149],[122,188],[188,196],[196,122],[206,216],[216,92],[92,206],[164,2],[2,167],[167,164],[242,141],[141,241],[241,242],[0,164],[164,37],[37,0],[11,72],[72,12],[12,11],[12,38],[38,13],[13,12],[70,63],[63,71],[71,70],[31,226],[226,111],[111,31],[36,101],[101,205],[205,36],[203,206],[206,165],[165,203],[126,209],[209,217],[217,126],[98,165],[165,97],[97,98],[237,220],[220,218],[218,237],[237,239],[239,241],[241,237],[210,214],[214,169],[169,210],[140,171],[171,32],[32,140],[241,125],[125,237],[237,241],[179,86],[86,178],[178,179],[180,85],[85,179],[179,180],[181,84],[84,180],[180,181],[182,83],[83,181],[181,182],[194,201],[201,182],[182,194],[177,137],[137,132],[132,177],[184,76],[76,183],[183,184],[185,61],[61,184],[184,185],[186,57],[57,185],[185,186],[216,212],[212,186],[186,216],[192,214],[214,187],[187,192],[139,34],[34,156],[156,139],[218,79],[79,237],[237,218],[147,123],[123,177],[177,147],[45,44],[44,4],[4,45],[208,201],[201,32],[32,208],[98,64],[64,129],[129,98],[192,213],[213,138],[138,192],[235,59],[59,219],[219,235],[141,242],[242,97],[97,141],[97,2],[2,141],[141,97],[240,75],[75,235],[235,240],[229,24],[24,228],[228,229],[31,25],[25,226],[226,31],[230,23],[23,229],[229,230],[231,22],[22,230],[230,231],[232,26],[26,231],[231,232],[233,112],[112,232],[232,233],[244,189],[189,243],[243,244],[189,221],[221,190],[190,189],[222,28],[28,221],[221,222],[223,27],[27,222],[222,223],[224,29],[29,223],[223,224],[225,30],[30,224],[224,225],[113,247],[247,225],[225,113],[99,60],[60,240],[240,99],[213,147],[147,215],[215,213],[60,20],[20,166],[166,60],[192,187],[187,213],[213,192],[243,112],[112,244],[244,243],[244,233],[233,245],[245,244],[245,128],[128,188],[188,245],[188,114],[114,174],[174,188],[134,131],[131,220],[220,134],[174,217],[217,236],[236,174],[236,198],[198,134],[134,236],[215,177],[177,58],[58,215],[156,143],[143,124],[124,156],[25,110],[110,7],[7,25],[31,228],[228,25],[25,31],[264,356],[356,368],[368,264],[0,11],[11,267],[267,0],[451,452],[452,349],[349,451],[267,302],[302,269],[269,267],[350,357],[357,277],[277,350],[350,452],[452,357],[357,350],[299,333],[333,297],[297,299],[396,175],[175,377],[377,396],[280,347],[347,330],[330,280],[269,303],[303,270],[270,269],[151,9],[9,337],[337,151],[344,278],[278,360],[360,344],[424,418],[418,431],[431,424],[270,304],[304,409],[409,270],[272,310],[310,407],[407,272],[322,270],[270,410],[410,322],[449,450],[450,347],[347,449],[432,422],[422,434],[434,432],[18,313],[313,17],[17,18],[291,306],[306,375],[375,291],[259,387],[387,260],[260,259],[424,335],[335,418],[418,424],[434,364],[364,416],[416,434],[391,423],[423,327],[327,391],[301,251],[251,298],[298,301],[275,281],[281,4],[4,275],[254,373],[373,253],[253,254],[375,307],[307,321],[321,375],[280,425],[425,411],[411,280],[200,421],[421,18],[18,200],[335,321],[321,406],[406,335],[321,320],[320,405],[405,321],[314,315],[315,17],[17,314],[423,426],[426,266],[266,423],[396,377],[377,369],[369,396],[270,322],[322,269],[269,270],[413,417],[417,464],[464,413],[385,386],[386,258],[258,385],[248,456],[456,419],[419,248],[298,284],[284,333],[333,298],[168,417],[417,8],[8,168],[448,346],[346,261],[261,448],[417,413],[413,285],[285,417],[326,327],[327,328],[328,326],[277,355],[355,329],[329,277],[309,392],[392,438],[438,309],[381,382],[382,256],[256,381],[279,429],[429,360],[360,279],[365,364],[364,379],[379,365],[355,277],[277,437],[437,355],[282,443],[443,283],[283,282],[281,275],[275,363],[363,281],[395,431],[431,369],[369,395],[299,297],[297,337],[337,299],[335,273],[273,321],[321,335],[348,450],[450,349],[349,348],[359,446],[446,467],[467,359],[283,293],[293,282],[282,283],[250,458],[458,462],[462,250],[300,276],[276,383],[383,300],[292,308],[308,325],[325,292],[283,276],[276,293],[293,283],[264,372],[372,447],[447,264],[346,352],[352,340],[340,346],[354,274],[274,19],[19,354],[363,456],[456,281],[281,363],[426,436],[436,425],[425,426],[380,381],[381,252],[252,380],[267,269],[269,393],[393,267],[421,200],[200,428],[428,421],[371,266],[266,329],[329,371],[432,287],[287,422],[422,432],[290,250],[250,328],[328,290],[385,258],[258,384],[384,385],[446,265],[265,342],[342,446],[386,387],[387,257],[257,386],[422,424],[424,430],[430,422],[445,342],[342,276],[276,445],[422,273],[273,424],[424,422],[306,292],[292,307],[307,306],[352,366],[366,345],[345,352],[268,271],[271,302],[302,268],[358,423],[423,371],[371,358],[327,294],[294,460],[460,327],[331,279],[279,294],[294,331],[303,271],[271,304],[304,303],[436,432],[432,427],[427,436],[304,272],[272,408],[408,304],[395,394],[394,431],[431,395],[378,395],[395,400],[400,378],[296,334],[334,299],[299,296],[6,351],[351,168],[168,6],[376,352],[352,411],[411,376],[307,325],[325,320],[320,307],[285,295],[295,336],[336,285],[320,319],[319,404],[404,320],[329,330],[330,349],[349,329],[334,293],[293,333],[333,334],[366,323],[323,447],[447,366],[316,15],[15,315],[315,316],[331,358],[358,279],[279,331],[317,14],[14,316],[316,317],[8,285],[285,9],[9,8],[277,329],[329,350],[350,277],[253,374],[374,252],[252,253],[319,318],[318,403],[403,319],[351,6],[6,419],[419,351],[324,318],[318,325],[325,324],[397,367],[367,365],[365,397],[288,435],[435,397],[397,288],[278,344],[344,439],[439,278],[310,272],[272,311],[311,310],[248,195],[195,281],[281,248],[375,273],[273,291],[291,375],[175,396],[396,199],[199,175],[312,311],[311,268],[268,312],[276,283],[283,445],[445,276],[390,373],[373,339],[339,390],[295,282],[282,296],[296,295],[448,449],[449,346],[346,448],[356,264],[264,454],[454,356],[337,336],[336,299],[299,337],[337,338],[338,151],[151,337],[294,278],[278,455],[455,294],[308,292],[292,415],[415,308],[429,358],[358,355],[355,429],[265,340],[340,372],[372,265],[352,346],[346,280],[280,352],[295,442],[442,282],[282,295],[354,19],[19,370],[370,354],[285,441],[441,295],[295,285],[195,248],[248,197],[197,195],[457,440],[440,274],[274,457],[301,300],[300,368],[368,301],[417,351],[351,465],[465,417],[251,301],[301,389],[389,251],[394,395],[395,379],[379,394],[399,412],[412,419],[419,399],[410,436],[436,322],[322,410],[326,2],[2,393],[393,326],[354,370],[370,461],[461,354],[393,164],[164,267],[267,393],[268,302],[302,12],[12,268],[312,268],[268,13],[13,312],[298,293],[293,301],[301,298],[265,446],[446,340],[340,265],[280,330],[330,425],[425,280],[322,426],[426,391],[391,322],[420,429],[429,437],[437,420],[393,391],[391,326],[326,393],[344,440],[440,438],[438,344],[458,459],[459,461],[461,458],[364,434],[434,394],[394,364],[428,396],[396,262],[262,428],[274,354],[354,457],[457,274],[317,316],[316,402],[402,317],[316,315],[315,403],[403,316],[315,314],[314,404],[404,315],[314,313],[313,405],[405,314],[313,421],[421,406],[406,313],[323,366],[366,361],[361,323],[292,306],[306,407],[407,292],[306,291],[291,408],[408,306],[291,287],[287,409],[409,291],[287,432],[432,410],[410,287],[427,434],[434,411],[411,427],[372,264],[264,383],[383,372],[459,309],[309,457],[457,459],[366,352],[352,401],[401,366],[1,274],[274,4],[4,1],[418,421],[421,262],[262,418],[331,294],[294,358],[358,331],[435,433],[433,367],[367,435],[392,289],[289,439],[439,392],[328,462],[462,326],[326,328],[94,2],[2,370],[370,94],[289,305],[305,455],[455,289],[339,254],[254,448],[448,339],[359,255],[255,446],[446,359],[254,253],[253,449],[449,254],[253,252],[252,450],[450,253],[252,256],[256,451],[451,252],[256,341],[341,452],[452,256],[414,413],[413,463],[463,414],[286,441],[441,414],[414,286],[286,258],[258,441],[441,286],[258,257],[257,442],[442,258],[257,259],[259,443],[443,257],[259,260],[260,444],[444,259],[260,467],[467,445],[445,260],[309,459],[459,250],[250,309],[305,289],[289,290],[290,305],[305,290],[290,460],[460,305],[401,376],[376,435],[435,401],[309,250],[250,392],[392,309],[376,411],[411,433],[433,376],[453,341],[341,464],[464,453],[357,453],[453,465],[465,357],[343,357],[357,412],[412,343],[437,343],[343,399],[399,437],[344,360],[360,440],[440,344],[420,437],[437,456],[456,420],[360,420],[420,363],[363,360],[361,401],[401,288],[288,361],[265,372],[372,353],[353,265],[390,339],[339,249],[249,390],[339,448],[448,255],[255,339]);function Lp(t){t.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]}}var Mt=class extends In{constructor(t,e){super(new li(t,e),"image_in","norm_rect",!1),this.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]},this.outputFacialTransformationMatrixes=this.outputFaceBlendshapes=!1,De(t=this.h=new cg,0,1,e=new Rt),this.A=new og,De(this.h,0,3,this.A),this.u=new Oc,De(this.h,0,2,this.u),Qi(this.u,4,1),Ce(this.u,2,.5),Ce(this.A,2,.5),Ce(this.h,4,.5)}get baseOptions(){return et(this.h,Rt,1)}set baseOptions(t){De(this.h,0,1,t)}o(t){return"numFaces"in t&&Qi(this.u,4,t.numFaces??1),"minFaceDetectionConfidence"in t&&Ce(this.u,2,t.minFaceDetectionConfidence??.5),"minTrackingConfidence"in t&&Ce(this.h,4,t.minTrackingConfidence??.5),"minFacePresenceConfidence"in t&&Ce(this.A,2,t.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in t&&(this.outputFaceBlendshapes=!!t.outputFaceBlendshapes),"outputFacialTransformationMatrixes"in t&&(this.outputFacialTransformationMatrixes=!!t.outputFacialTransformationMatrixes),this.l(t)}F(t,e){return Lp(this),hi(this,t,e),this.j}G(t,e,n){return Lp(this),Ii(this,t,n,e),this.j}m(){var t=new Nn;Tt(t,"image_in"),Tt(t,"norm_rect"),tt(t,"face_landmarks");const e=new Un;Li(e,hy,this.h);const n=new xn;Dn(n,2,"mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"),xt(n,"IMAGE:image_in"),xt(n,"NORM_RECT:norm_rect"),$e(n,"NORM_LANDMARKS:face_landmarks"),n.o(e),jn(t,n),this.g.attachProtoVectorListener("face_landmarks",(i,r)=>{for(const s of i)i=eo(s),this.j.faceLandmarks.push(Bc(i));me(this,r)}),this.g.attachEmptyPacketListener("face_landmarks",i=>{me(this,i)}),this.outputFaceBlendshapes&&(tt(t,"blendshapes"),$e(n,"BLENDSHAPES:blendshapes"),this.g.attachProtoVectorListener("blendshapes",(i,r)=>{if(this.outputFaceBlendshapes)for(const s of i)i=Fc(s),this.j.faceBlendshapes.push(od(i.g()??[]));me(this,r)}),this.g.attachEmptyPacketListener("blendshapes",i=>{me(this,i)})),this.outputFacialTransformationMatrixes&&(tt(t,"face_geometry"),$e(n,"FACE_GEOMETRY:face_geometry"),this.g.attachProtoVectorListener("face_geometry",(i,r)=>{if(this.outputFacialTransformationMatrixes)for(const s of i)(i=et(i=ly(s),ey,2))&&this.j.facialTransformationMatrixes.push({rows:Yn(i,1)??0??0,columns:Yn(i,2)??0??0,data:kr(i,3,Si,Br()).slice()??[]});me(this,r)}),this.g.attachEmptyPacketListener("face_geometry",i=>{me(this,i)})),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};Mt.prototype.detectForVideo=Mt.prototype.G,Mt.prototype.detect=Mt.prototype.F,Mt.prototype.setOptions=Mt.prototype.o,Mt.createFromModelPath=function(t,e){return Ze(Mt,t,{baseOptions:{modelAssetPath:e}})},Mt.createFromModelBuffer=function(t,e){return Ze(Mt,t,{baseOptions:{modelAssetBuffer:e}})},Mt.createFromOptions=function(t,e){return Ze(Mt,t,e)},Mt.FACE_LANDMARKS_LIPS=hd,Mt.FACE_LANDMARKS_LEFT_EYE=ud,Mt.FACE_LANDMARKS_LEFT_EYEBROW=dd,Mt.FACE_LANDMARKS_LEFT_IRIS=Og,Mt.FACE_LANDMARKS_RIGHT_EYE=fd,Mt.FACE_LANDMARKS_RIGHT_EYEBROW=pd,Mt.FACE_LANDMARKS_RIGHT_IRIS=Bg,Mt.FACE_LANDMARKS_FACE_OVAL=md,Mt.FACE_LANDMARKS_CONTOURS=kg,Mt.FACE_LANDMARKS_TESSELATION=zg;var gd=ci([0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]);function Dp(t){t.gestures=[],t.landmarks=[],t.worldLandmarks=[],t.handedness=[]}function Ip(t){return t.gestures.length===0?{gestures:[],landmarks:[],worldLandmarks:[],handedness:[],handednesses:[]}:{gestures:t.gestures,landmarks:t.landmarks,worldLandmarks:t.worldLandmarks,handedness:t.handedness,handednesses:t.handedness}}function Up(t,e=!0){const n=[];for(const r of t){var i=Fc(r);t=[];for(const s of i.g())i=e&&Yn(s,1)!=null?Yn(s,1)??0:-1,t.push({score:Lt(s,2)??0,index:i,categoryName:Qt(yt(s,3))??""??"",displayName:Qt(yt(s,4))??""??""});n.push(t)}return n}var _n=class extends In{constructor(t,e){super(new li(t,e),"image_in","norm_rect",!1),this.gestures=[],this.landmarks=[],this.worldLandmarks=[],this.handedness=[],De(t=this.j=new ug,0,1,e=new Rt),this.u=new id,De(this.j,0,2,this.u),this.D=new nd,De(this.u,0,3,this.D),this.A=new hg,De(this.u,0,2,this.A),this.h=new uy,De(this.j,0,3,this.h),Ce(this.A,2,.5),Ce(this.u,4,.5),Ce(this.D,2,.5)}get baseOptions(){return et(this.j,Rt,1)}set baseOptions(t){De(this.j,0,1,t)}o(t){var r,s,a,o;if(Qi(this.A,3,t.numHands??1),"minHandDetectionConfidence"in t&&Ce(this.A,2,t.minHandDetectionConfidence??.5),"minTrackingConfidence"in t&&Ce(this.u,4,t.minTrackingConfidence??.5),"minHandPresenceConfidence"in t&&Ce(this.D,2,t.minHandPresenceConfidence??.5),t.cannedGesturesClassifierOptions){var e=new _s,n=e,i=qh(t.cannedGesturesClassifierOptions,(r=et(this.h,_s,3))==null?void 0:r.l());De(n,0,2,i),De(this.h,0,3,e)}else t.cannedGesturesClassifierOptions===void 0&&((s=et(this.h,_s,3))==null||s.g());return t.customGesturesClassifierOptions?(De(n=e=new _s,0,2,i=qh(t.customGesturesClassifierOptions,(a=et(this.h,_s,4))==null?void 0:a.l())),De(this.h,0,4,e)):t.customGesturesClassifierOptions===void 0&&((o=et(this.h,_s,4))==null||o.g()),this.l(t)}Ha(t,e){return Dp(this),hi(this,t,e),Ip(this)}Ia(t,e,n){return Dp(this),Ii(this,t,n,e),Ip(this)}m(){var t=new Nn;Tt(t,"image_in"),Tt(t,"norm_rect"),tt(t,"hand_gestures"),tt(t,"hand_landmarks"),tt(t,"world_hand_landmarks"),tt(t,"handedness");const e=new Un;Li(e,dy,this.j);const n=new xn;Dn(n,2,"mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"),xt(n,"IMAGE:image_in"),xt(n,"NORM_RECT:norm_rect"),$e(n,"HAND_GESTURES:hand_gestures"),$e(n,"LANDMARKS:hand_landmarks"),$e(n,"WORLD_LANDMARKS:world_hand_landmarks"),$e(n,"HANDEDNESS:handedness"),n.o(e),jn(t,n),this.g.attachProtoVectorListener("hand_landmarks",(i,r)=>{for(const s of i){i=eo(s);const a=[];for(const o of Ji(i,ng,1))a.push({x:Lt(o,1)??0,y:Lt(o,2)??0,z:Lt(o,3)??0,visibility:Lt(o,4)??0});this.landmarks.push(a)}me(this,r)}),this.g.attachEmptyPacketListener("hand_landmarks",i=>{me(this,i)}),this.g.attachProtoVectorListener("world_hand_landmarks",(i,r)=>{for(const s of i){i=Ts(s);const a=[];for(const o of Ji(i,tg,1))a.push({x:Lt(o,1)??0,y:Lt(o,2)??0,z:Lt(o,3)??0,visibility:Lt(o,4)??0});this.worldLandmarks.push(a)}me(this,r)}),this.g.attachEmptyPacketListener("world_hand_landmarks",i=>{me(this,i)}),this.g.attachProtoVectorListener("hand_gestures",(i,r)=>{this.gestures.push(...Up(i,!1)),me(this,r)}),this.g.attachEmptyPacketListener("hand_gestures",i=>{me(this,i)}),this.g.attachProtoVectorListener("handedness",(i,r)=>{this.handedness.push(...Up(i)),me(this,r)}),this.g.attachEmptyPacketListener("handedness",i=>{me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};function Np(t){return{landmarks:t.landmarks,worldLandmarks:t.worldLandmarks,handednesses:t.handedness,handedness:t.handedness}}_n.prototype.recognizeForVideo=_n.prototype.Ia,_n.prototype.recognize=_n.prototype.Ha,_n.prototype.setOptions=_n.prototype.o,_n.createFromModelPath=function(t,e){return Ze(_n,t,{baseOptions:{modelAssetPath:e}})},_n.createFromModelBuffer=function(t,e){return Ze(_n,t,{baseOptions:{modelAssetBuffer:e}})},_n.createFromOptions=function(t,e){return Ze(_n,t,e)},_n.HAND_CONNECTIONS=gd;var En=class extends In{constructor(t,e){super(new li(t,e),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.handedness=[],De(t=this.h=new id,0,1,e=new Rt),this.u=new nd,De(this.h,0,3,this.u),this.j=new hg,De(this.h,0,2,this.j),Qi(this.j,3,1),Ce(this.j,2,.5),Ce(this.u,2,.5),Ce(this.h,4,.5)}get baseOptions(){return et(this.h,Rt,1)}set baseOptions(t){De(this.h,0,1,t)}o(t){return"numHands"in t&&Qi(this.j,3,t.numHands??1),"minHandDetectionConfidence"in t&&Ce(this.j,2,t.minHandDetectionConfidence??.5),"minTrackingConfidence"in t&&Ce(this.h,4,t.minTrackingConfidence??.5),"minHandPresenceConfidence"in t&&Ce(this.u,2,t.minHandPresenceConfidence??.5),this.l(t)}F(t,e){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],hi(this,t,e),Np(this)}G(t,e,n){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Ii(this,t,n,e),Np(this)}m(){var t=new Nn;Tt(t,"image_in"),Tt(t,"norm_rect"),tt(t,"hand_landmarks"),tt(t,"world_hand_landmarks"),tt(t,"handedness");const e=new Un;Li(e,fy,this.h);const n=new xn;Dn(n,2,"mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"),xt(n,"IMAGE:image_in"),xt(n,"NORM_RECT:norm_rect"),$e(n,"LANDMARKS:hand_landmarks"),$e(n,"WORLD_LANDMARKS:world_hand_landmarks"),$e(n,"HANDEDNESS:handedness"),n.o(e),jn(t,n),this.g.attachProtoVectorListener("hand_landmarks",(i,r)=>{for(const s of i)i=eo(s),this.landmarks.push(Bc(i));me(this,r)}),this.g.attachEmptyPacketListener("hand_landmarks",i=>{me(this,i)}),this.g.attachProtoVectorListener("world_hand_landmarks",(i,r)=>{for(const s of i)i=Ts(s),this.worldLandmarks.push(Da(i));me(this,r)}),this.g.attachEmptyPacketListener("world_hand_landmarks",i=>{me(this,i)}),this.g.attachProtoVectorListener("handedness",(i,r)=>{var s=this.handedness,a=s.push;const o=[];for(const c of i){i=Fc(c);const l=[];for(const h of i.g())l.push({score:Lt(h,2)??0,index:Yn(h,1)??0??-1,categoryName:Qt(yt(h,3))??""??"",displayName:Qt(yt(h,4))??""??""});o.push(l)}a.call(s,...o),me(this,r)}),this.g.attachEmptyPacketListener("handedness",i=>{me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};En.prototype.detectForVideo=En.prototype.G,En.prototype.detect=En.prototype.F,En.prototype.setOptions=En.prototype.o,En.createFromModelPath=function(t,e){return Ze(En,t,{baseOptions:{modelAssetPath:e}})},En.createFromModelBuffer=function(t,e){return Ze(En,t,{baseOptions:{modelAssetBuffer:e}})},En.createFromOptions=function(t,e){return Ze(En,t,e)},En.HAND_CONNECTIONS=gd;var Vg=ci([0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]);function Fp(t){t.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]}}function Op(t){try{if(!t.D)return t.h;t.D(t.h)}finally{zc(t)}}function Oo(t,e){t=eo(t),e.push(Bc(t))}var _t=class extends In{constructor(t,e){super(new li(t,e),"input_frames_image",null,!1),this.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]},this.outputPoseSegmentationMasks=this.outputFaceBlendshapes=!1,De(t=this.j=new gg,0,1,e=new Rt),this.I=new nd,De(this.j,0,2,this.I),this.W=new py,De(this.j,0,3,this.W),this.u=new Oc,De(this.j,0,4,this.u),this.O=new og,De(this.j,0,5,this.O),this.A=new pg,De(this.j,0,6,this.A),this.M=new mg,De(this.j,0,7,this.M),Ce(this.u,2,.5),Ce(this.u,3,.3),Ce(this.O,2,.5),Ce(this.A,2,.5),Ce(this.A,3,.3),Ce(this.M,2,.5),Ce(this.I,2,.5)}get baseOptions(){return et(this.j,Rt,1)}set baseOptions(t){De(this.j,0,1,t)}o(t){return"minFaceDetectionConfidence"in t&&Ce(this.u,2,t.minFaceDetectionConfidence??.5),"minFaceSuppressionThreshold"in t&&Ce(this.u,3,t.minFaceSuppressionThreshold??.3),"minFacePresenceConfidence"in t&&Ce(this.O,2,t.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in t&&(this.outputFaceBlendshapes=!!t.outputFaceBlendshapes),"minPoseDetectionConfidence"in t&&Ce(this.A,2,t.minPoseDetectionConfidence??.5),"minPoseSuppressionThreshold"in t&&Ce(this.A,3,t.minPoseSuppressionThreshold??.3),"minPosePresenceConfidence"in t&&Ce(this.M,2,t.minPosePresenceConfidence??.5),"outputPoseSegmentationMasks"in t&&(this.outputPoseSegmentationMasks=!!t.outputPoseSegmentationMasks),"minHandLandmarksConfidence"in t&&Ce(this.I,2,t.minHandLandmarksConfidence??.5),this.l(t)}F(t,e,n){const i=typeof e!="function"?e:{};return this.D=typeof e=="function"?e:n,Fp(this),hi(this,t,i),Op(this)}G(t,e,n,i){const r=typeof n!="function"?n:{};return this.D=typeof n=="function"?n:i,Fp(this),Ii(this,t,r,e),Op(this)}m(){var t=new Nn;Tt(t,"input_frames_image"),tt(t,"pose_landmarks"),tt(t,"pose_world_landmarks"),tt(t,"face_landmarks"),tt(t,"left_hand_landmarks"),tt(t,"left_hand_world_landmarks"),tt(t,"right_hand_landmarks"),tt(t,"right_hand_world_landmarks");const e=new Un,n=new op;Dn(n,1,"type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"),function(r,s){if(s!=null)if(Array.isArray(s))lt(r,2,bc(s,0,za));else{if(!(typeof s=="string"||s instanceof bi||yu(s)))throw Error("invalid value in Any.value field: "+s+" expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");hr(r,2,bu(s,!1),$r())}}(n,this.j.g());const i=new xn;Dn(i,2,"mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"),Bu(i,8,op,n),xt(i,"IMAGE:input_frames_image"),$e(i,"POSE_LANDMARKS:pose_landmarks"),$e(i,"POSE_WORLD_LANDMARKS:pose_world_landmarks"),$e(i,"FACE_LANDMARKS:face_landmarks"),$e(i,"LEFT_HAND_LANDMARKS:left_hand_landmarks"),$e(i,"LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"),$e(i,"RIGHT_HAND_LANDMARKS:right_hand_landmarks"),$e(i,"RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"),i.o(e),jn(t,i),kc(this,t),this.g.attachProtoListener("pose_landmarks",(r,s)=>{Oo(r,this.h.poseLandmarks),me(this,s)}),this.g.attachEmptyPacketListener("pose_landmarks",r=>{me(this,r)}),this.g.attachProtoListener("pose_world_landmarks",(r,s)=>{var a=this.h.poseWorldLandmarks;r=Ts(r),a.push(Da(r)),me(this,s)}),this.g.attachEmptyPacketListener("pose_world_landmarks",r=>{me(this,r)}),this.outputPoseSegmentationMasks&&($e(i,"POSE_SEGMENTATION_MASK:pose_segmentation_mask"),Gs(this,"pose_segmentation_mask"),this.g.Z("pose_segmentation_mask",(r,s)=>{this.h.poseSegmentationMasks=[Ws(this,r,!0,!this.D)],me(this,s)}),this.g.attachEmptyPacketListener("pose_segmentation_mask",r=>{this.h.poseSegmentationMasks=[],me(this,r)})),this.g.attachProtoListener("face_landmarks",(r,s)=>{Oo(r,this.h.faceLandmarks),me(this,s)}),this.g.attachEmptyPacketListener("face_landmarks",r=>{me(this,r)}),this.outputFaceBlendshapes&&(tt(t,"extra_blendshapes"),$e(i,"FACE_BLENDSHAPES:extra_blendshapes"),this.g.attachProtoListener("extra_blendshapes",(r,s)=>{var a=this.h.faceBlendshapes;this.outputFaceBlendshapes&&(r=Fc(r),a.push(od(r.g()??[]))),me(this,s)}),this.g.attachEmptyPacketListener("extra_blendshapes",r=>{me(this,r)})),this.g.attachProtoListener("left_hand_landmarks",(r,s)=>{Oo(r,this.h.leftHandLandmarks),me(this,s)}),this.g.attachEmptyPacketListener("left_hand_landmarks",r=>{me(this,r)}),this.g.attachProtoListener("left_hand_world_landmarks",(r,s)=>{var a=this.h.leftHandWorldLandmarks;r=Ts(r),a.push(Da(r)),me(this,s)}),this.g.attachEmptyPacketListener("left_hand_world_landmarks",r=>{me(this,r)}),this.g.attachProtoListener("right_hand_landmarks",(r,s)=>{Oo(r,this.h.rightHandLandmarks),me(this,s)}),this.g.attachEmptyPacketListener("right_hand_landmarks",r=>{me(this,r)}),this.g.attachProtoListener("right_hand_world_landmarks",(r,s)=>{var a=this.h.rightHandWorldLandmarks;r=Ts(r),a.push(Da(r)),me(this,s)}),this.g.attachEmptyPacketListener("right_hand_world_landmarks",r=>{me(this,r)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};_t.prototype.detectForVideo=_t.prototype.G,_t.prototype.detect=_t.prototype.F,_t.prototype.setOptions=_t.prototype.o,_t.createFromModelPath=function(t,e){return Ze(_t,t,{baseOptions:{modelAssetPath:e}})},_t.createFromModelBuffer=function(t,e){return Ze(_t,t,{baseOptions:{modelAssetBuffer:e}})},_t.createFromOptions=function(t,e){return Ze(_t,t,e)},_t.HAND_CONNECTIONS=gd,_t.POSE_CONNECTIONS=Vg,_t.FACE_LANDMARKS_LIPS=hd,_t.FACE_LANDMARKS_LEFT_EYE=ud,_t.FACE_LANDMARKS_LEFT_EYEBROW=dd,_t.FACE_LANDMARKS_LEFT_IRIS=Og,_t.FACE_LANDMARKS_RIGHT_EYE=fd,_t.FACE_LANDMARKS_RIGHT_EYEBROW=pd,_t.FACE_LANDMARKS_RIGHT_IRIS=Bg,_t.FACE_LANDMARKS_FACE_OVAL=md,_t.FACE_LANDMARKS_CONTOURS=kg,_t.FACE_LANDMARKS_TESSELATION=zg;var kn=class extends In{constructor(t,e){super(new li(t,e),"input_image","norm_rect",!0),this.j={classifications:[]},De(t=this.h=new _g,0,1,e=new Rt)}get baseOptions(){return et(this.h,Rt,1)}set baseOptions(t){De(this.h,0,1,t)}o(t){return De(this.h,0,2,qh(t,et(this.h,ed,2))),this.l(t)}sa(t,e){return this.j={classifications:[]},hi(this,t,e),this.j}ta(t,e,n){return this.j={classifications:[]},Ii(this,t,n,e),this.j}m(){var t=new Nn;Tt(t,"input_image"),Tt(t,"norm_rect"),tt(t,"classifications");const e=new Un;Li(e,my,this.h);const n=new xn;Dn(n,2,"mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"),xt(n,"IMAGE:input_image"),xt(n,"NORM_RECT:norm_rect"),$e(n,"CLASSIFICATIONS:classifications"),n.o(e),jn(t,n),this.g.attachProtoListener("classifications",(i,r)=>{this.j=Sy(iy(i)),me(this,r)}),this.g.attachEmptyPacketListener("classifications",i=>{me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};kn.prototype.classifyForVideo=kn.prototype.ta,kn.prototype.classify=kn.prototype.sa,kn.prototype.setOptions=kn.prototype.o,kn.createFromModelPath=function(t,e){return Ze(kn,t,{baseOptions:{modelAssetPath:e}})},kn.createFromModelBuffer=function(t,e){return Ze(kn,t,{baseOptions:{modelAssetBuffer:e}})},kn.createFromOptions=function(t,e){return Ze(kn,t,e)};var bn=class extends In{constructor(t,e){super(new li(t,e),"image_in","norm_rect",!0),this.h=new vg,this.embeddings={embeddings:[]},De(t=this.h,0,1,e=new Rt)}get baseOptions(){return et(this.h,Rt,1)}set baseOptions(t){De(this.h,0,1,t)}o(t){var e=this.h,n=et(this.h,gp,2);return n=n?n.clone():new gp,t.l2Normalize!==void 0?lt(n,1,ka(t.l2Normalize)):"l2Normalize"in t&&lt(n,1),t.quantize!==void 0?lt(n,2,ka(t.quantize)):"quantize"in t&&lt(n,2),De(e,0,2,n),this.l(t)}za(t,e){return hi(this,t,e),this.embeddings}Aa(t,e,n){return Ii(this,t,n,e),this.embeddings}m(){var t=new Nn;Tt(t,"image_in"),Tt(t,"norm_rect"),tt(t,"embeddings_out");const e=new Un;Li(e,gy,this.h);const n=new xn;Dn(n,2,"mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"),xt(n,"IMAGE:image_in"),xt(n,"NORM_RECT:norm_rect"),$e(n,"EMBEDDINGS:embeddings_out"),n.o(e),jn(t,n),this.g.attachProtoListener("embeddings_out",(i,r)=>{i=ay(i),this.embeddings=function(s){return{embeddings:Ji(s,sy,1).map(a=>{var l,h;const o={headIndex:Yn(a,3)??0??-1,headName:Qt(yt(a,4))??""??""};var c=a.v;return m0(c,0|c[be],mp,Pl(a,1))!==void 0?(a=kr(a=et(a,mp,Pl(a,1),void 0),1,Si,Br()),o.floatEmbedding=a.slice()):(c=new Uint8Array(0),o.quantizedEmbedding=((h=(l=et(a,ry,Pl(a,2),void 0))==null?void 0:l.na())==null?void 0:h.h())??c),o}),timestampMs:Tg(yt(s,2,void 0,void 0,oc)??h0)}}(i),me(this,r)}),this.g.attachEmptyPacketListener("embeddings_out",i=>{me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};bn.cosineSimilarity=function(t,e){if(t.floatEmbedding&&e.floatEmbedding)t=yp(t.floatEmbedding,e.floatEmbedding);else{if(!t.quantizedEmbedding||!e.quantizedEmbedding)throw Error("Cannot compute cosine similarity between quantized and float embeddings.");t=yp(Sp(t.quantizedEmbedding),Sp(e.quantizedEmbedding))}return t},bn.prototype.embedForVideo=bn.prototype.Aa,bn.prototype.embed=bn.prototype.za,bn.prototype.setOptions=bn.prototype.o,bn.createFromModelPath=function(t,e){return Ze(bn,t,{baseOptions:{modelAssetPath:e}})},bn.createFromModelBuffer=function(t,e){return Ze(bn,t,{baseOptions:{modelAssetBuffer:e}})},bn.createFromOptions=function(t,e){return Ze(bn,t,e)};var Zh=class{constructor(t,e,n){this.confidenceMasks=t,this.categoryMask=e,this.qualityScores=n}close(){var t,e;(t=this.confidenceMasks)==null||t.forEach(n=>{n.close()}),(e=this.categoryMask)==null||e.close()}};function Ry(t){var n,i;const e=function(r){return Ji(r,xn,1)}(t.ca()).filter(r=>(Qt(yt(r,1))??"").includes("mediapipe.tasks.TensorsToSegmentationCalculator"));if(t.u=[],e.length>1)throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");e.length===1&&(((i=(n=et(e[0],Un,7))==null?void 0:n.j())==null?void 0:i.g())??new Map).forEach((r,s)=>{t.u[Number(s)]=Qt(yt(r,1))??""})}function Bp(t){t.categoryMask=void 0,t.confidenceMasks=void 0,t.qualityScores=void 0}function kp(t){try{const e=new Zh(t.confidenceMasks,t.categoryMask,t.qualityScores);if(!t.j)return e;t.j(e)}finally{zc(t)}}Zh.prototype.close=Zh.prototype.close;var gn=class extends In{constructor(t,e){super(new li(t,e),"image_in","norm_rect",!1),this.u=[],this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new ad,this.A=new xg,De(this.h,0,3,this.A),De(t=this.h,0,1,e=new Rt)}get baseOptions(){return et(this.h,Rt,1)}set baseOptions(t){De(this.h,0,1,t)}o(t){return t.displayNamesLocale!==void 0?lt(this.h,2,Za(t.displayNamesLocale)):"displayNamesLocale"in t&&lt(this.h,2),"outputCategoryMask"in t&&(this.outputCategoryMask=t.outputCategoryMask??!1),"outputConfidenceMasks"in t&&(this.outputConfidenceMasks=t.outputConfidenceMasks??!0),super.l(t)}L(){Ry(this)}segment(t,e,n){const i=typeof e!="function"?e:{};return this.j=typeof e=="function"?e:n,Bp(this),hi(this,t,i),kp(this)}La(t,e,n,i){const r=typeof n!="function"?n:{};return this.j=typeof n=="function"?n:i,Bp(this),Ii(this,t,r,e),kp(this)}Da(){return this.u}m(){var t=new Nn;Tt(t,"image_in"),Tt(t,"norm_rect");const e=new Un;Li(e,Sg,this.h);const n=new xn;Dn(n,2,"mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"),xt(n,"IMAGE:image_in"),xt(n,"NORM_RECT:norm_rect"),n.o(e),jn(t,n),kc(this,t),this.outputConfidenceMasks&&(tt(t,"confidence_masks"),$e(n,"CONFIDENCE_MASKS:confidence_masks"),Gs(this,"confidence_masks"),this.g.aa("confidence_masks",(i,r)=>{this.confidenceMasks=i.map(s=>Ws(this,s,!0,!this.j)),me(this,r)}),this.g.attachEmptyPacketListener("confidence_masks",i=>{this.confidenceMasks=[],me(this,i)})),this.outputCategoryMask&&(tt(t,"category_mask"),$e(n,"CATEGORY_MASK:category_mask"),Gs(this,"category_mask"),this.g.Z("category_mask",(i,r)=>{this.categoryMask=Ws(this,i,!1,!this.j),me(this,r)}),this.g.attachEmptyPacketListener("category_mask",i=>{this.categoryMask=void 0,me(this,i)})),tt(t,"quality_scores"),$e(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",(i,r)=>{this.qualityScores=i,me(this,r)}),this.g.attachEmptyPacketListener("quality_scores",i=>{this.categoryMask=void 0,me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};gn.prototype.getLabels=gn.prototype.Da,gn.prototype.segmentForVideo=gn.prototype.La,gn.prototype.segment=gn.prototype.segment,gn.prototype.setOptions=gn.prototype.o,gn.createFromModelPath=function(t,e){return Ze(gn,t,{baseOptions:{modelAssetPath:e}})},gn.createFromModelBuffer=function(t,e){return Ze(gn,t,{baseOptions:{modelAssetBuffer:e}})},gn.createFromOptions=function(t,e){return Ze(gn,t,e)};var Jh=class{constructor(t,e,n){this.confidenceMasks=t,this.categoryMask=e,this.qualityScores=n}close(){var t,e;(t=this.confidenceMasks)==null||t.forEach(n=>{n.close()}),(e=this.categoryMask)==null||e.close()}};Jh.prototype.close=Jh.prototype.close;var mi=class extends In{constructor(t,e){super(new li(t,e),"image_in","norm_rect_in",!1),this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new ad,this.u=new xg,De(this.h,0,3,this.u),De(t=this.h,0,1,e=new Rt)}get baseOptions(){return et(this.h,Rt,1)}set baseOptions(t){De(this.h,0,1,t)}o(t){return"outputCategoryMask"in t&&(this.outputCategoryMask=t.outputCategoryMask??!1),"outputConfidenceMasks"in t&&(this.outputConfidenceMasks=t.outputConfidenceMasks??!0),super.l(t)}segment(t,e,n,i){const r=typeof n!="function"?n:{};if(this.j=typeof n=="function"?n:i,this.qualityScores=this.categoryMask=this.confidenceMasks=void 0,n=this.C+1,i=new yg,e.keypoint&&e.scribble)throw Error("Cannot provide both keypoint and scribble.");if(e.keypoint){var s=new Ul;hr(s,3,ka(!0),!1),hr(s,1,Ca(e.keypoint.x),0),hr(s,2,Ca(e.keypoint.y),0),Pa(i,1,Yh,s)}else{if(!e.scribble)throw Error("Must provide either a keypoint or a scribble.");{const o=new vy;for(s of e.scribble)hr(e=new Ul,3,ka(!0),!1),hr(e,1,Ca(s.x),0),hr(e,2,Ca(s.y),0),Bu(o,1,Ul,e);Pa(i,2,Yh,o)}}this.g.addProtoToStream(i.g(),"mediapipe.tasks.vision.interactive_segmenter.proto.RegionOfInterest","roi_in",n),hi(this,t,r);e:{try{const o=new Jh(this.confidenceMasks,this.categoryMask,this.qualityScores);if(!this.j){var a=o;break e}this.j(o)}finally{zc(this)}a=void 0}return a}m(){var t=new Nn;Tt(t,"image_in"),Tt(t,"roi_in"),Tt(t,"norm_rect_in");const e=new Un;Li(e,Sg,this.h);const n=new xn;Dn(n,2,"mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraphV2"),xt(n,"IMAGE:image_in"),xt(n,"ROI:roi_in"),xt(n,"NORM_RECT:norm_rect_in"),n.o(e),jn(t,n),kc(this,t),this.outputConfidenceMasks&&(tt(t,"confidence_masks"),$e(n,"CONFIDENCE_MASKS:confidence_masks"),Gs(this,"confidence_masks"),this.g.aa("confidence_masks",(i,r)=>{this.confidenceMasks=i.map(s=>Ws(this,s,!0,!this.j)),me(this,r)}),this.g.attachEmptyPacketListener("confidence_masks",i=>{this.confidenceMasks=[],me(this,i)})),this.outputCategoryMask&&(tt(t,"category_mask"),$e(n,"CATEGORY_MASK:category_mask"),Gs(this,"category_mask"),this.g.Z("category_mask",(i,r)=>{this.categoryMask=Ws(this,i,!1,!this.j),me(this,r)}),this.g.attachEmptyPacketListener("category_mask",i=>{this.categoryMask=void 0,me(this,i)})),tt(t,"quality_scores"),$e(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",(i,r)=>{this.qualityScores=i,me(this,r)}),this.g.attachEmptyPacketListener("quality_scores",i=>{this.categoryMask=void 0,me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};mi.prototype.segment=mi.prototype.segment,mi.prototype.setOptions=mi.prototype.o,mi.createFromModelPath=function(t,e){return Ze(mi,t,{baseOptions:{modelAssetPath:e}})},mi.createFromModelBuffer=function(t,e){return Ze(mi,t,{baseOptions:{modelAssetBuffer:e}})},mi.createFromOptions=function(t,e){return Ze(mi,t,e)};var zn=class extends In{constructor(t,e){super(new li(t,e),"input_frame_gpu","norm_rect",!1),this.j={detections:[]},De(t=this.h=new Eg,0,1,e=new Rt)}get baseOptions(){return et(this.h,Rt,1)}set baseOptions(t){De(this.h,0,1,t)}o(t){return t.displayNamesLocale!==void 0?lt(this.h,2,Za(t.displayNamesLocale)):"displayNamesLocale"in t&&lt(this.h,2),t.maxResults!==void 0?Qi(this.h,3,t.maxResults):"maxResults"in t&&lt(this.h,3),t.scoreThreshold!==void 0?Ce(this.h,4,t.scoreThreshold):"scoreThreshold"in t&&lt(this.h,4),t.categoryAllowlist!==void 0?lc(this.h,5,t.categoryAllowlist):"categoryAllowlist"in t&&lt(this.h,5),t.categoryDenylist!==void 0?lc(this.h,6,t.categoryDenylist):"categoryDenylist"in t&&lt(this.h,6),this.l(t)}F(t,e){return this.j={detections:[]},hi(this,t,e),this.j}G(t,e,n){return this.j={detections:[]},Ii(this,t,n,e),this.j}m(){var t=new Nn;Tt(t,"input_frame_gpu"),Tt(t,"norm_rect"),tt(t,"detections");const e=new Un;Li(e,xy,this.h);const n=new xn;Dn(n,2,"mediapipe.tasks.vision.ObjectDetectorGraph"),xt(n,"IMAGE:input_frame_gpu"),xt(n,"NORM_RECT:norm_rect"),$e(n,"DETECTIONS:detections"),n.o(e),jn(t,n),this.g.attachProtoVectorListener("detections",(i,r)=>{for(const s of i)i=eg(s),this.j.detections.push(Ag(i));me(this,r)}),this.g.attachEmptyPacketListener("detections",i=>{me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};zn.prototype.detectForVideo=zn.prototype.G,zn.prototype.detect=zn.prototype.F,zn.prototype.setOptions=zn.prototype.o,zn.createFromModelPath=async function(t,e){return Ze(zn,t,{baseOptions:{modelAssetPath:e}})},zn.createFromModelBuffer=function(t,e){return Ze(zn,t,{baseOptions:{modelAssetBuffer:e}})},zn.createFromOptions=function(t,e){return Ze(zn,t,e)};var Qh=class{constructor(t,e,n){this.landmarks=t,this.worldLandmarks=e,this.segmentationMasks=n}close(){var t;(t=this.segmentationMasks)==null||t.forEach(e=>{e.close()})}};function zp(t){t.landmarks=[],t.worldLandmarks=[],t.segmentationMasks=void 0}function Vp(t){try{const e=new Qh(t.landmarks,t.worldLandmarks,t.segmentationMasks);if(!t.u)return e;t.u(e)}finally{zc(t)}}Qh.prototype.close=Qh.prototype.close;var Tn=class extends In{constructor(t,e){super(new li(t,e),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.outputSegmentationMasks=!1,De(t=this.h=new bg,0,1,e=new Rt),this.A=new mg,De(this.h,0,3,this.A),this.j=new pg,De(this.h,0,2,this.j),Qi(this.j,4,1),Ce(this.j,2,.5),Ce(this.A,2,.5),Ce(this.h,4,.5)}get baseOptions(){return et(this.h,Rt,1)}set baseOptions(t){De(this.h,0,1,t)}o(t){return"numPoses"in t&&Qi(this.j,4,t.numPoses??1),"minPoseDetectionConfidence"in t&&Ce(this.j,2,t.minPoseDetectionConfidence??.5),"minTrackingConfidence"in t&&Ce(this.h,4,t.minTrackingConfidence??.5),"minPosePresenceConfidence"in t&&Ce(this.A,2,t.minPosePresenceConfidence??.5),"outputSegmentationMasks"in t&&(this.outputSegmentationMasks=t.outputSegmentationMasks??!1),this.l(t)}F(t,e,n){const i=typeof e!="function"?e:{};return this.u=typeof e=="function"?e:n,zp(this),hi(this,t,i),Vp(this)}G(t,e,n,i){const r=typeof n!="function"?n:{};return this.u=typeof n=="function"?n:i,zp(this),Ii(this,t,r,e),Vp(this)}m(){var t=new Nn;Tt(t,"image_in"),Tt(t,"norm_rect"),tt(t,"normalized_landmarks"),tt(t,"world_landmarks"),tt(t,"segmentation_masks");const e=new Un;Li(e,My,this.h);const n=new xn;Dn(n,2,"mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"),xt(n,"IMAGE:image_in"),xt(n,"NORM_RECT:norm_rect"),$e(n,"NORM_LANDMARKS:normalized_landmarks"),$e(n,"WORLD_LANDMARKS:world_landmarks"),n.o(e),jn(t,n),kc(this,t),this.g.attachProtoVectorListener("normalized_landmarks",(i,r)=>{this.landmarks=[];for(const s of i)i=eo(s),this.landmarks.push(Bc(i));me(this,r)}),this.g.attachEmptyPacketListener("normalized_landmarks",i=>{this.landmarks=[],me(this,i)}),this.g.attachProtoVectorListener("world_landmarks",(i,r)=>{this.worldLandmarks=[];for(const s of i)i=Ts(s),this.worldLandmarks.push(Da(i));me(this,r)}),this.g.attachEmptyPacketListener("world_landmarks",i=>{this.worldLandmarks=[],me(this,i)}),this.outputSegmentationMasks&&($e(n,"SEGMENTATION_MASK:segmentation_masks"),Gs(this,"segmentation_masks"),this.g.aa("segmentation_masks",(i,r)=>{this.segmentationMasks=i.map(s=>Ws(this,s,!0,!this.u)),me(this,r)}),this.g.attachEmptyPacketListener("segmentation_masks",i=>{this.segmentationMasks=[],me(this,i)})),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};Tn.prototype.detectForVideo=Tn.prototype.G,Tn.prototype.detect=Tn.prototype.F,Tn.prototype.setOptions=Tn.prototype.o,Tn.createFromModelPath=function(t,e){return Ze(Tn,t,{baseOptions:{modelAssetPath:e}})},Tn.createFromModelBuffer=function(t,e){return Ze(Tn,t,{baseOptions:{modelAssetBuffer:e}})},Tn.createFromOptions=function(t,e){return Ze(Tn,t,e)},Tn.POSE_CONNECTIONS=Vg;const ei={WRIST:0,THUMB_TIP:4,INDEX_TIP:8,MIDDLE_TIP:12,INDEX_MCP:5,MIDDLE_MCP:9,RING_MCP:13,PINKY_MCP:17},Bo=[ei.WRIST,ei.INDEX_MCP,ei.MIDDLE_MCP,ei.RING_MCP,ei.PINKY_MCP],Cy={Pointing_Up:"pointing",Open_Palm:"openpalm",Thumb_Up:"thumbsup",Victory:"victory"},Py="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm",Ly="https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",Dy=.1,Iy=600;class Uy{constructor(e=Py,n=null){Le(this,"recognizer",null);Le(this,"wasHandsClose",!1);Le(this,"lastClapMs",0);this.wasmPath=e,this.handednessFilter=n}async init(){const e=await Ur.forVisionTasks(this.wasmPath);this.recognizer=await _n.createFromOptions(e,{baseOptions:{modelAssetPath:Ly,delegate:"GPU"},numHands:2,minHandDetectionConfidence:.35,minHandPresenceConfidence:.35,minTrackingConfidence:.35,runningMode:"VIDEO"})}detect(e,n){if(!this.recognizer)return null;const i=this.recognizer.recognizeForVideo(e,n);if(!i.landmarks||i.landmarks.length===0)return null;let r=!1,s=null;if(i.landmarks.length>=2){const l=i.landmarks[0][ei.MIDDLE_MCP],h=i.landmarks[1][ei.MIDDLE_MCP];s=Math.hypot(l.x-h.x,l.y-h.y);const d=s<Dy;if(d&&!this.wasHandsClose){const u=performance.now();u-this.lastClapMs>Iy&&(this.lastClapMs=u,r=!0)}this.wasHandsClose=d}else this.wasHandsClose=!1;let a=0;if(this.handednessFilter){const l=i.handedness.findIndex(h=>{var d;return((d=h[0])==null?void 0:d.categoryName)===this.handednessFilter});if(l===-1)return r?{gestureName:null,gestureConfidence:0,thumbIndexDist:1,thumbMiddleDist:1,indexTip:{x:.5,y:.5},wrist:{x:.5,y:.5},palmCenter:{x:.5,y:.5},clap:r,twoHandDist:s,landmarks:null}:null;a=l}const o=i.gestures[a]??[],c=this.analyze(i.landmarks[a],o);return c.clap=r,c.twoHandDist=s,c.landmarks=i.landmarks[a].map(l=>({x:l.x,y:l.y,z:l.z})),c}analyze(e,n){const i=e[ei.THUMB_TIP],r=e[ei.INDEX_TIP],s=e[ei.MIDDLE_TIP],a=e[ei.WRIST],o={x:Bo.reduce((f,g)=>f+e[g].x,0)/Bo.length,y:Bo.reduce((f,g)=>f+e[g].y,0)/Bo.length},c=Math.sqrt((i.x-r.x)**2+(i.y-r.y)**2+((i.z??0)-(r.z??0))**2),l=Math.sqrt((i.x-s.x)**2+(i.y-s.y)**2+((i.z??0)-(s.z??0))**2),h=n[0],d=h?Cy[h.categoryName]??null:null,u=(h==null?void 0:h.score)??0;return{gestureName:d,gestureConfidence:u,thumbIndexDist:c,thumbMiddleDist:l,indexTip:{x:r.x,y:r.y},wrist:{x:a.x,y:a.y},palmCenter:o,clap:!1,twoHandDist:null,landmarks:null}}destroy(){var e;(e=this.recognizer)==null||e.close(),this.recognizer=null}}const vs={NOSE_TIP:1,CHIN:152,FOREHEAD:10,LEFT_EAR:234,RIGHT_EAR:454},Ny="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm",Fy="https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";class Oy{constructor(e=Ny){Le(this,"landmarker",null);this.wasmPath=e}async init(){const e=await Ur.forVisionTasks(this.wasmPath);this.landmarker=await Mt.createFromOptions(e,{baseOptions:{modelAssetPath:Fy,delegate:"GPU"},outputFaceBlendshapes:!1,runningMode:"VIDEO",numFaces:1})}detect(e,n){var r;if(!this.landmarker)return null;const i=this.landmarker.detectForVideo(e,n);return(r=i.faceLandmarks)!=null&&r.length?this.analyze(i.faceLandmarks[0]):null}analyze(e){const n=e[vs.NOSE_TIP].x,i=e[vs.LEFT_EAR].x,r=e[vs.RIGHT_EAR].x,s=Math.abs(r-i),a=s>.01?(n-i)/s:.5,o=e[vs.NOSE_TIP].y,c=e[vs.FOREHEAD].y,l=e[vs.CHIN].y,h=Math.abs(l-c),d=h>.01?(o-c)/h:.5;return{gazeX:Math.max(0,Math.min(1,a)),gazeY:Math.max(0,Math.min(1,d))}}destroy(){var e;(e=this.landmarker)==null||e.close(),this.landmarker=null}}const Gp="handface_key_bindings";function By(t){return{" ":"Space",ArrowUp:"↑",ArrowDown:"↓",ArrowLeft:"←",ArrowRight:"→",Escape:"Esc",Backspace:"⌫",Delete:"Del",Enter:"↵",Tab:"Tab",PageUp:"PgUp",PageDown:"PgDn",Home:"Home",End:"End"}[t]??t}class ky{constructor(){Le(this,"bindings",new Map);this.load()}bind(e,n,i){this.bindings.set(e,{gesture:e,key:n,modifiers:i}),this.save()}unbind(e){this.bindings.delete(e),this.save()}getBinding(e){return this.bindings.get(e)}getAll(){return[...this.bindings.values()]}trigger(e){const n=this.bindings.get(e);if(!n)return;const i=n.key,r=n.modifiers??{};if(this.execNative(i,r))return;const s={key:i,bubbles:!0,cancelable:!0,ctrlKey:r.ctrl??!1,altKey:r.alt??!1,shiftKey:r.shift??!1,metaKey:r.meta??!1};document.dispatchEvent(new KeyboardEvent("keydown",s)),document.dispatchEvent(new KeyboardEvent("keyup",s))}execNative(e,n){var r,s,a;const i=e.toLowerCase();return i==="f5"||i==="r"&&n.ctrl?(location.reload(),!0):i==="escape"?(document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),!0):i==="f11"?(document.fullscreenElement?(a=document.exitFullscreen)==null||a.call(document):(s=(r=document.documentElement).requestFullscreen)==null||s.call(r),!0):n.ctrl&&(i==="+"||i==="=")?(document.body.style.zoom=String(parseFloat(document.body.style.zoom||"1")+.1),!0):n.ctrl&&i==="-"?(document.body.style.zoom=String(Math.max(.5,parseFloat(document.body.style.zoom||"1")-.1)),!0):n.ctrl&&i==="0"?(document.body.style.zoom="1",!0):n.alt&&i==="arrowleft"?(history.back(),!0):n.alt&&i==="arrowright"?(history.forward(),!0):!1}save(){try{localStorage.setItem(Gp,JSON.stringify([...this.bindings.entries()]))}catch{}}load(){try{const e=localStorage.getItem(Gp);e&&(this.bindings=new Map(JSON.parse(e)))}catch{}}}const Hp={pointing:{icon:"☝️",label:"Pointing Up",labelKo:"검지 가리키기",builtin:!0,builtinAction:"커서"},openpalm:{icon:"🖐️",label:"Open Palm",labelKo:"펼친 손",builtin:!1},thumbsup:{icon:"👍",label:"Thumbs Up",labelKo:"엄지 위",builtin:!1},victory:{icon:"✌️",label:"Victory",labelKo:"브이",builtin:!1}},ue="hf-",zy=["openpalm","victory","thumbsup"],Vy=["pointing"];class Gy{constructor(e){Le(this,"root");Le(this,"fab");Le(this,"panel");Le(this,"styleEl");Le(this,"isOpen",!1);Le(this,"capturingGesture",null);Le(this,"captureHandler",null);Le(this,"detectedGesture",null);this.mapper=e,this.styleEl=this.injectStyles(),this.fab=this.createFab(),this.panel=this.createPanel(),this.root=document.createElement("div"),this.root.setAttribute("data-handface",""),this.root.appendChild(this.fab),this.root.appendChild(this.panel),document.body.appendChild(this.root),this.fab.addEventListener("click",()=>this.toggle())}setDetected(e,n){this.isOpen&&this.detectedGesture!==e&&(this.detectedGesture=e,this.panel.querySelectorAll(`.${ue}row[data-gesture]`).forEach(i=>{const r=i.dataset.gesture;i.classList.toggle(`${ue}active`,r===e&&n>.6)}))}destroy(){this.stopCapture(),this.styleEl.remove(),this.root.remove()}toggle(){this.isOpen?this.close():this.open()}open(){this.isOpen=!0,this.renderRows(),this.panel.classList.add(`${ue}open`),this.fab.classList.add(`${ue}fab-open`)}close(){this.isOpen=!1,this.stopCapture(),this.panel.classList.remove(`${ue}open`),this.fab.classList.remove(`${ue}fab-open`)}startCapture(e){this.stopCapture(),this.capturingGesture=e,this.captureHandler=n=>{if(n.preventDefault(),n.stopImmediatePropagation(),["Shift","Control","Alt","Meta"].includes(n.key)){document.addEventListener("keydown",this.captureHandler,{once:!0,capture:!0});return}this.mapper.bind(e,n.key,{ctrl:n.ctrlKey||void 0,alt:n.altKey||void 0,shift:n.shiftKey||void 0,meta:n.metaKey||void 0}),this.capturingGesture=null,this.captureHandler=null,this.renderRows()},document.addEventListener("keydown",this.captureHandler,{once:!0,capture:!0}),this.renderRows()}stopCapture(){this.captureHandler&&(document.removeEventListener("keydown",this.captureHandler,{capture:!0}),this.captureHandler=null,this.capturingGesture=null)}createFab(){const e=document.createElement("button");return e.className=`${ue}fab`,e.title="handface 제스처 설정",e.innerHTML="✋",e}createPanel(){const e=document.createElement("div");return e.className=`${ue}panel`,e.innerHTML=`
      <div class="${ue}header">
        <span class="${ue}title">✋ handface</span>
        <button class="${ue}close-btn" title="닫기">✕</button>
      </div>
      <div class="${ue}body">
        <div class="${ue}section-label">기본 동작</div>
        <div class="${ue}builtin-rows"></div>
        <div class="${ue}section-label" style="margin-top:10px">단축키 바인딩</div>
        <div class="${ue}binding-rows"></div>
      </div>
    `,e.querySelector(`.${ue}close-btn`).addEventListener("click",()=>this.close()),e}renderRows(){this.renderBuiltin(),this.renderBindings()}renderBuiltin(){const e=this.panel.querySelector(`.${ue}builtin-rows`);e.innerHTML="",e.appendChild(this.makeReadonlyRow("🤏","엄지+검지 핀치 (빠르게)","클릭",null)),e.appendChild(this.makeReadonlyRow("🤏","핀치 유지 + 이동","드래그",null)),e.appendChild(this.makeReadonlyRow("🤲","양손 거리 조절","줌",null));for(const n of Vy){const i=Hp[n];e.appendChild(this.makeReadonlyRow(i.icon,i.labelKo,i.builtinAction,n))}}renderBindings(){const e=this.panel.querySelector(`.${ue}binding-rows`);e.innerHTML="";for(const n of zy){const i=Hp[n],r=this.mapper.getBinding(n),s=this.capturingGesture===n;e.appendChild(this.makeBindingRow(n,i.icon,i.labelKo,(r==null?void 0:r.key)??null,s))}}makeReadonlyRow(e,n,i,r){const s=document.createElement("div");return s.className=`${ue}row`,r&&(s.dataset.gesture=r),s.innerHTML=`
      <span class="${ue}icon">${e}</span>
      <span class="${ue}name">${n}</span>
      <span class="${ue}badge">${i}</span>
    `,s}makeBindingRow(e,n,i,r,s){var c;const a=document.createElement("div");a.className=`${ue}row`,a.dataset.gesture=e;const o=r?this.buildKeyLabel(this.mapper.getBinding(e)):null;return s?(a.innerHTML=`
        <span class="${ue}icon">${n}</span>
        <span class="${ue}name">${i}</span>
        <span class="${ue}capture-hint">단축키 입력...</span>
        <button class="${ue}cancel-btn">취소</button>
      `,a.querySelector(`.${ue}cancel-btn`).addEventListener("click",()=>{this.stopCapture(),this.renderRows()})):(a.innerHTML=`
        <span class="${ue}icon">${n}</span>
        <span class="${ue}name">${i}</span>
        ${o?`<span class="${ue}key-tag">${o}</span>
             <button class="${ue}bind-btn ${ue}clear-btn" data-gesture="${e}" title="제거">✕</button>`:`<span class="${ue}no-bind">—</span>`}
        <button class="${ue}bind-btn ${ue}edit-btn" data-gesture="${e}" title="단축키 설정">✎</button>
      `,a.querySelector(`.${ue}edit-btn`).addEventListener("click",()=>this.startCapture(e)),(c=a.querySelector(`.${ue}clear-btn`))==null||c.addEventListener("click",()=>{this.mapper.unbind(e),this.renderRows()})),a}buildKeyLabel(e){var i,r,s,a;const n=[];return(i=e.modifiers)!=null&&i.ctrl&&n.push("Ctrl"),(r=e.modifiers)!=null&&r.alt&&n.push("Alt"),(s=e.modifiers)!=null&&s.shift&&n.push("Shift"),(a=e.modifiers)!=null&&a.meta&&n.push("⌘"),n.push(By(e.key)),n.join("+")}injectStyles(){const e=document.createElement("style");return e.dataset.handface="styles",e.textContent=`
      .${ue}fab {
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
      .${ue}fab:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(124,106,247,0.65); }
      .${ue}fab-open  { transform: rotate(20deg) scale(1.05); }

      .${ue}panel {
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
      .${ue}open {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: all;
      }

      .${ue}header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 13px 16px 11px;
        border-bottom: 1px solid rgba(255,255,255,0.07);
      }
      .${ue}title {
        font-weight: 700;
        font-size: 0.85rem;
        letter-spacing: -0.01em;
      }
      .${ue}close-btn {
        background: none;
        border: none;
        color: rgba(221,221,245,0.45);
        cursor: pointer;
        font-size: 0.8rem;
        padding: 2px 4px;
        border-radius: 4px;
        transition: color 0.12s;
      }
      .${ue}close-btn:hover { color: #ddddf5; }

      .${ue}body {
        padding: 12px 14px 14px;
      }
      .${ue}section-label {
        font-size: 0.6rem;
        text-transform: uppercase;
        letter-spacing: 0.11em;
        opacity: 0.35;
        margin-bottom: 7px;
      }

      .${ue}row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 5px 6px;
        border-radius: 8px;
        margin-bottom: 3px;
        transition: background 0.15s;
      }
      .${ue}row.${ue}active {
        background: rgba(124,106,247,0.18);
      }

      .${ue}icon { font-size: 1rem; width: 22px; text-align: center; flex-shrink: 0; }
      .${ue}name { flex: 1; opacity: 0.8; font-size: 0.76rem; }

      .${ue}badge {
        font-size: 0.65rem;
        background: rgba(124,106,247,0.25);
        color: #9d8dff;
        padding: 2px 7px;
        border-radius: 99px;
        white-space: nowrap;
      }

      .${ue}key-tag {
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

      .${ue}no-bind {
        font-size: 0.72rem;
        opacity: 0.3;
      }

      .${ue}bind-btn {
        background: none;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        padding: 2px 5px;
        font-size: 0.75rem;
        transition: background 0.12s, color 0.12s;
        flex-shrink: 0;
      }
      .${ue}edit-btn  { color: rgba(221,221,245,0.45); }
      .${ue}edit-btn:hover  { background: rgba(124,106,247,0.2); color: #9d8dff; }
      .${ue}clear-btn { color: rgba(221,221,245,0.3); }
      .${ue}clear-btn:hover { background: rgba(255,80,80,0.15); color: #ff6b6b; }

      .${ue}capture-hint {
        flex: 1;
        font-size: 0.7rem;
        color: #ffd166;
        animation: ${ue}blink 1s step-end infinite;
      }
      .${ue}cancel-btn {
        background: none;
        border: 1px solid rgba(255,80,80,0.3);
        color: rgba(255,100,100,0.7);
        border-radius: 5px;
        padding: 2px 7px;
        font-size: 0.65rem;
        cursor: pointer;
        flex-shrink: 0;
      }
      .${ue}cancel-btn:hover { background: rgba(255,80,80,0.1); }

      @keyframes ${ue}blink {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.3; }
      }
    `,document.head.appendChild(e),e}}function Wp(t,e,n){return t+n*(e-t)}const Hy=.045,Wy=.12,Xy=300,Yy=500,qy=8,$y=8e3,jy=500,Ky=50,Zy=120,Jy=900,Qy=200,eE=.022,Xp=.04,tE=.65;function nE(t){return t==="right"?"Right":t==="left"?"Left":null}function Yp(t,e,n){return Math.max(0,Math.min(1,(t-e)/(n-e)))}class iE extends XM{constructor(n={}){super();Le(this,"video");Le(this,"detector");Le(this,"gazeDetector",null);Le(this,"rafId",null);Le(this,"stream",null);Le(this,"panel",null);Le(this,"pointerState","idle");Le(this,"wasPinching",!1);Le(this,"mouseDownTime",0);Le(this,"mouseDownPos",{x:0,y:0});Le(this,"lastClickTime",0);Le(this,"lastGestureMs",new Map);Le(this,"rawHandX",.5);Le(this,"rawHandY",.5);Le(this,"_lastLandmarks",null);Le(this,"hoverTimer",null);Le(this,"isHovering",!1);Le(this,"lastMovePos",{x:0,y:0});Le(this,"prevTwoHandDist",null);Le(this,"smoothTwoHandDist",0);Le(this,"smoothX",.5);Le(this,"smoothY",.5);Le(this,"prevRawX",.5);Le(this,"prevRawY",.5);Le(this,"calibrated",!1);Le(this,"zoneX0",0);Le(this,"zoneX1",1);Le(this,"zoneY0",0);Le(this,"zoneY1",1);Le(this,"flipHorizontal");Le(this,"cursorSource");Le(this,"cursorAnchor");Le(this,"cursorMode");Le(this,"sensitivity");Le(this,"activeZone");Le(this,"ownedVideo");Le(this,"mapper",new ky);this.flipHorizontal=n.flipHorizontal??!0,this.cursorSource=n.cursorSource??"hand",this.cursorAnchor=n.cursorAnchor??"palm",this.cursorMode=n.cursorMode??"absolute",this.sensitivity=n.sensitivity??2.5;const i=this.cursorSource==="gaze"?[.35,.35,.65,.65]:[.3,.1,.95,.85];this.activeZone=n.activeZone??i,[this.zoneX0,this.zoneY0,this.zoneX1,this.zoneY1]=this.activeZone,n.video?(this.video=n.video,this.ownedVideo=!1):(this.video=this.createHiddenVideo(),this.ownedVideo=!0),this.detector=new Uy(n.wasmPath,nE(n.handedness??"right")),this.cursorSource==="gaze"&&(this.gazeDetector=new Oy(n.wasmPath))}get handLandmarks(){return this._lastLandmarks}get mediaStream(){return this.stream}async start(){await this.detector.init(),this.gazeDetector&&await this.gazeDetector.init(),this.stream=await navigator.mediaDevices.getUserMedia({video:!0}),this.video.srcObject=this.stream,await new Promise(n=>{this.video.onloadedmetadata=()=>{this.video.play(),n()}}),this.loop()}stop(){var n,i,r;this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),(n=this.stream)==null||n.getTracks().forEach(s=>s.stop()),this.stream=null,this.detector.destroy(),(i=this.gazeDetector)==null||i.destroy(),this.gazeDetector=null,(r=this.panel)==null||r.destroy(),this.panel=null,this.ownedVideo&&this.video.remove(),this.removeAllListeners()}recalibrate(){this.calibrated=!1}createPanel(){return this.panel||(this.panel=new Gy(this.mapper)),this.panel}createHiddenVideo(){const n=document.createElement("video");return n.style.cssText="position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;",document.body.appendChild(n),n}loop(){this.rafId=requestAnimationFrame(()=>{this.tick(),this.rafId!==null&&this.loop()})}tick(){const n=performance.now(),i=this.detector.detect(this.video,n);this._lastLandmarks=(i==null?void 0:i.landmarks)??null;let r,s;if(this.gazeDetector){const l=this.gazeDetector.detect(this.video,n);if(!l){i&&this.processStateMachine(i,this.currentPos());return}r=this.flipHorizontal?1-l.gazeX:l.gazeX,s=l.gazeY}else{if(!i)return;const l=this.cursorAnchor==="index"?i.indexTip:this.cursorAnchor==="palm"?i.palmCenter:i.wrist;r=this.flipHorizontal?1-l.x:l.x,s=l.y}if(i){const l=this.cursorAnchor==="index"?i.indexTip:this.cursorAnchor==="palm"?i.palmCenter:i.wrist;this.rawHandX=this.flipHorizontal?1-l.x:l.x,this.rawHandY=l.y}if(this.pointerState!=="dragging"){let l,h;if(this.cursorMode==="relative"){const g=(r-this.prevRawX)*this.sensitivity,M=(s-this.prevRawY)*this.sensitivity;l=Math.max(0,Math.min(1,this.smoothX+g)),h=Math.max(0,Math.min(1,this.smoothY+M))}else{if(!this.calibrated){const g=(this.activeZone[2]-this.activeZone[0])/2,M=(this.activeZone[3]-this.activeZone[1])/2;this.zoneX0=r-g,this.zoneX1=r+g,this.zoneY0=s-M,this.zoneY1=s+M,this.smoothX=.5,this.smoothY=.5,this.calibrated=!0}l=Yp(r,this.zoneX0,this.zoneX1),h=Yp(s,this.zoneY0,this.zoneY1)}const d=Math.hypot(r-this.prevRawX,s-this.prevRawY),u=Math.min(d/eE,1),f=Xp+u*(tE-Xp);this.smoothX=Wp(this.smoothX,l,f),this.smoothY=Wp(this.smoothY,h,f)}this.prevRawX=r,this.prevRawY=s;const o=this.currentPos();this.emit("move",o),Math.hypot(o.screenX-this.lastMovePos.x,o.screenY-this.lastMovePos.y)>Ky&&(this.lastMovePos={x:o.screenX,y:o.screenY},this.isHovering&&(this.isHovering=!1),this.hoverTimer&&clearTimeout(this.hoverTimer),this.hoverTimer=setTimeout(()=>{this.isHovering=!0,this.emit("hover",this.currentPos())},jy)),i&&this.processStateMachine(i,o)}currentPos(){return{x:this.smoothX,y:this.smoothY,screenX:Math.round(this.smoothX*window.innerWidth),screenY:Math.round(this.smoothY*window.innerHeight)}}processStateMachine(n,i){var g,M;const r=Date.now();let s=!1;if(n.twoHandDist!==null&&this.pointerState==="idle"){if(this.prevTwoHandDist===null)this.smoothTwoHandDist=n.twoHandDist;else{this.smoothTwoHandDist+=(n.twoHandDist-this.smoothTwoHandDist)*.25;const m=this.smoothTwoHandDist-this.prevTwoHandDist;Math.abs(m)>.003&&(this.emit("scroll",{deltaY:-m*Zy*3}),s=!0)}this.prevTwoHandDist=this.smoothTwoHandDist}else this.prevTwoHandDist=null;if(s)return;const a=n.thumbIndexDist<Hy,o=!a&&n.thumbIndexDist>Wy,l=!["openpalm","thumbsup"].includes(n.gestureName??""),h=n.gestureName==="pointing"||n.gestureName==="openpalm",d=a&&!this.wasPinching&&l,u=(o||h)&&this.wasPinching;switch(this.wasPinching=a||this.wasPinching&&!o&&!h,this.pointerState){case"idle":d&&(this.pointerState="mousedown",this.mouseDownTime=r,this.mouseDownPos={x:i.screenX,y:i.screenY},this.emit("mousedown",i));break;case"mousedown":if(u)this.emit("mouseup",i),r-this.mouseDownTime<Xy&&r-this.lastClickTime>Qy&&(this.emit("click",i),r-this.lastClickTime<Yy&&this.emit("dblclick",i),this.lastClickTime=r),this.pointerState="idle";else if(a){const m=i.screenX-this.mouseDownPos.x,p=i.screenY-this.mouseDownPos.y;Math.hypot(m,p)>qy&&(this.pointerState="dragging",this.emit("dragstart",{x:this.rawHandX,y:this.rawHandY,screenX:Math.round(this.rawHandX*window.innerWidth),screenY:Math.round(this.rawHandY*window.innerHeight)}))}break;case"dragging":u||r-this.mouseDownTime>$y?(this.emit("dragend",i),this.emit("mouseup",i),this.wasPinching=!1,this.pointerState="idle"):this.emit("drag",{x:this.rawHandX,y:this.rawHandY,screenX:Math.round(this.rawHandX*window.innerWidth),screenY:Math.round(this.rawHandY*window.innerHeight)});break}const f=n.gestureName;if(f){(g=this.panel)==null||g.setDetected(f,n.gestureConfidence);const m=this.lastGestureMs.get(f)??0;if(r-m>Jy){this.lastGestureMs.set(f,r);const p={gesture:f,...i,confidence:n.gestureConfidence};this.emit(f,p),this.mapper.trigger(f)}}else(M=this.panel)==null||M.setDetected(null,0);s||n.clap&&this.emit("clap",{gesture:"pointing",...i,confidence:1})}}const As="https://whatpull-neuronface.hf.space",Gg="handface-neuronface-v1";class Hg{constructor({apiKey:e="",endpoint:n=As}={}){this._apiKey=e,this._endpoint=(n||As).replace(/\/$/,""),this._listeners=[],this._networkId=null,this._connected=!1,this._initializing=!1}onEvent(e){return this._listeners.push(e),()=>{const n=this._listeners.indexOf(e);n>=0&&this._listeners.splice(n,1)}}emit(e){for(const n of this._listeners)try{n(e)}catch(i){console.error("NeuronFaceBackend listener error:",i)}}async _fetch(e,{method:n="GET",body:i=null}={}){const r=`${this._endpoint}${e}`,s={"Content-Type":"application/json"};this._apiKey&&(s.Authorization=`Bearer ${this._apiKey}`);const a={method:n,headers:s};i!==null&&(a.body=JSON.stringify(i));let o;try{o=await fetch(r,a)}catch(h){throw new Error(`network error: ${h.message}`)}let c=null;if((o.headers.get("content-type")||"").includes("application/json"))try{c=await o.json()}catch{c=null}if(!o.ok){const h=c&&c.detail||`HTTP ${o.status}`;throw new Error(h)}return c}async initialize(){if(this._connected)return{ok:!0,network_id:this._networkId};if(this._initializing){for(;this._initializing;)await new Promise(e=>setTimeout(e,50));if(this._connected)return{ok:!0,network_id:this._networkId}}this._initializing=!0;try{const e=await this._fetch("/networks",{method:"POST",body:{}});this._networkId=e.id;const n=await this._fetch(`/networks/${this._networkId}/presets/basic`,{method:"POST",body:{}}),i=await this._fetch(`/networks/${this._networkId}`);return this._connected=!0,this.emit({type:"connection-status",ok:!0,networkId:this._networkId,neuronsAdded:n.neurons_added,synapsesAdded:n.synapses_added,neurons:i.neurons??[],synapses:i.synapses??[]}),{ok:!0,network_id:this._networkId,neurons:n.neurons_added,synapses:n.synapses_added}}catch(e){return this._connected=!1,this.emit({type:"connection-status",ok:!1,reason:e.message}),{ok:!1,reason:e.message}}finally{this._initializing=!1}}async sendGesture(e,n=1){if(!this._connected||!this._networkId){const r=await this.initialize();if(!r.ok)return{ok:!1,reason:r.reason}}const i={type:"gesture",name:e,intensity:Math.max(0,Math.min(1,n)),stimulus_duration_ms:15,observe_ms:50,detail:"summary"};try{const r=await this._fetch(`/networks/${this._networkId}/handface_and_observe`,{method:"POST",body:i});return this.emit({type:"neuron-firing",gesture:e,intensity:n,response:r}),{ok:!0,response:r}}catch(r){return this.emit({type:"neuron-firing",gesture:e,intensity:n,response:null,error:r.message}),{ok:!1,reason:r.message}}}async testConnection(){try{const e=await this._fetch("/health");return{ok:!0,status:e.status,version:e.version}}catch(e){return{ok:!1,reason:e.message}}}get networkId(){return this._networkId}get connected(){return this._connected}get endpoint(){return this._endpoint}}function Wg(){try{const t=localStorage.getItem(Gg);if(!t)return{apiKey:"",endpoint:As};const e=JSON.parse(t);return{apiKey:typeof e.apiKey=="string"?e.apiKey:"",endpoint:typeof e.endpoint=="string"&&e.endpoint?e.endpoint:As}}catch{return{apiKey:"",endpoint:As}}}function rE({apiKey:t,endpoint:e}){try{return localStorage.setItem(Gg,JSON.stringify({apiKey:t||"",endpoint:e||As})),!0}catch{return!1}}function sE(){const{apiKey:t,endpoint:e}=Wg();return new Hg({apiKey:t,endpoint:e})}let _d=sE();function aE(){const t=document.getElementById("nf-endpoint"),e=document.getElementById("nf-apikey"),n=document.getElementById("nf-save"),i=document.getElementById("nf-test"),r=document.getElementById("nf-status");if(!t||!n||!i)return;const s=Wg();t.value=s.endpoint,e.value=s.apiKey,n.addEventListener("click",()=>{const a=rE({endpoint:t.value.trim(),apiKey:e.value.trim()});r.textContent=a?"saved (reload page to apply)":"save failed"}),i.addEventListener("click",async()=>{r.textContent="testing...";const o=await new Hg({endpoint:t.value.trim(),apiKey:e.value.trim()}).testConnection();r.textContent=o.ok?`OK — ${o.status} (${o.version})`:`FAIL — ${o.reason}`})}aE();const mr=document.getElementById("cursor");document.getElementById("flash");const Fl=document.getElementById("s-status"),qp=document.getElementById("s-pos"),oE=document.getElementById("s-clicks"),cE=document.getElementById("s-zoom"),ko=document.getElementById("log"),Ea=document.getElementById("start-btn"),Ol=document.getElementById("load-msg"),$p=document.getElementById("overlay");function qn(t,e){const n=document.createElement("div");n.className="log-item"+(t?` ${t}`:"");const i=new Date;for(n.textContent=`[${i.getHours()}:${String(i.getMinutes()).padStart(2,"0")}:${String(i.getSeconds()).padStart(2,"0")}] ${e}`,ko.appendChild(n);ko.children.length>9;)ko.removeChild(ko.children[1])}const fa=new OM({antialias:!0});fa.setSize(window.innerWidth,window.innerHeight);fa.setPixelRatio(Math.min(window.devicePixelRatio,2));fa.setClearColor(132104);document.getElementById("canvas-container").appendChild(fa.domElement);const Xs=new d1,Ys=new Gn(50,window.innerWidth/window.innerHeight,.1,200);Ys.position.set(0,1,7.5);Ys.lookAt(0,0,0);let jo=7.5,Bl=7.5;const ni=new Or;Xs.add(ni);function Xg(t=.55){const n=document.createElement("canvas");n.width=n.height=64;const i=n.getContext("2d"),r=i.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);r.addColorStop(0,"rgba(255,255,255,1)"),r.addColorStop(t,"rgba(255,255,255,0.55)"),r.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=r,i.fillRect(0,0,64,64);const s=new E1(n);return s.minFilter=Kt,s.magFilter=Kt,s.needsUpdate=!0,s}const lE=Xg(.5),vd=Xg(.3),Yg=["INPUT","V1","V2","OUT"];let Yi=[6,20,20,4],eu=qg(Yi.length),qs=new Map,tu=[],Rn=null,Hn=null,Wn=null;function qg(t){return Array.from({length:t},(e,n)=>2.45-(2.45-.35)*(n/Math.max(t-1,1)))}function hE(t,e,n){return .5*Math.sin(t*2.3+e*3.7+n*1.9+Math.cos(e*1.3))+.25*Math.sin(t*5.1+e*7.3+n*4.7+Math.sin(n*2.1))+.13*Math.sin(t*11.3+e*13.7+n*9.1)+.06*Math.sin(t*23.7+e*29.3+n*19.9)}function uE(t,e){if(t===1)return[new I(0,0,0)];const n=[],i=Math.PI*(3-Math.sqrt(5)),r=1.3,s=.78,a=1.02,o=.14*e;for(let c=0;c<t;c++){const l=1-c/(t-1)*2,h=Math.sqrt(Math.max(0,1-l*l)),d=i*c;let u=Math.cos(d)*h;const f=l;let g=Math.sin(d)*h,M=1;f<-.25&&(M=.6+.4*((f+1)/.75));const m=f>0?1+.08*f:1;let p=1;u>.2&&f>-.4&&(p+=.25*Math.max(0,u-.2)*(1.2-Math.abs(f))),f>.35&&(p+=.15*(f-.35)),u<-.35&&f>-.3&&(p+=.18*Math.pow(Math.abs(u)-.35,.7)),Math.abs(g)>.3&&f<.15&&(p+=.22*(Math.abs(g)-.3)*(.6-f)),u<-.15&&f<-.3&&(p+=.35*Math.max(0,Math.abs(u+.15)+Math.abs(f+.3)-.08));const S=6,T=.1*hE(u*S,f*S,g*S),y=Math.abs(u)<.12&&f>.1?-.08*(1-Math.abs(u)/.12)*f:0,R=Math.abs(g)>.25&&f>-.15&&f<.25?-.06*Math.max(0,Math.abs(g)-.25):0,A=p*(1+T+y+R);let C=u*e*r*A*m,v=f*e*s*A*M,b=g*e*a*A*m;b+=b>=0?o:-o;const q=e*.11;C+=(Math.random()-.5)*q,v+=(Math.random()-.5)*q,b+=(Math.random()-.5)*q,n.push(new I(C,v,b))}return n}let $s=[],ii=[];function $g(t=null){qs=new Map,$s=Yi.map((e,n)=>{const i=uE(e,eu[n]),r=t?t[n]:null;return i.map((s,a)=>{const o=r?r[a]:null,c={pos:s,activation:0,targetActivation:0,layerIdx:n,layerLocalIdx:a,name:(o==null?void 0:o.name)??null,region:(o==null?void 0:o.region)??Yg[n]??null,population:(o==null?void 0:o.population)??null};return c.name&&qs.set(c.name,c),c})}),ii=$s.flat()}$g();let ri=[],nu=new Set,pc=new Map,Ko=new Map,ws=new Map;function jg(){ri=[],nu=new Set,pc=new Map,Ko=new Map,ws=new Map,ii.forEach((t,e)=>pc.set(t,e))}function Kg(t,e,{weight:n=.5,sign:i=1,synapse:r=null}={}){const s=pc.get(t)*ii.length+pc.get(e);if(nu.has(s))return;nu.add(s);const a=t.layerIdx===e.layerIdx,o={src:t,dst:e,weight:n,targetWeight:n,intra:a,sign:i,synapse:r,flow:0,curve:null,curvePoints:null};ri.push(o),ws.has(t)||ws.set(t,[]),Ko.has(e)||Ko.set(e,[]),ws.get(t).push(o),Ko.get(e).push(o)}function Zg(){jg();const t=2;for(let e=0;e<Yi.length-1;e++){const n=$s[e],i=$s[e+1];for(const r of n){const s=[...i].sort((a,o)=>Math.hypot(a.pos.x-r.pos.x,a.pos.y-r.pos.y,a.pos.z-r.pos.z)-Math.hypot(o.pos.x-r.pos.x,o.pos.y-r.pos.y,o.pos.z-r.pos.z));for(let a=0;a<Math.min(t,s.length);a++)Kg(r,s[a],{weight:.3})}}}function dE(t){jg();for(const e of t??[]){const n=qs.get(e.pre),i=qs.get(e.post);!n||!i||Kg(n,i,{weight:Math.min(1,Math.abs(e.weight)/10),sign:e.weight>=0?1:-1,synapse:e})}}Zg();const fE=new oi({uniforms:{rimColor:{value:new qe(6732799)},rimIntensity:{value:1},rimPower:{value:2.8},coreColor:{value:new qe(1721480)},coreAlpha:{value:.02}},vertexShader:`
    varying vec3 vNormal;
    varying vec3 vViewDir;
    void main() {
      vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
      vNormal  = normalize(normalMatrix * normal);
      vViewDir = normalize(-mvPos.xyz);
      gl_Position = projectionMatrix * mvPos;
    }
  `,fragmentShader:`
    varying vec3 vNormal;
    varying vec3 vViewDir;
    uniform vec3  rimColor;
    uniform float rimIntensity;
    uniform float rimPower;
    uniform vec3  coreColor;
    uniform float coreAlpha;
    void main() {
      // abs() → DoubleSide 에서 앞/뒤 모두 자연스럽게 글로우
      float f   = 1.0 - abs(dot(vViewDir, vNormal));
      float rim = pow(f, rimPower) * rimIntensity;
      vec3  col = rimColor * rim + coreColor * coreAlpha;
      gl_FragColor = vec4(col, rim + coreAlpha);
    }
  `,transparent:!0,blending:Ti,depthWrite:!1,side:vi});(function(){new HM().load(WM,n=>{n.scale.setScalar(2.55),n.traverse(r=>{r.isMesh&&(r.geometry.computeVertexNormals(),r.material=fE)}),ni.add(n),console.log("[handface] Brain OBJ loaded")},void 0,n=>{console.warn("[handface] Brain OBJ failed:",n.message)})})();const kl=document.getElementById("input-grid");if(kl){kl.style.gridTemplateColumns=`repeat(${Yi[0]}, 1fr)`;for(let t=0;t<Yi[0];t++){const e=document.createElement("div");e.className="input-cell";const n=document.createElement("div");n.className="input-cell-fill";const i=document.createElement("div");i.className="input-cell-val",i.textContent="00",e.appendChild(n),e.appendChild(i),kl.appendChild(e)}}const jp=document.getElementById("weight-list"),pE=[];if(jp)for(let t=1;t<Yi.length;t++){const e=document.createElement("div");e.className="weight-row",e.innerHTML=`
      <span class="weight-label">L${t-1}→${t}</span>
      <div class="weight-bar"><div class="weight-fill"></div></div>
      <span class="weight-val">—</span>
    `,jp.appendChild(e),pE.push({fill:e.querySelector(".weight-fill"),val:e.querySelector(".weight-val"),layerIdx:t})}const Kp=document.getElementById("pred-list"),mE=8,gE=[];if(Kp)for(let t=0;t<mE;t++){const e=document.createElement("div");e.className="pred-row",e.innerHTML=`
      <span class="pred-char">·</span>
      <div class="pred-bar"><div class="pred-fill"></div></div>
      <span class="pred-pct">—</span>
    `,Kp.appendChild(e),gE.push({char:e.querySelector(".pred-char"),fill:e.querySelector(".pred-fill"),pct:e.querySelector(".pred-pct")})}function _E(t){var e;switch(t==null?void 0:t.type){case"connection-status":t.ok?(console.info(`[neuronface] connected. network=${t.networkId}, neurons=${t.neuronsAdded}, synapses=${t.synapsesAdded}`),qn("",`⬡ neuronface ${t.neuronsAdded} neurons`),Array.isArray(t.neurons)&&t.neurons.length>0&&(xE(t.neurons,t.synapses),s_(t.synapses))):(console.warn(`[neuronface] connection failed: ${t.reason}`),qn("",`⚠ neuronface: ${t.reason}`));break;case"neuron-firing":if(t.response){const n=t.response,i=(e=n.membrane_response_by_region)==null?void 0:e.V1,r=(i==null?void 0:i.active_count)??0,s=i==null?void 0:i.max_peak_v;if(console.debug(`[neuronface] ${t.gesture} → V1 active=${r} max_peak=${s??"—"}`),n.target&&(em({region:"INPUT",activeNeurons:[n.target]}),r>0)){const a=qs.get(n.target),o=a?ws.get(a):null;if(o){const c=o.map(l=>{var h;return(h=l.dst)==null?void 0:h.name}).filter(l=>l&&l.startsWith("v1_"));c.length>0&&em({region:"V1",activeNeurons:c})}}}else t.error&&console.warn(`[neuronface] ${t.gesture} failed: ${t.error}`);break}}_d.onEvent(_E);const iu=10,Ia=iu*2;function Jg(){console.log(`[handface] nodes: ${ii.length}, edges: ${ri.length}`);const t=new I,e=new I,n=new I,i=new I(0,1,0);ri.forEach((f,g)=>{t.subVectors(f.dst.pos,f.src.pos);const M=t.length(),m=(g*9301+49297)%233280/233280;e.copy(t).normalize(),n.crossVectors(t,i),n.lengthSq()<1e-6&&n.set(1,0,0),n.normalize(),n.applyAxisAngle(e,m*Math.PI*2);const p=M*(.1+m*.08)*(f.intra?1.4:1),S=new I().addVectors(f.src.pos,f.dst.pos).multiplyScalar(.5).addScaledVector(n,p);f.curve=new C1(f.src.pos.clone(),S,f.dst.pos.clone()),f.curvePoints=f.curve.getPoints(iu)});const r=new Float32Array(ri.length*Ia*3),s=new Float32Array(ri.length*Ia*3);ri.forEach((f,g)=>{const M=g*Ia*3,m=f.weight*.12;for(let p=0;p<iu;p++){const S=f.curvePoints[p],T=f.curvePoints[p+1],y=M+p*6;r[y+0]=S.x,r[y+1]=S.y,r[y+2]=S.z,r[y+3]=T.x,r[y+4]=T.y,r[y+5]=T.z,s[y+0]=m,s[y+1]=m*.4,s[y+2]=m*.05,s[y+3]=m,s[y+4]=m*.4,s[y+5]=m*.05}});const a=new Vt;a.setAttribute("position",new an(r,3)),a.setAttribute("color",new an(s,3)),Rn&&(ni.remove(Rn),Rn.geometry.dispose(),Rn.material.dispose(),Rn=null),Rn=new ac(a,new ys({vertexColors:!0,blending:Ti,transparent:!0,depthWrite:!1})),ni.add(Rn);const o=new Float32Array(ii.length*3),c=new Float32Array(ii.length*3),l=new Float32Array(ii.length*3);ii.forEach((f,g)=>{o[g*3]=f.pos.x,o[g*3+1]=f.pos.y,o[g*3+2]=f.pos.z,c[g*3+0]=.08,c[g*3+1]=.03,c[g*3+2]=.01,l[g*3+0]=.2,l[g*3+1]=.08,l[g*3+2]=.02}),Hn&&(ni.remove(Hn),Hn.geometry.dispose(),Hn.material.dispose(),Hn=null),Wn&&(ni.remove(Wn),Wn.geometry.dispose(),Wn.material.dispose(),Wn=null);function h(f,g,M,m){const p=new Vt;p.setAttribute("position",new an(M,3)),p.setAttribute("color",new an(f,3));const S=new Es(p,new fr({vertexColors:!0,size:g,map:m,alphaTest:.01,blending:Ti,transparent:!0,depthWrite:!1}));return ni.add(S),{geo:p,mesh:S}}const d=h(c,.18,o,lE),u=h(l,.065,o,vd);return Hn=d.mesh,Wn=u.mesh,{nodeHaloGeo:d.geo,nodeCoreGeo:u.geo,edgeGeo:a,nHaloArr:c,nCoreArr:l,ePosArr:r,eColArr:s}}let An=Jg();Rn&&(Rn.material.opacity=0);Hn&&(Hn.material.opacity=0);Wn&&(Wn.material.opacity=0);async function vE(t,e=[],n=!1,i=null){if(!t||t.length===0)return;console.log("[neuronface viz] rebuild:",t.length,"layers,",t.reduce((a,o)=>a+o,0),"nodes,",i?`${i.length} synapses`:"no synapse data"),tu.forEach(a=>clearTimeout(a)),tu=[],typeof Vn<"u"&&(Vn.length=0),n||await new Promise(a=>{let o=1;const c=setInterval(()=>{o-=.08,Rn&&(Rn.material.opacity=Math.max(0,o)),Hn&&(Hn.material.opacity=Math.max(0,o)),Wn&&(Wn.material.opacity=Math.max(0,o)),o<=0&&(clearInterval(c),a())},16)}),Yi.length=0,t.forEach(a=>Yi.push(a)),eu.length=0,qg(Yi.length).forEach(a=>eu.push(a));const r=Array.isArray(e)&&e.length?e:null,s=Array.isArray(i)?i:null;$g(r),s?dE(s):Zg(),An=Jg(),await new Promise(a=>{let o=0;const c=setInterval(()=>{o+=.04,Rn&&(Rn.material.opacity=Math.min(1,o)),Hn&&(Hn.material.opacity=Math.min(1,o)),Wn&&(Wn.material.opacity=Math.min(1,o)),o>=1&&(clearInterval(c),a())},16)}),console.log("[neuronface viz] rebuild complete ✅")}function xE(t,e){if(!Array.isArray(t)||t.length===0)return;const n=Yg.map(r=>t.filter(s=>s.region===r)),i=n.map(r=>r.length);vE(i,n,!1,e)}const xd=1200,Vn=[],Zo=new Float32Array(xd*3),Jo=new Float32Array(xd*3),Xr=new Vt;Xr.setAttribute("position",new an(Zo,3));Xr.setAttribute("color",new an(Jo,3));Xr.setDrawRange(0,0);ni.add(new Es(Xr,new fr({vertexColors:!0,size:.11,map:vd,alphaTest:.01,blending:Ti,transparent:!0,depthWrite:!1})));function Zp(t,e=0){Vn.length>=xd||Vn.push({edge:t,t:e,speed:.008+t.weight*.018+Math.random()*.007})}const Vc=new Or;ni.add(Vc);const Qg=new pn(new Ya(.08,20,20),new Qs({color:16772812,blending:Ti,transparent:!0,opacity:.7,depthWrite:!1}));Vc.add(Qg);const e_=new pn(new Ya(.28,20,20),new Qs({color:16746547,blending:Ti,transparent:!0,opacity:.1,depthWrite:!1}));Vc.add(e_);const t_=new Qs({color:16764040,blending:Ti,transparent:!0,opacity:0,depthWrite:!1,side:dn}),Rs=new pn(new Ya(1,32,24),t_);Rs.scale.setScalar(.3);Rs.visible=!1;Vc.add(Rs);let gi=0,Jp=0;const vn={xH:12,yF:-4,yC:8,zB:-14,zF:10,step:2},js=vn.xH*2,Ks=vn.yC-vn.yF,Mr=vn.zF-vn.zB,Md=(vn.yF+vn.yC)/2,Gc=(vn.zB+vn.zF)/2,ME=new Qs({color:264208,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1});function SE(t,e,n,i){const r=[],s=t/2,a=e/2,o=vn.step;for(let l=-s;l<=s+.01;l+=o)r.push(l,-a,0,l,a,0);for(let l=-a;l<=a+.01;l+=o)r.push(-s,l,0,s,l,0);const c=new Vt;return c.setAttribute("position",new wt(r,3)),new ac(c,new ys({color:n,transparent:!0,opacity:i,depthWrite:!1}))}function to(t,e,n,i,r,s,a){const o=new pn(new Xa(t,e),ME);o.position.set(...n),i&&o.rotation.set(...i),Xs.add(o);const c=SE(r,s,2284902,a);c.position.set(...n),i&&c.rotation.set(...i),Xs.add(c)}to(js,Mr,[0,vn.yF,Gc],[-Math.PI/2,0,0],js,Mr,.28);to(js,Mr,[0,vn.yC,Gc],[Math.PI/2,0,0],js,Mr,.14);to(Mr,Ks,[-12,Md,Gc],[0,Math.PI/2,0],Mr,Ks,.22);to(Mr,Ks,[vn.xH,Md,Gc],[0,-Math.PI/2,0],Mr,Ks,.22);to(js,Ks,[0,Md,vn.zB],[0,0,0],js,Ks,.18);Xs.fog=new xu(132104,.02);const n_=2200,Qo=new Float32Array(n_*3);for(let t=0;t<n_;t++){const e=8+Math.random()*22,n=2*Math.PI*Math.random(),i=Math.acos(2*Math.random()-1);Qo[t*3]=e*Math.sin(i)*Math.cos(n),Qo[t*3+1]=e*Math.sin(i)*Math.sin(n),Qo[t*3+2]=e*Math.cos(i)}const i_=new Vt;i_.setAttribute("position",new wt(Qo,3));const r_=new Es(i_,new fr({color:16764057,size:.022,map:vd,alphaTest:.01,blending:Ti,transparent:!0,opacity:.32,depthWrite:!1}));Xs.add(r_);let Qp=0;const yE=600,EE=500;function em({region:t,activeNeurons:e}={}){if(!(!Array.isArray(e)||e.length===0)){for(const n of e){const i=qs.get(n);if(!i)continue;i.targetActivation=1;const r=ws.get(i);if(r)for(const s of r)Zp(s,0),Zp(s,.05+Math.random()*.05);tu.push(setTimeout(()=>{i.targetActivation=0},EE))}t&&console.debug(`[viz] flash ${t}: ${e.length} nodes`)}}function s_(t){if(!Array.isArray(t)||t.length===0)return;let e=0;for(const n of t){const i=Math.abs(n.weight);i>e&&(e=i)}if(!(e<1e-6))for(const n of ri){if(!n.synapse)continue;const i=Math.abs(n.synapse.weight)/e;n.targetWeight=Math.max(.05,Math.min(1,i))}}const sn=new iE({handedness:"right",cursorSource:"hand",cursorAnchor:"index"});let zl=0,Vl=0,Yr=0,Sd=0,ru=0,su=0,tm=0,nm=0,ba=0,Ta=0,im=!1;const rm=.25;sn.on("move",t=>{const e=sn.handLandmarks;if(e&&e[8]){const n=(1-e[8].x)*window.innerWidth,i=e[8].y*window.innerHeight;im?(ba+=(n-ba)*rm,Ta+=(i-Ta)*rm):(ba=n,Ta=i,im=!0),mr.style.left=`${ba}px`,mr.style.top=`${Ta}px`,qp.textContent=`${Math.round(ba)} · ${Math.round(Ta)}`}else mr.style.left=`${t.screenX}px`,mr.style.top=`${t.screenY}px`,qp.textContent=`${t.screenX} · ${t.screenY}`});window.addEventListener("mousemove",t=>{mr.style.left=`${t.clientX}px`,mr.style.top=`${t.clientY}px`});sn.on("mousedown",()=>{mr.classList.add("clicking"),qn("","⬇ mousedown")});sn.on("mouseup",()=>{mr.classList.remove("clicking"),qn("","⬆ mouseup")});sn.on("click",()=>{nm++,oE.textContent=String(nm),qn("ev-click","🤏 click")});sn.on("dblclick",()=>{qn("ev-click","🤏🤏 dblclick")});sn.on("dragstart",t=>{ru=t.screenX,su=t.screenY,qn("","↔ dragstart")});sn.on("drag",t=>{const e=Math.max(-30,Math.min(30,t.screenX-ru)),n=Math.max(-30,Math.min(30,t.screenY-su));Sd+=e*.004,Yr+=n*.003,Yr=Math.max(-1.2,Math.min(1.2,Yr)),ru=t.screenX,su=t.screenY});sn.on("dragend",()=>{qn("","↔ dragend")});let yd=!1,au=0,ou=0;window.addEventListener("mousedown",t=>{yd=!0,au=t.clientX,ou=t.clientY});window.addEventListener("mouseup",()=>{yd=!1});window.addEventListener("mousemove",t=>{yd&&(Sd+=(t.clientX-au)*.005,Yr+=(t.clientY-ou)*.004,Yr=Math.max(-1.2,Math.min(1.2,Yr)),au=t.clientX,ou=t.clientY)});sn.on("scroll",t=>{jo=Math.max(4,Math.min(15,jo+t.deltaY*.055));const e=Math.round((1-(jo-4)/11)*100);cE.textContent=`${e}%`,qn("ev-scroll",t.deltaY>0?"🤲 zoom out":"🤲 zoom in")});const bE={pointing:{label:"☝ pointing"},openpalm:{label:"🤚 open palm"},thumbsup:{label:"👍 thumbs up"},victory:{label:"✌️ victory"}};for(const[t,e]of Object.entries(bE))sn.on(t,n=>{qn("",e.label),_d.sendGesture(t,1)});const zo=new I;let sm=0;document.getElementById("thinking");let Gl=0;function a_(){requestAnimationFrame(a_);const t=performance.now();if(t-sm<1e3/60)return;sm=t,Gl+=.011,t-Qp>yE&&(Qp=t,s_());for(const i of ri)i.weight+=(i.targetWeight-i.weight)*.012;for(const i of ii)i.targetActivation*=.993,i.activation+=(i.targetActivation-i.activation)*.07,i.activation<4e-4&&(i.activation=0);let e=0;for(const i of $s[0])e+=i.activation;e/=$s[0].length,Qg.material.opacity=.55+.3*e+.06*Math.sin(Gl*2.5)+.6*gi,e_.material.opacity=.08+.18*e+.03*Math.sin(Gl*1.5)+.25*gi;const n=e-Jp;if(Jp=e,n>.05&&(gi=1),gi>0){Rs.visible=!0;const i=1-gi,r=1-Math.pow(1-i,3);Rs.scale.setScalar(.3+r*5.5),t_.opacity=gi*gi*.45,gi-=.025,gi<=0&&(gi=0,Rs.visible=!1)}for(let i=0;i<ri.length;i++){const r=ri[i],s=Math.max(r.src.activation*.8,r.dst.activation*.65),a=r.weight*(.12+.88*s),o=a*1,c=a*.4,l=a*.05,h=i*Ia*3;for(let d=0;d<Ia;d++){const u=h+d*3;An.eColArr[u]=o,An.eColArr[u+1]=c,An.eColArr[u+2]=l}}An.edgeGeo.attributes.color.needsUpdate=!0;for(let i=0;i<ii.length;i++){const r=ii[i].activation;An.nHaloArr[i*3+0]=.08+r*.52,An.nHaloArr[i*3+1]=.03+r*.2,An.nHaloArr[i*3+2]=.01+r*.03,An.nCoreArr[i*3+0]=.2+r*.8,An.nCoreArr[i*3+1]=.08+r*.68,An.nCoreArr[i*3+2]=.02+r*.18}An.nodeHaloGeo.attributes.color.needsUpdate=!0,An.nodeCoreGeo.attributes.color.needsUpdate=!0;for(let i=Vn.length-1;i>=0;i--)Vn[i].t+=Vn[i].speed,Vn[i].t>=1&&Vn.splice(i,1);for(let i=0;i<Vn.length;i++){const r=Vn[i];r.edge.curve.getPoint(r.t,zo),Zo[i*3]=zo.x,Zo[i*3+1]=zo.y,Zo[i*3+2]=zo.z;const s=r.t<.12?r.t/.12:r.t>.8?(1-r.t)/.2:1,a=(.55+r.edge.weight*.45)*s;Jo[i*3]=a,Jo[i*3+1]=a*.88,Jo[i*3+2]=a*.42}Xr.setDrawRange(0,Vn.length),Xr.attributes.position.needsUpdate=!0,Xr.attributes.color.needsUpdate=!0,tm+=.0015,zl+=(Yr-zl)*.12,Vl+=(Sd-Vl)*.12,ni.rotation.x=zl,ni.rotation.y=tm+Vl,Bl+=(jo-Bl)*.055,Ys.position.z=Bl,r_.rotation.y+=35e-6,fa.render(Xs,Ys)}a_();Ea.addEventListener("click",async()=>{Ea.disabled=!0,Ea.textContent="LOADING...",Fl.textContent="INIT";try{Ol.textContent="Loading MediaPipe (5-10s)...",await sn.start(),sn.createPanel(),Ol.textContent="Initializing neural circuit...";const t=await _d.initialize();t.ok||console.error(`[neuronface] init failed: ${t.reason}`);const e=document.getElementById("cam-preview"),n=document.getElementById("cam-toggle");sn.mediaStream&&e&&(e.srcObject=sn.mediaStream),n.textContent="📷 HIDE",n==null||n.addEventListener("click",()=>{const i=e.style.display!=="block";e.style.display=i?"block":"none",n.textContent=i?"📷 HIDE":"📷 CAM"}),Fl.textContent="ACTIVE",$p.classList.add("fade-out"),setTimeout(()=>{$p.style.display="none"},650),qn("","start"),document.addEventListener("keydown",i=>{(i.key==="r"||i.key==="R")&&(sn.recalibrate(),qn("","recalibrated"))})}catch(t){Fl.textContent="ERROR",Ol.textContent=`Error: ${t.message}`,Ea.disabled=!1,Ea.textContent="RETRY",console.error(t)}});window.addEventListener("resize",()=>{Ys.aspect=window.innerWidth/window.innerHeight,Ys.updateProjectionMatrix(),fa.setSize(window.innerWidth,window.innerHeight)});
