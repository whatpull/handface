var a_=Object.defineProperty;var o_=(e,t,n)=>t in e?a_(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var kt=(e,t,n)=>o_(e,typeof t!="symbol"?t+"":t,n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const nu="183",c_=0,Ad=1,l_=2,Io=1,h_=2,pa=3,us=0,gn=1,Li=2,Ui=0,gr=1,mi=2,Td=3,wd=4,u_=5,Cs=100,d_=101,f_=102,p_=103,m_=104,g_=200,__=201,v_=202,x_=203,zl=204,Vl=205,M_=206,S_=207,y_=208,E_=209,b_=210,A_=211,T_=212,w_=213,R_=214,Gl=0,Hl=1,Wl=2,Sr=3,Xl=4,Yl=5,ql=6,$l=7,Zp=0,C_=1,P_=2,di=0,Jp=1,Qp=2,tm=3,em=4,nm=5,im=6,sm=7,rm=300,Hs=301,yr=302,Yc=303,qc=304,uc=306,jl=1e3,Di=1001,Kl=1002,Ze=1003,L_=1004,$a=1005,je=1006,$c=1007,Is=1008,kn=1009,am=1010,om=1011,Ea=1012,iu=1013,gi=1014,li=1015,Oi=1016,su=1017,ru=1018,ba=1020,cm=35902,lm=35899,hm=1021,um=1022,jn=1023,Bi=1026,Ds=1027,dm=1028,au=1029,Er=1030,ou=1031,cu=1033,Do=33776,Uo=33777,No=33778,Fo=33779,Zl=35840,Jl=35841,Ql=35842,th=35843,eh=36196,nh=37492,ih=37496,sh=37488,rh=37489,ah=37490,oh=37491,ch=37808,lh=37809,hh=37810,uh=37811,dh=37812,fh=37813,ph=37814,mh=37815,gh=37816,_h=37817,vh=37818,xh=37819,Mh=37820,Sh=37821,yh=36492,Eh=36494,bh=36495,Ah=36283,Th=36284,wh=36285,Rh=36286,I_=3200,D_=0,U_=1,is="",On="srgb",br="srgb-linear",$o="linear",ae="srgb",Js=7680,Rd=519,N_=512,F_=513,O_=514,lu=515,B_=516,k_=517,hu=518,z_=519,Cd=35044,Pd="300 es",hi=2e3,jo=2001;function V_(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Ko(e){return document.createElementNS("http://www.w3.org/1999/xhtml",e)}function G_(){const e=Ko("canvas");return e.style.display="block",e}const Ld={};function Id(...e){const t="THREE."+e.shift();console.log(t,...e)}function fm(e){const t=e[0];if(typeof t=="string"&&t.startsWith("TSL:")){const n=e[1];n&&n.isStackTrace?e[0]+=" "+n.getLocation():e[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return e}function Ut(...e){e=fm(e);const t="THREE."+e.shift();{const n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function Qt(...e){e=fm(e);const t="THREE."+e.shift();{const n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Zo(...e){const t=e.join(" ");t in Ld||(Ld[t]=!0,Ut(...e))}function H_(e,t,n){return new Promise(function(i,s){function r(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:s();break;case e.TIMEOUT_EXPIRED:setTimeout(r,n);break;default:i()}}setTimeout(r,n)})}const W_={[Gl]:Hl,[Wl]:ql,[Xl]:$l,[Sr]:Yl,[Hl]:Gl,[ql]:Wl,[$l]:Xl,[Yl]:Sr};class Vr{addEventListener(t,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(n)===-1&&i[t].push(n)}hasEventListener(t,n){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(n)!==-1}removeEventListener(t,n){const i=this._listeners;if(i===void 0)return;const s=i[t];if(s!==void 0){const r=s.indexOf(n);r!==-1&&s.splice(r,1)}}dispatchEvent(t){const n=this._listeners;if(n===void 0)return;const i=n[t.type];if(i!==void 0){t.target=this;const s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}}const tn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],jc=Math.PI/180,Ch=180/Math.PI;function Ia(){const e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(tn[e&255]+tn[e>>8&255]+tn[e>>16&255]+tn[e>>24&255]+"-"+tn[t&255]+tn[t>>8&255]+"-"+tn[t>>16&15|64]+tn[t>>24&255]+"-"+tn[n&63|128]+tn[n>>8&255]+"-"+tn[n>>16&255]+tn[n>>24&255]+tn[i&255]+tn[i>>8&255]+tn[i>>16&255]+tn[i>>24&255]).toLowerCase()}function qt(e,t,n){return Math.max(t,Math.min(n,e))}function X_(e,t){return(e%t+t)%t}function Kc(e,t,n){return(1-n)*e+n*t}function sa(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw new Error("Invalid component type.")}}function fn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw new Error("Invalid component type.")}}class he{constructor(t=0,n=0){he.prototype.isVector2=!0,this.x=t,this.y=n}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,n){return this.x=t,this.y=n,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const n=this.x,i=this.y,s=t.elements;return this.x=s[0]*n+s[3]*i+s[6],this.y=s[1]*n+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,n){return this.x=qt(this.x,t.x,n.x),this.y=qt(this.y,t.y,n.y),this}clampScalar(t,n){return this.x=qt(this.x,t,n),this.y=qt(this.y,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y;return n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this}rotateAround(t,n){const i=Math.cos(n),s=Math.sin(n),r=this.x-t.x,a=this.y-t.y;return this.x=r*i-a*s+t.x,this.y=r*s+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Gr{constructor(t=0,n=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=n,this._z=i,this._w=s}static slerpFlat(t,n,i,s,r,a,o){let c=i[s+0],l=i[s+1],u=i[s+2],d=i[s+3],h=r[a+0],m=r[a+1],g=r[a+2],x=r[a+3];if(d!==x||c!==h||l!==m||u!==g){let p=c*h+l*m+u*g+d*x;p<0&&(h=-h,m=-m,g=-g,x=-x,p=-p);let f=1-o;if(p<.9995){const S=Math.acos(p),T=Math.sin(S);f=Math.sin(f*S)/T,o=Math.sin(o*S)/T,c=c*f+h*o,l=l*f+m*o,u=u*f+g*o,d=d*f+x*o}else{c=c*f+h*o,l=l*f+m*o,u=u*f+g*o,d=d*f+x*o;const S=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=S,l*=S,u*=S,d*=S}}t[n]=c,t[n+1]=l,t[n+2]=u,t[n+3]=d}static multiplyQuaternionsFlat(t,n,i,s,r,a){const o=i[s],c=i[s+1],l=i[s+2],u=i[s+3],d=r[a],h=r[a+1],m=r[a+2],g=r[a+3];return t[n]=o*g+u*d+c*m-l*h,t[n+1]=c*g+u*h+l*d-o*m,t[n+2]=l*g+u*m+o*h-c*d,t[n+3]=u*g-o*d-c*h-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,n,i,s){return this._x=t,this._y=n,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,n=!0){const i=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(i/2),u=o(s/2),d=o(r/2),h=c(i/2),m=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=h*u*d+l*m*g,this._y=l*m*d-h*u*g,this._z=l*u*g+h*m*d,this._w=l*u*d-h*m*g;break;case"YXZ":this._x=h*u*d+l*m*g,this._y=l*m*d-h*u*g,this._z=l*u*g-h*m*d,this._w=l*u*d+h*m*g;break;case"ZXY":this._x=h*u*d-l*m*g,this._y=l*m*d+h*u*g,this._z=l*u*g+h*m*d,this._w=l*u*d-h*m*g;break;case"ZYX":this._x=h*u*d-l*m*g,this._y=l*m*d+h*u*g,this._z=l*u*g-h*m*d,this._w=l*u*d+h*m*g;break;case"YZX":this._x=h*u*d+l*m*g,this._y=l*m*d+h*u*g,this._z=l*u*g-h*m*d,this._w=l*u*d-h*m*g;break;case"XZY":this._x=h*u*d-l*m*g,this._y=l*m*d-h*u*g,this._z=l*u*g+h*m*d,this._w=l*u*d+h*m*g;break;default:Ut("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,n){const i=n/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const n=t.elements,i=n[0],s=n[4],r=n[8],a=n[1],o=n[5],c=n[9],l=n[2],u=n[6],d=n[10],h=i+o+d;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(u-c)*m,this._y=(r-l)*m,this._z=(a-s)*m}else if(i>o&&i>d){const m=2*Math.sqrt(1+i-o-d);this._w=(u-c)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+l)/m}else if(o>d){const m=2*Math.sqrt(1+o-i-d);this._w=(r-l)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(c+u)/m}else{const m=2*Math.sqrt(1+d-i-o);this._w=(a-s)/m,this._x=(r+l)/m,this._y=(c+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,n){let i=t.dot(n)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*n.z-t.z*n.y,this._y=t.z*n.x-t.x*n.z,this._z=t.x*n.y-t.y*n.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(qt(this.dot(t),-1,1)))}rotateTowards(t,n){const i=this.angleTo(t);if(i===0)return this;const s=Math.min(1,n/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,n){const i=t._x,s=t._y,r=t._z,a=t._w,o=n._x,c=n._y,l=n._z,u=n._w;return this._x=i*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-i*l,this._z=r*u+a*l+i*c-s*o,this._w=a*u-i*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,n){let i=t._x,s=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let c=1-n;if(o<.9995){const l=Math.acos(o),u=Math.sin(l);c=Math.sin(c*l)/u,n=Math.sin(n*l)/u,this._x=this._x*c+i*n,this._y=this._y*c+s*n,this._z=this._z*c+r*n,this._w=this._w*c+a*n,this._onChangeCallback()}else this._x=this._x*c+i*n,this._y=this._y*c+s*n,this._z=this._z*c+r*n,this._w=this._w*c+a*n,this.normalize();return this}slerpQuaternions(t,n,i){return this.copy(t).slerp(n,i)}random(){const t=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(n),r*Math.cos(n))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,n=0){return this._x=t[n],this._y=t[n+1],this._z=t[n+2],this._w=t[n+3],this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._w,t}fromBufferAttribute(t,n){return this._x=t.getX(n),this._y=t.getY(n),this._z=t.getZ(n),this._w=t.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class F{constructor(t=0,n=0,i=0){F.prototype.isVector3=!0,this.x=t,this.y=n,this.z=i}set(t,n,i){return i===void 0&&(i=this.z),this.x=t,this.y=n,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,n){return this.x=t.x*n.x,this.y=t.y*n.y,this.z=t.z*n.z,this}applyEuler(t){return this.applyQuaternion(Dd.setFromEuler(t))}applyAxisAngle(t,n){return this.applyQuaternion(Dd.setFromAxisAngle(t,n))}applyMatrix3(t){const n=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*n+r[3]*i+r[6]*s,this.y=r[1]*n+r[4]*i+r[7]*s,this.z=r[2]*n+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const n=this.x,i=this.y,s=this.z,r=t.elements,a=1/(r[3]*n+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*n+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*n+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*n+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(t){const n=this.x,i=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*i),u=2*(o*n-r*s),d=2*(r*i-a*n);return this.x=n+c*l+a*d-o*u,this.y=i+c*u+o*l-r*d,this.z=s+c*d+r*u-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const n=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*n+r[4]*i+r[8]*s,this.y=r[1]*n+r[5]*i+r[9]*s,this.z=r[2]*n+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,n){return this.x=qt(this.x,t.x,n.x),this.y=qt(this.y,t.y,n.y),this.z=qt(this.z,t.z,n.z),this}clampScalar(t,n){return this.x=qt(this.x,t,n),this.y=qt(this.y,t,n),this.z=qt(this.z,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,n){const i=t.x,s=t.y,r=t.z,a=n.x,o=n.y,c=n.z;return this.x=s*c-r*o,this.y=r*a-i*c,this.z=i*o-s*a,this}projectOnVector(t){const n=t.lengthSq();if(n===0)return this.set(0,0,0);const i=t.dot(this)/n;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return Zc.copy(this).projectOnVector(t),this.sub(Zc)}reflect(t){return this.sub(Zc.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const n=Math.sqrt(this.lengthSq()*t.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(t)/n;return Math.acos(qt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const n=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return n*n+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,n,i){const s=Math.sin(n)*t;return this.x=s*Math.sin(i),this.y=Math.cos(n)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,n,i){return this.x=t*Math.sin(n),this.y=i,this.z=t*Math.cos(n),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(t){const n=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=n,this.y=i,this.z=s,this}setFromMatrixColumn(t,n){return this.fromArray(t.elements,n*4)}setFromMatrix3Column(t,n){return this.fromArray(t.elements,n*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(t),this.y=n,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Zc=new F,Dd=new Gr;class zt{constructor(t,n,i,s,r,a,o,c,l){zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,n,i,s,r,a,o,c,l)}set(t,n,i,s,r,a,o,c,l){const u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=n,u[4]=r,u[5]=c,u[6]=i,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(t,n,i){return t.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const n=t.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,s=n.elements,r=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],u=i[4],d=i[7],h=i[2],m=i[5],g=i[8],x=s[0],p=s[3],f=s[6],S=s[1],T=s[4],y=s[7],w=s[2],C=s[5],b=s[8];return r[0]=a*x+o*S+c*w,r[3]=a*p+o*T+c*C,r[6]=a*f+o*y+c*b,r[1]=l*x+u*S+d*w,r[4]=l*p+u*T+d*C,r[7]=l*f+u*y+d*b,r[2]=h*x+m*S+g*w,r[5]=h*p+m*T+g*C,r[8]=h*f+m*y+g*b,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[3]*=t,n[6]*=t,n[1]*=t,n[4]*=t,n[7]*=t,n[2]*=t,n[5]*=t,n[8]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8];return n*a*u-n*o*l-i*r*u+i*o*c+s*r*l-s*a*c}invert(){const t=this.elements,n=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],d=u*a-o*l,h=o*c-u*r,m=l*r-a*c,g=n*d+i*h+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const x=1/g;return t[0]=d*x,t[1]=(s*l-u*i)*x,t[2]=(o*i-s*a)*x,t[3]=h*x,t[4]=(u*n-s*c)*x,t[5]=(s*r-o*n)*x,t[6]=m*x,t[7]=(i*c-l*n)*x,t[8]=(a*n-i*r)*x,this}transpose(){let t;const n=this.elements;return t=n[1],n[1]=n[3],n[3]=t,t=n[2],n[2]=n[6],n[6]=t,t=n[5],n[5]=n[7],n[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const n=this.elements;return t[0]=n[0],t[1]=n[3],t[2]=n[6],t[3]=n[1],t[4]=n[4],t[5]=n[7],t[6]=n[2],t[7]=n[5],t[8]=n[8],this}setUvTransform(t,n,i,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+n,0,0,1),this}scale(t,n){return this.premultiply(Jc.makeScale(t,n)),this}rotate(t){return this.premultiply(Jc.makeRotation(-t)),this}translate(t,n){return this.premultiply(Jc.makeTranslation(t,n)),this}makeTranslation(t,n){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,n,0,0,1),this}makeRotation(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(t,n){return this.set(t,0,0,0,n,0,0,0,1),this}equals(t){const n=this.elements,i=t.elements;for(let s=0;s<9;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<9;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Jc=new zt,Ud=new zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Nd=new zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Y_(){const e={enabled:!0,workingColorSpace:br,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===ae&&(s.r=Ni(s.r),s.g=Ni(s.g),s.b=Ni(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ae&&(s.r=_r(s.r),s.g=_r(s.g),s.b=_r(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===is?$o:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Zo("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),e.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Zo("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),e.colorSpaceToWorking(s,r)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return e.define({[br]:{primaries:t,whitePoint:i,transfer:$o,toXYZ:Ud,fromXYZ:Nd,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:On},outputColorSpaceConfig:{drawingBufferColorSpace:On}},[On]:{primaries:t,whitePoint:i,transfer:ae,toXYZ:Ud,fromXYZ:Nd,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:On}}}),e}const Kt=Y_();function Ni(e){return e<.04045?e*.0773993808:Math.pow(e*.9478672986+.0521327014,2.4)}function _r(e){return e<.0031308?e*12.92:1.055*Math.pow(e,.41666)-.055}let Qs;class q_{static getDataURL(t,n="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{Qs===void 0&&(Qs=Ko("canvas")),Qs.width=t.width,Qs.height=t.height;const s=Qs.getContext("2d");t instanceof ImageData?s.putImageData(t,0,0):s.drawImage(t,0,0,t.width,t.height),i=Qs}return i.toDataURL(n)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const n=Ko("canvas");n.width=t.width,n.height=t.height;const i=n.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ni(r[a]/255)*255;return i.putImageData(s,0,0),n}else if(t.data){const n=t.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Ni(n[i]/255)*255):n[i]=Ni(n[i]);return{data:n,width:t.width,height:t.height}}else return Ut("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let $_=0;class uu{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:$_++}),this.uuid=Ia(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?t.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?t.set(n.displayHeight,n.displayWidth,0):n!==null?t.set(n.width,n.height,n.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Qc(s[a].image)):r.push(Qc(s[a]))}else r=Qc(s);i.url=r}return n||(t.images[this.uuid]=i),i}}function Qc(e){return typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap?q_.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(Ut("Texture: Unable to serialize Texture."),{})}let j_=0;const tl=new F;class rn extends Vr{constructor(t=rn.DEFAULT_IMAGE,n=rn.DEFAULT_MAPPING,i=Di,s=Di,r=je,a=Is,o=jn,c=kn,l=rn.DEFAULT_ANISOTROPY,u=is){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:j_++}),this.uuid=Ia(),this.name="",this.source=new uu(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new he(0,0),this.repeat=new he(1,1),this.center=new he(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(tl).x}get height(){return this.source.getSize(tl).y}get depth(){return this.source.getSize(tl).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const n in t){const i=t[n];if(i===void 0){Ut(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const s=this[n];if(s===void 0){Ut(`Texture.setValues(): property '${n}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";if(!n&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==rm)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case jl:t.x=t.x-Math.floor(t.x);break;case Di:t.x=t.x<0?0:1;break;case Kl:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case jl:t.y=t.y-Math.floor(t.y);break;case Di:t.y=t.y<0?0:1;break;case Kl:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}rn.DEFAULT_IMAGE=null;rn.DEFAULT_MAPPING=rm;rn.DEFAULT_ANISOTROPY=1;class Ie{constructor(t=0,n=0,i=0,s=1){Ie.prototype.isVector4=!0,this.x=t,this.y=n,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,n,i,s){return this.x=t,this.y=n,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,n){switch(t){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,n){return this.x=t.x+n.x,this.y=t.y+n.y,this.z=t.z+n.z,this.w=t.w+n.w,this}addScaledVector(t,n){return this.x+=t.x*n,this.y+=t.y*n,this.z+=t.z*n,this.w+=t.w*n,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,n){return this.x=t.x-n.x,this.y=t.y-n.y,this.z=t.z-n.z,this.w=t.w-n.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const n=this.x,i=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*n+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*n+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*n+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*n+a[7]*i+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const n=Math.sqrt(1-t.w*t.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/n,this.y=t.y/n,this.z=t.z/n),this}setAxisAngleFromRotationMatrix(t){let n,i,s,r;const c=t.elements,l=c[0],u=c[4],d=c[8],h=c[1],m=c[5],g=c[9],x=c[2],p=c[6],f=c[10];if(Math.abs(u-h)<.01&&Math.abs(d-x)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+x)<.1&&Math.abs(g+p)<.1&&Math.abs(l+m+f-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const T=(l+1)/2,y=(m+1)/2,w=(f+1)/2,C=(u+h)/4,b=(d+x)/4,v=(g+p)/4;return T>y&&T>w?T<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(T),s=C/i,r=b/i):y>w?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=C/s,r=v/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=b/r,s=v/r),this.set(i,s,r,n),this}let S=Math.sqrt((p-g)*(p-g)+(d-x)*(d-x)+(h-u)*(h-u));return Math.abs(S)<.001&&(S=1),this.x=(p-g)/S,this.y=(d-x)/S,this.z=(h-u)/S,this.w=Math.acos((l+m+f-1)/2),this}setFromMatrixPosition(t){const n=t.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,n){return this.x=qt(this.x,t.x,n.x),this.y=qt(this.y,t.y,n.y),this.z=qt(this.z,t.z,n.z),this.w=qt(this.w,t.w,n.w),this}clampScalar(t,n){return this.x=qt(this.x,t,n),this.y=qt(this.y,t,n),this.z=qt(this.z,t,n),this.w=qt(this.w,t,n),this}clampLength(t,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(qt(i,t,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,n){return this.x+=(t.x-this.x)*n,this.y+=(t.y-this.y)*n,this.z+=(t.z-this.z)*n,this.w+=(t.w-this.w)*n,this}lerpVectors(t,n,i){return this.x=t.x+(n.x-t.x)*i,this.y=t.y+(n.y-t.y)*i,this.z=t.z+(n.z-t.z)*i,this.w=t.w+(n.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,n=0){return this.x=t[n],this.y=t[n+1],this.z=t[n+2],this.w=t[n+3],this}toArray(t=[],n=0){return t[n]=this.x,t[n+1]=this.y,t[n+2]=this.z,t[n+3]=this.w,t}fromBufferAttribute(t,n){return this.x=t.getX(n),this.y=t.getY(n),this.z=t.getZ(n),this.w=t.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class K_ extends Vr{constructor(t=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:je,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=n,this.depth=i.depth,this.scissor=new Ie(0,0,t,n),this.scissorTest=!1,this.viewport=new Ie(0,0,t,n),this.textures=[];const s={width:t,height:n,depth:i.depth},r=new rn(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const n={minFilter:je,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(n.mapping=t.mapping),t.wrapS!==void 0&&(n.wrapS=t.wrapS),t.wrapT!==void 0&&(n.wrapT=t.wrapT),t.wrapR!==void 0&&(n.wrapR=t.wrapR),t.magFilter!==void 0&&(n.magFilter=t.magFilter),t.minFilter!==void 0&&(n.minFilter=t.minFilter),t.format!==void 0&&(n.format=t.format),t.type!==void 0&&(n.type=t.type),t.anisotropy!==void 0&&(n.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(n.colorSpace=t.colorSpace),t.flipY!==void 0&&(n.flipY=t.flipY),t.generateMipmaps!==void 0&&(n.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(n.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,n,i=1){if(this.width!==t||this.height!==n||this.depth!==i){this.width=t,this.height=n,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=n,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,t,n),this.scissor.set(0,0,t,n)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++){this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const s=Object.assign({},t.textures[n].image);this.textures[n].source=new uu(s)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fi extends K_{constructor(t=1,n=1,i={}){super(t,n,i),this.isWebGLRenderTarget=!0}}class pm extends rn{constructor(t=null,n=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=Ze,this.minFilter=Ze,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Z_ extends rn{constructor(t=null,n=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:n,height:i,depth:s},this.magFilter=Ze,this.minFilter=Ze,this.wrapR=Di,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class we{constructor(t,n,i,s,r,a,o,c,l,u,d,h,m,g,x,p){we.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,n,i,s,r,a,o,c,l,u,d,h,m,g,x,p)}set(t,n,i,s,r,a,o,c,l,u,d,h,m,g,x,p){const f=this.elements;return f[0]=t,f[4]=n,f[8]=i,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=c,f[2]=l,f[6]=u,f[10]=d,f[14]=h,f[3]=m,f[7]=g,f[11]=x,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new we().fromArray(this.elements)}copy(t){const n=this.elements,i=t.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(t){const n=this.elements,i=t.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(t){const n=t.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(t,n,i){return this.determinant()===0?(t.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(t.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(t,n,i){return this.set(t.x,n.x,i.x,0,t.y,n.y,i.y,0,t.z,n.z,i.z,0,0,0,0,1),this}extractRotation(t){if(t.determinant()===0)return this.identity();const n=this.elements,i=t.elements,s=1/tr.setFromMatrixColumn(t,0).length(),r=1/tr.setFromMatrixColumn(t,1).length(),a=1/tr.setFromMatrixColumn(t,2).length();return n[0]=i[0]*s,n[1]=i[1]*s,n[2]=i[2]*s,n[3]=0,n[4]=i[4]*r,n[5]=i[5]*r,n[6]=i[6]*r,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(t){const n=this.elements,i=t.x,s=t.y,r=t.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const h=a*u,m=a*d,g=o*u,x=o*d;n[0]=c*u,n[4]=-c*d,n[8]=l,n[1]=m+g*l,n[5]=h-x*l,n[9]=-o*c,n[2]=x-h*l,n[6]=g+m*l,n[10]=a*c}else if(t.order==="YXZ"){const h=c*u,m=c*d,g=l*u,x=l*d;n[0]=h+x*o,n[4]=g*o-m,n[8]=a*l,n[1]=a*d,n[5]=a*u,n[9]=-o,n[2]=m*o-g,n[6]=x+h*o,n[10]=a*c}else if(t.order==="ZXY"){const h=c*u,m=c*d,g=l*u,x=l*d;n[0]=h-x*o,n[4]=-a*d,n[8]=g+m*o,n[1]=m+g*o,n[5]=a*u,n[9]=x-h*o,n[2]=-a*l,n[6]=o,n[10]=a*c}else if(t.order==="ZYX"){const h=a*u,m=a*d,g=o*u,x=o*d;n[0]=c*u,n[4]=g*l-m,n[8]=h*l+x,n[1]=c*d,n[5]=x*l+h,n[9]=m*l-g,n[2]=-l,n[6]=o*c,n[10]=a*c}else if(t.order==="YZX"){const h=a*c,m=a*l,g=o*c,x=o*l;n[0]=c*u,n[4]=x-h*d,n[8]=g*d+m,n[1]=d,n[5]=a*u,n[9]=-o*u,n[2]=-l*u,n[6]=m*d+g,n[10]=h-x*d}else if(t.order==="XZY"){const h=a*c,m=a*l,g=o*c,x=o*l;n[0]=c*u,n[4]=-d,n[8]=l*u,n[1]=h*d+x,n[5]=a*u,n[9]=m*d-g,n[2]=g*d-m,n[6]=o*u,n[10]=x*d+h}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(t){return this.compose(J_,t,Q_)}lookAt(t,n,i){const s=this.elements;return xn.subVectors(t,n),xn.lengthSq()===0&&(xn.z=1),xn.normalize(),$i.crossVectors(i,xn),$i.lengthSq()===0&&(Math.abs(i.z)===1?xn.x+=1e-4:xn.z+=1e-4,xn.normalize(),$i.crossVectors(i,xn)),$i.normalize(),ja.crossVectors(xn,$i),s[0]=$i.x,s[4]=ja.x,s[8]=xn.x,s[1]=$i.y,s[5]=ja.y,s[9]=xn.y,s[2]=$i.z,s[6]=ja.z,s[10]=xn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,n){const i=t.elements,s=n.elements,r=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],u=i[1],d=i[5],h=i[9],m=i[13],g=i[2],x=i[6],p=i[10],f=i[14],S=i[3],T=i[7],y=i[11],w=i[15],C=s[0],b=s[4],v=s[8],E=s[12],k=s[1],R=s[5],U=s[9],V=s[13],Y=s[2],z=s[6],H=s[10],N=s[14],Q=s[3],K=s[7],lt=s[11],gt=s[15];return r[0]=a*C+o*k+c*Y+l*Q,r[4]=a*b+o*R+c*z+l*K,r[8]=a*v+o*U+c*H+l*lt,r[12]=a*E+o*V+c*N+l*gt,r[1]=u*C+d*k+h*Y+m*Q,r[5]=u*b+d*R+h*z+m*K,r[9]=u*v+d*U+h*H+m*lt,r[13]=u*E+d*V+h*N+m*gt,r[2]=g*C+x*k+p*Y+f*Q,r[6]=g*b+x*R+p*z+f*K,r[10]=g*v+x*U+p*H+f*lt,r[14]=g*E+x*V+p*N+f*gt,r[3]=S*C+T*k+y*Y+w*Q,r[7]=S*b+T*R+y*z+w*K,r[11]=S*v+T*U+y*H+w*lt,r[15]=S*E+T*V+y*N+w*gt,this}multiplyScalar(t){const n=this.elements;return n[0]*=t,n[4]*=t,n[8]*=t,n[12]*=t,n[1]*=t,n[5]*=t,n[9]*=t,n[13]*=t,n[2]*=t,n[6]*=t,n[10]*=t,n[14]*=t,n[3]*=t,n[7]*=t,n[11]*=t,n[15]*=t,this}determinant(){const t=this.elements,n=t[0],i=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],d=t[6],h=t[10],m=t[14],g=t[3],x=t[7],p=t[11],f=t[15],S=c*m-l*h,T=o*m-l*d,y=o*h-c*d,w=a*m-l*u,C=a*h-c*u,b=a*d-o*u;return n*(x*S-p*T+f*y)-i*(g*S-p*w+f*C)+s*(g*T-x*w+f*b)-r*(g*y-x*C+p*b)}transpose(){const t=this.elements;let n;return n=t[1],t[1]=t[4],t[4]=n,n=t[2],t[2]=t[8],t[8]=n,n=t[6],t[6]=t[9],t[9]=n,n=t[3],t[3]=t[12],t[12]=n,n=t[7],t[7]=t[13],t[13]=n,n=t[11],t[11]=t[14],t[14]=n,this}setPosition(t,n,i){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=n,s[14]=i),this}invert(){const t=this.elements,n=t[0],i=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],d=t[9],h=t[10],m=t[11],g=t[12],x=t[13],p=t[14],f=t[15],S=n*o-i*a,T=n*c-s*a,y=n*l-r*a,w=i*c-s*o,C=i*l-r*o,b=s*l-r*c,v=u*x-d*g,E=u*p-h*g,k=u*f-m*g,R=d*p-h*x,U=d*f-m*x,V=h*f-m*p,Y=S*V-T*U+y*R+w*k-C*E+b*v;if(Y===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const z=1/Y;return t[0]=(o*V-c*U+l*R)*z,t[1]=(s*U-i*V-r*R)*z,t[2]=(x*b-p*C+f*w)*z,t[3]=(h*C-d*b-m*w)*z,t[4]=(c*k-a*V-l*E)*z,t[5]=(n*V-s*k+r*E)*z,t[6]=(p*y-g*b-f*T)*z,t[7]=(u*b-h*y+m*T)*z,t[8]=(a*U-o*k+l*v)*z,t[9]=(i*k-n*U-r*v)*z,t[10]=(g*C-x*y+f*S)*z,t[11]=(d*y-u*C-m*S)*z,t[12]=(o*E-a*R-c*v)*z,t[13]=(n*R-i*E+s*v)*z,t[14]=(x*T-g*w-p*S)*z,t[15]=(u*w-d*T+h*S)*z,this}scale(t){const n=this.elements,i=t.x,s=t.y,r=t.z;return n[0]*=i,n[4]*=s,n[8]*=r,n[1]*=i,n[5]*=s,n[9]*=r,n[2]*=i,n[6]*=s,n[10]*=r,n[3]*=i,n[7]*=s,n[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,n=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(n,i,s))}makeTranslation(t,n,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(t){const n=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(t){const n=Math.cos(t),i=Math.sin(t);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,n){const i=Math.cos(n),s=Math.sin(n),r=1-i,a=t.x,o=t.y,c=t.z,l=r*a,u=r*o;return this.set(l*a+i,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+i,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+i,0,0,0,0,1),this}makeScale(t,n,i){return this.set(t,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,n,i,s,r,a){return this.set(1,i,r,0,t,1,a,0,n,s,1,0,0,0,0,1),this}compose(t,n,i){const s=this.elements,r=n._x,a=n._y,o=n._z,c=n._w,l=r+r,u=a+a,d=o+o,h=r*l,m=r*u,g=r*d,x=a*u,p=a*d,f=o*d,S=c*l,T=c*u,y=c*d,w=i.x,C=i.y,b=i.z;return s[0]=(1-(x+f))*w,s[1]=(m+y)*w,s[2]=(g-T)*w,s[3]=0,s[4]=(m-y)*C,s[5]=(1-(h+f))*C,s[6]=(p+S)*C,s[7]=0,s[8]=(g+T)*b,s[9]=(p-S)*b,s[10]=(1-(h+x))*b,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,n,i){const s=this.elements;t.x=s[12],t.y=s[13],t.z=s[14];const r=this.determinant();if(r===0)return i.set(1,1,1),n.identity(),this;let a=tr.set(s[0],s[1],s[2]).length();const o=tr.set(s[4],s[5],s[6]).length(),c=tr.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Xn.copy(this);const l=1/a,u=1/o,d=1/c;return Xn.elements[0]*=l,Xn.elements[1]*=l,Xn.elements[2]*=l,Xn.elements[4]*=u,Xn.elements[5]*=u,Xn.elements[6]*=u,Xn.elements[8]*=d,Xn.elements[9]*=d,Xn.elements[10]*=d,n.setFromRotationMatrix(Xn),i.x=a,i.y=o,i.z=c,this}makePerspective(t,n,i,s,r,a,o=hi,c=!1){const l=this.elements,u=2*r/(n-t),d=2*r/(i-s),h=(n+t)/(n-t),m=(i+s)/(i-s);let g,x;if(c)g=r/(a-r),x=a*r/(a-r);else if(o===hi)g=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===jo)g=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=d,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,n,i,s,r,a,o=hi,c=!1){const l=this.elements,u=2/(n-t),d=2/(i-s),h=-(n+t)/(n-t),m=-(i+s)/(i-s);let g,x;if(c)g=1/(a-r),x=a/(a-r);else if(o===hi)g=-2/(a-r),x=-(a+r)/(a-r);else if(o===jo)g=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=u,l[4]=0,l[8]=0,l[12]=h,l[1]=0,l[5]=d,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=g,l[14]=x,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const n=this.elements,i=t.elements;for(let s=0;s<16;s++)if(n[s]!==i[s])return!1;return!0}fromArray(t,n=0){for(let i=0;i<16;i++)this.elements[i]=t[i+n];return this}toArray(t=[],n=0){const i=this.elements;return t[n]=i[0],t[n+1]=i[1],t[n+2]=i[2],t[n+3]=i[3],t[n+4]=i[4],t[n+5]=i[5],t[n+6]=i[6],t[n+7]=i[7],t[n+8]=i[8],t[n+9]=i[9],t[n+10]=i[10],t[n+11]=i[11],t[n+12]=i[12],t[n+13]=i[13],t[n+14]=i[14],t[n+15]=i[15],t}}const tr=new F,Xn=new we,J_=new F(0,0,0),Q_=new F(1,1,1),$i=new F,ja=new F,xn=new F,Fd=new we,Od=new Gr;class ki{constructor(t=0,n=0,i=0,s=ki.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,n,i,s=this._order){return this._x=t,this._y=n,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,n=this._order,i=!0){const s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],d=s[2],h=s[6],m=s[10];switch(n){case"XYZ":this._y=Math.asin(qt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,l),this._z=0);break;case"YXZ":this._x=Math.asin(-qt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(qt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-qt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(qt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-qt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,m),this._y=0);break;default:Ut("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,n,i){return Fd.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Fd,n,i)}setFromVector3(t,n=this._order){return this.set(t.x,t.y,t.z,n)}reorder(t){return Od.setFromEuler(this),this.setFromQuaternion(Od,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],n=0){return t[n]=this._x,t[n+1]=this._y,t[n+2]=this._z,t[n+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ki.DEFAULT_ORDER="XYZ";class mm{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let t1=0;const Bd=new F,er=new Gr,Ti=new we,Ka=new F,ra=new F,e1=new F,n1=new Gr,kd=new F(1,0,0),zd=new F(0,1,0),Vd=new F(0,0,1),Gd={type:"added"},i1={type:"removed"},nr={type:"childadded",child:null},el={type:"childremoved",child:null};class un extends Vr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:t1++}),this.uuid=Ia(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=un.DEFAULT_UP.clone();const t=new F,n=new ki,i=new Gr,s=new F(1,1,1);function r(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new we},normalMatrix:{value:new zt}}),this.matrix=new we,this.matrixWorld=new we,this.matrixAutoUpdate=un.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new mm,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,n){this.quaternion.setFromAxisAngle(t,n)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,n){return er.setFromAxisAngle(t,n),this.quaternion.multiply(er),this}rotateOnWorldAxis(t,n){return er.setFromAxisAngle(t,n),this.quaternion.premultiply(er),this}rotateX(t){return this.rotateOnAxis(kd,t)}rotateY(t){return this.rotateOnAxis(zd,t)}rotateZ(t){return this.rotateOnAxis(Vd,t)}translateOnAxis(t,n){return Bd.copy(t).applyQuaternion(this.quaternion),this.position.add(Bd.multiplyScalar(n)),this}translateX(t){return this.translateOnAxis(kd,t)}translateY(t){return this.translateOnAxis(zd,t)}translateZ(t){return this.translateOnAxis(Vd,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Ti.copy(this.matrixWorld).invert())}lookAt(t,n,i){t.isVector3?Ka.copy(t):Ka.set(t,n,i);const s=this.parent;this.updateWorldMatrix(!0,!1),ra.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Ti.lookAt(ra,Ka,this.up):Ti.lookAt(Ka,ra,this.up),this.quaternion.setFromRotationMatrix(Ti),s&&(Ti.extractRotation(s.matrixWorld),er.setFromRotationMatrix(Ti),this.quaternion.premultiply(er.invert()))}add(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return t===this?(Qt("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Gd),nr.child=t,this.dispatchEvent(nr),nr.child=null):Qt("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(t);return n!==-1&&(t.parent=null,this.children.splice(n,1),t.dispatchEvent(i1),el.child=t,this.dispatchEvent(el),el.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Ti.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Ti.multiply(t.parent.matrixWorld)),t.applyMatrix4(Ti),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Gd),nr.child=t,this.dispatchEvent(nr),nr.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,n){if(this[t]===n)return this;for(let i=0,s=this.children.length;i<s;i++){const a=this.children[i].getObjectByProperty(t,n);if(a!==void 0)return a}}getObjectsByProperty(t,n,i=[]){this[t]===n&&i.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,n,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ra,t,e1),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ra,n1,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return t.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(t){t(this);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].traverseVisible(t)}traverseAncestors(t){const n=this.parent;n!==null&&(t(n),n.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const n=t.x,i=t.y,s=t.z,r=this.matrix.elements;r[12]+=n-r[0]*n-r[4]*i-r[8]*s,r[13]+=i-r[1]*n-r[5]*i-r[9]*s,r[14]+=s-r[2]*n-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const n=this.children;for(let i=0,s=n.length;i<s;i++)n[i].updateMatrixWorld(t)}updateWorldMatrix(t,n){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){const n=t===void 0||typeof t=="string",i={};n&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),this.static!==!1&&(s.static=this.static),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(t),s.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(t.animations,c))}}if(n){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),d=a(t.shapes),h=a(t.skeletons),m=a(t.animations),g=a(t.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),m.length>0&&(i.animations=m),g.length>0&&(i.nodes=g)}return i.object=s,i;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,n=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),t.pivot!==null&&(this.pivot=t.pivot.clone()),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),n===!0)for(let i=0;i<t.children.length;i++){const s=t.children[i];this.add(s.clone())}return this}}un.DEFAULT_UP=new F(0,1,0);un.DEFAULT_MATRIX_AUTO_UPDATE=!0;un.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class pr extends un{constructor(){super(),this.isGroup=!0,this.type="Group"}}const s1={type:"move"};class nl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const n=this._hand;if(n)for(const i of t.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,n,i){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&n.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const x of t.hand.values()){const p=n.getJointPose(x,i),f=this._getHandJoint(l,x);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],h=u.position.distanceTo(d.position),m=.02,g=.005;l.inputState.pinching&&h>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&h<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=n.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=n.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(s1)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,n){if(t.joints[n.jointName]===void 0){const i=new pr;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[n.jointName]=i,t.add(i)}return t.joints[n.jointName]}}const gm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ji={h:0,s:0,l:0},Za={h:0,s:0,l:0};function il(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}class ie{constructor(t,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,n,i)}set(t,n,i){if(n===void 0&&i===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,n,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,n=On){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.colorSpaceToWorking(this,n),this}setRGB(t,n,i,s=Kt.workingColorSpace){return this.r=t,this.g=n,this.b=i,Kt.colorSpaceToWorking(this,s),this}setHSL(t,n,i,s=Kt.workingColorSpace){if(t=X_(t,1),n=qt(n,0,1),i=qt(i,0,1),n===0)this.r=this.g=this.b=i;else{const r=i<=.5?i*(1+n):i+n-i*n,a=2*i-r;this.r=il(a,r,t+1/3),this.g=il(a,r,t),this.b=il(a,r,t-1/3)}return Kt.colorSpaceToWorking(this,s),this}setStyle(t,n=On){function i(r){r!==void 0&&parseFloat(r)<1&&Ut("Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,n);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,n);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,n);break;default:Ut("Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(r,16),n);Ut("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,n);return this}setColorName(t,n=On){const i=gm[t.toLowerCase()];return i!==void 0?this.setHex(i,n):Ut("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ni(t.r),this.g=Ni(t.g),this.b=Ni(t.b),this}copyLinearToSRGB(t){return this.r=_r(t.r),this.g=_r(t.g),this.b=_r(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=On){return Kt.workingToColorSpace(en.copy(this),t),Math.round(qt(en.r*255,0,255))*65536+Math.round(qt(en.g*255,0,255))*256+Math.round(qt(en.b*255,0,255))}getHexString(t=On){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,n=Kt.workingColorSpace){Kt.workingToColorSpace(en.copy(this),n);const i=en.r,s=en.g,r=en.b,a=Math.max(i,s,r),o=Math.min(i,s,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=u<=.5?d/(a+o):d/(2-a-o),a){case i:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-i)/d+2;break;case r:c=(i-s)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,n=Kt.workingColorSpace){return Kt.workingToColorSpace(en.copy(this),n),t.r=en.r,t.g=en.g,t.b=en.b,t}getStyle(t=On){Kt.workingToColorSpace(en.copy(this),t);const n=en.r,i=en.g,s=en.b;return t!==On?`color(${t} ${n.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,n,i){return this.getHSL(ji),this.setHSL(ji.h+t,ji.s+n,ji.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,n){return this.r=t.r+n.r,this.g=t.g+n.g,this.b=t.b+n.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,n){return this.r+=(t.r-this.r)*n,this.g+=(t.g-this.g)*n,this.b+=(t.b-this.b)*n,this}lerpColors(t,n,i){return this.r=t.r+(n.r-t.r)*i,this.g=t.g+(n.g-t.g)*i,this.b=t.b+(n.b-t.b)*i,this}lerpHSL(t,n){this.getHSL(ji),t.getHSL(Za);const i=Kc(ji.h,Za.h,n),s=Kc(ji.s,Za.s,n),r=Kc(ji.l,Za.l,n);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const n=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*n+r[3]*i+r[6]*s,this.g=r[1]*n+r[4]*i+r[7]*s,this.b=r[2]*n+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,n=0){return this.r=t[n],this.g=t[n+1],this.b=t[n+2],this}toArray(t=[],n=0){return t[n]=this.r,t[n+1]=this.g,t[n+2]=this.b,t}fromBufferAttribute(t,n){return this.r=t.getX(n),this.g=t.getY(n),this.b=t.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const en=new ie;ie.NAMES=gm;class r1 extends un{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ki,this.environmentIntensity=1,this.environmentRotation=new ki,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,n){return super.copy(t,n),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const n=super.toJSON(t);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Yn=new F,wi=new F,sl=new F,Ri=new F,ir=new F,sr=new F,Hd=new F,rl=new F,al=new F,ol=new F,cl=new Ie,ll=new Ie,hl=new Ie;class $n{constructor(t=new F,n=new F,i=new F){this.a=t,this.b=n,this.c=i}static getNormal(t,n,i,s){s.subVectors(i,n),Yn.subVectors(t,n),s.cross(Yn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,n,i,s,r){Yn.subVectors(s,n),wi.subVectors(i,n),sl.subVectors(t,n);const a=Yn.dot(Yn),o=Yn.dot(wi),c=Yn.dot(sl),l=wi.dot(wi),u=wi.dot(sl),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;const h=1/d,m=(l*c-o*u)*h,g=(a*u-o*c)*h;return r.set(1-m-g,g,m)}static containsPoint(t,n,i,s){return this.getBarycoord(t,n,i,s,Ri)===null?!1:Ri.x>=0&&Ri.y>=0&&Ri.x+Ri.y<=1}static getInterpolation(t,n,i,s,r,a,o,c){return this.getBarycoord(t,n,i,s,Ri)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ri.x),c.addScaledVector(a,Ri.y),c.addScaledVector(o,Ri.z),c)}static getInterpolatedAttribute(t,n,i,s,r,a){return cl.setScalar(0),ll.setScalar(0),hl.setScalar(0),cl.fromBufferAttribute(t,n),ll.fromBufferAttribute(t,i),hl.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(cl,r.x),a.addScaledVector(ll,r.y),a.addScaledVector(hl,r.z),a}static isFrontFacing(t,n,i,s){return Yn.subVectors(i,n),wi.subVectors(t,n),Yn.cross(wi).dot(s)<0}set(t,n,i){return this.a.copy(t),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(t,n,i,s){return this.a.copy(t[n]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,n,i,s){return this.a.fromBufferAttribute(t,n),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Yn.subVectors(this.c,this.b),wi.subVectors(this.a,this.b),Yn.cross(wi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return $n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return $n.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,i,s,r){return $n.getInterpolation(t,this.a,this.b,this.c,n,i,s,r)}containsPoint(t){return $n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return $n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,n){const i=this.a,s=this.b,r=this.c;let a,o;ir.subVectors(s,i),sr.subVectors(r,i),rl.subVectors(t,i);const c=ir.dot(rl),l=sr.dot(rl);if(c<=0&&l<=0)return n.copy(i);al.subVectors(t,s);const u=ir.dot(al),d=sr.dot(al);if(u>=0&&d<=u)return n.copy(s);const h=c*d-u*l;if(h<=0&&c>=0&&u<=0)return a=c/(c-u),n.copy(i).addScaledVector(ir,a);ol.subVectors(t,r);const m=ir.dot(ol),g=sr.dot(ol);if(g>=0&&m<=g)return n.copy(r);const x=m*l-c*g;if(x<=0&&l>=0&&g<=0)return o=l/(l-g),n.copy(i).addScaledVector(sr,o);const p=u*g-m*d;if(p<=0&&d-u>=0&&m-g>=0)return Hd.subVectors(r,s),o=(d-u)/(d-u+(m-g)),n.copy(s).addScaledVector(Hd,o);const f=1/(p+x+h);return a=x*f,o=h*f,n.copy(i).addScaledVector(ir,a).addScaledVector(sr,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class Da{constructor(t=new F(1/0,1/0,1/0),n=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=n}set(t,n){return this.min.copy(t),this.max.copy(n),this}setFromArray(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n+=3)this.expandByPoint(qn.fromArray(t,n));return this}setFromBufferAttribute(t){this.makeEmpty();for(let n=0,i=t.count;n<i;n++)this.expandByPoint(qn.fromBufferAttribute(t,n));return this}setFromPoints(t){this.makeEmpty();for(let n=0,i=t.length;n<i;n++)this.expandByPoint(t[n]);return this}setFromCenterAndSize(t,n){const i=qn.copy(n).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,n=!1){return this.makeEmpty(),this.expandByObject(t,n)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,n=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const r=i.getAttribute("position");if(n===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,qn):qn.fromBufferAttribute(r,a),qn.applyMatrix4(t.matrixWorld),this.expandByPoint(qn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ja.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ja.copy(i.boundingBox)),Ja.applyMatrix4(t.matrixWorld),this.union(Ja)}const s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],n);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,n){return n.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,qn),qn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let n,i;return t.normal.x>0?(n=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(n=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(n+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(n+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(n+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(n+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),n<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(aa),Qa.subVectors(this.max,aa),rr.subVectors(t.a,aa),ar.subVectors(t.b,aa),or.subVectors(t.c,aa),Ki.subVectors(ar,rr),Zi.subVectors(or,ar),_s.subVectors(rr,or);let n=[0,-Ki.z,Ki.y,0,-Zi.z,Zi.y,0,-_s.z,_s.y,Ki.z,0,-Ki.x,Zi.z,0,-Zi.x,_s.z,0,-_s.x,-Ki.y,Ki.x,0,-Zi.y,Zi.x,0,-_s.y,_s.x,0];return!ul(n,rr,ar,or,Qa)||(n=[1,0,0,0,1,0,0,0,1],!ul(n,rr,ar,or,Qa))?!1:(to.crossVectors(Ki,Zi),n=[to.x,to.y,to.z],ul(n,rr,ar,or,Qa))}clampPoint(t,n){return n.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,qn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(qn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ci),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const Ci=[new F,new F,new F,new F,new F,new F,new F,new F],qn=new F,Ja=new Da,rr=new F,ar=new F,or=new F,Ki=new F,Zi=new F,_s=new F,aa=new F,Qa=new F,to=new F,vs=new F;function ul(e,t,n,i,s){for(let r=0,a=e.length-3;r<=a;r+=3){vs.fromArray(e,r);const o=s.x*Math.abs(vs.x)+s.y*Math.abs(vs.y)+s.z*Math.abs(vs.z),c=t.dot(vs),l=n.dot(vs),u=i.dot(vs);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Ue=new F,eo=new he;let a1=0;class an{constructor(t,n,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:a1++}),this.name="",this.array=t,this.itemSize=n,this.count=t!==void 0?t.length/n:0,this.normalized=i,this.usage=Cd,this.updateRanges=[],this.gpuType=li,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,n){this.updateRanges.push({start:t,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,n,i){t*=this.itemSize,i*=n.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=n.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)eo.fromBufferAttribute(this,n),eo.applyMatrix3(t),this.setXY(n,eo.x,eo.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Ue.fromBufferAttribute(this,n),Ue.applyMatrix3(t),this.setXYZ(n,Ue.x,Ue.y,Ue.z);return this}applyMatrix4(t){for(let n=0,i=this.count;n<i;n++)Ue.fromBufferAttribute(this,n),Ue.applyMatrix4(t),this.setXYZ(n,Ue.x,Ue.y,Ue.z);return this}applyNormalMatrix(t){for(let n=0,i=this.count;n<i;n++)Ue.fromBufferAttribute(this,n),Ue.applyNormalMatrix(t),this.setXYZ(n,Ue.x,Ue.y,Ue.z);return this}transformDirection(t){for(let n=0,i=this.count;n<i;n++)Ue.fromBufferAttribute(this,n),Ue.transformDirection(t),this.setXYZ(n,Ue.x,Ue.y,Ue.z);return this}set(t,n=0){return this.array.set(t,n),this}getComponent(t,n){let i=this.array[t*this.itemSize+n];return this.normalized&&(i=sa(i,this.array)),i}setComponent(t,n,i){return this.normalized&&(i=fn(i,this.array)),this.array[t*this.itemSize+n]=i,this}getX(t){let n=this.array[t*this.itemSize];return this.normalized&&(n=sa(n,this.array)),n}setX(t,n){return this.normalized&&(n=fn(n,this.array)),this.array[t*this.itemSize]=n,this}getY(t){let n=this.array[t*this.itemSize+1];return this.normalized&&(n=sa(n,this.array)),n}setY(t,n){return this.normalized&&(n=fn(n,this.array)),this.array[t*this.itemSize+1]=n,this}getZ(t){let n=this.array[t*this.itemSize+2];return this.normalized&&(n=sa(n,this.array)),n}setZ(t,n){return this.normalized&&(n=fn(n,this.array)),this.array[t*this.itemSize+2]=n,this}getW(t){let n=this.array[t*this.itemSize+3];return this.normalized&&(n=sa(n,this.array)),n}setW(t,n){return this.normalized&&(n=fn(n,this.array)),this.array[t*this.itemSize+3]=n,this}setXY(t,n,i){return t*=this.itemSize,this.normalized&&(n=fn(n,this.array),i=fn(i,this.array)),this.array[t+0]=n,this.array[t+1]=i,this}setXYZ(t,n,i,s){return t*=this.itemSize,this.normalized&&(n=fn(n,this.array),i=fn(i,this.array),s=fn(s,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,n,i,s,r){return t*=this.itemSize,this.normalized&&(n=fn(n,this.array),i=fn(i,this.array),s=fn(s,this.array),r=fn(r,this.array)),this.array[t+0]=n,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Cd&&(t.usage=this.usage),t}}class _m extends an{constructor(t,n,i){super(new Uint16Array(t),n,i)}}class vm extends an{constructor(t,n,i){super(new Uint32Array(t),n,i)}}class dn extends an{constructor(t,n,i){super(new Float32Array(t),n,i)}}const o1=new Da,oa=new F,dl=new F;class Ua{constructor(t=new F,n=-1){this.isSphere=!0,this.center=t,this.radius=n}set(t,n){return this.center.copy(t),this.radius=n,this}setFromPoints(t,n){const i=this.center;n!==void 0?i.copy(n):o1.setFromPoints(t).getCenter(i);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const n=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=n*n}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,n){const i=this.center.distanceToSquared(t);return n.copy(t),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;oa.subVectors(t,this.center);const n=oa.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),s=(i-this.radius)*.5;this.center.addScaledVector(oa,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(dl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(oa.copy(t.center).add(dl)),this.expandByPoint(oa.copy(t.center).sub(dl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let c1=0;const In=new we,fl=new un,cr=new F,Mn=new Da,ca=new Da,Ye=new F;class on extends Vr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:c1++}),this.uuid=Ia(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(V_(t)?vm:_m)(t,1):this.index=t,this}setIndirect(t,n=0){return this.indirect=t,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,n){return this.attributes[t]=n,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,n,i=0){this.groups.push({start:t,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,n){this.drawRange.start=t,this.drawRange.count=n}applyMatrix4(t){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(t),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const r=new zt().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return In.makeRotationFromQuaternion(t),this.applyMatrix4(In),this}rotateX(t){return In.makeRotationX(t),this.applyMatrix4(In),this}rotateY(t){return In.makeRotationY(t),this.applyMatrix4(In),this}rotateZ(t){return In.makeRotationZ(t),this.applyMatrix4(In),this}translate(t,n,i){return In.makeTranslation(t,n,i),this.applyMatrix4(In),this}scale(t,n,i){return In.makeScale(t,n,i),this.applyMatrix4(In),this}lookAt(t){return fl.lookAt(t),fl.updateMatrix(),this.applyMatrix4(fl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cr).negate(),this.translate(cr.x,cr.y,cr.z),this}setFromPoints(t){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let s=0,r=t.length;s<r;s++){const a=t[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new dn(i,3))}else{const i=Math.min(t.length,n.count);for(let s=0;s<i;s++){const r=t[s];n.setXYZ(s,r.x,r.y,r.z||0)}t.length>n.count&&Ut("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Da);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Qt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),n)for(let i=0,s=n.length;i<s;i++){const r=n[i];Mn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ye.addVectors(this.boundingBox.min,Mn.min),this.boundingBox.expandByPoint(Ye),Ye.addVectors(this.boundingBox.max,Mn.max),this.boundingBox.expandByPoint(Ye)):(this.boundingBox.expandByPoint(Mn.min),this.boundingBox.expandByPoint(Mn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Qt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ua);const t=this.attributes.position,n=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){Qt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(t){const i=this.boundingSphere.center;if(Mn.setFromBufferAttribute(t),n)for(let r=0,a=n.length;r<a;r++){const o=n[r];ca.setFromBufferAttribute(o),this.morphTargetsRelative?(Ye.addVectors(Mn.min,ca.min),Mn.expandByPoint(Ye),Ye.addVectors(Mn.max,ca.max),Mn.expandByPoint(Ye)):(Mn.expandByPoint(ca.min),Mn.expandByPoint(ca.max))}Mn.getCenter(i);let s=0;for(let r=0,a=t.count;r<a;r++)Ye.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ye));if(n)for(let r=0,a=n.length;r<a;r++){const o=n[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)Ye.fromBufferAttribute(o,l),c&&(cr.fromBufferAttribute(t,l),Ye.add(cr)),s=Math.max(s,i.distanceToSquared(Ye))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Qt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,n=this.attributes;if(t===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Qt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,s=n.normal,r=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new an(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let v=0;v<i.count;v++)o[v]=new F,c[v]=new F;const l=new F,u=new F,d=new F,h=new he,m=new he,g=new he,x=new F,p=new F;function f(v,E,k){l.fromBufferAttribute(i,v),u.fromBufferAttribute(i,E),d.fromBufferAttribute(i,k),h.fromBufferAttribute(r,v),m.fromBufferAttribute(r,E),g.fromBufferAttribute(r,k),u.sub(l),d.sub(l),m.sub(h),g.sub(h);const R=1/(m.x*g.y-g.x*m.y);isFinite(R)&&(x.copy(u).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(R),p.copy(d).multiplyScalar(m.x).addScaledVector(u,-g.x).multiplyScalar(R),o[v].add(x),o[E].add(x),o[k].add(x),c[v].add(p),c[E].add(p),c[k].add(p))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let v=0,E=S.length;v<E;++v){const k=S[v],R=k.start,U=k.count;for(let V=R,Y=R+U;V<Y;V+=3)f(t.getX(V+0),t.getX(V+1),t.getX(V+2))}const T=new F,y=new F,w=new F,C=new F;function b(v){w.fromBufferAttribute(s,v),C.copy(w);const E=o[v];T.copy(E),T.sub(w.multiplyScalar(w.dot(E))).normalize(),y.crossVectors(C,E);const R=y.dot(c[v])<0?-1:1;a.setXYZW(v,T.x,T.y,T.z,R)}for(let v=0,E=S.length;v<E;++v){const k=S[v],R=k.start,U=k.count;for(let V=R,Y=R+U;V<Y;V+=3)b(t.getX(V+0)),b(t.getX(V+1)),b(t.getX(V+2))}}computeVertexNormals(){const t=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new an(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let h=0,m=i.count;h<m;h++)i.setXYZ(h,0,0,0);const s=new F,r=new F,a=new F,o=new F,c=new F,l=new F,u=new F,d=new F;if(t)for(let h=0,m=t.count;h<m;h+=3){const g=t.getX(h+0),x=t.getX(h+1),p=t.getX(h+2);s.fromBufferAttribute(n,g),r.fromBufferAttribute(n,x),a.fromBufferAttribute(n,p),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(i,g),c.fromBufferAttribute(i,x),l.fromBufferAttribute(i,p),o.add(u),c.add(u),l.add(u),i.setXYZ(g,o.x,o.y,o.z),i.setXYZ(x,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let h=0,m=n.count;h<m;h+=3)s.fromBufferAttribute(n,h+0),r.fromBufferAttribute(n,h+1),a.fromBufferAttribute(n,h+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let n=0,i=t.count;n<i;n++)Ye.fromBufferAttribute(t,n),Ye.normalize(),t.setXYZ(n,Ye.x,Ye.y,Ye.z)}toNonIndexed(){function t(o,c){const l=o.array,u=o.itemSize,d=o.normalized,h=new l.constructor(c.length*u);let m=0,g=0;for(let x=0,p=c.length;x<p;x++){o.isInterleavedBufferAttribute?m=c[x]*o.data.stride+o.offset:m=c[x]*u;for(let f=0;f<u;f++)h[g++]=l[m++]}return new an(h,u,d)}if(this.index===null)return Ut("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new on,i=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=t(c,i);n.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,d=l.length;u<d;u++){const h=l[u],m=t(h,i);c.push(m)}n.morphAttributes[o]=c}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];n.addGroup(l.start,l.count,l.materialIndex)}return n}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const n=this.index;n!==null&&(t.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const c in i){const l=i[c];t.data.attributes[c]=l.toJSON(t.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let d=0,h=l.length;d<h;d++){const m=l[d];u.push(m.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const s=t.attributes;for(const l in s){const u=s[l];this.setAttribute(l,u.clone(n))}const r=t.morphAttributes;for(const l in r){const u=[],d=r[l];for(let h=0,m=d.length;h<m;h++)u.push(d[h].clone(n));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,u=a.length;l<u;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let l1=0;class Hr extends Vr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:l1++}),this.uuid=Ia(),this.name="",this.type="Material",this.blending=gr,this.side=us,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=zl,this.blendDst=Vl,this.blendEquation=Cs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ie(0,0,0),this.blendAlpha=0,this.depthFunc=Sr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Rd,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Js,this.stencilZFail=Js,this.stencilZPass=Js,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const n in t){const i=t[n];if(i===void 0){Ut(`Material: parameter '${n}' has value of undefined.`);continue}const s=this[n];if(s===void 0){Ut(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[n]=i}}toJSON(t){const n=t===void 0||typeof t=="string";n&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==gr&&(i.blending=this.blending),this.side!==us&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==zl&&(i.blendSrc=this.blendSrc),this.blendDst!==Vl&&(i.blendDst=this.blendDst),this.blendEquation!==Cs&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Sr&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Rd&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Js&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Js&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Js&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(n){const r=s(t.textures),a=s(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const n=t.clippingPlanes;let i=null;if(n!==null){const s=n.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=n[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const Pi=new F,pl=new F,no=new F,Ji=new F,ml=new F,io=new F,gl=new F;class du{constructor(t=new F,n=new F(0,0,-1)){this.origin=t,this.direction=n}set(t,n){return this.origin.copy(t),this.direction.copy(n),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,n){return n.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Pi)),this}closestPointToPoint(t,n){n.subVectors(t,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const n=Pi.subVectors(t,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(t):(Pi.copy(this.origin).addScaledVector(this.direction,n),Pi.distanceToSquared(t))}distanceSqToSegment(t,n,i,s){pl.copy(t).add(n).multiplyScalar(.5),no.copy(n).sub(t).normalize(),Ji.copy(this.origin).sub(pl);const r=t.distanceTo(n)*.5,a=-this.direction.dot(no),o=Ji.dot(this.direction),c=-Ji.dot(no),l=Ji.lengthSq(),u=Math.abs(1-a*a);let d,h,m,g;if(u>0)if(d=a*c-o,h=a*o-c,g=r*u,d>=0)if(h>=-g)if(h<=g){const x=1/u;d*=x,h*=x,m=d*(d+a*h+2*o)+h*(a*d+h+2*c)+l}else h=r,d=Math.max(0,-(a*h+o)),m=-d*d+h*(h+2*c)+l;else h=-r,d=Math.max(0,-(a*h+o)),m=-d*d+h*(h+2*c)+l;else h<=-g?(d=Math.max(0,-(-a*r+o)),h=d>0?-r:Math.min(Math.max(-r,-c),r),m=-d*d+h*(h+2*c)+l):h<=g?(d=0,h=Math.min(Math.max(-r,-c),r),m=h*(h+2*c)+l):(d=Math.max(0,-(a*r+o)),h=d>0?r:Math.min(Math.max(-r,-c),r),m=-d*d+h*(h+2*c)+l);else h=a>0?-r:r,d=Math.max(0,-(a*h+o)),m=-d*d+h*(h+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(pl).addScaledVector(no,h),m}intersectSphere(t,n){Pi.subVectors(t.center,this.origin);const i=Pi.dot(this.direction),s=Pi.dot(Pi)-i*i,r=t.radius*t.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,n):this.at(o,n)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const n=t.normal.dot(this.direction);if(n===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/n;return i>=0?i:null}intersectPlane(t,n){const i=this.distanceToPlane(t);return i===null?null:this.at(i,n)}intersectsPlane(t){const n=t.distanceToPoint(this.origin);return n===0||t.normal.dot(this.direction)*n<0}intersectBox(t,n){let i,s,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return l>=0?(i=(t.min.x-h.x)*l,s=(t.max.x-h.x)*l):(i=(t.max.x-h.x)*l,s=(t.min.x-h.x)*l),u>=0?(r=(t.min.y-h.y)*u,a=(t.max.y-h.y)*u):(r=(t.max.y-h.y)*u,a=(t.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-h.z)*d,c=(t.max.z-h.z)*d):(o=(t.max.z-h.z)*d,c=(t.min.z-h.z)*d),i>c||o>s)||((o>i||i!==i)&&(i=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,n)}intersectsBox(t){return this.intersectBox(t,Pi)!==null}intersectTriangle(t,n,i,s,r){ml.subVectors(n,t),io.subVectors(i,t),gl.crossVectors(ml,io);let a=this.direction.dot(gl),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ji.subVectors(this.origin,t);const c=o*this.direction.dot(io.crossVectors(Ji,io));if(c<0)return null;const l=o*this.direction.dot(ml.cross(Ji));if(l<0||c+l>a)return null;const u=-o*Ji.dot(gl);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ar extends Hr{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ie(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.combine=Zp,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Wd=new we,xs=new du,so=new Ua,Xd=new F,ro=new F,ao=new F,oo=new F,_l=new F,co=new F,Yd=new F,lo=new F;class Tn extends un{constructor(t=new on,n=new Ar){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,n){const i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(r&&o){co.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],d=r[c];u!==0&&(_l.fromBufferAttribute(d,t),a?co.addScaledVector(_l,u):co.addScaledVector(_l.sub(n),u))}n.add(co)}return n}raycast(t,n){const i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),so.copy(i.boundingSphere),so.applyMatrix4(r),xs.copy(t.ray).recast(t.near),!(so.containsPoint(xs.origin)===!1&&(xs.intersectSphere(so,Xd)===null||xs.origin.distanceToSquared(Xd)>(t.far-t.near)**2))&&(Wd.copy(r).invert(),xs.copy(t.ray).applyMatrix4(Wd),!(i.boundingBox!==null&&xs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,n,xs)))}_computeIntersections(t,n,i){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,x=h.length;g<x;g++){const p=h[g],f=a[p.materialIndex],S=Math.max(p.start,m.start),T=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let y=S,w=T;y<w;y+=3){const C=o.getX(y),b=o.getX(y+1),v=o.getX(y+2);s=ho(this,f,t,i,l,u,d,C,b,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,n.push(s))}}else{const g=Math.max(0,m.start),x=Math.min(o.count,m.start+m.count);for(let p=g,f=x;p<f;p+=3){const S=o.getX(p),T=o.getX(p+1),y=o.getX(p+2);s=ho(this,a,t,i,l,u,d,S,T,y),s&&(s.faceIndex=Math.floor(p/3),n.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,x=h.length;g<x;g++){const p=h[g],f=a[p.materialIndex],S=Math.max(p.start,m.start),T=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let y=S,w=T;y<w;y+=3){const C=y,b=y+1,v=y+2;s=ho(this,f,t,i,l,u,d,C,b,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,n.push(s))}}else{const g=Math.max(0,m.start),x=Math.min(c.count,m.start+m.count);for(let p=g,f=x;p<f;p+=3){const S=p,T=p+1,y=p+2;s=ho(this,a,t,i,l,u,d,S,T,y),s&&(s.faceIndex=Math.floor(p/3),n.push(s))}}}}function h1(e,t,n,i,s,r,a,o){let c;if(t.side===gn?c=i.intersectTriangle(a,r,s,!0,o):c=i.intersectTriangle(s,r,a,t.side===us,o),c===null)return null;lo.copy(o),lo.applyMatrix4(e.matrixWorld);const l=n.ray.origin.distanceTo(lo);return l<n.near||l>n.far?null:{distance:l,point:lo.clone(),object:e}}function ho(e,t,n,i,s,r,a,o,c,l){e.getVertexPosition(o,ro),e.getVertexPosition(c,ao),e.getVertexPosition(l,oo);const u=h1(e,t,n,i,ro,ao,oo,Yd);if(u){const d=new F;$n.getBarycoord(Yd,ro,ao,oo,d),s&&(u.uv=$n.getInterpolatedAttribute(s,o,c,l,d,new he)),r&&(u.uv1=$n.getInterpolatedAttribute(r,o,c,l,d,new he)),a&&(u.normal=$n.getInterpolatedAttribute(a,o,c,l,d,new F),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new F,materialIndex:0};$n.getNormal(ro,ao,oo,h.normal),u.face=h,u.barycoord=d}return u}class u1 extends rn{constructor(t=null,n=1,i=1,s,r,a,o,c,l=Ze,u=Ze,d,h){super(null,a,o,c,l,u,s,r,d,h),this.isDataTexture=!0,this.image={data:t,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const vl=new F,d1=new F,f1=new zt;class As{constructor(t=new F(1,0,0),n=0){this.isPlane=!0,this.normal=t,this.constant=n}set(t,n){return this.normal.copy(t),this.constant=n,this}setComponents(t,n,i,s){return this.normal.set(t,n,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,n){return this.normal.copy(t),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(t,n,i){const s=vl.subVectors(i,n).cross(d1.subVectors(t,n)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,n){return n.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,n){const i=t.delta(vl),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?n.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:n.copy(t.start).addScaledVector(i,r)}intersectsLine(t){const n=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return n<0&&i>0||i<0&&n>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,n){const i=n||f1.getNormalMatrix(t),s=this.coplanarPoint(vl).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ms=new Ua,p1=new he(.5,.5),uo=new F;class xm{constructor(t=new As,n=new As,i=new As,s=new As,r=new As,a=new As){this.planes=[t,n,i,s,r,a]}set(t,n,i,s,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(n),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,n=hi,i=!1){const s=this.planes,r=t.elements,a=r[0],o=r[1],c=r[2],l=r[3],u=r[4],d=r[5],h=r[6],m=r[7],g=r[8],x=r[9],p=r[10],f=r[11],S=r[12],T=r[13],y=r[14],w=r[15];if(s[0].setComponents(l-a,m-u,f-g,w-S).normalize(),s[1].setComponents(l+a,m+u,f+g,w+S).normalize(),s[2].setComponents(l+o,m+d,f+x,w+T).normalize(),s[3].setComponents(l-o,m-d,f-x,w-T).normalize(),i)s[4].setComponents(c,h,p,y).normalize(),s[5].setComponents(l-c,m-h,f-p,w-y).normalize();else if(s[4].setComponents(l-c,m-h,f-p,w-y).normalize(),n===hi)s[5].setComponents(l+c,m+h,f+p,w+y).normalize();else if(n===jo)s[5].setComponents(c,h,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ms.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const n=t.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),Ms.copy(n.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ms)}intersectsSprite(t){Ms.center.set(0,0,0);const n=p1.distanceTo(t.center);return Ms.radius=.7071067811865476+n,Ms.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ms)}intersectsSphere(t){const n=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(n[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){const n=this.planes;for(let i=0;i<6;i++){const s=n[i];if(uo.x=s.normal.x>0?t.max.x:t.min.x,uo.y=s.normal.y>0?t.max.y:t.min.y,uo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(uo)<0)return!1}return!0}containsPoint(t){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Mm extends Hr{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ie(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const Jo=new F,Qo=new F,qd=new we,la=new du,fo=new Ua,xl=new F,$d=new F;class m1 extends un{constructor(t=new on,n=new Mm){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,i=[0];for(let s=1,r=n.count;s<r;s++)Jo.fromBufferAttribute(n,s-1),Qo.fromBufferAttribute(n,s),i[s]=i[s-1],i[s]+=Jo.distanceTo(Qo);t.setAttribute("lineDistance",new dn(i,1))}else Ut("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,n){const i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),fo.copy(i.boundingSphere),fo.applyMatrix4(s),fo.radius+=r,t.ray.intersectsSphere(fo)===!1)return;qd.copy(s).invert(),la.copy(t.ray).applyMatrix4(qd);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=i.index,h=i.attributes.position;if(u!==null){const m=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let x=m,p=g-1;x<p;x+=l){const f=u.getX(x),S=u.getX(x+1),T=po(this,t,la,c,f,S,x);T&&n.push(T)}if(this.isLineLoop){const x=u.getX(g-1),p=u.getX(m),f=po(this,t,la,c,x,p,g-1);f&&n.push(f)}}else{const m=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let x=m,p=g-1;x<p;x+=l){const f=po(this,t,la,c,x,x+1,x);f&&n.push(f)}if(this.isLineLoop){const x=po(this,t,la,c,g-1,m,g-1);x&&n.push(x)}}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function po(e,t,n,i,s,r,a){const o=e.geometry.attributes.position;if(Jo.fromBufferAttribute(o,s),Qo.fromBufferAttribute(o,r),n.distanceSqToSegment(Jo,Qo,xl,$d)>i)return;xl.applyMatrix4(e.matrixWorld);const l=t.ray.origin.distanceTo(xl);if(!(l<t.near||l>t.far))return{distance:l,point:$d.clone().applyMatrix4(e.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:e}}const jd=new F,Kd=new F;class g1 extends m1{constructor(t,n){super(t,n),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const t=this.geometry;if(t.index===null){const n=t.attributes.position,i=[];for(let s=0,r=n.count;s<r;s+=2)jd.fromBufferAttribute(n,s),Kd.fromBufferAttribute(n,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+jd.distanceTo(Kd);t.setAttribute("lineDistance",new dn(i,1))}else Ut("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class dc extends Hr{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ie(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Zd=new we,Ph=new du,mo=new Ua,go=new F;class fu extends un{constructor(t=new on,n=new dc){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,n){return super.copy(t,n),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,n){const i=this.geometry,s=this.matrixWorld,r=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),mo.copy(i.boundingSphere),mo.applyMatrix4(s),mo.radius+=r,t.ray.intersectsSphere(mo)===!1)return;Zd.copy(s).invert(),Ph.copy(t.ray).applyMatrix4(Zd);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,d=i.attributes.position;if(l!==null){const h=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let g=h,x=m;g<x;g++){const p=l.getX(g);go.fromBufferAttribute(d,p),Jd(go,p,c,s,t,n,this)}}else{const h=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let g=h,x=m;g<x;g++)go.fromBufferAttribute(d,g),Jd(go,g,c,s,t,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const s=n[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Jd(e,t,n,i,s,r,a){const o=Ph.distanceSqToPoint(e);if(o<n){const c=new F;Ph.closestPointToPoint(e,c),c.applyMatrix4(i);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Sm extends rn{constructor(t=[],n=Hs,i,s,r,a,o,c,l,u){super(t,n,i,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class _1 extends rn{constructor(t,n,i,s,r,a,o,c,l){super(t,n,i,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Aa extends rn{constructor(t,n,i=gi,s,r,a,o=Ze,c=Ze,l,u=Bi,d=1){if(u!==Bi&&u!==Ds)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:t,height:n,depth:d};super(h,s,r,a,o,c,u,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new uu(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const n=super.toJSON(t);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class v1 extends Aa{constructor(t,n=gi,i=Hs,s,r,a=Ze,o=Ze,c,l=Bi){const u={width:t,height:t,depth:1},d=[u,u,u,u,u,u];super(t,t,n,i,s,r,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class ym extends rn{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Na extends on{constructor(t=1,n=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:n,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],d=[];let h=0,m=0;g("z","y","x",-1,-1,i,n,t,a,r,0),g("z","y","x",1,-1,i,n,-t,a,r,1),g("x","z","y",1,1,t,i,n,s,a,2),g("x","z","y",1,-1,t,i,-n,s,a,3),g("x","y","z",1,-1,t,n,i,s,r,4),g("x","y","z",-1,-1,t,n,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new dn(l,3)),this.setAttribute("normal",new dn(u,3)),this.setAttribute("uv",new dn(d,2));function g(x,p,f,S,T,y,w,C,b,v,E){const k=y/b,R=w/v,U=y/2,V=w/2,Y=C/2,z=b+1,H=v+1;let N=0,Q=0;const K=new F;for(let lt=0;lt<H;lt++){const gt=lt*R-V;for(let dt=0;dt<z;dt++){const Vt=dt*k-U;K[x]=Vt*S,K[p]=gt*T,K[f]=Y,l.push(K.x,K.y,K.z),K[x]=0,K[p]=0,K[f]=C>0?1:-1,u.push(K.x,K.y,K.z),d.push(dt/b),d.push(1-lt/v),N+=1}}for(let lt=0;lt<v;lt++)for(let gt=0;gt<b;gt++){const dt=h+gt+z*lt,Vt=h+gt+z*(lt+1),_e=h+(gt+1)+z*(lt+1),ge=h+(gt+1)+z*lt;c.push(dt,Vt,ge),c.push(Vt,_e,ge),Q+=6}o.addGroup(m,Q,E),m+=Q,h+=N}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Na(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class fc extends on{constructor(t=1,n=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:n,widthSegments:i,heightSegments:s};const r=t/2,a=n/2,o=Math.floor(i),c=Math.floor(s),l=o+1,u=c+1,d=t/o,h=n/c,m=[],g=[],x=[],p=[];for(let f=0;f<u;f++){const S=f*h-a;for(let T=0;T<l;T++){const y=T*d-r;g.push(y,-S,0),x.push(0,0,1),p.push(T/o),p.push(1-f/c)}}for(let f=0;f<c;f++)for(let S=0;S<o;S++){const T=S+l*f,y=S+l*(f+1),w=S+1+l*(f+1),C=S+1+l*f;m.push(T,y,C),m.push(y,w,C)}this.setIndex(m),this.setAttribute("position",new dn(g,3)),this.setAttribute("normal",new dn(x,3)),this.setAttribute("uv",new dn(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fc(t.width,t.height,t.widthSegments,t.heightSegments)}}class Fa extends on{constructor(t=1,n=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:n,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const u=[],d=new F,h=new F,m=[],g=[],x=[],p=[];for(let f=0;f<=i;f++){const S=[],T=f/i;let y=0;f===0&&a===0?y=.5/n:f===i&&c===Math.PI&&(y=-.5/n);for(let w=0;w<=n;w++){const C=w/n;d.x=-t*Math.cos(s+C*r)*Math.sin(a+T*o),d.y=t*Math.cos(a+T*o),d.z=t*Math.sin(s+C*r)*Math.sin(a+T*o),g.push(d.x,d.y,d.z),h.copy(d).normalize(),x.push(h.x,h.y,h.z),p.push(C+y,1-T),S.push(l++)}u.push(S)}for(let f=0;f<i;f++)for(let S=0;S<n;S++){const T=u[f][S+1],y=u[f][S],w=u[f+1][S],C=u[f+1][S+1];(f!==0||a>0)&&m.push(T,y,C),(f!==i-1||c<Math.PI)&&m.push(y,w,C)}this.setIndex(m),this.setAttribute("position",new dn(g,3)),this.setAttribute("normal",new dn(x,3)),this.setAttribute("uv",new dn(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fa(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}function Tr(e){const t={};for(const n in e){t[n]={};for(const i in e[n]){const s=e[n][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(Ut("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[n][i]=null):t[n][i]=s.clone():Array.isArray(s)?t[n][i]=s.slice():t[n][i]=s}}return t}function hn(e){const t={};for(let n=0;n<e.length;n++){const i=Tr(e[n]);for(const s in i)t[s]=i[s]}return t}function x1(e){const t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Em(e){const t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}const M1={clone:Tr,merge:hn};var S1=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,y1=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class _i extends Hr{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=S1,this.fragmentShader=y1,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Tr(t.uniforms),this.uniformsGroups=x1(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const n=super.toJSON(t);n.glslVersion=this.glslVersion,n.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?n.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?n.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[s]={type:"m4",value:a.toArray()}:n.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class E1 extends _i{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class b1 extends Hr{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=I_,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class A1 extends Hr{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const _o=new F,vo=new Gr,ni=new F;class bm extends un{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new we,this.projectionMatrix=new we,this.projectionMatrixInverse=new we,this.coordinateSystem=hi,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,n){return super.copy(t,n),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(_o,vo,ni),ni.x===1&&ni.y===1&&ni.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_o,vo,ni.set(1,1,1)).invert()}updateWorldMatrix(t,n){super.updateWorldMatrix(t,n),this.matrixWorld.decompose(_o,vo,ni),ni.x===1&&ni.y===1&&ni.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_o,vo,ni.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Qi=new F,Qd=new he,tf=new he;class Bn extends bm{constructor(t=50,n=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const n=.5*this.getFilmHeight()/t;this.fov=Ch*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(jc*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ch*2*Math.atan(Math.tan(jc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,n,i){Qi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Qi.x,Qi.y).multiplyScalar(-t/Qi.z),Qi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Qi.x,Qi.y).multiplyScalar(-t/Qi.z)}getViewSize(t,n){return this.getViewBounds(t,Qd,tf),n.subVectors(tf,Qd)}setViewOffset(t,n,i,s,r,a){this.aspect=t/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let n=t*Math.tan(jc*.5*this.fov)/this.zoom,i=2*n,s=this.aspect*i,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,n-=a.offsetY*i/l,s*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,n,n-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class Am extends bm{constructor(t=-1,n=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=n,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,n){return super.copy(t,n),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,n,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=i-t,a=i+t,o=s+n,c=s-n;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const n=super.toJSON(t);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}const lr=-90,hr=1;class T1 extends un{constructor(t,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Bn(lr,hr,t,n);s.layers=this.layers,this.add(s);const r=new Bn(lr,hr,t,n);r.layers=this.layers,this.add(r);const a=new Bn(lr,hr,t,n);a.layers=this.layers,this.add(a);const o=new Bn(lr,hr,t,n);o.layers=this.layers,this.add(o);const c=new Bn(lr,hr,t,n);c.layers=this.layers,this.add(c);const l=new Bn(lr,hr,t,n);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,n=this.children.concat(),[i,s,r,a,o,c]=n;for(const l of n)this.remove(l);if(t===hi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===jo)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of n)this.add(l),l.updateMatrixWorld()}update(t,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,u]=this.children,d=t.getRenderTarget(),h=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;t.isWebGLRenderer===!0?p=t.state.buffers.depth.getReversed():p=t.reversedDepthBuffer,t.setRenderTarget(i,0,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,r),t.setRenderTarget(i,1,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,a),t.setRenderTarget(i,2,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,o),t.setRenderTarget(i,3,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,c),t.setRenderTarget(i,4,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,l),i.texture.generateMipmaps=x,t.setRenderTarget(i,5,s),p&&t.autoClear===!1&&t.clearDepth(),t.render(n,u),t.setRenderTarget(d,h,m),t.xr.enabled=g,i.texture.needsPMREMUpdate=!0}}class w1 extends Bn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}function ef(e,t,n,i){const s=R1(i);switch(n){case hm:return e*t;case dm:return e*t/s.components*s.byteLength;case au:return e*t/s.components*s.byteLength;case Er:return e*t*2/s.components*s.byteLength;case ou:return e*t*2/s.components*s.byteLength;case um:return e*t*3/s.components*s.byteLength;case jn:return e*t*4/s.components*s.byteLength;case cu:return e*t*4/s.components*s.byteLength;case Do:case Uo:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case No:case Fo:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Jl:case th:return Math.max(e,16)*Math.max(t,8)/4;case Zl:case Ql:return Math.max(e,8)*Math.max(t,8)/2;case eh:case nh:case sh:case rh:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ih:case ah:case oh:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case ch:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case lh:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case hh:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case uh:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case dh:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case fh:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case ph:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case mh:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case gh:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case _h:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case vh:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case xh:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Mh:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Sh:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case yh:case Eh:case bh:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Ah:case Th:return Math.ceil(e/4)*Math.ceil(t/4)*8;case wh:case Rh:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function R1(e){switch(e){case kn:case am:return{byteLength:1,components:1};case Ea:case om:case Oi:return{byteLength:2,components:1};case su:case ru:return{byteLength:2,components:4};case gi:case iu:case li:return{byteLength:4,components:1};case cm:case lm:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:nu}}));typeof window<"u"&&(window.__THREE__?Ut("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=nu);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Tm(){let e=null,t=!1,n=null,i=null;function s(r,a){n(r,a),i=e.requestAnimationFrame(s)}return{start:function(){t!==!0&&n!==null&&(i=e.requestAnimationFrame(s),t=!0)},stop:function(){e.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){n=r},setContext:function(r){e=r}}}function C1(e){const t=new WeakMap;function n(o,c){const l=o.array,u=o.usage,d=l.byteLength,h=e.createBuffer();e.bindBuffer(c,h),e.bufferData(c,l,u),o.onUploadCallback();let m;if(l instanceof Float32Array)m=e.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=e.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=e.HALF_FLOAT:m=e.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=e.SHORT;else if(l instanceof Uint32Array)m=e.UNSIGNED_INT;else if(l instanceof Int32Array)m=e.INT;else if(l instanceof Int8Array)m=e.BYTE;else if(l instanceof Uint8Array)m=e.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=e.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:h,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,c,l){const u=c.array,d=c.updateRanges;if(e.bindBuffer(l,o),d.length===0)e.bufferSubData(l,0,u);else{d.sort((m,g)=>m.start-g.start);let h=0;for(let m=1;m<d.length;m++){const g=d[h],x=d[m];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++h,d[h]=x)}d.length=h+1;for(let m=0,g=d.length;m<g;m++){const x=d[m];e.bufferSubData(l,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=t.get(o);c&&(e.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=t.get(o);if(l===void 0)t.set(o,n(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var P1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,L1=`#ifdef USE_ALPHAHASH
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
#endif`,I1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,D1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,U1=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,N1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,F1=`#ifdef USE_AOMAP
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
#endif`,O1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,B1=`#ifdef USE_BATCHING
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
#endif`,k1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,z1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,V1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,G1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,H1=`#ifdef USE_IRIDESCENCE
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
#endif`,W1=`#ifdef USE_BUMPMAP
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
#endif`,X1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Y1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,q1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,j1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,K1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Z1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,J1=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Q1=`#define PI 3.141592653589793
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
} // validated`,tv=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,ev=`vec3 transformedNormal = objectNormal;
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
#endif`,nv=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,iv=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,sv=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,rv=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,av="gl_FragColor = linearToOutputTexel( gl_FragColor );",ov=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,cv=`#ifdef USE_ENVMAP
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
#endif`,lv=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,hv=`#ifdef USE_ENVMAP
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
#endif`,uv=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,dv=`#ifdef USE_ENVMAP
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
#endif`,fv=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,pv=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,mv=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,gv=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,_v=`#ifdef USE_GRADIENTMAP
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
}`,vv=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,xv=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Mv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Sv=`uniform bool receiveShadow;
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
#endif`,yv=`#ifdef USE_ENVMAP
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
#endif`,Ev=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,bv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Av=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Tv=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,wv=`PhysicalMaterial material;
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
#endif`,Rv=`uniform sampler2D dfgLUT;
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
}`,Cv=`
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
#endif`,Pv=`#if defined( RE_IndirectDiffuse )
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
#endif`,Lv=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Iv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Dv=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Uv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Nv=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Fv=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ov=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Bv=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,kv=`#if defined( USE_POINTS_UV )
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
#endif`,zv=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Vv=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gv=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Hv=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Wv=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Xv=`#ifdef USE_MORPHTARGETS
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
#endif`,Yv=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qv=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,$v=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,jv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Kv=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zv=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Jv=`#ifdef USE_NORMALMAP
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
#endif`,Qv=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,t2=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,e2=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,n2=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,i2=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,s2=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,r2=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,a2=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,o2=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,c2=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,l2=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,h2=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,u2=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,d2=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,f2=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,p2=`float getShadowMask() {
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
}`,m2=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,g2=`#ifdef USE_SKINNING
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
#endif`,_2=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,v2=`#ifdef USE_SKINNING
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
#endif`,x2=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,M2=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,S2=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,y2=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,E2=`#ifdef USE_TRANSMISSION
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
#endif`,b2=`#ifdef USE_TRANSMISSION
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
#endif`,A2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,T2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,w2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,R2=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const C2=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,P2=`uniform sampler2D t2D;
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
}`,L2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,I2=`#ifdef ENVMAP_TYPE_CUBE
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
}`,D2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,U2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N2=`#include <common>
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
}`,F2=`#if DEPTH_PACKING == 3200
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
}`,O2=`#define DISTANCE
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
}`,B2=`#define DISTANCE
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
}`,k2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,z2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,V2=`uniform float scale;
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
}`,G2=`uniform vec3 diffuse;
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
}`,H2=`#include <common>
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
}`,W2=`uniform vec3 diffuse;
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
}`,X2=`#define LAMBERT
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
}`,Y2=`#define LAMBERT
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
}`,q2=`#define MATCAP
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
}`,$2=`#define MATCAP
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
}`,j2=`#define NORMAL
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
}`,K2=`#define NORMAL
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
}`,Z2=`#define PHONG
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
}`,J2=`#define PHONG
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
}`,Q2=`#define STANDARD
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
}`,tx=`#define STANDARD
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
}`,ex=`#define TOON
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
}`,nx=`#define TOON
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
}`,ix=`uniform float size;
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
}`,sx=`uniform vec3 diffuse;
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
}`,rx=`#include <common>
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
}`,ax=`uniform vec3 color;
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
}`,ox=`uniform float rotation;
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
}`,cx=`uniform vec3 diffuse;
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
}`,Gt={alphahash_fragment:P1,alphahash_pars_fragment:L1,alphamap_fragment:I1,alphamap_pars_fragment:D1,alphatest_fragment:U1,alphatest_pars_fragment:N1,aomap_fragment:F1,aomap_pars_fragment:O1,batching_pars_vertex:B1,batching_vertex:k1,begin_vertex:z1,beginnormal_vertex:V1,bsdfs:G1,iridescence_fragment:H1,bumpmap_pars_fragment:W1,clipping_planes_fragment:X1,clipping_planes_pars_fragment:Y1,clipping_planes_pars_vertex:q1,clipping_planes_vertex:$1,color_fragment:j1,color_pars_fragment:K1,color_pars_vertex:Z1,color_vertex:J1,common:Q1,cube_uv_reflection_fragment:tv,defaultnormal_vertex:ev,displacementmap_pars_vertex:nv,displacementmap_vertex:iv,emissivemap_fragment:sv,emissivemap_pars_fragment:rv,colorspace_fragment:av,colorspace_pars_fragment:ov,envmap_fragment:cv,envmap_common_pars_fragment:lv,envmap_pars_fragment:hv,envmap_pars_vertex:uv,envmap_physical_pars_fragment:yv,envmap_vertex:dv,fog_vertex:fv,fog_pars_vertex:pv,fog_fragment:mv,fog_pars_fragment:gv,gradientmap_pars_fragment:_v,lightmap_pars_fragment:vv,lights_lambert_fragment:xv,lights_lambert_pars_fragment:Mv,lights_pars_begin:Sv,lights_toon_fragment:Ev,lights_toon_pars_fragment:bv,lights_phong_fragment:Av,lights_phong_pars_fragment:Tv,lights_physical_fragment:wv,lights_physical_pars_fragment:Rv,lights_fragment_begin:Cv,lights_fragment_maps:Pv,lights_fragment_end:Lv,logdepthbuf_fragment:Iv,logdepthbuf_pars_fragment:Dv,logdepthbuf_pars_vertex:Uv,logdepthbuf_vertex:Nv,map_fragment:Fv,map_pars_fragment:Ov,map_particle_fragment:Bv,map_particle_pars_fragment:kv,metalnessmap_fragment:zv,metalnessmap_pars_fragment:Vv,morphinstance_vertex:Gv,morphcolor_vertex:Hv,morphnormal_vertex:Wv,morphtarget_pars_vertex:Xv,morphtarget_vertex:Yv,normal_fragment_begin:qv,normal_fragment_maps:$v,normal_pars_fragment:jv,normal_pars_vertex:Kv,normal_vertex:Zv,normalmap_pars_fragment:Jv,clearcoat_normal_fragment_begin:Qv,clearcoat_normal_fragment_maps:t2,clearcoat_pars_fragment:e2,iridescence_pars_fragment:n2,opaque_fragment:i2,packing:s2,premultiplied_alpha_fragment:r2,project_vertex:a2,dithering_fragment:o2,dithering_pars_fragment:c2,roughnessmap_fragment:l2,roughnessmap_pars_fragment:h2,shadowmap_pars_fragment:u2,shadowmap_pars_vertex:d2,shadowmap_vertex:f2,shadowmask_pars_fragment:p2,skinbase_vertex:m2,skinning_pars_vertex:g2,skinning_vertex:_2,skinnormal_vertex:v2,specularmap_fragment:x2,specularmap_pars_fragment:M2,tonemapping_fragment:S2,tonemapping_pars_fragment:y2,transmission_fragment:E2,transmission_pars_fragment:b2,uv_pars_fragment:A2,uv_pars_vertex:T2,uv_vertex:w2,worldpos_vertex:R2,background_vert:C2,background_frag:P2,backgroundCube_vert:L2,backgroundCube_frag:I2,cube_vert:D2,cube_frag:U2,depth_vert:N2,depth_frag:F2,distance_vert:O2,distance_frag:B2,equirect_vert:k2,equirect_frag:z2,linedashed_vert:V2,linedashed_frag:G2,meshbasic_vert:H2,meshbasic_frag:W2,meshlambert_vert:X2,meshlambert_frag:Y2,meshmatcap_vert:q2,meshmatcap_frag:$2,meshnormal_vert:j2,meshnormal_frag:K2,meshphong_vert:Z2,meshphong_frag:J2,meshphysical_vert:Q2,meshphysical_frag:tx,meshtoon_vert:ex,meshtoon_frag:nx,points_vert:ix,points_frag:sx,shadow_vert:rx,shadow_frag:ax,sprite_vert:ox,sprite_frag:cx},at={common:{diffuse:{value:new ie(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new zt}},envmap:{envMap:{value:null},envMapRotation:{value:new zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new zt},normalScale:{value:new he(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ie(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ie(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0},uvTransform:{value:new zt}},sprite:{diffuse:{value:new ie(16777215)},opacity:{value:1},center:{value:new he(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}}},ci={basic:{uniforms:hn([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:Gt.meshbasic_vert,fragmentShader:Gt.meshbasic_frag},lambert:{uniforms:hn([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new ie(0)},envMapIntensity:{value:1}}]),vertexShader:Gt.meshlambert_vert,fragmentShader:Gt.meshlambert_frag},phong:{uniforms:hn([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new ie(0)},specular:{value:new ie(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphong_vert,fragmentShader:Gt.meshphong_frag},standard:{uniforms:hn([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new ie(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag},toon:{uniforms:hn([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new ie(0)}}]),vertexShader:Gt.meshtoon_vert,fragmentShader:Gt.meshtoon_frag},matcap:{uniforms:hn([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:Gt.meshmatcap_vert,fragmentShader:Gt.meshmatcap_frag},points:{uniforms:hn([at.points,at.fog]),vertexShader:Gt.points_vert,fragmentShader:Gt.points_frag},dashed:{uniforms:hn([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Gt.linedashed_vert,fragmentShader:Gt.linedashed_frag},depth:{uniforms:hn([at.common,at.displacementmap]),vertexShader:Gt.depth_vert,fragmentShader:Gt.depth_frag},normal:{uniforms:hn([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:Gt.meshnormal_vert,fragmentShader:Gt.meshnormal_frag},sprite:{uniforms:hn([at.sprite,at.fog]),vertexShader:Gt.sprite_vert,fragmentShader:Gt.sprite_frag},background:{uniforms:{uvTransform:{value:new zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Gt.background_vert,fragmentShader:Gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new zt}},vertexShader:Gt.backgroundCube_vert,fragmentShader:Gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Gt.cube_vert,fragmentShader:Gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Gt.equirect_vert,fragmentShader:Gt.equirect_frag},distance:{uniforms:hn([at.common,at.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Gt.distance_vert,fragmentShader:Gt.distance_frag},shadow:{uniforms:hn([at.lights,at.fog,{color:{value:new ie(0)},opacity:{value:1}}]),vertexShader:Gt.shadow_vert,fragmentShader:Gt.shadow_frag}};ci.physical={uniforms:hn([ci.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new zt},clearcoatNormalScale:{value:new he(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new zt},sheen:{value:0},sheenColor:{value:new ie(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new zt},transmissionSamplerSize:{value:new he},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new zt},attenuationDistance:{value:0},attenuationColor:{value:new ie(0)},specularColor:{value:new ie(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new zt},anisotropyVector:{value:new he},anisotropyMap:{value:null},anisotropyMapTransform:{value:new zt}}]),vertexShader:Gt.meshphysical_vert,fragmentShader:Gt.meshphysical_frag};const xo={r:0,b:0,g:0},Ss=new ki,lx=new we;function hx(e,t,n,i,s,r){const a=new ie(0);let o=s===!0?0:1,c,l,u=null,d=0,h=null;function m(S){let T=S.isScene===!0?S.background:null;if(T&&T.isTexture){const y=S.backgroundBlurriness>0;T=t.get(T,y)}return T}function g(S){let T=!1;const y=m(S);y===null?p(a,o):y&&y.isColor&&(p(y,1),T=!0);const w=e.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(e.autoClear||T)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function x(S,T){const y=m(T);y&&(y.isCubeTexture||y.mapping===uc)?(l===void 0&&(l=new Tn(new Na(1,1,1),new _i({name:"BackgroundCubeMaterial",uniforms:Tr(ci.backgroundCube.uniforms),vertexShader:ci.backgroundCube.vertexShader,fragmentShader:ci.backgroundCube.fragmentShader,side:gn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,C,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),Ss.copy(T.backgroundRotation),Ss.x*=-1,Ss.y*=-1,Ss.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(Ss.y*=-1,Ss.z*=-1),l.material.uniforms.envMap.value=y,l.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(lx.makeRotationFromEuler(Ss)),l.material.toneMapped=Kt.getTransfer(y.colorSpace)!==ae,(u!==y||d!==y.version||h!==e.toneMapping)&&(l.material.needsUpdate=!0,u=y,d=y.version,h=e.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Tn(new fc(2,2),new _i({name:"BackgroundMaterial",uniforms:Tr(ci.background.uniforms),vertexShader:ci.background.vertexShader,fragmentShader:ci.background.fragmentShader,side:us,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.toneMapped=Kt.getTransfer(y.colorSpace)!==ae,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||h!==e.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,h=e.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function p(S,T){S.getRGB(xo,Em(e)),n.buffers.color.setClear(xo.r,xo.g,xo.b,T,r)}function f(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,T=1){a.set(S),o=T,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(S){o=S,p(a,o)},render:g,addToRenderList:x,dispose:f}}function ux(e,t){const n=e.getParameter(e.MAX_VERTEX_ATTRIBS),i={},s=h(null);let r=s,a=!1;function o(R,U,V,Y,z){let H=!1;const N=d(R,Y,V,U);r!==N&&(r=N,l(r.object)),H=m(R,Y,V,z),H&&g(R,Y,V,z),z!==null&&t.update(z,e.ELEMENT_ARRAY_BUFFER),(H||a)&&(a=!1,y(R,U,V,Y),z!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function c(){return e.createVertexArray()}function l(R){return e.bindVertexArray(R)}function u(R){return e.deleteVertexArray(R)}function d(R,U,V,Y){const z=Y.wireframe===!0;let H=i[U.id];H===void 0&&(H={},i[U.id]=H);const N=R.isInstancedMesh===!0?R.id:0;let Q=H[N];Q===void 0&&(Q={},H[N]=Q);let K=Q[V.id];K===void 0&&(K={},Q[V.id]=K);let lt=K[z];return lt===void 0&&(lt=h(c()),K[z]=lt),lt}function h(R){const U=[],V=[],Y=[];for(let z=0;z<n;z++)U[z]=0,V[z]=0,Y[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:V,attributeDivisors:Y,object:R,attributes:{},index:null}}function m(R,U,V,Y){const z=r.attributes,H=U.attributes;let N=0;const Q=V.getAttributes();for(const K in Q)if(Q[K].location>=0){const gt=z[K];let dt=H[K];if(dt===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(dt=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(dt=R.instanceColor)),gt===void 0||gt.attribute!==dt||dt&&gt.data!==dt.data)return!0;N++}return r.attributesNum!==N||r.index!==Y}function g(R,U,V,Y){const z={},H=U.attributes;let N=0;const Q=V.getAttributes();for(const K in Q)if(Q[K].location>=0){let gt=H[K];gt===void 0&&(K==="instanceMatrix"&&R.instanceMatrix&&(gt=R.instanceMatrix),K==="instanceColor"&&R.instanceColor&&(gt=R.instanceColor));const dt={};dt.attribute=gt,gt&&gt.data&&(dt.data=gt.data),z[K]=dt,N++}r.attributes=z,r.attributesNum=N,r.index=Y}function x(){const R=r.newAttributes;for(let U=0,V=R.length;U<V;U++)R[U]=0}function p(R){f(R,0)}function f(R,U){const V=r.newAttributes,Y=r.enabledAttributes,z=r.attributeDivisors;V[R]=1,Y[R]===0&&(e.enableVertexAttribArray(R),Y[R]=1),z[R]!==U&&(e.vertexAttribDivisor(R,U),z[R]=U)}function S(){const R=r.newAttributes,U=r.enabledAttributes;for(let V=0,Y=U.length;V<Y;V++)U[V]!==R[V]&&(e.disableVertexAttribArray(V),U[V]=0)}function T(R,U,V,Y,z,H,N){N===!0?e.vertexAttribIPointer(R,U,V,z,H):e.vertexAttribPointer(R,U,V,Y,z,H)}function y(R,U,V,Y){x();const z=Y.attributes,H=V.getAttributes(),N=U.defaultAttributeValues;for(const Q in H){const K=H[Q];if(K.location>=0){let lt=z[Q];if(lt===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(lt=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(lt=R.instanceColor)),lt!==void 0){const gt=lt.normalized,dt=lt.itemSize,Vt=t.get(lt);if(Vt===void 0)continue;const _e=Vt.buffer,ge=Vt.type,$=Vt.bytesPerElement,nt=ge===e.INT||ge===e.UNSIGNED_INT||lt.gpuType===iu;if(lt.isInterleavedBufferAttribute){const rt=lt.data,Bt=rt.stride,It=lt.offset;if(rt.isInstancedInterleavedBuffer){for(let Nt=0;Nt<K.locationSize;Nt++)f(K.location+Nt,rt.meshPerAttribute);R.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let Nt=0;Nt<K.locationSize;Nt++)p(K.location+Nt);e.bindBuffer(e.ARRAY_BUFFER,_e);for(let Nt=0;Nt<K.locationSize;Nt++)T(K.location+Nt,dt/K.locationSize,ge,gt,Bt*$,(It+dt/K.locationSize*Nt)*$,nt)}else{if(lt.isInstancedBufferAttribute){for(let rt=0;rt<K.locationSize;rt++)f(K.location+rt,lt.meshPerAttribute);R.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let rt=0;rt<K.locationSize;rt++)p(K.location+rt);e.bindBuffer(e.ARRAY_BUFFER,_e);for(let rt=0;rt<K.locationSize;rt++)T(K.location+rt,dt/K.locationSize,ge,gt,dt*$,dt/K.locationSize*rt*$,nt)}}else if(N!==void 0){const gt=N[Q];if(gt!==void 0)switch(gt.length){case 2:e.vertexAttrib2fv(K.location,gt);break;case 3:e.vertexAttrib3fv(K.location,gt);break;case 4:e.vertexAttrib4fv(K.location,gt);break;default:e.vertexAttrib1fv(K.location,gt)}}}}S()}function w(){E();for(const R in i){const U=i[R];for(const V in U){const Y=U[V];for(const z in Y){const H=Y[z];for(const N in H)u(H[N].object),delete H[N];delete Y[z]}}delete i[R]}}function C(R){if(i[R.id]===void 0)return;const U=i[R.id];for(const V in U){const Y=U[V];for(const z in Y){const H=Y[z];for(const N in H)u(H[N].object),delete H[N];delete Y[z]}}delete i[R.id]}function b(R){for(const U in i){const V=i[U];for(const Y in V){const z=V[Y];if(z[R.id]===void 0)continue;const H=z[R.id];for(const N in H)u(H[N].object),delete H[N];delete z[R.id]}}}function v(R){for(const U in i){const V=i[U],Y=R.isInstancedMesh===!0?R.id:0,z=V[Y];if(z!==void 0){for(const H in z){const N=z[H];for(const Q in N)u(N[Q].object),delete N[Q];delete z[H]}delete V[Y],Object.keys(V).length===0&&delete i[U]}}}function E(){k(),a=!0,r!==s&&(r=s,l(r.object))}function k(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:E,resetDefaultState:k,dispose:w,releaseStatesOfGeometry:C,releaseStatesOfObject:v,releaseStatesOfProgram:b,initAttributes:x,enableAttribute:p,disableUnusedAttributes:S}}function dx(e,t,n){let i;function s(l){i=l}function r(l,u){e.drawArrays(i,l,u),n.update(u,i,1)}function a(l,u,d){d!==0&&(e.drawArraysInstanced(i,l,u,d),n.update(u,i,d))}function o(l,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,u,0,d);let m=0;for(let g=0;g<d;g++)m+=u[g];n.update(m,i,1)}function c(l,u,d,h){if(d===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<l.length;g++)a(l[g],u[g],h[g]);else{m.multiDrawArraysInstancedWEBGL(i,l,0,u,0,h,0,d);let g=0;for(let x=0;x<d;x++)g+=u[x]*h[x];n.update(g,i,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function fx(e,t,n,i){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");s=e.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(b){return!(b!==jn&&i.convert(b)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(b){const v=b===Oi&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(b!==kn&&i.convert(b)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&b!==li&&!v)}function c(b){if(b==="highp"){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=n.precision!==void 0?n.precision:"highp";const u=c(l);u!==l&&(Ut("WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);const d=n.logarithmicDepthBuffer===!0,h=n.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),m=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),g=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=e.getParameter(e.MAX_TEXTURE_SIZE),p=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),f=e.getParameter(e.MAX_VERTEX_ATTRIBS),S=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),T=e.getParameter(e.MAX_VARYING_VECTORS),y=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),w=e.getParameter(e.MAX_SAMPLES),C=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:m,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:S,maxVaryings:T,maxFragmentUniforms:y,maxSamples:w,samples:C}}function px(e){const t=this;let n=null,i=0,s=!1,r=!1;const a=new As,o=new zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const m=d.length!==0||h||i!==0||s;return s=h,i=d.length,m},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){n=u(d,h,0)},this.setState=function(d,h,m){const g=d.clippingPlanes,x=d.clipIntersection,p=d.clipShadows,f=e.get(d);if(!s||g===null||g.length===0||r&&!p)r?u(null):l();else{const S=r?0:i,T=S*4;let y=f.clippingState||null;c.value=y,y=u(g,h,T,m);for(let w=0;w!==T;++w)y[w]=n[w];f.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function u(d,h,m,g){const x=d!==null?d.length:0;let p=null;if(x!==0){if(p=c.value,g!==!0||p===null){const f=m+x*4,S=h.matrixWorldInverse;o.getNormalMatrix(S),(p===null||p.length<f)&&(p=new Float32Array(f));for(let T=0,y=m;T!==x;++T,y+=4)a.copy(d[T]).applyMatrix4(S,o),a.normal.toArray(p,y),p[y+3]=a.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=x,t.numIntersection=0,p}}const os=4,nf=[.125,.215,.35,.446,.526,.582],Ps=20,mx=256,ha=new Am,sf=new ie;let Ml=null,Sl=0,yl=0,El=!1;const gx=new F;class rf{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(t,n=0,i=.1,s=100,r={}){const{size:a=256,position:o=gx}=r;Ml=this._renderer.getRenderTarget(),Sl=this._renderer.getActiveCubeFace(),yl=this._renderer.getActiveMipmapLevel(),El=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(t,i,s,c,o),n>0&&this._blur(c,0,0,n),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(t,n=null){return this._fromTexture(t,n)}fromCubemap(t,n=null){return this._fromTexture(t,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=cf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=of(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodMeshes.length;t++)this._lodMeshes[t].geometry.dispose()}_cleanup(t){this._renderer.setRenderTarget(Ml,Sl,yl),this._renderer.xr.enabled=El,t.scissorTest=!1,ur(t,0,0,t.width,t.height)}_fromTexture(t,n){t.mapping===Hs||t.mapping===yr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Ml=this._renderer.getRenderTarget(),Sl=this._renderer.getActiveCubeFace(),yl=this._renderer.getActiveMipmapLevel(),El=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:je,minFilter:je,generateMipmaps:!1,type:Oi,format:jn,colorSpace:br,depthBuffer:!1},s=af(t,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=af(t,n,i);const{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=_x(r)),this._blurMaterial=xx(r,t,n),this._ggxMaterial=vx(r,t,n)}return s}_compileMaterial(t){const n=new Tn(new on,t);this._renderer.compile(n,ha)}_sceneToCubeUV(t,n,i,s,r){const c=new Bn(90,1,n,i),l=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,m=d.toneMapping;d.getClearColor(sf),d.toneMapping=di,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Tn(new Na,new Ar({name:"PMREM.Background",side:gn,depthWrite:!1,depthTest:!1})));const x=this._backgroundBox,p=x.material;let f=!1;const S=t.background;S?S.isColor&&(p.color.copy(S),t.background=null,f=!0):(p.color.copy(sf),f=!0);for(let T=0;T<6;T++){const y=T%3;y===0?(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x+u[T],r.y,r.z)):y===1?(c.up.set(0,0,l[T]),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y+u[T],r.z)):(c.up.set(0,l[T],0),c.position.set(r.x,r.y,r.z),c.lookAt(r.x,r.y,r.z+u[T]));const w=this._cubeSize;ur(s,y*w,T>2?w:0,w,w),d.setRenderTarget(s),f&&d.render(x,c),d.render(t,c)}d.toneMapping=m,d.autoClear=h,t.background=S}_textureToCubeUV(t,n){const i=this._renderer,s=t.mapping===Hs||t.mapping===yr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=cf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=of());const r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;const o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;ur(n,0,0,3*c,2*c),i.setRenderTarget(n),i.render(a,ha)}_applyPMREM(t){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(t,r-1,r);n.autoClear=i}_applyGGXFilter(t,n,i){const s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),u=n/(this._lodMeshes.length-1),d=Math.sqrt(l*l-u*u),h=0+l*1.25,m=d*h,{_lodMax:g}=this,x=this._sizeLods[i],p=3*x*(i>g-os?i-g+os:0),f=4*(this._cubeSize-x);c.envMap.value=t.texture,c.roughness.value=m,c.mipInt.value=g-n,ur(r,p,f,3*x,2*x),s.setRenderTarget(r),s.render(o,ha),c.envMap.value=r.texture,c.roughness.value=0,c.mipInt.value=g-i,ur(t,p,f,3*x,2*x),s.setRenderTarget(t),s.render(o,ha)}_blur(t,n,i,s,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,n,i,s,"latitudinal",r),this._halfBlur(a,t,i,i,s,"longitudinal",r)}_halfBlur(t,n,i,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Qt("blur direction must be either latitudinal or longitudinal!");const u=3,d=this._lodMeshes[s];d.material=l;const h=l.uniforms,m=this._sizeLods[i]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*Ps-1),x=r/g,p=isFinite(r)?1+Math.floor(u*x):Ps;p>Ps&&Ut(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${Ps}`);const f=[];let S=0;for(let b=0;b<Ps;++b){const v=b/x,E=Math.exp(-v*v/2);f.push(E),b===0?S+=E:b<p&&(S+=2*E)}for(let b=0;b<f.length;b++)f[b]=f[b]/S;h.envMap.value=t.texture,h.samples.value=p,h.weights.value=f,h.latitudinal.value=a==="latitudinal",o&&(h.poleAxis.value=o);const{_lodMax:T}=this;h.dTheta.value=g,h.mipInt.value=T-i;const y=this._sizeLods[s],w=3*y*(s>T-os?s-T+os:0),C=4*(this._cubeSize-y);ur(n,w,C,3*y,2*y),c.setRenderTarget(n),c.render(d,ha)}}function _x(e){const t=[],n=[],i=[];let s=e;const r=e-os+1+nf.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>e-os?c=nf[a-e+os-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,d=1+l,h=[u,u,d,u,d,d,u,u,d,d,u,d],m=6,g=6,x=3,p=2,f=1,S=new Float32Array(x*g*m),T=new Float32Array(p*g*m),y=new Float32Array(f*g*m);for(let C=0;C<m;C++){const b=C%3*2/3-1,v=C>2?0:-1,E=[b,v,0,b+2/3,v,0,b+2/3,v+1,0,b,v,0,b+2/3,v+1,0,b,v+1,0];S.set(E,x*g*C),T.set(h,p*g*C);const k=[C,C,C,C,C,C];y.set(k,f*g*C)}const w=new on;w.setAttribute("position",new an(S,x)),w.setAttribute("uv",new an(T,p)),w.setAttribute("faceIndex",new an(y,f)),i.push(new Tn(w,null)),s>os&&s--}return{lodMeshes:i,sizeLods:t,sigmas:n}}function af(e,t,n){const i=new fi(e,t,n);return i.texture.mapping=uc,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ur(e,t,n,i,s){e.viewport.set(t,n,i,s),e.scissor.set(t,n,i,s)}function vx(e,t,n){return new _i({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:mx,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:pc(),fragmentShader:`

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
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function xx(e,t,n){const i=new Float32Array(Ps),s=new F(0,1,0);return new _i({name:"SphericalGaussianBlur",defines:{n:Ps,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:pc(),fragmentShader:`

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
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function of(){return new _i({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:pc(),fragmentShader:`

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
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function cf(){return new _i({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:pc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ui,depthTest:!1,depthWrite:!1})}function pc(){return`

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
	`}class wm extends fi{constructor(t=1,n={}){super(t,t,n),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];this.texture=new Sm(s),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Na(5,5,5),r=new _i({name:"CubemapFromEquirect",uniforms:Tr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:gn,blending:Ui});r.uniforms.tEquirect.value=n;const a=new Tn(s,r),o=n.minFilter;return n.minFilter===Is&&(n.minFilter=je),new T1(1,10,this).update(t,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,n=!0,i=!0,s=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(n,i,s);t.setRenderTarget(r)}}function Mx(e){let t=new WeakMap,n=new WeakMap,i=null;function s(h,m=!1){return h==null?null:m?a(h):r(h)}function r(h){if(h&&h.isTexture){const m=h.mapping;if(m===Yc||m===qc)if(t.has(h)){const g=t.get(h).texture;return o(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const x=new wm(g.height);return x.fromEquirectangularTexture(e,h),t.set(h,x),h.addEventListener("dispose",l),o(x.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){const m=h.mapping,g=m===Yc||m===qc,x=m===Hs||m===yr;if(g||x){let p=n.get(h);const f=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==f)return i===null&&(i=new rf(e)),p=g?i.fromEquirectangular(h,p):i.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,n.set(h,p),p.texture;if(p!==void 0)return p.texture;{const S=h.image;return g&&S&&S.height>0||x&&S&&c(S)?(i===null&&(i=new rf(e)),p=g?i.fromEquirectangular(h):i.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,n.set(h,p),h.addEventListener("dispose",u),p.texture):null}}}return h}function o(h,m){return m===Yc?h.mapping=Hs:m===qc&&(h.mapping=yr),h}function c(h){let m=0;const g=6;for(let x=0;x<g;x++)h[x]!==void 0&&m++;return m===g}function l(h){const m=h.target;m.removeEventListener("dispose",l);const g=t.get(m);g!==void 0&&(t.delete(m),g.dispose())}function u(h){const m=h.target;m.removeEventListener("dispose",u);const g=n.get(m);g!==void 0&&(n.delete(m),g.dispose())}function d(){t=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function Sx(e){const t={};function n(i){if(t[i]!==void 0)return t[i];const s=e.getExtension(i);return t[i]=s,s}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const s=n(i);return s===null&&Zo("WebGLRenderer: "+i+" extension not supported."),s}}}function yx(e,t,n,i){const s={},r=new WeakMap;function a(d){const h=d.target;h.index!==null&&t.remove(h.index);for(const g in h.attributes)t.remove(h.attributes[g]);h.removeEventListener("dispose",a),delete s[h.id];const m=r.get(h);m&&(t.remove(m),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,n.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,n.memory.geometries++),h}function c(d){const h=d.attributes;for(const m in h)t.update(h[m],e.ARRAY_BUFFER)}function l(d){const h=[],m=d.index,g=d.attributes.position;let x=0;if(g===void 0)return;if(m!==null){const S=m.array;x=m.version;for(let T=0,y=S.length;T<y;T+=3){const w=S[T+0],C=S[T+1],b=S[T+2];h.push(w,C,C,b,b,w)}}else{const S=g.array;x=g.version;for(let T=0,y=S.length/3-1;T<y;T+=3){const w=T+0,C=T+1,b=T+2;h.push(w,C,C,b,b,w)}}const p=new(g.count>=65535?vm:_m)(h,1);p.version=x;const f=r.get(d);f&&t.remove(f),r.set(d,p)}function u(d){const h=r.get(d);if(h){const m=d.index;m!==null&&h.version<m.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function Ex(e,t,n){let i;function s(h){i=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function c(h,m){e.drawElements(i,m,r,h*a),n.update(m,i,1)}function l(h,m,g){g!==0&&(e.drawElementsInstanced(i,m,r,h*a,g),n.update(m,i,g))}function u(h,m,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,r,h,0,g);let p=0;for(let f=0;f<g;f++)p+=m[f];n.update(p,i,1)}function d(h,m,g,x){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<h.length;f++)l(h[f]/a,m[f],x[f]);else{p.multiDrawElementsInstancedWEBGL(i,m,0,r,h,0,x,0,g);let f=0;for(let S=0;S<g;S++)f+=m[S]*x[S];n.update(f,i,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function bx(e){const t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(n.calls++,a){case e.TRIANGLES:n.triangles+=o*(r/3);break;case e.LINES:n.lines+=o*(r/2);break;case e.LINE_STRIP:n.lines+=o*(r-1);break;case e.LINE_LOOP:n.lines+=o*r;break;case e.POINTS:n.points+=o*r;break;default:Qt("WebGLInfo: Unknown draw mode:",a);break}}function s(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:s,update:i}}function Ax(e,t,n){const i=new WeakMap,s=new Ie;function r(a,o,c){const l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0;let h=i.get(o);if(h===void 0||h.count!==d){let k=function(){v.dispose(),i.delete(o),o.removeEventListener("dispose",k)};var m=k;h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,x=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],S=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let y=0;g===!0&&(y=1),x===!0&&(y=2),p===!0&&(y=3);let w=o.attributes.position.count*y,C=1;w>t.maxTextureSize&&(C=Math.ceil(w/t.maxTextureSize),w=t.maxTextureSize);const b=new Float32Array(w*C*4*d),v=new pm(b,w,C,d);v.type=li,v.needsUpdate=!0;const E=y*4;for(let R=0;R<d;R++){const U=f[R],V=S[R],Y=T[R],z=w*C*4*R;for(let H=0;H<U.count;H++){const N=H*E;g===!0&&(s.fromBufferAttribute(U,H),b[z+N+0]=s.x,b[z+N+1]=s.y,b[z+N+2]=s.z,b[z+N+3]=0),x===!0&&(s.fromBufferAttribute(V,H),b[z+N+4]=s.x,b[z+N+5]=s.y,b[z+N+6]=s.z,b[z+N+7]=0),p===!0&&(s.fromBufferAttribute(Y,H),b[z+N+8]=s.x,b[z+N+9]=s.y,b[z+N+10]=s.z,b[z+N+11]=Y.itemSize===4?s.w:1)}}h={count:d,texture:v,size:new he(w,C)},i.set(o,h),o.addEventListener("dispose",k)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(e,"morphTexture",a.morphTexture,n);else{let g=0;for(let p=0;p<l.length;p++)g+=l[p];const x=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(e,"morphTargetBaseInfluence",x),c.getUniforms().setValue(e,"morphTargetInfluences",l)}c.getUniforms().setValue(e,"morphTargetsTexture",h.texture,n),c.getUniforms().setValue(e,"morphTargetsTextureSize",h.size)}return{update:r}}function Tx(e,t,n,i,s){let r=new WeakMap;function a(l){const u=s.render.frame,d=l.geometry,h=t.get(l,d);if(r.get(h)!==u&&(t.update(h),r.set(h,u)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),r.get(l)!==u&&(n.update(l.instanceMatrix,e.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,e.ARRAY_BUFFER),r.set(l,u))),l.isSkinnedMesh){const m=l.skeleton;r.get(m)!==u&&(m.update(),r.set(m,u))}return h}function o(){r=new WeakMap}function c(l){const u=l.target;u.removeEventListener("dispose",c),i.releaseStatesOfObject(u),n.remove(u.instanceMatrix),u.instanceColor!==null&&n.remove(u.instanceColor)}return{update:a,dispose:o}}const wx={[Jp]:"LINEAR_TONE_MAPPING",[Qp]:"REINHARD_TONE_MAPPING",[tm]:"CINEON_TONE_MAPPING",[em]:"ACES_FILMIC_TONE_MAPPING",[im]:"AGX_TONE_MAPPING",[sm]:"NEUTRAL_TONE_MAPPING",[nm]:"CUSTOM_TONE_MAPPING"};function Rx(e,t,n,i,s){const r=new fi(t,n,{type:e,depthBuffer:i,stencilBuffer:s}),a=new fi(t,n,{type:Oi,depthBuffer:!1,stencilBuffer:!1}),o=new on;o.setAttribute("position",new dn([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new dn([0,2,0,0,2,0],2));const c=new E1({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new Tn(o,c),u=new Am(-1,1,1,-1,0,1);let d=null,h=null,m=!1,g,x=null,p=[],f=!1;this.setSize=function(S,T){r.setSize(S,T),a.setSize(S,T);for(let y=0;y<p.length;y++){const w=p[y];w.setSize&&w.setSize(S,T)}},this.setEffects=function(S){p=S,f=p.length>0&&p[0].isRenderPass===!0;const T=r.width,y=r.height;for(let w=0;w<p.length;w++){const C=p[w];C.setSize&&C.setSize(T,y)}},this.begin=function(S,T){if(m||S.toneMapping===di&&p.length===0)return!1;if(x=T,T!==null){const y=T.width,w=T.height;(r.width!==y||r.height!==w)&&this.setSize(y,w)}return f===!1&&S.setRenderTarget(r),g=S.toneMapping,S.toneMapping=di,!0},this.hasRenderPass=function(){return f},this.end=function(S,T){S.toneMapping=g,m=!0;let y=r,w=a;for(let C=0;C<p.length;C++){const b=p[C];if(b.enabled!==!1&&(b.render(S,w,y,T),b.needsSwap!==!1)){const v=y;y=w,w=v}}if(d!==S.outputColorSpace||h!==S.toneMapping){d=S.outputColorSpace,h=S.toneMapping,c.defines={},Kt.getTransfer(d)===ae&&(c.defines.SRGB_TRANSFER="");const C=wx[h];C&&(c.defines[C]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=y.texture,S.setRenderTarget(x),S.render(l,u),x=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){r.dispose(),a.dispose(),o.dispose(),c.dispose()}}const Rm=new rn,Lh=new Aa(1,1),Cm=new pm,Pm=new Z_,Lm=new Sm,lf=[],hf=[],uf=new Float32Array(16),df=new Float32Array(9),ff=new Float32Array(4);function Wr(e,t,n){const i=e[0];if(i<=0||i>0)return e;const s=t*n;let r=lf[s];if(r===void 0&&(r=new Float32Array(s),lf[s]=r),t!==0){i.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=n,e[a].toArray(r,o)}return r}function Ve(e,t){if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(e[n]!==t[n])return!1;return!0}function Ge(e,t){for(let n=0,i=t.length;n<i;n++)e[n]=t[n]}function mc(e,t){let n=hf[t];n===void 0&&(n=new Int32Array(t),hf[t]=n);for(let i=0;i!==t;++i)n[i]=e.allocateTextureUnit();return n}function Cx(e,t){const n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Px(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ve(n,t))return;e.uniform2fv(this.addr,t),Ge(n,t)}}function Lx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Ve(n,t))return;e.uniform3fv(this.addr,t),Ge(n,t)}}function Ix(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ve(n,t))return;e.uniform4fv(this.addr,t),Ge(n,t)}}function Dx(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Ve(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Ge(n,t)}else{if(Ve(n,i))return;ff.set(i),e.uniformMatrix2fv(this.addr,!1,ff),Ge(n,i)}}function Ux(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Ve(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Ge(n,t)}else{if(Ve(n,i))return;df.set(i),e.uniformMatrix3fv(this.addr,!1,df),Ge(n,i)}}function Nx(e,t){const n=this.cache,i=t.elements;if(i===void 0){if(Ve(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Ge(n,t)}else{if(Ve(n,i))return;uf.set(i),e.uniformMatrix4fv(this.addr,!1,uf),Ge(n,i)}}function Fx(e,t){const n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Ox(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ve(n,t))return;e.uniform2iv(this.addr,t),Ge(n,t)}}function Bx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ve(n,t))return;e.uniform3iv(this.addr,t),Ge(n,t)}}function kx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ve(n,t))return;e.uniform4iv(this.addr,t),Ge(n,t)}}function zx(e,t){const n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Vx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ve(n,t))return;e.uniform2uiv(this.addr,t),Ge(n,t)}}function Gx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ve(n,t))return;e.uniform3uiv(this.addr,t),Ge(n,t)}}function Hx(e,t){const n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ve(n,t))return;e.uniform4uiv(this.addr,t),Ge(n,t)}}function Wx(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s);let r;this.type===e.SAMPLER_2D_SHADOW?(Lh.compareFunction=n.isReversedDepthBuffer()?hu:lu,r=Lh):r=Rm,n.setTexture2D(t||r,s)}function Xx(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture3D(t||Pm,s)}function Yx(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTextureCube(t||Lm,s)}function qx(e,t,n){const i=this.cache,s=n.allocateTextureUnit();i[0]!==s&&(e.uniform1i(this.addr,s),i[0]=s),n.setTexture2DArray(t||Cm,s)}function $x(e){switch(e){case 5126:return Cx;case 35664:return Px;case 35665:return Lx;case 35666:return Ix;case 35674:return Dx;case 35675:return Ux;case 35676:return Nx;case 5124:case 35670:return Fx;case 35667:case 35671:return Ox;case 35668:case 35672:return Bx;case 35669:case 35673:return kx;case 5125:return zx;case 36294:return Vx;case 36295:return Gx;case 36296:return Hx;case 35678:case 36198:case 36298:case 36306:case 35682:return Wx;case 35679:case 36299:case 36307:return Xx;case 35680:case 36300:case 36308:case 36293:return Yx;case 36289:case 36303:case 36311:case 36292:return qx}}function jx(e,t){e.uniform1fv(this.addr,t)}function Kx(e,t){const n=Wr(t,this.size,2);e.uniform2fv(this.addr,n)}function Zx(e,t){const n=Wr(t,this.size,3);e.uniform3fv(this.addr,n)}function Jx(e,t){const n=Wr(t,this.size,4);e.uniform4fv(this.addr,n)}function Qx(e,t){const n=Wr(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function t3(e,t){const n=Wr(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function e3(e,t){const n=Wr(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function n3(e,t){e.uniform1iv(this.addr,t)}function i3(e,t){e.uniform2iv(this.addr,t)}function s3(e,t){e.uniform3iv(this.addr,t)}function r3(e,t){e.uniform4iv(this.addr,t)}function a3(e,t){e.uniform1uiv(this.addr,t)}function o3(e,t){e.uniform2uiv(this.addr,t)}function c3(e,t){e.uniform3uiv(this.addr,t)}function l3(e,t){e.uniform4uiv(this.addr,t)}function h3(e,t,n){const i=this.cache,s=t.length,r=mc(n,s);Ve(i,r)||(e.uniform1iv(this.addr,r),Ge(i,r));let a;this.type===e.SAMPLER_2D_SHADOW?a=Lh:a=Rm;for(let o=0;o!==s;++o)n.setTexture2D(t[o]||a,r[o])}function u3(e,t,n){const i=this.cache,s=t.length,r=mc(n,s);Ve(i,r)||(e.uniform1iv(this.addr,r),Ge(i,r));for(let a=0;a!==s;++a)n.setTexture3D(t[a]||Pm,r[a])}function d3(e,t,n){const i=this.cache,s=t.length,r=mc(n,s);Ve(i,r)||(e.uniform1iv(this.addr,r),Ge(i,r));for(let a=0;a!==s;++a)n.setTextureCube(t[a]||Lm,r[a])}function f3(e,t,n){const i=this.cache,s=t.length,r=mc(n,s);Ve(i,r)||(e.uniform1iv(this.addr,r),Ge(i,r));for(let a=0;a!==s;++a)n.setTexture2DArray(t[a]||Cm,r[a])}function p3(e){switch(e){case 5126:return jx;case 35664:return Kx;case 35665:return Zx;case 35666:return Jx;case 35674:return Qx;case 35675:return t3;case 35676:return e3;case 5124:case 35670:return n3;case 35667:case 35671:return i3;case 35668:case 35672:return s3;case 35669:case 35673:return r3;case 5125:return a3;case 36294:return o3;case 36295:return c3;case 36296:return l3;case 35678:case 36198:case 36298:case 36306:case 35682:return h3;case 35679:case 36299:case 36307:return u3;case 35680:case 36300:case 36308:case 36293:return d3;case 36289:case 36303:case 36311:case 36292:return f3}}class m3{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.setValue=$x(n.type)}}class g3{constructor(t,n,i){this.id=t,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=p3(n.type)}}class _3{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,n,i){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(t,n[o.id],i)}}}const bl=/(\w+)(\])?(\[|\.)?/g;function pf(e,t){e.seq.push(t),e.map[t.id]=t}function v3(e,t,n){const i=e.name,s=i.length;for(bl.lastIndex=0;;){const r=bl.exec(i),a=bl.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){pf(n,l===void 0?new m3(o,e,t):new g3(o,e,t));break}else{let d=n.map[o];d===void 0&&(d=new _3(o),pf(n,d)),n=d}}}class Oo{constructor(t,n){this.seq=[],this.map={};const i=t.getProgramParameter(n,t.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=t.getActiveUniform(n,a),c=t.getUniformLocation(n,o.name);v3(o,c,this)}const s=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(t,n,i,s){const r=this.map[n];r!==void 0&&r.setValue(t,i,s)}setOptional(t,n,i){const s=n[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,n,i,s){for(let r=0,a=n.length;r!==a;++r){const o=n[r],c=i[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,n){const i=[];for(let s=0,r=t.length;s!==r;++s){const a=t[s];a.id in n&&i.push(a)}return i}}function mf(e,t,n){const i=e.createShader(t);return e.shaderSource(i,n),e.compileShader(i),i}const x3=37297;let M3=0;function S3(e,t){const n=e.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,n.length);for(let a=s;a<r;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}const gf=new zt;function y3(e){Kt._getMatrix(gf,Kt.workingColorSpace,e);const t=`mat3( ${gf.elements.map(n=>n.toFixed(4))} )`;switch(Kt.getTransfer(e)){case $o:return[t,"LinearTransferOETF"];case ae:return[t,"sRGBTransferOETF"];default:return Ut("WebGLProgram: Unsupported color space: ",e),[t,"LinearTransferOETF"]}}function _f(e,t,n){const i=e.getShaderParameter(t,e.COMPILE_STATUS),r=(e.getShaderInfoLog(t)||"").trim();if(i&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return n.toUpperCase()+`

`+r+`

`+S3(e.getShaderSource(t),o)}else return r}function E3(e,t){const n=y3(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const b3={[Jp]:"Linear",[Qp]:"Reinhard",[tm]:"Cineon",[em]:"ACESFilmic",[im]:"AgX",[sm]:"Neutral",[nm]:"Custom"};function A3(e,t){const n=b3[t];return n===void 0?(Ut("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+e+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+e+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Mo=new F;function T3(){Kt.getLuminanceCoefficients(Mo);const e=Mo.x.toFixed(4),t=Mo.y.toFixed(4),n=Mo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${e}, ${t}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function w3(e){return[e.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",e.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ma).join(`
`)}function R3(e){const t=[];for(const n in e){const i=e[n];i!==!1&&t.push("#define "+n+" "+i)}return t.join(`
`)}function C3(e,t){const n={},i=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){const r=e.getActiveAttrib(t,s),a=r.name;let o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function ma(e){return e!==""}function vf(e,t){const n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function xf(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const P3=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ih(e){return e.replace(P3,I3)}const L3=new Map;function I3(e,t){let n=Gt[t];if(n===void 0){const i=L3.get(t);if(i!==void 0)n=Gt[i],Ut('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Ih(n)}const D3=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Mf(e){return e.replace(D3,U3)}function U3(e,t,n,i){let s="";for(let r=parseInt(t);r<parseInt(n);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Sf(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}const N3={[Io]:"SHADOWMAP_TYPE_PCF",[pa]:"SHADOWMAP_TYPE_VSM"};function F3(e){return N3[e.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const O3={[Hs]:"ENVMAP_TYPE_CUBE",[yr]:"ENVMAP_TYPE_CUBE",[uc]:"ENVMAP_TYPE_CUBE_UV"};function B3(e){return e.envMap===!1?"ENVMAP_TYPE_CUBE":O3[e.envMapMode]||"ENVMAP_TYPE_CUBE"}const k3={[yr]:"ENVMAP_MODE_REFRACTION"};function z3(e){return e.envMap===!1?"ENVMAP_MODE_REFLECTION":k3[e.envMapMode]||"ENVMAP_MODE_REFLECTION"}const V3={[Zp]:"ENVMAP_BLENDING_MULTIPLY",[C_]:"ENVMAP_BLENDING_MIX",[P_]:"ENVMAP_BLENDING_ADD"};function G3(e){return e.envMap===!1?"ENVMAP_BLENDING_NONE":V3[e.combine]||"ENVMAP_BLENDING_NONE"}function H3(e){const t=e.envMapCubeUVHeight;if(t===null)return null;const n=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function W3(e,t,n,i){const s=e.getContext(),r=n.defines;let a=n.vertexShader,o=n.fragmentShader;const c=F3(n),l=B3(n),u=z3(n),d=G3(n),h=H3(n),m=w3(n),g=R3(r),x=s.createProgram();let p,f,S=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(ma).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g].filter(ma).join(`
`),f.length>0&&(f+=`
`)):(p=[Sf(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+u:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ma).join(`
`),f=[Sf(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,g,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+l:"",n.envMap?"#define "+u:"",n.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==di?"#define TONE_MAPPING":"",n.toneMapping!==di?Gt.tonemapping_pars_fragment:"",n.toneMapping!==di?A3("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",Gt.colorspace_pars_fragment,E3("linearToOutputTexel",n.outputColorSpace),T3(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(ma).join(`
`)),a=Ih(a),a=vf(a,n),a=xf(a,n),o=Ih(o),o=vf(o,n),o=xf(o,n),a=Mf(a),o=Mf(o),n.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",n.glslVersion===Pd?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===Pd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const T=S+p+a,y=S+f+o,w=mf(s,s.VERTEX_SHADER,T),C=mf(s,s.FRAGMENT_SHADER,y);s.attachShader(x,w),s.attachShader(x,C),n.index0AttributeName!==void 0?s.bindAttribLocation(x,0,n.index0AttributeName):n.morphTargets===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function b(R){if(e.debug.checkShaderErrors){const U=s.getProgramInfoLog(x)||"",V=s.getShaderInfoLog(w)||"",Y=s.getShaderInfoLog(C)||"",z=U.trim(),H=V.trim(),N=Y.trim();let Q=!0,K=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(Q=!1,typeof e.debug.onShaderError=="function")e.debug.onShaderError(s,x,w,C);else{const lt=_f(s,w,"vertex"),gt=_f(s,C,"fragment");Qt("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+z+`
`+lt+`
`+gt)}else z!==""?Ut("WebGLProgram: Program Info Log:",z):(H===""||N==="")&&(K=!1);K&&(R.diagnostics={runnable:Q,programLog:z,vertexShader:{log:H,prefix:p},fragmentShader:{log:N,prefix:f}})}s.deleteShader(w),s.deleteShader(C),v=new Oo(s,x),E=C3(s,x)}let v;this.getUniforms=function(){return v===void 0&&b(this),v};let E;this.getAttributes=function(){return E===void 0&&b(this),E};let k=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=s.getProgramParameter(x,x3)),k},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=M3++,this.cacheKey=t,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=C,this}let X3=0;class Y3{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const n=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(n),r=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const n=this.materialCache.get(t);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const n=this.materialCache;let i=n.get(t);return i===void 0&&(i=new Set,n.set(t,i)),i}_getShaderStage(t){const n=this.shaderCache;let i=n.get(t);return i===void 0&&(i=new q3(t),n.set(t,i)),i}}class q3{constructor(t){this.id=X3++,this.code=t,this.usedTimes=0}}function $3(e,t,n,i,s,r){const a=new mm,o=new Y3,c=new Set,l=[],u=new Map,d=i.logarithmicDepthBuffer;let h=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(v){return c.add(v),v===0?"uv":`uv${v}`}function x(v,E,k,R,U){const V=R.fog,Y=U.geometry,z=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?R.environment:null,H=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,N=t.get(v.envMap||z,H),Q=N&&N.mapping===uc?N.image.height:null,K=m[v.type];v.precision!==null&&(h=i.getMaxPrecision(v.precision),h!==v.precision&&Ut("WebGLProgram.getParameters:",v.precision,"not supported, using",h,"instead."));const lt=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,gt=lt!==void 0?lt.length:0;let dt=0;Y.morphAttributes.position!==void 0&&(dt=1),Y.morphAttributes.normal!==void 0&&(dt=2),Y.morphAttributes.color!==void 0&&(dt=3);let Vt,_e,ge,$;if(K){const re=ci[K];Vt=re.vertexShader,_e=re.fragmentShader}else Vt=v.vertexShader,_e=v.fragmentShader,o.update(v),ge=o.getVertexShaderID(v),$=o.getFragmentShaderID(v);const nt=e.getRenderTarget(),rt=e.state.buffers.depth.getReversed(),Bt=U.isInstancedMesh===!0,It=U.isBatchedMesh===!0,Nt=!!v.map,We=!!v.matcap,jt=!!N,se=!!v.aoMap,ue=!!v.lightMap,Wt=!!v.bumpMap,Ce=!!v.normalMap,P=!!v.displacementMap,De=!!v.emissiveMap,ne=!!v.metalnessMap,pe=!!v.roughnessMap,yt=v.anisotropy>0,A=v.clearcoat>0,_=v.dispersion>0,I=v.iridescence>0,q=v.sheen>0,j=v.transmission>0,X=yt&&!!v.anisotropyMap,_t=A&&!!v.clearcoatMap,it=A&&!!v.clearcoatNormalMap,Pt=A&&!!v.clearcoatRoughnessMap,Dt=I&&!!v.iridescenceMap,Z=I&&!!v.iridescenceThicknessMap,tt=q&&!!v.sheenColorMap,vt=q&&!!v.sheenRoughnessMap,Mt=!!v.specularMap,ht=!!v.specularColorMap,Xt=!!v.specularIntensityMap,L=j&&!!v.transmissionMap,st=j&&!!v.thicknessMap,et=!!v.gradientMap,pt=!!v.alphaMap,J=v.alphaTest>0,W=!!v.alphaHash,xt=!!v.extensions;let Ft=di;v.toneMapped&&(nt===null||nt.isXRRenderTarget===!0)&&(Ft=e.toneMapping);const me={shaderID:K,shaderType:v.type,shaderName:v.name,vertexShader:Vt,fragmentShader:_e,defines:v.defines,customVertexShaderID:ge,customFragmentShaderID:$,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:h,batching:It,batchingColor:It&&U._colorsTexture!==null,instancing:Bt,instancingColor:Bt&&U.instanceColor!==null,instancingMorph:Bt&&U.morphTexture!==null,outputColorSpace:nt===null?e.outputColorSpace:nt.isXRRenderTarget===!0?nt.texture.colorSpace:br,alphaToCoverage:!!v.alphaToCoverage,map:Nt,matcap:We,envMap:jt,envMapMode:jt&&N.mapping,envMapCubeUVHeight:Q,aoMap:se,lightMap:ue,bumpMap:Wt,normalMap:Ce,displacementMap:P,emissiveMap:De,normalMapObjectSpace:Ce&&v.normalMapType===U_,normalMapTangentSpace:Ce&&v.normalMapType===D_,metalnessMap:ne,roughnessMap:pe,anisotropy:yt,anisotropyMap:X,clearcoat:A,clearcoatMap:_t,clearcoatNormalMap:it,clearcoatRoughnessMap:Pt,dispersion:_,iridescence:I,iridescenceMap:Dt,iridescenceThicknessMap:Z,sheen:q,sheenColorMap:tt,sheenRoughnessMap:vt,specularMap:Mt,specularColorMap:ht,specularIntensityMap:Xt,transmission:j,transmissionMap:L,thicknessMap:st,gradientMap:et,opaque:v.transparent===!1&&v.blending===gr&&v.alphaToCoverage===!1,alphaMap:pt,alphaTest:J,alphaHash:W,combine:v.combine,mapUv:Nt&&g(v.map.channel),aoMapUv:se&&g(v.aoMap.channel),lightMapUv:ue&&g(v.lightMap.channel),bumpMapUv:Wt&&g(v.bumpMap.channel),normalMapUv:Ce&&g(v.normalMap.channel),displacementMapUv:P&&g(v.displacementMap.channel),emissiveMapUv:De&&g(v.emissiveMap.channel),metalnessMapUv:ne&&g(v.metalnessMap.channel),roughnessMapUv:pe&&g(v.roughnessMap.channel),anisotropyMapUv:X&&g(v.anisotropyMap.channel),clearcoatMapUv:_t&&g(v.clearcoatMap.channel),clearcoatNormalMapUv:it&&g(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Pt&&g(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Dt&&g(v.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&g(v.iridescenceThicknessMap.channel),sheenColorMapUv:tt&&g(v.sheenColorMap.channel),sheenRoughnessMapUv:vt&&g(v.sheenRoughnessMap.channel),specularMapUv:Mt&&g(v.specularMap.channel),specularColorMapUv:ht&&g(v.specularColorMap.channel),specularIntensityMapUv:Xt&&g(v.specularIntensityMap.channel),transmissionMapUv:L&&g(v.transmissionMap.channel),thicknessMapUv:st&&g(v.thicknessMap.channel),alphaMapUv:pt&&g(v.alphaMap.channel),vertexTangents:!!Y.attributes.tangent&&(Ce||yt),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!Y.attributes.uv&&(Nt||pt),fog:!!V,useFog:v.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||Y.attributes.normal===void 0&&Ce===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:rt,skinning:U.isSkinnedMesh===!0,morphTargets:Y.morphAttributes.position!==void 0,morphNormals:Y.morphAttributes.normal!==void 0,morphColors:Y.morphAttributes.color!==void 0,morphTargetsCount:gt,morphTextureStride:dt,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:e.shadowMap.enabled&&k.length>0,shadowMapType:e.shadowMap.type,toneMapping:Ft,decodeVideoTexture:Nt&&v.map.isVideoTexture===!0&&Kt.getTransfer(v.map.colorSpace)===ae,decodeVideoTextureEmissive:De&&v.emissiveMap.isVideoTexture===!0&&Kt.getTransfer(v.emissiveMap.colorSpace)===ae,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Li,flipSided:v.side===gn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:xt&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(xt&&v.extensions.multiDraw===!0||It)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return me.vertexUv1s=c.has(1),me.vertexUv2s=c.has(2),me.vertexUv3s=c.has(3),c.clear(),me}function p(v){const E=[];if(v.shaderID?E.push(v.shaderID):(E.push(v.customVertexShaderID),E.push(v.customFragmentShaderID)),v.defines!==void 0)for(const k in v.defines)E.push(k),E.push(v.defines[k]);return v.isRawShaderMaterial===!1&&(f(E,v),S(E,v),E.push(e.outputColorSpace)),E.push(v.customProgramCacheKey),E.join()}function f(v,E){v.push(E.precision),v.push(E.outputColorSpace),v.push(E.envMapMode),v.push(E.envMapCubeUVHeight),v.push(E.mapUv),v.push(E.alphaMapUv),v.push(E.lightMapUv),v.push(E.aoMapUv),v.push(E.bumpMapUv),v.push(E.normalMapUv),v.push(E.displacementMapUv),v.push(E.emissiveMapUv),v.push(E.metalnessMapUv),v.push(E.roughnessMapUv),v.push(E.anisotropyMapUv),v.push(E.clearcoatMapUv),v.push(E.clearcoatNormalMapUv),v.push(E.clearcoatRoughnessMapUv),v.push(E.iridescenceMapUv),v.push(E.iridescenceThicknessMapUv),v.push(E.sheenColorMapUv),v.push(E.sheenRoughnessMapUv),v.push(E.specularMapUv),v.push(E.specularColorMapUv),v.push(E.specularIntensityMapUv),v.push(E.transmissionMapUv),v.push(E.thicknessMapUv),v.push(E.combine),v.push(E.fogExp2),v.push(E.sizeAttenuation),v.push(E.morphTargetsCount),v.push(E.morphAttributeCount),v.push(E.numDirLights),v.push(E.numPointLights),v.push(E.numSpotLights),v.push(E.numSpotLightMaps),v.push(E.numHemiLights),v.push(E.numRectAreaLights),v.push(E.numDirLightShadows),v.push(E.numPointLightShadows),v.push(E.numSpotLightShadows),v.push(E.numSpotLightShadowsWithMaps),v.push(E.numLightProbes),v.push(E.shadowMapType),v.push(E.toneMapping),v.push(E.numClippingPlanes),v.push(E.numClipIntersection),v.push(E.depthPacking)}function S(v,E){a.disableAll(),E.instancing&&a.enable(0),E.instancingColor&&a.enable(1),E.instancingMorph&&a.enable(2),E.matcap&&a.enable(3),E.envMap&&a.enable(4),E.normalMapObjectSpace&&a.enable(5),E.normalMapTangentSpace&&a.enable(6),E.clearcoat&&a.enable(7),E.iridescence&&a.enable(8),E.alphaTest&&a.enable(9),E.vertexColors&&a.enable(10),E.vertexAlphas&&a.enable(11),E.vertexUv1s&&a.enable(12),E.vertexUv2s&&a.enable(13),E.vertexUv3s&&a.enable(14),E.vertexTangents&&a.enable(15),E.anisotropy&&a.enable(16),E.alphaHash&&a.enable(17),E.batching&&a.enable(18),E.dispersion&&a.enable(19),E.batchingColor&&a.enable(20),E.gradientMap&&a.enable(21),v.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.reversedDepthBuffer&&a.enable(4),E.skinning&&a.enable(5),E.morphTargets&&a.enable(6),E.morphNormals&&a.enable(7),E.morphColors&&a.enable(8),E.premultipliedAlpha&&a.enable(9),E.shadowMapEnabled&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),E.decodeVideoTextureEmissive&&a.enable(20),E.alphaToCoverage&&a.enable(21),v.push(a.mask)}function T(v){const E=m[v.type];let k;if(E){const R=ci[E];k=M1.clone(R.uniforms)}else k=v.uniforms;return k}function y(v,E){let k=u.get(E);return k!==void 0?++k.usedTimes:(k=new W3(e,E,v,s),l.push(k),u.set(E,k)),k}function w(v){if(--v.usedTimes===0){const E=l.indexOf(v);l[E]=l[l.length-1],l.pop(),u.delete(v.cacheKey),v.destroy()}}function C(v){o.remove(v)}function b(){o.dispose()}return{getParameters:x,getProgramCacheKey:p,getUniforms:T,acquireProgram:y,releaseProgram:w,releaseShaderCache:C,programs:l,dispose:b}}function j3(){let e=new WeakMap;function t(a){return e.has(a)}function n(a){let o=e.get(a);return o===void 0&&(o={},e.set(a,o)),o}function i(a){e.delete(a)}function s(a,o,c){e.get(a)[o]=c}function r(){e=new WeakMap}return{has:t,get:n,remove:i,update:s,dispose:r}}function K3(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.material.id!==t.material.id?e.material.id-t.material.id:e.materialVariant!==t.materialVariant?e.materialVariant-t.materialVariant:e.z!==t.z?e.z-t.z:e.id-t.id}function yf(e,t){return e.groupOrder!==t.groupOrder?e.groupOrder-t.groupOrder:e.renderOrder!==t.renderOrder?e.renderOrder-t.renderOrder:e.z!==t.z?t.z-e.z:e.id-t.id}function Ef(){const e=[];let t=0;const n=[],i=[],s=[];function r(){t=0,n.length=0,i.length=0,s.length=0}function a(h){let m=0;return h.isInstancedMesh&&(m+=2),h.isSkinnedMesh&&(m+=1),m}function o(h,m,g,x,p,f){let S=e[t];return S===void 0?(S={id:h.id,object:h,geometry:m,material:g,materialVariant:a(h),groupOrder:x,renderOrder:h.renderOrder,z:p,group:f},e[t]=S):(S.id=h.id,S.object=h,S.geometry=m,S.material=g,S.materialVariant=a(h),S.groupOrder=x,S.renderOrder=h.renderOrder,S.z=p,S.group=f),t++,S}function c(h,m,g,x,p,f){const S=o(h,m,g,x,p,f);g.transmission>0?i.push(S):g.transparent===!0?s.push(S):n.push(S)}function l(h,m,g,x,p,f){const S=o(h,m,g,x,p,f);g.transmission>0?i.unshift(S):g.transparent===!0?s.unshift(S):n.unshift(S)}function u(h,m){n.length>1&&n.sort(h||K3),i.length>1&&i.sort(m||yf),s.length>1&&s.sort(m||yf)}function d(){for(let h=t,m=e.length;h<m;h++){const g=e[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:n,transmissive:i,transparent:s,init:r,push:c,unshift:l,finish:d,sort:u}}function Z3(){let e=new WeakMap;function t(i,s){const r=e.get(i);let a;return r===void 0?(a=new Ef,e.set(i,[a])):s>=r.length?(a=new Ef,r.push(a)):a=r[s],a}function n(){e=new WeakMap}return{get:t,dispose:n}}function J3(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={direction:new F,color:new ie};break;case"SpotLight":n={position:new F,direction:new F,color:new ie,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new F,color:new ie,distance:0,decay:0};break;case"HemisphereLight":n={direction:new F,skyColor:new ie,groundColor:new ie};break;case"RectAreaLight":n={color:new ie,position:new F,halfWidth:new F,halfHeight:new F};break}return e[t.id]=n,n}}}function Q3(){const e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new he,shadowCameraNear:1,shadowCameraFar:1e3};break}return e[t.id]=n,n}}}let tM=0;function eM(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+(t.map?1:0)-(e.map?1:0)}function nM(e){const t=new J3,n=Q3(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new F);const s=new F,r=new we,a=new we;function o(l){let u=0,d=0,h=0;for(let E=0;E<9;E++)i.probe[E].set(0,0,0);let m=0,g=0,x=0,p=0,f=0,S=0,T=0,y=0,w=0,C=0,b=0;l.sort(eM);for(let E=0,k=l.length;E<k;E++){const R=l[E],U=R.color,V=R.intensity,Y=R.distance;let z=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Er?z=R.shadow.map.texture:z=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)u+=U.r*V,d+=U.g*V,h+=U.b*V;else if(R.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(R.sh.coefficients[H],V);b++}else if(R.isDirectionalLight){const H=t.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const N=R.shadow,Q=n.get(R);Q.shadowIntensity=N.intensity,Q.shadowBias=N.bias,Q.shadowNormalBias=N.normalBias,Q.shadowRadius=N.radius,Q.shadowMapSize=N.mapSize,i.directionalShadow[m]=Q,i.directionalShadowMap[m]=z,i.directionalShadowMatrix[m]=R.shadow.matrix,S++}i.directional[m]=H,m++}else if(R.isSpotLight){const H=t.get(R);H.position.setFromMatrixPosition(R.matrixWorld),H.color.copy(U).multiplyScalar(V),H.distance=Y,H.coneCos=Math.cos(R.angle),H.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),H.decay=R.decay,i.spot[x]=H;const N=R.shadow;if(R.map&&(i.spotLightMap[w]=R.map,w++,N.updateMatrices(R),R.castShadow&&C++),i.spotLightMatrix[x]=N.matrix,R.castShadow){const Q=n.get(R);Q.shadowIntensity=N.intensity,Q.shadowBias=N.bias,Q.shadowNormalBias=N.normalBias,Q.shadowRadius=N.radius,Q.shadowMapSize=N.mapSize,i.spotShadow[x]=Q,i.spotShadowMap[x]=z,y++}x++}else if(R.isRectAreaLight){const H=t.get(R);H.color.copy(U).multiplyScalar(V),H.halfWidth.set(R.width*.5,0,0),H.halfHeight.set(0,R.height*.5,0),i.rectArea[p]=H,p++}else if(R.isPointLight){const H=t.get(R);if(H.color.copy(R.color).multiplyScalar(R.intensity),H.distance=R.distance,H.decay=R.decay,R.castShadow){const N=R.shadow,Q=n.get(R);Q.shadowIntensity=N.intensity,Q.shadowBias=N.bias,Q.shadowNormalBias=N.normalBias,Q.shadowRadius=N.radius,Q.shadowMapSize=N.mapSize,Q.shadowCameraNear=N.camera.near,Q.shadowCameraFar=N.camera.far,i.pointShadow[g]=Q,i.pointShadowMap[g]=z,i.pointShadowMatrix[g]=R.shadow.matrix,T++}i.point[g]=H,g++}else if(R.isHemisphereLight){const H=t.get(R);H.skyColor.copy(R.color).multiplyScalar(V),H.groundColor.copy(R.groundColor).multiplyScalar(V),i.hemi[f]=H,f++}}p>0&&(e.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=at.LTC_FLOAT_1,i.rectAreaLTC2=at.LTC_FLOAT_2):(i.rectAreaLTC1=at.LTC_HALF_1,i.rectAreaLTC2=at.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;const v=i.hash;(v.directionalLength!==m||v.pointLength!==g||v.spotLength!==x||v.rectAreaLength!==p||v.hemiLength!==f||v.numDirectionalShadows!==S||v.numPointShadows!==T||v.numSpotShadows!==y||v.numSpotMaps!==w||v.numLightProbes!==b)&&(i.directional.length=m,i.spot.length=x,i.rectArea.length=p,i.point.length=g,i.hemi.length=f,i.directionalShadow.length=S,i.directionalShadowMap.length=S,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=S,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=y+w-C,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=C,i.numLightProbes=b,v.directionalLength=m,v.pointLength=g,v.spotLength=x,v.rectAreaLength=p,v.hemiLength=f,v.numDirectionalShadows=S,v.numPointShadows=T,v.numSpotShadows=y,v.numSpotMaps=w,v.numLightProbes=b,i.version=tM++)}function c(l,u){let d=0,h=0,m=0,g=0,x=0;const p=u.matrixWorldInverse;for(let f=0,S=l.length;f<S;f++){const T=l[f];if(T.isDirectionalLight){const y=i.directional[d];y.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),d++}else if(T.isSpotLight){const y=i.spot[m];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(p),y.direction.setFromMatrixPosition(T.matrixWorld),s.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(p),m++}else if(T.isRectAreaLight){const y=i.rectArea[g];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(p),a.identity(),r.copy(T.matrixWorld),r.premultiply(p),a.extractRotation(r),y.halfWidth.set(T.width*.5,0,0),y.halfHeight.set(0,T.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(T.isPointLight){const y=i.point[h];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(p),h++}else if(T.isHemisphereLight){const y=i.hemi[x];y.direction.setFromMatrixPosition(T.matrixWorld),y.direction.transformDirection(p),x++}}}return{setup:o,setupView:c,state:i}}function bf(e){const t=new nM(e),n=[],i=[];function s(u){l.camera=u,n.length=0,i.length=0}function r(u){n.push(u)}function a(u){i.push(u)}function o(){t.setup(n)}function c(u){t.setupView(n,u)}const l={lightsArray:n,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function iM(e){let t=new WeakMap;function n(s,r=0){const a=t.get(s);let o;return a===void 0?(o=new bf(e),t.set(s,[o])):r>=a.length?(o=new bf(e),a.push(o)):o=a[r],o}function i(){t=new WeakMap}return{get:n,dispose:i}}const sM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,rM=`uniform sampler2D shadow_pass;
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
}`,aM=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],oM=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],Af=new we,ua=new F,Al=new F;function cM(e,t,n){let i=new xm;const s=new he,r=new he,a=new Ie,o=new b1,c=new A1,l={},u=n.maxTextureSize,d={[us]:gn,[gn]:us,[Li]:Li},h=new _i({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new he},radius:{value:4}},vertexShader:sM,fragmentShader:rM}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const g=new on;g.setAttribute("position",new an(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const x=new Tn(g,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Io;let f=this.type;this.render=function(C,b,v){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||C.length===0)return;this.type===h_&&(Ut("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=Io);const E=e.getRenderTarget(),k=e.getActiveCubeFace(),R=e.getActiveMipmapLevel(),U=e.state;U.setBlending(Ui),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const V=f!==this.type;V&&b.traverse(function(Y){Y.material&&(Array.isArray(Y.material)?Y.material.forEach(z=>z.needsUpdate=!0):Y.material.needsUpdate=!0)});for(let Y=0,z=C.length;Y<z;Y++){const H=C[Y],N=H.shadow;if(N===void 0){Ut("WebGLShadowMap:",H,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;s.copy(N.mapSize);const Q=N.getFrameExtents();s.multiply(Q),r.copy(N.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/Q.x),s.x=r.x*Q.x,N.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/Q.y),s.y=r.y*Q.y,N.mapSize.y=r.y));const K=e.state.buffers.depth.getReversed();if(N.camera._reversedDepth=K,N.map===null||V===!0){if(N.map!==null&&(N.map.depthTexture!==null&&(N.map.depthTexture.dispose(),N.map.depthTexture=null),N.map.dispose()),this.type===pa){if(H.isPointLight){Ut("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}N.map=new fi(s.x,s.y,{format:Er,type:Oi,minFilter:je,magFilter:je,generateMipmaps:!1}),N.map.texture.name=H.name+".shadowMap",N.map.depthTexture=new Aa(s.x,s.y,li),N.map.depthTexture.name=H.name+".shadowMapDepth",N.map.depthTexture.format=Bi,N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Ze,N.map.depthTexture.magFilter=Ze}else H.isPointLight?(N.map=new wm(s.x),N.map.depthTexture=new v1(s.x,gi)):(N.map=new fi(s.x,s.y),N.map.depthTexture=new Aa(s.x,s.y,gi)),N.map.depthTexture.name=H.name+".shadowMap",N.map.depthTexture.format=Bi,this.type===Io?(N.map.depthTexture.compareFunction=K?hu:lu,N.map.depthTexture.minFilter=je,N.map.depthTexture.magFilter=je):(N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=Ze,N.map.depthTexture.magFilter=Ze);N.camera.updateProjectionMatrix()}const lt=N.map.isWebGLCubeRenderTarget?6:1;for(let gt=0;gt<lt;gt++){if(N.map.isWebGLCubeRenderTarget)e.setRenderTarget(N.map,gt),e.clear();else{gt===0&&(e.setRenderTarget(N.map),e.clear());const dt=N.getViewport(gt);a.set(r.x*dt.x,r.y*dt.y,r.x*dt.z,r.y*dt.w),U.viewport(a)}if(H.isPointLight){const dt=N.camera,Vt=N.matrix,_e=H.distance||dt.far;_e!==dt.far&&(dt.far=_e,dt.updateProjectionMatrix()),ua.setFromMatrixPosition(H.matrixWorld),dt.position.copy(ua),Al.copy(dt.position),Al.add(aM[gt]),dt.up.copy(oM[gt]),dt.lookAt(Al),dt.updateMatrixWorld(),Vt.makeTranslation(-ua.x,-ua.y,-ua.z),Af.multiplyMatrices(dt.projectionMatrix,dt.matrixWorldInverse),N._frustum.setFromProjectionMatrix(Af,dt.coordinateSystem,dt.reversedDepth)}else N.updateMatrices(H);i=N.getFrustum(),y(b,v,N.camera,H,this.type)}N.isPointLightShadow!==!0&&this.type===pa&&S(N,v),N.needsUpdate=!1}f=this.type,p.needsUpdate=!1,e.setRenderTarget(E,k,R)};function S(C,b){const v=t.update(x);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,m.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new fi(s.x,s.y,{format:Er,type:Oi})),h.uniforms.shadow_pass.value=C.map.depthTexture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,e.setRenderTarget(C.mapPass),e.clear(),e.renderBufferDirect(b,null,v,h,x,null),m.uniforms.shadow_pass.value=C.mapPass.texture,m.uniforms.resolution.value=C.mapSize,m.uniforms.radius.value=C.radius,e.setRenderTarget(C.map),e.clear(),e.renderBufferDirect(b,null,v,m,x,null)}function T(C,b,v,E){let k=null;const R=v.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(R!==void 0)k=R;else if(k=v.isPointLight===!0?c:o,e.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0||b.alphaToCoverage===!0){const U=k.uuid,V=b.uuid;let Y=l[U];Y===void 0&&(Y={},l[U]=Y);let z=Y[V];z===void 0&&(z=k.clone(),Y[V]=z,b.addEventListener("dispose",w)),k=z}if(k.visible=b.visible,k.wireframe=b.wireframe,E===pa?k.side=b.shadowSide!==null?b.shadowSide:b.side:k.side=b.shadowSide!==null?b.shadowSide:d[b.side],k.alphaMap=b.alphaMap,k.alphaTest=b.alphaToCoverage===!0?.5:b.alphaTest,k.map=b.map,k.clipShadows=b.clipShadows,k.clippingPlanes=b.clippingPlanes,k.clipIntersection=b.clipIntersection,k.displacementMap=b.displacementMap,k.displacementScale=b.displacementScale,k.displacementBias=b.displacementBias,k.wireframeLinewidth=b.wireframeLinewidth,k.linewidth=b.linewidth,v.isPointLight===!0&&k.isMeshDistanceMaterial===!0){const U=e.properties.get(k);U.light=v}return k}function y(C,b,v,E,k){if(C.visible===!1)return;if(C.layers.test(b.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&k===pa)&&(!C.frustumCulled||i.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,C.matrixWorld);const V=t.update(C),Y=C.material;if(Array.isArray(Y)){const z=V.groups;for(let H=0,N=z.length;H<N;H++){const Q=z[H],K=Y[Q.materialIndex];if(K&&K.visible){const lt=T(C,K,E,k);C.onBeforeShadow(e,C,b,v,V,lt,Q),e.renderBufferDirect(v,null,V,lt,C,Q),C.onAfterShadow(e,C,b,v,V,lt,Q)}}}else if(Y.visible){const z=T(C,Y,E,k);C.onBeforeShadow(e,C,b,v,V,z,null),e.renderBufferDirect(v,null,V,z,C,null),C.onAfterShadow(e,C,b,v,V,z,null)}}const U=C.children;for(let V=0,Y=U.length;V<Y;V++)y(U[V],b,v,E,k)}function w(C){C.target.removeEventListener("dispose",w);for(const v in l){const E=l[v],k=C.target.uuid;k in E&&(E[k].dispose(),delete E[k])}}}function lM(e,t){function n(){let L=!1;const st=new Ie;let et=null;const pt=new Ie(0,0,0,0);return{setMask:function(J){et!==J&&!L&&(e.colorMask(J,J,J,J),et=J)},setLocked:function(J){L=J},setClear:function(J,W,xt,Ft,me){me===!0&&(J*=Ft,W*=Ft,xt*=Ft),st.set(J,W,xt,Ft),pt.equals(st)===!1&&(e.clearColor(J,W,xt,Ft),pt.copy(st))},reset:function(){L=!1,et=null,pt.set(-1,0,0,0)}}}function i(){let L=!1,st=!1,et=null,pt=null,J=null;return{setReversed:function(W){if(st!==W){const xt=t.get("EXT_clip_control");W?xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.ZERO_TO_ONE_EXT):xt.clipControlEXT(xt.LOWER_LEFT_EXT,xt.NEGATIVE_ONE_TO_ONE_EXT),st=W;const Ft=J;J=null,this.setClear(Ft)}},getReversed:function(){return st},setTest:function(W){W?nt(e.DEPTH_TEST):rt(e.DEPTH_TEST)},setMask:function(W){et!==W&&!L&&(e.depthMask(W),et=W)},setFunc:function(W){if(st&&(W=W_[W]),pt!==W){switch(W){case Gl:e.depthFunc(e.NEVER);break;case Hl:e.depthFunc(e.ALWAYS);break;case Wl:e.depthFunc(e.LESS);break;case Sr:e.depthFunc(e.LEQUAL);break;case Xl:e.depthFunc(e.EQUAL);break;case Yl:e.depthFunc(e.GEQUAL);break;case ql:e.depthFunc(e.GREATER);break;case $l:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}pt=W}},setLocked:function(W){L=W},setClear:function(W){J!==W&&(J=W,st&&(W=1-W),e.clearDepth(W))},reset:function(){L=!1,et=null,pt=null,J=null,st=!1}}}function s(){let L=!1,st=null,et=null,pt=null,J=null,W=null,xt=null,Ft=null,me=null;return{setTest:function(re){L||(re?nt(e.STENCIL_TEST):rt(e.STENCIL_TEST))},setMask:function(re){st!==re&&!L&&(e.stencilMask(re),st=re)},setFunc:function(re,bi,Ai){(et!==re||pt!==bi||J!==Ai)&&(e.stencilFunc(re,bi,Ai),et=re,pt=bi,J=Ai)},setOp:function(re,bi,Ai){(W!==re||xt!==bi||Ft!==Ai)&&(e.stencilOp(re,bi,Ai),W=re,xt=bi,Ft=Ai)},setLocked:function(re){L=re},setClear:function(re){me!==re&&(e.clearStencil(re),me=re)},reset:function(){L=!1,st=null,et=null,pt=null,J=null,W=null,xt=null,Ft=null,me=null}}}const r=new n,a=new i,o=new s,c=new WeakMap,l=new WeakMap;let u={},d={},h=new WeakMap,m=[],g=null,x=!1,p=null,f=null,S=null,T=null,y=null,w=null,C=null,b=new ie(0,0,0),v=0,E=!1,k=null,R=null,U=null,V=null,Y=null;const z=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,N=0;const Q=e.getParameter(e.VERSION);Q.indexOf("WebGL")!==-1?(N=parseFloat(/^WebGL (\d)/.exec(Q)[1]),H=N>=1):Q.indexOf("OpenGL ES")!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),H=N>=2);let K=null,lt={};const gt=e.getParameter(e.SCISSOR_BOX),dt=e.getParameter(e.VIEWPORT),Vt=new Ie().fromArray(gt),_e=new Ie().fromArray(dt);function ge(L,st,et,pt){const J=new Uint8Array(4),W=e.createTexture();e.bindTexture(L,W),e.texParameteri(L,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(L,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let xt=0;xt<et;xt++)L===e.TEXTURE_3D||L===e.TEXTURE_2D_ARRAY?e.texImage3D(st,0,e.RGBA,1,1,pt,0,e.RGBA,e.UNSIGNED_BYTE,J):e.texImage2D(st+xt,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,J);return W}const $={};$[e.TEXTURE_2D]=ge(e.TEXTURE_2D,e.TEXTURE_2D,1),$[e.TEXTURE_CUBE_MAP]=ge(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[e.TEXTURE_2D_ARRAY]=ge(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),$[e.TEXTURE_3D]=ge(e.TEXTURE_3D,e.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),nt(e.DEPTH_TEST),a.setFunc(Sr),Wt(!1),Ce(Ad),nt(e.CULL_FACE),se(Ui);function nt(L){u[L]!==!0&&(e.enable(L),u[L]=!0)}function rt(L){u[L]!==!1&&(e.disable(L),u[L]=!1)}function Bt(L,st){return d[L]!==st?(e.bindFramebuffer(L,st),d[L]=st,L===e.DRAW_FRAMEBUFFER&&(d[e.FRAMEBUFFER]=st),L===e.FRAMEBUFFER&&(d[e.DRAW_FRAMEBUFFER]=st),!0):!1}function It(L,st){let et=m,pt=!1;if(L){et=h.get(st),et===void 0&&(et=[],h.set(st,et));const J=L.textures;if(et.length!==J.length||et[0]!==e.COLOR_ATTACHMENT0){for(let W=0,xt=J.length;W<xt;W++)et[W]=e.COLOR_ATTACHMENT0+W;et.length=J.length,pt=!0}}else et[0]!==e.BACK&&(et[0]=e.BACK,pt=!0);pt&&e.drawBuffers(et)}function Nt(L){return g!==L?(e.useProgram(L),g=L,!0):!1}const We={[Cs]:e.FUNC_ADD,[d_]:e.FUNC_SUBTRACT,[f_]:e.FUNC_REVERSE_SUBTRACT};We[p_]=e.MIN,We[m_]=e.MAX;const jt={[g_]:e.ZERO,[__]:e.ONE,[v_]:e.SRC_COLOR,[zl]:e.SRC_ALPHA,[b_]:e.SRC_ALPHA_SATURATE,[y_]:e.DST_COLOR,[M_]:e.DST_ALPHA,[x_]:e.ONE_MINUS_SRC_COLOR,[Vl]:e.ONE_MINUS_SRC_ALPHA,[E_]:e.ONE_MINUS_DST_COLOR,[S_]:e.ONE_MINUS_DST_ALPHA,[A_]:e.CONSTANT_COLOR,[T_]:e.ONE_MINUS_CONSTANT_COLOR,[w_]:e.CONSTANT_ALPHA,[R_]:e.ONE_MINUS_CONSTANT_ALPHA};function se(L,st,et,pt,J,W,xt,Ft,me,re){if(L===Ui){x===!0&&(rt(e.BLEND),x=!1);return}if(x===!1&&(nt(e.BLEND),x=!0),L!==u_){if(L!==p||re!==E){if((f!==Cs||y!==Cs)&&(e.blendEquation(e.FUNC_ADD),f=Cs,y=Cs),re)switch(L){case gr:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case mi:e.blendFunc(e.ONE,e.ONE);break;case Td:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case wd:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:Qt("WebGLState: Invalid blending: ",L);break}else switch(L){case gr:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case mi:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case Td:Qt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case wd:Qt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Qt("WebGLState: Invalid blending: ",L);break}S=null,T=null,w=null,C=null,b.set(0,0,0),v=0,p=L,E=re}return}J=J||st,W=W||et,xt=xt||pt,(st!==f||J!==y)&&(e.blendEquationSeparate(We[st],We[J]),f=st,y=J),(et!==S||pt!==T||W!==w||xt!==C)&&(e.blendFuncSeparate(jt[et],jt[pt],jt[W],jt[xt]),S=et,T=pt,w=W,C=xt),(Ft.equals(b)===!1||me!==v)&&(e.blendColor(Ft.r,Ft.g,Ft.b,me),b.copy(Ft),v=me),p=L,E=!1}function ue(L,st){L.side===Li?rt(e.CULL_FACE):nt(e.CULL_FACE);let et=L.side===gn;st&&(et=!et),Wt(et),L.blending===gr&&L.transparent===!1?se(Ui):se(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);const pt=L.stencilWrite;o.setTest(pt),pt&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),De(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?nt(e.SAMPLE_ALPHA_TO_COVERAGE):rt(e.SAMPLE_ALPHA_TO_COVERAGE)}function Wt(L){k!==L&&(L?e.frontFace(e.CW):e.frontFace(e.CCW),k=L)}function Ce(L){L!==c_?(nt(e.CULL_FACE),L!==R&&(L===Ad?e.cullFace(e.BACK):L===l_?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))):rt(e.CULL_FACE),R=L}function P(L){L!==U&&(H&&e.lineWidth(L),U=L)}function De(L,st,et){L?(nt(e.POLYGON_OFFSET_FILL),(V!==st||Y!==et)&&(V=st,Y=et,a.getReversed()&&(st=-st),e.polygonOffset(st,et))):rt(e.POLYGON_OFFSET_FILL)}function ne(L){L?nt(e.SCISSOR_TEST):rt(e.SCISSOR_TEST)}function pe(L){L===void 0&&(L=e.TEXTURE0+z-1),K!==L&&(e.activeTexture(L),K=L)}function yt(L,st,et){et===void 0&&(K===null?et=e.TEXTURE0+z-1:et=K);let pt=lt[et];pt===void 0&&(pt={type:void 0,texture:void 0},lt[et]=pt),(pt.type!==L||pt.texture!==st)&&(K!==et&&(e.activeTexture(et),K=et),e.bindTexture(L,st||$[L]),pt.type=L,pt.texture=st)}function A(){const L=lt[K];L!==void 0&&L.type!==void 0&&(e.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function _(){try{e.compressedTexImage2D(...arguments)}catch(L){Qt("WebGLState:",L)}}function I(){try{e.compressedTexImage3D(...arguments)}catch(L){Qt("WebGLState:",L)}}function q(){try{e.texSubImage2D(...arguments)}catch(L){Qt("WebGLState:",L)}}function j(){try{e.texSubImage3D(...arguments)}catch(L){Qt("WebGLState:",L)}}function X(){try{e.compressedTexSubImage2D(...arguments)}catch(L){Qt("WebGLState:",L)}}function _t(){try{e.compressedTexSubImage3D(...arguments)}catch(L){Qt("WebGLState:",L)}}function it(){try{e.texStorage2D(...arguments)}catch(L){Qt("WebGLState:",L)}}function Pt(){try{e.texStorage3D(...arguments)}catch(L){Qt("WebGLState:",L)}}function Dt(){try{e.texImage2D(...arguments)}catch(L){Qt("WebGLState:",L)}}function Z(){try{e.texImage3D(...arguments)}catch(L){Qt("WebGLState:",L)}}function tt(L){Vt.equals(L)===!1&&(e.scissor(L.x,L.y,L.z,L.w),Vt.copy(L))}function vt(L){_e.equals(L)===!1&&(e.viewport(L.x,L.y,L.z,L.w),_e.copy(L))}function Mt(L,st){let et=l.get(st);et===void 0&&(et=new WeakMap,l.set(st,et));let pt=et.get(L);pt===void 0&&(pt=e.getUniformBlockIndex(st,L.name),et.set(L,pt))}function ht(L,st){const pt=l.get(st).get(L);c.get(st)!==pt&&(e.uniformBlockBinding(st,pt,L.__bindingPointIndex),c.set(st,pt))}function Xt(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),a.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),u={},K=null,lt={},d={},h=new WeakMap,m=[],g=null,x=!1,p=null,f=null,S=null,T=null,y=null,w=null,C=null,b=new ie(0,0,0),v=0,E=!1,k=null,R=null,U=null,V=null,Y=null,Vt.set(0,0,e.canvas.width,e.canvas.height),_e.set(0,0,e.canvas.width,e.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:nt,disable:rt,bindFramebuffer:Bt,drawBuffers:It,useProgram:Nt,setBlending:se,setMaterial:ue,setFlipSided:Wt,setCullFace:Ce,setLineWidth:P,setPolygonOffset:De,setScissorTest:ne,activeTexture:pe,bindTexture:yt,unbindTexture:A,compressedTexImage2D:_,compressedTexImage3D:I,texImage2D:Dt,texImage3D:Z,updateUBOMapping:Mt,uniformBlockBinding:ht,texStorage2D:it,texStorage3D:Pt,texSubImage2D:q,texSubImage3D:j,compressedTexSubImage2D:X,compressedTexSubImage3D:_t,scissor:tt,viewport:vt,reset:Xt}}function hM(e,t,n,i,s,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new he,u=new WeakMap;let d;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(A,_){return m?new OffscreenCanvas(A,_):Ko("canvas")}function x(A,_,I){let q=1;const j=yt(A);if((j.width>I||j.height>I)&&(q=I/Math.max(j.width,j.height)),q<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const X=Math.floor(q*j.width),_t=Math.floor(q*j.height);d===void 0&&(d=g(X,_t));const it=_?g(X,_t):d;return it.width=X,it.height=_t,it.getContext("2d").drawImage(A,0,0,X,_t),Ut("WebGLRenderer: Texture has been resized from ("+j.width+"x"+j.height+") to ("+X+"x"+_t+")."),it}else return"data"in A&&Ut("WebGLRenderer: Image in DataTexture is too big ("+j.width+"x"+j.height+")."),A;return A}function p(A){return A.generateMipmaps}function f(A){e.generateMipmap(A)}function S(A){return A.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?e.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function T(A,_,I,q,j=!1){if(A!==null){if(e[A]!==void 0)return e[A];Ut("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let X=_;if(_===e.RED&&(I===e.FLOAT&&(X=e.R32F),I===e.HALF_FLOAT&&(X=e.R16F),I===e.UNSIGNED_BYTE&&(X=e.R8)),_===e.RED_INTEGER&&(I===e.UNSIGNED_BYTE&&(X=e.R8UI),I===e.UNSIGNED_SHORT&&(X=e.R16UI),I===e.UNSIGNED_INT&&(X=e.R32UI),I===e.BYTE&&(X=e.R8I),I===e.SHORT&&(X=e.R16I),I===e.INT&&(X=e.R32I)),_===e.RG&&(I===e.FLOAT&&(X=e.RG32F),I===e.HALF_FLOAT&&(X=e.RG16F),I===e.UNSIGNED_BYTE&&(X=e.RG8)),_===e.RG_INTEGER&&(I===e.UNSIGNED_BYTE&&(X=e.RG8UI),I===e.UNSIGNED_SHORT&&(X=e.RG16UI),I===e.UNSIGNED_INT&&(X=e.RG32UI),I===e.BYTE&&(X=e.RG8I),I===e.SHORT&&(X=e.RG16I),I===e.INT&&(X=e.RG32I)),_===e.RGB_INTEGER&&(I===e.UNSIGNED_BYTE&&(X=e.RGB8UI),I===e.UNSIGNED_SHORT&&(X=e.RGB16UI),I===e.UNSIGNED_INT&&(X=e.RGB32UI),I===e.BYTE&&(X=e.RGB8I),I===e.SHORT&&(X=e.RGB16I),I===e.INT&&(X=e.RGB32I)),_===e.RGBA_INTEGER&&(I===e.UNSIGNED_BYTE&&(X=e.RGBA8UI),I===e.UNSIGNED_SHORT&&(X=e.RGBA16UI),I===e.UNSIGNED_INT&&(X=e.RGBA32UI),I===e.BYTE&&(X=e.RGBA8I),I===e.SHORT&&(X=e.RGBA16I),I===e.INT&&(X=e.RGBA32I)),_===e.RGB&&(I===e.UNSIGNED_INT_5_9_9_9_REV&&(X=e.RGB9_E5),I===e.UNSIGNED_INT_10F_11F_11F_REV&&(X=e.R11F_G11F_B10F)),_===e.RGBA){const _t=j?$o:Kt.getTransfer(q);I===e.FLOAT&&(X=e.RGBA32F),I===e.HALF_FLOAT&&(X=e.RGBA16F),I===e.UNSIGNED_BYTE&&(X=_t===ae?e.SRGB8_ALPHA8:e.RGBA8),I===e.UNSIGNED_SHORT_4_4_4_4&&(X=e.RGBA4),I===e.UNSIGNED_SHORT_5_5_5_1&&(X=e.RGB5_A1)}return(X===e.R16F||X===e.R32F||X===e.RG16F||X===e.RG32F||X===e.RGBA16F||X===e.RGBA32F)&&t.get("EXT_color_buffer_float"),X}function y(A,_){let I;return A?_===null||_===gi||_===ba?I=e.DEPTH24_STENCIL8:_===li?I=e.DEPTH32F_STENCIL8:_===Ea&&(I=e.DEPTH24_STENCIL8,Ut("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===gi||_===ba?I=e.DEPTH_COMPONENT24:_===li?I=e.DEPTH_COMPONENT32F:_===Ea&&(I=e.DEPTH_COMPONENT16),I}function w(A,_){return p(A)===!0||A.isFramebufferTexture&&A.minFilter!==Ze&&A.minFilter!==je?Math.log2(Math.max(_.width,_.height))+1:A.mipmaps!==void 0&&A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?_.mipmaps.length:1}function C(A){const _=A.target;_.removeEventListener("dispose",C),v(_),_.isVideoTexture&&u.delete(_)}function b(A){const _=A.target;_.removeEventListener("dispose",b),k(_)}function v(A){const _=i.get(A);if(_.__webglInit===void 0)return;const I=A.source,q=h.get(I);if(q){const j=q[_.__cacheKey];j.usedTimes--,j.usedTimes===0&&E(A),Object.keys(q).length===0&&h.delete(I)}i.remove(A)}function E(A){const _=i.get(A);e.deleteTexture(_.__webglTexture);const I=A.source,q=h.get(I);delete q[_.__cacheKey],a.memory.textures--}function k(A){const _=i.get(A);if(A.depthTexture&&(A.depthTexture.dispose(),i.remove(A.depthTexture)),A.isWebGLCubeRenderTarget)for(let q=0;q<6;q++){if(Array.isArray(_.__webglFramebuffer[q]))for(let j=0;j<_.__webglFramebuffer[q].length;j++)e.deleteFramebuffer(_.__webglFramebuffer[q][j]);else e.deleteFramebuffer(_.__webglFramebuffer[q]);_.__webglDepthbuffer&&e.deleteRenderbuffer(_.__webglDepthbuffer[q])}else{if(Array.isArray(_.__webglFramebuffer))for(let q=0;q<_.__webglFramebuffer.length;q++)e.deleteFramebuffer(_.__webglFramebuffer[q]);else e.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&e.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&e.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let q=0;q<_.__webglColorRenderbuffer.length;q++)_.__webglColorRenderbuffer[q]&&e.deleteRenderbuffer(_.__webglColorRenderbuffer[q]);_.__webglDepthRenderbuffer&&e.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const I=A.textures;for(let q=0,j=I.length;q<j;q++){const X=i.get(I[q]);X.__webglTexture&&(e.deleteTexture(X.__webglTexture),a.memory.textures--),i.remove(I[q])}i.remove(A)}let R=0;function U(){R=0}function V(){const A=R;return A>=s.maxTextures&&Ut("WebGLTextures: Trying to use "+A+" texture units while this GPU supports only "+s.maxTextures),R+=1,A}function Y(A){const _=[];return _.push(A.wrapS),_.push(A.wrapT),_.push(A.wrapR||0),_.push(A.magFilter),_.push(A.minFilter),_.push(A.anisotropy),_.push(A.internalFormat),_.push(A.format),_.push(A.type),_.push(A.generateMipmaps),_.push(A.premultiplyAlpha),_.push(A.flipY),_.push(A.unpackAlignment),_.push(A.colorSpace),_.join()}function z(A,_){const I=i.get(A);if(A.isVideoTexture&&ne(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&I.__version!==A.version){const q=A.image;if(q===null)Ut("WebGLRenderer: Texture marked for update but no image data found.");else if(q.complete===!1)Ut("WebGLRenderer: Texture marked for update but image is incomplete");else{$(I,A,_);return}}else A.isExternalTexture&&(I.__webglTexture=A.sourceTexture?A.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,I.__webglTexture,e.TEXTURE0+_)}function H(A,_){const I=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&I.__version!==A.version){$(I,A,_);return}else A.isExternalTexture&&(I.__webglTexture=A.sourceTexture?A.sourceTexture:null);n.bindTexture(e.TEXTURE_2D_ARRAY,I.__webglTexture,e.TEXTURE0+_)}function N(A,_){const I=i.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&I.__version!==A.version){$(I,A,_);return}n.bindTexture(e.TEXTURE_3D,I.__webglTexture,e.TEXTURE0+_)}function Q(A,_){const I=i.get(A);if(A.isCubeDepthTexture!==!0&&A.version>0&&I.__version!==A.version){nt(I,A,_);return}n.bindTexture(e.TEXTURE_CUBE_MAP,I.__webglTexture,e.TEXTURE0+_)}const K={[jl]:e.REPEAT,[Di]:e.CLAMP_TO_EDGE,[Kl]:e.MIRRORED_REPEAT},lt={[Ze]:e.NEAREST,[L_]:e.NEAREST_MIPMAP_NEAREST,[$a]:e.NEAREST_MIPMAP_LINEAR,[je]:e.LINEAR,[$c]:e.LINEAR_MIPMAP_NEAREST,[Is]:e.LINEAR_MIPMAP_LINEAR},gt={[N_]:e.NEVER,[z_]:e.ALWAYS,[F_]:e.LESS,[lu]:e.LEQUAL,[O_]:e.EQUAL,[hu]:e.GEQUAL,[B_]:e.GREATER,[k_]:e.NOTEQUAL};function dt(A,_){if(_.type===li&&t.has("OES_texture_float_linear")===!1&&(_.magFilter===je||_.magFilter===$c||_.magFilter===$a||_.magFilter===Is||_.minFilter===je||_.minFilter===$c||_.minFilter===$a||_.minFilter===Is)&&Ut("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),e.texParameteri(A,e.TEXTURE_WRAP_S,K[_.wrapS]),e.texParameteri(A,e.TEXTURE_WRAP_T,K[_.wrapT]),(A===e.TEXTURE_3D||A===e.TEXTURE_2D_ARRAY)&&e.texParameteri(A,e.TEXTURE_WRAP_R,K[_.wrapR]),e.texParameteri(A,e.TEXTURE_MAG_FILTER,lt[_.magFilter]),e.texParameteri(A,e.TEXTURE_MIN_FILTER,lt[_.minFilter]),_.compareFunction&&(e.texParameteri(A,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(A,e.TEXTURE_COMPARE_FUNC,gt[_.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Ze||_.minFilter!==$a&&_.minFilter!==Is||_.type===li&&t.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){const I=t.get("EXT_texture_filter_anisotropic");e.texParameterf(A,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function Vt(A,_){let I=!1;A.__webglInit===void 0&&(A.__webglInit=!0,_.addEventListener("dispose",C));const q=_.source;let j=h.get(q);j===void 0&&(j={},h.set(q,j));const X=Y(_);if(X!==A.__cacheKey){j[X]===void 0&&(j[X]={texture:e.createTexture(),usedTimes:0},a.memory.textures++,I=!0),j[X].usedTimes++;const _t=j[A.__cacheKey];_t!==void 0&&(j[A.__cacheKey].usedTimes--,_t.usedTimes===0&&E(_)),A.__cacheKey=X,A.__webglTexture=j[X].texture}return I}function _e(A,_,I){return Math.floor(Math.floor(A/I)/_)}function ge(A,_,I,q){const X=A.updateRanges;if(X.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,_.width,_.height,I,q,_.data);else{X.sort((Z,tt)=>Z.start-tt.start);let _t=0;for(let Z=1;Z<X.length;Z++){const tt=X[_t],vt=X[Z],Mt=tt.start+tt.count,ht=_e(vt.start,_.width,4),Xt=_e(tt.start,_.width,4);vt.start<=Mt+1&&ht===Xt&&_e(vt.start+vt.count-1,_.width,4)===ht?tt.count=Math.max(tt.count,vt.start+vt.count-tt.start):(++_t,X[_t]=vt)}X.length=_t+1;const it=e.getParameter(e.UNPACK_ROW_LENGTH),Pt=e.getParameter(e.UNPACK_SKIP_PIXELS),Dt=e.getParameter(e.UNPACK_SKIP_ROWS);e.pixelStorei(e.UNPACK_ROW_LENGTH,_.width);for(let Z=0,tt=X.length;Z<tt;Z++){const vt=X[Z],Mt=Math.floor(vt.start/4),ht=Math.ceil(vt.count/4),Xt=Mt%_.width,L=Math.floor(Mt/_.width),st=ht,et=1;e.pixelStorei(e.UNPACK_SKIP_PIXELS,Xt),e.pixelStorei(e.UNPACK_SKIP_ROWS,L),n.texSubImage2D(e.TEXTURE_2D,0,Xt,L,st,et,I,q,_.data)}A.clearUpdateRanges(),e.pixelStorei(e.UNPACK_ROW_LENGTH,it),e.pixelStorei(e.UNPACK_SKIP_PIXELS,Pt),e.pixelStorei(e.UNPACK_SKIP_ROWS,Dt)}}function $(A,_,I){let q=e.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(q=e.TEXTURE_2D_ARRAY),_.isData3DTexture&&(q=e.TEXTURE_3D);const j=Vt(A,_),X=_.source;n.bindTexture(q,A.__webglTexture,e.TEXTURE0+I);const _t=i.get(X);if(X.version!==_t.__version||j===!0){n.activeTexture(e.TEXTURE0+I);const it=Kt.getPrimaries(Kt.workingColorSpace),Pt=_.colorSpace===is?null:Kt.getPrimaries(_.colorSpace),Dt=_.colorSpace===is||it===Pt?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt);let Z=x(_.image,!1,s.maxTextureSize);Z=pe(_,Z);const tt=r.convert(_.format,_.colorSpace),vt=r.convert(_.type);let Mt=T(_.internalFormat,tt,vt,_.colorSpace,_.isVideoTexture);dt(q,_);let ht;const Xt=_.mipmaps,L=_.isVideoTexture!==!0,st=_t.__version===void 0||j===!0,et=X.dataReady,pt=w(_,Z);if(_.isDepthTexture)Mt=y(_.format===Ds,_.type),st&&(L?n.texStorage2D(e.TEXTURE_2D,1,Mt,Z.width,Z.height):n.texImage2D(e.TEXTURE_2D,0,Mt,Z.width,Z.height,0,tt,vt,null));else if(_.isDataTexture)if(Xt.length>0){L&&st&&n.texStorage2D(e.TEXTURE_2D,pt,Mt,Xt[0].width,Xt[0].height);for(let J=0,W=Xt.length;J<W;J++)ht=Xt[J],L?et&&n.texSubImage2D(e.TEXTURE_2D,J,0,0,ht.width,ht.height,tt,vt,ht.data):n.texImage2D(e.TEXTURE_2D,J,Mt,ht.width,ht.height,0,tt,vt,ht.data);_.generateMipmaps=!1}else L?(st&&n.texStorage2D(e.TEXTURE_2D,pt,Mt,Z.width,Z.height),et&&ge(_,Z,tt,vt)):n.texImage2D(e.TEXTURE_2D,0,Mt,Z.width,Z.height,0,tt,vt,Z.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){L&&st&&n.texStorage3D(e.TEXTURE_2D_ARRAY,pt,Mt,Xt[0].width,Xt[0].height,Z.depth);for(let J=0,W=Xt.length;J<W;J++)if(ht=Xt[J],_.format!==jn)if(tt!==null)if(L){if(et)if(_.layerUpdates.size>0){const xt=ef(ht.width,ht.height,_.format,_.type);for(const Ft of _.layerUpdates){const me=ht.data.subarray(Ft*xt/ht.data.BYTES_PER_ELEMENT,(Ft+1)*xt/ht.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,J,0,0,Ft,ht.width,ht.height,1,tt,me)}_.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,J,0,0,0,ht.width,ht.height,Z.depth,tt,ht.data)}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,J,Mt,ht.width,ht.height,Z.depth,0,ht.data,0,0);else Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?et&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,J,0,0,0,ht.width,ht.height,Z.depth,tt,vt,ht.data):n.texImage3D(e.TEXTURE_2D_ARRAY,J,Mt,ht.width,ht.height,Z.depth,0,tt,vt,ht.data)}else{L&&st&&n.texStorage2D(e.TEXTURE_2D,pt,Mt,Xt[0].width,Xt[0].height);for(let J=0,W=Xt.length;J<W;J++)ht=Xt[J],_.format!==jn?tt!==null?L?et&&n.compressedTexSubImage2D(e.TEXTURE_2D,J,0,0,ht.width,ht.height,tt,ht.data):n.compressedTexImage2D(e.TEXTURE_2D,J,Mt,ht.width,ht.height,0,ht.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?et&&n.texSubImage2D(e.TEXTURE_2D,J,0,0,ht.width,ht.height,tt,vt,ht.data):n.texImage2D(e.TEXTURE_2D,J,Mt,ht.width,ht.height,0,tt,vt,ht.data)}else if(_.isDataArrayTexture)if(L){if(st&&n.texStorage3D(e.TEXTURE_2D_ARRAY,pt,Mt,Z.width,Z.height,Z.depth),et)if(_.layerUpdates.size>0){const J=ef(Z.width,Z.height,_.format,_.type);for(const W of _.layerUpdates){const xt=Z.data.subarray(W*J/Z.data.BYTES_PER_ELEMENT,(W+1)*J/Z.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,W,Z.width,Z.height,1,tt,vt,xt)}_.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,tt,vt,Z.data)}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,Mt,Z.width,Z.height,Z.depth,0,tt,vt,Z.data);else if(_.isData3DTexture)L?(st&&n.texStorage3D(e.TEXTURE_3D,pt,Mt,Z.width,Z.height,Z.depth),et&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,tt,vt,Z.data)):n.texImage3D(e.TEXTURE_3D,0,Mt,Z.width,Z.height,Z.depth,0,tt,vt,Z.data);else if(_.isFramebufferTexture){if(st)if(L)n.texStorage2D(e.TEXTURE_2D,pt,Mt,Z.width,Z.height);else{let J=Z.width,W=Z.height;for(let xt=0;xt<pt;xt++)n.texImage2D(e.TEXTURE_2D,xt,Mt,J,W,0,tt,vt,null),J>>=1,W>>=1}}else if(Xt.length>0){if(L&&st){const J=yt(Xt[0]);n.texStorage2D(e.TEXTURE_2D,pt,Mt,J.width,J.height)}for(let J=0,W=Xt.length;J<W;J++)ht=Xt[J],L?et&&n.texSubImage2D(e.TEXTURE_2D,J,0,0,tt,vt,ht):n.texImage2D(e.TEXTURE_2D,J,Mt,tt,vt,ht);_.generateMipmaps=!1}else if(L){if(st){const J=yt(Z);n.texStorage2D(e.TEXTURE_2D,pt,Mt,J.width,J.height)}et&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,tt,vt,Z)}else n.texImage2D(e.TEXTURE_2D,0,Mt,tt,vt,Z);p(_)&&f(q),_t.__version=X.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function nt(A,_,I){if(_.image.length!==6)return;const q=Vt(A,_),j=_.source;n.bindTexture(e.TEXTURE_CUBE_MAP,A.__webglTexture,e.TEXTURE0+I);const X=i.get(j);if(j.version!==X.__version||q===!0){n.activeTexture(e.TEXTURE0+I);const _t=Kt.getPrimaries(Kt.workingColorSpace),it=_.colorSpace===is?null:Kt.getPrimaries(_.colorSpace),Pt=_.colorSpace===is||_t===it?e.NONE:e.BROWSER_DEFAULT_WEBGL;e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,_.flipY),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),e.pixelStorei(e.UNPACK_ALIGNMENT,_.unpackAlignment),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);const Dt=_.isCompressedTexture||_.image[0].isCompressedTexture,Z=_.image[0]&&_.image[0].isDataTexture,tt=[];for(let W=0;W<6;W++)!Dt&&!Z?tt[W]=x(_.image[W],!0,s.maxCubemapSize):tt[W]=Z?_.image[W].image:_.image[W],tt[W]=pe(_,tt[W]);const vt=tt[0],Mt=r.convert(_.format,_.colorSpace),ht=r.convert(_.type),Xt=T(_.internalFormat,Mt,ht,_.colorSpace),L=_.isVideoTexture!==!0,st=X.__version===void 0||q===!0,et=j.dataReady;let pt=w(_,vt);dt(e.TEXTURE_CUBE_MAP,_);let J;if(Dt){L&&st&&n.texStorage2D(e.TEXTURE_CUBE_MAP,pt,Xt,vt.width,vt.height);for(let W=0;W<6;W++){J=tt[W].mipmaps;for(let xt=0;xt<J.length;xt++){const Ft=J[xt];_.format!==jn?Mt!==null?L?et&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt,0,0,Ft.width,Ft.height,Mt,Ft.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt,Xt,Ft.width,Ft.height,0,Ft.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?et&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt,0,0,Ft.width,Ft.height,Mt,ht,Ft.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt,Xt,Ft.width,Ft.height,0,Mt,ht,Ft.data)}}}else{if(J=_.mipmaps,L&&st){J.length>0&&pt++;const W=yt(tt[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,pt,Xt,W.width,W.height)}for(let W=0;W<6;W++)if(Z){L?et&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,tt[W].width,tt[W].height,Mt,ht,tt[W].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Xt,tt[W].width,tt[W].height,0,Mt,ht,tt[W].data);for(let xt=0;xt<J.length;xt++){const me=J[xt].image[W].image;L?et&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt+1,0,0,me.width,me.height,Mt,ht,me.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt+1,Xt,me.width,me.height,0,Mt,ht,me.data)}}else{L?et&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,Mt,ht,tt[W]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Xt,Mt,ht,tt[W]);for(let xt=0;xt<J.length;xt++){const Ft=J[xt];L?et&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt+1,0,0,Mt,ht,Ft.image[W]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+W,xt+1,Xt,Mt,ht,Ft.image[W])}}}p(_)&&f(e.TEXTURE_CUBE_MAP),X.__version=j.version,_.onUpdate&&_.onUpdate(_)}A.__version=_.version}function rt(A,_,I,q,j,X){const _t=r.convert(I.format,I.colorSpace),it=r.convert(I.type),Pt=T(I.internalFormat,_t,it,I.colorSpace),Dt=i.get(_),Z=i.get(I);if(Z.__renderTarget=_,!Dt.__hasExternalTextures){const tt=Math.max(1,_.width>>X),vt=Math.max(1,_.height>>X);j===e.TEXTURE_3D||j===e.TEXTURE_2D_ARRAY?n.texImage3D(j,X,Pt,tt,vt,_.depth,0,_t,it,null):n.texImage2D(j,X,Pt,tt,vt,0,_t,it,null)}n.bindFramebuffer(e.FRAMEBUFFER,A),De(_)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,q,j,Z.__webglTexture,0,P(_)):(j===e.TEXTURE_2D||j>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&j<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,q,j,Z.__webglTexture,X),n.bindFramebuffer(e.FRAMEBUFFER,null)}function Bt(A,_,I){if(e.bindRenderbuffer(e.RENDERBUFFER,A),_.depthBuffer){const q=_.depthTexture,j=q&&q.isDepthTexture?q.type:null,X=y(_.stencilBuffer,j),_t=_.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;De(_)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,P(_),X,_.width,_.height):I?e.renderbufferStorageMultisample(e.RENDERBUFFER,P(_),X,_.width,_.height):e.renderbufferStorage(e.RENDERBUFFER,X,_.width,_.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,_t,e.RENDERBUFFER,A)}else{const q=_.textures;for(let j=0;j<q.length;j++){const X=q[j],_t=r.convert(X.format,X.colorSpace),it=r.convert(X.type),Pt=T(X.internalFormat,_t,it,X.colorSpace);De(_)?o.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,P(_),Pt,_.width,_.height):I?e.renderbufferStorageMultisample(e.RENDERBUFFER,P(_),Pt,_.width,_.height):e.renderbufferStorage(e.RENDERBUFFER,Pt,_.width,_.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function It(A,_,I){const q=_.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,A),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const j=i.get(_.depthTexture);if(j.__renderTarget=_,(!j.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),q){if(j.__webglInit===void 0&&(j.__webglInit=!0,_.depthTexture.addEventListener("dispose",C)),j.__webglTexture===void 0){j.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,j.__webglTexture),dt(e.TEXTURE_CUBE_MAP,_.depthTexture);const Dt=r.convert(_.depthTexture.format),Z=r.convert(_.depthTexture.type);let tt;_.depthTexture.format===Bi?tt=e.DEPTH_COMPONENT24:_.depthTexture.format===Ds&&(tt=e.DEPTH24_STENCIL8);for(let vt=0;vt<6;vt++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,tt,_.width,_.height,0,Dt,Z,null)}}else z(_.depthTexture,0);const X=j.__webglTexture,_t=P(_),it=q?e.TEXTURE_CUBE_MAP_POSITIVE_X+I:e.TEXTURE_2D,Pt=_.depthTexture.format===Ds?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(_.depthTexture.format===Bi)De(_)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Pt,it,X,0,_t):e.framebufferTexture2D(e.FRAMEBUFFER,Pt,it,X,0);else if(_.depthTexture.format===Ds)De(_)?o.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,Pt,it,X,0,_t):e.framebufferTexture2D(e.FRAMEBUFFER,Pt,it,X,0);else throw new Error("Unknown depthTexture format")}function Nt(A){const _=i.get(A),I=A.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==A.depthTexture){const q=A.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),q){const j=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,q.removeEventListener("dispose",j)};q.addEventListener("dispose",j),_.__depthDisposeCallback=j}_.__boundDepthTexture=q}if(A.depthTexture&&!_.__autoAllocateDepthBuffer)if(I)for(let q=0;q<6;q++)It(_.__webglFramebuffer[q],A,q);else{const q=A.texture.mipmaps;q&&q.length>0?It(_.__webglFramebuffer[0],A,0):It(_.__webglFramebuffer,A,0)}else if(I){_.__webglDepthbuffer=[];for(let q=0;q<6;q++)if(n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer[q]),_.__webglDepthbuffer[q]===void 0)_.__webglDepthbuffer[q]=e.createRenderbuffer(),Bt(_.__webglDepthbuffer[q],A,!1);else{const j=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,X=_.__webglDepthbuffer[q];e.bindRenderbuffer(e.RENDERBUFFER,X),e.framebufferRenderbuffer(e.FRAMEBUFFER,j,e.RENDERBUFFER,X)}}else{const q=A.texture.mipmaps;if(q&&q.length>0?n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=e.createRenderbuffer(),Bt(_.__webglDepthbuffer,A,!1);else{const j=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,X=_.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,X),e.framebufferRenderbuffer(e.FRAMEBUFFER,j,e.RENDERBUFFER,X)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function We(A,_,I){const q=i.get(A);_!==void 0&&rt(q.__webglFramebuffer,A,A.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),I!==void 0&&Nt(A)}function jt(A){const _=A.texture,I=i.get(A),q=i.get(_);A.addEventListener("dispose",b);const j=A.textures,X=A.isWebGLCubeRenderTarget===!0,_t=j.length>1;if(_t||(q.__webglTexture===void 0&&(q.__webglTexture=e.createTexture()),q.__version=_.version,a.memory.textures++),X){I.__webglFramebuffer=[];for(let it=0;it<6;it++)if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer[it]=[];for(let Pt=0;Pt<_.mipmaps.length;Pt++)I.__webglFramebuffer[it][Pt]=e.createFramebuffer()}else I.__webglFramebuffer[it]=e.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){I.__webglFramebuffer=[];for(let it=0;it<_.mipmaps.length;it++)I.__webglFramebuffer[it]=e.createFramebuffer()}else I.__webglFramebuffer=e.createFramebuffer();if(_t)for(let it=0,Pt=j.length;it<Pt;it++){const Dt=i.get(j[it]);Dt.__webglTexture===void 0&&(Dt.__webglTexture=e.createTexture(),a.memory.textures++)}if(A.samples>0&&De(A)===!1){I.__webglMultisampledFramebuffer=e.createFramebuffer(),I.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let it=0;it<j.length;it++){const Pt=j[it];I.__webglColorRenderbuffer[it]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,I.__webglColorRenderbuffer[it]);const Dt=r.convert(Pt.format,Pt.colorSpace),Z=r.convert(Pt.type),tt=T(Pt.internalFormat,Dt,Z,Pt.colorSpace,A.isXRRenderTarget===!0),vt=P(A);e.renderbufferStorageMultisample(e.RENDERBUFFER,vt,tt,A.width,A.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+it,e.RENDERBUFFER,I.__webglColorRenderbuffer[it])}e.bindRenderbuffer(e.RENDERBUFFER,null),A.depthBuffer&&(I.__webglDepthRenderbuffer=e.createRenderbuffer(),Bt(I.__webglDepthRenderbuffer,A,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(X){n.bindTexture(e.TEXTURE_CUBE_MAP,q.__webglTexture),dt(e.TEXTURE_CUBE_MAP,_);for(let it=0;it<6;it++)if(_.mipmaps&&_.mipmaps.length>0)for(let Pt=0;Pt<_.mipmaps.length;Pt++)rt(I.__webglFramebuffer[it][Pt],A,_,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+it,Pt);else rt(I.__webglFramebuffer[it],A,_,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+it,0);p(_)&&f(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(_t){for(let it=0,Pt=j.length;it<Pt;it++){const Dt=j[it],Z=i.get(Dt);let tt=e.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(tt=A.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(tt,Z.__webglTexture),dt(tt,Dt),rt(I.__webglFramebuffer,A,Dt,e.COLOR_ATTACHMENT0+it,tt,0),p(Dt)&&f(tt)}n.unbindTexture()}else{let it=e.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(it=A.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(it,q.__webglTexture),dt(it,_),_.mipmaps&&_.mipmaps.length>0)for(let Pt=0;Pt<_.mipmaps.length;Pt++)rt(I.__webglFramebuffer[Pt],A,_,e.COLOR_ATTACHMENT0,it,Pt);else rt(I.__webglFramebuffer,A,_,e.COLOR_ATTACHMENT0,it,0);p(_)&&f(it),n.unbindTexture()}A.depthBuffer&&Nt(A)}function se(A){const _=A.textures;for(let I=0,q=_.length;I<q;I++){const j=_[I];if(p(j)){const X=S(A),_t=i.get(j).__webglTexture;n.bindTexture(X,_t),f(X),n.unbindTexture()}}}const ue=[],Wt=[];function Ce(A){if(A.samples>0){if(De(A)===!1){const _=A.textures,I=A.width,q=A.height;let j=e.COLOR_BUFFER_BIT;const X=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,_t=i.get(A),it=_.length>1;if(it)for(let Dt=0;Dt<_.length;Dt++)n.bindFramebuffer(e.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Dt,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,_t.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Dt,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,_t.__webglMultisampledFramebuffer);const Pt=A.texture.mipmaps;Pt&&Pt.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,_t.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,_t.__webglFramebuffer);for(let Dt=0;Dt<_.length;Dt++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(j|=e.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(j|=e.STENCIL_BUFFER_BIT)),it){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,_t.__webglColorRenderbuffer[Dt]);const Z=i.get(_[Dt]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,Z,0)}e.blitFramebuffer(0,0,I,q,0,0,I,q,j,e.NEAREST),c===!0&&(ue.length=0,Wt.length=0,ue.push(e.COLOR_ATTACHMENT0+Dt),A.depthBuffer&&A.resolveDepthBuffer===!1&&(ue.push(X),Wt.push(X),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,Wt)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ue))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),it)for(let Dt=0;Dt<_.length;Dt++){n.bindFramebuffer(e.FRAMEBUFFER,_t.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+Dt,e.RENDERBUFFER,_t.__webglColorRenderbuffer[Dt]);const Z=i.get(_[Dt]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,_t.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+Dt,e.TEXTURE_2D,Z,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,_t.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.resolveDepthBuffer===!1&&c){const _=A.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[_])}}}function P(A){return Math.min(s.maxSamples,A.samples)}function De(A){const _=i.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function ne(A){const _=a.render.frame;u.get(A)!==_&&(u.set(A,_),A.update())}function pe(A,_){const I=A.colorSpace,q=A.format,j=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||I!==br&&I!==is&&(Kt.getTransfer(I)===ae?(q!==jn||j!==kn)&&Ut("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Qt("WebGLTextures: Unsupported texture color space:",I)),_}function yt(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(l.width=A.naturalWidth||A.width,l.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(l.width=A.displayWidth,l.height=A.displayHeight):(l.width=A.width,l.height=A.height),l}this.allocateTextureUnit=V,this.resetTextureUnits=U,this.setTexture2D=z,this.setTexture2DArray=H,this.setTexture3D=N,this.setTextureCube=Q,this.rebindTextures=We,this.setupRenderTarget=jt,this.updateRenderTargetMipmap=se,this.updateMultisampleRenderTarget=Ce,this.setupDepthRenderbuffer=Nt,this.setupFrameBufferTexture=rt,this.useMultisampledRTT=De,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function uM(e,t){function n(i,s=is){let r;const a=Kt.getTransfer(s);if(i===kn)return e.UNSIGNED_BYTE;if(i===su)return e.UNSIGNED_SHORT_4_4_4_4;if(i===ru)return e.UNSIGNED_SHORT_5_5_5_1;if(i===cm)return e.UNSIGNED_INT_5_9_9_9_REV;if(i===lm)return e.UNSIGNED_INT_10F_11F_11F_REV;if(i===am)return e.BYTE;if(i===om)return e.SHORT;if(i===Ea)return e.UNSIGNED_SHORT;if(i===iu)return e.INT;if(i===gi)return e.UNSIGNED_INT;if(i===li)return e.FLOAT;if(i===Oi)return e.HALF_FLOAT;if(i===hm)return e.ALPHA;if(i===um)return e.RGB;if(i===jn)return e.RGBA;if(i===Bi)return e.DEPTH_COMPONENT;if(i===Ds)return e.DEPTH_STENCIL;if(i===dm)return e.RED;if(i===au)return e.RED_INTEGER;if(i===Er)return e.RG;if(i===ou)return e.RG_INTEGER;if(i===cu)return e.RGBA_INTEGER;if(i===Do||i===Uo||i===No||i===Fo)if(a===ae)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Do)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Uo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===No)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Fo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Do)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Uo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===No)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Fo)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Zl||i===Jl||i===Ql||i===th)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Zl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Jl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ql)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===th)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===eh||i===nh||i===ih||i===sh||i===rh||i===ah||i===oh)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(i===eh||i===nh)return a===ae?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===ih)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===sh)return r.COMPRESSED_R11_EAC;if(i===rh)return r.COMPRESSED_SIGNED_R11_EAC;if(i===ah)return r.COMPRESSED_RG11_EAC;if(i===oh)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ch||i===lh||i===hh||i===uh||i===dh||i===fh||i===ph||i===mh||i===gh||i===_h||i===vh||i===xh||i===Mh||i===Sh)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ch)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===lh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===hh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===uh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===dh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===fh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ph)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===mh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===gh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===_h)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===vh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===xh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Mh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Sh)return a===ae?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===yh||i===Eh||i===bh)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(i===yh)return a===ae?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Eh)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===bh)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Ah||i===Th||i===wh||i===Rh)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(i===Ah)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Th)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===wh)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Rh)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ba?e.UNSIGNED_INT_24_8:e[i]!==void 0?e[i]:null}return{convert:n}}const dM=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fM=`
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

}`;class pM{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,n){if(this.texture===null){const i=new ym(t.texture);(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const n=t.cameras[0].viewport,i=new _i({vertexShader:dM,fragmentShader:fM,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new Tn(new fc(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class mM extends Vr{constructor(t,n){super();const i=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,d=null,h=null,m=null,g=null;const x=typeof XRWebGLBinding<"u",p=new pM,f={},S=n.getContextAttributes();let T=null,y=null;const w=[],C=[],b=new he;let v=null;const E=new Bn;E.viewport=new Ie;const k=new Bn;k.viewport=new Ie;const R=[E,k],U=new w1;let V=null,Y=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let nt=w[$];return nt===void 0&&(nt=new nl,w[$]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function($){let nt=w[$];return nt===void 0&&(nt=new nl,w[$]=nt),nt.getGripSpace()},this.getHand=function($){let nt=w[$];return nt===void 0&&(nt=new nl,w[$]=nt),nt.getHandSpace()};function z($){const nt=C.indexOf($.inputSource);if(nt===-1)return;const rt=w[nt];rt!==void 0&&(rt.update($.inputSource,$.frame,l||a),rt.dispatchEvent({type:$.type,data:$.inputSource}))}function H(){s.removeEventListener("select",z),s.removeEventListener("selectstart",z),s.removeEventListener("selectend",z),s.removeEventListener("squeeze",z),s.removeEventListener("squeezestart",z),s.removeEventListener("squeezeend",z),s.removeEventListener("end",H),s.removeEventListener("inputsourceschange",N);for(let $=0;$<w.length;$++){const nt=C[$];nt!==null&&(C[$]=null,w[$].disconnect(nt))}V=null,Y=null,p.reset();for(const $ in f)delete f[$];t.setRenderTarget(T),m=null,h=null,d=null,s=null,y=null,ge.stop(),i.isPresenting=!1,t.setPixelRatio(v),t.setSize(b.width,b.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,i.isPresenting===!0&&Ut("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,i.isPresenting===!0&&Ut("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return d===null&&x&&(d=new XRWebGLBinding(s,n)),d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(T=t.getRenderTarget(),s.addEventListener("select",z),s.addEventListener("selectstart",z),s.addEventListener("selectend",z),s.addEventListener("squeeze",z),s.addEventListener("squeezestart",z),s.addEventListener("squeezeend",z),s.addEventListener("end",H),s.addEventListener("inputsourceschange",N),S.xrCompatible!==!0&&await n.makeXRCompatible(),v=t.getPixelRatio(),t.getSize(b),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let rt=null,Bt=null,It=null;S.depth&&(It=S.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,rt=S.stencil?Ds:Bi,Bt=S.stencil?ba:gi);const Nt={colorFormat:n.RGBA8,depthFormat:It,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(Nt),s.updateRenderState({layers:[h]}),t.setPixelRatio(1),t.setSize(h.textureWidth,h.textureHeight,!1),y=new fi(h.textureWidth,h.textureHeight,{format:jn,type:kn,depthTexture:new Aa(h.textureWidth,h.textureHeight,Bt,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:S.stencil,colorSpace:t.outputColorSpace,samples:S.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const rt={antialias:S.antialias,alpha:!0,depth:S.depth,stencil:S.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,n,rt),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),y=new fi(m.framebufferWidth,m.framebufferHeight,{format:jn,type:kn,colorSpace:t.outputColorSpace,stencilBuffer:S.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),ge.setContext(s),ge.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function N($){for(let nt=0;nt<$.removed.length;nt++){const rt=$.removed[nt],Bt=C.indexOf(rt);Bt>=0&&(C[Bt]=null,w[Bt].disconnect(rt))}for(let nt=0;nt<$.added.length;nt++){const rt=$.added[nt];let Bt=C.indexOf(rt);if(Bt===-1){for(let Nt=0;Nt<w.length;Nt++)if(Nt>=C.length){C.push(rt),Bt=Nt;break}else if(C[Nt]===null){C[Nt]=rt,Bt=Nt;break}if(Bt===-1)break}const It=w[Bt];It&&It.connect(rt)}}const Q=new F,K=new F;function lt($,nt,rt){Q.setFromMatrixPosition(nt.matrixWorld),K.setFromMatrixPosition(rt.matrixWorld);const Bt=Q.distanceTo(K),It=nt.projectionMatrix.elements,Nt=rt.projectionMatrix.elements,We=It[14]/(It[10]-1),jt=It[14]/(It[10]+1),se=(It[9]+1)/It[5],ue=(It[9]-1)/It[5],Wt=(It[8]-1)/It[0],Ce=(Nt[8]+1)/Nt[0],P=We*Wt,De=We*Ce,ne=Bt/(-Wt+Ce),pe=ne*-Wt;if(nt.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(pe),$.translateZ(ne),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),It[10]===-1)$.projectionMatrix.copy(nt.projectionMatrix),$.projectionMatrixInverse.copy(nt.projectionMatrixInverse);else{const yt=We+ne,A=jt+ne,_=P-pe,I=De+(Bt-pe),q=se*jt/A*yt,j=ue*jt/A*yt;$.projectionMatrix.makePerspective(_,I,q,j,yt,A),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function gt($,nt){nt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(nt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let nt=$.near,rt=$.far;p.texture!==null&&(p.depthNear>0&&(nt=p.depthNear),p.depthFar>0&&(rt=p.depthFar)),U.near=k.near=E.near=nt,U.far=k.far=E.far=rt,(V!==U.near||Y!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),V=U.near,Y=U.far),U.layers.mask=$.layers.mask|6,E.layers.mask=U.layers.mask&-5,k.layers.mask=U.layers.mask&-3;const Bt=$.parent,It=U.cameras;gt(U,Bt);for(let Nt=0;Nt<It.length;Nt++)gt(It[Nt],Bt);It.length===2?lt(U,E,k):U.projectionMatrix.copy(E.projectionMatrix),dt($,U,Bt)};function dt($,nt,rt){rt===null?$.matrix.copy(nt.matrixWorld):($.matrix.copy(rt.matrixWorld),$.matrix.invert(),$.matrix.multiply(nt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(nt.projectionMatrix),$.projectionMatrixInverse.copy(nt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Ch*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(h===null&&m===null))return c},this.setFoveation=function($){c=$,h!==null&&(h.fixedFoveation=$),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=$)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(U)},this.getCameraTexture=function($){return f[$]};let Vt=null;function _e($,nt){if(u=nt.getViewerPose(l||a),g=nt,u!==null){const rt=u.views;m!==null&&(t.setRenderTargetFramebuffer(y,m.framebuffer),t.setRenderTarget(y));let Bt=!1;rt.length!==U.cameras.length&&(U.cameras.length=0,Bt=!0);for(let jt=0;jt<rt.length;jt++){const se=rt[jt];let ue=null;if(m!==null)ue=m.getViewport(se);else{const Ce=d.getViewSubImage(h,se);ue=Ce.viewport,jt===0&&(t.setRenderTargetTextures(y,Ce.colorTexture,Ce.depthStencilTexture),t.setRenderTarget(y))}let Wt=R[jt];Wt===void 0&&(Wt=new Bn,Wt.layers.enable(jt),Wt.viewport=new Ie,R[jt]=Wt),Wt.matrix.fromArray(se.transform.matrix),Wt.matrix.decompose(Wt.position,Wt.quaternion,Wt.scale),Wt.projectionMatrix.fromArray(se.projectionMatrix),Wt.projectionMatrixInverse.copy(Wt.projectionMatrix).invert(),Wt.viewport.set(ue.x,ue.y,ue.width,ue.height),jt===0&&(U.matrix.copy(Wt.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Bt===!0&&U.cameras.push(Wt)}const It=s.enabledFeatures;if(It&&It.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){d=i.getBinding();const jt=d.getDepthInformation(rt[0]);jt&&jt.isValid&&jt.texture&&p.init(jt,s.renderState)}if(It&&It.includes("camera-access")&&x){t.state.unbindTexture(),d=i.getBinding();for(let jt=0;jt<rt.length;jt++){const se=rt[jt].camera;if(se){let ue=f[se];ue||(ue=new ym,f[se]=ue);const Wt=d.getCameraImage(se);ue.sourceTexture=Wt}}}}for(let rt=0;rt<w.length;rt++){const Bt=C[rt],It=w[rt];Bt!==null&&It!==void 0&&It.update(Bt,nt,l||a)}Vt&&Vt($,nt),nt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:nt}),g=null}const ge=new Tm;ge.setAnimationLoop(_e),this.setAnimationLoop=function($){Vt=$},this.dispose=function(){}}}const ys=new ki,gM=new we;function _M(e,t){function n(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function i(p,f){f.color.getRGB(p.fogColor.value,Em(e)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function s(p,f,S,T,y){f.isMeshBasicMaterial?r(p,f):f.isMeshLambertMaterial?(r(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshToonMaterial?(r(p,f),d(p,f)):f.isMeshPhongMaterial?(r(p,f),u(p,f),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)):f.isMeshStandardMaterial?(r(p,f),h(p,f),f.isMeshPhysicalMaterial&&m(p,f,y)):f.isMeshMatcapMaterial?(r(p,f),g(p,f)):f.isMeshDepthMaterial?r(p,f):f.isMeshDistanceMaterial?(r(p,f),x(p,f)):f.isMeshNormalMaterial?r(p,f):f.isLineBasicMaterial?(a(p,f),f.isLineDashedMaterial&&o(p,f)):f.isPointsMaterial?c(p,f,S,T):f.isSpriteMaterial?l(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,n(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,n(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,n(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===gn&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,n(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===gn&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,n(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,n(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,n(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const S=t.get(f),T=S.envMap,y=S.envMapRotation;T&&(p.envMap.value=T,ys.copy(y),ys.x*=-1,ys.y*=-1,ys.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(ys.y*=-1,ys.z*=-1),p.envMapRotation.value.setFromMatrix4(gM.makeRotationFromEuler(ys)),p.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,n(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,n(f.aoMap,p.aoMapTransform))}function a(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,n(f.map,p.mapTransform))}function o(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function c(p,f,S,T){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*S,p.scale.value=T*.5,f.map&&(p.map.value=f.map,n(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,n(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function l(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,n(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,n(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function u(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function d(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function h(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,n(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,n(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,S){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,n(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,n(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,n(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,n(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,n(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===gn&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,n(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,n(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=S.texture,p.transmissionSamplerSize.value.set(S.width,S.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,n(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,n(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,n(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,n(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,n(f.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,f){f.matcap&&(p.matcap.value=f.matcap)}function x(p,f){const S=t.get(f).light;p.referencePosition.value.setFromMatrixPosition(S.matrixWorld),p.nearDistance.value=S.shadow.camera.near,p.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function vM(e,t,n,i){let s={},r={},a=[];const o=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,T){const y=T.program;i.uniformBlockBinding(S,y)}function l(S,T){let y=s[S.id];y===void 0&&(g(S),y=u(S),s[S.id]=y,S.addEventListener("dispose",p));const w=T.program;i.updateUBOMapping(S,w);const C=t.render.frame;r[S.id]!==C&&(h(S),r[S.id]=C)}function u(S){const T=d();S.__bindingPointIndex=T;const y=e.createBuffer(),w=S.__size,C=S.usage;return e.bindBuffer(e.UNIFORM_BUFFER,y),e.bufferData(e.UNIFORM_BUFFER,w,C),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,T,y),y}function d(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return Qt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(S){const T=s[S.id],y=S.uniforms,w=S.__cache;e.bindBuffer(e.UNIFORM_BUFFER,T);for(let C=0,b=y.length;C<b;C++){const v=Array.isArray(y[C])?y[C]:[y[C]];for(let E=0,k=v.length;E<k;E++){const R=v[E];if(m(R,C,E,w)===!0){const U=R.__offset,V=Array.isArray(R.value)?R.value:[R.value];let Y=0;for(let z=0;z<V.length;z++){const H=V[z],N=x(H);typeof H=="number"||typeof H=="boolean"?(R.__data[0]=H,e.bufferSubData(e.UNIFORM_BUFFER,U+Y,R.__data)):H.isMatrix3?(R.__data[0]=H.elements[0],R.__data[1]=H.elements[1],R.__data[2]=H.elements[2],R.__data[3]=0,R.__data[4]=H.elements[3],R.__data[5]=H.elements[4],R.__data[6]=H.elements[5],R.__data[7]=0,R.__data[8]=H.elements[6],R.__data[9]=H.elements[7],R.__data[10]=H.elements[8],R.__data[11]=0):(H.toArray(R.__data,Y),Y+=N.storage/Float32Array.BYTES_PER_ELEMENT)}e.bufferSubData(e.UNIFORM_BUFFER,U,R.__data)}}}e.bindBuffer(e.UNIFORM_BUFFER,null)}function m(S,T,y,w){const C=S.value,b=T+"_"+y;if(w[b]===void 0)return typeof C=="number"||typeof C=="boolean"?w[b]=C:w[b]=C.clone(),!0;{const v=w[b];if(typeof C=="number"||typeof C=="boolean"){if(v!==C)return w[b]=C,!0}else if(v.equals(C)===!1)return v.copy(C),!0}return!1}function g(S){const T=S.uniforms;let y=0;const w=16;for(let b=0,v=T.length;b<v;b++){const E=Array.isArray(T[b])?T[b]:[T[b]];for(let k=0,R=E.length;k<R;k++){const U=E[k],V=Array.isArray(U.value)?U.value:[U.value];for(let Y=0,z=V.length;Y<z;Y++){const H=V[Y],N=x(H),Q=y%w,K=Q%N.boundary,lt=Q+K;y+=K,lt!==0&&w-lt<N.storage&&(y+=w-lt),U.__data=new Float32Array(N.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=y,y+=N.storage}}}const C=y%w;return C>0&&(y+=w-C),S.__size=y,S.__cache={},this}function x(S){const T={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(T.boundary=4,T.storage=4):S.isVector2?(T.boundary=8,T.storage=8):S.isVector3||S.isColor?(T.boundary=16,T.storage=12):S.isVector4?(T.boundary=16,T.storage=16):S.isMatrix3?(T.boundary=48,T.storage=48):S.isMatrix4?(T.boundary=64,T.storage=64):S.isTexture?Ut("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ut("WebGLRenderer: Unsupported uniform value type.",S),T}function p(S){const T=S.target;T.removeEventListener("dispose",p);const y=a.indexOf(T.__bindingPointIndex);a.splice(y,1),e.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function f(){for(const S in s)e.deleteBuffer(s[S]);a=[],s={},r={}}return{bind:c,update:l,dispose:f}}const xM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let ii=null;function MM(){return ii===null&&(ii=new u1(xM,16,16,Er,Oi),ii.name="DFG_LUT",ii.minFilter=je,ii.magFilter=je,ii.wrapS=Di,ii.wrapT=Di,ii.generateMipmaps=!1,ii.needsUpdate=!0),ii}class SM{constructor(t={}){const{canvas:n=G_(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:m=kn}=t;this.isWebGLRenderer=!0;let g;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=i.getContextAttributes().alpha}else g=a;const x=m,p=new Set([cu,ou,au]),f=new Set([kn,gi,Ea,ba,su,ru]),S=new Uint32Array(4),T=new Int32Array(4);let y=null,w=null;const C=[],b=[];let v=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=di,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const E=this;let k=!1;this._outputColorSpace=On;let R=0,U=0,V=null,Y=-1,z=null;const H=new Ie,N=new Ie;let Q=null;const K=new ie(0);let lt=0,gt=n.width,dt=n.height,Vt=1,_e=null,ge=null;const $=new Ie(0,0,gt,dt),nt=new Ie(0,0,gt,dt);let rt=!1;const Bt=new xm;let It=!1,Nt=!1;const We=new we,jt=new F,se=new Ie,ue={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Wt=!1;function Ce(){return V===null?Vt:1}let P=i;function De(M,D){return n.getContext(M,D)}try{const M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${nu}`),n.addEventListener("webglcontextlost",xt,!1),n.addEventListener("webglcontextrestored",Ft,!1),n.addEventListener("webglcontextcreationerror",me,!1),P===null){const D="webgl2";if(P=De(D,M),P===null)throw De(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw Qt("WebGLRenderer: "+M.message),M}let ne,pe,yt,A,_,I,q,j,X,_t,it,Pt,Dt,Z,tt,vt,Mt,ht,Xt,L,st,et,pt;function J(){ne=new Sx(P),ne.init(),st=new uM(P,ne),pe=new fx(P,ne,t,st),yt=new lM(P,ne),pe.reversedDepthBuffer&&h&&yt.buffers.depth.setReversed(!0),A=new bx(P),_=new j3,I=new hM(P,ne,yt,_,pe,st,A),q=new Mx(E),j=new C1(P),et=new ux(P,j),X=new yx(P,j,A,et),_t=new Tx(P,X,j,et,A),ht=new Ax(P,pe,I),tt=new px(_),it=new $3(E,q,ne,pe,et,tt),Pt=new _M(E,_),Dt=new Z3,Z=new iM(ne),Mt=new hx(E,q,yt,_t,g,c),vt=new cM(E,_t,pe),pt=new vM(P,A,pe,yt),Xt=new dx(P,ne,A),L=new Ex(P,ne,A),A.programs=it.programs,E.capabilities=pe,E.extensions=ne,E.properties=_,E.renderLists=Dt,E.shadowMap=vt,E.state=yt,E.info=A}J(),x!==kn&&(v=new Rx(x,n.width,n.height,s,r));const W=new mM(E,P);this.xr=W,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const M=ne.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=ne.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return Vt},this.setPixelRatio=function(M){M!==void 0&&(Vt=M,this.setSize(gt,dt,!1))},this.getSize=function(M){return M.set(gt,dt)},this.setSize=function(M,D,G=!0){if(W.isPresenting){Ut("WebGLRenderer: Can't change size while VR device is presenting.");return}gt=M,dt=D,n.width=Math.floor(M*Vt),n.height=Math.floor(D*Vt),G===!0&&(n.style.width=M+"px",n.style.height=D+"px"),v!==null&&v.setSize(n.width,n.height),this.setViewport(0,0,M,D)},this.getDrawingBufferSize=function(M){return M.set(gt*Vt,dt*Vt).floor()},this.setDrawingBufferSize=function(M,D,G){gt=M,dt=D,Vt=G,n.width=Math.floor(M*G),n.height=Math.floor(D*G),this.setViewport(0,0,M,D)},this.setEffects=function(M){if(x===kn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let D=0;D<M.length;D++)if(M[D].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}v.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(H)},this.getViewport=function(M){return M.copy($)},this.setViewport=function(M,D,G,B){M.isVector4?$.set(M.x,M.y,M.z,M.w):$.set(M,D,G,B),yt.viewport(H.copy($).multiplyScalar(Vt).round())},this.getScissor=function(M){return M.copy(nt)},this.setScissor=function(M,D,G,B){M.isVector4?nt.set(M.x,M.y,M.z,M.w):nt.set(M,D,G,B),yt.scissor(N.copy(nt).multiplyScalar(Vt).round())},this.getScissorTest=function(){return rt},this.setScissorTest=function(M){yt.setScissorTest(rt=M)},this.setOpaqueSort=function(M){_e=M},this.setTransparentSort=function(M){ge=M},this.getClearColor=function(M){return M.copy(Mt.getClearColor())},this.setClearColor=function(){Mt.setClearColor(...arguments)},this.getClearAlpha=function(){return Mt.getClearAlpha()},this.setClearAlpha=function(){Mt.setClearAlpha(...arguments)},this.clear=function(M=!0,D=!0,G=!0){let B=0;if(M){let O=!1;if(V!==null){const ot=V.texture.format;O=p.has(ot)}if(O){const ot=V.texture.type,ft=f.has(ot),ct=Mt.getClearColor(),St=Mt.getClearAlpha(),Tt=ct.r,Ot=ct.g,Yt=ct.b;ft?(S[0]=Tt,S[1]=Ot,S[2]=Yt,S[3]=St,P.clearBufferuiv(P.COLOR,0,S)):(T[0]=Tt,T[1]=Ot,T[2]=Yt,T[3]=St,P.clearBufferiv(P.COLOR,0,T))}else B|=P.COLOR_BUFFER_BIT}D&&(B|=P.DEPTH_BUFFER_BIT),G&&(B|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B!==0&&P.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",xt,!1),n.removeEventListener("webglcontextrestored",Ft,!1),n.removeEventListener("webglcontextcreationerror",me,!1),Mt.dispose(),Dt.dispose(),Z.dispose(),_.dispose(),q.dispose(),_t.dispose(),et.dispose(),pt.dispose(),it.dispose(),W.dispose(),W.removeEventListener("sessionstart",_d),W.removeEventListener("sessionend",vd),ms.stop()};function xt(M){M.preventDefault(),Id("WebGLRenderer: Context Lost."),k=!0}function Ft(){Id("WebGLRenderer: Context Restored."),k=!1;const M=A.autoReset,D=vt.enabled,G=vt.autoUpdate,B=vt.needsUpdate,O=vt.type;J(),A.autoReset=M,vt.enabled=D,vt.autoUpdate=G,vt.needsUpdate=B,vt.type=O}function me(M){Qt("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function re(M){const D=M.target;D.removeEventListener("dispose",re),bi(D)}function bi(M){Ai(M),_.remove(M)}function Ai(M){const D=_.get(M).programs;D!==void 0&&(D.forEach(function(G){it.releaseProgram(G)}),M.isShaderMaterial&&it.releaseShaderCache(M))}this.renderBufferDirect=function(M,D,G,B,O,ot){D===null&&(D=ue);const ft=O.isMesh&&O.matrixWorld.determinant()<0,ct=t_(M,D,G,B,O);yt.setMaterial(B,ft);let St=G.index,Tt=1;if(B.wireframe===!0){if(St=X.getWireframeAttribute(G),St===void 0)return;Tt=2}const Ot=G.drawRange,Yt=G.attributes.position;let Rt=Ot.start*Tt,oe=(Ot.start+Ot.count)*Tt;ot!==null&&(Rt=Math.max(Rt,ot.start*Tt),oe=Math.min(oe,(ot.start+ot.count)*Tt)),St!==null?(Rt=Math.max(Rt,0),oe=Math.min(oe,St.count)):Yt!=null&&(Rt=Math.max(Rt,0),oe=Math.min(oe,Yt.count));const Pe=oe-Rt;if(Pe<0||Pe===1/0)return;et.setup(O,B,ct,G,St);let Te,ce=Xt;if(St!==null&&(Te=j.get(St),ce=L,ce.setIndex(Te)),O.isMesh)B.wireframe===!0?(yt.setLineWidth(B.wireframeLinewidth*Ce()),ce.setMode(P.LINES)):ce.setMode(P.TRIANGLES);else if(O.isLine){let Qe=B.linewidth;Qe===void 0&&(Qe=1),yt.setLineWidth(Qe*Ce()),O.isLineSegments?ce.setMode(P.LINES):O.isLineLoop?ce.setMode(P.LINE_LOOP):ce.setMode(P.LINE_STRIP)}else O.isPoints?ce.setMode(P.POINTS):O.isSprite&&ce.setMode(P.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)Zo("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ce.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(ne.get("WEBGL_multi_draw"))ce.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const Qe=O._multiDrawStarts,Et=O._multiDrawCounts,vn=O._multiDrawCount,Jt=St?j.get(St).bytesPerElement:1,Wn=_.get(B).currentProgram.getUniforms();for(let ei=0;ei<vn;ei++)Wn.setValue(P,"_gl_DrawID",ei),ce.render(Qe[ei]/Jt,Et[ei])}else if(O.isInstancedMesh)ce.renderInstances(Rt,Pe,O.count);else if(G.isInstancedBufferGeometry){const Qe=G._maxInstanceCount!==void 0?G._maxInstanceCount:1/0,Et=Math.min(G.instanceCount,Qe);ce.renderInstances(Rt,Pe,Et)}else ce.render(Rt,Pe)};function gd(M,D,G){M.transparent===!0&&M.side===Li&&M.forceSinglePass===!1?(M.side=gn,M.needsUpdate=!0,qa(M,D,G),M.side=us,M.needsUpdate=!0,qa(M,D,G),M.side=Li):qa(M,D,G)}this.compile=function(M,D,G=null){G===null&&(G=M),w=Z.get(G),w.init(D),b.push(w),G.traverseVisible(function(O){O.isLight&&O.layers.test(D.layers)&&(w.pushLight(O),O.castShadow&&w.pushShadow(O))}),M!==G&&M.traverseVisible(function(O){O.isLight&&O.layers.test(D.layers)&&(w.pushLight(O),O.castShadow&&w.pushShadow(O))}),w.setupLights();const B=new Set;return M.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const ot=O.material;if(ot)if(Array.isArray(ot))for(let ft=0;ft<ot.length;ft++){const ct=ot[ft];gd(ct,G,O),B.add(ct)}else gd(ot,G,O),B.add(ot)}),w=b.pop(),B},this.compileAsync=function(M,D,G=null){const B=this.compile(M,D,G);return new Promise(O=>{function ot(){if(B.forEach(function(ft){_.get(ft).currentProgram.isReady()&&B.delete(ft)}),B.size===0){O(M);return}setTimeout(ot,10)}ne.get("KHR_parallel_shader_compile")!==null?ot():setTimeout(ot,10)})};let Wc=null;function Qg(M){Wc&&Wc(M)}function _d(){ms.stop()}function vd(){ms.start()}const ms=new Tm;ms.setAnimationLoop(Qg),typeof self<"u"&&ms.setContext(self),this.setAnimationLoop=function(M){Wc=M,W.setAnimationLoop(M),M===null?ms.stop():ms.start()},W.addEventListener("sessionstart",_d),W.addEventListener("sessionend",vd),this.render=function(M,D){if(D!==void 0&&D.isCamera!==!0){Qt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;const G=W.enabled===!0&&W.isPresenting===!0,B=v!==null&&(V===null||G)&&v.begin(E,V);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(v===null||v.isCompositing()===!1)&&(W.cameraAutoUpdate===!0&&W.updateCamera(D),D=W.getCamera()),M.isScene===!0&&M.onBeforeRender(E,M,D,V),w=Z.get(M,b.length),w.init(D),b.push(w),We.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Bt.setFromProjectionMatrix(We,hi,D.reversedDepth),Nt=this.localClippingEnabled,It=tt.init(this.clippingPlanes,Nt),y=Dt.get(M,C.length),y.init(),C.push(y),W.enabled===!0&&W.isPresenting===!0){const ft=E.xr.getDepthSensingMesh();ft!==null&&Xc(ft,D,-1/0,E.sortObjects)}Xc(M,D,0,E.sortObjects),y.finish(),E.sortObjects===!0&&y.sort(_e,ge),Wt=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,Wt&&Mt.addToRenderList(y,M),this.info.render.frame++,It===!0&&tt.beginShadows();const O=w.state.shadowsArray;if(vt.render(O,M,D),It===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset(),(B&&v.hasRenderPass())===!1){const ft=y.opaque,ct=y.transmissive;if(w.setupLights(),D.isArrayCamera){const St=D.cameras;if(ct.length>0)for(let Tt=0,Ot=St.length;Tt<Ot;Tt++){const Yt=St[Tt];Md(ft,ct,M,Yt)}Wt&&Mt.render(M);for(let Tt=0,Ot=St.length;Tt<Ot;Tt++){const Yt=St[Tt];xd(y,M,Yt,Yt.viewport)}}else ct.length>0&&Md(ft,ct,M,D),Wt&&Mt.render(M),xd(y,M,D)}V!==null&&U===0&&(I.updateMultisampleRenderTarget(V),I.updateRenderTargetMipmap(V)),B&&v.end(E),M.isScene===!0&&M.onAfterRender(E,M,D),et.resetDefaultState(),Y=-1,z=null,b.pop(),b.length>0?(w=b[b.length-1],It===!0&&tt.setGlobalState(E.clippingPlanes,w.state.camera)):w=null,C.pop(),C.length>0?y=C[C.length-1]:y=null};function Xc(M,D,G,B){if(M.visible===!1)return;if(M.layers.test(D.layers)){if(M.isGroup)G=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(D);else if(M.isLight)w.pushLight(M),M.castShadow&&w.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Bt.intersectsSprite(M)){B&&se.setFromMatrixPosition(M.matrixWorld).applyMatrix4(We);const ft=_t.update(M),ct=M.material;ct.visible&&y.push(M,ft,ct,G,se.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Bt.intersectsObject(M))){const ft=_t.update(M),ct=M.material;if(B&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),se.copy(M.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),se.copy(ft.boundingSphere.center)),se.applyMatrix4(M.matrixWorld).applyMatrix4(We)),Array.isArray(ct)){const St=ft.groups;for(let Tt=0,Ot=St.length;Tt<Ot;Tt++){const Yt=St[Tt],Rt=ct[Yt.materialIndex];Rt&&Rt.visible&&y.push(M,ft,Rt,G,se.z,Yt)}}else ct.visible&&y.push(M,ft,ct,G,se.z,null)}}const ot=M.children;for(let ft=0,ct=ot.length;ft<ct;ft++)Xc(ot[ft],D,G,B)}function xd(M,D,G,B){const{opaque:O,transmissive:ot,transparent:ft}=M;w.setupLightsView(G),It===!0&&tt.setGlobalState(E.clippingPlanes,G),B&&yt.viewport(H.copy(B)),O.length>0&&Ya(O,D,G),ot.length>0&&Ya(ot,D,G),ft.length>0&&Ya(ft,D,G),yt.buffers.depth.setTest(!0),yt.buffers.depth.setMask(!0),yt.buffers.color.setMask(!0),yt.setPolygonOffset(!1)}function Md(M,D,G,B){if((G.isScene===!0?G.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[B.id]===void 0){const Rt=ne.has("EXT_color_buffer_half_float")||ne.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[B.id]=new fi(1,1,{generateMipmaps:!0,type:Rt?Oi:kn,minFilter:Is,samples:Math.max(4,pe.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace})}const ot=w.state.transmissionRenderTarget[B.id],ft=B.viewport||H;ot.setSize(ft.z*E.transmissionResolutionScale,ft.w*E.transmissionResolutionScale);const ct=E.getRenderTarget(),St=E.getActiveCubeFace(),Tt=E.getActiveMipmapLevel();E.setRenderTarget(ot),E.getClearColor(K),lt=E.getClearAlpha(),lt<1&&E.setClearColor(16777215,.5),E.clear(),Wt&&Mt.render(G);const Ot=E.toneMapping;E.toneMapping=di;const Yt=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),w.setupLightsView(B),It===!0&&tt.setGlobalState(E.clippingPlanes,B),Ya(M,G,B),I.updateMultisampleRenderTarget(ot),I.updateRenderTargetMipmap(ot),ne.has("WEBGL_multisampled_render_to_texture")===!1){let Rt=!1;for(let oe=0,Pe=D.length;oe<Pe;oe++){const Te=D[oe],{object:ce,geometry:Qe,material:Et,group:vn}=Te;if(Et.side===Li&&ce.layers.test(B.layers)){const Jt=Et.side;Et.side=gn,Et.needsUpdate=!0,Sd(ce,G,B,Qe,Et,vn),Et.side=Jt,Et.needsUpdate=!0,Rt=!0}}Rt===!0&&(I.updateMultisampleRenderTarget(ot),I.updateRenderTargetMipmap(ot))}E.setRenderTarget(ct,St,Tt),E.setClearColor(K,lt),Yt!==void 0&&(B.viewport=Yt),E.toneMapping=Ot}function Ya(M,D,G){const B=D.isScene===!0?D.overrideMaterial:null;for(let O=0,ot=M.length;O<ot;O++){const ft=M[O],{object:ct,geometry:St,group:Tt}=ft;let Ot=ft.material;Ot.allowOverride===!0&&B!==null&&(Ot=B),ct.layers.test(G.layers)&&Sd(ct,D,G,St,Ot,Tt)}}function Sd(M,D,G,B,O,ot){M.onBeforeRender(E,D,G,B,O,ot),M.modelViewMatrix.multiplyMatrices(G.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),O.onBeforeRender(E,D,G,B,M,ot),O.transparent===!0&&O.side===Li&&O.forceSinglePass===!1?(O.side=gn,O.needsUpdate=!0,E.renderBufferDirect(G,D,B,O,M,ot),O.side=us,O.needsUpdate=!0,E.renderBufferDirect(G,D,B,O,M,ot),O.side=Li):E.renderBufferDirect(G,D,B,O,M,ot),M.onAfterRender(E,D,G,B,O,ot)}function qa(M,D,G){D.isScene!==!0&&(D=ue);const B=_.get(M),O=w.state.lights,ot=w.state.shadowsArray,ft=O.state.version,ct=it.getParameters(M,O.state,ot,D,G),St=it.getProgramCacheKey(ct);let Tt=B.programs;B.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?D.environment:null,B.fog=D.fog;const Ot=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;B.envMap=q.get(M.envMap||B.environment,Ot),B.envMapRotation=B.environment!==null&&M.envMap===null?D.environmentRotation:M.envMapRotation,Tt===void 0&&(M.addEventListener("dispose",re),Tt=new Map,B.programs=Tt);let Yt=Tt.get(St);if(Yt!==void 0){if(B.currentProgram===Yt&&B.lightsStateVersion===ft)return Ed(M,ct),Yt}else ct.uniforms=it.getUniforms(M),M.onBeforeCompile(ct,E),Yt=it.acquireProgram(ct,St),Tt.set(St,Yt),B.uniforms=ct.uniforms;const Rt=B.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Rt.clippingPlanes=tt.uniform),Ed(M,ct),B.needsLights=n_(M),B.lightsStateVersion=ft,B.needsLights&&(Rt.ambientLightColor.value=O.state.ambient,Rt.lightProbe.value=O.state.probe,Rt.directionalLights.value=O.state.directional,Rt.directionalLightShadows.value=O.state.directionalShadow,Rt.spotLights.value=O.state.spot,Rt.spotLightShadows.value=O.state.spotShadow,Rt.rectAreaLights.value=O.state.rectArea,Rt.ltc_1.value=O.state.rectAreaLTC1,Rt.ltc_2.value=O.state.rectAreaLTC2,Rt.pointLights.value=O.state.point,Rt.pointLightShadows.value=O.state.pointShadow,Rt.hemisphereLights.value=O.state.hemi,Rt.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Rt.spotLightMatrix.value=O.state.spotLightMatrix,Rt.spotLightMap.value=O.state.spotLightMap,Rt.pointShadowMatrix.value=O.state.pointShadowMatrix),B.currentProgram=Yt,B.uniformsList=null,Yt}function yd(M){if(M.uniformsList===null){const D=M.currentProgram.getUniforms();M.uniformsList=Oo.seqWithValue(D.seq,M.uniforms)}return M.uniformsList}function Ed(M,D){const G=_.get(M);G.outputColorSpace=D.outputColorSpace,G.batching=D.batching,G.batchingColor=D.batchingColor,G.instancing=D.instancing,G.instancingColor=D.instancingColor,G.instancingMorph=D.instancingMorph,G.skinning=D.skinning,G.morphTargets=D.morphTargets,G.morphNormals=D.morphNormals,G.morphColors=D.morphColors,G.morphTargetsCount=D.morphTargetsCount,G.numClippingPlanes=D.numClippingPlanes,G.numIntersection=D.numClipIntersection,G.vertexAlphas=D.vertexAlphas,G.vertexTangents=D.vertexTangents,G.toneMapping=D.toneMapping}function t_(M,D,G,B,O){D.isScene!==!0&&(D=ue),I.resetTextureUnits();const ot=D.fog,ft=B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial?D.environment:null,ct=V===null?E.outputColorSpace:V.isXRRenderTarget===!0?V.texture.colorSpace:br,St=B.isMeshStandardMaterial||B.isMeshLambertMaterial&&!B.envMap||B.isMeshPhongMaterial&&!B.envMap,Tt=q.get(B.envMap||ft,St),Ot=B.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,Yt=!!G.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Rt=!!G.morphAttributes.position,oe=!!G.morphAttributes.normal,Pe=!!G.morphAttributes.color;let Te=di;B.toneMapped&&(V===null||V.isXRRenderTarget===!0)&&(Te=E.toneMapping);const ce=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Qe=ce!==void 0?ce.length:0,Et=_.get(B),vn=w.state.lights;if(It===!0&&(Nt===!0||M!==z)){const Xe=M===z&&B.id===Y;tt.setState(B,M,Xe)}let Jt=!1;B.version===Et.__version?(Et.needsLights&&Et.lightsStateVersion!==vn.state.version||Et.outputColorSpace!==ct||O.isBatchedMesh&&Et.batching===!1||!O.isBatchedMesh&&Et.batching===!0||O.isBatchedMesh&&Et.batchingColor===!0&&O.colorTexture===null||O.isBatchedMesh&&Et.batchingColor===!1&&O.colorTexture!==null||O.isInstancedMesh&&Et.instancing===!1||!O.isInstancedMesh&&Et.instancing===!0||O.isSkinnedMesh&&Et.skinning===!1||!O.isSkinnedMesh&&Et.skinning===!0||O.isInstancedMesh&&Et.instancingColor===!0&&O.instanceColor===null||O.isInstancedMesh&&Et.instancingColor===!1&&O.instanceColor!==null||O.isInstancedMesh&&Et.instancingMorph===!0&&O.morphTexture===null||O.isInstancedMesh&&Et.instancingMorph===!1&&O.morphTexture!==null||Et.envMap!==Tt||B.fog===!0&&Et.fog!==ot||Et.numClippingPlanes!==void 0&&(Et.numClippingPlanes!==tt.numPlanes||Et.numIntersection!==tt.numIntersection)||Et.vertexAlphas!==Ot||Et.vertexTangents!==Yt||Et.morphTargets!==Rt||Et.morphNormals!==oe||Et.morphColors!==Pe||Et.toneMapping!==Te||Et.morphTargetsCount!==Qe)&&(Jt=!0):(Jt=!0,Et.__version=B.version);let Wn=Et.currentProgram;Jt===!0&&(Wn=qa(B,D,O));let ei=!1,gs=!1,Ks=!1;const de=Wn.getUniforms(),Ke=Et.uniforms;if(yt.useProgram(Wn.program)&&(ei=!0,gs=!0,Ks=!0),B.id!==Y&&(Y=B.id,gs=!0),ei||z!==M){yt.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),de.setValue(P,"projectionMatrix",M.projectionMatrix),de.setValue(P,"viewMatrix",M.matrixWorldInverse);const qi=de.map.cameraPosition;qi!==void 0&&qi.setValue(P,jt.setFromMatrixPosition(M.matrixWorld)),pe.logarithmicDepthBuffer&&de.setValue(P,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&de.setValue(P,"isOrthographic",M.isOrthographicCamera===!0),z!==M&&(z=M,gs=!0,Ks=!0)}if(Et.needsLights&&(vn.state.directionalShadowMap.length>0&&de.setValue(P,"directionalShadowMap",vn.state.directionalShadowMap,I),vn.state.spotShadowMap.length>0&&de.setValue(P,"spotShadowMap",vn.state.spotShadowMap,I),vn.state.pointShadowMap.length>0&&de.setValue(P,"pointShadowMap",vn.state.pointShadowMap,I)),O.isSkinnedMesh){de.setOptional(P,O,"bindMatrix"),de.setOptional(P,O,"bindMatrixInverse");const Xe=O.skeleton;Xe&&(Xe.boneTexture===null&&Xe.computeBoneTexture(),de.setValue(P,"boneTexture",Xe.boneTexture,I))}O.isBatchedMesh&&(de.setOptional(P,O,"batchingTexture"),de.setValue(P,"batchingTexture",O._matricesTexture,I),de.setOptional(P,O,"batchingIdTexture"),de.setValue(P,"batchingIdTexture",O._indirectTexture,I),de.setOptional(P,O,"batchingColorTexture"),O._colorsTexture!==null&&de.setValue(P,"batchingColorTexture",O._colorsTexture,I));const Yi=G.morphAttributes;if((Yi.position!==void 0||Yi.normal!==void 0||Yi.color!==void 0)&&ht.update(O,G,Wn),(gs||Et.receiveShadow!==O.receiveShadow)&&(Et.receiveShadow=O.receiveShadow,de.setValue(P,"receiveShadow",O.receiveShadow)),(B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial)&&B.envMap===null&&D.environment!==null&&(Ke.envMapIntensity.value=D.environmentIntensity),Ke.dfgLUT!==void 0&&(Ke.dfgLUT.value=MM()),gs&&(de.setValue(P,"toneMappingExposure",E.toneMappingExposure),Et.needsLights&&e_(Ke,Ks),ot&&B.fog===!0&&Pt.refreshFogUniforms(Ke,ot),Pt.refreshMaterialUniforms(Ke,B,Vt,dt,w.state.transmissionRenderTarget[M.id]),Oo.upload(P,yd(Et),Ke,I)),B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(Oo.upload(P,yd(Et),Ke,I),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&de.setValue(P,"center",O.center),de.setValue(P,"modelViewMatrix",O.modelViewMatrix),de.setValue(P,"normalMatrix",O.normalMatrix),de.setValue(P,"modelMatrix",O.matrixWorld),B.isShaderMaterial||B.isRawShaderMaterial){const Xe=B.uniformsGroups;for(let qi=0,Zs=Xe.length;qi<Zs;qi++){const bd=Xe[qi];pt.update(bd,Wn),pt.bind(bd,Wn)}}return Wn}function e_(M,D){M.ambientLightColor.needsUpdate=D,M.lightProbe.needsUpdate=D,M.directionalLights.needsUpdate=D,M.directionalLightShadows.needsUpdate=D,M.pointLights.needsUpdate=D,M.pointLightShadows.needsUpdate=D,M.spotLights.needsUpdate=D,M.spotLightShadows.needsUpdate=D,M.rectAreaLights.needsUpdate=D,M.hemisphereLights.needsUpdate=D}function n_(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return U},this.getRenderTarget=function(){return V},this.setRenderTargetTextures=function(M,D,G){const B=_.get(M);B.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),_.get(M.texture).__webglTexture=D,_.get(M.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:G,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,D){const G=_.get(M);G.__webglFramebuffer=D,G.__useDefaultFramebuffer=D===void 0};const i_=P.createFramebuffer();this.setRenderTarget=function(M,D=0,G=0){V=M,R=D,U=G;let B=null,O=!1,ot=!1;if(M){const ct=_.get(M);if(ct.__useDefaultFramebuffer!==void 0){yt.bindFramebuffer(P.FRAMEBUFFER,ct.__webglFramebuffer),H.copy(M.viewport),N.copy(M.scissor),Q=M.scissorTest,yt.viewport(H),yt.scissor(N),yt.setScissorTest(Q),Y=-1;return}else if(ct.__webglFramebuffer===void 0)I.setupRenderTarget(M);else if(ct.__hasExternalTextures)I.rebindTextures(M,_.get(M.texture).__webglTexture,_.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Ot=M.depthTexture;if(ct.__boundDepthTexture!==Ot){if(Ot!==null&&_.has(Ot)&&(M.width!==Ot.image.width||M.height!==Ot.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(M)}}const St=M.texture;(St.isData3DTexture||St.isDataArrayTexture||St.isCompressedArrayTexture)&&(ot=!0);const Tt=_.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Tt[D])?B=Tt[D][G]:B=Tt[D],O=!0):M.samples>0&&I.useMultisampledRTT(M)===!1?B=_.get(M).__webglMultisampledFramebuffer:Array.isArray(Tt)?B=Tt[G]:B=Tt,H.copy(M.viewport),N.copy(M.scissor),Q=M.scissorTest}else H.copy($).multiplyScalar(Vt).floor(),N.copy(nt).multiplyScalar(Vt).floor(),Q=rt;if(G!==0&&(B=i_),yt.bindFramebuffer(P.FRAMEBUFFER,B)&&yt.drawBuffers(M,B),yt.viewport(H),yt.scissor(N),yt.setScissorTest(Q),O){const ct=_.get(M.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+D,ct.__webglTexture,G)}else if(ot){const ct=D;for(let St=0;St<M.textures.length;St++){const Tt=_.get(M.textures[St]);P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0+St,Tt.__webglTexture,G,ct)}}else if(M!==null&&G!==0){const ct=_.get(M.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,ct.__webglTexture,G)}Y=-1},this.readRenderTargetPixels=function(M,D,G,B,O,ot,ft,ct=0){if(!(M&&M.isWebGLRenderTarget)){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let St=_.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ft!==void 0&&(St=St[ft]),St){yt.bindFramebuffer(P.FRAMEBUFFER,St);try{const Tt=M.textures[ct],Ot=Tt.format,Yt=Tt.type;if(M.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+ct),!pe.textureFormatReadable(Ot)){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!pe.textureTypeReadable(Yt)){Qt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=M.width-B&&G>=0&&G<=M.height-O&&P.readPixels(D,G,B,O,st.convert(Ot),st.convert(Yt),ot)}finally{const Tt=V!==null?_.get(V).__webglFramebuffer:null;yt.bindFramebuffer(P.FRAMEBUFFER,Tt)}}},this.readRenderTargetPixelsAsync=async function(M,D,G,B,O,ot,ft,ct=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let St=_.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ft!==void 0&&(St=St[ft]),St)if(D>=0&&D<=M.width-B&&G>=0&&G<=M.height-O){yt.bindFramebuffer(P.FRAMEBUFFER,St);const Tt=M.textures[ct],Ot=Tt.format,Yt=Tt.type;if(M.textures.length>1&&P.readBuffer(P.COLOR_ATTACHMENT0+ct),!pe.textureFormatReadable(Ot))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!pe.textureTypeReadable(Yt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Rt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,Rt),P.bufferData(P.PIXEL_PACK_BUFFER,ot.byteLength,P.STREAM_READ),P.readPixels(D,G,B,O,st.convert(Ot),st.convert(Yt),0);const oe=V!==null?_.get(V).__webglFramebuffer:null;yt.bindFramebuffer(P.FRAMEBUFFER,oe);const Pe=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await H_(P,Pe,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,Rt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,ot),P.deleteBuffer(Rt),P.deleteSync(Pe),ot}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,D=null,G=0){const B=Math.pow(2,-G),O=Math.floor(M.image.width*B),ot=Math.floor(M.image.height*B),ft=D!==null?D.x:0,ct=D!==null?D.y:0;I.setTexture2D(M,0),P.copyTexSubImage2D(P.TEXTURE_2D,G,0,0,ft,ct,O,ot),yt.unbindTexture()};const s_=P.createFramebuffer(),r_=P.createFramebuffer();this.copyTextureToTexture=function(M,D,G=null,B=null,O=0,ot=0){let ft,ct,St,Tt,Ot,Yt,Rt,oe,Pe;const Te=M.isCompressedTexture?M.mipmaps[ot]:M.image;if(G!==null)ft=G.max.x-G.min.x,ct=G.max.y-G.min.y,St=G.isBox3?G.max.z-G.min.z:1,Tt=G.min.x,Ot=G.min.y,Yt=G.isBox3?G.min.z:0;else{const Ke=Math.pow(2,-O);ft=Math.floor(Te.width*Ke),ct=Math.floor(Te.height*Ke),M.isDataArrayTexture?St=Te.depth:M.isData3DTexture?St=Math.floor(Te.depth*Ke):St=1,Tt=0,Ot=0,Yt=0}B!==null?(Rt=B.x,oe=B.y,Pe=B.z):(Rt=0,oe=0,Pe=0);const ce=st.convert(D.format),Qe=st.convert(D.type);let Et;D.isData3DTexture?(I.setTexture3D(D,0),Et=P.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(I.setTexture2DArray(D,0),Et=P.TEXTURE_2D_ARRAY):(I.setTexture2D(D,0),Et=P.TEXTURE_2D),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,D.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,D.unpackAlignment);const vn=P.getParameter(P.UNPACK_ROW_LENGTH),Jt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Wn=P.getParameter(P.UNPACK_SKIP_PIXELS),ei=P.getParameter(P.UNPACK_SKIP_ROWS),gs=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,Te.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Te.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Tt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Ot),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Yt);const Ks=M.isDataArrayTexture||M.isData3DTexture,de=D.isDataArrayTexture||D.isData3DTexture;if(M.isDepthTexture){const Ke=_.get(M),Yi=_.get(D),Xe=_.get(Ke.__renderTarget),qi=_.get(Yi.__renderTarget);yt.bindFramebuffer(P.READ_FRAMEBUFFER,Xe.__webglFramebuffer),yt.bindFramebuffer(P.DRAW_FRAMEBUFFER,qi.__webglFramebuffer);for(let Zs=0;Zs<St;Zs++)Ks&&(P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,_.get(M).__webglTexture,O,Yt+Zs),P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,_.get(D).__webglTexture,ot,Pe+Zs)),P.blitFramebuffer(Tt,Ot,ft,ct,Rt,oe,ft,ct,P.DEPTH_BUFFER_BIT,P.NEAREST);yt.bindFramebuffer(P.READ_FRAMEBUFFER,null),yt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else if(O!==0||M.isRenderTargetTexture||_.has(M)){const Ke=_.get(M),Yi=_.get(D);yt.bindFramebuffer(P.READ_FRAMEBUFFER,s_),yt.bindFramebuffer(P.DRAW_FRAMEBUFFER,r_);for(let Xe=0;Xe<St;Xe++)Ks?P.framebufferTextureLayer(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Ke.__webglTexture,O,Yt+Xe):P.framebufferTexture2D(P.READ_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Ke.__webglTexture,O),de?P.framebufferTextureLayer(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,Yi.__webglTexture,ot,Pe+Xe):P.framebufferTexture2D(P.DRAW_FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_2D,Yi.__webglTexture,ot),O!==0?P.blitFramebuffer(Tt,Ot,ft,ct,Rt,oe,ft,ct,P.COLOR_BUFFER_BIT,P.NEAREST):de?P.copyTexSubImage3D(Et,ot,Rt,oe,Pe+Xe,Tt,Ot,ft,ct):P.copyTexSubImage2D(Et,ot,Rt,oe,Tt,Ot,ft,ct);yt.bindFramebuffer(P.READ_FRAMEBUFFER,null),yt.bindFramebuffer(P.DRAW_FRAMEBUFFER,null)}else de?M.isDataTexture||M.isData3DTexture?P.texSubImage3D(Et,ot,Rt,oe,Pe,ft,ct,St,ce,Qe,Te.data):D.isCompressedArrayTexture?P.compressedTexSubImage3D(Et,ot,Rt,oe,Pe,ft,ct,St,ce,Te.data):P.texSubImage3D(Et,ot,Rt,oe,Pe,ft,ct,St,ce,Qe,Te):M.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,ot,Rt,oe,ft,ct,ce,Qe,Te.data):M.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,ot,Rt,oe,Te.width,Te.height,ce,Te.data):P.texSubImage2D(P.TEXTURE_2D,ot,Rt,oe,ft,ct,ce,Qe,Te);P.pixelStorei(P.UNPACK_ROW_LENGTH,vn),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,Jt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Wn),P.pixelStorei(P.UNPACK_SKIP_ROWS,ei),P.pixelStorei(P.UNPACK_SKIP_IMAGES,gs),ot===0&&D.generateMipmaps&&P.generateMipmap(Et),yt.unbindTexture()},this.initRenderTarget=function(M){_.get(M).__webglFramebuffer===void 0&&I.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?I.setTextureCube(M,0):M.isData3DTexture?I.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?I.setTexture2DArray(M,0):I.setTexture2D(M,0),yt.unbindTexture()},this.resetState=function(){R=0,U=0,V=null,yt.reset(),et.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const n=this.getContext();n.drawingBufferColorSpace=Kt._getDrawingBufferColorSpace(t),n.unpackColorSpace=Kt._getUnpackColorSpace()}}class yM{constructor(){kt(this,"_listeners",new Map)}on(t,n){return this._listeners.has(t)||this._listeners.set(t,new Set),this._listeners.get(t).add(n),this}off(t,n){var i;return(i=this._listeners.get(t))==null||i.delete(n),this}emit(t,n){var i;(i=this._listeners.get(t))==null||i.forEach(s=>s(n))}removeAllListeners(t){return t?this._listeners.delete(t):this._listeners.clear(),this}}var wr=typeof self<"u"?self:{};function Im(e,t){t:{for(var n=["CLOSURE_FLAGS"],i=wr,s=0;s<n.length;s++)if((i=i[n[s]])==null){n=null;break t}n=i}return(e=n&&n[e])!=null?e:t}function Es(){throw Error("Invalid UTF8")}function Tf(e,t){return t=String.fromCharCode.apply(null,t),e==null?t:e+t}let So,Tl;const EM=typeof TextDecoder<"u";let bM;const AM=typeof TextEncoder<"u";function Dm(e){if(AM)e=(bM||(bM=new TextEncoder)).encode(e);else{let n=0;const i=new Uint8Array(3*e.length);for(let s=0;s<e.length;s++){var t=e.charCodeAt(s);if(t<128)i[n++]=t;else{if(t<2048)i[n++]=t>>6|192;else{if(t>=55296&&t<=57343){if(t<=56319&&s<e.length){const r=e.charCodeAt(++s);if(r>=56320&&r<=57343){t=1024*(t-55296)+r-56320+65536,i[n++]=t>>18|240,i[n++]=t>>12&63|128,i[n++]=t>>6&63|128,i[n++]=63&t|128;continue}s--}t=65533}i[n++]=t>>12|224,i[n++]=t>>6&63|128}i[n++]=63&t|128}}e=n===i.length?i:i.subarray(0,n)}return e}function Um(e){wr.setTimeout(()=>{throw e},0)}var Dh,TM=Im(610401301,!1),wf=Im(748402147,!0);function Rf(){var e=wr.navigator;return e&&(e=e.userAgent)?e:""}const Cf=wr.navigator;function gc(e){return gc[" "](e),e}Dh=Cf&&Cf.userAgentData||null,gc[" "]=function(){};const Nm={};let ga=null;function wM(e){const t=e.length;let n=3*t/4;n%3?n=Math.floor(n):"=.".indexOf(e[t-1])!=-1&&(n="=.".indexOf(e[t-2])!=-1?n-2:n-1);const i=new Uint8Array(n);let s=0;return function(r,a){function o(l){for(;c<r.length;){const u=r.charAt(c++),d=ga[u];if(d!=null)return d;if(!/^[\s\xa0]*$/.test(u))throw Error("Unknown base64 encoding at char: "+u)}return l}Fm();let c=0;for(;;){const l=o(-1),u=o(0),d=o(64),h=o(64);if(h===64&&l===-1)break;a(l<<2|u>>4),d!=64&&(a(u<<4&240|d>>2),h!=64&&a(d<<6&192|h))}}(e,function(r){i[s++]=r}),s!==n?i.subarray(0,s):i}function Fm(){if(!ga){ga={};var e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),t=["+/=","+/","-_=","-_.","-_"];for(let n=0;n<5;n++){const i=e.concat(t[n].split(""));Nm[n]=i;for(let s=0;s<i.length;s++){const r=i[s];ga[r]===void 0&&(ga[r]=s)}}}}var RM=typeof Uint8Array<"u",Om=!(!(TM&&Dh&&Dh.brands.length>0)&&(Rf().indexOf("Trident")!=-1||Rf().indexOf("MSIE")!=-1))&&typeof btoa=="function";const Pf=/[-_.]/g,CM={"-":"+",_:"/",".":"="};function PM(e){return CM[e]||""}function Bm(e){if(!Om)return wM(e);e=Pf.test(e)?e.replace(Pf,PM):e,e=atob(e);const t=new Uint8Array(e.length);for(let n=0;n<e.length;n++)t[n]=e.charCodeAt(n);return t}function pu(e){return RM&&e!=null&&e instanceof Uint8Array}var Rr={};function Ws(){return LM||(LM=new pi(null,Rr))}function mu(e){km(Rr);var t=e.g;return(t=t==null||pu(t)?t:typeof t=="string"?Bm(t):null)==null?t:e.g=t}var pi=class{h(){return new Uint8Array(mu(this)||0)}constructor(e,t){if(km(t),this.g=e,e!=null&&e.length===0)throw Error("ByteString should be constructed with non-empty values")}};let LM,IM;function km(e){if(e!==Rr)throw Error("illegal external caller")}function zm(e,t){e.__closure__error__context__984382||(e.__closure__error__context__984382={}),e.__closure__error__context__984382.severity=t}function Uh(e){return zm(e=Error(e),"warning"),e}function Cr(e,t){if(e!=null){var n=IM??(IM={}),i=n[e]||0;i>=t||(n[e]=i+1,zm(e=Error(),"incident"),Um(e))}}function Xr(){return typeof BigInt=="function"}var Yr=typeof Symbol=="function"&&typeof Symbol()=="symbol";function xi(e,t,n=!1){return typeof Symbol=="function"&&typeof Symbol()=="symbol"?n&&Symbol.for&&e?Symbol.for(e):e!=null?Symbol(e):Symbol():t}var DM=xi("jas",void 0,!0),Lf=xi(void 0,"0di"),da=xi(void 0,"1oa"),bn=xi(void 0,Symbol()),UM=xi(void 0,"0ub"),NM=xi(void 0,"0ubs"),Nh=xi(void 0,"0ubsb"),FM=xi(void 0,"0actk"),Pr=xi("m_m","Pa",!0),If=xi();const Vm={Ga:{value:0,configurable:!0,writable:!0,enumerable:!1}},Gm=Object.defineProperties,bt=Yr?DM:"Ga";var qs;const Df=[];function Oa(e,t){Yr||bt in e||Gm(e,Vm),e[bt]|=t}function He(e,t){Yr||bt in e||Gm(e,Vm),e[bt]=t}function Ba(e){return Oa(e,34),e}function Ta(e){return Oa(e,8192),e}He(Df,7),qs=Object.freeze(Df);var Lr={};function wn(e,t){return t===void 0?e.h!==Xs&&!!(2&(0|e.v[bt])):!!(2&t)&&e.h!==Xs}const Xs={};function gu(e,t){if(e!=null){if(typeof e=="string")e=e?new pi(e,Rr):Ws();else if(e.constructor!==pi)if(pu(e))e=e.length?new pi(new Uint8Array(e),Rr):Ws();else{if(!t)throw Error();e=void 0}}return e}class Uf{constructor(t,n,i){this.g=t,this.h=n,this.l=i}next(){const t=this.g.next();return t.done||(t.value=this.h.call(this.l,t.value)),t}[Symbol.iterator](){return this}}var OM=Object.freeze({});function Hm(e,t,n){const i=128&t?0:-1,s=e.length;var r;(r=!!s)&&(r=(r=e[s-1])!=null&&typeof r=="object"&&r.constructor===Object);const a=s+(r?-1:0);for(t=128&t?1:0;t<a;t++)n(t-i,e[t]);if(r){e=e[s-1];for(const o in e)!isNaN(o)&&n(+o,e[o])}}var Wm={};function qr(e){return 128&e?Wm:void 0}function _c(e){return e.Na=!0,e}var BM=_c(e=>typeof e=="number"),Nf=_c(e=>typeof e=="string"),kM=_c(e=>typeof e=="boolean"),vc=typeof wr.BigInt=="function"&&typeof wr.BigInt(0)=="bigint";function An(e){var t=e;if(Nf(t)){if(!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(t))throw Error(String(t))}else if(BM(t)&&!Number.isSafeInteger(t))throw Error(String(t));return vc?BigInt(e):e=kM(e)?e?"1":"0":Nf(e)?e.trim()||"0":String(e)}var Fh=_c(e=>vc?e>=VM&&e<=HM:e[0]==="-"?Ff(e,zM):Ff(e,GM));const zM=Number.MIN_SAFE_INTEGER.toString(),VM=vc?BigInt(Number.MIN_SAFE_INTEGER):void 0,GM=Number.MAX_SAFE_INTEGER.toString(),HM=vc?BigInt(Number.MAX_SAFE_INTEGER):void 0;function Ff(e,t){if(e.length>t.length)return!1;if(e.length<t.length||e===t)return!0;for(let n=0;n<e.length;n++){const i=e[n],s=t[n];if(i>s)return!1;if(i<s)return!0}}const WM=typeof Uint8Array.prototype.slice=="function";let XM,ye=0,Ne=0;function Of(e){const t=e>>>0;ye=t,Ne=(e-t)/4294967296>>>0}function Ir(e){if(e<0){Of(-e);const[t,n]=xu(ye,Ne);ye=t>>>0,Ne=n>>>0}else Of(e)}function _u(e){const t=XM||(XM=new DataView(new ArrayBuffer(8)));t.setFloat32(0,+e,!0),Ne=0,ye=t.getUint32(0,!0)}function Xm(e,t){const n=4294967296*t+(e>>>0);return Number.isSafeInteger(n)?n:wa(e,t)}function YM(e,t){return An(Xr()?BigInt.asUintN(64,(BigInt(t>>>0)<<BigInt(32))+BigInt(e>>>0)):wa(e,t))}function Ym(e,t){return Xr()?An(BigInt.asIntN(64,(BigInt.asUintN(32,BigInt(t))<<BigInt(32))+BigInt.asUintN(32,BigInt(e)))):An(vu(e,t))}function wa(e,t){if(e>>>=0,(t>>>=0)<=2097151)var n=""+(4294967296*t+e);else Xr()?n=""+(BigInt(t)<<BigInt(32)|BigInt(e)):(e=(16777215&e)+6777216*(n=16777215&(e>>>24|t<<8))+6710656*(t=t>>16&65535),n+=8147497*t,t*=2,e>=1e7&&(n+=e/1e7>>>0,e%=1e7),n>=1e7&&(t+=n/1e7>>>0,n%=1e7),n=t+Bf(n)+Bf(e));return n}function Bf(e){return e=String(e),"0000000".slice(e.length)+e}function vu(e,t){if(2147483648&t)if(Xr())e=""+(BigInt(0|t)<<BigInt(32)|BigInt(e>>>0));else{const[n,i]=xu(e,t);e="-"+wa(n,i)}else e=wa(e,t);return e}function xc(e){if(e.length<16)Ir(Number(e));else if(Xr())e=BigInt(e),ye=Number(e&BigInt(4294967295))>>>0,Ne=Number(e>>BigInt(32)&BigInt(4294967295));else{const t=+(e[0]==="-");Ne=ye=0;const n=e.length;for(let i=t,s=(n-t)%6+t;s<=n;i=s,s+=6){const r=Number(e.slice(i,s));Ne*=1e6,ye=1e6*ye+r,ye>=4294967296&&(Ne+=Math.trunc(ye/4294967296),Ne>>>=0,ye>>>=0)}if(t){const[i,s]=xu(ye,Ne);ye=i,Ne=s}}}function xu(e,t){return t=~t,e?e=1+~e:t+=1,[e,t]}function Kn(e){return Array.prototype.slice.call(e)}const ka=typeof BigInt=="function"?BigInt.asIntN:void 0,qM=typeof BigInt=="function"?BigInt.asUintN:void 0,Ys=Number.isSafeInteger,Mc=Number.isFinite,Dr=Math.trunc,$M=An(0);function _a(e){if(e!=null&&typeof e!="number")throw Error(`Value of float/double field must be a number, found ${typeof e}: ${e}`);return e}function ui(e){return e==null||typeof e=="number"?e:e==="NaN"||e==="Infinity"||e==="-Infinity"?Number(e):void 0}function Ra(e){if(e!=null&&typeof e!="boolean"){var t=typeof e;throw Error(`Expected boolean but got ${t!="object"?t:e?Array.isArray(e)?"array":t:"null"}: ${e}`)}return e}function qm(e){return e==null||typeof e=="boolean"?e:typeof e=="number"?!!e:void 0}const jM=/^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;function za(e){switch(typeof e){case"bigint":return!0;case"number":return Mc(e);case"string":return jM.test(e);default:return!1}}function $r(e){if(e==null)return e;if(typeof e=="string"&&e)e=+e;else if(typeof e!="number")return;return Mc(e)?0|e:void 0}function $m(e){if(e==null)return e;if(typeof e=="string"&&e)e=+e;else if(typeof e!="number")return;return Mc(e)?e>>>0:void 0}function jm(e){const t=e.length;return(e[0]==="-"?t<20||t===20&&e<="-9223372036854775808":t<19||t===19&&e<="9223372036854775807")?e:(xc(e),vu(ye,Ne))}function Mu(e){if(e=Dr(e),!Ys(e)){Ir(e);var t=ye,n=Ne;(e=2147483648&n)&&(n=~n>>>0,(t=1+~t>>>0)==0&&(n=n+1>>>0)),e=typeof(t=Xm(t,n))=="number"?e?-t:t:e?"-"+t:t}return e}function Km(e){var t=Dr(Number(e));return Ys(t)?String(t):((t=e.indexOf("."))!==-1&&(e=e.substring(0,t)),jm(e))}function Zm(e){var t=Dr(Number(e));return Ys(t)?An(t):((t=e.indexOf("."))!==-1&&(e=e.substring(0,t)),Xr()?An(ka(64,BigInt(e))):An(jm(e)))}function Jm(e){return Ys(e)?e=An(Mu(e)):(e=Dr(e),Ys(e)?e=String(e):(Ir(e),e=vu(ye,Ne)),e=An(e)),e}function tc(e){const t=typeof e;return e==null?e:t==="bigint"?An(ka(64,e)):za(e)?t==="string"?Zm(e):Jm(e):void 0}function Qm(e){if(typeof e!="string")throw Error();return e}function Va(e){if(e!=null&&typeof e!="string")throw Error();return e}function Je(e){return e==null||typeof e=="string"?e:void 0}function Su(e,t,n,i){return e!=null&&e[Pr]===Lr?e:Array.isArray(e)?((i=(n=0|e[bt])|32&i|2&i)!==n&&He(e,i),new t(e)):(n?2&i?((e=t[Lf])||(Ba((e=new t).v),e=t[Lf]=e),t=e):t=new t:t=void 0,t)}function KM(e,t,n){if(t)t:{if(!za(t=e))throw Uh("int64");switch(typeof t){case"string":t=Zm(t);break t;case"bigint":t=An(ka(64,t));break t;default:t=Jm(t)}}else t=tc(e);return(e=t)==null?n?$M:void 0:e}const ZM={};let JM=function(){try{return gc(new class extends Map{constructor(){super()}}),!1}catch{return!0}}();class wl{constructor(){this.g=new Map}get(t){return this.g.get(t)}set(t,n){return this.g.set(t,n),this.size=this.g.size,this}delete(t){return t=this.g.delete(t),this.size=this.g.size,t}clear(){this.g.clear(),this.size=this.g.size}has(t){return this.g.has(t)}entries(){return this.g.entries()}keys(){return this.g.keys()}values(){return this.g.values()}forEach(t,n){return this.g.forEach(t,n)}[Symbol.iterator](){return this.entries()}}const QM=JM?(Object.setPrototypeOf(wl.prototype,Map.prototype),Object.defineProperties(wl.prototype,{size:{value:0,configurable:!0,enumerable:!0,writable:!0}}),wl):class extends Map{constructor(){super()}};function kf(e){return e}function Rl(e){if(2&e.J)throw Error("Cannot mutate an immutable Map")}var zi=class extends QM{constructor(e,t,n=kf,i=kf){super(),this.J=0|e[bt],this.K=t,this.S=n,this.fa=this.K?tS:i;for(let s=0;s<e.length;s++){const r=e[s],a=n(r[0],!1,!0);let o=r[1];t?o===void 0&&(o=null):o=i(r[1],!1,!0,void 0,void 0,this.J),super.set(a,o)}}V(e){return Ta(Array.from(super.entries(),e))}clear(){Rl(this),super.clear()}delete(e){return Rl(this),super.delete(this.S(e,!0,!1))}entries(){if(this.K){var e=super.keys();e=new Uf(e,eS,this)}else e=super.entries();return e}values(){if(this.K){var e=super.keys();e=new Uf(e,zi.prototype.get,this)}else e=super.values();return e}forEach(e,t){this.K?super.forEach((n,i,s)=>{e.call(t,s.get(i),i,s)}):super.forEach(e,t)}set(e,t){return Rl(this),(e=this.S(e,!0,!1))==null?this:t==null?(super.delete(e),this):super.set(e,this.fa(t,!0,!0,this.K,!1,this.J))}Ma(e){const t=this.S(e[0],!1,!0);e=e[1],e=this.K?e===void 0?null:e:this.fa(e,!1,!0,void 0,!1,this.J),super.set(t,e)}has(e){return super.has(this.S(e,!1,!1))}get(e){e=this.S(e,!1,!1);const t=super.get(e);if(t!==void 0){var n=this.K;return n?((n=this.fa(t,!1,!0,n,this.ra,this.J))!==t&&super.set(e,n),n):t}}[Symbol.iterator](){return this.entries()}};function tS(e,t,n,i,s,r){return e=Su(e,i,n,r),s&&(e=Eu(e)),e}function eS(e){return[e,this.get(e)]}let nS;function zf(){return nS||(nS=new zi(Ba([]),void 0,void 0,void 0,ZM))}function Sc(e){return bn?e[bn]:void 0}function ec(e,t){for(const n in e)!isNaN(n)&&t(e,+n,e[n])}zi.prototype.toJSON=void 0;var Oh=class{};const iS={Ka:!0};function sS(e,t){t<100||Cr(NM,1)}function yc(e,t,n,i){const s=i!==void 0;i=!!i;var r,a=bn;!s&&Yr&&a&&(r=e[a])&&ec(r,sS),a=[];var o=e.length;let c;r=4294967295;let l=!1;const u=!!(64&t),d=u?128&t?0:-1:void 0;1&t||(c=o&&e[o-1],c!=null&&typeof c=="object"&&c.constructor===Object?r=--o:c=void 0,!u||128&t||s||(l=!0,r=r-d+d)),t=void 0;for(var h=0;h<o;h++){let m=e[h];if(m!=null&&(m=n(m,i))!=null)if(u&&h>=r){const g=h-d;(t??(t={}))[g]=m}else a[h]=m}if(c)for(let m in c){if((o=c[m])==null||(o=n(o,i))==null)continue;let g;h=+m,u&&!Number.isNaN(h)&&(g=h+d)<r?a[g]=o:(t??(t={}))[m]=o}return t&&(l?a.push(t):a[r]=t),s&&bn&&(e=Sc(e))&&e instanceof Oh&&(a[bn]=function(m){const g=new Oh;return ec(m,(x,p,f)=>{g[p]=Kn(f)}),g.da=m.da,g}(e)),a}function rS(e){return e[0]=Ca(e[0]),e[1]=Ca(e[1]),e}function Ca(e){switch(typeof e){case"number":return Number.isFinite(e)?e:""+e;case"bigint":return Fh(e)?Number(e):""+e;case"boolean":return e?1:0;case"object":if(Array.isArray(e)){var t=0|e[bt];return e.length===0&&1&t?void 0:yc(e,t,Ca)}if(e!=null&&e[Pr]===Lr)return t0(e);if(e instanceof pi){if((t=e.g)==null)e="";else if(typeof t=="string")e=t;else{if(Om){for(var n="",i=0,s=t.length-10240;i<s;)n+=String.fromCharCode.apply(null,t.subarray(i,i+=10240));n+=String.fromCharCode.apply(null,i?t.subarray(i):t),t=btoa(n)}else{n===void 0&&(n=0),Fm(),n=Nm[n],i=Array(Math.floor(t.length/3)),s=n[64]||"";let l=0,u=0;for(;l<t.length-2;l+=3){var r=t[l],a=t[l+1],o=t[l+2],c=n[r>>2];r=n[(3&r)<<4|a>>4],a=n[(15&a)<<2|o>>6],o=n[63&o],i[u++]=c+r+a+o}switch(c=0,o=s,t.length-l){case 2:o=n[(15&(c=t[l+1]))<<2]||s;case 1:t=t[l],i[u]=n[t>>2]+n[(3&t)<<4|c>>4]+o+s}t=i.join("")}e=e.g=t}return e}return e instanceof zi?e=e.size!==0?e.V(rS):void 0:void 0}return e}let aS,oS;function t0(e){return yc(e=e.v,0|e[bt],Ca)}function Fs(e,t){return e0(e,t[0],t[1])}function e0(e,t,n,i=0){if(e==null){var s=32;n?(e=[n],s|=128):e=[],t&&(s=-16760833&s|(1023&t)<<14)}else{if(!Array.isArray(e))throw Error("narr");if(s=0|e[bt],wf&&1&s)throw Error("rfarr");if(2048&s&&!(2&s)&&function(){if(wf)throw Error("carr");Cr(FM,5)}(),256&s)throw Error("farr");if(64&s)return(s|i)!==s&&He(e,s|i),e;if(n&&(s|=128,n!==e[0]))throw Error("mid");t:{s|=64;var r=(n=e).length;if(r){var a=r-1;const c=n[a];if(c!=null&&typeof c=="object"&&c.constructor===Object){if((a-=t=128&s?0:-1)>=1024)throw Error("pvtlmt");for(var o in c)(r=+o)<a&&(n[r+t]=c[o],delete c[o]);s=-16760833&s|(1023&a)<<14;break t}}if(t){if((o=Math.max(t,r-(128&s?0:-1)))>1024)throw Error("spvt");s=-16760833&s|(1023&o)<<14}}}return He(e,64|s|i),e}function cS(e,t){if(typeof e!="object")return e;if(Array.isArray(e)){var n=0|e[bt];return e.length===0&&1&n?void 0:Vf(e,n,t)}if(e!=null&&e[Pr]===Lr)return Gf(e);if(e instanceof zi){if(2&(t=e.J))return e;if(!e.size)return;if(n=Ba(e.V()),e.K)for(e=0;e<n.length;e++){const i=n[e];let s=i[1];s=s==null||typeof s!="object"?void 0:s!=null&&s[Pr]===Lr?Gf(s):Array.isArray(s)?Vf(s,0|s[bt],!!(32&t)):void 0,i[1]=s}return n}return e instanceof pi?e:void 0}function Vf(e,t,n){return 2&t||(!n||4096&t||16&t?e=jr(e,t,!1,n&&!(16&t)):(Oa(e,34),4&t&&Object.freeze(e))),e}function yu(e,t,n){return e=new e.constructor(t),n&&(e.h=Xs),e.m=Xs,e}function Gf(e){const t=e.v,n=0|t[bt];return wn(e,n)?e:bu(e,t,n)?yu(e,t):jr(t,n)}function jr(e,t,n,i){return i??(i=!!(34&t)),e=yc(e,t,cS,i),i=32,n&&(i|=2),He(e,t=16769217&t|i),e}function Eu(e){const t=e.v,n=0|t[bt];return wn(e,n)?bu(e,t,n)?yu(e,t,!0):new e.constructor(jr(t,n,!1)):e}function Kr(e){if(e.h!==Xs)return!1;var t=e.v;return Oa(t=jr(t,0|t[bt]),2048),e.v=t,e.h=void 0,e.m=void 0,!0}function Zr(e){if(!Kr(e)&&wn(e,0|e.v[bt]))throw Error()}function $s(e,t){t===void 0&&(t=0|e[bt]),32&t&&!(4096&t)&&He(e,4096|t)}function bu(e,t,n){return!!(2&n)||!(!(32&n)||4096&n)&&(He(t,2|n),e.h=Xs,!0)}const n0=An(0),ts={};function Ee(e,t,n,i,s){if((t=Vi(e.v,t,n,s))!==null||i&&e.m!==Xs)return t}function Vi(e,t,n,i){if(t===-1)return null;const s=t+(n?0:-1),r=e.length-1;let a,o;if(!(r<1+(n?0:-1))){if(s>=r)if(a=e[r],a!=null&&typeof a=="object"&&a.constructor===Object)n=a[t],o=!0;else{if(s!==r)return;n=a}else n=e[s];if(i&&n!=null){if((i=i(n))==null)return i;if(!Object.is(i,n))return o?a[t]=i:e[s]=i,i}return n}}function le(e,t,n,i){Zr(e),ke(e=e.v,0|e[bt],t,n,i)}function ke(e,t,n,i,s){const r=n+(s?0:-1);var a=e.length-1;if(a>=1+(s?0:-1)&&r>=a){const o=e[a];if(o!=null&&typeof o=="object"&&o.constructor===Object)return o[n]=i,t}return r<=a?(e[r]=i,t):(i!==void 0&&(n>=(a=(t??(t=0|e[bt]))>>14&1023||536870912)?i!=null&&(e[a+(s?0:-1)]={[n]:i}):e[r]=i),t)}function Us(){return OM===void 0?2:4}function Ns(e,t,n,i,s){let r=e.v,a=0|r[bt];i=wn(e,a)?1:i,s=!!s||i===3,i===2&&Kr(e)&&(r=e.v,a=0|r[bt]);let o=(e=Au(r,t))===qs?7:0|e[bt],c=Tu(o,a);var l=!(4&c);if(l){4&c&&(e=Kn(e),o=0,c=Bs(c,a),a=ke(r,a,t,e));let u=0,d=0;for(;u<e.length;u++){const h=n(e[u]);h!=null&&(e[d++]=h)}d<u&&(e.length=d),n=-513&(4|c),c=n&=-1025,c&=-4097}return c!==o&&(He(e,c),2&c&&Object.freeze(e)),i0(e,c,r,a,t,i,l,s)}function i0(e,t,n,i,s,r,a,o){let c=t;return r===1||r===4&&(2&t||!(16&t)&&32&i)?Os(t)||((t|=!e.length||a&&!(4096&t)||32&i&&!(4096&t||16&t)?2:256)!==c&&He(e,t),Object.freeze(e)):(r===2&&Os(t)&&(e=Kn(e),c=0,t=Bs(t,i),i=ke(n,i,s,e)),Os(t)||(o||(t|=16),t!==c&&He(e,t))),2&t||!(4096&t||16&t)||$s(n,i),e}function Au(e,t,n){return e=Vi(e,t,n),Array.isArray(e)?e:qs}function Tu(e,t){return 2&t&&(e|=2),1|e}function Os(e){return!!(2&e)&&!!(4&e)||!!(256&e)}function s0(e){return gu(e,!0)}function r0(e){e=Kn(e);for(let t=0;t<e.length;t++){const n=e[t]=Kn(e[t]);Array.isArray(n[1])&&(n[1]=Ba(n[1]))}return Ta(e)}function ns(e,t,n,i){Zr(e),ke(e=e.v,0|e[bt],t,(i==="0"?Number(n)===0:n===i)?void 0:n)}function Jr(e,t,n){if(2&t)throw Error();const i=qr(t);let s=Au(e,n,i),r=s===qs?7:0|s[bt],a=Tu(r,t);return(2&a||Os(a)||16&a)&&(a===r||Os(a)||He(s,a),s=Kn(s),r=0,a=Bs(a,t),ke(e,t,n,s,i)),a&=-13,a!==r&&He(s,a),s}function Cl(e,t){var n=K0;return Ru(wu(e=e.v),e,void 0,n)===t?t:-1}function wu(e){if(Yr)return e[da]??(e[da]=new Map);if(da in e)return e[da];const t=new Map;return Object.defineProperty(e,da,{value:t}),t}function a0(e,t,n,i,s){const r=wu(e),a=Ru(r,e,t,n,s);return a!==i&&(a&&(t=ke(e,t,a,void 0,s)),r.set(n,i)),t}function Ru(e,t,n,i,s){let r=e.get(i);if(r!=null)return r;r=0;for(let a=0;a<i.length;a++){const o=i[a];Vi(t,o,s)!=null&&(r!==0&&(n=ke(t,n,r,void 0,s)),r=o)}return e.set(i,r),r}function Cu(e,t,n){let i=0|e[bt];const s=qr(i),r=Vi(e,n,s);let a;if(r!=null&&r[Pr]===Lr){if(!wn(r))return Kr(r),r.v;a=r.v}else Array.isArray(r)&&(a=r);if(a){const o=0|a[bt];2&o&&(a=jr(a,o))}return a=Fs(a,t),a!==r&&ke(e,i,n,a,s),a}function o0(e,t,n,i,s){let r=!1;if((i=Vi(e,i,s,a=>{const o=Su(a,n,!1,t);return r=o!==a&&o!=null,o}))!=null)return r&&!wn(i)&&$s(e,t),i}function te(e,t,n,i){let s=e.v,r=0|s[bt];if((t=o0(s,r,t,n,i))==null)return t;if(r=0|s[bt],!wn(e,r)){const a=Eu(t);a!==t&&(Kr(e)&&(s=e.v,r=0|s[bt]),r=ke(s,r,n,t=a,i),$s(s,r))}return t}function c0(e,t,n,i,s,r,a,o){var c=wn(e,n);r=c?1:r,a=!!a||r===3,c=o&&!c,(r===2||c)&&Kr(e)&&(n=0|(t=e.v)[bt]);var l=(e=Au(t,s))===qs?7:0|e[bt],u=Tu(l,n);if(o=!(4&u)){var d=e,h=n;const m=!!(2&u);m&&(h|=2);let g=!m,x=!0,p=0,f=0;for(;p<d.length;p++){const S=Su(d[p],i,!1,h);if(S instanceof i){if(!m){const T=wn(S);g&&(g=!T),x&&(x=T)}d[f++]=S}}f<p&&(d.length=f),u|=4,u=x?-4097&u:4096|u,u=g?8|u:-9&u}if(u!==l&&(He(e,u),2&u&&Object.freeze(e)),c&&!(8&u||!e.length&&(r===1||r===4&&(2&u||!(16&u)&&32&n)))){for(Os(u)&&(e=Kn(e),u=Bs(u,n),n=ke(t,n,s,e)),i=e,c=u,l=0;l<i.length;l++)(d=i[l])!==(u=Eu(d))&&(i[l]=u);c|=8,He(e,u=c=i.length?4096|c:-4097&c)}return i0(e,u,t,n,s,r,o,a)}function Gi(e,t,n){const i=e.v;return c0(e,i,0|i[bt],t,n,Us(),!1,!0)}function l0(e){return e==null&&(e=void 0),e}function Lt(e,t,n,i,s){return le(e,n,i=l0(i),s),i&&!wn(i)&&$s(e.v),e}function va(e,t,n,i){t:{var s=i=l0(i);Zr(e);const r=e.v;let a=0|r[bt];if(s==null){const o=wu(r);if(Ru(o,r,a,n)!==t)break t;o.set(n,0)}else a=a0(r,a,n,t);ke(r,a,t,s)}i&&!wn(i)&&$s(e.v)}function Bs(e,t){return-273&(2&t?2|e:-3&e)}function Pu(e,t,n,i){var s=i;Zr(e),e=c0(e,i=e.v,0|i[bt],n,t,2,!0),s=s??new n,e.push(s),t=n=e===qs?7:0|e[bt],(s=wn(s))?(n&=-9,e.length===1&&(n&=-4097)):n|=4096,n!==t&&He(e,n),s||$s(i)}function zn(e,t,n){return $r(Ee(e,t,void 0,n))}function Le(e,t){return Ee(e,t,void 0,void 0,ui)??0}function Hi(e,t,n){if(n!=null){if(typeof n!="number"||!Mc(n))throw Uh("int32");n|=0}le(e,t,n)}function Ct(e,t,n){le(e,t,_a(n))}function Rn(e,t,n){ns(e,t,Va(n),"")}function nc(e,t,n){{Zr(e);const a=e.v;let o=0|a[bt];if(n==null)ke(a,o,t);else{var i=e=n===qs?7:0|n[bt],s=Os(e),r=s||Object.isFrozen(n);for(s||(e=0),r||(n=Kn(n),i=0,e=Bs(e,o),r=!1),e|=5,e|=(4&e?512&e?512:1024&e?1024:0:void 0)??1024,s=0;s<n.length;s++){const c=n[s],l=Qm(c);Object.is(c,l)||(r&&(n=Kn(n),i=0,e=Bs(e,o),r=!1),n[s]=l)}e!==i&&(r&&(n=Kn(n),e=Bs(e,o)),He(n,e)),ke(a,o,t,n)}}}function Ec(e,t,n){Zr(e),Ns(e,t,Je,2,!0).push(Qm(n))}var dr=class{constructor(e,t,n){if(this.buffer=e,n&&!t)throw Error();this.g=t}};function Lu(e,t){if(typeof e=="string")return new dr(Bm(e),t);if(Array.isArray(e))return new dr(new Uint8Array(e),t);if(e.constructor===Uint8Array)return new dr(e,!1);if(e.constructor===ArrayBuffer)return e=new Uint8Array(e),new dr(e,!1);if(e.constructor===pi)return t=mu(e)||new Uint8Array(0),new dr(t,!0,e);if(e instanceof Uint8Array)return e=e.constructor===Uint8Array?e:new Uint8Array(e.buffer,e.byteOffset,e.byteLength),new dr(e,!1);throw Error()}function Iu(e,t){let n,i=0,s=0,r=0;const a=e.h;let o=e.g;do n=a[o++],i|=(127&n)<<r,r+=7;while(r<32&&128&n);if(r>32)for(s|=(127&n)>>4,r=3;r<32&&128&n;r+=7)n=a[o++],s|=(127&n)<<r;if(ks(e,o),!(128&n))return t(i>>>0,s>>>0);throw Error()}function Du(e){let t=0,n=e.g;const i=n+10,s=e.h;for(;n<i;){const r=s[n++];if(t|=r,(128&r)==0)return ks(e,n),!!(127&t)}throw Error()}function ds(e){const t=e.h;let n=e.g,i=t[n++],s=127&i;if(128&i&&(i=t[n++],s|=(127&i)<<7,128&i&&(i=t[n++],s|=(127&i)<<14,128&i&&(i=t[n++],s|=(127&i)<<21,128&i&&(i=t[n++],s|=i<<28,128&i&&128&t[n++]&&128&t[n++]&&128&t[n++]&&128&t[n++]&&128&t[n++])))))throw Error();return ks(e,n),s}function vi(e){return ds(e)>>>0}function ic(e){var t=e.h;const n=e.g;var i=t[n],s=t[n+1];const r=t[n+2];return t=t[n+3],ks(e,e.g+4),e=2*((s=(i<<0|s<<8|r<<16|t<<24)>>>0)>>31)+1,i=s>>>23&255,s&=8388607,i==255?s?NaN:e*(1/0):i==0?1401298464324817e-60*e*s:e*Math.pow(2,i-150)*(s+8388608)}function lS(e){return ds(e)}function ks(e,t){if(e.g=t,t>e.l)throw Error()}function h0(e,t){if(t<0)throw Error();const n=e.g;if((t=n+t)>e.l)throw Error();return e.g=t,n}function u0(e,t){if(t==0)return Ws();var n=h0(e,t);return e.Y&&e.j?n=e.h.subarray(n,n+t):(e=e.h,n=n===(t=n+t)?new Uint8Array(0):WM?e.slice(n,t):new Uint8Array(e.subarray(n,t))),n.length==0?Ws():new pi(n,Rr)}var Hf=[];function d0(e,t,n,i){if(sc.length){const s=sc.pop();return s.o(i),s.g.init(e,t,n,i),s}return new hS(e,t,n,i)}function f0(e){e.g.clear(),e.l=-1,e.h=-1,sc.length<100&&sc.push(e)}function p0(e){var t=e.g;if(t.g==t.l)return!1;e.m=e.g.g;var n=vi(e.g);if(t=n>>>3,!((n&=7)>=0&&n<=5)||t<1)throw Error();return e.l=t,e.h=n,!0}function Bo(e){switch(e.h){case 0:e.h!=0?Bo(e):Du(e.g);break;case 1:ks(e=e.g,e.g+8);break;case 2:if(e.h!=2)Bo(e);else{var t=vi(e.g);ks(e=e.g,e.g+t)}break;case 5:ks(e=e.g,e.g+4);break;case 3:for(t=e.l;;){if(!p0(e))throw Error();if(e.h==4){if(e.l!=t)throw Error();break}Bo(e)}break;default:throw Error()}}function Ga(e,t,n){const i=e.g.l;var s=vi(e.g);let r=(s=e.g.g+s)-i;if(r<=0&&(e.g.l=s,n(t,e,void 0,void 0,void 0),r=s-e.g.g),r)throw Error();return e.g.g=s,e.g.l=i,t}function Uu(e){var t=vi(e.g),n=h0(e=e.g,t);if(e=e.h,EM){var i,s=e;(i=Tl)||(i=Tl=new TextDecoder("utf-8",{fatal:!0})),t=n+t,s=n===0&&t===s.length?s:s.subarray(n,t);try{var r=i.decode(s)}catch(o){if(So===void 0){try{i.decode(new Uint8Array([128]))}catch{}try{i.decode(new Uint8Array([97])),So=!0}catch{So=!1}}throw!So&&(Tl=void 0),o}}else{t=(r=n)+t,n=[];let o,c=null;for(;r<t;){var a=e[r++];a<128?n.push(a):a<224?r>=t?Es():(o=e[r++],a<194||(192&o)!=128?(r--,Es()):n.push((31&a)<<6|63&o)):a<240?r>=t-1?Es():(o=e[r++],(192&o)!=128||a===224&&o<160||a===237&&o>=160||(192&(i=e[r++]))!=128?(r--,Es()):n.push((15&a)<<12|(63&o)<<6|63&i)):a<=244?r>=t-2?Es():(o=e[r++],(192&o)!=128||o-144+(a<<28)>>30||(192&(i=e[r++]))!=128||(192&(s=e[r++]))!=128?(r--,Es()):(a=(7&a)<<18|(63&o)<<12|(63&i)<<6|63&s,a-=65536,n.push(55296+(a>>10&1023),56320+(1023&a)))):Es(),n.length>=8192&&(c=Tf(c,n),n.length=0)}r=Tf(c,n)}return r}function m0(e){const t=vi(e.g);return u0(e.g,t)}function bc(e,t,n){var i=vi(e.g);for(i=e.g.g+i;e.g.g<i;)n.push(t(e.g))}var hS=class{constructor(e,t,n,i){if(Hf.length){const s=Hf.pop();s.init(e,t,n,i),e=s}else e=new class{constructor(s,r,a,o){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.init(s,r,a,o)}init(s,r,a,{Y:o=!1,ea:c=!1}={}){this.Y=o,this.ea=c,s&&(s=Lu(s,this.ea),this.h=s.buffer,this.j=s.g,this.m=r||0,this.l=a!==void 0?this.m+a:this.h.length,this.g=this.m)}clear(){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.Y=!1}}(e,t,n,i);this.g=e,this.m=this.g.g,this.h=this.l=-1,this.o(i)}o({ha:e=!1}={}){this.ha=e}},sc=[];function Wf(e){return e?/^\d+$/.test(e)?(xc(e),new Bh(ye,Ne)):null:uS||(uS=new Bh(0,0))}var Bh=class{constructor(e,t){this.h=e>>>0,this.g=t>>>0}};let uS;function Xf(e){return e?/^-?\d+$/.test(e)?(xc(e),new kh(ye,Ne)):null:dS||(dS=new kh(0,0))}var kh=class{constructor(e,t){this.h=e>>>0,this.g=t>>>0}};let dS;function vr(e,t,n){for(;n>0||t>127;)e.g.push(127&t|128),t=(t>>>7|n<<25)>>>0,n>>>=7;e.g.push(t)}function Qr(e,t){for(;t>127;)e.g.push(127&t|128),t>>>=7;e.g.push(t)}function Ac(e,t){if(t>=0)Qr(e,t);else{for(let n=0;n<9;n++)e.g.push(127&t|128),t>>=7;e.g.push(1)}}function Nu(e){var t=ye;e.g.push(t>>>0&255),e.g.push(t>>>8&255),e.g.push(t>>>16&255),e.g.push(t>>>24&255)}function Ur(e,t){t.length!==0&&(e.l.push(t),e.h+=t.length)}function Gn(e,t,n){Qr(e.g,8*t+n)}function Fu(e,t){return Gn(e,t,2),t=e.g.end(),Ur(e,t),t.push(e.h),t}function Ou(e,t){var n=t.pop();for(n=e.h+e.g.length()-n;n>127;)t.push(127&n|128),n>>>=7,e.h++;t.push(n),e.h++}function Tc(e,t,n){Gn(e,t,2),Qr(e.g,n.length),Ur(e,e.g.end()),Ur(e,n)}function rc(e,t,n,i){n!=null&&(t=Fu(e,t),i(n,e),Ou(e,t))}function Mi(){const e=class{constructor(){throw Error()}};return Object.setPrototypeOf(e,e.prototype),e}var Bu=Mi(),g0=Mi(),ku=Mi(),zu=Mi(),Vu=Mi(),_0=Mi(),fS=Mi(),wc=Mi(),v0=Mi(),x0=Mi();function Si(e,t,n){var i=e.v;bn&&bn in i&&(i=i[bn])&&delete i[t.g],t.h?t.j(e,t.h,t.g,n,t.l):t.j(e,t.g,n,t.l)}var At=class{constructor(e,t){this.v=e0(e,t,void 0,2048)}toJSON(){return t0(this)}j(){var s;var e=$S,t=this.v,n=e.g,i=bn;if(Yr&&i&&((s=t[i])==null?void 0:s[n])!=null&&Cr(UM,3),t=e.g,If&&bn&&If===void 0&&(i=(n=this.v)[bn])&&(i=i.da))try{i(n,t,iS)}catch(r){Um(r)}return e.h?e.m(this,e.h,e.g,e.l):e.m(this,e.g,e.defaultValue,e.l)}clone(){const e=this.v,t=0|e[bt];return bu(this,e,t)?yu(this,e,!0):new this.constructor(jr(e,t,!1))}};At.prototype[Pr]=Lr,At.prototype.toString=function(){return this.v.toString()};var ta=class{constructor(e,t,n){this.g=e,this.h=t,e=Bu,this.l=!!e&&n===e||!1}};function Rc(e,t){return new ta(e,t,Bu)}function M0(e,t,n,i,s){rc(e,n,b0(t,i),s)}const pS=Rc(function(e,t,n,i,s){return e.h===2&&(Ga(e,Cu(t,i,n),s),!0)},M0),mS=Rc(function(e,t,n,i,s){return e.h===2&&(Ga(e,Cu(t,i,n),s),!0)},M0);var Cc=Symbol(),Pc=Symbol(),zh=Symbol(),Yf=Symbol(),qf=Symbol();let S0,y0;function js(e,t,n,i){var s=i[e];if(s)return s;(s={}).qa=i,s.T=function(d){switch(typeof d){case"boolean":return aS||(aS=[0,void 0,!0]);case"number":return d>0?void 0:d===0?oS||(oS=[0,void 0]):[-d,void 0];case"string":return[0,d];case"object":return d}}(i[0]);var r=i[1];let a=1;r&&r.constructor===Object&&(s.ba=r,typeof(r=i[++a])=="function"&&(s.ma=!0,S0??(S0=r),y0??(y0=i[a+1]),r=i[a+=2]));const o={};for(;r&&Array.isArray(r)&&r.length&&typeof r[0]=="number"&&r[0]>0;){for(var c=0;c<r.length;c++)o[r[c]]=r;r=i[++a]}for(c=1;r!==void 0;){let d;typeof r=="number"&&(c+=r,r=i[++a]);var l=void 0;if(r instanceof ta?d=r:(d=pS,a--),d==null?void 0:d.l){r=i[++a],l=i;var u=a;typeof r=="function"&&(r=r(),l[u]=r),l=r}for(u=c+1,typeof(r=i[++a])=="number"&&r<0&&(u-=r,r=i[++a]);c<u;c++){const h=o[c];l?n(s,c,d,l,h):t(s,c,d,h)}}return i[e]=s}function E0(e){return Array.isArray(e)?e[0]instanceof ta?e:[mS,e]:[e,void 0]}function b0(e,t){return e instanceof At?e.v:Array.isArray(e)?Fs(e,t):void 0}function Gu(e,t,n,i){const s=n.g;e[t]=i?(r,a,o)=>s(r,a,o,i):s}function Hu(e,t,n,i,s){const r=n.g;let a,o;e[t]=(c,l,u)=>r(c,l,u,o||(o=js(Pc,Gu,Hu,i).T),a||(a=Wu(i)),s)}function Wu(e){let t=e[zh];if(t!=null)return t;const n=js(Pc,Gu,Hu,e);return t=n.ma?(i,s)=>S0(i,s,n):(i,s)=>{for(;p0(s)&&s.h!=4;){var r=s.l,a=n[r];if(a==null){var o=n.ba;o&&(o=o[r])&&(o=_S(o))!=null&&(a=n[r]=o)}if(a==null||!a(s,i,r)){if(a=(o=s).m,Bo(o),o.ha)var c=void 0;else c=o.g.g-a,o.g.g=a,c=u0(o.g,c);a=void 0,o=i,c&&((a=o[bn]??(o[bn]=new Oh))[r]??(a[r]=[])).push(c)}}return(i=Sc(i))&&(i.da=n.qa[qf]),!0},e[zh]=t,e[qf]=gS.bind(e),t}function gS(e,t,n,i){var s=this[Pc];const r=this[zh],a=Fs(void 0,s.T),o=Sc(e);if(o){var c=!1,l=s.ba;if(l){if(s=(u,d,h)=>{if(h.length!==0)if(l[d])for(const m of h){u=d0(m);try{c=!0,r(a,u)}finally{f0(u)}}else i==null||i(e,d,h)},t==null)ec(o,s);else if(o!=null){const u=o[t];u&&s(o,t,u)}if(c){let u=0|e[bt];if(2&u&&2048&u&&!(n!=null&&n.Ka))throw Error();const d=qr(u),h=(m,g)=>{if(Vi(e,m,d)!=null){if((n==null?void 0:n.Qa)===1)return;throw Error()}g!=null&&(u=ke(e,u,m,g,d)),delete o[m]};t==null?Hm(a,0|a[bt],(m,g)=>{h(m,g)}):h(t,Vi(a,t,d))}}}}function _S(e){const t=(e=E0(e))[0].g;if(e=e[1]){const n=Wu(e),i=js(Pc,Gu,Hu,e).T;return(s,r,a)=>t(s,r,a,i,n)}return t}function Lc(e,t,n){e[t]=n.h}function Ic(e,t,n,i){let s,r;const a=n.h;e[t]=(o,c,l)=>a(o,c,l,r||(r=js(Cc,Lc,Ic,i).T),s||(s=A0(i)))}function A0(e){let t=e[Yf];if(!t){const n=js(Cc,Lc,Ic,e);t=(i,s)=>T0(i,s,n),e[Yf]=t}return t}function T0(e,t,n){Hm(e,0|e[bt],(i,s)=>{if(s!=null){var r=function(a,o){var c=a[o];if(c)return c;if((c=a.ba)&&(c=c[o])){var l=(c=E0(c))[0].h;if(c=c[1]){const u=A0(c),d=js(Cc,Lc,Ic,c).T;c=a.ma?y0(d,u):(h,m,g)=>l(h,m,g,d,u)}else c=l;return a[o]=c}}(n,i);r?r(t,s,i):i<500||Cr(Nh,3)}}),(e=Sc(e))&&ec(e,(i,s,r)=>{for(Ur(t,t.g.end()),i=0;i<r.length;i++)Ur(t,mu(r[i])||new Uint8Array(0))})}const vS=An(0);function ea(e,t){if(Array.isArray(t)){var n=0|t[bt];if(4&n)return t;for(var i=0,s=0;i<t.length;i++){const r=e(t[i]);r!=null&&(t[s++]=r)}return s<i&&(t.length=s),(e=-1537&(5|n))!==n&&He(t,e),2&e&&Object.freeze(t),t}}function cn(e,t,n){return new ta(e,t,n)}function na(e,t,n){return new ta(e,t,n)}function ln(e,t,n){ke(e,0|e[bt],t,n,qr(0|e[bt]))}var xS=Rc(function(e,t,n,i,s){if(e.h!==2)return!1;if(e=Kn(e=Ga(e,Fs([void 0,void 0],i),s)),s=qr(i=0|t[bt]),2&i)throw Error();let r=Vi(t,n,s);if(r instanceof zi)2&r.J?(r=r.V(),r.push(e),ke(t,i,n,r,s)):r.Ma(e);else if(Array.isArray(r)){var a=0|r[bt];8192&a||He(r,a|=8192),2&a&&(r=r0(r),ke(t,i,n,r,s)),r.push(e)}else ke(t,i,n,Ta([e]),s);return!0},function(e,t,n,i,s){if(t instanceof zi)t.forEach((r,a)=>{rc(e,n,Fs([a,r],i),s)});else if(Array.isArray(t)){for(let r=0;r<t.length;r++){const a=t[r];Array.isArray(a)&&rc(e,n,Fs(a,i),s)}Ta(t)}});function w0(e,t,n){(t=ui(t))!=null&&(Gn(e,n,5),e=e.g,_u(t),Nu(e))}function R0(e,t,n){if(t=function(i){if(i==null)return i;const s=typeof i;if(s==="bigint")return String(ka(64,i));if(za(i)){if(s==="string")return Km(i);if(s==="number")return Mu(i)}}(t),t!=null&&(typeof t=="string"&&Xf(t),t!=null))switch(Gn(e,n,0),typeof t){case"number":e=e.g,Ir(t),vr(e,ye,Ne);break;case"bigint":n=BigInt.asUintN(64,t),n=new kh(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),vr(e.g,n.h,n.g);break;default:n=Xf(t),vr(e.g,n.h,n.g)}}function C0(e,t,n){(t=$r(t))!=null&&t!=null&&(Gn(e,n,0),Ac(e.g,t))}function P0(e,t,n){(t=qm(t))!=null&&(Gn(e,n,0),e.g.g.push(t?1:0))}function L0(e,t,n){(t=Je(t))!=null&&Tc(e,n,Dm(t))}function I0(e,t,n,i,s){rc(e,n,b0(t,i),s)}function D0(e,t,n){(t=t==null||typeof t=="string"||t instanceof pi?t:void 0)!=null&&Tc(e,n,Lu(t,!0).buffer)}function U0(e,t,n){(t=$m(t))!=null&&t!=null&&(Gn(e,n,0),Qr(e.g,t))}function N0(e,t,n){return(e.h===5||e.h===2)&&(t=Jr(t,0|t[bt],n),e.h==2?bc(e,ic,t):t.push(ic(e.g)),!0)}var Fe=cn(function(e,t,n){return e.h===5&&(ln(t,n,ic(e.g)),!0)},w0,wc),MS=na(N0,function(e,t,n){if((t=ea(ui,t))!=null)for(let a=0;a<t.length;a++){var i=e,s=n,r=t[a];r!=null&&(Gn(i,s,5),i=i.g,_u(r),Nu(i))}},wc),Xu=na(N0,function(e,t,n){if((t=ea(ui,t))!=null&&t.length){Gn(e,n,2),Qr(e.g,4*t.length);for(let i=0;i<t.length;i++)n=e.g,_u(t[i]),Nu(n)}},wc),SS=cn(function(e,t,n){return e.h===5&&(ln(t,n,(e=ic(e.g))===0?void 0:e),!0)},w0,wc),fs=cn(function(e,t,n){return e.h!==0?e=!1:(ln(t,n,Iu(e.g,Ym)),e=!0),e},R0,_0),Pl=cn(function(e,t,n){return e.h!==0?t=!1:(ln(t,n,(e=Iu(e.g,Ym))===vS?void 0:e),t=!0),t},R0,_0),yS=cn(function(e,t,n){return e.h!==0?e=!1:(ln(t,n,Iu(e.g,YM)),e=!0),e},function(e,t,n){if(t=function(i){if(i==null)return i;var s=typeof i;if(s==="bigint")return String(qM(64,i));if(za(i)){if(s==="string")return s=Dr(Number(i)),Ys(s)&&s>=0?i=String(s):((s=i.indexOf("."))!==-1&&(i=i.substring(0,s)),(s=i[0]!=="-"&&((s=i.length)<20||s===20&&i<="18446744073709551615"))||(xc(i),i=wa(ye,Ne))),i;if(s==="number")return(i=Dr(i))>=0&&Ys(i)||(Ir(i),i=Xm(ye,Ne)),i}}(t),t!=null&&(typeof t=="string"&&Wf(t),t!=null))switch(Gn(e,n,0),typeof t){case"number":e=e.g,Ir(t),vr(e,ye,Ne);break;case"bigint":n=BigInt.asUintN(64,t),n=new Bh(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),vr(e.g,n.h,n.g);break;default:n=Wf(t),vr(e.g,n.h,n.g)}},fS),Be=cn(function(e,t,n){return e.h===0&&(ln(t,n,ds(e.g)),!0)},C0,zu),Ha=na(function(e,t,n){return(e.h===0||e.h===2)&&(t=Jr(t,0|t[bt],n),e.h==2?bc(e,ds,t):t.push(ds(e.g)),!0)},function(e,t,n){if((t=ea($r,t))!=null&&t.length){n=Fu(e,n);for(let i=0;i<t.length;i++)Ac(e.g,t[i]);Ou(e,n)}},zu),mr=cn(function(e,t,n){return e.h===0&&(ln(t,n,(e=ds(e.g))===0?void 0:e),!0)},C0,zu),be=cn(function(e,t,n){return e.h===0&&(ln(t,n,Du(e.g)),!0)},P0,g0),zs=cn(function(e,t,n){return e.h===0&&(ln(t,n,(e=Du(e.g))===!1?void 0:e),!0)},P0,g0),nn=na(function(e,t,n){return e.h===2&&(e=Uu(e),Jr(t,0|t[bt],n).push(e),!0)},function(e,t,n){if((t=ea(Je,t))!=null)for(let a=0;a<t.length;a++){var i=e,s=n,r=t[a];r!=null&&Tc(i,s,Dm(r))}},ku),ss=cn(function(e,t,n){return e.h===2&&(ln(t,n,(e=Uu(e))===""?void 0:e),!0)},L0,ku),fe=cn(function(e,t,n){return e.h===2&&(ln(t,n,Uu(e)),!0)},L0,ku),$e=function(e,t,n=Bu){return new ta(e,t,n)}(function(e,t,n,i,s){return e.h===2&&(i=Fs(void 0,i),Jr(t,0|t[bt],n).push(i),Ga(e,i,s),!0)},function(e,t,n,i,s){if(Array.isArray(t)){for(let r=0;r<t.length;r++)I0(e,t[r],n,i,s);1&(e=0|t[bt])||He(t,1|e)}}),xe=Rc(function(e,t,n,i,s,r){if(e.h!==2)return!1;let a=0|t[bt];return a0(t,a,r,n,qr(a)),Ga(e,t=Cu(t,i,n),s),!0},I0),F0=cn(function(e,t,n){return e.h===2&&(ln(t,n,m0(e)),!0)},D0,v0),ES=na(function(e,t,n){return(e.h===0||e.h===2)&&(t=Jr(t,0|t[bt],n),e.h==2?bc(e,vi,t):t.push(vi(e.g)),!0)},function(e,t,n){if((t=ea($m,t))!=null)for(let a=0;a<t.length;a++){var i=e,s=n,r=t[a];r!=null&&(Gn(i,s,0),Qr(i.g,r))}},Vu),bS=cn(function(e,t,n){return e.h===0&&(ln(t,n,(e=vi(e.g))===0?void 0:e),!0)},U0,Vu),sn=cn(function(e,t,n){return e.h===0&&(ln(t,n,ds(e.g)),!0)},function(e,t,n){(t=$r(t))!=null&&(t=parseInt(t,10),Gn(e,n,0),Ac(e.g,t))},x0);class AS{constructor(t,n){var i=Pn;this.g=t,this.h=n,this.m=te,this.j=Lt,this.defaultValue=void 0,this.l=i.Oa!=null?Wm:void 0}register(){gc(this)}}function yi(e,t){return new AS(e,t)}function ps(e,t){return(n,i)=>{{const r={ea:!0};i&&Object.assign(r,i),n=d0(n,void 0,void 0,r);try{const a=new e,o=a.v;Wu(t)(o,n);var s=a}finally{f0(n)}}return s}}function Dc(e){return function(){const t=new class{constructor(){this.l=[],this.h=0,this.g=new class{constructor(){this.g=[]}length(){return this.g.length}end(){const a=this.g;return this.g=[],a}}}};T0(this.v,t,js(Cc,Lc,Ic,e)),Ur(t,t.g.end());const n=new Uint8Array(t.h),i=t.l,s=i.length;let r=0;for(let a=0;a<s;a++){const o=i[a];n.set(o,r),r+=o.length}return t.l=[n],n}}var $f=class extends At{constructor(e){super(e)}},jf=[0,ss,cn(function(e,t,n){return e.h===2&&(ln(t,n,(e=m0(e))===Ws()?void 0:e),!0)},function(e,t,n){if(t!=null){if(t instanceof At){const i=t.Ra;return void(i?(t=i(t),t!=null&&Tc(e,n,Lu(t,!0).buffer)):Cr(Nh,3))}if(Array.isArray(t))return void Cr(Nh,3)}D0(e,t,n)},v0)];let Ll,Kf=globalThis.trustedTypes;function Zf(e){var t;return Ll===void 0&&(Ll=function(){let n=null;if(!Kf)return n;try{const i=s=>s;n=Kf.createPolicy("goog#html",{createHTML:i,createScript:i,createScriptURL:i})}catch{}return n}()),e=(t=Ll)?t.createScriptURL(e):e,new class{constructor(n){this.g=n}toString(){return this.g+""}}(e)}function yo(e,...t){if(t.length===0)return Zf(e[0]);let n=e[0];for(let i=0;i<t.length;i++)n+=encodeURIComponent(t[i])+e[i+1];return Zf(n)}var O0=[0,Be,sn,be,-1,Ha,sn,-1,be],TS=class extends At{constructor(e){super(e)}},B0=[0,be,fe,be,sn,-1,na(function(e,t,n){return(e.h===0||e.h===2)&&(t=Jr(t,0|t[bt],n),e.h==2?bc(e,lS,t):t.push(ds(e.g)),!0)},function(e,t,n){if((t=ea($r,t))!=null&&t.length){n=Fu(e,n);for(let i=0;i<t.length;i++)Ac(e.g,t[i]);Ou(e,n)}},x0),fe,-1,[0,be,-1],sn,be,-1],k0=[0,3,be,-1,2,[0,[2],Be,xe,[0,cn(function(e,t,n){return e.h===0&&(ln(t,n,vi(e.g)),!0)},U0,Vu)]],[0,sn,be,sn,be,sn,be,fe,-1],[0,[3,4],fe,-1,xe,[0,Be],xe,[0,sn]],[0]],z0=[0,fe,-2],Jf=class extends At{constructor(e){super(e)}},V0=[0],G0=[0,Be,be,1,be,-4],Pn=class extends At{constructor(e){super(e,2)}},ze={};ze[336783863]=[0,fe,be,-1,Be,[0,[1,2,3,4,5,6,7,8,9],xe,V0,xe,B0,xe,z0,xe,G0,xe,O0,xe,[0,fe,-2],xe,[0,fe,sn],xe,k0,xe,[0,sn,-1,be]],[0,fe],be,[0,[1,3],[2,4],xe,[0,Ha],-1,xe,[0,nn],-1,$e,[0,fe,-1]],fe];var Qf=[0,Pl,-1,zs,-3,Pl,Ha,ss,mr,Pl,-1,zs,mr,zs,-2,ss];function Me(e,t){Ec(e,3,t)}function $t(e,t){Ec(e,4,t)}var _n=class extends At{constructor(e){super(e,500)}o(e){return Lt(this,0,7,e)}},xa=[-1,{}],tp=[0,fe,1,xa],ep=[0,fe,nn,xa];function Hn(e,t){Pu(e,1,_n,t)}function Ae(e,t){Ec(e,10,t)}function ee(e,t){Ec(e,15,t)}var Ln=class extends At{constructor(e){super(e,500)}o(e){return Lt(this,0,1001,e)}},H0=[-500,$e,[-500,ss,-1,nn,-3,[-2,ze,be],$e,jf,mr,-1,tp,ep,$e,[0,ss,zs],ss,Qf,mr,nn,987,nn],4,$e,[-500,fe,-1,[-1,{}],998,fe],$e,[-500,fe,nn,-1,[-2,{},be],997,nn,-1],mr,$e,[-500,fe,nn,xa,998,nn],nn,mr,tp,ep,$e,[0,ss,-1,xa],nn,-2,Qf,ss,-1,zs,[0,zs,bS],978,xa,$e,jf];Ln.prototype.g=Dc(H0);var wS=ps(Ln,H0),RS=class extends At{constructor(e){super(e)}},W0=class extends At{constructor(e){super(e)}g(){return Gi(this,RS,1)}},X0=[0,$e,[0,Be,Fe,fe,-1]],Uc=ps(W0,X0),CS=class extends At{constructor(e){super(e)}},PS=class extends At{constructor(e){super(e)}},Il=class extends At{constructor(e){super(e)}l(){return te(this,CS,2)}g(){return Gi(this,PS,5)}},Y0=ps(class extends At{constructor(e){super(e)}},[0,nn,Ha,Xu,[0,sn,[0,Be,-3],[0,Fe,-3],[0,Be,-1,[0,$e,[0,Be,-2]]],$e,[0,Fe,-1,fe,Fe]],fe,-1,fs,$e,[0,Be,Fe],nn,fs]),q0=class extends At{constructor(e){super(e)}},xr=ps(class extends At{constructor(e){super(e)}},[0,$e,[0,Fe,-4]]),$0=class extends At{constructor(e){super(e)}},Wa=ps(class extends At{constructor(e){super(e)}},[0,$e,[0,Fe,-4]]),LS=class extends At{constructor(e){super(e)}},IS=[0,Be,-1,Xu,sn],j0=class extends At{constructor(e){super(e)}};j0.prototype.g=Dc([0,Fe,-4,fs]);var DS=class extends At{constructor(e){super(e)}},US=ps(class extends At{constructor(e){super(e)}},[0,$e,[0,1,Be,fe,X0],fs]),np=class extends At{constructor(e){super(e)}},NS=class extends At{constructor(e){super(e)}na(){const e=Ee(this,1,void 0,void 0,s0);return e??Ws()}},FS=class extends At{constructor(e){super(e)}},K0=[1,2],OS=ps(class extends At{constructor(e){super(e)}},[0,$e,[0,K0,xe,[0,Xu],xe,[0,F0],Be,fe],fs]),Yu=class extends At{constructor(e){super(e)}},Z0=[0,fe,Be,Fe,nn,-1],ip=class extends At{constructor(e){super(e)}},BS=[0,be,-1],sp=class extends At{constructor(e){super(e)}},ko=[1,2,3,4,5,6],ac=class extends At{constructor(e){super(e)}g(){return Ee(this,1,void 0,void 0,s0)!=null}l(){return Je(Ee(this,2))!=null}},Re=class extends At{constructor(e){super(e)}g(){return qm(Ee(this,2))??!1}},J0=[0,F0,fe,[0,Be,fs,-1],[0,yS,fs]],Oe=[0,J0,be,[0,ko,xe,G0,xe,B0,xe,O0,xe,V0,xe,z0,xe,k0],sn],Nc=class extends At{constructor(e){super(e)}},qu=[0,Oe,Fe,-1,Be],kS=yi(502141897,Nc);ze[502141897]=qu;var zS=ps(class extends At{constructor(e){super(e)}},[0,[0,sn,-1,MS,ES],IS]),Q0=class extends At{constructor(e){super(e)}},tg=class extends At{constructor(e){super(e)}},Vh=[0,Oe,Fe,[0,Oe],be],VS=yi(508968150,tg);ze[508968150]=[0,Oe,qu,Vh,Fe,[0,[0,J0]]],ze[508968149]=Vh;var fr=class extends At{constructor(e){super(e)}l(){return te(this,Yu,2)}g(){le(this,2)}},eg=[0,Oe,Z0];ze[478825465]=eg;var GS=class extends At{constructor(e){super(e)}},ng=class extends At{constructor(e){super(e)}},$u=class extends At{constructor(e){super(e)}},ju=class extends At{constructor(e){super(e)}},ig=class extends At{constructor(e){super(e)}},rp=[0,Oe,[0,Oe],eg,-1],sg=[0,Oe,Fe,Be],Ku=[0,Oe,Fe],rg=[0,Oe,sg,Ku,Fe],HS=yi(479097054,ig);ze[479097054]=[0,Oe,rg,rp],ze[463370452]=rp,ze[464864288]=sg;var WS=yi(462713202,ju);ze[462713202]=rg,ze[474472470]=Ku;var XS=class extends At{constructor(e){super(e)}},ag=class extends At{constructor(e){super(e)}},og=class extends At{constructor(e){super(e)}},cg=class extends At{constructor(e){super(e)}},Zu=[0,Oe,Fe,-1,Be],Gh=[0,Oe,Fe,be];cg.prototype.g=Dc([0,Oe,Ku,[0,Oe],qu,Vh,Zu,Gh]);var lg=class extends At{constructor(e){super(e)}},YS=yi(456383383,lg);ze[456383383]=[0,Oe,Z0];var hg=class extends At{constructor(e){super(e)}},qS=yi(476348187,hg);ze[476348187]=[0,Oe,BS];var ug=class extends At{constructor(e){super(e)}},ap=class extends At{constructor(e){super(e)}},dg=[0,sn,-1],$S=yi(458105876,class extends At{constructor(e){super(e)}g(){let e;var t=this.v;const n=0|t[bt];return e=wn(this,n),t=function(i,s,r,a){var o=ap;!a&&Kr(i)&&(r=0|(s=i.v)[bt]);var c=Vi(s,2);if(i=!1,c==null){if(a)return zf();c=[]}else if(c.constructor===zi){if(!(2&c.J)||a)return c;c=c.V()}else Array.isArray(c)?i=!!(2&(0|c[bt])):c=[];if(a){if(!c.length)return zf();i||(i=!0,Ba(c))}else i&&(i=!1,Ta(c),c=r0(c));return!i&&32&r&&Oa(c,32),r=ke(s,r,2,a=new zi(c,o,KM,void 0)),i||$s(s,r),a}(this,t,n,e),!e&&ap&&(t.ra=!0),t}});ze[458105876]=[0,dg,xS,[!0,fs,[0,fe,-1,nn]],[0,Ha,be,sn]];var Ju=class extends At{constructor(e){super(e)}},fg=yi(458105758,Ju);ze[458105758]=[0,Oe,fe,dg];var Dl=class extends At{constructor(e){super(e)}},op=[0,SS,-1,zs],jS=class extends At{constructor(e){super(e)}},pg=class extends At{constructor(e){super(e)}},Hh=[1,2];pg.prototype.g=Dc([0,Hh,xe,op,xe,[0,$e,op]]);var mg=class extends At{constructor(e){super(e)}},KS=yi(443442058,mg);ze[443442058]=[0,Oe,fe,Be,Fe,nn,-1,be,Fe],ze[514774813]=Zu;var gg=class extends At{constructor(e){super(e)}},ZS=yi(516587230,gg);function Wh(e,t){return t=t?t.clone():new Yu,e.displayNamesLocale!==void 0?le(t,1,Va(e.displayNamesLocale)):e.displayNamesLocale===void 0&&le(t,1),e.maxResults!==void 0?Hi(t,2,e.maxResults):"maxResults"in e&&le(t,2),e.scoreThreshold!==void 0?Ct(t,3,e.scoreThreshold):"scoreThreshold"in e&&le(t,3),e.categoryAllowlist!==void 0?nc(t,4,e.categoryAllowlist):"categoryAllowlist"in e&&le(t,4),e.categoryDenylist!==void 0?nc(t,5,e.categoryDenylist):"categoryDenylist"in e&&le(t,5),t}function _g(e){const t=Number(e);return Number.isSafeInteger(t)?t:String(e)}function Qu(e,t=-1,n=""){return{categories:e.map(i=>({index:zn(i,1)??0??-1,score:Le(i,2)??0,categoryName:Je(Ee(i,3))??""??"",displayName:Je(Ee(i,4))??""??""})),headIndex:t,headName:n}}function JS(e){const t={classifications:Gi(e,DS,1).map(n=>{var i;return Qu(((i=te(n,W0,4))==null?void 0:i.g())??[],zn(n,2)??0,Je(Ee(n,3))??"")})};return function(n){return n==null?n:typeof n=="bigint"?(Fh(n)?n=Number(n):(n=ka(64,n),n=Fh(n)?Number(n):String(n)),n):za(n)?typeof n=="number"?Mu(n):Km(n):void 0}(Ee(e,2,void 0,void 0,tc))!=null&&(t.timestampMs=_g(Ee(e,2,void 0,void 0,tc)??n0)),t}function vg(e){var a,o;var t=Ns(e,3,ui,Us()),n=Ns(e,2,$r,Us()),i=Ns(e,1,Je,Us()),s=Ns(e,9,Je,Us());const r={categories:[],keypoints:[]};for(let c=0;c<t.length;c++)r.categories.push({score:t[c],index:n[c]??-1,categoryName:i[c]??"",displayName:s[c]??""});if((t=(a=te(e,Il,4))==null?void 0:a.l())&&(r.boundingBox={originX:zn(t,1,ts)??0,originY:zn(t,2,ts)??0,width:zn(t,3,ts)??0,height:zn(t,4,ts)??0,angle:0}),(o=te(e,Il,4))==null?void 0:o.g().length)for(const c of te(e,Il,4).g())r.keypoints.push({x:Ee(c,1,void 0,ts,ui)??0,y:Ee(c,2,void 0,ts,ui)??0,score:Ee(c,4,void 0,ts,ui)??0,label:Je(Ee(c,3,void 0,ts))??""});return r}function Fc(e){const t=[];for(const n of Gi(e,$0,1))t.push({x:Le(n,1)??0,y:Le(n,2)??0,z:Le(n,3)??0,visibility:Le(n,4)??0});return t}function Ma(e){const t=[];for(const n of Gi(e,q0,1))t.push({x:Le(n,1)??0,y:Le(n,2)??0,z:Le(n,3)??0,visibility:Le(n,4)??0});return t}function cp(e){return Array.from(e,t=>t>127?t-256:t)}function lp(e,t){if(e.length!==t.length)throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${e.length} vs. ${t.length}).`);let n=0,i=0,s=0;for(let r=0;r<e.length;r++)n+=e[r]*t[r],i+=e[r]*e[r],s+=t[r]*t[r];if(i<=0||s<=0)throw Error("Cannot compute cosine similarity on embedding with 0 norm.");return n/Math.sqrt(i*s)}let Eo;ze[516587230]=[0,Oe,Zu,Gh,Fe],ze[518928384]=Gh;const QS=new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]);async function xg(e){if(e)return!0;if(Eo===void 0)try{await WebAssembly.instantiate(QS),Eo=!0}catch{Eo=!1}return Eo}async function bo(e,t,n){return{wasmLoaderPath:`${t}/${e}_${n=`wasm${n?"_module":""}${await xg(n)?"":"_nosimd"}_internal`}.js`,wasmBinaryPath:`${t}/${e}_${n}.wasm`}}var Ls=class{};function Mg(){var e=navigator;return typeof OffscreenCanvas<"u"&&(!function(t=navigator){return(t=t.userAgent).includes("Safari")&&!t.includes("Chrome")}(e)||!!((e=e.userAgent.match(/Version\/([\d]+).*Safari/))&&e.length>=1&&Number(e[1])>=17))}async function hp(e){if(typeof importScripts!="function"){const t=document.createElement("script");return t.src=e.toString(),t.crossOrigin="anonymous",new Promise((n,i)=>{t.addEventListener("load",()=>{n()},!1),t.addEventListener("error",s=>{i(s)},!1),document.body.appendChild(t)})}try{importScripts(e.toString())}catch(t){if(!(t instanceof TypeError))throw t;await self.import(e.toString())}}function Sg(e){return e.videoWidth!==void 0?[e.videoWidth,e.videoHeight]:e.naturalWidth!==void 0?[e.naturalWidth,e.naturalHeight]:e.displayWidth!==void 0?[e.displayWidth,e.displayHeight]:[e.width,e.height]}function wt(e,t,n){e.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"),n(t=e.i.stringToNewUTF8(t)),e.i._free(t)}function up(e,t,n){if(!e.i.canvas)throw Error("No OpenGL canvas configured.");if(n?e.i._bindTextureToStream(n):e.i._bindTextureToCanvas(),!(n=e.i.canvas.getContext("webgl2")||e.i.canvas.getContext("webgl")))throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");e.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!0),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,t),e.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1);const[i,s]=Sg(t);return!e.l||i===e.i.canvas.width&&s===e.i.canvas.height||(e.i.canvas.width=i,e.i.canvas.height=s),[i,s]}function dp(e,t,n){e.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");const i=new Uint32Array(t.length);for(let s=0;s<t.length;s++)i[s]=e.i.stringToNewUTF8(t[s]);t=e.i._malloc(4*i.length),e.i.HEAPU32.set(i,t>>2),n(t);for(const s of i)e.i._free(s);e.i._free(t)}function si(e,t,n){e.i.simpleListeners=e.i.simpleListeners||{},e.i.simpleListeners[t]=n}function es(e,t,n){let i=[];e.i.simpleListeners=e.i.simpleListeners||{},e.i.simpleListeners[t]=(s,r,a)=>{r?(n(i,a),i=[]):i.push(s)}}Ls.forVisionTasks=function(e,t=!1){return bo("vision",e??yo``,t)},Ls.forTextTasks=function(e,t=!1){return bo("text",e??yo``,t)},Ls.forGenAiTasks=function(e,t=!1){return bo("genai",e??yo``,t)},Ls.forAudioTasks=function(e,t=!1){return bo("audio",e??yo``,t)},Ls.isSimdSupported=function(e=!1){return xg(e)};async function ty(e,t,n,i){return e=await(async(s,r,a,o,c)=>{if(r&&await hp(r),!self.ModuleFactory||a&&(await hp(a),!self.ModuleFactory))throw Error("ModuleFactory not set.");return self.Module&&c&&((r=self.Module).locateFile=c.locateFile,c.mainScriptUrlOrBlob&&(r.mainScriptUrlOrBlob=c.mainScriptUrlOrBlob)),c=await self.ModuleFactory(self.Module||c),self.ModuleFactory=self.Module=void 0,new s(c,o)})(e,n.wasmLoaderPath,n.assetLoaderPath,t,{locateFile:s=>s.endsWith(".wasm")?n.wasmBinaryPath.toString():n.assetBinaryPath&&s.endsWith(".data")?n.assetBinaryPath.toString():s}),await e.o(i),e}function Ul(e,t){const n=te(e.baseOptions,ac,1)||new ac;typeof t=="string"?(le(n,2,Va(t)),le(n,1)):t instanceof Uint8Array&&(le(n,1,gu(t,!1)),le(n,2)),Lt(e.baseOptions,0,1,n)}function fp(e){try{const t=e.H.length;if(t===1)throw Error(e.H[0].message);if(t>1)throw Error("Encountered multiple errors: "+e.H.map(n=>n.message).join(", "))}finally{e.H=[]}}function mt(e,t){e.C=Math.max(e.C,t)}function Oc(e,t){e.B=new _n,Rn(e.B,2,"PassThroughCalculator"),Me(e.B,"free_memory"),$t(e.B,"free_memory_unused_out"),Ae(t,"free_memory"),Hn(t,e.B)}function Nr(e,t){Me(e.B,t),$t(e.B,t+"_unused_out")}function Bc(e){e.g.addBoolToStream(!0,"free_memory",e.C)}var Xh=class{constructor(e){this.g=e,this.H=[],this.C=0,this.g.setAutoRenderToScreen(!1)}l(e,t=!0){var n,i,s,r,a,o;if(t){const c=e.baseOptions||{};if((n=e.baseOptions)!=null&&n.modelAssetBuffer&&((i=e.baseOptions)!=null&&i.modelAssetPath))throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");if(!((s=te(this.baseOptions,ac,1))!=null&&s.g()||(r=te(this.baseOptions,ac,1))!=null&&r.l()||(a=e.baseOptions)!=null&&a.modelAssetBuffer||(o=e.baseOptions)!=null&&o.modelAssetPath))throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");if(function(l,u){let d=te(l.baseOptions,sp,3);if(!d){var h=d=new sp,m=new Jf;va(h,4,ko,m)}"delegate"in u&&(u.delegate==="GPU"?(u=d,h=new TS,va(u,2,ko,h)):(u=d,h=new Jf,va(u,4,ko,h))),Lt(l.baseOptions,0,3,d)}(this,c),c.modelAssetPath)return fetch(c.modelAssetPath.toString()).then(l=>{if(l.ok)return l.arrayBuffer();throw Error(`Failed to fetch model: ${c.modelAssetPath} (${l.status})`)}).then(l=>{try{this.g.i.FS_unlink("/model.dat")}catch{}this.g.i.FS_createDataFile("/","model.dat",new Uint8Array(l),!0,!1,!1),Ul(this,"/model.dat"),this.m(),this.L()});if(c.modelAssetBuffer instanceof Uint8Array)Ul(this,c.modelAssetBuffer);else if(c.modelAssetBuffer)return async function(l){const u=[];for(var d=0;;){const{done:h,value:m}=await l.read();if(h)break;u.push(m),d+=m.length}if(u.length===0)return new Uint8Array(0);if(u.length===1)return u[0];l=new Uint8Array(d),d=0;for(const h of u)l.set(h,d),d+=h.length;return l}(c.modelAssetBuffer).then(l=>{Ul(this,l),this.m(),this.L()})}return this.m(),this.L(),Promise.resolve()}L(){}ca(){let e;if(this.g.ca(t=>{e=wS(t)}),!e)throw Error("Failed to retrieve CalculatorGraphConfig");return e}setGraph(e,t){this.g.attachErrorListener((n,i)=>{this.H.push(Error(i))}),this.g.Ja(),this.g.setGraph(e,t),this.B=void 0,fp(this)}finishProcessing(){this.g.finishProcessing(),fp(this)}close(){this.B=void 0,this.g.closeGraph()}};function ls(e,t){if(!e)throw Error(`Unable to obtain required WebGL resource: ${t}`);return e}Xh.prototype.close=Xh.prototype.close;class ey{constructor(t,n,i,s){this.g=t,this.h=n,this.m=i,this.l=s}bind(){this.g.bindVertexArray(this.h)}close(){this.g.deleteVertexArray(this.h),this.g.deleteBuffer(this.m),this.g.deleteBuffer(this.l)}}function pp(e,t,n){const i=e.g;if(n=ls(i.createShader(n),"Failed to create WebGL shader"),i.shaderSource(n,t),i.compileShader(n),!i.getShaderParameter(n,i.COMPILE_STATUS))throw Error(`Could not compile WebGL shader: ${i.getShaderInfoLog(n)}`);return i.attachShader(e.h,n),n}function mp(e,t){const n=e.g,i=ls(n.createVertexArray(),"Failed to create vertex array");n.bindVertexArray(i);const s=ls(n.createBuffer(),"Failed to create buffer");n.bindBuffer(n.ARRAY_BUFFER,s),n.enableVertexAttribArray(e.O),n.vertexAttribPointer(e.O,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),n.STATIC_DRAW);const r=ls(n.createBuffer(),"Failed to create buffer");return n.bindBuffer(n.ARRAY_BUFFER,r),n.enableVertexAttribArray(e.L),n.vertexAttribPointer(e.L,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array(t?[0,1,0,0,1,0,1,1]:[0,0,0,1,1,1,1,0]),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,null),n.bindVertexArray(null),new ey(n,i,s,r)}function td(e,t){if(e.g){if(t!==e.g)throw Error("Cannot change GL context once initialized")}else e.g=t}function ny(e,t,n,i){return td(e,t),e.h||(e.m(),e.D()),n?(e.u||(e.u=mp(e,!0)),n=e.u):(e.A||(e.A=mp(e,!1)),n=e.A),t.useProgram(e.h),n.bind(),e.l(),e=i(),n.g.bindVertexArray(null),e}function yg(e,t,n){return td(e,t),e=ls(t.createTexture(),"Failed to create texture"),t.bindTexture(t.TEXTURE_2D,e),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,n??t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,n??t.LINEAR),t.bindTexture(t.TEXTURE_2D,null),e}function Eg(e,t,n){td(e,t),e.B||(e.B=ls(t.createFramebuffer(),"Failed to create framebuffe.")),t.bindFramebuffer(t.FRAMEBUFFER,e.B),t.framebufferTexture2D(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,n,0)}function iy(e){var t;(t=e.g)==null||t.bindFramebuffer(e.g.FRAMEBUFFER,null)}var bg=class{H(){return`
  precision mediump float;
  varying vec2 vTex;
  uniform sampler2D inputTexture;
  void main() {
    gl_FragColor = texture2D(inputTexture, vTex);
  }
 `}m(){const e=this.g;if(this.h=ls(e.createProgram(),"Failed to create WebGL program"),this.X=pp(this,`
  attribute vec2 aVertex;
  attribute vec2 aTex;
  varying vec2 vTex;
  void main(void) {
    gl_Position = vec4(aVertex, 0.0, 1.0);
    vTex = aTex;
  }`,e.VERTEX_SHADER),this.W=pp(this,this.H(),e.FRAGMENT_SHADER),e.linkProgram(this.h),!e.getProgramParameter(this.h,e.LINK_STATUS))throw Error(`Error during program linking: ${e.getProgramInfoLog(this.h)}`);this.O=e.getAttribLocation(this.h,"aVertex"),this.L=e.getAttribLocation(this.h,"aTex")}D(){}l(){}close(){if(this.h){const e=this.g;e.deleteProgram(this.h),e.deleteShader(this.X),e.deleteShader(this.W)}this.B&&this.g.deleteFramebuffer(this.B),this.A&&this.A.close(),this.u&&this.u.close()}};function Ii(e,t){switch(t){case 0:return e.g.find(n=>n instanceof Uint8Array);case 1:return e.g.find(n=>n instanceof Float32Array);case 2:return e.g.find(n=>typeof WebGLTexture<"u"&&n instanceof WebGLTexture);default:throw Error(`Type is not supported: ${t}`)}}function Yh(e){var t=Ii(e,1);if(!t){if(t=Ii(e,0))t=new Float32Array(t).map(i=>i/255);else{t=new Float32Array(e.width*e.height);const i=Fr(e);var n=ed(e);if(Eg(n,i,Ag(e)),"iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"document"in self&&"ontouchend"in self.document){n=new Float32Array(e.width*e.height*4),i.readPixels(0,0,e.width,e.height,i.RGBA,i.FLOAT,n);for(let s=0,r=0;s<t.length;++s,r+=4)t[s]=n[r]}else i.readPixels(0,0,e.width,e.height,i.RED,i.FLOAT,t)}e.g.push(t)}return t}function Ag(e){let t=Ii(e,2);if(!t){const n=Fr(e);t=wg(e);const i=Yh(e),s=Tg(e);n.texImage2D(n.TEXTURE_2D,0,s,e.width,e.height,0,n.RED,n.FLOAT,i),qh(e)}return t}function Fr(e){if(!e.canvas)throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");return e.h||(e.h=ls(e.canvas.getContext("webgl2"),"You cannot use a canvas that is already bound to a different type of rendering context.")),e.h}function Tg(e){if(e=Fr(e),!Ao)if(e.getExtension("EXT_color_buffer_float")&&e.getExtension("OES_texture_float_linear")&&e.getExtension("EXT_float_blend"))Ao=e.R32F;else{if(!e.getExtension("EXT_color_buffer_half_float"))throw Error("GPU does not fully support 4-channel float32 or float16 formats");Ao=e.R16F}return Ao}function ed(e){return e.l||(e.l=new bg),e.l}function wg(e){const t=Fr(e);t.viewport(0,0,e.width,e.height),t.activeTexture(t.TEXTURE0);let n=Ii(e,2);return n||(n=yg(ed(e),t,e.m?t.LINEAR:t.NEAREST),e.g.push(n),e.j=!0),t.bindTexture(t.TEXTURE_2D,n),n}function qh(e){e.h.bindTexture(e.h.TEXTURE_2D,null)}var Ao,qe=class{constructor(e,t,n,i,s,r,a){this.g=e,this.m=t,this.j=n,this.canvas=i,this.l=s,this.width=r,this.height=a,this.j&&--gp===0&&console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources.")}Fa(){return!!Ii(this,0)}ka(){return!!Ii(this,1)}R(){return!!Ii(this,2)}ja(){return(t=Ii(e=this,0))||(t=Yh(e),t=new Uint8Array(t.map(n=>Math.round(255*n))),e.g.push(t)),t;var e,t}ia(){return Yh(this)}N(){return Ag(this)}clone(){const e=[];for(const t of this.g){let n;if(t instanceof Uint8Array)n=new Uint8Array(t);else if(t instanceof Float32Array)n=new Float32Array(t);else{if(!(t instanceof WebGLTexture))throw Error(`Type is not supported: ${t}`);{const i=Fr(this),s=ed(this);i.activeTexture(i.TEXTURE1),n=yg(s,i,this.m?i.LINEAR:i.NEAREST),i.bindTexture(i.TEXTURE_2D,n);const r=Tg(this);i.texImage2D(i.TEXTURE_2D,0,r,this.width,this.height,0,i.RED,i.FLOAT,null),i.bindTexture(i.TEXTURE_2D,null),Eg(s,i,n),ny(s,i,!1,()=>{wg(this),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.drawArrays(i.TRIANGLE_FAN,0,4),qh(this)}),iy(s),qh(this)}}e.push(n)}return new qe(e,this.m,this.R(),this.canvas,this.l,this.width,this.height)}close(){this.j&&Fr(this).deleteTexture(Ii(this,2)),gp=-1}};qe.prototype.close=qe.prototype.close,qe.prototype.clone=qe.prototype.clone,qe.prototype.getAsWebGLTexture=qe.prototype.N,qe.prototype.getAsFloat32Array=qe.prototype.ia,qe.prototype.getAsUint8Array=qe.prototype.ja,qe.prototype.hasWebGLTexture=qe.prototype.R,qe.prototype.hasFloat32Array=qe.prototype.ka,qe.prototype.hasUint8Array=qe.prototype.Fa;var gp=250;function Jn(...e){return e.map(([t,n])=>({start:t,end:n}))}const sy=function(e){return class extends e{Ja(){this.i._registerModelResourcesGraphService()}}}((_p=class{constructor(e,t){this.l=!0,this.i=e,this.g=null,this.h=0,this.m=typeof this.i._addIntToInputStream=="function",t!==void 0?this.i.canvas=t:Mg()?this.i.canvas=new OffscreenCanvas(1,1):(console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."),this.i.canvas=document.createElement("canvas"))}async initializeGraph(e){const t=await(await fetch(e)).arrayBuffer();e=!(e.endsWith(".pbtxt")||e.endsWith(".textproto")),this.setGraph(new Uint8Array(t),e)}setGraphFromString(e){this.setGraph(new TextEncoder().encode(e),!1)}setGraph(e,t){const n=e.length,i=this.i._malloc(n);this.i.HEAPU8.set(e,i),t?this.i._changeBinaryGraph(n,i):this.i._changeTextGraph(n,i),this.i._free(i)}configureAudio(e,t,n,i,s){this.i._configureAudio||console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'),wt(this,i||"input_audio",r=>{wt(this,s=s||"audio_header",a=>{this.i._configureAudio(r,a,e,t??0,n)})})}setAutoResizeCanvas(e){this.l=e}setAutoRenderToScreen(e){this.i._setAutoRenderToScreen(e)}setGpuBufferVerticalFlip(e){this.i.gpuOriginForWebTexturesIsBottomLeft=e}ca(e){si(this,"__graph_config__",t=>{e(t)}),wt(this,"__graph_config__",t=>{this.i._getGraphConfig(t,void 0)}),delete this.i.simpleListeners.__graph_config__}attachErrorListener(e){this.i.errorListener=e}attachEmptyPacketListener(e,t){this.i.emptyPacketListeners=this.i.emptyPacketListeners||{},this.i.emptyPacketListeners[e]=t}addAudioToStream(e,t,n){this.addAudioToStreamWithShape(e,0,0,t,n)}addAudioToStreamWithShape(e,t,n,i,s){const r=4*e.length;this.h!==r&&(this.g&&this.i._free(this.g),this.g=this.i._malloc(r),this.h=r),this.i.HEAPF32.set(e,this.g/4),wt(this,i,a=>{this.i._addAudioToInputStream(this.g,t,n,a,s)})}addGpuBufferToStream(e,t,n){wt(this,t,i=>{const[s,r]=up(this,e,i);this.i._addBoundTextureToStream(i,s,r,n)})}addBoolToStream(e,t,n){wt(this,t,i=>{this.i._addBoolToInputStream(e,i,n)})}addDoubleToStream(e,t,n){wt(this,t,i=>{this.i._addDoubleToInputStream(e,i,n)})}addFloatToStream(e,t,n){wt(this,t,i=>{this.i._addFloatToInputStream(e,i,n)})}addIntToStream(e,t,n){wt(this,t,i=>{this.i._addIntToInputStream(e,i,n)})}addUintToStream(e,t,n){wt(this,t,i=>{this.i._addUintToInputStream(e,i,n)})}addStringToStream(e,t,n){wt(this,t,i=>{wt(this,e,s=>{this.i._addStringToInputStream(s,i,n)})})}addStringRecordToStream(e,t,n){wt(this,t,i=>{dp(this,Object.keys(e),s=>{dp(this,Object.values(e),r=>{this.i._addFlatHashMapToInputStream(s,r,Object.keys(e).length,i,n)})})})}addProtoToStream(e,t,n,i){wt(this,n,s=>{wt(this,t,r=>{const a=this.i._malloc(e.length);this.i.HEAPU8.set(e,a),this.i._addProtoToInputStream(a,e.length,r,s,i),this.i._free(a)})})}addEmptyPacketToStream(e,t){wt(this,e,n=>{this.i._addEmptyPacketToInputStream(n,t)})}addBoolVectorToStream(e,t,n){wt(this,t,i=>{const s=this.i._allocateBoolVector(e.length);if(!s)throw Error("Unable to allocate new bool vector on heap.");for(const r of e)this.i._addBoolVectorEntry(s,r);this.i._addBoolVectorToInputStream(s,i,n)})}addDoubleVectorToStream(e,t,n){wt(this,t,i=>{const s=this.i._allocateDoubleVector(e.length);if(!s)throw Error("Unable to allocate new double vector on heap.");for(const r of e)this.i._addDoubleVectorEntry(s,r);this.i._addDoubleVectorToInputStream(s,i,n)})}addFloatVectorToStream(e,t,n){wt(this,t,i=>{const s=this.i._allocateFloatVector(e.length);if(!s)throw Error("Unable to allocate new float vector on heap.");for(const r of e)this.i._addFloatVectorEntry(s,r);this.i._addFloatVectorToInputStream(s,i,n)})}addIntVectorToStream(e,t,n){wt(this,t,i=>{const s=this.i._allocateIntVector(e.length);if(!s)throw Error("Unable to allocate new int vector on heap.");for(const r of e)this.i._addIntVectorEntry(s,r);this.i._addIntVectorToInputStream(s,i,n)})}addUintVectorToStream(e,t,n){wt(this,t,i=>{const s=this.i._allocateUintVector(e.length);if(!s)throw Error("Unable to allocate new unsigned int vector on heap.");for(const r of e)this.i._addUintVectorEntry(s,r);this.i._addUintVectorToInputStream(s,i,n)})}addStringVectorToStream(e,t,n){wt(this,t,i=>{const s=this.i._allocateStringVector(e.length);if(!s)throw Error("Unable to allocate new string vector on heap.");for(const r of e)wt(this,r,a=>{this.i._addStringVectorEntry(s,a)});this.i._addStringVectorToInputStream(s,i,n)})}addBoolToInputSidePacket(e,t){wt(this,t,n=>{this.i._addBoolToInputSidePacket(e,n)})}addDoubleToInputSidePacket(e,t){wt(this,t,n=>{this.i._addDoubleToInputSidePacket(e,n)})}addFloatToInputSidePacket(e,t){wt(this,t,n=>{this.i._addFloatToInputSidePacket(e,n)})}addIntToInputSidePacket(e,t){wt(this,t,n=>{this.i._addIntToInputSidePacket(e,n)})}addUintToInputSidePacket(e,t){wt(this,t,n=>{this.i._addUintToInputSidePacket(e,n)})}addStringToInputSidePacket(e,t){wt(this,t,n=>{wt(this,e,i=>{this.i._addStringToInputSidePacket(i,n)})})}addProtoToInputSidePacket(e,t,n){wt(this,n,i=>{wt(this,t,s=>{const r=this.i._malloc(e.length);this.i.HEAPU8.set(e,r),this.i._addProtoToInputSidePacket(r,e.length,s,i),this.i._free(r)})})}addBoolVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateBoolVector(e.length);if(!i)throw Error("Unable to allocate new bool vector on heap.");for(const s of e)this.i._addBoolVectorEntry(i,s);this.i._addBoolVectorToInputSidePacket(i,n)})}addDoubleVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateDoubleVector(e.length);if(!i)throw Error("Unable to allocate new double vector on heap.");for(const s of e)this.i._addDoubleVectorEntry(i,s);this.i._addDoubleVectorToInputSidePacket(i,n)})}addFloatVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateFloatVector(e.length);if(!i)throw Error("Unable to allocate new float vector on heap.");for(const s of e)this.i._addFloatVectorEntry(i,s);this.i._addFloatVectorToInputSidePacket(i,n)})}addIntVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateIntVector(e.length);if(!i)throw Error("Unable to allocate new int vector on heap.");for(const s of e)this.i._addIntVectorEntry(i,s);this.i._addIntVectorToInputSidePacket(i,n)})}addUintVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateUintVector(e.length);if(!i)throw Error("Unable to allocate new unsigned int vector on heap.");for(const s of e)this.i._addUintVectorEntry(i,s);this.i._addUintVectorToInputSidePacket(i,n)})}addStringVectorToInputSidePacket(e,t){wt(this,t,n=>{const i=this.i._allocateStringVector(e.length);if(!i)throw Error("Unable to allocate new string vector on heap.");for(const s of e)wt(this,s,r=>{this.i._addStringVectorEntry(i,r)});this.i._addStringVectorToInputSidePacket(i,n)})}attachBoolListener(e,t){si(this,e,t),wt(this,e,n=>{this.i._attachBoolListener(n)})}attachBoolVectorListener(e,t){es(this,e,t),wt(this,e,n=>{this.i._attachBoolVectorListener(n)})}attachIntListener(e,t){si(this,e,t),wt(this,e,n=>{this.i._attachIntListener(n)})}attachIntVectorListener(e,t){es(this,e,t),wt(this,e,n=>{this.i._attachIntVectorListener(n)})}attachUintListener(e,t){si(this,e,t),wt(this,e,n=>{this.i._attachUintListener(n)})}attachUintVectorListener(e,t){es(this,e,t),wt(this,e,n=>{this.i._attachUintVectorListener(n)})}attachDoubleListener(e,t){si(this,e,t),wt(this,e,n=>{this.i._attachDoubleListener(n)})}attachDoubleVectorListener(e,t){es(this,e,t),wt(this,e,n=>{this.i._attachDoubleVectorListener(n)})}attachFloatListener(e,t){si(this,e,t),wt(this,e,n=>{this.i._attachFloatListener(n)})}attachFloatVectorListener(e,t){es(this,e,t),wt(this,e,n=>{this.i._attachFloatVectorListener(n)})}attachStringListener(e,t){si(this,e,t),wt(this,e,n=>{this.i._attachStringListener(n)})}attachStringVectorListener(e,t){es(this,e,t),wt(this,e,n=>{this.i._attachStringVectorListener(n)})}attachProtoListener(e,t,n){si(this,e,t),wt(this,e,i=>{this.i._attachProtoListener(i,n||!1)})}attachProtoVectorListener(e,t,n){es(this,e,t),wt(this,e,i=>{this.i._attachProtoVectorListener(i,n||!1)})}attachAudioListener(e,t,n){this.i._attachAudioListener||console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'),si(this,e,(i,s)=>{i=new Float32Array(i.buffer,i.byteOffset,i.length/4),t(i,s)}),wt(this,e,i=>{this.i._attachAudioListener(i,n||!1)})}finishProcessing(){this.i._waitUntilIdle()}closeGraph(){this.i._closeGraph(),this.i.simpleListeners=void 0,this.i.emptyPacketListeners=void 0}},class extends _p{get ga(){return this.i}pa(e,t,n){wt(this,t,i=>{const[s,r]=up(this,e,i);this.ga._addBoundTextureAsImageToStream(i,s,r,n)})}Z(e,t){si(this,e,t),wt(this,e,n=>{this.ga._attachImageListener(n)})}aa(e,t){es(this,e,t),wt(this,e,n=>{this.ga._attachImageVectorListener(n)})}}));var _p,Qn=class extends sy{};async function Zt(e,t,n){return async function(i,s,r,a){return ty(i,s,r,a)}(e,n.canvas??(Mg()?void 0:document.createElement("canvas")),t,n)}function Rg(e,t,n,i){if(e.U){const r=new j0;if(n!=null&&n.regionOfInterest){if(!e.oa)throw Error("This task doesn't support region-of-interest.");var s=n.regionOfInterest;if(s.left>=s.right||s.top>=s.bottom)throw Error("Expected RectF with left < right and top < bottom.");if(s.left<0||s.top<0||s.right>1||s.bottom>1)throw Error("Expected RectF values to be in [0,1].");Ct(r,1,(s.left+s.right)/2),Ct(r,2,(s.top+s.bottom)/2),Ct(r,4,s.right-s.left),Ct(r,3,s.bottom-s.top)}else Ct(r,1,.5),Ct(r,2,.5),Ct(r,4,1),Ct(r,3,1);if(n!=null&&n.rotationDegrees){if((n==null?void 0:n.rotationDegrees)%90!=0)throw Error("Expected rotation to be a multiple of 90°.");if(Ct(r,5,-Math.PI*n.rotationDegrees/180),(n==null?void 0:n.rotationDegrees)%180!=0){const[a,o]=Sg(t);n=Le(r,3)*o/a,s=Le(r,4)*a/o,Ct(r,4,n),Ct(r,3,s)}}e.g.addProtoToStream(r.g(),"mediapipe.NormalizedRect",e.U,i)}e.g.pa(t,e.X,i??performance.now()),e.finishProcessing()}function ti(e,t,n){var i;if((i=e.baseOptions)!=null&&i.g())throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");Rg(e,t,n,e.C+1)}function Ei(e,t,n,i){var s;if(!((s=e.baseOptions)!=null&&s.g()))throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");Rg(e,t,n,i)}function Or(e,t,n,i){var s=t.data;const r=t.width,a=r*(t=t.height);if((s instanceof Uint8Array||s instanceof Float32Array)&&s.length!==a)throw Error("Unsupported channel count: "+s.length/a);return e=new qe([s],n,!1,e.g.i.canvas,e.P,r,t),i?e.clone():e}var Cn=class extends Xh{constructor(e,t,n,i){super(e),this.g=e,this.X=t,this.U=n,this.oa=i,this.P=new bg}l(e,t=!0){if("runningMode"in e&&le(this.baseOptions,2,Ra(!!e.runningMode&&e.runningMode!=="IMAGE")),e.canvas!==void 0&&this.g.i.canvas!==e.canvas)throw Error("You must create a new task to reset the canvas.");return super.l(e,t)}close(){this.P.close(),super.close()}};Cn.prototype.close=Cn.prototype.close;var Dn=class extends Cn{constructor(e,t){super(new Qn(e,t),"image_in","norm_rect_in",!1),this.j={detections:[]},Lt(e=this.h=new Nc,0,1,t=new Re),Ct(this.h,2,.5),Ct(this.h,3,.3)}get baseOptions(){return te(this.h,Re,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return"minDetectionConfidence"in e&&Ct(this.h,2,e.minDetectionConfidence??.5),"minSuppressionThreshold"in e&&Ct(this.h,3,e.minSuppressionThreshold??.3),this.l(e)}F(e,t){return this.j={detections:[]},ti(this,e,t),this.j}G(e,t,n){return this.j={detections:[]},Ei(this,e,n,t),this.j}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"norm_rect_in"),ee(e,"detections");const t=new Pn;Si(t,kS,this.h);const n=new _n;Rn(n,2,"mediapipe.tasks.vision.face_detector.FaceDetectorGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect_in"),$t(n,"DETECTIONS:detections"),n.o(t),Hn(e,n),this.g.attachProtoVectorListener("detections",(i,s)=>{for(const r of i)i=Y0(r),this.j.detections.push(vg(i));mt(this,s)}),this.g.attachEmptyPacketListener("detections",i=>{mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Dn.prototype.detectForVideo=Dn.prototype.G,Dn.prototype.detect=Dn.prototype.F,Dn.prototype.setOptions=Dn.prototype.o,Dn.createFromModelPath=async function(e,t){return Zt(Dn,e,{baseOptions:{modelAssetPath:t}})},Dn.createFromModelBuffer=function(e,t){return Zt(Dn,e,{baseOptions:{modelAssetBuffer:t}})},Dn.createFromOptions=function(e,t){return Zt(Dn,e,t)};var nd=Jn([61,146],[146,91],[91,181],[181,84],[84,17],[17,314],[314,405],[405,321],[321,375],[375,291],[61,185],[185,40],[40,39],[39,37],[37,0],[0,267],[267,269],[269,270],[270,409],[409,291],[78,95],[95,88],[88,178],[178,87],[87,14],[14,317],[317,402],[402,318],[318,324],[324,308],[78,191],[191,80],[80,81],[81,82],[82,13],[13,312],[312,311],[311,310],[310,415],[415,308]),id=Jn([263,249],[249,390],[390,373],[373,374],[374,380],[380,381],[381,382],[382,362],[263,466],[466,388],[388,387],[387,386],[386,385],[385,384],[384,398],[398,362]),sd=Jn([276,283],[283,282],[282,295],[295,285],[300,293],[293,334],[334,296],[296,336]),Cg=Jn([474,475],[475,476],[476,477],[477,474]),rd=Jn([33,7],[7,163],[163,144],[144,145],[145,153],[153,154],[154,155],[155,133],[33,246],[246,161],[161,160],[160,159],[159,158],[158,157],[157,173],[173,133]),ad=Jn([46,53],[53,52],[52,65],[65,55],[70,63],[63,105],[105,66],[66,107]),Pg=Jn([469,470],[470,471],[471,472],[472,469]),od=Jn([10,338],[338,297],[297,332],[332,284],[284,251],[251,389],[389,356],[356,454],[454,323],[323,361],[361,288],[288,397],[397,365],[365,379],[379,378],[378,400],[400,377],[377,152],[152,148],[148,176],[176,149],[149,150],[150,136],[136,172],[172,58],[58,132],[132,93],[93,234],[234,127],[127,162],[162,21],[21,54],[54,103],[103,67],[67,109],[109,10]),Lg=[...nd,...id,...sd,...rd,...ad,...od],Ig=Jn([127,34],[34,139],[139,127],[11,0],[0,37],[37,11],[232,231],[231,120],[120,232],[72,37],[37,39],[39,72],[128,121],[121,47],[47,128],[232,121],[121,128],[128,232],[104,69],[69,67],[67,104],[175,171],[171,148],[148,175],[118,50],[50,101],[101,118],[73,39],[39,40],[40,73],[9,151],[151,108],[108,9],[48,115],[115,131],[131,48],[194,204],[204,211],[211,194],[74,40],[40,185],[185,74],[80,42],[42,183],[183,80],[40,92],[92,186],[186,40],[230,229],[229,118],[118,230],[202,212],[212,214],[214,202],[83,18],[18,17],[17,83],[76,61],[61,146],[146,76],[160,29],[29,30],[30,160],[56,157],[157,173],[173,56],[106,204],[204,194],[194,106],[135,214],[214,192],[192,135],[203,165],[165,98],[98,203],[21,71],[71,68],[68,21],[51,45],[45,4],[4,51],[144,24],[24,23],[23,144],[77,146],[146,91],[91,77],[205,50],[50,187],[187,205],[201,200],[200,18],[18,201],[91,106],[106,182],[182,91],[90,91],[91,181],[181,90],[85,84],[84,17],[17,85],[206,203],[203,36],[36,206],[148,171],[171,140],[140,148],[92,40],[40,39],[39,92],[193,189],[189,244],[244,193],[159,158],[158,28],[28,159],[247,246],[246,161],[161,247],[236,3],[3,196],[196,236],[54,68],[68,104],[104,54],[193,168],[168,8],[8,193],[117,228],[228,31],[31,117],[189,193],[193,55],[55,189],[98,97],[97,99],[99,98],[126,47],[47,100],[100,126],[166,79],[79,218],[218,166],[155,154],[154,26],[26,155],[209,49],[49,131],[131,209],[135,136],[136,150],[150,135],[47,126],[126,217],[217,47],[223,52],[52,53],[53,223],[45,51],[51,134],[134,45],[211,170],[170,140],[140,211],[67,69],[69,108],[108,67],[43,106],[106,91],[91,43],[230,119],[119,120],[120,230],[226,130],[130,247],[247,226],[63,53],[53,52],[52,63],[238,20],[20,242],[242,238],[46,70],[70,156],[156,46],[78,62],[62,96],[96,78],[46,53],[53,63],[63,46],[143,34],[34,227],[227,143],[123,117],[117,111],[111,123],[44,125],[125,19],[19,44],[236,134],[134,51],[51,236],[216,206],[206,205],[205,216],[154,153],[153,22],[22,154],[39,37],[37,167],[167,39],[200,201],[201,208],[208,200],[36,142],[142,100],[100,36],[57,212],[212,202],[202,57],[20,60],[60,99],[99,20],[28,158],[158,157],[157,28],[35,226],[226,113],[113,35],[160,159],[159,27],[27,160],[204,202],[202,210],[210,204],[113,225],[225,46],[46,113],[43,202],[202,204],[204,43],[62,76],[76,77],[77,62],[137,123],[123,116],[116,137],[41,38],[38,72],[72,41],[203,129],[129,142],[142,203],[64,98],[98,240],[240,64],[49,102],[102,64],[64,49],[41,73],[73,74],[74,41],[212,216],[216,207],[207,212],[42,74],[74,184],[184,42],[169,170],[170,211],[211,169],[170,149],[149,176],[176,170],[105,66],[66,69],[69,105],[122,6],[6,168],[168,122],[123,147],[147,187],[187,123],[96,77],[77,90],[90,96],[65,55],[55,107],[107,65],[89,90],[90,180],[180,89],[101,100],[100,120],[120,101],[63,105],[105,104],[104,63],[93,137],[137,227],[227,93],[15,86],[86,85],[85,15],[129,102],[102,49],[49,129],[14,87],[87,86],[86,14],[55,8],[8,9],[9,55],[100,47],[47,121],[121,100],[145,23],[23,22],[22,145],[88,89],[89,179],[179,88],[6,122],[122,196],[196,6],[88,95],[95,96],[96,88],[138,172],[172,136],[136,138],[215,58],[58,172],[172,215],[115,48],[48,219],[219,115],[42,80],[80,81],[81,42],[195,3],[3,51],[51,195],[43,146],[146,61],[61,43],[171,175],[175,199],[199,171],[81,82],[82,38],[38,81],[53,46],[46,225],[225,53],[144,163],[163,110],[110,144],[52,65],[65,66],[66,52],[229,228],[228,117],[117,229],[34,127],[127,234],[234,34],[107,108],[108,69],[69,107],[109,108],[108,151],[151,109],[48,64],[64,235],[235,48],[62,78],[78,191],[191,62],[129,209],[209,126],[126,129],[111,35],[35,143],[143,111],[117,123],[123,50],[50,117],[222,65],[65,52],[52,222],[19,125],[125,141],[141,19],[221,55],[55,65],[65,221],[3,195],[195,197],[197,3],[25,7],[7,33],[33,25],[220,237],[237,44],[44,220],[70,71],[71,139],[139,70],[122,193],[193,245],[245,122],[247,130],[130,33],[33,247],[71,21],[21,162],[162,71],[170,169],[169,150],[150,170],[188,174],[174,196],[196,188],[216,186],[186,92],[92,216],[2,97],[97,167],[167,2],[141,125],[125,241],[241,141],[164,167],[167,37],[37,164],[72,38],[38,12],[12,72],[38,82],[82,13],[13,38],[63,68],[68,71],[71,63],[226,35],[35,111],[111,226],[101,50],[50,205],[205,101],[206,92],[92,165],[165,206],[209,198],[198,217],[217,209],[165,167],[167,97],[97,165],[220,115],[115,218],[218,220],[133,112],[112,243],[243,133],[239,238],[238,241],[241,239],[214,135],[135,169],[169,214],[190,173],[173,133],[133,190],[171,208],[208,32],[32,171],[125,44],[44,237],[237,125],[86,87],[87,178],[178,86],[85,86],[86,179],[179,85],[84,85],[85,180],[180,84],[83,84],[84,181],[181,83],[201,83],[83,182],[182,201],[137,93],[93,132],[132,137],[76,62],[62,183],[183,76],[61,76],[76,184],[184,61],[57,61],[61,185],[185,57],[212,57],[57,186],[186,212],[214,207],[207,187],[187,214],[34,143],[143,156],[156,34],[79,239],[239,237],[237,79],[123,137],[137,177],[177,123],[44,1],[1,4],[4,44],[201,194],[194,32],[32,201],[64,102],[102,129],[129,64],[213,215],[215,138],[138,213],[59,166],[166,219],[219,59],[242,99],[99,97],[97,242],[2,94],[94,141],[141,2],[75,59],[59,235],[235,75],[24,110],[110,228],[228,24],[25,130],[130,226],[226,25],[23,24],[24,229],[229,23],[22,23],[23,230],[230,22],[26,22],[22,231],[231,26],[112,26],[26,232],[232,112],[189,190],[190,243],[243,189],[221,56],[56,190],[190,221],[28,56],[56,221],[221,28],[27,28],[28,222],[222,27],[29,27],[27,223],[223,29],[30,29],[29,224],[224,30],[247,30],[30,225],[225,247],[238,79],[79,20],[20,238],[166,59],[59,75],[75,166],[60,75],[75,240],[240,60],[147,177],[177,215],[215,147],[20,79],[79,166],[166,20],[187,147],[147,213],[213,187],[112,233],[233,244],[244,112],[233,128],[128,245],[245,233],[128,114],[114,188],[188,128],[114,217],[217,174],[174,114],[131,115],[115,220],[220,131],[217,198],[198,236],[236,217],[198,131],[131,134],[134,198],[177,132],[132,58],[58,177],[143,35],[35,124],[124,143],[110,163],[163,7],[7,110],[228,110],[110,25],[25,228],[356,389],[389,368],[368,356],[11,302],[302,267],[267,11],[452,350],[350,349],[349,452],[302,303],[303,269],[269,302],[357,343],[343,277],[277,357],[452,453],[453,357],[357,452],[333,332],[332,297],[297,333],[175,152],[152,377],[377,175],[347,348],[348,330],[330,347],[303,304],[304,270],[270,303],[9,336],[336,337],[337,9],[278,279],[279,360],[360,278],[418,262],[262,431],[431,418],[304,408],[408,409],[409,304],[310,415],[415,407],[407,310],[270,409],[409,410],[410,270],[450,348],[348,347],[347,450],[422,430],[430,434],[434,422],[313,314],[314,17],[17,313],[306,307],[307,375],[375,306],[387,388],[388,260],[260,387],[286,414],[414,398],[398,286],[335,406],[406,418],[418,335],[364,367],[367,416],[416,364],[423,358],[358,327],[327,423],[251,284],[284,298],[298,251],[281,5],[5,4],[4,281],[373,374],[374,253],[253,373],[307,320],[320,321],[321,307],[425,427],[427,411],[411,425],[421,313],[313,18],[18,421],[321,405],[405,406],[406,321],[320,404],[404,405],[405,320],[315,16],[16,17],[17,315],[426,425],[425,266],[266,426],[377,400],[400,369],[369,377],[322,391],[391,269],[269,322],[417,465],[465,464],[464,417],[386,257],[257,258],[258,386],[466,260],[260,388],[388,466],[456,399],[399,419],[419,456],[284,332],[332,333],[333,284],[417,285],[285,8],[8,417],[346,340],[340,261],[261,346],[413,441],[441,285],[285,413],[327,460],[460,328],[328,327],[355,371],[371,329],[329,355],[392,439],[439,438],[438,392],[382,341],[341,256],[256,382],[429,420],[420,360],[360,429],[364,394],[394,379],[379,364],[277,343],[343,437],[437,277],[443,444],[444,283],[283,443],[275,440],[440,363],[363,275],[431,262],[262,369],[369,431],[297,338],[338,337],[337,297],[273,375],[375,321],[321,273],[450,451],[451,349],[349,450],[446,342],[342,467],[467,446],[293,334],[334,282],[282,293],[458,461],[461,462],[462,458],[276,353],[353,383],[383,276],[308,324],[324,325],[325,308],[276,300],[300,293],[293,276],[372,345],[345,447],[447,372],[352,345],[345,340],[340,352],[274,1],[1,19],[19,274],[456,248],[248,281],[281,456],[436,427],[427,425],[425,436],[381,256],[256,252],[252,381],[269,391],[391,393],[393,269],[200,199],[199,428],[428,200],[266,330],[330,329],[329,266],[287,273],[273,422],[422,287],[250,462],[462,328],[328,250],[258,286],[286,384],[384,258],[265,353],[353,342],[342,265],[387,259],[259,257],[257,387],[424,431],[431,430],[430,424],[342,353],[353,276],[276,342],[273,335],[335,424],[424,273],[292,325],[325,307],[307,292],[366,447],[447,345],[345,366],[271,303],[303,302],[302,271],[423,266],[266,371],[371,423],[294,455],[455,460],[460,294],[279,278],[278,294],[294,279],[271,272],[272,304],[304,271],[432,434],[434,427],[427,432],[272,407],[407,408],[408,272],[394,430],[430,431],[431,394],[395,369],[369,400],[400,395],[334,333],[333,299],[299,334],[351,417],[417,168],[168,351],[352,280],[280,411],[411,352],[325,319],[319,320],[320,325],[295,296],[296,336],[336,295],[319,403],[403,404],[404,319],[330,348],[348,349],[349,330],[293,298],[298,333],[333,293],[323,454],[454,447],[447,323],[15,16],[16,315],[315,15],[358,429],[429,279],[279,358],[14,15],[15,316],[316,14],[285,336],[336,9],[9,285],[329,349],[349,350],[350,329],[374,380],[380,252],[252,374],[318,402],[402,403],[403,318],[6,197],[197,419],[419,6],[318,319],[319,325],[325,318],[367,364],[364,365],[365,367],[435,367],[367,397],[397,435],[344,438],[438,439],[439,344],[272,271],[271,311],[311,272],[195,5],[5,281],[281,195],[273,287],[287,291],[291,273],[396,428],[428,199],[199,396],[311,271],[271,268],[268,311],[283,444],[444,445],[445,283],[373,254],[254,339],[339,373],[282,334],[334,296],[296,282],[449,347],[347,346],[346,449],[264,447],[447,454],[454,264],[336,296],[296,299],[299,336],[338,10],[10,151],[151,338],[278,439],[439,455],[455,278],[292,407],[407,415],[415,292],[358,371],[371,355],[355,358],[340,345],[345,372],[372,340],[346,347],[347,280],[280,346],[442,443],[443,282],[282,442],[19,94],[94,370],[370,19],[441,442],[442,295],[295,441],[248,419],[419,197],[197,248],[263,255],[255,359],[359,263],[440,275],[275,274],[274,440],[300,383],[383,368],[368,300],[351,412],[412,465],[465,351],[263,467],[467,466],[466,263],[301,368],[368,389],[389,301],[395,378],[378,379],[379,395],[412,351],[351,419],[419,412],[436,426],[426,322],[322,436],[2,164],[164,393],[393,2],[370,462],[462,461],[461,370],[164,0],[0,267],[267,164],[302,11],[11,12],[12,302],[268,12],[12,13],[13,268],[293,300],[300,301],[301,293],[446,261],[261,340],[340,446],[330,266],[266,425],[425,330],[426,423],[423,391],[391,426],[429,355],[355,437],[437,429],[391,327],[327,326],[326,391],[440,457],[457,438],[438,440],[341,382],[382,362],[362,341],[459,457],[457,461],[461,459],[434,430],[430,394],[394,434],[414,463],[463,362],[362,414],[396,369],[369,262],[262,396],[354,461],[461,457],[457,354],[316,403],[403,402],[402,316],[315,404],[404,403],[403,315],[314,405],[405,404],[404,314],[313,406],[406,405],[405,313],[421,418],[418,406],[406,421],[366,401],[401,361],[361,366],[306,408],[408,407],[407,306],[291,409],[409,408],[408,291],[287,410],[410,409],[409,287],[432,436],[436,410],[410,432],[434,416],[416,411],[411,434],[264,368],[368,383],[383,264],[309,438],[438,457],[457,309],[352,376],[376,401],[401,352],[274,275],[275,4],[4,274],[421,428],[428,262],[262,421],[294,327],[327,358],[358,294],[433,416],[416,367],[367,433],[289,455],[455,439],[439,289],[462,370],[370,326],[326,462],[2,326],[326,370],[370,2],[305,460],[460,455],[455,305],[254,449],[449,448],[448,254],[255,261],[261,446],[446,255],[253,450],[450,449],[449,253],[252,451],[451,450],[450,252],[256,452],[452,451],[451,256],[341,453],[453,452],[452,341],[413,464],[464,463],[463,413],[441,413],[413,414],[414,441],[258,442],[442,441],[441,258],[257,443],[443,442],[442,257],[259,444],[444,443],[443,259],[260,445],[445,444],[444,260],[467,342],[342,445],[445,467],[459,458],[458,250],[250,459],[289,392],[392,290],[290,289],[290,328],[328,460],[460,290],[376,433],[433,435],[435,376],[250,290],[290,392],[392,250],[411,416],[416,433],[433,411],[341,463],[463,464],[464,341],[453,464],[464,465],[465,453],[357,465],[465,412],[412,357],[343,412],[412,399],[399,343],[360,363],[363,440],[440,360],[437,399],[399,456],[456,437],[420,456],[456,363],[363,420],[401,435],[435,288],[288,401],[372,383],[383,353],[353,372],[339,255],[255,249],[249,339],[448,261],[261,255],[255,448],[133,243],[243,190],[190,133],[133,155],[155,112],[112,133],[33,246],[246,247],[247,33],[33,130],[130,25],[25,33],[398,384],[384,286],[286,398],[362,398],[398,414],[414,362],[362,463],[463,341],[341,362],[263,359],[359,467],[467,263],[263,249],[249,255],[255,263],[466,467],[467,260],[260,466],[75,60],[60,166],[166,75],[238,239],[239,79],[79,238],[162,127],[127,139],[139,162],[72,11],[11,37],[37,72],[121,232],[232,120],[120,121],[73,72],[72,39],[39,73],[114,128],[128,47],[47,114],[233,232],[232,128],[128,233],[103,104],[104,67],[67,103],[152,175],[175,148],[148,152],[119,118],[118,101],[101,119],[74,73],[73,40],[40,74],[107,9],[9,108],[108,107],[49,48],[48,131],[131,49],[32,194],[194,211],[211,32],[184,74],[74,185],[185,184],[191,80],[80,183],[183,191],[185,40],[40,186],[186,185],[119,230],[230,118],[118,119],[210,202],[202,214],[214,210],[84,83],[83,17],[17,84],[77,76],[76,146],[146,77],[161,160],[160,30],[30,161],[190,56],[56,173],[173,190],[182,106],[106,194],[194,182],[138,135],[135,192],[192,138],[129,203],[203,98],[98,129],[54,21],[21,68],[68,54],[5,51],[51,4],[4,5],[145,144],[144,23],[23,145],[90,77],[77,91],[91,90],[207,205],[205,187],[187,207],[83,201],[201,18],[18,83],[181,91],[91,182],[182,181],[180,90],[90,181],[181,180],[16,85],[85,17],[17,16],[205,206],[206,36],[36,205],[176,148],[148,140],[140,176],[165,92],[92,39],[39,165],[245,193],[193,244],[244,245],[27,159],[159,28],[28,27],[30,247],[247,161],[161,30],[174,236],[236,196],[196,174],[103,54],[54,104],[104,103],[55,193],[193,8],[8,55],[111,117],[117,31],[31,111],[221,189],[189,55],[55,221],[240,98],[98,99],[99,240],[142,126],[126,100],[100,142],[219,166],[166,218],[218,219],[112,155],[155,26],[26,112],[198,209],[209,131],[131,198],[169,135],[135,150],[150,169],[114,47],[47,217],[217,114],[224,223],[223,53],[53,224],[220,45],[45,134],[134,220],[32,211],[211,140],[140,32],[109,67],[67,108],[108,109],[146,43],[43,91],[91,146],[231,230],[230,120],[120,231],[113,226],[226,247],[247,113],[105,63],[63,52],[52,105],[241,238],[238,242],[242,241],[124,46],[46,156],[156,124],[95,78],[78,96],[96,95],[70,46],[46,63],[63,70],[116,143],[143,227],[227,116],[116,123],[123,111],[111,116],[1,44],[44,19],[19,1],[3,236],[236,51],[51,3],[207,216],[216,205],[205,207],[26,154],[154,22],[22,26],[165,39],[39,167],[167,165],[199,200],[200,208],[208,199],[101,36],[36,100],[100,101],[43,57],[57,202],[202,43],[242,20],[20,99],[99,242],[56,28],[28,157],[157,56],[124,35],[35,113],[113,124],[29,160],[160,27],[27,29],[211,204],[204,210],[210,211],[124,113],[113,46],[46,124],[106,43],[43,204],[204,106],[96,62],[62,77],[77,96],[227,137],[137,116],[116,227],[73,41],[41,72],[72,73],[36,203],[203,142],[142,36],[235,64],[64,240],[240,235],[48,49],[49,64],[64,48],[42,41],[41,74],[74,42],[214,212],[212,207],[207,214],[183,42],[42,184],[184,183],[210,169],[169,211],[211,210],[140,170],[170,176],[176,140],[104,105],[105,69],[69,104],[193,122],[122,168],[168,193],[50,123],[123,187],[187,50],[89,96],[96,90],[90,89],[66,65],[65,107],[107,66],[179,89],[89,180],[180,179],[119,101],[101,120],[120,119],[68,63],[63,104],[104,68],[234,93],[93,227],[227,234],[16,15],[15,85],[85,16],[209,129],[129,49],[49,209],[15,14],[14,86],[86,15],[107,55],[55,9],[9,107],[120,100],[100,121],[121,120],[153,145],[145,22],[22,153],[178,88],[88,179],[179,178],[197,6],[6,196],[196,197],[89,88],[88,96],[96,89],[135,138],[138,136],[136,135],[138,215],[215,172],[172,138],[218,115],[115,219],[219,218],[41,42],[42,81],[81,41],[5,195],[195,51],[51,5],[57,43],[43,61],[61,57],[208,171],[171,199],[199,208],[41,81],[81,38],[38,41],[224,53],[53,225],[225,224],[24,144],[144,110],[110,24],[105,52],[52,66],[66,105],[118,229],[229,117],[117,118],[227,34],[34,234],[234,227],[66,107],[107,69],[69,66],[10,109],[109,151],[151,10],[219,48],[48,235],[235,219],[183,62],[62,191],[191,183],[142,129],[129,126],[126,142],[116,111],[111,143],[143,116],[118,117],[117,50],[50,118],[223,222],[222,52],[52,223],[94,19],[19,141],[141,94],[222,221],[221,65],[65,222],[196,3],[3,197],[197,196],[45,220],[220,44],[44,45],[156,70],[70,139],[139,156],[188,122],[122,245],[245,188],[139,71],[71,162],[162,139],[149,170],[170,150],[150,149],[122,188],[188,196],[196,122],[206,216],[216,92],[92,206],[164,2],[2,167],[167,164],[242,141],[141,241],[241,242],[0,164],[164,37],[37,0],[11,72],[72,12],[12,11],[12,38],[38,13],[13,12],[70,63],[63,71],[71,70],[31,226],[226,111],[111,31],[36,101],[101,205],[205,36],[203,206],[206,165],[165,203],[126,209],[209,217],[217,126],[98,165],[165,97],[97,98],[237,220],[220,218],[218,237],[237,239],[239,241],[241,237],[210,214],[214,169],[169,210],[140,171],[171,32],[32,140],[241,125],[125,237],[237,241],[179,86],[86,178],[178,179],[180,85],[85,179],[179,180],[181,84],[84,180],[180,181],[182,83],[83,181],[181,182],[194,201],[201,182],[182,194],[177,137],[137,132],[132,177],[184,76],[76,183],[183,184],[185,61],[61,184],[184,185],[186,57],[57,185],[185,186],[216,212],[212,186],[186,216],[192,214],[214,187],[187,192],[139,34],[34,156],[156,139],[218,79],[79,237],[237,218],[147,123],[123,177],[177,147],[45,44],[44,4],[4,45],[208,201],[201,32],[32,208],[98,64],[64,129],[129,98],[192,213],[213,138],[138,192],[235,59],[59,219],[219,235],[141,242],[242,97],[97,141],[97,2],[2,141],[141,97],[240,75],[75,235],[235,240],[229,24],[24,228],[228,229],[31,25],[25,226],[226,31],[230,23],[23,229],[229,230],[231,22],[22,230],[230,231],[232,26],[26,231],[231,232],[233,112],[112,232],[232,233],[244,189],[189,243],[243,244],[189,221],[221,190],[190,189],[222,28],[28,221],[221,222],[223,27],[27,222],[222,223],[224,29],[29,223],[223,224],[225,30],[30,224],[224,225],[113,247],[247,225],[225,113],[99,60],[60,240],[240,99],[213,147],[147,215],[215,213],[60,20],[20,166],[166,60],[192,187],[187,213],[213,192],[243,112],[112,244],[244,243],[244,233],[233,245],[245,244],[245,128],[128,188],[188,245],[188,114],[114,174],[174,188],[134,131],[131,220],[220,134],[174,217],[217,236],[236,174],[236,198],[198,134],[134,236],[215,177],[177,58],[58,215],[156,143],[143,124],[124,156],[25,110],[110,7],[7,25],[31,228],[228,25],[25,31],[264,356],[356,368],[368,264],[0,11],[11,267],[267,0],[451,452],[452,349],[349,451],[267,302],[302,269],[269,267],[350,357],[357,277],[277,350],[350,452],[452,357],[357,350],[299,333],[333,297],[297,299],[396,175],[175,377],[377,396],[280,347],[347,330],[330,280],[269,303],[303,270],[270,269],[151,9],[9,337],[337,151],[344,278],[278,360],[360,344],[424,418],[418,431],[431,424],[270,304],[304,409],[409,270],[272,310],[310,407],[407,272],[322,270],[270,410],[410,322],[449,450],[450,347],[347,449],[432,422],[422,434],[434,432],[18,313],[313,17],[17,18],[291,306],[306,375],[375,291],[259,387],[387,260],[260,259],[424,335],[335,418],[418,424],[434,364],[364,416],[416,434],[391,423],[423,327],[327,391],[301,251],[251,298],[298,301],[275,281],[281,4],[4,275],[254,373],[373,253],[253,254],[375,307],[307,321],[321,375],[280,425],[425,411],[411,280],[200,421],[421,18],[18,200],[335,321],[321,406],[406,335],[321,320],[320,405],[405,321],[314,315],[315,17],[17,314],[423,426],[426,266],[266,423],[396,377],[377,369],[369,396],[270,322],[322,269],[269,270],[413,417],[417,464],[464,413],[385,386],[386,258],[258,385],[248,456],[456,419],[419,248],[298,284],[284,333],[333,298],[168,417],[417,8],[8,168],[448,346],[346,261],[261,448],[417,413],[413,285],[285,417],[326,327],[327,328],[328,326],[277,355],[355,329],[329,277],[309,392],[392,438],[438,309],[381,382],[382,256],[256,381],[279,429],[429,360],[360,279],[365,364],[364,379],[379,365],[355,277],[277,437],[437,355],[282,443],[443,283],[283,282],[281,275],[275,363],[363,281],[395,431],[431,369],[369,395],[299,297],[297,337],[337,299],[335,273],[273,321],[321,335],[348,450],[450,349],[349,348],[359,446],[446,467],[467,359],[283,293],[293,282],[282,283],[250,458],[458,462],[462,250],[300,276],[276,383],[383,300],[292,308],[308,325],[325,292],[283,276],[276,293],[293,283],[264,372],[372,447],[447,264],[346,352],[352,340],[340,346],[354,274],[274,19],[19,354],[363,456],[456,281],[281,363],[426,436],[436,425],[425,426],[380,381],[381,252],[252,380],[267,269],[269,393],[393,267],[421,200],[200,428],[428,421],[371,266],[266,329],[329,371],[432,287],[287,422],[422,432],[290,250],[250,328],[328,290],[385,258],[258,384],[384,385],[446,265],[265,342],[342,446],[386,387],[387,257],[257,386],[422,424],[424,430],[430,422],[445,342],[342,276],[276,445],[422,273],[273,424],[424,422],[306,292],[292,307],[307,306],[352,366],[366,345],[345,352],[268,271],[271,302],[302,268],[358,423],[423,371],[371,358],[327,294],[294,460],[460,327],[331,279],[279,294],[294,331],[303,271],[271,304],[304,303],[436,432],[432,427],[427,436],[304,272],[272,408],[408,304],[395,394],[394,431],[431,395],[378,395],[395,400],[400,378],[296,334],[334,299],[299,296],[6,351],[351,168],[168,6],[376,352],[352,411],[411,376],[307,325],[325,320],[320,307],[285,295],[295,336],[336,285],[320,319],[319,404],[404,320],[329,330],[330,349],[349,329],[334,293],[293,333],[333,334],[366,323],[323,447],[447,366],[316,15],[15,315],[315,316],[331,358],[358,279],[279,331],[317,14],[14,316],[316,317],[8,285],[285,9],[9,8],[277,329],[329,350],[350,277],[253,374],[374,252],[252,253],[319,318],[318,403],[403,319],[351,6],[6,419],[419,351],[324,318],[318,325],[325,324],[397,367],[367,365],[365,397],[288,435],[435,397],[397,288],[278,344],[344,439],[439,278],[310,272],[272,311],[311,310],[248,195],[195,281],[281,248],[375,273],[273,291],[291,375],[175,396],[396,199],[199,175],[312,311],[311,268],[268,312],[276,283],[283,445],[445,276],[390,373],[373,339],[339,390],[295,282],[282,296],[296,295],[448,449],[449,346],[346,448],[356,264],[264,454],[454,356],[337,336],[336,299],[299,337],[337,338],[338,151],[151,337],[294,278],[278,455],[455,294],[308,292],[292,415],[415,308],[429,358],[358,355],[355,429],[265,340],[340,372],[372,265],[352,346],[346,280],[280,352],[295,442],[442,282],[282,295],[354,19],[19,370],[370,354],[285,441],[441,295],[295,285],[195,248],[248,197],[197,195],[457,440],[440,274],[274,457],[301,300],[300,368],[368,301],[417,351],[351,465],[465,417],[251,301],[301,389],[389,251],[394,395],[395,379],[379,394],[399,412],[412,419],[419,399],[410,436],[436,322],[322,410],[326,2],[2,393],[393,326],[354,370],[370,461],[461,354],[393,164],[164,267],[267,393],[268,302],[302,12],[12,268],[312,268],[268,13],[13,312],[298,293],[293,301],[301,298],[265,446],[446,340],[340,265],[280,330],[330,425],[425,280],[322,426],[426,391],[391,322],[420,429],[429,437],[437,420],[393,391],[391,326],[326,393],[344,440],[440,438],[438,344],[458,459],[459,461],[461,458],[364,434],[434,394],[394,364],[428,396],[396,262],[262,428],[274,354],[354,457],[457,274],[317,316],[316,402],[402,317],[316,315],[315,403],[403,316],[315,314],[314,404],[404,315],[314,313],[313,405],[405,314],[313,421],[421,406],[406,313],[323,366],[366,361],[361,323],[292,306],[306,407],[407,292],[306,291],[291,408],[408,306],[291,287],[287,409],[409,291],[287,432],[432,410],[410,287],[427,434],[434,411],[411,427],[372,264],[264,383],[383,372],[459,309],[309,457],[457,459],[366,352],[352,401],[401,366],[1,274],[274,4],[4,1],[418,421],[421,262],[262,418],[331,294],[294,358],[358,331],[435,433],[433,367],[367,435],[392,289],[289,439],[439,392],[328,462],[462,326],[326,328],[94,2],[2,370],[370,94],[289,305],[305,455],[455,289],[339,254],[254,448],[448,339],[359,255],[255,446],[446,359],[254,253],[253,449],[449,254],[253,252],[252,450],[450,253],[252,256],[256,451],[451,252],[256,341],[341,452],[452,256],[414,413],[413,463],[463,414],[286,441],[441,414],[414,286],[286,258],[258,441],[441,286],[258,257],[257,442],[442,258],[257,259],[259,443],[443,257],[259,260],[260,444],[444,259],[260,467],[467,445],[445,260],[309,459],[459,250],[250,309],[305,289],[289,290],[290,305],[305,290],[290,460],[460,305],[401,376],[376,435],[435,401],[309,250],[250,392],[392,309],[376,411],[411,433],[433,376],[453,341],[341,464],[464,453],[357,453],[453,465],[465,357],[343,357],[357,412],[412,343],[437,343],[343,399],[399,437],[344,360],[360,440],[440,344],[420,437],[437,456],[456,420],[360,420],[420,363],[363,360],[361,401],[401,288],[288,361],[265,372],[372,353],[353,265],[390,339],[339,249],[249,390],[339,448],[448,255],[255,339]);function vp(e){e.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]}}var Se=class extends Cn{constructor(e,t){super(new Qn(e,t),"image_in","norm_rect",!1),this.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]},this.outputFacialTransformationMatrixes=this.outputFaceBlendshapes=!1,Lt(e=this.h=new tg,0,1,t=new Re),this.A=new Q0,Lt(this.h,0,3,this.A),this.u=new Nc,Lt(this.h,0,2,this.u),Hi(this.u,4,1),Ct(this.u,2,.5),Ct(this.A,2,.5),Ct(this.h,4,.5)}get baseOptions(){return te(this.h,Re,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return"numFaces"in e&&Hi(this.u,4,e.numFaces??1),"minFaceDetectionConfidence"in e&&Ct(this.u,2,e.minFaceDetectionConfidence??.5),"minTrackingConfidence"in e&&Ct(this.h,4,e.minTrackingConfidence??.5),"minFacePresenceConfidence"in e&&Ct(this.A,2,e.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in e&&(this.outputFaceBlendshapes=!!e.outputFaceBlendshapes),"outputFacialTransformationMatrixes"in e&&(this.outputFacialTransformationMatrixes=!!e.outputFacialTransformationMatrixes),this.l(e)}F(e,t){return vp(this),ti(this,e,t),this.j}G(e,t,n){return vp(this),Ei(this,e,n,t),this.j}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"norm_rect"),ee(e,"face_landmarks");const t=new Pn;Si(t,VS,this.h);const n=new _n;Rn(n,2,"mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),$t(n,"NORM_LANDMARKS:face_landmarks"),n.o(t),Hn(e,n),this.g.attachProtoVectorListener("face_landmarks",(i,s)=>{for(const r of i)i=Wa(r),this.j.faceLandmarks.push(Fc(i));mt(this,s)}),this.g.attachEmptyPacketListener("face_landmarks",i=>{mt(this,i)}),this.outputFaceBlendshapes&&(ee(e,"blendshapes"),$t(n,"BLENDSHAPES:blendshapes"),this.g.attachProtoVectorListener("blendshapes",(i,s)=>{if(this.outputFaceBlendshapes)for(const r of i)i=Uc(r),this.j.faceBlendshapes.push(Qu(i.g()??[]));mt(this,s)}),this.g.attachEmptyPacketListener("blendshapes",i=>{mt(this,i)})),this.outputFacialTransformationMatrixes&&(ee(e,"face_geometry"),$t(n,"FACE_GEOMETRY:face_geometry"),this.g.attachProtoVectorListener("face_geometry",(i,s)=>{if(this.outputFacialTransformationMatrixes)for(const r of i)(i=te(i=zS(r),LS,2))&&this.j.facialTransformationMatrixes.push({rows:zn(i,1)??0??0,columns:zn(i,2)??0??0,data:Ns(i,3,ui,Us()).slice()??[]});mt(this,s)}),this.g.attachEmptyPacketListener("face_geometry",i=>{mt(this,i)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Se.prototype.detectForVideo=Se.prototype.G,Se.prototype.detect=Se.prototype.F,Se.prototype.setOptions=Se.prototype.o,Se.createFromModelPath=function(e,t){return Zt(Se,e,{baseOptions:{modelAssetPath:t}})},Se.createFromModelBuffer=function(e,t){return Zt(Se,e,{baseOptions:{modelAssetBuffer:t}})},Se.createFromOptions=function(e,t){return Zt(Se,e,t)},Se.FACE_LANDMARKS_LIPS=nd,Se.FACE_LANDMARKS_LEFT_EYE=id,Se.FACE_LANDMARKS_LEFT_EYEBROW=sd,Se.FACE_LANDMARKS_LEFT_IRIS=Cg,Se.FACE_LANDMARKS_RIGHT_EYE=rd,Se.FACE_LANDMARKS_RIGHT_EYEBROW=ad,Se.FACE_LANDMARKS_RIGHT_IRIS=Pg,Se.FACE_LANDMARKS_FACE_OVAL=od,Se.FACE_LANDMARKS_CONTOURS=Lg,Se.FACE_LANDMARKS_TESSELATION=Ig;var cd=Jn([0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]);function xp(e){e.gestures=[],e.landmarks=[],e.worldLandmarks=[],e.handedness=[]}function Mp(e){return e.gestures.length===0?{gestures:[],landmarks:[],worldLandmarks:[],handedness:[],handednesses:[]}:{gestures:e.gestures,landmarks:e.landmarks,worldLandmarks:e.worldLandmarks,handedness:e.handedness,handednesses:e.handedness}}function Sp(e,t=!0){const n=[];for(const s of e){var i=Uc(s);e=[];for(const r of i.g())i=t&&zn(r,1)!=null?zn(r,1)??0:-1,e.push({score:Le(r,2)??0,index:i,categoryName:Je(Ee(r,3))??""??"",displayName:Je(Ee(r,4))??""??""});n.push(e)}return n}var mn=class extends Cn{constructor(e,t){super(new Qn(e,t),"image_in","norm_rect",!1),this.gestures=[],this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Lt(e=this.j=new ig,0,1,t=new Re),this.u=new ju,Lt(this.j,0,2,this.u),this.D=new $u,Lt(this.u,0,3,this.D),this.A=new ng,Lt(this.u,0,2,this.A),this.h=new GS,Lt(this.j,0,3,this.h),Ct(this.A,2,.5),Ct(this.u,4,.5),Ct(this.D,2,.5)}get baseOptions(){return te(this.j,Re,1)}set baseOptions(e){Lt(this.j,0,1,e)}o(e){var s,r,a,o;if(Hi(this.A,3,e.numHands??1),"minHandDetectionConfidence"in e&&Ct(this.A,2,e.minHandDetectionConfidence??.5),"minTrackingConfidence"in e&&Ct(this.u,4,e.minTrackingConfidence??.5),"minHandPresenceConfidence"in e&&Ct(this.D,2,e.minHandPresenceConfidence??.5),e.cannedGesturesClassifierOptions){var t=new fr,n=t,i=Wh(e.cannedGesturesClassifierOptions,(s=te(this.h,fr,3))==null?void 0:s.l());Lt(n,0,2,i),Lt(this.h,0,3,t)}else e.cannedGesturesClassifierOptions===void 0&&((r=te(this.h,fr,3))==null||r.g());return e.customGesturesClassifierOptions?(Lt(n=t=new fr,0,2,i=Wh(e.customGesturesClassifierOptions,(a=te(this.h,fr,4))==null?void 0:a.l())),Lt(this.h,0,4,t)):e.customGesturesClassifierOptions===void 0&&((o=te(this.h,fr,4))==null||o.g()),this.l(e)}Ha(e,t){return xp(this),ti(this,e,t),Mp(this)}Ia(e,t,n){return xp(this),Ei(this,e,n,t),Mp(this)}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"norm_rect"),ee(e,"hand_gestures"),ee(e,"hand_landmarks"),ee(e,"world_hand_landmarks"),ee(e,"handedness");const t=new Pn;Si(t,HS,this.j);const n=new _n;Rn(n,2,"mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),$t(n,"HAND_GESTURES:hand_gestures"),$t(n,"LANDMARKS:hand_landmarks"),$t(n,"WORLD_LANDMARKS:world_hand_landmarks"),$t(n,"HANDEDNESS:handedness"),n.o(t),Hn(e,n),this.g.attachProtoVectorListener("hand_landmarks",(i,s)=>{for(const r of i){i=Wa(r);const a=[];for(const o of Gi(i,$0,1))a.push({x:Le(o,1)??0,y:Le(o,2)??0,z:Le(o,3)??0,visibility:Le(o,4)??0});this.landmarks.push(a)}mt(this,s)}),this.g.attachEmptyPacketListener("hand_landmarks",i=>{mt(this,i)}),this.g.attachProtoVectorListener("world_hand_landmarks",(i,s)=>{for(const r of i){i=xr(r);const a=[];for(const o of Gi(i,q0,1))a.push({x:Le(o,1)??0,y:Le(o,2)??0,z:Le(o,3)??0,visibility:Le(o,4)??0});this.worldLandmarks.push(a)}mt(this,s)}),this.g.attachEmptyPacketListener("world_hand_landmarks",i=>{mt(this,i)}),this.g.attachProtoVectorListener("hand_gestures",(i,s)=>{this.gestures.push(...Sp(i,!1)),mt(this,s)}),this.g.attachEmptyPacketListener("hand_gestures",i=>{mt(this,i)}),this.g.attachProtoVectorListener("handedness",(i,s)=>{this.handedness.push(...Sp(i)),mt(this,s)}),this.g.attachEmptyPacketListener("handedness",i=>{mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};function yp(e){return{landmarks:e.landmarks,worldLandmarks:e.worldLandmarks,handednesses:e.handedness,handedness:e.handedness}}mn.prototype.recognizeForVideo=mn.prototype.Ia,mn.prototype.recognize=mn.prototype.Ha,mn.prototype.setOptions=mn.prototype.o,mn.createFromModelPath=function(e,t){return Zt(mn,e,{baseOptions:{modelAssetPath:t}})},mn.createFromModelBuffer=function(e,t){return Zt(mn,e,{baseOptions:{modelAssetBuffer:t}})},mn.createFromOptions=function(e,t){return Zt(mn,e,t)},mn.HAND_CONNECTIONS=cd;var Sn=class extends Cn{constructor(e,t){super(new Qn(e,t),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Lt(e=this.h=new ju,0,1,t=new Re),this.u=new $u,Lt(this.h,0,3,this.u),this.j=new ng,Lt(this.h,0,2,this.j),Hi(this.j,3,1),Ct(this.j,2,.5),Ct(this.u,2,.5),Ct(this.h,4,.5)}get baseOptions(){return te(this.h,Re,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return"numHands"in e&&Hi(this.j,3,e.numHands??1),"minHandDetectionConfidence"in e&&Ct(this.j,2,e.minHandDetectionConfidence??.5),"minTrackingConfidence"in e&&Ct(this.h,4,e.minTrackingConfidence??.5),"minHandPresenceConfidence"in e&&Ct(this.u,2,e.minHandPresenceConfidence??.5),this.l(e)}F(e,t){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],ti(this,e,t),yp(this)}G(e,t,n){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Ei(this,e,n,t),yp(this)}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"norm_rect"),ee(e,"hand_landmarks"),ee(e,"world_hand_landmarks"),ee(e,"handedness");const t=new Pn;Si(t,WS,this.h);const n=new _n;Rn(n,2,"mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),$t(n,"LANDMARKS:hand_landmarks"),$t(n,"WORLD_LANDMARKS:world_hand_landmarks"),$t(n,"HANDEDNESS:handedness"),n.o(t),Hn(e,n),this.g.attachProtoVectorListener("hand_landmarks",(i,s)=>{for(const r of i)i=Wa(r),this.landmarks.push(Fc(i));mt(this,s)}),this.g.attachEmptyPacketListener("hand_landmarks",i=>{mt(this,i)}),this.g.attachProtoVectorListener("world_hand_landmarks",(i,s)=>{for(const r of i)i=xr(r),this.worldLandmarks.push(Ma(i));mt(this,s)}),this.g.attachEmptyPacketListener("world_hand_landmarks",i=>{mt(this,i)}),this.g.attachProtoVectorListener("handedness",(i,s)=>{var r=this.handedness,a=r.push;const o=[];for(const c of i){i=Uc(c);const l=[];for(const u of i.g())l.push({score:Le(u,2)??0,index:zn(u,1)??0??-1,categoryName:Je(Ee(u,3))??""??"",displayName:Je(Ee(u,4))??""??""});o.push(l)}a.call(r,...o),mt(this,s)}),this.g.attachEmptyPacketListener("handedness",i=>{mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Sn.prototype.detectForVideo=Sn.prototype.G,Sn.prototype.detect=Sn.prototype.F,Sn.prototype.setOptions=Sn.prototype.o,Sn.createFromModelPath=function(e,t){return Zt(Sn,e,{baseOptions:{modelAssetPath:t}})},Sn.createFromModelBuffer=function(e,t){return Zt(Sn,e,{baseOptions:{modelAssetBuffer:t}})},Sn.createFromOptions=function(e,t){return Zt(Sn,e,t)},Sn.HAND_CONNECTIONS=cd;var Dg=Jn([0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]);function Ep(e){e.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]}}function bp(e){try{if(!e.D)return e.h;e.D(e.h)}finally{Bc(e)}}function To(e,t){e=Wa(e),t.push(Fc(e))}var ve=class extends Cn{constructor(e,t){super(new Qn(e,t),"input_frames_image",null,!1),this.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]},this.outputPoseSegmentationMasks=this.outputFaceBlendshapes=!1,Lt(e=this.j=new cg,0,1,t=new Re),this.I=new $u,Lt(this.j,0,2,this.I),this.W=new XS,Lt(this.j,0,3,this.W),this.u=new Nc,Lt(this.j,0,4,this.u),this.O=new Q0,Lt(this.j,0,5,this.O),this.A=new ag,Lt(this.j,0,6,this.A),this.M=new og,Lt(this.j,0,7,this.M),Ct(this.u,2,.5),Ct(this.u,3,.3),Ct(this.O,2,.5),Ct(this.A,2,.5),Ct(this.A,3,.3),Ct(this.M,2,.5),Ct(this.I,2,.5)}get baseOptions(){return te(this.j,Re,1)}set baseOptions(e){Lt(this.j,0,1,e)}o(e){return"minFaceDetectionConfidence"in e&&Ct(this.u,2,e.minFaceDetectionConfidence??.5),"minFaceSuppressionThreshold"in e&&Ct(this.u,3,e.minFaceSuppressionThreshold??.3),"minFacePresenceConfidence"in e&&Ct(this.O,2,e.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in e&&(this.outputFaceBlendshapes=!!e.outputFaceBlendshapes),"minPoseDetectionConfidence"in e&&Ct(this.A,2,e.minPoseDetectionConfidence??.5),"minPoseSuppressionThreshold"in e&&Ct(this.A,3,e.minPoseSuppressionThreshold??.3),"minPosePresenceConfidence"in e&&Ct(this.M,2,e.minPosePresenceConfidence??.5),"outputPoseSegmentationMasks"in e&&(this.outputPoseSegmentationMasks=!!e.outputPoseSegmentationMasks),"minHandLandmarksConfidence"in e&&Ct(this.I,2,e.minHandLandmarksConfidence??.5),this.l(e)}F(e,t,n){const i=typeof t!="function"?t:{};return this.D=typeof t=="function"?t:n,Ep(this),ti(this,e,i),bp(this)}G(e,t,n,i){const s=typeof n!="function"?n:{};return this.D=typeof n=="function"?n:i,Ep(this),Ei(this,e,s,t),bp(this)}m(){var e=new Ln;Ae(e,"input_frames_image"),ee(e,"pose_landmarks"),ee(e,"pose_world_landmarks"),ee(e,"face_landmarks"),ee(e,"left_hand_landmarks"),ee(e,"left_hand_world_landmarks"),ee(e,"right_hand_landmarks"),ee(e,"right_hand_world_landmarks");const t=new Pn,n=new $f;Rn(n,1,"type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"),function(s,r){if(r!=null)if(Array.isArray(r))le(s,2,yc(r,0,Ca));else{if(!(typeof r=="string"||r instanceof pi||pu(r)))throw Error("invalid value in Any.value field: "+r+" expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");ns(s,2,gu(r,!1),Ws())}}(n,this.j.g());const i=new _n;Rn(i,2,"mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"),Pu(i,8,$f,n),Me(i,"IMAGE:input_frames_image"),$t(i,"POSE_LANDMARKS:pose_landmarks"),$t(i,"POSE_WORLD_LANDMARKS:pose_world_landmarks"),$t(i,"FACE_LANDMARKS:face_landmarks"),$t(i,"LEFT_HAND_LANDMARKS:left_hand_landmarks"),$t(i,"LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"),$t(i,"RIGHT_HAND_LANDMARKS:right_hand_landmarks"),$t(i,"RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"),i.o(t),Hn(e,i),Oc(this,e),this.g.attachProtoListener("pose_landmarks",(s,r)=>{To(s,this.h.poseLandmarks),mt(this,r)}),this.g.attachEmptyPacketListener("pose_landmarks",s=>{mt(this,s)}),this.g.attachProtoListener("pose_world_landmarks",(s,r)=>{var a=this.h.poseWorldLandmarks;s=xr(s),a.push(Ma(s)),mt(this,r)}),this.g.attachEmptyPacketListener("pose_world_landmarks",s=>{mt(this,s)}),this.outputPoseSegmentationMasks&&($t(i,"POSE_SEGMENTATION_MASK:pose_segmentation_mask"),Nr(this,"pose_segmentation_mask"),this.g.Z("pose_segmentation_mask",(s,r)=>{this.h.poseSegmentationMasks=[Or(this,s,!0,!this.D)],mt(this,r)}),this.g.attachEmptyPacketListener("pose_segmentation_mask",s=>{this.h.poseSegmentationMasks=[],mt(this,s)})),this.g.attachProtoListener("face_landmarks",(s,r)=>{To(s,this.h.faceLandmarks),mt(this,r)}),this.g.attachEmptyPacketListener("face_landmarks",s=>{mt(this,s)}),this.outputFaceBlendshapes&&(ee(e,"extra_blendshapes"),$t(i,"FACE_BLENDSHAPES:extra_blendshapes"),this.g.attachProtoListener("extra_blendshapes",(s,r)=>{var a=this.h.faceBlendshapes;this.outputFaceBlendshapes&&(s=Uc(s),a.push(Qu(s.g()??[]))),mt(this,r)}),this.g.attachEmptyPacketListener("extra_blendshapes",s=>{mt(this,s)})),this.g.attachProtoListener("left_hand_landmarks",(s,r)=>{To(s,this.h.leftHandLandmarks),mt(this,r)}),this.g.attachEmptyPacketListener("left_hand_landmarks",s=>{mt(this,s)}),this.g.attachProtoListener("left_hand_world_landmarks",(s,r)=>{var a=this.h.leftHandWorldLandmarks;s=xr(s),a.push(Ma(s)),mt(this,r)}),this.g.attachEmptyPacketListener("left_hand_world_landmarks",s=>{mt(this,s)}),this.g.attachProtoListener("right_hand_landmarks",(s,r)=>{To(s,this.h.rightHandLandmarks),mt(this,r)}),this.g.attachEmptyPacketListener("right_hand_landmarks",s=>{mt(this,s)}),this.g.attachProtoListener("right_hand_world_landmarks",(s,r)=>{var a=this.h.rightHandWorldLandmarks;s=xr(s),a.push(Ma(s)),mt(this,r)}),this.g.attachEmptyPacketListener("right_hand_world_landmarks",s=>{mt(this,s)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};ve.prototype.detectForVideo=ve.prototype.G,ve.prototype.detect=ve.prototype.F,ve.prototype.setOptions=ve.prototype.o,ve.createFromModelPath=function(e,t){return Zt(ve,e,{baseOptions:{modelAssetPath:t}})},ve.createFromModelBuffer=function(e,t){return Zt(ve,e,{baseOptions:{modelAssetBuffer:t}})},ve.createFromOptions=function(e,t){return Zt(ve,e,t)},ve.HAND_CONNECTIONS=cd,ve.POSE_CONNECTIONS=Dg,ve.FACE_LANDMARKS_LIPS=nd,ve.FACE_LANDMARKS_LEFT_EYE=id,ve.FACE_LANDMARKS_LEFT_EYEBROW=sd,ve.FACE_LANDMARKS_LEFT_IRIS=Cg,ve.FACE_LANDMARKS_RIGHT_EYE=rd,ve.FACE_LANDMARKS_RIGHT_EYEBROW=ad,ve.FACE_LANDMARKS_RIGHT_IRIS=Pg,ve.FACE_LANDMARKS_FACE_OVAL=od,ve.FACE_LANDMARKS_CONTOURS=Lg,ve.FACE_LANDMARKS_TESSELATION=Ig;var Un=class extends Cn{constructor(e,t){super(new Qn(e,t),"input_image","norm_rect",!0),this.j={classifications:[]},Lt(e=this.h=new lg,0,1,t=new Re)}get baseOptions(){return te(this.h,Re,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return Lt(this.h,0,2,Wh(e,te(this.h,Yu,2))),this.l(e)}sa(e,t){return this.j={classifications:[]},ti(this,e,t),this.j}ta(e,t,n){return this.j={classifications:[]},Ei(this,e,n,t),this.j}m(){var e=new Ln;Ae(e,"input_image"),Ae(e,"norm_rect"),ee(e,"classifications");const t=new Pn;Si(t,YS,this.h);const n=new _n;Rn(n,2,"mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"),Me(n,"IMAGE:input_image"),Me(n,"NORM_RECT:norm_rect"),$t(n,"CLASSIFICATIONS:classifications"),n.o(t),Hn(e,n),this.g.attachProtoListener("classifications",(i,s)=>{this.j=JS(US(i)),mt(this,s)}),this.g.attachEmptyPacketListener("classifications",i=>{mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Un.prototype.classifyForVideo=Un.prototype.ta,Un.prototype.classify=Un.prototype.sa,Un.prototype.setOptions=Un.prototype.o,Un.createFromModelPath=function(e,t){return Zt(Un,e,{baseOptions:{modelAssetPath:t}})},Un.createFromModelBuffer=function(e,t){return Zt(Un,e,{baseOptions:{modelAssetBuffer:t}})},Un.createFromOptions=function(e,t){return Zt(Un,e,t)};var yn=class extends Cn{constructor(e,t){super(new Qn(e,t),"image_in","norm_rect",!0),this.h=new hg,this.embeddings={embeddings:[]},Lt(e=this.h,0,1,t=new Re)}get baseOptions(){return te(this.h,Re,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){var t=this.h,n=te(this.h,ip,2);return n=n?n.clone():new ip,e.l2Normalize!==void 0?le(n,1,Ra(e.l2Normalize)):"l2Normalize"in e&&le(n,1),e.quantize!==void 0?le(n,2,Ra(e.quantize)):"quantize"in e&&le(n,2),Lt(t,0,2,n),this.l(e)}za(e,t){return ti(this,e,t),this.embeddings}Aa(e,t,n){return Ei(this,e,n,t),this.embeddings}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"norm_rect"),ee(e,"embeddings_out");const t=new Pn;Si(t,qS,this.h);const n=new _n;Rn(n,2,"mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),$t(n,"EMBEDDINGS:embeddings_out"),n.o(t),Hn(e,n),this.g.attachProtoListener("embeddings_out",(i,s)=>{i=OS(i),this.embeddings=function(r){return{embeddings:Gi(r,FS,1).map(a=>{var l,u;const o={headIndex:zn(a,3)??0??-1,headName:Je(Ee(a,4))??""??""};var c=a.v;return o0(c,0|c[bt],np,Cl(a,1))!==void 0?(a=Ns(a=te(a,np,Cl(a,1),void 0),1,ui,Us()),o.floatEmbedding=a.slice()):(c=new Uint8Array(0),o.quantizedEmbedding=((u=(l=te(a,NS,Cl(a,2),void 0))==null?void 0:l.na())==null?void 0:u.h())??c),o}),timestampMs:_g(Ee(r,2,void 0,void 0,tc)??n0)}}(i),mt(this,s)}),this.g.attachEmptyPacketListener("embeddings_out",i=>{mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};yn.cosineSimilarity=function(e,t){if(e.floatEmbedding&&t.floatEmbedding)e=lp(e.floatEmbedding,t.floatEmbedding);else{if(!e.quantizedEmbedding||!t.quantizedEmbedding)throw Error("Cannot compute cosine similarity between quantized and float embeddings.");e=lp(cp(e.quantizedEmbedding),cp(t.quantizedEmbedding))}return e},yn.prototype.embedForVideo=yn.prototype.Aa,yn.prototype.embed=yn.prototype.za,yn.prototype.setOptions=yn.prototype.o,yn.createFromModelPath=function(e,t){return Zt(yn,e,{baseOptions:{modelAssetPath:t}})},yn.createFromModelBuffer=function(e,t){return Zt(yn,e,{baseOptions:{modelAssetBuffer:t}})},yn.createFromOptions=function(e,t){return Zt(yn,e,t)};var $h=class{constructor(e,t,n){this.confidenceMasks=e,this.categoryMask=t,this.qualityScores=n}close(){var e,t;(e=this.confidenceMasks)==null||e.forEach(n=>{n.close()}),(t=this.categoryMask)==null||t.close()}};function ry(e){var n,i;const t=function(s){return Gi(s,_n,1)}(e.ca()).filter(s=>(Je(Ee(s,1))??"").includes("mediapipe.tasks.TensorsToSegmentationCalculator"));if(e.u=[],t.length>1)throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");t.length===1&&(((i=(n=te(t[0],Pn,7))==null?void 0:n.j())==null?void 0:i.g())??new Map).forEach((s,r)=>{e.u[Number(r)]=Je(Ee(s,1))??""})}function Ap(e){e.categoryMask=void 0,e.confidenceMasks=void 0,e.qualityScores=void 0}function Tp(e){try{const t=new $h(e.confidenceMasks,e.categoryMask,e.qualityScores);if(!e.j)return t;e.j(t)}finally{Bc(e)}}$h.prototype.close=$h.prototype.close;var pn=class extends Cn{constructor(e,t){super(new Qn(e,t),"image_in","norm_rect",!1),this.u=[],this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new Ju,this.A=new ug,Lt(this.h,0,3,this.A),Lt(e=this.h,0,1,t=new Re)}get baseOptions(){return te(this.h,Re,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return e.displayNamesLocale!==void 0?le(this.h,2,Va(e.displayNamesLocale)):"displayNamesLocale"in e&&le(this.h,2),"outputCategoryMask"in e&&(this.outputCategoryMask=e.outputCategoryMask??!1),"outputConfidenceMasks"in e&&(this.outputConfidenceMasks=e.outputConfidenceMasks??!0),super.l(e)}L(){ry(this)}segment(e,t,n){const i=typeof t!="function"?t:{};return this.j=typeof t=="function"?t:n,Ap(this),ti(this,e,i),Tp(this)}La(e,t,n,i){const s=typeof n!="function"?n:{};return this.j=typeof n=="function"?n:i,Ap(this),Ei(this,e,s,t),Tp(this)}Da(){return this.u}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"norm_rect");const t=new Pn;Si(t,fg,this.h);const n=new _n;Rn(n,2,"mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),n.o(t),Hn(e,n),Oc(this,e),this.outputConfidenceMasks&&(ee(e,"confidence_masks"),$t(n,"CONFIDENCE_MASKS:confidence_masks"),Nr(this,"confidence_masks"),this.g.aa("confidence_masks",(i,s)=>{this.confidenceMasks=i.map(r=>Or(this,r,!0,!this.j)),mt(this,s)}),this.g.attachEmptyPacketListener("confidence_masks",i=>{this.confidenceMasks=[],mt(this,i)})),this.outputCategoryMask&&(ee(e,"category_mask"),$t(n,"CATEGORY_MASK:category_mask"),Nr(this,"category_mask"),this.g.Z("category_mask",(i,s)=>{this.categoryMask=Or(this,i,!1,!this.j),mt(this,s)}),this.g.attachEmptyPacketListener("category_mask",i=>{this.categoryMask=void 0,mt(this,i)})),ee(e,"quality_scores"),$t(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",(i,s)=>{this.qualityScores=i,mt(this,s)}),this.g.attachEmptyPacketListener("quality_scores",i=>{this.categoryMask=void 0,mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};pn.prototype.getLabels=pn.prototype.Da,pn.prototype.segmentForVideo=pn.prototype.La,pn.prototype.segment=pn.prototype.segment,pn.prototype.setOptions=pn.prototype.o,pn.createFromModelPath=function(e,t){return Zt(pn,e,{baseOptions:{modelAssetPath:t}})},pn.createFromModelBuffer=function(e,t){return Zt(pn,e,{baseOptions:{modelAssetBuffer:t}})},pn.createFromOptions=function(e,t){return Zt(pn,e,t)};var jh=class{constructor(e,t,n){this.confidenceMasks=e,this.categoryMask=t,this.qualityScores=n}close(){var e,t;(e=this.confidenceMasks)==null||e.forEach(n=>{n.close()}),(t=this.categoryMask)==null||t.close()}};jh.prototype.close=jh.prototype.close;var ri=class extends Cn{constructor(e,t){super(new Qn(e,t),"image_in","norm_rect_in",!1),this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new Ju,this.u=new ug,Lt(this.h,0,3,this.u),Lt(e=this.h,0,1,t=new Re)}get baseOptions(){return te(this.h,Re,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return"outputCategoryMask"in e&&(this.outputCategoryMask=e.outputCategoryMask??!1),"outputConfidenceMasks"in e&&(this.outputConfidenceMasks=e.outputConfidenceMasks??!0),super.l(e)}segment(e,t,n,i){const s=typeof n!="function"?n:{};if(this.j=typeof n=="function"?n:i,this.qualityScores=this.categoryMask=this.confidenceMasks=void 0,n=this.C+1,i=new pg,t.keypoint&&t.scribble)throw Error("Cannot provide both keypoint and scribble.");if(t.keypoint){var r=new Dl;ns(r,3,Ra(!0),!1),ns(r,1,_a(t.keypoint.x),0),ns(r,2,_a(t.keypoint.y),0),va(i,1,Hh,r)}else{if(!t.scribble)throw Error("Must provide either a keypoint or a scribble.");{const o=new jS;for(r of t.scribble)ns(t=new Dl,3,Ra(!0),!1),ns(t,1,_a(r.x),0),ns(t,2,_a(r.y),0),Pu(o,1,Dl,t);va(i,2,Hh,o)}}this.g.addProtoToStream(i.g(),"mediapipe.tasks.vision.interactive_segmenter.proto.RegionOfInterest","roi_in",n),ti(this,e,s);t:{try{const o=new jh(this.confidenceMasks,this.categoryMask,this.qualityScores);if(!this.j){var a=o;break t}this.j(o)}finally{Bc(this)}a=void 0}return a}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"roi_in"),Ae(e,"norm_rect_in");const t=new Pn;Si(t,fg,this.h);const n=new _n;Rn(n,2,"mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraphV2"),Me(n,"IMAGE:image_in"),Me(n,"ROI:roi_in"),Me(n,"NORM_RECT:norm_rect_in"),n.o(t),Hn(e,n),Oc(this,e),this.outputConfidenceMasks&&(ee(e,"confidence_masks"),$t(n,"CONFIDENCE_MASKS:confidence_masks"),Nr(this,"confidence_masks"),this.g.aa("confidence_masks",(i,s)=>{this.confidenceMasks=i.map(r=>Or(this,r,!0,!this.j)),mt(this,s)}),this.g.attachEmptyPacketListener("confidence_masks",i=>{this.confidenceMasks=[],mt(this,i)})),this.outputCategoryMask&&(ee(e,"category_mask"),$t(n,"CATEGORY_MASK:category_mask"),Nr(this,"category_mask"),this.g.Z("category_mask",(i,s)=>{this.categoryMask=Or(this,i,!1,!this.j),mt(this,s)}),this.g.attachEmptyPacketListener("category_mask",i=>{this.categoryMask=void 0,mt(this,i)})),ee(e,"quality_scores"),$t(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",(i,s)=>{this.qualityScores=i,mt(this,s)}),this.g.attachEmptyPacketListener("quality_scores",i=>{this.categoryMask=void 0,mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};ri.prototype.segment=ri.prototype.segment,ri.prototype.setOptions=ri.prototype.o,ri.createFromModelPath=function(e,t){return Zt(ri,e,{baseOptions:{modelAssetPath:t}})},ri.createFromModelBuffer=function(e,t){return Zt(ri,e,{baseOptions:{modelAssetBuffer:t}})},ri.createFromOptions=function(e,t){return Zt(ri,e,t)};var Nn=class extends Cn{constructor(e,t){super(new Qn(e,t),"input_frame_gpu","norm_rect",!1),this.j={detections:[]},Lt(e=this.h=new mg,0,1,t=new Re)}get baseOptions(){return te(this.h,Re,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return e.displayNamesLocale!==void 0?le(this.h,2,Va(e.displayNamesLocale)):"displayNamesLocale"in e&&le(this.h,2),e.maxResults!==void 0?Hi(this.h,3,e.maxResults):"maxResults"in e&&le(this.h,3),e.scoreThreshold!==void 0?Ct(this.h,4,e.scoreThreshold):"scoreThreshold"in e&&le(this.h,4),e.categoryAllowlist!==void 0?nc(this.h,5,e.categoryAllowlist):"categoryAllowlist"in e&&le(this.h,5),e.categoryDenylist!==void 0?nc(this.h,6,e.categoryDenylist):"categoryDenylist"in e&&le(this.h,6),this.l(e)}F(e,t){return this.j={detections:[]},ti(this,e,t),this.j}G(e,t,n){return this.j={detections:[]},Ei(this,e,n,t),this.j}m(){var e=new Ln;Ae(e,"input_frame_gpu"),Ae(e,"norm_rect"),ee(e,"detections");const t=new Pn;Si(t,KS,this.h);const n=new _n;Rn(n,2,"mediapipe.tasks.vision.ObjectDetectorGraph"),Me(n,"IMAGE:input_frame_gpu"),Me(n,"NORM_RECT:norm_rect"),$t(n,"DETECTIONS:detections"),n.o(t),Hn(e,n),this.g.attachProtoVectorListener("detections",(i,s)=>{for(const r of i)i=Y0(r),this.j.detections.push(vg(i));mt(this,s)}),this.g.attachEmptyPacketListener("detections",i=>{mt(this,i)}),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};Nn.prototype.detectForVideo=Nn.prototype.G,Nn.prototype.detect=Nn.prototype.F,Nn.prototype.setOptions=Nn.prototype.o,Nn.createFromModelPath=async function(e,t){return Zt(Nn,e,{baseOptions:{modelAssetPath:t}})},Nn.createFromModelBuffer=function(e,t){return Zt(Nn,e,{baseOptions:{modelAssetBuffer:t}})},Nn.createFromOptions=function(e,t){return Zt(Nn,e,t)};var Kh=class{constructor(e,t,n){this.landmarks=e,this.worldLandmarks=t,this.segmentationMasks=n}close(){var e;(e=this.segmentationMasks)==null||e.forEach(t=>{t.close()})}};function wp(e){e.landmarks=[],e.worldLandmarks=[],e.segmentationMasks=void 0}function Rp(e){try{const t=new Kh(e.landmarks,e.worldLandmarks,e.segmentationMasks);if(!e.u)return t;e.u(t)}finally{Bc(e)}}Kh.prototype.close=Kh.prototype.close;var En=class extends Cn{constructor(e,t){super(new Qn(e,t),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.outputSegmentationMasks=!1,Lt(e=this.h=new gg,0,1,t=new Re),this.A=new og,Lt(this.h,0,3,this.A),this.j=new ag,Lt(this.h,0,2,this.j),Hi(this.j,4,1),Ct(this.j,2,.5),Ct(this.A,2,.5),Ct(this.h,4,.5)}get baseOptions(){return te(this.h,Re,1)}set baseOptions(e){Lt(this.h,0,1,e)}o(e){return"numPoses"in e&&Hi(this.j,4,e.numPoses??1),"minPoseDetectionConfidence"in e&&Ct(this.j,2,e.minPoseDetectionConfidence??.5),"minTrackingConfidence"in e&&Ct(this.h,4,e.minTrackingConfidence??.5),"minPosePresenceConfidence"in e&&Ct(this.A,2,e.minPosePresenceConfidence??.5),"outputSegmentationMasks"in e&&(this.outputSegmentationMasks=e.outputSegmentationMasks??!1),this.l(e)}F(e,t,n){const i=typeof t!="function"?t:{};return this.u=typeof t=="function"?t:n,wp(this),ti(this,e,i),Rp(this)}G(e,t,n,i){const s=typeof n!="function"?n:{};return this.u=typeof n=="function"?n:i,wp(this),Ei(this,e,s,t),Rp(this)}m(){var e=new Ln;Ae(e,"image_in"),Ae(e,"norm_rect"),ee(e,"normalized_landmarks"),ee(e,"world_landmarks"),ee(e,"segmentation_masks");const t=new Pn;Si(t,ZS,this.h);const n=new _n;Rn(n,2,"mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"),Me(n,"IMAGE:image_in"),Me(n,"NORM_RECT:norm_rect"),$t(n,"NORM_LANDMARKS:normalized_landmarks"),$t(n,"WORLD_LANDMARKS:world_landmarks"),n.o(t),Hn(e,n),Oc(this,e),this.g.attachProtoVectorListener("normalized_landmarks",(i,s)=>{this.landmarks=[];for(const r of i)i=Wa(r),this.landmarks.push(Fc(i));mt(this,s)}),this.g.attachEmptyPacketListener("normalized_landmarks",i=>{this.landmarks=[],mt(this,i)}),this.g.attachProtoVectorListener("world_landmarks",(i,s)=>{this.worldLandmarks=[];for(const r of i)i=xr(r),this.worldLandmarks.push(Ma(i));mt(this,s)}),this.g.attachEmptyPacketListener("world_landmarks",i=>{this.worldLandmarks=[],mt(this,i)}),this.outputSegmentationMasks&&($t(n,"SEGMENTATION_MASK:segmentation_masks"),Nr(this,"segmentation_masks"),this.g.aa("segmentation_masks",(i,s)=>{this.segmentationMasks=i.map(r=>Or(this,r,!0,!this.u)),mt(this,s)}),this.g.attachEmptyPacketListener("segmentation_masks",i=>{this.segmentationMasks=[],mt(this,i)})),e=e.g(),this.setGraph(new Uint8Array(e),!0)}};En.prototype.detectForVideo=En.prototype.G,En.prototype.detect=En.prototype.F,En.prototype.setOptions=En.prototype.o,En.createFromModelPath=function(e,t){return Zt(En,e,{baseOptions:{modelAssetPath:t}})},En.createFromModelBuffer=function(e,t){return Zt(En,e,{baseOptions:{modelAssetBuffer:t}})},En.createFromOptions=function(e,t){return Zt(En,e,t)},En.POSE_CONNECTIONS=Dg;function ay(e,t){return Math.sqrt((e.x-t.x)**2+(e.y-t.y)**2)}function Cp(e,t,n){return e+n*(t-e)}const rs={WRIST:0,THUMB_TIP:4,INDEX_TIP:8,INDEX_MCP:5,MIDDLE_MCP:9,RING_MCP:13,PINKY_MCP:17},wo=[rs.WRIST,rs.INDEX_MCP,rs.MIDDLE_MCP,rs.RING_MCP,rs.PINKY_MCP],oy={Pointing_Up:"pointing",Closed_Fist:"fist",Open_Palm:"openpalm",Thumb_Up:"thumbsup",Thumb_Down:"thumbsdown",Victory:"victory",ILoveYou:"iloveyou"},cy="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm",ly="https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task";class hy{constructor(t=cy,n=.06,i=null){kt(this,"recognizer",null);this.wasmPath=t,this.clickThreshold=n,this.handednessFilter=i}async init(){const t=await Ls.forVisionTasks(this.wasmPath);this.recognizer=await mn.createFromOptions(t,{baseOptions:{modelAssetPath:ly,delegate:"GPU"},numHands:this.handednessFilter?2:1,runningMode:"VIDEO"})}detect(t,n){if(!this.recognizer)return null;const i=this.recognizer.recognizeForVideo(t,n);if(!i.landmarks||i.landmarks.length===0)return null;let s=0;if(this.handednessFilter){const a=i.handedness.findIndex(o=>{var c;return((c=o[0])==null?void 0:c.categoryName)===this.handednessFilter});if(a===-1)return null;s=a}const r=i.gestures[s]??[];return this.analyze(i.landmarks[s],r)}analyze(t,n){const i=t[rs.THUMB_TIP],s=t[rs.INDEX_TIP],r=t[rs.WRIST],a={x:wo.reduce((h,m)=>h+t[m].x,0)/wo.length,y:wo.reduce((h,m)=>h+t[m].y,0)/wo.length},o=ay(i,s),c=n[0],l=c?oy[c.categoryName]??null:null,u=(c==null?void 0:c.score)??0;return{gesture:o<this.clickThreshold?"click":l??"none",gestureName:l,gestureConfidence:u,clickPinchDistance:o,indexTip:{x:s.x,y:s.y},wrist:{x:r.x,y:r.y},palmCenter:a}}destroy(){var t;(t=this.recognizer)==null||t.close(),this.recognizer=null}}const Fn={L_OUTER:33,L_INNER:133,L_TOP:159,L_BOT:145,R_INNER:362,R_OUTER:263,R_TOP:386,R_BOT:374},Pp=468,Lp=473,uy="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm",dy="https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task";function Ro(e,t){return Math.abs(t)<1e-6?.5:e/t}class fy{constructor(t=uy){kt(this,"landmarker",null);this.wasmPath=t}async init(){const t=await Ls.forVisionTasks(this.wasmPath);this.landmarker=await Se.createFromOptions(t,{baseOptions:{modelAssetPath:dy,delegate:"GPU"},outputFaceBlendshapes:!1,runningMode:"VIDEO",numFaces:1})}detect(t,n){var s;if(!this.landmarker)return null;const i=this.landmarker.detectForVideo(t,n);return(s=i.faceLandmarks)!=null&&s.length?this.analyze(i.faceLandmarks[0]):null}analyze(t){const n=Ro(t[Pp].x-t[Fn.L_OUTER].x,t[Fn.L_INNER].x-t[Fn.L_OUTER].x),i=Ro(t[Lp].x-t[Fn.R_INNER].x,t[Fn.R_OUTER].x-t[Fn.R_INNER].x),s=(n+i)/2,r=Ro(t[Pp].y-t[Fn.L_TOP].y,t[Fn.L_BOT].y-t[Fn.L_TOP].y),a=Ro(t[Lp].y-t[Fn.R_TOP].y,t[Fn.R_BOT].y-t[Fn.R_TOP].y),o=(r+a)/2;return{gazeX:s,gazeY:o}}destroy(){var t;(t=this.landmarker)==null||t.close(),this.landmarker=null}}const Ip="handface_key_bindings";function py(e){return{" ":"Space",ArrowUp:"↑",ArrowDown:"↓",ArrowLeft:"←",ArrowRight:"→",Escape:"Esc",Backspace:"⌫",Delete:"Del",Enter:"↵",Tab:"Tab",PageUp:"PgUp",PageDown:"PgDn",Home:"Home",End:"End"}[e]??e}class my{constructor(){kt(this,"bindings",new Map);this.load()}bind(t,n,i){this.bindings.set(t,{gesture:t,key:n,modifiers:i}),this.save()}unbind(t){this.bindings.delete(t),this.save()}getBinding(t){return this.bindings.get(t)}getAll(){return[...this.bindings.values()]}trigger(t){var s,r,a,o;const n=this.bindings.get(t);if(!n)return;const i={key:n.key,bubbles:!0,cancelable:!0,ctrlKey:((s=n.modifiers)==null?void 0:s.ctrl)??!1,altKey:((r=n.modifiers)==null?void 0:r.alt)??!1,shiftKey:((a=n.modifiers)==null?void 0:a.shift)??!1,metaKey:((o=n.modifiers)==null?void 0:o.meta)??!1};document.dispatchEvent(new KeyboardEvent("keydown",i)),document.dispatchEvent(new KeyboardEvent("keyup",i))}save(){try{localStorage.setItem(Ip,JSON.stringify([...this.bindings.entries()]))}catch{}}load(){try{const t=localStorage.getItem(Ip);t&&(this.bindings=new Map(JSON.parse(t)))}catch{}}}const Dp={pointing:{icon:"☝️",label:"Pointing Up",labelKo:"검지 가리키기",builtin:!0,builtinAction:"커서 이동"},fist:{icon:"✊",label:"Closed Fist",labelKo:"주먹",builtin:!0,builtinAction:"스크롤 다운"},openpalm:{icon:"🖐️",label:"Open Palm",labelKo:"펼친 손",builtin:!0,builtinAction:"스크롤 업"},thumbsup:{icon:"👍",label:"Thumbs Up",labelKo:"엄지 위",builtin:!1},thumbsdown:{icon:"👎",label:"Thumbs Down",labelKo:"엄지 아래",builtin:!1},victory:{icon:"✌️",label:"Victory",labelKo:"브이",builtin:!1},iloveyou:{icon:"🤟",label:"I Love You",labelKo:"아이 러브 유",builtin:!1}},ut="hf-",gy=["thumbsup","thumbsdown","victory","iloveyou"],_y=["pointing","fist","openpalm"];class vy{constructor(t){kt(this,"root");kt(this,"fab");kt(this,"panel");kt(this,"styleEl");kt(this,"isOpen",!1);kt(this,"capturingGesture",null);kt(this,"captureHandler",null);kt(this,"detectedGesture",null);this.mapper=t,this.styleEl=this.injectStyles(),this.fab=this.createFab(),this.panel=this.createPanel(),this.root=document.createElement("div"),this.root.setAttribute("data-handface",""),this.root.appendChild(this.fab),this.root.appendChild(this.panel),document.body.appendChild(this.root),this.fab.addEventListener("click",()=>this.toggle())}setDetected(t,n){this.isOpen&&this.detectedGesture!==t&&(this.detectedGesture=t,this.panel.querySelectorAll(`.${ut}row[data-gesture]`).forEach(i=>{const s=i.dataset.gesture;i.classList.toggle(`${ut}active`,s===t&&n>.6)}))}destroy(){this.stopCapture(),this.styleEl.remove(),this.root.remove()}toggle(){this.isOpen?this.close():this.open()}open(){this.isOpen=!0,this.renderRows(),this.panel.classList.add(`${ut}open`),this.fab.classList.add(`${ut}fab-open`)}close(){this.isOpen=!1,this.stopCapture(),this.panel.classList.remove(`${ut}open`),this.fab.classList.remove(`${ut}fab-open`)}startCapture(t){this.stopCapture(),this.capturingGesture=t,this.captureHandler=n=>{if(n.preventDefault(),n.stopImmediatePropagation(),["Shift","Control","Alt","Meta"].includes(n.key)){document.addEventListener("keydown",this.captureHandler,{once:!0,capture:!0});return}this.mapper.bind(t,n.key,{ctrl:n.ctrlKey||void 0,alt:n.altKey||void 0,shift:n.shiftKey||void 0,meta:n.metaKey||void 0}),this.capturingGesture=null,this.captureHandler=null,this.renderRows()},document.addEventListener("keydown",this.captureHandler,{once:!0,capture:!0}),this.renderRows()}stopCapture(){this.captureHandler&&(document.removeEventListener("keydown",this.captureHandler,{capture:!0}),this.captureHandler=null,this.capturingGesture=null)}createFab(){const t=document.createElement("button");return t.className=`${ut}fab`,t.title="handface 제스처 설정",t.innerHTML="✋",t}createPanel(){const t=document.createElement("div");return t.className=`${ut}panel`,t.innerHTML=`
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
    `,t.querySelector(`.${ut}close-btn`).addEventListener("click",()=>this.close()),t}renderRows(){this.renderBuiltin(),this.renderBindings()}renderBuiltin(){const t=this.panel.querySelector(`.${ut}builtin-rows`);t.innerHTML="",t.appendChild(this.makeReadonlyRow("🤌","엄지+검지 핀치","클릭",null));for(const n of _y){const i=Dp[n];t.appendChild(this.makeReadonlyRow(i.icon,i.labelKo,i.builtinAction,n))}}renderBindings(){const t=this.panel.querySelector(`.${ut}binding-rows`);t.innerHTML="";for(const n of gy){const i=Dp[n],s=this.mapper.getBinding(n),r=this.capturingGesture===n;t.appendChild(this.makeBindingRow(n,i.icon,i.labelKo,(s==null?void 0:s.key)??null,r))}}makeReadonlyRow(t,n,i,s){const r=document.createElement("div");return r.className=`${ut}row`,s&&(r.dataset.gesture=s),r.innerHTML=`
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
      `,a.querySelector(`.${ut}edit-btn`).addEventListener("click",()=>this.startCapture(t)),(c=a.querySelector(`.${ut}clear-btn`))==null||c.addEventListener("click",()=>{this.mapper.unbind(t),this.renderRows()})),a}buildKeyLabel(t){var i,s,r,a;const n=[];return(i=t.modifiers)!=null&&i.ctrl&&n.push("Ctrl"),(s=t.modifiers)!=null&&s.alt&&n.push("Alt"),(r=t.modifiers)!=null&&r.shift&&n.push("Shift"),(a=t.modifiers)!=null&&a.meta&&n.push("⌘"),n.push(py(t.key)),n.join("+")}injectStyles(){const t=document.createElement("style");return t.dataset.handface="styles",t.textContent=`
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
    `,document.head.appendChild(t),t}}const xy=.1,My=1e3,Up=12,Sy=900,yy=.022,Np=.04,Ey=.65;function by(e){return e==="right"?"Right":e==="left"?"Left":null}function Fp(e,t,n){return Math.max(0,Math.min(1,(e-t)/(n-t)))}class Ay extends yM{constructor(n={}){super();kt(this,"video");kt(this,"detector");kt(this,"gazeDetector",null);kt(this,"rafId",null);kt(this,"stream",null);kt(this,"panel",null);kt(this,"isClicking",!1);kt(this,"lastClickMs",0);kt(this,"lastGestureMs",new Map);kt(this,"smoothX",.5);kt(this,"smoothY",.5);kt(this,"prevRawX",.5);kt(this,"prevRawY",.5);kt(this,"wasMovingCursor",!1);kt(this,"calibrated",!1);kt(this,"zoneX0",0);kt(this,"zoneX1",1);kt(this,"zoneY0",0);kt(this,"zoneY1",1);kt(this,"flipHorizontal");kt(this,"cursorSource");kt(this,"cursorAnchor");kt(this,"cursorMode");kt(this,"sensitivity");kt(this,"activeZone");kt(this,"gestureGated");kt(this,"ownedVideo");kt(this,"mapper",new my);this.flipHorizontal=n.flipHorizontal??!0,this.cursorSource=n.cursorSource??"hand",this.cursorAnchor=n.cursorAnchor??"palm",this.cursorMode=n.cursorMode??"absolute",this.sensitivity=n.sensitivity??2.5,this.gestureGated=n.gestureGated??!1;const i=this.cursorSource==="gaze"?[.35,.35,.65,.65]:[.3,.1,.95,.85];this.activeZone=n.activeZone??i,[this.zoneX0,this.zoneY0,this.zoneX1,this.zoneY1]=this.activeZone;const s=n.threshold??.05;n.video?(this.video=n.video,this.ownedVideo=!1):(this.video=this.createHiddenVideo(),this.ownedVideo=!0),this.detector=new hy(n.wasmPath,s,by(n.handedness??"right")),this.cursorSource==="gaze"&&(this.gazeDetector=new fy(n.wasmPath))}async start(){await this.detector.init(),this.gazeDetector&&await this.gazeDetector.init(),this.stream=await navigator.mediaDevices.getUserMedia({video:!0}),this.video.srcObject=this.stream,await new Promise(n=>{this.video.onloadedmetadata=()=>{this.video.play(),n()}}),this.loop()}stop(){var n,i,s;this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),(n=this.stream)==null||n.getTracks().forEach(r=>r.stop()),this.stream=null,this.detector.destroy(),(i=this.gazeDetector)==null||i.destroy(),this.gazeDetector=null,(s=this.panel)==null||s.destroy(),this.panel=null,this.ownedVideo&&this.video.remove(),this.removeAllListeners()}recalibrate(){this.calibrated=!1}createPanel(){return this.panel||(this.panel=new vy(this.mapper)),this.panel}createHiddenVideo(){const n=document.createElement("video");return n.style.cssText="position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;",document.body.appendChild(n),n}loop(){this.rafId=requestAnimationFrame(()=>{this.tick(),this.rafId!==null&&this.loop()})}tick(){const n=performance.now(),i=this.detector.detect(this.video,n);let s,r;if(this.gazeDetector){const c=this.gazeDetector.detect(this.video,n);if(!c){i&&this.handleGestureEvents(i,this.currentPos());return}s=this.flipHorizontal?1-c.gazeX:c.gazeX,r=c.gazeY}else{if(!i)return;const c=this.cursorAnchor==="index"?i.indexTip:this.cursorAnchor==="palm"?i.palmCenter:i.wrist;s=this.flipHorizontal?1-c.x:c.x,r=c.y}const a=!this.isClicking&&(this.gazeDetector!==null||!this.gestureGated||(i==null?void 0:i.gestureName)==="pointing");if(a){let c,l;if(this.cursorMode==="relative"){this.wasMovingCursor||(this.prevRawX=s,this.prevRawY=r);const m=(s-this.prevRawX)*this.sensitivity,g=(r-this.prevRawY)*this.sensitivity;c=Math.max(0,Math.min(1,this.smoothX+m)),l=Math.max(0,Math.min(1,this.smoothY+g))}else{if(!this.calibrated){const m=(this.activeZone[2]-this.activeZone[0])/2,g=(this.activeZone[3]-this.activeZone[1])/2;this.zoneX0=s-m,this.zoneX1=s+m,this.zoneY0=r-g,this.zoneY1=r+g,this.smoothX=.5,this.smoothY=.5,this.calibrated=!0}c=Fp(s,this.zoneX0,this.zoneX1),l=Fp(r,this.zoneY0,this.zoneY1)}const u=Math.hypot(s-this.prevRawX,r-this.prevRawY),d=Math.min(u/yy,1),h=Np+d*(Ey-Np);this.smoothX=Cp(this.smoothX,c,h),this.smoothY=Cp(this.smoothY,l,h)}this.prevRawX=s,this.prevRawY=r,this.wasMovingCursor=a;const o=this.currentPos();this.emit("move",o),i&&this.handleGestureEvents(i,o)}currentPos(){return{x:this.smoothX,y:this.smoothY,screenX:Math.round(this.smoothX*window.innerWidth),screenY:Math.round(this.smoothY*window.innerHeight)}}handleGestureEvents(n,i){var r,a;if(n.gesture==="click"){if(!this.isClicking){this.isClicking=!0;const o=Date.now();o-this.lastClickMs>My&&(this.lastClickMs=o,this.emit("click",i))}}else n.clickPinchDistance>xy&&(this.isClicking=!1);this.isClicking||(n.gestureName==="fist"?this.emit("scroll",{deltaY:Up}):n.gestureName==="openpalm"&&this.emit("scroll",{deltaY:-Up}));const s=n.gestureName;if(s){(r=this.panel)==null||r.setDetected(s,n.gestureConfidence);const o=Date.now(),c=this.lastGestureMs.get(s)??0;if(o-c>Sy){this.lastGestureMs.set(s,o);const l={gesture:s,...i,confidence:n.gestureConfidence};this.emit(s,l),this.mapper.trigger(s)}}else(a=this.panel)==null||a.setDetected(null,0)}}const Op="\0";function Ty(e){return(Math.random()*2-1)*e}function ai(e,t,n){const i=new Array(e);for(let s=0;s<e;s++){const r=new Float32Array(t);if(n>0)for(let a=0;a<t;a++)r[a]=Ty(n);i[s]=r}return i}function wy(e,t){let n=-1/0;for(let r=0;r<t;r++)e[r]>n&&(n=e[r]);let i=0;for(let r=0;r<t;r++)e[r]=Math.exp(e[r]-n),i+=e[r];const s=1/i;for(let r=0;r<t;r++)e[r]*=s}class Br{constructor(t={}){this.MAX_VOCAB=t.maxVocab??220,this.CTX=t.contextLen??8,this.EMB=t.embedDim??16,this.H1=t.h1??112,this.H2=t.h2??96,this.H3=t.h3??64,this.lr=t.lr??.035,this.momentum=t.momentum??.9;const n=this.MAX_VOCAB,i=this.CTX*this.EMB;this.vocab=new Map,this.invVocab=[],this.addChar(Op),this.embed=ai(n,this.EMB,.12),this.W1=ai(i,this.H1,.08),this.b1=new Float32Array(this.H1),this.W2=ai(this.H1,this.H2,.1),this.b2=new Float32Array(this.H2),this.W3=ai(this.H2,this.H3,.12),this.b3=new Float32Array(this.H3),this.W4=ai(this.H3,n,.1),this.b4=new Float32Array(n),this.vEmbed=ai(n,this.EMB,0),this.vW1=ai(i,this.H1,0),this.vb1=new Float32Array(this.H1),this.vW2=ai(this.H1,this.H2,0),this.vb2=new Float32Array(this.H2),this.vW3=ai(this.H2,this.H3,0),this.vb3=new Float32Array(this.H3),this.vW4=ai(this.H3,n,0),this.vb4=new Float32Array(n),this.lastX=new Float32Array(i),this.lastH1=new Float32Array(this.H1),this.lastH2=new Float32Array(this.H2),this.lastH3=new Float32Array(this.H3),this.lastLogits=new Float32Array(n),this.lastProbs=new Float32Array(n),this.totalSteps=0,this.lossEMA=null}addChar(t){if(this.vocab.has(t))return this.vocab.get(t);if(this.vocab.size>=this.MAX_VOCAB)return 0;const n=this.vocab.size;return this.vocab.set(t,n),this.invVocab.push(t),n}encode(t){const n=[];for(const i of t){const s=this.addChar(i);n.push(s)}return n}forward(t){const{CTX:n,EMB:i,H1:s,H2:r,H3:a,lastX:o,lastH1:c,lastH2:l,lastH3:u,lastLogits:d,lastProbs:h}=this,m=this.vocab.size;for(let g=0;g<n;g++){const x=t[g]|0,p=this.embed[x];for(let f=0;f<i;f++)o[g*i+f]=p[f]}for(let g=0;g<s;g++){let x=this.b1[g];for(let p=0;p<o.length;p++)x+=o[p]*this.W1[p][g];c[g]=x>0?x:0}for(let g=0;g<r;g++){let x=this.b2[g];for(let p=0;p<s;p++)x+=c[p]*this.W2[p][g];l[g]=x>0?x:0}for(let g=0;g<a;g++){let x=this.b3[g];for(let p=0;p<r;p++)x+=l[p]*this.W3[p][g];u[g]=x>0?x:0}for(let g=0;g<m;g++){let x=this.b4[g];for(let p=0;p<a;p++)x+=u[p]*this.W4[p][g];d[g]=x,h[g]=x}return wy(h,m),h}backward(t,n){const i=this.forward(t),{CTX:s,EMB:r,H1:a,H2:o,H3:c,lr:l,momentum:u}=this,d=this.vocab.size,h=this.lastX,m=this.lastH1,g=this.lastH2,x=this.lastH3,p=-Math.log(Math.max(i[n],1e-9)),f=new Float32Array(d);for(let b=0;b<d;b++)f[b]=i[b];f[n]-=1;for(let b=0;b<c;b++){const v=x[b],E=this.W4[b],k=this.vW4[b];for(let R=0;R<d;R++){const U=v*f[R];k[R]=u*k[R]-l*U,E[R]+=k[R]}}for(let b=0;b<d;b++)this.vb4[b]=u*this.vb4[b]-l*f[b],this.b4[b]+=this.vb4[b];const S=new Float32Array(c);for(let b=0;b<c;b++){if(x[b]<=0)continue;let v=0;const E=this.W4[b];for(let k=0;k<d;k++)v+=E[k]*f[k];S[b]=v}for(let b=0;b<o;b++){const v=g[b],E=this.W3[b],k=this.vW3[b];for(let R=0;R<c;R++){const U=v*S[R];k[R]=u*k[R]-l*U,E[R]+=k[R]}}for(let b=0;b<c;b++)this.vb3[b]=u*this.vb3[b]-l*S[b],this.b3[b]+=this.vb3[b];const T=new Float32Array(o);for(let b=0;b<o;b++){if(g[b]<=0)continue;let v=0;const E=this.W3[b];for(let k=0;k<c;k++)v+=E[k]*S[k];T[b]=v}for(let b=0;b<a;b++){const v=m[b],E=this.W2[b],k=this.vW2[b];for(let R=0;R<o;R++){const U=v*T[R];k[R]=u*k[R]-l*U,E[R]+=k[R]}}for(let b=0;b<o;b++)this.vb2[b]=u*this.vb2[b]-l*T[b],this.b2[b]+=this.vb2[b];const y=new Float32Array(a);for(let b=0;b<a;b++){if(m[b]<=0)continue;let v=0;const E=this.W2[b];for(let k=0;k<o;k++)v+=E[k]*T[k];y[b]=v}const w=s*r,C=new Float32Array(w);for(let b=0;b<w;b++){let v=0;const E=this.W1[b],k=this.vW1[b],R=h[b];for(let U=0;U<a;U++){v+=E[U]*y[U];const V=R*y[U];k[U]=u*k[U]-l*V,E[U]+=k[U]}C[b]=v}for(let b=0;b<a;b++)this.vb1[b]=u*this.vb1[b]-l*y[b],this.b1[b]+=this.vb1[b];for(let b=0;b<s;b++){const v=t[b]|0,E=this.embed[v],k=this.vEmbed[v],R=b*r;for(let U=0;U<r;U++){const V=C[R+U];k[U]=u*k[U]-l*V,E[U]+=k[U]}}return this.totalSteps++,this.lossEMA=this.lossEMA===null?p:this.lossEMA*.98+p*.02,p}trainOnText(t,n=3){const i=this.encode(t);if(i.length<2)return 0;let s=0,r=0;for(let a=0;a<n;a++)for(let o=1;o<i.length;o++){const c=new Array(this.CTX);for(let l=0;l<this.CTX;l++){const u=o-this.CTX+l;c[l]=u>=0?i[u]:0}s+=this.backward(c,i[o]),r++}return r>0?s/r:0}sample(t="",n=80,i=.85,s={}){const r=s.minLength??14,a=this.encode(t),o=[],c=new Array(this.CTX);for(let g=0;g<this.CTX;g++){const x=a.length-this.CTX+g;c[g]=x>=0?a[x]:0}const l=this.vocab.size,u=new Float32Array(l),d=0,h=this.vocab.get(`
`)??-1,m=[".","!","?",",","。","?","!"].map(g=>this.vocab.get(g)??-1).filter(g=>g>=0);for(let g=0;g<n;g++){const x=this.forward(c);let p=0;for(let w=0;w<l;w++)u[w]=Math.pow(x[w]+1e-9,1/i),p+=u[w];if(d<l&&(u[d]=0),h>=0&&h<l&&(u[h]=0),g<r)for(const w of m)w>=0&&w<l&&(u[w]=0);p=0;for(let w=0;w<l;w++)p+=u[w];if(p<1e-9)break;const f=1/p;let S=Math.random(),T=0;for(let w=0;w<l;w++)if(S-=u[w]*f,S<=0){T=w;break}const y=this.invVocab[T];if(!y||y===Op)break;o.push(y);for(let w=0;w<this.CTX-1;w++)c[w]=c[w+1];if(c[this.CTX-1]=T,g>=r&&(y==="."||y==="!"||y==="?"||y==="。"))break}return o.join("")}serialize(){return{vocab:Array.from(this.vocab.entries()),embed:this.embed.map(t=>Array.from(t)),W1:this.W1.map(t=>Array.from(t)),b1:Array.from(this.b1),W2:this.W2.map(t=>Array.from(t)),b2:Array.from(this.b2),W3:this.W3.map(t=>Array.from(t)),b3:Array.from(this.b3),W4:this.W4.map(t=>Array.from(t)),b4:Array.from(this.b4),totalSteps:this.totalSteps,lossEMA:this.lossEMA}}loadFrom(t){if(!t||!t.vocab)return!1;this.vocab.clear(),this.invVocab.length=0;for(const[i,s]of t.vocab)this.vocab.set(i,s),this.invVocab[s]=i;const n=(i,s)=>{for(let r=0;r<s.length;r++)if(Array.isArray(s[r]))for(let a=0;a<s[r].length;a++)i[r][a]=s[r][a];else i[r]=s[r]};return n(this.embed,t.embed),n(this.W1,t.W1),n(this.b1,t.b1),n(this.W2,t.W2),n(this.b2,t.b2),n(this.W3,t.W3),n(this.b3,t.b3),n(this.W4,t.W4),n(this.b4,t.b4),this.totalSteps=t.totalSteps||0,this.lossEMA=t.lossEMA??null,!0}}const Nl="handface-nlm-v2",Ry=300;class ld{constructor(){this.model=new Br({maxVocab:220,contextLen:8,embedDim:16,h1:112,h2:96,h3:64,lr:.035}),this.history=[],this.userMessages=[],this.handlers=new Set,this.busy=!1,this.autoSaveOn=!0,this._tryLoad()}onEvent(t){return this.handlers.add(t),()=>this.handlers.delete(t)}emit(t){for(const n of this.handlers)n(t)}get stats(){return{vocabSize:this.model.vocab.size,maxVocab:this.model.MAX_VOCAB,totalSteps:this.model.totalSteps,lossEMA:this.model.lossEMA,messages:this.history.length}}get modelState(){return{h1:this.model.lastH1,h2:this.model.lastH2,h3:this.model.lastH3,probs:this.model.lastProbs,vocabSize:this.model.vocab.size,embed:this.model.lastX}}layerWeightAverages(){const t=n=>{let i=0,s=0;for(const r of n)for(let a=0;a<r.length;a++)i+=Math.abs(r[a]),s++;return s>0?i/s:0};return[t(this.model.W1),t(this.model.W2),t(this.model.W3),t(this.model.W4)]}async send(t){if(!this.busy){this.busy=!0;try{this.history.push({role:"user",text:t}),this.userMessages.push(t),this.userMessages.length>Ry&&this.userMessages.shift(),this.emit({type:"training-start",message:t});const n=this.model.totalSteps;let i=0,s=0;const r=this.model.trainOnText(t,20);r>0&&(i+=r,s++);const a=this.userMessages.length-1;if(a>0){const x=Math.min(20,a);for(let p=0;p<x;p++){const f=Math.floor(Math.random()*a),S=this.model.trainOnText(this.userMessages[f],5);S>0&&(i+=S,s++)}}if(this.userMessages.length>=2){const x=[],p=Math.min(5,this.userMessages.length);for(let S=0;S<p;S++){const T=Math.floor(Math.random()*this.userMessages.length);x.push(this.userMessages[T])}const f=this.model.trainOnText(x.join(" "),4);f>0&&(i+=f,s++)}const o=this.model.trainOnText(t,10);o>0&&(i+=o,s++);const c=this.model.totalSteps-n,l=s>0?i/s:0;this.emit({type:"training-end",avgLoss:l,stepsRun:c,totalSteps:this.model.totalSteps}),await new Promise(x=>setTimeout(x,16));const u=this.model.lossEMA??4,d=Math.max(.78,Math.min(.95,.55+u*.1)),h=t.length>0?t:" ",m=this.model.sample(h,80,d,{minLength:14}),g=m.length>0?m:"...";return this.history.push({role:"ai",text:g}),this.emit({type:"generate-end",text:g}),this.emit({type:"state",stats:this.stats}),this.autoSaveOn&&this._trySave(),g}finally{this.busy=!1}}}reset(){this.model=new Br({maxVocab:220,contextLen:8,embedDim:16,h1:112,h2:96,h3:64,lr:.035}),this.history.length=0,this.userMessages.length=0;try{localStorage.removeItem(Nl)}catch{}this.emit({type:"state",stats:this.stats})}_trySave(){try{const t=JSON.stringify({model:this.model.serialize(),history:this.history.slice(-40),userMessages:this.userMessages});localStorage.setItem(Nl,t)}catch{}}_tryLoad(){try{const t=localStorage.getItem(Nl);if(!t)return;const n=JSON.parse(t);n.model&&this.model.loadFrom(n.model),n.history&&(this.history=n.history),n.userMessages&&(this.userMessages=n.userMessages)}catch{}}}const Bp="https://api.anthropic.com/v1/messages",kp="2023-06-01",Cy=200,Py="You are the brain AI powering the handface neural mesh demo. Respond concisely in the user's language (usually Korean). Keep responses under 3 sentences. Be helpful and friendly.";class kc{constructor({apiKey:t,model:n="claude-haiku-4-5-20251001"}={}){this.apiKey=t,this.model=n,this.history=[],this.handlers=new Set,this.busy=!1,this.shadow=new Br({maxVocab:220,contextLen:8,embedDim:16,h1:112,h2:96,h3:64,lr:.035}),this.tokenCount=0,this._loadHistory()}onEvent(t){return this.handlers.add(t),()=>this.handlers.delete(t)}emit(t){for(const n of this.handlers)n(t)}get stats(){return{vocabSize:this.shadow.vocab.size,maxVocab:this.shadow.MAX_VOCAB,totalSteps:this.shadow.totalSteps,lossEMA:this.shadow.lossEMA,messages:this.history.length,tokenCount:this.tokenCount,model:this.model}}get modelState(){return{h1:this.shadow.lastH1,h2:this.shadow.lastH2,h3:this.shadow.lastH3,probs:this.shadow.lastProbs,vocabSize:this.shadow.vocab.size,embed:this.shadow.lastX}}layerWeightAverages(){const t=n=>{let i=0,s=0;for(const r of n)for(let a=0;a<r.length;a++)i+=Math.abs(r[a]),s++;return s>0?i/s:0};return[t(this.shadow.W1),t(this.shadow.W2),t(this.shadow.W3),t(this.shadow.W4)]}async send(t){if(!this.busy){this.busy=!0;try{this.history.push({role:"user",text:t}),this.emit({type:"training-start",message:t});const n=this.shadow.totalSteps;this.shadow.trainOnText(t,8);const i=this.shadow.totalSteps-n;this.emit({type:"training-end",avgLoss:this.shadow.lossEMA??4,stepsRun:i,totalSteps:this.shadow.totalSteps});const s=this._buildMessages(),r=await this._callClaude(s);return this.shadow.trainOnText(r,4),this.history.push({role:"ai",text:r}),this.emit({type:"generate-end",text:r}),this.emit({type:"state",stats:this.stats}),this._saveHistory(),r}catch(n){const i=`API Error: ${n.message}`;return this.history.push({role:"ai",text:i}),this.emit({type:"generate-end",text:i}),i}finally{this.busy=!1}}}async _callClaude(t){var r,a;const n=await fetch(Bp,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":kp,"anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:this.model,max_tokens:Cy,system:Py,messages:t})});if(!n.ok){const o=await n.text();throw new Error(`${n.status} — ${o.slice(0,200)}`)}const i=await n.json();return i.usage&&(this.tokenCount+=(i.usage.input_tokens||0)+(i.usage.output_tokens||0)),((a=(r=i.content)==null?void 0:r[0])==null?void 0:a.text)||"..."}_buildMessages(){return this.history.slice(-10).map(n=>({role:n.role==="user"?"user":"assistant",content:n.text}))}async testConnection(){try{return(await fetch(Bp,{method:"POST",headers:{"Content-Type":"application/json","x-api-key":this.apiKey,"anthropic-version":kp,"anthropic-dangerous-direct-browser-access":"true"},body:JSON.stringify({model:this.model,max_tokens:10,messages:[{role:"user",content:"hi"}]})})).ok}catch{return!1}}reset(){this.shadow=new Br({maxVocab:220,contextLen:8,embedDim:16,h1:112,h2:96,h3:64,lr:.035}),this.history.length=0,this.tokenCount=0;try{localStorage.removeItem("handface-claude-history")}catch{}this.emit({type:"state",stats:this.stats})}_saveHistory(){try{localStorage.setItem("handface-claude-history",JSON.stringify({history:this.history.slice(-40),tokenCount:this.tokenCount}))}catch{}}_loadHistory(){try{const t=localStorage.getItem("handface-claude-history");if(!t)return;const n=JSON.parse(t);n.history&&(this.history=n.history),n.tokenCount&&(this.tokenCount=n.tokenCount)}catch{}}}const zp="gemini-2.0-flash",Ly=200,Iy="You are the brain AI powering the handface neural mesh demo. Respond concisely in the user's language (usually Korean). Keep responses under 3 sentences. Be helpful and friendly.";class zc{constructor({apiKey:t}={}){this.apiKey=t,this.history=[],this.handlers=new Set,this.busy=!1,this.shadow=new Br({maxVocab:220,contextLen:8,embedDim:16,h1:112,h2:96,h3:64,lr:.035}),this.tokenCount=0,this._loadHistory()}onEvent(t){return this.handlers.add(t),()=>this.handlers.delete(t)}emit(t){for(const n of this.handlers)n(t)}get stats(){return{vocabSize:this.shadow.vocab.size,maxVocab:this.shadow.MAX_VOCAB,totalSteps:this.shadow.totalSteps,lossEMA:this.shadow.lossEMA,messages:this.history.length,tokenCount:this.tokenCount,model:"gemini-flash"}}get modelState(){return{h1:this.shadow.lastH1,h2:this.shadow.lastH2,h3:this.shadow.lastH3,probs:this.shadow.lastProbs,vocabSize:this.shadow.vocab.size,embed:this.shadow.lastX}}layerWeightAverages(){const t=n=>{let i=0,s=0;for(const r of n)for(let a=0;a<r.length;a++)i+=Math.abs(r[a]),s++;return s>0?i/s:0};return[t(this.shadow.W1),t(this.shadow.W2),t(this.shadow.W3),t(this.shadow.W4)]}async send(t){if(!this.busy){this.busy=!0;try{this.history.push({role:"user",text:t}),this.emit({type:"training-start",message:t});const n=this.shadow.totalSteps;this.shadow.trainOnText(t,8);const i=this.shadow.totalSteps-n;this.emit({type:"training-end",avgLoss:this.shadow.lossEMA??4,stepsRun:i,totalSteps:this.shadow.totalSteps});const s=await this._callGemini();return this.shadow.trainOnText(s,4),this.history.push({role:"ai",text:s}),this.emit({type:"generate-end",text:s}),this.emit({type:"state",stats:this.stats}),this._saveHistory(),s}catch(n){const i=`API Error: ${n.message}`;return this.history.push({role:"ai",text:i}),this.emit({type:"generate-end",text:i}),i}finally{this.busy=!1}}}async _callGemini(){var o,c,l,u,d;const t=`https://generativelanguage.googleapis.com/v1beta/models/${zp}:generateContent?key=${this.apiKey}`,n=[];n.push({role:"user",parts:[{text:Iy}]}),n.push({role:"model",parts:[{text:"Understood."}]});const i=this.history.slice(-10);for(const h of i)n.push({role:h.role==="user"?"user":"model",parts:[{text:h.text}]});const s=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:n,generationConfig:{maxOutputTokens:Ly,temperature:.8}})});if(!s.ok){const h=await s.text();throw new Error(`${s.status} — ${h.slice(0,200)}`)}const r=await s.json();return r.usageMetadata&&(this.tokenCount+=(r.usageMetadata.promptTokenCount||0)+(r.usageMetadata.candidatesTokenCount||0)),((d=(u=(l=(c=(o=r.candidates)==null?void 0:o[0])==null?void 0:c.content)==null?void 0:l.parts)==null?void 0:u[0])==null?void 0:d.text)||"..."}async testConnection(){try{const t=`https://generativelanguage.googleapis.com/v1beta/models/${zp}:generateContent?key=${this.apiKey}`;return(await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:"hi"}]}],generationConfig:{maxOutputTokens:5}})})).ok}catch{return!1}}reset(){this.shadow=new Br({maxVocab:220,contextLen:8,embedDim:16,h1:112,h2:96,h3:64,lr:.035}),this.history.length=0,this.tokenCount=0;try{localStorage.removeItem("handface-gemini-history")}catch{}this.emit({type:"state",stats:this.stats})}_saveHistory(){try{localStorage.setItem("handface-gemini-history",JSON.stringify({history:this.history.slice(-40),tokenCount:this.tokenCount}))}catch{}}_loadHistory(){try{const t=localStorage.getItem("handface-gemini-history");if(!t)return;const n=JSON.parse(t);n.history&&(this.history=n.history),n.tokenCount&&(this.tokenCount=n.tokenCount)}catch{}}}const Pa="handface-provider",La="handface-apikey",Vc="handface-model";function Dy(){const e=localStorage.getItem(Pa)||"local",t=localStorage.getItem(La),n=localStorage.getItem(Vc)||"claude-haiku-4-5-20251001";return e==="gemini"&&t?new zc({apiKey:t}):e==="claude"&&t?new kc({apiKey:t,model:n}):new ld}let Ht=Dy();const kr=document.getElementById("cursor");document.getElementById("flash");const Fl=document.getElementById("s-status"),Uy=document.getElementById("s-pos"),Ny=document.getElementById("s-clicks"),Fy=document.getElementById("s-zoom"),Co=document.getElementById("log"),fa=document.getElementById("start-btn"),Vp=document.getElementById("load-msg"),Gp=document.getElementById("overlay");function Wi(e,t){const n=document.createElement("div");n.className="log-item"+(e?` ${e}`:"");const i=new Date;for(n.textContent=`[${i.getHours()}:${String(i.getMinutes()).padStart(2,"0")}:${String(i.getSeconds()).padStart(2,"0")}] ${t}`,Co.appendChild(n);Co.children.length>9;)Co.removeChild(Co.children[1])}const ia=new SM({antialias:!0});ia.setSize(window.innerWidth,window.innerHeight);ia.setPixelRatio(Math.min(window.devicePixelRatio,2));ia.setClearColor(132104);document.getElementById("canvas-container").appendChild(ia.domElement);const hd=new r1,zr=new Bn(50,window.innerWidth/window.innerHeight,.1,200);zr.position.set(0,.2,7.5);zr.lookAt(0,0,0);let zo=7.5,Ol=7.5;const Xi=new pr;hd.add(Xi);function Ug(e=.55){const n=document.createElement("canvas");n.width=n.height=64;const i=n.getContext("2d"),s=i.createRadialGradient(64/2,64/2,0,64/2,64/2,64/2);s.addColorStop(0,"rgba(255,255,255,1)"),s.addColorStop(e,"rgba(255,255,255,0.55)"),s.addColorStop(1,"rgba(255,255,255,0)"),i.fillStyle=s,i.fillRect(0,0,64,64);const r=new _1(n);return r.minFilter=je,r.magFilter=je,r.needsUpdate=!0,r}const Oy=Ug(.5),ud=Ug(.3),Vn=[12,42,80,56,22],By=[.35,.85,1.4,1.92,2.45],ky=5,zy=3,Vy=4;function Gy(e,t){if(e===1)return[new F(0,0,0)];const n=[],i=Math.PI*(3-Math.sqrt(5)),s=1.32,r=.86,a=.96,o=.06*t;for(let c=0;c<e;c++){const l=1-c/(e-1)*2,u=Math.sqrt(Math.max(0,1-l*l)),d=i*c,h=Math.cos(d)*u,m=l,g=Math.sin(d)*u;let x=1;if(h>.35&&m>-.3){const C=Math.max(0,h-.35);x+=.14*C*(1.1-Math.abs(m+.05))}if(h<-.45&&m>-.25&&(x+=.08*(Math.abs(h)-.45)),Math.abs(g)>.45&&m<0&&(x+=.1*(Math.abs(g)-.45)),h<-.25&&m<-.3){const C=Math.max(0,Math.abs(h+.25)+Math.abs(m+.3)-.15);x+=.18*C}const p=.07*(Math.sin(m*6+d*3)*.55+Math.cos(d*5+m*4)*.45),f=x*(1+p);let S=h*t*s*f,T=m*t*r*f,y=g*t*a*f;y+=y>=0?o:-o;const w=t*.11;S+=(Math.random()-.5)*w,T+=(Math.random()-.5)*w,y+=(Math.random()-.5)*w,n.push(new F(S,T,y))}return n}const Zn=Vn.map((e,t)=>Gy(e,By[t]).map((n,i)=>({pos:n,activation:0,targetActivation:0,layerIdx:t,layerLocalIdx:i}))),hs=Zn.flat(),Fi=[],Hp=new Set,Zh=new Map;hs.forEach((e,t)=>Zh.set(e,t));function dd(e,t,n){const i=Zh.get(e)*1e5+Zh.get(t);Hp.has(i)||(Hp.add(i),Fi.push({src:e,dst:t,intra:n,weight:.12+Math.random()*.88,targetWeight:.12+Math.random()*.88}))}for(let e=0;e<Vn.length-1;e++)for(const t of Zn[e])Zn[e+1].map(n=>({dst:n,d:t.pos.distanceTo(n.pos)})).sort((n,i)=>n.d-i.d).slice(0,ky).forEach(({dst:n})=>dd(t,n,!1));for(let e=1;e<Vn.length;e++)for(const t of Zn[e])Zn[e-1].map(n=>({src:n,d:t.pos.distanceTo(n.pos)})).sort((n,i)=>n.d-i.d).slice(0,zy).forEach(({src:n})=>dd(n,t,!1));for(let e=0;e<Vn.length;e++){const t=Zn[e];for(const n of t)t.filter(i=>i!==n).map(i=>({dst:i,d:n.pos.distanceTo(i.pos)})).sort((i,s)=>i.d-s.d).slice(0,Vy).forEach(({dst:i})=>dd(n,i,!0))}const Vo=new Map,Go=new Map;for(const e of Fi)Vo.has(e.dst)||Vo.set(e.dst,[]),Vo.get(e.dst).push(e),Go.has(e.src)||Go.set(e.src,[]),Go.get(e.src).push(e);(function(){for(const a of[1,-1]){const o=new Fa(2.55,28,22),c=o.attributes.position;for(let l=0;l<c.count;l++){let u=c.getX(l)*1.32,d=c.getY(l)*.86,h=c.getZ(l)*.96;a>0&&h<0&&(h=0),a<0&&h>0&&(h=0);const m=Math.sqrt(u*u+d*d+h*h)||1,g=u/m,x=d/m,p=h/m;let f=1;g>.35&&x>-.3&&(f+=.12*(g-.35)),g<-.45&&x>-.25&&(f+=.06*(Math.abs(g)-.45)),g<-.25&&x<-.3&&(f+=.15*Math.max(0,Math.abs(g+.25)+Math.abs(x+.3)-.15));const S=Math.atan2(p,g),T=.04*(Math.sin(x*5+S*3)+Math.cos(S*4)*.5),y=f*(1+T);u*=y,d*=y,h*=y,h+=a*.153,c.setXYZ(l,u,d,h)}o.computeVertexNormals(),Xi.add(new Tn(o,new Ar({color:3381759,wireframe:!0,blending:mi,transparent:!0,opacity:.055,depthWrite:!1}))),Xi.add(new Tn(o.clone(),new Ar({color:2254540,blending:mi,transparent:!0,opacity:.018,depthWrite:!1})))}})();const Ng=document.getElementById("input-grid");Ng.style.gridTemplateColumns=`repeat(${Vn[0]}, 1fr)`;const Fg=[],Og=[];for(let e=0;e<Vn[0];e++){const t=document.createElement("div");t.className="input-cell";const n=document.createElement("div");n.className="input-cell-fill";const i=document.createElement("div");i.className="input-cell-val",i.textContent="00",t.appendChild(n),t.appendChild(i),Ng.appendChild(t),Fg.push(n),Og.push(i)}const Hy=document.getElementById("weight-list"),Bg=[];for(let e=1;e<Vn.length;e++){const t=document.createElement("div");t.className="weight-row",t.innerHTML=`
    <span class="weight-label">L${e-1}→${e}</span>
    <div class="weight-bar"><div class="weight-fill"></div></div>
    <span class="weight-val">—</span>
  `,Hy.appendChild(t),Bg.push({fill:t.querySelector(".weight-fill"),val:t.querySelector(".weight-val"),layerIdx:e})}const Wy=document.getElementById("pred-list"),kg=8,Ts=[];for(let e=0;e<kg;e++){const t=document.createElement("div");t.className="pred-row",t.innerHTML=`
    <span class="pred-char">·</span>
    <div class="pred-bar"><div class="pred-fill"></div></div>
    <span class="pred-pct">—</span>
  `,Wy.appendChild(t),Ts.push({char:t.querySelector(".pred-char"),fill:t.querySelector(".pred-fill"),pct:t.querySelector(".pred-pct")})}function Jh(){const e=Ht.history.length>0?Ht.history[Ht.history.length-1].text:" ",t=Ht.model.encode(e),n=new Array(Ht.model.CTX);for(let a=0;a<Ht.model.CTX;a++){const o=t.length-Ht.model.CTX+a;n[a]=o>=0?t[o]:0}Ht.model.forward(n);const i=Ht.model.lastProbs,s=Ht.model.vocab.size,r=[];for(let a=1;a<s;a++){const o=Ht.model.invVocab[a];!o||o===`
`||r.push({ch:o,p:i[a]})}r.sort((a,o)=>o.p-a.p);for(let a=0;a<kg;a++){const o=r[a];if(o){const c=o.ch===" "?"␣":o.ch;Ts[a].char.textContent=c,Ts[a].fill.style.width=`${Math.round(o.p*100)}%`,Ts[a].pct.textContent=(o.p*100).toFixed(1)+"%"}else Ts[a].char.textContent="·",Ts[a].fill.style.width="0%",Ts[a].pct.textContent="—"}}const Qh=document.getElementById("loss-spark"),bs=Qh.getContext("2d"),as=[];function Xy(e){Number.isFinite(e)&&(as.push(e),as.length>100&&as.shift(),Yy())}function Yy(){const e=Qh.width,t=Qh.height;if(bs.clearRect(0,0,e,t),as.length<2)return;let n=-1/0,i=1/0;for(const r of as)r>n&&(n=r),r<i&&(i=r);const s=Math.max(.15,n-i);bs.strokeStyle="rgba(255, 200, 80, 0.85)",bs.lineWidth=1.2,bs.beginPath();for(let r=0;r<as.length;r++){const a=r/Math.max(1,as.length-1)*(e-1)+.5,o=1+(n-as[r])/s*(t-2);r===0?bs.moveTo(a,o):bs.lineTo(a,o)}bs.stroke()}const Sa=document.getElementById("chat-msgs"),tu=document.getElementById("chat-input"),qy=document.getElementById("chat-send"),$y=document.getElementById("chat-reset"),jy=document.getElementById("chat-stats"),Ky=document.getElementById("chat-loss-fill");function oc(e,t){const n=document.createElement("div");n.className=`chat-msg ${e}`;const i=document.createElement("span");i.className="chat-msg-role",i.textContent=e;const s=document.createElement("span");s.className="chat-msg-text",s.textContent=" "+t,n.appendChild(i),n.appendChild(s),Sa.appendChild(n),Sa.scrollTop=Sa.scrollHeight}function cc(){const e=Ht.stats,t=e.lossEMA!=null?e.lossEMA.toFixed(2):"—",n=e.tokenCount?` · tokens ${e.tokenCount}`:"";if(jy.textContent=`vocab ${e.vocabSize} · steps ${e.totalSteps} · loss ${t}${n}`,e.lossEMA!=null){const i=Math.max(0,Math.min(1,1-e.lossEMA/5));Ky.style.width=`${Math.round(i*100)}%`}}function fd(){if(Ht.history.length===0)oc("sys","메시지를 입력하면 모델이 학습합니다. 처음엔 헛소리지만 점점 비슷해집니다.");else for(const e of Ht.history)oc(e.role,e.text);cc()}fd();async function zg(){const e=tu.value.trim();!e||Ht.busy||(tu.value="",oc("user",e),Zg(e),Wi("",`💬 training (${e.length} chars)`),await Ht.send(e))}qy.addEventListener("click",zg);tu.addEventListener("keydown",e=>{e.key==="Enter"&&(e.preventDefault(),zg())});$y.addEventListener("click",()=>{confirm("모델 가중치와 어휘를 모두 초기화합니다. 진행할까요?")&&(Ht.reset(),Sa.innerHTML="",fd(),Xa(),Wi("","🔄 model reset"))});function Vg(e){e.type==="training-end"?(Xa(),cc(),Xy(e.avgLoss),Jh(),Wi("",`🧠 ${e.stepsRun} steps (loss ${e.avgLoss.toFixed(2)})`)):e.type==="generate-end"?(oc("ai",e.text),Zg(e.text),Jh()):e.type==="state"&&cc()}Ht.onEvent(Vg);Xa();Jh();const Zy=document.getElementById("settings-btn"),Mr=document.getElementById("settings-modal"),Gc=document.getElementById("s-apikey"),cs=document.getElementById("settings-status"),Jy=document.getElementById("s-save"),Qy=document.getElementById("s-test"),tE=document.getElementById("s-delete"),eE=document.getElementById("s-close");function Gg(){const e=document.querySelector('input[name="s-provider"]:checked');return e?e.value:"local"}function Hg(){const e=document.querySelector('input[name="s-model"]:checked');return e?e.value:"claude-haiku-4-5-20251001"}function Wg(){const e=document.getElementById("mode-badge");e&&e.remove();const t=document.createElement("span");t.id="mode-badge";const n=Ht instanceof zc,i=Ht instanceof kc;t.className=`mode-badge ${n||i?"cloud":"local"}`,t.textContent=n?"GEMINI":i?"CLAUDE":"LOCAL",document.getElementById("chat-title").appendChild(t)}Wg();const Wp=localStorage.getItem(La),Xp=localStorage.getItem(Pa),Yp=localStorage.getItem(Vc);Wp&&(Gc.value=Wp);if(Xp){const e=document.querySelector(`input[name="s-provider"][value="${Xp}"]`);e&&(e.checked=!0)}if(Yp){const e=document.querySelector(`input[name="s-model"][value="${Yp}"]`);e&&(e.checked=!0)}Zy.addEventListener("click",()=>Mr.classList.add("open"));eE.addEventListener("click",()=>Mr.classList.remove("open"));Mr.addEventListener("click",e=>{e.target===Mr&&Mr.classList.remove("open")});Qy.addEventListener("click",async()=>{const e=Gc.value.trim(),t=Gg();if(t==="local"){cs.textContent="Local mode — no API key needed.";return}if(!e){cs.textContent="Please enter an API key.";return}cs.textContent="Testing...";const i=await(t==="gemini"?new zc({apiKey:e}):new kc({apiKey:e,model:Hg()})).testConnection();cs.textContent=i?"✓ Connection successful!":"✗ Failed — check your key."});function eu(e,t){Ht=e,Ht.onEvent(Vg),Sa.innerHTML="",fd(),Xa(),Wg(),cc(),Mr.classList.remove("open"),Wi("",t)}Jy.addEventListener("click",()=>{const e=Gg(),t=Gc.value.trim(),n=Hg();if(e==="local"){localStorage.setItem(Pa,"local"),localStorage.removeItem(La),eu(new ld,"🔧 local mode"),cs.textContent="✓ Local NLM mode.";return}if(!t){cs.textContent="Please enter an API key.";return}localStorage.setItem(Pa,e),localStorage.setItem(La,t),e==="claude"&&localStorage.setItem(Vc,n);const i=e==="gemini"?new zc({apiKey:t}):new kc({apiKey:t,model:n});eu(i,e==="gemini"?"☁ Gemini mode":"☁ Claude mode"),cs.textContent=`✓ Now using ${e==="gemini"?"Gemini Flash":"Claude"}.`});tE.addEventListener("click",()=>{localStorage.removeItem(La),localStorage.removeItem(Pa),localStorage.removeItem(Vc),Gc.value="",eu(new ld,"🔧 local mode"),cs.textContent="Key deleted — local mode."});function nE(){for(let e=0;e<Vn[0];e++){const t=Zn[0][e].activation;Fg[e].style.height=`${Math.round(t*100)}%`,Og[e].textContent=String(Math.round(t*100)).padStart(2,"0")}for(const e of Bg){let t=0,n=0;for(const s of Zn[e.layerIdx]){const r=Vo.get(s);if(r)for(const a of r)a.intra||(t+=a.weight,n++)}const i=n>0?t/n:0;e.fill.style.width=`${Math.round(i*100)}%`,e.val.textContent=i.toFixed(2)}}const ws=new Float32Array(Fi.length*6),Rs=new Float32Array(Fi.length*6);Fi.forEach((e,t)=>{ws[t*6+0]=e.src.pos.x,ws[t*6+1]=e.src.pos.y,ws[t*6+2]=e.src.pos.z,ws[t*6+3]=e.dst.pos.x,ws[t*6+4]=e.dst.pos.y,ws[t*6+5]=e.dst.pos.z});const Hc=new on;Hc.setAttribute("position",new an(ws,3));Hc.setAttribute("color",new an(Rs,3));Xi.add(new g1(Hc,new Mm({vertexColors:!0,blending:mi,transparent:!0,depthWrite:!1})));const ya=new Float32Array(hs.length*3),Ho=new Float32Array(hs.length*3),Wo=new Float32Array(hs.length*3);hs.forEach((e,t)=>{ya[t*3]=e.pos.x,ya[t*3+1]=e.pos.y,ya[t*3+2]=e.pos.z});function Xg(e,t,n,i){const s=new on;return s.setAttribute("position",new an(n,3)),s.setAttribute("color",new an(e,3)),Xi.add(new fu(s,new dc({vertexColors:!0,size:t,map:i,alphaTest:.01,blending:mi,transparent:!0,depthWrite:!1}))),s}const iE=Xg(Ho,.18,ya,Oy),sE=Xg(Wo,.065,ya,ud),pd=1200,oi=[],Xo=new Float32Array(pd*3),Yo=new Float32Array(pd*3),Vs=new on;Vs.setAttribute("position",new an(Xo,3));Vs.setAttribute("color",new an(Yo,3));Vs.setDrawRange(0,0);Xi.add(new fu(Vs,new dc({vertexColors:!0,size:.05,map:ud,alphaTest:.01,blending:mi,transparent:!0,depthWrite:!1})));function Bl(e,t=0){oi.length>=pd||oi.push({edge:e,t,speed:.008+e.weight*.018+Math.random()*.007})}const md=new pr;Xi.add(md);const Yg=new Tn(new Fa(.08,20,20),new Ar({color:16772812,blending:mi,transparent:!0,opacity:.7,depthWrite:!1}));md.add(Yg);const qg=new Tn(new Fa(.28,20,20),new Ar({color:16746547,blending:mi,transparent:!0,opacity:.1,depthWrite:!1}));md.add(qg);const $g=2200,qo=new Float32Array($g*3);for(let e=0;e<$g;e++){const t=8+Math.random()*22,n=2*Math.PI*Math.random(),i=Math.acos(2*Math.random()-1);qo[e*3]=t*Math.sin(i)*Math.cos(n),qo[e*3+1]=t*Math.sin(i)*Math.sin(n),qo[e*3+2]=t*Math.cos(i)}const jg=new on;jg.setAttribute("position",new dn(qo,3));const Kg=new fu(jg,new dc({color:16764057,size:.022,map:ud,alphaTest:.01,blending:mi,transparent:!0,opacity:.32,depthWrite:!1}));hd.add(Kg);let qp=0;const rE=280,aE=600;function Zg(e=null){const t=e||(Ht.history.length>0?Ht.history[Ht.history.length-1].text:"hi"),n=Ht.model.encode(t),i=new Array(Ht.model.CTX);for(let h=0;h<Ht.model.CTX;h++){const m=n.length-Ht.model.CTX+h;i[h]=m>=0?n[m]:0}Ht.model.forward(i);const s=Ht.model.vocab.size,r=new Float32Array(Ht.model.lastX),a=new Float32Array(Ht.model.lastH1),o=new Float32Array(Ht.model.lastH2),c=new Float32Array(Ht.model.lastH3),l=new Float32Array(Ht.model.lastProbs.subarray(0,s)),u=[r,a,o,c,l],d=[r.length,a.length,o.length,c.length,l.length];for(let h=0;h<Vn.length;h++)setTimeout(()=>{const m=u[h],g=d[h],x=Zn[h];let p=1e-6;for(let S=0;S<g;S++){const T=Math.abs(m[S]);T>p&&(p=T)}const f=1/p;for(let S=0;S<x.length;S++){const T=Math.min(g-1,Math.floor(S/x.length*g)),y=Math.abs(m[T])*f;x[S].targetActivation=.08+.92*y}if(h<Vn.length-1)for(const S of x){if(S.targetActivation<.2)continue;const T=Go.get(S);if(T)for(const y of T){if(y.intra)continue;const w=y.weight*S.targetActivation;Bl(y,0),w>.5&&Bl(y,.04+Math.random()*.06),w>.8&&Bl(y,.09+Math.random()*.06)}}},h*rE)}function Xa(){const e=[Ht.model.W1,Ht.model.W2,Ht.model.W3,Ht.model.W4];for(const t of Fi){const n=Math.min(e.length-1,t.src.layerIdx),i=e[n],s=i.length,r=i[0].length,a=t.src.layerIdx,o=t.intra?a:t.dst.layerIdx,c=Vn[a],l=Vn[o],u=Math.min(s-1,Math.floor(t.src.layerLocalIdx/c*s)),d=Math.min(r-1,Math.floor(t.dst.layerLocalIdx/l*r)),h=Math.abs(i[u][d]||0);t.targetWeight=Math.max(.05,Math.min(1,h*5))}}const Gs=new Ay({handedness:"right",cursorSource:"gaze"});let lc=0,hc=0,Po=0,$p=0,jp=0,Kp=0;Gs.on("move",e=>{kr.style.left=`${e.screenX}px`,kr.style.top=`${e.screenY}px`,Uy.textContent=`${e.screenX} · ${e.screenY}`,lc=e.x-.5,hc=e.y-.5});window.addEventListener("mousemove",e=>{lc=e.clientX/window.innerWidth-.5,hc=e.clientY/window.innerHeight-.5,kr.style.left=`${e.clientX}px`,kr.style.top=`${e.clientY}px`});Gs.on("click",()=>{Kp++,Ny.textContent=String(Kp),kr.classList.add("clicking"),setTimeout(()=>kr.classList.remove("clicking"),80),Wi("ev-click","🤌 pinch")});Gs.on("scroll",e=>{zo=Math.max(4,Math.min(15,zo+e.deltaY*.055));const t=Math.round((1-(zo-4)/11)*100);Fy.textContent=`${t}%`,Wi("ev-scroll",e.deltaY>0?"✊ zoom out":"🖐️ zoom in")});const oE={thumbsup:{label:"👍 thumbs up"},thumbsdown:{label:"👎 thumbs down"},victory:{label:"✌️ victory"},iloveyou:{label:"🤟 iloveyou"}};for(const[e,t]of Object.entries(oE))Gs.on(e,()=>Wi("",t.label));const Lo=new F;let kl=0;function Jg(){requestAnimationFrame(Jg),kl+=.011;const e=performance.now();e-qp>aE&&(qp=e,Xa());for(const r of Fi)r.weight+=(r.targetWeight-r.weight)*.012;for(const r of hs)r.targetActivation*=.993,r.activation+=(r.targetActivation-r.activation)*.07,r.activation<4e-4&&(r.activation=0);let t=0;for(const r of Zn[0])t+=r.activation;t/=Zn[0].length,Yg.material.opacity=.55+.3*t+.06*Math.sin(kl*2.5),qg.material.opacity=.08+.18*t+.03*Math.sin(kl*1.5);for(let r=0;r<Fi.length;r++){const a=Fi[r],o=Math.max(a.src.activation*.8,a.dst.activation*.65),c=a.weight*(.035+.965*o),l=c*1,u=c*.4,d=c*.05;Rs[r*6+0]=l,Rs[r*6+1]=u,Rs[r*6+2]=d,Rs[r*6+3]=l,Rs[r*6+4]=u,Rs[r*6+5]=d}Hc.attributes.color.needsUpdate=!0;for(let r=0;r<hs.length;r++){const a=hs[r].activation;Ho[r*3+0]=.025+a*.55,Ho[r*3+1]=.01+a*.22,Ho[r*3+2]=.003+a*.03,Wo[r*3+0]=.1+a*.9,Wo[r*3+1]=.04+a*.72,Wo[r*3+2]=.01+a*.2}iE.attributes.color.needsUpdate=!0,sE.attributes.color.needsUpdate=!0;for(let r=oi.length-1;r>=0;r--)oi[r].t+=oi[r].speed,oi[r].t>=1&&oi.splice(r,1);for(let r=0;r<oi.length;r++){const a=oi[r];Lo.lerpVectors(a.edge.src.pos,a.edge.dst.pos,a.t),Xo[r*3]=Lo.x,Xo[r*3+1]=Lo.y,Xo[r*3+2]=Lo.z;const o=a.t<.12?a.t/.12:a.t>.8?(1-a.t)/.2:1,c=(.55+a.edge.weight*.45)*o;Yo[r*3]=c,Yo[r*3+1]=c*.88,Yo[r*3+2]=c*.42}Vs.setDrawRange(0,oi.length),Vs.attributes.position.needsUpdate=!0,Vs.attributes.color.needsUpdate=!0,jp+=.0015;const n=.06,i=Math.sign(lc)*Math.max(0,Math.abs(lc)-n),s=Math.sign(hc)*Math.max(0,Math.abs(hc)-n);$p+=i*.016,Po+=s*.011,Po=Math.max(-1,Math.min(1,Po)),Xi.rotation.x=Po,Xi.rotation.y=jp+$p,Ol+=(zo-Ol)*.055,zr.position.z=Ol,Kg.rotation.y+=35e-6,nE(),ia.render(hd,zr)}Jg();fa.addEventListener("click",async()=>{fa.disabled=!0,fa.textContent="LOADING...",Vp.textContent="Loading MediaPipe (5-10s)",Fl.textContent="INIT";try{await Gs.start(),Gs.createPanel(),Fl.textContent="ACTIVE",Gp.classList.add("fade-out"),setTimeout(()=>{Gp.style.display="none"},650),Wi("","start"),document.addEventListener("keydown",e=>{(e.key==="r"||e.key==="R")&&(Gs.recalibrate(),Wi("","recalibrated"))})}catch(e){Fl.textContent="ERROR",Vp.textContent=`Error: ${e.message}`,fa.disabled=!1,fa.textContent="RETRY",console.error(e)}});window.addEventListener("resize",()=>{zr.aspect=window.innerWidth/window.innerHeight,zr.updateProjectionMatrix(),ia.setSize(window.innerWidth,window.innerHeight)});
