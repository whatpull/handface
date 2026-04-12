var h_=Object.defineProperty;var u_=(e,t,n)=>t in e?h_(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var kt=(e,t,n)=>u_(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const iu="183",d_=0,wd=1,f_=2,Do=1,p_=2,va=3,us=0,gn=1,Li=2,Fi=0,_r=1,mi=2,Rd=3,Cd=4,m_=5,Ps=100,g_=101,__=102,v_=103,x_=104,M_=200,S_=201,y_=202,E_=203,Gl=204,Hl=205,b_=206,A_=207,T_=208,w_=209,R_=210,C_=211,P_=212,L_=213,I_=214,Wl=0,Xl=1,Yl=2,Tr=3,ql=4,$l=5,jl=6,Kl=7,em=0,D_=1,U_=2,di=0,nm=1,im=2,sm=3,rm=4,am=5,om=6,cm=7,lm=300,Ws=301,wr=302,qc=303,$c=304,dc=306,Zl=1e3,Di=1001,Jl=1002,Ze=1003,F_=1004,ja=1005,je=1006,jc=1007,Ds=1008,kn=1009,hm=1010,um=1011,Ta=1012,su=1013,gi=1014,li=1015,Bi=1016,ru=1017,au=1018,wa=1020,dm=35902,fm=35899,pm=1021,mm=1022,jn=1023,ki=1026,Us=1027,gm=1028,ou=1029,Rr=1030,cu=1031,lu=1033,Uo=33776,Fo=33777,No=33778,Oo=33779,Ql=35840,th=35841,eh=35842,nh=35843,ih=36196,sh=37492,rh=37496,ah=37488,oh=37489,ch=37490,lh=37491,hh=37808,uh=37809,dh=37810,fh=37811,ph=37812,mh=37813,gh=37814,_h=37815,vh=37816,xh=37817,Mh=37818,Sh=37819,yh=37820,Eh=37821,bh=36492,Ah=36494,Th=36495,wh=36283,Rh=36284,Ch=36285,Ph=36286,N_=3200,O_=0,B_=1,ss="",On="srgb",Cr="srgb-linear",Ko="linear",ae="srgb",Qs=7680,Pd=519,k_=512,z_=513,V_=514,hu=515,G_=516,H_=517,uu=518,W_=519,Ld=35044,Id="300 es",hi=2e3,Zo=2001;function X_(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Jo(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function Y_(){const e=Jo("canvas");return e.style.display="block",e}const Dd={};function Ud(...e){const t="THREE."+e.shift();console.log(t,...e)}function _m(e){const t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){const n=e[1];n&&n.isStackTrace?e[0]+=" "+n.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function Ut(...e){e=_m(e);const t="THREE."+e.shift();{const n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function Qt(...e){e=_m(e);const t="THREE."+e.shift();{const n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Qo(...e){const t=e.join(" ");t in Dd||(Dd[t]=!0,Ut(...e))}function q_(e,t,n){return new Promise(function(i,s){function r(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:s();break;case e.TIMEOUT_EXPIRED:setTimeout(r,n);break;default:i()}}setTimeout(r,n)})}const $_={[Wl]:Xl,[Yl]:jl,[ql]:Kl,[Tr]:$l,[Xl]:Wl,[jl]:Yl,[Kl]:ql,[$l]:Tr};class Xr{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(n);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const n=this._listeners;if(n===void 0)return;const i=n[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Kc=Math.PI/180,Lh=180/Math.PI;function Da(){const e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(tn[e&255]+tn[e>>8&255]+tn[e>>16&255]+tn[e>>24&255]+"-"+tn[t&255]+tn[t>>8&255]+"-"+tn[t>>16&15|64]+tn[t>>24&255]+"-"+tn[n&63|128]+tn[n>>8&255]+"-"+tn[n>>16&255]+tn[n>>24&255]+tn[i&255]+tn[i>>8&255]+tn[i>>16&255]+tn[i>>24&255]).toLowerCase()}function qt(e,t,n){return Math.max(t,Math.min(n,e))}function j_(e,t){return(e%t+t)%t}function Zc(e,t,n){return(1-n)*e+n*t}function ca(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function fn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}class he{constructor(t=0,n=0){he.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,i=this.y,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6],this.y=s[1]*n+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=qt(this.x,t.x,n.x),this.y=qt(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=qt(this.x,t,n),this.y=qt(this.y,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const i=Math.cos(n),s=Math.sin(n),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Yr{constructor(t=0,n=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=s}static slerpFlat(t,n,i,s,r,a,o){let c=i[s+0],l=i[s+1],u=i[s+2],d=i[s+3],h=r[a+0],m=r[a+1],g=r[a+2],M=r[a+3];if(d!==M||c!==h||l!==m||u!==g){let p=c*h+l*m+u*g+d*M;p<0&&(h=-h,m=-m,g=-g,M=-M,p=-p);let f=1-o;if(p<.9995){const y=Math.acos(p),A=Math.sin(y);f=Math.sin(f*y)/A,o=Math.sin(o*y)/A,c=c*f+h*o,l=l*f+m*o,u=u*f+g*o,d=d*f+M*o}else{c=c*f+h*o,l=l*f+m*o,u=u*f+g*o,d=d*f+M*o;const y=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=y,l*=y,u*=y,d*=y}}t[n]=c,t[n+1]=l,t[n+2]=u,t[n+3]=d}static multiplyQuaternionsFlat(t,n,i,s,r,a){const o=i[s],c=i[s+1],l=i[s+2],u=i[s+3],d=r[a],h=r[a+1],m=r[a+2],g=r[a+3];return t[n]=o*g+u*d+c*m-l*h,t[n+1]=c*g+u*h+l*d-o*m,t[n+2]=l*g+u*m+o*h-c*d,t[n+3]=u*g-o*d-c*h-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,s){return this._x=t,this._y=n,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(s/2),d=o(r/2),h=c(i/2),m=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=h*u*d+l*m*g,this._y=l*m*d-h*u*g,this._z=l*u*g+h*m*d,this._w=l*u*d-h*m*g;break;case"YXZ":this._x=h*u*d+l*m*g,this._y=l*m*d-h*u*g,this._z=l*u*g-h*m*d,this._w=l*u*d+h*m*g;break;case"ZXY":this._x=h*u*d-l*m*g,this._y=l*m*d+h*u*g,this._z=l*u*g+h*m*d,this._w=l*u*d-h*m*g;break;case"ZYX":this._x=h*u*d-l*m*g,this._y=l*m*d+h*u*g,this._z=l*u*g-h*m*d,this._w=l*u*d+h*m*g;break;case"YZX":this._x=h*u*d+l*m*g,this._y=l*m*d+h*u*g,this._z=l*u*g-h*m*d,this._w=l*u*d-h*m*g;break;case"XZY":this._x=h*u*d-l*m*g,this._y=l*m*d-h*u*g,this._z=l*u*g+h*m*d,this._w=l*u*d+h*m*g;break;default:Ut("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const i=n/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,i=n[0],s=n[4],r=n[8],a=n[1],o=n[5],c=n[9],l=n[2],u=n[6],d=n[10],h=i+o+d;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(u-c)*m,this._y=(r-l)*m,this._z=(a-s)*m}else if(i>o&&i>d){const m=2*Math.sqrt(1+i-o-d);this._w=(u-c)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+l)/m}else if(o>d){const m=2*Math.sqrt(1+o-i-d);this._w=(r-l)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(c+u)/m}else{const m=2*Math.sqrt(1+d-i-o);this._w=(a-s)/m,this._x=(r+l)/m,this._y=(c+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(qt(this.dot(t),-1,1)))}rotateTowards(t,n){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,n/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const i=t._x,s=t._y,r=t._z,a=t._w,o=n._x,c=n._y,l=n._z,u=n._w;return this._x=i*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-i*l,this._z=r*u+a*l+i*c-s*o,this._w=a*u-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,n){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let c=1-n;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,n=Math.sin(n*l)/u,this._x=this._x*c+i*n,this._y=this._y*c+s*n,this._z=this._z*c+r*n,this._w=this._w*c+a*n,this._onChangeCallback()}else this._x=this._x*c+i*n,this._y=this._y*c+s*n,this._z=this._z*c+r*n,this._w=this._w*c+a*n,this.normalize();return this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(n),r*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class O{constructor(t=0,n=0,i=0){O.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Fd.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Fd.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*n+r[3]*i+r[6]*s,this.y=r[1]*n+r[4]*i+r[7]*s,this.z=r[2]*n+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*n+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*n+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*n+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*n+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){const n=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*i),u=2*(o*n-r*s),d=2*(r*i-a*n);return this.x=n+c*l+a*d-o*u,this.y=i+c*u+o*l-r*d,this.z=s+c*d+r*u-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*s,this.y=r[1]*n+r[5]*i+r[9]*s,this.z=r[2]*n+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=qt(this.x,t.x,n.x),this.y=qt(this.y,t.y,n.y),this.z=qt(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=qt(this.x,t,n),this.y=qt(this.y,t,n),this.z=qt(this.z,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const i=t.x,s=t.y,r=t.z,a=n.x,o=n.y,c=n.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Jc.copy(this).projectOnVector(t),this.sub(Jc)}reflect(t){return this.sub(Jc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return n*n+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){const s=Math.sin(n)*t;return this.x=s*Math.sin(i),this.y=Math.cos(n)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=s,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Jc=new O,Fd=new Yr;class zt{constructor(t,n,i,s,r,a,o,c,l){zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,s,r,a,o,c,l)}set(t,n,i,s,r,a,o,c,l){const u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=n,u[4]=r,u[5]=c,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,s=n.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],u=i[4],d=i[7],h=i[2],m=i[5],g=i[8],M=s[0],p=s[3],f=s[6],y=s[1],A=s[4],E=s[7],T=s[2],R=s[5],P=s[8];return r[0]=a*M+o*y+c*T,r[3]=a*p+o*A+c*R,r[6]=a*f+o*E+c*P,r[1]=l*M+u*y+d*T,r[4]=l*p+u*A+d*R,r[7]=l*f+u*E+d*P,r[2]=h*M+m*y+g*T,r[5]=h*p+m*A+g*R,r[8]=h*f+m*E+g*P,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8];return n*a*u-n*o*l-i*r*u+i*o*c+s*r*l-s*a*c}invert(){const t=this.elements,n=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],d=u*a-o*l,h=o*c-u*r,m=l*r-a*c,g=n*d+i*h+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/g;return t[0]=d*M,t[1]=(s*l-u*i)*M,t[2]=(o*i-s*a)*M,t[3]=h*M,t[4]=(u*n-s*c)*M,t[5]=(s*r-o*n)*M,t[6]=m*M,t[7]=(i*c-l*n)*M,t[8]=(a*n-i*r)*M,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+n,0,0,1),this}scale(t,n){return this.premultiply(Qc.makeScale(t,n)),this}rotate(t){return this.premultiply(Qc.makeRotation(-t)),this}translate(t,n){return this.premultiply(Qc.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,i=t.elements;for(let s=0;s<9;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Qc=new zt,Nd=new zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Od=new zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function K_(){const e={enabled:!0,workingColorSpace:Cr,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ae&&(s.r=Ni(s.r),s.g=Ni(s.g),s.b=Ni(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ae&&(s.r=vr(s.r),s.g=vr(s.g),s.b=vr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ss?Ko:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Qo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Qo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[Cr]:{primaries:t,whitePoint:i,transfer:Ko,toXYZ:Nd,fromXYZ:Od,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:On},outputColorSpaceConfig:{drawingBufferColorSpace:On}},[On]:{primaries:t,whitePoint:i,transfer:ae,toXYZ:Nd,fromXYZ:Od,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:On}}}),e}const Kt=K_();function Ni(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function vr(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}let tr;class Z_{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{tr===void 0&&(tr=Jo("canvas")),tr.width=t.width,tr.height=t.height;const s=tr.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=tr}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=Jo("canvas");n.width=t.width,n.height=t.height;const i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ni(r[a]/255)*255;return i.putImageData(s,0,0),n}else if(t.data){const n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ni(n[i]/255)*255):n[i]=Ni(n[i]);return{data:n,width:t.width,height:t.height}}else return Ut("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let J_=0;class du{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:J_++}),this.uuid=Da(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayHeight,n.displayWidth,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(tl(s[a].image)):r.push(tl(s[a]))}else r=tl(s);i.url=r}return n||(t.images[this.uuid]=i),i}}function tl(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?Z_.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(Ut("Texture: Unable to serialize Texture."),{})}let Q_=0;const el=new O;class rn extends Xr{constructor(t=rn.DEFAULT_IMAGE,n=rn.DEFAULT_MAPPING,i=Di,s=Di,r=je,a=Ds,o=jn,c=kn,l=rn.DEFAULT_ANISOTROPY,u=ss){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Q_++}),this.uuid=Da(),this.name="",this.source=new du(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(el).x}get height(){return this.source.getSize(el).y}get depth(){return this.source.getSize(el).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const n in t){const i=t[n];if(i===void 0){Ut(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const s=this[n];if(s===void 0){Ut(`Texture.setValues(): property '${n}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==lm)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Zl:t.x=t.x-Math.floor(t.x);break;case Di:t.x=t.x<0?0:1;break;case Jl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Zl:t.y=t.y-Math.floor(t.y);break;case Di:t.y=t.y<0?0:1;break;case Jl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=lm;rn.DEFAULT_ANISOTROPY=1;class Ie{constructor(t=0,n=0,i=0,s=1){Ie.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,s){return this.x=t,this.y=n,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*n+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*n+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*n+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*n+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,s,r;const c=t.elements,l=c[0],u=c[4],d=c[8],h=c[1],m=c[5],g=c[9],M=c[2],p=c[6],f=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-M)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+M)<.1&&Math.abs(g+p)<.1&&Math.abs(l+m+f-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const A=(l+1)/2,E=(m+1)/2,T=(f+1)/2,R=(u+h)/4,P=(d+M)/4,x=(g+p)/4;return A>E&&A>T?A<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(A),s=R/i,r=P/i):E>T?E<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(E),i=R/s,r=x/s):T<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),i=P/r,s=x/r),this.set(i,s,r,n),this}let y=Math.sqrt((p-g)*(p-g)+(d-M)*(d-M)+(h-u)*(h-u));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(d-M)/y,this.z=(h-u)/y,this.w=Math.acos((l+m+f-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=qt(this.x,t.x,n.x),this.y=qt(this.y,t.y,n.y),this.z=qt(this.z,t.z,n.z),this.w=qt(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=qt(this.x,t,n),this.y=qt(this.y,t,n),this.z=qt(this.z,t,n),this.w=qt(this.w,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class t1 extends Xr{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:je,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new Ie(0,0,t,n),this.scissorTest=!1,this.viewport=new Ie(0,0,t,n),this.textures=[];const s={width:t,height:n,depth:i.depth},r=new rn(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const n={minFilter:je,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=n,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const s=Object.assign({},t.textures[n].image);this.textures[n].source=new du(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fi extends t1{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}}class vm extends rn{constructor(t=null,n=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=Ze,this.minFilter=Ze,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class e1 extends rn{constructor(t=null,n=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=Ze,this.minFilter=Ze,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class we{constructor(t,n,i,s,r,a,o,c,l,u,d,h,m,g,M,p){we.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,s,r,a,o,c,l,u,d,h,m,g,M,p)}set(t,n,i,s,r,a,o,c,l,u,d,h,m,g,M,p){const f=this.elements;return f[0]=t,f[4]=n,f[8]=i,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=u,f[10]=d,f[14]=h,f[3]=m,f[7]=g,f[11]=M,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new we().fromArray(this.elements)}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){const n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return this.determinant()===0?(t.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const n=this.elements,i=t.elements,s=1/er.setFromMatrixColumn(t,0).length(),r=1/er.setFromMatrixColumn(t,1).length(),a=1/er.setFromMatrixColumn(t,2).length();return n[0]=i[0]*s,n[1]=i[1]*s,n[2]=i[2]*s,n[3]=0,n[4]=i[4]*r,n[5]=i[5]*r,n[6]=i[6]*r,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const h=a*u,m=a*d,g=o*u,M=o*d;n[0]=c*u,n[4]=-c*d,n[8]=l,n[1]=m+g*l,n[5]=h-M*l,n[9]=-o*c,n[2]=M-h*l,n[6]=g+m*l,n[10]=a*c}else if(t.order==="YXZ"){const h=c*u,m=c*d,g=l*u,M=l*d;n[0]=h+M*o,n[4]=g*o-m,n[8]=a*l,n[1]=a*d,n[5]=a*u,n[9]=-o,n[2]=m*o-g,n[6]=M+h*o,n[10]=a*c}else if(t.order==="ZXY"){const h=c*u,m=c*d,g=l*u,M=l*d;n[0]=h-M*o,n[4]=-a*d,n[8]=g+m*o,n[1]=m+g*o,n[5]=a*u,n[9]=M-h*o,n[2]=-a*l,n[6]=o,n[10]=a*c}else if(t.order==="ZYX"){const h=a*u,m=a*d,g=o*u,M=o*d;n[0]=c*u,n[4]=g*l-m,n[8]=h*l+M,n[1]=c*d,n[5]=M*l+h,n[9]=m*l-g,n[2]=-l,n[6]=o*c,n[10]=a*c}else if(t.order==="YZX"){const h=a*c,m=a*l,g=o*c,M=o*l;n[0]=c*u,n[4]=M-h*d,n[8]=g*d+m,n[1]=d,n[5]=a*u,n[9]=-o*u,n[2]=-l*u,n[6]=m*d+g,n[10]=h-M*d}else if(t.order==="XZY"){const h=a*c,m=a*l,g=o*c,M=o*l;n[0]=c*u,n[4]=-d,n[8]=l*u,n[1]=h*d+M,n[5]=a*u,n[9]=m*d-g,n[2]=g*d-m,n[6]=o*u,n[10]=M*d+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(n1,t,i1)}lookAt(t,n,i){const s=this.elements;return xn.subVectors(t,n),xn.lengthSq()===0&&(xn.z=1),xn.normalize(),ji.crossVectors(i,xn),ji.lengthSq()===0&&(Math.abs(i.z)===1?xn.x+=1e-4:xn.z+=1e-4,xn.normalize(),ji.crossVectors(i,xn)),ji.normalize(),Ka.crossVectors(xn,ji),s[0]=ji.x,s[4]=Ka.x,s[8]=xn.x,s[1]=ji.y,s[5]=Ka.y,s[9]=xn.y,s[2]=ji.z,s[6]=Ka.z,s[10]=xn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,s=n.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],u=i[1],d=i[5],h=i[9],m=i[13],g=i[2],M=i[6],p=i[10],f=i[14],y=i[3],A=i[7],E=i[11],T=i[15],R=s[0],P=s[4],x=s[8],v=s[12],W=s[1],w=s[5],U=s[9],F=s[13],V=s[2],z=s[6],H=s[10],N=s[14],Q=s[3],K=s[7],lt=s[11],gt=s[15];return r[0]=a*R+o*W+c*V+l*Q,r[4]=a*P+o*w+c*z+l*K,r[8]=a*x+o*U+c*H+l*lt,r[12]=a*v+o*F+c*N+l*gt,r[1]=u*R+d*W+h*V+m*Q,r[5]=u*P+d*w+h*z+m*K,r[9]=u*x+d*U+h*H+m*lt,r[13]=u*v+d*F+h*N+m*gt,r[2]=g*R+M*W+p*V+f*Q,r[6]=g*P+M*w+p*z+f*K,r[10]=g*x+M*U+p*H+f*lt,r[14]=g*v+M*F+p*N+f*gt,r[3]=y*R+A*W+E*V+T*Q,r[7]=y*P+A*w+E*z+T*K,r[11]=y*x+A*U+E*H+T*lt,r[15]=y*v+A*F+E*N+T*gt,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],d=t[6],h=t[10],m=t[14],g=t[3],M=t[7],p=t[11],f=t[15],y=c*m-l*h,A=o*m-l*d,E=o*h-c*d,T=a*m-l*u,R=a*h-c*u,P=a*d-o*u;return n*(M*y-p*A+f*E)-i*(g*y-p*T+f*R)+s*(g*A-M*T+f*P)-r*(g*E-M*R+p*P)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=n,s[14]=i),this}invert(){const t=this.elements,n=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],d=t[9],h=t[10],m=t[11],g=t[12],M=t[13],p=t[14],f=t[15],y=n*o-i*a,A=n*c-s*a,E=n*l-r*a,T=i*c-s*o,R=i*l-r*o,P=s*l-r*c,x=u*M-d*g,v=u*p-h*g,W=u*f-m*g,w=d*p-h*M,U=d*f-m*M,F=h*f-m*p,V=y*F-A*U+E*w+T*W-R*v+P*x;if(V===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/V;return t[0]=(o*F-c*U+l*w)*z,t[1]=(s*U-i*F-r*w)*z,t[2]=(M*P-p*R+f*T)*z,t[3]=(h*R-d*P-m*T)*z,t[4]=(c*W-a*F-l*v)*z,t[5]=(n*F-s*W+r*v)*z,t[6]=(p*E-g*P-f*A)*z,t[7]=(u*P-h*E+m*A)*z,t[8]=(a*U-o*W+l*x)*z,t[9]=(i*W-n*U-r*x)*z,t[10]=(g*R-M*E+f*y)*z,t[11]=(d*E-u*R-m*y)*z,t[12]=(o*v-a*w-c*x)*z,t[13]=(n*w-i*v+s*x)*z,t[14]=(M*A-g*T-p*y)*z,t[15]=(u*T-d*A+h*y)*z,this}scale(t){const n=this.elements,i=t.x,s=t.y,r=t.z;return n[0]*=i,n[4]*=s,n[8]*=r,n[1]*=i,n[5]*=s,n[9]*=r,n[2]*=i,n[6]*=s,n[10]*=r,n[3]*=i,n[7]*=s,n[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,s))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const i=Math.cos(n),s=Math.sin(n),r=1-i,a=t.x,o=t.y,c=t.z,l=r*a,u=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+i,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,n,s,1,0,0,0,0,1),this}compose(t,n,i){const s=this.elements,r=n._x,a=n._y,o=n._z,c=n._w,l=r+r,u=a+a,d=o+o,h=r*l,m=r*u,g=r*d,M=a*u,p=a*d,f=o*d,y=c*l,A=c*u,E=c*d,T=i.x,R=i.y,P=i.z;return s[0]=(1-(M+f))*T,s[1]=(m+E)*T,s[2]=(g-A)*T,s[3]=0,s[4]=(m-E)*R,s[5]=(1-(h+f))*R,s[6]=(p+y)*R,s[7]=0,s[8]=(g+A)*P,s[9]=(p-y)*P,s[10]=(1-(h+M))*P,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,n,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinant();if(r===0)return i.set(1,1,1),n.identity(),this;let a=er.set(s[0],s[1],s[2]).length();const o=er.set(s[4],s[5],s[6]).length(),c=er.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Xn.copy(this);const l=1/a,u=1/o,d=1/c;return Xn.elements[0]*=l,Xn.elements[1]*=l,Xn.elements[2]*=l,Xn.elements[4]*=u,Xn.elements[5]*=u,Xn.elements[6]*=u,Xn.elements[8]*=d,Xn.elements[9]*=d,Xn.elements[10]*=d,n.setFromRotationMatrix(Xn),i.x=a,i.y=o,i.z=c,this}makePerspective(t,n,i,s,r,a,o=hi,c=!1){const l=this.elements,u=2*r/(n-t),d=2*r/(i-s),h=(n+t)/(n-t),m=(i+s)/(i-s);let g,M;if(c)g=r/(a-r),M=a*r/(a-r);else if(o===hi)g=-(a+r)/(a-r),M=-2*a*r/(a-r);else if(o===Zo)g=-a/(a-r),M=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=M,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,n,i,s,r,a,o=hi,c=!1){const l=this.elements,u=2/(n-t),d=2/(i-s),h=-(n+t)/(n-t),m=-(i+s)/(i-s);let g,M;if(c)g=1/(a-r),M=a/(a-r);else if(o===hi)g=-2/(a-r),M=-(a+r)/(a-r);else if(o===Zo)g=-1/(a-r),M=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=g,l[14]=M,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const n=this.elements,i=t.elements;for(let s=0;s<16;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}}const er=new O,Xn=new we,n1=new O(0,0,0),i1=new O(1,1,1),ji=new O,Ka=new O,xn=new O,Bd=new we,kd=new Yr;class zi{constructor(t=0,n=0,i=0,s=zi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,s=this._order){return this._x=t,this._y=n,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],d=s[2],h=s[6],m=s[10];switch(n){case"XYZ":this._y=Math.asin(qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-qt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(qt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,m),this._y=0);break;default:Ut("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return Bd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Bd,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return kd.setFromEuler(this),this.setFromQuaternion(kd,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}zi.DEFAULT_ORDER="XYZ";class xm{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let s1=0;const zd=new O,nr=new Yr,Ti=new we,Za=new O,la=new O,r1=new O,a1=new Yr,Vd=new O(1,0,0),Gd=new O(0,1,0),Hd=new O(0,0,1),Wd={type:"added"},o1={type:"removed"},ir={type:"childadded",child:null},nl={type:"childremoved",child:null};class un extends Xr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:s1++}),this.uuid=Da(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=un.DEFAULT_UP.clone();const t=new O,n=new zi,i=new Yr,s=new O(1,1,1);function r(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new we},normalMatrix:{value:new zt}}),this.matrix=new we,this.matrixWorld=new we,this.matrixAutoUpdate=un.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new xm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return nr.setFromAxisAngle(t,n),this.quaternion.multiply(nr),this}rotateOnWorldAxis(t,n){return nr.setFromAxisAngle(t,n),this.quaternion.premultiply(nr),this}rotateX(t){return this.rotateOnAxis(Vd,t)}rotateY(t){return this.rotateOnAxis(Gd,t)}rotateZ(t){return this.rotateOnAxis(Hd,t)}translateOnAxis(t,n){return zd.copy(t).applyQuaternion(this.quaternion),this.position.add(zd.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(Vd,t)}translateY(t){return this.translateOnAxis(Gd,t)}translateZ(t){return this.translateOnAxis(Hd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ti.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?Za.copy(t):Za.set(t,n,i);const s=this.parent;this.updateWorldMatrix(!0,!1),la.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ti.lookAt(la,Za,this.up):Ti.lookAt(Za,la,this.up),this.quaternion.setFromRotationMatrix(Ti),s&&(Ti.extractRotation(s.matrixWorld),nr.setFromRotationMatrix(Ti),this.quaternion.premultiply(nr.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(Qt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Wd),ir.child=t,this.dispatchEvent(ir),ir.child=null):Qt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(o1),nl.child=t,this.dispatchEvent(nl),nl.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ti.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ti.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ti),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Wd),ir.child=t,this.dispatchEvent(ir),ir.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(t,n);if(a!==void 0)return a}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(la,t,r1),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(la,a1,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const n=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=n-r[0]*n-r[4]*i-r[8]*s,r[13]+=i-r[1]*n-r[5]*i-r[9]*s,r[14]+=s-r[2]*n-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(n){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),d=a(t.shapes),h=a(t.skeletons),m=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),t.pivot!==null&&(this.pivot=t.pivot.clone()),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}un.DEFAULT_UP=new O(0,1,0);un.DEFAULT_MATRIX_AUTO_UPDATE=!0;un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class mr extends un{constructor(){super(),this.isGroup=!0,this.type="Group"}}const c1={type:"move"};class il{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const M of t.hand.values()){const p=n.getJointPose(M,i),f=this._getHandJoint(l,M);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),m=.02,g=.005;l.inputState.pinching&&h>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=n.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=n.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(c1)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const i=new mr;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}}const Mm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ki={h:0,s:0,l:0},Ja={h:0,s:0,l:0};function sl(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}class ie{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=On){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.colorSpaceToWorking(this,n),this}setRGB(t,n,i,s=Kt.workingColorSpace){return this.r=t,this.g=n,this.b=i,Kt.colorSpaceToWorking(this,s),this}setHSL(t,n,i,s=Kt.workingColorSpace){if(t=j_(t,1),n=qt(n,0,1),i=qt(i,0,1),n===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+n):i+n-i*n,a=2*i-r;this.r=sl(a,r,t+1/3),this.g=sl(a,r,t),this.b=sl(a,r,t-1/3)}return Kt.colorSpaceToWorking(this,s),this}setStyle(t,n=On){function i(r){r!==void 0&&parseFloat(r)<1&&Ut("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,n);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,n);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,n);break;default:Ut("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(r,16),n);Ut("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=On){const i=Mm[t.toLowerCase()];return i!==void 0?this.setHex(i,n):Ut("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ni(t.r),this.g=Ni(t.g),this.b=Ni(t.b),this}copyLinearToSRGB(t){return this.r=vr(t.r),this.g=vr(t.g),this.b=vr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=On){return Kt.workingToColorSpace(en.copy(this),t),Math.round(qt(en.r*255,0,255))*65536+Math.round(qt(en.g*255,0,255))*256+Math.round(qt(en.b*255,0,255))}getHexString(t=On){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Kt.workingColorSpace){Kt.workingToColorSpace(en.copy(this),n);const i=en.r,s=en.g,r=en.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=u<=.5?d/(a+o):d/(2-a-o),a){case i:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-i)/d+2;break;case r:c=(i-s)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,n=Kt.workingColorSpace){return Kt.workingToColorSpace(en.copy(this),n),t.r=en.r,t.g=en.g,t.b=en.b,t}getStyle(t=On){Kt.workingToColorSpace(en.copy(this),t);const n=en.r,i=en.g,s=en.b;return t!==On?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,n,i){return this.getHSL(Ki),this.setHSL(Ki.h+t,Ki.s+n,Ki.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(Ki),t.getHSL(Ja);const i=Zc(Ki.h,Ja.h,n),s=Zc(Ki.s,Ja.s,n),r=Zc(Ki.l,Ja.l,n);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*n+r[3]*i+r[6]*s,this.g=r[1]*n+r[4]*i+r[7]*s,this.b=r[2]*n+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const en=new ie;ie.NAMES=Mm;class l1 extends un{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new zi,this.environmentIntensity=1,this.environmentRotation=new zi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Yn=new O,wi=new O,rl=new O,Ri=new O,sr=new O,rr=new O,Xd=new O,al=new O,ol=new O,cl=new O,ll=new Ie,hl=new Ie,ul=new Ie;class $n{constructor(t=new O,n=new O,i=new O){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,s){s.subVectors(i,n),Yn.subVectors(t,n),s.cross(Yn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,n,i,s,r){Yn.subVectors(s,n),wi.subVectors(i,n),rl.subVectors(t,n);const a=Yn.dot(Yn),o=Yn.dot(wi),c=Yn.dot(rl),l=wi.dot(wi),u=wi.dot(rl),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;const h=1/d,m=(l*c-o*u)*h,g=(a*u-o*c)*h;return r.set(1-m-g,g,m)}static containsPoint(t,n,i,s){return this.getBarycoord(t,n,i,s,Ri)===null?!1:Ri.x>=0&&Ri.y>=0&&Ri.x+Ri.y<=1}static getInterpolation(t,n,i,s,r,a,o,c){return this.getBarycoord(t,n,i,s,Ri)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ri.x),c.addScaledVector(a,Ri.y),c.addScaledVector(o,Ri.z),c)}static getInterpolatedAttribute(t,n,i,s,r,a){return ll.setScalar(0),hl.setScalar(0),ul.setScalar(0),ll.fromBufferAttribute(t,n),hl.fromBufferAttribute(t,i),ul.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(ll,r.x),a.addScaledVector(hl,r.y),a.addScaledVector(ul,r.z),a}static isFrontFacing(t,n,i,s){return Yn.subVectors(i,n),wi.subVectors(t,n),Yn.cross(wi).dot(s)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,s){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,n,i,s){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Yn.subVectors(this.c,this.b),wi.subVectors(this.a,this.b),Yn.cross(wi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return $n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return $n.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,s,r){return $n.getInterpolation(t,this.a,this.b,this.c,n,i,s,r)}containsPoint(t){return $n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return $n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const i=this.a,s=this.b,r=this.c;let a,o;sr.subVectors(s,i),rr.subVectors(r,i),al.subVectors(t,i);const c=sr.dot(al),l=rr.dot(al);if(c<=0&&l<=0)return n.copy(i);ol.subVectors(t,s);const u=sr.dot(ol),d=rr.dot(ol);if(u>=0&&d<=u)return n.copy(s);const h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),n.copy(i).addScaledVector(sr,a);cl.subVectors(t,r);const m=sr.dot(cl),g=rr.dot(cl);if(g>=0&&m<=g)return n.copy(r);const M=m*l-c*g;if(M<=0&&l>=0&&g<=0)return o=l/(l-g),n.copy(i).addScaledVector(rr,o);const p=u*g-m*d;if(p<=0&&d-u>=0&&m-g>=0)return Xd.subVectors(r,s),o=(d-u)/(d-u+(m-g)),n.copy(s).addScaledVector(Xd,o);const f=1/(p+M+h);return a=M*f,o=h*f,n.copy(i).addScaledVector(sr,a).addScaledVector(rr,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Ua{constructor(t=new O(1/0,1/0,1/0),n=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(qn.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(qn.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const i=qn.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(n===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,qn):qn.fromBufferAttribute(r,a),qn.applyMatrix4(t.matrixWorld),this.expandByPoint(qn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Qa.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Qa.copy(i.boundingBox)),Qa.applyMatrix4(t.matrixWorld),this.union(Qa)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,qn),qn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ha),to.subVectors(this.max,ha),ar.subVectors(t.a,ha),or.subVectors(t.b,ha),cr.subVectors(t.c,ha),Zi.subVectors(or,ar),Ji.subVectors(cr,or),vs.subVectors(ar,cr);let n=[0,-Zi.z,Zi.y,0,-Ji.z,Ji.y,0,-vs.z,vs.y,Zi.z,0,-Zi.x,Ji.z,0,-Ji.x,vs.z,0,-vs.x,-Zi.y,Zi.x,0,-Ji.y,Ji.x,0,-vs.y,vs.x,0];return!dl(n,ar,or,cr,to)||(n=[1,0,0,0,1,0,0,0,1],!dl(n,ar,or,cr,to))?!1:(eo.crossVectors(Zi,Ji),n=[eo.x,eo.y,eo.z],dl(n,ar,or,cr,to))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,qn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(qn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ci),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ci=[new O,new O,new O,new O,new O,new O,new O,new O],qn=new O,Qa=new Ua,ar=new O,or=new O,cr=new O,Zi=new O,Ji=new O,vs=new O,ha=new O,to=new O,eo=new O,xs=new O;function dl(e,t,n,i,s){for(let r=0,a=e.length-3;r<=a;r+=3){xs.fromArray(e,r);const o=s.x*Math.abs(xs.x)+s.y*Math.abs(xs.y)+s.z*Math.abs(xs.z),c=t.dot(xs),l=n.dot(xs),u=i.dot(xs);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Ue=new O,no=new he;let h1=0;class an{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:h1++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=Ld,this.updateRanges=[],this.gpuType=li,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=n.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)no.fromBufferAttribute(this,n),no.applyMatrix3(t),this.setXY(n,no.x,no.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ue.fromBufferAttribute(this,n),Ue.applyMatrix3(t),this.setXYZ(n,Ue.x,Ue.y,Ue.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)Ue.fromBufferAttribute(this,n),Ue.applyMatrix4(t),this.setXYZ(n,Ue.x,Ue.y,Ue.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)Ue.fromBufferAttribute(this,n),Ue.applyNormalMatrix(t),this.setXYZ(n,Ue.x,Ue.y,Ue.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)Ue.fromBufferAttribute(this,n),Ue.transformDirection(t),this.setXYZ(n,Ue.x,Ue.y,Ue.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=ca(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=fn(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=ca(n,this.array)),n}setX(t,n){return this.normalized&&(n=fn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=ca(n,this.array)),n}setY(t,n){return this.normalized&&(n=fn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=ca(n,this.array)),n}setZ(t,n){return this.normalized&&(n=fn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=ca(n,this.array)),n}setW(t,n){return this.normalized&&(n=fn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=fn(n,this.array),i=fn(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,s){return t*=this.itemSize,this.normalized&&(n=fn(n,this.array),i=fn(i,this.array),s=fn(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,n,i,s,r){return t*=this.itemSize,this.normalized&&(n=fn(n,this.array),i=fn(i,this.array),s=fn(s,this.array),r=fn(r,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ld&&(t.usage=this.usage),t}}class Sm extends an{constructor(t,n,i){super(new Uint16Array(t),n,i)}}class ym extends an{constructor(t,n,i){super(new Uint32Array(t),n,i)}}class dn extends an{constructor(t,n,i){super(new Float32Array(t),n,i)}}const u1=new Ua,ua=new O,fl=new O;class Fa{constructor(t=new O,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const i=this.center;n!==void 0?i.copy(n):u1.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ua.subVectors(t,this.center);const n=ua.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),s=(i-this.radius)*.5;this.center.addScaledVector(ua,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(fl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ua.copy(t.center).add(fl)),this.expandByPoint(ua.copy(t.center).sub(fl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let d1=0;const In=new we,pl=new un,lr=new O,Mn=new Ua,da=new Ua,Ye=new O;class on extends Xr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:d1++}),this.uuid=Da(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(X_(t)?ym:Sm)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new zt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return In.makeRotationFromQuaternion(t),this.applyMatrix4(In),this}rotateX(t){return In.makeRotationX(t),this.applyMatrix4(In),this}rotateY(t){return In.makeRotationY(t),this.applyMatrix4(In),this}rotateZ(t){return In.makeRotationZ(t),this.applyMatrix4(In),this}translate(t,n,i){return In.makeTranslation(t,n,i),this.applyMatrix4(In),this}scale(t,n,i){return In.makeScale(t,n,i),this.applyMatrix4(In),this}lookAt(t){return pl.lookAt(t),pl.updateMatrix(),this.applyMatrix4(pl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(lr).negate(),this.translate(lr.x,lr.y,lr.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new dn(i,3))}else{const i=Math.min(t.length,n.count);for(let s=0;s<i;s++){const r=t[s];n.setXYZ(s,r.x,r.y,r.z||0)}t.length>n.count&&Ut("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ua);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Qt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,s=n.length;i<s;i++){const r=n[i];Mn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ye.addVectors(this.boundingBox.min,Mn.min),this.boundingBox.expandByPoint(Ye),Ye.addVectors(this.boundingBox.max,Mn.max),this.boundingBox.expandByPoint(Ye)):(this.boundingBox.expandByPoint(Mn.min),this.boundingBox.expandByPoint(Mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Fa);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Qt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(t){const i=this.boundingSphere.center;if(Mn.setFromBufferAttribute(t),n)for(let r=0,a=n.length;r<a;r++){const o=n[r];da.setFromBufferAttribute(o),this.morphTargetsRelative?(Ye.addVectors(Mn.min,da.min),Mn.expandByPoint(Ye),Ye.addVectors(Mn.max,da.max),Mn.expandByPoint(Ye)):(Mn.expandByPoint(da.min),Mn.expandByPoint(da.max))}Mn.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Ye.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ye));if(n)for(let r=0,a=n.length;r<a;r++){const o=n[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Ye.fromBufferAttribute(o,l),c&&(lr.fromBufferAttribute(t,l),Ye.add(lr)),s=Math.max(s,i.distanceToSquared(Ye))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Qt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Qt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,s=n.normal,r=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new an(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let x=0;x<i.count;x++)o[x]=new O,c[x]=new O;const l=new O,u=new O,d=new O,h=new he,m=new he,g=new he,M=new O,p=new O;function f(x,v,W){l.fromBufferAttribute(i,x),u.fromBufferAttribute(i,v),d.fromBufferAttribute(i,W),h.fromBufferAttribute(r,x),m.fromBufferAttribute(r,v),g.fromBufferAttribute(r,W),u.sub(l),d.sub(l),m.sub(h),g.sub(h);const w=1/(m.x*g.y-g.x*m.y);isFinite(w)&&(M.copy(u).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(w),p.copy(d).multiplyScalar(m.x).addScaledVector(u,-g.x).multiplyScalar(w),o[x].add(M),o[v].add(M),o[W].add(M),c[x].add(p),c[v].add(p),c[W].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let x=0,v=y.length;x<v;++x){const W=y[x],w=W.start,U=W.count;for(let F=w,V=w+U;F<V;F+=3)f(t.getX(F+0),t.getX(F+1),t.getX(F+2))}const A=new O,E=new O,T=new O,R=new O;function P(x){T.fromBufferAttribute(s,x),R.copy(T);const v=o[x];A.copy(v),A.sub(T.multiplyScalar(T.dot(v))).normalize(),E.crossVectors(R,v);const w=E.dot(c[x])<0?-1:1;a.setXYZW(x,A.x,A.y,A.z,w)}for(let x=0,v=y.length;x<v;++x){const W=y[x],w=W.start,U=W.count;for(let F=w,V=w+U;F<V;F+=3)P(t.getX(F+0)),P(t.getX(F+1)),P(t.getX(F+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new an(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const s=new O,r=new O,a=new O,o=new O,c=new O,l=new O,u=new O,d=new O;if(t)for(let h=0,m=t.count;h<m;h+=3){const g=t.getX(h+0),M=t.getX(h+1),p=t.getX(h+2);s.fromBufferAttribute(n,g),r.fromBufferAttribute(n,M),a.fromBufferAttribute(n,p),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,M),l.fromBufferAttribute(i,p),o.add(u),c.add(u),l.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(M,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let h=0,m=n.count;h<m;h+=3)s.fromBufferAttribute(n,h+0),r.fromBufferAttribute(n,h+1),a.fromBufferAttribute(n,h+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)Ye.fromBufferAttribute(t,n),Ye.normalize(),t.setXYZ(n,Ye.x,Ye.y,Ye.z)}toNonIndexed(){function t(o,c){const l=o.array,u=o.itemSize,d=o.normalized,h=new l.constructor(c.length*u);let m=0,g=0;for(let M=0,p=c.length;M<p;M++){o.isInterleavedBufferAttribute?m=c[M]*o.data.stride+o.offset:m=c[M]*u;for(let f=0;f<u;f++)h[g++]=l[m++]}return new an(h,u,d)}if(this.index===null)return Ut("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new on,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,i);n.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,d=l.length;u<d;u++){const h=l[u],m=t(h,i);c.push(m)}n.morphAttributes[o]=c}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];n.addGroup(l.start,l.count,l.materialIndex)}return n}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){const m=l[d];u.push(m.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(n))}const r=t.morphAttributes;for(const l in r){const u=[],d=r[l];for(let h=0,m=d.length;h<m;h++)u.push(d[h].clone(n));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,u=a.length;l<u;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let f1=0;class qr extends Xr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:f1++}),this.uuid=Da(),this.name="",this.type="Material",this.blending=_r,this.side=us,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Gl,this.blendDst=Hl,this.blendEquation=Ps,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ie(0,0,0),this.blendAlpha=0,this.depthFunc=Tr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Pd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qs,this.stencilZFail=Qs,this.stencilZPass=Qs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const i=t[n];if(i===void 0){Ut(`Material: parameter '${n}' has value of undefined.`);continue}const s=this[n];if(s===void 0){Ut(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==_r&&(i.blending=this.blending),this.side!==us&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Gl&&(i.blendSrc=this.blendSrc),this.blendDst!==Hl&&(i.blendDst=this.blendDst),this.blendEquation!==Ps&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Tr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Pd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Qs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Qs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(n){const r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let i=null;if(n!==null){const s=n.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=n[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Pi=new O,ml=new O,io=new O,Qi=new O,gl=new O,so=new O,_l=new O;class fu{constructor(t=new O,n=new O(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Pi)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=Pi.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Pi.copy(this.origin).addScaledVector(this.direction,n),Pi.distanceToSquared(t))}distanceSqToSegment(t,n,i,s){ml.copy(t).add(n).multiplyScalar(.5),io.copy(n).sub(t).normalize(),Qi.copy(this.origin).sub(ml);const r=t.distanceTo(n)*.5,a=-this.direction.dot(io),o=Qi.dot(this.direction),c=-Qi.dot(io),l=Qi.lengthSq(),u=Math.abs(1-a*a);let d,h,m,g;if(u>0)if(d=a*c-o,h=a*o-c,g=r*u,d>=0)if(h>=-g)if(h<=g){const M=1/u;d*=M,h*=M,m=d*(d+a*h+2*o)+h*(a*d+h+2*c)+l}else h=r,d=Math.max(0,-(a*h+o)),m=-d*d+h*(h+2*c)+l;else h=-r,d=Math.max(0,-(a*h+o)),m=-d*d+h*(h+2*c)+l;else h<=-g?(d=Math.max(0,-(-a*r+o)),h=d>0?-r:Math.min(Math.max(-r,-c),r),m=-d*d+h*(h+2*c)+l):h<=g?(d=0,h=Math.min(Math.max(-r,-c),r),m=h*(h+2*c)+l):(d=Math.max(0,-(a*r+o)),h=d>0?r:Math.min(Math.max(-r,-c),r),m=-d*d+h*(h+2*c)+l);else h=a>0?-r:r,d=Math.max(0,-(a*h+o)),m=-d*d+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(ml).addScaledVector(io,h),m}intersectSphere(t,n){Pi.subVectors(t.center,this.origin);const i=Pi.dot(this.direction),s=Pi.dot(Pi)-i*i,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){const i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(i=(t.min.x-h.x)*l,s=(t.max.x-h.x)*l):(i=(t.max.x-h.x)*l,s=(t.min.x-h.x)*l),u>=0?(r=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-h.z)*d,c=(t.max.z-h.z)*d):(o=(t.max.z-h.z)*d,c=(t.min.z-h.z)*d),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,n)}intersectsBox(t){return this.intersectBox(t,Pi)!==null}intersectTriangle(t,n,i,s,r){gl.subVectors(n,t),so.subVectors(i,t),_l.crossVectors(gl,so);let a=this.direction.dot(_l),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Qi.subVectors(this.origin,t);const c=o*this.direction.dot(so.crossVectors(Qi,so));if(c<0)return null;const l=o*this.direction.dot(gl.cross(Qi));if(l<0||c+l>a)return null;const u=-o*Qi.dot(_l);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Pr extends qr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zi,this.combine=em,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Yd=new we,Ms=new fu,ro=new Fa,qd=new O,ao=new O,oo=new O,co=new O,vl=new O,lo=new O,$d=new O,ho=new O;class Tn extends un{constructor(t=new on,n=new Pr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,n){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){lo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],d=r[c];u!==0&&(vl.fromBufferAttribute(d,t),a?lo.addScaledVector(vl,u):lo.addScaledVector(vl.sub(n),u))}n.add(lo)}return n}raycast(t,n){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),ro.copy(i.boundingSphere),ro.applyMatrix4(r),Ms.copy(t.ray).recast(t.near),!(ro.containsPoint(Ms.origin)===!1&&(Ms.intersectSphere(ro,qd)===null||Ms.origin.distanceToSquared(qd)>(t.far-t.near)**2))&&(Yd.copy(r).invert(),Ms.copy(t.ray).applyMatrix4(Yd),!(i.boundingBox!==null&&Ms.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,Ms)))}_computeIntersections(t,n,i){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,M=h.length;g<M;g++){const p=h[g],f=a[p.materialIndex],y=Math.max(p.start,m.start),A=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let E=y,T=A;E<T;E+=3){const R=o.getX(E),P=o.getX(E+1),x=o.getX(E+2);s=uo(this,f,t,i,l,u,d,R,P,x),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=p.materialIndex,n.push(s))}}else{const g=Math.max(0,m.start),M=Math.min(o.count,m.start+m.count);for(let p=g,f=M;p<f;p+=3){const y=o.getX(p),A=o.getX(p+1),E=o.getX(p+2);s=uo(this,a,t,i,l,u,d,y,A,E),s&&(s.faceIndex=Math.floor(p/3),n.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,M=h.length;g<M;g++){const p=h[g],f=a[p.materialIndex],y=Math.max(p.start,m.start),A=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let E=y,T=A;E<T;E+=3){const R=E,P=E+1,x=E+2;s=uo(this,f,t,i,l,u,d,R,P,x),s&&(s.faceIndex=Math.floor(E/3),s.face.materialIndex=p.materialIndex,n.push(s))}}else{const g=Math.max(0,m.start),M=Math.min(c.count,m.start+m.count);for(let p=g,f=M;p<f;p+=3){const y=p,A=p+1,E=p+2;s=uo(this,a,t,i,l,u,d,y,A,E),s&&(s.faceIndex=Math.floor(p/3),n.push(s))}}}}function p1(e,t,n,i,s,r,a,o){let c;if(t.side===gn?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,t.side===us,o),c===null)return null;ho.copy(o),ho.applyMatrix4(e.matrixWorld);const l=n.ray.origin.distanceTo(ho);return l<n.near||l>n.far?null:{distance:l,point:ho.clone(),object:e}}function uo(e,t,n,i,s,r,a,o,c,l){e.getVertexPosition(o,ao),e.getVertexPosition(c,oo),e.getVertexPosition(l,co);const u=p1(e,t,n,i,ao,oo,co,$d);if(u){const d=new O;$n.getBarycoord($d,ao,oo,co,d),s&&(u.uv=$n.getInterpolatedAttribute(s,o,c,l,d,new he)),r&&(u.uv1=$n.getInterpolatedAttribute(r,o,c,l,d,new he)),a&&(u.normal=$n.getInterpolatedAttribute(a,o,c,l,d,new O),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new O,materialIndex:0};$n.getNormal(ao,oo,co,h.normal),u.face=h,u.barycoord=d}return u}class m1 extends rn{constructor(t=null,n=1,i=1,s,r,a,o,c,l=Ze,u=Ze,d,h){super(null,a,o,c,l,u,s,r,d,h),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const xl=new O,g1=new O,_1=new zt;class Ts{constructor(t=new O(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,s){return this.normal.set(t,n,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){const s=xl.subVectors(i,n).cross(g1.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const i=t.delta(xl),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:n.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const i=n||_1.getNormalMatrix(t),s=this.coplanarPoint(xl).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ss=new Fa,v1=new he(.5,.5),fo=new O;class Em{constructor(t=new Ts,n=new Ts,i=new Ts,s=new Ts,r=new Ts,a=new Ts){this.planes=[t,n,i,s,r,a]}set(t,n,i,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=hi,i=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],d=r[5],h=r[6],m=r[7],g=r[8],M=r[9],p=r[10],f=r[11],y=r[12],A=r[13],E=r[14],T=r[15];if(s[0].setComponents(l-a,m-u,f-g,T-y).normalize(),s[1].setComponents(l+a,m+u,f+g,T+y).normalize(),s[2].setComponents(l+o,m+d,f+M,T+A).normalize(),s[3].setComponents(l-o,m-d,f-M,T-A).normalize(),i)s[4].setComponents(c,h,p,E).normalize(),s[5].setComponents(l-c,m-h,f-p,T-E).normalize();else if(s[4].setComponents(l-c,m-h,f-p,T-E).normalize(),n===hi)s[5].setComponents(l+c,m+h,f+p,T+E).normalize();else if(n===Zo)s[5].setComponents(c,h,p,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ss.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Ss.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ss)}intersectsSprite(t){Ss.center.set(0,0,0);const n=v1.distanceTo(t.center);return Ss.radius=.7071067811865476+n,Ss.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ss)}intersectsSphere(t){const n=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(n[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const n=this.planes;for(let i=0;i<6;i++){const s=n[i];if(fo.x=s.normal.x>0?t.max.x:t.min.x,fo.y=s.normal.y>0?t.max.y:t.min.y,fo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(fo)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class bm extends qr{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ie(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const tc=new O,ec=new O,jd=new we,fa=new fu,po=new Fa,Ml=new O,Kd=new O;class x1 extends un{constructor(t=new on,n=new bm){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,i=[0];for(let s=1,r=n.count;s<r;s++)tc.fromBufferAttribute(n,s-1),ec.fromBufferAttribute(n,s),i[s]=i[s-1],i[s]+=tc.distanceTo(ec);t.setAttribute("lineDistance",new dn(i,1))}else Ut("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),po.copy(i.boundingSphere),po.applyMatrix4(s),po.radius+=r,t.ray.intersectsSphere(po)===!1)return;jd.copy(s).invert(),fa.copy(t.ray).applyMatrix4(jd);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const m=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let M=m,p=g-1;M<p;M+=l){const f=u.getX(M),y=u.getX(M+1),A=mo(this,t,fa,c,f,y,M);A&&n.push(A)}if(this.isLineLoop){const M=u.getX(g-1),p=u.getX(m),f=mo(this,t,fa,c,M,p,g-1);f&&n.push(f)}}else{const m=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let M=m,p=g-1;M<p;M+=l){const f=mo(this,t,fa,c,M,M+1,M);f&&n.push(f)}if(this.isLineLoop){const M=mo(this,t,fa,c,g-1,m,g-1);M&&n.push(M)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function mo(e,t,n,i,s,r,a){const o=e.geometry.attributes.position;if(tc.fromBufferAttribute(o,s),ec.fromBufferAttribute(o,r),n.distanceSqToSegment(tc,ec,Ml,Kd)>i)return;Ml.applyMatrix4(e.matrixWorld);const l=t.ray.origin.distanceTo(Ml);if(!(l<t.near||l>t.far))return{distance:l,point:Kd.clone().applyMatrix4(e.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:e}}const Zd=new O,Jd=new O;class M1 extends x1{constructor(t,n){super(t,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,i=[];for(let s=0,r=n.count;s<r;s+=2)Zd.fromBufferAttribute(n,s),Jd.fromBufferAttribute(n,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Zd.distanceTo(Jd);t.setAttribute("lineDistance",new dn(i,1))}else Ut("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class fc extends qr{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ie(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Qd=new we,Ih=new fu,go=new Fa,_o=new O;class pu extends un{constructor(t=new on,n=new fc){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,n){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),go.copy(i.boundingSphere),go.applyMatrix4(s),go.radius+=r,t.ray.intersectsSphere(go)===!1)return;Qd.copy(s).invert(),Ih.copy(t.ray).applyMatrix4(Qd);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,d=i.attributes.position;if(l!==null){const h=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let g=h,M=m;g<M;g++){const p=l.getX(g);_o.fromBufferAttribute(d,p),tf(_o,p,c,s,t,n,this)}}else{const h=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let g=h,M=m;g<M;g++)_o.fromBufferAttribute(d,g),tf(_o,g,c,s,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function tf(e,t,n,i,s,r,a){const o=Ih.distanceSqToPoint(e);if(o<n){const c=new O;Ih.closestPointToPoint(e,c),c.applyMatrix4(i);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Am extends rn{constructor(t=[],n=Ws,i,s,r,a,o,c,l,u){super(t,n,i,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class S1 extends rn{constructor(t,n,i,s,r,a,o,c,l){super(t,n,i,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Ra extends rn{constructor(t,n,i=gi,s,r,a,o=Ze,c=Ze,l,u=ki,d=1){if(u!==ki&&u!==Us)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:t,height:n,depth:d};super(h,s,r,a,o,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new du(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class y1 extends Ra{constructor(t,n=gi,i=Ws,s,r,a=Ze,o=Ze,c,l=ki){const u={width:t,height:t,depth:1},d=[u,u,u,u,u,u];super(t,t,n,i,s,r,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Tm extends rn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Na extends on{constructor(t=1,n=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],d=[];let h=0,m=0;g("z","y","x",-1,-1,i,n,t,a,r,0),g("z","y","x",1,-1,i,n,-t,a,r,1),g("x","z","y",1,1,t,i,n,s,a,2),g("x","z","y",1,-1,t,i,-n,s,a,3),g("x","y","z",1,-1,t,n,i,s,r,4),g("x","y","z",-1,-1,t,n,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new dn(l,3)),this.setAttribute("normal",new dn(u,3)),this.setAttribute("uv",new dn(d,2));function g(M,p,f,y,A,E,T,R,P,x,v){const W=E/P,w=T/x,U=E/2,F=T/2,V=R/2,z=P+1,H=x+1;let N=0,Q=0;const K=new O;for(let lt=0;lt<H;lt++){const gt=lt*w-F;for(let dt=0;dt<z;dt++){const Gt=dt*W-U;K[M]=Gt*y,K[p]=gt*A,K[f]=V,l.push(K.x,K.y,K.z),K[M]=0,K[p]=0,K[f]=R>0?1:-1,u.push(K.x,K.y,K.z),d.push(dt/P),d.push(1-lt/x),N+=1}}for(let lt=0;lt<x;lt++)for(let gt=0;gt<P;gt++){const dt=h+gt+z*lt,Gt=h+gt+z*(lt+1),_e=h+(gt+1)+z*(lt+1),ge=h+(gt+1)+z*lt;c.push(dt,Gt,ge),c.push(Gt,_e,ge),Q+=6}o.addGroup(m,Q,v),m+=Q,h+=N}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Na(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class pc extends on{constructor(t=1,n=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:s};const r=t/2,a=n/2,o=Math.floor(i),c=Math.floor(s),l=o+1,u=c+1,d=t/o,h=n/c,m=[],g=[],M=[],p=[];for(let f=0;f<u;f++){const y=f*h-a;for(let A=0;A<l;A++){const E=A*d-r;g.push(E,-y,0),M.push(0,0,1),p.push(A/o),p.push(1-f/c)}}for(let f=0;f<c;f++)for(let y=0;y<o;y++){const A=y+l*f,E=y+l*(f+1),T=y+1+l*(f+1),R=y+1+l*f;m.push(A,E,R),m.push(E,T,R)}this.setIndex(m),this.setAttribute("position",new dn(g,3)),this.setAttribute("normal",new dn(M,3)),this.setAttribute("uv",new dn(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pc(t.width,t.height,t.widthSegments,t.heightSegments)}}class Oa extends on{constructor(t=1,n=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const u=[],d=new O,h=new O,m=[],g=[],M=[],p=[];for(let f=0;f<=i;f++){const y=[],A=f/i;let E=0;f===0&&a===0?E=.5/n:f===i&&c===Math.PI&&(E=-.5/n);for(let T=0;T<=n;T++){const R=T/n;d.x=-t*Math.cos(s+R*r)*Math.sin(a+A*o),d.y=t*Math.cos(a+A*o),d.z=t*Math.sin(s+R*r)*Math.sin(a+A*o),g.push(d.x,d.y,d.z),h.copy(d).normalize(),M.push(h.x,h.y,h.z),p.push(R+E,1-A),y.push(l++)}u.push(y)}for(let f=0;f<i;f++)for(let y=0;y<n;y++){const A=u[f][y+1],E=u[f][y],T=u[f+1][y],R=u[f+1][y+1];(f!==0||a>0)&&m.push(A,E,R),(f!==i-1||c<Math.PI)&&m.push(E,T,R)}this.setIndex(m),this.setAttribute("position",new dn(g,3)),this.setAttribute("normal",new dn(M,3)),this.setAttribute("uv",new dn(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Oa(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function Lr(e){const t={};for(const n in e){t[n]={};for(const i in e[n]){const s=e[n][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Ut("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=s.clone():Array.isArray(s)?t[n][i]=s.slice():t[n][i]=s}}return t}function hn(e){const t={};for(let n=0;n<e.length;n++){const i=Lr(e[n]);for(const s in i)t[s]=i[s]}return t}function E1(e){const t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function wm(e){const t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}const b1={clone:Lr,merge:hn};var A1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,T1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _i extends qr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=A1,this.fragmentShader=T1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Lr(t.uniforms),this.uniformsGroups=E1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?n.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?n.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[s]={type:"m4",value:a.toArray()}:n.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class w1 extends _i{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class R1 extends qr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=N_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class C1 extends qr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const vo=new O,xo=new Yr,ni=new O;class Rm extends un{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new we,this.projectionMatrix=new we,this.projectionMatrixInverse=new we,this.coordinateSystem=hi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(vo,xo,ni),ni.x===1&&ni.y===1&&ni.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(vo,xo,ni.set(1,1,1)).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorld.decompose(vo,xo,ni),ni.x===1&&ni.y===1&&ni.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(vo,xo,ni.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const ts=new O,ef=new he,nf=new he;class Bn extends Rm{constructor(t=50,n=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=Lh*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Kc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Lh*2*Math.atan(Math.tan(Kc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){ts.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ts.x,ts.y).multiplyScalar(-t/ts.z),ts.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(ts.x,ts.y).multiplyScalar(-t/ts.z)}getViewSize(t,n){return this.getViewBounds(t,ef,nf),n.subVectors(nf,ef)}setViewOffset(t,n,i,s,r,a){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(Kc*.5*this.fov)/this.zoom,i=2*n,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,n-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class Cm extends Rm{constructor(t=-1,n=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=s+n,c=s-n;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const hr=-90,ur=1;class P1 extends un{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Bn(hr,ur,t,n);s.layers=this.layers,this.add(s);const r=new Bn(hr,ur,t,n);r.layers=this.layers,this.add(r);const a=new Bn(hr,ur,t,n);a.layers=this.layers,this.add(a);const o=new Bn(hr,ur,t,n);o.layers=this.layers,this.add(o);const c=new Bn(hr,ur,t,n);c.layers=this.layers,this.add(c);const l=new Bn(hr,ur,t,n);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[i,s,r,a,o,c]=n;for(const l of n)this.remove(l);if(t===hi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Zo)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of n)this.add(l),l.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,r),t.setRenderTarget(i,1,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,a),t.setRenderTarget(i,2,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,o),t.setRenderTarget(i,3,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),t.setRenderTarget(i,4,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,l),i.texture.generateMipmaps=M,t.setRenderTarget(i,5,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,u),t.setRenderTarget(d,h,m),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class L1 extends Bn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function sf(e,t,n,i){const s=I1(i);switch(n){case pm:return e*t;case gm:return e*t/s.components*s.byteLength;case ou:return e*t/s.components*s.byteLength;case Rr:return e*t*2/s.components*s.byteLength;case cu:return e*t*2/s.components*s.byteLength;case mm:return e*t*3/s.components*s.byteLength;case jn:return e*t*4/s.components*s.byteLength;case lu:return e*t*4/s.components*s.byteLength;case Uo:case Fo:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case No:case Oo:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case th:case nh:return Math.max(e,16)*Math.max(t,8)/4;case Ql:case eh:return Math.max(e,8)*Math.max(t,8)/2;case ih:case sh:case ah:case oh:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case rh:case ch:case lh:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case hh:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case uh:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case dh:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case fh:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case ph:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case mh:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case gh:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case _h:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case vh:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case xh:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Mh:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Sh:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case yh:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Eh:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case bh:case Ah:case Th:return Math.ceil(e/4)*Math.ceil(t/4)*16;case wh:case Rh:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Ch:case Ph:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function I1(e){switch(e){case kn:case hm:return{byteLength:1,components:1};case Ta:case um:case Bi:return{byteLength:2,components:1};case ru:case au:return{byteLength:2,components:4};case gi:case su:case li:return{byteLength:4,components:1};case dm:case fm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:iu}}));typeof window<"u"&&(window.__THREE__?Ut("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=iu);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Pm(){let e=null,t=!1,n=null,i=null;function s(r,a){n(r,a),i=e.requestAnimationFrame(s)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(s),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){n=r},setContext:function(r){e=r}}}function D1(e){const t=new WeakMap;function n(o,c){const l=o.array,u=o.usage,d=l.byteLength,h=e.createBuffer();e.bindBuffer(c,h),e.bufferData(c,l,u),o.onUploadCallback();let m;if(l instanceof Float32Array)m=e.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=e.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=e.HALF_FLOAT:m=e.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=e.SHORT;else if(l instanceof Uint32Array)m=e.UNSIGNED_INT;else if(l instanceof Int32Array)m=e.INT;else if(l instanceof Int8Array)m=e.BYTE;else if(l instanceof Uint8Array)m=e.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,c,l){const u=c.array,d=c.updateRanges;if(e.bindBuffer(l,o),d.length===0)e.bufferSubData(l,0,u);else{d.sort((m,g)=>m.start-g.start);let h=0;for(let m=1;m<d.length;m++){const g=d[h],M=d[m];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++h,d[h]=M)}d.length=h+1;for(let m=0,g=d.length;m<g;m++){const M=d[m];e.bufferSubData(l,M.start*u.BYTES_PER_ELEMENT,u,M.start,M.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(e.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,n(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var U1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,F1=`#ifdef USE_ALPHAHASH
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
#endif`,N1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,O1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,B1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,k1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,z1=`#ifdef USE_AOMAP
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
#endif`,V1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,G1=`#ifdef USE_BATCHING
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
#endif`,H1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,W1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,X1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Y1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,q1=`#ifdef USE_IRIDESCENCE
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
#endif`,$1=`#ifdef USE_BUMPMAP
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
#endif`,j1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,K1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Z1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,J1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Q1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,tv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ev=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,nv=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,iv=`#define PI 3.141592653589793
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
} // validated`,sv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,rv=`vec3 transformedNormal = objectNormal;
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
#endif`,av=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,ov=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,cv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,lv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,hv="gl_FragColor = linearToOutputTexel( gl_FragColor );",uv=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,dv=`#ifdef USE_ENVMAP
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
#endif`,fv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,pv=`#ifdef USE_ENVMAP
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
#endif`,mv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,gv=`#ifdef USE_ENVMAP
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
#endif`,_v=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,vv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,xv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Mv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Sv=`#ifdef USE_GRADIENTMAP
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
}`,yv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ev=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,bv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Av=`uniform bool receiveShadow;
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
#endif`,Tv=`#ifdef USE_ENVMAP
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
#endif`,wv=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Rv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Cv=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Pv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Lv=`PhysicalMaterial material;
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
#endif`,Iv=`uniform sampler2D dfgLUT;
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
}`,Dv=`
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
#endif`,Uv=`#if defined( RE_IndirectDiffuse )
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
#endif`,Fv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Nv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ov=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Bv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,zv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Vv=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Gv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Hv=`#if defined( USE_POINTS_UV )
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
#endif`,Wv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Xv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Yv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,qv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,$v=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jv=`#ifdef USE_MORPHTARGETS
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
#endif`,Kv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Zv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Jv=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Qv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,t2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,e2=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,n2=`#ifdef USE_NORMALMAP
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
#endif`,i2=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,s2=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,r2=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,a2=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,o2=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,c2=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,l2=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,h2=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,u2=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,d2=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,f2=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,p2=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,m2=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,g2=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,_2=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,v2=`float getShadowMask() {
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
}`,x2=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,M2=`#ifdef USE_SKINNING
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
#endif`,S2=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,y2=`#ifdef USE_SKINNING
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
#endif`,E2=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,b2=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,A2=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,T2=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,w2=`#ifdef USE_TRANSMISSION
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
#endif`,R2=`#ifdef USE_TRANSMISSION
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
#endif`,C2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,P2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,L2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,I2=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const D2=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,U2=`uniform sampler2D t2D;
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
}`,F2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,N2=`#ifdef ENVMAP_TYPE_CUBE
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
}`,O2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,B2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,k2=`#include <common>
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
}`,z2=`#if DEPTH_PACKING == 3200
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
}`,V2=`#define DISTANCE
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
}`,G2=`#define DISTANCE
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
}`,H2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,W2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,X2=`uniform float scale;
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
}`,Y2=`uniform vec3 diffuse;
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
}`,q2=`#include <common>
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
}`,$2=`uniform vec3 diffuse;
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
}`,j2=`#define LAMBERT
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
}`,K2=`#define LAMBERT
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
}`,Z2=`#define MATCAP
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
}`,J2=`#define MATCAP
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
}`,Q2=`#define NORMAL
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
}`,tx=`#define NORMAL
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
}`,ex=`#define PHONG
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
}`,nx=`#define PHONG
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
}`,ix=`#define STANDARD
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
}`,sx=`#define STANDARD
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
}`,rx=`#define TOON
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
}`,ax=`#define TOON
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
}`,ox=`uniform float size;
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
}`,cx=`uniform vec3 diffuse;
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
}`,lx=`#include <common>
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
}`,hx=`uniform vec3 color;
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
}`,ux=`uniform float rotation;
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
}`,dx=`uniform vec3 diffuse;
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
}`,Ht={alphahash_fragment:U1,alphahash_pars_fragment:F1,alphamap_fragment:N1,alphamap_pars_fragment:O1,alphatest_fragment:B1,alphatest_pars_fragment:k1,aomap_fragment:z1,aomap_pars_fragment:V1,batching_pars_vertex:G1,batching_vertex:H1,begin_vertex:W1,beginnormal_vertex:X1,bsdfs:Y1,iridescence_fragment:q1,bumpmap_pars_fragment:$1,clipping_planes_fragment:j1,clipping_planes_pars_fragment:K1,clipping_planes_pars_vertex:Z1,clipping_planes_vertex:J1,color_fragment:Q1,color_pars_fragment:tv,color_pars_vertex:ev,color_vertex:nv,common:iv,cube_uv_reflection_fragment:sv,defaultnormal_vertex:rv,displacementmap_pars_vertex:av,displacementmap_vertex:ov,emissivemap_fragment:cv,emissivemap_pars_fragment:lv,colorspace_fragment:hv,colorspace_pars_fragment:uv,envmap_fragment:dv,envmap_common_pars_fragment:fv,envmap_pars_fragment:pv,envmap_pars_vertex:mv,envmap_physical_pars_fragment:Tv,envmap_vertex:gv,fog_vertex:_v,fog_pars_vertex:vv,fog_fragment:xv,fog_pars_fragment:Mv,gradientmap_pars_fragment:Sv,lightmap_pars_fragment:yv,lights_lambert_fragment:Ev,lights_lambert_pars_fragment:bv,lights_pars_begin:Av,lights_toon_fragment:wv,lights_toon_pars_fragment:Rv,lights_phong_fragment:Cv,lights_phong_pars_fragment:Pv,lights_physical_fragment:Lv,lights_physical_pars_fragment:Iv,lights_fragment_begin:Dv,lights_fragment_maps:Uv,lights_fragment_end:Fv,logdepthbuf_fragment:Nv,logdepthbuf_pars_fragment:Ov,logdepthbuf_pars_vertex:Bv,logdepthbuf_vertex:kv,map_fragment:zv,map_pars_fragment:Vv,map_particle_fragment:Gv,map_particle_pars_fragment:Hv,metalnessmap_fragment:Wv,metalnessmap_pars_fragment:Xv,morphinstance_vertex:Yv,morphcolor_vertex:qv,morphnormal_vertex:$v,morphtarget_pars_vertex:jv,morphtarget_vertex:Kv,normal_fragment_begin:Zv,normal_fragment_maps:Jv,normal_pars_fragment:Qv,normal_pars_vertex:t2,normal_vertex:e2,normalmap_pars_fragment:n2,clearcoat_normal_fragment_begin:i2,clearcoat_normal_fragment_maps:s2,clearcoat_pars_fragment:r2,iridescence_pars_fragment:a2,opaque_fragment:o2,packing:c2,premultiplied_alpha_fragment:l2,project_vertex:h2,dithering_fragment:u2,dithering_pars_fragment:d2,roughnessmap_fragment:f2,roughnessmap_pars_fragment:p2,shadowmap_pars_fragment:m2,shadowmap_pars_vertex:g2,shadowmap_vertex:_2,shadowmask_pars_fragment:v2,skinbase_vertex:x2,skinning_pars_vertex:M2,skinning_vertex:S2,skinnormal_vertex:y2,specularmap_fragment:E2,specularmap_pars_fragment:b2,tonemapping_fragment:A2,tonemapping_pars_fragment:T2,transmission_fragment:w2,transmission_pars_fragment:R2,uv_pars_fragment:C2,uv_pars_vertex:P2,uv_vertex:L2,worldpos_vertex:I2,background_vert:D2,background_frag:U2,backgroundCube_vert:F2,backgroundCube_frag:N2,cube_vert:O2,cube_frag:B2,depth_vert:k2,depth_frag:z2,distance_vert:V2,distance_frag:G2,equirect_vert:H2,equirect_frag:W2,linedashed_vert:X2,linedashed_frag:Y2,meshbasic_vert:q2,meshbasic_frag:$2,meshlambert_vert:j2,meshlambert_frag:K2,meshmatcap_vert:Z2,meshmatcap_frag:J2,meshnormal_vert:Q2,meshnormal_frag:tx,meshphong_vert:ex,meshphong_frag:nx,meshphysical_vert:ix,meshphysical_frag:sx,meshtoon_vert:rx,meshtoon_frag:ax,points_vert:ox,points_frag:cx,shadow_vert:lx,shadow_frag:hx,sprite_vert:ux,sprite_frag:dx},at={common:{diffuse:{value:new ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new zt}},envmap:{envMap:{value:null},envMapRotation:{value:new zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new zt},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0},uvTransform:{value:new zt}},sprite:{diffuse:{value:new ie(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}}},ci={basic:{uniforms:hn([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Ht.meshbasic_vert,fragmentShader:Ht.meshbasic_frag},lambert:{uniforms:hn([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new ie(0)},envMapIntensity:{value:1}}]),vertexShader:Ht.meshlambert_vert,fragmentShader:Ht.meshlambert_frag},phong:{uniforms:hn([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new ie(0)},specular:{value:new ie(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphong_vert,fragmentShader:Ht.meshphong_frag},standard:{uniforms:hn([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag},toon:{uniforms:hn([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new ie(0)}}]),vertexShader:Ht.meshtoon_vert,fragmentShader:Ht.meshtoon_frag},matcap:{uniforms:hn([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Ht.meshmatcap_vert,fragmentShader:Ht.meshmatcap_frag},points:{uniforms:hn([at.points,at.fog]),vertexShader:Ht.points_vert,fragmentShader:Ht.points_frag},dashed:{uniforms:hn([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ht.linedashed_vert,fragmentShader:Ht.linedashed_frag},depth:{uniforms:hn([at.common,at.displacementmap]),vertexShader:Ht.depth_vert,fragmentShader:Ht.depth_frag},normal:{uniforms:hn([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Ht.meshnormal_vert,fragmentShader:Ht.meshnormal_frag},sprite:{uniforms:hn([at.sprite,at.fog]),vertexShader:Ht.sprite_vert,fragmentShader:Ht.sprite_frag},background:{uniforms:{uvTransform:{value:new zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ht.background_vert,fragmentShader:Ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new zt}},vertexShader:Ht.backgroundCube_vert,fragmentShader:Ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ht.cube_vert,fragmentShader:Ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ht.equirect_vert,fragmentShader:Ht.equirect_frag},distance:{uniforms:hn([at.common,at.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ht.distance_vert,fragmentShader:Ht.distance_frag},shadow:{uniforms:hn([at.lights,at.fog,{color:{value:new ie(0)},opacity:{value:1}}]),vertexShader:Ht.shadow_vert,fragmentShader:Ht.shadow_frag}};ci.physical={uniforms:hn([ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new zt},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new zt},sheen:{value:0},sheenColor:{value:new ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new zt},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new zt},attenuationDistance:{value:0},attenuationColor:{value:new ie(0)},specularColor:{value:new ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new zt},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new zt}}]),vertexShader:Ht.meshphysical_vert,fragmentShader:Ht.meshphysical_frag};const Mo={r:0,b:0,g:0},ys=new zi,fx=new we;function px(e,t,n,i,s,r){const a=new ie(0);let o=s===!0?0:1,c,l,u=null,d=0,h=null;function m(y){let A=y.isScene===!0?y.background:null;if(A&&A.isTexture){const E=y.backgroundBlurriness>0;A=t.get(A,E)}return A}function g(y){let A=!1;const E=m(y);E===null?p(a,o):E&&E.isColor&&(p(E,1),A=!0);const T=e.xr.getEnvironmentBlendMode();T==="additive"?n.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(e.autoClear||A)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function M(y,A){const E=m(A);E&&(E.isCubeTexture||E.mapping===dc)?(l===void 0&&(l=new Tn(new Na(1,1,1),new _i({name:"BackgroundCubeMaterial",uniforms:Lr(ci.backgroundCube.uniforms),vertexShader:ci.backgroundCube.vertexShader,fragmentShader:ci.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(T,R,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),ys.copy(A.backgroundRotation),ys.x*=-1,ys.y*=-1,ys.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(ys.y*=-1,ys.z*=-1),l.material.uniforms.envMap.value=E,l.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=A.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(fx.makeRotationFromEuler(ys)),l.material.toneMapped=Kt.getTransfer(E.colorSpace)!==ae,(u!==E||d!==E.version||h!==e.toneMapping)&&(l.material.needsUpdate=!0,u=E,d=E.version,h=e.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new Tn(new pc(2,2),new _i({name:"BackgroundMaterial",uniforms:Lr(ci.background.uniforms),vertexShader:ci.background.vertexShader,fragmentShader:ci.background.fragmentShader,side:us,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=A.backgroundIntensity,c.material.toneMapped=Kt.getTransfer(E.colorSpace)!==ae,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||d!==E.version||h!==e.toneMapping)&&(c.material.needsUpdate=!0,u=E,d=E.version,h=e.toneMapping),c.layers.enableAll(),y.unshift(c,c.geometry,c.material,0,0,null))}function p(y,A){y.getRGB(Mo,wm(e)),n.buffers.color.setClear(Mo.r,Mo.g,Mo.b,A,r)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(y,A=1){a.set(y),o=A,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(y){o=y,p(a,o)},render:g,addToRenderList:M,dispose:f}}function mx(e,t){const n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,a=!1;function o(w,U,F,V,z){let H=!1;const N=d(w,V,F,U);r!==N&&(r=N,l(r.object)),H=m(w,V,F,z),H&&g(w,V,F,z),z!==null&&t.update(z,e.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,E(w,U,F,V),z!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function c(){return e.createVertexArray()}function l(w){return e.bindVertexArray(w)}function u(w){return e.deleteVertexArray(w)}function d(w,U,F,V){const z=V.wireframe===!0;let H=i[U.id];H===void 0&&(H={},i[U.id]=H);const N=w.isInstancedMesh===!0?w.id:0;let Q=H[N];Q===void 0&&(Q={},H[N]=Q);let K=Q[F.id];K===void 0&&(K={},Q[F.id]=K);let lt=K[z];return lt===void 0&&(lt=h(c()),K[z]=lt),lt}function h(w){const U=[],F=[],V=[];for(let z=0;z<n;z++)U[z]=0,F[z]=0,V[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:F,attributeDivisors:V,object:w,attributes:{},index:null}}function m(w,U,F,V){const z=r.attributes,H=U.attributes;let N=0;const Q=F.getAttributes();for(const K in Q)if(Q[K].location>=0){const gt=z[K];let dt=H[K];if(dt===void 0&&(K==="instanceMatrix"&&w.instanceMatrix&&(dt=w.instanceMatrix),K==="instanceColor"&&w.instanceColor&&(dt=w.instanceColor)),gt===void 0||gt.attribute!==dt||dt&&gt.data!==dt.data)return!0;N++}return r.attributesNum!==N||r.index!==V}function g(w,U,F,V){const z={},H=U.attributes;let N=0;const Q=F.getAttributes();for(const K in Q)if(Q[K].location>=0){let gt=H[K];gt===void 0&&(K==="instanceMatrix"&&w.instanceMatrix&&(gt=w.instanceMatrix),K==="instanceColor"&&w.instanceColor&&(gt=w.instanceColor));const dt={};dt.attribute=gt,gt&&gt.data&&(dt.data=gt.data),z[K]=dt,N++}r.attributes=z,r.attributesNum=N,r.index=V}function M(){const w=r.newAttributes;for(let U=0,F=w.length;U<F;U++)w[U]=0}function p(w){f(w,0)}function f(w,U){const F=r.newAttributes,V=r.enabledAttributes,z=r.attributeDivisors;F[w]=1,V[w]===0&&(e.enableVertexAttribArray(w),V[w]=1),z[w]!==U&&(e.vertexAttribDivisor(w,U),z[w]=U)}function y(){const w=r.newAttributes,U=r.enabledAttributes;for(let F=0,V=U.length;F<V;F++)U[F]!==w[F]&&(e.disableVertexAttribArray(F),U[F]=0)}function A(w,U,F,V,z,H,N){N===!0?e.vertexAttribIPointer(w,U,F,z,H):e.vertexAttribPointer(w,U,F,V,z,H)}function E(w,U,F,V){M();const z=V.attributes,H=F.getAttributes(),N=U.defaultAttributeValues;for(const Q in H){const K=H[Q];if(K.location>=0){let lt=z[Q];if(lt===void 0&&(Q==="instanceMatrix"&&w.instanceMatrix&&(lt=w.instanceMatrix),Q==="instanceColor"&&w.instanceColor&&(lt=w.instanceColor)),lt!==void 0){const gt=lt.normalized,dt=lt.itemSize,Gt=t.get(lt);if(Gt===void 0)continue;const _e=Gt.buffer,ge=Gt.type,$=Gt.bytesPerElement,nt=ge===e.INT||ge===e.UNSIGNED_INT||lt.gpuType===su;if(lt.isInterleavedBufferAttribute){const rt=lt.data,Bt=rt.stride,It=lt.offset;if(rt.isInstancedInterleavedBuffer){for(let Ft=0;Ft<K.locationSize;Ft++)f(K.location+Ft,rt.meshPerAttribute);w.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Ft=0;Ft<K.locationSize;Ft++)p(K.location+Ft);e.bindBuffer(e.ARRAY_BUFFER,_e);for(let Ft=0;Ft<K.locationSize;Ft++)A(K.location+Ft,dt/K.locationSize,ge,gt,Bt*$,(It+dt/K.locationSize*Ft)*$,nt)}else{if(lt.isInstancedBufferAttribute){for(let rt=0;rt<K.locationSize;rt++)f(K.location+rt,lt.meshPerAttribute);w.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let rt=0;rt<K.locationSize;rt++)p(K.location+rt);e.bindBuffer(e.ARRAY_BUFFER,_e);for(let rt=0;rt<K.locationSize;rt++)A(K.location+rt,dt/K.locationSize,ge,gt,dt*$,dt/K.locationSize*rt*$,nt)}}else if(N!==void 0){const gt=N[Q];if(gt!==void 0)switch(gt.length){case 2:e.vertexAttrib2fv(K.location,gt);break;case 3:e.vertexAttrib3fv(K.location,gt);break;case 4:e.vertexAttrib4fv(K.location,gt);break;default:e.vertexAttrib1fv(K.location,gt)}}}}y()}function T(){v();for(const w in i){const U=i[w];for(const F in U){const V=U[F];for(const z in V){const H=V[z];for(const N in H)u(H[N].object),delete H[N];delete V[z]}}delete i[w]}}function R(w){if(i[w.id]===void 0)return;const U=i[w.id];for(const F in U){const V=U[F];for(const z in V){const H=V[z];for(const N in H)u(H[N].object),delete H[N];delete V[z]}}delete i[w.id]}function P(w){for(const U in i){const F=i[U];for(const V in F){const z=F[V];if(z[w.id]===void 0)continue;const H=z[w.id];for(const N in H)u(H[N].object),delete H[N];delete z[w.id]}}}function x(w){for(const U in i){const F=i[U],V=w.isInstancedMesh===!0?w.id:0,z=F[V];if(z!==void 0){for(const H in z){const N=z[H];for(const Q in N)u(N[Q].object),delete N[Q];delete z[H]}delete F[V],Object.keys(F).length===0&&delete i[U]}}}function v(){W(),a=!0,r!==s&&(r=s,l(r.object))}function W(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:v,resetDefaultState:W,dispose:T,releaseStatesOfGeometry:R,releaseStatesOfObject:x,releaseStatesOfProgram:P,initAttributes:M,enableAttribute:p,disableUnusedAttributes:y}}function gx(e,t,n){let i;function s(l){i=l}function r(l,u){e.drawArrays(i,l,u),n.update(u,i,1)}function a(l,u,d){d!==0&&(e.drawArraysInstanced(i,l,u,d),n.update(u,i,d))}function o(l,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,d);let m=0;for(let g=0;g<d;g++)m+=u[g];n.update(m,i,1)}function c(l,u,d,h){if(d===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<l.length;g++)a(l[g],u[g],h[g]);else{m.multiDrawArraysInstancedWEBGL(i,l,0,u,0,h,0,d);let g=0;for(let M=0;M<d;M++)g+=u[M]*h[M];n.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function _x(e,t,n,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");s=e.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==jn&&i.convert(P)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const x=P===Bi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==kn&&i.convert(P)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==li&&!x)}function c(P){if(P==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=n.precision!==void 0?n.precision:"highp";const u=c(l);u!==l&&(Ut("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=n.logarithmicDepthBuffer===!0,h=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),m=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=e.getParameter(e.MAX_TEXTURE_SIZE),p=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),f=e.getParameter(e.MAX_VERTEX_ATTRIBS),y=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),A=e.getParameter(e.MAX_VARYING_VECTORS),E=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),T=e.getParameter(e.MAX_SAMPLES),R=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:m,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:y,maxVaryings:A,maxFragmentUniforms:E,maxSamples:T,samples:R}}function vx(e){const t=this;let n=null,i=0,s=!1,r=!1;const a=new Ts,o=new zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const m=d.length!==0||h||i!==0||s;return s=h,i=d.length,m},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){n=u(d,h,0)},this.setState=function(d,h,m){const g=d.clippingPlanes,M=d.clipIntersection,p=d.clipShadows,f=e.get(d);if(!s||g===null||g.length===0||r&&!p)r?u(null):l();else{const y=r?0:i,A=y*4;let E=f.clippingState||null;c.value=E,E=u(g,h,A,m);for(let T=0;T!==A;++T)E[T]=n[T];f.clippingState=E,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(d,h,m,g){const M=d!==null?d.length:0;let p=null;if(M!==0){if(p=c.value,g!==!0||p===null){const f=m+M*4,y=h.matrixWorldInverse;o.getNormalMatrix(y),(p===null||p.length<f)&&(p=new Float32Array(f));for(let A=0,E=m;A!==M;++A,E+=4)a.copy(d[A]).applyMatrix4(y,o),a.normal.toArray(p,E),p[E+3]=a.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,p}}const cs=4,rf=[.125,.215,.35,.446,.526,.582],Ls=20,xx=256,pa=new Cm,af=new ie;let Sl=null,yl=0,El=0,bl=!1;const Mx=new O;class of{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,i=.1,s=100,r={}){const{size:a=256,position:o=Mx}=r;Sl=this._renderer.getRenderTarget(),yl=this._renderer.getActiveCubeFace(),El=this._renderer.getActiveMipmapLevel(),bl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,o),n>0&&this._blur(c,0,0,n),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=hf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=lf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Sl,yl,El),this._renderer.xr.enabled=bl,t.scissorTest=!1,dr(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Ws||t.mapping===wr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Sl=this._renderer.getRenderTarget(),yl=this._renderer.getActiveCubeFace(),El=this._renderer.getActiveMipmapLevel(),bl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:je,minFilter:je,generateMipmaps:!1,type:Bi,format:jn,colorSpace:Cr,depthBuffer:!1},s=cf(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=cf(t,n,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Sx(r)),this._blurMaterial=Ex(r,t,n),this._ggxMaterial=yx(r,t,n)}return s}_compileMaterial(t){const n=new Tn(new on,t);this._renderer.compile(n,pa)}_sceneToCubeUV(t,n,i,s,r){const c=new Bn(90,1,n,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,m=d.toneMapping;d.getClearColor(af),d.toneMapping=di,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Tn(new Na,new Pr({name:"PMREM.Background",side:gn,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,p=M.material;let f=!1;const y=t.background;y?y.isColor&&(p.color.copy(y),t.background=null,f=!0):(p.color.copy(af),f=!0);for(let A=0;A<6;A++){const E=A%3;E===0?(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[A],r.y,r.z)):E===1?(c.up.set(0,0,l[A]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[A],r.z)):(c.up.set(0,l[A],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[A]));const T=this._cubeSize;dr(s,E*T,A>2?T:0,T,T),d.setRenderTarget(s),f&&d.render(M,c),d.render(t,c)}d.toneMapping=m,d.autoClear=h,t.background=y}_textureToCubeUV(t,n){const i=this._renderer,s=t.mapping===Ws||t.mapping===wr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=hf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=lf());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;dr(n,0,0,3*c,2*c),i.setRenderTarget(n),i.render(a,pa)}_applyPMREM(t){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);n.autoClear=i}_applyGGXFilter(t,n,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),u=n/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),h=0+l*1.25,m=d*h,{_lodMax:g}=this,M=this._sizeLods[i],p=3*M*(i>g-cs?i-g+cs:0),f=4*(this._cubeSize-M);c.envMap.value=t.texture,c.roughness.value=m,c.mipInt.value=g-n,dr(r,p,f,3*M,2*M),s.setRenderTarget(r),s.render(o,pa),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-i,dr(t,p,f,3*M,2*M),s.setRenderTarget(t),s.render(o,pa)}_blur(t,n,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,n,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,n,i,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Qt("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[s];d.material=l;const h=l.uniforms,m=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Ls-1),M=r/g,p=isFinite(r)?1+Math.floor(u*M):Ls;p>Ls&&Ut(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Ls}`);const f=[];let y=0;for(let P=0;P<Ls;++P){const x=P/M,v=Math.exp(-x*x/2);f.push(v),P===0?y+=v:P<p&&(y+=2*v)}for(let P=0;P<f.length;P++)f[P]=f[P]/y;h.envMap.value=t.texture,h.samples.value=p,h.weights.value=f,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:A}=this;h.dTheta.value=g,h.mipInt.value=A-i;const E=this._sizeLods[s],T=3*E*(s>A-cs?s-A+cs:0),R=4*(this._cubeSize-E);dr(n,T,R,3*E,2*E),c.setRenderTarget(n),c.render(d,pa)}}function Sx(e){const t=[],n=[],i=[];let s=e;const r=e-cs+1+rf.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>e-cs?c=rf[a-e+cs-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,d=1+l,h=[u,u,d,u,d,d,u,u,d,d,u,d],m=6,g=6,M=3,p=2,f=1,y=new Float32Array(M*g*m),A=new Float32Array(p*g*m),E=new Float32Array(f*g*m);for(let R=0;R<m;R++){const P=R%3*2/3-1,x=R>2?0:-1,v=[P,x,0,P+2/3,x,0,P+2/3,x+1,0,P,x,0,P+2/3,x+1,0,P,x+1,0];y.set(v,M*g*R),A.set(h,p*g*R);const W=[R,R,R,R,R,R];E.set(W,f*g*R)}const T=new on;T.setAttribute("position",new an(y,M)),T.setAttribute("uv",new an(A,p)),T.setAttribute("faceIndex",new an(E,f)),i.push(new Tn(T,null)),s>cs&&s--}return{lodMeshes:i,sizeLods:t,sigmas:n}}function cf(e,t,n){const i=new fi(e,t,n);return i.texture.mapping=dc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function dr(e,t,n,i,s){e.viewport.set(t,n,i,s),e.scissor.set(t,n,i,s)}function yx(e,t,n){return new _i({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:xx,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:mc(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function Ex(e,t,n){const i=new Float32Array(Ls),s=new O(0,1,0);return new _i({name:"SphericalGaussianBlur",defines:{n:Ls,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:mc(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function lf(){return new _i({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:mc(),fragmentShader:`

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
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function hf(){return new _i({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:mc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function mc(){return`

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
	`}class Lm extends fi{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Am(s),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Na(5,5,5),r=new _i({name:"CubemapFromEquirect",uniforms:Lr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:gn,blending:Fi});r.uniforms.tEquirect.value=n;const a=new Tn(s,r),o=n.minFilter;return n.minFilter===Ds&&(n.minFilter=je),new P1(1,10,this).update(t,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,n=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(n,i,s);t.setRenderTarget(r)}}function bx(e){let t=new WeakMap,n=new WeakMap,i=null;function s(h,m=!1){return h==null?null:m?a(h):r(h)}function r(h){if(h&&h.isTexture){const m=h.mapping;if(m===qc||m===$c)if(t.has(h)){const g=t.get(h).texture;return o(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const M=new Lm(g.height);return M.fromEquirectangularTexture(e,h),t.set(h,M),h.addEventListener("dispose",l),o(M.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const m=h.mapping,g=m===qc||m===$c,M=m===Ws||m===wr;if(g||M){let p=n.get(h);const f=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return i===null&&(i=new of(e)),p=g?i.fromEquirectangular(h,p):i.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,n.set(h,p),p.texture;if(p!==void 0)return p.texture;{const y=h.image;return g&&y&&y.height>0||M&&y&&c(y)?(i===null&&(i=new of(e)),p=g?i.fromEquirectangular(h):i.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,n.set(h,p),h.addEventListener("dispose",u),p.texture):null}}}return h}function o(h,m){return m===qc?h.mapping=Ws:m===$c&&(h.mapping=wr),h}function c(h){let m=0;const g=6;for(let M=0;M<g;M++)h[M]!==void 0&&m++;return m===g}function l(h){const m=h.target;m.removeEventListener("dispose",l);const g=t.get(m);g!==void 0&&(t.delete(m),g.dispose())}function u(h){const m=h.target;m.removeEventListener("dispose",u);const g=n.get(m);g!==void 0&&(n.delete(m),g.dispose())}function d(){t=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function Ax(e){const t={};function n(i){if(t[i]!==void 0)return t[i];const s=e.getExtension(i);return t[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const s=n(i);return s===null&&Qo("WebGLRenderer: "+i+" extension not supported."),s}}}function Tx(e,t,n,i){const s={},r=new WeakMap;function a(d){const h=d.target;h.index!==null&&t.remove(h.index);for(const g in h.attributes)t.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];const m=r.get(h);m&&(t.remove(m),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,n.memory.geometries++),h}function c(d){const h=d.attributes;for(const m in h)t.update(h[m],e.ARRAY_BUFFER)}function l(d){const h=[],m=d.index,g=d.attributes.position;let M=0;if(g===void 0)return;if(m!==null){const y=m.array;M=m.version;for(let A=0,E=y.length;A<E;A+=3){const T=y[A+0],R=y[A+1],P=y[A+2];h.push(T,R,R,P,P,T)}}else{const y=g.array;M=g.version;for(let A=0,E=y.length/3-1;A<E;A+=3){const T=A+0,R=A+1,P=A+2;h.push(T,R,R,P,P,T)}}const p=new(g.count>=65535?ym:Sm)(h,1);p.version=M;const f=r.get(d);f&&t.remove(f),r.set(d,p)}function u(d){const h=r.get(d);if(h){const m=d.index;m!==null&&h.version<m.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function wx(e,t,n){let i;function s(h){i=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function c(h,m){e.drawElements(i,m,r,h*a),n.update(m,i,1)}function l(h,m,g){g!==0&&(e.drawElementsInstanced(i,m,r,h*a,g),n.update(m,i,g))}function u(h,m,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,r,h,0,g);let p=0;for(let f=0;f<g;f++)p+=m[f];n.update(p,i,1)}function d(h,m,g,M){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<h.length;f++)l(h[f]/a,m[f],M[f]);else{p.multiDrawElementsInstancedWEBGL(i,m,0,r,h,0,M,0,g);let f=0;for(let y=0;y<g;y++)f+=m[y]*M[y];n.update(f,i,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Rx(e){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(n.calls++,a){case e.TRIANGLES:n.triangles+=o*(r/3);break;case e.LINES:n.lines+=o*(r/2);break;case e.LINE_STRIP:n.lines+=o*(r-1);break;case e.LINE_LOOP:n.lines+=o*r;break;case e.POINTS:n.points+=o*r;break;default:Qt("WebGLInfo: Unknown draw mode:",a);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:s,update:i}}function Cx(e,t,n){const i=new WeakMap,s=new Ie;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==d){let W=function(){x.dispose(),i.delete(o),o.removeEventListener("dispose",W)};var m=W;h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,M=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],y=o.morphAttributes.normal||[],A=o.morphAttributes.color||[];let E=0;g===!0&&(E=1),M===!0&&(E=2),p===!0&&(E=3);let T=o.attributes.position.count*E,R=1;T>t.maxTextureSize&&(R=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const P=new Float32Array(T*R*4*d),x=new vm(P,T,R,d);x.type=li,x.needsUpdate=!0;const v=E*4;for(let w=0;w<d;w++){const U=f[w],F=y[w],V=A[w],z=T*R*4*w;for(let H=0;H<U.count;H++){const N=H*v;g===!0&&(s.fromBufferAttribute(U,H),P[z+N+0]=s.x,P[z+N+1]=s.y,P[z+N+2]=s.z,P[z+N+3]=0),M===!0&&(s.fromBufferAttribute(F,H),P[z+N+4]=s.x,P[z+N+5]=s.y,P[z+N+6]=s.z,P[z+N+7]=0),p===!0&&(s.fromBufferAttribute(V,H),P[z+N+8]=s.x,P[z+N+9]=s.y,P[z+N+10]=s.z,P[z+N+11]=V.itemSize===4?s.w:1)}}h={count:d,texture:x,size:new he(T,R)},i.set(o,h),o.addEventListener("dispose",W)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(e,"morphTexture",a.morphTexture,n);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const M=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(e,"morphTargetBaseInfluence",M),c.getUniforms().setValue(e,"morphTargetInfluences",l)}c.getUniforms().setValue(e,"morphTargetsTexture",h.texture,n),c.getUniforms().setValue(e,"morphTargetsTextureSize",h.size)}return{update:r}}function Px(e,t,n,i,s){let r=new WeakMap;function a(l){const u=s.render.frame,d=l.geometry,h=t.get(l,d);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(n.update(l.instanceMatrix,e.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,e.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const m=l.skeleton;r.get(m)!==u&&(m.update(),r.set(m,u))}return h}function o(){r=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),n.remove(u.instanceMatrix),u.instanceColor!==null&&n.remove(u.instanceColor)}return{update:a,dispose:o}}const Lx={[nm]:"LINEAR_TONE_MAPPING",[im]:"REINHARD_TONE_MAPPING",[sm]:"CINEON_TONE_MAPPING",[rm]:"ACES_FILMIC_TONE_MAPPING",[om]:"AGX_TONE_MAPPING",[cm]:"NEUTRAL_TONE_MAPPING",[am]:"CUSTOM_TONE_MAPPING"};function Ix(e,t,n,i,s){const r=new fi(t,n,{type:e,depthBuffer:i,stencilBuffer:s}),a=new fi(t,n,{type:Bi,depthBuffer:!1,stencilBuffer:!1}),o=new on;o.setAttribute("position",new dn([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new dn([0,2,0,0,2,0],2));const c=new w1({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new Tn(o,c),u=new Cm(-1,1,1,-1,0,1);let d=null,h=null,m=!1,g,M=null,p=[],f=!1;this.setSize=function(y,A){r.setSize(y,A),a.setSize(y,A);for(let E=0;E<p.length;E++){const T=p[E];T.setSize&&T.setSize(y,A)}},this.setEffects=function(y){p=y,f=p.length>0&&p[0].isRenderPass===!0;const A=r.width,E=r.height;for(let T=0;T<p.length;T++){const R=p[T];R.setSize&&R.setSize(A,E)}},this.begin=function(y,A){if(m||y.toneMapping===di&&p.length===0)return!1;if(M=A,A!==null){const E=A.width,T=A.height;(r.width!==E||r.height!==T)&&this.setSize(E,T)}return f===!1&&y.setRenderTarget(r),g=y.toneMapping,y.toneMapping=di,!0},this.hasRenderPass=function(){return f},this.end=function(y,A){y.toneMapping=g,m=!0;let E=r,T=a;for(let R=0;R<p.length;R++){const P=p[R];if(P.enabled!==!1&&(P.render(y,T,E,A),P.needsSwap!==!1)){const x=E;E=T,T=x}}if(d!==y.outputColorSpace||h!==y.toneMapping){d=y.outputColorSpace,h=y.toneMapping,c.defines={},Kt.getTransfer(d)===ae&&(c.defines.SRGB_TRANSFER="");const R=Lx[h];R&&(c.defines[R]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=E.texture,y.setRenderTarget(M),y.render(l,u),M=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){r.dispose(),a.dispose(),o.dispose(),c.dispose()}}const Im=new rn,Dh=new Ra(1,1),Dm=new vm,Um=new e1,Fm=new Am,uf=[],df=[],ff=new Float32Array(16),pf=new Float32Array(9),mf=new Float32Array(4);function $r(e,t,n){const i=e[0];if(i<=0||i>0)return e;const s=t*n;let r=uf[s];if(r===void 0&&(r=new Float32Array(s),uf[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=n,e[a].toArray(r,o)}return r}function Ve(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Ge(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function gc(e,t){let n=df[t];n===void 0&&(n=new Int32Array(t),df[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function Dx(e,t){const n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Ux(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ve(n,t))return;e.uniform2fv(this.addr,t),Ge(n,t)}}function Fx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Ve(n,t))return;e.uniform3fv(this.addr,t),Ge(n,t)}}function Nx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ve(n,t))return;e.uniform4fv(this.addr,t),Ge(n,t)}}function Ox(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Ve(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Ge(n,t)}else{if(Ve(n,i))return;mf.set(i),e.uniformMatrix2fv(this.addr,!1,mf),Ge(n,i)}}function Bx(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Ve(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Ge(n,t)}else{if(Ve(n,i))return;pf.set(i),e.uniformMatrix3fv(this.addr,!1,pf),Ge(n,i)}}function kx(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Ve(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Ge(n,t)}else{if(Ve(n,i))return;ff.set(i),e.uniformMatrix4fv(this.addr,!1,ff),Ge(n,i)}}function zx(e,t){const n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Vx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ve(n,t))return;e.uniform2iv(this.addr,t),Ge(n,t)}}function Gx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ve(n,t))return;e.uniform3iv(this.addr,t),Ge(n,t)}}function Hx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ve(n,t))return;e.uniform4iv(this.addr,t),Ge(n,t)}}function Wx(e,t){const n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Xx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ve(n,t))return;e.uniform2uiv(this.addr,t),Ge(n,t)}}function Yx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ve(n,t))return;e.uniform3uiv(this.addr,t),Ge(n,t)}}function qx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ve(n,t))return;e.uniform4uiv(this.addr,t),Ge(n,t)}}function $x(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s);let r;this.type===e.SAMPLER_2D_SHADOW?(Dh.compareFunction=n.isReversedDepthBuffer()?uu:hu,r=Dh):r=Im,n.setTexture2D(t||r,s)}function jx(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture3D(t||Um,s)}function Kx(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTextureCube(t||Fm,s)}function Zx(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture2DArray(t||Dm,s)}function Jx(e){switch(e){case 5126:return Dx;case 35664:return Ux;case 35665:return Fx;case 35666:return Nx;case 35674:return Ox;case 35675:return Bx;case 35676:return kx;case 5124:case 35670:return zx;case 35667:case 35671:return Vx;case 35668:case 35672:return Gx;case 35669:case 35673:return Hx;case 5125:return Wx;case 36294:return Xx;case 36295:return Yx;case 36296:return qx;case 35678:case 36198:case 36298:case 36306:case 35682:return $x;case 35679:case 36299:case 36307:return jx;case 35680:case 36300:case 36308:case 36293:return Kx;case 36289:case 36303:case 36311:case 36292:return Zx}}function Qx(e,t){e.uniform1fv(this.addr,t)}function t3(e,t){const n=$r(t,this.size,2);e.uniform2fv(this.addr,n)}function e3(e,t){const n=$r(t,this.size,3);e.uniform3fv(this.addr,n)}function n3(e,t){const n=$r(t,this.size,4);e.uniform4fv(this.addr,n)}function i3(e,t){const n=$r(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function s3(e,t){const n=$r(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function r3(e,t){const n=$r(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function a3(e,t){e.uniform1iv(this.addr,t)}function o3(e,t){e.uniform2iv(this.addr,t)}function c3(e,t){e.uniform3iv(this.addr,t)}function l3(e,t){e.uniform4iv(this.addr,t)}function h3(e,t){e.uniform1uiv(this.addr,t)}function u3(e,t){e.uniform2uiv(this.addr,t)}function d3(e,t){e.uniform3uiv(this.addr,t)}function f3(e,t){e.uniform4uiv(this.addr,t)}function p3(e,t,n){const i=this.cache,s=t.length,r=gc(n,s);Ve(i,r)||(e.uniform1iv(this.addr,r),Ge(i,r));let a;this.type===e.SAMPLER_2D_SHADOW?a=Dh:a=Im;for(let o=0;o!==s;++o)n.setTexture2D(t[o]||a,r[o])}function m3(e,t,n){const i=this.cache,s=t.length,r=gc(n,s);Ve(i,r)||(e.uniform1iv(this.addr,r),Ge(i,r));for(let a=0;a!==s;++a)n.setTexture3D(t[a]||Um,r[a])}function g3(e,t,n){const i=this.cache,s=t.length,r=gc(n,s);Ve(i,r)||(e.uniform1iv(this.addr,r),Ge(i,r));for(let a=0;a!==s;++a)n.setTextureCube(t[a]||Fm,r[a])}function _3(e,t,n){const i=this.cache,s=t.length,r=gc(n,s);Ve(i,r)||(e.uniform1iv(this.addr,r),Ge(i,r));for(let a=0;a!==s;++a)n.setTexture2DArray(t[a]||Dm,r[a])}function v3(e){switch(e){case 5126:return Qx;case 35664:return t3;case 35665:return e3;case 35666:return n3;case 35674:return i3;case 35675:return s3;case 35676:return r3;case 5124:case 35670:return a3;case 35667:case 35671:return o3;case 35668:case 35672:return c3;case 35669:case 35673:return l3;case 5125:return h3;case 36294:return u3;case 36295:return d3;case 36296:return f3;case 35678:case 36198:case 36298:case 36306:case 35682:return p3;case 35679:case 36299:case 36307:return m3;case 35680:case 36300:case 36308:case 36293:return g3;case 36289:case 36303:case 36311:case 36292:return _3}}class x3{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=Jx(n.type)}}class M3{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=v3(n.type)}}class S3{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,n[o.id],i)}}}const Al=/(\w+)(\])?(\[|\.)?/g;function gf(e,t){e.seq.push(t),e.map[t.id]=t}function y3(e,t,n){const i=e.name,s=i.length;for(Al.lastIndex=0;;){const r=Al.exec(i),a=Al.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){gf(n,l===void 0?new x3(o,e,t):new M3(o,e,t));break}else{let d=n.map[o];d===void 0&&(d=new S3(o),gf(n,d)),n=d}}}class Bo{constructor(t,n){this.seq=[],this.map={};const i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=t.getActiveUniform(n,a),c=t.getUniformLocation(n,o.name);y3(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,n,i,s){const r=this.map[n];r!==void 0&&r.setValue(t,i,s)}setOptional(t,n,i){const s=n[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,n,i,s){for(let r=0,a=n.length;r!==a;++r){const o=n[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,n){const i=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in n&&i.push(a)}return i}}function _f(e,t,n){const i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}const E3=37297;let b3=0;function A3(e,t){const n=e.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,n.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}const vf=new zt;function T3(e){Kt._getMatrix(vf,Kt.workingColorSpace,e);const t=`mat3( ${vf.elements.map(n=>n.toFixed(4))} )`;switch(Kt.getTransfer(e)){case Ko:return[t,"LinearTransferOETF"];case ae:return[t,"sRGBTransferOETF"];default:return Ut("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function xf(e,t,n){const i=e.getShaderParameter(t,e.COMPILE_STATUS),r=(e.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return n.toUpperCase()+`

`+r+`

`+A3(e.getShaderSource(t),o)}else return r}function w3(e,t){const n=T3(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const R3={[nm]:"Linear",[im]:"Reinhard",[sm]:"Cineon",[rm]:"ACESFilmic",[om]:"AgX",[cm]:"Neutral",[am]:"Custom"};function C3(e,t){const n=R3[t];return n===void 0?(Ut("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const So=new O;function P3(){Kt.getLuminanceCoefficients(So);const e=So.x.toFixed(4),t=So.y.toFixed(4),n=So.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function L3(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xa).join(`
`)}function I3(e){const t=[];for(const n in e){const i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function D3(e,t){const n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=e.getActiveAttrib(t,s),a=r.name;let o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function xa(e){return e!==""}function Mf(e,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Sf(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const U3=/^[ \t]*#include +<([\w\d./]+)>/gm;function Uh(e){return e.replace(U3,N3)}const F3=new Map;function N3(e,t){let n=Ht[t];if(n===void 0){const i=F3.get(t);if(i!==void 0)n=Ht[i],Ut('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Uh(n)}const O3=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yf(e){return e.replace(O3,B3)}function B3(e,t,n,i){let s="";for(let r=parseInt(t);r<parseInt(n);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ef(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}const k3={[Do]:"SHADOWMAP_TYPE_PCF",[va]:"SHADOWMAP_TYPE_VSM"};function z3(e){return k3[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const V3={[Ws]:"ENVMAP_TYPE_CUBE",[wr]:"ENVMAP_TYPE_CUBE",[dc]:"ENVMAP_TYPE_CUBE_UV"};function G3(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":V3[e.envMapMode]||"ENVMAP_TYPE_CUBE"}const H3={[wr]:"ENVMAP_MODE_REFRACTION"};function W3(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":H3[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}const X3={[em]:"ENVMAP_BLENDING_MULTIPLY",[D_]:"ENVMAP_BLENDING_MIX",[U_]:"ENVMAP_BLENDING_ADD"};function Y3(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":X3[e.combine]||"ENVMAP_BLENDING_NONE"}function q3(e){const t=e.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function $3(e,t,n,i){const s=e.getContext(),r=n.defines;let a=n.vertexShader,o=n.fragmentShader;const c=z3(n),l=G3(n),u=W3(n),d=Y3(n),h=q3(n),m=L3(n),g=I3(r),M=s.createProgram();let p,f,y=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(xa).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(xa).join(`
`),f.length>0&&(f+=`
`)):(p=[Ef(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xa).join(`
`),f=[Ef(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+l:"",n.envMap?"#define "+u:"",n.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==di?"#define TONE_MAPPING":"",n.toneMapping!==di?Ht.tonemapping_pars_fragment:"",n.toneMapping!==di?C3("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Ht.colorspace_pars_fragment,w3("linearToOutputTexel",n.outputColorSpace),P3(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(xa).join(`
`)),a=Uh(a),a=Mf(a,n),a=Sf(a,n),o=Uh(o),o=Mf(o,n),o=Sf(o,n),a=yf(a),o=yf(o),n.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",n.glslVersion===Id?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Id?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const A=y+p+a,E=y+f+o,T=_f(s,s.VERTEX_SHADER,A),R=_f(s,s.FRAGMENT_SHADER,E);s.attachShader(M,T),s.attachShader(M,R),n.index0AttributeName!==void 0?s.bindAttribLocation(M,0,n.index0AttributeName):n.morphTargets===!0&&s.bindAttribLocation(M,0,"position"),s.linkProgram(M);function P(w){if(e.debug.checkShaderErrors){const U=s.getProgramInfoLog(M)||"",F=s.getShaderInfoLog(T)||"",V=s.getShaderInfoLog(R)||"",z=U.trim(),H=F.trim(),N=V.trim();let Q=!0,K=!0;if(s.getProgramParameter(M,s.LINK_STATUS)===!1)if(Q=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(s,M,T,R);else{const lt=xf(s,T,"vertex"),gt=xf(s,R,"fragment");Qt("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(M,s.VALIDATE_STATUS)+`

Material Name: `+w.name+`
Material Type: `+w.type+`

Program Info Log: `+z+`
`+lt+`
`+gt)}else z!==""?Ut("WebGLProgram: Program Info Log:",z):(H===""||N==="")&&(K=!1);K&&(w.diagnostics={runnable:Q,programLog:z,vertexShader:{log:H,prefix:p},fragmentShader:{log:N,prefix:f}})}s.deleteShader(T),s.deleteShader(R),x=new Bo(s,M),v=D3(s,M)}let x;this.getUniforms=function(){return x===void 0&&P(this),x};let v;this.getAttributes=function(){return v===void 0&&P(this),v};let W=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return W===!1&&(W=s.getProgramParameter(M,E3)),W},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(M),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=b3++,this.cacheKey=t,this.usedTimes=1,this.program=M,this.vertexShader=T,this.fragmentShader=R,this}let j3=0;class K3{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(n),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){const n=this.shaderCache;let i=n.get(t);return i===void 0&&(i=new Z3(t),n.set(t,i)),i}}class Z3{constructor(t){this.id=j3++,this.code=t,this.usedTimes=0}}function J3(e,t,n,i,s,r){const a=new xm,o=new K3,c=new Set,l=[],u=new Map,d=i.logarithmicDepthBuffer;let h=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return c.add(x),x===0?"uv":`uv${x}`}function M(x,v,W,w,U){const F=w.fog,V=U.geometry,z=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?w.environment:null,H=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,N=t.get(x.envMap||z,H),Q=N&&N.mapping===dc?N.image.height:null,K=m[x.type];x.precision!==null&&(h=i.getMaxPrecision(x.precision),h!==x.precision&&Ut("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));const lt=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,gt=lt!==void 0?lt.length:0;let dt=0;V.morphAttributes.position!==void 0&&(dt=1),V.morphAttributes.normal!==void 0&&(dt=2),V.morphAttributes.color!==void 0&&(dt=3);let Gt,_e,ge,$;if(K){const re=ci[K];Gt=re.vertexShader,_e=re.fragmentShader}else Gt=x.vertexShader,_e=x.fragmentShader,o.update(x),ge=o.getVertexShaderID(x),$=o.getFragmentShaderID(x);const nt=e.getRenderTarget(),rt=e.state.buffers.depth.getReversed(),Bt=U.isInstancedMesh===!0,It=U.isBatchedMesh===!0,Ft=!!x.map,We=!!x.matcap,jt=!!N,se=!!x.aoMap,ue=!!x.lightMap,Wt=!!x.bumpMap,Ce=!!x.normalMap,C=!!x.displacementMap,De=!!x.emissiveMap,ne=!!x.metalnessMap,pe=!!x.roughnessMap,yt=x.anisotropy>0,b=x.clearcoat>0,_=x.dispersion>0,I=x.iridescence>0,q=x.sheen>0,j=x.transmission>0,Y=yt&&!!x.anisotropyMap,_t=b&&!!x.clearcoatMap,it=b&&!!x.clearcoatNormalMap,Pt=b&&!!x.clearcoatRoughnessMap,Dt=I&&!!x.iridescenceMap,Z=I&&!!x.iridescenceThicknessMap,tt=q&&!!x.sheenColorMap,vt=q&&!!x.sheenRoughnessMap,Mt=!!x.specularMap,ht=!!x.specularColorMap,Xt=!!x.specularIntensityMap,L=j&&!!x.transmissionMap,st=j&&!!x.thicknessMap,et=!!x.gradientMap,pt=!!x.alphaMap,J=x.alphaTest>0,X=!!x.alphaHash,xt=!!x.extensions;let Nt=di;x.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(Nt=e.toneMapping);const me={shaderID:K,shaderType:x.type,shaderName:x.name,vertexShader:Gt,fragmentShader:_e,defines:x.defines,customVertexShaderID:ge,customFragmentShaderID:$,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:It,batchingColor:It&&U._colorsTexture!==null,instancing:Bt,instancingColor:Bt&&U.instanceColor!==null,instancingMorph:Bt&&U.morphTexture!==null,outputColorSpace:nt===null?e.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Cr,alphaToCoverage:!!x.alphaToCoverage,map:Ft,matcap:We,envMap:jt,envMapMode:jt&&N.mapping,envMapCubeUVHeight:Q,aoMap:se,lightMap:ue,bumpMap:Wt,normalMap:Ce,displacementMap:C,emissiveMap:De,normalMapObjectSpace:Ce&&x.normalMapType===B_,normalMapTangentSpace:Ce&&x.normalMapType===O_,metalnessMap:ne,roughnessMap:pe,anisotropy:yt,anisotropyMap:Y,clearcoat:b,clearcoatMap:_t,clearcoatNormalMap:it,clearcoatRoughnessMap:Pt,dispersion:_,iridescence:I,iridescenceMap:Dt,iridescenceThicknessMap:Z,sheen:q,sheenColorMap:tt,sheenRoughnessMap:vt,specularMap:Mt,specularColorMap:ht,specularIntensityMap:Xt,transmission:j,transmissionMap:L,thicknessMap:st,gradientMap:et,opaque:x.transparent===!1&&x.blending===_r&&x.alphaToCoverage===!1,alphaMap:pt,alphaTest:J,alphaHash:X,combine:x.combine,mapUv:Ft&&g(x.map.channel),aoMapUv:se&&g(x.aoMap.channel),lightMapUv:ue&&g(x.lightMap.channel),bumpMapUv:Wt&&g(x.bumpMap.channel),normalMapUv:Ce&&g(x.normalMap.channel),displacementMapUv:C&&g(x.displacementMap.channel),emissiveMapUv:De&&g(x.emissiveMap.channel),metalnessMapUv:ne&&g(x.metalnessMap.channel),roughnessMapUv:pe&&g(x.roughnessMap.channel),anisotropyMapUv:Y&&g(x.anisotropyMap.channel),clearcoatMapUv:_t&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:it&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pt&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Dt&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:tt&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:vt&&g(x.sheenRoughnessMap.channel),specularMapUv:Mt&&g(x.specularMap.channel),specularColorMapUv:ht&&g(x.specularColorMap.channel),specularIntensityMapUv:Xt&&g(x.specularIntensityMap.channel),transmissionMapUv:L&&g(x.transmissionMap.channel),thicknessMapUv:st&&g(x.thicknessMap.channel),alphaMapUv:pt&&g(x.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Ce||yt),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!V.attributes.uv&&(Ft||pt),fog:!!F,useFog:x.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||V.attributes.normal===void 0&&Ce===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:rt,skinning:U.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:gt,morphTextureStride:dt,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:e.shadowMap.enabled&&W.length>0,shadowMapType:e.shadowMap.type,toneMapping:Nt,decodeVideoTexture:Ft&&x.map.isVideoTexture===!0&&Kt.getTransfer(x.map.colorSpace)===ae,decodeVideoTextureEmissive:De&&x.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(x.emissiveMap.colorSpace)===ae,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Li,flipSided:x.side===gn,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:xt&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xt&&x.extensions.multiDraw===!0||It)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return me.vertexUv1s=c.has(1),me.vertexUv2s=c.has(2),me.vertexUv3s=c.has(3),c.clear(),me}function p(x){const v=[];if(x.shaderID?v.push(x.shaderID):(v.push(x.customVertexShaderID),v.push(x.customFragmentShaderID)),x.defines!==void 0)for(const W in x.defines)v.push(W),v.push(x.defines[W]);return x.isRawShaderMaterial===!1&&(f(v,x),y(v,x),v.push(e.outputColorSpace)),v.push(x.customProgramCacheKey),v.join()}function f(x,v){x.push(v.precision),x.push(v.outputColorSpace),x.push(v.envMapMode),x.push(v.envMapCubeUVHeight),x.push(v.mapUv),x.push(v.alphaMapUv),x.push(v.lightMapUv),x.push(v.aoMapUv),x.push(v.bumpMapUv),x.push(v.normalMapUv),x.push(v.displacementMapUv),x.push(v.emissiveMapUv),x.push(v.metalnessMapUv),x.push(v.roughnessMapUv),x.push(v.anisotropyMapUv),x.push(v.clearcoatMapUv),x.push(v.clearcoatNormalMapUv),x.push(v.clearcoatRoughnessMapUv),x.push(v.iridescenceMapUv),x.push(v.iridescenceThicknessMapUv),x.push(v.sheenColorMapUv),x.push(v.sheenRoughnessMapUv),x.push(v.specularMapUv),x.push(v.specularColorMapUv),x.push(v.specularIntensityMapUv),x.push(v.transmissionMapUv),x.push(v.thicknessMapUv),x.push(v.combine),x.push(v.fogExp2),x.push(v.sizeAttenuation),x.push(v.morphTargetsCount),x.push(v.morphAttributeCount),x.push(v.numDirLights),x.push(v.numPointLights),x.push(v.numSpotLights),x.push(v.numSpotLightMaps),x.push(v.numHemiLights),x.push(v.numRectAreaLights),x.push(v.numDirLightShadows),x.push(v.numPointLightShadows),x.push(v.numSpotLightShadows),x.push(v.numSpotLightShadowsWithMaps),x.push(v.numLightProbes),x.push(v.shadowMapType),x.push(v.toneMapping),x.push(v.numClippingPlanes),x.push(v.numClipIntersection),x.push(v.depthPacking)}function y(x,v){a.disableAll(),v.instancing&&a.enable(0),v.instancingColor&&a.enable(1),v.instancingMorph&&a.enable(2),v.matcap&&a.enable(3),v.envMap&&a.enable(4),v.normalMapObjectSpace&&a.enable(5),v.normalMapTangentSpace&&a.enable(6),v.clearcoat&&a.enable(7),v.iridescence&&a.enable(8),v.alphaTest&&a.enable(9),v.vertexColors&&a.enable(10),v.vertexAlphas&&a.enable(11),v.vertexUv1s&&a.enable(12),v.vertexUv2s&&a.enable(13),v.vertexUv3s&&a.enable(14),v.vertexTangents&&a.enable(15),v.anisotropy&&a.enable(16),v.alphaHash&&a.enable(17),v.batching&&a.enable(18),v.dispersion&&a.enable(19),v.batchingColor&&a.enable(20),v.gradientMap&&a.enable(21),x.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reversedDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),x.push(a.mask)}function A(x){const v=m[x.type];let W;if(v){const w=ci[v];W=b1.clone(w.uniforms)}else W=x.uniforms;return W}function E(x,v){let W=u.get(v);return W!==void 0?++W.usedTimes:(W=new $3(e,v,x,s),l.push(W),u.set(v,W)),W}function T(x){if(--x.usedTimes===0){const v=l.indexOf(x);l[v]=l[l.length-1],l.pop(),u.delete(x.cacheKey),x.destroy()}}function R(x){o.remove(x)}function P(){o.dispose()}return{getParameters:M,getProgramCacheKey:p,getUniforms:A,acquireProgram:E,releaseProgram:T,releaseShaderCache:R,programs:l,dispose:P}}function Q3(){let e=new WeakMap;function t(a){return e.has(a)}function n(a){let o=e.get(a);return o===void 0&&(o={},e.set(a,o)),o}function i(a){e.delete(a)}function s(a,o,c){e.get(a)[o]=c}function r(){e=new WeakMap}return{has:t,get:n,remove:i,update:s,dispose:r}}function tM(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function bf(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function Af(){const e=[];let t=0;const n=[],i=[],s=[];function r(){t=0,n.length=0,i.length=0,s.length=0}function a(h){let m=0;return h.isInstancedMesh&&(m+=2),h.isSkinnedMesh&&(m+=1),m}function o(h,m,g,M,p,f){let y=e[t];return y===void 0?(y={id:h.id,object:h,geometry:m,material:g,materialVariant:a(h),groupOrder:M,renderOrder:h.renderOrder,z:p,group:f},e[t]=y):(y.id=h.id,y.object=h,y.geometry=m,y.material=g,y.materialVariant=a(h),y.groupOrder=M,y.renderOrder=h.renderOrder,y.z=p,y.group=f),t++,y}function c(h,m,g,M,p,f){const y=o(h,m,g,M,p,f);g.transmission>0?i.push(y):g.transparent===!0?s.push(y):n.push(y)}function l(h,m,g,M,p,f){const y=o(h,m,g,M,p,f);g.transmission>0?i.unshift(y):g.transparent===!0?s.unshift(y):n.unshift(y)}function u(h,m){n.length>1&&n.sort(h||tM),i.length>1&&i.sort(m||bf),s.length>1&&s.sort(m||bf)}function d(){for(let h=t,m=e.length;h<m;h++){const g=e[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:n,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:d,sort:u}}function eM(){let e=new WeakMap;function t(i,s){const r=e.get(i);let a;return r===void 0?(a=new Af,e.set(i,[a])):s>=r.length?(a=new Af,r.push(a)):a=r[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}function nM(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new O,color:new ie};break;case"SpotLight":n={position:new O,direction:new O,color:new ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new O,color:new ie,distance:0,decay:0};break;case"HemisphereLight":n={direction:new O,skyColor:new ie,groundColor:new ie};break;case"RectAreaLight":n={color:new ie,position:new O,halfWidth:new O,halfHeight:new O};break}return e[t.id]=n,n}}}function iM(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}let sM=0;function rM(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function aM(e){const t=new nM,n=iM(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new O);const s=new O,r=new we,a=new we;function o(l){let u=0,d=0,h=0;for(let v=0;v<9;v++)i.probe[v].set(0,0,0);let m=0,g=0,M=0,p=0,f=0,y=0,A=0,E=0,T=0,R=0,P=0;l.sort(rM);for(let v=0,W=l.length;v<W;v++){const w=l[v],U=w.color,F=w.intensity,V=w.distance;let z=null;if(w.shadow&&w.shadow.map&&(w.shadow.map.texture.format===Rr?z=w.shadow.map.texture:z=w.shadow.map.depthTexture||w.shadow.map.texture),w.isAmbientLight)u+=U.r*F,d+=U.g*F,h+=U.b*F;else if(w.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(w.sh.coefficients[H],F);P++}else if(w.isDirectionalLight){const H=t.get(w);if(H.color.copy(w.color).multiplyScalar(w.intensity),w.castShadow){const N=w.shadow,Q=n.get(w);Q.shadowIntensity=N.intensity,Q.shadowBias=N.bias,Q.shadowNormalBias=N.normalBias,Q.shadowRadius=N.radius,Q.shadowMapSize=N.mapSize,i.directionalShadow[m]=Q,i.directionalShadowMap[m]=z,i.directionalShadowMatrix[m]=w.shadow.matrix,y++}i.directional[m]=H,m++}else if(w.isSpotLight){const H=t.get(w);H.position.setFromMatrixPosition(w.matrixWorld),H.color.copy(U).multiplyScalar(F),H.distance=V,H.coneCos=Math.cos(w.angle),H.penumbraCos=Math.cos(w.angle*(1-w.penumbra)),H.decay=w.decay,i.spot[M]=H;const N=w.shadow;if(w.map&&(i.spotLightMap[T]=w.map,T++,N.updateMatrices(w),w.castShadow&&R++),i.spotLightMatrix[M]=N.matrix,w.castShadow){const Q=n.get(w);Q.shadowIntensity=N.intensity,Q.shadowBias=N.bias,Q.shadowNormalBias=N.normalBias,Q.shadowRadius=N.radius,Q.shadowMapSize=N.mapSize,i.spotShadow[M]=Q,i.spotShadowMap[M]=z,E++}M++}else if(w.isRectAreaLight){const H=t.get(w);H.color.copy(U).multiplyScalar(F),H.halfWidth.set(w.width*.5,0,0),H.halfHeight.set(0,w.height*.5,0),i.rectArea[p]=H,p++}else if(w.isPointLight){const H=t.get(w);if(H.color.copy(w.color).multiplyScalar(w.intensity),H.distance=w.distance,H.decay=w.decay,w.castShadow){const N=w.shadow,Q=n.get(w);Q.shadowIntensity=N.intensity,Q.shadowBias=N.bias,Q.shadowNormalBias=N.normalBias,Q.shadowRadius=N.radius,Q.shadowMapSize=N.mapSize,Q.shadowCameraNear=N.camera.near,Q.shadowCameraFar=N.camera.far,i.pointShadow[g]=Q,i.pointShadowMap[g]=z,i.pointShadowMatrix[g]=w.shadow.matrix,A++}i.point[g]=H,g++}else if(w.isHemisphereLight){const H=t.get(w);H.skyColor.copy(w.color).multiplyScalar(F),H.groundColor.copy(w.groundColor).multiplyScalar(F),i.hemi[f]=H,f++}}p>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=at.LTC_FLOAT_1,i.rectAreaLTC2=at.LTC_FLOAT_2):(i.rectAreaLTC1=at.LTC_HALF_1,i.rectAreaLTC2=at.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const x=i.hash;(x.directionalLength!==m||x.pointLength!==g||x.spotLength!==M||x.rectAreaLength!==p||x.hemiLength!==f||x.numDirectionalShadows!==y||x.numPointShadows!==A||x.numSpotShadows!==E||x.numSpotMaps!==T||x.numLightProbes!==P)&&(i.directional.length=m,i.spot.length=M,i.rectArea.length=p,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=A,i.pointShadowMap.length=A,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=A,i.spotLightMatrix.length=E+T-R,i.spotLightMap.length=T,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=P,x.directionalLength=m,x.pointLength=g,x.spotLength=M,x.rectAreaLength=p,x.hemiLength=f,x.numDirectionalShadows=y,x.numPointShadows=A,x.numSpotShadows=E,x.numSpotMaps=T,x.numLightProbes=P,i.version=sM++)}function c(l,u){let d=0,h=0,m=0,g=0,M=0;const p=u.matrixWorldInverse;for(let f=0,y=l.length;f<y;f++){const A=l[f];if(A.isDirectionalLight){const E=i.directional[d];E.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(p),d++}else if(A.isSpotLight){const E=i.spot[m];E.position.setFromMatrixPosition(A.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(p),m++}else if(A.isRectAreaLight){const E=i.rectArea[g];E.position.setFromMatrixPosition(A.matrixWorld),E.position.applyMatrix4(p),a.identity(),r.copy(A.matrixWorld),r.premultiply(p),a.extractRotation(r),E.halfWidth.set(A.width*.5,0,0),E.halfHeight.set(0,A.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),g++}else if(A.isPointLight){const E=i.point[h];E.position.setFromMatrixPosition(A.matrixWorld),E.position.applyMatrix4(p),h++}else if(A.isHemisphereLight){const E=i.hemi[M];E.direction.setFromMatrixPosition(A.matrixWorld),E.direction.transformDirection(p),M++}}}return{setup:o,setupView:c,state:i}}function Tf(e){const t=new aM(e),n=[],i=[];function s(u){l.camera=u,n.length=0,i.length=0}function r(u){n.push(u)}function a(u){i.push(u)}function o(){t.setup(n)}function c(u){t.setupView(n,u)}const l={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function oM(e){let t=new WeakMap;function n(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new Tf(e),t.set(s,[o])):r>=a.length?(o=new Tf(e),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:n,dispose:i}}const cM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,lM=`uniform sampler2D shadow_pass;
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
}`,hM=[new O(1,0,0),new O(-1,0,0),new O(0,1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1)],uM=[new O(0,-1,0),new O(0,-1,0),new O(0,0,1),new O(0,0,-1),new O(0,-1,0),new O(0,-1,0)],wf=new we,ma=new O,Tl=new O;function dM(e,t,n){let i=new Em;const s=new he,r=new he,a=new Ie,o=new R1,c=new C1,l={},u=n.maxTextureSize,d={[us]:gn,[gn]:us,[Li]:Li},h=new _i({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:cM,fragmentShader:lM}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const g=new on;g.setAttribute("position",new an(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new Tn(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Do;let f=this.type;this.render=function(R,P,x){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||R.length===0)return;this.type===p_&&(Ut("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Do);const v=e.getRenderTarget(),W=e.getActiveCubeFace(),w=e.getActiveMipmapLevel(),U=e.state;U.setBlending(Fi),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const F=f!==this.type;F&&P.traverse(function(V){V.material&&(Array.isArray(V.material)?V.material.forEach(z=>z.needsUpdate=!0):V.material.needsUpdate=!0)});for(let V=0,z=R.length;V<z;V++){const H=R[V],N=H.shadow;if(N===void 0){Ut("WebGLShadowMap:",H,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;s.copy(N.mapSize);const Q=N.getFrameExtents();s.multiply(Q),r.copy(N.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Q.x),s.x=r.x*Q.x,N.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Q.y),s.y=r.y*Q.y,N.mapSize.y=r.y));const K=e.state.buffers.depth.getReversed();if(N.camera._reversedDepth=K,N.map===null||F===!0){if(N.map!==null&&(N.map.depthTexture!==null&&(N.map.depthTexture.dispose(),N.map.depthTexture=null),N.map.dispose()),this.type===va){if(H.isPointLight){Ut("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}N.map=new fi(s.x,s.y,{format:Rr,type:Bi,minFilter:je,magFilter:je,generateMipmaps:!1}),N.map.texture.name=H.name+".shadowMap",N.map.depthTexture=new Ra(s.x,s.y,li),N.map.depthTexture.name=H.name+".shadowMapDepth",N.map.depthTexture.format=ki,N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Ze,N.map.depthTexture.magFilter=Ze}else H.isPointLight?(N.map=new Lm(s.x),N.map.depthTexture=new y1(s.x,gi)):(N.map=new fi(s.x,s.y),N.map.depthTexture=new Ra(s.x,s.y,gi)),N.map.depthTexture.name=H.name+".shadowMap",N.map.depthTexture.format=ki,this.type===Do?(N.map.depthTexture.compareFunction=K?uu:hu,N.map.depthTexture.minFilter=je,N.map.depthTexture.magFilter=je):(N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Ze,N.map.depthTexture.magFilter=Ze);N.camera.updateProjectionMatrix()}const lt=N.map.isWebGLCubeRenderTarget?6:1;for(let gt=0;gt<lt;gt++){if(N.map.isWebGLCubeRenderTarget)e.setRenderTarget(N.map,gt),e.clear();else{gt===0&&(e.setRenderTarget(N.map),e.clear());const dt=N.getViewport(gt);a.set(r.x*dt.x,r.y*dt.y,r.x*dt.z,r.y*dt.w),U.viewport(a)}if(H.isPointLight){const dt=N.camera,Gt=N.matrix,_e=H.distance||dt.far;_e!==dt.far&&(dt.far=_e,dt.updateProjectionMatrix()),ma.setFromMatrixPosition(H.matrixWorld),dt.position.copy(ma),Tl.copy(dt.position),Tl.add(hM[gt]),dt.up.copy(uM[gt]),dt.lookAt(Tl),dt.updateMatrixWorld(),Gt.makeTranslation(-ma.x,-ma.y,-ma.z),wf.multiplyMatrices(dt.projectionMatrix,dt.matrixWorldInverse),N._frustum.setFromProjectionMatrix(wf,dt.coordinateSystem,dt.reversedDepth)}else N.updateMatrices(H);i=N.getFrustum(),E(P,x,N.camera,H,this.type)}N.isPointLightShadow!==!0&&this.type===va&&y(N,x),N.needsUpdate=!1}f=this.type,p.needsUpdate=!1,e.setRenderTarget(v,W,w)};function y(R,P){const x=t.update(M);h.defines.VSM_SAMPLES!==R.blurSamples&&(h.defines.VSM_SAMPLES=R.blurSamples,m.defines.VSM_SAMPLES=R.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new fi(s.x,s.y,{format:Rr,type:Bi})),h.uniforms.shadow_pass.value=R.map.depthTexture,h.uniforms.resolution.value=R.mapSize,h.uniforms.radius.value=R.radius,e.setRenderTarget(R.mapPass),e.clear(),e.renderBufferDirect(P,null,x,h,M,null),m.uniforms.shadow_pass.value=R.mapPass.texture,m.uniforms.resolution.value=R.mapSize,m.uniforms.radius.value=R.radius,e.setRenderTarget(R.map),e.clear(),e.renderBufferDirect(P,null,x,m,M,null)}function A(R,P,x,v){let W=null;const w=x.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(w!==void 0)W=w;else if(W=x.isPointLight===!0?c:o,e.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const U=W.uuid,F=P.uuid;let V=l[U];V===void 0&&(V={},l[U]=V);let z=V[F];z===void 0&&(z=W.clone(),V[F]=z,P.addEventListener("dispose",T)),W=z}if(W.visible=P.visible,W.wireframe=P.wireframe,v===va?W.side=P.shadowSide!==null?P.shadowSide:P.side:W.side=P.shadowSide!==null?P.shadowSide:d[P.side],W.alphaMap=P.alphaMap,W.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,W.map=P.map,W.clipShadows=P.clipShadows,W.clippingPlanes=P.clippingPlanes,W.clipIntersection=P.clipIntersection,W.displacementMap=P.displacementMap,W.displacementScale=P.displacementScale,W.displacementBias=P.displacementBias,W.wireframeLinewidth=P.wireframeLinewidth,W.linewidth=P.linewidth,x.isPointLight===!0&&W.isMeshDistanceMaterial===!0){const U=e.properties.get(W);U.light=x}return W}function E(R,P,x,v,W){if(R.visible===!1)return;if(R.layers.test(P.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&W===va)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,R.matrixWorld);const F=t.update(R),V=R.material;if(Array.isArray(V)){const z=F.groups;for(let H=0,N=z.length;H<N;H++){const Q=z[H],K=V[Q.materialIndex];if(K&&K.visible){const lt=A(R,K,v,W);R.onBeforeShadow(e,R,P,x,F,lt,Q),e.renderBufferDirect(x,null,F,lt,R,Q),R.onAfterShadow(e,R,P,x,F,lt,Q)}}}else if(V.visible){const z=A(R,V,v,W);R.onBeforeShadow(e,R,P,x,F,z,null),e.renderBufferDirect(x,null,F,z,R,null),R.onAfterShadow(e,R,P,x,F,z,null)}}const U=R.children;for(let F=0,V=U.length;F<V;F++)E(U[F],P,x,v,W)}function T(R){R.target.removeEventListener("dispose",T);for(const x in l){const v=l[x],W=R.target.uuid;W in v&&(v[W].dispose(),delete v[W])}}}function fM(e,t){function n(){let L=!1;const st=new Ie;let et=null;const pt=new Ie(0,0,0,0);return{setMask:function(J){et!==J&&!L&&(e.colorMask(J,J,J,J),et=J)},setLocked:function(J){L=J},setClear:function(J,X,xt,Nt,me){me===!0&&(J*=Nt,X*=Nt,xt*=Nt),st.set(J,X,xt,Nt),pt.equals(st)===!1&&(e.clearColor(J,X,xt,Nt),pt.copy(st))},reset:function(){L=!1,et=null,pt.set(-1,0,0,0)}}}function i(){let L=!1,st=!1,et=null,pt=null,J=null;return{setReversed:function(X){if(st!==X){const xt=t.get("EXT_clip_control");X?xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.ZERO_TO_ONE_EXT):xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.NEGATIVE_ONE_TO_ONE_EXT),st=X;const Nt=J;J=null,this.setClear(Nt)}},getReversed:function(){return st},setTest:function(X){X?nt(e.DEPTH_TEST):rt(e.DEPTH_TEST)},setMask:function(X){et!==X&&!L&&(e.depthMask(X),et=X)},setFunc:function(X){if(st&&(X=$_[X]),pt!==X){switch(X){case Wl:e.depthFunc(e.NEVER);break;case Xl:e.depthFunc(e.ALWAYS);break;case Yl:e.depthFunc(e.LESS);break;case Tr:e.depthFunc(e.LEQUAL);break;case ql:e.depthFunc(e.EQUAL);break;case $l:e.depthFunc(e.GEQUAL);break;case jl:e.depthFunc(e.GREATER);break;case Kl:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}pt=X}},setLocked:function(X){L=X},setClear:function(X){J!==X&&(J=X,st&&(X=1-X),e.clearDepth(X))},reset:function(){L=!1,et=null,pt=null,J=null,st=!1}}}function s(){let L=!1,st=null,et=null,pt=null,J=null,X=null,xt=null,Nt=null,me=null;return{setTest:function(re){L||(re?nt(e.STENCIL_TEST):rt(e.STENCIL_TEST))},setMask:function(re){st!==re&&!L&&(e.stencilMask(re),st=re)},setFunc:function(re,bi,Ai){(et!==re||pt!==bi||J!==Ai)&&(e.stencilFunc(re,bi,Ai),et=re,pt=bi,J=Ai)},setOp:function(re,bi,Ai){(X!==re||xt!==bi||Nt!==Ai)&&(e.stencilOp(re,bi,Ai),X=re,xt=bi,Nt=Ai)},setLocked:function(re){L=re},setClear:function(re){me!==re&&(e.clearStencil(re),me=re)},reset:function(){L=!1,st=null,et=null,pt=null,J=null,X=null,xt=null,Nt=null,me=null}}}const r=new n,a=new i,o=new s,c=new WeakMap,l=new WeakMap;let u={},d={},h=new WeakMap,m=[],g=null,M=!1,p=null,f=null,y=null,A=null,E=null,T=null,R=null,P=new ie(0,0,0),x=0,v=!1,W=null,w=null,U=null,F=null,V=null;const z=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,N=0;const Q=e.getParameter(e.VERSION);Q.indexOf("WebGL")!==-1?(N=parseFloat(/^WebGL (\d)/.exec(Q)[1]),H=N>=1):Q.indexOf("OpenGL ES")!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),H=N>=2);let K=null,lt={};const gt=e.getParameter(e.SCISSOR_BOX),dt=e.getParameter(e.VIEWPORT),Gt=new Ie().fromArray(gt),_e=new Ie().fromArray(dt);function ge(L,st,et,pt){const J=new Uint8Array(4),X=e.createTexture();e.bindTexture(L,X),e.texParameteri(L,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(L,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let xt=0;xt<et;xt++)L===e.TEXTURE_3D||L===e.TEXTURE_2D_ARRAY?e.texImage3D(st,0,e.RGBA,1,1,pt,0,e.RGBA,e.UNSIGNED_BYTE,J):e.texImage2D(st+xt,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,J);return X}const $={};$[e.TEXTURE_2D]=ge(e.TEXTURE_2D,e.TEXTURE_2D,1),$[e.TEXTURE_CUBE_MAP]=ge(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[e.TEXTURE_2D_ARRAY]=ge(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),$[e.TEXTURE_3D]=ge(e.TEXTURE_3D,e.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),nt(e.DEPTH_TEST),a.setFunc(Tr),Wt(!1),Ce(wd),nt(e.CULL_FACE),se(Fi);function nt(L){u[L]!==!0&&(e.enable(L),u[L]=!0)}function rt(L){u[L]!==!1&&(e.disable(L),u[L]=!1)}function Bt(L,st){return d[L]!==st?(e.bindFramebuffer(L,st),d[L]=st,L===e.DRAW_FRAMEBUFFER&&(d[e.FRAMEBUFFER]=st),L===e.FRAMEBUFFER&&(d[e.DRAW_FRAMEBUFFER]=st),!0):!1}function It(L,st){let et=m,pt=!1;if(L){et=h.get(st),et===void 0&&(et=[],h.set(st,et));const J=L.textures;if(et.length!==J.length||et[0]!==e.COLOR_ATTACHMENT0){for(let X=0,xt=J.length;X<xt;X++)et[X]=e.COLOR_ATTACHMENT0+X;et.length=J.length,pt=!0}}else et[0]!==e.BACK&&(et[0]=e.BACK,pt=!0);pt&&e.drawBuffers(et)}function Ft(L){return g!==L?(e.useProgram(L),g=L,!0):!1}const We={[Ps]:e.FUNC_ADD,[g_]:e.FUNC_SUBTRACT,[__]:e.FUNC_REVERSE_SUBTRACT};We[v_]=e.MIN,We[x_]=e.MAX;const jt={[M_]:e.ZERO,[S_]:e.ONE,[y_]:e.SRC_COLOR,[Gl]:e.SRC_ALPHA,[R_]:e.SRC_ALPHA_SATURATE,[T_]:e.DST_COLOR,[b_]:e.DST_ALPHA,[E_]:e.ONE_MINUS_SRC_COLOR,[Hl]:e.ONE_MINUS_SRC_ALPHA,[w_]:e.ONE_MINUS_DST_COLOR,[A_]:e.ONE_MINUS_DST_ALPHA,[C_]:e.CONSTANT_COLOR,[P_]:e.ONE_MINUS_CONSTANT_COLOR,[L_]:e.CONSTANT_ALPHA,[I_]:e.ONE_MINUS_CONSTANT_ALPHA};function se(L,st,et,pt,J,X,xt,Nt,me,re){if(L===Fi){M===!0&&(rt(e.BLEND),M=!1);return}if(M===!1&&(nt(e.BLEND),M=!0),L!==m_){if(L!==p||re!==v){if((f!==Ps||E!==Ps)&&(e.blendEquation(e.FUNC_ADD),f=Ps,E=Ps),re)switch(L){case _r:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case mi:e.blendFunc(e.ONE,e.ONE);break;case Rd:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Cd:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Qt("WebGLState: Invalid blending: ",L);break}else switch(L){case _r:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case mi:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case Rd:Qt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Cd:Qt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qt("WebGLState: Invalid blending: ",L);break}y=null,A=null,T=null,R=null,P.set(0,0,0),x=0,p=L,v=re}return}J=J||st,X=X||et,xt=xt||pt,(st!==f||J!==E)&&(e.blendEquationSeparate(We[st],We[J]),f=st,E=J),(et!==y||pt!==A||X!==T||xt!==R)&&(e.blendFuncSeparate(jt[et],jt[pt],jt[X],jt[xt]),y=et,A=pt,T=X,R=xt),(Nt.equals(P)===!1||me!==x)&&(e.blendColor(Nt.r,Nt.g,Nt.b,me),P.copy(Nt),x=me),p=L,v=!1}function ue(L,st){L.side===Li?rt(e.CULL_FACE):nt(e.CULL_FACE);let et=L.side===gn;st&&(et=!et),Wt(et),L.blending===_r&&L.transparent===!1?se(Fi):se(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);const pt=L.stencilWrite;o.setTest(pt),pt&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),De(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?nt(e.SAMPLE_ALPHA_TO_COVERAGE):rt(e.SAMPLE_ALPHA_TO_COVERAGE)}function Wt(L){W!==L&&(L?e.frontFace(e.CW):e.frontFace(e.CCW),W=L)}function Ce(L){L!==d_?(nt(e.CULL_FACE),L!==w&&(L===wd?e.cullFace(e.BACK):L===f_?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):rt(e.CULL_FACE),w=L}function C(L){L!==U&&(H&&e.lineWidth(L),U=L)}function De(L,st,et){L?(nt(e.POLYGON_OFFSET_FILL),(F!==st||V!==et)&&(F=st,V=et,a.getReversed()&&(st=-st),e.polygonOffset(st,et))):rt(e.POLYGON_OFFSET_FILL)}function ne(L){L?nt(e.SCISSOR_TEST):rt(e.SCISSOR_TEST)}function pe(L){L===void 0&&(L=e.TEXTURE0+z-1),K!==L&&(e.activeTexture(L),K=L)}function yt(L,st,et){et===void 0&&(K===null?et=e.TEXTURE0+z-1:et=K);let pt=lt[et];pt===void 0&&(pt={type:void 0,texture:void 0},lt[et]=pt),(pt.type!==L||pt.texture!==st)&&(K!==et&&(e.activeTexture(et),K=et),e.bindTexture(L,st||$[L]),pt.type=L,pt.texture=st)}function b(){const L=lt[K];L!==void 0&&L.type!==void 0&&(e.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function _(){try{e.compressedTexImage2D(...arguments)}catch(L){Qt("WebGLState:",L)}}function I(){try{e.compressedTexImage3D(...arguments)}catch(L){Qt("WebGLState:",L)}}function q(){try{e.texSubImage2D(...arguments)}catch(L){Qt("WebGLState:",L)}}function j(){try{e.texSubImage3D(...arguments)}catch(L){Qt("WebGLState:",L)}}function Y(){try{e.compressedTexSubImage2D(...arguments)}catch(L){Qt("WebGLState:",L)}}function _t(){try{e.compressedTexSubImage3D(...arguments)}catch(L){Qt("WebGLState:",L)}}function it(){try{e.texStorage2D(...arguments)}catch(L){Qt("WebGLState:",L)}}function Pt(){try{e.texStorage3D(...arguments)}catch(L){Qt("WebGLState:",L)}}function Dt(){try{e.texImage2D(...arguments)}catch(L){Qt("WebGLState:",L)}}function Z(){try{e.texImage3D(...arguments)}catch(L){Qt("WebGLState:",L)}}function tt(L){Gt.equals(L)===!1&&(e.scissor(L.x,L.y,L.z,L.w),Gt.copy(L))}function vt(L){_e.equals(L)===!1&&(e.viewport(L.x,L.y,L.z,L.w),_e.copy(L))}function Mt(L,st){let et=l.get(st);et===void 0&&(et=new WeakMap,l.set(st,et));let pt=et.get(L);pt===void 0&&(pt=e.getUniformBlockIndex(st,L.name),et.set(L,pt))}function ht(L,st){const pt=l.get(st).get(L);c.get(st)!==pt&&(e.uniformBlockBinding(st,pt,L.__bindingPointIndex),c.set(st,pt))}function Xt(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),a.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),u={},K=null,lt={},d={},h=new WeakMap,m=[],g=null,M=!1,p=null,f=null,y=null,A=null,E=null,T=null,R=null,P=new ie(0,0,0),x=0,v=!1,W=null,w=null,U=null,F=null,V=null,Gt.set(0,0,e.canvas.width,e.canvas.height),_e.set(0,0,e.canvas.width,e.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:nt,disable:rt,bindFramebuffer:Bt,drawBuffers:It,useProgram:Ft,setBlending:se,setMaterial:ue,setFlipSided:Wt,setCullFace:Ce,setLineWidth:C,setPolygonOffset:De,setScissorTest:ne,activeTexture:pe,bindTexture:yt,unbindTexture:b,compressedTexImage2D:_,compressedTexImage3D:I,texImage2D:Dt,texImage3D:Z,updateUBOMapping:Mt,uniformBlockBinding:ht,texStorage2D:it,texStorage3D:Pt,texSubImage2D:q,texSubImage3D:j,compressedTexSubImage2D:Y,compressedTexSubImage3D:_t,scissor:tt,viewport:vt,reset:Xt}}function pM(e,t,n,i,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new he,u=new WeakMap;let d;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(b,_){return m?new OffscreenCanvas(b,_):Jo("canvas")}function M(b,_,I){let q=1;const j=yt(b);if((j.width>I||j.height>I)&&(q=I/Math.max(j.width,j.height)),q<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const Y=Math.floor(q*j.width),_t=Math.floor(q*j.height);d===void 0&&(d=g(Y,_t));const it=_?g(Y,_t):d;return it.width=Y,it.height=_t,it.getContext("2d").drawImage(b,0,0,Y,_t),Ut("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+Y+"x"+_t+")."),it}else return"data"in b&&Ut("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),b;return b}function p(b){return b.generateMipmaps}function f(b){e.generateMipmap(b)}function y(b){return b.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?e.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function A(b,_,I,q,j=!1){if(b!==null){if(e[b]!==void 0)return e[b];Ut("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let Y=_;if(_===e.RED&&(I===e.FLOAT&&(Y=e.R32F),I===e.HALF_FLOAT&&(Y=e.R16F),I===e.UNSIGNED_BYTE&&(Y=e.R8)),_===e.RED_INTEGER&&(I===e.UNSIGNED_BYTE&&(Y=e.R8UI),I===e.UNSIGNED_SHORT&&(Y=e.R16UI),I===e.UNSIGNED_INT&&(Y=e.R32UI),I===e.BYTE&&(Y=e.R8I),I===e.SHORT&&(Y=e.R16I),I===e.INT&&(Y=e.R32I)),_===e.RG&&(I===e.FLOAT&&(Y=e.RG32F),I===e.HALF_FLOAT&&(Y=e.RG16F),I===e.UNSIGNED_BYTE&&(Y=e.RG8)),_===e.RG_INTEGER&&(I===e.UNSIGNED_BYTE&&(Y=e.RG8UI),I===e.UNSIGNED_SHORT&&(Y=e.RG16UI),I===e.UNSIGNED_INT&&(Y=e.RG32UI),I===e.BYTE&&(Y=e.RG8I),I===e.SHORT&&(Y=e.RG16I),I===e.INT&&(Y=e.RG32I)),_===e.RGB_INTEGER&&(I===e.UNSIGNED_BYTE&&(Y=e.RGB8UI),I===e.UNSIGNED_SHORT&&(Y=e.RGB16UI),I===e.UNSIGNED_INT&&(Y=e.RGB32UI),I===e.BYTE&&(Y=e.RGB8I),I===e.SHORT&&(Y=e.RGB16I),I===e.INT&&(Y=e.RGB32I)),_===e.RGBA_INTEGER&&(I===e.UNSIGNED_BYTE&&(Y=e.RGBA8UI),I===e.UNSIGNED_SHORT&&(Y=e.RGBA16UI),I===e.UNSIGNED_INT&&(Y=e.RGBA32UI),I===e.BYTE&&(Y=e.RGBA8I),I===e.SHORT&&(Y=e.RGBA16I),I===e.INT&&(Y=e.RGBA32I)),_===e.RGB&&(I===e.UNSIGNED_INT_5_9_9_9_REV&&(Y=e.RGB9_E5),I===e.UNSIGNED_INT_10F_11F_11F_REV&&(Y=e.R11F_G11F_B10F)),_===e.RGBA){const _t=j?Ko:Kt.getTransfer(q);I===e.FLOAT&&(Y=e.RGBA32F),I===e.HALF_FLOAT&&(Y=e.RGBA16F),I===e.UNSIGNED_BYTE&&(Y=_t===ae?e.SRGB8_ALPHA8:e.RGBA8),I===e.UNSIGNED_SHORT_4_4_4_4&&(Y=e.RGBA4),I===e.UNSIGNED_SHORT_5_5_5_1&&(Y=e.RGB5_A1)}return(Y===e.R16F||Y===e.R32F||Y===e.RG16F||Y===e.RG32F||Y===e.RGBA16F||Y===e.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function E(b,_){let I;return b?_===null||_===gi||_===wa?I=e.DEPTH24_STENCIL8:_===li?I=e.DEPTH32F_STENCIL8:_===Ta&&(I=e.DEPTH24_STENCIL8,Ut("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===gi||_===wa?I=e.DEPTH_COMPONENT24:_===li?I=e.DEPTH_COMPONENT32F:_===Ta&&(I=e.DEPTH_COMPONENT16),I}function T(b,_){return p(b)===!0||b.isFramebufferTexture&&b.minFilter!==Ze&&b.minFilter!==je?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function R(b){const _=b.target;_.removeEventListener("dispose",R),x(_),_.isVideoTexture&&u.delete(_)}function P(b){const _=b.target;_.removeEventListener("dispose",P),W(_)}function x(b){const _=i.get(b);if(_.__webglInit===void 0)return;const I=b.source,q=h.get(I);if(q){const j=q[_.__cacheKey];j.usedTimes--,j.usedTimes===0&&v(b),Object.keys(q).length===0&&h.delete(I)}i.remove(b)}function v(b){const _=i.get(b);e.deleteTexture(_.__webglTexture);const I=b.source,q=h.get(I);delete q[_.__cacheKey],a.memory.textures--}function W(b){const _=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(_.__webglFramebuffer[q]))for(let j=0;j<_.__webglFramebuffer[q].length;j++)e.deleteFramebuffer(_.__webglFramebuffer[q][j]);else e.deleteFramebuffer(_.__webglFramebuffer[q]);_.__webglDepthbuffer&&e.deleteRenderbuffer(_.__webglDepthbuffer[q])}else{if(Array.isArray(_.__webglFramebuffer))for(let q=0;q<_.__webglFramebuffer.length;q++)e.deleteFramebuffer(_.__webglFramebuffer[q]);else e.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&e.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&e.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let q=0;q<_.__webglColorRenderbuffer.length;q++)_.__webglColorRenderbuffer[q]&&e.deleteRenderbuffer(_.__webglColorRenderbuffer[q]);_.__webglDepthRenderbuffer&&e.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const I=b.textures;for(let q=0,j=I.length;q<j;q++){const Y=i.get(I[q]);Y.__webglTexture&&(e.deleteTexture(Y.__webglTexture),a.memory.textures--),i.remove(I[q])}i.remove(b)}let w=0;function U(){w=0}function F(){const b=w;return b>=s.maxTextures&&Ut("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+s.maxTextures),w+=1,b}function V(b){const _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function z(b,_){const I=i.get(b);if(b.isVideoTexture&&ne(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&I.__version!==b.version){const q=b.image;if(q===null)Ut("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Ut("WebGLRenderer: Texture marked for update but image is incomplete");else{$(I,b,_);return}}else b.isExternalTexture&&(I.__webglTexture=b.sourceTexture?b.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,I.__webglTexture,e.TEXTURE0+_)}function H(b,_){const I=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&I.__version!==b.version){$(I,b,_);return}else b.isExternalTexture&&(I.__webglTexture=b.sourceTexture?b.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,I.__webglTexture,e.TEXTURE0+_)}function N(b,_){const I=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&I.__version!==b.version){$(I,b,_);return}n.bindTexture(e.TEXTURE_3D,I.__webglTexture,e.TEXTURE0+_)}function Q(b,_){const I=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&I.__version!==b.version){nt(I,b,_);return}n.bindTexture(e.TEXTURE_CUBE_MAP,I.__webglTexture,e.TEXTURE0+_)}const K={[Zl]:e.REPEAT,[Di]:e.CLAMP_TO_EDGE,[Jl]:e.MIRRORED_REPEAT},lt={[Ze]:e.NEAREST,[F_]:e.NEAREST_MIPMAP_NEAREST,[ja]:e.NEAREST_MIPMAP_LINEAR,[je]:e.LINEAR,[jc]:e.LINEAR_MIPMAP_NEAREST,[Ds]:e.LINEAR_MIPMAP_LINEAR},gt={[k_]:e.NEVER,[W_]:e.ALWAYS,[z_]:e.LESS,[hu]:e.LEQUAL,[V_]:e.EQUAL,[uu]:e.GEQUAL,[G_]:e.GREATER,[H_]:e.NOTEQUAL};function dt(b,_){if(_.type===li&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===je||_.magFilter===jc||_.magFilter===ja||_.magFilter===Ds||_.minFilter===je||_.minFilter===jc||_.minFilter===ja||_.minFilter===Ds)&&Ut("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(b,e.TEXTURE_WRAP_S,K[_.wrapS]),e.texParameteri(b,e.TEXTURE_WRAP_T,K[_.wrapT]),(b===e.TEXTURE_3D||b===e.TEXTURE_2D_ARRAY)&&e.texParameteri(b,e.TEXTURE_WRAP_R,K[_.wrapR]),e.texParameteri(b,e.TEXTURE_MAG_FILTER,lt[_.magFilter]),e.texParameteri(b,e.TEXTURE_MIN_FILTER,lt[_.minFilter]),_.compareFunction&&(e.texParameteri(b,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(b,e.TEXTURE_COMPARE_FUNC,gt[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ze||_.minFilter!==ja&&_.minFilter!==Ds||_.type===li&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const I=t.get("EXT_texture_filter_anisotropic");e.texParameterf(b,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Gt(b,_){let I=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",R));const q=_.source;let j=h.get(q);j===void 0&&(j={},h.set(q,j));const Y=V(_);if(Y!==b.__cacheKey){j[Y]===void 0&&(j[Y]={texture:e.createTexture(),usedTimes:0},a.memory.textures++,I=!0),j[Y].usedTimes++;const _t=j[b.__cacheKey];_t!==void 0&&(j[b.__cacheKey].usedTimes--,_t.usedTimes===0&&v(_)),b.__cacheKey=Y,b.__webglTexture=j[Y].texture}return I}function _e(b,_,I){return Math.floor(Math.floor(b/I)/_)}function ge(b,_,I,q){const Y=b.updateRanges;if(Y.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,_.width,_.height,I,q,_.data);else{Y.sort((Z,tt)=>Z.start-tt.start);let _t=0;for(let Z=1;Z<Y.length;Z++){const tt=Y[_t],vt=Y[Z],Mt=tt.start+tt.count,ht=_e(vt.start,_.width,4),Xt=_e(tt.start,_.width,4);vt.start<=Mt+1&&ht===Xt&&_e(vt.start+vt.count-1,_.width,4)===ht?tt.count=Math.max(tt.count,vt.start+vt.count-tt.start):(++_t,Y[_t]=vt)}Y.length=_t+1;const it=e.getParameter(e.UNPACK_ROW_LENGTH),Pt=e.getParameter(e.UNPACK_SKIP_PIXELS),Dt=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,_.width);for(let Z=0,tt=Y.length;Z<tt;Z++){const vt=Y[Z],Mt=Math.floor(vt.start/4),ht=Math.ceil(vt.count/4),Xt=Mt%_.width,L=Math.floor(Mt/_.width),st=ht,et=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,Xt),e.pixelStorei(e.UNPACK_SKIP_ROWS,L),n.texSubImage2D(e.TEXTURE_2D,0,Xt,L,st,et,I,q,_.data)}b.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,it),e.pixelStorei(e.UNPACK_SKIP_PIXELS,Pt),e.pixelStorei(e.UNPACK_SKIP_ROWS,Dt)}}function $(b,_,I){let q=e.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(q=e.TEXTURE_2D_ARRAY),_.isData3DTexture&&(q=e.TEXTURE_3D);const j=Gt(b,_),Y=_.source;n.bindTexture(q,b.__webglTexture,e.TEXTURE0+I);const _t=i.get(Y);if(Y.version!==_t.__version||j===!0){n.activeTexture(e.TEXTURE0+I);const it=Kt.getPrimaries(Kt.workingColorSpace),Pt=_.colorSpace===ss?null:Kt.getPrimaries(_.colorSpace),Dt=_.colorSpace===ss||it===Pt?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt);let Z=M(_.image,!1,s.maxTextureSize);Z=pe(_,Z);const tt=r.convert(_.format,_.colorSpace),vt=r.convert(_.type);let Mt=A(_.internalFormat,tt,vt,_.colorSpace,_.isVideoTexture);dt(q,_);let ht;const Xt=_.mipmaps,L=_.isVideoTexture!==!0,st=_t.__version===void 0||j===!0,et=Y.dataReady,pt=T(_,Z);if(_.isDepthTexture)Mt=E(_.format===Us,_.type),st&&(L?n.texStorage2D(e.TEXTURE_2D,1,Mt,Z.width,Z.height):n.texImage2D(e.TEXTURE_2D,0,Mt,Z.width,Z.height,0,tt,vt,null));else if(_.isDataTexture)if(Xt.length>0){L&&st&&n.texStorage2D(e.TEXTURE_2D,pt,Mt,Xt[0].width,Xt[0].height);for(let J=0,X=Xt.length;J<X;J++)ht=Xt[J],L?et&&n.texSubImage2D(e.TEXTURE_2D,J,0,0,ht.width,ht.height,tt,vt,ht.data):n.texImage2D(e.TEXTURE_2D,J,Mt,ht.width,ht.height,0,tt,vt,ht.data);_.generateMipmaps=!1}else L?(st&&n.texStorage2D(e.TEXTURE_2D,pt,Mt,Z.width,Z.height),et&&ge(_,Z,tt,vt)):n.texImage2D(e.TEXTURE_2D,0,Mt,Z.width,Z.height,0,tt,vt,Z.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){L&&st&&n.texStorage3D(e.TEXTURE_2D_ARRAY,pt,Mt,Xt[0].width,Xt[0].height,Z.depth);for(let J=0,X=Xt.length;J<X;J++)if(ht=Xt[J],_.format!==jn)if(tt!==null)if(L){if(et)if(_.layerUpdates.size>0){const xt=sf(ht.width,ht.height,_.format,_.type);for(const Nt of _.layerUpdates){const me=ht.data.subarray(Nt*xt/ht.data.BYTES_PER_ELEMENT,(Nt+1)*xt/ht.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,J,0,0,Nt,ht.width,ht.height,1,tt,me)}_.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,J,0,0,0,ht.width,ht.height,Z.depth,tt,ht.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,J,Mt,ht.width,ht.height,Z.depth,0,ht.data,0,0);else Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?et&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,J,0,0,0,ht.width,ht.height,Z.depth,tt,vt,ht.data):n.texImage3D(e.TEXTURE_2D_ARRAY,J,Mt,ht.width,ht.height,Z.depth,0,tt,vt,ht.data)}else{L&&st&&n.texStorage2D(e.TEXTURE_2D,pt,Mt,Xt[0].width,Xt[0].height);for(let J=0,X=Xt.length;J<X;J++)ht=Xt[J],_.format!==jn?tt!==null?L?et&&n.compressedTexSubImage2D(e.TEXTURE_2D,J,0,0,ht.width,ht.height,tt,ht.data):n.compressedTexImage2D(e.TEXTURE_2D,J,Mt,ht.width,ht.height,0,ht.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?et&&n.texSubImage2D(e.TEXTURE_2D,J,0,0,ht.width,ht.height,tt,vt,ht.data):n.texImage2D(e.TEXTURE_2D,J,Mt,ht.width,ht.height,0,tt,vt,ht.data)}else if(_.isDataArrayTexture)if(L){if(st&&n.texStorage3D(e.TEXTURE_2D_ARRAY,pt,Mt,Z.width,Z.height,Z.depth),et)if(_.layerUpdates.size>0){const J=sf(Z.width,Z.height,_.format,_.type);for(const X of _.layerUpdates){const xt=Z.data.subarray(X*J/Z.data.BYTES_PER_ELEMENT,(X+1)*J/Z.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,X,Z.width,Z.height,1,tt,vt,xt)}_.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,tt,vt,Z.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,Mt,Z.width,Z.height,Z.depth,0,tt,vt,Z.data);else if(_.isData3DTexture)L?(st&&n.texStorage3D(e.TEXTURE_3D,pt,Mt,Z.width,Z.height,Z.depth),et&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,tt,vt,Z.data)):n.texImage3D(e.TEXTURE_3D,0,Mt,Z.width,Z.height,Z.depth,0,tt,vt,Z.data);else if(_.isFramebufferTexture){if(st)if(L)n.texStorage2D(e.TEXTURE_2D,pt,Mt,Z.width,Z.height);else{let J=Z.width,X=Z.height;for(let xt=0;xt<pt;xt++)n.texImage2D(e.TEXTURE_2D,xt,Mt,J,X,0,tt,vt,null),J>>=1,X>>=1}}else if(Xt.length>0){if(L&&st){const J=yt(Xt[0]);n.texStorage2D(e.TEXTURE_2D,pt,Mt,J.width,J.height)}for(let J=0,X=Xt.length;J<X;J++)ht=Xt[J],L?et&&n.texSubImage2D(e.TEXTURE_2D,J,0,0,tt,vt,ht):n.texImage2D(e.TEXTURE_2D,J,Mt,tt,vt,ht);_.generateMipmaps=!1}else if(L){if(st){const J=yt(Z);n.texStorage2D(e.TEXTURE_2D,pt,Mt,J.width,J.height)}et&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,tt,vt,Z)}else n.texImage2D(e.TEXTURE_2D,0,Mt,tt,vt,Z);p(_)&&f(q),_t.__version=Y.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function nt(b,_,I){if(_.image.length!==6)return;const q=Gt(b,_),j=_.source;n.bindTexture(e.TEXTURE_CUBE_MAP,b.__webglTexture,e.TEXTURE0+I);const Y=i.get(j);if(j.version!==Y.__version||q===!0){n.activeTexture(e.TEXTURE0+I);const _t=Kt.getPrimaries(Kt.workingColorSpace),it=_.colorSpace===ss?null:Kt.getPrimaries(_.colorSpace),Pt=_.colorSpace===ss||_t===it?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);const Dt=_.isCompressedTexture||_.image[0].isCompressedTexture,Z=_.image[0]&&_.image[0].isDataTexture,tt=[];for(let X=0;X<6;X++)!Dt&&!Z?tt[X]=M(_.image[X],!0,s.maxCubemapSize):tt[X]=Z?_.image[X].image:_.image[X],tt[X]=pe(_,tt[X]);const vt=tt[0],Mt=r.convert(_.format,_.colorSpace),ht=r.convert(_.type),Xt=A(_.internalFormat,Mt,ht,_.colorSpace),L=_.isVideoTexture!==!0,st=Y.__version===void 0||q===!0,et=j.dataReady;let pt=T(_,vt);dt(e.TEXTURE_CUBE_MAP,_);let J;if(Dt){L&&st&&n.texStorage2D(e.TEXTURE_CUBE_MAP,pt,Xt,vt.width,vt.height);for(let X=0;X<6;X++){J=tt[X].mipmaps;for(let xt=0;xt<J.length;xt++){const Nt=J[xt];_.format!==jn?Mt!==null?L?et&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,xt,0,0,Nt.width,Nt.height,Mt,Nt.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,xt,Xt,Nt.width,Nt.height,0,Nt.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?et&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,xt,0,0,Nt.width,Nt.height,Mt,ht,Nt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,xt,Xt,Nt.width,Nt.height,0,Mt,ht,Nt.data)}}}else{if(J=_.mipmaps,L&&st){J.length>0&&pt++;const X=yt(tt[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,pt,Xt,X.width,X.height)}for(let X=0;X<6;X++)if(Z){L?et&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,tt[X].width,tt[X].height,Mt,ht,tt[X].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Xt,tt[X].width,tt[X].height,0,Mt,ht,tt[X].data);for(let xt=0;xt<J.length;xt++){const me=J[xt].image[X].image;L?et&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,xt+1,0,0,me.width,me.height,Mt,ht,me.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,xt+1,Xt,me.width,me.height,0,Mt,ht,me.data)}}else{L?et&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,0,0,Mt,ht,tt[X]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,0,Xt,Mt,ht,tt[X]);for(let xt=0;xt<J.length;xt++){const Nt=J[xt];L?et&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,xt+1,0,0,Mt,ht,Nt.image[X]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+X,xt+1,Xt,Mt,ht,Nt.image[X])}}}p(_)&&f(e.TEXTURE_CUBE_MAP),Y.__version=j.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function rt(b,_,I,q,j,Y){const _t=r.convert(I.format,I.colorSpace),it=r.convert(I.type),Pt=A(I.internalFormat,_t,it,I.colorSpace),Dt=i.get(_),Z=i.get(I);if(Z.__renderTarget=_,!Dt.__hasExternalTextures){const tt=Math.max(1,_.width>>Y),vt=Math.max(1,_.height>>Y);j===e.TEXTURE_3D||j===e.TEXTURE_2D_ARRAY?n.texImage3D(j,Y,Pt,tt,vt,_.depth,0,_t,it,null):n.texImage2D(j,Y,Pt,tt,vt,0,_t,it,null)}n.bindFramebuffer(e.FRAMEBUFFER,b),De(_)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,q,j,Z.__webglTexture,0,C(_)):(j===e.TEXTURE_2D||j>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,q,j,Z.__webglTexture,Y),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Bt(b,_,I){if(e.bindRenderbuffer(e.RENDERBUFFER,b),_.depthBuffer){const q=_.depthTexture,j=q&&q.isDepthTexture?q.type:null,Y=E(_.stencilBuffer,j),_t=_.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;De(_)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,C(_),Y,_.width,_.height):I?e.renderbufferStorageMultisample(e.RENDERBUFFER,C(_),Y,_.width,_.height):e.renderbufferStorage(e.RENDERBUFFER,Y,_.width,_.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,_t,e.RENDERBUFFER,b)}else{const q=_.textures;for(let j=0;j<q.length;j++){const Y=q[j],_t=r.convert(Y.format,Y.colorSpace),it=r.convert(Y.type),Pt=A(Y.internalFormat,_t,it,Y.colorSpace);De(_)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,C(_),Pt,_.width,_.height):I?e.renderbufferStorageMultisample(e.RENDERBUFFER,C(_),Pt,_.width,_.height):e.renderbufferStorage(e.RENDERBUFFER,Pt,_.width,_.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function It(b,_,I){const q=_.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=i.get(_.depthTexture);if(j.__renderTarget=_,(!j.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),q){if(j.__webglInit===void 0&&(j.__webglInit=!0,_.depthTexture.addEventListener("dispose",R)),j.__webglTexture===void 0){j.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,j.__webglTexture),dt(e.TEXTURE_CUBE_MAP,_.depthTexture);const Dt=r.convert(_.depthTexture.format),Z=r.convert(_.depthTexture.type);let tt;_.depthTexture.format===ki?tt=e.DEPTH_COMPONENT24:_.depthTexture.format===Us&&(tt=e.DEPTH24_STENCIL8);for(let vt=0;vt<6;vt++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,tt,_.width,_.height,0,Dt,Z,null)}}else z(_.depthTexture,0);const Y=j.__webglTexture,_t=C(_),it=q?e.TEXTURE_CUBE_MAP_POSITIVE_X+I:e.TEXTURE_2D,Pt=_.depthTexture.format===Us?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(_.depthTexture.format===ki)De(_)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Pt,it,Y,0,_t):e.framebufferTexture2D(e.FRAMEBUFFER,Pt,it,Y,0);else if(_.depthTexture.format===Us)De(_)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Pt,it,Y,0,_t):e.framebufferTexture2D(e.FRAMEBUFFER,Pt,it,Y,0);else throw new Error("Unknown depthTexture format")}function Ft(b){const _=i.get(b),I=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){const q=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),q){const j=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,q.removeEventListener("dispose",j)};q.addEventListener("dispose",j),_.__depthDisposeCallback=j}_.__boundDepthTexture=q}if(b.depthTexture&&!_.__autoAllocateDepthBuffer)if(I)for(let q=0;q<6;q++)It(_.__webglFramebuffer[q],b,q);else{const q=b.texture.mipmaps;q&&q.length>0?It(_.__webglFramebuffer[0],b,0):It(_.__webglFramebuffer,b,0)}else if(I){_.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer[q]),_.__webglDepthbuffer[q]===void 0)_.__webglDepthbuffer[q]=e.createRenderbuffer(),Bt(_.__webglDepthbuffer[q],b,!1);else{const j=b.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Y=_.__webglDepthbuffer[q];e.bindRenderbuffer(e.RENDERBUFFER,Y),e.framebufferRenderbuffer(e.FRAMEBUFFER,j,e.RENDERBUFFER,Y)}}else{const q=b.texture.mipmaps;if(q&&q.length>0?n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=e.createRenderbuffer(),Bt(_.__webglDepthbuffer,b,!1);else{const j=b.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,Y=_.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,Y),e.framebufferRenderbuffer(e.FRAMEBUFFER,j,e.RENDERBUFFER,Y)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function We(b,_,I){const q=i.get(b);_!==void 0&&rt(q.__webglFramebuffer,b,b.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),I!==void 0&&Ft(b)}function jt(b){const _=b.texture,I=i.get(b),q=i.get(_);b.addEventListener("dispose",P);const j=b.textures,Y=b.isWebGLCubeRenderTarget===!0,_t=j.length>1;if(_t||(q.__webglTexture===void 0&&(q.__webglTexture=e.createTexture()),q.__version=_.version,a.memory.textures++),Y){I.__webglFramebuffer=[];for(let it=0;it<6;it++)if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer[it]=[];for(let Pt=0;Pt<_.mipmaps.length;Pt++)I.__webglFramebuffer[it][Pt]=e.createFramebuffer()}else I.__webglFramebuffer[it]=e.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer=[];for(let it=0;it<_.mipmaps.length;it++)I.__webglFramebuffer[it]=e.createFramebuffer()}else I.__webglFramebuffer=e.createFramebuffer();if(_t)for(let it=0,Pt=j.length;it<Pt;it++){const Dt=i.get(j[it]);Dt.__webglTexture===void 0&&(Dt.__webglTexture=e.createTexture(),a.memory.textures++)}if(b.samples>0&&De(b)===!1){I.__webglMultisampledFramebuffer=e.createFramebuffer(),I.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let it=0;it<j.length;it++){const Pt=j[it];I.__webglColorRenderbuffer[it]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,I.__webglColorRenderbuffer[it]);const Dt=r.convert(Pt.format,Pt.colorSpace),Z=r.convert(Pt.type),tt=A(Pt.internalFormat,Dt,Z,Pt.colorSpace,b.isXRRenderTarget===!0),vt=C(b);e.renderbufferStorageMultisample(e.RENDERBUFFER,vt,tt,b.width,b.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+it,e.RENDERBUFFER,I.__webglColorRenderbuffer[it])}e.bindRenderbuffer(e.RENDERBUFFER,null),b.depthBuffer&&(I.__webglDepthRenderbuffer=e.createRenderbuffer(),Bt(I.__webglDepthRenderbuffer,b,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(Y){n.bindTexture(e.TEXTURE_CUBE_MAP,q.__webglTexture),dt(e.TEXTURE_CUBE_MAP,_);for(let it=0;it<6;it++)if(_.mipmaps&&_.mipmaps.length>0)for(let Pt=0;Pt<_.mipmaps.length;Pt++)rt(I.__webglFramebuffer[it][Pt],b,_,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+it,Pt);else rt(I.__webglFramebuffer[it],b,_,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);p(_)&&f(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(_t){for(let it=0,Pt=j.length;it<Pt;it++){const Dt=j[it],Z=i.get(Dt);let tt=e.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(tt=b.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(tt,Z.__webglTexture),dt(tt,Dt),rt(I.__webglFramebuffer,b,Dt,e.COLOR_ATTACHMENT0+it,tt,0),p(Dt)&&f(tt)}n.unbindTexture()}else{let it=e.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(it=b.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(it,q.__webglTexture),dt(it,_),_.mipmaps&&_.mipmaps.length>0)for(let Pt=0;Pt<_.mipmaps.length;Pt++)rt(I.__webglFramebuffer[Pt],b,_,e.COLOR_ATTACHMENT0,it,Pt);else rt(I.__webglFramebuffer,b,_,e.COLOR_ATTACHMENT0,it,0);p(_)&&f(it),n.unbindTexture()}b.depthBuffer&&Ft(b)}function se(b){const _=b.textures;for(let I=0,q=_.length;I<q;I++){const j=_[I];if(p(j)){const Y=y(b),_t=i.get(j).__webglTexture;n.bindTexture(Y,_t),f(Y),n.unbindTexture()}}}const ue=[],Wt=[];function Ce(b){if(b.samples>0){if(De(b)===!1){const _=b.textures,I=b.width,q=b.height;let j=e.COLOR_BUFFER_BIT;const Y=b.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,_t=i.get(b),it=_.length>1;if(it)for(let Dt=0;Dt<_.length;Dt++)n.bindFramebuffer(e.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Dt,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,_t.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Dt,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,_t.__webglMultisampledFramebuffer);const Pt=b.texture.mipmaps;Pt&&Pt.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,_t.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,_t.__webglFramebuffer);for(let Dt=0;Dt<_.length;Dt++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(j|=e.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(j|=e.STENCIL_BUFFER_BIT)),it){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,_t.__webglColorRenderbuffer[Dt]);const Z=i.get(_[Dt]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Z,0)}e.blitFramebuffer(0,0,I,q,0,0,I,q,j,e.NEAREST),c===!0&&(ue.length=0,Wt.length=0,ue.push(e.COLOR_ATTACHMENT0+Dt),b.depthBuffer&&b.resolveDepthBuffer===!1&&(ue.push(Y),Wt.push(Y),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Wt)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ue))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),it)for(let Dt=0;Dt<_.length;Dt++){n.bindFramebuffer(e.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Dt,e.RENDERBUFFER,_t.__webglColorRenderbuffer[Dt]);const Z=i.get(_[Dt]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,_t.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Dt,e.TEXTURE_2D,Z,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,_t.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){const _=b.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[_])}}}function C(b){return Math.min(s.maxSamples,b.samples)}function De(b){const _=i.get(b);return b.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ne(b){const _=a.render.frame;u.get(b)!==_&&(u.set(b,_),b.update())}function pe(b,_){const I=b.colorSpace,q=b.format,j=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||I!==Cr&&I!==ss&&(Kt.getTransfer(I)===ae?(q!==jn||j!==kn)&&Ut("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qt("WebGLTextures: Unsupported texture color space:",I)),_}function yt(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=F,this.resetTextureUnits=U,this.setTexture2D=z,this.setTexture2DArray=H,this.setTexture3D=N,this.setTextureCube=Q,this.rebindTextures=We,this.setupRenderTarget=jt,this.updateRenderTargetMipmap=se,this.updateMultisampleRenderTarget=Ce,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=rt,this.useMultisampledRTT=De,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function mM(e,t){function n(i,s=ss){let r;const a=Kt.getTransfer(s);if(i===kn)return e.UNSIGNED_BYTE;if(i===ru)return e.UNSIGNED_SHORT_4_4_4_4;if(i===au)return e.UNSIGNED_SHORT_5_5_5_1;if(i===dm)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===fm)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===hm)return e.BYTE;if(i===um)return e.SHORT;if(i===Ta)return e.UNSIGNED_SHORT;if(i===su)return e.INT;if(i===gi)return e.UNSIGNED_INT;if(i===li)return e.FLOAT;if(i===Bi)return e.HALF_FLOAT;if(i===pm)return e.ALPHA;if(i===mm)return e.RGB;if(i===jn)return e.RGBA;if(i===ki)return e.DEPTH_COMPONENT;if(i===Us)return e.DEPTH_STENCIL;if(i===gm)return e.RED;if(i===ou)return e.RED_INTEGER;if(i===Rr)return e.RG;if(i===cu)return e.RG_INTEGER;if(i===lu)return e.RGBA_INTEGER;if(i===Uo||i===Fo||i===No||i===Oo)if(a===ae)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Uo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Fo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===No)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Oo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Uo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Fo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===No)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Oo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ql||i===th||i===eh||i===nh)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ql)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===th)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===eh)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===nh)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ih||i===sh||i===rh||i===ah||i===oh||i===ch||i===lh)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===ih||i===sh)return a===ae?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===rh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===ah)return r.COMPRESSED_R11_EAC;if(i===oh)return r.COMPRESSED_SIGNED_R11_EAC;if(i===ch)return r.COMPRESSED_RG11_EAC;if(i===lh)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===hh||i===uh||i===dh||i===fh||i===ph||i===mh||i===gh||i===_h||i===vh||i===xh||i===Mh||i===Sh||i===yh||i===Eh)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===hh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===uh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===dh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===fh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===ph)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===mh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===gh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===_h)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===vh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===xh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Mh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Sh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===yh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Eh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===bh||i===Ah||i===Th)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===bh)return a===ae?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ah)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Th)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===wh||i===Rh||i===Ch||i===Ph)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===wh)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Rh)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ch)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ph)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===wa?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}const gM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,_M=`
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

}`;class vM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const i=new Tm(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,i=new _i({vertexShader:gM,fragmentShader:_M,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Tn(new pc(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class xM extends Xr{constructor(t,n){super();const i=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,d=null,h=null,m=null,g=null;const M=typeof XRWebGLBinding<"u",p=new vM,f={},y=n.getContextAttributes();let A=null,E=null;const T=[],R=[],P=new he;let x=null;const v=new Bn;v.viewport=new Ie;const W=new Bn;W.viewport=new Ie;const w=[v,W],U=new L1;let F=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let nt=T[$];return nt===void 0&&(nt=new il,T[$]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function($){let nt=T[$];return nt===void 0&&(nt=new il,T[$]=nt),nt.getGripSpace()},this.getHand=function($){let nt=T[$];return nt===void 0&&(nt=new il,T[$]=nt),nt.getHandSpace()};function z($){const nt=R.indexOf($.inputSource);if(nt===-1)return;const rt=T[nt];rt!==void 0&&(rt.update($.inputSource,$.frame,l||a),rt.dispatchEvent({type:$.type,data:$.inputSource}))}function H(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",N);for(let $=0;$<T.length;$++){const nt=R[$];nt!==null&&(R[$]=null,T[$].disconnect(nt))}F=null,V=null,p.reset();for(const $ in f)delete f[$];t.setRenderTarget(A),m=null,h=null,d=null,s=null,E=null,ge.stop(),i.isPresenting=!1,t.setPixelRatio(x),t.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,i.isPresenting===!0&&Ut("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,i.isPresenting===!0&&Ut("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return d===null&&M&&(d=new XRWebGLBinding(s,n)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(A=t.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",H),s.addEventListener("inputsourceschange",N),y.xrCompatible!==!0&&await n.makeXRCompatible(),x=t.getPixelRatio(),t.getSize(P),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let rt=null,Bt=null,It=null;y.depth&&(It=y.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,rt=y.stencil?Us:ki,Bt=y.stencil?wa:gi);const Ft={colorFormat:n.RGBA8,depthFormat:It,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(Ft),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),E=new fi(h.textureWidth,h.textureHeight,{format:jn,type:kn,depthTexture:new Ra(h.textureWidth,h.textureHeight,Bt,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:y.stencil,colorSpace:t.outputColorSpace,samples:y.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const rt={antialias:y.antialias,alpha:!0,depth:y.depth,stencil:y.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,n,rt),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),E=new fi(m.framebufferWidth,m.framebufferHeight,{format:jn,type:kn,colorSpace:t.outputColorSpace,stencilBuffer:y.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),ge.setContext(s),ge.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function N($){for(let nt=0;nt<$.removed.length;nt++){const rt=$.removed[nt],Bt=R.indexOf(rt);Bt>=0&&(R[Bt]=null,T[Bt].disconnect(rt))}for(let nt=0;nt<$.added.length;nt++){const rt=$.added[nt];let Bt=R.indexOf(rt);if(Bt===-1){for(let Ft=0;Ft<T.length;Ft++)if(Ft>=R.length){R.push(rt),Bt=Ft;break}else if(R[Ft]===null){R[Ft]=rt,Bt=Ft;break}if(Bt===-1)break}const It=T[Bt];It&&It.connect(rt)}}const Q=new O,K=new O;function lt($,nt,rt){Q.setFromMatrixPosition(nt.matrixWorld),K.setFromMatrixPosition(rt.matrixWorld);const Bt=Q.distanceTo(K),It=nt.projectionMatrix.elements,Ft=rt.projectionMatrix.elements,We=It[14]/(It[10]-1),jt=It[14]/(It[10]+1),se=(It[9]+1)/It[5],ue=(It[9]-1)/It[5],Wt=(It[8]-1)/It[0],Ce=(Ft[8]+1)/Ft[0],C=We*Wt,De=We*Ce,ne=Bt/(-Wt+Ce),pe=ne*-Wt;if(nt.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(pe),$.translateZ(ne),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),It[10]===-1)$.projectionMatrix.copy(nt.projectionMatrix),$.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const yt=We+ne,b=jt+ne,_=C-pe,I=De+(Bt-pe),q=se*jt/b*yt,j=ue*jt/b*yt;$.projectionMatrix.makePerspective(_,I,q,j,yt,b),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function gt($,nt){nt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(nt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let nt=$.near,rt=$.far;p.texture!==null&&(p.depthNear>0&&(nt=p.depthNear),p.depthFar>0&&(rt=p.depthFar)),U.near=W.near=v.near=nt,U.far=W.far=v.far=rt,(F!==U.near||V!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),F=U.near,V=U.far),U.layers.mask=$.layers.mask|6,v.layers.mask=U.layers.mask&-5,W.layers.mask=U.layers.mask&-3;const Bt=$.parent,It=U.cameras;gt(U,Bt);for(let Ft=0;Ft<It.length;Ft++)gt(It[Ft],Bt);It.length===2?lt(U,v,W):U.projectionMatrix.copy(v.projectionMatrix),dt($,U,Bt)};function dt($,nt,rt){rt===null?$.matrix.copy(nt.matrixWorld):($.matrix.copy(rt.matrixWorld),$.matrix.invert(),$.matrix.multiply(nt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(nt.projectionMatrix),$.projectionMatrixInverse.copy(nt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Lh*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(h===null&&m===null))return c},this.setFoveation=function($){c=$,h!==null&&(h.fixedFoveation=$),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=$)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(U)},this.getCameraTexture=function($){return f[$]};let Gt=null;function _e($,nt){if(u=nt.getViewerPose(l||a),g=nt,u!==null){const rt=u.views;m!==null&&(t.setRenderTargetFramebuffer(E,m.framebuffer),t.setRenderTarget(E));let Bt=!1;rt.length!==U.cameras.length&&(U.cameras.length=0,Bt=!0);for(let jt=0;jt<rt.length;jt++){const se=rt[jt];let ue=null;if(m!==null)ue=m.getViewport(se);else{const Ce=d.getViewSubImage(h,se);ue=Ce.viewport,jt===0&&(t.setRenderTargetTextures(E,Ce.colorTexture,Ce.depthStencilTexture),t.setRenderTarget(E))}let Wt=w[jt];Wt===void 0&&(Wt=new Bn,Wt.layers.enable(jt),Wt.viewport=new Ie,w[jt]=Wt),Wt.matrix.fromArray(se.transform.matrix),Wt.matrix.decompose(Wt.position,Wt.quaternion,Wt.scale),Wt.projectionMatrix.fromArray(se.projectionMatrix),Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(),Wt.viewport.set(ue.x,ue.y,ue.width,ue.height),jt===0&&(U.matrix.copy(Wt.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Bt===!0&&U.cameras.push(Wt)}const It=s.enabledFeatures;if(It&&It.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&M){d=i.getBinding();const jt=d.getDepthInformation(rt[0]);jt&&jt.isValid&&jt.texture&&p.init(jt,s.renderState)}if(It&&It.includes("camera-access")&&M){t.state.unbindTexture(),d=i.getBinding();for(let jt=0;jt<rt.length;jt++){const se=rt[jt].camera;if(se){let ue=f[se];ue||(ue=new Tm,f[se]=ue);const Wt=d.getCameraImage(se);ue.sourceTexture=Wt}}}}for(let rt=0;rt<T.length;rt++){const Bt=R[rt],It=T[rt];Bt!==null&&It!==void 0&&It.update(Bt,nt,l||a)}Gt&&Gt($,nt),nt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:nt}),g=null}const ge=new Pm;ge.setAnimationLoop(_e),this.setAnimationLoop=function($){Gt=$},this.dispose=function(){}}}const Es=new zi,MM=new we;function SM(e,t){function n(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function i(p,f){f.color.getRGB(p.fogColor.value,wm(e)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function s(p,f,y,A,E){f.isMeshBasicMaterial?r(p,f):f.isMeshLambertMaterial?(r(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(p,f),d(p,f)):f.isMeshPhongMaterial?(r(p,f),u(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(p,f),h(p,f),f.isMeshPhysicalMaterial&&m(p,f,E)):f.isMeshMatcapMaterial?(r(p,f),g(p,f)):f.isMeshDepthMaterial?r(p,f):f.isMeshDistanceMaterial?(r(p,f),M(p,f)):f.isMeshNormalMaterial?r(p,f):f.isLineBasicMaterial?(a(p,f),f.isLineDashedMaterial&&o(p,f)):f.isPointsMaterial?c(p,f,y,A):f.isSpriteMaterial?l(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,n(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,n(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,n(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===gn&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,n(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===gn&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,n(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,n(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,n(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const y=t.get(f),A=y.envMap,E=y.envMapRotation;A&&(p.envMap.value=A,Es.copy(E),Es.x*=-1,Es.y*=-1,Es.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(Es.y*=-1,Es.z*=-1),p.envMapRotation.value.setFromMatrix4(MM.makeRotationFromEuler(Es)),p.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,n(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,n(f.aoMap,p.aoMapTransform))}function a(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,n(f.map,p.mapTransform))}function o(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function c(p,f,y,A){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*y,p.scale.value=A*.5,f.map&&(p.map.value=f.map,n(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,n(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function l(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,n(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,n(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function u(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function d(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function h(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,n(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,n(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,y){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,n(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,n(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,n(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,n(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,n(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===gn&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,n(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,n(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,n(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,n(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,n(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,n(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,n(f.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,f){f.matcap&&(p.matcap.value=f.matcap)}function M(p,f){const y=t.get(f).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function yM(e,t,n,i){let s={},r={},a=[];const o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,A){const E=A.program;i.uniformBlockBinding(y,E)}function l(y,A){let E=s[y.id];E===void 0&&(g(y),E=u(y),s[y.id]=E,y.addEventListener("dispose",p));const T=A.program;i.updateUBOMapping(y,T);const R=t.render.frame;r[y.id]!==R&&(h(y),r[y.id]=R)}function u(y){const A=d();y.__bindingPointIndex=A;const E=e.createBuffer(),T=y.__size,R=y.usage;return e.bindBuffer(e.UNIFORM_BUFFER,E),e.bufferData(e.UNIFORM_BUFFER,T,R),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,A,E),E}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Qt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){const A=s[y.id],E=y.uniforms,T=y.__cache;e.bindBuffer(e.UNIFORM_BUFFER,A);for(let R=0,P=E.length;R<P;R++){const x=Array.isArray(E[R])?E[R]:[E[R]];for(let v=0,W=x.length;v<W;v++){const w=x[v];if(m(w,R,v,T)===!0){const U=w.__offset,F=Array.isArray(w.value)?w.value:[w.value];let V=0;for(let z=0;z<F.length;z++){const H=F[z],N=M(H);typeof H=="number"||typeof H=="boolean"?(w.__data[0]=H,e.bufferSubData(e.UNIFORM_BUFFER,U+V,w.__data)):H.isMatrix3?(w.__data[0]=H.elements[0],w.__data[1]=H.elements[1],w.__data[2]=H.elements[2],w.__data[3]=0,w.__data[4]=H.elements[3],w.__data[5]=H.elements[4],w.__data[6]=H.elements[5],w.__data[7]=0,w.__data[8]=H.elements[6],w.__data[9]=H.elements[7],w.__data[10]=H.elements[8],w.__data[11]=0):(H.toArray(w.__data,V),V+=N.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,U,w.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function m(y,A,E,T){const R=y.value,P=A+"_"+E;if(T[P]===void 0)return typeof R=="number"||typeof R=="boolean"?T[P]=R:T[P]=R.clone(),!0;{const x=T[P];if(typeof R=="number"||typeof R=="boolean"){if(x!==R)return T[P]=R,!0}else if(x.equals(R)===!1)return x.copy(R),!0}return!1}function g(y){const A=y.uniforms;let E=0;const T=16;for(let P=0,x=A.length;P<x;P++){const v=Array.isArray(A[P])?A[P]:[A[P]];for(let W=0,w=v.length;W<w;W++){const U=v[W],F=Array.isArray(U.value)?U.value:[U.value];for(let V=0,z=F.length;V<z;V++){const H=F[V],N=M(H),Q=E%T,K=Q%N.boundary,lt=Q+K;E+=K,lt!==0&&T-lt<N.storage&&(E+=T-lt),U.__data=new Float32Array(N.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=E,E+=N.storage}}}const R=E%T;return R>0&&(E+=T-R),y.__size=E,y.__cache={},this}function M(y){const A={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(A.boundary=4,A.storage=4):y.isVector2?(A.boundary=8,A.storage=8):y.isVector3||y.isColor?(A.boundary=16,A.storage=12):y.isVector4?(A.boundary=16,A.storage=16):y.isMatrix3?(A.boundary=48,A.storage=48):y.isMatrix4?(A.boundary=64,A.storage=64):y.isTexture?Ut("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ut("WebGLRenderer: Unsupported uniform value type.",y),A}function p(y){const A=y.target;A.removeEventListener("dispose",p);const E=a.indexOf(A.__bindingPointIndex);a.splice(E,1),e.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function f(){for(const y in s)e.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:c,update:l,dispose:f}}const EM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ii=null;function bM(){return ii===null&&(ii=new m1(EM,16,16,Rr,Bi),ii.name="DFG_LUT",ii.minFilter=je,ii.magFilter=je,ii.wrapS=Di,ii.wrapT=Di,ii.generateMipmaps=!1,ii.needsUpdate=!0),ii}class AM{constructor(t={}){const{canvas:n=Y_(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:m=kn}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const M=m,p=new Set([lu,cu,ou]),f=new Set([kn,gi,Ta,wa,ru,au]),y=new Uint32Array(4),A=new Int32Array(4);let E=null,T=null;const R=[],P=[];let x=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=di,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const v=this;let W=!1;this._outputColorSpace=On;let w=0,U=0,F=null,V=-1,z=null;const H=new Ie,N=new Ie;let Q=null;const K=new ie(0);let lt=0,gt=n.width,dt=n.height,Gt=1,_e=null,ge=null;const $=new Ie(0,0,gt,dt),nt=new Ie(0,0,gt,dt);let rt=!1;const Bt=new Em;let It=!1,Ft=!1;const We=new we,jt=new O,se=new Ie,ue={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Wt=!1;function Ce(){return F===null?Gt:1}let C=i;function De(S,D){return n.getContext(S,D)}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${iu}`),n.addEventListener("webglcontextlost",xt,!1),n.addEventListener("webglcontextrestored",Nt,!1),n.addEventListener("webglcontextcreationerror",me,!1),C===null){const D="webgl2";if(C=De(D,S),C===null)throw De(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw Qt("WebGLRenderer: "+S.message),S}let ne,pe,yt,b,_,I,q,j,Y,_t,it,Pt,Dt,Z,tt,vt,Mt,ht,Xt,L,st,et,pt;function J(){ne=new Ax(C),ne.init(),st=new mM(C,ne),pe=new _x(C,ne,t,st),yt=new fM(C,ne),pe.reversedDepthBuffer&&h&&yt.buffers.depth.setReversed(!0),b=new Rx(C),_=new Q3,I=new pM(C,ne,yt,_,pe,st,b),q=new bx(v),j=new D1(C),et=new mx(C,j),Y=new Tx(C,j,b,et),_t=new Px(C,Y,j,et,b),ht=new Cx(C,pe,I),tt=new vx(_),it=new J3(v,q,ne,pe,et,tt),Pt=new SM(v,_),Dt=new eM,Z=new oM(ne),Mt=new px(v,q,yt,_t,g,c),vt=new dM(v,_t,pe),pt=new yM(C,b,pe,yt),Xt=new gx(C,ne,b),L=new wx(C,ne,b),b.programs=it.programs,v.capabilities=pe,v.extensions=ne,v.properties=_,v.renderLists=Dt,v.shadowMap=vt,v.state=yt,v.info=b}J(),M!==kn&&(x=new Ix(M,n.width,n.height,s,r));const X=new xM(v,C);this.xr=X,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const S=ne.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=ne.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return Gt},this.setPixelRatio=function(S){S!==void 0&&(Gt=S,this.setSize(gt,dt,!1))},this.getSize=function(S){return S.set(gt,dt)},this.setSize=function(S,D,G=!0){if(X.isPresenting){Ut("WebGLRenderer: Can't change size while VR device is presenting.");return}gt=S,dt=D,n.width=Math.floor(S*Gt),n.height=Math.floor(D*Gt),G===!0&&(n.style.width=S+"px",n.style.height=D+"px"),x!==null&&x.setSize(n.width,n.height),this.setViewport(0,0,S,D)},this.getDrawingBufferSize=function(S){return S.set(gt*Gt,dt*Gt).floor()},this.setDrawingBufferSize=function(S,D,G){gt=S,dt=D,Gt=G,n.width=Math.floor(S*G),n.height=Math.floor(D*G),this.setViewport(0,0,S,D)},this.setEffects=function(S){if(M===kn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let D=0;D<S.length;D++)if(S[D].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}x.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(H)},this.getViewport=function(S){return S.copy($)},this.setViewport=function(S,D,G,k){S.isVector4?$.set(S.x,S.y,S.z,S.w):$.set(S,D,G,k),yt.viewport(H.copy($).multiplyScalar(Gt).round())},this.getScissor=function(S){return S.copy(nt)},this.setScissor=function(S,D,G,k){S.isVector4?nt.set(S.x,S.y,S.z,S.w):nt.set(S,D,G,k),yt.scissor(N.copy(nt).multiplyScalar(Gt).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(S){yt.setScissorTest(rt=S)},this.setOpaqueSort=function(S){_e=S},this.setTransparentSort=function(S){ge=S},this.getClearColor=function(S){return S.copy(Mt.getClearColor())},this.setClearColor=function(){Mt.setClearColor(...arguments)},this.getClearAlpha=function(){return Mt.getClearAlpha()},this.setClearAlpha=function(){Mt.setClearAlpha(...arguments)},this.clear=function(S=!0,D=!0,G=!0){let k=0;if(S){let B=!1;if(F!==null){const ot=F.texture.format;B=p.has(ot)}if(B){const ot=F.texture.type,ft=f.has(ot),ct=Mt.getClearColor(),St=Mt.getClearAlpha(),Tt=ct.r,Ot=ct.g,Yt=ct.b;ft?(y[0]=Tt,y[1]=Ot,y[2]=Yt,y[3]=St,C.clearBufferuiv(C.COLOR,0,y)):(A[0]=Tt,A[1]=Ot,A[2]=Yt,A[3]=St,C.clearBufferiv(C.COLOR,0,A))}else k|=C.COLOR_BUFFER_BIT}D&&(k|=C.DEPTH_BUFFER_BIT),G&&(k|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&C.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",xt,!1),n.removeEventListener("webglcontextrestored",Nt,!1),n.removeEventListener("webglcontextcreationerror",me,!1),Mt.dispose(),Dt.dispose(),Z.dispose(),_.dispose(),q.dispose(),_t.dispose(),et.dispose(),pt.dispose(),it.dispose(),X.dispose(),X.removeEventListener("sessionstart",xd),X.removeEventListener("sessionend",Md),gs.stop()};function xt(S){S.preventDefault(),Ud("WebGLRenderer: Context Lost."),W=!0}function Nt(){Ud("WebGLRenderer: Context Restored."),W=!1;const S=b.autoReset,D=vt.enabled,G=vt.autoUpdate,k=vt.needsUpdate,B=vt.type;J(),b.autoReset=S,vt.enabled=D,vt.autoUpdate=G,vt.needsUpdate=k,vt.type=B}function me(S){Qt("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function re(S){const D=S.target;D.removeEventListener("dispose",re),bi(D)}function bi(S){Ai(S),_.remove(S)}function Ai(S){const D=_.get(S).programs;D!==void 0&&(D.forEach(function(G){it.releaseProgram(G)}),S.isShaderMaterial&&it.releaseShaderCache(S))}this.renderBufferDirect=function(S,D,G,k,B,ot){D===null&&(D=ue);const ft=B.isMesh&&B.matrixWorld.determinant()<0,ct=s_(S,D,G,k,B);yt.setMaterial(k,ft);let St=G.index,Tt=1;if(k.wireframe===!0){if(St=Y.getWireframeAttribute(G),St===void 0)return;Tt=2}const Ot=G.drawRange,Yt=G.attributes.position;let Rt=Ot.start*Tt,oe=(Ot.start+Ot.count)*Tt;ot!==null&&(Rt=Math.max(Rt,ot.start*Tt),oe=Math.min(oe,(ot.start+ot.count)*Tt)),St!==null?(Rt=Math.max(Rt,0),oe=Math.min(oe,St.count)):Yt!=null&&(Rt=Math.max(Rt,0),oe=Math.min(oe,Yt.count));const Pe=oe-Rt;if(Pe<0||Pe===1/0)return;et.setup(B,k,ct,G,St);let Te,ce=Xt;if(St!==null&&(Te=j.get(St),ce=L,ce.setIndex(Te)),B.isMesh)k.wireframe===!0?(yt.setLineWidth(k.wireframeLinewidth*Ce()),ce.setMode(C.LINES)):ce.setMode(C.TRIANGLES);else if(B.isLine){let Qe=k.linewidth;Qe===void 0&&(Qe=1),yt.setLineWidth(Qe*Ce()),B.isLineSegments?ce.setMode(C.LINES):B.isLineLoop?ce.setMode(C.LINE_LOOP):ce.setMode(C.LINE_STRIP)}else B.isPoints?ce.setMode(C.POINTS):B.isSprite&&ce.setMode(C.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Qo("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ce.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(ne.get("WEBGL_multi_draw"))ce.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Qe=B._multiDrawStarts,Et=B._multiDrawCounts,vn=B._multiDrawCount,Jt=St?j.get(St).bytesPerElement:1,Wn=_.get(k).currentProgram.getUniforms();for(let ei=0;ei<vn;ei++)Wn.setValue(C,"_gl_DrawID",ei),ce.render(Qe[ei]/Jt,Et[ei])}else if(B.isInstancedMesh)ce.renderInstances(Rt,Pe,B.count);else if(G.isInstancedBufferGeometry){const Qe=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Et=Math.min(G.instanceCount,Qe);ce.renderInstances(Rt,Pe,Et)}else ce.render(Rt,Pe)};function vd(S,D,G){S.transparent===!0&&S.side===Li&&S.forceSinglePass===!1?(S.side=gn,S.needsUpdate=!0,$a(S,D,G),S.side=us,S.needsUpdate=!0,$a(S,D,G),S.side=Li):$a(S,D,G)}this.compile=function(S,D,G=null){G===null&&(G=S),T=Z.get(G),T.init(D),P.push(T),G.traverseVisible(function(B){B.isLight&&B.layers.test(D.layers)&&(T.pushLight(B),B.castShadow&&T.pushShadow(B))}),S!==G&&S.traverseVisible(function(B){B.isLight&&B.layers.test(D.layers)&&(T.pushLight(B),B.castShadow&&T.pushShadow(B))}),T.setupLights();const k=new Set;return S.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const ot=B.material;if(ot)if(Array.isArray(ot))for(let ft=0;ft<ot.length;ft++){const ct=ot[ft];vd(ct,G,B),k.add(ct)}else vd(ot,G,B),k.add(ot)}),T=P.pop(),k},this.compileAsync=function(S,D,G=null){const k=this.compile(S,D,G);return new Promise(B=>{function ot(){if(k.forEach(function(ft){_.get(ft).currentProgram.isReady()&&k.delete(ft)}),k.size===0){B(S);return}setTimeout(ot,10)}ne.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let Xc=null;function i_(S){Xc&&Xc(S)}function xd(){gs.stop()}function Md(){gs.start()}const gs=new Pm;gs.setAnimationLoop(i_),typeof self<"u"&&gs.setContext(self),this.setAnimationLoop=function(S){Xc=S,X.setAnimationLoop(S),S===null?gs.stop():gs.start()},X.addEventListener("sessionstart",xd),X.addEventListener("sessionend",Md),this.render=function(S,D){if(D!==void 0&&D.isCamera!==!0){Qt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(W===!0)return;const G=X.enabled===!0&&X.isPresenting===!0,k=x!==null&&(F===null||G)&&x.begin(v,F);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),X.enabled===!0&&X.isPresenting===!0&&(x===null||x.isCompositing()===!1)&&(X.cameraAutoUpdate===!0&&X.updateCamera(D),D=X.getCamera()),S.isScene===!0&&S.onBeforeRender(v,S,D,F),T=Z.get(S,P.length),T.init(D),P.push(T),We.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Bt.setFromProjectionMatrix(We,hi,D.reversedDepth),Ft=this.localClippingEnabled,It=tt.init(this.clippingPlanes,Ft),E=Dt.get(S,R.length),E.init(),R.push(E),X.enabled===!0&&X.isPresenting===!0){const ft=v.xr.getDepthSensingMesh();ft!==null&&Yc(ft,D,-1/0,v.sortObjects)}Yc(S,D,0,v.sortObjects),E.finish(),v.sortObjects===!0&&E.sort(_e,ge),Wt=X.enabled===!1||X.isPresenting===!1||X.hasDepthSensing()===!1,Wt&&Mt.addToRenderList(E,S),this.info.render.frame++,It===!0&&tt.beginShadows();const B=T.state.shadowsArray;if(vt.render(B,S,D),It===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(k&&x.hasRenderPass())===!1){const ft=E.opaque,ct=E.transmissive;if(T.setupLights(),D.isArrayCamera){const St=D.cameras;if(ct.length>0)for(let Tt=0,Ot=St.length;Tt<Ot;Tt++){const Yt=St[Tt];yd(ft,ct,S,Yt)}Wt&&Mt.render(S);for(let Tt=0,Ot=St.length;Tt<Ot;Tt++){const Yt=St[Tt];Sd(E,S,Yt,Yt.viewport)}}else ct.length>0&&yd(ft,ct,S,D),Wt&&Mt.render(S),Sd(E,S,D)}F!==null&&U===0&&(I.updateMultisampleRenderTarget(F),I.updateRenderTargetMipmap(F)),k&&x.end(v),S.isScene===!0&&S.onAfterRender(v,S,D),et.resetDefaultState(),V=-1,z=null,P.pop(),P.length>0?(T=P[P.length-1],It===!0&&tt.setGlobalState(v.clippingPlanes,T.state.camera)):T=null,R.pop(),R.length>0?E=R[R.length-1]:E=null};function Yc(S,D,G,k){if(S.visible===!1)return;if(S.layers.test(D.layers)){if(S.isGroup)G=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(D);else if(S.isLight)T.pushLight(S),S.castShadow&&T.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Bt.intersectsSprite(S)){k&&se.setFromMatrixPosition(S.matrixWorld).applyMatrix4(We);const ft=_t.update(S),ct=S.material;ct.visible&&E.push(S,ft,ct,G,se.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Bt.intersectsObject(S))){const ft=_t.update(S),ct=S.material;if(k&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),se.copy(S.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),se.copy(ft.boundingSphere.center)),se.applyMatrix4(S.matrixWorld).applyMatrix4(We)),Array.isArray(ct)){const St=ft.groups;for(let Tt=0,Ot=St.length;Tt<Ot;Tt++){const Yt=St[Tt],Rt=ct[Yt.materialIndex];Rt&&Rt.visible&&E.push(S,ft,Rt,G,se.z,Yt)}}else ct.visible&&E.push(S,ft,ct,G,se.z,null)}}const ot=S.children;for(let ft=0,ct=ot.length;ft<ct;ft++)Yc(ot[ft],D,G,k)}function Sd(S,D,G,k){const{opaque:B,transmissive:ot,transparent:ft}=S;T.setupLightsView(G),It===!0&&tt.setGlobalState(v.clippingPlanes,G),k&&yt.viewport(H.copy(k)),B.length>0&&qa(B,D,G),ot.length>0&&qa(ot,D,G),ft.length>0&&qa(ft,D,G),yt.buffers.depth.setTest(!0),yt.buffers.depth.setMask(!0),yt.buffers.color.setMask(!0),yt.setPolygonOffset(!1)}function yd(S,D,G,k){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[k.id]===void 0){const Rt=ne.has("EXT_color_buffer_half_float")||ne.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[k.id]=new fi(1,1,{generateMipmaps:!0,type:Rt?Bi:kn,minFilter:Ds,samples:Math.max(4,pe.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace})}const ot=T.state.transmissionRenderTarget[k.id],ft=k.viewport||H;ot.setSize(ft.z*v.transmissionResolutionScale,ft.w*v.transmissionResolutionScale);const ct=v.getRenderTarget(),St=v.getActiveCubeFace(),Tt=v.getActiveMipmapLevel();v.setRenderTarget(ot),v.getClearColor(K),lt=v.getClearAlpha(),lt<1&&v.setClearColor(16777215,.5),v.clear(),Wt&&Mt.render(G);const Ot=v.toneMapping;v.toneMapping=di;const Yt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),T.setupLightsView(k),It===!0&&tt.setGlobalState(v.clippingPlanes,k),qa(S,G,k),I.updateMultisampleRenderTarget(ot),I.updateRenderTargetMipmap(ot),ne.has("WEBGL_multisampled_render_to_texture")===!1){let Rt=!1;for(let oe=0,Pe=D.length;oe<Pe;oe++){const Te=D[oe],{object:ce,geometry:Qe,material:Et,group:vn}=Te;if(Et.side===Li&&ce.layers.test(k.layers)){const Jt=Et.side;Et.side=gn,Et.needsUpdate=!0,Ed(ce,G,k,Qe,Et,vn),Et.side=Jt,Et.needsUpdate=!0,Rt=!0}}Rt===!0&&(I.updateMultisampleRenderTarget(ot),I.updateRenderTargetMipmap(ot))}v.setRenderTarget(ct,St,Tt),v.setClearColor(K,lt),Yt!==void 0&&(k.viewport=Yt),v.toneMapping=Ot}function qa(S,D,G){const k=D.isScene===!0?D.overrideMaterial:null;for(let B=0,ot=S.length;B<ot;B++){const ft=S[B],{object:ct,geometry:St,group:Tt}=ft;let Ot=ft.material;Ot.allowOverride===!0&&k!==null&&(Ot=k),ct.layers.test(G.layers)&&Ed(ct,D,G,St,Ot,Tt)}}function Ed(S,D,G,k,B,ot){S.onBeforeRender(v,D,G,k,B,ot),S.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),B.onBeforeRender(v,D,G,k,S,ot),B.transparent===!0&&B.side===Li&&B.forceSinglePass===!1?(B.side=gn,B.needsUpdate=!0,v.renderBufferDirect(G,D,k,B,S,ot),B.side=us,B.needsUpdate=!0,v.renderBufferDirect(G,D,k,B,S,ot),B.side=Li):v.renderBufferDirect(G,D,k,B,S,ot),S.onAfterRender(v,D,G,k,B,ot)}function $a(S,D,G){D.isScene!==!0&&(D=ue);const k=_.get(S),B=T.state.lights,ot=T.state.shadowsArray,ft=B.state.version,ct=it.getParameters(S,B.state,ot,D,G),St=it.getProgramCacheKey(ct);let Tt=k.programs;k.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?D.environment:null,k.fog=D.fog;const Ot=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;k.envMap=q.get(S.envMap||k.environment,Ot),k.envMapRotation=k.environment!==null&&S.envMap===null?D.environmentRotation:S.envMapRotation,Tt===void 0&&(S.addEventListener("dispose",re),Tt=new Map,k.programs=Tt);let Yt=Tt.get(St);if(Yt!==void 0){if(k.currentProgram===Yt&&k.lightsStateVersion===ft)return Ad(S,ct),Yt}else ct.uniforms=it.getUniforms(S),S.onBeforeCompile(ct,v),Yt=it.acquireProgram(ct,St),Tt.set(St,Yt),k.uniforms=ct.uniforms;const Rt=k.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Rt.clippingPlanes=tt.uniform),Ad(S,ct),k.needsLights=a_(S),k.lightsStateVersion=ft,k.needsLights&&(Rt.ambientLightColor.value=B.state.ambient,Rt.lightProbe.value=B.state.probe,Rt.directionalLights.value=B.state.directional,Rt.directionalLightShadows.value=B.state.directionalShadow,Rt.spotLights.value=B.state.spot,Rt.spotLightShadows.value=B.state.spotShadow,Rt.rectAreaLights.value=B.state.rectArea,Rt.ltc_1.value=B.state.rectAreaLTC1,Rt.ltc_2.value=B.state.rectAreaLTC2,Rt.pointLights.value=B.state.point,Rt.pointLightShadows.value=B.state.pointShadow,Rt.hemisphereLights.value=B.state.hemi,Rt.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Rt.spotLightMatrix.value=B.state.spotLightMatrix,Rt.spotLightMap.value=B.state.spotLightMap,Rt.pointShadowMatrix.value=B.state.pointShadowMatrix),k.currentProgram=Yt,k.uniformsList=null,Yt}function bd(S){if(S.uniformsList===null){const D=S.currentProgram.getUniforms();S.uniformsList=Bo.seqWithValue(D.seq,S.uniforms)}return S.uniformsList}function Ad(S,D){const G=_.get(S);G.outputColorSpace=D.outputColorSpace,G.batching=D.batching,G.batchingColor=D.batchingColor,G.instancing=D.instancing,G.instancingColor=D.instancingColor,G.instancingMorph=D.instancingMorph,G.skinning=D.skinning,G.morphTargets=D.morphTargets,G.morphNormals=D.morphNormals,G.morphColors=D.morphColors,G.morphTargetsCount=D.morphTargetsCount,G.numClippingPlanes=D.numClippingPlanes,G.numIntersection=D.numClipIntersection,G.vertexAlphas=D.vertexAlphas,G.vertexTangents=D.vertexTangents,G.toneMapping=D.toneMapping}function s_(S,D,G,k,B){D.isScene!==!0&&(D=ue),I.resetTextureUnits();const ot=D.fog,ft=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?D.environment:null,ct=F===null?v.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:Cr,St=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Tt=q.get(k.envMap||ft,St),Ot=k.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Yt=!!G.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Rt=!!G.morphAttributes.position,oe=!!G.morphAttributes.normal,Pe=!!G.morphAttributes.color;let Te=di;k.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(Te=v.toneMapping);const ce=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Qe=ce!==void 0?ce.length:0,Et=_.get(k),vn=T.state.lights;if(It===!0&&(Ft===!0||S!==z)){const Xe=S===z&&k.id===V;tt.setState(k,S,Xe)}let Jt=!1;k.version===Et.__version?(Et.needsLights&&Et.lightsStateVersion!==vn.state.version||Et.outputColorSpace!==ct||B.isBatchedMesh&&Et.batching===!1||!B.isBatchedMesh&&Et.batching===!0||B.isBatchedMesh&&Et.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Et.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Et.instancing===!1||!B.isInstancedMesh&&Et.instancing===!0||B.isSkinnedMesh&&Et.skinning===!1||!B.isSkinnedMesh&&Et.skinning===!0||B.isInstancedMesh&&Et.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Et.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Et.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Et.instancingMorph===!1&&B.morphTexture!==null||Et.envMap!==Tt||k.fog===!0&&Et.fog!==ot||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==tt.numPlanes||Et.numIntersection!==tt.numIntersection)||Et.vertexAlphas!==Ot||Et.vertexTangents!==Yt||Et.morphTargets!==Rt||Et.morphNormals!==oe||Et.morphColors!==Pe||Et.toneMapping!==Te||Et.morphTargetsCount!==Qe)&&(Jt=!0):(Jt=!0,Et.__version=k.version);let Wn=Et.currentProgram;Jt===!0&&(Wn=$a(k,D,B));let ei=!1,_s=!1,Zs=!1;const de=Wn.getUniforms(),Ke=Et.uniforms;if(yt.useProgram(Wn.program)&&(ei=!0,_s=!0,Zs=!0),k.id!==V&&(V=k.id,_s=!0),ei||z!==S){yt.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),de.setValue(C,"projectionMatrix",S.projectionMatrix),de.setValue(C,"viewMatrix",S.matrixWorldInverse);const $i=de.map.cameraPosition;$i!==void 0&&$i.setValue(C,jt.setFromMatrixPosition(S.matrixWorld)),pe.logarithmicDepthBuffer&&de.setValue(C,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&de.setValue(C,"isOrthographic",S.isOrthographicCamera===!0),z!==S&&(z=S,_s=!0,Zs=!0)}if(Et.needsLights&&(vn.state.directionalShadowMap.length>0&&de.setValue(C,"directionalShadowMap",vn.state.directionalShadowMap,I),vn.state.spotShadowMap.length>0&&de.setValue(C,"spotShadowMap",vn.state.spotShadowMap,I),vn.state.pointShadowMap.length>0&&de.setValue(C,"pointShadowMap",vn.state.pointShadowMap,I)),B.isSkinnedMesh){de.setOptional(C,B,"bindMatrix"),de.setOptional(C,B,"bindMatrixInverse");const Xe=B.skeleton;Xe&&(Xe.boneTexture===null&&Xe.computeBoneTexture(),de.setValue(C,"boneTexture",Xe.boneTexture,I))}B.isBatchedMesh&&(de.setOptional(C,B,"batchingTexture"),de.setValue(C,"batchingTexture",B._matricesTexture,I),de.setOptional(C,B,"batchingIdTexture"),de.setValue(C,"batchingIdTexture",B._indirectTexture,I),de.setOptional(C,B,"batchingColorTexture"),B._colorsTexture!==null&&de.setValue(C,"batchingColorTexture",B._colorsTexture,I));const qi=G.morphAttributes;if((qi.position!==void 0||qi.normal!==void 0||qi.color!==void 0)&&ht.update(B,G,Wn),(_s||Et.receiveShadow!==B.receiveShadow)&&(Et.receiveShadow=B.receiveShadow,de.setValue(C,"receiveShadow",B.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&D.environment!==null&&(Ke.envMapIntensity.value=D.environmentIntensity),Ke.dfgLUT!==void 0&&(Ke.dfgLUT.value=bM()),_s&&(de.setValue(C,"toneMappingExposure",v.toneMappingExposure),Et.needsLights&&r_(Ke,Zs),ot&&k.fog===!0&&Pt.refreshFogUniforms(Ke,ot),Pt.refreshMaterialUniforms(Ke,k,Gt,dt,T.state.transmissionRenderTarget[S.id]),Bo.upload(C,bd(Et),Ke,I)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Bo.upload(C,bd(Et),Ke,I),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&de.setValue(C,"center",B.center),de.setValue(C,"modelViewMatrix",B.modelViewMatrix),de.setValue(C,"normalMatrix",B.normalMatrix),de.setValue(C,"modelMatrix",B.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const Xe=k.uniformsGroups;for(let $i=0,Js=Xe.length;$i<Js;$i++){const Td=Xe[$i];pt.update(Td,Wn),pt.bind(Td,Wn)}}return Wn}function r_(S,D){S.ambientLightColor.needsUpdate=D,S.lightProbe.needsUpdate=D,S.directionalLights.needsUpdate=D,S.directionalLightShadows.needsUpdate=D,S.pointLights.needsUpdate=D,S.pointLightShadows.needsUpdate=D,S.spotLights.needsUpdate=D,S.spotLightShadows.needsUpdate=D,S.rectAreaLights.needsUpdate=D,S.hemisphereLights.needsUpdate=D}function a_(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(S,D,G){const k=_.get(S);k.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),_.get(S.texture).__webglTexture=D,_.get(S.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:G,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,D){const G=_.get(S);G.__webglFramebuffer=D,G.__useDefaultFramebuffer=D===void 0};const o_=C.createFramebuffer();this.setRenderTarget=function(S,D=0,G=0){F=S,w=D,U=G;let k=null,B=!1,ot=!1;if(S){const ct=_.get(S);if(ct.__useDefaultFramebuffer!==void 0){yt.bindFramebuffer(C.FRAMEBUFFER,ct.__webglFramebuffer),H.copy(S.viewport),N.copy(S.scissor),Q=S.scissorTest,yt.viewport(H),yt.scissor(N),yt.setScissorTest(Q),V=-1;return}else if(ct.__webglFramebuffer===void 0)I.setupRenderTarget(S);else if(ct.__hasExternalTextures)I.rebindTextures(S,_.get(S.texture).__webglTexture,_.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Ot=S.depthTexture;if(ct.__boundDepthTexture!==Ot){if(Ot!==null&&_.has(Ot)&&(S.width!==Ot.image.width||S.height!==Ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(S)}}const St=S.texture;(St.isData3DTexture||St.isDataArrayTexture||St.isCompressedArrayTexture)&&(ot=!0);const Tt=_.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Tt[D])?k=Tt[D][G]:k=Tt[D],B=!0):S.samples>0&&I.useMultisampledRTT(S)===!1?k=_.get(S).__webglMultisampledFramebuffer:Array.isArray(Tt)?k=Tt[G]:k=Tt,H.copy(S.viewport),N.copy(S.scissor),Q=S.scissorTest}else H.copy($).multiplyScalar(Gt).floor(),N.copy(nt).multiplyScalar(Gt).floor(),Q=rt;if(G!==0&&(k=o_),yt.bindFramebuffer(C.FRAMEBUFFER,k)&&yt.drawBuffers(S,k),yt.viewport(H),yt.scissor(N),yt.setScissorTest(Q),B){const ct=_.get(S.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+D,ct.__webglTexture,G)}else if(ot){const ct=D;for(let St=0;St<S.textures.length;St++){const Tt=_.get(S.textures[St]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+St,Tt.__webglTexture,G,ct)}}else if(S!==null&&G!==0){const ct=_.get(S.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,ct.__webglTexture,G)}V=-1},this.readRenderTargetPixels=function(S,D,G,k,B,ot,ft,ct=0){if(!(S&&S.isWebGLRenderTarget)){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=_.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ft!==void 0&&(St=St[ft]),St){yt.bindFramebuffer(C.FRAMEBUFFER,St);try{const Tt=S.textures[ct],Ot=Tt.format,Yt=Tt.type;if(S.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+ct),!pe.textureFormatReadable(Ot)){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!pe.textureTypeReadable(Yt)){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=S.width-k&&G>=0&&G<=S.height-B&&C.readPixels(D,G,k,B,st.convert(Ot),st.convert(Yt),ot)}finally{const Tt=F!==null?_.get(F).__webglFramebuffer:null;yt.bindFramebuffer(C.FRAMEBUFFER,Tt)}}},this.readRenderTargetPixelsAsync=async function(S,D,G,k,B,ot,ft,ct=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let St=_.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&ft!==void 0&&(St=St[ft]),St)if(D>=0&&D<=S.width-k&&G>=0&&G<=S.height-B){yt.bindFramebuffer(C.FRAMEBUFFER,St);const Tt=S.textures[ct],Ot=Tt.format,Yt=Tt.type;if(S.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+ct),!pe.textureFormatReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!pe.textureTypeReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Rt=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Rt),C.bufferData(C.PIXEL_PACK_BUFFER,ot.byteLength,C.STREAM_READ),C.readPixels(D,G,k,B,st.convert(Ot),st.convert(Yt),0);const oe=F!==null?_.get(F).__webglFramebuffer:null;yt.bindFramebuffer(C.FRAMEBUFFER,oe);const Pe=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await q_(C,Pe,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Rt),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,ot),C.deleteBuffer(Rt),C.deleteSync(Pe),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,D=null,G=0){const k=Math.pow(2,-G),B=Math.floor(S.image.width*k),ot=Math.floor(S.image.height*k),ft=D!==null?D.x:0,ct=D!==null?D.y:0;I.setTexture2D(S,0),C.copyTexSubImage2D(C.TEXTURE_2D,G,0,0,ft,ct,B,ot),yt.unbindTexture()};const c_=C.createFramebuffer(),l_=C.createFramebuffer();this.copyTextureToTexture=function(S,D,G=null,k=null,B=0,ot=0){let ft,ct,St,Tt,Ot,Yt,Rt,oe,Pe;const Te=S.isCompressedTexture?S.mipmaps[ot]:S.image;if(G!==null)ft=G.max.x-G.min.x,ct=G.max.y-G.min.y,St=G.isBox3?G.max.z-G.min.z:1,Tt=G.min.x,Ot=G.min.y,Yt=G.isBox3?G.min.z:0;else{const Ke=Math.pow(2,-B);ft=Math.floor(Te.width*Ke),ct=Math.floor(Te.height*Ke),S.isDataArrayTexture?St=Te.depth:S.isData3DTexture?St=Math.floor(Te.depth*Ke):St=1,Tt=0,Ot=0,Yt=0}k!==null?(Rt=k.x,oe=k.y,Pe=k.z):(Rt=0,oe=0,Pe=0);const ce=st.convert(D.format),Qe=st.convert(D.type);let Et;D.isData3DTexture?(I.setTexture3D(D,0),Et=C.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(I.setTexture2DArray(D,0),Et=C.TEXTURE_2D_ARRAY):(I.setTexture2D(D,0),Et=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,D.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,D.unpackAlignment);const vn=C.getParameter(C.UNPACK_ROW_LENGTH),Jt=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Wn=C.getParameter(C.UNPACK_SKIP_PIXELS),ei=C.getParameter(C.UNPACK_SKIP_ROWS),_s=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,Te.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Te.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Tt),C.pixelStorei(C.UNPACK_SKIP_ROWS,Ot),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Yt);const Zs=S.isDataArrayTexture||S.isData3DTexture,de=D.isDataArrayTexture||D.isData3DTexture;if(S.isDepthTexture){const Ke=_.get(S),qi=_.get(D),Xe=_.get(Ke.__renderTarget),$i=_.get(qi.__renderTarget);yt.bindFramebuffer(C.READ_FRAMEBUFFER,Xe.__webglFramebuffer),yt.bindFramebuffer(C.DRAW_FRAMEBUFFER,$i.__webglFramebuffer);for(let Js=0;Js<St;Js++)Zs&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,_.get(S).__webglTexture,B,Yt+Js),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,_.get(D).__webglTexture,ot,Pe+Js)),C.blitFramebuffer(Tt,Ot,ft,ct,Rt,oe,ft,ct,C.DEPTH_BUFFER_BIT,C.NEAREST);yt.bindFramebuffer(C.READ_FRAMEBUFFER,null),yt.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(B!==0||S.isRenderTargetTexture||_.has(S)){const Ke=_.get(S),qi=_.get(D);yt.bindFramebuffer(C.READ_FRAMEBUFFER,c_),yt.bindFramebuffer(C.DRAW_FRAMEBUFFER,l_);for(let Xe=0;Xe<St;Xe++)Zs?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Ke.__webglTexture,B,Yt+Xe):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Ke.__webglTexture,B),de?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,qi.__webglTexture,ot,Pe+Xe):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,qi.__webglTexture,ot),B!==0?C.blitFramebuffer(Tt,Ot,ft,ct,Rt,oe,ft,ct,C.COLOR_BUFFER_BIT,C.NEAREST):de?C.copyTexSubImage3D(Et,ot,Rt,oe,Pe+Xe,Tt,Ot,ft,ct):C.copyTexSubImage2D(Et,ot,Rt,oe,Tt,Ot,ft,ct);yt.bindFramebuffer(C.READ_FRAMEBUFFER,null),yt.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else de?S.isDataTexture||S.isData3DTexture?C.texSubImage3D(Et,ot,Rt,oe,Pe,ft,ct,St,ce,Qe,Te.data):D.isCompressedArrayTexture?C.compressedTexSubImage3D(Et,ot,Rt,oe,Pe,ft,ct,St,ce,Te.data):C.texSubImage3D(Et,ot,Rt,oe,Pe,ft,ct,St,ce,Qe,Te):S.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,ot,Rt,oe,ft,ct,ce,Qe,Te.data):S.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,ot,Rt,oe,Te.width,Te.height,ce,Te.data):C.texSubImage2D(C.TEXTURE_2D,ot,Rt,oe,ft,ct,ce,Qe,Te);C.pixelStorei(C.UNPACK_ROW_LENGTH,vn),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Jt),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Wn),C.pixelStorei(C.UNPACK_SKIP_ROWS,ei),C.pixelStorei(C.UNPACK_SKIP_IMAGES,_s),ot===0&&D.generateMipmaps&&C.generateMipmap(Et),yt.unbindTexture()},this.initRenderTarget=function(S){_.get(S).__webglFramebuffer===void 0&&I.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?I.setTextureCube(S,0):S.isData3DTexture?I.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?I.setTexture2DArray(S,0):I.setTexture2D(S,0),yt.unbindTexture()},this.resetState=function(){w=0,U=0,F=null,yt.reset(),et.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=Kt._getDrawingBufferColorSpace(t),n.unpackColorSpace=Kt._getUnpackColorSpace()}}class TM{constructor(){kt(this,"_listeners",new Map)}on(t,n){return this._listeners.has(t)||this._listeners.set(t,new Set),this._listeners.get(t).add(n),this}off(t,n){var i;return(i=this._listeners.get(t))==null||i.delete(n),this}emit(t,n){var i;(i=this._listeners.get(t))==null||i.forEach(s=>s(n))}removeAllListeners(t){return t?this._listeners.delete(t):this._listeners.clear(),this}}var Ir=typeof self<"u"?self:{};function Nm(e,t){t:{for(var n=["CLOSURE_FLAGS"],i=Ir,s=0;s<n.length;s++)if((i=i[n[s]])==null){n=null;break t}n=i}return(e=n&&n[e])!=null?e:t}function bs(){throw Error("Invalid UTF8")}function Rf(e,t){return t=String.fromCharCode.apply(null,t),e==null?t:e+t}let yo,wl;const wM=typeof TextDecoder<"u";let RM;const CM=typeof TextEncoder<"u";function Om(e){if(CM)e=(RM||(RM=new TextEncoder)).encode(e);else{let n=0;const i=new Uint8Array(3*e.length);for(let s=0;s<e.length;s++){var t=e.charCodeAt(s);if(t<128)i[n++]=t;else{if(t<2048)i[n++]=t>>6|192;else{if(t>=55296&&t<=57343){if(t<=56319&&s<e.length){const r=e.charCodeAt(++s);if(r>=56320&&r<=57343){t=1024*(t-55296)+r-56320+65536,i[n++]=t>>18|240,i[n++]=t>>12&63|128,i[n++]=t>>6&63|128,i[n++]=63&t|128;continue}s--}t=65533}i[n++]=t>>12|224,i[n++]=t>>6&63|128}i[n++]=63&t|128}}e=n===i.length?i:i.subarray(0,n)}return e}function Bm(e){Ir.setTimeout(()=>{throw e},0)}var Fh,PM=Nm(610401301,!1),Cf=Nm(748402147,!0);function Pf(){var e=Ir.navigator;return e&&(e=e.userAgent)?e:""}const Lf=Ir.navigator;function _c(e){return _c[" "](e),e}Fh=Lf&&Lf.userAgentData||null,_c[" "]=function(){};const km={};let Ma=null;function LM(e){const t=e.length;let n=3*t/4;n%3?n=Math.floor(n):"=.".indexOf(e[t-1])!=-1&&(n="=.".indexOf(e[t-2])!=-1?n-2:n-1);const i=new Uint8Array(n);let s=0;return function(r,a){function o(l){for(;c<r.length;){const u=r.charAt(c++),d=Ma[u];if(d!=null)return d;if(!/^[\s\xa0]*$/.test(u))throw Error("Unknown base64 encoding at char: "+u)}return l}zm();let c=0;for(;;){const l=o(-1),u=o(0),d=o(64),h=o(64);if(h===64&&l===-1)break;a(l<<2|u>>4),d!=64&&(a(u<<4&240|d>>2),h!=64&&a(d<<6&192|h))}}(e,function(r){i[s++]=r}),s!==n?i.subarray(0,s):i}function zm(){if(!Ma){Ma={};var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),t=["+/=","+/","-_=","-_.","-_"];for(let n=0;n<5;n++){const i=e.concat(t[n].split(""));km[n]=i;for(let s=0;s<i.length;s++){const r=i[s];Ma[r]===void 0&&(Ma[r]=s)}}}}var IM=typeof Uint8Array<"u",Vm=!(!(PM&&Fh&&Fh.brands.length>0)&&(Pf().indexOf("Trident")!=-1||Pf().indexOf("MSIE")!=-1))&&typeof btoa=="function";const If=/[-_.]/g,DM={"-":"+",_:"/",".":"="};function UM(e){return DM[e]||""}function Gm(e){if(!Vm)return LM(e);e=If.test(e)?e.replace(If,UM):e,e=atob(e);const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}function mu(e){return IM&&e!=null&&e instanceof Uint8Array}var Dr={};function Xs(){return FM||(FM=new pi(null,Dr))}function gu(e){Hm(Dr);var t=e.g;return(t=t==null||mu(t)?t:typeof t=="string"?Gm(t):null)==null?t:e.g=t}var pi=class{h(){return new Uint8Array(gu(this)||0)}constructor(e,t){if(Hm(t),this.g=e,e!=null&&e.length===0)throw Error("ByteString should be constructed with non-empty values")}};let FM,NM;function Hm(e){if(e!==Dr)throw Error("illegal external caller")}function Wm(e,t){e.__closure__error__context__984382||(e.__closure__error__context__984382={}),e.__closure__error__context__984382.severity=t}function Nh(e){return Wm(e=Error(e),"warning"),e}function Ur(e,t){if(e!=null){var n=NM??(NM={}),i=n[e]||0;i>=t||(n[e]=i+1,Wm(e=Error(),"incident"),Bm(e))}}function jr(){return typeof BigInt=="function"}var Kr=typeof Symbol=="function"&&typeof Symbol()=="symbol";function xi(e,t,n=!1){return typeof Symbol=="function"&&typeof Symbol()=="symbol"?n&&Symbol.for&&e?Symbol.for(e):e!=null?Symbol(e):Symbol():t}var OM=xi("jas",void 0,!0),Df=xi(void 0,"0di"),ga=xi(void 0,"1oa"),bn=xi(void 0,Symbol()),BM=xi(void 0,"0ub"),kM=xi(void 0,"0ubs"),Oh=xi(void 0,"0ubsb"),zM=xi(void 0,"0actk"),Fr=xi("m_m","Pa",!0),Uf=xi();const Xm={Ga:{value:0,configurable:!0,writable:!0,enumerable:!1}},Ym=Object.defineProperties,bt=Kr?OM:"Ga";var $s;const Ff=[];function Ba(e,t){Kr||bt in e||Ym(e,Xm),e[bt]|=t}function He(e,t){Kr||bt in e||Ym(e,Xm),e[bt]=t}function ka(e){return Ba(e,34),e}function Ca(e){return Ba(e,8192),e}He(Ff,7),$s=Object.freeze(Ff);var Nr={};function wn(e,t){return t===void 0?e.h!==Ys&&!!(2&(0|e.v[bt])):!!(2&t)&&e.h!==Ys}const Ys={};function _u(e,t){if(e!=null){if(typeof e=="string")e=e?new pi(e,Dr):Xs();else if(e.constructor!==pi)if(mu(e))e=e.length?new pi(new Uint8Array(e),Dr):Xs();else{if(!t)throw Error();e=void 0}}return e}class Nf{constructor(t,n,i){this.g=t,this.h=n,this.l=i}next(){const t=this.g.next();return t.done||(t.value=this.h.call(this.l,t.value)),t}[Symbol.iterator](){return this}}var VM=Object.freeze({});function qm(e,t,n){const i=128&t?0:-1,s=e.length;var r;(r=!!s)&&(r=(r=e[s-1])!=null&&typeof r=="object"&&r.constructor===Object);const a=s+(r?-1:0);for(t=128&t?1:0;t<a;t++)n(t-i,e[t]);if(r){e=e[s-1];for(const o in e)!isNaN(o)&&n(+o,e[o])}}var $m={};function Zr(e){return 128&e?$m:void 0}function vc(e){return e.Na=!0,e}var GM=vc(e=>typeof e=="number"),Of=vc(e=>typeof e=="string"),HM=vc(e=>typeof e=="boolean"),xc=typeof Ir.BigInt=="function"&&typeof Ir.BigInt(0)=="bigint";function An(e){var t=e;if(Of(t)){if(!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(t))throw Error(String(t))}else if(GM(t)&&!Number.isSafeInteger(t))throw Error(String(t));return xc?BigInt(e):e=HM(e)?e?"1":"0":Of(e)?e.trim()||"0":String(e)}var Bh=vc(e=>xc?e>=XM&&e<=qM:e[0]==="-"?Bf(e,WM):Bf(e,YM));const WM=Number.MIN_SAFE_INTEGER.toString(),XM=xc?BigInt(Number.MIN_SAFE_INTEGER):void 0,YM=Number.MAX_SAFE_INTEGER.toString(),qM=xc?BigInt(Number.MAX_SAFE_INTEGER):void 0;function Bf(e,t){if(e.length>t.length)return!1;if(e.length<t.length||e===t)return!0;for(let n=0;n<e.length;n++){const i=e[n],s=t[n];if(i>s)return!1;if(i<s)return!0}}const $M=typeof Uint8Array.prototype.slice=="function";let jM,ye=0,Fe=0;function kf(e){const t=e>>>0;ye=t,Fe=(e-t)/4294967296>>>0}function Or(e){if(e<0){kf(-e);const[t,n]=Mu(ye,Fe);ye=t>>>0,Fe=n>>>0}else kf(e)}function vu(e){const t=jM||(jM=new DataView(new ArrayBuffer(8)));t.setFloat32(0,+e,!0),Fe=0,ye=t.getUint32(0,!0)}function jm(e,t){const n=4294967296*t+(e>>>0);return Number.isSafeInteger(n)?n:Pa(e,t)}function KM(e,t){return An(jr()?BigInt.asUintN(64,(BigInt(t>>>0)<<BigInt(32))+BigInt(e>>>0)):Pa(e,t))}function Km(e,t){return jr()?An(BigInt.asIntN(64,(BigInt.asUintN(32,BigInt(t))<<BigInt(32))+BigInt.asUintN(32,BigInt(e)))):An(xu(e,t))}function Pa(e,t){if(e>>>=0,(t>>>=0)<=2097151)var n=""+(4294967296*t+e);else jr()?n=""+(BigInt(t)<<BigInt(32)|BigInt(e)):(e=(16777215&e)+6777216*(n=16777215&(e>>>24|t<<8))+6710656*(t=t>>16&65535),n+=8147497*t,t*=2,e>=1e7&&(n+=e/1e7>>>0,e%=1e7),n>=1e7&&(t+=n/1e7>>>0,n%=1e7),n=t+zf(n)+zf(e));return n}function zf(e){return e=String(e),"0000000".slice(e.length)+e}function xu(e,t){if(2147483648&t)if(jr())e=""+(BigInt(0|t)<<BigInt(32)|BigInt(e>>>0));else{const[n,i]=Mu(e,t);e="-"+Pa(n,i)}else e=Pa(e,t);return e}function Mc(e){if(e.length<16)Or(Number(e));else if(jr())e=BigInt(e),ye=Number(e&BigInt(4294967295))>>>0,Fe=Number(e>>BigInt(32)&BigInt(4294967295));else{const t=+(e[0]==="-");Fe=ye=0;const n=e.length;for(let i=t,s=(n-t)%6+t;s<=n;i=s,s+=6){const r=Number(e.slice(i,s));Fe*=1e6,ye=1e6*ye+r,ye>=4294967296&&(Fe+=Math.trunc(ye/4294967296),Fe>>>=0,ye>>>=0)}if(t){const[i,s]=Mu(ye,Fe);ye=i,Fe=s}}}function Mu(e,t){return t=~t,e?e=1+~e:t+=1,[e,t]}function Kn(e){return Array.prototype.slice.call(e)}const za=typeof BigInt=="function"?BigInt.asIntN:void 0,ZM=typeof BigInt=="function"?BigInt.asUintN:void 0,qs=Number.isSafeInteger,Sc=Number.isFinite,Br=Math.trunc,JM=An(0);function Sa(e){if(e!=null&&typeof e!="number")throw Error(`Value of float/double field must be a number, found ${typeof e}: ${e}`);return e}function ui(e){return e==null||typeof e=="number"?e:e==="NaN"||e==="Infinity"||e==="-Infinity"?Number(e):void 0}function La(e){if(e!=null&&typeof e!="boolean"){var t=typeof e;throw Error(`Expected boolean but got ${t!="object"?t:e?Array.isArray(e)?"array":t:"null"}: ${e}`)}return e}function Zm(e){return e==null||typeof e=="boolean"?e:typeof e=="number"?!!e:void 0}const QM=/^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;function Va(e){switch(typeof e){case"bigint":return!0;case"number":return Sc(e);case"string":return QM.test(e);default:return!1}}function Jr(e){if(e==null)return e;if(typeof e=="string"&&e)e=+e;else if(typeof e!="number")return;return Sc(e)?0|e:void 0}function Jm(e){if(e==null)return e;if(typeof e=="string"&&e)e=+e;else if(typeof e!="number")return;return Sc(e)?e>>>0:void 0}function Qm(e){const t=e.length;return(e[0]==="-"?t<20||t===20&&e<="-9223372036854775808":t<19||t===19&&e<="9223372036854775807")?e:(Mc(e),xu(ye,Fe))}function Su(e){if(e=Br(e),!qs(e)){Or(e);var t=ye,n=Fe;(e=2147483648&n)&&(n=~n>>>0,(t=1+~t>>>0)==0&&(n=n+1>>>0)),e=typeof(t=jm(t,n))=="number"?e?-t:t:e?"-"+t:t}return e}function t0(e){var t=Br(Number(e));return qs(t)?String(t):((t=e.indexOf("."))!==-1&&(e=e.substring(0,t)),Qm(e))}function e0(e){var t=Br(Number(e));return qs(t)?An(t):((t=e.indexOf("."))!==-1&&(e=e.substring(0,t)),jr()?An(za(64,BigInt(e))):An(Qm(e)))}function n0(e){return qs(e)?e=An(Su(e)):(e=Br(e),qs(e)?e=String(e):(Or(e),e=xu(ye,Fe)),e=An(e)),e}function nc(e){const t=typeof e;return e==null?e:t==="bigint"?An(za(64,e)):Va(e)?t==="string"?e0(e):n0(e):void 0}function i0(e){if(typeof e!="string")throw Error();return e}function Ga(e){if(e!=null&&typeof e!="string")throw Error();return e}function Je(e){return e==null||typeof e=="string"?e:void 0}function yu(e,t,n,i){return e!=null&&e[Fr]===Nr?e:Array.isArray(e)?((i=(n=0|e[bt])|32&i|2&i)!==n&&He(e,i),new t(e)):(n?2&i?((e=t[Df])||(ka((e=new t).v),e=t[Df]=e),t=e):t=new t:t=void 0,t)}function tS(e,t,n){if(t)t:{if(!Va(t=e))throw Nh("int64");switch(typeof t){case"string":t=e0(t);break t;case"bigint":t=An(za(64,t));break t;default:t=n0(t)}}else t=nc(e);return(e=t)==null?n?JM:void 0:e}const eS={};let nS=function(){try{return _c(new class extends Map{constructor(){super()}}),!1}catch{return!0}}();class Rl{constructor(){this.g=new Map}get(t){return this.g.get(t)}set(t,n){return this.g.set(t,n),this.size=this.g.size,this}delete(t){return t=this.g.delete(t),this.size=this.g.size,t}clear(){this.g.clear(),this.size=this.g.size}has(t){return this.g.has(t)}entries(){return this.g.entries()}keys(){return this.g.keys()}values(){return this.g.values()}forEach(t,n){return this.g.forEach(t,n)}[Symbol.iterator](){return this.entries()}}const iS=nS?(Object.setPrototypeOf(Rl.prototype,Map.prototype),Object.defineProperties(Rl.prototype,{size:{value:0,configurable:!0,enumerable:!0,writable:!0}}),Rl):class extends Map{constructor(){super()}};function Vf(e){return e}function Cl(e){if(2&e.J)throw Error("Cannot mutate an immutable Map")}var Vi=class extends iS{constructor(e,t,n=Vf,i=Vf){super(),this.J=0|e[bt],this.K=t,this.S=n,this.fa=this.K?sS:i;for(let s=0;s<e.length;s++){const r=e[s],a=n(r[0],!1,!0);let o=r[1];t?o===void 0&&(o=null):o=i(r[1],!1,!0,void 0,void 0,this.J),super.set(a,o)}}V(e){return Ca(Array.from(super.entries(),e))}clear(){Cl(this),super.clear()}delete(e){return Cl(this),super.delete(this.S(e,!0,!1))}entries(){if(this.K){var e=super.keys();e=new Nf(e,rS,this)}else e=super.entries();return e}values(){if(this.K){var e=super.keys();e=new Nf(e,Vi.prototype.get,this)}else e=super.values();return e}forEach(e,t){this.K?super.forEach((n,i,s)=>{e.call(t,s.get(i),i,s)}):super.forEach(e,t)}set(e,t){return Cl(this),(e=this.S(e,!0,!1))==null?this:t==null?(super.delete(e),this):super.set(e,this.fa(t,!0,!0,this.K,!1,this.J))}Ma(e){const t=this.S(e[0],!1,!0);e=e[1],e=this.K?e===void 0?null:e:this.fa(e,!1,!0,void 0,!1,this.J),super.set(t,e)}has(e){return super.has(this.S(e,!1,!1))}get(e){e=this.S(e,!1,!1);const t=super.get(e);if(t!==void 0){var n=this.K;return n?((n=this.fa(t,!1,!0,n,this.ra,this.J))!==t&&super.set(e,n),n):t}}[Symbol.iterator](){return this.entries()}};function sS(e,t,n,i,s,r){return e=yu(e,i,n,r),s&&(e=bu(e)),e}function rS(e){return[e,this.get(e)]}let aS;function Gf(){return aS||(aS=new Vi(ka([]),void 0,void 0,void 0,eS))}function yc(e){return bn?e[bn]:void 0}function ic(e,t){for(const n in e)!isNaN(n)&&t(e,+n,e[n])}Vi.prototype.toJSON=void 0;var kh=class{};const oS={Ka:!0};function cS(e,t){t<100||Ur(kM,1)}function Ec(e,t,n,i){const s=i!==void 0;i=!!i;var r,a=bn;!s&&Kr&&a&&(r=e[a])&&ic(r,cS),a=[];var o=e.length;let c;r=4294967295;let l=!1;const u=!!(64&t),d=u?128&t?0:-1:void 0;1&t||(c=o&&e[o-1],c!=null&&typeof c=="object"&&c.constructor===Object?r=--o:c=void 0,!u||128&t||s||(l=!0,r=r-d+d)),t=void 0;for(var h=0;h<o;h++){let m=e[h];if(m!=null&&(m=n(m,i))!=null)if(u&&h>=r){const g=h-d;(t??(t={}))[g]=m}else a[h]=m}if(c)for(let m in c){if((o=c[m])==null||(o=n(o,i))==null)continue;let g;h=+m,u&&!Number.isNaN(h)&&(g=h+d)<r?a[g]=o:(t??(t={}))[m]=o}return t&&(l?a.push(t):a[r]=t),s&&bn&&(e=yc(e))&&e instanceof kh&&(a[bn]=function(m){const g=new kh;return ic(m,(M,p,f)=>{g[p]=Kn(f)}),g.da=m.da,g}(e)),a}function lS(e){return e[0]=Ia(e[0]),e[1]=Ia(e[1]),e}function Ia(e){switch(typeof e){case"number":return Number.isFinite(e)?e:""+e;case"bigint":return Bh(e)?Number(e):""+e;case"boolean":return e?1:0;case"object":if(Array.isArray(e)){var t=0|e[bt];return e.length===0&&1&t?void 0:Ec(e,t,Ia)}if(e!=null&&e[Fr]===Nr)return s0(e);if(e instanceof pi){if((t=e.g)==null)e="";else if(typeof t=="string")e=t;else{if(Vm){for(var n="",i=0,s=t.length-10240;i<s;)n+=String.fromCharCode.apply(null,t.subarray(i,i+=10240));n+=String.fromCharCode.apply(null,i?t.subarray(i):t),t=btoa(n)}else{n===void 0&&(n=0),zm(),n=km[n],i=Array(Math.floor(t.length/3)),s=n[64]||"";let l=0,u=0;for(;l<t.length-2;l+=3){var r=t[l],a=t[l+1],o=t[l+2],c=n[r>>2];r=n[(3&r)<<4|a>>4],a=n[(15&a)<<2|o>>6],o=n[63&o],i[u++]=c+r+a+o}switch(c=0,o=s,t.length-l){case 2:o=n[(15&(c=t[l+1]))<<2]||s;case 1:t=t[l],i[u]=n[t>>2]+n[(3&t)<<4|c>>4]+o+s}t=i.join("")}e=e.g=t}return e}return e instanceof Vi?e=e.size!==0?e.V(lS):void 0:void 0}return e}let hS,uS;function s0(e){return Ec(e=e.v,0|e[bt],Ia)}function Os(e,t){return r0(e,t[0],t[1])}function r0(e,t,n,i=0){if(e==null){var s=32;n?(e=[n],s|=128):e=[],t&&(s=-16760833&s|(1023&t)<<14)}else{if(!Array.isArray(e))throw Error("narr");if(s=0|e[bt],Cf&&1&s)throw Error("rfarr");if(2048&s&&!(2&s)&&function(){if(Cf)throw Error("carr");Ur(zM,5)}(),256&s)throw Error("farr");if(64&s)return(s|i)!==s&&He(e,s|i),e;if(n&&(s|=128,n!==e[0]))throw Error("mid");t:{s|=64;var r=(n=e).length;if(r){var a=r-1;const c=n[a];if(c!=null&&typeof c=="object"&&c.constructor===Object){if((a-=t=128&s?0:-1)>=1024)throw Error("pvtlmt");for(var o in c)(r=+o)<a&&(n[r+t]=c[o],delete c[o]);s=-16760833&s|(1023&a)<<14;break t}}if(t){if((o=Math.max(t,r-(128&s?0:-1)))>1024)throw Error("spvt");s=-16760833&s|(1023&o)<<14}}}return He(e,64|s|i),e}function dS(e,t){if(typeof e!="object")return e;if(Array.isArray(e)){var n=0|e[bt];return e.length===0&&1&n?void 0:Hf(e,n,t)}if(e!=null&&e[Fr]===Nr)return Wf(e);if(e instanceof Vi){if(2&(t=e.J))return e;if(!e.size)return;if(n=ka(e.V()),e.K)for(e=0;e<n.length;e++){const i=n[e];let s=i[1];s=s==null||typeof s!="object"?void 0:s!=null&&s[Fr]===Nr?Wf(s):Array.isArray(s)?Hf(s,0|s[bt],!!(32&t)):void 0,i[1]=s}return n}return e instanceof pi?e:void 0}function Hf(e,t,n){return 2&t||(!n||4096&t||16&t?e=Qr(e,t,!1,n&&!(16&t)):(Ba(e,34),4&t&&Object.freeze(e))),e}function Eu(e,t,n){return e=new e.constructor(t),n&&(e.h=Ys),e.m=Ys,e}function Wf(e){const t=e.v,n=0|t[bt];return wn(e,n)?e:Au(e,t,n)?Eu(e,t):Qr(t,n)}function Qr(e,t,n,i){return i??(i=!!(34&t)),e=Ec(e,t,dS,i),i=32,n&&(i|=2),He(e,t=16769217&t|i),e}function bu(e){const t=e.v,n=0|t[bt];return wn(e,n)?Au(e,t,n)?Eu(e,t,!0):new e.constructor(Qr(t,n,!1)):e}function ta(e){if(e.h!==Ys)return!1;var t=e.v;return Ba(t=Qr(t,0|t[bt]),2048),e.v=t,e.h=void 0,e.m=void 0,!0}function ea(e){if(!ta(e)&&wn(e,0|e.v[bt]))throw Error()}function js(e,t){t===void 0&&(t=0|e[bt]),32&t&&!(4096&t)&&He(e,4096|t)}function Au(e,t,n){return!!(2&n)||!(!(32&n)||4096&n)&&(He(t,2|n),e.h=Ys,!0)}const a0=An(0),es={};function Ee(e,t,n,i,s){if((t=Gi(e.v,t,n,s))!==null||i&&e.m!==Ys)return t}function Gi(e,t,n,i){if(t===-1)return null;const s=t+(n?0:-1),r=e.length-1;let a,o;if(!(r<1+(n?0:-1))){if(s>=r)if(a=e[r],a!=null&&typeof a=="object"&&a.constructor===Object)n=a[t],o=!0;else{if(s!==r)return;n=a}else n=e[s];if(i&&n!=null){if((i=i(n))==null)return i;if(!Object.is(i,n))return o?a[t]=i:e[s]=i,i}return n}}function le(e,t,n,i){ea(e),ke(e=e.v,0|e[bt],t,n,i)}function ke(e,t,n,i,s){const r=n+(s?0:-1);var a=e.length-1;if(a>=1+(s?0:-1)&&r>=a){const o=e[a];if(o!=null&&typeof o=="object"&&o.constructor===Object)return o[n]=i,t}return r<=a?(e[r]=i,t):(i!==void 0&&(n>=(a=(t??(t=0|e[bt]))>>14&1023||536870912)?i!=null&&(e[a+(s?0:-1)]={[n]:i}):e[r]=i),t)}function Fs(){return VM===void 0?2:4}function Ns(e,t,n,i,s){let r=e.v,a=0|r[bt];i=wn(e,a)?1:i,s=!!s||i===3,i===2&&ta(e)&&(r=e.v,a=0|r[bt]);let o=(e=Tu(r,t))===$s?7:0|e[bt],c=wu(o,a);var l=!(4&c);if(l){4&c&&(e=Kn(e),o=0,c=ks(c,a),a=ke(r,a,t,e));let u=0,d=0;for(;u<e.length;u++){const h=n(e[u]);h!=null&&(e[d++]=h)}d<u&&(e.length=d),n=-513&(4|c),c=n&=-1025,c&=-4097}return c!==o&&(He(e,c),2&c&&Object.freeze(e)),o0(e,c,r,a,t,i,l,s)}function o0(e,t,n,i,s,r,a,o){let c=t;return r===1||r===4&&(2&t||!(16&t)&&32&i)?Bs(t)||((t|=!e.length||a&&!(4096&t)||32&i&&!(4096&t||16&t)?2:256)!==c&&He(e,t),Object.freeze(e)):(r===2&&Bs(t)&&(e=Kn(e),c=0,t=ks(t,i),i=ke(n,i,s,e)),Bs(t)||(o||(t|=16),t!==c&&He(e,t))),2&t||!(4096&t||16&t)||js(n,i),e}function Tu(e,t,n){return e=Gi(e,t,n),Array.isArray(e)?e:$s}function wu(e,t){return 2&t&&(e|=2),1|e}function Bs(e){return!!(2&e)&&!!(4&e)||!!(256&e)}function c0(e){return _u(e,!0)}function l0(e){e=Kn(e);for(let t=0;t<e.length;t++){const n=e[t]=Kn(e[t]);Array.isArray(n[1])&&(n[1]=ka(n[1]))}return Ca(e)}function is(e,t,n,i){ea(e),ke(e=e.v,0|e[bt],t,(i==="0"?Number(n)===0:n===i)?void 0:n)}function na(e,t,n){if(2&t)throw Error();const i=Zr(t);let s=Tu(e,n,i),r=s===$s?7:0|s[bt],a=wu(r,t);return(2&a||Bs(a)||16&a)&&(a===r||Bs(a)||He(s,a),s=Kn(s),r=0,a=ks(a,t),ke(e,t,n,s,i)),a&=-13,a!==r&&He(s,a),s}function Pl(e,t){var n=tg;return Cu(Ru(e=e.v),e,void 0,n)===t?t:-1}function Ru(e){if(Kr)return e[ga]??(e[ga]=new Map);if(ga in e)return e[ga];const t=new Map;return Object.defineProperty(e,ga,{value:t}),t}function h0(e,t,n,i,s){const r=Ru(e),a=Cu(r,e,t,n,s);return a!==i&&(a&&(t=ke(e,t,a,void 0,s)),r.set(n,i)),t}function Cu(e,t,n,i,s){let r=e.get(i);if(r!=null)return r;r=0;for(let a=0;a<i.length;a++){const o=i[a];Gi(t,o,s)!=null&&(r!==0&&(n=ke(t,n,r,void 0,s)),r=o)}return e.set(i,r),r}function Pu(e,t,n){let i=0|e[bt];const s=Zr(i),r=Gi(e,n,s);let a;if(r!=null&&r[Fr]===Nr){if(!wn(r))return ta(r),r.v;a=r.v}else Array.isArray(r)&&(a=r);if(a){const o=0|a[bt];2&o&&(a=Qr(a,o))}return a=Os(a,t),a!==r&&ke(e,i,n,a,s),a}function u0(e,t,n,i,s){let r=!1;if((i=Gi(e,i,s,a=>{const o=yu(a,n,!1,t);return r=o!==a&&o!=null,o}))!=null)return r&&!wn(i)&&js(e,t),i}function te(e,t,n,i){let s=e.v,r=0|s[bt];if((t=u0(s,r,t,n,i))==null)return t;if(r=0|s[bt],!wn(e,r)){const a=bu(t);a!==t&&(ta(e)&&(s=e.v,r=0|s[bt]),r=ke(s,r,n,t=a,i),js(s,r))}return t}function d0(e,t,n,i,s,r,a,o){var c=wn(e,n);r=c?1:r,a=!!a||r===3,c=o&&!c,(r===2||c)&&ta(e)&&(n=0|(t=e.v)[bt]);var l=(e=Tu(t,s))===$s?7:0|e[bt],u=wu(l,n);if(o=!(4&u)){var d=e,h=n;const m=!!(2&u);m&&(h|=2);let g=!m,M=!0,p=0,f=0;for(;p<d.length;p++){const y=yu(d[p],i,!1,h);if(y instanceof i){if(!m){const A=wn(y);g&&(g=!A),M&&(M=A)}d[f++]=y}}f<p&&(d.length=f),u|=4,u=M?-4097&u:4096|u,u=g?8|u:-9&u}if(u!==l&&(He(e,u),2&u&&Object.freeze(e)),c&&!(8&u||!e.length&&(r===1||r===4&&(2&u||!(16&u)&&32&n)))){for(Bs(u)&&(e=Kn(e),u=ks(u,n),n=ke(t,n,s,e)),i=e,c=u,l=0;l<i.length;l++)(d=i[l])!==(u=bu(d))&&(i[l]=u);c|=8,He(e,u=c=i.length?4096|c:-4097&c)}return o0(e,u,t,n,s,r,o,a)}function Hi(e,t,n){const i=e.v;return d0(e,i,0|i[bt],t,n,Fs(),!1,!0)}function f0(e){return e==null&&(e=void 0),e}function Lt(e,t,n,i,s){return le(e,n,i=f0(i),s),i&&!wn(i)&&js(e.v),e}function ya(e,t,n,i){t:{var s=i=f0(i);ea(e);const r=e.v;let a=0|r[bt];if(s==null){const o=Ru(r);if(Cu(o,r,a,n)!==t)break t;o.set(n,0)}else a=h0(r,a,n,t);ke(r,a,t,s)}i&&!wn(i)&&js(e.v)}function ks(e,t){return-273&(2&t?2|e:-3&e)}function Lu(e,t,n,i){var s=i;ea(e),e=d0(e,i=e.v,0|i[bt],n,t,2,!0),s=s??new n,e.push(s),t=n=e===$s?7:0|e[bt],(s=wn(s))?(n&=-9,e.length===1&&(n&=-4097)):n|=4096,n!==t&&He(e,n),s||js(i)}function zn(e,t,n){return Jr(Ee(e,t,void 0,n))}function Le(e,t){return Ee(e,t,void 0,void 0,ui)??0}function Wi(e,t,n){if(n!=null){if(typeof n!="number"||!Sc(n))throw Nh("int32");n|=0}le(e,t,n)}function Ct(e,t,n){le(e,t,Sa(n))}function Rn(e,t,n){is(e,t,Ga(n),"")}function sc(e,t,n){{ea(e);const a=e.v;let o=0|a[bt];if(n==null)ke(a,o,t);else{var i=e=n===$s?7:0|n[bt],s=Bs(e),r=s||Object.isFrozen(n);for(s||(e=0),r||(n=Kn(n),i=0,e=ks(e,o),r=!1),e|=5,e|=(4&e?512&e?512:1024&e?1024:0:void 0)??1024,s=0;s<n.length;s++){const c=n[s],l=i0(c);Object.is(c,l)||(r&&(n=Kn(n),i=0,e=ks(e,o),r=!1),n[s]=l)}e!==i&&(r&&(n=Kn(n),e=ks(e,o)),He(n,e)),ke(a,o,t,n)}}}function bc(e,t,n){ea(e),Ns(e,t,Je,2,!0).push(i0(n))}var fr=class{constructor(e,t,n){if(this.buffer=e,n&&!t)throw Error();this.g=t}};function Iu(e,t){if(typeof e=="string")return new fr(Gm(e),t);if(Array.isArray(e))return new fr(new Uint8Array(e),t);if(e.constructor===Uint8Array)return new fr(e,!1);if(e.constructor===ArrayBuffer)return e=new Uint8Array(e),new fr(e,!1);if(e.constructor===pi)return t=gu(e)||new Uint8Array(0),new fr(t,!0,e);if(e instanceof Uint8Array)return e=e.constructor===Uint8Array?e:new Uint8Array(e.buffer,e.byteOffset,e.byteLength),new fr(e,!1);throw Error()}function Du(e,t){let n,i=0,s=0,r=0;const a=e.h;let o=e.g;do n=a[o++],i|=(127&n)<<r,r+=7;while(r<32&&128&n);if(r>32)for(s|=(127&n)>>4,r=3;r<32&&128&n;r+=7)n=a[o++],s|=(127&n)<<r;if(zs(e,o),!(128&n))return t(i>>>0,s>>>0);throw Error()}function Uu(e){let t=0,n=e.g;const i=n+10,s=e.h;for(;n<i;){const r=s[n++];if(t|=r,(128&r)==0)return zs(e,n),!!(127&t)}throw Error()}function ds(e){const t=e.h;let n=e.g,i=t[n++],s=127&i;if(128&i&&(i=t[n++],s|=(127&i)<<7,128&i&&(i=t[n++],s|=(127&i)<<14,128&i&&(i=t[n++],s|=(127&i)<<21,128&i&&(i=t[n++],s|=i<<28,128&i&&128&t[n++]&&128&t[n++]&&128&t[n++]&&128&t[n++]&&128&t[n++])))))throw Error();return zs(e,n),s}function vi(e){return ds(e)>>>0}function rc(e){var t=e.h;const n=e.g;var i=t[n],s=t[n+1];const r=t[n+2];return t=t[n+3],zs(e,e.g+4),e=2*((s=(i<<0|s<<8|r<<16|t<<24)>>>0)>>31)+1,i=s>>>23&255,s&=8388607,i==255?s?NaN:e*(1/0):i==0?1401298464324817e-60*e*s:e*Math.pow(2,i-150)*(s+8388608)}function fS(e){return ds(e)}function zs(e,t){if(e.g=t,t>e.l)throw Error()}function p0(e,t){if(t<0)throw Error();const n=e.g;if((t=n+t)>e.l)throw Error();return e.g=t,n}function m0(e,t){if(t==0)return Xs();var n=p0(e,t);return e.Y&&e.j?n=e.h.subarray(n,n+t):(e=e.h,n=n===(t=n+t)?new Uint8Array(0):$M?e.slice(n,t):new Uint8Array(e.subarray(n,t))),n.length==0?Xs():new pi(n,Dr)}var Xf=[];function g0(e,t,n,i){if(ac.length){const s=ac.pop();return s.o(i),s.g.init(e,t,n,i),s}return new pS(e,t,n,i)}function _0(e){e.g.clear(),e.l=-1,e.h=-1,ac.length<100&&ac.push(e)}function v0(e){var t=e.g;if(t.g==t.l)return!1;e.m=e.g.g;var n=vi(e.g);if(t=n>>>3,!((n&=7)>=0&&n<=5)||t<1)throw Error();return e.l=t,e.h=n,!0}function ko(e){switch(e.h){case 0:e.h!=0?ko(e):Uu(e.g);break;case 1:zs(e=e.g,e.g+8);break;case 2:if(e.h!=2)ko(e);else{var t=vi(e.g);zs(e=e.g,e.g+t)}break;case 5:zs(e=e.g,e.g+4);break;case 3:for(t=e.l;;){if(!v0(e))throw Error();if(e.h==4){if(e.l!=t)throw Error();break}ko(e)}break;default:throw Error()}}function Ha(e,t,n){const i=e.g.l;var s=vi(e.g);let r=(s=e.g.g+s)-i;if(r<=0&&(e.g.l=s,n(t,e,void 0,void 0,void 0),r=s-e.g.g),r)throw Error();return e.g.g=s,e.g.l=i,t}function Fu(e){var t=vi(e.g),n=p0(e=e.g,t);if(e=e.h,wM){var i,s=e;(i=wl)||(i=wl=new TextDecoder("utf-8",{fatal:!0})),t=n+t,s=n===0&&t===s.length?s:s.subarray(n,t);try{var r=i.decode(s)}catch(o){if(yo===void 0){try{i.decode(new Uint8Array([128]))}catch{}try{i.decode(new Uint8Array([97])),yo=!0}catch{yo=!1}}throw!yo&&(wl=void 0),o}}else{t=(r=n)+t,n=[];let o,c=null;for(;r<t;){var a=e[r++];a<128?n.push(a):a<224?r>=t?bs():(o=e[r++],a<194||(192&o)!=128?(r--,bs()):n.push((31&a)<<6|63&o)):a<240?r>=t-1?bs():(o=e[r++],(192&o)!=128||a===224&&o<160||a===237&&o>=160||(192&(i=e[r++]))!=128?(r--,bs()):n.push((15&a)<<12|(63&o)<<6|63&i)):a<=244?r>=t-2?bs():(o=e[r++],(192&o)!=128||o-144+(a<<28)>>30||(192&(i=e[r++]))!=128||(192&(s=e[r++]))!=128?(r--,bs()):(a=(7&a)<<18|(63&o)<<12|(63&i)<<6|63&s,a-=65536,n.push(55296+(a>>10&1023),56320+(1023&a)))):bs(),n.length>=8192&&(c=Rf(c,n),n.length=0)}r=Rf(c,n)}return r}function x0(e){const t=vi(e.g);return m0(e.g,t)}function Ac(e,t,n){var i=vi(e.g);for(i=e.g.g+i;e.g.g<i;)n.push(t(e.g))}var pS=class{constructor(e,t,n,i){if(Xf.length){const s=Xf.pop();s.init(e,t,n,i),e=s}else e=new class{constructor(s,r,a,o){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.init(s,r,a,o)}init(s,r,a,{Y:o=!1,ea:c=!1}={}){this.Y=o,this.ea=c,s&&(s=Iu(s,this.ea),this.h=s.buffer,this.j=s.g,this.m=r||0,this.l=a!==void 0?this.m+a:this.h.length,this.g=this.m)}clear(){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.Y=!1}}(e,t,n,i);this.g=e,this.m=this.g.g,this.h=this.l=-1,this.o(i)}o({ha:e=!1}={}){this.ha=e}},ac=[];function Yf(e){return e?/^\d+$/.test(e)?(Mc(e),new zh(ye,Fe)):null:mS||(mS=new zh(0,0))}var zh=class{constructor(e,t){this.h=e>>>0,this.g=t>>>0}};let mS;function qf(e){return e?/^-?\d+$/.test(e)?(Mc(e),new Vh(ye,Fe)):null:gS||(gS=new Vh(0,0))}var Vh=class{constructor(e,t){this.h=e>>>0,this.g=t>>>0}};let gS;function xr(e,t,n){for(;n>0||t>127;)e.g.push(127&t|128),t=(t>>>7|n<<25)>>>0,n>>>=7;e.g.push(t)}function ia(e,t){for(;t>127;)e.g.push(127&t|128),t>>>=7;e.g.push(t)}function Tc(e,t){if(t>=0)ia(e,t);else{for(let n=0;n<9;n++)e.g.push(127&t|128),t>>=7;e.g.push(1)}}function Nu(e){var t=ye;e.g.push(t>>>0&255),e.g.push(t>>>8&255),e.g.push(t>>>16&255),e.g.push(t>>>24&255)}function kr(e,t){t.length!==0&&(e.l.push(t),e.h+=t.length)}function Gn(e,t,n){ia(e.g,8*t+n)}function Ou(e,t){return Gn(e,t,2),t=e.g.end(),kr(e,t),t.push(e.h),t}function Bu(e,t){var n=t.pop();for(n=e.h+e.g.length()-n;n>127;)t.push(127&n|128),n>>>=7,e.h++;t.push(n),e.h++}function wc(e,t,n){Gn(e,t,2),ia(e.g,n.length),kr(e,e.g.end()),kr(e,n)}function oc(e,t,n,i){n!=null&&(t=Ou(e,t),i(n,e),Bu(e,t))}function Mi(){const e=class{constructor(){throw Error()}};return Object.setPrototypeOf(e,e.prototype),e}var ku=Mi(),M0=Mi(),zu=Mi(),Vu=Mi(),Gu=Mi(),S0=Mi(),_S=Mi(),Rc=Mi(),y0=Mi(),E0=Mi();function Si(e,t,n){var i=e.v;bn&&bn in i&&(i=i[bn])&&delete i[t.g],t.h?t.j(e,t.h,t.g,n,t.l):t.j(e,t.g,n,t.l)}var At=class{constructor(e,t){this.v=r0(e,t,void 0,2048)}toJSON(){return s0(this)}j(){var s;var e=JS,t=this.v,n=e.g,i=bn;if(Kr&&i&&((s=t[i])==null?void 0:s[n])!=null&&Ur(BM,3),t=e.g,Uf&&bn&&Uf===void 0&&(i=(n=this.v)[bn])&&(i=i.da))try{i(n,t,oS)}catch(r){Bm(r)}return e.h?e.m(this,e.h,e.g,e.l):e.m(this,e.g,e.defaultValue,e.l)}clone(){const e=this.v,t=0|e[bt];return Au(this,e,t)?Eu(this,e,!0):new this.constructor(Qr(e,t,!1))}};At.prototype[Fr]=Nr,At.prototype.toString=function(){return this.v.toString()};var sa=class{constructor(e,t,n){this.g=e,this.h=t,e=ku,this.l=!!e&&n===e||!1}};function Cc(e,t){return new sa(e,t,ku)}function b0(e,t,n,i,s){oc(e,n,R0(t,i),s)}const vS=Cc(function(e,t,n,i,s){return e.h===2&&(Ha(e,Pu(t,i,n),s),!0)},b0),xS=Cc(function(e,t,n,i,s){return e.h===2&&(Ha(e,Pu(t,i,n),s),!0)},b0);var Pc=Symbol(),Lc=Symbol(),Gh=Symbol(),$f=Symbol(),jf=Symbol();let A0,T0;function Ks(e,t,n,i){var s=i[e];if(s)return s;(s={}).qa=i,s.T=function(d){switch(typeof d){case"boolean":return hS||(hS=[0,void 0,!0]);case"number":return d>0?void 0:d===0?uS||(uS=[0,void 0]):[-d,void 0];case"string":return[0,d];case"object":return d}}(i[0]);var r=i[1];let a=1;r&&r.constructor===Object&&(s.ba=r,typeof(r=i[++a])=="function"&&(s.ma=!0,A0??(A0=r),T0??(T0=i[a+1]),r=i[a+=2]));const o={};for(;r&&Array.isArray(r)&&r.length&&typeof r[0]=="number"&&r[0]>0;){for(var c=0;c<r.length;c++)o[r[c]]=r;r=i[++a]}for(c=1;r!==void 0;){let d;typeof r=="number"&&(c+=r,r=i[++a]);var l=void 0;if(r instanceof sa?d=r:(d=vS,a--),d==null?void 0:d.l){r=i[++a],l=i;var u=a;typeof r=="function"&&(r=r(),l[u]=r),l=r}for(u=c+1,typeof(r=i[++a])=="number"&&r<0&&(u-=r,r=i[++a]);c<u;c++){const h=o[c];l?n(s,c,d,l,h):t(s,c,d,h)}}return i[e]=s}function w0(e){return Array.isArray(e)?e[0]instanceof sa?e:[xS,e]:[e,void 0]}function R0(e,t){return e instanceof At?e.v:Array.isArray(e)?Os(e,t):void 0}function Hu(e,t,n,i){const s=n.g;e[t]=i?(r,a,o)=>s(r,a,o,i):s}function Wu(e,t,n,i,s){const r=n.g;let a,o;e[t]=(c,l,u)=>r(c,l,u,o||(o=Ks(Lc,Hu,Wu,i).T),a||(a=Xu(i)),s)}function Xu(e){let t=e[Gh];if(t!=null)return t;const n=Ks(Lc,Hu,Wu,e);return t=n.ma?(i,s)=>A0(i,s,n):(i,s)=>{for(;v0(s)&&s.h!=4;){var r=s.l,a=n[r];if(a==null){var o=n.ba;o&&(o=o[r])&&(o=SS(o))!=null&&(a=n[r]=o)}if(a==null||!a(s,i,r)){if(a=(o=s).m,ko(o),o.ha)var c=void 0;else c=o.g.g-a,o.g.g=a,c=m0(o.g,c);a=void 0,o=i,c&&((a=o[bn]??(o[bn]=new kh))[r]??(a[r]=[])).push(c)}}return(i=yc(i))&&(i.da=n.qa[jf]),!0},e[Gh]=t,e[jf]=MS.bind(e),t}function MS(e,t,n,i){var s=this[Lc];const r=this[Gh],a=Os(void 0,s.T),o=yc(e);if(o){var c=!1,l=s.ba;if(l){if(s=(u,d,h)=>{if(h.length!==0)if(l[d])for(const m of h){u=g0(m);try{c=!0,r(a,u)}finally{_0(u)}}else i==null||i(e,d,h)},t==null)ic(o,s);else if(o!=null){const u=o[t];u&&s(o,t,u)}if(c){let u=0|e[bt];if(2&u&&2048&u&&!(n!=null&&n.Ka))throw Error();const d=Zr(u),h=(m,g)=>{if(Gi(e,m,d)!=null){if((n==null?void 0:n.Qa)===1)return;throw Error()}g!=null&&(u=ke(e,u,m,g,d)),delete o[m]};t==null?qm(a,0|a[bt],(m,g)=>{h(m,g)}):h(t,Gi(a,t,d))}}}}function SS(e){const t=(e=w0(e))[0].g;if(e=e[1]){const n=Xu(e),i=Ks(Lc,Hu,Wu,e).T;return(s,r,a)=>t(s,r,a,i,n)}return t}function Ic(e,t,n){e[t]=n.h}function Dc(e,t,n,i){let s,r;const a=n.h;e[t]=(o,c,l)=>a(o,c,l,r||(r=Ks(Pc,Ic,Dc,i).T),s||(s=C0(i)))}function C0(e){let t=e[$f];if(!t){const n=Ks(Pc,Ic,Dc,e);t=(i,s)=>P0(i,s,n),e[$f]=t}return t}function P0(e,t,n){qm(e,0|e[bt],(i,s)=>{if(s!=null){var r=function(a,o){var c=a[o];if(c)return c;if((c=a.ba)&&(c=c[o])){var l=(c=w0(c))[0].h;if(c=c[1]){const u=C0(c),d=Ks(Pc,Ic,Dc,c).T;c=a.ma?T0(d,u):(h,m,g)=>l(h,m,g,d,u)}else c=l;return a[o]=c}}(n,i);r?r(t,s,i):i<500||Ur(Oh,3)}}),(e=yc(e))&&ic(e,(i,s,r)=>{for(kr(t,t.g.end()),i=0;i<r.length;i++)kr(t,gu(r[i])||new Uint8Array(0))})}const yS=An(0);function ra(e,t){if(Array.isArray(t)){var n=0|t[bt];if(4&n)return t;for(var i=0,s=0;i<t.length;i++){const r=e(t[i]);r!=null&&(t[s++]=r)}return s<i&&(t.length=s),(e=-1537&(5|n))!==n&&He(t,e),2&e&&Object.freeze(t),t}}function cn(e,t,n){return new sa(e,t,n)}function aa(e,t,n){return new sa(e,t,n)}function ln(e,t,n){ke(e,0|e[bt],t,n,Zr(0|e[bt]))}var ES=Cc(function(e,t,n,i,s){if(e.h!==2)return!1;if(e=Kn(e=Ha(e,Os([void 0,void 0],i),s)),s=Zr(i=0|t[bt]),2&i)throw Error();let r=Gi(t,n,s);if(r instanceof Vi)2&r.J?(r=r.V(),r.push(e),ke(t,i,n,r,s)):r.Ma(e);else if(Array.isArray(r)){var a=0|r[bt];8192&a||He(r,a|=8192),2&a&&(r=l0(r),ke(t,i,n,r,s)),r.push(e)}else ke(t,i,n,Ca([e]),s);return!0},function(e,t,n,i,s){if(t instanceof Vi)t.forEach((r,a)=>{oc(e,n,Os([a,r],i),s)});else if(Array.isArray(t)){for(let r=0;r<t.length;r++){const a=t[r];Array.isArray(a)&&oc(e,n,Os(a,i),s)}Ca(t)}});function L0(e,t,n){(t=ui(t))!=null&&(Gn(e,n,5),e=e.g,vu(t),Nu(e))}function I0(e,t,n){if(t=function(i){if(i==null)return i;const s=typeof i;if(s==="bigint")return String(za(64,i));if(Va(i)){if(s==="string")return t0(i);if(s==="number")return Su(i)}}(t),t!=null&&(typeof t=="string"&&qf(t),t!=null))switch(Gn(e,n,0),typeof t){case"number":e=e.g,Or(t),xr(e,ye,Fe);break;case"bigint":n=BigInt.asUintN(64,t),n=new Vh(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),xr(e.g,n.h,n.g);break;default:n=qf(t),xr(e.g,n.h,n.g)}}function D0(e,t,n){(t=Jr(t))!=null&&t!=null&&(Gn(e,n,0),Tc(e.g,t))}function U0(e,t,n){(t=Zm(t))!=null&&(Gn(e,n,0),e.g.g.push(t?1:0))}function F0(e,t,n){(t=Je(t))!=null&&wc(e,n,Om(t))}function N0(e,t,n,i,s){oc(e,n,R0(t,i),s)}function O0(e,t,n){(t=t==null||typeof t=="string"||t instanceof pi?t:void 0)!=null&&wc(e,n,Iu(t,!0).buffer)}function B0(e,t,n){(t=Jm(t))!=null&&t!=null&&(Gn(e,n,0),ia(e.g,t))}function k0(e,t,n){return(e.h===5||e.h===2)&&(t=na(t,0|t[bt],n),e.h==2?Ac(e,rc,t):t.push(rc(e.g)),!0)}var Ne=cn(function(e,t,n){return e.h===5&&(ln(t,n,rc(e.g)),!0)},L0,Rc),bS=aa(k0,function(e,t,n){if((t=ra(ui,t))!=null)for(let a=0;a<t.length;a++){var i=e,s=n,r=t[a];r!=null&&(Gn(i,s,5),i=i.g,vu(r),Nu(i))}},Rc),Yu=aa(k0,function(e,t,n){if((t=ra(ui,t))!=null&&t.length){Gn(e,n,2),ia(e.g,4*t.length);for(let i=0;i<t.length;i++)n=e.g,vu(t[i]),Nu(n)}},Rc),AS=cn(function(e,t,n){return e.h===5&&(ln(t,n,(e=rc(e.g))===0?void 0:e),!0)},L0,Rc),fs=cn(function(e,t,n){return e.h!==0?e=!1:(ln(t,n,Du(e.g,Km)),e=!0),e},I0,S0),Ll=cn(function(e,t,n){return e.h!==0?t=!1:(ln(t,n,(e=Du(e.g,Km))===yS?void 0:e),t=!0),t},I0,S0),TS=cn(function(e,t,n){return e.h!==0?e=!1:(ln(t,n,Du(e.g,KM)),e=!0),e},function(e,t,n){if(t=function(i){if(i==null)return i;var s=typeof i;if(s==="bigint")return String(ZM(64,i));if(Va(i)){if(s==="string")return s=Br(Number(i)),qs(s)&&s>=0?i=String(s):((s=i.indexOf("."))!==-1&&(i=i.substring(0,s)),(s=i[0]!=="-"&&((s=i.length)<20||s===20&&i<="18446744073709551615"))||(Mc(i),i=Pa(ye,Fe))),i;if(s==="number")return(i=Br(i))>=0&&qs(i)||(Or(i),i=jm(ye,Fe)),i}}(t),t!=null&&(typeof t=="string"&&Yf(t),t!=null))switch(Gn(e,n,0),typeof t){case"number":e=e.g,Or(t),xr(e,ye,Fe);break;case"bigint":n=BigInt.asUintN(64,t),n=new zh(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),xr(e.g,n.h,n.g);break;default:n=Yf(t),xr(e.g,n.h,n.g)}},_S),Be=cn(function(e,t,n){return e.h===0&&(ln(t,n,ds(e.g)),!0)},D0,Vu),Wa=aa(function(e,t,n){return(e.h===0||e.h===2)&&(t=na(t,0|t[bt],n),e.h==2?Ac(e,ds,t):t.push(ds(e.g)),!0)},function(e,t,n){if((t=ra(Jr,t))!=null&&t.length){n=Ou(e,n);for(let i=0;i<t.length;i++)Tc(e.g,t[i]);Bu(e,n)}},Vu),gr=cn(function(e,t,n){return e.h===0&&(ln(t,n,(e=ds(e.g))===0?void 0:e),!0)},D0,Vu),be=cn(function(e,t,n){return e.h===0&&(ln(t,n,Uu(e.g)),!0)},U0,M0),Vs=cn(function(e,t,n){return e.h===0&&(ln(t,n,(e=Uu(e.g))===!1?void 0:e),!0)},U0,M0),nn=aa(function(e,t,n){return e.h===2&&(e=Fu(e),na(t,0|t[bt],n).push(e),!0)},function(e,t,n){if((t=ra(Je,t))!=null)for(let a=0;a<t.length;a++){var i=e,s=n,r=t[a];r!=null&&wc(i,s,Om(r))}},zu),rs=cn(function(e,t,n){return e.h===2&&(ln(t,n,(e=Fu(e))===""?void 0:e),!0)},F0,zu),fe=cn(function(e,t,n){return e.h===2&&(ln(t,n,Fu(e)),!0)},F0,zu),$e=function(e,t,n=ku){return new sa(e,t,n)}(function(e,t,n,i,s){return e.h===2&&(i=Os(void 0,i),na(t,0|t[bt],n).push(i),Ha(e,i,s),!0)},function(e,t,n,i,s){if(Array.isArray(t)){for(let r=0;r<t.length;r++)N0(e,t[r],n,i,s);1&(e=0|t[bt])||He(t,1|e)}}),xe=Cc(function(e,t,n,i,s,r){if(e.h!==2)return!1;let a=0|t[bt];return h0(t,a,r,n,Zr(a)),Ha(e,t=Pu(t,i,n),s),!0},N0),z0=cn(function(e,t,n){return e.h===2&&(ln(t,n,x0(e)),!0)},O0,y0),wS=aa(function(e,t,n){return(e.h===0||e.h===2)&&(t=na(t,0|t[bt],n),e.h==2?Ac(e,vi,t):t.push(vi(e.g)),!0)},function(e,t,n){if((t=ra(Jm,t))!=null)for(let a=0;a<t.length;a++){var i=e,s=n,r=t[a];r!=null&&(Gn(i,s,0),ia(i.g,r))}},Gu),RS=cn(function(e,t,n){return e.h===0&&(ln(t,n,(e=vi(e.g))===0?void 0:e),!0)},B0,Gu),sn=cn(function(e,t,n){return e.h===0&&(ln(t,n,ds(e.g)),!0)},function(e,t,n){(t=Jr(t))!=null&&(t=parseInt(t,10),Gn(e,n,0),Tc(e.g,t))},E0);class CS{constructor(t,n){var i=Pn;this.g=t,this.h=n,this.m=te,this.j=Lt,this.defaultValue=void 0,this.l=i.Oa!=null?$m:void 0}register(){_c(this)}}function yi(e,t){return new CS(e,t)}function ms(e,t){return(n,i)=>{{const r={ea:!0};i&&Object.assign(r,i),n=g0(n,void 0,void 0,r);try{const a=new e,o=a.v;Xu(t)(o,n);var s=a}finally{_0(n)}}return s}}function Uc(e){return function(){const t=new class{constructor(){this.l=[],this.h=0,this.g=new class{constructor(){this.g=[]}length(){return this.g.length}end(){const a=this.g;return this.g=[],a}}}};P0(this.v,t,Ks(Pc,Ic,Dc,e)),kr(t,t.g.end());const n=new Uint8Array(t.h),i=t.l,s=i.length;let r=0;for(let a=0;a<s;a++){const o=i[a];n.set(o,r),r+=o.length}return t.l=[n],n}}var Kf=class extends At{constructor(e){super(e)}},Zf=[0,rs,cn(function(e,t,n){return e.h===2&&(ln(t,n,(e=x0(e))===Xs()?void 0:e),!0)},function(e,t,n){if(t!=null){if(t instanceof At){const i=t.Ra;return void(i?(t=i(t),t!=null&&wc(e,n,Iu(t,!0).buffer)):Ur(Oh,3))}if(Array.isArray(t))return void Ur(Oh,3)}O0(e,t,n)},y0)];let Il,Jf=globalThis.trustedTypes;function Qf(e){var t;return Il===void 0&&(Il=function(){let n=null;if(!Jf)return n;try{const i=s=>s;n=Jf.createPolicy("goog#html",{createHTML:i,createScript:i,createScriptURL:i})}catch{}return n}()),e=(t=Il)?t.createScriptURL(e):e,new class{constructor(n){this.g=n}toString(){return this.g+""}}(e)}function Eo(e,...t){if(t.length===0)return Qf(e[0]);let n=e[0];for(let i=0;i<t.length;i++)n+=encodeURIComponent(t[i])+e[i+1];return Qf(n)}var V0=[0,Be,sn,be,-1,Wa,sn,-1,be],PS=class extends At{constructor(e){super(e)}},G0=[0,be,fe,be,sn,-1,aa(function(e,t,n){return(e.h===0||e.h===2)&&(t=na(t,0|t[bt],n),e.h==2?Ac(e,fS,t):t.push(ds(e.g)),!0)},function(e,t,n){if((t=ra(Jr,t))!=null&&t.length){n=Ou(e,n);for(let i=0;i<t.length;i++)Tc(e.g,t[i]);Bu(e,n)}},E0),fe,-1,[0,be,-1],sn,be,-1],H0=[0,3,be,-1,2,[0,[2],Be,xe,[0,cn(function(e,t,n){return e.h===0&&(ln(t,n,vi(e.g)),!0)},B0,Gu)]],[0,sn,be,sn,be,sn,be,fe,-1],[0,[3,4],fe,-1,xe,[0,Be],xe,[0,sn]],[0]],W0=[0,fe,-2],tp=class extends At{constructor(e){super(e)}},X0=[0],Y0=[0,Be,be,1,be,-4],Pn=class extends At{constructor(e){super(e,2)}},ze={};ze[336783863]=[0,fe,be,-1,Be,[0,[1,2,3,4,5,6,7,8,9],xe,X0,xe,G0,xe,W0,xe,Y0,xe,V0,xe,[0,fe,-2],xe,[0,fe,sn],xe,H0,xe,[0,sn,-1,be]],[0,fe],be,[0,[1,3],[2,4],xe,[0,Wa],-1,xe,[0,nn],-1,$e,[0,fe,-1]],fe];var ep=[0,Ll,-1,Vs,-3,Ll,Wa,rs,gr,Ll,-1,Vs,gr,Vs,-2,rs];function Me(e,t){bc(e,3,t)}function $t(e,t){bc(e,4,t)}var _n=class extends At{constructor(e){super(e,500)}o(e){return Lt(this,0,7,e)}},Ea=[-1,{}],np=[0,fe,1,Ea],ip=[0,fe,nn,Ea];function Hn(e,t){Lu(e,1,_n,t)}function Ae(e,t){bc(e,10,t)}function ee(e,t){bc(e,15,t)}var Ln=class extends At{constructor(e){super(e,500)}o(e){return Lt(this,0,1001,e)}},q0=[-500,$e,[-500,rs,-1,nn,-3,[-2,ze,be],$e,Zf,gr,-1,np,ip,$e,[0,rs,Vs],rs,ep,gr,nn,987,nn],4,$e,[-500,fe,-1,[-1,{}],998,fe],$e,[-500,fe,nn,-1,[-2,{},be],997,nn,-1],gr,$e,[-500,fe,nn,Ea,998,nn],nn,gr,np,ip,$e,[0,rs,-1,Ea],nn,-2,ep,rs,-1,Vs,[0,Vs,RS],978,Ea,$e,Zf];Ln.prototype.g=Uc(q0);var LS=ms(Ln,q0),IS=class extends At{constructor(e){super(e)}},$0=class extends At{constructor(e){super(e)}g(){return Hi(this,IS,1)}},j0=[0,$e,[0,Be,Ne,fe,-1]],Fc=ms($0,j0),DS=class extends At{constructor(e){super(e)}},US=class extends At{constructor(e){super(e)}},Dl=class extends At{constructor(e){super(e)}l(){return te(this,DS,2)}g(){return Hi(this,US,5)}},K0=ms(class extends At{constructor(e){super(e)}},[0,nn,Wa,Yu,[0,sn,[0,Be,-3],[0,Ne,-3],[0,Be,-1,[0,$e,[0,Be,-2]]],$e,[0,Ne,-1,fe,Ne]],fe,-1,fs,$e,[0,Be,Ne],nn,fs]),Z0=class extends At{constructor(e){super(e)}},Mr=ms(class extends At{constructor(e){super(e)}},[0,$e,[0,Ne,-4]]),J0=class extends At{constructor(e){super(e)}},Xa=ms(class extends At{constructor(e){super(e)}},[0,$e,[0,Ne,-4]]),FS=class extends At{constructor(e){super(e)}},NS=[0,Be,-1,Yu,sn],Q0=class extends At{constructor(e){super(e)}};Q0.prototype.g=Uc([0,Ne,-4,fs]);var OS=class extends At{constructor(e){super(e)}},BS=ms(class extends At{constructor(e){super(e)}},[0,$e,[0,1,Be,fe,j0],fs]),sp=class extends At{constructor(e){super(e)}},kS=class extends At{constructor(e){super(e)}na(){const e=Ee(this,1,void 0,void 0,c0);return e??Xs()}},zS=class extends At{constructor(e){super(e)}},tg=[1,2],VS=ms(class extends At{constructor(e){super(e)}},[0,$e,[0,tg,xe,[0,Yu],xe,[0,z0],Be,fe],fs]),qu=class extends At{constructor(e){super(e)}},eg=[0,fe,Be,Ne,nn,-1],rp=class extends At{constructor(e){super(e)}},GS=[0,be,-1],ap=class extends At{constructor(e){super(e)}},zo=[1,2,3,4,5,6],cc=class extends At{constructor(e){super(e)}g(){return Ee(this,1,void 0,void 0,c0)!=null}l(){return Je(Ee(this,2))!=null}},Re=class extends At{constructor(e){super(e)}g(){return Zm(Ee(this,2))??!1}},ng=[0,z0,fe,[0,Be,fs,-1],[0,TS,fs]],Oe=[0,ng,be,[0,zo,xe,Y0,xe,G0,xe,V0,xe,X0,xe,W0,xe,H0],sn],Nc=class extends At{constructor(e){super(e)}},$u=[0,Oe,Ne,-1,Be],HS=yi(502141897,Nc);ze[502141897]=$u;var WS=ms(class extends At{constructor(e){super(e)}},[0,[0,sn,-1,bS,wS],NS]),ig=class extends At{constructor(e){super(e)}},sg=class extends At{constructor(e){super(e)}},Hh=[0,Oe,Ne,[0,Oe],be],XS=yi(508968150,sg);ze[508968150]=[0,Oe,$u,Hh,Ne,[0,[0,ng]]],ze[508968149]=Hh;var pr=class extends At{constructor(e){super(e)}l(){return te(this,qu,2)}g(){le(this,2)}},rg=[0,Oe,eg];ze[478825465]=rg;var YS=class extends At{constructor(e){super(e)}},ag=class extends At{constructor(e){super(e)}},ju=class extends At{constructor(e){super(e)}},Ku=class extends At{constructor(e){super(e)}},og=class extends At{constructor(e){super(e)}},op=[0,Oe,[0,Oe],rg,-1],cg=[0,Oe,Ne,Be],Zu=[0,Oe,Ne],lg=[0,Oe,cg,Zu,Ne],qS=yi(479097054,og);ze[479097054]=[0,Oe,lg,op],ze[463370452]=op,ze[464864288]=cg;var $S=yi(462713202,Ku);ze[462713202]=lg,ze[474472470]=Zu;var jS=class extends At{constructor(e){super(e)}},hg=class extends At{constructor(e){super(e)}},ug=class extends At{constructor(e){super(e)}},dg=class extends At{constructor(e){super(e)}},Ju=[0,Oe,Ne,-1,Be],Wh=[0,Oe,Ne,be];dg.prototype.g=Uc([0,Oe,Zu,[0,Oe],$u,Hh,Ju,Wh]);var fg=class extends At{constructor(e){super(e)}},KS=yi(456383383,fg);ze[456383383]=[0,Oe,eg];var pg=class extends At{constructor(e){super(e)}},ZS=yi(476348187,pg);ze[476348187]=[0,Oe,GS];var mg=class extends At{constructor(e){super(e)}},cp=class extends At{constructor(e){super(e)}},gg=[0,sn,-1],JS=yi(458105876,class extends At{constructor(e){super(e)}g(){let e;var t=this.v;const n=0|t[bt];return e=wn(this,n),t=function(i,s,r,a){var o=cp;!a&&ta(i)&&(r=0|(s=i.v)[bt]);var c=Gi(s,2);if(i=!1,c==null){if(a)return Gf();c=[]}else if(c.constructor===Vi){if(!(2&c.J)||a)return c;c=c.V()}else Array.isArray(c)?i=!!(2&(0|c[bt])):c=[];if(a){if(!c.length)return Gf();i||(i=!0,ka(c))}else i&&(i=!1,Ca(c),c=l0(c));return!i&&32&r&&Ba(c,32),r=ke(s,r,2,a=new Vi(c,o,tS,void 0)),i||js(s,r),a}(this,t,n,e),!e&&cp&&(t.ra=!0),t}});ze[458105876]=[0,gg,ES,[!0,fs,[0,fe,-1,nn]],[0,Wa,be,sn]];var Qu=class extends At{constructor(e){super(e)}},_g=yi(458105758,Qu);ze[458105758]=[0,Oe,fe,gg];var Ul=class extends At{constructor(e){super(e)}},lp=[0,AS,-1,Vs],QS=class extends At{constructor(e){super(e)}},vg=class extends At{constructor(e){super(e)}},Xh=[1,2];vg.prototype.g=Uc([0,Xh,xe,lp,xe,[0,$e,lp]]);var xg=class extends At{constructor(e){super(e)}},ty=yi(443442058,xg);ze[443442058]=[0,Oe,fe,Be,Ne,nn,-1,be,Ne],ze[514774813]=Ju;var Mg=class extends At{constructor(e){super(e)}},ey=yi(516587230,Mg);function Yh(e,t){return t=t?t.clone():new qu,e.displayNamesLocale!==void 0?le(t,1,Ga(e.displayNamesLocale)):e.displayNamesLocale===void 0&&le(t,1),e.maxResults!==void 0?Wi(t,2,e.maxResults):"maxResults"in e&&le(t,2),e.scoreThreshold!==void 0?Ct(t,3,e.scoreThreshold):"scoreThreshold"in e&&le(t,3),e.categoryAllowlist!==void 0?sc(t,4,e.categoryAllowlist):"categoryAllowlist"in e&&le(t,4),e.categoryDenylist!==void 0?sc(t,5,e.categoryDenylist):"categoryDenylist"in e&&le(t,5),t}function Sg(e){const t=Number(e);return Number.isSafeInteger(t)?t:String(e)}function td(e,t=-1,n=""){return{categories:e.map(i=>({index:zn(i,1)??0??-1,score:Le(i,2)??0,categoryName:Je(Ee(i,3))??""??"",displayName:Je(Ee(i,4))??""??""})),headIndex:t,headName:n}}function ny(e){const t={classifications:Hi(e,OS,1).map(n=>{var i;return td(((i=te(n,$0,4))==null?void 0:i.g())??[],zn(n,2)??0,Je(Ee(n,3))??"")})};return function(n){return n==null?n:typeof n=="bigint"?(Bh(n)?n=Number(n):(n=za(64,n),n=Bh(n)?Number(n):String(n)),n):Va(n)?typeof n=="number"?Su(n):t0(n):void 0}(Ee(e,2,void 0,void 0,nc))!=null&&(t.timestampMs=Sg(Ee(e,2,void 0,void 0,nc)??a0)),t}function yg(e){var a,o;var t=Ns(e,3,ui,Fs()),n=Ns(e,2,Jr,Fs()),i=Ns(e,1,Je,Fs()),s=Ns(e,9,Je,Fs());const r={categories:[],keypoints:[]};for(let c=0;c<t.length;c++)r.categories.push({score:t[c],index:n[c]??-1,categoryName:i[c]??"",displayName:s[c]??""});if((t=(a=te(e,Dl,4))==null?void 0:a.l())&&(r.boundingBox={originX:zn(t,1,es)??0,originY:zn(t,2,es)??0,width:zn(t,3,es)??0,height:zn(t,4,es)??0,angle:0}),(o=te(e,Dl,4))==null?void 0:o.g().length)for(const c of te(e,Dl,4).g())r.keypoints.push({x:Ee(c,1,void 0,es,ui)??0,y:Ee(c,2,void 0,es,ui)??0,score:Ee(c,4,void 0,es,ui)??0,label:Je(Ee(c,3,void 0,es))??""});return r}function Oc(e){const t=[];for(const n of Hi(e,J0,1))t.push({x:Le(n,1)??0,y:Le(n,2)??0,z:Le(n,3)??0,visibility:Le(n,4)??0});return t}function ba(e){const t=[];for(const n of Hi(e,Z0,1))t.push({x:Le(n,1)??0,y:Le(n,2)??0,z:Le(n,3)??0,visibility:Le(n,4)??0});return t}function hp(e){return Array.from(e,t=>t>127?t-256:t)}function up(e,t){if(e.length!==t.length)throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${e.length} vs. ${t.length}).`);let n=0,i=0,s=0;for(let r=0;r<e.length;r++)n+=e[r]*t[r],i+=e[r]*e[r],s+=t[r]*t[r];if(i<=0||s<=0)throw Error("Cannot compute cosine similarity on embedding with 0 norm.");return n/Math.sqrt(i*s)}let bo;ze[516587230]=[0,Oe,Ju,Wh,Ne],ze[518928384]=Wh;const iy=new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]);async function Eg(e){if(e)return!0;if(bo===void 0)try{await WebAssembly.instantiate(iy),bo=!0}catch{bo=!1}return bo}async function Ao(e,t,n){return{wasmLoaderPath:`${t}/${e}_${n=`wasm${n?"_module":""}${await Eg(n)?"":"_nosimd"}_internal`}.js`,wasmBinaryPath:`${t}/${e}_${n}.wasm`}}var Is=class{};function bg(){var e=navigator;return typeof OffscreenCanvas<"u"&&(!function(t=navigator){return(t=t.userAgent).includes("Safari")&&!t.includes("Chrome")}(e)||!!((e=e.userAgent.match(/Version\/([\d]+).*Safari/))&&e.length>=1&&Number(e[1])>=17))}async function dp(e){if(typeof importScripts!="function"){const t=document.createElement("script");return t.src=e.toString(),t.crossOrigin="anonymous",new Promise((n,i)=>{t.addEventListener("load",()=>{n()},!1),t.addEventListener("error",s=>{i(s)},!1),document.body.appendChild(t)})}try{importScripts(e.toString())}catch(t){if(!(t instanceof TypeError))throw t;await self.import(e.toString())}}function Ag(e){return e.videoWidth!==void 0?[e.videoWidth,e.videoHeight]:e.naturalWidth!==void 0?[e.naturalWidth,e.naturalHeight]:e.displayWidth!==void 0?[e.displayWidth,e.displayHeight]:[e.width,e.height]}function wt(e,t,n){e.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"),n(t=e.i.stringToNewUTF8(t)),e.i._free(t)}function fp(e,t,n){if(!e.i.canvas)throw Error("No OpenGL canvas configured.");if(n?e.i._bindTextureToStream(n):e.i._bindTextureToCanvas(),!(n=e.i.canvas.getContext("webgl2")||e.i.canvas.getContext("webgl")))throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");e.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!0),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,t),e.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1);const[i,s]=Ag(t);return!e.l||i===e.i.canvas.width&&s===e.i.canvas.height||(e.i.canvas.width=i,e.i.canvas.height=s),[i,s]}function pp(e,t,n){e.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");const i=new Uint32Array(t.length);for(let s=0;s<t.length;s++)i[s]=e.i.stringToNewUTF8(t[s]);t=e.i._malloc(4*i.length),e.i.HEAPU32.set(i,t>>2),n(t);for(const s of i)e.i._free(s);e.i._free(t)}function si(e,t,n){e.i.simpleListeners=e.i.simpleListeners||{},e.i.simpleListeners[t]=n}function ns(e,t,n){let i=[];e.i.simpleListeners=e.i.simpleListeners||{},e.i.simpleListeners[t]=(s,r,a)=>{r?(n(i,a),i=[]):i.push(s)}}Is.forVisionTasks=function(e,t=!1){return Ao("vision",e??Eo``,t)},Is.forTextTasks=function(e,t=!1){return Ao("text",e??Eo``,t)},Is.forGenAiTasks=function(e,t=!1){return Ao("genai",e??Eo``,t)},Is.forAudioTasks=function(e,t=!1){return Ao("audio",e??Eo``,t)},Is.isSimdSupported=function(e=!1){return Eg(e)};async function sy(e,t,n,i){return e=await(async(s,r,a,o,c)=>{if(r&&await dp(r),!self.ModuleFactory||a&&(await dp(a),!self.ModuleFactory))throw Error("ModuleFactory not set.");return self.Module&&c&&((r=self.Module).locateFile=c.locateFile,c.mainScriptUrlOrBlob&&(r.mainScriptUrlOrBlob=c.mainScriptUrlOrBlob)),c=await self.ModuleFactory(self.Module||c),self.ModuleFactory=self.Module=void 0,new s(c,o)})(e,n.wasmLoaderPath,n.assetLoaderPath,t,{locateFile:s=>s.endsWith(".wasm")?n.wasmBinaryPath.toString():n.assetBinaryPath&&s.endsWith(".data")?n.assetBinaryPath.toString():s}),await e.o(i),e}function Fl(e,t){const n=te(e.baseOptions,cc,1)||new cc;typeof t=="string"?(le(n,2,Ga(t)),le(n,1)):t instanceof Uint8Array&&(le(n,1,_u(t,!1)),le(n,2)),Lt(e.baseOptions,0,1,n)}function mp(e){try{const t=e.H.length;if(t===1)throw Error(e.H[0].message);if(t>1)throw Error("Encountered multiple errors: "+e.H.map(n=>n.message).join(", "))}finally{e.H=[]}}function mt(e,t){e.C=Math.max(e.C,t)}function Bc(e,t){e.B=new _n,Rn(e.B,2,"PassThroughCalculator"),Me(e.B,"free_memory"),$t(e.B,"free_memory_unused_out"),Ae(t,"free_memory"),Hn(t,e.B)}function zr(e,t){Me(e.B,t),$t(e.B,t+"_unused_out")}function kc(e){e.g.addBoolToStream(!0,"free_memory",e.C)}var qh=class{constructor(e){this.g=e,this.H=[],this.C=0,this.g.setAutoRenderToScreen(!1)}l(e,t=!0){var n,i,s,r,a,o;if(t){const c=e.baseOptions||{};if((n=e.baseOptions)!=null&&n.modelAssetBuffer&&((i=e.baseOptions)!=null&&i.modelAssetPath))throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");if(!((s=te(this.baseOptions,cc,1))!=null&&s.g()||(r=te(this.baseOptions,cc,1))!=null&&r.l()||(a=e.baseOptions)!=null&&a.modelAssetBuffer||(o=e.baseOptions)!=null&&o.modelAssetPath))throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");if(function(l,u){let d=te(l.baseOptions,ap,3);if(!d){var h=d=new ap,m=new tp;ya(h,4,zo,m)}"delegate"in u&&(u.delegate==="GPU"?(u=d,h=new PS,ya(u,2,zo,h)):(u=d,h=new tp,ya(u,4,zo,h))),Lt(l.baseOptions,0,3,d)}(this,c),c.modelAssetPath)return fetch(c.modelAssetPath.toString()).then(l=>{if(l.ok)return l.arrayBuffer();throw Error(`Failed to fetch model: ${c.modelAssetPath} (${l.status})`)}).then(l=>{try{this.g.i.FS_unlink("/model.dat")}catch{}this.g.i.FS_createDataFile("/","model.dat",new Uint8Array(l),!0,!1,!1),Fl(this,"/model.dat"),this.m(),this.L()});if(c.modelAssetBuffer instanceof Uint8Array)Fl(this,c.modelAssetBuffer);else if(c.modelAssetBuffer)return async function(l){const u=[];for(var d=0;;){const{done:h,value:m}=await l.read();if(h)break;u.push(m),d+=m.length}if(u.length===0)return new Uint8Array(0);if(u.length===1)return u[0];l=new Uint8Array(d),d=0;for(const h of u)l.set(h,d),d+=h.length;return l}(c.modelAssetBuffer).then(l=>{Fl(this,l),this.m(),this.L()})}return this.m(),this.L(),Promise.resolve()}L(){}ca(){let e;if(this.g.ca(t=>{e=LS(t)}),!e)throw Error("Failed to retrieve CalculatorGraphConfig");return e}setGraph(e,t){this.g.attachErrorListener((n,i)=>{this.H.push(Error(i))}),this.g.Ja(),this.g.setGraph(e,t),this.B=void 0,mp(this)}finishProcessing(){this.g.finishProcessing(),mp(this)}close(){this.B=void 0,this.g.closeGraph()}};function ls(e,t){if(!e)throw Error(`Unable to obtain required WebGL resource: ${t}`);return e}qh.prototype.close=qh.prototype.close;class ry{constructor(t,n,i,s){this.g=t,this.h=n,this.m=i,this.l=s}bind(){this.g.bindVertexArray(this.h)}close(){this.g.deleteVertexArray(this.h),this.g.deleteBuffer(this.m),this.g.deleteBuffer(this.l)}}function gp(e,t,n){const i=e.g;if(n=ls(i.createShader(n),"Failed to create WebGL shader"),i.shaderSource(n,t),i.compileShader(n),!i.getShaderParameter(n,i.COMPILE_STATUS))throw Error(`Could not compile WebGL shader: ${i.getShaderInfoLog(n)}`);return i.attachShader(e.h,n),n}function _p(e,t){const n=e.g,i=ls(n.createVertexArray(),"Failed to create vertex array");n.bindVertexArray(i);const s=ls(n.createBuffer(),"Failed to create buffer");n.bindBuffer(n.ARRAY_BUFFER,s),n.enableVertexAttribArray(e.O),n.vertexAttribPointer(e.O,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),n.STATIC_DRAW);const r=ls(n.createBuffer(),"Failed to create buffer");return n.bindBuffer(n.ARRAY_BUFFER,r),n.enableVertexAttribArray(e.L),n.vertexAttribPointer(e.L,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array(t?[0,1,0,0,1,0,1,1]:[0,0,0,1,1,1,1,0]),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,null),n.bindVertexArray(null),new ry(n,i,s,r)}function ed(e,t){if(e.g){if(t!==e.g)throw Error("Cannot change GL context once initialized")}else e.g=t}function ay(e,t,n,i){return ed(e,t),e.h||(e.m(),e.D()),n?(e.u||(e.u=_p(e,!0)),n=e.u):(e.A||(e.A=_p(e,!1)),n=e.A),t.useProgram(e.h),n.bind(),e.l(),e=i(),n.g.bindVertexArray(null),e}function Tg(e,t,n){return ed(e,t),e=ls(t.createTexture(),"Failed to create texture"),t.bindTexture(t.TEXTURE_2D,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,n??t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,n??t.LINEAR),t.bindTexture(t.TEXTURE_2D,null),e}function wg(e,t,n){ed(e,t),e.B||(e.B=ls(t.createFramebuffer(),"Failed to create framebuffe.")),t.bindFramebuffer(t.FRAMEBUFFER,e.B),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,n,0)}function oy(e){var t;(t=e.g)==null||t.bindFramebuffer(e.g.FRAMEBUFFER,null)}var Rg=class{H(){return`
  precision mediump float;
  varying vec2 vTex;
  uniform sampler2D inputTexture;
  void main() {
    gl_FragColor = texture2D(inputTexture, vTex);
  }
 `}m(){const e=this.g;if(this.h=ls(e.createProgram(),"Failed to create WebGL program"),this.X=gp(this,`
  attribute vec2 aVertex;
  attribute vec2 aTex;
  varying vec2 vTex;
  void main(void) {
    gl_Position = vec4(aVertex, 0.0, 1.0);
    vTex = aTex;
  }`,e.VERTEX_SHADER),this.W=gp(this,this.H(),e.FRAGMENT_SHADER),e.linkProgram(this.h),!e.getProgramParameter(this.h,e.LINK_STATUS))throw Error(`Error during program linking: ${e.getProgramInfoLog(this.h)}`);this.O=e.getAttribLocation(this.h,"aVertex"),this.L=e.getAttribLocation(this.h,"aTex")}D(){}l(){}close(){if(this.h){const e=this.g;e.deleteProgram(this.h),e.deleteShader(this.X),e.deleteShader(this.W)}this.B&&this.g.deleteFramebuffer(this.B),this.A&&this.A.close(),this.u&&this.u.close()}};function Ii(e,t){switch(t){case 0:return e.g.find(n=>n instanceof Uint8Array);case 1:return e.g.find(n=>n instanceof Float32Array);case 2:return e.g.find(n=>typeof WebGLTexture<"u"&&n instanceof WebGLTexture);default:throw Error(`Type is not supported: ${t}`)}}function $h(e){var t=Ii(e,1);if(!t){if(t=Ii(e,0))t=new Float32Array(t).map(i=>i/255);else{t=new Float32Array(e.width*e.height);const i=Vr(e);var n=nd(e);if(wg(n,i,Cg(e)),"iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"document"in self&&"ontouchend"in self.document){n=new Float32Array(e.width*e.height*4),i.readPixels(0,0,e.width,e.height,i.RGBA,i.FLOAT,n);for(let s=0,r=0;s<t.length;++s,r+=4)t[s]=n[r]}else i.readPixels(0,0,e.width,e.height,i.RED,i.FLOAT,t)}e.g.push(t)}return t}function Cg(e){let t=Ii(e,2);if(!t){const n=Vr(e);t=Lg(e);const i=$h(e),s=Pg(e);n.texImage2D(n.TEXTURE_2D,0,s,e.width,e.height,0,n.RED,n.FLOAT,i),jh(e)}return t}function Vr(e){if(!e.canvas)throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");return e.h||(e.h=ls(e.canvas.getContext("webgl2"),"You cannot use a canvas that is already bound to a different type of rendering context.")),e.h}function Pg(e){if(e=Vr(e),!To)if(e.getExtension("EXT_color_buffer_float")&&e.getExtension("OES_texture_float_linear")&&e.getExtension("EXT_float_blend"))To=e.R32F;else{if(!e.getExtension("EXT_color_buffer_half_float"))throw Error("GPU does not fully support 4-channel float32 or float16 formats");To=e.R16F}return To}function nd(e){return e.l||(e.l=new Rg),e.l}function Lg(e){const t=Vr(e);t.viewport(0,0,e.width,e.height),t.activeTexture(t.TEXTURE0);let n=Ii(e,2);return n||(n=Tg(nd(e),t,e.m?t.LINEAR:t.NEAREST),e.g.push(n),e.j=!0),t.bindTexture(t.TEXTURE_2D,n),n}function jh(e){e.h.bindTexture(e.h.TEXTURE_2D,null)}var To,qe=class{constructor(e,t,n,i,s,r,a){this.g=e,this.m=t,this.j=n,this.canvas=i,this.l=s,this.width=r,this.height=a,this.j&&--vp===0&&console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources.")}Fa(){return!!Ii(this,0)}ka(){return!!Ii(this,1)}R(){return!!Ii(this,2)}ja(){return(t=Ii(e=this,0))||(t=$h(e),t=new Uint8Array(t.map(n=>Math.round(255*n))),e.g.push(t)),t;var e,t}ia(){return $h(this)}N(){return Cg(this)}clone(){const e=[];for(const t of this.g){let n;if(t instanceof Uint8Array)n=new Uint8Array(t);else if(t instanceof Float32Array)n=new Float32Array(t);else{if(!(t instanceof WebGLTexture))throw Error(`Type is not supported: ${t}`);{const i=Vr(this),s=nd(this);i.activeTexture(i.TEXTURE1),n=Tg(s,i,this.m?i.LINEAR:i.NEAREST),i.bindTexture(i.TEXTURE_2D,n);const r=Pg(this);i.texImage2D(i.TEXTURE_2D,0,r,this.width,this.height,0,i.RED,i.FLOAT,null),i.bindTexture(i.TEXTURE_2D,null),wg(s,i,n),ay(s,i,!1,()=>{Lg(this),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.drawArrays(i.TRIANGLE_FAN,0,4),jh(this)}),oy(s),jh(this)}}e.push(n)}return new qe(e,this.m,this.R(),this.canvas,this.l,this.width,this.height)}close(){this.j&&Vr(this).deleteTexture(Ii(this,2)),vp=-1}};qe.prototype.close=qe.prototype.close,qe.prototype.clone=qe.prototype.clone,qe.prototype.getAsWebGLTexture=qe.prototype.N,qe.prototype.getAsFloat32Array=qe.prototype.ia,qe.prototype.getAsUint8Array=qe.prototype.ja,qe.prototype.hasWebGLTexture=qe.prototype.R,qe.prototype.hasFloat32Array=qe.prototype.ka,qe.prototype.hasUint8Array=qe.prototype.Fa;var vp=250;function Jn(...e){return e.map(([t,n])=>({start:t,end:n}))}const cy=function(e){return class extends e{Ja(){this.i._registerModelResourcesGraphService()}}}((xp=class{constructor(e,t){this.l=!0,this.i=e,this.g=null,this.h=0,this.m=typeof this.i._addIntToInputStream=="function",t!==void 0?this.i.canvas=t:bg()?this.i.canvas=new OffscreenCanvas(1,1):(console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."),this.i.canvas=document.createElement("canvas"))}async initializeGraph(e){const t=await(await fetch(e)).arrayBuffer();e=!(e.endsWith(".pbtxt")||e.endsWith(".textproto")),this.setGraph(new Uint8Array(t),e)}setGraphFromString(e){this.setGraph(new TextEncoder().encode(e),!1)}setGraph(e,t){const n=e.length,i=this.i._malloc(n);this.i.HEAPU8.set(e,i),t?this.i._changeBinaryGraph(n,i):this.i._changeTextGraph(n,i),this.i._free(i)}configureAudio(e,t,n,i,s){this.i._configureAudio||console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'),wt(this,i||"input_audio",r=>{wt(this,s=s||"audio_header",a=>{this.i._configureAudio(r,a,e,t??0,n)})})}setAutoResizeCanvas(e){this.l=e}setAutoRenderToScreen(e){this.i._setAutoRenderToScreen(e)}setGpuBufferVerticalFlip(e){this.i.gpuOriginForWebTexturesIsBottomLeft=e}ca(e){si(this,"__graph_config__",t=>{e(t)}),wt(this,"__graph_config__",t=>{this.i._getGraphConfig(t,void 0)}),delete this.i.simpleListeners.__graph_config__}attachErrorListener(e){this.i.errorListener=e}attachEmptyPacketListener(e,t){this.i.emptyPacketListeners=this.i.emptyPacketListeners||{},this.i.emptyPacketListeners[e]=t}addAudioToStream(e,t,n){this.addAudioToStreamWithShape(e,0,0,t,n)}addAudioToStreamWithShape(e,t,n,i,s){const r=4*e.length;this.h!==r&&(this.g&&this.i._free(this.g),this.g=this.i._malloc(r),this.h=r),this.i.HEAPF32.set(e,this.g/4),wt(this,i,a=>{this.i._addAudioToInputStream(this.g,t,n,a,s)})}addGpuBufferToStream(e,t,n){wt(this,t,i=>{const[s,r]=fp(this,e,i);this.i._addBoundTextureToStream(i,s,r,n)})}addBoolToStream(e,t,n){wt(this,t,i=>{this.i._addBoolToInputStream(e,i,n)})}addDoubleToStream(e,t,n){wt(this,t,i=>{this.i._addDoubleToInputStream(e,i,n)})}addFloatToStream(e,t,n){wt(this,t,i=>{this.i._addFloatToInputStream(e,i,n)})}addIntToStream(e,t,n){wt(this,t,i=>{this.i._addIntToInputStream(e,i,n)})}addUintToStream(e,t,n){wt(this,t,i=>{this.i._addUintToInputStream(e,i,n)})}addStringToStream(e,t,n){wt(this,t,i=>{wt(this,e,s=>{this.i._addStringToInputStream(s,i,n)})})}addStringRecordToStream(e,t,n){wt(this,t,i=>{pp(this,Object.keys(e),s=>{pp(this,Object.values(e),r=>{this.i._addFlatHashMapToInputStream(s,r,Object.keys(e).length,i,n)})})})}addProtoToStream(e,t,n,i){wt(this,n,s=>{wt(this,t,r=>{const a=this.i._malloc(e.length);this.i.HEAPU8.set(e,a),this.i._addProtoToInputStream(a,e.length,r,s,i),this.i._free(a)})})}addEmptyPacketToStream(e,t){wt(this,e,n=>{this.i._addEmptyPacketToInputStream(n,t)})}addBoolVectorToStream(e,t,n){wt(this,t,i=>{const s=this.i._allocateBoolVector(e.length);if(!s)throw Error("Unable to allocate new bool vector on heap.");for(const r of e)this.i._addBoolVectorEntry(s,r);this.i._addBoolVectorToInputStream(s,i,n)})}addDoubleVectorToStream(e,t,n){wt(this,t,i=>{const s=this.i._allocateDoubleVector(e.length);if(!s)throw Error("Unable to allocate new double vector on heap.");for(const r of e)this.i._addDoubleVectorEntry(s,r);this.i._addDoubleVectorToInputStream(s,i,n)})}addFloatVectorToStream(e,t,n){wt(this,t,i=>{const s=this.i._allocateFloatVector(e.length);if(!s)throw Error("Unable to allocate new float vector on heap.");for(const r of e)this.i._addFloatVectorEntry(s,r);this.i._addFloatVectorToInputStream(s,i,n)})}addIntVectorToStream(e,t,n){wt(this,t,i=>{const s=this.i._allocateIntVector(e.length);if(!s)throw Error("Unable to allocate new int vector on heap.");for(const r of e)this.i._addIntVectorEntry(s,r);this.i._addIntVectorToInputStream(s,i,n)})}addUintVectorToStream(e,t,n){wt(this,t,i=>{const s=this.i._allocateUintVector(e.length);if(!s)throw Error("Unable to allocate new unsigned int vector on heap.");for(const r of e)this.i._addUintVectorEntry(s,r);this.i._addUintVectorToInputStream(s,i,n)})}addStringVectorToStream(e,t,n){wt(this,t,i=>{const s=this.i._allocateStringVector(e.length);if(!s)throw Error("Unable to allocate new string vector on heap.");for(const r of e)wt(this,r,a=>{this.i._addStringVectorEntry(s,a)});this.i._addStringVectorToInputStream(s,i,n)})}addBoolToInputSidePacket(e,t){wt(this,t,n=>{this.i._addBoolToInputSidePacket(e,n)})}addDoubleToInputSidePacket(e,t){wt(this,t,n=>{this.i._addDoubleToInputSidePacket(e,n)})}addFloatToInputSidePacket(e,t){wt(this,t,n=>{this.i._addFloatToInputSidePacket(e,n)})}addIntToInputSidePacket(e,t){wt(this,t,n=>{this.i._addIntToInputSidePacket(e,n)})}addUintToInputSidePacket(e,t){wt(this,t,n=>{this.i._addUintToInputSidePacket(e,n)})}addStringToInputSidePacket(e,t){wt(this,t,n=>{wt(this,e,i=>{this.i._addStringToInputSidePacket(i,n)})})}addProtoToInputSidePacket(e,t,n){wt(this,n,i=>{wt(this,t,s=>{const r=this.i._malloc(e.length);this.i.HEAPU8.set(e,r),this.i._addProtoToInputSidePacket(r,e.length,s,i),this.i._free(r)})})}addBoolVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateBoolVector(e.length);if(!i)throw Error("Unable to allocate new bool vector on heap.");for(const s of e)this.i._addBoolVectorEntry(i,s);this.i._addBoolVectorToInputSidePacket(i,n)})}addDoubleVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateDoubleVector(e.length);if(!i)throw Error("Unable to allocate new double vector on heap.");for(const s of e)this.i._addDoubleVectorEntry(i,s);this.i._addDoubleVectorToInputSidePacket(i,n)})}addFloatVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateFloatVector(e.length);if(!i)throw Error("Unable to allocate new float vector on heap.");for(const s of e)this.i._addFloatVectorEntry(i,s);this.i._addFloatVectorToInputSidePacket(i,n)})}addIntVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateIntVector(e.length);if(!i)throw Error("Unable to allocate new int vector on heap.");for(const s of e)this.i._addIntVectorEntry(i,s);this.i._addIntVectorToInputSidePacket(i,n)})}addUintVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateUintVector(e.length);if(!i)throw Error("Unable to allocate new unsigned int vector on heap.");for(const s of e)this.i._addUintVectorEntry(i,s);this.i._addUintVectorToInputSidePacket(i,n)})}addStringVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateStringVector(e.length);if(!i)throw Error("Unable to allocate new string vector on heap.");for(const s of e)wt(this,s,r=>{this.i._addStringVectorEntry(i,r)});this.i._addStringVectorToInputSidePacket(i,n)})}attachBoolListener(e,t){si(this,e,t),wt(this,e,n=>{this.i._attachBoolListener(n)})}attachBoolVectorListener(e,t){ns(this,e,t),wt(this,e,n=>{this.i._attachBoolVectorListener(n)})}attachIntListener(e,t){si(this,e,t),wt(this,e,n=>{this.i._attachIntListener(n)})}attachIntVectorListener(e,t){ns(this,e,t),wt(this,e,n=>{this.i._attachIntVectorListener(n)})}attachUintListener(e,t){si(this,e,t),wt(this,e,n=>{this.i._attachUintListener(n)})}attachUintVectorListener(e,t){ns(this,e,t),wt(this,e,n=>{this.i._attachUintVectorListener(n)})}attachDoubleListener(e,t){si(this,e,t),wt(this,e,n=>{this.i._attachDoubleListener(n)})}attachDoubleVectorListener(e,t){ns(this,e,t),wt(this,e,n=>{this.i._attachDoubleVectorListener(n)})}attachFloatListener(e,t){si(this,e,t),wt(this,e,n=>{this.i._attachFloatListener(n)})}attachFloatVectorListener(e,t){ns(this,e,t),wt(this,e,n=>{this.i._attachFloatVectorListener(n)})}attachStringListener(e,t){si(this,e,t),wt(this,e,n=>{this.i._attachStringListener(n)})}attachStringVectorListener(e,t){ns(this,e,t),wt(this,e,n=>{this.i._attachStringVectorListener(n)})}attachProtoListener(e,t,n){si(this,e,t),wt(this,e,i=>{this.i._attachProtoListener(i,n||!1)})}attachProtoVectorListener(e,t,n){ns(this,e,t),wt(this,e,i=>{this.i._attachProtoVectorListener(i,n||!1)})}attachAudioListener(e,t,n){this.i._attachAudioListener||console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'),si(this,e,(i,s)=>{i=new Float32Array(i.buffer,i.byteOffset,i.length/4),t(i,s)}),wt(this,e,i=>{this.i._attachAudioListener(i,n||!1)})}finishProcessing(){this.i._waitUntilIdle()}closeGraph(){this.i._closeGraph(),this.i.simpleListeners=void 0,this.i.emptyPacketListeners=void 0}},class extends xp{get ga(){return this.i}pa(e,t,n){wt(this,t,i=>{const[s,r]=fp(this,e,i);this.ga._addBoundTextureAsImageToStream(i,s,r,n)})}Z(e,t){si(this,e,t),wt(this,e,n=>{this.ga._attachImageListener(n)})}aa(e,t){ns(this,e,t),wt(this,e,n=>{this.ga._attachImageVectorListener(n)})}}));var xp,Qn=class extends cy{};async function Zt(e,t,n){return async function(i,s,r,a){return sy(i,s,r,a)}(e,n.canvas??(bg()?void 0:document.createElement("canvas")),t,n)}function Ig(e,t,n,i){if(e.U){const r=new Q0;if(n!=null&&n.regionOfInterest){if(!e.oa)throw Error("This task doesn't support region-of-interest.");var s=n.regionOfInterest;if(s.left>=s.right||s.top>=s.bottom)throw Error("Expected RectF with left < right and top < bottom.");if(s.left<0||s.top<0||s.right>1||s.bottom>1)throw Error("Expected RectF values to be in [0,1].");Ct(r,1,(s.left+s.right)/2),Ct(r,2,(s.top+s.bottom)/2),Ct(r,4,s.right-s.left),Ct(r,3,s.bottom-s.top)}else Ct(r,1,.5),Ct(r,2,.5),Ct(r,4,1),Ct(r,3,1);if(n!=null&&n.rotationDegrees){if((n==null?void 0:n.rotationDegrees)%90!=0)throw Error("Expected rotation to be a multiple of 90°.");if(Ct(r,5,-Math.PI*n.rotationDegrees/180),(n==null?void 0:n.rotationDegrees)%180!=0){const[a,o]=Ag(t);n=Le(r,3)*o/a,s=Le(r,4)*a/o,Ct(r,4,n),Ct(r,3,s)}}e.g.addProtoToStream(r.g(),"mediapipe.NormalizedRect",e.U,i)}e.g.pa(t,e.X,i??performance.now()),e.finishProcessing()}function ti(e,t,n){var i;if((i=e.baseOptions)!=null&&i.g())throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");Ig(e,t,n,e.C+1)}function Ei(e,t,n,i){var s;if(!((s=e.baseOptions)!=null&&s.g()))throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");Ig(e,t,n,i)}function Gr(e,t,n,i){var s=t.data;const r=t.width,a=r*(t=t.height);if((s instanceof Uint8Array||s instanceof Float32Array)&&s.length!==a)throw Error("Unsupported channel count: "+s.length/a);return e=new qe([s],n,!1,e.g.i.canvas,e.P,r,t),i?e.clone():e}var Cn=class extends qh{constructor(e,t,n,i){super(e),this.g=e,this.X=t,this.U=n,this.oa=i,this.P=new Rg}l(e,t=!0){if("runningMode"in e&&le(this.baseOptions,2,La(!!e.runningMode&&e.runningMode!=="IMAGE")),e.canvas!==void 0&&this.g.i.canvas!==e.canvas)throw Error("You must create a new task to reset the canvas.");return super.l(e,t)}close(){this.P.close(),super.close()}};Cn.prototype.close=Cn.prototype.close;var Dn=class extends Cn{constructor(e,t){super(new Qn(e,t),"image_in","norm_rect_in",!1),this.j={detections:[]},Lt(e=this.h=new Nc,0,1,t=new Re),Ct(this.h,2,.5),Ct(this.h,3,.3)}get baseOptions(){return te(this.h,Re,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return"minDetectionConfidence"in e&&Ct(this.h,2,e.minDetectionConfidence??.5),"minSuppressionThreshold"in e&&Ct(this.h,3,e.minSuppressionThreshold??.3),this.l(e)}F(e,t){return this.j={detections:[]},ti(this,e,t),this.j}G(e,t,n){return this.j={detections:[]},Ei(this,e,n,t),this.j}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"norm_rect_in"),ee(e,"detections");const t=new Pn;Si(t,HS,this.h);const n=new _n;Rn(n,2,"mediapipe.tasks.vision.face_detector.FaceDetectorGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect_in"),$t(n,"DETECTIONS:detections"),n.o(t),Hn(e,n),this.g.attachProtoVectorListener("detections",(i,s)=>{for(const r of i)i=K0(r),this.j.detections.push(yg(i));mt(this,s)}),this.g.attachEmptyPacketListener("detections",i=>{mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Dn.prototype.detectForVideo=Dn.prototype.G,Dn.prototype.detect=Dn.prototype.F,Dn.prototype.setOptions=Dn.prototype.o,Dn.createFromModelPath=async function(e,t){return Zt(Dn,e,{baseOptions:{modelAssetPath:t}})},Dn.createFromModelBuffer=function(e,t){return Zt(Dn,e,{baseOptions:{modelAssetBuffer:t}})},Dn.createFromOptions=function(e,t){return Zt(Dn,e,t)};var id=Jn([61,146],[146,91],[91,181],[181,84],[84,17],[17,314],[314,405],[405,321],[321,375],[375,291],[61,185],[185,40],[40,39],[39,37],[37,0],[0,267],[267,269],[269,270],[270,409],[409,291],[78,95],[95,88],[88,178],[178,87],[87,14],[14,317],[317,402],[402,318],[318,324],[324,308],[78,191],[191,80],[80,81],[81,82],[82,13],[13,312],[312,311],[311,310],[310,415],[415,308]),sd=Jn([263,249],[249,390],[390,373],[373,374],[374,380],[380,381],[381,382],[382,362],[263,466],[466,388],[388,387],[387,386],[386,385],[385,384],[384,398],[398,362]),rd=Jn([276,283],[283,282],[282,295],[295,285],[300,293],[293,334],[334,296],[296,336]),Dg=Jn([474,475],[475,476],[476,477],[477,474]),ad=Jn([33,7],[7,163],[163,144],[144,145],[145,153],[153,154],[154,155],[155,133],[33,246],[246,161],[161,160],[160,159],[159,158],[158,157],[157,173],[173,133]),od=Jn([46,53],[53,52],[52,65],[65,55],[70,63],[63,105],[105,66],[66,107]),Ug=Jn([469,470],[470,471],[471,472],[472,469]),cd=Jn([10,338],[338,297],[297,332],[332,284],[284,251],[251,389],[389,356],[356,454],[454,323],[323,361],[361,288],[288,397],[397,365],[365,379],[379,378],[378,400],[400,377],[377,152],[152,148],[148,176],[176,149],[149,150],[150,136],[136,172],[172,58],[58,132],[132,93],[93,234],[234,127],[127,162],[162,21],[21,54],[54,103],[103,67],[67,109],[109,10]),Fg=[...id,...sd,...rd,...ad,...od,...cd],Ng=Jn([127,34],[34,139],[139,127],[11,0],[0,37],[37,11],[232,231],[231,120],[120,232],[72,37],[37,39],[39,72],[128,121],[121,47],[47,128],[232,121],[121,128],[128,232],[104,69],[69,67],[67,104],[175,171],[171,148],[148,175],[118,50],[50,101],[101,118],[73,39],[39,40],[40,73],[9,151],[151,108],[108,9],[48,115],[115,131],[131,48],[194,204],[204,211],[211,194],[74,40],[40,185],[185,74],[80,42],[42,183],[183,80],[40,92],[92,186],[186,40],[230,229],[229,118],[118,230],[202,212],[212,214],[214,202],[83,18],[18,17],[17,83],[76,61],[61,146],[146,76],[160,29],[29,30],[30,160],[56,157],[157,173],[173,56],[106,204],[204,194],[194,106],[135,214],[214,192],[192,135],[203,165],[165,98],[98,203],[21,71],[71,68],[68,21],[51,45],[45,4],[4,51],[144,24],[24,23],[23,144],[77,146],[146,91],[91,77],[205,50],[50,187],[187,205],[201,200],[200,18],[18,201],[91,106],[106,182],[182,91],[90,91],[91,181],[181,90],[85,84],[84,17],[17,85],[206,203],[203,36],[36,206],[148,171],[171,140],[140,148],[92,40],[40,39],[39,92],[193,189],[189,244],[244,193],[159,158],[158,28],[28,159],[247,246],[246,161],[161,247],[236,3],[3,196],[196,236],[54,68],[68,104],[104,54],[193,168],[168,8],[8,193],[117,228],[228,31],[31,117],[189,193],[193,55],[55,189],[98,97],[97,99],[99,98],[126,47],[47,100],[100,126],[166,79],[79,218],[218,166],[155,154],[154,26],[26,155],[209,49],[49,131],[131,209],[135,136],[136,150],[150,135],[47,126],[126,217],[217,47],[223,52],[52,53],[53,223],[45,51],[51,134],[134,45],[211,170],[170,140],[140,211],[67,69],[69,108],[108,67],[43,106],[106,91],[91,43],[230,119],[119,120],[120,230],[226,130],[130,247],[247,226],[63,53],[53,52],[52,63],[238,20],[20,242],[242,238],[46,70],[70,156],[156,46],[78,62],[62,96],[96,78],[46,53],[53,63],[63,46],[143,34],[34,227],[227,143],[123,117],[117,111],[111,123],[44,125],[125,19],[19,44],[236,134],[134,51],[51,236],[216,206],[206,205],[205,216],[154,153],[153,22],[22,154],[39,37],[37,167],[167,39],[200,201],[201,208],[208,200],[36,142],[142,100],[100,36],[57,212],[212,202],[202,57],[20,60],[60,99],[99,20],[28,158],[158,157],[157,28],[35,226],[226,113],[113,35],[160,159],[159,27],[27,160],[204,202],[202,210],[210,204],[113,225],[225,46],[46,113],[43,202],[202,204],[204,43],[62,76],[76,77],[77,62],[137,123],[123,116],[116,137],[41,38],[38,72],[72,41],[203,129],[129,142],[142,203],[64,98],[98,240],[240,64],[49,102],[102,64],[64,49],[41,73],[73,74],[74,41],[212,216],[216,207],[207,212],[42,74],[74,184],[184,42],[169,170],[170,211],[211,169],[170,149],[149,176],[176,170],[105,66],[66,69],[69,105],[122,6],[6,168],[168,122],[123,147],[147,187],[187,123],[96,77],[77,90],[90,96],[65,55],[55,107],[107,65],[89,90],[90,180],[180,89],[101,100],[100,120],[120,101],[63,105],[105,104],[104,63],[93,137],[137,227],[227,93],[15,86],[86,85],[85,15],[129,102],[102,49],[49,129],[14,87],[87,86],[86,14],[55,8],[8,9],[9,55],[100,47],[47,121],[121,100],[145,23],[23,22],[22,145],[88,89],[89,179],[179,88],[6,122],[122,196],[196,6],[88,95],[95,96],[96,88],[138,172],[172,136],[136,138],[215,58],[58,172],[172,215],[115,48],[48,219],[219,115],[42,80],[80,81],[81,42],[195,3],[3,51],[51,195],[43,146],[146,61],[61,43],[171,175],[175,199],[199,171],[81,82],[82,38],[38,81],[53,46],[46,225],[225,53],[144,163],[163,110],[110,144],[52,65],[65,66],[66,52],[229,228],[228,117],[117,229],[34,127],[127,234],[234,34],[107,108],[108,69],[69,107],[109,108],[108,151],[151,109],[48,64],[64,235],[235,48],[62,78],[78,191],[191,62],[129,209],[209,126],[126,129],[111,35],[35,143],[143,111],[117,123],[123,50],[50,117],[222,65],[65,52],[52,222],[19,125],[125,141],[141,19],[221,55],[55,65],[65,221],[3,195],[195,197],[197,3],[25,7],[7,33],[33,25],[220,237],[237,44],[44,220],[70,71],[71,139],[139,70],[122,193],[193,245],[245,122],[247,130],[130,33],[33,247],[71,21],[21,162],[162,71],[170,169],[169,150],[150,170],[188,174],[174,196],[196,188],[216,186],[186,92],[92,216],[2,97],[97,167],[167,2],[141,125],[125,241],[241,141],[164,167],[167,37],[37,164],[72,38],[38,12],[12,72],[38,82],[82,13],[13,38],[63,68],[68,71],[71,63],[226,35],[35,111],[111,226],[101,50],[50,205],[205,101],[206,92],[92,165],[165,206],[209,198],[198,217],[217,209],[165,167],[167,97],[97,165],[220,115],[115,218],[218,220],[133,112],[112,243],[243,133],[239,238],[238,241],[241,239],[214,135],[135,169],[169,214],[190,173],[173,133],[133,190],[171,208],[208,32],[32,171],[125,44],[44,237],[237,125],[86,87],[87,178],[178,86],[85,86],[86,179],[179,85],[84,85],[85,180],[180,84],[83,84],[84,181],[181,83],[201,83],[83,182],[182,201],[137,93],[93,132],[132,137],[76,62],[62,183],[183,76],[61,76],[76,184],[184,61],[57,61],[61,185],[185,57],[212,57],[57,186],[186,212],[214,207],[207,187],[187,214],[34,143],[143,156],[156,34],[79,239],[239,237],[237,79],[123,137],[137,177],[177,123],[44,1],[1,4],[4,44],[201,194],[194,32],[32,201],[64,102],[102,129],[129,64],[213,215],[215,138],[138,213],[59,166],[166,219],[219,59],[242,99],[99,97],[97,242],[2,94],[94,141],[141,2],[75,59],[59,235],[235,75],[24,110],[110,228],[228,24],[25,130],[130,226],[226,25],[23,24],[24,229],[229,23],[22,23],[23,230],[230,22],[26,22],[22,231],[231,26],[112,26],[26,232],[232,112],[189,190],[190,243],[243,189],[221,56],[56,190],[190,221],[28,56],[56,221],[221,28],[27,28],[28,222],[222,27],[29,27],[27,223],[223,29],[30,29],[29,224],[224,30],[247,30],[30,225],[225,247],[238,79],[79,20],[20,238],[166,59],[59,75],[75,166],[60,75],[75,240],[240,60],[147,177],[177,215],[215,147],[20,79],[79,166],[166,20],[187,147],[147,213],[213,187],[112,233],[233,244],[244,112],[233,128],[128,245],[245,233],[128,114],[114,188],[188,128],[114,217],[217,174],[174,114],[131,115],[115,220],[220,131],[217,198],[198,236],[236,217],[198,131],[131,134],[134,198],[177,132],[132,58],[58,177],[143,35],[35,124],[124,143],[110,163],[163,7],[7,110],[228,110],[110,25],[25,228],[356,389],[389,368],[368,356],[11,302],[302,267],[267,11],[452,350],[350,349],[349,452],[302,303],[303,269],[269,302],[357,343],[343,277],[277,357],[452,453],[453,357],[357,452],[333,332],[332,297],[297,333],[175,152],[152,377],[377,175],[347,348],[348,330],[330,347],[303,304],[304,270],[270,303],[9,336],[336,337],[337,9],[278,279],[279,360],[360,278],[418,262],[262,431],[431,418],[304,408],[408,409],[409,304],[310,415],[415,407],[407,310],[270,409],[409,410],[410,270],[450,348],[348,347],[347,450],[422,430],[430,434],[434,422],[313,314],[314,17],[17,313],[306,307],[307,375],[375,306],[387,388],[388,260],[260,387],[286,414],[414,398],[398,286],[335,406],[406,418],[418,335],[364,367],[367,416],[416,364],[423,358],[358,327],[327,423],[251,284],[284,298],[298,251],[281,5],[5,4],[4,281],[373,374],[374,253],[253,373],[307,320],[320,321],[321,307],[425,427],[427,411],[411,425],[421,313],[313,18],[18,421],[321,405],[405,406],[406,321],[320,404],[404,405],[405,320],[315,16],[16,17],[17,315],[426,425],[425,266],[266,426],[377,400],[400,369],[369,377],[322,391],[391,269],[269,322],[417,465],[465,464],[464,417],[386,257],[257,258],[258,386],[466,260],[260,388],[388,466],[456,399],[399,419],[419,456],[284,332],[332,333],[333,284],[417,285],[285,8],[8,417],[346,340],[340,261],[261,346],[413,441],[441,285],[285,413],[327,460],[460,328],[328,327],[355,371],[371,329],[329,355],[392,439],[439,438],[438,392],[382,341],[341,256],[256,382],[429,420],[420,360],[360,429],[364,394],[394,379],[379,364],[277,343],[343,437],[437,277],[443,444],[444,283],[283,443],[275,440],[440,363],[363,275],[431,262],[262,369],[369,431],[297,338],[338,337],[337,297],[273,375],[375,321],[321,273],[450,451],[451,349],[349,450],[446,342],[342,467],[467,446],[293,334],[334,282],[282,293],[458,461],[461,462],[462,458],[276,353],[353,383],[383,276],[308,324],[324,325],[325,308],[276,300],[300,293],[293,276],[372,345],[345,447],[447,372],[352,345],[345,340],[340,352],[274,1],[1,19],[19,274],[456,248],[248,281],[281,456],[436,427],[427,425],[425,436],[381,256],[256,252],[252,381],[269,391],[391,393],[393,269],[200,199],[199,428],[428,200],[266,330],[330,329],[329,266],[287,273],[273,422],[422,287],[250,462],[462,328],[328,250],[258,286],[286,384],[384,258],[265,353],[353,342],[342,265],[387,259],[259,257],[257,387],[424,431],[431,430],[430,424],[342,353],[353,276],[276,342],[273,335],[335,424],[424,273],[292,325],[325,307],[307,292],[366,447],[447,345],[345,366],[271,303],[303,302],[302,271],[423,266],[266,371],[371,423],[294,455],[455,460],[460,294],[279,278],[278,294],[294,279],[271,272],[272,304],[304,271],[432,434],[434,427],[427,432],[272,407],[407,408],[408,272],[394,430],[430,431],[431,394],[395,369],[369,400],[400,395],[334,333],[333,299],[299,334],[351,417],[417,168],[168,351],[352,280],[280,411],[411,352],[325,319],[319,320],[320,325],[295,296],[296,336],[336,295],[319,403],[403,404],[404,319],[330,348],[348,349],[349,330],[293,298],[298,333],[333,293],[323,454],[454,447],[447,323],[15,16],[16,315],[315,15],[358,429],[429,279],[279,358],[14,15],[15,316],[316,14],[285,336],[336,9],[9,285],[329,349],[349,350],[350,329],[374,380],[380,252],[252,374],[318,402],[402,403],[403,318],[6,197],[197,419],[419,6],[318,319],[319,325],[325,318],[367,364],[364,365],[365,367],[435,367],[367,397],[397,435],[344,438],[438,439],[439,344],[272,271],[271,311],[311,272],[195,5],[5,281],[281,195],[273,287],[287,291],[291,273],[396,428],[428,199],[199,396],[311,271],[271,268],[268,311],[283,444],[444,445],[445,283],[373,254],[254,339],[339,373],[282,334],[334,296],[296,282],[449,347],[347,346],[346,449],[264,447],[447,454],[454,264],[336,296],[296,299],[299,336],[338,10],[10,151],[151,338],[278,439],[439,455],[455,278],[292,407],[407,415],[415,292],[358,371],[371,355],[355,358],[340,345],[345,372],[372,340],[346,347],[347,280],[280,346],[442,443],[443,282],[282,442],[19,94],[94,370],[370,19],[441,442],[442,295],[295,441],[248,419],[419,197],[197,248],[263,255],[255,359],[359,263],[440,275],[275,274],[274,440],[300,383],[383,368],[368,300],[351,412],[412,465],[465,351],[263,467],[467,466],[466,263],[301,368],[368,389],[389,301],[395,378],[378,379],[379,395],[412,351],[351,419],[419,412],[436,426],[426,322],[322,436],[2,164],[164,393],[393,2],[370,462],[462,461],[461,370],[164,0],[0,267],[267,164],[302,11],[11,12],[12,302],[268,12],[12,13],[13,268],[293,300],[300,301],[301,293],[446,261],[261,340],[340,446],[330,266],[266,425],[425,330],[426,423],[423,391],[391,426],[429,355],[355,437],[437,429],[391,327],[327,326],[326,391],[440,457],[457,438],[438,440],[341,382],[382,362],[362,341],[459,457],[457,461],[461,459],[434,430],[430,394],[394,434],[414,463],[463,362],[362,414],[396,369],[369,262],[262,396],[354,461],[461,457],[457,354],[316,403],[403,402],[402,316],[315,404],[404,403],[403,315],[314,405],[405,404],[404,314],[313,406],[406,405],[405,313],[421,418],[418,406],[406,421],[366,401],[401,361],[361,366],[306,408],[408,407],[407,306],[291,409],[409,408],[408,291],[287,410],[410,409],[409,287],[432,436],[436,410],[410,432],[434,416],[416,411],[411,434],[264,368],[368,383],[383,264],[309,438],[438,457],[457,309],[352,376],[376,401],[401,352],[274,275],[275,4],[4,274],[421,428],[428,262],[262,421],[294,327],[327,358],[358,294],[433,416],[416,367],[367,433],[289,455],[455,439],[439,289],[462,370],[370,326],[326,462],[2,326],[326,370],[370,2],[305,460],[460,455],[455,305],[254,449],[449,448],[448,254],[255,261],[261,446],[446,255],[253,450],[450,449],[449,253],[252,451],[451,450],[450,252],[256,452],[452,451],[451,256],[341,453],[453,452],[452,341],[413,464],[464,463],[463,413],[441,413],[413,414],[414,441],[258,442],[442,441],[441,258],[257,443],[443,442],[442,257],[259,444],[444,443],[443,259],[260,445],[445,444],[444,260],[467,342],[342,445],[445,467],[459,458],[458,250],[250,459],[289,392],[392,290],[290,289],[290,328],[328,460],[460,290],[376,433],[433,435],[435,376],[250,290],[290,392],[392,250],[411,416],[416,433],[433,411],[341,463],[463,464],[464,341],[453,464],[464,465],[465,453],[357,465],[465,412],[412,357],[343,412],[412,399],[399,343],[360,363],[363,440],[440,360],[437,399],[399,456],[456,437],[420,456],[456,363],[363,420],[401,435],[435,288],[288,401],[372,383],[383,353],[353,372],[339,255],[255,249],[249,339],[448,261],[261,255],[255,448],[133,243],[243,190],[190,133],[133,155],[155,112],[112,133],[33,246],[246,247],[247,33],[33,130],[130,25],[25,33],[398,384],[384,286],[286,398],[362,398],[398,414],[414,362],[362,463],[463,341],[341,362],[263,359],[359,467],[467,263],[263,249],[249,255],[255,263],[466,467],[467,260],[260,466],[75,60],[60,166],[166,75],[238,239],[239,79],[79,238],[162,127],[127,139],[139,162],[72,11],[11,37],[37,72],[121,232],[232,120],[120,121],[73,72],[72,39],[39,73],[114,128],[128,47],[47,114],[233,232],[232,128],[128,233],[103,104],[104,67],[67,103],[152,175],[175,148],[148,152],[119,118],[118,101],[101,119],[74,73],[73,40],[40,74],[107,9],[9,108],[108,107],[49,48],[48,131],[131,49],[32,194],[194,211],[211,32],[184,74],[74,185],[185,184],[191,80],[80,183],[183,191],[185,40],[40,186],[186,185],[119,230],[230,118],[118,119],[210,202],[202,214],[214,210],[84,83],[83,17],[17,84],[77,76],[76,146],[146,77],[161,160],[160,30],[30,161],[190,56],[56,173],[173,190],[182,106],[106,194],[194,182],[138,135],[135,192],[192,138],[129,203],[203,98],[98,129],[54,21],[21,68],[68,54],[5,51],[51,4],[4,5],[145,144],[144,23],[23,145],[90,77],[77,91],[91,90],[207,205],[205,187],[187,207],[83,201],[201,18],[18,83],[181,91],[91,182],[182,181],[180,90],[90,181],[181,180],[16,85],[85,17],[17,16],[205,206],[206,36],[36,205],[176,148],[148,140],[140,176],[165,92],[92,39],[39,165],[245,193],[193,244],[244,245],[27,159],[159,28],[28,27],[30,247],[247,161],[161,30],[174,236],[236,196],[196,174],[103,54],[54,104],[104,103],[55,193],[193,8],[8,55],[111,117],[117,31],[31,111],[221,189],[189,55],[55,221],[240,98],[98,99],[99,240],[142,126],[126,100],[100,142],[219,166],[166,218],[218,219],[112,155],[155,26],[26,112],[198,209],[209,131],[131,198],[169,135],[135,150],[150,169],[114,47],[47,217],[217,114],[224,223],[223,53],[53,224],[220,45],[45,134],[134,220],[32,211],[211,140],[140,32],[109,67],[67,108],[108,109],[146,43],[43,91],[91,146],[231,230],[230,120],[120,231],[113,226],[226,247],[247,113],[105,63],[63,52],[52,105],[241,238],[238,242],[242,241],[124,46],[46,156],[156,124],[95,78],[78,96],[96,95],[70,46],[46,63],[63,70],[116,143],[143,227],[227,116],[116,123],[123,111],[111,116],[1,44],[44,19],[19,1],[3,236],[236,51],[51,3],[207,216],[216,205],[205,207],[26,154],[154,22],[22,26],[165,39],[39,167],[167,165],[199,200],[200,208],[208,199],[101,36],[36,100],[100,101],[43,57],[57,202],[202,43],[242,20],[20,99],[99,242],[56,28],[28,157],[157,56],[124,35],[35,113],[113,124],[29,160],[160,27],[27,29],[211,204],[204,210],[210,211],[124,113],[113,46],[46,124],[106,43],[43,204],[204,106],[96,62],[62,77],[77,96],[227,137],[137,116],[116,227],[73,41],[41,72],[72,73],[36,203],[203,142],[142,36],[235,64],[64,240],[240,235],[48,49],[49,64],[64,48],[42,41],[41,74],[74,42],[214,212],[212,207],[207,214],[183,42],[42,184],[184,183],[210,169],[169,211],[211,210],[140,170],[170,176],[176,140],[104,105],[105,69],[69,104],[193,122],[122,168],[168,193],[50,123],[123,187],[187,50],[89,96],[96,90],[90,89],[66,65],[65,107],[107,66],[179,89],[89,180],[180,179],[119,101],[101,120],[120,119],[68,63],[63,104],[104,68],[234,93],[93,227],[227,234],[16,15],[15,85],[85,16],[209,129],[129,49],[49,209],[15,14],[14,86],[86,15],[107,55],[55,9],[9,107],[120,100],[100,121],[121,120],[153,145],[145,22],[22,153],[178,88],[88,179],[179,178],[197,6],[6,196],[196,197],[89,88],[88,96],[96,89],[135,138],[138,136],[136,135],[138,215],[215,172],[172,138],[218,115],[115,219],[219,218],[41,42],[42,81],[81,41],[5,195],[195,51],[51,5],[57,43],[43,61],[61,57],[208,171],[171,199],[199,208],[41,81],[81,38],[38,41],[224,53],[53,225],[225,224],[24,144],[144,110],[110,24],[105,52],[52,66],[66,105],[118,229],[229,117],[117,118],[227,34],[34,234],[234,227],[66,107],[107,69],[69,66],[10,109],[109,151],[151,10],[219,48],[48,235],[235,219],[183,62],[62,191],[191,183],[142,129],[129,126],[126,142],[116,111],[111,143],[143,116],[118,117],[117,50],[50,118],[223,222],[222,52],[52,223],[94,19],[19,141],[141,94],[222,221],[221,65],[65,222],[196,3],[3,197],[197,196],[45,220],[220,44],[44,45],[156,70],[70,139],[139,156],[188,122],[122,245],[245,188],[139,71],[71,162],[162,139],[149,170],[170,150],[150,149],[122,188],[188,196],[196,122],[206,216],[216,92],[92,206],[164,2],[2,167],[167,164],[242,141],[141,241],[241,242],[0,164],[164,37],[37,0],[11,72],[72,12],[12,11],[12,38],[38,13],[13,12],[70,63],[63,71],[71,70],[31,226],[226,111],[111,31],[36,101],[101,205],[205,36],[203,206],[206,165],[165,203],[126,209],[209,217],[217,126],[98,165],[165,97],[97,98],[237,220],[220,218],[218,237],[237,239],[239,241],[241,237],[210,214],[214,169],[169,210],[140,171],[171,32],[32,140],[241,125],[125,237],[237,241],[179,86],[86,178],[178,179],[180,85],[85,179],[179,180],[181,84],[84,180],[180,181],[182,83],[83,181],[181,182],[194,201],[201,182],[182,194],[177,137],[137,132],[132,177],[184,76],[76,183],[183,184],[185,61],[61,184],[184,185],[186,57],[57,185],[185,186],[216,212],[212,186],[186,216],[192,214],[214,187],[187,192],[139,34],[34,156],[156,139],[218,79],[79,237],[237,218],[147,123],[123,177],[177,147],[45,44],[44,4],[4,45],[208,201],[201,32],[32,208],[98,64],[64,129],[129,98],[192,213],[213,138],[138,192],[235,59],[59,219],[219,235],[141,242],[242,97],[97,141],[97,2],[2,141],[141,97],[240,75],[75,235],[235,240],[229,24],[24,228],[228,229],[31,25],[25,226],[226,31],[230,23],[23,229],[229,230],[231,22],[22,230],[230,231],[232,26],[26,231],[231,232],[233,112],[112,232],[232,233],[244,189],[189,243],[243,244],[189,221],[221,190],[190,189],[222,28],[28,221],[221,222],[223,27],[27,222],[222,223],[224,29],[29,223],[223,224],[225,30],[30,224],[224,225],[113,247],[247,225],[225,113],[99,60],[60,240],[240,99],[213,147],[147,215],[215,213],[60,20],[20,166],[166,60],[192,187],[187,213],[213,192],[243,112],[112,244],[244,243],[244,233],[233,245],[245,244],[245,128],[128,188],[188,245],[188,114],[114,174],[174,188],[134,131],[131,220],[220,134],[174,217],[217,236],[236,174],[236,198],[198,134],[134,236],[215,177],[177,58],[58,215],[156,143],[143,124],[124,156],[25,110],[110,7],[7,25],[31,228],[228,25],[25,31],[264,356],[356,368],[368,264],[0,11],[11,267],[267,0],[451,452],[452,349],[349,451],[267,302],[302,269],[269,267],[350,357],[357,277],[277,350],[350,452],[452,357],[357,350],[299,333],[333,297],[297,299],[396,175],[175,377],[377,396],[280,347],[347,330],[330,280],[269,303],[303,270],[270,269],[151,9],[9,337],[337,151],[344,278],[278,360],[360,344],[424,418],[418,431],[431,424],[270,304],[304,409],[409,270],[272,310],[310,407],[407,272],[322,270],[270,410],[410,322],[449,450],[450,347],[347,449],[432,422],[422,434],[434,432],[18,313],[313,17],[17,18],[291,306],[306,375],[375,291],[259,387],[387,260],[260,259],[424,335],[335,418],[418,424],[434,364],[364,416],[416,434],[391,423],[423,327],[327,391],[301,251],[251,298],[298,301],[275,281],[281,4],[4,275],[254,373],[373,253],[253,254],[375,307],[307,321],[321,375],[280,425],[425,411],[411,280],[200,421],[421,18],[18,200],[335,321],[321,406],[406,335],[321,320],[320,405],[405,321],[314,315],[315,17],[17,314],[423,426],[426,266],[266,423],[396,377],[377,369],[369,396],[270,322],[322,269],[269,270],[413,417],[417,464],[464,413],[385,386],[386,258],[258,385],[248,456],[456,419],[419,248],[298,284],[284,333],[333,298],[168,417],[417,8],[8,168],[448,346],[346,261],[261,448],[417,413],[413,285],[285,417],[326,327],[327,328],[328,326],[277,355],[355,329],[329,277],[309,392],[392,438],[438,309],[381,382],[382,256],[256,381],[279,429],[429,360],[360,279],[365,364],[364,379],[379,365],[355,277],[277,437],[437,355],[282,443],[443,283],[283,282],[281,275],[275,363],[363,281],[395,431],[431,369],[369,395],[299,297],[297,337],[337,299],[335,273],[273,321],[321,335],[348,450],[450,349],[349,348],[359,446],[446,467],[467,359],[283,293],[293,282],[282,283],[250,458],[458,462],[462,250],[300,276],[276,383],[383,300],[292,308],[308,325],[325,292],[283,276],[276,293],[293,283],[264,372],[372,447],[447,264],[346,352],[352,340],[340,346],[354,274],[274,19],[19,354],[363,456],[456,281],[281,363],[426,436],[436,425],[425,426],[380,381],[381,252],[252,380],[267,269],[269,393],[393,267],[421,200],[200,428],[428,421],[371,266],[266,329],[329,371],[432,287],[287,422],[422,432],[290,250],[250,328],[328,290],[385,258],[258,384],[384,385],[446,265],[265,342],[342,446],[386,387],[387,257],[257,386],[422,424],[424,430],[430,422],[445,342],[342,276],[276,445],[422,273],[273,424],[424,422],[306,292],[292,307],[307,306],[352,366],[366,345],[345,352],[268,271],[271,302],[302,268],[358,423],[423,371],[371,358],[327,294],[294,460],[460,327],[331,279],[279,294],[294,331],[303,271],[271,304],[304,303],[436,432],[432,427],[427,436],[304,272],[272,408],[408,304],[395,394],[394,431],[431,395],[378,395],[395,400],[400,378],[296,334],[334,299],[299,296],[6,351],[351,168],[168,6],[376,352],[352,411],[411,376],[307,325],[325,320],[320,307],[285,295],[295,336],[336,285],[320,319],[319,404],[404,320],[329,330],[330,349],[349,329],[334,293],[293,333],[333,334],[366,323],[323,447],[447,366],[316,15],[15,315],[315,316],[331,358],[358,279],[279,331],[317,14],[14,316],[316,317],[8,285],[285,9],[9,8],[277,329],[329,350],[350,277],[253,374],[374,252],[252,253],[319,318],[318,403],[403,319],[351,6],[6,419],[419,351],[324,318],[318,325],[325,324],[397,367],[367,365],[365,397],[288,435],[435,397],[397,288],[278,344],[344,439],[439,278],[310,272],[272,311],[311,310],[248,195],[195,281],[281,248],[375,273],[273,291],[291,375],[175,396],[396,199],[199,175],[312,311],[311,268],[268,312],[276,283],[283,445],[445,276],[390,373],[373,339],[339,390],[295,282],[282,296],[296,295],[448,449],[449,346],[346,448],[356,264],[264,454],[454,356],[337,336],[336,299],[299,337],[337,338],[338,151],[151,337],[294,278],[278,455],[455,294],[308,292],[292,415],[415,308],[429,358],[358,355],[355,429],[265,340],[340,372],[372,265],[352,346],[346,280],[280,352],[295,442],[442,282],[282,295],[354,19],[19,370],[370,354],[285,441],[441,295],[295,285],[195,248],[248,197],[197,195],[457,440],[440,274],[274,457],[301,300],[300,368],[368,301],[417,351],[351,465],[465,417],[251,301],[301,389],[389,251],[394,395],[395,379],[379,394],[399,412],[412,419],[419,399],[410,436],[436,322],[322,410],[326,2],[2,393],[393,326],[354,370],[370,461],[461,354],[393,164],[164,267],[267,393],[268,302],[302,12],[12,268],[312,268],[268,13],[13,312],[298,293],[293,301],[301,298],[265,446],[446,340],[340,265],[280,330],[330,425],[425,280],[322,426],[426,391],[391,322],[420,429],[429,437],[437,420],[393,391],[391,326],[326,393],[344,440],[440,438],[438,344],[458,459],[459,461],[461,458],[364,434],[434,394],[394,364],[428,396],[396,262],[262,428],[274,354],[354,457],[457,274],[317,316],[316,402],[402,317],[316,315],[315,403],[403,316],[315,314],[314,404],[404,315],[314,313],[313,405],[405,314],[313,421],[421,406],[406,313],[323,366],[366,361],[361,323],[292,306],[306,407],[407,292],[306,291],[291,408],[408,306],[291,287],[287,409],[409,291],[287,432],[432,410],[410,287],[427,434],[434,411],[411,427],[372,264],[264,383],[383,372],[459,309],[309,457],[457,459],[366,352],[352,401],[401,366],[1,274],[274,4],[4,1],[418,421],[421,262],[262,418],[331,294],[294,358],[358,331],[435,433],[433,367],[367,435],[392,289],[289,439],[439,392],[328,462],[462,326],[326,328],[94,2],[2,370],[370,94],[289,305],[305,455],[455,289],[339,254],[254,448],[448,339],[359,255],[255,446],[446,359],[254,253],[253,449],[449,254],[253,252],[252,450],[450,253],[252,256],[256,451],[451,252],[256,341],[341,452],[452,256],[414,413],[413,463],[463,414],[286,441],[441,414],[414,286],[286,258],[258,441],[441,286],[258,257],[257,442],[442,258],[257,259],[259,443],[443,257],[259,260],[260,444],[444,259],[260,467],[467,445],[445,260],[309,459],[459,250],[250,309],[305,289],[289,290],[290,305],[305,290],[290,460],[460,305],[401,376],[376,435],[435,401],[309,250],[250,392],[392,309],[376,411],[411,433],[433,376],[453,341],[341,464],[464,453],[357,453],[453,465],[465,357],[343,357],[357,412],[412,343],[437,343],[343,399],[399,437],[344,360],[360,440],[440,344],[420,437],[437,456],[456,420],[360,420],[420,363],[363,360],[361,401],[401,288],[288,361],[265,372],[372,353],[353,265],[390,339],[339,249],[249,390],[339,448],[448,255],[255,339]);function Mp(e){e.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]}}var Se=class extends Cn{constructor(e,t){super(new Qn(e,t),"image_in","norm_rect",!1),this.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]},this.outputFacialTransformationMatrixes=this.outputFaceBlendshapes=!1,Lt(e=this.h=new sg,0,1,t=new Re),this.A=new ig,Lt(this.h,0,3,this.A),this.u=new Nc,Lt(this.h,0,2,this.u),Wi(this.u,4,1),Ct(this.u,2,.5),Ct(this.A,2,.5),Ct(this.h,4,.5)}get baseOptions(){return te(this.h,Re,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return"numFaces"in e&&Wi(this.u,4,e.numFaces??1),"minFaceDetectionConfidence"in e&&Ct(this.u,2,e.minFaceDetectionConfidence??.5),"minTrackingConfidence"in e&&Ct(this.h,4,e.minTrackingConfidence??.5),"minFacePresenceConfidence"in e&&Ct(this.A,2,e.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in e&&(this.outputFaceBlendshapes=!!e.outputFaceBlendshapes),"outputFacialTransformationMatrixes"in e&&(this.outputFacialTransformationMatrixes=!!e.outputFacialTransformationMatrixes),this.l(e)}F(e,t){return Mp(this),ti(this,e,t),this.j}G(e,t,n){return Mp(this),Ei(this,e,n,t),this.j}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"norm_rect"),ee(e,"face_landmarks");const t=new Pn;Si(t,XS,this.h);const n=new _n;Rn(n,2,"mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),$t(n,"NORM_LANDMARKS:face_landmarks"),n.o(t),Hn(e,n),this.g.attachProtoVectorListener("face_landmarks",(i,s)=>{for(const r of i)i=Xa(r),this.j.faceLandmarks.push(Oc(i));mt(this,s)}),this.g.attachEmptyPacketListener("face_landmarks",i=>{mt(this,i)}),this.outputFaceBlendshapes&&(ee(e,"blendshapes"),$t(n,"BLENDSHAPES:blendshapes"),this.g.attachProtoVectorListener("blendshapes",(i,s)=>{if(this.outputFaceBlendshapes)for(const r of i)i=Fc(r),this.j.faceBlendshapes.push(td(i.g()??[]));mt(this,s)}),this.g.attachEmptyPacketListener("blendshapes",i=>{mt(this,i)})),this.outputFacialTransformationMatrixes&&(ee(e,"face_geometry"),$t(n,"FACE_GEOMETRY:face_geometry"),this.g.attachProtoVectorListener("face_geometry",(i,s)=>{if(this.outputFacialTransformationMatrixes)for(const r of i)(i=te(i=WS(r),FS,2))&&this.j.facialTransformationMatrixes.push({rows:zn(i,1)??0??0,columns:zn(i,2)??0??0,data:Ns(i,3,ui,Fs()).slice()??[]});mt(this,s)}),this.g.attachEmptyPacketListener("face_geometry",i=>{mt(this,i)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Se.prototype.detectForVideo=Se.prototype.G,Se.prototype.detect=Se.prototype.F,Se.prototype.setOptions=Se.prototype.o,Se.createFromModelPath=function(e,t){return Zt(Se,e,{baseOptions:{modelAssetPath:t}})},Se.createFromModelBuffer=function(e,t){return Zt(Se,e,{baseOptions:{modelAssetBuffer:t}})},Se.createFromOptions=function(e,t){return Zt(Se,e,t)},Se.FACE_LANDMARKS_LIPS=id,Se.FACE_LANDMARKS_LEFT_EYE=sd,Se.FACE_LANDMARKS_LEFT_EYEBROW=rd,Se.FACE_LANDMARKS_LEFT_IRIS=Dg,Se.FACE_LANDMARKS_RIGHT_EYE=ad,Se.FACE_LANDMARKS_RIGHT_EYEBROW=od,Se.FACE_LANDMARKS_RIGHT_IRIS=Ug,Se.FACE_LANDMARKS_FACE_OVAL=cd,Se.FACE_LANDMARKS_CONTOURS=Fg,Se.FACE_LANDMARKS_TESSELATION=Ng;var ld=Jn([0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]);function Sp(e){e.gestures=[],e.landmarks=[],e.worldLandmarks=[],e.handedness=[]}function yp(e){return e.gestures.length===0?{gestures:[],landmarks:[],worldLandmarks:[],handedness:[],handednesses:[]}:{gestures:e.gestures,landmarks:e.landmarks,worldLandmarks:e.worldLandmarks,handedness:e.handedness,handednesses:e.handedness}}function Ep(e,t=!0){const n=[];for(const s of e){var i=Fc(s);e=[];for(const r of i.g())i=t&&zn(r,1)!=null?zn(r,1)??0:-1,e.push({score:Le(r,2)??0,index:i,categoryName:Je(Ee(r,3))??""??"",displayName:Je(Ee(r,4))??""??""});n.push(e)}return n}var mn=class extends Cn{constructor(e,t){super(new Qn(e,t),"image_in","norm_rect",!1),this.gestures=[],this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Lt(e=this.j=new og,0,1,t=new Re),this.u=new Ku,Lt(this.j,0,2,this.u),this.D=new ju,Lt(this.u,0,3,this.D),this.A=new ag,Lt(this.u,0,2,this.A),this.h=new YS,Lt(this.j,0,3,this.h),Ct(this.A,2,.5),Ct(this.u,4,.5),Ct(this.D,2,.5)}get baseOptions(){return te(this.j,Re,1)}set baseOptions(e){Lt(this.j,0,1,e)}o(e){var s,r,a,o;if(Wi(this.A,3,e.numHands??1),"minHandDetectionConfidence"in e&&Ct(this.A,2,e.minHandDetectionConfidence??.5),"minTrackingConfidence"in e&&Ct(this.u,4,e.minTrackingConfidence??.5),"minHandPresenceConfidence"in e&&Ct(this.D,2,e.minHandPresenceConfidence??.5),e.cannedGesturesClassifierOptions){var t=new pr,n=t,i=Yh(e.cannedGesturesClassifierOptions,(s=te(this.h,pr,3))==null?void 0:s.l());Lt(n,0,2,i),Lt(this.h,0,3,t)}else e.cannedGesturesClassifierOptions===void 0&&((r=te(this.h,pr,3))==null||r.g());return e.customGesturesClassifierOptions?(Lt(n=t=new pr,0,2,i=Yh(e.customGesturesClassifierOptions,(a=te(this.h,pr,4))==null?void 0:a.l())),Lt(this.h,0,4,t)):e.customGesturesClassifierOptions===void 0&&((o=te(this.h,pr,4))==null||o.g()),this.l(e)}Ha(e,t){return Sp(this),ti(this,e,t),yp(this)}Ia(e,t,n){return Sp(this),Ei(this,e,n,t),yp(this)}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"norm_rect"),ee(e,"hand_gestures"),ee(e,"hand_landmarks"),ee(e,"world_hand_landmarks"),ee(e,"handedness");const t=new Pn;Si(t,qS,this.j);const n=new _n;Rn(n,2,"mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),$t(n,"HAND_GESTURES:hand_gestures"),$t(n,"LANDMARKS:hand_landmarks"),$t(n,"WORLD_LANDMARKS:world_hand_landmarks"),$t(n,"HANDEDNESS:handedness"),n.o(t),Hn(e,n),this.g.attachProtoVectorListener("hand_landmarks",(i,s)=>{for(const r of i){i=Xa(r);const a=[];for(const o of Hi(i,J0,1))a.push({x:Le(o,1)??0,y:Le(o,2)??0,z:Le(o,3)??0,visibility:Le(o,4)??0});this.landmarks.push(a)}mt(this,s)}),this.g.attachEmptyPacketListener("hand_landmarks",i=>{mt(this,i)}),this.g.attachProtoVectorListener("world_hand_landmarks",(i,s)=>{for(const r of i){i=Mr(r);const a=[];for(const o of Hi(i,Z0,1))a.push({x:Le(o,1)??0,y:Le(o,2)??0,z:Le(o,3)??0,visibility:Le(o,4)??0});this.worldLandmarks.push(a)}mt(this,s)}),this.g.attachEmptyPacketListener("world_hand_landmarks",i=>{mt(this,i)}),this.g.attachProtoVectorListener("hand_gestures",(i,s)=>{this.gestures.push(...Ep(i,!1)),mt(this,s)}),this.g.attachEmptyPacketListener("hand_gestures",i=>{mt(this,i)}),this.g.attachProtoVectorListener("handedness",(i,s)=>{this.handedness.push(...Ep(i)),mt(this,s)}),this.g.attachEmptyPacketListener("handedness",i=>{mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};function bp(e){return{landmarks:e.landmarks,worldLandmarks:e.worldLandmarks,handednesses:e.handedness,handedness:e.handedness}}mn.prototype.recognizeForVideo=mn.prototype.Ia,mn.prototype.recognize=mn.prototype.Ha,mn.prototype.setOptions=mn.prototype.o,mn.createFromModelPath=function(e,t){return Zt(mn,e,{baseOptions:{modelAssetPath:t}})},mn.createFromModelBuffer=function(e,t){return Zt(mn,e,{baseOptions:{modelAssetBuffer:t}})},mn.createFromOptions=function(e,t){return Zt(mn,e,t)},mn.HAND_CONNECTIONS=ld;var Sn=class extends Cn{constructor(e,t){super(new Qn(e,t),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Lt(e=this.h=new Ku,0,1,t=new Re),this.u=new ju,Lt(this.h,0,3,this.u),this.j=new ag,Lt(this.h,0,2,this.j),Wi(this.j,3,1),Ct(this.j,2,.5),Ct(this.u,2,.5),Ct(this.h,4,.5)}get baseOptions(){return te(this.h,Re,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return"numHands"in e&&Wi(this.j,3,e.numHands??1),"minHandDetectionConfidence"in e&&Ct(this.j,2,e.minHandDetectionConfidence??.5),"minTrackingConfidence"in e&&Ct(this.h,4,e.minTrackingConfidence??.5),"minHandPresenceConfidence"in e&&Ct(this.u,2,e.minHandPresenceConfidence??.5),this.l(e)}F(e,t){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],ti(this,e,t),bp(this)}G(e,t,n){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Ei(this,e,n,t),bp(this)}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"norm_rect"),ee(e,"hand_landmarks"),ee(e,"world_hand_landmarks"),ee(e,"handedness");const t=new Pn;Si(t,$S,this.h);const n=new _n;Rn(n,2,"mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),$t(n,"LANDMARKS:hand_landmarks"),$t(n,"WORLD_LANDMARKS:world_hand_landmarks"),$t(n,"HANDEDNESS:handedness"),n.o(t),Hn(e,n),this.g.attachProtoVectorListener("hand_landmarks",(i,s)=>{for(const r of i)i=Xa(r),this.landmarks.push(Oc(i));mt(this,s)}),this.g.attachEmptyPacketListener("hand_landmarks",i=>{mt(this,i)}),this.g.attachProtoVectorListener("world_hand_landmarks",(i,s)=>{for(const r of i)i=Mr(r),this.worldLandmarks.push(ba(i));mt(this,s)}),this.g.attachEmptyPacketListener("world_hand_landmarks",i=>{mt(this,i)}),this.g.attachProtoVectorListener("handedness",(i,s)=>{var r=this.handedness,a=r.push;const o=[];for(const c of i){i=Fc(c);const l=[];for(const u of i.g())l.push({score:Le(u,2)??0,index:zn(u,1)??0??-1,categoryName:Je(Ee(u,3))??""??"",displayName:Je(Ee(u,4))??""??""});o.push(l)}a.call(r,...o),mt(this,s)}),this.g.attachEmptyPacketListener("handedness",i=>{mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Sn.prototype.detectForVideo=Sn.prototype.G,Sn.prototype.detect=Sn.prototype.F,Sn.prototype.setOptions=Sn.prototype.o,Sn.createFromModelPath=function(e,t){return Zt(Sn,e,{baseOptions:{modelAssetPath:t}})},Sn.createFromModelBuffer=function(e,t){return Zt(Sn,e,{baseOptions:{modelAssetBuffer:t}})},Sn.createFromOptions=function(e,t){return Zt(Sn,e,t)},Sn.HAND_CONNECTIONS=ld;var Og=Jn([0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]);function Ap(e){e.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]}}function Tp(e){try{if(!e.D)return e.h;e.D(e.h)}finally{kc(e)}}function wo(e,t){e=Xa(e),t.push(Oc(e))}var ve=class extends Cn{constructor(e,t){super(new Qn(e,t),"input_frames_image",null,!1),this.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]},this.outputPoseSegmentationMasks=this.outputFaceBlendshapes=!1,Lt(e=this.j=new dg,0,1,t=new Re),this.I=new ju,Lt(this.j,0,2,this.I),this.W=new jS,Lt(this.j,0,3,this.W),this.u=new Nc,Lt(this.j,0,4,this.u),this.O=new ig,Lt(this.j,0,5,this.O),this.A=new hg,Lt(this.j,0,6,this.A),this.M=new ug,Lt(this.j,0,7,this.M),Ct(this.u,2,.5),Ct(this.u,3,.3),Ct(this.O,2,.5),Ct(this.A,2,.5),Ct(this.A,3,.3),Ct(this.M,2,.5),Ct(this.I,2,.5)}get baseOptions(){return te(this.j,Re,1)}set baseOptions(e){Lt(this.j,0,1,e)}o(e){return"minFaceDetectionConfidence"in e&&Ct(this.u,2,e.minFaceDetectionConfidence??.5),"minFaceSuppressionThreshold"in e&&Ct(this.u,3,e.minFaceSuppressionThreshold??.3),"minFacePresenceConfidence"in e&&Ct(this.O,2,e.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in e&&(this.outputFaceBlendshapes=!!e.outputFaceBlendshapes),"minPoseDetectionConfidence"in e&&Ct(this.A,2,e.minPoseDetectionConfidence??.5),"minPoseSuppressionThreshold"in e&&Ct(this.A,3,e.minPoseSuppressionThreshold??.3),"minPosePresenceConfidence"in e&&Ct(this.M,2,e.minPosePresenceConfidence??.5),"outputPoseSegmentationMasks"in e&&(this.outputPoseSegmentationMasks=!!e.outputPoseSegmentationMasks),"minHandLandmarksConfidence"in e&&Ct(this.I,2,e.minHandLandmarksConfidence??.5),this.l(e)}F(e,t,n){const i=typeof t!="function"?t:{};return this.D=typeof t=="function"?t:n,Ap(this),ti(this,e,i),Tp(this)}G(e,t,n,i){const s=typeof n!="function"?n:{};return this.D=typeof n=="function"?n:i,Ap(this),Ei(this,e,s,t),Tp(this)}m(){var e=new Ln;Ae(e,"input_frames_image"),ee(e,"pose_landmarks"),ee(e,"pose_world_landmarks"),ee(e,"face_landmarks"),ee(e,"left_hand_landmarks"),ee(e,"left_hand_world_landmarks"),ee(e,"right_hand_landmarks"),ee(e,"right_hand_world_landmarks");const t=new Pn,n=new Kf;Rn(n,1,"type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"),function(s,r){if(r!=null)if(Array.isArray(r))le(s,2,Ec(r,0,Ia));else{if(!(typeof r=="string"||r instanceof pi||mu(r)))throw Error("invalid value in Any.value field: "+r+" expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");is(s,2,_u(r,!1),Xs())}}(n,this.j.g());const i=new _n;Rn(i,2,"mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"),Lu(i,8,Kf,n),Me(i,"IMAGE:input_frames_image"),$t(i,"POSE_LANDMARKS:pose_landmarks"),$t(i,"POSE_WORLD_LANDMARKS:pose_world_landmarks"),$t(i,"FACE_LANDMARKS:face_landmarks"),$t(i,"LEFT_HAND_LANDMARKS:left_hand_landmarks"),$t(i,"LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"),$t(i,"RIGHT_HAND_LANDMARKS:right_hand_landmarks"),$t(i,"RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"),i.o(t),Hn(e,i),Bc(this,e),this.g.attachProtoListener("pose_landmarks",(s,r)=>{wo(s,this.h.poseLandmarks),mt(this,r)}),this.g.attachEmptyPacketListener("pose_landmarks",s=>{mt(this,s)}),this.g.attachProtoListener("pose_world_landmarks",(s,r)=>{var a=this.h.poseWorldLandmarks;s=Mr(s),a.push(ba(s)),mt(this,r)}),this.g.attachEmptyPacketListener("pose_world_landmarks",s=>{mt(this,s)}),this.outputPoseSegmentationMasks&&($t(i,"POSE_SEGMENTATION_MASK:pose_segmentation_mask"),zr(this,"pose_segmentation_mask"),this.g.Z("pose_segmentation_mask",(s,r)=>{this.h.poseSegmentationMasks=[Gr(this,s,!0,!this.D)],mt(this,r)}),this.g.attachEmptyPacketListener("pose_segmentation_mask",s=>{this.h.poseSegmentationMasks=[],mt(this,s)})),this.g.attachProtoListener("face_landmarks",(s,r)=>{wo(s,this.h.faceLandmarks),mt(this,r)}),this.g.attachEmptyPacketListener("face_landmarks",s=>{mt(this,s)}),this.outputFaceBlendshapes&&(ee(e,"extra_blendshapes"),$t(i,"FACE_BLENDSHAPES:extra_blendshapes"),this.g.attachProtoListener("extra_blendshapes",(s,r)=>{var a=this.h.faceBlendshapes;this.outputFaceBlendshapes&&(s=Fc(s),a.push(td(s.g()??[]))),mt(this,r)}),this.g.attachEmptyPacketListener("extra_blendshapes",s=>{mt(this,s)})),this.g.attachProtoListener("left_hand_landmarks",(s,r)=>{wo(s,this.h.leftHandLandmarks),mt(this,r)}),this.g.attachEmptyPacketListener("left_hand_landmarks",s=>{mt(this,s)}),this.g.attachProtoListener("left_hand_world_landmarks",(s,r)=>{var a=this.h.leftHandWorldLandmarks;s=Mr(s),a.push(ba(s)),mt(this,r)}),this.g.attachEmptyPacketListener("left_hand_world_landmarks",s=>{mt(this,s)}),this.g.attachProtoListener("right_hand_landmarks",(s,r)=>{wo(s,this.h.rightHandLandmarks),mt(this,r)}),this.g.attachEmptyPacketListener("right_hand_landmarks",s=>{mt(this,s)}),this.g.attachProtoListener("right_hand_world_landmarks",(s,r)=>{var a=this.h.rightHandWorldLandmarks;s=Mr(s),a.push(ba(s)),mt(this,r)}),this.g.attachEmptyPacketListener("right_hand_world_landmarks",s=>{mt(this,s)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};ve.prototype.detectForVideo=ve.prototype.G,ve.prototype.detect=ve.prototype.F,ve.prototype.setOptions=ve.prototype.o,ve.createFromModelPath=function(e,t){return Zt(ve,e,{baseOptions:{modelAssetPath:t}})},ve.createFromModelBuffer=function(e,t){return Zt(ve,e,{baseOptions:{modelAssetBuffer:t}})},ve.createFromOptions=function(e,t){return Zt(ve,e,t)},ve.HAND_CONNECTIONS=ld,ve.POSE_CONNECTIONS=Og,ve.FACE_LANDMARKS_LIPS=id,ve.FACE_LANDMARKS_LEFT_EYE=sd,ve.FACE_LANDMARKS_LEFT_EYEBROW=rd,ve.FACE_LANDMARKS_LEFT_IRIS=Dg,ve.FACE_LANDMARKS_RIGHT_EYE=ad,ve.FACE_LANDMARKS_RIGHT_EYEBROW=od,ve.FACE_LANDMARKS_RIGHT_IRIS=Ug,ve.FACE_LANDMARKS_FACE_OVAL=cd,ve.FACE_LANDMARKS_CONTOURS=Fg,ve.FACE_LANDMARKS_TESSELATION=Ng;var Un=class extends Cn{constructor(e,t){super(new Qn(e,t),"input_image","norm_rect",!0),this.j={classifications:[]},Lt(e=this.h=new fg,0,1,t=new Re)}get baseOptions(){return te(this.h,Re,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return Lt(this.h,0,2,Yh(e,te(this.h,qu,2))),this.l(e)}sa(e,t){return this.j={classifications:[]},ti(this,e,t),this.j}ta(e,t,n){return this.j={classifications:[]},Ei(this,e,n,t),this.j}m(){var e=new Ln;Ae(e,"input_image"),Ae(e,"norm_rect"),ee(e,"classifications");const t=new Pn;Si(t,KS,this.h);const n=new _n;Rn(n,2,"mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"),Me(n,"IMAGE:input_image"),Me(n,"NORM_RECT:norm_rect"),$t(n,"CLASSIFICATIONS:classifications"),n.o(t),Hn(e,n),this.g.attachProtoListener("classifications",(i,s)=>{this.j=ny(BS(i)),mt(this,s)}),this.g.attachEmptyPacketListener("classifications",i=>{mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Un.prototype.classifyForVideo=Un.prototype.ta,Un.prototype.classify=Un.prototype.sa,Un.prototype.setOptions=Un.prototype.o,Un.createFromModelPath=function(e,t){return Zt(Un,e,{baseOptions:{modelAssetPath:t}})},Un.createFromModelBuffer=function(e,t){return Zt(Un,e,{baseOptions:{modelAssetBuffer:t}})},Un.createFromOptions=function(e,t){return Zt(Un,e,t)};var yn=class extends Cn{constructor(e,t){super(new Qn(e,t),"image_in","norm_rect",!0),this.h=new pg,this.embeddings={embeddings:[]},Lt(e=this.h,0,1,t=new Re)}get baseOptions(){return te(this.h,Re,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){var t=this.h,n=te(this.h,rp,2);return n=n?n.clone():new rp,e.l2Normalize!==void 0?le(n,1,La(e.l2Normalize)):"l2Normalize"in e&&le(n,1),e.quantize!==void 0?le(n,2,La(e.quantize)):"quantize"in e&&le(n,2),Lt(t,0,2,n),this.l(e)}za(e,t){return ti(this,e,t),this.embeddings}Aa(e,t,n){return Ei(this,e,n,t),this.embeddings}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"norm_rect"),ee(e,"embeddings_out");const t=new Pn;Si(t,ZS,this.h);const n=new _n;Rn(n,2,"mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),$t(n,"EMBEDDINGS:embeddings_out"),n.o(t),Hn(e,n),this.g.attachProtoListener("embeddings_out",(i,s)=>{i=VS(i),this.embeddings=function(r){return{embeddings:Hi(r,zS,1).map(a=>{var l,u;const o={headIndex:zn(a,3)??0??-1,headName:Je(Ee(a,4))??""??""};var c=a.v;return u0(c,0|c[bt],sp,Pl(a,1))!==void 0?(a=Ns(a=te(a,sp,Pl(a,1),void 0),1,ui,Fs()),o.floatEmbedding=a.slice()):(c=new Uint8Array(0),o.quantizedEmbedding=((u=(l=te(a,kS,Pl(a,2),void 0))==null?void 0:l.na())==null?void 0:u.h())??c),o}),timestampMs:Sg(Ee(r,2,void 0,void 0,nc)??a0)}}(i),mt(this,s)}),this.g.attachEmptyPacketListener("embeddings_out",i=>{mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};yn.cosineSimilarity=function(e,t){if(e.floatEmbedding&&t.floatEmbedding)e=up(e.floatEmbedding,t.floatEmbedding);else{if(!e.quantizedEmbedding||!t.quantizedEmbedding)throw Error("Cannot compute cosine similarity between quantized and float embeddings.");e=up(hp(e.quantizedEmbedding),hp(t.quantizedEmbedding))}return e},yn.prototype.embedForVideo=yn.prototype.Aa,yn.prototype.embed=yn.prototype.za,yn.prototype.setOptions=yn.prototype.o,yn.createFromModelPath=function(e,t){return Zt(yn,e,{baseOptions:{modelAssetPath:t}})},yn.createFromModelBuffer=function(e,t){return Zt(yn,e,{baseOptions:{modelAssetBuffer:t}})},yn.createFromOptions=function(e,t){return Zt(yn,e,t)};var Kh=class{constructor(e,t,n){this.confidenceMasks=e,this.categoryMask=t,this.qualityScores=n}close(){var e,t;(e=this.confidenceMasks)==null||e.forEach(n=>{n.close()}),(t=this.categoryMask)==null||t.close()}};function ly(e){var n,i;const t=function(s){return Hi(s,_n,1)}(e.ca()).filter(s=>(Je(Ee(s,1))??"").includes("mediapipe.tasks.TensorsToSegmentationCalculator"));if(e.u=[],t.length>1)throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");t.length===1&&(((i=(n=te(t[0],Pn,7))==null?void 0:n.j())==null?void 0:i.g())??new Map).forEach((s,r)=>{e.u[Number(r)]=Je(Ee(s,1))??""})}function wp(e){e.categoryMask=void 0,e.confidenceMasks=void 0,e.qualityScores=void 0}function Rp(e){try{const t=new Kh(e.confidenceMasks,e.categoryMask,e.qualityScores);if(!e.j)return t;e.j(t)}finally{kc(e)}}Kh.prototype.close=Kh.prototype.close;var pn=class extends Cn{constructor(e,t){super(new Qn(e,t),"image_in","norm_rect",!1),this.u=[],this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new Qu,this.A=new mg,Lt(this.h,0,3,this.A),Lt(e=this.h,0,1,t=new Re)}get baseOptions(){return te(this.h,Re,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return e.displayNamesLocale!==void 0?le(this.h,2,Ga(e.displayNamesLocale)):"displayNamesLocale"in e&&le(this.h,2),"outputCategoryMask"in e&&(this.outputCategoryMask=e.outputCategoryMask??!1),"outputConfidenceMasks"in e&&(this.outputConfidenceMasks=e.outputConfidenceMasks??!0),super.l(e)}L(){ly(this)}segment(e,t,n){const i=typeof t!="function"?t:{};return this.j=typeof t=="function"?t:n,wp(this),ti(this,e,i),Rp(this)}La(e,t,n,i){const s=typeof n!="function"?n:{};return this.j=typeof n=="function"?n:i,wp(this),Ei(this,e,s,t),Rp(this)}Da(){return this.u}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"norm_rect");const t=new Pn;Si(t,_g,this.h);const n=new _n;Rn(n,2,"mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),n.o(t),Hn(e,n),Bc(this,e),this.outputConfidenceMasks&&(ee(e,"confidence_masks"),$t(n,"CONFIDENCE_MASKS:confidence_masks"),zr(this,"confidence_masks"),this.g.aa("confidence_masks",(i,s)=>{this.confidenceMasks=i.map(r=>Gr(this,r,!0,!this.j)),mt(this,s)}),this.g.attachEmptyPacketListener("confidence_masks",i=>{this.confidenceMasks=[],mt(this,i)})),this.outputCategoryMask&&(ee(e,"category_mask"),$t(n,"CATEGORY_MASK:category_mask"),zr(this,"category_mask"),this.g.Z("category_mask",(i,s)=>{this.categoryMask=Gr(this,i,!1,!this.j),mt(this,s)}),this.g.attachEmptyPacketListener("category_mask",i=>{this.categoryMask=void 0,mt(this,i)})),ee(e,"quality_scores"),$t(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",(i,s)=>{this.qualityScores=i,mt(this,s)}),this.g.attachEmptyPacketListener("quality_scores",i=>{this.categoryMask=void 0,mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};pn.prototype.getLabels=pn.prototype.Da,pn.prototype.segmentForVideo=pn.prototype.La,pn.prototype.segment=pn.prototype.segment,pn.prototype.setOptions=pn.prototype.o,pn.createFromModelPath=function(e,t){return Zt(pn,e,{baseOptions:{modelAssetPath:t}})},pn.createFromModelBuffer=function(e,t){return Zt(pn,e,{baseOptions:{modelAssetBuffer:t}})},pn.createFromOptions=function(e,t){return Zt(pn,e,t)};var Zh=class{constructor(e,t,n){this.confidenceMasks=e,this.categoryMask=t,this.qualityScores=n}close(){var e,t;(e=this.confidenceMasks)==null||e.forEach(n=>{n.close()}),(t=this.categoryMask)==null||t.close()}};Zh.prototype.close=Zh.prototype.close;var ri=class extends Cn{constructor(e,t){super(new Qn(e,t),"image_in","norm_rect_in",!1),this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new Qu,this.u=new mg,Lt(this.h,0,3,this.u),Lt(e=this.h,0,1,t=new Re)}get baseOptions(){return te(this.h,Re,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return"outputCategoryMask"in e&&(this.outputCategoryMask=e.outputCategoryMask??!1),"outputConfidenceMasks"in e&&(this.outputConfidenceMasks=e.outputConfidenceMasks??!0),super.l(e)}segment(e,t,n,i){const s=typeof n!="function"?n:{};if(this.j=typeof n=="function"?n:i,this.qualityScores=this.categoryMask=this.confidenceMasks=void 0,n=this.C+1,i=new vg,t.keypoint&&t.scribble)throw Error("Cannot provide both keypoint and scribble.");if(t.keypoint){var r=new Ul;is(r,3,La(!0),!1),is(r,1,Sa(t.keypoint.x),0),is(r,2,Sa(t.keypoint.y),0),ya(i,1,Xh,r)}else{if(!t.scribble)throw Error("Must provide either a keypoint or a scribble.");{const o=new QS;for(r of t.scribble)is(t=new Ul,3,La(!0),!1),is(t,1,Sa(r.x),0),is(t,2,Sa(r.y),0),Lu(o,1,Ul,t);ya(i,2,Xh,o)}}this.g.addProtoToStream(i.g(),"mediapipe.tasks.vision.interactive_segmenter.proto.RegionOfInterest","roi_in",n),ti(this,e,s);t:{try{const o=new Zh(this.confidenceMasks,this.categoryMask,this.qualityScores);if(!this.j){var a=o;break t}this.j(o)}finally{kc(this)}a=void 0}return a}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"roi_in"),Ae(e,"norm_rect_in");const t=new Pn;Si(t,_g,this.h);const n=new _n;Rn(n,2,"mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraphV2"),Me(n,"IMAGE:image_in"),Me(n,"ROI:roi_in"),Me(n,"NORM_RECT:norm_rect_in"),n.o(t),Hn(e,n),Bc(this,e),this.outputConfidenceMasks&&(ee(e,"confidence_masks"),$t(n,"CONFIDENCE_MASKS:confidence_masks"),zr(this,"confidence_masks"),this.g.aa("confidence_masks",(i,s)=>{this.confidenceMasks=i.map(r=>Gr(this,r,!0,!this.j)),mt(this,s)}),this.g.attachEmptyPacketListener("confidence_masks",i=>{this.confidenceMasks=[],mt(this,i)})),this.outputCategoryMask&&(ee(e,"category_mask"),$t(n,"CATEGORY_MASK:category_mask"),zr(this,"category_mask"),this.g.Z("category_mask",(i,s)=>{this.categoryMask=Gr(this,i,!1,!this.j),mt(this,s)}),this.g.attachEmptyPacketListener("category_mask",i=>{this.categoryMask=void 0,mt(this,i)})),ee(e,"quality_scores"),$t(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",(i,s)=>{this.qualityScores=i,mt(this,s)}),this.g.attachEmptyPacketListener("quality_scores",i=>{this.categoryMask=void 0,mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};ri.prototype.segment=ri.prototype.segment,ri.prototype.setOptions=ri.prototype.o,ri.createFromModelPath=function(e,t){return Zt(ri,e,{baseOptions:{modelAssetPath:t}})},ri.createFromModelBuffer=function(e,t){return Zt(ri,e,{baseOptions:{modelAssetBuffer:t}})},ri.createFromOptions=function(e,t){return Zt(ri,e,t)};var Fn=class extends Cn{constructor(e,t){super(new Qn(e,t),"input_frame_gpu","norm_rect",!1),this.j={detections:[]},Lt(e=this.h=new xg,0,1,t=new Re)}get baseOptions(){return te(this.h,Re,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return e.displayNamesLocale!==void 0?le(this.h,2,Ga(e.displayNamesLocale)):"displayNamesLocale"in e&&le(this.h,2),e.maxResults!==void 0?Wi(this.h,3,e.maxResults):"maxResults"in e&&le(this.h,3),e.scoreThreshold!==void 0?Ct(this.h,4,e.scoreThreshold):"scoreThreshold"in e&&le(this.h,4),e.categoryAllowlist!==void 0?sc(this.h,5,e.categoryAllowlist):"categoryAllowlist"in e&&le(this.h,5),e.categoryDenylist!==void 0?sc(this.h,6,e.categoryDenylist):"categoryDenylist"in e&&le(this.h,6),this.l(e)}F(e,t){return this.j={detections:[]},ti(this,e,t),this.j}G(e,t,n){return this.j={detections:[]},Ei(this,e,n,t),this.j}m(){var e=new Ln;Ae(e,"input_frame_gpu"),Ae(e,"norm_rect"),ee(e,"detections");const t=new Pn;Si(t,ty,this.h);const n=new _n;Rn(n,2,"mediapipe.tasks.vision.ObjectDetectorGraph"),Me(n,"IMAGE:input_frame_gpu"),Me(n,"NORM_RECT:norm_rect"),$t(n,"DETECTIONS:detections"),n.o(t),Hn(e,n),this.g.attachProtoVectorListener("detections",(i,s)=>{for(const r of i)i=K0(r),this.j.detections.push(yg(i));mt(this,s)}),this.g.attachEmptyPacketListener("detections",i=>{mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Fn.prototype.detectForVideo=Fn.prototype.G,Fn.prototype.detect=Fn.prototype.F,Fn.prototype.setOptions=Fn.prototype.o,Fn.createFromModelPath=async function(e,t){return Zt(Fn,e,{baseOptions:{modelAssetPath:t}})},Fn.createFromModelBuffer=function(e,t){return Zt(Fn,e,{baseOptions:{modelAssetBuffer:t}})},Fn.createFromOptions=function(e,t){return Zt(Fn,e,t)};var Jh=class{constructor(e,t,n){this.landmarks=e,this.worldLandmarks=t,this.segmentationMasks=n}close(){var e;(e=this.segmentationMasks)==null||e.forEach(t=>{t.close()})}};function Cp(e){e.landmarks=[],e.worldLandmarks=[],e.segmentationMasks=void 0}function Pp(e){try{const t=new Jh(e.landmarks,e.worldLandmarks,e.segmentationMasks);if(!e.u)return t;e.u(t)}finally{kc(e)}}Jh.prototype.close=Jh.prototype.close;var En=class extends Cn{constructor(e,t){super(new Qn(e,t),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.outputSegmentationMasks=!1,Lt(e=this.h=new Mg,0,1,t=new Re),this.A=new ug,Lt(this.h,0,3,this.A),this.j=new hg,Lt(this.h,0,2,this.j),Wi(this.j,4,1),Ct(this.j,2,.5),Ct(this.A,2,.5),Ct(this.h,4,.5)}get baseOptions(){return te(this.h,Re,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return"numPoses"in e&&Wi(this.j,4,e.numPoses??1),"minPoseDetectionConfidence"in e&&Ct(this.j,2,e.minPoseDetectionConfidence??.5),"minTrackingConfidence"in e&&Ct(this.h,4,e.minTrackingConfidence??.5),"minPosePresenceConfidence"in e&&Ct(this.A,2,e.minPosePresenceConfidence??.5),"outputSegmentationMasks"in e&&(this.outputSegmentationMasks=e.outputSegmentationMasks??!1),this.l(e)}F(e,t,n){const i=typeof t!="function"?t:{};return this.u=typeof t=="function"?t:n,Cp(this),ti(this,e,i),Pp(this)}G(e,t,n,i){const s=typeof n!="function"?n:{};return this.u=typeof n=="function"?n:i,Cp(this),Ei(this,e,s,t),Pp(this)}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"norm_rect"),ee(e,"normalized_landmarks"),ee(e,"world_landmarks"),ee(e,"segmentation_masks");const t=new Pn;Si(t,ey,this.h);const n=new _n;Rn(n,2,"mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),$t(n,"NORM_LANDMARKS:normalized_landmarks"),$t(n,"WORLD_LANDMARKS:world_landmarks"),n.o(t),Hn(e,n),Bc(this,e),this.g.attachProtoVectorListener("normalized_landmarks",(i,s)=>{this.landmarks=[];for(const r of i)i=Xa(r),this.landmarks.push(Oc(i));mt(this,s)}),this.g.attachEmptyPacketListener("normalized_landmarks",i=>{this.landmarks=[],mt(this,i)}),this.g.attachProtoVectorListener("world_landmarks",(i,s)=>{this.worldLandmarks=[];for(const r of i)i=Mr(r),this.worldLandmarks.push(ba(i));mt(this,s)}),this.g.attachEmptyPacketListener("world_landmarks",i=>{this.worldLandmarks=[],mt(this,i)}),this.outputSegmentationMasks&&($t(n,"SEGMENTATION_MASK:segmentation_masks"),zr(this,"segmentation_masks"),this.g.aa("segmentation_masks",(i,s)=>{this.segmentationMasks=i.map(r=>Gr(this,r,!0,!this.u)),mt(this,s)}),this.g.attachEmptyPacketListener("segmentation_masks",i=>{this.segmentationMasks=[],mt(this,i)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};En.prototype.detectForVideo=En.prototype.G,En.prototype.detect=En.prototype.F,En.prototype.setOptions=En.prototype.o,En.createFromModelPath=function(e,t){return Zt(En,e,{baseOptions:{modelAssetPath:t}})},En.createFromModelBuffer=function(e,t){return Zt(En,e,{baseOptions:{modelAssetBuffer:t}})},En.createFromOptions=function(e,t){return Zt(En,e,t)},En.POSE_CONNECTIONS=Og;function hy(e,t){return Math.sqrt((e.x-t.x)**2+(e.y-t.y)**2)}function Lp(e,t,n){return e+n*(t-e)}const as={WRIST:0,THUMB_TIP:4,INDEX_TIP:8,INDEX_MCP:5,MIDDLE_MCP:9,RING_MCP:13,PINKY_MCP:17},Ro=[as.WRIST,as.INDEX_MCP,as.MIDDLE_MCP,as.RING_MCP,as.PINKY_MCP],uy={Pointing_Up:"pointing",Closed_Fist:"fist",Open_Palm:"openpalm",Thumb_Up:"thumbsup",Thumb_Down:"thumbsdown",Victory:"victory",ILoveYou:"iloveyou"},dy="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm",fy="https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task";class py{constructor(t=dy,n=.06,i=null){kt(this,"recognizer",null);this.wasmPath=t,this.clickThreshold=n,this.handednessFilter=i}async init(){const t=await Is.forVisionTasks(this.wasmPath);this.recognizer=await mn.createFromOptions(t,{baseOptions:{modelAssetPath:fy,delegate:"GPU"},numHands:this.handednessFilter?2:1,runningMode:"VIDEO"})}detect(t,n){if(!this.recognizer)return null;const i=this.recognizer.recognizeForVideo(t,n);if(!i.landmarks||i.landmarks.length===0)return null;let s=0;if(this.handednessFilter){const a=i.handedness.findIndex(o=>{var c;return((c=o[0])==null?void 0:c.categoryName)===this.handednessFilter});if(a===-1)return null;s=a}const r=i.gestures[s]??[];return this.analyze(i.landmarks[s],r)}analyze(t,n){const i=t[as.THUMB_TIP],s=t[as.INDEX_TIP],r=t[as.WRIST],a={x:Ro.reduce((h,m)=>h+t[m].x,0)/Ro.length,y:Ro.reduce((h,m)=>h+t[m].y,0)/Ro.length},o=hy(i,s),c=n[0],l=c?uy[c.categoryName]??null:null,u=(c==null?void 0:c.score)??0;return{gesture:o<this.clickThreshold?"click":l??"none",gestureName:l,gestureConfidence:u,clickPinchDistance:o,indexTip:{x:s.x,y:s.y},wrist:{x:r.x,y:r.y},palmCenter:a}}destroy(){var t;(t=this.recognizer)==null||t.close(),this.recognizer=null}}const Nn={L_OUTER:33,L_INNER:133,L_TOP:159,L_BOT:145,R_INNER:362,R_OUTER:263,R_TOP:386,R_BOT:374},Ip=468,Dp=473,my="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm",gy="https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";function Co(e,t){return Math.abs(t)<1e-6?.5:e/t}class _y{constructor(t=my){kt(this,"landmarker",null);this.wasmPath=t}async init(){const t=await Is.forVisionTasks(this.wasmPath);this.landmarker=await Se.createFromOptions(t,{baseOptions:{modelAssetPath:gy,delegate:"GPU"},outputFaceBlendshapes:!1,runningMode:"VIDEO",numFaces:1})}detect(t,n){var s;if(!this.landmarker)return null;const i=this.landmarker.detectForVideo(t,n);return(s=i.faceLandmarks)!=null&&s.length?this.analyze(i.faceLandmarks[0]):null}analyze(t){const n=Co(t[Ip].x-t[Nn.L_OUTER].x,t[Nn.L_INNER].x-t[Nn.L_OUTER].x),i=Co(t[Dp].x-t[Nn.R_INNER].x,t[Nn.R_OUTER].x-t[Nn.R_INNER].x),s=(n+i)/2,r=Co(t[Ip].y-t[Nn.L_TOP].y,t[Nn.L_BOT].y-t[Nn.L_TOP].y),a=Co(t[Dp].y-t[Nn.R_TOP].y,t[Nn.R_BOT].y-t[Nn.R_TOP].y),o=(r+a)/2;return{gazeX:s,gazeY:o}}destroy(){var t;(t=this.landmarker)==null||t.close(),this.landmarker=null}}const Up="handface_key_bindings";function vy(e){return{" ":"Space",ArrowUp:"↑",ArrowDown:"↓",ArrowLeft:"←",ArrowRight:"→",Escape:"Esc",Backspace:"⌫",Delete:"Del",Enter:"↵",Tab:"Tab",PageUp:"PgUp",PageDown:"PgDn",Home:"Home",End:"End"}[e]??e}class xy{constructor(){kt(this,"bindings",new Map);this.load()}bind(t,n,i){this.bindings.set(t,{gesture:t,key:n,modifiers:i}),this.save()}unbind(t){this.bindings.delete(t),this.save()}getBinding(t){return this.bindings.get(t)}getAll(){return[...this.bindings.values()]}trigger(t){var s,r,a,o;const n=this.bindings.get(t);if(!n)return;const i={key:n.key,bubbles:!0,cancelable:!0,ctrlKey:((s=n.modifiers)==null?void 0:s.ctrl)??!1,altKey:((r=n.modifiers)==null?void 0:r.alt)??!1,shiftKey:((a=n.modifiers)==null?void 0:a.shift)??!1,metaKey:((o=n.modifiers)==null?void 0:o.meta)??!1};document.dispatchEvent(new KeyboardEvent("keydown",i)),document.dispatchEvent(new KeyboardEvent("keyup",i))}save(){try{localStorage.setItem(Up,JSON.stringify([...this.bindings.entries()]))}catch{}}load(){try{const t=localStorage.getItem(Up);t&&(this.bindings=new Map(JSON.parse(t)))}catch{}}}const Fp={pointing:{icon:"☝️",label:"Pointing Up",labelKo:"검지 가리키기",builtin:!0,builtinAction:"커서 이동"},fist:{icon:"✊",label:"Closed Fist",labelKo:"주먹",builtin:!0,builtinAction:"스크롤 다운"},openpalm:{icon:"🖐️",label:"Open Palm",labelKo:"펼친 손",builtin:!0,builtinAction:"스크롤 업"},thumbsup:{icon:"👍",label:"Thumbs Up",labelKo:"엄지 위",builtin:!1},thumbsdown:{icon:"👎",label:"Thumbs Down",labelKo:"엄지 아래",builtin:!1},victory:{icon:"✌️",label:"Victory",labelKo:"브이",builtin:!1},iloveyou:{icon:"🤟",label:"I Love You",labelKo:"아이 러브 유",builtin:!1}},ut="hf-",My=["thumbsup","thumbsdown","victory","iloveyou"],Sy=["pointing","fist","openpalm"];class yy{constructor(t){kt(this,"root");kt(this,"fab");kt(this,"panel");kt(this,"styleEl");kt(this,"isOpen",!1);kt(this,"capturingGesture",null);kt(this,"captureHandler",null);kt(this,"detectedGesture",null);this.mapper=t,this.styleEl=this.injectStyles(),this.fab=this.createFab(),this.panel=this.createPanel(),this.root=document.createElement("div"),this.root.setAttribute("data-handface",""),this.root.appendChild(this.fab),this.root.appendChild(this.panel),document.body.appendChild(this.root),this.fab.addEventListener("click",()=>this.toggle())}setDetected(t,n){this.isOpen&&this.detectedGesture!==t&&(this.detectedGesture=t,this.panel.querySelectorAll(`.${ut}row[data-gesture]`).forEach(i=>{const s=i.dataset.gesture;i.classList.toggle(`${ut}active`,s===t&&n>.6)}))}destroy(){this.stopCapture(),this.styleEl.remove(),this.root.remove()}toggle(){this.isOpen?this.close():this.open()}open(){this.isOpen=!0,this.renderRows(),this.panel.classList.add(`${ut}open`),this.fab.classList.add(`${ut}fab-open`)}close(){this.isOpen=!1,this.stopCapture(),this.panel.classList.remove(`${ut}open`),this.fab.classList.remove(`${ut}fab-open`)}startCapture(t){this.stopCapture(),this.capturingGesture=t,this.captureHandler=n=>{if(n.preventDefault(),n.stopImmediatePropagation(),["Shift","Control","Alt","Meta"].includes(n.key)){document.addEventListener("keydown",this.captureHandler,{once:!0,capture:!0});return}this.mapper.bind(t,n.key,{ctrl:n.ctrlKey||void 0,alt:n.altKey||void 0,shift:n.shiftKey||void 0,meta:n.metaKey||void 0}),this.capturingGesture=null,this.captureHandler=null,this.renderRows()},document.addEventListener("keydown",this.captureHandler,{once:!0,capture:!0}),this.renderRows()}stopCapture(){this.captureHandler&&(document.removeEventListener("keydown",this.captureHandler,{capture:!0}),this.captureHandler=null,this.capturingGesture=null)}createFab(){const t=document.createElement("button");return t.className=`${ut}fab`,t.title="handface 제스처 설정",t.innerHTML="✋",t}createPanel(){const t=document.createElement("div");return t.className=`${ut}panel`,t.innerHTML=`
      <div class="${ut}header">
        <span class="${ut}title">✋ handface</span>
        <button class="${ut}close-btn" title="닫기">✕</button>
      </div>
      <div class="${ut}body">
        <div class="${ut}section-label">기본 동작</div>
        <div class="${ut}builtin-rows"></div>
        <div class="${ut}section-label" style="margin-top:10px">단축키 바인딩</div>
        <div class="${ut}binding-rows"></div>
      </div>
    `,t.querySelector(`.${ut}close-btn`).addEventListener("click",()=>this.close()),t}renderRows(){this.renderBuiltin(),this.renderBindings()}renderBuiltin(){const t=this.panel.querySelector(`.${ut}builtin-rows`);t.innerHTML="",t.appendChild(this.makeReadonlyRow("🤌","엄지+검지 핀치","클릭",null));for(const n of Sy){const i=Fp[n];t.appendChild(this.makeReadonlyRow(i.icon,i.labelKo,i.builtinAction,n))}}renderBindings(){const t=this.panel.querySelector(`.${ut}binding-rows`);t.innerHTML="";for(const n of My){const i=Fp[n],s=this.mapper.getBinding(n),r=this.capturingGesture===n;t.appendChild(this.makeBindingRow(n,i.icon,i.labelKo,(s==null?void 0:s.key)??null,r))}}makeReadonlyRow(t,n,i,s){const r=document.createElement("div");return r.className=`${ut}row`,s&&(r.dataset.gesture=s),r.innerHTML=`
      <span class="${ut}icon">${t}</span>
      <span class="${ut}name">${n}</span>
      <span class="${ut}badge">${i}</span>
    `,r}makeBindingRow(t,n,i,s,r){var c;const a=document.createElement("div");a.className=`${ut}row`,a.dataset.gesture=t;const o=s?this.buildKeyLabel(this.mapper.getBinding(t)):null;return r?(a.innerHTML=`
        <span class="${ut}icon">${n}</span>
        <span class="${ut}name">${i}</span>
        <span class="${ut}capture-hint">단축키 입력...</span>
        <button class="${ut}cancel-btn">취소</button>
      `,a.querySelector(`.${ut}cancel-btn`).addEventListener("click",()=>{this.stopCapture(),this.renderRows()})):(a.innerHTML=`
        <span class="${ut}icon">${n}</span>
        <span class="${ut}name">${i}</span>
        ${o?`<span class="${ut}key-tag">${o}</span>
             <button class="${ut}bind-btn ${ut}clear-btn" data-gesture="${t}" title="제거">✕</button>`:`<span class="${ut}no-bind">—</span>`}
        <button class="${ut}bind-btn ${ut}edit-btn" data-gesture="${t}" title="단축키 설정">✎</button>
      `,a.querySelector(`.${ut}edit-btn`).addEventListener("click",()=>this.startCapture(t)),(c=a.querySelector(`.${ut}clear-btn`))==null||c.addEventListener("click",()=>{this.mapper.unbind(t),this.renderRows()})),a}buildKeyLabel(t){var i,s,r,a;const n=[];return(i=t.modifiers)!=null&&i.ctrl&&n.push("Ctrl"),(s=t.modifiers)!=null&&s.alt&&n.push("Alt"),(r=t.modifiers)!=null&&r.shift&&n.push("Shift"),(a=t.modifiers)!=null&&a.meta&&n.push("⌘"),n.push(vy(t.key)),n.join("+")}injectStyles(){const t=document.createElement("style");return t.dataset.handface="styles",t.textContent=`
      .${ut}fab {
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
      .${ut}fab:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(124,106,247,0.65); }
      .${ut}fab-open  { transform: rotate(20deg) scale(1.05); }

      .${ut}panel {
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
      .${ut}open {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: all;
      }

      .${ut}header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 13px 16px 11px;
        border-bottom: 1px solid rgba(255,255,255,0.07);
      }
      .${ut}title {
        font-weight: 700;
        font-size: 0.85rem;
        letter-spacing: -0.01em;
      }
      .${ut}close-btn {
        background: none;
        border: none;
        color: rgba(221,221,245,0.45);
        cursor: pointer;
        font-size: 0.8rem;
        padding: 2px 4px;
        border-radius: 4px;
        transition: color 0.12s;
      }
      .${ut}close-btn:hover { color: #ddddf5; }

      .${ut}body {
        padding: 12px 14px 14px;
      }
      .${ut}section-label {
        font-size: 0.6rem;
        text-transform: uppercase;
        letter-spacing: 0.11em;
        opacity: 0.35;
        margin-bottom: 7px;
      }

      .${ut}row {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 5px 6px;
        border-radius: 8px;
        margin-bottom: 3px;
        transition: background 0.15s;
      }
      .${ut}row.${ut}active {
        background: rgba(124,106,247,0.18);
      }

      .${ut}icon { font-size: 1rem; width: 22px; text-align: center; flex-shrink: 0; }
      .${ut}name { flex: 1; opacity: 0.8; font-size: 0.76rem; }

      .${ut}badge {
        font-size: 0.65rem;
        background: rgba(124,106,247,0.25);
        color: #9d8dff;
        padding: 2px 7px;
        border-radius: 99px;
        white-space: nowrap;
      }

      .${ut}key-tag {
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

      .${ut}no-bind {
        font-size: 0.72rem;
        opacity: 0.3;
      }

      .${ut}bind-btn {
        background: none;
        border: none;
        cursor: pointer;
        border-radius: 5px;
        padding: 2px 5px;
        font-size: 0.75rem;
        transition: background 0.12s, color 0.12s;
        flex-shrink: 0;
      }
      .${ut}edit-btn  { color: rgba(221,221,245,0.45); }
      .${ut}edit-btn:hover  { background: rgba(124,106,247,0.2); color: #9d8dff; }
      .${ut}clear-btn { color: rgba(221,221,245,0.3); }
      .${ut}clear-btn:hover { background: rgba(255,80,80,0.15); color: #ff6b6b; }

      .${ut}capture-hint {
        flex: 1;
        font-size: 0.7rem;
        color: #ffd166;
        animation: ${ut}blink 1s step-end infinite;
      }
      .${ut}cancel-btn {
        background: none;
        border: 1px solid rgba(255,80,80,0.3);
        color: rgba(255,100,100,0.7);
        border-radius: 5px;
        padding: 2px 7px;
        font-size: 0.65rem;
        cursor: pointer;
        flex-shrink: 0;
      }
      .${ut}cancel-btn:hover { background: rgba(255,80,80,0.1); }

      @keyframes ${ut}blink {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.3; }
      }
    `,document.head.appendChild(t),t}}const Ey=.1,by=1e3,Np=12,Ay=900,Ty=.022,Op=.04,wy=.65;function Ry(e){return e==="right"?"Right":e==="left"?"Left":null}function Bp(e,t,n){return Math.max(0,Math.min(1,(e-t)/(n-t)))}class Cy extends TM{constructor(n={}){super();kt(this,"video");kt(this,"detector");kt(this,"gazeDetector",null);kt(this,"rafId",null);kt(this,"stream",null);kt(this,"panel",null);kt(this,"isClicking",!1);kt(this,"lastClickMs",0);kt(this,"lastGestureMs",new Map);kt(this,"smoothX",.5);kt(this,"smoothY",.5);kt(this,"prevRawX",.5);kt(this,"prevRawY",.5);kt(this,"wasMovingCursor",!1);kt(this,"calibrated",!1);kt(this,"zoneX0",0);kt(this,"zoneX1",1);kt(this,"zoneY0",0);kt(this,"zoneY1",1);kt(this,"flipHorizontal");kt(this,"cursorSource");kt(this,"cursorAnchor");kt(this,"cursorMode");kt(this,"sensitivity");kt(this,"activeZone");kt(this,"gestureGated");kt(this,"ownedVideo");kt(this,"mapper",new xy);this.flipHorizontal=n.flipHorizontal??!0,this.cursorSource=n.cursorSource??"hand",this.cursorAnchor=n.cursorAnchor??"palm",this.cursorMode=n.cursorMode??"absolute",this.sensitivity=n.sensitivity??2.5,this.gestureGated=n.gestureGated??!1;const i=this.cursorSource==="gaze"?[.35,.35,.65,.65]:[.3,.1,.95,.85];this.activeZone=n.activeZone??i,[this.zoneX0,this.zoneY0,this.zoneX1,this.zoneY1]=this.activeZone;const s=n.threshold??.05;n.video?(this.video=n.video,this.ownedVideo=!1):(this.video=this.createHiddenVideo(),this.ownedVideo=!0),this.detector=new py(n.wasmPath,s,Ry(n.handedness??"right")),this.cursorSource==="gaze"&&(this.gazeDetector=new _y(n.wasmPath))}async start(){await this.detector.init(),this.gazeDetector&&await this.gazeDetector.init(),this.stream=await navigator.mediaDevices.getUserMedia({video:!0}),this.video.srcObject=this.stream,await new Promise(n=>{this.video.onloadedmetadata=()=>{this.video.play(),n()}}),this.loop()}stop(){var n,i,s;this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),(n=this.stream)==null||n.getTracks().forEach(r=>r.stop()),this.stream=null,this.detector.destroy(),(i=this.gazeDetector)==null||i.destroy(),this.gazeDetector=null,(s=this.panel)==null||s.destroy(),this.panel=null,this.ownedVideo&&this.video.remove(),this.removeAllListeners()}recalibrate(){this.calibrated=!1}createPanel(){return this.panel||(this.panel=new yy(this.mapper)),this.panel}createHiddenVideo(){const n=document.createElement("video");return n.style.cssText="position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;",document.body.appendChild(n),n}loop(){this.rafId=requestAnimationFrame(()=>{this.tick(),this.rafId!==null&&this.loop()})}tick(){const n=performance.now(),i=this.detector.detect(this.video,n);let s,r;if(this.gazeDetector){const c=this.gazeDetector.detect(this.video,n);if(!c){i&&this.handleGestureEvents(i,this.currentPos());return}s=this.flipHorizontal?1-c.gazeX:c.gazeX,r=c.gazeY}else{if(!i)return;const c=this.cursorAnchor==="index"?i.indexTip:this.cursorAnchor==="palm"?i.palmCenter:i.wrist;s=this.flipHorizontal?1-c.x:c.x,r=c.y}const a=!this.isClicking&&(this.gazeDetector!==null||!this.gestureGated||(i==null?void 0:i.gestureName)==="pointing");if(a){let c,l;if(this.cursorMode==="relative"){this.wasMovingCursor||(this.prevRawX=s,this.prevRawY=r);const m=(s-this.prevRawX)*this.sensitivity,g=(r-this.prevRawY)*this.sensitivity;c=Math.max(0,Math.min(1,this.smoothX+m)),l=Math.max(0,Math.min(1,this.smoothY+g))}else{if(!this.calibrated){const m=(this.activeZone[2]-this.activeZone[0])/2,g=(this.activeZone[3]-this.activeZone[1])/2;this.zoneX0=s-m,this.zoneX1=s+m,this.zoneY0=r-g,this.zoneY1=r+g,this.smoothX=.5,this.smoothY=.5,this.calibrated=!0}c=Bp(s,this.zoneX0,this.zoneX1),l=Bp(r,this.zoneY0,this.zoneY1)}const u=Math.hypot(s-this.prevRawX,r-this.prevRawY),d=Math.min(u/Ty,1),h=Op+d*(wy-Op);this.smoothX=Lp(this.smoothX,c,h),this.smoothY=Lp(this.smoothY,l,h)}this.prevRawX=s,this.prevRawY=r,this.wasMovingCursor=a;const o=this.currentPos();this.emit("move",o),i&&this.handleGestureEvents(i,o)}currentPos(){return{x:this.smoothX,y:this.smoothY,screenX:Math.round(this.smoothX*window.innerWidth),screenY:Math.round(this.smoothY*window.innerHeight)}}handleGestureEvents(n,i){var r,a;if(n.gesture==="click"){if(!this.isClicking){this.isClicking=!0;const o=Date.now();o-this.lastClickMs>by&&(this.lastClickMs=o,this.emit("click",i))}}else n.clickPinchDistance>Ey&&(this.isClicking=!1);this.isClicking||(n.gestureName==="fist"?this.emit("scroll",{deltaY:Np}):n.gestureName==="openpalm"&&this.emit("scroll",{deltaY:-Np}));const s=n.gestureName;if(s){(r=this.panel)==null||r.setDetected(s,n.gestureConfidence);const o=Date.now(),c=this.lastGestureMs.get(s)??0;if(o-c>Ay){this.lastGestureMs.set(s,o);const l={gesture:s,...i,confidence:n.gestureConfidence};this.emit(s,l),this.mapper.trigger(s)}}else(a=this.panel)==null||a.setDetected(null,0)}}const kp="\0";function Py(e){return(Math.random()*2-1)*e}function ai(e,t,n){const i=new Array(e);for(let s=0;s<e;s++){const r=new Float32Array(t);if(n>0)for(let a=0;a<t;a++)r[a]=Py(n);i[s]=r}return i}function Ly(e,t){let n=-1/0;for(let r=0;r<t;r++)e[r]>n&&(n=e[r]);let i=0;for(let r=0;r<t;r++)e[r]=Math.exp(e[r]-n),i+=e[r];const s=1/i;for(let r=0;r<t;r++)e[r]*=s}class ps{constructor(t={}){this.MAX_VOCAB=t.maxVocab??220,this.CTX=t.contextLen??8,this.EMB=t.embedDim??16,this.H1=t.h1??112,this.H2=t.h2??96,this.H3=t.h3??64,this.lr=t.lr??.025,this.momentum=t.momentum??.85,this.clipGrad=t.clipGrad??1;const n=this.MAX_VOCAB,i=this.CTX*this.EMB;this.vocab=new Map,this.invVocab=[],this.addChar(kp),this.embed=ai(n,this.EMB,.12),this.W1=ai(i,this.H1,.08),this.b1=new Float32Array(this.H1),this.W2=ai(this.H1,this.H2,.1),this.b2=new Float32Array(this.H2),this.W3=ai(this.H2,this.H3,.12),this.b3=new Float32Array(this.H3),this.W4=ai(this.H3,n,.1),this.b4=new Float32Array(n),this.vEmbed=ai(n,this.EMB,0),this.vW1=ai(i,this.H1,0),this.vb1=new Float32Array(this.H1),this.vW2=ai(this.H1,this.H2,0),this.vb2=new Float32Array(this.H2),this.vW3=ai(this.H2,this.H3,0),this.vb3=new Float32Array(this.H3),this.vW4=ai(this.H3,n,0),this.vb4=new Float32Array(n),this.lastX=new Float32Array(i),this.lastH1=new Float32Array(this.H1),this.lastH2=new Float32Array(this.H2),this.lastH3=new Float32Array(this.H3),this.lastLogits=new Float32Array(n),this.lastProbs=new Float32Array(n),this.totalSteps=0,this.lossEMA=null}addChar(t){if(this.vocab.has(t))return this.vocab.get(t);if(this.vocab.size>=this.MAX_VOCAB)return 0;const n=this.vocab.size;return this.vocab.set(t,n),this.invVocab.push(t),n}encode(t){const n=[];for(const i of t){const s=this.addChar(i);n.push(s)}return n}forward(t){const{CTX:n,EMB:i,H1:s,H2:r,H3:a,lastX:o,lastH1:c,lastH2:l,lastH3:u,lastLogits:d,lastProbs:h}=this,m=this.vocab.size;for(let g=0;g<n;g++){const M=t[g]|0,p=this.embed[M];for(let f=0;f<i;f++)o[g*i+f]=p[f]}for(let g=0;g<s;g++){let M=this.b1[g];for(let p=0;p<o.length;p++)M+=o[p]*this.W1[p][g];c[g]=M>0?M:0}for(let g=0;g<r;g++){let M=this.b2[g];for(let p=0;p<s;p++)M+=c[p]*this.W2[p][g];l[g]=M>0?M:0}for(let g=0;g<a;g++){let M=this.b3[g];for(let p=0;p<r;p++)M+=l[p]*this.W3[p][g];u[g]=M>0?M:0}for(let g=0;g<m;g++){let M=this.b4[g];for(let p=0;p<a;p++)M+=u[p]*this.W4[p][g];d[g]=M,h[g]=M}return Ly(h,m),h}backward(t,n){const i=this.forward(t),{CTX:s,EMB:r,H1:a,H2:o,H3:c,lr:l,momentum:u,clipGrad:d}=this,h=v=>Math.max(-d,Math.min(d,v)),m=this.vocab.size,g=this.lastX,M=this.lastH1,p=this.lastH2,f=this.lastH3,y=-Math.log(Math.max(i[n],1e-9)),A=new Float32Array(m);for(let v=0;v<m;v++)A[v]=i[v];A[n]-=1;for(let v=0;v<c;v++){const W=f[v],w=this.W4[v],U=this.vW4[v];for(let F=0;F<m;F++){const V=h(W*A[F]);U[F]=u*U[F]-l*V,w[F]+=U[F]}}for(let v=0;v<m;v++)this.vb4[v]=u*this.vb4[v]-l*h(A[v]),this.b4[v]+=this.vb4[v];const E=new Float32Array(c);for(let v=0;v<c;v++){if(f[v]<=0)continue;let W=0;const w=this.W4[v];for(let U=0;U<m;U++)W+=w[U]*A[U];E[v]=W}for(let v=0;v<o;v++){const W=p[v],w=this.W3[v],U=this.vW3[v];for(let F=0;F<c;F++){const V=h(W*E[F]);U[F]=u*U[F]-l*V,w[F]+=U[F]}}for(let v=0;v<c;v++)this.vb3[v]=u*this.vb3[v]-l*h(E[v]),this.b3[v]+=this.vb3[v];const T=new Float32Array(o);for(let v=0;v<o;v++){if(p[v]<=0)continue;let W=0;const w=this.W3[v];for(let U=0;U<c;U++)W+=w[U]*E[U];T[v]=W}for(let v=0;v<a;v++){const W=M[v],w=this.W2[v],U=this.vW2[v];for(let F=0;F<o;F++){const V=h(W*T[F]);U[F]=u*U[F]-l*V,w[F]+=U[F]}}for(let v=0;v<o;v++)this.vb2[v]=u*this.vb2[v]-l*h(T[v]),this.b2[v]+=this.vb2[v];const R=new Float32Array(a);for(let v=0;v<a;v++){if(M[v]<=0)continue;let W=0;const w=this.W2[v];for(let U=0;U<o;U++)W+=w[U]*T[U];R[v]=W}const P=s*r,x=new Float32Array(P);for(let v=0;v<P;v++){let W=0;const w=this.W1[v],U=this.vW1[v],F=g[v];for(let V=0;V<a;V++){W+=w[V]*R[V];const z=h(F*R[V]);U[V]=u*U[V]-l*z,w[V]+=U[V]}x[v]=W}for(let v=0;v<a;v++)this.vb1[v]=u*this.vb1[v]-l*h(R[v]),this.b1[v]+=this.vb1[v];for(let v=0;v<s;v++){const W=t[v]|0,w=this.embed[W],U=this.vEmbed[W],F=v*r;for(let V=0;V<r;V++){const z=h(x[F+V]);U[V]=u*U[V]-l*z,w[V]+=U[V]}}if(this.totalSteps++,this.lossEMA=this.lossEMA===null?y:this.lossEMA*.98+y*.02,!Number.isFinite(y)){for(const v of this.vW1)v.fill(0);for(const v of this.vW2)v.fill(0);for(const v of this.vW3)v.fill(0);for(const v of this.vW4)v.fill(0);this.vb1.fill(0),this.vb2.fill(0),this.vb3.fill(0),this.vb4.fill(0)}return y}trainOnText(t,n=3){const i=this.encode(t);if(i.length<2)return 0;let s=0,r=0;for(let a=0;a<n;a++)for(let o=1;o<i.length;o++){const c=new Array(this.CTX);for(let l=0;l<this.CTX;l++){const u=o-this.CTX+l;c[l]=u>=0?i[u]:0}s+=this.backward(c,i[o]),r++}return r>0?s/r:0}sample(t="",n=80,i=.85,s={}){const r=s.minLength??14,a=this.encode(t),o=[],c=new Array(this.CTX);for(let g=0;g<this.CTX;g++){const M=a.length-this.CTX+g;c[g]=M>=0?a[M]:0}const l=this.vocab.size,u=new Float32Array(l),d=0,h=this.vocab.get(`
`)??-1,m=[".","!","?",",","。","?","!"].map(g=>this.vocab.get(g)??-1).filter(g=>g>=0);for(let g=0;g<n;g++){const M=this.forward(c);let p=0;for(let T=0;T<l;T++)u[T]=Math.pow(M[T]+1e-9,1/i),p+=u[T];if(d<l&&(u[d]=0),h>=0&&h<l&&(u[h]=0),g<r)for(const T of m)T>=0&&T<l&&(u[T]=0);p=0;for(let T=0;T<l;T++)p+=u[T];if(p<1e-9)break;const f=1/p;let y=Math.random(),A=0;for(let T=0;T<l;T++)if(y-=u[T]*f,y<=0){A=T;break}const E=this.invVocab[A];if(!E||E===kp)break;o.push(E);for(let T=0;T<this.CTX-1;T++)c[T]=c[T+1];if(c[this.CTX-1]=A,g>=r&&(E==="."||E==="!"||E==="?"||E==="。"))break}if(o.length===0&&l>1)for(let g=0;g<10;g++){const M=1+Math.floor(Math.random()*(l-1)),p=this.invVocab[M];p&&p!=="\0"&&p!==`
`&&o.push(p)}return o.join("")}serialize(){return{vocab:Array.from(this.vocab.entries()),embed:this.embed.map(t=>Array.from(t)),W1:this.W1.map(t=>Array.from(t)),b1:Array.from(this.b1),W2:this.W2.map(t=>Array.from(t)),b2:Array.from(this.b2),W3:this.W3.map(t=>Array.from(t)),b3:Array.from(this.b3),W4:this.W4.map(t=>Array.from(t)),b4:Array.from(this.b4),totalSteps:this.totalSteps,lossEMA:this.lossEMA}}loadFrom(t){if(!t||!t.vocab)return!1;this.vocab.clear(),this.invVocab.length=0;for(const[i,s]of t.vocab)this.vocab.set(i,s),this.invVocab[s]=i;const n=(i,s)=>{for(let r=0;r<s.length;r++)if(Array.isArray(s[r]))for(let a=0;a<s[r].length;a++)i[r][a]=s[r][a];else i[r]=s[r]};return n(this.embed,t.embed),n(this.W1,t.W1),n(this.b1,t.b1),n(this.W2,t.W2),n(this.b2,t.b2),n(this.W3,t.W3),n(this.b3,t.b3),n(this.W4,t.W4),n(this.b4,t.b4),this.totalSteps=t.totalSteps||0,this.lossEMA=t.lossEMA??null,!0}}const Nl="handface-nlm-v3",Iy=300;class hd{constructor(){this.model=new ps({maxVocab:220,contextLen:8,embedDim:16,h1:112,h2:96,h3:64,lr:.025,clipGrad:1}),this.history=[],this.userMessages=[],this.handlers=new Set,this.busy=!1,this.autoSaveOn=!0,this._tryLoad()}onEvent(t){return this.handlers.add(t),()=>this.handlers.delete(t)}emit(t){for(const n of this.handlers)n(t)}get stats(){return{vocabSize:this.model.vocab.size,maxVocab:this.model.MAX_VOCAB,totalSteps:this.model.totalSteps,lossEMA:this.model.lossEMA,messages:this.history.length}}get modelState(){return{h1:this.model.lastH1,h2:this.model.lastH2,h3:this.model.lastH3,probs:this.model.lastProbs,vocabSize:this.model.vocab.size,embed:this.model.lastX}}layerWeightAverages(){const t=n=>{let i=0,s=0;for(const r of n)for(let a=0;a<r.length;a++)i+=Math.abs(r[a]),s++;return s>0?i/s:0};return[t(this.model.W1),t(this.model.W2),t(this.model.W3),t(this.model.W4)]}async send(t){if(!this.busy){this.busy=!0;try{this.history.push({role:"user",text:t}),this.userMessages.push(t),this.userMessages.length>Iy&&this.userMessages.shift(),this.emit({type:"training-start",message:t});const n=this.model.totalSteps;let i=0,s=0;const r=this.model.trainOnText(t,10);r>0&&(i+=r,s++);const a=this.userMessages.length-1;if(a>0){const M=Math.min(20,a);for(let p=0;p<M;p++){const f=Math.floor(Math.random()*a),y=this.model.trainOnText(this.userMessages[f],5);y>0&&(i+=y,s++)}}if(this.userMessages.length>=2){const M=[],p=Math.min(5,this.userMessages.length);for(let y=0;y<p;y++){const A=Math.floor(Math.random()*this.userMessages.length);M.push(this.userMessages[A])}const f=this.model.trainOnText(M.join(" "),4);f>0&&(i+=f,s++)}const o=this.model.trainOnText(t,5);o>0&&(i+=o,s++);const c=this.model.totalSteps-n,l=s>0?i/s:0;this.emit({type:"training-end",avgLoss:l,stepsRun:c,totalSteps:this.model.totalSteps}),await new Promise(M=>setTimeout(M,16));const u=this.model.lossEMA??4,d=Math.max(.78,Math.min(.95,.55+u*.1)),h=t.length>0?t:" ",m=this.model.sample(h,80,d,{minLength:14}),g=m.length>0?m:"...";return this.history.push({role:"ai",text:g}),this.emit({type:"generate-end",text:g}),this.emit({type:"state",stats:this.stats}),this.autoSaveOn&&this._trySave(),g}finally{this.busy=!1}}}reset(){this.model=new ps({maxVocab:220,contextLen:8,embedDim:16,h1:112,h2:96,h3:64,lr:.025,clipGrad:1}),this.history.length=0,this.userMessages.length=0;try{localStorage.removeItem(Nl)}catch{}this.emit({type:"state",stats:this.stats})}_trySave(){try{const t=JSON.stringify({model:this.model.serialize(),history:this.history.slice(-40),userMessages:this.userMessages});localStorage.setItem(Nl,t)}catch{}}_tryLoad(){try{const t=localStorage.getItem(Nl);if(!t)return;const n=JSON.parse(t);n.model&&this.model.loadFrom(n.model),n.history&&(this.history=n.history),n.userMessages&&(this.userMessages=n.userMessages)}catch{}}}const zp="https://api.anthropic.com/v1/messages",Vp="2023-06-01",Dy=200,Uy="You are the brain AI powering the handface neural mesh demo. Respond concisely in the user's language (usually Korean). Keep responses under 3 sentences. Be helpful and friendly.";class zc{constructor({apiKey:t,model:n="claude-haiku-4-5-20251001"}={}){this.apiKey=t,this.model=n,this.history=[],this.handlers=new Set,this.busy=!1,this.shadow=new ps({maxVocab:220,contextLen:8,embedDim:16,h1:112,h2:96,h3:64,lr:.035}),this.tokenCount=0,this._loadHistory()}onEvent(t){return this.handlers.add(t),()=>this.handlers.delete(t)}emit(t){for(const n of this.handlers)n(t)}get model(){return this.shadow}get stats(){return{vocabSize:this.shadow.vocab.size,maxVocab:this.shadow.MAX_VOCAB,totalSteps:this.shadow.totalSteps,lossEMA:this.shadow.lossEMA,messages:this.history.length,tokenCount:this.tokenCount,model:this.model}}get modelState(){return{h1:this.shadow.lastH1,h2:this.shadow.lastH2,h3:this.shadow.lastH3,probs:this.shadow.lastProbs,vocabSize:this.shadow.vocab.size,embed:this.shadow.lastX}}layerWeightAverages(){const t=n=>{let i=0,s=0;for(const r of n)for(let a=0;a<r.length;a++)i+=Math.abs(r[a]),s++;return s>0?i/s:0};return[t(this.shadow.W1),t(this.shadow.W2),t(this.shadow.W3),t(this.shadow.W4)]}async send(t){if(!this.busy){this.busy=!0;try{this.history.push({role:"user",text:t}),this.emit({type:"training-start",message:t});const n=this.shadow.totalSteps;this.shadow.trainOnText(t,8);const i=this.shadow.totalSteps-n;this.emit({type:"training-end",avgLoss:this.shadow.lossEMA??4,stepsRun:i,totalSteps:this.shadow.totalSteps});const s=this._buildMessages(),r=await this._callClaude(s);return this.shadow.trainOnText(r,4),this.history.push({role:"ai",text:r}),this.emit({type:"generate-end",text:r}),this.emit({type:"state",stats:this.stats}),this._saveHistory(),r}catch(n){const i=`API Error: ${n.message}`;return this.history.push({role:"ai",text:i}),this.emit({type:"generate-end",text:i}),i}finally{this.busy=!1}}}async _callClaude(t){var r,a;const n=await fetch(zp,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":Vp,"anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:this.model,max_tokens:Dy,system:Uy,messages:t})});if(!n.ok){const o=await n.text();throw new Error(`${n.status} — ${o.slice(0,200)}`)}const i=await n.json();return i.usage&&(this.tokenCount+=(i.usage.input_tokens||0)+(i.usage.output_tokens||0)),((a=(r=i.content)==null?void 0:r[0])==null?void 0:a.text)||"..."}_buildMessages(){return this.history.slice(-10).map(n=>({role:n.role==="user"?"user":"assistant",content:n.text}))}async testConnection(){try{const t=await fetch(zp,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":Vp,"anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:this.model,max_tokens:10,messages:[{role:"user",content:"hi"}]})});if(t.ok)return{ok:!0};const n=await t.text();return{ok:!1,error:`${t.status}: ${n.slice(0,150)}`}}catch(t){return{ok:!1,error:t.message}}}reset(){this.shadow=new ps({maxVocab:220,contextLen:8,embedDim:16,h1:112,h2:96,h3:64,lr:.035}),this.history.length=0,this.tokenCount=0;try{localStorage.removeItem("handface-claude-history")}catch{}this.emit({type:"state",stats:this.stats})}_saveHistory(){try{localStorage.setItem("handface-claude-history",JSON.stringify({history:this.history.slice(-40),tokenCount:this.tokenCount}))}catch{}}_loadHistory(){try{const t=localStorage.getItem("handface-claude-history");if(!t)return;const n=JSON.parse(t);n.history&&(this.history=n.history),n.tokenCount&&(this.tokenCount=n.tokenCount)}catch{}}}const Gp="gemini-2.0-flash-lite",Fy=200,Ny="You are the brain AI powering the handface neural mesh demo. Respond concisely in the user's language (usually Korean). Keep responses under 3 sentences. Be helpful and friendly.";class Vc{constructor({apiKey:t}={}){this.apiKey=t,this.history=[],this.handlers=new Set,this.busy=!1,this.shadow=new ps({maxVocab:220,contextLen:8,embedDim:16,h1:112,h2:96,h3:64,lr:.035}),this.tokenCount=0,this._loadHistory()}onEvent(t){return this.handlers.add(t),()=>this.handlers.delete(t)}emit(t){for(const n of this.handlers)n(t)}get model(){return this.shadow}get stats(){return{vocabSize:this.shadow.vocab.size,maxVocab:this.shadow.MAX_VOCAB,totalSteps:this.shadow.totalSteps,lossEMA:this.shadow.lossEMA,messages:this.history.length,tokenCount:this.tokenCount,model:"gemini-flash"}}get modelState(){return{h1:this.shadow.lastH1,h2:this.shadow.lastH2,h3:this.shadow.lastH3,probs:this.shadow.lastProbs,vocabSize:this.shadow.vocab.size,embed:this.shadow.lastX}}layerWeightAverages(){const t=n=>{let i=0,s=0;for(const r of n)for(let a=0;a<r.length;a++)i+=Math.abs(r[a]),s++;return s>0?i/s:0};return[t(this.shadow.W1),t(this.shadow.W2),t(this.shadow.W3),t(this.shadow.W4)]}async send(t){if(!this.busy){this.busy=!0;try{this.history.push({role:"user",text:t}),this.emit({type:"training-start",message:t});const n=this.shadow.totalSteps;this.shadow.trainOnText(t,8);const i=this.shadow.totalSteps-n;this.emit({type:"training-end",avgLoss:this.shadow.lossEMA??4,stepsRun:i,totalSteps:this.shadow.totalSteps});const s=await this._callGemini();return this.shadow.trainOnText(s,4),this.history.push({role:"ai",text:s}),this.emit({type:"generate-end",text:s}),this.emit({type:"state",stats:this.stats}),this._saveHistory(),s}catch(n){const i=`API Error: ${n.message}`;return this.history.push({role:"ai",text:i}),this.emit({type:"generate-end",text:i}),i}finally{this.busy=!1}}}async _callGemini(){var o,c,l,u,d;const t=`https://generativelanguage.googleapis.com/v1beta/models/${Gp}:generateContent?key=${this.apiKey}`,n=[];n.push({role:"user",parts:[{text:Ny}]}),n.push({role:"model",parts:[{text:"Understood."}]});const i=this.history.slice(-10);for(const h of i)n.push({role:h.role==="user"?"user":"model",parts:[{text:h.text}]});const s=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:n,generationConfig:{maxOutputTokens:Fy,temperature:.8}})});if(!s.ok){const h=await s.text();throw new Error(`${s.status} — ${h.slice(0,200)}`)}const r=await s.json();return r.usageMetadata&&(this.tokenCount+=(r.usageMetadata.promptTokenCount||0)+(r.usageMetadata.candidatesTokenCount||0)),((d=(u=(l=(c=(o=r.candidates)==null?void 0:o[0])==null?void 0:c.content)==null?void 0:l.parts)==null?void 0:u[0])==null?void 0:d.text)||"..."}async testConnection(){try{const t=`https://generativelanguage.googleapis.com/v1beta/models/${Gp}:generateContent?key=${this.apiKey}`,n=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:"hi"}]}],generationConfig:{maxOutputTokens:5}})});if(n.ok)return{ok:!0};const i=await n.text();return{ok:!1,error:`${n.status}: ${i.slice(0,150)}`}}catch(t){return{ok:!1,error:t.message}}}reset(){this.shadow=new ps({maxVocab:220,contextLen:8,embedDim:16,h1:112,h2:96,h3:64,lr:.035}),this.history.length=0,this.tokenCount=0;try{localStorage.removeItem("handface-gemini-history")}catch{}this.emit({type:"state",stats:this.stats})}_saveHistory(){try{localStorage.setItem("handface-gemini-history",JSON.stringify({history:this.history.slice(-40),tokenCount:this.tokenCount}))}catch{}}_loadHistory(){try{const t=localStorage.getItem("handface-gemini-history");if(!t)return;const n=JSON.parse(t);n.history&&(this.history=n.history),n.tokenCount&&(this.tokenCount=n.tokenCount)}catch{}}}const Oy="modulepreload",By=function(e){return"/handface/"+e},Hp={},ky=function(t,n,i){let s=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),o=(a==null?void 0:a.nonce)||(a==null?void 0:a.getAttribute("nonce"));s=Promise.allSettled(n.map(c=>{if(c=By(c),c in Hp)return;Hp[c]=!0;const l=c.endsWith(".css"),u=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${c}"]${u}`))return;const d=document.createElement("link");if(d.rel=l?"stylesheet":Oy,l||(d.as="script"),d.crossOrigin="",d.href=c,o&&d.setAttribute("nonce",o),document.head.appendChild(d),l)return new Promise((h,m)=>{d.addEventListener("load",h),d.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${c}`)))})}))}function r(a){const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a}return s.then(a=>{for(const o of a||[])o.status==="rejected"&&r(o.reason);return t().catch(r)})},zy=["Xenova/distilgpt2","onnx-community/SmolLM-135M-Instruct","onnx-community/SmolLM2-135M-Instruct"],Ol="handface-hf-v1";class Wp{constructor(){this.entries=[]}add(t){!t||t.length<2||(this.entries.push({text:t,ts:Date.now()}),this.entries.length>500&&this.entries.shift())}search(t,n=5){if(this.entries.length===0||!t)return[];const i=this._bigrams(t);if(i.size===0)return this.entries.slice(-n);const s=this.entries.map(r=>{const a=this._bigrams(r.text);let o=0;for(const l of i)a.has(l)&&o++;const c=o/Math.max(1,Math.sqrt(i.size*a.size));return{text:r.text,score:c}});return s.sort((r,a)=>a.score-r.score),s.slice(0,n).filter(r=>r.score>.05)}_bigrams(t){const n=new Set;for(let i=0;i<t.length-1;i++)n.add(t[i]+t[i+1]);return n}get size(){return this.entries.length}serialize(){return this.entries}loadFrom(t){Array.isArray(t)&&(this.entries=t)}}class ud{constructor(){this.generator=null,this.loaded=!1,this.memory=new Wp,this.shadow=new ps({maxVocab:220,contextLen:8,embedDim:16,h1:112,h2:96,h3:64,lr:.025,clipGrad:1}),this.history=[],this.handlers=new Set,this.busy=!1,this.loadedModel="",this._loadHistory()}onEvent(t){return this.handlers.add(t),()=>this.handlers.delete(t)}emit(t){for(const n of this.handlers)n(t)}get model(){return this.shadow}get stats(){return{vocabSize:this.shadow.vocab.size,maxVocab:this.shadow.MAX_VOCAB,totalSteps:this.shadow.totalSteps,lossEMA:this.shadow.lossEMA,messages:this.history.length,memories:this.memory.size,model:this.loadedModel||"loading..."}}get modelState(){return{h1:this.shadow.lastH1,h2:this.shadow.lastH2,h3:this.shadow.lastH3,probs:this.shadow.lastProbs,vocabSize:this.shadow.vocab.size,embed:this.shadow.lastX}}layerWeightAverages(){const t=n=>{let i=0,s=0;for(const r of n)for(let a=0;a<r.length;a++)i+=Math.abs(r[a]),s++;return s>0?i/s:0};return[t(this.shadow.W1),t(this.shadow.W2),t(this.shadow.W3),t(this.shadow.W4)]}async _ensureModel(){if(this.loaded)return;const{pipeline:t,env:n}=await ky(async()=>{const{pipeline:i,env:s}=await import("./transformers.web-DcelcPlM.js");return{pipeline:i,env:s}},[]);n.allowLocalModels=!1;for(const i of zy)try{this.emit({type:"loading",message:`Loading ${i}...`}),this.generator=await t("text-generation",i,{progress_callback:s=>{s.status==="progress"&&s.progress!=null&&this.emit({type:"loading-progress",progress:Math.round(s.progress),file:s.file})}}),this.loadedModel=i,this.loaded=!0,this.emit({type:"loading-done"});return}catch{this.emit({type:"loading",message:`${i} unavailable, trying next...`})}throw new Error("No model could be loaded. Check your network connection.")}async send(t){var n;if(!this.busy){this.busy=!0;try{await this._ensureModel(),this.history.push({role:"user",text:t}),this.memory.add(t),this.emit({type:"training-start",message:t});const i=this.shadow.totalSteps;this.shadow.trainOnText(t,8),this.emit({type:"training-end",avgLoss:this.shadow.lossEMA??4,stepsRun:this.shadow.totalSteps-i,totalSteps:this.shadow.totalSteps});const s=this.memory.search(t,5),r=this._buildPrompt(s),a=await this.generator(r,{max_new_tokens:120,temperature:.7,do_sample:!0,return_full_text:!1});let o="...";const c=(n=a==null?void 0:a[0])==null?void 0:n.generated_text;if(typeof c=="string")o=c.split(`
`)[0].replace(/^(AI|Assistant|assistant):?\s*/i,"").trim();else if(Array.isArray(c)){const l=c[c.length-1];o=((l==null?void 0:l.content)||(l==null?void 0:l.text)||"").trim()}return(!o||o.length<2)&&(o="(thinking...)"),this.memory.add(o),this.shadow.trainOnText(o,4),this.history.push({role:"ai",text:o}),this.emit({type:"generate-end",text:o}),this.emit({type:"state",stats:this.stats}),this._saveHistory(),o}catch(i){const s=`Error: ${i.message}`;return this.history.push({role:"ai",text:s}),this.emit({type:"generate-end",text:s}),s}finally{this.busy=!1}}}_buildPrompt(t){let n=`You are a helpful brain AI. Respond concisely in the user's language.
`;t.length>0&&(n+="You remember: "+t.map(s=>s.text).join("; ")+`
`),n+=`
`;const i=this.history.slice(-6);for(const s of i)n+=(s.role==="user"?"User":"AI")+": "+s.text+`
`;return n+="AI:",n}async testConnection(){try{return await this._ensureModel(),{ok:!0}}catch(t){return{ok:!1,error:t.message}}}reset(){this.shadow=new ps({maxVocab:220,contextLen:8,embedDim:16,h1:112,h2:96,h3:64,lr:.025,clipGrad:1}),this.memory=new Wp,this.history.length=0;try{localStorage.removeItem(Ol)}catch{}this.emit({type:"state",stats:this.stats})}_saveHistory(){try{localStorage.setItem(Ol,JSON.stringify({history:this.history.slice(-40),memory:this.memory.serialize()}))}catch{}}_loadHistory(){try{const t=localStorage.getItem(Ol);if(!t)return;const n=JSON.parse(t);n.history&&(this.history=n.history),n.memory&&this.memory.loadFrom(n.memory)}catch{}}}const Sr="handface-provider",yr="handface-apikey",Gc="handface-model";function Vy(){const e=localStorage.getItem(Sr)||"huggingface",t=localStorage.getItem(yr),n=localStorage.getItem(Gc)||"claude-haiku-4-5-20251001";return e==="huggingface"?new ud:e==="gemini"&&t?new Vc({apiKey:t}):e==="claude"&&t?new zc({apiKey:t,model:n}):new hd}let Vt=Vy();const Hr=document.getElementById("cursor");document.getElementById("flash");const Bl=document.getElementById("s-status"),Gy=document.getElementById("s-pos"),Hy=document.getElementById("s-clicks"),Wy=document.getElementById("s-zoom"),Po=document.getElementById("log"),_a=document.getElementById("start-btn"),Xp=document.getElementById("load-msg"),Yp=document.getElementById("overlay");function Xi(e,t){const n=document.createElement("div");n.className="log-item"+(e?` ${e}`:"");const i=new Date;for(n.textContent=`[${i.getHours()}:${String(i.getMinutes()).padStart(2,"0")}:${String(i.getSeconds()).padStart(2,"0")}] ${t}`,Po.appendChild(n);Po.children.length>9;)Po.removeChild(Po.children[1])}const oa=new AM({antialias:!0});oa.setSize(window.innerWidth,window.innerHeight);oa.setPixelRatio(Math.min(window.devicePixelRatio,2));oa.setClearColor(132104);document.getElementById("canvas-container").appendChild(oa.domElement);const dd=new l1,Wr=new Bn(50,window.innerWidth/window.innerHeight,.1,200);Wr.position.set(0,.2,7.5);Wr.lookAt(0,0,0);let Vo=7.5,kl=7.5;const Yi=new mr;dd.add(Yi);function Bg(e=.55){const n=document.createElement("canvas");n.width=n.height=64;const i=n.getContext("2d"),s=i.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(e,"rgba(255,255,255,0.55)"),s.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=s,i.fillRect(0,0,64,64);const r=new S1(n);return r.minFilter=je,r.magFilter=je,r.needsUpdate=!0,r}const Xy=Bg(.5),fd=Bg(.3),Vn=[12,42,80,56,22],Yy=[.35,.85,1.4,1.92,2.45],qy=5,$y=3,jy=4;function Ky(e,t){if(e===1)return[new O(0,0,0)];const n=[],i=Math.PI*(3-Math.sqrt(5)),s=1.32,r=.86,a=.96,o=.06*t;for(let c=0;c<e;c++){const l=1-c/(e-1)*2,u=Math.sqrt(Math.max(0,1-l*l)),d=i*c,h=Math.cos(d)*u,m=l,g=Math.sin(d)*u;let M=1;if(h>.35&&m>-.3){const R=Math.max(0,h-.35);M+=.14*R*(1.1-Math.abs(m+.05))}if(h<-.45&&m>-.25&&(M+=.08*(Math.abs(h)-.45)),Math.abs(g)>.45&&m<0&&(M+=.1*(Math.abs(g)-.45)),h<-.25&&m<-.3){const R=Math.max(0,Math.abs(h+.25)+Math.abs(m+.3)-.15);M+=.18*R}const p=.07*(Math.sin(m*6+d*3)*.55+Math.cos(d*5+m*4)*.45),f=M*(1+p);let y=h*t*s*f,A=m*t*r*f,E=g*t*a*f;E+=E>=0?o:-o;const T=t*.11;y+=(Math.random()-.5)*T,A+=(Math.random()-.5)*T,E+=(Math.random()-.5)*T,n.push(new O(y,A,E))}return n}const Zn=Vn.map((e,t)=>Ky(e,Yy[t]).map((n,i)=>({pos:n,activation:0,targetActivation:0,layerIdx:t,layerLocalIdx:i}))),hs=Zn.flat(),Oi=[],qp=new Set,Qh=new Map;hs.forEach((e,t)=>Qh.set(e,t));function pd(e,t,n){const i=Qh.get(e)*1e5+Qh.get(t);qp.has(i)||(qp.add(i),Oi.push({src:e,dst:t,intra:n,weight:.12+Math.random()*.88,targetWeight:.12+Math.random()*.88}))}for(let e=0;e<Vn.length-1;e++)for(const t of Zn[e])Zn[e+1].map(n=>({dst:n,d:t.pos.distanceTo(n.pos)})).sort((n,i)=>n.d-i.d).slice(0,qy).forEach(({dst:n})=>pd(t,n,!1));for(let e=1;e<Vn.length;e++)for(const t of Zn[e])Zn[e-1].map(n=>({src:n,d:t.pos.distanceTo(n.pos)})).sort((n,i)=>n.d-i.d).slice(0,$y).forEach(({src:n})=>pd(n,t,!1));for(let e=0;e<Vn.length;e++){const t=Zn[e];for(const n of t)t.filter(i=>i!==n).map(i=>({dst:i,d:n.pos.distanceTo(i.pos)})).sort((i,s)=>i.d-s.d).slice(0,jy).forEach(({dst:i})=>pd(n,i,!0))}const Go=new Map,Ho=new Map;for(const e of Oi)Go.has(e.dst)||Go.set(e.dst,[]),Go.get(e.dst).push(e),Ho.has(e.src)||Ho.set(e.src,[]),Ho.get(e.src).push(e);(function(){for(const a of[1,-1]){const o=new Oa(2.55,28,22),c=o.attributes.position;for(let l=0;l<c.count;l++){let u=c.getX(l)*1.32,d=c.getY(l)*.86,h=c.getZ(l)*.96;a>0&&h<0&&(h=0),a<0&&h>0&&(h=0);const m=Math.sqrt(u*u+d*d+h*h)||1,g=u/m,M=d/m,p=h/m;let f=1;g>.35&&M>-.3&&(f+=.12*(g-.35)),g<-.45&&M>-.25&&(f+=.06*(Math.abs(g)-.45)),g<-.25&&M<-.3&&(f+=.15*Math.max(0,Math.abs(g+.25)+Math.abs(M+.3)-.15));const y=Math.atan2(p,g),A=.04*(Math.sin(M*5+y*3)+Math.cos(y*4)*.5),E=f*(1+A);u*=E,d*=E,h*=E,h+=a*.153,c.setXYZ(l,u,d,h)}o.computeVertexNormals(),Yi.add(new Tn(o,new Pr({color:3381759,wireframe:!0,blending:mi,transparent:!0,opacity:.055,depthWrite:!1}))),Yi.add(new Tn(o.clone(),new Pr({color:2254540,blending:mi,transparent:!0,opacity:.018,depthWrite:!1})))}})();const kg=document.getElementById("input-grid");kg.style.gridTemplateColumns=`repeat(${Vn[0]}, 1fr)`;const zg=[],Vg=[];for(let e=0;e<Vn[0];e++){const t=document.createElement("div");t.className="input-cell";const n=document.createElement("div");n.className="input-cell-fill";const i=document.createElement("div");i.className="input-cell-val",i.textContent="00",t.appendChild(n),t.appendChild(i),kg.appendChild(t),zg.push(n),Vg.push(i)}const Zy=document.getElementById("weight-list"),Gg=[];for(let e=1;e<Vn.length;e++){const t=document.createElement("div");t.className="weight-row",t.innerHTML=`
    <span class="weight-label">L${e-1}→${e}</span>
    <div class="weight-bar"><div class="weight-fill"></div></div>
    <span class="weight-val">—</span>
  `,Zy.appendChild(t),Gg.push({fill:t.querySelector(".weight-fill"),val:t.querySelector(".weight-val"),layerIdx:e})}const Jy=document.getElementById("pred-list"),Hg=8,ws=[];for(let e=0;e<Hg;e++){const t=document.createElement("div");t.className="pred-row",t.innerHTML=`
    <span class="pred-char">·</span>
    <div class="pred-bar"><div class="pred-fill"></div></div>
    <span class="pred-pct">—</span>
  `,Jy.appendChild(t),ws.push({char:t.querySelector(".pred-char"),fill:t.querySelector(".pred-fill"),pct:t.querySelector(".pred-pct")})}function tu(){const e=Vt.history.length>0?Vt.history[Vt.history.length-1].text:" ",t=Vt.model.encode(e),n=new Array(Vt.model.CTX);for(let a=0;a<Vt.model.CTX;a++){const o=t.length-Vt.model.CTX+a;n[a]=o>=0?t[o]:0}Vt.model.forward(n);const i=Vt.model.lastProbs,s=Vt.model.vocab.size,r=[];for(let a=1;a<s;a++){const o=Vt.model.invVocab[a];!o||o===`
`||r.push({ch:o,p:i[a]})}r.sort((a,o)=>o.p-a.p);for(let a=0;a<Hg;a++){const o=r[a];if(o){const c=o.ch===" "?"␣":o.ch;ws[a].char.textContent=c,ws[a].fill.style.width=`${Math.round(o.p*100)}%`,ws[a].pct.textContent=(o.p*100).toFixed(1)+"%"}else ws[a].char.textContent="·",ws[a].fill.style.width="0%",ws[a].pct.textContent="—"}}const eu=document.getElementById("loss-spark"),As=eu.getContext("2d"),os=[];function Qy(e){Number.isFinite(e)&&(os.push(e),os.length>100&&os.shift(),tE())}function tE(){const e=eu.width,t=eu.height;if(As.clearRect(0,0,e,t),os.length<2)return;let n=-1/0,i=1/0;for(const r of os)r>n&&(n=r),r<i&&(i=r);const s=Math.max(.15,n-i);As.strokeStyle="rgba(255, 200, 80, 0.85)",As.lineWidth=1.2,As.beginPath();for(let r=0;r<os.length;r++){const a=r/Math.max(1,os.length-1)*(e-1)+.5,o=1+(n-os[r])/s*(t-2);r===0?As.moveTo(a,o):As.lineTo(a,o)}As.stroke()}const Er=document.getElementById("chat-msgs"),nu=document.getElementById("chat-input"),eE=document.getElementById("chat-send"),nE=document.getElementById("chat-reset"),iE=document.getElementById("chat-stats"),sE=document.getElementById("chat-loss-fill");function br(e,t){const n=document.createElement("div");n.className=`chat-msg ${e}`;const i=document.createElement("span");i.className="chat-msg-role",i.textContent=e;const s=document.createElement("span");s.className="chat-msg-text",s.textContent=" "+t,n.appendChild(i),n.appendChild(s),Er.appendChild(n),Er.scrollTop=Er.scrollHeight}function lc(){const e=Vt.stats,t=e.lossEMA!=null?e.lossEMA.toFixed(2):"—",n=e.tokenCount?` · tokens ${e.tokenCount}`:"",i=e.memories!=null?` · mem ${e.memories}`:"";if(iE.textContent=`steps ${e.totalSteps} · loss ${t}${i}${n}`,e.lossEMA!=null){const s=Math.max(0,Math.min(1,1-e.lossEMA/5));sE.style.width=`${Math.round(s*100)}%`}}function md(){if(Vt.history.length===0)br("sys","메시지를 입력하면 모델이 학습합니다. 처음엔 헛소리지만 점점 비슷해집니다.");else for(const e of Vt.history)br(e.role,e.text);lc()}md();async function Wg(){const e=nu.value.trim();!e||Vt.busy||(nu.value="",br("user",e),e_(e),Xi("",`💬 training (${e.length} chars)`),await Vt.send(e))}eE.addEventListener("click",Wg);nu.addEventListener("keydown",e=>{e.key==="Enter"&&(e.preventDefault(),Wg())});nE.addEventListener("click",()=>{confirm("모델 가중치와 어휘를 모두 초기화합니다. 진행할까요?")&&(Vt.reset(),Er.innerHTML="",md(),Ya(),Xi("","🔄 model reset"))});function Xg(e){if(e.type==="training-end")Ya(),lc(),Qy(e.avgLoss),tu(),Xi("",`🧠 ${e.stepsRun} steps (loss ${e.avgLoss.toFixed(2)})`);else if(e.type==="generate-end")br("ai",e.text),e_(e.text),tu();else if(e.type==="state")lc();else if(e.type==="loading")br("sys",e.message);else if(e.type==="loading-progress"){const t=Er.lastElementChild;t!=null&&t.classList.contains("sys")&&(t.querySelector(".chat-msg-text").textContent=` Loading model... ${e.progress}%`)}else e.type==="loading-done"&&br("sys","Model loaded. Ready to chat!")}Vt.onEvent(Xg);Ya();tu();const rE=document.getElementById("settings-btn"),Ar=document.getElementById("settings-modal"),Hc=document.getElementById("s-apikey"),Ui=document.getElementById("settings-status"),aE=document.getElementById("s-save"),oE=document.getElementById("s-test"),cE=document.getElementById("s-delete"),lE=document.getElementById("s-close");function Yg(){const e=document.querySelector('input[name="s-provider"]:checked');return e?e.value:"local"}function qg(){const e=document.querySelector('input[name="s-model"]:checked');return e?e.value:"claude-haiku-4-5-20251001"}function $g(){const e=document.getElementById("mode-badge");e&&e.remove();const t=document.createElement("span");t.id="mode-badge";const n=Vt instanceof ud,i=Vt instanceof Vc,s=Vt instanceof zc,r=i||s;t.className=`mode-badge ${n||r?"cloud":"local"}`,t.textContent=n?"SmolLM2":i?"GEMINI":s?"CLAUDE":"LOCAL",document.getElementById("chat-title").appendChild(t)}$g();const $p=localStorage.getItem(yr),jp=localStorage.getItem(Sr),Kp=localStorage.getItem(Gc);$p&&(Hc.value=$p);if(jp){const e=document.querySelector(`input[name="s-provider"][value="${jp}"]`);e&&(e.checked=!0)}if(Kp){const e=document.querySelector(`input[name="s-model"][value="${Kp}"]`);e&&(e.checked=!0)}rE.addEventListener("click",()=>Ar.classList.add("open"));lE.addEventListener("click",()=>Ar.classList.remove("open"));Ar.addEventListener("click",e=>{e.target===Ar&&Ar.classList.remove("open")});oE.addEventListener("click",async()=>{const e=Hc.value.trim(),t=Yg();if(t==="local"){Ui.textContent="Local mode — no API key needed.";return}if(!e){Ui.textContent="Please enter an API key.";return}Ui.textContent="Testing...";const i=await(t==="gemini"?new Vc({apiKey:e}):new zc({apiKey:e,model:qg()})).testConnection();Ui.textContent=i.ok?"✓ Connection successful!":`✗ ${i.error||"Failed — check your key."}`});function Wo(e,t){Vt=e,Vt.onEvent(Xg),Er.innerHTML="",md(),Ya(),$g(),lc(),Ar.classList.remove("open"),Xi("",t)}aE.addEventListener("click",()=>{const e=Yg(),t=Hc.value.trim(),n=qg();if(e==="huggingface"){localStorage.setItem(Sr,"huggingface"),localStorage.removeItem(yr),Wo(new ud,"🧠 SmolLM2 mode"),Ui.textContent="✓ SmolLM2 — model loads on first chat (~80MB).";return}if(e==="local"){localStorage.setItem(Sr,"local"),localStorage.removeItem(yr),Wo(new hd,"🔧 local mode"),Ui.textContent="✓ Local NLM mode.";return}if(!t){Ui.textContent="Please enter an API key.";return}localStorage.setItem(Sr,e),localStorage.setItem(yr,t),e==="claude"&&localStorage.setItem(Gc,n);const i=e==="gemini"?new Vc({apiKey:t}):new zc({apiKey:t,model:n});Wo(i,e==="gemini"?"☁ Gemini mode":"☁ Claude mode"),Ui.textContent=`✓ Now using ${e==="gemini"?"Gemini Flash":"Claude"}.`});cE.addEventListener("click",()=>{localStorage.removeItem(yr),localStorage.removeItem(Sr),localStorage.removeItem(Gc),Hc.value="",Wo(new hd,"🔧 local mode"),Ui.textContent="Key deleted — local mode."});function hE(){for(let e=0;e<Vn[0];e++){const t=Zn[0][e].activation;zg[e].style.height=`${Math.round(t*100)}%`,Vg[e].textContent=String(Math.round(t*100)).padStart(2,"0")}for(const e of Gg){let t=0,n=0;for(const s of Zn[e.layerIdx]){const r=Go.get(s);if(r)for(const a of r)a.intra||(t+=a.weight,n++)}const i=n>0?t/n:0;e.fill.style.width=`${Math.round(i*100)}%`,e.val.textContent=i.toFixed(2)}}const Rs=new Float32Array(Oi.length*6),Cs=new Float32Array(Oi.length*6);Oi.forEach((e,t)=>{Rs[t*6+0]=e.src.pos.x,Rs[t*6+1]=e.src.pos.y,Rs[t*6+2]=e.src.pos.z,Rs[t*6+3]=e.dst.pos.x,Rs[t*6+4]=e.dst.pos.y,Rs[t*6+5]=e.dst.pos.z});const Wc=new on;Wc.setAttribute("position",new an(Rs,3));Wc.setAttribute("color",new an(Cs,3));Yi.add(new M1(Wc,new bm({vertexColors:!0,blending:mi,transparent:!0,depthWrite:!1})));const Aa=new Float32Array(hs.length*3),Xo=new Float32Array(hs.length*3),Yo=new Float32Array(hs.length*3);hs.forEach((e,t)=>{Aa[t*3]=e.pos.x,Aa[t*3+1]=e.pos.y,Aa[t*3+2]=e.pos.z});function jg(e,t,n,i){const s=new on;return s.setAttribute("position",new an(n,3)),s.setAttribute("color",new an(e,3)),Yi.add(new pu(s,new fc({vertexColors:!0,size:t,map:i,alphaTest:.01,blending:mi,transparent:!0,depthWrite:!1}))),s}const uE=jg(Xo,.18,Aa,Xy),dE=jg(Yo,.065,Aa,fd),gd=1200,oi=[],qo=new Float32Array(gd*3),$o=new Float32Array(gd*3),Gs=new on;Gs.setAttribute("position",new an(qo,3));Gs.setAttribute("color",new an($o,3));Gs.setDrawRange(0,0);Yi.add(new pu(Gs,new fc({vertexColors:!0,size:.05,map:fd,alphaTest:.01,blending:mi,transparent:!0,depthWrite:!1})));function zl(e,t=0){oi.length>=gd||oi.push({edge:e,t,speed:.008+e.weight*.018+Math.random()*.007})}const _d=new mr;Yi.add(_d);const Kg=new Tn(new Oa(.08,20,20),new Pr({color:16772812,blending:mi,transparent:!0,opacity:.7,depthWrite:!1}));_d.add(Kg);const Zg=new Tn(new Oa(.28,20,20),new Pr({color:16746547,blending:mi,transparent:!0,opacity:.1,depthWrite:!1}));_d.add(Zg);const Jg=2200,jo=new Float32Array(Jg*3);for(let e=0;e<Jg;e++){const t=8+Math.random()*22,n=2*Math.PI*Math.random(),i=Math.acos(2*Math.random()-1);jo[e*3]=t*Math.sin(i)*Math.cos(n),jo[e*3+1]=t*Math.sin(i)*Math.sin(n),jo[e*3+2]=t*Math.cos(i)}const Qg=new on;Qg.setAttribute("position",new dn(jo,3));const t_=new pu(Qg,new fc({color:16764057,size:.022,map:fd,alphaTest:.01,blending:mi,transparent:!0,opacity:.32,depthWrite:!1}));dd.add(t_);let Zp=0;const fE=280,pE=600;function e_(e=null){const t=e||(Vt.history.length>0?Vt.history[Vt.history.length-1].text:"hi"),n=Vt.model.encode(t),i=new Array(Vt.model.CTX);for(let h=0;h<Vt.model.CTX;h++){const m=n.length-Vt.model.CTX+h;i[h]=m>=0?n[m]:0}Vt.model.forward(i);const s=Vt.model.vocab.size,r=new Float32Array(Vt.model.lastX),a=new Float32Array(Vt.model.lastH1),o=new Float32Array(Vt.model.lastH2),c=new Float32Array(Vt.model.lastH3),l=new Float32Array(Vt.model.lastProbs.subarray(0,s)),u=[r,a,o,c,l],d=[r.length,a.length,o.length,c.length,l.length];for(let h=0;h<Vn.length;h++)setTimeout(()=>{const m=u[h],g=d[h],M=Zn[h];let p=1e-6;for(let y=0;y<g;y++){const A=Math.abs(m[y]);A>p&&(p=A)}const f=1/p;for(let y=0;y<M.length;y++){const A=Math.min(g-1,Math.floor(y/M.length*g)),E=Math.abs(m[A])*f;M[y].targetActivation=.08+.92*E}if(h<Vn.length-1)for(const y of M){if(y.targetActivation<.2)continue;const A=Ho.get(y);if(A)for(const E of A){if(E.intra)continue;const T=E.weight*y.targetActivation;zl(E,0),T>.5&&zl(E,.04+Math.random()*.06),T>.8&&zl(E,.09+Math.random()*.06)}}},h*fE)}function Ya(){const e=[Vt.model.W1,Vt.model.W2,Vt.model.W3,Vt.model.W4];for(const t of Oi){const n=Math.min(e.length-1,t.src.layerIdx),i=e[n],s=i.length,r=i[0].length,a=t.src.layerIdx,o=t.intra?a:t.dst.layerIdx,c=Vn[a],l=Vn[o],u=Math.min(s-1,Math.floor(t.src.layerLocalIdx/c*s)),d=Math.min(r-1,Math.floor(t.dst.layerLocalIdx/l*r)),h=Math.abs(i[u][d]||0);t.targetWeight=Math.max(.05,Math.min(1,h*5))}}const Hs=new Cy({handedness:"right",cursorSource:"gaze"});let hc=0,uc=0,Lo=0,Jp=0,Qp=0,tm=0;Hs.on("move",e=>{Hr.style.left=`${e.screenX}px`,Hr.style.top=`${e.screenY}px`,Gy.textContent=`${e.screenX} · ${e.screenY}`,hc=e.x-.5,uc=e.y-.5});window.addEventListener("mousemove",e=>{hc=e.clientX/window.innerWidth-.5,uc=e.clientY/window.innerHeight-.5,Hr.style.left=`${e.clientX}px`,Hr.style.top=`${e.clientY}px`});Hs.on("click",()=>{tm++,Hy.textContent=String(tm),Hr.classList.add("clicking"),setTimeout(()=>Hr.classList.remove("clicking"),80),Xi("ev-click","🤌 pinch")});Hs.on("scroll",e=>{Vo=Math.max(4,Math.min(15,Vo+e.deltaY*.055));const t=Math.round((1-(Vo-4)/11)*100);Wy.textContent=`${t}%`,Xi("ev-scroll",e.deltaY>0?"✊ zoom out":"🖐️ zoom in")});const mE={thumbsup:{label:"👍 thumbs up"},thumbsdown:{label:"👎 thumbs down"},victory:{label:"✌️ victory"},iloveyou:{label:"🤟 iloveyou"}};for(const[e,t]of Object.entries(mE))Hs.on(e,()=>Xi("",t.label));const Io=new O;let Vl=0;function n_(){requestAnimationFrame(n_),Vl+=.011;const e=performance.now();e-Zp>pE&&(Zp=e,Ya());for(const r of Oi)r.weight+=(r.targetWeight-r.weight)*.012;for(const r of hs)r.targetActivation*=.993,r.activation+=(r.targetActivation-r.activation)*.07,r.activation<4e-4&&(r.activation=0);let t=0;for(const r of Zn[0])t+=r.activation;t/=Zn[0].length,Kg.material.opacity=.55+.3*t+.06*Math.sin(Vl*2.5),Zg.material.opacity=.08+.18*t+.03*Math.sin(Vl*1.5);for(let r=0;r<Oi.length;r++){const a=Oi[r],o=Math.max(a.src.activation*.8,a.dst.activation*.65),c=a.weight*(.035+.965*o),l=c*1,u=c*.4,d=c*.05;Cs[r*6+0]=l,Cs[r*6+1]=u,Cs[r*6+2]=d,Cs[r*6+3]=l,Cs[r*6+4]=u,Cs[r*6+5]=d}Wc.attributes.color.needsUpdate=!0;for(let r=0;r<hs.length;r++){const a=hs[r].activation;Xo[r*3+0]=.025+a*.55,Xo[r*3+1]=.01+a*.22,Xo[r*3+2]=.003+a*.03,Yo[r*3+0]=.1+a*.9,Yo[r*3+1]=.04+a*.72,Yo[r*3+2]=.01+a*.2}uE.attributes.color.needsUpdate=!0,dE.attributes.color.needsUpdate=!0;for(let r=oi.length-1;r>=0;r--)oi[r].t+=oi[r].speed,oi[r].t>=1&&oi.splice(r,1);for(let r=0;r<oi.length;r++){const a=oi[r];Io.lerpVectors(a.edge.src.pos,a.edge.dst.pos,a.t),qo[r*3]=Io.x,qo[r*3+1]=Io.y,qo[r*3+2]=Io.z;const o=a.t<.12?a.t/.12:a.t>.8?(1-a.t)/.2:1,c=(.55+a.edge.weight*.45)*o;$o[r*3]=c,$o[r*3+1]=c*.88,$o[r*3+2]=c*.42}Gs.setDrawRange(0,oi.length),Gs.attributes.position.needsUpdate=!0,Gs.attributes.color.needsUpdate=!0,Qp+=.0015;const n=.06,i=Math.sign(hc)*Math.max(0,Math.abs(hc)-n),s=Math.sign(uc)*Math.max(0,Math.abs(uc)-n);Jp+=i*.016,Lo+=s*.011,Lo=Math.max(-1,Math.min(1,Lo)),Yi.rotation.x=Lo,Yi.rotation.y=Qp+Jp,kl+=(Vo-kl)*.055,Wr.position.z=kl,t_.rotation.y+=35e-6,hE(),oa.render(dd,Wr)}n_();_a.addEventListener("click",async()=>{_a.disabled=!0,_a.textContent="LOADING...",Xp.textContent="Loading MediaPipe (5-10s)",Bl.textContent="INIT";try{await Hs.start(),Hs.createPanel(),Bl.textContent="ACTIVE",Yp.classList.add("fade-out"),setTimeout(()=>{Yp.style.display="none"},650),Xi("","start"),document.addEventListener("keydown",e=>{(e.key==="r"||e.key==="R")&&(Hs.recalibrate(),Xi("","recalibrated"))})}catch(e){Bl.textContent="ERROR",Xp.textContent=`Error: ${e.message}`,_a.disabled=!1,_a.textContent="RETRY",console.error(e)}});window.addEventListener("resize",()=>{Wr.aspect=window.innerWidth/window.innerHeight,Wr.updateProjectionMatrix(),oa.setSize(window.innerWidth,window.innerHeight)});
