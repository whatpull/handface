var k_=Object.defineProperty;var z_=(e,t,n)=>t in e?k_(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Lt=(e,t,n)=>z_(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Iu="183",V_=0,of=1,H_=2,sc=1,G_=2,Oa=3,ws=0,mn=1,Si=2,Ji=0,Dr=1,Ii=2,cf=3,lf=4,W_=5,Gs=100,X_=101,Y_=102,q_=103,$_=104,j_=200,K_=201,Z_=202,J_=203,uh=204,dh=205,Q_=206,t1=207,e1=208,n1=209,i1=210,s1=211,r1=212,a1=213,o1=214,fh=0,ph=1,mh=2,Vr=3,gh=4,_h=5,vh=6,xh=7,Du=0,c1=1,l1=2,Ci=0,Fm=1,Nm=2,Om=3,Bm=4,km=5,zm=6,Vm=7,Hm=300,sr=301,Hr=302,dl=303,fl=304,Uc=306,Mh=1e3,Ki=1001,yh=1002,tn=1003,h1=1004,xo=1005,Ze=1006,pl=1007,Ys=1008,Kn=1009,Gm=1010,Wm=1011,Xa=1012,Uu=1013,Di=1014,bi=1015,es=1016,Fu=1017,Nu=1018,Ya=1020,Xm=35902,Ym=35899,qm=1021,$m=1022,li=1023,ns=1026,qs=1027,jm=1028,Ou=1029,Gr=1030,Bu=1031,ku=1033,rc=33776,ac=33777,oc=33778,cc=33779,Sh=35840,Eh=35841,bh=35842,Ah=35843,Th=36196,wh=37492,Ch=37496,Rh=37488,Ph=37489,Lh=37490,Ih=37491,Dh=37808,Uh=37809,Fh=37810,Nh=37811,Oh=37812,Bh=37813,kh=37814,zh=37815,Vh=37816,Hh=37817,Gh=37818,Wh=37819,Xh=37820,Yh=37821,qh=36492,$h=36494,jh=36495,Kh=36283,Zh=36284,Jh=36285,Qh=36286,u1=3200,Km=0,d1=1,Ms="",Ln="srgb",Wr="srgb-linear",_c="linear",oe="srgb",fr=7680,hf=519,f1=512,p1=513,m1=514,zu=515,g1=516,_1=517,Vu=518,v1=519,uf=35044,df="300 es",Ai=2e3,vc=2001;function x1(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function xc(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function M1(){const e=xc("canvas");return e.style.display="block",e}const ff={};function pf(...e){const t="THREE."+e.shift();console.log(t,...e)}function Zm(e){const t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){const n=e[1];n&&n.isStackTrace?e[0]+=" "+n.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function Ft(...e){e=Zm(e);const t="THREE."+e.shift();{const n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function te(...e){e=Zm(e);const t="THREE."+e.shift();{const n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Mc(...e){const t=e.join(" ");t in ff||(ff[t]=!0,Ft(...e))}function y1(e,t,n){return new Promise(function(i,s){function r(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:s();break;case e.TIMEOUT_EXPIRED:setTimeout(r,n);break;default:i()}}setTimeout(r,n)})}const S1={[fh]:ph,[mh]:vh,[gh]:xh,[Vr]:_h,[ph]:fh,[vh]:mh,[xh]:gh,[_h]:Vr};class ca{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(n);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const n=this._listeners;if(n===void 0)return;const i=n[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ml=Math.PI/180,tu=180/Math.PI;function to(){const e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(sn[e&255]+sn[e>>8&255]+sn[e>>16&255]+sn[e>>24&255]+"-"+sn[t&255]+sn[t>>8&255]+"-"+sn[t>>16&15|64]+sn[t>>24&255]+"-"+sn[n&63|128]+sn[n>>8&255]+"-"+sn[n>>16&255]+sn[n>>24&255]+sn[i&255]+sn[i>>8&255]+sn[i>>16&255]+sn[i>>24&255]).toLowerCase()}function qt(e,t,n){return Math.max(t,Math.min(n,e))}function E1(e,t){return(e%t+t)%t}function gl(e,t,n){return(1-n)*e+n*t}function Aa(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function vn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}class se{constructor(t=0,n=0){se.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,i=this.y,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6],this.y=s[1]*n+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=qt(this.x,t.x,n.x),this.y=qt(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=qt(this.x,t,n),this.y=qt(this.y,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const i=Math.cos(n),s=Math.sin(n),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class la{constructor(t=0,n=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=s}static slerpFlat(t,n,i,s,r,a,o){let c=i[s+0],l=i[s+1],h=i[s+2],d=i[s+3],u=r[a+0],f=r[a+1],g=r[a+2],x=r[a+3];if(d!==x||c!==u||l!==f||h!==g){let m=c*u+l*f+h*g+d*x;m<0&&(u=-u,f=-f,g=-g,x=-x,m=-m);let p=1-o;if(m<.9995){const y=Math.acos(m),A=Math.sin(y);p=Math.sin(p*y)/A,o=Math.sin(o*y)/A,c=c*p+u*o,l=l*p+f*o,h=h*p+g*o,d=d*p+x*o}else{c=c*p+u*o,l=l*p+f*o,h=h*p+g*o,d=d*p+x*o;const y=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=y,l*=y,h*=y,d*=y}}t[n]=c,t[n+1]=l,t[n+2]=h,t[n+3]=d}static multiplyQuaternionsFlat(t,n,i,s,r,a){const o=i[s],c=i[s+1],l=i[s+2],h=i[s+3],d=r[a],u=r[a+1],f=r[a+2],g=r[a+3];return t[n]=o*g+h*d+c*f-l*u,t[n+1]=c*g+h*u+l*d-o*f,t[n+2]=l*g+h*f+o*u-c*d,t[n+3]=h*g-o*d-c*u-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,s){return this._x=t,this._y=n,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(s/2),d=o(r/2),u=c(i/2),f=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"YZX":this._x=u*h*d+l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d-u*f*g;break;case"XZY":this._x=u*h*d-l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d+u*f*g;break;default:Ft("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const i=n/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,i=n[0],s=n[4],r=n[8],a=n[1],o=n[5],c=n[9],l=n[2],h=n[6],d=n[10],u=i+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(i>o&&i>d){const f=2*Math.sqrt(1+i-o-d);this._w=(h-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>d){const f=2*Math.sqrt(1+o-i-d);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-i-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(qt(this.dot(t),-1,1)))}rotateTowards(t,n){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,n/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const i=t._x,s=t._y,r=t._z,a=t._w,o=n._x,c=n._y,l=n._z,h=n._w;return this._x=i*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-i*l,this._z=r*h+a*l+i*c-s*o,this._w=a*h-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,n){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let c=1-n;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,n=Math.sin(n*l)/h,this._x=this._x*c+i*n,this._y=this._y*c+s*n,this._z=this._z*c+r*n,this._w=this._w*c+a*n,this._onChangeCallback()}else this._x=this._x*c+i*n,this._y=this._y*c+s*n,this._z=this._z*c+r*n,this._w=this._w*c+a*n,this.normalize();return this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(n),r*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(t=0,n=0,i=0){D.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(mf.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(mf.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*n+r[3]*i+r[6]*s,this.y=r[1]*n+r[4]*i+r[7]*s,this.z=r[2]*n+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*n+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*n+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*n+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*n+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){const n=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*i),h=2*(o*n-r*s),d=2*(r*i-a*n);return this.x=n+c*l+a*d-o*h,this.y=i+c*h+o*l-r*d,this.z=s+c*d+r*h-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*s,this.y=r[1]*n+r[5]*i+r[9]*s,this.z=r[2]*n+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=qt(this.x,t.x,n.x),this.y=qt(this.y,t.y,n.y),this.z=qt(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=qt(this.x,t,n),this.y=qt(this.y,t,n),this.z=qt(this.z,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const i=t.x,s=t.y,r=t.z,a=n.x,o=n.y,c=n.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return _l.copy(this).projectOnVector(t),this.sub(_l)}reflect(t){return this.sub(_l.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return n*n+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){const s=Math.sin(n)*t;return this.x=s*Math.sin(i),this.y=Math.cos(n)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=s,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const _l=new D,mf=new la;class Ht{constructor(t,n,i,s,r,a,o,c,l){Ht.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,s,r,a,o,c,l)}set(t,n,i,s,r,a,o,c,l){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=n,h[4]=r,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,s=n.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],d=i[7],u=i[2],f=i[5],g=i[8],x=s[0],m=s[3],p=s[6],y=s[1],A=s[4],S=s[7],w=s[2],T=s[5],C=s[8];return r[0]=a*x+o*y+c*w,r[3]=a*m+o*A+c*T,r[6]=a*p+o*S+c*C,r[1]=l*x+h*y+d*w,r[4]=l*m+h*A+d*T,r[7]=l*p+h*S+d*C,r[2]=u*x+f*y+g*w,r[5]=u*m+f*A+g*T,r[8]=u*p+f*S+g*C,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8];return n*a*h-n*o*l-i*r*h+i*o*c+s*r*l-s*a*c}invert(){const t=this.elements,n=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=h*a-o*l,u=o*c-h*r,f=l*r-a*c,g=n*d+i*u+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=d*x,t[1]=(s*l-h*i)*x,t[2]=(o*i-s*a)*x,t[3]=u*x,t[4]=(h*n-s*c)*x,t[5]=(s*r-o*n)*x,t[6]=f*x,t[7]=(i*c-l*n)*x,t[8]=(a*n-i*r)*x,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+n,0,0,1),this}scale(t,n){return this.premultiply(vl.makeScale(t,n)),this}rotate(t){return this.premultiply(vl.makeRotation(-t)),this}translate(t,n){return this.premultiply(vl.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,i=t.elements;for(let s=0;s<9;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const vl=new Ht,gf=new Ht().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),_f=new Ht().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function b1(){const e={enabled:!0,workingColorSpace:Wr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===oe&&(s.r=Qi(s.r),s.g=Qi(s.g),s.b=Qi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===oe&&(s.r=Ur(s.r),s.g=Ur(s.g),s.b=Ur(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ms?_c:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Mc("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Mc("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[Wr]:{primaries:t,whitePoint:i,transfer:_c,toXYZ:gf,fromXYZ:_f,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Ln},outputColorSpaceConfig:{drawingBufferColorSpace:Ln}},[Ln]:{primaries:t,whitePoint:i,transfer:oe,toXYZ:gf,fromXYZ:_f,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Ln}}}),e}const Zt=b1();function Qi(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function Ur(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}let pr;class A1{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{pr===void 0&&(pr=xc("canvas")),pr.width=t.width,pr.height=t.height;const s=pr.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=pr}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=xc("canvas");n.width=t.width,n.height=t.height;const i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Qi(r[a]/255)*255;return i.putImageData(s,0,0),n}else if(t.data){const n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Qi(n[i]/255)*255):n[i]=Qi(n[i]);return{data:n,width:t.width,height:t.height}}else return Ft("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let T1=0;class Hu{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:T1++}),this.uuid=to(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayHeight,n.displayWidth,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(xl(s[a].image)):r.push(xl(s[a]))}else r=xl(s);i.url=r}return n||(t.images[this.uuid]=i),i}}function xl(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?A1.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(Ft("Texture: Unable to serialize Texture."),{})}let w1=0;const Ml=new D;class hn extends ca{constructor(t=hn.DEFAULT_IMAGE,n=hn.DEFAULT_MAPPING,i=Ki,s=Ki,r=Ze,a=Ys,o=li,c=Kn,l=hn.DEFAULT_ANISOTROPY,h=Ms){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:w1++}),this.uuid=to(),this.name="",this.source=new Hu(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new se(0,0),this.repeat=new se(1,1),this.center=new se(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ht,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ml).x}get height(){return this.source.getSize(Ml).y}get depth(){return this.source.getSize(Ml).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const n in t){const i=t[n];if(i===void 0){Ft(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const s=this[n];if(s===void 0){Ft(`Texture.setValues(): property '${n}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Hm)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Mh:t.x=t.x-Math.floor(t.x);break;case Ki:t.x=t.x<0?0:1;break;case yh:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Mh:t.y=t.y-Math.floor(t.y);break;case Ki:t.y=t.y<0?0:1;break;case yh:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}hn.DEFAULT_IMAGE=null;hn.DEFAULT_MAPPING=Hm;hn.DEFAULT_ANISOTROPY=1;class De{constructor(t=0,n=0,i=0,s=1){De.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,s){return this.x=t,this.y=n,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*n+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*n+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*n+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*n+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,s,r;const c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],g=c[9],x=c[2],m=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+x)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const A=(l+1)/2,S=(f+1)/2,w=(p+1)/2,T=(h+u)/4,C=(d+x)/4,v=(g+m)/4;return A>S&&A>w?A<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(A),s=T/i,r=C/i):S>w?S<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(S),i=T/s,r=v/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=C/r,s=v/r),this.set(i,s,r,n),this}let y=Math.sqrt((m-g)*(m-g)+(d-x)*(d-x)+(u-h)*(u-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(d-x)/y,this.z=(u-h)/y,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=qt(this.x,t.x,n.x),this.y=qt(this.y,t.y,n.y),this.z=qt(this.z,t.z,n.z),this.w=qt(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=qt(this.x,t,n),this.y=qt(this.y,t,n),this.z=qt(this.z,t,n),this.w=qt(this.w,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class C1 extends ca{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ze,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new De(0,0,t,n),this.scissorTest=!1,this.viewport=new De(0,0,t,n),this.textures=[];const s={width:t,height:n,depth:i.depth},r=new hn(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const n={minFilter:Ze,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=n,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const s=Object.assign({},t.textures[n].image);this.textures[n].source=new Hu(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ri extends C1{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}}class Jm extends hn{constructor(t=null,n=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=tn,this.minFilter=tn,this.wrapR=Ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class R1 extends hn{constructor(t=null,n=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=tn,this.minFilter=tn,this.wrapR=Ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ae{constructor(t,n,i,s,r,a,o,c,l,h,d,u,f,g,x,m){Ae.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,s,r,a,o,c,l,h,d,u,f,g,x,m)}set(t,n,i,s,r,a,o,c,l,h,d,u,f,g,x,m){const p=this.elements;return p[0]=t,p[4]=n,p[8]=i,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ae().fromArray(this.elements)}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){const n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return this.determinant()===0?(t.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const n=this.elements,i=t.elements,s=1/mr.setFromMatrixColumn(t,0).length(),r=1/mr.setFromMatrixColumn(t,1).length(),a=1/mr.setFromMatrixColumn(t,2).length();return n[0]=i[0]*s,n[1]=i[1]*s,n[2]=i[2]*s,n[3]=0,n[4]=i[4]*r,n[5]=i[5]*r,n[6]=i[6]*r,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=a*h,f=a*d,g=o*h,x=o*d;n[0]=c*h,n[4]=-c*d,n[8]=l,n[1]=f+g*l,n[5]=u-x*l,n[9]=-o*c,n[2]=x-u*l,n[6]=g+f*l,n[10]=a*c}else if(t.order==="YXZ"){const u=c*h,f=c*d,g=l*h,x=l*d;n[0]=u+x*o,n[4]=g*o-f,n[8]=a*l,n[1]=a*d,n[5]=a*h,n[9]=-o,n[2]=f*o-g,n[6]=x+u*o,n[10]=a*c}else if(t.order==="ZXY"){const u=c*h,f=c*d,g=l*h,x=l*d;n[0]=u-x*o,n[4]=-a*d,n[8]=g+f*o,n[1]=f+g*o,n[5]=a*h,n[9]=x-u*o,n[2]=-a*l,n[6]=o,n[10]=a*c}else if(t.order==="ZYX"){const u=a*h,f=a*d,g=o*h,x=o*d;n[0]=c*h,n[4]=g*l-f,n[8]=u*l+x,n[1]=c*d,n[5]=x*l+u,n[9]=f*l-g,n[2]=-l,n[6]=o*c,n[10]=a*c}else if(t.order==="YZX"){const u=a*c,f=a*l,g=o*c,x=o*l;n[0]=c*h,n[4]=x-u*d,n[8]=g*d+f,n[1]=d,n[5]=a*h,n[9]=-o*h,n[2]=-l*h,n[6]=f*d+g,n[10]=u-x*d}else if(t.order==="XZY"){const u=a*c,f=a*l,g=o*c,x=o*l;n[0]=c*h,n[4]=-d,n[8]=l*h,n[1]=u*d+x,n[5]=a*h,n[9]=f*d-g,n[2]=g*d-f,n[6]=o*h,n[10]=x*d+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(P1,t,L1)}lookAt(t,n,i){const s=this.elements;return An.subVectors(t,n),An.lengthSq()===0&&(An.z=1),An.normalize(),hs.crossVectors(i,An),hs.lengthSq()===0&&(Math.abs(i.z)===1?An.x+=1e-4:An.z+=1e-4,An.normalize(),hs.crossVectors(i,An)),hs.normalize(),Mo.crossVectors(An,hs),s[0]=hs.x,s[4]=Mo.x,s[8]=An.x,s[1]=hs.y,s[5]=Mo.y,s[9]=An.y,s[2]=hs.z,s[6]=Mo.z,s[10]=An.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,s=n.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],d=i[5],u=i[9],f=i[13],g=i[2],x=i[6],m=i[10],p=i[14],y=i[3],A=i[7],S=i[11],w=i[15],T=s[0],C=s[4],v=s[8],E=s[12],Y=s[1],R=s[5],k=s[9],z=s[13],W=s[2],B=s[6],V=s[10],F=s[14],Q=s[3],j=s[7],lt=s[11],pt=s[15];return r[0]=a*T+o*Y+c*W+l*Q,r[4]=a*C+o*R+c*B+l*j,r[8]=a*v+o*k+c*V+l*lt,r[12]=a*E+o*z+c*F+l*pt,r[1]=h*T+d*Y+u*W+f*Q,r[5]=h*C+d*R+u*B+f*j,r[9]=h*v+d*k+u*V+f*lt,r[13]=h*E+d*z+u*F+f*pt,r[2]=g*T+x*Y+m*W+p*Q,r[6]=g*C+x*R+m*B+p*j,r[10]=g*v+x*k+m*V+p*lt,r[14]=g*E+x*z+m*F+p*pt,r[3]=y*T+A*Y+S*W+w*Q,r[7]=y*C+A*R+S*B+w*j,r[11]=y*v+A*k+S*V+w*lt,r[15]=y*E+A*z+S*F+w*pt,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],x=t[7],m=t[11],p=t[15],y=c*f-l*u,A=o*f-l*d,S=o*u-c*d,w=a*f-l*h,T=a*u-c*h,C=a*d-o*h;return n*(x*y-m*A+p*S)-i*(g*y-m*w+p*T)+s*(g*A-x*w+p*C)-r*(g*S-x*T+m*C)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=n,s[14]=i),this}invert(){const t=this.elements,n=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],x=t[13],m=t[14],p=t[15],y=n*o-i*a,A=n*c-s*a,S=n*l-r*a,w=i*c-s*o,T=i*l-r*o,C=s*l-r*c,v=h*x-d*g,E=h*m-u*g,Y=h*p-f*g,R=d*m-u*x,k=d*p-f*x,z=u*p-f*m,W=y*z-A*k+S*R+w*Y-T*E+C*v;if(W===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const B=1/W;return t[0]=(o*z-c*k+l*R)*B,t[1]=(s*k-i*z-r*R)*B,t[2]=(x*C-m*T+p*w)*B,t[3]=(u*T-d*C-f*w)*B,t[4]=(c*Y-a*z-l*E)*B,t[5]=(n*z-s*Y+r*E)*B,t[6]=(m*S-g*C-p*A)*B,t[7]=(h*C-u*S+f*A)*B,t[8]=(a*k-o*Y+l*v)*B,t[9]=(i*Y-n*k-r*v)*B,t[10]=(g*T-x*S+p*y)*B,t[11]=(d*S-h*T-f*y)*B,t[12]=(o*E-a*R-c*v)*B,t[13]=(n*R-i*E+s*v)*B,t[14]=(x*A-g*w-m*y)*B,t[15]=(h*w-d*A+u*y)*B,this}scale(t){const n=this.elements,i=t.x,s=t.y,r=t.z;return n[0]*=i,n[4]*=s,n[8]*=r,n[1]*=i,n[5]*=s,n[9]*=r,n[2]*=i,n[6]*=s,n[10]*=r,n[3]*=i,n[7]*=s,n[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,s))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const i=Math.cos(n),s=Math.sin(n),r=1-i,a=t.x,o=t.y,c=t.z,l=r*a,h=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+i,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,n,s,1,0,0,0,0,1),this}compose(t,n,i){const s=this.elements,r=n._x,a=n._y,o=n._z,c=n._w,l=r+r,h=a+a,d=o+o,u=r*l,f=r*h,g=r*d,x=a*h,m=a*d,p=o*d,y=c*l,A=c*h,S=c*d,w=i.x,T=i.y,C=i.z;return s[0]=(1-(x+p))*w,s[1]=(f+S)*w,s[2]=(g-A)*w,s[3]=0,s[4]=(f-S)*T,s[5]=(1-(u+p))*T,s[6]=(m+y)*T,s[7]=0,s[8]=(g+A)*C,s[9]=(m-y)*C,s[10]=(1-(u+x))*C,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,n,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinant();if(r===0)return i.set(1,1,1),n.identity(),this;let a=mr.set(s[0],s[1],s[2]).length();const o=mr.set(s[4],s[5],s[6]).length(),c=mr.set(s[8],s[9],s[10]).length();r<0&&(a=-a),ei.copy(this);const l=1/a,h=1/o,d=1/c;return ei.elements[0]*=l,ei.elements[1]*=l,ei.elements[2]*=l,ei.elements[4]*=h,ei.elements[5]*=h,ei.elements[6]*=h,ei.elements[8]*=d,ei.elements[9]*=d,ei.elements[10]*=d,n.setFromRotationMatrix(ei),i.x=a,i.y=o,i.z=c,this}makePerspective(t,n,i,s,r,a,o=Ai,c=!1){const l=this.elements,h=2*r/(n-t),d=2*r/(i-s),u=(n+t)/(n-t),f=(i+s)/(i-s);let g,x;if(c)g=r/(a-r),x=a*r/(a-r);else if(o===Ai)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===vc)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,n,i,s,r,a,o=Ai,c=!1){const l=this.elements,h=2/(n-t),d=2/(i-s),u=-(n+t)/(n-t),f=-(i+s)/(i-s);let g,x;if(c)g=1/(a-r),x=a/(a-r);else if(o===Ai)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===vc)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const n=this.elements,i=t.elements;for(let s=0;s<16;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}}const mr=new D,ei=new Ae,P1=new D(0,0,0),L1=new D(1,1,1),hs=new D,Mo=new D,An=new D,vf=new Ae,xf=new la;class Ui{constructor(t=0,n=0,i=0,s=Ui.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,s=this._order){return this._x=t,this._y=n,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],d=s[2],u=s[6],f=s[10];switch(n){case"XYZ":this._y=Math.asin(qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-qt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(qt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:Ft("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return vf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(vf,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return xf.setFromEuler(this),this.setFromQuaternion(xf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ui.DEFAULT_ORDER="XYZ";class Qm{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let I1=0;const Mf=new D,gr=new la,Gi=new Ae,yo=new D,Ta=new D,D1=new D,U1=new la,yf=new D(1,0,0),Sf=new D(0,1,0),Ef=new D(0,0,1),bf={type:"added"},F1={type:"removed"},_r={type:"childadded",child:null},yl={type:"childremoved",child:null};class gn extends ca{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:I1++}),this.uuid=to(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=gn.DEFAULT_UP.clone();const t=new D,n=new Ui,i=new la,s=new D(1,1,1);function r(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ae},normalMatrix:{value:new Ht}}),this.matrix=new Ae,this.matrixWorld=new Ae,this.matrixAutoUpdate=gn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Qm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return gr.setFromAxisAngle(t,n),this.quaternion.multiply(gr),this}rotateOnWorldAxis(t,n){return gr.setFromAxisAngle(t,n),this.quaternion.premultiply(gr),this}rotateX(t){return this.rotateOnAxis(yf,t)}rotateY(t){return this.rotateOnAxis(Sf,t)}rotateZ(t){return this.rotateOnAxis(Ef,t)}translateOnAxis(t,n){return Mf.copy(t).applyQuaternion(this.quaternion),this.position.add(Mf.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(yf,t)}translateY(t){return this.translateOnAxis(Sf,t)}translateZ(t){return this.translateOnAxis(Ef,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Gi.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?yo.copy(t):yo.set(t,n,i);const s=this.parent;this.updateWorldMatrix(!0,!1),Ta.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Gi.lookAt(Ta,yo,this.up):Gi.lookAt(yo,Ta,this.up),this.quaternion.setFromRotationMatrix(Gi),s&&(Gi.extractRotation(s.matrixWorld),gr.setFromRotationMatrix(Gi),this.quaternion.premultiply(gr.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(te("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(bf),_r.child=t,this.dispatchEvent(_r),_r.child=null):te("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(F1),yl.child=t,this.dispatchEvent(yl),yl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Gi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Gi.multiply(t.parent.matrixWorld)),t.applyMatrix4(Gi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(bf),_r.child=t,this.dispatchEvent(_r),_r.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(t,n);if(a!==void 0)return a}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ta,t,D1),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ta,U1,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const n=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=n-r[0]*n-r[4]*i-r[8]*s,r[13]+=i-r[1]*n-r[5]*i-r[9]*s,r[14]+=s-r[2]*n-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(n){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),h=a(t.images),d=a(t.shapes),u=a(t.skeletons),f=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),d.length>0&&(i.shapes=d),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),t.pivot!==null&&(this.pivot=t.pivot.clone()),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}gn.DEFAULT_UP=new D(0,1,0);gn.DEFAULT_MATRIX_AUTO_UPDATE=!0;gn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class $s extends gn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const N1={type:"move"};class Sl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new $s,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new $s,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new $s,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const x of t.hand.values()){const m=n.getJointPose(x,i),p=this._getHandJoint(l,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&u>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=n.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=n.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(N1)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const i=new $s;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}}const t0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},us={h:0,s:0,l:0},So={h:0,s:0,l:0};function El(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}class $t{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=Ln){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Zt.colorSpaceToWorking(this,n),this}setRGB(t,n,i,s=Zt.workingColorSpace){return this.r=t,this.g=n,this.b=i,Zt.colorSpaceToWorking(this,s),this}setHSL(t,n,i,s=Zt.workingColorSpace){if(t=E1(t,1),n=qt(n,0,1),i=qt(i,0,1),n===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+n):i+n-i*n,a=2*i-r;this.r=El(a,r,t+1/3),this.g=El(a,r,t),this.b=El(a,r,t-1/3)}return Zt.colorSpaceToWorking(this,s),this}setStyle(t,n=Ln){function i(r){r!==void 0&&parseFloat(r)<1&&Ft("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,n);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,n);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,n);break;default:Ft("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(r,16),n);Ft("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=Ln){const i=t0[t.toLowerCase()];return i!==void 0?this.setHex(i,n):Ft("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Qi(t.r),this.g=Qi(t.g),this.b=Qi(t.b),this}copyLinearToSRGB(t){return this.r=Ur(t.r),this.g=Ur(t.g),this.b=Ur(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ln){return Zt.workingToColorSpace(rn.copy(this),t),Math.round(qt(rn.r*255,0,255))*65536+Math.round(qt(rn.g*255,0,255))*256+Math.round(qt(rn.b*255,0,255))}getHexString(t=Ln){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Zt.workingColorSpace){Zt.workingToColorSpace(rn.copy(this),n);const i=rn.r,s=rn.g,r=rn.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case i:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-i)/d+2;break;case r:c=(i-s)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,n=Zt.workingColorSpace){return Zt.workingToColorSpace(rn.copy(this),n),t.r=rn.r,t.g=rn.g,t.b=rn.b,t}getStyle(t=Ln){Zt.workingToColorSpace(rn.copy(this),t);const n=rn.r,i=rn.g,s=rn.b;return t!==Ln?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,n,i){return this.getHSL(us),this.setHSL(us.h+t,us.s+n,us.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(us),t.getHSL(So);const i=gl(us.h,So.h,n),s=gl(us.s,So.s,n),r=gl(us.l,So.l,n);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*n+r[3]*i+r[6]*s,this.g=r[1]*n+r[4]*i+r[7]*s,this.b=r[2]*n+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const rn=new $t;$t.NAMES=t0;class Gu{constructor(t,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new $t(t),this.density=n}clone(){return new Gu(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class O1 extends gn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ui,this.environmentIntensity=1,this.environmentRotation=new Ui,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const ni=new D,Wi=new D,bl=new D,Xi=new D,vr=new D,xr=new D,Af=new D,Al=new D,Tl=new D,wl=new D,Cl=new De,Rl=new De,Pl=new De;class ri{constructor(t=new D,n=new D,i=new D){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,s){s.subVectors(i,n),ni.subVectors(t,n),s.cross(ni);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,n,i,s,r){ni.subVectors(s,n),Wi.subVectors(i,n),bl.subVectors(t,n);const a=ni.dot(ni),o=ni.dot(Wi),c=ni.dot(bl),l=Wi.dot(Wi),h=Wi.dot(bl),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(l*c-o*h)*u,g=(a*h-o*c)*u;return r.set(1-f-g,g,f)}static containsPoint(t,n,i,s){return this.getBarycoord(t,n,i,s,Xi)===null?!1:Xi.x>=0&&Xi.y>=0&&Xi.x+Xi.y<=1}static getInterpolation(t,n,i,s,r,a,o,c){return this.getBarycoord(t,n,i,s,Xi)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Xi.x),c.addScaledVector(a,Xi.y),c.addScaledVector(o,Xi.z),c)}static getInterpolatedAttribute(t,n,i,s,r,a){return Cl.setScalar(0),Rl.setScalar(0),Pl.setScalar(0),Cl.fromBufferAttribute(t,n),Rl.fromBufferAttribute(t,i),Pl.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Cl,r.x),a.addScaledVector(Rl,r.y),a.addScaledVector(Pl,r.z),a}static isFrontFacing(t,n,i,s){return ni.subVectors(i,n),Wi.subVectors(t,n),ni.cross(Wi).dot(s)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,s){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,n,i,s){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ni.subVectors(this.c,this.b),Wi.subVectors(this.a,this.b),ni.cross(Wi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return ri.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return ri.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,s,r){return ri.getInterpolation(t,this.a,this.b,this.c,n,i,s,r)}containsPoint(t){return ri.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return ri.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const i=this.a,s=this.b,r=this.c;let a,o;vr.subVectors(s,i),xr.subVectors(r,i),Al.subVectors(t,i);const c=vr.dot(Al),l=xr.dot(Al);if(c<=0&&l<=0)return n.copy(i);Tl.subVectors(t,s);const h=vr.dot(Tl),d=xr.dot(Tl);if(h>=0&&d<=h)return n.copy(s);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),n.copy(i).addScaledVector(vr,a);wl.subVectors(t,r);const f=vr.dot(wl),g=xr.dot(wl);if(g>=0&&f<=g)return n.copy(r);const x=f*l-c*g;if(x<=0&&l>=0&&g<=0)return o=l/(l-g),n.copy(i).addScaledVector(xr,o);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return Af.subVectors(r,s),o=(d-h)/(d-h+(f-g)),n.copy(s).addScaledVector(Af,o);const p=1/(m+x+u);return a=x*p,o=u*p,n.copy(i).addScaledVector(vr,a).addScaledVector(xr,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class eo{constructor(t=new D(1/0,1/0,1/0),n=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(ii.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(ii.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const i=ii.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(n===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,ii):ii.fromBufferAttribute(r,a),ii.applyMatrix4(t.matrixWorld),this.expandByPoint(ii);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Eo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Eo.copy(i.boundingBox)),Eo.applyMatrix4(t.matrixWorld),this.union(Eo)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ii),ii.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(wa),bo.subVectors(this.max,wa),Mr.subVectors(t.a,wa),yr.subVectors(t.b,wa),Sr.subVectors(t.c,wa),ds.subVectors(yr,Mr),fs.subVectors(Sr,yr),Us.subVectors(Mr,Sr);let n=[0,-ds.z,ds.y,0,-fs.z,fs.y,0,-Us.z,Us.y,ds.z,0,-ds.x,fs.z,0,-fs.x,Us.z,0,-Us.x,-ds.y,ds.x,0,-fs.y,fs.x,0,-Us.y,Us.x,0];return!Ll(n,Mr,yr,Sr,bo)||(n=[1,0,0,0,1,0,0,0,1],!Ll(n,Mr,yr,Sr,bo))?!1:(Ao.crossVectors(ds,fs),n=[Ao.x,Ao.y,Ao.z],Ll(n,Mr,yr,Sr,bo))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ii).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ii).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Yi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Yi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Yi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Yi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Yi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Yi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Yi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Yi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Yi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Yi=[new D,new D,new D,new D,new D,new D,new D,new D],ii=new D,Eo=new eo,Mr=new D,yr=new D,Sr=new D,ds=new D,fs=new D,Us=new D,wa=new D,bo=new D,Ao=new D,Fs=new D;function Ll(e,t,n,i,s){for(let r=0,a=e.length-3;r<=a;r+=3){Fs.fromArray(e,r);const o=s.x*Math.abs(Fs.x)+s.y*Math.abs(Fs.y)+s.z*Math.abs(Fs.z),c=t.dot(Fs),l=n.dot(Fs),h=i.dot(Fs);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Fe=new D,To=new se;let B1=0;class cn{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:B1++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=uf,this.updateRanges=[],this.gpuType=bi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=n.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)To.fromBufferAttribute(this,n),To.applyMatrix3(t),this.setXY(n,To.x,To.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Fe.fromBufferAttribute(this,n),Fe.applyMatrix3(t),this.setXYZ(n,Fe.x,Fe.y,Fe.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)Fe.fromBufferAttribute(this,n),Fe.applyMatrix4(t),this.setXYZ(n,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)Fe.fromBufferAttribute(this,n),Fe.applyNormalMatrix(t),this.setXYZ(n,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)Fe.fromBufferAttribute(this,n),Fe.transformDirection(t),this.setXYZ(n,Fe.x,Fe.y,Fe.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=Aa(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=vn(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=Aa(n,this.array)),n}setX(t,n){return this.normalized&&(n=vn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=Aa(n,this.array)),n}setY(t,n){return this.normalized&&(n=vn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=Aa(n,this.array)),n}setZ(t,n){return this.normalized&&(n=vn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=Aa(n,this.array)),n}setW(t,n){return this.normalized&&(n=vn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=vn(n,this.array),i=vn(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,s){return t*=this.itemSize,this.normalized&&(n=vn(n,this.array),i=vn(i,this.array),s=vn(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,n,i,s,r){return t*=this.itemSize,this.normalized&&(n=vn(n,this.array),i=vn(i,this.array),s=vn(s,this.array),r=vn(r,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==uf&&(t.usage=this.usage),t}}class e0 extends cn{constructor(t,n,i){super(new Uint16Array(t),n,i)}}class n0 extends cn{constructor(t,n,i){super(new Uint32Array(t),n,i)}}class Ce extends cn{constructor(t,n,i){super(new Float32Array(t),n,i)}}const k1=new eo,Ca=new D,Il=new D;class no{constructor(t=new D,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const i=this.center;n!==void 0?i.copy(n):k1.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ca.subVectors(t,this.center);const n=Ca.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),s=(i-this.radius)*.5;this.center.addScaledVector(Ca,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Il.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ca.copy(t.center).add(Il)),this.expandByPoint(Ca.copy(t.center).sub(Il))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let z1=0;const Vn=new Ae,Dl=new gn,Er=new D,Tn=new eo,Ra=new eo,$e=new D;class He extends ca{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:z1++}),this.uuid=to(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(x1(t)?n0:e0)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new Ht().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Vn.makeRotationFromQuaternion(t),this.applyMatrix4(Vn),this}rotateX(t){return Vn.makeRotationX(t),this.applyMatrix4(Vn),this}rotateY(t){return Vn.makeRotationY(t),this.applyMatrix4(Vn),this}rotateZ(t){return Vn.makeRotationZ(t),this.applyMatrix4(Vn),this}translate(t,n,i){return Vn.makeTranslation(t,n,i),this.applyMatrix4(Vn),this}scale(t,n,i){return Vn.makeScale(t,n,i),this.applyMatrix4(Vn),this}lookAt(t){return Dl.lookAt(t),Dl.updateMatrix(),this.applyMatrix4(Dl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Er).negate(),this.translate(Er.x,Er.y,Er.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Ce(i,3))}else{const i=Math.min(t.length,n.count);for(let s=0;s<i;s++){const r=t[s];n.setXYZ(s,r.x,r.y,r.z||0)}t.length>n.count&&Ft("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new eo);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){te("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,s=n.length;i<s;i++){const r=n[i];Tn.setFromBufferAttribute(r),this.morphTargetsRelative?($e.addVectors(this.boundingBox.min,Tn.min),this.boundingBox.expandByPoint($e),$e.addVectors(this.boundingBox.max,Tn.max),this.boundingBox.expandByPoint($e)):(this.boundingBox.expandByPoint(Tn.min),this.boundingBox.expandByPoint(Tn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&te('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new no);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){te("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(t){const i=this.boundingSphere.center;if(Tn.setFromBufferAttribute(t),n)for(let r=0,a=n.length;r<a;r++){const o=n[r];Ra.setFromBufferAttribute(o),this.morphTargetsRelative?($e.addVectors(Tn.min,Ra.min),Tn.expandByPoint($e),$e.addVectors(Tn.max,Ra.max),Tn.expandByPoint($e)):(Tn.expandByPoint(Ra.min),Tn.expandByPoint(Ra.max))}Tn.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)$e.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared($e));if(n)for(let r=0,a=n.length;r<a;r++){const o=n[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)$e.fromBufferAttribute(o,l),c&&(Er.fromBufferAttribute(t,l),$e.add(Er)),s=Math.max(s,i.distanceToSquared($e))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&te('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){te("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,s=n.normal,r=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new cn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let v=0;v<i.count;v++)o[v]=new D,c[v]=new D;const l=new D,h=new D,d=new D,u=new se,f=new se,g=new se,x=new D,m=new D;function p(v,E,Y){l.fromBufferAttribute(i,v),h.fromBufferAttribute(i,E),d.fromBufferAttribute(i,Y),u.fromBufferAttribute(r,v),f.fromBufferAttribute(r,E),g.fromBufferAttribute(r,Y),h.sub(l),d.sub(l),f.sub(u),g.sub(u);const R=1/(f.x*g.y-g.x*f.y);isFinite(R)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(R),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(R),o[v].add(x),o[E].add(x),o[Y].add(x),c[v].add(m),c[E].add(m),c[Y].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let v=0,E=y.length;v<E;++v){const Y=y[v],R=Y.start,k=Y.count;for(let z=R,W=R+k;z<W;z+=3)p(t.getX(z+0),t.getX(z+1),t.getX(z+2))}const A=new D,S=new D,w=new D,T=new D;function C(v){w.fromBufferAttribute(s,v),T.copy(w);const E=o[v];A.copy(E),A.sub(w.multiplyScalar(w.dot(E))).normalize(),S.crossVectors(T,E);const R=S.dot(c[v])<0?-1:1;a.setXYZW(v,A.x,A.y,A.z,R)}for(let v=0,E=y.length;v<E;++v){const Y=y[v],R=Y.start,k=Y.count;for(let z=R,W=R+k;z<W;z+=3)C(t.getX(z+0)),C(t.getX(z+1)),C(t.getX(z+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new cn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);const s=new D,r=new D,a=new D,o=new D,c=new D,l=new D,h=new D,d=new D;if(t)for(let u=0,f=t.count;u<f;u+=3){const g=t.getX(u+0),x=t.getX(u+1),m=t.getX(u+2);s.fromBufferAttribute(n,g),r.fromBufferAttribute(n,x),a.fromBufferAttribute(n,m),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,m),o.add(h),c.add(h),l.add(h),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,f=n.count;u<f;u+=3)s.fromBufferAttribute(n,u+0),r.fromBufferAttribute(n,u+1),a.fromBufferAttribute(n,u+2),h.subVectors(a,r),d.subVectors(s,r),h.cross(d),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)$e.fromBufferAttribute(t,n),$e.normalize(),t.setXYZ(n,$e.x,$e.y,$e.z)}toNonIndexed(){function t(o,c){const l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h);let f=0,g=0;for(let x=0,m=c.length;x<m;x++){o.isInterleavedBufferAttribute?f=c[x]*o.data.stride+o.offset:f=c[x]*h;for(let p=0;p<h;p++)u[g++]=l[f++]}return new cn(u,h,d)}if(this.index===null)return Ft("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new He,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,i);n.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,d=l.length;h<d;h++){const u=l[h],f=t(u,i);c.push(f)}n.morphAttributes[o]=c}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];n.addGroup(l.start,l.count,l.materialIndex)}return n}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d];h.push(f.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(n))}const r=t.morphAttributes;for(const l in r){const h=[],d=r[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(n));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,h=a.length;l<h;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let V1=0;class is extends ca{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:V1++}),this.uuid=to(),this.name="",this.type="Material",this.blending=Dr,this.side=ws,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=uh,this.blendDst=dh,this.blendEquation=Gs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $t(0,0,0),this.blendAlpha=0,this.depthFunc=Vr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=hf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=fr,this.stencilZFail=fr,this.stencilZPass=fr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const i=t[n];if(i===void 0){Ft(`Material: parameter '${n}' has value of undefined.`);continue}const s=this[n];if(s===void 0){Ft(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Dr&&(i.blending=this.blending),this.side!==ws&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==uh&&(i.blendSrc=this.blendSrc),this.blendDst!==dh&&(i.blendDst=this.blendDst),this.blendEquation!==Gs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Vr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==hf&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==fr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==fr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==fr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(n){const r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let i=null;if(n!==null){const s=n.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=n[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const qi=new D,Ul=new D,wo=new D,ps=new D,Fl=new D,Co=new D,Nl=new D;class Wu{constructor(t=new D,n=new D(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,qi)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=qi.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(qi.copy(this.origin).addScaledVector(this.direction,n),qi.distanceToSquared(t))}distanceSqToSegment(t,n,i,s){Ul.copy(t).add(n).multiplyScalar(.5),wo.copy(n).sub(t).normalize(),ps.copy(this.origin).sub(Ul);const r=t.distanceTo(n)*.5,a=-this.direction.dot(wo),o=ps.dot(this.direction),c=-ps.dot(wo),l=ps.lengthSq(),h=Math.abs(1-a*a);let d,u,f,g;if(h>0)if(d=a*c-o,u=a*o-c,g=r*h,d>=0)if(u>=-g)if(u<=g){const x=1/h;d*=x,u*=x,f=d*(d+a*u+2*o)+u*(a*d+u+2*c)+l}else u=r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-a*r+o)),u=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-r,-c),r),f=u*(u+2*c)+l):(d=Math.max(0,-(a*r+o)),u=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l);else u=a>0?-r:r,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Ul).addScaledVector(wo,u),f}intersectSphere(t,n){qi.subVectors(t.center,this.origin);const i=qi.dot(this.direction),s=qi.dot(qi)-i*i,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){const i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(i=(t.min.x-u.x)*l,s=(t.max.x-u.x)*l):(i=(t.max.x-u.x)*l,s=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,n)}intersectsBox(t){return this.intersectBox(t,qi)!==null}intersectTriangle(t,n,i,s,r){Fl.subVectors(n,t),Co.subVectors(i,t),Nl.crossVectors(Fl,Co);let a=this.direction.dot(Nl),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ps.subVectors(this.origin,t);const c=o*this.direction.dot(Co.crossVectors(ps,Co));if(c<0)return null;const l=o*this.direction.dot(Fl.cross(ps));if(l<0||c+l>a)return null;const h=-o*ps.dot(Nl);return h<0?null:this.at(h/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ha extends is{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $t(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ui,this.combine=Du,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Tf=new Ae,Ns=new Wu,Ro=new no,wf=new D,Po=new D,Lo=new D,Io=new D,Ol=new D,Do=new D,Cf=new D,Uo=new D;class _n extends gn{constructor(t=new He,n=new ha){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,n){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){Do.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],d=r[c];h!==0&&(Ol.fromBufferAttribute(d,t),a?Do.addScaledVector(Ol,h):Do.addScaledVector(Ol.sub(n),h))}n.add(Do)}return n}raycast(t,n){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ro.copy(i.boundingSphere),Ro.applyMatrix4(r),Ns.copy(t.ray).recast(t.near),!(Ro.containsPoint(Ns.origin)===!1&&(Ns.intersectSphere(Ro,wf)===null||Ns.origin.distanceToSquared(wf)>(t.far-t.near)**2))&&(Tf.copy(r).invert(),Ns.copy(t.ray).applyMatrix4(Tf),!(i.boundingBox!==null&&Ns.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,Ns)))}_computeIntersections(t,n,i){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){const m=u[g],p=a[m.materialIndex],y=Math.max(m.start,f.start),A=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let S=y,w=A;S<w;S+=3){const T=o.getX(S),C=o.getX(S+1),v=o.getX(S+2);s=Fo(this,p,t,i,l,h,d,T,C,v),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,n.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const y=o.getX(m),A=o.getX(m+1),S=o.getX(m+2);s=Fo(this,a,t,i,l,h,d,y,A,S),s&&(s.faceIndex=Math.floor(m/3),n.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,x=u.length;g<x;g++){const m=u[g],p=a[m.materialIndex],y=Math.max(m.start,f.start),A=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let S=y,w=A;S<w;S+=3){const T=S,C=S+1,v=S+2;s=Fo(this,p,t,i,l,h,d,T,C,v),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=m.materialIndex,n.push(s))}}else{const g=Math.max(0,f.start),x=Math.min(c.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){const y=m,A=m+1,S=m+2;s=Fo(this,a,t,i,l,h,d,y,A,S),s&&(s.faceIndex=Math.floor(m/3),n.push(s))}}}}function H1(e,t,n,i,s,r,a,o){let c;if(t.side===mn?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,t.side===ws,o),c===null)return null;Uo.copy(o),Uo.applyMatrix4(e.matrixWorld);const l=n.ray.origin.distanceTo(Uo);return l<n.near||l>n.far?null:{distance:l,point:Uo.clone(),object:e}}function Fo(e,t,n,i,s,r,a,o,c,l){e.getVertexPosition(o,Po),e.getVertexPosition(c,Lo),e.getVertexPosition(l,Io);const h=H1(e,t,n,i,Po,Lo,Io,Cf);if(h){const d=new D;ri.getBarycoord(Cf,Po,Lo,Io,d),s&&(h.uv=ri.getInterpolatedAttribute(s,o,c,l,d,new se)),r&&(h.uv1=ri.getInterpolatedAttribute(r,o,c,l,d,new se)),a&&(h.normal=ri.getInterpolatedAttribute(a,o,c,l,d,new D),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new D,materialIndex:0};ri.getNormal(Po,Lo,Io,u.normal),h.face=u,h.barycoord=d}return h}class G1 extends hn{constructor(t=null,n=1,i=1,s,r,a,o,c,l=tn,h=tn,d,u){super(null,a,o,c,l,h,s,r,d,u),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Bl=new D,W1=new D,X1=new Ht;class Hs{constructor(t=new D(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,s){return this.normal.set(t,n,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){const s=Bl.subVectors(i,n).cross(W1.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const i=t.delta(Bl),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:n.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const i=n||X1.getNormalMatrix(t),s=this.coplanarPoint(Bl).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Os=new no,Y1=new se(.5,.5),No=new D;class i0{constructor(t=new Hs,n=new Hs,i=new Hs,s=new Hs,r=new Hs,a=new Hs){this.planes=[t,n,i,s,r,a]}set(t,n,i,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=Ai,i=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],h=r[4],d=r[5],u=r[6],f=r[7],g=r[8],x=r[9],m=r[10],p=r[11],y=r[12],A=r[13],S=r[14],w=r[15];if(s[0].setComponents(l-a,f-h,p-g,w-y).normalize(),s[1].setComponents(l+a,f+h,p+g,w+y).normalize(),s[2].setComponents(l+o,f+d,p+x,w+A).normalize(),s[3].setComponents(l-o,f-d,p-x,w-A).normalize(),i)s[4].setComponents(c,u,m,S).normalize(),s[5].setComponents(l-c,f-u,p-m,w-S).normalize();else if(s[4].setComponents(l-c,f-u,p-m,w-S).normalize(),n===Ai)s[5].setComponents(l+c,f+u,p+m,w+S).normalize();else if(n===vc)s[5].setComponents(c,u,m,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Os.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Os.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Os)}intersectsSprite(t){Os.center.set(0,0,0);const n=Y1.distanceTo(t.center);return Os.radius=.7071067811865476+n,Os.applyMatrix4(t.matrixWorld),this.intersectsSphere(Os)}intersectsSphere(t){const n=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(n[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const n=this.planes;for(let i=0;i<6;i++){const s=n[i];if(No.x=s.normal.x>0?t.max.x:t.min.x,No.y=s.normal.y>0?t.max.y:t.min.y,No.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(No)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Fr extends is{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new $t(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const yc=new D,Sc=new D,Rf=new Ae,Pa=new Wu,Oo=new no,kl=new D,Pf=new D;class q1 extends gn{constructor(t=new He,n=new Fr){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,i=[0];for(let s=1,r=n.count;s<r;s++)yc.fromBufferAttribute(n,s-1),Sc.fromBufferAttribute(n,s),i[s]=i[s-1],i[s]+=yc.distanceTo(Sc);t.setAttribute("lineDistance",new Ce(i,1))}else Ft("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Oo.copy(i.boundingSphere),Oo.applyMatrix4(s),Oo.radius+=r,t.ray.intersectsSphere(Oo)===!1)return;Rf.copy(s).invert(),Pa.copy(t.ray).applyMatrix4(Rf);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=i.index,u=i.attributes.position;if(h!==null){const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let x=f,m=g-1;x<m;x+=l){const p=h.getX(x),y=h.getX(x+1),A=Bo(this,t,Pa,c,p,y,x);A&&n.push(A)}if(this.isLineLoop){const x=h.getX(g-1),m=h.getX(f),p=Bo(this,t,Pa,c,x,m,g-1);p&&n.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let x=f,m=g-1;x<m;x+=l){const p=Bo(this,t,Pa,c,x,x+1,x);p&&n.push(p)}if(this.isLineLoop){const x=Bo(this,t,Pa,c,g-1,f,g-1);x&&n.push(x)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Bo(e,t,n,i,s,r,a){const o=e.geometry.attributes.position;if(yc.fromBufferAttribute(o,s),Sc.fromBufferAttribute(o,r),n.distanceSqToSegment(yc,Sc,kl,Pf)>i)return;kl.applyMatrix4(e.matrixWorld);const l=t.ray.origin.distanceTo(kl);if(!(l<t.near||l>t.far))return{distance:l,point:Pf.clone().applyMatrix4(e.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:e}}const Lf=new D,If=new D;class Ec extends q1{constructor(t,n){super(t,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,i=[];for(let s=0,r=n.count;s<r;s+=2)Lf.fromBufferAttribute(n,s),If.fromBufferAttribute(n,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Lf.distanceTo(If);t.setAttribute("lineDistance",new Ce(i,1))}else Ft("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Es extends is{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new $t(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Df=new Ae,eu=new Wu,ko=new no,zo=new D;class Nr extends gn{constructor(t=new He,n=new Es){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,n){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ko.copy(i.boundingSphere),ko.applyMatrix4(s),ko.radius+=r,t.ray.intersectsSphere(ko)===!1)return;Df.copy(s).invert(),eu.copy(t.ray).applyMatrix4(Df);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,d=i.attributes.position;if(l!==null){const u=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let g=u,x=f;g<x;g++){const m=l.getX(g);zo.fromBufferAttribute(d,m),Uf(zo,m,c,s,t,n,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=u,x=f;g<x;g++)zo.fromBufferAttribute(d,g),Uf(zo,g,c,s,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Uf(e,t,n,i,s,r,a){const o=eu.distanceSqToPoint(e);if(o<n){const c=new D;eu.closestPointToPoint(e,c),c.applyMatrix4(i);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class s0 extends hn{constructor(t=[],n=sr,i,s,r,a,o,c,l,h){super(t,n,i,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class $1 extends hn{constructor(t,n,i,s,r,a,o,c,l){super(t,n,i,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class qa extends hn{constructor(t,n,i=Di,s,r,a,o=tn,c=tn,l,h=ns,d=1){if(h!==ns&&h!==qs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:n,depth:d};super(u,s,r,a,o,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new Hu(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class j1 extends qa{constructor(t,n=Di,i=sr,s,r,a=tn,o=tn,c,l=ns){const h={width:t,height:t,depth:1},d=[h,h,h,h,h,h];super(t,t,n,i,s,r,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class r0 extends hn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class io extends He{constructor(t=1,n=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,i,n,t,a,r,0),g("z","y","x",1,-1,i,n,-t,a,r,1),g("x","z","y",1,1,t,i,n,s,a,2),g("x","z","y",1,-1,t,i,-n,s,a,3),g("x","y","z",1,-1,t,n,i,s,r,4),g("x","y","z",-1,-1,t,n,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new Ce(l,3)),this.setAttribute("normal",new Ce(h,3)),this.setAttribute("uv",new Ce(d,2));function g(x,m,p,y,A,S,w,T,C,v,E){const Y=S/C,R=w/v,k=S/2,z=w/2,W=T/2,B=C+1,V=v+1;let F=0,Q=0;const j=new D;for(let lt=0;lt<V;lt++){const pt=lt*R-z;for(let ht=0;ht<B;ht++){const kt=ht*Y-k;j[x]=kt*y,j[m]=pt*A,j[p]=W,l.push(j.x,j.y,j.z),j[x]=0,j[m]=0,j[p]=T>0?1:-1,h.push(j.x,j.y,j.z),d.push(ht/C),d.push(1-lt/v),F+=1}}for(let lt=0;lt<v;lt++)for(let pt=0;pt<C;pt++){const ht=u+pt+B*lt,kt=u+pt+B*(lt+1),de=u+(pt+1)+B*(lt+1),ce=u+(pt+1)+B*lt;c.push(ht,kt,ce),c.push(kt,de,ce),Q+=6}o.addGroup(f,Q,E),f+=Q,u+=F}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new io(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class K1{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ft("Curve: .getPoint() not implemented.")}getPointAt(t,n){const i=this.getUtoTmapping(t);return this.getPoint(i,n)}getPoints(t=5){const n=[];for(let i=0;i<=t;i++)n.push(this.getPoint(i/t));return n}getSpacedPoints(t=5){const n=[];for(let i=0;i<=t;i++)n.push(this.getPointAt(i/t));return n}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const n=[];let i,s=this.getPoint(0),r=0;n.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),r+=i.distanceTo(s),n.push(r),s=i;return this.cacheArcLengths=n,n}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,n=null){const i=this.getLengths();let s=0;const r=i.length;let a;n?a=n:a=t*i[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=i[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===a)return s/(r-1);const h=i[s],u=i[s+1]-h,f=(a-h)/u;return(s+f)/(r-1)}getTangent(t,n){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);const a=this.getPoint(s),o=this.getPoint(r),c=n||(a.isVector2?new se:new D);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,n){const i=this.getUtoTmapping(t);return this.getTangent(i,n)}computeFrenetFrames(t,n=!1){const i=new D,s=[],r=[],a=[],o=new D,c=new Ae;for(let f=0;f<=t;f++){const g=f/t;s[f]=this.getTangentAt(g,new D)}r[0]=new D,a[0]=new D;let l=Number.MAX_VALUE;const h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=l&&(l=h,i.set(1,0,0)),d<=l&&(l=d,i.set(0,1,0)),u<=l&&i.set(0,0,1),o.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(s[f-1],s[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(qt(s[f-1].dot(s[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(o,g))}a[f].crossVectors(s[f],r[f])}if(n===!0){let f=Math.acos(qt(r[0].dot(r[t]),-1,1));f/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],f*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}function Z1(e,t){const n=1-e;return n*n*t}function J1(e,t){return 2*(1-e)*e*t}function Q1(e,t){return e*e*t}function zl(e,t,n,i){return Z1(e,t)+J1(e,n)+Q1(e,i)}class tv extends K1{constructor(t=new D,n=new D,i=new D){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=n,this.v2=i}getPoint(t,n=new D){const i=n,s=this.v0,r=this.v1,a=this.v2;return i.set(zl(t,s.x,r.x,a.x),zl(t,s.y,r.y,a.y),zl(t,s.z,r.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class so extends He{constructor(t=1,n=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:s};const r=t/2,a=n/2,o=Math.floor(i),c=Math.floor(s),l=o+1,h=c+1,d=t/o,u=n/c,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){const y=p*u-a;for(let A=0;A<l;A++){const S=A*d-r;g.push(S,-y,0),x.push(0,0,1),m.push(A/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<o;y++){const A=y+l*p,S=y+l*(p+1),w=y+1+l*(p+1),T=y+1+l*p;f.push(A,S,T),f.push(S,w,T)}this.setIndex(f),this.setAttribute("position",new Ce(g,3)),this.setAttribute("normal",new Ce(x,3)),this.setAttribute("uv",new Ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new so(t.width,t.height,t.widthSegments,t.heightSegments)}}class ro extends He{constructor(t=1,n=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const h=[],d=new D,u=new D,f=[],g=[],x=[],m=[];for(let p=0;p<=i;p++){const y=[],A=p/i;let S=0;p===0&&a===0?S=.5/n:p===i&&c===Math.PI&&(S=-.5/n);for(let w=0;w<=n;w++){const T=w/n;d.x=-t*Math.cos(s+T*r)*Math.sin(a+A*o),d.y=t*Math.cos(a+A*o),d.z=t*Math.sin(s+T*r)*Math.sin(a+A*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),x.push(u.x,u.y,u.z),m.push(T+S,1-A),y.push(l++)}h.push(y)}for(let p=0;p<i;p++)for(let y=0;y<n;y++){const A=h[p][y+1],S=h[p][y],w=h[p+1][y],T=h[p+1][y+1];(p!==0||a>0)&&f.push(A,S,T),(p!==i-1||c<Math.PI)&&f.push(S,w,T)}this.setIndex(f),this.setAttribute("position",new Ce(g,3)),this.setAttribute("normal",new Ce(x,3)),this.setAttribute("uv",new Ce(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ro(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function Xr(e){const t={};for(const n in e){t[n]={};for(const i in e[n]){const s=e[n][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Ft("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=s.clone():Array.isArray(s)?t[n][i]=s.slice():t[n][i]=s}}return t}function pn(e){const t={};for(let n=0;n<e.length;n++){const i=Xr(e[n]);for(const s in i)t[s]=i[s]}return t}function ev(e){const t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function a0(e){const t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Zt.workingColorSpace}const nv={clone:Xr,merge:pn};var iv=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,sv=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ui extends is{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=iv,this.fragmentShader=sv,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Xr(t.uniforms),this.uniformsGroups=ev(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?n.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?n.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[s]={type:"m4",value:a.toArray()}:n.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class rv extends ui{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class av extends is{constructor(t){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new $t(16777215),this.specular=new $t(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $t(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Km,this.normalScale=new se(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ui,this.combine=Du,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ov extends is{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=u1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class cv extends is{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Ff={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(Nf(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!Nf(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function Nf(e){try{const t=e.slice(e.indexOf(":")+1);return new URL(t).protocol==="blob:"}catch{return!1}}class lv{constructor(t,n,i){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=n,this.onError=i,this._abortController=null,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){const d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){const f=l[d],g=l[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const hv=new lv;class Xu{constructor(t){this.manager=t!==void 0?t:hv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(t,n){const i=this;return new Promise(function(s,r){i.load(t,s,n,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}abort(){return this}}Xu.DEFAULT_MATERIAL_NAME="__DEFAULT";const $i={};class uv extends Error{constructor(t,n){super(t),this.response=n}}class dv extends Xu{constructor(t){super(t),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(t,n,i,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=Ff.get(`file:${t}`);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{n&&n(r),this.manager.itemEnd(t)},0),r;if($i[t]!==void 0){$i[t].push({onLoad:n,onProgress:i,onError:s});return}$i[t]=[],$i[t].push({onLoad:n,onProgress:i,onError:s});const a=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&Ft("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=$i[t],d=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=u?parseInt(u):0,g=f!==0;let x=0;const m=new ReadableStream({start(p){y();function y(){d.read().then(({done:A,value:S})=>{if(A)p.close();else{x+=S.byteLength;const w=new ProgressEvent("progress",{lengthComputable:g,loaded:x,total:f});for(let T=0,C=h.length;T<C;T++){const v=h[T];v.onProgress&&v.onProgress(w)}p.enqueue(S),y()}},A=>{p.error(A)})}}});return new Response(m)}else throw new uv(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{const d=/charset="?([^;"\s]*)"?/i.exec(o),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{Ff.add(`file:${t}`,l);const h=$i[t];delete $i[t];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=$i[t];if(h===void 0)throw this.manager.itemError(t),l;delete $i[t];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onError&&f.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Vo=new D,Ho=new la,gi=new D;class o0 extends gn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ae,this.projectionMatrix=new Ae,this.projectionMatrixInverse=new Ae,this.coordinateSystem=Ai,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Vo,Ho,gi),gi.x===1&&gi.y===1&&gi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vo,Ho,gi.set(1,1,1)).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorld.decompose(Vo,Ho,gi),gi.x===1&&gi.y===1&&gi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Vo,Ho,gi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ms=new D,Of=new se,Bf=new se;class qn extends o0{constructor(t=50,n=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=tu*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(ml*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return tu*2*Math.atan(Math.tan(ml*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){ms.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ms.x,ms.y).multiplyScalar(-t/ms.z),ms.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ms.x,ms.y).multiplyScalar(-t/ms.z)}getViewSize(t,n){return this.getViewBounds(t,Of,Bf),n.subVectors(Bf,Of)}setViewOffset(t,n,i,s,r,a){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(ml*.5*this.fov)/this.zoom,i=2*n,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,n-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class c0 extends o0{constructor(t=-1,n=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=s+n,c=s-n;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const br=-90,Ar=1;class fv extends gn{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new qn(br,Ar,t,n);s.layers=this.layers,this.add(s);const r=new qn(br,Ar,t,n);r.layers=this.layers,this.add(r);const a=new qn(br,Ar,t,n);a.layers=this.layers,this.add(a);const o=new qn(br,Ar,t,n);o.layers=this.layers,this.add(o);const c=new qn(br,Ar,t,n);c.layers=this.layers,this.add(c);const l=new qn(br,Ar,t,n);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[i,s,r,a,o,c]=n;for(const l of n)this.remove(l);if(t===Ai)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===vc)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of n)this.add(l),l.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let m=!1;t.isWebGLRenderer===!0?m=t.state.buffers.depth.getReversed():m=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,r),t.setRenderTarget(i,1,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,a),t.setRenderTarget(i,2,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,o),t.setRenderTarget(i,3,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),t.setRenderTarget(i,4,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,l),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,s),m&&t.autoClear===!1&&t.clearDepth(),t.render(n,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class pv extends qn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function kf(e,t,n,i){const s=mv(i);switch(n){case qm:return e*t;case jm:return e*t/s.components*s.byteLength;case Ou:return e*t/s.components*s.byteLength;case Gr:return e*t*2/s.components*s.byteLength;case Bu:return e*t*2/s.components*s.byteLength;case $m:return e*t*3/s.components*s.byteLength;case li:return e*t*4/s.components*s.byteLength;case ku:return e*t*4/s.components*s.byteLength;case rc:case ac:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case oc:case cc:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Eh:case Ah:return Math.max(e,16)*Math.max(t,8)/4;case Sh:case bh:return Math.max(e,8)*Math.max(t,8)/2;case Th:case wh:case Rh:case Ph:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Ch:case Lh:case Ih:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Dh:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Uh:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Fh:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Nh:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Oh:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Bh:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case kh:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case zh:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Vh:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Hh:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Gh:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Wh:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Xh:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Yh:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case qh:case $h:case jh:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Kh:case Zh:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Jh:case Qh:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function mv(e){switch(e){case Kn:case Gm:return{byteLength:1,components:1};case Xa:case Wm:case es:return{byteLength:2,components:1};case Fu:case Nu:return{byteLength:2,components:4};case Di:case Uu:case bi:return{byteLength:4,components:1};case Xm:case Ym:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Iu}}));typeof window<"u"&&(window.__THREE__?Ft("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Iu);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function l0(){let e=null,t=!1,n=null,i=null;function s(r,a){n(r,a),i=e.requestAnimationFrame(s)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(s),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){n=r},setContext:function(r){e=r}}}function gv(e){const t=new WeakMap;function n(o,c){const l=o.array,h=o.usage,d=l.byteLength,u=e.createBuffer();e.bindBuffer(c,u),e.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=e.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=e.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=e.HALF_FLOAT:f=e.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=e.SHORT;else if(l instanceof Uint32Array)f=e.UNSIGNED_INT;else if(l instanceof Int32Array)f=e.INT;else if(l instanceof Int8Array)f=e.BYTE;else if(l instanceof Uint8Array)f=e.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,c,l){const h=c.array,d=c.updateRanges;if(e.bindBuffer(l,o),d.length===0)e.bufferSubData(l,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],x=d[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++u,d[u]=x)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const x=d[f];e.bufferSubData(l,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(e.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,n(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var _v=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,vv=`#ifdef USE_ALPHAHASH
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
#endif`,xv=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Mv=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yv=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Sv=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ev=`#ifdef USE_AOMAP
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
#endif`,bv=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Av=`#ifdef USE_BATCHING
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
#endif`,Tv=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,wv=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Cv=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Rv=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Pv=`#ifdef USE_IRIDESCENCE
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
#endif`,Lv=`#ifdef USE_BUMPMAP
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
#endif`,Iv=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Dv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Uv=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Fv=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Nv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ov=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Bv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,kv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,zv=`#define PI 3.141592653589793
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
} // validated`,Vv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Hv=`vec3 transformedNormal = objectNormal;
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
#endif`,Gv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Xv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Yv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,qv="gl_FragColor = linearToOutputTexel( gl_FragColor );",$v=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,jv=`#ifdef USE_ENVMAP
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
#endif`,Kv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Zv=`#ifdef USE_ENVMAP
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
#endif`,Jv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Qv=`#ifdef USE_ENVMAP
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
#endif`,tx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ex=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,nx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ix=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,sx=`#ifdef USE_GRADIENTMAP
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
}`,rx=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ax=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ox=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,cx=`uniform bool receiveShadow;
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
#endif`,lx=`#ifdef USE_ENVMAP
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
#endif`,hx=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,ux=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,dx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fx=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,px=`PhysicalMaterial material;
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
#endif`,mx=`uniform sampler2D dfgLUT;
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
}`,gx=`
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
#endif`,_x=`#if defined( RE_IndirectDiffuse )
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
#endif`,vx=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,xx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Mx=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,yx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Sx=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Ex=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,bx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Ax=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Tx=`#if defined( USE_POINTS_UV )
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
#endif`,wx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Cx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Rx=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Px=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Lx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ix=`#ifdef USE_MORPHTARGETS
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
#endif`,Dx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ux=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Fx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Nx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ox=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,kx=`#ifdef USE_NORMALMAP
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
#endif`,zx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Vx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Hx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Yx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,qx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$x=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,jx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Kx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Zx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Jx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,t2=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,e2=`float getShadowMask() {
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
}`,n2=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,i2=`#ifdef USE_SKINNING
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
#endif`,s2=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,r2=`#ifdef USE_SKINNING
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
#endif`,a2=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,o2=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,c2=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,l2=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,h2=`#ifdef USE_TRANSMISSION
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
#endif`,u2=`#ifdef USE_TRANSMISSION
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
#endif`,d2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,f2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,p2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,m2=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const g2=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,_2=`uniform sampler2D t2D;
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
}`,v2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,x2=`#ifdef ENVMAP_TYPE_CUBE
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
}`,M2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,y2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,S2=`#include <common>
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
}`,E2=`#if DEPTH_PACKING == 3200
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
}`,b2=`#define DISTANCE
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
}`,A2=`#define DISTANCE
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
}`,T2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,w2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,C2=`uniform float scale;
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
}`,R2=`uniform vec3 diffuse;
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
}`,P2=`#include <common>
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
}`,L2=`uniform vec3 diffuse;
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
}`,I2=`#define LAMBERT
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
}`,D2=`#define LAMBERT
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
}`,U2=`#define MATCAP
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
}`,F2=`#define MATCAP
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
}`,N2=`#define NORMAL
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
}`,O2=`#define NORMAL
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
}`,B2=`#define PHONG
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
}`,k2=`#define PHONG
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
}`,z2=`#define STANDARD
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
}`,V2=`#define STANDARD
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
}`,H2=`#define TOON
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
}`,G2=`#define TOON
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
}`,W2=`uniform float size;
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
}`,X2=`uniform vec3 diffuse;
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
}`,Y2=`#include <common>
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
}`,q2=`uniform vec3 color;
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
}`,$2=`uniform float rotation;
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
}`,j2=`uniform vec3 diffuse;
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
}`,Gt={alphahash_fragment:_v,alphahash_pars_fragment:vv,alphamap_fragment:xv,alphamap_pars_fragment:Mv,alphatest_fragment:yv,alphatest_pars_fragment:Sv,aomap_fragment:Ev,aomap_pars_fragment:bv,batching_pars_vertex:Av,batching_vertex:Tv,begin_vertex:wv,beginnormal_vertex:Cv,bsdfs:Rv,iridescence_fragment:Pv,bumpmap_pars_fragment:Lv,clipping_planes_fragment:Iv,clipping_planes_pars_fragment:Dv,clipping_planes_pars_vertex:Uv,clipping_planes_vertex:Fv,color_fragment:Nv,color_pars_fragment:Ov,color_pars_vertex:Bv,color_vertex:kv,common:zv,cube_uv_reflection_fragment:Vv,defaultnormal_vertex:Hv,displacementmap_pars_vertex:Gv,displacementmap_vertex:Wv,emissivemap_fragment:Xv,emissivemap_pars_fragment:Yv,colorspace_fragment:qv,colorspace_pars_fragment:$v,envmap_fragment:jv,envmap_common_pars_fragment:Kv,envmap_pars_fragment:Zv,envmap_pars_vertex:Jv,envmap_physical_pars_fragment:lx,envmap_vertex:Qv,fog_vertex:tx,fog_pars_vertex:ex,fog_fragment:nx,fog_pars_fragment:ix,gradientmap_pars_fragment:sx,lightmap_pars_fragment:rx,lights_lambert_fragment:ax,lights_lambert_pars_fragment:ox,lights_pars_begin:cx,lights_toon_fragment:hx,lights_toon_pars_fragment:ux,lights_phong_fragment:dx,lights_phong_pars_fragment:fx,lights_physical_fragment:px,lights_physical_pars_fragment:mx,lights_fragment_begin:gx,lights_fragment_maps:_x,lights_fragment_end:vx,logdepthbuf_fragment:xx,logdepthbuf_pars_fragment:Mx,logdepthbuf_pars_vertex:yx,logdepthbuf_vertex:Sx,map_fragment:Ex,map_pars_fragment:bx,map_particle_fragment:Ax,map_particle_pars_fragment:Tx,metalnessmap_fragment:wx,metalnessmap_pars_fragment:Cx,morphinstance_vertex:Rx,morphcolor_vertex:Px,morphnormal_vertex:Lx,morphtarget_pars_vertex:Ix,morphtarget_vertex:Dx,normal_fragment_begin:Ux,normal_fragment_maps:Fx,normal_pars_fragment:Nx,normal_pars_vertex:Ox,normal_vertex:Bx,normalmap_pars_fragment:kx,clearcoat_normal_fragment_begin:zx,clearcoat_normal_fragment_maps:Vx,clearcoat_pars_fragment:Hx,iridescence_pars_fragment:Gx,opaque_fragment:Wx,packing:Xx,premultiplied_alpha_fragment:Yx,project_vertex:qx,dithering_fragment:$x,dithering_pars_fragment:jx,roughnessmap_fragment:Kx,roughnessmap_pars_fragment:Zx,shadowmap_pars_fragment:Jx,shadowmap_pars_vertex:Qx,shadowmap_vertex:t2,shadowmask_pars_fragment:e2,skinbase_vertex:n2,skinning_pars_vertex:i2,skinning_vertex:s2,skinnormal_vertex:r2,specularmap_fragment:a2,specularmap_pars_fragment:o2,tonemapping_fragment:c2,tonemapping_pars_fragment:l2,transmission_fragment:h2,transmission_pars_fragment:u2,uv_pars_fragment:d2,uv_pars_vertex:f2,uv_vertex:p2,worldpos_vertex:m2,background_vert:g2,background_frag:_2,backgroundCube_vert:v2,backgroundCube_frag:x2,cube_vert:M2,cube_frag:y2,depth_vert:S2,depth_frag:E2,distance_vert:b2,distance_frag:A2,equirect_vert:T2,equirect_frag:w2,linedashed_vert:C2,linedashed_frag:R2,meshbasic_vert:P2,meshbasic_frag:L2,meshlambert_vert:I2,meshlambert_frag:D2,meshmatcap_vert:U2,meshmatcap_frag:F2,meshnormal_vert:N2,meshnormal_frag:O2,meshphong_vert:B2,meshphong_frag:k2,meshphysical_vert:z2,meshphysical_frag:V2,meshtoon_vert:H2,meshtoon_frag:G2,points_vert:W2,points_frag:X2,shadow_vert:Y2,shadow_frag:q2,sprite_vert:$2,sprite_frag:j2},at={common:{diffuse:{value:new $t(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ht}},envmap:{envMap:{value:null},envMapRotation:{value:new Ht},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ht}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ht}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ht},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ht},normalScale:{value:new se(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ht},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ht}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ht}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ht}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $t(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new $t(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0},uvTransform:{value:new Ht}},sprite:{diffuse:{value:new $t(16777215)},opacity:{value:1},center:{value:new se(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ht},alphaMap:{value:null},alphaMapTransform:{value:new Ht},alphaTest:{value:0}}},yi={basic:{uniforms:pn([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:pn([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new $t(0)},envMapIntensity:{value:1}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:pn([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new $t(0)},specular:{value:new $t(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:pn([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new $t(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:pn([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new $t(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:pn([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:pn([at.points,at.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:pn([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:pn([at.common,at.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:pn([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:pn([at.sprite,at.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ht},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ht}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distance:{uniforms:pn([at.common,at.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distance_vert,fragmentShader:Gt.distance_frag},shadow:{uniforms:pn([at.lights,at.fog,{color:{value:new $t(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};yi.physical={uniforms:pn([yi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ht},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ht},clearcoatNormalScale:{value:new se(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ht},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ht},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ht},sheen:{value:0},sheenColor:{value:new $t(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ht},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ht},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ht},transmissionSamplerSize:{value:new se},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ht},attenuationDistance:{value:0},attenuationColor:{value:new $t(0)},specularColor:{value:new $t(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ht},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ht},anisotropyVector:{value:new se},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ht}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};const Go={r:0,b:0,g:0},Bs=new Ui,K2=new Ae;function Z2(e,t,n,i,s,r){const a=new $t(0);let o=s===!0?0:1,c,l,h=null,d=0,u=null;function f(y){let A=y.isScene===!0?y.background:null;if(A&&A.isTexture){const S=y.backgroundBlurriness>0;A=t.get(A,S)}return A}function g(y){let A=!1;const S=f(y);S===null?m(a,o):S&&S.isColor&&(m(S,1),A=!0);const w=e.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(e.autoClear||A)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function x(y,A){const S=f(A);S&&(S.isCubeTexture||S.mapping===Uc)?(l===void 0&&(l=new _n(new io(1,1,1),new ui({name:"BackgroundCubeMaterial",uniforms:Xr(yi.backgroundCube.uniforms),vertexShader:yi.backgroundCube.vertexShader,fragmentShader:yi.backgroundCube.fragmentShader,side:mn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),Bs.copy(A.backgroundRotation),Bs.x*=-1,Bs.y*=-1,Bs.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Bs.y*=-1,Bs.z*=-1),l.material.uniforms.envMap.value=S,l.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(K2.makeRotationFromEuler(Bs)),l.material.toneMapped=Zt.getTransfer(S.colorSpace)!==oe,(h!==S||d!==S.version||u!==e.toneMapping)&&(l.material.needsUpdate=!0,h=S,d=S.version,u=e.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new _n(new so(2,2),new ui({name:"BackgroundMaterial",uniforms:Xr(yi.background.uniforms),vertexShader:yi.background.vertexShader,fragmentShader:yi.background.fragmentShader,side:ws,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=Zt.getTransfer(S.colorSpace)!==oe,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||d!==S.version||u!==e.toneMapping)&&(c.material.needsUpdate=!0,h=S,d=S.version,u=e.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function m(y,A){y.getRGB(Go,a0(e)),n.buffers.color.setClear(Go.r,Go.g,Go.b,A,r)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,A=1){a.set(y),o=A,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,m(a,o)},render:g,addToRenderList:x,dispose:p}}function J2(e,t){const n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=u(null);let r=s,a=!1;function o(R,k,z,W,B){let V=!1;const F=d(R,W,z,k);r!==F&&(r=F,l(r.object)),V=f(R,W,z,B),V&&g(R,W,z,B),B!==null&&t.update(B,e.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,S(R,k,z,W),B!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(B).buffer))}function c(){return e.createVertexArray()}function l(R){return e.bindVertexArray(R)}function h(R){return e.deleteVertexArray(R)}function d(R,k,z,W){const B=W.wireframe===!0;let V=i[k.id];V===void 0&&(V={},i[k.id]=V);const F=R.isInstancedMesh===!0?R.id:0;let Q=V[F];Q===void 0&&(Q={},V[F]=Q);let j=Q[z.id];j===void 0&&(j={},Q[z.id]=j);let lt=j[B];return lt===void 0&&(lt=u(c()),j[B]=lt),lt}function u(R){const k=[],z=[],W=[];for(let B=0;B<n;B++)k[B]=0,z[B]=0,W[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:z,attributeDivisors:W,object:R,attributes:{},index:null}}function f(R,k,z,W){const B=r.attributes,V=k.attributes;let F=0;const Q=z.getAttributes();for(const j in Q)if(Q[j].location>=0){const pt=B[j];let ht=V[j];if(ht===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(ht=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(ht=R.instanceColor)),pt===void 0||pt.attribute!==ht||ht&&pt.data!==ht.data)return!0;F++}return r.attributesNum!==F||r.index!==W}function g(R,k,z,W){const B={},V=k.attributes;let F=0;const Q=z.getAttributes();for(const j in Q)if(Q[j].location>=0){let pt=V[j];pt===void 0&&(j==="instanceMatrix"&&R.instanceMatrix&&(pt=R.instanceMatrix),j==="instanceColor"&&R.instanceColor&&(pt=R.instanceColor));const ht={};ht.attribute=pt,pt&&pt.data&&(ht.data=pt.data),B[j]=ht,F++}r.attributes=B,r.attributesNum=F,r.index=W}function x(){const R=r.newAttributes;for(let k=0,z=R.length;k<z;k++)R[k]=0}function m(R){p(R,0)}function p(R,k){const z=r.newAttributes,W=r.enabledAttributes,B=r.attributeDivisors;z[R]=1,W[R]===0&&(e.enableVertexAttribArray(R),W[R]=1),B[R]!==k&&(e.vertexAttribDivisor(R,k),B[R]=k)}function y(){const R=r.newAttributes,k=r.enabledAttributes;for(let z=0,W=k.length;z<W;z++)k[z]!==R[z]&&(e.disableVertexAttribArray(z),k[z]=0)}function A(R,k,z,W,B,V,F){F===!0?e.vertexAttribIPointer(R,k,z,B,V):e.vertexAttribPointer(R,k,z,W,B,V)}function S(R,k,z,W){x();const B=W.attributes,V=z.getAttributes(),F=k.defaultAttributeValues;for(const Q in V){const j=V[Q];if(j.location>=0){let lt=B[Q];if(lt===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(lt=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(lt=R.instanceColor)),lt!==void 0){const pt=lt.normalized,ht=lt.itemSize,kt=t.get(lt);if(kt===void 0)continue;const de=kt.buffer,ce=kt.type,$=kt.bytesPerElement,nt=ce===e.INT||ce===e.UNSIGNED_INT||lt.gpuType===Uu;if(lt.isInterleavedBufferAttribute){const rt=lt.data,Vt=rt.stride,Dt=lt.offset;if(rt.isInstancedInterleavedBuffer){for(let Ot=0;Ot<j.locationSize;Ot++)p(j.location+Ot,rt.meshPerAttribute);R.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Ot=0;Ot<j.locationSize;Ot++)m(j.location+Ot);e.bindBuffer(e.ARRAY_BUFFER,de);for(let Ot=0;Ot<j.locationSize;Ot++)A(j.location+Ot,ht/j.locationSize,ce,pt,Vt*$,(Dt+ht/j.locationSize*Ot)*$,nt)}else{if(lt.isInstancedBufferAttribute){for(let rt=0;rt<j.locationSize;rt++)p(j.location+rt,lt.meshPerAttribute);R.isInstancedMesh!==!0&&W._maxInstanceCount===void 0&&(W._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let rt=0;rt<j.locationSize;rt++)m(j.location+rt);e.bindBuffer(e.ARRAY_BUFFER,de);for(let rt=0;rt<j.locationSize;rt++)A(j.location+rt,ht/j.locationSize,ce,pt,ht*$,ht/j.locationSize*rt*$,nt)}}else if(F!==void 0){const pt=F[Q];if(pt!==void 0)switch(pt.length){case 2:e.vertexAttrib2fv(j.location,pt);break;case 3:e.vertexAttrib3fv(j.location,pt);break;case 4:e.vertexAttrib4fv(j.location,pt);break;default:e.vertexAttrib1fv(j.location,pt)}}}}y()}function w(){E();for(const R in i){const k=i[R];for(const z in k){const W=k[z];for(const B in W){const V=W[B];for(const F in V)h(V[F].object),delete V[F];delete W[B]}}delete i[R]}}function T(R){if(i[R.id]===void 0)return;const k=i[R.id];for(const z in k){const W=k[z];for(const B in W){const V=W[B];for(const F in V)h(V[F].object),delete V[F];delete W[B]}}delete i[R.id]}function C(R){for(const k in i){const z=i[k];for(const W in z){const B=z[W];if(B[R.id]===void 0)continue;const V=B[R.id];for(const F in V)h(V[F].object),delete V[F];delete B[R.id]}}}function v(R){for(const k in i){const z=i[k],W=R.isInstancedMesh===!0?R.id:0,B=z[W];if(B!==void 0){for(const V in B){const F=B[V];for(const Q in F)h(F[Q].object),delete F[Q];delete B[V]}delete z[W],Object.keys(z).length===0&&delete i[k]}}}function E(){Y(),a=!0,r!==s&&(r=s,l(r.object))}function Y(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:Y,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfObject:v,releaseStatesOfProgram:C,initAttributes:x,enableAttribute:m,disableUnusedAttributes:y}}function Q2(e,t,n){let i;function s(l){i=l}function r(l,h){e.drawArrays(i,l,h),n.update(h,i,1)}function a(l,h,d){d!==0&&(e.drawArraysInstanced(i,l,h,d),n.update(h,i,d))}function o(l,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,d);let f=0;for(let g=0;g<d;g++)f+=h[g];n.update(f,i,1)}function c(l,h,d,u){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)a(l[g],h[g],u[g]);else{f.multiDrawArraysInstancedWEBGL(i,l,0,h,0,u,0,d);let g=0;for(let x=0;x<d;x++)g+=h[x]*u[x];n.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function t3(e,t,n,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const C=t.get("EXT_texture_filter_anisotropic");s=e.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==li&&i.convert(C)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){const v=C===es&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(C!==Kn&&i.convert(C)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==bi&&!v)}function c(C){if(C==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=n.precision!==void 0?n.precision:"highp";const h=c(l);h!==l&&(Ft("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=e.getParameter(e.MAX_TEXTURE_SIZE),m=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),p=e.getParameter(e.MAX_VERTEX_ATTRIBS),y=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),A=e.getParameter(e.MAX_VARYING_VECTORS),S=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),w=e.getParameter(e.MAX_SAMPLES),T=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:y,maxVaryings:A,maxFragmentUniforms:S,maxSamples:w,samples:T}}function e3(e){const t=this;let n=null,i=0,s=!1,r=!1;const a=new Hs,o=new Ht,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||i!==0||s;return s=u,i=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){n=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,x=d.clipIntersection,m=d.clipShadows,p=e.get(d);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const y=r?0:i,A=y*4;let S=p.clippingState||null;c.value=S,S=h(g,u,A,f);for(let w=0;w!==A;++w)S[w]=n[w];p.clippingState=S,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(d,u,f,g){const x=d!==null?d.length:0;let m=null;if(x!==0){if(m=c.value,g!==!0||m===null){const p=f+x*4,y=u.matrixWorldInverse;o.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let A=0,S=f;A!==x;++A,S+=4)a.copy(d[A]).applyMatrix4(y,o),a.normal.toArray(m,S),m[S+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,m}}const bs=4,zf=[.125,.215,.35,.446,.526,.582],Ws=20,n3=256,La=new c0,Vf=new $t;let Vl=null,Hl=0,Gl=0,Wl=!1;const i3=new D;class Hf{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,i=.1,s=100,r={}){const{size:a=256,position:o=i3}=r;Vl=this._renderer.getRenderTarget(),Hl=this._renderer.getActiveCubeFace(),Gl=this._renderer.getActiveMipmapLevel(),Wl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,o),n>0&&this._blur(c,0,0,n),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Vl,Hl,Gl),this._renderer.xr.enabled=Wl,t.scissorTest=!1,Tr(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===sr||t.mapping===Hr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Vl=this._renderer.getRenderTarget(),Hl=this._renderer.getActiveCubeFace(),Gl=this._renderer.getActiveMipmapLevel(),Wl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Ze,minFilter:Ze,generateMipmaps:!1,type:es,format:li,colorSpace:Wr,depthBuffer:!1},s=Gf(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gf(t,n,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=s3(r)),this._blurMaterial=a3(r,t,n),this._ggxMaterial=r3(r,t,n)}return s}_compileMaterial(t){const n=new _n(new He,t);this._renderer.compile(n,La)}_sceneToCubeUV(t,n,i,s,r){const c=new qn(90,1,n,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(Vf),d.toneMapping=Ci,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new _n(new io,new ha({name:"PMREM.Background",side:mn,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,m=x.material;let p=!1;const y=t.background;y?y.isColor&&(m.color.copy(y),t.background=null,p=!0):(m.color.copy(Vf),p=!0);for(let A=0;A<6;A++){const S=A%3;S===0?(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+h[A],r.y,r.z)):S===1?(c.up.set(0,0,l[A]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+h[A],r.z)):(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+h[A]));const w=this._cubeSize;Tr(s,S*w,A>2?w:0,w,w),d.setRenderTarget(s),p&&d.render(x,c),d.render(t,c)}d.toneMapping=f,d.autoClear=u,t.background=y}_textureToCubeUV(t,n){const i=this._renderer,s=t.mapping===sr||t.mapping===Hr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wf());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;Tr(n,0,0,3*c,2*c),i.setRenderTarget(n),i.render(a,La)}_applyPMREM(t){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);n.autoClear=i}_applyGGXFilter(t,n,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),h=n/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=0+l*1.25,f=d*u,{_lodMax:g}=this,x=this._sizeLods[i],m=3*x*(i>g-bs?i-g+bs:0),p=4*(this._cubeSize-x);c.envMap.value=t.texture,c.roughness.value=f,c.mipInt.value=g-n,Tr(r,m,p,3*x,2*x),s.setRenderTarget(r),s.render(o,La),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-i,Tr(t,m,p,3*x,2*x),s.setRenderTarget(t),s.render(o,La)}_blur(t,n,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,n,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,n,i,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&te("blur direction must be either latitudinal or longitudinal!");const h=3,d=this._lodMeshes[s];d.material=l;const u=l.uniforms,f=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Ws-1),x=r/g,m=isFinite(r)?1+Math.floor(h*x):Ws;m>Ws&&Ft(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ws}`);const p=[];let y=0;for(let C=0;C<Ws;++C){const v=C/x,E=Math.exp(-v*v/2);p.push(E),C===0?y+=E:C<m&&(y+=2*E)}for(let C=0;C<p.length;C++)p[C]=p[C]/y;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:A}=this;u.dTheta.value=g,u.mipInt.value=A-i;const S=this._sizeLods[s],w=3*S*(s>A-bs?s-A+bs:0),T=4*(this._cubeSize-S);Tr(n,w,T,3*S,2*S),c.setRenderTarget(n),c.render(d,La)}}function s3(e){const t=[],n=[],i=[];let s=e;const r=e-bs+1+zf.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>e-bs?c=zf[a-e+bs-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,x=3,m=2,p=1,y=new Float32Array(x*g*f),A=new Float32Array(m*g*f),S=new Float32Array(p*g*f);for(let T=0;T<f;T++){const C=T%3*2/3-1,v=T>2?0:-1,E=[C,v,0,C+2/3,v,0,C+2/3,v+1,0,C,v,0,C+2/3,v+1,0,C,v+1,0];y.set(E,x*g*T),A.set(u,m*g*T);const Y=[T,T,T,T,T,T];S.set(Y,p*g*T)}const w=new He;w.setAttribute("position",new cn(y,x)),w.setAttribute("uv",new cn(A,m)),w.setAttribute("faceIndex",new cn(S,p)),i.push(new _n(w,null)),s>bs&&s--}return{lodMeshes:i,sizeLods:t,sigmas:n}}function Gf(e,t,n){const i=new Ri(e,t,n);return i.texture.mapping=Uc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Tr(e,t,n,i,s){e.viewport.set(t,n,i,s),e.scissor.set(t,n,i,s)}function r3(e,t,n){return new ui({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:n3,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Fc(),fragmentShader:`

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
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function a3(e,t,n){const i=new Float32Array(Ws),s=new D(0,1,0);return new ui({name:"SphericalGaussianBlur",defines:{n:Ws,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Fc(),fragmentShader:`

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
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function Wf(){return new ui({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Fc(),fragmentShader:`

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
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function Xf(){return new ui({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ji,depthTest:!1,depthWrite:!1})}function Fc(){return`

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
	`}class h0 extends Ri{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new s0(s),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new io(5,5,5),r=new ui({name:"CubemapFromEquirect",uniforms:Xr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:mn,blending:Ji});r.uniforms.tEquirect.value=n;const a=new _n(s,r),o=n.minFilter;return n.minFilter===Ys&&(n.minFilter=Ze),new fv(1,10,this).update(t,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,n=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(n,i,s);t.setRenderTarget(r)}}function o3(e){let t=new WeakMap,n=new WeakMap,i=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){const f=u.mapping;if(f===dl||f===fl)if(t.has(u)){const g=t.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const x=new h0(g.height);return x.fromEquirectangularTexture(e,u),t.set(u,x),u.addEventListener("dispose",l),o(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const f=u.mapping,g=f===dl||f===fl,x=f===sr||f===Hr;if(g||x){let m=n.get(u);const p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return i===null&&(i=new Hf(e)),m=g?i.fromEquirectangular(u,m):i.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,n.set(u,m),m.texture;if(m!==void 0)return m.texture;{const y=u.image;return g&&y&&y.height>0||x&&y&&c(y)?(i===null&&(i=new Hf(e)),m=g?i.fromEquirectangular(u):i.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,n.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===dl?u.mapping=sr:f===fl&&(u.mapping=Hr),u}function c(u){let f=0;const g=6;for(let x=0;x<g;x++)u[x]!==void 0&&f++;return f===g}function l(u){const f=u.target;f.removeEventListener("dispose",l);const g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function h(u){const f=u.target;f.removeEventListener("dispose",h);const g=n.get(f);g!==void 0&&(n.delete(f),g.dispose())}function d(){t=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function c3(e){const t={};function n(i){if(t[i]!==void 0)return t[i];const s=e.getExtension(i);return t[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const s=n(i);return s===null&&Mc("WebGLRenderer: "+i+" extension not supported."),s}}}function l3(e,t,n,i){const s={},r=new WeakMap;function a(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete s[u.id];const f=r.get(u);f&&(t.remove(f),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,n.memory.geometries++),u}function c(d){const u=d.attributes;for(const f in u)t.update(u[f],e.ARRAY_BUFFER)}function l(d){const u=[],f=d.index,g=d.attributes.position;let x=0;if(g===void 0)return;if(f!==null){const y=f.array;x=f.version;for(let A=0,S=y.length;A<S;A+=3){const w=y[A+0],T=y[A+1],C=y[A+2];u.push(w,T,T,C,C,w)}}else{const y=g.array;x=g.version;for(let A=0,S=y.length/3-1;A<S;A+=3){const w=A+0,T=A+1,C=A+2;u.push(w,T,T,C,C,w)}}const m=new(g.count>=65535?n0:e0)(u,1);m.version=x;const p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function h3(e,t,n){let i;function s(u){i=u}let r,a;function o(u){r=u.type,a=u.bytesPerElement}function c(u,f){e.drawElements(i,f,r,u*a),n.update(f,i,1)}function l(u,f,g){g!==0&&(e.drawElementsInstanced(i,f,r,u*a,g),n.update(f,i,g))}function h(u,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,r,u,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];n.update(m,i,1)}function d(u,f,g,x){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<u.length;p++)l(u[p]/a,f[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,r,u,0,x,0,g);let p=0;for(let y=0;y<g;y++)p+=f[y]*x[y];n.update(p,i,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function u3(e){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(n.calls++,a){case e.TRIANGLES:n.triangles+=o*(r/3);break;case e.LINES:n.lines+=o*(r/2);break;case e.LINE_STRIP:n.lines+=o*(r-1);break;case e.LINE_LOOP:n.lines+=o*r;break;case e.POINTS:n.points+=o*r;break;default:te("WebGLInfo: Unknown draw mode:",a);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:s,update:i}}function d3(e,t,n){const i=new WeakMap,s=new De;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==d){let Y=function(){v.dispose(),i.delete(o),o.removeEventListener("dispose",Y)};var f=Y;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],A=o.morphAttributes.color||[];let S=0;g===!0&&(S=1),x===!0&&(S=2),m===!0&&(S=3);let w=o.attributes.position.count*S,T=1;w>t.maxTextureSize&&(T=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const C=new Float32Array(w*T*4*d),v=new Jm(C,w,T,d);v.type=bi,v.needsUpdate=!0;const E=S*4;for(let R=0;R<d;R++){const k=p[R],z=y[R],W=A[R],B=w*T*4*R;for(let V=0;V<k.count;V++){const F=V*E;g===!0&&(s.fromBufferAttribute(k,V),C[B+F+0]=s.x,C[B+F+1]=s.y,C[B+F+2]=s.z,C[B+F+3]=0),x===!0&&(s.fromBufferAttribute(z,V),C[B+F+4]=s.x,C[B+F+5]=s.y,C[B+F+6]=s.z,C[B+F+7]=0),m===!0&&(s.fromBufferAttribute(W,V),C[B+F+8]=s.x,C[B+F+9]=s.y,C[B+F+10]=s.z,C[B+F+11]=W.itemSize===4?s.w:1)}}u={count:d,texture:v,size:new se(w,T)},i.set(o,u),o.addEventListener("dispose",Y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(e,"morphTexture",a.morphTexture,n);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const x=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(e,"morphTargetBaseInfluence",x),c.getUniforms().setValue(e,"morphTargetInfluences",l)}c.getUniforms().setValue(e,"morphTargetsTexture",u.texture,n),c.getUniforms().setValue(e,"morphTargetsTextureSize",u.size)}return{update:r}}function f3(e,t,n,i,s){let r=new WeakMap;function a(l){const h=s.render.frame,d=l.geometry,u=t.get(l,d);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==h&&(n.update(l.instanceMatrix,e.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,e.ARRAY_BUFFER),r.set(l,h))),l.isSkinnedMesh){const f=l.skeleton;r.get(f)!==h&&(f.update(),r.set(f,h))}return u}function o(){r=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),n.remove(h.instanceMatrix),h.instanceColor!==null&&n.remove(h.instanceColor)}return{update:a,dispose:o}}const p3={[Fm]:"LINEAR_TONE_MAPPING",[Nm]:"REINHARD_TONE_MAPPING",[Om]:"CINEON_TONE_MAPPING",[Bm]:"ACES_FILMIC_TONE_MAPPING",[zm]:"AGX_TONE_MAPPING",[Vm]:"NEUTRAL_TONE_MAPPING",[km]:"CUSTOM_TONE_MAPPING"};function m3(e,t,n,i,s){const r=new Ri(t,n,{type:e,depthBuffer:i,stencilBuffer:s}),a=new Ri(t,n,{type:es,depthBuffer:!1,stencilBuffer:!1}),o=new He;o.setAttribute("position",new Ce([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Ce([0,2,0,0,2,0],2));const c=new rv({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new _n(o,c),h=new c0(-1,1,1,-1,0,1);let d=null,u=null,f=!1,g,x=null,m=[],p=!1;this.setSize=function(y,A){r.setSize(y,A),a.setSize(y,A);for(let S=0;S<m.length;S++){const w=m[S];w.setSize&&w.setSize(y,A)}},this.setEffects=function(y){m=y,p=m.length>0&&m[0].isRenderPass===!0;const A=r.width,S=r.height;for(let w=0;w<m.length;w++){const T=m[w];T.setSize&&T.setSize(A,S)}},this.begin=function(y,A){if(f||y.toneMapping===Ci&&m.length===0)return!1;if(x=A,A!==null){const S=A.width,w=A.height;(r.width!==S||r.height!==w)&&this.setSize(S,w)}return p===!1&&y.setRenderTarget(r),g=y.toneMapping,y.toneMapping=Ci,!0},this.hasRenderPass=function(){return p},this.end=function(y,A){y.toneMapping=g,f=!0;let S=r,w=a;for(let T=0;T<m.length;T++){const C=m[T];if(C.enabled!==!1&&(C.render(y,w,S,A),C.needsSwap!==!1)){const v=S;S=w,w=v}}if(d!==y.outputColorSpace||u!==y.toneMapping){d=y.outputColorSpace,u=y.toneMapping,c.defines={},Zt.getTransfer(d)===oe&&(c.defines.SRGB_TRANSFER="");const T=p3[u];T&&(c.defines[T]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=S.texture,y.setRenderTarget(x),y.render(l,h),x=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){r.dispose(),a.dispose(),o.dispose(),c.dispose()}}const u0=new hn,nu=new qa(1,1),d0=new Jm,f0=new R1,p0=new s0,Yf=[],qf=[],$f=new Float32Array(16),jf=new Float32Array(9),Kf=new Float32Array(4);function ua(e,t,n){const i=e[0];if(i<=0||i>0)return e;const s=t*n;let r=Yf[s];if(r===void 0&&(r=new Float32Array(s),Yf[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=n,e[a].toArray(r,o)}return r}function Ge(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function We(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function Nc(e,t){let n=qf[t];n===void 0&&(n=new Int32Array(t),qf[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function g3(e,t){const n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function _3(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ge(n,t))return;e.uniform2fv(this.addr,t),We(n,t)}}function v3(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Ge(n,t))return;e.uniform3fv(this.addr,t),We(n,t)}}function x3(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ge(n,t))return;e.uniform4fv(this.addr,t),We(n,t)}}function M3(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Ge(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),We(n,t)}else{if(Ge(n,i))return;Kf.set(i),e.uniformMatrix2fv(this.addr,!1,Kf),We(n,i)}}function y3(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Ge(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),We(n,t)}else{if(Ge(n,i))return;jf.set(i),e.uniformMatrix3fv(this.addr,!1,jf),We(n,i)}}function S3(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Ge(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),We(n,t)}else{if(Ge(n,i))return;$f.set(i),e.uniformMatrix4fv(this.addr,!1,$f),We(n,i)}}function E3(e,t){const n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function b3(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ge(n,t))return;e.uniform2iv(this.addr,t),We(n,t)}}function A3(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ge(n,t))return;e.uniform3iv(this.addr,t),We(n,t)}}function T3(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ge(n,t))return;e.uniform4iv(this.addr,t),We(n,t)}}function w3(e,t){const n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function C3(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ge(n,t))return;e.uniform2uiv(this.addr,t),We(n,t)}}function R3(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ge(n,t))return;e.uniform3uiv(this.addr,t),We(n,t)}}function P3(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ge(n,t))return;e.uniform4uiv(this.addr,t),We(n,t)}}function L3(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s);let r;this.type===e.SAMPLER_2D_SHADOW?(nu.compareFunction=n.isReversedDepthBuffer()?Vu:zu,r=nu):r=u0,n.setTexture2D(t||r,s)}function I3(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture3D(t||f0,s)}function D3(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTextureCube(t||p0,s)}function U3(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture2DArray(t||d0,s)}function F3(e){switch(e){case 5126:return g3;case 35664:return _3;case 35665:return v3;case 35666:return x3;case 35674:return M3;case 35675:return y3;case 35676:return S3;case 5124:case 35670:return E3;case 35667:case 35671:return b3;case 35668:case 35672:return A3;case 35669:case 35673:return T3;case 5125:return w3;case 36294:return C3;case 36295:return R3;case 36296:return P3;case 35678:case 36198:case 36298:case 36306:case 35682:return L3;case 35679:case 36299:case 36307:return I3;case 35680:case 36300:case 36308:case 36293:return D3;case 36289:case 36303:case 36311:case 36292:return U3}}function N3(e,t){e.uniform1fv(this.addr,t)}function O3(e,t){const n=ua(t,this.size,2);e.uniform2fv(this.addr,n)}function B3(e,t){const n=ua(t,this.size,3);e.uniform3fv(this.addr,n)}function k3(e,t){const n=ua(t,this.size,4);e.uniform4fv(this.addr,n)}function z3(e,t){const n=ua(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function V3(e,t){const n=ua(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function H3(e,t){const n=ua(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function G3(e,t){e.uniform1iv(this.addr,t)}function W3(e,t){e.uniform2iv(this.addr,t)}function X3(e,t){e.uniform3iv(this.addr,t)}function Y3(e,t){e.uniform4iv(this.addr,t)}function q3(e,t){e.uniform1uiv(this.addr,t)}function $3(e,t){e.uniform2uiv(this.addr,t)}function j3(e,t){e.uniform3uiv(this.addr,t)}function K3(e,t){e.uniform4uiv(this.addr,t)}function Z3(e,t,n){const i=this.cache,s=t.length,r=Nc(n,s);Ge(i,r)||(e.uniform1iv(this.addr,r),We(i,r));let a;this.type===e.SAMPLER_2D_SHADOW?a=nu:a=u0;for(let o=0;o!==s;++o)n.setTexture2D(t[o]||a,r[o])}function J3(e,t,n){const i=this.cache,s=t.length,r=Nc(n,s);Ge(i,r)||(e.uniform1iv(this.addr,r),We(i,r));for(let a=0;a!==s;++a)n.setTexture3D(t[a]||f0,r[a])}function Q3(e,t,n){const i=this.cache,s=t.length,r=Nc(n,s);Ge(i,r)||(e.uniform1iv(this.addr,r),We(i,r));for(let a=0;a!==s;++a)n.setTextureCube(t[a]||p0,r[a])}function tM(e,t,n){const i=this.cache,s=t.length,r=Nc(n,s);Ge(i,r)||(e.uniform1iv(this.addr,r),We(i,r));for(let a=0;a!==s;++a)n.setTexture2DArray(t[a]||d0,r[a])}function eM(e){switch(e){case 5126:return N3;case 35664:return O3;case 35665:return B3;case 35666:return k3;case 35674:return z3;case 35675:return V3;case 35676:return H3;case 5124:case 35670:return G3;case 35667:case 35671:return W3;case 35668:case 35672:return X3;case 35669:case 35673:return Y3;case 5125:return q3;case 36294:return $3;case 36295:return j3;case 36296:return K3;case 35678:case 36198:case 36298:case 36306:case 35682:return Z3;case 35679:case 36299:case 36307:return J3;case 35680:case 36300:case 36308:case 36293:return Q3;case 36289:case 36303:case 36311:case 36292:return tM}}class nM{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=F3(n.type)}}class iM{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=eM(n.type)}}class sM{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,n[o.id],i)}}}const Xl=/(\w+)(\])?(\[|\.)?/g;function Zf(e,t){e.seq.push(t),e.map[t.id]=t}function rM(e,t,n){const i=e.name,s=i.length;for(Xl.lastIndex=0;;){const r=Xl.exec(i),a=Xl.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Zf(n,l===void 0?new nM(o,e,t):new iM(o,e,t));break}else{let d=n.map[o];d===void 0&&(d=new sM(o),Zf(n,d)),n=d}}}class lc{constructor(t,n){this.seq=[],this.map={};const i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=t.getActiveUniform(n,a),c=t.getUniformLocation(n,o.name);rM(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,n,i,s){const r=this.map[n];r!==void 0&&r.setValue(t,i,s)}setOptional(t,n,i){const s=n[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,n,i,s){for(let r=0,a=n.length;r!==a;++r){const o=n[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,n){const i=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in n&&i.push(a)}return i}}function Jf(e,t,n){const i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}const aM=37297;let oM=0;function cM(e,t){const n=e.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,n.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}const Qf=new Ht;function lM(e){Zt._getMatrix(Qf,Zt.workingColorSpace,e);const t=`mat3( ${Qf.elements.map(n=>n.toFixed(4))} )`;switch(Zt.getTransfer(e)){case _c:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return Ft("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function tp(e,t,n){const i=e.getShaderParameter(t,e.COMPILE_STATUS),r=(e.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return n.toUpperCase()+`

`+r+`

`+cM(e.getShaderSource(t),o)}else return r}function hM(e,t){const n=lM(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const uM={[Fm]:"Linear",[Nm]:"Reinhard",[Om]:"Cineon",[Bm]:"ACESFilmic",[zm]:"AgX",[Vm]:"Neutral",[km]:"Custom"};function dM(e,t){const n=uM[t];return n===void 0?(Ft("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Wo=new D;function fM(){Zt.getLuminanceCoefficients(Wo);const e=Wo.x.toFixed(4),t=Wo.y.toFixed(4),n=Wo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function pM(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ba).join(`
`)}function mM(e){const t=[];for(const n in e){const i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function gM(e,t){const n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=e.getActiveAttrib(t,s),a=r.name;let o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Ba(e){return e!==""}function ep(e,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function np(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const _M=/^[ \t]*#include +<([\w\d./]+)>/gm;function iu(e){return e.replace(_M,xM)}const vM=new Map;function xM(e,t){let n=Gt[t];if(n===void 0){const i=vM.get(t);if(i!==void 0)n=Gt[i],Ft('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return iu(n)}const MM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ip(e){return e.replace(MM,yM)}function yM(e,t,n,i){let s="";for(let r=parseInt(t);r<parseInt(n);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function sp(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision==="highp"?t+=`
#define HIGH_PRECISION`:e.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:e.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const SM={[sc]:"SHADOWMAP_TYPE_PCF",[Oa]:"SHADOWMAP_TYPE_VSM"};function EM(e){return SM[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const bM={[sr]:"ENVMAP_TYPE_CUBE",[Hr]:"ENVMAP_TYPE_CUBE",[Uc]:"ENVMAP_TYPE_CUBE_UV"};function AM(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":bM[e.envMapMode]||"ENVMAP_TYPE_CUBE"}const TM={[Hr]:"ENVMAP_MODE_REFRACTION"};function wM(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":TM[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}const CM={[Du]:"ENVMAP_BLENDING_MULTIPLY",[c1]:"ENVMAP_BLENDING_MIX",[l1]:"ENVMAP_BLENDING_ADD"};function RM(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":CM[e.combine]||"ENVMAP_BLENDING_NONE"}function PM(e){const t=e.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function LM(e,t,n,i){const s=e.getContext(),r=n.defines;let a=n.vertexShader,o=n.fragmentShader;const c=EM(n),l=AM(n),h=wM(n),d=RM(n),u=PM(n),f=pM(n),g=mM(r),x=s.createProgram();let m,p,y=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(m=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(Ba).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(Ba).join(`
`),p.length>0&&(p+=`
`)):(m=[sp(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ba).join(`
`),p=[sp(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+l:"",n.envMap?"#define "+h:"",n.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==Ci?"#define TONE_MAPPING":"",n.toneMapping!==Ci?Gt.tonemapping_pars_fragment:"",n.toneMapping!==Ci?dM("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Gt.colorspace_pars_fragment,hM("linearToOutputTexel",n.outputColorSpace),fM(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ba).join(`
`)),a=iu(a),a=ep(a,n),a=np(a,n),o=iu(o),o=ep(o,n),o=np(o,n),a=ip(a),o=ip(o),n.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",n.glslVersion===df?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===df?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const A=y+m+a,S=y+p+o,w=Jf(s,s.VERTEX_SHADER,A),T=Jf(s,s.FRAGMENT_SHADER,S);s.attachShader(x,w),s.attachShader(x,T),n.index0AttributeName!==void 0?s.bindAttribLocation(x,0,n.index0AttributeName):n.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function C(R){if(e.debug.checkShaderErrors){const k=s.getProgramInfoLog(x)||"",z=s.getShaderInfoLog(w)||"",W=s.getShaderInfoLog(T)||"",B=k.trim(),V=z.trim(),F=W.trim();let Q=!0,j=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(Q=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(s,x,w,T);else{const lt=tp(s,w,"vertex"),pt=tp(s,T,"fragment");te("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+B+`
`+lt+`
`+pt)}else B!==""?Ft("WebGLProgram: Program Info Log:",B):(V===""||F==="")&&(j=!1);j&&(R.diagnostics={runnable:Q,programLog:B,vertexShader:{log:V,prefix:m},fragmentShader:{log:F,prefix:p}})}s.deleteShader(w),s.deleteShader(T),v=new lc(s,x),E=gM(s,x)}let v;this.getUniforms=function(){return v===void 0&&C(this),v};let E;this.getAttributes=function(){return E===void 0&&C(this),E};let Y=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return Y===!1&&(Y=s.getProgramParameter(x,aM)),Y},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=oM++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=T,this}let IM=0;class DM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(n),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){const n=this.shaderCache;let i=n.get(t);return i===void 0&&(i=new UM(t),n.set(t,i)),i}}class UM{constructor(t){this.id=IM++,this.code=t,this.usedTimes=0}}function FM(e,t,n,i,s,r){const a=new Qm,o=new DM,c=new Set,l=[],h=new Map,d=i.logarithmicDepthBuffer;let u=i.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return c.add(v),v===0?"uv":`uv${v}`}function x(v,E,Y,R,k){const z=R.fog,W=k.geometry,B=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?R.environment:null,V=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,F=t.get(v.envMap||B,V),Q=F&&F.mapping===Uc?F.image.height:null,j=f[v.type];v.precision!==null&&(u=i.getMaxPrecision(v.precision),u!==v.precision&&Ft("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const lt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,pt=lt!==void 0?lt.length:0;let ht=0;W.morphAttributes.position!==void 0&&(ht=1),W.morphAttributes.normal!==void 0&&(ht=2),W.morphAttributes.color!==void 0&&(ht=3);let kt,de,ce,$;if(j){const ae=yi[j];kt=ae.vertexShader,de=ae.fragmentShader}else kt=v.vertexShader,de=v.fragmentShader,o.update(v),ce=o.getVertexShaderID(v),$=o.getFragmentShaderID(v);const nt=e.getRenderTarget(),rt=e.state.buffers.depth.getReversed(),Vt=k.isInstancedMesh===!0,Dt=k.isBatchedMesh===!0,Ot=!!v.map,Ye=!!v.matcap,Kt=!!F,re=!!v.aoMap,fe=!!v.lightMap,Wt=!!v.bumpMap,Pe=!!v.normalMap,P=!!v.displacementMap,Ue=!!v.emissiveMap,ie=!!v.metalnessMap,ge=!!v.roughnessMap,St=v.anisotropy>0,b=v.clearcoat>0,_=v.dispersion>0,I=v.iridescence>0,q=v.sheen>0,K=v.transmission>0,X=St&&!!v.anisotropyMap,_t=b&&!!v.clearcoatMap,it=b&&!!v.clearcoatNormalMap,Pt=b&&!!v.clearcoatRoughnessMap,Ut=I&&!!v.iridescenceMap,Z=I&&!!v.iridescenceThicknessMap,tt=q&&!!v.sheenColorMap,vt=q&&!!v.sheenRoughnessMap,Mt=!!v.specularMap,ut=!!v.specularColorMap,Xt=!!v.specularIntensityMap,L=K&&!!v.transmissionMap,st=K&&!!v.thicknessMap,et=!!v.gradientMap,mt=!!v.alphaMap,J=v.alphaTest>0,G=!!v.alphaHash,xt=!!v.extensions;let Bt=Ci;v.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(Bt=e.toneMapping);const _e={shaderID:j,shaderType:v.type,shaderName:v.name,vertexShader:kt,fragmentShader:de,defines:v.defines,customVertexShaderID:ce,customFragmentShaderID:$,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:Dt,batchingColor:Dt&&k._colorsTexture!==null,instancing:Vt,instancingColor:Vt&&k.instanceColor!==null,instancingMorph:Vt&&k.morphTexture!==null,outputColorSpace:nt===null?e.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Wr,alphaToCoverage:!!v.alphaToCoverage,map:Ot,matcap:Ye,envMap:Kt,envMapMode:Kt&&F.mapping,envMapCubeUVHeight:Q,aoMap:re,lightMap:fe,bumpMap:Wt,normalMap:Pe,displacementMap:P,emissiveMap:Ue,normalMapObjectSpace:Pe&&v.normalMapType===d1,normalMapTangentSpace:Pe&&v.normalMapType===Km,metalnessMap:ie,roughnessMap:ge,anisotropy:St,anisotropyMap:X,clearcoat:b,clearcoatMap:_t,clearcoatNormalMap:it,clearcoatRoughnessMap:Pt,dispersion:_,iridescence:I,iridescenceMap:Ut,iridescenceThicknessMap:Z,sheen:q,sheenColorMap:tt,sheenRoughnessMap:vt,specularMap:Mt,specularColorMap:ut,specularIntensityMap:Xt,transmission:K,transmissionMap:L,thicknessMap:st,gradientMap:et,opaque:v.transparent===!1&&v.blending===Dr&&v.alphaToCoverage===!1,alphaMap:mt,alphaTest:J,alphaHash:G,combine:v.combine,mapUv:Ot&&g(v.map.channel),aoMapUv:re&&g(v.aoMap.channel),lightMapUv:fe&&g(v.lightMap.channel),bumpMapUv:Wt&&g(v.bumpMap.channel),normalMapUv:Pe&&g(v.normalMap.channel),displacementMapUv:P&&g(v.displacementMap.channel),emissiveMapUv:Ue&&g(v.emissiveMap.channel),metalnessMapUv:ie&&g(v.metalnessMap.channel),roughnessMapUv:ge&&g(v.roughnessMap.channel),anisotropyMapUv:X&&g(v.anisotropyMap.channel),clearcoatMapUv:_t&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:it&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pt&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Ut&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:tt&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:vt&&g(v.sheenRoughnessMap.channel),specularMapUv:Mt&&g(v.specularMap.channel),specularColorMapUv:ut&&g(v.specularColorMap.channel),specularIntensityMapUv:Xt&&g(v.specularIntensityMap.channel),transmissionMapUv:L&&g(v.transmissionMap.channel),thicknessMapUv:st&&g(v.thicknessMap.channel),alphaMapUv:mt&&g(v.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(Pe||St),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!W.attributes.uv&&(Ot||mt),fog:!!z,useFog:v.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||W.attributes.normal===void 0&&Pe===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:rt,skinning:k.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:pt,morphTextureStride:ht,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:e.shadowMap.enabled&&Y.length>0,shadowMapType:e.shadowMap.type,toneMapping:Bt,decodeVideoTexture:Ot&&v.map.isVideoTexture===!0&&Zt.getTransfer(v.map.colorSpace)===oe,decodeVideoTextureEmissive:Ue&&v.emissiveMap.isVideoTexture===!0&&Zt.getTransfer(v.emissiveMap.colorSpace)===oe,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Si,flipSided:v.side===mn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:xt&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xt&&v.extensions.multiDraw===!0||Dt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return _e.vertexUv1s=c.has(1),_e.vertexUv2s=c.has(2),_e.vertexUv3s=c.has(3),c.clear(),_e}function m(v){const E=[];if(v.shaderID?E.push(v.shaderID):(E.push(v.customVertexShaderID),E.push(v.customFragmentShaderID)),v.defines!==void 0)for(const Y in v.defines)E.push(Y),E.push(v.defines[Y]);return v.isRawShaderMaterial===!1&&(p(E,v),y(E,v),E.push(e.outputColorSpace)),E.push(v.customProgramCacheKey),E.join()}function p(v,E){v.push(E.precision),v.push(E.outputColorSpace),v.push(E.envMapMode),v.push(E.envMapCubeUVHeight),v.push(E.mapUv),v.push(E.alphaMapUv),v.push(E.lightMapUv),v.push(E.aoMapUv),v.push(E.bumpMapUv),v.push(E.normalMapUv),v.push(E.displacementMapUv),v.push(E.emissiveMapUv),v.push(E.metalnessMapUv),v.push(E.roughnessMapUv),v.push(E.anisotropyMapUv),v.push(E.clearcoatMapUv),v.push(E.clearcoatNormalMapUv),v.push(E.clearcoatRoughnessMapUv),v.push(E.iridescenceMapUv),v.push(E.iridescenceThicknessMapUv),v.push(E.sheenColorMapUv),v.push(E.sheenRoughnessMapUv),v.push(E.specularMapUv),v.push(E.specularColorMapUv),v.push(E.specularIntensityMapUv),v.push(E.transmissionMapUv),v.push(E.thicknessMapUv),v.push(E.combine),v.push(E.fogExp2),v.push(E.sizeAttenuation),v.push(E.morphTargetsCount),v.push(E.morphAttributeCount),v.push(E.numDirLights),v.push(E.numPointLights),v.push(E.numSpotLights),v.push(E.numSpotLightMaps),v.push(E.numHemiLights),v.push(E.numRectAreaLights),v.push(E.numDirLightShadows),v.push(E.numPointLightShadows),v.push(E.numSpotLightShadows),v.push(E.numSpotLightShadowsWithMaps),v.push(E.numLightProbes),v.push(E.shadowMapType),v.push(E.toneMapping),v.push(E.numClippingPlanes),v.push(E.numClipIntersection),v.push(E.depthPacking)}function y(v,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),v.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),v.push(a.mask)}function A(v){const E=f[v.type];let Y;if(E){const R=yi[E];Y=nv.clone(R.uniforms)}else Y=v.uniforms;return Y}function S(v,E){let Y=h.get(E);return Y!==void 0?++Y.usedTimes:(Y=new LM(e,E,v,s),l.push(Y),h.set(E,Y)),Y}function w(v){if(--v.usedTimes===0){const E=l.indexOf(v);l[E]=l[l.length-1],l.pop(),h.delete(v.cacheKey),v.destroy()}}function T(v){o.remove(v)}function C(){o.dispose()}return{getParameters:x,getProgramCacheKey:m,getUniforms:A,acquireProgram:S,releaseProgram:w,releaseShaderCache:T,programs:l,dispose:C}}function NM(){let e=new WeakMap;function t(a){return e.has(a)}function n(a){let o=e.get(a);return o===void 0&&(o={},e.set(a,o)),o}function i(a){e.delete(a)}function s(a,o,c){e.get(a)[o]=c}function r(){e=new WeakMap}return{has:t,get:n,remove:i,update:s,dispose:r}}function OM(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function rp(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function ap(){const e=[];let t=0;const n=[],i=[],s=[];function r(){t=0,n.length=0,i.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,x,m,p){let y=e[t];return y===void 0?(y={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:m,group:p},e[t]=y):(y.id=u.id,y.object=u,y.geometry=f,y.material=g,y.materialVariant=a(u),y.groupOrder=x,y.renderOrder=u.renderOrder,y.z=m,y.group=p),t++,y}function c(u,f,g,x,m,p){const y=o(u,f,g,x,m,p);g.transmission>0?i.push(y):g.transparent===!0?s.push(y):n.push(y)}function l(u,f,g,x,m,p){const y=o(u,f,g,x,m,p);g.transmission>0?i.unshift(y):g.transparent===!0?s.unshift(y):n.unshift(y)}function h(u,f){n.length>1&&n.sort(u||OM),i.length>1&&i.sort(f||rp),s.length>1&&s.sort(f||rp)}function d(){for(let u=t,f=e.length;u<f;u++){const g=e[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:n,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:d,sort:h}}function BM(){let e=new WeakMap;function t(i,s){const r=e.get(i);let a;return r===void 0?(a=new ap,e.set(i,[a])):s>=r.length?(a=new ap,r.push(a)):a=r[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}function kM(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new D,color:new $t};break;case"SpotLight":n={position:new D,direction:new D,color:new $t,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new D,color:new $t,distance:0,decay:0};break;case"HemisphereLight":n={direction:new D,skyColor:new $t,groundColor:new $t};break;case"RectAreaLight":n={color:new $t,position:new D,halfWidth:new D,halfHeight:new D};break}return e[t.id]=n,n}}}function zM(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new se,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}let VM=0;function HM(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function GM(e){const t=new kM,n=zM(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new D);const s=new D,r=new Ae,a=new Ae;function o(l){let h=0,d=0,u=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,y=0,A=0,S=0,w=0,T=0,C=0;l.sort(HM);for(let E=0,Y=l.length;E<Y;E++){const R=l[E],k=R.color,z=R.intensity,W=R.distance;let B=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Gr?B=R.shadow.map.texture:B=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)h+=k.r*z,d+=k.g*z,u+=k.b*z;else if(R.isLightProbe){for(let V=0;V<9;V++)i.probe[V].addScaledVector(R.sh.coefficients[V],z);C++}else if(R.isDirectionalLight){const V=t.get(R);if(V.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const F=R.shadow,Q=n.get(R);Q.shadowIntensity=F.intensity,Q.shadowBias=F.bias,Q.shadowNormalBias=F.normalBias,Q.shadowRadius=F.radius,Q.shadowMapSize=F.mapSize,i.directionalShadow[f]=Q,i.directionalShadowMap[f]=B,i.directionalShadowMatrix[f]=R.shadow.matrix,y++}i.directional[f]=V,f++}else if(R.isSpotLight){const V=t.get(R);V.position.setFromMatrixPosition(R.matrixWorld),V.color.copy(k).multiplyScalar(z),V.distance=W,V.coneCos=Math.cos(R.angle),V.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),V.decay=R.decay,i.spot[x]=V;const F=R.shadow;if(R.map&&(i.spotLightMap[w]=R.map,w++,F.updateMatrices(R),R.castShadow&&T++),i.spotLightMatrix[x]=F.matrix,R.castShadow){const Q=n.get(R);Q.shadowIntensity=F.intensity,Q.shadowBias=F.bias,Q.shadowNormalBias=F.normalBias,Q.shadowRadius=F.radius,Q.shadowMapSize=F.mapSize,i.spotShadow[x]=Q,i.spotShadowMap[x]=B,S++}x++}else if(R.isRectAreaLight){const V=t.get(R);V.color.copy(k).multiplyScalar(z),V.halfWidth.set(R.width*.5,0,0),V.halfHeight.set(0,R.height*.5,0),i.rectArea[m]=V,m++}else if(R.isPointLight){const V=t.get(R);if(V.color.copy(R.color).multiplyScalar(R.intensity),V.distance=R.distance,V.decay=R.decay,R.castShadow){const F=R.shadow,Q=n.get(R);Q.shadowIntensity=F.intensity,Q.shadowBias=F.bias,Q.shadowNormalBias=F.normalBias,Q.shadowRadius=F.radius,Q.shadowMapSize=F.mapSize,Q.shadowCameraNear=F.camera.near,Q.shadowCameraFar=F.camera.far,i.pointShadow[g]=Q,i.pointShadowMap[g]=B,i.pointShadowMatrix[g]=R.shadow.matrix,A++}i.point[g]=V,g++}else if(R.isHemisphereLight){const V=t.get(R);V.skyColor.copy(R.color).multiplyScalar(z),V.groundColor.copy(R.groundColor).multiplyScalar(z),i.hemi[p]=V,p++}}m>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=at.LTC_FLOAT_1,i.rectAreaLTC2=at.LTC_FLOAT_2):(i.rectAreaLTC1=at.LTC_HALF_1,i.rectAreaLTC2=at.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=d,i.ambient[2]=u;const v=i.hash;(v.directionalLength!==f||v.pointLength!==g||v.spotLength!==x||v.rectAreaLength!==m||v.hemiLength!==p||v.numDirectionalShadows!==y||v.numPointShadows!==A||v.numSpotShadows!==S||v.numSpotMaps!==w||v.numLightProbes!==C)&&(i.directional.length=f,i.spot.length=x,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=A,i.pointShadowMap.length=A,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=A,i.spotLightMatrix.length=S+w-T,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=C,v.directionalLength=f,v.pointLength=g,v.spotLength=x,v.rectAreaLength=m,v.hemiLength=p,v.numDirectionalShadows=y,v.numPointShadows=A,v.numSpotShadows=S,v.numSpotMaps=w,v.numLightProbes=C,i.version=VM++)}function c(l,h){let d=0,u=0,f=0,g=0,x=0;const m=h.matrixWorldInverse;for(let p=0,y=l.length;p<y;p++){const A=l[p];if(A.isDirectionalLight){const S=i.directional[d];S.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),d++}else if(A.isSpotLight){const S=i.spot[f];S.position.setFromMatrixPosition(A.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(m),f++}else if(A.isRectAreaLight){const S=i.rectArea[g];S.position.setFromMatrixPosition(A.matrixWorld),S.position.applyMatrix4(m),a.identity(),r.copy(A.matrixWorld),r.premultiply(m),a.extractRotation(r),S.halfWidth.set(A.width*.5,0,0),S.halfHeight.set(0,A.height*.5,0),S.halfWidth.applyMatrix4(a),S.halfHeight.applyMatrix4(a),g++}else if(A.isPointLight){const S=i.point[u];S.position.setFromMatrixPosition(A.matrixWorld),S.position.applyMatrix4(m),u++}else if(A.isHemisphereLight){const S=i.hemi[x];S.direction.setFromMatrixPosition(A.matrixWorld),S.direction.transformDirection(m),x++}}}return{setup:o,setupView:c,state:i}}function op(e){const t=new GM(e),n=[],i=[];function s(h){l.camera=h,n.length=0,i.length=0}function r(h){n.push(h)}function a(h){i.push(h)}function o(){t.setup(n)}function c(h){t.setupView(n,h)}const l={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function WM(e){let t=new WeakMap;function n(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new op(e),t.set(s,[o])):r>=a.length?(o=new op(e),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:n,dispose:i}}const XM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,YM=`uniform sampler2D shadow_pass;
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
}`,qM=[new D(1,0,0),new D(-1,0,0),new D(0,1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1)],$M=[new D(0,-1,0),new D(0,-1,0),new D(0,0,1),new D(0,0,-1),new D(0,-1,0),new D(0,-1,0)],cp=new Ae,Ia=new D,Yl=new D;function jM(e,t,n){let i=new i0;const s=new se,r=new se,a=new De,o=new ov,c=new cv,l={},h=n.maxTextureSize,d={[ws]:mn,[mn]:ws,[Si]:Si},u=new ui({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new se},radius:{value:4}},vertexShader:XM,fragmentShader:YM}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new He;g.setAttribute("position",new cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new _n(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sc;let p=this.type;this.render=function(T,C,v){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===G_&&(Ft("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=sc);const E=e.getRenderTarget(),Y=e.getActiveCubeFace(),R=e.getActiveMipmapLevel(),k=e.state;k.setBlending(Ji),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const z=p!==this.type;z&&C.traverse(function(W){W.material&&(Array.isArray(W.material)?W.material.forEach(B=>B.needsUpdate=!0):W.material.needsUpdate=!0)});for(let W=0,B=T.length;W<B;W++){const V=T[W],F=V.shadow;if(F===void 0){Ft("WebGLShadowMap:",V,"has no shadow.");continue}if(F.autoUpdate===!1&&F.needsUpdate===!1)continue;s.copy(F.mapSize);const Q=F.getFrameExtents();s.multiply(Q),r.copy(F.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/Q.x),s.x=r.x*Q.x,F.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/Q.y),s.y=r.y*Q.y,F.mapSize.y=r.y));const j=e.state.buffers.depth.getReversed();if(F.camera._reversedDepth=j,F.map===null||z===!0){if(F.map!==null&&(F.map.depthTexture!==null&&(F.map.depthTexture.dispose(),F.map.depthTexture=null),F.map.dispose()),this.type===Oa){if(V.isPointLight){Ft("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}F.map=new Ri(s.x,s.y,{format:Gr,type:es,minFilter:Ze,magFilter:Ze,generateMipmaps:!1}),F.map.texture.name=V.name+".shadowMap",F.map.depthTexture=new qa(s.x,s.y,bi),F.map.depthTexture.name=V.name+".shadowMapDepth",F.map.depthTexture.format=ns,F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=tn,F.map.depthTexture.magFilter=tn}else V.isPointLight?(F.map=new h0(s.x),F.map.depthTexture=new j1(s.x,Di)):(F.map=new Ri(s.x,s.y),F.map.depthTexture=new qa(s.x,s.y,Di)),F.map.depthTexture.name=V.name+".shadowMap",F.map.depthTexture.format=ns,this.type===sc?(F.map.depthTexture.compareFunction=j?Vu:zu,F.map.depthTexture.minFilter=Ze,F.map.depthTexture.magFilter=Ze):(F.map.depthTexture.compareFunction=null,F.map.depthTexture.minFilter=tn,F.map.depthTexture.magFilter=tn);F.camera.updateProjectionMatrix()}const lt=F.map.isWebGLCubeRenderTarget?6:1;for(let pt=0;pt<lt;pt++){if(F.map.isWebGLCubeRenderTarget)e.setRenderTarget(F.map,pt),e.clear();else{pt===0&&(e.setRenderTarget(F.map),e.clear());const ht=F.getViewport(pt);a.set(r.x*ht.x,r.y*ht.y,r.x*ht.z,r.y*ht.w),k.viewport(a)}if(V.isPointLight){const ht=F.camera,kt=F.matrix,de=V.distance||ht.far;de!==ht.far&&(ht.far=de,ht.updateProjectionMatrix()),Ia.setFromMatrixPosition(V.matrixWorld),ht.position.copy(Ia),Yl.copy(ht.position),Yl.add(qM[pt]),ht.up.copy($M[pt]),ht.lookAt(Yl),ht.updateMatrixWorld(),kt.makeTranslation(-Ia.x,-Ia.y,-Ia.z),cp.multiplyMatrices(ht.projectionMatrix,ht.matrixWorldInverse),F._frustum.setFromProjectionMatrix(cp,ht.coordinateSystem,ht.reversedDepth)}else F.updateMatrices(V);i=F.getFrustum(),S(C,v,F.camera,V,this.type)}F.isPointLightShadow!==!0&&this.type===Oa&&y(F,v),F.needsUpdate=!1}p=this.type,m.needsUpdate=!1,e.setRenderTarget(E,Y,R)};function y(T,C){const v=t.update(x);u.defines.VSM_SAMPLES!==T.blurSamples&&(u.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null&&(T.mapPass=new Ri(s.x,s.y,{format:Gr,type:es})),u.uniforms.shadow_pass.value=T.map.depthTexture,u.uniforms.resolution.value=T.mapSize,u.uniforms.radius.value=T.radius,e.setRenderTarget(T.mapPass),e.clear(),e.renderBufferDirect(C,null,v,u,x,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value=T.mapSize,f.uniforms.radius.value=T.radius,e.setRenderTarget(T.map),e.clear(),e.renderBufferDirect(C,null,v,f,x,null)}function A(T,C,v,E){let Y=null;const R=v.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(R!==void 0)Y=R;else if(Y=v.isPointLight===!0?c:o,e.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0||C.alphaToCoverage===!0){const k=Y.uuid,z=C.uuid;let W=l[k];W===void 0&&(W={},l[k]=W);let B=W[z];B===void 0&&(B=Y.clone(),W[z]=B,C.addEventListener("dispose",w)),Y=B}if(Y.visible=C.visible,Y.wireframe=C.wireframe,E===Oa?Y.side=C.shadowSide!==null?C.shadowSide:C.side:Y.side=C.shadowSide!==null?C.shadowSide:d[C.side],Y.alphaMap=C.alphaMap,Y.alphaTest=C.alphaToCoverage===!0?.5:C.alphaTest,Y.map=C.map,Y.clipShadows=C.clipShadows,Y.clippingPlanes=C.clippingPlanes,Y.clipIntersection=C.clipIntersection,Y.displacementMap=C.displacementMap,Y.displacementScale=C.displacementScale,Y.displacementBias=C.displacementBias,Y.wireframeLinewidth=C.wireframeLinewidth,Y.linewidth=C.linewidth,v.isPointLight===!0&&Y.isMeshDistanceMaterial===!0){const k=e.properties.get(Y);k.light=v}return Y}function S(T,C,v,E,Y){if(T.visible===!1)return;if(T.layers.test(C.layers)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&Y===Oa)&&(!T.frustumCulled||i.intersectsObject(T))){T.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,T.matrixWorld);const z=t.update(T),W=T.material;if(Array.isArray(W)){const B=z.groups;for(let V=0,F=B.length;V<F;V++){const Q=B[V],j=W[Q.materialIndex];if(j&&j.visible){const lt=A(T,j,E,Y);T.onBeforeShadow(e,T,C,v,z,lt,Q),e.renderBufferDirect(v,null,z,lt,T,Q),T.onAfterShadow(e,T,C,v,z,lt,Q)}}}else if(W.visible){const B=A(T,W,E,Y);T.onBeforeShadow(e,T,C,v,z,B,null),e.renderBufferDirect(v,null,z,B,T,null),T.onAfterShadow(e,T,C,v,z,B,null)}}const k=T.children;for(let z=0,W=k.length;z<W;z++)S(k[z],C,v,E,Y)}function w(T){T.target.removeEventListener("dispose",w);for(const v in l){const E=l[v],Y=T.target.uuid;Y in E&&(E[Y].dispose(),delete E[Y])}}}function KM(e,t){function n(){let L=!1;const st=new De;let et=null;const mt=new De(0,0,0,0);return{setMask:function(J){et!==J&&!L&&(e.colorMask(J,J,J,J),et=J)},setLocked:function(J){L=J},setClear:function(J,G,xt,Bt,_e){_e===!0&&(J*=Bt,G*=Bt,xt*=Bt),st.set(J,G,xt,Bt),mt.equals(st)===!1&&(e.clearColor(J,G,xt,Bt),mt.copy(st))},reset:function(){L=!1,et=null,mt.set(-1,0,0,0)}}}function i(){let L=!1,st=!1,et=null,mt=null,J=null;return{setReversed:function(G){if(st!==G){const xt=t.get("EXT_clip_control");G?xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.ZERO_TO_ONE_EXT):xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.NEGATIVE_ONE_TO_ONE_EXT),st=G;const Bt=J;J=null,this.setClear(Bt)}},getReversed:function(){return st},setTest:function(G){G?nt(e.DEPTH_TEST):rt(e.DEPTH_TEST)},setMask:function(G){et!==G&&!L&&(e.depthMask(G),et=G)},setFunc:function(G){if(st&&(G=S1[G]),mt!==G){switch(G){case fh:e.depthFunc(e.NEVER);break;case ph:e.depthFunc(e.ALWAYS);break;case mh:e.depthFunc(e.LESS);break;case Vr:e.depthFunc(e.LEQUAL);break;case gh:e.depthFunc(e.EQUAL);break;case _h:e.depthFunc(e.GEQUAL);break;case vh:e.depthFunc(e.GREATER);break;case xh:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}mt=G}},setLocked:function(G){L=G},setClear:function(G){J!==G&&(J=G,st&&(G=1-G),e.clearDepth(G))},reset:function(){L=!1,et=null,mt=null,J=null,st=!1}}}function s(){let L=!1,st=null,et=null,mt=null,J=null,G=null,xt=null,Bt=null,_e=null;return{setTest:function(ae){L||(ae?nt(e.STENCIL_TEST):rt(e.STENCIL_TEST))},setMask:function(ae){st!==ae&&!L&&(e.stencilMask(ae),st=ae)},setFunc:function(ae,Vi,Hi){(et!==ae||mt!==Vi||J!==Hi)&&(e.stencilFunc(ae,Vi,Hi),et=ae,mt=Vi,J=Hi)},setOp:function(ae,Vi,Hi){(G!==ae||xt!==Vi||Bt!==Hi)&&(e.stencilOp(ae,Vi,Hi),G=ae,xt=Vi,Bt=Hi)},setLocked:function(ae){L=ae},setClear:function(ae){_e!==ae&&(e.clearStencil(ae),_e=ae)},reset:function(){L=!1,st=null,et=null,mt=null,J=null,G=null,xt=null,Bt=null,_e=null}}}const r=new n,a=new i,o=new s,c=new WeakMap,l=new WeakMap;let h={},d={},u=new WeakMap,f=[],g=null,x=!1,m=null,p=null,y=null,A=null,S=null,w=null,T=null,C=new $t(0,0,0),v=0,E=!1,Y=null,R=null,k=null,z=null,W=null;const B=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let V=!1,F=0;const Q=e.getParameter(e.VERSION);Q.indexOf("WebGL")!==-1?(F=parseFloat(/^WebGL (\d)/.exec(Q)[1]),V=F>=1):Q.indexOf("OpenGL ES")!==-1&&(F=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),V=F>=2);let j=null,lt={};const pt=e.getParameter(e.SCISSOR_BOX),ht=e.getParameter(e.VIEWPORT),kt=new De().fromArray(pt),de=new De().fromArray(ht);function ce(L,st,et,mt){const J=new Uint8Array(4),G=e.createTexture();e.bindTexture(L,G),e.texParameteri(L,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(L,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let xt=0;xt<et;xt++)L===e.TEXTURE_3D||L===e.TEXTURE_2D_ARRAY?e.texImage3D(st,0,e.RGBA,1,1,mt,0,e.RGBA,e.UNSIGNED_BYTE,J):e.texImage2D(st+xt,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,J);return G}const $={};$[e.TEXTURE_2D]=ce(e.TEXTURE_2D,e.TEXTURE_2D,1),$[e.TEXTURE_CUBE_MAP]=ce(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[e.TEXTURE_2D_ARRAY]=ce(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),$[e.TEXTURE_3D]=ce(e.TEXTURE_3D,e.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),nt(e.DEPTH_TEST),a.setFunc(Vr),Wt(!1),Pe(of),nt(e.CULL_FACE),re(Ji);function nt(L){h[L]!==!0&&(e.enable(L),h[L]=!0)}function rt(L){h[L]!==!1&&(e.disable(L),h[L]=!1)}function Vt(L,st){return d[L]!==st?(e.bindFramebuffer(L,st),d[L]=st,L===e.DRAW_FRAMEBUFFER&&(d[e.FRAMEBUFFER]=st),L===e.FRAMEBUFFER&&(d[e.DRAW_FRAMEBUFFER]=st),!0):!1}function Dt(L,st){let et=f,mt=!1;if(L){et=u.get(st),et===void 0&&(et=[],u.set(st,et));const J=L.textures;if(et.length!==J.length||et[0]!==e.COLOR_ATTACHMENT0){for(let G=0,xt=J.length;G<xt;G++)et[G]=e.COLOR_ATTACHMENT0+G;et.length=J.length,mt=!0}}else et[0]!==e.BACK&&(et[0]=e.BACK,mt=!0);mt&&e.drawBuffers(et)}function Ot(L){return g!==L?(e.useProgram(L),g=L,!0):!1}const Ye={[Gs]:e.FUNC_ADD,[X_]:e.FUNC_SUBTRACT,[Y_]:e.FUNC_REVERSE_SUBTRACT};Ye[q_]=e.MIN,Ye[$_]=e.MAX;const Kt={[j_]:e.ZERO,[K_]:e.ONE,[Z_]:e.SRC_COLOR,[uh]:e.SRC_ALPHA,[i1]:e.SRC_ALPHA_SATURATE,[e1]:e.DST_COLOR,[Q_]:e.DST_ALPHA,[J_]:e.ONE_MINUS_SRC_COLOR,[dh]:e.ONE_MINUS_SRC_ALPHA,[n1]:e.ONE_MINUS_DST_COLOR,[t1]:e.ONE_MINUS_DST_ALPHA,[s1]:e.CONSTANT_COLOR,[r1]:e.ONE_MINUS_CONSTANT_COLOR,[a1]:e.CONSTANT_ALPHA,[o1]:e.ONE_MINUS_CONSTANT_ALPHA};function re(L,st,et,mt,J,G,xt,Bt,_e,ae){if(L===Ji){x===!0&&(rt(e.BLEND),x=!1);return}if(x===!1&&(nt(e.BLEND),x=!0),L!==W_){if(L!==m||ae!==E){if((p!==Gs||S!==Gs)&&(e.blendEquation(e.FUNC_ADD),p=Gs,S=Gs),ae)switch(L){case Dr:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Ii:e.blendFunc(e.ONE,e.ONE);break;case cf:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case lf:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:te("WebGLState: Invalid blending: ",L);break}else switch(L){case Dr:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Ii:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case cf:te("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case lf:te("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:te("WebGLState: Invalid blending: ",L);break}y=null,A=null,w=null,T=null,C.set(0,0,0),v=0,m=L,E=ae}return}J=J||st,G=G||et,xt=xt||mt,(st!==p||J!==S)&&(e.blendEquationSeparate(Ye[st],Ye[J]),p=st,S=J),(et!==y||mt!==A||G!==w||xt!==T)&&(e.blendFuncSeparate(Kt[et],Kt[mt],Kt[G],Kt[xt]),y=et,A=mt,w=G,T=xt),(Bt.equals(C)===!1||_e!==v)&&(e.blendColor(Bt.r,Bt.g,Bt.b,_e),C.copy(Bt),v=_e),m=L,E=!1}function fe(L,st){L.side===Si?rt(e.CULL_FACE):nt(e.CULL_FACE);let et=L.side===mn;st&&(et=!et),Wt(et),L.blending===Dr&&L.transparent===!1?re(Ji):re(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);const mt=L.stencilWrite;o.setTest(mt),mt&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Ue(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?nt(e.SAMPLE_ALPHA_TO_COVERAGE):rt(e.SAMPLE_ALPHA_TO_COVERAGE)}function Wt(L){Y!==L&&(L?e.frontFace(e.CW):e.frontFace(e.CCW),Y=L)}function Pe(L){L!==V_?(nt(e.CULL_FACE),L!==R&&(L===of?e.cullFace(e.BACK):L===H_?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):rt(e.CULL_FACE),R=L}function P(L){L!==k&&(V&&e.lineWidth(L),k=L)}function Ue(L,st,et){L?(nt(e.POLYGON_OFFSET_FILL),(z!==st||W!==et)&&(z=st,W=et,a.getReversed()&&(st=-st),e.polygonOffset(st,et))):rt(e.POLYGON_OFFSET_FILL)}function ie(L){L?nt(e.SCISSOR_TEST):rt(e.SCISSOR_TEST)}function ge(L){L===void 0&&(L=e.TEXTURE0+B-1),j!==L&&(e.activeTexture(L),j=L)}function St(L,st,et){et===void 0&&(j===null?et=e.TEXTURE0+B-1:et=j);let mt=lt[et];mt===void 0&&(mt={type:void 0,texture:void 0},lt[et]=mt),(mt.type!==L||mt.texture!==st)&&(j!==et&&(e.activeTexture(et),j=et),e.bindTexture(L,st||$[L]),mt.type=L,mt.texture=st)}function b(){const L=lt[j];L!==void 0&&L.type!==void 0&&(e.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function _(){try{e.compressedTexImage2D(...arguments)}catch(L){te("WebGLState:",L)}}function I(){try{e.compressedTexImage3D(...arguments)}catch(L){te("WebGLState:",L)}}function q(){try{e.texSubImage2D(...arguments)}catch(L){te("WebGLState:",L)}}function K(){try{e.texSubImage3D(...arguments)}catch(L){te("WebGLState:",L)}}function X(){try{e.compressedTexSubImage2D(...arguments)}catch(L){te("WebGLState:",L)}}function _t(){try{e.compressedTexSubImage3D(...arguments)}catch(L){te("WebGLState:",L)}}function it(){try{e.texStorage2D(...arguments)}catch(L){te("WebGLState:",L)}}function Pt(){try{e.texStorage3D(...arguments)}catch(L){te("WebGLState:",L)}}function Ut(){try{e.texImage2D(...arguments)}catch(L){te("WebGLState:",L)}}function Z(){try{e.texImage3D(...arguments)}catch(L){te("WebGLState:",L)}}function tt(L){kt.equals(L)===!1&&(e.scissor(L.x,L.y,L.z,L.w),kt.copy(L))}function vt(L){de.equals(L)===!1&&(e.viewport(L.x,L.y,L.z,L.w),de.copy(L))}function Mt(L,st){let et=l.get(st);et===void 0&&(et=new WeakMap,l.set(st,et));let mt=et.get(L);mt===void 0&&(mt=e.getUniformBlockIndex(st,L.name),et.set(L,mt))}function ut(L,st){const mt=l.get(st).get(L);c.get(st)!==mt&&(e.uniformBlockBinding(st,mt,L.__bindingPointIndex),c.set(st,mt))}function Xt(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),a.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),h={},j=null,lt={},d={},u=new WeakMap,f=[],g=null,x=!1,m=null,p=null,y=null,A=null,S=null,w=null,T=null,C=new $t(0,0,0),v=0,E=!1,Y=null,R=null,k=null,z=null,W=null,kt.set(0,0,e.canvas.width,e.canvas.height),de.set(0,0,e.canvas.width,e.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:nt,disable:rt,bindFramebuffer:Vt,drawBuffers:Dt,useProgram:Ot,setBlending:re,setMaterial:fe,setFlipSided:Wt,setCullFace:Pe,setLineWidth:P,setPolygonOffset:Ue,setScissorTest:ie,activeTexture:ge,bindTexture:St,unbindTexture:b,compressedTexImage2D:_,compressedTexImage3D:I,texImage2D:Ut,texImage3D:Z,updateUBOMapping:Mt,uniformBlockBinding:ut,texStorage2D:it,texStorage3D:Pt,texSubImage2D:q,texSubImage3D:K,compressedTexSubImage2D:X,compressedTexSubImage3D:_t,scissor:tt,viewport:vt,reset:Xt}}function ZM(e,t,n,i,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new se,h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,_){return f?new OffscreenCanvas(b,_):xc("canvas")}function x(b,_,I){let q=1;const K=St(b);if((K.width>I||K.height>I)&&(q=I/Math.max(K.width,K.height)),q<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const X=Math.floor(q*K.width),_t=Math.floor(q*K.height);d===void 0&&(d=g(X,_t));const it=_?g(X,_t):d;return it.width=X,it.height=_t,it.getContext("2d").drawImage(b,0,0,X,_t),Ft("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+X+"x"+_t+")."),it}else return"data"in b&&Ft("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),b;return b}function m(b){return b.generateMipmaps}function p(b){e.generateMipmap(b)}function y(b){return b.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?e.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function A(b,_,I,q,K=!1){if(b!==null){if(e[b]!==void 0)return e[b];Ft("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let X=_;if(_===e.RED&&(I===e.FLOAT&&(X=e.R32F),I===e.HALF_FLOAT&&(X=e.R16F),I===e.UNSIGNED_BYTE&&(X=e.R8)),_===e.RED_INTEGER&&(I===e.UNSIGNED_BYTE&&(X=e.R8UI),I===e.UNSIGNED_SHORT&&(X=e.R16UI),I===e.UNSIGNED_INT&&(X=e.R32UI),I===e.BYTE&&(X=e.R8I),I===e.SHORT&&(X=e.R16I),I===e.INT&&(X=e.R32I)),_===e.RG&&(I===e.FLOAT&&(X=e.RG32F),I===e.HALF_FLOAT&&(X=e.RG16F),I===e.UNSIGNED_BYTE&&(X=e.RG8)),_===e.RG_INTEGER&&(I===e.UNSIGNED_BYTE&&(X=e.RG8UI),I===e.UNSIGNED_SHORT&&(X=e.RG16UI),I===e.UNSIGNED_INT&&(X=e.RG32UI),I===e.BYTE&&(X=e.RG8I),I===e.SHORT&&(X=e.RG16I),I===e.INT&&(X=e.RG32I)),_===e.RGB_INTEGER&&(I===e.UNSIGNED_BYTE&&(X=e.RGB8UI),I===e.UNSIGNED_SHORT&&(X=e.RGB16UI),I===e.UNSIGNED_INT&&(X=e.RGB32UI),I===e.BYTE&&(X=e.RGB8I),I===e.SHORT&&(X=e.RGB16I),I===e.INT&&(X=e.RGB32I)),_===e.RGBA_INTEGER&&(I===e.UNSIGNED_BYTE&&(X=e.RGBA8UI),I===e.UNSIGNED_SHORT&&(X=e.RGBA16UI),I===e.UNSIGNED_INT&&(X=e.RGBA32UI),I===e.BYTE&&(X=e.RGBA8I),I===e.SHORT&&(X=e.RGBA16I),I===e.INT&&(X=e.RGBA32I)),_===e.RGB&&(I===e.UNSIGNED_INT_5_9_9_9_REV&&(X=e.RGB9_E5),I===e.UNSIGNED_INT_10F_11F_11F_REV&&(X=e.R11F_G11F_B10F)),_===e.RGBA){const _t=K?_c:Zt.getTransfer(q);I===e.FLOAT&&(X=e.RGBA32F),I===e.HALF_FLOAT&&(X=e.RGBA16F),I===e.UNSIGNED_BYTE&&(X=_t===oe?e.SRGB8_ALPHA8:e.RGBA8),I===e.UNSIGNED_SHORT_4_4_4_4&&(X=e.RGBA4),I===e.UNSIGNED_SHORT_5_5_5_1&&(X=e.RGB5_A1)}return(X===e.R16F||X===e.R32F||X===e.RG16F||X===e.RG32F||X===e.RGBA16F||X===e.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function S(b,_){let I;return b?_===null||_===Di||_===Ya?I=e.DEPTH24_STENCIL8:_===bi?I=e.DEPTH32F_STENCIL8:_===Xa&&(I=e.DEPTH24_STENCIL8,Ft("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Di||_===Ya?I=e.DEPTH_COMPONENT24:_===bi?I=e.DEPTH_COMPONENT32F:_===Xa&&(I=e.DEPTH_COMPONENT16),I}function w(b,_){return m(b)===!0||b.isFramebufferTexture&&b.minFilter!==tn&&b.minFilter!==Ze?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function T(b){const _=b.target;_.removeEventListener("dispose",T),v(_),_.isVideoTexture&&h.delete(_)}function C(b){const _=b.target;_.removeEventListener("dispose",C),Y(_)}function v(b){const _=i.get(b);if(_.__webglInit===void 0)return;const I=b.source,q=u.get(I);if(q){const K=q[_.__cacheKey];K.usedTimes--,K.usedTimes===0&&E(b),Object.keys(q).length===0&&u.delete(I)}i.remove(b)}function E(b){const _=i.get(b);e.deleteTexture(_.__webglTexture);const I=b.source,q=u.get(I);delete q[_.__cacheKey],a.memory.textures--}function Y(b){const _=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(_.__webglFramebuffer[q]))for(let K=0;K<_.__webglFramebuffer[q].length;K++)e.deleteFramebuffer(_.__webglFramebuffer[q][K]);else e.deleteFramebuffer(_.__webglFramebuffer[q]);_.__webglDepthbuffer&&e.deleteRenderbuffer(_.__webglDepthbuffer[q])}else{if(Array.isArray(_.__webglFramebuffer))for(let q=0;q<_.__webglFramebuffer.length;q++)e.deleteFramebuffer(_.__webglFramebuffer[q]);else e.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&e.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&e.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let q=0;q<_.__webglColorRenderbuffer.length;q++)_.__webglColorRenderbuffer[q]&&e.deleteRenderbuffer(_.__webglColorRenderbuffer[q]);_.__webglDepthRenderbuffer&&e.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const I=b.textures;for(let q=0,K=I.length;q<K;q++){const X=i.get(I[q]);X.__webglTexture&&(e.deleteTexture(X.__webglTexture),a.memory.textures--),i.remove(I[q])}i.remove(b)}let R=0;function k(){R=0}function z(){const b=R;return b>=s.maxTextures&&Ft("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),R+=1,b}function W(b){const _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function B(b,_){const I=i.get(b);if(b.isVideoTexture&&ie(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&I.__version!==b.version){const q=b.image;if(q===null)Ft("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Ft("WebGLRenderer: Texture marked for update but image is incomplete");else{$(I,b,_);return}}else b.isExternalTexture&&(I.__webglTexture=b.sourceTexture?b.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,I.__webglTexture,e.TEXTURE0+_)}function V(b,_){const I=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&I.__version!==b.version){$(I,b,_);return}else b.isExternalTexture&&(I.__webglTexture=b.sourceTexture?b.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,I.__webglTexture,e.TEXTURE0+_)}function F(b,_){const I=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&I.__version!==b.version){$(I,b,_);return}n.bindTexture(e.TEXTURE_3D,I.__webglTexture,e.TEXTURE0+_)}function Q(b,_){const I=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&I.__version!==b.version){nt(I,b,_);return}n.bindTexture(e.TEXTURE_CUBE_MAP,I.__webglTexture,e.TEXTURE0+_)}const j={[Mh]:e.REPEAT,[Ki]:e.CLAMP_TO_EDGE,[yh]:e.MIRRORED_REPEAT},lt={[tn]:e.NEAREST,[h1]:e.NEAREST_MIPMAP_NEAREST,[xo]:e.NEAREST_MIPMAP_LINEAR,[Ze]:e.LINEAR,[pl]:e.LINEAR_MIPMAP_NEAREST,[Ys]:e.LINEAR_MIPMAP_LINEAR},pt={[f1]:e.NEVER,[v1]:e.ALWAYS,[p1]:e.LESS,[zu]:e.LEQUAL,[m1]:e.EQUAL,[Vu]:e.GEQUAL,[g1]:e.GREATER,[_1]:e.NOTEQUAL};function ht(b,_){if(_.type===bi&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Ze||_.magFilter===pl||_.magFilter===xo||_.magFilter===Ys||_.minFilter===Ze||_.minFilter===pl||_.minFilter===xo||_.minFilter===Ys)&&Ft("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(b,e.TEXTURE_WRAP_S,j[_.wrapS]),e.texParameteri(b,e.TEXTURE_WRAP_T,j[_.wrapT]),(b===e.TEXTURE_3D||b===e.TEXTURE_2D_ARRAY)&&e.texParameteri(b,e.TEXTURE_WRAP_R,j[_.wrapR]),e.texParameteri(b,e.TEXTURE_MAG_FILTER,lt[_.magFilter]),e.texParameteri(b,e.TEXTURE_MIN_FILTER,lt[_.minFilter]),_.compareFunction&&(e.texParameteri(b,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(b,e.TEXTURE_COMPARE_FUNC,pt[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===tn||_.minFilter!==xo&&_.minFilter!==Ys||_.type===bi&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const I=t.get("EXT_texture_filter_anisotropic");e.texParameterf(b,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function kt(b,_){let I=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",T));const q=_.source;let K=u.get(q);K===void 0&&(K={},u.set(q,K));const X=W(_);if(X!==b.__cacheKey){K[X]===void 0&&(K[X]={texture:e.createTexture(),usedTimes:0},a.memory.textures++,I=!0),K[X].usedTimes++;const _t=K[b.__cacheKey];_t!==void 0&&(K[b.__cacheKey].usedTimes--,_t.usedTimes===0&&E(_)),b.__cacheKey=X,b.__webglTexture=K[X].texture}return I}function de(b,_,I){return Math.floor(Math.floor(b/I)/_)}function ce(b,_,I,q){const X=b.updateRanges;if(X.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,_.width,_.height,I,q,_.data);else{X.sort((Z,tt)=>Z.start-tt.start);let _t=0;for(let Z=1;Z<X.length;Z++){const tt=X[_t],vt=X[Z],Mt=tt.start+tt.count,ut=de(vt.start,_.width,4),Xt=de(tt.start,_.width,4);vt.start<=Mt+1&&ut===Xt&&de(vt.start+vt.count-1,_.width,4)===ut?tt.count=Math.max(tt.count,vt.start+vt.count-tt.start):(++_t,X[_t]=vt)}X.length=_t+1;const it=e.getParameter(e.UNPACK_ROW_LENGTH),Pt=e.getParameter(e.UNPACK_SKIP_PIXELS),Ut=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,_.width);for(let Z=0,tt=X.length;Z<tt;Z++){const vt=X[Z],Mt=Math.floor(vt.start/4),ut=Math.ceil(vt.count/4),Xt=Mt%_.width,L=Math.floor(Mt/_.width),st=ut,et=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,Xt),e.pixelStorei(e.UNPACK_SKIP_ROWS,L),n.texSubImage2D(e.TEXTURE_2D,0,Xt,L,st,et,I,q,_.data)}b.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,it),e.pixelStorei(e.UNPACK_SKIP_PIXELS,Pt),e.pixelStorei(e.UNPACK_SKIP_ROWS,Ut)}}function $(b,_,I){let q=e.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(q=e.TEXTURE_2D_ARRAY),_.isData3DTexture&&(q=e.TEXTURE_3D);const K=kt(b,_),X=_.source;n.bindTexture(q,b.__webglTexture,e.TEXTURE0+I);const _t=i.get(X);if(X.version!==_t.__version||K===!0){n.activeTexture(e.TEXTURE0+I);const it=Zt.getPrimaries(Zt.workingColorSpace),Pt=_.colorSpace===Ms?null:Zt.getPrimaries(_.colorSpace),Ut=_.colorSpace===Ms||it===Pt?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ut);let Z=x(_.image,!1,s.maxTextureSize);Z=ge(_,Z);const tt=r.convert(_.format,_.colorSpace),vt=r.convert(_.type);let Mt=A(_.internalFormat,tt,vt,_.colorSpace,_.isVideoTexture);ht(q,_);let ut;const Xt=_.mipmaps,L=_.isVideoTexture!==!0,st=_t.__version===void 0||K===!0,et=X.dataReady,mt=w(_,Z);if(_.isDepthTexture)Mt=S(_.format===qs,_.type),st&&(L?n.texStorage2D(e.TEXTURE_2D,1,Mt,Z.width,Z.height):n.texImage2D(e.TEXTURE_2D,0,Mt,Z.width,Z.height,0,tt,vt,null));else if(_.isDataTexture)if(Xt.length>0){L&&st&&n.texStorage2D(e.TEXTURE_2D,mt,Mt,Xt[0].width,Xt[0].height);for(let J=0,G=Xt.length;J<G;J++)ut=Xt[J],L?et&&n.texSubImage2D(e.TEXTURE_2D,J,0,0,ut.width,ut.height,tt,vt,ut.data):n.texImage2D(e.TEXTURE_2D,J,Mt,ut.width,ut.height,0,tt,vt,ut.data);_.generateMipmaps=!1}else L?(st&&n.texStorage2D(e.TEXTURE_2D,mt,Mt,Z.width,Z.height),et&&ce(_,Z,tt,vt)):n.texImage2D(e.TEXTURE_2D,0,Mt,Z.width,Z.height,0,tt,vt,Z.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){L&&st&&n.texStorage3D(e.TEXTURE_2D_ARRAY,mt,Mt,Xt[0].width,Xt[0].height,Z.depth);for(let J=0,G=Xt.length;J<G;J++)if(ut=Xt[J],_.format!==li)if(tt!==null)if(L){if(et)if(_.layerUpdates.size>0){const xt=kf(ut.width,ut.height,_.format,_.type);for(const Bt of _.layerUpdates){const _e=ut.data.subarray(Bt*xt/ut.data.BYTES_PER_ELEMENT,(Bt+1)*xt/ut.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,J,0,0,Bt,ut.width,ut.height,1,tt,_e)}_.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,J,0,0,0,ut.width,ut.height,Z.depth,tt,ut.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,J,Mt,ut.width,ut.height,Z.depth,0,ut.data,0,0);else Ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?et&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,J,0,0,0,ut.width,ut.height,Z.depth,tt,vt,ut.data):n.texImage3D(e.TEXTURE_2D_ARRAY,J,Mt,ut.width,ut.height,Z.depth,0,tt,vt,ut.data)}else{L&&st&&n.texStorage2D(e.TEXTURE_2D,mt,Mt,Xt[0].width,Xt[0].height);for(let J=0,G=Xt.length;J<G;J++)ut=Xt[J],_.format!==li?tt!==null?L?et&&n.compressedTexSubImage2D(e.TEXTURE_2D,J,0,0,ut.width,ut.height,tt,ut.data):n.compressedTexImage2D(e.TEXTURE_2D,J,Mt,ut.width,ut.height,0,ut.data):Ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?et&&n.texSubImage2D(e.TEXTURE_2D,J,0,0,ut.width,ut.height,tt,vt,ut.data):n.texImage2D(e.TEXTURE_2D,J,Mt,ut.width,ut.height,0,tt,vt,ut.data)}else if(_.isDataArrayTexture)if(L){if(st&&n.texStorage3D(e.TEXTURE_2D_ARRAY,mt,Mt,Z.width,Z.height,Z.depth),et)if(_.layerUpdates.size>0){const J=kf(Z.width,Z.height,_.format,_.type);for(const G of _.layerUpdates){const xt=Z.data.subarray(G*J/Z.data.BYTES_PER_ELEMENT,(G+1)*J/Z.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,G,Z.width,Z.height,1,tt,vt,xt)}_.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,tt,vt,Z.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,Mt,Z.width,Z.height,Z.depth,0,tt,vt,Z.data);else if(_.isData3DTexture)L?(st&&n.texStorage3D(e.TEXTURE_3D,mt,Mt,Z.width,Z.height,Z.depth),et&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,tt,vt,Z.data)):n.texImage3D(e.TEXTURE_3D,0,Mt,Z.width,Z.height,Z.depth,0,tt,vt,Z.data);else if(_.isFramebufferTexture){if(st)if(L)n.texStorage2D(e.TEXTURE_2D,mt,Mt,Z.width,Z.height);else{let J=Z.width,G=Z.height;for(let xt=0;xt<mt;xt++)n.texImage2D(e.TEXTURE_2D,xt,Mt,J,G,0,tt,vt,null),J>>=1,G>>=1}}else if(Xt.length>0){if(L&&st){const J=St(Xt[0]);n.texStorage2D(e.TEXTURE_2D,mt,Mt,J.width,J.height)}for(let J=0,G=Xt.length;J<G;J++)ut=Xt[J],L?et&&n.texSubImage2D(e.TEXTURE_2D,J,0,0,tt,vt,ut):n.texImage2D(e.TEXTURE_2D,J,Mt,tt,vt,ut);_.generateMipmaps=!1}else if(L){if(st){const J=St(Z);n.texStorage2D(e.TEXTURE_2D,mt,Mt,J.width,J.height)}et&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,tt,vt,Z)}else n.texImage2D(e.TEXTURE_2D,0,Mt,tt,vt,Z);m(_)&&p(q),_t.__version=X.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function nt(b,_,I){if(_.image.length!==6)return;const q=kt(b,_),K=_.source;n.bindTexture(e.TEXTURE_CUBE_MAP,b.__webglTexture,e.TEXTURE0+I);const X=i.get(K);if(K.version!==X.__version||q===!0){n.activeTexture(e.TEXTURE0+I);const _t=Zt.getPrimaries(Zt.workingColorSpace),it=_.colorSpace===Ms?null:Zt.getPrimaries(_.colorSpace),Pt=_.colorSpace===Ms||_t===it?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);const Ut=_.isCompressedTexture||_.image[0].isCompressedTexture,Z=_.image[0]&&_.image[0].isDataTexture,tt=[];for(let G=0;G<6;G++)!Ut&&!Z?tt[G]=x(_.image[G],!0,s.maxCubemapSize):tt[G]=Z?_.image[G].image:_.image[G],tt[G]=ge(_,tt[G]);const vt=tt[0],Mt=r.convert(_.format,_.colorSpace),ut=r.convert(_.type),Xt=A(_.internalFormat,Mt,ut,_.colorSpace),L=_.isVideoTexture!==!0,st=X.__version===void 0||q===!0,et=K.dataReady;let mt=w(_,vt);ht(e.TEXTURE_CUBE_MAP,_);let J;if(Ut){L&&st&&n.texStorage2D(e.TEXTURE_CUBE_MAP,mt,Xt,vt.width,vt.height);for(let G=0;G<6;G++){J=tt[G].mipmaps;for(let xt=0;xt<J.length;xt++){const Bt=J[xt];_.format!==li?Mt!==null?L?et&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+G,xt,0,0,Bt.width,Bt.height,Mt,Bt.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+G,xt,Xt,Bt.width,Bt.height,0,Bt.data):Ft("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?et&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+G,xt,0,0,Bt.width,Bt.height,Mt,ut,Bt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+G,xt,Xt,Bt.width,Bt.height,0,Mt,ut,Bt.data)}}}else{if(J=_.mipmaps,L&&st){J.length>0&&mt++;const G=St(tt[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,mt,Xt,G.width,G.height)}for(let G=0;G<6;G++)if(Z){L?et&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,0,0,tt[G].width,tt[G].height,Mt,ut,tt[G].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,Xt,tt[G].width,tt[G].height,0,Mt,ut,tt[G].data);for(let xt=0;xt<J.length;xt++){const _e=J[xt].image[G].image;L?et&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+G,xt+1,0,0,_e.width,_e.height,Mt,ut,_e.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+G,xt+1,Xt,_e.width,_e.height,0,Mt,ut,_e.data)}}else{L?et&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,0,0,Mt,ut,tt[G]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+G,0,Xt,Mt,ut,tt[G]);for(let xt=0;xt<J.length;xt++){const Bt=J[xt];L?et&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+G,xt+1,0,0,Mt,ut,Bt.image[G]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+G,xt+1,Xt,Mt,ut,Bt.image[G])}}}m(_)&&p(e.TEXTURE_CUBE_MAP),X.__version=K.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function rt(b,_,I,q,K,X){const _t=r.convert(I.format,I.colorSpace),it=r.convert(I.type),Pt=A(I.internalFormat,_t,it,I.colorSpace),Ut=i.get(_),Z=i.get(I);if(Z.__renderTarget=_,!Ut.__hasExternalTextures){const tt=Math.max(1,_.width>>X),vt=Math.max(1,_.height>>X);K===e.TEXTURE_3D||K===e.TEXTURE_2D_ARRAY?n.texImage3D(K,X,Pt,tt,vt,_.depth,0,_t,it,null):n.texImage2D(K,X,Pt,tt,vt,0,_t,it,null)}n.bindFramebuffer(e.FRAMEBUFFER,b),Ue(_)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,q,K,Z.__webglTexture,0,P(_)):(K===e.TEXTURE_2D||K>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,q,K,Z.__webglTexture,X),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Vt(b,_,I){if(e.bindRenderbuffer(e.RENDERBUFFER,b),_.depthBuffer){const q=_.depthTexture,K=q&&q.isDepthTexture?q.type:null,X=S(_.stencilBuffer,K),_t=_.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Ue(_)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,P(_),X,_.width,_.height):I?e.renderbufferStorageMultisample(e.RENDERBUFFER,P(_),X,_.width,_.height):e.renderbufferStorage(e.RENDERBUFFER,X,_.width,_.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,_t,e.RENDERBUFFER,b)}else{const q=_.textures;for(let K=0;K<q.length;K++){const X=q[K],_t=r.convert(X.format,X.colorSpace),it=r.convert(X.type),Pt=A(X.internalFormat,_t,it,X.colorSpace);Ue(_)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,P(_),Pt,_.width,_.height):I?e.renderbufferStorageMultisample(e.RENDERBUFFER,P(_),Pt,_.width,_.height):e.renderbufferStorage(e.RENDERBUFFER,Pt,_.width,_.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function Dt(b,_,I){const q=_.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=i.get(_.depthTexture);if(K.__renderTarget=_,(!K.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),q){if(K.__webglInit===void 0&&(K.__webglInit=!0,_.depthTexture.addEventListener("dispose",T)),K.__webglTexture===void 0){K.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,K.__webglTexture),ht(e.TEXTURE_CUBE_MAP,_.depthTexture);const Ut=r.convert(_.depthTexture.format),Z=r.convert(_.depthTexture.type);let tt;_.depthTexture.format===ns?tt=e.DEPTH_COMPONENT24:_.depthTexture.format===qs&&(tt=e.DEPTH24_STENCIL8);for(let vt=0;vt<6;vt++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,tt,_.width,_.height,0,Ut,Z,null)}}else B(_.depthTexture,0);const X=K.__webglTexture,_t=P(_),it=q?e.TEXTURE_CUBE_MAP_POSITIVE_X+I:e.TEXTURE_2D,Pt=_.depthTexture.format===qs?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(_.depthTexture.format===ns)Ue(_)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Pt,it,X,0,_t):e.framebufferTexture2D(e.FRAMEBUFFER,Pt,it,X,0);else if(_.depthTexture.format===qs)Ue(_)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Pt,it,X,0,_t):e.framebufferTexture2D(e.FRAMEBUFFER,Pt,it,X,0);else throw new Error("Unknown depthTexture format")}function Ot(b){const _=i.get(b),I=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){const q=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),q){const K=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,q.removeEventListener("dispose",K)};q.addEventListener("dispose",K),_.__depthDisposeCallback=K}_.__boundDepthTexture=q}if(b.depthTexture&&!_.__autoAllocateDepthBuffer)if(I)for(let q=0;q<6;q++)Dt(_.__webglFramebuffer[q],b,q);else{const q=b.texture.mipmaps;q&&q.length>0?Dt(_.__webglFramebuffer[0],b,0):Dt(_.__webglFramebuffer,b,0)}else if(I){_.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer[q]),_.__webglDepthbuffer[q]===void 0)_.__webglDepthbuffer[q]=e.createRenderbuffer(),Vt(_.__webglDepthbuffer[q],b,!1);else{const K=b.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,X=_.__webglDepthbuffer[q];e.bindRenderbuffer(e.RENDERBUFFER,X),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,X)}}else{const q=b.texture.mipmaps;if(q&&q.length>0?n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=e.createRenderbuffer(),Vt(_.__webglDepthbuffer,b,!1);else{const K=b.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,X=_.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,X),e.framebufferRenderbuffer(e.FRAMEBUFFER,K,e.RENDERBUFFER,X)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ye(b,_,I){const q=i.get(b);_!==void 0&&rt(q.__webglFramebuffer,b,b.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),I!==void 0&&Ot(b)}function Kt(b){const _=b.texture,I=i.get(b),q=i.get(_);b.addEventListener("dispose",C);const K=b.textures,X=b.isWebGLCubeRenderTarget===!0,_t=K.length>1;if(_t||(q.__webglTexture===void 0&&(q.__webglTexture=e.createTexture()),q.__version=_.version,a.memory.textures++),X){I.__webglFramebuffer=[];for(let it=0;it<6;it++)if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer[it]=[];for(let Pt=0;Pt<_.mipmaps.length;Pt++)I.__webglFramebuffer[it][Pt]=e.createFramebuffer()}else I.__webglFramebuffer[it]=e.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer=[];for(let it=0;it<_.mipmaps.length;it++)I.__webglFramebuffer[it]=e.createFramebuffer()}else I.__webglFramebuffer=e.createFramebuffer();if(_t)for(let it=0,Pt=K.length;it<Pt;it++){const Ut=i.get(K[it]);Ut.__webglTexture===void 0&&(Ut.__webglTexture=e.createTexture(),a.memory.textures++)}if(b.samples>0&&Ue(b)===!1){I.__webglMultisampledFramebuffer=e.createFramebuffer(),I.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let it=0;it<K.length;it++){const Pt=K[it];I.__webglColorRenderbuffer[it]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,I.__webglColorRenderbuffer[it]);const Ut=r.convert(Pt.format,Pt.colorSpace),Z=r.convert(Pt.type),tt=A(Pt.internalFormat,Ut,Z,Pt.colorSpace,b.isXRRenderTarget===!0),vt=P(b);e.renderbufferStorageMultisample(e.RENDERBUFFER,vt,tt,b.width,b.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+it,e.RENDERBUFFER,I.__webglColorRenderbuffer[it])}e.bindRenderbuffer(e.RENDERBUFFER,null),b.depthBuffer&&(I.__webglDepthRenderbuffer=e.createRenderbuffer(),Vt(I.__webglDepthRenderbuffer,b,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(X){n.bindTexture(e.TEXTURE_CUBE_MAP,q.__webglTexture),ht(e.TEXTURE_CUBE_MAP,_);for(let it=0;it<6;it++)if(_.mipmaps&&_.mipmaps.length>0)for(let Pt=0;Pt<_.mipmaps.length;Pt++)rt(I.__webglFramebuffer[it][Pt],b,_,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+it,Pt);else rt(I.__webglFramebuffer[it],b,_,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);m(_)&&p(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(_t){for(let it=0,Pt=K.length;it<Pt;it++){const Ut=K[it],Z=i.get(Ut);let tt=e.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(tt=b.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(tt,Z.__webglTexture),ht(tt,Ut),rt(I.__webglFramebuffer,b,Ut,e.COLOR_ATTACHMENT0+it,tt,0),m(Ut)&&p(tt)}n.unbindTexture()}else{let it=e.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(it=b.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(it,q.__webglTexture),ht(it,_),_.mipmaps&&_.mipmaps.length>0)for(let Pt=0;Pt<_.mipmaps.length;Pt++)rt(I.__webglFramebuffer[Pt],b,_,e.COLOR_ATTACHMENT0,it,Pt);else rt(I.__webglFramebuffer,b,_,e.COLOR_ATTACHMENT0,it,0);m(_)&&p(it),n.unbindTexture()}b.depthBuffer&&Ot(b)}function re(b){const _=b.textures;for(let I=0,q=_.length;I<q;I++){const K=_[I];if(m(K)){const X=y(b),_t=i.get(K).__webglTexture;n.bindTexture(X,_t),p(X),n.unbindTexture()}}}const fe=[],Wt=[];function Pe(b){if(b.samples>0){if(Ue(b)===!1){const _=b.textures,I=b.width,q=b.height;let K=e.COLOR_BUFFER_BIT;const X=b.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,_t=i.get(b),it=_.length>1;if(it)for(let Ut=0;Ut<_.length;Ut++)n.bindFramebuffer(e.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ut,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,_t.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ut,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,_t.__webglMultisampledFramebuffer);const Pt=b.texture.mipmaps;Pt&&Pt.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,_t.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,_t.__webglFramebuffer);for(let Ut=0;Ut<_.length;Ut++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(K|=e.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(K|=e.STENCIL_BUFFER_BIT)),it){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,_t.__webglColorRenderbuffer[Ut]);const Z=i.get(_[Ut]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Z,0)}e.blitFramebuffer(0,0,I,q,0,0,I,q,K,e.NEAREST),c===!0&&(fe.length=0,Wt.length=0,fe.push(e.COLOR_ATTACHMENT0+Ut),b.depthBuffer&&b.resolveDepthBuffer===!1&&(fe.push(X),Wt.push(X),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Wt)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,fe))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),it)for(let Ut=0;Ut<_.length;Ut++){n.bindFramebuffer(e.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ut,e.RENDERBUFFER,_t.__webglColorRenderbuffer[Ut]);const Z=i.get(_[Ut]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,_t.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Ut,e.TEXTURE_2D,Z,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,_t.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){const _=b.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[_])}}}function P(b){return Math.min(s.maxSamples,b.samples)}function Ue(b){const _=i.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ie(b){const _=a.render.frame;h.get(b)!==_&&(h.set(b,_),b.update())}function ge(b,_){const I=b.colorSpace,q=b.format,K=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||I!==Wr&&I!==Ms&&(Zt.getTransfer(I)===oe?(q!==li||K!==Kn)&&Ft("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):te("WebGLTextures: Unsupported texture color space:",I)),_}function St(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=k,this.setTexture2D=B,this.setTexture2DArray=V,this.setTexture3D=F,this.setTextureCube=Q,this.rebindTextures=Ye,this.setupRenderTarget=Kt,this.updateRenderTargetMipmap=re,this.updateMultisampleRenderTarget=Pe,this.setupDepthRenderbuffer=Ot,this.setupFrameBufferTexture=rt,this.useMultisampledRTT=Ue,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function JM(e,t){function n(i,s=Ms){let r;const a=Zt.getTransfer(s);if(i===Kn)return e.UNSIGNED_BYTE;if(i===Fu)return e.UNSIGNED_SHORT_4_4_4_4;if(i===Nu)return e.UNSIGNED_SHORT_5_5_5_1;if(i===Xm)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===Ym)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===Gm)return e.BYTE;if(i===Wm)return e.SHORT;if(i===Xa)return e.UNSIGNED_SHORT;if(i===Uu)return e.INT;if(i===Di)return e.UNSIGNED_INT;if(i===bi)return e.FLOAT;if(i===es)return e.HALF_FLOAT;if(i===qm)return e.ALPHA;if(i===$m)return e.RGB;if(i===li)return e.RGBA;if(i===ns)return e.DEPTH_COMPONENT;if(i===qs)return e.DEPTH_STENCIL;if(i===jm)return e.RED;if(i===Ou)return e.RED_INTEGER;if(i===Gr)return e.RG;if(i===Bu)return e.RG_INTEGER;if(i===ku)return e.RGBA_INTEGER;if(i===rc||i===ac||i===oc||i===cc)if(a===oe)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===rc)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ac)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===oc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===cc)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===rc)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ac)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===oc)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===cc)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Sh||i===Eh||i===bh||i===Ah)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Sh)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Eh)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===bh)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ah)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Th||i===wh||i===Ch||i===Rh||i===Ph||i===Lh||i===Ih)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Th||i===wh)return a===oe?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ch)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Rh)return r.COMPRESSED_R11_EAC;if(i===Ph)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Lh)return r.COMPRESSED_RG11_EAC;if(i===Ih)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Dh||i===Uh||i===Fh||i===Nh||i===Oh||i===Bh||i===kh||i===zh||i===Vh||i===Hh||i===Gh||i===Wh||i===Xh||i===Yh)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Dh)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Uh)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Fh)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Nh)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Oh)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Bh)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===kh)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===zh)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Vh)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Hh)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Gh)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Wh)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Xh)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Yh)return a===oe?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===qh||i===$h||i===jh)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===qh)return a===oe?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===$h)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===jh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Kh||i===Zh||i===Jh||i===Qh)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Kh)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Zh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Jh)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Qh)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ya?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}const QM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,ty=`
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

}`;class ey{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const i=new r0(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,i=new ui({vertexShader:QM,fragmentShader:ty,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new _n(new so(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ny extends ca{constructor(t,n){super();const i=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,g=null;const x=typeof XRWebGLBinding<"u",m=new ey,p={},y=n.getContextAttributes();let A=null,S=null;const w=[],T=[],C=new se;let v=null;const E=new qn;E.viewport=new De;const Y=new qn;Y.viewport=new De;const R=[E,Y],k=new pv;let z=null,W=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let nt=w[$];return nt===void 0&&(nt=new Sl,w[$]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function($){let nt=w[$];return nt===void 0&&(nt=new Sl,w[$]=nt),nt.getGripSpace()},this.getHand=function($){let nt=w[$];return nt===void 0&&(nt=new Sl,w[$]=nt),nt.getHandSpace()};function B($){const nt=T.indexOf($.inputSource);if(nt===-1)return;const rt=w[nt];rt!==void 0&&(rt.update($.inputSource,$.frame,l||a),rt.dispatchEvent({type:$.type,data:$.inputSource}))}function V(){s.removeEventListener("select",B),s.removeEventListener("selectstart",B),s.removeEventListener("selectend",B),s.removeEventListener("squeeze",B),s.removeEventListener("squeezestart",B),s.removeEventListener("squeezeend",B),s.removeEventListener("end",V),s.removeEventListener("inputsourceschange",F);for(let $=0;$<w.length;$++){const nt=T[$];nt!==null&&(T[$]=null,w[$].disconnect(nt))}z=null,W=null,m.reset();for(const $ in p)delete p[$];t.setRenderTarget(A),f=null,u=null,d=null,s=null,S=null,ce.stop(),i.isPresenting=!1,t.setPixelRatio(v),t.setSize(C.width,C.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,i.isPresenting===!0&&Ft("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,i.isPresenting===!0&&Ft("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,n)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(A=t.getRenderTarget(),s.addEventListener("select",B),s.addEventListener("selectstart",B),s.addEventListener("selectend",B),s.addEventListener("squeeze",B),s.addEventListener("squeezestart",B),s.addEventListener("squeezeend",B),s.addEventListener("end",V),s.addEventListener("inputsourceschange",F),y.xrCompatible!==!0&&await n.makeXRCompatible(),v=t.getPixelRatio(),t.getSize(C),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let rt=null,Vt=null,Dt=null;y.depth&&(Dt=y.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,rt=y.stencil?qs:ns,Vt=y.stencil?Ya:Di);const Ot={colorFormat:n.RGBA8,depthFormat:Dt,scaleFactor:r};d=this.getBinding(),u=d.createProjectionLayer(Ot),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),S=new Ri(u.textureWidth,u.textureHeight,{format:li,type:Kn,depthTexture:new qa(u.textureWidth,u.textureHeight,Vt,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const rt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,n,rt),s.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new Ri(f.framebufferWidth,f.framebufferHeight,{format:li,type:Kn,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),ce.setContext(s),ce.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function F($){for(let nt=0;nt<$.removed.length;nt++){const rt=$.removed[nt],Vt=T.indexOf(rt);Vt>=0&&(T[Vt]=null,w[Vt].disconnect(rt))}for(let nt=0;nt<$.added.length;nt++){const rt=$.added[nt];let Vt=T.indexOf(rt);if(Vt===-1){for(let Ot=0;Ot<w.length;Ot++)if(Ot>=T.length){T.push(rt),Vt=Ot;break}else if(T[Ot]===null){T[Ot]=rt,Vt=Ot;break}if(Vt===-1)break}const Dt=w[Vt];Dt&&Dt.connect(rt)}}const Q=new D,j=new D;function lt($,nt,rt){Q.setFromMatrixPosition(nt.matrixWorld),j.setFromMatrixPosition(rt.matrixWorld);const Vt=Q.distanceTo(j),Dt=nt.projectionMatrix.elements,Ot=rt.projectionMatrix.elements,Ye=Dt[14]/(Dt[10]-1),Kt=Dt[14]/(Dt[10]+1),re=(Dt[9]+1)/Dt[5],fe=(Dt[9]-1)/Dt[5],Wt=(Dt[8]-1)/Dt[0],Pe=(Ot[8]+1)/Ot[0],P=Ye*Wt,Ue=Ye*Pe,ie=Vt/(-Wt+Pe),ge=ie*-Wt;if(nt.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(ge),$.translateZ(ie),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Dt[10]===-1)$.projectionMatrix.copy(nt.projectionMatrix),$.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const St=Ye+ie,b=Kt+ie,_=P-ge,I=Ue+(Vt-ge),q=re*Kt/b*St,K=fe*Kt/b*St;$.projectionMatrix.makePerspective(_,I,q,K,St,b),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function pt($,nt){nt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(nt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let nt=$.near,rt=$.far;m.texture!==null&&(m.depthNear>0&&(nt=m.depthNear),m.depthFar>0&&(rt=m.depthFar)),k.near=Y.near=E.near=nt,k.far=Y.far=E.far=rt,(z!==k.near||W!==k.far)&&(s.updateRenderState({depthNear:k.near,depthFar:k.far}),z=k.near,W=k.far),k.layers.mask=$.layers.mask|6,E.layers.mask=k.layers.mask&-5,Y.layers.mask=k.layers.mask&-3;const Vt=$.parent,Dt=k.cameras;pt(k,Vt);for(let Ot=0;Ot<Dt.length;Ot++)pt(Dt[Ot],Vt);Dt.length===2?lt(k,E,Y):k.projectionMatrix.copy(E.projectionMatrix),ht($,k,Vt)};function ht($,nt,rt){rt===null?$.matrix.copy(nt.matrixWorld):($.matrix.copy(rt.matrixWorld),$.matrix.invert(),$.matrix.multiply(nt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(nt.projectionMatrix),$.projectionMatrixInverse.copy(nt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=tu*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return k},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function($){c=$,u!==null&&(u.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(k)},this.getCameraTexture=function($){return p[$]};let kt=null;function de($,nt){if(h=nt.getViewerPose(l||a),g=nt,h!==null){const rt=h.views;f!==null&&(t.setRenderTargetFramebuffer(S,f.framebuffer),t.setRenderTarget(S));let Vt=!1;rt.length!==k.cameras.length&&(k.cameras.length=0,Vt=!0);for(let Kt=0;Kt<rt.length;Kt++){const re=rt[Kt];let fe=null;if(f!==null)fe=f.getViewport(re);else{const Pe=d.getViewSubImage(u,re);fe=Pe.viewport,Kt===0&&(t.setRenderTargetTextures(S,Pe.colorTexture,Pe.depthStencilTexture),t.setRenderTarget(S))}let Wt=R[Kt];Wt===void 0&&(Wt=new qn,Wt.layers.enable(Kt),Wt.viewport=new De,R[Kt]=Wt),Wt.matrix.fromArray(re.transform.matrix),Wt.matrix.decompose(Wt.position,Wt.quaternion,Wt.scale),Wt.projectionMatrix.fromArray(re.projectionMatrix),Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(),Wt.viewport.set(fe.x,fe.y,fe.width,fe.height),Kt===0&&(k.matrix.copy(Wt.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),Vt===!0&&k.cameras.push(Wt)}const Dt=s.enabledFeatures;if(Dt&&Dt.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=i.getBinding();const Kt=d.getDepthInformation(rt[0]);Kt&&Kt.isValid&&Kt.texture&&m.init(Kt,s.renderState)}if(Dt&&Dt.includes("camera-access")&&x){t.state.unbindTexture(),d=i.getBinding();for(let Kt=0;Kt<rt.length;Kt++){const re=rt[Kt].camera;if(re){let fe=p[re];fe||(fe=new r0,p[re]=fe);const Wt=d.getCameraImage(re);fe.sourceTexture=Wt}}}}for(let rt=0;rt<w.length;rt++){const Vt=T[rt],Dt=w[rt];Vt!==null&&Dt!==void 0&&Dt.update(Vt,nt,l||a)}kt&&kt($,nt),nt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:nt}),g=null}const ce=new l0;ce.setAnimationLoop(de),this.setAnimationLoop=function($){kt=$},this.dispose=function(){}}}const ks=new Ui,iy=new Ae;function sy(e,t){function n(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,a0(e)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,y,A,S){p.isMeshBasicMaterial?r(m,p):p.isMeshLambertMaterial?(r(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,S)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),x(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,y,A):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,n(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,n(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===mn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,n(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===mn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,n(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,n(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,n(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=t.get(p),A=y.envMap,S=y.envMapRotation;A&&(m.envMap.value=A,ks.copy(S),ks.x*=-1,ks.y*=-1,ks.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(ks.y*=-1,ks.z*=-1),m.envMapRotation.value.setFromMatrix4(iy.makeRotationFromEuler(ks)),m.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,n(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,n(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,n(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,y,A){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=A*.5,p.map&&(m.map.value=p.map,n(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,n(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,n(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,n(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,n(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,n(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,n(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,n(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,n(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,n(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===mn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,n(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,n(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,n(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,n(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,n(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,n(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,n(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){const y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function ry(e,t,n,i){let s={},r={},a=[];const o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,A){const S=A.program;i.uniformBlockBinding(y,S)}function l(y,A){let S=s[y.id];S===void 0&&(g(y),S=h(y),s[y.id]=S,y.addEventListener("dispose",m));const w=A.program;i.updateUBOMapping(y,w);const T=t.render.frame;r[y.id]!==T&&(u(y),r[y.id]=T)}function h(y){const A=d();y.__bindingPointIndex=A;const S=e.createBuffer(),w=y.__size,T=y.usage;return e.bindBuffer(e.UNIFORM_BUFFER,S),e.bufferData(e.UNIFORM_BUFFER,w,T),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,A,S),S}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return te("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){const A=s[y.id],S=y.uniforms,w=y.__cache;e.bindBuffer(e.UNIFORM_BUFFER,A);for(let T=0,C=S.length;T<C;T++){const v=Array.isArray(S[T])?S[T]:[S[T]];for(let E=0,Y=v.length;E<Y;E++){const R=v[E];if(f(R,T,E,w)===!0){const k=R.__offset,z=Array.isArray(R.value)?R.value:[R.value];let W=0;for(let B=0;B<z.length;B++){const V=z[B],F=x(V);typeof V=="number"||typeof V=="boolean"?(R.__data[0]=V,e.bufferSubData(e.UNIFORM_BUFFER,k+W,R.__data)):V.isMatrix3?(R.__data[0]=V.elements[0],R.__data[1]=V.elements[1],R.__data[2]=V.elements[2],R.__data[3]=0,R.__data[4]=V.elements[3],R.__data[5]=V.elements[4],R.__data[6]=V.elements[5],R.__data[7]=0,R.__data[8]=V.elements[6],R.__data[9]=V.elements[7],R.__data[10]=V.elements[8],R.__data[11]=0):(V.toArray(R.__data,W),W+=F.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,k,R.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function f(y,A,S,w){const T=y.value,C=A+"_"+S;if(w[C]===void 0)return typeof T=="number"||typeof T=="boolean"?w[C]=T:w[C]=T.clone(),!0;{const v=w[C];if(typeof T=="number"||typeof T=="boolean"){if(v!==T)return w[C]=T,!0}else if(v.equals(T)===!1)return v.copy(T),!0}return!1}function g(y){const A=y.uniforms;let S=0;const w=16;for(let C=0,v=A.length;C<v;C++){const E=Array.isArray(A[C])?A[C]:[A[C]];for(let Y=0,R=E.length;Y<R;Y++){const k=E[Y],z=Array.isArray(k.value)?k.value:[k.value];for(let W=0,B=z.length;W<B;W++){const V=z[W],F=x(V),Q=S%w,j=Q%F.boundary,lt=Q+j;S+=j,lt!==0&&w-lt<F.storage&&(S+=w-lt),k.__data=new Float32Array(F.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=S,S+=F.storage}}}const T=S%w;return T>0&&(S+=w-T),y.__size=S,y.__cache={},this}function x(y){const A={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(A.boundary=4,A.storage=4):y.isVector2?(A.boundary=8,A.storage=8):y.isVector3||y.isColor?(A.boundary=16,A.storage=12):y.isVector4?(A.boundary=16,A.storage=16):y.isMatrix3?(A.boundary=48,A.storage=48):y.isMatrix4?(A.boundary=64,A.storage=64):y.isTexture?Ft("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ft("WebGLRenderer: Unsupported uniform value type.",y),A}function m(y){const A=y.target;A.removeEventListener("dispose",m);const S=a.indexOf(A.__bindingPointIndex);a.splice(S,1),e.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function p(){for(const y in s)e.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}const ay=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let _i=null;function oy(){return _i===null&&(_i=new G1(ay,16,16,Gr,es),_i.name="DFG_LUT",_i.minFilter=Ze,_i.magFilter=Ze,_i.wrapS=Ki,_i.wrapT=Ki,_i.generateMipmaps=!1,_i.needsUpdate=!0),_i}class cy{constructor(t={}){const{canvas:n=M1(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Kn}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const x=f,m=new Set([ku,Bu,Ou]),p=new Set([Kn,Di,Xa,Ya,Fu,Nu]),y=new Uint32Array(4),A=new Int32Array(4);let S=null,w=null;const T=[],C=[];let v=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ci,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const E=this;let Y=!1;this._outputColorSpace=Ln;let R=0,k=0,z=null,W=-1,B=null;const V=new De,F=new De;let Q=null;const j=new $t(0);let lt=0,pt=n.width,ht=n.height,kt=1,de=null,ce=null;const $=new De(0,0,pt,ht),nt=new De(0,0,pt,ht);let rt=!1;const Vt=new i0;let Dt=!1,Ot=!1;const Ye=new Ae,Kt=new D,re=new De,fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Wt=!1;function Pe(){return z===null?kt:1}let P=i;function Ue(M,U){return n.getContext(M,U)}try{const M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Iu}`),n.addEventListener("webglcontextlost",xt,!1),n.addEventListener("webglcontextrestored",Bt,!1),n.addEventListener("webglcontextcreationerror",_e,!1),P===null){const U="webgl2";if(P=Ue(U,M),P===null)throw Ue(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw te("WebGLRenderer: "+M.message),M}let ie,ge,St,b,_,I,q,K,X,_t,it,Pt,Ut,Z,tt,vt,Mt,ut,Xt,L,st,et,mt;function J(){ie=new c3(P),ie.init(),st=new JM(P,ie),ge=new t3(P,ie,t,st),St=new KM(P,ie),ge.reversedDepthBuffer&&u&&St.buffers.depth.setReversed(!0),b=new u3(P),_=new NM,I=new ZM(P,ie,St,_,ge,st,b),q=new o3(E),K=new gv(P),et=new J2(P,K),X=new l3(P,K,b,et),_t=new f3(P,X,K,et,b),ut=new d3(P,ge,I),tt=new e3(_),it=new FM(E,q,ie,ge,et,tt),Pt=new sy(E,_),Ut=new BM,Z=new WM(ie),Mt=new Z2(E,q,St,_t,g,c),vt=new jM(E,_t,ge),mt=new ry(P,b,ge,St),Xt=new Q2(P,ie,b),L=new h3(P,ie,b),b.programs=it.programs,E.capabilities=ge,E.extensions=ie,E.properties=_,E.renderLists=Ut,E.shadowMap=vt,E.state=St,E.info=b}J(),x!==Kn&&(v=new m3(x,n.width,n.height,s,r));const G=new ny(E,P);this.xr=G,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const M=ie.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=ie.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return kt},this.setPixelRatio=function(M){M!==void 0&&(kt=M,this.setSize(pt,ht,!1))},this.getSize=function(M){return M.set(pt,ht)},this.setSize=function(M,U,H=!0){if(G.isPresenting){Ft("WebGLRenderer: Can't change size while VR device is presenting.");return}pt=M,ht=U,n.width=Math.floor(M*kt),n.height=Math.floor(U*kt),H===!0&&(n.style.width=M+"px",n.style.height=U+"px"),v!==null&&v.setSize(n.width,n.height),this.setViewport(0,0,M,U)},this.getDrawingBufferSize=function(M){return M.set(pt*kt,ht*kt).floor()},this.setDrawingBufferSize=function(M,U,H){pt=M,ht=U,kt=H,n.width=Math.floor(M*H),n.height=Math.floor(U*H),this.setViewport(0,0,M,U)},this.setEffects=function(M){if(x===Kn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let U=0;U<M.length;U++)if(M[U].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}v.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(V)},this.getViewport=function(M){return M.copy($)},this.setViewport=function(M,U,H,O){M.isVector4?$.set(M.x,M.y,M.z,M.w):$.set(M,U,H,O),St.viewport(V.copy($).multiplyScalar(kt).round())},this.getScissor=function(M){return M.copy(nt)},this.setScissor=function(M,U,H,O){M.isVector4?nt.set(M.x,M.y,M.z,M.w):nt.set(M,U,H,O),St.scissor(F.copy(nt).multiplyScalar(kt).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(M){St.setScissorTest(rt=M)},this.setOpaqueSort=function(M){de=M},this.setTransparentSort=function(M){ce=M},this.getClearColor=function(M){return M.copy(Mt.getClearColor())},this.setClearColor=function(){Mt.setClearColor(...arguments)},this.getClearAlpha=function(){return Mt.getClearAlpha()},this.setClearAlpha=function(){Mt.setClearAlpha(...arguments)},this.clear=function(M=!0,U=!0,H=!0){let O=0;if(M){let N=!1;if(z!==null){const ot=z.texture.format;N=m.has(ot)}if(N){const ot=z.texture.type,ft=p.has(ot),ct=Mt.getClearColor(),yt=Mt.getClearAlpha(),Tt=ct.r,zt=ct.g,Yt=ct.b;ft?(y[0]=Tt,y[1]=zt,y[2]=Yt,y[3]=yt,P.clearBufferuiv(P.COLOR,0,y)):(A[0]=Tt,A[1]=zt,A[2]=Yt,A[3]=yt,P.clearBufferiv(P.COLOR,0,A))}else O|=P.COLOR_BUFFER_BIT}U&&(O|=P.DEPTH_BUFFER_BIT),H&&(O|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O!==0&&P.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",xt,!1),n.removeEventListener("webglcontextrestored",Bt,!1),n.removeEventListener("webglcontextcreationerror",_e,!1),Mt.dispose(),Ut.dispose(),Z.dispose(),_.dispose(),q.dispose(),_t.dispose(),et.dispose(),mt.dispose(),it.dispose(),G.dispose(),G.removeEventListener("sessionstart",Jd),G.removeEventListener("sessionend",Qd),Is.stop()};function xt(M){M.preventDefault(),pf("WebGLRenderer: Context Lost."),Y=!0}function Bt(){pf("WebGLRenderer: Context Restored."),Y=!1;const M=b.autoReset,U=vt.enabled,H=vt.autoUpdate,O=vt.needsUpdate,N=vt.type;J(),b.autoReset=M,vt.enabled=U,vt.autoUpdate=H,vt.needsUpdate=O,vt.type=N}function _e(M){te("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function ae(M){const U=M.target;U.removeEventListener("dispose",ae),Vi(U)}function Vi(M){Hi(M),_.remove(M)}function Hi(M){const U=_.get(M).programs;U!==void 0&&(U.forEach(function(H){it.releaseProgram(H)}),M.isShaderMaterial&&it.releaseShaderCache(M))}this.renderBufferDirect=function(M,U,H,O,N,ot){U===null&&(U=fe);const ft=N.isMesh&&N.matrixWorld.determinant()<0,ct=D_(M,U,H,O,N);St.setMaterial(O,ft);let yt=H.index,Tt=1;if(O.wireframe===!0){if(yt=X.getWireframeAttribute(H),yt===void 0)return;Tt=2}const zt=H.drawRange,Yt=H.attributes.position;let Ct=zt.start*Tt,le=(zt.start+zt.count)*Tt;ot!==null&&(Ct=Math.max(Ct,ot.start*Tt),le=Math.min(le,(ot.start+ot.count)*Tt)),yt!==null?(Ct=Math.max(Ct,0),le=Math.min(le,yt.count)):Yt!=null&&(Ct=Math.max(Ct,0),le=Math.min(le,Yt.count));const Le=le-Ct;if(Le<0||Le===1/0)return;et.setup(N,O,ct,H,yt);let we,he=Xt;if(yt!==null&&(we=K.get(yt),he=L,he.setIndex(we)),N.isMesh)O.wireframe===!0?(St.setLineWidth(O.wireframeLinewidth*Pe()),he.setMode(P.LINES)):he.setMode(P.TRIANGLES);else if(N.isLine){let nn=O.linewidth;nn===void 0&&(nn=1),St.setLineWidth(nn*Pe()),N.isLineSegments?he.setMode(P.LINES):N.isLineLoop?he.setMode(P.LINE_LOOP):he.setMode(P.LINE_STRIP)}else N.isPoints?he.setMode(P.POINTS):N.isSprite&&he.setMode(P.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Mc("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),he.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(ie.get("WEBGL_multi_draw"))he.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const nn=N._multiDrawStarts,Et=N._multiDrawCounts,bn=N._multiDrawCount,Qt=yt?K.get(yt).bytesPerElement:1,ti=_.get(O).currentProgram.getUniforms();for(let mi=0;mi<bn;mi++)ti.setValue(P,"_gl_DrawID",mi),he.render(nn[mi]/Qt,Et[mi])}else if(N.isInstancedMesh)he.renderInstances(Ct,Le,N.count);else if(H.isInstancedBufferGeometry){const nn=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,Et=Math.min(H.instanceCount,nn);he.renderInstances(Ct,Le,Et)}else he.render(Ct,Le)};function Zd(M,U,H){M.transparent===!0&&M.side===Si&&M.forceSinglePass===!1?(M.side=mn,M.needsUpdate=!0,vo(M,U,H),M.side=ws,M.needsUpdate=!0,vo(M,U,H),M.side=Si):vo(M,U,H)}this.compile=function(M,U,H=null){H===null&&(H=M),w=Z.get(H),w.init(U),C.push(w),H.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(w.pushLight(N),N.castShadow&&w.pushShadow(N))}),M!==H&&M.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(w.pushLight(N),N.castShadow&&w.pushShadow(N))}),w.setupLights();const O=new Set;return M.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const ot=N.material;if(ot)if(Array.isArray(ot))for(let ft=0;ft<ot.length;ft++){const ct=ot[ft];Zd(ct,H,N),O.add(ct)}else Zd(ot,H,N),O.add(ot)}),w=C.pop(),O},this.compileAsync=function(M,U,H=null){const O=this.compile(M,U,H);return new Promise(N=>{function ot(){if(O.forEach(function(ft){_.get(ft).currentProgram.isReady()&&O.delete(ft)}),O.size===0){N(M);return}setTimeout(ot,10)}ie.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let hl=null;function I_(M){hl&&hl(M)}function Jd(){Is.stop()}function Qd(){Is.start()}const Is=new l0;Is.setAnimationLoop(I_),typeof self<"u"&&Is.setContext(self),this.setAnimationLoop=function(M){hl=M,G.setAnimationLoop(M),M===null?Is.stop():Is.start()},G.addEventListener("sessionstart",Jd),G.addEventListener("sessionend",Qd),this.render=function(M,U){if(U!==void 0&&U.isCamera!==!0){te("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(Y===!0)return;const H=G.enabled===!0&&G.isPresenting===!0,O=v!==null&&(z===null||H)&&v.begin(E,z);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),G.enabled===!0&&G.isPresenting===!0&&(v===null||v.isCompositing()===!1)&&(G.cameraAutoUpdate===!0&&G.updateCamera(U),U=G.getCamera()),M.isScene===!0&&M.onBeforeRender(E,M,U,z),w=Z.get(M,C.length),w.init(U),C.push(w),Ye.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),Vt.setFromProjectionMatrix(Ye,Ai,U.reversedDepth),Ot=this.localClippingEnabled,Dt=tt.init(this.clippingPlanes,Ot),S=Ut.get(M,T.length),S.init(),T.push(S),G.enabled===!0&&G.isPresenting===!0){const ft=E.xr.getDepthSensingMesh();ft!==null&&ul(ft,U,-1/0,E.sortObjects)}ul(M,U,0,E.sortObjects),S.finish(),E.sortObjects===!0&&S.sort(de,ce),Wt=G.enabled===!1||G.isPresenting===!1||G.hasDepthSensing()===!1,Wt&&Mt.addToRenderList(S,M),this.info.render.frame++,Dt===!0&&tt.beginShadows();const N=w.state.shadowsArray;if(vt.render(N,M,U),Dt===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(O&&v.hasRenderPass())===!1){const ft=S.opaque,ct=S.transmissive;if(w.setupLights(),U.isArrayCamera){const yt=U.cameras;if(ct.length>0)for(let Tt=0,zt=yt.length;Tt<zt;Tt++){const Yt=yt[Tt];ef(ft,ct,M,Yt)}Wt&&Mt.render(M);for(let Tt=0,zt=yt.length;Tt<zt;Tt++){const Yt=yt[Tt];tf(S,M,Yt,Yt.viewport)}}else ct.length>0&&ef(ft,ct,M,U),Wt&&Mt.render(M),tf(S,M,U)}z!==null&&k===0&&(I.updateMultisampleRenderTarget(z),I.updateRenderTargetMipmap(z)),O&&v.end(E),M.isScene===!0&&M.onAfterRender(E,M,U),et.resetDefaultState(),W=-1,B=null,C.pop(),C.length>0?(w=C[C.length-1],Dt===!0&&tt.setGlobalState(E.clippingPlanes,w.state.camera)):w=null,T.pop(),T.length>0?S=T[T.length-1]:S=null};function ul(M,U,H,O){if(M.visible===!1)return;if(M.layers.test(U.layers)){if(M.isGroup)H=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(U);else if(M.isLight)w.pushLight(M),M.castShadow&&w.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Vt.intersectsSprite(M)){O&&re.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Ye);const ft=_t.update(M),ct=M.material;ct.visible&&S.push(M,ft,ct,H,re.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Vt.intersectsObject(M))){const ft=_t.update(M),ct=M.material;if(O&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),re.copy(M.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),re.copy(ft.boundingSphere.center)),re.applyMatrix4(M.matrixWorld).applyMatrix4(Ye)),Array.isArray(ct)){const yt=ft.groups;for(let Tt=0,zt=yt.length;Tt<zt;Tt++){const Yt=yt[Tt],Ct=ct[Yt.materialIndex];Ct&&Ct.visible&&S.push(M,ft,Ct,H,re.z,Yt)}}else ct.visible&&S.push(M,ft,ct,H,re.z,null)}}const ot=M.children;for(let ft=0,ct=ot.length;ft<ct;ft++)ul(ot[ft],U,H,O)}function tf(M,U,H,O){const{opaque:N,transmissive:ot,transparent:ft}=M;w.setupLightsView(H),Dt===!0&&tt.setGlobalState(E.clippingPlanes,H),O&&St.viewport(V.copy(O)),N.length>0&&_o(N,U,H),ot.length>0&&_o(ot,U,H),ft.length>0&&_o(ft,U,H),St.buffers.depth.setTest(!0),St.buffers.depth.setMask(!0),St.buffers.color.setMask(!0),St.setPolygonOffset(!1)}function ef(M,U,H,O){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[O.id]===void 0){const Ct=ie.has("EXT_color_buffer_half_float")||ie.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[O.id]=new Ri(1,1,{generateMipmaps:!0,type:Ct?es:Kn,minFilter:Ys,samples:Math.max(4,ge.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Zt.workingColorSpace})}const ot=w.state.transmissionRenderTarget[O.id],ft=O.viewport||V;ot.setSize(ft.z*E.transmissionResolutionScale,ft.w*E.transmissionResolutionScale);const ct=E.getRenderTarget(),yt=E.getActiveCubeFace(),Tt=E.getActiveMipmapLevel();E.setRenderTarget(ot),E.getClearColor(j),lt=E.getClearAlpha(),lt<1&&E.setClearColor(16777215,.5),E.clear(),Wt&&Mt.render(H);const zt=E.toneMapping;E.toneMapping=Ci;const Yt=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),w.setupLightsView(O),Dt===!0&&tt.setGlobalState(E.clippingPlanes,O),_o(M,H,O),I.updateMultisampleRenderTarget(ot),I.updateRenderTargetMipmap(ot),ie.has("WEBGL_multisampled_render_to_texture")===!1){let Ct=!1;for(let le=0,Le=U.length;le<Le;le++){const we=U[le],{object:he,geometry:nn,material:Et,group:bn}=we;if(Et.side===Si&&he.layers.test(O.layers)){const Qt=Et.side;Et.side=mn,Et.needsUpdate=!0,nf(he,H,O,nn,Et,bn),Et.side=Qt,Et.needsUpdate=!0,Ct=!0}}Ct===!0&&(I.updateMultisampleRenderTarget(ot),I.updateRenderTargetMipmap(ot))}E.setRenderTarget(ct,yt,Tt),E.setClearColor(j,lt),Yt!==void 0&&(O.viewport=Yt),E.toneMapping=zt}function _o(M,U,H){const O=U.isScene===!0?U.overrideMaterial:null;for(let N=0,ot=M.length;N<ot;N++){const ft=M[N],{object:ct,geometry:yt,group:Tt}=ft;let zt=ft.material;zt.allowOverride===!0&&O!==null&&(zt=O),ct.layers.test(H.layers)&&nf(ct,U,H,yt,zt,Tt)}}function nf(M,U,H,O,N,ot){M.onBeforeRender(E,U,H,O,N,ot),M.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),N.onBeforeRender(E,U,H,O,M,ot),N.transparent===!0&&N.side===Si&&N.forceSinglePass===!1?(N.side=mn,N.needsUpdate=!0,E.renderBufferDirect(H,U,O,N,M,ot),N.side=ws,N.needsUpdate=!0,E.renderBufferDirect(H,U,O,N,M,ot),N.side=Si):E.renderBufferDirect(H,U,O,N,M,ot),M.onAfterRender(E,U,H,O,N,ot)}function vo(M,U,H){U.isScene!==!0&&(U=fe);const O=_.get(M),N=w.state.lights,ot=w.state.shadowsArray,ft=N.state.version,ct=it.getParameters(M,N.state,ot,U,H),yt=it.getProgramCacheKey(ct);let Tt=O.programs;O.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?U.environment:null,O.fog=U.fog;const zt=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;O.envMap=q.get(M.envMap||O.environment,zt),O.envMapRotation=O.environment!==null&&M.envMap===null?U.environmentRotation:M.envMapRotation,Tt===void 0&&(M.addEventListener("dispose",ae),Tt=new Map,O.programs=Tt);let Yt=Tt.get(yt);if(Yt!==void 0){if(O.currentProgram===Yt&&O.lightsStateVersion===ft)return rf(M,ct),Yt}else ct.uniforms=it.getUniforms(M),M.onBeforeCompile(ct,E),Yt=it.acquireProgram(ct,yt),Tt.set(yt,Yt),O.uniforms=ct.uniforms;const Ct=O.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ct.clippingPlanes=tt.uniform),rf(M,ct),O.needsLights=F_(M),O.lightsStateVersion=ft,O.needsLights&&(Ct.ambientLightColor.value=N.state.ambient,Ct.lightProbe.value=N.state.probe,Ct.directionalLights.value=N.state.directional,Ct.directionalLightShadows.value=N.state.directionalShadow,Ct.spotLights.value=N.state.spot,Ct.spotLightShadows.value=N.state.spotShadow,Ct.rectAreaLights.value=N.state.rectArea,Ct.ltc_1.value=N.state.rectAreaLTC1,Ct.ltc_2.value=N.state.rectAreaLTC2,Ct.pointLights.value=N.state.point,Ct.pointLightShadows.value=N.state.pointShadow,Ct.hemisphereLights.value=N.state.hemi,Ct.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Ct.spotLightMatrix.value=N.state.spotLightMatrix,Ct.spotLightMap.value=N.state.spotLightMap,Ct.pointShadowMatrix.value=N.state.pointShadowMatrix),O.currentProgram=Yt,O.uniformsList=null,Yt}function sf(M){if(M.uniformsList===null){const U=M.currentProgram.getUniforms();M.uniformsList=lc.seqWithValue(U.seq,M.uniforms)}return M.uniformsList}function rf(M,U){const H=_.get(M);H.outputColorSpace=U.outputColorSpace,H.batching=U.batching,H.batchingColor=U.batchingColor,H.instancing=U.instancing,H.instancingColor=U.instancingColor,H.instancingMorph=U.instancingMorph,H.skinning=U.skinning,H.morphTargets=U.morphTargets,H.morphNormals=U.morphNormals,H.morphColors=U.morphColors,H.morphTargetsCount=U.morphTargetsCount,H.numClippingPlanes=U.numClippingPlanes,H.numIntersection=U.numClipIntersection,H.vertexAlphas=U.vertexAlphas,H.vertexTangents=U.vertexTangents,H.toneMapping=U.toneMapping}function D_(M,U,H,O,N){U.isScene!==!0&&(U=fe),I.resetTextureUnits();const ot=U.fog,ft=O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial?U.environment:null,ct=z===null?E.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:Wr,yt=O.isMeshStandardMaterial||O.isMeshLambertMaterial&&!O.envMap||O.isMeshPhongMaterial&&!O.envMap,Tt=q.get(O.envMap||ft,yt),zt=O.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Yt=!!H.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),Ct=!!H.morphAttributes.position,le=!!H.morphAttributes.normal,Le=!!H.morphAttributes.color;let we=Ci;O.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(we=E.toneMapping);const he=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,nn=he!==void 0?he.length:0,Et=_.get(O),bn=w.state.lights;if(Dt===!0&&(Ot===!0||M!==B)){const qe=M===B&&O.id===W;tt.setState(O,M,qe)}let Qt=!1;O.version===Et.__version?(Et.needsLights&&Et.lightsStateVersion!==bn.state.version||Et.outputColorSpace!==ct||N.isBatchedMesh&&Et.batching===!1||!N.isBatchedMesh&&Et.batching===!0||N.isBatchedMesh&&Et.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Et.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Et.instancing===!1||!N.isInstancedMesh&&Et.instancing===!0||N.isSkinnedMesh&&Et.skinning===!1||!N.isSkinnedMesh&&Et.skinning===!0||N.isInstancedMesh&&Et.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Et.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Et.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Et.instancingMorph===!1&&N.morphTexture!==null||Et.envMap!==Tt||O.fog===!0&&Et.fog!==ot||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==tt.numPlanes||Et.numIntersection!==tt.numIntersection)||Et.vertexAlphas!==zt||Et.vertexTangents!==Yt||Et.morphTargets!==Ct||Et.morphNormals!==le||Et.morphColors!==Le||Et.toneMapping!==we||Et.morphTargetsCount!==nn)&&(Qt=!0):(Qt=!0,Et.__version=O.version);let ti=Et.currentProgram;Qt===!0&&(ti=vo(O,U,N));let mi=!1,Ds=!1,ur=!1;const pe=ti.getUniforms(),Qe=Et.uniforms;if(St.useProgram(ti.program)&&(mi=!0,Ds=!0,ur=!0),O.id!==W&&(W=O.id,Ds=!0),mi||B!==M){St.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),pe.setValue(P,"projectionMatrix",M.projectionMatrix),pe.setValue(P,"viewMatrix",M.matrixWorldInverse);const ls=pe.map.cameraPosition;ls!==void 0&&ls.setValue(P,Kt.setFromMatrixPosition(M.matrixWorld)),ge.logarithmicDepthBuffer&&pe.setValue(P,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&pe.setValue(P,"isOrthographic",M.isOrthographicCamera===!0),B!==M&&(B=M,Ds=!0,ur=!0)}if(Et.needsLights&&(bn.state.directionalShadowMap.length>0&&pe.setValue(P,"directionalShadowMap",bn.state.directionalShadowMap,I),bn.state.spotShadowMap.length>0&&pe.setValue(P,"spotShadowMap",bn.state.spotShadowMap,I),bn.state.pointShadowMap.length>0&&pe.setValue(P,"pointShadowMap",bn.state.pointShadowMap,I)),N.isSkinnedMesh){pe.setOptional(P,N,"bindMatrix"),pe.setOptional(P,N,"bindMatrixInverse");const qe=N.skeleton;qe&&(qe.boneTexture===null&&qe.computeBoneTexture(),pe.setValue(P,"boneTexture",qe.boneTexture,I))}N.isBatchedMesh&&(pe.setOptional(P,N,"batchingTexture"),pe.setValue(P,"batchingTexture",N._matricesTexture,I),pe.setOptional(P,N,"batchingIdTexture"),pe.setValue(P,"batchingIdTexture",N._indirectTexture,I),pe.setOptional(P,N,"batchingColorTexture"),N._colorsTexture!==null&&pe.setValue(P,"batchingColorTexture",N._colorsTexture,I));const cs=H.morphAttributes;if((cs.position!==void 0||cs.normal!==void 0||cs.color!==void 0)&&ut.update(N,H,ti),(Ds||Et.receiveShadow!==N.receiveShadow)&&(Et.receiveShadow=N.receiveShadow,pe.setValue(P,"receiveShadow",N.receiveShadow)),(O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial)&&O.envMap===null&&U.environment!==null&&(Qe.envMapIntensity.value=U.environmentIntensity),Qe.dfgLUT!==void 0&&(Qe.dfgLUT.value=oy()),Ds&&(pe.setValue(P,"toneMappingExposure",E.toneMappingExposure),Et.needsLights&&U_(Qe,ur),ot&&O.fog===!0&&Pt.refreshFogUniforms(Qe,ot),Pt.refreshMaterialUniforms(Qe,O,kt,ht,w.state.transmissionRenderTarget[M.id]),lc.upload(P,sf(Et),Qe,I)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(lc.upload(P,sf(Et),Qe,I),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&pe.setValue(P,"center",N.center),pe.setValue(P,"modelViewMatrix",N.modelViewMatrix),pe.setValue(P,"normalMatrix",N.normalMatrix),pe.setValue(P,"modelMatrix",N.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const qe=O.uniformsGroups;for(let ls=0,dr=qe.length;ls<dr;ls++){const af=qe[ls];mt.update(af,ti),mt.bind(af,ti)}}return ti}function U_(M,U){M.ambientLightColor.needsUpdate=U,M.lightProbe.needsUpdate=U,M.directionalLights.needsUpdate=U,M.directionalLightShadows.needsUpdate=U,M.pointLights.needsUpdate=U,M.pointLightShadows.needsUpdate=U,M.spotLights.needsUpdate=U,M.spotLightShadows.needsUpdate=U,M.rectAreaLights.needsUpdate=U,M.hemisphereLights.needsUpdate=U}function F_(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return k},this.getRenderTarget=function(){return z},this.setRenderTargetTextures=function(M,U,H){const O=_.get(M);O.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),_.get(M.texture).__webglTexture=U,_.get(M.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:H,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,U){const H=_.get(M);H.__webglFramebuffer=U,H.__useDefaultFramebuffer=U===void 0};const N_=P.createFramebuffer();this.setRenderTarget=function(M,U=0,H=0){z=M,R=U,k=H;let O=null,N=!1,ot=!1;if(M){const ct=_.get(M);if(ct.__useDefaultFramebuffer!==void 0){St.bindFramebuffer(P.FRAMEBUFFER,ct.__webglFramebuffer),V.copy(M.viewport),F.copy(M.scissor),Q=M.scissorTest,St.viewport(V),St.scissor(F),St.setScissorTest(Q),W=-1;return}else if(ct.__webglFramebuffer===void 0)I.setupRenderTarget(M);else if(ct.__hasExternalTextures)I.rebindTextures(M,_.get(M.texture).__webglTexture,_.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const zt=M.depthTexture;if(ct.__boundDepthTexture!==zt){if(zt!==null&&_.has(zt)&&(M.width!==zt.image.width||M.height!==zt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(M)}}const yt=M.texture;(yt.isData3DTexture||yt.isDataArrayTexture||yt.isCompressedArrayTexture)&&(ot=!0);const Tt=_.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Tt[U])?O=Tt[U][H]:O=Tt[U],N=!0):M.samples>0&&I.useMultisampledRTT(M)===!1?O=_.get(M).__webglMultisampledFramebuffer:Array.isArray(Tt)?O=Tt[H]:O=Tt,V.copy(M.viewport),F.copy(M.scissor),Q=M.scissorTest}else V.copy($).multiplyScalar(kt).floor(),F.copy(nt).multiplyScalar(kt).floor(),Q=rt;if(H!==0&&(O=N_),St.bindFramebuffer(P.FRAMEBUFFER,O)&&St.drawBuffers(M,O),St.viewport(V),St.scissor(F),St.setScissorTest(Q),N){const ct=_.get(M.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+U,ct.__webglTexture,H)}else if(ot){const ct=U;for(let yt=0;yt<M.textures.length;yt++){const Tt=_.get(M.textures[yt]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+yt,Tt.__webglTexture,H,ct)}}else if(M!==null&&H!==0){const ct=_.get(M.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ct.__webglTexture,H)}W=-1},this.readRenderTargetPixels=function(M,U,H,O,N,ot,ft,ct=0){if(!(M&&M.isWebGLRenderTarget)){te("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let yt=_.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ft!==void 0&&(yt=yt[ft]),yt){St.bindFramebuffer(P.FRAMEBUFFER,yt);try{const Tt=M.textures[ct],zt=Tt.format,Yt=Tt.type;if(M.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+ct),!ge.textureFormatReadable(zt)){te("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ge.textureTypeReadable(Yt)){te("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=M.width-O&&H>=0&&H<=M.height-N&&P.readPixels(U,H,O,N,st.convert(zt),st.convert(Yt),ot)}finally{const Tt=z!==null?_.get(z).__webglFramebuffer:null;St.bindFramebuffer(P.FRAMEBUFFER,Tt)}}},this.readRenderTargetPixelsAsync=async function(M,U,H,O,N,ot,ft,ct=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let yt=_.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ft!==void 0&&(yt=yt[ft]),yt)if(U>=0&&U<=M.width-O&&H>=0&&H<=M.height-N){St.bindFramebuffer(P.FRAMEBUFFER,yt);const Tt=M.textures[ct],zt=Tt.format,Yt=Tt.type;if(M.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+ct),!ge.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ge.textureTypeReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Ct=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Ct),P.bufferData(P.PIXEL_PACK_BUFFER,ot.byteLength,P.STREAM_READ),P.readPixels(U,H,O,N,st.convert(zt),st.convert(Yt),0);const le=z!==null?_.get(z).__webglFramebuffer:null;St.bindFramebuffer(P.FRAMEBUFFER,le);const Le=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await y1(P,Le,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Ct),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ot),P.deleteBuffer(Ct),P.deleteSync(Le),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,U=null,H=0){const O=Math.pow(2,-H),N=Math.floor(M.image.width*O),ot=Math.floor(M.image.height*O),ft=U!==null?U.x:0,ct=U!==null?U.y:0;I.setTexture2D(M,0),P.copyTexSubImage2D(P.TEXTURE_2D,H,0,0,ft,ct,N,ot),St.unbindTexture()};const O_=P.createFramebuffer(),B_=P.createFramebuffer();this.copyTextureToTexture=function(M,U,H=null,O=null,N=0,ot=0){let ft,ct,yt,Tt,zt,Yt,Ct,le,Le;const we=M.isCompressedTexture?M.mipmaps[ot]:M.image;if(H!==null)ft=H.max.x-H.min.x,ct=H.max.y-H.min.y,yt=H.isBox3?H.max.z-H.min.z:1,Tt=H.min.x,zt=H.min.y,Yt=H.isBox3?H.min.z:0;else{const Qe=Math.pow(2,-N);ft=Math.floor(we.width*Qe),ct=Math.floor(we.height*Qe),M.isDataArrayTexture?yt=we.depth:M.isData3DTexture?yt=Math.floor(we.depth*Qe):yt=1,Tt=0,zt=0,Yt=0}O!==null?(Ct=O.x,le=O.y,Le=O.z):(Ct=0,le=0,Le=0);const he=st.convert(U.format),nn=st.convert(U.type);let Et;U.isData3DTexture?(I.setTexture3D(U,0),Et=P.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(I.setTexture2DArray(U,0),Et=P.TEXTURE_2D_ARRAY):(I.setTexture2D(U,0),Et=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,U.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,U.unpackAlignment);const bn=P.getParameter(P.UNPACK_ROW_LENGTH),Qt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),ti=P.getParameter(P.UNPACK_SKIP_PIXELS),mi=P.getParameter(P.UNPACK_SKIP_ROWS),Ds=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,we.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,we.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Tt),P.pixelStorei(P.UNPACK_SKIP_ROWS,zt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Yt);const ur=M.isDataArrayTexture||M.isData3DTexture,pe=U.isDataArrayTexture||U.isData3DTexture;if(M.isDepthTexture){const Qe=_.get(M),cs=_.get(U),qe=_.get(Qe.__renderTarget),ls=_.get(cs.__renderTarget);St.bindFramebuffer(P.READ_FRAMEBUFFER,qe.__webglFramebuffer),St.bindFramebuffer(P.DRAW_FRAMEBUFFER,ls.__webglFramebuffer);for(let dr=0;dr<yt;dr++)ur&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,_.get(M).__webglTexture,N,Yt+dr),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,_.get(U).__webglTexture,ot,Le+dr)),P.blitFramebuffer(Tt,zt,ft,ct,Ct,le,ft,ct,P.DEPTH_BUFFER_BIT,P.NEAREST);St.bindFramebuffer(P.READ_FRAMEBUFFER,null),St.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(N!==0||M.isRenderTargetTexture||_.has(M)){const Qe=_.get(M),cs=_.get(U);St.bindFramebuffer(P.READ_FRAMEBUFFER,O_),St.bindFramebuffer(P.DRAW_FRAMEBUFFER,B_);for(let qe=0;qe<yt;qe++)ur?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Qe.__webglTexture,N,Yt+qe):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Qe.__webglTexture,N),pe?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,cs.__webglTexture,ot,Le+qe):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,cs.__webglTexture,ot),N!==0?P.blitFramebuffer(Tt,zt,ft,ct,Ct,le,ft,ct,P.COLOR_BUFFER_BIT,P.NEAREST):pe?P.copyTexSubImage3D(Et,ot,Ct,le,Le+qe,Tt,zt,ft,ct):P.copyTexSubImage2D(Et,ot,Ct,le,Tt,zt,ft,ct);St.bindFramebuffer(P.READ_FRAMEBUFFER,null),St.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else pe?M.isDataTexture||M.isData3DTexture?P.texSubImage3D(Et,ot,Ct,le,Le,ft,ct,yt,he,nn,we.data):U.isCompressedArrayTexture?P.compressedTexSubImage3D(Et,ot,Ct,le,Le,ft,ct,yt,he,we.data):P.texSubImage3D(Et,ot,Ct,le,Le,ft,ct,yt,he,nn,we):M.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,ot,Ct,le,ft,ct,he,nn,we.data):M.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,ot,Ct,le,we.width,we.height,he,we.data):P.texSubImage2D(P.TEXTURE_2D,ot,Ct,le,ft,ct,he,nn,we);P.pixelStorei(P.UNPACK_ROW_LENGTH,bn),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Qt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,ti),P.pixelStorei(P.UNPACK_SKIP_ROWS,mi),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Ds),ot===0&&U.generateMipmaps&&P.generateMipmap(Et),St.unbindTexture()},this.initRenderTarget=function(M){_.get(M).__webglFramebuffer===void 0&&I.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?I.setTextureCube(M,0):M.isData3DTexture?I.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?I.setTexture2DArray(M,0):I.setTexture2D(M,0),St.unbindTexture()},this.resetState=function(){R=0,k=0,z=null,St.reset(),et.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ai}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=Zt._getDrawingBufferColorSpace(t),n.unpackColorSpace=Zt._getUnpackColorSpace()}}const ly=/^[og]\s*(.+)?/,hy=/^mtllib /,uy=/^usemtl /,dy=/^usemap /,lp=/\s+/,hp=new D,ql=new D,up=new D,dp=new D,Hn=new D,Xo=new $t;function fy(){const e={objects:[],object:{},vertices:[],normals:[],colors:[],uvs:[],materials:{},materialLibraries:[],startObject:function(t,n){if(this.object&&this.object.fromDeclaration===!1){this.object.name=t,this.object.fromDeclaration=n!==!1;return}const i=this.object&&typeof this.object.currentMaterial=="function"?this.object.currentMaterial():void 0;if(this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0),this.object={name:t||"",fromDeclaration:n!==!1,geometry:{vertices:[],normals:[],colors:[],uvs:[],hasUVIndices:!1},materials:[],smooth:!0,startMaterial:function(s,r){const a=this._finalize(!1);a&&(a.inherited||a.groupCount<=0)&&this.materials.splice(a.index,1);const o={index:this.materials.length,name:s||"",mtllib:Array.isArray(r)&&r.length>0?r[r.length-1]:"",smooth:a!==void 0?a.smooth:this.smooth,groupStart:a!==void 0?a.groupEnd:0,groupEnd:-1,groupCount:-1,inherited:!1,clone:function(c){const l={index:typeof c=="number"?c:this.index,name:this.name,mtllib:this.mtllib,smooth:this.smooth,groupStart:0,groupEnd:-1,groupCount:-1,inherited:!1};return l.clone=this.clone.bind(l),l}};return this.materials.push(o),o},currentMaterial:function(){if(this.materials.length>0)return this.materials[this.materials.length-1]},_finalize:function(s){const r=this.currentMaterial();if(r&&r.groupEnd===-1&&(r.groupEnd=this.geometry.vertices.length/3,r.groupCount=r.groupEnd-r.groupStart,r.inherited=!1),s&&this.materials.length>1)for(let a=this.materials.length-1;a>=0;a--)this.materials[a].groupCount<=0&&this.materials.splice(a,1);return s&&this.materials.length===0&&this.materials.push({name:"",smooth:this.smooth}),r}},i&&i.name&&typeof i.clone=="function"){const s=i.clone(0);s.inherited=!0,this.object.materials.push(s)}this.objects.push(this.object)},finalize:function(){this.object&&typeof this.object._finalize=="function"&&this.object._finalize(!0)},parseVertexIndex:function(t,n){const i=parseInt(t,10);return(i>=0?i-1:i+n/3)*3},parseNormalIndex:function(t,n){const i=parseInt(t,10);return(i>=0?i-1:i+n/3)*3},parseUVIndex:function(t,n){const i=parseInt(t,10);return(i>=0?i-1:i+n/2)*2},addVertex:function(t,n,i){const s=this.vertices,r=this.object.geometry.vertices;r.push(s[t+0],s[t+1],s[t+2]),r.push(s[n+0],s[n+1],s[n+2]),r.push(s[i+0],s[i+1],s[i+2])},addVertexPoint:function(t){const n=this.vertices;this.object.geometry.vertices.push(n[t+0],n[t+1],n[t+2])},addVertexLine:function(t){const n=this.vertices;this.object.geometry.vertices.push(n[t+0],n[t+1],n[t+2])},addNormal:function(t,n,i){const s=this.normals,r=this.object.geometry.normals;r.push(s[t+0],s[t+1],s[t+2]),r.push(s[n+0],s[n+1],s[n+2]),r.push(s[i+0],s[i+1],s[i+2])},addFaceNormal:function(t,n,i){const s=this.vertices,r=this.object.geometry.normals;hp.fromArray(s,t),ql.fromArray(s,n),up.fromArray(s,i),Hn.subVectors(up,ql),dp.subVectors(hp,ql),Hn.cross(dp),Hn.normalize(),r.push(Hn.x,Hn.y,Hn.z),r.push(Hn.x,Hn.y,Hn.z),r.push(Hn.x,Hn.y,Hn.z)},addColor:function(t,n,i){const s=this.colors,r=this.object.geometry.colors;s[t]!==void 0&&r.push(s[t+0],s[t+1],s[t+2]),s[n]!==void 0&&r.push(s[n+0],s[n+1],s[n+2]),s[i]!==void 0&&r.push(s[i+0],s[i+1],s[i+2])},addUV:function(t,n,i){const s=this.uvs,r=this.object.geometry.uvs;r.push(s[t+0],s[t+1]),r.push(s[n+0],s[n+1]),r.push(s[i+0],s[i+1])},addDefaultUV:function(){const t=this.object.geometry.uvs;t.push(0,0),t.push(0,0),t.push(0,0)},addUVLine:function(t){const n=this.uvs;this.object.geometry.uvs.push(n[t+0],n[t+1])},addFace:function(t,n,i,s,r,a,o,c,l){const h=this.vertices.length;let d=this.parseVertexIndex(t,h),u=this.parseVertexIndex(n,h),f=this.parseVertexIndex(i,h);if(this.addVertex(d,u,f),this.addColor(d,u,f),o!==void 0&&o!==""){const g=this.normals.length;d=this.parseNormalIndex(o,g),u=this.parseNormalIndex(c,g),f=this.parseNormalIndex(l,g),this.addNormal(d,u,f)}else this.addFaceNormal(d,u,f);if(s!==void 0&&s!==""){const g=this.uvs.length;d=this.parseUVIndex(s,g),u=this.parseUVIndex(r,g),f=this.parseUVIndex(a,g),this.addUV(d,u,f),this.object.geometry.hasUVIndices=!0}else this.addDefaultUV()},addPointGeometry:function(t){this.object.geometry.type="Points";const n=this.vertices.length;for(let i=0,s=t.length;i<s;i++){const r=this.parseVertexIndex(t[i],n);this.addVertexPoint(r),this.addColor(r)}},addLineGeometry:function(t,n){this.object.geometry.type="Line";const i=this.vertices.length,s=this.uvs.length;for(let r=0,a=t.length;r<a;r++)this.addVertexLine(this.parseVertexIndex(t[r],i));for(let r=0,a=n.length;r<a;r++)this.addUVLine(this.parseUVIndex(n[r],s))}};return e.startObject("",!1),e}class py extends Xu{constructor(t){super(t),this.materials=null}load(t,n,i,s){const r=this,a=new dv(this.manager);a.setPath(this.path),a.setRequestHeader(this.requestHeader),a.setWithCredentials(this.withCredentials),a.load(t,function(o){try{n(r.parse(o))}catch(c){s?s(c):console.error(c),r.manager.itemError(t)}},i,s)}setMaterials(t){return this.materials=t,this}parse(t){const n=new fy;t.indexOf(`\r
`)!==-1&&(t=t.replace(/\r\n/g,`
`)),t.indexOf(`\\
`)!==-1&&(t=t.replace(/\\\n/g,""));const i=t.split(`
`);let s=[];for(let o=0,c=i.length;o<c;o++){const l=i[o].trimStart();if(l.length===0)continue;const h=l.charAt(0);if(h!=="#")if(h==="v"){const d=l.split(lp);switch(d[0]){case"v":n.vertices.push(parseFloat(d[1]),parseFloat(d[2]),parseFloat(d[3])),d.length>=7?(Xo.setRGB(parseFloat(d[4]),parseFloat(d[5]),parseFloat(d[6]),Ln),n.colors.push(Xo.r,Xo.g,Xo.b)):n.colors.push(void 0,void 0,void 0);break;case"vn":n.normals.push(parseFloat(d[1]),parseFloat(d[2]),parseFloat(d[3]));break;case"vt":n.uvs.push(parseFloat(d[1]),parseFloat(d[2]));break}}else if(h==="f"){const u=l.slice(1).trim().split(lp),f=[];for(let x=0,m=u.length;x<m;x++){const p=u[x];if(p.length>0){const y=p.split("/");f.push(y)}}const g=f[0];for(let x=1,m=f.length-1;x<m;x++){const p=f[x],y=f[x+1];n.addFace(g[0],p[0],y[0],g[1],p[1],y[1],g[2],p[2],y[2])}}else if(h==="l"){const d=l.substring(1).trim().split(" ");let u=[];const f=[];if(l.indexOf("/")===-1)u=d;else for(let g=0,x=d.length;g<x;g++){const m=d[g].split("/");m[0]!==""&&u.push(m[0]),m[1]!==""&&f.push(m[1])}n.addLineGeometry(u,f)}else if(h==="p"){const u=l.slice(1).trim().split(" ");n.addPointGeometry(u)}else if((s=ly.exec(l))!==null){const d=(" "+s[0].slice(1).trim()).slice(1);n.startObject(d)}else if(uy.test(l))n.object.startMaterial(l.substring(7).trim(),n.materialLibraries);else if(hy.test(l))n.materialLibraries.push(l.substring(7).trim());else if(dy.test(l))console.warn('THREE.OBJLoader: Rendering identifier "usemap" not supported. Textures must be defined in MTL files.');else if(h==="s"){if(s=l.split(" "),s.length>1){const u=s[1].trim().toLowerCase();n.object.smooth=u!=="0"&&u!=="off"}else n.object.smooth=!0;const d=n.object.currentMaterial();d&&(d.smooth=n.object.smooth)}else{if(l==="\0")continue;console.warn('THREE.OBJLoader: Unexpected line: "'+l+'"')}}n.finalize();const r=new $s;if(r.materialLibraries=[].concat(n.materialLibraries),!(n.objects.length===1&&n.objects[0].geometry.vertices.length===0)===!0)for(let o=0,c=n.objects.length;o<c;o++){const l=n.objects[o],h=l.geometry,d=l.materials,u=h.type==="Line",f=h.type==="Points";let g=!1;if(h.vertices.length===0)continue;const x=new He;x.setAttribute("position",new Ce(h.vertices,3)),h.normals.length>0&&x.setAttribute("normal",new Ce(h.normals,3)),h.colors.length>0&&(g=!0,x.setAttribute("color",new Ce(h.colors,3))),h.hasUVIndices===!0&&x.setAttribute("uv",new Ce(h.uvs,2));const m=[];for(let y=0,A=d.length;y<A;y++){const S=d[y],w=S.name+"_"+S.smooth+"_"+g;let T=n.materials[w];if(this.materials!==null){if(T=this.materials.create(S.name),u&&T&&!(T instanceof Fr)){const C=new Fr;is.prototype.copy.call(C,T),C.color.copy(T.color),T=C}else if(f&&T&&!(T instanceof Es)){const C=new Es({size:10,sizeAttenuation:!1});is.prototype.copy.call(C,T),C.color.copy(T.color),C.map=T.map,T=C}}T===void 0&&(u?T=new Fr:f?T=new Es({size:1,sizeAttenuation:!1}):T=new av,T.name=S.name,T.flatShading=!S.smooth,T.vertexColors=g,n.materials[w]=T),m.push(T)}let p;if(m.length>1){for(let y=0,A=d.length;y<A;y++){const S=d[y];x.addGroup(S.groupStart,S.groupCount,y)}u?p=new Ec(x,m):f?p=new Nr(x,m):p=new _n(x,m)}else u?p=new Ec(x,m[0]):f?p=new Nr(x,m[0]):p=new _n(x,m[0]);p.name=l.name,r.add(p)}else if(n.vertices.length>0){const o=new Es({size:1,sizeAttenuation:!1}),c=new He;c.setAttribute("position",new Ce(n.vertices,3)),n.colors.length>0&&n.colors[0]!==void 0&&(c.setAttribute("color",new Ce(n.colors,3)),o.vertexColors=!0);const l=new Nr(c,o);r.add(l)}return r}}const my="/handface/assets/brain-pNXWhVO6.obj";class gy{constructor(){Lt(this,"_listeners",new Map)}on(t,n){return this._listeners.has(t)||this._listeners.set(t,new Set),this._listeners.get(t).add(n),this}off(t,n){var i;return(i=this._listeners.get(t))==null||i.delete(n),this}emit(t,n){var i;(i=this._listeners.get(t))==null||i.forEach(s=>s(n))}removeAllListeners(t){return t?this._listeners.delete(t):this._listeners.clear(),this}}var Yr=typeof self<"u"?self:{};function m0(e,t){t:{for(var n=["CLOSURE_FLAGS"],i=Yr,s=0;s<n.length;s++)if((i=i[n[s]])==null){n=null;break t}n=i}return(e=n&&n[e])!=null?e:t}function zs(){throw Error("Invalid UTF8")}function fp(e,t){return t=String.fromCharCode.apply(null,t),e==null?t:e+t}let Yo,$l;const _y=typeof TextDecoder<"u";let vy;const xy=typeof TextEncoder<"u";function g0(e){if(xy)e=(vy||(vy=new TextEncoder)).encode(e);else{let n=0;const i=new Uint8Array(3*e.length);for(let s=0;s<e.length;s++){var t=e.charCodeAt(s);if(t<128)i[n++]=t;else{if(t<2048)i[n++]=t>>6|192;else{if(t>=55296&&t<=57343){if(t<=56319&&s<e.length){const r=e.charCodeAt(++s);if(r>=56320&&r<=57343){t=1024*(t-55296)+r-56320+65536,i[n++]=t>>18|240,i[n++]=t>>12&63|128,i[n++]=t>>6&63|128,i[n++]=63&t|128;continue}s--}t=65533}i[n++]=t>>12|224,i[n++]=t>>6&63|128}i[n++]=63&t|128}}e=n===i.length?i:i.subarray(0,n)}return e}function _0(e){Yr.setTimeout(()=>{throw e},0)}var su,My=m0(610401301,!1),pp=m0(748402147,!0);function mp(){var e=Yr.navigator;return e&&(e=e.userAgent)?e:""}const gp=Yr.navigator;function Oc(e){return Oc[" "](e),e}su=gp&&gp.userAgentData||null,Oc[" "]=function(){};const v0={};let ka=null;function yy(e){const t=e.length;let n=3*t/4;n%3?n=Math.floor(n):"=.".indexOf(e[t-1])!=-1&&(n="=.".indexOf(e[t-2])!=-1?n-2:n-1);const i=new Uint8Array(n);let s=0;return function(r,a){function o(l){for(;c<r.length;){const h=r.charAt(c++),d=ka[h];if(d!=null)return d;if(!/^[\s\xa0]*$/.test(h))throw Error("Unknown base64 encoding at char: "+h)}return l}x0();let c=0;for(;;){const l=o(-1),h=o(0),d=o(64),u=o(64);if(u===64&&l===-1)break;a(l<<2|h>>4),d!=64&&(a(h<<4&240|d>>2),u!=64&&a(d<<6&192|u))}}(e,function(r){i[s++]=r}),s!==n?i.subarray(0,s):i}function x0(){if(!ka){ka={};var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),t=["+/=","+/","-_=","-_.","-_"];for(let n=0;n<5;n++){const i=e.concat(t[n].split(""));v0[n]=i;for(let s=0;s<i.length;s++){const r=i[s];ka[r]===void 0&&(ka[r]=s)}}}}var Sy=typeof Uint8Array<"u",M0=!(!(My&&su&&su.brands.length>0)&&(mp().indexOf("Trident")!=-1||mp().indexOf("MSIE")!=-1))&&typeof btoa=="function";const _p=/[-_.]/g,Ey={"-":"+",_:"/",".":"="};function by(e){return Ey[e]||""}function y0(e){if(!M0)return yy(e);e=_p.test(e)?e.replace(_p,by):e,e=atob(e);const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}function Yu(e){return Sy&&e!=null&&e instanceof Uint8Array}var qr={};function rr(){return Ay||(Ay=new Pi(null,qr))}function qu(e){S0(qr);var t=e.g;return(t=t==null||Yu(t)?t:typeof t=="string"?y0(t):null)==null?t:e.g=t}var Pi=class{h(){return new Uint8Array(qu(this)||0)}constructor(e,t){if(S0(t),this.g=e,e!=null&&e.length===0)throw Error("ByteString should be constructed with non-empty values")}};let Ay,Ty;function S0(e){if(e!==qr)throw Error("illegal external caller")}function E0(e,t){e.__closure__error__context__984382||(e.__closure__error__context__984382={}),e.__closure__error__context__984382.severity=t}function ru(e){return E0(e=Error(e),"warning"),e}function $r(e,t){if(e!=null){var n=Ty??(Ty={}),i=n[e]||0;i>=t||(n[e]=i+1,E0(e=Error(),"incident"),_0(e))}}function da(){return typeof BigInt=="function"}var fa=typeof Symbol=="function"&&typeof Symbol()=="symbol";function Ni(e,t,n=!1){return typeof Symbol=="function"&&typeof Symbol()=="symbol"?n&&Symbol.for&&e?Symbol.for(e):e!=null?Symbol(e):Symbol():t}var wy=Ni("jas",void 0,!0),vp=Ni(void 0,"0di"),Da=Ni(void 0,"1oa"),Un=Ni(void 0,Symbol()),Cy=Ni(void 0,"0ub"),Ry=Ni(void 0,"0ubs"),au=Ni(void 0,"0ubsb"),Py=Ni(void 0,"0actk"),jr=Ni("m_m","Pa",!0),xp=Ni();const b0={Ga:{value:0,configurable:!0,writable:!0,enumerable:!1}},A0=Object.defineProperties,bt=fa?wy:"Ga";var cr;const Mp=[];function ao(e,t){fa||bt in e||A0(e,b0),e[bt]|=t}function Xe(e,t){fa||bt in e||A0(e,b0),e[bt]=t}function oo(e){return ao(e,34),e}function $a(e){return ao(e,8192),e}Xe(Mp,7),cr=Object.freeze(Mp);var Kr={};function Nn(e,t){return t===void 0?e.h!==ar&&!!(2&(0|e.v[bt])):!!(2&t)&&e.h!==ar}const ar={};function $u(e,t){if(e!=null){if(typeof e=="string")e=e?new Pi(e,qr):rr();else if(e.constructor!==Pi)if(Yu(e))e=e.length?new Pi(new Uint8Array(e),qr):rr();else{if(!t)throw Error();e=void 0}}return e}class yp{constructor(t,n,i){this.g=t,this.h=n,this.l=i}next(){const t=this.g.next();return t.done||(t.value=this.h.call(this.l,t.value)),t}[Symbol.iterator](){return this}}var Ly=Object.freeze({});function T0(e,t,n){const i=128&t?0:-1,s=e.length;var r;(r=!!s)&&(r=(r=e[s-1])!=null&&typeof r=="object"&&r.constructor===Object);const a=s+(r?-1:0);for(t=128&t?1:0;t<a;t++)n(t-i,e[t]);if(r){e=e[s-1];for(const o in e)!isNaN(o)&&n(+o,e[o])}}var w0={};function pa(e){return 128&e?w0:void 0}function Bc(e){return e.Na=!0,e}var Iy=Bc(e=>typeof e=="number"),Sp=Bc(e=>typeof e=="string"),Dy=Bc(e=>typeof e=="boolean"),kc=typeof Yr.BigInt=="function"&&typeof Yr.BigInt(0)=="bigint";function Fn(e){var t=e;if(Sp(t)){if(!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(t))throw Error(String(t))}else if(Iy(t)&&!Number.isSafeInteger(t))throw Error(String(t));return kc?BigInt(e):e=Dy(e)?e?"1":"0":Sp(e)?e.trim()||"0":String(e)}var ou=Bc(e=>kc?e>=Fy&&e<=Oy:e[0]==="-"?Ep(e,Uy):Ep(e,Ny));const Uy=Number.MIN_SAFE_INTEGER.toString(),Fy=kc?BigInt(Number.MIN_SAFE_INTEGER):void 0,Ny=Number.MAX_SAFE_INTEGER.toString(),Oy=kc?BigInt(Number.MAX_SAFE_INTEGER):void 0;function Ep(e,t){if(e.length>t.length)return!1;if(e.length<t.length||e===t)return!0;for(let n=0;n<e.length;n++){const i=e[n],s=t[n];if(i>s)return!1;if(i<s)return!0}}const By=typeof Uint8Array.prototype.slice=="function";let ky,Se=0,Ne=0;function bp(e){const t=e>>>0;Se=t,Ne=(e-t)/4294967296>>>0}function Zr(e){if(e<0){bp(-e);const[t,n]=Zu(Se,Ne);Se=t>>>0,Ne=n>>>0}else bp(e)}function ju(e){const t=ky||(ky=new DataView(new ArrayBuffer(8)));t.setFloat32(0,+e,!0),Ne=0,Se=t.getUint32(0,!0)}function C0(e,t){const n=4294967296*t+(e>>>0);return Number.isSafeInteger(n)?n:ja(e,t)}function zy(e,t){return Fn(da()?BigInt.asUintN(64,(BigInt(t>>>0)<<BigInt(32))+BigInt(e>>>0)):ja(e,t))}function R0(e,t){return da()?Fn(BigInt.asIntN(64,(BigInt.asUintN(32,BigInt(t))<<BigInt(32))+BigInt.asUintN(32,BigInt(e)))):Fn(Ku(e,t))}function ja(e,t){if(e>>>=0,(t>>>=0)<=2097151)var n=""+(4294967296*t+e);else da()?n=""+(BigInt(t)<<BigInt(32)|BigInt(e)):(e=(16777215&e)+6777216*(n=16777215&(e>>>24|t<<8))+6710656*(t=t>>16&65535),n+=8147497*t,t*=2,e>=1e7&&(n+=e/1e7>>>0,e%=1e7),n>=1e7&&(t+=n/1e7>>>0,n%=1e7),n=t+Ap(n)+Ap(e));return n}function Ap(e){return e=String(e),"0000000".slice(e.length)+e}function Ku(e,t){if(2147483648&t)if(da())e=""+(BigInt(0|t)<<BigInt(32)|BigInt(e>>>0));else{const[n,i]=Zu(e,t);e="-"+ja(n,i)}else e=ja(e,t);return e}function zc(e){if(e.length<16)Zr(Number(e));else if(da())e=BigInt(e),Se=Number(e&BigInt(4294967295))>>>0,Ne=Number(e>>BigInt(32)&BigInt(4294967295));else{const t=+(e[0]==="-");Ne=Se=0;const n=e.length;for(let i=t,s=(n-t)%6+t;s<=n;i=s,s+=6){const r=Number(e.slice(i,s));Ne*=1e6,Se=1e6*Se+r,Se>=4294967296&&(Ne+=Math.trunc(Se/4294967296),Ne>>>=0,Se>>>=0)}if(t){const[i,s]=Zu(Se,Ne);Se=i,Ne=s}}}function Zu(e,t){return t=~t,e?e=1+~e:t+=1,[e,t]}function hi(e){return Array.prototype.slice.call(e)}const co=typeof BigInt=="function"?BigInt.asIntN:void 0,Vy=typeof BigInt=="function"?BigInt.asUintN:void 0,or=Number.isSafeInteger,Vc=Number.isFinite,Jr=Math.trunc,Hy=Fn(0);function za(e){if(e!=null&&typeof e!="number")throw Error(`Value of float/double field must be a number, found ${typeof e}: ${e}`);return e}function Ti(e){return e==null||typeof e=="number"?e:e==="NaN"||e==="Infinity"||e==="-Infinity"?Number(e):void 0}function Ka(e){if(e!=null&&typeof e!="boolean"){var t=typeof e;throw Error(`Expected boolean but got ${t!="object"?t:e?Array.isArray(e)?"array":t:"null"}: ${e}`)}return e}function P0(e){return e==null||typeof e=="boolean"?e:typeof e=="number"?!!e:void 0}const Gy=/^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;function lo(e){switch(typeof e){case"bigint":return!0;case"number":return Vc(e);case"string":return Gy.test(e);default:return!1}}function ma(e){if(e==null)return e;if(typeof e=="string"&&e)e=+e;else if(typeof e!="number")return;return Vc(e)?0|e:void 0}function L0(e){if(e==null)return e;if(typeof e=="string"&&e)e=+e;else if(typeof e!="number")return;return Vc(e)?e>>>0:void 0}function I0(e){const t=e.length;return(e[0]==="-"?t<20||t===20&&e<="-9223372036854775808":t<19||t===19&&e<="9223372036854775807")?e:(zc(e),Ku(Se,Ne))}function Ju(e){if(e=Jr(e),!or(e)){Zr(e);var t=Se,n=Ne;(e=2147483648&n)&&(n=~n>>>0,(t=1+~t>>>0)==0&&(n=n+1>>>0)),e=typeof(t=C0(t,n))=="number"?e?-t:t:e?"-"+t:t}return e}function D0(e){var t=Jr(Number(e));return or(t)?String(t):((t=e.indexOf("."))!==-1&&(e=e.substring(0,t)),I0(e))}function U0(e){var t=Jr(Number(e));return or(t)?Fn(t):((t=e.indexOf("."))!==-1&&(e=e.substring(0,t)),da()?Fn(co(64,BigInt(e))):Fn(I0(e)))}function F0(e){return or(e)?e=Fn(Ju(e)):(e=Jr(e),or(e)?e=String(e):(Zr(e),e=Ku(Se,Ne)),e=Fn(e)),e}function bc(e){const t=typeof e;return e==null?e:t==="bigint"?Fn(co(64,e)):lo(e)?t==="string"?U0(e):F0(e):void 0}function N0(e){if(typeof e!="string")throw Error();return e}function ho(e){if(e!=null&&typeof e!="string")throw Error();return e}function en(e){return e==null||typeof e=="string"?e:void 0}function Qu(e,t,n,i){return e!=null&&e[jr]===Kr?e:Array.isArray(e)?((i=(n=0|e[bt])|32&i|2&i)!==n&&Xe(e,i),new t(e)):(n?2&i?((e=t[vp])||(oo((e=new t).v),e=t[vp]=e),t=e):t=new t:t=void 0,t)}function Wy(e,t,n){if(t)t:{if(!lo(t=e))throw ru("int64");switch(typeof t){case"string":t=U0(t);break t;case"bigint":t=Fn(co(64,t));break t;default:t=F0(t)}}else t=bc(e);return(e=t)==null?n?Hy:void 0:e}const Xy={};let Yy=function(){try{return Oc(new class extends Map{constructor(){super()}}),!1}catch{return!0}}();class jl{constructor(){this.g=new Map}get(t){return this.g.get(t)}set(t,n){return this.g.set(t,n),this.size=this.g.size,this}delete(t){return t=this.g.delete(t),this.size=this.g.size,t}clear(){this.g.clear(),this.size=this.g.size}has(t){return this.g.has(t)}entries(){return this.g.entries()}keys(){return this.g.keys()}values(){return this.g.values()}forEach(t,n){return this.g.forEach(t,n)}[Symbol.iterator](){return this.entries()}}const qy=Yy?(Object.setPrototypeOf(jl.prototype,Map.prototype),Object.defineProperties(jl.prototype,{size:{value:0,configurable:!0,enumerable:!0,writable:!0}}),jl):class extends Map{constructor(){super()}};function Tp(e){return e}function Kl(e){if(2&e.J)throw Error("Cannot mutate an immutable Map")}var ss=class extends qy{constructor(e,t,n=Tp,i=Tp){super(),this.J=0|e[bt],this.K=t,this.S=n,this.fa=this.K?$y:i;for(let s=0;s<e.length;s++){const r=e[s],a=n(r[0],!1,!0);let o=r[1];t?o===void 0&&(o=null):o=i(r[1],!1,!0,void 0,void 0,this.J),super.set(a,o)}}V(e){return $a(Array.from(super.entries(),e))}clear(){Kl(this),super.clear()}delete(e){return Kl(this),super.delete(this.S(e,!0,!1))}entries(){if(this.K){var e=super.keys();e=new yp(e,jy,this)}else e=super.entries();return e}values(){if(this.K){var e=super.keys();e=new yp(e,ss.prototype.get,this)}else e=super.values();return e}forEach(e,t){this.K?super.forEach((n,i,s)=>{e.call(t,s.get(i),i,s)}):super.forEach(e,t)}set(e,t){return Kl(this),(e=this.S(e,!0,!1))==null?this:t==null?(super.delete(e),this):super.set(e,this.fa(t,!0,!0,this.K,!1,this.J))}Ma(e){const t=this.S(e[0],!1,!0);e=e[1],e=this.K?e===void 0?null:e:this.fa(e,!1,!0,void 0,!1,this.J),super.set(t,e)}has(e){return super.has(this.S(e,!1,!1))}get(e){e=this.S(e,!1,!1);const t=super.get(e);if(t!==void 0){var n=this.K;return n?((n=this.fa(t,!1,!0,n,this.ra,this.J))!==t&&super.set(e,n),n):t}}[Symbol.iterator](){return this.entries()}};function $y(e,t,n,i,s,r){return e=Qu(e,i,n,r),s&&(e=ed(e)),e}function jy(e){return[e,this.get(e)]}let Ky;function wp(){return Ky||(Ky=new ss(oo([]),void 0,void 0,void 0,Xy))}function Hc(e){return Un?e[Un]:void 0}function Ac(e,t){for(const n in e)!isNaN(n)&&t(e,+n,e[n])}ss.prototype.toJSON=void 0;var cu=class{};const Zy={Ka:!0};function Jy(e,t){t<100||$r(Ry,1)}function Gc(e,t,n,i){const s=i!==void 0;i=!!i;var r,a=Un;!s&&fa&&a&&(r=e[a])&&Ac(r,Jy),a=[];var o=e.length;let c;r=4294967295;let l=!1;const h=!!(64&t),d=h?128&t?0:-1:void 0;1&t||(c=o&&e[o-1],c!=null&&typeof c=="object"&&c.constructor===Object?r=--o:c=void 0,!h||128&t||s||(l=!0,r=r-d+d)),t=void 0;for(var u=0;u<o;u++){let f=e[u];if(f!=null&&(f=n(f,i))!=null)if(h&&u>=r){const g=u-d;(t??(t={}))[g]=f}else a[u]=f}if(c)for(let f in c){if((o=c[f])==null||(o=n(o,i))==null)continue;let g;u=+f,h&&!Number.isNaN(u)&&(g=u+d)<r?a[g]=o:(t??(t={}))[f]=o}return t&&(l?a.push(t):a[r]=t),s&&Un&&(e=Hc(e))&&e instanceof cu&&(a[Un]=function(f){const g=new cu;return Ac(f,(x,m,p)=>{g[m]=hi(p)}),g.da=f.da,g}(e)),a}function Qy(e){return e[0]=Za(e[0]),e[1]=Za(e[1]),e}function Za(e){switch(typeof e){case"number":return Number.isFinite(e)?e:""+e;case"bigint":return ou(e)?Number(e):""+e;case"boolean":return e?1:0;case"object":if(Array.isArray(e)){var t=0|e[bt];return e.length===0&&1&t?void 0:Gc(e,t,Za)}if(e!=null&&e[jr]===Kr)return O0(e);if(e instanceof Pi){if((t=e.g)==null)e="";else if(typeof t=="string")e=t;else{if(M0){for(var n="",i=0,s=t.length-10240;i<s;)n+=String.fromCharCode.apply(null,t.subarray(i,i+=10240));n+=String.fromCharCode.apply(null,i?t.subarray(i):t),t=btoa(n)}else{n===void 0&&(n=0),x0(),n=v0[n],i=Array(Math.floor(t.length/3)),s=n[64]||"";let l=0,h=0;for(;l<t.length-2;l+=3){var r=t[l],a=t[l+1],o=t[l+2],c=n[r>>2];r=n[(3&r)<<4|a>>4],a=n[(15&a)<<2|o>>6],o=n[63&o],i[h++]=c+r+a+o}switch(c=0,o=s,t.length-l){case 2:o=n[(15&(c=t[l+1]))<<2]||s;case 1:t=t[l],i[h]=n[t>>2]+n[(3&t)<<4|c>>4]+o+s}t=i.join("")}e=e.g=t}return e}return e instanceof ss?e=e.size!==0?e.V(Qy):void 0:void 0}return e}let tS,eS;function O0(e){return Gc(e=e.v,0|e[bt],Za)}function Zs(e,t){return B0(e,t[0],t[1])}function B0(e,t,n,i=0){if(e==null){var s=32;n?(e=[n],s|=128):e=[],t&&(s=-16760833&s|(1023&t)<<14)}else{if(!Array.isArray(e))throw Error("narr");if(s=0|e[bt],pp&&1&s)throw Error("rfarr");if(2048&s&&!(2&s)&&function(){if(pp)throw Error("carr");$r(Py,5)}(),256&s)throw Error("farr");if(64&s)return(s|i)!==s&&Xe(e,s|i),e;if(n&&(s|=128,n!==e[0]))throw Error("mid");t:{s|=64;var r=(n=e).length;if(r){var a=r-1;const c=n[a];if(c!=null&&typeof c=="object"&&c.constructor===Object){if((a-=t=128&s?0:-1)>=1024)throw Error("pvtlmt");for(var o in c)(r=+o)<a&&(n[r+t]=c[o],delete c[o]);s=-16760833&s|(1023&a)<<14;break t}}if(t){if((o=Math.max(t,r-(128&s?0:-1)))>1024)throw Error("spvt");s=-16760833&s|(1023&o)<<14}}}return Xe(e,64|s|i),e}function nS(e,t){if(typeof e!="object")return e;if(Array.isArray(e)){var n=0|e[bt];return e.length===0&&1&n?void 0:Cp(e,n,t)}if(e!=null&&e[jr]===Kr)return Rp(e);if(e instanceof ss){if(2&(t=e.J))return e;if(!e.size)return;if(n=oo(e.V()),e.K)for(e=0;e<n.length;e++){const i=n[e];let s=i[1];s=s==null||typeof s!="object"?void 0:s!=null&&s[jr]===Kr?Rp(s):Array.isArray(s)?Cp(s,0|s[bt],!!(32&t)):void 0,i[1]=s}return n}return e instanceof Pi?e:void 0}function Cp(e,t,n){return 2&t||(!n||4096&t||16&t?e=ga(e,t,!1,n&&!(16&t)):(ao(e,34),4&t&&Object.freeze(e))),e}function td(e,t,n){return e=new e.constructor(t),n&&(e.h=ar),e.m=ar,e}function Rp(e){const t=e.v,n=0|t[bt];return Nn(e,n)?e:nd(e,t,n)?td(e,t):ga(t,n)}function ga(e,t,n,i){return i??(i=!!(34&t)),e=Gc(e,t,nS,i),i=32,n&&(i|=2),Xe(e,t=16769217&t|i),e}function ed(e){const t=e.v,n=0|t[bt];return Nn(e,n)?nd(e,t,n)?td(e,t,!0):new e.constructor(ga(t,n,!1)):e}function _a(e){if(e.h!==ar)return!1;var t=e.v;return ao(t=ga(t,0|t[bt]),2048),e.v=t,e.h=void 0,e.m=void 0,!0}function va(e){if(!_a(e)&&Nn(e,0|e.v[bt]))throw Error()}function lr(e,t){t===void 0&&(t=0|e[bt]),32&t&&!(4096&t)&&Xe(e,4096|t)}function nd(e,t,n){return!!(2&n)||!(!(32&n)||4096&n)&&(Xe(t,2|n),e.h=ar,!0)}const k0=Fn(0),gs={};function Ee(e,t,n,i,s){if((t=rs(e.v,t,n,s))!==null||i&&e.m!==ar)return t}function rs(e,t,n,i){if(t===-1)return null;const s=t+(n?0:-1),r=e.length-1;let a,o;if(!(r<1+(n?0:-1))){if(s>=r)if(a=e[r],a!=null&&typeof a=="object"&&a.constructor===Object)n=a[t],o=!0;else{if(s!==r)return;n=a}else n=e[s];if(i&&n!=null){if((i=i(n))==null)return i;if(!Object.is(i,n))return o?a[t]=i:e[s]=i,i}return n}}function ue(e,t,n,i){va(e),ze(e=e.v,0|e[bt],t,n,i)}function ze(e,t,n,i,s){const r=n+(s?0:-1);var a=e.length-1;if(a>=1+(s?0:-1)&&r>=a){const o=e[a];if(o!=null&&typeof o=="object"&&o.constructor===Object)return o[n]=i,t}return r<=a?(e[r]=i,t):(i!==void 0&&(n>=(a=(t??(t=0|e[bt]))>>14&1023||536870912)?i!=null&&(e[a+(s?0:-1)]={[n]:i}):e[r]=i),t)}function js(){return Ly===void 0?2:4}function Ks(e,t,n,i,s){let r=e.v,a=0|r[bt];i=Nn(e,a)?1:i,s=!!s||i===3,i===2&&_a(e)&&(r=e.v,a=0|r[bt]);let o=(e=id(r,t))===cr?7:0|e[bt],c=sd(o,a);var l=!(4&c);if(l){4&c&&(e=hi(e),o=0,c=Qs(c,a),a=ze(r,a,t,e));let h=0,d=0;for(;h<e.length;h++){const u=n(e[h]);u!=null&&(e[d++]=u)}d<h&&(e.length=d),n=-513&(4|c),c=n&=-1025,c&=-4097}return c!==o&&(Xe(e,c),2&c&&Object.freeze(e)),z0(e,c,r,a,t,i,l,s)}function z0(e,t,n,i,s,r,a,o){let c=t;return r===1||r===4&&(2&t||!(16&t)&&32&i)?Js(t)||((t|=!e.length||a&&!(4096&t)||32&i&&!(4096&t||16&t)?2:256)!==c&&Xe(e,t),Object.freeze(e)):(r===2&&Js(t)&&(e=hi(e),c=0,t=Qs(t,i),i=ze(n,i,s,e)),Js(t)||(o||(t|=16),t!==c&&Xe(e,t))),2&t||!(4096&t||16&t)||lr(n,i),e}function id(e,t,n){return e=rs(e,t,n),Array.isArray(e)?e:cr}function sd(e,t){return 2&t&&(e|=2),1|e}function Js(e){return!!(2&e)&&!!(4&e)||!!(256&e)}function V0(e){return $u(e,!0)}function H0(e){e=hi(e);for(let t=0;t<e.length;t++){const n=e[t]=hi(e[t]);Array.isArray(n[1])&&(n[1]=oo(n[1]))}return $a(e)}function xs(e,t,n,i){va(e),ze(e=e.v,0|e[bt],t,(i==="0"?Number(n)===0:n===i)?void 0:n)}function xa(e,t,n){if(2&t)throw Error();const i=pa(t);let s=id(e,n,i),r=s===cr?7:0|s[bt],a=sd(r,t);return(2&a||Js(a)||16&a)&&(a===r||Js(a)||Xe(s,a),s=hi(s),r=0,a=Qs(a,t),ze(e,t,n,s,i)),a&=-13,a!==r&&Xe(s,a),s}function Zl(e,t){var n=Dg;return ad(rd(e=e.v),e,void 0,n)===t?t:-1}function rd(e){if(fa)return e[Da]??(e[Da]=new Map);if(Da in e)return e[Da];const t=new Map;return Object.defineProperty(e,Da,{value:t}),t}function G0(e,t,n,i,s){const r=rd(e),a=ad(r,e,t,n,s);return a!==i&&(a&&(t=ze(e,t,a,void 0,s)),r.set(n,i)),t}function ad(e,t,n,i,s){let r=e.get(i);if(r!=null)return r;r=0;for(let a=0;a<i.length;a++){const o=i[a];rs(t,o,s)!=null&&(r!==0&&(n=ze(t,n,r,void 0,s)),r=o)}return e.set(i,r),r}function od(e,t,n){let i=0|e[bt];const s=pa(i),r=rs(e,n,s);let a;if(r!=null&&r[jr]===Kr){if(!Nn(r))return _a(r),r.v;a=r.v}else Array.isArray(r)&&(a=r);if(a){const o=0|a[bt];2&o&&(a=ga(a,o))}return a=Zs(a,t),a!==r&&ze(e,i,n,a,s),a}function W0(e,t,n,i,s){let r=!1;if((i=rs(e,i,s,a=>{const o=Qu(a,n,!1,t);return r=o!==a&&o!=null,o}))!=null)return r&&!Nn(i)&&lr(e,t),i}function ee(e,t,n,i){let s=e.v,r=0|s[bt];if((t=W0(s,r,t,n,i))==null)return t;if(r=0|s[bt],!Nn(e,r)){const a=ed(t);a!==t&&(_a(e)&&(s=e.v,r=0|s[bt]),r=ze(s,r,n,t=a,i),lr(s,r))}return t}function X0(e,t,n,i,s,r,a,o){var c=Nn(e,n);r=c?1:r,a=!!a||r===3,c=o&&!c,(r===2||c)&&_a(e)&&(n=0|(t=e.v)[bt]);var l=(e=id(t,s))===cr?7:0|e[bt],h=sd(l,n);if(o=!(4&h)){var d=e,u=n;const f=!!(2&h);f&&(u|=2);let g=!f,x=!0,m=0,p=0;for(;m<d.length;m++){const y=Qu(d[m],i,!1,u);if(y instanceof i){if(!f){const A=Nn(y);g&&(g=!A),x&&(x=A)}d[p++]=y}}p<m&&(d.length=p),h|=4,h=x?-4097&h:4096|h,h=g?8|h:-9&h}if(h!==l&&(Xe(e,h),2&h&&Object.freeze(e)),c&&!(8&h||!e.length&&(r===1||r===4&&(2&h||!(16&h)&&32&n)))){for(Js(h)&&(e=hi(e),h=Qs(h,n),n=ze(t,n,s,e)),i=e,c=h,l=0;l<i.length;l++)(d=i[l])!==(h=ed(d))&&(i[l]=h);c|=8,Xe(e,h=c=i.length?4096|c:-4097&c)}return z0(e,h,t,n,s,r,o,a)}function as(e,t,n){const i=e.v;return X0(e,i,0|i[bt],t,n,js(),!1,!0)}function Y0(e){return e==null&&(e=void 0),e}function It(e,t,n,i,s){return ue(e,n,i=Y0(i),s),i&&!Nn(i)&&lr(e.v),e}function Va(e,t,n,i){t:{var s=i=Y0(i);va(e);const r=e.v;let a=0|r[bt];if(s==null){const o=rd(r);if(ad(o,r,a,n)!==t)break t;o.set(n,0)}else a=G0(r,a,n,t);ze(r,a,t,s)}i&&!Nn(i)&&lr(e.v)}function Qs(e,t){return-273&(2&t?2|e:-3&e)}function cd(e,t,n,i){var s=i;va(e),e=X0(e,i=e.v,0|i[bt],n,t,2,!0),s=s??new n,e.push(s),t=n=e===cr?7:0|e[bt],(s=Nn(s))?(n&=-9,e.length===1&&(n&=-4097)):n|=4096,n!==t&&Xe(e,n),s||lr(i)}function Zn(e,t,n){return ma(Ee(e,t,void 0,n))}function Ie(e,t){return Ee(e,t,void 0,void 0,Ti)??0}function os(e,t,n){if(n!=null){if(typeof n!="number"||!Vc(n))throw ru("int32");n|=0}ue(e,t,n)}function Rt(e,t,n){ue(e,t,za(n))}function On(e,t,n){xs(e,t,ho(n),"")}function Tc(e,t,n){{va(e);const a=e.v;let o=0|a[bt];if(n==null)ze(a,o,t);else{var i=e=n===cr?7:0|n[bt],s=Js(e),r=s||Object.isFrozen(n);for(s||(e=0),r||(n=hi(n),i=0,e=Qs(e,o),r=!1),e|=5,e|=(4&e?512&e?512:1024&e?1024:0:void 0)??1024,s=0;s<n.length;s++){const c=n[s],l=N0(c);Object.is(c,l)||(r&&(n=hi(n),i=0,e=Qs(e,o),r=!1),n[s]=l)}e!==i&&(r&&(n=hi(n),e=Qs(e,o)),Xe(n,e)),ze(a,o,t,n)}}}function Wc(e,t,n){va(e),Ks(e,t,en,2,!0).push(N0(n))}var wr=class{constructor(e,t,n){if(this.buffer=e,n&&!t)throw Error();this.g=t}};function ld(e,t){if(typeof e=="string")return new wr(y0(e),t);if(Array.isArray(e))return new wr(new Uint8Array(e),t);if(e.constructor===Uint8Array)return new wr(e,!1);if(e.constructor===ArrayBuffer)return e=new Uint8Array(e),new wr(e,!1);if(e.constructor===Pi)return t=qu(e)||new Uint8Array(0),new wr(t,!0,e);if(e instanceof Uint8Array)return e=e.constructor===Uint8Array?e:new Uint8Array(e.buffer,e.byteOffset,e.byteLength),new wr(e,!1);throw Error()}function hd(e,t){let n,i=0,s=0,r=0;const a=e.h;let o=e.g;do n=a[o++],i|=(127&n)<<r,r+=7;while(r<32&&128&n);if(r>32)for(s|=(127&n)>>4,r=3;r<32&&128&n;r+=7)n=a[o++],s|=(127&n)<<r;if(tr(e,o),!(128&n))return t(i>>>0,s>>>0);throw Error()}function ud(e){let t=0,n=e.g;const i=n+10,s=e.h;for(;n<i;){const r=s[n++];if(t|=r,(128&r)==0)return tr(e,n),!!(127&t)}throw Error()}function Cs(e){const t=e.h;let n=e.g,i=t[n++],s=127&i;if(128&i&&(i=t[n++],s|=(127&i)<<7,128&i&&(i=t[n++],s|=(127&i)<<14,128&i&&(i=t[n++],s|=(127&i)<<21,128&i&&(i=t[n++],s|=i<<28,128&i&&128&t[n++]&&128&t[n++]&&128&t[n++]&&128&t[n++]&&128&t[n++])))))throw Error();return tr(e,n),s}function Fi(e){return Cs(e)>>>0}function wc(e){var t=e.h;const n=e.g;var i=t[n],s=t[n+1];const r=t[n+2];return t=t[n+3],tr(e,e.g+4),e=2*((s=(i<<0|s<<8|r<<16|t<<24)>>>0)>>31)+1,i=s>>>23&255,s&=8388607,i==255?s?NaN:e*(1/0):i==0?1401298464324817e-60*e*s:e*Math.pow(2,i-150)*(s+8388608)}function iS(e){return Cs(e)}function tr(e,t){if(e.g=t,t>e.l)throw Error()}function q0(e,t){if(t<0)throw Error();const n=e.g;if((t=n+t)>e.l)throw Error();return e.g=t,n}function $0(e,t){if(t==0)return rr();var n=q0(e,t);return e.Y&&e.j?n=e.h.subarray(n,n+t):(e=e.h,n=n===(t=n+t)?new Uint8Array(0):By?e.slice(n,t):new Uint8Array(e.subarray(n,t))),n.length==0?rr():new Pi(n,qr)}var Pp=[];function j0(e,t,n,i){if(Cc.length){const s=Cc.pop();return s.o(i),s.g.init(e,t,n,i),s}return new sS(e,t,n,i)}function K0(e){e.g.clear(),e.l=-1,e.h=-1,Cc.length<100&&Cc.push(e)}function Z0(e){var t=e.g;if(t.g==t.l)return!1;e.m=e.g.g;var n=Fi(e.g);if(t=n>>>3,!((n&=7)>=0&&n<=5)||t<1)throw Error();return e.l=t,e.h=n,!0}function hc(e){switch(e.h){case 0:e.h!=0?hc(e):ud(e.g);break;case 1:tr(e=e.g,e.g+8);break;case 2:if(e.h!=2)hc(e);else{var t=Fi(e.g);tr(e=e.g,e.g+t)}break;case 5:tr(e=e.g,e.g+4);break;case 3:for(t=e.l;;){if(!Z0(e))throw Error();if(e.h==4){if(e.l!=t)throw Error();break}hc(e)}break;default:throw Error()}}function uo(e,t,n){const i=e.g.l;var s=Fi(e.g);let r=(s=e.g.g+s)-i;if(r<=0&&(e.g.l=s,n(t,e,void 0,void 0,void 0),r=s-e.g.g),r)throw Error();return e.g.g=s,e.g.l=i,t}function dd(e){var t=Fi(e.g),n=q0(e=e.g,t);if(e=e.h,_y){var i,s=e;(i=$l)||(i=$l=new TextDecoder("utf-8",{fatal:!0})),t=n+t,s=n===0&&t===s.length?s:s.subarray(n,t);try{var r=i.decode(s)}catch(o){if(Yo===void 0){try{i.decode(new Uint8Array([128]))}catch{}try{i.decode(new Uint8Array([97])),Yo=!0}catch{Yo=!1}}throw!Yo&&($l=void 0),o}}else{t=(r=n)+t,n=[];let o,c=null;for(;r<t;){var a=e[r++];a<128?n.push(a):a<224?r>=t?zs():(o=e[r++],a<194||(192&o)!=128?(r--,zs()):n.push((31&a)<<6|63&o)):a<240?r>=t-1?zs():(o=e[r++],(192&o)!=128||a===224&&o<160||a===237&&o>=160||(192&(i=e[r++]))!=128?(r--,zs()):n.push((15&a)<<12|(63&o)<<6|63&i)):a<=244?r>=t-2?zs():(o=e[r++],(192&o)!=128||o-144+(a<<28)>>30||(192&(i=e[r++]))!=128||(192&(s=e[r++]))!=128?(r--,zs()):(a=(7&a)<<18|(63&o)<<12|(63&i)<<6|63&s,a-=65536,n.push(55296+(a>>10&1023),56320+(1023&a)))):zs(),n.length>=8192&&(c=fp(c,n),n.length=0)}r=fp(c,n)}return r}function J0(e){const t=Fi(e.g);return $0(e.g,t)}function Xc(e,t,n){var i=Fi(e.g);for(i=e.g.g+i;e.g.g<i;)n.push(t(e.g))}var sS=class{constructor(e,t,n,i){if(Pp.length){const s=Pp.pop();s.init(e,t,n,i),e=s}else e=new class{constructor(s,r,a,o){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.init(s,r,a,o)}init(s,r,a,{Y:o=!1,ea:c=!1}={}){this.Y=o,this.ea=c,s&&(s=ld(s,this.ea),this.h=s.buffer,this.j=s.g,this.m=r||0,this.l=a!==void 0?this.m+a:this.h.length,this.g=this.m)}clear(){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.Y=!1}}(e,t,n,i);this.g=e,this.m=this.g.g,this.h=this.l=-1,this.o(i)}o({ha:e=!1}={}){this.ha=e}},Cc=[];function Lp(e){return e?/^\d+$/.test(e)?(zc(e),new lu(Se,Ne)):null:rS||(rS=new lu(0,0))}var lu=class{constructor(e,t){this.h=e>>>0,this.g=t>>>0}};let rS;function Ip(e){return e?/^-?\d+$/.test(e)?(zc(e),new hu(Se,Ne)):null:aS||(aS=new hu(0,0))}var hu=class{constructor(e,t){this.h=e>>>0,this.g=t>>>0}};let aS;function Or(e,t,n){for(;n>0||t>127;)e.g.push(127&t|128),t=(t>>>7|n<<25)>>>0,n>>>=7;e.g.push(t)}function Ma(e,t){for(;t>127;)e.g.push(127&t|128),t>>>=7;e.g.push(t)}function Yc(e,t){if(t>=0)Ma(e,t);else{for(let n=0;n<9;n++)e.g.push(127&t|128),t>>=7;e.g.push(1)}}function fd(e){var t=Se;e.g.push(t>>>0&255),e.g.push(t>>>8&255),e.g.push(t>>>16&255),e.g.push(t>>>24&255)}function Qr(e,t){t.length!==0&&(e.l.push(t),e.h+=t.length)}function Jn(e,t,n){Ma(e.g,8*t+n)}function pd(e,t){return Jn(e,t,2),t=e.g.end(),Qr(e,t),t.push(e.h),t}function md(e,t){var n=t.pop();for(n=e.h+e.g.length()-n;n>127;)t.push(127&n|128),n>>>=7,e.h++;t.push(n),e.h++}function qc(e,t,n){Jn(e,t,2),Ma(e.g,n.length),Qr(e,e.g.end()),Qr(e,n)}function Rc(e,t,n,i){n!=null&&(t=pd(e,t),i(n,e),md(e,t))}function Oi(){const e=class{constructor(){throw Error()}};return Object.setPrototypeOf(e,e.prototype),e}var gd=Oi(),Q0=Oi(),_d=Oi(),vd=Oi(),xd=Oi(),tg=Oi(),oS=Oi(),$c=Oi(),eg=Oi(),ng=Oi();function Bi(e,t,n){var i=e.v;Un&&Un in i&&(i=i[Un])&&delete i[t.g],t.h?t.j(e,t.h,t.g,n,t.l):t.j(e,t.g,n,t.l)}var At=class{constructor(e,t){this.v=B0(e,t,void 0,2048)}toJSON(){return O0(this)}j(){var s;var e=HS,t=this.v,n=e.g,i=Un;if(fa&&i&&((s=t[i])==null?void 0:s[n])!=null&&$r(Cy,3),t=e.g,xp&&Un&&xp===void 0&&(i=(n=this.v)[Un])&&(i=i.da))try{i(n,t,Zy)}catch(r){_0(r)}return e.h?e.m(this,e.h,e.g,e.l):e.m(this,e.g,e.defaultValue,e.l)}clone(){const e=this.v,t=0|e[bt];return nd(this,e,t)?td(this,e,!0):new this.constructor(ga(e,t,!1))}};At.prototype[jr]=Kr,At.prototype.toString=function(){return this.v.toString()};var ya=class{constructor(e,t,n){this.g=e,this.h=t,e=gd,this.l=!!e&&n===e||!1}};function jc(e,t){return new ya(e,t,gd)}function ig(e,t,n,i,s){Rc(e,n,og(t,i),s)}const cS=jc(function(e,t,n,i,s){return e.h===2&&(uo(e,od(t,i,n),s),!0)},ig),lS=jc(function(e,t,n,i,s){return e.h===2&&(uo(e,od(t,i,n),s),!0)},ig);var Kc=Symbol(),Zc=Symbol(),uu=Symbol(),Dp=Symbol(),Up=Symbol();let sg,rg;function hr(e,t,n,i){var s=i[e];if(s)return s;(s={}).qa=i,s.T=function(d){switch(typeof d){case"boolean":return tS||(tS=[0,void 0,!0]);case"number":return d>0?void 0:d===0?eS||(eS=[0,void 0]):[-d,void 0];case"string":return[0,d];case"object":return d}}(i[0]);var r=i[1];let a=1;r&&r.constructor===Object&&(s.ba=r,typeof(r=i[++a])=="function"&&(s.ma=!0,sg??(sg=r),rg??(rg=i[a+1]),r=i[a+=2]));const o={};for(;r&&Array.isArray(r)&&r.length&&typeof r[0]=="number"&&r[0]>0;){for(var c=0;c<r.length;c++)o[r[c]]=r;r=i[++a]}for(c=1;r!==void 0;){let d;typeof r=="number"&&(c+=r,r=i[++a]);var l=void 0;if(r instanceof ya?d=r:(d=cS,a--),d==null?void 0:d.l){r=i[++a],l=i;var h=a;typeof r=="function"&&(r=r(),l[h]=r),l=r}for(h=c+1,typeof(r=i[++a])=="number"&&r<0&&(h-=r,r=i[++a]);c<h;c++){const u=o[c];l?n(s,c,d,l,u):t(s,c,d,u)}}return i[e]=s}function ag(e){return Array.isArray(e)?e[0]instanceof ya?e:[lS,e]:[e,void 0]}function og(e,t){return e instanceof At?e.v:Array.isArray(e)?Zs(e,t):void 0}function Md(e,t,n,i){const s=n.g;e[t]=i?(r,a,o)=>s(r,a,o,i):s}function yd(e,t,n,i,s){const r=n.g;let a,o;e[t]=(c,l,h)=>r(c,l,h,o||(o=hr(Zc,Md,yd,i).T),a||(a=Sd(i)),s)}function Sd(e){let t=e[uu];if(t!=null)return t;const n=hr(Zc,Md,yd,e);return t=n.ma?(i,s)=>sg(i,s,n):(i,s)=>{for(;Z0(s)&&s.h!=4;){var r=s.l,a=n[r];if(a==null){var o=n.ba;o&&(o=o[r])&&(o=uS(o))!=null&&(a=n[r]=o)}if(a==null||!a(s,i,r)){if(a=(o=s).m,hc(o),o.ha)var c=void 0;else c=o.g.g-a,o.g.g=a,c=$0(o.g,c);a=void 0,o=i,c&&((a=o[Un]??(o[Un]=new cu))[r]??(a[r]=[])).push(c)}}return(i=Hc(i))&&(i.da=n.qa[Up]),!0},e[uu]=t,e[Up]=hS.bind(e),t}function hS(e,t,n,i){var s=this[Zc];const r=this[uu],a=Zs(void 0,s.T),o=Hc(e);if(o){var c=!1,l=s.ba;if(l){if(s=(h,d,u)=>{if(u.length!==0)if(l[d])for(const f of u){h=j0(f);try{c=!0,r(a,h)}finally{K0(h)}}else i==null||i(e,d,u)},t==null)Ac(o,s);else if(o!=null){const h=o[t];h&&s(o,t,h)}if(c){let h=0|e[bt];if(2&h&&2048&h&&!(n!=null&&n.Ka))throw Error();const d=pa(h),u=(f,g)=>{if(rs(e,f,d)!=null){if((n==null?void 0:n.Qa)===1)return;throw Error()}g!=null&&(h=ze(e,h,f,g,d)),delete o[f]};t==null?T0(a,0|a[bt],(f,g)=>{u(f,g)}):u(t,rs(a,t,d))}}}}function uS(e){const t=(e=ag(e))[0].g;if(e=e[1]){const n=Sd(e),i=hr(Zc,Md,yd,e).T;return(s,r,a)=>t(s,r,a,i,n)}return t}function Jc(e,t,n){e[t]=n.h}function Qc(e,t,n,i){let s,r;const a=n.h;e[t]=(o,c,l)=>a(o,c,l,r||(r=hr(Kc,Jc,Qc,i).T),s||(s=cg(i)))}function cg(e){let t=e[Dp];if(!t){const n=hr(Kc,Jc,Qc,e);t=(i,s)=>lg(i,s,n),e[Dp]=t}return t}function lg(e,t,n){T0(e,0|e[bt],(i,s)=>{if(s!=null){var r=function(a,o){var c=a[o];if(c)return c;if((c=a.ba)&&(c=c[o])){var l=(c=ag(c))[0].h;if(c=c[1]){const h=cg(c),d=hr(Kc,Jc,Qc,c).T;c=a.ma?rg(d,h):(u,f,g)=>l(u,f,g,d,h)}else c=l;return a[o]=c}}(n,i);r?r(t,s,i):i<500||$r(au,3)}}),(e=Hc(e))&&Ac(e,(i,s,r)=>{for(Qr(t,t.g.end()),i=0;i<r.length;i++)Qr(t,qu(r[i])||new Uint8Array(0))})}const dS=Fn(0);function Sa(e,t){if(Array.isArray(t)){var n=0|t[bt];if(4&n)return t;for(var i=0,s=0;i<t.length;i++){const r=e(t[i]);r!=null&&(t[s++]=r)}return s<i&&(t.length=s),(e=-1537&(5|n))!==n&&Xe(t,e),2&e&&Object.freeze(t),t}}function un(e,t,n){return new ya(e,t,n)}function Ea(e,t,n){return new ya(e,t,n)}function dn(e,t,n){ze(e,0|e[bt],t,n,pa(0|e[bt]))}var fS=jc(function(e,t,n,i,s){if(e.h!==2)return!1;if(e=hi(e=uo(e,Zs([void 0,void 0],i),s)),s=pa(i=0|t[bt]),2&i)throw Error();let r=rs(t,n,s);if(r instanceof ss)2&r.J?(r=r.V(),r.push(e),ze(t,i,n,r,s)):r.Ma(e);else if(Array.isArray(r)){var a=0|r[bt];8192&a||Xe(r,a|=8192),2&a&&(r=H0(r),ze(t,i,n,r,s)),r.push(e)}else ze(t,i,n,$a([e]),s);return!0},function(e,t,n,i,s){if(t instanceof ss)t.forEach((r,a)=>{Rc(e,n,Zs([a,r],i),s)});else if(Array.isArray(t)){for(let r=0;r<t.length;r++){const a=t[r];Array.isArray(a)&&Rc(e,n,Zs(a,i),s)}$a(t)}});function hg(e,t,n){(t=Ti(t))!=null&&(Jn(e,n,5),e=e.g,ju(t),fd(e))}function ug(e,t,n){if(t=function(i){if(i==null)return i;const s=typeof i;if(s==="bigint")return String(co(64,i));if(lo(i)){if(s==="string")return D0(i);if(s==="number")return Ju(i)}}(t),t!=null&&(typeof t=="string"&&Ip(t),t!=null))switch(Jn(e,n,0),typeof t){case"number":e=e.g,Zr(t),Or(e,Se,Ne);break;case"bigint":n=BigInt.asUintN(64,t),n=new hu(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),Or(e.g,n.h,n.g);break;default:n=Ip(t),Or(e.g,n.h,n.g)}}function dg(e,t,n){(t=ma(t))!=null&&t!=null&&(Jn(e,n,0),Yc(e.g,t))}function fg(e,t,n){(t=P0(t))!=null&&(Jn(e,n,0),e.g.g.push(t?1:0))}function pg(e,t,n){(t=en(t))!=null&&qc(e,n,g0(t))}function mg(e,t,n,i,s){Rc(e,n,og(t,i),s)}function gg(e,t,n){(t=t==null||typeof t=="string"||t instanceof Pi?t:void 0)!=null&&qc(e,n,ld(t,!0).buffer)}function _g(e,t,n){(t=L0(t))!=null&&t!=null&&(Jn(e,n,0),Ma(e.g,t))}function vg(e,t,n){return(e.h===5||e.h===2)&&(t=xa(t,0|t[bt],n),e.h==2?Xc(e,wc,t):t.push(wc(e.g)),!0)}var Oe=un(function(e,t,n){return e.h===5&&(dn(t,n,wc(e.g)),!0)},hg,$c),pS=Ea(vg,function(e,t,n){if((t=Sa(Ti,t))!=null)for(let a=0;a<t.length;a++){var i=e,s=n,r=t[a];r!=null&&(Jn(i,s,5),i=i.g,ju(r),fd(i))}},$c),Ed=Ea(vg,function(e,t,n){if((t=Sa(Ti,t))!=null&&t.length){Jn(e,n,2),Ma(e.g,4*t.length);for(let i=0;i<t.length;i++)n=e.g,ju(t[i]),fd(n)}},$c),mS=un(function(e,t,n){return e.h===5&&(dn(t,n,(e=wc(e.g))===0?void 0:e),!0)},hg,$c),Rs=un(function(e,t,n){return e.h!==0?e=!1:(dn(t,n,hd(e.g,R0)),e=!0),e},ug,tg),Jl=un(function(e,t,n){return e.h!==0?t=!1:(dn(t,n,(e=hd(e.g,R0))===dS?void 0:e),t=!0),t},ug,tg),gS=un(function(e,t,n){return e.h!==0?e=!1:(dn(t,n,hd(e.g,zy)),e=!0),e},function(e,t,n){if(t=function(i){if(i==null)return i;var s=typeof i;if(s==="bigint")return String(Vy(64,i));if(lo(i)){if(s==="string")return s=Jr(Number(i)),or(s)&&s>=0?i=String(s):((s=i.indexOf("."))!==-1&&(i=i.substring(0,s)),(s=i[0]!=="-"&&((s=i.length)<20||s===20&&i<="18446744073709551615"))||(zc(i),i=ja(Se,Ne))),i;if(s==="number")return(i=Jr(i))>=0&&or(i)||(Zr(i),i=C0(Se,Ne)),i}}(t),t!=null&&(typeof t=="string"&&Lp(t),t!=null))switch(Jn(e,n,0),typeof t){case"number":e=e.g,Zr(t),Or(e,Se,Ne);break;case"bigint":n=BigInt.asUintN(64,t),n=new lu(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),Or(e.g,n.h,n.g);break;default:n=Lp(t),Or(e.g,n.h,n.g)}},oS),ke=un(function(e,t,n){return e.h===0&&(dn(t,n,Cs(e.g)),!0)},dg,vd),fo=Ea(function(e,t,n){return(e.h===0||e.h===2)&&(t=xa(t,0|t[bt],n),e.h==2?Xc(e,Cs,t):t.push(Cs(e.g)),!0)},function(e,t,n){if((t=Sa(ma,t))!=null&&t.length){n=pd(e,n);for(let i=0;i<t.length;i++)Yc(e.g,t[i]);md(e,n)}},vd),Lr=un(function(e,t,n){return e.h===0&&(dn(t,n,(e=Cs(e.g))===0?void 0:e),!0)},dg,vd),be=un(function(e,t,n){return e.h===0&&(dn(t,n,ud(e.g)),!0)},fg,Q0),er=un(function(e,t,n){return e.h===0&&(dn(t,n,(e=ud(e.g))===!1?void 0:e),!0)},fg,Q0),an=Ea(function(e,t,n){return e.h===2&&(e=dd(e),xa(t,0|t[bt],n).push(e),!0)},function(e,t,n){if((t=Sa(en,t))!=null)for(let a=0;a<t.length;a++){var i=e,s=n,r=t[a];r!=null&&qc(i,s,g0(r))}},_d),ys=un(function(e,t,n){return e.h===2&&(dn(t,n,(e=dd(e))===""?void 0:e),!0)},pg,_d),me=un(function(e,t,n){return e.h===2&&(dn(t,n,dd(e)),!0)},pg,_d),Ke=function(e,t,n=gd){return new ya(e,t,n)}(function(e,t,n,i,s){return e.h===2&&(i=Zs(void 0,i),xa(t,0|t[bt],n).push(i),uo(e,i,s),!0)},function(e,t,n,i,s){if(Array.isArray(t)){for(let r=0;r<t.length;r++)mg(e,t[r],n,i,s);1&(e=0|t[bt])||Xe(t,1|e)}}),xe=jc(function(e,t,n,i,s,r){if(e.h!==2)return!1;let a=0|t[bt];return G0(t,a,r,n,pa(a)),uo(e,t=od(t,i,n),s),!0},mg),xg=un(function(e,t,n){return e.h===2&&(dn(t,n,J0(e)),!0)},gg,eg),_S=Ea(function(e,t,n){return(e.h===0||e.h===2)&&(t=xa(t,0|t[bt],n),e.h==2?Xc(e,Fi,t):t.push(Fi(e.g)),!0)},function(e,t,n){if((t=Sa(L0,t))!=null)for(let a=0;a<t.length;a++){var i=e,s=n,r=t[a];r!=null&&(Jn(i,s,0),Ma(i.g,r))}},xd),vS=un(function(e,t,n){return e.h===0&&(dn(t,n,(e=Fi(e.g))===0?void 0:e),!0)},_g,xd),ln=un(function(e,t,n){return e.h===0&&(dn(t,n,Cs(e.g)),!0)},function(e,t,n){(t=ma(t))!=null&&(t=parseInt(t,10),Jn(e,n,0),Yc(e.g,t))},ng);class xS{constructor(t,n){var i=kn;this.g=t,this.h=n,this.m=ee,this.j=It,this.defaultValue=void 0,this.l=i.Oa!=null?w0:void 0}register(){Oc(this)}}function ki(e,t){return new xS(e,t)}function Ls(e,t){return(n,i)=>{{const r={ea:!0};i&&Object.assign(r,i),n=j0(n,void 0,void 0,r);try{const a=new e,o=a.v;Sd(t)(o,n);var s=a}finally{K0(n)}}return s}}function tl(e){return function(){const t=new class{constructor(){this.l=[],this.h=0,this.g=new class{constructor(){this.g=[]}length(){return this.g.length}end(){const a=this.g;return this.g=[],a}}}};lg(this.v,t,hr(Kc,Jc,Qc,e)),Qr(t,t.g.end());const n=new Uint8Array(t.h),i=t.l,s=i.length;let r=0;for(let a=0;a<s;a++){const o=i[a];n.set(o,r),r+=o.length}return t.l=[n],n}}var Fp=class extends At{constructor(e){super(e)}},Np=[0,ys,un(function(e,t,n){return e.h===2&&(dn(t,n,(e=J0(e))===rr()?void 0:e),!0)},function(e,t,n){if(t!=null){if(t instanceof At){const i=t.Ra;return void(i?(t=i(t),t!=null&&qc(e,n,ld(t,!0).buffer)):$r(au,3))}if(Array.isArray(t))return void $r(au,3)}gg(e,t,n)},eg)];let Ql,Op=globalThis.trustedTypes;function Bp(e){var t;return Ql===void 0&&(Ql=function(){let n=null;if(!Op)return n;try{const i=s=>s;n=Op.createPolicy("goog#html",{createHTML:i,createScript:i,createScriptURL:i})}catch{}return n}()),e=(t=Ql)?t.createScriptURL(e):e,new class{constructor(n){this.g=n}toString(){return this.g+""}}(e)}function qo(e,...t){if(t.length===0)return Bp(e[0]);let n=e[0];for(let i=0;i<t.length;i++)n+=encodeURIComponent(t[i])+e[i+1];return Bp(n)}var Mg=[0,ke,ln,be,-1,fo,ln,-1,be],MS=class extends At{constructor(e){super(e)}},yg=[0,be,me,be,ln,-1,Ea(function(e,t,n){return(e.h===0||e.h===2)&&(t=xa(t,0|t[bt],n),e.h==2?Xc(e,iS,t):t.push(Cs(e.g)),!0)},function(e,t,n){if((t=Sa(ma,t))!=null&&t.length){n=pd(e,n);for(let i=0;i<t.length;i++)Yc(e.g,t[i]);md(e,n)}},ng),me,-1,[0,be,-1],ln,be,-1],Sg=[0,3,be,-1,2,[0,[2],ke,xe,[0,un(function(e,t,n){return e.h===0&&(dn(t,n,Fi(e.g)),!0)},_g,xd)]],[0,ln,be,ln,be,ln,be,me,-1],[0,[3,4],me,-1,xe,[0,ke],xe,[0,ln]],[0]],Eg=[0,me,-2],kp=class extends At{constructor(e){super(e)}},bg=[0],Ag=[0,ke,be,1,be,-4],kn=class extends At{constructor(e){super(e,2)}},Ve={};Ve[336783863]=[0,me,be,-1,ke,[0,[1,2,3,4,5,6,7,8,9],xe,bg,xe,yg,xe,Eg,xe,Ag,xe,Mg,xe,[0,me,-2],xe,[0,me,ln],xe,Sg,xe,[0,ln,-1,be]],[0,me],be,[0,[1,3],[2,4],xe,[0,fo],-1,xe,[0,an],-1,Ke,[0,me,-1]],me];var zp=[0,Jl,-1,er,-3,Jl,fo,ys,Lr,Jl,-1,er,Lr,er,-2,ys];function Me(e,t){Wc(e,3,t)}function jt(e,t){Wc(e,4,t)}var En=class extends At{constructor(e){super(e,500)}o(e){return It(this,0,7,e)}},Ha=[-1,{}],Vp=[0,me,1,Ha],Hp=[0,me,an,Ha];function Qn(e,t){cd(e,1,En,t)}function Te(e,t){Wc(e,10,t)}function ne(e,t){Wc(e,15,t)}var zn=class extends At{constructor(e){super(e,500)}o(e){return It(this,0,1001,e)}},Tg=[-500,Ke,[-500,ys,-1,an,-3,[-2,Ve,be],Ke,Np,Lr,-1,Vp,Hp,Ke,[0,ys,er],ys,zp,Lr,an,987,an],4,Ke,[-500,me,-1,[-1,{}],998,me],Ke,[-500,me,an,-1,[-2,{},be],997,an,-1],Lr,Ke,[-500,me,an,Ha,998,an],an,Lr,Vp,Hp,Ke,[0,ys,-1,Ha],an,-2,zp,ys,-1,er,[0,er,vS],978,Ha,Ke,Np];zn.prototype.g=tl(Tg);var yS=Ls(zn,Tg),SS=class extends At{constructor(e){super(e)}},wg=class extends At{constructor(e){super(e)}g(){return as(this,SS,1)}},Cg=[0,Ke,[0,ke,Oe,me,-1]],el=Ls(wg,Cg),ES=class extends At{constructor(e){super(e)}},bS=class extends At{constructor(e){super(e)}},th=class extends At{constructor(e){super(e)}l(){return ee(this,ES,2)}g(){return as(this,bS,5)}},Rg=Ls(class extends At{constructor(e){super(e)}},[0,an,fo,Ed,[0,ln,[0,ke,-3],[0,Oe,-3],[0,ke,-1,[0,Ke,[0,ke,-2]]],Ke,[0,Oe,-1,me,Oe]],me,-1,Rs,Ke,[0,ke,Oe],an,Rs]),Pg=class extends At{constructor(e){super(e)}},Br=Ls(class extends At{constructor(e){super(e)}},[0,Ke,[0,Oe,-4]]),Lg=class extends At{constructor(e){super(e)}},po=Ls(class extends At{constructor(e){super(e)}},[0,Ke,[0,Oe,-4]]),AS=class extends At{constructor(e){super(e)}},TS=[0,ke,-1,Ed,ln],Ig=class extends At{constructor(e){super(e)}};Ig.prototype.g=tl([0,Oe,-4,Rs]);var wS=class extends At{constructor(e){super(e)}},CS=Ls(class extends At{constructor(e){super(e)}},[0,Ke,[0,1,ke,me,Cg],Rs]),Gp=class extends At{constructor(e){super(e)}},RS=class extends At{constructor(e){super(e)}na(){const e=Ee(this,1,void 0,void 0,V0);return e??rr()}},PS=class extends At{constructor(e){super(e)}},Dg=[1,2],LS=Ls(class extends At{constructor(e){super(e)}},[0,Ke,[0,Dg,xe,[0,Ed],xe,[0,xg],ke,me],Rs]),bd=class extends At{constructor(e){super(e)}},Ug=[0,me,ke,Oe,an,-1],Wp=class extends At{constructor(e){super(e)}},IS=[0,be,-1],Xp=class extends At{constructor(e){super(e)}},uc=[1,2,3,4,5,6],Pc=class extends At{constructor(e){super(e)}g(){return Ee(this,1,void 0,void 0,V0)!=null}l(){return en(Ee(this,2))!=null}},Re=class extends At{constructor(e){super(e)}g(){return P0(Ee(this,2))??!1}},Fg=[0,xg,me,[0,ke,Rs,-1],[0,gS,Rs]],Be=[0,Fg,be,[0,uc,xe,Ag,xe,yg,xe,Mg,xe,bg,xe,Eg,xe,Sg],ln],nl=class extends At{constructor(e){super(e)}},Ad=[0,Be,Oe,-1,ke],DS=ki(502141897,nl);Ve[502141897]=Ad;var US=Ls(class extends At{constructor(e){super(e)}},[0,[0,ln,-1,pS,_S],TS]),Ng=class extends At{constructor(e){super(e)}},Og=class extends At{constructor(e){super(e)}},du=[0,Be,Oe,[0,Be],be],FS=ki(508968150,Og);Ve[508968150]=[0,Be,Ad,du,Oe,[0,[0,Fg]]],Ve[508968149]=du;var Cr=class extends At{constructor(e){super(e)}l(){return ee(this,bd,2)}g(){ue(this,2)}},Bg=[0,Be,Ug];Ve[478825465]=Bg;var NS=class extends At{constructor(e){super(e)}},kg=class extends At{constructor(e){super(e)}},Td=class extends At{constructor(e){super(e)}},wd=class extends At{constructor(e){super(e)}},zg=class extends At{constructor(e){super(e)}},Yp=[0,Be,[0,Be],Bg,-1],Vg=[0,Be,Oe,ke],Cd=[0,Be,Oe],Hg=[0,Be,Vg,Cd,Oe],OS=ki(479097054,zg);Ve[479097054]=[0,Be,Hg,Yp],Ve[463370452]=Yp,Ve[464864288]=Vg;var BS=ki(462713202,wd);Ve[462713202]=Hg,Ve[474472470]=Cd;var kS=class extends At{constructor(e){super(e)}},Gg=class extends At{constructor(e){super(e)}},Wg=class extends At{constructor(e){super(e)}},Xg=class extends At{constructor(e){super(e)}},Rd=[0,Be,Oe,-1,ke],fu=[0,Be,Oe,be];Xg.prototype.g=tl([0,Be,Cd,[0,Be],Ad,du,Rd,fu]);var Yg=class extends At{constructor(e){super(e)}},zS=ki(456383383,Yg);Ve[456383383]=[0,Be,Ug];var qg=class extends At{constructor(e){super(e)}},VS=ki(476348187,qg);Ve[476348187]=[0,Be,IS];var $g=class extends At{constructor(e){super(e)}},qp=class extends At{constructor(e){super(e)}},jg=[0,ln,-1],HS=ki(458105876,class extends At{constructor(e){super(e)}g(){let e;var t=this.v;const n=0|t[bt];return e=Nn(this,n),t=function(i,s,r,a){var o=qp;!a&&_a(i)&&(r=0|(s=i.v)[bt]);var c=rs(s,2);if(i=!1,c==null){if(a)return wp();c=[]}else if(c.constructor===ss){if(!(2&c.J)||a)return c;c=c.V()}else Array.isArray(c)?i=!!(2&(0|c[bt])):c=[];if(a){if(!c.length)return wp();i||(i=!0,oo(c))}else i&&(i=!1,$a(c),c=H0(c));return!i&&32&r&&ao(c,32),r=ze(s,r,2,a=new ss(c,o,Wy,void 0)),i||lr(s,r),a}(this,t,n,e),!e&&qp&&(t.ra=!0),t}});Ve[458105876]=[0,jg,fS,[!0,Rs,[0,me,-1,an]],[0,fo,be,ln]];var Pd=class extends At{constructor(e){super(e)}},Kg=ki(458105758,Pd);Ve[458105758]=[0,Be,me,jg];var eh=class extends At{constructor(e){super(e)}},$p=[0,mS,-1,er],GS=class extends At{constructor(e){super(e)}},Zg=class extends At{constructor(e){super(e)}},pu=[1,2];Zg.prototype.g=tl([0,pu,xe,$p,xe,[0,Ke,$p]]);var Jg=class extends At{constructor(e){super(e)}},WS=ki(443442058,Jg);Ve[443442058]=[0,Be,me,ke,Oe,an,-1,be,Oe],Ve[514774813]=Rd;var Qg=class extends At{constructor(e){super(e)}},XS=ki(516587230,Qg);function mu(e,t){return t=t?t.clone():new bd,e.displayNamesLocale!==void 0?ue(t,1,ho(e.displayNamesLocale)):e.displayNamesLocale===void 0&&ue(t,1),e.maxResults!==void 0?os(t,2,e.maxResults):"maxResults"in e&&ue(t,2),e.scoreThreshold!==void 0?Rt(t,3,e.scoreThreshold):"scoreThreshold"in e&&ue(t,3),e.categoryAllowlist!==void 0?Tc(t,4,e.categoryAllowlist):"categoryAllowlist"in e&&ue(t,4),e.categoryDenylist!==void 0?Tc(t,5,e.categoryDenylist):"categoryDenylist"in e&&ue(t,5),t}function t_(e){const t=Number(e);return Number.isSafeInteger(t)?t:String(e)}function Ld(e,t=-1,n=""){return{categories:e.map(i=>({index:Zn(i,1)??0??-1,score:Ie(i,2)??0,categoryName:en(Ee(i,3))??""??"",displayName:en(Ee(i,4))??""??""})),headIndex:t,headName:n}}function YS(e){const t={classifications:as(e,wS,1).map(n=>{var i;return Ld(((i=ee(n,wg,4))==null?void 0:i.g())??[],Zn(n,2)??0,en(Ee(n,3))??"")})};return function(n){return n==null?n:typeof n=="bigint"?(ou(n)?n=Number(n):(n=co(64,n),n=ou(n)?Number(n):String(n)),n):lo(n)?typeof n=="number"?Ju(n):D0(n):void 0}(Ee(e,2,void 0,void 0,bc))!=null&&(t.timestampMs=t_(Ee(e,2,void 0,void 0,bc)??k0)),t}function e_(e){var a,o;var t=Ks(e,3,Ti,js()),n=Ks(e,2,ma,js()),i=Ks(e,1,en,js()),s=Ks(e,9,en,js());const r={categories:[],keypoints:[]};for(let c=0;c<t.length;c++)r.categories.push({score:t[c],index:n[c]??-1,categoryName:i[c]??"",displayName:s[c]??""});if((t=(a=ee(e,th,4))==null?void 0:a.l())&&(r.boundingBox={originX:Zn(t,1,gs)??0,originY:Zn(t,2,gs)??0,width:Zn(t,3,gs)??0,height:Zn(t,4,gs)??0,angle:0}),(o=ee(e,th,4))==null?void 0:o.g().length)for(const c of ee(e,th,4).g())r.keypoints.push({x:Ee(c,1,void 0,gs,Ti)??0,y:Ee(c,2,void 0,gs,Ti)??0,score:Ee(c,4,void 0,gs,Ti)??0,label:en(Ee(c,3,void 0,gs))??""});return r}function il(e){const t=[];for(const n of as(e,Lg,1))t.push({x:Ie(n,1)??0,y:Ie(n,2)??0,z:Ie(n,3)??0,visibility:Ie(n,4)??0});return t}function Ga(e){const t=[];for(const n of as(e,Pg,1))t.push({x:Ie(n,1)??0,y:Ie(n,2)??0,z:Ie(n,3)??0,visibility:Ie(n,4)??0});return t}function jp(e){return Array.from(e,t=>t>127?t-256:t)}function Kp(e,t){if(e.length!==t.length)throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${e.length} vs. ${t.length}).`);let n=0,i=0,s=0;for(let r=0;r<e.length;r++)n+=e[r]*t[r],i+=e[r]*e[r],s+=t[r]*t[r];if(i<=0||s<=0)throw Error("Cannot compute cosine similarity on embedding with 0 norm.");return n/Math.sqrt(i*s)}let $o;Ve[516587230]=[0,Be,Rd,fu,Oe],Ve[518928384]=fu;const qS=new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]);async function n_(e){if(e)return!0;if($o===void 0)try{await WebAssembly.instantiate(qS),$o=!0}catch{$o=!1}return $o}async function jo(e,t,n){return{wasmLoaderPath:`${t}/${e}_${n=`wasm${n?"_module":""}${await n_(n)?"":"_nosimd"}_internal`}.js`,wasmBinaryPath:`${t}/${e}_${n}.wasm`}}var Xs=class{};function i_(){var e=navigator;return typeof OffscreenCanvas<"u"&&(!function(t=navigator){return(t=t.userAgent).includes("Safari")&&!t.includes("Chrome")}(e)||!!((e=e.userAgent.match(/Version\/([\d]+).*Safari/))&&e.length>=1&&Number(e[1])>=17))}async function Zp(e){if(typeof importScripts!="function"){const t=document.createElement("script");return t.src=e.toString(),t.crossOrigin="anonymous",new Promise((n,i)=>{t.addEventListener("load",()=>{n()},!1),t.addEventListener("error",s=>{i(s)},!1),document.body.appendChild(t)})}try{importScripts(e.toString())}catch(t){if(!(t instanceof TypeError))throw t;await self.import(e.toString())}}function s_(e){return e.videoWidth!==void 0?[e.videoWidth,e.videoHeight]:e.naturalWidth!==void 0?[e.naturalWidth,e.naturalHeight]:e.displayWidth!==void 0?[e.displayWidth,e.displayHeight]:[e.width,e.height]}function wt(e,t,n){e.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"),n(t=e.i.stringToNewUTF8(t)),e.i._free(t)}function Jp(e,t,n){if(!e.i.canvas)throw Error("No OpenGL canvas configured.");if(n?e.i._bindTextureToStream(n):e.i._bindTextureToCanvas(),!(n=e.i.canvas.getContext("webgl2")||e.i.canvas.getContext("webgl")))throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");e.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!0),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,t),e.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1);const[i,s]=s_(t);return!e.l||i===e.i.canvas.width&&s===e.i.canvas.height||(e.i.canvas.width=i,e.i.canvas.height=s),[i,s]}function Qp(e,t,n){e.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");const i=new Uint32Array(t.length);for(let s=0;s<t.length;s++)i[s]=e.i.stringToNewUTF8(t[s]);t=e.i._malloc(4*i.length),e.i.HEAPU32.set(i,t>>2),n(t);for(const s of i)e.i._free(s);e.i._free(t)}function vi(e,t,n){e.i.simpleListeners=e.i.simpleListeners||{},e.i.simpleListeners[t]=n}function _s(e,t,n){let i=[];e.i.simpleListeners=e.i.simpleListeners||{},e.i.simpleListeners[t]=(s,r,a)=>{r?(n(i,a),i=[]):i.push(s)}}Xs.forVisionTasks=function(e,t=!1){return jo("vision",e??qo``,t)},Xs.forTextTasks=function(e,t=!1){return jo("text",e??qo``,t)},Xs.forGenAiTasks=function(e,t=!1){return jo("genai",e??qo``,t)},Xs.forAudioTasks=function(e,t=!1){return jo("audio",e??qo``,t)},Xs.isSimdSupported=function(e=!1){return n_(e)};async function $S(e,t,n,i){return e=await(async(s,r,a,o,c)=>{if(r&&await Zp(r),!self.ModuleFactory||a&&(await Zp(a),!self.ModuleFactory))throw Error("ModuleFactory not set.");return self.Module&&c&&((r=self.Module).locateFile=c.locateFile,c.mainScriptUrlOrBlob&&(r.mainScriptUrlOrBlob=c.mainScriptUrlOrBlob)),c=await self.ModuleFactory(self.Module||c),self.ModuleFactory=self.Module=void 0,new s(c,o)})(e,n.wasmLoaderPath,n.assetLoaderPath,t,{locateFile:s=>s.endsWith(".wasm")?n.wasmBinaryPath.toString():n.assetBinaryPath&&s.endsWith(".data")?n.assetBinaryPath.toString():s}),await e.o(i),e}function nh(e,t){const n=ee(e.baseOptions,Pc,1)||new Pc;typeof t=="string"?(ue(n,2,ho(t)),ue(n,1)):t instanceof Uint8Array&&(ue(n,1,$u(t,!1)),ue(n,2)),It(e.baseOptions,0,1,n)}function tm(e){try{const t=e.H.length;if(t===1)throw Error(e.H[0].message);if(t>1)throw Error("Encountered multiple errors: "+e.H.map(n=>n.message).join(", "))}finally{e.H=[]}}function gt(e,t){e.C=Math.max(e.C,t)}function sl(e,t){e.B=new En,On(e.B,2,"PassThroughCalculator"),Me(e.B,"free_memory"),jt(e.B,"free_memory_unused_out"),Te(t,"free_memory"),Qn(t,e.B)}function ta(e,t){Me(e.B,t),jt(e.B,t+"_unused_out")}function rl(e){e.g.addBoolToStream(!0,"free_memory",e.C)}var gu=class{constructor(e){this.g=e,this.H=[],this.C=0,this.g.setAutoRenderToScreen(!1)}l(e,t=!0){var n,i,s,r,a,o;if(t){const c=e.baseOptions||{};if((n=e.baseOptions)!=null&&n.modelAssetBuffer&&((i=e.baseOptions)!=null&&i.modelAssetPath))throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");if(!((s=ee(this.baseOptions,Pc,1))!=null&&s.g()||(r=ee(this.baseOptions,Pc,1))!=null&&r.l()||(a=e.baseOptions)!=null&&a.modelAssetBuffer||(o=e.baseOptions)!=null&&o.modelAssetPath))throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");if(function(l,h){let d=ee(l.baseOptions,Xp,3);if(!d){var u=d=new Xp,f=new kp;Va(u,4,uc,f)}"delegate"in h&&(h.delegate==="GPU"?(h=d,u=new MS,Va(h,2,uc,u)):(h=d,u=new kp,Va(h,4,uc,u))),It(l.baseOptions,0,3,d)}(this,c),c.modelAssetPath)return fetch(c.modelAssetPath.toString()).then(l=>{if(l.ok)return l.arrayBuffer();throw Error(`Failed to fetch model: ${c.modelAssetPath} (${l.status})`)}).then(l=>{try{this.g.i.FS_unlink("/model.dat")}catch{}this.g.i.FS_createDataFile("/","model.dat",new Uint8Array(l),!0,!1,!1),nh(this,"/model.dat"),this.m(),this.L()});if(c.modelAssetBuffer instanceof Uint8Array)nh(this,c.modelAssetBuffer);else if(c.modelAssetBuffer)return async function(l){const h=[];for(var d=0;;){const{done:u,value:f}=await l.read();if(u)break;h.push(f),d+=f.length}if(h.length===0)return new Uint8Array(0);if(h.length===1)return h[0];l=new Uint8Array(d),d=0;for(const u of h)l.set(u,d),d+=u.length;return l}(c.modelAssetBuffer).then(l=>{nh(this,l),this.m(),this.L()})}return this.m(),this.L(),Promise.resolve()}L(){}ca(){let e;if(this.g.ca(t=>{e=yS(t)}),!e)throw Error("Failed to retrieve CalculatorGraphConfig");return e}setGraph(e,t){this.g.attachErrorListener((n,i)=>{this.H.push(Error(i))}),this.g.Ja(),this.g.setGraph(e,t),this.B=void 0,tm(this)}finishProcessing(){this.g.finishProcessing(),tm(this)}close(){this.B=void 0,this.g.closeGraph()}};function Ts(e,t){if(!e)throw Error(`Unable to obtain required WebGL resource: ${t}`);return e}gu.prototype.close=gu.prototype.close;class jS{constructor(t,n,i,s){this.g=t,this.h=n,this.m=i,this.l=s}bind(){this.g.bindVertexArray(this.h)}close(){this.g.deleteVertexArray(this.h),this.g.deleteBuffer(this.m),this.g.deleteBuffer(this.l)}}function em(e,t,n){const i=e.g;if(n=Ts(i.createShader(n),"Failed to create WebGL shader"),i.shaderSource(n,t),i.compileShader(n),!i.getShaderParameter(n,i.COMPILE_STATUS))throw Error(`Could not compile WebGL shader: ${i.getShaderInfoLog(n)}`);return i.attachShader(e.h,n),n}function nm(e,t){const n=e.g,i=Ts(n.createVertexArray(),"Failed to create vertex array");n.bindVertexArray(i);const s=Ts(n.createBuffer(),"Failed to create buffer");n.bindBuffer(n.ARRAY_BUFFER,s),n.enableVertexAttribArray(e.O),n.vertexAttribPointer(e.O,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),n.STATIC_DRAW);const r=Ts(n.createBuffer(),"Failed to create buffer");return n.bindBuffer(n.ARRAY_BUFFER,r),n.enableVertexAttribArray(e.L),n.vertexAttribPointer(e.L,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array(t?[0,1,0,0,1,0,1,1]:[0,0,0,1,1,1,1,0]),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,null),n.bindVertexArray(null),new jS(n,i,s,r)}function Id(e,t){if(e.g){if(t!==e.g)throw Error("Cannot change GL context once initialized")}else e.g=t}function KS(e,t,n,i){return Id(e,t),e.h||(e.m(),e.D()),n?(e.u||(e.u=nm(e,!0)),n=e.u):(e.A||(e.A=nm(e,!1)),n=e.A),t.useProgram(e.h),n.bind(),e.l(),e=i(),n.g.bindVertexArray(null),e}function r_(e,t,n){return Id(e,t),e=Ts(t.createTexture(),"Failed to create texture"),t.bindTexture(t.TEXTURE_2D,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,n??t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,n??t.LINEAR),t.bindTexture(t.TEXTURE_2D,null),e}function a_(e,t,n){Id(e,t),e.B||(e.B=Ts(t.createFramebuffer(),"Failed to create framebuffe.")),t.bindFramebuffer(t.FRAMEBUFFER,e.B),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,n,0)}function ZS(e){var t;(t=e.g)==null||t.bindFramebuffer(e.g.FRAMEBUFFER,null)}var o_=class{H(){return`
  precision mediump float;
  varying vec2 vTex;
  uniform sampler2D inputTexture;
  void main() {
    gl_FragColor = texture2D(inputTexture, vTex);
  }
 `}m(){const e=this.g;if(this.h=Ts(e.createProgram(),"Failed to create WebGL program"),this.X=em(this,`
  attribute vec2 aVertex;
  attribute vec2 aTex;
  varying vec2 vTex;
  void main(void) {
    gl_Position = vec4(aVertex, 0.0, 1.0);
    vTex = aTex;
  }`,e.VERTEX_SHADER),this.W=em(this,this.H(),e.FRAGMENT_SHADER),e.linkProgram(this.h),!e.getProgramParameter(this.h,e.LINK_STATUS))throw Error(`Error during program linking: ${e.getProgramInfoLog(this.h)}`);this.O=e.getAttribLocation(this.h,"aVertex"),this.L=e.getAttribLocation(this.h,"aTex")}D(){}l(){}close(){if(this.h){const e=this.g;e.deleteProgram(this.h),e.deleteShader(this.X),e.deleteShader(this.W)}this.B&&this.g.deleteFramebuffer(this.B),this.A&&this.A.close(),this.u&&this.u.close()}};function ji(e,t){switch(t){case 0:return e.g.find(n=>n instanceof Uint8Array);case 1:return e.g.find(n=>n instanceof Float32Array);case 2:return e.g.find(n=>typeof WebGLTexture<"u"&&n instanceof WebGLTexture);default:throw Error(`Type is not supported: ${t}`)}}function _u(e){var t=ji(e,1);if(!t){if(t=ji(e,0))t=new Float32Array(t).map(i=>i/255);else{t=new Float32Array(e.width*e.height);const i=ea(e);var n=Dd(e);if(a_(n,i,c_(e)),"iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"document"in self&&"ontouchend"in self.document){n=new Float32Array(e.width*e.height*4),i.readPixels(0,0,e.width,e.height,i.RGBA,i.FLOAT,n);for(let s=0,r=0;s<t.length;++s,r+=4)t[s]=n[r]}else i.readPixels(0,0,e.width,e.height,i.RED,i.FLOAT,t)}e.g.push(t)}return t}function c_(e){let t=ji(e,2);if(!t){const n=ea(e);t=h_(e);const i=_u(e),s=l_(e);n.texImage2D(n.TEXTURE_2D,0,s,e.width,e.height,0,n.RED,n.FLOAT,i),vu(e)}return t}function ea(e){if(!e.canvas)throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");return e.h||(e.h=Ts(e.canvas.getContext("webgl2"),"You cannot use a canvas that is already bound to a different type of rendering context.")),e.h}function l_(e){if(e=ea(e),!Ko)if(e.getExtension("EXT_color_buffer_float")&&e.getExtension("OES_texture_float_linear")&&e.getExtension("EXT_float_blend"))Ko=e.R32F;else{if(!e.getExtension("EXT_color_buffer_half_float"))throw Error("GPU does not fully support 4-channel float32 or float16 formats");Ko=e.R16F}return Ko}function Dd(e){return e.l||(e.l=new o_),e.l}function h_(e){const t=ea(e);t.viewport(0,0,e.width,e.height),t.activeTexture(t.TEXTURE0);let n=ji(e,2);return n||(n=r_(Dd(e),t,e.m?t.LINEAR:t.NEAREST),e.g.push(n),e.j=!0),t.bindTexture(t.TEXTURE_2D,n),n}function vu(e){e.h.bindTexture(e.h.TEXTURE_2D,null)}var Ko,je=class{constructor(e,t,n,i,s,r,a){this.g=e,this.m=t,this.j=n,this.canvas=i,this.l=s,this.width=r,this.height=a,this.j&&--im===0&&console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources.")}Fa(){return!!ji(this,0)}ka(){return!!ji(this,1)}R(){return!!ji(this,2)}ja(){return(t=ji(e=this,0))||(t=_u(e),t=new Uint8Array(t.map(n=>Math.round(255*n))),e.g.push(t)),t;var e,t}ia(){return _u(this)}N(){return c_(this)}clone(){const e=[];for(const t of this.g){let n;if(t instanceof Uint8Array)n=new Uint8Array(t);else if(t instanceof Float32Array)n=new Float32Array(t);else{if(!(t instanceof WebGLTexture))throw Error(`Type is not supported: ${t}`);{const i=ea(this),s=Dd(this);i.activeTexture(i.TEXTURE1),n=r_(s,i,this.m?i.LINEAR:i.NEAREST),i.bindTexture(i.TEXTURE_2D,n);const r=l_(this);i.texImage2D(i.TEXTURE_2D,0,r,this.width,this.height,0,i.RED,i.FLOAT,null),i.bindTexture(i.TEXTURE_2D,null),a_(s,i,n),KS(s,i,!1,()=>{h_(this),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.drawArrays(i.TRIANGLE_FAN,0,4),vu(this)}),ZS(s),vu(this)}}e.push(n)}return new je(e,this.m,this.R(),this.canvas,this.l,this.width,this.height)}close(){this.j&&ea(this).deleteTexture(ji(this,2)),im=-1}};je.prototype.close=je.prototype.close,je.prototype.clone=je.prototype.clone,je.prototype.getAsWebGLTexture=je.prototype.N,je.prototype.getAsFloat32Array=je.prototype.ia,je.prototype.getAsUint8Array=je.prototype.ja,je.prototype.hasWebGLTexture=je.prototype.R,je.prototype.hasFloat32Array=je.prototype.ka,je.prototype.hasUint8Array=je.prototype.Fa;var im=250;function di(...e){return e.map(([t,n])=>({start:t,end:n}))}const JS=function(e){return class extends e{Ja(){this.i._registerModelResourcesGraphService()}}}((sm=class{constructor(e,t){this.l=!0,this.i=e,this.g=null,this.h=0,this.m=typeof this.i._addIntToInputStream=="function",t!==void 0?this.i.canvas=t:i_()?this.i.canvas=new OffscreenCanvas(1,1):(console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."),this.i.canvas=document.createElement("canvas"))}async initializeGraph(e){const t=await(await fetch(e)).arrayBuffer();e=!(e.endsWith(".pbtxt")||e.endsWith(".textproto")),this.setGraph(new Uint8Array(t),e)}setGraphFromString(e){this.setGraph(new TextEncoder().encode(e),!1)}setGraph(e,t){const n=e.length,i=this.i._malloc(n);this.i.HEAPU8.set(e,i),t?this.i._changeBinaryGraph(n,i):this.i._changeTextGraph(n,i),this.i._free(i)}configureAudio(e,t,n,i,s){this.i._configureAudio||console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'),wt(this,i||"input_audio",r=>{wt(this,s=s||"audio_header",a=>{this.i._configureAudio(r,a,e,t??0,n)})})}setAutoResizeCanvas(e){this.l=e}setAutoRenderToScreen(e){this.i._setAutoRenderToScreen(e)}setGpuBufferVerticalFlip(e){this.i.gpuOriginForWebTexturesIsBottomLeft=e}ca(e){vi(this,"__graph_config__",t=>{e(t)}),wt(this,"__graph_config__",t=>{this.i._getGraphConfig(t,void 0)}),delete this.i.simpleListeners.__graph_config__}attachErrorListener(e){this.i.errorListener=e}attachEmptyPacketListener(e,t){this.i.emptyPacketListeners=this.i.emptyPacketListeners||{},this.i.emptyPacketListeners[e]=t}addAudioToStream(e,t,n){this.addAudioToStreamWithShape(e,0,0,t,n)}addAudioToStreamWithShape(e,t,n,i,s){const r=4*e.length;this.h!==r&&(this.g&&this.i._free(this.g),this.g=this.i._malloc(r),this.h=r),this.i.HEAPF32.set(e,this.g/4),wt(this,i,a=>{this.i._addAudioToInputStream(this.g,t,n,a,s)})}addGpuBufferToStream(e,t,n){wt(this,t,i=>{const[s,r]=Jp(this,e,i);this.i._addBoundTextureToStream(i,s,r,n)})}addBoolToStream(e,t,n){wt(this,t,i=>{this.i._addBoolToInputStream(e,i,n)})}addDoubleToStream(e,t,n){wt(this,t,i=>{this.i._addDoubleToInputStream(e,i,n)})}addFloatToStream(e,t,n){wt(this,t,i=>{this.i._addFloatToInputStream(e,i,n)})}addIntToStream(e,t,n){wt(this,t,i=>{this.i._addIntToInputStream(e,i,n)})}addUintToStream(e,t,n){wt(this,t,i=>{this.i._addUintToInputStream(e,i,n)})}addStringToStream(e,t,n){wt(this,t,i=>{wt(this,e,s=>{this.i._addStringToInputStream(s,i,n)})})}addStringRecordToStream(e,t,n){wt(this,t,i=>{Qp(this,Object.keys(e),s=>{Qp(this,Object.values(e),r=>{this.i._addFlatHashMapToInputStream(s,r,Object.keys(e).length,i,n)})})})}addProtoToStream(e,t,n,i){wt(this,n,s=>{wt(this,t,r=>{const a=this.i._malloc(e.length);this.i.HEAPU8.set(e,a),this.i._addProtoToInputStream(a,e.length,r,s,i),this.i._free(a)})})}addEmptyPacketToStream(e,t){wt(this,e,n=>{this.i._addEmptyPacketToInputStream(n,t)})}addBoolVectorToStream(e,t,n){wt(this,t,i=>{const s=this.i._allocateBoolVector(e.length);if(!s)throw Error("Unable to allocate new bool vector on heap.");for(const r of e)this.i._addBoolVectorEntry(s,r);this.i._addBoolVectorToInputStream(s,i,n)})}addDoubleVectorToStream(e,t,n){wt(this,t,i=>{const s=this.i._allocateDoubleVector(e.length);if(!s)throw Error("Unable to allocate new double vector on heap.");for(const r of e)this.i._addDoubleVectorEntry(s,r);this.i._addDoubleVectorToInputStream(s,i,n)})}addFloatVectorToStream(e,t,n){wt(this,t,i=>{const s=this.i._allocateFloatVector(e.length);if(!s)throw Error("Unable to allocate new float vector on heap.");for(const r of e)this.i._addFloatVectorEntry(s,r);this.i._addFloatVectorToInputStream(s,i,n)})}addIntVectorToStream(e,t,n){wt(this,t,i=>{const s=this.i._allocateIntVector(e.length);if(!s)throw Error("Unable to allocate new int vector on heap.");for(const r of e)this.i._addIntVectorEntry(s,r);this.i._addIntVectorToInputStream(s,i,n)})}addUintVectorToStream(e,t,n){wt(this,t,i=>{const s=this.i._allocateUintVector(e.length);if(!s)throw Error("Unable to allocate new unsigned int vector on heap.");for(const r of e)this.i._addUintVectorEntry(s,r);this.i._addUintVectorToInputStream(s,i,n)})}addStringVectorToStream(e,t,n){wt(this,t,i=>{const s=this.i._allocateStringVector(e.length);if(!s)throw Error("Unable to allocate new string vector on heap.");for(const r of e)wt(this,r,a=>{this.i._addStringVectorEntry(s,a)});this.i._addStringVectorToInputStream(s,i,n)})}addBoolToInputSidePacket(e,t){wt(this,t,n=>{this.i._addBoolToInputSidePacket(e,n)})}addDoubleToInputSidePacket(e,t){wt(this,t,n=>{this.i._addDoubleToInputSidePacket(e,n)})}addFloatToInputSidePacket(e,t){wt(this,t,n=>{this.i._addFloatToInputSidePacket(e,n)})}addIntToInputSidePacket(e,t){wt(this,t,n=>{this.i._addIntToInputSidePacket(e,n)})}addUintToInputSidePacket(e,t){wt(this,t,n=>{this.i._addUintToInputSidePacket(e,n)})}addStringToInputSidePacket(e,t){wt(this,t,n=>{wt(this,e,i=>{this.i._addStringToInputSidePacket(i,n)})})}addProtoToInputSidePacket(e,t,n){wt(this,n,i=>{wt(this,t,s=>{const r=this.i._malloc(e.length);this.i.HEAPU8.set(e,r),this.i._addProtoToInputSidePacket(r,e.length,s,i),this.i._free(r)})})}addBoolVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateBoolVector(e.length);if(!i)throw Error("Unable to allocate new bool vector on heap.");for(const s of e)this.i._addBoolVectorEntry(i,s);this.i._addBoolVectorToInputSidePacket(i,n)})}addDoubleVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateDoubleVector(e.length);if(!i)throw Error("Unable to allocate new double vector on heap.");for(const s of e)this.i._addDoubleVectorEntry(i,s);this.i._addDoubleVectorToInputSidePacket(i,n)})}addFloatVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateFloatVector(e.length);if(!i)throw Error("Unable to allocate new float vector on heap.");for(const s of e)this.i._addFloatVectorEntry(i,s);this.i._addFloatVectorToInputSidePacket(i,n)})}addIntVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateIntVector(e.length);if(!i)throw Error("Unable to allocate new int vector on heap.");for(const s of e)this.i._addIntVectorEntry(i,s);this.i._addIntVectorToInputSidePacket(i,n)})}addUintVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateUintVector(e.length);if(!i)throw Error("Unable to allocate new unsigned int vector on heap.");for(const s of e)this.i._addUintVectorEntry(i,s);this.i._addUintVectorToInputSidePacket(i,n)})}addStringVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateStringVector(e.length);if(!i)throw Error("Unable to allocate new string vector on heap.");for(const s of e)wt(this,s,r=>{this.i._addStringVectorEntry(i,r)});this.i._addStringVectorToInputSidePacket(i,n)})}attachBoolListener(e,t){vi(this,e,t),wt(this,e,n=>{this.i._attachBoolListener(n)})}attachBoolVectorListener(e,t){_s(this,e,t),wt(this,e,n=>{this.i._attachBoolVectorListener(n)})}attachIntListener(e,t){vi(this,e,t),wt(this,e,n=>{this.i._attachIntListener(n)})}attachIntVectorListener(e,t){_s(this,e,t),wt(this,e,n=>{this.i._attachIntVectorListener(n)})}attachUintListener(e,t){vi(this,e,t),wt(this,e,n=>{this.i._attachUintListener(n)})}attachUintVectorListener(e,t){_s(this,e,t),wt(this,e,n=>{this.i._attachUintVectorListener(n)})}attachDoubleListener(e,t){vi(this,e,t),wt(this,e,n=>{this.i._attachDoubleListener(n)})}attachDoubleVectorListener(e,t){_s(this,e,t),wt(this,e,n=>{this.i._attachDoubleVectorListener(n)})}attachFloatListener(e,t){vi(this,e,t),wt(this,e,n=>{this.i._attachFloatListener(n)})}attachFloatVectorListener(e,t){_s(this,e,t),wt(this,e,n=>{this.i._attachFloatVectorListener(n)})}attachStringListener(e,t){vi(this,e,t),wt(this,e,n=>{this.i._attachStringListener(n)})}attachStringVectorListener(e,t){_s(this,e,t),wt(this,e,n=>{this.i._attachStringVectorListener(n)})}attachProtoListener(e,t,n){vi(this,e,t),wt(this,e,i=>{this.i._attachProtoListener(i,n||!1)})}attachProtoVectorListener(e,t,n){_s(this,e,t),wt(this,e,i=>{this.i._attachProtoVectorListener(i,n||!1)})}attachAudioListener(e,t,n){this.i._attachAudioListener||console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'),vi(this,e,(i,s)=>{i=new Float32Array(i.buffer,i.byteOffset,i.length/4),t(i,s)}),wt(this,e,i=>{this.i._attachAudioListener(i,n||!1)})}finishProcessing(){this.i._waitUntilIdle()}closeGraph(){this.i._closeGraph(),this.i.simpleListeners=void 0,this.i.emptyPacketListeners=void 0}},class extends sm{get ga(){return this.i}pa(e,t,n){wt(this,t,i=>{const[s,r]=Jp(this,e,i);this.ga._addBoundTextureAsImageToStream(i,s,r,n)})}Z(e,t){vi(this,e,t),wt(this,e,n=>{this.ga._attachImageListener(n)})}aa(e,t){_s(this,e,t),wt(this,e,n=>{this.ga._attachImageVectorListener(n)})}}));var sm,fi=class extends JS{};async function Jt(e,t,n){return async function(i,s,r,a){return $S(i,s,r,a)}(e,n.canvas??(i_()?void 0:document.createElement("canvas")),t,n)}function u_(e,t,n,i){if(e.U){const r=new Ig;if(n!=null&&n.regionOfInterest){if(!e.oa)throw Error("This task doesn't support region-of-interest.");var s=n.regionOfInterest;if(s.left>=s.right||s.top>=s.bottom)throw Error("Expected RectF with left < right and top < bottom.");if(s.left<0||s.top<0||s.right>1||s.bottom>1)throw Error("Expected RectF values to be in [0,1].");Rt(r,1,(s.left+s.right)/2),Rt(r,2,(s.top+s.bottom)/2),Rt(r,4,s.right-s.left),Rt(r,3,s.bottom-s.top)}else Rt(r,1,.5),Rt(r,2,.5),Rt(r,4,1),Rt(r,3,1);if(n!=null&&n.rotationDegrees){if((n==null?void 0:n.rotationDegrees)%90!=0)throw Error("Expected rotation to be a multiple of 90°.");if(Rt(r,5,-Math.PI*n.rotationDegrees/180),(n==null?void 0:n.rotationDegrees)%180!=0){const[a,o]=s_(t);n=Ie(r,3)*o/a,s=Ie(r,4)*a/o,Rt(r,4,n),Rt(r,3,s)}}e.g.addProtoToStream(r.g(),"mediapipe.NormalizedRect",e.U,i)}e.g.pa(t,e.X,i??performance.now()),e.finishProcessing()}function pi(e,t,n){var i;if((i=e.baseOptions)!=null&&i.g())throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");u_(e,t,n,e.C+1)}function zi(e,t,n,i){var s;if(!((s=e.baseOptions)!=null&&s.g()))throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");u_(e,t,n,i)}function na(e,t,n,i){var s=t.data;const r=t.width,a=r*(t=t.height);if((s instanceof Uint8Array||s instanceof Float32Array)&&s.length!==a)throw Error("Unsupported channel count: "+s.length/a);return e=new je([s],n,!1,e.g.i.canvas,e.P,r,t),i?e.clone():e}var Bn=class extends gu{constructor(e,t,n,i){super(e),this.g=e,this.X=t,this.U=n,this.oa=i,this.P=new o_}l(e,t=!0){if("runningMode"in e&&ue(this.baseOptions,2,Ka(!!e.runningMode&&e.runningMode!=="IMAGE")),e.canvas!==void 0&&this.g.i.canvas!==e.canvas)throw Error("You must create a new task to reset the canvas.");return super.l(e,t)}close(){this.P.close(),super.close()}};Bn.prototype.close=Bn.prototype.close;var Gn=class extends Bn{constructor(e,t){super(new fi(e,t),"image_in","norm_rect_in",!1),this.j={detections:[]},It(e=this.h=new nl,0,1,t=new Re),Rt(this.h,2,.5),Rt(this.h,3,.3)}get baseOptions(){return ee(this.h,Re,1)}set baseOptions(e){It(this.h,0,1,e)}o(e){return"minDetectionConfidence"in e&&Rt(this.h,2,e.minDetectionConfidence??.5),"minSuppressionThreshold"in e&&Rt(this.h,3,e.minSuppressionThreshold??.3),this.l(e)}F(e,t){return this.j={detections:[]},pi(this,e,t),this.j}G(e,t,n){return this.j={detections:[]},zi(this,e,n,t),this.j}m(){var e=new zn;Te(e,"image_in"),Te(e,"norm_rect_in"),ne(e,"detections");const t=new kn;Bi(t,DS,this.h);const n=new En;On(n,2,"mediapipe.tasks.vision.face_detector.FaceDetectorGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect_in"),jt(n,"DETECTIONS:detections"),n.o(t),Qn(e,n),this.g.attachProtoVectorListener("detections",(i,s)=>{for(const r of i)i=Rg(r),this.j.detections.push(e_(i));gt(this,s)}),this.g.attachEmptyPacketListener("detections",i=>{gt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Gn.prototype.detectForVideo=Gn.prototype.G,Gn.prototype.detect=Gn.prototype.F,Gn.prototype.setOptions=Gn.prototype.o,Gn.createFromModelPath=async function(e,t){return Jt(Gn,e,{baseOptions:{modelAssetPath:t}})},Gn.createFromModelBuffer=function(e,t){return Jt(Gn,e,{baseOptions:{modelAssetBuffer:t}})},Gn.createFromOptions=function(e,t){return Jt(Gn,e,t)};var Ud=di([61,146],[146,91],[91,181],[181,84],[84,17],[17,314],[314,405],[405,321],[321,375],[375,291],[61,185],[185,40],[40,39],[39,37],[37,0],[0,267],[267,269],[269,270],[270,409],[409,291],[78,95],[95,88],[88,178],[178,87],[87,14],[14,317],[317,402],[402,318],[318,324],[324,308],[78,191],[191,80],[80,81],[81,82],[82,13],[13,312],[312,311],[311,310],[310,415],[415,308]),Fd=di([263,249],[249,390],[390,373],[373,374],[374,380],[380,381],[381,382],[382,362],[263,466],[466,388],[388,387],[387,386],[386,385],[385,384],[384,398],[398,362]),Nd=di([276,283],[283,282],[282,295],[295,285],[300,293],[293,334],[334,296],[296,336]),d_=di([474,475],[475,476],[476,477],[477,474]),Od=di([33,7],[7,163],[163,144],[144,145],[145,153],[153,154],[154,155],[155,133],[33,246],[246,161],[161,160],[160,159],[159,158],[158,157],[157,173],[173,133]),Bd=di([46,53],[53,52],[52,65],[65,55],[70,63],[63,105],[105,66],[66,107]),f_=di([469,470],[470,471],[471,472],[472,469]),kd=di([10,338],[338,297],[297,332],[332,284],[284,251],[251,389],[389,356],[356,454],[454,323],[323,361],[361,288],[288,397],[397,365],[365,379],[379,378],[378,400],[400,377],[377,152],[152,148],[148,176],[176,149],[149,150],[150,136],[136,172],[172,58],[58,132],[132,93],[93,234],[234,127],[127,162],[162,21],[21,54],[54,103],[103,67],[67,109],[109,10]),p_=[...Ud,...Fd,...Nd,...Od,...Bd,...kd],m_=di([127,34],[34,139],[139,127],[11,0],[0,37],[37,11],[232,231],[231,120],[120,232],[72,37],[37,39],[39,72],[128,121],[121,47],[47,128],[232,121],[121,128],[128,232],[104,69],[69,67],[67,104],[175,171],[171,148],[148,175],[118,50],[50,101],[101,118],[73,39],[39,40],[40,73],[9,151],[151,108],[108,9],[48,115],[115,131],[131,48],[194,204],[204,211],[211,194],[74,40],[40,185],[185,74],[80,42],[42,183],[183,80],[40,92],[92,186],[186,40],[230,229],[229,118],[118,230],[202,212],[212,214],[214,202],[83,18],[18,17],[17,83],[76,61],[61,146],[146,76],[160,29],[29,30],[30,160],[56,157],[157,173],[173,56],[106,204],[204,194],[194,106],[135,214],[214,192],[192,135],[203,165],[165,98],[98,203],[21,71],[71,68],[68,21],[51,45],[45,4],[4,51],[144,24],[24,23],[23,144],[77,146],[146,91],[91,77],[205,50],[50,187],[187,205],[201,200],[200,18],[18,201],[91,106],[106,182],[182,91],[90,91],[91,181],[181,90],[85,84],[84,17],[17,85],[206,203],[203,36],[36,206],[148,171],[171,140],[140,148],[92,40],[40,39],[39,92],[193,189],[189,244],[244,193],[159,158],[158,28],[28,159],[247,246],[246,161],[161,247],[236,3],[3,196],[196,236],[54,68],[68,104],[104,54],[193,168],[168,8],[8,193],[117,228],[228,31],[31,117],[189,193],[193,55],[55,189],[98,97],[97,99],[99,98],[126,47],[47,100],[100,126],[166,79],[79,218],[218,166],[155,154],[154,26],[26,155],[209,49],[49,131],[131,209],[135,136],[136,150],[150,135],[47,126],[126,217],[217,47],[223,52],[52,53],[53,223],[45,51],[51,134],[134,45],[211,170],[170,140],[140,211],[67,69],[69,108],[108,67],[43,106],[106,91],[91,43],[230,119],[119,120],[120,230],[226,130],[130,247],[247,226],[63,53],[53,52],[52,63],[238,20],[20,242],[242,238],[46,70],[70,156],[156,46],[78,62],[62,96],[96,78],[46,53],[53,63],[63,46],[143,34],[34,227],[227,143],[123,117],[117,111],[111,123],[44,125],[125,19],[19,44],[236,134],[134,51],[51,236],[216,206],[206,205],[205,216],[154,153],[153,22],[22,154],[39,37],[37,167],[167,39],[200,201],[201,208],[208,200],[36,142],[142,100],[100,36],[57,212],[212,202],[202,57],[20,60],[60,99],[99,20],[28,158],[158,157],[157,28],[35,226],[226,113],[113,35],[160,159],[159,27],[27,160],[204,202],[202,210],[210,204],[113,225],[225,46],[46,113],[43,202],[202,204],[204,43],[62,76],[76,77],[77,62],[137,123],[123,116],[116,137],[41,38],[38,72],[72,41],[203,129],[129,142],[142,203],[64,98],[98,240],[240,64],[49,102],[102,64],[64,49],[41,73],[73,74],[74,41],[212,216],[216,207],[207,212],[42,74],[74,184],[184,42],[169,170],[170,211],[211,169],[170,149],[149,176],[176,170],[105,66],[66,69],[69,105],[122,6],[6,168],[168,122],[123,147],[147,187],[187,123],[96,77],[77,90],[90,96],[65,55],[55,107],[107,65],[89,90],[90,180],[180,89],[101,100],[100,120],[120,101],[63,105],[105,104],[104,63],[93,137],[137,227],[227,93],[15,86],[86,85],[85,15],[129,102],[102,49],[49,129],[14,87],[87,86],[86,14],[55,8],[8,9],[9,55],[100,47],[47,121],[121,100],[145,23],[23,22],[22,145],[88,89],[89,179],[179,88],[6,122],[122,196],[196,6],[88,95],[95,96],[96,88],[138,172],[172,136],[136,138],[215,58],[58,172],[172,215],[115,48],[48,219],[219,115],[42,80],[80,81],[81,42],[195,3],[3,51],[51,195],[43,146],[146,61],[61,43],[171,175],[175,199],[199,171],[81,82],[82,38],[38,81],[53,46],[46,225],[225,53],[144,163],[163,110],[110,144],[52,65],[65,66],[66,52],[229,228],[228,117],[117,229],[34,127],[127,234],[234,34],[107,108],[108,69],[69,107],[109,108],[108,151],[151,109],[48,64],[64,235],[235,48],[62,78],[78,191],[191,62],[129,209],[209,126],[126,129],[111,35],[35,143],[143,111],[117,123],[123,50],[50,117],[222,65],[65,52],[52,222],[19,125],[125,141],[141,19],[221,55],[55,65],[65,221],[3,195],[195,197],[197,3],[25,7],[7,33],[33,25],[220,237],[237,44],[44,220],[70,71],[71,139],[139,70],[122,193],[193,245],[245,122],[247,130],[130,33],[33,247],[71,21],[21,162],[162,71],[170,169],[169,150],[150,170],[188,174],[174,196],[196,188],[216,186],[186,92],[92,216],[2,97],[97,167],[167,2],[141,125],[125,241],[241,141],[164,167],[167,37],[37,164],[72,38],[38,12],[12,72],[38,82],[82,13],[13,38],[63,68],[68,71],[71,63],[226,35],[35,111],[111,226],[101,50],[50,205],[205,101],[206,92],[92,165],[165,206],[209,198],[198,217],[217,209],[165,167],[167,97],[97,165],[220,115],[115,218],[218,220],[133,112],[112,243],[243,133],[239,238],[238,241],[241,239],[214,135],[135,169],[169,214],[190,173],[173,133],[133,190],[171,208],[208,32],[32,171],[125,44],[44,237],[237,125],[86,87],[87,178],[178,86],[85,86],[86,179],[179,85],[84,85],[85,180],[180,84],[83,84],[84,181],[181,83],[201,83],[83,182],[182,201],[137,93],[93,132],[132,137],[76,62],[62,183],[183,76],[61,76],[76,184],[184,61],[57,61],[61,185],[185,57],[212,57],[57,186],[186,212],[214,207],[207,187],[187,214],[34,143],[143,156],[156,34],[79,239],[239,237],[237,79],[123,137],[137,177],[177,123],[44,1],[1,4],[4,44],[201,194],[194,32],[32,201],[64,102],[102,129],[129,64],[213,215],[215,138],[138,213],[59,166],[166,219],[219,59],[242,99],[99,97],[97,242],[2,94],[94,141],[141,2],[75,59],[59,235],[235,75],[24,110],[110,228],[228,24],[25,130],[130,226],[226,25],[23,24],[24,229],[229,23],[22,23],[23,230],[230,22],[26,22],[22,231],[231,26],[112,26],[26,232],[232,112],[189,190],[190,243],[243,189],[221,56],[56,190],[190,221],[28,56],[56,221],[221,28],[27,28],[28,222],[222,27],[29,27],[27,223],[223,29],[30,29],[29,224],[224,30],[247,30],[30,225],[225,247],[238,79],[79,20],[20,238],[166,59],[59,75],[75,166],[60,75],[75,240],[240,60],[147,177],[177,215],[215,147],[20,79],[79,166],[166,20],[187,147],[147,213],[213,187],[112,233],[233,244],[244,112],[233,128],[128,245],[245,233],[128,114],[114,188],[188,128],[114,217],[217,174],[174,114],[131,115],[115,220],[220,131],[217,198],[198,236],[236,217],[198,131],[131,134],[134,198],[177,132],[132,58],[58,177],[143,35],[35,124],[124,143],[110,163],[163,7],[7,110],[228,110],[110,25],[25,228],[356,389],[389,368],[368,356],[11,302],[302,267],[267,11],[452,350],[350,349],[349,452],[302,303],[303,269],[269,302],[357,343],[343,277],[277,357],[452,453],[453,357],[357,452],[333,332],[332,297],[297,333],[175,152],[152,377],[377,175],[347,348],[348,330],[330,347],[303,304],[304,270],[270,303],[9,336],[336,337],[337,9],[278,279],[279,360],[360,278],[418,262],[262,431],[431,418],[304,408],[408,409],[409,304],[310,415],[415,407],[407,310],[270,409],[409,410],[410,270],[450,348],[348,347],[347,450],[422,430],[430,434],[434,422],[313,314],[314,17],[17,313],[306,307],[307,375],[375,306],[387,388],[388,260],[260,387],[286,414],[414,398],[398,286],[335,406],[406,418],[418,335],[364,367],[367,416],[416,364],[423,358],[358,327],[327,423],[251,284],[284,298],[298,251],[281,5],[5,4],[4,281],[373,374],[374,253],[253,373],[307,320],[320,321],[321,307],[425,427],[427,411],[411,425],[421,313],[313,18],[18,421],[321,405],[405,406],[406,321],[320,404],[404,405],[405,320],[315,16],[16,17],[17,315],[426,425],[425,266],[266,426],[377,400],[400,369],[369,377],[322,391],[391,269],[269,322],[417,465],[465,464],[464,417],[386,257],[257,258],[258,386],[466,260],[260,388],[388,466],[456,399],[399,419],[419,456],[284,332],[332,333],[333,284],[417,285],[285,8],[8,417],[346,340],[340,261],[261,346],[413,441],[441,285],[285,413],[327,460],[460,328],[328,327],[355,371],[371,329],[329,355],[392,439],[439,438],[438,392],[382,341],[341,256],[256,382],[429,420],[420,360],[360,429],[364,394],[394,379],[379,364],[277,343],[343,437],[437,277],[443,444],[444,283],[283,443],[275,440],[440,363],[363,275],[431,262],[262,369],[369,431],[297,338],[338,337],[337,297],[273,375],[375,321],[321,273],[450,451],[451,349],[349,450],[446,342],[342,467],[467,446],[293,334],[334,282],[282,293],[458,461],[461,462],[462,458],[276,353],[353,383],[383,276],[308,324],[324,325],[325,308],[276,300],[300,293],[293,276],[372,345],[345,447],[447,372],[352,345],[345,340],[340,352],[274,1],[1,19],[19,274],[456,248],[248,281],[281,456],[436,427],[427,425],[425,436],[381,256],[256,252],[252,381],[269,391],[391,393],[393,269],[200,199],[199,428],[428,200],[266,330],[330,329],[329,266],[287,273],[273,422],[422,287],[250,462],[462,328],[328,250],[258,286],[286,384],[384,258],[265,353],[353,342],[342,265],[387,259],[259,257],[257,387],[424,431],[431,430],[430,424],[342,353],[353,276],[276,342],[273,335],[335,424],[424,273],[292,325],[325,307],[307,292],[366,447],[447,345],[345,366],[271,303],[303,302],[302,271],[423,266],[266,371],[371,423],[294,455],[455,460],[460,294],[279,278],[278,294],[294,279],[271,272],[272,304],[304,271],[432,434],[434,427],[427,432],[272,407],[407,408],[408,272],[394,430],[430,431],[431,394],[395,369],[369,400],[400,395],[334,333],[333,299],[299,334],[351,417],[417,168],[168,351],[352,280],[280,411],[411,352],[325,319],[319,320],[320,325],[295,296],[296,336],[336,295],[319,403],[403,404],[404,319],[330,348],[348,349],[349,330],[293,298],[298,333],[333,293],[323,454],[454,447],[447,323],[15,16],[16,315],[315,15],[358,429],[429,279],[279,358],[14,15],[15,316],[316,14],[285,336],[336,9],[9,285],[329,349],[349,350],[350,329],[374,380],[380,252],[252,374],[318,402],[402,403],[403,318],[6,197],[197,419],[419,6],[318,319],[319,325],[325,318],[367,364],[364,365],[365,367],[435,367],[367,397],[397,435],[344,438],[438,439],[439,344],[272,271],[271,311],[311,272],[195,5],[5,281],[281,195],[273,287],[287,291],[291,273],[396,428],[428,199],[199,396],[311,271],[271,268],[268,311],[283,444],[444,445],[445,283],[373,254],[254,339],[339,373],[282,334],[334,296],[296,282],[449,347],[347,346],[346,449],[264,447],[447,454],[454,264],[336,296],[296,299],[299,336],[338,10],[10,151],[151,338],[278,439],[439,455],[455,278],[292,407],[407,415],[415,292],[358,371],[371,355],[355,358],[340,345],[345,372],[372,340],[346,347],[347,280],[280,346],[442,443],[443,282],[282,442],[19,94],[94,370],[370,19],[441,442],[442,295],[295,441],[248,419],[419,197],[197,248],[263,255],[255,359],[359,263],[440,275],[275,274],[274,440],[300,383],[383,368],[368,300],[351,412],[412,465],[465,351],[263,467],[467,466],[466,263],[301,368],[368,389],[389,301],[395,378],[378,379],[379,395],[412,351],[351,419],[419,412],[436,426],[426,322],[322,436],[2,164],[164,393],[393,2],[370,462],[462,461],[461,370],[164,0],[0,267],[267,164],[302,11],[11,12],[12,302],[268,12],[12,13],[13,268],[293,300],[300,301],[301,293],[446,261],[261,340],[340,446],[330,266],[266,425],[425,330],[426,423],[423,391],[391,426],[429,355],[355,437],[437,429],[391,327],[327,326],[326,391],[440,457],[457,438],[438,440],[341,382],[382,362],[362,341],[459,457],[457,461],[461,459],[434,430],[430,394],[394,434],[414,463],[463,362],[362,414],[396,369],[369,262],[262,396],[354,461],[461,457],[457,354],[316,403],[403,402],[402,316],[315,404],[404,403],[403,315],[314,405],[405,404],[404,314],[313,406],[406,405],[405,313],[421,418],[418,406],[406,421],[366,401],[401,361],[361,366],[306,408],[408,407],[407,306],[291,409],[409,408],[408,291],[287,410],[410,409],[409,287],[432,436],[436,410],[410,432],[434,416],[416,411],[411,434],[264,368],[368,383],[383,264],[309,438],[438,457],[457,309],[352,376],[376,401],[401,352],[274,275],[275,4],[4,274],[421,428],[428,262],[262,421],[294,327],[327,358],[358,294],[433,416],[416,367],[367,433],[289,455],[455,439],[439,289],[462,370],[370,326],[326,462],[2,326],[326,370],[370,2],[305,460],[460,455],[455,305],[254,449],[449,448],[448,254],[255,261],[261,446],[446,255],[253,450],[450,449],[449,253],[252,451],[451,450],[450,252],[256,452],[452,451],[451,256],[341,453],[453,452],[452,341],[413,464],[464,463],[463,413],[441,413],[413,414],[414,441],[258,442],[442,441],[441,258],[257,443],[443,442],[442,257],[259,444],[444,443],[443,259],[260,445],[445,444],[444,260],[467,342],[342,445],[445,467],[459,458],[458,250],[250,459],[289,392],[392,290],[290,289],[290,328],[328,460],[460,290],[376,433],[433,435],[435,376],[250,290],[290,392],[392,250],[411,416],[416,433],[433,411],[341,463],[463,464],[464,341],[453,464],[464,465],[465,453],[357,465],[465,412],[412,357],[343,412],[412,399],[399,343],[360,363],[363,440],[440,360],[437,399],[399,456],[456,437],[420,456],[456,363],[363,420],[401,435],[435,288],[288,401],[372,383],[383,353],[353,372],[339,255],[255,249],[249,339],[448,261],[261,255],[255,448],[133,243],[243,190],[190,133],[133,155],[155,112],[112,133],[33,246],[246,247],[247,33],[33,130],[130,25],[25,33],[398,384],[384,286],[286,398],[362,398],[398,414],[414,362],[362,463],[463,341],[341,362],[263,359],[359,467],[467,263],[263,249],[249,255],[255,263],[466,467],[467,260],[260,466],[75,60],[60,166],[166,75],[238,239],[239,79],[79,238],[162,127],[127,139],[139,162],[72,11],[11,37],[37,72],[121,232],[232,120],[120,121],[73,72],[72,39],[39,73],[114,128],[128,47],[47,114],[233,232],[232,128],[128,233],[103,104],[104,67],[67,103],[152,175],[175,148],[148,152],[119,118],[118,101],[101,119],[74,73],[73,40],[40,74],[107,9],[9,108],[108,107],[49,48],[48,131],[131,49],[32,194],[194,211],[211,32],[184,74],[74,185],[185,184],[191,80],[80,183],[183,191],[185,40],[40,186],[186,185],[119,230],[230,118],[118,119],[210,202],[202,214],[214,210],[84,83],[83,17],[17,84],[77,76],[76,146],[146,77],[161,160],[160,30],[30,161],[190,56],[56,173],[173,190],[182,106],[106,194],[194,182],[138,135],[135,192],[192,138],[129,203],[203,98],[98,129],[54,21],[21,68],[68,54],[5,51],[51,4],[4,5],[145,144],[144,23],[23,145],[90,77],[77,91],[91,90],[207,205],[205,187],[187,207],[83,201],[201,18],[18,83],[181,91],[91,182],[182,181],[180,90],[90,181],[181,180],[16,85],[85,17],[17,16],[205,206],[206,36],[36,205],[176,148],[148,140],[140,176],[165,92],[92,39],[39,165],[245,193],[193,244],[244,245],[27,159],[159,28],[28,27],[30,247],[247,161],[161,30],[174,236],[236,196],[196,174],[103,54],[54,104],[104,103],[55,193],[193,8],[8,55],[111,117],[117,31],[31,111],[221,189],[189,55],[55,221],[240,98],[98,99],[99,240],[142,126],[126,100],[100,142],[219,166],[166,218],[218,219],[112,155],[155,26],[26,112],[198,209],[209,131],[131,198],[169,135],[135,150],[150,169],[114,47],[47,217],[217,114],[224,223],[223,53],[53,224],[220,45],[45,134],[134,220],[32,211],[211,140],[140,32],[109,67],[67,108],[108,109],[146,43],[43,91],[91,146],[231,230],[230,120],[120,231],[113,226],[226,247],[247,113],[105,63],[63,52],[52,105],[241,238],[238,242],[242,241],[124,46],[46,156],[156,124],[95,78],[78,96],[96,95],[70,46],[46,63],[63,70],[116,143],[143,227],[227,116],[116,123],[123,111],[111,116],[1,44],[44,19],[19,1],[3,236],[236,51],[51,3],[207,216],[216,205],[205,207],[26,154],[154,22],[22,26],[165,39],[39,167],[167,165],[199,200],[200,208],[208,199],[101,36],[36,100],[100,101],[43,57],[57,202],[202,43],[242,20],[20,99],[99,242],[56,28],[28,157],[157,56],[124,35],[35,113],[113,124],[29,160],[160,27],[27,29],[211,204],[204,210],[210,211],[124,113],[113,46],[46,124],[106,43],[43,204],[204,106],[96,62],[62,77],[77,96],[227,137],[137,116],[116,227],[73,41],[41,72],[72,73],[36,203],[203,142],[142,36],[235,64],[64,240],[240,235],[48,49],[49,64],[64,48],[42,41],[41,74],[74,42],[214,212],[212,207],[207,214],[183,42],[42,184],[184,183],[210,169],[169,211],[211,210],[140,170],[170,176],[176,140],[104,105],[105,69],[69,104],[193,122],[122,168],[168,193],[50,123],[123,187],[187,50],[89,96],[96,90],[90,89],[66,65],[65,107],[107,66],[179,89],[89,180],[180,179],[119,101],[101,120],[120,119],[68,63],[63,104],[104,68],[234,93],[93,227],[227,234],[16,15],[15,85],[85,16],[209,129],[129,49],[49,209],[15,14],[14,86],[86,15],[107,55],[55,9],[9,107],[120,100],[100,121],[121,120],[153,145],[145,22],[22,153],[178,88],[88,179],[179,178],[197,6],[6,196],[196,197],[89,88],[88,96],[96,89],[135,138],[138,136],[136,135],[138,215],[215,172],[172,138],[218,115],[115,219],[219,218],[41,42],[42,81],[81,41],[5,195],[195,51],[51,5],[57,43],[43,61],[61,57],[208,171],[171,199],[199,208],[41,81],[81,38],[38,41],[224,53],[53,225],[225,224],[24,144],[144,110],[110,24],[105,52],[52,66],[66,105],[118,229],[229,117],[117,118],[227,34],[34,234],[234,227],[66,107],[107,69],[69,66],[10,109],[109,151],[151,10],[219,48],[48,235],[235,219],[183,62],[62,191],[191,183],[142,129],[129,126],[126,142],[116,111],[111,143],[143,116],[118,117],[117,50],[50,118],[223,222],[222,52],[52,223],[94,19],[19,141],[141,94],[222,221],[221,65],[65,222],[196,3],[3,197],[197,196],[45,220],[220,44],[44,45],[156,70],[70,139],[139,156],[188,122],[122,245],[245,188],[139,71],[71,162],[162,139],[149,170],[170,150],[150,149],[122,188],[188,196],[196,122],[206,216],[216,92],[92,206],[164,2],[2,167],[167,164],[242,141],[141,241],[241,242],[0,164],[164,37],[37,0],[11,72],[72,12],[12,11],[12,38],[38,13],[13,12],[70,63],[63,71],[71,70],[31,226],[226,111],[111,31],[36,101],[101,205],[205,36],[203,206],[206,165],[165,203],[126,209],[209,217],[217,126],[98,165],[165,97],[97,98],[237,220],[220,218],[218,237],[237,239],[239,241],[241,237],[210,214],[214,169],[169,210],[140,171],[171,32],[32,140],[241,125],[125,237],[237,241],[179,86],[86,178],[178,179],[180,85],[85,179],[179,180],[181,84],[84,180],[180,181],[182,83],[83,181],[181,182],[194,201],[201,182],[182,194],[177,137],[137,132],[132,177],[184,76],[76,183],[183,184],[185,61],[61,184],[184,185],[186,57],[57,185],[185,186],[216,212],[212,186],[186,216],[192,214],[214,187],[187,192],[139,34],[34,156],[156,139],[218,79],[79,237],[237,218],[147,123],[123,177],[177,147],[45,44],[44,4],[4,45],[208,201],[201,32],[32,208],[98,64],[64,129],[129,98],[192,213],[213,138],[138,192],[235,59],[59,219],[219,235],[141,242],[242,97],[97,141],[97,2],[2,141],[141,97],[240,75],[75,235],[235,240],[229,24],[24,228],[228,229],[31,25],[25,226],[226,31],[230,23],[23,229],[229,230],[231,22],[22,230],[230,231],[232,26],[26,231],[231,232],[233,112],[112,232],[232,233],[244,189],[189,243],[243,244],[189,221],[221,190],[190,189],[222,28],[28,221],[221,222],[223,27],[27,222],[222,223],[224,29],[29,223],[223,224],[225,30],[30,224],[224,225],[113,247],[247,225],[225,113],[99,60],[60,240],[240,99],[213,147],[147,215],[215,213],[60,20],[20,166],[166,60],[192,187],[187,213],[213,192],[243,112],[112,244],[244,243],[244,233],[233,245],[245,244],[245,128],[128,188],[188,245],[188,114],[114,174],[174,188],[134,131],[131,220],[220,134],[174,217],[217,236],[236,174],[236,198],[198,134],[134,236],[215,177],[177,58],[58,215],[156,143],[143,124],[124,156],[25,110],[110,7],[7,25],[31,228],[228,25],[25,31],[264,356],[356,368],[368,264],[0,11],[11,267],[267,0],[451,452],[452,349],[349,451],[267,302],[302,269],[269,267],[350,357],[357,277],[277,350],[350,452],[452,357],[357,350],[299,333],[333,297],[297,299],[396,175],[175,377],[377,396],[280,347],[347,330],[330,280],[269,303],[303,270],[270,269],[151,9],[9,337],[337,151],[344,278],[278,360],[360,344],[424,418],[418,431],[431,424],[270,304],[304,409],[409,270],[272,310],[310,407],[407,272],[322,270],[270,410],[410,322],[449,450],[450,347],[347,449],[432,422],[422,434],[434,432],[18,313],[313,17],[17,18],[291,306],[306,375],[375,291],[259,387],[387,260],[260,259],[424,335],[335,418],[418,424],[434,364],[364,416],[416,434],[391,423],[423,327],[327,391],[301,251],[251,298],[298,301],[275,281],[281,4],[4,275],[254,373],[373,253],[253,254],[375,307],[307,321],[321,375],[280,425],[425,411],[411,280],[200,421],[421,18],[18,200],[335,321],[321,406],[406,335],[321,320],[320,405],[405,321],[314,315],[315,17],[17,314],[423,426],[426,266],[266,423],[396,377],[377,369],[369,396],[270,322],[322,269],[269,270],[413,417],[417,464],[464,413],[385,386],[386,258],[258,385],[248,456],[456,419],[419,248],[298,284],[284,333],[333,298],[168,417],[417,8],[8,168],[448,346],[346,261],[261,448],[417,413],[413,285],[285,417],[326,327],[327,328],[328,326],[277,355],[355,329],[329,277],[309,392],[392,438],[438,309],[381,382],[382,256],[256,381],[279,429],[429,360],[360,279],[365,364],[364,379],[379,365],[355,277],[277,437],[437,355],[282,443],[443,283],[283,282],[281,275],[275,363],[363,281],[395,431],[431,369],[369,395],[299,297],[297,337],[337,299],[335,273],[273,321],[321,335],[348,450],[450,349],[349,348],[359,446],[446,467],[467,359],[283,293],[293,282],[282,283],[250,458],[458,462],[462,250],[300,276],[276,383],[383,300],[292,308],[308,325],[325,292],[283,276],[276,293],[293,283],[264,372],[372,447],[447,264],[346,352],[352,340],[340,346],[354,274],[274,19],[19,354],[363,456],[456,281],[281,363],[426,436],[436,425],[425,426],[380,381],[381,252],[252,380],[267,269],[269,393],[393,267],[421,200],[200,428],[428,421],[371,266],[266,329],[329,371],[432,287],[287,422],[422,432],[290,250],[250,328],[328,290],[385,258],[258,384],[384,385],[446,265],[265,342],[342,446],[386,387],[387,257],[257,386],[422,424],[424,430],[430,422],[445,342],[342,276],[276,445],[422,273],[273,424],[424,422],[306,292],[292,307],[307,306],[352,366],[366,345],[345,352],[268,271],[271,302],[302,268],[358,423],[423,371],[371,358],[327,294],[294,460],[460,327],[331,279],[279,294],[294,331],[303,271],[271,304],[304,303],[436,432],[432,427],[427,436],[304,272],[272,408],[408,304],[395,394],[394,431],[431,395],[378,395],[395,400],[400,378],[296,334],[334,299],[299,296],[6,351],[351,168],[168,6],[376,352],[352,411],[411,376],[307,325],[325,320],[320,307],[285,295],[295,336],[336,285],[320,319],[319,404],[404,320],[329,330],[330,349],[349,329],[334,293],[293,333],[333,334],[366,323],[323,447],[447,366],[316,15],[15,315],[315,316],[331,358],[358,279],[279,331],[317,14],[14,316],[316,317],[8,285],[285,9],[9,8],[277,329],[329,350],[350,277],[253,374],[374,252],[252,253],[319,318],[318,403],[403,319],[351,6],[6,419],[419,351],[324,318],[318,325],[325,324],[397,367],[367,365],[365,397],[288,435],[435,397],[397,288],[278,344],[344,439],[439,278],[310,272],[272,311],[311,310],[248,195],[195,281],[281,248],[375,273],[273,291],[291,375],[175,396],[396,199],[199,175],[312,311],[311,268],[268,312],[276,283],[283,445],[445,276],[390,373],[373,339],[339,390],[295,282],[282,296],[296,295],[448,449],[449,346],[346,448],[356,264],[264,454],[454,356],[337,336],[336,299],[299,337],[337,338],[338,151],[151,337],[294,278],[278,455],[455,294],[308,292],[292,415],[415,308],[429,358],[358,355],[355,429],[265,340],[340,372],[372,265],[352,346],[346,280],[280,352],[295,442],[442,282],[282,295],[354,19],[19,370],[370,354],[285,441],[441,295],[295,285],[195,248],[248,197],[197,195],[457,440],[440,274],[274,457],[301,300],[300,368],[368,301],[417,351],[351,465],[465,417],[251,301],[301,389],[389,251],[394,395],[395,379],[379,394],[399,412],[412,419],[419,399],[410,436],[436,322],[322,410],[326,2],[2,393],[393,326],[354,370],[370,461],[461,354],[393,164],[164,267],[267,393],[268,302],[302,12],[12,268],[312,268],[268,13],[13,312],[298,293],[293,301],[301,298],[265,446],[446,340],[340,265],[280,330],[330,425],[425,280],[322,426],[426,391],[391,322],[420,429],[429,437],[437,420],[393,391],[391,326],[326,393],[344,440],[440,438],[438,344],[458,459],[459,461],[461,458],[364,434],[434,394],[394,364],[428,396],[396,262],[262,428],[274,354],[354,457],[457,274],[317,316],[316,402],[402,317],[316,315],[315,403],[403,316],[315,314],[314,404],[404,315],[314,313],[313,405],[405,314],[313,421],[421,406],[406,313],[323,366],[366,361],[361,323],[292,306],[306,407],[407,292],[306,291],[291,408],[408,306],[291,287],[287,409],[409,291],[287,432],[432,410],[410,287],[427,434],[434,411],[411,427],[372,264],[264,383],[383,372],[459,309],[309,457],[457,459],[366,352],[352,401],[401,366],[1,274],[274,4],[4,1],[418,421],[421,262],[262,418],[331,294],[294,358],[358,331],[435,433],[433,367],[367,435],[392,289],[289,439],[439,392],[328,462],[462,326],[326,328],[94,2],[2,370],[370,94],[289,305],[305,455],[455,289],[339,254],[254,448],[448,339],[359,255],[255,446],[446,359],[254,253],[253,449],[449,254],[253,252],[252,450],[450,253],[252,256],[256,451],[451,252],[256,341],[341,452],[452,256],[414,413],[413,463],[463,414],[286,441],[441,414],[414,286],[286,258],[258,441],[441,286],[258,257],[257,442],[442,258],[257,259],[259,443],[443,257],[259,260],[260,444],[444,259],[260,467],[467,445],[445,260],[309,459],[459,250],[250,309],[305,289],[289,290],[290,305],[305,290],[290,460],[460,305],[401,376],[376,435],[435,401],[309,250],[250,392],[392,309],[376,411],[411,433],[433,376],[453,341],[341,464],[464,453],[357,453],[453,465],[465,357],[343,357],[357,412],[412,343],[437,343],[343,399],[399,437],[344,360],[360,440],[440,344],[420,437],[437,456],[456,420],[360,420],[420,363],[363,360],[361,401],[401,288],[288,361],[265,372],[372,353],[353,265],[390,339],[339,249],[249,390],[339,448],[448,255],[255,339]);function rm(e){e.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]}}var ye=class extends Bn{constructor(e,t){super(new fi(e,t),"image_in","norm_rect",!1),this.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]},this.outputFacialTransformationMatrixes=this.outputFaceBlendshapes=!1,It(e=this.h=new Og,0,1,t=new Re),this.A=new Ng,It(this.h,0,3,this.A),this.u=new nl,It(this.h,0,2,this.u),os(this.u,4,1),Rt(this.u,2,.5),Rt(this.A,2,.5),Rt(this.h,4,.5)}get baseOptions(){return ee(this.h,Re,1)}set baseOptions(e){It(this.h,0,1,e)}o(e){return"numFaces"in e&&os(this.u,4,e.numFaces??1),"minFaceDetectionConfidence"in e&&Rt(this.u,2,e.minFaceDetectionConfidence??.5),"minTrackingConfidence"in e&&Rt(this.h,4,e.minTrackingConfidence??.5),"minFacePresenceConfidence"in e&&Rt(this.A,2,e.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in e&&(this.outputFaceBlendshapes=!!e.outputFaceBlendshapes),"outputFacialTransformationMatrixes"in e&&(this.outputFacialTransformationMatrixes=!!e.outputFacialTransformationMatrixes),this.l(e)}F(e,t){return rm(this),pi(this,e,t),this.j}G(e,t,n){return rm(this),zi(this,e,n,t),this.j}m(){var e=new zn;Te(e,"image_in"),Te(e,"norm_rect"),ne(e,"face_landmarks");const t=new kn;Bi(t,FS,this.h);const n=new En;On(n,2,"mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),jt(n,"NORM_LANDMARKS:face_landmarks"),n.o(t),Qn(e,n),this.g.attachProtoVectorListener("face_landmarks",(i,s)=>{for(const r of i)i=po(r),this.j.faceLandmarks.push(il(i));gt(this,s)}),this.g.attachEmptyPacketListener("face_landmarks",i=>{gt(this,i)}),this.outputFaceBlendshapes&&(ne(e,"blendshapes"),jt(n,"BLENDSHAPES:blendshapes"),this.g.attachProtoVectorListener("blendshapes",(i,s)=>{if(this.outputFaceBlendshapes)for(const r of i)i=el(r),this.j.faceBlendshapes.push(Ld(i.g()??[]));gt(this,s)}),this.g.attachEmptyPacketListener("blendshapes",i=>{gt(this,i)})),this.outputFacialTransformationMatrixes&&(ne(e,"face_geometry"),jt(n,"FACE_GEOMETRY:face_geometry"),this.g.attachProtoVectorListener("face_geometry",(i,s)=>{if(this.outputFacialTransformationMatrixes)for(const r of i)(i=ee(i=US(r),AS,2))&&this.j.facialTransformationMatrixes.push({rows:Zn(i,1)??0??0,columns:Zn(i,2)??0??0,data:Ks(i,3,Ti,js()).slice()??[]});gt(this,s)}),this.g.attachEmptyPacketListener("face_geometry",i=>{gt(this,i)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};ye.prototype.detectForVideo=ye.prototype.G,ye.prototype.detect=ye.prototype.F,ye.prototype.setOptions=ye.prototype.o,ye.createFromModelPath=function(e,t){return Jt(ye,e,{baseOptions:{modelAssetPath:t}})},ye.createFromModelBuffer=function(e,t){return Jt(ye,e,{baseOptions:{modelAssetBuffer:t}})},ye.createFromOptions=function(e,t){return Jt(ye,e,t)},ye.FACE_LANDMARKS_LIPS=Ud,ye.FACE_LANDMARKS_LEFT_EYE=Fd,ye.FACE_LANDMARKS_LEFT_EYEBROW=Nd,ye.FACE_LANDMARKS_LEFT_IRIS=d_,ye.FACE_LANDMARKS_RIGHT_EYE=Od,ye.FACE_LANDMARKS_RIGHT_EYEBROW=Bd,ye.FACE_LANDMARKS_RIGHT_IRIS=f_,ye.FACE_LANDMARKS_FACE_OVAL=kd,ye.FACE_LANDMARKS_CONTOURS=p_,ye.FACE_LANDMARKS_TESSELATION=m_;var zd=di([0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]);function am(e){e.gestures=[],e.landmarks=[],e.worldLandmarks=[],e.handedness=[]}function om(e){return e.gestures.length===0?{gestures:[],landmarks:[],worldLandmarks:[],handedness:[],handednesses:[]}:{gestures:e.gestures,landmarks:e.landmarks,worldLandmarks:e.worldLandmarks,handedness:e.handedness,handednesses:e.handedness}}function cm(e,t=!0){const n=[];for(const s of e){var i=el(s);e=[];for(const r of i.g())i=t&&Zn(r,1)!=null?Zn(r,1)??0:-1,e.push({score:Ie(r,2)??0,index:i,categoryName:en(Ee(r,3))??""??"",displayName:en(Ee(r,4))??""??""});n.push(e)}return n}var Mn=class extends Bn{constructor(e,t){super(new fi(e,t),"image_in","norm_rect",!1),this.gestures=[],this.landmarks=[],this.worldLandmarks=[],this.handedness=[],It(e=this.j=new zg,0,1,t=new Re),this.u=new wd,It(this.j,0,2,this.u),this.D=new Td,It(this.u,0,3,this.D),this.A=new kg,It(this.u,0,2,this.A),this.h=new NS,It(this.j,0,3,this.h),Rt(this.A,2,.5),Rt(this.u,4,.5),Rt(this.D,2,.5)}get baseOptions(){return ee(this.j,Re,1)}set baseOptions(e){It(this.j,0,1,e)}o(e){var s,r,a,o;if(os(this.A,3,e.numHands??1),"minHandDetectionConfidence"in e&&Rt(this.A,2,e.minHandDetectionConfidence??.5),"minTrackingConfidence"in e&&Rt(this.u,4,e.minTrackingConfidence??.5),"minHandPresenceConfidence"in e&&Rt(this.D,2,e.minHandPresenceConfidence??.5),e.cannedGesturesClassifierOptions){var t=new Cr,n=t,i=mu(e.cannedGesturesClassifierOptions,(s=ee(this.h,Cr,3))==null?void 0:s.l());It(n,0,2,i),It(this.h,0,3,t)}else e.cannedGesturesClassifierOptions===void 0&&((r=ee(this.h,Cr,3))==null||r.g());return e.customGesturesClassifierOptions?(It(n=t=new Cr,0,2,i=mu(e.customGesturesClassifierOptions,(a=ee(this.h,Cr,4))==null?void 0:a.l())),It(this.h,0,4,t)):e.customGesturesClassifierOptions===void 0&&((o=ee(this.h,Cr,4))==null||o.g()),this.l(e)}Ha(e,t){return am(this),pi(this,e,t),om(this)}Ia(e,t,n){return am(this),zi(this,e,n,t),om(this)}m(){var e=new zn;Te(e,"image_in"),Te(e,"norm_rect"),ne(e,"hand_gestures"),ne(e,"hand_landmarks"),ne(e,"world_hand_landmarks"),ne(e,"handedness");const t=new kn;Bi(t,OS,this.j);const n=new En;On(n,2,"mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),jt(n,"HAND_GESTURES:hand_gestures"),jt(n,"LANDMARKS:hand_landmarks"),jt(n,"WORLD_LANDMARKS:world_hand_landmarks"),jt(n,"HANDEDNESS:handedness"),n.o(t),Qn(e,n),this.g.attachProtoVectorListener("hand_landmarks",(i,s)=>{for(const r of i){i=po(r);const a=[];for(const o of as(i,Lg,1))a.push({x:Ie(o,1)??0,y:Ie(o,2)??0,z:Ie(o,3)??0,visibility:Ie(o,4)??0});this.landmarks.push(a)}gt(this,s)}),this.g.attachEmptyPacketListener("hand_landmarks",i=>{gt(this,i)}),this.g.attachProtoVectorListener("world_hand_landmarks",(i,s)=>{for(const r of i){i=Br(r);const a=[];for(const o of as(i,Pg,1))a.push({x:Ie(o,1)??0,y:Ie(o,2)??0,z:Ie(o,3)??0,visibility:Ie(o,4)??0});this.worldLandmarks.push(a)}gt(this,s)}),this.g.attachEmptyPacketListener("world_hand_landmarks",i=>{gt(this,i)}),this.g.attachProtoVectorListener("hand_gestures",(i,s)=>{this.gestures.push(...cm(i,!1)),gt(this,s)}),this.g.attachEmptyPacketListener("hand_gestures",i=>{gt(this,i)}),this.g.attachProtoVectorListener("handedness",(i,s)=>{this.handedness.push(...cm(i)),gt(this,s)}),this.g.attachEmptyPacketListener("handedness",i=>{gt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};function lm(e){return{landmarks:e.landmarks,worldLandmarks:e.worldLandmarks,handednesses:e.handedness,handedness:e.handedness}}Mn.prototype.recognizeForVideo=Mn.prototype.Ia,Mn.prototype.recognize=Mn.prototype.Ha,Mn.prototype.setOptions=Mn.prototype.o,Mn.createFromModelPath=function(e,t){return Jt(Mn,e,{baseOptions:{modelAssetPath:t}})},Mn.createFromModelBuffer=function(e,t){return Jt(Mn,e,{baseOptions:{modelAssetBuffer:t}})},Mn.createFromOptions=function(e,t){return Jt(Mn,e,t)},Mn.HAND_CONNECTIONS=zd;var wn=class extends Bn{constructor(e,t){super(new fi(e,t),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.handedness=[],It(e=this.h=new wd,0,1,t=new Re),this.u=new Td,It(this.h,0,3,this.u),this.j=new kg,It(this.h,0,2,this.j),os(this.j,3,1),Rt(this.j,2,.5),Rt(this.u,2,.5),Rt(this.h,4,.5)}get baseOptions(){return ee(this.h,Re,1)}set baseOptions(e){It(this.h,0,1,e)}o(e){return"numHands"in e&&os(this.j,3,e.numHands??1),"minHandDetectionConfidence"in e&&Rt(this.j,2,e.minHandDetectionConfidence??.5),"minTrackingConfidence"in e&&Rt(this.h,4,e.minTrackingConfidence??.5),"minHandPresenceConfidence"in e&&Rt(this.u,2,e.minHandPresenceConfidence??.5),this.l(e)}F(e,t){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],pi(this,e,t),lm(this)}G(e,t,n){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],zi(this,e,n,t),lm(this)}m(){var e=new zn;Te(e,"image_in"),Te(e,"norm_rect"),ne(e,"hand_landmarks"),ne(e,"world_hand_landmarks"),ne(e,"handedness");const t=new kn;Bi(t,BS,this.h);const n=new En;On(n,2,"mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),jt(n,"LANDMARKS:hand_landmarks"),jt(n,"WORLD_LANDMARKS:world_hand_landmarks"),jt(n,"HANDEDNESS:handedness"),n.o(t),Qn(e,n),this.g.attachProtoVectorListener("hand_landmarks",(i,s)=>{for(const r of i)i=po(r),this.landmarks.push(il(i));gt(this,s)}),this.g.attachEmptyPacketListener("hand_landmarks",i=>{gt(this,i)}),this.g.attachProtoVectorListener("world_hand_landmarks",(i,s)=>{for(const r of i)i=Br(r),this.worldLandmarks.push(Ga(i));gt(this,s)}),this.g.attachEmptyPacketListener("world_hand_landmarks",i=>{gt(this,i)}),this.g.attachProtoVectorListener("handedness",(i,s)=>{var r=this.handedness,a=r.push;const o=[];for(const c of i){i=el(c);const l=[];for(const h of i.g())l.push({score:Ie(h,2)??0,index:Zn(h,1)??0??-1,categoryName:en(Ee(h,3))??""??"",displayName:en(Ee(h,4))??""??""});o.push(l)}a.call(r,...o),gt(this,s)}),this.g.attachEmptyPacketListener("handedness",i=>{gt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};wn.prototype.detectForVideo=wn.prototype.G,wn.prototype.detect=wn.prototype.F,wn.prototype.setOptions=wn.prototype.o,wn.createFromModelPath=function(e,t){return Jt(wn,e,{baseOptions:{modelAssetPath:t}})},wn.createFromModelBuffer=function(e,t){return Jt(wn,e,{baseOptions:{modelAssetBuffer:t}})},wn.createFromOptions=function(e,t){return Jt(wn,e,t)},wn.HAND_CONNECTIONS=zd;var g_=di([0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]);function hm(e){e.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]}}function um(e){try{if(!e.D)return e.h;e.D(e.h)}finally{rl(e)}}function Zo(e,t){e=po(e),t.push(il(e))}var ve=class extends Bn{constructor(e,t){super(new fi(e,t),"input_frames_image",null,!1),this.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]},this.outputPoseSegmentationMasks=this.outputFaceBlendshapes=!1,It(e=this.j=new Xg,0,1,t=new Re),this.I=new Td,It(this.j,0,2,this.I),this.W=new kS,It(this.j,0,3,this.W),this.u=new nl,It(this.j,0,4,this.u),this.O=new Ng,It(this.j,0,5,this.O),this.A=new Gg,It(this.j,0,6,this.A),this.M=new Wg,It(this.j,0,7,this.M),Rt(this.u,2,.5),Rt(this.u,3,.3),Rt(this.O,2,.5),Rt(this.A,2,.5),Rt(this.A,3,.3),Rt(this.M,2,.5),Rt(this.I,2,.5)}get baseOptions(){return ee(this.j,Re,1)}set baseOptions(e){It(this.j,0,1,e)}o(e){return"minFaceDetectionConfidence"in e&&Rt(this.u,2,e.minFaceDetectionConfidence??.5),"minFaceSuppressionThreshold"in e&&Rt(this.u,3,e.minFaceSuppressionThreshold??.3),"minFacePresenceConfidence"in e&&Rt(this.O,2,e.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in e&&(this.outputFaceBlendshapes=!!e.outputFaceBlendshapes),"minPoseDetectionConfidence"in e&&Rt(this.A,2,e.minPoseDetectionConfidence??.5),"minPoseSuppressionThreshold"in e&&Rt(this.A,3,e.minPoseSuppressionThreshold??.3),"minPosePresenceConfidence"in e&&Rt(this.M,2,e.minPosePresenceConfidence??.5),"outputPoseSegmentationMasks"in e&&(this.outputPoseSegmentationMasks=!!e.outputPoseSegmentationMasks),"minHandLandmarksConfidence"in e&&Rt(this.I,2,e.minHandLandmarksConfidence??.5),this.l(e)}F(e,t,n){const i=typeof t!="function"?t:{};return this.D=typeof t=="function"?t:n,hm(this),pi(this,e,i),um(this)}G(e,t,n,i){const s=typeof n!="function"?n:{};return this.D=typeof n=="function"?n:i,hm(this),zi(this,e,s,t),um(this)}m(){var e=new zn;Te(e,"input_frames_image"),ne(e,"pose_landmarks"),ne(e,"pose_world_landmarks"),ne(e,"face_landmarks"),ne(e,"left_hand_landmarks"),ne(e,"left_hand_world_landmarks"),ne(e,"right_hand_landmarks"),ne(e,"right_hand_world_landmarks");const t=new kn,n=new Fp;On(n,1,"type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"),function(s,r){if(r!=null)if(Array.isArray(r))ue(s,2,Gc(r,0,Za));else{if(!(typeof r=="string"||r instanceof Pi||Yu(r)))throw Error("invalid value in Any.value field: "+r+" expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");xs(s,2,$u(r,!1),rr())}}(n,this.j.g());const i=new En;On(i,2,"mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"),cd(i,8,Fp,n),Me(i,"IMAGE:input_frames_image"),jt(i,"POSE_LANDMARKS:pose_landmarks"),jt(i,"POSE_WORLD_LANDMARKS:pose_world_landmarks"),jt(i,"FACE_LANDMARKS:face_landmarks"),jt(i,"LEFT_HAND_LANDMARKS:left_hand_landmarks"),jt(i,"LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"),jt(i,"RIGHT_HAND_LANDMARKS:right_hand_landmarks"),jt(i,"RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"),i.o(t),Qn(e,i),sl(this,e),this.g.attachProtoListener("pose_landmarks",(s,r)=>{Zo(s,this.h.poseLandmarks),gt(this,r)}),this.g.attachEmptyPacketListener("pose_landmarks",s=>{gt(this,s)}),this.g.attachProtoListener("pose_world_landmarks",(s,r)=>{var a=this.h.poseWorldLandmarks;s=Br(s),a.push(Ga(s)),gt(this,r)}),this.g.attachEmptyPacketListener("pose_world_landmarks",s=>{gt(this,s)}),this.outputPoseSegmentationMasks&&(jt(i,"POSE_SEGMENTATION_MASK:pose_segmentation_mask"),ta(this,"pose_segmentation_mask"),this.g.Z("pose_segmentation_mask",(s,r)=>{this.h.poseSegmentationMasks=[na(this,s,!0,!this.D)],gt(this,r)}),this.g.attachEmptyPacketListener("pose_segmentation_mask",s=>{this.h.poseSegmentationMasks=[],gt(this,s)})),this.g.attachProtoListener("face_landmarks",(s,r)=>{Zo(s,this.h.faceLandmarks),gt(this,r)}),this.g.attachEmptyPacketListener("face_landmarks",s=>{gt(this,s)}),this.outputFaceBlendshapes&&(ne(e,"extra_blendshapes"),jt(i,"FACE_BLENDSHAPES:extra_blendshapes"),this.g.attachProtoListener("extra_blendshapes",(s,r)=>{var a=this.h.faceBlendshapes;this.outputFaceBlendshapes&&(s=el(s),a.push(Ld(s.g()??[]))),gt(this,r)}),this.g.attachEmptyPacketListener("extra_blendshapes",s=>{gt(this,s)})),this.g.attachProtoListener("left_hand_landmarks",(s,r)=>{Zo(s,this.h.leftHandLandmarks),gt(this,r)}),this.g.attachEmptyPacketListener("left_hand_landmarks",s=>{gt(this,s)}),this.g.attachProtoListener("left_hand_world_landmarks",(s,r)=>{var a=this.h.leftHandWorldLandmarks;s=Br(s),a.push(Ga(s)),gt(this,r)}),this.g.attachEmptyPacketListener("left_hand_world_landmarks",s=>{gt(this,s)}),this.g.attachProtoListener("right_hand_landmarks",(s,r)=>{Zo(s,this.h.rightHandLandmarks),gt(this,r)}),this.g.attachEmptyPacketListener("right_hand_landmarks",s=>{gt(this,s)}),this.g.attachProtoListener("right_hand_world_landmarks",(s,r)=>{var a=this.h.rightHandWorldLandmarks;s=Br(s),a.push(Ga(s)),gt(this,r)}),this.g.attachEmptyPacketListener("right_hand_world_landmarks",s=>{gt(this,s)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};ve.prototype.detectForVideo=ve.prototype.G,ve.prototype.detect=ve.prototype.F,ve.prototype.setOptions=ve.prototype.o,ve.createFromModelPath=function(e,t){return Jt(ve,e,{baseOptions:{modelAssetPath:t}})},ve.createFromModelBuffer=function(e,t){return Jt(ve,e,{baseOptions:{modelAssetBuffer:t}})},ve.createFromOptions=function(e,t){return Jt(ve,e,t)},ve.HAND_CONNECTIONS=zd,ve.POSE_CONNECTIONS=g_,ve.FACE_LANDMARKS_LIPS=Ud,ve.FACE_LANDMARKS_LEFT_EYE=Fd,ve.FACE_LANDMARKS_LEFT_EYEBROW=Nd,ve.FACE_LANDMARKS_LEFT_IRIS=d_,ve.FACE_LANDMARKS_RIGHT_EYE=Od,ve.FACE_LANDMARKS_RIGHT_EYEBROW=Bd,ve.FACE_LANDMARKS_RIGHT_IRIS=f_,ve.FACE_LANDMARKS_FACE_OVAL=kd,ve.FACE_LANDMARKS_CONTOURS=p_,ve.FACE_LANDMARKS_TESSELATION=m_;var Wn=class extends Bn{constructor(e,t){super(new fi(e,t),"input_image","norm_rect",!0),this.j={classifications:[]},It(e=this.h=new Yg,0,1,t=new Re)}get baseOptions(){return ee(this.h,Re,1)}set baseOptions(e){It(this.h,0,1,e)}o(e){return It(this.h,0,2,mu(e,ee(this.h,bd,2))),this.l(e)}sa(e,t){return this.j={classifications:[]},pi(this,e,t),this.j}ta(e,t,n){return this.j={classifications:[]},zi(this,e,n,t),this.j}m(){var e=new zn;Te(e,"input_image"),Te(e,"norm_rect"),ne(e,"classifications");const t=new kn;Bi(t,zS,this.h);const n=new En;On(n,2,"mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"),Me(n,"IMAGE:input_image"),Me(n,"NORM_RECT:norm_rect"),jt(n,"CLASSIFICATIONS:classifications"),n.o(t),Qn(e,n),this.g.attachProtoListener("classifications",(i,s)=>{this.j=YS(CS(i)),gt(this,s)}),this.g.attachEmptyPacketListener("classifications",i=>{gt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Wn.prototype.classifyForVideo=Wn.prototype.ta,Wn.prototype.classify=Wn.prototype.sa,Wn.prototype.setOptions=Wn.prototype.o,Wn.createFromModelPath=function(e,t){return Jt(Wn,e,{baseOptions:{modelAssetPath:t}})},Wn.createFromModelBuffer=function(e,t){return Jt(Wn,e,{baseOptions:{modelAssetBuffer:t}})},Wn.createFromOptions=function(e,t){return Jt(Wn,e,t)};var Cn=class extends Bn{constructor(e,t){super(new fi(e,t),"image_in","norm_rect",!0),this.h=new qg,this.embeddings={embeddings:[]},It(e=this.h,0,1,t=new Re)}get baseOptions(){return ee(this.h,Re,1)}set baseOptions(e){It(this.h,0,1,e)}o(e){var t=this.h,n=ee(this.h,Wp,2);return n=n?n.clone():new Wp,e.l2Normalize!==void 0?ue(n,1,Ka(e.l2Normalize)):"l2Normalize"in e&&ue(n,1),e.quantize!==void 0?ue(n,2,Ka(e.quantize)):"quantize"in e&&ue(n,2),It(t,0,2,n),this.l(e)}za(e,t){return pi(this,e,t),this.embeddings}Aa(e,t,n){return zi(this,e,n,t),this.embeddings}m(){var e=new zn;Te(e,"image_in"),Te(e,"norm_rect"),ne(e,"embeddings_out");const t=new kn;Bi(t,VS,this.h);const n=new En;On(n,2,"mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),jt(n,"EMBEDDINGS:embeddings_out"),n.o(t),Qn(e,n),this.g.attachProtoListener("embeddings_out",(i,s)=>{i=LS(i),this.embeddings=function(r){return{embeddings:as(r,PS,1).map(a=>{var l,h;const o={headIndex:Zn(a,3)??0??-1,headName:en(Ee(a,4))??""??""};var c=a.v;return W0(c,0|c[bt],Gp,Zl(a,1))!==void 0?(a=Ks(a=ee(a,Gp,Zl(a,1),void 0),1,Ti,js()),o.floatEmbedding=a.slice()):(c=new Uint8Array(0),o.quantizedEmbedding=((h=(l=ee(a,RS,Zl(a,2),void 0))==null?void 0:l.na())==null?void 0:h.h())??c),o}),timestampMs:t_(Ee(r,2,void 0,void 0,bc)??k0)}}(i),gt(this,s)}),this.g.attachEmptyPacketListener("embeddings_out",i=>{gt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Cn.cosineSimilarity=function(e,t){if(e.floatEmbedding&&t.floatEmbedding)e=Kp(e.floatEmbedding,t.floatEmbedding);else{if(!e.quantizedEmbedding||!t.quantizedEmbedding)throw Error("Cannot compute cosine similarity between quantized and float embeddings.");e=Kp(jp(e.quantizedEmbedding),jp(t.quantizedEmbedding))}return e},Cn.prototype.embedForVideo=Cn.prototype.Aa,Cn.prototype.embed=Cn.prototype.za,Cn.prototype.setOptions=Cn.prototype.o,Cn.createFromModelPath=function(e,t){return Jt(Cn,e,{baseOptions:{modelAssetPath:t}})},Cn.createFromModelBuffer=function(e,t){return Jt(Cn,e,{baseOptions:{modelAssetBuffer:t}})},Cn.createFromOptions=function(e,t){return Jt(Cn,e,t)};var xu=class{constructor(e,t,n){this.confidenceMasks=e,this.categoryMask=t,this.qualityScores=n}close(){var e,t;(e=this.confidenceMasks)==null||e.forEach(n=>{n.close()}),(t=this.categoryMask)==null||t.close()}};function QS(e){var n,i;const t=function(s){return as(s,En,1)}(e.ca()).filter(s=>(en(Ee(s,1))??"").includes("mediapipe.tasks.TensorsToSegmentationCalculator"));if(e.u=[],t.length>1)throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");t.length===1&&(((i=(n=ee(t[0],kn,7))==null?void 0:n.j())==null?void 0:i.g())??new Map).forEach((s,r)=>{e.u[Number(r)]=en(Ee(s,1))??""})}function dm(e){e.categoryMask=void 0,e.confidenceMasks=void 0,e.qualityScores=void 0}function fm(e){try{const t=new xu(e.confidenceMasks,e.categoryMask,e.qualityScores);if(!e.j)return t;e.j(t)}finally{rl(e)}}xu.prototype.close=xu.prototype.close;var xn=class extends Bn{constructor(e,t){super(new fi(e,t),"image_in","norm_rect",!1),this.u=[],this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new Pd,this.A=new $g,It(this.h,0,3,this.A),It(e=this.h,0,1,t=new Re)}get baseOptions(){return ee(this.h,Re,1)}set baseOptions(e){It(this.h,0,1,e)}o(e){return e.displayNamesLocale!==void 0?ue(this.h,2,ho(e.displayNamesLocale)):"displayNamesLocale"in e&&ue(this.h,2),"outputCategoryMask"in e&&(this.outputCategoryMask=e.outputCategoryMask??!1),"outputConfidenceMasks"in e&&(this.outputConfidenceMasks=e.outputConfidenceMasks??!0),super.l(e)}L(){QS(this)}segment(e,t,n){const i=typeof t!="function"?t:{};return this.j=typeof t=="function"?t:n,dm(this),pi(this,e,i),fm(this)}La(e,t,n,i){const s=typeof n!="function"?n:{};return this.j=typeof n=="function"?n:i,dm(this),zi(this,e,s,t),fm(this)}Da(){return this.u}m(){var e=new zn;Te(e,"image_in"),Te(e,"norm_rect");const t=new kn;Bi(t,Kg,this.h);const n=new En;On(n,2,"mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),n.o(t),Qn(e,n),sl(this,e),this.outputConfidenceMasks&&(ne(e,"confidence_masks"),jt(n,"CONFIDENCE_MASKS:confidence_masks"),ta(this,"confidence_masks"),this.g.aa("confidence_masks",(i,s)=>{this.confidenceMasks=i.map(r=>na(this,r,!0,!this.j)),gt(this,s)}),this.g.attachEmptyPacketListener("confidence_masks",i=>{this.confidenceMasks=[],gt(this,i)})),this.outputCategoryMask&&(ne(e,"category_mask"),jt(n,"CATEGORY_MASK:category_mask"),ta(this,"category_mask"),this.g.Z("category_mask",(i,s)=>{this.categoryMask=na(this,i,!1,!this.j),gt(this,s)}),this.g.attachEmptyPacketListener("category_mask",i=>{this.categoryMask=void 0,gt(this,i)})),ne(e,"quality_scores"),jt(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",(i,s)=>{this.qualityScores=i,gt(this,s)}),this.g.attachEmptyPacketListener("quality_scores",i=>{this.categoryMask=void 0,gt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};xn.prototype.getLabels=xn.prototype.Da,xn.prototype.segmentForVideo=xn.prototype.La,xn.prototype.segment=xn.prototype.segment,xn.prototype.setOptions=xn.prototype.o,xn.createFromModelPath=function(e,t){return Jt(xn,e,{baseOptions:{modelAssetPath:t}})},xn.createFromModelBuffer=function(e,t){return Jt(xn,e,{baseOptions:{modelAssetBuffer:t}})},xn.createFromOptions=function(e,t){return Jt(xn,e,t)};var Mu=class{constructor(e,t,n){this.confidenceMasks=e,this.categoryMask=t,this.qualityScores=n}close(){var e,t;(e=this.confidenceMasks)==null||e.forEach(n=>{n.close()}),(t=this.categoryMask)==null||t.close()}};Mu.prototype.close=Mu.prototype.close;var xi=class extends Bn{constructor(e,t){super(new fi(e,t),"image_in","norm_rect_in",!1),this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new Pd,this.u=new $g,It(this.h,0,3,this.u),It(e=this.h,0,1,t=new Re)}get baseOptions(){return ee(this.h,Re,1)}set baseOptions(e){It(this.h,0,1,e)}o(e){return"outputCategoryMask"in e&&(this.outputCategoryMask=e.outputCategoryMask??!1),"outputConfidenceMasks"in e&&(this.outputConfidenceMasks=e.outputConfidenceMasks??!0),super.l(e)}segment(e,t,n,i){const s=typeof n!="function"?n:{};if(this.j=typeof n=="function"?n:i,this.qualityScores=this.categoryMask=this.confidenceMasks=void 0,n=this.C+1,i=new Zg,t.keypoint&&t.scribble)throw Error("Cannot provide both keypoint and scribble.");if(t.keypoint){var r=new eh;xs(r,3,Ka(!0),!1),xs(r,1,za(t.keypoint.x),0),xs(r,2,za(t.keypoint.y),0),Va(i,1,pu,r)}else{if(!t.scribble)throw Error("Must provide either a keypoint or a scribble.");{const o=new GS;for(r of t.scribble)xs(t=new eh,3,Ka(!0),!1),xs(t,1,za(r.x),0),xs(t,2,za(r.y),0),cd(o,1,eh,t);Va(i,2,pu,o)}}this.g.addProtoToStream(i.g(),"mediapipe.tasks.vision.interactive_segmenter.proto.RegionOfInterest","roi_in",n),pi(this,e,s);t:{try{const o=new Mu(this.confidenceMasks,this.categoryMask,this.qualityScores);if(!this.j){var a=o;break t}this.j(o)}finally{rl(this)}a=void 0}return a}m(){var e=new zn;Te(e,"image_in"),Te(e,"roi_in"),Te(e,"norm_rect_in");const t=new kn;Bi(t,Kg,this.h);const n=new En;On(n,2,"mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraphV2"),Me(n,"IMAGE:image_in"),Me(n,"ROI:roi_in"),Me(n,"NORM_RECT:norm_rect_in"),n.o(t),Qn(e,n),sl(this,e),this.outputConfidenceMasks&&(ne(e,"confidence_masks"),jt(n,"CONFIDENCE_MASKS:confidence_masks"),ta(this,"confidence_masks"),this.g.aa("confidence_masks",(i,s)=>{this.confidenceMasks=i.map(r=>na(this,r,!0,!this.j)),gt(this,s)}),this.g.attachEmptyPacketListener("confidence_masks",i=>{this.confidenceMasks=[],gt(this,i)})),this.outputCategoryMask&&(ne(e,"category_mask"),jt(n,"CATEGORY_MASK:category_mask"),ta(this,"category_mask"),this.g.Z("category_mask",(i,s)=>{this.categoryMask=na(this,i,!1,!this.j),gt(this,s)}),this.g.attachEmptyPacketListener("category_mask",i=>{this.categoryMask=void 0,gt(this,i)})),ne(e,"quality_scores"),jt(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",(i,s)=>{this.qualityScores=i,gt(this,s)}),this.g.attachEmptyPacketListener("quality_scores",i=>{this.categoryMask=void 0,gt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};xi.prototype.segment=xi.prototype.segment,xi.prototype.setOptions=xi.prototype.o,xi.createFromModelPath=function(e,t){return Jt(xi,e,{baseOptions:{modelAssetPath:t}})},xi.createFromModelBuffer=function(e,t){return Jt(xi,e,{baseOptions:{modelAssetBuffer:t}})},xi.createFromOptions=function(e,t){return Jt(xi,e,t)};var Xn=class extends Bn{constructor(e,t){super(new fi(e,t),"input_frame_gpu","norm_rect",!1),this.j={detections:[]},It(e=this.h=new Jg,0,1,t=new Re)}get baseOptions(){return ee(this.h,Re,1)}set baseOptions(e){It(this.h,0,1,e)}o(e){return e.displayNamesLocale!==void 0?ue(this.h,2,ho(e.displayNamesLocale)):"displayNamesLocale"in e&&ue(this.h,2),e.maxResults!==void 0?os(this.h,3,e.maxResults):"maxResults"in e&&ue(this.h,3),e.scoreThreshold!==void 0?Rt(this.h,4,e.scoreThreshold):"scoreThreshold"in e&&ue(this.h,4),e.categoryAllowlist!==void 0?Tc(this.h,5,e.categoryAllowlist):"categoryAllowlist"in e&&ue(this.h,5),e.categoryDenylist!==void 0?Tc(this.h,6,e.categoryDenylist):"categoryDenylist"in e&&ue(this.h,6),this.l(e)}F(e,t){return this.j={detections:[]},pi(this,e,t),this.j}G(e,t,n){return this.j={detections:[]},zi(this,e,n,t),this.j}m(){var e=new zn;Te(e,"input_frame_gpu"),Te(e,"norm_rect"),ne(e,"detections");const t=new kn;Bi(t,WS,this.h);const n=new En;On(n,2,"mediapipe.tasks.vision.ObjectDetectorGraph"),Me(n,"IMAGE:input_frame_gpu"),Me(n,"NORM_RECT:norm_rect"),jt(n,"DETECTIONS:detections"),n.o(t),Qn(e,n),this.g.attachProtoVectorListener("detections",(i,s)=>{for(const r of i)i=Rg(r),this.j.detections.push(e_(i));gt(this,s)}),this.g.attachEmptyPacketListener("detections",i=>{gt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Xn.prototype.detectForVideo=Xn.prototype.G,Xn.prototype.detect=Xn.prototype.F,Xn.prototype.setOptions=Xn.prototype.o,Xn.createFromModelPath=async function(e,t){return Jt(Xn,e,{baseOptions:{modelAssetPath:t}})},Xn.createFromModelBuffer=function(e,t){return Jt(Xn,e,{baseOptions:{modelAssetBuffer:t}})},Xn.createFromOptions=function(e,t){return Jt(Xn,e,t)};var yu=class{constructor(e,t,n){this.landmarks=e,this.worldLandmarks=t,this.segmentationMasks=n}close(){var e;(e=this.segmentationMasks)==null||e.forEach(t=>{t.close()})}};function pm(e){e.landmarks=[],e.worldLandmarks=[],e.segmentationMasks=void 0}function mm(e){try{const t=new yu(e.landmarks,e.worldLandmarks,e.segmentationMasks);if(!e.u)return t;e.u(t)}finally{rl(e)}}yu.prototype.close=yu.prototype.close;var Rn=class extends Bn{constructor(e,t){super(new fi(e,t),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.outputSegmentationMasks=!1,It(e=this.h=new Qg,0,1,t=new Re),this.A=new Wg,It(this.h,0,3,this.A),this.j=new Gg,It(this.h,0,2,this.j),os(this.j,4,1),Rt(this.j,2,.5),Rt(this.A,2,.5),Rt(this.h,4,.5)}get baseOptions(){return ee(this.h,Re,1)}set baseOptions(e){It(this.h,0,1,e)}o(e){return"numPoses"in e&&os(this.j,4,e.numPoses??1),"minPoseDetectionConfidence"in e&&Rt(this.j,2,e.minPoseDetectionConfidence??.5),"minTrackingConfidence"in e&&Rt(this.h,4,e.minTrackingConfidence??.5),"minPosePresenceConfidence"in e&&Rt(this.A,2,e.minPosePresenceConfidence??.5),"outputSegmentationMasks"in e&&(this.outputSegmentationMasks=e.outputSegmentationMasks??!1),this.l(e)}F(e,t,n){const i=typeof t!="function"?t:{};return this.u=typeof t=="function"?t:n,pm(this),pi(this,e,i),mm(this)}G(e,t,n,i){const s=typeof n!="function"?n:{};return this.u=typeof n=="function"?n:i,pm(this),zi(this,e,s,t),mm(this)}m(){var e=new zn;Te(e,"image_in"),Te(e,"norm_rect"),ne(e,"normalized_landmarks"),ne(e,"world_landmarks"),ne(e,"segmentation_masks");const t=new kn;Bi(t,XS,this.h);const n=new En;On(n,2,"mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),jt(n,"NORM_LANDMARKS:normalized_landmarks"),jt(n,"WORLD_LANDMARKS:world_landmarks"),n.o(t),Qn(e,n),sl(this,e),this.g.attachProtoVectorListener("normalized_landmarks",(i,s)=>{this.landmarks=[];for(const r of i)i=po(r),this.landmarks.push(il(i));gt(this,s)}),this.g.attachEmptyPacketListener("normalized_landmarks",i=>{this.landmarks=[],gt(this,i)}),this.g.attachProtoVectorListener("world_landmarks",(i,s)=>{this.worldLandmarks=[];for(const r of i)i=Br(r),this.worldLandmarks.push(Ga(i));gt(this,s)}),this.g.attachEmptyPacketListener("world_landmarks",i=>{this.worldLandmarks=[],gt(this,i)}),this.outputSegmentationMasks&&(jt(n,"SEGMENTATION_MASK:segmentation_masks"),ta(this,"segmentation_masks"),this.g.aa("segmentation_masks",(i,s)=>{this.segmentationMasks=i.map(r=>na(this,r,!0,!this.u)),gt(this,s)}),this.g.attachEmptyPacketListener("segmentation_masks",i=>{this.segmentationMasks=[],gt(this,i)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Rn.prototype.detectForVideo=Rn.prototype.G,Rn.prototype.detect=Rn.prototype.F,Rn.prototype.setOptions=Rn.prototype.o,Rn.createFromModelPath=function(e,t){return Jt(Rn,e,{baseOptions:{modelAssetPath:t}})},Rn.createFromModelBuffer=function(e,t){return Jt(Rn,e,{baseOptions:{modelAssetBuffer:t}})},Rn.createFromOptions=function(e,t){return Jt(Rn,e,t)},Rn.POSE_CONNECTIONS=g_;const si={WRIST:0,THUMB_TIP:4,INDEX_TIP:8,MIDDLE_TIP:12,INDEX_MCP:5,MIDDLE_MCP:9,RING_MCP:13,PINKY_MCP:17},Jo=[si.WRIST,si.INDEX_MCP,si.MIDDLE_MCP,si.RING_MCP,si.PINKY_MCP],tE={Pointing_Up:"pointing",Open_Palm:"openpalm",Thumb_Up:"thumbsup",Victory:"victory"},eE="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm",nE="https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",iE=.1,sE=600;class rE{constructor(t=eE,n=null){Lt(this,"recognizer",null);Lt(this,"wasHandsClose",!1);Lt(this,"lastClapMs",0);this.wasmPath=t,this.handednessFilter=n}async init(){const t=await Xs.forVisionTasks(this.wasmPath);this.recognizer=await Mn.createFromOptions(t,{baseOptions:{modelAssetPath:nE,delegate:"GPU"},numHands:2,minHandDetectionConfidence:.35,minHandPresenceConfidence:.35,minTrackingConfidence:.35,runningMode:"VIDEO"})}detect(t,n){if(!this.recognizer)return null;const i=this.recognizer.recognizeForVideo(t,n);if(!i.landmarks||i.landmarks.length===0)return null;let s=!1,r=null;if(i.landmarks.length>=2){const l=i.landmarks[0][si.MIDDLE_MCP],h=i.landmarks[1][si.MIDDLE_MCP];r=Math.hypot(l.x-h.x,l.y-h.y);const d=r<iE;if(d&&!this.wasHandsClose){const u=performance.now();u-this.lastClapMs>sE&&(this.lastClapMs=u,s=!0)}this.wasHandsClose=d}else this.wasHandsClose=!1;let a=0;if(this.handednessFilter){const l=i.handedness.findIndex(h=>{var d;return((d=h[0])==null?void 0:d.categoryName)===this.handednessFilter});if(l===-1)return s?{gestureName:null,gestureConfidence:0,thumbIndexDist:1,thumbMiddleDist:1,indexTip:{x:.5,y:.5},wrist:{x:.5,y:.5},palmCenter:{x:.5,y:.5},clap:s,twoHandDist:r,landmarks:null}:null;a=l}const o=i.gestures[a]??[],c=this.analyze(i.landmarks[a],o);return c.clap=s,c.twoHandDist=r,c.landmarks=i.landmarks[a].map(l=>({x:l.x,y:l.y,z:l.z})),c}analyze(t,n){const i=t[si.THUMB_TIP],s=t[si.INDEX_TIP],r=t[si.MIDDLE_TIP],a=t[si.WRIST],o={x:Jo.reduce((f,g)=>f+t[g].x,0)/Jo.length,y:Jo.reduce((f,g)=>f+t[g].y,0)/Jo.length},c=Math.sqrt((i.x-s.x)**2+(i.y-s.y)**2+((i.z??0)-(s.z??0))**2),l=Math.sqrt((i.x-r.x)**2+(i.y-r.y)**2+((i.z??0)-(r.z??0))**2),h=n[0],d=h?tE[h.categoryName]??null:null,u=(h==null?void 0:h.score)??0;return{gestureName:d,gestureConfidence:u,thumbIndexDist:c,thumbMiddleDist:l,indexTip:{x:s.x,y:s.y},wrist:{x:a.x,y:a.y},palmCenter:o,clap:!1,twoHandDist:null,landmarks:null}}destroy(){var t;(t=this.recognizer)==null||t.close(),this.recognizer=null}}const Rr={NOSE_TIP:1,CHIN:152,FOREHEAD:10,LEFT_EAR:234,RIGHT_EAR:454},aE="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm",oE="https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";class cE{constructor(t=aE){Lt(this,"landmarker",null);this.wasmPath=t}async init(){const t=await Xs.forVisionTasks(this.wasmPath);this.landmarker=await ye.createFromOptions(t,{baseOptions:{modelAssetPath:oE,delegate:"GPU"},outputFaceBlendshapes:!1,runningMode:"VIDEO",numFaces:1})}detect(t,n){var s;if(!this.landmarker)return null;const i=this.landmarker.detectForVideo(t,n);return(s=i.faceLandmarks)!=null&&s.length?this.analyze(i.faceLandmarks[0]):null}analyze(t){const n=t[Rr.NOSE_TIP].x,i=t[Rr.LEFT_EAR].x,s=t[Rr.RIGHT_EAR].x,r=Math.abs(s-i),a=r>.01?(n-i)/r:.5,o=t[Rr.NOSE_TIP].y,c=t[Rr.FOREHEAD].y,l=t[Rr.CHIN].y,h=Math.abs(l-c),d=h>.01?(o-c)/h:.5;return{gazeX:Math.max(0,Math.min(1,a)),gazeY:Math.max(0,Math.min(1,d))}}destroy(){var t;(t=this.landmarker)==null||t.close(),this.landmarker=null}}const gm="handface_key_bindings";function lE(e){return{" ":"Space",ArrowUp:"↑",ArrowDown:"↓",ArrowLeft:"←",ArrowRight:"→",Escape:"Esc",Backspace:"⌫",Delete:"Del",Enter:"↵",Tab:"Tab",PageUp:"PgUp",PageDown:"PgDn",Home:"Home",End:"End"}[e]??e}class hE{constructor(){Lt(this,"bindings",new Map);this.load()}bind(t,n,i){this.bindings.set(t,{gesture:t,key:n,modifiers:i}),this.save()}unbind(t){this.bindings.delete(t),this.save()}getBinding(t){return this.bindings.get(t)}getAll(){return[...this.bindings.values()]}trigger(t){const n=this.bindings.get(t);if(!n)return;const i=n.key,s=n.modifiers??{};if(this.execNative(i,s))return;const r={key:i,bubbles:!0,cancelable:!0,ctrlKey:s.ctrl??!1,altKey:s.alt??!1,shiftKey:s.shift??!1,metaKey:s.meta??!1};document.dispatchEvent(new KeyboardEvent("keydown",r)),document.dispatchEvent(new KeyboardEvent("keyup",r))}execNative(t,n){var s,r,a;const i=t.toLowerCase();return i==="f5"||i==="r"&&n.ctrl?(location.reload(),!0):i==="escape"?(document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:!0})),!0):i==="f11"?(document.fullscreenElement?(a=document.exitFullscreen)==null||a.call(document):(r=(s=document.documentElement).requestFullscreen)==null||r.call(s),!0):n.ctrl&&(i==="+"||i==="=")?(document.body.style.zoom=String(parseFloat(document.body.style.zoom||"1")+.1),!0):n.ctrl&&i==="-"?(document.body.style.zoom=String(Math.max(.5,parseFloat(document.body.style.zoom||"1")-.1)),!0):n.ctrl&&i==="0"?(document.body.style.zoom="1",!0):n.alt&&i==="arrowleft"?(history.back(),!0):n.alt&&i==="arrowright"?(history.forward(),!0):!1}save(){try{localStorage.setItem(gm,JSON.stringify([...this.bindings.entries()]))}catch{}}load(){try{const t=localStorage.getItem(gm);t&&(this.bindings=new Map(JSON.parse(t)))}catch{}}}const _m={pointing:{icon:"☝️",label:"Pointing Up",labelKo:"검지 가리키기",builtin:!0,builtinAction:"커서"},openpalm:{icon:"🖐️",label:"Open Palm",labelKo:"펼친 손",builtin:!1},thumbsup:{icon:"👍",label:"Thumbs Up",labelKo:"엄지 위",builtin:!1},victory:{icon:"✌️",label:"Victory",labelKo:"브이",builtin:!1}},dt="hf-",uE=["openpalm","victory","thumbsup"],dE=["pointing"];class fE{constructor(t){Lt(this,"root");Lt(this,"fab");Lt(this,"panel");Lt(this,"styleEl");Lt(this,"isOpen",!1);Lt(this,"capturingGesture",null);Lt(this,"captureHandler",null);Lt(this,"detectedGesture",null);this.mapper=t,this.styleEl=this.injectStyles(),this.fab=this.createFab(),this.panel=this.createPanel(),this.root=document.createElement("div"),this.root.setAttribute("data-handface",""),this.root.appendChild(this.fab),this.root.appendChild(this.panel),document.body.appendChild(this.root),this.fab.addEventListener("click",()=>this.toggle())}setDetected(t,n){this.isOpen&&this.detectedGesture!==t&&(this.detectedGesture=t,this.panel.querySelectorAll(`.${dt}row[data-gesture]`).forEach(i=>{const s=i.dataset.gesture;i.classList.toggle(`${dt}active`,s===t&&n>.6)}))}destroy(){this.stopCapture(),this.styleEl.remove(),this.root.remove()}toggle(){this.isOpen?this.close():this.open()}open(){this.isOpen=!0,this.renderRows(),this.panel.classList.add(`${dt}open`),this.fab.classList.add(`${dt}fab-open`)}close(){this.isOpen=!1,this.stopCapture(),this.panel.classList.remove(`${dt}open`),this.fab.classList.remove(`${dt}fab-open`)}startCapture(t){this.stopCapture(),this.capturingGesture=t,this.captureHandler=n=>{if(n.preventDefault(),n.stopImmediatePropagation(),["Shift","Control","Alt","Meta"].includes(n.key)){document.addEventListener("keydown",this.captureHandler,{once:!0,capture:!0});return}this.mapper.bind(t,n.key,{ctrl:n.ctrlKey||void 0,alt:n.altKey||void 0,shift:n.shiftKey||void 0,meta:n.metaKey||void 0}),this.capturingGesture=null,this.captureHandler=null,this.renderRows()},document.addEventListener("keydown",this.captureHandler,{once:!0,capture:!0}),this.renderRows()}stopCapture(){this.captureHandler&&(document.removeEventListener("keydown",this.captureHandler,{capture:!0}),this.captureHandler=null,this.capturingGesture=null)}createFab(){const t=document.createElement("button");return t.className=`${dt}fab`,t.title="handface 제스처 설정",t.innerHTML="✋",t}createPanel(){const t=document.createElement("div");return t.className=`${dt}panel`,t.innerHTML=`
      <div class="${dt}header">
        <span class="${dt}title">✋ handface</span>
        <button class="${dt}close-btn" title="닫기">✕</button>
      </div>
      <div class="${dt}body">
        <div class="${dt}section-label">기본 동작</div>
        <div class="${dt}builtin-rows"></div>
        <div class="${dt}section-label" style="margin-top:10px">단축키 바인딩</div>
        <div class="${dt}binding-rows"></div>
      </div>
    `,t.querySelector(`.${dt}close-btn`).addEventListener("click",()=>this.close()),t}renderRows(){this.renderBuiltin(),this.renderBindings()}renderBuiltin(){const t=this.panel.querySelector(`.${dt}builtin-rows`);t.innerHTML="",t.appendChild(this.makeReadonlyRow("🤏","엄지+검지 핀치 (빠르게)","클릭",null)),t.appendChild(this.makeReadonlyRow("🤏","핀치 유지 + 이동","드래그",null)),t.appendChild(this.makeReadonlyRow("🤲","양손 거리 조절","줌",null));for(const n of dE){const i=_m[n];t.appendChild(this.makeReadonlyRow(i.icon,i.labelKo,i.builtinAction,n))}}renderBindings(){const t=this.panel.querySelector(`.${dt}binding-rows`);t.innerHTML="";for(const n of uE){const i=_m[n],s=this.mapper.getBinding(n),r=this.capturingGesture===n;t.appendChild(this.makeBindingRow(n,i.icon,i.labelKo,(s==null?void 0:s.key)??null,r))}}makeReadonlyRow(t,n,i,s){const r=document.createElement("div");return r.className=`${dt}row`,s&&(r.dataset.gesture=s),r.innerHTML=`
      <span class="${dt}icon">${t}</span>
      <span class="${dt}name">${n}</span>
      <span class="${dt}badge">${i}</span>
    `,r}makeBindingRow(t,n,i,s,r){var c;const a=document.createElement("div");a.className=`${dt}row`,a.dataset.gesture=t;const o=s?this.buildKeyLabel(this.mapper.getBinding(t)):null;return r?(a.innerHTML=`
        <span class="${dt}icon">${n}</span>
        <span class="${dt}name">${i}</span>
        <span class="${dt}capture-hint">단축키 입력...</span>
        <button class="${dt}cancel-btn">취소</button>
      `,a.querySelector(`.${dt}cancel-btn`).addEventListener("click",()=>{this.stopCapture(),this.renderRows()})):(a.innerHTML=`
        <span class="${dt}icon">${n}</span>
        <span class="${dt}name">${i}</span>
        ${o?`<span class="${dt}key-tag">${o}</span>
             <button class="${dt}bind-btn ${dt}clear-btn" data-gesture="${t}" title="제거">✕</button>`:`<span class="${dt}no-bind">—</span>`}
        <button class="${dt}bind-btn ${dt}edit-btn" data-gesture="${t}" title="단축키 설정">✎</button>
      `,a.querySelector(`.${dt}edit-btn`).addEventListener("click",()=>this.startCapture(t)),(c=a.querySelector(`.${dt}clear-btn`))==null||c.addEventListener("click",()=>{this.mapper.unbind(t),this.renderRows()})),a}buildKeyLabel(t){var i,s,r,a;const n=[];return(i=t.modifiers)!=null&&i.ctrl&&n.push("Ctrl"),(s=t.modifiers)!=null&&s.alt&&n.push("Alt"),(r=t.modifiers)!=null&&r.shift&&n.push("Shift"),(a=t.modifiers)!=null&&a.meta&&n.push("⌘"),n.push(lE(t.key)),n.join("+")}injectStyles(){const t=document.createElement("style");return t.dataset.handface="styles",t.textContent=`
      .${dt}fab {
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
      .${dt}fab:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(124,106,247,0.65); }
      .${dt}fab-open  { transform: rotate(20deg) scale(1.05); }

      .${dt}panel {
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
      .${dt}open {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: all;
      }

      .${dt}header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 13px 16px 11px;
        border-bottom: 1px solid rgba(255,255,255,0.07);
      }
      .${dt}title {
        font-weight: 700;
        font-size: 0.85rem;
        letter-spacing: -0.01em;
      }
      .${dt}close-btn {
        background: none;
        border: none;
        color: rgba(221,221,245,0.45);
        cursor: pointer;
        font-size: 0.8rem;
        padding: 2px 4px;
        border-radius: 4px;
        transition: color 0.12s;
      }
      .${dt}close-btn:hover { color: #ddddf5; }

      .${dt}body {
        padding: 12px 14px 14px;
      }
      .${dt}section-label {
        font-size: 0.6rem;
        text-transform: uppercase;
        letter-spacing: 0.11em;
        opacity: 0.35;
        margin-bottom: 7px;
      }

      .${dt}row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 5px 6px;
        border-radius: 8px;
        margin-bottom: 3px;
        transition: background 0.15s;
      }
      .${dt}row.${dt}active {
        background: rgba(124,106,247,0.18);
      }

      .${dt}icon { font-size: 1rem; width: 22px; text-align: center; flex-shrink: 0; }
      .${dt}name { flex: 1; opacity: 0.8; font-size: 0.76rem; }

      .${dt}badge {
        font-size: 0.65rem;
        background: rgba(124,106,247,0.25);
        color: #9d8dff;
        padding: 2px 7px;
        border-radius: 99px;
        white-space: nowrap;
      }

      .${dt}key-tag {
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

      .${dt}no-bind {
        font-size: 0.72rem;
        opacity: 0.3;
      }

      .${dt}bind-btn {
        background: none;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        padding: 2px 5px;
        font-size: 0.75rem;
        transition: background 0.12s, color 0.12s;
        flex-shrink: 0;
      }
      .${dt}edit-btn  { color: rgba(221,221,245,0.45); }
      .${dt}edit-btn:hover  { background: rgba(124,106,247,0.2); color: #9d8dff; }
      .${dt}clear-btn { color: rgba(221,221,245,0.3); }
      .${dt}clear-btn:hover { background: rgba(255,80,80,0.15); color: #ff6b6b; }

      .${dt}capture-hint {
        flex: 1;
        font-size: 0.7rem;
        color: #ffd166;
        animation: ${dt}blink 1s step-end infinite;
      }
      .${dt}cancel-btn {
        background: none;
        border: 1px solid rgba(255,80,80,0.3);
        color: rgba(255,100,100,0.7);
        border-radius: 5px;
        padding: 2px 7px;
        font-size: 0.65rem;
        cursor: pointer;
        flex-shrink: 0;
      }
      .${dt}cancel-btn:hover { background: rgba(255,80,80,0.1); }

      @keyframes ${dt}blink {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.3; }
      }
    `,document.head.appendChild(t),t}}function vm(e,t,n){return e+n*(t-e)}const pE=.045,mE=.12,gE=300,_E=500,vE=8,xE=8e3,ME=500,yE=50,SE=120,EE=900,bE=200,AE=.022,xm=.04,TE=.65;function wE(e){return e==="right"?"Right":e==="left"?"Left":null}function Mm(e,t,n){return Math.max(0,Math.min(1,(e-t)/(n-t)))}class CE extends gy{constructor(n={}){super();Lt(this,"video");Lt(this,"detector");Lt(this,"gazeDetector",null);Lt(this,"rafId",null);Lt(this,"stream",null);Lt(this,"panel",null);Lt(this,"pointerState","idle");Lt(this,"wasPinching",!1);Lt(this,"mouseDownTime",0);Lt(this,"mouseDownPos",{x:0,y:0});Lt(this,"lastClickTime",0);Lt(this,"lastGestureMs",new Map);Lt(this,"rawHandX",.5);Lt(this,"rawHandY",.5);Lt(this,"_lastLandmarks",null);Lt(this,"hoverTimer",null);Lt(this,"isHovering",!1);Lt(this,"lastMovePos",{x:0,y:0});Lt(this,"prevTwoHandDist",null);Lt(this,"smoothTwoHandDist",0);Lt(this,"smoothX",.5);Lt(this,"smoothY",.5);Lt(this,"prevRawX",.5);Lt(this,"prevRawY",.5);Lt(this,"calibrated",!1);Lt(this,"zoneX0",0);Lt(this,"zoneX1",1);Lt(this,"zoneY0",0);Lt(this,"zoneY1",1);Lt(this,"flipHorizontal");Lt(this,"cursorSource");Lt(this,"cursorAnchor");Lt(this,"cursorMode");Lt(this,"sensitivity");Lt(this,"activeZone");Lt(this,"ownedVideo");Lt(this,"mapper",new hE);this.flipHorizontal=n.flipHorizontal??!0,this.cursorSource=n.cursorSource??"hand",this.cursorAnchor=n.cursorAnchor??"palm",this.cursorMode=n.cursorMode??"absolute",this.sensitivity=n.sensitivity??2.5;const i=this.cursorSource==="gaze"?[.35,.35,.65,.65]:[.3,.1,.95,.85];this.activeZone=n.activeZone??i,[this.zoneX0,this.zoneY0,this.zoneX1,this.zoneY1]=this.activeZone,n.video?(this.video=n.video,this.ownedVideo=!1):(this.video=this.createHiddenVideo(),this.ownedVideo=!0),this.detector=new rE(n.wasmPath,wE(n.handedness??"right")),this.cursorSource==="gaze"&&(this.gazeDetector=new cE(n.wasmPath))}get handLandmarks(){return this._lastLandmarks}get mediaStream(){return this.stream}async start(){await this.detector.init(),this.gazeDetector&&await this.gazeDetector.init(),this.stream=await navigator.mediaDevices.getUserMedia({video:!0}),this.video.srcObject=this.stream,await new Promise(n=>{this.video.onloadedmetadata=()=>{this.video.play(),n()}}),this.loop()}stop(){var n,i,s;this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),(n=this.stream)==null||n.getTracks().forEach(r=>r.stop()),this.stream=null,this.detector.destroy(),(i=this.gazeDetector)==null||i.destroy(),this.gazeDetector=null,(s=this.panel)==null||s.destroy(),this.panel=null,this.ownedVideo&&this.video.remove(),this.removeAllListeners()}recalibrate(){this.calibrated=!1}createPanel(){return this.panel||(this.panel=new fE(this.mapper)),this.panel}createHiddenVideo(){const n=document.createElement("video");return n.style.cssText="position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;",document.body.appendChild(n),n}loop(){this.rafId=requestAnimationFrame(()=>{this.tick(),this.rafId!==null&&this.loop()})}tick(){const n=performance.now(),i=this.detector.detect(this.video,n);this._lastLandmarks=(i==null?void 0:i.landmarks)??null;let s,r;if(this.gazeDetector){const l=this.gazeDetector.detect(this.video,n);if(!l){i&&this.processStateMachine(i,this.currentPos());return}s=this.flipHorizontal?1-l.gazeX:l.gazeX,r=l.gazeY}else{if(!i)return;const l=this.cursorAnchor==="index"?i.indexTip:this.cursorAnchor==="palm"?i.palmCenter:i.wrist;s=this.flipHorizontal?1-l.x:l.x,r=l.y}if(i){const l=this.cursorAnchor==="index"?i.indexTip:this.cursorAnchor==="palm"?i.palmCenter:i.wrist;this.rawHandX=this.flipHorizontal?1-l.x:l.x,this.rawHandY=l.y}if(this.pointerState!=="dragging"){let l,h;if(this.cursorMode==="relative"){const g=(s-this.prevRawX)*this.sensitivity,x=(r-this.prevRawY)*this.sensitivity;l=Math.max(0,Math.min(1,this.smoothX+g)),h=Math.max(0,Math.min(1,this.smoothY+x))}else{if(!this.calibrated){const g=(this.activeZone[2]-this.activeZone[0])/2,x=(this.activeZone[3]-this.activeZone[1])/2;this.zoneX0=s-g,this.zoneX1=s+g,this.zoneY0=r-x,this.zoneY1=r+x,this.smoothX=.5,this.smoothY=.5,this.calibrated=!0}l=Mm(s,this.zoneX0,this.zoneX1),h=Mm(r,this.zoneY0,this.zoneY1)}const d=Math.hypot(s-this.prevRawX,r-this.prevRawY),u=Math.min(d/AE,1),f=xm+u*(TE-xm);this.smoothX=vm(this.smoothX,l,f),this.smoothY=vm(this.smoothY,h,f)}this.prevRawX=s,this.prevRawY=r;const o=this.currentPos();this.emit("move",o),Math.hypot(o.screenX-this.lastMovePos.x,o.screenY-this.lastMovePos.y)>yE&&(this.lastMovePos={x:o.screenX,y:o.screenY},this.isHovering&&(this.isHovering=!1),this.hoverTimer&&clearTimeout(this.hoverTimer),this.hoverTimer=setTimeout(()=>{this.isHovering=!0,this.emit("hover",this.currentPos())},ME)),i&&this.processStateMachine(i,o)}currentPos(){return{x:this.smoothX,y:this.smoothY,screenX:Math.round(this.smoothX*window.innerWidth),screenY:Math.round(this.smoothY*window.innerHeight)}}processStateMachine(n,i){var g,x;const s=Date.now();let r=!1;if(n.twoHandDist!==null&&this.pointerState==="idle"){if(this.prevTwoHandDist===null)this.smoothTwoHandDist=n.twoHandDist;else{this.smoothTwoHandDist+=(n.twoHandDist-this.smoothTwoHandDist)*.25;const m=this.smoothTwoHandDist-this.prevTwoHandDist;Math.abs(m)>.003&&(this.emit("scroll",{deltaY:-m*SE*3}),r=!0)}this.prevTwoHandDist=this.smoothTwoHandDist}else this.prevTwoHandDist=null;if(r)return;const a=n.thumbIndexDist<pE,o=!a&&n.thumbIndexDist>mE,l=!["openpalm","thumbsup"].includes(n.gestureName??""),h=n.gestureName==="pointing"||n.gestureName==="openpalm",d=a&&!this.wasPinching&&l,u=(o||h)&&this.wasPinching;switch(this.wasPinching=a||this.wasPinching&&!o&&!h,this.pointerState){case"idle":d&&(this.pointerState="mousedown",this.mouseDownTime=s,this.mouseDownPos={x:i.screenX,y:i.screenY},this.emit("mousedown",i));break;case"mousedown":if(u)this.emit("mouseup",i),s-this.mouseDownTime<gE&&s-this.lastClickTime>bE&&(this.emit("click",i),s-this.lastClickTime<_E&&this.emit("dblclick",i),this.lastClickTime=s),this.pointerState="idle";else if(a){const m=i.screenX-this.mouseDownPos.x,p=i.screenY-this.mouseDownPos.y;Math.hypot(m,p)>vE&&(this.pointerState="dragging",this.emit("dragstart",{x:this.rawHandX,y:this.rawHandY,screenX:Math.round(this.rawHandX*window.innerWidth),screenY:Math.round(this.rawHandY*window.innerHeight)}))}break;case"dragging":u||s-this.mouseDownTime>xE?(this.emit("dragend",i),this.emit("mouseup",i),this.wasPinching=!1,this.pointerState="idle"):this.emit("drag",{x:this.rawHandX,y:this.rawHandY,screenX:Math.round(this.rawHandX*window.innerWidth),screenY:Math.round(this.rawHandY*window.innerHeight)});break}const f=n.gestureName;if(f){(g=this.panel)==null||g.setDetected(f,n.gestureConfidence);const m=this.lastGestureMs.get(f)??0;if(s-m>EE){this.lastGestureMs.set(f,s);const p={gesture:f,...i,confidence:n.gestureConfidence};this.emit(f,p),this.mapper.trigger(f)}}else(x=this.panel)==null||x.setDetected(null,0);r||n.clap&&this.emit("clap",{gesture:"pointing",...i,confidence:1})}}class ym{constructor(t=200){this.items=[],this.maxItems=t}add(t){this.items.push(t),this.items.length>this.maxItems&&this.items.shift()}search(t,n=3){const i=this._bigrams(t.toLowerCase());return this.items.map(s=>({item:s,score:this._similarity(i,this._bigrams(s.toLowerCase()))})).sort((s,r)=>r.score-s.score).slice(0,n).filter(s=>s.score>0).map(s=>s.item)}_bigrams(t){const n=new Set;for(let i=0;i<t.length-1;i++)n.add(t.slice(i,i+2));return n}_similarity(t,n){let i=0;for(const s of t)n.has(s)&&i++;return i/(Math.sqrt(t.size)*Math.sqrt(n.size)+1e-9)}}class Vd{constructor(){this._listeners=[],this._history=[],this._memory=new ym(200),this._apiKey="",this._endpoint="https://whatpull-iris-assistant.hf.space",this._sessionId=null,this.busy=!1,this._growthData={version:"v1.0",conversation_count:0,rlaif_count:0,dpo_count:0,growth_score:0},this.model=this._makeDummyModel();const t=typeof window<"u"?window.__IRIS_CONFIG__:null;t!=null&&t.apiKey&&(this._apiKey=t.apiKey),t!=null&&t.endpoint&&(this._endpoint=t.endpoint),this._loadLocal()}_makeDummyModel(){const i=r=>Float32Array.from({length:r},()=>(Math.random()-.5)*.6),s=(r,a)=>Array.from({length:r},()=>i(a));return{CTX:8,vocab:{size:64},encode:r=>[...r].map(a=>a.charCodeAt(0)%64),forward:r=>{this.model.lastX=Float32Array.from({length:32},()=>Math.random()*.8+.1),this.model.lastH1=Float32Array.from({length:32},()=>Math.random()*.8+.1),this.model.lastH2=Float32Array.from({length:32},()=>Math.random()*.8+.1),this.model.lastH3=Float32Array.from({length:32},()=>Math.random()*.8+.1),this.model.lastProbs=Float32Array.from({length:64},()=>Math.random())},lastX:new Float32Array(32),lastH1:new Float32Array(32),lastH2:new Float32Array(32),lastH3:new Float32Array(32),lastProbs:new Float32Array(64),W1:s(32,32),W2:s(32,32),W3:s(32,32),W4:s(64,32),invVocab:Array.from({length:64},(r,a)=>String.fromCharCode(a+32))}}onEvent(t){this._listeners.push(t)}emit(t){this._listeners.forEach(n=>n(t))}get history(){return this._history.map(t=>({role:t.role==="assistant"?"ai":t.role,text:typeof t.text=="string"?t.text:typeof t.content=="string"?t.content:""}))}get stats(){return{vocabSize:64,totalSteps:this._history.length,lossEMA:0,label:"IRIS"}}get modelState(){return{embed:this.model.lastX,h1:this.model.lastH1,h2:this.model.lastH2,h3:this.model.lastH3,probs:this.model.lastProbs}}layerWeightAverages(){return[.5,.5,.5]}reset(){this._history=[],this._memory=new ym(200),this._sessionId=null,this.model=this._makeDummyModel(),this._saveLocal(),this.emit({type:"state",stats:this.stats})}setApiKey(t){this._apiKey=t.trim(),this._saveLocal()}setEndpoint(t){t&&t.startsWith("http")&&(this._endpoint=t.trim().replace(/\/$/,""),this._saveLocal())}async send(t){var n,i,s;if(!this.busy){if(!this._apiKey){this.emit({type:"generate-end",text:`⚠️ IRIS API Key가 설정되지 않았습니다.
Settings(⚙️)에서 X-API-Key를 입력해주세요.`});return}this.busy=!0,this.emit({type:"training-start"}),this.model.forward([]);try{const r=Date.now(),a=await fetch(`${this._endpoint}/chat`,{method:"POST",headers:{"Content-Type":"application/json","X-API-Key":this._apiKey},body:JSON.stringify({message:t,max_tokens:256,session_id:this._sessionId})});if(!a.ok){const h=await a.json().catch(()=>({}));throw new Error(h.detail||`HTTP ${a.status}`)}const o=await a.json(),c=(o.response||"").trim(),l=o.attention_layers||[];this._sessionId=o.session_id||this._sessionId,this._lastLatency=Date.now()-r,this._history.push({role:"user",content:t}),this._history.push({role:"assistant",content:c}),this._memory.add(t),this._memory.add(c),this._saveLocal(),this.model.forward([]),this._history.length%10===0&&this._fetchGrowthData(),this.emit({type:"generate-token",token:c,partial:c,attention_layers:l}),this.emit({type:"generate-end",text:c,attention_layers:l}),this.emit({type:"state",stats:this.stats})}catch(r){console.error("[IRIS]",r);const o=((n=r.message)==null?void 0:n.includes("503"))||((i=r.message)==null?void 0:i.includes("Service Unavailable"))||((s=r.message)==null?void 0:s.includes("warming"))?`IRIS가 깨어나는 중입니다, 주인님.
잠시 후 다시 시도해주세요. (콜드스타트 약 30~60초)`:`IRIS 연결 오류: ${r.message}`;this.emit({type:"generate-end",text:o})}this.busy=!1,this.emit({type:"training-end",avgLoss:0,stepsRun:0,totalSteps:this._history.length})}}async testConnection(){var t,n,i;if(!this._apiKey)return{ok:!1,msg:"API Key를 입력해주세요."};try{const s=await fetch(`${this._endpoint}/health`,{headers:{"X-API-Key":this._apiKey}});if(s.ok){const r=await s.json();return r.growth&&(this._growthData={version:r.version??"v1.0",conversation_count:r.growth.conversation_count??0,rlaif_count:r.growth.rlaif_count??0,dpo_count:r.growth.dpo_count??0,growth_score:r.growth.growth_score??0}),{ok:!0,msg:`IRIS ${r.version??"v1.0"} 온라인 | 대화: ${((t=r.growth)==null?void 0:t.conversation_count)??0}건 | RLAIF: ${((n=r.growth)==null?void 0:n.rlaif_count)??0}건 | 성장: ${((i=r.growth)==null?void 0:i.growth_score)??0}점`}}return{ok:!1,msg:`HTTP ${s.status}`}}catch(s){return{ok:!1,msg:`연결 실패: ${s.message}`}}}async _fetchGrowthData(){try{const t=await fetch(`${this._endpoint}/health`,{headers:{"X-API-Key":this._apiKey}});if(!t.ok)return;const n=await t.json();n.growth&&(this._growthData={version:n.version??"v1.0",conversation_count:n.growth.conversation_count??0,rlaif_count:n.growth.rlaif_count??0,dpo_count:n.growth.dpo_count??0,growth_score:n.growth.growth_score??0},this.emit({type:"growth-update",growth:this._growthData}),console.log("[IRIS] 성장 데이터 갱신:",this._growthData))}catch(t){console.warn("[IRIS] 성장 데이터 조회 실패:",t.message)}}get growthData(){return this._growthData}async fetchModelInfo(){var t,n;if(!this._apiKey)return null;try{const i=await fetch(`${this._endpoint}/model-info`,{headers:{"X-API-Key":this._apiKey}});if(!i.ok)return null;const s=await i.json(),r=((t=s.architecture)==null?void 0:t.num_layers)??28,a=((n=s.architecture)==null?void 0:n.hidden_size)??3072,o=this._computeLayerSizes(r,s.layer_details??[]);return this.emit({type:"model-info",numLayers:r,layerSizes:o,layerDetails:s.layer_details??[],architecture:s.architecture}),s}catch(i){return console.warn("[IRIS] 모델 정보 조회 실패:",i.message),null}}_computeLayerSizes(t,n){const i=[];for(let s=0;s<t;s++){const r=n[s],a=(r==null?void 0:r.strength)??1,o=s/Math.max(t-1,1),c=Math.sin(o*Math.PI),l=6,d=Math.round(l+(48-l)*c),u=Math.max(4,Math.round(d*(.5+a*.5)));i.push(u)}return i}_saveLocal(){try{localStorage.setItem("handface-iris-v1",JSON.stringify({history:this._history.slice(-40),memory:this._memory.items,sessionId:this._sessionId,endpoint:this._endpoint}))}catch{}}_loadLocal(){try{const t=localStorage.getItem("handface-iris-v1");if(!t)return;const n=JSON.parse(t);this._history=n.history??[],this._memory.items=n.memory??[],this._sessionId=n.sessionId??null,n.endpoint&&(this._endpoint=n.endpoint)}catch{}}}const RE=5e3,PE=3;class LE{constructor(){this.recognition=null,this.handlers=new Set,this.accumulated="",this.available=!1,this.silenceTimer=null,this.paused=!1,this.hasActiveInput=!1}onEvent(t){return this.handlers.add(t),()=>this.handlers.delete(t)}emit(t){for(const n of this.handlers)n(t)}get listening(){return this.hasActiveInput}async init(){const t=window.SpeechRecognition||window.webkitSpeechRecognition;if(!t){this.emit({type:"error",error:"SpeechRecognition not supported"});return}this.recognition=new t,this.recognition.continuous=!0,this.recognition.interimResults=!0,this.recognition.lang=navigator.language||"en-US",this.recognition.onresult=n=>this._onResult(n),this.recognition.onerror=n=>{if(n.error==="not-allowed"||n.error==="service-not-allowed"){this.available=!1,this.emit({type:"denied"});return}n.error!=="no-speech"&&n.error!=="aborted"&&this.emit({type:"error",error:n.error})},this.recognition.onend=()=>{!this.paused&&this.available&&setTimeout(()=>{try{this.recognition.start()}catch{}},300)},this.available=!0;try{this.recognition.start()}catch{}this.emit({type:"ready"})}_onResult(t){for(let n=t.resultIndex;n<t.results.length;n++){const i=t.results[n][0].transcript,s=t.results[n].isFinal,r=i.replace(/^[\s.,;:!?。，；：！？]+/,"").trim();if(!r)continue;s&&r&&(this.accumulated+=(this.accumulated?" ":"")+r);const a=s?this.accumulated:this.accumulated+(this.accumulated?" ":"")+r;a.trim()&&(this.hasActiveInput||(this.hasActiveInput=!0,this.emit({type:"listening-start"})),this.emit({type:"transcript",text:a.trim()})),clearTimeout(this.silenceTimer),this.accumulated.trim().length>=PE&&(this.silenceTimer=setTimeout(()=>this._autoSend(),RE))}}_autoSend(){if(!this.hasActiveInput)return;const t=this.accumulated.trim();this.accumulated="",this.hasActiveInput=!1,clearTimeout(this.silenceTimer),this.emit({type:"listening-stop",text:t})}manualSend(){this.hasActiveInput&&this.accumulated.trim().length>0&&this._autoSend()}speakChunk(t){if(!t||t.length<1||!window.speechSynthesis)return;this._pause();const n=new SpeechSynthesisUtterance(t);n.lang=navigator.language||"en-US",n.rate=1.05,n.pitch=1;const i=window.speechSynthesis.getVoices()||[],s=n.lang.slice(0,2),r=i.find(a=>a.lang.startsWith(s)&&a.localService)||i.find(a=>a.lang.startsWith(s));r&&(n.voice=r),n.onstart=()=>this.emit({type:"speaking-start"}),n.onend=()=>{!window.speechSynthesis.speaking&&!window.speechSynthesis.pending&&(this._resume(),this.emit({type:"speaking-end"}))},window.speechSynthesis.speak(n)}stopSpeaking(){var t;(t=window.speechSynthesis)==null||t.cancel(),this._resume()}_pause(){var t;if(!this.paused){this.paused=!0;try{(t=this.recognition)==null||t.stop()}catch{}}}_resume(){this.paused&&(this.paused=!1,setTimeout(()=>{var t;try{(t=this.recognition)==null||t.start()}catch{}},300))}}const al="iris-api-key",ol="iris-endpoint";function IE(){const e=new Vd,t=localStorage.getItem(al)??"",n=localStorage.getItem(ol)??"";return t&&e.setApiKey(t),n&&e.setEndpoint(n),e}let Nt=IE();const As=document.getElementById("cursor");document.getElementById("flash");const ih=document.getElementById("s-status"),Sm=document.getElementById("s-pos"),DE=document.getElementById("s-clicks"),UE=document.getElementById("s-zoom"),Qo=document.getElementById("log"),Ua=document.getElementById("start-btn"),tc=document.getElementById("load-msg"),Em=document.getElementById("overlay");function yn(e,t){const n=document.createElement("div");n.className="log-item"+(e?` ${e}`:"");const i=new Date;for(n.textContent=`[${i.getHours()}:${String(i.getMinutes()).padStart(2,"0")}:${String(i.getSeconds()).padStart(2,"0")}] ${t}`,Qo.appendChild(n);Qo.children.length>9;)Qo.removeChild(Qo.children[1])}const ba=new cy({antialias:!0});ba.setSize(window.innerWidth,window.innerHeight);ba.setPixelRatio(Math.min(window.devicePixelRatio,2));ba.setClearColor(132104);document.getElementById("canvas-container").appendChild(ba.domElement);const ia=new O1,sa=new qn(50,window.innerWidth/window.innerHeight,.1,200);sa.position.set(0,1,7.5);sa.lookAt(0,0,0);let dc=7.5,sh=7.5;const Dn=new $s;ia.add(Dn);function __(e=.55){const n=document.createElement("canvas");n.width=n.height=64;const i=n.getContext("2d"),s=i.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(e,"rgba(255,255,255,0.55)"),s.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=s,i.fillRect(0,0,64,64);const r=new $1(n);return r.minFilter=Ze,r.magFilter=Ze,r.needsUpdate=!0,r}const FE=__(.5),Hd=__(.3);let Je=[6,8,12,16,20,24,28,32,36,40,44,48,48,48,48,48,48,44,40,36,32,28,24,20,16,12,8,6],Su=v_(Je.length);const NE=4,OE=3,BE=3;let Lc=[],In=null,$n=null,jn=null;function v_(e){return Array.from({length:e},(t,n)=>2.45-(2.45-.35)*(n/Math.max(e-1,1)))}function kE(e,t,n){return .5*Math.sin(e*2.3+t*3.7+n*1.9+Math.cos(t*1.3))+.25*Math.sin(e*5.1+t*7.3+n*4.7+Math.sin(n*2.1))+.13*Math.sin(e*11.3+t*13.7+n*9.1)+.06*Math.sin(e*23.7+t*29.3+n*19.9)}function zE(e,t){if(e===1)return[new D(0,0,0)];const n=[],i=Math.PI*(3-Math.sqrt(5)),s=1.3,r=.78,a=1.02,o=.14*t;for(let c=0;c<e;c++){const l=1-c/(e-1)*2,h=Math.sqrt(Math.max(0,1-l*l)),d=i*c;let u=Math.cos(d)*h;const f=l;let g=Math.sin(d)*h,x=1;f<-.25&&(x=.6+.4*((f+1)/.75));const m=f>0?1+.08*f:1;let p=1;u>.2&&f>-.4&&(p+=.25*Math.max(0,u-.2)*(1.2-Math.abs(f))),f>.35&&(p+=.15*(f-.35)),u<-.35&&f>-.3&&(p+=.18*Math.pow(Math.abs(u)-.35,.7)),Math.abs(g)>.3&&f<.15&&(p+=.22*(Math.abs(g)-.3)*(.6-f)),u<-.15&&f<-.3&&(p+=.35*Math.max(0,Math.abs(u+.15)+Math.abs(f+.3)-.08));const y=6,A=.1*kE(u*y,f*y,g*y),S=Math.abs(u)<.12&&f>.1?-.08*(1-Math.abs(u)/.12)*f:0,w=Math.abs(g)>.25&&f>-.15&&f<.25?-.06*Math.max(0,Math.abs(g)-.25):0,T=p*(1+A+S+w);let C=u*t*s*T*m,v=f*t*r*T*x,E=g*t*a*T*m;E+=E>=0?o:-o;const Y=t*.11;C+=(Math.random()-.5)*Y,v+=(Math.random()-.5)*Y,E+=(Math.random()-.5)*Y,n.push(new D(C,v,E))}return n}let ai=[],oi=[];function x_(){ai=Je.map((e,t)=>zE(e,Su[t]).map((n,i)=>({pos:n,activation:0,targetActivation:0,layerIdx:t,layerLocalIdx:i}))),oi=ai.flat()}x_();let ci=[],rh=new Set,ec=new Map,nc=new Map,Ir=new Map;function M_(){ci=[],rh=new Set,ec=new Map,nc=new Map,Ir=new Map,oi.forEach((t,n)=>ec.set(t,n));function e(t,n,i){const s=ec.get(t)*oi.length+ec.get(n);if(rh.has(s))return;rh.add(s);const r=n.pos.x-t.pos.x,a=n.pos.y-t.pos.y,o=n.pos.z-t.pos.z,c=Math.sqrt(r*r+a*a+o*o),l=i?.3+Math.random()*.4:.5+Math.random()*.5,h={src:t,dst:n,weight:l,targetWeight:l,intra:i,dist:c,flow:0,curve:null,curvePoints:null};ci.push(h),Ir.has(t)||Ir.set(t,[]),nc.has(n)||nc.set(n,[]),Ir.get(t).push(h),nc.get(n).push(h)}for(let t=0;t<Je.length-1;t++){const n=ai[t],i=ai[t+1];for(const s of n){const r=[...i].sort((a,o)=>{const c=Math.hypot(a.pos.x-s.pos.x,a.pos.y-s.pos.y,a.pos.z-s.pos.z),l=Math.hypot(o.pos.x-s.pos.x,o.pos.y-s.pos.y,o.pos.z-s.pos.z);return c-l});for(let a=0;a<Math.min(NE,r.length);a++)e(s,r[a],!1)}}for(let t=1;t<Je.length;t++){const n=ai[t],i=ai[t-1];for(const s of n){const r=[...i].sort((a,o)=>{const c=Math.hypot(a.pos.x-s.pos.x,a.pos.y-s.pos.y,a.pos.z-s.pos.z),l=Math.hypot(o.pos.x-s.pos.x,o.pos.y-s.pos.y,o.pos.z-s.pos.z);return c-l});for(let a=0;a<Math.min(OE,r.length);a++)e(r[a],s,!1)}}for(let t=0;t<Je.length;t++){const n=ai[t];for(const i of n){const s=[...n].filter(r=>r!==i).sort((r,a)=>{const o=Math.hypot(r.pos.x-i.pos.x,r.pos.y-i.pos.y,r.pos.z-i.pos.z),c=Math.hypot(a.pos.x-i.pos.x,a.pos.y-i.pos.y,a.pos.z-i.pos.z);return o-c});for(let r=0;r<Math.min(BE,s.length);r++)e(i,s[r],!0)}}}M_();const Pr=new ui({uniforms:{rimColor:{value:new $t(6732799)},rimIntensity:{value:1},rimPower:{value:2.8},coreColor:{value:new $t(1721480)},coreAlpha:{value:.02}},vertexShader:`
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
  `,transparent:!0,blending:Ii,depthWrite:!1,side:Si});(function(){new py().load(my,n=>{n.scale.setScalar(2.55),n.traverse(s=>{s.isMesh&&(s.geometry.computeVertexNormals(),s.material=Pr)}),Dn.add(n),console.log("[handface] Brain OBJ loaded")},void 0,n=>{console.warn("[handface] Brain OBJ failed:",n.message)})})();const ah=document.getElementById("input-grid");if(ah){ah.style.gridTemplateColumns=`repeat(${Je[0]}, 1fr)`;for(let e=0;e<Je[0];e++){const t=document.createElement("div");t.className="input-cell";const n=document.createElement("div");n.className="input-cell-fill";const i=document.createElement("div");i.className="input-cell-val",i.textContent="00",t.appendChild(n),t.appendChild(i),ah.appendChild(t)}}const bm=document.getElementById("weight-list"),VE=[];if(bm)for(let e=1;e<Je.length;e++){const t=document.createElement("div");t.className="weight-row",t.innerHTML=`
      <span class="weight-label">L${e-1}→${e}</span>
      <div class="weight-bar"><div class="weight-fill"></div></div>
      <span class="weight-val">—</span>
    `,bm.appendChild(t),VE.push({fill:t.querySelector(".weight-fill"),val:t.querySelector(".weight-val"),layerIdx:e})}const Am=document.getElementById("pred-list"),HE=8,GE=[];if(Am)for(let e=0;e<HE;e++){const t=document.createElement("div");t.className="pred-row",t.innerHTML=`
      <span class="pred-char">·</span>
      <div class="pred-bar"><div class="pred-fill"></div></div>
      <span class="pred-pct">—</span>
    `,Am.appendChild(t),GE.push({char:t.querySelector(".pred-char"),fill:t.querySelector(".pred-fill"),pct:t.querySelector(".pred-pct")})}function Eu(){Yd()}const bu=document.getElementById("loss-spark"),Vs=bu.getContext("2d"),Ss=[];function WE(e){Number.isFinite(e)&&(Ss.push(e),Ss.length>100&&Ss.shift(),XE())}function XE(){const e=bu.width,t=bu.height;if(Vs.clearRect(0,0,e,t),Ss.length<2)return;let n=-1/0,i=1/0;for(const r of Ss)r>n&&(n=r),r<i&&(i=r);const s=Math.max(.15,n-i);Vs.strokeStyle="rgba(255, 200, 80, 0.85)",Vs.lineWidth=1.2,Vs.beginPath();for(let r=0;r<Ss.length;r++){const a=r/Math.max(1,Ss.length-1)*(e-1)+.5,o=1+(n-Ss[r])/s*(t-2);r===0?Vs.moveTo(a,o):Vs.lineTo(a,o)}Vs.stroke()}const ts=document.getElementById("chat-msgs"),Ja=document.getElementById("chat-input"),Au=document.getElementById("chat-send"),YE=document.getElementById("chat-reset"),qE=document.getElementById("chat-stats"),Tm=document.getElementById("chat-loss-fill");function kr(e,t){const n=document.createElement("div");n.className=`chat-msg ${e}`;const i=document.createElement("span");i.className="chat-msg-role",i.textContent=e;const s=document.createElement("span");s.className="chat-msg-text",s.textContent=" "+t,n.appendChild(i),n.appendChild(s),ts.appendChild(n),ts.scrollTop=ts.scrollHeight}function Ic(){const e=Nt.growthData??{},t=Nt.history??[],n=Math.floor(t.length/2),i=e.growth_score??0,s=e.version??"v1.0";qE.textContent=`IRIS ${s} · 대화 ${n}건 · 성장 ${i}pt`;const r=i/100;Tm.style.width=`${Math.round(r*100)}%`,Tm.style.background=i>50?"#44FF88":i>20?"#FFAA44":"#66BBFF"}function Gd(){if(Nt.history.length===0)kr("sys","Type a message in English. The brain learns from your input.");else for(const e of Nt.history)kr(e.role,e.text);Ic()}Gd();async function Wd(){const e=Ja.value.trim();!e||Nt.busy||(Ja.value="",Au.disabled=!0,kr("user",e),yn("",`💬 sending (${e.length} chars)`),await Nt.send(e),Au.disabled=!1)}Au.addEventListener("click",Wd);Ja.addEventListener("keydown",e=>{e.key==="Enter"&&(e.preventDefault(),Wd())});YE.addEventListener("click",()=>{confirm("Reset model weights and memory?")&&(Nt.reset(),ts.innerHTML="",Gd(),go(),yn("","🔄 model reset"))});let fc=null,oh=!1,vs="";function $E(){const e=document.createElement("div");e.className="chat-msg ai";const t=document.createElement("span");t.className="chat-msg-role",t.textContent="ai";const n=document.createElement("span");n.className="chat-msg-text",n.textContent=" ",e.appendChild(t),e.appendChild(n),ts.appendChild(e),fc=n}function y_(e){if(e.type==="training-end"){go(),Ic();const t=typeof e.avgLoss=="number"?e.avgLoss:0,n=typeof e.stepsRun=="number"?e.stepsRun:0;WE(t),Eu(),yn("",`🧠 ${n} steps (loss ${t.toFixed(2)})`)}else if(e.type==="generate-token")Dc&&lb(),fc||$E(),fc.textContent=" "+e.partial,ts.scrollTop=ts.scrollHeight,oh=!0,Rm(e.token),vs+=e.token,/[.!?。\n]\s*$/.test(vs)&&vs.trim().length>3&&(Zi.available&&Zi.speakChunk(vs.trim()),vs="");else if(e.type==="generate-end"){oh||kr("ai",e.text),fc=null,oh=!1,e.attention_layers&&e.attention_layers.length>0?ab(e.attention_layers):Rm(e.text),Eu(),Yd(),Zi.available&&vs.trim().length>0&&Zi.speakChunk(vs.trim()),vs="";const t=document.getElementById("thinking");t&&t.classList.remove("on"),Dc=!1}else if(e.type==="state")Ic();else if(e.type==="loading")kr("sys",e.message);else if(e.type==="loading-progress"){const t=ts.lastElementChild;t!=null&&t.classList.contains("sys")&&(t.querySelector(".chat-msg-text").textContent=` Loading... ${e.progress}%`)}else if(e.type==="loading-done")kr("sys","Model loaded. Ready to chat!");else if(e.type==="growth-update")jE(e.growth);else if(e.type==="model-info"){console.log("[IRIS] 모델 구조 수신:",e.numLayers,"레이어");const t=!window.__irisNetworkLoaded;window.__irisNetworkLoaded=!0,nb(e.layerSizes,e.layerDetails,t)}}function jE(e){const t=e.growth_score??0,n=e.version??"v1.0",i=e.dpo_count??0;let s=6732799,r=1721480;i>=5?(s=16777215,r=8947967):i>=3?(s=65518,r=17476):i>=1&&(s=4500223,r=1122918),Pr!=null&&Pr.uniforms&&(Pr.uniforms.rimColor.value.setHex(s),Pr.uniforms.coreColor.value.setHex(r));const a=.3+t/100*.7;Dn&&Dn.traverse(l=>{l.material&&l.material.opacity!==void 0&&l.material.transparent&&(l.material.opacity=Math.min(1,l.material.opacity*.9+a*.1))});const o=document.getElementById("mode-badge");o&&(o.textContent=`⬡ IRIS ${n}`,o.style.color=i>=1?"#66FFCC":"#66BBFF");const c=document.getElementById("stats");if(c){const l=Math.max(0,Math.min(10,Math.floor(t/10))),h="█".repeat(l)+"░".repeat(10-l);let d=document.getElementById("s-growth-row");d||(d=document.createElement("div"),d.id="s-growth-row",d.className="s-row",d.innerHTML='<span class="s-label">IRIS</span><span class="s-val" id="s-growth-val"></span>',c.appendChild(d));const u=document.getElementById("s-growth-val");u&&(u.textContent=`${n} ${h} ${t}`)}console.log(`[IRIS viz] ${n} | score: ${t} | dpo: ${i}`)}Nt.onEvent(y_);go();Eu();const Zi=new LE,fn=document.getElementById("voice-status"),Tu=document.getElementById("chat-mic");Zi.onEvent(e=>{e.type==="ready"&&(fn.textContent="🔈 Always listening — just talk",fn.className=""),e.type==="listening-start"&&(fn.textContent="🎤 Listening... (auto-send after 5s silence)",fn.className="listening",Tu.classList.add("active")),e.type==="listening-stop"&&(fn.textContent="🔈 Always listening — just talk",fn.className="",Tu.classList.remove("active"),e.text&&e.text.trim().length>0&&(Ja.value=e.text.trim(),Wd())),e.type==="transcript"&&(Ja.value=e.text),e.type==="speaking-start"&&(fn.textContent="🔊 AI speaking... (mic paused)",fn.className="speaking"),e.type==="speaking-end"&&(fn.textContent="🔈 Always listening — just talk",fn.className=""),e.type==="denied"&&(fn.textContent="🔇 Mic not allowed",fn.className=""),e.type==="error"&&(fn.textContent=`⚠ ${e.error}`,Zi.available&&setTimeout(()=>{fn.textContent="🔈 Always listening"},3e3))});Tu.addEventListener("click",()=>{if(!Zi.available){fn.textContent="⚠ Voice not available. Allow microphone.";return}Zi.manualSend()});const KE=document.getElementById("settings-btn"),Qa=document.getElementById("settings-modal"),ra=document.getElementById("s-apikey"),Li=document.getElementById("s-endpoint"),wi=document.getElementById("settings-status"),ZE=document.getElementById("s-save"),JE=document.getElementById("s-test"),QE=document.getElementById("s-delete"),tb=document.getElementById("s-close");function S_(){let e=document.getElementById("mode-badge");if(!e){e=document.createElement("span"),e.id="mode-badge",e.className="mode-badge cloud";const t=document.getElementById("chat-title");if(t)t.appendChild(e);else return}e.textContent="⬡ IRIS",e.style.color="#66BBFF",e.style.background="rgba(0,80,255,0.15)",e.style.borderColor="#66BBFF"}S_();function Xd(){Qa.style.display="none",Qa.classList.remove("open")}KE.addEventListener("click",()=>{const e=localStorage.getItem(al)??"",t=localStorage.getItem(ol)??"https://whatpull-iris-assistant.hf.space";ra&&(ra.value=e),Li&&(Li.value=t),wi&&(wi.textContent=""),Qa.style.display="flex"});tb.addEventListener("click",Xd);Qa.addEventListener("click",e=>{e.target===Qa&&Xd()});JE.addEventListener("click",async()=>{const e=ra.value.trim(),t=(Li==null?void 0:Li.value.trim())??"";if(!e){wi.textContent="Please enter IRIS X-API-Key.";return}wi.textContent="Testing...";const n=new Vd;n.setApiKey(e),t&&n.setEndpoint(t);const i=await n.testConnection();wi.textContent=i.ok?`✓ ${i.msg}`:`✗ ${i.msg}`});function eb(e,t){Nt=e,Nt.onEvent(y_),ts.innerHTML="",Gd(),go(),S_(),Ic(),Xd(),yn("",t)}ZE.addEventListener("click",async()=>{const e=ra.value.trim(),t=(Li==null?void 0:Li.value.trim())??"";if(!e){wi.textContent="Please enter IRIS X-API-Key.";return}localStorage.setItem(al,e),t&&localStorage.setItem(ol,t);const n=new Vd;n.setApiKey(e),t&&n.setEndpoint(t),eb(n,"⬡ IRIS mode"),wi.textContent="✓ IRIS 연결 중... 모델 구조 조회";try{Nt.fetchModelInfo&&await Nt.fetchModelInfo(),Nt._fetchGrowthData&&await Nt._fetchGrowthData(),wi.textContent="✓ Now using IRIS Assistant."}catch(i){wi.textContent=`✓ 연결됨. 모델 정보 조회 실패: ${i.message}`}});QE.addEventListener("click",()=>{localStorage.removeItem(al),localStorage.removeItem(ol),ra&&(ra.value=""),Li&&(Li.value="https://whatpull-iris-assistant.hf.space"),wi.textContent="Key & endpoint cleared."});function Yd(){var V,F,Q;const e=Nt.growthData??{},t=Nt.stats??{},n=Nt.history??[],i=Nt._endpoint??"—",s=document.getElementById("iris-version");s&&(s.textContent=e.version??"v1.0");const r=document.getElementById("iris-endpoint-status");if(r){const j=i.replace("https://","").split(".")[0];r.textContent=j}const a=document.getElementById("iris-session");if(a){const j=Nt._sessionId;a.textContent=j?j.slice(0,8)+"...":"—"}const o=document.getElementById("iris-latency");o&&(o.textContent=Nt._lastLatency?`${Nt._lastLatency}ms`:"—");const c=e.conversation_count??0,l=e.rlaif_count??0,h=e.dpo_count??0,d=e.growth_score??0,u=t.totalSteps??n.length,f=((F=(V=Nt._memory)==null?void 0:V.items)==null?void 0:F.length)??0,g=(j,lt,pt,ht,kt="")=>{const de=document.getElementById(j),ce=document.getElementById(lt);de&&(de.style.width=`${Math.min(100,pt/ht*100)}%`),ce&&(ce.textContent=pt+kt)};g("iris-conv-bar","iris-conv-val",c,500),g("iris-rlaif-bar","iris-rlaif-val",l,200),g("iris-dpo-bar","iris-dpo-val",h,10,"x"),g("iris-score-bar","iris-score-val",d,100,"pt"),g("iris-steps-bar","iris-steps-val",u,100),g("iris-memory-bar","iris-memory-val",f,200);const x=((Q=Nt._apiKey)==null?void 0:Q.length)>0,m=document.getElementById("iris-sig-conn-bar"),p=document.getElementById("iris-sig-conn");m&&(m.style.width=x?"100%":"0%"),m&&(m.style.background=x?"#44FF88":"#FF4444"),p&&(p.textContent=x?"ONLINE":"OFFLINE");const y=document.getElementById("iris-sig-model-bar"),A=document.getElementById("iris-sig-model");y&&(y.style.width="100%"),A&&(A.textContent=e.version??"v1.0");const S=Math.floor(n.length/2),w=document.getElementById("iris-sig-chat-bar"),T=document.getElementById("iris-sig-chat");w&&(w.style.width=`${Math.min(100,S)}%`),T&&(T.textContent=`${S} msgs`);const C=document.getElementById("iris-sig-growth-bar"),v=document.getElementById("iris-sig-growth");C&&(C.style.width=`${d}%`),v&&(v.textContent=`${d}%`);const E=document.getElementById("iris-sig-rlaif-bar"),Y=document.getElementById("iris-sig-rlaif");E&&(E.style.width=`${Math.min(100,l/2)}%`),Y&&(Y.textContent=`${l} data`);const R=document.getElementById("iris-sig-dpo-bar"),k=document.getElementById("iris-sig-dpo");R&&(R.style.width=`${Math.min(100,h*10)}%`),k&&(k.textContent=`DPO x${h}`);const z=document.getElementById("iris-sig-uptime");if(z){const j=Math.floor(performance.now()/6e4);z.textContent=j>0?`${j}m`:"<1m"}const W=document.getElementById("iris-sig-endpoint-bar"),B=document.getElementById("iris-sig-endpoint");if(W&&(W.style.width=x?"100%":"30%"),B){const j=i.includes("huggingface");B.textContent=j?"HF Space":"Custom"}}const wu=10,Wa=wu*2;function E_(){console.log(`[handface] nodes: ${oi.length}, edges: ${ci.length}`);const e=new D,t=new D,n=new D,i=new D(0,1,0);ci.forEach((f,g)=>{e.subVectors(f.dst.pos,f.src.pos);const x=e.length(),m=(g*9301+49297)%233280/233280;t.copy(e).normalize(),n.crossVectors(e,i),n.lengthSq()<1e-6&&n.set(1,0,0),n.normalize(),n.applyAxisAngle(t,m*Math.PI*2);const p=x*(.1+m*.08)*(f.intra?1.4:1),y=new D().addVectors(f.src.pos,f.dst.pos).multiplyScalar(.5).addScaledVector(n,p);f.curve=new tv(f.src.pos.clone(),y,f.dst.pos.clone()),f.curvePoints=f.curve.getPoints(wu)});const s=new Float32Array(ci.length*Wa*3),r=new Float32Array(ci.length*Wa*3);ci.forEach((f,g)=>{const x=g*Wa*3,m=f.weight*.12;for(let p=0;p<wu;p++){const y=f.curvePoints[p],A=f.curvePoints[p+1],S=x+p*6;s[S+0]=y.x,s[S+1]=y.y,s[S+2]=y.z,s[S+3]=A.x,s[S+4]=A.y,s[S+5]=A.z,r[S+0]=m,r[S+1]=m*.4,r[S+2]=m*.05,r[S+3]=m,r[S+4]=m*.4,r[S+5]=m*.05}});const a=new He;a.setAttribute("position",new cn(s,3)),a.setAttribute("color",new cn(r,3)),In&&(Dn.remove(In),In.geometry.dispose(),In.material.dispose(),In=null),In=new Ec(a,new Fr({vertexColors:!0,blending:Ii,transparent:!0,depthWrite:!1})),Dn.add(In);const o=new Float32Array(oi.length*3),c=new Float32Array(oi.length*3),l=new Float32Array(oi.length*3);oi.forEach((f,g)=>{o[g*3]=f.pos.x,o[g*3+1]=f.pos.y,o[g*3+2]=f.pos.z,c[g*3+0]=.08,c[g*3+1]=.03,c[g*3+2]=.01,l[g*3+0]=.2,l[g*3+1]=.08,l[g*3+2]=.02}),$n&&(Dn.remove($n),$n.geometry.dispose(),$n.material.dispose(),$n=null),jn&&(Dn.remove(jn),jn.geometry.dispose(),jn.material.dispose(),jn=null);function h(f,g,x,m){const p=new He;p.setAttribute("position",new cn(x,3)),p.setAttribute("color",new cn(f,3));const y=new Nr(p,new Es({vertexColors:!0,size:g,map:m,alphaTest:.01,blending:Ii,transparent:!0,depthWrite:!1}));return Dn.add(y),{geo:p,mesh:y}}const d=h(c,.18,o,FE),u=h(l,.065,o,Hd);return $n=d.mesh,jn=u.mesh,{nodeHaloGeo:d.geo,nodeCoreGeo:u.geo,edgeGeo:a,nHaloArr:c,nCoreArr:l,ePosArr:s,eColArr:r}}let Pn=E_();In&&(In.material.opacity=0);$n&&($n.material.opacity=0);jn&&(jn.material.opacity=0);async function nb(e,t=[],n=!1){!e||e.length===0||(console.log("[IRIS viz] 네트워크 리빌드:",e.length,"레이어,",e.reduce((i,s)=>i+s,0),"노드"),Lc.forEach(i=>clearTimeout(i)),Lc=[],typeof Yn<"u"&&(Yn.length=0),n||await new Promise(i=>{let s=1;const r=setInterval(()=>{s-=.08,In&&(In.material.opacity=Math.max(0,s)),$n&&($n.material.opacity=Math.max(0,s)),jn&&(jn.material.opacity=Math.max(0,s)),s<=0&&(clearInterval(r),i())},16)}),Je.length=0,e.forEach(i=>Je.push(i)),Su.length=0,v_(Je.length).forEach(i=>Su.push(i)),x_(),M_(),Pn=E_(),await new Promise(i=>{let s=0;const r=setInterval(()=>{s+=.04,In&&(In.material.opacity=Math.min(1,s)),$n&&($n.material.opacity=Math.min(1,s)),jn&&(jn.material.opacity=Math.min(1,s)),s>=1&&(clearInterval(r),i())},16)}),console.log("[IRIS viz] 네트워크 리빌드 완료 ✅"))}const qd=1200,Yn=[],pc=new Float32Array(qd*3),mc=new Float32Array(qd*3),nr=new He;nr.setAttribute("position",new cn(pc,3));nr.setAttribute("color",new cn(mc,3));nr.setDrawRange(0,0);Dn.add(new Nr(nr,new Es({vertexColors:!0,size:.11,map:Hd,alphaTest:.01,blending:Ii,transparent:!0,depthWrite:!1})));function Ei(e,t=0){Yn.length>=qd||Yn.push({edge:e,t,speed:.008+e.weight*.018+Math.random()*.007})}const cl=new $s;Dn.add(cl);const b_=new _n(new ro(.08,20,20),new ha({color:16772812,blending:Ii,transparent:!0,opacity:.7,depthWrite:!1}));cl.add(b_);const A_=new _n(new ro(.28,20,20),new ha({color:16746547,blending:Ii,transparent:!0,opacity:.1,depthWrite:!1}));cl.add(A_);const T_=new ha({color:16764040,blending:Ii,transparent:!0,opacity:0,depthWrite:!1,side:mn}),zr=new _n(new ro(1,32,24),T_);zr.scale.setScalar(.3);zr.visible=!1;cl.add(zr);let Mi=0,wm=0;const Sn={xH:12,yF:-4,yC:8,zB:-14,zF:10,step:2},aa=Sn.xH*2,oa=Sn.yC-Sn.yF,Ps=Sn.zF-Sn.zB,$d=(Sn.yF+Sn.yC)/2,ll=(Sn.zB+Sn.zF)/2,ib=new ha({color:264208,polygonOffset:!0,polygonOffsetFactor:1,polygonOffsetUnits:1});function sb(e,t,n,i){const s=[],r=e/2,a=t/2,o=Sn.step;for(let l=-r;l<=r+.01;l+=o)s.push(l,-a,0,l,a,0);for(let l=-a;l<=a+.01;l+=o)s.push(-r,l,0,r,l,0);const c=new He;return c.setAttribute("position",new Ce(s,3)),new Ec(c,new Fr({color:n,transparent:!0,opacity:i,depthWrite:!1}))}function mo(e,t,n,i,s,r,a){const o=new _n(new so(e,t),ib);o.position.set(...n),i&&o.rotation.set(...i),ia.add(o);const c=sb(s,r,2284902,a);c.position.set(...n),i&&c.rotation.set(...i),ia.add(c)}mo(aa,Ps,[0,Sn.yF,ll],[-Math.PI/2,0,0],aa,Ps,.28);mo(aa,Ps,[0,Sn.yC,ll],[Math.PI/2,0,0],aa,Ps,.14);mo(Ps,oa,[-12,$d,ll],[0,Math.PI/2,0],Ps,oa,.22);mo(Ps,oa,[Sn.xH,$d,ll],[0,-Math.PI/2,0],Ps,oa,.22);mo(aa,oa,[0,$d,Sn.zB],[0,0,0],aa,oa,.18);ia.fog=new Gu(132104,.02);const w_=2200,gc=new Float32Array(w_*3);for(let e=0;e<w_;e++){const t=8+Math.random()*22,n=2*Math.PI*Math.random(),i=Math.acos(2*Math.random()-1);gc[e*3]=t*Math.sin(i)*Math.cos(n),gc[e*3+1]=t*Math.sin(i)*Math.sin(n),gc[e*3+2]=t*Math.cos(i)}const C_=new He;C_.setAttribute("position",new Ce(gc,3));const R_=new Nr(C_,new Es({color:16764057,size:.022,map:Hd,alphaTest:.01,blending:Ii,transparent:!0,opacity:.32,depthWrite:!1}));ia.add(R_);let Cm=0;const P_=280,rb=600;function Rm(e=null){const t=e||(Nt.history.length>0?Nt.history[Nt.history.length-1].text:"hi"),n=Nt.model.encode(t),i=new Array(Nt.model.CTX);for(let u=0;u<Nt.model.CTX;u++){const f=n.length-Nt.model.CTX+u;i[u]=f>=0?n[f]:0}Nt.model.forward(i);const s=Nt.model.vocab.size,r=new Float32Array(Nt.model.lastX),a=new Float32Array(Nt.model.lastH1),o=new Float32Array(Nt.model.lastH2),c=new Float32Array(Nt.model.lastH3),l=new Float32Array(Nt.model.lastProbs.subarray(0,s)),h=[r,a,a,o,o,c,l],d=[r.length,a.length,a.length,o.length,o.length,c.length,l.length];for(let u=0;u<Je.length;u++)Lc.push(setTimeout(()=>{const f=h[u],g=d[u],x=ai[u];let m=1e-6;for(let y=0;y<g;y++){const A=Math.abs(f[y]);A>m&&(m=A)}const p=1/m;for(let y=0;y<x.length;y++){const A=Math.min(g-1,Math.floor(y/x.length*g)),S=Math.abs(f[A])*p;x[y].targetActivation=.08+.92*S}if(u<Je.length-1)for(const y of x){if(y.targetActivation<.2)continue;const A=Ir.get(y);if(A)for(const S of A){if(S.intra)continue;const w=S.weight*y.targetActivation;Ei(S,0),Ei(S,.03+Math.random()*.04),w>.4&&Ei(S,.07+Math.random()*.05),w>.6&&Ei(S,.12+Math.random()*.05),w>.8&&Ei(S,.18+Math.random()*.05)}}},u*P_))}function ab(e){for(let t=0;t<Je.length;t++)Lc.push(setTimeout(()=>{const n=ai[t],i=e[t]??[];for(let s=0;s<n.length;s++){const r=Math.floor(s/n.length*i.length),a=i[r]??0;n[s].targetActivation=.05+.95*a}if(t<Je.length-1)for(const s of n){if(s.targetActivation<.15)continue;const r=Ir.get(s);if(r)for(const a of r){if(a.intra)continue;const o=a.weight*s.targetActivation;Ei(a,0),o>.3&&Ei(a,.05+Math.random()*.05),o>.5&&Ei(a,.1+Math.random()*.05),o>.7&&Ei(a,.15+Math.random()*.05),o>.9&&Ei(a,.2+Math.random()*.05)}}},t*P_));console.log("[IRIS viz] 실제 어텐션 가중치 적용:",e.map(t=>t.map(n=>n.toFixed(2)).join(" ")).join(" | "))}function go(){const e=[Nt.model.W1,Nt.model.W2,Nt.model.W3,Nt.model.W4];for(const t of ci){const n=Math.min(e.length-1,Math.floor(t.src.layerIdx*e.length/(Je.length-1))),i=e[n],s=i.length,r=i[0].length,a=t.src.layerIdx,o=t.intra?a:t.dst.layerIdx,c=Je[a],l=Je[o],h=Math.min(s-1,Math.floor(t.src.layerLocalIdx/c*s)),d=Math.min(r-1,Math.floor(t.dst.layerLocalIdx/l*r)),u=Math.abs(i[h][d]||0);t.targetWeight=Math.max(.05,Math.min(1,u*5))}}const on=new CE({handedness:"right",cursorSource:"hand",cursorAnchor:"index"});let ch=0,lh=0,ir=0,jd=0,Cu=0,Ru=0,Pm=0,Lm=0,Fa=0,Na=0,Im=!1;const Dm=.25;on.on("move",e=>{const t=on.handLandmarks;if(t&&t[8]){const n=(1-t[8].x)*window.innerWidth,i=t[8].y*window.innerHeight;Im?(Fa+=(n-Fa)*Dm,Na+=(i-Na)*Dm):(Fa=n,Na=i,Im=!0),As.style.left=`${Fa}px`,As.style.top=`${Na}px`,Sm.textContent=`${Math.round(Fa)} · ${Math.round(Na)}`}else As.style.left=`${e.screenX}px`,As.style.top=`${e.screenY}px`,Sm.textContent=`${e.screenX} · ${e.screenY}`});window.addEventListener("mousemove",e=>{As.style.left=`${e.clientX}px`,As.style.top=`${e.clientY}px`});on.on("mousedown",()=>{As.classList.add("clicking"),yn("","⬇ mousedown")});on.on("mouseup",()=>{As.classList.remove("clicking"),yn("","⬆ mouseup")});on.on("click",()=>{Lm++,DE.textContent=String(Lm),yn("ev-click","🤏 click")});on.on("dblclick",()=>{yn("ev-click","🤏🤏 dblclick")});on.on("dragstart",e=>{Cu=e.screenX,Ru=e.screenY,yn("","↔ dragstart")});on.on("drag",e=>{const t=Math.max(-30,Math.min(30,e.screenX-Cu)),n=Math.max(-30,Math.min(30,e.screenY-Ru));jd+=t*.004,ir+=n*.003,ir=Math.max(-1.2,Math.min(1.2,ir)),Cu=e.screenX,Ru=e.screenY});on.on("dragend",()=>{yn("","↔ dragend")});let Kd=!1,Pu=0,Lu=0;window.addEventListener("mousedown",e=>{Kd=!0,Pu=e.clientX,Lu=e.clientY});window.addEventListener("mouseup",()=>{Kd=!1});window.addEventListener("mousemove",e=>{Kd&&(jd+=(e.clientX-Pu)*.005,ir+=(e.clientY-Lu)*.004,ir=Math.max(-1.2,Math.min(1.2,ir)),Pu=e.clientX,Lu=e.clientY)});on.on("scroll",e=>{dc=Math.max(4,Math.min(15,dc+e.deltaY*.055));const t=Math.round((1-(dc-4)/11)*100);UE.textContent=`${t}%`,yn("ev-scroll",e.deltaY>0?"🤲 zoom out":"🤲 zoom in")});const ob={thumbsup:{label:"👍 thumbs up"},victory:{label:"✌️ victory"}};for(const[e,t]of Object.entries(ob))on.on(e,()=>yn("",t.label));const ic=new D;let Dc=!1,Um=0;const cb=document.getElementById("thinking");function lb(){cb.classList.remove("on"),Dc=!1}let hh=0;function L_(){if(requestAnimationFrame(L_),Dc)return;const e=performance.now();if(e-Um<1e3/60)return;Um=e,hh+=.011,e-Cm>rb&&(Cm=e,go());for(const i of ci)i.weight+=(i.targetWeight-i.weight)*.012;for(const i of oi)i.targetActivation*=.993,i.activation+=(i.targetActivation-i.activation)*.07,i.activation<4e-4&&(i.activation=0);let t=0;for(const i of ai[0])t+=i.activation;t/=ai[0].length,b_.material.opacity=.55+.3*t+.06*Math.sin(hh*2.5)+.6*Mi,A_.material.opacity=.08+.18*t+.03*Math.sin(hh*1.5)+.25*Mi;const n=t-wm;if(wm=t,n>.05&&(Mi=1),Mi>0){zr.visible=!0;const i=1-Mi,s=1-Math.pow(1-i,3);zr.scale.setScalar(.3+s*5.5),T_.opacity=Mi*Mi*.45,Mi-=.025,Mi<=0&&(Mi=0,zr.visible=!1)}for(let i=0;i<ci.length;i++){const s=ci[i],r=Math.max(s.src.activation*.8,s.dst.activation*.65),a=s.weight*(.12+.88*r),o=a*1,c=a*.4,l=a*.05,h=i*Wa*3;for(let d=0;d<Wa;d++){const u=h+d*3;Pn.eColArr[u]=o,Pn.eColArr[u+1]=c,Pn.eColArr[u+2]=l}}Pn.edgeGeo.attributes.color.needsUpdate=!0;for(let i=0;i<oi.length;i++){const s=oi[i].activation;Pn.nHaloArr[i*3+0]=.08+s*.52,Pn.nHaloArr[i*3+1]=.03+s*.2,Pn.nHaloArr[i*3+2]=.01+s*.03,Pn.nCoreArr[i*3+0]=.2+s*.8,Pn.nCoreArr[i*3+1]=.08+s*.68,Pn.nCoreArr[i*3+2]=.02+s*.18}Pn.nodeHaloGeo.attributes.color.needsUpdate=!0,Pn.nodeCoreGeo.attributes.color.needsUpdate=!0;for(let i=Yn.length-1;i>=0;i--)Yn[i].t+=Yn[i].speed,Yn[i].t>=1&&Yn.splice(i,1);for(let i=0;i<Yn.length;i++){const s=Yn[i];s.edge.curve.getPoint(s.t,ic),pc[i*3]=ic.x,pc[i*3+1]=ic.y,pc[i*3+2]=ic.z;const r=s.t<.12?s.t/.12:s.t>.8?(1-s.t)/.2:1,a=(.55+s.edge.weight*.45)*r;mc[i*3]=a,mc[i*3+1]=a*.88,mc[i*3+2]=a*.42}nr.setDrawRange(0,Yn.length),nr.attributes.position.needsUpdate=!0,nr.attributes.color.needsUpdate=!0,Pm+=.0015,ch+=(ir-ch)*.12,lh+=(jd-lh)*.12,Dn.rotation.x=ch,Dn.rotation.y=Pm+lh,sh+=(dc-sh)*.055,sa.position.z=sh,R_.rotation.y+=35e-6,Yd(),ba.render(ia,sa)}L_();Ua.addEventListener("click",async()=>{Ua.disabled=!0,Ua.textContent="LOADING...",ih.textContent="INIT";try{tc.textContent="Loading MediaPipe (5-10s)...",await on.start(),on.createPanel(),Nt._ensureModel&&(tc.textContent="Loading AI model...",await Nt._ensureModel()),tc.textContent="Setting up voice...";try{await Zi.init()}catch{}const e=document.getElementById("cam-preview"),t=document.getElementById("cam-toggle");on.mediaStream&&e&&(e.srcObject=on.mediaStream),t.textContent="📷 HIDE",t==null||t.addEventListener("click",()=>{const n=e.style.display!=="block";e.style.display=n?"block":"none",t.textContent=n?"📷 HIDE":"📷 CAM"}),ih.textContent="ACTIVE",Em.classList.add("fade-out"),setTimeout(()=>{Em.style.display="none"},650),yn("","start"),setTimeout(async()=>{console.log("[IRIS] 모델 구조 + 성장 데이터 조회 중..."),Nt.fetchModelInfo&&await Nt.fetchModelInfo(),Nt._fetchGrowthData&&await Nt._fetchGrowthData()},1500),document.addEventListener("keydown",n=>{(n.key==="r"||n.key==="R")&&(on.recalibrate(),yn("","recalibrated"))})}catch(e){ih.textContent="ERROR",tc.textContent=`Error: ${e.message}`,Ua.disabled=!1,Ua.textContent="RETRY",console.error(e)}});window.addEventListener("resize",()=>{sa.aspect=window.innerWidth/window.innerHeight,sa.updateProjectionMatrix(),ba.setSize(window.innerWidth,window.innerHeight)});
