var e_=Object.defineProperty;var n_=(e,t,n)=>t in e?e_(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var kt=(e,t,n)=>n_(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Zh="183",i_=0,Ef=1,r_=2,wo=1,s_=2,ua=3,lr=0,gn=1,Li=2,Ui=0,gs=1,Gn=2,bf=3,Af=4,a_=5,Rr=100,o_=101,c_=102,l_=103,h_=104,u_=200,f_=201,d_=202,p_=203,Fl=204,Nl=205,m_=206,g_=207,__=208,v_=209,x_=210,M_=211,S_=212,y_=213,E_=214,Ol=0,Bl=1,kl=2,Ms=3,zl=4,Vl=5,Gl=6,Hl=7,Wp=0,b_=1,A_=2,di=0,Xp=1,Yp=2,qp=3,$p=4,jp=5,Kp=6,Zp=7,Jp=300,Hr=301,Ss=302,Gc=303,Hc=304,cc=306,Wl=1e3,Di=1001,Xl=1002,Qe=1003,T_=1004,za=1005,Ze=1006,Wc=1007,Lr=1008,kn=1009,Qp=1010,tm=1011,xa=1012,Jh=1013,gi=1014,hi=1015,Oi=1016,Qh=1017,tu=1018,Ma=1020,em=35902,nm=35899,im=1021,rm=1022,Kn=1023,Bi=1026,Ir=1027,sm=1028,eu=1029,ys=1030,nu=1031,iu=1033,Ro=33776,Co=33777,Po=33778,Lo=33779,Yl=35840,ql=35841,$l=35842,jl=35843,Kl=36196,Zl=37492,Jl=37496,Ql=37488,th=37489,eh=37490,nh=37491,ih=37808,rh=37809,sh=37810,ah=37811,oh=37812,ch=37813,lh=37814,hh=37815,uh=37816,fh=37817,dh=37818,ph=37819,mh=37820,gh=37821,_h=36492,vh=36494,xh=36495,Mh=36283,Sh=36284,yh=36285,Eh=36286,w_=3200,R_=0,C_=1,nr="",On="srgb",Es="srgb-linear",Xo="linear",oe="srgb",Qr=7680,Tf=519,P_=512,L_=513,I_=514,ru=515,D_=516,U_=517,su=518,F_=519,wf=35044,Rf="300 es",ui=2e3,Yo=2001;function N_(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function qo(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function O_(){const e=qo("canvas");return e.style.display="block",e}const Cf={};function Pf(...e){const t="THREE."+e.shift();console.log(t,...e)}function am(e){const t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){const n=e[1];n&&n.isStackTrace?e[0]+=" "+n.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function Ut(...e){e=am(e);const t="THREE."+e.shift();{const n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function Qt(...e){e=am(e);const t="THREE."+e.shift();{const n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function $o(...e){const t=e.join(" ");t in Cf||(Cf[t]=!0,Ut(...e))}function B_(e,t,n){return new Promise(function(i,r){function s(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:r();break;case e.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const k_={[Ol]:Bl,[kl]:Gl,[zl]:Hl,[Ms]:Vl,[Bl]:Ol,[Gl]:kl,[Hl]:zl,[Vl]:Ms};class Bs{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){const i=this._listeners;if(i===void 0)return;const r=i[t];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(t){const n=this._listeners;if(n===void 0)return;const i=n[t.type];if(i!==void 0){t.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,t);t.target=null}}}const nn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Io=Math.PI/180,bh=180/Math.PI;function Ta(){const e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(nn[e&255]+nn[e>>8&255]+nn[e>>16&255]+nn[e>>24&255]+"-"+nn[t&255]+nn[t>>8&255]+"-"+nn[t>>16&15|64]+nn[t>>24&255]+"-"+nn[n&63|128]+nn[n>>8&255]+"-"+nn[n>>16&255]+nn[n>>24&255]+nn[i&255]+nn[i>>8&255]+nn[i>>16&255]+nn[i>>24&255]).toLowerCase()}function qt(e,t,n){return Math.max(t,Math.min(n,e))}function z_(e,t){return(e%t+t)%t}function Xc(e,t,n){return(1-n)*e+n*t}function ea(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function dn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}class ne{constructor(t=0,n=0){ne.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,i=this.y,r=t.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=qt(this.x,t.x,n.x),this.y=qt(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=qt(this.x,t,n),this.y=qt(this.y,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-t.x,a=this.y-t.y;return this.x=s*i-a*r+t.x,this.y=s*r+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class ks{constructor(t=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=r}static slerpFlat(t,n,i,r,s,a,o){let c=i[r+0],l=i[r+1],u=i[r+2],f=i[r+3],h=s[a+0],m=s[a+1],g=s[a+2],M=s[a+3];if(f!==M||c!==h||l!==m||u!==g){let p=c*h+l*m+u*g+f*M;p<0&&(h=-h,m=-m,g=-g,M=-M,p=-p);let d=1-o;if(p<.9995){const x=Math.acos(p),E=Math.sin(x);d=Math.sin(d*x)/E,o=Math.sin(o*x)/E,c=c*d+h*o,l=l*d+m*o,u=u*d+g*o,f=f*d+M*o}else{c=c*d+h*o,l=l*d+m*o,u=u*d+g*o,f=f*d+M*o;const x=1/Math.sqrt(c*c+l*l+u*u+f*f);c*=x,l*=x,u*=x,f*=x}}t[n]=c,t[n+1]=l,t[n+2]=u,t[n+3]=f}static multiplyQuaternionsFlat(t,n,i,r,s,a){const o=i[r],c=i[r+1],l=i[r+2],u=i[r+3],f=s[a],h=s[a+1],m=s[a+2],g=s[a+3];return t[n]=o*g+u*f+c*m-l*h,t[n+1]=c*g+u*h+l*f-o*m,t[n+2]=l*g+u*m+o*h-c*f,t[n+3]=u*g-o*f-c*h-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,r){return this._x=t,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const i=t._x,r=t._y,s=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(r/2),f=o(s/2),h=c(i/2),m=c(r/2),g=c(s/2);switch(a){case"XYZ":this._x=h*u*f+l*m*g,this._y=l*m*f-h*u*g,this._z=l*u*g+h*m*f,this._w=l*u*f-h*m*g;break;case"YXZ":this._x=h*u*f+l*m*g,this._y=l*m*f-h*u*g,this._z=l*u*g-h*m*f,this._w=l*u*f+h*m*g;break;case"ZXY":this._x=h*u*f-l*m*g,this._y=l*m*f+h*u*g,this._z=l*u*g+h*m*f,this._w=l*u*f-h*m*g;break;case"ZYX":this._x=h*u*f-l*m*g,this._y=l*m*f+h*u*g,this._z=l*u*g-h*m*f,this._w=l*u*f+h*m*g;break;case"YZX":this._x=h*u*f+l*m*g,this._y=l*m*f+h*u*g,this._z=l*u*g-h*m*f,this._w=l*u*f-h*m*g;break;case"XZY":this._x=h*u*f-l*m*g,this._y=l*m*f-h*u*g,this._z=l*u*g+h*m*f,this._w=l*u*f+h*m*g;break;default:Ut("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const i=n/2,r=Math.sin(i);return this._x=t.x*r,this._y=t.y*r,this._z=t.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],c=n[9],l=n[2],u=n[6],f=n[10],h=i+o+f;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(u-c)*m,this._y=(s-l)*m,this._z=(a-r)*m}else if(i>o&&i>f){const m=2*Math.sqrt(1+i-o-f);this._w=(u-c)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+l)/m}else if(o>f){const m=2*Math.sqrt(1+o-i-f);this._w=(s-l)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(c+u)/m}else{const m=2*Math.sqrt(1+f-i-o);this._w=(a-r)/m,this._x=(s+l)/m,this._y=(c+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(qt(this.dot(t),-1,1)))}rotateTowards(t,n){const i=this.angleTo(t);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(t,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const i=t._x,r=t._y,s=t._z,a=t._w,o=n._x,c=n._y,l=n._z,u=n._w;return this._x=i*u+a*o+r*l-s*c,this._y=r*u+a*c+s*o-i*l,this._z=s*u+a*l+i*c-r*o,this._w=a*u-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(t,n){let i=t._x,r=t._y,s=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let c=1-n;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,n=Math.sin(n*l)/u,this._x=this._x*c+i*n,this._y=this._y*c+r*n,this._z=this._z*c+s*n,this._w=this._w*c+a*n,this._onChangeCallback()}else this._x=this._x*c+i*n,this._y=this._y*c+r*n,this._z=this._z*c+s*n,this._w=this._w*c+a*n,this.normalize();return this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(t),r*Math.cos(t),s*Math.sin(n),s*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(t=0,n=0,i=0){U.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Lf.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Lf.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,i=this.y,r=this.z,s=t.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(t){const n=this.x,i=this.y,r=this.z,s=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*r-o*i),u=2*(o*n-s*r),f=2*(s*i-a*n);return this.x=n+c*l+a*f-o*u,this.y=i+c*u+o*l-s*f,this.z=r+c*f+s*u-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,i=this.y,r=this.z,s=t.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=qt(this.x,t.x,n.x),this.y=qt(this.y,t.y,n.y),this.z=qt(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=qt(this.x,t,n),this.y=qt(this.y,t,n),this.z=qt(this.z,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const i=t.x,r=t.y,s=t.z,a=n.x,o=n.y,c=n.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Yc.copy(this).projectOnVector(t),this.sub(Yc)}reflect(t){return this.sub(Yc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y,r=this.z-t.z;return n*n+i*i+r*r}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){const r=Math.sin(n)*t;return this.x=r*Math.sin(i),this.y=Math.cos(n)*t,this.z=r*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),r=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Yc=new U,Lf=new ks;class zt{constructor(t,n,i,r,s,a,o,c,l){zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,r,s,a,o,c,l)}set(t,n,i,r,s,a,o,c,l){const u=this.elements;return u[0]=t,u[1]=r,u[2]=o,u[3]=n,u[4]=s,u[5]=c,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],u=i[4],f=i[7],h=i[2],m=i[5],g=i[8],M=r[0],p=r[3],d=r[6],x=r[1],E=r[4],y=r[7],w=r[2],C=r[5],A=r[8];return s[0]=a*M+o*x+c*w,s[3]=a*p+o*E+c*C,s[6]=a*d+o*y+c*A,s[1]=l*M+u*x+f*w,s[4]=l*p+u*E+f*C,s[7]=l*d+u*y+f*A,s[2]=h*M+m*x+g*w,s[5]=h*p+m*E+g*C,s[8]=h*d+m*y+g*A,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8];return n*a*u-n*o*l-i*s*u+i*o*c+r*s*l-r*a*c}invert(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],f=u*a-o*l,h=o*c-u*s,m=l*s-a*c,g=n*f+i*h+r*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const M=1/g;return t[0]=f*M,t[1]=(r*l-u*i)*M,t[2]=(o*i-r*a)*M,t[3]=h*M,t[4]=(u*n-r*c)*M,t[5]=(r*s-o*n)*M,t[6]=m*M,t[7]=(i*c-l*n)*M,t[8]=(a*n-i*s)*M,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+t,-r*l,r*c,-r*(-l*a+c*o)+o+n,0,0,1),this}scale(t,n){return this.premultiply(qc.makeScale(t,n)),this}rotate(t){return this.premultiply(qc.makeRotation(-t)),this}translate(t,n){return this.premultiply(qc.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,i=t.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const qc=new zt,If=new zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Df=new zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function V_(){const e={enabled:!0,workingColorSpace:Es,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===oe&&(r.r=Fi(r.r),r.g=Fi(r.g),r.b=Fi(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===oe&&(r.r=_s(r.r),r.g=_s(r.g),r.b=_s(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===nr?Xo:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return $o("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return $o("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(r,s)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[Es]:{primaries:t,whitePoint:i,transfer:Xo,toXYZ:If,fromXYZ:Df,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:On},outputColorSpaceConfig:{drawingBufferColorSpace:On}},[On]:{primaries:t,whitePoint:i,transfer:oe,toXYZ:If,fromXYZ:Df,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:On}}}),e}const Kt=V_();function Fi(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function _s(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}let ts;class G_{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{ts===void 0&&(ts=qo("canvas")),ts.width=t.width,ts.height=t.height;const r=ts.getContext("2d");t instanceof ImageData?r.putImageData(t,0,0):r.drawImage(t,0,0,t.width,t.height),i=ts}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=qo("canvas");n.width=t.width,n.height=t.height;const i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const r=i.getImageData(0,0,t.width,t.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Fi(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(t.data){const n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Fi(n[i]/255)*255):n[i]=Fi(n[i]);return{data:n,width:t.width,height:t.height}}else return Ut("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let H_=0;class au{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:H_++}),this.uuid=Ta(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayHeight,n.displayWidth,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push($c(r[a].image)):s.push($c(r[a]))}else s=$c(r);i.url=s}return n||(t.images[this.uuid]=i),i}}function $c(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?G_.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(Ut("Texture: Unable to serialize Texture."),{})}let W_=0;const jc=new U;class on extends Bs{constructor(t=on.DEFAULT_IMAGE,n=on.DEFAULT_MAPPING,i=Di,r=Di,s=Ze,a=Lr,o=Kn,c=kn,l=on.DEFAULT_ANISOTROPY,u=nr){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:W_++}),this.uuid=Ta(),this.name="",this.source=new au(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ne(0,0),this.repeat=new ne(1,1),this.center=new ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(jc).x}get height(){return this.source.getSize(jc).y}get depth(){return this.source.getSize(jc).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const n in t){const i=t[n];if(i===void 0){Ut(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Ut(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Jp)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Wl:t.x=t.x-Math.floor(t.x);break;case Di:t.x=t.x<0?0:1;break;case Xl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Wl:t.y=t.y-Math.floor(t.y);break;case Di:t.y=t.y<0?0:1;break;case Xl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}on.DEFAULT_IMAGE=null;on.DEFAULT_MAPPING=Jp;on.DEFAULT_ANISOTROPY=1;class De{constructor(t=0,n=0,i=0,r=1){De.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,r){return this.x=t,this.y=n,this.z=i,this.w=r,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,i=this.y,r=this.z,s=this.w,a=t.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,r,s;const c=t.elements,l=c[0],u=c[4],f=c[8],h=c[1],m=c[5],g=c[9],M=c[2],p=c[6],d=c[10];if(Math.abs(u-h)<.01&&Math.abs(f-M)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(f+M)<.1&&Math.abs(g+p)<.1&&Math.abs(l+m+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const E=(l+1)/2,y=(m+1)/2,w=(d+1)/2,C=(u+h)/4,A=(f+M)/4,v=(g+p)/4;return E>y&&E>w?E<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(E),r=C/i,s=A/i):y>w?y<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(y),i=C/r,s=v/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=A/s,r=v/s),this.set(i,r,s,n),this}let x=Math.sqrt((p-g)*(p-g)+(f-M)*(f-M)+(h-u)*(h-u));return Math.abs(x)<.001&&(x=1),this.x=(p-g)/x,this.y=(f-M)/x,this.z=(h-u)/x,this.w=Math.acos((l+m+d-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=qt(this.x,t.x,n.x),this.y=qt(this.y,t.y,n.y),this.z=qt(this.z,t.z,n.z),this.w=qt(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=qt(this.x,t,n),this.y=qt(this.y,t,n),this.z=qt(this.z,t,n),this.w=qt(this.w,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class X_ extends Bs{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ze,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new De(0,0,t,n),this.scissorTest=!1,this.viewport=new De(0,0,t,n),this.textures=[];const r={width:t,height:n,depth:i.depth},s=new on(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const n={minFilter:Ze,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=t,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},t.textures[n].image);this.textures[n].source=new au(r)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class pi extends X_{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}}class om extends on{constructor(t=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:r},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Y_ extends on{constructor(t=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:r},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class we{constructor(t,n,i,r,s,a,o,c,l,u,f,h,m,g,M,p){we.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,r,s,a,o,c,l,u,f,h,m,g,M,p)}set(t,n,i,r,s,a,o,c,l,u,f,h,m,g,M,p){const d=this.elements;return d[0]=t,d[4]=n,d[8]=i,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=u,d[10]=f,d[14]=h,d[3]=m,d[7]=g,d[11]=M,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new we().fromArray(this.elements)}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){const n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return this.determinant()===0?(t.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const n=this.elements,i=t.elements,r=1/es.setFromMatrixColumn(t,0).length(),s=1/es.setFromMatrixColumn(t,1).length(),a=1/es.setFromMatrixColumn(t,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,i=t.x,r=t.y,s=t.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),u=Math.cos(s),f=Math.sin(s);if(t.order==="XYZ"){const h=a*u,m=a*f,g=o*u,M=o*f;n[0]=c*u,n[4]=-c*f,n[8]=l,n[1]=m+g*l,n[5]=h-M*l,n[9]=-o*c,n[2]=M-h*l,n[6]=g+m*l,n[10]=a*c}else if(t.order==="YXZ"){const h=c*u,m=c*f,g=l*u,M=l*f;n[0]=h+M*o,n[4]=g*o-m,n[8]=a*l,n[1]=a*f,n[5]=a*u,n[9]=-o,n[2]=m*o-g,n[6]=M+h*o,n[10]=a*c}else if(t.order==="ZXY"){const h=c*u,m=c*f,g=l*u,M=l*f;n[0]=h-M*o,n[4]=-a*f,n[8]=g+m*o,n[1]=m+g*o,n[5]=a*u,n[9]=M-h*o,n[2]=-a*l,n[6]=o,n[10]=a*c}else if(t.order==="ZYX"){const h=a*u,m=a*f,g=o*u,M=o*f;n[0]=c*u,n[4]=g*l-m,n[8]=h*l+M,n[1]=c*f,n[5]=M*l+h,n[9]=m*l-g,n[2]=-l,n[6]=o*c,n[10]=a*c}else if(t.order==="YZX"){const h=a*c,m=a*l,g=o*c,M=o*l;n[0]=c*u,n[4]=M-h*f,n[8]=g*f+m,n[1]=f,n[5]=a*u,n[9]=-o*u,n[2]=-l*u,n[6]=m*f+g,n[10]=h-M*f}else if(t.order==="XZY"){const h=a*c,m=a*l,g=o*c,M=o*l;n[0]=c*u,n[4]=-f,n[8]=l*u,n[1]=h*f+M,n[5]=a*u,n[9]=m*f-g,n[2]=g*f-m,n[6]=o*u,n[10]=M*f+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(q_,t,$_)}lookAt(t,n,i){const r=this.elements;return Mn.subVectors(t,n),Mn.lengthSq()===0&&(Mn.z=1),Mn.normalize(),qi.crossVectors(i,Mn),qi.lengthSq()===0&&(Math.abs(i.z)===1?Mn.x+=1e-4:Mn.z+=1e-4,Mn.normalize(),qi.crossVectors(i,Mn)),qi.normalize(),Va.crossVectors(Mn,qi),r[0]=qi.x,r[4]=Va.x,r[8]=Mn.x,r[1]=qi.y,r[5]=Va.y,r[9]=Mn.y,r[2]=qi.z,r[6]=Va.z,r[10]=Mn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],u=i[1],f=i[5],h=i[9],m=i[13],g=i[2],M=i[6],p=i[10],d=i[14],x=i[3],E=i[7],y=i[11],w=i[15],C=r[0],A=r[4],v=r[8],b=r[12],N=r[1],R=r[5],F=r[9],V=r[13],Y=r[2],z=r[6],H=r[10],O=r[14],Q=r[3],K=r[7],lt=r[11],gt=r[15];return s[0]=a*C+o*N+c*Y+l*Q,s[4]=a*A+o*R+c*z+l*K,s[8]=a*v+o*F+c*H+l*lt,s[12]=a*b+o*V+c*O+l*gt,s[1]=u*C+f*N+h*Y+m*Q,s[5]=u*A+f*R+h*z+m*K,s[9]=u*v+f*F+h*H+m*lt,s[13]=u*b+f*V+h*O+m*gt,s[2]=g*C+M*N+p*Y+d*Q,s[6]=g*A+M*R+p*z+d*K,s[10]=g*v+M*F+p*H+d*lt,s[14]=g*b+M*V+p*O+d*gt,s[3]=x*C+E*N+y*Y+w*Q,s[7]=x*A+E*R+y*z+w*K,s[11]=x*v+E*F+y*H+w*lt,s[15]=x*b+E*V+y*O+w*gt,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[4],r=t[8],s=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],f=t[6],h=t[10],m=t[14],g=t[3],M=t[7],p=t[11],d=t[15],x=c*m-l*h,E=o*m-l*f,y=o*h-c*f,w=a*m-l*u,C=a*h-c*u,A=a*f-o*u;return n*(M*x-p*E+d*y)-i*(g*x-p*w+d*C)+r*(g*E-M*w+d*A)-s*(g*y-M*C+p*A)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){const r=this.elements;return t.isVector3?(r[12]=t.x,r[13]=t.y,r[14]=t.z):(r[12]=t,r[13]=n,r[14]=i),this}invert(){const t=this.elements,n=t[0],i=t[1],r=t[2],s=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],f=t[9],h=t[10],m=t[11],g=t[12],M=t[13],p=t[14],d=t[15],x=n*o-i*a,E=n*c-r*a,y=n*l-s*a,w=i*c-r*o,C=i*l-s*o,A=r*l-s*c,v=u*M-f*g,b=u*p-h*g,N=u*d-m*g,R=f*p-h*M,F=f*d-m*M,V=h*d-m*p,Y=x*V-E*F+y*R+w*N-C*b+A*v;if(Y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/Y;return t[0]=(o*V-c*F+l*R)*z,t[1]=(r*F-i*V-s*R)*z,t[2]=(M*A-p*C+d*w)*z,t[3]=(h*C-f*A-m*w)*z,t[4]=(c*N-a*V-l*b)*z,t[5]=(n*V-r*N+s*b)*z,t[6]=(p*y-g*A-d*E)*z,t[7]=(u*A-h*y+m*E)*z,t[8]=(a*F-o*N+l*v)*z,t[9]=(i*N-n*F-s*v)*z,t[10]=(g*C-M*y+d*x)*z,t[11]=(f*y-u*C-m*x)*z,t[12]=(o*b-a*R-c*v)*z,t[13]=(n*R-i*b+r*v)*z,t[14]=(M*E-g*w-p*x)*z,t[15]=(u*w-f*E+h*x)*z,this}scale(t){const n=this.elements,i=t.x,r=t.y,s=t.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],r=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=t.x,o=t.y,c=t.z,l=s*a,u=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,u*o+i,u*c-r*a,0,l*c-r*o,u*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,r,s,a){return this.set(1,i,s,0,t,1,a,0,n,r,1,0,0,0,0,1),this}compose(t,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,c=n._w,l=s+s,u=a+a,f=o+o,h=s*l,m=s*u,g=s*f,M=a*u,p=a*f,d=o*f,x=c*l,E=c*u,y=c*f,w=i.x,C=i.y,A=i.z;return r[0]=(1-(M+d))*w,r[1]=(m+y)*w,r[2]=(g-E)*w,r[3]=0,r[4]=(m-y)*C,r[5]=(1-(h+d))*C,r[6]=(p+x)*C,r[7]=0,r[8]=(g+E)*A,r[9]=(p-x)*A,r[10]=(1-(h+M))*A,r[11]=0,r[12]=t.x,r[13]=t.y,r[14]=t.z,r[15]=1,this}decompose(t,n,i){const r=this.elements;t.x=r[12],t.y=r[13],t.z=r[14];const s=this.determinant();if(s===0)return i.set(1,1,1),n.identity(),this;let a=es.set(r[0],r[1],r[2]).length();const o=es.set(r[4],r[5],r[6]).length(),c=es.set(r[8],r[9],r[10]).length();s<0&&(a=-a),qn.copy(this);const l=1/a,u=1/o,f=1/c;return qn.elements[0]*=l,qn.elements[1]*=l,qn.elements[2]*=l,qn.elements[4]*=u,qn.elements[5]*=u,qn.elements[6]*=u,qn.elements[8]*=f,qn.elements[9]*=f,qn.elements[10]*=f,n.setFromRotationMatrix(qn),i.x=a,i.y=o,i.z=c,this}makePerspective(t,n,i,r,s,a,o=ui,c=!1){const l=this.elements,u=2*s/(n-t),f=2*s/(i-r),h=(n+t)/(n-t),m=(i+r)/(i-r);let g,M;if(c)g=s/(a-s),M=a*s/(a-s);else if(o===ui)g=-(a+s)/(a-s),M=-2*a*s/(a-s);else if(o===Yo)g=-a/(a-s),M=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=f,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=M,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,n,i,r,s,a,o=ui,c=!1){const l=this.elements,u=2/(n-t),f=2/(i-r),h=-(n+t)/(n-t),m=-(i+r)/(i-r);let g,M;if(c)g=1/(a-s),M=a/(a-s);else if(o===ui)g=-2/(a-s),M=-(a+s)/(a-s);else if(o===Yo)g=-1/(a-s),M=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=f,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=g,l[14]=M,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const n=this.elements,i=t.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}}const es=new U,qn=new we,q_=new U(0,0,0),$_=new U(1,1,1),qi=new U,Va=new U,Mn=new U,Uf=new we,Ff=new ks;class ki{constructor(t=0,n=0,i=0,r=ki.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,r=this._order){return this._x=t,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){const r=t.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],u=r[9],f=r[2],h=r[6],m=r[10];switch(n){case"XYZ":this._y=Math.asin(qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-qt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(qt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-u,m),this._y=0);break;default:Ut("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return Uf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Uf,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return Ff.setFromEuler(this),this.setFromQuaternion(Ff,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ki.DEFAULT_ORDER="XYZ";class cm{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let j_=0;const Nf=new U,ns=new ks,Ti=new we,Ga=new U,na=new U,K_=new U,Z_=new ks,Of=new U(1,0,0),Bf=new U(0,1,0),kf=new U(0,0,1),zf={type:"added"},J_={type:"removed"},is={type:"childadded",child:null},Kc={type:"childremoved",child:null};class fn extends Bs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:j_++}),this.uuid=Ta(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=fn.DEFAULT_UP.clone();const t=new U,n=new ki,i=new ks,r=new U(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new we},normalMatrix:{value:new zt}}),this.matrix=new we,this.matrixWorld=new we,this.matrixAutoUpdate=fn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=fn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new cm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return ns.setFromAxisAngle(t,n),this.quaternion.multiply(ns),this}rotateOnWorldAxis(t,n){return ns.setFromAxisAngle(t,n),this.quaternion.premultiply(ns),this}rotateX(t){return this.rotateOnAxis(Of,t)}rotateY(t){return this.rotateOnAxis(Bf,t)}rotateZ(t){return this.rotateOnAxis(kf,t)}translateOnAxis(t,n){return Nf.copy(t).applyQuaternion(this.quaternion),this.position.add(Nf.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(Of,t)}translateY(t){return this.translateOnAxis(Bf,t)}translateZ(t){return this.translateOnAxis(kf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ti.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?Ga.copy(t):Ga.set(t,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),na.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ti.lookAt(na,Ga,this.up):Ti.lookAt(Ga,na,this.up),this.quaternion.setFromRotationMatrix(Ti),r&&(Ti.extractRotation(r.matrixWorld),ns.setFromRotationMatrix(Ti),this.quaternion.premultiply(ns.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(Qt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(zf),is.child=t,this.dispatchEvent(is),is.child=null):Qt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(J_),Kc.child=t,this.dispatchEvent(Kc),Kc.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ti.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ti.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ti),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(zf),is.child=t,this.dispatchEvent(is),is.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(t,n);if(a!==void 0)return a}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(na,t,K_),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(na,Z_,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const n=t.x,i=t.y,r=t.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*r,s[13]+=i-s[1]*n-s[5]*i-s[9]*r,s[14]+=r-s[2]*n-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(t),r.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const f=c[l];s(t.shapes,f)}else s(t.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(t.materials,this.material[c]));r.material=o}else r.material=s(t.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(t.animations,c))}}if(n){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),f=a(t.shapes),h=a(t.skeletons),m=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),f.length>0&&(i.shapes=f),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=r,i;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),t.pivot!==null&&(this.pivot=t.pivot.clone()),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){const r=t.children[i];this.add(r.clone())}return this}}fn.DEFAULT_UP=new U(0,1,0);fn.DEFAULT_MATRIX_AUTO_UPDATE=!0;fn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Dr extends fn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Q_={type:"move"};class Zc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Dr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Dr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Dr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const M of t.hand.values()){const p=n.getJointPose(M,i),d=this._getHandJoint(l,M);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}const u=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],h=u.position.distanceTo(f.position),m=.02,g=.005;l.inputState.pinching&&h>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(s=n.getPose(t.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=n.getPose(t.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Q_)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const i=new Dr;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}}const lm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},$i={h:0,s:0,l:0},Ha={h:0,s:0,l:0};function Jc(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}class re{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){const r=t;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=On){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.colorSpaceToWorking(this,n),this}setRGB(t,n,i,r=Kt.workingColorSpace){return this.r=t,this.g=n,this.b=i,Kt.colorSpaceToWorking(this,r),this}setHSL(t,n,i,r=Kt.workingColorSpace){if(t=z_(t,1),n=qt(n,0,1),i=qt(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=Jc(a,s,t+1/3),this.g=Jc(a,s,t),this.b=Jc(a,s,t-1/3)}return Kt.colorSpaceToWorking(this,r),this}setStyle(t,n=On){function i(s){s!==void 0&&parseFloat(s)<1&&Ut("Color: Alpha component of "+t+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:Ut("Color: Unknown color model "+t)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);Ut("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=On){const i=lm[t.toLowerCase()];return i!==void 0?this.setHex(i,n):Ut("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Fi(t.r),this.g=Fi(t.g),this.b=Fi(t.b),this}copyLinearToSRGB(t){return this.r=_s(t.r),this.g=_s(t.g),this.b=_s(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=On){return Kt.workingToColorSpace(rn.copy(this),t),Math.round(qt(rn.r*255,0,255))*65536+Math.round(qt(rn.g*255,0,255))*256+Math.round(qt(rn.b*255,0,255))}getHexString(t=On){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Kt.workingColorSpace){Kt.workingToColorSpace(rn.copy(this),n);const i=rn.r,r=rn.g,s=rn.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=u<=.5?f/(a+o):f/(2-a-o),a){case i:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-i)/f+2;break;case s:c=(i-r)/f+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,n=Kt.workingColorSpace){return Kt.workingToColorSpace(rn.copy(this),n),t.r=rn.r,t.g=rn.g,t.b=rn.b,t}getStyle(t=On){Kt.workingToColorSpace(rn.copy(this),t);const n=rn.r,i=rn.g,r=rn.b;return t!==On?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(t,n,i){return this.getHSL($i),this.setHSL($i.h+t,$i.s+n,$i.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL($i),t.getHSL(Ha);const i=Xc($i.h,Ha.h,n),r=Xc($i.s,Ha.s,n),s=Xc($i.l,Ha.l,n);return this.setHSL(i,r,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,i=this.g,r=this.b,s=t.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const rn=new re;re.NAMES=lm;class t1 extends fn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ki,this.environmentIntensity=1,this.environmentRotation=new ki,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const $n=new U,wi=new U,Qc=new U,Ri=new U,rs=new U,ss=new U,Vf=new U,tl=new U,el=new U,nl=new U,il=new De,rl=new De,sl=new De;class zn{constructor(t=new U,n=new U,i=new U){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,r){r.subVectors(i,n),$n.subVectors(t,n),r.cross($n);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(t,n,i,r,s){$n.subVectors(r,n),wi.subVectors(i,n),Qc.subVectors(t,n);const a=$n.dot($n),o=$n.dot(wi),c=$n.dot(Qc),l=wi.dot(wi),u=wi.dot(Qc),f=a*l-o*o;if(f===0)return s.set(0,0,0),null;const h=1/f,m=(l*c-o*u)*h,g=(a*u-o*c)*h;return s.set(1-m-g,g,m)}static containsPoint(t,n,i,r){return this.getBarycoord(t,n,i,r,Ri)===null?!1:Ri.x>=0&&Ri.y>=0&&Ri.x+Ri.y<=1}static getInterpolation(t,n,i,r,s,a,o,c){return this.getBarycoord(t,n,i,r,Ri)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Ri.x),c.addScaledVector(a,Ri.y),c.addScaledVector(o,Ri.z),c)}static getInterpolatedAttribute(t,n,i,r,s,a){return il.setScalar(0),rl.setScalar(0),sl.setScalar(0),il.fromBufferAttribute(t,n),rl.fromBufferAttribute(t,i),sl.fromBufferAttribute(t,r),a.setScalar(0),a.addScaledVector(il,s.x),a.addScaledVector(rl,s.y),a.addScaledVector(sl,s.z),a}static isFrontFacing(t,n,i,r){return $n.subVectors(i,n),wi.subVectors(t,n),$n.cross(wi).dot(r)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,r){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[r]),this}setFromAttributeAndIndices(t,n,i,r){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,r),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return $n.subVectors(this.c,this.b),wi.subVectors(this.a,this.b),$n.cross(wi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return zn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return zn.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,r,s){return zn.getInterpolation(t,this.a,this.b,this.c,n,i,r,s)}containsPoint(t){return zn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return zn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const i=this.a,r=this.b,s=this.c;let a,o;rs.subVectors(r,i),ss.subVectors(s,i),tl.subVectors(t,i);const c=rs.dot(tl),l=ss.dot(tl);if(c<=0&&l<=0)return n.copy(i);el.subVectors(t,r);const u=rs.dot(el),f=ss.dot(el);if(u>=0&&f<=u)return n.copy(r);const h=c*f-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),n.copy(i).addScaledVector(rs,a);nl.subVectors(t,s);const m=rs.dot(nl),g=ss.dot(nl);if(g>=0&&m<=g)return n.copy(s);const M=m*l-c*g;if(M<=0&&l>=0&&g<=0)return o=l/(l-g),n.copy(i).addScaledVector(ss,o);const p=u*g-m*f;if(p<=0&&f-u>=0&&m-g>=0)return Vf.subVectors(s,r),o=(f-u)/(f-u+(m-g)),n.copy(r).addScaledVector(Vf,o);const d=1/(p+M+h);return a=M*d,o=h*d,n.copy(i).addScaledVector(rs,a).addScaledVector(ss,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class wa{constructor(t=new U(1/0,1/0,1/0),n=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(jn.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(jn.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const i=jn.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,jn):jn.fromBufferAttribute(s,a),jn.applyMatrix4(t.matrixWorld),this.expandByPoint(jn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Wa.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Wa.copy(i.boundingBox)),Wa.applyMatrix4(t.matrixWorld),this.union(Wa)}const r=t.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,jn),jn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ia),Xa.subVectors(this.max,ia),as.subVectors(t.a,ia),os.subVectors(t.b,ia),cs.subVectors(t.c,ia),ji.subVectors(os,as),Ki.subVectors(cs,os),gr.subVectors(as,cs);let n=[0,-ji.z,ji.y,0,-Ki.z,Ki.y,0,-gr.z,gr.y,ji.z,0,-ji.x,Ki.z,0,-Ki.x,gr.z,0,-gr.x,-ji.y,ji.x,0,-Ki.y,Ki.x,0,-gr.y,gr.x,0];return!al(n,as,os,cs,Xa)||(n=[1,0,0,0,1,0,0,0,1],!al(n,as,os,cs,Xa))?!1:(Ya.crossVectors(ji,Ki),n=[Ya.x,Ya.y,Ya.z],al(n,as,os,cs,Xa))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,jn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(jn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ci),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ci=[new U,new U,new U,new U,new U,new U,new U,new U],jn=new U,Wa=new wa,as=new U,os=new U,cs=new U,ji=new U,Ki=new U,gr=new U,ia=new U,Xa=new U,Ya=new U,_r=new U;function al(e,t,n,i,r){for(let s=0,a=e.length-3;s<=a;s+=3){_r.fromArray(e,s);const o=r.x*Math.abs(_r.x)+r.y*Math.abs(_r.y)+r.z*Math.abs(_r.z),c=t.dot(_r),l=n.dot(_r),u=i.dot(_r);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Fe=new U,qa=new ne;let e1=0;class cn{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:e1++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=wf,this.updateRanges=[],this.gpuType=hi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[t+r]=n.array[i+r];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)qa.fromBufferAttribute(this,n),qa.applyMatrix3(t),this.setXY(n,qa.x,qa.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Fe.fromBufferAttribute(this,n),Fe.applyMatrix3(t),this.setXYZ(n,Fe.x,Fe.y,Fe.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)Fe.fromBufferAttribute(this,n),Fe.applyMatrix4(t),this.setXYZ(n,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)Fe.fromBufferAttribute(this,n),Fe.applyNormalMatrix(t),this.setXYZ(n,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)Fe.fromBufferAttribute(this,n),Fe.transformDirection(t),this.setXYZ(n,Fe.x,Fe.y,Fe.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=ea(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=dn(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=ea(n,this.array)),n}setX(t,n){return this.normalized&&(n=dn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=ea(n,this.array)),n}setY(t,n){return this.normalized&&(n=dn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=ea(n,this.array)),n}setZ(t,n){return this.normalized&&(n=dn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=ea(n,this.array)),n}setW(t,n){return this.normalized&&(n=dn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=dn(n,this.array),i=dn(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,r){return t*=this.itemSize,this.normalized&&(n=dn(n,this.array),i=dn(i,this.array),r=dn(r,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=r,this}setXYZW(t,n,i,r,s){return t*=this.itemSize,this.normalized&&(n=dn(n,this.array),i=dn(i,this.array),r=dn(r,this.array),s=dn(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=r,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==wf&&(t.usage=this.usage),t}}class hm extends cn{constructor(t,n,i){super(new Uint16Array(t),n,i)}}class um extends cn{constructor(t,n,i){super(new Uint32Array(t),n,i)}}class Re extends cn{constructor(t,n,i){super(new Float32Array(t),n,i)}}const n1=new wa,ra=new U,ol=new U;class Ra{constructor(t=new U,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const i=this.center;n!==void 0?i.copy(n):n1.setFromPoints(t).getCenter(i);let r=0;for(let s=0,a=t.length;s<a;s++)r=Math.max(r,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(r),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ra.subVectors(t,this.center);const n=ra.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(ra,r/i),this.radius+=r}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ol.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ra.copy(t.center).add(ol)),this.expandByPoint(ra.copy(t.center).sub(ol))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let i1=0;const In=new we,cl=new fn,ls=new U,Sn=new wa,sa=new wa,$e=new U;class Xe extends Bs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:i1++}),this.uuid=Ta(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(N_(t)?um:hm)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new zt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(t),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return In.makeRotationFromQuaternion(t),this.applyMatrix4(In),this}rotateX(t){return In.makeRotationX(t),this.applyMatrix4(In),this}rotateY(t){return In.makeRotationY(t),this.applyMatrix4(In),this}rotateZ(t){return In.makeRotationZ(t),this.applyMatrix4(In),this}translate(t,n,i){return In.makeTranslation(t,n,i),this.applyMatrix4(In),this}scale(t,n,i){return In.makeScale(t,n,i),this.applyMatrix4(In),this}lookAt(t){return cl.lookAt(t),cl.updateMatrix(),this.applyMatrix4(cl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ls).negate(),this.translate(ls.x,ls.y,ls.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=t.length;r<s;r++){const a=t[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Re(i,3))}else{const i=Math.min(t.length,n.count);for(let r=0;r<i;r++){const s=t[r];n.setXYZ(r,s.x,s.y,s.z||0)}t.length>n.count&&Ut("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wa);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Qt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];Sn.setFromBufferAttribute(s),this.morphTargetsRelative?($e.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint($e),$e.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint($e)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ra);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Qt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(t){const i=this.boundingSphere.center;if(Sn.setFromBufferAttribute(t),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];sa.setFromBufferAttribute(o),this.morphTargetsRelative?($e.addVectors(Sn.min,sa.min),Sn.expandByPoint($e),$e.addVectors(Sn.max,sa.max),Sn.expandByPoint($e)):(Sn.expandByPoint(sa.min),Sn.expandByPoint(sa.max))}Sn.getCenter(i);let r=0;for(let s=0,a=t.count;s<a;s++)$e.fromBufferAttribute(t,s),r=Math.max(r,i.distanceToSquared($e));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)$e.fromBufferAttribute(o,l),c&&(ls.fromBufferAttribute(t,l),$e.add(ls)),r=Math.max(r,i.distanceToSquared($e))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Qt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Qt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new cn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let v=0;v<i.count;v++)o[v]=new U,c[v]=new U;const l=new U,u=new U,f=new U,h=new ne,m=new ne,g=new ne,M=new U,p=new U;function d(v,b,N){l.fromBufferAttribute(i,v),u.fromBufferAttribute(i,b),f.fromBufferAttribute(i,N),h.fromBufferAttribute(s,v),m.fromBufferAttribute(s,b),g.fromBufferAttribute(s,N),u.sub(l),f.sub(l),m.sub(h),g.sub(h);const R=1/(m.x*g.y-g.x*m.y);isFinite(R)&&(M.copy(u).multiplyScalar(g.y).addScaledVector(f,-m.y).multiplyScalar(R),p.copy(f).multiplyScalar(m.x).addScaledVector(u,-g.x).multiplyScalar(R),o[v].add(M),o[b].add(M),o[N].add(M),c[v].add(p),c[b].add(p),c[N].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:t.count}]);for(let v=0,b=x.length;v<b;++v){const N=x[v],R=N.start,F=N.count;for(let V=R,Y=R+F;V<Y;V+=3)d(t.getX(V+0),t.getX(V+1),t.getX(V+2))}const E=new U,y=new U,w=new U,C=new U;function A(v){w.fromBufferAttribute(r,v),C.copy(w);const b=o[v];E.copy(b),E.sub(w.multiplyScalar(w.dot(b))).normalize(),y.crossVectors(C,b);const R=y.dot(c[v])<0?-1:1;a.setXYZW(v,E.x,E.y,E.z,R)}for(let v=0,b=x.length;v<b;++v){const N=x[v],R=N.start,F=N.count;for(let V=R,Y=R+F;V<Y;V+=3)A(t.getX(V+0)),A(t.getX(V+1)),A(t.getX(V+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new cn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const r=new U,s=new U,a=new U,o=new U,c=new U,l=new U,u=new U,f=new U;if(t)for(let h=0,m=t.count;h<m;h+=3){const g=t.getX(h+0),M=t.getX(h+1),p=t.getX(h+2);r.fromBufferAttribute(n,g),s.fromBufferAttribute(n,M),a.fromBufferAttribute(n,p),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,M),l.fromBufferAttribute(i,p),o.add(u),c.add(u),l.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(M,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let h=0,m=n.count;h<m;h+=3)r.fromBufferAttribute(n,h+0),s.fromBufferAttribute(n,h+1),a.fromBufferAttribute(n,h+2),u.subVectors(a,s),f.subVectors(r,s),u.cross(f),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)$e.fromBufferAttribute(t,n),$e.normalize(),t.setXYZ(n,$e.x,$e.y,$e.z)}toNonIndexed(){function t(o,c){const l=o.array,u=o.itemSize,f=o.normalized,h=new l.constructor(c.length*u);let m=0,g=0;for(let M=0,p=c.length;M<p;M++){o.isInterleavedBufferAttribute?m=c[M]*o.data.stride+o.offset:m=c[M]*u;for(let d=0;d<u;d++)h[g++]=l[m++]}return new cn(h,u,f)}if(this.index===null)return Ut("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new Xe,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=t(c,i);n.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let u=0,f=l.length;u<f;u++){const h=l[u],m=t(h,i);c.push(m)}n.morphAttributes[o]=c}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];n.addGroup(l.start,l.count,l.materialIndex)}return n}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let f=0,h=l.length;f<h;f++){const m=l[f];u.push(m.toJSON(t.data))}u.length>0&&(r[c]=u,s=!0)}s&&(t.data.morphAttributes=r,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const r=t.attributes;for(const l in r){const u=r[l];this.setAttribute(l,u.clone(n))}const s=t.morphAttributes;for(const l in s){const u=[],f=s[l];for(let h=0,m=f.length;h<m;h++)u.push(f[h].clone(n));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,u=a.length;l<u;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let r1=0;class zs extends Bs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:r1++}),this.uuid=Ta(),this.name="",this.type="Material",this.blending=gs,this.side=lr,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Fl,this.blendDst=Nl,this.blendEquation=Rr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new re(0,0,0),this.blendAlpha=0,this.depthFunc=Ms,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Tf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qr,this.stencilZFail=Qr,this.stencilZPass=Qr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const i=t[n];if(i===void 0){Ut(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Ut(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==gs&&(i.blending=this.blending),this.side!==lr&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Fl&&(i.blendSrc=this.blendSrc),this.blendDst!==Nl&&(i.blendDst=this.blendDst),this.blendEquation!==Rr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ms&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Tf&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qr&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Qr&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Qr&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(n){const s=r(t.textures),a=r(t.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Pi=new U,ll=new U,$a=new U,Zi=new U,hl=new U,ja=new U,ul=new U;class ou{constructor(t=new U,n=new U(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Pi)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=Pi.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Pi.copy(this.origin).addScaledVector(this.direction,n),Pi.distanceToSquared(t))}distanceSqToSegment(t,n,i,r){ll.copy(t).add(n).multiplyScalar(.5),$a.copy(n).sub(t).normalize(),Zi.copy(this.origin).sub(ll);const s=t.distanceTo(n)*.5,a=-this.direction.dot($a),o=Zi.dot(this.direction),c=-Zi.dot($a),l=Zi.lengthSq(),u=Math.abs(1-a*a);let f,h,m,g;if(u>0)if(f=a*c-o,h=a*o-c,g=s*u,f>=0)if(h>=-g)if(h<=g){const M=1/u;f*=M,h*=M,m=f*(f+a*h+2*o)+h*(a*f+h+2*c)+l}else h=s,f=Math.max(0,-(a*h+o)),m=-f*f+h*(h+2*c)+l;else h=-s,f=Math.max(0,-(a*h+o)),m=-f*f+h*(h+2*c)+l;else h<=-g?(f=Math.max(0,-(-a*s+o)),h=f>0?-s:Math.min(Math.max(-s,-c),s),m=-f*f+h*(h+2*c)+l):h<=g?(f=0,h=Math.min(Math.max(-s,-c),s),m=h*(h+2*c)+l):(f=Math.max(0,-(a*s+o)),h=f>0?s:Math.min(Math.max(-s,-c),s),m=-f*f+h*(h+2*c)+l);else h=a>0?-s:s,f=Math.max(0,-(a*h+o)),m=-f*f+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(ll).addScaledVector($a,h),m}intersectSphere(t,n){Pi.subVectors(t.center,this.origin);const i=Pi.dot(this.direction),r=Pi.dot(Pi)-i*i,s=t.radius*t.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){const i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,r,s,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,f=1/this.direction.z,h=this.origin;return l>=0?(i=(t.min.x-h.x)*l,r=(t.max.x-h.x)*l):(i=(t.max.x-h.x)*l,r=(t.min.x-h.x)*l),u>=0?(s=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(s=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(t.min.z-h.z)*f,c=(t.max.z-h.z)*f):(o=(t.max.z-h.z)*f,c=(t.min.z-h.z)*f),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(t){return this.intersectBox(t,Pi)!==null}intersectTriangle(t,n,i,r,s){hl.subVectors(n,t),ja.subVectors(i,t),ul.crossVectors(hl,ja);let a=this.direction.dot(ul),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Zi.subVectors(this.origin,t);const c=o*this.direction.dot(ja.crossVectors(Zi,ja));if(c<0)return null;const l=o*this.direction.dot(hl.cross(Zi));if(l<0||c+l>a)return null;const u=-o*Zi.dot(ul);return u<0?null:this.at(u/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Wr extends zs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.combine=Wp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Gf=new we,vr=new ou,Ka=new Ra,Hf=new U,Za=new U,Ja=new U,Qa=new U,fl=new U,to=new U,Wf=new U,eo=new U;class _n extends fn{constructor(t=new Xe,n=new Wr){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,t);const o=this.morphTargetInfluences;if(s&&o){to.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const u=o[c],f=s[c];u!==0&&(fl.fromBufferAttribute(f,t),a?to.addScaledVector(fl,u):to.addScaledVector(fl.sub(n),u))}n.add(to)}return n}raycast(t,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ka.copy(i.boundingSphere),Ka.applyMatrix4(s),vr.copy(t.ray).recast(t.near),!(Ka.containsPoint(vr.origin)===!1&&(vr.intersectSphere(Ka,Hf)===null||vr.origin.distanceToSquared(Hf)>(t.far-t.near)**2))&&(Gf.copy(s).invert(),vr.copy(t.ray).applyMatrix4(Gf),!(i.boundingBox!==null&&vr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,vr)))}_computeIntersections(t,n,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,u=s.attributes.uv1,f=s.attributes.normal,h=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,M=h.length;g<M;g++){const p=h[g],d=a[p.materialIndex],x=Math.max(p.start,m.start),E=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let y=x,w=E;y<w;y+=3){const C=o.getX(y),A=o.getX(y+1),v=o.getX(y+2);r=no(this,d,t,i,l,u,f,C,A,v),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=p.materialIndex,n.push(r))}}else{const g=Math.max(0,m.start),M=Math.min(o.count,m.start+m.count);for(let p=g,d=M;p<d;p+=3){const x=o.getX(p),E=o.getX(p+1),y=o.getX(p+2);r=no(this,a,t,i,l,u,f,x,E,y),r&&(r.faceIndex=Math.floor(p/3),n.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,M=h.length;g<M;g++){const p=h[g],d=a[p.materialIndex],x=Math.max(p.start,m.start),E=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let y=x,w=E;y<w;y+=3){const C=y,A=y+1,v=y+2;r=no(this,d,t,i,l,u,f,C,A,v),r&&(r.faceIndex=Math.floor(y/3),r.face.materialIndex=p.materialIndex,n.push(r))}}else{const g=Math.max(0,m.start),M=Math.min(c.count,m.start+m.count);for(let p=g,d=M;p<d;p+=3){const x=p,E=p+1,y=p+2;r=no(this,a,t,i,l,u,f,x,E,y),r&&(r.faceIndex=Math.floor(p/3),n.push(r))}}}}function s1(e,t,n,i,r,s,a,o){let c;if(t.side===gn?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,t.side===lr,o),c===null)return null;eo.copy(o),eo.applyMatrix4(e.matrixWorld);const l=n.ray.origin.distanceTo(eo);return l<n.near||l>n.far?null:{distance:l,point:eo.clone(),object:e}}function no(e,t,n,i,r,s,a,o,c,l){e.getVertexPosition(o,Za),e.getVertexPosition(c,Ja),e.getVertexPosition(l,Qa);const u=s1(e,t,n,i,Za,Ja,Qa,Wf);if(u){const f=new U;zn.getBarycoord(Wf,Za,Ja,Qa,f),r&&(u.uv=zn.getInterpolatedAttribute(r,o,c,l,f,new ne)),s&&(u.uv1=zn.getInterpolatedAttribute(s,o,c,l,f,new ne)),a&&(u.normal=zn.getInterpolatedAttribute(a,o,c,l,f,new U),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new U,materialIndex:0};zn.getNormal(Za,Ja,Qa,h.normal),u.face=h,u.barycoord=f}return u}class a1 extends on{constructor(t=null,n=1,i=1,r,s,a,o,c,l=Qe,u=Qe,f,h){super(null,a,o,c,l,u,r,s,f,h),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const dl=new U,o1=new U,c1=new zt;class br{constructor(t=new U(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,r){return this.normal.set(t,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){const r=dl.subVectors(i,n).cross(o1.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const i=t.delta(dl),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const i=n||c1.getNormalMatrix(t),r=this.coplanarPoint(dl).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const xr=new Ra,l1=new ne(.5,.5),io=new U;class fm{constructor(t=new br,n=new br,i=new br,r=new br,s=new br,a=new br){this.planes=[t,n,i,r,s,a]}set(t,n,i,r,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(t){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=ui,i=!1){const r=this.planes,s=t.elements,a=s[0],o=s[1],c=s[2],l=s[3],u=s[4],f=s[5],h=s[6],m=s[7],g=s[8],M=s[9],p=s[10],d=s[11],x=s[12],E=s[13],y=s[14],w=s[15];if(r[0].setComponents(l-a,m-u,d-g,w-x).normalize(),r[1].setComponents(l+a,m+u,d+g,w+x).normalize(),r[2].setComponents(l+o,m+f,d+M,w+E).normalize(),r[3].setComponents(l-o,m-f,d-M,w-E).normalize(),i)r[4].setComponents(c,h,p,y).normalize(),r[5].setComponents(l-c,m-h,d-p,w-y).normalize();else if(r[4].setComponents(l-c,m-h,d-p,w-y).normalize(),n===ui)r[5].setComponents(l+c,m+h,d+p,w+y).normalize();else if(n===Yo)r[5].setComponents(c,h,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),xr.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),xr.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(xr)}intersectsSprite(t){xr.center.set(0,0,0);const n=l1.distanceTo(t.center);return xr.radius=.7071067811865476+n,xr.applyMatrix4(t.matrixWorld),this.intersectsSphere(xr)}intersectsSphere(t){const n=this.planes,i=t.center,r=-t.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(t){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(io.x=r.normal.x>0?t.max.x:t.min.x,io.y=r.normal.y>0?t.max.y:t.min.y,io.z=r.normal.z>0?t.max.z:t.min.z,r.distanceToPoint(io)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class cu extends zs{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new re(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const jo=new U,Ko=new U,Xf=new we,aa=new ou,ro=new Ra,pl=new U,Yf=new U;class h1 extends fn{constructor(t=new Xe,n=new cu){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,i=[0];for(let r=1,s=n.count;r<s;r++)jo.fromBufferAttribute(n,r-1),Ko.fromBufferAttribute(n,r),i[r]=i[r-1],i[r]+=jo.distanceTo(Ko);t.setAttribute("lineDistance",new Re(i,1))}else Ut("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){const i=this.geometry,r=this.matrixWorld,s=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ro.copy(i.boundingSphere),ro.applyMatrix4(r),ro.radius+=s,t.ray.intersectsSphere(ro)===!1)return;Xf.copy(r).invert(),aa.copy(t.ray).applyMatrix4(Xf);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const m=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let M=m,p=g-1;M<p;M+=l){const d=u.getX(M),x=u.getX(M+1),E=so(this,t,aa,c,d,x,M);E&&n.push(E)}if(this.isLineLoop){const M=u.getX(g-1),p=u.getX(m),d=so(this,t,aa,c,M,p,g-1);d&&n.push(d)}}else{const m=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let M=m,p=g-1;M<p;M+=l){const d=so(this,t,aa,c,M,M+1,M);d&&n.push(d)}if(this.isLineLoop){const M=so(this,t,aa,c,g-1,m,g-1);M&&n.push(M)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function so(e,t,n,i,r,s,a){const o=e.geometry.attributes.position;if(jo.fromBufferAttribute(o,r),Ko.fromBufferAttribute(o,s),n.distanceSqToSegment(jo,Ko,pl,Yf)>i)return;pl.applyMatrix4(e.matrixWorld);const l=t.ray.origin.distanceTo(pl);if(!(l<t.near||l>t.far))return{distance:l,point:Yf.clone().applyMatrix4(e.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:e}}const qf=new U,$f=new U;class dm extends h1{constructor(t,n){super(t,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,i=[];for(let r=0,s=n.count;r<s;r+=2)qf.fromBufferAttribute(n,r),$f.fromBufferAttribute(n,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+qf.distanceTo($f);t.setAttribute("lineDistance",new Re(i,1))}else Ut("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class lc extends zs{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new re(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const jf=new we,Ah=new ou,ao=new Ra,oo=new U;class lu extends fn{constructor(t=new Xe,n=new lc){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,n){const i=this.geometry,r=this.matrixWorld,s=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ao.copy(i.boundingSphere),ao.applyMatrix4(r),ao.radius+=s,t.ray.intersectsSphere(ao)===!1)return;jf.copy(r).invert(),Ah.copy(t.ray).applyMatrix4(jf);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,f=i.attributes.position;if(l!==null){const h=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let g=h,M=m;g<M;g++){const p=l.getX(g);oo.fromBufferAttribute(f,p),Kf(oo,p,c,r,t,n,this)}}else{const h=Math.max(0,a.start),m=Math.min(f.count,a.start+a.count);for(let g=h,M=m;g<M;g++)oo.fromBufferAttribute(f,g),Kf(oo,g,c,r,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Kf(e,t,n,i,r,s,a){const o=Ah.distanceSqToPoint(e);if(o<n){const c=new U;Ah.closestPointToPoint(e,c),c.applyMatrix4(i);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class pm extends on{constructor(t=[],n=Hr,i,r,s,a,o,c,l,u){super(t,n,i,r,s,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class u1 extends on{constructor(t,n,i,r,s,a,o,c,l){super(t,n,i,r,s,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Sa extends on{constructor(t,n,i=gi,r,s,a,o=Qe,c=Qe,l,u=Bi,f=1){if(u!==Bi&&u!==Ir)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:t,height:n,depth:f};super(h,r,s,a,o,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new au(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class f1 extends Sa{constructor(t,n=gi,i=Hr,r,s,a=Qe,o=Qe,c,l=Bi){const u={width:t,height:t,depth:1},f=[u,u,u,u,u,u];super(t,t,n,i,r,s,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class mm extends on{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Ca extends Xe{constructor(t=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],u=[],f=[];let h=0,m=0;g("z","y","x",-1,-1,i,n,t,a,s,0),g("z","y","x",1,-1,i,n,-t,a,s,1),g("x","z","y",1,1,t,i,n,r,a,2),g("x","z","y",1,-1,t,i,-n,r,a,3),g("x","y","z",1,-1,t,n,i,r,s,4),g("x","y","z",-1,-1,t,n,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new Re(l,3)),this.setAttribute("normal",new Re(u,3)),this.setAttribute("uv",new Re(f,2));function g(M,p,d,x,E,y,w,C,A,v,b){const N=y/A,R=w/v,F=y/2,V=w/2,Y=C/2,z=A+1,H=v+1;let O=0,Q=0;const K=new U;for(let lt=0;lt<H;lt++){const gt=lt*R-V;for(let ft=0;ft<z;ft++){const Vt=ft*N-F;K[M]=Vt*x,K[p]=gt*E,K[d]=Y,l.push(K.x,K.y,K.z),K[M]=0,K[p]=0,K[d]=C>0?1:-1,u.push(K.x,K.y,K.z),f.push(ft/A),f.push(1-lt/v),O+=1}}for(let lt=0;lt<v;lt++)for(let gt=0;gt<A;gt++){const ft=h+gt+z*lt,Vt=h+gt+z*(lt+1),_e=h+(gt+1)+z*(lt+1),ge=h+(gt+1)+z*lt;c.push(ft,Vt,ge),c.push(Vt,_e,ge),Q+=6}o.addGroup(m,Q,b),m+=Q,h+=O}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ca(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class hu extends Xe{constructor(t=[],n=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:n,radius:i,detail:r};const s=[],a=[];o(r),l(i),u(),this.setAttribute("position",new Re(s,3)),this.setAttribute("normal",new Re(s.slice(),3)),this.setAttribute("uv",new Re(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const E=new U,y=new U,w=new U;for(let C=0;C<n.length;C+=3)m(n[C+0],E),m(n[C+1],y),m(n[C+2],w),c(E,y,w,x)}function c(x,E,y,w){const C=w+1,A=[];for(let v=0;v<=C;v++){A[v]=[];const b=x.clone().lerp(y,v/C),N=E.clone().lerp(y,v/C),R=C-v;for(let F=0;F<=R;F++)F===0&&v===C?A[v][F]=b:A[v][F]=b.clone().lerp(N,F/R)}for(let v=0;v<C;v++)for(let b=0;b<2*(C-v)-1;b++){const N=Math.floor(b/2);b%2===0?(h(A[v][N+1]),h(A[v+1][N]),h(A[v][N])):(h(A[v][N+1]),h(A[v+1][N+1]),h(A[v+1][N]))}}function l(x){const E=new U;for(let y=0;y<s.length;y+=3)E.x=s[y+0],E.y=s[y+1],E.z=s[y+2],E.normalize().multiplyScalar(x),s[y+0]=E.x,s[y+1]=E.y,s[y+2]=E.z}function u(){const x=new U;for(let E=0;E<s.length;E+=3){x.x=s[E+0],x.y=s[E+1],x.z=s[E+2];const y=p(x)/2/Math.PI+.5,w=d(x)/Math.PI+.5;a.push(y,1-w)}g(),f()}function f(){for(let x=0;x<a.length;x+=6){const E=a[x+0],y=a[x+2],w=a[x+4],C=Math.max(E,y,w),A=Math.min(E,y,w);C>.9&&A<.1&&(E<.2&&(a[x+0]+=1),y<.2&&(a[x+2]+=1),w<.2&&(a[x+4]+=1))}}function h(x){s.push(x.x,x.y,x.z)}function m(x,E){const y=x*3;E.x=t[y+0],E.y=t[y+1],E.z=t[y+2]}function g(){const x=new U,E=new U,y=new U,w=new U,C=new ne,A=new ne,v=new ne;for(let b=0,N=0;b<s.length;b+=9,N+=6){x.set(s[b+0],s[b+1],s[b+2]),E.set(s[b+3],s[b+4],s[b+5]),y.set(s[b+6],s[b+7],s[b+8]),C.set(a[N+0],a[N+1]),A.set(a[N+2],a[N+3]),v.set(a[N+4],a[N+5]),w.copy(x).add(E).add(y).divideScalar(3);const R=p(w);M(C,N+0,x,R),M(A,N+2,E,R),M(v,N+4,y,R)}}function M(x,E,y,w){w<0&&x.x===1&&(a[E]=x.x-1),y.x===0&&y.z===0&&(a[E]=w/2/Math.PI+.5)}function p(x){return Math.atan2(x.z,-x.x)}function d(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hu(t.vertices,t.indices,t.radius,t.detail)}}const co=new U,lo=new U,ml=new U,ho=new zn;class d1 extends Xe{constructor(t=null,n=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:n},t!==null){const r=Math.pow(10,4),s=Math.cos(Io*n),a=t.getIndex(),o=t.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],u=["a","b","c"],f=new Array(3),h={},m=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);const{a:M,b:p,c:d}=ho;if(M.fromBufferAttribute(o,l[0]),p.fromBufferAttribute(o,l[1]),d.fromBufferAttribute(o,l[2]),ho.getNormal(ml),f[0]=`${Math.round(M.x*r)},${Math.round(M.y*r)},${Math.round(M.z*r)}`,f[1]=`${Math.round(p.x*r)},${Math.round(p.y*r)},${Math.round(p.z*r)}`,f[2]=`${Math.round(d.x*r)},${Math.round(d.y*r)},${Math.round(d.z*r)}`,!(f[0]===f[1]||f[1]===f[2]||f[2]===f[0]))for(let x=0;x<3;x++){const E=(x+1)%3,y=f[x],w=f[E],C=ho[u[x]],A=ho[u[E]],v=`${y}_${w}`,b=`${w}_${y}`;b in h&&h[b]?(ml.dot(h[b].normal)<=s&&(m.push(C.x,C.y,C.z),m.push(A.x,A.y,A.z)),h[b]=null):v in h||(h[v]={index0:l[x],index1:l[E],normal:ml.clone()})}}for(const g in h)if(h[g]){const{index0:M,index1:p}=h[g];co.fromBufferAttribute(o,M),lo.fromBufferAttribute(o,p),m.push(co.x,co.y,co.z),m.push(lo.x,lo.y,lo.z)}this.setAttribute("position",new Re(m,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}}class uu extends hu{constructor(t=1,n=0){const i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,t,n),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:n}}static fromJSON(t){return new uu(t.radius,t.detail)}}class hc extends Xe{constructor(t=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:r};const s=t/2,a=n/2,o=Math.floor(i),c=Math.floor(r),l=o+1,u=c+1,f=t/o,h=n/c,m=[],g=[],M=[],p=[];for(let d=0;d<u;d++){const x=d*h-a;for(let E=0;E<l;E++){const y=E*f-s;g.push(y,-x,0),M.push(0,0,1),p.push(E/o),p.push(1-d/c)}}for(let d=0;d<c;d++)for(let x=0;x<o;x++){const E=x+l*d,y=x+l*(d+1),w=x+1+l*(d+1),C=x+1+l*d;m.push(E,y,C),m.push(y,w,C)}this.setIndex(m),this.setAttribute("position",new Re(g,3)),this.setAttribute("normal",new Re(M,3)),this.setAttribute("uv",new Re(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hc(t.width,t.height,t.widthSegments,t.heightSegments)}}class uc extends Xe{constructor(t=1,n=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const u=[],f=new U,h=new U,m=[],g=[],M=[],p=[];for(let d=0;d<=i;d++){const x=[],E=d/i;let y=0;d===0&&a===0?y=.5/n:d===i&&c===Math.PI&&(y=-.5/n);for(let w=0;w<=n;w++){const C=w/n;f.x=-t*Math.cos(r+C*s)*Math.sin(a+E*o),f.y=t*Math.cos(a+E*o),f.z=t*Math.sin(r+C*s)*Math.sin(a+E*o),g.push(f.x,f.y,f.z),h.copy(f).normalize(),M.push(h.x,h.y,h.z),p.push(C+y,1-E),x.push(l++)}u.push(x)}for(let d=0;d<i;d++)for(let x=0;x<n;x++){const E=u[d][x+1],y=u[d][x],w=u[d+1][x],C=u[d+1][x+1];(d!==0||a>0)&&m.push(E,y,C),(d!==i-1||c<Math.PI)&&m.push(y,w,C)}this.setIndex(m),this.setAttribute("position",new Re(g,3)),this.setAttribute("normal",new Re(M,3)),this.setAttribute("uv",new Re(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new uc(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class fu extends Xe{constructor(t=1,n=.4,i=12,r=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:n,radialSegments:i,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},i=Math.floor(i),r=Math.floor(r);const c=[],l=[],u=[],f=[],h=new U,m=new U,g=new U;for(let M=0;M<=i;M++){const p=a+M/i*o;for(let d=0;d<=r;d++){const x=d/r*s;m.x=(t+n*Math.cos(p))*Math.cos(x),m.y=(t+n*Math.cos(p))*Math.sin(x),m.z=n*Math.sin(p),l.push(m.x,m.y,m.z),h.x=t*Math.cos(x),h.y=t*Math.sin(x),g.subVectors(m,h).normalize(),u.push(g.x,g.y,g.z),f.push(d/r),f.push(M/i)}}for(let M=1;M<=i;M++)for(let p=1;p<=r;p++){const d=(r+1)*M+p-1,x=(r+1)*(M-1)+p-1,E=(r+1)*(M-1)+p,y=(r+1)*M+p;c.push(d,x,y),c.push(x,E,y)}this.setIndex(c),this.setAttribute("position",new Re(l,3)),this.setAttribute("normal",new Re(u,3)),this.setAttribute("uv",new Re(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fu(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}function bs(e){const t={};for(const n in e){t[n]={};for(const i in e[n]){const r=e[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(Ut("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=r.clone():Array.isArray(r)?t[n][i]=r.slice():t[n][i]=r}}return t}function un(e){const t={};for(let n=0;n<e.length;n++){const i=bs(e[n]);for(const r in i)t[r]=i[r]}return t}function p1(e){const t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function gm(e){const t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}const m1={clone:bs,merge:un};var g1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,_1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _i extends zs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=g1,this.fragmentShader=_1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=bs(t.uniforms),this.uniformsGroups=p1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class v1 extends _i{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class x1 extends zs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=w_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class M1 extends zs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const uo=new U,fo=new ks,ii=new U;class _m extends fn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new we,this.projectionMatrix=new we,this.projectionMatrixInverse=new we,this.coordinateSystem=ui,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(uo,fo,ii),ii.x===1&&ii.y===1&&ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(uo,fo,ii.set(1,1,1)).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorld.decompose(uo,fo,ii),ii.x===1&&ii.y===1&&ii.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(uo,fo,ii.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ji=new U,Zf=new ne,Jf=new ne;class Bn extends _m{constructor(t=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=bh*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Io*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return bh*2*Math.atan(Math.tan(Io*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){Ji.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ji.x,Ji.y).multiplyScalar(-t/Ji.z),Ji.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ji.x,Ji.y).multiplyScalar(-t/Ji.z)}getViewSize(t,n){return this.getViewBounds(t,Zf,Jf),n.subVectors(Jf,Zf)}setViewOffset(t,n,i,r,s,a){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(Io*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,n-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class vm extends _m{constructor(t=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-t,a=i+t,o=r+n,c=r-n;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const hs=-90,us=1;class S1 extends fn{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Bn(hs,us,t,n);r.layers=this.layers,this.add(r);const s=new Bn(hs,us,t,n);s.layers=this.layers,this.add(s);const a=new Bn(hs,us,t,n);a.layers=this.layers,this.add(a);const o=new Bn(hs,us,t,n);o.layers=this.layers,this.add(o);const c=new Bn(hs,us,t,n);c.layers=this.layers,this.add(c);const l=new Bn(hs,us,t,n);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,c]=n;for(const l of n)this.remove(l);if(t===ui)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Yo)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of n)this.add(l),l.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,u]=this.children,f=t.getRenderTarget(),h=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const M=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(i,0,r),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,s),t.setRenderTarget(i,1,r),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,a),t.setRenderTarget(i,2,r),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,o),t.setRenderTarget(i,3,r),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),t.setRenderTarget(i,4,r),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,l),i.texture.generateMipmaps=M,t.setRenderTarget(i,5,r),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,u),t.setRenderTarget(f,h,m),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class y1 extends Bn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function Qf(e,t,n,i){const r=E1(i);switch(n){case im:return e*t;case sm:return e*t/r.components*r.byteLength;case eu:return e*t/r.components*r.byteLength;case ys:return e*t*2/r.components*r.byteLength;case nu:return e*t*2/r.components*r.byteLength;case rm:return e*t*3/r.components*r.byteLength;case Kn:return e*t*4/r.components*r.byteLength;case iu:return e*t*4/r.components*r.byteLength;case Ro:case Co:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Po:case Lo:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ql:case jl:return Math.max(e,16)*Math.max(t,8)/4;case Yl:case $l:return Math.max(e,8)*Math.max(t,8)/2;case Kl:case Zl:case Ql:case th:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Jl:case eh:case nh:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ih:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case rh:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case sh:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case ah:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case oh:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case ch:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case lh:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case hh:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case uh:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case fh:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case dh:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case ph:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case mh:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case gh:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case _h:case vh:case xh:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Mh:case Sh:return Math.ceil(e/4)*Math.ceil(t/4)*8;case yh:case Eh:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function E1(e){switch(e){case kn:case Qp:return{byteLength:1,components:1};case xa:case tm:case Oi:return{byteLength:2,components:1};case Qh:case tu:return{byteLength:2,components:4};case gi:case Jh:case hi:return{byteLength:4,components:1};case em:case nm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Zh}}));typeof window<"u"&&(window.__THREE__?Ut("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Zh);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function xm(){let e=null,t=!1,n=null,i=null;function r(s,a){n(s,a),i=e.requestAnimationFrame(r)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(r),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){n=s},setContext:function(s){e=s}}}function b1(e){const t=new WeakMap;function n(o,c){const l=o.array,u=o.usage,f=l.byteLength,h=e.createBuffer();e.bindBuffer(c,h),e.bufferData(c,l,u),o.onUploadCallback();let m;if(l instanceof Float32Array)m=e.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=e.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=e.HALF_FLOAT:m=e.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=e.SHORT;else if(l instanceof Uint32Array)m=e.UNSIGNED_INT;else if(l instanceof Int32Array)m=e.INT;else if(l instanceof Int8Array)m=e.BYTE;else if(l instanceof Uint8Array)m=e.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,c,l){const u=c.array,f=c.updateRanges;if(e.bindBuffer(l,o),f.length===0)e.bufferSubData(l,0,u);else{f.sort((m,g)=>m.start-g.start);let h=0;for(let m=1;m<f.length;m++){const g=f[h],M=f[m];M.start<=g.start+g.count+1?g.count=Math.max(g.count,M.start+M.count-g.start):(++h,f[h]=M)}f.length=h+1;for(let m=0,g=f.length;m<g;m++){const M=f[m];e.bufferSubData(l,M.start*u.BYTES_PER_ELEMENT,u,M.start,M.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(e.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,n(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var A1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,T1=`#ifdef USE_ALPHAHASH
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
#endif`,w1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,R1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,C1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,P1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,L1=`#ifdef USE_AOMAP
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
#endif`,I1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,D1=`#ifdef USE_BATCHING
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
#endif`,U1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,F1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,N1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,O1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,B1=`#ifdef USE_IRIDESCENCE
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
#endif`,k1=`#ifdef USE_BUMPMAP
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
#endif`,z1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,V1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,G1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,H1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,W1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,X1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Y1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,q1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,$1=`#define PI 3.141592653589793
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
} // validated`,j1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,K1=`vec3 transformedNormal = objectNormal;
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
#endif`,Z1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,J1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Q1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,t2=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,e2="gl_FragColor = linearToOutputTexel( gl_FragColor );",n2=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,i2=`#ifdef USE_ENVMAP
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
#endif`,r2=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,s2=`#ifdef USE_ENVMAP
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
#endif`,a2=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,o2=`#ifdef USE_ENVMAP
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
#endif`,c2=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,l2=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,h2=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,u2=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,f2=`#ifdef USE_GRADIENTMAP
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
}`,d2=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,p2=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,m2=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,g2=`uniform bool receiveShadow;
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
#endif`,_2=`#ifdef USE_ENVMAP
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
#endif`,v2=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,x2=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,M2=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,S2=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,y2=`PhysicalMaterial material;
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
#endif`,E2=`uniform sampler2D dfgLUT;
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
}`,b2=`
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
#endif`,A2=`#if defined( RE_IndirectDiffuse )
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
#endif`,T2=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,w2=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,R2=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,C2=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,P2=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,L2=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,I2=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,D2=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,U2=`#if defined( USE_POINTS_UV )
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
#endif`,F2=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,N2=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,O2=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,B2=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,k2=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,z2=`#ifdef USE_MORPHTARGETS
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
#endif`,V2=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,G2=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,H2=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,W2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,X2=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Y2=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,q2=`#ifdef USE_NORMALMAP
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
#endif`,$2=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,j2=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,K2=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Z2=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,J2=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Q2=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,tv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ev=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,nv=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,iv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,rv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,sv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,av=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,ov=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,cv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,lv=`float getShadowMask() {
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
}`,hv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,uv=`#ifdef USE_SKINNING
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
#endif`,fv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,dv=`#ifdef USE_SKINNING
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
#endif`,pv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,_v=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,vv=`#ifdef USE_TRANSMISSION
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
#endif`,xv=`#ifdef USE_TRANSMISSION
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
#endif`,Mv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Sv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,yv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Ev=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const bv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Av=`uniform sampler2D t2D;
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
}`,Tv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,wv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Rv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Cv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pv=`#include <common>
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
}`,Lv=`#if DEPTH_PACKING == 3200
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
}`,Iv=`#define DISTANCE
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
}`,Dv=`#define DISTANCE
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
}`,Uv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Fv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nv=`uniform float scale;
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
}`,Ov=`uniform vec3 diffuse;
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
}`,Bv=`#include <common>
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
}`,kv=`uniform vec3 diffuse;
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
}`,zv=`#define LAMBERT
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
}`,Vv=`#define LAMBERT
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
}`,Gv=`#define MATCAP
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
}`,Hv=`#define MATCAP
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
}`,Wv=`#define NORMAL
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
}`,Xv=`#define NORMAL
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
}`,Yv=`#define PHONG
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
}`,qv=`#define PHONG
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
}`,$v=`#define STANDARD
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
}`,jv=`#define STANDARD
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
}`,Kv=`#define TOON
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
}`,Zv=`#define TOON
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
}`,Jv=`uniform float size;
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
}`,Qv=`uniform vec3 diffuse;
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
}`,tx=`#include <common>
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
}`,ex=`uniform vec3 color;
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
}`,nx=`uniform float rotation;
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
}`,ix=`uniform vec3 diffuse;
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
}`,Gt={alphahash_fragment:A1,alphahash_pars_fragment:T1,alphamap_fragment:w1,alphamap_pars_fragment:R1,alphatest_fragment:C1,alphatest_pars_fragment:P1,aomap_fragment:L1,aomap_pars_fragment:I1,batching_pars_vertex:D1,batching_vertex:U1,begin_vertex:F1,beginnormal_vertex:N1,bsdfs:O1,iridescence_fragment:B1,bumpmap_pars_fragment:k1,clipping_planes_fragment:z1,clipping_planes_pars_fragment:V1,clipping_planes_pars_vertex:G1,clipping_planes_vertex:H1,color_fragment:W1,color_pars_fragment:X1,color_pars_vertex:Y1,color_vertex:q1,common:$1,cube_uv_reflection_fragment:j1,defaultnormal_vertex:K1,displacementmap_pars_vertex:Z1,displacementmap_vertex:J1,emissivemap_fragment:Q1,emissivemap_pars_fragment:t2,colorspace_fragment:e2,colorspace_pars_fragment:n2,envmap_fragment:i2,envmap_common_pars_fragment:r2,envmap_pars_fragment:s2,envmap_pars_vertex:a2,envmap_physical_pars_fragment:_2,envmap_vertex:o2,fog_vertex:c2,fog_pars_vertex:l2,fog_fragment:h2,fog_pars_fragment:u2,gradientmap_pars_fragment:f2,lightmap_pars_fragment:d2,lights_lambert_fragment:p2,lights_lambert_pars_fragment:m2,lights_pars_begin:g2,lights_toon_fragment:v2,lights_toon_pars_fragment:x2,lights_phong_fragment:M2,lights_phong_pars_fragment:S2,lights_physical_fragment:y2,lights_physical_pars_fragment:E2,lights_fragment_begin:b2,lights_fragment_maps:A2,lights_fragment_end:T2,logdepthbuf_fragment:w2,logdepthbuf_pars_fragment:R2,logdepthbuf_pars_vertex:C2,logdepthbuf_vertex:P2,map_fragment:L2,map_pars_fragment:I2,map_particle_fragment:D2,map_particle_pars_fragment:U2,metalnessmap_fragment:F2,metalnessmap_pars_fragment:N2,morphinstance_vertex:O2,morphcolor_vertex:B2,morphnormal_vertex:k2,morphtarget_pars_vertex:z2,morphtarget_vertex:V2,normal_fragment_begin:G2,normal_fragment_maps:H2,normal_pars_fragment:W2,normal_pars_vertex:X2,normal_vertex:Y2,normalmap_pars_fragment:q2,clearcoat_normal_fragment_begin:$2,clearcoat_normal_fragment_maps:j2,clearcoat_pars_fragment:K2,iridescence_pars_fragment:Z2,opaque_fragment:J2,packing:Q2,premultiplied_alpha_fragment:tv,project_vertex:ev,dithering_fragment:nv,dithering_pars_fragment:iv,roughnessmap_fragment:rv,roughnessmap_pars_fragment:sv,shadowmap_pars_fragment:av,shadowmap_pars_vertex:ov,shadowmap_vertex:cv,shadowmask_pars_fragment:lv,skinbase_vertex:hv,skinning_pars_vertex:uv,skinning_vertex:fv,skinnormal_vertex:dv,specularmap_fragment:pv,specularmap_pars_fragment:mv,tonemapping_fragment:gv,tonemapping_pars_fragment:_v,transmission_fragment:vv,transmission_pars_fragment:xv,uv_pars_fragment:Mv,uv_pars_vertex:Sv,uv_vertex:yv,worldpos_vertex:Ev,background_vert:bv,background_frag:Av,backgroundCube_vert:Tv,backgroundCube_frag:wv,cube_vert:Rv,cube_frag:Cv,depth_vert:Pv,depth_frag:Lv,distance_vert:Iv,distance_frag:Dv,equirect_vert:Uv,equirect_frag:Fv,linedashed_vert:Nv,linedashed_frag:Ov,meshbasic_vert:Bv,meshbasic_frag:kv,meshlambert_vert:zv,meshlambert_frag:Vv,meshmatcap_vert:Gv,meshmatcap_frag:Hv,meshnormal_vert:Wv,meshnormal_frag:Xv,meshphong_vert:Yv,meshphong_frag:qv,meshphysical_vert:$v,meshphysical_frag:jv,meshtoon_vert:Kv,meshtoon_frag:Zv,points_vert:Jv,points_frag:Qv,shadow_vert:tx,shadow_frag:ex,sprite_vert:nx,sprite_frag:ix},at={common:{diffuse:{value:new re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new zt}},envmap:{envMap:{value:null},envMapRotation:{value:new zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new zt},normalScale:{value:new ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0},uvTransform:{value:new zt}},sprite:{diffuse:{value:new re(16777215)},opacity:{value:1},center:{value:new ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}}},li={basic:{uniforms:un([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:un([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new re(0)},envMapIntensity:{value:1}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:un([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new re(0)},specular:{value:new re(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:un([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:un([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new re(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:un([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:un([at.points,at.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:un([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:un([at.common,at.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:un([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:un([at.sprite,at.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new zt}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distance:{uniforms:un([at.common,at.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distance_vert,fragmentShader:Gt.distance_frag},shadow:{uniforms:un([at.lights,at.fog,{color:{value:new re(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};li.physical={uniforms:un([li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new zt},clearcoatNormalScale:{value:new ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new zt},sheen:{value:0},sheenColor:{value:new re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new zt},transmissionSamplerSize:{value:new ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new zt},attenuationDistance:{value:0},attenuationColor:{value:new re(0)},specularColor:{value:new re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new zt},anisotropyVector:{value:new ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new zt}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};const po={r:0,b:0,g:0},Mr=new ki,rx=new we;function sx(e,t,n,i,r,s){const a=new re(0);let o=r===!0?0:1,c,l,u=null,f=0,h=null;function m(x){let E=x.isScene===!0?x.background:null;if(E&&E.isTexture){const y=x.backgroundBlurriness>0;E=t.get(E,y)}return E}function g(x){let E=!1;const y=m(x);y===null?p(a,o):y&&y.isColor&&(p(y,1),E=!0);const w=e.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(e.autoClear||E)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function M(x,E){const y=m(E);y&&(y.isCubeTexture||y.mapping===cc)?(l===void 0&&(l=new _n(new Ca(1,1,1),new _i({name:"BackgroundCubeMaterial",uniforms:bs(li.backgroundCube.uniforms),vertexShader:li.backgroundCube.vertexShader,fragmentShader:li.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,C,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),Mr.copy(E.backgroundRotation),Mr.x*=-1,Mr.y*=-1,Mr.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Mr.y*=-1,Mr.z*=-1),l.material.uniforms.envMap.value=y,l.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(rx.makeRotationFromEuler(Mr)),l.material.toneMapped=Kt.getTransfer(y.colorSpace)!==oe,(u!==y||f!==y.version||h!==e.toneMapping)&&(l.material.needsUpdate=!0,u=y,f=y.version,h=e.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new _n(new hc(2,2),new _i({name:"BackgroundMaterial",uniforms:bs(li.background.uniforms),vertexShader:li.background.vertexShader,fragmentShader:li.background.fragmentShader,side:lr,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.toneMapped=Kt.getTransfer(y.colorSpace)!==oe,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||h!==e.toneMapping)&&(c.material.needsUpdate=!0,u=y,f=y.version,h=e.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,E){x.getRGB(po,gm(e)),n.buffers.color.setClear(po.r,po.g,po.b,E,s)}function d(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,E=1){a.set(x),o=E,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,p(a,o)},render:g,addToRenderList:M,dispose:d}}function ax(e,t){const n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},r=h(null);let s=r,a=!1;function o(R,F,V,Y,z){let H=!1;const O=f(R,Y,V,F);s!==O&&(s=O,l(s.object)),H=m(R,Y,V,z),H&&g(R,Y,V,z),z!==null&&t.update(z,e.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,y(R,F,V,Y),z!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function c(){return e.createVertexArray()}function l(R){return e.bindVertexArray(R)}function u(R){return e.deleteVertexArray(R)}function f(R,F,V,Y){const z=Y.wireframe===!0;let H=i[F.id];H===void 0&&(H={},i[F.id]=H);const O=R.isInstancedMesh===!0?R.id:0;let Q=H[O];Q===void 0&&(Q={},H[O]=Q);let K=Q[V.id];K===void 0&&(K={},Q[V.id]=K);let lt=K[z];return lt===void 0&&(lt=h(c()),K[z]=lt),lt}function h(R){const F=[],V=[],Y=[];for(let z=0;z<n;z++)F[z]=0,V[z]=0,Y[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:V,attributeDivisors:Y,object:R,attributes:{},index:null}}function m(R,F,V,Y){const z=s.attributes,H=F.attributes;let O=0;const Q=V.getAttributes();for(const K in Q)if(Q[K].location>=0){const gt=z[K];let ft=H[K];if(ft===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(ft=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(ft=R.instanceColor)),gt===void 0||gt.attribute!==ft||ft&&gt.data!==ft.data)return!0;O++}return s.attributesNum!==O||s.index!==Y}function g(R,F,V,Y){const z={},H=F.attributes;let O=0;const Q=V.getAttributes();for(const K in Q)if(Q[K].location>=0){let gt=H[K];gt===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(gt=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(gt=R.instanceColor));const ft={};ft.attribute=gt,gt&&gt.data&&(ft.data=gt.data),z[K]=ft,O++}s.attributes=z,s.attributesNum=O,s.index=Y}function M(){const R=s.newAttributes;for(let F=0,V=R.length;F<V;F++)R[F]=0}function p(R){d(R,0)}function d(R,F){const V=s.newAttributes,Y=s.enabledAttributes,z=s.attributeDivisors;V[R]=1,Y[R]===0&&(e.enableVertexAttribArray(R),Y[R]=1),z[R]!==F&&(e.vertexAttribDivisor(R,F),z[R]=F)}function x(){const R=s.newAttributes,F=s.enabledAttributes;for(let V=0,Y=F.length;V<Y;V++)F[V]!==R[V]&&(e.disableVertexAttribArray(V),F[V]=0)}function E(R,F,V,Y,z,H,O){O===!0?e.vertexAttribIPointer(R,F,V,z,H):e.vertexAttribPointer(R,F,V,Y,z,H)}function y(R,F,V,Y){M();const z=Y.attributes,H=V.getAttributes(),O=F.defaultAttributeValues;for(const Q in H){const K=H[Q];if(K.location>=0){let lt=z[Q];if(lt===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(lt=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(lt=R.instanceColor)),lt!==void 0){const gt=lt.normalized,ft=lt.itemSize,Vt=t.get(lt);if(Vt===void 0)continue;const _e=Vt.buffer,ge=Vt.type,$=Vt.bytesPerElement,nt=ge===e.INT||ge===e.UNSIGNED_INT||lt.gpuType===Jh;if(lt.isInterleavedBufferAttribute){const st=lt.data,Bt=st.stride,It=lt.offset;if(st.isInstancedInterleavedBuffer){for(let Ft=0;Ft<K.locationSize;Ft++)d(K.location+Ft,st.meshPerAttribute);R.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=st.meshPerAttribute*st.count)}else for(let Ft=0;Ft<K.locationSize;Ft++)p(K.location+Ft);e.bindBuffer(e.ARRAY_BUFFER,_e);for(let Ft=0;Ft<K.locationSize;Ft++)E(K.location+Ft,ft/K.locationSize,ge,gt,Bt*$,(It+ft/K.locationSize*Ft)*$,nt)}else{if(lt.isInstancedBufferAttribute){for(let st=0;st<K.locationSize;st++)d(K.location+st,lt.meshPerAttribute);R.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let st=0;st<K.locationSize;st++)p(K.location+st);e.bindBuffer(e.ARRAY_BUFFER,_e);for(let st=0;st<K.locationSize;st++)E(K.location+st,ft/K.locationSize,ge,gt,ft*$,ft/K.locationSize*st*$,nt)}}else if(O!==void 0){const gt=O[Q];if(gt!==void 0)switch(gt.length){case 2:e.vertexAttrib2fv(K.location,gt);break;case 3:e.vertexAttrib3fv(K.location,gt);break;case 4:e.vertexAttrib4fv(K.location,gt);break;default:e.vertexAttrib1fv(K.location,gt)}}}}x()}function w(){b();for(const R in i){const F=i[R];for(const V in F){const Y=F[V];for(const z in Y){const H=Y[z];for(const O in H)u(H[O].object),delete H[O];delete Y[z]}}delete i[R]}}function C(R){if(i[R.id]===void 0)return;const F=i[R.id];for(const V in F){const Y=F[V];for(const z in Y){const H=Y[z];for(const O in H)u(H[O].object),delete H[O];delete Y[z]}}delete i[R.id]}function A(R){for(const F in i){const V=i[F];for(const Y in V){const z=V[Y];if(z[R.id]===void 0)continue;const H=z[R.id];for(const O in H)u(H[O].object),delete H[O];delete z[R.id]}}}function v(R){for(const F in i){const V=i[F],Y=R.isInstancedMesh===!0?R.id:0,z=V[Y];if(z!==void 0){for(const H in z){const O=z[H];for(const Q in O)u(O[Q].object),delete O[Q];delete z[H]}delete V[Y],Object.keys(V).length===0&&delete i[F]}}}function b(){N(),a=!0,s!==r&&(s=r,l(s.object))}function N(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:b,resetDefaultState:N,dispose:w,releaseStatesOfGeometry:C,releaseStatesOfObject:v,releaseStatesOfProgram:A,initAttributes:M,enableAttribute:p,disableUnusedAttributes:x}}function ox(e,t,n){let i;function r(l){i=l}function s(l,u){e.drawArrays(i,l,u),n.update(u,i,1)}function a(l,u,f){f!==0&&(e.drawArraysInstanced(i,l,u,f),n.update(u,i,f))}function o(l,u,f){if(f===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,f);let m=0;for(let g=0;g<f;g++)m+=u[g];n.update(m,i,1)}function c(l,u,f,h){if(f===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<l.length;g++)a(l[g],u[g],h[g]);else{m.multiDrawArraysInstancedWEBGL(i,l,0,u,0,h,0,f);let g=0;for(let M=0;M<f;M++)g+=u[M]*h[M];n.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function cx(e,t,n,i){let r;function s(){if(r!==void 0)return r;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");r=e.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(A){return!(A!==Kn&&i.convert(A)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const v=A===Oi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==kn&&i.convert(A)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==hi&&!v)}function c(A){if(A==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=n.precision!==void 0?n.precision:"highp";const u=c(l);u!==l&&(Ut("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const f=n.logarithmicDepthBuffer===!0,h=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),m=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),M=e.getParameter(e.MAX_TEXTURE_SIZE),p=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),d=e.getParameter(e.MAX_VERTEX_ATTRIBS),x=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),E=e.getParameter(e.MAX_VARYING_VECTORS),y=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),w=e.getParameter(e.MAX_SAMPLES),C=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:h,maxTextures:m,maxVertexTextures:g,maxTextureSize:M,maxCubemapSize:p,maxAttributes:d,maxVertexUniforms:x,maxVaryings:E,maxFragmentUniforms:y,maxSamples:w,samples:C}}function lx(e){const t=this;let n=null,i=0,r=!1,s=!1;const a=new br,o=new zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,h){const m=f.length!==0||h||i!==0||r;return r=h,i=f.length,m},this.beginShadows=function(){s=!0,u(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,h){n=u(f,h,0)},this.setState=function(f,h,m){const g=f.clippingPlanes,M=f.clipIntersection,p=f.clipShadows,d=e.get(f);if(!r||g===null||g.length===0||s&&!p)s?u(null):l();else{const x=s?0:i,E=x*4;let y=d.clippingState||null;c.value=y,y=u(g,h,E,m);for(let w=0;w!==E;++w)y[w]=n[w];d.clippingState=y,this.numIntersection=M?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(f,h,m,g){const M=f!==null?f.length:0;let p=null;if(M!==0){if(p=c.value,g!==!0||p===null){const d=m+M*4,x=h.matrixWorldInverse;o.getNormalMatrix(x),(p===null||p.length<d)&&(p=new Float32Array(d));for(let E=0,y=m;E!==M;++E,y+=4)a.copy(f[E]).applyMatrix4(x,o),a.normal.toArray(p,y),p[y+3]=a.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=M,t.numIntersection=0,p}}const ar=4,td=[.125,.215,.35,.446,.526,.582],Cr=20,hx=256,oa=new vm,ed=new re;let gl=null,_l=0,vl=0,xl=!1;const ux=new U;class nd{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,i=.1,r=100,s={}){const{size:a=256,position:o=ux}=s;gl=this._renderer.getRenderTarget(),_l=this._renderer.getActiveCubeFace(),vl=this._renderer.getActiveMipmapLevel(),xl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,r,c,o),n>0&&this._blur(c,0,0,n),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=sd(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rd(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(gl,_l,vl),this._renderer.xr.enabled=xl,t.scissorTest=!1,fs(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Hr||t.mapping===Ss?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),gl=this._renderer.getRenderTarget(),_l=this._renderer.getActiveCubeFace(),vl=this._renderer.getActiveMipmapLevel(),xl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:Ze,minFilter:Ze,generateMipmaps:!1,type:Oi,format:Kn,colorSpace:Es,depthBuffer:!1},r=id(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=id(t,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=fx(s)),this._blurMaterial=px(s,t,n),this._ggxMaterial=dx(s,t,n)}return r}_compileMaterial(t){const n=new _n(new Xe,t);this._renderer.compile(n,oa)}_sceneToCubeUV(t,n,i,r,s){const c=new Bn(90,1,n,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],f=this._renderer,h=f.autoClear,m=f.toneMapping;f.getClearColor(ed),f.toneMapping=di,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new _n(new Ca,new Wr({name:"PMREM.Background",side:gn,depthWrite:!1,depthTest:!1})));const M=this._backgroundBox,p=M.material;let d=!1;const x=t.background;x?x.isColor&&(p.color.copy(x),t.background=null,d=!0):(p.color.copy(ed),d=!0);for(let E=0;E<6;E++){const y=E%3;y===0?(c.up.set(0,l[E],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+u[E],s.y,s.z)):y===1?(c.up.set(0,0,l[E]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+u[E],s.z)):(c.up.set(0,l[E],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+u[E]));const w=this._cubeSize;fs(r,y*w,E>2?w:0,w,w),f.setRenderTarget(r),d&&f.render(M,c),f.render(t,c)}f.toneMapping=m,f.autoClear=h,t.background=x}_textureToCubeUV(t,n){const i=this._renderer,r=t.mapping===Hr||t.mapping===Ss;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=sd()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=rd());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=t;const c=this._cubeSize;fs(n,0,0,3*c,2*c),i.setRenderTarget(n),i.render(a,oa)}_applyPMREM(t){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(t,s-1,s);n.autoClear=i}_applyGGXFilter(t,n,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),u=n/(this._lodMeshes.length-1),f=Math.sqrt(l*l-u*u),h=0+l*1.25,m=f*h,{_lodMax:g}=this,M=this._sizeLods[i],p=3*M*(i>g-ar?i-g+ar:0),d=4*(this._cubeSize-M);c.envMap.value=t.texture,c.roughness.value=m,c.mipInt.value=g-n,fs(s,p,d,3*M,2*M),r.setRenderTarget(s),r.render(o,oa),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=g-i,fs(t,p,d,3*M,2*M),r.setRenderTarget(t),r.render(o,oa)}_blur(t,n,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,n,i,r,"latitudinal",s),this._halfBlur(a,t,i,i,r,"longitudinal",s)}_halfBlur(t,n,i,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Qt("blur direction must be either latitudinal or longitudinal!");const u=3,f=this._lodMeshes[r];f.material=l;const h=l.uniforms,m=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*Cr-1),M=s/g,p=isFinite(s)?1+Math.floor(u*M):Cr;p>Cr&&Ut(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Cr}`);const d=[];let x=0;for(let A=0;A<Cr;++A){const v=A/M,b=Math.exp(-v*v/2);d.push(b),A===0?x+=b:A<p&&(x+=2*b)}for(let A=0;A<d.length;A++)d[A]=d[A]/x;h.envMap.value=t.texture,h.samples.value=p,h.weights.value=d,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:E}=this;h.dTheta.value=g,h.mipInt.value=E-i;const y=this._sizeLods[r],w=3*y*(r>E-ar?r-E+ar:0),C=4*(this._cubeSize-y);fs(n,w,C,3*y,2*y),c.setRenderTarget(n),c.render(f,oa)}}function fx(e){const t=[],n=[],i=[];let r=e;const s=e-ar+1+td.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);t.push(o);let c=1/o;a>e-ar?c=td[a-e+ar-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,f=1+l,h=[u,u,f,u,f,f,u,u,f,f,u,f],m=6,g=6,M=3,p=2,d=1,x=new Float32Array(M*g*m),E=new Float32Array(p*g*m),y=new Float32Array(d*g*m);for(let C=0;C<m;C++){const A=C%3*2/3-1,v=C>2?0:-1,b=[A,v,0,A+2/3,v,0,A+2/3,v+1,0,A,v,0,A+2/3,v+1,0,A,v+1,0];x.set(b,M*g*C),E.set(h,p*g*C);const N=[C,C,C,C,C,C];y.set(N,d*g*C)}const w=new Xe;w.setAttribute("position",new cn(x,M)),w.setAttribute("uv",new cn(E,p)),w.setAttribute("faceIndex",new cn(y,d)),i.push(new _n(w,null)),r>ar&&r--}return{lodMeshes:i,sizeLods:t,sigmas:n}}function id(e,t,n){const i=new pi(e,t,n);return i.texture.mapping=cc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function fs(e,t,n,i,r){e.viewport.set(t,n,i,r),e.scissor.set(t,n,i,r)}function dx(e,t,n){return new _i({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:hx,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:fc(),fragmentShader:`

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
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function px(e,t,n){const i=new Float32Array(Cr),r=new U(0,1,0);return new _i({name:"SphericalGaussianBlur",defines:{n:Cr,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:fc(),fragmentShader:`

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
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function rd(){return new _i({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fc(),fragmentShader:`

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
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function sd(){return new _i({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function fc(){return`

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
	`}class Mm extends pi{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},r=[i,i,i,i,i,i];this.texture=new pm(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Ca(5,5,5),s=new _i({name:"CubemapFromEquirect",uniforms:bs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:gn,blending:Ui});s.uniforms.tEquirect.value=n;const a=new _n(r,s),o=n.minFilter;return n.minFilter===Lr&&(n.minFilter=Ze),new S1(1,10,this).update(t,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,n=!0,i=!0,r=!0){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(n,i,r);t.setRenderTarget(s)}}function mx(e){let t=new WeakMap,n=new WeakMap,i=null;function r(h,m=!1){return h==null?null:m?a(h):s(h)}function s(h){if(h&&h.isTexture){const m=h.mapping;if(m===Gc||m===Hc)if(t.has(h)){const g=t.get(h).texture;return o(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const M=new Mm(g.height);return M.fromEquirectangularTexture(e,h),t.set(h,M),h.addEventListener("dispose",l),o(M.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const m=h.mapping,g=m===Gc||m===Hc,M=m===Hr||m===Ss;if(g||M){let p=n.get(h);const d=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==d)return i===null&&(i=new nd(e)),p=g?i.fromEquirectangular(h,p):i.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,n.set(h,p),p.texture;if(p!==void 0)return p.texture;{const x=h.image;return g&&x&&x.height>0||M&&x&&c(x)?(i===null&&(i=new nd(e)),p=g?i.fromEquirectangular(h):i.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,n.set(h,p),h.addEventListener("dispose",u),p.texture):null}}}return h}function o(h,m){return m===Gc?h.mapping=Hr:m===Hc&&(h.mapping=Ss),h}function c(h){let m=0;const g=6;for(let M=0;M<g;M++)h[M]!==void 0&&m++;return m===g}function l(h){const m=h.target;m.removeEventListener("dispose",l);const g=t.get(m);g!==void 0&&(t.delete(m),g.dispose())}function u(h){const m=h.target;m.removeEventListener("dispose",u);const g=n.get(m);g!==void 0&&(n.delete(m),g.dispose())}function f(){t=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function gx(e){const t={};function n(i){if(t[i]!==void 0)return t[i];const r=e.getExtension(i);return t[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&$o("WebGLRenderer: "+i+" extension not supported."),r}}}function _x(e,t,n,i){const r={},s=new WeakMap;function a(f){const h=f.target;h.index!==null&&t.remove(h.index);for(const g in h.attributes)t.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete r[h.id];const m=s.get(h);m&&(t.remove(m),s.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function o(f,h){return r[h.id]===!0||(h.addEventListener("dispose",a),r[h.id]=!0,n.memory.geometries++),h}function c(f){const h=f.attributes;for(const m in h)t.update(h[m],e.ARRAY_BUFFER)}function l(f){const h=[],m=f.index,g=f.attributes.position;let M=0;if(g===void 0)return;if(m!==null){const x=m.array;M=m.version;for(let E=0,y=x.length;E<y;E+=3){const w=x[E+0],C=x[E+1],A=x[E+2];h.push(w,C,C,A,A,w)}}else{const x=g.array;M=g.version;for(let E=0,y=x.length/3-1;E<y;E+=3){const w=E+0,C=E+1,A=E+2;h.push(w,C,C,A,A,w)}}const p=new(g.count>=65535?um:hm)(h,1);p.version=M;const d=s.get(f);d&&t.remove(d),s.set(f,p)}function u(f){const h=s.get(f);if(h){const m=f.index;m!==null&&h.version<m.version&&l(f)}else l(f);return s.get(f)}return{get:o,update:c,getWireframeAttribute:u}}function vx(e,t,n){let i;function r(h){i=h}let s,a;function o(h){s=h.type,a=h.bytesPerElement}function c(h,m){e.drawElements(i,m,s,h*a),n.update(m,i,1)}function l(h,m,g){g!==0&&(e.drawElementsInstanced(i,m,s,h*a,g),n.update(m,i,g))}function u(h,m,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,s,h,0,g);let p=0;for(let d=0;d<g;d++)p+=m[d];n.update(p,i,1)}function f(h,m,g,M){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<h.length;d++)l(h[d]/a,m[d],M[d]);else{p.multiDrawElementsInstancedWEBGL(i,m,0,s,h,0,M,0,g);let d=0;for(let x=0;x<g;x++)d+=m[x]*M[x];n.update(d,i,1)}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=f}function xx(e){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case e.TRIANGLES:n.triangles+=o*(s/3);break;case e.LINES:n.lines+=o*(s/2);break;case e.LINE_STRIP:n.lines+=o*(s-1);break;case e.LINE_LOOP:n.lines+=o*s;break;case e.POINTS:n.points+=o*s;break;default:Qt("WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:r,update:i}}function Mx(e,t,n){const i=new WeakMap,r=new De;function s(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==f){let N=function(){v.dispose(),i.delete(o),o.removeEventListener("dispose",N)};var m=N;h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,M=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let y=0;g===!0&&(y=1),M===!0&&(y=2),p===!0&&(y=3);let w=o.attributes.position.count*y,C=1;w>t.maxTextureSize&&(C=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const A=new Float32Array(w*C*4*f),v=new om(A,w,C,f);v.type=hi,v.needsUpdate=!0;const b=y*4;for(let R=0;R<f;R++){const F=d[R],V=x[R],Y=E[R],z=w*C*4*R;for(let H=0;H<F.count;H++){const O=H*b;g===!0&&(r.fromBufferAttribute(F,H),A[z+O+0]=r.x,A[z+O+1]=r.y,A[z+O+2]=r.z,A[z+O+3]=0),M===!0&&(r.fromBufferAttribute(V,H),A[z+O+4]=r.x,A[z+O+5]=r.y,A[z+O+6]=r.z,A[z+O+7]=0),p===!0&&(r.fromBufferAttribute(Y,H),A[z+O+8]=r.x,A[z+O+9]=r.y,A[z+O+10]=r.z,A[z+O+11]=Y.itemSize===4?r.w:1)}}h={count:f,texture:v,size:new ne(w,C)},i.set(o,h),o.addEventListener("dispose",N)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(e,"morphTexture",a.morphTexture,n);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const M=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(e,"morphTargetBaseInfluence",M),c.getUniforms().setValue(e,"morphTargetInfluences",l)}c.getUniforms().setValue(e,"morphTargetsTexture",h.texture,n),c.getUniforms().setValue(e,"morphTargetsTextureSize",h.size)}return{update:s}}function Sx(e,t,n,i,r){let s=new WeakMap;function a(l){const u=r.render.frame,f=l.geometry,h=t.get(l,f);if(s.get(h)!==u&&(t.update(h),s.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==u&&(n.update(l.instanceMatrix,e.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,e.ARRAY_BUFFER),s.set(l,u))),l.isSkinnedMesh){const m=l.skeleton;s.get(m)!==u&&(m.update(),s.set(m,u))}return h}function o(){s=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),n.remove(u.instanceMatrix),u.instanceColor!==null&&n.remove(u.instanceColor)}return{update:a,dispose:o}}const yx={[Xp]:"LINEAR_TONE_MAPPING",[Yp]:"REINHARD_TONE_MAPPING",[qp]:"CINEON_TONE_MAPPING",[$p]:"ACES_FILMIC_TONE_MAPPING",[Kp]:"AGX_TONE_MAPPING",[Zp]:"NEUTRAL_TONE_MAPPING",[jp]:"CUSTOM_TONE_MAPPING"};function Ex(e,t,n,i,r){const s=new pi(t,n,{type:e,depthBuffer:i,stencilBuffer:r}),a=new pi(t,n,{type:Oi,depthBuffer:!1,stencilBuffer:!1}),o=new Xe;o.setAttribute("position",new Re([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new Re([0,2,0,0,2,0],2));const c=new v1({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new _n(o,c),u=new vm(-1,1,1,-1,0,1);let f=null,h=null,m=!1,g,M=null,p=[],d=!1;this.setSize=function(x,E){s.setSize(x,E),a.setSize(x,E);for(let y=0;y<p.length;y++){const w=p[y];w.setSize&&w.setSize(x,E)}},this.setEffects=function(x){p=x,d=p.length>0&&p[0].isRenderPass===!0;const E=s.width,y=s.height;for(let w=0;w<p.length;w++){const C=p[w];C.setSize&&C.setSize(E,y)}},this.begin=function(x,E){if(m||x.toneMapping===di&&p.length===0)return!1;if(M=E,E!==null){const y=E.width,w=E.height;(s.width!==y||s.height!==w)&&this.setSize(y,w)}return d===!1&&x.setRenderTarget(s),g=x.toneMapping,x.toneMapping=di,!0},this.hasRenderPass=function(){return d},this.end=function(x,E){x.toneMapping=g,m=!0;let y=s,w=a;for(let C=0;C<p.length;C++){const A=p[C];if(A.enabled!==!1&&(A.render(x,w,y,E),A.needsSwap!==!1)){const v=y;y=w,w=v}}if(f!==x.outputColorSpace||h!==x.toneMapping){f=x.outputColorSpace,h=x.toneMapping,c.defines={},Kt.getTransfer(f)===oe&&(c.defines.SRGB_TRANSFER="");const C=yx[h];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=y.texture,x.setRenderTarget(M),x.render(l,u),M=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){s.dispose(),a.dispose(),o.dispose(),c.dispose()}}const Sm=new on,Th=new Sa(1,1),ym=new om,Em=new Y_,bm=new pm,ad=[],od=[],cd=new Float32Array(16),ld=new Float32Array(9),hd=new Float32Array(4);function Vs(e,t,n){const i=e[0];if(i<=0||i>0)return e;const r=t*n;let s=ad[r];if(s===void 0&&(s=new Float32Array(r),ad[r]=s),t!==0){i.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=n,e[a].toArray(s,o)}return s}function Ge(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function He(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function dc(e,t){let n=od[t];n===void 0&&(n=new Int32Array(t),od[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function bx(e,t){const n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Ax(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ge(n,t))return;e.uniform2fv(this.addr,t),He(n,t)}}function Tx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Ge(n,t))return;e.uniform3fv(this.addr,t),He(n,t)}}function wx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ge(n,t))return;e.uniform4fv(this.addr,t),He(n,t)}}function Rx(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Ge(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),He(n,t)}else{if(Ge(n,i))return;hd.set(i),e.uniformMatrix2fv(this.addr,!1,hd),He(n,i)}}function Cx(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Ge(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),He(n,t)}else{if(Ge(n,i))return;ld.set(i),e.uniformMatrix3fv(this.addr,!1,ld),He(n,i)}}function Px(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Ge(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),He(n,t)}else{if(Ge(n,i))return;cd.set(i),e.uniformMatrix4fv(this.addr,!1,cd),He(n,i)}}function Lx(e,t){const n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Ix(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ge(n,t))return;e.uniform2iv(this.addr,t),He(n,t)}}function Dx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ge(n,t))return;e.uniform3iv(this.addr,t),He(n,t)}}function Ux(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ge(n,t))return;e.uniform4iv(this.addr,t),He(n,t)}}function Fx(e,t){const n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Nx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ge(n,t))return;e.uniform2uiv(this.addr,t),He(n,t)}}function Ox(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ge(n,t))return;e.uniform3uiv(this.addr,t),He(n,t)}}function Bx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ge(n,t))return;e.uniform4uiv(this.addr,t),He(n,t)}}function kx(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r);let s;this.type===e.SAMPLER_2D_SHADOW?(Th.compareFunction=n.isReversedDepthBuffer()?su:ru,s=Th):s=Sm,n.setTexture2D(t||s,r)}function zx(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(t||Em,r)}function Vx(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(t||bm,r)}function Gx(e,t,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(e.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(t||ym,r)}function Hx(e){switch(e){case 5126:return bx;case 35664:return Ax;case 35665:return Tx;case 35666:return wx;case 35674:return Rx;case 35675:return Cx;case 35676:return Px;case 5124:case 35670:return Lx;case 35667:case 35671:return Ix;case 35668:case 35672:return Dx;case 35669:case 35673:return Ux;case 5125:return Fx;case 36294:return Nx;case 36295:return Ox;case 36296:return Bx;case 35678:case 36198:case 36298:case 36306:case 35682:return kx;case 35679:case 36299:case 36307:return zx;case 35680:case 36300:case 36308:case 36293:return Vx;case 36289:case 36303:case 36311:case 36292:return Gx}}function Wx(e,t){e.uniform1fv(this.addr,t)}function Xx(e,t){const n=Vs(t,this.size,2);e.uniform2fv(this.addr,n)}function Yx(e,t){const n=Vs(t,this.size,3);e.uniform3fv(this.addr,n)}function qx(e,t){const n=Vs(t,this.size,4);e.uniform4fv(this.addr,n)}function $x(e,t){const n=Vs(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function jx(e,t){const n=Vs(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Kx(e,t){const n=Vs(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Zx(e,t){e.uniform1iv(this.addr,t)}function Jx(e,t){e.uniform2iv(this.addr,t)}function Qx(e,t){e.uniform3iv(this.addr,t)}function t3(e,t){e.uniform4iv(this.addr,t)}function e3(e,t){e.uniform1uiv(this.addr,t)}function n3(e,t){e.uniform2uiv(this.addr,t)}function i3(e,t){e.uniform3uiv(this.addr,t)}function r3(e,t){e.uniform4uiv(this.addr,t)}function s3(e,t,n){const i=this.cache,r=t.length,s=dc(n,r);Ge(i,s)||(e.uniform1iv(this.addr,s),He(i,s));let a;this.type===e.SAMPLER_2D_SHADOW?a=Th:a=Sm;for(let o=0;o!==r;++o)n.setTexture2D(t[o]||a,s[o])}function a3(e,t,n){const i=this.cache,r=t.length,s=dc(n,r);Ge(i,s)||(e.uniform1iv(this.addr,s),He(i,s));for(let a=0;a!==r;++a)n.setTexture3D(t[a]||Em,s[a])}function o3(e,t,n){const i=this.cache,r=t.length,s=dc(n,r);Ge(i,s)||(e.uniform1iv(this.addr,s),He(i,s));for(let a=0;a!==r;++a)n.setTextureCube(t[a]||bm,s[a])}function c3(e,t,n){const i=this.cache,r=t.length,s=dc(n,r);Ge(i,s)||(e.uniform1iv(this.addr,s),He(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(t[a]||ym,s[a])}function l3(e){switch(e){case 5126:return Wx;case 35664:return Xx;case 35665:return Yx;case 35666:return qx;case 35674:return $x;case 35675:return jx;case 35676:return Kx;case 5124:case 35670:return Zx;case 35667:case 35671:return Jx;case 35668:case 35672:return Qx;case 35669:case 35673:return t3;case 5125:return e3;case 36294:return n3;case 36295:return i3;case 36296:return r3;case 35678:case 36198:case 36298:case 36306:case 35682:return s3;case 35679:case 36299:case 36307:return a3;case 35680:case 36300:case 36308:case 36293:return o3;case 36289:case 36303:case 36311:case 36292:return c3}}class h3{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=Hx(n.type)}}class u3{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=l3(n.type)}}class f3{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(t,n[o.id],i)}}}const Ml=/(\w+)(\])?(\[|\.)?/g;function ud(e,t){e.seq.push(t),e.map[t.id]=t}function d3(e,t,n){const i=e.name,r=i.length;for(Ml.lastIndex=0;;){const s=Ml.exec(i),a=Ml.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){ud(n,l===void 0?new h3(o,e,t):new u3(o,e,t));break}else{let f=n.map[o];f===void 0&&(f=new f3(o),ud(n,f)),n=f}}}class Do{constructor(t,n){this.seq=[],this.map={};const i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=t.getActiveUniform(n,a),c=t.getUniformLocation(n,o.name);d3(o,c,this)}const r=[],s=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(t,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(t,i,r)}setOptional(t,n,i){const r=n[i];r!==void 0&&this.setValue(t,i,r)}static upload(t,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,r)}}static seqWithValue(t,n){const i=[];for(let r=0,s=t.length;r!==s;++r){const a=t[r];a.id in n&&i.push(a)}return i}}function fd(e,t,n){const i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}const p3=37297;let m3=0;function g3(e,t){const n=e.split(`
`),i=[],r=Math.max(t-6,0),s=Math.min(t+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}const dd=new zt;function _3(e){Kt._getMatrix(dd,Kt.workingColorSpace,e);const t=`mat3( ${dd.elements.map(n=>n.toFixed(4))} )`;switch(Kt.getTransfer(e)){case Xo:return[t,"LinearTransferOETF"];case oe:return[t,"sRGBTransferOETF"];default:return Ut("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function pd(e,t,n){const i=e.getShaderParameter(t,e.COMPILE_STATUS),s=(e.getShaderInfoLog(t)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return n.toUpperCase()+`

`+s+`

`+g3(e.getShaderSource(t),o)}else return s}function v3(e,t){const n=_3(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const x3={[Xp]:"Linear",[Yp]:"Reinhard",[qp]:"Cineon",[$p]:"ACESFilmic",[Kp]:"AgX",[Zp]:"Neutral",[jp]:"Custom"};function M3(e,t){const n=x3[t];return n===void 0?(Ut("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const mo=new U;function S3(){Kt.getLuminanceCoefficients(mo);const e=mo.x.toFixed(4),t=mo.y.toFixed(4),n=mo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function y3(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fa).join(`
`)}function E3(e){const t=[];for(const n in e){const i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function b3(e,t){const n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=e.getActiveAttrib(t,r),a=s.name;let o=1;s.type===e.FLOAT_MAT2&&(o=2),s.type===e.FLOAT_MAT3&&(o=3),s.type===e.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function fa(e){return e!==""}function md(e,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function gd(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const A3=/^[ \t]*#include +<([\w\d./]+)>/gm;function wh(e){return e.replace(A3,w3)}const T3=new Map;function w3(e,t){let n=Gt[t];if(n===void 0){const i=T3.get(t);if(i!==void 0)n=Gt[i],Ut('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return wh(n)}const R3=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function _d(e){return e.replace(R3,C3)}function C3(e,t,n,i){let r="";for(let s=parseInt(t);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function vd(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}const P3={[wo]:"SHADOWMAP_TYPE_PCF",[ua]:"SHADOWMAP_TYPE_VSM"};function L3(e){return P3[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const I3={[Hr]:"ENVMAP_TYPE_CUBE",[Ss]:"ENVMAP_TYPE_CUBE",[cc]:"ENVMAP_TYPE_CUBE_UV"};function D3(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":I3[e.envMapMode]||"ENVMAP_TYPE_CUBE"}const U3={[Ss]:"ENVMAP_MODE_REFRACTION"};function F3(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":U3[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}const N3={[Wp]:"ENVMAP_BLENDING_MULTIPLY",[b_]:"ENVMAP_BLENDING_MIX",[A_]:"ENVMAP_BLENDING_ADD"};function O3(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":N3[e.combine]||"ENVMAP_BLENDING_NONE"}function B3(e){const t=e.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function k3(e,t,n,i){const r=e.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const c=L3(n),l=D3(n),u=F3(n),f=O3(n),h=B3(n),m=y3(n),g=E3(s),M=r.createProgram();let p,d,x=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(fa).join(`
`),p.length>0&&(p+=`
`),d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(fa).join(`
`),d.length>0&&(d+=`
`)):(p=[vd(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fa).join(`
`),d=[vd(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+l:"",n.envMap?"#define "+u:"",n.envMap?"#define "+f:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==di?"#define TONE_MAPPING":"",n.toneMapping!==di?Gt.tonemapping_pars_fragment:"",n.toneMapping!==di?M3("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Gt.colorspace_pars_fragment,v3("linearToOutputTexel",n.outputColorSpace),S3(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(fa).join(`
`)),a=wh(a),a=md(a,n),a=gd(a,n),o=wh(o),o=md(o,n),o=gd(o,n),a=_d(a),o=_d(o),n.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,d=["#define varying in",n.glslVersion===Rf?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Rf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const E=x+p+a,y=x+d+o,w=fd(r,r.VERTEX_SHADER,E),C=fd(r,r.FRAGMENT_SHADER,y);r.attachShader(M,w),r.attachShader(M,C),n.index0AttributeName!==void 0?r.bindAttribLocation(M,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(M,0,"position"),r.linkProgram(M);function A(R){if(e.debug.checkShaderErrors){const F=r.getProgramInfoLog(M)||"",V=r.getShaderInfoLog(w)||"",Y=r.getShaderInfoLog(C)||"",z=F.trim(),H=V.trim(),O=Y.trim();let Q=!0,K=!0;if(r.getProgramParameter(M,r.LINK_STATUS)===!1)if(Q=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(r,M,w,C);else{const lt=pd(r,w,"vertex"),gt=pd(r,C,"fragment");Qt("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(M,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+z+`
`+lt+`
`+gt)}else z!==""?Ut("WebGLProgram: Program Info Log:",z):(H===""||O==="")&&(K=!1);K&&(R.diagnostics={runnable:Q,programLog:z,vertexShader:{log:H,prefix:p},fragmentShader:{log:O,prefix:d}})}r.deleteShader(w),r.deleteShader(C),v=new Do(r,M),b=b3(r,M)}let v;this.getUniforms=function(){return v===void 0&&A(this),v};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let N=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=r.getProgramParameter(M,p3)),N},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(M),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=m3++,this.cacheKey=t,this.usedTimes=1,this.program=M,this.vertexShader=w,this.fragmentShader=C,this}let z3=0;class V3{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,i=t.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){const n=this.shaderCache;let i=n.get(t);return i===void 0&&(i=new G3(t),n.set(t,i)),i}}class G3{constructor(t){this.id=z3++,this.code=t,this.usedTimes=0}}function H3(e,t,n,i,r,s){const a=new cm,o=new V3,c=new Set,l=[],u=new Map,f=i.logarithmicDepthBuffer;let h=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return c.add(v),v===0?"uv":`uv${v}`}function M(v,b,N,R,F){const V=R.fog,Y=F.geometry,z=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?R.environment:null,H=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,O=t.get(v.envMap||z,H),Q=O&&O.mapping===cc?O.image.height:null,K=m[v.type];v.precision!==null&&(h=i.getMaxPrecision(v.precision),h!==v.precision&&Ut("WebGLProgram.getParameters:",v.precision,"not supported, using",h,"instead."));const lt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,gt=lt!==void 0?lt.length:0;let ft=0;Y.morphAttributes.position!==void 0&&(ft=1),Y.morphAttributes.normal!==void 0&&(ft=2),Y.morphAttributes.color!==void 0&&(ft=3);let Vt,_e,ge,$;if(K){const ae=li[K];Vt=ae.vertexShader,_e=ae.fragmentShader}else Vt=v.vertexShader,_e=v.fragmentShader,o.update(v),ge=o.getVertexShaderID(v),$=o.getFragmentShaderID(v);const nt=e.getRenderTarget(),st=e.state.buffers.depth.getReversed(),Bt=F.isInstancedMesh===!0,It=F.isBatchedMesh===!0,Ft=!!v.map,Ye=!!v.matcap,jt=!!O,se=!!v.aoMap,ue=!!v.lightMap,Ht=!!v.bumpMap,Pe=!!v.normalMap,P=!!v.displacementMap,Ue=!!v.emissiveMap,ie=!!v.metalnessMap,pe=!!v.roughnessMap,yt=v.anisotropy>0,T=v.clearcoat>0,_=v.dispersion>0,I=v.iridescence>0,q=v.sheen>0,j=v.transmission>0,X=yt&&!!v.anisotropyMap,_t=T&&!!v.clearcoatMap,it=T&&!!v.clearcoatNormalMap,Pt=T&&!!v.clearcoatRoughnessMap,Dt=I&&!!v.iridescenceMap,Z=I&&!!v.iridescenceThicknessMap,tt=q&&!!v.sheenColorMap,vt=q&&!!v.sheenRoughnessMap,Mt=!!v.specularMap,ht=!!v.specularColorMap,Wt=!!v.specularIntensityMap,L=j&&!!v.transmissionMap,rt=j&&!!v.thicknessMap,et=!!v.gradientMap,pt=!!v.alphaMap,J=v.alphaTest>0,W=!!v.alphaHash,xt=!!v.extensions;let Nt=di;v.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(Nt=e.toneMapping);const me={shaderID:K,shaderType:v.type,shaderName:v.name,vertexShader:Vt,fragmentShader:_e,defines:v.defines,customVertexShaderID:ge,customFragmentShaderID:$,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:h,batching:It,batchingColor:It&&F._colorsTexture!==null,instancing:Bt,instancingColor:Bt&&F.instanceColor!==null,instancingMorph:Bt&&F.morphTexture!==null,outputColorSpace:nt===null?e.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:Es,alphaToCoverage:!!v.alphaToCoverage,map:Ft,matcap:Ye,envMap:jt,envMapMode:jt&&O.mapping,envMapCubeUVHeight:Q,aoMap:se,lightMap:ue,bumpMap:Ht,normalMap:Pe,displacementMap:P,emissiveMap:Ue,normalMapObjectSpace:Pe&&v.normalMapType===C_,normalMapTangentSpace:Pe&&v.normalMapType===R_,metalnessMap:ie,roughnessMap:pe,anisotropy:yt,anisotropyMap:X,clearcoat:T,clearcoatMap:_t,clearcoatNormalMap:it,clearcoatRoughnessMap:Pt,dispersion:_,iridescence:I,iridescenceMap:Dt,iridescenceThicknessMap:Z,sheen:q,sheenColorMap:tt,sheenRoughnessMap:vt,specularMap:Mt,specularColorMap:ht,specularIntensityMap:Wt,transmission:j,transmissionMap:L,thicknessMap:rt,gradientMap:et,opaque:v.transparent===!1&&v.blending===gs&&v.alphaToCoverage===!1,alphaMap:pt,alphaTest:J,alphaHash:W,combine:v.combine,mapUv:Ft&&g(v.map.channel),aoMapUv:se&&g(v.aoMap.channel),lightMapUv:ue&&g(v.lightMap.channel),bumpMapUv:Ht&&g(v.bumpMap.channel),normalMapUv:Pe&&g(v.normalMap.channel),displacementMapUv:P&&g(v.displacementMap.channel),emissiveMapUv:Ue&&g(v.emissiveMap.channel),metalnessMapUv:ie&&g(v.metalnessMap.channel),roughnessMapUv:pe&&g(v.roughnessMap.channel),anisotropyMapUv:X&&g(v.anisotropyMap.channel),clearcoatMapUv:_t&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:it&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pt&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Dt&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:tt&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:vt&&g(v.sheenRoughnessMap.channel),specularMapUv:Mt&&g(v.specularMap.channel),specularColorMapUv:ht&&g(v.specularColorMap.channel),specularIntensityMapUv:Wt&&g(v.specularIntensityMap.channel),transmissionMapUv:L&&g(v.transmissionMap.channel),thicknessMapUv:rt&&g(v.thicknessMap.channel),alphaMapUv:pt&&g(v.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Pe||yt),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!Y.attributes.uv&&(Ft||pt),fog:!!V,useFog:v.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||Y.attributes.normal===void 0&&Pe===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:st,skinning:F.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:gt,morphTextureStride:ft,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:e.shadowMap.enabled&&N.length>0,shadowMapType:e.shadowMap.type,toneMapping:Nt,decodeVideoTexture:Ft&&v.map.isVideoTexture===!0&&Kt.getTransfer(v.map.colorSpace)===oe,decodeVideoTextureEmissive:Ue&&v.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(v.emissiveMap.colorSpace)===oe,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Li,flipSided:v.side===gn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:xt&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xt&&v.extensions.multiDraw===!0||It)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return me.vertexUv1s=c.has(1),me.vertexUv2s=c.has(2),me.vertexUv3s=c.has(3),c.clear(),me}function p(v){const b=[];if(v.shaderID?b.push(v.shaderID):(b.push(v.customVertexShaderID),b.push(v.customFragmentShaderID)),v.defines!==void 0)for(const N in v.defines)b.push(N),b.push(v.defines[N]);return v.isRawShaderMaterial===!1&&(d(b,v),x(b,v),b.push(e.outputColorSpace)),b.push(v.customProgramCacheKey),b.join()}function d(v,b){v.push(b.precision),v.push(b.outputColorSpace),v.push(b.envMapMode),v.push(b.envMapCubeUVHeight),v.push(b.mapUv),v.push(b.alphaMapUv),v.push(b.lightMapUv),v.push(b.aoMapUv),v.push(b.bumpMapUv),v.push(b.normalMapUv),v.push(b.displacementMapUv),v.push(b.emissiveMapUv),v.push(b.metalnessMapUv),v.push(b.roughnessMapUv),v.push(b.anisotropyMapUv),v.push(b.clearcoatMapUv),v.push(b.clearcoatNormalMapUv),v.push(b.clearcoatRoughnessMapUv),v.push(b.iridescenceMapUv),v.push(b.iridescenceThicknessMapUv),v.push(b.sheenColorMapUv),v.push(b.sheenRoughnessMapUv),v.push(b.specularMapUv),v.push(b.specularColorMapUv),v.push(b.specularIntensityMapUv),v.push(b.transmissionMapUv),v.push(b.thicknessMapUv),v.push(b.combine),v.push(b.fogExp2),v.push(b.sizeAttenuation),v.push(b.morphTargetsCount),v.push(b.morphAttributeCount),v.push(b.numDirLights),v.push(b.numPointLights),v.push(b.numSpotLights),v.push(b.numSpotLightMaps),v.push(b.numHemiLights),v.push(b.numRectAreaLights),v.push(b.numDirLightShadows),v.push(b.numPointLightShadows),v.push(b.numSpotLightShadows),v.push(b.numSpotLightShadowsWithMaps),v.push(b.numLightProbes),v.push(b.shadowMapType),v.push(b.toneMapping),v.push(b.numClippingPlanes),v.push(b.numClipIntersection),v.push(b.depthPacking)}function x(v,b){a.disableAll(),b.instancing&&a.enable(0),b.instancingColor&&a.enable(1),b.instancingMorph&&a.enable(2),b.matcap&&a.enable(3),b.envMap&&a.enable(4),b.normalMapObjectSpace&&a.enable(5),b.normalMapTangentSpace&&a.enable(6),b.clearcoat&&a.enable(7),b.iridescence&&a.enable(8),b.alphaTest&&a.enable(9),b.vertexColors&&a.enable(10),b.vertexAlphas&&a.enable(11),b.vertexUv1s&&a.enable(12),b.vertexUv2s&&a.enable(13),b.vertexUv3s&&a.enable(14),b.vertexTangents&&a.enable(15),b.anisotropy&&a.enable(16),b.alphaHash&&a.enable(17),b.batching&&a.enable(18),b.dispersion&&a.enable(19),b.batchingColor&&a.enable(20),b.gradientMap&&a.enable(21),v.push(a.mask),a.disableAll(),b.fog&&a.enable(0),b.useFog&&a.enable(1),b.flatShading&&a.enable(2),b.logarithmicDepthBuffer&&a.enable(3),b.reversedDepthBuffer&&a.enable(4),b.skinning&&a.enable(5),b.morphTargets&&a.enable(6),b.morphNormals&&a.enable(7),b.morphColors&&a.enable(8),b.premultipliedAlpha&&a.enable(9),b.shadowMapEnabled&&a.enable(10),b.doubleSided&&a.enable(11),b.flipSided&&a.enable(12),b.useDepthPacking&&a.enable(13),b.dithering&&a.enable(14),b.transmission&&a.enable(15),b.sheen&&a.enable(16),b.opaque&&a.enable(17),b.pointsUvs&&a.enable(18),b.decodeVideoTexture&&a.enable(19),b.decodeVideoTextureEmissive&&a.enable(20),b.alphaToCoverage&&a.enable(21),v.push(a.mask)}function E(v){const b=m[v.type];let N;if(b){const R=li[b];N=m1.clone(R.uniforms)}else N=v.uniforms;return N}function y(v,b){let N=u.get(b);return N!==void 0?++N.usedTimes:(N=new k3(e,b,v,r),l.push(N),u.set(b,N)),N}function w(v){if(--v.usedTimes===0){const b=l.indexOf(v);l[b]=l[l.length-1],l.pop(),u.delete(v.cacheKey),v.destroy()}}function C(v){o.remove(v)}function A(){o.dispose()}return{getParameters:M,getProgramCacheKey:p,getUniforms:E,acquireProgram:y,releaseProgram:w,releaseShaderCache:C,programs:l,dispose:A}}function W3(){let e=new WeakMap;function t(a){return e.has(a)}function n(a){let o=e.get(a);return o===void 0&&(o={},e.set(a,o)),o}function i(a){e.delete(a)}function r(a,o,c){e.get(a)[o]=c}function s(){e=new WeakMap}return{has:t,get:n,remove:i,update:r,dispose:s}}function X3(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function xd(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function Md(){const e=[];let t=0;const n=[],i=[],r=[];function s(){t=0,n.length=0,i.length=0,r.length=0}function a(h){let m=0;return h.isInstancedMesh&&(m+=2),h.isSkinnedMesh&&(m+=1),m}function o(h,m,g,M,p,d){let x=e[t];return x===void 0?(x={id:h.id,object:h,geometry:m,material:g,materialVariant:a(h),groupOrder:M,renderOrder:h.renderOrder,z:p,group:d},e[t]=x):(x.id=h.id,x.object=h,x.geometry=m,x.material=g,x.materialVariant=a(h),x.groupOrder=M,x.renderOrder=h.renderOrder,x.z=p,x.group=d),t++,x}function c(h,m,g,M,p,d){const x=o(h,m,g,M,p,d);g.transmission>0?i.push(x):g.transparent===!0?r.push(x):n.push(x)}function l(h,m,g,M,p,d){const x=o(h,m,g,M,p,d);g.transmission>0?i.unshift(x):g.transparent===!0?r.unshift(x):n.unshift(x)}function u(h,m){n.length>1&&n.sort(h||X3),i.length>1&&i.sort(m||xd),r.length>1&&r.sort(m||xd)}function f(){for(let h=t,m=e.length;h<m;h++){const g=e[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:f,sort:u}}function Y3(){let e=new WeakMap;function t(i,r){const s=e.get(i);let a;return s===void 0?(a=new Md,e.set(i,[a])):r>=s.length?(a=new Md,s.push(a)):a=s[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}function q3(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new U,color:new re};break;case"SpotLight":n={position:new U,direction:new U,color:new re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new U,color:new re,distance:0,decay:0};break;case"HemisphereLight":n={direction:new U,skyColor:new re,groundColor:new re};break;case"RectAreaLight":n={color:new re,position:new U,halfWidth:new U,halfHeight:new U};break}return e[t.id]=n,n}}}function $3(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}let j3=0;function K3(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function Z3(e){const t=new q3,n=$3(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new U);const r=new U,s=new we,a=new we;function o(l){let u=0,f=0,h=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let m=0,g=0,M=0,p=0,d=0,x=0,E=0,y=0,w=0,C=0,A=0;l.sort(K3);for(let b=0,N=l.length;b<N;b++){const R=l[b],F=R.color,V=R.intensity,Y=R.distance;let z=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===ys?z=R.shadow.map.texture:z=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)u+=F.r*V,f+=F.g*V,h+=F.b*V;else if(R.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(R.sh.coefficients[H],V);A++}else if(R.isDirectionalLight){const H=t.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const O=R.shadow,Q=n.get(R);Q.shadowIntensity=O.intensity,Q.shadowBias=O.bias,Q.shadowNormalBias=O.normalBias,Q.shadowRadius=O.radius,Q.shadowMapSize=O.mapSize,i.directionalShadow[m]=Q,i.directionalShadowMap[m]=z,i.directionalShadowMatrix[m]=R.shadow.matrix,x++}i.directional[m]=H,m++}else if(R.isSpotLight){const H=t.get(R);H.position.setFromMatrixPosition(R.matrixWorld),H.color.copy(F).multiplyScalar(V),H.distance=Y,H.coneCos=Math.cos(R.angle),H.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),H.decay=R.decay,i.spot[M]=H;const O=R.shadow;if(R.map&&(i.spotLightMap[w]=R.map,w++,O.updateMatrices(R),R.castShadow&&C++),i.spotLightMatrix[M]=O.matrix,R.castShadow){const Q=n.get(R);Q.shadowIntensity=O.intensity,Q.shadowBias=O.bias,Q.shadowNormalBias=O.normalBias,Q.shadowRadius=O.radius,Q.shadowMapSize=O.mapSize,i.spotShadow[M]=Q,i.spotShadowMap[M]=z,y++}M++}else if(R.isRectAreaLight){const H=t.get(R);H.color.copy(F).multiplyScalar(V),H.halfWidth.set(R.width*.5,0,0),H.halfHeight.set(0,R.height*.5,0),i.rectArea[p]=H,p++}else if(R.isPointLight){const H=t.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),H.distance=R.distance,H.decay=R.decay,R.castShadow){const O=R.shadow,Q=n.get(R);Q.shadowIntensity=O.intensity,Q.shadowBias=O.bias,Q.shadowNormalBias=O.normalBias,Q.shadowRadius=O.radius,Q.shadowMapSize=O.mapSize,Q.shadowCameraNear=O.camera.near,Q.shadowCameraFar=O.camera.far,i.pointShadow[g]=Q,i.pointShadowMap[g]=z,i.pointShadowMatrix[g]=R.shadow.matrix,E++}i.point[g]=H,g++}else if(R.isHemisphereLight){const H=t.get(R);H.skyColor.copy(R.color).multiplyScalar(V),H.groundColor.copy(R.groundColor).multiplyScalar(V),i.hemi[d]=H,d++}}p>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=at.LTC_FLOAT_1,i.rectAreaLTC2=at.LTC_FLOAT_2):(i.rectAreaLTC1=at.LTC_HALF_1,i.rectAreaLTC2=at.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=h;const v=i.hash;(v.directionalLength!==m||v.pointLength!==g||v.spotLength!==M||v.rectAreaLength!==p||v.hemiLength!==d||v.numDirectionalShadows!==x||v.numPointShadows!==E||v.numSpotShadows!==y||v.numSpotMaps!==w||v.numLightProbes!==A)&&(i.directional.length=m,i.spot.length=M,i.rectArea.length=p,i.point.length=g,i.hemi.length=d,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=E,i.pointShadowMap.length=E,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=E,i.spotLightMatrix.length=y+w-C,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=A,v.directionalLength=m,v.pointLength=g,v.spotLength=M,v.rectAreaLength=p,v.hemiLength=d,v.numDirectionalShadows=x,v.numPointShadows=E,v.numSpotShadows=y,v.numSpotMaps=w,v.numLightProbes=A,i.version=j3++)}function c(l,u){let f=0,h=0,m=0,g=0,M=0;const p=u.matrixWorldInverse;for(let d=0,x=l.length;d<x;d++){const E=l[d];if(E.isDirectionalLight){const y=i.directional[f];y.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(p),f++}else if(E.isSpotLight){const y=i.spot[m];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(E.matrixWorld),r.setFromMatrixPosition(E.target.matrixWorld),y.direction.sub(r),y.direction.transformDirection(p),m++}else if(E.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(p),a.identity(),s.copy(E.matrixWorld),s.premultiply(p),a.extractRotation(s),y.halfWidth.set(E.width*.5,0,0),y.halfHeight.set(0,E.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(E.isPointLight){const y=i.point[h];y.position.setFromMatrixPosition(E.matrixWorld),y.position.applyMatrix4(p),h++}else if(E.isHemisphereLight){const y=i.hemi[M];y.direction.setFromMatrixPosition(E.matrixWorld),y.direction.transformDirection(p),M++}}}return{setup:o,setupView:c,state:i}}function Sd(e){const t=new Z3(e),n=[],i=[];function r(u){l.camera=u,n.length=0,i.length=0}function s(u){n.push(u)}function a(u){i.push(u)}function o(){t.setup(n)}function c(u){t.setupView(n,u)}const l={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function J3(e){let t=new WeakMap;function n(r,s=0){const a=t.get(r);let o;return a===void 0?(o=new Sd(e),t.set(r,[o])):s>=a.length?(o=new Sd(e),a.push(o)):o=a[s],o}function i(){t=new WeakMap}return{get:n,dispose:i}}const Q3=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,tM=`uniform sampler2D shadow_pass;
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
}`,eM=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],nM=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],yd=new we,ca=new U,Sl=new U;function iM(e,t,n){let i=new fm;const r=new ne,s=new ne,a=new De,o=new x1,c=new M1,l={},u=n.maxTextureSize,f={[lr]:gn,[gn]:lr,[Li]:Li},h=new _i({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ne},radius:{value:4}},vertexShader:Q3,fragmentShader:tM}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const g=new Xe;g.setAttribute("position",new cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const M=new _n(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=wo;let d=this.type;this.render=function(C,A,v){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||C.length===0)return;this.type===s_&&(Ut("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=wo);const b=e.getRenderTarget(),N=e.getActiveCubeFace(),R=e.getActiveMipmapLevel(),F=e.state;F.setBlending(Ui),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const V=d!==this.type;V&&A.traverse(function(Y){Y.material&&(Array.isArray(Y.material)?Y.material.forEach(z=>z.needsUpdate=!0):Y.material.needsUpdate=!0)});for(let Y=0,z=C.length;Y<z;Y++){const H=C[Y],O=H.shadow;if(O===void 0){Ut("WebGLShadowMap:",H,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;r.copy(O.mapSize);const Q=O.getFrameExtents();r.multiply(Q),s.copy(O.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(s.x=Math.floor(u/Q.x),r.x=s.x*Q.x,O.mapSize.x=s.x),r.y>u&&(s.y=Math.floor(u/Q.y),r.y=s.y*Q.y,O.mapSize.y=s.y));const K=e.state.buffers.depth.getReversed();if(O.camera._reversedDepth=K,O.map===null||V===!0){if(O.map!==null&&(O.map.depthTexture!==null&&(O.map.depthTexture.dispose(),O.map.depthTexture=null),O.map.dispose()),this.type===ua){if(H.isPointLight){Ut("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}O.map=new pi(r.x,r.y,{format:ys,type:Oi,minFilter:Ze,magFilter:Ze,generateMipmaps:!1}),O.map.texture.name=H.name+".shadowMap",O.map.depthTexture=new Sa(r.x,r.y,hi),O.map.depthTexture.name=H.name+".shadowMapDepth",O.map.depthTexture.format=Bi,O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Qe,O.map.depthTexture.magFilter=Qe}else H.isPointLight?(O.map=new Mm(r.x),O.map.depthTexture=new f1(r.x,gi)):(O.map=new pi(r.x,r.y),O.map.depthTexture=new Sa(r.x,r.y,gi)),O.map.depthTexture.name=H.name+".shadowMap",O.map.depthTexture.format=Bi,this.type===wo?(O.map.depthTexture.compareFunction=K?su:ru,O.map.depthTexture.minFilter=Ze,O.map.depthTexture.magFilter=Ze):(O.map.depthTexture.compareFunction=null,O.map.depthTexture.minFilter=Qe,O.map.depthTexture.magFilter=Qe);O.camera.updateProjectionMatrix()}const lt=O.map.isWebGLCubeRenderTarget?6:1;for(let gt=0;gt<lt;gt++){if(O.map.isWebGLCubeRenderTarget)e.setRenderTarget(O.map,gt),e.clear();else{gt===0&&(e.setRenderTarget(O.map),e.clear());const ft=O.getViewport(gt);a.set(s.x*ft.x,s.y*ft.y,s.x*ft.z,s.y*ft.w),F.viewport(a)}if(H.isPointLight){const ft=O.camera,Vt=O.matrix,_e=H.distance||ft.far;_e!==ft.far&&(ft.far=_e,ft.updateProjectionMatrix()),ca.setFromMatrixPosition(H.matrixWorld),ft.position.copy(ca),Sl.copy(ft.position),Sl.add(eM[gt]),ft.up.copy(nM[gt]),ft.lookAt(Sl),ft.updateMatrixWorld(),Vt.makeTranslation(-ca.x,-ca.y,-ca.z),yd.multiplyMatrices(ft.projectionMatrix,ft.matrixWorldInverse),O._frustum.setFromProjectionMatrix(yd,ft.coordinateSystem,ft.reversedDepth)}else O.updateMatrices(H);i=O.getFrustum(),y(A,v,O.camera,H,this.type)}O.isPointLightShadow!==!0&&this.type===ua&&x(O,v),O.needsUpdate=!1}d=this.type,p.needsUpdate=!1,e.setRenderTarget(b,N,R)};function x(C,A){const v=t.update(M);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,m.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new pi(r.x,r.y,{format:ys,type:Oi})),h.uniforms.shadow_pass.value=C.map.depthTexture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,e.setRenderTarget(C.mapPass),e.clear(),e.renderBufferDirect(A,null,v,h,M,null),m.uniforms.shadow_pass.value=C.mapPass.texture,m.uniforms.resolution.value=C.mapSize,m.uniforms.radius.value=C.radius,e.setRenderTarget(C.map),e.clear(),e.renderBufferDirect(A,null,v,m,M,null)}function E(C,A,v,b){let N=null;const R=v.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(R!==void 0)N=R;else if(N=v.isPointLight===!0?c:o,e.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const F=N.uuid,V=A.uuid;let Y=l[F];Y===void 0&&(Y={},l[F]=Y);let z=Y[V];z===void 0&&(z=N.clone(),Y[V]=z,A.addEventListener("dispose",w)),N=z}if(N.visible=A.visible,N.wireframe=A.wireframe,b===ua?N.side=A.shadowSide!==null?A.shadowSide:A.side:N.side=A.shadowSide!==null?A.shadowSide:f[A.side],N.alphaMap=A.alphaMap,N.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,N.map=A.map,N.clipShadows=A.clipShadows,N.clippingPlanes=A.clippingPlanes,N.clipIntersection=A.clipIntersection,N.displacementMap=A.displacementMap,N.displacementScale=A.displacementScale,N.displacementBias=A.displacementBias,N.wireframeLinewidth=A.wireframeLinewidth,N.linewidth=A.linewidth,v.isPointLight===!0&&N.isMeshDistanceMaterial===!0){const F=e.properties.get(N);F.light=v}return N}function y(C,A,v,b,N){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&N===ua)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,C.matrixWorld);const V=t.update(C),Y=C.material;if(Array.isArray(Y)){const z=V.groups;for(let H=0,O=z.length;H<O;H++){const Q=z[H],K=Y[Q.materialIndex];if(K&&K.visible){const lt=E(C,K,b,N);C.onBeforeShadow(e,C,A,v,V,lt,Q),e.renderBufferDirect(v,null,V,lt,C,Q),C.onAfterShadow(e,C,A,v,V,lt,Q)}}}else if(Y.visible){const z=E(C,Y,b,N);C.onBeforeShadow(e,C,A,v,V,z,null),e.renderBufferDirect(v,null,V,z,C,null),C.onAfterShadow(e,C,A,v,V,z,null)}}const F=C.children;for(let V=0,Y=F.length;V<Y;V++)y(F[V],A,v,b,N)}function w(C){C.target.removeEventListener("dispose",w);for(const v in l){const b=l[v],N=C.target.uuid;N in b&&(b[N].dispose(),delete b[N])}}}function rM(e,t){function n(){let L=!1;const rt=new De;let et=null;const pt=new De(0,0,0,0);return{setMask:function(J){et!==J&&!L&&(e.colorMask(J,J,J,J),et=J)},setLocked:function(J){L=J},setClear:function(J,W,xt,Nt,me){me===!0&&(J*=Nt,W*=Nt,xt*=Nt),rt.set(J,W,xt,Nt),pt.equals(rt)===!1&&(e.clearColor(J,W,xt,Nt),pt.copy(rt))},reset:function(){L=!1,et=null,pt.set(-1,0,0,0)}}}function i(){let L=!1,rt=!1,et=null,pt=null,J=null;return{setReversed:function(W){if(rt!==W){const xt=t.get("EXT_clip_control");W?xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.ZERO_TO_ONE_EXT):xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.NEGATIVE_ONE_TO_ONE_EXT),rt=W;const Nt=J;J=null,this.setClear(Nt)}},getReversed:function(){return rt},setTest:function(W){W?nt(e.DEPTH_TEST):st(e.DEPTH_TEST)},setMask:function(W){et!==W&&!L&&(e.depthMask(W),et=W)},setFunc:function(W){if(rt&&(W=k_[W]),pt!==W){switch(W){case Ol:e.depthFunc(e.NEVER);break;case Bl:e.depthFunc(e.ALWAYS);break;case kl:e.depthFunc(e.LESS);break;case Ms:e.depthFunc(e.LEQUAL);break;case zl:e.depthFunc(e.EQUAL);break;case Vl:e.depthFunc(e.GEQUAL);break;case Gl:e.depthFunc(e.GREATER);break;case Hl:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}pt=W}},setLocked:function(W){L=W},setClear:function(W){J!==W&&(J=W,rt&&(W=1-W),e.clearDepth(W))},reset:function(){L=!1,et=null,pt=null,J=null,rt=!1}}}function r(){let L=!1,rt=null,et=null,pt=null,J=null,W=null,xt=null,Nt=null,me=null;return{setTest:function(ae){L||(ae?nt(e.STENCIL_TEST):st(e.STENCIL_TEST))},setMask:function(ae){rt!==ae&&!L&&(e.stencilMask(ae),rt=ae)},setFunc:function(ae,bi,Ai){(et!==ae||pt!==bi||J!==Ai)&&(e.stencilFunc(ae,bi,Ai),et=ae,pt=bi,J=Ai)},setOp:function(ae,bi,Ai){(W!==ae||xt!==bi||Nt!==Ai)&&(e.stencilOp(ae,bi,Ai),W=ae,xt=bi,Nt=Ai)},setLocked:function(ae){L=ae},setClear:function(ae){me!==ae&&(e.clearStencil(ae),me=ae)},reset:function(){L=!1,rt=null,et=null,pt=null,J=null,W=null,xt=null,Nt=null,me=null}}}const s=new n,a=new i,o=new r,c=new WeakMap,l=new WeakMap;let u={},f={},h=new WeakMap,m=[],g=null,M=!1,p=null,d=null,x=null,E=null,y=null,w=null,C=null,A=new re(0,0,0),v=0,b=!1,N=null,R=null,F=null,V=null,Y=null;const z=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,O=0;const Q=e.getParameter(e.VERSION);Q.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(Q)[1]),H=O>=1):Q.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),H=O>=2);let K=null,lt={};const gt=e.getParameter(e.SCISSOR_BOX),ft=e.getParameter(e.VIEWPORT),Vt=new De().fromArray(gt),_e=new De().fromArray(ft);function ge(L,rt,et,pt){const J=new Uint8Array(4),W=e.createTexture();e.bindTexture(L,W),e.texParameteri(L,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(L,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let xt=0;xt<et;xt++)L===e.TEXTURE_3D||L===e.TEXTURE_2D_ARRAY?e.texImage3D(rt,0,e.RGBA,1,1,pt,0,e.RGBA,e.UNSIGNED_BYTE,J):e.texImage2D(rt+xt,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,J);return W}const $={};$[e.TEXTURE_2D]=ge(e.TEXTURE_2D,e.TEXTURE_2D,1),$[e.TEXTURE_CUBE_MAP]=ge(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[e.TEXTURE_2D_ARRAY]=ge(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),$[e.TEXTURE_3D]=ge(e.TEXTURE_3D,e.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),nt(e.DEPTH_TEST),a.setFunc(Ms),Ht(!1),Pe(Ef),nt(e.CULL_FACE),se(Ui);function nt(L){u[L]!==!0&&(e.enable(L),u[L]=!0)}function st(L){u[L]!==!1&&(e.disable(L),u[L]=!1)}function Bt(L,rt){return f[L]!==rt?(e.bindFramebuffer(L,rt),f[L]=rt,L===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=rt),L===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=rt),!0):!1}function It(L,rt){let et=m,pt=!1;if(L){et=h.get(rt),et===void 0&&(et=[],h.set(rt,et));const J=L.textures;if(et.length!==J.length||et[0]!==e.COLOR_ATTACHMENT0){for(let W=0,xt=J.length;W<xt;W++)et[W]=e.COLOR_ATTACHMENT0+W;et.length=J.length,pt=!0}}else et[0]!==e.BACK&&(et[0]=e.BACK,pt=!0);pt&&e.drawBuffers(et)}function Ft(L){return g!==L?(e.useProgram(L),g=L,!0):!1}const Ye={[Rr]:e.FUNC_ADD,[o_]:e.FUNC_SUBTRACT,[c_]:e.FUNC_REVERSE_SUBTRACT};Ye[l_]=e.MIN,Ye[h_]=e.MAX;const jt={[u_]:e.ZERO,[f_]:e.ONE,[d_]:e.SRC_COLOR,[Fl]:e.SRC_ALPHA,[x_]:e.SRC_ALPHA_SATURATE,[__]:e.DST_COLOR,[m_]:e.DST_ALPHA,[p_]:e.ONE_MINUS_SRC_COLOR,[Nl]:e.ONE_MINUS_SRC_ALPHA,[v_]:e.ONE_MINUS_DST_COLOR,[g_]:e.ONE_MINUS_DST_ALPHA,[M_]:e.CONSTANT_COLOR,[S_]:e.ONE_MINUS_CONSTANT_COLOR,[y_]:e.CONSTANT_ALPHA,[E_]:e.ONE_MINUS_CONSTANT_ALPHA};function se(L,rt,et,pt,J,W,xt,Nt,me,ae){if(L===Ui){M===!0&&(st(e.BLEND),M=!1);return}if(M===!1&&(nt(e.BLEND),M=!0),L!==a_){if(L!==p||ae!==b){if((d!==Rr||y!==Rr)&&(e.blendEquation(e.FUNC_ADD),d=Rr,y=Rr),ae)switch(L){case gs:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Gn:e.blendFunc(e.ONE,e.ONE);break;case bf:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case Af:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Qt("WebGLState: Invalid blending: ",L);break}else switch(L){case gs:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case Gn:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case bf:Qt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Af:Qt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qt("WebGLState: Invalid blending: ",L);break}x=null,E=null,w=null,C=null,A.set(0,0,0),v=0,p=L,b=ae}return}J=J||rt,W=W||et,xt=xt||pt,(rt!==d||J!==y)&&(e.blendEquationSeparate(Ye[rt],Ye[J]),d=rt,y=J),(et!==x||pt!==E||W!==w||xt!==C)&&(e.blendFuncSeparate(jt[et],jt[pt],jt[W],jt[xt]),x=et,E=pt,w=W,C=xt),(Nt.equals(A)===!1||me!==v)&&(e.blendColor(Nt.r,Nt.g,Nt.b,me),A.copy(Nt),v=me),p=L,b=!1}function ue(L,rt){L.side===Li?st(e.CULL_FACE):nt(e.CULL_FACE);let et=L.side===gn;rt&&(et=!et),Ht(et),L.blending===gs&&L.transparent===!1?se(Ui):se(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),s.setMask(L.colorWrite);const pt=L.stencilWrite;o.setTest(pt),pt&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Ue(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?nt(e.SAMPLE_ALPHA_TO_COVERAGE):st(e.SAMPLE_ALPHA_TO_COVERAGE)}function Ht(L){N!==L&&(L?e.frontFace(e.CW):e.frontFace(e.CCW),N=L)}function Pe(L){L!==i_?(nt(e.CULL_FACE),L!==R&&(L===Ef?e.cullFace(e.BACK):L===r_?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):st(e.CULL_FACE),R=L}function P(L){L!==F&&(H&&e.lineWidth(L),F=L)}function Ue(L,rt,et){L?(nt(e.POLYGON_OFFSET_FILL),(V!==rt||Y!==et)&&(V=rt,Y=et,a.getReversed()&&(rt=-rt),e.polygonOffset(rt,et))):st(e.POLYGON_OFFSET_FILL)}function ie(L){L?nt(e.SCISSOR_TEST):st(e.SCISSOR_TEST)}function pe(L){L===void 0&&(L=e.TEXTURE0+z-1),K!==L&&(e.activeTexture(L),K=L)}function yt(L,rt,et){et===void 0&&(K===null?et=e.TEXTURE0+z-1:et=K);let pt=lt[et];pt===void 0&&(pt={type:void 0,texture:void 0},lt[et]=pt),(pt.type!==L||pt.texture!==rt)&&(K!==et&&(e.activeTexture(et),K=et),e.bindTexture(L,rt||$[L]),pt.type=L,pt.texture=rt)}function T(){const L=lt[K];L!==void 0&&L.type!==void 0&&(e.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function _(){try{e.compressedTexImage2D(...arguments)}catch(L){Qt("WebGLState:",L)}}function I(){try{e.compressedTexImage3D(...arguments)}catch(L){Qt("WebGLState:",L)}}function q(){try{e.texSubImage2D(...arguments)}catch(L){Qt("WebGLState:",L)}}function j(){try{e.texSubImage3D(...arguments)}catch(L){Qt("WebGLState:",L)}}function X(){try{e.compressedTexSubImage2D(...arguments)}catch(L){Qt("WebGLState:",L)}}function _t(){try{e.compressedTexSubImage3D(...arguments)}catch(L){Qt("WebGLState:",L)}}function it(){try{e.texStorage2D(...arguments)}catch(L){Qt("WebGLState:",L)}}function Pt(){try{e.texStorage3D(...arguments)}catch(L){Qt("WebGLState:",L)}}function Dt(){try{e.texImage2D(...arguments)}catch(L){Qt("WebGLState:",L)}}function Z(){try{e.texImage3D(...arguments)}catch(L){Qt("WebGLState:",L)}}function tt(L){Vt.equals(L)===!1&&(e.scissor(L.x,L.y,L.z,L.w),Vt.copy(L))}function vt(L){_e.equals(L)===!1&&(e.viewport(L.x,L.y,L.z,L.w),_e.copy(L))}function Mt(L,rt){let et=l.get(rt);et===void 0&&(et=new WeakMap,l.set(rt,et));let pt=et.get(L);pt===void 0&&(pt=e.getUniformBlockIndex(rt,L.name),et.set(L,pt))}function ht(L,rt){const pt=l.get(rt).get(L);c.get(rt)!==pt&&(e.uniformBlockBinding(rt,pt,L.__bindingPointIndex),c.set(rt,pt))}function Wt(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),a.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),u={},K=null,lt={},f={},h=new WeakMap,m=[],g=null,M=!1,p=null,d=null,x=null,E=null,y=null,w=null,C=null,A=new re(0,0,0),v=0,b=!1,N=null,R=null,F=null,V=null,Y=null,Vt.set(0,0,e.canvas.width,e.canvas.height),_e.set(0,0,e.canvas.width,e.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:nt,disable:st,bindFramebuffer:Bt,drawBuffers:It,useProgram:Ft,setBlending:se,setMaterial:ue,setFlipSided:Ht,setCullFace:Pe,setLineWidth:P,setPolygonOffset:Ue,setScissorTest:ie,activeTexture:pe,bindTexture:yt,unbindTexture:T,compressedTexImage2D:_,compressedTexImage3D:I,texImage2D:Dt,texImage3D:Z,updateUBOMapping:Mt,uniformBlockBinding:ht,texStorage2D:it,texStorage3D:Pt,texSubImage2D:q,texSubImage3D:j,compressedTexSubImage2D:X,compressedTexSubImage3D:_t,scissor:tt,viewport:vt,reset:Wt}}function sM(e,t,n,i,r,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ne,u=new WeakMap;let f;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,_){return m?new OffscreenCanvas(T,_):qo("canvas")}function M(T,_,I){let q=1;const j=yt(T);if((j.width>I||j.height>I)&&(q=I/Math.max(j.width,j.height)),q<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const X=Math.floor(q*j.width),_t=Math.floor(q*j.height);f===void 0&&(f=g(X,_t));const it=_?g(X,_t):f;return it.width=X,it.height=_t,it.getContext("2d").drawImage(T,0,0,X,_t),Ut("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+X+"x"+_t+")."),it}else return"data"in T&&Ut("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),T;return T}function p(T){return T.generateMipmaps}function d(T){e.generateMipmap(T)}function x(T){return T.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?e.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function E(T,_,I,q,j=!1){if(T!==null){if(e[T]!==void 0)return e[T];Ut("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let X=_;if(_===e.RED&&(I===e.FLOAT&&(X=e.R32F),I===e.HALF_FLOAT&&(X=e.R16F),I===e.UNSIGNED_BYTE&&(X=e.R8)),_===e.RED_INTEGER&&(I===e.UNSIGNED_BYTE&&(X=e.R8UI),I===e.UNSIGNED_SHORT&&(X=e.R16UI),I===e.UNSIGNED_INT&&(X=e.R32UI),I===e.BYTE&&(X=e.R8I),I===e.SHORT&&(X=e.R16I),I===e.INT&&(X=e.R32I)),_===e.RG&&(I===e.FLOAT&&(X=e.RG32F),I===e.HALF_FLOAT&&(X=e.RG16F),I===e.UNSIGNED_BYTE&&(X=e.RG8)),_===e.RG_INTEGER&&(I===e.UNSIGNED_BYTE&&(X=e.RG8UI),I===e.UNSIGNED_SHORT&&(X=e.RG16UI),I===e.UNSIGNED_INT&&(X=e.RG32UI),I===e.BYTE&&(X=e.RG8I),I===e.SHORT&&(X=e.RG16I),I===e.INT&&(X=e.RG32I)),_===e.RGB_INTEGER&&(I===e.UNSIGNED_BYTE&&(X=e.RGB8UI),I===e.UNSIGNED_SHORT&&(X=e.RGB16UI),I===e.UNSIGNED_INT&&(X=e.RGB32UI),I===e.BYTE&&(X=e.RGB8I),I===e.SHORT&&(X=e.RGB16I),I===e.INT&&(X=e.RGB32I)),_===e.RGBA_INTEGER&&(I===e.UNSIGNED_BYTE&&(X=e.RGBA8UI),I===e.UNSIGNED_SHORT&&(X=e.RGBA16UI),I===e.UNSIGNED_INT&&(X=e.RGBA32UI),I===e.BYTE&&(X=e.RGBA8I),I===e.SHORT&&(X=e.RGBA16I),I===e.INT&&(X=e.RGBA32I)),_===e.RGB&&(I===e.UNSIGNED_INT_5_9_9_9_REV&&(X=e.RGB9_E5),I===e.UNSIGNED_INT_10F_11F_11F_REV&&(X=e.R11F_G11F_B10F)),_===e.RGBA){const _t=j?Xo:Kt.getTransfer(q);I===e.FLOAT&&(X=e.RGBA32F),I===e.HALF_FLOAT&&(X=e.RGBA16F),I===e.UNSIGNED_BYTE&&(X=_t===oe?e.SRGB8_ALPHA8:e.RGBA8),I===e.UNSIGNED_SHORT_4_4_4_4&&(X=e.RGBA4),I===e.UNSIGNED_SHORT_5_5_5_1&&(X=e.RGB5_A1)}return(X===e.R16F||X===e.R32F||X===e.RG16F||X===e.RG32F||X===e.RGBA16F||X===e.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function y(T,_){let I;return T?_===null||_===gi||_===Ma?I=e.DEPTH24_STENCIL8:_===hi?I=e.DEPTH32F_STENCIL8:_===xa&&(I=e.DEPTH24_STENCIL8,Ut("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===gi||_===Ma?I=e.DEPTH_COMPONENT24:_===hi?I=e.DEPTH_COMPONENT32F:_===xa&&(I=e.DEPTH_COMPONENT16),I}function w(T,_){return p(T)===!0||T.isFramebufferTexture&&T.minFilter!==Qe&&T.minFilter!==Ze?Math.log2(Math.max(_.width,_.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?_.mipmaps.length:1}function C(T){const _=T.target;_.removeEventListener("dispose",C),v(_),_.isVideoTexture&&u.delete(_)}function A(T){const _=T.target;_.removeEventListener("dispose",A),N(_)}function v(T){const _=i.get(T);if(_.__webglInit===void 0)return;const I=T.source,q=h.get(I);if(q){const j=q[_.__cacheKey];j.usedTimes--,j.usedTimes===0&&b(T),Object.keys(q).length===0&&h.delete(I)}i.remove(T)}function b(T){const _=i.get(T);e.deleteTexture(_.__webglTexture);const I=T.source,q=h.get(I);delete q[_.__cacheKey],a.memory.textures--}function N(T){const _=i.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),i.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(_.__webglFramebuffer[q]))for(let j=0;j<_.__webglFramebuffer[q].length;j++)e.deleteFramebuffer(_.__webglFramebuffer[q][j]);else e.deleteFramebuffer(_.__webglFramebuffer[q]);_.__webglDepthbuffer&&e.deleteRenderbuffer(_.__webglDepthbuffer[q])}else{if(Array.isArray(_.__webglFramebuffer))for(let q=0;q<_.__webglFramebuffer.length;q++)e.deleteFramebuffer(_.__webglFramebuffer[q]);else e.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&e.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&e.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let q=0;q<_.__webglColorRenderbuffer.length;q++)_.__webglColorRenderbuffer[q]&&e.deleteRenderbuffer(_.__webglColorRenderbuffer[q]);_.__webglDepthRenderbuffer&&e.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const I=T.textures;for(let q=0,j=I.length;q<j;q++){const X=i.get(I[q]);X.__webglTexture&&(e.deleteTexture(X.__webglTexture),a.memory.textures--),i.remove(I[q])}i.remove(T)}let R=0;function F(){R=0}function V(){const T=R;return T>=r.maxTextures&&Ut("WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),R+=1,T}function Y(T){const _=[];return _.push(T.wrapS),_.push(T.wrapT),_.push(T.wrapR||0),_.push(T.magFilter),_.push(T.minFilter),_.push(T.anisotropy),_.push(T.internalFormat),_.push(T.format),_.push(T.type),_.push(T.generateMipmaps),_.push(T.premultiplyAlpha),_.push(T.flipY),_.push(T.unpackAlignment),_.push(T.colorSpace),_.join()}function z(T,_){const I=i.get(T);if(T.isVideoTexture&&ie(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&I.__version!==T.version){const q=T.image;if(q===null)Ut("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Ut("WebGLRenderer: Texture marked for update but image is incomplete");else{$(I,T,_);return}}else T.isExternalTexture&&(I.__webglTexture=T.sourceTexture?T.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,I.__webglTexture,e.TEXTURE0+_)}function H(T,_){const I=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&I.__version!==T.version){$(I,T,_);return}else T.isExternalTexture&&(I.__webglTexture=T.sourceTexture?T.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,I.__webglTexture,e.TEXTURE0+_)}function O(T,_){const I=i.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&I.__version!==T.version){$(I,T,_);return}n.bindTexture(e.TEXTURE_3D,I.__webglTexture,e.TEXTURE0+_)}function Q(T,_){const I=i.get(T);if(T.isCubeDepthTexture!==!0&&T.version>0&&I.__version!==T.version){nt(I,T,_);return}n.bindTexture(e.TEXTURE_CUBE_MAP,I.__webglTexture,e.TEXTURE0+_)}const K={[Wl]:e.REPEAT,[Di]:e.CLAMP_TO_EDGE,[Xl]:e.MIRRORED_REPEAT},lt={[Qe]:e.NEAREST,[T_]:e.NEAREST_MIPMAP_NEAREST,[za]:e.NEAREST_MIPMAP_LINEAR,[Ze]:e.LINEAR,[Wc]:e.LINEAR_MIPMAP_NEAREST,[Lr]:e.LINEAR_MIPMAP_LINEAR},gt={[P_]:e.NEVER,[F_]:e.ALWAYS,[L_]:e.LESS,[ru]:e.LEQUAL,[I_]:e.EQUAL,[su]:e.GEQUAL,[D_]:e.GREATER,[U_]:e.NOTEQUAL};function ft(T,_){if(_.type===hi&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===Ze||_.magFilter===Wc||_.magFilter===za||_.magFilter===Lr||_.minFilter===Ze||_.minFilter===Wc||_.minFilter===za||_.minFilter===Lr)&&Ut("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(T,e.TEXTURE_WRAP_S,K[_.wrapS]),e.texParameteri(T,e.TEXTURE_WRAP_T,K[_.wrapT]),(T===e.TEXTURE_3D||T===e.TEXTURE_2D_ARRAY)&&e.texParameteri(T,e.TEXTURE_WRAP_R,K[_.wrapR]),e.texParameteri(T,e.TEXTURE_MAG_FILTER,lt[_.magFilter]),e.texParameteri(T,e.TEXTURE_MIN_FILTER,lt[_.minFilter]),_.compareFunction&&(e.texParameteri(T,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(T,e.TEXTURE_COMPARE_FUNC,gt[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Qe||_.minFilter!==za&&_.minFilter!==Lr||_.type===hi&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const I=t.get("EXT_texture_filter_anisotropic");e.texParameterf(T,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,r.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Vt(T,_){let I=!1;T.__webglInit===void 0&&(T.__webglInit=!0,_.addEventListener("dispose",C));const q=_.source;let j=h.get(q);j===void 0&&(j={},h.set(q,j));const X=Y(_);if(X!==T.__cacheKey){j[X]===void 0&&(j[X]={texture:e.createTexture(),usedTimes:0},a.memory.textures++,I=!0),j[X].usedTimes++;const _t=j[T.__cacheKey];_t!==void 0&&(j[T.__cacheKey].usedTimes--,_t.usedTimes===0&&b(_)),T.__cacheKey=X,T.__webglTexture=j[X].texture}return I}function _e(T,_,I){return Math.floor(Math.floor(T/I)/_)}function ge(T,_,I,q){const X=T.updateRanges;if(X.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,_.width,_.height,I,q,_.data);else{X.sort((Z,tt)=>Z.start-tt.start);let _t=0;for(let Z=1;Z<X.length;Z++){const tt=X[_t],vt=X[Z],Mt=tt.start+tt.count,ht=_e(vt.start,_.width,4),Wt=_e(tt.start,_.width,4);vt.start<=Mt+1&&ht===Wt&&_e(vt.start+vt.count-1,_.width,4)===ht?tt.count=Math.max(tt.count,vt.start+vt.count-tt.start):(++_t,X[_t]=vt)}X.length=_t+1;const it=e.getParameter(e.UNPACK_ROW_LENGTH),Pt=e.getParameter(e.UNPACK_SKIP_PIXELS),Dt=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,_.width);for(let Z=0,tt=X.length;Z<tt;Z++){const vt=X[Z],Mt=Math.floor(vt.start/4),ht=Math.ceil(vt.count/4),Wt=Mt%_.width,L=Math.floor(Mt/_.width),rt=ht,et=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,Wt),e.pixelStorei(e.UNPACK_SKIP_ROWS,L),n.texSubImage2D(e.TEXTURE_2D,0,Wt,L,rt,et,I,q,_.data)}T.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,it),e.pixelStorei(e.UNPACK_SKIP_PIXELS,Pt),e.pixelStorei(e.UNPACK_SKIP_ROWS,Dt)}}function $(T,_,I){let q=e.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(q=e.TEXTURE_2D_ARRAY),_.isData3DTexture&&(q=e.TEXTURE_3D);const j=Vt(T,_),X=_.source;n.bindTexture(q,T.__webglTexture,e.TEXTURE0+I);const _t=i.get(X);if(X.version!==_t.__version||j===!0){n.activeTexture(e.TEXTURE0+I);const it=Kt.getPrimaries(Kt.workingColorSpace),Pt=_.colorSpace===nr?null:Kt.getPrimaries(_.colorSpace),Dt=_.colorSpace===nr||it===Pt?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt);let Z=M(_.image,!1,r.maxTextureSize);Z=pe(_,Z);const tt=s.convert(_.format,_.colorSpace),vt=s.convert(_.type);let Mt=E(_.internalFormat,tt,vt,_.colorSpace,_.isVideoTexture);ft(q,_);let ht;const Wt=_.mipmaps,L=_.isVideoTexture!==!0,rt=_t.__version===void 0||j===!0,et=X.dataReady,pt=w(_,Z);if(_.isDepthTexture)Mt=y(_.format===Ir,_.type),rt&&(L?n.texStorage2D(e.TEXTURE_2D,1,Mt,Z.width,Z.height):n.texImage2D(e.TEXTURE_2D,0,Mt,Z.width,Z.height,0,tt,vt,null));else if(_.isDataTexture)if(Wt.length>0){L&&rt&&n.texStorage2D(e.TEXTURE_2D,pt,Mt,Wt[0].width,Wt[0].height);for(let J=0,W=Wt.length;J<W;J++)ht=Wt[J],L?et&&n.texSubImage2D(e.TEXTURE_2D,J,0,0,ht.width,ht.height,tt,vt,ht.data):n.texImage2D(e.TEXTURE_2D,J,Mt,ht.width,ht.height,0,tt,vt,ht.data);_.generateMipmaps=!1}else L?(rt&&n.texStorage2D(e.TEXTURE_2D,pt,Mt,Z.width,Z.height),et&&ge(_,Z,tt,vt)):n.texImage2D(e.TEXTURE_2D,0,Mt,Z.width,Z.height,0,tt,vt,Z.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){L&&rt&&n.texStorage3D(e.TEXTURE_2D_ARRAY,pt,Mt,Wt[0].width,Wt[0].height,Z.depth);for(let J=0,W=Wt.length;J<W;J++)if(ht=Wt[J],_.format!==Kn)if(tt!==null)if(L){if(et)if(_.layerUpdates.size>0){const xt=Qf(ht.width,ht.height,_.format,_.type);for(const Nt of _.layerUpdates){const me=ht.data.subarray(Nt*xt/ht.data.BYTES_PER_ELEMENT,(Nt+1)*xt/ht.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,J,0,0,Nt,ht.width,ht.height,1,tt,me)}_.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,J,0,0,0,ht.width,ht.height,Z.depth,tt,ht.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,J,Mt,ht.width,ht.height,Z.depth,0,ht.data,0,0);else Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?et&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,J,0,0,0,ht.width,ht.height,Z.depth,tt,vt,ht.data):n.texImage3D(e.TEXTURE_2D_ARRAY,J,Mt,ht.width,ht.height,Z.depth,0,tt,vt,ht.data)}else{L&&rt&&n.texStorage2D(e.TEXTURE_2D,pt,Mt,Wt[0].width,Wt[0].height);for(let J=0,W=Wt.length;J<W;J++)ht=Wt[J],_.format!==Kn?tt!==null?L?et&&n.compressedTexSubImage2D(e.TEXTURE_2D,J,0,0,ht.width,ht.height,tt,ht.data):n.compressedTexImage2D(e.TEXTURE_2D,J,Mt,ht.width,ht.height,0,ht.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?et&&n.texSubImage2D(e.TEXTURE_2D,J,0,0,ht.width,ht.height,tt,vt,ht.data):n.texImage2D(e.TEXTURE_2D,J,Mt,ht.width,ht.height,0,tt,vt,ht.data)}else if(_.isDataArrayTexture)if(L){if(rt&&n.texStorage3D(e.TEXTURE_2D_ARRAY,pt,Mt,Z.width,Z.height,Z.depth),et)if(_.layerUpdates.size>0){const J=Qf(Z.width,Z.height,_.format,_.type);for(const W of _.layerUpdates){const xt=Z.data.subarray(W*J/Z.data.BYTES_PER_ELEMENT,(W+1)*J/Z.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,W,Z.width,Z.height,1,tt,vt,xt)}_.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,tt,vt,Z.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,Mt,Z.width,Z.height,Z.depth,0,tt,vt,Z.data);else if(_.isData3DTexture)L?(rt&&n.texStorage3D(e.TEXTURE_3D,pt,Mt,Z.width,Z.height,Z.depth),et&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,tt,vt,Z.data)):n.texImage3D(e.TEXTURE_3D,0,Mt,Z.width,Z.height,Z.depth,0,tt,vt,Z.data);else if(_.isFramebufferTexture){if(rt)if(L)n.texStorage2D(e.TEXTURE_2D,pt,Mt,Z.width,Z.height);else{let J=Z.width,W=Z.height;for(let xt=0;xt<pt;xt++)n.texImage2D(e.TEXTURE_2D,xt,Mt,J,W,0,tt,vt,null),J>>=1,W>>=1}}else if(Wt.length>0){if(L&&rt){const J=yt(Wt[0]);n.texStorage2D(e.TEXTURE_2D,pt,Mt,J.width,J.height)}for(let J=0,W=Wt.length;J<W;J++)ht=Wt[J],L?et&&n.texSubImage2D(e.TEXTURE_2D,J,0,0,tt,vt,ht):n.texImage2D(e.TEXTURE_2D,J,Mt,tt,vt,ht);_.generateMipmaps=!1}else if(L){if(rt){const J=yt(Z);n.texStorage2D(e.TEXTURE_2D,pt,Mt,J.width,J.height)}et&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,tt,vt,Z)}else n.texImage2D(e.TEXTURE_2D,0,Mt,tt,vt,Z);p(_)&&d(q),_t.__version=X.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function nt(T,_,I){if(_.image.length!==6)return;const q=Vt(T,_),j=_.source;n.bindTexture(e.TEXTURE_CUBE_MAP,T.__webglTexture,e.TEXTURE0+I);const X=i.get(j);if(j.version!==X.__version||q===!0){n.activeTexture(e.TEXTURE0+I);const _t=Kt.getPrimaries(Kt.workingColorSpace),it=_.colorSpace===nr?null:Kt.getPrimaries(_.colorSpace),Pt=_.colorSpace===nr||_t===it?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);const Dt=_.isCompressedTexture||_.image[0].isCompressedTexture,Z=_.image[0]&&_.image[0].isDataTexture,tt=[];for(let W=0;W<6;W++)!Dt&&!Z?tt[W]=M(_.image[W],!0,r.maxCubemapSize):tt[W]=Z?_.image[W].image:_.image[W],tt[W]=pe(_,tt[W]);const vt=tt[0],Mt=s.convert(_.format,_.colorSpace),ht=s.convert(_.type),Wt=E(_.internalFormat,Mt,ht,_.colorSpace),L=_.isVideoTexture!==!0,rt=X.__version===void 0||q===!0,et=j.dataReady;let pt=w(_,vt);ft(e.TEXTURE_CUBE_MAP,_);let J;if(Dt){L&&rt&&n.texStorage2D(e.TEXTURE_CUBE_MAP,pt,Wt,vt.width,vt.height);for(let W=0;W<6;W++){J=tt[W].mipmaps;for(let xt=0;xt<J.length;xt++){const Nt=J[xt];_.format!==Kn?Mt!==null?L?et&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt,0,0,Nt.width,Nt.height,Mt,Nt.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt,Wt,Nt.width,Nt.height,0,Nt.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?et&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt,0,0,Nt.width,Nt.height,Mt,ht,Nt.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt,Wt,Nt.width,Nt.height,0,Mt,ht,Nt.data)}}}else{if(J=_.mipmaps,L&&rt){J.length>0&&pt++;const W=yt(tt[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,pt,Wt,W.width,W.height)}for(let W=0;W<6;W++)if(Z){L?et&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,tt[W].width,tt[W].height,Mt,ht,tt[W].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Wt,tt[W].width,tt[W].height,0,Mt,ht,tt[W].data);for(let xt=0;xt<J.length;xt++){const me=J[xt].image[W].image;L?et&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt+1,0,0,me.width,me.height,Mt,ht,me.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt+1,Wt,me.width,me.height,0,Mt,ht,me.data)}}else{L?et&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,Mt,ht,tt[W]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Wt,Mt,ht,tt[W]);for(let xt=0;xt<J.length;xt++){const Nt=J[xt];L?et&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt+1,0,0,Mt,ht,Nt.image[W]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt+1,Wt,Mt,ht,Nt.image[W])}}}p(_)&&d(e.TEXTURE_CUBE_MAP),X.__version=j.version,_.onUpdate&&_.onUpdate(_)}T.__version=_.version}function st(T,_,I,q,j,X){const _t=s.convert(I.format,I.colorSpace),it=s.convert(I.type),Pt=E(I.internalFormat,_t,it,I.colorSpace),Dt=i.get(_),Z=i.get(I);if(Z.__renderTarget=_,!Dt.__hasExternalTextures){const tt=Math.max(1,_.width>>X),vt=Math.max(1,_.height>>X);j===e.TEXTURE_3D||j===e.TEXTURE_2D_ARRAY?n.texImage3D(j,X,Pt,tt,vt,_.depth,0,_t,it,null):n.texImage2D(j,X,Pt,tt,vt,0,_t,it,null)}n.bindFramebuffer(e.FRAMEBUFFER,T),Ue(_)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,q,j,Z.__webglTexture,0,P(_)):(j===e.TEXTURE_2D||j>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,q,j,Z.__webglTexture,X),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Bt(T,_,I){if(e.bindRenderbuffer(e.RENDERBUFFER,T),_.depthBuffer){const q=_.depthTexture,j=q&&q.isDepthTexture?q.type:null,X=y(_.stencilBuffer,j),_t=_.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;Ue(_)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,P(_),X,_.width,_.height):I?e.renderbufferStorageMultisample(e.RENDERBUFFER,P(_),X,_.width,_.height):e.renderbufferStorage(e.RENDERBUFFER,X,_.width,_.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,_t,e.RENDERBUFFER,T)}else{const q=_.textures;for(let j=0;j<q.length;j++){const X=q[j],_t=s.convert(X.format,X.colorSpace),it=s.convert(X.type),Pt=E(X.internalFormat,_t,it,X.colorSpace);Ue(_)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,P(_),Pt,_.width,_.height):I?e.renderbufferStorageMultisample(e.RENDERBUFFER,P(_),Pt,_.width,_.height):e.renderbufferStorage(e.RENDERBUFFER,Pt,_.width,_.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function It(T,_,I){const q=_.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,T),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=i.get(_.depthTexture);if(j.__renderTarget=_,(!j.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),q){if(j.__webglInit===void 0&&(j.__webglInit=!0,_.depthTexture.addEventListener("dispose",C)),j.__webglTexture===void 0){j.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,j.__webglTexture),ft(e.TEXTURE_CUBE_MAP,_.depthTexture);const Dt=s.convert(_.depthTexture.format),Z=s.convert(_.depthTexture.type);let tt;_.depthTexture.format===Bi?tt=e.DEPTH_COMPONENT24:_.depthTexture.format===Ir&&(tt=e.DEPTH24_STENCIL8);for(let vt=0;vt<6;vt++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,tt,_.width,_.height,0,Dt,Z,null)}}else z(_.depthTexture,0);const X=j.__webglTexture,_t=P(_),it=q?e.TEXTURE_CUBE_MAP_POSITIVE_X+I:e.TEXTURE_2D,Pt=_.depthTexture.format===Ir?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(_.depthTexture.format===Bi)Ue(_)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Pt,it,X,0,_t):e.framebufferTexture2D(e.FRAMEBUFFER,Pt,it,X,0);else if(_.depthTexture.format===Ir)Ue(_)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Pt,it,X,0,_t):e.framebufferTexture2D(e.FRAMEBUFFER,Pt,it,X,0);else throw new Error("Unknown depthTexture format")}function Ft(T){const _=i.get(T),I=T.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==T.depthTexture){const q=T.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),q){const j=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,q.removeEventListener("dispose",j)};q.addEventListener("dispose",j),_.__depthDisposeCallback=j}_.__boundDepthTexture=q}if(T.depthTexture&&!_.__autoAllocateDepthBuffer)if(I)for(let q=0;q<6;q++)It(_.__webglFramebuffer[q],T,q);else{const q=T.texture.mipmaps;q&&q.length>0?It(_.__webglFramebuffer[0],T,0):It(_.__webglFramebuffer,T,0)}else if(I){_.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer[q]),_.__webglDepthbuffer[q]===void 0)_.__webglDepthbuffer[q]=e.createRenderbuffer(),Bt(_.__webglDepthbuffer[q],T,!1);else{const j=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,X=_.__webglDepthbuffer[q];e.bindRenderbuffer(e.RENDERBUFFER,X),e.framebufferRenderbuffer(e.FRAMEBUFFER,j,e.RENDERBUFFER,X)}}else{const q=T.texture.mipmaps;if(q&&q.length>0?n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=e.createRenderbuffer(),Bt(_.__webglDepthbuffer,T,!1);else{const j=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,X=_.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,X),e.framebufferRenderbuffer(e.FRAMEBUFFER,j,e.RENDERBUFFER,X)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function Ye(T,_,I){const q=i.get(T);_!==void 0&&st(q.__webglFramebuffer,T,T.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),I!==void 0&&Ft(T)}function jt(T){const _=T.texture,I=i.get(T),q=i.get(_);T.addEventListener("dispose",A);const j=T.textures,X=T.isWebGLCubeRenderTarget===!0,_t=j.length>1;if(_t||(q.__webglTexture===void 0&&(q.__webglTexture=e.createTexture()),q.__version=_.version,a.memory.textures++),X){I.__webglFramebuffer=[];for(let it=0;it<6;it++)if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer[it]=[];for(let Pt=0;Pt<_.mipmaps.length;Pt++)I.__webglFramebuffer[it][Pt]=e.createFramebuffer()}else I.__webglFramebuffer[it]=e.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer=[];for(let it=0;it<_.mipmaps.length;it++)I.__webglFramebuffer[it]=e.createFramebuffer()}else I.__webglFramebuffer=e.createFramebuffer();if(_t)for(let it=0,Pt=j.length;it<Pt;it++){const Dt=i.get(j[it]);Dt.__webglTexture===void 0&&(Dt.__webglTexture=e.createTexture(),a.memory.textures++)}if(T.samples>0&&Ue(T)===!1){I.__webglMultisampledFramebuffer=e.createFramebuffer(),I.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let it=0;it<j.length;it++){const Pt=j[it];I.__webglColorRenderbuffer[it]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,I.__webglColorRenderbuffer[it]);const Dt=s.convert(Pt.format,Pt.colorSpace),Z=s.convert(Pt.type),tt=E(Pt.internalFormat,Dt,Z,Pt.colorSpace,T.isXRRenderTarget===!0),vt=P(T);e.renderbufferStorageMultisample(e.RENDERBUFFER,vt,tt,T.width,T.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+it,e.RENDERBUFFER,I.__webglColorRenderbuffer[it])}e.bindRenderbuffer(e.RENDERBUFFER,null),T.depthBuffer&&(I.__webglDepthRenderbuffer=e.createRenderbuffer(),Bt(I.__webglDepthRenderbuffer,T,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(X){n.bindTexture(e.TEXTURE_CUBE_MAP,q.__webglTexture),ft(e.TEXTURE_CUBE_MAP,_);for(let it=0;it<6;it++)if(_.mipmaps&&_.mipmaps.length>0)for(let Pt=0;Pt<_.mipmaps.length;Pt++)st(I.__webglFramebuffer[it][Pt],T,_,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+it,Pt);else st(I.__webglFramebuffer[it],T,_,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);p(_)&&d(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(_t){for(let it=0,Pt=j.length;it<Pt;it++){const Dt=j[it],Z=i.get(Dt);let tt=e.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(tt=T.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(tt,Z.__webglTexture),ft(tt,Dt),st(I.__webglFramebuffer,T,Dt,e.COLOR_ATTACHMENT0+it,tt,0),p(Dt)&&d(tt)}n.unbindTexture()}else{let it=e.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(it=T.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(it,q.__webglTexture),ft(it,_),_.mipmaps&&_.mipmaps.length>0)for(let Pt=0;Pt<_.mipmaps.length;Pt++)st(I.__webglFramebuffer[Pt],T,_,e.COLOR_ATTACHMENT0,it,Pt);else st(I.__webglFramebuffer,T,_,e.COLOR_ATTACHMENT0,it,0);p(_)&&d(it),n.unbindTexture()}T.depthBuffer&&Ft(T)}function se(T){const _=T.textures;for(let I=0,q=_.length;I<q;I++){const j=_[I];if(p(j)){const X=x(T),_t=i.get(j).__webglTexture;n.bindTexture(X,_t),d(X),n.unbindTexture()}}}const ue=[],Ht=[];function Pe(T){if(T.samples>0){if(Ue(T)===!1){const _=T.textures,I=T.width,q=T.height;let j=e.COLOR_BUFFER_BIT;const X=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,_t=i.get(T),it=_.length>1;if(it)for(let Dt=0;Dt<_.length;Dt++)n.bindFramebuffer(e.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Dt,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,_t.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Dt,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,_t.__webglMultisampledFramebuffer);const Pt=T.texture.mipmaps;Pt&&Pt.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,_t.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,_t.__webglFramebuffer);for(let Dt=0;Dt<_.length;Dt++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(j|=e.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(j|=e.STENCIL_BUFFER_BIT)),it){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,_t.__webglColorRenderbuffer[Dt]);const Z=i.get(_[Dt]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Z,0)}e.blitFramebuffer(0,0,I,q,0,0,I,q,j,e.NEAREST),c===!0&&(ue.length=0,Ht.length=0,ue.push(e.COLOR_ATTACHMENT0+Dt),T.depthBuffer&&T.resolveDepthBuffer===!1&&(ue.push(X),Ht.push(X),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Ht)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ue))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),it)for(let Dt=0;Dt<_.length;Dt++){n.bindFramebuffer(e.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Dt,e.RENDERBUFFER,_t.__webglColorRenderbuffer[Dt]);const Z=i.get(_[Dt]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,_t.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Dt,e.TEXTURE_2D,Z,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,_t.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const _=T.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[_])}}}function P(T){return Math.min(r.maxSamples,T.samples)}function Ue(T){const _=i.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ie(T){const _=a.render.frame;u.get(T)!==_&&(u.set(T,_),T.update())}function pe(T,_){const I=T.colorSpace,q=T.format,j=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||I!==Es&&I!==nr&&(Kt.getTransfer(I)===oe?(q!==Kn||j!==kn)&&Ut("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qt("WebGLTextures: Unsupported texture color space:",I)),_}function yt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=V,this.resetTextureUnits=F,this.setTexture2D=z,this.setTexture2DArray=H,this.setTexture3D=O,this.setTextureCube=Q,this.rebindTextures=Ye,this.setupRenderTarget=jt,this.updateRenderTargetMipmap=se,this.updateMultisampleRenderTarget=Pe,this.setupDepthRenderbuffer=Ft,this.setupFrameBufferTexture=st,this.useMultisampledRTT=Ue,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function aM(e,t){function n(i,r=nr){let s;const a=Kt.getTransfer(r);if(i===kn)return e.UNSIGNED_BYTE;if(i===Qh)return e.UNSIGNED_SHORT_4_4_4_4;if(i===tu)return e.UNSIGNED_SHORT_5_5_5_1;if(i===em)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===nm)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===Qp)return e.BYTE;if(i===tm)return e.SHORT;if(i===xa)return e.UNSIGNED_SHORT;if(i===Jh)return e.INT;if(i===gi)return e.UNSIGNED_INT;if(i===hi)return e.FLOAT;if(i===Oi)return e.HALF_FLOAT;if(i===im)return e.ALPHA;if(i===rm)return e.RGB;if(i===Kn)return e.RGBA;if(i===Bi)return e.DEPTH_COMPONENT;if(i===Ir)return e.DEPTH_STENCIL;if(i===sm)return e.RED;if(i===eu)return e.RED_INTEGER;if(i===ys)return e.RG;if(i===nu)return e.RG_INTEGER;if(i===iu)return e.RGBA_INTEGER;if(i===Ro||i===Co||i===Po||i===Lo)if(a===oe)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Ro)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Co)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Po)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Lo)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Ro)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Co)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Po)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Lo)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Yl||i===ql||i===$l||i===jl)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Yl)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ql)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===$l)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===jl)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Kl||i===Zl||i===Jl||i===Ql||i===th||i===eh||i===nh)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Kl||i===Zl)return a===oe?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Jl)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===Ql)return s.COMPRESSED_R11_EAC;if(i===th)return s.COMPRESSED_SIGNED_R11_EAC;if(i===eh)return s.COMPRESSED_RG11_EAC;if(i===nh)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ih||i===rh||i===sh||i===ah||i===oh||i===ch||i===lh||i===hh||i===uh||i===fh||i===dh||i===ph||i===mh||i===gh)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===ih)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===rh)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===sh)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===ah)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===oh)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===ch)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===lh)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===hh)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===uh)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===fh)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===dh)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===ph)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===mh)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===gh)return a===oe?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===_h||i===vh||i===xh)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===_h)return a===oe?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===vh)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===xh)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Mh||i===Sh||i===yh||i===Eh)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===Mh)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Sh)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===yh)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Eh)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Ma?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}const oM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,cM=`
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

}`;class lM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const i=new mm(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,i=new _i({vertexShader:oM,fragmentShader:cM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new _n(new hc(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class hM extends Bs{constructor(t,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,u=null,f=null,h=null,m=null,g=null;const M=typeof XRWebGLBinding<"u",p=new lM,d={},x=n.getContextAttributes();let E=null,y=null;const w=[],C=[],A=new ne;let v=null;const b=new Bn;b.viewport=new De;const N=new Bn;N.viewport=new De;const R=[b,N],F=new y1;let V=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let nt=w[$];return nt===void 0&&(nt=new Zc,w[$]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function($){let nt=w[$];return nt===void 0&&(nt=new Zc,w[$]=nt),nt.getGripSpace()},this.getHand=function($){let nt=w[$];return nt===void 0&&(nt=new Zc,w[$]=nt),nt.getHandSpace()};function z($){const nt=C.indexOf($.inputSource);if(nt===-1)return;const st=w[nt];st!==void 0&&(st.update($.inputSource,$.frame,l||a),st.dispatchEvent({type:$.type,data:$.inputSource}))}function H(){r.removeEventListener("select",z),r.removeEventListener("selectstart",z),r.removeEventListener("selectend",z),r.removeEventListener("squeeze",z),r.removeEventListener("squeezestart",z),r.removeEventListener("squeezeend",z),r.removeEventListener("end",H),r.removeEventListener("inputsourceschange",O);for(let $=0;$<w.length;$++){const nt=C[$];nt!==null&&(C[$]=null,w[$].disconnect(nt))}V=null,Y=null,p.reset();for(const $ in d)delete d[$];t.setRenderTarget(E),m=null,h=null,f=null,r=null,y=null,ge.stop(),i.isPresenting=!1,t.setPixelRatio(v),t.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,i.isPresenting===!0&&Ut("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,i.isPresenting===!0&&Ut("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return f===null&&M&&(f=new XRWebGLBinding(r,n)),f},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function($){if(r=$,r!==null){if(E=t.getRenderTarget(),r.addEventListener("select",z),r.addEventListener("selectstart",z),r.addEventListener("selectend",z),r.addEventListener("squeeze",z),r.addEventListener("squeezestart",z),r.addEventListener("squeezeend",z),r.addEventListener("end",H),r.addEventListener("inputsourceschange",O),x.xrCompatible!==!0&&await n.makeXRCompatible(),v=t.getPixelRatio(),t.getSize(A),M&&"createProjectionLayer"in XRWebGLBinding.prototype){let st=null,Bt=null,It=null;x.depth&&(It=x.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,st=x.stencil?Ir:Bi,Bt=x.stencil?Ma:gi);const Ft={colorFormat:n.RGBA8,depthFormat:It,scaleFactor:s};f=this.getBinding(),h=f.createProjectionLayer(Ft),r.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),y=new pi(h.textureWidth,h.textureHeight,{format:Kn,type:kn,depthTexture:new Sa(h.textureWidth,h.textureHeight,Bt,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const st={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,n,st),r.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),y=new pi(m.framebufferWidth,m.framebufferHeight,{format:Kn,type:kn,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),ge.setContext(r),ge.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function O($){for(let nt=0;nt<$.removed.length;nt++){const st=$.removed[nt],Bt=C.indexOf(st);Bt>=0&&(C[Bt]=null,w[Bt].disconnect(st))}for(let nt=0;nt<$.added.length;nt++){const st=$.added[nt];let Bt=C.indexOf(st);if(Bt===-1){for(let Ft=0;Ft<w.length;Ft++)if(Ft>=C.length){C.push(st),Bt=Ft;break}else if(C[Ft]===null){C[Ft]=st,Bt=Ft;break}if(Bt===-1)break}const It=w[Bt];It&&It.connect(st)}}const Q=new U,K=new U;function lt($,nt,st){Q.setFromMatrixPosition(nt.matrixWorld),K.setFromMatrixPosition(st.matrixWorld);const Bt=Q.distanceTo(K),It=nt.projectionMatrix.elements,Ft=st.projectionMatrix.elements,Ye=It[14]/(It[10]-1),jt=It[14]/(It[10]+1),se=(It[9]+1)/It[5],ue=(It[9]-1)/It[5],Ht=(It[8]-1)/It[0],Pe=(Ft[8]+1)/Ft[0],P=Ye*Ht,Ue=Ye*Pe,ie=Bt/(-Ht+Pe),pe=ie*-Ht;if(nt.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(pe),$.translateZ(ie),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),It[10]===-1)$.projectionMatrix.copy(nt.projectionMatrix),$.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const yt=Ye+ie,T=jt+ie,_=P-pe,I=Ue+(Bt-pe),q=se*jt/T*yt,j=ue*jt/T*yt;$.projectionMatrix.makePerspective(_,I,q,j,yt,T),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function gt($,nt){nt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(nt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(r===null)return;let nt=$.near,st=$.far;p.texture!==null&&(p.depthNear>0&&(nt=p.depthNear),p.depthFar>0&&(st=p.depthFar)),F.near=N.near=b.near=nt,F.far=N.far=b.far=st,(V!==F.near||Y!==F.far)&&(r.updateRenderState({depthNear:F.near,depthFar:F.far}),V=F.near,Y=F.far),F.layers.mask=$.layers.mask|6,b.layers.mask=F.layers.mask&-5,N.layers.mask=F.layers.mask&-3;const Bt=$.parent,It=F.cameras;gt(F,Bt);for(let Ft=0;Ft<It.length;Ft++)gt(It[Ft],Bt);It.length===2?lt(F,b,N):F.projectionMatrix.copy(b.projectionMatrix),ft($,F,Bt)};function ft($,nt,st){st===null?$.matrix.copy(nt.matrixWorld):($.matrix.copy(st.matrixWorld),$.matrix.invert(),$.matrix.multiply(nt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(nt.projectionMatrix),$.projectionMatrixInverse.copy(nt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=bh*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(h===null&&m===null))return c},this.setFoveation=function($){c=$,h!==null&&(h.fixedFoveation=$),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=$)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(F)},this.getCameraTexture=function($){return d[$]};let Vt=null;function _e($,nt){if(u=nt.getViewerPose(l||a),g=nt,u!==null){const st=u.views;m!==null&&(t.setRenderTargetFramebuffer(y,m.framebuffer),t.setRenderTarget(y));let Bt=!1;st.length!==F.cameras.length&&(F.cameras.length=0,Bt=!0);for(let jt=0;jt<st.length;jt++){const se=st[jt];let ue=null;if(m!==null)ue=m.getViewport(se);else{const Pe=f.getViewSubImage(h,se);ue=Pe.viewport,jt===0&&(t.setRenderTargetTextures(y,Pe.colorTexture,Pe.depthStencilTexture),t.setRenderTarget(y))}let Ht=R[jt];Ht===void 0&&(Ht=new Bn,Ht.layers.enable(jt),Ht.viewport=new De,R[jt]=Ht),Ht.matrix.fromArray(se.transform.matrix),Ht.matrix.decompose(Ht.position,Ht.quaternion,Ht.scale),Ht.projectionMatrix.fromArray(se.projectionMatrix),Ht.projectionMatrixInverse.copy(Ht.projectionMatrix).invert(),Ht.viewport.set(ue.x,ue.y,ue.width,ue.height),jt===0&&(F.matrix.copy(Ht.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Bt===!0&&F.cameras.push(Ht)}const It=r.enabledFeatures;if(It&&It.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&M){f=i.getBinding();const jt=f.getDepthInformation(st[0]);jt&&jt.isValid&&jt.texture&&p.init(jt,r.renderState)}if(It&&It.includes("camera-access")&&M){t.state.unbindTexture(),f=i.getBinding();for(let jt=0;jt<st.length;jt++){const se=st[jt].camera;if(se){let ue=d[se];ue||(ue=new mm,d[se]=ue);const Ht=f.getCameraImage(se);ue.sourceTexture=Ht}}}}for(let st=0;st<w.length;st++){const Bt=C[st],It=w[st];Bt!==null&&It!==void 0&&It.update(Bt,nt,l||a)}Vt&&Vt($,nt),nt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:nt}),g=null}const ge=new xm;ge.setAnimationLoop(_e),this.setAnimationLoop=function($){Vt=$},this.dispose=function(){}}}const Sr=new ki,uM=new we;function fM(e,t){function n(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function i(p,d){d.color.getRGB(p.fogColor.value,gm(e)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function r(p,d,x,E,y){d.isMeshBasicMaterial?s(p,d):d.isMeshLambertMaterial?(s(p,d),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(s(p,d),f(p,d)):d.isMeshPhongMaterial?(s(p,d),u(p,d),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(s(p,d),h(p,d),d.isMeshPhysicalMaterial&&m(p,d,y)):d.isMeshMatcapMaterial?(s(p,d),g(p,d)):d.isMeshDepthMaterial?s(p,d):d.isMeshDistanceMaterial?(s(p,d),M(p,d)):d.isMeshNormalMaterial?s(p,d):d.isLineBasicMaterial?(a(p,d),d.isLineDashedMaterial&&o(p,d)):d.isPointsMaterial?c(p,d,x,E):d.isSpriteMaterial?l(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,n(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,n(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,n(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===gn&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,n(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===gn&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,n(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,n(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const x=t.get(d),E=x.envMap,y=x.envMapRotation;E&&(p.envMap.value=E,Sr.copy(y),Sr.x*=-1,Sr.y*=-1,Sr.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(Sr.y*=-1,Sr.z*=-1),p.envMapRotation.value.setFromMatrix4(uM.makeRotationFromEuler(Sr)),p.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap&&(p.lightMap.value=d.lightMap,p.lightMapIntensity.value=d.lightMapIntensity,n(d.lightMap,p.lightMapTransform)),d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,p.aoMapTransform))}function a(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,n(d.map,p.mapTransform))}function o(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function c(p,d,x,E){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*x,p.scale.value=E*.5,d.map&&(p.map.value=d.map,n(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,n(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function l(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,n(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,n(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function u(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function f(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function h(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,p.roughnessMapTransform)),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function m(p,d,x){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===gn&&p.clearcoatNormalScale.value.negate())),d.dispersion>0&&(p.dispersion.value=d.dispersion),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,d){d.matcap&&(p.matcap.value=d.matcap)}function M(p,d){const x=t.get(d).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function dM(e,t,n,i){let r={},s={},a=[];const o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,E){const y=E.program;i.uniformBlockBinding(x,y)}function l(x,E){let y=r[x.id];y===void 0&&(g(x),y=u(x),r[x.id]=y,x.addEventListener("dispose",p));const w=E.program;i.updateUBOMapping(x,w);const C=t.render.frame;s[x.id]!==C&&(h(x),s[x.id]=C)}function u(x){const E=f();x.__bindingPointIndex=E;const y=e.createBuffer(),w=x.__size,C=x.usage;return e.bindBuffer(e.UNIFORM_BUFFER,y),e.bufferData(e.UNIFORM_BUFFER,w,C),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,E,y),y}function f(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Qt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(x){const E=r[x.id],y=x.uniforms,w=x.__cache;e.bindBuffer(e.UNIFORM_BUFFER,E);for(let C=0,A=y.length;C<A;C++){const v=Array.isArray(y[C])?y[C]:[y[C]];for(let b=0,N=v.length;b<N;b++){const R=v[b];if(m(R,C,b,w)===!0){const F=R.__offset,V=Array.isArray(R.value)?R.value:[R.value];let Y=0;for(let z=0;z<V.length;z++){const H=V[z],O=M(H);typeof H=="number"||typeof H=="boolean"?(R.__data[0]=H,e.bufferSubData(e.UNIFORM_BUFFER,F+Y,R.__data)):H.isMatrix3?(R.__data[0]=H.elements[0],R.__data[1]=H.elements[1],R.__data[2]=H.elements[2],R.__data[3]=0,R.__data[4]=H.elements[3],R.__data[5]=H.elements[4],R.__data[6]=H.elements[5],R.__data[7]=0,R.__data[8]=H.elements[6],R.__data[9]=H.elements[7],R.__data[10]=H.elements[8],R.__data[11]=0):(H.toArray(R.__data,Y),Y+=O.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,F,R.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function m(x,E,y,w){const C=x.value,A=E+"_"+y;if(w[A]===void 0)return typeof C=="number"||typeof C=="boolean"?w[A]=C:w[A]=C.clone(),!0;{const v=w[A];if(typeof C=="number"||typeof C=="boolean"){if(v!==C)return w[A]=C,!0}else if(v.equals(C)===!1)return v.copy(C),!0}return!1}function g(x){const E=x.uniforms;let y=0;const w=16;for(let A=0,v=E.length;A<v;A++){const b=Array.isArray(E[A])?E[A]:[E[A]];for(let N=0,R=b.length;N<R;N++){const F=b[N],V=Array.isArray(F.value)?F.value:[F.value];for(let Y=0,z=V.length;Y<z;Y++){const H=V[Y],O=M(H),Q=y%w,K=Q%O.boundary,lt=Q+K;y+=K,lt!==0&&w-lt<O.storage&&(y+=w-lt),F.__data=new Float32Array(O.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=y,y+=O.storage}}}const C=y%w;return C>0&&(y+=w-C),x.__size=y,x.__cache={},this}function M(x){const E={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(E.boundary=4,E.storage=4):x.isVector2?(E.boundary=8,E.storage=8):x.isVector3||x.isColor?(E.boundary=16,E.storage=12):x.isVector4?(E.boundary=16,E.storage=16):x.isMatrix3?(E.boundary=48,E.storage=48):x.isMatrix4?(E.boundary=64,E.storage=64):x.isTexture?Ut("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ut("WebGLRenderer: Unsupported uniform value type.",x),E}function p(x){const E=x.target;E.removeEventListener("dispose",p);const y=a.indexOf(E.__bindingPointIndex);a.splice(y,1),e.deleteBuffer(r[E.id]),delete r[E.id],delete s[E.id]}function d(){for(const x in r)e.deleteBuffer(r[x]);a=[],r={},s={}}return{bind:c,update:l,dispose:d}}const pM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ri=null;function mM(){return ri===null&&(ri=new a1(pM,16,16,ys,Oi),ri.name="DFG_LUT",ri.minFilter=Ze,ri.magFilter=Ze,ri.wrapS=Di,ri.wrapT=Di,ri.generateMipmaps=!1,ri.needsUpdate=!0),ri}class gM{constructor(t={}){const{canvas:n=O_(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:h=!1,outputBufferType:m=kn}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const M=m,p=new Set([iu,nu,eu]),d=new Set([kn,gi,xa,Ma,Qh,tu]),x=new Uint32Array(4),E=new Int32Array(4);let y=null,w=null;const C=[],A=[];let v=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=di,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let N=!1;this._outputColorSpace=On;let R=0,F=0,V=null,Y=-1,z=null;const H=new De,O=new De;let Q=null;const K=new re(0);let lt=0,gt=n.width,ft=n.height,Vt=1,_e=null,ge=null;const $=new De(0,0,gt,ft),nt=new De(0,0,gt,ft);let st=!1;const Bt=new fm;let It=!1,Ft=!1;const Ye=new we,jt=new U,se=new De,ue={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ht=!1;function Pe(){return V===null?Vt:1}let P=i;function Ue(S,D){return n.getContext(S,D)}try{const S={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${Zh}`),n.addEventListener("webglcontextlost",xt,!1),n.addEventListener("webglcontextrestored",Nt,!1),n.addEventListener("webglcontextcreationerror",me,!1),P===null){const D="webgl2";if(P=Ue(D,S),P===null)throw Ue(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw Qt("WebGLRenderer: "+S.message),S}let ie,pe,yt,T,_,I,q,j,X,_t,it,Pt,Dt,Z,tt,vt,Mt,ht,Wt,L,rt,et,pt;function J(){ie=new gx(P),ie.init(),rt=new aM(P,ie),pe=new cx(P,ie,t,rt),yt=new rM(P,ie),pe.reversedDepthBuffer&&h&&yt.buffers.depth.setReversed(!0),T=new xx(P),_=new W3,I=new sM(P,ie,yt,_,pe,rt,T),q=new mx(b),j=new b1(P),et=new ax(P,j),X=new _x(P,j,T,et),_t=new Sx(P,X,j,et,T),ht=new Mx(P,pe,I),tt=new lx(_),it=new H3(b,q,ie,pe,et,tt),Pt=new fM(b,_),Dt=new Y3,Z=new J3(ie),Mt=new sx(b,q,yt,_t,g,c),vt=new iM(b,_t,pe),pt=new dM(P,T,pe,yt),Wt=new ox(P,ie,T),L=new vx(P,ie,T),T.programs=it.programs,b.capabilities=pe,b.extensions=ie,b.properties=_,b.renderLists=Dt,b.shadowMap=vt,b.state=yt,b.info=T}J(),M!==kn&&(v=new Ex(M,n.width,n.height,r,s));const W=new hM(b,P);this.xr=W,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const S=ie.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=ie.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return Vt},this.setPixelRatio=function(S){S!==void 0&&(Vt=S,this.setSize(gt,ft,!1))},this.getSize=function(S){return S.set(gt,ft)},this.setSize=function(S,D,G=!0){if(W.isPresenting){Ut("WebGLRenderer: Can't change size while VR device is presenting.");return}gt=S,ft=D,n.width=Math.floor(S*Vt),n.height=Math.floor(D*Vt),G===!0&&(n.style.width=S+"px",n.style.height=D+"px"),v!==null&&v.setSize(n.width,n.height),this.setViewport(0,0,S,D)},this.getDrawingBufferSize=function(S){return S.set(gt*Vt,ft*Vt).floor()},this.setDrawingBufferSize=function(S,D,G){gt=S,ft=D,Vt=G,n.width=Math.floor(S*G),n.height=Math.floor(D*G),this.setViewport(0,0,S,D)},this.setEffects=function(S){if(M===kn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let D=0;D<S.length;D++)if(S[D].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}v.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(H)},this.getViewport=function(S){return S.copy($)},this.setViewport=function(S,D,G,k){S.isVector4?$.set(S.x,S.y,S.z,S.w):$.set(S,D,G,k),yt.viewport(H.copy($).multiplyScalar(Vt).round())},this.getScissor=function(S){return S.copy(nt)},this.setScissor=function(S,D,G,k){S.isVector4?nt.set(S.x,S.y,S.z,S.w):nt.set(S,D,G,k),yt.scissor(O.copy(nt).multiplyScalar(Vt).round())},this.getScissorTest=function(){return st},this.setScissorTest=function(S){yt.setScissorTest(st=S)},this.setOpaqueSort=function(S){_e=S},this.setTransparentSort=function(S){ge=S},this.getClearColor=function(S){return S.copy(Mt.getClearColor())},this.setClearColor=function(){Mt.setClearColor(...arguments)},this.getClearAlpha=function(){return Mt.getClearAlpha()},this.setClearAlpha=function(){Mt.setClearAlpha(...arguments)},this.clear=function(S=!0,D=!0,G=!0){let k=0;if(S){let B=!1;if(V!==null){const ot=V.texture.format;B=p.has(ot)}if(B){const ot=V.texture.type,dt=d.has(ot),ct=Mt.getClearColor(),St=Mt.getClearAlpha(),Tt=ct.r,Ot=ct.g,Xt=ct.b;dt?(x[0]=Tt,x[1]=Ot,x[2]=Xt,x[3]=St,P.clearBufferuiv(P.COLOR,0,x)):(E[0]=Tt,E[1]=Ot,E[2]=Xt,E[3]=St,P.clearBufferiv(P.COLOR,0,E))}else k|=P.COLOR_BUFFER_BIT}D&&(k|=P.DEPTH_BUFFER_BIT),G&&(k|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&P.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",xt,!1),n.removeEventListener("webglcontextrestored",Nt,!1),n.removeEventListener("webglcontextcreationerror",me,!1),Mt.dispose(),Dt.dispose(),Z.dispose(),_.dispose(),q.dispose(),_t.dispose(),et.dispose(),pt.dispose(),it.dispose(),W.dispose(),W.removeEventListener("sessionstart",mf),W.removeEventListener("sessionend",gf),pr.stop()};function xt(S){S.preventDefault(),Pf("WebGLRenderer: Context Lost."),N=!0}function Nt(){Pf("WebGLRenderer: Context Restored."),N=!1;const S=T.autoReset,D=vt.enabled,G=vt.autoUpdate,k=vt.needsUpdate,B=vt.type;J(),T.autoReset=S,vt.enabled=D,vt.autoUpdate=G,vt.needsUpdate=k,vt.type=B}function me(S){Qt("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function ae(S){const D=S.target;D.removeEventListener("dispose",ae),bi(D)}function bi(S){Ai(S),_.remove(S)}function Ai(S){const D=_.get(S).programs;D!==void 0&&(D.forEach(function(G){it.releaseProgram(G)}),S.isShaderMaterial&&it.releaseShaderCache(S))}this.renderBufferDirect=function(S,D,G,k,B,ot){D===null&&(D=ue);const dt=B.isMesh&&B.matrixWorld.determinant()<0,ct=jg(S,D,G,k,B);yt.setMaterial(k,dt);let St=G.index,Tt=1;if(k.wireframe===!0){if(St=X.getWireframeAttribute(G),St===void 0)return;Tt=2}const Ot=G.drawRange,Xt=G.attributes.position;let Rt=Ot.start*Tt,ce=(Ot.start+Ot.count)*Tt;ot!==null&&(Rt=Math.max(Rt,ot.start*Tt),ce=Math.min(ce,(ot.start+ot.count)*Tt)),St!==null?(Rt=Math.max(Rt,0),ce=Math.min(ce,St.count)):Xt!=null&&(Rt=Math.max(Rt,0),ce=Math.min(ce,Xt.count));const Le=ce-Rt;if(Le<0||Le===1/0)return;et.setup(B,k,ct,G,St);let Te,le=Wt;if(St!==null&&(Te=j.get(St),le=L,le.setIndex(Te)),B.isMesh)k.wireframe===!0?(yt.setLineWidth(k.wireframeLinewidth*Pe()),le.setMode(P.LINES)):le.setMode(P.TRIANGLES);else if(B.isLine){let en=k.linewidth;en===void 0&&(en=1),yt.setLineWidth(en*Pe()),B.isLineSegments?le.setMode(P.LINES):B.isLineLoop?le.setMode(P.LINE_LOOP):le.setMode(P.LINE_STRIP)}else B.isPoints?le.setMode(P.POINTS):B.isSprite&&le.setMode(P.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)$o("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),le.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(ie.get("WEBGL_multi_draw"))le.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const en=B._multiDrawStarts,Et=B._multiDrawCounts,xn=B._multiDrawCount,Jt=St?j.get(St).bytesPerElement:1,Yn=_.get(k).currentProgram.getUniforms();for(let ni=0;ni<xn;ni++)Yn.setValue(P,"_gl_DrawID",ni),le.render(en[ni]/Jt,Et[ni])}else if(B.isInstancedMesh)le.renderInstances(Rt,Le,B.count);else if(G.isInstancedBufferGeometry){const en=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Et=Math.min(G.instanceCount,en);le.renderInstances(Rt,Le,Et)}else le.render(Rt,Le)};function pf(S,D,G){S.transparent===!0&&S.side===Li&&S.forceSinglePass===!1?(S.side=gn,S.needsUpdate=!0,ka(S,D,G),S.side=lr,S.needsUpdate=!0,ka(S,D,G),S.side=Li):ka(S,D,G)}this.compile=function(S,D,G=null){G===null&&(G=S),w=Z.get(G),w.init(D),A.push(w),G.traverseVisible(function(B){B.isLight&&B.layers.test(D.layers)&&(w.pushLight(B),B.castShadow&&w.pushShadow(B))}),S!==G&&S.traverseVisible(function(B){B.isLight&&B.layers.test(D.layers)&&(w.pushLight(B),B.castShadow&&w.pushShadow(B))}),w.setupLights();const k=new Set;return S.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const ot=B.material;if(ot)if(Array.isArray(ot))for(let dt=0;dt<ot.length;dt++){const ct=ot[dt];pf(ct,G,B),k.add(ct)}else pf(ot,G,B),k.add(ot)}),w=A.pop(),k},this.compileAsync=function(S,D,G=null){const k=this.compile(S,D,G);return new Promise(B=>{function ot(){if(k.forEach(function(dt){_.get(dt).currentProgram.isReady()&&k.delete(dt)}),k.size===0){B(S);return}setTimeout(ot,10)}ie.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let zc=null;function $g(S){zc&&zc(S)}function mf(){pr.stop()}function gf(){pr.start()}const pr=new xm;pr.setAnimationLoop($g),typeof self<"u"&&pr.setContext(self),this.setAnimationLoop=function(S){zc=S,W.setAnimationLoop(S),S===null?pr.stop():pr.start()},W.addEventListener("sessionstart",mf),W.addEventListener("sessionend",gf),this.render=function(S,D){if(D!==void 0&&D.isCamera!==!0){Qt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;const G=W.enabled===!0&&W.isPresenting===!0,k=v!==null&&(V===null||G)&&v.begin(b,V);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(v===null||v.isCompositing()===!1)&&(W.cameraAutoUpdate===!0&&W.updateCamera(D),D=W.getCamera()),S.isScene===!0&&S.onBeforeRender(b,S,D,V),w=Z.get(S,A.length),w.init(D),A.push(w),Ye.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Bt.setFromProjectionMatrix(Ye,ui,D.reversedDepth),Ft=this.localClippingEnabled,It=tt.init(this.clippingPlanes,Ft),y=Dt.get(S,C.length),y.init(),C.push(y),W.enabled===!0&&W.isPresenting===!0){const dt=b.xr.getDepthSensingMesh();dt!==null&&Vc(dt,D,-1/0,b.sortObjects)}Vc(S,D,0,b.sortObjects),y.finish(),b.sortObjects===!0&&y.sort(_e,ge),Ht=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,Ht&&Mt.addToRenderList(y,S),this.info.render.frame++,It===!0&&tt.beginShadows();const B=w.state.shadowsArray;if(vt.render(B,S,D),It===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(k&&v.hasRenderPass())===!1){const dt=y.opaque,ct=y.transmissive;if(w.setupLights(),D.isArrayCamera){const St=D.cameras;if(ct.length>0)for(let Tt=0,Ot=St.length;Tt<Ot;Tt++){const Xt=St[Tt];vf(dt,ct,S,Xt)}Ht&&Mt.render(S);for(let Tt=0,Ot=St.length;Tt<Ot;Tt++){const Xt=St[Tt];_f(y,S,Xt,Xt.viewport)}}else ct.length>0&&vf(dt,ct,S,D),Ht&&Mt.render(S),_f(y,S,D)}V!==null&&F===0&&(I.updateMultisampleRenderTarget(V),I.updateRenderTargetMipmap(V)),k&&v.end(b),S.isScene===!0&&S.onAfterRender(b,S,D),et.resetDefaultState(),Y=-1,z=null,A.pop(),A.length>0?(w=A[A.length-1],It===!0&&tt.setGlobalState(b.clippingPlanes,w.state.camera)):w=null,C.pop(),C.length>0?y=C[C.length-1]:y=null};function Vc(S,D,G,k){if(S.visible===!1)return;if(S.layers.test(D.layers)){if(S.isGroup)G=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(D);else if(S.isLight)w.pushLight(S),S.castShadow&&w.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||Bt.intersectsSprite(S)){k&&se.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Ye);const dt=_t.update(S),ct=S.material;ct.visible&&y.push(S,dt,ct,G,se.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||Bt.intersectsObject(S))){const dt=_t.update(S),ct=S.material;if(k&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),se.copy(S.boundingSphere.center)):(dt.boundingSphere===null&&dt.computeBoundingSphere(),se.copy(dt.boundingSphere.center)),se.applyMatrix4(S.matrixWorld).applyMatrix4(Ye)),Array.isArray(ct)){const St=dt.groups;for(let Tt=0,Ot=St.length;Tt<Ot;Tt++){const Xt=St[Tt],Rt=ct[Xt.materialIndex];Rt&&Rt.visible&&y.push(S,dt,Rt,G,se.z,Xt)}}else ct.visible&&y.push(S,dt,ct,G,se.z,null)}}const ot=S.children;for(let dt=0,ct=ot.length;dt<ct;dt++)Vc(ot[dt],D,G,k)}function _f(S,D,G,k){const{opaque:B,transmissive:ot,transparent:dt}=S;w.setupLightsView(G),It===!0&&tt.setGlobalState(b.clippingPlanes,G),k&&yt.viewport(H.copy(k)),B.length>0&&Ba(B,D,G),ot.length>0&&Ba(ot,D,G),dt.length>0&&Ba(dt,D,G),yt.buffers.depth.setTest(!0),yt.buffers.depth.setMask(!0),yt.buffers.color.setMask(!0),yt.setPolygonOffset(!1)}function vf(S,D,G,k){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[k.id]===void 0){const Rt=ie.has("EXT_color_buffer_half_float")||ie.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[k.id]=new pi(1,1,{generateMipmaps:!0,type:Rt?Oi:kn,minFilter:Lr,samples:Math.max(4,pe.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace})}const ot=w.state.transmissionRenderTarget[k.id],dt=k.viewport||H;ot.setSize(dt.z*b.transmissionResolutionScale,dt.w*b.transmissionResolutionScale);const ct=b.getRenderTarget(),St=b.getActiveCubeFace(),Tt=b.getActiveMipmapLevel();b.setRenderTarget(ot),b.getClearColor(K),lt=b.getClearAlpha(),lt<1&&b.setClearColor(16777215,.5),b.clear(),Ht&&Mt.render(G);const Ot=b.toneMapping;b.toneMapping=di;const Xt=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),w.setupLightsView(k),It===!0&&tt.setGlobalState(b.clippingPlanes,k),Ba(S,G,k),I.updateMultisampleRenderTarget(ot),I.updateRenderTargetMipmap(ot),ie.has("WEBGL_multisampled_render_to_texture")===!1){let Rt=!1;for(let ce=0,Le=D.length;ce<Le;ce++){const Te=D[ce],{object:le,geometry:en,material:Et,group:xn}=Te;if(Et.side===Li&&le.layers.test(k.layers)){const Jt=Et.side;Et.side=gn,Et.needsUpdate=!0,xf(le,G,k,en,Et,xn),Et.side=Jt,Et.needsUpdate=!0,Rt=!0}}Rt===!0&&(I.updateMultisampleRenderTarget(ot),I.updateRenderTargetMipmap(ot))}b.setRenderTarget(ct,St,Tt),b.setClearColor(K,lt),Xt!==void 0&&(k.viewport=Xt),b.toneMapping=Ot}function Ba(S,D,G){const k=D.isScene===!0?D.overrideMaterial:null;for(let B=0,ot=S.length;B<ot;B++){const dt=S[B],{object:ct,geometry:St,group:Tt}=dt;let Ot=dt.material;Ot.allowOverride===!0&&k!==null&&(Ot=k),ct.layers.test(G.layers)&&xf(ct,D,G,St,Ot,Tt)}}function xf(S,D,G,k,B,ot){S.onBeforeRender(b,D,G,k,B,ot),S.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),B.onBeforeRender(b,D,G,k,S,ot),B.transparent===!0&&B.side===Li&&B.forceSinglePass===!1?(B.side=gn,B.needsUpdate=!0,b.renderBufferDirect(G,D,k,B,S,ot),B.side=lr,B.needsUpdate=!0,b.renderBufferDirect(G,D,k,B,S,ot),B.side=Li):b.renderBufferDirect(G,D,k,B,S,ot),S.onAfterRender(b,D,G,k,B,ot)}function ka(S,D,G){D.isScene!==!0&&(D=ue);const k=_.get(S),B=w.state.lights,ot=w.state.shadowsArray,dt=B.state.version,ct=it.getParameters(S,B.state,ot,D,G),St=it.getProgramCacheKey(ct);let Tt=k.programs;k.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?D.environment:null,k.fog=D.fog;const Ot=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;k.envMap=q.get(S.envMap||k.environment,Ot),k.envMapRotation=k.environment!==null&&S.envMap===null?D.environmentRotation:S.envMapRotation,Tt===void 0&&(S.addEventListener("dispose",ae),Tt=new Map,k.programs=Tt);let Xt=Tt.get(St);if(Xt!==void 0){if(k.currentProgram===Xt&&k.lightsStateVersion===dt)return Sf(S,ct),Xt}else ct.uniforms=it.getUniforms(S),S.onBeforeCompile(ct,b),Xt=it.acquireProgram(ct,St),Tt.set(St,Xt),k.uniforms=ct.uniforms;const Rt=k.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Rt.clippingPlanes=tt.uniform),Sf(S,ct),k.needsLights=Zg(S),k.lightsStateVersion=dt,k.needsLights&&(Rt.ambientLightColor.value=B.state.ambient,Rt.lightProbe.value=B.state.probe,Rt.directionalLights.value=B.state.directional,Rt.directionalLightShadows.value=B.state.directionalShadow,Rt.spotLights.value=B.state.spot,Rt.spotLightShadows.value=B.state.spotShadow,Rt.rectAreaLights.value=B.state.rectArea,Rt.ltc_1.value=B.state.rectAreaLTC1,Rt.ltc_2.value=B.state.rectAreaLTC2,Rt.pointLights.value=B.state.point,Rt.pointLightShadows.value=B.state.pointShadow,Rt.hemisphereLights.value=B.state.hemi,Rt.directionalShadowMatrix.value=B.state.directionalShadowMatrix,Rt.spotLightMatrix.value=B.state.spotLightMatrix,Rt.spotLightMap.value=B.state.spotLightMap,Rt.pointShadowMatrix.value=B.state.pointShadowMatrix),k.currentProgram=Xt,k.uniformsList=null,Xt}function Mf(S){if(S.uniformsList===null){const D=S.currentProgram.getUniforms();S.uniformsList=Do.seqWithValue(D.seq,S.uniforms)}return S.uniformsList}function Sf(S,D){const G=_.get(S);G.outputColorSpace=D.outputColorSpace,G.batching=D.batching,G.batchingColor=D.batchingColor,G.instancing=D.instancing,G.instancingColor=D.instancingColor,G.instancingMorph=D.instancingMorph,G.skinning=D.skinning,G.morphTargets=D.morphTargets,G.morphNormals=D.morphNormals,G.morphColors=D.morphColors,G.morphTargetsCount=D.morphTargetsCount,G.numClippingPlanes=D.numClippingPlanes,G.numIntersection=D.numClipIntersection,G.vertexAlphas=D.vertexAlphas,G.vertexTangents=D.vertexTangents,G.toneMapping=D.toneMapping}function jg(S,D,G,k,B){D.isScene!==!0&&(D=ue),I.resetTextureUnits();const ot=D.fog,dt=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?D.environment:null,ct=V===null?b.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:Es,St=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Tt=q.get(k.envMap||dt,St),Ot=k.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Xt=!!G.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Rt=!!G.morphAttributes.position,ce=!!G.morphAttributes.normal,Le=!!G.morphAttributes.color;let Te=di;k.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(Te=b.toneMapping);const le=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,en=le!==void 0?le.length:0,Et=_.get(k),xn=w.state.lights;if(It===!0&&(Ft===!0||S!==z)){const qe=S===z&&k.id===Y;tt.setState(k,S,qe)}let Jt=!1;k.version===Et.__version?(Et.needsLights&&Et.lightsStateVersion!==xn.state.version||Et.outputColorSpace!==ct||B.isBatchedMesh&&Et.batching===!1||!B.isBatchedMesh&&Et.batching===!0||B.isBatchedMesh&&Et.batchingColor===!0&&B.colorTexture===null||B.isBatchedMesh&&Et.batchingColor===!1&&B.colorTexture!==null||B.isInstancedMesh&&Et.instancing===!1||!B.isInstancedMesh&&Et.instancing===!0||B.isSkinnedMesh&&Et.skinning===!1||!B.isSkinnedMesh&&Et.skinning===!0||B.isInstancedMesh&&Et.instancingColor===!0&&B.instanceColor===null||B.isInstancedMesh&&Et.instancingColor===!1&&B.instanceColor!==null||B.isInstancedMesh&&Et.instancingMorph===!0&&B.morphTexture===null||B.isInstancedMesh&&Et.instancingMorph===!1&&B.morphTexture!==null||Et.envMap!==Tt||k.fog===!0&&Et.fog!==ot||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==tt.numPlanes||Et.numIntersection!==tt.numIntersection)||Et.vertexAlphas!==Ot||Et.vertexTangents!==Xt||Et.morphTargets!==Rt||Et.morphNormals!==ce||Et.morphColors!==Le||Et.toneMapping!==Te||Et.morphTargetsCount!==en)&&(Jt=!0):(Jt=!0,Et.__version=k.version);let Yn=Et.currentProgram;Jt===!0&&(Yn=ka(k,D,B));let ni=!1,mr=!1,Zr=!1;const fe=Yn.getUniforms(),Je=Et.uniforms;if(yt.useProgram(Yn.program)&&(ni=!0,mr=!0,Zr=!0),k.id!==Y&&(Y=k.id,mr=!0),ni||z!==S){yt.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),fe.setValue(P,"projectionMatrix",S.projectionMatrix),fe.setValue(P,"viewMatrix",S.matrixWorldInverse);const Yi=fe.map.cameraPosition;Yi!==void 0&&Yi.setValue(P,jt.setFromMatrixPosition(S.matrixWorld)),pe.logarithmicDepthBuffer&&fe.setValue(P,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&fe.setValue(P,"isOrthographic",S.isOrthographicCamera===!0),z!==S&&(z=S,mr=!0,Zr=!0)}if(Et.needsLights&&(xn.state.directionalShadowMap.length>0&&fe.setValue(P,"directionalShadowMap",xn.state.directionalShadowMap,I),xn.state.spotShadowMap.length>0&&fe.setValue(P,"spotShadowMap",xn.state.spotShadowMap,I),xn.state.pointShadowMap.length>0&&fe.setValue(P,"pointShadowMap",xn.state.pointShadowMap,I)),B.isSkinnedMesh){fe.setOptional(P,B,"bindMatrix"),fe.setOptional(P,B,"bindMatrixInverse");const qe=B.skeleton;qe&&(qe.boneTexture===null&&qe.computeBoneTexture(),fe.setValue(P,"boneTexture",qe.boneTexture,I))}B.isBatchedMesh&&(fe.setOptional(P,B,"batchingTexture"),fe.setValue(P,"batchingTexture",B._matricesTexture,I),fe.setOptional(P,B,"batchingIdTexture"),fe.setValue(P,"batchingIdTexture",B._indirectTexture,I),fe.setOptional(P,B,"batchingColorTexture"),B._colorsTexture!==null&&fe.setValue(P,"batchingColorTexture",B._colorsTexture,I));const Xi=G.morphAttributes;if((Xi.position!==void 0||Xi.normal!==void 0||Xi.color!==void 0)&&ht.update(B,G,Yn),(mr||Et.receiveShadow!==B.receiveShadow)&&(Et.receiveShadow=B.receiveShadow,fe.setValue(P,"receiveShadow",B.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&D.environment!==null&&(Je.envMapIntensity.value=D.environmentIntensity),Je.dfgLUT!==void 0&&(Je.dfgLUT.value=mM()),mr&&(fe.setValue(P,"toneMappingExposure",b.toneMappingExposure),Et.needsLights&&Kg(Je,Zr),ot&&k.fog===!0&&Pt.refreshFogUniforms(Je,ot),Pt.refreshMaterialUniforms(Je,k,Vt,ft,w.state.transmissionRenderTarget[S.id]),Do.upload(P,Mf(Et),Je,I)),k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Do.upload(P,Mf(Et),Je,I),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&fe.setValue(P,"center",B.center),fe.setValue(P,"modelViewMatrix",B.modelViewMatrix),fe.setValue(P,"normalMatrix",B.normalMatrix),fe.setValue(P,"modelMatrix",B.matrixWorld),k.isShaderMaterial||k.isRawShaderMaterial){const qe=k.uniformsGroups;for(let Yi=0,Jr=qe.length;Yi<Jr;Yi++){const yf=qe[Yi];pt.update(yf,Yn),pt.bind(yf,Yn)}}return Yn}function Kg(S,D){S.ambientLightColor.needsUpdate=D,S.lightProbe.needsUpdate=D,S.directionalLights.needsUpdate=D,S.directionalLightShadows.needsUpdate=D,S.pointLights.needsUpdate=D,S.pointLightShadows.needsUpdate=D,S.spotLights.needsUpdate=D,S.spotLightShadows.needsUpdate=D,S.rectAreaLights.needsUpdate=D,S.hemisphereLights.needsUpdate=D}function Zg(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return F},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(S,D,G){const k=_.get(S);k.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),_.get(S.texture).__webglTexture=D,_.get(S.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:G,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,D){const G=_.get(S);G.__webglFramebuffer=D,G.__useDefaultFramebuffer=D===void 0};const Jg=P.createFramebuffer();this.setRenderTarget=function(S,D=0,G=0){V=S,R=D,F=G;let k=null,B=!1,ot=!1;if(S){const ct=_.get(S);if(ct.__useDefaultFramebuffer!==void 0){yt.bindFramebuffer(P.FRAMEBUFFER,ct.__webglFramebuffer),H.copy(S.viewport),O.copy(S.scissor),Q=S.scissorTest,yt.viewport(H),yt.scissor(O),yt.setScissorTest(Q),Y=-1;return}else if(ct.__webglFramebuffer===void 0)I.setupRenderTarget(S);else if(ct.__hasExternalTextures)I.rebindTextures(S,_.get(S.texture).__webglTexture,_.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Ot=S.depthTexture;if(ct.__boundDepthTexture!==Ot){if(Ot!==null&&_.has(Ot)&&(S.width!==Ot.image.width||S.height!==Ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(S)}}const St=S.texture;(St.isData3DTexture||St.isDataArrayTexture||St.isCompressedArrayTexture)&&(ot=!0);const Tt=_.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Tt[D])?k=Tt[D][G]:k=Tt[D],B=!0):S.samples>0&&I.useMultisampledRTT(S)===!1?k=_.get(S).__webglMultisampledFramebuffer:Array.isArray(Tt)?k=Tt[G]:k=Tt,H.copy(S.viewport),O.copy(S.scissor),Q=S.scissorTest}else H.copy($).multiplyScalar(Vt).floor(),O.copy(nt).multiplyScalar(Vt).floor(),Q=st;if(G!==0&&(k=Jg),yt.bindFramebuffer(P.FRAMEBUFFER,k)&&yt.drawBuffers(S,k),yt.viewport(H),yt.scissor(O),yt.setScissorTest(Q),B){const ct=_.get(S.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+D,ct.__webglTexture,G)}else if(ot){const ct=D;for(let St=0;St<S.textures.length;St++){const Tt=_.get(S.textures[St]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+St,Tt.__webglTexture,G,ct)}}else if(S!==null&&G!==0){const ct=_.get(S.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ct.__webglTexture,G)}Y=-1},this.readRenderTargetPixels=function(S,D,G,k,B,ot,dt,ct=0){if(!(S&&S.isWebGLRenderTarget)){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=_.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&dt!==void 0&&(St=St[dt]),St){yt.bindFramebuffer(P.FRAMEBUFFER,St);try{const Tt=S.textures[ct],Ot=Tt.format,Xt=Tt.type;if(S.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+ct),!pe.textureFormatReadable(Ot)){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!pe.textureTypeReadable(Xt)){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=S.width-k&&G>=0&&G<=S.height-B&&P.readPixels(D,G,k,B,rt.convert(Ot),rt.convert(Xt),ot)}finally{const Tt=V!==null?_.get(V).__webglFramebuffer:null;yt.bindFramebuffer(P.FRAMEBUFFER,Tt)}}},this.readRenderTargetPixelsAsync=async function(S,D,G,k,B,ot,dt,ct=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let St=_.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&dt!==void 0&&(St=St[dt]),St)if(D>=0&&D<=S.width-k&&G>=0&&G<=S.height-B){yt.bindFramebuffer(P.FRAMEBUFFER,St);const Tt=S.textures[ct],Ot=Tt.format,Xt=Tt.type;if(S.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+ct),!pe.textureFormatReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!pe.textureTypeReadable(Xt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Rt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Rt),P.bufferData(P.PIXEL_PACK_BUFFER,ot.byteLength,P.STREAM_READ),P.readPixels(D,G,k,B,rt.convert(Ot),rt.convert(Xt),0);const ce=V!==null?_.get(V).__webglFramebuffer:null;yt.bindFramebuffer(P.FRAMEBUFFER,ce);const Le=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await B_(P,Le,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Rt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ot),P.deleteBuffer(Rt),P.deleteSync(Le),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,D=null,G=0){const k=Math.pow(2,-G),B=Math.floor(S.image.width*k),ot=Math.floor(S.image.height*k),dt=D!==null?D.x:0,ct=D!==null?D.y:0;I.setTexture2D(S,0),P.copyTexSubImage2D(P.TEXTURE_2D,G,0,0,dt,ct,B,ot),yt.unbindTexture()};const Qg=P.createFramebuffer(),t_=P.createFramebuffer();this.copyTextureToTexture=function(S,D,G=null,k=null,B=0,ot=0){let dt,ct,St,Tt,Ot,Xt,Rt,ce,Le;const Te=S.isCompressedTexture?S.mipmaps[ot]:S.image;if(G!==null)dt=G.max.x-G.min.x,ct=G.max.y-G.min.y,St=G.isBox3?G.max.z-G.min.z:1,Tt=G.min.x,Ot=G.min.y,Xt=G.isBox3?G.min.z:0;else{const Je=Math.pow(2,-B);dt=Math.floor(Te.width*Je),ct=Math.floor(Te.height*Je),S.isDataArrayTexture?St=Te.depth:S.isData3DTexture?St=Math.floor(Te.depth*Je):St=1,Tt=0,Ot=0,Xt=0}k!==null?(Rt=k.x,ce=k.y,Le=k.z):(Rt=0,ce=0,Le=0);const le=rt.convert(D.format),en=rt.convert(D.type);let Et;D.isData3DTexture?(I.setTexture3D(D,0),Et=P.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(I.setTexture2DArray(D,0),Et=P.TEXTURE_2D_ARRAY):(I.setTexture2D(D,0),Et=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,D.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,D.unpackAlignment);const xn=P.getParameter(P.UNPACK_ROW_LENGTH),Jt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Yn=P.getParameter(P.UNPACK_SKIP_PIXELS),ni=P.getParameter(P.UNPACK_SKIP_ROWS),mr=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,Te.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Te.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Tt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ot),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Xt);const Zr=S.isDataArrayTexture||S.isData3DTexture,fe=D.isDataArrayTexture||D.isData3DTexture;if(S.isDepthTexture){const Je=_.get(S),Xi=_.get(D),qe=_.get(Je.__renderTarget),Yi=_.get(Xi.__renderTarget);yt.bindFramebuffer(P.READ_FRAMEBUFFER,qe.__webglFramebuffer),yt.bindFramebuffer(P.DRAW_FRAMEBUFFER,Yi.__webglFramebuffer);for(let Jr=0;Jr<St;Jr++)Zr&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,_.get(S).__webglTexture,B,Xt+Jr),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,_.get(D).__webglTexture,ot,Le+Jr)),P.blitFramebuffer(Tt,Ot,dt,ct,Rt,ce,dt,ct,P.DEPTH_BUFFER_BIT,P.NEAREST);yt.bindFramebuffer(P.READ_FRAMEBUFFER,null),yt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(B!==0||S.isRenderTargetTexture||_.has(S)){const Je=_.get(S),Xi=_.get(D);yt.bindFramebuffer(P.READ_FRAMEBUFFER,Qg),yt.bindFramebuffer(P.DRAW_FRAMEBUFFER,t_);for(let qe=0;qe<St;qe++)Zr?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Je.__webglTexture,B,Xt+qe):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Je.__webglTexture,B),fe?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Xi.__webglTexture,ot,Le+qe):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Xi.__webglTexture,ot),B!==0?P.blitFramebuffer(Tt,Ot,dt,ct,Rt,ce,dt,ct,P.COLOR_BUFFER_BIT,P.NEAREST):fe?P.copyTexSubImage3D(Et,ot,Rt,ce,Le+qe,Tt,Ot,dt,ct):P.copyTexSubImage2D(Et,ot,Rt,ce,Tt,Ot,dt,ct);yt.bindFramebuffer(P.READ_FRAMEBUFFER,null),yt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else fe?S.isDataTexture||S.isData3DTexture?P.texSubImage3D(Et,ot,Rt,ce,Le,dt,ct,St,le,en,Te.data):D.isCompressedArrayTexture?P.compressedTexSubImage3D(Et,ot,Rt,ce,Le,dt,ct,St,le,Te.data):P.texSubImage3D(Et,ot,Rt,ce,Le,dt,ct,St,le,en,Te):S.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,ot,Rt,ce,dt,ct,le,en,Te.data):S.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,ot,Rt,ce,Te.width,Te.height,le,Te.data):P.texSubImage2D(P.TEXTURE_2D,ot,Rt,ce,dt,ct,le,en,Te);P.pixelStorei(P.UNPACK_ROW_LENGTH,xn),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Jt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Yn),P.pixelStorei(P.UNPACK_SKIP_ROWS,ni),P.pixelStorei(P.UNPACK_SKIP_IMAGES,mr),ot===0&&D.generateMipmaps&&P.generateMipmap(Et),yt.unbindTexture()},this.initRenderTarget=function(S){_.get(S).__webglFramebuffer===void 0&&I.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?I.setTextureCube(S,0):S.isData3DTexture?I.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?I.setTexture2DArray(S,0):I.setTexture2D(S,0),yt.unbindTexture()},this.resetState=function(){R=0,F=0,V=null,yt.reset(),et.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ui}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=Kt._getDrawingBufferColorSpace(t),n.unpackColorSpace=Kt._getUnpackColorSpace()}}class _M{constructor(){kt(this,"_listeners",new Map)}on(t,n){return this._listeners.has(t)||this._listeners.set(t,new Set),this._listeners.get(t).add(n),this}off(t,n){var i;return(i=this._listeners.get(t))==null||i.delete(n),this}emit(t,n){var i;(i=this._listeners.get(t))==null||i.forEach(r=>r(n))}removeAllListeners(t){return t?this._listeners.delete(t):this._listeners.clear(),this}}var As=typeof self<"u"?self:{};function Am(e,t){t:{for(var n=["CLOSURE_FLAGS"],i=As,r=0;r<n.length;r++)if((i=i[n[r]])==null){n=null;break t}n=i}return(e=n&&n[e])!=null?e:t}function yr(){throw Error("Invalid UTF8")}function Ed(e,t){return t=String.fromCharCode.apply(null,t),e==null?t:e+t}let go,yl;const vM=typeof TextDecoder<"u";let xM;const MM=typeof TextEncoder<"u";function Tm(e){if(MM)e=(xM||(xM=new TextEncoder)).encode(e);else{let n=0;const i=new Uint8Array(3*e.length);for(let r=0;r<e.length;r++){var t=e.charCodeAt(r);if(t<128)i[n++]=t;else{if(t<2048)i[n++]=t>>6|192;else{if(t>=55296&&t<=57343){if(t<=56319&&r<e.length){const s=e.charCodeAt(++r);if(s>=56320&&s<=57343){t=1024*(t-55296)+s-56320+65536,i[n++]=t>>18|240,i[n++]=t>>12&63|128,i[n++]=t>>6&63|128,i[n++]=63&t|128;continue}r--}t=65533}i[n++]=t>>12|224,i[n++]=t>>6&63|128}i[n++]=63&t|128}}e=n===i.length?i:i.subarray(0,n)}return e}function wm(e){As.setTimeout(()=>{throw e},0)}var Rh,SM=Am(610401301,!1),bd=Am(748402147,!0);function Ad(){var e=As.navigator;return e&&(e=e.userAgent)?e:""}const Td=As.navigator;function pc(e){return pc[" "](e),e}Rh=Td&&Td.userAgentData||null,pc[" "]=function(){};const Rm={};let da=null;function yM(e){const t=e.length;let n=3*t/4;n%3?n=Math.floor(n):"=.".indexOf(e[t-1])!=-1&&(n="=.".indexOf(e[t-2])!=-1?n-2:n-1);const i=new Uint8Array(n);let r=0;return function(s,a){function o(l){for(;c<s.length;){const u=s.charAt(c++),f=da[u];if(f!=null)return f;if(!/^[\s\xa0]*$/.test(u))throw Error("Unknown base64 encoding at char: "+u)}return l}Cm();let c=0;for(;;){const l=o(-1),u=o(0),f=o(64),h=o(64);if(h===64&&l===-1)break;a(l<<2|u>>4),f!=64&&(a(u<<4&240|f>>2),h!=64&&a(f<<6&192|h))}}(e,function(s){i[r++]=s}),r!==n?i.subarray(0,r):i}function Cm(){if(!da){da={};var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),t=["+/=","+/","-_=","-_.","-_"];for(let n=0;n<5;n++){const i=e.concat(t[n].split(""));Rm[n]=i;for(let r=0;r<i.length;r++){const s=i[r];da[s]===void 0&&(da[s]=r)}}}}var EM=typeof Uint8Array<"u",Pm=!(!(SM&&Rh&&Rh.brands.length>0)&&(Ad().indexOf("Trident")!=-1||Ad().indexOf("MSIE")!=-1))&&typeof btoa=="function";const wd=/[-_.]/g,bM={"-":"+",_:"/",".":"="};function AM(e){return bM[e]||""}function Lm(e){if(!Pm)return yM(e);e=wd.test(e)?e.replace(wd,AM):e,e=atob(e);const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}function du(e){return EM&&e!=null&&e instanceof Uint8Array}var Ts={};function Xr(){return TM||(TM=new mi(null,Ts))}function pu(e){Im(Ts);var t=e.g;return(t=t==null||du(t)?t:typeof t=="string"?Lm(t):null)==null?t:e.g=t}var mi=class{h(){return new Uint8Array(pu(this)||0)}constructor(e,t){if(Im(t),this.g=e,e!=null&&e.length===0)throw Error("ByteString should be constructed with non-empty values")}};let TM,wM;function Im(e){if(e!==Ts)throw Error("illegal external caller")}function Dm(e,t){e.__closure__error__context__984382||(e.__closure__error__context__984382={}),e.__closure__error__context__984382.severity=t}function Ch(e){return Dm(e=Error(e),"warning"),e}function ws(e,t){if(e!=null){var n=wM??(wM={}),i=n[e]||0;i>=t||(n[e]=i+1,Dm(e=Error(),"incident"),wm(e))}}function Gs(){return typeof BigInt=="function"}var Hs=typeof Symbol=="function"&&typeof Symbol()=="symbol";function xi(e,t,n=!1){return typeof Symbol=="function"&&typeof Symbol()=="symbol"?n&&Symbol.for&&e?Symbol.for(e):e!=null?Symbol(e):Symbol():t}var RM=xi("jas",void 0,!0),Rd=xi(void 0,"0di"),la=xi(void 0,"1oa"),An=xi(void 0,Symbol()),CM=xi(void 0,"0ub"),PM=xi(void 0,"0ubs"),Ph=xi(void 0,"0ubsb"),LM=xi(void 0,"0actk"),Rs=xi("m_m","Pa",!0),Cd=xi();const Um={Ga:{value:0,configurable:!0,writable:!0,enumerable:!1}},Fm=Object.defineProperties,bt=Hs?RM:"Ga";var $r;const Pd=[];function Pa(e,t){Hs||bt in e||Fm(e,Um),e[bt]|=t}function We(e,t){Hs||bt in e||Fm(e,Um),e[bt]=t}function La(e){return Pa(e,34),e}function ya(e){return Pa(e,8192),e}We(Pd,7),$r=Object.freeze(Pd);var Cs={};function wn(e,t){return t===void 0?e.h!==Yr&&!!(2&(0|e.v[bt])):!!(2&t)&&e.h!==Yr}const Yr={};function mu(e,t){if(e!=null){if(typeof e=="string")e=e?new mi(e,Ts):Xr();else if(e.constructor!==mi)if(du(e))e=e.length?new mi(new Uint8Array(e),Ts):Xr();else{if(!t)throw Error();e=void 0}}return e}class Ld{constructor(t,n,i){this.g=t,this.h=n,this.l=i}next(){const t=this.g.next();return t.done||(t.value=this.h.call(this.l,t.value)),t}[Symbol.iterator](){return this}}var IM=Object.freeze({});function Nm(e,t,n){const i=128&t?0:-1,r=e.length;var s;(s=!!r)&&(s=(s=e[r-1])!=null&&typeof s=="object"&&s.constructor===Object);const a=r+(s?-1:0);for(t=128&t?1:0;t<a;t++)n(t-i,e[t]);if(s){e=e[r-1];for(const o in e)!isNaN(o)&&n(+o,e[o])}}var Om={};function Ws(e){return 128&e?Om:void 0}function mc(e){return e.Na=!0,e}var DM=mc(e=>typeof e=="number"),Id=mc(e=>typeof e=="string"),UM=mc(e=>typeof e=="boolean"),gc=typeof As.BigInt=="function"&&typeof As.BigInt(0)=="bigint";function Tn(e){var t=e;if(Id(t)){if(!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(t))throw Error(String(t))}else if(DM(t)&&!Number.isSafeInteger(t))throw Error(String(t));return gc?BigInt(e):e=UM(e)?e?"1":"0":Id(e)?e.trim()||"0":String(e)}var Lh=mc(e=>gc?e>=NM&&e<=BM:e[0]==="-"?Dd(e,FM):Dd(e,OM));const FM=Number.MIN_SAFE_INTEGER.toString(),NM=gc?BigInt(Number.MIN_SAFE_INTEGER):void 0,OM=Number.MAX_SAFE_INTEGER.toString(),BM=gc?BigInt(Number.MAX_SAFE_INTEGER):void 0;function Dd(e,t){if(e.length>t.length)return!1;if(e.length<t.length||e===t)return!0;for(let n=0;n<e.length;n++){const i=e[n],r=t[n];if(i>r)return!1;if(i<r)return!0}}const kM=typeof Uint8Array.prototype.slice=="function";let zM,ye=0,Ne=0;function Ud(e){const t=e>>>0;ye=t,Ne=(e-t)/4294967296>>>0}function Ps(e){if(e<0){Ud(-e);const[t,n]=vu(ye,Ne);ye=t>>>0,Ne=n>>>0}else Ud(e)}function gu(e){const t=zM||(zM=new DataView(new ArrayBuffer(8)));t.setFloat32(0,+e,!0),Ne=0,ye=t.getUint32(0,!0)}function Bm(e,t){const n=4294967296*t+(e>>>0);return Number.isSafeInteger(n)?n:Ea(e,t)}function VM(e,t){return Tn(Gs()?BigInt.asUintN(64,(BigInt(t>>>0)<<BigInt(32))+BigInt(e>>>0)):Ea(e,t))}function km(e,t){return Gs()?Tn(BigInt.asIntN(64,(BigInt.asUintN(32,BigInt(t))<<BigInt(32))+BigInt.asUintN(32,BigInt(e)))):Tn(_u(e,t))}function Ea(e,t){if(e>>>=0,(t>>>=0)<=2097151)var n=""+(4294967296*t+e);else Gs()?n=""+(BigInt(t)<<BigInt(32)|BigInt(e)):(e=(16777215&e)+6777216*(n=16777215&(e>>>24|t<<8))+6710656*(t=t>>16&65535),n+=8147497*t,t*=2,e>=1e7&&(n+=e/1e7>>>0,e%=1e7),n>=1e7&&(t+=n/1e7>>>0,n%=1e7),n=t+Fd(n)+Fd(e));return n}function Fd(e){return e=String(e),"0000000".slice(e.length)+e}function _u(e,t){if(2147483648&t)if(Gs())e=""+(BigInt(0|t)<<BigInt(32)|BigInt(e>>>0));else{const[n,i]=vu(e,t);e="-"+Ea(n,i)}else e=Ea(e,t);return e}function _c(e){if(e.length<16)Ps(Number(e));else if(Gs())e=BigInt(e),ye=Number(e&BigInt(4294967295))>>>0,Ne=Number(e>>BigInt(32)&BigInt(4294967295));else{const t=+(e[0]==="-");Ne=ye=0;const n=e.length;for(let i=t,r=(n-t)%6+t;r<=n;i=r,r+=6){const s=Number(e.slice(i,r));Ne*=1e6,ye=1e6*ye+s,ye>=4294967296&&(Ne+=Math.trunc(ye/4294967296),Ne>>>=0,ye>>>=0)}if(t){const[i,r]=vu(ye,Ne);ye=i,Ne=r}}}function vu(e,t){return t=~t,e?e=1+~e:t+=1,[e,t]}function Zn(e){return Array.prototype.slice.call(e)}const Ia=typeof BigInt=="function"?BigInt.asIntN:void 0,GM=typeof BigInt=="function"?BigInt.asUintN:void 0,qr=Number.isSafeInteger,vc=Number.isFinite,Ls=Math.trunc,HM=Tn(0);function pa(e){if(e!=null&&typeof e!="number")throw Error(`Value of float/double field must be a number, found ${typeof e}: ${e}`);return e}function fi(e){return e==null||typeof e=="number"?e:e==="NaN"||e==="Infinity"||e==="-Infinity"?Number(e):void 0}function ba(e){if(e!=null&&typeof e!="boolean"){var t=typeof e;throw Error(`Expected boolean but got ${t!="object"?t:e?Array.isArray(e)?"array":t:"null"}: ${e}`)}return e}function zm(e){return e==null||typeof e=="boolean"?e:typeof e=="number"?!!e:void 0}const WM=/^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;function Da(e){switch(typeof e){case"bigint":return!0;case"number":return vc(e);case"string":return WM.test(e);default:return!1}}function Xs(e){if(e==null)return e;if(typeof e=="string"&&e)e=+e;else if(typeof e!="number")return;return vc(e)?0|e:void 0}function Vm(e){if(e==null)return e;if(typeof e=="string"&&e)e=+e;else if(typeof e!="number")return;return vc(e)?e>>>0:void 0}function Gm(e){const t=e.length;return(e[0]==="-"?t<20||t===20&&e<="-9223372036854775808":t<19||t===19&&e<="9223372036854775807")?e:(_c(e),_u(ye,Ne))}function xu(e){if(e=Ls(e),!qr(e)){Ps(e);var t=ye,n=Ne;(e=2147483648&n)&&(n=~n>>>0,(t=1+~t>>>0)==0&&(n=n+1>>>0)),e=typeof(t=Bm(t,n))=="number"?e?-t:t:e?"-"+t:t}return e}function Hm(e){var t=Ls(Number(e));return qr(t)?String(t):((t=e.indexOf("."))!==-1&&(e=e.substring(0,t)),Gm(e))}function Wm(e){var t=Ls(Number(e));return qr(t)?Tn(t):((t=e.indexOf("."))!==-1&&(e=e.substring(0,t)),Gs()?Tn(Ia(64,BigInt(e))):Tn(Gm(e)))}function Xm(e){return qr(e)?e=Tn(xu(e)):(e=Ls(e),qr(e)?e=String(e):(Ps(e),e=_u(ye,Ne)),e=Tn(e)),e}function Zo(e){const t=typeof e;return e==null?e:t==="bigint"?Tn(Ia(64,e)):Da(e)?t==="string"?Wm(e):Xm(e):void 0}function Ym(e){if(typeof e!="string")throw Error();return e}function Ua(e){if(e!=null&&typeof e!="string")throw Error();return e}function tn(e){return e==null||typeof e=="string"?e:void 0}function Mu(e,t,n,i){return e!=null&&e[Rs]===Cs?e:Array.isArray(e)?((i=(n=0|e[bt])|32&i|2&i)!==n&&We(e,i),new t(e)):(n?2&i?((e=t[Rd])||(La((e=new t).v),e=t[Rd]=e),t=e):t=new t:t=void 0,t)}function XM(e,t,n){if(t)t:{if(!Da(t=e))throw Ch("int64");switch(typeof t){case"string":t=Wm(t);break t;case"bigint":t=Tn(Ia(64,t));break t;default:t=Xm(t)}}else t=Zo(e);return(e=t)==null?n?HM:void 0:e}const YM={};let qM=function(){try{return pc(new class extends Map{constructor(){super()}}),!1}catch{return!0}}();class El{constructor(){this.g=new Map}get(t){return this.g.get(t)}set(t,n){return this.g.set(t,n),this.size=this.g.size,this}delete(t){return t=this.g.delete(t),this.size=this.g.size,t}clear(){this.g.clear(),this.size=this.g.size}has(t){return this.g.has(t)}entries(){return this.g.entries()}keys(){return this.g.keys()}values(){return this.g.values()}forEach(t,n){return this.g.forEach(t,n)}[Symbol.iterator](){return this.entries()}}const $M=qM?(Object.setPrototypeOf(El.prototype,Map.prototype),Object.defineProperties(El.prototype,{size:{value:0,configurable:!0,enumerable:!0,writable:!0}}),El):class extends Map{constructor(){super()}};function Nd(e){return e}function bl(e){if(2&e.J)throw Error("Cannot mutate an immutable Map")}var zi=class extends $M{constructor(e,t,n=Nd,i=Nd){super(),this.J=0|e[bt],this.K=t,this.S=n,this.fa=this.K?jM:i;for(let r=0;r<e.length;r++){const s=e[r],a=n(s[0],!1,!0);let o=s[1];t?o===void 0&&(o=null):o=i(s[1],!1,!0,void 0,void 0,this.J),super.set(a,o)}}V(e){return ya(Array.from(super.entries(),e))}clear(){bl(this),super.clear()}delete(e){return bl(this),super.delete(this.S(e,!0,!1))}entries(){if(this.K){var e=super.keys();e=new Ld(e,KM,this)}else e=super.entries();return e}values(){if(this.K){var e=super.keys();e=new Ld(e,zi.prototype.get,this)}else e=super.values();return e}forEach(e,t){this.K?super.forEach((n,i,r)=>{e.call(t,r.get(i),i,r)}):super.forEach(e,t)}set(e,t){return bl(this),(e=this.S(e,!0,!1))==null?this:t==null?(super.delete(e),this):super.set(e,this.fa(t,!0,!0,this.K,!1,this.J))}Ma(e){const t=this.S(e[0],!1,!0);e=e[1],e=this.K?e===void 0?null:e:this.fa(e,!1,!0,void 0,!1,this.J),super.set(t,e)}has(e){return super.has(this.S(e,!1,!1))}get(e){e=this.S(e,!1,!1);const t=super.get(e);if(t!==void 0){var n=this.K;return n?((n=this.fa(t,!1,!0,n,this.ra,this.J))!==t&&super.set(e,n),n):t}}[Symbol.iterator](){return this.entries()}};function jM(e,t,n,i,r,s){return e=Mu(e,i,n,s),r&&(e=yu(e)),e}function KM(e){return[e,this.get(e)]}let ZM;function Od(){return ZM||(ZM=new zi(La([]),void 0,void 0,void 0,YM))}function xc(e){return An?e[An]:void 0}function Jo(e,t){for(const n in e)!isNaN(n)&&t(e,+n,e[n])}zi.prototype.toJSON=void 0;var Ih=class{};const JM={Ka:!0};function QM(e,t){t<100||ws(PM,1)}function Mc(e,t,n,i){const r=i!==void 0;i=!!i;var s,a=An;!r&&Hs&&a&&(s=e[a])&&Jo(s,QM),a=[];var o=e.length;let c;s=4294967295;let l=!1;const u=!!(64&t),f=u?128&t?0:-1:void 0;1&t||(c=o&&e[o-1],c!=null&&typeof c=="object"&&c.constructor===Object?s=--o:c=void 0,!u||128&t||r||(l=!0,s=s-f+f)),t=void 0;for(var h=0;h<o;h++){let m=e[h];if(m!=null&&(m=n(m,i))!=null)if(u&&h>=s){const g=h-f;(t??(t={}))[g]=m}else a[h]=m}if(c)for(let m in c){if((o=c[m])==null||(o=n(o,i))==null)continue;let g;h=+m,u&&!Number.isNaN(h)&&(g=h+f)<s?a[g]=o:(t??(t={}))[m]=o}return t&&(l?a.push(t):a[s]=t),r&&An&&(e=xc(e))&&e instanceof Ih&&(a[An]=function(m){const g=new Ih;return Jo(m,(M,p,d)=>{g[p]=Zn(d)}),g.da=m.da,g}(e)),a}function tS(e){return e[0]=Aa(e[0]),e[1]=Aa(e[1]),e}function Aa(e){switch(typeof e){case"number":return Number.isFinite(e)?e:""+e;case"bigint":return Lh(e)?Number(e):""+e;case"boolean":return e?1:0;case"object":if(Array.isArray(e)){var t=0|e[bt];return e.length===0&&1&t?void 0:Mc(e,t,Aa)}if(e!=null&&e[Rs]===Cs)return qm(e);if(e instanceof mi){if((t=e.g)==null)e="";else if(typeof t=="string")e=t;else{if(Pm){for(var n="",i=0,r=t.length-10240;i<r;)n+=String.fromCharCode.apply(null,t.subarray(i,i+=10240));n+=String.fromCharCode.apply(null,i?t.subarray(i):t),t=btoa(n)}else{n===void 0&&(n=0),Cm(),n=Rm[n],i=Array(Math.floor(t.length/3)),r=n[64]||"";let l=0,u=0;for(;l<t.length-2;l+=3){var s=t[l],a=t[l+1],o=t[l+2],c=n[s>>2];s=n[(3&s)<<4|a>>4],a=n[(15&a)<<2|o>>6],o=n[63&o],i[u++]=c+s+a+o}switch(c=0,o=r,t.length-l){case 2:o=n[(15&(c=t[l+1]))<<2]||r;case 1:t=t[l],i[u]=n[t>>2]+n[(3&t)<<4|c>>4]+o+r}t=i.join("")}e=e.g=t}return e}return e instanceof zi?e=e.size!==0?e.V(tS):void 0:void 0}return e}let eS,nS;function qm(e){return Mc(e=e.v,0|e[bt],Aa)}function Nr(e,t){return $m(e,t[0],t[1])}function $m(e,t,n,i=0){if(e==null){var r=32;n?(e=[n],r|=128):e=[],t&&(r=-16760833&r|(1023&t)<<14)}else{if(!Array.isArray(e))throw Error("narr");if(r=0|e[bt],bd&&1&r)throw Error("rfarr");if(2048&r&&!(2&r)&&function(){if(bd)throw Error("carr");ws(LM,5)}(),256&r)throw Error("farr");if(64&r)return(r|i)!==r&&We(e,r|i),e;if(n&&(r|=128,n!==e[0]))throw Error("mid");t:{r|=64;var s=(n=e).length;if(s){var a=s-1;const c=n[a];if(c!=null&&typeof c=="object"&&c.constructor===Object){if((a-=t=128&r?0:-1)>=1024)throw Error("pvtlmt");for(var o in c)(s=+o)<a&&(n[s+t]=c[o],delete c[o]);r=-16760833&r|(1023&a)<<14;break t}}if(t){if((o=Math.max(t,s-(128&r?0:-1)))>1024)throw Error("spvt");r=-16760833&r|(1023&o)<<14}}}return We(e,64|r|i),e}function iS(e,t){if(typeof e!="object")return e;if(Array.isArray(e)){var n=0|e[bt];return e.length===0&&1&n?void 0:Bd(e,n,t)}if(e!=null&&e[Rs]===Cs)return kd(e);if(e instanceof zi){if(2&(t=e.J))return e;if(!e.size)return;if(n=La(e.V()),e.K)for(e=0;e<n.length;e++){const i=n[e];let r=i[1];r=r==null||typeof r!="object"?void 0:r!=null&&r[Rs]===Cs?kd(r):Array.isArray(r)?Bd(r,0|r[bt],!!(32&t)):void 0,i[1]=r}return n}return e instanceof mi?e:void 0}function Bd(e,t,n){return 2&t||(!n||4096&t||16&t?e=Ys(e,t,!1,n&&!(16&t)):(Pa(e,34),4&t&&Object.freeze(e))),e}function Su(e,t,n){return e=new e.constructor(t),n&&(e.h=Yr),e.m=Yr,e}function kd(e){const t=e.v,n=0|t[bt];return wn(e,n)?e:Eu(e,t,n)?Su(e,t):Ys(t,n)}function Ys(e,t,n,i){return i??(i=!!(34&t)),e=Mc(e,t,iS,i),i=32,n&&(i|=2),We(e,t=16769217&t|i),e}function yu(e){const t=e.v,n=0|t[bt];return wn(e,n)?Eu(e,t,n)?Su(e,t,!0):new e.constructor(Ys(t,n,!1)):e}function qs(e){if(e.h!==Yr)return!1;var t=e.v;return Pa(t=Ys(t,0|t[bt]),2048),e.v=t,e.h=void 0,e.m=void 0,!0}function $s(e){if(!qs(e)&&wn(e,0|e.v[bt]))throw Error()}function jr(e,t){t===void 0&&(t=0|e[bt]),32&t&&!(4096&t)&&We(e,4096|t)}function Eu(e,t,n){return!!(2&n)||!(!(32&n)||4096&n)&&(We(t,2|n),e.h=Yr,!0)}const jm=Tn(0),Qi={};function Ee(e,t,n,i,r){if((t=Vi(e.v,t,n,r))!==null||i&&e.m!==Yr)return t}function Vi(e,t,n,i){if(t===-1)return null;const r=t+(n?0:-1),s=e.length-1;let a,o;if(!(s<1+(n?0:-1))){if(r>=s)if(a=e[s],a!=null&&typeof a=="object"&&a.constructor===Object)n=a[t],o=!0;else{if(r!==s)return;n=a}else n=e[r];if(i&&n!=null){if((i=i(n))==null)return i;if(!Object.is(i,n))return o?a[t]=i:e[r]=i,i}return n}}function he(e,t,n,i){$s(e),ze(e=e.v,0|e[bt],t,n,i)}function ze(e,t,n,i,r){const s=n+(r?0:-1);var a=e.length-1;if(a>=1+(r?0:-1)&&s>=a){const o=e[a];if(o!=null&&typeof o=="object"&&o.constructor===Object)return o[n]=i,t}return s<=a?(e[s]=i,t):(i!==void 0&&(n>=(a=(t??(t=0|e[bt]))>>14&1023||536870912)?i!=null&&(e[a+(r?0:-1)]={[n]:i}):e[s]=i),t)}function Ur(){return IM===void 0?2:4}function Fr(e,t,n,i,r){let s=e.v,a=0|s[bt];i=wn(e,a)?1:i,r=!!r||i===3,i===2&&qs(e)&&(s=e.v,a=0|s[bt]);let o=(e=bu(s,t))===$r?7:0|e[bt],c=Au(o,a);var l=!(4&c);if(l){4&c&&(e=Zn(e),o=0,c=Br(c,a),a=ze(s,a,t,e));let u=0,f=0;for(;u<e.length;u++){const h=n(e[u]);h!=null&&(e[f++]=h)}f<u&&(e.length=f),n=-513&(4|c),c=n&=-1025,c&=-4097}return c!==o&&(We(e,c),2&c&&Object.freeze(e)),Km(e,c,s,a,t,i,l,r)}function Km(e,t,n,i,r,s,a,o){let c=t;return s===1||s===4&&(2&t||!(16&t)&&32&i)?Or(t)||((t|=!e.length||a&&!(4096&t)||32&i&&!(4096&t||16&t)?2:256)!==c&&We(e,t),Object.freeze(e)):(s===2&&Or(t)&&(e=Zn(e),c=0,t=Br(t,i),i=ze(n,i,r,e)),Or(t)||(o||(t|=16),t!==c&&We(e,t))),2&t||!(4096&t||16&t)||jr(n,i),e}function bu(e,t,n){return e=Vi(e,t,n),Array.isArray(e)?e:$r}function Au(e,t){return 2&t&&(e|=2),1|e}function Or(e){return!!(2&e)&&!!(4&e)||!!(256&e)}function Zm(e){return mu(e,!0)}function Jm(e){e=Zn(e);for(let t=0;t<e.length;t++){const n=e[t]=Zn(e[t]);Array.isArray(n[1])&&(n[1]=La(n[1]))}return ya(e)}function er(e,t,n,i){$s(e),ze(e=e.v,0|e[bt],t,(i==="0"?Number(n)===0:n===i)?void 0:n)}function js(e,t,n){if(2&t)throw Error();const i=Ws(t);let r=bu(e,n,i),s=r===$r?7:0|r[bt],a=Au(s,t);return(2&a||Or(a)||16&a)&&(a===s||Or(a)||We(r,a),r=Zn(r),s=0,a=Br(a,t),ze(e,t,n,r,i)),a&=-13,a!==s&&We(r,a),r}function Al(e,t){var n=H0;return wu(Tu(e=e.v),e,void 0,n)===t?t:-1}function Tu(e){if(Hs)return e[la]??(e[la]=new Map);if(la in e)return e[la];const t=new Map;return Object.defineProperty(e,la,{value:t}),t}function Qm(e,t,n,i,r){const s=Tu(e),a=wu(s,e,t,n,r);return a!==i&&(a&&(t=ze(e,t,a,void 0,r)),s.set(n,i)),t}function wu(e,t,n,i,r){let s=e.get(i);if(s!=null)return s;s=0;for(let a=0;a<i.length;a++){const o=i[a];Vi(t,o,r)!=null&&(s!==0&&(n=ze(t,n,s,void 0,r)),s=o)}return e.set(i,s),s}function Ru(e,t,n){let i=0|e[bt];const r=Ws(i),s=Vi(e,n,r);let a;if(s!=null&&s[Rs]===Cs){if(!wn(s))return qs(s),s.v;a=s.v}else Array.isArray(s)&&(a=s);if(a){const o=0|a[bt];2&o&&(a=Ys(a,o))}return a=Nr(a,t),a!==s&&ze(e,i,n,a,r),a}function t0(e,t,n,i,r){let s=!1;if((i=Vi(e,i,r,a=>{const o=Mu(a,n,!1,t);return s=o!==a&&o!=null,o}))!=null)return s&&!wn(i)&&jr(e,t),i}function te(e,t,n,i){let r=e.v,s=0|r[bt];if((t=t0(r,s,t,n,i))==null)return t;if(s=0|r[bt],!wn(e,s)){const a=yu(t);a!==t&&(qs(e)&&(r=e.v,s=0|r[bt]),s=ze(r,s,n,t=a,i),jr(r,s))}return t}function e0(e,t,n,i,r,s,a,o){var c=wn(e,n);s=c?1:s,a=!!a||s===3,c=o&&!c,(s===2||c)&&qs(e)&&(n=0|(t=e.v)[bt]);var l=(e=bu(t,r))===$r?7:0|e[bt],u=Au(l,n);if(o=!(4&u)){var f=e,h=n;const m=!!(2&u);m&&(h|=2);let g=!m,M=!0,p=0,d=0;for(;p<f.length;p++){const x=Mu(f[p],i,!1,h);if(x instanceof i){if(!m){const E=wn(x);g&&(g=!E),M&&(M=E)}f[d++]=x}}d<p&&(f.length=d),u|=4,u=M?-4097&u:4096|u,u=g?8|u:-9&u}if(u!==l&&(We(e,u),2&u&&Object.freeze(e)),c&&!(8&u||!e.length&&(s===1||s===4&&(2&u||!(16&u)&&32&n)))){for(Or(u)&&(e=Zn(e),u=Br(u,n),n=ze(t,n,r,e)),i=e,c=u,l=0;l<i.length;l++)(f=i[l])!==(u=yu(f))&&(i[l]=u);c|=8,We(e,u=c=i.length?4096|c:-4097&c)}return Km(e,u,t,n,r,s,o,a)}function Gi(e,t,n){const i=e.v;return e0(e,i,0|i[bt],t,n,Ur(),!1,!0)}function n0(e){return e==null&&(e=void 0),e}function Lt(e,t,n,i,r){return he(e,n,i=n0(i),r),i&&!wn(i)&&jr(e.v),e}function ma(e,t,n,i){t:{var r=i=n0(i);$s(e);const s=e.v;let a=0|s[bt];if(r==null){const o=Tu(s);if(wu(o,s,a,n)!==t)break t;o.set(n,0)}else a=Qm(s,a,n,t);ze(s,a,t,r)}i&&!wn(i)&&jr(e.v)}function Br(e,t){return-273&(2&t?2|e:-3&e)}function Cu(e,t,n,i){var r=i;$s(e),e=e0(e,i=e.v,0|i[bt],n,t,2,!0),r=r??new n,e.push(r),t=n=e===$r?7:0|e[bt],(r=wn(r))?(n&=-9,e.length===1&&(n&=-4097)):n|=4096,n!==t&&We(e,n),r||jr(i)}function Vn(e,t,n){return Xs(Ee(e,t,void 0,n))}function Ie(e,t){return Ee(e,t,void 0,void 0,fi)??0}function Hi(e,t,n){if(n!=null){if(typeof n!="number"||!vc(n))throw Ch("int32");n|=0}he(e,t,n)}function Ct(e,t,n){he(e,t,pa(n))}function Rn(e,t,n){er(e,t,Ua(n),"")}function Qo(e,t,n){{$s(e);const a=e.v;let o=0|a[bt];if(n==null)ze(a,o,t);else{var i=e=n===$r?7:0|n[bt],r=Or(e),s=r||Object.isFrozen(n);for(r||(e=0),s||(n=Zn(n),i=0,e=Br(e,o),s=!1),e|=5,e|=(4&e?512&e?512:1024&e?1024:0:void 0)??1024,r=0;r<n.length;r++){const c=n[r],l=Ym(c);Object.is(c,l)||(s&&(n=Zn(n),i=0,e=Br(e,o),s=!1),n[r]=l)}e!==i&&(s&&(n=Zn(n),e=Br(e,o)),We(n,e)),ze(a,o,t,n)}}}function Sc(e,t,n){$s(e),Fr(e,t,tn,2,!0).push(Ym(n))}var ds=class{constructor(e,t,n){if(this.buffer=e,n&&!t)throw Error();this.g=t}};function Pu(e,t){if(typeof e=="string")return new ds(Lm(e),t);if(Array.isArray(e))return new ds(new Uint8Array(e),t);if(e.constructor===Uint8Array)return new ds(e,!1);if(e.constructor===ArrayBuffer)return e=new Uint8Array(e),new ds(e,!1);if(e.constructor===mi)return t=pu(e)||new Uint8Array(0),new ds(t,!0,e);if(e instanceof Uint8Array)return e=e.constructor===Uint8Array?e:new Uint8Array(e.buffer,e.byteOffset,e.byteLength),new ds(e,!1);throw Error()}function Lu(e,t){let n,i=0,r=0,s=0;const a=e.h;let o=e.g;do n=a[o++],i|=(127&n)<<s,s+=7;while(s<32&&128&n);if(s>32)for(r|=(127&n)>>4,s=3;s<32&&128&n;s+=7)n=a[o++],r|=(127&n)<<s;if(kr(e,o),!(128&n))return t(i>>>0,r>>>0);throw Error()}function Iu(e){let t=0,n=e.g;const i=n+10,r=e.h;for(;n<i;){const s=r[n++];if(t|=s,(128&s)==0)return kr(e,n),!!(127&t)}throw Error()}function hr(e){const t=e.h;let n=e.g,i=t[n++],r=127&i;if(128&i&&(i=t[n++],r|=(127&i)<<7,128&i&&(i=t[n++],r|=(127&i)<<14,128&i&&(i=t[n++],r|=(127&i)<<21,128&i&&(i=t[n++],r|=i<<28,128&i&&128&t[n++]&&128&t[n++]&&128&t[n++]&&128&t[n++]&&128&t[n++])))))throw Error();return kr(e,n),r}function vi(e){return hr(e)>>>0}function tc(e){var t=e.h;const n=e.g;var i=t[n],r=t[n+1];const s=t[n+2];return t=t[n+3],kr(e,e.g+4),e=2*((r=(i<<0|r<<8|s<<16|t<<24)>>>0)>>31)+1,i=r>>>23&255,r&=8388607,i==255?r?NaN:e*(1/0):i==0?1401298464324817e-60*e*r:e*Math.pow(2,i-150)*(r+8388608)}function rS(e){return hr(e)}function kr(e,t){if(e.g=t,t>e.l)throw Error()}function i0(e,t){if(t<0)throw Error();const n=e.g;if((t=n+t)>e.l)throw Error();return e.g=t,n}function r0(e,t){if(t==0)return Xr();var n=i0(e,t);return e.Y&&e.j?n=e.h.subarray(n,n+t):(e=e.h,n=n===(t=n+t)?new Uint8Array(0):kM?e.slice(n,t):new Uint8Array(e.subarray(n,t))),n.length==0?Xr():new mi(n,Ts)}var zd=[];function s0(e,t,n,i){if(ec.length){const r=ec.pop();return r.o(i),r.g.init(e,t,n,i),r}return new sS(e,t,n,i)}function a0(e){e.g.clear(),e.l=-1,e.h=-1,ec.length<100&&ec.push(e)}function o0(e){var t=e.g;if(t.g==t.l)return!1;e.m=e.g.g;var n=vi(e.g);if(t=n>>>3,!((n&=7)>=0&&n<=5)||t<1)throw Error();return e.l=t,e.h=n,!0}function Uo(e){switch(e.h){case 0:e.h!=0?Uo(e):Iu(e.g);break;case 1:kr(e=e.g,e.g+8);break;case 2:if(e.h!=2)Uo(e);else{var t=vi(e.g);kr(e=e.g,e.g+t)}break;case 5:kr(e=e.g,e.g+4);break;case 3:for(t=e.l;;){if(!o0(e))throw Error();if(e.h==4){if(e.l!=t)throw Error();break}Uo(e)}break;default:throw Error()}}function Fa(e,t,n){const i=e.g.l;var r=vi(e.g);let s=(r=e.g.g+r)-i;if(s<=0&&(e.g.l=r,n(t,e,void 0,void 0,void 0),s=r-e.g.g),s)throw Error();return e.g.g=r,e.g.l=i,t}function Du(e){var t=vi(e.g),n=i0(e=e.g,t);if(e=e.h,vM){var i,r=e;(i=yl)||(i=yl=new TextDecoder("utf-8",{fatal:!0})),t=n+t,r=n===0&&t===r.length?r:r.subarray(n,t);try{var s=i.decode(r)}catch(o){if(go===void 0){try{i.decode(new Uint8Array([128]))}catch{}try{i.decode(new Uint8Array([97])),go=!0}catch{go=!1}}throw!go&&(yl=void 0),o}}else{t=(s=n)+t,n=[];let o,c=null;for(;s<t;){var a=e[s++];a<128?n.push(a):a<224?s>=t?yr():(o=e[s++],a<194||(192&o)!=128?(s--,yr()):n.push((31&a)<<6|63&o)):a<240?s>=t-1?yr():(o=e[s++],(192&o)!=128||a===224&&o<160||a===237&&o>=160||(192&(i=e[s++]))!=128?(s--,yr()):n.push((15&a)<<12|(63&o)<<6|63&i)):a<=244?s>=t-2?yr():(o=e[s++],(192&o)!=128||o-144+(a<<28)>>30||(192&(i=e[s++]))!=128||(192&(r=e[s++]))!=128?(s--,yr()):(a=(7&a)<<18|(63&o)<<12|(63&i)<<6|63&r,a-=65536,n.push(55296+(a>>10&1023),56320+(1023&a)))):yr(),n.length>=8192&&(c=Ed(c,n),n.length=0)}s=Ed(c,n)}return s}function c0(e){const t=vi(e.g);return r0(e.g,t)}function yc(e,t,n){var i=vi(e.g);for(i=e.g.g+i;e.g.g<i;)n.push(t(e.g))}var sS=class{constructor(e,t,n,i){if(zd.length){const r=zd.pop();r.init(e,t,n,i),e=r}else e=new class{constructor(r,s,a,o){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.init(r,s,a,o)}init(r,s,a,{Y:o=!1,ea:c=!1}={}){this.Y=o,this.ea=c,r&&(r=Pu(r,this.ea),this.h=r.buffer,this.j=r.g,this.m=s||0,this.l=a!==void 0?this.m+a:this.h.length,this.g=this.m)}clear(){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.Y=!1}}(e,t,n,i);this.g=e,this.m=this.g.g,this.h=this.l=-1,this.o(i)}o({ha:e=!1}={}){this.ha=e}},ec=[];function Vd(e){return e?/^\d+$/.test(e)?(_c(e),new Dh(ye,Ne)):null:aS||(aS=new Dh(0,0))}var Dh=class{constructor(e,t){this.h=e>>>0,this.g=t>>>0}};let aS;function Gd(e){return e?/^-?\d+$/.test(e)?(_c(e),new Uh(ye,Ne)):null:oS||(oS=new Uh(0,0))}var Uh=class{constructor(e,t){this.h=e>>>0,this.g=t>>>0}};let oS;function vs(e,t,n){for(;n>0||t>127;)e.g.push(127&t|128),t=(t>>>7|n<<25)>>>0,n>>>=7;e.g.push(t)}function Ks(e,t){for(;t>127;)e.g.push(127&t|128),t>>>=7;e.g.push(t)}function Ec(e,t){if(t>=0)Ks(e,t);else{for(let n=0;n<9;n++)e.g.push(127&t|128),t>>=7;e.g.push(1)}}function Uu(e){var t=ye;e.g.push(t>>>0&255),e.g.push(t>>>8&255),e.g.push(t>>>16&255),e.g.push(t>>>24&255)}function Is(e,t){t.length!==0&&(e.l.push(t),e.h+=t.length)}function Wn(e,t,n){Ks(e.g,8*t+n)}function Fu(e,t){return Wn(e,t,2),t=e.g.end(),Is(e,t),t.push(e.h),t}function Nu(e,t){var n=t.pop();for(n=e.h+e.g.length()-n;n>127;)t.push(127&n|128),n>>>=7,e.h++;t.push(n),e.h++}function bc(e,t,n){Wn(e,t,2),Ks(e.g,n.length),Is(e,e.g.end()),Is(e,n)}function nc(e,t,n,i){n!=null&&(t=Fu(e,t),i(n,e),Nu(e,t))}function Mi(){const e=class{constructor(){throw Error()}};return Object.setPrototypeOf(e,e.prototype),e}var Ou=Mi(),l0=Mi(),Bu=Mi(),ku=Mi(),zu=Mi(),h0=Mi(),cS=Mi(),Ac=Mi(),u0=Mi(),f0=Mi();function Si(e,t,n){var i=e.v;An&&An in i&&(i=i[An])&&delete i[t.g],t.h?t.j(e,t.h,t.g,n,t.l):t.j(e,t.g,n,t.l)}var At=class{constructor(e,t){this.v=$m(e,t,void 0,2048)}toJSON(){return qm(this)}j(){var r;var e=HS,t=this.v,n=e.g,i=An;if(Hs&&i&&((r=t[i])==null?void 0:r[n])!=null&&ws(CM,3),t=e.g,Cd&&An&&Cd===void 0&&(i=(n=this.v)[An])&&(i=i.da))try{i(n,t,JM)}catch(s){wm(s)}return e.h?e.m(this,e.h,e.g,e.l):e.m(this,e.g,e.defaultValue,e.l)}clone(){const e=this.v,t=0|e[bt];return Eu(this,e,t)?Su(this,e,!0):new this.constructor(Ys(e,t,!1))}};At.prototype[Rs]=Cs,At.prototype.toString=function(){return this.v.toString()};var Zs=class{constructor(e,t,n){this.g=e,this.h=t,e=Ou,this.l=!!e&&n===e||!1}};function Tc(e,t){return new Zs(e,t,Ou)}function d0(e,t,n,i,r){nc(e,n,_0(t,i),r)}const lS=Tc(function(e,t,n,i,r){return e.h===2&&(Fa(e,Ru(t,i,n),r),!0)},d0),hS=Tc(function(e,t,n,i,r){return e.h===2&&(Fa(e,Ru(t,i,n),r),!0)},d0);var wc=Symbol(),Rc=Symbol(),Fh=Symbol(),Hd=Symbol(),Wd=Symbol();let p0,m0;function Kr(e,t,n,i){var r=i[e];if(r)return r;(r={}).qa=i,r.T=function(f){switch(typeof f){case"boolean":return eS||(eS=[0,void 0,!0]);case"number":return f>0?void 0:f===0?nS||(nS=[0,void 0]):[-f,void 0];case"string":return[0,f];case"object":return f}}(i[0]);var s=i[1];let a=1;s&&s.constructor===Object&&(r.ba=s,typeof(s=i[++a])=="function"&&(r.ma=!0,p0??(p0=s),m0??(m0=i[a+1]),s=i[a+=2]));const o={};for(;s&&Array.isArray(s)&&s.length&&typeof s[0]=="number"&&s[0]>0;){for(var c=0;c<s.length;c++)o[s[c]]=s;s=i[++a]}for(c=1;s!==void 0;){let f;typeof s=="number"&&(c+=s,s=i[++a]);var l=void 0;if(s instanceof Zs?f=s:(f=lS,a--),f==null?void 0:f.l){s=i[++a],l=i;var u=a;typeof s=="function"&&(s=s(),l[u]=s),l=s}for(u=c+1,typeof(s=i[++a])=="number"&&s<0&&(u-=s,s=i[++a]);c<u;c++){const h=o[c];l?n(r,c,f,l,h):t(r,c,f,h)}}return i[e]=r}function g0(e){return Array.isArray(e)?e[0]instanceof Zs?e:[hS,e]:[e,void 0]}function _0(e,t){return e instanceof At?e.v:Array.isArray(e)?Nr(e,t):void 0}function Vu(e,t,n,i){const r=n.g;e[t]=i?(s,a,o)=>r(s,a,o,i):r}function Gu(e,t,n,i,r){const s=n.g;let a,o;e[t]=(c,l,u)=>s(c,l,u,o||(o=Kr(Rc,Vu,Gu,i).T),a||(a=Hu(i)),r)}function Hu(e){let t=e[Fh];if(t!=null)return t;const n=Kr(Rc,Vu,Gu,e);return t=n.ma?(i,r)=>p0(i,r,n):(i,r)=>{for(;o0(r)&&r.h!=4;){var s=r.l,a=n[s];if(a==null){var o=n.ba;o&&(o=o[s])&&(o=fS(o))!=null&&(a=n[s]=o)}if(a==null||!a(r,i,s)){if(a=(o=r).m,Uo(o),o.ha)var c=void 0;else c=o.g.g-a,o.g.g=a,c=r0(o.g,c);a=void 0,o=i,c&&((a=o[An]??(o[An]=new Ih))[s]??(a[s]=[])).push(c)}}return(i=xc(i))&&(i.da=n.qa[Wd]),!0},e[Fh]=t,e[Wd]=uS.bind(e),t}function uS(e,t,n,i){var r=this[Rc];const s=this[Fh],a=Nr(void 0,r.T),o=xc(e);if(o){var c=!1,l=r.ba;if(l){if(r=(u,f,h)=>{if(h.length!==0)if(l[f])for(const m of h){u=s0(m);try{c=!0,s(a,u)}finally{a0(u)}}else i==null||i(e,f,h)},t==null)Jo(o,r);else if(o!=null){const u=o[t];u&&r(o,t,u)}if(c){let u=0|e[bt];if(2&u&&2048&u&&!(n!=null&&n.Ka))throw Error();const f=Ws(u),h=(m,g)=>{if(Vi(e,m,f)!=null){if((n==null?void 0:n.Qa)===1)return;throw Error()}g!=null&&(u=ze(e,u,m,g,f)),delete o[m]};t==null?Nm(a,0|a[bt],(m,g)=>{h(m,g)}):h(t,Vi(a,t,f))}}}}function fS(e){const t=(e=g0(e))[0].g;if(e=e[1]){const n=Hu(e),i=Kr(Rc,Vu,Gu,e).T;return(r,s,a)=>t(r,s,a,i,n)}return t}function Cc(e,t,n){e[t]=n.h}function Pc(e,t,n,i){let r,s;const a=n.h;e[t]=(o,c,l)=>a(o,c,l,s||(s=Kr(wc,Cc,Pc,i).T),r||(r=v0(i)))}function v0(e){let t=e[Hd];if(!t){const n=Kr(wc,Cc,Pc,e);t=(i,r)=>x0(i,r,n),e[Hd]=t}return t}function x0(e,t,n){Nm(e,0|e[bt],(i,r)=>{if(r!=null){var s=function(a,o){var c=a[o];if(c)return c;if((c=a.ba)&&(c=c[o])){var l=(c=g0(c))[0].h;if(c=c[1]){const u=v0(c),f=Kr(wc,Cc,Pc,c).T;c=a.ma?m0(f,u):(h,m,g)=>l(h,m,g,f,u)}else c=l;return a[o]=c}}(n,i);s?s(t,r,i):i<500||ws(Ph,3)}}),(e=xc(e))&&Jo(e,(i,r,s)=>{for(Is(t,t.g.end()),i=0;i<s.length;i++)Is(t,pu(s[i])||new Uint8Array(0))})}const dS=Tn(0);function Js(e,t){if(Array.isArray(t)){var n=0|t[bt];if(4&n)return t;for(var i=0,r=0;i<t.length;i++){const s=e(t[i]);s!=null&&(t[r++]=s)}return r<i&&(t.length=r),(e=-1537&(5|n))!==n&&We(t,e),2&e&&Object.freeze(t),t}}function ln(e,t,n){return new Zs(e,t,n)}function Qs(e,t,n){return new Zs(e,t,n)}function hn(e,t,n){ze(e,0|e[bt],t,n,Ws(0|e[bt]))}var pS=Tc(function(e,t,n,i,r){if(e.h!==2)return!1;if(e=Zn(e=Fa(e,Nr([void 0,void 0],i),r)),r=Ws(i=0|t[bt]),2&i)throw Error();let s=Vi(t,n,r);if(s instanceof zi)2&s.J?(s=s.V(),s.push(e),ze(t,i,n,s,r)):s.Ma(e);else if(Array.isArray(s)){var a=0|s[bt];8192&a||We(s,a|=8192),2&a&&(s=Jm(s),ze(t,i,n,s,r)),s.push(e)}else ze(t,i,n,ya([e]),r);return!0},function(e,t,n,i,r){if(t instanceof zi)t.forEach((s,a)=>{nc(e,n,Nr([a,s],i),r)});else if(Array.isArray(t)){for(let s=0;s<t.length;s++){const a=t[s];Array.isArray(a)&&nc(e,n,Nr(a,i),r)}ya(t)}});function M0(e,t,n){(t=fi(t))!=null&&(Wn(e,n,5),e=e.g,gu(t),Uu(e))}function S0(e,t,n){if(t=function(i){if(i==null)return i;const r=typeof i;if(r==="bigint")return String(Ia(64,i));if(Da(i)){if(r==="string")return Hm(i);if(r==="number")return xu(i)}}(t),t!=null&&(typeof t=="string"&&Gd(t),t!=null))switch(Wn(e,n,0),typeof t){case"number":e=e.g,Ps(t),vs(e,ye,Ne);break;case"bigint":n=BigInt.asUintN(64,t),n=new Uh(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),vs(e.g,n.h,n.g);break;default:n=Gd(t),vs(e.g,n.h,n.g)}}function y0(e,t,n){(t=Xs(t))!=null&&t!=null&&(Wn(e,n,0),Ec(e.g,t))}function E0(e,t,n){(t=zm(t))!=null&&(Wn(e,n,0),e.g.g.push(t?1:0))}function b0(e,t,n){(t=tn(t))!=null&&bc(e,n,Tm(t))}function A0(e,t,n,i,r){nc(e,n,_0(t,i),r)}function T0(e,t,n){(t=t==null||typeof t=="string"||t instanceof mi?t:void 0)!=null&&bc(e,n,Pu(t,!0).buffer)}function w0(e,t,n){(t=Vm(t))!=null&&t!=null&&(Wn(e,n,0),Ks(e.g,t))}function R0(e,t,n){return(e.h===5||e.h===2)&&(t=js(t,0|t[bt],n),e.h==2?yc(e,tc,t):t.push(tc(e.g)),!0)}var Oe=ln(function(e,t,n){return e.h===5&&(hn(t,n,tc(e.g)),!0)},M0,Ac),mS=Qs(R0,function(e,t,n){if((t=Js(fi,t))!=null)for(let a=0;a<t.length;a++){var i=e,r=n,s=t[a];s!=null&&(Wn(i,r,5),i=i.g,gu(s),Uu(i))}},Ac),Wu=Qs(R0,function(e,t,n){if((t=Js(fi,t))!=null&&t.length){Wn(e,n,2),Ks(e.g,4*t.length);for(let i=0;i<t.length;i++)n=e.g,gu(t[i]),Uu(n)}},Ac),gS=ln(function(e,t,n){return e.h===5&&(hn(t,n,(e=tc(e.g))===0?void 0:e),!0)},M0,Ac),ur=ln(function(e,t,n){return e.h!==0?e=!1:(hn(t,n,Lu(e.g,km)),e=!0),e},S0,h0),Tl=ln(function(e,t,n){return e.h!==0?t=!1:(hn(t,n,(e=Lu(e.g,km))===dS?void 0:e),t=!0),t},S0,h0),_S=ln(function(e,t,n){return e.h!==0?e=!1:(hn(t,n,Lu(e.g,VM)),e=!0),e},function(e,t,n){if(t=function(i){if(i==null)return i;var r=typeof i;if(r==="bigint")return String(GM(64,i));if(Da(i)){if(r==="string")return r=Ls(Number(i)),qr(r)&&r>=0?i=String(r):((r=i.indexOf("."))!==-1&&(i=i.substring(0,r)),(r=i[0]!=="-"&&((r=i.length)<20||r===20&&i<="18446744073709551615"))||(_c(i),i=Ea(ye,Ne))),i;if(r==="number")return(i=Ls(i))>=0&&qr(i)||(Ps(i),i=Bm(ye,Ne)),i}}(t),t!=null&&(typeof t=="string"&&Vd(t),t!=null))switch(Wn(e,n,0),typeof t){case"number":e=e.g,Ps(t),vs(e,ye,Ne);break;case"bigint":n=BigInt.asUintN(64,t),n=new Dh(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),vs(e.g,n.h,n.g);break;default:n=Vd(t),vs(e.g,n.h,n.g)}},cS),ke=ln(function(e,t,n){return e.h===0&&(hn(t,n,hr(e.g)),!0)},y0,ku),Na=Qs(function(e,t,n){return(e.h===0||e.h===2)&&(t=js(t,0|t[bt],n),e.h==2?yc(e,hr,t):t.push(hr(e.g)),!0)},function(e,t,n){if((t=Js(Xs,t))!=null&&t.length){n=Fu(e,n);for(let i=0;i<t.length;i++)Ec(e.g,t[i]);Nu(e,n)}},ku),ms=ln(function(e,t,n){return e.h===0&&(hn(t,n,(e=hr(e.g))===0?void 0:e),!0)},y0,ku),be=ln(function(e,t,n){return e.h===0&&(hn(t,n,Iu(e.g)),!0)},E0,l0),zr=ln(function(e,t,n){return e.h===0&&(hn(t,n,(e=Iu(e.g))===!1?void 0:e),!0)},E0,l0),sn=Qs(function(e,t,n){return e.h===2&&(e=Du(e),js(t,0|t[bt],n).push(e),!0)},function(e,t,n){if((t=Js(tn,t))!=null)for(let a=0;a<t.length;a++){var i=e,r=n,s=t[a];s!=null&&bc(i,r,Tm(s))}},Bu),ir=ln(function(e,t,n){return e.h===2&&(hn(t,n,(e=Du(e))===""?void 0:e),!0)},b0,Bu),de=ln(function(e,t,n){return e.h===2&&(hn(t,n,Du(e)),!0)},b0,Bu),Ke=function(e,t,n=Ou){return new Zs(e,t,n)}(function(e,t,n,i,r){return e.h===2&&(i=Nr(void 0,i),js(t,0|t[bt],n).push(i),Fa(e,i,r),!0)},function(e,t,n,i,r){if(Array.isArray(t)){for(let s=0;s<t.length;s++)A0(e,t[s],n,i,r);1&(e=0|t[bt])||We(t,1|e)}}),xe=Tc(function(e,t,n,i,r,s){if(e.h!==2)return!1;let a=0|t[bt];return Qm(t,a,s,n,Ws(a)),Fa(e,t=Ru(t,i,n),r),!0},A0),C0=ln(function(e,t,n){return e.h===2&&(hn(t,n,c0(e)),!0)},T0,u0),vS=Qs(function(e,t,n){return(e.h===0||e.h===2)&&(t=js(t,0|t[bt],n),e.h==2?yc(e,vi,t):t.push(vi(e.g)),!0)},function(e,t,n){if((t=Js(Vm,t))!=null)for(let a=0;a<t.length;a++){var i=e,r=n,s=t[a];s!=null&&(Wn(i,r,0),Ks(i.g,s))}},zu),xS=ln(function(e,t,n){return e.h===0&&(hn(t,n,(e=vi(e.g))===0?void 0:e),!0)},w0,zu),an=ln(function(e,t,n){return e.h===0&&(hn(t,n,hr(e.g)),!0)},function(e,t,n){(t=Xs(t))!=null&&(t=parseInt(t,10),Wn(e,n,0),Ec(e.g,t))},f0);class MS{constructor(t,n){var i=Pn;this.g=t,this.h=n,this.m=te,this.j=Lt,this.defaultValue=void 0,this.l=i.Oa!=null?Om:void 0}register(){pc(this)}}function yi(e,t){return new MS(e,t)}function dr(e,t){return(n,i)=>{{const s={ea:!0};i&&Object.assign(s,i),n=s0(n,void 0,void 0,s);try{const a=new e,o=a.v;Hu(t)(o,n);var r=a}finally{a0(n)}}return r}}function Lc(e){return function(){const t=new class{constructor(){this.l=[],this.h=0,this.g=new class{constructor(){this.g=[]}length(){return this.g.length}end(){const a=this.g;return this.g=[],a}}}};x0(this.v,t,Kr(wc,Cc,Pc,e)),Is(t,t.g.end());const n=new Uint8Array(t.h),i=t.l,r=i.length;let s=0;for(let a=0;a<r;a++){const o=i[a];n.set(o,s),s+=o.length}return t.l=[n],n}}var Xd=class extends At{constructor(e){super(e)}},Yd=[0,ir,ln(function(e,t,n){return e.h===2&&(hn(t,n,(e=c0(e))===Xr()?void 0:e),!0)},function(e,t,n){if(t!=null){if(t instanceof At){const i=t.Ra;return void(i?(t=i(t),t!=null&&bc(e,n,Pu(t,!0).buffer)):ws(Ph,3))}if(Array.isArray(t))return void ws(Ph,3)}T0(e,t,n)},u0)];let wl,qd=globalThis.trustedTypes;function $d(e){var t;return wl===void 0&&(wl=function(){let n=null;if(!qd)return n;try{const i=r=>r;n=qd.createPolicy("goog#html",{createHTML:i,createScript:i,createScriptURL:i})}catch{}return n}()),e=(t=wl)?t.createScriptURL(e):e,new class{constructor(n){this.g=n}toString(){return this.g+""}}(e)}function _o(e,...t){if(t.length===0)return $d(e[0]);let n=e[0];for(let i=0;i<t.length;i++)n+=encodeURIComponent(t[i])+e[i+1];return $d(n)}var P0=[0,ke,an,be,-1,Na,an,-1,be],SS=class extends At{constructor(e){super(e)}},L0=[0,be,de,be,an,-1,Qs(function(e,t,n){return(e.h===0||e.h===2)&&(t=js(t,0|t[bt],n),e.h==2?yc(e,rS,t):t.push(hr(e.g)),!0)},function(e,t,n){if((t=Js(Xs,t))!=null&&t.length){n=Fu(e,n);for(let i=0;i<t.length;i++)Ec(e.g,t[i]);Nu(e,n)}},f0),de,-1,[0,be,-1],an,be,-1],I0=[0,3,be,-1,2,[0,[2],ke,xe,[0,ln(function(e,t,n){return e.h===0&&(hn(t,n,vi(e.g)),!0)},w0,zu)]],[0,an,be,an,be,an,be,de,-1],[0,[3,4],de,-1,xe,[0,ke],xe,[0,an]],[0]],D0=[0,de,-2],jd=class extends At{constructor(e){super(e)}},U0=[0],F0=[0,ke,be,1,be,-4],Pn=class extends At{constructor(e){super(e,2)}},Ve={};Ve[336783863]=[0,de,be,-1,ke,[0,[1,2,3,4,5,6,7,8,9],xe,U0,xe,L0,xe,D0,xe,F0,xe,P0,xe,[0,de,-2],xe,[0,de,an],xe,I0,xe,[0,an,-1,be]],[0,de],be,[0,[1,3],[2,4],xe,[0,Na],-1,xe,[0,sn],-1,Ke,[0,de,-1]],de];var Kd=[0,Tl,-1,zr,-3,Tl,Na,ir,ms,Tl,-1,zr,ms,zr,-2,ir];function Me(e,t){Sc(e,3,t)}function $t(e,t){Sc(e,4,t)}var vn=class extends At{constructor(e){super(e,500)}o(e){return Lt(this,0,7,e)}},ga=[-1,{}],Zd=[0,de,1,ga],Jd=[0,de,sn,ga];function Xn(e,t){Cu(e,1,vn,t)}function Ae(e,t){Sc(e,10,t)}function ee(e,t){Sc(e,15,t)}var Ln=class extends At{constructor(e){super(e,500)}o(e){return Lt(this,0,1001,e)}},N0=[-500,Ke,[-500,ir,-1,sn,-3,[-2,Ve,be],Ke,Yd,ms,-1,Zd,Jd,Ke,[0,ir,zr],ir,Kd,ms,sn,987,sn],4,Ke,[-500,de,-1,[-1,{}],998,de],Ke,[-500,de,sn,-1,[-2,{},be],997,sn,-1],ms,Ke,[-500,de,sn,ga,998,sn],sn,ms,Zd,Jd,Ke,[0,ir,-1,ga],sn,-2,Kd,ir,-1,zr,[0,zr,xS],978,ga,Ke,Yd];Ln.prototype.g=Lc(N0);var yS=dr(Ln,N0),ES=class extends At{constructor(e){super(e)}},O0=class extends At{constructor(e){super(e)}g(){return Gi(this,ES,1)}},B0=[0,Ke,[0,ke,Oe,de,-1]],Ic=dr(O0,B0),bS=class extends At{constructor(e){super(e)}},AS=class extends At{constructor(e){super(e)}},Rl=class extends At{constructor(e){super(e)}l(){return te(this,bS,2)}g(){return Gi(this,AS,5)}},k0=dr(class extends At{constructor(e){super(e)}},[0,sn,Na,Wu,[0,an,[0,ke,-3],[0,Oe,-3],[0,ke,-1,[0,Ke,[0,ke,-2]]],Ke,[0,Oe,-1,de,Oe]],de,-1,ur,Ke,[0,ke,Oe],sn,ur]),z0=class extends At{constructor(e){super(e)}},xs=dr(class extends At{constructor(e){super(e)}},[0,Ke,[0,Oe,-4]]),V0=class extends At{constructor(e){super(e)}},Oa=dr(class extends At{constructor(e){super(e)}},[0,Ke,[0,Oe,-4]]),TS=class extends At{constructor(e){super(e)}},wS=[0,ke,-1,Wu,an],G0=class extends At{constructor(e){super(e)}};G0.prototype.g=Lc([0,Oe,-4,ur]);var RS=class extends At{constructor(e){super(e)}},CS=dr(class extends At{constructor(e){super(e)}},[0,Ke,[0,1,ke,de,B0],ur]),Qd=class extends At{constructor(e){super(e)}},PS=class extends At{constructor(e){super(e)}na(){const e=Ee(this,1,void 0,void 0,Zm);return e??Xr()}},LS=class extends At{constructor(e){super(e)}},H0=[1,2],IS=dr(class extends At{constructor(e){super(e)}},[0,Ke,[0,H0,xe,[0,Wu],xe,[0,C0],ke,de],ur]),Xu=class extends At{constructor(e){super(e)}},W0=[0,de,ke,Oe,sn,-1],tp=class extends At{constructor(e){super(e)}},DS=[0,be,-1],ep=class extends At{constructor(e){super(e)}},Fo=[1,2,3,4,5,6],ic=class extends At{constructor(e){super(e)}g(){return Ee(this,1,void 0,void 0,Zm)!=null}l(){return tn(Ee(this,2))!=null}},Ce=class extends At{constructor(e){super(e)}g(){return zm(Ee(this,2))??!1}},X0=[0,C0,de,[0,ke,ur,-1],[0,_S,ur]],Be=[0,X0,be,[0,Fo,xe,F0,xe,L0,xe,P0,xe,U0,xe,D0,xe,I0],an],Dc=class extends At{constructor(e){super(e)}},Yu=[0,Be,Oe,-1,ke],US=yi(502141897,Dc);Ve[502141897]=Yu;var FS=dr(class extends At{constructor(e){super(e)}},[0,[0,an,-1,mS,vS],wS]),Y0=class extends At{constructor(e){super(e)}},q0=class extends At{constructor(e){super(e)}},Nh=[0,Be,Oe,[0,Be],be],NS=yi(508968150,q0);Ve[508968150]=[0,Be,Yu,Nh,Oe,[0,[0,X0]]],Ve[508968149]=Nh;var ps=class extends At{constructor(e){super(e)}l(){return te(this,Xu,2)}g(){he(this,2)}},$0=[0,Be,W0];Ve[478825465]=$0;var OS=class extends At{constructor(e){super(e)}},j0=class extends At{constructor(e){super(e)}},qu=class extends At{constructor(e){super(e)}},$u=class extends At{constructor(e){super(e)}},K0=class extends At{constructor(e){super(e)}},np=[0,Be,[0,Be],$0,-1],Z0=[0,Be,Oe,ke],ju=[0,Be,Oe],J0=[0,Be,Z0,ju,Oe],BS=yi(479097054,K0);Ve[479097054]=[0,Be,J0,np],Ve[463370452]=np,Ve[464864288]=Z0;var kS=yi(462713202,$u);Ve[462713202]=J0,Ve[474472470]=ju;var zS=class extends At{constructor(e){super(e)}},Q0=class extends At{constructor(e){super(e)}},tg=class extends At{constructor(e){super(e)}},eg=class extends At{constructor(e){super(e)}},Ku=[0,Be,Oe,-1,ke],Oh=[0,Be,Oe,be];eg.prototype.g=Lc([0,Be,ju,[0,Be],Yu,Nh,Ku,Oh]);var ng=class extends At{constructor(e){super(e)}},VS=yi(456383383,ng);Ve[456383383]=[0,Be,W0];var ig=class extends At{constructor(e){super(e)}},GS=yi(476348187,ig);Ve[476348187]=[0,Be,DS];var rg=class extends At{constructor(e){super(e)}},ip=class extends At{constructor(e){super(e)}},sg=[0,an,-1],HS=yi(458105876,class extends At{constructor(e){super(e)}g(){let e;var t=this.v;const n=0|t[bt];return e=wn(this,n),t=function(i,r,s,a){var o=ip;!a&&qs(i)&&(s=0|(r=i.v)[bt]);var c=Vi(r,2);if(i=!1,c==null){if(a)return Od();c=[]}else if(c.constructor===zi){if(!(2&c.J)||a)return c;c=c.V()}else Array.isArray(c)?i=!!(2&(0|c[bt])):c=[];if(a){if(!c.length)return Od();i||(i=!0,La(c))}else i&&(i=!1,ya(c),c=Jm(c));return!i&&32&s&&Pa(c,32),s=ze(r,s,2,a=new zi(c,o,XM,void 0)),i||jr(r,s),a}(this,t,n,e),!e&&ip&&(t.ra=!0),t}});Ve[458105876]=[0,sg,pS,[!0,ur,[0,de,-1,sn]],[0,Na,be,an]];var Zu=class extends At{constructor(e){super(e)}},ag=yi(458105758,Zu);Ve[458105758]=[0,Be,de,sg];var Cl=class extends At{constructor(e){super(e)}},rp=[0,gS,-1,zr],WS=class extends At{constructor(e){super(e)}},og=class extends At{constructor(e){super(e)}},Bh=[1,2];og.prototype.g=Lc([0,Bh,xe,rp,xe,[0,Ke,rp]]);var cg=class extends At{constructor(e){super(e)}},XS=yi(443442058,cg);Ve[443442058]=[0,Be,de,ke,Oe,sn,-1,be,Oe],Ve[514774813]=Ku;var lg=class extends At{constructor(e){super(e)}},YS=yi(516587230,lg);function kh(e,t){return t=t?t.clone():new Xu,e.displayNamesLocale!==void 0?he(t,1,Ua(e.displayNamesLocale)):e.displayNamesLocale===void 0&&he(t,1),e.maxResults!==void 0?Hi(t,2,e.maxResults):"maxResults"in e&&he(t,2),e.scoreThreshold!==void 0?Ct(t,3,e.scoreThreshold):"scoreThreshold"in e&&he(t,3),e.categoryAllowlist!==void 0?Qo(t,4,e.categoryAllowlist):"categoryAllowlist"in e&&he(t,4),e.categoryDenylist!==void 0?Qo(t,5,e.categoryDenylist):"categoryDenylist"in e&&he(t,5),t}function hg(e){const t=Number(e);return Number.isSafeInteger(t)?t:String(e)}function Ju(e,t=-1,n=""){return{categories:e.map(i=>({index:Vn(i,1)??0??-1,score:Ie(i,2)??0,categoryName:tn(Ee(i,3))??""??"",displayName:tn(Ee(i,4))??""??""})),headIndex:t,headName:n}}function qS(e){const t={classifications:Gi(e,RS,1).map(n=>{var i;return Ju(((i=te(n,O0,4))==null?void 0:i.g())??[],Vn(n,2)??0,tn(Ee(n,3))??"")})};return function(n){return n==null?n:typeof n=="bigint"?(Lh(n)?n=Number(n):(n=Ia(64,n),n=Lh(n)?Number(n):String(n)),n):Da(n)?typeof n=="number"?xu(n):Hm(n):void 0}(Ee(e,2,void 0,void 0,Zo))!=null&&(t.timestampMs=hg(Ee(e,2,void 0,void 0,Zo)??jm)),t}function ug(e){var a,o;var t=Fr(e,3,fi,Ur()),n=Fr(e,2,Xs,Ur()),i=Fr(e,1,tn,Ur()),r=Fr(e,9,tn,Ur());const s={categories:[],keypoints:[]};for(let c=0;c<t.length;c++)s.categories.push({score:t[c],index:n[c]??-1,categoryName:i[c]??"",displayName:r[c]??""});if((t=(a=te(e,Rl,4))==null?void 0:a.l())&&(s.boundingBox={originX:Vn(t,1,Qi)??0,originY:Vn(t,2,Qi)??0,width:Vn(t,3,Qi)??0,height:Vn(t,4,Qi)??0,angle:0}),(o=te(e,Rl,4))==null?void 0:o.g().length)for(const c of te(e,Rl,4).g())s.keypoints.push({x:Ee(c,1,void 0,Qi,fi)??0,y:Ee(c,2,void 0,Qi,fi)??0,score:Ee(c,4,void 0,Qi,fi)??0,label:tn(Ee(c,3,void 0,Qi))??""});return s}function Uc(e){const t=[];for(const n of Gi(e,V0,1))t.push({x:Ie(n,1)??0,y:Ie(n,2)??0,z:Ie(n,3)??0,visibility:Ie(n,4)??0});return t}function _a(e){const t=[];for(const n of Gi(e,z0,1))t.push({x:Ie(n,1)??0,y:Ie(n,2)??0,z:Ie(n,3)??0,visibility:Ie(n,4)??0});return t}function sp(e){return Array.from(e,t=>t>127?t-256:t)}function ap(e,t){if(e.length!==t.length)throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${e.length} vs. ${t.length}).`);let n=0,i=0,r=0;for(let s=0;s<e.length;s++)n+=e[s]*t[s],i+=e[s]*e[s],r+=t[s]*t[s];if(i<=0||r<=0)throw Error("Cannot compute cosine similarity on embedding with 0 norm.");return n/Math.sqrt(i*r)}let vo;Ve[516587230]=[0,Be,Ku,Oh,Oe],Ve[518928384]=Oh;const $S=new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]);async function fg(e){if(e)return!0;if(vo===void 0)try{await WebAssembly.instantiate($S),vo=!0}catch{vo=!1}return vo}async function xo(e,t,n){return{wasmLoaderPath:`${t}/${e}_${n=`wasm${n?"_module":""}${await fg(n)?"":"_nosimd"}_internal`}.js`,wasmBinaryPath:`${t}/${e}_${n}.wasm`}}var Pr=class{};function dg(){var e=navigator;return typeof OffscreenCanvas<"u"&&(!function(t=navigator){return(t=t.userAgent).includes("Safari")&&!t.includes("Chrome")}(e)||!!((e=e.userAgent.match(/Version\/([\d]+).*Safari/))&&e.length>=1&&Number(e[1])>=17))}async function op(e){if(typeof importScripts!="function"){const t=document.createElement("script");return t.src=e.toString(),t.crossOrigin="anonymous",new Promise((n,i)=>{t.addEventListener("load",()=>{n()},!1),t.addEventListener("error",r=>{i(r)},!1),document.body.appendChild(t)})}try{importScripts(e.toString())}catch(t){if(!(t instanceof TypeError))throw t;await self.import(e.toString())}}function pg(e){return e.videoWidth!==void 0?[e.videoWidth,e.videoHeight]:e.naturalWidth!==void 0?[e.naturalWidth,e.naturalHeight]:e.displayWidth!==void 0?[e.displayWidth,e.displayHeight]:[e.width,e.height]}function wt(e,t,n){e.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"),n(t=e.i.stringToNewUTF8(t)),e.i._free(t)}function cp(e,t,n){if(!e.i.canvas)throw Error("No OpenGL canvas configured.");if(n?e.i._bindTextureToStream(n):e.i._bindTextureToCanvas(),!(n=e.i.canvas.getContext("webgl2")||e.i.canvas.getContext("webgl")))throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");e.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!0),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,t),e.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1);const[i,r]=pg(t);return!e.l||i===e.i.canvas.width&&r===e.i.canvas.height||(e.i.canvas.width=i,e.i.canvas.height=r),[i,r]}function lp(e,t,n){e.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");const i=new Uint32Array(t.length);for(let r=0;r<t.length;r++)i[r]=e.i.stringToNewUTF8(t[r]);t=e.i._malloc(4*i.length),e.i.HEAPU32.set(i,t>>2),n(t);for(const r of i)e.i._free(r);e.i._free(t)}function si(e,t,n){e.i.simpleListeners=e.i.simpleListeners||{},e.i.simpleListeners[t]=n}function tr(e,t,n){let i=[];e.i.simpleListeners=e.i.simpleListeners||{},e.i.simpleListeners[t]=(r,s,a)=>{s?(n(i,a),i=[]):i.push(r)}}Pr.forVisionTasks=function(e,t=!1){return xo("vision",e??_o``,t)},Pr.forTextTasks=function(e,t=!1){return xo("text",e??_o``,t)},Pr.forGenAiTasks=function(e,t=!1){return xo("genai",e??_o``,t)},Pr.forAudioTasks=function(e,t=!1){return xo("audio",e??_o``,t)},Pr.isSimdSupported=function(e=!1){return fg(e)};async function jS(e,t,n,i){return e=await(async(r,s,a,o,c)=>{if(s&&await op(s),!self.ModuleFactory||a&&(await op(a),!self.ModuleFactory))throw Error("ModuleFactory not set.");return self.Module&&c&&((s=self.Module).locateFile=c.locateFile,c.mainScriptUrlOrBlob&&(s.mainScriptUrlOrBlob=c.mainScriptUrlOrBlob)),c=await self.ModuleFactory(self.Module||c),self.ModuleFactory=self.Module=void 0,new r(c,o)})(e,n.wasmLoaderPath,n.assetLoaderPath,t,{locateFile:r=>r.endsWith(".wasm")?n.wasmBinaryPath.toString():n.assetBinaryPath&&r.endsWith(".data")?n.assetBinaryPath.toString():r}),await e.o(i),e}function Pl(e,t){const n=te(e.baseOptions,ic,1)||new ic;typeof t=="string"?(he(n,2,Ua(t)),he(n,1)):t instanceof Uint8Array&&(he(n,1,mu(t,!1)),he(n,2)),Lt(e.baseOptions,0,1,n)}function hp(e){try{const t=e.H.length;if(t===1)throw Error(e.H[0].message);if(t>1)throw Error("Encountered multiple errors: "+e.H.map(n=>n.message).join(", "))}finally{e.H=[]}}function mt(e,t){e.C=Math.max(e.C,t)}function Fc(e,t){e.B=new vn,Rn(e.B,2,"PassThroughCalculator"),Me(e.B,"free_memory"),$t(e.B,"free_memory_unused_out"),Ae(t,"free_memory"),Xn(t,e.B)}function Ds(e,t){Me(e.B,t),$t(e.B,t+"_unused_out")}function Nc(e){e.g.addBoolToStream(!0,"free_memory",e.C)}var zh=class{constructor(e){this.g=e,this.H=[],this.C=0,this.g.setAutoRenderToScreen(!1)}l(e,t=!0){var n,i,r,s,a,o;if(t){const c=e.baseOptions||{};if((n=e.baseOptions)!=null&&n.modelAssetBuffer&&((i=e.baseOptions)!=null&&i.modelAssetPath))throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");if(!((r=te(this.baseOptions,ic,1))!=null&&r.g()||(s=te(this.baseOptions,ic,1))!=null&&s.l()||(a=e.baseOptions)!=null&&a.modelAssetBuffer||(o=e.baseOptions)!=null&&o.modelAssetPath))throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");if(function(l,u){let f=te(l.baseOptions,ep,3);if(!f){var h=f=new ep,m=new jd;ma(h,4,Fo,m)}"delegate"in u&&(u.delegate==="GPU"?(u=f,h=new SS,ma(u,2,Fo,h)):(u=f,h=new jd,ma(u,4,Fo,h))),Lt(l.baseOptions,0,3,f)}(this,c),c.modelAssetPath)return fetch(c.modelAssetPath.toString()).then(l=>{if(l.ok)return l.arrayBuffer();throw Error(`Failed to fetch model: ${c.modelAssetPath} (${l.status})`)}).then(l=>{try{this.g.i.FS_unlink("/model.dat")}catch{}this.g.i.FS_createDataFile("/","model.dat",new Uint8Array(l),!0,!1,!1),Pl(this,"/model.dat"),this.m(),this.L()});if(c.modelAssetBuffer instanceof Uint8Array)Pl(this,c.modelAssetBuffer);else if(c.modelAssetBuffer)return async function(l){const u=[];for(var f=0;;){const{done:h,value:m}=await l.read();if(h)break;u.push(m),f+=m.length}if(u.length===0)return new Uint8Array(0);if(u.length===1)return u[0];l=new Uint8Array(f),f=0;for(const h of u)l.set(h,f),f+=h.length;return l}(c.modelAssetBuffer).then(l=>{Pl(this,l),this.m(),this.L()})}return this.m(),this.L(),Promise.resolve()}L(){}ca(){let e;if(this.g.ca(t=>{e=yS(t)}),!e)throw Error("Failed to retrieve CalculatorGraphConfig");return e}setGraph(e,t){this.g.attachErrorListener((n,i)=>{this.H.push(Error(i))}),this.g.Ja(),this.g.setGraph(e,t),this.B=void 0,hp(this)}finishProcessing(){this.g.finishProcessing(),hp(this)}close(){this.B=void 0,this.g.closeGraph()}};function or(e,t){if(!e)throw Error(`Unable to obtain required WebGL resource: ${t}`);return e}zh.prototype.close=zh.prototype.close;class KS{constructor(t,n,i,r){this.g=t,this.h=n,this.m=i,this.l=r}bind(){this.g.bindVertexArray(this.h)}close(){this.g.deleteVertexArray(this.h),this.g.deleteBuffer(this.m),this.g.deleteBuffer(this.l)}}function up(e,t,n){const i=e.g;if(n=or(i.createShader(n),"Failed to create WebGL shader"),i.shaderSource(n,t),i.compileShader(n),!i.getShaderParameter(n,i.COMPILE_STATUS))throw Error(`Could not compile WebGL shader: ${i.getShaderInfoLog(n)}`);return i.attachShader(e.h,n),n}function fp(e,t){const n=e.g,i=or(n.createVertexArray(),"Failed to create vertex array");n.bindVertexArray(i);const r=or(n.createBuffer(),"Failed to create buffer");n.bindBuffer(n.ARRAY_BUFFER,r),n.enableVertexAttribArray(e.O),n.vertexAttribPointer(e.O,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),n.STATIC_DRAW);const s=or(n.createBuffer(),"Failed to create buffer");return n.bindBuffer(n.ARRAY_BUFFER,s),n.enableVertexAttribArray(e.L),n.vertexAttribPointer(e.L,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array(t?[0,1,0,0,1,0,1,1]:[0,0,0,1,1,1,1,0]),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,null),n.bindVertexArray(null),new KS(n,i,r,s)}function Qu(e,t){if(e.g){if(t!==e.g)throw Error("Cannot change GL context once initialized")}else e.g=t}function ZS(e,t,n,i){return Qu(e,t),e.h||(e.m(),e.D()),n?(e.u||(e.u=fp(e,!0)),n=e.u):(e.A||(e.A=fp(e,!1)),n=e.A),t.useProgram(e.h),n.bind(),e.l(),e=i(),n.g.bindVertexArray(null),e}function mg(e,t,n){return Qu(e,t),e=or(t.createTexture(),"Failed to create texture"),t.bindTexture(t.TEXTURE_2D,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,n??t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,n??t.LINEAR),t.bindTexture(t.TEXTURE_2D,null),e}function gg(e,t,n){Qu(e,t),e.B||(e.B=or(t.createFramebuffer(),"Failed to create framebuffe.")),t.bindFramebuffer(t.FRAMEBUFFER,e.B),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,n,0)}function JS(e){var t;(t=e.g)==null||t.bindFramebuffer(e.g.FRAMEBUFFER,null)}var _g=class{H(){return`
  precision mediump float;
  varying vec2 vTex;
  uniform sampler2D inputTexture;
  void main() {
    gl_FragColor = texture2D(inputTexture, vTex);
  }
 `}m(){const e=this.g;if(this.h=or(e.createProgram(),"Failed to create WebGL program"),this.X=up(this,`
  attribute vec2 aVertex;
  attribute vec2 aTex;
  varying vec2 vTex;
  void main(void) {
    gl_Position = vec4(aVertex, 0.0, 1.0);
    vTex = aTex;
  }`,e.VERTEX_SHADER),this.W=up(this,this.H(),e.FRAGMENT_SHADER),e.linkProgram(this.h),!e.getProgramParameter(this.h,e.LINK_STATUS))throw Error(`Error during program linking: ${e.getProgramInfoLog(this.h)}`);this.O=e.getAttribLocation(this.h,"aVertex"),this.L=e.getAttribLocation(this.h,"aTex")}D(){}l(){}close(){if(this.h){const e=this.g;e.deleteProgram(this.h),e.deleteShader(this.X),e.deleteShader(this.W)}this.B&&this.g.deleteFramebuffer(this.B),this.A&&this.A.close(),this.u&&this.u.close()}};function Ii(e,t){switch(t){case 0:return e.g.find(n=>n instanceof Uint8Array);case 1:return e.g.find(n=>n instanceof Float32Array);case 2:return e.g.find(n=>typeof WebGLTexture<"u"&&n instanceof WebGLTexture);default:throw Error(`Type is not supported: ${t}`)}}function Vh(e){var t=Ii(e,1);if(!t){if(t=Ii(e,0))t=new Float32Array(t).map(i=>i/255);else{t=new Float32Array(e.width*e.height);const i=Us(e);var n=tf(e);if(gg(n,i,vg(e)),"iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"document"in self&&"ontouchend"in self.document){n=new Float32Array(e.width*e.height*4),i.readPixels(0,0,e.width,e.height,i.RGBA,i.FLOAT,n);for(let r=0,s=0;r<t.length;++r,s+=4)t[r]=n[s]}else i.readPixels(0,0,e.width,e.height,i.RED,i.FLOAT,t)}e.g.push(t)}return t}function vg(e){let t=Ii(e,2);if(!t){const n=Us(e);t=Mg(e);const i=Vh(e),r=xg(e);n.texImage2D(n.TEXTURE_2D,0,r,e.width,e.height,0,n.RED,n.FLOAT,i),Gh(e)}return t}function Us(e){if(!e.canvas)throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");return e.h||(e.h=or(e.canvas.getContext("webgl2"),"You cannot use a canvas that is already bound to a different type of rendering context.")),e.h}function xg(e){if(e=Us(e),!Mo)if(e.getExtension("EXT_color_buffer_float")&&e.getExtension("OES_texture_float_linear")&&e.getExtension("EXT_float_blend"))Mo=e.R32F;else{if(!e.getExtension("EXT_color_buffer_half_float"))throw Error("GPU does not fully support 4-channel float32 or float16 formats");Mo=e.R16F}return Mo}function tf(e){return e.l||(e.l=new _g),e.l}function Mg(e){const t=Us(e);t.viewport(0,0,e.width,e.height),t.activeTexture(t.TEXTURE0);let n=Ii(e,2);return n||(n=mg(tf(e),t,e.m?t.LINEAR:t.NEAREST),e.g.push(n),e.j=!0),t.bindTexture(t.TEXTURE_2D,n),n}function Gh(e){e.h.bindTexture(e.h.TEXTURE_2D,null)}var Mo,je=class{constructor(e,t,n,i,r,s,a){this.g=e,this.m=t,this.j=n,this.canvas=i,this.l=r,this.width=s,this.height=a,this.j&&--dp===0&&console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources.")}Fa(){return!!Ii(this,0)}ka(){return!!Ii(this,1)}R(){return!!Ii(this,2)}ja(){return(t=Ii(e=this,0))||(t=Vh(e),t=new Uint8Array(t.map(n=>Math.round(255*n))),e.g.push(t)),t;var e,t}ia(){return Vh(this)}N(){return vg(this)}clone(){const e=[];for(const t of this.g){let n;if(t instanceof Uint8Array)n=new Uint8Array(t);else if(t instanceof Float32Array)n=new Float32Array(t);else{if(!(t instanceof WebGLTexture))throw Error(`Type is not supported: ${t}`);{const i=Us(this),r=tf(this);i.activeTexture(i.TEXTURE1),n=mg(r,i,this.m?i.LINEAR:i.NEAREST),i.bindTexture(i.TEXTURE_2D,n);const s=xg(this);i.texImage2D(i.TEXTURE_2D,0,s,this.width,this.height,0,i.RED,i.FLOAT,null),i.bindTexture(i.TEXTURE_2D,null),gg(r,i,n),ZS(r,i,!1,()=>{Mg(this),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.drawArrays(i.TRIANGLE_FAN,0,4),Gh(this)}),JS(r),Gh(this)}}e.push(n)}return new je(e,this.m,this.R(),this.canvas,this.l,this.width,this.height)}close(){this.j&&Us(this).deleteTexture(Ii(this,2)),dp=-1}};je.prototype.close=je.prototype.close,je.prototype.clone=je.prototype.clone,je.prototype.getAsWebGLTexture=je.prototype.N,je.prototype.getAsFloat32Array=je.prototype.ia,je.prototype.getAsUint8Array=je.prototype.ja,je.prototype.hasWebGLTexture=je.prototype.R,je.prototype.hasFloat32Array=je.prototype.ka,je.prototype.hasUint8Array=je.prototype.Fa;var dp=250;function Qn(...e){return e.map(([t,n])=>({start:t,end:n}))}const QS=function(e){return class extends e{Ja(){this.i._registerModelResourcesGraphService()}}}((pp=class{constructor(e,t){this.l=!0,this.i=e,this.g=null,this.h=0,this.m=typeof this.i._addIntToInputStream=="function",t!==void 0?this.i.canvas=t:dg()?this.i.canvas=new OffscreenCanvas(1,1):(console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."),this.i.canvas=document.createElement("canvas"))}async initializeGraph(e){const t=await(await fetch(e)).arrayBuffer();e=!(e.endsWith(".pbtxt")||e.endsWith(".textproto")),this.setGraph(new Uint8Array(t),e)}setGraphFromString(e){this.setGraph(new TextEncoder().encode(e),!1)}setGraph(e,t){const n=e.length,i=this.i._malloc(n);this.i.HEAPU8.set(e,i),t?this.i._changeBinaryGraph(n,i):this.i._changeTextGraph(n,i),this.i._free(i)}configureAudio(e,t,n,i,r){this.i._configureAudio||console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'),wt(this,i||"input_audio",s=>{wt(this,r=r||"audio_header",a=>{this.i._configureAudio(s,a,e,t??0,n)})})}setAutoResizeCanvas(e){this.l=e}setAutoRenderToScreen(e){this.i._setAutoRenderToScreen(e)}setGpuBufferVerticalFlip(e){this.i.gpuOriginForWebTexturesIsBottomLeft=e}ca(e){si(this,"__graph_config__",t=>{e(t)}),wt(this,"__graph_config__",t=>{this.i._getGraphConfig(t,void 0)}),delete this.i.simpleListeners.__graph_config__}attachErrorListener(e){this.i.errorListener=e}attachEmptyPacketListener(e,t){this.i.emptyPacketListeners=this.i.emptyPacketListeners||{},this.i.emptyPacketListeners[e]=t}addAudioToStream(e,t,n){this.addAudioToStreamWithShape(e,0,0,t,n)}addAudioToStreamWithShape(e,t,n,i,r){const s=4*e.length;this.h!==s&&(this.g&&this.i._free(this.g),this.g=this.i._malloc(s),this.h=s),this.i.HEAPF32.set(e,this.g/4),wt(this,i,a=>{this.i._addAudioToInputStream(this.g,t,n,a,r)})}addGpuBufferToStream(e,t,n){wt(this,t,i=>{const[r,s]=cp(this,e,i);this.i._addBoundTextureToStream(i,r,s,n)})}addBoolToStream(e,t,n){wt(this,t,i=>{this.i._addBoolToInputStream(e,i,n)})}addDoubleToStream(e,t,n){wt(this,t,i=>{this.i._addDoubleToInputStream(e,i,n)})}addFloatToStream(e,t,n){wt(this,t,i=>{this.i._addFloatToInputStream(e,i,n)})}addIntToStream(e,t,n){wt(this,t,i=>{this.i._addIntToInputStream(e,i,n)})}addUintToStream(e,t,n){wt(this,t,i=>{this.i._addUintToInputStream(e,i,n)})}addStringToStream(e,t,n){wt(this,t,i=>{wt(this,e,r=>{this.i._addStringToInputStream(r,i,n)})})}addStringRecordToStream(e,t,n){wt(this,t,i=>{lp(this,Object.keys(e),r=>{lp(this,Object.values(e),s=>{this.i._addFlatHashMapToInputStream(r,s,Object.keys(e).length,i,n)})})})}addProtoToStream(e,t,n,i){wt(this,n,r=>{wt(this,t,s=>{const a=this.i._malloc(e.length);this.i.HEAPU8.set(e,a),this.i._addProtoToInputStream(a,e.length,s,r,i),this.i._free(a)})})}addEmptyPacketToStream(e,t){wt(this,e,n=>{this.i._addEmptyPacketToInputStream(n,t)})}addBoolVectorToStream(e,t,n){wt(this,t,i=>{const r=this.i._allocateBoolVector(e.length);if(!r)throw Error("Unable to allocate new bool vector on heap.");for(const s of e)this.i._addBoolVectorEntry(r,s);this.i._addBoolVectorToInputStream(r,i,n)})}addDoubleVectorToStream(e,t,n){wt(this,t,i=>{const r=this.i._allocateDoubleVector(e.length);if(!r)throw Error("Unable to allocate new double vector on heap.");for(const s of e)this.i._addDoubleVectorEntry(r,s);this.i._addDoubleVectorToInputStream(r,i,n)})}addFloatVectorToStream(e,t,n){wt(this,t,i=>{const r=this.i._allocateFloatVector(e.length);if(!r)throw Error("Unable to allocate new float vector on heap.");for(const s of e)this.i._addFloatVectorEntry(r,s);this.i._addFloatVectorToInputStream(r,i,n)})}addIntVectorToStream(e,t,n){wt(this,t,i=>{const r=this.i._allocateIntVector(e.length);if(!r)throw Error("Unable to allocate new int vector on heap.");for(const s of e)this.i._addIntVectorEntry(r,s);this.i._addIntVectorToInputStream(r,i,n)})}addUintVectorToStream(e,t,n){wt(this,t,i=>{const r=this.i._allocateUintVector(e.length);if(!r)throw Error("Unable to allocate new unsigned int vector on heap.");for(const s of e)this.i._addUintVectorEntry(r,s);this.i._addUintVectorToInputStream(r,i,n)})}addStringVectorToStream(e,t,n){wt(this,t,i=>{const r=this.i._allocateStringVector(e.length);if(!r)throw Error("Unable to allocate new string vector on heap.");for(const s of e)wt(this,s,a=>{this.i._addStringVectorEntry(r,a)});this.i._addStringVectorToInputStream(r,i,n)})}addBoolToInputSidePacket(e,t){wt(this,t,n=>{this.i._addBoolToInputSidePacket(e,n)})}addDoubleToInputSidePacket(e,t){wt(this,t,n=>{this.i._addDoubleToInputSidePacket(e,n)})}addFloatToInputSidePacket(e,t){wt(this,t,n=>{this.i._addFloatToInputSidePacket(e,n)})}addIntToInputSidePacket(e,t){wt(this,t,n=>{this.i._addIntToInputSidePacket(e,n)})}addUintToInputSidePacket(e,t){wt(this,t,n=>{this.i._addUintToInputSidePacket(e,n)})}addStringToInputSidePacket(e,t){wt(this,t,n=>{wt(this,e,i=>{this.i._addStringToInputSidePacket(i,n)})})}addProtoToInputSidePacket(e,t,n){wt(this,n,i=>{wt(this,t,r=>{const s=this.i._malloc(e.length);this.i.HEAPU8.set(e,s),this.i._addProtoToInputSidePacket(s,e.length,r,i),this.i._free(s)})})}addBoolVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateBoolVector(e.length);if(!i)throw Error("Unable to allocate new bool vector on heap.");for(const r of e)this.i._addBoolVectorEntry(i,r);this.i._addBoolVectorToInputSidePacket(i,n)})}addDoubleVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateDoubleVector(e.length);if(!i)throw Error("Unable to allocate new double vector on heap.");for(const r of e)this.i._addDoubleVectorEntry(i,r);this.i._addDoubleVectorToInputSidePacket(i,n)})}addFloatVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateFloatVector(e.length);if(!i)throw Error("Unable to allocate new float vector on heap.");for(const r of e)this.i._addFloatVectorEntry(i,r);this.i._addFloatVectorToInputSidePacket(i,n)})}addIntVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateIntVector(e.length);if(!i)throw Error("Unable to allocate new int vector on heap.");for(const r of e)this.i._addIntVectorEntry(i,r);this.i._addIntVectorToInputSidePacket(i,n)})}addUintVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateUintVector(e.length);if(!i)throw Error("Unable to allocate new unsigned int vector on heap.");for(const r of e)this.i._addUintVectorEntry(i,r);this.i._addUintVectorToInputSidePacket(i,n)})}addStringVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateStringVector(e.length);if(!i)throw Error("Unable to allocate new string vector on heap.");for(const r of e)wt(this,r,s=>{this.i._addStringVectorEntry(i,s)});this.i._addStringVectorToInputSidePacket(i,n)})}attachBoolListener(e,t){si(this,e,t),wt(this,e,n=>{this.i._attachBoolListener(n)})}attachBoolVectorListener(e,t){tr(this,e,t),wt(this,e,n=>{this.i._attachBoolVectorListener(n)})}attachIntListener(e,t){si(this,e,t),wt(this,e,n=>{this.i._attachIntListener(n)})}attachIntVectorListener(e,t){tr(this,e,t),wt(this,e,n=>{this.i._attachIntVectorListener(n)})}attachUintListener(e,t){si(this,e,t),wt(this,e,n=>{this.i._attachUintListener(n)})}attachUintVectorListener(e,t){tr(this,e,t),wt(this,e,n=>{this.i._attachUintVectorListener(n)})}attachDoubleListener(e,t){si(this,e,t),wt(this,e,n=>{this.i._attachDoubleListener(n)})}attachDoubleVectorListener(e,t){tr(this,e,t),wt(this,e,n=>{this.i._attachDoubleVectorListener(n)})}attachFloatListener(e,t){si(this,e,t),wt(this,e,n=>{this.i._attachFloatListener(n)})}attachFloatVectorListener(e,t){tr(this,e,t),wt(this,e,n=>{this.i._attachFloatVectorListener(n)})}attachStringListener(e,t){si(this,e,t),wt(this,e,n=>{this.i._attachStringListener(n)})}attachStringVectorListener(e,t){tr(this,e,t),wt(this,e,n=>{this.i._attachStringVectorListener(n)})}attachProtoListener(e,t,n){si(this,e,t),wt(this,e,i=>{this.i._attachProtoListener(i,n||!1)})}attachProtoVectorListener(e,t,n){tr(this,e,t),wt(this,e,i=>{this.i._attachProtoVectorListener(i,n||!1)})}attachAudioListener(e,t,n){this.i._attachAudioListener||console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'),si(this,e,(i,r)=>{i=new Float32Array(i.buffer,i.byteOffset,i.length/4),t(i,r)}),wt(this,e,i=>{this.i._attachAudioListener(i,n||!1)})}finishProcessing(){this.i._waitUntilIdle()}closeGraph(){this.i._closeGraph(),this.i.simpleListeners=void 0,this.i.emptyPacketListeners=void 0}},class extends pp{get ga(){return this.i}pa(e,t,n){wt(this,t,i=>{const[r,s]=cp(this,e,i);this.ga._addBoundTextureAsImageToStream(i,r,s,n)})}Z(e,t){si(this,e,t),wt(this,e,n=>{this.ga._attachImageListener(n)})}aa(e,t){tr(this,e,t),wt(this,e,n=>{this.ga._attachImageVectorListener(n)})}}));var pp,ti=class extends QS{};async function Zt(e,t,n){return async function(i,r,s,a){return jS(i,r,s,a)}(e,n.canvas??(dg()?void 0:document.createElement("canvas")),t,n)}function Sg(e,t,n,i){if(e.U){const s=new G0;if(n!=null&&n.regionOfInterest){if(!e.oa)throw Error("This task doesn't support region-of-interest.");var r=n.regionOfInterest;if(r.left>=r.right||r.top>=r.bottom)throw Error("Expected RectF with left < right and top < bottom.");if(r.left<0||r.top<0||r.right>1||r.bottom>1)throw Error("Expected RectF values to be in [0,1].");Ct(s,1,(r.left+r.right)/2),Ct(s,2,(r.top+r.bottom)/2),Ct(s,4,r.right-r.left),Ct(s,3,r.bottom-r.top)}else Ct(s,1,.5),Ct(s,2,.5),Ct(s,4,1),Ct(s,3,1);if(n!=null&&n.rotationDegrees){if((n==null?void 0:n.rotationDegrees)%90!=0)throw Error("Expected rotation to be a multiple of 90°.");if(Ct(s,5,-Math.PI*n.rotationDegrees/180),(n==null?void 0:n.rotationDegrees)%180!=0){const[a,o]=pg(t);n=Ie(s,3)*o/a,r=Ie(s,4)*a/o,Ct(s,4,n),Ct(s,3,r)}}e.g.addProtoToStream(s.g(),"mediapipe.NormalizedRect",e.U,i)}e.g.pa(t,e.X,i??performance.now()),e.finishProcessing()}function ei(e,t,n){var i;if((i=e.baseOptions)!=null&&i.g())throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");Sg(e,t,n,e.C+1)}function Ei(e,t,n,i){var r;if(!((r=e.baseOptions)!=null&&r.g()))throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");Sg(e,t,n,i)}function Fs(e,t,n,i){var r=t.data;const s=t.width,a=s*(t=t.height);if((r instanceof Uint8Array||r instanceof Float32Array)&&r.length!==a)throw Error("Unsupported channel count: "+r.length/a);return e=new je([r],n,!1,e.g.i.canvas,e.P,s,t),i?e.clone():e}var Cn=class extends zh{constructor(e,t,n,i){super(e),this.g=e,this.X=t,this.U=n,this.oa=i,this.P=new _g}l(e,t=!0){if("runningMode"in e&&he(this.baseOptions,2,ba(!!e.runningMode&&e.runningMode!=="IMAGE")),e.canvas!==void 0&&this.g.i.canvas!==e.canvas)throw Error("You must create a new task to reset the canvas.");return super.l(e,t)}close(){this.P.close(),super.close()}};Cn.prototype.close=Cn.prototype.close;var Dn=class extends Cn{constructor(e,t){super(new ti(e,t),"image_in","norm_rect_in",!1),this.j={detections:[]},Lt(e=this.h=new Dc,0,1,t=new Ce),Ct(this.h,2,.5),Ct(this.h,3,.3)}get baseOptions(){return te(this.h,Ce,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return"minDetectionConfidence"in e&&Ct(this.h,2,e.minDetectionConfidence??.5),"minSuppressionThreshold"in e&&Ct(this.h,3,e.minSuppressionThreshold??.3),this.l(e)}F(e,t){return this.j={detections:[]},ei(this,e,t),this.j}G(e,t,n){return this.j={detections:[]},Ei(this,e,n,t),this.j}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"norm_rect_in"),ee(e,"detections");const t=new Pn;Si(t,US,this.h);const n=new vn;Rn(n,2,"mediapipe.tasks.vision.face_detector.FaceDetectorGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect_in"),$t(n,"DETECTIONS:detections"),n.o(t),Xn(e,n),this.g.attachProtoVectorListener("detections",(i,r)=>{for(const s of i)i=k0(s),this.j.detections.push(ug(i));mt(this,r)}),this.g.attachEmptyPacketListener("detections",i=>{mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Dn.prototype.detectForVideo=Dn.prototype.G,Dn.prototype.detect=Dn.prototype.F,Dn.prototype.setOptions=Dn.prototype.o,Dn.createFromModelPath=async function(e,t){return Zt(Dn,e,{baseOptions:{modelAssetPath:t}})},Dn.createFromModelBuffer=function(e,t){return Zt(Dn,e,{baseOptions:{modelAssetBuffer:t}})},Dn.createFromOptions=function(e,t){return Zt(Dn,e,t)};var ef=Qn([61,146],[146,91],[91,181],[181,84],[84,17],[17,314],[314,405],[405,321],[321,375],[375,291],[61,185],[185,40],[40,39],[39,37],[37,0],[0,267],[267,269],[269,270],[270,409],[409,291],[78,95],[95,88],[88,178],[178,87],[87,14],[14,317],[317,402],[402,318],[318,324],[324,308],[78,191],[191,80],[80,81],[81,82],[82,13],[13,312],[312,311],[311,310],[310,415],[415,308]),nf=Qn([263,249],[249,390],[390,373],[373,374],[374,380],[380,381],[381,382],[382,362],[263,466],[466,388],[388,387],[387,386],[386,385],[385,384],[384,398],[398,362]),rf=Qn([276,283],[283,282],[282,295],[295,285],[300,293],[293,334],[334,296],[296,336]),yg=Qn([474,475],[475,476],[476,477],[477,474]),sf=Qn([33,7],[7,163],[163,144],[144,145],[145,153],[153,154],[154,155],[155,133],[33,246],[246,161],[161,160],[160,159],[159,158],[158,157],[157,173],[173,133]),af=Qn([46,53],[53,52],[52,65],[65,55],[70,63],[63,105],[105,66],[66,107]),Eg=Qn([469,470],[470,471],[471,472],[472,469]),of=Qn([10,338],[338,297],[297,332],[332,284],[284,251],[251,389],[389,356],[356,454],[454,323],[323,361],[361,288],[288,397],[397,365],[365,379],[379,378],[378,400],[400,377],[377,152],[152,148],[148,176],[176,149],[149,150],[150,136],[136,172],[172,58],[58,132],[132,93],[93,234],[234,127],[127,162],[162,21],[21,54],[54,103],[103,67],[67,109],[109,10]),bg=[...ef,...nf,...rf,...sf,...af,...of],Ag=Qn([127,34],[34,139],[139,127],[11,0],[0,37],[37,11],[232,231],[231,120],[120,232],[72,37],[37,39],[39,72],[128,121],[121,47],[47,128],[232,121],[121,128],[128,232],[104,69],[69,67],[67,104],[175,171],[171,148],[148,175],[118,50],[50,101],[101,118],[73,39],[39,40],[40,73],[9,151],[151,108],[108,9],[48,115],[115,131],[131,48],[194,204],[204,211],[211,194],[74,40],[40,185],[185,74],[80,42],[42,183],[183,80],[40,92],[92,186],[186,40],[230,229],[229,118],[118,230],[202,212],[212,214],[214,202],[83,18],[18,17],[17,83],[76,61],[61,146],[146,76],[160,29],[29,30],[30,160],[56,157],[157,173],[173,56],[106,204],[204,194],[194,106],[135,214],[214,192],[192,135],[203,165],[165,98],[98,203],[21,71],[71,68],[68,21],[51,45],[45,4],[4,51],[144,24],[24,23],[23,144],[77,146],[146,91],[91,77],[205,50],[50,187],[187,205],[201,200],[200,18],[18,201],[91,106],[106,182],[182,91],[90,91],[91,181],[181,90],[85,84],[84,17],[17,85],[206,203],[203,36],[36,206],[148,171],[171,140],[140,148],[92,40],[40,39],[39,92],[193,189],[189,244],[244,193],[159,158],[158,28],[28,159],[247,246],[246,161],[161,247],[236,3],[3,196],[196,236],[54,68],[68,104],[104,54],[193,168],[168,8],[8,193],[117,228],[228,31],[31,117],[189,193],[193,55],[55,189],[98,97],[97,99],[99,98],[126,47],[47,100],[100,126],[166,79],[79,218],[218,166],[155,154],[154,26],[26,155],[209,49],[49,131],[131,209],[135,136],[136,150],[150,135],[47,126],[126,217],[217,47],[223,52],[52,53],[53,223],[45,51],[51,134],[134,45],[211,170],[170,140],[140,211],[67,69],[69,108],[108,67],[43,106],[106,91],[91,43],[230,119],[119,120],[120,230],[226,130],[130,247],[247,226],[63,53],[53,52],[52,63],[238,20],[20,242],[242,238],[46,70],[70,156],[156,46],[78,62],[62,96],[96,78],[46,53],[53,63],[63,46],[143,34],[34,227],[227,143],[123,117],[117,111],[111,123],[44,125],[125,19],[19,44],[236,134],[134,51],[51,236],[216,206],[206,205],[205,216],[154,153],[153,22],[22,154],[39,37],[37,167],[167,39],[200,201],[201,208],[208,200],[36,142],[142,100],[100,36],[57,212],[212,202],[202,57],[20,60],[60,99],[99,20],[28,158],[158,157],[157,28],[35,226],[226,113],[113,35],[160,159],[159,27],[27,160],[204,202],[202,210],[210,204],[113,225],[225,46],[46,113],[43,202],[202,204],[204,43],[62,76],[76,77],[77,62],[137,123],[123,116],[116,137],[41,38],[38,72],[72,41],[203,129],[129,142],[142,203],[64,98],[98,240],[240,64],[49,102],[102,64],[64,49],[41,73],[73,74],[74,41],[212,216],[216,207],[207,212],[42,74],[74,184],[184,42],[169,170],[170,211],[211,169],[170,149],[149,176],[176,170],[105,66],[66,69],[69,105],[122,6],[6,168],[168,122],[123,147],[147,187],[187,123],[96,77],[77,90],[90,96],[65,55],[55,107],[107,65],[89,90],[90,180],[180,89],[101,100],[100,120],[120,101],[63,105],[105,104],[104,63],[93,137],[137,227],[227,93],[15,86],[86,85],[85,15],[129,102],[102,49],[49,129],[14,87],[87,86],[86,14],[55,8],[8,9],[9,55],[100,47],[47,121],[121,100],[145,23],[23,22],[22,145],[88,89],[89,179],[179,88],[6,122],[122,196],[196,6],[88,95],[95,96],[96,88],[138,172],[172,136],[136,138],[215,58],[58,172],[172,215],[115,48],[48,219],[219,115],[42,80],[80,81],[81,42],[195,3],[3,51],[51,195],[43,146],[146,61],[61,43],[171,175],[175,199],[199,171],[81,82],[82,38],[38,81],[53,46],[46,225],[225,53],[144,163],[163,110],[110,144],[52,65],[65,66],[66,52],[229,228],[228,117],[117,229],[34,127],[127,234],[234,34],[107,108],[108,69],[69,107],[109,108],[108,151],[151,109],[48,64],[64,235],[235,48],[62,78],[78,191],[191,62],[129,209],[209,126],[126,129],[111,35],[35,143],[143,111],[117,123],[123,50],[50,117],[222,65],[65,52],[52,222],[19,125],[125,141],[141,19],[221,55],[55,65],[65,221],[3,195],[195,197],[197,3],[25,7],[7,33],[33,25],[220,237],[237,44],[44,220],[70,71],[71,139],[139,70],[122,193],[193,245],[245,122],[247,130],[130,33],[33,247],[71,21],[21,162],[162,71],[170,169],[169,150],[150,170],[188,174],[174,196],[196,188],[216,186],[186,92],[92,216],[2,97],[97,167],[167,2],[141,125],[125,241],[241,141],[164,167],[167,37],[37,164],[72,38],[38,12],[12,72],[38,82],[82,13],[13,38],[63,68],[68,71],[71,63],[226,35],[35,111],[111,226],[101,50],[50,205],[205,101],[206,92],[92,165],[165,206],[209,198],[198,217],[217,209],[165,167],[167,97],[97,165],[220,115],[115,218],[218,220],[133,112],[112,243],[243,133],[239,238],[238,241],[241,239],[214,135],[135,169],[169,214],[190,173],[173,133],[133,190],[171,208],[208,32],[32,171],[125,44],[44,237],[237,125],[86,87],[87,178],[178,86],[85,86],[86,179],[179,85],[84,85],[85,180],[180,84],[83,84],[84,181],[181,83],[201,83],[83,182],[182,201],[137,93],[93,132],[132,137],[76,62],[62,183],[183,76],[61,76],[76,184],[184,61],[57,61],[61,185],[185,57],[212,57],[57,186],[186,212],[214,207],[207,187],[187,214],[34,143],[143,156],[156,34],[79,239],[239,237],[237,79],[123,137],[137,177],[177,123],[44,1],[1,4],[4,44],[201,194],[194,32],[32,201],[64,102],[102,129],[129,64],[213,215],[215,138],[138,213],[59,166],[166,219],[219,59],[242,99],[99,97],[97,242],[2,94],[94,141],[141,2],[75,59],[59,235],[235,75],[24,110],[110,228],[228,24],[25,130],[130,226],[226,25],[23,24],[24,229],[229,23],[22,23],[23,230],[230,22],[26,22],[22,231],[231,26],[112,26],[26,232],[232,112],[189,190],[190,243],[243,189],[221,56],[56,190],[190,221],[28,56],[56,221],[221,28],[27,28],[28,222],[222,27],[29,27],[27,223],[223,29],[30,29],[29,224],[224,30],[247,30],[30,225],[225,247],[238,79],[79,20],[20,238],[166,59],[59,75],[75,166],[60,75],[75,240],[240,60],[147,177],[177,215],[215,147],[20,79],[79,166],[166,20],[187,147],[147,213],[213,187],[112,233],[233,244],[244,112],[233,128],[128,245],[245,233],[128,114],[114,188],[188,128],[114,217],[217,174],[174,114],[131,115],[115,220],[220,131],[217,198],[198,236],[236,217],[198,131],[131,134],[134,198],[177,132],[132,58],[58,177],[143,35],[35,124],[124,143],[110,163],[163,7],[7,110],[228,110],[110,25],[25,228],[356,389],[389,368],[368,356],[11,302],[302,267],[267,11],[452,350],[350,349],[349,452],[302,303],[303,269],[269,302],[357,343],[343,277],[277,357],[452,453],[453,357],[357,452],[333,332],[332,297],[297,333],[175,152],[152,377],[377,175],[347,348],[348,330],[330,347],[303,304],[304,270],[270,303],[9,336],[336,337],[337,9],[278,279],[279,360],[360,278],[418,262],[262,431],[431,418],[304,408],[408,409],[409,304],[310,415],[415,407],[407,310],[270,409],[409,410],[410,270],[450,348],[348,347],[347,450],[422,430],[430,434],[434,422],[313,314],[314,17],[17,313],[306,307],[307,375],[375,306],[387,388],[388,260],[260,387],[286,414],[414,398],[398,286],[335,406],[406,418],[418,335],[364,367],[367,416],[416,364],[423,358],[358,327],[327,423],[251,284],[284,298],[298,251],[281,5],[5,4],[4,281],[373,374],[374,253],[253,373],[307,320],[320,321],[321,307],[425,427],[427,411],[411,425],[421,313],[313,18],[18,421],[321,405],[405,406],[406,321],[320,404],[404,405],[405,320],[315,16],[16,17],[17,315],[426,425],[425,266],[266,426],[377,400],[400,369],[369,377],[322,391],[391,269],[269,322],[417,465],[465,464],[464,417],[386,257],[257,258],[258,386],[466,260],[260,388],[388,466],[456,399],[399,419],[419,456],[284,332],[332,333],[333,284],[417,285],[285,8],[8,417],[346,340],[340,261],[261,346],[413,441],[441,285],[285,413],[327,460],[460,328],[328,327],[355,371],[371,329],[329,355],[392,439],[439,438],[438,392],[382,341],[341,256],[256,382],[429,420],[420,360],[360,429],[364,394],[394,379],[379,364],[277,343],[343,437],[437,277],[443,444],[444,283],[283,443],[275,440],[440,363],[363,275],[431,262],[262,369],[369,431],[297,338],[338,337],[337,297],[273,375],[375,321],[321,273],[450,451],[451,349],[349,450],[446,342],[342,467],[467,446],[293,334],[334,282],[282,293],[458,461],[461,462],[462,458],[276,353],[353,383],[383,276],[308,324],[324,325],[325,308],[276,300],[300,293],[293,276],[372,345],[345,447],[447,372],[352,345],[345,340],[340,352],[274,1],[1,19],[19,274],[456,248],[248,281],[281,456],[436,427],[427,425],[425,436],[381,256],[256,252],[252,381],[269,391],[391,393],[393,269],[200,199],[199,428],[428,200],[266,330],[330,329],[329,266],[287,273],[273,422],[422,287],[250,462],[462,328],[328,250],[258,286],[286,384],[384,258],[265,353],[353,342],[342,265],[387,259],[259,257],[257,387],[424,431],[431,430],[430,424],[342,353],[353,276],[276,342],[273,335],[335,424],[424,273],[292,325],[325,307],[307,292],[366,447],[447,345],[345,366],[271,303],[303,302],[302,271],[423,266],[266,371],[371,423],[294,455],[455,460],[460,294],[279,278],[278,294],[294,279],[271,272],[272,304],[304,271],[432,434],[434,427],[427,432],[272,407],[407,408],[408,272],[394,430],[430,431],[431,394],[395,369],[369,400],[400,395],[334,333],[333,299],[299,334],[351,417],[417,168],[168,351],[352,280],[280,411],[411,352],[325,319],[319,320],[320,325],[295,296],[296,336],[336,295],[319,403],[403,404],[404,319],[330,348],[348,349],[349,330],[293,298],[298,333],[333,293],[323,454],[454,447],[447,323],[15,16],[16,315],[315,15],[358,429],[429,279],[279,358],[14,15],[15,316],[316,14],[285,336],[336,9],[9,285],[329,349],[349,350],[350,329],[374,380],[380,252],[252,374],[318,402],[402,403],[403,318],[6,197],[197,419],[419,6],[318,319],[319,325],[325,318],[367,364],[364,365],[365,367],[435,367],[367,397],[397,435],[344,438],[438,439],[439,344],[272,271],[271,311],[311,272],[195,5],[5,281],[281,195],[273,287],[287,291],[291,273],[396,428],[428,199],[199,396],[311,271],[271,268],[268,311],[283,444],[444,445],[445,283],[373,254],[254,339],[339,373],[282,334],[334,296],[296,282],[449,347],[347,346],[346,449],[264,447],[447,454],[454,264],[336,296],[296,299],[299,336],[338,10],[10,151],[151,338],[278,439],[439,455],[455,278],[292,407],[407,415],[415,292],[358,371],[371,355],[355,358],[340,345],[345,372],[372,340],[346,347],[347,280],[280,346],[442,443],[443,282],[282,442],[19,94],[94,370],[370,19],[441,442],[442,295],[295,441],[248,419],[419,197],[197,248],[263,255],[255,359],[359,263],[440,275],[275,274],[274,440],[300,383],[383,368],[368,300],[351,412],[412,465],[465,351],[263,467],[467,466],[466,263],[301,368],[368,389],[389,301],[395,378],[378,379],[379,395],[412,351],[351,419],[419,412],[436,426],[426,322],[322,436],[2,164],[164,393],[393,2],[370,462],[462,461],[461,370],[164,0],[0,267],[267,164],[302,11],[11,12],[12,302],[268,12],[12,13],[13,268],[293,300],[300,301],[301,293],[446,261],[261,340],[340,446],[330,266],[266,425],[425,330],[426,423],[423,391],[391,426],[429,355],[355,437],[437,429],[391,327],[327,326],[326,391],[440,457],[457,438],[438,440],[341,382],[382,362],[362,341],[459,457],[457,461],[461,459],[434,430],[430,394],[394,434],[414,463],[463,362],[362,414],[396,369],[369,262],[262,396],[354,461],[461,457],[457,354],[316,403],[403,402],[402,316],[315,404],[404,403],[403,315],[314,405],[405,404],[404,314],[313,406],[406,405],[405,313],[421,418],[418,406],[406,421],[366,401],[401,361],[361,366],[306,408],[408,407],[407,306],[291,409],[409,408],[408,291],[287,410],[410,409],[409,287],[432,436],[436,410],[410,432],[434,416],[416,411],[411,434],[264,368],[368,383],[383,264],[309,438],[438,457],[457,309],[352,376],[376,401],[401,352],[274,275],[275,4],[4,274],[421,428],[428,262],[262,421],[294,327],[327,358],[358,294],[433,416],[416,367],[367,433],[289,455],[455,439],[439,289],[462,370],[370,326],[326,462],[2,326],[326,370],[370,2],[305,460],[460,455],[455,305],[254,449],[449,448],[448,254],[255,261],[261,446],[446,255],[253,450],[450,449],[449,253],[252,451],[451,450],[450,252],[256,452],[452,451],[451,256],[341,453],[453,452],[452,341],[413,464],[464,463],[463,413],[441,413],[413,414],[414,441],[258,442],[442,441],[441,258],[257,443],[443,442],[442,257],[259,444],[444,443],[443,259],[260,445],[445,444],[444,260],[467,342],[342,445],[445,467],[459,458],[458,250],[250,459],[289,392],[392,290],[290,289],[290,328],[328,460],[460,290],[376,433],[433,435],[435,376],[250,290],[290,392],[392,250],[411,416],[416,433],[433,411],[341,463],[463,464],[464,341],[453,464],[464,465],[465,453],[357,465],[465,412],[412,357],[343,412],[412,399],[399,343],[360,363],[363,440],[440,360],[437,399],[399,456],[456,437],[420,456],[456,363],[363,420],[401,435],[435,288],[288,401],[372,383],[383,353],[353,372],[339,255],[255,249],[249,339],[448,261],[261,255],[255,448],[133,243],[243,190],[190,133],[133,155],[155,112],[112,133],[33,246],[246,247],[247,33],[33,130],[130,25],[25,33],[398,384],[384,286],[286,398],[362,398],[398,414],[414,362],[362,463],[463,341],[341,362],[263,359],[359,467],[467,263],[263,249],[249,255],[255,263],[466,467],[467,260],[260,466],[75,60],[60,166],[166,75],[238,239],[239,79],[79,238],[162,127],[127,139],[139,162],[72,11],[11,37],[37,72],[121,232],[232,120],[120,121],[73,72],[72,39],[39,73],[114,128],[128,47],[47,114],[233,232],[232,128],[128,233],[103,104],[104,67],[67,103],[152,175],[175,148],[148,152],[119,118],[118,101],[101,119],[74,73],[73,40],[40,74],[107,9],[9,108],[108,107],[49,48],[48,131],[131,49],[32,194],[194,211],[211,32],[184,74],[74,185],[185,184],[191,80],[80,183],[183,191],[185,40],[40,186],[186,185],[119,230],[230,118],[118,119],[210,202],[202,214],[214,210],[84,83],[83,17],[17,84],[77,76],[76,146],[146,77],[161,160],[160,30],[30,161],[190,56],[56,173],[173,190],[182,106],[106,194],[194,182],[138,135],[135,192],[192,138],[129,203],[203,98],[98,129],[54,21],[21,68],[68,54],[5,51],[51,4],[4,5],[145,144],[144,23],[23,145],[90,77],[77,91],[91,90],[207,205],[205,187],[187,207],[83,201],[201,18],[18,83],[181,91],[91,182],[182,181],[180,90],[90,181],[181,180],[16,85],[85,17],[17,16],[205,206],[206,36],[36,205],[176,148],[148,140],[140,176],[165,92],[92,39],[39,165],[245,193],[193,244],[244,245],[27,159],[159,28],[28,27],[30,247],[247,161],[161,30],[174,236],[236,196],[196,174],[103,54],[54,104],[104,103],[55,193],[193,8],[8,55],[111,117],[117,31],[31,111],[221,189],[189,55],[55,221],[240,98],[98,99],[99,240],[142,126],[126,100],[100,142],[219,166],[166,218],[218,219],[112,155],[155,26],[26,112],[198,209],[209,131],[131,198],[169,135],[135,150],[150,169],[114,47],[47,217],[217,114],[224,223],[223,53],[53,224],[220,45],[45,134],[134,220],[32,211],[211,140],[140,32],[109,67],[67,108],[108,109],[146,43],[43,91],[91,146],[231,230],[230,120],[120,231],[113,226],[226,247],[247,113],[105,63],[63,52],[52,105],[241,238],[238,242],[242,241],[124,46],[46,156],[156,124],[95,78],[78,96],[96,95],[70,46],[46,63],[63,70],[116,143],[143,227],[227,116],[116,123],[123,111],[111,116],[1,44],[44,19],[19,1],[3,236],[236,51],[51,3],[207,216],[216,205],[205,207],[26,154],[154,22],[22,26],[165,39],[39,167],[167,165],[199,200],[200,208],[208,199],[101,36],[36,100],[100,101],[43,57],[57,202],[202,43],[242,20],[20,99],[99,242],[56,28],[28,157],[157,56],[124,35],[35,113],[113,124],[29,160],[160,27],[27,29],[211,204],[204,210],[210,211],[124,113],[113,46],[46,124],[106,43],[43,204],[204,106],[96,62],[62,77],[77,96],[227,137],[137,116],[116,227],[73,41],[41,72],[72,73],[36,203],[203,142],[142,36],[235,64],[64,240],[240,235],[48,49],[49,64],[64,48],[42,41],[41,74],[74,42],[214,212],[212,207],[207,214],[183,42],[42,184],[184,183],[210,169],[169,211],[211,210],[140,170],[170,176],[176,140],[104,105],[105,69],[69,104],[193,122],[122,168],[168,193],[50,123],[123,187],[187,50],[89,96],[96,90],[90,89],[66,65],[65,107],[107,66],[179,89],[89,180],[180,179],[119,101],[101,120],[120,119],[68,63],[63,104],[104,68],[234,93],[93,227],[227,234],[16,15],[15,85],[85,16],[209,129],[129,49],[49,209],[15,14],[14,86],[86,15],[107,55],[55,9],[9,107],[120,100],[100,121],[121,120],[153,145],[145,22],[22,153],[178,88],[88,179],[179,178],[197,6],[6,196],[196,197],[89,88],[88,96],[96,89],[135,138],[138,136],[136,135],[138,215],[215,172],[172,138],[218,115],[115,219],[219,218],[41,42],[42,81],[81,41],[5,195],[195,51],[51,5],[57,43],[43,61],[61,57],[208,171],[171,199],[199,208],[41,81],[81,38],[38,41],[224,53],[53,225],[225,224],[24,144],[144,110],[110,24],[105,52],[52,66],[66,105],[118,229],[229,117],[117,118],[227,34],[34,234],[234,227],[66,107],[107,69],[69,66],[10,109],[109,151],[151,10],[219,48],[48,235],[235,219],[183,62],[62,191],[191,183],[142,129],[129,126],[126,142],[116,111],[111,143],[143,116],[118,117],[117,50],[50,118],[223,222],[222,52],[52,223],[94,19],[19,141],[141,94],[222,221],[221,65],[65,222],[196,3],[3,197],[197,196],[45,220],[220,44],[44,45],[156,70],[70,139],[139,156],[188,122],[122,245],[245,188],[139,71],[71,162],[162,139],[149,170],[170,150],[150,149],[122,188],[188,196],[196,122],[206,216],[216,92],[92,206],[164,2],[2,167],[167,164],[242,141],[141,241],[241,242],[0,164],[164,37],[37,0],[11,72],[72,12],[12,11],[12,38],[38,13],[13,12],[70,63],[63,71],[71,70],[31,226],[226,111],[111,31],[36,101],[101,205],[205,36],[203,206],[206,165],[165,203],[126,209],[209,217],[217,126],[98,165],[165,97],[97,98],[237,220],[220,218],[218,237],[237,239],[239,241],[241,237],[210,214],[214,169],[169,210],[140,171],[171,32],[32,140],[241,125],[125,237],[237,241],[179,86],[86,178],[178,179],[180,85],[85,179],[179,180],[181,84],[84,180],[180,181],[182,83],[83,181],[181,182],[194,201],[201,182],[182,194],[177,137],[137,132],[132,177],[184,76],[76,183],[183,184],[185,61],[61,184],[184,185],[186,57],[57,185],[185,186],[216,212],[212,186],[186,216],[192,214],[214,187],[187,192],[139,34],[34,156],[156,139],[218,79],[79,237],[237,218],[147,123],[123,177],[177,147],[45,44],[44,4],[4,45],[208,201],[201,32],[32,208],[98,64],[64,129],[129,98],[192,213],[213,138],[138,192],[235,59],[59,219],[219,235],[141,242],[242,97],[97,141],[97,2],[2,141],[141,97],[240,75],[75,235],[235,240],[229,24],[24,228],[228,229],[31,25],[25,226],[226,31],[230,23],[23,229],[229,230],[231,22],[22,230],[230,231],[232,26],[26,231],[231,232],[233,112],[112,232],[232,233],[244,189],[189,243],[243,244],[189,221],[221,190],[190,189],[222,28],[28,221],[221,222],[223,27],[27,222],[222,223],[224,29],[29,223],[223,224],[225,30],[30,224],[224,225],[113,247],[247,225],[225,113],[99,60],[60,240],[240,99],[213,147],[147,215],[215,213],[60,20],[20,166],[166,60],[192,187],[187,213],[213,192],[243,112],[112,244],[244,243],[244,233],[233,245],[245,244],[245,128],[128,188],[188,245],[188,114],[114,174],[174,188],[134,131],[131,220],[220,134],[174,217],[217,236],[236,174],[236,198],[198,134],[134,236],[215,177],[177,58],[58,215],[156,143],[143,124],[124,156],[25,110],[110,7],[7,25],[31,228],[228,25],[25,31],[264,356],[356,368],[368,264],[0,11],[11,267],[267,0],[451,452],[452,349],[349,451],[267,302],[302,269],[269,267],[350,357],[357,277],[277,350],[350,452],[452,357],[357,350],[299,333],[333,297],[297,299],[396,175],[175,377],[377,396],[280,347],[347,330],[330,280],[269,303],[303,270],[270,269],[151,9],[9,337],[337,151],[344,278],[278,360],[360,344],[424,418],[418,431],[431,424],[270,304],[304,409],[409,270],[272,310],[310,407],[407,272],[322,270],[270,410],[410,322],[449,450],[450,347],[347,449],[432,422],[422,434],[434,432],[18,313],[313,17],[17,18],[291,306],[306,375],[375,291],[259,387],[387,260],[260,259],[424,335],[335,418],[418,424],[434,364],[364,416],[416,434],[391,423],[423,327],[327,391],[301,251],[251,298],[298,301],[275,281],[281,4],[4,275],[254,373],[373,253],[253,254],[375,307],[307,321],[321,375],[280,425],[425,411],[411,280],[200,421],[421,18],[18,200],[335,321],[321,406],[406,335],[321,320],[320,405],[405,321],[314,315],[315,17],[17,314],[423,426],[426,266],[266,423],[396,377],[377,369],[369,396],[270,322],[322,269],[269,270],[413,417],[417,464],[464,413],[385,386],[386,258],[258,385],[248,456],[456,419],[419,248],[298,284],[284,333],[333,298],[168,417],[417,8],[8,168],[448,346],[346,261],[261,448],[417,413],[413,285],[285,417],[326,327],[327,328],[328,326],[277,355],[355,329],[329,277],[309,392],[392,438],[438,309],[381,382],[382,256],[256,381],[279,429],[429,360],[360,279],[365,364],[364,379],[379,365],[355,277],[277,437],[437,355],[282,443],[443,283],[283,282],[281,275],[275,363],[363,281],[395,431],[431,369],[369,395],[299,297],[297,337],[337,299],[335,273],[273,321],[321,335],[348,450],[450,349],[349,348],[359,446],[446,467],[467,359],[283,293],[293,282],[282,283],[250,458],[458,462],[462,250],[300,276],[276,383],[383,300],[292,308],[308,325],[325,292],[283,276],[276,293],[293,283],[264,372],[372,447],[447,264],[346,352],[352,340],[340,346],[354,274],[274,19],[19,354],[363,456],[456,281],[281,363],[426,436],[436,425],[425,426],[380,381],[381,252],[252,380],[267,269],[269,393],[393,267],[421,200],[200,428],[428,421],[371,266],[266,329],[329,371],[432,287],[287,422],[422,432],[290,250],[250,328],[328,290],[385,258],[258,384],[384,385],[446,265],[265,342],[342,446],[386,387],[387,257],[257,386],[422,424],[424,430],[430,422],[445,342],[342,276],[276,445],[422,273],[273,424],[424,422],[306,292],[292,307],[307,306],[352,366],[366,345],[345,352],[268,271],[271,302],[302,268],[358,423],[423,371],[371,358],[327,294],[294,460],[460,327],[331,279],[279,294],[294,331],[303,271],[271,304],[304,303],[436,432],[432,427],[427,436],[304,272],[272,408],[408,304],[395,394],[394,431],[431,395],[378,395],[395,400],[400,378],[296,334],[334,299],[299,296],[6,351],[351,168],[168,6],[376,352],[352,411],[411,376],[307,325],[325,320],[320,307],[285,295],[295,336],[336,285],[320,319],[319,404],[404,320],[329,330],[330,349],[349,329],[334,293],[293,333],[333,334],[366,323],[323,447],[447,366],[316,15],[15,315],[315,316],[331,358],[358,279],[279,331],[317,14],[14,316],[316,317],[8,285],[285,9],[9,8],[277,329],[329,350],[350,277],[253,374],[374,252],[252,253],[319,318],[318,403],[403,319],[351,6],[6,419],[419,351],[324,318],[318,325],[325,324],[397,367],[367,365],[365,397],[288,435],[435,397],[397,288],[278,344],[344,439],[439,278],[310,272],[272,311],[311,310],[248,195],[195,281],[281,248],[375,273],[273,291],[291,375],[175,396],[396,199],[199,175],[312,311],[311,268],[268,312],[276,283],[283,445],[445,276],[390,373],[373,339],[339,390],[295,282],[282,296],[296,295],[448,449],[449,346],[346,448],[356,264],[264,454],[454,356],[337,336],[336,299],[299,337],[337,338],[338,151],[151,337],[294,278],[278,455],[455,294],[308,292],[292,415],[415,308],[429,358],[358,355],[355,429],[265,340],[340,372],[372,265],[352,346],[346,280],[280,352],[295,442],[442,282],[282,295],[354,19],[19,370],[370,354],[285,441],[441,295],[295,285],[195,248],[248,197],[197,195],[457,440],[440,274],[274,457],[301,300],[300,368],[368,301],[417,351],[351,465],[465,417],[251,301],[301,389],[389,251],[394,395],[395,379],[379,394],[399,412],[412,419],[419,399],[410,436],[436,322],[322,410],[326,2],[2,393],[393,326],[354,370],[370,461],[461,354],[393,164],[164,267],[267,393],[268,302],[302,12],[12,268],[312,268],[268,13],[13,312],[298,293],[293,301],[301,298],[265,446],[446,340],[340,265],[280,330],[330,425],[425,280],[322,426],[426,391],[391,322],[420,429],[429,437],[437,420],[393,391],[391,326],[326,393],[344,440],[440,438],[438,344],[458,459],[459,461],[461,458],[364,434],[434,394],[394,364],[428,396],[396,262],[262,428],[274,354],[354,457],[457,274],[317,316],[316,402],[402,317],[316,315],[315,403],[403,316],[315,314],[314,404],[404,315],[314,313],[313,405],[405,314],[313,421],[421,406],[406,313],[323,366],[366,361],[361,323],[292,306],[306,407],[407,292],[306,291],[291,408],[408,306],[291,287],[287,409],[409,291],[287,432],[432,410],[410,287],[427,434],[434,411],[411,427],[372,264],[264,383],[383,372],[459,309],[309,457],[457,459],[366,352],[352,401],[401,366],[1,274],[274,4],[4,1],[418,421],[421,262],[262,418],[331,294],[294,358],[358,331],[435,433],[433,367],[367,435],[392,289],[289,439],[439,392],[328,462],[462,326],[326,328],[94,2],[2,370],[370,94],[289,305],[305,455],[455,289],[339,254],[254,448],[448,339],[359,255],[255,446],[446,359],[254,253],[253,449],[449,254],[253,252],[252,450],[450,253],[252,256],[256,451],[451,252],[256,341],[341,452],[452,256],[414,413],[413,463],[463,414],[286,441],[441,414],[414,286],[286,258],[258,441],[441,286],[258,257],[257,442],[442,258],[257,259],[259,443],[443,257],[259,260],[260,444],[444,259],[260,467],[467,445],[445,260],[309,459],[459,250],[250,309],[305,289],[289,290],[290,305],[305,290],[290,460],[460,305],[401,376],[376,435],[435,401],[309,250],[250,392],[392,309],[376,411],[411,433],[433,376],[453,341],[341,464],[464,453],[357,453],[453,465],[465,357],[343,357],[357,412],[412,343],[437,343],[343,399],[399,437],[344,360],[360,440],[440,344],[420,437],[437,456],[456,420],[360,420],[420,363],[363,360],[361,401],[401,288],[288,361],[265,372],[372,353],[353,265],[390,339],[339,249],[249,390],[339,448],[448,255],[255,339]);function mp(e){e.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]}}var Se=class extends Cn{constructor(e,t){super(new ti(e,t),"image_in","norm_rect",!1),this.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]},this.outputFacialTransformationMatrixes=this.outputFaceBlendshapes=!1,Lt(e=this.h=new q0,0,1,t=new Ce),this.A=new Y0,Lt(this.h,0,3,this.A),this.u=new Dc,Lt(this.h,0,2,this.u),Hi(this.u,4,1),Ct(this.u,2,.5),Ct(this.A,2,.5),Ct(this.h,4,.5)}get baseOptions(){return te(this.h,Ce,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return"numFaces"in e&&Hi(this.u,4,e.numFaces??1),"minFaceDetectionConfidence"in e&&Ct(this.u,2,e.minFaceDetectionConfidence??.5),"minTrackingConfidence"in e&&Ct(this.h,4,e.minTrackingConfidence??.5),"minFacePresenceConfidence"in e&&Ct(this.A,2,e.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in e&&(this.outputFaceBlendshapes=!!e.outputFaceBlendshapes),"outputFacialTransformationMatrixes"in e&&(this.outputFacialTransformationMatrixes=!!e.outputFacialTransformationMatrixes),this.l(e)}F(e,t){return mp(this),ei(this,e,t),this.j}G(e,t,n){return mp(this),Ei(this,e,n,t),this.j}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"norm_rect"),ee(e,"face_landmarks");const t=new Pn;Si(t,NS,this.h);const n=new vn;Rn(n,2,"mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),$t(n,"NORM_LANDMARKS:face_landmarks"),n.o(t),Xn(e,n),this.g.attachProtoVectorListener("face_landmarks",(i,r)=>{for(const s of i)i=Oa(s),this.j.faceLandmarks.push(Uc(i));mt(this,r)}),this.g.attachEmptyPacketListener("face_landmarks",i=>{mt(this,i)}),this.outputFaceBlendshapes&&(ee(e,"blendshapes"),$t(n,"BLENDSHAPES:blendshapes"),this.g.attachProtoVectorListener("blendshapes",(i,r)=>{if(this.outputFaceBlendshapes)for(const s of i)i=Ic(s),this.j.faceBlendshapes.push(Ju(i.g()??[]));mt(this,r)}),this.g.attachEmptyPacketListener("blendshapes",i=>{mt(this,i)})),this.outputFacialTransformationMatrixes&&(ee(e,"face_geometry"),$t(n,"FACE_GEOMETRY:face_geometry"),this.g.attachProtoVectorListener("face_geometry",(i,r)=>{if(this.outputFacialTransformationMatrixes)for(const s of i)(i=te(i=FS(s),TS,2))&&this.j.facialTransformationMatrixes.push({rows:Vn(i,1)??0??0,columns:Vn(i,2)??0??0,data:Fr(i,3,fi,Ur()).slice()??[]});mt(this,r)}),this.g.attachEmptyPacketListener("face_geometry",i=>{mt(this,i)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Se.prototype.detectForVideo=Se.prototype.G,Se.prototype.detect=Se.prototype.F,Se.prototype.setOptions=Se.prototype.o,Se.createFromModelPath=function(e,t){return Zt(Se,e,{baseOptions:{modelAssetPath:t}})},Se.createFromModelBuffer=function(e,t){return Zt(Se,e,{baseOptions:{modelAssetBuffer:t}})},Se.createFromOptions=function(e,t){return Zt(Se,e,t)},Se.FACE_LANDMARKS_LIPS=ef,Se.FACE_LANDMARKS_LEFT_EYE=nf,Se.FACE_LANDMARKS_LEFT_EYEBROW=rf,Se.FACE_LANDMARKS_LEFT_IRIS=yg,Se.FACE_LANDMARKS_RIGHT_EYE=sf,Se.FACE_LANDMARKS_RIGHT_EYEBROW=af,Se.FACE_LANDMARKS_RIGHT_IRIS=Eg,Se.FACE_LANDMARKS_FACE_OVAL=of,Se.FACE_LANDMARKS_CONTOURS=bg,Se.FACE_LANDMARKS_TESSELATION=Ag;var cf=Qn([0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]);function gp(e){e.gestures=[],e.landmarks=[],e.worldLandmarks=[],e.handedness=[]}function _p(e){return e.gestures.length===0?{gestures:[],landmarks:[],worldLandmarks:[],handedness:[],handednesses:[]}:{gestures:e.gestures,landmarks:e.landmarks,worldLandmarks:e.worldLandmarks,handedness:e.handedness,handednesses:e.handedness}}function vp(e,t=!0){const n=[];for(const r of e){var i=Ic(r);e=[];for(const s of i.g())i=t&&Vn(s,1)!=null?Vn(s,1)??0:-1,e.push({score:Ie(s,2)??0,index:i,categoryName:tn(Ee(s,3))??""??"",displayName:tn(Ee(s,4))??""??""});n.push(e)}return n}var mn=class extends Cn{constructor(e,t){super(new ti(e,t),"image_in","norm_rect",!1),this.gestures=[],this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Lt(e=this.j=new K0,0,1,t=new Ce),this.u=new $u,Lt(this.j,0,2,this.u),this.D=new qu,Lt(this.u,0,3,this.D),this.A=new j0,Lt(this.u,0,2,this.A),this.h=new OS,Lt(this.j,0,3,this.h),Ct(this.A,2,.5),Ct(this.u,4,.5),Ct(this.D,2,.5)}get baseOptions(){return te(this.j,Ce,1)}set baseOptions(e){Lt(this.j,0,1,e)}o(e){var r,s,a,o;if(Hi(this.A,3,e.numHands??1),"minHandDetectionConfidence"in e&&Ct(this.A,2,e.minHandDetectionConfidence??.5),"minTrackingConfidence"in e&&Ct(this.u,4,e.minTrackingConfidence??.5),"minHandPresenceConfidence"in e&&Ct(this.D,2,e.minHandPresenceConfidence??.5),e.cannedGesturesClassifierOptions){var t=new ps,n=t,i=kh(e.cannedGesturesClassifierOptions,(r=te(this.h,ps,3))==null?void 0:r.l());Lt(n,0,2,i),Lt(this.h,0,3,t)}else e.cannedGesturesClassifierOptions===void 0&&((s=te(this.h,ps,3))==null||s.g());return e.customGesturesClassifierOptions?(Lt(n=t=new ps,0,2,i=kh(e.customGesturesClassifierOptions,(a=te(this.h,ps,4))==null?void 0:a.l())),Lt(this.h,0,4,t)):e.customGesturesClassifierOptions===void 0&&((o=te(this.h,ps,4))==null||o.g()),this.l(e)}Ha(e,t){return gp(this),ei(this,e,t),_p(this)}Ia(e,t,n){return gp(this),Ei(this,e,n,t),_p(this)}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"norm_rect"),ee(e,"hand_gestures"),ee(e,"hand_landmarks"),ee(e,"world_hand_landmarks"),ee(e,"handedness");const t=new Pn;Si(t,BS,this.j);const n=new vn;Rn(n,2,"mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),$t(n,"HAND_GESTURES:hand_gestures"),$t(n,"LANDMARKS:hand_landmarks"),$t(n,"WORLD_LANDMARKS:world_hand_landmarks"),$t(n,"HANDEDNESS:handedness"),n.o(t),Xn(e,n),this.g.attachProtoVectorListener("hand_landmarks",(i,r)=>{for(const s of i){i=Oa(s);const a=[];for(const o of Gi(i,V0,1))a.push({x:Ie(o,1)??0,y:Ie(o,2)??0,z:Ie(o,3)??0,visibility:Ie(o,4)??0});this.landmarks.push(a)}mt(this,r)}),this.g.attachEmptyPacketListener("hand_landmarks",i=>{mt(this,i)}),this.g.attachProtoVectorListener("world_hand_landmarks",(i,r)=>{for(const s of i){i=xs(s);const a=[];for(const o of Gi(i,z0,1))a.push({x:Ie(o,1)??0,y:Ie(o,2)??0,z:Ie(o,3)??0,visibility:Ie(o,4)??0});this.worldLandmarks.push(a)}mt(this,r)}),this.g.attachEmptyPacketListener("world_hand_landmarks",i=>{mt(this,i)}),this.g.attachProtoVectorListener("hand_gestures",(i,r)=>{this.gestures.push(...vp(i,!1)),mt(this,r)}),this.g.attachEmptyPacketListener("hand_gestures",i=>{mt(this,i)}),this.g.attachProtoVectorListener("handedness",(i,r)=>{this.handedness.push(...vp(i)),mt(this,r)}),this.g.attachEmptyPacketListener("handedness",i=>{mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};function xp(e){return{landmarks:e.landmarks,worldLandmarks:e.worldLandmarks,handednesses:e.handedness,handedness:e.handedness}}mn.prototype.recognizeForVideo=mn.prototype.Ia,mn.prototype.recognize=mn.prototype.Ha,mn.prototype.setOptions=mn.prototype.o,mn.createFromModelPath=function(e,t){return Zt(mn,e,{baseOptions:{modelAssetPath:t}})},mn.createFromModelBuffer=function(e,t){return Zt(mn,e,{baseOptions:{modelAssetBuffer:t}})},mn.createFromOptions=function(e,t){return Zt(mn,e,t)},mn.HAND_CONNECTIONS=cf;var yn=class extends Cn{constructor(e,t){super(new ti(e,t),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Lt(e=this.h=new $u,0,1,t=new Ce),this.u=new qu,Lt(this.h,0,3,this.u),this.j=new j0,Lt(this.h,0,2,this.j),Hi(this.j,3,1),Ct(this.j,2,.5),Ct(this.u,2,.5),Ct(this.h,4,.5)}get baseOptions(){return te(this.h,Ce,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return"numHands"in e&&Hi(this.j,3,e.numHands??1),"minHandDetectionConfidence"in e&&Ct(this.j,2,e.minHandDetectionConfidence??.5),"minTrackingConfidence"in e&&Ct(this.h,4,e.minTrackingConfidence??.5),"minHandPresenceConfidence"in e&&Ct(this.u,2,e.minHandPresenceConfidence??.5),this.l(e)}F(e,t){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],ei(this,e,t),xp(this)}G(e,t,n){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Ei(this,e,n,t),xp(this)}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"norm_rect"),ee(e,"hand_landmarks"),ee(e,"world_hand_landmarks"),ee(e,"handedness");const t=new Pn;Si(t,kS,this.h);const n=new vn;Rn(n,2,"mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),$t(n,"LANDMARKS:hand_landmarks"),$t(n,"WORLD_LANDMARKS:world_hand_landmarks"),$t(n,"HANDEDNESS:handedness"),n.o(t),Xn(e,n),this.g.attachProtoVectorListener("hand_landmarks",(i,r)=>{for(const s of i)i=Oa(s),this.landmarks.push(Uc(i));mt(this,r)}),this.g.attachEmptyPacketListener("hand_landmarks",i=>{mt(this,i)}),this.g.attachProtoVectorListener("world_hand_landmarks",(i,r)=>{for(const s of i)i=xs(s),this.worldLandmarks.push(_a(i));mt(this,r)}),this.g.attachEmptyPacketListener("world_hand_landmarks",i=>{mt(this,i)}),this.g.attachProtoVectorListener("handedness",(i,r)=>{var s=this.handedness,a=s.push;const o=[];for(const c of i){i=Ic(c);const l=[];for(const u of i.g())l.push({score:Ie(u,2)??0,index:Vn(u,1)??0??-1,categoryName:tn(Ee(u,3))??""??"",displayName:tn(Ee(u,4))??""??""});o.push(l)}a.call(s,...o),mt(this,r)}),this.g.attachEmptyPacketListener("handedness",i=>{mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};yn.prototype.detectForVideo=yn.prototype.G,yn.prototype.detect=yn.prototype.F,yn.prototype.setOptions=yn.prototype.o,yn.createFromModelPath=function(e,t){return Zt(yn,e,{baseOptions:{modelAssetPath:t}})},yn.createFromModelBuffer=function(e,t){return Zt(yn,e,{baseOptions:{modelAssetBuffer:t}})},yn.createFromOptions=function(e,t){return Zt(yn,e,t)},yn.HAND_CONNECTIONS=cf;var Tg=Qn([0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]);function Mp(e){e.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]}}function Sp(e){try{if(!e.D)return e.h;e.D(e.h)}finally{Nc(e)}}function So(e,t){e=Oa(e),t.push(Uc(e))}var ve=class extends Cn{constructor(e,t){super(new ti(e,t),"input_frames_image",null,!1),this.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]},this.outputPoseSegmentationMasks=this.outputFaceBlendshapes=!1,Lt(e=this.j=new eg,0,1,t=new Ce),this.I=new qu,Lt(this.j,0,2,this.I),this.W=new zS,Lt(this.j,0,3,this.W),this.u=new Dc,Lt(this.j,0,4,this.u),this.O=new Y0,Lt(this.j,0,5,this.O),this.A=new Q0,Lt(this.j,0,6,this.A),this.M=new tg,Lt(this.j,0,7,this.M),Ct(this.u,2,.5),Ct(this.u,3,.3),Ct(this.O,2,.5),Ct(this.A,2,.5),Ct(this.A,3,.3),Ct(this.M,2,.5),Ct(this.I,2,.5)}get baseOptions(){return te(this.j,Ce,1)}set baseOptions(e){Lt(this.j,0,1,e)}o(e){return"minFaceDetectionConfidence"in e&&Ct(this.u,2,e.minFaceDetectionConfidence??.5),"minFaceSuppressionThreshold"in e&&Ct(this.u,3,e.minFaceSuppressionThreshold??.3),"minFacePresenceConfidence"in e&&Ct(this.O,2,e.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in e&&(this.outputFaceBlendshapes=!!e.outputFaceBlendshapes),"minPoseDetectionConfidence"in e&&Ct(this.A,2,e.minPoseDetectionConfidence??.5),"minPoseSuppressionThreshold"in e&&Ct(this.A,3,e.minPoseSuppressionThreshold??.3),"minPosePresenceConfidence"in e&&Ct(this.M,2,e.minPosePresenceConfidence??.5),"outputPoseSegmentationMasks"in e&&(this.outputPoseSegmentationMasks=!!e.outputPoseSegmentationMasks),"minHandLandmarksConfidence"in e&&Ct(this.I,2,e.minHandLandmarksConfidence??.5),this.l(e)}F(e,t,n){const i=typeof t!="function"?t:{};return this.D=typeof t=="function"?t:n,Mp(this),ei(this,e,i),Sp(this)}G(e,t,n,i){const r=typeof n!="function"?n:{};return this.D=typeof n=="function"?n:i,Mp(this),Ei(this,e,r,t),Sp(this)}m(){var e=new Ln;Ae(e,"input_frames_image"),ee(e,"pose_landmarks"),ee(e,"pose_world_landmarks"),ee(e,"face_landmarks"),ee(e,"left_hand_landmarks"),ee(e,"left_hand_world_landmarks"),ee(e,"right_hand_landmarks"),ee(e,"right_hand_world_landmarks");const t=new Pn,n=new Xd;Rn(n,1,"type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"),function(r,s){if(s!=null)if(Array.isArray(s))he(r,2,Mc(s,0,Aa));else{if(!(typeof s=="string"||s instanceof mi||du(s)))throw Error("invalid value in Any.value field: "+s+" expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");er(r,2,mu(s,!1),Xr())}}(n,this.j.g());const i=new vn;Rn(i,2,"mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"),Cu(i,8,Xd,n),Me(i,"IMAGE:input_frames_image"),$t(i,"POSE_LANDMARKS:pose_landmarks"),$t(i,"POSE_WORLD_LANDMARKS:pose_world_landmarks"),$t(i,"FACE_LANDMARKS:face_landmarks"),$t(i,"LEFT_HAND_LANDMARKS:left_hand_landmarks"),$t(i,"LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"),$t(i,"RIGHT_HAND_LANDMARKS:right_hand_landmarks"),$t(i,"RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"),i.o(t),Xn(e,i),Fc(this,e),this.g.attachProtoListener("pose_landmarks",(r,s)=>{So(r,this.h.poseLandmarks),mt(this,s)}),this.g.attachEmptyPacketListener("pose_landmarks",r=>{mt(this,r)}),this.g.attachProtoListener("pose_world_landmarks",(r,s)=>{var a=this.h.poseWorldLandmarks;r=xs(r),a.push(_a(r)),mt(this,s)}),this.g.attachEmptyPacketListener("pose_world_landmarks",r=>{mt(this,r)}),this.outputPoseSegmentationMasks&&($t(i,"POSE_SEGMENTATION_MASK:pose_segmentation_mask"),Ds(this,"pose_segmentation_mask"),this.g.Z("pose_segmentation_mask",(r,s)=>{this.h.poseSegmentationMasks=[Fs(this,r,!0,!this.D)],mt(this,s)}),this.g.attachEmptyPacketListener("pose_segmentation_mask",r=>{this.h.poseSegmentationMasks=[],mt(this,r)})),this.g.attachProtoListener("face_landmarks",(r,s)=>{So(r,this.h.faceLandmarks),mt(this,s)}),this.g.attachEmptyPacketListener("face_landmarks",r=>{mt(this,r)}),this.outputFaceBlendshapes&&(ee(e,"extra_blendshapes"),$t(i,"FACE_BLENDSHAPES:extra_blendshapes"),this.g.attachProtoListener("extra_blendshapes",(r,s)=>{var a=this.h.faceBlendshapes;this.outputFaceBlendshapes&&(r=Ic(r),a.push(Ju(r.g()??[]))),mt(this,s)}),this.g.attachEmptyPacketListener("extra_blendshapes",r=>{mt(this,r)})),this.g.attachProtoListener("left_hand_landmarks",(r,s)=>{So(r,this.h.leftHandLandmarks),mt(this,s)}),this.g.attachEmptyPacketListener("left_hand_landmarks",r=>{mt(this,r)}),this.g.attachProtoListener("left_hand_world_landmarks",(r,s)=>{var a=this.h.leftHandWorldLandmarks;r=xs(r),a.push(_a(r)),mt(this,s)}),this.g.attachEmptyPacketListener("left_hand_world_landmarks",r=>{mt(this,r)}),this.g.attachProtoListener("right_hand_landmarks",(r,s)=>{So(r,this.h.rightHandLandmarks),mt(this,s)}),this.g.attachEmptyPacketListener("right_hand_landmarks",r=>{mt(this,r)}),this.g.attachProtoListener("right_hand_world_landmarks",(r,s)=>{var a=this.h.rightHandWorldLandmarks;r=xs(r),a.push(_a(r)),mt(this,s)}),this.g.attachEmptyPacketListener("right_hand_world_landmarks",r=>{mt(this,r)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};ve.prototype.detectForVideo=ve.prototype.G,ve.prototype.detect=ve.prototype.F,ve.prototype.setOptions=ve.prototype.o,ve.createFromModelPath=function(e,t){return Zt(ve,e,{baseOptions:{modelAssetPath:t}})},ve.createFromModelBuffer=function(e,t){return Zt(ve,e,{baseOptions:{modelAssetBuffer:t}})},ve.createFromOptions=function(e,t){return Zt(ve,e,t)},ve.HAND_CONNECTIONS=cf,ve.POSE_CONNECTIONS=Tg,ve.FACE_LANDMARKS_LIPS=ef,ve.FACE_LANDMARKS_LEFT_EYE=nf,ve.FACE_LANDMARKS_LEFT_EYEBROW=rf,ve.FACE_LANDMARKS_LEFT_IRIS=yg,ve.FACE_LANDMARKS_RIGHT_EYE=sf,ve.FACE_LANDMARKS_RIGHT_EYEBROW=af,ve.FACE_LANDMARKS_RIGHT_IRIS=Eg,ve.FACE_LANDMARKS_FACE_OVAL=of,ve.FACE_LANDMARKS_CONTOURS=bg,ve.FACE_LANDMARKS_TESSELATION=Ag;var Un=class extends Cn{constructor(e,t){super(new ti(e,t),"input_image","norm_rect",!0),this.j={classifications:[]},Lt(e=this.h=new ng,0,1,t=new Ce)}get baseOptions(){return te(this.h,Ce,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return Lt(this.h,0,2,kh(e,te(this.h,Xu,2))),this.l(e)}sa(e,t){return this.j={classifications:[]},ei(this,e,t),this.j}ta(e,t,n){return this.j={classifications:[]},Ei(this,e,n,t),this.j}m(){var e=new Ln;Ae(e,"input_image"),Ae(e,"norm_rect"),ee(e,"classifications");const t=new Pn;Si(t,VS,this.h);const n=new vn;Rn(n,2,"mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"),Me(n,"IMAGE:input_image"),Me(n,"NORM_RECT:norm_rect"),$t(n,"CLASSIFICATIONS:classifications"),n.o(t),Xn(e,n),this.g.attachProtoListener("classifications",(i,r)=>{this.j=qS(CS(i)),mt(this,r)}),this.g.attachEmptyPacketListener("classifications",i=>{mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Un.prototype.classifyForVideo=Un.prototype.ta,Un.prototype.classify=Un.prototype.sa,Un.prototype.setOptions=Un.prototype.o,Un.createFromModelPath=function(e,t){return Zt(Un,e,{baseOptions:{modelAssetPath:t}})},Un.createFromModelBuffer=function(e,t){return Zt(Un,e,{baseOptions:{modelAssetBuffer:t}})},Un.createFromOptions=function(e,t){return Zt(Un,e,t)};var En=class extends Cn{constructor(e,t){super(new ti(e,t),"image_in","norm_rect",!0),this.h=new ig,this.embeddings={embeddings:[]},Lt(e=this.h,0,1,t=new Ce)}get baseOptions(){return te(this.h,Ce,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){var t=this.h,n=te(this.h,tp,2);return n=n?n.clone():new tp,e.l2Normalize!==void 0?he(n,1,ba(e.l2Normalize)):"l2Normalize"in e&&he(n,1),e.quantize!==void 0?he(n,2,ba(e.quantize)):"quantize"in e&&he(n,2),Lt(t,0,2,n),this.l(e)}za(e,t){return ei(this,e,t),this.embeddings}Aa(e,t,n){return Ei(this,e,n,t),this.embeddings}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"norm_rect"),ee(e,"embeddings_out");const t=new Pn;Si(t,GS,this.h);const n=new vn;Rn(n,2,"mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),$t(n,"EMBEDDINGS:embeddings_out"),n.o(t),Xn(e,n),this.g.attachProtoListener("embeddings_out",(i,r)=>{i=IS(i),this.embeddings=function(s){return{embeddings:Gi(s,LS,1).map(a=>{var l,u;const o={headIndex:Vn(a,3)??0??-1,headName:tn(Ee(a,4))??""??""};var c=a.v;return t0(c,0|c[bt],Qd,Al(a,1))!==void 0?(a=Fr(a=te(a,Qd,Al(a,1),void 0),1,fi,Ur()),o.floatEmbedding=a.slice()):(c=new Uint8Array(0),o.quantizedEmbedding=((u=(l=te(a,PS,Al(a,2),void 0))==null?void 0:l.na())==null?void 0:u.h())??c),o}),timestampMs:hg(Ee(s,2,void 0,void 0,Zo)??jm)}}(i),mt(this,r)}),this.g.attachEmptyPacketListener("embeddings_out",i=>{mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};En.cosineSimilarity=function(e,t){if(e.floatEmbedding&&t.floatEmbedding)e=ap(e.floatEmbedding,t.floatEmbedding);else{if(!e.quantizedEmbedding||!t.quantizedEmbedding)throw Error("Cannot compute cosine similarity between quantized and float embeddings.");e=ap(sp(e.quantizedEmbedding),sp(t.quantizedEmbedding))}return e},En.prototype.embedForVideo=En.prototype.Aa,En.prototype.embed=En.prototype.za,En.prototype.setOptions=En.prototype.o,En.createFromModelPath=function(e,t){return Zt(En,e,{baseOptions:{modelAssetPath:t}})},En.createFromModelBuffer=function(e,t){return Zt(En,e,{baseOptions:{modelAssetBuffer:t}})},En.createFromOptions=function(e,t){return Zt(En,e,t)};var Hh=class{constructor(e,t,n){this.confidenceMasks=e,this.categoryMask=t,this.qualityScores=n}close(){var e,t;(e=this.confidenceMasks)==null||e.forEach(n=>{n.close()}),(t=this.categoryMask)==null||t.close()}};function ty(e){var n,i;const t=function(r){return Gi(r,vn,1)}(e.ca()).filter(r=>(tn(Ee(r,1))??"").includes("mediapipe.tasks.TensorsToSegmentationCalculator"));if(e.u=[],t.length>1)throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");t.length===1&&(((i=(n=te(t[0],Pn,7))==null?void 0:n.j())==null?void 0:i.g())??new Map).forEach((r,s)=>{e.u[Number(s)]=tn(Ee(r,1))??""})}function yp(e){e.categoryMask=void 0,e.confidenceMasks=void 0,e.qualityScores=void 0}function Ep(e){try{const t=new Hh(e.confidenceMasks,e.categoryMask,e.qualityScores);if(!e.j)return t;e.j(t)}finally{Nc(e)}}Hh.prototype.close=Hh.prototype.close;var pn=class extends Cn{constructor(e,t){super(new ti(e,t),"image_in","norm_rect",!1),this.u=[],this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new Zu,this.A=new rg,Lt(this.h,0,3,this.A),Lt(e=this.h,0,1,t=new Ce)}get baseOptions(){return te(this.h,Ce,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return e.displayNamesLocale!==void 0?he(this.h,2,Ua(e.displayNamesLocale)):"displayNamesLocale"in e&&he(this.h,2),"outputCategoryMask"in e&&(this.outputCategoryMask=e.outputCategoryMask??!1),"outputConfidenceMasks"in e&&(this.outputConfidenceMasks=e.outputConfidenceMasks??!0),super.l(e)}L(){ty(this)}segment(e,t,n){const i=typeof t!="function"?t:{};return this.j=typeof t=="function"?t:n,yp(this),ei(this,e,i),Ep(this)}La(e,t,n,i){const r=typeof n!="function"?n:{};return this.j=typeof n=="function"?n:i,yp(this),Ei(this,e,r,t),Ep(this)}Da(){return this.u}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"norm_rect");const t=new Pn;Si(t,ag,this.h);const n=new vn;Rn(n,2,"mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),n.o(t),Xn(e,n),Fc(this,e),this.outputConfidenceMasks&&(ee(e,"confidence_masks"),$t(n,"CONFIDENCE_MASKS:confidence_masks"),Ds(this,"confidence_masks"),this.g.aa("confidence_masks",(i,r)=>{this.confidenceMasks=i.map(s=>Fs(this,s,!0,!this.j)),mt(this,r)}),this.g.attachEmptyPacketListener("confidence_masks",i=>{this.confidenceMasks=[],mt(this,i)})),this.outputCategoryMask&&(ee(e,"category_mask"),$t(n,"CATEGORY_MASK:category_mask"),Ds(this,"category_mask"),this.g.Z("category_mask",(i,r)=>{this.categoryMask=Fs(this,i,!1,!this.j),mt(this,r)}),this.g.attachEmptyPacketListener("category_mask",i=>{this.categoryMask=void 0,mt(this,i)})),ee(e,"quality_scores"),$t(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",(i,r)=>{this.qualityScores=i,mt(this,r)}),this.g.attachEmptyPacketListener("quality_scores",i=>{this.categoryMask=void 0,mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};pn.prototype.getLabels=pn.prototype.Da,pn.prototype.segmentForVideo=pn.prototype.La,pn.prototype.segment=pn.prototype.segment,pn.prototype.setOptions=pn.prototype.o,pn.createFromModelPath=function(e,t){return Zt(pn,e,{baseOptions:{modelAssetPath:t}})},pn.createFromModelBuffer=function(e,t){return Zt(pn,e,{baseOptions:{modelAssetBuffer:t}})},pn.createFromOptions=function(e,t){return Zt(pn,e,t)};var Wh=class{constructor(e,t,n){this.confidenceMasks=e,this.categoryMask=t,this.qualityScores=n}close(){var e,t;(e=this.confidenceMasks)==null||e.forEach(n=>{n.close()}),(t=this.categoryMask)==null||t.close()}};Wh.prototype.close=Wh.prototype.close;var ai=class extends Cn{constructor(e,t){super(new ti(e,t),"image_in","norm_rect_in",!1),this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new Zu,this.u=new rg,Lt(this.h,0,3,this.u),Lt(e=this.h,0,1,t=new Ce)}get baseOptions(){return te(this.h,Ce,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return"outputCategoryMask"in e&&(this.outputCategoryMask=e.outputCategoryMask??!1),"outputConfidenceMasks"in e&&(this.outputConfidenceMasks=e.outputConfidenceMasks??!0),super.l(e)}segment(e,t,n,i){const r=typeof n!="function"?n:{};if(this.j=typeof n=="function"?n:i,this.qualityScores=this.categoryMask=this.confidenceMasks=void 0,n=this.C+1,i=new og,t.keypoint&&t.scribble)throw Error("Cannot provide both keypoint and scribble.");if(t.keypoint){var s=new Cl;er(s,3,ba(!0),!1),er(s,1,pa(t.keypoint.x),0),er(s,2,pa(t.keypoint.y),0),ma(i,1,Bh,s)}else{if(!t.scribble)throw Error("Must provide either a keypoint or a scribble.");{const o=new WS;for(s of t.scribble)er(t=new Cl,3,ba(!0),!1),er(t,1,pa(s.x),0),er(t,2,pa(s.y),0),Cu(o,1,Cl,t);ma(i,2,Bh,o)}}this.g.addProtoToStream(i.g(),"mediapipe.tasks.vision.interactive_segmenter.proto.RegionOfInterest","roi_in",n),ei(this,e,r);t:{try{const o=new Wh(this.confidenceMasks,this.categoryMask,this.qualityScores);if(!this.j){var a=o;break t}this.j(o)}finally{Nc(this)}a=void 0}return a}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"roi_in"),Ae(e,"norm_rect_in");const t=new Pn;Si(t,ag,this.h);const n=new vn;Rn(n,2,"mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraphV2"),Me(n,"IMAGE:image_in"),Me(n,"ROI:roi_in"),Me(n,"NORM_RECT:norm_rect_in"),n.o(t),Xn(e,n),Fc(this,e),this.outputConfidenceMasks&&(ee(e,"confidence_masks"),$t(n,"CONFIDENCE_MASKS:confidence_masks"),Ds(this,"confidence_masks"),this.g.aa("confidence_masks",(i,r)=>{this.confidenceMasks=i.map(s=>Fs(this,s,!0,!this.j)),mt(this,r)}),this.g.attachEmptyPacketListener("confidence_masks",i=>{this.confidenceMasks=[],mt(this,i)})),this.outputCategoryMask&&(ee(e,"category_mask"),$t(n,"CATEGORY_MASK:category_mask"),Ds(this,"category_mask"),this.g.Z("category_mask",(i,r)=>{this.categoryMask=Fs(this,i,!1,!this.j),mt(this,r)}),this.g.attachEmptyPacketListener("category_mask",i=>{this.categoryMask=void 0,mt(this,i)})),ee(e,"quality_scores"),$t(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",(i,r)=>{this.qualityScores=i,mt(this,r)}),this.g.attachEmptyPacketListener("quality_scores",i=>{this.categoryMask=void 0,mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};ai.prototype.segment=ai.prototype.segment,ai.prototype.setOptions=ai.prototype.o,ai.createFromModelPath=function(e,t){return Zt(ai,e,{baseOptions:{modelAssetPath:t}})},ai.createFromModelBuffer=function(e,t){return Zt(ai,e,{baseOptions:{modelAssetBuffer:t}})},ai.createFromOptions=function(e,t){return Zt(ai,e,t)};var Fn=class extends Cn{constructor(e,t){super(new ti(e,t),"input_frame_gpu","norm_rect",!1),this.j={detections:[]},Lt(e=this.h=new cg,0,1,t=new Ce)}get baseOptions(){return te(this.h,Ce,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return e.displayNamesLocale!==void 0?he(this.h,2,Ua(e.displayNamesLocale)):"displayNamesLocale"in e&&he(this.h,2),e.maxResults!==void 0?Hi(this.h,3,e.maxResults):"maxResults"in e&&he(this.h,3),e.scoreThreshold!==void 0?Ct(this.h,4,e.scoreThreshold):"scoreThreshold"in e&&he(this.h,4),e.categoryAllowlist!==void 0?Qo(this.h,5,e.categoryAllowlist):"categoryAllowlist"in e&&he(this.h,5),e.categoryDenylist!==void 0?Qo(this.h,6,e.categoryDenylist):"categoryDenylist"in e&&he(this.h,6),this.l(e)}F(e,t){return this.j={detections:[]},ei(this,e,t),this.j}G(e,t,n){return this.j={detections:[]},Ei(this,e,n,t),this.j}m(){var e=new Ln;Ae(e,"input_frame_gpu"),Ae(e,"norm_rect"),ee(e,"detections");const t=new Pn;Si(t,XS,this.h);const n=new vn;Rn(n,2,"mediapipe.tasks.vision.ObjectDetectorGraph"),Me(n,"IMAGE:input_frame_gpu"),Me(n,"NORM_RECT:norm_rect"),$t(n,"DETECTIONS:detections"),n.o(t),Xn(e,n),this.g.attachProtoVectorListener("detections",(i,r)=>{for(const s of i)i=k0(s),this.j.detections.push(ug(i));mt(this,r)}),this.g.attachEmptyPacketListener("detections",i=>{mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Fn.prototype.detectForVideo=Fn.prototype.G,Fn.prototype.detect=Fn.prototype.F,Fn.prototype.setOptions=Fn.prototype.o,Fn.createFromModelPath=async function(e,t){return Zt(Fn,e,{baseOptions:{modelAssetPath:t}})},Fn.createFromModelBuffer=function(e,t){return Zt(Fn,e,{baseOptions:{modelAssetBuffer:t}})},Fn.createFromOptions=function(e,t){return Zt(Fn,e,t)};var Xh=class{constructor(e,t,n){this.landmarks=e,this.worldLandmarks=t,this.segmentationMasks=n}close(){var e;(e=this.segmentationMasks)==null||e.forEach(t=>{t.close()})}};function bp(e){e.landmarks=[],e.worldLandmarks=[],e.segmentationMasks=void 0}function Ap(e){try{const t=new Xh(e.landmarks,e.worldLandmarks,e.segmentationMasks);if(!e.u)return t;e.u(t)}finally{Nc(e)}}Xh.prototype.close=Xh.prototype.close;var bn=class extends Cn{constructor(e,t){super(new ti(e,t),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.outputSegmentationMasks=!1,Lt(e=this.h=new lg,0,1,t=new Ce),this.A=new tg,Lt(this.h,0,3,this.A),this.j=new Q0,Lt(this.h,0,2,this.j),Hi(this.j,4,1),Ct(this.j,2,.5),Ct(this.A,2,.5),Ct(this.h,4,.5)}get baseOptions(){return te(this.h,Ce,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return"numPoses"in e&&Hi(this.j,4,e.numPoses??1),"minPoseDetectionConfidence"in e&&Ct(this.j,2,e.minPoseDetectionConfidence??.5),"minTrackingConfidence"in e&&Ct(this.h,4,e.minTrackingConfidence??.5),"minPosePresenceConfidence"in e&&Ct(this.A,2,e.minPosePresenceConfidence??.5),"outputSegmentationMasks"in e&&(this.outputSegmentationMasks=e.outputSegmentationMasks??!1),this.l(e)}F(e,t,n){const i=typeof t!="function"?t:{};return this.u=typeof t=="function"?t:n,bp(this),ei(this,e,i),Ap(this)}G(e,t,n,i){const r=typeof n!="function"?n:{};return this.u=typeof n=="function"?n:i,bp(this),Ei(this,e,r,t),Ap(this)}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"norm_rect"),ee(e,"normalized_landmarks"),ee(e,"world_landmarks"),ee(e,"segmentation_masks");const t=new Pn;Si(t,YS,this.h);const n=new vn;Rn(n,2,"mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),$t(n,"NORM_LANDMARKS:normalized_landmarks"),$t(n,"WORLD_LANDMARKS:world_landmarks"),n.o(t),Xn(e,n),Fc(this,e),this.g.attachProtoVectorListener("normalized_landmarks",(i,r)=>{this.landmarks=[];for(const s of i)i=Oa(s),this.landmarks.push(Uc(i));mt(this,r)}),this.g.attachEmptyPacketListener("normalized_landmarks",i=>{this.landmarks=[],mt(this,i)}),this.g.attachProtoVectorListener("world_landmarks",(i,r)=>{this.worldLandmarks=[];for(const s of i)i=xs(s),this.worldLandmarks.push(_a(i));mt(this,r)}),this.g.attachEmptyPacketListener("world_landmarks",i=>{this.worldLandmarks=[],mt(this,i)}),this.outputSegmentationMasks&&($t(n,"SEGMENTATION_MASK:segmentation_masks"),Ds(this,"segmentation_masks"),this.g.aa("segmentation_masks",(i,r)=>{this.segmentationMasks=i.map(s=>Fs(this,s,!0,!this.u)),mt(this,r)}),this.g.attachEmptyPacketListener("segmentation_masks",i=>{this.segmentationMasks=[],mt(this,i)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};bn.prototype.detectForVideo=bn.prototype.G,bn.prototype.detect=bn.prototype.F,bn.prototype.setOptions=bn.prototype.o,bn.createFromModelPath=function(e,t){return Zt(bn,e,{baseOptions:{modelAssetPath:t}})},bn.createFromModelBuffer=function(e,t){return Zt(bn,e,{baseOptions:{modelAssetBuffer:t}})},bn.createFromOptions=function(e,t){return Zt(bn,e,t)},bn.POSE_CONNECTIONS=Tg;function ey(e,t){return Math.sqrt((e.x-t.x)**2+(e.y-t.y)**2)}function Tp(e,t,n){return e+n*(t-e)}const rr={WRIST:0,THUMB_TIP:4,INDEX_TIP:8,INDEX_MCP:5,MIDDLE_MCP:9,RING_MCP:13,PINKY_MCP:17},yo=[rr.WRIST,rr.INDEX_MCP,rr.MIDDLE_MCP,rr.RING_MCP,rr.PINKY_MCP],ny={Pointing_Up:"pointing",Closed_Fist:"fist",Open_Palm:"openpalm",Thumb_Up:"thumbsup",Thumb_Down:"thumbsdown",Victory:"victory",ILoveYou:"iloveyou"},iy="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm",ry="https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task";class sy{constructor(t=iy,n=.06,i=null){kt(this,"recognizer",null);this.wasmPath=t,this.clickThreshold=n,this.handednessFilter=i}async init(){const t=await Pr.forVisionTasks(this.wasmPath);this.recognizer=await mn.createFromOptions(t,{baseOptions:{modelAssetPath:ry,delegate:"GPU"},numHands:this.handednessFilter?2:1,runningMode:"VIDEO"})}detect(t,n){if(!this.recognizer)return null;const i=this.recognizer.recognizeForVideo(t,n);if(!i.landmarks||i.landmarks.length===0)return null;let r=0;if(this.handednessFilter){const a=i.handedness.findIndex(o=>{var c;return((c=o[0])==null?void 0:c.categoryName)===this.handednessFilter});if(a===-1)return null;r=a}const s=i.gestures[r]??[];return this.analyze(i.landmarks[r],s)}analyze(t,n){const i=t[rr.THUMB_TIP],r=t[rr.INDEX_TIP],s=t[rr.WRIST],a={x:yo.reduce((h,m)=>h+t[m].x,0)/yo.length,y:yo.reduce((h,m)=>h+t[m].y,0)/yo.length},o=ey(i,r),c=n[0],l=c?ny[c.categoryName]??null:null,u=(c==null?void 0:c.score)??0;return{gesture:o<this.clickThreshold?"click":l??"none",gestureName:l,gestureConfidence:u,clickPinchDistance:o,indexTip:{x:r.x,y:r.y},wrist:{x:s.x,y:s.y},palmCenter:a}}destroy(){var t;(t=this.recognizer)==null||t.close(),this.recognizer=null}}const Nn={L_OUTER:33,L_INNER:133,L_TOP:159,L_BOT:145,R_INNER:362,R_OUTER:263,R_TOP:386,R_BOT:374},wp=468,Rp=473,ay="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm",oy="https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";function Eo(e,t){return Math.abs(t)<1e-6?.5:e/t}class cy{constructor(t=ay){kt(this,"landmarker",null);this.wasmPath=t}async init(){const t=await Pr.forVisionTasks(this.wasmPath);this.landmarker=await Se.createFromOptions(t,{baseOptions:{modelAssetPath:oy,delegate:"GPU"},outputFaceBlendshapes:!1,runningMode:"VIDEO",numFaces:1})}detect(t,n){var r;if(!this.landmarker)return null;const i=this.landmarker.detectForVideo(t,n);return(r=i.faceLandmarks)!=null&&r.length?this.analyze(i.faceLandmarks[0]):null}analyze(t){const n=Eo(t[wp].x-t[Nn.L_OUTER].x,t[Nn.L_INNER].x-t[Nn.L_OUTER].x),i=Eo(t[Rp].x-t[Nn.R_INNER].x,t[Nn.R_OUTER].x-t[Nn.R_INNER].x),r=(n+i)/2,s=Eo(t[wp].y-t[Nn.L_TOP].y,t[Nn.L_BOT].y-t[Nn.L_TOP].y),a=Eo(t[Rp].y-t[Nn.R_TOP].y,t[Nn.R_BOT].y-t[Nn.R_TOP].y),o=(s+a)/2;return{gazeX:r,gazeY:o}}destroy(){var t;(t=this.landmarker)==null||t.close(),this.landmarker=null}}const Cp="handface_key_bindings";function ly(e){return{" ":"Space",ArrowUp:"↑",ArrowDown:"↓",ArrowLeft:"←",ArrowRight:"→",Escape:"Esc",Backspace:"⌫",Delete:"Del",Enter:"↵",Tab:"Tab",PageUp:"PgUp",PageDown:"PgDn",Home:"Home",End:"End"}[e]??e}class hy{constructor(){kt(this,"bindings",new Map);this.load()}bind(t,n,i){this.bindings.set(t,{gesture:t,key:n,modifiers:i}),this.save()}unbind(t){this.bindings.delete(t),this.save()}getBinding(t){return this.bindings.get(t)}getAll(){return[...this.bindings.values()]}trigger(t){var r,s,a,o;const n=this.bindings.get(t);if(!n)return;const i={key:n.key,bubbles:!0,cancelable:!0,ctrlKey:((r=n.modifiers)==null?void 0:r.ctrl)??!1,altKey:((s=n.modifiers)==null?void 0:s.alt)??!1,shiftKey:((a=n.modifiers)==null?void 0:a.shift)??!1,metaKey:((o=n.modifiers)==null?void 0:o.meta)??!1};document.dispatchEvent(new KeyboardEvent("keydown",i)),document.dispatchEvent(new KeyboardEvent("keyup",i))}save(){try{localStorage.setItem(Cp,JSON.stringify([...this.bindings.entries()]))}catch{}}load(){try{const t=localStorage.getItem(Cp);t&&(this.bindings=new Map(JSON.parse(t)))}catch{}}}const Pp={pointing:{icon:"☝️",label:"Pointing Up",labelKo:"검지 가리키기",builtin:!0,builtinAction:"커서 이동"},fist:{icon:"✊",label:"Closed Fist",labelKo:"주먹",builtin:!0,builtinAction:"스크롤 다운"},openpalm:{icon:"🖐️",label:"Open Palm",labelKo:"펼친 손",builtin:!0,builtinAction:"스크롤 업"},thumbsup:{icon:"👍",label:"Thumbs Up",labelKo:"엄지 위",builtin:!1},thumbsdown:{icon:"👎",label:"Thumbs Down",labelKo:"엄지 아래",builtin:!1},victory:{icon:"✌️",label:"Victory",labelKo:"브이",builtin:!1},iloveyou:{icon:"🤟",label:"I Love You",labelKo:"아이 러브 유",builtin:!1}},ut="hf-",uy=["thumbsup","thumbsdown","victory","iloveyou"],fy=["pointing","fist","openpalm"];class dy{constructor(t){kt(this,"root");kt(this,"fab");kt(this,"panel");kt(this,"styleEl");kt(this,"isOpen",!1);kt(this,"capturingGesture",null);kt(this,"captureHandler",null);kt(this,"detectedGesture",null);this.mapper=t,this.styleEl=this.injectStyles(),this.fab=this.createFab(),this.panel=this.createPanel(),this.root=document.createElement("div"),this.root.setAttribute("data-handface",""),this.root.appendChild(this.fab),this.root.appendChild(this.panel),document.body.appendChild(this.root),this.fab.addEventListener("click",()=>this.toggle())}setDetected(t,n){this.isOpen&&this.detectedGesture!==t&&(this.detectedGesture=t,this.panel.querySelectorAll(`.${ut}row[data-gesture]`).forEach(i=>{const r=i.dataset.gesture;i.classList.toggle(`${ut}active`,r===t&&n>.6)}))}destroy(){this.stopCapture(),this.styleEl.remove(),this.root.remove()}toggle(){this.isOpen?this.close():this.open()}open(){this.isOpen=!0,this.renderRows(),this.panel.classList.add(`${ut}open`),this.fab.classList.add(`${ut}fab-open`)}close(){this.isOpen=!1,this.stopCapture(),this.panel.classList.remove(`${ut}open`),this.fab.classList.remove(`${ut}fab-open`)}startCapture(t){this.stopCapture(),this.capturingGesture=t,this.captureHandler=n=>{if(n.preventDefault(),n.stopImmediatePropagation(),["Shift","Control","Alt","Meta"].includes(n.key)){document.addEventListener("keydown",this.captureHandler,{once:!0,capture:!0});return}this.mapper.bind(t,n.key,{ctrl:n.ctrlKey||void 0,alt:n.altKey||void 0,shift:n.shiftKey||void 0,meta:n.metaKey||void 0}),this.capturingGesture=null,this.captureHandler=null,this.renderRows()},document.addEventListener("keydown",this.captureHandler,{once:!0,capture:!0}),this.renderRows()}stopCapture(){this.captureHandler&&(document.removeEventListener("keydown",this.captureHandler,{capture:!0}),this.captureHandler=null,this.capturingGesture=null)}createFab(){const t=document.createElement("button");return t.className=`${ut}fab`,t.title="handface 제스처 설정",t.innerHTML="✋",t}createPanel(){const t=document.createElement("div");return t.className=`${ut}panel`,t.innerHTML=`
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
    `,t.querySelector(`.${ut}close-btn`).addEventListener("click",()=>this.close()),t}renderRows(){this.renderBuiltin(),this.renderBindings()}renderBuiltin(){const t=this.panel.querySelector(`.${ut}builtin-rows`);t.innerHTML="",t.appendChild(this.makeReadonlyRow("🤌","엄지+검지 핀치","클릭",null));for(const n of fy){const i=Pp[n];t.appendChild(this.makeReadonlyRow(i.icon,i.labelKo,i.builtinAction,n))}}renderBindings(){const t=this.panel.querySelector(`.${ut}binding-rows`);t.innerHTML="";for(const n of uy){const i=Pp[n],r=this.mapper.getBinding(n),s=this.capturingGesture===n;t.appendChild(this.makeBindingRow(n,i.icon,i.labelKo,(r==null?void 0:r.key)??null,s))}}makeReadonlyRow(t,n,i,r){const s=document.createElement("div");return s.className=`${ut}row`,r&&(s.dataset.gesture=r),s.innerHTML=`
      <span class="${ut}icon">${t}</span>
      <span class="${ut}name">${n}</span>
      <span class="${ut}badge">${i}</span>
    `,s}makeBindingRow(t,n,i,r,s){var c;const a=document.createElement("div");a.className=`${ut}row`,a.dataset.gesture=t;const o=r?this.buildKeyLabel(this.mapper.getBinding(t)):null;return s?(a.innerHTML=`
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
      `,a.querySelector(`.${ut}edit-btn`).addEventListener("click",()=>this.startCapture(t)),(c=a.querySelector(`.${ut}clear-btn`))==null||c.addEventListener("click",()=>{this.mapper.unbind(t),this.renderRows()})),a}buildKeyLabel(t){var i,r,s,a;const n=[];return(i=t.modifiers)!=null&&i.ctrl&&n.push("Ctrl"),(r=t.modifiers)!=null&&r.alt&&n.push("Alt"),(s=t.modifiers)!=null&&s.shift&&n.push("Shift"),(a=t.modifiers)!=null&&a.meta&&n.push("⌘"),n.push(ly(t.key)),n.join("+")}injectStyles(){const t=document.createElement("style");return t.dataset.handface="styles",t.textContent=`
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
    `,document.head.appendChild(t),t}}const py=.1,my=1e3,Lp=12,gy=900,_y=.022,Ip=.04,vy=.65;function xy(e){return e==="right"?"Right":e==="left"?"Left":null}function Dp(e,t,n){return Math.max(0,Math.min(1,(e-t)/(n-t)))}class My extends _M{constructor(n={}){super();kt(this,"video");kt(this,"detector");kt(this,"gazeDetector",null);kt(this,"rafId",null);kt(this,"stream",null);kt(this,"panel",null);kt(this,"isClicking",!1);kt(this,"lastClickMs",0);kt(this,"lastGestureMs",new Map);kt(this,"smoothX",.5);kt(this,"smoothY",.5);kt(this,"prevRawX",.5);kt(this,"prevRawY",.5);kt(this,"wasMovingCursor",!1);kt(this,"calibrated",!1);kt(this,"zoneX0",0);kt(this,"zoneX1",1);kt(this,"zoneY0",0);kt(this,"zoneY1",1);kt(this,"flipHorizontal");kt(this,"cursorSource");kt(this,"cursorAnchor");kt(this,"cursorMode");kt(this,"sensitivity");kt(this,"activeZone");kt(this,"gestureGated");kt(this,"ownedVideo");kt(this,"mapper",new hy);this.flipHorizontal=n.flipHorizontal??!0,this.cursorSource=n.cursorSource??"hand",this.cursorAnchor=n.cursorAnchor??"palm",this.cursorMode=n.cursorMode??"absolute",this.sensitivity=n.sensitivity??2.5,this.gestureGated=n.gestureGated??!1;const i=this.cursorSource==="gaze"?[.35,.35,.65,.65]:[.3,.1,.95,.85];this.activeZone=n.activeZone??i,[this.zoneX0,this.zoneY0,this.zoneX1,this.zoneY1]=this.activeZone;const r=n.threshold??.05;n.video?(this.video=n.video,this.ownedVideo=!1):(this.video=this.createHiddenVideo(),this.ownedVideo=!0),this.detector=new sy(n.wasmPath,r,xy(n.handedness??"right")),this.cursorSource==="gaze"&&(this.gazeDetector=new cy(n.wasmPath))}async start(){await this.detector.init(),this.gazeDetector&&await this.gazeDetector.init(),this.stream=await navigator.mediaDevices.getUserMedia({video:!0}),this.video.srcObject=this.stream,await new Promise(n=>{this.video.onloadedmetadata=()=>{this.video.play(),n()}}),this.loop()}stop(){var n,i,r;this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),(n=this.stream)==null||n.getTracks().forEach(s=>s.stop()),this.stream=null,this.detector.destroy(),(i=this.gazeDetector)==null||i.destroy(),this.gazeDetector=null,(r=this.panel)==null||r.destroy(),this.panel=null,this.ownedVideo&&this.video.remove(),this.removeAllListeners()}recalibrate(){this.calibrated=!1}createPanel(){return this.panel||(this.panel=new dy(this.mapper)),this.panel}createHiddenVideo(){const n=document.createElement("video");return n.style.cssText="position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;",document.body.appendChild(n),n}loop(){this.rafId=requestAnimationFrame(()=>{this.tick(),this.rafId!==null&&this.loop()})}tick(){const n=performance.now(),i=this.detector.detect(this.video,n);let r,s;if(this.gazeDetector){const c=this.gazeDetector.detect(this.video,n);if(!c){i&&this.handleGestureEvents(i,this.currentPos());return}r=this.flipHorizontal?1-c.gazeX:c.gazeX,s=c.gazeY}else{if(!i)return;const c=this.cursorAnchor==="index"?i.indexTip:this.cursorAnchor==="palm"?i.palmCenter:i.wrist;r=this.flipHorizontal?1-c.x:c.x,s=c.y}const a=!this.isClicking&&(this.gazeDetector!==null||!this.gestureGated||(i==null?void 0:i.gestureName)==="pointing");if(a){let c,l;if(this.cursorMode==="relative"){this.wasMovingCursor||(this.prevRawX=r,this.prevRawY=s);const m=(r-this.prevRawX)*this.sensitivity,g=(s-this.prevRawY)*this.sensitivity;c=Math.max(0,Math.min(1,this.smoothX+m)),l=Math.max(0,Math.min(1,this.smoothY+g))}else{if(!this.calibrated){const m=(this.activeZone[2]-this.activeZone[0])/2,g=(this.activeZone[3]-this.activeZone[1])/2;this.zoneX0=r-m,this.zoneX1=r+m,this.zoneY0=s-g,this.zoneY1=s+g,this.smoothX=.5,this.smoothY=.5,this.calibrated=!0}c=Dp(r,this.zoneX0,this.zoneX1),l=Dp(s,this.zoneY0,this.zoneY1)}const u=Math.hypot(r-this.prevRawX,s-this.prevRawY),f=Math.min(u/_y,1),h=Ip+f*(vy-Ip);this.smoothX=Tp(this.smoothX,c,h),this.smoothY=Tp(this.smoothY,l,h)}this.prevRawX=r,this.prevRawY=s,this.wasMovingCursor=a;const o=this.currentPos();this.emit("move",o),i&&this.handleGestureEvents(i,o)}currentPos(){return{x:this.smoothX,y:this.smoothY,screenX:Math.round(this.smoothX*window.innerWidth),screenY:Math.round(this.smoothY*window.innerHeight)}}handleGestureEvents(n,i){var s,a;if(n.gesture==="click"){if(!this.isClicking){this.isClicking=!0;const o=Date.now();o-this.lastClickMs>my&&(this.lastClickMs=o,this.emit("click",i))}}else n.clickPinchDistance>py&&(this.isClicking=!1);this.isClicking||(n.gestureName==="fist"?this.emit("scroll",{deltaY:Lp}):n.gestureName==="openpalm"&&this.emit("scroll",{deltaY:-Lp}));const r=n.gestureName;if(r){(s=this.panel)==null||s.setDetected(r,n.gestureConfidence);const o=Date.now(),c=this.lastGestureMs.get(r)??0;if(o-c>gy){this.lastGestureMs.set(r,o);const l={gesture:r,...i,confidence:n.gestureConfidence};this.emit(r,l),this.mapper.trigger(r)}}else(a=this.panel)==null||a.setDetected(null,0)}}const Up="\0";function Sy(e){return(Math.random()*2-1)*e}function oi(e,t,n){const i=new Array(e);for(let r=0;r<e;r++){const s=new Float32Array(t);if(n>0)for(let a=0;a<t;a++)s[a]=Sy(n);i[r]=s}return i}function yy(e,t){let n=-1/0;for(let s=0;s<t;s++)e[s]>n&&(n=e[s]);let i=0;for(let s=0;s<t;s++)e[s]=Math.exp(e[s]-n),i+=e[s];const r=1/i;for(let s=0;s<t;s++)e[s]*=r}class Fp{constructor(t={}){this.MAX_VOCAB=t.maxVocab??220,this.CTX=t.contextLen??8,this.EMB=t.embedDim??16,this.H1=t.h1??112,this.H2=t.h2??96,this.H3=t.h3??64,this.lr=t.lr??.035,this.momentum=t.momentum??.9;const n=this.MAX_VOCAB,i=this.CTX*this.EMB;this.vocab=new Map,this.invVocab=[],this.addChar(Up),this.embed=oi(n,this.EMB,.12),this.W1=oi(i,this.H1,.08),this.b1=new Float32Array(this.H1),this.W2=oi(this.H1,this.H2,.1),this.b2=new Float32Array(this.H2),this.W3=oi(this.H2,this.H3,.12),this.b3=new Float32Array(this.H3),this.W4=oi(this.H3,n,.1),this.b4=new Float32Array(n),this.vEmbed=oi(n,this.EMB,0),this.vW1=oi(i,this.H1,0),this.vb1=new Float32Array(this.H1),this.vW2=oi(this.H1,this.H2,0),this.vb2=new Float32Array(this.H2),this.vW3=oi(this.H2,this.H3,0),this.vb3=new Float32Array(this.H3),this.vW4=oi(this.H3,n,0),this.vb4=new Float32Array(n),this.lastX=new Float32Array(i),this.lastH1=new Float32Array(this.H1),this.lastH2=new Float32Array(this.H2),this.lastH3=new Float32Array(this.H3),this.lastLogits=new Float32Array(n),this.lastProbs=new Float32Array(n),this.totalSteps=0,this.lossEMA=null}addChar(t){if(this.vocab.has(t))return this.vocab.get(t);if(this.vocab.size>=this.MAX_VOCAB)return 0;const n=this.vocab.size;return this.vocab.set(t,n),this.invVocab.push(t),n}encode(t){const n=[];for(const i of t){const r=this.addChar(i);n.push(r)}return n}forward(t){const{CTX:n,EMB:i,H1:r,H2:s,H3:a,lastX:o,lastH1:c,lastH2:l,lastH3:u,lastLogits:f,lastProbs:h}=this,m=this.vocab.size;for(let g=0;g<n;g++){const M=t[g]|0,p=this.embed[M];for(let d=0;d<i;d++)o[g*i+d]=p[d]}for(let g=0;g<r;g++){let M=this.b1[g];for(let p=0;p<o.length;p++)M+=o[p]*this.W1[p][g];c[g]=M>0?M:0}for(let g=0;g<s;g++){let M=this.b2[g];for(let p=0;p<r;p++)M+=c[p]*this.W2[p][g];l[g]=M>0?M:0}for(let g=0;g<a;g++){let M=this.b3[g];for(let p=0;p<s;p++)M+=l[p]*this.W3[p][g];u[g]=M>0?M:0}for(let g=0;g<m;g++){let M=this.b4[g];for(let p=0;p<a;p++)M+=u[p]*this.W4[p][g];f[g]=M,h[g]=M}return yy(h,m),h}backward(t,n){const i=this.forward(t),{CTX:r,EMB:s,H1:a,H2:o,H3:c,lr:l,momentum:u}=this,f=this.vocab.size,h=this.lastX,m=this.lastH1,g=this.lastH2,M=this.lastH3,p=-Math.log(Math.max(i[n],1e-9)),d=new Float32Array(f);for(let A=0;A<f;A++)d[A]=i[A];d[n]-=1;for(let A=0;A<c;A++){const v=M[A],b=this.W4[A],N=this.vW4[A];for(let R=0;R<f;R++){const F=v*d[R];N[R]=u*N[R]-l*F,b[R]+=N[R]}}for(let A=0;A<f;A++)this.vb4[A]=u*this.vb4[A]-l*d[A],this.b4[A]+=this.vb4[A];const x=new Float32Array(c);for(let A=0;A<c;A++){if(M[A]<=0)continue;let v=0;const b=this.W4[A];for(let N=0;N<f;N++)v+=b[N]*d[N];x[A]=v}for(let A=0;A<o;A++){const v=g[A],b=this.W3[A],N=this.vW3[A];for(let R=0;R<c;R++){const F=v*x[R];N[R]=u*N[R]-l*F,b[R]+=N[R]}}for(let A=0;A<c;A++)this.vb3[A]=u*this.vb3[A]-l*x[A],this.b3[A]+=this.vb3[A];const E=new Float32Array(o);for(let A=0;A<o;A++){if(g[A]<=0)continue;let v=0;const b=this.W3[A];for(let N=0;N<c;N++)v+=b[N]*x[N];E[A]=v}for(let A=0;A<a;A++){const v=m[A],b=this.W2[A],N=this.vW2[A];for(let R=0;R<o;R++){const F=v*E[R];N[R]=u*N[R]-l*F,b[R]+=N[R]}}for(let A=0;A<o;A++)this.vb2[A]=u*this.vb2[A]-l*E[A],this.b2[A]+=this.vb2[A];const y=new Float32Array(a);for(let A=0;A<a;A++){if(m[A]<=0)continue;let v=0;const b=this.W2[A];for(let N=0;N<o;N++)v+=b[N]*E[N];y[A]=v}const w=r*s,C=new Float32Array(w);for(let A=0;A<w;A++){let v=0;const b=this.W1[A],N=this.vW1[A],R=h[A];for(let F=0;F<a;F++){v+=b[F]*y[F];const V=R*y[F];N[F]=u*N[F]-l*V,b[F]+=N[F]}C[A]=v}for(let A=0;A<a;A++)this.vb1[A]=u*this.vb1[A]-l*y[A],this.b1[A]+=this.vb1[A];for(let A=0;A<r;A++){const v=t[A]|0,b=this.embed[v],N=this.vEmbed[v],R=A*s;for(let F=0;F<s;F++){const V=C[R+F];N[F]=u*N[F]-l*V,b[F]+=N[F]}}return this.totalSteps++,this.lossEMA=this.lossEMA===null?p:this.lossEMA*.98+p*.02,p}trainOnText(t,n=3){const i=this.encode(t);if(i.length<2)return 0;let r=0,s=0;for(let a=0;a<n;a++)for(let o=1;o<i.length;o++){const c=new Array(this.CTX);for(let l=0;l<this.CTX;l++){const u=o-this.CTX+l;c[l]=u>=0?i[u]:0}r+=this.backward(c,i[o]),s++}return s>0?r/s:0}sample(t="",n=80,i=.85,r={}){const s=r.minLength??14,a=this.encode(t),o=[],c=new Array(this.CTX);for(let g=0;g<this.CTX;g++){const M=a.length-this.CTX+g;c[g]=M>=0?a[M]:0}const l=this.vocab.size,u=new Float32Array(l),f=0,h=this.vocab.get(`
`)??-1,m=[".","!","?",",","。","?","!"].map(g=>this.vocab.get(g)??-1).filter(g=>g>=0);for(let g=0;g<n;g++){const M=this.forward(c);let p=0;for(let w=0;w<l;w++)u[w]=Math.pow(M[w]+1e-9,1/i),p+=u[w];if(f<l&&(u[f]=0),h>=0&&h<l&&(u[h]=0),g<s)for(const w of m)w>=0&&w<l&&(u[w]=0);p=0;for(let w=0;w<l;w++)p+=u[w];if(p<1e-9)break;const d=1/p;let x=Math.random(),E=0;for(let w=0;w<l;w++)if(x-=u[w]*d,x<=0){E=w;break}const y=this.invVocab[E];if(!y||y===Up)break;o.push(y);for(let w=0;w<this.CTX-1;w++)c[w]=c[w+1];if(c[this.CTX-1]=E,g>=s&&(y==="."||y==="!"||y==="?"||y==="。"))break}return o.join("")}serialize(){return{vocab:Array.from(this.vocab.entries()),embed:this.embed.map(t=>Array.from(t)),W1:this.W1.map(t=>Array.from(t)),b1:Array.from(this.b1),W2:this.W2.map(t=>Array.from(t)),b2:Array.from(this.b2),W3:this.W3.map(t=>Array.from(t)),b3:Array.from(this.b3),W4:this.W4.map(t=>Array.from(t)),b4:Array.from(this.b4),totalSteps:this.totalSteps,lossEMA:this.lossEMA}}loadFrom(t){if(!t||!t.vocab)return!1;this.vocab.clear(),this.invVocab.length=0;for(const[i,r]of t.vocab)this.vocab.set(i,r),this.invVocab[r]=i;const n=(i,r)=>{for(let s=0;s<r.length;s++)if(Array.isArray(r[s]))for(let a=0;a<r[s].length;a++)i[s][a]=r[s][a];else i[s]=r[s]};return n(this.embed,t.embed),n(this.W1,t.W1),n(this.b1,t.b1),n(this.W2,t.W2),n(this.b2,t.b2),n(this.W3,t.W3),n(this.b3,t.b3),n(this.W4,t.W4),n(this.b4,t.b4),this.totalSteps=t.totalSteps||0,this.lossEMA=t.lossEMA??null,!0}}const Ll="handface-nlm-v2",Ey=300;class by{constructor(){this.model=new Fp({maxVocab:220,contextLen:8,embedDim:16,h1:112,h2:96,h3:64,lr:.035}),this.history=[],this.userMessages=[],this.handlers=new Set,this.busy=!1,this.autoSaveOn=!0,this._tryLoad()}onEvent(t){return this.handlers.add(t),()=>this.handlers.delete(t)}emit(t){for(const n of this.handlers)n(t)}get stats(){return{vocabSize:this.model.vocab.size,maxVocab:this.model.MAX_VOCAB,totalSteps:this.model.totalSteps,lossEMA:this.model.lossEMA,messages:this.history.length}}get modelState(){return{h1:this.model.lastH1,h2:this.model.lastH2,h3:this.model.lastH3,probs:this.model.lastProbs,vocabSize:this.model.vocab.size,embed:this.model.lastX}}layerWeightAverages(){const t=n=>{let i=0,r=0;for(const s of n)for(let a=0;a<s.length;a++)i+=Math.abs(s[a]),r++;return r>0?i/r:0};return[t(this.model.W1),t(this.model.W2),t(this.model.W3),t(this.model.W4)]}async send(t){if(!this.busy){this.busy=!0;try{this.history.push({role:"user",text:t}),this.userMessages.push(t),this.userMessages.length>Ey&&this.userMessages.shift(),this.emit({type:"training-start",message:t});const n=this.model.totalSteps;let i=0,r=0;const s=this.model.trainOnText(t,20);s>0&&(i+=s,r++);const a=this.userMessages.length-1;if(a>0){const M=Math.min(20,a);for(let p=0;p<M;p++){const d=Math.floor(Math.random()*a),x=this.model.trainOnText(this.userMessages[d],5);x>0&&(i+=x,r++)}}if(this.userMessages.length>=2){const M=[],p=Math.min(5,this.userMessages.length);for(let x=0;x<p;x++){const E=Math.floor(Math.random()*this.userMessages.length);M.push(this.userMessages[E])}const d=this.model.trainOnText(M.join(" "),4);d>0&&(i+=d,r++)}const o=this.model.trainOnText(t,10);o>0&&(i+=o,r++);const c=this.model.totalSteps-n,l=r>0?i/r:0;this.emit({type:"training-end",avgLoss:l,stepsRun:c,totalSteps:this.model.totalSteps}),await new Promise(M=>setTimeout(M,16));const u=this.model.lossEMA??4,f=Math.max(.78,Math.min(.95,.55+u*.1)),h=t.length>0?t:" ",m=this.model.sample(h,80,f,{minLength:14}),g=m.length>0?m:"...";return this.history.push({role:"ai",text:g}),this.emit({type:"generate-end",text:g}),this.emit({type:"state",stats:this.stats}),this.autoSaveOn&&this._trySave(),g}finally{this.busy=!1}}}reset(){this.model=new Fp({maxVocab:220,contextLen:8,embedDim:16,h1:112,h2:96,h3:64,lr:.035}),this.history.length=0,this.userMessages.length=0;try{localStorage.removeItem(Ll)}catch{}this.emit({type:"state",stats:this.stats})}_trySave(){try{const t=JSON.stringify({model:this.model.serialize(),history:this.history.slice(-40),userMessages:this.userMessages});localStorage.setItem(Ll,t)}catch{}}_tryLoad(){try{const t=localStorage.getItem(Ll);if(!t)return;const n=JSON.parse(t);n.model&&this.model.loadFrom(n.model),n.history&&(this.history=n.history),n.userMessages&&(this.userMessages=n.userMessages)}catch{}}}const Yt=new by,Ns=document.getElementById("cursor");document.getElementById("flash");const Il=document.getElementById("s-status"),Ay=document.getElementById("s-pos"),Ty=document.getElementById("s-clicks"),wy=document.getElementById("s-zoom"),bo=document.getElementById("log"),ha=document.getElementById("start-btn"),Np=document.getElementById("load-msg"),Op=document.getElementById("overlay");function fr(e,t){const n=document.createElement("div");n.className="log-item"+(e?` ${e}`:"");const i=new Date;for(n.textContent=`[${i.getHours()}:${String(i.getMinutes()).padStart(2,"0")}:${String(i.getSeconds()).padStart(2,"0")}] ${t}`,bo.appendChild(n);bo.children.length>9;)bo.removeChild(bo.children[1])}const ta=new gM({antialias:!0});ta.setSize(window.innerWidth,window.innerHeight);ta.setPixelRatio(Math.min(window.devicePixelRatio,2));ta.setClearColor(132104);document.getElementById("canvas-container").appendChild(ta.domElement);const lf=new t1,Os=new Bn(50,window.innerWidth/window.innerHeight,.1,200);Os.position.set(0,.2,7.5);Os.lookAt(0,0,0);let No=7.5,Dl=7.5;const Wi=new Dr;lf.add(Wi);function wg(e=.55){const n=document.createElement("canvas");n.width=n.height=64;const i=n.getContext("2d"),r=i.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);r.addColorStop(0,"rgba(255,255,255,1)"),r.addColorStop(e,"rgba(255,255,255,0.55)"),r.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=r,i.fillRect(0,0,64,64);const s=new u1(n);return s.minFilter=Ze,s.magFilter=Ze,s.needsUpdate=!0,s}const Ry=wg(.5),hf=wg(.3),Hn=[12,42,80,56,22],Cy=[.35,.85,1.4,1.92,2.45],Py=5,Ly=3,Iy=4;function Dy(e,t){if(e===1)return[new U(0,0,0)];const n=[],i=Math.PI*(3-Math.sqrt(5)),r=1.32,s=.86,a=.96,o=.06*t;for(let c=0;c<e;c++){const l=1-c/(e-1)*2,u=Math.sqrt(Math.max(0,1-l*l)),f=i*c,h=Math.cos(f)*u,m=l,g=Math.sin(f)*u;let M=1;if(h>.35&&m>-.3){const C=Math.max(0,h-.35);M+=.14*C*(1.1-Math.abs(m+.05))}if(h<-.45&&m>-.25&&(M+=.08*(Math.abs(h)-.45)),Math.abs(g)>.45&&m<0&&(M+=.1*(Math.abs(g)-.45)),h<-.25&&m<-.3){const C=Math.max(0,Math.abs(h+.25)+Math.abs(m+.3)-.15);M+=.18*C}const p=.07*(Math.sin(m*6+f*3)*.55+Math.cos(f*5+m*4)*.45),d=M*(1+p);let x=h*t*r*d,E=m*t*s*d,y=g*t*a*d;y+=y>=0?o:-o;const w=t*.11;x+=(Math.random()-.5)*w,E+=(Math.random()-.5)*w,y+=(Math.random()-.5)*w,n.push(new U(x,E,y))}return n}const Jn=Hn.map((e,t)=>Dy(e,Cy[t]).map((n,i)=>({pos:n,activation:0,targetActivation:0,layerIdx:t,layerLocalIdx:i}))),cr=Jn.flat(),Ni=[],Bp=new Set,Yh=new Map;cr.forEach((e,t)=>Yh.set(e,t));function uf(e,t,n){const i=Yh.get(e)*1e5+Yh.get(t);Bp.has(i)||(Bp.add(i),Ni.push({src:e,dst:t,intra:n,weight:.12+Math.random()*.88,targetWeight:.12+Math.random()*.88}))}for(let e=0;e<Hn.length-1;e++)for(const t of Jn[e])Jn[e+1].map(n=>({dst:n,d:t.pos.distanceTo(n.pos)})).sort((n,i)=>n.d-i.d).slice(0,Py).forEach(({dst:n})=>uf(t,n,!1));for(let e=1;e<Hn.length;e++)for(const t of Jn[e])Jn[e-1].map(n=>({src:n,d:t.pos.distanceTo(n.pos)})).sort((n,i)=>n.d-i.d).slice(0,Ly).forEach(({src:n})=>uf(n,t,!1));for(let e=0;e<Hn.length;e++){const t=Jn[e];for(const n of t)t.filter(i=>i!==n).map(i=>({dst:i,d:n.pos.distanceTo(i.pos)})).sort((i,r)=>i.d-r.d).slice(0,Iy).forEach(({dst:i})=>uf(n,i,!0))}const Oo=new Map,Bo=new Map;for(const e of Ni)Oo.has(e.dst)||Oo.set(e.dst,[]),Oo.get(e.dst).push(e),Bo.has(e.src)||Bo.set(e.src,[]),Bo.get(e.src).push(e);(function(){for(const a of[1,-1]){const o=new uc(2.55,28,22),c=o.attributes.position;for(let l=0;l<c.count;l++){let u=c.getX(l)*1.32,f=c.getY(l)*.86,h=c.getZ(l)*.96;a>0&&h<0&&(h=0),a<0&&h>0&&(h=0);const m=Math.sqrt(u*u+f*f+h*h)||1,g=u/m,M=f/m,p=h/m;let d=1;g>.35&&M>-.3&&(d+=.12*(g-.35)),g<-.45&&M>-.25&&(d+=.06*(Math.abs(g)-.45)),g<-.25&&M<-.3&&(d+=.15*Math.max(0,Math.abs(g+.25)+Math.abs(M+.3)-.15));const x=Math.atan2(p,g),E=.04*(Math.sin(M*5+x*3)+Math.cos(x*4)*.5),y=d*(1+E);u*=y,f*=y,h*=y,h+=a*.153,c.setXYZ(l,u,f,h)}o.computeVertexNormals(),Wi.add(new _n(o,new Wr({color:16737792,wireframe:!0,blending:Gn,transparent:!0,opacity:.06,depthWrite:!1}))),Wi.add(new _n(o.clone(),new Wr({color:16729088,blending:Gn,transparent:!0,opacity:.015,depthWrite:!1})))}})();const Rg=document.getElementById("input-grid");Rg.style.gridTemplateColumns=`repeat(${Hn[0]}, 1fr)`;const Cg=[],Pg=[];for(let e=0;e<Hn[0];e++){const t=document.createElement("div");t.className="input-cell";const n=document.createElement("div");n.className="input-cell-fill";const i=document.createElement("div");i.className="input-cell-val",i.textContent="00",t.appendChild(n),t.appendChild(i),Rg.appendChild(t),Cg.push(n),Pg.push(i)}const Uy=document.getElementById("weight-list"),Lg=[];for(let e=1;e<Hn.length;e++){const t=document.createElement("div");t.className="weight-row",t.innerHTML=`
    <span class="weight-label">L${e-1}→${e}</span>
    <div class="weight-bar"><div class="weight-fill"></div></div>
    <span class="weight-val">—</span>
  `,Uy.appendChild(t),Lg.push({fill:t.querySelector(".weight-fill"),val:t.querySelector(".weight-val"),layerIdx:e})}const Fy=document.getElementById("pred-list"),Ig=8,Ar=[];for(let e=0;e<Ig;e++){const t=document.createElement("div");t.className="pred-row",t.innerHTML=`
    <span class="pred-char">·</span>
    <div class="pred-bar"><div class="pred-fill"></div></div>
    <span class="pred-pct">—</span>
  `,Fy.appendChild(t),Ar.push({char:t.querySelector(".pred-char"),fill:t.querySelector(".pred-fill"),pct:t.querySelector(".pred-pct")})}function qh(){const e=Yt.history.length>0?Yt.history[Yt.history.length-1].text:" ",t=Yt.model.encode(e),n=new Array(Yt.model.CTX);for(let a=0;a<Yt.model.CTX;a++){const o=t.length-Yt.model.CTX+a;n[a]=o>=0?t[o]:0}Yt.model.forward(n);const i=Yt.model.lastProbs,r=Yt.model.vocab.size,s=[];for(let a=1;a<r;a++){const o=Yt.model.invVocab[a];!o||o===`
`||s.push({ch:o,p:i[a]})}s.sort((a,o)=>o.p-a.p);for(let a=0;a<Ig;a++){const o=s[a];if(o){const c=o.ch===" "?"␣":o.ch;Ar[a].char.textContent=c,Ar[a].fill.style.width=`${Math.round(o.p*100)}%`,Ar[a].pct.textContent=(o.p*100).toFixed(1)+"%"}else Ar[a].char.textContent="·",Ar[a].fill.style.width="0%",Ar[a].pct.textContent="—"}}const $h=document.getElementById("loss-spark"),Er=$h.getContext("2d"),sr=[];function Ny(e){Number.isFinite(e)&&(sr.push(e),sr.length>100&&sr.shift(),Oy())}function Oy(){const e=$h.width,t=$h.height;if(Er.clearRect(0,0,e,t),sr.length<2)return;let n=-1/0,i=1/0;for(const s of sr)s>n&&(n=s),s<i&&(i=s);const r=Math.max(.15,n-i);Er.strokeStyle="rgba(255, 200, 80, 0.85)",Er.lineWidth=1.2,Er.beginPath();for(let s=0;s<sr.length;s++){const a=s/Math.max(1,sr.length-1)*(e-1)+.5,o=1+(n-sr[s])/r*(t-2);s===0?Er.moveTo(a,o):Er.lineTo(a,o)}Er.stroke()}const ko=document.getElementById("chat-msgs"),jh=document.getElementById("chat-input"),By=document.getElementById("chat-send"),ky=document.getElementById("chat-reset"),zy=document.getElementById("chat-stats"),Vy=document.getElementById("chat-loss-fill");function rc(e,t){const n=document.createElement("div");n.className=`chat-msg ${e}`;const i=document.createElement("span");i.className="chat-msg-role",i.textContent=e;const r=document.createElement("span");r.className="chat-msg-text",r.textContent=" "+t,n.appendChild(i),n.appendChild(r),ko.appendChild(n),ko.scrollTop=ko.scrollHeight}function Kh(){const e=Yt.stats,t=e.lossEMA!=null?e.lossEMA.toFixed(2):"—";if(zy.textContent=`vocab ${e.vocabSize} · steps ${e.totalSteps} · loss ${t}`,e.lossEMA!=null){const n=Math.max(0,Math.min(1,1-e.lossEMA/5));Vy.style.width=`${Math.round(n*100)}%`}}function Dg(){if(Yt.history.length===0)rc("sys","메시지를 입력하면 모델이 학습합니다. 처음엔 헛소리지만 점점 비슷해집니다.");else for(const e of Yt.history)rc(e.role,e.text);Kh()}Dg();async function Ug(){const e=jh.value.trim();!e||Yt.busy||(jh.value="",rc("user",e),Yg(e),fr("",`💬 training (${e.length} chars)`),await Yt.send(e))}By.addEventListener("click",Ug);jh.addEventListener("keydown",e=>{e.key==="Enter"&&(e.preventDefault(),Ug())});ky.addEventListener("click",()=>{confirm("모델 가중치와 어휘를 모두 초기화합니다. 진행할까요?")&&(Yt.reset(),ko.innerHTML="",Dg(),kc(),fr("","🔄 model reset"))});Yt.onEvent(e=>{e.type==="training-end"?(kc(),Kh(),Ny(e.avgLoss),qh(),fr("",`🧠 ${e.stepsRun} steps (loss ${e.avgLoss.toFixed(2)})`)):e.type==="generate-end"?(rc("ai",e.text),Yg(e.text),qh()):e.type==="state"&&Kh()});kc();qh();function Gy(){for(let e=0;e<Hn[0];e++){const t=Jn[0][e].activation;Cg[e].style.height=`${Math.round(t*100)}%`,Pg[e].textContent=String(Math.round(t*100)).padStart(2,"0")}for(const e of Lg){let t=0,n=0;for(const r of Jn[e.layerIdx]){const s=Oo.get(r);if(s)for(const a of s)a.intra||(t+=a.weight,n++)}const i=n>0?t/n:0;e.fill.style.width=`${Math.round(i*100)}%`,e.val.textContent=i.toFixed(2)}}const Tr=new Float32Array(Ni.length*6),wr=new Float32Array(Ni.length*6);Ni.forEach((e,t)=>{Tr[t*6+0]=e.src.pos.x,Tr[t*6+1]=e.src.pos.y,Tr[t*6+2]=e.src.pos.z,Tr[t*6+3]=e.dst.pos.x,Tr[t*6+4]=e.dst.pos.y,Tr[t*6+5]=e.dst.pos.z});const Oc=new Xe;Oc.setAttribute("position",new cn(Tr,3));Oc.setAttribute("color",new cn(wr,3));Wi.add(new dm(Oc,new cu({vertexColors:!0,blending:Gn,transparent:!0,depthWrite:!1})));const va=new Float32Array(cr.length*3),zo=new Float32Array(cr.length*3),Vo=new Float32Array(cr.length*3);cr.forEach((e,t)=>{va[t*3]=e.pos.x,va[t*3+1]=e.pos.y,va[t*3+2]=e.pos.z});function Fg(e,t,n,i){const r=new Xe;return r.setAttribute("position",new cn(n,3)),r.setAttribute("color",new cn(e,3)),Wi.add(new lu(r,new lc({vertexColors:!0,size:t,map:i,alphaTest:.01,blending:Gn,transparent:!0,depthWrite:!1}))),r}const Hy=Fg(zo,.18,va,Ry),Wy=Fg(Vo,.065,va,hf),ff=1200,ci=[],Go=new Float32Array(ff*3),Ho=new Float32Array(ff*3),Vr=new Xe;Vr.setAttribute("position",new cn(Go,3));Vr.setAttribute("color",new cn(Ho,3));Vr.setDrawRange(0,0);Wi.add(new lu(Vr,new lc({vertexColors:!0,size:.05,map:hf,alphaTest:.01,blending:Gn,transparent:!0,depthWrite:!1})));function Ul(e,t=0){ci.length>=ff||ci.push({edge:e,t,speed:.008+e.weight*.018+Math.random()*.007})}const Bc=new Dr;Wi.add(Bc);const Ng=new uu(.22,1),Og=new _n(Ng,new Wr({color:16755268,blending:Gn,transparent:!0,opacity:.25,depthWrite:!1})),Bg=new dm(new d1(Ng),new cu({color:16763989,blending:Gn,transparent:!0,opacity:1,depthWrite:!1})),sc=new Dr;sc.add(Og,Bg);Bc.add(sc);const kg=new _n(new uc(.1,20,20),new Wr({color:16777164,blending:Gn,transparent:!0,opacity:1,depthWrite:!1}));Bc.add(kg);function df(e,t,n,i,r){const s=new fu(e,.0075,8,96),a=new _n(s,new Wr({color:r,blending:Gn,transparent:!0,opacity:.75,depthWrite:!1}));return a.rotation.set(t,n,i),a}const zg=df(.29,0,0,0,16759620),Vg=df(.29,Math.PI/2,0,0,16755251),Gg=df(.29,0,Math.PI/2,0,16763989);Bc.add(zg,Vg,Gg);const Hg=2200,Wo=new Float32Array(Hg*3);for(let e=0;e<Hg;e++){const t=8+Math.random()*22,n=2*Math.PI*Math.random(),i=Math.acos(2*Math.random()-1);Wo[e*3]=t*Math.sin(i)*Math.cos(n),Wo[e*3+1]=t*Math.sin(i)*Math.sin(n),Wo[e*3+2]=t*Math.cos(i)}const Wg=new Xe;Wg.setAttribute("position",new Re(Wo,3));const Xg=new lu(Wg,new lc({color:16764057,size:.022,map:hf,alphaTest:.01,blending:Gn,transparent:!0,opacity:.32,depthWrite:!1}));lf.add(Xg);let kp=0;const Xy=280,Yy=600;function Yg(e=null){const t=e||(Yt.history.length>0?Yt.history[Yt.history.length-1].text:"hi"),n=Yt.model.encode(t),i=new Array(Yt.model.CTX);for(let h=0;h<Yt.model.CTX;h++){const m=n.length-Yt.model.CTX+h;i[h]=m>=0?n[m]:0}Yt.model.forward(i);const r=Yt.model.vocab.size,s=new Float32Array(Yt.model.lastX),a=new Float32Array(Yt.model.lastH1),o=new Float32Array(Yt.model.lastH2),c=new Float32Array(Yt.model.lastH3),l=new Float32Array(Yt.model.lastProbs.subarray(0,r)),u=[s,a,o,c,l],f=[s.length,a.length,o.length,c.length,l.length];for(let h=0;h<Hn.length;h++)setTimeout(()=>{const m=u[h],g=f[h],M=Jn[h];let p=1e-6;for(let x=0;x<g;x++){const E=Math.abs(m[x]);E>p&&(p=E)}const d=1/p;for(let x=0;x<M.length;x++){const E=Math.min(g-1,Math.floor(x/M.length*g)),y=Math.abs(m[E])*d;M[x].targetActivation=.08+.92*y}if(h<Hn.length-1)for(const x of M){if(x.targetActivation<.2)continue;const E=Bo.get(x);if(E)for(const y of E){if(y.intra)continue;const w=y.weight*x.targetActivation;Ul(y,0),w>.5&&Ul(y,.04+Math.random()*.06),w>.8&&Ul(y,.09+Math.random()*.06)}}},h*Xy)}function kc(){const e=[Yt.model.W1,Yt.model.W2,Yt.model.W3,Yt.model.W4];for(const t of Ni){const n=Math.min(e.length-1,t.src.layerIdx),i=e[n],r=i.length,s=i[0].length,a=t.src.layerIdx,o=t.intra?a:t.dst.layerIdx,c=Hn[a],l=Hn[o],u=Math.min(r-1,Math.floor(t.src.layerLocalIdx/c*r)),f=Math.min(s-1,Math.floor(t.dst.layerLocalIdx/l*s)),h=Math.abs(i[u][f]||0);t.targetWeight=Math.max(.05,Math.min(1,h*5))}}const Gr=new My({handedness:"right",cursorSource:"gaze"});let ac=0,oc=0,Ao=0,zp=0,Vp=0,Gp=0;Gr.on("move",e=>{Ns.style.left=`${e.screenX}px`,Ns.style.top=`${e.screenY}px`,Ay.textContent=`${e.screenX} · ${e.screenY}`,ac=e.x-.5,oc=e.y-.5});window.addEventListener("mousemove",e=>{ac=e.clientX/window.innerWidth-.5,oc=e.clientY/window.innerHeight-.5,Ns.style.left=`${e.clientX}px`,Ns.style.top=`${e.clientY}px`});Gr.on("click",()=>{Gp++,Ty.textContent=String(Gp),Ns.classList.add("clicking"),setTimeout(()=>Ns.classList.remove("clicking"),80),fr("ev-click","🤌 pinch")});Gr.on("scroll",e=>{No=Math.max(4,Math.min(15,No+e.deltaY*.055));const t=Math.round((1-(No-4)/11)*100);wy.textContent=`${t}%`,fr("ev-scroll",e.deltaY>0?"✊ zoom out":"🖐️ zoom in")});const qy={thumbsup:{label:"👍 thumbs up"},thumbsdown:{label:"👎 thumbs down"},victory:{label:"✌️ victory"},iloveyou:{label:"🤟 iloveyou"}};for(const[e,t]of Object.entries(qy))Gr.on(e,()=>fr("",t.label));const To=new U;let Hp=0;function qg(){requestAnimationFrame(qg),Hp+=.011;const e=performance.now();e-kp>Yy&&(kp=e,kc());for(const s of Ni)s.weight+=(s.targetWeight-s.weight)*.012;for(const s of cr)s.targetActivation*=.993,s.activation+=(s.targetActivation-s.activation)*.07,s.activation<4e-4&&(s.activation=0);let t=0;for(const s of Jn[0])t+=s.activation;t/=Jn[0].length,kg.material.opacity=.85+.15*t+.06*Math.sin(Hp*3),Og.material.opacity=.2+.22*t,Bg.material.opacity=.85+.15*t,sc.rotation.y+=.013,sc.rotation.x+=.006,zg.rotation.z+=.005,Vg.rotation.z+=.006,Gg.rotation.x+=.004;for(let s=0;s<Ni.length;s++){const a=Ni[s],o=Math.max(a.src.activation*.8,a.dst.activation*.65),c=a.weight*(.035+.965*o),l=c*1,u=c*.4,f=c*.05;wr[s*6+0]=l,wr[s*6+1]=u,wr[s*6+2]=f,wr[s*6+3]=l,wr[s*6+4]=u,wr[s*6+5]=f}Oc.attributes.color.needsUpdate=!0;for(let s=0;s<cr.length;s++){const a=cr[s].activation;zo[s*3+0]=.025+a*.55,zo[s*3+1]=.01+a*.22,zo[s*3+2]=.003+a*.03,Vo[s*3+0]=.1+a*.9,Vo[s*3+1]=.04+a*.72,Vo[s*3+2]=.01+a*.2}Hy.attributes.color.needsUpdate=!0,Wy.attributes.color.needsUpdate=!0;for(let s=ci.length-1;s>=0;s--)ci[s].t+=ci[s].speed,ci[s].t>=1&&ci.splice(s,1);for(let s=0;s<ci.length;s++){const a=ci[s];To.lerpVectors(a.edge.src.pos,a.edge.dst.pos,a.t),Go[s*3]=To.x,Go[s*3+1]=To.y,Go[s*3+2]=To.z;const o=a.t<.12?a.t/.12:a.t>.8?(1-a.t)/.2:1,c=(.55+a.edge.weight*.45)*o;Ho[s*3]=c,Ho[s*3+1]=c*.88,Ho[s*3+2]=c*.42}Vr.setDrawRange(0,ci.length),Vr.attributes.position.needsUpdate=!0,Vr.attributes.color.needsUpdate=!0,Vp+=.0015;const n=.06,i=Math.sign(ac)*Math.max(0,Math.abs(ac)-n),r=Math.sign(oc)*Math.max(0,Math.abs(oc)-n);zp+=i*.016,Ao+=r*.011,Ao=Math.max(-1,Math.min(1,Ao)),Wi.rotation.x=Ao,Wi.rotation.y=Vp+zp,Dl+=(No-Dl)*.055,Os.position.z=Dl,Xg.rotation.y+=35e-6,Gy(),ta.render(lf,Os)}qg();ha.addEventListener("click",async()=>{ha.disabled=!0,ha.textContent="LOADING...",Np.textContent="Loading MediaPipe (5-10s)",Il.textContent="INIT";try{await Gr.start(),Gr.createPanel(),Il.textContent="ACTIVE",Op.classList.add("fade-out"),setTimeout(()=>{Op.style.display="none"},650),fr("","start"),document.addEventListener("keydown",e=>{(e.key==="r"||e.key==="R")&&(Gr.recalibrate(),fr("","recalibrated"))})}catch(e){Il.textContent="ERROR",Np.textContent=`Error: ${e.message}`,ha.disabled=!1,ha.textContent="RETRY",console.error(e)}});window.addEventListener("resize",()=>{Os.aspect=window.innerWidth/window.innerHeight,Os.updateProjectionMatrix(),ta.setSize(window.innerWidth,window.innerHeight)});
