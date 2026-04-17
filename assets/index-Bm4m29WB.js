var V_=Object.defineProperty;var H_=(t,e,n)=>e in t?V_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var Le=(t,e,n)=>H_(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Iu="183",G_=0,lf=1,W_=2,rc=1,X_=2,Oa=3,ys=0,pn=1,_i=2,Xi=0,Ir=1,Ti=2,hf=3,uf=4,Y_=5,Vs=100,q_=101,$_=102,j_=103,K_=104,Z_=200,J_=201,Q_=202,e1=203,uh=204,dh=205,t1=206,n1=207,i1=208,s1=209,r1=210,a1=211,o1=212,c1=213,l1=214,fh=0,ph=1,mh=2,zr=3,gh=4,_h=5,vh=6,xh=7,Du=0,h1=1,u1=2,Si=0,Fm=1,Nm=2,Om=3,Bm=4,km=5,zm=6,Vm=7,Hm=300,sr=301,Vr=302,pl=303,ml=304,Fc=306,Mh=1e3,Gi=1001,Sh=1002,Qt=1003,d1=1004,So=1005,Zt=1006,gl=1007,Ws=1008,Wn=1009,Gm=1010,Wm=1011,Xa=1012,Uu=1013,Ai=1014,vi=1015,ji=1016,Fu=1017,Nu=1018,Ya=1020,Xm=35902,Ym=35899,qm=1021,$m=1022,ti=1023,Ki=1026,Xs=1027,jm=1028,Ou=1029,Hr=1030,Bu=1031,ku=1033,ac=33776,oc=33777,cc=33778,lc=33779,yh=35840,Eh=35841,bh=35842,Th=35843,Ah=36196,wh=37492,Rh=37496,Ch=37488,Ph=37489,Lh=37490,Ih=37491,Dh=37808,Uh=37809,Fh=37810,Nh=37811,Oh=37812,Bh=37813,kh=37814,zh=37815,Vh=37816,Hh=37817,Gh=37818,Wh=37819,Xh=37820,Yh=37821,qh=36492,$h=36494,jh=36495,Kh=36283,Zh=36284,Jh=36285,Qh=36286,f1=3200,Km=0,p1=1,ps="",Cn="srgb",Gr="srgb-linear",Mc="linear",ot="srgb",fr=7680,df=519,m1=512,g1=513,_1=514,zu=515,v1=516,x1=517,Vu=518,M1=519,ff=35044,pf="300 es",xi=2e3,Sc=2001;function S1(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function yc(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function y1(){const t=yc("canvas");return t.style.display="block",t}const mf={};function gf(...t){const e="THREE."+t.shift();console.log(e,...t)}function Zm(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function Fe(...t){t=Zm(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function et(...t){t=Zm(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function Ec(...t){const e=t.join(" ");e in mf||(mf[e]=!0,Fe(...t))}function E1(t,e,n){return new Promise(function(i,s){function r(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:s();break;case t.TIMEOUT_EXPIRED:setTimeout(r,n);break;default:i()}}setTimeout(r,n)})}const b1={[fh]:ph,[mh]:vh,[gh]:xh,[zr]:_h,[ph]:fh,[vh]:mh,[xh]:gh,[_h]:zr};class oa{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const s=i[e];if(s!==void 0){const r=s.indexOf(n);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],_l=Math.PI/180,eu=180/Math.PI;function no(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(nn[t&255]+nn[t>>8&255]+nn[t>>16&255]+nn[t>>24&255]+"-"+nn[e&255]+nn[e>>8&255]+"-"+nn[e>>16&15|64]+nn[e>>24&255]+"-"+nn[n&63|128]+nn[n>>8&255]+"-"+nn[n>>16&255]+nn[n>>24&255]+nn[i&255]+nn[i>>8&255]+nn[i>>16&255]+nn[i>>24&255]).toLowerCase()}function qe(t,e,n){return Math.max(e,Math.min(n,t))}function T1(t,e){return(t%e+e)%e}function vl(t,e,n){return(1-n)*t+n*e}function ba(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function _n(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}class st{constructor(e=0,n=0){st.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6],this.y=s[1]*n+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=qe(this.x,e.x,n.x),this.y=qe(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=qe(this.x,e,n),this.y=qe(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),s=Math.sin(n),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ca{constructor(e=0,n=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=s}static slerpFlat(e,n,i,s,r,a,o){let c=i[s+0],l=i[s+1],h=i[s+2],d=i[s+3],u=r[a+0],f=r[a+1],g=r[a+2],M=r[a+3];if(d!==M||c!==u||l!==f||h!==g){let m=c*u+l*f+h*g+d*M;m<0&&(u=-u,f=-f,g=-g,M=-M,m=-m);let p=1-o;if(m<.9995){const S=Math.acos(m),T=Math.sin(S);p=Math.sin(p*S)/T,o=Math.sin(o*S)/T,c=c*p+u*o,l=l*p+f*o,h=h*p+g*o,d=d*p+M*o}else{c=c*p+u*o,l=l*p+f*o,h=h*p+g*o,d=d*p+M*o;const S=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=S,l*=S,h*=S,d*=S}}e[n]=c,e[n+1]=l,e[n+2]=h,e[n+3]=d}static multiplyQuaternionsFlat(e,n,i,s,r,a){const o=i[s],c=i[s+1],l=i[s+2],h=i[s+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return e[n]=o*g+h*d+c*f-l*u,e[n+1]=c*g+h*u+l*d-o*f,e[n+2]=l*g+h*f+o*u-c*d,e[n+3]=h*g-o*d-c*u-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,s){return this._x=e,this._y=n,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(s/2),d=o(r/2),u=c(i/2),f=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"YZX":this._x=u*h*d+l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d-u*f*g;break;case"XZY":this._x=u*h*d-l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d+u*f*g;break;default:Fe("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],s=n[4],r=n[8],a=n[1],o=n[5],c=n[9],l=n[2],h=n[6],d=n[10],u=i+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(i>o&&i>d){const f=2*Math.sqrt(1+i-o-d);this._w=(h-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>d){const f=2*Math.sqrt(1+o-i-d);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-i-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const s=Math.min(1,n/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,s=e._y,r=e._z,a=e._w,o=n._x,c=n._y,l=n._z,h=n._w;return this._x=i*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-i*l,this._z=r*h+a*l+i*c-s*o,this._w=a*h-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,n){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let c=1-n;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,n=Math.sin(n*l)/h,this._x=this._x*c+i*n,this._y=this._y*c+s*n,this._z=this._z*c+r*n,this._w=this._w*c+a*n,this._onChangeCallback()}else this._x=this._x*c+i*n,this._y=this._y*c+s*n,this._z=this._z*c+r*n,this._w=this._w*c+a*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(n),r*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(e=0,n=0,i=0){D.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(_f.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(_f.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6]*s,this.y=r[1]*n+r[4]*i+r[7]*s,this.z=r[2]*n+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*n+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*n+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*n+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*n+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*i),h=2*(o*n-r*s),d=2*(r*i-a*n);return this.x=n+c*l+a*d-o*h,this.y=i+c*h+o*l-r*d,this.z=s+c*d+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*n+r[4]*i+r[8]*s,this.y=r[1]*n+r[5]*i+r[9]*s,this.z=r[2]*n+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=qe(this.x,e.x,n.x),this.y=qe(this.y,e.y,n.y),this.z=qe(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=qe(this.x,e,n),this.y=qe(this.y,e,n),this.z=qe(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,s=e.y,r=e.z,a=n.x,o=n.y,c=n.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return xl.copy(this).projectOnVector(e),this.sub(xl)}reflect(e){return this.sub(xl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return n*n+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const s=Math.sin(n)*e;return this.x=s*Math.sin(i),this.y=Math.cos(n)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=s,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const xl=new D,_f=new ca;class ze{constructor(e,n,i,s,r,a,o,c,l){ze.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,s,r,a,o,c,l)}set(e,n,i,s,r,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=n,h[4]=r,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,s=n.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],d=i[7],u=i[2],f=i[5],g=i[8],M=s[0],m=s[3],p=s[6],S=s[1],T=s[4],y=s[7],w=s[2],A=s[5],C=s[8];return r[0]=a*M+o*S+c*w,r[3]=a*m+o*T+c*A,r[6]=a*p+o*y+c*C,r[1]=l*M+h*S+d*w,r[4]=l*m+h*T+d*A,r[7]=l*p+h*y+d*C,r[2]=u*M+f*S+g*w,r[5]=u*m+f*T+g*A,r[8]=u*p+f*y+g*C,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return n*a*h-n*o*l-i*r*h+i*o*c+s*r*l-s*a*c}invert(){const e=this.elements,n=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=h*a-o*l,u=o*c-h*r,f=l*r-a*c,g=n*d+i*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/g;return e[0]=d*M,e[1]=(s*l-h*i)*M,e[2]=(o*i-s*a)*M,e[3]=u*M,e[4]=(h*n-s*c)*M,e[5]=(s*r-o*n)*M,e[6]=f*M,e[7]=(i*c-l*n)*M,e[8]=(a*n-i*r)*M,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+n,0,0,1),this}scale(e,n){return this.premultiply(Ml.makeScale(e,n)),this}rotate(e){return this.premultiply(Ml.makeRotation(-e)),this}translate(e,n){return this.premultiply(Ml.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let s=0;s<9;s++)if(n[s]!==i[s])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ml=new ze,vf=new ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),xf=new ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function A1(){const t={enabled:!0,workingColorSpace:Gr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ot&&(s.r=Yi(s.r),s.g=Yi(s.g),s.b=Yi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ot&&(s.r=Dr(s.r),s.g=Dr(s.g),s.b=Dr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ps?Mc:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ec("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ec("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[Gr]:{primaries:e,whitePoint:i,transfer:Mc,toXYZ:vf,fromXYZ:xf,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Cn},outputColorSpaceConfig:{drawingBufferColorSpace:Cn}},[Cn]:{primaries:e,whitePoint:i,transfer:ot,toXYZ:vf,fromXYZ:xf,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Cn}}}),t}const Ze=A1();function Yi(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Dr(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let pr;class w1{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{pr===void 0&&(pr=yc("canvas")),pr.width=e.width,pr.height=e.height;const s=pr.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=pr}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=yc("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Yi(r[a]/255)*255;return i.putImageData(s,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Yi(n[i]/255)*255):n[i]=Yi(n[i]);return{data:n,width:e.width,height:e.height}}else return Fe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let R1=0;class Hu{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:R1++}),this.uuid=no(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayHeight,n.displayWidth,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Sl(s[a].image)):r.push(Sl(s[a]))}else r=Sl(s);i.url=r}return n||(e.images[this.uuid]=i),i}}function Sl(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?w1.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(Fe("Texture: Unable to serialize Texture."),{})}let C1=0;const yl=new D;class cn extends oa{constructor(e=cn.DEFAULT_IMAGE,n=cn.DEFAULT_MAPPING,i=Gi,s=Gi,r=Zt,a=Ws,o=ti,c=Wn,l=cn.DEFAULT_ANISOTROPY,h=ps){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:C1++}),this.uuid=no(),this.name="",this.source=new Hu(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new st(0,0),this.repeat=new st(1,1),this.center=new st(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(yl).x}get height(){return this.source.getSize(yl).y}get depth(){return this.source.getSize(yl).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){Fe(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const s=this[n];if(s===void 0){Fe(`Texture.setValues(): property '${n}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Hm)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Mh:e.x=e.x-Math.floor(e.x);break;case Gi:e.x=e.x<0?0:1;break;case Sh:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Mh:e.y=e.y-Math.floor(e.y);break;case Gi:e.y=e.y<0?0:1;break;case Sh:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}cn.DEFAULT_IMAGE=null;cn.DEFAULT_MAPPING=Hm;cn.DEFAULT_ANISOTROPY=1;class Dt{constructor(e=0,n=0,i=0,s=1){Dt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,s){return this.x=e,this.y=n,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*n+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*n+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*n+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,s,r;const c=e.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],g=c[9],M=c[2],m=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-M)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+M)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const T=(l+1)/2,y=(f+1)/2,w=(p+1)/2,A=(h+u)/4,C=(d+M)/4,v=(g+m)/4;return T>y&&T>w?T<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(T),s=A/i,r=C/i):y>w?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=A/s,r=v/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=C/r,s=v/r),this.set(i,s,r,n),this}let S=Math.sqrt((m-g)*(m-g)+(d-M)*(d-M)+(u-h)*(u-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(d-M)/S,this.z=(u-h)/S,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=qe(this.x,e.x,n.x),this.y=qe(this.y,e.y,n.y),this.z=qe(this.z,e.z,n.z),this.w=qe(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=qe(this.x,e,n),this.y=qe(this.y,e,n),this.z=qe(this.z,e,n),this.w=qe(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class P1 extends oa{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Zt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new Dt(0,0,e,n),this.scissorTest=!1,this.viewport=new Dt(0,0,e,n),this.textures=[];const s={width:e,height:n,depth:i.depth},r=new cn(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const n={minFilter:Zt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=n,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const s=Object.assign({},e.textures[n].image);this.textures[n].source=new Hu(s)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class yi extends P1{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class Jm extends cn{constructor(e=null,n=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:s},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=Gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class L1 extends cn{constructor(e=null,n=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:s},this.magFilter=Qt,this.minFilter=Qt,this.wrapR=Gi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Tt{constructor(e,n,i,s,r,a,o,c,l,h,d,u,f,g,M,m){Tt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,s,r,a,o,c,l,h,d,u,f,g,M,m)}set(e,n,i,s,r,a,o,c,l,h,d,u,f,g,M,m){const p=this.elements;return p[0]=e,p[4]=n,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=M,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Tt().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinant()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const n=this.elements,i=e.elements,s=1/mr.setFromMatrixColumn(e,0).length(),r=1/mr.setFromMatrixColumn(e,1).length(),a=1/mr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*s,n[1]=i[1]*s,n[2]=i[2]*s,n[3]=0,n[4]=i[4]*r,n[5]=i[5]*r,n[6]=i[6]*r,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const u=a*h,f=a*d,g=o*h,M=o*d;n[0]=c*h,n[4]=-c*d,n[8]=l,n[1]=f+g*l,n[5]=u-M*l,n[9]=-o*c,n[2]=M-u*l,n[6]=g+f*l,n[10]=a*c}else if(e.order==="YXZ"){const u=c*h,f=c*d,g=l*h,M=l*d;n[0]=u+M*o,n[4]=g*o-f,n[8]=a*l,n[1]=a*d,n[5]=a*h,n[9]=-o,n[2]=f*o-g,n[6]=M+u*o,n[10]=a*c}else if(e.order==="ZXY"){const u=c*h,f=c*d,g=l*h,M=l*d;n[0]=u-M*o,n[4]=-a*d,n[8]=g+f*o,n[1]=f+g*o,n[5]=a*h,n[9]=M-u*o,n[2]=-a*l,n[6]=o,n[10]=a*c}else if(e.order==="ZYX"){const u=a*h,f=a*d,g=o*h,M=o*d;n[0]=c*h,n[4]=g*l-f,n[8]=u*l+M,n[1]=c*d,n[5]=M*l+u,n[9]=f*l-g,n[2]=-l,n[6]=o*c,n[10]=a*c}else if(e.order==="YZX"){const u=a*c,f=a*l,g=o*c,M=o*l;n[0]=c*h,n[4]=M-u*d,n[8]=g*d+f,n[1]=d,n[5]=a*h,n[9]=-o*h,n[2]=-l*h,n[6]=f*d+g,n[10]=u-M*d}else if(e.order==="XZY"){const u=a*c,f=a*l,g=o*c,M=o*l;n[0]=c*h,n[4]=-d,n[8]=l*h,n[1]=u*d+M,n[5]=a*h,n[9]=f*d-g,n[2]=g*d-f,n[6]=o*h,n[10]=M*d+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(I1,e,D1)}lookAt(e,n,i){const s=this.elements;return bn.subVectors(e,n),bn.lengthSq()===0&&(bn.z=1),bn.normalize(),ss.crossVectors(i,bn),ss.lengthSq()===0&&(Math.abs(i.z)===1?bn.x+=1e-4:bn.z+=1e-4,bn.normalize(),ss.crossVectors(i,bn)),ss.normalize(),yo.crossVectors(bn,ss),s[0]=ss.x,s[4]=yo.x,s[8]=bn.x,s[1]=ss.y,s[5]=yo.y,s[9]=bn.y,s[2]=ss.z,s[6]=yo.z,s[10]=bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,s=n.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],d=i[5],u=i[9],f=i[13],g=i[2],M=i[6],m=i[10],p=i[14],S=i[3],T=i[7],y=i[11],w=i[15],A=s[0],C=s[4],v=s[8],b=s[12],q=s[1],P=s[5],k=s[9],z=s[13],X=s[2],B=s[6],H=s[10],F=s[14],Q=s[3],K=s[7],le=s[11],ge=s[15];return r[0]=a*A+o*q+c*X+l*Q,r[4]=a*C+o*P+c*B+l*K,r[8]=a*v+o*k+c*H+l*le,r[12]=a*b+o*z+c*F+l*ge,r[1]=h*A+d*q+u*X+f*Q,r[5]=h*C+d*P+u*B+f*K,r[9]=h*v+d*k+u*H+f*le,r[13]=h*b+d*z+u*F+f*ge,r[2]=g*A+M*q+m*X+p*Q,r[6]=g*C+M*P+m*B+p*K,r[10]=g*v+M*k+m*H+p*le,r[14]=g*b+M*z+m*F+p*ge,r[3]=S*A+T*q+y*X+w*Q,r[7]=S*C+T*P+y*B+w*K,r[11]=S*v+T*k+y*H+w*le,r[15]=S*b+T*z+y*F+w*ge,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],M=e[7],m=e[11],p=e[15],S=c*f-l*u,T=o*f-l*d,y=o*u-c*d,w=a*f-l*h,A=a*u-c*h,C=a*d-o*h;return n*(M*S-m*T+p*y)-i*(g*S-m*w+p*A)+s*(g*T-M*w+p*C)-r*(g*y-M*A+m*C)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=n,s[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],M=e[13],m=e[14],p=e[15],S=n*o-i*a,T=n*c-s*a,y=n*l-r*a,w=i*c-s*o,A=i*l-r*o,C=s*l-r*c,v=h*M-d*g,b=h*m-u*g,q=h*p-f*g,P=d*m-u*M,k=d*p-f*M,z=u*p-f*m,X=S*z-T*k+y*P+w*q-A*b+C*v;if(X===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/X;return e[0]=(o*z-c*k+l*P)*B,e[1]=(s*k-i*z-r*P)*B,e[2]=(M*C-m*A+p*w)*B,e[3]=(u*A-d*C-f*w)*B,e[4]=(c*q-a*z-l*b)*B,e[5]=(n*z-s*q+r*b)*B,e[6]=(m*y-g*C-p*T)*B,e[7]=(h*C-u*y+f*T)*B,e[8]=(a*k-o*q+l*v)*B,e[9]=(i*q-n*k-r*v)*B,e[10]=(g*A-M*y+p*S)*B,e[11]=(d*y-h*A-f*S)*B,e[12]=(o*b-a*P-c*v)*B,e[13]=(n*P-i*b+s*v)*B,e[14]=(M*T-g*w-m*S)*B,e[15]=(h*w-d*T+u*S)*B,this}scale(e){const n=this.elements,i=e.x,s=e.y,r=e.z;return n[0]*=i,n[4]*=s,n[8]*=r,n[1]*=i,n[5]*=s,n[9]*=r,n[2]*=i,n[6]*=s,n[10]*=r,n[3]*=i,n[7]*=s,n[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,s))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),s=Math.sin(n),r=1-i,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+i,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,n,s,1,0,0,0,0,1),this}compose(e,n,i){const s=this.elements,r=n._x,a=n._y,o=n._z,c=n._w,l=r+r,h=a+a,d=o+o,u=r*l,f=r*h,g=r*d,M=a*h,m=a*d,p=o*d,S=c*l,T=c*h,y=c*d,w=i.x,A=i.y,C=i.z;return s[0]=(1-(M+p))*w,s[1]=(f+y)*w,s[2]=(g-T)*w,s[3]=0,s[4]=(f-y)*A,s[5]=(1-(u+p))*A,s[6]=(m+S)*A,s[7]=0,s[8]=(g+T)*C,s[9]=(m-S)*C,s[10]=(1-(u+M))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,n,i){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinant();if(r===0)return i.set(1,1,1),n.identity(),this;let a=mr.set(s[0],s[1],s[2]).length();const o=mr.set(s[4],s[5],s[6]).length(),c=mr.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Kn.copy(this);const l=1/a,h=1/o,d=1/c;return Kn.elements[0]*=l,Kn.elements[1]*=l,Kn.elements[2]*=l,Kn.elements[4]*=h,Kn.elements[5]*=h,Kn.elements[6]*=h,Kn.elements[8]*=d,Kn.elements[9]*=d,Kn.elements[10]*=d,n.setFromRotationMatrix(Kn),i.x=a,i.y=o,i.z=c,this}makePerspective(e,n,i,s,r,a,o=xi,c=!1){const l=this.elements,h=2*r/(n-e),d=2*r/(i-s),u=(n+e)/(n-e),f=(i+s)/(i-s);let g,M;if(c)g=r/(a-r),M=a*r/(a-r);else if(o===xi)g=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===Sc)g=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=M,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,s,r,a,o=xi,c=!1){const l=this.elements,h=2/(n-e),d=2/(i-s),u=-(n+e)/(n-e),f=-(i+s)/(i-s);let g,M;if(c)g=1/(a-r),M=a/(a-r);else if(o===xi)g=-2/(a-r),M=-(a+r)/(a-r);else if(o===Sc)g=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=M,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let s=0;s<16;s++)if(n[s]!==i[s])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const mr=new D,Kn=new Tt,I1=new D(0,0,0),D1=new D(1,1,1),ss=new D,yo=new D,bn=new D,Mf=new Tt,Sf=new ca;class wi{constructor(e=0,n=0,i=0,s=wi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,s=this._order){return this._x=e,this._y=n,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(n){case"XYZ":this._y=Math.asin(qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(qe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-qe(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(qe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Fe("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Mf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Mf,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Sf.setFromEuler(this),this.setFromQuaternion(Sf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wi.DEFAULT_ORDER="XYZ";class Qm{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let U1=0;const yf=new D,gr=new ca,Ni=new Tt,Eo=new D,Ta=new D,F1=new D,N1=new ca,Ef=new D(1,0,0),bf=new D(0,1,0),Tf=new D(0,0,1),Af={type:"added"},O1={type:"removed"},_r={type:"childadded",child:null},El={type:"childremoved",child:null};class mn extends oa{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:U1++}),this.uuid=no(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=mn.DEFAULT_UP.clone();const e=new D,n=new wi,i=new ca,s=new D(1,1,1);function r(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Tt},normalMatrix:{value:new ze}}),this.matrix=new Tt,this.matrixWorld=new Tt,this.matrixAutoUpdate=mn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return gr.setFromAxisAngle(e,n),this.quaternion.multiply(gr),this}rotateOnWorldAxis(e,n){return gr.setFromAxisAngle(e,n),this.quaternion.premultiply(gr),this}rotateX(e){return this.rotateOnAxis(Ef,e)}rotateY(e){return this.rotateOnAxis(bf,e)}rotateZ(e){return this.rotateOnAxis(Tf,e)}translateOnAxis(e,n){return yf.copy(e).applyQuaternion(this.quaternion),this.position.add(yf.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(Ef,e)}translateY(e){return this.translateOnAxis(bf,e)}translateZ(e){return this.translateOnAxis(Tf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Ni.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?Eo.copy(e):Eo.set(e,n,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Ta.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ni.lookAt(Ta,Eo,this.up):Ni.lookAt(Eo,Ta,this.up),this.quaternion.setFromRotationMatrix(Ni),s&&(Ni.extractRotation(s.matrixWorld),gr.setFromRotationMatrix(Ni),this.quaternion.premultiply(gr.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(et("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Af),_r.child=e,this.dispatchEvent(_r),_r.child=null):et("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(O1),El.child=e,this.dispatchEvent(El),El.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Ni.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Ni.multiply(e.parent.matrixWorld)),e.applyMatrix4(Ni),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Af),_r.child=e,this.dispatchEvent(_r),_r.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ta,e,F1),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ta,N1,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=n-r[0]*n-r[4]*i-r[8]*s,r[13]+=i-r[1]*n-r[5]*i-r[9]*s,r[14]+=s-r[2]*n-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];r(e.shapes,d)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(n){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const s=e.children[i];this.add(s.clone())}return this}}mn.DEFAULT_UP=new D(0,1,0);mn.DEFAULT_MATRIX_AUTO_UPDATE=!0;mn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ys extends mn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const B1={type:"move"};class bl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ys,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ys,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ys,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const M of e.hand.values()){const m=n.getJointPose(M,i),p=this._getHandJoint(l,M);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&u>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=n.getPose(e.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=n.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(B1)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Ys;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const e0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},rs={h:0,s:0,l:0},bo={h:0,s:0,l:0};function Tl(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class $e{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Cn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ze.colorSpaceToWorking(this,n),this}setRGB(e,n,i,s=Ze.workingColorSpace){return this.r=e,this.g=n,this.b=i,Ze.colorSpaceToWorking(this,s),this}setHSL(e,n,i,s=Ze.workingColorSpace){if(e=T1(e,1),n=qe(n,0,1),i=qe(i,0,1),n===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+n):i+n-i*n,a=2*i-r;this.r=Tl(a,r,e+1/3),this.g=Tl(a,r,e),this.b=Tl(a,r,e-1/3)}return Ze.colorSpaceToWorking(this,s),this}setStyle(e,n=Cn){function i(r){r!==void 0&&parseFloat(r)<1&&Fe("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,n);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,n);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,n);break;default:Fe("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(r,16),n);Fe("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Cn){const i=e0[e.toLowerCase()];return i!==void 0?this.setHex(i,n):Fe("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Yi(e.r),this.g=Yi(e.g),this.b=Yi(e.b),this}copyLinearToSRGB(e){return this.r=Dr(e.r),this.g=Dr(e.g),this.b=Dr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Cn){return Ze.workingToColorSpace(sn.copy(this),e),Math.round(qe(sn.r*255,0,255))*65536+Math.round(qe(sn.g*255,0,255))*256+Math.round(qe(sn.b*255,0,255))}getHexString(e=Cn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Ze.workingColorSpace){Ze.workingToColorSpace(sn.copy(this),n);const i=sn.r,s=sn.g,r=sn.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case i:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-i)/d+2;break;case r:c=(i-s)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,n=Ze.workingColorSpace){return Ze.workingToColorSpace(sn.copy(this),n),e.r=sn.r,e.g=sn.g,e.b=sn.b,e}getStyle(e=Cn){Ze.workingToColorSpace(sn.copy(this),e);const n=sn.r,i=sn.g,s=sn.b;return e!==Cn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,n,i){return this.getHSL(rs),this.setHSL(rs.h+e,rs.s+n,rs.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(rs),e.getHSL(bo);const i=vl(rs.h,bo.h,n),s=vl(rs.s,bo.s,n),r=vl(rs.l,bo.l,n);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*n+r[3]*i+r[6]*s,this.g=r[1]*n+r[4]*i+r[7]*s,this.b=r[2]*n+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const sn=new $e;$e.NAMES=e0;class Gu{constructor(e,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new $e(e),this.density=n}clone(){return new Gu(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class k1 extends mn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new wi,this.environmentIntensity=1,this.environmentRotation=new wi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Zn=new D,Oi=new D,Al=new D,Bi=new D,vr=new D,xr=new D,wf=new D,wl=new D,Rl=new D,Cl=new D,Pl=new Dt,Ll=new Dt,Il=new Dt;class ei{constructor(e=new D,n=new D,i=new D){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,s){s.subVectors(i,n),Zn.subVectors(e,n),s.cross(Zn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,n,i,s,r){Zn.subVectors(s,n),Oi.subVectors(i,n),Al.subVectors(e,n);const a=Zn.dot(Zn),o=Zn.dot(Oi),c=Zn.dot(Al),l=Oi.dot(Oi),h=Oi.dot(Al),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(l*c-o*h)*u,g=(a*h-o*c)*u;return r.set(1-f-g,g,f)}static containsPoint(e,n,i,s){return this.getBarycoord(e,n,i,s,Bi)===null?!1:Bi.x>=0&&Bi.y>=0&&Bi.x+Bi.y<=1}static getInterpolation(e,n,i,s,r,a,o,c){return this.getBarycoord(e,n,i,s,Bi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Bi.x),c.addScaledVector(a,Bi.y),c.addScaledVector(o,Bi.z),c)}static getInterpolatedAttribute(e,n,i,s,r,a){return Pl.setScalar(0),Ll.setScalar(0),Il.setScalar(0),Pl.fromBufferAttribute(e,n),Ll.fromBufferAttribute(e,i),Il.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Pl,r.x),a.addScaledVector(Ll,r.y),a.addScaledVector(Il,r.z),a}static isFrontFacing(e,n,i,s){return Zn.subVectors(i,n),Oi.subVectors(e,n),Zn.cross(Oi).dot(s)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,s){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,n,i,s){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Zn.subVectors(this.c,this.b),Oi.subVectors(this.a,this.b),Zn.cross(Oi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return ei.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return ei.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,s,r){return ei.getInterpolation(e,this.a,this.b,this.c,n,i,s,r)}containsPoint(e){return ei.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return ei.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,s=this.b,r=this.c;let a,o;vr.subVectors(s,i),xr.subVectors(r,i),wl.subVectors(e,i);const c=vr.dot(wl),l=xr.dot(wl);if(c<=0&&l<=0)return n.copy(i);Rl.subVectors(e,s);const h=vr.dot(Rl),d=xr.dot(Rl);if(h>=0&&d<=h)return n.copy(s);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),n.copy(i).addScaledVector(vr,a);Cl.subVectors(e,r);const f=vr.dot(Cl),g=xr.dot(Cl);if(g>=0&&f<=g)return n.copy(r);const M=f*l-c*g;if(M<=0&&l>=0&&g<=0)return o=l/(l-g),n.copy(i).addScaledVector(xr,o);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return wf.subVectors(r,s),o=(d-h)/(d-h+(f-g)),n.copy(s).addScaledVector(wf,o);const p=1/(m+M+u);return a=M*p,o=u*p,n.copy(i).addScaledVector(vr,a).addScaledVector(xr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class io{constructor(e=new D(1/0,1/0,1/0),n=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Jn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Jn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Jn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const r=i.getAttribute("position");if(n===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Jn):Jn.fromBufferAttribute(r,a),Jn.applyMatrix4(e.matrixWorld),this.expandByPoint(Jn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),To.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),To.copy(i.boundingBox)),To.applyMatrix4(e.matrixWorld),this.union(To)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Jn),Jn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Aa),Ao.subVectors(this.max,Aa),Mr.subVectors(e.a,Aa),Sr.subVectors(e.b,Aa),yr.subVectors(e.c,Aa),as.subVectors(Sr,Mr),os.subVectors(yr,Sr),Ps.subVectors(Mr,yr);let n=[0,-as.z,as.y,0,-os.z,os.y,0,-Ps.z,Ps.y,as.z,0,-as.x,os.z,0,-os.x,Ps.z,0,-Ps.x,-as.y,as.x,0,-os.y,os.x,0,-Ps.y,Ps.x,0];return!Dl(n,Mr,Sr,yr,Ao)||(n=[1,0,0,0,1,0,0,0,1],!Dl(n,Mr,Sr,yr,Ao))?!1:(wo.crossVectors(as,os),n=[wo.x,wo.y,wo.z],Dl(n,Mr,Sr,yr,Ao))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Jn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ki[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ki[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ki[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ki[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ki[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ki[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ki[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ki[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ki),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const ki=[new D,new D,new D,new D,new D,new D,new D,new D],Jn=new D,To=new io,Mr=new D,Sr=new D,yr=new D,as=new D,os=new D,Ps=new D,Aa=new D,Ao=new D,wo=new D,Ls=new D;function Dl(t,e,n,i,s){for(let r=0,a=t.length-3;r<=a;r+=3){Ls.fromArray(t,r);const o=s.x*Math.abs(Ls.x)+s.y*Math.abs(Ls.y)+s.z*Math.abs(Ls.z),c=e.dot(Ls),l=n.dot(Ls),h=i.dot(Ls);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Ft=new D,Ro=new st;let z1=0;class ln{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:z1++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=ff,this.updateRanges=[],this.gpuType=vi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=n.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Ro.fromBufferAttribute(this,n),Ro.applyMatrix3(e),this.setXY(n,Ro.x,Ro.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ft.fromBufferAttribute(this,n),Ft.applyMatrix3(e),this.setXYZ(n,Ft.x,Ft.y,Ft.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Ft.fromBufferAttribute(this,n),Ft.applyMatrix4(e),this.setXYZ(n,Ft.x,Ft.y,Ft.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Ft.fromBufferAttribute(this,n),Ft.applyNormalMatrix(e),this.setXYZ(n,Ft.x,Ft.y,Ft.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Ft.fromBufferAttribute(this,n),Ft.transformDirection(e),this.setXYZ(n,Ft.x,Ft.y,Ft.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=ba(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=_n(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=ba(n,this.array)),n}setX(e,n){return this.normalized&&(n=_n(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=ba(n,this.array)),n}setY(e,n){return this.normalized&&(n=_n(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=ba(n,this.array)),n}setZ(e,n){return this.normalized&&(n=_n(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=ba(n,this.array)),n}setW(e,n){return this.normalized&&(n=_n(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=_n(n,this.array),i=_n(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,s){return e*=this.itemSize,this.normalized&&(n=_n(n,this.array),i=_n(i,this.array),s=_n(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,n,i,s,r){return e*=this.itemSize,this.normalized&&(n=_n(n,this.array),i=_n(i,this.array),s=_n(s,this.array),r=_n(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ff&&(e.usage=this.usage),e}}class t0 extends ln{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class n0 extends ln{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class Rt extends ln{constructor(e,n,i){super(new Float32Array(e),n,i)}}const V1=new io,wa=new D,Ul=new D;class so{constructor(e=new D,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):V1.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;wa.subVectors(e,this.center);const n=wa.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),s=(i-this.radius)*.5;this.center.addScaledVector(wa,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ul.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(wa.copy(e.center).add(Ul)),this.expandByPoint(wa.copy(e.center).sub(Ul))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let H1=0;const Bn=new Tt,Fl=new mn,Er=new D,Tn=new io,Ra=new io,$t=new D;class Ht extends oa{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:H1++}),this.uuid=no(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(S1(e)?n0:t0)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new ze().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Bn.makeRotationFromQuaternion(e),this.applyMatrix4(Bn),this}rotateX(e){return Bn.makeRotationX(e),this.applyMatrix4(Bn),this}rotateY(e){return Bn.makeRotationY(e),this.applyMatrix4(Bn),this}rotateZ(e){return Bn.makeRotationZ(e),this.applyMatrix4(Bn),this}translate(e,n,i){return Bn.makeTranslation(e,n,i),this.applyMatrix4(Bn),this}scale(e,n,i){return Bn.makeScale(e,n,i),this.applyMatrix4(Bn),this}lookAt(e){return Fl.lookAt(e),Fl.updateMatrix(),this.applyMatrix4(Fl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Er).negate(),this.translate(Er.x,Er.y,Er.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Rt(i,3))}else{const i=Math.min(e.length,n.count);for(let s=0;s<i;s++){const r=e[s];n.setXYZ(s,r.x,r.y,r.z||0)}e.length>n.count&&Fe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new io);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,s=n.length;i<s;i++){const r=n[i];Tn.setFromBufferAttribute(r),this.morphTargetsRelative?($t.addVectors(this.boundingBox.min,Tn.min),this.boundingBox.expandByPoint($t),$t.addVectors(this.boundingBox.max,Tn.max),this.boundingBox.expandByPoint($t)):(this.boundingBox.expandByPoint(Tn.min),this.boundingBox.expandByPoint(Tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&et('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new so);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){et("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const i=this.boundingSphere.center;if(Tn.setFromBufferAttribute(e),n)for(let r=0,a=n.length;r<a;r++){const o=n[r];Ra.setFromBufferAttribute(o),this.morphTargetsRelative?($t.addVectors(Tn.min,Ra.min),Tn.expandByPoint($t),$t.addVectors(Tn.max,Ra.max),Tn.expandByPoint($t)):(Tn.expandByPoint(Ra.min),Tn.expandByPoint(Ra.max))}Tn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)$t.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared($t));if(n)for(let r=0,a=n.length;r<a;r++){const o=n[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)$t.fromBufferAttribute(o,l),c&&(Er.fromBufferAttribute(e,l),$t.add(Er)),s=Math.max(s,i.distanceToSquared($t))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&et('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){et("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,s=n.normal,r=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ln(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let v=0;v<i.count;v++)o[v]=new D,c[v]=new D;const l=new D,h=new D,d=new D,u=new st,f=new st,g=new st,M=new D,m=new D;function p(v,b,q){l.fromBufferAttribute(i,v),h.fromBufferAttribute(i,b),d.fromBufferAttribute(i,q),u.fromBufferAttribute(r,v),f.fromBufferAttribute(r,b),g.fromBufferAttribute(r,q),h.sub(l),d.sub(l),f.sub(u),g.sub(u);const P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(M.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(P),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),o[v].add(M),o[b].add(M),o[q].add(M),c[v].add(m),c[b].add(m),c[q].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:e.count}]);for(let v=0,b=S.length;v<b;++v){const q=S[v],P=q.start,k=q.count;for(let z=P,X=P+k;z<X;z+=3)p(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const T=new D,y=new D,w=new D,A=new D;function C(v){w.fromBufferAttribute(s,v),A.copy(w);const b=o[v];T.copy(b),T.sub(w.multiplyScalar(w.dot(b))).normalize(),y.crossVectors(A,b);const P=y.dot(c[v])<0?-1:1;a.setXYZW(v,T.x,T.y,T.z,P)}for(let v=0,b=S.length;v<b;++v){const q=S[v],P=q.start,k=q.count;for(let z=P,X=P+k;z<X;z+=3)C(e.getX(z+0)),C(e.getX(z+1)),C(e.getX(z+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new ln(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);const s=new D,r=new D,a=new D,o=new D,c=new D,l=new D,h=new D,d=new D;if(e)for(let u=0,f=e.count;u<f;u+=3){const g=e.getX(u+0),M=e.getX(u+1),m=e.getX(u+2);s.fromBufferAttribute(n,g),r.fromBufferAttribute(n,M),a.fromBufferAttribute(n,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,M),l.fromBufferAttribute(i,m),o.add(h),c.add(h),l.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(M,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,f=n.count;u<f;u+=3)s.fromBufferAttribute(n,u+0),r.fromBufferAttribute(n,u+1),a.fromBufferAttribute(n,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)$t.fromBufferAttribute(e,n),$t.normalize(),e.setXYZ(n,$t.x,$t.y,$t.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h);let f=0,g=0;for(let M=0,m=c.length;M<m;M++){o.isInterleavedBufferAttribute?f=c[M]*o.data.stride+o.offset:f=c[M]*h;for(let p=0;p<h;p++)u[g++]=l[f++]}return new ln(u,h,d)}if(this.index===null)return Fe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Ht,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,i);n.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){const u=l[h],f=e(u,i);c.push(f)}n.morphAttributes[o]=c}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];n.addGroup(l.start,l.count,l.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d];h.push(f.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(n))}const r=e.morphAttributes;for(const l in r){const h=[],d=r[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(n));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let G1=0;class Zi extends oa{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:G1++}),this.uuid=no(),this.name="",this.type="Material",this.blending=Ir,this.side=ys,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=uh,this.blendDst=dh,this.blendEquation=Vs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $e(0,0,0),this.blendAlpha=0,this.depthFunc=zr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=df,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fr,this.stencilZFail=fr,this.stencilZPass=fr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){Fe(`Material: parameter '${n}' has value of undefined.`);continue}const s=this[n];if(s===void 0){Fe(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ir&&(i.blending=this.blending),this.side!==ys&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==uh&&(i.blendSrc=this.blendSrc),this.blendDst!==dh&&(i.blendDst=this.blendDst),this.blendEquation!==Vs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==zr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==df&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==fr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==fr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(n){const r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const s=n.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=n[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const zi=new D,Nl=new D,Co=new D,cs=new D,Ol=new D,Po=new D,Bl=new D;class Wu{constructor(e=new D,n=new D(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,zi)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=zi.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(zi.copy(this.origin).addScaledVector(this.direction,n),zi.distanceToSquared(e))}distanceSqToSegment(e,n,i,s){Nl.copy(e).add(n).multiplyScalar(.5),Co.copy(n).sub(e).normalize(),cs.copy(this.origin).sub(Nl);const r=e.distanceTo(n)*.5,a=-this.direction.dot(Co),o=cs.dot(this.direction),c=-cs.dot(Co),l=cs.lengthSq(),h=Math.abs(1-a*a);let d,u,f,g;if(h>0)if(d=a*c-o,u=a*o-c,g=r*h,d>=0)if(u>=-g)if(u<=g){const M=1/h;d*=M,u*=M,f=d*(d+a*u+2*o)+u*(a*d+u+2*c)+l}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-r,-c),r),f=u*(u+2*c)+l):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Nl).addScaledVector(Co,u),f}intersectSphere(e,n){zi.subVectors(e.center,this.origin);const i=zi.dot(this.direction),s=zi.dot(zi)-i*i,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,n):this.at(o,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,s=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,s=(e.min.x-u.x)*l),h>=0?(r=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(r=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-u.z)*d,c=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,c=(e.min.z-u.z)*d),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,n)}intersectsBox(e){return this.intersectBox(e,zi)!==null}intersectTriangle(e,n,i,s,r){Ol.subVectors(n,e),Po.subVectors(i,e),Bl.crossVectors(Ol,Po);let a=this.direction.dot(Bl),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;cs.subVectors(this.origin,e);const c=o*this.direction.dot(Po.crossVectors(cs,Po));if(c<0)return null;const l=o*this.direction.dot(Ol.cross(cs));if(l<0||c+l>a)return null;const h=-o*cs.dot(Bl);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class la extends Zi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.combine=Du,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Rf=new Tt,Is=new Wu,Lo=new so,Cf=new D,Io=new D,Do=new D,Uo=new D,kl=new D,Fo=new D,Pf=new D,No=new D;class gn extends mn{constructor(e=new Ht,n=new la){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,n){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Fo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],d=r[c];h!==0&&(kl.fromBufferAttribute(d,e),a?Fo.addScaledVector(kl,h):Fo.addScaledVector(kl.sub(n),h))}n.add(Fo)}return n}raycast(e,n){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Lo.copy(i.boundingSphere),Lo.applyMatrix4(r),Is.copy(e.ray).recast(e.near),!(Lo.containsPoint(Is.origin)===!1&&(Is.intersectSphere(Lo,Cf)===null||Is.origin.distanceToSquared(Cf)>(e.far-e.near)**2))&&(Rf.copy(r).invert(),Is.copy(e.ray).applyMatrix4(Rf),!(i.boundingBox!==null&&Is.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,Is)))}_computeIntersections(e,n,i){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,M=u.length;g<M;g++){const m=u[g],p=a[m.materialIndex],S=Math.max(m.start,f.start),T=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let y=S,w=T;y<w;y+=3){const A=o.getX(y),C=o.getX(y+1),v=o.getX(y+2);s=Oo(this,p,e,i,l,h,d,A,C,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,n.push(s))}}else{const g=Math.max(0,f.start),M=Math.min(o.count,f.start+f.count);for(let m=g,p=M;m<p;m+=3){const S=o.getX(m),T=o.getX(m+1),y=o.getX(m+2);s=Oo(this,a,e,i,l,h,d,S,T,y),s&&(s.faceIndex=Math.floor(m/3),n.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,M=u.length;g<M;g++){const m=u[g],p=a[m.materialIndex],S=Math.max(m.start,f.start),T=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let y=S,w=T;y<w;y+=3){const A=y,C=y+1,v=y+2;s=Oo(this,p,e,i,l,h,d,A,C,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,n.push(s))}}else{const g=Math.max(0,f.start),M=Math.min(c.count,f.start+f.count);for(let m=g,p=M;m<p;m+=3){const S=m,T=m+1,y=m+2;s=Oo(this,a,e,i,l,h,d,S,T,y),s&&(s.faceIndex=Math.floor(m/3),n.push(s))}}}}function W1(t,e,n,i,s,r,a,o){let c;if(e.side===pn?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,e.side===ys,o),c===null)return null;No.copy(o),No.applyMatrix4(t.matrixWorld);const l=n.ray.origin.distanceTo(No);return l<n.near||l>n.far?null:{distance:l,point:No.clone(),object:t}}function Oo(t,e,n,i,s,r,a,o,c,l){t.getVertexPosition(o,Io),t.getVertexPosition(c,Do),t.getVertexPosition(l,Uo);const h=W1(t,e,n,i,Io,Do,Uo,Pf);if(h){const d=new D;ei.getBarycoord(Pf,Io,Do,Uo,d),s&&(h.uv=ei.getInterpolatedAttribute(s,o,c,l,d,new st)),r&&(h.uv1=ei.getInterpolatedAttribute(r,o,c,l,d,new st)),a&&(h.normal=ei.getInterpolatedAttribute(a,o,c,l,d,new D),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new D,materialIndex:0};ei.getNormal(Io,Do,Uo,u.normal),h.face=u,h.barycoord=d}return h}class X1 extends cn{constructor(e=null,n=1,i=1,s,r,a,o,c,l=Qt,h=Qt,d,u){super(null,a,o,c,l,h,s,r,d,u),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const zl=new D,Y1=new D,q1=new ze;class Bs{constructor(e=new D(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,s){return this.normal.set(e,n,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const s=zl.subVectors(i,n).cross(Y1.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(zl),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:n.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||q1.getNormalMatrix(e),s=this.coplanarPoint(zl).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ds=new so,$1=new st(.5,.5),Bo=new D;class i0{constructor(e=new Bs,n=new Bs,i=new Bs,s=new Bs,r=new Bs,a=new Bs){this.planes=[e,n,i,s,r,a]}set(e,n,i,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=xi,i=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],M=r[9],m=r[10],p=r[11],S=r[12],T=r[13],y=r[14],w=r[15];if(s[0].setComponents(l-a,f-h,p-g,w-S).normalize(),s[1].setComponents(l+a,f+h,p+g,w+S).normalize(),s[2].setComponents(l+o,f+d,p+M,w+T).normalize(),s[3].setComponents(l-o,f-d,p-M,w-T).normalize(),i)s[4].setComponents(c,u,m,y).normalize(),s[5].setComponents(l-c,f-u,p-m,w-y).normalize();else if(s[4].setComponents(l-c,f-u,p-m,w-y).normalize(),n===xi)s[5].setComponents(l+c,f+u,p+m,w+y).normalize();else if(n===Sc)s[5].setComponents(c,u,m,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ds.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Ds.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ds)}intersectsSprite(e){Ds.center.set(0,0,0);const n=$1.distanceTo(e.center);return Ds.radius=.7071067811865476+n,Ds.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ds)}intersectsSphere(e){const n=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(n[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const s=n[i];if(Bo.x=s.normal.x>0?e.max.x:e.min.x,Bo.y=s.normal.y>0?e.max.y:e.min.y,Bo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Bo)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Ur extends Zi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new $e(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const bc=new D,Tc=new D,Lf=new Tt,Ca=new Wu,ko=new so,Vl=new D,If=new D;class j1 extends mn{constructor(e=new Ht,n=new Ur){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[0];for(let s=1,r=n.count;s<r;s++)bc.fromBufferAttribute(n,s-1),Tc.fromBufferAttribute(n,s),i[s]=i[s-1],i[s]+=bc.distanceTo(Tc);e.setAttribute("lineDistance",new Rt(i,1))}else Fe("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,n){const i=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ko.copy(i.boundingSphere),ko.applyMatrix4(s),ko.radius+=r,e.ray.intersectsSphere(ko)===!1)return;Lf.copy(s).invert(),Ca.copy(e.ray).applyMatrix4(Lf);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let M=f,m=g-1;M<m;M+=l){const p=h.getX(M),S=h.getX(M+1),T=zo(this,e,Ca,c,p,S,M);T&&n.push(T)}if(this.isLineLoop){const M=h.getX(g-1),m=h.getX(f),p=zo(this,e,Ca,c,M,m,g-1);p&&n.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let M=f,m=g-1;M<m;M+=l){const p=zo(this,e,Ca,c,M,M+1,M);p&&n.push(p)}if(this.isLineLoop){const M=zo(this,e,Ca,c,g-1,f,g-1);M&&n.push(M)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function zo(t,e,n,i,s,r,a){const o=t.geometry.attributes.position;if(bc.fromBufferAttribute(o,s),Tc.fromBufferAttribute(o,r),n.distanceSqToSegment(bc,Tc,Vl,If)>i)return;Vl.applyMatrix4(t.matrixWorld);const l=e.ray.origin.distanceTo(Vl);if(!(l<e.near||l>e.far))return{distance:l,point:If.clone().applyMatrix4(t.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:t}}const Df=new D,Uf=new D;class Ac extends j1{constructor(e,n){super(e,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const n=e.attributes.position,i=[];for(let s=0,r=n.count;s<r;s+=2)Df.fromBufferAttribute(n,s),Uf.fromBufferAttribute(n,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Df.distanceTo(Uf);e.setAttribute("lineDistance",new Rt(i,1))}else Fe("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class _s extends Zi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new $e(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Ff=new Tt,tu=new Wu,Vo=new so,Ho=new D;class Fr extends mn{constructor(e=new Ht,n=new _s){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Vo.copy(i.boundingSphere),Vo.applyMatrix4(s),Vo.radius+=r,e.ray.intersectsSphere(Vo)===!1)return;Ff.copy(s).invert(),tu.copy(e.ray).applyMatrix4(Ff);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,d=i.attributes.position;if(l!==null){const u=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let g=u,M=f;g<M;g++){const m=l.getX(g);Ho.fromBufferAttribute(d,m),Nf(Ho,m,c,s,e,n,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=u,M=f;g<M;g++)Ho.fromBufferAttribute(d,g),Nf(Ho,g,c,s,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Nf(t,e,n,i,s,r,a){const o=tu.distanceSqToPoint(t);if(o<n){const c=new D;tu.closestPointToPoint(t,c),c.applyMatrix4(i);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class s0 extends cn{constructor(e=[],n=sr,i,s,r,a,o,c,l,h){super(e,n,i,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class K1 extends cn{constructor(e,n,i,s,r,a,o,c,l){super(e,n,i,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class qa extends cn{constructor(e,n,i=Ai,s,r,a,o=Qt,c=Qt,l,h=Ki,d=1){if(h!==Ki&&h!==Xs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:n,depth:d};super(u,s,r,a,o,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Hu(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class Z1 extends qa{constructor(e,n=Ai,i=sr,s,r,a=Qt,o=Qt,c,l=Ki){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,n,i,s,r,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class r0 extends cn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class ro extends Ht{constructor(e=1,n=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,i,n,e,a,r,0),g("z","y","x",1,-1,i,n,-e,a,r,1),g("x","z","y",1,1,e,i,n,s,a,2),g("x","z","y",1,-1,e,i,-n,s,a,3),g("x","y","z",1,-1,e,n,i,s,r,4),g("x","y","z",-1,-1,e,n,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new Rt(l,3)),this.setAttribute("normal",new Rt(h,3)),this.setAttribute("uv",new Rt(d,2));function g(M,m,p,S,T,y,w,A,C,v,b){const q=y/C,P=w/v,k=y/2,z=w/2,X=A/2,B=C+1,H=v+1;let F=0,Q=0;const K=new D;for(let le=0;le<H;le++){const ge=le*P-z;for(let de=0;de<B;de++){const Ve=de*q-k;K[M]=Ve*S,K[m]=ge*T,K[p]=X,l.push(K.x,K.y,K.z),K[M]=0,K[m]=0,K[p]=A>0?1:-1,h.push(K.x,K.y,K.z),d.push(de/C),d.push(1-le/v),F+=1}}for(let le=0;le<v;le++)for(let ge=0;ge<C;ge++){const de=u+ge+B*le,Ve=u+ge+B*(le+1),_t=u+(ge+1)+B*(le+1),gt=u+(ge+1)+B*le;c.push(de,Ve,gt),c.push(Ve,_t,gt),Q+=6}o.addGroup(f,Q,b),f+=Q,u+=F}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ro(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class J1{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Fe("Curve: .getPoint() not implemented.")}getPointAt(e,n){const i=this.getUtoTmapping(e);return this.getPoint(i,n)}getPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPoint(i/e));return n}getSpacedPoints(e=5){const n=[];for(let i=0;i<=e;i++)n.push(this.getPointAt(i/e));return n}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,s=this.getPoint(0),r=0;n.push(0);for(let a=1;a<=e;a++)i=this.getPoint(a/e),r+=i.distanceTo(s),n.push(r),s=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,n=null){const i=this.getLengths();let s=0;const r=i.length;let a;n?a=n:a=e*i[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=i[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===a)return s/(r-1);const h=i[s],u=i[s+1]-h,f=(a-h)/u;return(s+f)/(r-1)}getTangent(e,n){let s=e-1e-4,r=e+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=n||(a.isVector2?new st:new D);return c.copy(o).sub(a).normalize(),c}getTangentAt(e,n){const i=this.getUtoTmapping(e);return this.getTangent(i,n)}computeFrenetFrames(e,n=!1){const i=new D,s=[],r=[],a=[],o=new D,c=new Tt;for(let f=0;f<=e;f++){const g=f/e;s[f]=this.getTangentAt(g,new D)}r[0]=new D,a[0]=new D;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=l&&(l=h,i.set(1,0,0)),d<=l&&(l=d,i.set(0,1,0)),u<=l&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=e;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(qe(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(n===!0){let f=Math.acos(qe(r[0].dot(r[e]),-1,1));f/=e,s[0].dot(o.crossVectors(r[0],r[e]))>0&&(f=-f);for(let g=1;g<=e;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}}function Q1(t,e){const n=1-t;return n*n*e}function ev(t,e){return 2*(1-t)*t*e}function tv(t,e){return t*t*e}function Hl(t,e,n,i){return Q1(t,e)+ev(t,n)+tv(t,i)}class nv extends J1{constructor(e=new D,n=new D,i=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=n,this.v2=i}getPoint(e,n=new D){const i=n,s=this.v0,r=this.v1,a=this.v2;return i.set(Hl(e,s.x,r.x,a.x),Hl(e,s.y,r.y,a.y),Hl(e,s.z,r.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){const e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}}class ao extends Ht{constructor(e=1,n=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:s};const r=e/2,a=n/2,o=Math.floor(i),c=Math.floor(s),l=o+1,h=c+1,d=e/o,u=n/c,f=[],g=[],M=[],m=[];for(let p=0;p<h;p++){const S=p*u-a;for(let T=0;T<l;T++){const y=T*d-r;g.push(y,-S,0),M.push(0,0,1),m.push(T/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let S=0;S<o;S++){const T=S+l*p,y=S+l*(p+1),w=S+1+l*(p+1),A=S+1+l*p;f.push(T,y,A),f.push(y,w,A)}this.setIndex(f),this.setAttribute("position",new Rt(g,3)),this.setAttribute("normal",new Rt(M,3)),this.setAttribute("uv",new Rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ao(e.width,e.height,e.widthSegments,e.heightSegments)}}class oo extends Ht{constructor(e=1,n=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const h=[],d=new D,u=new D,f=[],g=[],M=[],m=[];for(let p=0;p<=i;p++){const S=[],T=p/i;let y=0;p===0&&a===0?y=.5/n:p===i&&c===Math.PI&&(y=-.5/n);for(let w=0;w<=n;w++){const A=w/n;d.x=-e*Math.cos(s+A*r)*Math.sin(a+T*o),d.y=e*Math.cos(a+T*o),d.z=e*Math.sin(s+A*r)*Math.sin(a+T*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),M.push(u.x,u.y,u.z),m.push(A+y,1-T),S.push(l++)}h.push(S)}for(let p=0;p<i;p++)for(let S=0;S<n;S++){const T=h[p][S+1],y=h[p][S],w=h[p+1][S],A=h[p+1][S+1];(p!==0||a>0)&&f.push(T,y,A),(p!==i-1||c<Math.PI)&&f.push(y,w,A)}this.setIndex(f),this.setAttribute("position",new Rt(g,3)),this.setAttribute("normal",new Rt(M,3)),this.setAttribute("uv",new Rt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oo(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function Wr(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const s=t[n][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Fe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=s.clone():Array.isArray(s)?e[n][i]=s.slice():e[n][i]=s}}return e}function fn(t){const e={};for(let n=0;n<t.length;n++){const i=Wr(t[n]);for(const s in i)e[s]=i[s]}return e}function iv(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function a0(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ze.workingColorSpace}const sv={clone:Wr,merge:fn};var rv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,av=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ii extends Zi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=rv,this.fragmentShader=av,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Wr(e.uniforms),this.uniformsGroups=iv(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?n.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[s]={type:"m4",value:a.toArray()}:n.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class ov extends ii{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class cv extends Zi{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new $e(16777215),this.specular=new $e(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $e(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Km,this.normalScale=new st(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new wi,this.combine=Du,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class lv extends Zi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=f1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class hv extends Zi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Of={enabled:!1,files:{},add:function(t,e){this.enabled!==!1&&(Bf(t)||(this.files[t]=e))},get:function(t){if(this.enabled!==!1&&!Bf(t))return this.files[t]},remove:function(t){delete this.files[t]},clear:function(){this.files={}}};function Bf(t){try{const e=t.slice(t.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class uv{constructor(e,n,i){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=n,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){const d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){const f=l[d],g=l[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const dv=new uv;class Xu{constructor(e){this.manager=e!==void 0?e:dv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,n){const i=this;return new Promise(function(s,r){i.load(e,s,n,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}Xu.DEFAULT_MATERIAL_NAME="__DEFAULT";const Vi={};class fv extends Error{constructor(e,n){super(e),this.response=n}}class pv extends Xu{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,n,i,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Of.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{n&&n(r),this.manager.itemEnd(e)},0),r;if(Vi[e]!==void 0){Vi[e].push({onLoad:n,onProgress:i,onError:s});return}Vi[e]=[],Vi[e].push({onLoad:n,onProgress:i,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Fe("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=Vi[e],d=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=u?parseInt(u):0,g=f!==0;let M=0;const m=new ReadableStream({start(p){S();function S(){d.read().then(({done:T,value:y})=>{if(T)p.close();else{M+=y.byteLength;const w=new ProgressEvent("progress",{lengthComputable:g,loaded:M,total:f});for(let A=0,C=h.length;A<C;A++){const v=h[A];v.onProgress&&v.onProgress(w)}p.enqueue(y),S()}},T=>{p.error(T)})}}});return new Response(m)}else throw new fv(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{const d=/charset="?([^;"\s]*)"?/i.exec(o),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{Of.add(`file:${e}`,l);const h=Vi[e];delete Vi[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=Vi[e];if(h===void 0)throw this.manager.itemError(e),l;delete Vi[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Go=new D,Wo=new ca,li=new D;class o0 extends mn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Tt,this.projectionMatrix=new Tt,this.projectionMatrixInverse=new Tt,this.coordinateSystem=xi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Go,Wo,li),li.x===1&&li.y===1&&li.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Go,Wo,li.set(1,1,1)).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorld.decompose(Go,Wo,li),li.x===1&&li.y===1&&li.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Go,Wo,li.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ls=new D,kf=new st,zf=new st;class Gn extends o0{constructor(e=50,n=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=eu*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(_l*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return eu*2*Math.atan(Math.tan(_l*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){ls.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ls.x,ls.y).multiplyScalar(-e/ls.z),ls.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ls.x,ls.y).multiplyScalar(-e/ls.z)}getViewSize(e,n){return this.getViewBounds(e,kf,zf),n.subVectors(zf,kf)}setViewOffset(e,n,i,s,r,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(_l*.5*this.fov)/this.zoom,i=2*n,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,n-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class c0 extends o0{constructor(e=-1,n=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-e,a=i+e,o=s+n,c=s-n;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const br=-90,Tr=1;class mv extends mn{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Gn(br,Tr,e,n);s.layers=this.layers,this.add(s);const r=new Gn(br,Tr,e,n);r.layers=this.layers,this.add(r);const a=new Gn(br,Tr,e,n);a.layers=this.layers,this.add(a);const o=new Gn(br,Tr,e,n);o.layers=this.layers,this.add(o);const c=new Gn(br,Tr,e,n);c.layers=this.layers,this.add(c);const l=new Gn(br,Tr,e,n);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,s,r,a,o,c]=n;for(const l of n)this.remove(l);if(e===xi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Sc)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of n)this.add(l),l.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,r),e.setRenderTarget(i,1,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,a),e.setRenderTarget(i,2,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,3,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),e.setRenderTarget(i,4,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),i.texture.generateMipmaps=M,e.setRenderTarget(i,5,s),m&&e.autoClear===!1&&e.clearDepth(),e.render(n,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class gv extends Gn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}function Vf(t,e,n,i){const s=_v(i);switch(n){case qm:return t*e;case jm:return t*e/s.components*s.byteLength;case Ou:return t*e/s.components*s.byteLength;case Hr:return t*e*2/s.components*s.byteLength;case Bu:return t*e*2/s.components*s.byteLength;case $m:return t*e*3/s.components*s.byteLength;case ti:return t*e*4/s.components*s.byteLength;case ku:return t*e*4/s.components*s.byteLength;case ac:case oc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case cc:case lc:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Eh:case Th:return Math.max(t,16)*Math.max(e,8)/4;case yh:case bh:return Math.max(t,8)*Math.max(e,8)/2;case Ah:case wh:case Ch:case Ph:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Rh:case Lh:case Ih:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Dh:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Uh:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case Fh:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Nh:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case Oh:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case Bh:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case kh:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case zh:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Vh:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Hh:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Gh:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case Wh:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Xh:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case Yh:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case qh:case $h:case jh:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Kh:case Zh:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Jh:case Qh:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function _v(t){switch(t){case Wn:case Gm:return{byteLength:1,components:1};case Xa:case Wm:case ji:return{byteLength:2,components:1};case Fu:case Nu:return{byteLength:2,components:4};case Ai:case Uu:case vi:return{byteLength:4,components:1};case Xm:case Ym:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Iu}}));typeof window<"u"&&(window.__THREE__?Fe("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Iu);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function l0(){let t=null,e=!1,n=null,i=null;function s(r,a){n(r,a),i=t.requestAnimationFrame(s)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(s),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){n=r},setContext:function(r){t=r}}}function vv(t){const e=new WeakMap;function n(o,c){const l=o.array,h=o.usage,d=l.byteLength,u=t.createBuffer();t.bindBuffer(c,u),t.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=t.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=t.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=t.HALF_FLOAT:f=t.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=t.SHORT;else if(l instanceof Uint32Array)f=t.UNSIGNED_INT;else if(l instanceof Int32Array)f=t.INT;else if(l instanceof Int8Array)f=t.BYTE;else if(l instanceof Uint8Array)f=t.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,c,l){const h=c.array,d=c.updateRanges;if(t.bindBuffer(l,o),d.length===0)t.bufferSubData(l,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],M=d[f];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++u,d[u]=M)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const M=d[f];t.bufferSubData(l,M.start*h.BYTES_PER_ELEMENT,h,M.start,M.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(t.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,n(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var xv=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Mv=`#ifdef USE_ALPHAHASH
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
#endif`,Sv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,yv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ev=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,bv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Tv=`#ifdef USE_AOMAP
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
#endif`,Av=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,wv=`#ifdef USE_BATCHING
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
#endif`,Rv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Cv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Pv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Lv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Iv=`#ifdef USE_IRIDESCENCE
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
#endif`,Dv=`#ifdef USE_BUMPMAP
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
#endif`,Uv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Fv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Nv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Ov=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Bv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,kv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,zv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Vv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Hv=`#define PI 3.141592653589793
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
} // validated`,Gv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Wv=`vec3 transformedNormal = objectNormal;
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
#endif`,Xv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Yv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,qv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$v=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jv="gl_FragColor = linearToOutputTexel( gl_FragColor );",Kv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Zv=`#ifdef USE_ENVMAP
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
#endif`,Jv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Qv=`#ifdef USE_ENVMAP
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
#endif`,e2=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,t2=`#ifdef USE_ENVMAP
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
#endif`,n2=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,i2=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,s2=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,r2=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,a2=`#ifdef USE_GRADIENTMAP
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
}`,o2=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,c2=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,l2=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,h2=`uniform bool receiveShadow;
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
#endif`,u2=`#ifdef USE_ENVMAP
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
#endif`,d2=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,f2=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,p2=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,m2=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,g2=`PhysicalMaterial material;
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
#endif`,_2=`uniform sampler2D dfgLUT;
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
}`,v2=`
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
#endif`,x2=`#if defined( RE_IndirectDiffuse )
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
#endif`,M2=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,S2=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,y2=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,E2=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,b2=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,T2=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,A2=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,w2=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,R2=`#if defined( USE_POINTS_UV )
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
#endif`,C2=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,P2=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,L2=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,I2=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,D2=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,U2=`#ifdef USE_MORPHTARGETS
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
#endif`,F2=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,N2=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,O2=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,B2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,k2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,z2=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,V2=`#ifdef USE_NORMALMAP
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
#endif`,H2=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,G2=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,W2=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,X2=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Y2=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,q2=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,$2=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,j2=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,K2=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Z2=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,J2=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Q2=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,ex=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,tx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,nx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ix=`float getShadowMask() {
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
}`,sx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,rx=`#ifdef USE_SKINNING
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
#endif`,ax=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ox=`#ifdef USE_SKINNING
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
#endif`,cx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,lx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,hx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,ux=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,dx=`#ifdef USE_TRANSMISSION
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
#endif`,fx=`#ifdef USE_TRANSMISSION
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
#endif`,px=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,mx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,gx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,_x=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const vx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xx=`uniform sampler2D t2D;
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
}`,Mx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Sx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,yx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Ex=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bx=`#include <common>
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
}`,Tx=`#if DEPTH_PACKING == 3200
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
}`,Ax=`#define DISTANCE
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
}`,wx=`#define DISTANCE
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
}`,Rx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Cx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Px=`uniform float scale;
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
}`,Lx=`uniform vec3 diffuse;
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
}`,Ix=`#include <common>
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
}`,Dx=`uniform vec3 diffuse;
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
}`,Ux=`#define LAMBERT
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
}`,Fx=`#define LAMBERT
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
}`,Nx=`#define MATCAP
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
}`,Ox=`#define MATCAP
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
}`,Bx=`#define NORMAL
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
}`,kx=`#define NORMAL
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
}`,zx=`#define PHONG
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
}`,Vx=`#define PHONG
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
}`,Hx=`#define STANDARD
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
}`,Gx=`#define STANDARD
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
}`,Wx=`#define TOON
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
}`,Xx=`#define TOON
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
}`,Yx=`uniform float size;
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
}`,qx=`uniform vec3 diffuse;
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
}`,$x=`#include <common>
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
}`,jx=`uniform vec3 color;
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
}`,Kx=`uniform float rotation;
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
}`,Zx=`uniform vec3 diffuse;
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
}`,He={alphahash_fragment:xv,alphahash_pars_fragment:Mv,alphamap_fragment:Sv,alphamap_pars_fragment:yv,alphatest_fragment:Ev,alphatest_pars_fragment:bv,aomap_fragment:Tv,aomap_pars_fragment:Av,batching_pars_vertex:wv,batching_vertex:Rv,begin_vertex:Cv,beginnormal_vertex:Pv,bsdfs:Lv,iridescence_fragment:Iv,bumpmap_pars_fragment:Dv,clipping_planes_fragment:Uv,clipping_planes_pars_fragment:Fv,clipping_planes_pars_vertex:Nv,clipping_planes_vertex:Ov,color_fragment:Bv,color_pars_fragment:kv,color_pars_vertex:zv,color_vertex:Vv,common:Hv,cube_uv_reflection_fragment:Gv,defaultnormal_vertex:Wv,displacementmap_pars_vertex:Xv,displacementmap_vertex:Yv,emissivemap_fragment:qv,emissivemap_pars_fragment:$v,colorspace_fragment:jv,colorspace_pars_fragment:Kv,envmap_fragment:Zv,envmap_common_pars_fragment:Jv,envmap_pars_fragment:Qv,envmap_pars_vertex:e2,envmap_physical_pars_fragment:u2,envmap_vertex:t2,fog_vertex:n2,fog_pars_vertex:i2,fog_fragment:s2,fog_pars_fragment:r2,gradientmap_pars_fragment:a2,lightmap_pars_fragment:o2,lights_lambert_fragment:c2,lights_lambert_pars_fragment:l2,lights_pars_begin:h2,lights_toon_fragment:d2,lights_toon_pars_fragment:f2,lights_phong_fragment:p2,lights_phong_pars_fragment:m2,lights_physical_fragment:g2,lights_physical_pars_fragment:_2,lights_fragment_begin:v2,lights_fragment_maps:x2,lights_fragment_end:M2,logdepthbuf_fragment:S2,logdepthbuf_pars_fragment:y2,logdepthbuf_pars_vertex:E2,logdepthbuf_vertex:b2,map_fragment:T2,map_pars_fragment:A2,map_particle_fragment:w2,map_particle_pars_fragment:R2,metalnessmap_fragment:C2,metalnessmap_pars_fragment:P2,morphinstance_vertex:L2,morphcolor_vertex:I2,morphnormal_vertex:D2,morphtarget_pars_vertex:U2,morphtarget_vertex:F2,normal_fragment_begin:N2,normal_fragment_maps:O2,normal_pars_fragment:B2,normal_pars_vertex:k2,normal_vertex:z2,normalmap_pars_fragment:V2,clearcoat_normal_fragment_begin:H2,clearcoat_normal_fragment_maps:G2,clearcoat_pars_fragment:W2,iridescence_pars_fragment:X2,opaque_fragment:Y2,packing:q2,premultiplied_alpha_fragment:$2,project_vertex:j2,dithering_fragment:K2,dithering_pars_fragment:Z2,roughnessmap_fragment:J2,roughnessmap_pars_fragment:Q2,shadowmap_pars_fragment:ex,shadowmap_pars_vertex:tx,shadowmap_vertex:nx,shadowmask_pars_fragment:ix,skinbase_vertex:sx,skinning_pars_vertex:rx,skinning_vertex:ax,skinnormal_vertex:ox,specularmap_fragment:cx,specularmap_pars_fragment:lx,tonemapping_fragment:hx,tonemapping_pars_fragment:ux,transmission_fragment:dx,transmission_pars_fragment:fx,uv_pars_fragment:px,uv_pars_vertex:mx,uv_vertex:gx,worldpos_vertex:_x,background_vert:vx,background_frag:xx,backgroundCube_vert:Mx,backgroundCube_frag:Sx,cube_vert:yx,cube_frag:Ex,depth_vert:bx,depth_frag:Tx,distance_vert:Ax,distance_frag:wx,equirect_vert:Rx,equirect_frag:Cx,linedashed_vert:Px,linedashed_frag:Lx,meshbasic_vert:Ix,meshbasic_frag:Dx,meshlambert_vert:Ux,meshlambert_frag:Fx,meshmatcap_vert:Nx,meshmatcap_frag:Ox,meshnormal_vert:Bx,meshnormal_frag:kx,meshphong_vert:zx,meshphong_frag:Vx,meshphysical_vert:Hx,meshphysical_frag:Gx,meshtoon_vert:Wx,meshtoon_frag:Xx,points_vert:Yx,points_frag:qx,shadow_vert:$x,shadow_frag:jx,sprite_vert:Kx,sprite_frag:Zx},ae={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ze}},envmap:{envMap:{value:null},envMapRotation:{value:new ze},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ze},normalScale:{value:new st(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0},uvTransform:{value:new ze}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new st(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ze},alphaMap:{value:null},alphaMapTransform:{value:new ze},alphaTest:{value:0}}},mi={basic:{uniforms:fn([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:fn([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new $e(0)},envMapIntensity:{value:1}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:fn([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:fn([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:fn([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new $e(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:fn([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:fn([ae.points,ae.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:fn([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:fn([ae.common,ae.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:fn([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:fn([ae.sprite,ae.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ze}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distance:{uniforms:fn([ae.common,ae.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distance_vert,fragmentShader:He.distance_frag},shadow:{uniforms:fn([ae.lights,ae.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};mi.physical={uniforms:fn([mi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ze},clearcoatNormalScale:{value:new st(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ze},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ze},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ze},transmissionSamplerSize:{value:new st},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ze},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ze},anisotropyVector:{value:new st},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ze}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const Xo={r:0,b:0,g:0},Us=new wi,Jx=new Tt;function Qx(t,e,n,i,s,r){const a=new $e(0);let o=s===!0?0:1,c,l,h=null,d=0,u=null;function f(S){let T=S.isScene===!0?S.background:null;if(T&&T.isTexture){const y=S.backgroundBlurriness>0;T=e.get(T,y)}return T}function g(S){let T=!1;const y=f(S);y===null?m(a,o):y&&y.isColor&&(m(y,1),T=!0);const w=t.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(t.autoClear||T)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function M(S,T){const y=f(T);y&&(y.isCubeTexture||y.mapping===Fc)?(l===void 0&&(l=new gn(new ro(1,1,1),new ii({name:"BackgroundCubeMaterial",uniforms:Wr(mi.backgroundCube.uniforms),vertexShader:mi.backgroundCube.vertexShader,fragmentShader:mi.backgroundCube.fragmentShader,side:pn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),Us.copy(T.backgroundRotation),Us.x*=-1,Us.y*=-1,Us.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Us.y*=-1,Us.z*=-1),l.material.uniforms.envMap.value=y,l.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Jx.makeRotationFromEuler(Us)),l.material.toneMapped=Ze.getTransfer(y.colorSpace)!==ot,(h!==y||d!==y.version||u!==t.toneMapping)&&(l.material.needsUpdate=!0,h=y,d=y.version,u=t.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new gn(new ao(2,2),new ii({name:"BackgroundMaterial",uniforms:Wr(mi.background.uniforms),vertexShader:mi.background.vertexShader,fragmentShader:mi.background.fragmentShader,side:ys,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=Ze.getTransfer(y.colorSpace)!==ot,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(h!==y||d!==y.version||u!==t.toneMapping)&&(c.material.needsUpdate=!0,h=y,d=y.version,u=t.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function m(S,T){S.getRGB(Xo,a0(t)),n.buffers.color.setClear(Xo.r,Xo.g,Xo.b,T,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,T=1){a.set(S),o=T,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,m(a,o)},render:g,addToRenderList:M,dispose:p}}function e3(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},s=u(null);let r=s,a=!1;function o(P,k,z,X,B){let H=!1;const F=d(P,X,z,k);r!==F&&(r=F,l(r.object)),H=f(P,X,z,B),H&&g(P,X,z,B),B!==null&&e.update(B,t.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,y(P,k,z,X),B!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function c(){return t.createVertexArray()}function l(P){return t.bindVertexArray(P)}function h(P){return t.deleteVertexArray(P)}function d(P,k,z,X){const B=X.wireframe===!0;let H=i[k.id];H===void 0&&(H={},i[k.id]=H);const F=P.isInstancedMesh===!0?P.id:0;let Q=H[F];Q===void 0&&(Q={},H[F]=Q);let K=Q[z.id];K===void 0&&(K={},Q[z.id]=K);let le=K[B];return le===void 0&&(le=u(c()),K[B]=le),le}function u(P){const k=[],z=[],X=[];for(let B=0;B<n;B++)k[B]=0,z[B]=0,X[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:z,attributeDivisors:X,object:P,attributes:{},index:null}}function f(P,k,z,X){const B=r.attributes,H=k.attributes;let F=0;const Q=z.getAttributes();for(const K in Q)if(Q[K].location>=0){const ge=B[K];let de=H[K];if(de===void 0&&(K==="instanceMatrix"&&P.instanceMatrix&&(de=P.instanceMatrix),K==="instanceColor"&&P.instanceColor&&(de=P.instanceColor)),ge===void 0||ge.attribute!==de||de&&ge.data!==de.data)return!0;F++}return r.attributesNum!==F||r.index!==X}function g(P,k,z,X){const B={},H=k.attributes;let F=0;const Q=z.getAttributes();for(const K in Q)if(Q[K].location>=0){let ge=H[K];ge===void 0&&(K==="instanceMatrix"&&P.instanceMatrix&&(ge=P.instanceMatrix),K==="instanceColor"&&P.instanceColor&&(ge=P.instanceColor));const de={};de.attribute=ge,ge&&ge.data&&(de.data=ge.data),B[K]=de,F++}r.attributes=B,r.attributesNum=F,r.index=X}function M(){const P=r.newAttributes;for(let k=0,z=P.length;k<z;k++)P[k]=0}function m(P){p(P,0)}function p(P,k){const z=r.newAttributes,X=r.enabledAttributes,B=r.attributeDivisors;z[P]=1,X[P]===0&&(t.enableVertexAttribArray(P),X[P]=1),B[P]!==k&&(t.vertexAttribDivisor(P,k),B[P]=k)}function S(){const P=r.newAttributes,k=r.enabledAttributes;for(let z=0,X=k.length;z<X;z++)k[z]!==P[z]&&(t.disableVertexAttribArray(z),k[z]=0)}function T(P,k,z,X,B,H,F){F===!0?t.vertexAttribIPointer(P,k,z,B,H):t.vertexAttribPointer(P,k,z,X,B,H)}function y(P,k,z,X){M();const B=X.attributes,H=z.getAttributes(),F=k.defaultAttributeValues;for(const Q in H){const K=H[Q];if(K.location>=0){let le=B[Q];if(le===void 0&&(Q==="instanceMatrix"&&P.instanceMatrix&&(le=P.instanceMatrix),Q==="instanceColor"&&P.instanceColor&&(le=P.instanceColor)),le!==void 0){const ge=le.normalized,de=le.itemSize,Ve=e.get(le);if(Ve===void 0)continue;const _t=Ve.buffer,gt=Ve.type,$=Ve.bytesPerElement,ne=gt===t.INT||gt===t.UNSIGNED_INT||le.gpuType===Uu;if(le.isInterleavedBufferAttribute){const re=le.data,ke=re.stride,De=le.offset;if(re.isInstancedInterleavedBuffer){for(let Ne=0;Ne<K.locationSize;Ne++)p(K.location+Ne,re.meshPerAttribute);P.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Ne=0;Ne<K.locationSize;Ne++)m(K.location+Ne);t.bindBuffer(t.ARRAY_BUFFER,_t);for(let Ne=0;Ne<K.locationSize;Ne++)T(K.location+Ne,de/K.locationSize,gt,ge,ke*$,(De+de/K.locationSize*Ne)*$,ne)}else{if(le.isInstancedBufferAttribute){for(let re=0;re<K.locationSize;re++)p(K.location+re,le.meshPerAttribute);P.isInstancedMesh!==!0&&X._maxInstanceCount===void 0&&(X._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let re=0;re<K.locationSize;re++)m(K.location+re);t.bindBuffer(t.ARRAY_BUFFER,_t);for(let re=0;re<K.locationSize;re++)T(K.location+re,de/K.locationSize,gt,ge,de*$,de/K.locationSize*re*$,ne)}}else if(F!==void 0){const ge=F[Q];if(ge!==void 0)switch(ge.length){case 2:t.vertexAttrib2fv(K.location,ge);break;case 3:t.vertexAttrib3fv(K.location,ge);break;case 4:t.vertexAttrib4fv(K.location,ge);break;default:t.vertexAttrib1fv(K.location,ge)}}}}S()}function w(){b();for(const P in i){const k=i[P];for(const z in k){const X=k[z];for(const B in X){const H=X[B];for(const F in H)h(H[F].object),delete H[F];delete X[B]}}delete i[P]}}function A(P){if(i[P.id]===void 0)return;const k=i[P.id];for(const z in k){const X=k[z];for(const B in X){const H=X[B];for(const F in H)h(H[F].object),delete H[F];delete X[B]}}delete i[P.id]}function C(P){for(const k in i){const z=i[k];for(const X in z){const B=z[X];if(B[P.id]===void 0)continue;const H=B[P.id];for(const F in H)h(H[F].object),delete H[F];delete B[P.id]}}}function v(P){for(const k in i){const z=i[k],X=P.isInstancedMesh===!0?P.id:0,B=z[X];if(B!==void 0){for(const H in B){const F=B[H];for(const Q in F)h(F[Q].object),delete F[Q];delete B[H]}delete z[X],Object.keys(z).length===0&&delete i[k]}}}function b(){q(),a=!0,r!==s&&(r=s,l(r.object))}function q(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:b,resetDefaultState:q,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfObject:v,releaseStatesOfProgram:C,initAttributes:M,enableAttribute:m,disableUnusedAttributes:S}}function t3(t,e,n){let i;function s(l){i=l}function r(l,h){t.drawArrays(i,l,h),n.update(h,i,1)}function a(l,h,d){d!==0&&(t.drawArraysInstanced(i,l,h,d),n.update(h,i,d))}function o(l,h,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];n.update(f,i,1)}function c(l,h,d,u){if(d===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)a(l[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(i,l,0,h,0,u,0,d);let g=0;for(let M=0;M<d;M++)g+=h[M]*u[M];n.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function n3(t,e,n,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const C=e.get("EXT_texture_filter_anisotropic");s=t.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==ti&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const v=C===ji&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==Wn&&i.convert(C)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==vi&&!v)}function c(C){if(C==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=n.precision!==void 0?n.precision:"highp";const h=c(l);h!==l&&(Fe("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),g=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=t.getParameter(t.MAX_TEXTURE_SIZE),m=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),p=t.getParameter(t.MAX_VERTEX_ATTRIBS),S=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),T=t.getParameter(t.MAX_VARYING_VECTORS),y=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),w=t.getParameter(t.MAX_SAMPLES),A=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:S,maxVaryings:T,maxFragmentUniforms:y,maxSamples:w,samples:A}}function i3(t){const e=this;let n=null,i=0,s=!1,r=!1;const a=new Bs,o=new ze,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||i!==0||s;return s=u,i=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){n=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,M=d.clipIntersection,m=d.clipShadows,p=t.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const S=r?0:i,T=S*4;let y=p.clippingState||null;c.value=y,y=h(g,u,T,f);for(let w=0;w!==T;++w)y[w]=n[w];p.clippingState=y,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(d,u,f,g){const M=d!==null?d.length:0;let m=null;if(M!==0){if(m=c.value,g!==!0||m===null){const p=f+M*4,S=u.matrixWorldInverse;o.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let T=0,y=f;T!==M;++T,y+=4)a.copy(d[T]).applyMatrix4(S,o),a.normal.toArray(m,y),m[y+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=M,e.numIntersection=0,m}}const vs=4,Hf=[.125,.215,.35,.446,.526,.582],Hs=20,s3=256,Pa=new c0,Gf=new $e;let Gl=null,Wl=0,Xl=0,Yl=!1;const r3=new D;class Wf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,s=100,r={}){const{size:a=256,position:o=r3}=r;Gl=this._renderer.getRenderTarget(),Wl=this._renderer.getActiveCubeFace(),Xl=this._renderer.getActiveMipmapLevel(),Yl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,s,c,o),n>0&&this._blur(c,0,0,n),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=qf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Gl,Wl,Xl),this._renderer.xr.enabled=Yl,e.scissorTest=!1,Ar(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===sr||e.mapping===Vr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Gl=this._renderer.getRenderTarget(),Wl=this._renderer.getActiveCubeFace(),Xl=this._renderer.getActiveMipmapLevel(),Yl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Zt,minFilter:Zt,generateMipmaps:!1,type:ji,format:ti,colorSpace:Gr,depthBuffer:!1},s=Xf(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xf(e,n,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=a3(r)),this._blurMaterial=c3(r,e,n),this._ggxMaterial=o3(r,e,n)}return s}_compileMaterial(e){const n=new gn(new Ht,e);this._renderer.compile(n,Pa)}_sceneToCubeUV(e,n,i,s,r){const c=new Gn(90,1,n,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Gf),d.toneMapping=Si,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new gn(new ro,new la({name:"PMREM.Background",side:pn,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,m=M.material;let p=!1;const S=e.background;S?S.isColor&&(m.color.copy(S),e.background=null,p=!0):(m.color.copy(Gf),p=!0);for(let T=0;T<6;T++){const y=T%3;y===0?(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[T],r.y,r.z)):y===1?(c.up.set(0,0,l[T]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[T],r.z)):(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[T]));const w=this._cubeSize;Ar(s,y*w,T>2?w:0,w,w),d.setRenderTarget(s),p&&d.render(M,c),d.render(e,c)}d.toneMapping=f,d.autoClear=u,e.background=S}_textureToCubeUV(e,n){const i=this._renderer,s=e.mapping===sr||e.mapping===Vr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=qf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yf());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;Ar(n,0,0,3*c,2*c),i.setRenderTarget(n),i.render(a,Pa)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);n.autoClear=i}_applyGGXFilter(e,n,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),h=n/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=0+l*1.25,f=d*u,{_lodMax:g}=this,M=this._sizeLods[i],m=3*M*(i>g-vs?i-g+vs:0),p=4*(this._cubeSize-M);c.envMap.value=e.texture,c.roughness.value=f,c.mipInt.value=g-n,Ar(r,m,p,3*M,2*M),s.setRenderTarget(r),s.render(o,Pa),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-i,Ar(e,m,p,3*M,2*M),s.setRenderTarget(e),s.render(o,Pa)}_blur(e,n,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,n,i,s,"latitudinal",r),this._halfBlur(a,e,i,i,s,"longitudinal",r)}_halfBlur(e,n,i,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&et("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[s];d.material=l;const u=l.uniforms,f=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Hs-1),M=r/g,m=isFinite(r)?1+Math.floor(h*M):Hs;m>Hs&&Fe(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Hs}`);const p=[];let S=0;for(let C=0;C<Hs;++C){const v=C/M,b=Math.exp(-v*v/2);p.push(b),C===0?S+=b:C<m&&(S+=2*b)}for(let C=0;C<p.length;C++)p[C]=p[C]/S;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:T}=this;u.dTheta.value=g,u.mipInt.value=T-i;const y=this._sizeLods[s],w=3*y*(s>T-vs?s-T+vs:0),A=4*(this._cubeSize-y);Ar(n,w,A,3*y,2*y),c.setRenderTarget(n),c.render(d,Pa)}}function a3(t){const e=[],n=[],i=[];let s=t;const r=t-vs+1+Hf.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);e.push(o);let c=1/o;a>t-vs?c=Hf[a-t+vs-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,M=3,m=2,p=1,S=new Float32Array(M*g*f),T=new Float32Array(m*g*f),y=new Float32Array(p*g*f);for(let A=0;A<f;A++){const C=A%3*2/3-1,v=A>2?0:-1,b=[C,v,0,C+2/3,v,0,C+2/3,v+1,0,C,v,0,C+2/3,v+1,0,C,v+1,0];S.set(b,M*g*A),T.set(u,m*g*A);const q=[A,A,A,A,A,A];y.set(q,p*g*A)}const w=new Ht;w.setAttribute("position",new ln(S,M)),w.setAttribute("uv",new ln(T,m)),w.setAttribute("faceIndex",new ln(y,p)),i.push(new gn(w,null)),s>vs&&s--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function Xf(t,e,n){const i=new yi(t,e,n);return i.texture.mapping=Fc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Ar(t,e,n,i,s){t.viewport.set(e,n,i,s),t.scissor.set(e,n,i,s)}function o3(t,e,n){return new ii({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:s3,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Nc(),fragmentShader:`

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
		`,blending:Xi,depthTest:!1,depthWrite:!1})}function c3(t,e,n){const i=new Float32Array(Hs),s=new D(0,1,0);return new ii({name:"SphericalGaussianBlur",defines:{n:Hs,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Nc(),fragmentShader:`

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
		`,blending:Xi,depthTest:!1,depthWrite:!1})}function Yf(){return new ii({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Nc(),fragmentShader:`

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
		`,blending:Xi,depthTest:!1,depthWrite:!1})}function qf(){return new ii({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Nc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Xi,depthTest:!1,depthWrite:!1})}function Nc(){return`

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
	`}class h0 extends yi{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new s0(s),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ro(5,5,5),r=new ii({name:"CubemapFromEquirect",uniforms:Wr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:pn,blending:Xi});r.uniforms.tEquirect.value=n;const a=new gn(s,r),o=n.minFilter;return n.minFilter===Ws&&(n.minFilter=Zt),new mv(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n=!0,i=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,s);e.setRenderTarget(r)}}function l3(t){let e=new WeakMap,n=new WeakMap,i=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===pl||f===ml)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const M=new h0(g.height);return M.fromEquirectangularTexture(t,u),e.set(u,M),u.addEventListener("dispose",l),o(M.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const f=u.mapping,g=f===pl||f===ml,M=f===sr||f===Vr;if(g||M){let m=n.get(u);const p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return i===null&&(i=new Wf(t)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,n.set(u,m),m.texture;if(m!==void 0)return m.texture;{const S=u.image;return g&&S&&S.height>0||M&&S&&c(S)?(i===null&&(i=new Wf(t)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,n.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===pl?u.mapping=sr:f===ml&&(u.mapping=Vr),u}function c(u){let f=0;const g=6;for(let M=0;M<g;M++)u[M]!==void 0&&f++;return f===g}function l(u){const f=u.target;f.removeEventListener("dispose",l);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function h(u){const f=u.target;f.removeEventListener("dispose",h);const g=n.get(f);g!==void 0&&(n.delete(f),g.dispose())}function d(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function h3(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const s=t.getExtension(i);return e[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const s=n(i);return s===null&&Ec("WebGLRenderer: "+i+" extension not supported."),s}}}function u3(t,e,n,i){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];const f=r.get(u);f&&(e.remove(f),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,n.memory.geometries++),u}function c(d){const u=d.attributes;for(const f in u)e.update(u[f],t.ARRAY_BUFFER)}function l(d){const u=[],f=d.index,g=d.attributes.position;let M=0;if(g===void 0)return;if(f!==null){const S=f.array;M=f.version;for(let T=0,y=S.length;T<y;T+=3){const w=S[T+0],A=S[T+1],C=S[T+2];u.push(w,A,A,C,C,w)}}else{const S=g.array;M=g.version;for(let T=0,y=S.length/3-1;T<y;T+=3){const w=T+0,A=T+1,C=T+2;u.push(w,A,A,C,C,w)}}const m=new(g.count>=65535?n0:t0)(u,1);m.version=M;const p=r.get(d);p&&e.remove(p),r.set(d,m)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function d3(t,e,n){let i;function s(u){i=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function c(u,f){t.drawElements(i,f,r,u*a),n.update(f,i,1)}function l(u,f,g){g!==0&&(t.drawElementsInstanced(i,f,r,u*a,g),n.update(f,i,g))}function h(u,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];n.update(m,i,1)}function d(u,f,g,M){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)l(u[p]/a,f[p],M[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,r,u,0,M,0,g);let p=0;for(let S=0;S<g;S++)p+=f[S]*M[S];n.update(p,i,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function f3(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(r/3);break;case t.LINES:n.lines+=o*(r/2);break;case t.LINE_STRIP:n.lines+=o*(r-1);break;case t.LINE_LOOP:n.lines+=o*r;break;case t.POINTS:n.points+=o*r;break;default:et("WebGLInfo: Unknown draw mode:",a);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:s,update:i}}function p3(t,e,n){const i=new WeakMap,s=new Dt;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==d){let q=function(){v.dispose(),i.delete(o),o.removeEventListener("dispose",q)};var f=q;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,M=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let y=0;g===!0&&(y=1),M===!0&&(y=2),m===!0&&(y=3);let w=o.attributes.position.count*y,A=1;w>e.maxTextureSize&&(A=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const C=new Float32Array(w*A*4*d),v=new Jm(C,w,A,d);v.type=vi,v.needsUpdate=!0;const b=y*4;for(let P=0;P<d;P++){const k=p[P],z=S[P],X=T[P],B=w*A*4*P;for(let H=0;H<k.count;H++){const F=H*b;g===!0&&(s.fromBufferAttribute(k,H),C[B+F+0]=s.x,C[B+F+1]=s.y,C[B+F+2]=s.z,C[B+F+3]=0),M===!0&&(s.fromBufferAttribute(z,H),C[B+F+4]=s.x,C[B+F+5]=s.y,C[B+F+6]=s.z,C[B+F+7]=0),m===!0&&(s.fromBufferAttribute(X,H),C[B+F+8]=s.x,C[B+F+9]=s.y,C[B+F+10]=s.z,C[B+F+11]=X.itemSize===4?s.w:1)}}u={count:d,texture:v,size:new st(w,A)},i.set(o,u),o.addEventListener("dispose",q)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const M=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(t,"morphTargetBaseInfluence",M),c.getUniforms().setValue(t,"morphTargetInfluences",l)}c.getUniforms().setValue(t,"morphTargetsTexture",u.texture,n),c.getUniforms().setValue(t,"morphTargetsTextureSize",u.size)}return{update:r}}function m3(t,e,n,i,s){let r=new WeakMap;function a(l){const h=s.render.frame,d=l.geometry,u=e.get(l,d);if(r.get(u)!==h&&(e.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),n.remove(h.instanceMatrix),h.instanceColor!==null&&n.remove(h.instanceColor)}return{update:a,dispose:o}}const g3={[Fm]:"LINEAR_TONE_MAPPING",[Nm]:"REINHARD_TONE_MAPPING",[Om]:"CINEON_TONE_MAPPING",[Bm]:"ACES_FILMIC_TONE_MAPPING",[zm]:"AGX_TONE_MAPPING",[Vm]:"NEUTRAL_TONE_MAPPING",[km]:"CUSTOM_TONE_MAPPING"};function _3(t,e,n,i,s){const r=new yi(e,n,{type:t,depthBuffer:i,stencilBuffer:s}),a=new yi(e,n,{type:ji,depthBuffer:!1,stencilBuffer:!1}),o=new Ht;o.setAttribute("position",new Rt([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Rt([0,2,0,0,2,0],2));const c=new ov({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new gn(o,c),h=new c0(-1,1,1,-1,0,1);let d=null,u=null,f=!1,g,M=null,m=[],p=!1;this.setSize=function(S,T){r.setSize(S,T),a.setSize(S,T);for(let y=0;y<m.length;y++){const w=m[y];w.setSize&&w.setSize(S,T)}},this.setEffects=function(S){m=S,p=m.length>0&&m[0].isRenderPass===!0;const T=r.width,y=r.height;for(let w=0;w<m.length;w++){const A=m[w];A.setSize&&A.setSize(T,y)}},this.begin=function(S,T){if(f||S.toneMapping===Si&&m.length===0)return!1;if(M=T,T!==null){const y=T.width,w=T.height;(r.width!==y||r.height!==w)&&this.setSize(y,w)}return p===!1&&S.setRenderTarget(r),g=S.toneMapping,S.toneMapping=Si,!0},this.hasRenderPass=function(){return p},this.end=function(S,T){S.toneMapping=g,f=!0;let y=r,w=a;for(let A=0;A<m.length;A++){const C=m[A];if(C.enabled!==!1&&(C.render(S,w,y,T),C.needsSwap!==!1)){const v=y;y=w,w=v}}if(d!==S.outputColorSpace||u!==S.toneMapping){d=S.outputColorSpace,u=S.toneMapping,c.defines={},Ze.getTransfer(d)===ot&&(c.defines.SRGB_TRANSFER="");const A=g3[u];A&&(c.defines[A]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=y.texture,S.setRenderTarget(M),S.render(l,h),M=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){r.dispose(),a.dispose(),o.dispose(),c.dispose()}}const u0=new cn,nu=new qa(1,1),d0=new Jm,f0=new L1,p0=new s0,$f=[],jf=[],Kf=new Float32Array(16),Zf=new Float32Array(9),Jf=new Float32Array(4);function ha(t,e,n){const i=t[0];if(i<=0||i>0)return t;const s=e*n;let r=$f[s];if(r===void 0&&(r=new Float32Array(s),$f[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(r,o)}return r}function Gt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function Wt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Oc(t,e){let n=jf[e];n===void 0&&(n=new Int32Array(e),jf[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function v3(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function x3(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Gt(n,e))return;t.uniform2fv(this.addr,e),Wt(n,e)}}function M3(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Gt(n,e))return;t.uniform3fv(this.addr,e),Wt(n,e)}}function S3(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Gt(n,e))return;t.uniform4fv(this.addr,e),Wt(n,e)}}function y3(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Gt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),Wt(n,e)}else{if(Gt(n,i))return;Jf.set(i),t.uniformMatrix2fv(this.addr,!1,Jf),Wt(n,i)}}function E3(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Gt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),Wt(n,e)}else{if(Gt(n,i))return;Zf.set(i),t.uniformMatrix3fv(this.addr,!1,Zf),Wt(n,i)}}function b3(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Gt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),Wt(n,e)}else{if(Gt(n,i))return;Kf.set(i),t.uniformMatrix4fv(this.addr,!1,Kf),Wt(n,i)}}function T3(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function A3(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Gt(n,e))return;t.uniform2iv(this.addr,e),Wt(n,e)}}function w3(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Gt(n,e))return;t.uniform3iv(this.addr,e),Wt(n,e)}}function R3(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Gt(n,e))return;t.uniform4iv(this.addr,e),Wt(n,e)}}function C3(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function P3(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Gt(n,e))return;t.uniform2uiv(this.addr,e),Wt(n,e)}}function L3(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Gt(n,e))return;t.uniform3uiv(this.addr,e),Wt(n,e)}}function I3(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Gt(n,e))return;t.uniform4uiv(this.addr,e),Wt(n,e)}}function D3(t,e,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(t.uniform1i(this.addr,s),i[0]=s);let r;this.type===t.SAMPLER_2D_SHADOW?(nu.compareFunction=n.isReversedDepthBuffer()?Vu:zu,r=nu):r=u0,n.setTexture2D(e||r,s)}function U3(t,e,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(t.uniform1i(this.addr,s),i[0]=s),n.setTexture3D(e||f0,s)}function F3(t,e,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(t.uniform1i(this.addr,s),i[0]=s),n.setTextureCube(e||p0,s)}function N3(t,e,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(t.uniform1i(this.addr,s),i[0]=s),n.setTexture2DArray(e||d0,s)}function O3(t){switch(t){case 5126:return v3;case 35664:return x3;case 35665:return M3;case 35666:return S3;case 35674:return y3;case 35675:return E3;case 35676:return b3;case 5124:case 35670:return T3;case 35667:case 35671:return A3;case 35668:case 35672:return w3;case 35669:case 35673:return R3;case 5125:return C3;case 36294:return P3;case 36295:return L3;case 36296:return I3;case 35678:case 36198:case 36298:case 36306:case 35682:return D3;case 35679:case 36299:case 36307:return U3;case 35680:case 36300:case 36308:case 36293:return F3;case 36289:case 36303:case 36311:case 36292:return N3}}function B3(t,e){t.uniform1fv(this.addr,e)}function k3(t,e){const n=ha(e,this.size,2);t.uniform2fv(this.addr,n)}function z3(t,e){const n=ha(e,this.size,3);t.uniform3fv(this.addr,n)}function V3(t,e){const n=ha(e,this.size,4);t.uniform4fv(this.addr,n)}function H3(t,e){const n=ha(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function G3(t,e){const n=ha(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function W3(t,e){const n=ha(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function X3(t,e){t.uniform1iv(this.addr,e)}function Y3(t,e){t.uniform2iv(this.addr,e)}function q3(t,e){t.uniform3iv(this.addr,e)}function $3(t,e){t.uniform4iv(this.addr,e)}function j3(t,e){t.uniform1uiv(this.addr,e)}function K3(t,e){t.uniform2uiv(this.addr,e)}function Z3(t,e){t.uniform3uiv(this.addr,e)}function J3(t,e){t.uniform4uiv(this.addr,e)}function Q3(t,e,n){const i=this.cache,s=e.length,r=Oc(n,s);Gt(i,r)||(t.uniform1iv(this.addr,r),Wt(i,r));let a;this.type===t.SAMPLER_2D_SHADOW?a=nu:a=u0;for(let o=0;o!==s;++o)n.setTexture2D(e[o]||a,r[o])}function eM(t,e,n){const i=this.cache,s=e.length,r=Oc(n,s);Gt(i,r)||(t.uniform1iv(this.addr,r),Wt(i,r));for(let a=0;a!==s;++a)n.setTexture3D(e[a]||f0,r[a])}function tM(t,e,n){const i=this.cache,s=e.length,r=Oc(n,s);Gt(i,r)||(t.uniform1iv(this.addr,r),Wt(i,r));for(let a=0;a!==s;++a)n.setTextureCube(e[a]||p0,r[a])}function nM(t,e,n){const i=this.cache,s=e.length,r=Oc(n,s);Gt(i,r)||(t.uniform1iv(this.addr,r),Wt(i,r));for(let a=0;a!==s;++a)n.setTexture2DArray(e[a]||d0,r[a])}function iM(t){switch(t){case 5126:return B3;case 35664:return k3;case 35665:return z3;case 35666:return V3;case 35674:return H3;case 35675:return G3;case 35676:return W3;case 5124:case 35670:return X3;case 35667:case 35671:return Y3;case 35668:case 35672:return q3;case 35669:case 35673:return $3;case 5125:return j3;case 36294:return K3;case 36295:return Z3;case 36296:return J3;case 35678:case 36198:case 36298:case 36306:case 35682:return Q3;case 35679:case 36299:case 36307:return eM;case 35680:case 36300:case 36308:case 36293:return tM;case 36289:case 36303:case 36311:case 36292:return nM}}class sM{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=O3(n.type)}}class rM{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=iM(n.type)}}class aM{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,n[o.id],i)}}}const ql=/(\w+)(\])?(\[|\.)?/g;function Qf(t,e){t.seq.push(e),t.map[e.id]=e}function oM(t,e,n){const i=t.name,s=i.length;for(ql.lastIndex=0;;){const r=ql.exec(i),a=ql.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Qf(n,l===void 0?new sM(o,t,e):new rM(o,t,e));break}else{let d=n.map[o];d===void 0&&(d=new aM(o),Qf(n,d)),n=d}}}class hc{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(n,a),c=e.getUniformLocation(n,o.name);oM(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,n,i,s){const r=this.map[n];r!==void 0&&r.setValue(e,i,s)}setOptional(e,n,i){const s=n[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,n,i,s){for(let r=0,a=n.length;r!==a;++r){const o=n[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,n){const i=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in n&&i.push(a)}return i}}function ep(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const cM=37297;let lM=0;function hM(t,e){const n=t.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,n.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}const tp=new ze;function uM(t){Ze._getMatrix(tp,Ze.workingColorSpace,t);const e=`mat3( ${tp.elements.map(n=>n.toFixed(4))} )`;switch(Ze.getTransfer(t)){case Mc:return[e,"LinearTransferOETF"];case ot:return[e,"sRGBTransferOETF"];default:return Fe("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function np(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),r=(t.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return n.toUpperCase()+`

`+r+`

`+hM(t.getShaderSource(e),o)}else return r}function dM(t,e){const n=uM(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const fM={[Fm]:"Linear",[Nm]:"Reinhard",[Om]:"Cineon",[Bm]:"ACESFilmic",[zm]:"AgX",[Vm]:"Neutral",[km]:"Custom"};function pM(t,e){const n=fM[e];return n===void 0?(Fe("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Yo=new D;function mM(){Ze.getLuminanceCoefficients(Yo);const t=Yo.x.toFixed(4),e=Yo.y.toFixed(4),n=Yo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function gM(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ba).join(`
`)}function _M(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function vM(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=t.getActiveAttrib(e,s),a=r.name;let o=1;r.type===t.FLOAT_MAT2&&(o=2),r.type===t.FLOAT_MAT3&&(o=3),r.type===t.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function Ba(t){return t!==""}function ip(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function sp(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const xM=/^[ \t]*#include +<([\w\d./]+)>/gm;function iu(t){return t.replace(xM,SM)}const MM=new Map;function SM(t,e){let n=He[e];if(n===void 0){const i=MM.get(e);if(i!==void 0)n=He[i],Fe('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return iu(n)}const yM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rp(t){return t.replace(yM,EM)}function EM(t,e,n,i){let s="";for(let r=parseInt(e);r<parseInt(n);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ap(t){let e=`precision ${t.precision} float;
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
#define LOW_PRECISION`),e}const bM={[rc]:"SHADOWMAP_TYPE_PCF",[Oa]:"SHADOWMAP_TYPE_VSM"};function TM(t){return bM[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const AM={[sr]:"ENVMAP_TYPE_CUBE",[Vr]:"ENVMAP_TYPE_CUBE",[Fc]:"ENVMAP_TYPE_CUBE_UV"};function wM(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":AM[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const RM={[Vr]:"ENVMAP_MODE_REFRACTION"};function CM(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":RM[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const PM={[Du]:"ENVMAP_BLENDING_MULTIPLY",[h1]:"ENVMAP_BLENDING_MIX",[u1]:"ENVMAP_BLENDING_ADD"};function LM(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":PM[t.combine]||"ENVMAP_BLENDING_NONE"}function IM(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function DM(t,e,n,i){const s=t.getContext(),r=n.defines;let a=n.vertexShader,o=n.fragmentShader;const c=TM(n),l=wM(n),h=CM(n),d=LM(n),u=IM(n),f=gM(n),g=_M(r),M=s.createProgram();let m,p,S=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(Ba).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(Ba).join(`
`),p.length>0&&(p+=`
`)):(m=[ap(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ba).join(`
`),p=[ap(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+l:"",n.envMap?"#define "+h:"",n.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Si?"#define TONE_MAPPING":"",n.toneMapping!==Si?He.tonemapping_pars_fragment:"",n.toneMapping!==Si?pM("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,dM("linearToOutputTexel",n.outputColorSpace),mM(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ba).join(`
`)),a=iu(a),a=ip(a,n),a=sp(a,n),o=iu(o),o=ip(o,n),o=sp(o,n),a=rp(a),o=rp(o),n.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",n.glslVersion===pf?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===pf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const T=S+m+a,y=S+p+o,w=ep(s,s.VERTEX_SHADER,T),A=ep(s,s.FRAGMENT_SHADER,y);s.attachShader(M,w),s.attachShader(M,A),n.index0AttributeName!==void 0?s.bindAttribLocation(M,0,n.index0AttributeName):n.morphTargets===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function C(P){if(t.debug.checkShaderErrors){const k=s.getProgramInfoLog(M)||"",z=s.getShaderInfoLog(w)||"",X=s.getShaderInfoLog(A)||"",B=k.trim(),H=z.trim(),F=X.trim();let Q=!0,K=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(Q=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(s,M,w,A);else{const le=np(s,w,"vertex"),ge=np(s,A,"fragment");et("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+B+`
`+le+`
`+ge)}else B!==""?Fe("WebGLProgram: Program Info Log:",B):(H===""||F==="")&&(K=!1);K&&(P.diagnostics={runnable:Q,programLog:B,vertexShader:{log:H,prefix:m},fragmentShader:{log:F,prefix:p}})}s.deleteShader(w),s.deleteShader(A),v=new hc(s,M),b=vM(s,M)}let v;this.getUniforms=function(){return v===void 0&&C(this),v};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let q=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return q===!1&&(q=s.getProgramParameter(M,cM)),q},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=lM++,this.cacheKey=e,this.usedTimes=1,this.program=M,this.vertexShader=w,this.fragmentShader=A,this}let UM=0;class FM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,s=this._getShaderStage(n),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new NM(e),n.set(e,i)),i}}class NM{constructor(e){this.id=UM++,this.code=e,this.usedTimes=0}}function OM(t,e,n,i,s,r){const a=new Qm,o=new FM,c=new Set,l=[],h=new Map,d=i.logarithmicDepthBuffer;let u=i.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return c.add(v),v===0?"uv":`uv${v}`}function M(v,b,q,P,k){const z=P.fog,X=k.geometry,B=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?P.environment:null,H=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,F=e.get(v.envMap||B,H),Q=F&&F.mapping===Fc?F.image.height:null,K=f[v.type];v.precision!==null&&(u=i.getMaxPrecision(v.precision),u!==v.precision&&Fe("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const le=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ge=le!==void 0?le.length:0;let de=0;X.morphAttributes.position!==void 0&&(de=1),X.morphAttributes.normal!==void 0&&(de=2),X.morphAttributes.color!==void 0&&(de=3);let Ve,_t,gt,$;if(K){const at=mi[K];Ve=at.vertexShader,_t=at.fragmentShader}else Ve=v.vertexShader,_t=v.fragmentShader,o.update(v),gt=o.getVertexShaderID(v),$=o.getFragmentShaderID(v);const ne=t.getRenderTarget(),re=t.state.buffers.depth.getReversed(),ke=k.isInstancedMesh===!0,De=k.isBatchedMesh===!0,Ne=!!v.map,Yt=!!v.matcap,Ke=!!F,rt=!!v.aoMap,ut=!!v.lightMap,We=!!v.bumpMap,Pt=!!v.normalMap,R=!!v.displacementMap,Ut=!!v.emissiveMap,it=!!v.metalnessMap,pt=!!v.roughnessMap,ye=v.anisotropy>0,E=v.clearcoat>0,_=v.dispersion>0,I=v.iridescence>0,Y=v.sheen>0,j=v.transmission>0,W=ye&&!!v.anisotropyMap,_e=E&&!!v.clearcoatMap,ie=E&&!!v.clearcoatNormalMap,Pe=E&&!!v.clearcoatRoughnessMap,Ue=I&&!!v.iridescenceMap,Z=I&&!!v.iridescenceThicknessMap,ee=Y&&!!v.sheenColorMap,ve=Y&&!!v.sheenRoughnessMap,Me=!!v.specularMap,he=!!v.specularColorMap,Xe=!!v.specularIntensityMap,L=j&&!!v.transmissionMap,se=j&&!!v.thicknessMap,te=!!v.gradientMap,pe=!!v.alphaMap,J=v.alphaTest>0,G=!!v.alphaHash,xe=!!v.extensions;let Oe=Si;v.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Oe=t.toneMapping);const mt={shaderID:K,shaderType:v.type,shaderName:v.name,vertexShader:Ve,fragmentShader:_t,defines:v.defines,customVertexShaderID:gt,customFragmentShaderID:$,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:De,batchingColor:De&&k._colorsTexture!==null,instancing:ke,instancingColor:ke&&k.instanceColor!==null,instancingMorph:ke&&k.morphTexture!==null,outputColorSpace:ne===null?t.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:Gr,alphaToCoverage:!!v.alphaToCoverage,map:Ne,matcap:Yt,envMap:Ke,envMapMode:Ke&&F.mapping,envMapCubeUVHeight:Q,aoMap:rt,lightMap:ut,bumpMap:We,normalMap:Pt,displacementMap:R,emissiveMap:Ut,normalMapObjectSpace:Pt&&v.normalMapType===p1,normalMapTangentSpace:Pt&&v.normalMapType===Km,metalnessMap:it,roughnessMap:pt,anisotropy:ye,anisotropyMap:W,clearcoat:E,clearcoatMap:_e,clearcoatNormalMap:ie,clearcoatRoughnessMap:Pe,dispersion:_,iridescence:I,iridescenceMap:Ue,iridescenceThicknessMap:Z,sheen:Y,sheenColorMap:ee,sheenRoughnessMap:ve,specularMap:Me,specularColorMap:he,specularIntensityMap:Xe,transmission:j,transmissionMap:L,thicknessMap:se,gradientMap:te,opaque:v.transparent===!1&&v.blending===Ir&&v.alphaToCoverage===!1,alphaMap:pe,alphaTest:J,alphaHash:G,combine:v.combine,mapUv:Ne&&g(v.map.channel),aoMapUv:rt&&g(v.aoMap.channel),lightMapUv:ut&&g(v.lightMap.channel),bumpMapUv:We&&g(v.bumpMap.channel),normalMapUv:Pt&&g(v.normalMap.channel),displacementMapUv:R&&g(v.displacementMap.channel),emissiveMapUv:Ut&&g(v.emissiveMap.channel),metalnessMapUv:it&&g(v.metalnessMap.channel),roughnessMapUv:pt&&g(v.roughnessMap.channel),anisotropyMapUv:W&&g(v.anisotropyMap.channel),clearcoatMapUv:_e&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:ie&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pe&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Ue&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:ee&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:ve&&g(v.sheenRoughnessMap.channel),specularMapUv:Me&&g(v.specularMap.channel),specularColorMapUv:he&&g(v.specularColorMap.channel),specularIntensityMapUv:Xe&&g(v.specularIntensityMap.channel),transmissionMapUv:L&&g(v.transmissionMap.channel),thicknessMapUv:se&&g(v.thicknessMap.channel),alphaMapUv:pe&&g(v.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(Pt||ye),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!X.attributes.uv&&(Ne||pe),fog:!!z,useFog:v.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||X.attributes.normal===void 0&&Pt===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:re,skinning:k.isSkinnedMesh===!0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:ge,morphTextureStride:de,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:t.shadowMap.enabled&&q.length>0,shadowMapType:t.shadowMap.type,toneMapping:Oe,decodeVideoTexture:Ne&&v.map.isVideoTexture===!0&&Ze.getTransfer(v.map.colorSpace)===ot,decodeVideoTextureEmissive:Ut&&v.emissiveMap.isVideoTexture===!0&&Ze.getTransfer(v.emissiveMap.colorSpace)===ot,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===_i,flipSided:v.side===pn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:xe&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xe&&v.extensions.multiDraw===!0||De)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return mt.vertexUv1s=c.has(1),mt.vertexUv2s=c.has(2),mt.vertexUv3s=c.has(3),c.clear(),mt}function m(v){const b=[];if(v.shaderID?b.push(v.shaderID):(b.push(v.customVertexShaderID),b.push(v.customFragmentShaderID)),v.defines!==void 0)for(const q in v.defines)b.push(q),b.push(v.defines[q]);return v.isRawShaderMaterial===!1&&(p(b,v),S(b,v),b.push(t.outputColorSpace)),b.push(v.customProgramCacheKey),b.join()}function p(v,b){v.push(b.precision),v.push(b.outputColorSpace),v.push(b.envMapMode),v.push(b.envMapCubeUVHeight),v.push(b.mapUv),v.push(b.alphaMapUv),v.push(b.lightMapUv),v.push(b.aoMapUv),v.push(b.bumpMapUv),v.push(b.normalMapUv),v.push(b.displacementMapUv),v.push(b.emissiveMapUv),v.push(b.metalnessMapUv),v.push(b.roughnessMapUv),v.push(b.anisotropyMapUv),v.push(b.clearcoatMapUv),v.push(b.clearcoatNormalMapUv),v.push(b.clearcoatRoughnessMapUv),v.push(b.iridescenceMapUv),v.push(b.iridescenceThicknessMapUv),v.push(b.sheenColorMapUv),v.push(b.sheenRoughnessMapUv),v.push(b.specularMapUv),v.push(b.specularColorMapUv),v.push(b.specularIntensityMapUv),v.push(b.transmissionMapUv),v.push(b.thicknessMapUv),v.push(b.combine),v.push(b.fogExp2),v.push(b.sizeAttenuation),v.push(b.morphTargetsCount),v.push(b.morphAttributeCount),v.push(b.numDirLights),v.push(b.numPointLights),v.push(b.numSpotLights),v.push(b.numSpotLightMaps),v.push(b.numHemiLights),v.push(b.numRectAreaLights),v.push(b.numDirLightShadows),v.push(b.numPointLightShadows),v.push(b.numSpotLightShadows),v.push(b.numSpotLightShadowsWithMaps),v.push(b.numLightProbes),v.push(b.shadowMapType),v.push(b.toneMapping),v.push(b.numClippingPlanes),v.push(b.numClipIntersection),v.push(b.depthPacking)}function S(v,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),v.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),v.push(a.mask)}function T(v){const b=f[v.type];let q;if(b){const P=mi[b];q=sv.clone(P.uniforms)}else q=v.uniforms;return q}function y(v,b){let q=h.get(b);return q!==void 0?++q.usedTimes:(q=new DM(t,b,v,s),l.push(q),h.set(b,q)),q}function w(v){if(--v.usedTimes===0){const b=l.indexOf(v);l[b]=l[l.length-1],l.pop(),h.delete(v.cacheKey),v.destroy()}}function A(v){o.remove(v)}function C(){o.dispose()}return{getParameters:M,getProgramCacheKey:m,getUniforms:T,acquireProgram:y,releaseProgram:w,releaseShaderCache:A,programs:l,dispose:C}}function BM(){let t=new WeakMap;function e(a){return t.has(a)}function n(a){let o=t.get(a);return o===void 0&&(o={},t.set(a,o)),o}function i(a){t.delete(a)}function s(a,o,c){t.get(a)[o]=c}function r(){t=new WeakMap}return{has:e,get:n,remove:i,update:s,dispose:r}}function kM(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function op(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function cp(){const t=[];let e=0;const n=[],i=[],s=[];function r(){e=0,n.length=0,i.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,M,m,p){let S=t[e];return S===void 0?(S={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:M,renderOrder:u.renderOrder,z:m,group:p},t[e]=S):(S.id=u.id,S.object=u,S.geometry=f,S.material=g,S.materialVariant=a(u),S.groupOrder=M,S.renderOrder=u.renderOrder,S.z=m,S.group=p),e++,S}function c(u,f,g,M,m,p){const S=o(u,f,g,M,m,p);g.transmission>0?i.push(S):g.transparent===!0?s.push(S):n.push(S)}function l(u,f,g,M,m,p){const S=o(u,f,g,M,m,p);g.transmission>0?i.unshift(S):g.transparent===!0?s.unshift(S):n.unshift(S)}function h(u,f){n.length>1&&n.sort(u||kM),i.length>1&&i.sort(f||op),s.length>1&&s.sort(f||op)}function d(){for(let u=e,f=t.length;u<f;u++){const g=t[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:n,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:d,sort:h}}function zM(){let t=new WeakMap;function e(i,s){const r=t.get(i);let a;return r===void 0?(a=new cp,t.set(i,[a])):s>=r.length?(a=new cp,r.push(a)):a=r[s],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function VM(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new D,color:new $e};break;case"SpotLight":n={position:new D,direction:new D,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new D,color:new $e,distance:0,decay:0};break;case"HemisphereLight":n={direction:new D,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":n={color:new $e,position:new D,halfWidth:new D,halfHeight:new D};break}return t[e.id]=n,n}}}function HM(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let GM=0;function WM(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function XM(t){const e=new VM,n=HM(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new D);const s=new D,r=new Tt,a=new Tt;function o(l){let h=0,d=0,u=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let f=0,g=0,M=0,m=0,p=0,S=0,T=0,y=0,w=0,A=0,C=0;l.sort(WM);for(let b=0,q=l.length;b<q;b++){const P=l[b],k=P.color,z=P.intensity,X=P.distance;let B=null;if(P.shadow&&P.shadow.map&&(P.shadow.map.texture.format===Hr?B=P.shadow.map.texture:B=P.shadow.map.depthTexture||P.shadow.map.texture),P.isAmbientLight)h+=k.r*z,d+=k.g*z,u+=k.b*z;else if(P.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(P.sh.coefficients[H],z);C++}else if(P.isDirectionalLight){const H=e.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){const F=P.shadow,Q=n.get(P);Q.shadowIntensity=F.intensity,Q.shadowBias=F.bias,Q.shadowNormalBias=F.normalBias,Q.shadowRadius=F.radius,Q.shadowMapSize=F.mapSize,i.directionalShadow[f]=Q,i.directionalShadowMap[f]=B,i.directionalShadowMatrix[f]=P.shadow.matrix,S++}i.directional[f]=H,f++}else if(P.isSpotLight){const H=e.get(P);H.position.setFromMatrixPosition(P.matrixWorld),H.color.copy(k).multiplyScalar(z),H.distance=X,H.coneCos=Math.cos(P.angle),H.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),H.decay=P.decay,i.spot[M]=H;const F=P.shadow;if(P.map&&(i.spotLightMap[w]=P.map,w++,F.updateMatrices(P),P.castShadow&&A++),i.spotLightMatrix[M]=F.matrix,P.castShadow){const Q=n.get(P);Q.shadowIntensity=F.intensity,Q.shadowBias=F.bias,Q.shadowNormalBias=F.normalBias,Q.shadowRadius=F.radius,Q.shadowMapSize=F.mapSize,i.spotShadow[M]=Q,i.spotShadowMap[M]=B,y++}M++}else if(P.isRectAreaLight){const H=e.get(P);H.color.copy(k).multiplyScalar(z),H.halfWidth.set(P.width*.5,0,0),H.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=H,m++}else if(P.isPointLight){const H=e.get(P);if(H.color.copy(P.color).multiplyScalar(P.intensity),H.distance=P.distance,H.decay=P.decay,P.castShadow){const F=P.shadow,Q=n.get(P);Q.shadowIntensity=F.intensity,Q.shadowBias=F.bias,Q.shadowNormalBias=F.normalBias,Q.shadowRadius=F.radius,Q.shadowMapSize=F.mapSize,Q.shadowCameraNear=F.camera.near,Q.shadowCameraFar=F.camera.far,i.pointShadow[g]=Q,i.pointShadowMap[g]=B,i.pointShadowMatrix[g]=P.shadow.matrix,T++}i.point[g]=H,g++}else if(P.isHemisphereLight){const H=e.get(P);H.skyColor.copy(P.color).multiplyScalar(z),H.groundColor.copy(P.groundColor).multiplyScalar(z),i.hemi[p]=H,p++}}m>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ae.LTC_FLOAT_1,i.rectAreaLTC2=ae.LTC_FLOAT_2):(i.rectAreaLTC1=ae.LTC_HALF_1,i.rectAreaLTC2=ae.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;const v=i.hash;(v.directionalLength!==f||v.pointLength!==g||v.spotLength!==M||v.rectAreaLength!==m||v.hemiLength!==p||v.numDirectionalShadows!==S||v.numPointShadows!==T||v.numSpotShadows!==y||v.numSpotMaps!==w||v.numLightProbes!==C)&&(i.directional.length=f,i.spot.length=M,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=y+w-A,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=C,v.directionalLength=f,v.pointLength=g,v.spotLength=M,v.rectAreaLength=m,v.hemiLength=p,v.numDirectionalShadows=S,v.numPointShadows=T,v.numSpotShadows=y,v.numSpotMaps=w,v.numLightProbes=C,i.version=GM++)}function c(l,h){let d=0,u=0,f=0,g=0,M=0;const m=h.matrixWorldInverse;for(let p=0,S=l.length;p<S;p++){const T=l[p];if(T.isDirectionalLight){const y=i.directional[d];y.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),d++}else if(T.isSpotLight){const y=i.spot[f];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),f++}else if(T.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(T.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(T.width*.5,0,0),y.halfHeight.set(0,T.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(T.isPointLight){const y=i.point[u];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(m),u++}else if(T.isHemisphereLight){const y=i.hemi[M];y.direction.setFromMatrixPosition(T.matrixWorld),y.direction.transformDirection(m),M++}}}return{setup:o,setupView:c,state:i}}function lp(t){const e=new XM(t),n=[],i=[];function s(h){l.camera=h,n.length=0,i.length=0}function r(h){n.push(h)}function a(h){i.push(h)}function o(){e.setup(n)}function c(h){e.setupView(n,h)}const l={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function YM(t){let e=new WeakMap;function n(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new lp(t),e.set(s,[o])):r>=a.length?(o=new lp(t),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const qM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,$M=`uniform sampler2D shadow_pass;
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
}`,jM=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],KM=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],hp=new Tt,La=new D,$l=new D;function ZM(t,e,n){let i=new i0;const s=new st,r=new st,a=new Dt,o=new lv,c=new hv,l={},h=n.maxTextureSize,d={[ys]:pn,[pn]:ys,[_i]:_i},u=new ii({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new st},radius:{value:4}},vertexShader:qM,fragmentShader:$M}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new Ht;g.setAttribute("position",new ln(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new gn(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=rc;let p=this.type;this.render=function(A,C,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;this.type===X_&&(Fe("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=rc);const b=t.getRenderTarget(),q=t.getActiveCubeFace(),P=t.getActiveMipmapLevel(),k=t.state;k.setBlending(Xi),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const z=p!==this.type;z&&C.traverse(function(X){X.material&&(Array.isArray(X.material)?X.material.forEach(B=>B.needsUpdate=!0):X.material.needsUpdate=!0)});for(let X=0,B=A.length;X<B;X++){const H=A[X],F=H.shadow;if(F===void 0){Fe("WebGLShadowMap:",H,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;s.copy(F.mapSize);const Q=F.getFrameExtents();s.multiply(Q),r.copy(F.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Q.x),s.x=r.x*Q.x,F.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Q.y),s.y=r.y*Q.y,F.mapSize.y=r.y));const K=t.state.buffers.depth.getReversed();if(F.camera._reversedDepth=K,F.map===null||z===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===Oa){if(H.isPointLight){Fe("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new yi(s.x,s.y,{format:Hr,type:ji,minFilter:Zt,magFilter:Zt,generateMipmaps:!1}),F.map.texture.name=H.name+".shadowMap",F.map.depthTexture=new qa(s.x,s.y,vi),F.map.depthTexture.name=H.name+".shadowMapDepth",F.map.depthTexture.format=Ki,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Qt,F.map.depthTexture.magFilter=Qt}else H.isPointLight?(F.map=new h0(s.x),F.map.depthTexture=new Z1(s.x,Ai)):(F.map=new yi(s.x,s.y),F.map.depthTexture=new qa(s.x,s.y,Ai)),F.map.depthTexture.name=H.name+".shadowMap",F.map.depthTexture.format=Ki,this.type===rc?(F.map.depthTexture.compareFunction=K?Vu:zu,F.map.depthTexture.minFilter=Zt,F.map.depthTexture.magFilter=Zt):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=Qt,F.map.depthTexture.magFilter=Qt);F.camera.updateProjectionMatrix()}const le=F.map.isWebGLCubeRenderTarget?6:1;for(let ge=0;ge<le;ge++){if(F.map.isWebGLCubeRenderTarget)t.setRenderTarget(F.map,ge),t.clear();else{ge===0&&(t.setRenderTarget(F.map),t.clear());const de=F.getViewport(ge);a.set(r.x*de.x,r.y*de.y,r.x*de.z,r.y*de.w),k.viewport(a)}if(H.isPointLight){const de=F.camera,Ve=F.matrix,_t=H.distance||de.far;_t!==de.far&&(de.far=_t,de.updateProjectionMatrix()),La.setFromMatrixPosition(H.matrixWorld),de.position.copy(La),$l.copy(de.position),$l.add(jM[ge]),de.up.copy(KM[ge]),de.lookAt($l),de.updateMatrixWorld(),Ve.makeTranslation(-La.x,-La.y,-La.z),hp.multiplyMatrices(de.projectionMatrix,de.matrixWorldInverse),F._frustum.setFromProjectionMatrix(hp,de.coordinateSystem,de.reversedDepth)}else F.updateMatrices(H);i=F.getFrustum(),y(C,v,F.camera,H,this.type)}F.isPointLightShadow!==!0&&this.type===Oa&&S(F,v),F.needsUpdate=!1}p=this.type,m.needsUpdate=!1,t.setRenderTarget(b,q,P)};function S(A,C){const v=e.update(M);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new yi(s.x,s.y,{format:Hr,type:ji})),u.uniforms.shadow_pass.value=A.map.depthTexture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,t.setRenderTarget(A.mapPass),t.clear(),t.renderBufferDirect(C,null,v,u,M,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,t.setRenderTarget(A.map),t.clear(),t.renderBufferDirect(C,null,v,f,M,null)}function T(A,C,v,b){let q=null;const P=v.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(P!==void 0)q=P;else if(q=v.isPointLight===!0?c:o,t.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const k=q.uuid,z=C.uuid;let X=l[k];X===void 0&&(X={},l[k]=X);let B=X[z];B===void 0&&(B=q.clone(),X[z]=B,C.addEventListener("dispose",w)),q=B}if(q.visible=C.visible,q.wireframe=C.wireframe,b===Oa?q.side=C.shadowSide!==null?C.shadowSide:C.side:q.side=C.shadowSide!==null?C.shadowSide:d[C.side],q.alphaMap=C.alphaMap,q.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,q.map=C.map,q.clipShadows=C.clipShadows,q.clippingPlanes=C.clippingPlanes,q.clipIntersection=C.clipIntersection,q.displacementMap=C.displacementMap,q.displacementScale=C.displacementScale,q.displacementBias=C.displacementBias,q.wireframeLinewidth=C.wireframeLinewidth,q.linewidth=C.linewidth,v.isPointLight===!0&&q.isMeshDistanceMaterial===!0){const k=t.properties.get(q);k.light=v}return q}function y(A,C,v,b,q){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&q===Oa)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,A.matrixWorld);const z=e.update(A),X=A.material;if(Array.isArray(X)){const B=z.groups;for(let H=0,F=B.length;H<F;H++){const Q=B[H],K=X[Q.materialIndex];if(K&&K.visible){const le=T(A,K,b,q);A.onBeforeShadow(t,A,C,v,z,le,Q),t.renderBufferDirect(v,null,z,le,A,Q),A.onAfterShadow(t,A,C,v,z,le,Q)}}}else if(X.visible){const B=T(A,X,b,q);A.onBeforeShadow(t,A,C,v,z,B,null),t.renderBufferDirect(v,null,z,B,A,null),A.onAfterShadow(t,A,C,v,z,B,null)}}const k=A.children;for(let z=0,X=k.length;z<X;z++)y(k[z],C,v,b,q)}function w(A){A.target.removeEventListener("dispose",w);for(const v in l){const b=l[v],q=A.target.uuid;q in b&&(b[q].dispose(),delete b[q])}}}function JM(t,e){function n(){let L=!1;const se=new Dt;let te=null;const pe=new Dt(0,0,0,0);return{setMask:function(J){te!==J&&!L&&(t.colorMask(J,J,J,J),te=J)},setLocked:function(J){L=J},setClear:function(J,G,xe,Oe,mt){mt===!0&&(J*=Oe,G*=Oe,xe*=Oe),se.set(J,G,xe,Oe),pe.equals(se)===!1&&(t.clearColor(J,G,xe,Oe),pe.copy(se))},reset:function(){L=!1,te=null,pe.set(-1,0,0,0)}}}function i(){let L=!1,se=!1,te=null,pe=null,J=null;return{setReversed:function(G){if(se!==G){const xe=e.get("EXT_clip_control");G?xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.ZERO_TO_ONE_EXT):xe.clipControlEXT(xe.LOWER_LEFT_EXT,xe.NEGATIVE_ONE_TO_ONE_EXT),se=G;const Oe=J;J=null,this.setClear(Oe)}},getReversed:function(){return se},setTest:function(G){G?ne(t.DEPTH_TEST):re(t.DEPTH_TEST)},setMask:function(G){te!==G&&!L&&(t.depthMask(G),te=G)},setFunc:function(G){if(se&&(G=b1[G]),pe!==G){switch(G){case fh:t.depthFunc(t.NEVER);break;case ph:t.depthFunc(t.ALWAYS);break;case mh:t.depthFunc(t.LESS);break;case zr:t.depthFunc(t.LEQUAL);break;case gh:t.depthFunc(t.EQUAL);break;case _h:t.depthFunc(t.GEQUAL);break;case vh:t.depthFunc(t.GREATER);break;case xh:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}pe=G}},setLocked:function(G){L=G},setClear:function(G){J!==G&&(J=G,se&&(G=1-G),t.clearDepth(G))},reset:function(){L=!1,te=null,pe=null,J=null,se=!1}}}function s(){let L=!1,se=null,te=null,pe=null,J=null,G=null,xe=null,Oe=null,mt=null;return{setTest:function(at){L||(at?ne(t.STENCIL_TEST):re(t.STENCIL_TEST))},setMask:function(at){se!==at&&!L&&(t.stencilMask(at),se=at)},setFunc:function(at,Ui,Fi){(te!==at||pe!==Ui||J!==Fi)&&(t.stencilFunc(at,Ui,Fi),te=at,pe=Ui,J=Fi)},setOp:function(at,Ui,Fi){(G!==at||xe!==Ui||Oe!==Fi)&&(t.stencilOp(at,Ui,Fi),G=at,xe=Ui,Oe=Fi)},setLocked:function(at){L=at},setClear:function(at){mt!==at&&(t.clearStencil(at),mt=at)},reset:function(){L=!1,se=null,te=null,pe=null,J=null,G=null,xe=null,Oe=null,mt=null}}}const r=new n,a=new i,o=new s,c=new WeakMap,l=new WeakMap;let h={},d={},u=new WeakMap,f=[],g=null,M=!1,m=null,p=null,S=null,T=null,y=null,w=null,A=null,C=new $e(0,0,0),v=0,b=!1,q=null,P=null,k=null,z=null,X=null;const B=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,F=0;const Q=t.getParameter(t.VERSION);Q.indexOf("WebGL")!==-1?(F=parseFloat(/^WebGL (\d)/.exec(Q)[1]),H=F>=1):Q.indexOf("OpenGL ES")!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),H=F>=2);let K=null,le={};const ge=t.getParameter(t.SCISSOR_BOX),de=t.getParameter(t.VIEWPORT),Ve=new Dt().fromArray(ge),_t=new Dt().fromArray(de);function gt(L,se,te,pe){const J=new Uint8Array(4),G=t.createTexture();t.bindTexture(L,G),t.texParameteri(L,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(L,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let xe=0;xe<te;xe++)L===t.TEXTURE_3D||L===t.TEXTURE_2D_ARRAY?t.texImage3D(se,0,t.RGBA,1,1,pe,0,t.RGBA,t.UNSIGNED_BYTE,J):t.texImage2D(se+xe,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,J);return G}const $={};$[t.TEXTURE_2D]=gt(t.TEXTURE_2D,t.TEXTURE_2D,1),$[t.TEXTURE_CUBE_MAP]=gt(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[t.TEXTURE_2D_ARRAY]=gt(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),$[t.TEXTURE_3D]=gt(t.TEXTURE_3D,t.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(t.DEPTH_TEST),a.setFunc(zr),We(!1),Pt(lf),ne(t.CULL_FACE),rt(Xi);function ne(L){h[L]!==!0&&(t.enable(L),h[L]=!0)}function re(L){h[L]!==!1&&(t.disable(L),h[L]=!1)}function ke(L,se){return d[L]!==se?(t.bindFramebuffer(L,se),d[L]=se,L===t.DRAW_FRAMEBUFFER&&(d[t.FRAMEBUFFER]=se),L===t.FRAMEBUFFER&&(d[t.DRAW_FRAMEBUFFER]=se),!0):!1}function De(L,se){let te=f,pe=!1;if(L){te=u.get(se),te===void 0&&(te=[],u.set(se,te));const J=L.textures;if(te.length!==J.length||te[0]!==t.COLOR_ATTACHMENT0){for(let G=0,xe=J.length;G<xe;G++)te[G]=t.COLOR_ATTACHMENT0+G;te.length=J.length,pe=!0}}else te[0]!==t.BACK&&(te[0]=t.BACK,pe=!0);pe&&t.drawBuffers(te)}function Ne(L){return g!==L?(t.useProgram(L),g=L,!0):!1}const Yt={[Vs]:t.FUNC_ADD,[q_]:t.FUNC_SUBTRACT,[$_]:t.FUNC_REVERSE_SUBTRACT};Yt[j_]=t.MIN,Yt[K_]=t.MAX;const Ke={[Z_]:t.ZERO,[J_]:t.ONE,[Q_]:t.SRC_COLOR,[uh]:t.SRC_ALPHA,[r1]:t.SRC_ALPHA_SATURATE,[i1]:t.DST_COLOR,[t1]:t.DST_ALPHA,[e1]:t.ONE_MINUS_SRC_COLOR,[dh]:t.ONE_MINUS_SRC_ALPHA,[s1]:t.ONE_MINUS_DST_COLOR,[n1]:t.ONE_MINUS_DST_ALPHA,[a1]:t.CONSTANT_COLOR,[o1]:t.ONE_MINUS_CONSTANT_COLOR,[c1]:t.CONSTANT_ALPHA,[l1]:t.ONE_MINUS_CONSTANT_ALPHA};function rt(L,se,te,pe,J,G,xe,Oe,mt,at){if(L===Xi){M===!0&&(re(t.BLEND),M=!1);return}if(M===!1&&(ne(t.BLEND),M=!0),L!==Y_){if(L!==m||at!==b){if((p!==Vs||y!==Vs)&&(t.blendEquation(t.FUNC_ADD),p=Vs,y=Vs),at)switch(L){case Ir:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Ti:t.blendFunc(t.ONE,t.ONE);break;case hf:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case uf:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:et("WebGLState: Invalid blending: ",L);break}else switch(L){case Ir:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Ti:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case hf:et("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case uf:et("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:et("WebGLState: Invalid blending: ",L);break}S=null,T=null,w=null,A=null,C.set(0,0,0),v=0,m=L,b=at}return}J=J||se,G=G||te,xe=xe||pe,(se!==p||J!==y)&&(t.blendEquationSeparate(Yt[se],Yt[J]),p=se,y=J),(te!==S||pe!==T||G!==w||xe!==A)&&(t.blendFuncSeparate(Ke[te],Ke[pe],Ke[G],Ke[xe]),S=te,T=pe,w=G,A=xe),(Oe.equals(C)===!1||mt!==v)&&(t.blendColor(Oe.r,Oe.g,Oe.b,mt),C.copy(Oe),v=mt),m=L,b=!1}function ut(L,se){L.side===_i?re(t.CULL_FACE):ne(t.CULL_FACE);let te=L.side===pn;se&&(te=!te),We(te),L.blending===Ir&&L.transparent===!1?rt(Xi):rt(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);const pe=L.stencilWrite;o.setTest(pe),pe&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Ut(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ne(t.SAMPLE_ALPHA_TO_COVERAGE):re(t.SAMPLE_ALPHA_TO_COVERAGE)}function We(L){q!==L&&(L?t.frontFace(t.CW):t.frontFace(t.CCW),q=L)}function Pt(L){L!==G_?(ne(t.CULL_FACE),L!==P&&(L===lf?t.cullFace(t.BACK):L===W_?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):re(t.CULL_FACE),P=L}function R(L){L!==k&&(H&&t.lineWidth(L),k=L)}function Ut(L,se,te){L?(ne(t.POLYGON_OFFSET_FILL),(z!==se||X!==te)&&(z=se,X=te,a.getReversed()&&(se=-se),t.polygonOffset(se,te))):re(t.POLYGON_OFFSET_FILL)}function it(L){L?ne(t.SCISSOR_TEST):re(t.SCISSOR_TEST)}function pt(L){L===void 0&&(L=t.TEXTURE0+B-1),K!==L&&(t.activeTexture(L),K=L)}function ye(L,se,te){te===void 0&&(K===null?te=t.TEXTURE0+B-1:te=K);let pe=le[te];pe===void 0&&(pe={type:void 0,texture:void 0},le[te]=pe),(pe.type!==L||pe.texture!==se)&&(K!==te&&(t.activeTexture(te),K=te),t.bindTexture(L,se||$[L]),pe.type=L,pe.texture=se)}function E(){const L=le[K];L!==void 0&&L.type!==void 0&&(t.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function _(){try{t.compressedTexImage2D(...arguments)}catch(L){et("WebGLState:",L)}}function I(){try{t.compressedTexImage3D(...arguments)}catch(L){et("WebGLState:",L)}}function Y(){try{t.texSubImage2D(...arguments)}catch(L){et("WebGLState:",L)}}function j(){try{t.texSubImage3D(...arguments)}catch(L){et("WebGLState:",L)}}function W(){try{t.compressedTexSubImage2D(...arguments)}catch(L){et("WebGLState:",L)}}function _e(){try{t.compressedTexSubImage3D(...arguments)}catch(L){et("WebGLState:",L)}}function ie(){try{t.texStorage2D(...arguments)}catch(L){et("WebGLState:",L)}}function Pe(){try{t.texStorage3D(...arguments)}catch(L){et("WebGLState:",L)}}function Ue(){try{t.texImage2D(...arguments)}catch(L){et("WebGLState:",L)}}function Z(){try{t.texImage3D(...arguments)}catch(L){et("WebGLState:",L)}}function ee(L){Ve.equals(L)===!1&&(t.scissor(L.x,L.y,L.z,L.w),Ve.copy(L))}function ve(L){_t.equals(L)===!1&&(t.viewport(L.x,L.y,L.z,L.w),_t.copy(L))}function Me(L,se){let te=l.get(se);te===void 0&&(te=new WeakMap,l.set(se,te));let pe=te.get(L);pe===void 0&&(pe=t.getUniformBlockIndex(se,L.name),te.set(L,pe))}function he(L,se){const pe=l.get(se).get(L);c.get(se)!==pe&&(t.uniformBlockBinding(se,pe,L.__bindingPointIndex),c.set(se,pe))}function Xe(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),a.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),h={},K=null,le={},d={},u=new WeakMap,f=[],g=null,M=!1,m=null,p=null,S=null,T=null,y=null,w=null,A=null,C=new $e(0,0,0),v=0,b=!1,q=null,P=null,k=null,z=null,X=null,Ve.set(0,0,t.canvas.width,t.canvas.height),_t.set(0,0,t.canvas.width,t.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ne,disable:re,bindFramebuffer:ke,drawBuffers:De,useProgram:Ne,setBlending:rt,setMaterial:ut,setFlipSided:We,setCullFace:Pt,setLineWidth:R,setPolygonOffset:Ut,setScissorTest:it,activeTexture:pt,bindTexture:ye,unbindTexture:E,compressedTexImage2D:_,compressedTexImage3D:I,texImage2D:Ue,texImage3D:Z,updateUBOMapping:Me,uniformBlockBinding:he,texStorage2D:ie,texStorage3D:Pe,texSubImage2D:Y,texSubImage3D:j,compressedTexSubImage2D:W,compressedTexSubImage3D:_e,scissor:ee,viewport:ve,reset:Xe}}function QM(t,e,n,i,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new st,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,_){return f?new OffscreenCanvas(E,_):yc("canvas")}function M(E,_,I){let Y=1;const j=ye(E);if((j.width>I||j.height>I)&&(Y=I/Math.max(j.width,j.height)),Y<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const W=Math.floor(Y*j.width),_e=Math.floor(Y*j.height);d===void 0&&(d=g(W,_e));const ie=_?g(W,_e):d;return ie.width=W,ie.height=_e,ie.getContext("2d").drawImage(E,0,0,W,_e),Fe("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+W+"x"+_e+")."),ie}else return"data"in E&&Fe("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),E;return E}function m(E){return E.generateMipmaps}function p(E){t.generateMipmap(E)}function S(E){return E.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?t.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function T(E,_,I,Y,j=!1){if(E!==null){if(t[E]!==void 0)return t[E];Fe("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let W=_;if(_===t.RED&&(I===t.FLOAT&&(W=t.R32F),I===t.HALF_FLOAT&&(W=t.R16F),I===t.UNSIGNED_BYTE&&(W=t.R8)),_===t.RED_INTEGER&&(I===t.UNSIGNED_BYTE&&(W=t.R8UI),I===t.UNSIGNED_SHORT&&(W=t.R16UI),I===t.UNSIGNED_INT&&(W=t.R32UI),I===t.BYTE&&(W=t.R8I),I===t.SHORT&&(W=t.R16I),I===t.INT&&(W=t.R32I)),_===t.RG&&(I===t.FLOAT&&(W=t.RG32F),I===t.HALF_FLOAT&&(W=t.RG16F),I===t.UNSIGNED_BYTE&&(W=t.RG8)),_===t.RG_INTEGER&&(I===t.UNSIGNED_BYTE&&(W=t.RG8UI),I===t.UNSIGNED_SHORT&&(W=t.RG16UI),I===t.UNSIGNED_INT&&(W=t.RG32UI),I===t.BYTE&&(W=t.RG8I),I===t.SHORT&&(W=t.RG16I),I===t.INT&&(W=t.RG32I)),_===t.RGB_INTEGER&&(I===t.UNSIGNED_BYTE&&(W=t.RGB8UI),I===t.UNSIGNED_SHORT&&(W=t.RGB16UI),I===t.UNSIGNED_INT&&(W=t.RGB32UI),I===t.BYTE&&(W=t.RGB8I),I===t.SHORT&&(W=t.RGB16I),I===t.INT&&(W=t.RGB32I)),_===t.RGBA_INTEGER&&(I===t.UNSIGNED_BYTE&&(W=t.RGBA8UI),I===t.UNSIGNED_SHORT&&(W=t.RGBA16UI),I===t.UNSIGNED_INT&&(W=t.RGBA32UI),I===t.BYTE&&(W=t.RGBA8I),I===t.SHORT&&(W=t.RGBA16I),I===t.INT&&(W=t.RGBA32I)),_===t.RGB&&(I===t.UNSIGNED_INT_5_9_9_9_REV&&(W=t.RGB9_E5),I===t.UNSIGNED_INT_10F_11F_11F_REV&&(W=t.R11F_G11F_B10F)),_===t.RGBA){const _e=j?Mc:Ze.getTransfer(Y);I===t.FLOAT&&(W=t.RGBA32F),I===t.HALF_FLOAT&&(W=t.RGBA16F),I===t.UNSIGNED_BYTE&&(W=_e===ot?t.SRGB8_ALPHA8:t.RGBA8),I===t.UNSIGNED_SHORT_4_4_4_4&&(W=t.RGBA4),I===t.UNSIGNED_SHORT_5_5_5_1&&(W=t.RGB5_A1)}return(W===t.R16F||W===t.R32F||W===t.RG16F||W===t.RG32F||W===t.RGBA16F||W===t.RGBA32F)&&e.get("EXT_color_buffer_float"),W}function y(E,_){let I;return E?_===null||_===Ai||_===Ya?I=t.DEPTH24_STENCIL8:_===vi?I=t.DEPTH32F_STENCIL8:_===Xa&&(I=t.DEPTH24_STENCIL8,Fe("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Ai||_===Ya?I=t.DEPTH_COMPONENT24:_===vi?I=t.DEPTH_COMPONENT32F:_===Xa&&(I=t.DEPTH_COMPONENT16),I}function w(E,_){return m(E)===!0||E.isFramebufferTexture&&E.minFilter!==Qt&&E.minFilter!==Zt?Math.log2(Math.max(_.width,_.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?_.mipmaps.length:1}function A(E){const _=E.target;_.removeEventListener("dispose",A),v(_),_.isVideoTexture&&h.delete(_)}function C(E){const _=E.target;_.removeEventListener("dispose",C),q(_)}function v(E){const _=i.get(E);if(_.__webglInit===void 0)return;const I=E.source,Y=u.get(I);if(Y){const j=Y[_.__cacheKey];j.usedTimes--,j.usedTimes===0&&b(E),Object.keys(Y).length===0&&u.delete(I)}i.remove(E)}function b(E){const _=i.get(E);t.deleteTexture(_.__webglTexture);const I=E.source,Y=u.get(I);delete Y[_.__cacheKey],a.memory.textures--}function q(E){const _=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(_.__webglFramebuffer[Y]))for(let j=0;j<_.__webglFramebuffer[Y].length;j++)t.deleteFramebuffer(_.__webglFramebuffer[Y][j]);else t.deleteFramebuffer(_.__webglFramebuffer[Y]);_.__webglDepthbuffer&&t.deleteRenderbuffer(_.__webglDepthbuffer[Y])}else{if(Array.isArray(_.__webglFramebuffer))for(let Y=0;Y<_.__webglFramebuffer.length;Y++)t.deleteFramebuffer(_.__webglFramebuffer[Y]);else t.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&t.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&t.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let Y=0;Y<_.__webglColorRenderbuffer.length;Y++)_.__webglColorRenderbuffer[Y]&&t.deleteRenderbuffer(_.__webglColorRenderbuffer[Y]);_.__webglDepthRenderbuffer&&t.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const I=E.textures;for(let Y=0,j=I.length;Y<j;Y++){const W=i.get(I[Y]);W.__webglTexture&&(t.deleteTexture(W.__webglTexture),a.memory.textures--),i.remove(I[Y])}i.remove(E)}let P=0;function k(){P=0}function z(){const E=P;return E>=s.maxTextures&&Fe("WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),P+=1,E}function X(E){const _=[];return _.push(E.wrapS),_.push(E.wrapT),_.push(E.wrapR||0),_.push(E.magFilter),_.push(E.minFilter),_.push(E.anisotropy),_.push(E.internalFormat),_.push(E.format),_.push(E.type),_.push(E.generateMipmaps),_.push(E.premultiplyAlpha),_.push(E.flipY),_.push(E.unpackAlignment),_.push(E.colorSpace),_.join()}function B(E,_){const I=i.get(E);if(E.isVideoTexture&&it(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&I.__version!==E.version){const Y=E.image;if(Y===null)Fe("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Fe("WebGLRenderer: Texture marked for update but image is incomplete");else{$(I,E,_);return}}else E.isExternalTexture&&(I.__webglTexture=E.sourceTexture?E.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,I.__webglTexture,t.TEXTURE0+_)}function H(E,_){const I=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&I.__version!==E.version){$(I,E,_);return}else E.isExternalTexture&&(I.__webglTexture=E.sourceTexture?E.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,I.__webglTexture,t.TEXTURE0+_)}function F(E,_){const I=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&I.__version!==E.version){$(I,E,_);return}n.bindTexture(t.TEXTURE_3D,I.__webglTexture,t.TEXTURE0+_)}function Q(E,_){const I=i.get(E);if(E.isCubeDepthTexture!==!0&&E.version>0&&I.__version!==E.version){ne(I,E,_);return}n.bindTexture(t.TEXTURE_CUBE_MAP,I.__webglTexture,t.TEXTURE0+_)}const K={[Mh]:t.REPEAT,[Gi]:t.CLAMP_TO_EDGE,[Sh]:t.MIRRORED_REPEAT},le={[Qt]:t.NEAREST,[d1]:t.NEAREST_MIPMAP_NEAREST,[So]:t.NEAREST_MIPMAP_LINEAR,[Zt]:t.LINEAR,[gl]:t.LINEAR_MIPMAP_NEAREST,[Ws]:t.LINEAR_MIPMAP_LINEAR},ge={[m1]:t.NEVER,[M1]:t.ALWAYS,[g1]:t.LESS,[zu]:t.LEQUAL,[_1]:t.EQUAL,[Vu]:t.GEQUAL,[v1]:t.GREATER,[x1]:t.NOTEQUAL};function de(E,_){if(_.type===vi&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Zt||_.magFilter===gl||_.magFilter===So||_.magFilter===Ws||_.minFilter===Zt||_.minFilter===gl||_.minFilter===So||_.minFilter===Ws)&&Fe("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(E,t.TEXTURE_WRAP_S,K[_.wrapS]),t.texParameteri(E,t.TEXTURE_WRAP_T,K[_.wrapT]),(E===t.TEXTURE_3D||E===t.TEXTURE_2D_ARRAY)&&t.texParameteri(E,t.TEXTURE_WRAP_R,K[_.wrapR]),t.texParameteri(E,t.TEXTURE_MAG_FILTER,le[_.magFilter]),t.texParameteri(E,t.TEXTURE_MIN_FILTER,le[_.minFilter]),_.compareFunction&&(t.texParameteri(E,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(E,t.TEXTURE_COMPARE_FUNC,ge[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Qt||_.minFilter!==So&&_.minFilter!==Ws||_.type===vi&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const I=e.get("EXT_texture_filter_anisotropic");t.texParameterf(E,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Ve(E,_){let I=!1;E.__webglInit===void 0&&(E.__webglInit=!0,_.addEventListener("dispose",A));const Y=_.source;let j=u.get(Y);j===void 0&&(j={},u.set(Y,j));const W=X(_);if(W!==E.__cacheKey){j[W]===void 0&&(j[W]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,I=!0),j[W].usedTimes++;const _e=j[E.__cacheKey];_e!==void 0&&(j[E.__cacheKey].usedTimes--,_e.usedTimes===0&&b(_)),E.__cacheKey=W,E.__webglTexture=j[W].texture}return I}function _t(E,_,I){return Math.floor(Math.floor(E/I)/_)}function gt(E,_,I,Y){const W=E.updateRanges;if(W.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,_.width,_.height,I,Y,_.data);else{W.sort((Z,ee)=>Z.start-ee.start);let _e=0;for(let Z=1;Z<W.length;Z++){const ee=W[_e],ve=W[Z],Me=ee.start+ee.count,he=_t(ve.start,_.width,4),Xe=_t(ee.start,_.width,4);ve.start<=Me+1&&he===Xe&&_t(ve.start+ve.count-1,_.width,4)===he?ee.count=Math.max(ee.count,ve.start+ve.count-ee.start):(++_e,W[_e]=ve)}W.length=_e+1;const ie=t.getParameter(t.UNPACK_ROW_LENGTH),Pe=t.getParameter(t.UNPACK_SKIP_PIXELS),Ue=t.getParameter(t.UNPACK_SKIP_ROWS);t.pixelStorei(t.UNPACK_ROW_LENGTH,_.width);for(let Z=0,ee=W.length;Z<ee;Z++){const ve=W[Z],Me=Math.floor(ve.start/4),he=Math.ceil(ve.count/4),Xe=Me%_.width,L=Math.floor(Me/_.width),se=he,te=1;t.pixelStorei(t.UNPACK_SKIP_PIXELS,Xe),t.pixelStorei(t.UNPACK_SKIP_ROWS,L),n.texSubImage2D(t.TEXTURE_2D,0,Xe,L,se,te,I,Y,_.data)}E.clearUpdateRanges(),t.pixelStorei(t.UNPACK_ROW_LENGTH,ie),t.pixelStorei(t.UNPACK_SKIP_PIXELS,Pe),t.pixelStorei(t.UNPACK_SKIP_ROWS,Ue)}}function $(E,_,I){let Y=t.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(Y=t.TEXTURE_2D_ARRAY),_.isData3DTexture&&(Y=t.TEXTURE_3D);const j=Ve(E,_),W=_.source;n.bindTexture(Y,E.__webglTexture,t.TEXTURE0+I);const _e=i.get(W);if(W.version!==_e.__version||j===!0){n.activeTexture(t.TEXTURE0+I);const ie=Ze.getPrimaries(Ze.workingColorSpace),Pe=_.colorSpace===ps?null:Ze.getPrimaries(_.colorSpace),Ue=_.colorSpace===ps||ie===Pe?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ue);let Z=M(_.image,!1,s.maxTextureSize);Z=pt(_,Z);const ee=r.convert(_.format,_.colorSpace),ve=r.convert(_.type);let Me=T(_.internalFormat,ee,ve,_.colorSpace,_.isVideoTexture);de(Y,_);let he;const Xe=_.mipmaps,L=_.isVideoTexture!==!0,se=_e.__version===void 0||j===!0,te=W.dataReady,pe=w(_,Z);if(_.isDepthTexture)Me=y(_.format===Xs,_.type),se&&(L?n.texStorage2D(t.TEXTURE_2D,1,Me,Z.width,Z.height):n.texImage2D(t.TEXTURE_2D,0,Me,Z.width,Z.height,0,ee,ve,null));else if(_.isDataTexture)if(Xe.length>0){L&&se&&n.texStorage2D(t.TEXTURE_2D,pe,Me,Xe[0].width,Xe[0].height);for(let J=0,G=Xe.length;J<G;J++)he=Xe[J],L?te&&n.texSubImage2D(t.TEXTURE_2D,J,0,0,he.width,he.height,ee,ve,he.data):n.texImage2D(t.TEXTURE_2D,J,Me,he.width,he.height,0,ee,ve,he.data);_.generateMipmaps=!1}else L?(se&&n.texStorage2D(t.TEXTURE_2D,pe,Me,Z.width,Z.height),te&&gt(_,Z,ee,ve)):n.texImage2D(t.TEXTURE_2D,0,Me,Z.width,Z.height,0,ee,ve,Z.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){L&&se&&n.texStorage3D(t.TEXTURE_2D_ARRAY,pe,Me,Xe[0].width,Xe[0].height,Z.depth);for(let J=0,G=Xe.length;J<G;J++)if(he=Xe[J],_.format!==ti)if(ee!==null)if(L){if(te)if(_.layerUpdates.size>0){const xe=Vf(he.width,he.height,_.format,_.type);for(const Oe of _.layerUpdates){const mt=he.data.subarray(Oe*xe/he.data.BYTES_PER_ELEMENT,(Oe+1)*xe/he.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,J,0,0,Oe,he.width,he.height,1,ee,mt)}_.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,J,0,0,0,he.width,he.height,Z.depth,ee,he.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,J,Me,he.width,he.height,Z.depth,0,he.data,0,0);else Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?te&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,J,0,0,0,he.width,he.height,Z.depth,ee,ve,he.data):n.texImage3D(t.TEXTURE_2D_ARRAY,J,Me,he.width,he.height,Z.depth,0,ee,ve,he.data)}else{L&&se&&n.texStorage2D(t.TEXTURE_2D,pe,Me,Xe[0].width,Xe[0].height);for(let J=0,G=Xe.length;J<G;J++)he=Xe[J],_.format!==ti?ee!==null?L?te&&n.compressedTexSubImage2D(t.TEXTURE_2D,J,0,0,he.width,he.height,ee,he.data):n.compressedTexImage2D(t.TEXTURE_2D,J,Me,he.width,he.height,0,he.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?te&&n.texSubImage2D(t.TEXTURE_2D,J,0,0,he.width,he.height,ee,ve,he.data):n.texImage2D(t.TEXTURE_2D,J,Me,he.width,he.height,0,ee,ve,he.data)}else if(_.isDataArrayTexture)if(L){if(se&&n.texStorage3D(t.TEXTURE_2D_ARRAY,pe,Me,Z.width,Z.height,Z.depth),te)if(_.layerUpdates.size>0){const J=Vf(Z.width,Z.height,_.format,_.type);for(const G of _.layerUpdates){const xe=Z.data.subarray(G*J/Z.data.BYTES_PER_ELEMENT,(G+1)*J/Z.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,G,Z.width,Z.height,1,ee,ve,xe)}_.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,ee,ve,Z.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,Me,Z.width,Z.height,Z.depth,0,ee,ve,Z.data);else if(_.isData3DTexture)L?(se&&n.texStorage3D(t.TEXTURE_3D,pe,Me,Z.width,Z.height,Z.depth),te&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,ee,ve,Z.data)):n.texImage3D(t.TEXTURE_3D,0,Me,Z.width,Z.height,Z.depth,0,ee,ve,Z.data);else if(_.isFramebufferTexture){if(se)if(L)n.texStorage2D(t.TEXTURE_2D,pe,Me,Z.width,Z.height);else{let J=Z.width,G=Z.height;for(let xe=0;xe<pe;xe++)n.texImage2D(t.TEXTURE_2D,xe,Me,J,G,0,ee,ve,null),J>>=1,G>>=1}}else if(Xe.length>0){if(L&&se){const J=ye(Xe[0]);n.texStorage2D(t.TEXTURE_2D,pe,Me,J.width,J.height)}for(let J=0,G=Xe.length;J<G;J++)he=Xe[J],L?te&&n.texSubImage2D(t.TEXTURE_2D,J,0,0,ee,ve,he):n.texImage2D(t.TEXTURE_2D,J,Me,ee,ve,he);_.generateMipmaps=!1}else if(L){if(se){const J=ye(Z);n.texStorage2D(t.TEXTURE_2D,pe,Me,J.width,J.height)}te&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ee,ve,Z)}else n.texImage2D(t.TEXTURE_2D,0,Me,ee,ve,Z);m(_)&&p(Y),_e.__version=W.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function ne(E,_,I){if(_.image.length!==6)return;const Y=Ve(E,_),j=_.source;n.bindTexture(t.TEXTURE_CUBE_MAP,E.__webglTexture,t.TEXTURE0+I);const W=i.get(j);if(j.version!==W.__version||Y===!0){n.activeTexture(t.TEXTURE0+I);const _e=Ze.getPrimaries(Ze.workingColorSpace),ie=_.colorSpace===ps?null:Ze.getPrimaries(_.colorSpace),Pe=_.colorSpace===ps||_e===ie?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe);const Ue=_.isCompressedTexture||_.image[0].isCompressedTexture,Z=_.image[0]&&_.image[0].isDataTexture,ee=[];for(let G=0;G<6;G++)!Ue&&!Z?ee[G]=M(_.image[G],!0,s.maxCubemapSize):ee[G]=Z?_.image[G].image:_.image[G],ee[G]=pt(_,ee[G]);const ve=ee[0],Me=r.convert(_.format,_.colorSpace),he=r.convert(_.type),Xe=T(_.internalFormat,Me,he,_.colorSpace),L=_.isVideoTexture!==!0,se=W.__version===void 0||Y===!0,te=j.dataReady;let pe=w(_,ve);de(t.TEXTURE_CUBE_MAP,_);let J;if(Ue){L&&se&&n.texStorage2D(t.TEXTURE_CUBE_MAP,pe,Xe,ve.width,ve.height);for(let G=0;G<6;G++){J=ee[G].mipmaps;for(let xe=0;xe<J.length;xe++){const Oe=J[xe];_.format!==ti?Me!==null?L?te&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,xe,0,0,Oe.width,Oe.height,Me,Oe.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,xe,Xe,Oe.width,Oe.height,0,Oe.data):Fe("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,xe,0,0,Oe.width,Oe.height,Me,he,Oe.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,xe,Xe,Oe.width,Oe.height,0,Me,he,Oe.data)}}}else{if(J=_.mipmaps,L&&se){J.length>0&&pe++;const G=ye(ee[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,pe,Xe,G.width,G.height)}for(let G=0;G<6;G++)if(Z){L?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,0,0,ee[G].width,ee[G].height,Me,he,ee[G].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,Xe,ee[G].width,ee[G].height,0,Me,he,ee[G].data);for(let xe=0;xe<J.length;xe++){const mt=J[xe].image[G].image;L?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,xe+1,0,0,mt.width,mt.height,Me,he,mt.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,xe+1,Xe,mt.width,mt.height,0,Me,he,mt.data)}}else{L?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,0,0,Me,he,ee[G]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,Xe,Me,he,ee[G]);for(let xe=0;xe<J.length;xe++){const Oe=J[xe];L?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,xe+1,0,0,Me,he,Oe.image[G]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+G,xe+1,Xe,Me,he,Oe.image[G])}}}m(_)&&p(t.TEXTURE_CUBE_MAP),W.__version=j.version,_.onUpdate&&_.onUpdate(_)}E.__version=_.version}function re(E,_,I,Y,j,W){const _e=r.convert(I.format,I.colorSpace),ie=r.convert(I.type),Pe=T(I.internalFormat,_e,ie,I.colorSpace),Ue=i.get(_),Z=i.get(I);if(Z.__renderTarget=_,!Ue.__hasExternalTextures){const ee=Math.max(1,_.width>>W),ve=Math.max(1,_.height>>W);j===t.TEXTURE_3D||j===t.TEXTURE_2D_ARRAY?n.texImage3D(j,W,Pe,ee,ve,_.depth,0,_e,ie,null):n.texImage2D(j,W,Pe,ee,ve,0,_e,ie,null)}n.bindFramebuffer(t.FRAMEBUFFER,E),Ut(_)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Y,j,Z.__webglTexture,0,R(_)):(j===t.TEXTURE_2D||j>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,Y,j,Z.__webglTexture,W),n.bindFramebuffer(t.FRAMEBUFFER,null)}function ke(E,_,I){if(t.bindRenderbuffer(t.RENDERBUFFER,E),_.depthBuffer){const Y=_.depthTexture,j=Y&&Y.isDepthTexture?Y.type:null,W=y(_.stencilBuffer,j),_e=_.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;Ut(_)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,R(_),W,_.width,_.height):I?t.renderbufferStorageMultisample(t.RENDERBUFFER,R(_),W,_.width,_.height):t.renderbufferStorage(t.RENDERBUFFER,W,_.width,_.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,_e,t.RENDERBUFFER,E)}else{const Y=_.textures;for(let j=0;j<Y.length;j++){const W=Y[j],_e=r.convert(W.format,W.colorSpace),ie=r.convert(W.type),Pe=T(W.internalFormat,_e,ie,W.colorSpace);Ut(_)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,R(_),Pe,_.width,_.height):I?t.renderbufferStorageMultisample(t.RENDERBUFFER,R(_),Pe,_.width,_.height):t.renderbufferStorage(t.RENDERBUFFER,Pe,_.width,_.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function De(E,_,I){const Y=_.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,E),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=i.get(_.depthTexture);if(j.__renderTarget=_,(!j.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),Y){if(j.__webglInit===void 0&&(j.__webglInit=!0,_.depthTexture.addEventListener("dispose",A)),j.__webglTexture===void 0){j.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,j.__webglTexture),de(t.TEXTURE_CUBE_MAP,_.depthTexture);const Ue=r.convert(_.depthTexture.format),Z=r.convert(_.depthTexture.type);let ee;_.depthTexture.format===Ki?ee=t.DEPTH_COMPONENT24:_.depthTexture.format===Xs&&(ee=t.DEPTH24_STENCIL8);for(let ve=0;ve<6;ve++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,ee,_.width,_.height,0,Ue,Z,null)}}else B(_.depthTexture,0);const W=j.__webglTexture,_e=R(_),ie=Y?t.TEXTURE_CUBE_MAP_POSITIVE_X+I:t.TEXTURE_2D,Pe=_.depthTexture.format===Xs?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(_.depthTexture.format===Ki)Ut(_)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Pe,ie,W,0,_e):t.framebufferTexture2D(t.FRAMEBUFFER,Pe,ie,W,0);else if(_.depthTexture.format===Xs)Ut(_)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Pe,ie,W,0,_e):t.framebufferTexture2D(t.FRAMEBUFFER,Pe,ie,W,0);else throw new Error("Unknown depthTexture format")}function Ne(E){const _=i.get(E),I=E.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==E.depthTexture){const Y=E.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),Y){const j=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,Y.removeEventListener("dispose",j)};Y.addEventListener("dispose",j),_.__depthDisposeCallback=j}_.__boundDepthTexture=Y}if(E.depthTexture&&!_.__autoAllocateDepthBuffer)if(I)for(let Y=0;Y<6;Y++)De(_.__webglFramebuffer[Y],E,Y);else{const Y=E.texture.mipmaps;Y&&Y.length>0?De(_.__webglFramebuffer[0],E,0):De(_.__webglFramebuffer,E,0)}else if(I){_.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(n.bindFramebuffer(t.FRAMEBUFFER,_.__webglFramebuffer[Y]),_.__webglDepthbuffer[Y]===void 0)_.__webglDepthbuffer[Y]=t.createRenderbuffer(),ke(_.__webglDepthbuffer[Y],E,!1);else{const j=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,W=_.__webglDepthbuffer[Y];t.bindRenderbuffer(t.RENDERBUFFER,W),t.framebufferRenderbuffer(t.FRAMEBUFFER,j,t.RENDERBUFFER,W)}}else{const Y=E.texture.mipmaps;if(Y&&Y.length>0?n.bindFramebuffer(t.FRAMEBUFFER,_.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=t.createRenderbuffer(),ke(_.__webglDepthbuffer,E,!1);else{const j=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,W=_.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,W),t.framebufferRenderbuffer(t.FRAMEBUFFER,j,t.RENDERBUFFER,W)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Yt(E,_,I){const Y=i.get(E);_!==void 0&&re(Y.__webglFramebuffer,E,E.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),I!==void 0&&Ne(E)}function Ke(E){const _=E.texture,I=i.get(E),Y=i.get(_);E.addEventListener("dispose",C);const j=E.textures,W=E.isWebGLCubeRenderTarget===!0,_e=j.length>1;if(_e||(Y.__webglTexture===void 0&&(Y.__webglTexture=t.createTexture()),Y.__version=_.version,a.memory.textures++),W){I.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer[ie]=[];for(let Pe=0;Pe<_.mipmaps.length;Pe++)I.__webglFramebuffer[ie][Pe]=t.createFramebuffer()}else I.__webglFramebuffer[ie]=t.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer=[];for(let ie=0;ie<_.mipmaps.length;ie++)I.__webglFramebuffer[ie]=t.createFramebuffer()}else I.__webglFramebuffer=t.createFramebuffer();if(_e)for(let ie=0,Pe=j.length;ie<Pe;ie++){const Ue=i.get(j[ie]);Ue.__webglTexture===void 0&&(Ue.__webglTexture=t.createTexture(),a.memory.textures++)}if(E.samples>0&&Ut(E)===!1){I.__webglMultisampledFramebuffer=t.createFramebuffer(),I.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let ie=0;ie<j.length;ie++){const Pe=j[ie];I.__webglColorRenderbuffer[ie]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,I.__webglColorRenderbuffer[ie]);const Ue=r.convert(Pe.format,Pe.colorSpace),Z=r.convert(Pe.type),ee=T(Pe.internalFormat,Ue,Z,Pe.colorSpace,E.isXRRenderTarget===!0),ve=R(E);t.renderbufferStorageMultisample(t.RENDERBUFFER,ve,ee,E.width,E.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ie,t.RENDERBUFFER,I.__webglColorRenderbuffer[ie])}t.bindRenderbuffer(t.RENDERBUFFER,null),E.depthBuffer&&(I.__webglDepthRenderbuffer=t.createRenderbuffer(),ke(I.__webglDepthRenderbuffer,E,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(W){n.bindTexture(t.TEXTURE_CUBE_MAP,Y.__webglTexture),de(t.TEXTURE_CUBE_MAP,_);for(let ie=0;ie<6;ie++)if(_.mipmaps&&_.mipmaps.length>0)for(let Pe=0;Pe<_.mipmaps.length;Pe++)re(I.__webglFramebuffer[ie][Pe],E,_,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Pe);else re(I.__webglFramebuffer[ie],E,_,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);m(_)&&p(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(_e){for(let ie=0,Pe=j.length;ie<Pe;ie++){const Ue=j[ie],Z=i.get(Ue);let ee=t.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ee=E.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ee,Z.__webglTexture),de(ee,Ue),re(I.__webglFramebuffer,E,Ue,t.COLOR_ATTACHMENT0+ie,ee,0),m(Ue)&&p(ee)}n.unbindTexture()}else{let ie=t.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ie=E.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ie,Y.__webglTexture),de(ie,_),_.mipmaps&&_.mipmaps.length>0)for(let Pe=0;Pe<_.mipmaps.length;Pe++)re(I.__webglFramebuffer[Pe],E,_,t.COLOR_ATTACHMENT0,ie,Pe);else re(I.__webglFramebuffer,E,_,t.COLOR_ATTACHMENT0,ie,0);m(_)&&p(ie),n.unbindTexture()}E.depthBuffer&&Ne(E)}function rt(E){const _=E.textures;for(let I=0,Y=_.length;I<Y;I++){const j=_[I];if(m(j)){const W=S(E),_e=i.get(j).__webglTexture;n.bindTexture(W,_e),p(W),n.unbindTexture()}}}const ut=[],We=[];function Pt(E){if(E.samples>0){if(Ut(E)===!1){const _=E.textures,I=E.width,Y=E.height;let j=t.COLOR_BUFFER_BIT;const W=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,_e=i.get(E),ie=_.length>1;if(ie)for(let Ue=0;Ue<_.length;Ue++)n.bindFramebuffer(t.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ue,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,_e.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ue,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer);const Pe=E.texture.mipmaps;Pe&&Pe.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,_e.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let Ue=0;Ue<_.length;Ue++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(j|=t.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(j|=t.STENCIL_BUFFER_BIT)),ie){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,_e.__webglColorRenderbuffer[Ue]);const Z=i.get(_[Ue]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Z,0)}t.blitFramebuffer(0,0,I,Y,0,0,I,Y,j,t.NEAREST),c===!0&&(ut.length=0,We.length=0,ut.push(t.COLOR_ATTACHMENT0+Ue),E.depthBuffer&&E.resolveDepthBuffer===!1&&(ut.push(W),We.push(W),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,We)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,ut))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),ie)for(let Ue=0;Ue<_.length;Ue++){n.bindFramebuffer(t.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ue,t.RENDERBUFFER,_e.__webglColorRenderbuffer[Ue]);const Z=i.get(_[Ue]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,_e.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ue,t.TEXTURE_2D,Z,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){const _=E.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[_])}}}function R(E){return Math.min(s.maxSamples,E.samples)}function Ut(E){const _=i.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function it(E){const _=a.render.frame;h.get(E)!==_&&(h.set(E,_),E.update())}function pt(E,_){const I=E.colorSpace,Y=E.format,j=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||I!==Gr&&I!==ps&&(Ze.getTransfer(I)===ot?(Y!==ti||j!==Wn)&&Fe("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):et("WebGLTextures: Unsupported texture color space:",I)),_}function ye(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=k,this.setTexture2D=B,this.setTexture2DArray=H,this.setTexture3D=F,this.setTextureCube=Q,this.rebindTextures=Yt,this.setupRenderTarget=Ke,this.updateRenderTargetMipmap=rt,this.updateMultisampleRenderTarget=Pt,this.setupDepthRenderbuffer=Ne,this.setupFrameBufferTexture=re,this.useMultisampledRTT=Ut,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function eS(t,e){function n(i,s=ps){let r;const a=Ze.getTransfer(s);if(i===Wn)return t.UNSIGNED_BYTE;if(i===Fu)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Nu)return t.UNSIGNED_SHORT_5_5_5_1;if(i===Xm)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===Ym)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===Gm)return t.BYTE;if(i===Wm)return t.SHORT;if(i===Xa)return t.UNSIGNED_SHORT;if(i===Uu)return t.INT;if(i===Ai)return t.UNSIGNED_INT;if(i===vi)return t.FLOAT;if(i===ji)return t.HALF_FLOAT;if(i===qm)return t.ALPHA;if(i===$m)return t.RGB;if(i===ti)return t.RGBA;if(i===Ki)return t.DEPTH_COMPONENT;if(i===Xs)return t.DEPTH_STENCIL;if(i===jm)return t.RED;if(i===Ou)return t.RED_INTEGER;if(i===Hr)return t.RG;if(i===Bu)return t.RG_INTEGER;if(i===ku)return t.RGBA_INTEGER;if(i===ac||i===oc||i===cc||i===lc)if(a===ot)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===ac)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===oc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===cc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===lc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===ac)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===oc)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===cc)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===lc)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===yh||i===Eh||i===bh||i===Th)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===yh)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Eh)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===bh)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Th)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Ah||i===wh||i===Rh||i===Ch||i===Ph||i===Lh||i===Ih)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Ah||i===wh)return a===ot?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Rh)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ch)return r.COMPRESSED_R11_EAC;if(i===Ph)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Lh)return r.COMPRESSED_RG11_EAC;if(i===Ih)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Dh||i===Uh||i===Fh||i===Nh||i===Oh||i===Bh||i===kh||i===zh||i===Vh||i===Hh||i===Gh||i===Wh||i===Xh||i===Yh)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Dh)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Uh)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Fh)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Nh)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Oh)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Bh)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===kh)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===zh)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Vh)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Hh)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Gh)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Wh)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Xh)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Yh)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===qh||i===$h||i===jh)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===qh)return a===ot?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===$h)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===jh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Kh||i===Zh||i===Jh||i===Qh)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Kh)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Zh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Jh)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Qh)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ya?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const tS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,nS=`
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

}`;class iS{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new r0(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new ii({vertexShader:tS,fragmentShader:nS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new gn(new ao(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class sS extends oa{constructor(e,n){super();const i=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,g=null;const M=typeof XRWebGLBinding<"u",m=new iS,p={},S=n.getContextAttributes();let T=null,y=null;const w=[],A=[],C=new st;let v=null;const b=new Gn;b.viewport=new Dt;const q=new Gn;q.viewport=new Dt;const P=[b,q],k=new gv;let z=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let ne=w[$];return ne===void 0&&(ne=new bl,w[$]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function($){let ne=w[$];return ne===void 0&&(ne=new bl,w[$]=ne),ne.getGripSpace()},this.getHand=function($){let ne=w[$];return ne===void 0&&(ne=new bl,w[$]=ne),ne.getHandSpace()};function B($){const ne=A.indexOf($.inputSource);if(ne===-1)return;const re=w[ne];re!==void 0&&(re.update($.inputSource,$.frame,l||a),re.dispatchEvent({type:$.type,data:$.inputSource}))}function H(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",F);for(let $=0;$<w.length;$++){const ne=A[$];ne!==null&&(A[$]=null,w[$].disconnect(ne))}z=null,X=null,m.reset();for(const $ in p)delete p[$];e.setRenderTarget(T),f=null,u=null,d=null,s=null,y=null,gt.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,i.isPresenting===!0&&Fe("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,i.isPresenting===!0&&Fe("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&M&&(d=new XRWebGLBinding(s,n)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(T=e.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",H),s.addEventListener("inputsourceschange",F),S.xrCompatible!==!0&&await n.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(C),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,ke=null,De=null;S.depth&&(De=S.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,re=S.stencil?Xs:Ki,ke=S.stencil?Ya:Ai);const Ne={colorFormat:n.RGBA8,depthFormat:De,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Ne),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new yi(u.textureWidth,u.textureHeight,{format:ti,type:Wn,depthTexture:new qa(u.textureWidth,u.textureHeight,ke,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:S.stencil,colorSpace:e.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const re={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,n,re),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new yi(f.framebufferWidth,f.framebufferHeight,{format:ti,type:Wn,colorSpace:e.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),gt.setContext(s),gt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function F($){for(let ne=0;ne<$.removed.length;ne++){const re=$.removed[ne],ke=A.indexOf(re);ke>=0&&(A[ke]=null,w[ke].disconnect(re))}for(let ne=0;ne<$.added.length;ne++){const re=$.added[ne];let ke=A.indexOf(re);if(ke===-1){for(let Ne=0;Ne<w.length;Ne++)if(Ne>=A.length){A.push(re),ke=Ne;break}else if(A[Ne]===null){A[Ne]=re,ke=Ne;break}if(ke===-1)break}const De=w[ke];De&&De.connect(re)}}const Q=new D,K=new D;function le($,ne,re){Q.setFromMatrixPosition(ne.matrixWorld),K.setFromMatrixPosition(re.matrixWorld);const ke=Q.distanceTo(K),De=ne.projectionMatrix.elements,Ne=re.projectionMatrix.elements,Yt=De[14]/(De[10]-1),Ke=De[14]/(De[10]+1),rt=(De[9]+1)/De[5],ut=(De[9]-1)/De[5],We=(De[8]-1)/De[0],Pt=(Ne[8]+1)/Ne[0],R=Yt*We,Ut=Yt*Pt,it=ke/(-We+Pt),pt=it*-We;if(ne.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(pt),$.translateZ(it),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),De[10]===-1)$.projectionMatrix.copy(ne.projectionMatrix),$.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const ye=Yt+it,E=Ke+it,_=R-pt,I=Ut+(ke-pt),Y=rt*Ke/E*ye,j=ut*Ke/E*ye;$.projectionMatrix.makePerspective(_,I,Y,j,ye,E),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function ge($,ne){ne===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(ne.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let ne=$.near,re=$.far;m.texture!==null&&(m.depthNear>0&&(ne=m.depthNear),m.depthFar>0&&(re=m.depthFar)),k.near=q.near=b.near=ne,k.far=q.far=b.far=re,(z!==k.near||X!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),z=k.near,X=k.far),k.layers.mask=$.layers.mask|6,b.layers.mask=k.layers.mask&-5,q.layers.mask=k.layers.mask&-3;const ke=$.parent,De=k.cameras;ge(k,ke);for(let Ne=0;Ne<De.length;Ne++)ge(De[Ne],ke);De.length===2?le(k,b,q):k.projectionMatrix.copy(b.projectionMatrix),de($,k,ke)};function de($,ne,re){re===null?$.matrix.copy(ne.matrixWorld):($.matrix.copy(re.matrixWorld),$.matrix.invert(),$.matrix.multiply(ne.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(ne.projectionMatrix),$.projectionMatrixInverse.copy(ne.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=eu*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function($){c=$,u!==null&&(u.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(k)},this.getCameraTexture=function($){return p[$]};let Ve=null;function _t($,ne){if(h=ne.getViewerPose(l||a),g=ne,h!==null){const re=h.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let ke=!1;re.length!==k.cameras.length&&(k.cameras.length=0,ke=!0);for(let Ke=0;Ke<re.length;Ke++){const rt=re[Ke];let ut=null;if(f!==null)ut=f.getViewport(rt);else{const Pt=d.getViewSubImage(u,rt);ut=Pt.viewport,Ke===0&&(e.setRenderTargetTextures(y,Pt.colorTexture,Pt.depthStencilTexture),e.setRenderTarget(y))}let We=P[Ke];We===void 0&&(We=new Gn,We.layers.enable(Ke),We.viewport=new Dt,P[Ke]=We),We.matrix.fromArray(rt.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(rt.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(ut.x,ut.y,ut.width,ut.height),Ke===0&&(k.matrix.copy(We.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),ke===!0&&k.cameras.push(We)}const De=s.enabledFeatures;if(De&&De.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){d=i.getBinding();const Ke=d.getDepthInformation(re[0]);Ke&&Ke.isValid&&Ke.texture&&m.init(Ke,s.renderState)}if(De&&De.includes("camera-access")&&M){e.state.unbindTexture(),d=i.getBinding();for(let Ke=0;Ke<re.length;Ke++){const rt=re[Ke].camera;if(rt){let ut=p[rt];ut||(ut=new r0,p[rt]=ut);const We=d.getCameraImage(rt);ut.sourceTexture=We}}}}for(let re=0;re<w.length;re++){const ke=A[re],De=w[re];ke!==null&&De!==void 0&&De.update(ke,ne,l||a)}Ve&&Ve($,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),g=null}const gt=new l0;gt.setAnimationLoop(_t),this.setAnimationLoop=function($){Ve=$},this.dispose=function(){}}}const Fs=new wi,rS=new Tt;function aS(t,e){function n(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,a0(t)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,S,T,y){p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,y)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),M(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,S,T):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,n(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,n(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===pn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,n(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===pn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,n(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,n(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,n(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=e.get(p),T=S.envMap,y=S.envMapRotation;T&&(m.envMap.value=T,Fs.copy(y),Fs.x*=-1,Fs.y*=-1,Fs.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Fs.y*=-1,Fs.z*=-1),m.envMapRotation.value.setFromMatrix4(rS.makeRotationFromEuler(Fs)),m.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,n(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,n(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,n(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,S,T){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=T*.5,p.map&&(m.map.value=p.map,n(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,n(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,n(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,n(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,n(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,n(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,n(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,n(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,n(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===pn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,n(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,n(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,n(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,n(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,n(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,n(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,n(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function M(m,p){const S=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function oS(t,e,n,i){let s={},r={},a=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,T){const y=T.program;i.uniformBlockBinding(S,y)}function l(S,T){let y=s[S.id];y===void 0&&(g(S),y=h(S),s[S.id]=y,S.addEventListener("dispose",m));const w=T.program;i.updateUBOMapping(S,w);const A=e.render.frame;r[S.id]!==A&&(u(S),r[S.id]=A)}function h(S){const T=d();S.__bindingPointIndex=T;const y=t.createBuffer(),w=S.__size,A=S.usage;return t.bindBuffer(t.UNIFORM_BUFFER,y),t.bufferData(t.UNIFORM_BUFFER,w,A),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,T,y),y}function d(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return et("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(S){const T=s[S.id],y=S.uniforms,w=S.__cache;t.bindBuffer(t.UNIFORM_BUFFER,T);for(let A=0,C=y.length;A<C;A++){const v=Array.isArray(y[A])?y[A]:[y[A]];for(let b=0,q=v.length;b<q;b++){const P=v[b];if(f(P,A,b,w)===!0){const k=P.__offset,z=Array.isArray(P.value)?P.value:[P.value];let X=0;for(let B=0;B<z.length;B++){const H=z[B],F=M(H);typeof H=="number"||typeof H=="boolean"?(P.__data[0]=H,t.bufferSubData(t.UNIFORM_BUFFER,k+X,P.__data)):H.isMatrix3?(P.__data[0]=H.elements[0],P.__data[1]=H.elements[1],P.__data[2]=H.elements[2],P.__data[3]=0,P.__data[4]=H.elements[3],P.__data[5]=H.elements[4],P.__data[6]=H.elements[5],P.__data[7]=0,P.__data[8]=H.elements[6],P.__data[9]=H.elements[7],P.__data[10]=H.elements[8],P.__data[11]=0):(H.toArray(P.__data,X),X+=F.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,k,P.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function f(S,T,y,w){const A=S.value,C=T+"_"+y;if(w[C]===void 0)return typeof A=="number"||typeof A=="boolean"?w[C]=A:w[C]=A.clone(),!0;{const v=w[C];if(typeof A=="number"||typeof A=="boolean"){if(v!==A)return w[C]=A,!0}else if(v.equals(A)===!1)return v.copy(A),!0}return!1}function g(S){const T=S.uniforms;let y=0;const w=16;for(let C=0,v=T.length;C<v;C++){const b=Array.isArray(T[C])?T[C]:[T[C]];for(let q=0,P=b.length;q<P;q++){const k=b[q],z=Array.isArray(k.value)?k.value:[k.value];for(let X=0,B=z.length;X<B;X++){const H=z[X],F=M(H),Q=y%w,K=Q%F.boundary,le=Q+K;y+=K,le!==0&&w-le<F.storage&&(y+=w-le),k.__data=new Float32Array(F.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=y,y+=F.storage}}}const A=y%w;return A>0&&(y+=w-A),S.__size=y,S.__cache={},this}function M(S){const T={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(T.boundary=4,T.storage=4):S.isVector2?(T.boundary=8,T.storage=8):S.isVector3||S.isColor?(T.boundary=16,T.storage=12):S.isVector4?(T.boundary=16,T.storage=16):S.isMatrix3?(T.boundary=48,T.storage=48):S.isMatrix4?(T.boundary=64,T.storage=64):S.isTexture?Fe("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Fe("WebGLRenderer: Unsupported uniform value type.",S),T}function m(S){const T=S.target;T.removeEventListener("dispose",m);const y=a.indexOf(T.__bindingPointIndex);a.splice(y,1),t.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function p(){for(const S in s)t.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}const cS=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let hi=null;function lS(){return hi===null&&(hi=new X1(cS,16,16,Hr,ji),hi.name="DFG_LUT",hi.minFilter=Zt,hi.magFilter=Zt,hi.wrapS=Gi,hi.wrapT=Gi,hi.generateMipmaps=!1,hi.needsUpdate=!0),hi}class hS{constructor(e={}){const{canvas:n=y1(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Wn}=e;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const M=f,m=new Set([ku,Bu,Ou]),p=new Set([Wn,Ai,Xa,Ya,Fu,Nu]),S=new Uint32Array(4),T=new Int32Array(4);let y=null,w=null;const A=[],C=[];let v=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Si,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let q=!1;this._outputColorSpace=Cn;let P=0,k=0,z=null,X=-1,B=null;const H=new Dt,F=new Dt;let Q=null;const K=new $e(0);let le=0,ge=n.width,de=n.height,Ve=1,_t=null,gt=null;const $=new Dt(0,0,ge,de),ne=new Dt(0,0,ge,de);let re=!1;const ke=new i0;let De=!1,Ne=!1;const Yt=new Tt,Ke=new D,rt=new Dt,ut={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let We=!1;function Pt(){return z===null?Ve:1}let R=i;function Ut(x,U){return n.getContext(x,U)}try{const x={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Iu}`),n.addEventListener("webglcontextlost",xe,!1),n.addEventListener("webglcontextrestored",Oe,!1),n.addEventListener("webglcontextcreationerror",mt,!1),R===null){const U="webgl2";if(R=Ut(U,x),R===null)throw Ut(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(x){throw et("WebGLRenderer: "+x.message),x}let it,pt,ye,E,_,I,Y,j,W,_e,ie,Pe,Ue,Z,ee,ve,Me,he,Xe,L,se,te,pe;function J(){it=new h3(R),it.init(),se=new eS(R,it),pt=new n3(R,it,e,se),ye=new JM(R,it),pt.reversedDepthBuffer&&u&&ye.buffers.depth.setReversed(!0),E=new f3(R),_=new BM,I=new QM(R,it,ye,_,pt,se,E),Y=new l3(b),j=new vv(R),te=new e3(R,j),W=new u3(R,j,E,te),_e=new m3(R,W,j,te,E),he=new p3(R,pt,I),ee=new i3(_),ie=new OM(b,Y,it,pt,te,ee),Pe=new aS(b,_),Ue=new zM,Z=new YM(it),Me=new Qx(b,Y,ye,_e,g,c),ve=new ZM(b,_e,pt),pe=new oS(R,E,pt,ye),Xe=new t3(R,it,E),L=new d3(R,it,E),E.programs=ie.programs,b.capabilities=pt,b.extensions=it,b.properties=_,b.renderLists=Ue,b.shadowMap=ve,b.state=ye,b.info=E}J(),M!==Wn&&(v=new _3(M,n.width,n.height,s,r));const G=new sS(b,R);this.xr=G,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){const x=it.get("WEBGL_lose_context");x&&x.loseContext()},this.forceContextRestore=function(){const x=it.get("WEBGL_lose_context");x&&x.restoreContext()},this.getPixelRatio=function(){return Ve},this.setPixelRatio=function(x){x!==void 0&&(Ve=x,this.setSize(ge,de,!1))},this.getSize=function(x){return x.set(ge,de)},this.setSize=function(x,U,V=!0){if(G.isPresenting){Fe("WebGLRenderer: Can't change size while VR device is presenting.");return}ge=x,de=U,n.width=Math.floor(x*Ve),n.height=Math.floor(U*Ve),V===!0&&(n.style.width=x+"px",n.style.height=U+"px"),v!==null&&v.setSize(n.width,n.height),this.setViewport(0,0,x,U)},this.getDrawingBufferSize=function(x){return x.set(ge*Ve,de*Ve).floor()},this.setDrawingBufferSize=function(x,U,V){ge=x,de=U,Ve=V,n.width=Math.floor(x*V),n.height=Math.floor(U*V),this.setViewport(0,0,x,U)},this.setEffects=function(x){if(M===Wn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(x){for(let U=0;U<x.length;U++)if(x[U].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}v.setEffects(x||[])},this.getCurrentViewport=function(x){return x.copy(H)},this.getViewport=function(x){return x.copy($)},this.setViewport=function(x,U,V,O){x.isVector4?$.set(x.x,x.y,x.z,x.w):$.set(x,U,V,O),ye.viewport(H.copy($).multiplyScalar(Ve).round())},this.getScissor=function(x){return x.copy(ne)},this.setScissor=function(x,U,V,O){x.isVector4?ne.set(x.x,x.y,x.z,x.w):ne.set(x,U,V,O),ye.scissor(F.copy(ne).multiplyScalar(Ve).round())},this.getScissorTest=function(){return re},this.setScissorTest=function(x){ye.setScissorTest(re=x)},this.setOpaqueSort=function(x){_t=x},this.setTransparentSort=function(x){gt=x},this.getClearColor=function(x){return x.copy(Me.getClearColor())},this.setClearColor=function(){Me.setClearColor(...arguments)},this.getClearAlpha=function(){return Me.getClearAlpha()},this.setClearAlpha=function(){Me.setClearAlpha(...arguments)},this.clear=function(x=!0,U=!0,V=!0){let O=0;if(x){let N=!1;if(z!==null){const oe=z.texture.format;N=m.has(oe)}if(N){const oe=z.texture.type,fe=p.has(oe),ce=Me.getClearColor(),Se=Me.getClearAlpha(),Ae=ce.r,Be=ce.g,Ye=ce.b;fe?(S[0]=Ae,S[1]=Be,S[2]=Ye,S[3]=Se,R.clearBufferuiv(R.COLOR,0,S)):(T[0]=Ae,T[1]=Be,T[2]=Ye,T[3]=Se,R.clearBufferiv(R.COLOR,0,T))}else O|=R.COLOR_BUFFER_BIT}U&&(O|=R.DEPTH_BUFFER_BIT),V&&(O|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O!==0&&R.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",xe,!1),n.removeEventListener("webglcontextrestored",Oe,!1),n.removeEventListener("webglcontextcreationerror",mt,!1),Me.dispose(),Ue.dispose(),Z.dispose(),_.dispose(),Y.dispose(),_e.dispose(),te.dispose(),pe.dispose(),ie.dispose(),G.dispose(),G.removeEventListener("sessionstart",ef),G.removeEventListener("sessionend",tf),Rs.stop()};function xe(x){x.preventDefault(),gf("WebGLRenderer: Context Lost."),q=!0}function Oe(){gf("WebGLRenderer: Context Restored."),q=!1;const x=E.autoReset,U=ve.enabled,V=ve.autoUpdate,O=ve.needsUpdate,N=ve.type;J(),E.autoReset=x,ve.enabled=U,ve.autoUpdate=V,ve.needsUpdate=O,ve.type=N}function mt(x){et("WebGLRenderer: A WebGL context could not be created. Reason: ",x.statusMessage)}function at(x){const U=x.target;U.removeEventListener("dispose",at),Ui(U)}function Ui(x){Fi(x),_.remove(x)}function Fi(x){const U=_.get(x).programs;U!==void 0&&(U.forEach(function(V){ie.releaseProgram(V)}),x.isShaderMaterial&&ie.releaseShaderCache(x))}this.renderBufferDirect=function(x,U,V,O,N,oe){U===null&&(U=ut);const fe=N.isMesh&&N.matrixWorld.determinant()<0,ce=F_(x,U,V,O,N);ye.setMaterial(O,fe);let Se=V.index,Ae=1;if(O.wireframe===!0){if(Se=W.getWireframeAttribute(V),Se===void 0)return;Ae=2}const Be=V.drawRange,Ye=V.attributes.position;let Re=Be.start*Ae,ct=(Be.start+Be.count)*Ae;oe!==null&&(Re=Math.max(Re,oe.start*Ae),ct=Math.min(ct,(oe.start+oe.count)*Ae)),Se!==null?(Re=Math.max(Re,0),ct=Math.min(ct,Se.count)):Ye!=null&&(Re=Math.max(Re,0),ct=Math.min(ct,Ye.count));const Lt=ct-Re;if(Lt<0||Lt===1/0)return;te.setup(N,O,ce,V,Se);let wt,lt=Xe;if(Se!==null&&(wt=j.get(Se),lt=L,lt.setIndex(wt)),N.isMesh)O.wireframe===!0?(ye.setLineWidth(O.wireframeLinewidth*Pt()),lt.setMode(R.LINES)):lt.setMode(R.TRIANGLES);else if(N.isLine){let tn=O.linewidth;tn===void 0&&(tn=1),ye.setLineWidth(tn*Pt()),N.isLineSegments?lt.setMode(R.LINES):N.isLineLoop?lt.setMode(R.LINE_LOOP):lt.setMode(R.LINE_STRIP)}else N.isPoints?lt.setMode(R.POINTS):N.isSprite&&lt.setMode(R.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Ec("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),lt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(it.get("WEBGL_multi_draw"))lt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const tn=N._multiDrawStarts,Ee=N._multiDrawCounts,En=N._multiDrawCount,Qe=Se?j.get(Se).bytesPerElement:1,jn=_.get(O).currentProgram.getUniforms();for(let ci=0;ci<En;ci++)jn.setValue(R,"_gl_DrawID",ci),lt.render(tn[ci]/Qe,Ee[ci])}else if(N.isInstancedMesh)lt.renderInstances(Re,Lt,N.count);else if(V.isInstancedBufferGeometry){const tn=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Ee=Math.min(V.instanceCount,tn);lt.renderInstances(Re,Lt,Ee)}else lt.render(Re,Lt)};function Qd(x,U,V){x.transparent===!0&&x.side===_i&&x.forceSinglePass===!1?(x.side=pn,x.needsUpdate=!0,Mo(x,U,V),x.side=ys,x.needsUpdate=!0,Mo(x,U,V),x.side=_i):Mo(x,U,V)}this.compile=function(x,U,V=null){V===null&&(V=x),w=Z.get(V),w.init(U),C.push(w),V.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(w.pushLight(N),N.castShadow&&w.pushShadow(N))}),x!==V&&x.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(w.pushLight(N),N.castShadow&&w.pushShadow(N))}),w.setupLights();const O=new Set;return x.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const oe=N.material;if(oe)if(Array.isArray(oe))for(let fe=0;fe<oe.length;fe++){const ce=oe[fe];Qd(ce,V,N),O.add(ce)}else Qd(oe,V,N),O.add(oe)}),w=C.pop(),O},this.compileAsync=function(x,U,V=null){const O=this.compile(x,U,V);return new Promise(N=>{function oe(){if(O.forEach(function(fe){_.get(fe).currentProgram.isReady()&&O.delete(fe)}),O.size===0){N(x);return}setTimeout(oe,10)}it.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let dl=null;function U_(x){dl&&dl(x)}function ef(){Rs.stop()}function tf(){Rs.start()}const Rs=new l0;Rs.setAnimationLoop(U_),typeof self<"u"&&Rs.setContext(self),this.setAnimationLoop=function(x){dl=x,G.setAnimationLoop(x),x===null?Rs.stop():Rs.start()},G.addEventListener("sessionstart",ef),G.addEventListener("sessionend",tf),this.render=function(x,U){if(U!==void 0&&U.isCamera!==!0){et("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(q===!0)return;const V=G.enabled===!0&&G.isPresenting===!0,O=v!==null&&(z===null||V)&&v.begin(b,z);if(x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(v===null||v.isCompositing()===!1)&&(G.cameraAutoUpdate===!0&&G.updateCamera(U),U=G.getCamera()),x.isScene===!0&&x.onBeforeRender(b,x,U,z),w=Z.get(x,C.length),w.init(U),C.push(w),Yt.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),ke.setFromProjectionMatrix(Yt,xi,U.reversedDepth),Ne=this.localClippingEnabled,De=ee.init(this.clippingPlanes,Ne),y=Ue.get(x,A.length),y.init(),A.push(y),G.enabled===!0&&G.isPresenting===!0){const fe=b.xr.getDepthSensingMesh();fe!==null&&fl(fe,U,-1/0,b.sortObjects)}fl(x,U,0,b.sortObjects),y.finish(),b.sortObjects===!0&&y.sort(_t,gt),We=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,We&&Me.addToRenderList(y,x),this.info.render.frame++,De===!0&&ee.beginShadows();const N=w.state.shadowsArray;if(ve.render(N,x,U),De===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset(),(O&&v.hasRenderPass())===!1){const fe=y.opaque,ce=y.transmissive;if(w.setupLights(),U.isArrayCamera){const Se=U.cameras;if(ce.length>0)for(let Ae=0,Be=Se.length;Ae<Be;Ae++){const Ye=Se[Ae];sf(fe,ce,x,Ye)}We&&Me.render(x);for(let Ae=0,Be=Se.length;Ae<Be;Ae++){const Ye=Se[Ae];nf(y,x,Ye,Ye.viewport)}}else ce.length>0&&sf(fe,ce,x,U),We&&Me.render(x),nf(y,x,U)}z!==null&&k===0&&(I.updateMultisampleRenderTarget(z),I.updateRenderTargetMipmap(z)),O&&v.end(b),x.isScene===!0&&x.onAfterRender(b,x,U),te.resetDefaultState(),X=-1,B=null,C.pop(),C.length>0?(w=C[C.length-1],De===!0&&ee.setGlobalState(b.clippingPlanes,w.state.camera)):w=null,A.pop(),A.length>0?y=A[A.length-1]:y=null};function fl(x,U,V,O){if(x.visible===!1)return;if(x.layers.test(U.layers)){if(x.isGroup)V=x.renderOrder;else if(x.isLOD)x.autoUpdate===!0&&x.update(U);else if(x.isLight)w.pushLight(x),x.castShadow&&w.pushShadow(x);else if(x.isSprite){if(!x.frustumCulled||ke.intersectsSprite(x)){O&&rt.setFromMatrixPosition(x.matrixWorld).applyMatrix4(Yt);const fe=_e.update(x),ce=x.material;ce.visible&&y.push(x,fe,ce,V,rt.z,null)}}else if((x.isMesh||x.isLine||x.isPoints)&&(!x.frustumCulled||ke.intersectsObject(x))){const fe=_e.update(x),ce=x.material;if(O&&(x.boundingSphere!==void 0?(x.boundingSphere===null&&x.computeBoundingSphere(),rt.copy(x.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),rt.copy(fe.boundingSphere.center)),rt.applyMatrix4(x.matrixWorld).applyMatrix4(Yt)),Array.isArray(ce)){const Se=fe.groups;for(let Ae=0,Be=Se.length;Ae<Be;Ae++){const Ye=Se[Ae],Re=ce[Ye.materialIndex];Re&&Re.visible&&y.push(x,fe,Re,V,rt.z,Ye)}}else ce.visible&&y.push(x,fe,ce,V,rt.z,null)}}const oe=x.children;for(let fe=0,ce=oe.length;fe<ce;fe++)fl(oe[fe],U,V,O)}function nf(x,U,V,O){const{opaque:N,transmissive:oe,transparent:fe}=x;w.setupLightsView(V),De===!0&&ee.setGlobalState(b.clippingPlanes,V),O&&ye.viewport(H.copy(O)),N.length>0&&xo(N,U,V),oe.length>0&&xo(oe,U,V),fe.length>0&&xo(fe,U,V),ye.buffers.depth.setTest(!0),ye.buffers.depth.setMask(!0),ye.buffers.color.setMask(!0),ye.setPolygonOffset(!1)}function sf(x,U,V,O){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[O.id]===void 0){const Re=it.has("EXT_color_buffer_half_float")||it.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[O.id]=new yi(1,1,{generateMipmaps:!0,type:Re?ji:Wn,minFilter:Ws,samples:Math.max(4,pt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ze.workingColorSpace})}const oe=w.state.transmissionRenderTarget[O.id],fe=O.viewport||H;oe.setSize(fe.z*b.transmissionResolutionScale,fe.w*b.transmissionResolutionScale);const ce=b.getRenderTarget(),Se=b.getActiveCubeFace(),Ae=b.getActiveMipmapLevel();b.setRenderTarget(oe),b.getClearColor(K),le=b.getClearAlpha(),le<1&&b.setClearColor(16777215,.5),b.clear(),We&&Me.render(V);const Be=b.toneMapping;b.toneMapping=Si;const Ye=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),w.setupLightsView(O),De===!0&&ee.setGlobalState(b.clippingPlanes,O),xo(x,V,O),I.updateMultisampleRenderTarget(oe),I.updateRenderTargetMipmap(oe),it.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let ct=0,Lt=U.length;ct<Lt;ct++){const wt=U[ct],{object:lt,geometry:tn,material:Ee,group:En}=wt;if(Ee.side===_i&&lt.layers.test(O.layers)){const Qe=Ee.side;Ee.side=pn,Ee.needsUpdate=!0,rf(lt,V,O,tn,Ee,En),Ee.side=Qe,Ee.needsUpdate=!0,Re=!0}}Re===!0&&(I.updateMultisampleRenderTarget(oe),I.updateRenderTargetMipmap(oe))}b.setRenderTarget(ce,Se,Ae),b.setClearColor(K,le),Ye!==void 0&&(O.viewport=Ye),b.toneMapping=Be}function xo(x,U,V){const O=U.isScene===!0?U.overrideMaterial:null;for(let N=0,oe=x.length;N<oe;N++){const fe=x[N],{object:ce,geometry:Se,group:Ae}=fe;let Be=fe.material;Be.allowOverride===!0&&O!==null&&(Be=O),ce.layers.test(V.layers)&&rf(ce,U,V,Se,Be,Ae)}}function rf(x,U,V,O,N,oe){x.onBeforeRender(b,U,V,O,N,oe),x.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,x.matrixWorld),x.normalMatrix.getNormalMatrix(x.modelViewMatrix),N.onBeforeRender(b,U,V,O,x,oe),N.transparent===!0&&N.side===_i&&N.forceSinglePass===!1?(N.side=pn,N.needsUpdate=!0,b.renderBufferDirect(V,U,O,N,x,oe),N.side=ys,N.needsUpdate=!0,b.renderBufferDirect(V,U,O,N,x,oe),N.side=_i):b.renderBufferDirect(V,U,O,N,x,oe),x.onAfterRender(b,U,V,O,N,oe)}function Mo(x,U,V){U.isScene!==!0&&(U=ut);const O=_.get(x),N=w.state.lights,oe=w.state.shadowsArray,fe=N.state.version,ce=ie.getParameters(x,N.state,oe,U,V),Se=ie.getProgramCacheKey(ce);let Ae=O.programs;O.environment=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?U.environment:null,O.fog=U.fog;const Be=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap;O.envMap=Y.get(x.envMap||O.environment,Be),O.envMapRotation=O.environment!==null&&x.envMap===null?U.environmentRotation:x.envMapRotation,Ae===void 0&&(x.addEventListener("dispose",at),Ae=new Map,O.programs=Ae);let Ye=Ae.get(Se);if(Ye!==void 0){if(O.currentProgram===Ye&&O.lightsStateVersion===fe)return of(x,ce),Ye}else ce.uniforms=ie.getUniforms(x),x.onBeforeCompile(ce,b),Ye=ie.acquireProgram(ce,Se),Ae.set(Se,Ye),O.uniforms=ce.uniforms;const Re=O.uniforms;return(!x.isShaderMaterial&&!x.isRawShaderMaterial||x.clipping===!0)&&(Re.clippingPlanes=ee.uniform),of(x,ce),O.needsLights=O_(x),O.lightsStateVersion=fe,O.needsLights&&(Re.ambientLightColor.value=N.state.ambient,Re.lightProbe.value=N.state.probe,Re.directionalLights.value=N.state.directional,Re.directionalLightShadows.value=N.state.directionalShadow,Re.spotLights.value=N.state.spot,Re.spotLightShadows.value=N.state.spotShadow,Re.rectAreaLights.value=N.state.rectArea,Re.ltc_1.value=N.state.rectAreaLTC1,Re.ltc_2.value=N.state.rectAreaLTC2,Re.pointLights.value=N.state.point,Re.pointLightShadows.value=N.state.pointShadow,Re.hemisphereLights.value=N.state.hemi,Re.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Re.spotLightMatrix.value=N.state.spotLightMatrix,Re.spotLightMap.value=N.state.spotLightMap,Re.pointShadowMatrix.value=N.state.pointShadowMatrix),O.currentProgram=Ye,O.uniformsList=null,Ye}function af(x){if(x.uniformsList===null){const U=x.currentProgram.getUniforms();x.uniformsList=hc.seqWithValue(U.seq,x.uniforms)}return x.uniformsList}function of(x,U){const V=_.get(x);V.outputColorSpace=U.outputColorSpace,V.batching=U.batching,V.batchingColor=U.batchingColor,V.instancing=U.instancing,V.instancingColor=U.instancingColor,V.instancingMorph=U.instancingMorph,V.skinning=U.skinning,V.morphTargets=U.morphTargets,V.morphNormals=U.morphNormals,V.morphColors=U.morphColors,V.morphTargetsCount=U.morphTargetsCount,V.numClippingPlanes=U.numClippingPlanes,V.numIntersection=U.numClipIntersection,V.vertexAlphas=U.vertexAlphas,V.vertexTangents=U.vertexTangents,V.toneMapping=U.toneMapping}function F_(x,U,V,O,N){U.isScene!==!0&&(U=ut),I.resetTextureUnits();const oe=U.fog,fe=O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial?U.environment:null,ce=z===null?b.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:Gr,Se=O.isMeshStandardMaterial||O.isMeshLambertMaterial&&!O.envMap||O.isMeshPhongMaterial&&!O.envMap,Ae=Y.get(O.envMap||fe,Se),Be=O.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,Ye=!!V.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Re=!!V.morphAttributes.position,ct=!!V.morphAttributes.normal,Lt=!!V.morphAttributes.color;let wt=Si;O.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(wt=b.toneMapping);const lt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,tn=lt!==void 0?lt.length:0,Ee=_.get(O),En=w.state.lights;if(De===!0&&(Ne===!0||x!==B)){const qt=x===B&&O.id===X;ee.setState(O,x,qt)}let Qe=!1;O.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==En.state.version||Ee.outputColorSpace!==ce||N.isBatchedMesh&&Ee.batching===!1||!N.isBatchedMesh&&Ee.batching===!0||N.isBatchedMesh&&Ee.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Ee.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Ee.instancing===!1||!N.isInstancedMesh&&Ee.instancing===!0||N.isSkinnedMesh&&Ee.skinning===!1||!N.isSkinnedMesh&&Ee.skinning===!0||N.isInstancedMesh&&Ee.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Ee.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Ee.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Ee.instancingMorph===!1&&N.morphTexture!==null||Ee.envMap!==Ae||O.fog===!0&&Ee.fog!==oe||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==ee.numPlanes||Ee.numIntersection!==ee.numIntersection)||Ee.vertexAlphas!==Be||Ee.vertexTangents!==Ye||Ee.morphTargets!==Re||Ee.morphNormals!==ct||Ee.morphColors!==Lt||Ee.toneMapping!==wt||Ee.morphTargetsCount!==tn)&&(Qe=!0):(Qe=!0,Ee.__version=O.version);let jn=Ee.currentProgram;Qe===!0&&(jn=Mo(O,U,N));let ci=!1,Cs=!1,ur=!1;const dt=jn.getUniforms(),Jt=Ee.uniforms;if(ye.useProgram(jn.program)&&(ci=!0,Cs=!0,ur=!0),O.id!==X&&(X=O.id,Cs=!0),ci||B!==x){ye.buffers.depth.getReversed()&&x.reversedDepth!==!0&&(x._reversedDepth=!0,x.updateProjectionMatrix()),dt.setValue(R,"projectionMatrix",x.projectionMatrix),dt.setValue(R,"viewMatrix",x.matrixWorldInverse);const is=dt.map.cameraPosition;is!==void 0&&is.setValue(R,Ke.setFromMatrixPosition(x.matrixWorld)),pt.logarithmicDepthBuffer&&dt.setValue(R,"logDepthBufFC",2/(Math.log(x.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&dt.setValue(R,"isOrthographic",x.isOrthographicCamera===!0),B!==x&&(B=x,Cs=!0,ur=!0)}if(Ee.needsLights&&(En.state.directionalShadowMap.length>0&&dt.setValue(R,"directionalShadowMap",En.state.directionalShadowMap,I),En.state.spotShadowMap.length>0&&dt.setValue(R,"spotShadowMap",En.state.spotShadowMap,I),En.state.pointShadowMap.length>0&&dt.setValue(R,"pointShadowMap",En.state.pointShadowMap,I)),N.isSkinnedMesh){dt.setOptional(R,N,"bindMatrix"),dt.setOptional(R,N,"bindMatrixInverse");const qt=N.skeleton;qt&&(qt.boneTexture===null&&qt.computeBoneTexture(),dt.setValue(R,"boneTexture",qt.boneTexture,I))}N.isBatchedMesh&&(dt.setOptional(R,N,"batchingTexture"),dt.setValue(R,"batchingTexture",N._matricesTexture,I),dt.setOptional(R,N,"batchingIdTexture"),dt.setValue(R,"batchingIdTexture",N._indirectTexture,I),dt.setOptional(R,N,"batchingColorTexture"),N._colorsTexture!==null&&dt.setValue(R,"batchingColorTexture",N._colorsTexture,I));const ns=V.morphAttributes;if((ns.position!==void 0||ns.normal!==void 0||ns.color!==void 0)&&he.update(N,V,jn),(Cs||Ee.receiveShadow!==N.receiveShadow)&&(Ee.receiveShadow=N.receiveShadow,dt.setValue(R,"receiveShadow",N.receiveShadow)),(O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial)&&O.envMap===null&&U.environment!==null&&(Jt.envMapIntensity.value=U.environmentIntensity),Jt.dfgLUT!==void 0&&(Jt.dfgLUT.value=lS()),Cs&&(dt.setValue(R,"toneMappingExposure",b.toneMappingExposure),Ee.needsLights&&N_(Jt,ur),oe&&O.fog===!0&&Pe.refreshFogUniforms(Jt,oe),Pe.refreshMaterialUniforms(Jt,O,Ve,de,w.state.transmissionRenderTarget[x.id]),hc.upload(R,af(Ee),Jt,I)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(hc.upload(R,af(Ee),Jt,I),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&dt.setValue(R,"center",N.center),dt.setValue(R,"modelViewMatrix",N.modelViewMatrix),dt.setValue(R,"normalMatrix",N.normalMatrix),dt.setValue(R,"modelMatrix",N.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const qt=O.uniformsGroups;for(let is=0,dr=qt.length;is<dr;is++){const cf=qt[is];pe.update(cf,jn),pe.bind(cf,jn)}}return jn}function N_(x,U){x.ambientLightColor.needsUpdate=U,x.lightProbe.needsUpdate=U,x.directionalLights.needsUpdate=U,x.directionalLightShadows.needsUpdate=U,x.pointLights.needsUpdate=U,x.pointLightShadows.needsUpdate=U,x.spotLights.needsUpdate=U,x.spotLightShadows.needsUpdate=U,x.rectAreaLights.needsUpdate=U,x.hemisphereLights.needsUpdate=U}function O_(x){return x.isMeshLambertMaterial||x.isMeshToonMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isShadowMaterial||x.isShaderMaterial&&x.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return z},this.setRenderTargetTextures=function(x,U,V){const O=_.get(x);O.__autoAllocateDepthBuffer=x.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),_.get(x.texture).__webglTexture=U,_.get(x.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:V,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(x,U){const V=_.get(x);V.__webglFramebuffer=U,V.__useDefaultFramebuffer=U===void 0};const B_=R.createFramebuffer();this.setRenderTarget=function(x,U=0,V=0){z=x,P=U,k=V;let O=null,N=!1,oe=!1;if(x){const ce=_.get(x);if(ce.__useDefaultFramebuffer!==void 0){ye.bindFramebuffer(R.FRAMEBUFFER,ce.__webglFramebuffer),H.copy(x.viewport),F.copy(x.scissor),Q=x.scissorTest,ye.viewport(H),ye.scissor(F),ye.setScissorTest(Q),X=-1;return}else if(ce.__webglFramebuffer===void 0)I.setupRenderTarget(x);else if(ce.__hasExternalTextures)I.rebindTextures(x,_.get(x.texture).__webglTexture,_.get(x.depthTexture).__webglTexture);else if(x.depthBuffer){const Be=x.depthTexture;if(ce.__boundDepthTexture!==Be){if(Be!==null&&_.has(Be)&&(x.width!==Be.image.width||x.height!==Be.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(x)}}const Se=x.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(oe=!0);const Ae=_.get(x).__webglFramebuffer;x.isWebGLCubeRenderTarget?(Array.isArray(Ae[U])?O=Ae[U][V]:O=Ae[U],N=!0):x.samples>0&&I.useMultisampledRTT(x)===!1?O=_.get(x).__webglMultisampledFramebuffer:Array.isArray(Ae)?O=Ae[V]:O=Ae,H.copy(x.viewport),F.copy(x.scissor),Q=x.scissorTest}else H.copy($).multiplyScalar(Ve).floor(),F.copy(ne).multiplyScalar(Ve).floor(),Q=re;if(V!==0&&(O=B_),ye.bindFramebuffer(R.FRAMEBUFFER,O)&&ye.drawBuffers(x,O),ye.viewport(H),ye.scissor(F),ye.setScissorTest(Q),N){const ce=_.get(x.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+U,ce.__webglTexture,V)}else if(oe){const ce=U;for(let Se=0;Se<x.textures.length;Se++){const Ae=_.get(x.textures[Se]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+Se,Ae.__webglTexture,V,ce)}}else if(x!==null&&V!==0){const ce=_.get(x.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,ce.__webglTexture,V)}X=-1},this.readRenderTargetPixels=function(x,U,V,O,N,oe,fe,ce=0){if(!(x&&x.isWebGLRenderTarget)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=_.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&fe!==void 0&&(Se=Se[fe]),Se){ye.bindFramebuffer(R.FRAMEBUFFER,Se);try{const Ae=x.textures[ce],Be=Ae.format,Ye=Ae.type;if(x.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+ce),!pt.textureFormatReadable(Be)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!pt.textureTypeReadable(Ye)){et("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=x.width-O&&V>=0&&V<=x.height-N&&R.readPixels(U,V,O,N,se.convert(Be),se.convert(Ye),oe)}finally{const Ae=z!==null?_.get(z).__webglFramebuffer:null;ye.bindFramebuffer(R.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(x,U,V,O,N,oe,fe,ce=0){if(!(x&&x.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=_.get(x).__webglFramebuffer;if(x.isWebGLCubeRenderTarget&&fe!==void 0&&(Se=Se[fe]),Se)if(U>=0&&U<=x.width-O&&V>=0&&V<=x.height-N){ye.bindFramebuffer(R.FRAMEBUFFER,Se);const Ae=x.textures[ce],Be=Ae.format,Ye=Ae.type;if(x.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+ce),!pt.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!pt.textureTypeReadable(Ye))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Re=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,Re),R.bufferData(R.PIXEL_PACK_BUFFER,oe.byteLength,R.STREAM_READ),R.readPixels(U,V,O,N,se.convert(Be),se.convert(Ye),0);const ct=z!==null?_.get(z).__webglFramebuffer:null;ye.bindFramebuffer(R.FRAMEBUFFER,ct);const Lt=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await E1(R,Lt,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,Re),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,oe),R.deleteBuffer(Re),R.deleteSync(Lt),oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(x,U=null,V=0){const O=Math.pow(2,-V),N=Math.floor(x.image.width*O),oe=Math.floor(x.image.height*O),fe=U!==null?U.x:0,ce=U!==null?U.y:0;I.setTexture2D(x,0),R.copyTexSubImage2D(R.TEXTURE_2D,V,0,0,fe,ce,N,oe),ye.unbindTexture()};const k_=R.createFramebuffer(),z_=R.createFramebuffer();this.copyTextureToTexture=function(x,U,V=null,O=null,N=0,oe=0){let fe,ce,Se,Ae,Be,Ye,Re,ct,Lt;const wt=x.isCompressedTexture?x.mipmaps[oe]:x.image;if(V!==null)fe=V.max.x-V.min.x,ce=V.max.y-V.min.y,Se=V.isBox3?V.max.z-V.min.z:1,Ae=V.min.x,Be=V.min.y,Ye=V.isBox3?V.min.z:0;else{const Jt=Math.pow(2,-N);fe=Math.floor(wt.width*Jt),ce=Math.floor(wt.height*Jt),x.isDataArrayTexture?Se=wt.depth:x.isData3DTexture?Se=Math.floor(wt.depth*Jt):Se=1,Ae=0,Be=0,Ye=0}O!==null?(Re=O.x,ct=O.y,Lt=O.z):(Re=0,ct=0,Lt=0);const lt=se.convert(U.format),tn=se.convert(U.type);let Ee;U.isData3DTexture?(I.setTexture3D(U,0),Ee=R.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(I.setTexture2DArray(U,0),Ee=R.TEXTURE_2D_ARRAY):(I.setTexture2D(U,0),Ee=R.TEXTURE_2D),R.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,U.flipY),R.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),R.pixelStorei(R.UNPACK_ALIGNMENT,U.unpackAlignment);const En=R.getParameter(R.UNPACK_ROW_LENGTH),Qe=R.getParameter(R.UNPACK_IMAGE_HEIGHT),jn=R.getParameter(R.UNPACK_SKIP_PIXELS),ci=R.getParameter(R.UNPACK_SKIP_ROWS),Cs=R.getParameter(R.UNPACK_SKIP_IMAGES);R.pixelStorei(R.UNPACK_ROW_LENGTH,wt.width),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,wt.height),R.pixelStorei(R.UNPACK_SKIP_PIXELS,Ae),R.pixelStorei(R.UNPACK_SKIP_ROWS,Be),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Ye);const ur=x.isDataArrayTexture||x.isData3DTexture,dt=U.isDataArrayTexture||U.isData3DTexture;if(x.isDepthTexture){const Jt=_.get(x),ns=_.get(U),qt=_.get(Jt.__renderTarget),is=_.get(ns.__renderTarget);ye.bindFramebuffer(R.READ_FRAMEBUFFER,qt.__webglFramebuffer),ye.bindFramebuffer(R.DRAW_FRAMEBUFFER,is.__webglFramebuffer);for(let dr=0;dr<Se;dr++)ur&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,_.get(x).__webglTexture,N,Ye+dr),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,_.get(U).__webglTexture,oe,Lt+dr)),R.blitFramebuffer(Ae,Be,fe,ce,Re,ct,fe,ce,R.DEPTH_BUFFER_BIT,R.NEAREST);ye.bindFramebuffer(R.READ_FRAMEBUFFER,null),ye.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(N!==0||x.isRenderTargetTexture||_.has(x)){const Jt=_.get(x),ns=_.get(U);ye.bindFramebuffer(R.READ_FRAMEBUFFER,k_),ye.bindFramebuffer(R.DRAW_FRAMEBUFFER,z_);for(let qt=0;qt<Se;qt++)ur?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,Jt.__webglTexture,N,Ye+qt):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,Jt.__webglTexture,N),dt?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,ns.__webglTexture,oe,Lt+qt):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,ns.__webglTexture,oe),N!==0?R.blitFramebuffer(Ae,Be,fe,ce,Re,ct,fe,ce,R.COLOR_BUFFER_BIT,R.NEAREST):dt?R.copyTexSubImage3D(Ee,oe,Re,ct,Lt+qt,Ae,Be,fe,ce):R.copyTexSubImage2D(Ee,oe,Re,ct,Ae,Be,fe,ce);ye.bindFramebuffer(R.READ_FRAMEBUFFER,null),ye.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else dt?x.isDataTexture||x.isData3DTexture?R.texSubImage3D(Ee,oe,Re,ct,Lt,fe,ce,Se,lt,tn,wt.data):U.isCompressedArrayTexture?R.compressedTexSubImage3D(Ee,oe,Re,ct,Lt,fe,ce,Se,lt,wt.data):R.texSubImage3D(Ee,oe,Re,ct,Lt,fe,ce,Se,lt,tn,wt):x.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,oe,Re,ct,fe,ce,lt,tn,wt.data):x.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,oe,Re,ct,wt.width,wt.height,lt,wt.data):R.texSubImage2D(R.TEXTURE_2D,oe,Re,ct,fe,ce,lt,tn,wt);R.pixelStorei(R.UNPACK_ROW_LENGTH,En),R.pixelStorei(R.UNPACK_IMAGE_HEIGHT,Qe),R.pixelStorei(R.UNPACK_SKIP_PIXELS,jn),R.pixelStorei(R.UNPACK_SKIP_ROWS,ci),R.pixelStorei(R.UNPACK_SKIP_IMAGES,Cs),oe===0&&U.generateMipmaps&&R.generateMipmap(Ee),ye.unbindTexture()},this.initRenderTarget=function(x){_.get(x).__webglFramebuffer===void 0&&I.setupRenderTarget(x)},this.initTexture=function(x){x.isCubeTexture?I.setTextureCube(x,0):x.isData3DTexture?I.setTexture3D(x,0):x.isDataArrayTexture||x.isCompressedArrayTexture?I.setTexture2DArray(x,0):I.setTexture2D(x,0),ye.unbindTexture()},this.resetState=function(){P=0,k=0,z=null,ye.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=Ze._getDrawingBufferColorSpace(e),n.unpackColorSpace=Ze._getUnpackColorSpace()}}const uS=/^[og]\s*(.+)?/,dS=/^mtllib /,fS=/^usemtl /,pS=/^usemap /,up=/\s+/,dp=new D,jl=new D,fp=new D,pp=new D,kn=new D,qo=new $e;function mS(){const t={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(e,n){if(this.object&&this.object.fromDeclaration===!1){this.object.name=e,this.object.fromDeclaration=n!==!1;return}const i=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:e||"",fromDeclaration:n!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(s,r){const a=this._finalize(!1);a&&(a.inherited||a.groupCount<=0)&&this.materials.splice(a.index,1);const o={index:this.materials.length,name:s||"",mtllib:Array.isArray(r)&&r.length>0?r[r.length-1]:"",smooth:a!==void 0?a.smooth:this.smooth,groupStart:a!==void 0?a.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(c){const l={index:typeof c=="number"?c:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return l.clone=this.clone.bind(l),l}};return this.materials.push(o),o},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(s){const r=this.currentMaterial();if(r&&r.groupEnd===-1&&(r.groupEnd=this.geometry.vertices.length/3,r.groupCount=r.groupEnd-r.groupStart,r.inherited=!1),s&&this.materials.length>1)for(let a=this.materials.length-1;a>=0;a--)this.materials[a].groupCount<=0&&this.materials.splice(a,1);return s&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),r}},i&&i.name&&typeof i.clone=="function"){const s=i.clone(0);s.inherited=!0,this.object.materials.push(s)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(e,n){const i=parseInt(e,10);return(i>=0?i-1:i+n/3)*3},parseNormalIndex:function(e,n){const i=parseInt(e,10);return(i>=0?i-1:i+n/3)*3},parseUVIndex:function(e,n){const i=parseInt(e,10);return(i>=0?i-1:i+n/2)*2},addVertex:function(e,n,i){const s=this.vertices,r=this.object.geometry.vertices;r.push(s[e+0],s[e+1],s[e+2]),r.push(s[n+0],s[n+1],s[n+2]),r.push(s[i+0],s[i+1],s[i+2])},addVertexPoint:function(e){const n=this.vertices;this.object.geometry.vertices.push(n[e+0],n[e+1],n[e+2])},addVertexLine:function(e){const n=this.vertices;this.object.geometry.vertices.push(n[e+0],n[e+1],n[e+2])},addNormal:function(e,n,i){const s=this.normals,r=this.object.geometry.normals;r.push(s[e+0],s[e+1],s[e+2]),r.push(s[n+0],s[n+1],s[n+2]),r.push(s[i+0],s[i+1],s[i+2])},addFaceNormal:function(e,n,i){const s=this.vertices,r=this.object.geometry.normals;dp.fromArray(s,e),jl.fromArray(s,n),fp.fromArray(s,i),kn.subVectors(fp,jl),pp.subVectors(dp,jl),kn.cross(pp),kn.normalize(),r.push(kn.x,kn.y,kn.z),r.push(kn.x,kn.y,kn.z),r.push(kn.x,kn.y,kn.z)},addColor:function(e,n,i){const s=this.colors,r=this.object.geometry.colors;s[e]!==void 0&&r.push(s[e+0],s[e+1],s[e+2]),s[n]!==void 0&&r.push(s[n+0],s[n+1],s[n+2]),s[i]!==void 0&&r.push(s[i+0],s[i+1],s[i+2])},addUV:function(e,n,i){const s=this.uvs,r=this.object.geometry.uvs;r.push(s[e+0],s[e+1]),r.push(s[n+0],s[n+1]),r.push(s[i+0],s[i+1])},addDefaultUV:function(){const e=this.object.geometry.uvs;e.push(0,0),e.push(0,0),e.push(0,0)},addUVLine:function(e){const n=this.uvs;this.object.geometry.uvs.push(n[e+0],n[e+1])},addFace:function(e,n,i,s,r,a,o,c,l){const h=this.vertices.length;let d=this.parseVertexIndex(e,h),u=this.parseVertexIndex(n,h),f=this.parseVertexIndex(i,h);if(this.addVertex(d,u,f),this.addColor(d,u,f),o!==void 0&&o!==""){const g=this.normals.length;d=this.parseNormalIndex(o,g),u=this.parseNormalIndex(c,g),f=this.parseNormalIndex(l,g),this.addNormal(d,u,f)}else this.addFaceNormal(d,u,f);if(s!==void 0&&s!==""){const g=this.uvs.length;d=this.parseUVIndex(s,g),u=this.parseUVIndex(r,g),f=this.parseUVIndex(a,g),this.addUV(d,u,f),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(e){this.object.geometry.type="Points";const n=this.vertices.length;for(let i=0,s=e.length;i<s;i++){const r=this.parseVertexIndex(e[i],n);this.addVertexPoint(r),this.addColor(r)}},addLineGeometry:function(e,n){this.object.geometry.type="Line";const i=this.vertices.length,s=this.uvs.length;for(let r=0,a=e.length;r<a;r++)this.addVertexLine(this.parseVertexIndex(e[r],i));for(let r=0,a=n.length;r<a;r++)this.addUVLine(this.parseUVIndex(n[r],s))}};return t.startObject("",!1),t}class gS extends Xu{constructor(e){super(e),this.materials=null}load(e,n,i,s){const r=this,a=new pv(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(e,function(o){try{n(r.parse(o))}catch(c){s?s(c):console.error(c),r.manager.itemError(e)}},i,s)}setMaterials(e){return this.materials=e,this}parse(e){const n=new mS;e.indexOf(`\r
`)!==-1&&(e=e.replace(/\r\n/g,`
`)),e.indexOf(`\\
`)!==-1&&(e=e.replace(/\\\n/g,""));const i=e.split(`
`);let s=[];for(let o=0,c=i.length;o<c;o++){const l=i[o].trimStart();if(l.length===0)continue;const h=l.charAt(0);if(h!=="#")if(h==="v"){const d=l.split(up);switch(d[0]){case"v":n.vertices.push(parseFloat(d[1]),parseFloat(d[2]),parseFloat(d[3])),d.length>=7?(qo.setRGB(parseFloat(d[4]),parseFloat(d[5]),parseFloat(d[6]),Cn),n.colors.push(qo.r,qo.g,qo.b)):n.colors.push(void 0,void 0,void 0);break;case"vn":n.normals.push(parseFloat(d[1]),parseFloat(d[2]),parseFloat(d[3]));break;case"vt":n.uvs.push(parseFloat(d[1]),parseFloat(d[2]));break}}else if(h==="f"){const u=l.slice(1).trim().split(up),f=[];for(let M=0,m=u.length;M<m;M++){const p=u[M];if(p.length>0){const S=p.split("/");f.push(S)}}const g=f[0];for(let M=1,m=f.length-1;M<m;M++){const p=f[M],S=f[M+1];n.addFace(g[0],p[0],S[0],g[1],p[1],S[1],g[2],p[2],S[2])}}else if(h==="l"){const d=l.substring(1).trim().split(" ");let u=[];const f=[];if(l.indexOf("/")===-1)u=d;else for(let g=0,M=d.length;g<M;g++){const m=d[g].split("/");m[0]!==""&&u.push(m[0]),m[1]!==""&&f.push(m[1])}n.addLineGeometry(u,f)}else if(h==="p"){const u=l.slice(1).trim().split(" ");n.addPointGeometry(u)}else if((s=uS.exec(l))!==null){const d=(" "+s[0].slice(1).trim()).slice(1);n.startObject(d)}else if(fS.test(l))n.object.startMaterial(l.substring(7).trim(),n.materialLibraries);else if(dS.test(l))n.materialLibraries.push(l.substring(7).trim());else if(pS.test(l))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(h==="s"){if(s=l.split(" "),s.length>1){const u=s[1].trim().toLowerCase();n.object.smooth=u!=="0"&&u!=="off"}else n.object.smooth=!0;const d=n.object.currentMaterial();d&&(d.smooth=n.object.smooth)}else{if(l==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+l+'"')}}n.finalize();const r=new Ys;if(r.materialLibraries=[].concat(n.materialLibraries),!(n.objects.length===1&&n.objects[0].geometry.vertices.length===0)===!0)for(let o=0,c=n.objects.length;o<c;o++){const l=n.objects[o],h=l.geometry,d=l.materials,u=h.type==="Line",f=h.type==="Points";let g=!1;if(h.vertices.length===0)continue;const M=new Ht;M.setAttribute("position",new Rt(h.vertices,3)),h.normals.length>0&&M.setAttribute("normal",new Rt(h.normals,3)),h.colors.length>0&&(g=!0,M.setAttribute("color",new Rt(h.colors,3))),h.hasUVIndices===!0&&M.setAttribute("uv",new Rt(h.uvs,2));const m=[];for(let S=0,T=d.length;S<T;S++){const y=d[S],w=y.name+"_"+y.smooth+"_"+g;let A=n.materials[w];if(this.materials!==null){if(A=this.materials.create(y.name),u&&A&&!(A instanceof Ur)){const C=new Ur;Zi.prototype.copy.call(C,A),C.color.copy(A.color),A=C}else if(f&&A&&!(A instanceof _s)){const C=new _s({size:10,sizeAttenuation:!1});Zi.prototype.copy.call(C,A),C.color.copy(A.color),C.map=A.map,A=C}}A===void 0&&(u?A=new Ur:f?A=new _s({size:1,sizeAttenuation:!1}):A=new cv,A.name=y.name,A.flatShading=!y.smooth,A.vertexColors=g,n.materials[w]=A),m.push(A)}let p;if(m.length>1){for(let S=0,T=d.length;S<T;S++){const y=d[S];M.addGroup(y.groupStart,y.groupCount,S)}u?p=new Ac(M,m):f?p=new Fr(M,m):p=new gn(M,m)}else u?p=new Ac(M,m[0]):f?p=new Fr(M,m[0]):p=new gn(M,m[0]);p.name=l.name,r.add(p)}else if(n.vertices.length>0){const o=new _s({size:1,sizeAttenuation:!1}),c=new Ht;c.setAttribute("position",new Rt(n.vertices,3)),n.colors.length>0&&n.colors[0]!==void 0&&(c.setAttribute("color",new Rt(n.colors,3)),o.vertexColors=!0);const l=new Fr(c,o);r.add(l)}return r}}const _S="/handface/assets/brain-pNXWhVO6.obj";class vS{constructor(){Le(this,"_listeners",new Map)}on(e,n){return this._listeners.has(e)||this._listeners.set(e,new Set),this._listeners.get(e).add(n),this}off(e,n){var i;return(i=this._listeners.get(e))==null||i.delete(n),this}emit(e,n){var i;(i=this._listeners.get(e))==null||i.forEach(s=>s(n))}removeAllListeners(e){return e?this._listeners.delete(e):this._listeners.clear(),this}}var Xr=typeof self<"u"?self:{};function m0(t,e){e:{for(var n=["CLOSURE_FLAGS"],i=Xr,s=0;s<n.length;s++)if((i=i[n[s]])==null){n=null;break e}n=i}return(t=n&&n[t])!=null?t:e}function Ns(){throw Error("Invalid UTF8")}function mp(t,e){return e=String.fromCharCode.apply(null,e),t==null?e:t+e}let $o,Kl;const xS=typeof TextDecoder<"u";let MS;const SS=typeof TextEncoder<"u";function g0(t){if(SS)t=(MS||(MS=new TextEncoder)).encode(t);else{let n=0;const i=new Uint8Array(3*t.length);for(let s=0;s<t.length;s++){var e=t.charCodeAt(s);if(e<128)i[n++]=e;else{if(e<2048)i[n++]=e>>6|192;else{if(e>=55296&&e<=57343){if(e<=56319&&s<t.length){const r=t.charCodeAt(++s);if(r>=56320&&r<=57343){e=1024*(e-55296)+r-56320+65536,i[n++]=e>>18|240,i[n++]=e>>12&63|128,i[n++]=e>>6&63|128,i[n++]=63&e|128;continue}s--}e=65533}i[n++]=e>>12|224,i[n++]=e>>6&63|128}i[n++]=63&e|128}}t=n===i.length?i:i.subarray(0,n)}return t}function _0(t){Xr.setTimeout(()=>{throw t},0)}var su,yS=m0(610401301,!1),gp=m0(748402147,!0);function _p(){var t=Xr.navigator;return t&&(t=t.userAgent)?t:""}const vp=Xr.navigator;function Bc(t){return Bc[" "](t),t}su=vp&&vp.userAgentData||null,Bc[" "]=function(){};const v0={};let ka=null;function ES(t){const e=t.length;let n=3*e/4;n%3?n=Math.floor(n):"=.".indexOf(t[e-1])!=-1&&(n="=.".indexOf(t[e-2])!=-1?n-2:n-1);const i=new Uint8Array(n);let s=0;return function(r,a){function o(l){for(;c<r.length;){const h=r.charAt(c++),d=ka[h];if(d!=null)return d;if(!/^[\s\xa0]*$/.test(h))throw Error("Unknown base64 encoding at char: "+h)}return l}x0();let c=0;for(;;){const l=o(-1),h=o(0),d=o(64),u=o(64);if(u===64&&l===-1)break;a(l<<2|h>>4),d!=64&&(a(h<<4&240|d>>2),u!=64&&a(d<<6&192|u))}}(t,function(r){i[s++]=r}),s!==n?i.subarray(0,s):i}function x0(){if(!ka){ka={};var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),e=["+/=","+/","-_=","-_.","-_"];for(let n=0;n<5;n++){const i=t.concat(e[n].split(""));v0[n]=i;for(let s=0;s<i.length;s++){const r=i[s];ka[r]===void 0&&(ka[r]=s)}}}}var bS=typeof Uint8Array<"u",M0=!(!(yS&&su&&su.brands.length>0)&&(_p().indexOf("Trident")!=-1||_p().indexOf("MSIE")!=-1))&&typeof btoa=="function";const xp=/[-_.]/g,TS={"-":"+",_:"/",".":"="};function AS(t){return TS[t]||""}function S0(t){if(!M0)return ES(t);t=xp.test(t)?t.replace(xp,AS):t,t=atob(t);const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}function Yu(t){return bS&&t!=null&&t instanceof Uint8Array}var Yr={};function rr(){return wS||(wS=new Ei(null,Yr))}function qu(t){y0(Yr);var e=t.g;return(e=e==null||Yu(e)?e:typeof e=="string"?S0(e):null)==null?e:t.g=e}var Ei=class{h(){return new Uint8Array(qu(this)||0)}constructor(t,e){if(y0(e),this.g=t,t!=null&&t.length===0)throw Error("ByteString should be constructed with non-empty values")}};let wS,RS;function y0(t){if(t!==Yr)throw Error("illegal external caller")}function E0(t,e){t.__closure__error__context__984382||(t.__closure__error__context__984382={}),t.__closure__error__context__984382.severity=e}function ru(t){return E0(t=Error(t),"warning"),t}function qr(t,e){if(t!=null){var n=RS??(RS={}),i=n[t]||0;i>=e||(n[t]=i+1,E0(t=Error(),"incident"),_0(t))}}function ua(){return typeof BigInt=="function"}var da=typeof Symbol=="function"&&typeof Symbol()=="symbol";function Ci(t,e,n=!1){return typeof Symbol=="function"&&typeof Symbol()=="symbol"?n&&Symbol.for&&t?Symbol.for(t):t!=null?Symbol(t):Symbol():e}var CS=Ci("jas",void 0,!0),Mp=Ci(void 0,"0di"),Ia=Ci(void 0,"1oa"),Pn=Ci(void 0,Symbol()),PS=Ci(void 0,"0ub"),LS=Ci(void 0,"0ubs"),au=Ci(void 0,"0ubsb"),IS=Ci(void 0,"0actk"),$r=Ci("m_m","Pa",!0),Sp=Ci();const b0={Ga:{value:0,configurable:!0,writable:!0,enumerable:!1}},T0=Object.defineProperties,be=da?CS:"Ga";var cr;const yp=[];function co(t,e){da||be in t||T0(t,b0),t[be]|=e}function Xt(t,e){da||be in t||T0(t,b0),t[be]=e}function lo(t){return co(t,34),t}function $a(t){return co(t,8192),t}Xt(yp,7),cr=Object.freeze(yp);var jr={};function Dn(t,e){return e===void 0?t.h!==ar&&!!(2&(0|t.v[be])):!!(2&e)&&t.h!==ar}const ar={};function $u(t,e){if(t!=null){if(typeof t=="string")t=t?new Ei(t,Yr):rr();else if(t.constructor!==Ei)if(Yu(t))t=t.length?new Ei(new Uint8Array(t),Yr):rr();else{if(!e)throw Error();t=void 0}}return t}class Ep{constructor(e,n,i){this.g=e,this.h=n,this.l=i}next(){const e=this.g.next();return e.done||(e.value=this.h.call(this.l,e.value)),e}[Symbol.iterator](){return this}}var DS=Object.freeze({});function A0(t,e,n){const i=128&e?0:-1,s=t.length;var r;(r=!!s)&&(r=(r=t[s-1])!=null&&typeof r=="object"&&r.constructor===Object);const a=s+(r?-1:0);for(e=128&e?1:0;e<a;e++)n(e-i,t[e]);if(r){t=t[s-1];for(const o in t)!isNaN(o)&&n(+o,t[o])}}var w0={};function fa(t){return 128&t?w0:void 0}function kc(t){return t.Na=!0,t}var US=kc(t=>typeof t=="number"),bp=kc(t=>typeof t=="string"),FS=kc(t=>typeof t=="boolean"),zc=typeof Xr.BigInt=="function"&&typeof Xr.BigInt(0)=="bigint";function Ln(t){var e=t;if(bp(e)){if(!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(e))throw Error(String(e))}else if(US(e)&&!Number.isSafeInteger(e))throw Error(String(e));return zc?BigInt(t):t=FS(t)?t?"1":"0":bp(t)?t.trim()||"0":String(t)}var ou=kc(t=>zc?t>=OS&&t<=kS:t[0]==="-"?Tp(t,NS):Tp(t,BS));const NS=Number.MIN_SAFE_INTEGER.toString(),OS=zc?BigInt(Number.MIN_SAFE_INTEGER):void 0,BS=Number.MAX_SAFE_INTEGER.toString(),kS=zc?BigInt(Number.MAX_SAFE_INTEGER):void 0;function Tp(t,e){if(t.length>e.length)return!1;if(t.length<e.length||t===e)return!0;for(let n=0;n<t.length;n++){const i=t[n],s=e[n];if(i>s)return!1;if(i<s)return!0}}const zS=typeof Uint8Array.prototype.slice=="function";let VS,yt=0,Nt=0;function Ap(t){const e=t>>>0;yt=e,Nt=(t-e)/4294967296>>>0}function Kr(t){if(t<0){Ap(-t);const[e,n]=Zu(yt,Nt);yt=e>>>0,Nt=n>>>0}else Ap(t)}function ju(t){const e=VS||(VS=new DataView(new ArrayBuffer(8)));e.setFloat32(0,+t,!0),Nt=0,yt=e.getUint32(0,!0)}function R0(t,e){const n=4294967296*e+(t>>>0);return Number.isSafeInteger(n)?n:ja(t,e)}function HS(t,e){return Ln(ua()?BigInt.asUintN(64,(BigInt(e>>>0)<<BigInt(32))+BigInt(t>>>0)):ja(t,e))}function C0(t,e){return ua()?Ln(BigInt.asIntN(64,(BigInt.asUintN(32,BigInt(e))<<BigInt(32))+BigInt.asUintN(32,BigInt(t)))):Ln(Ku(t,e))}function ja(t,e){if(t>>>=0,(e>>>=0)<=2097151)var n=""+(4294967296*e+t);else ua()?n=""+(BigInt(e)<<BigInt(32)|BigInt(t)):(t=(16777215&t)+6777216*(n=16777215&(t>>>24|e<<8))+6710656*(e=e>>16&65535),n+=8147497*e,e*=2,t>=1e7&&(n+=t/1e7>>>0,t%=1e7),n>=1e7&&(e+=n/1e7>>>0,n%=1e7),n=e+wp(n)+wp(t));return n}function wp(t){return t=String(t),"0000000".slice(t.length)+t}function Ku(t,e){if(2147483648&e)if(ua())t=""+(BigInt(0|e)<<BigInt(32)|BigInt(t>>>0));else{const[n,i]=Zu(t,e);t="-"+ja(n,i)}else t=ja(t,e);return t}function Vc(t){if(t.length<16)Kr(Number(t));else if(ua())t=BigInt(t),yt=Number(t&BigInt(4294967295))>>>0,Nt=Number(t>>BigInt(32)&BigInt(4294967295));else{const e=+(t[0]==="-");Nt=yt=0;const n=t.length;for(let i=e,s=(n-e)%6+e;s<=n;i=s,s+=6){const r=Number(t.slice(i,s));Nt*=1e6,yt=1e6*yt+r,yt>=4294967296&&(Nt+=Math.trunc(yt/4294967296),Nt>>>=0,yt>>>=0)}if(e){const[i,s]=Zu(yt,Nt);yt=i,Nt=s}}}function Zu(t,e){return e=~e,t?t=1+~t:e+=1,[t,e]}function ni(t){return Array.prototype.slice.call(t)}const ho=typeof BigInt=="function"?BigInt.asIntN:void 0,GS=typeof BigInt=="function"?BigInt.asUintN:void 0,or=Number.isSafeInteger,Hc=Number.isFinite,Zr=Math.trunc,WS=Ln(0);function za(t){if(t!=null&&typeof t!="number")throw Error(`Value of float/double field must be a number, found ${typeof t}: ${t}`);return t}function Mi(t){return t==null||typeof t=="number"?t:t==="NaN"||t==="Infinity"||t==="-Infinity"?Number(t):void 0}function Ka(t){if(t!=null&&typeof t!="boolean"){var e=typeof t;throw Error(`Expected boolean but got ${e!="object"?e:t?Array.isArray(t)?"array":e:"null"}: ${t}`)}return t}function P0(t){return t==null||typeof t=="boolean"?t:typeof t=="number"?!!t:void 0}const XS=/^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;function uo(t){switch(typeof t){case"bigint":return!0;case"number":return Hc(t);case"string":return XS.test(t);default:return!1}}function pa(t){if(t==null)return t;if(typeof t=="string"&&t)t=+t;else if(typeof t!="number")return;return Hc(t)?0|t:void 0}function L0(t){if(t==null)return t;if(typeof t=="string"&&t)t=+t;else if(typeof t!="number")return;return Hc(t)?t>>>0:void 0}function I0(t){const e=t.length;return(t[0]==="-"?e<20||e===20&&t<="-9223372036854775808":e<19||e===19&&t<="9223372036854775807")?t:(Vc(t),Ku(yt,Nt))}function Ju(t){if(t=Zr(t),!or(t)){Kr(t);var e=yt,n=Nt;(t=2147483648&n)&&(n=~n>>>0,(e=1+~e>>>0)==0&&(n=n+1>>>0)),t=typeof(e=R0(e,n))=="number"?t?-e:e:t?"-"+e:e}return t}function D0(t){var e=Zr(Number(t));return or(e)?String(e):((e=t.indexOf("."))!==-1&&(t=t.substring(0,e)),I0(t))}function U0(t){var e=Zr(Number(t));return or(e)?Ln(e):((e=t.indexOf("."))!==-1&&(t=t.substring(0,e)),ua()?Ln(ho(64,BigInt(t))):Ln(I0(t)))}function F0(t){return or(t)?t=Ln(Ju(t)):(t=Zr(t),or(t)?t=String(t):(Kr(t),t=Ku(yt,Nt)),t=Ln(t)),t}function wc(t){const e=typeof t;return t==null?t:e==="bigint"?Ln(ho(64,t)):uo(t)?e==="string"?U0(t):F0(t):void 0}function N0(t){if(typeof t!="string")throw Error();return t}function fo(t){if(t!=null&&typeof t!="string")throw Error();return t}function en(t){return t==null||typeof t=="string"?t:void 0}function Qu(t,e,n,i){return t!=null&&t[$r]===jr?t:Array.isArray(t)?((i=(n=0|t[be])|32&i|2&i)!==n&&Xt(t,i),new e(t)):(n?2&i?((t=e[Mp])||(lo((t=new e).v),t=e[Mp]=t),e=t):e=new e:e=void 0,e)}function YS(t,e,n){if(e)e:{if(!uo(e=t))throw ru("int64");switch(typeof e){case"string":e=U0(e);break e;case"bigint":e=Ln(ho(64,e));break e;default:e=F0(e)}}else e=wc(t);return(t=e)==null?n?WS:void 0:t}const qS={};let $S=function(){try{return Bc(new class extends Map{constructor(){super()}}),!1}catch{return!0}}();class Zl{constructor(){this.g=new Map}get(e){return this.g.get(e)}set(e,n){return this.g.set(e,n),this.size=this.g.size,this}delete(e){return e=this.g.delete(e),this.size=this.g.size,e}clear(){this.g.clear(),this.size=this.g.size}has(e){return this.g.has(e)}entries(){return this.g.entries()}keys(){return this.g.keys()}values(){return this.g.values()}forEach(e,n){return this.g.forEach(e,n)}[Symbol.iterator](){return this.entries()}}const jS=$S?(Object.setPrototypeOf(Zl.prototype,Map.prototype),Object.defineProperties(Zl.prototype,{size:{value:0,configurable:!0,enumerable:!0,writable:!0}}),Zl):class extends Map{constructor(){super()}};function Rp(t){return t}function Jl(t){if(2&t.J)throw Error("Cannot mutate an immutable Map")}var Ji=class extends jS{constructor(t,e,n=Rp,i=Rp){super(),this.J=0|t[be],this.K=e,this.S=n,this.fa=this.K?KS:i;for(let s=0;s<t.length;s++){const r=t[s],a=n(r[0],!1,!0);let o=r[1];e?o===void 0&&(o=null):o=i(r[1],!1,!0,void 0,void 0,this.J),super.set(a,o)}}V(t){return $a(Array.from(super.entries(),t))}clear(){Jl(this),super.clear()}delete(t){return Jl(this),super.delete(this.S(t,!0,!1))}entries(){if(this.K){var t=super.keys();t=new Ep(t,ZS,this)}else t=super.entries();return t}values(){if(this.K){var t=super.keys();t=new Ep(t,Ji.prototype.get,this)}else t=super.values();return t}forEach(t,e){this.K?super.forEach((n,i,s)=>{t.call(e,s.get(i),i,s)}):super.forEach(t,e)}set(t,e){return Jl(this),(t=this.S(t,!0,!1))==null?this:e==null?(super.delete(t),this):super.set(t,this.fa(e,!0,!0,this.K,!1,this.J))}Ma(t){const e=this.S(t[0],!1,!0);t=t[1],t=this.K?t===void 0?null:t:this.fa(t,!1,!0,void 0,!1,this.J),super.set(e,t)}has(t){return super.has(this.S(t,!1,!1))}get(t){t=this.S(t,!1,!1);const e=super.get(t);if(e!==void 0){var n=this.K;return n?((n=this.fa(e,!1,!0,n,this.ra,this.J))!==e&&super.set(t,n),n):e}}[Symbol.iterator](){return this.entries()}};function KS(t,e,n,i,s,r){return t=Qu(t,i,n,r),s&&(t=td(t)),t}function ZS(t){return[t,this.get(t)]}let JS;function Cp(){return JS||(JS=new Ji(lo([]),void 0,void 0,void 0,qS))}function Gc(t){return Pn?t[Pn]:void 0}function Rc(t,e){for(const n in t)!isNaN(n)&&e(t,+n,t[n])}Ji.prototype.toJSON=void 0;var cu=class{};const QS={Ka:!0};function ey(t,e){e<100||qr(LS,1)}function Wc(t,e,n,i){const s=i!==void 0;i=!!i;var r,a=Pn;!s&&da&&a&&(r=t[a])&&Rc(r,ey),a=[];var o=t.length;let c;r=4294967295;let l=!1;const h=!!(64&e),d=h?128&e?0:-1:void 0;1&e||(c=o&&t[o-1],c!=null&&typeof c=="object"&&c.constructor===Object?r=--o:c=void 0,!h||128&e||s||(l=!0,r=r-d+d)),e=void 0;for(var u=0;u<o;u++){let f=t[u];if(f!=null&&(f=n(f,i))!=null)if(h&&u>=r){const g=u-d;(e??(e={}))[g]=f}else a[u]=f}if(c)for(let f in c){if((o=c[f])==null||(o=n(o,i))==null)continue;let g;u=+f,h&&!Number.isNaN(u)&&(g=u+d)<r?a[g]=o:(e??(e={}))[f]=o}return e&&(l?a.push(e):a[r]=e),s&&Pn&&(t=Gc(t))&&t instanceof cu&&(a[Pn]=function(f){const g=new cu;return Rc(f,(M,m,p)=>{g[m]=ni(p)}),g.da=f.da,g}(t)),a}function ty(t){return t[0]=Za(t[0]),t[1]=Za(t[1]),t}function Za(t){switch(typeof t){case"number":return Number.isFinite(t)?t:""+t;case"bigint":return ou(t)?Number(t):""+t;case"boolean":return t?1:0;case"object":if(Array.isArray(t)){var e=0|t[be];return t.length===0&&1&e?void 0:Wc(t,e,Za)}if(t!=null&&t[$r]===jr)return O0(t);if(t instanceof Ei){if((e=t.g)==null)t="";else if(typeof e=="string")t=e;else{if(M0){for(var n="",i=0,s=e.length-10240;i<s;)n+=String.fromCharCode.apply(null,e.subarray(i,i+=10240));n+=String.fromCharCode.apply(null,i?e.subarray(i):e),e=btoa(n)}else{n===void 0&&(n=0),x0(),n=v0[n],i=Array(Math.floor(e.length/3)),s=n[64]||"";let l=0,h=0;for(;l<e.length-2;l+=3){var r=e[l],a=e[l+1],o=e[l+2],c=n[r>>2];r=n[(3&r)<<4|a>>4],a=n[(15&a)<<2|o>>6],o=n[63&o],i[h++]=c+r+a+o}switch(c=0,o=s,e.length-l){case 2:o=n[(15&(c=e[l+1]))<<2]||s;case 1:e=e[l],i[h]=n[e>>2]+n[(3&e)<<4|c>>4]+o+s}e=i.join("")}t=t.g=e}return t}return t instanceof Ji?t=t.size!==0?t.V(ty):void 0:void 0}return t}let ny,iy;function O0(t){return Wc(t=t.v,0|t[be],Za)}function js(t,e){return B0(t,e[0],e[1])}function B0(t,e,n,i=0){if(t==null){var s=32;n?(t=[n],s|=128):t=[],e&&(s=-16760833&s|(1023&e)<<14)}else{if(!Array.isArray(t))throw Error("narr");if(s=0|t[be],gp&&1&s)throw Error("rfarr");if(2048&s&&!(2&s)&&function(){if(gp)throw Error("carr");qr(IS,5)}(),256&s)throw Error("farr");if(64&s)return(s|i)!==s&&Xt(t,s|i),t;if(n&&(s|=128,n!==t[0]))throw Error("mid");e:{s|=64;var r=(n=t).length;if(r){var a=r-1;const c=n[a];if(c!=null&&typeof c=="object"&&c.constructor===Object){if((a-=e=128&s?0:-1)>=1024)throw Error("pvtlmt");for(var o in c)(r=+o)<a&&(n[r+e]=c[o],delete c[o]);s=-16760833&s|(1023&a)<<14;break e}}if(e){if((o=Math.max(e,r-(128&s?0:-1)))>1024)throw Error("spvt");s=-16760833&s|(1023&o)<<14}}}return Xt(t,64|s|i),t}function sy(t,e){if(typeof t!="object")return t;if(Array.isArray(t)){var n=0|t[be];return t.length===0&&1&n?void 0:Pp(t,n,e)}if(t!=null&&t[$r]===jr)return Lp(t);if(t instanceof Ji){if(2&(e=t.J))return t;if(!t.size)return;if(n=lo(t.V()),t.K)for(t=0;t<n.length;t++){const i=n[t];let s=i[1];s=s==null||typeof s!="object"?void 0:s!=null&&s[$r]===jr?Lp(s):Array.isArray(s)?Pp(s,0|s[be],!!(32&e)):void 0,i[1]=s}return n}return t instanceof Ei?t:void 0}function Pp(t,e,n){return 2&e||(!n||4096&e||16&e?t=ma(t,e,!1,n&&!(16&e)):(co(t,34),4&e&&Object.freeze(t))),t}function ed(t,e,n){return t=new t.constructor(e),n&&(t.h=ar),t.m=ar,t}function Lp(t){const e=t.v,n=0|e[be];return Dn(t,n)?t:nd(t,e,n)?ed(t,e):ma(e,n)}function ma(t,e,n,i){return i??(i=!!(34&e)),t=Wc(t,e,sy,i),i=32,n&&(i|=2),Xt(t,e=16769217&e|i),t}function td(t){const e=t.v,n=0|e[be];return Dn(t,n)?nd(t,e,n)?ed(t,e,!0):new t.constructor(ma(e,n,!1)):t}function ga(t){if(t.h!==ar)return!1;var e=t.v;return co(e=ma(e,0|e[be]),2048),t.v=e,t.h=void 0,t.m=void 0,!0}function _a(t){if(!ga(t)&&Dn(t,0|t.v[be]))throw Error()}function lr(t,e){e===void 0&&(e=0|t[be]),32&e&&!(4096&e)&&Xt(t,4096|e)}function nd(t,e,n){return!!(2&n)||!(!(32&n)||4096&n)&&(Xt(e,2|n),t.h=ar,!0)}const k0=Ln(0),hs={};function Et(t,e,n,i,s){if((e=Qi(t.v,e,n,s))!==null||i&&t.m!==ar)return e}function Qi(t,e,n,i){if(e===-1)return null;const s=e+(n?0:-1),r=t.length-1;let a,o;if(!(r<1+(n?0:-1))){if(s>=r)if(a=t[r],a!=null&&typeof a=="object"&&a.constructor===Object)n=a[e],o=!0;else{if(s!==r)return;n=a}else n=t[s];if(i&&n!=null){if((i=i(n))==null)return i;if(!Object.is(i,n))return o?a[e]=i:t[s]=i,i}return n}}function ht(t,e,n,i){_a(t),zt(t=t.v,0|t[be],e,n,i)}function zt(t,e,n,i,s){const r=n+(s?0:-1);var a=t.length-1;if(a>=1+(s?0:-1)&&r>=a){const o=t[a];if(o!=null&&typeof o=="object"&&o.constructor===Object)return o[n]=i,e}return r<=a?(t[r]=i,e):(i!==void 0&&(n>=(a=(e??(e=0|t[be]))>>14&1023||536870912)?i!=null&&(t[a+(s?0:-1)]={[n]:i}):t[r]=i),e)}function qs(){return DS===void 0?2:4}function $s(t,e,n,i,s){let r=t.v,a=0|r[be];i=Dn(t,a)?1:i,s=!!s||i===3,i===2&&ga(t)&&(r=t.v,a=0|r[be]);let o=(t=id(r,e))===cr?7:0|t[be],c=sd(o,a);var l=!(4&c);if(l){4&c&&(t=ni(t),o=0,c=Zs(c,a),a=zt(r,a,e,t));let h=0,d=0;for(;h<t.length;h++){const u=n(t[h]);u!=null&&(t[d++]=u)}d<h&&(t.length=d),n=-513&(4|c),c=n&=-1025,c&=-4097}return c!==o&&(Xt(t,c),2&c&&Object.freeze(t)),z0(t,c,r,a,e,i,l,s)}function z0(t,e,n,i,s,r,a,o){let c=e;return r===1||r===4&&(2&e||!(16&e)&&32&i)?Ks(e)||((e|=!t.length||a&&!(4096&e)||32&i&&!(4096&e||16&e)?2:256)!==c&&Xt(t,e),Object.freeze(t)):(r===2&&Ks(e)&&(t=ni(t),c=0,e=Zs(e,i),i=zt(n,i,s,t)),Ks(e)||(o||(e|=16),e!==c&&Xt(t,e))),2&e||!(4096&e||16&e)||lr(n,i),t}function id(t,e,n){return t=Qi(t,e,n),Array.isArray(t)?t:cr}function sd(t,e){return 2&e&&(t|=2),1|t}function Ks(t){return!!(2&t)&&!!(4&t)||!!(256&t)}function V0(t){return $u(t,!0)}function H0(t){t=ni(t);for(let e=0;e<t.length;e++){const n=t[e]=ni(t[e]);Array.isArray(n[1])&&(n[1]=lo(n[1]))}return $a(t)}function fs(t,e,n,i){_a(t),zt(t=t.v,0|t[be],e,(i==="0"?Number(n)===0:n===i)?void 0:n)}function va(t,e,n){if(2&e)throw Error();const i=fa(e);let s=id(t,n,i),r=s===cr?7:0|s[be],a=sd(r,e);return(2&a||Ks(a)||16&a)&&(a===r||Ks(a)||Xt(s,a),s=ni(s),r=0,a=Zs(a,e),zt(t,e,n,s,i)),a&=-13,a!==r&&Xt(s,a),s}function Ql(t,e){var n=Dg;return ad(rd(t=t.v),t,void 0,n)===e?e:-1}function rd(t){if(da)return t[Ia]??(t[Ia]=new Map);if(Ia in t)return t[Ia];const e=new Map;return Object.defineProperty(t,Ia,{value:e}),e}function G0(t,e,n,i,s){const r=rd(t),a=ad(r,t,e,n,s);return a!==i&&(a&&(e=zt(t,e,a,void 0,s)),r.set(n,i)),e}function ad(t,e,n,i,s){let r=t.get(i);if(r!=null)return r;r=0;for(let a=0;a<i.length;a++){const o=i[a];Qi(e,o,s)!=null&&(r!==0&&(n=zt(e,n,r,void 0,s)),r=o)}return t.set(i,r),r}function od(t,e,n){let i=0|t[be];const s=fa(i),r=Qi(t,n,s);let a;if(r!=null&&r[$r]===jr){if(!Dn(r))return ga(r),r.v;a=r.v}else Array.isArray(r)&&(a=r);if(a){const o=0|a[be];2&o&&(a=ma(a,o))}return a=js(a,e),a!==r&&zt(t,i,n,a,s),a}function W0(t,e,n,i,s){let r=!1;if((i=Qi(t,i,s,a=>{const o=Qu(a,n,!1,e);return r=o!==a&&o!=null,o}))!=null)return r&&!Dn(i)&&lr(t,e),i}function tt(t,e,n,i){let s=t.v,r=0|s[be];if((e=W0(s,r,e,n,i))==null)return e;if(r=0|s[be],!Dn(t,r)){const a=td(e);a!==e&&(ga(t)&&(s=t.v,r=0|s[be]),r=zt(s,r,n,e=a,i),lr(s,r))}return e}function X0(t,e,n,i,s,r,a,o){var c=Dn(t,n);r=c?1:r,a=!!a||r===3,c=o&&!c,(r===2||c)&&ga(t)&&(n=0|(e=t.v)[be]);var l=(t=id(e,s))===cr?7:0|t[be],h=sd(l,n);if(o=!(4&h)){var d=t,u=n;const f=!!(2&h);f&&(u|=2);let g=!f,M=!0,m=0,p=0;for(;m<d.length;m++){const S=Qu(d[m],i,!1,u);if(S instanceof i){if(!f){const T=Dn(S);g&&(g=!T),M&&(M=T)}d[p++]=S}}p<m&&(d.length=p),h|=4,h=M?-4097&h:4096|h,h=g?8|h:-9&h}if(h!==l&&(Xt(t,h),2&h&&Object.freeze(t)),c&&!(8&h||!t.length&&(r===1||r===4&&(2&h||!(16&h)&&32&n)))){for(Ks(h)&&(t=ni(t),h=Zs(h,n),n=zt(e,n,s,t)),i=t,c=h,l=0;l<i.length;l++)(d=i[l])!==(h=td(d))&&(i[l]=h);c|=8,Xt(t,h=c=i.length?4096|c:-4097&c)}return z0(t,h,e,n,s,r,o,a)}function es(t,e,n){const i=t.v;return X0(t,i,0|i[be],e,n,qs(),!1,!0)}function Y0(t){return t==null&&(t=void 0),t}function Ie(t,e,n,i,s){return ht(t,n,i=Y0(i),s),i&&!Dn(i)&&lr(t.v),t}function Va(t,e,n,i){e:{var s=i=Y0(i);_a(t);const r=t.v;let a=0|r[be];if(s==null){const o=rd(r);if(ad(o,r,a,n)!==e)break e;o.set(n,0)}else a=G0(r,a,n,e);zt(r,a,e,s)}i&&!Dn(i)&&lr(t.v)}function Zs(t,e){return-273&(2&e?2|t:-3&t)}function cd(t,e,n,i){var s=i;_a(t),t=X0(t,i=t.v,0|i[be],n,e,2,!0),s=s??new n,t.push(s),e=n=t===cr?7:0|t[be],(s=Dn(s))?(n&=-9,t.length===1&&(n&=-4097)):n|=4096,n!==e&&Xt(t,n),s||lr(i)}function Xn(t,e,n){return pa(Et(t,e,void 0,n))}function It(t,e){return Et(t,e,void 0,void 0,Mi)??0}function ts(t,e,n){if(n!=null){if(typeof n!="number"||!Hc(n))throw ru("int32");n|=0}ht(t,e,n)}function Ce(t,e,n){ht(t,e,za(n))}function Un(t,e,n){fs(t,e,fo(n),"")}function Cc(t,e,n){{_a(t);const a=t.v;let o=0|a[be];if(n==null)zt(a,o,e);else{var i=t=n===cr?7:0|n[be],s=Ks(t),r=s||Object.isFrozen(n);for(s||(t=0),r||(n=ni(n),i=0,t=Zs(t,o),r=!1),t|=5,t|=(4&t?512&t?512:1024&t?1024:0:void 0)??1024,s=0;s<n.length;s++){const c=n[s],l=N0(c);Object.is(c,l)||(r&&(n=ni(n),i=0,t=Zs(t,o),r=!1),n[s]=l)}t!==i&&(r&&(n=ni(n),t=Zs(t,o)),Xt(n,t)),zt(a,o,e,n)}}}function Xc(t,e,n){_a(t),$s(t,e,en,2,!0).push(N0(n))}var wr=class{constructor(t,e,n){if(this.buffer=t,n&&!e)throw Error();this.g=e}};function ld(t,e){if(typeof t=="string")return new wr(S0(t),e);if(Array.isArray(t))return new wr(new Uint8Array(t),e);if(t.constructor===Uint8Array)return new wr(t,!1);if(t.constructor===ArrayBuffer)return t=new Uint8Array(t),new wr(t,!1);if(t.constructor===Ei)return e=qu(t)||new Uint8Array(0),new wr(e,!0,t);if(t instanceof Uint8Array)return t=t.constructor===Uint8Array?t:new Uint8Array(t.buffer,t.byteOffset,t.byteLength),new wr(t,!1);throw Error()}function hd(t,e){let n,i=0,s=0,r=0;const a=t.h;let o=t.g;do n=a[o++],i|=(127&n)<<r,r+=7;while(r<32&&128&n);if(r>32)for(s|=(127&n)>>4,r=3;r<32&&128&n;r+=7)n=a[o++],s|=(127&n)<<r;if(Js(t,o),!(128&n))return e(i>>>0,s>>>0);throw Error()}function ud(t){let e=0,n=t.g;const i=n+10,s=t.h;for(;n<i;){const r=s[n++];if(e|=r,(128&r)==0)return Js(t,n),!!(127&e)}throw Error()}function Es(t){const e=t.h;let n=t.g,i=e[n++],s=127&i;if(128&i&&(i=e[n++],s|=(127&i)<<7,128&i&&(i=e[n++],s|=(127&i)<<14,128&i&&(i=e[n++],s|=(127&i)<<21,128&i&&(i=e[n++],s|=i<<28,128&i&&128&e[n++]&&128&e[n++]&&128&e[n++]&&128&e[n++]&&128&e[n++])))))throw Error();return Js(t,n),s}function Ri(t){return Es(t)>>>0}function Pc(t){var e=t.h;const n=t.g;var i=e[n],s=e[n+1];const r=e[n+2];return e=e[n+3],Js(t,t.g+4),t=2*((s=(i<<0|s<<8|r<<16|e<<24)>>>0)>>31)+1,i=s>>>23&255,s&=8388607,i==255?s?NaN:t*(1/0):i==0?1401298464324817e-60*t*s:t*Math.pow(2,i-150)*(s+8388608)}function ry(t){return Es(t)}function Js(t,e){if(t.g=e,e>t.l)throw Error()}function q0(t,e){if(e<0)throw Error();const n=t.g;if((e=n+e)>t.l)throw Error();return t.g=e,n}function $0(t,e){if(e==0)return rr();var n=q0(t,e);return t.Y&&t.j?n=t.h.subarray(n,n+e):(t=t.h,n=n===(e=n+e)?new Uint8Array(0):zS?t.slice(n,e):new Uint8Array(t.subarray(n,e))),n.length==0?rr():new Ei(n,Yr)}var Ip=[];function j0(t,e,n,i){if(Lc.length){const s=Lc.pop();return s.o(i),s.g.init(t,e,n,i),s}return new ay(t,e,n,i)}function K0(t){t.g.clear(),t.l=-1,t.h=-1,Lc.length<100&&Lc.push(t)}function Z0(t){var e=t.g;if(e.g==e.l)return!1;t.m=t.g.g;var n=Ri(t.g);if(e=n>>>3,!((n&=7)>=0&&n<=5)||e<1)throw Error();return t.l=e,t.h=n,!0}function uc(t){switch(t.h){case 0:t.h!=0?uc(t):ud(t.g);break;case 1:Js(t=t.g,t.g+8);break;case 2:if(t.h!=2)uc(t);else{var e=Ri(t.g);Js(t=t.g,t.g+e)}break;case 5:Js(t=t.g,t.g+4);break;case 3:for(e=t.l;;){if(!Z0(t))throw Error();if(t.h==4){if(t.l!=e)throw Error();break}uc(t)}break;default:throw Error()}}function po(t,e,n){const i=t.g.l;var s=Ri(t.g);let r=(s=t.g.g+s)-i;if(r<=0&&(t.g.l=s,n(e,t,void 0,void 0,void 0),r=s-t.g.g),r)throw Error();return t.g.g=s,t.g.l=i,e}function dd(t){var e=Ri(t.g),n=q0(t=t.g,e);if(t=t.h,xS){var i,s=t;(i=Kl)||(i=Kl=new TextDecoder("utf-8",{fatal:!0})),e=n+e,s=n===0&&e===s.length?s:s.subarray(n,e);try{var r=i.decode(s)}catch(o){if($o===void 0){try{i.decode(new Uint8Array([128]))}catch{}try{i.decode(new Uint8Array([97])),$o=!0}catch{$o=!1}}throw!$o&&(Kl=void 0),o}}else{e=(r=n)+e,n=[];let o,c=null;for(;r<e;){var a=t[r++];a<128?n.push(a):a<224?r>=e?Ns():(o=t[r++],a<194||(192&o)!=128?(r--,Ns()):n.push((31&a)<<6|63&o)):a<240?r>=e-1?Ns():(o=t[r++],(192&o)!=128||a===224&&o<160||a===237&&o>=160||(192&(i=t[r++]))!=128?(r--,Ns()):n.push((15&a)<<12|(63&o)<<6|63&i)):a<=244?r>=e-2?Ns():(o=t[r++],(192&o)!=128||o-144+(a<<28)>>30||(192&(i=t[r++]))!=128||(192&(s=t[r++]))!=128?(r--,Ns()):(a=(7&a)<<18|(63&o)<<12|(63&i)<<6|63&s,a-=65536,n.push(55296+(a>>10&1023),56320+(1023&a)))):Ns(),n.length>=8192&&(c=mp(c,n),n.length=0)}r=mp(c,n)}return r}function J0(t){const e=Ri(t.g);return $0(t.g,e)}function Yc(t,e,n){var i=Ri(t.g);for(i=t.g.g+i;t.g.g<i;)n.push(e(t.g))}var ay=class{constructor(t,e,n,i){if(Ip.length){const s=Ip.pop();s.init(t,e,n,i),t=s}else t=new class{constructor(s,r,a,o){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.init(s,r,a,o)}init(s,r,a,{Y:o=!1,ea:c=!1}={}){this.Y=o,this.ea=c,s&&(s=ld(s,this.ea),this.h=s.buffer,this.j=s.g,this.m=r||0,this.l=a!==void 0?this.m+a:this.h.length,this.g=this.m)}clear(){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.Y=!1}}(t,e,n,i);this.g=t,this.m=this.g.g,this.h=this.l=-1,this.o(i)}o({ha:t=!1}={}){this.ha=t}},Lc=[];function Dp(t){return t?/^\d+$/.test(t)?(Vc(t),new lu(yt,Nt)):null:oy||(oy=new lu(0,0))}var lu=class{constructor(t,e){this.h=t>>>0,this.g=e>>>0}};let oy;function Up(t){return t?/^-?\d+$/.test(t)?(Vc(t),new hu(yt,Nt)):null:cy||(cy=new hu(0,0))}var hu=class{constructor(t,e){this.h=t>>>0,this.g=e>>>0}};let cy;function Nr(t,e,n){for(;n>0||e>127;)t.g.push(127&e|128),e=(e>>>7|n<<25)>>>0,n>>>=7;t.g.push(e)}function xa(t,e){for(;e>127;)t.g.push(127&e|128),e>>>=7;t.g.push(e)}function qc(t,e){if(e>=0)xa(t,e);else{for(let n=0;n<9;n++)t.g.push(127&e|128),e>>=7;t.g.push(1)}}function fd(t){var e=yt;t.g.push(e>>>0&255),t.g.push(e>>>8&255),t.g.push(e>>>16&255),t.g.push(e>>>24&255)}function Jr(t,e){e.length!==0&&(t.l.push(e),t.h+=e.length)}function qn(t,e,n){xa(t.g,8*e+n)}function pd(t,e){return qn(t,e,2),e=t.g.end(),Jr(t,e),e.push(t.h),e}function md(t,e){var n=e.pop();for(n=t.h+t.g.length()-n;n>127;)e.push(127&n|128),n>>>=7,t.h++;e.push(n),t.h++}function $c(t,e,n){qn(t,e,2),xa(t.g,n.length),Jr(t,t.g.end()),Jr(t,n)}function Ic(t,e,n,i){n!=null&&(e=pd(t,e),i(n,t),md(t,e))}function Pi(){const t=class{constructor(){throw Error()}};return Object.setPrototypeOf(t,t.prototype),t}var gd=Pi(),Q0=Pi(),_d=Pi(),vd=Pi(),xd=Pi(),eg=Pi(),ly=Pi(),jc=Pi(),tg=Pi(),ng=Pi();function Li(t,e,n){var i=t.v;Pn&&Pn in i&&(i=i[Pn])&&delete i[e.g],e.h?e.j(t,e.h,e.g,n,e.l):e.j(t,e.g,n,e.l)}var Te=class{constructor(t,e){this.v=B0(t,e,void 0,2048)}toJSON(){return O0(this)}j(){var s;var t=Wy,e=this.v,n=t.g,i=Pn;if(da&&i&&((s=e[i])==null?void 0:s[n])!=null&&qr(PS,3),e=t.g,Sp&&Pn&&Sp===void 0&&(i=(n=this.v)[Pn])&&(i=i.da))try{i(n,e,QS)}catch(r){_0(r)}return t.h?t.m(this,t.h,t.g,t.l):t.m(this,t.g,t.defaultValue,t.l)}clone(){const t=this.v,e=0|t[be];return nd(this,t,e)?ed(this,t,!0):new this.constructor(ma(t,e,!1))}};Te.prototype[$r]=jr,Te.prototype.toString=function(){return this.v.toString()};var Ma=class{constructor(t,e,n){this.g=t,this.h=e,t=gd,this.l=!!t&&n===t||!1}};function Kc(t,e){return new Ma(t,e,gd)}function ig(t,e,n,i,s){Ic(t,n,og(e,i),s)}const hy=Kc(function(t,e,n,i,s){return t.h===2&&(po(t,od(e,i,n),s),!0)},ig),uy=Kc(function(t,e,n,i,s){return t.h===2&&(po(t,od(e,i,n),s),!0)},ig);var Zc=Symbol(),Jc=Symbol(),uu=Symbol(),Fp=Symbol(),Np=Symbol();let sg,rg;function hr(t,e,n,i){var s=i[t];if(s)return s;(s={}).qa=i,s.T=function(d){switch(typeof d){case"boolean":return ny||(ny=[0,void 0,!0]);case"number":return d>0?void 0:d===0?iy||(iy=[0,void 0]):[-d,void 0];case"string":return[0,d];case"object":return d}}(i[0]);var r=i[1];let a=1;r&&r.constructor===Object&&(s.ba=r,typeof(r=i[++a])=="function"&&(s.ma=!0,sg??(sg=r),rg??(rg=i[a+1]),r=i[a+=2]));const o={};for(;r&&Array.isArray(r)&&r.length&&typeof r[0]=="number"&&r[0]>0;){for(var c=0;c<r.length;c++)o[r[c]]=r;r=i[++a]}for(c=1;r!==void 0;){let d;typeof r=="number"&&(c+=r,r=i[++a]);var l=void 0;if(r instanceof Ma?d=r:(d=hy,a--),d==null?void 0:d.l){r=i[++a],l=i;var h=a;typeof r=="function"&&(r=r(),l[h]=r),l=r}for(h=c+1,typeof(r=i[++a])=="number"&&r<0&&(h-=r,r=i[++a]);c<h;c++){const u=o[c];l?n(s,c,d,l,u):e(s,c,d,u)}}return i[t]=s}function ag(t){return Array.isArray(t)?t[0]instanceof Ma?t:[uy,t]:[t,void 0]}function og(t,e){return t instanceof Te?t.v:Array.isArray(t)?js(t,e):void 0}function Md(t,e,n,i){const s=n.g;t[e]=i?(r,a,o)=>s(r,a,o,i):s}function Sd(t,e,n,i,s){const r=n.g;let a,o;t[e]=(c,l,h)=>r(c,l,h,o||(o=hr(Jc,Md,Sd,i).T),a||(a=yd(i)),s)}function yd(t){let e=t[uu];if(e!=null)return e;const n=hr(Jc,Md,Sd,t);return e=n.ma?(i,s)=>sg(i,s,n):(i,s)=>{for(;Z0(s)&&s.h!=4;){var r=s.l,a=n[r];if(a==null){var o=n.ba;o&&(o=o[r])&&(o=fy(o))!=null&&(a=n[r]=o)}if(a==null||!a(s,i,r)){if(a=(o=s).m,uc(o),o.ha)var c=void 0;else c=o.g.g-a,o.g.g=a,c=$0(o.g,c);a=void 0,o=i,c&&((a=o[Pn]??(o[Pn]=new cu))[r]??(a[r]=[])).push(c)}}return(i=Gc(i))&&(i.da=n.qa[Np]),!0},t[uu]=e,t[Np]=dy.bind(t),e}function dy(t,e,n,i){var s=this[Jc];const r=this[uu],a=js(void 0,s.T),o=Gc(t);if(o){var c=!1,l=s.ba;if(l){if(s=(h,d,u)=>{if(u.length!==0)if(l[d])for(const f of u){h=j0(f);try{c=!0,r(a,h)}finally{K0(h)}}else i==null||i(t,d,u)},e==null)Rc(o,s);else if(o!=null){const h=o[e];h&&s(o,e,h)}if(c){let h=0|t[be];if(2&h&&2048&h&&!(n!=null&&n.Ka))throw Error();const d=fa(h),u=(f,g)=>{if(Qi(t,f,d)!=null){if((n==null?void 0:n.Qa)===1)return;throw Error()}g!=null&&(h=zt(t,h,f,g,d)),delete o[f]};e==null?A0(a,0|a[be],(f,g)=>{u(f,g)}):u(e,Qi(a,e,d))}}}}function fy(t){const e=(t=ag(t))[0].g;if(t=t[1]){const n=yd(t),i=hr(Jc,Md,Sd,t).T;return(s,r,a)=>e(s,r,a,i,n)}return e}function Qc(t,e,n){t[e]=n.h}function el(t,e,n,i){let s,r;const a=n.h;t[e]=(o,c,l)=>a(o,c,l,r||(r=hr(Zc,Qc,el,i).T),s||(s=cg(i)))}function cg(t){let e=t[Fp];if(!e){const n=hr(Zc,Qc,el,t);e=(i,s)=>lg(i,s,n),t[Fp]=e}return e}function lg(t,e,n){A0(t,0|t[be],(i,s)=>{if(s!=null){var r=function(a,o){var c=a[o];if(c)return c;if((c=a.ba)&&(c=c[o])){var l=(c=ag(c))[0].h;if(c=c[1]){const h=cg(c),d=hr(Zc,Qc,el,c).T;c=a.ma?rg(d,h):(u,f,g)=>l(u,f,g,d,h)}else c=l;return a[o]=c}}(n,i);r?r(e,s,i):i<500||qr(au,3)}}),(t=Gc(t))&&Rc(t,(i,s,r)=>{for(Jr(e,e.g.end()),i=0;i<r.length;i++)Jr(e,qu(r[i])||new Uint8Array(0))})}const py=Ln(0);function Sa(t,e){if(Array.isArray(e)){var n=0|e[be];if(4&n)return e;for(var i=0,s=0;i<e.length;i++){const r=t(e[i]);r!=null&&(e[s++]=r)}return s<i&&(e.length=s),(t=-1537&(5|n))!==n&&Xt(e,t),2&t&&Object.freeze(e),e}}function hn(t,e,n){return new Ma(t,e,n)}function ya(t,e,n){return new Ma(t,e,n)}function un(t,e,n){zt(t,0|t[be],e,n,fa(0|t[be]))}var my=Kc(function(t,e,n,i,s){if(t.h!==2)return!1;if(t=ni(t=po(t,js([void 0,void 0],i),s)),s=fa(i=0|e[be]),2&i)throw Error();let r=Qi(e,n,s);if(r instanceof Ji)2&r.J?(r=r.V(),r.push(t),zt(e,i,n,r,s)):r.Ma(t);else if(Array.isArray(r)){var a=0|r[be];8192&a||Xt(r,a|=8192),2&a&&(r=H0(r),zt(e,i,n,r,s)),r.push(t)}else zt(e,i,n,$a([t]),s);return!0},function(t,e,n,i,s){if(e instanceof Ji)e.forEach((r,a)=>{Ic(t,n,js([a,r],i),s)});else if(Array.isArray(e)){for(let r=0;r<e.length;r++){const a=e[r];Array.isArray(a)&&Ic(t,n,js(a,i),s)}$a(e)}});function hg(t,e,n){(e=Mi(e))!=null&&(qn(t,n,5),t=t.g,ju(e),fd(t))}function ug(t,e,n){if(e=function(i){if(i==null)return i;const s=typeof i;if(s==="bigint")return String(ho(64,i));if(uo(i)){if(s==="string")return D0(i);if(s==="number")return Ju(i)}}(e),e!=null&&(typeof e=="string"&&Up(e),e!=null))switch(qn(t,n,0),typeof e){case"number":t=t.g,Kr(e),Nr(t,yt,Nt);break;case"bigint":n=BigInt.asUintN(64,e),n=new hu(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),Nr(t.g,n.h,n.g);break;default:n=Up(e),Nr(t.g,n.h,n.g)}}function dg(t,e,n){(e=pa(e))!=null&&e!=null&&(qn(t,n,0),qc(t.g,e))}function fg(t,e,n){(e=P0(e))!=null&&(qn(t,n,0),t.g.g.push(e?1:0))}function pg(t,e,n){(e=en(e))!=null&&$c(t,n,g0(e))}function mg(t,e,n,i,s){Ic(t,n,og(e,i),s)}function gg(t,e,n){(e=e==null||typeof e=="string"||e instanceof Ei?e:void 0)!=null&&$c(t,n,ld(e,!0).buffer)}function _g(t,e,n){(e=L0(e))!=null&&e!=null&&(qn(t,n,0),xa(t.g,e))}function vg(t,e,n){return(t.h===5||t.h===2)&&(e=va(e,0|e[be],n),t.h==2?Yc(t,Pc,e):e.push(Pc(t.g)),!0)}var Ot=hn(function(t,e,n){return t.h===5&&(un(e,n,Pc(t.g)),!0)},hg,jc),gy=ya(vg,function(t,e,n){if((e=Sa(Mi,e))!=null)for(let a=0;a<e.length;a++){var i=t,s=n,r=e[a];r!=null&&(qn(i,s,5),i=i.g,ju(r),fd(i))}},jc),Ed=ya(vg,function(t,e,n){if((e=Sa(Mi,e))!=null&&e.length){qn(t,n,2),xa(t.g,4*e.length);for(let i=0;i<e.length;i++)n=t.g,ju(e[i]),fd(n)}},jc),_y=hn(function(t,e,n){return t.h===5&&(un(e,n,(t=Pc(t.g))===0?void 0:t),!0)},hg,jc),bs=hn(function(t,e,n){return t.h!==0?t=!1:(un(e,n,hd(t.g,C0)),t=!0),t},ug,eg),eh=hn(function(t,e,n){return t.h!==0?e=!1:(un(e,n,(t=hd(t.g,C0))===py?void 0:t),e=!0),e},ug,eg),vy=hn(function(t,e,n){return t.h!==0?t=!1:(un(e,n,hd(t.g,HS)),t=!0),t},function(t,e,n){if(e=function(i){if(i==null)return i;var s=typeof i;if(s==="bigint")return String(GS(64,i));if(uo(i)){if(s==="string")return s=Zr(Number(i)),or(s)&&s>=0?i=String(s):((s=i.indexOf("."))!==-1&&(i=i.substring(0,s)),(s=i[0]!=="-"&&((s=i.length)<20||s===20&&i<="18446744073709551615"))||(Vc(i),i=ja(yt,Nt))),i;if(s==="number")return(i=Zr(i))>=0&&or(i)||(Kr(i),i=R0(yt,Nt)),i}}(e),e!=null&&(typeof e=="string"&&Dp(e),e!=null))switch(qn(t,n,0),typeof e){case"number":t=t.g,Kr(e),Nr(t,yt,Nt);break;case"bigint":n=BigInt.asUintN(64,e),n=new lu(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),Nr(t.g,n.h,n.g);break;default:n=Dp(e),Nr(t.g,n.h,n.g)}},ly),kt=hn(function(t,e,n){return t.h===0&&(un(e,n,Es(t.g)),!0)},dg,vd),mo=ya(function(t,e,n){return(t.h===0||t.h===2)&&(e=va(e,0|e[be],n),t.h==2?Yc(t,Es,e):e.push(Es(t.g)),!0)},function(t,e,n){if((e=Sa(pa,e))!=null&&e.length){n=pd(t,n);for(let i=0;i<e.length;i++)qc(t.g,e[i]);md(t,n)}},vd),Lr=hn(function(t,e,n){return t.h===0&&(un(e,n,(t=Es(t.g))===0?void 0:t),!0)},dg,vd),bt=hn(function(t,e,n){return t.h===0&&(un(e,n,ud(t.g)),!0)},fg,Q0),Qs=hn(function(t,e,n){return t.h===0&&(un(e,n,(t=ud(t.g))===!1?void 0:t),!0)},fg,Q0),rn=ya(function(t,e,n){return t.h===2&&(t=dd(t),va(e,0|e[be],n).push(t),!0)},function(t,e,n){if((e=Sa(en,e))!=null)for(let a=0;a<e.length;a++){var i=t,s=n,r=e[a];r!=null&&$c(i,s,g0(r))}},_d),ms=hn(function(t,e,n){return t.h===2&&(un(e,n,(t=dd(t))===""?void 0:t),!0)},pg,_d),ft=hn(function(t,e,n){return t.h===2&&(un(e,n,dd(t)),!0)},pg,_d),Kt=function(t,e,n=gd){return new Ma(t,e,n)}(function(t,e,n,i,s){return t.h===2&&(i=js(void 0,i),va(e,0|e[be],n).push(i),po(t,i,s),!0)},function(t,e,n,i,s){if(Array.isArray(e)){for(let r=0;r<e.length;r++)mg(t,e[r],n,i,s);1&(t=0|e[be])||Xt(e,1|t)}}),xt=Kc(function(t,e,n,i,s,r){if(t.h!==2)return!1;let a=0|e[be];return G0(e,a,r,n,fa(a)),po(t,e=od(e,i,n),s),!0},mg),xg=hn(function(t,e,n){return t.h===2&&(un(e,n,J0(t)),!0)},gg,tg),xy=ya(function(t,e,n){return(t.h===0||t.h===2)&&(e=va(e,0|e[be],n),t.h==2?Yc(t,Ri,e):e.push(Ri(t.g)),!0)},function(t,e,n){if((e=Sa(L0,e))!=null)for(let a=0;a<e.length;a++){var i=t,s=n,r=e[a];r!=null&&(qn(i,s,0),xa(i.g,r))}},xd),My=hn(function(t,e,n){return t.h===0&&(un(e,n,(t=Ri(t.g))===0?void 0:t),!0)},_g,xd),on=hn(function(t,e,n){return t.h===0&&(un(e,n,Es(t.g)),!0)},function(t,e,n){(e=pa(e))!=null&&(e=parseInt(e,10),qn(t,n,0),qc(t.g,e))},ng);class Sy{constructor(e,n){var i=Nn;this.g=e,this.h=n,this.m=tt,this.j=Ie,this.defaultValue=void 0,this.l=i.Oa!=null?w0:void 0}register(){Bc(this)}}function Ii(t,e){return new Sy(t,e)}function ws(t,e){return(n,i)=>{{const r={ea:!0};i&&Object.assign(r,i),n=j0(n,void 0,void 0,r);try{const a=new t,o=a.v;yd(e)(o,n);var s=a}finally{K0(n)}}return s}}function tl(t){return function(){const e=new class{constructor(){this.l=[],this.h=0,this.g=new class{constructor(){this.g=[]}length(){return this.g.length}end(){const a=this.g;return this.g=[],a}}}};lg(this.v,e,hr(Zc,Qc,el,t)),Jr(e,e.g.end());const n=new Uint8Array(e.h),i=e.l,s=i.length;let r=0;for(let a=0;a<s;a++){const o=i[a];n.set(o,r),r+=o.length}return e.l=[n],n}}var Op=class extends Te{constructor(t){super(t)}},Bp=[0,ms,hn(function(t,e,n){return t.h===2&&(un(e,n,(t=J0(t))===rr()?void 0:t),!0)},function(t,e,n){if(e!=null){if(e instanceof Te){const i=e.Ra;return void(i?(e=i(e),e!=null&&$c(t,n,ld(e,!0).buffer)):qr(au,3))}if(Array.isArray(e))return void qr(au,3)}gg(t,e,n)},tg)];let th,kp=globalThis.trustedTypes;function zp(t){var e;return th===void 0&&(th=function(){let n=null;if(!kp)return n;try{const i=s=>s;n=kp.createPolicy("goog#html",{createHTML:i,createScript:i,createScriptURL:i})}catch{}return n}()),t=(e=th)?e.createScriptURL(t):t,new class{constructor(n){this.g=n}toString(){return this.g+""}}(t)}function jo(t,...e){if(e.length===0)return zp(t[0]);let n=t[0];for(let i=0;i<e.length;i++)n+=encodeURIComponent(e[i])+t[i+1];return zp(n)}var Mg=[0,kt,on,bt,-1,mo,on,-1,bt],yy=class extends Te{constructor(t){super(t)}},Sg=[0,bt,ft,bt,on,-1,ya(function(t,e,n){return(t.h===0||t.h===2)&&(e=va(e,0|e[be],n),t.h==2?Yc(t,ry,e):e.push(Es(t.g)),!0)},function(t,e,n){if((e=Sa(pa,e))!=null&&e.length){n=pd(t,n);for(let i=0;i<e.length;i++)qc(t.g,e[i]);md(t,n)}},ng),ft,-1,[0,bt,-1],on,bt,-1],yg=[0,3,bt,-1,2,[0,[2],kt,xt,[0,hn(function(t,e,n){return t.h===0&&(un(e,n,Ri(t.g)),!0)},_g,xd)]],[0,on,bt,on,bt,on,bt,ft,-1],[0,[3,4],ft,-1,xt,[0,kt],xt,[0,on]],[0]],Eg=[0,ft,-2],Vp=class extends Te{constructor(t){super(t)}},bg=[0],Tg=[0,kt,bt,1,bt,-4],Nn=class extends Te{constructor(t){super(t,2)}},Vt={};Vt[336783863]=[0,ft,bt,-1,kt,[0,[1,2,3,4,5,6,7,8,9],xt,bg,xt,Sg,xt,Eg,xt,Tg,xt,Mg,xt,[0,ft,-2],xt,[0,ft,on],xt,yg,xt,[0,on,-1,bt]],[0,ft],bt,[0,[1,3],[2,4],xt,[0,mo],-1,xt,[0,rn],-1,Kt,[0,ft,-1]],ft];var Hp=[0,eh,-1,Qs,-3,eh,mo,ms,Lr,eh,-1,Qs,Lr,Qs,-2,ms];function Mt(t,e){Xc(t,3,e)}function je(t,e){Xc(t,4,e)}var yn=class extends Te{constructor(t){super(t,500)}o(t){return Ie(this,0,7,t)}},Ha=[-1,{}],Gp=[0,ft,1,Ha],Wp=[0,ft,rn,Ha];function $n(t,e){cd(t,1,yn,e)}function At(t,e){Xc(t,10,e)}function nt(t,e){Xc(t,15,e)}var On=class extends Te{constructor(t){super(t,500)}o(t){return Ie(this,0,1001,t)}},Ag=[-500,Kt,[-500,ms,-1,rn,-3,[-2,Vt,bt],Kt,Bp,Lr,-1,Gp,Wp,Kt,[0,ms,Qs],ms,Hp,Lr,rn,987,rn],4,Kt,[-500,ft,-1,[-1,{}],998,ft],Kt,[-500,ft,rn,-1,[-2,{},bt],997,rn,-1],Lr,Kt,[-500,ft,rn,Ha,998,rn],rn,Lr,Gp,Wp,Kt,[0,ms,-1,Ha],rn,-2,Hp,ms,-1,Qs,[0,Qs,My],978,Ha,Kt,Bp];On.prototype.g=tl(Ag);var Ey=ws(On,Ag),by=class extends Te{constructor(t){super(t)}},wg=class extends Te{constructor(t){super(t)}g(){return es(this,by,1)}},Rg=[0,Kt,[0,kt,Ot,ft,-1]],nl=ws(wg,Rg),Ty=class extends Te{constructor(t){super(t)}},Ay=class extends Te{constructor(t){super(t)}},nh=class extends Te{constructor(t){super(t)}l(){return tt(this,Ty,2)}g(){return es(this,Ay,5)}},Cg=ws(class extends Te{constructor(t){super(t)}},[0,rn,mo,Ed,[0,on,[0,kt,-3],[0,Ot,-3],[0,kt,-1,[0,Kt,[0,kt,-2]]],Kt,[0,Ot,-1,ft,Ot]],ft,-1,bs,Kt,[0,kt,Ot],rn,bs]),Pg=class extends Te{constructor(t){super(t)}},Or=ws(class extends Te{constructor(t){super(t)}},[0,Kt,[0,Ot,-4]]),Lg=class extends Te{constructor(t){super(t)}},go=ws(class extends Te{constructor(t){super(t)}},[0,Kt,[0,Ot,-4]]),wy=class extends Te{constructor(t){super(t)}},Ry=[0,kt,-1,Ed,on],Ig=class extends Te{constructor(t){super(t)}};Ig.prototype.g=tl([0,Ot,-4,bs]);var Cy=class extends Te{constructor(t){super(t)}},Py=ws(class extends Te{constructor(t){super(t)}},[0,Kt,[0,1,kt,ft,Rg],bs]),Xp=class extends Te{constructor(t){super(t)}},Ly=class extends Te{constructor(t){super(t)}na(){const t=Et(this,1,void 0,void 0,V0);return t??rr()}},Iy=class extends Te{constructor(t){super(t)}},Dg=[1,2],Dy=ws(class extends Te{constructor(t){super(t)}},[0,Kt,[0,Dg,xt,[0,Ed],xt,[0,xg],kt,ft],bs]),bd=class extends Te{constructor(t){super(t)}},Ug=[0,ft,kt,Ot,rn,-1],Yp=class extends Te{constructor(t){super(t)}},Uy=[0,bt,-1],qp=class extends Te{constructor(t){super(t)}},dc=[1,2,3,4,5,6],Dc=class extends Te{constructor(t){super(t)}g(){return Et(this,1,void 0,void 0,V0)!=null}l(){return en(Et(this,2))!=null}},Ct=class extends Te{constructor(t){super(t)}g(){return P0(Et(this,2))??!1}},Fg=[0,xg,ft,[0,kt,bs,-1],[0,vy,bs]],Bt=[0,Fg,bt,[0,dc,xt,Tg,xt,Sg,xt,Mg,xt,bg,xt,Eg,xt,yg],on],il=class extends Te{constructor(t){super(t)}},Td=[0,Bt,Ot,-1,kt],Fy=Ii(502141897,il);Vt[502141897]=Td;var Ny=ws(class extends Te{constructor(t){super(t)}},[0,[0,on,-1,gy,xy],Ry]),Ng=class extends Te{constructor(t){super(t)}},Og=class extends Te{constructor(t){super(t)}},du=[0,Bt,Ot,[0,Bt],bt],Oy=Ii(508968150,Og);Vt[508968150]=[0,Bt,Td,du,Ot,[0,[0,Fg]]],Vt[508968149]=du;var Rr=class extends Te{constructor(t){super(t)}l(){return tt(this,bd,2)}g(){ht(this,2)}},Bg=[0,Bt,Ug];Vt[478825465]=Bg;var By=class extends Te{constructor(t){super(t)}},kg=class extends Te{constructor(t){super(t)}},Ad=class extends Te{constructor(t){super(t)}},wd=class extends Te{constructor(t){super(t)}},zg=class extends Te{constructor(t){super(t)}},$p=[0,Bt,[0,Bt],Bg,-1],Vg=[0,Bt,Ot,kt],Rd=[0,Bt,Ot],Hg=[0,Bt,Vg,Rd,Ot],ky=Ii(479097054,zg);Vt[479097054]=[0,Bt,Hg,$p],Vt[463370452]=$p,Vt[464864288]=Vg;var zy=Ii(462713202,wd);Vt[462713202]=Hg,Vt[474472470]=Rd;var Vy=class extends Te{constructor(t){super(t)}},Gg=class extends Te{constructor(t){super(t)}},Wg=class extends Te{constructor(t){super(t)}},Xg=class extends Te{constructor(t){super(t)}},Cd=[0,Bt,Ot,-1,kt],fu=[0,Bt,Ot,bt];Xg.prototype.g=tl([0,Bt,Rd,[0,Bt],Td,du,Cd,fu]);var Yg=class extends Te{constructor(t){super(t)}},Hy=Ii(456383383,Yg);Vt[456383383]=[0,Bt,Ug];var qg=class extends Te{constructor(t){super(t)}},Gy=Ii(476348187,qg);Vt[476348187]=[0,Bt,Uy];var $g=class extends Te{constructor(t){super(t)}},jp=class extends Te{constructor(t){super(t)}},jg=[0,on,-1],Wy=Ii(458105876,class extends Te{constructor(t){super(t)}g(){let t;var e=this.v;const n=0|e[be];return t=Dn(this,n),e=function(i,s,r,a){var o=jp;!a&&ga(i)&&(r=0|(s=i.v)[be]);var c=Qi(s,2);if(i=!1,c==null){if(a)return Cp();c=[]}else if(c.constructor===Ji){if(!(2&c.J)||a)return c;c=c.V()}else Array.isArray(c)?i=!!(2&(0|c[be])):c=[];if(a){if(!c.length)return Cp();i||(i=!0,lo(c))}else i&&(i=!1,$a(c),c=H0(c));return!i&&32&r&&co(c,32),r=zt(s,r,2,a=new Ji(c,o,YS,void 0)),i||lr(s,r),a}(this,e,n,t),!t&&jp&&(e.ra=!0),e}});Vt[458105876]=[0,jg,my,[!0,bs,[0,ft,-1,rn]],[0,mo,bt,on]];var Pd=class extends Te{constructor(t){super(t)}},Kg=Ii(458105758,Pd);Vt[458105758]=[0,Bt,ft,jg];var ih=class extends Te{constructor(t){super(t)}},Kp=[0,_y,-1,Qs],Xy=class extends Te{constructor(t){super(t)}},Zg=class extends Te{constructor(t){super(t)}},pu=[1,2];Zg.prototype.g=tl([0,pu,xt,Kp,xt,[0,Kt,Kp]]);var Jg=class extends Te{constructor(t){super(t)}},Yy=Ii(443442058,Jg);Vt[443442058]=[0,Bt,ft,kt,Ot,rn,-1,bt,Ot],Vt[514774813]=Cd;var Qg=class extends Te{constructor(t){super(t)}},qy=Ii(516587230,Qg);function mu(t,e){return e=e?e.clone():new bd,t.displayNamesLocale!==void 0?ht(e,1,fo(t.displayNamesLocale)):t.displayNamesLocale===void 0&&ht(e,1),t.maxResults!==void 0?ts(e,2,t.maxResults):"maxResults"in t&&ht(e,2),t.scoreThreshold!==void 0?Ce(e,3,t.scoreThreshold):"scoreThreshold"in t&&ht(e,3),t.categoryAllowlist!==void 0?Cc(e,4,t.categoryAllowlist):"categoryAllowlist"in t&&ht(e,4),t.categoryDenylist!==void 0?Cc(e,5,t.categoryDenylist):"categoryDenylist"in t&&ht(e,5),e}function e_(t){const e=Number(t);return Number.isSafeInteger(e)?e:String(t)}function Ld(t,e=-1,n=""){return{categories:t.map(i=>({index:Xn(i,1)??0??-1,score:It(i,2)??0,categoryName:en(Et(i,3))??""??"",displayName:en(Et(i,4))??""??""})),headIndex:e,headName:n}}function $y(t){const e={classifications:es(t,Cy,1).map(n=>{var i;return Ld(((i=tt(n,wg,4))==null?void 0:i.g())??[],Xn(n,2)??0,en(Et(n,3))??"")})};return function(n){return n==null?n:typeof n=="bigint"?(ou(n)?n=Number(n):(n=ho(64,n),n=ou(n)?Number(n):String(n)),n):uo(n)?typeof n=="number"?Ju(n):D0(n):void 0}(Et(t,2,void 0,void 0,wc))!=null&&(e.timestampMs=e_(Et(t,2,void 0,void 0,wc)??k0)),e}function t_(t){var a,o;var e=$s(t,3,Mi,qs()),n=$s(t,2,pa,qs()),i=$s(t,1,en,qs()),s=$s(t,9,en,qs());const r={categories:[],keypoints:[]};for(let c=0;c<e.length;c++)r.categories.push({score:e[c],index:n[c]??-1,categoryName:i[c]??"",displayName:s[c]??""});if((e=(a=tt(t,nh,4))==null?void 0:a.l())&&(r.boundingBox={originX:Xn(e,1,hs)??0,originY:Xn(e,2,hs)??0,width:Xn(e,3,hs)??0,height:Xn(e,4,hs)??0,angle:0}),(o=tt(t,nh,4))==null?void 0:o.g().length)for(const c of tt(t,nh,4).g())r.keypoints.push({x:Et(c,1,void 0,hs,Mi)??0,y:Et(c,2,void 0,hs,Mi)??0,score:Et(c,4,void 0,hs,Mi)??0,label:en(Et(c,3,void 0,hs))??""});return r}function sl(t){const e=[];for(const n of es(t,Lg,1))e.push({x:It(n,1)??0,y:It(n,2)??0,z:It(n,3)??0,visibility:It(n,4)??0});return e}function Ga(t){const e=[];for(const n of es(t,Pg,1))e.push({x:It(n,1)??0,y:It(n,2)??0,z:It(n,3)??0,visibility:It(n,4)??0});return e}function Zp(t){return Array.from(t,e=>e>127?e-256:e)}function Jp(t,e){if(t.length!==e.length)throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${t.length} vs. ${e.length}).`);let n=0,i=0,s=0;for(let r=0;r<t.length;r++)n+=t[r]*e[r],i+=t[r]*t[r],s+=e[r]*e[r];if(i<=0||s<=0)throw Error("Cannot compute cosine similarity on embedding with 0 norm.");return n/Math.sqrt(i*s)}let Ko;Vt[516587230]=[0,Bt,Cd,fu,Ot],Vt[518928384]=fu;const jy=new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]);async function n_(t){if(t)return!0;if(Ko===void 0)try{await WebAssembly.instantiate(jy),Ko=!0}catch{Ko=!1}return Ko}async function Zo(t,e,n){return{wasmLoaderPath:`${e}/${t}_${n=`wasm${n?"_module":""}${await n_(n)?"":"_nosimd"}_internal`}.js`,wasmBinaryPath:`${e}/${t}_${n}.wasm`}}var Gs=class{};function i_(){var t=navigator;return typeof OffscreenCanvas<"u"&&(!function(e=navigator){return(e=e.userAgent).includes("Safari")&&!e.includes("Chrome")}(t)||!!((t=t.userAgent.match(/Version\/([\d]+).*Safari/))&&t.length>=1&&Number(t[1])>=17))}async function Qp(t){if(typeof importScripts!="function"){const e=document.createElement("script");return e.src=t.toString(),e.crossOrigin="anonymous",new Promise((n,i)=>{e.addEventListener("load",()=>{n()},!1),e.addEventListener("error",s=>{i(s)},!1),document.body.appendChild(e)})}try{importScripts(t.toString())}catch(e){if(!(e instanceof TypeError))throw e;await self.import(t.toString())}}function s_(t){return t.videoWidth!==void 0?[t.videoWidth,t.videoHeight]:t.naturalWidth!==void 0?[t.naturalWidth,t.naturalHeight]:t.displayWidth!==void 0?[t.displayWidth,t.displayHeight]:[t.width,t.height]}function we(t,e,n){t.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"),n(e=t.i.stringToNewUTF8(e)),t.i._free(e)}function em(t,e,n){if(!t.i.canvas)throw Error("No OpenGL canvas configured.");if(n?t.i._bindTextureToStream(n):t.i._bindTextureToCanvas(),!(n=t.i.canvas.getContext("webgl2")||t.i.canvas.getContext("webgl")))throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");t.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!0),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,e),t.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1);const[i,s]=s_(e);return!t.l||i===t.i.canvas.width&&s===t.i.canvas.height||(t.i.canvas.width=i,t.i.canvas.height=s),[i,s]}function tm(t,e,n){t.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");const i=new Uint32Array(e.length);for(let s=0;s<e.length;s++)i[s]=t.i.stringToNewUTF8(e[s]);e=t.i._malloc(4*i.length),t.i.HEAPU32.set(i,e>>2),n(e);for(const s of i)t.i._free(s);t.i._free(e)}function ui(t,e,n){t.i.simpleListeners=t.i.simpleListeners||{},t.i.simpleListeners[e]=n}function us(t,e,n){let i=[];t.i.simpleListeners=t.i.simpleListeners||{},t.i.simpleListeners[e]=(s,r,a)=>{r?(n(i,a),i=[]):i.push(s)}}Gs.forVisionTasks=function(t,e=!1){return Zo("vision",t??jo``,e)},Gs.forTextTasks=function(t,e=!1){return Zo("text",t??jo``,e)},Gs.forGenAiTasks=function(t,e=!1){return Zo("genai",t??jo``,e)},Gs.forAudioTasks=function(t,e=!1){return Zo("audio",t??jo``,e)},Gs.isSimdSupported=function(t=!1){return n_(t)};async function Ky(t,e,n,i){return t=await(async(s,r,a,o,c)=>{if(r&&await Qp(r),!self.ModuleFactory||a&&(await Qp(a),!self.ModuleFactory))throw Error("ModuleFactory not set.");return self.Module&&c&&((r=self.Module).locateFile=c.locateFile,c.mainScriptUrlOrBlob&&(r.mainScriptUrlOrBlob=c.mainScriptUrlOrBlob)),c=await self.ModuleFactory(self.Module||c),self.ModuleFactory=self.Module=void 0,new s(c,o)})(t,n.wasmLoaderPath,n.assetLoaderPath,e,{locateFile:s=>s.endsWith(".wasm")?n.wasmBinaryPath.toString():n.assetBinaryPath&&s.endsWith(".data")?n.assetBinaryPath.toString():s}),await t.o(i),t}function sh(t,e){const n=tt(t.baseOptions,Dc,1)||new Dc;typeof e=="string"?(ht(n,2,fo(e)),ht(n,1)):e instanceof Uint8Array&&(ht(n,1,$u(e,!1)),ht(n,2)),Ie(t.baseOptions,0,1,n)}function nm(t){try{const e=t.H.length;if(e===1)throw Error(t.H[0].message);if(e>1)throw Error("Encountered multiple errors: "+t.H.map(n=>n.message).join(", "))}finally{t.H=[]}}function me(t,e){t.C=Math.max(t.C,e)}function rl(t,e){t.B=new yn,Un(t.B,2,"PassThroughCalculator"),Mt(t.B,"free_memory"),je(t.B,"free_memory_unused_out"),At(e,"free_memory"),$n(e,t.B)}function Qr(t,e){Mt(t.B,e),je(t.B,e+"_unused_out")}function al(t){t.g.addBoolToStream(!0,"free_memory",t.C)}var gu=class{constructor(t){this.g=t,this.H=[],this.C=0,this.g.setAutoRenderToScreen(!1)}l(t,e=!0){var n,i,s,r,a,o;if(e){const c=t.baseOptions||{};if((n=t.baseOptions)!=null&&n.modelAssetBuffer&&((i=t.baseOptions)!=null&&i.modelAssetPath))throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");if(!((s=tt(this.baseOptions,Dc,1))!=null&&s.g()||(r=tt(this.baseOptions,Dc,1))!=null&&r.l()||(a=t.baseOptions)!=null&&a.modelAssetBuffer||(o=t.baseOptions)!=null&&o.modelAssetPath))throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");if(function(l,h){let d=tt(l.baseOptions,qp,3);if(!d){var u=d=new qp,f=new Vp;Va(u,4,dc,f)}"delegate"in h&&(h.delegate==="GPU"?(h=d,u=new yy,Va(h,2,dc,u)):(h=d,u=new Vp,Va(h,4,dc,u))),Ie(l.baseOptions,0,3,d)}(this,c),c.modelAssetPath)return fetch(c.modelAssetPath.toString()).then(l=>{if(l.ok)return l.arrayBuffer();throw Error(`Failed to fetch model: ${c.modelAssetPath} (${l.status})`)}).then(l=>{try{this.g.i.FS_unlink("/model.dat")}catch{}this.g.i.FS_createDataFile("/","model.dat",new Uint8Array(l),!0,!1,!1),sh(this,"/model.dat"),this.m(),this.L()});if(c.modelAssetBuffer instanceof Uint8Array)sh(this,c.modelAssetBuffer);else if(c.modelAssetBuffer)return async function(l){const h=[];for(var d=0;;){const{done:u,value:f}=await l.read();if(u)break;h.push(f),d+=f.length}if(h.length===0)return new Uint8Array(0);if(h.length===1)return h[0];l=new Uint8Array(d),d=0;for(const u of h)l.set(u,d),d+=u.length;return l}(c.modelAssetBuffer).then(l=>{sh(this,l),this.m(),this.L()})}return this.m(),this.L(),Promise.resolve()}L(){}ca(){let t;if(this.g.ca(e=>{t=Ey(e)}),!t)throw Error("Failed to retrieve CalculatorGraphConfig");return t}setGraph(t,e){this.g.attachErrorListener((n,i)=>{this.H.push(Error(i))}),this.g.Ja(),this.g.setGraph(t,e),this.B=void 0,nm(this)}finishProcessing(){this.g.finishProcessing(),nm(this)}close(){this.B=void 0,this.g.closeGraph()}};function Ms(t,e){if(!t)throw Error(`Unable to obtain required WebGL resource: ${e}`);return t}gu.prototype.close=gu.prototype.close;class Zy{constructor(e,n,i,s){this.g=e,this.h=n,this.m=i,this.l=s}bind(){this.g.bindVertexArray(this.h)}close(){this.g.deleteVertexArray(this.h),this.g.deleteBuffer(this.m),this.g.deleteBuffer(this.l)}}function im(t,e,n){const i=t.g;if(n=Ms(i.createShader(n),"Failed to create WebGL shader"),i.shaderSource(n,e),i.compileShader(n),!i.getShaderParameter(n,i.COMPILE_STATUS))throw Error(`Could not compile WebGL shader: ${i.getShaderInfoLog(n)}`);return i.attachShader(t.h,n),n}function sm(t,e){const n=t.g,i=Ms(n.createVertexArray(),"Failed to create vertex array");n.bindVertexArray(i);const s=Ms(n.createBuffer(),"Failed to create buffer");n.bindBuffer(n.ARRAY_BUFFER,s),n.enableVertexAttribArray(t.O),n.vertexAttribPointer(t.O,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),n.STATIC_DRAW);const r=Ms(n.createBuffer(),"Failed to create buffer");return n.bindBuffer(n.ARRAY_BUFFER,r),n.enableVertexAttribArray(t.L),n.vertexAttribPointer(t.L,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array(e?[0,1,0,0,1,0,1,1]:[0,0,0,1,1,1,1,0]),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,null),n.bindVertexArray(null),new Zy(n,i,s,r)}function Id(t,e){if(t.g){if(e!==t.g)throw Error("Cannot change GL context once initialized")}else t.g=e}function Jy(t,e,n,i){return Id(t,e),t.h||(t.m(),t.D()),n?(t.u||(t.u=sm(t,!0)),n=t.u):(t.A||(t.A=sm(t,!1)),n=t.A),e.useProgram(t.h),n.bind(),t.l(),t=i(),n.g.bindVertexArray(null),t}function r_(t,e,n){return Id(t,e),t=Ms(e.createTexture(),"Failed to create texture"),e.bindTexture(e.TEXTURE_2D,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,n??e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,n??e.LINEAR),e.bindTexture(e.TEXTURE_2D,null),t}function a_(t,e,n){Id(t,e),t.B||(t.B=Ms(e.createFramebuffer(),"Failed to create framebuffe.")),e.bindFramebuffer(e.FRAMEBUFFER,t.B),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0)}function Qy(t){var e;(e=t.g)==null||e.bindFramebuffer(t.g.FRAMEBUFFER,null)}var o_=class{H(){return`
  precision mediump float;
  varying vec2 vTex;
  uniform sampler2D inputTexture;
  void main() {
    gl_FragColor = texture2D(inputTexture, vTex);
  }
 `}m(){const t=this.g;if(this.h=Ms(t.createProgram(),"Failed to create WebGL program"),this.X=im(this,`
  attribute vec2 aVertex;
  attribute vec2 aTex;
  varying vec2 vTex;
  void main(void) {
    gl_Position = vec4(aVertex, 0.0, 1.0);
    vTex = aTex;
  }`,t.VERTEX_SHADER),this.W=im(this,this.H(),t.FRAGMENT_SHADER),t.linkProgram(this.h),!t.getProgramParameter(this.h,t.LINK_STATUS))throw Error(`Error during program linking: ${t.getProgramInfoLog(this.h)}`);this.O=t.getAttribLocation(this.h,"aVertex"),this.L=t.getAttribLocation(this.h,"aTex")}D(){}l(){}close(){if(this.h){const t=this.g;t.deleteProgram(this.h),t.deleteShader(this.X),t.deleteShader(this.W)}this.B&&this.g.deleteFramebuffer(this.B),this.A&&this.A.close(),this.u&&this.u.close()}};function Hi(t,e){switch(e){case 0:return t.g.find(n=>n instanceof Uint8Array);case 1:return t.g.find(n=>n instanceof Float32Array);case 2:return t.g.find(n=>typeof WebGLTexture<"u"&&n instanceof WebGLTexture);default:throw Error(`Type is not supported: ${e}`)}}function _u(t){var e=Hi(t,1);if(!e){if(e=Hi(t,0))e=new Float32Array(e).map(i=>i/255);else{e=new Float32Array(t.width*t.height);const i=ea(t);var n=Dd(t);if(a_(n,i,c_(t)),"iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"document"in self&&"ontouchend"in self.document){n=new Float32Array(t.width*t.height*4),i.readPixels(0,0,t.width,t.height,i.RGBA,i.FLOAT,n);for(let s=0,r=0;s<e.length;++s,r+=4)e[s]=n[r]}else i.readPixels(0,0,t.width,t.height,i.RED,i.FLOAT,e)}t.g.push(e)}return e}function c_(t){let e=Hi(t,2);if(!e){const n=ea(t);e=h_(t);const i=_u(t),s=l_(t);n.texImage2D(n.TEXTURE_2D,0,s,t.width,t.height,0,n.RED,n.FLOAT,i),vu(t)}return e}function ea(t){if(!t.canvas)throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");return t.h||(t.h=Ms(t.canvas.getContext("webgl2"),"You cannot use a canvas that is already bound to a different type of rendering context.")),t.h}function l_(t){if(t=ea(t),!Jo)if(t.getExtension("EXT_color_buffer_float")&&t.getExtension("OES_texture_float_linear")&&t.getExtension("EXT_float_blend"))Jo=t.R32F;else{if(!t.getExtension("EXT_color_buffer_half_float"))throw Error("GPU does not fully support 4-channel float32 or float16 formats");Jo=t.R16F}return Jo}function Dd(t){return t.l||(t.l=new o_),t.l}function h_(t){const e=ea(t);e.viewport(0,0,t.width,t.height),e.activeTexture(e.TEXTURE0);let n=Hi(t,2);return n||(n=r_(Dd(t),e,t.m?e.LINEAR:e.NEAREST),t.g.push(n),t.j=!0),e.bindTexture(e.TEXTURE_2D,n),n}function vu(t){t.h.bindTexture(t.h.TEXTURE_2D,null)}var Jo,jt=class{constructor(t,e,n,i,s,r,a){this.g=t,this.m=e,this.j=n,this.canvas=i,this.l=s,this.width=r,this.height=a,this.j&&--rm===0&&console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources.")}Fa(){return!!Hi(this,0)}ka(){return!!Hi(this,1)}R(){return!!Hi(this,2)}ja(){return(e=Hi(t=this,0))||(e=_u(t),e=new Uint8Array(e.map(n=>Math.round(255*n))),t.g.push(e)),e;var t,e}ia(){return _u(this)}N(){return c_(this)}clone(){const t=[];for(const e of this.g){let n;if(e instanceof Uint8Array)n=new Uint8Array(e);else if(e instanceof Float32Array)n=new Float32Array(e);else{if(!(e instanceof WebGLTexture))throw Error(`Type is not supported: ${e}`);{const i=ea(this),s=Dd(this);i.activeTexture(i.TEXTURE1),n=r_(s,i,this.m?i.LINEAR:i.NEAREST),i.bindTexture(i.TEXTURE_2D,n);const r=l_(this);i.texImage2D(i.TEXTURE_2D,0,r,this.width,this.height,0,i.RED,i.FLOAT,null),i.bindTexture(i.TEXTURE_2D,null),a_(s,i,n),Jy(s,i,!1,()=>{h_(this),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.drawArrays(i.TRIANGLE_FAN,0,4),vu(this)}),Qy(s),vu(this)}}t.push(n)}return new jt(t,this.m,this.R(),this.canvas,this.l,this.width,this.height)}close(){this.j&&ea(this).deleteTexture(Hi(this,2)),rm=-1}};jt.prototype.close=jt.prototype.close,jt.prototype.clone=jt.prototype.clone,jt.prototype.getAsWebGLTexture=jt.prototype.N,jt.prototype.getAsFloat32Array=jt.prototype.ia,jt.prototype.getAsUint8Array=jt.prototype.ja,jt.prototype.hasWebGLTexture=jt.prototype.R,jt.prototype.hasFloat32Array=jt.prototype.ka,jt.prototype.hasUint8Array=jt.prototype.Fa;var rm=250;function ri(...t){return t.map(([e,n])=>({start:e,end:n}))}const eE=function(t){return class extends t{Ja(){this.i._registerModelResourcesGraphService()}}}((am=class{constructor(t,e){this.l=!0,this.i=t,this.g=null,this.h=0,this.m=typeof this.i._addIntToInputStream=="function",e!==void 0?this.i.canvas=e:i_()?this.i.canvas=new OffscreenCanvas(1,1):(console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."),this.i.canvas=document.createElement("canvas"))}async initializeGraph(t){const e=await(await fetch(t)).arrayBuffer();t=!(t.endsWith(".pbtxt")||t.endsWith(".textproto")),this.setGraph(new Uint8Array(e),t)}setGraphFromString(t){this.setGraph(new TextEncoder().encode(t),!1)}setGraph(t,e){const n=t.length,i=this.i._malloc(n);this.i.HEAPU8.set(t,i),e?this.i._changeBinaryGraph(n,i):this.i._changeTextGraph(n,i),this.i._free(i)}configureAudio(t,e,n,i,s){this.i._configureAudio||console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'),we(this,i||"input_audio",r=>{we(this,s=s||"audio_header",a=>{this.i._configureAudio(r,a,t,e??0,n)})})}setAutoResizeCanvas(t){this.l=t}setAutoRenderToScreen(t){this.i._setAutoRenderToScreen(t)}setGpuBufferVerticalFlip(t){this.i.gpuOriginForWebTexturesIsBottomLeft=t}ca(t){ui(this,"__graph_config__",e=>{t(e)}),we(this,"__graph_config__",e=>{this.i._getGraphConfig(e,void 0)}),delete this.i.simpleListeners.__graph_config__}attachErrorListener(t){this.i.errorListener=t}attachEmptyPacketListener(t,e){this.i.emptyPacketListeners=this.i.emptyPacketListeners||{},this.i.emptyPacketListeners[t]=e}addAudioToStream(t,e,n){this.addAudioToStreamWithShape(t,0,0,e,n)}addAudioToStreamWithShape(t,e,n,i,s){const r=4*t.length;this.h!==r&&(this.g&&this.i._free(this.g),this.g=this.i._malloc(r),this.h=r),this.i.HEAPF32.set(t,this.g/4),we(this,i,a=>{this.i._addAudioToInputStream(this.g,e,n,a,s)})}addGpuBufferToStream(t,e,n){we(this,e,i=>{const[s,r]=em(this,t,i);this.i._addBoundTextureToStream(i,s,r,n)})}addBoolToStream(t,e,n){we(this,e,i=>{this.i._addBoolToInputStream(t,i,n)})}addDoubleToStream(t,e,n){we(this,e,i=>{this.i._addDoubleToInputStream(t,i,n)})}addFloatToStream(t,e,n){we(this,e,i=>{this.i._addFloatToInputStream(t,i,n)})}addIntToStream(t,e,n){we(this,e,i=>{this.i._addIntToInputStream(t,i,n)})}addUintToStream(t,e,n){we(this,e,i=>{this.i._addUintToInputStream(t,i,n)})}addStringToStream(t,e,n){we(this,e,i=>{we(this,t,s=>{this.i._addStringToInputStream(s,i,n)})})}addStringRecordToStream(t,e,n){we(this,e,i=>{tm(this,Object.keys(t),s=>{tm(this,Object.values(t),r=>{this.i._addFlatHashMapToInputStream(s,r,Object.keys(t).length,i,n)})})})}addProtoToStream(t,e,n,i){we(this,n,s=>{we(this,e,r=>{const a=this.i._malloc(t.length);this.i.HEAPU8.set(t,a),this.i._addProtoToInputStream(a,t.length,r,s,i),this.i._free(a)})})}addEmptyPacketToStream(t,e){we(this,t,n=>{this.i._addEmptyPacketToInputStream(n,e)})}addBoolVectorToStream(t,e,n){we(this,e,i=>{const s=this.i._allocateBoolVector(t.length);if(!s)throw Error("Unable to allocate new bool vector on heap.");for(const r of t)this.i._addBoolVectorEntry(s,r);this.i._addBoolVectorToInputStream(s,i,n)})}addDoubleVectorToStream(t,e,n){we(this,e,i=>{const s=this.i._allocateDoubleVector(t.length);if(!s)throw Error("Unable to allocate new double vector on heap.");for(const r of t)this.i._addDoubleVectorEntry(s,r);this.i._addDoubleVectorToInputStream(s,i,n)})}addFloatVectorToStream(t,e,n){we(this,e,i=>{const s=this.i._allocateFloatVector(t.length);if(!s)throw Error("Unable to allocate new float vector on heap.");for(const r of t)this.i._addFloatVectorEntry(s,r);this.i._addFloatVectorToInputStream(s,i,n)})}addIntVectorToStream(t,e,n){we(this,e,i=>{const s=this.i._allocateIntVector(t.length);if(!s)throw Error("Unable to allocate new int vector on heap.");for(const r of t)this.i._addIntVectorEntry(s,r);this.i._addIntVectorToInputStream(s,i,n)})}addUintVectorToStream(t,e,n){we(this,e,i=>{const s=this.i._allocateUintVector(t.length);if(!s)throw Error("Unable to allocate new unsigned int vector on heap.");for(const r of t)this.i._addUintVectorEntry(s,r);this.i._addUintVectorToInputStream(s,i,n)})}addStringVectorToStream(t,e,n){we(this,e,i=>{const s=this.i._allocateStringVector(t.length);if(!s)throw Error("Unable to allocate new string vector on heap.");for(const r of t)we(this,r,a=>{this.i._addStringVectorEntry(s,a)});this.i._addStringVectorToInputStream(s,i,n)})}addBoolToInputSidePacket(t,e){we(this,e,n=>{this.i._addBoolToInputSidePacket(t,n)})}addDoubleToInputSidePacket(t,e){we(this,e,n=>{this.i._addDoubleToInputSidePacket(t,n)})}addFloatToInputSidePacket(t,e){we(this,e,n=>{this.i._addFloatToInputSidePacket(t,n)})}addIntToInputSidePacket(t,e){we(this,e,n=>{this.i._addIntToInputSidePacket(t,n)})}addUintToInputSidePacket(t,e){we(this,e,n=>{this.i._addUintToInputSidePacket(t,n)})}addStringToInputSidePacket(t,e){we(this,e,n=>{we(this,t,i=>{this.i._addStringToInputSidePacket(i,n)})})}addProtoToInputSidePacket(t,e,n){we(this,n,i=>{we(this,e,s=>{const r=this.i._malloc(t.length);this.i.HEAPU8.set(t,r),this.i._addProtoToInputSidePacket(r,t.length,s,i),this.i._free(r)})})}addBoolVectorToInputSidePacket(t,e){we(this,e,n=>{const i=this.i._allocateBoolVector(t.length);if(!i)throw Error("Unable to allocate new bool vector on heap.");for(const s of t)this.i._addBoolVectorEntry(i,s);this.i._addBoolVectorToInputSidePacket(i,n)})}addDoubleVectorToInputSidePacket(t,e){we(this,e,n=>{const i=this.i._allocateDoubleVector(t.length);if(!i)throw Error("Unable to allocate new double vector on heap.");for(const s of t)this.i._addDoubleVectorEntry(i,s);this.i._addDoubleVectorToInputSidePacket(i,n)})}addFloatVectorToInputSidePacket(t,e){we(this,e,n=>{const i=this.i._allocateFloatVector(t.length);if(!i)throw Error("Unable to allocate new float vector on heap.");for(const s of t)this.i._addFloatVectorEntry(i,s);this.i._addFloatVectorToInputSidePacket(i,n)})}addIntVectorToInputSidePacket(t,e){we(this,e,n=>{const i=this.i._allocateIntVector(t.length);if(!i)throw Error("Unable to allocate new int vector on heap.");for(const s of t)this.i._addIntVectorEntry(i,s);this.i._addIntVectorToInputSidePacket(i,n)})}addUintVectorToInputSidePacket(t,e){we(this,e,n=>{const i=this.i._allocateUintVector(t.length);if(!i)throw Error("Unable to allocate new unsigned int vector on heap.");for(const s of t)this.i._addUintVectorEntry(i,s);this.i._addUintVectorToInputSidePacket(i,n)})}addStringVectorToInputSidePacket(t,e){we(this,e,n=>{const i=this.i._allocateStringVector(t.length);if(!i)throw Error("Unable to allocate new string vector on heap.");for(const s of t)we(this,s,r=>{this.i._addStringVectorEntry(i,r)});this.i._addStringVectorToInputSidePacket(i,n)})}attachBoolListener(t,e){ui(this,t,e),we(this,t,n=>{this.i._attachBoolListener(n)})}attachBoolVectorListener(t,e){us(this,t,e),we(this,t,n=>{this.i._attachBoolVectorListener(n)})}attachIntListener(t,e){ui(this,t,e),we(this,t,n=>{this.i._attachIntListener(n)})}attachIntVectorListener(t,e){us(this,t,e),we(this,t,n=>{this.i._attachIntVectorListener(n)})}attachUintListener(t,e){ui(this,t,e),we(this,t,n=>{this.i._attachUintListener(n)})}attachUintVectorListener(t,e){us(this,t,e),we(this,t,n=>{this.i._attachUintVectorListener(n)})}attachDoubleListener(t,e){ui(this,t,e),we(this,t,n=>{this.i._attachDoubleListener(n)})}attachDoubleVectorListener(t,e){us(this,t,e),we(this,t,n=>{this.i._attachDoubleVectorListener(n)})}attachFloatListener(t,e){ui(this,t,e),we(this,t,n=>{this.i._attachFloatListener(n)})}attachFloatVectorListener(t,e){us(this,t,e),we(this,t,n=>{this.i._attachFloatVectorListener(n)})}attachStringListener(t,e){ui(this,t,e),we(this,t,n=>{this.i._attachStringListener(n)})}attachStringVectorListener(t,e){us(this,t,e),we(this,t,n=>{this.i._attachStringVectorListener(n)})}attachProtoListener(t,e,n){ui(this,t,e),we(this,t,i=>{this.i._attachProtoListener(i,n||!1)})}attachProtoVectorListener(t,e,n){us(this,t,e),we(this,t,i=>{this.i._attachProtoVectorListener(i,n||!1)})}attachAudioListener(t,e,n){this.i._attachAudioListener||console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'),ui(this,t,(i,s)=>{i=new Float32Array(i.buffer,i.byteOffset,i.length/4),e(i,s)}),we(this,t,i=>{this.i._attachAudioListener(i,n||!1)})}finishProcessing(){this.i._waitUntilIdle()}closeGraph(){this.i._closeGraph(),this.i.simpleListeners=void 0,this.i.emptyPacketListeners=void 0}},class extends am{get ga(){return this.i}pa(t,e,n){we(this,e,i=>{const[s,r]=em(this,t,i);this.ga._addBoundTextureAsImageToStream(i,s,r,n)})}Z(t,e){ui(this,t,e),we(this,t,n=>{this.ga._attachImageListener(n)})}aa(t,e){us(this,t,e),we(this,t,n=>{this.ga._attachImageVectorListener(n)})}}));var am,ai=class extends eE{};async function Je(t,e,n){return async function(i,s,r,a){return Ky(i,s,r,a)}(t,n.canvas??(i_()?void 0:document.createElement("canvas")),e,n)}function u_(t,e,n,i){if(t.U){const r=new Ig;if(n!=null&&n.regionOfInterest){if(!t.oa)throw Error("This task doesn't support region-of-interest.");var s=n.regionOfInterest;if(s.left>=s.right||s.top>=s.bottom)throw Error("Expected RectF with left < right and top < bottom.");if(s.left<0||s.top<0||s.right>1||s.bottom>1)throw Error("Expected RectF values to be in [0,1].");Ce(r,1,(s.left+s.right)/2),Ce(r,2,(s.top+s.bottom)/2),Ce(r,4,s.right-s.left),Ce(r,3,s.bottom-s.top)}else Ce(r,1,.5),Ce(r,2,.5),Ce(r,4,1),Ce(r,3,1);if(n!=null&&n.rotationDegrees){if((n==null?void 0:n.rotationDegrees)%90!=0)throw Error("Expected rotation to be a multiple of 90°.");if(Ce(r,5,-Math.PI*n.rotationDegrees/180),(n==null?void 0:n.rotationDegrees)%180!=0){const[a,o]=s_(e);n=It(r,3)*o/a,s=It(r,4)*a/o,Ce(r,4,n),Ce(r,3,s)}}t.g.addProtoToStream(r.g(),"mediapipe.NormalizedRect",t.U,i)}t.g.pa(e,t.X,i??performance.now()),t.finishProcessing()}function oi(t,e,n){var i;if((i=t.baseOptions)!=null&&i.g())throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");u_(t,e,n,t.C+1)}function Di(t,e,n,i){var s;if(!((s=t.baseOptions)!=null&&s.g()))throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");u_(t,e,n,i)}function ta(t,e,n,i){var s=e.data;const r=e.width,a=r*(e=e.height);if((s instanceof Uint8Array||s instanceof Float32Array)&&s.length!==a)throw Error("Unsupported channel count: "+s.length/a);return t=new jt([s],n,!1,t.g.i.canvas,t.P,r,e),i?t.clone():t}var Fn=class extends gu{constructor(t,e,n,i){super(t),this.g=t,this.X=e,this.U=n,this.oa=i,this.P=new o_}l(t,e=!0){if("runningMode"in t&&ht(this.baseOptions,2,Ka(!!t.runningMode&&t.runningMode!=="IMAGE")),t.canvas!==void 0&&this.g.i.canvas!==t.canvas)throw Error("You must create a new task to reset the canvas.");return super.l(t,e)}close(){this.P.close(),super.close()}};Fn.prototype.close=Fn.prototype.close;var zn=class extends Fn{constructor(t,e){super(new ai(t,e),"image_in","norm_rect_in",!1),this.j={detections:[]},Ie(t=this.h=new il,0,1,e=new Ct),Ce(this.h,2,.5),Ce(this.h,3,.3)}get baseOptions(){return tt(this.h,Ct,1)}set baseOptions(t){Ie(this.h,0,1,t)}o(t){return"minDetectionConfidence"in t&&Ce(this.h,2,t.minDetectionConfidence??.5),"minSuppressionThreshold"in t&&Ce(this.h,3,t.minSuppressionThreshold??.3),this.l(t)}F(t,e){return this.j={detections:[]},oi(this,t,e),this.j}G(t,e,n){return this.j={detections:[]},Di(this,t,n,e),this.j}m(){var t=new On;At(t,"image_in"),At(t,"norm_rect_in"),nt(t,"detections");const e=new Nn;Li(e,Fy,this.h);const n=new yn;Un(n,2,"mediapipe.tasks.vision.face_detector.FaceDetectorGraph"),Mt(n,"IMAGE:image_in"),Mt(n,"NORM_RECT:norm_rect_in"),je(n,"DETECTIONS:detections"),n.o(e),$n(t,n),this.g.attachProtoVectorListener("detections",(i,s)=>{for(const r of i)i=Cg(r),this.j.detections.push(t_(i));me(this,s)}),this.g.attachEmptyPacketListener("detections",i=>{me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};zn.prototype.detectForVideo=zn.prototype.G,zn.prototype.detect=zn.prototype.F,zn.prototype.setOptions=zn.prototype.o,zn.createFromModelPath=async function(t,e){return Je(zn,t,{baseOptions:{modelAssetPath:e}})},zn.createFromModelBuffer=function(t,e){return Je(zn,t,{baseOptions:{modelAssetBuffer:e}})},zn.createFromOptions=function(t,e){return Je(zn,t,e)};var Ud=ri([61,146],[146,91],[91,181],[181,84],[84,17],[17,314],[314,405],[405,321],[321,375],[375,291],[61,185],[185,40],[40,39],[39,37],[37,0],[0,267],[267,269],[269,270],[270,409],[409,291],[78,95],[95,88],[88,178],[178,87],[87,14],[14,317],[317,402],[402,318],[318,324],[324,308],[78,191],[191,80],[80,81],[81,82],[82,13],[13,312],[312,311],[311,310],[310,415],[415,308]),Fd=ri([263,249],[249,390],[390,373],[373,374],[374,380],[380,381],[381,382],[382,362],[263,466],[466,388],[388,387],[387,386],[386,385],[385,384],[384,398],[398,362]),Nd=ri([276,283],[283,282],[282,295],[295,285],[300,293],[293,334],[334,296],[296,336]),d_=ri([474,475],[475,476],[476,477],[477,474]),Od=ri([33,7],[7,163],[163,144],[144,145],[145,153],[153,154],[154,155],[155,133],[33,246],[246,161],[161,160],[160,159],[159,158],[158,157],[157,173],[173,133]),Bd=ri([46,53],[53,52],[52,65],[65,55],[70,63],[63,105],[105,66],[66,107]),f_=ri([469,470],[470,471],[471,472],[472,469]),kd=ri([10,338],[338,297],[297,332],[332,284],[284,251],[251,389],[389,356],[356,454],[454,323],[323,361],[361,288],[288,397],[397,365],[365,379],[379,378],[378,400],[400,377],[377,152],[152,148],[148,176],[176,149],[149,150],[150,136],[136,172],[172,58],[58,132],[132,93],[93,234],[234,127],[127,162],[162,21],[21,54],[54,103],[103,67],[67,109],[109,10]),p_=[...Ud,...Fd,...Nd,...Od,...Bd,...kd],m_=ri([127,34],[34,139],[139,127],[11,0],[0,37],[37,11],[232,231],[231,120],[120,232],[72,37],[37,39],[39,72],[128,121],[121,47],[47,128],[232,121],[121,128],[128,232],[104,69],[69,67],[67,104],[175,171],[171,148],[148,175],[118,50],[50,101],[101,118],[73,39],[39,40],[40,73],[9,151],[151,108],[108,9],[48,115],[115,131],[131,48],[194,204],[204,211],[211,194],[74,40],[40,185],[185,74],[80,42],[42,183],[183,80],[40,92],[92,186],[186,40],[230,229],[229,118],[118,230],[202,212],[212,214],[214,202],[83,18],[18,17],[17,83],[76,61],[61,146],[146,76],[160,29],[29,30],[30,160],[56,157],[157,173],[173,56],[106,204],[204,194],[194,106],[135,214],[214,192],[192,135],[203,165],[165,98],[98,203],[21,71],[71,68],[68,21],[51,45],[45,4],[4,51],[144,24],[24,23],[23,144],[77,146],[146,91],[91,77],[205,50],[50,187],[187,205],[201,200],[200,18],[18,201],[91,106],[106,182],[182,91],[90,91],[91,181],[181,90],[85,84],[84,17],[17,85],[206,203],[203,36],[36,206],[148,171],[171,140],[140,148],[92,40],[40,39],[39,92],[193,189],[189,244],[244,193],[159,158],[158,28],[28,159],[247,246],[246,161],[161,247],[236,3],[3,196],[196,236],[54,68],[68,104],[104,54],[193,168],[168,8],[8,193],[117,228],[228,31],[31,117],[189,193],[193,55],[55,189],[98,97],[97,99],[99,98],[126,47],[47,100],[100,126],[166,79],[79,218],[218,166],[155,154],[154,26],[26,155],[209,49],[49,131],[131,209],[135,136],[136,150],[150,135],[47,126],[126,217],[217,47],[223,52],[52,53],[53,223],[45,51],[51,134],[134,45],[211,170],[170,140],[140,211],[67,69],[69,108],[108,67],[43,106],[106,91],[91,43],[230,119],[119,120],[120,230],[226,130],[130,247],[247,226],[63,53],[53,52],[52,63],[238,20],[20,242],[242,238],[46,70],[70,156],[156,46],[78,62],[62,96],[96,78],[46,53],[53,63],[63,46],[143,34],[34,227],[227,143],[123,117],[117,111],[111,123],[44,125],[125,19],[19,44],[236,134],[134,51],[51,236],[216,206],[206,205],[205,216],[154,153],[153,22],[22,154],[39,37],[37,167],[167,39],[200,201],[201,208],[208,200],[36,142],[142,100],[100,36],[57,212],[212,202],[202,57],[20,60],[60,99],[99,20],[28,158],[158,157],[157,28],[35,226],[226,113],[113,35],[160,159],[159,27],[27,160],[204,202],[202,210],[210,204],[113,225],[225,46],[46,113],[43,202],[202,204],[204,43],[62,76],[76,77],[77,62],[137,123],[123,116],[116,137],[41,38],[38,72],[72,41],[203,129],[129,142],[142,203],[64,98],[98,240],[240,64],[49,102],[102,64],[64,49],[41,73],[73,74],[74,41],[212,216],[216,207],[207,212],[42,74],[74,184],[184,42],[169,170],[170,211],[211,169],[170,149],[149,176],[176,170],[105,66],[66,69],[69,105],[122,6],[6,168],[168,122],[123,147],[147,187],[187,123],[96,77],[77,90],[90,96],[65,55],[55,107],[107,65],[89,90],[90,180],[180,89],[101,100],[100,120],[120,101],[63,105],[105,104],[104,63],[93,137],[137,227],[227,93],[15,86],[86,85],[85,15],[129,102],[102,49],[49,129],[14,87],[87,86],[86,14],[55,8],[8,9],[9,55],[100,47],[47,121],[121,100],[145,23],[23,22],[22,145],[88,89],[89,179],[179,88],[6,122],[122,196],[196,6],[88,95],[95,96],[96,88],[138,172],[172,136],[136,138],[215,58],[58,172],[172,215],[115,48],[48,219],[219,115],[42,80],[80,81],[81,42],[195,3],[3,51],[51,195],[43,146],[146,61],[61,43],[171,175],[175,199],[199,171],[81,82],[82,38],[38,81],[53,46],[46,225],[225,53],[144,163],[163,110],[110,144],[52,65],[65,66],[66,52],[229,228],[228,117],[117,229],[34,127],[127,234],[234,34],[107,108],[108,69],[69,107],[109,108],[108,151],[151,109],[48,64],[64,235],[235,48],[62,78],[78,191],[191,62],[129,209],[209,126],[126,129],[111,35],[35,143],[143,111],[117,123],[123,50],[50,117],[222,65],[65,52],[52,222],[19,125],[125,141],[141,19],[221,55],[55,65],[65,221],[3,195],[195,197],[197,3],[25,7],[7,33],[33,25],[220,237],[237,44],[44,220],[70,71],[71,139],[139,70],[122,193],[193,245],[245,122],[247,130],[130,33],[33,247],[71,21],[21,162],[162,71],[170,169],[169,150],[150,170],[188,174],[174,196],[196,188],[216,186],[186,92],[92,216],[2,97],[97,167],[167,2],[141,125],[125,241],[241,141],[164,167],[167,37],[37,164],[72,38],[38,12],[12,72],[38,82],[82,13],[13,38],[63,68],[68,71],[71,63],[226,35],[35,111],[111,226],[101,50],[50,205],[205,101],[206,92],[92,165],[165,206],[209,198],[198,217],[217,209],[165,167],[167,97],[97,165],[220,115],[115,218],[218,220],[133,112],[112,243],[243,133],[239,238],[238,241],[241,239],[214,135],[135,169],[169,214],[190,173],[173,133],[133,190],[171,208],[208,32],[32,171],[125,44],[44,237],[237,125],[86,87],[87,178],[178,86],[85,86],[86,179],[179,85],[84,85],[85,180],[180,84],[83,84],[84,181],[181,83],[201,83],[83,182],[182,201],[137,93],[93,132],[132,137],[76,62],[62,183],[183,76],[61,76],[76,184],[184,61],[57,61],[61,185],[185,57],[212,57],[57,186],[186,212],[214,207],[207,187],[187,214],[34,143],[143,156],[156,34],[79,239],[239,237],[237,79],[123,137],[137,177],[177,123],[44,1],[1,4],[4,44],[201,194],[194,32],[32,201],[64,102],[102,129],[129,64],[213,215],[215,138],[138,213],[59,166],[166,219],[219,59],[242,99],[99,97],[97,242],[2,94],[94,141],[141,2],[75,59],[59,235],[235,75],[24,110],[110,228],[228,24],[25,130],[130,226],[226,25],[23,24],[24,229],[229,23],[22,23],[23,230],[230,22],[26,22],[22,231],[231,26],[112,26],[26,232],[232,112],[189,190],[190,243],[243,189],[221,56],[56,190],[190,221],[28,56],[56,221],[221,28],[27,28],[28,222],[222,27],[29,27],[27,223],[223,29],[30,29],[29,224],[224,30],[247,30],[30,225],[225,247],[238,79],[79,20],[20,238],[166,59],[59,75],[75,166],[60,75],[75,240],[240,60],[147,177],[177,215],[215,147],[20,79],[79,166],[166,20],[187,147],[147,213],[213,187],[112,233],[233,244],[244,112],[233,128],[128,245],[245,233],[128,114],[114,188],[188,128],[114,217],[217,174],[174,114],[131,115],[115,220],[220,131],[217,198],[198,236],[236,217],[198,131],[131,134],[134,198],[177,132],[132,58],[58,177],[143,35],[35,124],[124,143],[110,163],[163,7],[7,110],[228,110],[110,25],[25,228],[356,389],[389,368],[368,356],[11,302],[302,267],[267,11],[452,350],[350,349],[349,452],[302,303],[303,269],[269,302],[357,343],[343,277],[277,357],[452,453],[453,357],[357,452],[333,332],[332,297],[297,333],[175,152],[152,377],[377,175],[347,348],[348,330],[330,347],[303,304],[304,270],[270,303],[9,336],[336,337],[337,9],[278,279],[279,360],[360,278],[418,262],[262,431],[431,418],[304,408],[408,409],[409,304],[310,415],[415,407],[407,310],[270,409],[409,410],[410,270],[450,348],[348,347],[347,450],[422,430],[430,434],[434,422],[313,314],[314,17],[17,313],[306,307],[307,375],[375,306],[387,388],[388,260],[260,387],[286,414],[414,398],[398,286],[335,406],[406,418],[418,335],[364,367],[367,416],[416,364],[423,358],[358,327],[327,423],[251,284],[284,298],[298,251],[281,5],[5,4],[4,281],[373,374],[374,253],[253,373],[307,320],[320,321],[321,307],[425,427],[427,411],[411,425],[421,313],[313,18],[18,421],[321,405],[405,406],[406,321],[320,404],[404,405],[405,320],[315,16],[16,17],[17,315],[426,425],[425,266],[266,426],[377,400],[400,369],[369,377],[322,391],[391,269],[269,322],[417,465],[465,464],[464,417],[386,257],[257,258],[258,386],[466,260],[260,388],[388,466],[456,399],[399,419],[419,456],[284,332],[332,333],[333,284],[417,285],[285,8],[8,417],[346,340],[340,261],[261,346],[413,441],[441,285],[285,413],[327,460],[460,328],[328,327],[355,371],[371,329],[329,355],[392,439],[439,438],[438,392],[382,341],[341,256],[256,382],[429,420],[420,360],[360,429],[364,394],[394,379],[379,364],[277,343],[343,437],[437,277],[443,444],[444,283],[283,443],[275,440],[440,363],[363,275],[431,262],[262,369],[369,431],[297,338],[338,337],[337,297],[273,375],[375,321],[321,273],[450,451],[451,349],[349,450],[446,342],[342,467],[467,446],[293,334],[334,282],[282,293],[458,461],[461,462],[462,458],[276,353],[353,383],[383,276],[308,324],[324,325],[325,308],[276,300],[300,293],[293,276],[372,345],[345,447],[447,372],[352,345],[345,340],[340,352],[274,1],[1,19],[19,274],[456,248],[248,281],[281,456],[436,427],[427,425],[425,436],[381,256],[256,252],[252,381],[269,391],[391,393],[393,269],[200,199],[199,428],[428,200],[266,330],[330,329],[329,266],[287,273],[273,422],[422,287],[250,462],[462,328],[328,250],[258,286],[286,384],[384,258],[265,353],[353,342],[342,265],[387,259],[259,257],[257,387],[424,431],[431,430],[430,424],[342,353],[353,276],[276,342],[273,335],[335,424],[424,273],[292,325],[325,307],[307,292],[366,447],[447,345],[345,366],[271,303],[303,302],[302,271],[423,266],[266,371],[371,423],[294,455],[455,460],[460,294],[279,278],[278,294],[294,279],[271,272],[272,304],[304,271],[432,434],[434,427],[427,432],[272,407],[407,408],[408,272],[394,430],[430,431],[431,394],[395,369],[369,400],[400,395],[334,333],[333,299],[299,334],[351,417],[417,168],[168,351],[352,280],[280,411],[411,352],[325,319],[319,320],[320,325],[295,296],[296,336],[336,295],[319,403],[403,404],[404,319],[330,348],[348,349],[349,330],[293,298],[298,333],[333,293],[323,454],[454,447],[447,323],[15,16],[16,315],[315,15],[358,429],[429,279],[279,358],[14,15],[15,316],[316,14],[285,336],[336,9],[9,285],[329,349],[349,350],[350,329],[374,380],[380,252],[252,374],[318,402],[402,403],[403,318],[6,197],[197,419],[419,6],[318,319],[319,325],[325,318],[367,364],[364,365],[365,367],[435,367],[367,397],[397,435],[344,438],[438,439],[439,344],[272,271],[271,311],[311,272],[195,5],[5,281],[281,195],[273,287],[287,291],[291,273],[396,428],[428,199],[199,396],[311,271],[271,268],[268,311],[283,444],[444,445],[445,283],[373,254],[254,339],[339,373],[282,334],[334,296],[296,282],[449,347],[347,346],[346,449],[264,447],[447,454],[454,264],[336,296],[296,299],[299,336],[338,10],[10,151],[151,338],[278,439],[439,455],[455,278],[292,407],[407,415],[415,292],[358,371],[371,355],[355,358],[340,345],[345,372],[372,340],[346,347],[347,280],[280,346],[442,443],[443,282],[282,442],[19,94],[94,370],[370,19],[441,442],[442,295],[295,441],[248,419],[419,197],[197,248],[263,255],[255,359],[359,263],[440,275],[275,274],[274,440],[300,383],[383,368],[368,300],[351,412],[412,465],[465,351],[263,467],[467,466],[466,263],[301,368],[368,389],[389,301],[395,378],[378,379],[379,395],[412,351],[351,419],[419,412],[436,426],[426,322],[322,436],[2,164],[164,393],[393,2],[370,462],[462,461],[461,370],[164,0],[0,267],[267,164],[302,11],[11,12],[12,302],[268,12],[12,13],[13,268],[293,300],[300,301],[301,293],[446,261],[261,340],[340,446],[330,266],[266,425],[425,330],[426,423],[423,391],[391,426],[429,355],[355,437],[437,429],[391,327],[327,326],[326,391],[440,457],[457,438],[438,440],[341,382],[382,362],[362,341],[459,457],[457,461],[461,459],[434,430],[430,394],[394,434],[414,463],[463,362],[362,414],[396,369],[369,262],[262,396],[354,461],[461,457],[457,354],[316,403],[403,402],[402,316],[315,404],[404,403],[403,315],[314,405],[405,404],[404,314],[313,406],[406,405],[405,313],[421,418],[418,406],[406,421],[366,401],[401,361],[361,366],[306,408],[408,407],[407,306],[291,409],[409,408],[408,291],[287,410],[410,409],[409,287],[432,436],[436,410],[410,432],[434,416],[416,411],[411,434],[264,368],[368,383],[383,264],[309,438],[438,457],[457,309],[352,376],[376,401],[401,352],[274,275],[275,4],[4,274],[421,428],[428,262],[262,421],[294,327],[327,358],[358,294],[433,416],[416,367],[367,433],[289,455],[455,439],[439,289],[462,370],[370,326],[326,462],[2,326],[326,370],[370,2],[305,460],[460,455],[455,305],[254,449],[449,448],[448,254],[255,261],[261,446],[446,255],[253,450],[450,449],[449,253],[252,451],[451,450],[450,252],[256,452],[452,451],[451,256],[341,453],[453,452],[452,341],[413,464],[464,463],[463,413],[441,413],[413,414],[414,441],[258,442],[442,441],[441,258],[257,443],[443,442],[442,257],[259,444],[444,443],[443,259],[260,445],[445,444],[444,260],[467,342],[342,445],[445,467],[459,458],[458,250],[250,459],[289,392],[392,290],[290,289],[290,328],[328,460],[460,290],[376,433],[433,435],[435,376],[250,290],[290,392],[392,250],[411,416],[416,433],[433,411],[341,463],[463,464],[464,341],[453,464],[464,465],[465,453],[357,465],[465,412],[412,357],[343,412],[412,399],[399,343],[360,363],[363,440],[440,360],[437,399],[399,456],[456,437],[420,456],[456,363],[363,420],[401,435],[435,288],[288,401],[372,383],[383,353],[353,372],[339,255],[255,249],[249,339],[448,261],[261,255],[255,448],[133,243],[243,190],[190,133],[133,155],[155,112],[112,133],[33,246],[246,247],[247,33],[33,130],[130,25],[25,33],[398,384],[384,286],[286,398],[362,398],[398,414],[414,362],[362,463],[463,341],[341,362],[263,359],[359,467],[467,263],[263,249],[249,255],[255,263],[466,467],[467,260],[260,466],[75,60],[60,166],[166,75],[238,239],[239,79],[79,238],[162,127],[127,139],[139,162],[72,11],[11,37],[37,72],[121,232],[232,120],[120,121],[73,72],[72,39],[39,73],[114,128],[128,47],[47,114],[233,232],[232,128],[128,233],[103,104],[104,67],[67,103],[152,175],[175,148],[148,152],[119,118],[118,101],[101,119],[74,73],[73,40],[40,74],[107,9],[9,108],[108,107],[49,48],[48,131],[131,49],[32,194],[194,211],[211,32],[184,74],[74,185],[185,184],[191,80],[80,183],[183,191],[185,40],[40,186],[186,185],[119,230],[230,118],[118,119],[210,202],[202,214],[214,210],[84,83],[83,17],[17,84],[77,76],[76,146],[146,77],[161,160],[160,30],[30,161],[190,56],[56,173],[173,190],[182,106],[106,194],[194,182],[138,135],[135,192],[192,138],[129,203],[203,98],[98,129],[54,21],[21,68],[68,54],[5,51],[51,4],[4,5],[145,144],[144,23],[23,145],[90,77],[77,91],[91,90],[207,205],[205,187],[187,207],[83,201],[201,18],[18,83],[181,91],[91,182],[182,181],[180,90],[90,181],[181,180],[16,85],[85,17],[17,16],[205,206],[206,36],[36,205],[176,148],[148,140],[140,176],[165,92],[92,39],[39,165],[245,193],[193,244],[244,245],[27,159],[159,28],[28,27],[30,247],[247,161],[161,30],[174,236],[236,196],[196,174],[103,54],[54,104],[104,103],[55,193],[193,8],[8,55],[111,117],[117,31],[31,111],[221,189],[189,55],[55,221],[240,98],[98,99],[99,240],[142,126],[126,100],[100,142],[219,166],[166,218],[218,219],[112,155],[155,26],[26,112],[198,209],[209,131],[131,198],[169,135],[135,150],[150,169],[114,47],[47,217],[217,114],[224,223],[223,53],[53,224],[220,45],[45,134],[134,220],[32,211],[211,140],[140,32],[109,67],[67,108],[108,109],[146,43],[43,91],[91,146],[231,230],[230,120],[120,231],[113,226],[226,247],[247,113],[105,63],[63,52],[52,105],[241,238],[238,242],[242,241],[124,46],[46,156],[156,124],[95,78],[78,96],[96,95],[70,46],[46,63],[63,70],[116,143],[143,227],[227,116],[116,123],[123,111],[111,116],[1,44],[44,19],[19,1],[3,236],[236,51],[51,3],[207,216],[216,205],[205,207],[26,154],[154,22],[22,26],[165,39],[39,167],[167,165],[199,200],[200,208],[208,199],[101,36],[36,100],[100,101],[43,57],[57,202],[202,43],[242,20],[20,99],[99,242],[56,28],[28,157],[157,56],[124,35],[35,113],[113,124],[29,160],[160,27],[27,29],[211,204],[204,210],[210,211],[124,113],[113,46],[46,124],[106,43],[43,204],[204,106],[96,62],[62,77],[77,96],[227,137],[137,116],[116,227],[73,41],[41,72],[72,73],[36,203],[203,142],[142,36],[235,64],[64,240],[240,235],[48,49],[49,64],[64,48],[42,41],[41,74],[74,42],[214,212],[212,207],[207,214],[183,42],[42,184],[184,183],[210,169],[169,211],[211,210],[140,170],[170,176],[176,140],[104,105],[105,69],[69,104],[193,122],[122,168],[168,193],[50,123],[123,187],[187,50],[89,96],[96,90],[90,89],[66,65],[65,107],[107,66],[179,89],[89,180],[180,179],[119,101],[101,120],[120,119],[68,63],[63,104],[104,68],[234,93],[93,227],[227,234],[16,15],[15,85],[85,16],[209,129],[129,49],[49,209],[15,14],[14,86],[86,15],[107,55],[55,9],[9,107],[120,100],[100,121],[121,120],[153,145],[145,22],[22,153],[178,88],[88,179],[179,178],[197,6],[6,196],[196,197],[89,88],[88,96],[96,89],[135,138],[138,136],[136,135],[138,215],[215,172],[172,138],[218,115],[115,219],[219,218],[41,42],[42,81],[81,41],[5,195],[195,51],[51,5],[57,43],[43,61],[61,57],[208,171],[171,199],[199,208],[41,81],[81,38],[38,41],[224,53],[53,225],[225,224],[24,144],[144,110],[110,24],[105,52],[52,66],[66,105],[118,229],[229,117],[117,118],[227,34],[34,234],[234,227],[66,107],[107,69],[69,66],[10,109],[109,151],[151,10],[219,48],[48,235],[235,219],[183,62],[62,191],[191,183],[142,129],[129,126],[126,142],[116,111],[111,143],[143,116],[118,117],[117,50],[50,118],[223,222],[222,52],[52,223],[94,19],[19,141],[141,94],[222,221],[221,65],[65,222],[196,3],[3,197],[197,196],[45,220],[220,44],[44,45],[156,70],[70,139],[139,156],[188,122],[122,245],[245,188],[139,71],[71,162],[162,139],[149,170],[170,150],[150,149],[122,188],[188,196],[196,122],[206,216],[216,92],[92,206],[164,2],[2,167],[167,164],[242,141],[141,241],[241,242],[0,164],[164,37],[37,0],[11,72],[72,12],[12,11],[12,38],[38,13],[13,12],[70,63],[63,71],[71,70],[31,226],[226,111],[111,31],[36,101],[101,205],[205,36],[203,206],[206,165],[165,203],[126,209],[209,217],[217,126],[98,165],[165,97],[97,98],[237,220],[220,218],[218,237],[237,239],[239,241],[241,237],[210,214],[214,169],[169,210],[140,171],[171,32],[32,140],[241,125],[125,237],[237,241],[179,86],[86,178],[178,179],[180,85],[85,179],[179,180],[181,84],[84,180],[180,181],[182,83],[83,181],[181,182],[194,201],[201,182],[182,194],[177,137],[137,132],[132,177],[184,76],[76,183],[183,184],[185,61],[61,184],[184,185],[186,57],[57,185],[185,186],[216,212],[212,186],[186,216],[192,214],[214,187],[187,192],[139,34],[34,156],[156,139],[218,79],[79,237],[237,218],[147,123],[123,177],[177,147],[45,44],[44,4],[4,45],[208,201],[201,32],[32,208],[98,64],[64,129],[129,98],[192,213],[213,138],[138,192],[235,59],[59,219],[219,235],[141,242],[242,97],[97,141],[97,2],[2,141],[141,97],[240,75],[75,235],[235,240],[229,24],[24,228],[228,229],[31,25],[25,226],[226,31],[230,23],[23,229],[229,230],[231,22],[22,230],[230,231],[232,26],[26,231],[231,232],[233,112],[112,232],[232,233],[244,189],[189,243],[243,244],[189,221],[221,190],[190,189],[222,28],[28,221],[221,222],[223,27],[27,222],[222,223],[224,29],[29,223],[223,224],[225,30],[30,224],[224,225],[113,247],[247,225],[225,113],[99,60],[60,240],[240,99],[213,147],[147,215],[215,213],[60,20],[20,166],[166,60],[192,187],[187,213],[213,192],[243,112],[112,244],[244,243],[244,233],[233,245],[245,244],[245,128],[128,188],[188,245],[188,114],[114,174],[174,188],[134,131],[131,220],[220,134],[174,217],[217,236],[236,174],[236,198],[198,134],[134,236],[215,177],[177,58],[58,215],[156,143],[143,124],[124,156],[25,110],[110,7],[7,25],[31,228],[228,25],[25,31],[264,356],[356,368],[368,264],[0,11],[11,267],[267,0],[451,452],[452,349],[349,451],[267,302],[302,269],[269,267],[350,357],[357,277],[277,350],[350,452],[452,357],[357,350],[299,333],[333,297],[297,299],[396,175],[175,377],[377,396],[280,347],[347,330],[330,280],[269,303],[303,270],[270,269],[151,9],[9,337],[337,151],[344,278],[278,360],[360,344],[424,418],[418,431],[431,424],[270,304],[304,409],[409,270],[272,310],[310,407],[407,272],[322,270],[270,410],[410,322],[449,450],[450,347],[347,449],[432,422],[422,434],[434,432],[18,313],[313,17],[17,18],[291,306],[306,375],[375,291],[259,387],[387,260],[260,259],[424,335],[335,418],[418,424],[434,364],[364,416],[416,434],[391,423],[423,327],[327,391],[301,251],[251,298],[298,301],[275,281],[281,4],[4,275],[254,373],[373,253],[253,254],[375,307],[307,321],[321,375],[280,425],[425,411],[411,280],[200,421],[421,18],[18,200],[335,321],[321,406],[406,335],[321,320],[320,405],[405,321],[314,315],[315,17],[17,314],[423,426],[426,266],[266,423],[396,377],[377,369],[369,396],[270,322],[322,269],[269,270],[413,417],[417,464],[464,413],[385,386],[386,258],[258,385],[248,456],[456,419],[419,248],[298,284],[284,333],[333,298],[168,417],[417,8],[8,168],[448,346],[346,261],[261,448],[417,413],[413,285],[285,417],[326,327],[327,328],[328,326],[277,355],[355,329],[329,277],[309,392],[392,438],[438,309],[381,382],[382,256],[256,381],[279,429],[429,360],[360,279],[365,364],[364,379],[379,365],[355,277],[277,437],[437,355],[282,443],[443,283],[283,282],[281,275],[275,363],[363,281],[395,431],[431,369],[369,395],[299,297],[297,337],[337,299],[335,273],[273,321],[321,335],[348,450],[450,349],[349,348],[359,446],[446,467],[467,359],[283,293],[293,282],[282,283],[250,458],[458,462],[462,250],[300,276],[276,383],[383,300],[292,308],[308,325],[325,292],[283,276],[276,293],[293,283],[264,372],[372,447],[447,264],[346,352],[352,340],[340,346],[354,274],[274,19],[19,354],[363,456],[456,281],[281,363],[426,436],[436,425],[425,426],[380,381],[381,252],[252,380],[267,269],[269,393],[393,267],[421,200],[200,428],[428,421],[371,266],[266,329],[329,371],[432,287],[287,422],[422,432],[290,250],[250,328],[328,290],[385,258],[258,384],[384,385],[446,265],[265,342],[342,446],[386,387],[387,257],[257,386],[422,424],[424,430],[430,422],[445,342],[342,276],[276,445],[422,273],[273,424],[424,422],[306,292],[292,307],[307,306],[352,366],[366,345],[345,352],[268,271],[271,302],[302,268],[358,423],[423,371],[371,358],[327,294],[294,460],[460,327],[331,279],[279,294],[294,331],[303,271],[271,304],[304,303],[436,432],[432,427],[427,436],[304,272],[272,408],[408,304],[395,394],[394,431],[431,395],[378,395],[395,400],[400,378],[296,334],[334,299],[299,296],[6,351],[351,168],[168,6],[376,352],[352,411],[411,376],[307,325],[325,320],[320,307],[285,295],[295,336],[336,285],[320,319],[319,404],[404,320],[329,330],[330,349],[349,329],[334,293],[293,333],[333,334],[366,323],[323,447],[447,366],[316,15],[15,315],[315,316],[331,358],[358,279],[279,331],[317,14],[14,316],[316,317],[8,285],[285,9],[9,8],[277,329],[329,350],[350,277],[253,374],[374,252],[252,253],[319,318],[318,403],[403,319],[351,6],[6,419],[419,351],[324,318],[318,325],[325,324],[397,367],[367,365],[365,397],[288,435],[435,397],[397,288],[278,344],[344,439],[439,278],[310,272],[272,311],[311,310],[248,195],[195,281],[281,248],[375,273],[273,291],[291,375],[175,396],[396,199],[199,175],[312,311],[311,268],[268,312],[276,283],[283,445],[445,276],[390,373],[373,339],[339,390],[295,282],[282,296],[296,295],[448,449],[449,346],[346,448],[356,264],[264,454],[454,356],[337,336],[336,299],[299,337],[337,338],[338,151],[151,337],[294,278],[278,455],[455,294],[308,292],[292,415],[415,308],[429,358],[358,355],[355,429],[265,340],[340,372],[372,265],[352,346],[346,280],[280,352],[295,442],[442,282],[282,295],[354,19],[19,370],[370,354],[285,441],[441,295],[295,285],[195,248],[248,197],[197,195],[457,440],[440,274],[274,457],[301,300],[300,368],[368,301],[417,351],[351,465],[465,417],[251,301],[301,389],[389,251],[394,395],[395,379],[379,394],[399,412],[412,419],[419,399],[410,436],[436,322],[322,410],[326,2],[2,393],[393,326],[354,370],[370,461],[461,354],[393,164],[164,267],[267,393],[268,302],[302,12],[12,268],[312,268],[268,13],[13,312],[298,293],[293,301],[301,298],[265,446],[446,340],[340,265],[280,330],[330,425],[425,280],[322,426],[426,391],[391,322],[420,429],[429,437],[437,420],[393,391],[391,326],[326,393],[344,440],[440,438],[438,344],[458,459],[459,461],[461,458],[364,434],[434,394],[394,364],[428,396],[396,262],[262,428],[274,354],[354,457],[457,274],[317,316],[316,402],[402,317],[316,315],[315,403],[403,316],[315,314],[314,404],[404,315],[314,313],[313,405],[405,314],[313,421],[421,406],[406,313],[323,366],[366,361],[361,323],[292,306],[306,407],[407,292],[306,291],[291,408],[408,306],[291,287],[287,409],[409,291],[287,432],[432,410],[410,287],[427,434],[434,411],[411,427],[372,264],[264,383],[383,372],[459,309],[309,457],[457,459],[366,352],[352,401],[401,366],[1,274],[274,4],[4,1],[418,421],[421,262],[262,418],[331,294],[294,358],[358,331],[435,433],[433,367],[367,435],[392,289],[289,439],[439,392],[328,462],[462,326],[326,328],[94,2],[2,370],[370,94],[289,305],[305,455],[455,289],[339,254],[254,448],[448,339],[359,255],[255,446],[446,359],[254,253],[253,449],[449,254],[253,252],[252,450],[450,253],[252,256],[256,451],[451,252],[256,341],[341,452],[452,256],[414,413],[413,463],[463,414],[286,441],[441,414],[414,286],[286,258],[258,441],[441,286],[258,257],[257,442],[442,258],[257,259],[259,443],[443,257],[259,260],[260,444],[444,259],[260,467],[467,445],[445,260],[309,459],[459,250],[250,309],[305,289],[289,290],[290,305],[305,290],[290,460],[460,305],[401,376],[376,435],[435,401],[309,250],[250,392],[392,309],[376,411],[411,433],[433,376],[453,341],[341,464],[464,453],[357,453],[453,465],[465,357],[343,357],[357,412],[412,343],[437,343],[343,399],[399,437],[344,360],[360,440],[440,344],[420,437],[437,456],[456,420],[360,420],[420,363],[363,360],[361,401],[401,288],[288,361],[265,372],[372,353],[353,265],[390,339],[339,249],[249,390],[339,448],[448,255],[255,339]);function om(t){t.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]}}var St=class extends Fn{constructor(t,e){super(new ai(t,e),"image_in","norm_rect",!1),this.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]},this.outputFacialTransformationMatrixes=this.outputFaceBlendshapes=!1,Ie(t=this.h=new Og,0,1,e=new Ct),this.A=new Ng,Ie(this.h,0,3,this.A),this.u=new il,Ie(this.h,0,2,this.u),ts(this.u,4,1),Ce(this.u,2,.5),Ce(this.A,2,.5),Ce(this.h,4,.5)}get baseOptions(){return tt(this.h,Ct,1)}set baseOptions(t){Ie(this.h,0,1,t)}o(t){return"numFaces"in t&&ts(this.u,4,t.numFaces??1),"minFaceDetectionConfidence"in t&&Ce(this.u,2,t.minFaceDetectionConfidence??.5),"minTrackingConfidence"in t&&Ce(this.h,4,t.minTrackingConfidence??.5),"minFacePresenceConfidence"in t&&Ce(this.A,2,t.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in t&&(this.outputFaceBlendshapes=!!t.outputFaceBlendshapes),"outputFacialTransformationMatrixes"in t&&(this.outputFacialTransformationMatrixes=!!t.outputFacialTransformationMatrixes),this.l(t)}F(t,e){return om(this),oi(this,t,e),this.j}G(t,e,n){return om(this),Di(this,t,n,e),this.j}m(){var t=new On;At(t,"image_in"),At(t,"norm_rect"),nt(t,"face_landmarks");const e=new Nn;Li(e,Oy,this.h);const n=new yn;Un(n,2,"mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"),Mt(n,"IMAGE:image_in"),Mt(n,"NORM_RECT:norm_rect"),je(n,"NORM_LANDMARKS:face_landmarks"),n.o(e),$n(t,n),this.g.attachProtoVectorListener("face_landmarks",(i,s)=>{for(const r of i)i=go(r),this.j.faceLandmarks.push(sl(i));me(this,s)}),this.g.attachEmptyPacketListener("face_landmarks",i=>{me(this,i)}),this.outputFaceBlendshapes&&(nt(t,"blendshapes"),je(n,"BLENDSHAPES:blendshapes"),this.g.attachProtoVectorListener("blendshapes",(i,s)=>{if(this.outputFaceBlendshapes)for(const r of i)i=nl(r),this.j.faceBlendshapes.push(Ld(i.g()??[]));me(this,s)}),this.g.attachEmptyPacketListener("blendshapes",i=>{me(this,i)})),this.outputFacialTransformationMatrixes&&(nt(t,"face_geometry"),je(n,"FACE_GEOMETRY:face_geometry"),this.g.attachProtoVectorListener("face_geometry",(i,s)=>{if(this.outputFacialTransformationMatrixes)for(const r of i)(i=tt(i=Ny(r),wy,2))&&this.j.facialTransformationMatrixes.push({rows:Xn(i,1)??0??0,columns:Xn(i,2)??0??0,data:$s(i,3,Mi,qs()).slice()??[]});me(this,s)}),this.g.attachEmptyPacketListener("face_geometry",i=>{me(this,i)})),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};St.prototype.detectForVideo=St.prototype.G,St.prototype.detect=St.prototype.F,St.prototype.setOptions=St.prototype.o,St.createFromModelPath=function(t,e){return Je(St,t,{baseOptions:{modelAssetPath:e}})},St.createFromModelBuffer=function(t,e){return Je(St,t,{baseOptions:{modelAssetBuffer:e}})},St.createFromOptions=function(t,e){return Je(St,t,e)},St.FACE_LANDMARKS_LIPS=Ud,St.FACE_LANDMARKS_LEFT_EYE=Fd,St.FACE_LANDMARKS_LEFT_EYEBROW=Nd,St.FACE_LANDMARKS_LEFT_IRIS=d_,St.FACE_LANDMARKS_RIGHT_EYE=Od,St.FACE_LANDMARKS_RIGHT_EYEBROW=Bd,St.FACE_LANDMARKS_RIGHT_IRIS=f_,St.FACE_LANDMARKS_FACE_OVAL=kd,St.FACE_LANDMARKS_CONTOURS=p_,St.FACE_LANDMARKS_TESSELATION=m_;var zd=ri([0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]);function cm(t){t.gestures=[],t.landmarks=[],t.worldLandmarks=[],t.handedness=[]}function lm(t){return t.gestures.length===0?{gestures:[],landmarks:[],worldLandmarks:[],handedness:[],handednesses:[]}:{gestures:t.gestures,landmarks:t.landmarks,worldLandmarks:t.worldLandmarks,handedness:t.handedness,handednesses:t.handedness}}function hm(t,e=!0){const n=[];for(const s of t){var i=nl(s);t=[];for(const r of i.g())i=e&&Xn(r,1)!=null?Xn(r,1)??0:-1,t.push({score:It(r,2)??0,index:i,categoryName:en(Et(r,3))??""??"",displayName:en(Et(r,4))??""??""});n.push(t)}return n}var xn=class extends Fn{constructor(t,e){super(new ai(t,e),"image_in","norm_rect",!1),this.gestures=[],this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Ie(t=this.j=new zg,0,1,e=new Ct),this.u=new wd,Ie(this.j,0,2,this.u),this.D=new Ad,Ie(this.u,0,3,this.D),this.A=new kg,Ie(this.u,0,2,this.A),this.h=new By,Ie(this.j,0,3,this.h),Ce(this.A,2,.5),Ce(this.u,4,.5),Ce(this.D,2,.5)}get baseOptions(){return tt(this.j,Ct,1)}set baseOptions(t){Ie(this.j,0,1,t)}o(t){var s,r,a,o;if(ts(this.A,3,t.numHands??1),"minHandDetectionConfidence"in t&&Ce(this.A,2,t.minHandDetectionConfidence??.5),"minTrackingConfidence"in t&&Ce(this.u,4,t.minTrackingConfidence??.5),"minHandPresenceConfidence"in t&&Ce(this.D,2,t.minHandPresenceConfidence??.5),t.cannedGesturesClassifierOptions){var e=new Rr,n=e,i=mu(t.cannedGesturesClassifierOptions,(s=tt(this.h,Rr,3))==null?void 0:s.l());Ie(n,0,2,i),Ie(this.h,0,3,e)}else t.cannedGesturesClassifierOptions===void 0&&((r=tt(this.h,Rr,3))==null||r.g());return t.customGesturesClassifierOptions?(Ie(n=e=new Rr,0,2,i=mu(t.customGesturesClassifierOptions,(a=tt(this.h,Rr,4))==null?void 0:a.l())),Ie(this.h,0,4,e)):t.customGesturesClassifierOptions===void 0&&((o=tt(this.h,Rr,4))==null||o.g()),this.l(t)}Ha(t,e){return cm(this),oi(this,t,e),lm(this)}Ia(t,e,n){return cm(this),Di(this,t,n,e),lm(this)}m(){var t=new On;At(t,"image_in"),At(t,"norm_rect"),nt(t,"hand_gestures"),nt(t,"hand_landmarks"),nt(t,"world_hand_landmarks"),nt(t,"handedness");const e=new Nn;Li(e,ky,this.j);const n=new yn;Un(n,2,"mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"),Mt(n,"IMAGE:image_in"),Mt(n,"NORM_RECT:norm_rect"),je(n,"HAND_GESTURES:hand_gestures"),je(n,"LANDMARKS:hand_landmarks"),je(n,"WORLD_LANDMARKS:world_hand_landmarks"),je(n,"HANDEDNESS:handedness"),n.o(e),$n(t,n),this.g.attachProtoVectorListener("hand_landmarks",(i,s)=>{for(const r of i){i=go(r);const a=[];for(const o of es(i,Lg,1))a.push({x:It(o,1)??0,y:It(o,2)??0,z:It(o,3)??0,visibility:It(o,4)??0});this.landmarks.push(a)}me(this,s)}),this.g.attachEmptyPacketListener("hand_landmarks",i=>{me(this,i)}),this.g.attachProtoVectorListener("world_hand_landmarks",(i,s)=>{for(const r of i){i=Or(r);const a=[];for(const o of es(i,Pg,1))a.push({x:It(o,1)??0,y:It(o,2)??0,z:It(o,3)??0,visibility:It(o,4)??0});this.worldLandmarks.push(a)}me(this,s)}),this.g.attachEmptyPacketListener("world_hand_landmarks",i=>{me(this,i)}),this.g.attachProtoVectorListener("hand_gestures",(i,s)=>{this.gestures.push(...hm(i,!1)),me(this,s)}),this.g.attachEmptyPacketListener("hand_gestures",i=>{me(this,i)}),this.g.attachProtoVectorListener("handedness",(i,s)=>{this.handedness.push(...hm(i)),me(this,s)}),this.g.attachEmptyPacketListener("handedness",i=>{me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};function um(t){return{landmarks:t.landmarks,worldLandmarks:t.worldLandmarks,handednesses:t.handedness,handedness:t.handedness}}xn.prototype.recognizeForVideo=xn.prototype.Ia,xn.prototype.recognize=xn.prototype.Ha,xn.prototype.setOptions=xn.prototype.o,xn.createFromModelPath=function(t,e){return Je(xn,t,{baseOptions:{modelAssetPath:e}})},xn.createFromModelBuffer=function(t,e){return Je(xn,t,{baseOptions:{modelAssetBuffer:e}})},xn.createFromOptions=function(t,e){return Je(xn,t,e)},xn.HAND_CONNECTIONS=zd;var An=class extends Fn{constructor(t,e){super(new ai(t,e),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Ie(t=this.h=new wd,0,1,e=new Ct),this.u=new Ad,Ie(this.h,0,3,this.u),this.j=new kg,Ie(this.h,0,2,this.j),ts(this.j,3,1),Ce(this.j,2,.5),Ce(this.u,2,.5),Ce(this.h,4,.5)}get baseOptions(){return tt(this.h,Ct,1)}set baseOptions(t){Ie(this.h,0,1,t)}o(t){return"numHands"in t&&ts(this.j,3,t.numHands??1),"minHandDetectionConfidence"in t&&Ce(this.j,2,t.minHandDetectionConfidence??.5),"minTrackingConfidence"in t&&Ce(this.h,4,t.minTrackingConfidence??.5),"minHandPresenceConfidence"in t&&Ce(this.u,2,t.minHandPresenceConfidence??.5),this.l(t)}F(t,e){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],oi(this,t,e),um(this)}G(t,e,n){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Di(this,t,n,e),um(this)}m(){var t=new On;At(t,"image_in"),At(t,"norm_rect"),nt(t,"hand_landmarks"),nt(t,"world_hand_landmarks"),nt(t,"handedness");const e=new Nn;Li(e,zy,this.h);const n=new yn;Un(n,2,"mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"),Mt(n,"IMAGE:image_in"),Mt(n,"NORM_RECT:norm_rect"),je(n,"LANDMARKS:hand_landmarks"),je(n,"WORLD_LANDMARKS:world_hand_landmarks"),je(n,"HANDEDNESS:handedness"),n.o(e),$n(t,n),this.g.attachProtoVectorListener("hand_landmarks",(i,s)=>{for(const r of i)i=go(r),this.landmarks.push(sl(i));me(this,s)}),this.g.attachEmptyPacketListener("hand_landmarks",i=>{me(this,i)}),this.g.attachProtoVectorListener("world_hand_landmarks",(i,s)=>{for(const r of i)i=Or(r),this.worldLandmarks.push(Ga(i));me(this,s)}),this.g.attachEmptyPacketListener("world_hand_landmarks",i=>{me(this,i)}),this.g.attachProtoVectorListener("handedness",(i,s)=>{var r=this.handedness,a=r.push;const o=[];for(const c of i){i=nl(c);const l=[];for(const h of i.g())l.push({score:It(h,2)??0,index:Xn(h,1)??0??-1,categoryName:en(Et(h,3))??""??"",displayName:en(Et(h,4))??""??""});o.push(l)}a.call(r,...o),me(this,s)}),this.g.attachEmptyPacketListener("handedness",i=>{me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};An.prototype.detectForVideo=An.prototype.G,An.prototype.detect=An.prototype.F,An.prototype.setOptions=An.prototype.o,An.createFromModelPath=function(t,e){return Je(An,t,{baseOptions:{modelAssetPath:e}})},An.createFromModelBuffer=function(t,e){return Je(An,t,{baseOptions:{modelAssetBuffer:e}})},An.createFromOptions=function(t,e){return Je(An,t,e)},An.HAND_CONNECTIONS=zd;var g_=ri([0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]);function dm(t){t.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]}}function fm(t){try{if(!t.D)return t.h;t.D(t.h)}finally{al(t)}}function Qo(t,e){t=go(t),e.push(sl(t))}var vt=class extends Fn{constructor(t,e){super(new ai(t,e),"input_frames_image",null,!1),this.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]},this.outputPoseSegmentationMasks=this.outputFaceBlendshapes=!1,Ie(t=this.j=new Xg,0,1,e=new Ct),this.I=new Ad,Ie(this.j,0,2,this.I),this.W=new Vy,Ie(this.j,0,3,this.W),this.u=new il,Ie(this.j,0,4,this.u),this.O=new Ng,Ie(this.j,0,5,this.O),this.A=new Gg,Ie(this.j,0,6,this.A),this.M=new Wg,Ie(this.j,0,7,this.M),Ce(this.u,2,.5),Ce(this.u,3,.3),Ce(this.O,2,.5),Ce(this.A,2,.5),Ce(this.A,3,.3),Ce(this.M,2,.5),Ce(this.I,2,.5)}get baseOptions(){return tt(this.j,Ct,1)}set baseOptions(t){Ie(this.j,0,1,t)}o(t){return"minFaceDetectionConfidence"in t&&Ce(this.u,2,t.minFaceDetectionConfidence??.5),"minFaceSuppressionThreshold"in t&&Ce(this.u,3,t.minFaceSuppressionThreshold??.3),"minFacePresenceConfidence"in t&&Ce(this.O,2,t.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in t&&(this.outputFaceBlendshapes=!!t.outputFaceBlendshapes),"minPoseDetectionConfidence"in t&&Ce(this.A,2,t.minPoseDetectionConfidence??.5),"minPoseSuppressionThreshold"in t&&Ce(this.A,3,t.minPoseSuppressionThreshold??.3),"minPosePresenceConfidence"in t&&Ce(this.M,2,t.minPosePresenceConfidence??.5),"outputPoseSegmentationMasks"in t&&(this.outputPoseSegmentationMasks=!!t.outputPoseSegmentationMasks),"minHandLandmarksConfidence"in t&&Ce(this.I,2,t.minHandLandmarksConfidence??.5),this.l(t)}F(t,e,n){const i=typeof e!="function"?e:{};return this.D=typeof e=="function"?e:n,dm(this),oi(this,t,i),fm(this)}G(t,e,n,i){const s=typeof n!="function"?n:{};return this.D=typeof n=="function"?n:i,dm(this),Di(this,t,s,e),fm(this)}m(){var t=new On;At(t,"input_frames_image"),nt(t,"pose_landmarks"),nt(t,"pose_world_landmarks"),nt(t,"face_landmarks"),nt(t,"left_hand_landmarks"),nt(t,"left_hand_world_landmarks"),nt(t,"right_hand_landmarks"),nt(t,"right_hand_world_landmarks");const e=new Nn,n=new Op;Un(n,1,"type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"),function(s,r){if(r!=null)if(Array.isArray(r))ht(s,2,Wc(r,0,Za));else{if(!(typeof r=="string"||r instanceof Ei||Yu(r)))throw Error("invalid value in Any.value field: "+r+" expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");fs(s,2,$u(r,!1),rr())}}(n,this.j.g());const i=new yn;Un(i,2,"mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"),cd(i,8,Op,n),Mt(i,"IMAGE:input_frames_image"),je(i,"POSE_LANDMARKS:pose_landmarks"),je(i,"POSE_WORLD_LANDMARKS:pose_world_landmarks"),je(i,"FACE_LANDMARKS:face_landmarks"),je(i,"LEFT_HAND_LANDMARKS:left_hand_landmarks"),je(i,"LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"),je(i,"RIGHT_HAND_LANDMARKS:right_hand_landmarks"),je(i,"RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"),i.o(e),$n(t,i),rl(this,t),this.g.attachProtoListener("pose_landmarks",(s,r)=>{Qo(s,this.h.poseLandmarks),me(this,r)}),this.g.attachEmptyPacketListener("pose_landmarks",s=>{me(this,s)}),this.g.attachProtoListener("pose_world_landmarks",(s,r)=>{var a=this.h.poseWorldLandmarks;s=Or(s),a.push(Ga(s)),me(this,r)}),this.g.attachEmptyPacketListener("pose_world_landmarks",s=>{me(this,s)}),this.outputPoseSegmentationMasks&&(je(i,"POSE_SEGMENTATION_MASK:pose_segmentation_mask"),Qr(this,"pose_segmentation_mask"),this.g.Z("pose_segmentation_mask",(s,r)=>{this.h.poseSegmentationMasks=[ta(this,s,!0,!this.D)],me(this,r)}),this.g.attachEmptyPacketListener("pose_segmentation_mask",s=>{this.h.poseSegmentationMasks=[],me(this,s)})),this.g.attachProtoListener("face_landmarks",(s,r)=>{Qo(s,this.h.faceLandmarks),me(this,r)}),this.g.attachEmptyPacketListener("face_landmarks",s=>{me(this,s)}),this.outputFaceBlendshapes&&(nt(t,"extra_blendshapes"),je(i,"FACE_BLENDSHAPES:extra_blendshapes"),this.g.attachProtoListener("extra_blendshapes",(s,r)=>{var a=this.h.faceBlendshapes;this.outputFaceBlendshapes&&(s=nl(s),a.push(Ld(s.g()??[]))),me(this,r)}),this.g.attachEmptyPacketListener("extra_blendshapes",s=>{me(this,s)})),this.g.attachProtoListener("left_hand_landmarks",(s,r)=>{Qo(s,this.h.leftHandLandmarks),me(this,r)}),this.g.attachEmptyPacketListener("left_hand_landmarks",s=>{me(this,s)}),this.g.attachProtoListener("left_hand_world_landmarks",(s,r)=>{var a=this.h.leftHandWorldLandmarks;s=Or(s),a.push(Ga(s)),me(this,r)}),this.g.attachEmptyPacketListener("left_hand_world_landmarks",s=>{me(this,s)}),this.g.attachProtoListener("right_hand_landmarks",(s,r)=>{Qo(s,this.h.rightHandLandmarks),me(this,r)}),this.g.attachEmptyPacketListener("right_hand_landmarks",s=>{me(this,s)}),this.g.attachProtoListener("right_hand_world_landmarks",(s,r)=>{var a=this.h.rightHandWorldLandmarks;s=Or(s),a.push(Ga(s)),me(this,r)}),this.g.attachEmptyPacketListener("right_hand_world_landmarks",s=>{me(this,s)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};vt.prototype.detectForVideo=vt.prototype.G,vt.prototype.detect=vt.prototype.F,vt.prototype.setOptions=vt.prototype.o,vt.createFromModelPath=function(t,e){return Je(vt,t,{baseOptions:{modelAssetPath:e}})},vt.createFromModelBuffer=function(t,e){return Je(vt,t,{baseOptions:{modelAssetBuffer:e}})},vt.createFromOptions=function(t,e){return Je(vt,t,e)},vt.HAND_CONNECTIONS=zd,vt.POSE_CONNECTIONS=g_,vt.FACE_LANDMARKS_LIPS=Ud,vt.FACE_LANDMARKS_LEFT_EYE=Fd,vt.FACE_LANDMARKS_LEFT_EYEBROW=Nd,vt.FACE_LANDMARKS_LEFT_IRIS=d_,vt.FACE_LANDMARKS_RIGHT_EYE=Od,vt.FACE_LANDMARKS_RIGHT_EYEBROW=Bd,vt.FACE_LANDMARKS_RIGHT_IRIS=f_,vt.FACE_LANDMARKS_FACE_OVAL=kd,vt.FACE_LANDMARKS_CONTOURS=p_,vt.FACE_LANDMARKS_TESSELATION=m_;var Vn=class extends Fn{constructor(t,e){super(new ai(t,e),"input_image","norm_rect",!0),this.j={classifications:[]},Ie(t=this.h=new Yg,0,1,e=new Ct)}get baseOptions(){return tt(this.h,Ct,1)}set baseOptions(t){Ie(this.h,0,1,t)}o(t){return Ie(this.h,0,2,mu(t,tt(this.h,bd,2))),this.l(t)}sa(t,e){return this.j={classifications:[]},oi(this,t,e),this.j}ta(t,e,n){return this.j={classifications:[]},Di(this,t,n,e),this.j}m(){var t=new On;At(t,"input_image"),At(t,"norm_rect"),nt(t,"classifications");const e=new Nn;Li(e,Hy,this.h);const n=new yn;Un(n,2,"mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"),Mt(n,"IMAGE:input_image"),Mt(n,"NORM_RECT:norm_rect"),je(n,"CLASSIFICATIONS:classifications"),n.o(e),$n(t,n),this.g.attachProtoListener("classifications",(i,s)=>{this.j=$y(Py(i)),me(this,s)}),this.g.attachEmptyPacketListener("classifications",i=>{me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};Vn.prototype.classifyForVideo=Vn.prototype.ta,Vn.prototype.classify=Vn.prototype.sa,Vn.prototype.setOptions=Vn.prototype.o,Vn.createFromModelPath=function(t,e){return Je(Vn,t,{baseOptions:{modelAssetPath:e}})},Vn.createFromModelBuffer=function(t,e){return Je(Vn,t,{baseOptions:{modelAssetBuffer:e}})},Vn.createFromOptions=function(t,e){return Je(Vn,t,e)};var wn=class extends Fn{constructor(t,e){super(new ai(t,e),"image_in","norm_rect",!0),this.h=new qg,this.embeddings={embeddings:[]},Ie(t=this.h,0,1,e=new Ct)}get baseOptions(){return tt(this.h,Ct,1)}set baseOptions(t){Ie(this.h,0,1,t)}o(t){var e=this.h,n=tt(this.h,Yp,2);return n=n?n.clone():new Yp,t.l2Normalize!==void 0?ht(n,1,Ka(t.l2Normalize)):"l2Normalize"in t&&ht(n,1),t.quantize!==void 0?ht(n,2,Ka(t.quantize)):"quantize"in t&&ht(n,2),Ie(e,0,2,n),this.l(t)}za(t,e){return oi(this,t,e),this.embeddings}Aa(t,e,n){return Di(this,t,n,e),this.embeddings}m(){var t=new On;At(t,"image_in"),At(t,"norm_rect"),nt(t,"embeddings_out");const e=new Nn;Li(e,Gy,this.h);const n=new yn;Un(n,2,"mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"),Mt(n,"IMAGE:image_in"),Mt(n,"NORM_RECT:norm_rect"),je(n,"EMBEDDINGS:embeddings_out"),n.o(e),$n(t,n),this.g.attachProtoListener("embeddings_out",(i,s)=>{i=Dy(i),this.embeddings=function(r){return{embeddings:es(r,Iy,1).map(a=>{var l,h;const o={headIndex:Xn(a,3)??0??-1,headName:en(Et(a,4))??""??""};var c=a.v;return W0(c,0|c[be],Xp,Ql(a,1))!==void 0?(a=$s(a=tt(a,Xp,Ql(a,1),void 0),1,Mi,qs()),o.floatEmbedding=a.slice()):(c=new Uint8Array(0),o.quantizedEmbedding=((h=(l=tt(a,Ly,Ql(a,2),void 0))==null?void 0:l.na())==null?void 0:h.h())??c),o}),timestampMs:e_(Et(r,2,void 0,void 0,wc)??k0)}}(i),me(this,s)}),this.g.attachEmptyPacketListener("embeddings_out",i=>{me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};wn.cosineSimilarity=function(t,e){if(t.floatEmbedding&&e.floatEmbedding)t=Jp(t.floatEmbedding,e.floatEmbedding);else{if(!t.quantizedEmbedding||!e.quantizedEmbedding)throw Error("Cannot compute cosine similarity between quantized and float embeddings.");t=Jp(Zp(t.quantizedEmbedding),Zp(e.quantizedEmbedding))}return t},wn.prototype.embedForVideo=wn.prototype.Aa,wn.prototype.embed=wn.prototype.za,wn.prototype.setOptions=wn.prototype.o,wn.createFromModelPath=function(t,e){return Je(wn,t,{baseOptions:{modelAssetPath:e}})},wn.createFromModelBuffer=function(t,e){return Je(wn,t,{baseOptions:{modelAssetBuffer:e}})},wn.createFromOptions=function(t,e){return Je(wn,t,e)};var xu=class{constructor(t,e,n){this.confidenceMasks=t,this.categoryMask=e,this.qualityScores=n}close(){var t,e;(t=this.confidenceMasks)==null||t.forEach(n=>{n.close()}),(e=this.categoryMask)==null||e.close()}};function tE(t){var n,i;const e=function(s){return es(s,yn,1)}(t.ca()).filter(s=>(en(Et(s,1))??"").includes("mediapipe.tasks.TensorsToSegmentationCalculator"));if(t.u=[],e.length>1)throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");e.length===1&&(((i=(n=tt(e[0],Nn,7))==null?void 0:n.j())==null?void 0:i.g())??new Map).forEach((s,r)=>{t.u[Number(r)]=en(Et(s,1))??""})}function pm(t){t.categoryMask=void 0,t.confidenceMasks=void 0,t.qualityScores=void 0}function mm(t){try{const e=new xu(t.confidenceMasks,t.categoryMask,t.qualityScores);if(!t.j)return e;t.j(e)}finally{al(t)}}xu.prototype.close=xu.prototype.close;var vn=class extends Fn{constructor(t,e){super(new ai(t,e),"image_in","norm_rect",!1),this.u=[],this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new Pd,this.A=new $g,Ie(this.h,0,3,this.A),Ie(t=this.h,0,1,e=new Ct)}get baseOptions(){return tt(this.h,Ct,1)}set baseOptions(t){Ie(this.h,0,1,t)}o(t){return t.displayNamesLocale!==void 0?ht(this.h,2,fo(t.displayNamesLocale)):"displayNamesLocale"in t&&ht(this.h,2),"outputCategoryMask"in t&&(this.outputCategoryMask=t.outputCategoryMask??!1),"outputConfidenceMasks"in t&&(this.outputConfidenceMasks=t.outputConfidenceMasks??!0),super.l(t)}L(){tE(this)}segment(t,e,n){const i=typeof e!="function"?e:{};return this.j=typeof e=="function"?e:n,pm(this),oi(this,t,i),mm(this)}La(t,e,n,i){const s=typeof n!="function"?n:{};return this.j=typeof n=="function"?n:i,pm(this),Di(this,t,s,e),mm(this)}Da(){return this.u}m(){var t=new On;At(t,"image_in"),At(t,"norm_rect");const e=new Nn;Li(e,Kg,this.h);const n=new yn;Un(n,2,"mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"),Mt(n,"IMAGE:image_in"),Mt(n,"NORM_RECT:norm_rect"),n.o(e),$n(t,n),rl(this,t),this.outputConfidenceMasks&&(nt(t,"confidence_masks"),je(n,"CONFIDENCE_MASKS:confidence_masks"),Qr(this,"confidence_masks"),this.g.aa("confidence_masks",(i,s)=>{this.confidenceMasks=i.map(r=>ta(this,r,!0,!this.j)),me(this,s)}),this.g.attachEmptyPacketListener("confidence_masks",i=>{this.confidenceMasks=[],me(this,i)})),this.outputCategoryMask&&(nt(t,"category_mask"),je(n,"CATEGORY_MASK:category_mask"),Qr(this,"category_mask"),this.g.Z("category_mask",(i,s)=>{this.categoryMask=ta(this,i,!1,!this.j),me(this,s)}),this.g.attachEmptyPacketListener("category_mask",i=>{this.categoryMask=void 0,me(this,i)})),nt(t,"quality_scores"),je(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",(i,s)=>{this.qualityScores=i,me(this,s)}),this.g.attachEmptyPacketListener("quality_scores",i=>{this.categoryMask=void 0,me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};vn.prototype.getLabels=vn.prototype.Da,vn.prototype.segmentForVideo=vn.prototype.La,vn.prototype.segment=vn.prototype.segment,vn.prototype.setOptions=vn.prototype.o,vn.createFromModelPath=function(t,e){return Je(vn,t,{baseOptions:{modelAssetPath:e}})},vn.createFromModelBuffer=function(t,e){return Je(vn,t,{baseOptions:{modelAssetBuffer:e}})},vn.createFromOptions=function(t,e){return Je(vn,t,e)};var Mu=class{constructor(t,e,n){this.confidenceMasks=t,this.categoryMask=e,this.qualityScores=n}close(){var t,e;(t=this.confidenceMasks)==null||t.forEach(n=>{n.close()}),(e=this.categoryMask)==null||e.close()}};Mu.prototype.close=Mu.prototype.close;var di=class extends Fn{constructor(t,e){super(new ai(t,e),"image_in","norm_rect_in",!1),this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new Pd,this.u=new $g,Ie(this.h,0,3,this.u),Ie(t=this.h,0,1,e=new Ct)}get baseOptions(){return tt(this.h,Ct,1)}set baseOptions(t){Ie(this.h,0,1,t)}o(t){return"outputCategoryMask"in t&&(this.outputCategoryMask=t.outputCategoryMask??!1),"outputConfidenceMasks"in t&&(this.outputConfidenceMasks=t.outputConfidenceMasks??!0),super.l(t)}segment(t,e,n,i){const s=typeof n!="function"?n:{};if(this.j=typeof n=="function"?n:i,this.qualityScores=this.categoryMask=this.confidenceMasks=void 0,n=this.C+1,i=new Zg,e.keypoint&&e.scribble)throw Error("Cannot provide both keypoint and scribble.");if(e.keypoint){var r=new ih;fs(r,3,Ka(!0),!1),fs(r,1,za(e.keypoint.x),0),fs(r,2,za(e.keypoint.y),0),Va(i,1,pu,r)}else{if(!e.scribble)throw Error("Must provide either a keypoint or a scribble.");{const o=new Xy;for(r of e.scribble)fs(e=new ih,3,Ka(!0),!1),fs(e,1,za(r.x),0),fs(e,2,za(r.y),0),cd(o,1,ih,e);Va(i,2,pu,o)}}this.g.addProtoToStream(i.g(),"mediapipe.tasks.vision.interactive_segmenter.proto.RegionOfInterest","roi_in",n),oi(this,t,s);e:{try{const o=new Mu(this.confidenceMasks,this.categoryMask,this.qualityScores);if(!this.j){var a=o;break e}this.j(o)}finally{al(this)}a=void 0}return a}m(){var t=new On;At(t,"image_in"),At(t,"roi_in"),At(t,"norm_rect_in");const e=new Nn;Li(e,Kg,this.h);const n=new yn;Un(n,2,"mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraphV2"),Mt(n,"IMAGE:image_in"),Mt(n,"ROI:roi_in"),Mt(n,"NORM_RECT:norm_rect_in"),n.o(e),$n(t,n),rl(this,t),this.outputConfidenceMasks&&(nt(t,"confidence_masks"),je(n,"CONFIDENCE_MASKS:confidence_masks"),Qr(this,"confidence_masks"),this.g.aa("confidence_masks",(i,s)=>{this.confidenceMasks=i.map(r=>ta(this,r,!0,!this.j)),me(this,s)}),this.g.attachEmptyPacketListener("confidence_masks",i=>{this.confidenceMasks=[],me(this,i)})),this.outputCategoryMask&&(nt(t,"category_mask"),je(n,"CATEGORY_MASK:category_mask"),Qr(this,"category_mask"),this.g.Z("category_mask",(i,s)=>{this.categoryMask=ta(this,i,!1,!this.j),me(this,s)}),this.g.attachEmptyPacketListener("category_mask",i=>{this.categoryMask=void 0,me(this,i)})),nt(t,"quality_scores"),je(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",(i,s)=>{this.qualityScores=i,me(this,s)}),this.g.attachEmptyPacketListener("quality_scores",i=>{this.categoryMask=void 0,me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};di.prototype.segment=di.prototype.segment,di.prototype.setOptions=di.prototype.o,di.createFromModelPath=function(t,e){return Je(di,t,{baseOptions:{modelAssetPath:e}})},di.createFromModelBuffer=function(t,e){return Je(di,t,{baseOptions:{modelAssetBuffer:e}})},di.createFromOptions=function(t,e){return Je(di,t,e)};var Hn=class extends Fn{constructor(t,e){super(new ai(t,e),"input_frame_gpu","norm_rect",!1),this.j={detections:[]},Ie(t=this.h=new Jg,0,1,e=new Ct)}get baseOptions(){return tt(this.h,Ct,1)}set baseOptions(t){Ie(this.h,0,1,t)}o(t){return t.displayNamesLocale!==void 0?ht(this.h,2,fo(t.displayNamesLocale)):"displayNamesLocale"in t&&ht(this.h,2),t.maxResults!==void 0?ts(this.h,3,t.maxResults):"maxResults"in t&&ht(this.h,3),t.scoreThreshold!==void 0?Ce(this.h,4,t.scoreThreshold):"scoreThreshold"in t&&ht(this.h,4),t.categoryAllowlist!==void 0?Cc(this.h,5,t.categoryAllowlist):"categoryAllowlist"in t&&ht(this.h,5),t.categoryDenylist!==void 0?Cc(this.h,6,t.categoryDenylist):"categoryDenylist"in t&&ht(this.h,6),this.l(t)}F(t,e){return this.j={detections:[]},oi(this,t,e),this.j}G(t,e,n){return this.j={detections:[]},Di(this,t,n,e),this.j}m(){var t=new On;At(t,"input_frame_gpu"),At(t,"norm_rect"),nt(t,"detections");const e=new Nn;Li(e,Yy,this.h);const n=new yn;Un(n,2,"mediapipe.tasks.vision.ObjectDetectorGraph"),Mt(n,"IMAGE:input_frame_gpu"),Mt(n,"NORM_RECT:norm_rect"),je(n,"DETECTIONS:detections"),n.o(e),$n(t,n),this.g.attachProtoVectorListener("detections",(i,s)=>{for(const r of i)i=Cg(r),this.j.detections.push(t_(i));me(this,s)}),this.g.attachEmptyPacketListener("detections",i=>{me(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};Hn.prototype.detectForVideo=Hn.prototype.G,Hn.prototype.detect=Hn.prototype.F,Hn.prototype.setOptions=Hn.prototype.o,Hn.createFromModelPath=async function(t,e){return Je(Hn,t,{baseOptions:{modelAssetPath:e}})},Hn.createFromModelBuffer=function(t,e){return Je(Hn,t,{baseOptions:{modelAssetBuffer:e}})},Hn.createFromOptions=function(t,e){return Je(Hn,t,e)};var Su=class{constructor(t,e,n){this.landmarks=t,this.worldLandmarks=e,this.segmentationMasks=n}close(){var t;(t=this.segmentationMasks)==null||t.forEach(e=>{e.close()})}};function gm(t){t.landmarks=[],t.worldLandmarks=[],t.segmentationMasks=void 0}function _m(t){try{const e=new Su(t.landmarks,t.worldLandmarks,t.segmentationMasks);if(!t.u)return e;t.u(e)}finally{al(t)}}Su.prototype.close=Su.prototype.close;var Rn=class extends Fn{constructor(t,e){super(new ai(t,e),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.outputSegmentationMasks=!1,Ie(t=this.h=new Qg,0,1,e=new Ct),this.A=new Wg,Ie(this.h,0,3,this.A),this.j=new Gg,Ie(this.h,0,2,this.j),ts(this.j,4,1),Ce(this.j,2,.5),Ce(this.A,2,.5),Ce(this.h,4,.5)}get baseOptions(){return tt(this.h,Ct,1)}set baseOptions(t){Ie(this.h,0,1,t)}o(t){return"numPoses"in t&&ts(this.j,4,t.numPoses??1),"minPoseDetectionConfidence"in t&&Ce(this.j,2,t.minPoseDetectionConfidence??.5),"minTrackingConfidence"in t&&Ce(this.h,4,t.minTrackingConfidence??.5),"minPosePresenceConfidence"in t&&Ce(this.A,2,t.minPosePresenceConfidence??.5),"outputSegmentationMasks"in t&&(this.outputSegmentationMasks=t.outputSegmentationMasks??!1),this.l(t)}F(t,e,n){const i=typeof e!="function"?e:{};return this.u=typeof e=="function"?e:n,gm(this),oi(this,t,i),_m(this)}G(t,e,n,i){const s=typeof n!="function"?n:{};return this.u=typeof n=="function"?n:i,gm(this),Di(this,t,s,e),_m(this)}m(){var t=new On;At(t,"image_in"),At(t,"norm_rect"),nt(t,"normalized_landmarks"),nt(t,"world_landmarks"),nt(t,"segmentation_masks");const e=new Nn;Li(e,qy,this.h);const n=new yn;Un(n,2,"mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"),Mt(n,"IMAGE:image_in"),Mt(n,"NORM_RECT:norm_rect"),je(n,"NORM_LANDMARKS:normalized_landmarks"),je(n,"WORLD_LANDMARKS:world_landmarks"),n.o(e),$n(t,n),rl(this,t),this.g.attachProtoVectorListener("normalized_landmarks",(i,s)=>{this.landmarks=[];for(const r of i)i=go(r),this.landmarks.push(sl(i));me(this,s)}),this.g.attachEmptyPacketListener("normalized_landmarks",i=>{this.landmarks=[],me(this,i)}),this.g.attachProtoVectorListener("world_landmarks",(i,s)=>{this.worldLandmarks=[];for(const r of i)i=Or(r),this.worldLandmarks.push(Ga(i));me(this,s)}),this.g.attachEmptyPacketListener("world_landmarks",i=>{this.worldLandmarks=[],me(this,i)}),this.outputSegmentationMasks&&(je(n,"SEGMENTATION_MASK:segmentation_masks"),Qr(this,"segmentation_masks"),this.g.aa("segmentation_masks",(i,s)=>{this.segmentationMasks=i.map(r=>ta(this,r,!0,!this.u)),me(this,s)}),this.g.attachEmptyPacketListener("segmentation_masks",i=>{this.segmentationMasks=[],me(this,i)})),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};Rn.prototype.detectForVideo=Rn.prototype.G,Rn.prototype.detect=Rn.prototype.F,Rn.prototype.setOptions=Rn.prototype.o,Rn.createFromModelPath=function(t,e){return Je(Rn,t,{baseOptions:{modelAssetPath:e}})},Rn.createFromModelBuffer=function(t,e){return Je(Rn,t,{baseOptions:{modelAssetBuffer:e}})},Rn.createFromOptions=function(t,e){return Je(Rn,t,e)},Rn.POSE_CONNECTIONS=g_;const Qn={WRIST:0,THUMB_TIP:4,INDEX_TIP:8,MIDDLE_TIP:12,INDEX_MCP:5,MIDDLE_MCP:9,RING_MCP:13,PINKY_MCP:17},ec=[Qn.WRIST,Qn.INDEX_MCP,Qn.MIDDLE_MCP,Qn.RING_MCP,Qn.PINKY_MCP],nE={Pointing_Up:"pointing",Open_Palm:"openpalm",Thumb_Up:"thumbsup",Victory:"victory"},iE="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm",sE="https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",rE=.1,aE=600;class oE{constructor(e=iE,n=null){Le(this,"recognizer",null);Le(this,"wasHandsClose",!1);Le(this,"lastClapMs",0);this.wasmPath=e,this.handednessFilter=n}async init(){const e=await Gs.forVisionTasks(this.wasmPath);this.recognizer=await xn.createFromOptions(e,{baseOptions:{modelAssetPath:sE,delegate:"GPU"},numHands:2,minHandDetectionConfidence:.35,minHandPresenceConfidence:.35,minTrackingConfidence:.35,runningMode:"VIDEO"})}detect(e,n){if(!this.recognizer)return null;const i=this.recognizer.recognizeForVideo(e,n);if(!i.landmarks||i.landmarks.length===0)return null;let s=!1,r=null;if(i.landmarks.length>=2){const l=i.landmarks[0][Qn.MIDDLE_MCP],h=i.landmarks[1][Qn.MIDDLE_MCP];r=Math.hypot(l.x-h.x,l.y-h.y);const d=r<rE;if(d&&!this.wasHandsClose){const u=performance.now();u-this.lastClapMs>aE&&(this.lastClapMs=u,s=!0)}this.wasHandsClose=d}else this.wasHandsClose=!1;let a=0;if(this.handednessFilter){const l=i.handedness.findIndex(h=>{var d;return((d=h[0])==null?void 0:d.categoryName)===this.handednessFilter});if(l===-1)return s?{gestureName:null,gestureConfidence:0,thumbIndexDist:1,thumbMiddleDist:1,indexTip:{x:.5,y:.5},wrist:{x:.5,y:.5},palmCenter:{x:.5,y:.5},clap:s,twoHandDist:r,landmarks:null}:null;a=l}const o=i.gestures[a]??[],c=this.analyze(i.landmarks[a],o);return c.clap=s,c.twoHandDist=r,c.landmarks=i.landmarks[a].map(l=>({x:l.x,y:l.y,z:l.z})),c}analyze(e,n){const i=e[Qn.THUMB_TIP],s=e[Qn.INDEX_TIP],r=e[Qn.MIDDLE_TIP],a=e[Qn.WRIST],o={x:ec.reduce((f,g)=>f+e[g].x,0)/ec.length,y:ec.reduce((f,g)=>f+e[g].y,0)/ec.length},c=Math.sqrt((i.x-s.x)**2+(i.y-s.y)**2+((i.z??0)-(s.z??0))**2),l=Math.sqrt((i.x-r.x)**2+(i.y-r.y)**2+((i.z??0)-(r.z??0))**2),h=n[0],d=h?nE[h.categoryName]??null:null,u=(h==null?void 0:h.score)??0;return{gestureName:d,gestureConfidence:u,thumbIndexDist:c,thumbMiddleDist:l,indexTip:{x:s.x,y:s.y},wrist:{x:a.x,y:a.y},palmCenter:o,clap:!1,twoHandDist:null,landmarks:null}}destroy(){var e;(e=this.recognizer)==null||e.close(),this.recognizer=null}}const Cr={NOSE_TIP:1,CHIN:152,FOREHEAD:10,LEFT_EAR:234,RIGHT_EAR:454},cE="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm",lE="https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";class hE{constructor(e=cE){Le(this,"landmarker",null);this.wasmPath=e}async init(){const e=await Gs.forVisionTasks(this.wasmPath);this.landmarker=await St.createFromOptions(e,{baseOptions:{modelAssetPath:lE,delegate:"GPU"},outputFaceBlendshapes:!1,runningMode:"VIDEO",numFaces:1})}detect(e,n){var s;if(!this.landmarker)return null;const i=this.landmarker.detectForVideo(e,n);return(s=i.faceLandmarks)!=null&&s.length?this.analyze(i.faceLandmarks[0]):null}analyze(e){const n=e[Cr.NOSE_TIP].x,i=e[Cr.LEFT_EAR].x,s=e[Cr.RIGHT_EAR].x,r=Math.abs(s-i),a=r>.01?(n-i)/r:.5,o=e[Cr.NOSE_TIP].y,c=e[Cr.FOREHEAD].y,l=e[Cr.CHIN].y,h=Math.abs(l-c),d=h>.01?(o-c)/h:.5;return{gazeX:Math.max(0,Math.min(1,a)),gazeY:Math.max(0,Math.min(1,d))}}destroy(){var e;(e=this.landmarker)==null||e.close(),this.landmarker=null}}const vm="handface_key_bindings";function uE(t){return{" ":"Space",ArrowUp:"↑",ArrowDown:"↓",ArrowLeft:"←",ArrowRight:"→",Escape:"Esc",Backspace:"⌫",Delete:"Del",Enter:"↵",Tab:"Tab",PageUp:"PgUp",PageDown:"PgDn",Home:"Home",End:"End"}[t]??t}class dE{constructor(){Le(this,"bindings",new Map);this.load()}bind(e,n,i){this.bindings.set(e,{gesture:e,key:n,modifiers:i}),this.save()}unbind(e){this.bindings.delete(e),this.save()}getBinding(e){return this.bindings.get(e)}getAll(){return[...this.bindings.values()]}trigger(e){const n=this.bindings.get(e);if(!n)return;const i=n.key,s=n.modifiers??{};if(this.execNative(i,s))return;const r={key:i,bubbles:!0,cancelable:!0,ctrlKey:s.ctrl??!1,altKey:s.alt??!1,shiftKey:s.shift??!1,metaKey:s.meta??!1};document.dispatchEvent(new KeyboardEvent("keydown",r)),document.dispatchEvent(new KeyboardEvent("keyup",r))}execNative(e,n){var s,r,a;const i=e.toLowerCase();return i==="f5"||i==="r"&&n.ctrl?(location.reload(),!0):i==="escape"?(document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),!0):i==="f11"?(document.fullscreenElement?(a=document.exitFullscreen)==null||a.call(document):(r=(s=document.documentElement).requestFullscreen)==null||r.call(s),!0):n.ctrl&&(i==="+"||i==="=")?(document.body.style.zoom=String(parseFloat(document.body.style.zoom||"1")+.1),!0):n.ctrl&&i==="-"?(document.body.style.zoom=String(Math.max(.5,parseFloat(document.body.style.zoom||"1")-.1)),!0):n.ctrl&&i==="0"?(document.body.style.zoom="1",!0):n.alt&&i==="arrowleft"?(history.back(),!0):n.alt&&i==="arrowright"?(history.forward(),!0):!1}save(){try{localStorage.setItem(vm,JSON.stringify([...this.bindings.entries()]))}catch{}}load(){try{const e=localStorage.getItem(vm);e&&(this.bindings=new Map(JSON.parse(e)))}catch{}}}const xm={pointing:{icon:"☝️",label:"Pointing Up",labelKo:"검지 가리키기",builtin:!0,builtinAction:"커서"},openpalm:{icon:"🖐️",label:"Open Palm",labelKo:"펼친 손",builtin:!1},thumbsup:{icon:"👍",label:"Thumbs Up",labelKo:"엄지 위",builtin:!1},victory:{icon:"✌️",label:"Victory",labelKo:"브이",builtin:!1}},ue="hf-",fE=["openpalm","victory","thumbsup"],pE=["pointing"];class mE{constructor(e){Le(this,"root");Le(this,"fab");Le(this,"panel");Le(this,"styleEl");Le(this,"isOpen",!1);Le(this,"capturingGesture",null);Le(this,"captureHandler",null);Le(this,"detectedGesture",null);this.mapper=e,this.styleEl=this.injectStyles(),this.fab=this.createFab(),this.panel=this.createPanel(),this.root=document.createElement("div"),this.root.setAttribute("data-handface",""),this.root.appendChild(this.fab),this.root.appendChild(this.panel),document.body.appendChild(this.root),this.fab.addEventListener("click",()=>this.toggle())}setDetected(e,n){this.isOpen&&this.detectedGesture!==e&&(this.detectedGesture=e,this.panel.querySelectorAll(`.${ue}row[data-gesture]`).forEach(i=>{const s=i.dataset.gesture;i.classList.toggle(`${ue}active`,s===e&&n>.6)}))}destroy(){this.stopCapture(),this.styleEl.remove(),this.root.remove()}toggle(){this.isOpen?this.close():this.open()}open(){this.isOpen=!0,this.renderRows(),this.panel.classList.add(`${ue}open`),this.fab.classList.add(`${ue}fab-open`)}close(){this.isOpen=!1,this.stopCapture(),this.panel.classList.remove(`${ue}open`),this.fab.classList.remove(`${ue}fab-open`)}startCapture(e){this.stopCapture(),this.capturingGesture=e,this.captureHandler=n=>{if(n.preventDefault(),n.stopImmediatePropagation(),["Shift","Control","Alt","Meta"].includes(n.key)){document.addEventListener("keydown",this.captureHandler,{once:!0,capture:!0});return}this.mapper.bind(e,n.key,{ctrl:n.ctrlKey||void 0,alt:n.altKey||void 0,shift:n.shiftKey||void 0,meta:n.metaKey||void 0}),this.capturingGesture=null,this.captureHandler=null,this.renderRows()},document.addEventListener("keydown",this.captureHandler,{once:!0,capture:!0}),this.renderRows()}stopCapture(){this.captureHandler&&(document.removeEventListener("keydown",this.captureHandler,{capture:!0}),this.captureHandler=null,this.capturingGesture=null)}createFab(){const e=document.createElement("button");return e.className=`${ue}fab`,e.title="handface 제스처 설정",e.innerHTML="✋",e}createPanel(){const e=document.createElement("div");return e.className=`${ue}panel`,e.innerHTML=`
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
    `,e.querySelector(`.${ue}close-btn`).addEventListener("click",()=>this.close()),e}renderRows(){this.renderBuiltin(),this.renderBindings()}renderBuiltin(){const e=this.panel.querySelector(`.${ue}builtin-rows`);e.innerHTML="",e.appendChild(this.makeReadonlyRow("🤏","엄지+검지 핀치 (빠르게)","클릭",null)),e.appendChild(this.makeReadonlyRow("🤏","핀치 유지 + 이동","드래그",null)),e.appendChild(this.makeReadonlyRow("🤲","양손 거리 조절","줌",null));for(const n of pE){const i=xm[n];e.appendChild(this.makeReadonlyRow(i.icon,i.labelKo,i.builtinAction,n))}}renderBindings(){const e=this.panel.querySelector(`.${ue}binding-rows`);e.innerHTML="";for(const n of fE){const i=xm[n],s=this.mapper.getBinding(n),r=this.capturingGesture===n;e.appendChild(this.makeBindingRow(n,i.icon,i.labelKo,(s==null?void 0:s.key)??null,r))}}makeReadonlyRow(e,n,i,s){const r=document.createElement("div");return r.className=`${ue}row`,s&&(r.dataset.gesture=s),r.innerHTML=`
      <span class="${ue}icon">${e}</span>
      <span class="${ue}name">${n}</span>
      <span class="${ue}badge">${i}</span>
    `,r}makeBindingRow(e,n,i,s,r){var c;const a=document.createElement("div");a.className=`${ue}row`,a.dataset.gesture=e;const o=s?this.buildKeyLabel(this.mapper.getBinding(e)):null;return r?(a.innerHTML=`
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
      `,a.querySelector(`.${ue}edit-btn`).addEventListener("click",()=>this.startCapture(e)),(c=a.querySelector(`.${ue}clear-btn`))==null||c.addEventListener("click",()=>{this.mapper.unbind(e),this.renderRows()})),a}buildKeyLabel(e){var i,s,r,a;const n=[];return(i=e.modifiers)!=null&&i.ctrl&&n.push("Ctrl"),(s=e.modifiers)!=null&&s.alt&&n.push("Alt"),(r=e.modifiers)!=null&&r.shift&&n.push("Shift"),(a=e.modifiers)!=null&&a.meta&&n.push("⌘"),n.push(uE(e.key)),n.join("+")}injectStyles(){const e=document.createElement("style");return e.dataset.handface="styles",e.textContent=`
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
    `,document.head.appendChild(e),e}}function Mm(t,e,n){return t+n*(e-t)}const gE=.045,_E=.12,vE=300,xE=500,ME=8,SE=8e3,yE=500,EE=50,bE=120,TE=900,AE=200,wE=.022,Sm=.04,RE=.65;function CE(t){return t==="right"?"Right":t==="left"?"Left":null}function ym(t,e,n){return Math.max(0,Math.min(1,(t-e)/(n-e)))}class PE extends vS{constructor(n={}){super();Le(this,"video");Le(this,"detector");Le(this,"gazeDetector",null);Le(this,"rafId",null);Le(this,"stream",null);Le(this,"panel",null);Le(this,"pointerState","idle");Le(this,"wasPinching",!1);Le(this,"mouseDownTime",0);Le(this,"mouseDownPos",{x:0,y:0});Le(this,"lastClickTime",0);Le(this,"lastGestureMs",new Map);Le(this,"rawHandX",.5);Le(this,"rawHandY",.5);Le(this,"_lastLandmarks",null);Le(this,"hoverTimer",null);Le(this,"isHovering",!1);Le(this,"lastMovePos",{x:0,y:0});Le(this,"prevTwoHandDist",null);Le(this,"smoothTwoHandDist",0);Le(this,"smoothX",.5);Le(this,"smoothY",.5);Le(this,"prevRawX",.5);Le(this,"prevRawY",.5);Le(this,"calibrated",!1);Le(this,"zoneX0",0);Le(this,"zoneX1",1);Le(this,"zoneY0",0);Le(this,"zoneY1",1);Le(this,"flipHorizontal");Le(this,"cursorSource");Le(this,"cursorAnchor");Le(this,"cursorMode");Le(this,"sensitivity");Le(this,"activeZone");Le(this,"ownedVideo");Le(this,"mapper",new dE);this.flipHorizontal=n.flipHorizontal??!0,this.cursorSource=n.cursorSource??"hand",this.cursorAnchor=n.cursorAnchor??"palm",this.cursorMode=n.cursorMode??"absolute",this.sensitivity=n.sensitivity??2.5;const i=this.cursorSource==="gaze"?[.35,.35,.65,.65]:[.3,.1,.95,.85];this.activeZone=n.activeZone??i,[this.zoneX0,this.zoneY0,this.zoneX1,this.zoneY1]=this.activeZone,n.video?(this.video=n.video,this.ownedVideo=!1):(this.video=this.createHiddenVideo(),this.ownedVideo=!0),this.detector=new oE(n.wasmPath,CE(n.handedness??"right")),this.cursorSource==="gaze"&&(this.gazeDetector=new hE(n.wasmPath))}get handLandmarks(){return this._lastLandmarks}get mediaStream(){return this.stream}async start(){await this.detector.init(),this.gazeDetector&&await this.gazeDetector.init(),this.stream=await navigator.mediaDevices.getUserMedia({video:!0}),this.video.srcObject=this.stream,await new Promise(n=>{this.video.onloadedmetadata=()=>{this.video.play(),n()}}),this.loop()}stop(){var n,i,s;this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),(n=this.stream)==null||n.getTracks().forEach(r=>r.stop()),this.stream=null,this.detector.destroy(),(i=this.gazeDetector)==null||i.destroy(),this.gazeDetector=null,(s=this.panel)==null||s.destroy(),this.panel=null,this.ownedVideo&&this.video.remove(),this.removeAllListeners()}recalibrate(){this.calibrated=!1}createPanel(){return this.panel||(this.panel=new mE(this.mapper)),this.panel}createHiddenVideo(){const n=document.createElement("video");return n.style.cssText="position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;",document.body.appendChild(n),n}loop(){this.rafId=requestAnimationFrame(()=>{this.tick(),this.rafId!==null&&this.loop()})}tick(){const n=performance.now(),i=this.detector.detect(this.video,n);this._lastLandmarks=(i==null?void 0:i.landmarks)??null;let s,r;if(this.gazeDetector){const l=this.gazeDetector.detect(this.video,n);if(!l){i&&this.processStateMachine(i,this.currentPos());return}s=this.flipHorizontal?1-l.gazeX:l.gazeX,r=l.gazeY}else{if(!i)return;const l=this.cursorAnchor==="index"?i.indexTip:this.cursorAnchor==="palm"?i.palmCenter:i.wrist;s=this.flipHorizontal?1-l.x:l.x,r=l.y}if(i){const l=this.cursorAnchor==="index"?i.indexTip:this.cursorAnchor==="palm"?i.palmCenter:i.wrist;this.rawHandX=this.flipHorizontal?1-l.x:l.x,this.rawHandY=l.y}if(this.pointerState!=="dragging"){let l,h;if(this.cursorMode==="relative"){const g=(s-this.prevRawX)*this.sensitivity,M=(r-this.prevRawY)*this.sensitivity;l=Math.max(0,Math.min(1,this.smoothX+g)),h=Math.max(0,Math.min(1,this.smoothY+M))}else{if(!this.calibrated){const g=(this.activeZone[2]-this.activeZone[0])/2,M=(this.activeZone[3]-this.activeZone[1])/2;this.zoneX0=s-g,this.zoneX1=s+g,this.zoneY0=r-M,this.zoneY1=r+M,this.smoothX=.5,this.smoothY=.5,this.calibrated=!0}l=ym(s,this.zoneX0,this.zoneX1),h=ym(r,this.zoneY0,this.zoneY1)}const d=Math.hypot(s-this.prevRawX,r-this.prevRawY),u=Math.min(d/wE,1),f=Sm+u*(RE-Sm);this.smoothX=Mm(this.smoothX,l,f),this.smoothY=Mm(this.smoothY,h,f)}this.prevRawX=s,this.prevRawY=r;const o=this.currentPos();this.emit("move",o),Math.hypot(o.screenX-this.lastMovePos.x,o.screenY-this.lastMovePos.y)>EE&&(this.lastMovePos={x:o.screenX,y:o.screenY},this.isHovering&&(this.isHovering=!1),this.hoverTimer&&clearTimeout(this.hoverTimer),this.hoverTimer=setTimeout(()=>{this.isHovering=!0,this.emit("hover",this.currentPos())},yE)),i&&this.processStateMachine(i,o)}currentPos(){return{x:this.smoothX,y:this.smoothY,screenX:Math.round(this.smoothX*window.innerWidth),screenY:Math.round(this.smoothY*window.innerHeight)}}processStateMachine(n,i){var g,M;const s=Date.now();let r=!1;if(n.twoHandDist!==null&&this.pointerState==="idle"){if(this.prevTwoHandDist===null)this.smoothTwoHandDist=n.twoHandDist;else{this.smoothTwoHandDist+=(n.twoHandDist-this.smoothTwoHandDist)*.25;const m=this.smoothTwoHandDist-this.prevTwoHandDist;Math.abs(m)>.003&&(this.emit("scroll",{deltaY:-m*bE*3}),r=!0)}this.prevTwoHandDist=this.smoothTwoHandDist}else this.prevTwoHandDist=null;if(r)return;const a=n.thumbIndexDist<gE,o=!a&&n.thumbIndexDist>_E,l=!["openpalm","thumbsup"].includes(n.gestureName??""),h=n.gestureName==="pointing"||n.gestureName==="openpalm",d=a&&!this.wasPinching&&l,u=(o||h)&&this.wasPinching;switch(this.wasPinching=a||this.wasPinching&&!o&&!h,this.pointerState){case"idle":d&&(this.pointerState="mousedown",this.mouseDownTime=s,this.mouseDownPos={x:i.screenX,y:i.screenY},this.emit("mousedown",i));break;case"mousedown":if(u)this.emit("mouseup",i),s-this.mouseDownTime<vE&&s-this.lastClickTime>AE&&(this.emit("click",i),s-this.lastClickTime<xE&&this.emit("dblclick",i),this.lastClickTime=s),this.pointerState="idle";else if(a){const m=i.screenX-this.mouseDownPos.x,p=i.screenY-this.mouseDownPos.y;Math.hypot(m,p)>ME&&(this.pointerState="dragging",this.emit("dragstart",{x:this.rawHandX,y:this.rawHandY,screenX:Math.round(this.rawHandX*window.innerWidth),screenY:Math.round(this.rawHandY*window.innerHeight)}))}break;case"dragging":u||s-this.mouseDownTime>SE?(this.emit("dragend",i),this.emit("mouseup",i),this.wasPinching=!1,this.pointerState="idle"):this.emit("drag",{x:this.rawHandX,y:this.rawHandY,screenX:Math.round(this.rawHandX*window.innerWidth),screenY:Math.round(this.rawHandY*window.innerHeight)});break}const f=n.gestureName;if(f){(g=this.panel)==null||g.setDetected(f,n.gestureConfidence);const m=this.lastGestureMs.get(f)??0;if(s-m>TE){this.lastGestureMs.set(f,s);const p={gesture:f,...i,confidence:n.gestureConfidence};this.emit(f,p),this.mapper.trigger(f)}}else(M=this.panel)==null||M.setDetected(null,0);r||n.clap&&this.emit("clap",{gesture:"pointing",...i,confidence:1})}}class Em{constructor(e=200){this.items=[],this.maxItems=e}add(e){this.items.push(e),this.items.length>this.maxItems&&this.items.shift()}search(e,n=3){const i=this._bigrams(e.toLowerCase());return this.items.map(s=>({item:s,score:this._similarity(i,this._bigrams(s.toLowerCase()))})).sort((s,r)=>r.score-s.score).slice(0,n).filter(s=>s.score>0).map(s=>s.item)}_bigrams(e){const n=new Set;for(let i=0;i<e.length-1;i++)n.add(e.slice(i,i+2));return n}_similarity(e,n){let i=0;for(const s of e)n.has(s)&&i++;return i/(Math.sqrt(e.size)*Math.sqrt(n.size)+1e-9)}}class Vd{constructor(){this._listeners=[],this._history=[],this._memory=new Em(200),this._apiKey="",this._endpoint="https://whatpull-iris-assistant.hf.space",this._sessionId=null,this.busy=!1,this.model=this._makeDummyModel();const e=typeof window<"u"?window.__IRIS_CONFIG__:null;e!=null&&e.apiKey&&(this._apiKey=e.apiKey),e!=null&&e.endpoint&&(this._endpoint=e.endpoint),this._loadLocal()}_makeDummyModel(){return{CTX:8,vocab:{size:64},encode:i=>[...i].map(s=>s.charCodeAt(0)%64),forward:i=>{this.model.lastX=Float32Array.from({length:32},()=>Math.random()*.8+.1),this.model.lastH1=Float32Array.from({length:32},()=>Math.random()*.8+.1),this.model.lastH2=Float32Array.from({length:32},()=>Math.random()*.8+.1),this.model.lastH3=Float32Array.from({length:32},()=>Math.random()*.8+.1),this.model.lastProbs=Float32Array.from({length:64},()=>Math.random())},lastX:new Float32Array(32),lastH1:new Float32Array(32),lastH2:new Float32Array(32),lastH3:new Float32Array(32),lastProbs:new Float32Array(64)}}onEvent(e){this._listeners.push(e)}emit(e){this._listeners.forEach(n=>n(e))}get history(){return this._history.map(e=>({role:e.role==="assistant"?"ai":e.role,text:typeof e.text=="string"?e.text:typeof e.content=="string"?e.content:""}))}get stats(){return{vocabSize:64,totalSteps:this._history.length,lossEMA:0,label:"IRIS"}}get modelState(){return{embed:this.model.lastX,h1:this.model.lastH1,h2:this.model.lastH2,h3:this.model.lastH3,probs:this.model.lastProbs}}layerWeightAverages(){return[.5,.5,.5]}reset(){this._history=[],this._memory=new Em(200),this._sessionId=null,this.model=this._makeDummyModel(),this._saveLocal(),this.emit({type:"state",stats:this.stats})}setApiKey(e){this._apiKey=e.trim(),this._saveLocal()}setEndpoint(e){e&&e.startsWith("http")&&(this._endpoint=e.trim().replace(/\/$/,""),this._saveLocal())}async send(e){var n,i,s;if(!this.busy){if(!this._apiKey){this.emit({type:"generate-end",text:`⚠️ IRIS API Key가 설정되지 않았습니다.
Settings(⚙️)에서 X-API-Key를 입력해주세요.`});return}this.busy=!0,this.emit({type:"training-start"}),this.model.forward([]);try{const r=await fetch(`${this._endpoint}/chat`,{method:"POST",headers:{"Content-Type":"application/json","X-API-Key":this._apiKey},body:JSON.stringify({message:e,max_tokens:256,session_id:this._sessionId})});if(!r.ok){const c=await r.json().catch(()=>({}));throw new Error(c.detail||`HTTP ${r.status}`)}const a=await r.json(),o=(a.response||"").trim();this._sessionId=a.session_id||this._sessionId,this._history.push({role:"user",content:e}),this._history.push({role:"assistant",content:o}),this._memory.add(e),this._memory.add(o),this._saveLocal(),this.model.forward([]),this.emit({type:"generate-token",token:o,partial:o}),this.emit({type:"generate-end",text:o}),this.emit({type:"state",stats:this.stats})}catch(r){console.error("[IRIS]",r);const o=((n=r.message)==null?void 0:n.includes("503"))||((i=r.message)==null?void 0:i.includes("Service Unavailable"))||((s=r.message)==null?void 0:s.includes("warming"))?`IRIS가 깨어나는 중입니다, 주인님.
잠시 후 다시 시도해주세요. (콜드스타트 약 30~60초)`:`IRIS 연결 오류: ${r.message}`;this.emit({type:"generate-end",text:o})}this.busy=!1,this.emit({type:"training-end",avgLoss:0,stepsRun:0,totalSteps:this._history.length})}}async testConnection(){if(!this._apiKey)return{ok:!1,msg:"API Key를 입력해주세요."};try{const e=await fetch(`${this._endpoint}/health`,{headers:{"X-API-Key":this._apiKey}});return e.ok?{ok:!0,msg:`IRIS 시스템 온라인 | RLAIF: ${(await e.json()).rlaif_data_count??0}건`}:{ok:!1,msg:`HTTP ${e.status}`}}catch(e){return{ok:!1,msg:`연결 실패: ${e.message}`}}}_saveLocal(){try{localStorage.setItem("handface-iris-v1",JSON.stringify({history:this._history.slice(-40),memory:this._memory.items,sessionId:this._sessionId,endpoint:this._endpoint}))}catch{}}_loadLocal(){try{const e=localStorage.getItem("handface-iris-v1");if(!e)return;const n=JSON.parse(e);this._history=n.history??[],this._memory.items=n.memory??[],this._sessionId=n.sessionId??null,n.endpoint&&(this._endpoint=n.endpoint)}catch{}}}const LE=5e3,IE=3;class DE{constructor(){this.recognition=null,this.handlers=new Set,this.accumulated="",this.available=!1,this.silenceTimer=null,this.paused=!1,this.hasActiveInput=!1}onEvent(e){return this.handlers.add(e),()=>this.handlers.delete(e)}emit(e){for(const n of this.handlers)n(e)}get listening(){return this.hasActiveInput}async init(){const e=window.SpeechRecognition||window.webkitSpeechRecognition;if(!e){this.emit({type:"error",error:"SpeechRecognition not supported"});return}this.recognition=new e,this.recognition.continuous=!0,this.recognition.interimResults=!0,this.recognition.lang=navigator.language||"en-US",this.recognition.onresult=n=>this._onResult(n),this.recognition.onerror=n=>{if(n.error==="not-allowed"||n.error==="service-not-allowed"){this.available=!1,this.emit({type:"denied"});return}n.error!=="no-speech"&&n.error!=="aborted"&&this.emit({type:"error",error:n.error})},this.recognition.onend=()=>{!this.paused&&this.available&&setTimeout(()=>{try{this.recognition.start()}catch{}},300)},this.available=!0;try{this.recognition.start()}catch{}this.emit({type:"ready"})}_onResult(e){for(let n=e.resultIndex;n<e.results.length;n++){const i=e.results[n][0].transcript,s=e.results[n].isFinal,r=i.replace(/^[\s.,;:!?。，；：！？]+/,"").trim();if(!r)continue;s&&r&&(this.accumulated+=(this.accumulated?" ":"")+r);const a=s?this.accumulated:this.accumulated+(this.accumulated?" ":"")+r;a.trim()&&(this.hasActiveInput||(this.hasActiveInput=!0,this.emit({type:"listening-start"})),this.emit({type:"transcript",text:a.trim()})),clearTimeout(this.silenceTimer),this.accumulated.trim().length>=IE&&(this.silenceTimer=setTimeout(()=>this._autoSend(),LE))}}_autoSend(){if(!this.hasActiveInput)return;const e=this.accumulated.trim();this.accumulated="",this.hasActiveInput=!1,clearTimeout(this.silenceTimer),this.emit({type:"listening-stop",text:e})}manualSend(){this.hasActiveInput&&this.accumulated.trim().length>0&&this._autoSend()}speakChunk(e){if(!e||e.length<1||!window.speechSynthesis)return;this._pause();const n=new SpeechSynthesisUtterance(e);n.lang=navigator.language||"en-US",n.rate=1.05,n.pitch=1;const i=window.speechSynthesis.getVoices()||[],s=n.lang.slice(0,2),r=i.find(a=>a.lang.startsWith(s)&&a.localService)||i.find(a=>a.lang.startsWith(s));r&&(n.voice=r),n.onstart=()=>this.emit({type:"speaking-start"}),n.onend=()=>{!window.speechSynthesis.speaking&&!window.speechSynthesis.pending&&(this._resume(),this.emit({type:"speaking-end"}))},window.speechSynthesis.speak(n)}stopSpeaking(){var e;(e=window.speechSynthesis)==null||e.cancel(),this._resume()}_pause(){var e;if(!this.paused){this.paused=!0;try{(e=this.recognition)==null||e.stop()}catch{}}}_resume(){this.paused&&(this.paused=!1,setTimeout(()=>{var e;try{(e=this.recognition)==null||e.start()}catch{}},300))}}const ol="iris-api-key",cl="iris-endpoint";function UE(){const t=new Vd,e=localStorage.getItem(ol)??"",n=localStorage.getItem(cl)??"";return e&&t.setApiKey(e),n&&t.setEndpoint(n),t}let Ge=UE();const xs=document.getElementById("cursor");document.getElementById("flash");const rh=document.getElementById("s-status"),bm=document.getElementById("s-pos"),FE=document.getElementById("s-clicks"),NE=document.getElementById("s-zoom"),tc=document.getElementById("log"),Da=document.getElementById("start-btn"),nc=document.getElementById("load-msg"),Tm=document.getElementById("overlay");function Mn(t,e){const n=document.createElement("div");n.className="log-item"+(t?` ${t}`:"");const i=new Date;for(n.textContent=`[${i.getHours()}:${String(i.getMinutes()).padStart(2,"0")}:${String(i.getSeconds()).padStart(2,"0")}] ${e}`,tc.appendChild(n);tc.children.length>9;)tc.removeChild(tc.children[1])}const Ea=new hS({antialias:!0});Ea.setSize(window.innerWidth,window.innerHeight);Ea.setPixelRatio(Math.min(window.devicePixelRatio,2));Ea.setClearColor(132104);document.getElementById("canvas-container").appendChild(Ea.domElement);const na=new k1,ia=new Gn(50,window.innerWidth/window.innerHeight,.1,200);ia.position.set(0,1,7.5);ia.lookAt(0,0,0);let fc=7.5,ah=7.5;const Ts=new Ys;na.add(Ts);function __(t=.55){const n=document.createElement("canvas");n.width=n.height=64;const i=n.getContext("2d"),s=i.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(t,"rgba(255,255,255,0.55)"),s.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=s,i.fillRect(0,0,64,64);const r=new K1(n);return r.minFilter=Zt,r.magFilter=Zt,r.needsUpdate=!0,r}const OE=__(.5),Hd=__(.3),In=[14,24,36,48,36,24,14],BE=[2.45,2.1,1.75,1.4,1.05,.7,.35],kE=4,zE=3,VE=3;function HE(t,e,n){return .5*Math.sin(t*2.3+e*3.7+n*1.9+Math.cos(e*1.3))+.25*Math.sin(t*5.1+e*7.3+n*4.7+Math.sin(n*2.1))+.13*Math.sin(t*11.3+e*13.7+n*9.1)+.06*Math.sin(t*23.7+e*29.3+n*19.9)}function GE(t,e){if(t===1)return[new D(0,0,0)];const n=[],i=Math.PI*(3-Math.sqrt(5)),s=1.3,r=.78,a=1.02,o=.14*e;for(let c=0;c<t;c++){const l=1-c/(t-1)*2,h=Math.sqrt(Math.max(0,1-l*l)),d=i*c;let u=Math.cos(d)*h;const f=l;let g=Math.sin(d)*h,M=1;f<-.25&&(M=.6+.4*((f+1)/.75));const m=f>0?1+.08*f:1;let p=1;u>.2&&f>-.4&&(p+=.25*Math.max(0,u-.2)*(1.2-Math.abs(f))),f>.35&&(p+=.15*(f-.35)),u<-.35&&f>-.3&&(p+=.18*Math.pow(Math.abs(u)-.35,.7)),Math.abs(g)>.3&&f<.15&&(p+=.22*(Math.abs(g)-.3)*(.6-f)),u<-.15&&f<-.3&&(p+=.35*Math.max(0,Math.abs(u+.15)+Math.abs(f+.3)-.08));const S=6,T=.1*HE(u*S,f*S,g*S),y=Math.abs(u)<.12&&f>.1?-.08*(1-Math.abs(u)/.12)*f:0,w=Math.abs(g)>.25&&f>-.15&&f<.25?-.06*Math.max(0,Math.abs(g)-.25):0,A=p*(1+T+y+w);let C=u*e*s*A*m,v=f*e*r*A*M,b=g*e*a*A*m;b+=b>=0?o:-o;const q=e*.11;C+=(Math.random()-.5)*q,v+=(Math.random()-.5)*q,b+=(Math.random()-.5)*q,n.push(new D(C,v,b))}return n}const si=In.map((t,e)=>GE(t,BE[e]).map((n,i)=>({pos:n,activation:0,targetActivation:0,layerIdx:e,layerLocalIdx:i}))),qi=si.flat(),Yn=[],Am=new Set,yu=new Map;qi.forEach((t,e)=>yu.set(t,e));function Gd(t,e,n){const i=yu.get(t)*1e5+yu.get(e);Am.has(i)||(Am.add(i),Yn.push({src:t,dst:e,intra:n,weight:.12+Math.random()*.88,targetWeight:.12+Math.random()*.88}))}for(let t=0;t<In.length-1;t++)for(const e of si[t])si[t+1].map(n=>({dst:n,d:e.pos.distanceTo(n.pos)})).sort((n,i)=>n.d-i.d).slice(0,kE).forEach(({dst:n})=>Gd(e,n,!1));for(let t=1;t<In.length;t++)for(const e of si[t])si[t-1].map(n=>({src:n,d:e.pos.distanceTo(n.pos)})).sort((n,i)=>n.d-i.d).slice(0,zE).forEach(({src:n})=>Gd(n,e,!1));for(let t=0;t<In.length;t++){const e=si[t];for(const n of e)e.filter(i=>i!==n).map(i=>({dst:i,d:n.pos.distanceTo(i.pos)})).sort((i,s)=>i.d-s.d).slice(0,VE).forEach(({dst:i})=>Gd(n,i,!0))}const pc=new Map,mc=new Map;for(const t of Yn)pc.has(t.dst)||pc.set(t.dst,[]),pc.get(t.dst).push(t),mc.has(t.src)||mc.set(t.src,[]),mc.get(t.src).push(t);const WE=new ii({uniforms:{rimColor:{value:new $e(6732799)},rimIntensity:{value:1},rimPower:{value:2.8},coreColor:{value:new $e(1721480)},coreAlpha:{value:.02}},vertexShader:`
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
  `,transparent:!0,blending:Ti,depthWrite:!1,side:_i});(function(){new gS().load(_S,n=>{n.scale.setScalar(2.55),n.traverse(s=>{s.isMesh&&(s.geometry.computeVertexNormals(),s.material=WE)}),Ts.add(n),console.log("[handface] Brain OBJ loaded")},void 0,n=>{console.warn("[handface] Brain OBJ failed:",n.message)})})();const v_=document.getElementById("input-grid");v_.style.gridTemplateColumns=`repeat(${In[0]}, 1fr)`;const x_=[],M_=[];for(let t=0;t<In[0];t++){const e=document.createElement("div");e.className="input-cell";const n=document.createElement("div");n.className="input-cell-fill";const i=document.createElement("div");i.className="input-cell-val",i.textContent="00",e.appendChild(n),e.appendChild(i),v_.appendChild(e),x_.push(n),M_.push(i)}const XE=document.getElementById("weight-list"),S_=[];for(let t=1;t<In.length;t++){const e=document.createElement("div");e.className="weight-row",e.innerHTML=`
    <span class="weight-label">L${t-1}→${t}</span>
    <div class="weight-bar"><div class="weight-fill"></div></div>
    <span class="weight-val">—</span>
  `,XE.appendChild(e),S_.push({fill:e.querySelector(".weight-fill"),val:e.querySelector(".weight-val"),layerIdx:t})}const YE=document.getElementById("pred-list"),y_=8,ks=[];for(let t=0;t<y_;t++){const e=document.createElement("div");e.className="pred-row",e.innerHTML=`
    <span class="pred-char">·</span>
    <div class="pred-bar"><div class="pred-fill"></div></div>
    <span class="pred-pct">—</span>
  `,YE.appendChild(e),ks.push({char:e.querySelector(".pred-char"),fill:e.querySelector(".pred-fill"),pct:e.querySelector(".pred-pct")})}function Eu(){const t=Ge.history.length>0?Ge.history[Ge.history.length-1].text:" ",e=Ge.model.encode(t),n=new Array(Ge.model.CTX);for(let a=0;a<Ge.model.CTX;a++){const o=e.length-Ge.model.CTX+a;n[a]=o>=0?e[o]:0}Ge.model.forward(n);const i=Ge.model.lastProbs,s=Ge.model.vocab.size,r=[];for(let a=1;a<s;a++){const o=Ge.model.invVocab[a];!o||o===`
`||r.push({ch:o,p:i[a]})}r.sort((a,o)=>o.p-a.p);for(let a=0;a<y_;a++){const o=r[a];if(o){const c=o.ch===" "?"␣":o.ch;ks[a].char.textContent=c,ks[a].fill.style.width=`${Math.round(o.p*100)}%`,ks[a].pct.textContent=(o.p*100).toFixed(1)+"%"}else ks[a].char.textContent="·",ks[a].fill.style.width="0%",ks[a].pct.textContent="—"}}const bu=document.getElementById("loss-spark"),Os=bu.getContext("2d"),gs=[];function qE(t){Number.isFinite(t)&&(gs.push(t),gs.length>100&&gs.shift(),$E())}function $E(){const t=bu.width,e=bu.height;if(Os.clearRect(0,0,t,e),gs.length<2)return;let n=-1/0,i=1/0;for(const r of gs)r>n&&(n=r),r<i&&(i=r);const s=Math.max(.15,n-i);Os.strokeStyle="rgba(255, 200, 80, 0.85)",Os.lineWidth=1.2,Os.beginPath();for(let r=0;r<gs.length;r++){const a=r/Math.max(1,gs.length-1)*(t-1)+.5,o=1+(n-gs[r])/s*(e-2);r===0?Os.moveTo(a,o):Os.lineTo(a,o)}Os.stroke()}const $i=document.getElementById("chat-msgs"),Ja=document.getElementById("chat-input"),Tu=document.getElementById("chat-send"),jE=document.getElementById("chat-reset"),KE=document.getElementById("chat-stats"),ZE=document.getElementById("chat-loss-fill");function Br(t,e){const n=document.createElement("div");n.className=`chat-msg ${t}`;const i=document.createElement("span");i.className="chat-msg-role",i.textContent=t;const s=document.createElement("span");s.className="chat-msg-text",s.textContent=" "+e,n.appendChild(i),n.appendChild(s),$i.appendChild(n),$i.scrollTop=$i.scrollHeight}function Uc(){const t=Ge.stats,e=t.lossEMA!=null?t.lossEMA.toFixed(2):"—",n=t.tokenCount?` · tokens ${t.tokenCount}`:"",i=t.memories!=null?` · mem ${t.memories}`:"";if(KE.textContent=`steps ${t.totalSteps} · loss ${e}${i}${n}`,t.lossEMA!=null){const s=Math.max(0,Math.min(1,1-t.lossEMA/5));ZE.style.width=`${Math.round(s*100)}%`}}function Wd(){if(Ge.history.length===0)Br("sys","Type a message in English. The brain learns from your input.");else for(const t of Ge.history)Br(t.role,t.text);Uc()}Wd();async function Xd(){const t=Ja.value.trim();!t||Ge.busy||(Ja.value="",Tu.disabled=!0,Br("user",t),pb(),await new Promise(e=>requestAnimationFrame(()=>requestAnimationFrame(e))),Mn("",`💬 training (${t.length} chars)`),await Ge.send(t),wu(t),Tu.disabled=!1)}Tu.addEventListener("click",Xd);Ja.addEventListener("keydown",t=>{t.key==="Enter"&&(t.preventDefault(),Xd())});jE.addEventListener("click",()=>{confirm("Reset model weights and memory?")&&(Ge.reset(),$i.innerHTML="",Wd(),vo(),Mn("","🔄 model reset"))});let gc=null,oh=!1,ds="";function JE(){const t=document.createElement("div");t.className="chat-msg ai";const e=document.createElement("span");e.className="chat-msg-role",e.textContent="ai";const n=document.createElement("span");n.className="chat-msg-text",n.textContent=" ",t.appendChild(e),t.appendChild(n),$i.appendChild(t),gc=n}function E_(t){if(t.type==="training-end"){vo(),Uc();const e=typeof t.avgLoss=="number"?t.avgLoss:0,n=typeof t.stepsRun=="number"?t.stepsRun:0;qE(e),Eu(),Mn("",`🧠 ${n} steps (loss ${e.toFixed(2)})`)}else if(t.type==="generate-token")to&&mb(),gc||JE(),gc.textContent=" "+t.partial,$i.scrollTop=$i.scrollHeight,oh=!0,wu(t.token),ds+=t.token,/[.!?。\n]\s*$/.test(ds)&&ds.trim().length>3&&(Wi.available&&Wi.speakChunk(ds.trim()),ds="");else if(t.type==="generate-end"){oh||Br("ai",t.text),gc=null,oh=!1,wu(t.text),Eu(),Wi.available&&ds.trim().length>0&&Wi.speakChunk(ds.trim()),ds="";const e=document.getElementById("processing");e&&(e.style.display="none");const n=document.getElementById("thinking");n&&n.classList.remove("on"),to=!1}else if(t.type==="state")Uc();else if(t.type==="loading")Br("sys",t.message);else if(t.type==="loading-progress"){const e=$i.lastElementChild;e!=null&&e.classList.contains("sys")&&(e.querySelector(".chat-msg-text").textContent=` Loading... ${t.progress}%`)}else t.type==="loading-done"&&Br("sys","Model loaded. Ready to chat!")}Ge.onEvent(E_);vo();Eu();const Wi=new DE,dn=document.getElementById("voice-status"),Au=document.getElementById("chat-mic");Wi.onEvent(t=>{t.type==="ready"&&(dn.textContent="🔈 Always listening — just talk",dn.className=""),t.type==="listening-start"&&(dn.textContent="🎤 Listening... (auto-send after 5s silence)",dn.className="listening",Au.classList.add("active")),t.type==="listening-stop"&&(dn.textContent="🔈 Always listening — just talk",dn.className="",Au.classList.remove("active"),t.text&&t.text.trim().length>0&&(Ja.value=t.text.trim(),Xd())),t.type==="transcript"&&(Ja.value=t.text),t.type==="speaking-start"&&(dn.textContent="🔊 AI speaking... (mic paused)",dn.className="speaking"),t.type==="speaking-end"&&(dn.textContent="🔈 Always listening — just talk",dn.className=""),t.type==="denied"&&(dn.textContent="🔇 Mic not allowed",dn.className=""),t.type==="error"&&(dn.textContent=`⚠ ${t.error}`,Wi.available&&setTimeout(()=>{dn.textContent="🔈 Always listening"},3e3))});Au.addEventListener("click",()=>{if(!Wi.available){dn.textContent="⚠ Voice not available. Allow microphone.";return}Wi.manualSend()});const QE=document.getElementById("settings-btn"),Qa=document.getElementById("settings-modal"),sa=document.getElementById("s-apikey"),bi=document.getElementById("s-endpoint"),Ss=document.getElementById("settings-status"),eb=document.getElementById("s-save"),tb=document.getElementById("s-test"),nb=document.getElementById("s-delete"),ib=document.getElementById("s-close");function b_(){let t=document.getElementById("mode-badge");if(!t){t=document.createElement("span"),t.id="mode-badge",t.className="mode-badge cloud";const e=document.getElementById("chat-title");if(e)e.appendChild(t);else return}t.textContent="⬡ IRIS",t.style.color="#66BBFF",t.style.background="rgba(0,80,255,0.15)",t.style.borderColor="#66BBFF"}b_();function Yd(){Qa.style.display="none",Qa.classList.remove("open")}QE.addEventListener("click",()=>{const t=localStorage.getItem(ol)??"",e=localStorage.getItem(cl)??"https://whatpull-iris-assistant.hf.space";sa&&(sa.value=t),bi&&(bi.value=e),Ss&&(Ss.textContent=""),Qa.style.display="flex"});ib.addEventListener("click",Yd);Qa.addEventListener("click",t=>{t.target===Qa&&Yd()});tb.addEventListener("click",async()=>{const t=sa.value.trim(),e=(bi==null?void 0:bi.value.trim())??"";if(!t){Ss.textContent="Please enter IRIS X-API-Key.";return}Ss.textContent="Testing...";const n=new Vd;n.setApiKey(t),e&&n.setEndpoint(e);const i=await n.testConnection();Ss.textContent=i.ok?`✓ ${i.msg}`:`✗ ${i.msg}`});function sb(t,e){Ge=t,Ge.onEvent(E_),$i.innerHTML="",Wd(),vo(),b_(),Uc(),Yd(),Mn("",e)}eb.addEventListener("click",()=>{const t=sa.value.trim(),e=(bi==null?void 0:bi.value.trim())??"";if(!t){Ss.textContent="Please enter IRIS X-API-Key.";return}localStorage.setItem(ol,t),e&&localStorage.setItem(cl,e);const n=new Vd;n.setApiKey(t),e&&n.setEndpoint(e),sb(n,"⬡ IRIS mode"),Ss.textContent="✓ Now using IRIS Assistant."});nb.addEventListener("click",()=>{localStorage.removeItem(ol),localStorage.removeItem(cl),sa&&(sa.value=""),bi&&(bi.value="https://whatpull-iris-assistant.hf.space"),Ss.textContent="Key & endpoint cleared."});function rb(){for(let t=0;t<In[0];t++){const e=si[0][t].activation;x_[t].style.height=`${Math.round(e*100)}%`,M_[t].textContent=String(Math.round(e*100)).padStart(2,"0")}for(const t of S_){let e=0,n=0;for(const s of si[t.layerIdx]){const r=pc.get(s);if(r)for(const a of r)a.intra||(e+=a.weight,n++)}const i=n>0?e/n:0;t.fill.style.width=`${Math.round(i*100)}%`,t.val.textContent=i.toFixed(2)}}console.log(`[handface] nodes: ${qi.length}, edges: ${Yn.length}`);for(const t of Yn)t.weight=t.targetWeight=.3+Math.random()*.5;const qd=10,eo=qd*2,ic=new D,wm=new D,Pr=new D,ab=new D(0,1,0);Yn.forEach((t,e)=>{ic.subVectors(t.dst.pos,t.src.pos);const n=ic.length(),i=(e*9301+49297)%233280/233280;wm.copy(ic).normalize(),Pr.crossVectors(ic,ab),Pr.lengthSq()<1e-6&&Pr.set(1,0,0),Pr.normalize(),Pr.applyAxisAngle(wm,i*Math.PI*2);const s=n*(.1+i*.08)*(t.intra?1.4:1),r=new D().addVectors(t.src.pos,t.dst.pos).multiplyScalar(.5).addScaledVector(Pr,s);t.curve=new nv(t.src.pos.clone(),r,t.dst.pos.clone()),t.curvePoints=t.curve.getPoints(qd)});const zs=new Float32Array(Yn.length*eo*3),gi=new Float32Array(Yn.length*eo*3);Yn.forEach((t,e)=>{const n=e*eo*3,i=t.weight*.12;for(let s=0;s<qd;s++){const r=t.curvePoints[s],a=t.curvePoints[s+1],o=n+s*6;zs[o+0]=r.x,zs[o+1]=r.y,zs[o+2]=r.z,zs[o+3]=a.x,zs[o+4]=a.y,zs[o+5]=a.z,gi[o+0]=i,gi[o+1]=i*.4,gi[o+2]=i*.05,gi[o+3]=i,gi[o+4]=i*.4,gi[o+5]=i*.05}});const ll=new Ht;ll.setAttribute("position",new ln(zs,3));ll.setAttribute("color",new ln(gi,3));Ts.add(new Ac(ll,new Ur({vertexColors:!0,blending:Ti,transparent:!0,depthWrite:!1})));const Wa=new Float32Array(qi.length*3),er=new Float32Array(qi.length*3),tr=new Float32Array(qi.length*3);qi.forEach((t,e)=>{Wa[e*3]=t.pos.x,Wa[e*3+1]=t.pos.y,Wa[e*3+2]=t.pos.z,er[e*3+0]=.08,er[e*3+1]=.03,er[e*3+2]=.01,tr[e*3+0]=.2,tr[e*3+1]=.08,tr[e*3+2]=.02});function T_(t,e,n,i){const s=new Ht;return s.setAttribute("position",new ln(n,3)),s.setAttribute("color",new ln(t,3)),Ts.add(new Fr(s,new _s({vertexColors:!0,size:e,map:i,alphaTest:.01,blending:Ti,transparent:!0,depthWrite:!1}))),s}const ob=T_(er,.18,Wa,OE),cb=T_(tr,.065,Wa,Hd),$d=1200,pi=[],_c=new Float32Array($d*3),vc=new Float32Array($d*3),nr=new Ht;nr.setAttribute("position",new ln(_c,3));nr.setAttribute("color",new ln(vc,3));nr.setDrawRange(0,0);Ts.add(new Fr(nr,new _s({vertexColors:!0,size:.11,map:Hd,alphaTest:.01,blending:Ti,transparent:!0,depthWrite:!1})));function Ua(t,e=0){pi.length>=$d||pi.push({edge:t,t:e,speed:.008+t.weight*.018+Math.random()*.007})}const hl=new Ys;Ts.add(hl);const A_=new gn(new oo(.08,20,20),new la({color:16772812,blending:Ti,transparent:!0,opacity:.7,depthWrite:!1}));hl.add(A_);const w_=new gn(new oo(.28,20,20),new la({color:16746547,blending:Ti,transparent:!0,opacity:.1,depthWrite:!1}));hl.add(w_);const R_=new la({color:16764040,blending:Ti,transparent:!0,opacity:0,depthWrite:!1,side:pn}),kr=new gn(new oo(1,32,24),R_);kr.scale.setScalar(.3);kr.visible=!1;hl.add(kr);let fi=0,Rm=0;const Sn={xH:12,yF:-4,yC:8,zB:-14,zF:10,step:2},ra=Sn.xH*2,aa=Sn.yC-Sn.yF,As=Sn.zF-Sn.zB,jd=(Sn.yF+Sn.yC)/2,ul=(Sn.zB+Sn.zF)/2,lb=new la({color:264208,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1});function hb(t,e,n,i){const s=[],r=t/2,a=e/2,o=Sn.step;for(let l=-r;l<=r+.01;l+=o)s.push(l,-a,0,l,a,0);for(let l=-a;l<=a+.01;l+=o)s.push(-r,l,0,r,l,0);const c=new Ht;return c.setAttribute("position",new Rt(s,3)),new Ac(c,new Ur({color:n,transparent:!0,opacity:i,depthWrite:!1}))}function _o(t,e,n,i,s,r,a){const o=new gn(new ao(t,e),lb);o.position.set(...n),i&&o.rotation.set(...i),na.add(o);const c=hb(s,r,2284902,a);c.position.set(...n),i&&c.rotation.set(...i),na.add(c)}_o(ra,As,[0,Sn.yF,ul],[-Math.PI/2,0,0],ra,As,.28);_o(ra,As,[0,Sn.yC,ul],[Math.PI/2,0,0],ra,As,.14);_o(As,aa,[-12,jd,ul],[0,Math.PI/2,0],As,aa,.22);_o(As,aa,[Sn.xH,jd,ul],[0,-Math.PI/2,0],As,aa,.22);_o(ra,aa,[0,jd,Sn.zB],[0,0,0],ra,aa,.18);na.fog=new Gu(132104,.02);const C_=2200,xc=new Float32Array(C_*3);for(let t=0;t<C_;t++){const e=8+Math.random()*22,n=2*Math.PI*Math.random(),i=Math.acos(2*Math.random()-1);xc[t*3]=e*Math.sin(i)*Math.cos(n),xc[t*3+1]=e*Math.sin(i)*Math.sin(n),xc[t*3+2]=e*Math.cos(i)}const P_=new Ht;P_.setAttribute("position",new Rt(xc,3));const L_=new Fr(P_,new _s({color:16764057,size:.022,map:Hd,alphaTest:.01,blending:Ti,transparent:!0,opacity:.32,depthWrite:!1}));na.add(L_);let Cm=0;const ub=280,db=600;function wu(t=null){const e=t||(Ge.history.length>0?Ge.history[Ge.history.length-1].text:"hi"),n=Ge.model.encode(e),i=new Array(Ge.model.CTX);for(let u=0;u<Ge.model.CTX;u++){const f=n.length-Ge.model.CTX+u;i[u]=f>=0?n[f]:0}Ge.model.forward(i);const s=Ge.model.vocab.size,r=new Float32Array(Ge.model.lastX),a=new Float32Array(Ge.model.lastH1),o=new Float32Array(Ge.model.lastH2),c=new Float32Array(Ge.model.lastH3),l=new Float32Array(Ge.model.lastProbs.subarray(0,s)),h=[r,a,a,o,o,c,l],d=[r.length,a.length,a.length,o.length,o.length,c.length,l.length];for(let u=0;u<In.length;u++)setTimeout(()=>{const f=h[u],g=d[u],M=si[u];let m=1e-6;for(let S=0;S<g;S++){const T=Math.abs(f[S]);T>m&&(m=T)}const p=1/m;for(let S=0;S<M.length;S++){const T=Math.min(g-1,Math.floor(S/M.length*g)),y=Math.abs(f[T])*p;M[S].targetActivation=.08+.92*y}if(u<In.length-1)for(const S of M){if(S.targetActivation<.2)continue;const T=mc.get(S);if(T)for(const y of T){if(y.intra)continue;const w=y.weight*S.targetActivation;Ua(y,0),Ua(y,.03+Math.random()*.04),w>.4&&Ua(y,.07+Math.random()*.05),w>.6&&Ua(y,.12+Math.random()*.05),w>.8&&Ua(y,.18+Math.random()*.05)}}},u*ub)}function vo(){const t=[Ge.model.W1,Ge.model.W2,Ge.model.W3,Ge.model.W4];for(const e of Yn){const n=Math.min(t.length-1,Math.floor(e.src.layerIdx*t.length/(In.length-1))),i=t[n],s=i.length,r=i[0].length,a=e.src.layerIdx,o=e.intra?a:e.dst.layerIdx,c=In[a],l=In[o],h=Math.min(s-1,Math.floor(e.src.layerLocalIdx/c*s)),d=Math.min(r-1,Math.floor(e.dst.layerLocalIdx/l*r)),u=Math.abs(i[h][d]||0);e.targetWeight=Math.max(.05,Math.min(1,u*5))}}const an=new PE({handedness:"right",cursorSource:"hand",cursorAnchor:"index"});let ch=0,lh=0,ir=0,Kd=0,Ru=0,Cu=0,Pm=0,Lm=0,Fa=0,Na=0,Im=!1;const Dm=.25;an.on("move",t=>{const e=an.handLandmarks;if(e&&e[8]){const n=(1-e[8].x)*window.innerWidth,i=e[8].y*window.innerHeight;Im?(Fa+=(n-Fa)*Dm,Na+=(i-Na)*Dm):(Fa=n,Na=i,Im=!0),xs.style.left=`${Fa}px`,xs.style.top=`${Na}px`,bm.textContent=`${Math.round(Fa)} · ${Math.round(Na)}`}else xs.style.left=`${t.screenX}px`,xs.style.top=`${t.screenY}px`,bm.textContent=`${t.screenX} · ${t.screenY}`});window.addEventListener("mousemove",t=>{xs.style.left=`${t.clientX}px`,xs.style.top=`${t.clientY}px`});an.on("mousedown",()=>{xs.classList.add("clicking"),Mn("","⬇ mousedown")});an.on("mouseup",()=>{xs.classList.remove("clicking"),Mn("","⬆ mouseup")});an.on("click",()=>{Lm++,FE.textContent=String(Lm),Mn("ev-click","🤏 click")});an.on("dblclick",()=>{Mn("ev-click","🤏🤏 dblclick")});let Zd=!1;an.on("dragstart",t=>{Ru=t.screenX,Cu=t.screenY,Zd=!0,Mn("","↔ dragstart")});an.on("drag",t=>{const e=Math.max(-30,Math.min(30,t.screenX-Ru)),n=Math.max(-30,Math.min(30,t.screenY-Cu));Kd+=e*.004,ir+=n*.003,ir=Math.max(-1.2,Math.min(1.2,ir)),Ru=t.screenX,Cu=t.screenY});an.on("dragend",()=>{Zd=!1,Mn("","↔ dragend")});let Jd=!1,Pu=0,Lu=0;window.addEventListener("mousedown",t=>{Jd=!0,Pu=t.clientX,Lu=t.clientY});window.addEventListener("mouseup",()=>{Jd=!1});window.addEventListener("mousemove",t=>{Jd&&(Kd+=(t.clientX-Pu)*.005,ir+=(t.clientY-Lu)*.004,ir=Math.max(-1.2,Math.min(1.2,ir)),Pu=t.clientX,Lu=t.clientY)});an.on("scroll",t=>{fc=Math.max(4,Math.min(15,fc+t.deltaY*.055));const e=Math.round((1-(fc-4)/11)*100);NE.textContent=`${e}%`,Mn("ev-scroll",t.deltaY>0?"🤲 zoom out":"🤲 zoom in")});const fb={thumbsup:{label:"👍 thumbs up"},victory:{label:"✌️ victory"}};for(const[t,e]of Object.entries(fb))an.on(t,()=>Mn("",e.label));const sc=new D;let to=!1,Um=0;const I_=document.getElementById("thinking");function pb(){I_.classList.add("on"),to=!0}function mb(){I_.classList.remove("on"),to=!1}let hh=0;function D_(){if(requestAnimationFrame(D_),to)return;const t=performance.now();if(t-Um<1e3/60)return;Um=t,hh+=.011,t-Cm>db&&(Cm=t,vo());for(const i of Yn)i.weight+=(i.targetWeight-i.weight)*.012;for(const i of qi)i.targetActivation*=.993,i.activation+=(i.targetActivation-i.activation)*.07,i.activation<4e-4&&(i.activation=0);let e=0;for(const i of si[0])e+=i.activation;e/=si[0].length,A_.material.opacity=.55+.3*e+.06*Math.sin(hh*2.5)+.6*fi,w_.material.opacity=.08+.18*e+.03*Math.sin(hh*1.5)+.25*fi;const n=e-Rm;if(Rm=e,n>.05&&(fi=1),fi>0){kr.visible=!0;const i=1-fi,s=1-Math.pow(1-i,3);kr.scale.setScalar(.3+s*5.5),R_.opacity=fi*fi*.45,fi-=.025,fi<=0&&(fi=0,kr.visible=!1)}if(!Zd){for(let i=0;i<Yn.length;i++){const s=Yn[i],r=Math.max(s.src.activation*.8,s.dst.activation*.65),a=s.weight*(.12+.88*r),o=a*1,c=a*.4,l=a*.05,h=i*eo*3;for(let d=0;d<eo;d++){const u=h+d*3;gi[u]=o,gi[u+1]=c,gi[u+2]=l}}ll.attributes.color.needsUpdate=!0;for(let i=0;i<qi.length;i++){const s=qi[i].activation;er[i*3+0]=.08+s*.52,er[i*3+1]=.03+s*.2,er[i*3+2]=.01+s*.03,tr[i*3+0]=.2+s*.8,tr[i*3+1]=.08+s*.68,tr[i*3+2]=.02+s*.18}ob.attributes.color.needsUpdate=!0,cb.attributes.color.needsUpdate=!0;for(let i=pi.length-1;i>=0;i--)pi[i].t+=pi[i].speed,pi[i].t>=1&&pi.splice(i,1);for(let i=0;i<pi.length;i++){const s=pi[i];s.edge.curve.getPoint(s.t,sc),_c[i*3]=sc.x,_c[i*3+1]=sc.y,_c[i*3+2]=sc.z;const r=s.t<.12?s.t/.12:s.t>.8?(1-s.t)/.2:1,a=(.55+s.edge.weight*.45)*r;vc[i*3]=a,vc[i*3+1]=a*.88,vc[i*3+2]=a*.42}nr.setDrawRange(0,pi.length),nr.attributes.position.needsUpdate=!0,nr.attributes.color.needsUpdate=!0}Pm+=.0015,ch+=(ir-ch)*.12,lh+=(Kd-lh)*.12,Ts.rotation.x=ch,Ts.rotation.y=Pm+lh,ah+=(fc-ah)*.055,ia.position.z=ah,L_.rotation.y+=35e-6,rb(),Ea.render(na,ia)}D_();Da.addEventListener("click",async()=>{Da.disabled=!0,Da.textContent="LOADING...",rh.textContent="INIT";try{nc.textContent="Loading MediaPipe (5-10s)...",await an.start(),an.createPanel(),Ge._ensureModel&&(nc.textContent="Loading AI model...",await Ge._ensureModel()),nc.textContent="Setting up voice...";try{await Wi.init()}catch{}const t=document.getElementById("cam-preview"),e=document.getElementById("cam-toggle");an.mediaStream&&t&&(t.srcObject=an.mediaStream),e.textContent="📷 HIDE",e==null||e.addEventListener("click",()=>{const n=t.style.display!=="block";t.style.display=n?"block":"none",e.textContent=n?"📷 HIDE":"📷 CAM"}),rh.textContent="ACTIVE",Tm.classList.add("fade-out"),setTimeout(()=>{Tm.style.display="none"},650),Mn("","start"),document.addEventListener("keydown",n=>{(n.key==="r"||n.key==="R")&&(an.recalibrate(),Mn("","recalibrated"))})}catch(t){rh.textContent="ERROR",nc.textContent=`Error: ${t.message}`,Da.disabled=!1,Da.textContent="RETRY",console.error(t)}});window.addEventListener("resize",()=>{ia.aspect=window.innerWidth/window.innerHeight,ia.updateProjectionMatrix(),Ea.setSize(window.innerWidth,window.innerHeight)});
