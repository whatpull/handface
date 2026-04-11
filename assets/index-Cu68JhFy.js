var J0=Object.defineProperty;var Q0=(t,e,n)=>e in t?J0(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var sn=(t,e,n)=>Q0(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const gu="183",eg=0,zh=1,tg=2,no=1,ng=2,qs=3,Qi=0,dn=1,Ai=2,Ci=0,Jr=1,Vh=2,Gh=3,Hh=4,ig=5,pr=100,rg=101,sg=102,ag=103,og=104,cg=200,lg=201,ug=202,hg=203,rl=204,sl=205,fg=206,dg=207,pg=208,mg=209,gg=210,_g=211,vg=212,xg=213,Mg=214,al=0,ol=1,cl=2,is=3,ll=4,ul=5,hl=6,fl=7,_u=0,Sg=1,Eg=2,ai=0,Jd=1,Qd=2,ep=3,tp=4,np=5,ip=6,rp=7,sp=300,br=301,rs=302,cc=303,lc=304,Co=306,dl=1e3,Ri=1001,pl=1002,jt=1003,yg=1004,ba=1005,en=1006,uc=1007,gr=1008,yn=1009,ap=1010,op=1011,ia=1012,vu=1013,li=1014,ii=1015,Li=1016,xu=1017,Mu=1018,ra=1020,cp=35902,lp=35899,up=1021,hp=1022,qn=1023,Ii=1026,_r=1027,fp=1028,Su=1029,ss=1030,Eu=1031,yu=1033,io=33776,ro=33777,so=33778,ao=33779,ml=35840,gl=35841,_l=35842,vl=35843,xl=36196,Ml=37492,Sl=37496,El=37488,yl=37489,Tl=37490,bl=37491,Al=37808,wl=37809,Rl=37810,Cl=37811,Pl=37812,Ll=37813,Il=37814,Dl=37815,Ul=37816,Nl=37817,Fl=37818,Ol=37819,Bl=37820,kl=37821,zl=36492,Vl=36494,Gl=36495,Hl=36283,Wl=36284,Xl=36285,ql=36286,Tg=3200,dp=0,bg=1,Ki="",Fn="srgb",as="srgb-linear",po="linear",rt="srgb",Ur=7680,Wh=519,Ag=512,wg=513,Rg=514,Tu=515,Cg=516,Pg=517,bu=518,Lg=519,Xh=35044,qh="300 es",ri=2e3,sa=2001;function Ig(t){for(let e=t.length-1;e>=0;--e)if(t[e]>=65535)return!0;return!1}function mo(t){return document.createElementNS("http://www.w3.org/1999/xhtml",t)}function Dg(){const t=mo("canvas");return t.style.display="block",t}const Yh={};function jh(...t){const e="THREE."+t.shift();console.log(e,...t)}function pp(t){const e=t[0];if(typeof e=="string"&&e.startsWith("TSL:")){const n=t[1];n&&n.isStackTrace?t[0]+=" "+n.getLocation():t[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return t}function Ne(...t){t=pp(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.warn(n.getError(e)):console.warn(e,...t)}}function Je(...t){t=pp(t);const e="THREE."+t.shift();{const n=t[0];n&&n.isStackTrace?console.error(n.getError(e)):console.error(e,...t)}}function go(...t){const e=t.join(" ");e in Yh||(Yh[e]=!0,Ne(...t))}function Ug(t,e,n){return new Promise(function(i,r){function s(){switch(t.clientWaitSync(e,t.SYNC_FLUSH_COMMANDS_BIT,0)){case t.WAIT_FAILED:r();break;case t.TIMEOUT_EXPIRED:setTimeout(s,n);break;default:i()}}setTimeout(s,n)})}const Ng={[al]:ol,[cl]:hl,[ll]:fl,[is]:ul,[ol]:al,[hl]:cl,[fl]:ll,[ul]:is};class xs{addEventListener(e,n){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(n)===-1&&i[e].push(n)}hasEventListener(e,n){const i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(n)!==-1}removeEventListener(e,n){const i=this._listeners;if(i===void 0)return;const r=i[e];if(r!==void 0){const s=r.indexOf(n);s!==-1&&r.splice(s,1)}}dispatchEvent(e){const n=this._listeners;if(n===void 0)return;const i=n[e.type];if(i!==void 0){e.target=this;const r=i.slice(0);for(let s=0,a=r.length;s<a;s++)r[s].call(this,e);e.target=null}}}const Zt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],hc=Math.PI/180,Yl=180/Math.PI;function fa(){const t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Zt[t&255]+Zt[t>>8&255]+Zt[t>>16&255]+Zt[t>>24&255]+"-"+Zt[e&255]+Zt[e>>8&255]+"-"+Zt[e>>16&15|64]+Zt[e>>24&255]+"-"+Zt[n&63|128]+Zt[n>>8&255]+"-"+Zt[n>>16&255]+Zt[n>>24&255]+Zt[i&255]+Zt[i>>8&255]+Zt[i>>16&255]+Zt[i>>24&255]).toLowerCase()}function Xe(t,e,n){return Math.max(e,Math.min(n,t))}function Fg(t,e){return(t%e+e)%e}function fc(t,e,n){return(1-n)*t+n*e}function Os(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return t/4294967295;case Uint16Array:return t/65535;case Uint8Array:return t/255;case Int32Array:return Math.max(t/2147483647,-1);case Int16Array:return Math.max(t/32767,-1);case Int8Array:return Math.max(t/127,-1);default:throw new Error("Invalid component type.")}}function un(t,e){switch(e.constructor){case Float32Array:return t;case Uint32Array:return Math.round(t*4294967295);case Uint16Array:return Math.round(t*65535);case Uint8Array:return Math.round(t*255);case Int32Array:return Math.round(t*2147483647);case Int16Array:return Math.round(t*32767);case Int8Array:return Math.round(t*127);default:throw new Error("Invalid component type.")}}class Ye{constructor(e=0,n=0){Ye.prototype.isVector2=!0,this.x=e,this.y=n}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,n){return this.x=e,this.y=n,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const n=this.x,i=this.y,r=e.elements;return this.x=r[0]*n+r[3]*i+r[6],this.y=r[1]*n+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,n){return this.x=Xe(this.x,e.x,n.x),this.y=Xe(this.y,e.y,n.y),this}clampScalar(e,n){return this.x=Xe(this.x,e,n),this.y=Xe(this.y,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y;return n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this}rotateAround(e,n){const i=Math.cos(n),r=Math.sin(n),s=this.x-e.x,a=this.y-e.y;return this.x=s*i-a*r+e.x,this.y=s*r+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ms{constructor(e=0,n=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=n,this._z=i,this._w=r}static slerpFlat(e,n,i,r,s,a,o){let c=i[r+0],l=i[r+1],h=i[r+2],f=i[r+3],u=s[a+0],m=s[a+1],_=s[a+2],S=s[a+3];if(f!==S||c!==u||l!==m||h!==_){let p=c*u+l*m+h*_+f*S;p<0&&(u=-u,m=-m,_=-_,S=-S,p=-p);let d=1-o;if(p<.9995){const x=Math.acos(p),y=Math.sin(x);d=Math.sin(d*x)/y,o=Math.sin(o*x)/y,c=c*d+u*o,l=l*d+m*o,h=h*d+_*o,f=f*d+S*o}else{c=c*d+u*o,l=l*d+m*o,h=h*d+_*o,f=f*d+S*o;const x=1/Math.sqrt(c*c+l*l+h*h+f*f);c*=x,l*=x,h*=x,f*=x}}e[n]=c,e[n+1]=l,e[n+2]=h,e[n+3]=f}static multiplyQuaternionsFlat(e,n,i,r,s,a){const o=i[r],c=i[r+1],l=i[r+2],h=i[r+3],f=s[a],u=s[a+1],m=s[a+2],_=s[a+3];return e[n]=o*_+h*f+c*m-l*u,e[n+1]=c*_+h*u+l*f-o*m,e[n+2]=l*_+h*m+o*u-c*f,e[n+3]=h*_-o*f-c*u-l*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,n,i,r){return this._x=e,this._y=n,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,n=!0){const i=e._x,r=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(i/2),h=o(r/2),f=o(s/2),u=c(i/2),m=c(r/2),_=c(s/2);switch(a){case"XYZ":this._x=u*h*f+l*m*_,this._y=l*m*f-u*h*_,this._z=l*h*_+u*m*f,this._w=l*h*f-u*m*_;break;case"YXZ":this._x=u*h*f+l*m*_,this._y=l*m*f-u*h*_,this._z=l*h*_-u*m*f,this._w=l*h*f+u*m*_;break;case"ZXY":this._x=u*h*f-l*m*_,this._y=l*m*f+u*h*_,this._z=l*h*_+u*m*f,this._w=l*h*f-u*m*_;break;case"ZYX":this._x=u*h*f-l*m*_,this._y=l*m*f+u*h*_,this._z=l*h*_-u*m*f,this._w=l*h*f+u*m*_;break;case"YZX":this._x=u*h*f+l*m*_,this._y=l*m*f+u*h*_,this._z=l*h*_-u*m*f,this._w=l*h*f-u*m*_;break;case"XZY":this._x=u*h*f-l*m*_,this._y=l*m*f-u*h*_,this._z=l*h*_+u*m*f,this._w=l*h*f+u*m*_;break;default:Ne("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return n===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,n){const i=n/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){const n=e.elements,i=n[0],r=n[4],s=n[8],a=n[1],o=n[5],c=n[9],l=n[2],h=n[6],f=n[10],u=i+o+f;if(u>0){const m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(h-c)*m,this._y=(s-l)*m,this._z=(a-r)*m}else if(i>o&&i>f){const m=2*Math.sqrt(1+i-o-f);this._w=(h-c)/m,this._x=.25*m,this._y=(r+a)/m,this._z=(s+l)/m}else if(o>f){const m=2*Math.sqrt(1+o-i-f);this._w=(s-l)/m,this._x=(r+a)/m,this._y=.25*m,this._z=(c+h)/m}else{const m=2*Math.sqrt(1+f-i-o);this._w=(a-r)/m,this._x=(s+l)/m,this._y=(c+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,n){let i=e.dot(n)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*n.z-e.z*n.y,this._y=e.z*n.x-e.x*n.z,this._z=e.x*n.y-e.y*n.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Xe(this.dot(e),-1,1)))}rotateTowards(e,n){const i=this.angleTo(e);if(i===0)return this;const r=Math.min(1,n/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,n){const i=e._x,r=e._y,s=e._z,a=e._w,o=n._x,c=n._y,l=n._z,h=n._w;return this._x=i*h+a*o+r*l-s*c,this._y=r*h+a*c+s*o-i*l,this._z=s*h+a*l+i*c-r*o,this._w=a*h-i*o-r*c-s*l,this._onChangeCallback(),this}slerp(e,n){let i=e._x,r=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,r=-r,s=-s,a=-a,o=-o);let c=1-n;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,n=Math.sin(n*l)/h,this._x=this._x*c+i*n,this._y=this._y*c+r*n,this._z=this._z*c+s*n,this._w=this._w*c+a*n,this._onChangeCallback()}else this._x=this._x*c+i*n,this._y=this._y*c+r*n,this._z=this._z*c+s*n,this._w=this._w*c+a*n,this.normalize();return this}slerpQuaternions(e,n,i){return this.copy(e).slerp(n,i)}random(){const e=2*Math.PI*Math.random(),n=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(n),s*Math.cos(n))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,n=0){return this._x=e[n],this._y=e[n+1],this._z=e[n+2],this._w=e[n+3],this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._w,e}fromBufferAttribute(e,n){return this._x=e.getX(n),this._y=e.getY(n),this._z=e.getZ(n),this._w=e.getW(n),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class U{constructor(e=0,n=0,i=0){U.prototype.isVector3=!0,this.x=e,this.y=n,this.z=i}set(e,n,i){return i===void 0&&(i=this.z),this.x=e,this.y=n,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,n){return this.x=e.x*n.x,this.y=e.y*n.y,this.z=e.z*n.z,this}applyEuler(e){return this.applyQuaternion(Kh.setFromEuler(e))}applyAxisAngle(e,n){return this.applyQuaternion(Kh.setFromAxisAngle(e,n))}applyMatrix3(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[3]*i+s[6]*r,this.y=s[1]*n+s[4]*i+s[7]*r,this.z=s[2]*n+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=e.elements,a=1/(s[3]*n+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*n+s[4]*i+s[8]*r+s[12])*a,this.y=(s[1]*n+s[5]*i+s[9]*r+s[13])*a,this.z=(s[2]*n+s[6]*i+s[10]*r+s[14])*a,this}applyQuaternion(e){const n=this.x,i=this.y,r=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*r-o*i),h=2*(o*n-s*r),f=2*(s*i-a*n);return this.x=n+c*l+a*f-o*h,this.y=i+c*h+o*l-s*f,this.z=r+c*f+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const n=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*n+s[4]*i+s[8]*r,this.y=s[1]*n+s[5]*i+s[9]*r,this.z=s[2]*n+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,n){return this.x=Xe(this.x,e.x,n.x),this.y=Xe(this.y,e.y,n.y),this.z=Xe(this.z,e.z,n.z),this}clampScalar(e,n){return this.x=Xe(this.x,e,n),this.y=Xe(this.y,e,n),this.z=Xe(this.z,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,n){const i=e.x,r=e.y,s=e.z,a=n.x,o=n.y,c=n.z;return this.x=r*c-s*o,this.y=s*a-i*c,this.z=i*o-r*a,this}projectOnVector(e){const n=e.lengthSq();if(n===0)return this.set(0,0,0);const i=e.dot(this)/n;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return dc.copy(this).projectOnVector(e),this.sub(dc)}reflect(e){return this.sub(dc.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const n=Math.sqrt(this.lengthSq()*e.lengthSq());if(n===0)return Math.PI/2;const i=this.dot(e)/n;return Math.acos(Xe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const n=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return n*n+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,n,i){const r=Math.sin(n)*e;return this.x=r*Math.sin(i),this.y=Math.cos(n)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,n,i){return this.x=e*Math.sin(n),this.y=i,this.z=e*Math.cos(n),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this}setFromMatrixScale(e){const n=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=n,this.y=i,this.z=r,this}setFromMatrixColumn(e,n){return this.fromArray(e.elements,n*4)}setFromMatrix3Column(e,n){return this.fromArray(e.elements,n*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,n=Math.random()*2-1,i=Math.sqrt(1-n*n);return this.x=i*Math.cos(e),this.y=n,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const dc=new U,Kh=new Ms;class Be{constructor(e,n,i,r,s,a,o,c,l){Be.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,c,l)}set(e,n,i,r,s,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=r,h[2]=o,h[3]=n,h[4]=s,h[5]=c,h[6]=i,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],this}extractBasis(e,n,i){return e.setFromMatrix3Column(this,0),n.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const n=e.elements;return this.set(n[0],n[4],n[8],n[1],n[5],n[9],n[2],n[6],n[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[3],c=i[6],l=i[1],h=i[4],f=i[7],u=i[2],m=i[5],_=i[8],S=r[0],p=r[3],d=r[6],x=r[1],y=r[4],E=r[7],w=r[2],A=r[5],P=r[8];return s[0]=a*S+o*x+c*w,s[3]=a*p+o*y+c*A,s[6]=a*d+o*E+c*P,s[1]=l*S+h*x+f*w,s[4]=l*p+h*y+f*A,s[7]=l*d+h*E+f*P,s[2]=u*S+m*x+_*w,s[5]=u*p+m*y+_*A,s[8]=u*d+m*E+_*P,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[3]*=e,n[6]*=e,n[1]*=e,n[4]*=e,n[7]*=e,n[2]*=e,n[5]*=e,n[8]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return n*a*h-n*o*l-i*s*h+i*o*c+r*s*l-r*a*c}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=h*a-o*l,u=o*c-h*s,m=l*s-a*c,_=n*f+i*u+r*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const S=1/_;return e[0]=f*S,e[1]=(r*l-h*i)*S,e[2]=(o*i-r*a)*S,e[3]=u*S,e[4]=(h*n-r*c)*S,e[5]=(r*s-o*n)*S,e[6]=m*S,e[7]=(i*c-l*n)*S,e[8]=(a*n-i*s)*S,this}transpose(){let e;const n=this.elements;return e=n[1],n[1]=n[3],n[3]=e,e=n[2],n[2]=n[6],n[6]=e,e=n[5],n[5]=n[7],n[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const n=this.elements;return e[0]=n[0],e[1]=n[3],e[2]=n[6],e[3]=n[1],e[4]=n[4],e[5]=n[7],e[6]=n[2],e[7]=n[5],e[8]=n[8],this}setUvTransform(e,n,i,r,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(i*c,i*l,-i*(c*a+l*o)+a+e,-r*l,r*c,-r*(-l*a+c*o)+o+n,0,0,1),this}scale(e,n){return this.premultiply(pc.makeScale(e,n)),this}rotate(e){return this.premultiply(pc.makeRotation(-e)),this}translate(e,n){return this.premultiply(pc.makeTranslation(e,n)),this}makeTranslation(e,n){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,n,0,0,1),this}makeRotation(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,i,n,0,0,0,1),this}makeScale(e,n){return this.set(e,0,0,0,n,0,0,0,1),this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<9;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<9;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const pc=new Be,$h=new Be().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Zh=new Be().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Og(){const t={enabled:!0,workingColorSpace:as,spaces:{},convert:function(r,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===rt&&(r.r=Pi(r.r),r.g=Pi(r.g),r.b=Pi(r.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===rt&&(r.r=Qr(r.r),r.g=Qr(r.g),r.b=Qr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===Ki?po:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,a){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return go("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),t.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return go("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),t.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],i=[.3127,.329];return t.define({[as]:{primaries:e,whitePoint:i,transfer:po,toXYZ:$h,fromXYZ:Zh,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Fn},outputColorSpaceConfig:{drawingBufferColorSpace:Fn}},[Fn]:{primaries:e,whitePoint:i,transfer:rt,toXYZ:$h,fromXYZ:Zh,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Fn}}}),t}const Ke=Og();function Pi(t){return t<.04045?t*.0773993808:Math.pow(t*.9478672986+.0521327014,2.4)}function Qr(t){return t<.0031308?t*12.92:1.055*Math.pow(t,.41666)-.055}let Nr;class Bg{static getDataURL(e,n="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Nr===void 0&&(Nr=mo("canvas")),Nr.width=e.width,Nr.height=e.height;const r=Nr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Nr}return i.toDataURL(n)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const n=mo("canvas");n.width=e.width,n.height=e.height;const i=n.getContext("2d");i.drawImage(e,0,0,e.width,e.height);const r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let a=0;a<s.length;a++)s[a]=Pi(s[a]/255)*255;return i.putImageData(r,0,0),n}else if(e.data){const n=e.data.slice(0);for(let i=0;i<n.length;i++)n instanceof Uint8Array||n instanceof Uint8ClampedArray?n[i]=Math.floor(Pi(n[i]/255)*255):n[i]=Pi(n[i]);return{data:n,width:e.width,height:e.height}}else return Ne("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let kg=0;class Au{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:kg++}),this.uuid=fa(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const n=this.data;return typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement?e.set(n.videoWidth,n.videoHeight,0):typeof VideoFrame<"u"&&n instanceof VideoFrame?e.set(n.displayHeight,n.displayWidth,0):n!==null?e.set(n.width,n.height,n.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let a=0,o=r.length;a<o;a++)r[a].isDataTexture?s.push(mc(r[a].image)):s.push(mc(r[a]))}else s=mc(r);i.url=s}return n||(e.images[this.uuid]=i),i}}function mc(t){return typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap?Bg.getDataURL(t):t.data?{data:Array.from(t.data),width:t.width,height:t.height,type:t.data.constructor.name}:(Ne("Texture: Unable to serialize Texture."),{})}let zg=0;const gc=new U;class on extends xs{constructor(e=on.DEFAULT_IMAGE,n=on.DEFAULT_MAPPING,i=Ri,r=Ri,s=en,a=gr,o=qn,c=yn,l=on.DEFAULT_ANISOTROPY,h=Ki){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:zg++}),this.uuid=fa(),this.name="",this.source=new Au(e),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ye(0,0),this.repeat=new Ye(1,1),this.center=new Ye(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Be,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(gc).x}get height(){return this.source.getSize(gc).y}get depth(){return this.source.getSize(gc).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const n in e){const i=e[n];if(i===void 0){Ne(`Texture.setValues(): parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Ne(`Texture.setValues(): property '${n}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";if(!n&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),n||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==sp)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case dl:e.x=e.x-Math.floor(e.x);break;case Ri:e.x=e.x<0?0:1;break;case pl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case dl:e.y=e.y-Math.floor(e.y);break;case Ri:e.y=e.y<0?0:1;break;case pl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}on.DEFAULT_IMAGE=null;on.DEFAULT_MAPPING=sp;on.DEFAULT_ANISOTROPY=1;class bt{constructor(e=0,n=0,i=0,r=1){bt.prototype.isVector4=!0,this.x=e,this.y=n,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,n,i,r){return this.x=e,this.y=n,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,n){switch(e){case 0:this.x=n;break;case 1:this.y=n;break;case 2:this.z=n;break;case 3:this.w=n;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,n){return this.x=e.x+n.x,this.y=e.y+n.y,this.z=e.z+n.z,this.w=e.w+n.w,this}addScaledVector(e,n){return this.x+=e.x*n,this.y+=e.y*n,this.z+=e.z*n,this.w+=e.w*n,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,n){return this.x=e.x-n.x,this.y=e.y-n.y,this.z=e.z-n.z,this.w=e.w-n.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const n=this.x,i=this.y,r=this.z,s=this.w,a=e.elements;return this.x=a[0]*n+a[4]*i+a[8]*r+a[12]*s,this.y=a[1]*n+a[5]*i+a[9]*r+a[13]*s,this.z=a[2]*n+a[6]*i+a[10]*r+a[14]*s,this.w=a[3]*n+a[7]*i+a[11]*r+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const n=Math.sqrt(1-e.w*e.w);return n<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/n,this.y=e.y/n,this.z=e.z/n),this}setAxisAngleFromRotationMatrix(e){let n,i,r,s;const c=e.elements,l=c[0],h=c[4],f=c[8],u=c[1],m=c[5],_=c[9],S=c[2],p=c[6],d=c[10];if(Math.abs(h-u)<.01&&Math.abs(f-S)<.01&&Math.abs(_-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+S)<.1&&Math.abs(_+p)<.1&&Math.abs(l+m+d-3)<.1)return this.set(1,0,0,0),this;n=Math.PI;const y=(l+1)/2,E=(m+1)/2,w=(d+1)/2,A=(h+u)/4,P=(f+S)/4,v=(_+p)/4;return y>E&&y>w?y<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(y),r=A/i,s=P/i):E>w?E<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(E),i=A/r,s=v/r):w<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(w),i=P/s,r=v/s),this.set(i,r,s,n),this}let x=Math.sqrt((p-_)*(p-_)+(f-S)*(f-S)+(u-h)*(u-h));return Math.abs(x)<.001&&(x=1),this.x=(p-_)/x,this.y=(f-S)/x,this.z=(u-h)/x,this.w=Math.acos((l+m+d-1)/2),this}setFromMatrixPosition(e){const n=e.elements;return this.x=n[12],this.y=n[13],this.z=n[14],this.w=n[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,n){return this.x=Xe(this.x,e.x,n.x),this.y=Xe(this.y,e.y,n.y),this.z=Xe(this.z,e.z,n.z),this.w=Xe(this.w,e.w,n.w),this}clampScalar(e,n){return this.x=Xe(this.x,e,n),this.y=Xe(this.y,e,n),this.z=Xe(this.z,e,n),this.w=Xe(this.w,e,n),this}clampLength(e,n){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Xe(i,e,n))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,n){return this.x+=(e.x-this.x)*n,this.y+=(e.y-this.y)*n,this.z+=(e.z-this.z)*n,this.w+=(e.w-this.w)*n,this}lerpVectors(e,n,i){return this.x=e.x+(n.x-e.x)*i,this.y=e.y+(n.y-e.y)*i,this.z=e.z+(n.z-e.z)*i,this.w=e.w+(n.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,n=0){return this.x=e[n],this.y=e[n+1],this.z=e[n+2],this.w=e[n+3],this}toArray(e=[],n=0){return e[n]=this.x,e[n+1]=this.y,e[n+2]=this.z,e[n+3]=this.w,e}fromBufferAttribute(e,n){return this.x=e.getX(n),this.y=e.getY(n),this.z=e.getZ(n),this.w=e.getW(n),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Vg extends xs{constructor(e=1,n=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=n,this.depth=i.depth,this.scissor=new bt(0,0,e,n),this.scissorTest=!1,this.viewport=new bt(0,0,e,n),this.textures=[];const r={width:e,height:n,depth:i.depth},s=new on(r),a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){const n={minFilter:en,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(n.mapping=e.mapping),e.wrapS!==void 0&&(n.wrapS=e.wrapS),e.wrapT!==void 0&&(n.wrapT=e.wrapT),e.wrapR!==void 0&&(n.wrapR=e.wrapR),e.magFilter!==void 0&&(n.magFilter=e.magFilter),e.minFilter!==void 0&&(n.minFilter=e.minFilter),e.format!==void 0&&(n.format=e.format),e.type!==void 0&&(n.type=e.type),e.anisotropy!==void 0&&(n.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(n.colorSpace=e.colorSpace),e.flipY!==void 0&&(n.flipY=e.flipY),e.generateMipmaps!==void 0&&(n.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(n.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(n)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,n,i=1){if(this.width!==e||this.height!==n||this.depth!==i){this.width=e,this.height=n,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=n,this.textures[r].image.depth=i,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,n),this.scissor.set(0,0,e,n)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++){this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;const r=Object.assign({},e.textures[n].image);this.textures[n].source=new Au(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class oi extends Vg{constructor(e=1,n=1,i={}){super(e,n,i),this.isWebGLRenderTarget=!0}}class mp extends on{constructor(e=null,n=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=jt,this.minFilter=jt,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Gg extends on{constructor(e=null,n=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:n,height:i,depth:r},this.magFilter=jt,this.minFilter=jt,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class St{constructor(e,n,i,r,s,a,o,c,l,h,f,u,m,_,S,p){St.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,n,i,r,s,a,o,c,l,h,f,u,m,_,S,p)}set(e,n,i,r,s,a,o,c,l,h,f,u,m,_,S,p){const d=this.elements;return d[0]=e,d[4]=n,d[8]=i,d[12]=r,d[1]=s,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=h,d[10]=f,d[14]=u,d[3]=m,d[7]=_,d[11]=S,d[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new St().fromArray(this.elements)}copy(e){const n=this.elements,i=e.elements;return n[0]=i[0],n[1]=i[1],n[2]=i[2],n[3]=i[3],n[4]=i[4],n[5]=i[5],n[6]=i[6],n[7]=i[7],n[8]=i[8],n[9]=i[9],n[10]=i[10],n[11]=i[11],n[12]=i[12],n[13]=i[13],n[14]=i[14],n[15]=i[15],this}copyPosition(e){const n=this.elements,i=e.elements;return n[12]=i[12],n[13]=i[13],n[14]=i[14],this}setFromMatrix3(e){const n=e.elements;return this.set(n[0],n[3],n[6],0,n[1],n[4],n[7],0,n[2],n[5],n[8],0,0,0,0,1),this}extractBasis(e,n,i){return this.determinant()===0?(e.set(1,0,0),n.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),n.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,n,i){return this.set(e.x,n.x,i.x,0,e.y,n.y,i.y,0,e.z,n.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinant()===0)return this.identity();const n=this.elements,i=e.elements,r=1/Fr.setFromMatrixColumn(e,0).length(),s=1/Fr.setFromMatrixColumn(e,1).length(),a=1/Fr.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[3]=0,n[4]=i[4]*s,n[5]=i[5]*s,n[6]=i[6]*s,n[7]=0,n[8]=i[8]*a,n[9]=i[9]*a,n[10]=i[10]*a,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromEuler(e){const n=this.elements,i=e.x,r=e.y,s=e.z,a=Math.cos(i),o=Math.sin(i),c=Math.cos(r),l=Math.sin(r),h=Math.cos(s),f=Math.sin(s);if(e.order==="XYZ"){const u=a*h,m=a*f,_=o*h,S=o*f;n[0]=c*h,n[4]=-c*f,n[8]=l,n[1]=m+_*l,n[5]=u-S*l,n[9]=-o*c,n[2]=S-u*l,n[6]=_+m*l,n[10]=a*c}else if(e.order==="YXZ"){const u=c*h,m=c*f,_=l*h,S=l*f;n[0]=u+S*o,n[4]=_*o-m,n[8]=a*l,n[1]=a*f,n[5]=a*h,n[9]=-o,n[2]=m*o-_,n[6]=S+u*o,n[10]=a*c}else if(e.order==="ZXY"){const u=c*h,m=c*f,_=l*h,S=l*f;n[0]=u-S*o,n[4]=-a*f,n[8]=_+m*o,n[1]=m+_*o,n[5]=a*h,n[9]=S-u*o,n[2]=-a*l,n[6]=o,n[10]=a*c}else if(e.order==="ZYX"){const u=a*h,m=a*f,_=o*h,S=o*f;n[0]=c*h,n[4]=_*l-m,n[8]=u*l+S,n[1]=c*f,n[5]=S*l+u,n[9]=m*l-_,n[2]=-l,n[6]=o*c,n[10]=a*c}else if(e.order==="YZX"){const u=a*c,m=a*l,_=o*c,S=o*l;n[0]=c*h,n[4]=S-u*f,n[8]=_*f+m,n[1]=f,n[5]=a*h,n[9]=-o*h,n[2]=-l*h,n[6]=m*f+_,n[10]=u-S*f}else if(e.order==="XZY"){const u=a*c,m=a*l,_=o*c,S=o*l;n[0]=c*h,n[4]=-f,n[8]=l*h,n[1]=u*f+S,n[5]=a*h,n[9]=m*f-_,n[2]=_*f-m,n[6]=o*h,n[10]=S*f+u}return n[3]=0,n[7]=0,n[11]=0,n[12]=0,n[13]=0,n[14]=0,n[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Hg,e,Wg)}lookAt(e,n,i){const r=this.elements;return _n.subVectors(e,n),_n.lengthSq()===0&&(_n.z=1),_n.normalize(),zi.crossVectors(i,_n),zi.lengthSq()===0&&(Math.abs(i.z)===1?_n.x+=1e-4:_n.z+=1e-4,_n.normalize(),zi.crossVectors(i,_n)),zi.normalize(),Aa.crossVectors(_n,zi),r[0]=zi.x,r[4]=Aa.x,r[8]=_n.x,r[1]=zi.y,r[5]=Aa.y,r[9]=_n.y,r[2]=zi.z,r[6]=Aa.z,r[10]=_n.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,n){const i=e.elements,r=n.elements,s=this.elements,a=i[0],o=i[4],c=i[8],l=i[12],h=i[1],f=i[5],u=i[9],m=i[13],_=i[2],S=i[6],p=i[10],d=i[14],x=i[3],y=i[7],E=i[11],w=i[15],A=r[0],P=r[4],v=r[8],T=r[12],H=r[1],R=r[5],B=r[9],z=r[13],q=r[2],k=r[6],G=r[10],N=r[14],Q=r[3],$=r[7],le=r[11],me=r[15];return s[0]=a*A+o*H+c*q+l*Q,s[4]=a*P+o*R+c*k+l*$,s[8]=a*v+o*B+c*G+l*le,s[12]=a*T+o*z+c*N+l*me,s[1]=h*A+f*H+u*q+m*Q,s[5]=h*P+f*R+u*k+m*$,s[9]=h*v+f*B+u*G+m*le,s[13]=h*T+f*z+u*N+m*me,s[2]=_*A+S*H+p*q+d*Q,s[6]=_*P+S*R+p*k+d*$,s[10]=_*v+S*B+p*G+d*le,s[14]=_*T+S*z+p*N+d*me,s[3]=x*A+y*H+E*q+w*Q,s[7]=x*P+y*R+E*k+w*$,s[11]=x*v+y*B+E*G+w*le,s[15]=x*T+y*z+E*N+w*me,this}multiplyScalar(e){const n=this.elements;return n[0]*=e,n[4]*=e,n[8]*=e,n[12]*=e,n[1]*=e,n[5]*=e,n[9]*=e,n[13]*=e,n[2]*=e,n[6]*=e,n[10]*=e,n[14]*=e,n[3]*=e,n[7]*=e,n[11]*=e,n[15]*=e,this}determinant(){const e=this.elements,n=e[0],i=e[4],r=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],f=e[6],u=e[10],m=e[14],_=e[3],S=e[7],p=e[11],d=e[15],x=c*m-l*u,y=o*m-l*f,E=o*u-c*f,w=a*m-l*h,A=a*u-c*h,P=a*f-o*h;return n*(S*x-p*y+d*E)-i*(_*x-p*w+d*A)+r*(_*y-S*w+d*P)-s*(_*E-S*A+p*P)}transpose(){const e=this.elements;let n;return n=e[1],e[1]=e[4],e[4]=n,n=e[2],e[2]=e[8],e[8]=n,n=e[6],e[6]=e[9],e[9]=n,n=e[3],e[3]=e[12],e[12]=n,n=e[7],e[7]=e[13],e[13]=n,n=e[11],e[11]=e[14],e[14]=n,this}setPosition(e,n,i){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=n,r[14]=i),this}invert(){const e=this.elements,n=e[0],i=e[1],r=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],f=e[9],u=e[10],m=e[11],_=e[12],S=e[13],p=e[14],d=e[15],x=n*o-i*a,y=n*c-r*a,E=n*l-s*a,w=i*c-r*o,A=i*l-s*o,P=r*l-s*c,v=h*S-f*_,T=h*p-u*_,H=h*d-m*_,R=f*p-u*S,B=f*d-m*S,z=u*d-m*p,q=x*z-y*B+E*R+w*H-A*T+P*v;if(q===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const k=1/q;return e[0]=(o*z-c*B+l*R)*k,e[1]=(r*B-i*z-s*R)*k,e[2]=(S*P-p*A+d*w)*k,e[3]=(u*A-f*P-m*w)*k,e[4]=(c*H-a*z-l*T)*k,e[5]=(n*z-r*H+s*T)*k,e[6]=(p*E-_*P-d*y)*k,e[7]=(h*P-u*E+m*y)*k,e[8]=(a*B-o*H+l*v)*k,e[9]=(i*H-n*B-s*v)*k,e[10]=(_*A-S*E+d*x)*k,e[11]=(f*E-h*A-m*x)*k,e[12]=(o*T-a*R-c*v)*k,e[13]=(n*R-i*T+r*v)*k,e[14]=(S*y-_*w-p*x)*k,e[15]=(h*w-f*y+u*x)*k,this}scale(e){const n=this.elements,i=e.x,r=e.y,s=e.z;return n[0]*=i,n[4]*=r,n[8]*=s,n[1]*=i,n[5]*=r,n[9]*=s,n[2]*=i,n[6]*=r,n[10]*=s,n[3]*=i,n[7]*=r,n[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,n=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(n,i,r))}makeTranslation(e,n,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,n,0,0,1,i,0,0,0,1),this}makeRotationX(e){const n=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,n,-i,0,0,i,n,0,0,0,0,1),this}makeRotationY(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,0,i,0,0,1,0,0,-i,0,n,0,0,0,0,1),this}makeRotationZ(e){const n=Math.cos(e),i=Math.sin(e);return this.set(n,-i,0,0,i,n,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,n){const i=Math.cos(n),r=Math.sin(n),s=1-i,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+i,l*o-r*c,l*c+r*o,0,l*o+r*c,h*o+i,h*c-r*a,0,l*c-r*o,h*c+r*a,s*c*c+i,0,0,0,0,1),this}makeScale(e,n,i){return this.set(e,0,0,0,0,n,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,n,i,r,s,a){return this.set(1,i,s,0,e,1,a,0,n,r,1,0,0,0,0,1),this}compose(e,n,i){const r=this.elements,s=n._x,a=n._y,o=n._z,c=n._w,l=s+s,h=a+a,f=o+o,u=s*l,m=s*h,_=s*f,S=a*h,p=a*f,d=o*f,x=c*l,y=c*h,E=c*f,w=i.x,A=i.y,P=i.z;return r[0]=(1-(S+d))*w,r[1]=(m+E)*w,r[2]=(_-y)*w,r[3]=0,r[4]=(m-E)*A,r[5]=(1-(u+d))*A,r[6]=(p+x)*A,r[7]=0,r[8]=(_+y)*P,r[9]=(p-x)*P,r[10]=(1-(u+S))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,n,i){const r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];const s=this.determinant();if(s===0)return i.set(1,1,1),n.identity(),this;let a=Fr.set(r[0],r[1],r[2]).length();const o=Fr.set(r[4],r[5],r[6]).length(),c=Fr.set(r[8],r[9],r[10]).length();s<0&&(a=-a),Gn.copy(this);const l=1/a,h=1/o,f=1/c;return Gn.elements[0]*=l,Gn.elements[1]*=l,Gn.elements[2]*=l,Gn.elements[4]*=h,Gn.elements[5]*=h,Gn.elements[6]*=h,Gn.elements[8]*=f,Gn.elements[9]*=f,Gn.elements[10]*=f,n.setFromRotationMatrix(Gn),i.x=a,i.y=o,i.z=c,this}makePerspective(e,n,i,r,s,a,o=ri,c=!1){const l=this.elements,h=2*s/(n-e),f=2*s/(i-r),u=(n+e)/(n-e),m=(i+r)/(i-r);let _,S;if(c)_=s/(a-s),S=a*s/(a-s);else if(o===ri)_=-(a+s)/(a-s),S=-2*a*s/(a-s);else if(o===sa)_=-a/(a-s),S=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=f,l[9]=m,l[13]=0,l[2]=0,l[6]=0,l[10]=_,l[14]=S,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,n,i,r,s,a,o=ri,c=!1){const l=this.elements,h=2/(n-e),f=2/(i-r),u=-(n+e)/(n-e),m=-(i+r)/(i-r);let _,S;if(c)_=1/(a-s),S=a/(a-s);else if(o===ri)_=-2/(a-s),S=-(a+s)/(a-s);else if(o===sa)_=-1/(a-s),S=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=f,l[9]=0,l[13]=m,l[2]=0,l[6]=0,l[10]=_,l[14]=S,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const n=this.elements,i=e.elements;for(let r=0;r<16;r++)if(n[r]!==i[r])return!1;return!0}fromArray(e,n=0){for(let i=0;i<16;i++)this.elements[i]=e[i+n];return this}toArray(e=[],n=0){const i=this.elements;return e[n]=i[0],e[n+1]=i[1],e[n+2]=i[2],e[n+3]=i[3],e[n+4]=i[4],e[n+5]=i[5],e[n+6]=i[6],e[n+7]=i[7],e[n+8]=i[8],e[n+9]=i[9],e[n+10]=i[10],e[n+11]=i[11],e[n+12]=i[12],e[n+13]=i[13],e[n+14]=i[14],e[n+15]=i[15],e}}const Fr=new U,Gn=new St,Hg=new U(0,0,0),Wg=new U(1,1,1),zi=new U,Aa=new U,_n=new U,Jh=new St,Qh=new Ms;class ui{constructor(e=0,n=0,i=0,r=ui.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=n,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,n,i,r=this._order){return this._x=e,this._y=n,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,n=this._order,i=!0){const r=e.elements,s=r[0],a=r[4],o=r[8],c=r[1],l=r[5],h=r[9],f=r[2],u=r[6],m=r[10];switch(n){case"XYZ":this._y=Math.asin(Xe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Xe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-f,s),this._z=0);break;case"ZXY":this._x=Math.asin(Xe(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Xe(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Xe(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-f,s)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Xe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,m),this._y=0);break;default:Ne("Euler: .setFromRotationMatrix() encountered an unknown order: "+n)}return this._order=n,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,n,i){return Jh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Jh,n,i)}setFromVector3(e,n=this._order){return this.set(e.x,e.y,e.z,n)}reorder(e){return Qh.setFromEuler(this),this.setFromQuaternion(Qh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],n=0){return e[n]=this._x,e[n+1]=this._y,e[n+2]=this._z,e[n+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ui.DEFAULT_ORDER="XYZ";class gp{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Xg=0;const ef=new U,Or=new Ms,Mi=new St,wa=new U,Bs=new U,qg=new U,Yg=new Ms,tf=new U(1,0,0),nf=new U(0,1,0),rf=new U(0,0,1),sf={type:"added"},jg={type:"removed"},Br={type:"childadded",child:null},_c={type:"childremoved",child:null};class cn extends xs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Xg++}),this.uuid=fa(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=cn.DEFAULT_UP.clone();const e=new U,n=new ui,i=new Ms,r=new U(1,1,1);function s(){i.setFromEuler(n,!1)}function a(){n.setFromQuaternion(i,void 0,!1)}n._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new St},normalMatrix:{value:new Be}}),this.matrix=new St,this.matrixWorld=new St,this.matrixAutoUpdate=cn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new gp,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,n){this.quaternion.setFromAxisAngle(e,n)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,n){return Or.setFromAxisAngle(e,n),this.quaternion.multiply(Or),this}rotateOnWorldAxis(e,n){return Or.setFromAxisAngle(e,n),this.quaternion.premultiply(Or),this}rotateX(e){return this.rotateOnAxis(tf,e)}rotateY(e){return this.rotateOnAxis(nf,e)}rotateZ(e){return this.rotateOnAxis(rf,e)}translateOnAxis(e,n){return ef.copy(e).applyQuaternion(this.quaternion),this.position.add(ef.multiplyScalar(n)),this}translateX(e){return this.translateOnAxis(tf,e)}translateY(e){return this.translateOnAxis(nf,e)}translateZ(e){return this.translateOnAxis(rf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Mi.copy(this.matrixWorld).invert())}lookAt(e,n,i){e.isVector3?wa.copy(e):wa.set(e,n,i);const r=this.parent;this.updateWorldMatrix(!0,!1),Bs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Mi.lookAt(Bs,wa,this.up):Mi.lookAt(wa,Bs,this.up),this.quaternion.setFromRotationMatrix(Mi),r&&(Mi.extractRotation(r.matrixWorld),Or.setFromRotationMatrix(Mi),this.quaternion.premultiply(Or.invert()))}add(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.add(arguments[n]);return this}return e===this?(Je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(sf),Br.child=e,this.dispatchEvent(Br),Br.child=null):Je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const n=this.children.indexOf(e);return n!==-1&&(e.parent=null,this.children.splice(n,1),e.dispatchEvent(jg),_c.child=e,this.dispatchEvent(_c),_c.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Mi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Mi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Mi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(sf),Br.child=e,this.dispatchEvent(Br),Br.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,n){if(this[e]===n)return this;for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectByProperty(e,n);if(a!==void 0)return a}}getObjectsByProperty(e,n,i=[]){this[e]===n&&i.push(this);const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].getObjectsByProperty(e,n,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bs,e,qg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Bs,Yg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const n=this.matrixWorld.elements;return e.set(n[8],n[9],n[10]).normalize()}raycast(){}traverse(e){e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].traverseVisible(e)}traverseAncestors(e){const n=this.parent;n!==null&&(e(n),n.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const n=e.x,i=e.y,r=e.z,s=this.matrix.elements;s[12]+=n-s[0]*n-s[4]*i-s[8]*r,s[13]+=i-s[1]*n-s[5]*i-s[9]*r,s[14]+=r-s[2]*n-s[6]*i-s[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const n=this.children;for(let i=0,r=n.length;i<r;i++)n[i].updateMatrixWorld(e)}updateWorldMatrix(e,n){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),n===!0){const r=this.children;for(let s=0,a=r.length;s<a;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){const n=e===void 0||typeof e=="string",i={};n&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(o=>({...o})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const f=c[l];s(e.shapes,f)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));r.material=o}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let o=0;o<this.children.length;o++)r.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];r.animations.push(s(e.animations,c))}}if(n){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),f=a(e.shapes),u=a(e.skeletons),m=a(e.animations),_=a(e.nodes);o.length>0&&(i.geometries=o),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),f.length>0&&(i.shapes=f),u.length>0&&(i.skeletons=u),m.length>0&&(i.animations=m),_.length>0&&(i.nodes=_)}return i.object=r,i;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,n=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),e.pivot!==null&&(this.pivot=e.pivot.clone()),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),n===!0)for(let i=0;i<e.children.length;i++){const r=e.children[i];this.add(r.clone())}return this}}cn.DEFAULT_UP=new U(0,1,0);cn.DEFAULT_MATRIX_AUTO_UPDATE=!0;cn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Ra extends cn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Kg={type:"move"};class vc{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ra,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ra,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new U,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new U),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ra,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new U,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new U),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const n=this._hand;if(n)for(const i of e.hand.values())this._getHandJoint(n,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,n,i){let r=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&n.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const S of e.hand.values()){const p=n.getJointPose(S,i),d=this._getHandJoint(l,S);p!==null&&(d.matrix.fromArray(p.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=p.radius),d.visible=p!==null}const h=l.joints["index-finger-tip"],f=l.joints["thumb-tip"],u=h.position.distanceTo(f.position),m=.02,_=.005;l.inputState.pinching&&u>m+_?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=m-_&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=n.getPose(e.gripSpace,i),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(r=n.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Kg)))}return o!==null&&(o.visible=r!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,n){if(e.joints[n.jointName]===void 0){const i=new Ra;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[n.jointName]=i,e.add(i)}return e.joints[n.jointName]}}const _p={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Vi={h:0,s:0,l:0},Ca={h:0,s:0,l:0};function xc(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+(e-t)*6*n:n<1/2?e:n<2/3?t+(e-t)*6*(2/3-n):t}class We{constructor(e,n,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,n,i)}set(e,n,i){if(n===void 0&&i===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,n,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,n=Fn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Ke.colorSpaceToWorking(this,n),this}setRGB(e,n,i,r=Ke.workingColorSpace){return this.r=e,this.g=n,this.b=i,Ke.colorSpaceToWorking(this,r),this}setHSL(e,n,i,r=Ke.workingColorSpace){if(e=Fg(e,1),n=Xe(n,0,1),i=Xe(i,0,1),n===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+n):i+n-i*n,a=2*i-s;this.r=xc(a,s,e+1/3),this.g=xc(a,s,e),this.b=xc(a,s,e-1/3)}return Ke.colorSpaceToWorking(this,r),this}setStyle(e,n=Fn){function i(s){s!==void 0&&parseFloat(s)<1&&Ne("Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=r[1],o=r[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,n);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,n);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,n);break;default:Ne("Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=r[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,n);if(a===6)return this.setHex(parseInt(s,16),n);Ne("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,n);return this}setColorName(e,n=Fn){const i=_p[e.toLowerCase()];return i!==void 0?this.setHex(i,n):Ne("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Pi(e.r),this.g=Pi(e.g),this.b=Pi(e.b),this}copyLinearToSRGB(e){return this.r=Qr(e.r),this.g=Qr(e.g),this.b=Qr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Fn){return Ke.workingToColorSpace(Jt.copy(this),e),Math.round(Xe(Jt.r*255,0,255))*65536+Math.round(Xe(Jt.g*255,0,255))*256+Math.round(Xe(Jt.b*255,0,255))}getHexString(e=Fn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,n=Ke.workingColorSpace){Ke.workingToColorSpace(Jt.copy(this),n);const i=Jt.r,r=Jt.g,s=Jt.b,a=Math.max(i,r,s),o=Math.min(i,r,s);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const f=a-o;switch(l=h<=.5?f/(a+o):f/(2-a-o),a){case i:c=(r-s)/f+(r<s?6:0);break;case r:c=(s-i)/f+2;break;case s:c=(i-r)/f+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,n=Ke.workingColorSpace){return Ke.workingToColorSpace(Jt.copy(this),n),e.r=Jt.r,e.g=Jt.g,e.b=Jt.b,e}getStyle(e=Fn){Ke.workingToColorSpace(Jt.copy(this),e);const n=Jt.r,i=Jt.g,r=Jt.b;return e!==Fn?`color(${e} ${n.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(n*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,n,i){return this.getHSL(Vi),this.setHSL(Vi.h+e,Vi.s+n,Vi.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,n){return this.r=e.r+n.r,this.g=e.g+n.g,this.b=e.b+n.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,n){return this.r+=(e.r-this.r)*n,this.g+=(e.g-this.g)*n,this.b+=(e.b-this.b)*n,this}lerpColors(e,n,i){return this.r=e.r+(n.r-e.r)*i,this.g=e.g+(n.g-e.g)*i,this.b=e.b+(n.b-e.b)*i,this}lerpHSL(e,n){this.getHSL(Vi),e.getHSL(Ca);const i=fc(Vi.h,Ca.h,n),r=fc(Vi.s,Ca.s,n),s=fc(Vi.l,Ca.l,n);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const n=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*n+s[3]*i+s[6]*r,this.g=s[1]*n+s[4]*i+s[7]*r,this.b=s[2]*n+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,n=0){return this.r=e[n],this.g=e[n+1],this.b=e[n+2],this}toArray(e=[],n=0){return e[n]=this.r,e[n+1]=this.g,e[n+2]=this.b,e}fromBufferAttribute(e,n){return this.r=e.getX(n),this.g=e.getY(n),this.b=e.getZ(n),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Jt=new We;We.NAMES=_p;class wu{constructor(e,n=25e-5){this.isFogExp2=!0,this.name="",this.color=new We(e),this.density=n}clone(){return new wu(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class $g extends cn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ui,this.environmentIntensity=1,this.environmentRotation=new ui,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,n){return super.copy(e,n),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const n=super.toJSON(e);return this.fog!==null&&(n.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(n.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(n.object.backgroundIntensity=this.backgroundIntensity),n.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(n.object.environmentIntensity=this.environmentIntensity),n.object.environmentRotation=this.environmentRotation.toArray(),n}}const Hn=new U,Si=new U,Mc=new U,Ei=new U,kr=new U,zr=new U,af=new U,Sc=new U,Ec=new U,yc=new U,Tc=new bt,bc=new bt,Ac=new bt;class Xn{constructor(e=new U,n=new U,i=new U){this.a=e,this.b=n,this.c=i}static getNormal(e,n,i,r){r.subVectors(i,n),Hn.subVectors(e,n),r.cross(Hn);const s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,n,i,r,s){Hn.subVectors(r,n),Si.subVectors(i,n),Mc.subVectors(e,n);const a=Hn.dot(Hn),o=Hn.dot(Si),c=Hn.dot(Mc),l=Si.dot(Si),h=Si.dot(Mc),f=a*l-o*o;if(f===0)return s.set(0,0,0),null;const u=1/f,m=(l*c-o*h)*u,_=(a*h-o*c)*u;return s.set(1-m-_,_,m)}static containsPoint(e,n,i,r){return this.getBarycoord(e,n,i,r,Ei)===null?!1:Ei.x>=0&&Ei.y>=0&&Ei.x+Ei.y<=1}static getInterpolation(e,n,i,r,s,a,o,c){return this.getBarycoord(e,n,i,r,Ei)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Ei.x),c.addScaledVector(a,Ei.y),c.addScaledVector(o,Ei.z),c)}static getInterpolatedAttribute(e,n,i,r,s,a){return Tc.setScalar(0),bc.setScalar(0),Ac.setScalar(0),Tc.fromBufferAttribute(e,n),bc.fromBufferAttribute(e,i),Ac.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(Tc,s.x),a.addScaledVector(bc,s.y),a.addScaledVector(Ac,s.z),a}static isFrontFacing(e,n,i,r){return Hn.subVectors(i,n),Si.subVectors(e,n),Hn.cross(Si).dot(r)<0}set(e,n,i){return this.a.copy(e),this.b.copy(n),this.c.copy(i),this}setFromPointsAndIndices(e,n,i,r){return this.a.copy(e[n]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,n,i,r){return this.a.fromBufferAttribute(e,n),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Hn.subVectors(this.c,this.b),Si.subVectors(this.a,this.b),Hn.cross(Si).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Xn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,n){return Xn.getBarycoord(e,this.a,this.b,this.c,n)}getInterpolation(e,n,i,r,s){return Xn.getInterpolation(e,this.a,this.b,this.c,n,i,r,s)}containsPoint(e){return Xn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Xn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,n){const i=this.a,r=this.b,s=this.c;let a,o;kr.subVectors(r,i),zr.subVectors(s,i),Sc.subVectors(e,i);const c=kr.dot(Sc),l=zr.dot(Sc);if(c<=0&&l<=0)return n.copy(i);Ec.subVectors(e,r);const h=kr.dot(Ec),f=zr.dot(Ec);if(h>=0&&f<=h)return n.copy(r);const u=c*f-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),n.copy(i).addScaledVector(kr,a);yc.subVectors(e,s);const m=kr.dot(yc),_=zr.dot(yc);if(_>=0&&m<=_)return n.copy(s);const S=m*l-c*_;if(S<=0&&l>=0&&_<=0)return o=l/(l-_),n.copy(i).addScaledVector(zr,o);const p=h*_-m*f;if(p<=0&&f-h>=0&&m-_>=0)return af.subVectors(s,r),o=(f-h)/(f-h+(m-_)),n.copy(r).addScaledVector(af,o);const d=1/(p+S+u);return a=S*d,o=u*d,n.copy(i).addScaledVector(kr,a).addScaledVector(zr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class da{constructor(e=new U(1/0,1/0,1/0),n=new U(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=n}set(e,n){return this.min.copy(e),this.max.copy(n),this}setFromArray(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n+=3)this.expandByPoint(Wn.fromArray(e,n));return this}setFromBufferAttribute(e){this.makeEmpty();for(let n=0,i=e.count;n<i;n++)this.expandByPoint(Wn.fromBufferAttribute(e,n));return this}setFromPoints(e){this.makeEmpty();for(let n=0,i=e.length;n<i;n++)this.expandByPoint(e[n]);return this}setFromCenterAndSize(e,n){const i=Wn.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,n=!1){return this.makeEmpty(),this.expandByObject(e,n)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,n=!1){e.updateWorldMatrix(!1,!1);const i=e.geometry;if(i!==void 0){const s=i.getAttribute("position");if(n===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Wn):Wn.fromBufferAttribute(s,a),Wn.applyMatrix4(e.matrixWorld),this.expandByPoint(Wn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Pa.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Pa.copy(i.boundingBox)),Pa.applyMatrix4(e.matrixWorld),this.union(Pa)}const r=e.children;for(let s=0,a=r.length;s<a;s++)this.expandByObject(r[s],n);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,n){return n.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Wn),Wn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let n,i;return e.normal.x>0?(n=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(n=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(n+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(n+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(n+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(n+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),n<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ks),La.subVectors(this.max,ks),Vr.subVectors(e.a,ks),Gr.subVectors(e.b,ks),Hr.subVectors(e.c,ks),Gi.subVectors(Gr,Vr),Hi.subVectors(Hr,Gr),sr.subVectors(Vr,Hr);let n=[0,-Gi.z,Gi.y,0,-Hi.z,Hi.y,0,-sr.z,sr.y,Gi.z,0,-Gi.x,Hi.z,0,-Hi.x,sr.z,0,-sr.x,-Gi.y,Gi.x,0,-Hi.y,Hi.x,0,-sr.y,sr.x,0];return!wc(n,Vr,Gr,Hr,La)||(n=[1,0,0,0,1,0,0,0,1],!wc(n,Vr,Gr,Hr,La))?!1:(Ia.crossVectors(Gi,Hi),n=[Ia.x,Ia.y,Ia.z],wc(n,Vr,Gr,Hr,La))}clampPoint(e,n){return n.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Wn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Wn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(yi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),yi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),yi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),yi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),yi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),yi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),yi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),yi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(yi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const yi=[new U,new U,new U,new U,new U,new U,new U,new U],Wn=new U,Pa=new da,Vr=new U,Gr=new U,Hr=new U,Gi=new U,Hi=new U,sr=new U,ks=new U,La=new U,Ia=new U,ar=new U;function wc(t,e,n,i,r){for(let s=0,a=t.length-3;s<=a;s+=3){ar.fromArray(t,s);const o=r.x*Math.abs(ar.x)+r.y*Math.abs(ar.y)+r.z*Math.abs(ar.z),c=e.dot(ar),l=n.dot(ar),h=i.dot(ar);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Lt=new U,Da=new Ye;let Zg=0;class Tn{constructor(e,n,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Zg++}),this.name="",this.array=e,this.itemSize=n,this.count=e!==void 0?e.length/n:0,this.normalized=i,this.usage=Xh,this.updateRanges=[],this.gpuType=ii,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,n){this.updateRanges.push({start:e,count:n})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,n,i){e*=this.itemSize,i*=n.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=n.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let n=0,i=this.count;n<i;n++)Da.fromBufferAttribute(this,n),Da.applyMatrix3(e),this.setXY(n,Da.x,Da.y);else if(this.itemSize===3)for(let n=0,i=this.count;n<i;n++)Lt.fromBufferAttribute(this,n),Lt.applyMatrix3(e),this.setXYZ(n,Lt.x,Lt.y,Lt.z);return this}applyMatrix4(e){for(let n=0,i=this.count;n<i;n++)Lt.fromBufferAttribute(this,n),Lt.applyMatrix4(e),this.setXYZ(n,Lt.x,Lt.y,Lt.z);return this}applyNormalMatrix(e){for(let n=0,i=this.count;n<i;n++)Lt.fromBufferAttribute(this,n),Lt.applyNormalMatrix(e),this.setXYZ(n,Lt.x,Lt.y,Lt.z);return this}transformDirection(e){for(let n=0,i=this.count;n<i;n++)Lt.fromBufferAttribute(this,n),Lt.transformDirection(e),this.setXYZ(n,Lt.x,Lt.y,Lt.z);return this}set(e,n=0){return this.array.set(e,n),this}getComponent(e,n){let i=this.array[e*this.itemSize+n];return this.normalized&&(i=Os(i,this.array)),i}setComponent(e,n,i){return this.normalized&&(i=un(i,this.array)),this.array[e*this.itemSize+n]=i,this}getX(e){let n=this.array[e*this.itemSize];return this.normalized&&(n=Os(n,this.array)),n}setX(e,n){return this.normalized&&(n=un(n,this.array)),this.array[e*this.itemSize]=n,this}getY(e){let n=this.array[e*this.itemSize+1];return this.normalized&&(n=Os(n,this.array)),n}setY(e,n){return this.normalized&&(n=un(n,this.array)),this.array[e*this.itemSize+1]=n,this}getZ(e){let n=this.array[e*this.itemSize+2];return this.normalized&&(n=Os(n,this.array)),n}setZ(e,n){return this.normalized&&(n=un(n,this.array)),this.array[e*this.itemSize+2]=n,this}getW(e){let n=this.array[e*this.itemSize+3];return this.normalized&&(n=Os(n,this.array)),n}setW(e,n){return this.normalized&&(n=un(n,this.array)),this.array[e*this.itemSize+3]=n,this}setXY(e,n,i){return e*=this.itemSize,this.normalized&&(n=un(n,this.array),i=un(i,this.array)),this.array[e+0]=n,this.array[e+1]=i,this}setXYZ(e,n,i,r){return e*=this.itemSize,this.normalized&&(n=un(n,this.array),i=un(i,this.array),r=un(r,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,n,i,r,s){return e*=this.itemSize,this.normalized&&(n=un(n,this.array),i=un(i,this.array),r=un(r,this.array),s=un(s,this.array)),this.array[e+0]=n,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Xh&&(e.usage=this.usage),e}}class vp extends Tn{constructor(e,n,i){super(new Uint16Array(e),n,i)}}class xp extends Tn{constructor(e,n,i){super(new Uint32Array(e),n,i)}}class qt extends Tn{constructor(e,n,i){super(new Float32Array(e),n,i)}}const Jg=new da,zs=new U,Rc=new U;class Po{constructor(e=new U,n=-1){this.isSphere=!0,this.center=e,this.radius=n}set(e,n){return this.center.copy(e),this.radius=n,this}setFromPoints(e,n){const i=this.center;n!==void 0?i.copy(n):Jg.setFromPoints(e).getCenter(i);let r=0;for(let s=0,a=e.length;s<a;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const n=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=n*n}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,n){const i=this.center.distanceToSquared(e);return n.copy(e),i>this.radius*this.radius&&(n.sub(this.center).normalize(),n.multiplyScalar(this.radius).add(this.center)),n}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;zs.subVectors(e,this.center);const n=zs.lengthSq();if(n>this.radius*this.radius){const i=Math.sqrt(n),r=(i-this.radius)*.5;this.center.addScaledVector(zs,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Rc.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(zs.copy(e.center).add(Rc)),this.expandByPoint(zs.copy(e.center).sub(Rc))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Qg=0;const In=new St,Cc=new cn,Wr=new U,vn=new da,Vs=new da,Ht=new U;class ln extends xs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Qg++}),this.uuid=fa(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ig(e)?xp:vp)(e,1):this.index=e,this}setIndirect(e,n=0){return this.indirect=e,this.indirectOffset=n,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,n){return this.attributes[e]=n,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,n,i=0){this.groups.push({start:e,count:n,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,n){this.drawRange.start=e,this.drawRange.count=n}applyMatrix4(e){const n=this.attributes.position;n!==void 0&&(n.applyMatrix4(e),n.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new Be().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return In.makeRotationFromQuaternion(e),this.applyMatrix4(In),this}rotateX(e){return In.makeRotationX(e),this.applyMatrix4(In),this}rotateY(e){return In.makeRotationY(e),this.applyMatrix4(In),this}rotateZ(e){return In.makeRotationZ(e),this.applyMatrix4(In),this}translate(e,n,i){return In.makeTranslation(e,n,i),this.applyMatrix4(In),this}scale(e,n,i){return In.makeScale(e,n,i),this.applyMatrix4(In),this}lookAt(e){return Cc.lookAt(e),Cc.updateMatrix(),this.applyMatrix4(Cc.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Wr).negate(),this.translate(Wr.x,Wr.y,Wr.z),this}setFromPoints(e){const n=this.getAttribute("position");if(n===void 0){const i=[];for(let r=0,s=e.length;r<s;r++){const a=e[r];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new qt(i,3))}else{const i=Math.min(e.length,n.count);for(let r=0;r<i;r++){const s=e[r];n.setXYZ(r,s.x,s.y,s.z||0)}e.length>n.count&&Ne("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),n.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new da);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new U(-1/0,-1/0,-1/0),new U(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),n)for(let i=0,r=n.length;i<r;i++){const s=n[i];vn.setFromBufferAttribute(s),this.morphTargetsRelative?(Ht.addVectors(this.boundingBox.min,vn.min),this.boundingBox.expandByPoint(Ht),Ht.addVectors(this.boundingBox.max,vn.max),this.boundingBox.expandByPoint(Ht)):(this.boundingBox.expandByPoint(vn.min),this.boundingBox.expandByPoint(vn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Po);const e=this.attributes.position,n=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new U,1/0);return}if(e){const i=this.boundingSphere.center;if(vn.setFromBufferAttribute(e),n)for(let s=0,a=n.length;s<a;s++){const o=n[s];Vs.setFromBufferAttribute(o),this.morphTargetsRelative?(Ht.addVectors(vn.min,Vs.min),vn.expandByPoint(Ht),Ht.addVectors(vn.max,Vs.max),vn.expandByPoint(Ht)):(vn.expandByPoint(Vs.min),vn.expandByPoint(Vs.max))}vn.getCenter(i);let r=0;for(let s=0,a=e.count;s<a;s++)Ht.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Ht));if(n)for(let s=0,a=n.length;s<a;s++){const o=n[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Ht.fromBufferAttribute(o,l),c&&(Wr.fromBufferAttribute(e,l),Ht.add(Wr)),r=Math.max(r,i.distanceToSquared(Ht))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&Je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,n=this.attributes;if(e===null||n.position===void 0||n.normal===void 0||n.uv===void 0){Je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=n.position,r=n.normal,s=n.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Tn(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let v=0;v<i.count;v++)o[v]=new U,c[v]=new U;const l=new U,h=new U,f=new U,u=new Ye,m=new Ye,_=new Ye,S=new U,p=new U;function d(v,T,H){l.fromBufferAttribute(i,v),h.fromBufferAttribute(i,T),f.fromBufferAttribute(i,H),u.fromBufferAttribute(s,v),m.fromBufferAttribute(s,T),_.fromBufferAttribute(s,H),h.sub(l),f.sub(l),m.sub(u),_.sub(u);const R=1/(m.x*_.y-_.x*m.y);isFinite(R)&&(S.copy(h).multiplyScalar(_.y).addScaledVector(f,-m.y).multiplyScalar(R),p.copy(f).multiplyScalar(m.x).addScaledVector(h,-_.x).multiplyScalar(R),o[v].add(S),o[T].add(S),o[H].add(S),c[v].add(p),c[T].add(p),c[H].add(p))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let v=0,T=x.length;v<T;++v){const H=x[v],R=H.start,B=H.count;for(let z=R,q=R+B;z<q;z+=3)d(e.getX(z+0),e.getX(z+1),e.getX(z+2))}const y=new U,E=new U,w=new U,A=new U;function P(v){w.fromBufferAttribute(r,v),A.copy(w);const T=o[v];y.copy(T),y.sub(w.multiplyScalar(w.dot(T))).normalize(),E.crossVectors(A,T);const R=E.dot(c[v])<0?-1:1;a.setXYZW(v,y.x,y.y,y.z,R)}for(let v=0,T=x.length;v<T;++v){const H=x[v],R=H.start,B=H.count;for(let z=R,q=R+B;z<q;z+=3)P(e.getX(z+0)),P(e.getX(z+1)),P(e.getX(z+2))}}computeVertexNormals(){const e=this.index,n=this.getAttribute("position");if(n!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Tn(new Float32Array(n.count*3),3),this.setAttribute("normal",i);else for(let u=0,m=i.count;u<m;u++)i.setXYZ(u,0,0,0);const r=new U,s=new U,a=new U,o=new U,c=new U,l=new U,h=new U,f=new U;if(e)for(let u=0,m=e.count;u<m;u+=3){const _=e.getX(u+0),S=e.getX(u+1),p=e.getX(u+2);r.fromBufferAttribute(n,_),s.fromBufferAttribute(n,S),a.fromBufferAttribute(n,p),h.subVectors(a,s),f.subVectors(r,s),h.cross(f),o.fromBufferAttribute(i,_),c.fromBufferAttribute(i,S),l.fromBufferAttribute(i,p),o.add(h),c.add(h),l.add(h),i.setXYZ(_,o.x,o.y,o.z),i.setXYZ(S,c.x,c.y,c.z),i.setXYZ(p,l.x,l.y,l.z)}else for(let u=0,m=n.count;u<m;u+=3)r.fromBufferAttribute(n,u+0),s.fromBufferAttribute(n,u+1),a.fromBufferAttribute(n,u+2),h.subVectors(a,s),f.subVectors(r,s),h.cross(f),i.setXYZ(u+0,h.x,h.y,h.z),i.setXYZ(u+1,h.x,h.y,h.z),i.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let n=0,i=e.count;n<i;n++)Ht.fromBufferAttribute(e,n),Ht.normalize(),e.setXYZ(n,Ht.x,Ht.y,Ht.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,f=o.normalized,u=new l.constructor(c.length*h);let m=0,_=0;for(let S=0,p=c.length;S<p;S++){o.isInterleavedBufferAttribute?m=c[S]*o.data.stride+o.offset:m=c[S]*h;for(let d=0;d<h;d++)u[_++]=l[m++]}return new Tn(u,h,f)}if(this.index===null)return Ne("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const n=new ln,i=this.index.array,r=this.attributes;for(const o in r){const c=r[o],l=e(c,i);n.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let h=0,f=l.length;h<f;h++){const u=l[h],m=e(u,i);c.push(m)}n.morphAttributes[o]=c}n.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];n.addGroup(l.start,l.count,l.materialIndex)}return n}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const n=this.index;n!==null&&(e.data.index={type:n.array.constructor.name,array:Array.prototype.slice.call(n.array)});const i=this.attributes;for(const c in i){const l=i[c];e.data.attributes[c]=l.toJSON(e.data)}const r={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let f=0,u=l.length;f<u;f++){const m=l[f];h.push(m.toJSON(e.data))}h.length>0&&(r[c]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const n={};this.name=e.name;const i=e.index;i!==null&&this.setIndex(i.clone());const r=e.attributes;for(const l in r){const h=r[l];this.setAttribute(l,h.clone(n))}const s=e.morphAttributes;for(const l in s){const h=[],f=s[l];for(let u=0,m=f.length;u<m;u++)h.push(f[u].clone(n));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const f=a[l];this.addGroup(f.start,f.count,f.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}let e_=0;class Ss extends xs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:e_++}),this.uuid=fa(),this.name="",this.type="Material",this.blending=Jr,this.side=Qi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=rl,this.blendDst=sl,this.blendEquation=pr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new We(0,0,0),this.blendAlpha=0,this.depthFunc=is,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Wh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ur,this.stencilZFail=Ur,this.stencilZPass=Ur,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const n in e){const i=e[n];if(i===void 0){Ne(`Material: parameter '${n}' has value of undefined.`);continue}const r=this[n];if(r===void 0){Ne(`Material: '${n}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[n]=i}}toJSON(e){const n=e===void 0||typeof e=="string";n&&(e={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Jr&&(i.blending=this.blending),this.side!==Qi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==rl&&(i.blendSrc=this.blendSrc),this.blendDst!==sl&&(i.blendDst=this.blendDst),this.blendEquation!==pr&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==is&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Wh&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ur&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ur&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ur&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.allowOverride===!1&&(i.allowOverride=!1),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(n){const s=r(e.textures),a=r(e.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const n=e.clippingPlanes;let i=null;if(n!==null){const r=n.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=n[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const Ti=new U,Pc=new U,Ua=new U,Wi=new U,Lc=new U,Na=new U,Ic=new U;class Mp{constructor(e=new U,n=new U(0,0,-1)){this.origin=e,this.direction=n}set(e,n){return this.origin.copy(e),this.direction.copy(n),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,n){return n.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ti)),this}closestPointToPoint(e,n){n.subVectors(e,this.origin);const i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const n=Ti.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(Ti.copy(this.origin).addScaledVector(this.direction,n),Ti.distanceToSquared(e))}distanceSqToSegment(e,n,i,r){Pc.copy(e).add(n).multiplyScalar(.5),Ua.copy(n).sub(e).normalize(),Wi.copy(this.origin).sub(Pc);const s=e.distanceTo(n)*.5,a=-this.direction.dot(Ua),o=Wi.dot(this.direction),c=-Wi.dot(Ua),l=Wi.lengthSq(),h=Math.abs(1-a*a);let f,u,m,_;if(h>0)if(f=a*c-o,u=a*o-c,_=s*h,f>=0)if(u>=-_)if(u<=_){const S=1/h;f*=S,u*=S,m=f*(f+a*u+2*o)+u*(a*f+u+2*c)+l}else u=s,f=Math.max(0,-(a*u+o)),m=-f*f+u*(u+2*c)+l;else u=-s,f=Math.max(0,-(a*u+o)),m=-f*f+u*(u+2*c)+l;else u<=-_?(f=Math.max(0,-(-a*s+o)),u=f>0?-s:Math.min(Math.max(-s,-c),s),m=-f*f+u*(u+2*c)+l):u<=_?(f=0,u=Math.min(Math.max(-s,-c),s),m=u*(u+2*c)+l):(f=Math.max(0,-(a*s+o)),u=f>0?s:Math.min(Math.max(-s,-c),s),m=-f*f+u*(u+2*c)+l);else u=a>0?-s:s,f=Math.max(0,-(a*u+o)),m=-f*f+u*(u+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,f),r&&r.copy(Pc).addScaledVector(Ua,u),m}intersectSphere(e,n){Ti.subVectors(e.center,this.origin);const i=Ti.dot(this.direction),r=Ti.dot(Ti)-i*i,s=e.radius*e.radius;if(r>s)return null;const a=Math.sqrt(s-r),o=i-a,c=i+a;return c<0?null:o<0?this.at(c,n):this.at(o,n)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const n=e.normal.dot(this.direction);if(n===0)return e.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(e.normal)+e.constant)/n;return i>=0?i:null}intersectPlane(e,n){const i=this.distanceToPlane(e);return i===null?null:this.at(i,n)}intersectsPlane(e){const n=e.distanceToPoint(this.origin);return n===0||e.normal.dot(this.direction)*n<0}intersectBox(e,n){let i,r,s,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return l>=0?(i=(e.min.x-u.x)*l,r=(e.max.x-u.x)*l):(i=(e.max.x-u.x)*l,r=(e.min.x-u.x)*l),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),i>a||s>r||((s>i||isNaN(i))&&(i=s),(a<r||isNaN(r))&&(r=a),f>=0?(o=(e.min.z-u.z)*f,c=(e.max.z-u.z)*f):(o=(e.max.z-u.z)*f,c=(e.min.z-u.z)*f),i>c||o>r)||((o>i||i!==i)&&(i=o),(c<r||r!==r)&&(r=c),r<0)?null:this.at(i>=0?i:r,n)}intersectsBox(e){return this.intersectBox(e,Ti)!==null}intersectTriangle(e,n,i,r,s){Lc.subVectors(n,e),Na.subVectors(i,e),Ic.crossVectors(Lc,Na);let a=this.direction.dot(Ic),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Wi.subVectors(this.origin,e);const c=o*this.direction.dot(Na.crossVectors(Wi,Na));if(c<0)return null;const l=o*this.direction.dot(Lc.cross(Wi));if(l<0||c+l>a)return null;const h=-o*Wi.dot(Ic);return h<0?null:this.at(h/a,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Es extends Ss{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new We(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ui,this.combine=_u,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const of=new St,or=new Mp,Fa=new Po,cf=new U,Oa=new U,Ba=new U,ka=new U,Dc=new U,za=new U,lf=new U,Va=new U;class pn extends cn{constructor(e=new ln,n=new Es){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,n){const i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;n.fromBufferAttribute(r,e);const o=this.morphTargetInfluences;if(s&&o){za.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=o[c],f=s[c];h!==0&&(Dc.fromBufferAttribute(f,e),a?za.addScaledVector(Dc,h):za.addScaledVector(Dc.sub(n),h))}n.add(za)}return n}raycast(e,n){const i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Fa.copy(i.boundingSphere),Fa.applyMatrix4(s),or.copy(e.ray).recast(e.near),!(Fa.containsPoint(or.origin)===!1&&(or.intersectSphere(Fa,cf)===null||or.origin.distanceToSquared(cf)>(e.far-e.near)**2))&&(of.copy(s).invert(),or.copy(e.ray).applyMatrix4(of),!(i.boundingBox!==null&&or.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,n,or)))}_computeIntersections(e,n,i){let r;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,f=s.attributes.normal,u=s.groups,m=s.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,S=u.length;_<S;_++){const p=u[_],d=a[p.materialIndex],x=Math.max(p.start,m.start),y=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let E=x,w=y;E<w;E+=3){const A=o.getX(E),P=o.getX(E+1),v=o.getX(E+2);r=Ga(this,d,e,i,l,h,f,A,P,v),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=p.materialIndex,n.push(r))}}else{const _=Math.max(0,m.start),S=Math.min(o.count,m.start+m.count);for(let p=_,d=S;p<d;p+=3){const x=o.getX(p),y=o.getX(p+1),E=o.getX(p+2);r=Ga(this,a,e,i,l,h,f,x,y,E),r&&(r.faceIndex=Math.floor(p/3),n.push(r))}}else if(c!==void 0)if(Array.isArray(a))for(let _=0,S=u.length;_<S;_++){const p=u[_],d=a[p.materialIndex],x=Math.max(p.start,m.start),y=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let E=x,w=y;E<w;E+=3){const A=E,P=E+1,v=E+2;r=Ga(this,d,e,i,l,h,f,A,P,v),r&&(r.faceIndex=Math.floor(E/3),r.face.materialIndex=p.materialIndex,n.push(r))}}else{const _=Math.max(0,m.start),S=Math.min(c.count,m.start+m.count);for(let p=_,d=S;p<d;p+=3){const x=p,y=p+1,E=p+2;r=Ga(this,a,e,i,l,h,f,x,y,E),r&&(r.faceIndex=Math.floor(p/3),n.push(r))}}}}function t_(t,e,n,i,r,s,a,o){let c;if(e.side===dn?c=i.intersectTriangle(a,s,r,!0,o):c=i.intersectTriangle(r,s,a,e.side===Qi,o),c===null)return null;Va.copy(o),Va.applyMatrix4(t.matrixWorld);const l=n.ray.origin.distanceTo(Va);return l<n.near||l>n.far?null:{distance:l,point:Va.clone(),object:t}}function Ga(t,e,n,i,r,s,a,o,c,l){t.getVertexPosition(o,Oa),t.getVertexPosition(c,Ba),t.getVertexPosition(l,ka);const h=t_(t,e,n,i,Oa,Ba,ka,lf);if(h){const f=new U;Xn.getBarycoord(lf,Oa,Ba,ka,f),r&&(h.uv=Xn.getInterpolatedAttribute(r,o,c,l,f,new Ye)),s&&(h.uv1=Xn.getInterpolatedAttribute(s,o,c,l,f,new Ye)),a&&(h.normal=Xn.getInterpolatedAttribute(a,o,c,l,f,new U),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new U,materialIndex:0};Xn.getNormal(Oa,Ba,ka,u.normal),h.face=u,h.barycoord=f}return h}class n_ extends on{constructor(e=null,n=1,i=1,r,s,a,o,c,l=jt,h=jt,f,u){super(null,a,o,c,l,h,r,s,f,u),this.isDataTexture=!0,this.image={data:e,width:n,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Uc=new U,i_=new U,r_=new Be;class dr{constructor(e=new U(1,0,0),n=0){this.isPlane=!0,this.normal=e,this.constant=n}set(e,n){return this.normal.copy(e),this.constant=n,this}setComponents(e,n,i,r){return this.normal.set(e,n,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,n){return this.normal.copy(e),this.constant=-n.dot(this.normal),this}setFromCoplanarPoints(e,n,i){const r=Uc.subVectors(i,n).cross(i_.subVectors(e,n)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,n){return n.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,n){const i=e.delta(Uc),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?n.copy(e.start):null;const s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:n.copy(e.start).addScaledVector(i,s)}intersectsLine(e){const n=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return n<0&&i>0||i<0&&n>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,n){const i=n||r_.getNormalMatrix(e),r=this.coplanarPoint(Uc).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const cr=new Po,s_=new Ye(.5,.5),Ha=new U;class Ru{constructor(e=new dr,n=new dr,i=new dr,r=new dr,s=new dr,a=new dr){this.planes=[e,n,i,r,s,a]}set(e,n,i,r,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(n),o[2].copy(i),o[3].copy(r),o[4].copy(s),o[5].copy(a),this}copy(e){const n=this.planes;for(let i=0;i<6;i++)n[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,n=ri,i=!1){const r=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],f=s[5],u=s[6],m=s[7],_=s[8],S=s[9],p=s[10],d=s[11],x=s[12],y=s[13],E=s[14],w=s[15];if(r[0].setComponents(l-a,m-h,d-_,w-x).normalize(),r[1].setComponents(l+a,m+h,d+_,w+x).normalize(),r[2].setComponents(l+o,m+f,d+S,w+y).normalize(),r[3].setComponents(l-o,m-f,d-S,w-y).normalize(),i)r[4].setComponents(c,u,p,E).normalize(),r[5].setComponents(l-c,m-u,d-p,w-E).normalize();else if(r[4].setComponents(l-c,m-u,d-p,w-E).normalize(),n===ri)r[5].setComponents(l+c,m+u,d+p,w+E).normalize();else if(n===sa)r[5].setComponents(c,u,p,E).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+n);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),cr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const n=e.geometry;n.boundingSphere===null&&n.computeBoundingSphere(),cr.copy(n.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(cr)}intersectsSprite(e){cr.center.set(0,0,0);const n=s_.distanceTo(e.center);return cr.radius=.7071067811865476+n,cr.applyMatrix4(e.matrixWorld),this.intersectsSphere(cr)}intersectsSphere(e){const n=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(n[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){const n=this.planes;for(let i=0;i<6;i++){const r=n[i];if(Ha.x=r.normal.x>0?e.max.x:e.min.x,Ha.y=r.normal.y>0?e.max.y:e.min.y,Ha.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ha)<0)return!1}return!0}containsPoint(e){const n=this.planes;for(let i=0;i<6;i++)if(n[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Cu extends Ss{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new We(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const uf=new St,jl=new Mp,Wa=new Po,Xa=new U;class Sp extends cn{constructor(e=new ln,n=new Cu){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=n,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,n){return super.copy(e,n),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,n){const i=this.geometry,r=this.matrixWorld,s=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Wa.copy(i.boundingSphere),Wa.applyMatrix4(r),Wa.radius+=s,e.ray.intersectsSphere(Wa)===!1)return;uf.copy(r).invert(),jl.copy(e.ray).applyMatrix4(uf);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=i.index,f=i.attributes.position;if(l!==null){const u=Math.max(0,a.start),m=Math.min(l.count,a.start+a.count);for(let _=u,S=m;_<S;_++){const p=l.getX(_);Xa.fromBufferAttribute(f,p),hf(Xa,p,c,r,e,n,this)}}else{const u=Math.max(0,a.start),m=Math.min(f.count,a.start+a.count);for(let _=u,S=m;_<S;_++)Xa.fromBufferAttribute(f,_),hf(Xa,_,c,r,e,n,this)}}updateMorphTargets(){const n=this.geometry.morphAttributes,i=Object.keys(n);if(i.length>0){const r=n[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=r.length;s<a;s++){const o=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function hf(t,e,n,i,r,s,a){const o=jl.distanceSqToPoint(t);if(o<n){const c=new U;jl.closestPointToPoint(t,c),c.applyMatrix4(i);const l=r.ray.origin.distanceTo(c);if(l<r.near||l>r.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Ep extends on{constructor(e=[],n=br,i,r,s,a,o,c,l,h){super(e,n,i,r,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class aa extends on{constructor(e,n,i=li,r,s,a,o=jt,c=jt,l,h=Ii,f=1){if(h!==Ii&&h!==_r)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:n,depth:f};super(u,r,s,a,o,c,h,i,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Au(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const n=super.toJSON(e);return this.compareFunction!==null&&(n.compareFunction=this.compareFunction),n}}class a_ extends aa{constructor(e,n=li,i=br,r,s,a=jt,o=jt,c,l=Ii){const h={width:e,height:e,depth:1},f=[h,h,h,h,h,h];super(e,e,n,i,r,s,a,o,c,l),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class yp extends on{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class pa extends ln{constructor(e=1,n=1,i=1,r=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:n,depth:i,widthSegments:r,heightSegments:s,depthSegments:a};const o=this;r=Math.floor(r),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],h=[],f=[];let u=0,m=0;_("z","y","x",-1,-1,i,n,e,a,s,0),_("z","y","x",1,-1,i,n,-e,a,s,1),_("x","z","y",1,1,e,i,n,r,a,2),_("x","z","y",1,-1,e,i,-n,r,a,3),_("x","y","z",1,-1,e,n,i,r,s,4),_("x","y","z",-1,-1,e,n,-i,r,s,5),this.setIndex(c),this.setAttribute("position",new qt(l,3)),this.setAttribute("normal",new qt(h,3)),this.setAttribute("uv",new qt(f,2));function _(S,p,d,x,y,E,w,A,P,v,T){const H=E/P,R=w/v,B=E/2,z=w/2,q=A/2,k=P+1,G=v+1;let N=0,Q=0;const $=new U;for(let le=0;le<G;le++){const me=le*R-z;for(let he=0;he<k;he++){const ke=he*H-B;$[S]=ke*x,$[p]=me*y,$[d]=q,l.push($.x,$.y,$.z),$[S]=0,$[p]=0,$[d]=A>0?1:-1,h.push($.x,$.y,$.z),f.push(he/P),f.push(1-le/v),N+=1}}for(let le=0;le<v;le++)for(let me=0;me<P;me++){const he=u+me+k*le,ke=u+me+k*(le+1),pt=u+(me+1)+k*(le+1),dt=u+(me+1)+k*le;c.push(he,ke,dt),c.push(ke,pt,dt),Q+=6}o.addGroup(m,Q,T),m+=Q,u+=N}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new pa(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Pu extends ln{constructor(e=[],n=[],i=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:n,radius:i,detail:r};const s=[],a=[];o(r),l(i),h(),this.setAttribute("position",new qt(s,3)),this.setAttribute("normal",new qt(s.slice(),3)),this.setAttribute("uv",new qt(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const y=new U,E=new U,w=new U;for(let A=0;A<n.length;A+=3)m(n[A+0],y),m(n[A+1],E),m(n[A+2],w),c(y,E,w,x)}function c(x,y,E,w){const A=w+1,P=[];for(let v=0;v<=A;v++){P[v]=[];const T=x.clone().lerp(E,v/A),H=y.clone().lerp(E,v/A),R=A-v;for(let B=0;B<=R;B++)B===0&&v===A?P[v][B]=T:P[v][B]=T.clone().lerp(H,B/R)}for(let v=0;v<A;v++)for(let T=0;T<2*(A-v)-1;T++){const H=Math.floor(T/2);T%2===0?(u(P[v][H+1]),u(P[v+1][H]),u(P[v][H])):(u(P[v][H+1]),u(P[v+1][H+1]),u(P[v+1][H]))}}function l(x){const y=new U;for(let E=0;E<s.length;E+=3)y.x=s[E+0],y.y=s[E+1],y.z=s[E+2],y.normalize().multiplyScalar(x),s[E+0]=y.x,s[E+1]=y.y,s[E+2]=y.z}function h(){const x=new U;for(let y=0;y<s.length;y+=3){x.x=s[y+0],x.y=s[y+1],x.z=s[y+2];const E=p(x)/2/Math.PI+.5,w=d(x)/Math.PI+.5;a.push(E,1-w)}_(),f()}function f(){for(let x=0;x<a.length;x+=6){const y=a[x+0],E=a[x+2],w=a[x+4],A=Math.max(y,E,w),P=Math.min(y,E,w);A>.9&&P<.1&&(y<.2&&(a[x+0]+=1),E<.2&&(a[x+2]+=1),w<.2&&(a[x+4]+=1))}}function u(x){s.push(x.x,x.y,x.z)}function m(x,y){const E=x*3;y.x=e[E+0],y.y=e[E+1],y.z=e[E+2]}function _(){const x=new U,y=new U,E=new U,w=new U,A=new Ye,P=new Ye,v=new Ye;for(let T=0,H=0;T<s.length;T+=9,H+=6){x.set(s[T+0],s[T+1],s[T+2]),y.set(s[T+3],s[T+4],s[T+5]),E.set(s[T+6],s[T+7],s[T+8]),A.set(a[H+0],a[H+1]),P.set(a[H+2],a[H+3]),v.set(a[H+4],a[H+5]),w.copy(x).add(y).add(E).divideScalar(3);const R=p(w);S(A,H+0,x,R),S(P,H+2,y,R),S(v,H+4,E,R)}}function S(x,y,E,w){w<0&&x.x===1&&(a[y]=x.x-1),E.x===0&&E.z===0&&(a[y]=w/2/Math.PI+.5)}function p(x){return Math.atan2(x.z,-x.x)}function d(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pu(e.vertices,e.indices,e.radius,e.detail)}}class Lu extends Pu{constructor(e=1,n=0){const i=(1+Math.sqrt(5))/2,r=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],s=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(r,s,e,n),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:n}}static fromJSON(e){return new Lu(e.radius,e.detail)}}class Lo extends ln{constructor(e=1,n=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:n,widthSegments:i,heightSegments:r};const s=e/2,a=n/2,o=Math.floor(i),c=Math.floor(r),l=o+1,h=c+1,f=e/o,u=n/c,m=[],_=[],S=[],p=[];for(let d=0;d<h;d++){const x=d*u-a;for(let y=0;y<l;y++){const E=y*f-s;_.push(E,-x,0),S.push(0,0,1),p.push(y/o),p.push(1-d/c)}}for(let d=0;d<c;d++)for(let x=0;x<o;x++){const y=x+l*d,E=x+l*(d+1),w=x+1+l*(d+1),A=x+1+l*d;m.push(y,E,A),m.push(E,w,A)}this.setIndex(m),this.setAttribute("position",new qt(_,3)),this.setAttribute("normal",new qt(S,3)),this.setAttribute("uv",new qt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Lo(e.width,e.height,e.widthSegments,e.heightSegments)}}class Iu extends ln{constructor(e=1,n=32,i=16,r=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:n,heightSegments:i,phiStart:r,phiLength:s,thetaStart:a,thetaLength:o},n=Math.max(3,Math.floor(n)),i=Math.max(2,Math.floor(i));const c=Math.min(a+o,Math.PI);let l=0;const h=[],f=new U,u=new U,m=[],_=[],S=[],p=[];for(let d=0;d<=i;d++){const x=[],y=d/i;let E=0;d===0&&a===0?E=.5/n:d===i&&c===Math.PI&&(E=-.5/n);for(let w=0;w<=n;w++){const A=w/n;f.x=-e*Math.cos(r+A*s)*Math.sin(a+y*o),f.y=e*Math.cos(a+y*o),f.z=e*Math.sin(r+A*s)*Math.sin(a+y*o),_.push(f.x,f.y,f.z),u.copy(f).normalize(),S.push(u.x,u.y,u.z),p.push(A+E,1-y),x.push(l++)}h.push(x)}for(let d=0;d<i;d++)for(let x=0;x<n;x++){const y=h[d][x+1],E=h[d][x],w=h[d+1][x],A=h[d+1][x+1];(d!==0||a>0)&&m.push(y,E,A),(d!==i-1||c<Math.PI)&&m.push(E,w,A)}this.setIndex(m),this.setAttribute("position",new qt(_,3)),this.setAttribute("normal",new qt(S,3)),this.setAttribute("uv",new qt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Iu(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Io extends ln{constructor(e=1,n=.4,i=12,r=48,s=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:n,radialSegments:i,tubularSegments:r,arc:s,thetaStart:a,thetaLength:o},i=Math.floor(i),r=Math.floor(r);const c=[],l=[],h=[],f=[],u=new U,m=new U,_=new U;for(let S=0;S<=i;S++){const p=a+S/i*o;for(let d=0;d<=r;d++){const x=d/r*s;m.x=(e+n*Math.cos(p))*Math.cos(x),m.y=(e+n*Math.cos(p))*Math.sin(x),m.z=n*Math.sin(p),l.push(m.x,m.y,m.z),u.x=e*Math.cos(x),u.y=e*Math.sin(x),_.subVectors(m,u).normalize(),h.push(_.x,_.y,_.z),f.push(d/r),f.push(S/i)}}for(let S=1;S<=i;S++)for(let p=1;p<=r;p++){const d=(r+1)*S+p-1,x=(r+1)*(S-1)+p-1,y=(r+1)*(S-1)+p,E=(r+1)*S+p;c.push(d,x,E),c.push(x,y,E)}this.setIndex(c),this.setAttribute("position",new qt(l,3)),this.setAttribute("normal",new qt(h,3)),this.setAttribute("uv",new qt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Io(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}function os(t){const e={};for(const n in t){e[n]={};for(const i in t[n]){const r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(Ne("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[n][i]=null):e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}function an(t){const e={};for(let n=0;n<t.length;n++){const i=os(t[n]);for(const r in i)e[r]=i[r]}return e}function o_(t){const e=[];for(let n=0;n<t.length;n++)e.push(t[n].clone());return e}function Tp(t){const e=t.getRenderTarget();return e===null?t.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}const c_={clone:os,merge:an};var l_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,u_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class hi extends Ss{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=l_,this.fragmentShader=u_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=os(e.uniforms),this.uniformsGroups=o_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const n=super.toJSON(e);n.glslVersion=this.glslVersion,n.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?n.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?n.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?n.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?n.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?n.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?n.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?n.uniforms[r]={type:"m4",value:a.toArray()}:n.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(n.defines=this.defines),n.vertexShader=this.vertexShader,n.fragmentShader=this.fragmentShader,n.lights=this.lights,n.clipping=this.clipping;const i={};for(const r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(n.extensions=i),n}}class h_ extends hi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class f_ extends Ss{constructor(e){super(),this.isMeshPhongMaterial=!0,this.type="MeshPhongMaterial",this.color=new We(16777215),this.specular=new We(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new We(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dp,this.normalScale=new Ye(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ui,this.combine=_u,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.specular.copy(e.specular),this.shininess=e.shininess,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class d_ extends Ss{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Tg,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class p_ extends Ss{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class bp extends cn{constructor(e,n=1){super(),this.isLight=!0,this.type="Light",this.color=new We(e),this.intensity=n}dispose(){this.dispatchEvent({type:"dispose"})}copy(e,n){return super.copy(e,n),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const n=super.toJSON(e);return n.object.color=this.color.getHex(),n.object.intensity=this.intensity,n}}const Nc=new St,ff=new U,df=new U;class m_{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ye(512,512),this.mapType=yn,this.map=null,this.mapPass=null,this.matrix=new St,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ru,this._frameExtents=new Ye(1,1),this._viewportCount=1,this._viewports=[new bt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const n=this.camera,i=this.matrix;ff.setFromMatrixPosition(e.matrixWorld),n.position.copy(ff),df.setFromMatrixPosition(e.target.matrixWorld),n.lookAt(df),n.updateMatrixWorld(),Nc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Nc,n.coordinateSystem,n.reversedDepth),n.coordinateSystem===sa||n.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Nc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const qa=new U,Ya=new Ms,Jn=new U;class Ap extends cn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new St,this.projectionMatrix=new St,this.projectionMatrixInverse=new St,this.coordinateSystem=ri,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,n){return super.copy(e,n),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(qa,Ya,Jn),Jn.x===1&&Jn.y===1&&Jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qa,Ya,Jn.set(1,1,1)).invert()}updateWorldMatrix(e,n){super.updateWorldMatrix(e,n),this.matrixWorld.decompose(qa,Ya,Jn),Jn.x===1&&Jn.y===1&&Jn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(qa,Ya,Jn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Xi=new U,pf=new Ye,mf=new Ye;class En extends Ap{constructor(e=50,n=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=n,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const n=.5*this.getFilmHeight()/e;this.fov=Yl*2*Math.atan(n),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(hc*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Yl*2*Math.atan(Math.tan(hc*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,n,i){Xi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Xi.x,Xi.y).multiplyScalar(-e/Xi.z),Xi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Xi.x,Xi.y).multiplyScalar(-e/Xi.z)}getViewSize(e,n){return this.getViewBounds(e,pf,mf),n.subVectors(mf,pf)}setViewOffset(e,n,i,r,s,a){this.aspect=e/n,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let n=e*Math.tan(hc*.5*this.fov)/this.zoom,i=2*n,r=this.aspect*i,s=-.5*r;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*r/c,n-=a.offsetY*i/l,r*=a.width/c,i*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,n,n-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.fov=this.fov,n.object.zoom=this.zoom,n.object.near=this.near,n.object.far=this.far,n.object.focus=this.focus,n.object.aspect=this.aspect,this.view!==null&&(n.object.view=Object.assign({},this.view)),n.object.filmGauge=this.filmGauge,n.object.filmOffset=this.filmOffset,n}}class g_ extends m_{constructor(){super(new En(90,1,.5,500)),this.isPointLightShadow=!0}}class Du extends bp{constructor(e,n,i=0,r=2){super(e,n),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=r,this.shadow=new g_}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,n){return super.copy(e,n),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const n=super.toJSON(e);return n.object.distance=this.distance,n.object.decay=this.decay,n.object.shadow=this.shadow.toJSON(),n}}class wp extends Ap{constructor(e=-1,n=1,i=1,r=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=n,this.top=i,this.bottom=r,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,n){return super.copy(e,n),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,n,i,r,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=n,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),n=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let s=i-e,a=i+e,o=r+n,c=r-n;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const n=super.toJSON(e);return n.object.zoom=this.zoom,n.object.left=this.left,n.object.right=this.right,n.object.top=this.top,n.object.bottom=this.bottom,n.object.near=this.near,n.object.far=this.far,this.view!==null&&(n.object.view=Object.assign({},this.view)),n}}class __ extends bp{constructor(e,n){super(e,n),this.isAmbientLight=!0,this.type="AmbientLight"}}const Xr=-90,qr=1;class v_ extends cn{constructor(e,n,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new En(Xr,qr,e,n);r.layers=this.layers,this.add(r);const s=new En(Xr,qr,e,n);s.layers=this.layers,this.add(s);const a=new En(Xr,qr,e,n);a.layers=this.layers,this.add(a);const o=new En(Xr,qr,e,n);o.layers=this.layers,this.add(o);const c=new En(Xr,qr,e,n);c.layers=this.layers,this.add(c);const l=new En(Xr,qr,e,n);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,n=this.children.concat(),[i,r,s,a,o,c]=n;for(const l of n)this.remove(l);if(e===ri)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===sa)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of n)this.add(l),l.updateMatrixWorld()}update(e,n){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,h]=this.children,f=e.getRenderTarget(),u=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const S=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(n,s),e.setRenderTarget(i,1,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(n,a),e.setRenderTarget(i,2,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(n,o),e.setRenderTarget(i,3,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(n,c),e.setRenderTarget(i,4,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(n,l),i.texture.generateMipmaps=S,e.setRenderTarget(i,5,r),p&&e.autoClear===!1&&e.clearDepth(),e.render(n,h),e.setRenderTarget(f,u,m),e.xr.enabled=_,i.texture.needsPMREMUpdate=!0}}class x_ extends En{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}function gf(t,e,n,i){const r=M_(i);switch(n){case up:return t*e;case fp:return t*e/r.components*r.byteLength;case Su:return t*e/r.components*r.byteLength;case ss:return t*e*2/r.components*r.byteLength;case Eu:return t*e*2/r.components*r.byteLength;case hp:return t*e*3/r.components*r.byteLength;case qn:return t*e*4/r.components*r.byteLength;case yu:return t*e*4/r.components*r.byteLength;case io:case ro:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case so:case ao:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case gl:case vl:return Math.max(t,16)*Math.max(e,8)/4;case ml:case _l:return Math.max(t,8)*Math.max(e,8)/2;case xl:case Ml:case El:case yl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*8;case Sl:case Tl:case bl:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case Al:return Math.floor((t+3)/4)*Math.floor((e+3)/4)*16;case wl:return Math.floor((t+4)/5)*Math.floor((e+3)/4)*16;case Rl:return Math.floor((t+4)/5)*Math.floor((e+4)/5)*16;case Cl:return Math.floor((t+5)/6)*Math.floor((e+4)/5)*16;case Pl:return Math.floor((t+5)/6)*Math.floor((e+5)/6)*16;case Ll:return Math.floor((t+7)/8)*Math.floor((e+4)/5)*16;case Il:return Math.floor((t+7)/8)*Math.floor((e+5)/6)*16;case Dl:return Math.floor((t+7)/8)*Math.floor((e+7)/8)*16;case Ul:return Math.floor((t+9)/10)*Math.floor((e+4)/5)*16;case Nl:return Math.floor((t+9)/10)*Math.floor((e+5)/6)*16;case Fl:return Math.floor((t+9)/10)*Math.floor((e+7)/8)*16;case Ol:return Math.floor((t+9)/10)*Math.floor((e+9)/10)*16;case Bl:return Math.floor((t+11)/12)*Math.floor((e+9)/10)*16;case kl:return Math.floor((t+11)/12)*Math.floor((e+11)/12)*16;case zl:case Vl:case Gl:return Math.ceil(t/4)*Math.ceil(e/4)*16;case Hl:case Wl:return Math.ceil(t/4)*Math.ceil(e/4)*8;case Xl:case ql:return Math.ceil(t/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${n} format.`)}function M_(t){switch(t){case yn:case ap:return{byteLength:1,components:1};case ia:case op:case Li:return{byteLength:2,components:1};case xu:case Mu:return{byteLength:2,components:4};case li:case vu:case ii:return{byteLength:4,components:1};case cp:case lp:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${t}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:gu}}));typeof window<"u"&&(window.__THREE__?Ne("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=gu);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Rp(){let t=null,e=!1,n=null,i=null;function r(s,a){n(s,a),i=t.requestAnimationFrame(r)}return{start:function(){e!==!0&&n!==null&&(i=t.requestAnimationFrame(r),e=!0)},stop:function(){t.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){n=s},setContext:function(s){t=s}}}function S_(t){const e=new WeakMap;function n(o,c){const l=o.array,h=o.usage,f=l.byteLength,u=t.createBuffer();t.bindBuffer(c,u),t.bufferData(c,l,h),o.onUploadCallback();let m;if(l instanceof Float32Array)m=t.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)m=t.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=t.HALF_FLOAT:m=t.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=t.SHORT;else if(l instanceof Uint32Array)m=t.UNSIGNED_INT;else if(l instanceof Int32Array)m=t.INT;else if(l instanceof Int8Array)m=t.BYTE;else if(l instanceof Uint8Array)m=t.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=t.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:f}}function i(o,c,l){const h=c.array,f=c.updateRanges;if(t.bindBuffer(l,o),f.length===0)t.bufferSubData(l,0,h);else{f.sort((m,_)=>m.start-_.start);let u=0;for(let m=1;m<f.length;m++){const _=f[u],S=f[m];S.start<=_.start+_.count+1?_.count=Math.max(_.count,S.start+S.count-_.start):(++u,f[u]=S)}f.length=u+1;for(let m=0,_=f.length;m<_;m++){const S=f[m];t.bufferSubData(l,S.start*h.BYTES_PER_ELEMENT,h,S.start,S.count)}c.clearUpdateRanges()}c.onUploadCallback()}function r(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(t.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,n(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(l.buffer,o,c),l.version=o.version}}return{get:r,remove:s,update:a}}var E_=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,y_=`#ifdef USE_ALPHAHASH
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
#endif`,T_=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,b_=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,A_=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,w_=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,R_=`#ifdef USE_AOMAP
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
#endif`,C_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,P_=`#ifdef USE_BATCHING
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
#endif`,L_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,I_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,D_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,U_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,N_=`#ifdef USE_IRIDESCENCE
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
#endif`,F_=`#ifdef USE_BUMPMAP
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
#endif`,O_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,B_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,k_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,z_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,V_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,G_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,H_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,W_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,X_=`#define PI 3.141592653589793
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
} // validated`,q_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Y_=`vec3 transformedNormal = objectNormal;
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
#endif`,j_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,K_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,$_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Z_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,J_="gl_FragColor = linearToOutputTexel( gl_FragColor );",Q_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,e1=`#ifdef USE_ENVMAP
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
#endif`,t1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,n1=`#ifdef USE_ENVMAP
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
#endif`,i1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,r1=`#ifdef USE_ENVMAP
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
#endif`,s1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,a1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,o1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,c1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,l1=`#ifdef USE_GRADIENTMAP
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
}`,u1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,h1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,f1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,d1=`uniform bool receiveShadow;
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
#endif`,p1=`#ifdef USE_ENVMAP
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
#endif`,m1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,g1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,v1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,x1=`PhysicalMaterial material;
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
#endif`,M1=`uniform sampler2D dfgLUT;
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
}`,S1=`
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
#endif`,E1=`#if defined( RE_IndirectDiffuse )
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
#endif`,y1=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,T1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,b1=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,A1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,w1=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,R1=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,C1=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,P1=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,L1=`#if defined( USE_POINTS_UV )
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
#endif`,I1=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,D1=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,U1=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,N1=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,F1=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,O1=`#ifdef USE_MORPHTARGETS
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
#endif`,B1=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,k1=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,z1=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,V1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,G1=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,H1=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,W1=`#ifdef USE_NORMALMAP
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
#endif`,X1=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,q1=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Y1=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,j1=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,K1=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,$1=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Z1=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,J1=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Q1=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,e2=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,t2=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,n2=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,i2=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,r2=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,s2=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,a2=`float getShadowMask() {
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
}`,o2=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,c2=`#ifdef USE_SKINNING
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
#endif`,l2=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,u2=`#ifdef USE_SKINNING
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
#endif`,h2=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,f2=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,d2=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,p2=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,m2=`#ifdef USE_TRANSMISSION
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
#endif`,g2=`#ifdef USE_TRANSMISSION
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
#endif`,_2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,v2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,x2=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,M2=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const S2=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,E2=`uniform sampler2D t2D;
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
}`,y2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,T2=`#ifdef ENVMAP_TYPE_CUBE
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
}`,b2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,A2=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,w2=`#include <common>
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
}`,R2=`#if DEPTH_PACKING == 3200
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
}`,C2=`#define DISTANCE
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
}`,P2=`#define DISTANCE
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
}`,L2=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,I2=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,D2=`uniform float scale;
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
}`,U2=`uniform vec3 diffuse;
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
}`,N2=`#include <common>
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
}`,F2=`uniform vec3 diffuse;
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
}`,O2=`#define LAMBERT
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
}`,B2=`#define LAMBERT
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
}`,k2=`#define MATCAP
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
}`,z2=`#define MATCAP
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
}`,V2=`#define NORMAL
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
}`,G2=`#define NORMAL
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
}`,H2=`#define PHONG
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
}`,W2=`#define PHONG
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
}`,X2=`#define STANDARD
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
}`,q2=`#define STANDARD
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
}`,Y2=`#define TOON
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
}`,j2=`#define TOON
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
}`,K2=`uniform float size;
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
}`,$2=`uniform vec3 diffuse;
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
}`,Z2=`#include <common>
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
}`,J2=`uniform vec3 color;
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
}`,Q2=`uniform float rotation;
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
}`,ev=`uniform vec3 diffuse;
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
}`,ze={alphahash_fragment:E_,alphahash_pars_fragment:y_,alphamap_fragment:T_,alphamap_pars_fragment:b_,alphatest_fragment:A_,alphatest_pars_fragment:w_,aomap_fragment:R_,aomap_pars_fragment:C_,batching_pars_vertex:P_,batching_vertex:L_,begin_vertex:I_,beginnormal_vertex:D_,bsdfs:U_,iridescence_fragment:N_,bumpmap_pars_fragment:F_,clipping_planes_fragment:O_,clipping_planes_pars_fragment:B_,clipping_planes_pars_vertex:k_,clipping_planes_vertex:z_,color_fragment:V_,color_pars_fragment:G_,color_pars_vertex:H_,color_vertex:W_,common:X_,cube_uv_reflection_fragment:q_,defaultnormal_vertex:Y_,displacementmap_pars_vertex:j_,displacementmap_vertex:K_,emissivemap_fragment:$_,emissivemap_pars_fragment:Z_,colorspace_fragment:J_,colorspace_pars_fragment:Q_,envmap_fragment:e1,envmap_common_pars_fragment:t1,envmap_pars_fragment:n1,envmap_pars_vertex:i1,envmap_physical_pars_fragment:p1,envmap_vertex:r1,fog_vertex:s1,fog_pars_vertex:a1,fog_fragment:o1,fog_pars_fragment:c1,gradientmap_pars_fragment:l1,lightmap_pars_fragment:u1,lights_lambert_fragment:h1,lights_lambert_pars_fragment:f1,lights_pars_begin:d1,lights_toon_fragment:m1,lights_toon_pars_fragment:g1,lights_phong_fragment:_1,lights_phong_pars_fragment:v1,lights_physical_fragment:x1,lights_physical_pars_fragment:M1,lights_fragment_begin:S1,lights_fragment_maps:E1,lights_fragment_end:y1,logdepthbuf_fragment:T1,logdepthbuf_pars_fragment:b1,logdepthbuf_pars_vertex:A1,logdepthbuf_vertex:w1,map_fragment:R1,map_pars_fragment:C1,map_particle_fragment:P1,map_particle_pars_fragment:L1,metalnessmap_fragment:I1,metalnessmap_pars_fragment:D1,morphinstance_vertex:U1,morphcolor_vertex:N1,morphnormal_vertex:F1,morphtarget_pars_vertex:O1,morphtarget_vertex:B1,normal_fragment_begin:k1,normal_fragment_maps:z1,normal_pars_fragment:V1,normal_pars_vertex:G1,normal_vertex:H1,normalmap_pars_fragment:W1,clearcoat_normal_fragment_begin:X1,clearcoat_normal_fragment_maps:q1,clearcoat_pars_fragment:Y1,iridescence_pars_fragment:j1,opaque_fragment:K1,packing:$1,premultiplied_alpha_fragment:Z1,project_vertex:J1,dithering_fragment:Q1,dithering_pars_fragment:e2,roughnessmap_fragment:t2,roughnessmap_pars_fragment:n2,shadowmap_pars_fragment:i2,shadowmap_pars_vertex:r2,shadowmap_vertex:s2,shadowmask_pars_fragment:a2,skinbase_vertex:o2,skinning_pars_vertex:c2,skinning_vertex:l2,skinnormal_vertex:u2,specularmap_fragment:h2,specularmap_pars_fragment:f2,tonemapping_fragment:d2,tonemapping_pars_fragment:p2,transmission_fragment:m2,transmission_pars_fragment:g2,uv_pars_fragment:_2,uv_pars_vertex:v2,uv_vertex:x2,worldpos_vertex:M2,background_vert:S2,background_frag:E2,backgroundCube_vert:y2,backgroundCube_frag:T2,cube_vert:b2,cube_frag:A2,depth_vert:w2,depth_frag:R2,distance_vert:C2,distance_frag:P2,equirect_vert:L2,equirect_frag:I2,linedashed_vert:D2,linedashed_frag:U2,meshbasic_vert:N2,meshbasic_frag:F2,meshlambert_vert:O2,meshlambert_frag:B2,meshmatcap_vert:k2,meshmatcap_frag:z2,meshnormal_vert:V2,meshnormal_frag:G2,meshphong_vert:H2,meshphong_frag:W2,meshphysical_vert:X2,meshphysical_frag:q2,meshtoon_vert:Y2,meshtoon_frag:j2,points_vert:K2,points_frag:$2,shadow_vert:Z2,shadow_frag:J2,sprite_vert:Q2,sprite_frag:ev},ae={common:{diffuse:{value:new We(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Be}},envmap:{envMap:{value:null},envMapRotation:{value:new Be},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Be}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Be}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Be},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Be},normalScale:{value:new Ye(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Be},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Be}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Be}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Be}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new We(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new We(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0},uvTransform:{value:new Be}},sprite:{diffuse:{value:new We(16777215)},opacity:{value:1},center:{value:new Ye(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Be},alphaMap:{value:null},alphaMapTransform:{value:new Be},alphaTest:{value:0}}},ni={basic:{uniforms:an([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.fog]),vertexShader:ze.meshbasic_vert,fragmentShader:ze.meshbasic_frag},lambert:{uniforms:an([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new We(0)},envMapIntensity:{value:1}}]),vertexShader:ze.meshlambert_vert,fragmentShader:ze.meshlambert_frag},phong:{uniforms:an([ae.common,ae.specularmap,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,ae.lights,{emissive:{value:new We(0)},specular:{value:new We(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ze.meshphong_vert,fragmentShader:ze.meshphong_frag},standard:{uniforms:an([ae.common,ae.envmap,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.roughnessmap,ae.metalnessmap,ae.fog,ae.lights,{emissive:{value:new We(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag},toon:{uniforms:an([ae.common,ae.aomap,ae.lightmap,ae.emissivemap,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.gradientmap,ae.fog,ae.lights,{emissive:{value:new We(0)}}]),vertexShader:ze.meshtoon_vert,fragmentShader:ze.meshtoon_frag},matcap:{uniforms:an([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,ae.fog,{matcap:{value:null}}]),vertexShader:ze.meshmatcap_vert,fragmentShader:ze.meshmatcap_frag},points:{uniforms:an([ae.points,ae.fog]),vertexShader:ze.points_vert,fragmentShader:ze.points_frag},dashed:{uniforms:an([ae.common,ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ze.linedashed_vert,fragmentShader:ze.linedashed_frag},depth:{uniforms:an([ae.common,ae.displacementmap]),vertexShader:ze.depth_vert,fragmentShader:ze.depth_frag},normal:{uniforms:an([ae.common,ae.bumpmap,ae.normalmap,ae.displacementmap,{opacity:{value:1}}]),vertexShader:ze.meshnormal_vert,fragmentShader:ze.meshnormal_frag},sprite:{uniforms:an([ae.sprite,ae.fog]),vertexShader:ze.sprite_vert,fragmentShader:ze.sprite_frag},background:{uniforms:{uvTransform:{value:new Be},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ze.background_vert,fragmentShader:ze.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Be}},vertexShader:ze.backgroundCube_vert,fragmentShader:ze.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ze.cube_vert,fragmentShader:ze.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ze.equirect_vert,fragmentShader:ze.equirect_frag},distance:{uniforms:an([ae.common,ae.displacementmap,{referencePosition:{value:new U},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ze.distance_vert,fragmentShader:ze.distance_frag},shadow:{uniforms:an([ae.lights,ae.fog,{color:{value:new We(0)},opacity:{value:1}}]),vertexShader:ze.shadow_vert,fragmentShader:ze.shadow_frag}};ni.physical={uniforms:an([ni.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Be},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Be},clearcoatNormalScale:{value:new Ye(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Be},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Be},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Be},sheen:{value:0},sheenColor:{value:new We(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Be},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Be},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Be},transmissionSamplerSize:{value:new Ye},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Be},attenuationDistance:{value:0},attenuationColor:{value:new We(0)},specularColor:{value:new We(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Be},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Be},anisotropyVector:{value:new Ye},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Be}}]),vertexShader:ze.meshphysical_vert,fragmentShader:ze.meshphysical_frag};const ja={r:0,b:0,g:0},lr=new ui,tv=new St;function nv(t,e,n,i,r,s){const a=new We(0);let o=r===!0?0:1,c,l,h=null,f=0,u=null;function m(x){let y=x.isScene===!0?x.background:null;if(y&&y.isTexture){const E=x.backgroundBlurriness>0;y=e.get(y,E)}return y}function _(x){let y=!1;const E=m(x);E===null?p(a,o):E&&E.isColor&&(p(E,1),y=!0);const w=t.xr.getEnvironmentBlendMode();w==="additive"?n.buffers.color.setClear(0,0,0,1,s):w==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,s),(t.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil))}function S(x,y){const E=m(y);E&&(E.isCubeTexture||E.mapping===Co)?(l===void 0&&(l=new pn(new pa(1,1,1),new hi({name:"BackgroundCubeMaterial",uniforms:os(ni.backgroundCube.uniforms),vertexShader:ni.backgroundCube.vertexShader,fragmentShader:ni.backgroundCube.fragmentShader,side:dn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(w,A,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(l)),lr.copy(y.backgroundRotation),lr.x*=-1,lr.y*=-1,lr.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(lr.y*=-1,lr.z*=-1),l.material.uniforms.envMap.value=E,l.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,l.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(tv.makeRotationFromEuler(lr)),l.material.toneMapped=Ke.getTransfer(E.colorSpace)!==rt,(h!==E||f!==E.version||u!==t.toneMapping)&&(l.material.needsUpdate=!0,h=E,f=E.version,u=t.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new pn(new Lo(2,2),new hi({name:"BackgroundMaterial",uniforms:os(ni.background.uniforms),vertexShader:ni.background.vertexShader,fragmentShader:ni.background.fragmentShader,side:Qi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=Ke.getTransfer(E.colorSpace)!==rt,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(h!==E||f!==E.version||u!==t.toneMapping)&&(c.material.needsUpdate=!0,h=E,f=E.version,u=t.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function p(x,y){x.getRGB(ja,Tp(t)),n.buffers.color.setClear(ja.r,ja.g,ja.b,y,s)}function d(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,y=1){a.set(x),o=y,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,p(a,o)},render:_,addToRenderList:S,dispose:d}}function iv(t,e){const n=t.getParameter(t.MAX_VERTEX_ATTRIBS),i={},r=u(null);let s=r,a=!1;function o(R,B,z,q,k){let G=!1;const N=f(R,q,z,B);s!==N&&(s=N,l(s.object)),G=m(R,q,z,k),G&&_(R,q,z,k),k!==null&&e.update(k,t.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,E(R,B,z,q),k!==null&&t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function c(){return t.createVertexArray()}function l(R){return t.bindVertexArray(R)}function h(R){return t.deleteVertexArray(R)}function f(R,B,z,q){const k=q.wireframe===!0;let G=i[B.id];G===void 0&&(G={},i[B.id]=G);const N=R.isInstancedMesh===!0?R.id:0;let Q=G[N];Q===void 0&&(Q={},G[N]=Q);let $=Q[z.id];$===void 0&&($={},Q[z.id]=$);let le=$[k];return le===void 0&&(le=u(c()),$[k]=le),le}function u(R){const B=[],z=[],q=[];for(let k=0;k<n;k++)B[k]=0,z[k]=0,q[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:B,enabledAttributes:z,attributeDivisors:q,object:R,attributes:{},index:null}}function m(R,B,z,q){const k=s.attributes,G=B.attributes;let N=0;const Q=z.getAttributes();for(const $ in Q)if(Q[$].location>=0){const me=k[$];let he=G[$];if(he===void 0&&($==="instanceMatrix"&&R.instanceMatrix&&(he=R.instanceMatrix),$==="instanceColor"&&R.instanceColor&&(he=R.instanceColor)),me===void 0||me.attribute!==he||he&&me.data!==he.data)return!0;N++}return s.attributesNum!==N||s.index!==q}function _(R,B,z,q){const k={},G=B.attributes;let N=0;const Q=z.getAttributes();for(const $ in Q)if(Q[$].location>=0){let me=G[$];me===void 0&&($==="instanceMatrix"&&R.instanceMatrix&&(me=R.instanceMatrix),$==="instanceColor"&&R.instanceColor&&(me=R.instanceColor));const he={};he.attribute=me,me&&me.data&&(he.data=me.data),k[$]=he,N++}s.attributes=k,s.attributesNum=N,s.index=q}function S(){const R=s.newAttributes;for(let B=0,z=R.length;B<z;B++)R[B]=0}function p(R){d(R,0)}function d(R,B){const z=s.newAttributes,q=s.enabledAttributes,k=s.attributeDivisors;z[R]=1,q[R]===0&&(t.enableVertexAttribArray(R),q[R]=1),k[R]!==B&&(t.vertexAttribDivisor(R,B),k[R]=B)}function x(){const R=s.newAttributes,B=s.enabledAttributes;for(let z=0,q=B.length;z<q;z++)B[z]!==R[z]&&(t.disableVertexAttribArray(z),B[z]=0)}function y(R,B,z,q,k,G,N){N===!0?t.vertexAttribIPointer(R,B,z,k,G):t.vertexAttribPointer(R,B,z,q,k,G)}function E(R,B,z,q){S();const k=q.attributes,G=z.getAttributes(),N=B.defaultAttributeValues;for(const Q in G){const $=G[Q];if($.location>=0){let le=k[Q];if(le===void 0&&(Q==="instanceMatrix"&&R.instanceMatrix&&(le=R.instanceMatrix),Q==="instanceColor"&&R.instanceColor&&(le=R.instanceColor)),le!==void 0){const me=le.normalized,he=le.itemSize,ke=e.get(le);if(ke===void 0)continue;const pt=ke.buffer,dt=ke.type,j=ke.bytesPerElement,ne=dt===t.INT||dt===t.UNSIGNED_INT||le.gpuType===vu;if(le.isInterleavedBufferAttribute){const se=le.data,Oe=se.stride,Le=le.offset;if(se.isInstancedInterleavedBuffer){for(let De=0;De<$.locationSize;De++)d($.location+De,se.meshPerAttribute);R.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=se.meshPerAttribute*se.count)}else for(let De=0;De<$.locationSize;De++)p($.location+De);t.bindBuffer(t.ARRAY_BUFFER,pt);for(let De=0;De<$.locationSize;De++)y($.location+De,he/$.locationSize,dt,me,Oe*j,(Le+he/$.locationSize*De)*j,ne)}else{if(le.isInstancedBufferAttribute){for(let se=0;se<$.locationSize;se++)d($.location+se,le.meshPerAttribute);R.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let se=0;se<$.locationSize;se++)p($.location+se);t.bindBuffer(t.ARRAY_BUFFER,pt);for(let se=0;se<$.locationSize;se++)y($.location+se,he/$.locationSize,dt,me,he*j,he/$.locationSize*se*j,ne)}}else if(N!==void 0){const me=N[Q];if(me!==void 0)switch(me.length){case 2:t.vertexAttrib2fv($.location,me);break;case 3:t.vertexAttrib3fv($.location,me);break;case 4:t.vertexAttrib4fv($.location,me);break;default:t.vertexAttrib1fv($.location,me)}}}}x()}function w(){T();for(const R in i){const B=i[R];for(const z in B){const q=B[z];for(const k in q){const G=q[k];for(const N in G)h(G[N].object),delete G[N];delete q[k]}}delete i[R]}}function A(R){if(i[R.id]===void 0)return;const B=i[R.id];for(const z in B){const q=B[z];for(const k in q){const G=q[k];for(const N in G)h(G[N].object),delete G[N];delete q[k]}}delete i[R.id]}function P(R){for(const B in i){const z=i[B];for(const q in z){const k=z[q];if(k[R.id]===void 0)continue;const G=k[R.id];for(const N in G)h(G[N].object),delete G[N];delete k[R.id]}}}function v(R){for(const B in i){const z=i[B],q=R.isInstancedMesh===!0?R.id:0,k=z[q];if(k!==void 0){for(const G in k){const N=k[G];for(const Q in N)h(N[Q].object),delete N[Q];delete k[G]}delete z[q],Object.keys(z).length===0&&delete i[B]}}}function T(){H(),a=!0,s!==r&&(s=r,l(s.object))}function H(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:o,reset:T,resetDefaultState:H,dispose:w,releaseStatesOfGeometry:A,releaseStatesOfObject:v,releaseStatesOfProgram:P,initAttributes:S,enableAttribute:p,disableUnusedAttributes:x}}function rv(t,e,n){let i;function r(l){i=l}function s(l,h){t.drawArrays(i,l,h),n.update(h,i,1)}function a(l,h,f){f!==0&&(t.drawArraysInstanced(i,l,h,f),n.update(h,i,f))}function o(l,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,h,0,f);let m=0;for(let _=0;_<f;_++)m+=h[_];n.update(m,i,1)}function c(l,h,f,u){if(f===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<l.length;_++)a(l[_],h[_],u[_]);else{m.multiDrawArraysInstancedWEBGL(i,l,0,h,0,u,0,f);let _=0;for(let S=0;S<f;S++)_+=h[S]*u[S];n.update(_,i,1)}}this.setMode=r,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function sv(t,e,n,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const P=e.get("EXT_texture_filter_anisotropic");r=t.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function a(P){return!(P!==qn&&i.convert(P)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const v=P===Li&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==yn&&i.convert(P)!==t.getParameter(t.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==ii&&!v)}function c(P){if(P==="highp"){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=n.precision!==void 0?n.precision:"highp";const h=c(l);h!==l&&(Ne("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const f=n.logarithmicDepthBuffer===!0,u=n.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),m=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),_=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),S=t.getParameter(t.MAX_TEXTURE_SIZE),p=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),d=t.getParameter(t.MAX_VERTEX_ATTRIBS),x=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),y=t.getParameter(t.MAX_VARYING_VECTORS),E=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),w=t.getParameter(t.MAX_SAMPLES),A=t.getParameter(t.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:f,reversedDepthBuffer:u,maxTextures:m,maxVertexTextures:_,maxTextureSize:S,maxCubemapSize:p,maxAttributes:d,maxVertexUniforms:x,maxVaryings:y,maxFragmentUniforms:E,maxSamples:w,samples:A}}function av(t){const e=this;let n=null,i=0,r=!1,s=!1;const a=new dr,o=new Be,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const m=f.length!==0||u||i!==0||r;return r=u,i=f.length,m},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(f,u){n=h(f,u,0)},this.setState=function(f,u,m){const _=f.clippingPlanes,S=f.clipIntersection,p=f.clipShadows,d=t.get(f);if(!r||_===null||_.length===0||s&&!p)s?h(null):l();else{const x=s?0:i,y=x*4;let E=d.clippingState||null;c.value=E,E=h(_,u,y,m);for(let w=0;w!==y;++w)E[w]=n[w];d.clippingState=E,this.numIntersection=S?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(f,u,m,_){const S=f!==null?f.length:0;let p=null;if(S!==0){if(p=c.value,_!==!0||p===null){const d=m+S*4,x=u.matrixWorldInverse;o.getNormalMatrix(x),(p===null||p.length<d)&&(p=new Float32Array(d));for(let y=0,E=m;y!==S;++y,E+=4)a.copy(f[y]).applyMatrix4(x,o),a.normal.toArray(p,E),p[E+3]=a.constant}c.value=p,c.needsUpdate=!0}return e.numPlanes=S,e.numIntersection=0,p}}const Zi=4,_f=[.125,.215,.35,.446,.526,.582],mr=20,ov=256,Gs=new wp,vf=new We;let Fc=null,Oc=0,Bc=0,kc=!1;const cv=new U;class xf{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,n=0,i=.1,r=100,s={}){const{size:a=256,position:o=cv}=s;Fc=this._renderer.getRenderTarget(),Oc=this._renderer.getActiveCubeFace(),Bc=this._renderer.getActiveMipmapLevel(),kc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,i,r,c,o),n>0&&this._blur(c,0,0,n),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,n=null){return this._fromTexture(e,n)}fromCubemap(e,n=null){return this._fromTexture(e,n)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ef(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Fc,Oc,Bc),this._renderer.xr.enabled=kc,e.scissorTest=!1,Yr(e,0,0,e.width,e.height)}_fromTexture(e,n){e.mapping===br||e.mapping===rs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Fc=this._renderer.getRenderTarget(),Oc=this._renderer.getActiveCubeFace(),Bc=this._renderer.getActiveMipmapLevel(),kc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=n||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),n=4*this._cubeSize,i={magFilter:en,minFilter:en,generateMipmaps:!1,type:Li,format:qn,colorSpace:as,depthBuffer:!1},r=Mf(e,n,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==n){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Mf(e,n,i);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=lv(s)),this._blurMaterial=hv(s,e,n),this._ggxMaterial=uv(s,e,n)}return r}_compileMaterial(e){const n=new pn(new ln,e);this._renderer.compile(n,Gs)}_sceneToCubeUV(e,n,i,r,s){const c=new En(90,1,n,i),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],f=this._renderer,u=f.autoClear,m=f.toneMapping;f.getClearColor(vf),f.toneMapping=ai,f.autoClear=!1,f.state.buffers.depth.getReversed()&&(f.setRenderTarget(r),f.clearDepth(),f.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new pn(new pa,new Es({name:"PMREM.Background",side:dn,depthWrite:!1,depthTest:!1})));const S=this._backgroundBox,p=S.material;let d=!1;const x=e.background;x?x.isColor&&(p.color.copy(x),e.background=null,d=!0):(p.color.copy(vf),d=!0);for(let y=0;y<6;y++){const E=y%3;E===0?(c.up.set(0,l[y],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[y],s.y,s.z)):E===1?(c.up.set(0,0,l[y]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[y],s.z)):(c.up.set(0,l[y],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[y]));const w=this._cubeSize;Yr(r,E*w,y>2?w:0,w,w),f.setRenderTarget(r),d&&f.render(S,c),f.render(e,c)}f.toneMapping=m,f.autoClear=u,e.background=x}_textureToCubeUV(e,n){const i=this._renderer,r=e.mapping===br||e.mapping===rs;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ef()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sf());const s=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;Yr(n,0,0,3*c,2*c),i.setRenderTarget(n),i.render(a,Gs)}_applyPMREM(e){const n=this._renderer,i=n.autoClear;n.autoClear=!1;const r=this._lodMeshes.length;for(let s=1;s<r;s++)this._applyGGXFilter(e,s-1,s);n.autoClear=i}_applyGGXFilter(e,n,i){const r=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;const c=a.uniforms,l=i/(this._lodMeshes.length-1),h=n/(this._lodMeshes.length-1),f=Math.sqrt(l*l-h*h),u=0+l*1.25,m=f*u,{_lodMax:_}=this,S=this._sizeLods[i],p=3*S*(i>_-Zi?i-_+Zi:0),d=4*(this._cubeSize-S);c.envMap.value=e.texture,c.roughness.value=m,c.mipInt.value=_-n,Yr(s,p,d,3*S,2*S),r.setRenderTarget(s),r.render(o,Gs),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=_-i,Yr(e,p,d,3*S,2*S),r.setRenderTarget(e),r.render(o,Gs)}_blur(e,n,i,r,s){const a=this._pingPongRenderTarget;this._halfBlur(e,a,n,i,r,"latitudinal",s),this._halfBlur(a,e,i,i,r,"longitudinal",s)}_halfBlur(e,n,i,r,s,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&Je("blur direction must be either latitudinal or longitudinal!");const h=3,f=this._lodMeshes[r];f.material=l;const u=l.uniforms,m=this._sizeLods[i]-1,_=isFinite(s)?Math.PI/(2*m):2*Math.PI/(2*mr-1),S=s/_,p=isFinite(s)?1+Math.floor(h*S):mr;p>mr&&Ne(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${mr}`);const d=[];let x=0;for(let P=0;P<mr;++P){const v=P/S,T=Math.exp(-v*v/2);d.push(T),P===0?x+=T:P<p&&(x+=2*T)}for(let P=0;P<d.length;P++)d[P]=d[P]/x;u.envMap.value=e.texture,u.samples.value=p,u.weights.value=d,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:y}=this;u.dTheta.value=_,u.mipInt.value=y-i;const E=this._sizeLods[r],w=3*E*(r>y-Zi?r-y+Zi:0),A=4*(this._cubeSize-E);Yr(n,w,A,3*E,2*E),c.setRenderTarget(n),c.render(f,Gs)}}function lv(t){const e=[],n=[],i=[];let r=t;const s=t-Zi+1+_f.length;for(let a=0;a<s;a++){const o=Math.pow(2,r);e.push(o);let c=1/o;a>t-Zi?c=_f[a-t+Zi-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,f=1+l,u=[h,h,f,h,f,f,h,h,f,f,h,f],m=6,_=6,S=3,p=2,d=1,x=new Float32Array(S*_*m),y=new Float32Array(p*_*m),E=new Float32Array(d*_*m);for(let A=0;A<m;A++){const P=A%3*2/3-1,v=A>2?0:-1,T=[P,v,0,P+2/3,v,0,P+2/3,v+1,0,P,v,0,P+2/3,v+1,0,P,v+1,0];x.set(T,S*_*A),y.set(u,p*_*A);const H=[A,A,A,A,A,A];E.set(H,d*_*A)}const w=new ln;w.setAttribute("position",new Tn(x,S)),w.setAttribute("uv",new Tn(y,p)),w.setAttribute("faceIndex",new Tn(E,d)),i.push(new pn(w,null)),r>Zi&&r--}return{lodMeshes:i,sizeLods:e,sigmas:n}}function Mf(t,e,n){const i=new oi(t,e,n);return i.texture.mapping=Co,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Yr(t,e,n,i,r){t.viewport.set(e,n,i,r),t.scissor.set(e,n,i,r)}function uv(t,e,n){return new hi({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ov,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Do(),fragmentShader:`

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
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function hv(t,e,n){const i=new Float32Array(mr),r=new U(0,1,0);return new hi({name:"SphericalGaussianBlur",defines:{n:mr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${t}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Do(),fragmentShader:`

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
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Sf(){return new hi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Do(),fragmentShader:`

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
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Ef(){return new hi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Do(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Do(){return`

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
	`}class Cp extends oi{constructor(e=1,n={}){super(e,e,n),this.isWebGLCubeRenderTarget=!0;const i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Ep(r),this._setTextureOptions(n),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,n){this.texture.type=n.type,this.texture.colorSpace=n.colorSpace,this.texture.generateMipmaps=n.generateMipmaps,this.texture.minFilter=n.minFilter,this.texture.magFilter=n.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new pa(5,5,5),s=new hi({name:"CubemapFromEquirect",uniforms:os(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:dn,blending:Ci});s.uniforms.tEquirect.value=n;const a=new pn(r,s),o=n.minFilter;return n.minFilter===gr&&(n.minFilter=en),new v_(1,10,this).update(e,a),n.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,n=!0,i=!0,r=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(n,i,r);e.setRenderTarget(s)}}function fv(t){let e=new WeakMap,n=new WeakMap,i=null;function r(u,m=!1){return u==null?null:m?a(u):s(u)}function s(u){if(u&&u.isTexture){const m=u.mapping;if(m===cc||m===lc)if(e.has(u)){const _=e.get(u).texture;return o(_,u.mapping)}else{const _=u.image;if(_&&_.height>0){const S=new Cp(_.height);return S.fromEquirectangularTexture(t,u),e.set(u,S),u.addEventListener("dispose",l),o(S.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const m=u.mapping,_=m===cc||m===lc,S=m===br||m===rs;if(_||S){let p=n.get(u);const d=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==d)return i===null&&(i=new xf(t)),p=_?i.fromEquirectangular(u,p):i.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,n.set(u,p),p.texture;if(p!==void 0)return p.texture;{const x=u.image;return _&&x&&x.height>0||S&&x&&c(x)?(i===null&&(i=new xf(t)),p=_?i.fromEquirectangular(u):i.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,n.set(u,p),u.addEventListener("dispose",h),p.texture):null}}}return u}function o(u,m){return m===cc?u.mapping=br:m===lc&&(u.mapping=rs),u}function c(u){let m=0;const _=6;for(let S=0;S<_;S++)u[S]!==void 0&&m++;return m===_}function l(u){const m=u.target;m.removeEventListener("dispose",l);const _=e.get(m);_!==void 0&&(e.delete(m),_.dispose())}function h(u){const m=u.target;m.removeEventListener("dispose",h);const _=n.get(m);_!==void 0&&(n.delete(m),_.dispose())}function f(){e=new WeakMap,n=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:r,dispose:f}}function dv(t){const e={};function n(i){if(e[i]!==void 0)return e[i];const r=t.getExtension(i);return e[i]=r,r}return{has:function(i){return n(i)!==null},init:function(){n("EXT_color_buffer_float"),n("WEBGL_clip_cull_distance"),n("OES_texture_float_linear"),n("EXT_color_buffer_half_float"),n("WEBGL_multisampled_render_to_texture"),n("WEBGL_render_shared_exponent")},get:function(i){const r=n(i);return r===null&&go("WebGLRenderer: "+i+" extension not supported."),r}}}function pv(t,e,n,i){const r={},s=new WeakMap;function a(f){const u=f.target;u.index!==null&&e.remove(u.index);for(const _ in u.attributes)e.remove(u.attributes[_]);u.removeEventListener("dispose",a),delete r[u.id];const m=s.get(u);m&&(e.remove(m),s.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,n.memory.geometries--}function o(f,u){return r[u.id]===!0||(u.addEventListener("dispose",a),r[u.id]=!0,n.memory.geometries++),u}function c(f){const u=f.attributes;for(const m in u)e.update(u[m],t.ARRAY_BUFFER)}function l(f){const u=[],m=f.index,_=f.attributes.position;let S=0;if(_===void 0)return;if(m!==null){const x=m.array;S=m.version;for(let y=0,E=x.length;y<E;y+=3){const w=x[y+0],A=x[y+1],P=x[y+2];u.push(w,A,A,P,P,w)}}else{const x=_.array;S=_.version;for(let y=0,E=x.length/3-1;y<E;y+=3){const w=y+0,A=y+1,P=y+2;u.push(w,A,A,P,P,w)}}const p=new(_.count>=65535?xp:vp)(u,1);p.version=S;const d=s.get(f);d&&e.remove(d),s.set(f,p)}function h(f){const u=s.get(f);if(u){const m=f.index;m!==null&&u.version<m.version&&l(f)}else l(f);return s.get(f)}return{get:o,update:c,getWireframeAttribute:h}}function mv(t,e,n){let i;function r(u){i=u}let s,a;function o(u){s=u.type,a=u.bytesPerElement}function c(u,m){t.drawElements(i,m,s,u*a),n.update(m,i,1)}function l(u,m,_){_!==0&&(t.drawElementsInstanced(i,m,s,u*a,_),n.update(m,i,_))}function h(u,m,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,m,0,s,u,0,_);let p=0;for(let d=0;d<_;d++)p+=m[d];n.update(p,i,1)}function f(u,m,_,S){if(_===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let d=0;d<u.length;d++)l(u[d]/a,m[d],S[d]);else{p.multiDrawElementsInstancedWEBGL(i,m,0,s,u,0,S,0,_);let d=0;for(let x=0;x<_;x++)d+=m[x]*S[x];n.update(d,i,1)}}this.setMode=r,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=f}function gv(t){const e={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(n.calls++,a){case t.TRIANGLES:n.triangles+=o*(s/3);break;case t.LINES:n.lines+=o*(s/2);break;case t.LINE_STRIP:n.lines+=o*(s-1);break;case t.LINE_LOOP:n.lines+=o*s;break;case t.POINTS:n.points+=o*s;break;default:Je("WebGLInfo: Unknown draw mode:",a);break}}function r(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:e,render:n,programs:null,autoReset:!0,reset:r,update:i}}function _v(t,e,n){const i=new WeakMap,r=new bt;function s(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0;let u=i.get(o);if(u===void 0||u.count!==f){let H=function(){v.dispose(),i.delete(o),o.removeEventListener("dispose",H)};var m=H;u!==void 0&&u.texture.dispose();const _=o.morphAttributes.position!==void 0,S=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,d=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],y=o.morphAttributes.color||[];let E=0;_===!0&&(E=1),S===!0&&(E=2),p===!0&&(E=3);let w=o.attributes.position.count*E,A=1;w>e.maxTextureSize&&(A=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const P=new Float32Array(w*A*4*f),v=new mp(P,w,A,f);v.type=ii,v.needsUpdate=!0;const T=E*4;for(let R=0;R<f;R++){const B=d[R],z=x[R],q=y[R],k=w*A*4*R;for(let G=0;G<B.count;G++){const N=G*T;_===!0&&(r.fromBufferAttribute(B,G),P[k+N+0]=r.x,P[k+N+1]=r.y,P[k+N+2]=r.z,P[k+N+3]=0),S===!0&&(r.fromBufferAttribute(z,G),P[k+N+4]=r.x,P[k+N+5]=r.y,P[k+N+6]=r.z,P[k+N+7]=0),p===!0&&(r.fromBufferAttribute(q,G),P[k+N+8]=r.x,P[k+N+9]=r.y,P[k+N+10]=r.z,P[k+N+11]=q.itemSize===4?r.w:1)}}u={count:f,texture:v,size:new Ye(w,A)},i.set(o,u),o.addEventListener("dispose",H)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(t,"morphTexture",a.morphTexture,n);else{let _=0;for(let p=0;p<l.length;p++)_+=l[p];const S=o.morphTargetsRelative?1:1-_;c.getUniforms().setValue(t,"morphTargetBaseInfluence",S),c.getUniforms().setValue(t,"morphTargetInfluences",l)}c.getUniforms().setValue(t,"morphTargetsTexture",u.texture,n),c.getUniforms().setValue(t,"morphTargetsTextureSize",u.size)}return{update:s}}function vv(t,e,n,i,r){let s=new WeakMap;function a(l){const h=r.render.frame,f=l.geometry,u=e.get(l,f);if(s.get(u)!==h&&(e.update(u),s.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==h&&(n.update(l.instanceMatrix,t.ARRAY_BUFFER),l.instanceColor!==null&&n.update(l.instanceColor,t.ARRAY_BUFFER),s.set(l,h))),l.isSkinnedMesh){const m=l.skeleton;s.get(m)!==h&&(m.update(),s.set(m,h))}return u}function o(){s=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),i.releaseStatesOfObject(h),n.remove(h.instanceMatrix),h.instanceColor!==null&&n.remove(h.instanceColor)}return{update:a,dispose:o}}const xv={[Jd]:"LINEAR_TONE_MAPPING",[Qd]:"REINHARD_TONE_MAPPING",[ep]:"CINEON_TONE_MAPPING",[tp]:"ACES_FILMIC_TONE_MAPPING",[ip]:"AGX_TONE_MAPPING",[rp]:"NEUTRAL_TONE_MAPPING",[np]:"CUSTOM_TONE_MAPPING"};function Mv(t,e,n,i,r){const s=new oi(e,n,{type:t,depthBuffer:i,stencilBuffer:r}),a=new oi(e,n,{type:Li,depthBuffer:!1,stencilBuffer:!1}),o=new ln;o.setAttribute("position",new qt([-1,3,0,-1,-1,0,3,-1,0],3)),o.setAttribute("uv",new qt([0,2,0,0,2,0],2));const c=new h_({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),l=new pn(o,c),h=new wp(-1,1,1,-1,0,1);let f=null,u=null,m=!1,_,S=null,p=[],d=!1;this.setSize=function(x,y){s.setSize(x,y),a.setSize(x,y);for(let E=0;E<p.length;E++){const w=p[E];w.setSize&&w.setSize(x,y)}},this.setEffects=function(x){p=x,d=p.length>0&&p[0].isRenderPass===!0;const y=s.width,E=s.height;for(let w=0;w<p.length;w++){const A=p[w];A.setSize&&A.setSize(y,E)}},this.begin=function(x,y){if(m||x.toneMapping===ai&&p.length===0)return!1;if(S=y,y!==null){const E=y.width,w=y.height;(s.width!==E||s.height!==w)&&this.setSize(E,w)}return d===!1&&x.setRenderTarget(s),_=x.toneMapping,x.toneMapping=ai,!0},this.hasRenderPass=function(){return d},this.end=function(x,y){x.toneMapping=_,m=!0;let E=s,w=a;for(let A=0;A<p.length;A++){const P=p[A];if(P.enabled!==!1&&(P.render(x,w,E,y),P.needsSwap!==!1)){const v=E;E=w,w=v}}if(f!==x.outputColorSpace||u!==x.toneMapping){f=x.outputColorSpace,u=x.toneMapping,c.defines={},Ke.getTransfer(f)===rt&&(c.defines.SRGB_TRANSFER="");const A=xv[u];A&&(c.defines[A]=""),c.needsUpdate=!0}c.uniforms.tDiffuse.value=E.texture,x.setRenderTarget(S),x.render(l,h),S=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){s.dispose(),a.dispose(),o.dispose(),c.dispose()}}const Pp=new on,Kl=new aa(1,1),Lp=new mp,Ip=new Gg,Dp=new Ep,yf=[],Tf=[],bf=new Float32Array(16),Af=new Float32Array(9),wf=new Float32Array(4);function ys(t,e,n){const i=t[0];if(i<=0||i>0)return t;const r=e*n;let s=yf[r];if(s===void 0&&(s=new Float32Array(r),yf[r]=s),e!==0){i.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=n,t[a].toArray(s,o)}return s}function Bt(t,e){if(t.length!==e.length)return!1;for(let n=0,i=t.length;n<i;n++)if(t[n]!==e[n])return!1;return!0}function kt(t,e){for(let n=0,i=e.length;n<i;n++)t[n]=e[n]}function Uo(t,e){let n=Tf[e];n===void 0&&(n=new Int32Array(e),Tf[e]=n);for(let i=0;i!==e;++i)n[i]=t.allocateTextureUnit();return n}function Sv(t,e){const n=this.cache;n[0]!==e&&(t.uniform1f(this.addr,e),n[0]=e)}function Ev(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2f(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Bt(n,e))return;t.uniform2fv(this.addr,e),kt(n,e)}}function yv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3f(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else if(e.r!==void 0)(n[0]!==e.r||n[1]!==e.g||n[2]!==e.b)&&(t.uniform3f(this.addr,e.r,e.g,e.b),n[0]=e.r,n[1]=e.g,n[2]=e.b);else{if(Bt(n,e))return;t.uniform3fv(this.addr,e),kt(n,e)}}function Tv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4f(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Bt(n,e))return;t.uniform4fv(this.addr,e),kt(n,e)}}function bv(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Bt(n,e))return;t.uniformMatrix2fv(this.addr,!1,e),kt(n,e)}else{if(Bt(n,i))return;wf.set(i),t.uniformMatrix2fv(this.addr,!1,wf),kt(n,i)}}function Av(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Bt(n,e))return;t.uniformMatrix3fv(this.addr,!1,e),kt(n,e)}else{if(Bt(n,i))return;Af.set(i),t.uniformMatrix3fv(this.addr,!1,Af),kt(n,i)}}function wv(t,e){const n=this.cache,i=e.elements;if(i===void 0){if(Bt(n,e))return;t.uniformMatrix4fv(this.addr,!1,e),kt(n,e)}else{if(Bt(n,i))return;bf.set(i),t.uniformMatrix4fv(this.addr,!1,bf),kt(n,i)}}function Rv(t,e){const n=this.cache;n[0]!==e&&(t.uniform1i(this.addr,e),n[0]=e)}function Cv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2i(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Bt(n,e))return;t.uniform2iv(this.addr,e),kt(n,e)}}function Pv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3i(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Bt(n,e))return;t.uniform3iv(this.addr,e),kt(n,e)}}function Lv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4i(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Bt(n,e))return;t.uniform4iv(this.addr,e),kt(n,e)}}function Iv(t,e){const n=this.cache;n[0]!==e&&(t.uniform1ui(this.addr,e),n[0]=e)}function Dv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y)&&(t.uniform2ui(this.addr,e.x,e.y),n[0]=e.x,n[1]=e.y);else{if(Bt(n,e))return;t.uniform2uiv(this.addr,e),kt(n,e)}}function Uv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z)&&(t.uniform3ui(this.addr,e.x,e.y,e.z),n[0]=e.x,n[1]=e.y,n[2]=e.z);else{if(Bt(n,e))return;t.uniform3uiv(this.addr,e),kt(n,e)}}function Nv(t,e){const n=this.cache;if(e.x!==void 0)(n[0]!==e.x||n[1]!==e.y||n[2]!==e.z||n[3]!==e.w)&&(t.uniform4ui(this.addr,e.x,e.y,e.z,e.w),n[0]=e.x,n[1]=e.y,n[2]=e.z,n[3]=e.w);else{if(Bt(n,e))return;t.uniform4uiv(this.addr,e),kt(n,e)}}function Fv(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r);let s;this.type===t.SAMPLER_2D_SHADOW?(Kl.compareFunction=n.isReversedDepthBuffer()?bu:Tu,s=Kl):s=Pp,n.setTexture2D(e||s,r)}function Ov(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture3D(e||Ip,r)}function Bv(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTextureCube(e||Dp,r)}function kv(t,e,n){const i=this.cache,r=n.allocateTextureUnit();i[0]!==r&&(t.uniform1i(this.addr,r),i[0]=r),n.setTexture2DArray(e||Lp,r)}function zv(t){switch(t){case 5126:return Sv;case 35664:return Ev;case 35665:return yv;case 35666:return Tv;case 35674:return bv;case 35675:return Av;case 35676:return wv;case 5124:case 35670:return Rv;case 35667:case 35671:return Cv;case 35668:case 35672:return Pv;case 35669:case 35673:return Lv;case 5125:return Iv;case 36294:return Dv;case 36295:return Uv;case 36296:return Nv;case 35678:case 36198:case 36298:case 36306:case 35682:return Fv;case 35679:case 36299:case 36307:return Ov;case 35680:case 36300:case 36308:case 36293:return Bv;case 36289:case 36303:case 36311:case 36292:return kv}}function Vv(t,e){t.uniform1fv(this.addr,e)}function Gv(t,e){const n=ys(e,this.size,2);t.uniform2fv(this.addr,n)}function Hv(t,e){const n=ys(e,this.size,3);t.uniform3fv(this.addr,n)}function Wv(t,e){const n=ys(e,this.size,4);t.uniform4fv(this.addr,n)}function Xv(t,e){const n=ys(e,this.size,4);t.uniformMatrix2fv(this.addr,!1,n)}function qv(t,e){const n=ys(e,this.size,9);t.uniformMatrix3fv(this.addr,!1,n)}function Yv(t,e){const n=ys(e,this.size,16);t.uniformMatrix4fv(this.addr,!1,n)}function jv(t,e){t.uniform1iv(this.addr,e)}function Kv(t,e){t.uniform2iv(this.addr,e)}function $v(t,e){t.uniform3iv(this.addr,e)}function Zv(t,e){t.uniform4iv(this.addr,e)}function Jv(t,e){t.uniform1uiv(this.addr,e)}function Qv(t,e){t.uniform2uiv(this.addr,e)}function ex(t,e){t.uniform3uiv(this.addr,e)}function tx(t,e){t.uniform4uiv(this.addr,e)}function nx(t,e,n){const i=this.cache,r=e.length,s=Uo(n,r);Bt(i,s)||(t.uniform1iv(this.addr,s),kt(i,s));let a;this.type===t.SAMPLER_2D_SHADOW?a=Kl:a=Pp;for(let o=0;o!==r;++o)n.setTexture2D(e[o]||a,s[o])}function ix(t,e,n){const i=this.cache,r=e.length,s=Uo(n,r);Bt(i,s)||(t.uniform1iv(this.addr,s),kt(i,s));for(let a=0;a!==r;++a)n.setTexture3D(e[a]||Ip,s[a])}function rx(t,e,n){const i=this.cache,r=e.length,s=Uo(n,r);Bt(i,s)||(t.uniform1iv(this.addr,s),kt(i,s));for(let a=0;a!==r;++a)n.setTextureCube(e[a]||Dp,s[a])}function sx(t,e,n){const i=this.cache,r=e.length,s=Uo(n,r);Bt(i,s)||(t.uniform1iv(this.addr,s),kt(i,s));for(let a=0;a!==r;++a)n.setTexture2DArray(e[a]||Lp,s[a])}function ax(t){switch(t){case 5126:return Vv;case 35664:return Gv;case 35665:return Hv;case 35666:return Wv;case 35674:return Xv;case 35675:return qv;case 35676:return Yv;case 5124:case 35670:return jv;case 35667:case 35671:return Kv;case 35668:case 35672:return $v;case 35669:case 35673:return Zv;case 5125:return Jv;case 36294:return Qv;case 36295:return ex;case 36296:return tx;case 35678:case 36198:case 36298:case 36306:case 35682:return nx;case 35679:case 36299:case 36307:return ix;case 35680:case 36300:case 36308:case 36293:return rx;case 36289:case 36303:case 36311:case 36292:return sx}}class ox{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.setValue=zv(n.type)}}class cx{constructor(e,n,i){this.id=e,this.addr=i,this.cache=[],this.type=n.type,this.size=n.size,this.setValue=ax(n.type)}}class lx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,n,i){const r=this.seq;for(let s=0,a=r.length;s!==a;++s){const o=r[s];o.setValue(e,n[o.id],i)}}}const zc=/(\w+)(\])?(\[|\.)?/g;function Rf(t,e){t.seq.push(e),t.map[e.id]=e}function ux(t,e,n){const i=t.name,r=i.length;for(zc.lastIndex=0;;){const s=zc.exec(i),a=zc.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===r){Rf(n,l===void 0?new ox(o,t,e):new cx(o,t,e));break}else{let f=n.map[o];f===void 0&&(f=new lx(o),Rf(n,f)),n=f}}}class oo{constructor(e,n){this.seq=[],this.map={};const i=e.getProgramParameter(n,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){const o=e.getActiveUniform(n,a),c=e.getUniformLocation(n,o.name);ux(o,c,this)}const r=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(a):s.push(a);r.length>0&&(this.seq=r.concat(s))}setValue(e,n,i,r){const s=this.map[n];s!==void 0&&s.setValue(e,i,r)}setOptional(e,n,i){const r=n[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,n,i,r){for(let s=0,a=n.length;s!==a;++s){const o=n[s],c=i[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,r)}}static seqWithValue(e,n){const i=[];for(let r=0,s=e.length;r!==s;++r){const a=e[r];a.id in n&&i.push(a)}return i}}function Cf(t,e,n){const i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),i}const hx=37297;let fx=0;function dx(t,e){const n=t.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,n.length);for(let a=r;a<s;a++){const o=a+1;i.push(`${o===e?">":" "} ${o}: ${n[a]}`)}return i.join(`
`)}const Pf=new Be;function px(t){Ke._getMatrix(Pf,Ke.workingColorSpace,t);const e=`mat3( ${Pf.elements.map(n=>n.toFixed(4))} )`;switch(Ke.getTransfer(t)){case po:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return Ne("WebGLProgram: Unsupported color space: ",t),[e,"LinearTransferOETF"]}}function Lf(t,e,n){const i=t.getShaderParameter(e,t.COMPILE_STATUS),s=(t.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return n.toUpperCase()+`

`+s+`

`+dx(t.getShaderSource(e),o)}else return s}function mx(t,e){const n=px(e);return[`vec4 ${t}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,"}"].join(`
`)}const gx={[Jd]:"Linear",[Qd]:"Reinhard",[ep]:"Cineon",[tp]:"ACESFilmic",[ip]:"AgX",[rp]:"Neutral",[np]:"Custom"};function _x(t,e){const n=gx[e];return n===void 0?(Ne("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+t+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}const Ka=new U;function vx(){Ke.getLuminanceCoefficients(Ka);const t=Ka.x.toFixed(4),e=Ka.y.toFixed(4),n=Ka.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${t}, ${e}, ${n} );`,"	return dot( weights, rgb );","}"].join(`
`)}function xx(t){return[t.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",t.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ys).join(`
`)}function Mx(t){const e=[];for(const n in t){const i=t[n];i!==!1&&e.push("#define "+n+" "+i)}return e.join(`
`)}function Sx(t,e){const n={},i=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){const s=t.getActiveAttrib(e,r),a=s.name;let o=1;s.type===t.FLOAT_MAT2&&(o=2),s.type===t.FLOAT_MAT3&&(o=3),s.type===t.FLOAT_MAT4&&(o=4),n[a]={type:s.type,location:t.getAttribLocation(e,a),locationSize:o}}return n}function Ys(t){return t!==""}function If(t,e){const n=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Df(t,e){return t.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ex=/^[ \t]*#include +<([\w\d./]+)>/gm;function $l(t){return t.replace(Ex,Tx)}const yx=new Map;function Tx(t,e){let n=ze[e];if(n===void 0){const i=yx.get(e);if(i!==void 0)n=ze[i],Ne('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return $l(n)}const bx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Uf(t){return t.replace(bx,Ax)}function Ax(t,e,n,i){let r="";for(let s=parseInt(e);s<parseInt(n);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function Nf(t){let e=`precision ${t.precision} float;
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
#define LOW_PRECISION`),e}const wx={[no]:"SHADOWMAP_TYPE_PCF",[qs]:"SHADOWMAP_TYPE_VSM"};function Rx(t){return wx[t.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Cx={[br]:"ENVMAP_TYPE_CUBE",[rs]:"ENVMAP_TYPE_CUBE",[Co]:"ENVMAP_TYPE_CUBE_UV"};function Px(t){return t.envMap===!1?"ENVMAP_TYPE_CUBE":Cx[t.envMapMode]||"ENVMAP_TYPE_CUBE"}const Lx={[rs]:"ENVMAP_MODE_REFRACTION"};function Ix(t){return t.envMap===!1?"ENVMAP_MODE_REFLECTION":Lx[t.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Dx={[_u]:"ENVMAP_BLENDING_MULTIPLY",[Sg]:"ENVMAP_BLENDING_MIX",[Eg]:"ENVMAP_BLENDING_ADD"};function Ux(t){return t.envMap===!1?"ENVMAP_BLENDING_NONE":Dx[t.combine]||"ENVMAP_BLENDING_NONE"}function Nx(t){const e=t.envMapCubeUVHeight;if(e===null)return null;const n=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,n),7*16)),texelHeight:i,maxMip:n}}function Fx(t,e,n,i){const r=t.getContext(),s=n.defines;let a=n.vertexShader,o=n.fragmentShader;const c=Rx(n),l=Px(n),h=Ix(n),f=Ux(n),u=Nx(n),m=xx(n),_=Mx(s),S=r.createProgram();let p,d,x=n.glslVersion?"#version "+n.glslVersion+`
`:"";n.isRawShaderMaterial?(p=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Ys).join(`
`),p.length>0&&(p+=`
`),d=["#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_].filter(Ys).join(`
`),d.length>0&&(d+=`
`)):(p=[Nf(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",n.batching?"#define USE_BATCHING":"",n.batchingColor?"#define USE_BATCHING_COLOR":"",n.instancing?"#define USE_INSTANCING":"",n.instancingColor?"#define USE_INSTANCING_COLOR":"",n.instancingMorph?"#define USE_INSTANCING_MORPH":"",n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.map?"#define USE_MAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+h:"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.displacementMap?"#define USE_DISPLACEMENTMAP":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.mapUv?"#define MAP_UV "+n.mapUv:"",n.alphaMapUv?"#define ALPHAMAP_UV "+n.alphaMapUv:"",n.lightMapUv?"#define LIGHTMAP_UV "+n.lightMapUv:"",n.aoMapUv?"#define AOMAP_UV "+n.aoMapUv:"",n.emissiveMapUv?"#define EMISSIVEMAP_UV "+n.emissiveMapUv:"",n.bumpMapUv?"#define BUMPMAP_UV "+n.bumpMapUv:"",n.normalMapUv?"#define NORMALMAP_UV "+n.normalMapUv:"",n.displacementMapUv?"#define DISPLACEMENTMAP_UV "+n.displacementMapUv:"",n.metalnessMapUv?"#define METALNESSMAP_UV "+n.metalnessMapUv:"",n.roughnessMapUv?"#define ROUGHNESSMAP_UV "+n.roughnessMapUv:"",n.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+n.anisotropyMapUv:"",n.clearcoatMapUv?"#define CLEARCOATMAP_UV "+n.clearcoatMapUv:"",n.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+n.clearcoatNormalMapUv:"",n.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+n.clearcoatRoughnessMapUv:"",n.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+n.iridescenceMapUv:"",n.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+n.iridescenceThicknessMapUv:"",n.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+n.sheenColorMapUv:"",n.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+n.sheenRoughnessMapUv:"",n.specularMapUv?"#define SPECULARMAP_UV "+n.specularMapUv:"",n.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+n.specularColorMapUv:"",n.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+n.specularIntensityMapUv:"",n.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+n.transmissionMapUv:"",n.thicknessMapUv?"#define THICKNESSMAP_UV "+n.thicknessMapUv:"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors?"#define USE_COLOR":"",n.vertexAlphas?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.flatShading?"#define FLAT_SHADED":"",n.skinning?"#define USE_SKINNING":"",n.morphTargets?"#define USE_MORPHTARGETS":"",n.morphNormals&&n.flatShading===!1?"#define USE_MORPHNORMALS":"",n.morphColors?"#define USE_MORPHCOLORS":"",n.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+n.morphTextureStride:"",n.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+n.morphTargetsCount:"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.sizeAttenuation?"#define USE_SIZEATTENUATION":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ys).join(`
`),d=[Nf(n),"#define SHADER_TYPE "+n.shaderType,"#define SHADER_NAME "+n.shaderName,_,n.useFog&&n.fog?"#define USE_FOG":"",n.useFog&&n.fogExp2?"#define FOG_EXP2":"",n.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",n.map?"#define USE_MAP":"",n.matcap?"#define USE_MATCAP":"",n.envMap?"#define USE_ENVMAP":"",n.envMap?"#define "+l:"",n.envMap?"#define "+h:"",n.envMap?"#define "+f:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",n.lightMap?"#define USE_LIGHTMAP":"",n.aoMap?"#define USE_AOMAP":"",n.bumpMap?"#define USE_BUMPMAP":"",n.normalMap?"#define USE_NORMALMAP":"",n.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",n.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",n.emissiveMap?"#define USE_EMISSIVEMAP":"",n.anisotropy?"#define USE_ANISOTROPY":"",n.anisotropyMap?"#define USE_ANISOTROPYMAP":"",n.clearcoat?"#define USE_CLEARCOAT":"",n.clearcoatMap?"#define USE_CLEARCOATMAP":"",n.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",n.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",n.dispersion?"#define USE_DISPERSION":"",n.iridescence?"#define USE_IRIDESCENCE":"",n.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",n.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",n.specularMap?"#define USE_SPECULARMAP":"",n.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",n.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",n.roughnessMap?"#define USE_ROUGHNESSMAP":"",n.metalnessMap?"#define USE_METALNESSMAP":"",n.alphaMap?"#define USE_ALPHAMAP":"",n.alphaTest?"#define USE_ALPHATEST":"",n.alphaHash?"#define USE_ALPHAHASH":"",n.sheen?"#define USE_SHEEN":"",n.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",n.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",n.transmission?"#define USE_TRANSMISSION":"",n.transmissionMap?"#define USE_TRANSMISSIONMAP":"",n.thicknessMap?"#define USE_THICKNESSMAP":"",n.vertexTangents&&n.flatShading===!1?"#define USE_TANGENT":"",n.vertexColors||n.instancingColor?"#define USE_COLOR":"",n.vertexAlphas||n.batchingColor?"#define USE_COLOR_ALPHA":"",n.vertexUv1s?"#define USE_UV1":"",n.vertexUv2s?"#define USE_UV2":"",n.vertexUv3s?"#define USE_UV3":"",n.pointsUvs?"#define USE_POINTS_UV":"",n.gradientMap?"#define USE_GRADIENTMAP":"",n.flatShading?"#define FLAT_SHADED":"",n.doubleSided?"#define DOUBLE_SIDED":"",n.flipSided?"#define FLIP_SIDED":"",n.shadowMapEnabled?"#define USE_SHADOWMAP":"",n.shadowMapEnabled?"#define "+c:"",n.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",n.numLightProbes>0?"#define USE_LIGHT_PROBES":"",n.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",n.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",n.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",n.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",n.toneMapping!==ai?"#define TONE_MAPPING":"",n.toneMapping!==ai?ze.tonemapping_pars_fragment:"",n.toneMapping!==ai?_x("toneMapping",n.toneMapping):"",n.dithering?"#define DITHERING":"",n.opaque?"#define OPAQUE":"",ze.colorspace_pars_fragment,mx("linearToOutputTexel",n.outputColorSpace),vx(),n.useDepthPacking?"#define DEPTH_PACKING "+n.depthPacking:"",`
`].filter(Ys).join(`
`)),a=$l(a),a=If(a,n),a=Df(a,n),o=$l(o),o=If(o,n),o=Df(o,n),a=Uf(a),o=Uf(o),n.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,d=["#define varying in",n.glslVersion===qh?"":"layout(location = 0) out highp vec4 pc_fragColor;",n.glslVersion===qh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const y=x+p+a,E=x+d+o,w=Cf(r,r.VERTEX_SHADER,y),A=Cf(r,r.FRAGMENT_SHADER,E);r.attachShader(S,w),r.attachShader(S,A),n.index0AttributeName!==void 0?r.bindAttribLocation(S,0,n.index0AttributeName):n.morphTargets===!0&&r.bindAttribLocation(S,0,"position"),r.linkProgram(S);function P(R){if(t.debug.checkShaderErrors){const B=r.getProgramInfoLog(S)||"",z=r.getShaderInfoLog(w)||"",q=r.getShaderInfoLog(A)||"",k=B.trim(),G=z.trim(),N=q.trim();let Q=!0,$=!0;if(r.getProgramParameter(S,r.LINK_STATUS)===!1)if(Q=!1,typeof t.debug.onShaderError=="function")t.debug.onShaderError(r,S,w,A);else{const le=Lf(r,w,"vertex"),me=Lf(r,A,"fragment");Je("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(S,r.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+k+`
`+le+`
`+me)}else k!==""?Ne("WebGLProgram: Program Info Log:",k):(G===""||N==="")&&($=!1);$&&(R.diagnostics={runnable:Q,programLog:k,vertexShader:{log:G,prefix:p},fragmentShader:{log:N,prefix:d}})}r.deleteShader(w),r.deleteShader(A),v=new oo(r,S),T=Sx(r,S)}let v;this.getUniforms=function(){return v===void 0&&P(this),v};let T;this.getAttributes=function(){return T===void 0&&P(this),T};let H=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return H===!1&&(H=r.getProgramParameter(S,hx)),H},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(S),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=fx++,this.cacheKey=e,this.usedTimes=1,this.program=S,this.vertexShader=w,this.fragmentShader=A,this}let Ox=0;class Bx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const n=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(n),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(e);return a.has(r)===!1&&(a.add(r),r.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){const n=this.materialCache.get(e);for(const i of n)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const n=this.materialCache;let i=n.get(e);return i===void 0&&(i=new Set,n.set(e,i)),i}_getShaderStage(e){const n=this.shaderCache;let i=n.get(e);return i===void 0&&(i=new kx(e),n.set(e,i)),i}}class kx{constructor(e){this.id=Ox++,this.code=e,this.usedTimes=0}}function zx(t,e,n,i,r,s){const a=new gp,o=new Bx,c=new Set,l=[],h=new Map,f=i.logarithmicDepthBuffer;let u=i.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(v){return c.add(v),v===0?"uv":`uv${v}`}function S(v,T,H,R,B){const z=R.fog,q=B.geometry,k=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?R.environment:null,G=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,N=e.get(v.envMap||k,G),Q=N&&N.mapping===Co?N.image.height:null,$=m[v.type];v.precision!==null&&(u=i.getMaxPrecision(v.precision),u!==v.precision&&Ne("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));const le=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,me=le!==void 0?le.length:0;let he=0;q.morphAttributes.position!==void 0&&(he=1),q.morphAttributes.normal!==void 0&&(he=2),q.morphAttributes.color!==void 0&&(he=3);let ke,pt,dt,j;if($){const it=ni[$];ke=it.vertexShader,pt=it.fragmentShader}else ke=v.vertexShader,pt=v.fragmentShader,o.update(v),dt=o.getVertexShaderID(v),j=o.getFragmentShaderID(v);const ne=t.getRenderTarget(),se=t.state.buffers.depth.getReversed(),Oe=B.isInstancedMesh===!0,Le=B.isBatchedMesh===!0,De=!!v.map,Vt=!!v.matcap,je=!!N,nt=!!v.aoMap,ct=!!v.lightMap,Ve=!!v.bumpMap,wt=!!v.normalMap,C=!!v.displacementMap,Pt=!!v.emissiveMap,tt=!!v.metalnessMap,ht=!!v.roughnessMap,Se=v.anisotropy>0,b=v.clearcoat>0,g=v.dispersion>0,I=v.iridescence>0,Y=v.sheen>0,K=v.transmission>0,X=Se&&!!v.anisotropyMap,ge=b&&!!v.clearcoatMap,ie=b&&!!v.clearcoatNormalMap,Ce=b&&!!v.clearcoatRoughnessMap,Ie=I&&!!v.iridescenceMap,Z=I&&!!v.iridescenceThicknessMap,ee=Y&&!!v.sheenColorMap,_e=Y&&!!v.sheenRoughnessMap,xe=!!v.specularMap,ue=!!v.specularColorMap,Ge=!!v.specularIntensityMap,L=K&&!!v.transmissionMap,re=K&&!!v.thicknessMap,te=!!v.gradientMap,de=!!v.alphaMap,J=v.alphaTest>0,W=!!v.alphaHash,ve=!!v.extensions;let Ue=ai;v.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(Ue=t.toneMapping);const ft={shaderID:$,shaderType:v.type,shaderName:v.name,vertexShader:ke,fragmentShader:pt,defines:v.defines,customVertexShaderID:dt,customFragmentShaderID:j,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:Le,batchingColor:Le&&B._colorsTexture!==null,instancing:Oe,instancingColor:Oe&&B.instanceColor!==null,instancingMorph:Oe&&B.morphTexture!==null,outputColorSpace:ne===null?t.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:as,alphaToCoverage:!!v.alphaToCoverage,map:De,matcap:Vt,envMap:je,envMapMode:je&&N.mapping,envMapCubeUVHeight:Q,aoMap:nt,lightMap:ct,bumpMap:Ve,normalMap:wt,displacementMap:C,emissiveMap:Pt,normalMapObjectSpace:wt&&v.normalMapType===bg,normalMapTangentSpace:wt&&v.normalMapType===dp,metalnessMap:tt,roughnessMap:ht,anisotropy:Se,anisotropyMap:X,clearcoat:b,clearcoatMap:ge,clearcoatNormalMap:ie,clearcoatRoughnessMap:Ce,dispersion:g,iridescence:I,iridescenceMap:Ie,iridescenceThicknessMap:Z,sheen:Y,sheenColorMap:ee,sheenRoughnessMap:_e,specularMap:xe,specularColorMap:ue,specularIntensityMap:Ge,transmission:K,transmissionMap:L,thicknessMap:re,gradientMap:te,opaque:v.transparent===!1&&v.blending===Jr&&v.alphaToCoverage===!1,alphaMap:de,alphaTest:J,alphaHash:W,combine:v.combine,mapUv:De&&_(v.map.channel),aoMapUv:nt&&_(v.aoMap.channel),lightMapUv:ct&&_(v.lightMap.channel),bumpMapUv:Ve&&_(v.bumpMap.channel),normalMapUv:wt&&_(v.normalMap.channel),displacementMapUv:C&&_(v.displacementMap.channel),emissiveMapUv:Pt&&_(v.emissiveMap.channel),metalnessMapUv:tt&&_(v.metalnessMap.channel),roughnessMapUv:ht&&_(v.roughnessMap.channel),anisotropyMapUv:X&&_(v.anisotropyMap.channel),clearcoatMapUv:ge&&_(v.clearcoatMap.channel),clearcoatNormalMapUv:ie&&_(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ce&&_(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Ie&&_(v.iridescenceMap.channel),iridescenceThicknessMapUv:Z&&_(v.iridescenceThicknessMap.channel),sheenColorMapUv:ee&&_(v.sheenColorMap.channel),sheenRoughnessMapUv:_e&&_(v.sheenRoughnessMap.channel),specularMapUv:xe&&_(v.specularMap.channel),specularColorMapUv:ue&&_(v.specularColorMap.channel),specularIntensityMapUv:Ge&&_(v.specularIntensityMap.channel),transmissionMapUv:L&&_(v.transmissionMap.channel),thicknessMapUv:re&&_(v.thicknessMap.channel),alphaMapUv:de&&_(v.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(wt||Se),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!q.attributes.uv&&(De||de),fog:!!z,useFog:v.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||q.attributes.normal===void 0&&wt===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:se,skinning:B.isSkinnedMesh===!0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:me,morphTextureStride:he,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:v.dithering,shadowMapEnabled:t.shadowMap.enabled&&H.length>0,shadowMapType:t.shadowMap.type,toneMapping:Ue,decodeVideoTexture:De&&v.map.isVideoTexture===!0&&Ke.getTransfer(v.map.colorSpace)===rt,decodeVideoTextureEmissive:Pt&&v.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(v.emissiveMap.colorSpace)===rt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Ai,flipSided:v.side===dn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:ve&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ve&&v.extensions.multiDraw===!0||Le)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return ft.vertexUv1s=c.has(1),ft.vertexUv2s=c.has(2),ft.vertexUv3s=c.has(3),c.clear(),ft}function p(v){const T=[];if(v.shaderID?T.push(v.shaderID):(T.push(v.customVertexShaderID),T.push(v.customFragmentShaderID)),v.defines!==void 0)for(const H in v.defines)T.push(H),T.push(v.defines[H]);return v.isRawShaderMaterial===!1&&(d(T,v),x(T,v),T.push(t.outputColorSpace)),T.push(v.customProgramCacheKey),T.join()}function d(v,T){v.push(T.precision),v.push(T.outputColorSpace),v.push(T.envMapMode),v.push(T.envMapCubeUVHeight),v.push(T.mapUv),v.push(T.alphaMapUv),v.push(T.lightMapUv),v.push(T.aoMapUv),v.push(T.bumpMapUv),v.push(T.normalMapUv),v.push(T.displacementMapUv),v.push(T.emissiveMapUv),v.push(T.metalnessMapUv),v.push(T.roughnessMapUv),v.push(T.anisotropyMapUv),v.push(T.clearcoatMapUv),v.push(T.clearcoatNormalMapUv),v.push(T.clearcoatRoughnessMapUv),v.push(T.iridescenceMapUv),v.push(T.iridescenceThicknessMapUv),v.push(T.sheenColorMapUv),v.push(T.sheenRoughnessMapUv),v.push(T.specularMapUv),v.push(T.specularColorMapUv),v.push(T.specularIntensityMapUv),v.push(T.transmissionMapUv),v.push(T.thicknessMapUv),v.push(T.combine),v.push(T.fogExp2),v.push(T.sizeAttenuation),v.push(T.morphTargetsCount),v.push(T.morphAttributeCount),v.push(T.numDirLights),v.push(T.numPointLights),v.push(T.numSpotLights),v.push(T.numSpotLightMaps),v.push(T.numHemiLights),v.push(T.numRectAreaLights),v.push(T.numDirLightShadows),v.push(T.numPointLightShadows),v.push(T.numSpotLightShadows),v.push(T.numSpotLightShadowsWithMaps),v.push(T.numLightProbes),v.push(T.shadowMapType),v.push(T.toneMapping),v.push(T.numClippingPlanes),v.push(T.numClipIntersection),v.push(T.depthPacking)}function x(v,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),v.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),v.push(a.mask)}function y(v){const T=m[v.type];let H;if(T){const R=ni[T];H=c_.clone(R.uniforms)}else H=v.uniforms;return H}function E(v,T){let H=h.get(T);return H!==void 0?++H.usedTimes:(H=new Fx(t,T,v,r),l.push(H),h.set(T,H)),H}function w(v){if(--v.usedTimes===0){const T=l.indexOf(v);l[T]=l[l.length-1],l.pop(),h.delete(v.cacheKey),v.destroy()}}function A(v){o.remove(v)}function P(){o.dispose()}return{getParameters:S,getProgramCacheKey:p,getUniforms:y,acquireProgram:E,releaseProgram:w,releaseShaderCache:A,programs:l,dispose:P}}function Vx(){let t=new WeakMap;function e(a){return t.has(a)}function n(a){let o=t.get(a);return o===void 0&&(o={},t.set(a,o)),o}function i(a){t.delete(a)}function r(a,o,c){t.get(a)[o]=c}function s(){t=new WeakMap}return{has:e,get:n,remove:i,update:r,dispose:s}}function Gx(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.material.id!==e.material.id?t.material.id-e.material.id:t.materialVariant!==e.materialVariant?t.materialVariant-e.materialVariant:t.z!==e.z?t.z-e.z:t.id-e.id}function Ff(t,e){return t.groupOrder!==e.groupOrder?t.groupOrder-e.groupOrder:t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Of(){const t=[];let e=0;const n=[],i=[],r=[];function s(){e=0,n.length=0,i.length=0,r.length=0}function a(u){let m=0;return u.isInstancedMesh&&(m+=2),u.isSkinnedMesh&&(m+=1),m}function o(u,m,_,S,p,d){let x=t[e];return x===void 0?(x={id:u.id,object:u,geometry:m,material:_,materialVariant:a(u),groupOrder:S,renderOrder:u.renderOrder,z:p,group:d},t[e]=x):(x.id=u.id,x.object=u,x.geometry=m,x.material=_,x.materialVariant=a(u),x.groupOrder=S,x.renderOrder=u.renderOrder,x.z=p,x.group=d),e++,x}function c(u,m,_,S,p,d){const x=o(u,m,_,S,p,d);_.transmission>0?i.push(x):_.transparent===!0?r.push(x):n.push(x)}function l(u,m,_,S,p,d){const x=o(u,m,_,S,p,d);_.transmission>0?i.unshift(x):_.transparent===!0?r.unshift(x):n.unshift(x)}function h(u,m){n.length>1&&n.sort(u||Gx),i.length>1&&i.sort(m||Ff),r.length>1&&r.sort(m||Ff)}function f(){for(let u=e,m=t.length;u<m;u++){const _=t[u];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:n,transmissive:i,transparent:r,init:s,push:c,unshift:l,finish:f,sort:h}}function Hx(){let t=new WeakMap;function e(i,r){const s=t.get(i);let a;return s===void 0?(a=new Of,t.set(i,[a])):r>=s.length?(a=new Of,s.push(a)):a=s[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}function Wx(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={direction:new U,color:new We};break;case"SpotLight":n={position:new U,direction:new U,color:new We,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":n={position:new U,color:new We,distance:0,decay:0};break;case"HemisphereLight":n={direction:new U,skyColor:new We,groundColor:new We};break;case"RectAreaLight":n={color:new We,position:new U,halfWidth:new U,halfHeight:new U};break}return t[e.id]=n,n}}}function Xx(){const t={};return{get:function(e){if(t[e.id]!==void 0)return t[e.id];let n;switch(e.type){case"DirectionalLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"SpotLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye};break;case"PointLight":n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ye,shadowCameraNear:1,shadowCameraFar:1e3};break}return t[e.id]=n,n}}}let qx=0;function Yx(t,e){return(e.castShadow?2:0)-(t.castShadow?2:0)+(e.map?1:0)-(t.map?1:0)}function jx(t){const e=new Wx,n=Xx(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)i.probe.push(new U);const r=new U,s=new St,a=new St;function o(l){let h=0,f=0,u=0;for(let T=0;T<9;T++)i.probe[T].set(0,0,0);let m=0,_=0,S=0,p=0,d=0,x=0,y=0,E=0,w=0,A=0,P=0;l.sort(Yx);for(let T=0,H=l.length;T<H;T++){const R=l[T],B=R.color,z=R.intensity,q=R.distance;let k=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===ss?k=R.shadow.map.texture:k=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)h+=B.r*z,f+=B.g*z,u+=B.b*z;else if(R.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(R.sh.coefficients[G],z);P++}else if(R.isDirectionalLight){const G=e.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const N=R.shadow,Q=n.get(R);Q.shadowIntensity=N.intensity,Q.shadowBias=N.bias,Q.shadowNormalBias=N.normalBias,Q.shadowRadius=N.radius,Q.shadowMapSize=N.mapSize,i.directionalShadow[m]=Q,i.directionalShadowMap[m]=k,i.directionalShadowMatrix[m]=R.shadow.matrix,x++}i.directional[m]=G,m++}else if(R.isSpotLight){const G=e.get(R);G.position.setFromMatrixPosition(R.matrixWorld),G.color.copy(B).multiplyScalar(z),G.distance=q,G.coneCos=Math.cos(R.angle),G.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),G.decay=R.decay,i.spot[S]=G;const N=R.shadow;if(R.map&&(i.spotLightMap[w]=R.map,w++,N.updateMatrices(R),R.castShadow&&A++),i.spotLightMatrix[S]=N.matrix,R.castShadow){const Q=n.get(R);Q.shadowIntensity=N.intensity,Q.shadowBias=N.bias,Q.shadowNormalBias=N.normalBias,Q.shadowRadius=N.radius,Q.shadowMapSize=N.mapSize,i.spotShadow[S]=Q,i.spotShadowMap[S]=k,E++}S++}else if(R.isRectAreaLight){const G=e.get(R);G.color.copy(B).multiplyScalar(z),G.halfWidth.set(R.width*.5,0,0),G.halfHeight.set(0,R.height*.5,0),i.rectArea[p]=G,p++}else if(R.isPointLight){const G=e.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity),G.distance=R.distance,G.decay=R.decay,R.castShadow){const N=R.shadow,Q=n.get(R);Q.shadowIntensity=N.intensity,Q.shadowBias=N.bias,Q.shadowNormalBias=N.normalBias,Q.shadowRadius=N.radius,Q.shadowMapSize=N.mapSize,Q.shadowCameraNear=N.camera.near,Q.shadowCameraFar=N.camera.far,i.pointShadow[_]=Q,i.pointShadowMap[_]=k,i.pointShadowMatrix[_]=R.shadow.matrix,y++}i.point[_]=G,_++}else if(R.isHemisphereLight){const G=e.get(R);G.skyColor.copy(R.color).multiplyScalar(z),G.groundColor.copy(R.groundColor).multiplyScalar(z),i.hemi[d]=G,d++}}p>0&&(t.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ae.LTC_FLOAT_1,i.rectAreaLTC2=ae.LTC_FLOAT_2):(i.rectAreaLTC1=ae.LTC_HALF_1,i.rectAreaLTC2=ae.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=f,i.ambient[2]=u;const v=i.hash;(v.directionalLength!==m||v.pointLength!==_||v.spotLength!==S||v.rectAreaLength!==p||v.hemiLength!==d||v.numDirectionalShadows!==x||v.numPointShadows!==y||v.numSpotShadows!==E||v.numSpotMaps!==w||v.numLightProbes!==P)&&(i.directional.length=m,i.spot.length=S,i.rectArea.length=p,i.point.length=_,i.hemi.length=d,i.directionalShadow.length=x,i.directionalShadowMap.length=x,i.pointShadow.length=y,i.pointShadowMap.length=y,i.spotShadow.length=E,i.spotShadowMap.length=E,i.directionalShadowMatrix.length=x,i.pointShadowMatrix.length=y,i.spotLightMatrix.length=E+w-A,i.spotLightMap.length=w,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=P,v.directionalLength=m,v.pointLength=_,v.spotLength=S,v.rectAreaLength=p,v.hemiLength=d,v.numDirectionalShadows=x,v.numPointShadows=y,v.numSpotShadows=E,v.numSpotMaps=w,v.numLightProbes=P,i.version=qx++)}function c(l,h){let f=0,u=0,m=0,_=0,S=0;const p=h.matrixWorldInverse;for(let d=0,x=l.length;d<x;d++){const y=l[d];if(y.isDirectionalLight){const E=i.directional[f];E.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(p),f++}else if(y.isSpotLight){const E=i.spot[m];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(p),m++}else if(y.isRectAreaLight){const E=i.rectArea[_];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(p),a.identity(),s.copy(y.matrixWorld),s.premultiply(p),a.extractRotation(s),E.halfWidth.set(y.width*.5,0,0),E.halfHeight.set(0,y.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),_++}else if(y.isPointLight){const E=i.point[u];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(p),u++}else if(y.isHemisphereLight){const E=i.hemi[S];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(p),S++}}}return{setup:o,setupView:c,state:i}}function Bf(t){const e=new jx(t),n=[],i=[];function r(h){l.camera=h,n.length=0,i.length=0}function s(h){n.push(h)}function a(h){i.push(h)}function o(){e.setup(n)}function c(h){e.setupView(n,h)}const l={lightsArray:n,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:l,setupLights:o,setupLightsView:c,pushLight:s,pushShadow:a}}function Kx(t){let e=new WeakMap;function n(r,s=0){const a=e.get(r);let o;return a===void 0?(o=new Bf(t),e.set(r,[o])):s>=a.length?(o=new Bf(t),a.push(o)):o=a[s],o}function i(){e=new WeakMap}return{get:n,dispose:i}}const $x=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Zx=`uniform sampler2D shadow_pass;
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
}`,Jx=[new U(1,0,0),new U(-1,0,0),new U(0,1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1)],Qx=[new U(0,-1,0),new U(0,-1,0),new U(0,0,1),new U(0,0,-1),new U(0,-1,0),new U(0,-1,0)],kf=new St,Hs=new U,Vc=new U;function e3(t,e,n){let i=new Ru;const r=new Ye,s=new Ye,a=new bt,o=new d_,c=new p_,l={},h=n.maxTextureSize,f={[Qi]:dn,[dn]:Qi,[Ai]:Ai},u=new hi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ye},radius:{value:4}},vertexShader:$x,fragmentShader:Zx}),m=u.clone();m.defines.HORIZONTAL_PASS=1;const _=new ln;_.setAttribute("position",new Tn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const S=new pn(_,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=no;let d=this.type;this.render=function(A,P,v){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||A.length===0)return;this.type===ng&&(Ne("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."),this.type=no);const T=t.getRenderTarget(),H=t.getActiveCubeFace(),R=t.getActiveMipmapLevel(),B=t.state;B.setBlending(Ci),B.buffers.depth.getReversed()===!0?B.buffers.color.setClear(0,0,0,0):B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const z=d!==this.type;z&&P.traverse(function(q){q.material&&(Array.isArray(q.material)?q.material.forEach(k=>k.needsUpdate=!0):q.material.needsUpdate=!0)});for(let q=0,k=A.length;q<k;q++){const G=A[q],N=G.shadow;if(N===void 0){Ne("WebGLShadowMap:",G,"has no shadow.");continue}if(N.autoUpdate===!1&&N.needsUpdate===!1)continue;r.copy(N.mapSize);const Q=N.getFrameExtents();r.multiply(Q),s.copy(N.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/Q.x),r.x=s.x*Q.x,N.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/Q.y),r.y=s.y*Q.y,N.mapSize.y=s.y));const $=t.state.buffers.depth.getReversed();if(N.camera._reversedDepth=$,N.map===null||z===!0){if(N.map!==null&&(N.map.depthTexture!==null&&(N.map.depthTexture.dispose(),N.map.depthTexture=null),N.map.dispose()),this.type===qs){if(G.isPointLight){Ne("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}N.map=new oi(r.x,r.y,{format:ss,type:Li,minFilter:en,magFilter:en,generateMipmaps:!1}),N.map.texture.name=G.name+".shadowMap",N.map.depthTexture=new aa(r.x,r.y,ii),N.map.depthTexture.name=G.name+".shadowMapDepth",N.map.depthTexture.format=Ii,N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=jt,N.map.depthTexture.magFilter=jt}else G.isPointLight?(N.map=new Cp(r.x),N.map.depthTexture=new a_(r.x,li)):(N.map=new oi(r.x,r.y),N.map.depthTexture=new aa(r.x,r.y,li)),N.map.depthTexture.name=G.name+".shadowMap",N.map.depthTexture.format=Ii,this.type===no?(N.map.depthTexture.compareFunction=$?bu:Tu,N.map.depthTexture.minFilter=en,N.map.depthTexture.magFilter=en):(N.map.depthTexture.compareFunction=null,N.map.depthTexture.minFilter=jt,N.map.depthTexture.magFilter=jt);N.camera.updateProjectionMatrix()}const le=N.map.isWebGLCubeRenderTarget?6:1;for(let me=0;me<le;me++){if(N.map.isWebGLCubeRenderTarget)t.setRenderTarget(N.map,me),t.clear();else{me===0&&(t.setRenderTarget(N.map),t.clear());const he=N.getViewport(me);a.set(s.x*he.x,s.y*he.y,s.x*he.z,s.y*he.w),B.viewport(a)}if(G.isPointLight){const he=N.camera,ke=N.matrix,pt=G.distance||he.far;pt!==he.far&&(he.far=pt,he.updateProjectionMatrix()),Hs.setFromMatrixPosition(G.matrixWorld),he.position.copy(Hs),Vc.copy(he.position),Vc.add(Jx[me]),he.up.copy(Qx[me]),he.lookAt(Vc),he.updateMatrixWorld(),ke.makeTranslation(-Hs.x,-Hs.y,-Hs.z),kf.multiplyMatrices(he.projectionMatrix,he.matrixWorldInverse),N._frustum.setFromProjectionMatrix(kf,he.coordinateSystem,he.reversedDepth)}else N.updateMatrices(G);i=N.getFrustum(),E(P,v,N.camera,G,this.type)}N.isPointLightShadow!==!0&&this.type===qs&&x(N,v),N.needsUpdate=!1}d=this.type,p.needsUpdate=!1,t.setRenderTarget(T,H,R)};function x(A,P){const v=e.update(S);u.defines.VSM_SAMPLES!==A.blurSamples&&(u.defines.VSM_SAMPLES=A.blurSamples,m.defines.VSM_SAMPLES=A.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new oi(r.x,r.y,{format:ss,type:Li})),u.uniforms.shadow_pass.value=A.map.depthTexture,u.uniforms.resolution.value=A.mapSize,u.uniforms.radius.value=A.radius,t.setRenderTarget(A.mapPass),t.clear(),t.renderBufferDirect(P,null,v,u,S,null),m.uniforms.shadow_pass.value=A.mapPass.texture,m.uniforms.resolution.value=A.mapSize,m.uniforms.radius.value=A.radius,t.setRenderTarget(A.map),t.clear(),t.renderBufferDirect(P,null,v,m,S,null)}function y(A,P,v,T){let H=null;const R=v.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(R!==void 0)H=R;else if(H=v.isPointLight===!0?c:o,t.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const B=H.uuid,z=P.uuid;let q=l[B];q===void 0&&(q={},l[B]=q);let k=q[z];k===void 0&&(k=H.clone(),q[z]=k,P.addEventListener("dispose",w)),H=k}if(H.visible=P.visible,H.wireframe=P.wireframe,T===qs?H.side=P.shadowSide!==null?P.shadowSide:P.side:H.side=P.shadowSide!==null?P.shadowSide:f[P.side],H.alphaMap=P.alphaMap,H.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,H.map=P.map,H.clipShadows=P.clipShadows,H.clippingPlanes=P.clippingPlanes,H.clipIntersection=P.clipIntersection,H.displacementMap=P.displacementMap,H.displacementScale=P.displacementScale,H.displacementBias=P.displacementBias,H.wireframeLinewidth=P.wireframeLinewidth,H.linewidth=P.linewidth,v.isPointLight===!0&&H.isMeshDistanceMaterial===!0){const B=t.properties.get(H);B.light=v}return H}function E(A,P,v,T,H){if(A.visible===!1)return;if(A.layers.test(P.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&H===qs)&&(!A.frustumCulled||i.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,A.matrixWorld);const z=e.update(A),q=A.material;if(Array.isArray(q)){const k=z.groups;for(let G=0,N=k.length;G<N;G++){const Q=k[G],$=q[Q.materialIndex];if($&&$.visible){const le=y(A,$,T,H);A.onBeforeShadow(t,A,P,v,z,le,Q),t.renderBufferDirect(v,null,z,le,A,Q),A.onAfterShadow(t,A,P,v,z,le,Q)}}}else if(q.visible){const k=y(A,q,T,H);A.onBeforeShadow(t,A,P,v,z,k,null),t.renderBufferDirect(v,null,z,k,A,null),A.onAfterShadow(t,A,P,v,z,k,null)}}const B=A.children;for(let z=0,q=B.length;z<q;z++)E(B[z],P,v,T,H)}function w(A){A.target.removeEventListener("dispose",w);for(const v in l){const T=l[v],H=A.target.uuid;H in T&&(T[H].dispose(),delete T[H])}}}function t3(t,e){function n(){let L=!1;const re=new bt;let te=null;const de=new bt(0,0,0,0);return{setMask:function(J){te!==J&&!L&&(t.colorMask(J,J,J,J),te=J)},setLocked:function(J){L=J},setClear:function(J,W,ve,Ue,ft){ft===!0&&(J*=Ue,W*=Ue,ve*=Ue),re.set(J,W,ve,Ue),de.equals(re)===!1&&(t.clearColor(J,W,ve,Ue),de.copy(re))},reset:function(){L=!1,te=null,de.set(-1,0,0,0)}}}function i(){let L=!1,re=!1,te=null,de=null,J=null;return{setReversed:function(W){if(re!==W){const ve=e.get("EXT_clip_control");W?ve.clipControlEXT(ve.LOWER_LEFT_EXT,ve.ZERO_TO_ONE_EXT):ve.clipControlEXT(ve.LOWER_LEFT_EXT,ve.NEGATIVE_ONE_TO_ONE_EXT),re=W;const Ue=J;J=null,this.setClear(Ue)}},getReversed:function(){return re},setTest:function(W){W?ne(t.DEPTH_TEST):se(t.DEPTH_TEST)},setMask:function(W){te!==W&&!L&&(t.depthMask(W),te=W)},setFunc:function(W){if(re&&(W=Ng[W]),de!==W){switch(W){case al:t.depthFunc(t.NEVER);break;case ol:t.depthFunc(t.ALWAYS);break;case cl:t.depthFunc(t.LESS);break;case is:t.depthFunc(t.LEQUAL);break;case ll:t.depthFunc(t.EQUAL);break;case ul:t.depthFunc(t.GEQUAL);break;case hl:t.depthFunc(t.GREATER);break;case fl:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}de=W}},setLocked:function(W){L=W},setClear:function(W){J!==W&&(J=W,re&&(W=1-W),t.clearDepth(W))},reset:function(){L=!1,te=null,de=null,J=null,re=!1}}}function r(){let L=!1,re=null,te=null,de=null,J=null,W=null,ve=null,Ue=null,ft=null;return{setTest:function(it){L||(it?ne(t.STENCIL_TEST):se(t.STENCIL_TEST))},setMask:function(it){re!==it&&!L&&(t.stencilMask(it),re=it)},setFunc:function(it,vi,xi){(te!==it||de!==vi||J!==xi)&&(t.stencilFunc(it,vi,xi),te=it,de=vi,J=xi)},setOp:function(it,vi,xi){(W!==it||ve!==vi||Ue!==xi)&&(t.stencilOp(it,vi,xi),W=it,ve=vi,Ue=xi)},setLocked:function(it){L=it},setClear:function(it){ft!==it&&(t.clearStencil(it),ft=it)},reset:function(){L=!1,re=null,te=null,de=null,J=null,W=null,ve=null,Ue=null,ft=null}}}const s=new n,a=new i,o=new r,c=new WeakMap,l=new WeakMap;let h={},f={},u=new WeakMap,m=[],_=null,S=!1,p=null,d=null,x=null,y=null,E=null,w=null,A=null,P=new We(0,0,0),v=0,T=!1,H=null,R=null,B=null,z=null,q=null;const k=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,N=0;const Q=t.getParameter(t.VERSION);Q.indexOf("WebGL")!==-1?(N=parseFloat(/^WebGL (\d)/.exec(Q)[1]),G=N>=1):Q.indexOf("OpenGL ES")!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),G=N>=2);let $=null,le={};const me=t.getParameter(t.SCISSOR_BOX),he=t.getParameter(t.VIEWPORT),ke=new bt().fromArray(me),pt=new bt().fromArray(he);function dt(L,re,te,de){const J=new Uint8Array(4),W=t.createTexture();t.bindTexture(L,W),t.texParameteri(L,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(L,t.TEXTURE_MAG_FILTER,t.NEAREST);for(let ve=0;ve<te;ve++)L===t.TEXTURE_3D||L===t.TEXTURE_2D_ARRAY?t.texImage3D(re,0,t.RGBA,1,1,de,0,t.RGBA,t.UNSIGNED_BYTE,J):t.texImage2D(re+ve,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,J);return W}const j={};j[t.TEXTURE_2D]=dt(t.TEXTURE_2D,t.TEXTURE_2D,1),j[t.TEXTURE_CUBE_MAP]=dt(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[t.TEXTURE_2D_ARRAY]=dt(t.TEXTURE_2D_ARRAY,t.TEXTURE_2D_ARRAY,1,1),j[t.TEXTURE_3D]=dt(t.TEXTURE_3D,t.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ne(t.DEPTH_TEST),a.setFunc(is),Ve(!1),wt(zh),ne(t.CULL_FACE),nt(Ci);function ne(L){h[L]!==!0&&(t.enable(L),h[L]=!0)}function se(L){h[L]!==!1&&(t.disable(L),h[L]=!1)}function Oe(L,re){return f[L]!==re?(t.bindFramebuffer(L,re),f[L]=re,L===t.DRAW_FRAMEBUFFER&&(f[t.FRAMEBUFFER]=re),L===t.FRAMEBUFFER&&(f[t.DRAW_FRAMEBUFFER]=re),!0):!1}function Le(L,re){let te=m,de=!1;if(L){te=u.get(re),te===void 0&&(te=[],u.set(re,te));const J=L.textures;if(te.length!==J.length||te[0]!==t.COLOR_ATTACHMENT0){for(let W=0,ve=J.length;W<ve;W++)te[W]=t.COLOR_ATTACHMENT0+W;te.length=J.length,de=!0}}else te[0]!==t.BACK&&(te[0]=t.BACK,de=!0);de&&t.drawBuffers(te)}function De(L){return _!==L?(t.useProgram(L),_=L,!0):!1}const Vt={[pr]:t.FUNC_ADD,[rg]:t.FUNC_SUBTRACT,[sg]:t.FUNC_REVERSE_SUBTRACT};Vt[ag]=t.MIN,Vt[og]=t.MAX;const je={[cg]:t.ZERO,[lg]:t.ONE,[ug]:t.SRC_COLOR,[rl]:t.SRC_ALPHA,[gg]:t.SRC_ALPHA_SATURATE,[pg]:t.DST_COLOR,[fg]:t.DST_ALPHA,[hg]:t.ONE_MINUS_SRC_COLOR,[sl]:t.ONE_MINUS_SRC_ALPHA,[mg]:t.ONE_MINUS_DST_COLOR,[dg]:t.ONE_MINUS_DST_ALPHA,[_g]:t.CONSTANT_COLOR,[vg]:t.ONE_MINUS_CONSTANT_COLOR,[xg]:t.CONSTANT_ALPHA,[Mg]:t.ONE_MINUS_CONSTANT_ALPHA};function nt(L,re,te,de,J,W,ve,Ue,ft,it){if(L===Ci){S===!0&&(se(t.BLEND),S=!1);return}if(S===!1&&(ne(t.BLEND),S=!0),L!==ig){if(L!==p||it!==T){if((d!==pr||E!==pr)&&(t.blendEquation(t.FUNC_ADD),d=pr,E=pr),it)switch(L){case Jr:t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Vh:t.blendFunc(t.ONE,t.ONE);break;case Gh:t.blendFuncSeparate(t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ZERO,t.ONE);break;case Hh:t.blendFuncSeparate(t.DST_COLOR,t.ONE_MINUS_SRC_ALPHA,t.ZERO,t.ONE);break;default:Je("WebGLState: Invalid blending: ",L);break}else switch(L){case Jr:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA);break;case Vh:t.blendFuncSeparate(t.SRC_ALPHA,t.ONE,t.ONE,t.ONE);break;case Gh:Je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Hh:Je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Je("WebGLState: Invalid blending: ",L);break}x=null,y=null,w=null,A=null,P.set(0,0,0),v=0,p=L,T=it}return}J=J||re,W=W||te,ve=ve||de,(re!==d||J!==E)&&(t.blendEquationSeparate(Vt[re],Vt[J]),d=re,E=J),(te!==x||de!==y||W!==w||ve!==A)&&(t.blendFuncSeparate(je[te],je[de],je[W],je[ve]),x=te,y=de,w=W,A=ve),(Ue.equals(P)===!1||ft!==v)&&(t.blendColor(Ue.r,Ue.g,Ue.b,ft),P.copy(Ue),v=ft),p=L,T=!1}function ct(L,re){L.side===Ai?se(t.CULL_FACE):ne(t.CULL_FACE);let te=L.side===dn;re&&(te=!te),Ve(te),L.blending===Jr&&L.transparent===!1?nt(Ci):nt(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),s.setMask(L.colorWrite);const de=L.stencilWrite;o.setTest(de),de&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Pt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ne(t.SAMPLE_ALPHA_TO_COVERAGE):se(t.SAMPLE_ALPHA_TO_COVERAGE)}function Ve(L){H!==L&&(L?t.frontFace(t.CW):t.frontFace(t.CCW),H=L)}function wt(L){L!==eg?(ne(t.CULL_FACE),L!==R&&(L===zh?t.cullFace(t.BACK):L===tg?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):se(t.CULL_FACE),R=L}function C(L){L!==B&&(G&&t.lineWidth(L),B=L)}function Pt(L,re,te){L?(ne(t.POLYGON_OFFSET_FILL),(z!==re||q!==te)&&(z=re,q=te,a.getReversed()&&(re=-re),t.polygonOffset(re,te))):se(t.POLYGON_OFFSET_FILL)}function tt(L){L?ne(t.SCISSOR_TEST):se(t.SCISSOR_TEST)}function ht(L){L===void 0&&(L=t.TEXTURE0+k-1),$!==L&&(t.activeTexture(L),$=L)}function Se(L,re,te){te===void 0&&($===null?te=t.TEXTURE0+k-1:te=$);let de=le[te];de===void 0&&(de={type:void 0,texture:void 0},le[te]=de),(de.type!==L||de.texture!==re)&&($!==te&&(t.activeTexture(te),$=te),t.bindTexture(L,re||j[L]),de.type=L,de.texture=re)}function b(){const L=le[$];L!==void 0&&L.type!==void 0&&(t.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function g(){try{t.compressedTexImage2D(...arguments)}catch(L){Je("WebGLState:",L)}}function I(){try{t.compressedTexImage3D(...arguments)}catch(L){Je("WebGLState:",L)}}function Y(){try{t.texSubImage2D(...arguments)}catch(L){Je("WebGLState:",L)}}function K(){try{t.texSubImage3D(...arguments)}catch(L){Je("WebGLState:",L)}}function X(){try{t.compressedTexSubImage2D(...arguments)}catch(L){Je("WebGLState:",L)}}function ge(){try{t.compressedTexSubImage3D(...arguments)}catch(L){Je("WebGLState:",L)}}function ie(){try{t.texStorage2D(...arguments)}catch(L){Je("WebGLState:",L)}}function Ce(){try{t.texStorage3D(...arguments)}catch(L){Je("WebGLState:",L)}}function Ie(){try{t.texImage2D(...arguments)}catch(L){Je("WebGLState:",L)}}function Z(){try{t.texImage3D(...arguments)}catch(L){Je("WebGLState:",L)}}function ee(L){ke.equals(L)===!1&&(t.scissor(L.x,L.y,L.z,L.w),ke.copy(L))}function _e(L){pt.equals(L)===!1&&(t.viewport(L.x,L.y,L.z,L.w),pt.copy(L))}function xe(L,re){let te=l.get(re);te===void 0&&(te=new WeakMap,l.set(re,te));let de=te.get(L);de===void 0&&(de=t.getUniformBlockIndex(re,L.name),te.set(L,de))}function ue(L,re){const de=l.get(re).get(L);c.get(re)!==de&&(t.uniformBlockBinding(re,de,L.__bindingPointIndex),c.set(re,de))}function Ge(){t.disable(t.BLEND),t.disable(t.CULL_FACE),t.disable(t.DEPTH_TEST),t.disable(t.POLYGON_OFFSET_FILL),t.disable(t.SCISSOR_TEST),t.disable(t.STENCIL_TEST),t.disable(t.SAMPLE_ALPHA_TO_COVERAGE),t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ONE,t.ZERO),t.blendFuncSeparate(t.ONE,t.ZERO,t.ONE,t.ZERO),t.blendColor(0,0,0,0),t.colorMask(!0,!0,!0,!0),t.clearColor(0,0,0,0),t.depthMask(!0),t.depthFunc(t.LESS),a.setReversed(!1),t.clearDepth(1),t.stencilMask(4294967295),t.stencilFunc(t.ALWAYS,0,4294967295),t.stencilOp(t.KEEP,t.KEEP,t.KEEP),t.clearStencil(0),t.cullFace(t.BACK),t.frontFace(t.CCW),t.polygonOffset(0,0),t.activeTexture(t.TEXTURE0),t.bindFramebuffer(t.FRAMEBUFFER,null),t.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),t.bindFramebuffer(t.READ_FRAMEBUFFER,null),t.useProgram(null),t.lineWidth(1),t.scissor(0,0,t.canvas.width,t.canvas.height),t.viewport(0,0,t.canvas.width,t.canvas.height),h={},$=null,le={},f={},u=new WeakMap,m=[],_=null,S=!1,p=null,d=null,x=null,y=null,E=null,w=null,A=null,P=new We(0,0,0),v=0,T=!1,H=null,R=null,B=null,z=null,q=null,ke.set(0,0,t.canvas.width,t.canvas.height),pt.set(0,0,t.canvas.width,t.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:ne,disable:se,bindFramebuffer:Oe,drawBuffers:Le,useProgram:De,setBlending:nt,setMaterial:ct,setFlipSided:Ve,setCullFace:wt,setLineWidth:C,setPolygonOffset:Pt,setScissorTest:tt,activeTexture:ht,bindTexture:Se,unbindTexture:b,compressedTexImage2D:g,compressedTexImage3D:I,texImage2D:Ie,texImage3D:Z,updateUBOMapping:xe,uniformBlockBinding:ue,texStorage2D:ie,texStorage3D:Ce,texSubImage2D:Y,texSubImage3D:K,compressedTexSubImage2D:X,compressedTexSubImage3D:ge,scissor:ee,viewport:_e,reset:Ge}}function n3(t,e,n,i,r,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ye,h=new WeakMap;let f;const u=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(b,g){return m?new OffscreenCanvas(b,g):mo("canvas")}function S(b,g,I){let Y=1;const K=Se(b);if((K.width>I||K.height>I)&&(Y=I/Math.max(K.width,K.height)),Y<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const X=Math.floor(Y*K.width),ge=Math.floor(Y*K.height);f===void 0&&(f=_(X,ge));const ie=g?_(X,ge):f;return ie.width=X,ie.height=ge,ie.getContext("2d").drawImage(b,0,0,X,ge),Ne("WebGLRenderer: Texture has been resized from ("+K.width+"x"+K.height+") to ("+X+"x"+ge+")."),ie}else return"data"in b&&Ne("WebGLRenderer: Image in DataTexture is too big ("+K.width+"x"+K.height+")."),b;return b}function p(b){return b.generateMipmaps}function d(b){t.generateMipmap(b)}function x(b){return b.isWebGLCubeRenderTarget?t.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?t.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?t.TEXTURE_2D_ARRAY:t.TEXTURE_2D}function y(b,g,I,Y,K=!1){if(b!==null){if(t[b]!==void 0)return t[b];Ne("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let X=g;if(g===t.RED&&(I===t.FLOAT&&(X=t.R32F),I===t.HALF_FLOAT&&(X=t.R16F),I===t.UNSIGNED_BYTE&&(X=t.R8)),g===t.RED_INTEGER&&(I===t.UNSIGNED_BYTE&&(X=t.R8UI),I===t.UNSIGNED_SHORT&&(X=t.R16UI),I===t.UNSIGNED_INT&&(X=t.R32UI),I===t.BYTE&&(X=t.R8I),I===t.SHORT&&(X=t.R16I),I===t.INT&&(X=t.R32I)),g===t.RG&&(I===t.FLOAT&&(X=t.RG32F),I===t.HALF_FLOAT&&(X=t.RG16F),I===t.UNSIGNED_BYTE&&(X=t.RG8)),g===t.RG_INTEGER&&(I===t.UNSIGNED_BYTE&&(X=t.RG8UI),I===t.UNSIGNED_SHORT&&(X=t.RG16UI),I===t.UNSIGNED_INT&&(X=t.RG32UI),I===t.BYTE&&(X=t.RG8I),I===t.SHORT&&(X=t.RG16I),I===t.INT&&(X=t.RG32I)),g===t.RGB_INTEGER&&(I===t.UNSIGNED_BYTE&&(X=t.RGB8UI),I===t.UNSIGNED_SHORT&&(X=t.RGB16UI),I===t.UNSIGNED_INT&&(X=t.RGB32UI),I===t.BYTE&&(X=t.RGB8I),I===t.SHORT&&(X=t.RGB16I),I===t.INT&&(X=t.RGB32I)),g===t.RGBA_INTEGER&&(I===t.UNSIGNED_BYTE&&(X=t.RGBA8UI),I===t.UNSIGNED_SHORT&&(X=t.RGBA16UI),I===t.UNSIGNED_INT&&(X=t.RGBA32UI),I===t.BYTE&&(X=t.RGBA8I),I===t.SHORT&&(X=t.RGBA16I),I===t.INT&&(X=t.RGBA32I)),g===t.RGB&&(I===t.UNSIGNED_INT_5_9_9_9_REV&&(X=t.RGB9_E5),I===t.UNSIGNED_INT_10F_11F_11F_REV&&(X=t.R11F_G11F_B10F)),g===t.RGBA){const ge=K?po:Ke.getTransfer(Y);I===t.FLOAT&&(X=t.RGBA32F),I===t.HALF_FLOAT&&(X=t.RGBA16F),I===t.UNSIGNED_BYTE&&(X=ge===rt?t.SRGB8_ALPHA8:t.RGBA8),I===t.UNSIGNED_SHORT_4_4_4_4&&(X=t.RGBA4),I===t.UNSIGNED_SHORT_5_5_5_1&&(X=t.RGB5_A1)}return(X===t.R16F||X===t.R32F||X===t.RG16F||X===t.RG32F||X===t.RGBA16F||X===t.RGBA32F)&&e.get("EXT_color_buffer_float"),X}function E(b,g){let I;return b?g===null||g===li||g===ra?I=t.DEPTH24_STENCIL8:g===ii?I=t.DEPTH32F_STENCIL8:g===ia&&(I=t.DEPTH24_STENCIL8,Ne("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):g===null||g===li||g===ra?I=t.DEPTH_COMPONENT24:g===ii?I=t.DEPTH_COMPONENT32F:g===ia&&(I=t.DEPTH_COMPONENT16),I}function w(b,g){return p(b)===!0||b.isFramebufferTexture&&b.minFilter!==jt&&b.minFilter!==en?Math.log2(Math.max(g.width,g.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?g.mipmaps.length:1}function A(b){const g=b.target;g.removeEventListener("dispose",A),v(g),g.isVideoTexture&&h.delete(g)}function P(b){const g=b.target;g.removeEventListener("dispose",P),H(g)}function v(b){const g=i.get(b);if(g.__webglInit===void 0)return;const I=b.source,Y=u.get(I);if(Y){const K=Y[g.__cacheKey];K.usedTimes--,K.usedTimes===0&&T(b),Object.keys(Y).length===0&&u.delete(I)}i.remove(b)}function T(b){const g=i.get(b);t.deleteTexture(g.__webglTexture);const I=b.source,Y=u.get(I);delete Y[g.__cacheKey],a.memory.textures--}function H(b){const g=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(g.__webglFramebuffer[Y]))for(let K=0;K<g.__webglFramebuffer[Y].length;K++)t.deleteFramebuffer(g.__webglFramebuffer[Y][K]);else t.deleteFramebuffer(g.__webglFramebuffer[Y]);g.__webglDepthbuffer&&t.deleteRenderbuffer(g.__webglDepthbuffer[Y])}else{if(Array.isArray(g.__webglFramebuffer))for(let Y=0;Y<g.__webglFramebuffer.length;Y++)t.deleteFramebuffer(g.__webglFramebuffer[Y]);else t.deleteFramebuffer(g.__webglFramebuffer);if(g.__webglDepthbuffer&&t.deleteRenderbuffer(g.__webglDepthbuffer),g.__webglMultisampledFramebuffer&&t.deleteFramebuffer(g.__webglMultisampledFramebuffer),g.__webglColorRenderbuffer)for(let Y=0;Y<g.__webglColorRenderbuffer.length;Y++)g.__webglColorRenderbuffer[Y]&&t.deleteRenderbuffer(g.__webglColorRenderbuffer[Y]);g.__webglDepthRenderbuffer&&t.deleteRenderbuffer(g.__webglDepthRenderbuffer)}const I=b.textures;for(let Y=0,K=I.length;Y<K;Y++){const X=i.get(I[Y]);X.__webglTexture&&(t.deleteTexture(X.__webglTexture),a.memory.textures--),i.remove(I[Y])}i.remove(b)}let R=0;function B(){R=0}function z(){const b=R;return b>=r.maxTextures&&Ne("WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),R+=1,b}function q(b){const g=[];return g.push(b.wrapS),g.push(b.wrapT),g.push(b.wrapR||0),g.push(b.magFilter),g.push(b.minFilter),g.push(b.anisotropy),g.push(b.internalFormat),g.push(b.format),g.push(b.type),g.push(b.generateMipmaps),g.push(b.premultiplyAlpha),g.push(b.flipY),g.push(b.unpackAlignment),g.push(b.colorSpace),g.join()}function k(b,g){const I=i.get(b);if(b.isVideoTexture&&tt(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&I.__version!==b.version){const Y=b.image;if(Y===null)Ne("WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)Ne("WebGLRenderer: Texture marked for update but image is incomplete");else{j(I,b,g);return}}else b.isExternalTexture&&(I.__webglTexture=b.sourceTexture?b.sourceTexture:null);n.bindTexture(t.TEXTURE_2D,I.__webglTexture,t.TEXTURE0+g)}function G(b,g){const I=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&I.__version!==b.version){j(I,b,g);return}else b.isExternalTexture&&(I.__webglTexture=b.sourceTexture?b.sourceTexture:null);n.bindTexture(t.TEXTURE_2D_ARRAY,I.__webglTexture,t.TEXTURE0+g)}function N(b,g){const I=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&I.__version!==b.version){j(I,b,g);return}n.bindTexture(t.TEXTURE_3D,I.__webglTexture,t.TEXTURE0+g)}function Q(b,g){const I=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&I.__version!==b.version){ne(I,b,g);return}n.bindTexture(t.TEXTURE_CUBE_MAP,I.__webglTexture,t.TEXTURE0+g)}const $={[dl]:t.REPEAT,[Ri]:t.CLAMP_TO_EDGE,[pl]:t.MIRRORED_REPEAT},le={[jt]:t.NEAREST,[yg]:t.NEAREST_MIPMAP_NEAREST,[ba]:t.NEAREST_MIPMAP_LINEAR,[en]:t.LINEAR,[uc]:t.LINEAR_MIPMAP_NEAREST,[gr]:t.LINEAR_MIPMAP_LINEAR},me={[Ag]:t.NEVER,[Lg]:t.ALWAYS,[wg]:t.LESS,[Tu]:t.LEQUAL,[Rg]:t.EQUAL,[bu]:t.GEQUAL,[Cg]:t.GREATER,[Pg]:t.NOTEQUAL};function he(b,g){if(g.type===ii&&e.has("OES_texture_float_linear")===!1&&(g.magFilter===en||g.magFilter===uc||g.magFilter===ba||g.magFilter===gr||g.minFilter===en||g.minFilter===uc||g.minFilter===ba||g.minFilter===gr)&&Ne("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),t.texParameteri(b,t.TEXTURE_WRAP_S,$[g.wrapS]),t.texParameteri(b,t.TEXTURE_WRAP_T,$[g.wrapT]),(b===t.TEXTURE_3D||b===t.TEXTURE_2D_ARRAY)&&t.texParameteri(b,t.TEXTURE_WRAP_R,$[g.wrapR]),t.texParameteri(b,t.TEXTURE_MAG_FILTER,le[g.magFilter]),t.texParameteri(b,t.TEXTURE_MIN_FILTER,le[g.minFilter]),g.compareFunction&&(t.texParameteri(b,t.TEXTURE_COMPARE_MODE,t.COMPARE_REF_TO_TEXTURE),t.texParameteri(b,t.TEXTURE_COMPARE_FUNC,me[g.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(g.magFilter===jt||g.minFilter!==ba&&g.minFilter!==gr||g.type===ii&&e.has("OES_texture_float_linear")===!1)return;if(g.anisotropy>1||i.get(g).__currentAnisotropy){const I=e.get("EXT_texture_filter_anisotropic");t.texParameterf(b,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(g.anisotropy,r.getMaxAnisotropy())),i.get(g).__currentAnisotropy=g.anisotropy}}}function ke(b,g){let I=!1;b.__webglInit===void 0&&(b.__webglInit=!0,g.addEventListener("dispose",A));const Y=g.source;let K=u.get(Y);K===void 0&&(K={},u.set(Y,K));const X=q(g);if(X!==b.__cacheKey){K[X]===void 0&&(K[X]={texture:t.createTexture(),usedTimes:0},a.memory.textures++,I=!0),K[X].usedTimes++;const ge=K[b.__cacheKey];ge!==void 0&&(K[b.__cacheKey].usedTimes--,ge.usedTimes===0&&T(g)),b.__cacheKey=X,b.__webglTexture=K[X].texture}return I}function pt(b,g,I){return Math.floor(Math.floor(b/I)/g)}function dt(b,g,I,Y){const X=b.updateRanges;if(X.length===0)n.texSubImage2D(t.TEXTURE_2D,0,0,0,g.width,g.height,I,Y,g.data);else{X.sort((Z,ee)=>Z.start-ee.start);let ge=0;for(let Z=1;Z<X.length;Z++){const ee=X[ge],_e=X[Z],xe=ee.start+ee.count,ue=pt(_e.start,g.width,4),Ge=pt(ee.start,g.width,4);_e.start<=xe+1&&ue===Ge&&pt(_e.start+_e.count-1,g.width,4)===ue?ee.count=Math.max(ee.count,_e.start+_e.count-ee.start):(++ge,X[ge]=_e)}X.length=ge+1;const ie=t.getParameter(t.UNPACK_ROW_LENGTH),Ce=t.getParameter(t.UNPACK_SKIP_PIXELS),Ie=t.getParameter(t.UNPACK_SKIP_ROWS);t.pixelStorei(t.UNPACK_ROW_LENGTH,g.width);for(let Z=0,ee=X.length;Z<ee;Z++){const _e=X[Z],xe=Math.floor(_e.start/4),ue=Math.ceil(_e.count/4),Ge=xe%g.width,L=Math.floor(xe/g.width),re=ue,te=1;t.pixelStorei(t.UNPACK_SKIP_PIXELS,Ge),t.pixelStorei(t.UNPACK_SKIP_ROWS,L),n.texSubImage2D(t.TEXTURE_2D,0,Ge,L,re,te,I,Y,g.data)}b.clearUpdateRanges(),t.pixelStorei(t.UNPACK_ROW_LENGTH,ie),t.pixelStorei(t.UNPACK_SKIP_PIXELS,Ce),t.pixelStorei(t.UNPACK_SKIP_ROWS,Ie)}}function j(b,g,I){let Y=t.TEXTURE_2D;(g.isDataArrayTexture||g.isCompressedArrayTexture)&&(Y=t.TEXTURE_2D_ARRAY),g.isData3DTexture&&(Y=t.TEXTURE_3D);const K=ke(b,g),X=g.source;n.bindTexture(Y,b.__webglTexture,t.TEXTURE0+I);const ge=i.get(X);if(X.version!==ge.__version||K===!0){n.activeTexture(t.TEXTURE0+I);const ie=Ke.getPrimaries(Ke.workingColorSpace),Ce=g.colorSpace===Ki?null:Ke.getPrimaries(g.colorSpace),Ie=g.colorSpace===Ki||ie===Ce?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,g.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie);let Z=S(g.image,!1,r.maxTextureSize);Z=ht(g,Z);const ee=s.convert(g.format,g.colorSpace),_e=s.convert(g.type);let xe=y(g.internalFormat,ee,_e,g.colorSpace,g.isVideoTexture);he(Y,g);let ue;const Ge=g.mipmaps,L=g.isVideoTexture!==!0,re=ge.__version===void 0||K===!0,te=X.dataReady,de=w(g,Z);if(g.isDepthTexture)xe=E(g.format===_r,g.type),re&&(L?n.texStorage2D(t.TEXTURE_2D,1,xe,Z.width,Z.height):n.texImage2D(t.TEXTURE_2D,0,xe,Z.width,Z.height,0,ee,_e,null));else if(g.isDataTexture)if(Ge.length>0){L&&re&&n.texStorage2D(t.TEXTURE_2D,de,xe,Ge[0].width,Ge[0].height);for(let J=0,W=Ge.length;J<W;J++)ue=Ge[J],L?te&&n.texSubImage2D(t.TEXTURE_2D,J,0,0,ue.width,ue.height,ee,_e,ue.data):n.texImage2D(t.TEXTURE_2D,J,xe,ue.width,ue.height,0,ee,_e,ue.data);g.generateMipmaps=!1}else L?(re&&n.texStorage2D(t.TEXTURE_2D,de,xe,Z.width,Z.height),te&&dt(g,Z,ee,_e)):n.texImage2D(t.TEXTURE_2D,0,xe,Z.width,Z.height,0,ee,_e,Z.data);else if(g.isCompressedTexture)if(g.isCompressedArrayTexture){L&&re&&n.texStorage3D(t.TEXTURE_2D_ARRAY,de,xe,Ge[0].width,Ge[0].height,Z.depth);for(let J=0,W=Ge.length;J<W;J++)if(ue=Ge[J],g.format!==qn)if(ee!==null)if(L){if(te)if(g.layerUpdates.size>0){const ve=gf(ue.width,ue.height,g.format,g.type);for(const Ue of g.layerUpdates){const ft=ue.data.subarray(Ue*ve/ue.data.BYTES_PER_ELEMENT,(Ue+1)*ve/ue.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,J,0,0,Ue,ue.width,ue.height,1,ee,ft)}g.clearLayerUpdates()}else n.compressedTexSubImage3D(t.TEXTURE_2D_ARRAY,J,0,0,0,ue.width,ue.height,Z.depth,ee,ue.data)}else n.compressedTexImage3D(t.TEXTURE_2D_ARRAY,J,xe,ue.width,ue.height,Z.depth,0,ue.data,0,0);else Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?te&&n.texSubImage3D(t.TEXTURE_2D_ARRAY,J,0,0,0,ue.width,ue.height,Z.depth,ee,_e,ue.data):n.texImage3D(t.TEXTURE_2D_ARRAY,J,xe,ue.width,ue.height,Z.depth,0,ee,_e,ue.data)}else{L&&re&&n.texStorage2D(t.TEXTURE_2D,de,xe,Ge[0].width,Ge[0].height);for(let J=0,W=Ge.length;J<W;J++)ue=Ge[J],g.format!==qn?ee!==null?L?te&&n.compressedTexSubImage2D(t.TEXTURE_2D,J,0,0,ue.width,ue.height,ee,ue.data):n.compressedTexImage2D(t.TEXTURE_2D,J,xe,ue.width,ue.height,0,ue.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?te&&n.texSubImage2D(t.TEXTURE_2D,J,0,0,ue.width,ue.height,ee,_e,ue.data):n.texImage2D(t.TEXTURE_2D,J,xe,ue.width,ue.height,0,ee,_e,ue.data)}else if(g.isDataArrayTexture)if(L){if(re&&n.texStorage3D(t.TEXTURE_2D_ARRAY,de,xe,Z.width,Z.height,Z.depth),te)if(g.layerUpdates.size>0){const J=gf(Z.width,Z.height,g.format,g.type);for(const W of g.layerUpdates){const ve=Z.data.subarray(W*J/Z.data.BYTES_PER_ELEMENT,(W+1)*J/Z.data.BYTES_PER_ELEMENT);n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,W,Z.width,Z.height,1,ee,_e,ve)}g.clearLayerUpdates()}else n.texSubImage3D(t.TEXTURE_2D_ARRAY,0,0,0,0,Z.width,Z.height,Z.depth,ee,_e,Z.data)}else n.texImage3D(t.TEXTURE_2D_ARRAY,0,xe,Z.width,Z.height,Z.depth,0,ee,_e,Z.data);else if(g.isData3DTexture)L?(re&&n.texStorage3D(t.TEXTURE_3D,de,xe,Z.width,Z.height,Z.depth),te&&n.texSubImage3D(t.TEXTURE_3D,0,0,0,0,Z.width,Z.height,Z.depth,ee,_e,Z.data)):n.texImage3D(t.TEXTURE_3D,0,xe,Z.width,Z.height,Z.depth,0,ee,_e,Z.data);else if(g.isFramebufferTexture){if(re)if(L)n.texStorage2D(t.TEXTURE_2D,de,xe,Z.width,Z.height);else{let J=Z.width,W=Z.height;for(let ve=0;ve<de;ve++)n.texImage2D(t.TEXTURE_2D,ve,xe,J,W,0,ee,_e,null),J>>=1,W>>=1}}else if(Ge.length>0){if(L&&re){const J=Se(Ge[0]);n.texStorage2D(t.TEXTURE_2D,de,xe,J.width,J.height)}for(let J=0,W=Ge.length;J<W;J++)ue=Ge[J],L?te&&n.texSubImage2D(t.TEXTURE_2D,J,0,0,ee,_e,ue):n.texImage2D(t.TEXTURE_2D,J,xe,ee,_e,ue);g.generateMipmaps=!1}else if(L){if(re){const J=Se(Z);n.texStorage2D(t.TEXTURE_2D,de,xe,J.width,J.height)}te&&n.texSubImage2D(t.TEXTURE_2D,0,0,0,ee,_e,Z)}else n.texImage2D(t.TEXTURE_2D,0,xe,ee,_e,Z);p(g)&&d(Y),ge.__version=X.version,g.onUpdate&&g.onUpdate(g)}b.__version=g.version}function ne(b,g,I){if(g.image.length!==6)return;const Y=ke(b,g),K=g.source;n.bindTexture(t.TEXTURE_CUBE_MAP,b.__webglTexture,t.TEXTURE0+I);const X=i.get(K);if(K.version!==X.__version||Y===!0){n.activeTexture(t.TEXTURE0+I);const ge=Ke.getPrimaries(Ke.workingColorSpace),ie=g.colorSpace===Ki?null:Ke.getPrimaries(g.colorSpace),Ce=g.colorSpace===Ki||ge===ie?t.NONE:t.BROWSER_DEFAULT_WEBGL;t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,g.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,g.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,g.unpackAlignment),t.pixelStorei(t.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ce);const Ie=g.isCompressedTexture||g.image[0].isCompressedTexture,Z=g.image[0]&&g.image[0].isDataTexture,ee=[];for(let W=0;W<6;W++)!Ie&&!Z?ee[W]=S(g.image[W],!0,r.maxCubemapSize):ee[W]=Z?g.image[W].image:g.image[W],ee[W]=ht(g,ee[W]);const _e=ee[0],xe=s.convert(g.format,g.colorSpace),ue=s.convert(g.type),Ge=y(g.internalFormat,xe,ue,g.colorSpace),L=g.isVideoTexture!==!0,re=X.__version===void 0||Y===!0,te=K.dataReady;let de=w(g,_e);he(t.TEXTURE_CUBE_MAP,g);let J;if(Ie){L&&re&&n.texStorage2D(t.TEXTURE_CUBE_MAP,de,Ge,_e.width,_e.height);for(let W=0;W<6;W++){J=ee[W].mipmaps;for(let ve=0;ve<J.length;ve++){const Ue=J[ve];g.format!==qn?xe!==null?L?te&&n.compressedTexSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,ve,0,0,Ue.width,Ue.height,xe,Ue.data):n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,ve,Ge,Ue.width,Ue.height,0,Ue.data):Ne("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,ve,0,0,Ue.width,Ue.height,xe,ue,Ue.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,ve,Ge,Ue.width,Ue.height,0,xe,ue,Ue.data)}}}else{if(J=g.mipmaps,L&&re){J.length>0&&de++;const W=Se(ee[0]);n.texStorage2D(t.TEXTURE_CUBE_MAP,de,Ge,W.width,W.height)}for(let W=0;W<6;W++)if(Z){L?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,ee[W].width,ee[W].height,xe,ue,ee[W].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Ge,ee[W].width,ee[W].height,0,xe,ue,ee[W].data);for(let ve=0;ve<J.length;ve++){const ft=J[ve].image[W].image;L?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,ve+1,0,0,ft.width,ft.height,xe,ue,ft.data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,ve+1,Ge,ft.width,ft.height,0,xe,ue,ft.data)}}else{L?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,0,0,xe,ue,ee[W]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,0,Ge,xe,ue,ee[W]);for(let ve=0;ve<J.length;ve++){const Ue=J[ve];L?te&&n.texSubImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,ve+1,0,0,xe,ue,Ue.image[W]):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+W,ve+1,Ge,xe,ue,Ue.image[W])}}}p(g)&&d(t.TEXTURE_CUBE_MAP),X.__version=K.version,g.onUpdate&&g.onUpdate(g)}b.__version=g.version}function se(b,g,I,Y,K,X){const ge=s.convert(I.format,I.colorSpace),ie=s.convert(I.type),Ce=y(I.internalFormat,ge,ie,I.colorSpace),Ie=i.get(g),Z=i.get(I);if(Z.__renderTarget=g,!Ie.__hasExternalTextures){const ee=Math.max(1,g.width>>X),_e=Math.max(1,g.height>>X);K===t.TEXTURE_3D||K===t.TEXTURE_2D_ARRAY?n.texImage3D(K,X,Ce,ee,_e,g.depth,0,ge,ie,null):n.texImage2D(K,X,Ce,ee,_e,0,ge,ie,null)}n.bindFramebuffer(t.FRAMEBUFFER,b),Pt(g)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Y,K,Z.__webglTexture,0,C(g)):(K===t.TEXTURE_2D||K>=t.TEXTURE_CUBE_MAP_POSITIVE_X&&K<=t.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&t.framebufferTexture2D(t.FRAMEBUFFER,Y,K,Z.__webglTexture,X),n.bindFramebuffer(t.FRAMEBUFFER,null)}function Oe(b,g,I){if(t.bindRenderbuffer(t.RENDERBUFFER,b),g.depthBuffer){const Y=g.depthTexture,K=Y&&Y.isDepthTexture?Y.type:null,X=E(g.stencilBuffer,K),ge=g.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;Pt(g)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,C(g),X,g.width,g.height):I?t.renderbufferStorageMultisample(t.RENDERBUFFER,C(g),X,g.width,g.height):t.renderbufferStorage(t.RENDERBUFFER,X,g.width,g.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,ge,t.RENDERBUFFER,b)}else{const Y=g.textures;for(let K=0;K<Y.length;K++){const X=Y[K],ge=s.convert(X.format,X.colorSpace),ie=s.convert(X.type),Ce=y(X.internalFormat,ge,ie,X.colorSpace);Pt(g)?o.renderbufferStorageMultisampleEXT(t.RENDERBUFFER,C(g),Ce,g.width,g.height):I?t.renderbufferStorageMultisample(t.RENDERBUFFER,C(g),Ce,g.width,g.height):t.renderbufferStorage(t.RENDERBUFFER,Ce,g.width,g.height)}}t.bindRenderbuffer(t.RENDERBUFFER,null)}function Le(b,g,I){const Y=g.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(t.FRAMEBUFFER,b),!(g.depthTexture&&g.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=i.get(g.depthTexture);if(K.__renderTarget=g,(!K.__webglTexture||g.depthTexture.image.width!==g.width||g.depthTexture.image.height!==g.height)&&(g.depthTexture.image.width=g.width,g.depthTexture.image.height=g.height,g.depthTexture.needsUpdate=!0),Y){if(K.__webglInit===void 0&&(K.__webglInit=!0,g.depthTexture.addEventListener("dispose",A)),K.__webglTexture===void 0){K.__webglTexture=t.createTexture(),n.bindTexture(t.TEXTURE_CUBE_MAP,K.__webglTexture),he(t.TEXTURE_CUBE_MAP,g.depthTexture);const Ie=s.convert(g.depthTexture.format),Z=s.convert(g.depthTexture.type);let ee;g.depthTexture.format===Ii?ee=t.DEPTH_COMPONENT24:g.depthTexture.format===_r&&(ee=t.DEPTH24_STENCIL8);for(let _e=0;_e<6;_e++)t.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+_e,0,ee,g.width,g.height,0,Ie,Z,null)}}else k(g.depthTexture,0);const X=K.__webglTexture,ge=C(g),ie=Y?t.TEXTURE_CUBE_MAP_POSITIVE_X+I:t.TEXTURE_2D,Ce=g.depthTexture.format===_r?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;if(g.depthTexture.format===Ii)Pt(g)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Ce,ie,X,0,ge):t.framebufferTexture2D(t.FRAMEBUFFER,Ce,ie,X,0);else if(g.depthTexture.format===_r)Pt(g)?o.framebufferTexture2DMultisampleEXT(t.FRAMEBUFFER,Ce,ie,X,0,ge):t.framebufferTexture2D(t.FRAMEBUFFER,Ce,ie,X,0);else throw new Error("Unknown depthTexture format")}function De(b){const g=i.get(b),I=b.isWebGLCubeRenderTarget===!0;if(g.__boundDepthTexture!==b.depthTexture){const Y=b.depthTexture;if(g.__depthDisposeCallback&&g.__depthDisposeCallback(),Y){const K=()=>{delete g.__boundDepthTexture,delete g.__depthDisposeCallback,Y.removeEventListener("dispose",K)};Y.addEventListener("dispose",K),g.__depthDisposeCallback=K}g.__boundDepthTexture=Y}if(b.depthTexture&&!g.__autoAllocateDepthBuffer)if(I)for(let Y=0;Y<6;Y++)Le(g.__webglFramebuffer[Y],b,Y);else{const Y=b.texture.mipmaps;Y&&Y.length>0?Le(g.__webglFramebuffer[0],b,0):Le(g.__webglFramebuffer,b,0)}else if(I){g.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(n.bindFramebuffer(t.FRAMEBUFFER,g.__webglFramebuffer[Y]),g.__webglDepthbuffer[Y]===void 0)g.__webglDepthbuffer[Y]=t.createRenderbuffer(),Oe(g.__webglDepthbuffer[Y],b,!1);else{const K=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,X=g.__webglDepthbuffer[Y];t.bindRenderbuffer(t.RENDERBUFFER,X),t.framebufferRenderbuffer(t.FRAMEBUFFER,K,t.RENDERBUFFER,X)}}else{const Y=b.texture.mipmaps;if(Y&&Y.length>0?n.bindFramebuffer(t.FRAMEBUFFER,g.__webglFramebuffer[0]):n.bindFramebuffer(t.FRAMEBUFFER,g.__webglFramebuffer),g.__webglDepthbuffer===void 0)g.__webglDepthbuffer=t.createRenderbuffer(),Oe(g.__webglDepthbuffer,b,!1);else{const K=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,X=g.__webglDepthbuffer;t.bindRenderbuffer(t.RENDERBUFFER,X),t.framebufferRenderbuffer(t.FRAMEBUFFER,K,t.RENDERBUFFER,X)}}n.bindFramebuffer(t.FRAMEBUFFER,null)}function Vt(b,g,I){const Y=i.get(b);g!==void 0&&se(Y.__webglFramebuffer,b,b.texture,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,0),I!==void 0&&De(b)}function je(b){const g=b.texture,I=i.get(b),Y=i.get(g);b.addEventListener("dispose",P);const K=b.textures,X=b.isWebGLCubeRenderTarget===!0,ge=K.length>1;if(ge||(Y.__webglTexture===void 0&&(Y.__webglTexture=t.createTexture()),Y.__version=g.version,a.memory.textures++),X){I.__webglFramebuffer=[];for(let ie=0;ie<6;ie++)if(g.mipmaps&&g.mipmaps.length>0){I.__webglFramebuffer[ie]=[];for(let Ce=0;Ce<g.mipmaps.length;Ce++)I.__webglFramebuffer[ie][Ce]=t.createFramebuffer()}else I.__webglFramebuffer[ie]=t.createFramebuffer()}else{if(g.mipmaps&&g.mipmaps.length>0){I.__webglFramebuffer=[];for(let ie=0;ie<g.mipmaps.length;ie++)I.__webglFramebuffer[ie]=t.createFramebuffer()}else I.__webglFramebuffer=t.createFramebuffer();if(ge)for(let ie=0,Ce=K.length;ie<Ce;ie++){const Ie=i.get(K[ie]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=t.createTexture(),a.memory.textures++)}if(b.samples>0&&Pt(b)===!1){I.__webglMultisampledFramebuffer=t.createFramebuffer(),I.__webglColorRenderbuffer=[],n.bindFramebuffer(t.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let ie=0;ie<K.length;ie++){const Ce=K[ie];I.__webglColorRenderbuffer[ie]=t.createRenderbuffer(),t.bindRenderbuffer(t.RENDERBUFFER,I.__webglColorRenderbuffer[ie]);const Ie=s.convert(Ce.format,Ce.colorSpace),Z=s.convert(Ce.type),ee=y(Ce.internalFormat,Ie,Z,Ce.colorSpace,b.isXRRenderTarget===!0),_e=C(b);t.renderbufferStorageMultisample(t.RENDERBUFFER,_e,ee,b.width,b.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+ie,t.RENDERBUFFER,I.__webglColorRenderbuffer[ie])}t.bindRenderbuffer(t.RENDERBUFFER,null),b.depthBuffer&&(I.__webglDepthRenderbuffer=t.createRenderbuffer(),Oe(I.__webglDepthRenderbuffer,b,!0)),n.bindFramebuffer(t.FRAMEBUFFER,null)}}if(X){n.bindTexture(t.TEXTURE_CUBE_MAP,Y.__webglTexture),he(t.TEXTURE_CUBE_MAP,g);for(let ie=0;ie<6;ie++)if(g.mipmaps&&g.mipmaps.length>0)for(let Ce=0;Ce<g.mipmaps.length;Ce++)se(I.__webglFramebuffer[ie][Ce],b,g,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,Ce);else se(I.__webglFramebuffer[ie],b,g,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+ie,0);p(g)&&d(t.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(ge){for(let ie=0,Ce=K.length;ie<Ce;ie++){const Ie=K[ie],Z=i.get(Ie);let ee=t.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ee=b.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ee,Z.__webglTexture),he(ee,Ie),se(I.__webglFramebuffer,b,Ie,t.COLOR_ATTACHMENT0+ie,ee,0),p(Ie)&&d(ee)}n.unbindTexture()}else{let ie=t.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ie=b.isWebGL3DRenderTarget?t.TEXTURE_3D:t.TEXTURE_2D_ARRAY),n.bindTexture(ie,Y.__webglTexture),he(ie,g),g.mipmaps&&g.mipmaps.length>0)for(let Ce=0;Ce<g.mipmaps.length;Ce++)se(I.__webglFramebuffer[Ce],b,g,t.COLOR_ATTACHMENT0,ie,Ce);else se(I.__webglFramebuffer,b,g,t.COLOR_ATTACHMENT0,ie,0);p(g)&&d(ie),n.unbindTexture()}b.depthBuffer&&De(b)}function nt(b){const g=b.textures;for(let I=0,Y=g.length;I<Y;I++){const K=g[I];if(p(K)){const X=x(b),ge=i.get(K).__webglTexture;n.bindTexture(X,ge),d(X),n.unbindTexture()}}}const ct=[],Ve=[];function wt(b){if(b.samples>0){if(Pt(b)===!1){const g=b.textures,I=b.width,Y=b.height;let K=t.COLOR_BUFFER_BIT;const X=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT,ge=i.get(b),ie=g.length>1;if(ie)for(let Ie=0;Ie<g.length;Ie++)n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ie,t.RENDERBUFFER,null),n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ie,t.TEXTURE_2D,null,0);n.bindFramebuffer(t.READ_FRAMEBUFFER,ge.__webglMultisampledFramebuffer);const Ce=b.texture.mipmaps;Ce&&Ce.length>0?n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ge.__webglFramebuffer[0]):n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ge.__webglFramebuffer);for(let Ie=0;Ie<g.length;Ie++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(K|=t.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(K|=t.STENCIL_BUFFER_BIT)),ie){t.framebufferRenderbuffer(t.READ_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.RENDERBUFFER,ge.__webglColorRenderbuffer[Ie]);const Z=i.get(g[Ie]).__webglTexture;t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0,t.TEXTURE_2D,Z,0)}t.blitFramebuffer(0,0,I,Y,0,0,I,Y,K,t.NEAREST),c===!0&&(ct.length=0,Ve.length=0,ct.push(t.COLOR_ATTACHMENT0+Ie),b.depthBuffer&&b.resolveDepthBuffer===!1&&(ct.push(X),Ve.push(X),t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,Ve)),t.invalidateFramebuffer(t.READ_FRAMEBUFFER,ct))}if(n.bindFramebuffer(t.READ_FRAMEBUFFER,null),n.bindFramebuffer(t.DRAW_FRAMEBUFFER,null),ie)for(let Ie=0;Ie<g.length;Ie++){n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglMultisampledFramebuffer),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ie,t.RENDERBUFFER,ge.__webglColorRenderbuffer[Ie]);const Z=i.get(g[Ie]).__webglTexture;n.bindFramebuffer(t.FRAMEBUFFER,ge.__webglFramebuffer),t.framebufferTexture2D(t.DRAW_FRAMEBUFFER,t.COLOR_ATTACHMENT0+Ie,t.TEXTURE_2D,Z,0)}n.bindFramebuffer(t.DRAW_FRAMEBUFFER,ge.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&c){const g=b.stencilBuffer?t.DEPTH_STENCIL_ATTACHMENT:t.DEPTH_ATTACHMENT;t.invalidateFramebuffer(t.DRAW_FRAMEBUFFER,[g])}}}function C(b){return Math.min(r.maxSamples,b.samples)}function Pt(b){const g=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&g.__useRenderToTexture!==!1}function tt(b){const g=a.render.frame;h.get(b)!==g&&(h.set(b,g),b.update())}function ht(b,g){const I=b.colorSpace,Y=b.format,K=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||I!==as&&I!==Ki&&(Ke.getTransfer(I)===rt?(Y!==qn||K!==yn)&&Ne("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Je("WebGLTextures: Unsupported texture color space:",I)),g}function Se(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(l.width=b.naturalWidth||b.width,l.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(l.width=b.displayWidth,l.height=b.displayHeight):(l.width=b.width,l.height=b.height),l}this.allocateTextureUnit=z,this.resetTextureUnits=B,this.setTexture2D=k,this.setTexture2DArray=G,this.setTexture3D=N,this.setTextureCube=Q,this.rebindTextures=Vt,this.setupRenderTarget=je,this.updateRenderTargetMipmap=nt,this.updateMultisampleRenderTarget=wt,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=se,this.useMultisampledRTT=Pt,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function i3(t,e){function n(i,r=Ki){let s;const a=Ke.getTransfer(r);if(i===yn)return t.UNSIGNED_BYTE;if(i===xu)return t.UNSIGNED_SHORT_4_4_4_4;if(i===Mu)return t.UNSIGNED_SHORT_5_5_5_1;if(i===cp)return t.UNSIGNED_INT_5_9_9_9_REV;if(i===lp)return t.UNSIGNED_INT_10F_11F_11F_REV;if(i===ap)return t.BYTE;if(i===op)return t.SHORT;if(i===ia)return t.UNSIGNED_SHORT;if(i===vu)return t.INT;if(i===li)return t.UNSIGNED_INT;if(i===ii)return t.FLOAT;if(i===Li)return t.HALF_FLOAT;if(i===up)return t.ALPHA;if(i===hp)return t.RGB;if(i===qn)return t.RGBA;if(i===Ii)return t.DEPTH_COMPONENT;if(i===_r)return t.DEPTH_STENCIL;if(i===fp)return t.RED;if(i===Su)return t.RED_INTEGER;if(i===ss)return t.RG;if(i===Eu)return t.RG_INTEGER;if(i===yu)return t.RGBA_INTEGER;if(i===io||i===ro||i===so||i===ao)if(a===rt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===io)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===ro)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===so)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===ao)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===io)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===ro)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===so)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===ao)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===ml||i===gl||i===_l||i===vl)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===ml)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===gl)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===_l)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===vl)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===xl||i===Ml||i===Sl||i===El||i===yl||i===Tl||i===bl)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===xl||i===Ml)return a===rt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Sl)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(i===El)return s.COMPRESSED_R11_EAC;if(i===yl)return s.COMPRESSED_SIGNED_R11_EAC;if(i===Tl)return s.COMPRESSED_RG11_EAC;if(i===bl)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Al||i===wl||i===Rl||i===Cl||i===Pl||i===Ll||i===Il||i===Dl||i===Ul||i===Nl||i===Fl||i===Ol||i===Bl||i===kl)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Al)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===wl)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Rl)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Cl)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Pl)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Ll)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Il)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Dl)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Ul)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Nl)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Fl)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Ol)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Bl)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===kl)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===zl||i===Vl||i===Gl)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===zl)return a===rt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Vl)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Gl)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Hl||i===Wl||i===Xl||i===ql)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===Hl)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Wl)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Xl)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===ql)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ra?t.UNSIGNED_INT_24_8:t[i]!==void 0?t[i]:null}return{convert:n}}const r3=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,s3=`
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

}`;class a3{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,n){if(this.texture===null){const i=new yp(e.texture);(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){const n=e.cameras[0].viewport,i=new hi({vertexShader:r3,fragmentShader:s3,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new pn(new Lo(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class o3 extends xs{constructor(e,n){super();const i=this;let r=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,f=null,u=null,m=null,_=null;const S=typeof XRWebGLBinding<"u",p=new a3,d={},x=n.getContextAttributes();let y=null,E=null;const w=[],A=[],P=new Ye;let v=null;const T=new En;T.viewport=new bt;const H=new En;H.viewport=new bt;const R=[T,H],B=new x_;let z=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ne=w[j];return ne===void 0&&(ne=new vc,w[j]=ne),ne.getTargetRaySpace()},this.getControllerGrip=function(j){let ne=w[j];return ne===void 0&&(ne=new vc,w[j]=ne),ne.getGripSpace()},this.getHand=function(j){let ne=w[j];return ne===void 0&&(ne=new vc,w[j]=ne),ne.getHandSpace()};function k(j){const ne=A.indexOf(j.inputSource);if(ne===-1)return;const se=w[ne];se!==void 0&&(se.update(j.inputSource,j.frame,l||a),se.dispatchEvent({type:j.type,data:j.inputSource}))}function G(){r.removeEventListener("select",k),r.removeEventListener("selectstart",k),r.removeEventListener("selectend",k),r.removeEventListener("squeeze",k),r.removeEventListener("squeezestart",k),r.removeEventListener("squeezeend",k),r.removeEventListener("end",G),r.removeEventListener("inputsourceschange",N);for(let j=0;j<w.length;j++){const ne=A[j];ne!==null&&(A[j]=null,w[j].disconnect(ne))}z=null,q=null,p.reset();for(const j in d)delete d[j];e.setRenderTarget(y),m=null,u=null,f=null,r=null,E=null,dt.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){s=j,i.isPresenting===!0&&Ne("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,i.isPresenting===!0&&Ne("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return f===null&&S&&(f=new XRWebGLBinding(r,n)),f},this.getFrame=function(){return _},this.getSession=function(){return r},this.setSession=async function(j){if(r=j,r!==null){if(y=e.getRenderTarget(),r.addEventListener("select",k),r.addEventListener("selectstart",k),r.addEventListener("selectend",k),r.addEventListener("squeeze",k),r.addEventListener("squeezestart",k),r.addEventListener("squeezeend",k),r.addEventListener("end",G),r.addEventListener("inputsourceschange",N),x.xrCompatible!==!0&&await n.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(P),S&&"createProjectionLayer"in XRWebGLBinding.prototype){let se=null,Oe=null,Le=null;x.depth&&(Le=x.stencil?n.DEPTH24_STENCIL8:n.DEPTH_COMPONENT24,se=x.stencil?_r:Ii,Oe=x.stencil?ra:li);const De={colorFormat:n.RGBA8,depthFormat:Le,scaleFactor:s};f=this.getBinding(),u=f.createProjectionLayer(De),r.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),E=new oi(u.textureWidth,u.textureHeight,{format:qn,type:yn,depthTexture:new aa(u.textureWidth,u.textureHeight,Oe,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1})}else{const se={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:s};m=new XRWebGLLayer(r,n,se),r.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),E=new oi(m.framebufferWidth,m.framebufferHeight,{format:qn,type:yn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await r.requestReferenceSpace(o),dt.setContext(r),dt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function N(j){for(let ne=0;ne<j.removed.length;ne++){const se=j.removed[ne],Oe=A.indexOf(se);Oe>=0&&(A[Oe]=null,w[Oe].disconnect(se))}for(let ne=0;ne<j.added.length;ne++){const se=j.added[ne];let Oe=A.indexOf(se);if(Oe===-1){for(let De=0;De<w.length;De++)if(De>=A.length){A.push(se),Oe=De;break}else if(A[De]===null){A[De]=se,Oe=De;break}if(Oe===-1)break}const Le=w[Oe];Le&&Le.connect(se)}}const Q=new U,$=new U;function le(j,ne,se){Q.setFromMatrixPosition(ne.matrixWorld),$.setFromMatrixPosition(se.matrixWorld);const Oe=Q.distanceTo($),Le=ne.projectionMatrix.elements,De=se.projectionMatrix.elements,Vt=Le[14]/(Le[10]-1),je=Le[14]/(Le[10]+1),nt=(Le[9]+1)/Le[5],ct=(Le[9]-1)/Le[5],Ve=(Le[8]-1)/Le[0],wt=(De[8]+1)/De[0],C=Vt*Ve,Pt=Vt*wt,tt=Oe/(-Ve+wt),ht=tt*-Ve;if(ne.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(ht),j.translateZ(tt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),Le[10]===-1)j.projectionMatrix.copy(ne.projectionMatrix),j.projectionMatrixInverse.copy(ne.projectionMatrixInverse);else{const Se=Vt+tt,b=je+tt,g=C-ht,I=Pt+(Oe-ht),Y=nt*je/b*Se,K=ct*je/b*Se;j.projectionMatrix.makePerspective(g,I,Y,K,Se,b),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function me(j,ne){ne===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ne.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(r===null)return;let ne=j.near,se=j.far;p.texture!==null&&(p.depthNear>0&&(ne=p.depthNear),p.depthFar>0&&(se=p.depthFar)),B.near=H.near=T.near=ne,B.far=H.far=T.far=se,(z!==B.near||q!==B.far)&&(r.updateRenderState({depthNear:B.near,depthFar:B.far}),z=B.near,q=B.far),B.layers.mask=j.layers.mask|6,T.layers.mask=B.layers.mask&-5,H.layers.mask=B.layers.mask&-3;const Oe=j.parent,Le=B.cameras;me(B,Oe);for(let De=0;De<Le.length;De++)me(Le[De],Oe);Le.length===2?le(B,T,H):B.projectionMatrix.copy(T.projectionMatrix),he(j,B,Oe)};function he(j,ne,se){se===null?j.matrix.copy(ne.matrixWorld):(j.matrix.copy(se.matrixWorld),j.matrix.invert(),j.matrix.multiply(ne.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ne.projectionMatrix),j.projectionMatrixInverse.copy(ne.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=Yl*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(u===null&&m===null))return c},this.setFoveation=function(j){c=j,u!==null&&(u.fixedFoveation=j),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=j)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(B)},this.getCameraTexture=function(j){return d[j]};let ke=null;function pt(j,ne){if(h=ne.getViewerPose(l||a),_=ne,h!==null){const se=h.views;m!==null&&(e.setRenderTargetFramebuffer(E,m.framebuffer),e.setRenderTarget(E));let Oe=!1;se.length!==B.cameras.length&&(B.cameras.length=0,Oe=!0);for(let je=0;je<se.length;je++){const nt=se[je];let ct=null;if(m!==null)ct=m.getViewport(nt);else{const wt=f.getViewSubImage(u,nt);ct=wt.viewport,je===0&&(e.setRenderTargetTextures(E,wt.colorTexture,wt.depthStencilTexture),e.setRenderTarget(E))}let Ve=R[je];Ve===void 0&&(Ve=new En,Ve.layers.enable(je),Ve.viewport=new bt,R[je]=Ve),Ve.matrix.fromArray(nt.transform.matrix),Ve.matrix.decompose(Ve.position,Ve.quaternion,Ve.scale),Ve.projectionMatrix.fromArray(nt.projectionMatrix),Ve.projectionMatrixInverse.copy(Ve.projectionMatrix).invert(),Ve.viewport.set(ct.x,ct.y,ct.width,ct.height),je===0&&(B.matrix.copy(Ve.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Oe===!0&&B.cameras.push(Ve)}const Le=r.enabledFeatures;if(Le&&Le.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&S){f=i.getBinding();const je=f.getDepthInformation(se[0]);je&&je.isValid&&je.texture&&p.init(je,r.renderState)}if(Le&&Le.includes("camera-access")&&S){e.state.unbindTexture(),f=i.getBinding();for(let je=0;je<se.length;je++){const nt=se[je].camera;if(nt){let ct=d[nt];ct||(ct=new yp,d[nt]=ct);const Ve=f.getCameraImage(nt);ct.sourceTexture=Ve}}}}for(let se=0;se<w.length;se++){const Oe=A[se],Le=w[se];Oe!==null&&Le!==void 0&&Le.update(Oe,ne,l||a)}ke&&ke(j,ne),ne.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ne}),_=null}const dt=new Rp;dt.setAnimationLoop(pt),this.setAnimationLoop=function(j){ke=j},this.dispose=function(){}}}const ur=new ui,c3=new St;function l3(t,e){function n(p,d){p.matrixAutoUpdate===!0&&p.updateMatrix(),d.value.copy(p.matrix)}function i(p,d){d.color.getRGB(p.fogColor.value,Tp(t)),d.isFog?(p.fogNear.value=d.near,p.fogFar.value=d.far):d.isFogExp2&&(p.fogDensity.value=d.density)}function r(p,d,x,y,E){d.isMeshBasicMaterial?s(p,d):d.isMeshLambertMaterial?(s(p,d),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)):d.isMeshToonMaterial?(s(p,d),f(p,d)):d.isMeshPhongMaterial?(s(p,d),h(p,d),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)):d.isMeshStandardMaterial?(s(p,d),u(p,d),d.isMeshPhysicalMaterial&&m(p,d,E)):d.isMeshMatcapMaterial?(s(p,d),_(p,d)):d.isMeshDepthMaterial?s(p,d):d.isMeshDistanceMaterial?(s(p,d),S(p,d)):d.isMeshNormalMaterial?s(p,d):d.isLineBasicMaterial?(a(p,d),d.isLineDashedMaterial&&o(p,d)):d.isPointsMaterial?c(p,d,x,y):d.isSpriteMaterial?l(p,d):d.isShadowMaterial?(p.color.value.copy(d.color),p.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function s(p,d){p.opacity.value=d.opacity,d.color&&p.diffuse.value.copy(d.color),d.emissive&&p.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(p.map.value=d.map,n(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,n(d.alphaMap,p.alphaMapTransform)),d.bumpMap&&(p.bumpMap.value=d.bumpMap,n(d.bumpMap,p.bumpMapTransform),p.bumpScale.value=d.bumpScale,d.side===dn&&(p.bumpScale.value*=-1)),d.normalMap&&(p.normalMap.value=d.normalMap,n(d.normalMap,p.normalMapTransform),p.normalScale.value.copy(d.normalScale),d.side===dn&&p.normalScale.value.negate()),d.displacementMap&&(p.displacementMap.value=d.displacementMap,n(d.displacementMap,p.displacementMapTransform),p.displacementScale.value=d.displacementScale,p.displacementBias.value=d.displacementBias),d.emissiveMap&&(p.emissiveMap.value=d.emissiveMap,n(d.emissiveMap,p.emissiveMapTransform)),d.specularMap&&(p.specularMap.value=d.specularMap,n(d.specularMap,p.specularMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest);const x=e.get(d),y=x.envMap,E=x.envMapRotation;y&&(p.envMap.value=y,ur.copy(E),ur.x*=-1,ur.y*=-1,ur.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ur.y*=-1,ur.z*=-1),p.envMapRotation.value.setFromMatrix4(c3.makeRotationFromEuler(ur)),p.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=d.reflectivity,p.ior.value=d.ior,p.refractionRatio.value=d.refractionRatio),d.lightMap&&(p.lightMap.value=d.lightMap,p.lightMapIntensity.value=d.lightMapIntensity,n(d.lightMap,p.lightMapTransform)),d.aoMap&&(p.aoMap.value=d.aoMap,p.aoMapIntensity.value=d.aoMapIntensity,n(d.aoMap,p.aoMapTransform))}function a(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,d.map&&(p.map.value=d.map,n(d.map,p.mapTransform))}function o(p,d){p.dashSize.value=d.dashSize,p.totalSize.value=d.dashSize+d.gapSize,p.scale.value=d.scale}function c(p,d,x,y){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.size.value=d.size*x,p.scale.value=y*.5,d.map&&(p.map.value=d.map,n(d.map,p.uvTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,n(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function l(p,d){p.diffuse.value.copy(d.color),p.opacity.value=d.opacity,p.rotation.value=d.rotation,d.map&&(p.map.value=d.map,n(d.map,p.mapTransform)),d.alphaMap&&(p.alphaMap.value=d.alphaMap,n(d.alphaMap,p.alphaMapTransform)),d.alphaTest>0&&(p.alphaTest.value=d.alphaTest)}function h(p,d){p.specular.value.copy(d.specular),p.shininess.value=Math.max(d.shininess,1e-4)}function f(p,d){d.gradientMap&&(p.gradientMap.value=d.gradientMap)}function u(p,d){p.metalness.value=d.metalness,d.metalnessMap&&(p.metalnessMap.value=d.metalnessMap,n(d.metalnessMap,p.metalnessMapTransform)),p.roughness.value=d.roughness,d.roughnessMap&&(p.roughnessMap.value=d.roughnessMap,n(d.roughnessMap,p.roughnessMapTransform)),d.envMap&&(p.envMapIntensity.value=d.envMapIntensity)}function m(p,d,x){p.ior.value=d.ior,d.sheen>0&&(p.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),p.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(p.sheenColorMap.value=d.sheenColorMap,n(d.sheenColorMap,p.sheenColorMapTransform)),d.sheenRoughnessMap&&(p.sheenRoughnessMap.value=d.sheenRoughnessMap,n(d.sheenRoughnessMap,p.sheenRoughnessMapTransform))),d.clearcoat>0&&(p.clearcoat.value=d.clearcoat,p.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(p.clearcoatMap.value=d.clearcoatMap,n(d.clearcoatMap,p.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,n(d.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(p.clearcoatNormalMap.value=d.clearcoatNormalMap,n(d.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===dn&&p.clearcoatNormalScale.value.negate())),d.dispersion>0&&(p.dispersion.value=d.dispersion),d.iridescence>0&&(p.iridescence.value=d.iridescence,p.iridescenceIOR.value=d.iridescenceIOR,p.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(p.iridescenceMap.value=d.iridescenceMap,n(d.iridescenceMap,p.iridescenceMapTransform)),d.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=d.iridescenceThicknessMap,n(d.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),d.transmission>0&&(p.transmission.value=d.transmission,p.transmissionSamplerMap.value=x.texture,p.transmissionSamplerSize.value.set(x.width,x.height),d.transmissionMap&&(p.transmissionMap.value=d.transmissionMap,n(d.transmissionMap,p.transmissionMapTransform)),p.thickness.value=d.thickness,d.thicknessMap&&(p.thicknessMap.value=d.thicknessMap,n(d.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=d.attenuationDistance,p.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(p.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(p.anisotropyMap.value=d.anisotropyMap,n(d.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=d.specularIntensity,p.specularColor.value.copy(d.specularColor),d.specularColorMap&&(p.specularColorMap.value=d.specularColorMap,n(d.specularColorMap,p.specularColorMapTransform)),d.specularIntensityMap&&(p.specularIntensityMap.value=d.specularIntensityMap,n(d.specularIntensityMap,p.specularIntensityMapTransform))}function _(p,d){d.matcap&&(p.matcap.value=d.matcap)}function S(p,d){const x=e.get(d).light;p.referencePosition.value.setFromMatrixPosition(x.matrixWorld),p.nearDistance.value=x.shadow.camera.near,p.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function u3(t,e,n,i){let r={},s={},a=[];const o=t.getParameter(t.MAX_UNIFORM_BUFFER_BINDINGS);function c(x,y){const E=y.program;i.uniformBlockBinding(x,E)}function l(x,y){let E=r[x.id];E===void 0&&(_(x),E=h(x),r[x.id]=E,x.addEventListener("dispose",p));const w=y.program;i.updateUBOMapping(x,w);const A=e.render.frame;s[x.id]!==A&&(u(x),s[x.id]=A)}function h(x){const y=f();x.__bindingPointIndex=y;const E=t.createBuffer(),w=x.__size,A=x.usage;return t.bindBuffer(t.UNIFORM_BUFFER,E),t.bufferData(t.UNIFORM_BUFFER,w,A),t.bindBuffer(t.UNIFORM_BUFFER,null),t.bindBufferBase(t.UNIFORM_BUFFER,y,E),E}function f(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return Je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const y=r[x.id],E=x.uniforms,w=x.__cache;t.bindBuffer(t.UNIFORM_BUFFER,y);for(let A=0,P=E.length;A<P;A++){const v=Array.isArray(E[A])?E[A]:[E[A]];for(let T=0,H=v.length;T<H;T++){const R=v[T];if(m(R,A,T,w)===!0){const B=R.__offset,z=Array.isArray(R.value)?R.value:[R.value];let q=0;for(let k=0;k<z.length;k++){const G=z[k],N=S(G);typeof G=="number"||typeof G=="boolean"?(R.__data[0]=G,t.bufferSubData(t.UNIFORM_BUFFER,B+q,R.__data)):G.isMatrix3?(R.__data[0]=G.elements[0],R.__data[1]=G.elements[1],R.__data[2]=G.elements[2],R.__data[3]=0,R.__data[4]=G.elements[3],R.__data[5]=G.elements[4],R.__data[6]=G.elements[5],R.__data[7]=0,R.__data[8]=G.elements[6],R.__data[9]=G.elements[7],R.__data[10]=G.elements[8],R.__data[11]=0):(G.toArray(R.__data,q),q+=N.storage/Float32Array.BYTES_PER_ELEMENT)}t.bufferSubData(t.UNIFORM_BUFFER,B,R.__data)}}}t.bindBuffer(t.UNIFORM_BUFFER,null)}function m(x,y,E,w){const A=x.value,P=y+"_"+E;if(w[P]===void 0)return typeof A=="number"||typeof A=="boolean"?w[P]=A:w[P]=A.clone(),!0;{const v=w[P];if(typeof A=="number"||typeof A=="boolean"){if(v!==A)return w[P]=A,!0}else if(v.equals(A)===!1)return v.copy(A),!0}return!1}function _(x){const y=x.uniforms;let E=0;const w=16;for(let P=0,v=y.length;P<v;P++){const T=Array.isArray(y[P])?y[P]:[y[P]];for(let H=0,R=T.length;H<R;H++){const B=T[H],z=Array.isArray(B.value)?B.value:[B.value];for(let q=0,k=z.length;q<k;q++){const G=z[q],N=S(G),Q=E%w,$=Q%N.boundary,le=Q+$;E+=$,le!==0&&w-le<N.storage&&(E+=w-le),B.__data=new Float32Array(N.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=E,E+=N.storage}}}const A=E%w;return A>0&&(E+=w-A),x.__size=E,x.__cache={},this}function S(x){const y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?Ne("WebGLRenderer: Texture samplers can not be part of an uniforms group."):Ne("WebGLRenderer: Unsupported uniform value type.",x),y}function p(x){const y=x.target;y.removeEventListener("dispose",p);const E=a.indexOf(y.__bindingPointIndex);a.splice(E,1),t.deleteBuffer(r[y.id]),delete r[y.id],delete s[y.id]}function d(){for(const x in r)t.deleteBuffer(r[x]);a=[],r={},s={}}return{bind:c,update:l,dispose:d}}const h3=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Qn=null;function f3(){return Qn===null&&(Qn=new n_(h3,16,16,ss,Li),Qn.name="DFG_LUT",Qn.minFilter=en,Qn.magFilter=en,Qn.wrapS=Ri,Qn.wrapT=Ri,Qn.generateMipmaps=!1,Qn.needsUpdate=!0),Qn}class d3{constructor(e={}){const{canvas:n=Dg(),context:i=null,depth:r=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:m=yn}=e;this.isWebGLRenderer=!0;let _;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=i.getContextAttributes().alpha}else _=a;const S=m,p=new Set([yu,Eu,Su]),d=new Set([yn,li,ia,ra,xu,Mu]),x=new Uint32Array(4),y=new Int32Array(4);let E=null,w=null;const A=[],P=[];let v=null;this.domElement=n,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ai,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const T=this;let H=!1;this._outputColorSpace=Fn;let R=0,B=0,z=null,q=-1,k=null;const G=new bt,N=new bt;let Q=null;const $=new We(0);let le=0,me=n.width,he=n.height,ke=1,pt=null,dt=null;const j=new bt(0,0,me,he),ne=new bt(0,0,me,he);let se=!1;const Oe=new Ru;let Le=!1,De=!1;const Vt=new St,je=new U,nt=new bt,ct={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ve=!1;function wt(){return z===null?ke:1}let C=i;function Pt(M,D){return n.getContext(M,D)}try{const M={alpha:!0,depth:r,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in n&&n.setAttribute("data-engine",`three.js r${gu}`),n.addEventListener("webglcontextlost",ve,!1),n.addEventListener("webglcontextrestored",Ue,!1),n.addEventListener("webglcontextcreationerror",ft,!1),C===null){const D="webgl2";if(C=Pt(D,M),C===null)throw Pt(D)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw Je("WebGLRenderer: "+M.message),M}let tt,ht,Se,b,g,I,Y,K,X,ge,ie,Ce,Ie,Z,ee,_e,xe,ue,Ge,L,re,te,de;function J(){tt=new dv(C),tt.init(),re=new i3(C,tt),ht=new sv(C,tt,e,re),Se=new t3(C,tt),ht.reversedDepthBuffer&&u&&Se.buffers.depth.setReversed(!0),b=new gv(C),g=new Vx,I=new n3(C,tt,Se,g,ht,re,b),Y=new fv(T),K=new S_(C),te=new iv(C,K),X=new pv(C,K,b,te),ge=new vv(C,X,K,te,b),ue=new _v(C,ht,I),ee=new av(g),ie=new zx(T,Y,tt,ht,te,ee),Ce=new l3(T,g),Ie=new Hx,Z=new Kx(tt),xe=new nv(T,Y,Se,ge,_,c),_e=new e3(T,ge,ht),de=new u3(C,b,ht,Se),Ge=new rv(C,tt,b),L=new mv(C,tt,b),b.programs=ie.programs,T.capabilities=ht,T.extensions=tt,T.properties=g,T.renderLists=Ie,T.shadowMap=_e,T.state=Se,T.info=b}J(),S!==yn&&(v=new Mv(S,n.width,n.height,r,s));const W=new o3(T,C);this.xr=W,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const M=tt.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=tt.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return ke},this.setPixelRatio=function(M){M!==void 0&&(ke=M,this.setSize(me,he,!1))},this.getSize=function(M){return M.set(me,he)},this.setSize=function(M,D,V=!0){if(W.isPresenting){Ne("WebGLRenderer: Can't change size while VR device is presenting.");return}me=M,he=D,n.width=Math.floor(M*ke),n.height=Math.floor(D*ke),V===!0&&(n.style.width=M+"px",n.style.height=D+"px"),v!==null&&v.setSize(n.width,n.height),this.setViewport(0,0,M,D)},this.getDrawingBufferSize=function(M){return M.set(me*ke,he*ke).floor()},this.setDrawingBufferSize=function(M,D,V){me=M,he=D,ke=V,n.width=Math.floor(M*V),n.height=Math.floor(D*V),this.setViewport(0,0,M,D)},this.setEffects=function(M){if(S===yn){console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let D=0;D<M.length;D++)if(M[D].isOutputPass===!0){console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}v.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(G)},this.getViewport=function(M){return M.copy(j)},this.setViewport=function(M,D,V,O){M.isVector4?j.set(M.x,M.y,M.z,M.w):j.set(M,D,V,O),Se.viewport(G.copy(j).multiplyScalar(ke).round())},this.getScissor=function(M){return M.copy(ne)},this.setScissor=function(M,D,V,O){M.isVector4?ne.set(M.x,M.y,M.z,M.w):ne.set(M,D,V,O),Se.scissor(N.copy(ne).multiplyScalar(ke).round())},this.getScissorTest=function(){return se},this.setScissorTest=function(M){Se.setScissorTest(se=M)},this.setOpaqueSort=function(M){pt=M},this.setTransparentSort=function(M){dt=M},this.getClearColor=function(M){return M.copy(xe.getClearColor())},this.setClearColor=function(){xe.setClearColor(...arguments)},this.getClearAlpha=function(){return xe.getClearAlpha()},this.setClearAlpha=function(){xe.setClearAlpha(...arguments)},this.clear=function(M=!0,D=!0,V=!0){let O=0;if(M){let F=!1;if(z!==null){const oe=z.texture.format;F=p.has(oe)}if(F){const oe=z.texture.type,fe=d.has(oe),ce=xe.getClearColor(),Me=xe.getClearAlpha(),be=ce.r,Fe=ce.g,He=ce.b;fe?(x[0]=be,x[1]=Fe,x[2]=He,x[3]=Me,C.clearBufferuiv(C.COLOR,0,x)):(y[0]=be,y[1]=Fe,y[2]=He,y[3]=Me,C.clearBufferiv(C.COLOR,0,y))}else O|=C.COLOR_BUFFER_BIT}D&&(O|=C.DEPTH_BUFFER_BIT),V&&(O|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O!==0&&C.clear(O)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){n.removeEventListener("webglcontextlost",ve,!1),n.removeEventListener("webglcontextrestored",Ue,!1),n.removeEventListener("webglcontextcreationerror",ft,!1),xe.dispose(),Ie.dispose(),Z.dispose(),g.dispose(),Y.dispose(),ge.dispose(),te.dispose(),de.dispose(),ie.dispose(),W.dispose(),W.removeEventListener("sessionstart",Ih),W.removeEventListener("sessionend",Dh),ir.stop()};function ve(M){M.preventDefault(),jh("WebGLRenderer: Context Lost."),H=!0}function Ue(){jh("WebGLRenderer: Context Restored."),H=!1;const M=b.autoReset,D=_e.enabled,V=_e.autoUpdate,O=_e.needsUpdate,F=_e.type;J(),b.autoReset=M,_e.enabled=D,_e.autoUpdate=V,_e.needsUpdate=O,_e.type=F}function ft(M){Je("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function it(M){const D=M.target;D.removeEventListener("dispose",it),vi(D)}function vi(M){xi(M),g.remove(M)}function xi(M){const D=g.get(M).programs;D!==void 0&&(D.forEach(function(V){ie.releaseProgram(V)}),M.isShaderMaterial&&ie.releaseShaderCache(M))}this.renderBufferDirect=function(M,D,V,O,F,oe){D===null&&(D=ct);const fe=F.isMesh&&F.matrixWorld.determinant()<0,ce=q0(M,D,V,O,F);Se.setMaterial(O,fe);let Me=V.index,be=1;if(O.wireframe===!0){if(Me=X.getWireframeAttribute(V),Me===void 0)return;be=2}const Fe=V.drawRange,He=V.attributes.position;let we=Fe.start*be,st=(Fe.start+Fe.count)*be;oe!==null&&(we=Math.max(we,oe.start*be),st=Math.min(st,(oe.start+oe.count)*be)),Me!==null?(we=Math.max(we,0),st=Math.min(st,Me.count)):He!=null&&(we=Math.max(we,0),st=Math.min(st,He.count));const Rt=st-we;if(Rt<0||Rt===1/0)return;te.setup(F,O,ce,V,Me);let yt,at=Ge;if(Me!==null&&(yt=K.get(Me),at=L,at.setIndex(yt)),F.isMesh)O.wireframe===!0?(Se.setLineWidth(O.wireframeLinewidth*wt()),at.setMode(C.LINES)):at.setMode(C.TRIANGLES);else if(F.isLine){let $t=O.linewidth;$t===void 0&&($t=1),Se.setLineWidth($t*wt()),F.isLineSegments?at.setMode(C.LINES):F.isLineLoop?at.setMode(C.LINE_LOOP):at.setMode(C.LINE_STRIP)}else F.isPoints?at.setMode(C.POINTS):F.isSprite&&at.setMode(C.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)go("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),at.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(tt.get("WEBGL_multi_draw"))at.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const $t=F._multiDrawStarts,Ee=F._multiDrawCounts,gn=F._multiDrawCount,Ze=Me?K.get(Me).bytesPerElement:1,Vn=g.get(O).currentProgram.getUniforms();for(let Zn=0;Zn<gn;Zn++)Vn.setValue(C,"_gl_DrawID",Zn),at.render($t[Zn]/Ze,Ee[Zn])}else if(F.isInstancedMesh)at.renderInstances(we,Rt,F.count);else if(V.isInstancedBufferGeometry){const $t=V._maxInstanceCount!==void 0?V._maxInstanceCount:1/0,Ee=Math.min(V.instanceCount,$t);at.renderInstances(we,Rt,Ee)}else at.render(we,Rt)};function Lh(M,D,V){M.transparent===!0&&M.side===Ai&&M.forceSinglePass===!1?(M.side=dn,M.needsUpdate=!0,Ta(M,D,V),M.side=Qi,M.needsUpdate=!0,Ta(M,D,V),M.side=Ai):Ta(M,D,V)}this.compile=function(M,D,V=null){V===null&&(V=M),w=Z.get(V),w.init(D),P.push(w),V.traverseVisible(function(F){F.isLight&&F.layers.test(D.layers)&&(w.pushLight(F),F.castShadow&&w.pushShadow(F))}),M!==V&&M.traverseVisible(function(F){F.isLight&&F.layers.test(D.layers)&&(w.pushLight(F),F.castShadow&&w.pushShadow(F))}),w.setupLights();const O=new Set;return M.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const oe=F.material;if(oe)if(Array.isArray(oe))for(let fe=0;fe<oe.length;fe++){const ce=oe[fe];Lh(ce,V,F),O.add(ce)}else Lh(oe,V,F),O.add(oe)}),w=P.pop(),O},this.compileAsync=function(M,D,V=null){const O=this.compile(M,D,V);return new Promise(F=>{function oe(){if(O.forEach(function(fe){g.get(fe).currentProgram.isReady()&&O.delete(fe)}),O.size===0){F(M);return}setTimeout(oe,10)}tt.get("KHR_parallel_shader_compile")!==null?oe():setTimeout(oe,10)})};let ac=null;function X0(M){ac&&ac(M)}function Ih(){ir.stop()}function Dh(){ir.start()}const ir=new Rp;ir.setAnimationLoop(X0),typeof self<"u"&&ir.setContext(self),this.setAnimationLoop=function(M){ac=M,W.setAnimationLoop(M),M===null?ir.stop():ir.start()},W.addEventListener("sessionstart",Ih),W.addEventListener("sessionend",Dh),this.render=function(M,D){if(D!==void 0&&D.isCamera!==!0){Je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(H===!0)return;const V=W.enabled===!0&&W.isPresenting===!0,O=v!==null&&(z===null||V)&&v.begin(T,z);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(v===null||v.isCompositing()===!1)&&(W.cameraAutoUpdate===!0&&W.updateCamera(D),D=W.getCamera()),M.isScene===!0&&M.onBeforeRender(T,M,D,z),w=Z.get(M,P.length),w.init(D),P.push(w),Vt.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),Oe.setFromProjectionMatrix(Vt,ri,D.reversedDepth),De=this.localClippingEnabled,Le=ee.init(this.clippingPlanes,De),E=Ie.get(M,A.length),E.init(),A.push(E),W.enabled===!0&&W.isPresenting===!0){const fe=T.xr.getDepthSensingMesh();fe!==null&&oc(fe,D,-1/0,T.sortObjects)}oc(M,D,0,T.sortObjects),E.finish(),T.sortObjects===!0&&E.sort(pt,dt),Ve=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,Ve&&xe.addToRenderList(E,M),this.info.render.frame++,Le===!0&&ee.beginShadows();const F=w.state.shadowsArray;if(_e.render(F,M,D),Le===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset(),(O&&v.hasRenderPass())===!1){const fe=E.opaque,ce=E.transmissive;if(w.setupLights(),D.isArrayCamera){const Me=D.cameras;if(ce.length>0)for(let be=0,Fe=Me.length;be<Fe;be++){const He=Me[be];Nh(fe,ce,M,He)}Ve&&xe.render(M);for(let be=0,Fe=Me.length;be<Fe;be++){const He=Me[be];Uh(E,M,He,He.viewport)}}else ce.length>0&&Nh(fe,ce,M,D),Ve&&xe.render(M),Uh(E,M,D)}z!==null&&B===0&&(I.updateMultisampleRenderTarget(z),I.updateRenderTargetMipmap(z)),O&&v.end(T),M.isScene===!0&&M.onAfterRender(T,M,D),te.resetDefaultState(),q=-1,k=null,P.pop(),P.length>0?(w=P[P.length-1],Le===!0&&ee.setGlobalState(T.clippingPlanes,w.state.camera)):w=null,A.pop(),A.length>0?E=A[A.length-1]:E=null};function oc(M,D,V,O){if(M.visible===!1)return;if(M.layers.test(D.layers)){if(M.isGroup)V=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(D);else if(M.isLight)w.pushLight(M),M.castShadow&&w.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||Oe.intersectsSprite(M)){O&&nt.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Vt);const fe=ge.update(M),ce=M.material;ce.visible&&E.push(M,fe,ce,V,nt.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||Oe.intersectsObject(M))){const fe=ge.update(M),ce=M.material;if(O&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),nt.copy(M.boundingSphere.center)):(fe.boundingSphere===null&&fe.computeBoundingSphere(),nt.copy(fe.boundingSphere.center)),nt.applyMatrix4(M.matrixWorld).applyMatrix4(Vt)),Array.isArray(ce)){const Me=fe.groups;for(let be=0,Fe=Me.length;be<Fe;be++){const He=Me[be],we=ce[He.materialIndex];we&&we.visible&&E.push(M,fe,we,V,nt.z,He)}}else ce.visible&&E.push(M,fe,ce,V,nt.z,null)}}const oe=M.children;for(let fe=0,ce=oe.length;fe<ce;fe++)oc(oe[fe],D,V,O)}function Uh(M,D,V,O){const{opaque:F,transmissive:oe,transparent:fe}=M;w.setupLightsView(V),Le===!0&&ee.setGlobalState(T.clippingPlanes,V),O&&Se.viewport(G.copy(O)),F.length>0&&ya(F,D,V),oe.length>0&&ya(oe,D,V),fe.length>0&&ya(fe,D,V),Se.buffers.depth.setTest(!0),Se.buffers.depth.setMask(!0),Se.buffers.color.setMask(!0),Se.setPolygonOffset(!1)}function Nh(M,D,V,O){if((V.isScene===!0?V.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[O.id]===void 0){const we=tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[O.id]=new oi(1,1,{generateMipmaps:!0,type:we?Li:yn,minFilter:gr,samples:Math.max(4,ht.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace})}const oe=w.state.transmissionRenderTarget[O.id],fe=O.viewport||G;oe.setSize(fe.z*T.transmissionResolutionScale,fe.w*T.transmissionResolutionScale);const ce=T.getRenderTarget(),Me=T.getActiveCubeFace(),be=T.getActiveMipmapLevel();T.setRenderTarget(oe),T.getClearColor($),le=T.getClearAlpha(),le<1&&T.setClearColor(16777215,.5),T.clear(),Ve&&xe.render(V);const Fe=T.toneMapping;T.toneMapping=ai;const He=O.viewport;if(O.viewport!==void 0&&(O.viewport=void 0),w.setupLightsView(O),Le===!0&&ee.setGlobalState(T.clippingPlanes,O),ya(M,V,O),I.updateMultisampleRenderTarget(oe),I.updateRenderTargetMipmap(oe),tt.has("WEBGL_multisampled_render_to_texture")===!1){let we=!1;for(let st=0,Rt=D.length;st<Rt;st++){const yt=D[st],{object:at,geometry:$t,material:Ee,group:gn}=yt;if(Ee.side===Ai&&at.layers.test(O.layers)){const Ze=Ee.side;Ee.side=dn,Ee.needsUpdate=!0,Fh(at,V,O,$t,Ee,gn),Ee.side=Ze,Ee.needsUpdate=!0,we=!0}}we===!0&&(I.updateMultisampleRenderTarget(oe),I.updateRenderTargetMipmap(oe))}T.setRenderTarget(ce,Me,be),T.setClearColor($,le),He!==void 0&&(O.viewport=He),T.toneMapping=Fe}function ya(M,D,V){const O=D.isScene===!0?D.overrideMaterial:null;for(let F=0,oe=M.length;F<oe;F++){const fe=M[F],{object:ce,geometry:Me,group:be}=fe;let Fe=fe.material;Fe.allowOverride===!0&&O!==null&&(Fe=O),ce.layers.test(V.layers)&&Fh(ce,D,V,Me,Fe,be)}}function Fh(M,D,V,O,F,oe){M.onBeforeRender(T,D,V,O,F,oe),M.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),F.onBeforeRender(T,D,V,O,M,oe),F.transparent===!0&&F.side===Ai&&F.forceSinglePass===!1?(F.side=dn,F.needsUpdate=!0,T.renderBufferDirect(V,D,O,F,M,oe),F.side=Qi,F.needsUpdate=!0,T.renderBufferDirect(V,D,O,F,M,oe),F.side=Ai):T.renderBufferDirect(V,D,O,F,M,oe),M.onAfterRender(T,D,V,O,F,oe)}function Ta(M,D,V){D.isScene!==!0&&(D=ct);const O=g.get(M),F=w.state.lights,oe=w.state.shadowsArray,fe=F.state.version,ce=ie.getParameters(M,F.state,oe,D,V),Me=ie.getProgramCacheKey(ce);let be=O.programs;O.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?D.environment:null,O.fog=D.fog;const Fe=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;O.envMap=Y.get(M.envMap||O.environment,Fe),O.envMapRotation=O.environment!==null&&M.envMap===null?D.environmentRotation:M.envMapRotation,be===void 0&&(M.addEventListener("dispose",it),be=new Map,O.programs=be);let He=be.get(Me);if(He!==void 0){if(O.currentProgram===He&&O.lightsStateVersion===fe)return Bh(M,ce),He}else ce.uniforms=ie.getUniforms(M),M.onBeforeCompile(ce,T),He=ie.acquireProgram(ce,Me),be.set(Me,He),O.uniforms=ce.uniforms;const we=O.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(we.clippingPlanes=ee.uniform),Bh(M,ce),O.needsLights=j0(M),O.lightsStateVersion=fe,O.needsLights&&(we.ambientLightColor.value=F.state.ambient,we.lightProbe.value=F.state.probe,we.directionalLights.value=F.state.directional,we.directionalLightShadows.value=F.state.directionalShadow,we.spotLights.value=F.state.spot,we.spotLightShadows.value=F.state.spotShadow,we.rectAreaLights.value=F.state.rectArea,we.ltc_1.value=F.state.rectAreaLTC1,we.ltc_2.value=F.state.rectAreaLTC2,we.pointLights.value=F.state.point,we.pointLightShadows.value=F.state.pointShadow,we.hemisphereLights.value=F.state.hemi,we.directionalShadowMatrix.value=F.state.directionalShadowMatrix,we.spotLightMatrix.value=F.state.spotLightMatrix,we.spotLightMap.value=F.state.spotLightMap,we.pointShadowMatrix.value=F.state.pointShadowMatrix),O.currentProgram=He,O.uniformsList=null,He}function Oh(M){if(M.uniformsList===null){const D=M.currentProgram.getUniforms();M.uniformsList=oo.seqWithValue(D.seq,M.uniforms)}return M.uniformsList}function Bh(M,D){const V=g.get(M);V.outputColorSpace=D.outputColorSpace,V.batching=D.batching,V.batchingColor=D.batchingColor,V.instancing=D.instancing,V.instancingColor=D.instancingColor,V.instancingMorph=D.instancingMorph,V.skinning=D.skinning,V.morphTargets=D.morphTargets,V.morphNormals=D.morphNormals,V.morphColors=D.morphColors,V.morphTargetsCount=D.morphTargetsCount,V.numClippingPlanes=D.numClippingPlanes,V.numIntersection=D.numClipIntersection,V.vertexAlphas=D.vertexAlphas,V.vertexTangents=D.vertexTangents,V.toneMapping=D.toneMapping}function q0(M,D,V,O,F){D.isScene!==!0&&(D=ct),I.resetTextureUnits();const oe=D.fog,fe=O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial?D.environment:null,ce=z===null?T.outputColorSpace:z.isXRRenderTarget===!0?z.texture.colorSpace:as,Me=O.isMeshStandardMaterial||O.isMeshLambertMaterial&&!O.envMap||O.isMeshPhongMaterial&&!O.envMap,be=Y.get(O.envMap||fe,Me),Fe=O.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,He=!!V.attributes.tangent&&(!!O.normalMap||O.anisotropy>0),we=!!V.morphAttributes.position,st=!!V.morphAttributes.normal,Rt=!!V.morphAttributes.color;let yt=ai;O.toneMapped&&(z===null||z.isXRRenderTarget===!0)&&(yt=T.toneMapping);const at=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,$t=at!==void 0?at.length:0,Ee=g.get(O),gn=w.state.lights;if(Le===!0&&(De===!0||M!==k)){const Gt=M===k&&O.id===q;ee.setState(O,M,Gt)}let Ze=!1;O.version===Ee.__version?(Ee.needsLights&&Ee.lightsStateVersion!==gn.state.version||Ee.outputColorSpace!==ce||F.isBatchedMesh&&Ee.batching===!1||!F.isBatchedMesh&&Ee.batching===!0||F.isBatchedMesh&&Ee.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ee.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ee.instancing===!1||!F.isInstancedMesh&&Ee.instancing===!0||F.isSkinnedMesh&&Ee.skinning===!1||!F.isSkinnedMesh&&Ee.skinning===!0||F.isInstancedMesh&&Ee.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ee.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ee.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ee.instancingMorph===!1&&F.morphTexture!==null||Ee.envMap!==be||O.fog===!0&&Ee.fog!==oe||Ee.numClippingPlanes!==void 0&&(Ee.numClippingPlanes!==ee.numPlanes||Ee.numIntersection!==ee.numIntersection)||Ee.vertexAlphas!==Fe||Ee.vertexTangents!==He||Ee.morphTargets!==we||Ee.morphNormals!==st||Ee.morphColors!==Rt||Ee.toneMapping!==yt||Ee.morphTargetsCount!==$t)&&(Ze=!0):(Ze=!0,Ee.__version=O.version);let Vn=Ee.currentProgram;Ze===!0&&(Vn=Ta(O,D,F));let Zn=!1,rr=!1,Ir=!1;const lt=Vn.getUniforms(),Yt=Ee.uniforms;if(Se.useProgram(Vn.program)&&(Zn=!0,rr=!0,Ir=!0),O.id!==q&&(q=O.id,rr=!0),Zn||k!==M){Se.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),lt.setValue(C,"projectionMatrix",M.projectionMatrix),lt.setValue(C,"viewMatrix",M.matrixWorldInverse);const ki=lt.map.cameraPosition;ki!==void 0&&ki.setValue(C,je.setFromMatrixPosition(M.matrixWorld)),ht.logarithmicDepthBuffer&&lt.setValue(C,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(O.isMeshPhongMaterial||O.isMeshToonMaterial||O.isMeshLambertMaterial||O.isMeshBasicMaterial||O.isMeshStandardMaterial||O.isShaderMaterial)&&lt.setValue(C,"isOrthographic",M.isOrthographicCamera===!0),k!==M&&(k=M,rr=!0,Ir=!0)}if(Ee.needsLights&&(gn.state.directionalShadowMap.length>0&&lt.setValue(C,"directionalShadowMap",gn.state.directionalShadowMap,I),gn.state.spotShadowMap.length>0&&lt.setValue(C,"spotShadowMap",gn.state.spotShadowMap,I),gn.state.pointShadowMap.length>0&&lt.setValue(C,"pointShadowMap",gn.state.pointShadowMap,I)),F.isSkinnedMesh){lt.setOptional(C,F,"bindMatrix"),lt.setOptional(C,F,"bindMatrixInverse");const Gt=F.skeleton;Gt&&(Gt.boneTexture===null&&Gt.computeBoneTexture(),lt.setValue(C,"boneTexture",Gt.boneTexture,I))}F.isBatchedMesh&&(lt.setOptional(C,F,"batchingTexture"),lt.setValue(C,"batchingTexture",F._matricesTexture,I),lt.setOptional(C,F,"batchingIdTexture"),lt.setValue(C,"batchingIdTexture",F._indirectTexture,I),lt.setOptional(C,F,"batchingColorTexture"),F._colorsTexture!==null&&lt.setValue(C,"batchingColorTexture",F._colorsTexture,I));const Bi=V.morphAttributes;if((Bi.position!==void 0||Bi.normal!==void 0||Bi.color!==void 0)&&ue.update(F,V,Vn),(rr||Ee.receiveShadow!==F.receiveShadow)&&(Ee.receiveShadow=F.receiveShadow,lt.setValue(C,"receiveShadow",F.receiveShadow)),(O.isMeshStandardMaterial||O.isMeshLambertMaterial||O.isMeshPhongMaterial)&&O.envMap===null&&D.environment!==null&&(Yt.envMapIntensity.value=D.environmentIntensity),Yt.dfgLUT!==void 0&&(Yt.dfgLUT.value=f3()),rr&&(lt.setValue(C,"toneMappingExposure",T.toneMappingExposure),Ee.needsLights&&Y0(Yt,Ir),oe&&O.fog===!0&&Ce.refreshFogUniforms(Yt,oe),Ce.refreshMaterialUniforms(Yt,O,ke,he,w.state.transmissionRenderTarget[M.id]),oo.upload(C,Oh(Ee),Yt,I)),O.isShaderMaterial&&O.uniformsNeedUpdate===!0&&(oo.upload(C,Oh(Ee),Yt,I),O.uniformsNeedUpdate=!1),O.isSpriteMaterial&&lt.setValue(C,"center",F.center),lt.setValue(C,"modelViewMatrix",F.modelViewMatrix),lt.setValue(C,"normalMatrix",F.normalMatrix),lt.setValue(C,"modelMatrix",F.matrixWorld),O.isShaderMaterial||O.isRawShaderMaterial){const Gt=O.uniformsGroups;for(let ki=0,Dr=Gt.length;ki<Dr;ki++){const kh=Gt[ki];de.update(kh,Vn),de.bind(kh,Vn)}}return Vn}function Y0(M,D){M.ambientLightColor.needsUpdate=D,M.lightProbe.needsUpdate=D,M.directionalLights.needsUpdate=D,M.directionalLightShadows.needsUpdate=D,M.pointLights.needsUpdate=D,M.pointLightShadows.needsUpdate=D,M.spotLights.needsUpdate=D,M.spotLightShadows.needsUpdate=D,M.rectAreaLights.needsUpdate=D,M.hemisphereLights.needsUpdate=D}function j0(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return z},this.setRenderTargetTextures=function(M,D,V){const O=g.get(M);O.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,O.__autoAllocateDepthBuffer===!1&&(O.__useRenderToTexture=!1),g.get(M.texture).__webglTexture=D,g.get(M.depthTexture).__webglTexture=O.__autoAllocateDepthBuffer?void 0:V,O.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,D){const V=g.get(M);V.__webglFramebuffer=D,V.__useDefaultFramebuffer=D===void 0};const K0=C.createFramebuffer();this.setRenderTarget=function(M,D=0,V=0){z=M,R=D,B=V;let O=null,F=!1,oe=!1;if(M){const ce=g.get(M);if(ce.__useDefaultFramebuffer!==void 0){Se.bindFramebuffer(C.FRAMEBUFFER,ce.__webglFramebuffer),G.copy(M.viewport),N.copy(M.scissor),Q=M.scissorTest,Se.viewport(G),Se.scissor(N),Se.setScissorTest(Q),q=-1;return}else if(ce.__webglFramebuffer===void 0)I.setupRenderTarget(M);else if(ce.__hasExternalTextures)I.rebindTextures(M,g.get(M.texture).__webglTexture,g.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Fe=M.depthTexture;if(ce.__boundDepthTexture!==Fe){if(Fe!==null&&g.has(Fe)&&(M.width!==Fe.image.width||M.height!==Fe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");I.setupDepthRenderbuffer(M)}}const Me=M.texture;(Me.isData3DTexture||Me.isDataArrayTexture||Me.isCompressedArrayTexture)&&(oe=!0);const be=g.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(be[D])?O=be[D][V]:O=be[D],F=!0):M.samples>0&&I.useMultisampledRTT(M)===!1?O=g.get(M).__webglMultisampledFramebuffer:Array.isArray(be)?O=be[V]:O=be,G.copy(M.viewport),N.copy(M.scissor),Q=M.scissorTest}else G.copy(j).multiplyScalar(ke).floor(),N.copy(ne).multiplyScalar(ke).floor(),Q=se;if(V!==0&&(O=K0),Se.bindFramebuffer(C.FRAMEBUFFER,O)&&Se.drawBuffers(M,O),Se.viewport(G),Se.scissor(N),Se.setScissorTest(Q),F){const ce=g.get(M.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+D,ce.__webglTexture,V)}else if(oe){const ce=D;for(let Me=0;Me<M.textures.length;Me++){const be=g.get(M.textures[Me]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Me,be.__webglTexture,V,ce)}}else if(M!==null&&V!==0){const ce=g.get(M.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,ce.__webglTexture,V)}q=-1},this.readRenderTargetPixels=function(M,D,V,O,F,oe,fe,ce=0){if(!(M&&M.isWebGLRenderTarget)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Me=g.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&fe!==void 0&&(Me=Me[fe]),Me){Se.bindFramebuffer(C.FRAMEBUFFER,Me);try{const be=M.textures[ce],Fe=be.format,He=be.type;if(M.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+ce),!ht.textureFormatReadable(Fe)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ht.textureTypeReadable(He)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=M.width-O&&V>=0&&V<=M.height-F&&C.readPixels(D,V,O,F,re.convert(Fe),re.convert(He),oe)}finally{const be=z!==null?g.get(z).__webglFramebuffer:null;Se.bindFramebuffer(C.FRAMEBUFFER,be)}}},this.readRenderTargetPixelsAsync=async function(M,D,V,O,F,oe,fe,ce=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=g.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&fe!==void 0&&(Me=Me[fe]),Me)if(D>=0&&D<=M.width-O&&V>=0&&V<=M.height-F){Se.bindFramebuffer(C.FRAMEBUFFER,Me);const be=M.textures[ce],Fe=be.format,He=be.type;if(M.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+ce),!ht.textureFormatReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ht.textureTypeReadable(He))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const we=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,we),C.bufferData(C.PIXEL_PACK_BUFFER,oe.byteLength,C.STREAM_READ),C.readPixels(D,V,O,F,re.convert(Fe),re.convert(He),0);const st=z!==null?g.get(z).__webglFramebuffer:null;Se.bindFramebuffer(C.FRAMEBUFFER,st);const Rt=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Ug(C,Rt,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,we),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,oe),C.deleteBuffer(we),C.deleteSync(Rt),oe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,D=null,V=0){const O=Math.pow(2,-V),F=Math.floor(M.image.width*O),oe=Math.floor(M.image.height*O),fe=D!==null?D.x:0,ce=D!==null?D.y:0;I.setTexture2D(M,0),C.copyTexSubImage2D(C.TEXTURE_2D,V,0,0,fe,ce,F,oe),Se.unbindTexture()};const $0=C.createFramebuffer(),Z0=C.createFramebuffer();this.copyTextureToTexture=function(M,D,V=null,O=null,F=0,oe=0){let fe,ce,Me,be,Fe,He,we,st,Rt;const yt=M.isCompressedTexture?M.mipmaps[oe]:M.image;if(V!==null)fe=V.max.x-V.min.x,ce=V.max.y-V.min.y,Me=V.isBox3?V.max.z-V.min.z:1,be=V.min.x,Fe=V.min.y,He=V.isBox3?V.min.z:0;else{const Yt=Math.pow(2,-F);fe=Math.floor(yt.width*Yt),ce=Math.floor(yt.height*Yt),M.isDataArrayTexture?Me=yt.depth:M.isData3DTexture?Me=Math.floor(yt.depth*Yt):Me=1,be=0,Fe=0,He=0}O!==null?(we=O.x,st=O.y,Rt=O.z):(we=0,st=0,Rt=0);const at=re.convert(D.format),$t=re.convert(D.type);let Ee;D.isData3DTexture?(I.setTexture3D(D,0),Ee=C.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(I.setTexture2DArray(D,0),Ee=C.TEXTURE_2D_ARRAY):(I.setTexture2D(D,0),Ee=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,D.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,D.unpackAlignment);const gn=C.getParameter(C.UNPACK_ROW_LENGTH),Ze=C.getParameter(C.UNPACK_IMAGE_HEIGHT),Vn=C.getParameter(C.UNPACK_SKIP_PIXELS),Zn=C.getParameter(C.UNPACK_SKIP_ROWS),rr=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,yt.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,yt.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,be),C.pixelStorei(C.UNPACK_SKIP_ROWS,Fe),C.pixelStorei(C.UNPACK_SKIP_IMAGES,He);const Ir=M.isDataArrayTexture||M.isData3DTexture,lt=D.isDataArrayTexture||D.isData3DTexture;if(M.isDepthTexture){const Yt=g.get(M),Bi=g.get(D),Gt=g.get(Yt.__renderTarget),ki=g.get(Bi.__renderTarget);Se.bindFramebuffer(C.READ_FRAMEBUFFER,Gt.__webglFramebuffer),Se.bindFramebuffer(C.DRAW_FRAMEBUFFER,ki.__webglFramebuffer);for(let Dr=0;Dr<Me;Dr++)Ir&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,g.get(M).__webglTexture,F,He+Dr),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,g.get(D).__webglTexture,oe,Rt+Dr)),C.blitFramebuffer(be,Fe,fe,ce,we,st,fe,ce,C.DEPTH_BUFFER_BIT,C.NEAREST);Se.bindFramebuffer(C.READ_FRAMEBUFFER,null),Se.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(F!==0||M.isRenderTargetTexture||g.has(M)){const Yt=g.get(M),Bi=g.get(D);Se.bindFramebuffer(C.READ_FRAMEBUFFER,$0),Se.bindFramebuffer(C.DRAW_FRAMEBUFFER,Z0);for(let Gt=0;Gt<Me;Gt++)Ir?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Yt.__webglTexture,F,He+Gt):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Yt.__webglTexture,F),lt?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Bi.__webglTexture,oe,Rt+Gt):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Bi.__webglTexture,oe),F!==0?C.blitFramebuffer(be,Fe,fe,ce,we,st,fe,ce,C.COLOR_BUFFER_BIT,C.NEAREST):lt?C.copyTexSubImage3D(Ee,oe,we,st,Rt+Gt,be,Fe,fe,ce):C.copyTexSubImage2D(Ee,oe,we,st,be,Fe,fe,ce);Se.bindFramebuffer(C.READ_FRAMEBUFFER,null),Se.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else lt?M.isDataTexture||M.isData3DTexture?C.texSubImage3D(Ee,oe,we,st,Rt,fe,ce,Me,at,$t,yt.data):D.isCompressedArrayTexture?C.compressedTexSubImage3D(Ee,oe,we,st,Rt,fe,ce,Me,at,yt.data):C.texSubImage3D(Ee,oe,we,st,Rt,fe,ce,Me,at,$t,yt):M.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,oe,we,st,fe,ce,at,$t,yt.data):M.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,oe,we,st,yt.width,yt.height,at,yt.data):C.texSubImage2D(C.TEXTURE_2D,oe,we,st,fe,ce,at,$t,yt);C.pixelStorei(C.UNPACK_ROW_LENGTH,gn),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,Ze),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Vn),C.pixelStorei(C.UNPACK_SKIP_ROWS,Zn),C.pixelStorei(C.UNPACK_SKIP_IMAGES,rr),oe===0&&D.generateMipmaps&&C.generateMipmap(Ee),Se.unbindTexture()},this.initRenderTarget=function(M){g.get(M).__webglFramebuffer===void 0&&I.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?I.setTextureCube(M,0):M.isData3DTexture?I.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?I.setTexture2DArray(M,0):I.setTexture2D(M,0),Se.unbindTexture()},this.resetState=function(){R=0,B=0,z=null,Se.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ri}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const n=this.getContext();n.drawingBufferColorSpace=Ke._getDrawingBufferColorSpace(e),n.unpackColorSpace=Ke._getUnpackColorSpace()}}class p3{constructor(){sn(this,"_listeners",new Map)}on(e,n){return this._listeners.has(e)||this._listeners.set(e,new Set),this._listeners.get(e).add(n),this}off(e,n){var i;return(i=this._listeners.get(e))==null||i.delete(n),this}emit(e,n){var i;(i=this._listeners.get(e))==null||i.forEach(r=>r(n))}removeAllListeners(e){return e?this._listeners.delete(e):this._listeners.clear(),this}}var cs=typeof self<"u"?self:{};function Up(t,e){e:{for(var n=["CLOSURE_FLAGS"],i=cs,r=0;r<n.length;r++)if((i=i[n[r]])==null){n=null;break e}n=i}return(t=n&&n[t])!=null?t:e}function hr(){throw Error("Invalid UTF8")}function zf(t,e){return e=String.fromCharCode.apply(null,e),t==null?e:t+e}let $a,Gc;const m3=typeof TextDecoder<"u";let g3;const _3=typeof TextEncoder<"u";function Np(t){if(_3)t=(g3||(g3=new TextEncoder)).encode(t);else{let n=0;const i=new Uint8Array(3*t.length);for(let r=0;r<t.length;r++){var e=t.charCodeAt(r);if(e<128)i[n++]=e;else{if(e<2048)i[n++]=e>>6|192;else{if(e>=55296&&e<=57343){if(e<=56319&&r<t.length){const s=t.charCodeAt(++r);if(s>=56320&&s<=57343){e=1024*(e-55296)+s-56320+65536,i[n++]=e>>18|240,i[n++]=e>>12&63|128,i[n++]=e>>6&63|128,i[n++]=63&e|128;continue}r--}e=65533}i[n++]=e>>12|224,i[n++]=e>>6&63|128}i[n++]=63&e|128}}t=n===i.length?i:i.subarray(0,n)}return t}function Fp(t){cs.setTimeout(()=>{throw t},0)}var Zl,v3=Up(610401301,!1),Vf=Up(748402147,!0);function Gf(){var t=cs.navigator;return t&&(t=t.userAgent)?t:""}const Hf=cs.navigator;function No(t){return No[" "](t),t}Zl=Hf&&Hf.userAgentData||null,No[" "]=function(){};const Op={};let js=null;function x3(t){const e=t.length;let n=3*e/4;n%3?n=Math.floor(n):"=.".indexOf(t[e-1])!=-1&&(n="=.".indexOf(t[e-2])!=-1?n-2:n-1);const i=new Uint8Array(n);let r=0;return function(s,a){function o(l){for(;c<s.length;){const h=s.charAt(c++),f=js[h];if(f!=null)return f;if(!/^[\s\xa0]*$/.test(h))throw Error("Unknown base64 encoding at char: "+h)}return l}Bp();let c=0;for(;;){const l=o(-1),h=o(0),f=o(64),u=o(64);if(u===64&&l===-1)break;a(l<<2|h>>4),f!=64&&(a(h<<4&240|f>>2),u!=64&&a(f<<6&192|u))}}(t,function(s){i[r++]=s}),r!==n?i.subarray(0,r):i}function Bp(){if(!js){js={};var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),e=["+/=","+/","-_=","-_.","-_"];for(let n=0;n<5;n++){const i=t.concat(e[n].split(""));Op[n]=i;for(let r=0;r<i.length;r++){const s=i[r];js[s]===void 0&&(js[s]=r)}}}}var M3=typeof Uint8Array<"u",kp=!(!(v3&&Zl&&Zl.brands.length>0)&&(Gf().indexOf("Trident")!=-1||Gf().indexOf("MSIE")!=-1))&&typeof btoa=="function";const Wf=/[-_.]/g,S3={"-":"+",_:"/",".":"="};function E3(t){return S3[t]||""}function zp(t){if(!kp)return x3(t);t=Wf.test(t)?t.replace(Wf,E3):t,t=atob(t);const e=new Uint8Array(t.length);for(let n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}function Uu(t){return M3&&t!=null&&t instanceof Uint8Array}var ls={};function Ar(){return y3||(y3=new ci(null,ls))}function Nu(t){Vp(ls);var e=t.g;return(e=e==null||Uu(e)?e:typeof e=="string"?zp(e):null)==null?e:t.g=e}var ci=class{h(){return new Uint8Array(Nu(this)||0)}constructor(t,e){if(Vp(e),this.g=t,t!=null&&t.length===0)throw Error("ByteString should be constructed with non-empty values")}};let y3,T3;function Vp(t){if(t!==ls)throw Error("illegal external caller")}function Gp(t,e){t.__closure__error__context__984382||(t.__closure__error__context__984382={}),t.__closure__error__context__984382.severity=e}function Jl(t){return Gp(t=Error(t),"warning"),t}function us(t,e){if(t!=null){var n=T3??(T3={}),i=n[t]||0;i>=e||(n[t]=i+1,Gp(t=Error(),"incident"),Fp(t))}}function Ts(){return typeof BigInt=="function"}var bs=typeof Symbol=="function"&&typeof Symbol()=="symbol";function di(t,e,n=!1){return typeof Symbol=="function"&&typeof Symbol()=="symbol"?n&&Symbol.for&&t?Symbol.for(t):t!=null?Symbol(t):Symbol():e}var b3=di("jas",void 0,!0),Xf=di(void 0,"0di"),Ws=di(void 0,"1oa"),bn=di(void 0,Symbol()),A3=di(void 0,"0ub"),w3=di(void 0,"0ubs"),Ql=di(void 0,"0ubsb"),R3=di(void 0,"0actk"),hs=di("m_m","Pa",!0),qf=di();const Hp={Ga:{value:0,configurable:!0,writable:!0,enumerable:!1}},Wp=Object.defineProperties,ye=bs?b3:"Ga";var Cr;const Yf=[];function ma(t,e){bs||ye in t||Wp(t,Hp),t[ye]|=e}function zt(t,e){bs||ye in t||Wp(t,Hp),t[ye]=e}function ga(t){return ma(t,34),t}function oa(t){return ma(t,8192),t}zt(Yf,7),Cr=Object.freeze(Yf);var fs={};function wn(t,e){return e===void 0?t.h!==wr&&!!(2&(0|t.v[ye])):!!(2&e)&&t.h!==wr}const wr={};function Fu(t,e){if(t!=null){if(typeof t=="string")t=t?new ci(t,ls):Ar();else if(t.constructor!==ci)if(Uu(t))t=t.length?new ci(new Uint8Array(t),ls):Ar();else{if(!e)throw Error();t=void 0}}return t}class jf{constructor(e,n,i){this.g=e,this.h=n,this.l=i}next(){const e=this.g.next();return e.done||(e.value=this.h.call(this.l,e.value)),e}[Symbol.iterator](){return this}}var C3=Object.freeze({});function Xp(t,e,n){const i=128&e?0:-1,r=t.length;var s;(s=!!r)&&(s=(s=t[r-1])!=null&&typeof s=="object"&&s.constructor===Object);const a=r+(s?-1:0);for(e=128&e?1:0;e<a;e++)n(e-i,t[e]);if(s){t=t[r-1];for(const o in t)!isNaN(o)&&n(+o,t[o])}}var qp={};function As(t){return 128&t?qp:void 0}function Fo(t){return t.Na=!0,t}var P3=Fo(t=>typeof t=="number"),Kf=Fo(t=>typeof t=="string"),L3=Fo(t=>typeof t=="boolean"),Oo=typeof cs.BigInt=="function"&&typeof cs.BigInt(0)=="bigint";function An(t){var e=t;if(Kf(e)){if(!/^\s*(?:-?[1-9]\d*|0)?\s*$/.test(e))throw Error(String(e))}else if(P3(e)&&!Number.isSafeInteger(e))throw Error(String(e));return Oo?BigInt(t):t=L3(t)?t?"1":"0":Kf(t)?t.trim()||"0":String(t)}var eu=Fo(t=>Oo?t>=D3&&t<=N3:t[0]==="-"?$f(t,I3):$f(t,U3));const I3=Number.MIN_SAFE_INTEGER.toString(),D3=Oo?BigInt(Number.MIN_SAFE_INTEGER):void 0,U3=Number.MAX_SAFE_INTEGER.toString(),N3=Oo?BigInt(Number.MAX_SAFE_INTEGER):void 0;function $f(t,e){if(t.length>e.length)return!1;if(t.length<e.length||t===e)return!0;for(let n=0;n<t.length;n++){const i=t[n],r=e[n];if(i>r)return!1;if(i<r)return!0}}const F3=typeof Uint8Array.prototype.slice=="function";let O3,vt=0,It=0;function Zf(t){const e=t>>>0;vt=e,It=(t-e)/4294967296>>>0}function ds(t){if(t<0){Zf(-t);const[e,n]=ku(vt,It);vt=e>>>0,It=n>>>0}else Zf(t)}function Ou(t){const e=O3||(O3=new DataView(new ArrayBuffer(8)));e.setFloat32(0,+t,!0),It=0,vt=e.getUint32(0,!0)}function Yp(t,e){const n=4294967296*e+(t>>>0);return Number.isSafeInteger(n)?n:ca(t,e)}function B3(t,e){return An(Ts()?BigInt.asUintN(64,(BigInt(e>>>0)<<BigInt(32))+BigInt(t>>>0)):ca(t,e))}function jp(t,e){return Ts()?An(BigInt.asIntN(64,(BigInt.asUintN(32,BigInt(e))<<BigInt(32))+BigInt.asUintN(32,BigInt(t)))):An(Bu(t,e))}function ca(t,e){if(t>>>=0,(e>>>=0)<=2097151)var n=""+(4294967296*e+t);else Ts()?n=""+(BigInt(e)<<BigInt(32)|BigInt(t)):(t=(16777215&t)+6777216*(n=16777215&(t>>>24|e<<8))+6710656*(e=e>>16&65535),n+=8147497*e,e*=2,t>=1e7&&(n+=t/1e7>>>0,t%=1e7),n>=1e7&&(e+=n/1e7>>>0,n%=1e7),n=e+Jf(n)+Jf(t));return n}function Jf(t){return t=String(t),"0000000".slice(t.length)+t}function Bu(t,e){if(2147483648&e)if(Ts())t=""+(BigInt(0|e)<<BigInt(32)|BigInt(t>>>0));else{const[n,i]=ku(t,e);t="-"+ca(n,i)}else t=ca(t,e);return t}function Bo(t){if(t.length<16)ds(Number(t));else if(Ts())t=BigInt(t),vt=Number(t&BigInt(4294967295))>>>0,It=Number(t>>BigInt(32)&BigInt(4294967295));else{const e=+(t[0]==="-");It=vt=0;const n=t.length;for(let i=e,r=(n-e)%6+e;r<=n;i=r,r+=6){const s=Number(t.slice(i,r));It*=1e6,vt=1e6*vt+s,vt>=4294967296&&(It+=Math.trunc(vt/4294967296),It>>>=0,vt>>>=0)}if(e){const[i,r]=ku(vt,It);vt=i,It=r}}}function ku(t,e){return e=~e,t?t=1+~t:e+=1,[t,e]}function Yn(t){return Array.prototype.slice.call(t)}const _a=typeof BigInt=="function"?BigInt.asIntN:void 0,k3=typeof BigInt=="function"?BigInt.asUintN:void 0,Rr=Number.isSafeInteger,ko=Number.isFinite,ps=Math.trunc,z3=An(0);function Ks(t){if(t!=null&&typeof t!="number")throw Error(`Value of float/double field must be a number, found ${typeof t}: ${t}`);return t}function si(t){return t==null||typeof t=="number"?t:t==="NaN"||t==="Infinity"||t==="-Infinity"?Number(t):void 0}function la(t){if(t!=null&&typeof t!="boolean"){var e=typeof t;throw Error(`Expected boolean but got ${e!="object"?e:t?Array.isArray(t)?"array":e:"null"}: ${t}`)}return t}function Kp(t){return t==null||typeof t=="boolean"?t:typeof t=="number"?!!t:void 0}const V3=/^-?([1-9][0-9]*|0)(\.[0-9]+)?$/;function va(t){switch(typeof t){case"bigint":return!0;case"number":return ko(t);case"string":return V3.test(t);default:return!1}}function ws(t){if(t==null)return t;if(typeof t=="string"&&t)t=+t;else if(typeof t!="number")return;return ko(t)?0|t:void 0}function $p(t){if(t==null)return t;if(typeof t=="string"&&t)t=+t;else if(typeof t!="number")return;return ko(t)?t>>>0:void 0}function Zp(t){const e=t.length;return(t[0]==="-"?e<20||e===20&&t<="-9223372036854775808":e<19||e===19&&t<="9223372036854775807")?t:(Bo(t),Bu(vt,It))}function zu(t){if(t=ps(t),!Rr(t)){ds(t);var e=vt,n=It;(t=2147483648&n)&&(n=~n>>>0,(e=1+~e>>>0)==0&&(n=n+1>>>0)),t=typeof(e=Yp(e,n))=="number"?t?-e:e:t?"-"+e:e}return t}function Jp(t){var e=ps(Number(t));return Rr(e)?String(e):((e=t.indexOf("."))!==-1&&(t=t.substring(0,e)),Zp(t))}function Qp(t){var e=ps(Number(t));return Rr(e)?An(e):((e=t.indexOf("."))!==-1&&(t=t.substring(0,e)),Ts()?An(_a(64,BigInt(t))):An(Zp(t)))}function em(t){return Rr(t)?t=An(zu(t)):(t=ps(t),Rr(t)?t=String(t):(ds(t),t=Bu(vt,It)),t=An(t)),t}function _o(t){const e=typeof t;return t==null?t:e==="bigint"?An(_a(64,t)):va(t)?e==="string"?Qp(t):em(t):void 0}function tm(t){if(typeof t!="string")throw Error();return t}function xa(t){if(t!=null&&typeof t!="string")throw Error();return t}function Kt(t){return t==null||typeof t=="string"?t:void 0}function Vu(t,e,n,i){return t!=null&&t[hs]===fs?t:Array.isArray(t)?((i=(n=0|t[ye])|32&i|2&i)!==n&&zt(t,i),new e(t)):(n?2&i?((t=e[Xf])||(ga((t=new e).v),t=e[Xf]=t),e=t):e=new e:e=void 0,e)}function G3(t,e,n){if(e)e:{if(!va(e=t))throw Jl("int64");switch(typeof e){case"string":e=Qp(e);break e;case"bigint":e=An(_a(64,e));break e;default:e=em(e)}}else e=_o(t);return(t=e)==null?n?z3:void 0:t}const H3={};let W3=function(){try{return No(new class extends Map{constructor(){super()}}),!1}catch{return!0}}();class Hc{constructor(){this.g=new Map}get(e){return this.g.get(e)}set(e,n){return this.g.set(e,n),this.size=this.g.size,this}delete(e){return e=this.g.delete(e),this.size=this.g.size,e}clear(){this.g.clear(),this.size=this.g.size}has(e){return this.g.has(e)}entries(){return this.g.entries()}keys(){return this.g.keys()}values(){return this.g.values()}forEach(e,n){return this.g.forEach(e,n)}[Symbol.iterator](){return this.entries()}}const X3=W3?(Object.setPrototypeOf(Hc.prototype,Map.prototype),Object.defineProperties(Hc.prototype,{size:{value:0,configurable:!0,enumerable:!0,writable:!0}}),Hc):class extends Map{constructor(){super()}};function Qf(t){return t}function Wc(t){if(2&t.J)throw Error("Cannot mutate an immutable Map")}var Di=class extends X3{constructor(t,e,n=Qf,i=Qf){super(),this.J=0|t[ye],this.K=e,this.S=n,this.fa=this.K?q3:i;for(let r=0;r<t.length;r++){const s=t[r],a=n(s[0],!1,!0);let o=s[1];e?o===void 0&&(o=null):o=i(s[1],!1,!0,void 0,void 0,this.J),super.set(a,o)}}V(t){return oa(Array.from(super.entries(),t))}clear(){Wc(this),super.clear()}delete(t){return Wc(this),super.delete(this.S(t,!0,!1))}entries(){if(this.K){var t=super.keys();t=new jf(t,Y3,this)}else t=super.entries();return t}values(){if(this.K){var t=super.keys();t=new jf(t,Di.prototype.get,this)}else t=super.values();return t}forEach(t,e){this.K?super.forEach((n,i,r)=>{t.call(e,r.get(i),i,r)}):super.forEach(t,e)}set(t,e){return Wc(this),(t=this.S(t,!0,!1))==null?this:e==null?(super.delete(t),this):super.set(t,this.fa(e,!0,!0,this.K,!1,this.J))}Ma(t){const e=this.S(t[0],!1,!0);t=t[1],t=this.K?t===void 0?null:t:this.fa(t,!1,!0,void 0,!1,this.J),super.set(e,t)}has(t){return super.has(this.S(t,!1,!1))}get(t){t=this.S(t,!1,!1);const e=super.get(t);if(e!==void 0){var n=this.K;return n?((n=this.fa(e,!1,!0,n,this.ra,this.J))!==e&&super.set(t,n),n):e}}[Symbol.iterator](){return this.entries()}};function q3(t,e,n,i,r,s){return t=Vu(t,i,n,s),r&&(t=Hu(t)),t}function Y3(t){return[t,this.get(t)]}let j3;function ed(){return j3||(j3=new Di(ga([]),void 0,void 0,void 0,H3))}function zo(t){return bn?t[bn]:void 0}function vo(t,e){for(const n in t)!isNaN(n)&&e(t,+n,t[n])}Di.prototype.toJSON=void 0;var tu=class{};const K3={Ka:!0};function $3(t,e){e<100||us(w3,1)}function Vo(t,e,n,i){const r=i!==void 0;i=!!i;var s,a=bn;!r&&bs&&a&&(s=t[a])&&vo(s,$3),a=[];var o=t.length;let c;s=4294967295;let l=!1;const h=!!(64&e),f=h?128&e?0:-1:void 0;1&e||(c=o&&t[o-1],c!=null&&typeof c=="object"&&c.constructor===Object?s=--o:c=void 0,!h||128&e||r||(l=!0,s=s-f+f)),e=void 0;for(var u=0;u<o;u++){let m=t[u];if(m!=null&&(m=n(m,i))!=null)if(h&&u>=s){const _=u-f;(e??(e={}))[_]=m}else a[u]=m}if(c)for(let m in c){if((o=c[m])==null||(o=n(o,i))==null)continue;let _;u=+m,h&&!Number.isNaN(u)&&(_=u+f)<s?a[_]=o:(e??(e={}))[m]=o}return e&&(l?a.push(e):a[s]=e),r&&bn&&(t=zo(t))&&t instanceof tu&&(a[bn]=function(m){const _=new tu;return vo(m,(S,p,d)=>{_[p]=Yn(d)}),_.da=m.da,_}(t)),a}function Z3(t){return t[0]=ua(t[0]),t[1]=ua(t[1]),t}function ua(t){switch(typeof t){case"number":return Number.isFinite(t)?t:""+t;case"bigint":return eu(t)?Number(t):""+t;case"boolean":return t?1:0;case"object":if(Array.isArray(t)){var e=0|t[ye];return t.length===0&&1&e?void 0:Vo(t,e,ua)}if(t!=null&&t[hs]===fs)return nm(t);if(t instanceof ci){if((e=t.g)==null)t="";else if(typeof e=="string")t=e;else{if(kp){for(var n="",i=0,r=e.length-10240;i<r;)n+=String.fromCharCode.apply(null,e.subarray(i,i+=10240));n+=String.fromCharCode.apply(null,i?e.subarray(i):e),e=btoa(n)}else{n===void 0&&(n=0),Bp(),n=Op[n],i=Array(Math.floor(e.length/3)),r=n[64]||"";let l=0,h=0;for(;l<e.length-2;l+=3){var s=e[l],a=e[l+1],o=e[l+2],c=n[s>>2];s=n[(3&s)<<4|a>>4],a=n[(15&a)<<2|o>>6],o=n[63&o],i[h++]=c+s+a+o}switch(c=0,o=r,e.length-l){case 2:o=n[(15&(c=e[l+1]))<<2]||r;case 1:e=e[l],i[h]=n[e>>2]+n[(3&e)<<4|c>>4]+o+r}e=i.join("")}t=t.g=e}return t}return t instanceof Di?t=t.size!==0?t.V(Z3):void 0:void 0}return t}let J3,Q3;function nm(t){return Vo(t=t.v,0|t[ye],ua)}function Mr(t,e){return im(t,e[0],e[1])}function im(t,e,n,i=0){if(t==null){var r=32;n?(t=[n],r|=128):t=[],e&&(r=-16760833&r|(1023&e)<<14)}else{if(!Array.isArray(t))throw Error("narr");if(r=0|t[ye],Vf&&1&r)throw Error("rfarr");if(2048&r&&!(2&r)&&function(){if(Vf)throw Error("carr");us(R3,5)}(),256&r)throw Error("farr");if(64&r)return(r|i)!==r&&zt(t,r|i),t;if(n&&(r|=128,n!==t[0]))throw Error("mid");e:{r|=64;var s=(n=t).length;if(s){var a=s-1;const c=n[a];if(c!=null&&typeof c=="object"&&c.constructor===Object){if((a-=e=128&r?0:-1)>=1024)throw Error("pvtlmt");for(var o in c)(s=+o)<a&&(n[s+e]=c[o],delete c[o]);r=-16760833&r|(1023&a)<<14;break e}}if(e){if((o=Math.max(e,s-(128&r?0:-1)))>1024)throw Error("spvt");r=-16760833&r|(1023&o)<<14}}}return zt(t,64|r|i),t}function eM(t,e){if(typeof t!="object")return t;if(Array.isArray(t)){var n=0|t[ye];return t.length===0&&1&n?void 0:td(t,n,e)}if(t!=null&&t[hs]===fs)return nd(t);if(t instanceof Di){if(2&(e=t.J))return t;if(!t.size)return;if(n=ga(t.V()),t.K)for(t=0;t<n.length;t++){const i=n[t];let r=i[1];r=r==null||typeof r!="object"?void 0:r!=null&&r[hs]===fs?nd(r):Array.isArray(r)?td(r,0|r[ye],!!(32&e)):void 0,i[1]=r}return n}return t instanceof ci?t:void 0}function td(t,e,n){return 2&e||(!n||4096&e||16&e?t=Rs(t,e,!1,n&&!(16&e)):(ma(t,34),4&e&&Object.freeze(t))),t}function Gu(t,e,n){return t=new t.constructor(e),n&&(t.h=wr),t.m=wr,t}function nd(t){const e=t.v,n=0|e[ye];return wn(t,n)?t:Wu(t,e,n)?Gu(t,e):Rs(e,n)}function Rs(t,e,n,i){return i??(i=!!(34&e)),t=Vo(t,e,eM,i),i=32,n&&(i|=2),zt(t,e=16769217&e|i),t}function Hu(t){const e=t.v,n=0|e[ye];return wn(t,n)?Wu(t,e,n)?Gu(t,e,!0):new t.constructor(Rs(e,n,!1)):t}function Cs(t){if(t.h!==wr)return!1;var e=t.v;return ma(e=Rs(e,0|e[ye]),2048),t.v=e,t.h=void 0,t.m=void 0,!0}function Ps(t){if(!Cs(t)&&wn(t,0|t.v[ye]))throw Error()}function Pr(t,e){e===void 0&&(e=0|t[ye]),32&e&&!(4096&e)&&zt(t,4096|e)}function Wu(t,e,n){return!!(2&n)||!(!(32&n)||4096&n)&&(zt(e,2|n),t.h=wr,!0)}const rm=An(0),qi={};function xt(t,e,n,i,r){if((e=Ui(t.v,e,n,r))!==null||i&&t.m!==wr)return e}function Ui(t,e,n,i){if(e===-1)return null;const r=e+(n?0:-1),s=t.length-1;let a,o;if(!(s<1+(n?0:-1))){if(r>=s)if(a=t[s],a!=null&&typeof a=="object"&&a.constructor===Object)n=a[e],o=!0;else{if(r!==s)return;n=a}else n=t[r];if(i&&n!=null){if((i=i(n))==null)return i;if(!Object.is(i,n))return o?a[e]=i:t[r]=i,i}return n}}function ot(t,e,n,i){Ps(t),Ft(t=t.v,0|t[ye],e,n,i)}function Ft(t,e,n,i,r){const s=n+(r?0:-1);var a=t.length-1;if(a>=1+(r?0:-1)&&s>=a){const o=t[a];if(o!=null&&typeof o=="object"&&o.constructor===Object)return o[n]=i,e}return s<=a?(t[s]=i,e):(i!==void 0&&(n>=(a=(e??(e=0|t[ye]))>>14&1023||536870912)?i!=null&&(t[a+(r?0:-1)]={[n]:i}):t[s]=i),e)}function vr(){return C3===void 0?2:4}function xr(t,e,n,i,r){let s=t.v,a=0|s[ye];i=wn(t,a)?1:i,r=!!r||i===3,i===2&&Cs(t)&&(s=t.v,a=0|s[ye]);let o=(t=Xu(s,e))===Cr?7:0|t[ye],c=qu(o,a);var l=!(4&c);if(l){4&c&&(t=Yn(t),o=0,c=Er(c,a),a=Ft(s,a,e,t));let h=0,f=0;for(;h<t.length;h++){const u=n(t[h]);u!=null&&(t[f++]=u)}f<h&&(t.length=f),n=-513&(4|c),c=n&=-1025,c&=-4097}return c!==o&&(zt(t,c),2&c&&Object.freeze(t)),sm(t,c,s,a,e,i,l,r)}function sm(t,e,n,i,r,s,a,o){let c=e;return s===1||s===4&&(2&e||!(16&e)&&32&i)?Sr(e)||((e|=!t.length||a&&!(4096&e)||32&i&&!(4096&e||16&e)?2:256)!==c&&zt(t,e),Object.freeze(t)):(s===2&&Sr(e)&&(t=Yn(t),c=0,e=Er(e,i),i=Ft(n,i,r,t)),Sr(e)||(o||(e|=16),e!==c&&zt(t,e))),2&e||!(4096&e||16&e)||Pr(n,i),t}function Xu(t,e,n){return t=Ui(t,e,n),Array.isArray(t)?t:Cr}function qu(t,e){return 2&e&&(t|=2),1|t}function Sr(t){return!!(2&t)&&!!(4&t)||!!(256&t)}function am(t){return Fu(t,!0)}function om(t){t=Yn(t);for(let e=0;e<t.length;e++){const n=t[e]=Yn(t[e]);Array.isArray(n[1])&&(n[1]=ga(n[1]))}return oa(t)}function ji(t,e,n,i){Ps(t),Ft(t=t.v,0|t[ye],e,(i==="0"?Number(n)===0:n===i)?void 0:n)}function Ls(t,e,n){if(2&e)throw Error();const i=As(e);let r=Xu(t,n,i),s=r===Cr?7:0|r[ye],a=qu(s,e);return(2&a||Sr(a)||16&a)&&(a===s||Sr(a)||zt(r,a),r=Yn(r),s=0,a=Er(a,e),Ft(t,e,n,r,i)),a&=-13,a!==s&&zt(r,a),r}function Xc(t,e){var n=Jm;return ju(Yu(t=t.v),t,void 0,n)===e?e:-1}function Yu(t){if(bs)return t[Ws]??(t[Ws]=new Map);if(Ws in t)return t[Ws];const e=new Map;return Object.defineProperty(t,Ws,{value:e}),e}function cm(t,e,n,i,r){const s=Yu(t),a=ju(s,t,e,n,r);return a!==i&&(a&&(e=Ft(t,e,a,void 0,r)),s.set(n,i)),e}function ju(t,e,n,i,r){let s=t.get(i);if(s!=null)return s;s=0;for(let a=0;a<i.length;a++){const o=i[a];Ui(e,o,r)!=null&&(s!==0&&(n=Ft(e,n,s,void 0,r)),s=o)}return t.set(i,s),s}function Ku(t,e,n){let i=0|t[ye];const r=As(i),s=Ui(t,n,r);let a;if(s!=null&&s[hs]===fs){if(!wn(s))return Cs(s),s.v;a=s.v}else Array.isArray(s)&&(a=s);if(a){const o=0|a[ye];2&o&&(a=Rs(a,o))}return a=Mr(a,e),a!==s&&Ft(t,i,n,a,r),a}function lm(t,e,n,i,r){let s=!1;if((i=Ui(t,i,r,a=>{const o=Vu(a,n,!1,e);return s=o!==a&&o!=null,o}))!=null)return s&&!wn(i)&&Pr(t,e),i}function Qe(t,e,n,i){let r=t.v,s=0|r[ye];if((e=lm(r,s,e,n,i))==null)return e;if(s=0|r[ye],!wn(t,s)){const a=Hu(e);a!==e&&(Cs(t)&&(r=t.v,s=0|r[ye]),s=Ft(r,s,n,e=a,i),Pr(r,s))}return e}function um(t,e,n,i,r,s,a,o){var c=wn(t,n);s=c?1:s,a=!!a||s===3,c=o&&!c,(s===2||c)&&Cs(t)&&(n=0|(e=t.v)[ye]);var l=(t=Xu(e,r))===Cr?7:0|t[ye],h=qu(l,n);if(o=!(4&h)){var f=t,u=n;const m=!!(2&h);m&&(u|=2);let _=!m,S=!0,p=0,d=0;for(;p<f.length;p++){const x=Vu(f[p],i,!1,u);if(x instanceof i){if(!m){const y=wn(x);_&&(_=!y),S&&(S=y)}f[d++]=x}}d<p&&(f.length=d),h|=4,h=S?-4097&h:4096|h,h=_?8|h:-9&h}if(h!==l&&(zt(t,h),2&h&&Object.freeze(t)),c&&!(8&h||!t.length&&(s===1||s===4&&(2&h||!(16&h)&&32&n)))){for(Sr(h)&&(t=Yn(t),h=Er(h,n),n=Ft(e,n,r,t)),i=t,c=h,l=0;l<i.length;l++)(f=i[l])!==(h=Hu(f))&&(i[l]=h);c|=8,zt(t,h=c=i.length?4096|c:-4097&c)}return sm(t,h,e,n,r,s,o,a)}function Ni(t,e,n){const i=t.v;return um(t,i,0|i[ye],e,n,vr(),!1,!0)}function hm(t){return t==null&&(t=void 0),t}function Pe(t,e,n,i,r){return ot(t,n,i=hm(i),r),i&&!wn(i)&&Pr(t.v),t}function Zs(t,e,n,i){e:{var r=i=hm(i);Ps(t);const s=t.v;let a=0|s[ye];if(r==null){const o=Yu(s);if(ju(o,s,a,n)!==e)break e;o.set(n,0)}else a=cm(s,a,n,e);Ft(s,a,e,r)}i&&!wn(i)&&Pr(t.v)}function Er(t,e){return-273&(2&e?2|t:-3&t)}function $u(t,e,n,i){var r=i;Ps(t),t=um(t,i=t.v,0|i[ye],n,e,2,!0),r=r??new n,t.push(r),e=n=t===Cr?7:0|t[ye],(r=wn(r))?(n&=-9,t.length===1&&(n&=-4097)):n|=4096,n!==e&&zt(t,n),r||Pr(i)}function On(t,e,n){return ws(xt(t,e,void 0,n))}function Ct(t,e){return xt(t,e,void 0,void 0,si)??0}function Fi(t,e,n){if(n!=null){if(typeof n!="number"||!ko(n))throw Jl("int32");n|=0}ot(t,e,n)}function Re(t,e,n){ot(t,e,Ks(n))}function Rn(t,e,n){ji(t,e,xa(n),"")}function xo(t,e,n){{Ps(t);const a=t.v;let o=0|a[ye];if(n==null)Ft(a,o,e);else{var i=t=n===Cr?7:0|n[ye],r=Sr(t),s=r||Object.isFrozen(n);for(r||(t=0),s||(n=Yn(n),i=0,t=Er(t,o),s=!1),t|=5,t|=(4&t?512&t?512:1024&t?1024:0:void 0)??1024,r=0;r<n.length;r++){const c=n[r],l=tm(c);Object.is(c,l)||(s&&(n=Yn(n),i=0,t=Er(t,o),s=!1),n[r]=l)}t!==i&&(s&&(n=Yn(n),t=Er(t,o)),zt(n,t)),Ft(a,o,e,n)}}}function Go(t,e,n){Ps(t),xr(t,e,Kt,2,!0).push(tm(n))}var jr=class{constructor(t,e,n){if(this.buffer=t,n&&!e)throw Error();this.g=e}};function Zu(t,e){if(typeof t=="string")return new jr(zp(t),e);if(Array.isArray(t))return new jr(new Uint8Array(t),e);if(t.constructor===Uint8Array)return new jr(t,!1);if(t.constructor===ArrayBuffer)return t=new Uint8Array(t),new jr(t,!1);if(t.constructor===ci)return e=Nu(t)||new Uint8Array(0),new jr(e,!0,t);if(t instanceof Uint8Array)return t=t.constructor===Uint8Array?t:new Uint8Array(t.buffer,t.byteOffset,t.byteLength),new jr(t,!1);throw Error()}function Ju(t,e){let n,i=0,r=0,s=0;const a=t.h;let o=t.g;do n=a[o++],i|=(127&n)<<s,s+=7;while(s<32&&128&n);if(s>32)for(r|=(127&n)>>4,s=3;s<32&&128&n;s+=7)n=a[o++],r|=(127&n)<<s;if(yr(t,o),!(128&n))return e(i>>>0,r>>>0);throw Error()}function Qu(t){let e=0,n=t.g;const i=n+10,r=t.h;for(;n<i;){const s=r[n++];if(e|=s,(128&s)==0)return yr(t,n),!!(127&e)}throw Error()}function er(t){const e=t.h;let n=t.g,i=e[n++],r=127&i;if(128&i&&(i=e[n++],r|=(127&i)<<7,128&i&&(i=e[n++],r|=(127&i)<<14,128&i&&(i=e[n++],r|=(127&i)<<21,128&i&&(i=e[n++],r|=i<<28,128&i&&128&e[n++]&&128&e[n++]&&128&e[n++]&&128&e[n++]&&128&e[n++])))))throw Error();return yr(t,n),r}function fi(t){return er(t)>>>0}function Mo(t){var e=t.h;const n=t.g;var i=e[n],r=e[n+1];const s=e[n+2];return e=e[n+3],yr(t,t.g+4),t=2*((r=(i<<0|r<<8|s<<16|e<<24)>>>0)>>31)+1,i=r>>>23&255,r&=8388607,i==255?r?NaN:t*(1/0):i==0?1401298464324817e-60*t*r:t*Math.pow(2,i-150)*(r+8388608)}function tM(t){return er(t)}function yr(t,e){if(t.g=e,e>t.l)throw Error()}function fm(t,e){if(e<0)throw Error();const n=t.g;if((e=n+e)>t.l)throw Error();return t.g=e,n}function dm(t,e){if(e==0)return Ar();var n=fm(t,e);return t.Y&&t.j?n=t.h.subarray(n,n+e):(t=t.h,n=n===(e=n+e)?new Uint8Array(0):F3?t.slice(n,e):new Uint8Array(t.subarray(n,e))),n.length==0?Ar():new ci(n,ls)}var id=[];function pm(t,e,n,i){if(So.length){const r=So.pop();return r.o(i),r.g.init(t,e,n,i),r}return new nM(t,e,n,i)}function mm(t){t.g.clear(),t.l=-1,t.h=-1,So.length<100&&So.push(t)}function gm(t){var e=t.g;if(e.g==e.l)return!1;t.m=t.g.g;var n=fi(t.g);if(e=n>>>3,!((n&=7)>=0&&n<=5)||e<1)throw Error();return t.l=e,t.h=n,!0}function co(t){switch(t.h){case 0:t.h!=0?co(t):Qu(t.g);break;case 1:yr(t=t.g,t.g+8);break;case 2:if(t.h!=2)co(t);else{var e=fi(t.g);yr(t=t.g,t.g+e)}break;case 5:yr(t=t.g,t.g+4);break;case 3:for(e=t.l;;){if(!gm(t))throw Error();if(t.h==4){if(t.l!=e)throw Error();break}co(t)}break;default:throw Error()}}function Ma(t,e,n){const i=t.g.l;var r=fi(t.g);let s=(r=t.g.g+r)-i;if(s<=0&&(t.g.l=r,n(e,t,void 0,void 0,void 0),s=r-t.g.g),s)throw Error();return t.g.g=r,t.g.l=i,e}function eh(t){var e=fi(t.g),n=fm(t=t.g,e);if(t=t.h,m3){var i,r=t;(i=Gc)||(i=Gc=new TextDecoder("utf-8",{fatal:!0})),e=n+e,r=n===0&&e===r.length?r:r.subarray(n,e);try{var s=i.decode(r)}catch(o){if($a===void 0){try{i.decode(new Uint8Array([128]))}catch{}try{i.decode(new Uint8Array([97])),$a=!0}catch{$a=!1}}throw!$a&&(Gc=void 0),o}}else{e=(s=n)+e,n=[];let o,c=null;for(;s<e;){var a=t[s++];a<128?n.push(a):a<224?s>=e?hr():(o=t[s++],a<194||(192&o)!=128?(s--,hr()):n.push((31&a)<<6|63&o)):a<240?s>=e-1?hr():(o=t[s++],(192&o)!=128||a===224&&o<160||a===237&&o>=160||(192&(i=t[s++]))!=128?(s--,hr()):n.push((15&a)<<12|(63&o)<<6|63&i)):a<=244?s>=e-2?hr():(o=t[s++],(192&o)!=128||o-144+(a<<28)>>30||(192&(i=t[s++]))!=128||(192&(r=t[s++]))!=128?(s--,hr()):(a=(7&a)<<18|(63&o)<<12|(63&i)<<6|63&r,a-=65536,n.push(55296+(a>>10&1023),56320+(1023&a)))):hr(),n.length>=8192&&(c=zf(c,n),n.length=0)}s=zf(c,n)}return s}function _m(t){const e=fi(t.g);return dm(t.g,e)}function Ho(t,e,n){var i=fi(t.g);for(i=t.g.g+i;t.g.g<i;)n.push(e(t.g))}var nM=class{constructor(t,e,n,i){if(id.length){const r=id.pop();r.init(t,e,n,i),t=r}else t=new class{constructor(r,s,a,o){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.init(r,s,a,o)}init(r,s,a,{Y:o=!1,ea:c=!1}={}){this.Y=o,this.ea=c,r&&(r=Zu(r,this.ea),this.h=r.buffer,this.j=r.g,this.m=s||0,this.l=a!==void 0?this.m+a:this.h.length,this.g=this.m)}clear(){this.h=null,this.j=!1,this.g=this.l=this.m=0,this.Y=!1}}(t,e,n,i);this.g=t,this.m=this.g.g,this.h=this.l=-1,this.o(i)}o({ha:t=!1}={}){this.ha=t}},So=[];function rd(t){return t?/^\d+$/.test(t)?(Bo(t),new nu(vt,It)):null:iM||(iM=new nu(0,0))}var nu=class{constructor(t,e){this.h=t>>>0,this.g=e>>>0}};let iM;function sd(t){return t?/^-?\d+$/.test(t)?(Bo(t),new iu(vt,It)):null:rM||(rM=new iu(0,0))}var iu=class{constructor(t,e){this.h=t>>>0,this.g=e>>>0}};let rM;function es(t,e,n){for(;n>0||e>127;)t.g.push(127&e|128),e=(e>>>7|n<<25)>>>0,n>>>=7;t.g.push(e)}function Is(t,e){for(;e>127;)t.g.push(127&e|128),e>>>=7;t.g.push(e)}function Wo(t,e){if(e>=0)Is(t,e);else{for(let n=0;n<9;n++)t.g.push(127&e|128),e>>=7;t.g.push(1)}}function th(t){var e=vt;t.g.push(e>>>0&255),t.g.push(e>>>8&255),t.g.push(e>>>16&255),t.g.push(e>>>24&255)}function ms(t,e){e.length!==0&&(t.l.push(e),t.h+=e.length)}function kn(t,e,n){Is(t.g,8*e+n)}function nh(t,e){return kn(t,e,2),e=t.g.end(),ms(t,e),e.push(t.h),e}function ih(t,e){var n=e.pop();for(n=t.h+t.g.length()-n;n>127;)e.push(127&n|128),n>>>=7,t.h++;e.push(n),t.h++}function Xo(t,e,n){kn(t,e,2),Is(t.g,n.length),ms(t,t.g.end()),ms(t,n)}function Eo(t,e,n,i){n!=null&&(e=nh(t,e),i(n,t),ih(t,e))}function pi(){const t=class{constructor(){throw Error()}};return Object.setPrototypeOf(t,t.prototype),t}var rh=pi(),vm=pi(),sh=pi(),ah=pi(),oh=pi(),xm=pi(),sM=pi(),qo=pi(),Mm=pi(),Sm=pi();function mi(t,e,n){var i=t.v;bn&&bn in i&&(i=i[bn])&&delete i[e.g],e.h?e.j(t,e.h,e.g,n,e.l):e.j(t,e.g,n,e.l)}var Te=class{constructor(t,e){this.v=im(t,e,void 0,2048)}toJSON(){return nm(this)}j(){var r;var t=zM,e=this.v,n=t.g,i=bn;if(bs&&i&&((r=e[i])==null?void 0:r[n])!=null&&us(A3,3),e=t.g,qf&&bn&&qf===void 0&&(i=(n=this.v)[bn])&&(i=i.da))try{i(n,e,K3)}catch(s){Fp(s)}return t.h?t.m(this,t.h,t.g,t.l):t.m(this,t.g,t.defaultValue,t.l)}clone(){const t=this.v,e=0|t[ye];return Wu(this,t,e)?Gu(this,t,!0):new this.constructor(Rs(t,e,!1))}};Te.prototype[hs]=fs,Te.prototype.toString=function(){return this.v.toString()};var Ds=class{constructor(t,e,n){this.g=t,this.h=e,t=rh,this.l=!!t&&n===t||!1}};function Yo(t,e){return new Ds(t,e,rh)}function Em(t,e,n,i,r){Eo(t,n,Am(e,i),r)}const aM=Yo(function(t,e,n,i,r){return t.h===2&&(Ma(t,Ku(e,i,n),r),!0)},Em),oM=Yo(function(t,e,n,i,r){return t.h===2&&(Ma(t,Ku(e,i,n),r),!0)},Em);var jo=Symbol(),Ko=Symbol(),ru=Symbol(),ad=Symbol(),od=Symbol();let ym,Tm;function Lr(t,e,n,i){var r=i[t];if(r)return r;(r={}).qa=i,r.T=function(f){switch(typeof f){case"boolean":return J3||(J3=[0,void 0,!0]);case"number":return f>0?void 0:f===0?Q3||(Q3=[0,void 0]):[-f,void 0];case"string":return[0,f];case"object":return f}}(i[0]);var s=i[1];let a=1;s&&s.constructor===Object&&(r.ba=s,typeof(s=i[++a])=="function"&&(r.ma=!0,ym??(ym=s),Tm??(Tm=i[a+1]),s=i[a+=2]));const o={};for(;s&&Array.isArray(s)&&s.length&&typeof s[0]=="number"&&s[0]>0;){for(var c=0;c<s.length;c++)o[s[c]]=s;s=i[++a]}for(c=1;s!==void 0;){let f;typeof s=="number"&&(c+=s,s=i[++a]);var l=void 0;if(s instanceof Ds?f=s:(f=aM,a--),f==null?void 0:f.l){s=i[++a],l=i;var h=a;typeof s=="function"&&(s=s(),l[h]=s),l=s}for(h=c+1,typeof(s=i[++a])=="number"&&s<0&&(h-=s,s=i[++a]);c<h;c++){const u=o[c];l?n(r,c,f,l,u):e(r,c,f,u)}}return i[t]=r}function bm(t){return Array.isArray(t)?t[0]instanceof Ds?t:[oM,t]:[t,void 0]}function Am(t,e){return t instanceof Te?t.v:Array.isArray(t)?Mr(t,e):void 0}function ch(t,e,n,i){const r=n.g;t[e]=i?(s,a,o)=>r(s,a,o,i):r}function lh(t,e,n,i,r){const s=n.g;let a,o;t[e]=(c,l,h)=>s(c,l,h,o||(o=Lr(Ko,ch,lh,i).T),a||(a=uh(i)),r)}function uh(t){let e=t[ru];if(e!=null)return e;const n=Lr(Ko,ch,lh,t);return e=n.ma?(i,r)=>ym(i,r,n):(i,r)=>{for(;gm(r)&&r.h!=4;){var s=r.l,a=n[s];if(a==null){var o=n.ba;o&&(o=o[s])&&(o=lM(o))!=null&&(a=n[s]=o)}if(a==null||!a(r,i,s)){if(a=(o=r).m,co(o),o.ha)var c=void 0;else c=o.g.g-a,o.g.g=a,c=dm(o.g,c);a=void 0,o=i,c&&((a=o[bn]??(o[bn]=new tu))[s]??(a[s]=[])).push(c)}}return(i=zo(i))&&(i.da=n.qa[od]),!0},t[ru]=e,t[od]=cM.bind(t),e}function cM(t,e,n,i){var r=this[Ko];const s=this[ru],a=Mr(void 0,r.T),o=zo(t);if(o){var c=!1,l=r.ba;if(l){if(r=(h,f,u)=>{if(u.length!==0)if(l[f])for(const m of u){h=pm(m);try{c=!0,s(a,h)}finally{mm(h)}}else i==null||i(t,f,u)},e==null)vo(o,r);else if(o!=null){const h=o[e];h&&r(o,e,h)}if(c){let h=0|t[ye];if(2&h&&2048&h&&!(n!=null&&n.Ka))throw Error();const f=As(h),u=(m,_)=>{if(Ui(t,m,f)!=null){if((n==null?void 0:n.Qa)===1)return;throw Error()}_!=null&&(h=Ft(t,h,m,_,f)),delete o[m]};e==null?Xp(a,0|a[ye],(m,_)=>{u(m,_)}):u(e,Ui(a,e,f))}}}}function lM(t){const e=(t=bm(t))[0].g;if(t=t[1]){const n=uh(t),i=Lr(Ko,ch,lh,t).T;return(r,s,a)=>e(r,s,a,i,n)}return e}function $o(t,e,n){t[e]=n.h}function Zo(t,e,n,i){let r,s;const a=n.h;t[e]=(o,c,l)=>a(o,c,l,s||(s=Lr(jo,$o,Zo,i).T),r||(r=wm(i)))}function wm(t){let e=t[ad];if(!e){const n=Lr(jo,$o,Zo,t);e=(i,r)=>Rm(i,r,n),t[ad]=e}return e}function Rm(t,e,n){Xp(t,0|t[ye],(i,r)=>{if(r!=null){var s=function(a,o){var c=a[o];if(c)return c;if((c=a.ba)&&(c=c[o])){var l=(c=bm(c))[0].h;if(c=c[1]){const h=wm(c),f=Lr(jo,$o,Zo,c).T;c=a.ma?Tm(f,h):(u,m,_)=>l(u,m,_,f,h)}else c=l;return a[o]=c}}(n,i);s?s(e,r,i):i<500||us(Ql,3)}}),(t=zo(t))&&vo(t,(i,r,s)=>{for(ms(e,e.g.end()),i=0;i<s.length;i++)ms(e,Nu(s[i])||new Uint8Array(0))})}const uM=An(0);function Us(t,e){if(Array.isArray(e)){var n=0|e[ye];if(4&n)return e;for(var i=0,r=0;i<e.length;i++){const s=t(e[i]);s!=null&&(e[r++]=s)}return r<i&&(e.length=r),(t=-1537&(5|n))!==n&&zt(e,t),2&t&&Object.freeze(e),e}}function nn(t,e,n){return new Ds(t,e,n)}function Ns(t,e,n){return new Ds(t,e,n)}function rn(t,e,n){Ft(t,0|t[ye],e,n,As(0|t[ye]))}var hM=Yo(function(t,e,n,i,r){if(t.h!==2)return!1;if(t=Yn(t=Ma(t,Mr([void 0,void 0],i),r)),r=As(i=0|e[ye]),2&i)throw Error();let s=Ui(e,n,r);if(s instanceof Di)2&s.J?(s=s.V(),s.push(t),Ft(e,i,n,s,r)):s.Ma(t);else if(Array.isArray(s)){var a=0|s[ye];8192&a||zt(s,a|=8192),2&a&&(s=om(s),Ft(e,i,n,s,r)),s.push(t)}else Ft(e,i,n,oa([t]),r);return!0},function(t,e,n,i,r){if(e instanceof Di)e.forEach((s,a)=>{Eo(t,n,Mr([a,s],i),r)});else if(Array.isArray(e)){for(let s=0;s<e.length;s++){const a=e[s];Array.isArray(a)&&Eo(t,n,Mr(a,i),r)}oa(e)}});function Cm(t,e,n){(e=si(e))!=null&&(kn(t,n,5),t=t.g,Ou(e),th(t))}function Pm(t,e,n){if(e=function(i){if(i==null)return i;const r=typeof i;if(r==="bigint")return String(_a(64,i));if(va(i)){if(r==="string")return Jp(i);if(r==="number")return zu(i)}}(e),e!=null&&(typeof e=="string"&&sd(e),e!=null))switch(kn(t,n,0),typeof e){case"number":t=t.g,ds(e),es(t,vt,It);break;case"bigint":n=BigInt.asUintN(64,e),n=new iu(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),es(t.g,n.h,n.g);break;default:n=sd(e),es(t.g,n.h,n.g)}}function Lm(t,e,n){(e=ws(e))!=null&&e!=null&&(kn(t,n,0),Wo(t.g,e))}function Im(t,e,n){(e=Kp(e))!=null&&(kn(t,n,0),t.g.g.push(e?1:0))}function Dm(t,e,n){(e=Kt(e))!=null&&Xo(t,n,Np(e))}function Um(t,e,n,i,r){Eo(t,n,Am(e,i),r)}function Nm(t,e,n){(e=e==null||typeof e=="string"||e instanceof ci?e:void 0)!=null&&Xo(t,n,Zu(e,!0).buffer)}function Fm(t,e,n){(e=$p(e))!=null&&e!=null&&(kn(t,n,0),Is(t.g,e))}function Om(t,e,n){return(t.h===5||t.h===2)&&(e=Ls(e,0|e[ye],n),t.h==2?Ho(t,Mo,e):e.push(Mo(t.g)),!0)}var Dt=nn(function(t,e,n){return t.h===5&&(rn(e,n,Mo(t.g)),!0)},Cm,qo),fM=Ns(Om,function(t,e,n){if((e=Us(si,e))!=null)for(let a=0;a<e.length;a++){var i=t,r=n,s=e[a];s!=null&&(kn(i,r,5),i=i.g,Ou(s),th(i))}},qo),hh=Ns(Om,function(t,e,n){if((e=Us(si,e))!=null&&e.length){kn(t,n,2),Is(t.g,4*e.length);for(let i=0;i<e.length;i++)n=t.g,Ou(e[i]),th(n)}},qo),dM=nn(function(t,e,n){return t.h===5&&(rn(e,n,(t=Mo(t.g))===0?void 0:t),!0)},Cm,qo),tr=nn(function(t,e,n){return t.h!==0?t=!1:(rn(e,n,Ju(t.g,jp)),t=!0),t},Pm,xm),qc=nn(function(t,e,n){return t.h!==0?e=!1:(rn(e,n,(t=Ju(t.g,jp))===uM?void 0:t),e=!0),e},Pm,xm),pM=nn(function(t,e,n){return t.h!==0?t=!1:(rn(e,n,Ju(t.g,B3)),t=!0),t},function(t,e,n){if(e=function(i){if(i==null)return i;var r=typeof i;if(r==="bigint")return String(k3(64,i));if(va(i)){if(r==="string")return r=ps(Number(i)),Rr(r)&&r>=0?i=String(r):((r=i.indexOf("."))!==-1&&(i=i.substring(0,r)),(r=i[0]!=="-"&&((r=i.length)<20||r===20&&i<="18446744073709551615"))||(Bo(i),i=ca(vt,It))),i;if(r==="number")return(i=ps(i))>=0&&Rr(i)||(ds(i),i=Yp(vt,It)),i}}(e),e!=null&&(typeof e=="string"&&rd(e),e!=null))switch(kn(t,n,0),typeof e){case"number":t=t.g,ds(e),es(t,vt,It);break;case"bigint":n=BigInt.asUintN(64,e),n=new nu(Number(n&BigInt(4294967295)),Number(n>>BigInt(32))),es(t.g,n.h,n.g);break;default:n=rd(e),es(t.g,n.h,n.g)}},sM),Nt=nn(function(t,e,n){return t.h===0&&(rn(e,n,er(t.g)),!0)},Lm,ah),Sa=Ns(function(t,e,n){return(t.h===0||t.h===2)&&(e=Ls(e,0|e[ye],n),t.h==2?Ho(t,er,e):e.push(er(t.g)),!0)},function(t,e,n){if((e=Us(ws,e))!=null&&e.length){n=nh(t,n);for(let i=0;i<e.length;i++)Wo(t.g,e[i]);ih(t,n)}},ah),Zr=nn(function(t,e,n){return t.h===0&&(rn(e,n,(t=er(t.g))===0?void 0:t),!0)},Lm,ah),Mt=nn(function(t,e,n){return t.h===0&&(rn(e,n,Qu(t.g)),!0)},Im,vm),Tr=nn(function(t,e,n){return t.h===0&&(rn(e,n,(t=Qu(t.g))===!1?void 0:t),!0)},Im,vm),Qt=Ns(function(t,e,n){return t.h===2&&(t=eh(t),Ls(e,0|e[ye],n).push(t),!0)},function(t,e,n){if((e=Us(Kt,e))!=null)for(let a=0;a<e.length;a++){var i=t,r=n,s=e[a];s!=null&&Xo(i,r,Np(s))}},sh),$i=nn(function(t,e,n){return t.h===2&&(rn(e,n,(t=eh(t))===""?void 0:t),!0)},Dm,sh),ut=nn(function(t,e,n){return t.h===2&&(rn(e,n,eh(t)),!0)},Dm,sh),Xt=function(t,e,n=rh){return new Ds(t,e,n)}(function(t,e,n,i,r){return t.h===2&&(i=Mr(void 0,i),Ls(e,0|e[ye],n).push(i),Ma(t,i,r),!0)},function(t,e,n,i,r){if(Array.isArray(e)){for(let s=0;s<e.length;s++)Um(t,e[s],n,i,r);1&(t=0|e[ye])||zt(e,1|t)}}),gt=Yo(function(t,e,n,i,r,s){if(t.h!==2)return!1;let a=0|e[ye];return cm(e,a,s,n,As(a)),Ma(t,e=Ku(e,i,n),r),!0},Um),Bm=nn(function(t,e,n){return t.h===2&&(rn(e,n,_m(t)),!0)},Nm,Mm),mM=Ns(function(t,e,n){return(t.h===0||t.h===2)&&(e=Ls(e,0|e[ye],n),t.h==2?Ho(t,fi,e):e.push(fi(t.g)),!0)},function(t,e,n){if((e=Us($p,e))!=null)for(let a=0;a<e.length;a++){var i=t,r=n,s=e[a];s!=null&&(kn(i,r,0),Is(i.g,s))}},oh),gM=nn(function(t,e,n){return t.h===0&&(rn(e,n,(t=fi(t.g))===0?void 0:t),!0)},Fm,oh),tn=nn(function(t,e,n){return t.h===0&&(rn(e,n,er(t.g)),!0)},function(t,e,n){(e=ws(e))!=null&&(e=parseInt(e,10),kn(t,n,0),Wo(t.g,e))},Sm);class _M{constructor(e,n){var i=Pn;this.g=e,this.h=n,this.m=Qe,this.j=Pe,this.defaultValue=void 0,this.l=i.Oa!=null?qp:void 0}register(){No(this)}}function gi(t,e){return new _M(t,e)}function nr(t,e){return(n,i)=>{{const s={ea:!0};i&&Object.assign(s,i),n=pm(n,void 0,void 0,s);try{const a=new t,o=a.v;uh(e)(o,n);var r=a}finally{mm(n)}}return r}}function Jo(t){return function(){const e=new class{constructor(){this.l=[],this.h=0,this.g=new class{constructor(){this.g=[]}length(){return this.g.length}end(){const a=this.g;return this.g=[],a}}}};Rm(this.v,e,Lr(jo,$o,Zo,t)),ms(e,e.g.end());const n=new Uint8Array(e.h),i=e.l,r=i.length;let s=0;for(let a=0;a<r;a++){const o=i[a];n.set(o,s),s+=o.length}return e.l=[n],n}}var cd=class extends Te{constructor(t){super(t)}},ld=[0,$i,nn(function(t,e,n){return t.h===2&&(rn(e,n,(t=_m(t))===Ar()?void 0:t),!0)},function(t,e,n){if(e!=null){if(e instanceof Te){const i=e.Ra;return void(i?(e=i(e),e!=null&&Xo(t,n,Zu(e,!0).buffer)):us(Ql,3))}if(Array.isArray(e))return void us(Ql,3)}Nm(t,e,n)},Mm)];let Yc,ud=globalThis.trustedTypes;function hd(t){var e;return Yc===void 0&&(Yc=function(){let n=null;if(!ud)return n;try{const i=r=>r;n=ud.createPolicy("goog#html",{createHTML:i,createScript:i,createScriptURL:i})}catch{}return n}()),t=(e=Yc)?e.createScriptURL(t):t,new class{constructor(n){this.g=n}toString(){return this.g+""}}(t)}function Za(t,...e){if(e.length===0)return hd(t[0]);let n=t[0];for(let i=0;i<e.length;i++)n+=encodeURIComponent(e[i])+t[i+1];return hd(n)}var km=[0,Nt,tn,Mt,-1,Sa,tn,-1,Mt],vM=class extends Te{constructor(t){super(t)}},zm=[0,Mt,ut,Mt,tn,-1,Ns(function(t,e,n){return(t.h===0||t.h===2)&&(e=Ls(e,0|e[ye],n),t.h==2?Ho(t,tM,e):e.push(er(t.g)),!0)},function(t,e,n){if((e=Us(ws,e))!=null&&e.length){n=nh(t,n);for(let i=0;i<e.length;i++)Wo(t.g,e[i]);ih(t,n)}},Sm),ut,-1,[0,Mt,-1],tn,Mt,-1],Vm=[0,3,Mt,-1,2,[0,[2],Nt,gt,[0,nn(function(t,e,n){return t.h===0&&(rn(e,n,fi(t.g)),!0)},Fm,oh)]],[0,tn,Mt,tn,Mt,tn,Mt,ut,-1],[0,[3,4],ut,-1,gt,[0,Nt],gt,[0,tn]],[0]],Gm=[0,ut,-2],fd=class extends Te{constructor(t){super(t)}},Hm=[0],Wm=[0,Nt,Mt,1,Mt,-4],Pn=class extends Te{constructor(t){super(t,2)}},Ot={};Ot[336783863]=[0,ut,Mt,-1,Nt,[0,[1,2,3,4,5,6,7,8,9],gt,Hm,gt,zm,gt,Gm,gt,Wm,gt,km,gt,[0,ut,-2],gt,[0,ut,tn],gt,Vm,gt,[0,tn,-1,Mt]],[0,ut],Mt,[0,[1,3],[2,4],gt,[0,Sa],-1,gt,[0,Qt],-1,Xt,[0,ut,-1]],ut];var dd=[0,qc,-1,Tr,-3,qc,Sa,$i,Zr,qc,-1,Tr,Zr,Tr,-2,$i];function _t(t,e){Go(t,3,e)}function qe(t,e){Go(t,4,e)}var mn=class extends Te{constructor(t){super(t,500)}o(t){return Pe(this,0,7,t)}},Js=[-1,{}],pd=[0,ut,1,Js],md=[0,ut,Qt,Js];function zn(t,e){$u(t,1,mn,e)}function Et(t,e){Go(t,10,e)}function et(t,e){Go(t,15,e)}var Ln=class extends Te{constructor(t){super(t,500)}o(t){return Pe(this,0,1001,t)}},Xm=[-500,Xt,[-500,$i,-1,Qt,-3,[-2,Ot,Mt],Xt,ld,Zr,-1,pd,md,Xt,[0,$i,Tr],$i,dd,Zr,Qt,987,Qt],4,Xt,[-500,ut,-1,[-1,{}],998,ut],Xt,[-500,ut,Qt,-1,[-2,{},Mt],997,Qt,-1],Zr,Xt,[-500,ut,Qt,Js,998,Qt],Qt,Zr,pd,md,Xt,[0,$i,-1,Js],Qt,-2,dd,$i,-1,Tr,[0,Tr,gM],978,Js,Xt,ld];Ln.prototype.g=Jo(Xm);var xM=nr(Ln,Xm),MM=class extends Te{constructor(t){super(t)}},qm=class extends Te{constructor(t){super(t)}g(){return Ni(this,MM,1)}},Ym=[0,Xt,[0,Nt,Dt,ut,-1]],Qo=nr(qm,Ym),SM=class extends Te{constructor(t){super(t)}},EM=class extends Te{constructor(t){super(t)}},jc=class extends Te{constructor(t){super(t)}l(){return Qe(this,SM,2)}g(){return Ni(this,EM,5)}},jm=nr(class extends Te{constructor(t){super(t)}},[0,Qt,Sa,hh,[0,tn,[0,Nt,-3],[0,Dt,-3],[0,Nt,-1,[0,Xt,[0,Nt,-2]]],Xt,[0,Dt,-1,ut,Dt]],ut,-1,tr,Xt,[0,Nt,Dt],Qt,tr]),Km=class extends Te{constructor(t){super(t)}},ts=nr(class extends Te{constructor(t){super(t)}},[0,Xt,[0,Dt,-4]]),$m=class extends Te{constructor(t){super(t)}},Ea=nr(class extends Te{constructor(t){super(t)}},[0,Xt,[0,Dt,-4]]),yM=class extends Te{constructor(t){super(t)}},TM=[0,Nt,-1,hh,tn],Zm=class extends Te{constructor(t){super(t)}};Zm.prototype.g=Jo([0,Dt,-4,tr]);var bM=class extends Te{constructor(t){super(t)}},AM=nr(class extends Te{constructor(t){super(t)}},[0,Xt,[0,1,Nt,ut,Ym],tr]),gd=class extends Te{constructor(t){super(t)}},wM=class extends Te{constructor(t){super(t)}na(){const t=xt(this,1,void 0,void 0,am);return t??Ar()}},RM=class extends Te{constructor(t){super(t)}},Jm=[1,2],CM=nr(class extends Te{constructor(t){super(t)}},[0,Xt,[0,Jm,gt,[0,hh],gt,[0,Bm],Nt,ut],tr]),fh=class extends Te{constructor(t){super(t)}},Qm=[0,ut,Nt,Dt,Qt,-1],_d=class extends Te{constructor(t){super(t)}},PM=[0,Mt,-1],vd=class extends Te{constructor(t){super(t)}},lo=[1,2,3,4,5,6],yo=class extends Te{constructor(t){super(t)}g(){return xt(this,1,void 0,void 0,am)!=null}l(){return Kt(xt(this,2))!=null}},At=class extends Te{constructor(t){super(t)}g(){return Kp(xt(this,2))??!1}},e0=[0,Bm,ut,[0,Nt,tr,-1],[0,pM,tr]],Ut=[0,e0,Mt,[0,lo,gt,Wm,gt,zm,gt,km,gt,Hm,gt,Gm,gt,Vm],tn],ec=class extends Te{constructor(t){super(t)}},dh=[0,Ut,Dt,-1,Nt],LM=gi(502141897,ec);Ot[502141897]=dh;var IM=nr(class extends Te{constructor(t){super(t)}},[0,[0,tn,-1,fM,mM],TM]),t0=class extends Te{constructor(t){super(t)}},n0=class extends Te{constructor(t){super(t)}},su=[0,Ut,Dt,[0,Ut],Mt],DM=gi(508968150,n0);Ot[508968150]=[0,Ut,dh,su,Dt,[0,[0,e0]]],Ot[508968149]=su;var Kr=class extends Te{constructor(t){super(t)}l(){return Qe(this,fh,2)}g(){ot(this,2)}},i0=[0,Ut,Qm];Ot[478825465]=i0;var UM=class extends Te{constructor(t){super(t)}},r0=class extends Te{constructor(t){super(t)}},ph=class extends Te{constructor(t){super(t)}},mh=class extends Te{constructor(t){super(t)}},s0=class extends Te{constructor(t){super(t)}},xd=[0,Ut,[0,Ut],i0,-1],a0=[0,Ut,Dt,Nt],gh=[0,Ut,Dt],o0=[0,Ut,a0,gh,Dt],NM=gi(479097054,s0);Ot[479097054]=[0,Ut,o0,xd],Ot[463370452]=xd,Ot[464864288]=a0;var FM=gi(462713202,mh);Ot[462713202]=o0,Ot[474472470]=gh;var OM=class extends Te{constructor(t){super(t)}},c0=class extends Te{constructor(t){super(t)}},l0=class extends Te{constructor(t){super(t)}},u0=class extends Te{constructor(t){super(t)}},_h=[0,Ut,Dt,-1,Nt],au=[0,Ut,Dt,Mt];u0.prototype.g=Jo([0,Ut,gh,[0,Ut],dh,su,_h,au]);var h0=class extends Te{constructor(t){super(t)}},BM=gi(456383383,h0);Ot[456383383]=[0,Ut,Qm];var f0=class extends Te{constructor(t){super(t)}},kM=gi(476348187,f0);Ot[476348187]=[0,Ut,PM];var d0=class extends Te{constructor(t){super(t)}},Md=class extends Te{constructor(t){super(t)}},p0=[0,tn,-1],zM=gi(458105876,class extends Te{constructor(t){super(t)}g(){let t;var e=this.v;const n=0|e[ye];return t=wn(this,n),e=function(i,r,s,a){var o=Md;!a&&Cs(i)&&(s=0|(r=i.v)[ye]);var c=Ui(r,2);if(i=!1,c==null){if(a)return ed();c=[]}else if(c.constructor===Di){if(!(2&c.J)||a)return c;c=c.V()}else Array.isArray(c)?i=!!(2&(0|c[ye])):c=[];if(a){if(!c.length)return ed();i||(i=!0,ga(c))}else i&&(i=!1,oa(c),c=om(c));return!i&&32&s&&ma(c,32),s=Ft(r,s,2,a=new Di(c,o,G3,void 0)),i||Pr(r,s),a}(this,e,n,t),!t&&Md&&(e.ra=!0),e}});Ot[458105876]=[0,p0,hM,[!0,tr,[0,ut,-1,Qt]],[0,Sa,Mt,tn]];var vh=class extends Te{constructor(t){super(t)}},m0=gi(458105758,vh);Ot[458105758]=[0,Ut,ut,p0];var Kc=class extends Te{constructor(t){super(t)}},Sd=[0,dM,-1,Tr],VM=class extends Te{constructor(t){super(t)}},g0=class extends Te{constructor(t){super(t)}},ou=[1,2];g0.prototype.g=Jo([0,ou,gt,Sd,gt,[0,Xt,Sd]]);var _0=class extends Te{constructor(t){super(t)}},GM=gi(443442058,_0);Ot[443442058]=[0,Ut,ut,Nt,Dt,Qt,-1,Mt,Dt],Ot[514774813]=_h;var v0=class extends Te{constructor(t){super(t)}},HM=gi(516587230,v0);function cu(t,e){return e=e?e.clone():new fh,t.displayNamesLocale!==void 0?ot(e,1,xa(t.displayNamesLocale)):t.displayNamesLocale===void 0&&ot(e,1),t.maxResults!==void 0?Fi(e,2,t.maxResults):"maxResults"in t&&ot(e,2),t.scoreThreshold!==void 0?Re(e,3,t.scoreThreshold):"scoreThreshold"in t&&ot(e,3),t.categoryAllowlist!==void 0?xo(e,4,t.categoryAllowlist):"categoryAllowlist"in t&&ot(e,4),t.categoryDenylist!==void 0?xo(e,5,t.categoryDenylist):"categoryDenylist"in t&&ot(e,5),e}function x0(t){const e=Number(t);return Number.isSafeInteger(e)?e:String(t)}function xh(t,e=-1,n=""){return{categories:t.map(i=>({index:On(i,1)??0??-1,score:Ct(i,2)??0,categoryName:Kt(xt(i,3))??""??"",displayName:Kt(xt(i,4))??""??""})),headIndex:e,headName:n}}function WM(t){const e={classifications:Ni(t,bM,1).map(n=>{var i;return xh(((i=Qe(n,qm,4))==null?void 0:i.g())??[],On(n,2)??0,Kt(xt(n,3))??"")})};return function(n){return n==null?n:typeof n=="bigint"?(eu(n)?n=Number(n):(n=_a(64,n),n=eu(n)?Number(n):String(n)),n):va(n)?typeof n=="number"?zu(n):Jp(n):void 0}(xt(t,2,void 0,void 0,_o))!=null&&(e.timestampMs=x0(xt(t,2,void 0,void 0,_o)??rm)),e}function M0(t){var a,o;var e=xr(t,3,si,vr()),n=xr(t,2,ws,vr()),i=xr(t,1,Kt,vr()),r=xr(t,9,Kt,vr());const s={categories:[],keypoints:[]};for(let c=0;c<e.length;c++)s.categories.push({score:e[c],index:n[c]??-1,categoryName:i[c]??"",displayName:r[c]??""});if((e=(a=Qe(t,jc,4))==null?void 0:a.l())&&(s.boundingBox={originX:On(e,1,qi)??0,originY:On(e,2,qi)??0,width:On(e,3,qi)??0,height:On(e,4,qi)??0,angle:0}),(o=Qe(t,jc,4))==null?void 0:o.g().length)for(const c of Qe(t,jc,4).g())s.keypoints.push({x:xt(c,1,void 0,qi,si)??0,y:xt(c,2,void 0,qi,si)??0,score:xt(c,4,void 0,qi,si)??0,label:Kt(xt(c,3,void 0,qi))??""});return s}function tc(t){const e=[];for(const n of Ni(t,$m,1))e.push({x:Ct(n,1)??0,y:Ct(n,2)??0,z:Ct(n,3)??0,visibility:Ct(n,4)??0});return e}function Qs(t){const e=[];for(const n of Ni(t,Km,1))e.push({x:Ct(n,1)??0,y:Ct(n,2)??0,z:Ct(n,3)??0,visibility:Ct(n,4)??0});return e}function Ed(t){return Array.from(t,e=>e>127?e-256:e)}function yd(t,e){if(t.length!==e.length)throw Error(`Cannot compute cosine similarity between embeddings of different sizes (${t.length} vs. ${e.length}).`);let n=0,i=0,r=0;for(let s=0;s<t.length;s++)n+=t[s]*e[s],i+=t[s]*t[s],r+=e[s]*e[s];if(i<=0||r<=0)throw Error("Cannot compute cosine similarity on embedding with 0 norm.");return n/Math.sqrt(i*r)}let Ja;Ot[516587230]=[0,Ut,_h,au,Dt],Ot[518928384]=au;const XM=new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,10,1,8,0,65,0,253,15,253,98,11]);async function S0(t){if(t)return!0;if(Ja===void 0)try{await WebAssembly.instantiate(XM),Ja=!0}catch{Ja=!1}return Ja}async function Qa(t,e,n){return{wasmLoaderPath:`${e}/${t}_${n=`wasm${n?"_module":""}${await S0(n)?"":"_nosimd"}_internal`}.js`,wasmBinaryPath:`${e}/${t}_${n}.wasm`}}var $r=class{};function E0(){var t=navigator;return typeof OffscreenCanvas<"u"&&(!function(e=navigator){return(e=e.userAgent).includes("Safari")&&!e.includes("Chrome")}(t)||!!((t=t.userAgent.match(/Version\/([\d]+).*Safari/))&&t.length>=1&&Number(t[1])>=17))}async function Td(t){if(typeof importScripts!="function"){const e=document.createElement("script");return e.src=t.toString(),e.crossOrigin="anonymous",new Promise((n,i)=>{e.addEventListener("load",()=>{n()},!1),e.addEventListener("error",r=>{i(r)},!1),document.body.appendChild(e)})}try{importScripts(t.toString())}catch(e){if(!(e instanceof TypeError))throw e;await self.import(t.toString())}}function y0(t){return t.videoWidth!==void 0?[t.videoWidth,t.videoHeight]:t.naturalWidth!==void 0?[t.naturalWidth,t.naturalHeight]:t.displayWidth!==void 0?[t.displayWidth,t.displayHeight]:[t.width,t.height]}function Ae(t,e,n){t.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target"),n(e=t.i.stringToNewUTF8(e)),t.i._free(e)}function bd(t,e,n){if(!t.i.canvas)throw Error("No OpenGL canvas configured.");if(n?t.i._bindTextureToStream(n):t.i._bindTextureToCanvas(),!(n=t.i.canvas.getContext("webgl2")||t.i.canvas.getContext("webgl")))throw Error("Failed to obtain WebGL context from the provided canvas. `getContext()` should only be invoked with `webgl` or `webgl2`.");t.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!0),n.texImage2D(n.TEXTURE_2D,0,n.RGBA,n.RGBA,n.UNSIGNED_BYTE,e),t.i.gpuOriginForWebTexturesIsBottomLeft&&n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1);const[i,r]=y0(e);return!t.l||i===t.i.canvas.width&&r===t.i.canvas.height||(t.i.canvas.width=i,t.i.canvas.height=r),[i,r]}function Ad(t,e,n){t.m||console.error("No wasm multistream support detected: ensure dependency inclusion of :gl_graph_runner_internal_multi_input target");const i=new Uint32Array(e.length);for(let r=0;r<e.length;r++)i[r]=t.i.stringToNewUTF8(e[r]);e=t.i._malloc(4*i.length),t.i.HEAPU32.set(i,e>>2),n(e);for(const r of i)t.i._free(r);t.i._free(e)}function ei(t,e,n){t.i.simpleListeners=t.i.simpleListeners||{},t.i.simpleListeners[e]=n}function Yi(t,e,n){let i=[];t.i.simpleListeners=t.i.simpleListeners||{},t.i.simpleListeners[e]=(r,s,a)=>{s?(n(i,a),i=[]):i.push(r)}}$r.forVisionTasks=function(t,e=!1){return Qa("vision",t??Za``,e)},$r.forTextTasks=function(t,e=!1){return Qa("text",t??Za``,e)},$r.forGenAiTasks=function(t,e=!1){return Qa("genai",t??Za``,e)},$r.forAudioTasks=function(t,e=!1){return Qa("audio",t??Za``,e)},$r.isSimdSupported=function(t=!1){return S0(t)};async function qM(t,e,n,i){return t=await(async(r,s,a,o,c)=>{if(s&&await Td(s),!self.ModuleFactory||a&&(await Td(a),!self.ModuleFactory))throw Error("ModuleFactory not set.");return self.Module&&c&&((s=self.Module).locateFile=c.locateFile,c.mainScriptUrlOrBlob&&(s.mainScriptUrlOrBlob=c.mainScriptUrlOrBlob)),c=await self.ModuleFactory(self.Module||c),self.ModuleFactory=self.Module=void 0,new r(c,o)})(t,n.wasmLoaderPath,n.assetLoaderPath,e,{locateFile:r=>r.endsWith(".wasm")?n.wasmBinaryPath.toString():n.assetBinaryPath&&r.endsWith(".data")?n.assetBinaryPath.toString():r}),await t.o(i),t}function $c(t,e){const n=Qe(t.baseOptions,yo,1)||new yo;typeof e=="string"?(ot(n,2,xa(e)),ot(n,1)):e instanceof Uint8Array&&(ot(n,1,Fu(e,!1)),ot(n,2)),Pe(t.baseOptions,0,1,n)}function wd(t){try{const e=t.H.length;if(e===1)throw Error(t.H[0].message);if(e>1)throw Error("Encountered multiple errors: "+t.H.map(n=>n.message).join(", "))}finally{t.H=[]}}function pe(t,e){t.C=Math.max(t.C,e)}function nc(t,e){t.B=new mn,Rn(t.B,2,"PassThroughCalculator"),_t(t.B,"free_memory"),qe(t.B,"free_memory_unused_out"),Et(e,"free_memory"),zn(e,t.B)}function gs(t,e){_t(t.B,e),qe(t.B,e+"_unused_out")}function ic(t){t.g.addBoolToStream(!0,"free_memory",t.C)}var lu=class{constructor(t){this.g=t,this.H=[],this.C=0,this.g.setAutoRenderToScreen(!1)}l(t,e=!0){var n,i,r,s,a,o;if(e){const c=t.baseOptions||{};if((n=t.baseOptions)!=null&&n.modelAssetBuffer&&((i=t.baseOptions)!=null&&i.modelAssetPath))throw Error("Cannot set both baseOptions.modelAssetPath and baseOptions.modelAssetBuffer");if(!((r=Qe(this.baseOptions,yo,1))!=null&&r.g()||(s=Qe(this.baseOptions,yo,1))!=null&&s.l()||(a=t.baseOptions)!=null&&a.modelAssetBuffer||(o=t.baseOptions)!=null&&o.modelAssetPath))throw Error("Either baseOptions.modelAssetPath or baseOptions.modelAssetBuffer must be set");if(function(l,h){let f=Qe(l.baseOptions,vd,3);if(!f){var u=f=new vd,m=new fd;Zs(u,4,lo,m)}"delegate"in h&&(h.delegate==="GPU"?(h=f,u=new vM,Zs(h,2,lo,u)):(h=f,u=new fd,Zs(h,4,lo,u))),Pe(l.baseOptions,0,3,f)}(this,c),c.modelAssetPath)return fetch(c.modelAssetPath.toString()).then(l=>{if(l.ok)return l.arrayBuffer();throw Error(`Failed to fetch model: ${c.modelAssetPath} (${l.status})`)}).then(l=>{try{this.g.i.FS_unlink("/model.dat")}catch{}this.g.i.FS_createDataFile("/","model.dat",new Uint8Array(l),!0,!1,!1),$c(this,"/model.dat"),this.m(),this.L()});if(c.modelAssetBuffer instanceof Uint8Array)$c(this,c.modelAssetBuffer);else if(c.modelAssetBuffer)return async function(l){const h=[];for(var f=0;;){const{done:u,value:m}=await l.read();if(u)break;h.push(m),f+=m.length}if(h.length===0)return new Uint8Array(0);if(h.length===1)return h[0];l=new Uint8Array(f),f=0;for(const u of h)l.set(u,f),f+=u.length;return l}(c.modelAssetBuffer).then(l=>{$c(this,l),this.m(),this.L()})}return this.m(),this.L(),Promise.resolve()}L(){}ca(){let t;if(this.g.ca(e=>{t=xM(e)}),!t)throw Error("Failed to retrieve CalculatorGraphConfig");return t}setGraph(t,e){this.g.attachErrorListener((n,i)=>{this.H.push(Error(i))}),this.g.Ja(),this.g.setGraph(t,e),this.B=void 0,wd(this)}finishProcessing(){this.g.finishProcessing(),wd(this)}close(){this.B=void 0,this.g.closeGraph()}};function Ji(t,e){if(!t)throw Error(`Unable to obtain required WebGL resource: ${e}`);return t}lu.prototype.close=lu.prototype.close;class YM{constructor(e,n,i,r){this.g=e,this.h=n,this.m=i,this.l=r}bind(){this.g.bindVertexArray(this.h)}close(){this.g.deleteVertexArray(this.h),this.g.deleteBuffer(this.m),this.g.deleteBuffer(this.l)}}function Rd(t,e,n){const i=t.g;if(n=Ji(i.createShader(n),"Failed to create WebGL shader"),i.shaderSource(n,e),i.compileShader(n),!i.getShaderParameter(n,i.COMPILE_STATUS))throw Error(`Could not compile WebGL shader: ${i.getShaderInfoLog(n)}`);return i.attachShader(t.h,n),n}function Cd(t,e){const n=t.g,i=Ji(n.createVertexArray(),"Failed to create vertex array");n.bindVertexArray(i);const r=Ji(n.createBuffer(),"Failed to create buffer");n.bindBuffer(n.ARRAY_BUFFER,r),n.enableVertexAttribArray(t.O),n.vertexAttribPointer(t.O,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array([-1,-1,-1,1,1,1,1,-1]),n.STATIC_DRAW);const s=Ji(n.createBuffer(),"Failed to create buffer");return n.bindBuffer(n.ARRAY_BUFFER,s),n.enableVertexAttribArray(t.L),n.vertexAttribPointer(t.L,2,n.FLOAT,!1,0,0),n.bufferData(n.ARRAY_BUFFER,new Float32Array(e?[0,1,0,0,1,0,1,1]:[0,0,0,1,1,1,1,0]),n.STATIC_DRAW),n.bindBuffer(n.ARRAY_BUFFER,null),n.bindVertexArray(null),new YM(n,i,r,s)}function Mh(t,e){if(t.g){if(e!==t.g)throw Error("Cannot change GL context once initialized")}else t.g=e}function jM(t,e,n,i){return Mh(t,e),t.h||(t.m(),t.D()),n?(t.u||(t.u=Cd(t,!0)),n=t.u):(t.A||(t.A=Cd(t,!1)),n=t.A),e.useProgram(t.h),n.bind(),t.l(),t=i(),n.g.bindVertexArray(null),t}function T0(t,e,n){return Mh(t,e),t=Ji(e.createTexture(),"Failed to create texture"),e.bindTexture(e.TEXTURE_2D,t),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,n??e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,n??e.LINEAR),e.bindTexture(e.TEXTURE_2D,null),t}function b0(t,e,n){Mh(t,e),t.B||(t.B=Ji(e.createFramebuffer(),"Failed to create framebuffe.")),e.bindFramebuffer(e.FRAMEBUFFER,t.B),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,n,0)}function KM(t){var e;(e=t.g)==null||e.bindFramebuffer(t.g.FRAMEBUFFER,null)}var A0=class{H(){return`
  precision mediump float;
  varying vec2 vTex;
  uniform sampler2D inputTexture;
  void main() {
    gl_FragColor = texture2D(inputTexture, vTex);
  }
 `}m(){const t=this.g;if(this.h=Ji(t.createProgram(),"Failed to create WebGL program"),this.X=Rd(this,`
  attribute vec2 aVertex;
  attribute vec2 aTex;
  varying vec2 vTex;
  void main(void) {
    gl_Position = vec4(aVertex, 0.0, 1.0);
    vTex = aTex;
  }`,t.VERTEX_SHADER),this.W=Rd(this,this.H(),t.FRAGMENT_SHADER),t.linkProgram(this.h),!t.getProgramParameter(this.h,t.LINK_STATUS))throw Error(`Error during program linking: ${t.getProgramInfoLog(this.h)}`);this.O=t.getAttribLocation(this.h,"aVertex"),this.L=t.getAttribLocation(this.h,"aTex")}D(){}l(){}close(){if(this.h){const t=this.g;t.deleteProgram(this.h),t.deleteShader(this.X),t.deleteShader(this.W)}this.B&&this.g.deleteFramebuffer(this.B),this.A&&this.A.close(),this.u&&this.u.close()}};function wi(t,e){switch(e){case 0:return t.g.find(n=>n instanceof Uint8Array);case 1:return t.g.find(n=>n instanceof Float32Array);case 2:return t.g.find(n=>typeof WebGLTexture<"u"&&n instanceof WebGLTexture);default:throw Error(`Type is not supported: ${e}`)}}function uu(t){var e=wi(t,1);if(!e){if(e=wi(t,0))e=new Float32Array(e).map(i=>i/255);else{e=new Float32Array(t.width*t.height);const i=_s(t);var n=Sh(t);if(b0(n,i,w0(t)),"iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";").includes(navigator.platform)||navigator.userAgent.includes("Mac")&&"document"in self&&"ontouchend"in self.document){n=new Float32Array(t.width*t.height*4),i.readPixels(0,0,t.width,t.height,i.RGBA,i.FLOAT,n);for(let r=0,s=0;r<e.length;++r,s+=4)e[r]=n[s]}else i.readPixels(0,0,t.width,t.height,i.RED,i.FLOAT,e)}t.g.push(e)}return e}function w0(t){let e=wi(t,2);if(!e){const n=_s(t);e=C0(t);const i=uu(t),r=R0(t);n.texImage2D(n.TEXTURE_2D,0,r,t.width,t.height,0,n.RED,n.FLOAT,i),hu(t)}return e}function _s(t){if(!t.canvas)throw Error("Conversion to different image formats require that a canvas is passed when initializing the image.");return t.h||(t.h=Ji(t.canvas.getContext("webgl2"),"You cannot use a canvas that is already bound to a different type of rendering context.")),t.h}function R0(t){if(t=_s(t),!eo)if(t.getExtension("EXT_color_buffer_float")&&t.getExtension("OES_texture_float_linear")&&t.getExtension("EXT_float_blend"))eo=t.R32F;else{if(!t.getExtension("EXT_color_buffer_half_float"))throw Error("GPU does not fully support 4-channel float32 or float16 formats");eo=t.R16F}return eo}function Sh(t){return t.l||(t.l=new A0),t.l}function C0(t){const e=_s(t);e.viewport(0,0,t.width,t.height),e.activeTexture(e.TEXTURE0);let n=wi(t,2);return n||(n=T0(Sh(t),e,t.m?e.LINEAR:e.NEAREST),t.g.push(n),t.j=!0),e.bindTexture(e.TEXTURE_2D,n),n}function hu(t){t.h.bindTexture(t.h.TEXTURE_2D,null)}var eo,Wt=class{constructor(t,e,n,i,r,s,a){this.g=t,this.m=e,this.j=n,this.canvas=i,this.l=r,this.width=s,this.height=a,this.j&&--Pd===0&&console.error("You seem to be creating MPMask instances without invoking .close(). This leaks resources.")}Fa(){return!!wi(this,0)}ka(){return!!wi(this,1)}R(){return!!wi(this,2)}ja(){return(e=wi(t=this,0))||(e=uu(t),e=new Uint8Array(e.map(n=>Math.round(255*n))),t.g.push(e)),e;var t,e}ia(){return uu(this)}N(){return w0(this)}clone(){const t=[];for(const e of this.g){let n;if(e instanceof Uint8Array)n=new Uint8Array(e);else if(e instanceof Float32Array)n=new Float32Array(e);else{if(!(e instanceof WebGLTexture))throw Error(`Type is not supported: ${e}`);{const i=_s(this),r=Sh(this);i.activeTexture(i.TEXTURE1),n=T0(r,i,this.m?i.LINEAR:i.NEAREST),i.bindTexture(i.TEXTURE_2D,n);const s=R0(this);i.texImage2D(i.TEXTURE_2D,0,s,this.width,this.height,0,i.RED,i.FLOAT,null),i.bindTexture(i.TEXTURE_2D,null),b0(r,i,n),jM(r,i,!1,()=>{C0(this),i.clearColor(0,0,0,0),i.clear(i.COLOR_BUFFER_BIT),i.drawArrays(i.TRIANGLE_FAN,0,4),hu(this)}),KM(r),hu(this)}}t.push(n)}return new Wt(t,this.m,this.R(),this.canvas,this.l,this.width,this.height)}close(){this.j&&_s(this).deleteTexture(wi(this,2)),Pd=-1}};Wt.prototype.close=Wt.prototype.close,Wt.prototype.clone=Wt.prototype.clone,Wt.prototype.getAsWebGLTexture=Wt.prototype.N,Wt.prototype.getAsFloat32Array=Wt.prototype.ia,Wt.prototype.getAsUint8Array=Wt.prototype.ja,Wt.prototype.hasWebGLTexture=Wt.prototype.R,Wt.prototype.hasFloat32Array=Wt.prototype.ka,Wt.prototype.hasUint8Array=Wt.prototype.Fa;var Pd=250;function jn(...t){return t.map(([e,n])=>({start:e,end:n}))}const $M=function(t){return class extends t{Ja(){this.i._registerModelResourcesGraphService()}}}((Ld=class{constructor(t,e){this.l=!0,this.i=t,this.g=null,this.h=0,this.m=typeof this.i._addIntToInputStream=="function",e!==void 0?this.i.canvas=e:E0()?this.i.canvas=new OffscreenCanvas(1,1):(console.warn("OffscreenCanvas not supported and GraphRunner constructor glCanvas parameter is undefined. Creating backup canvas."),this.i.canvas=document.createElement("canvas"))}async initializeGraph(t){const e=await(await fetch(t)).arrayBuffer();t=!(t.endsWith(".pbtxt")||t.endsWith(".textproto")),this.setGraph(new Uint8Array(e),t)}setGraphFromString(t){this.setGraph(new TextEncoder().encode(t),!1)}setGraph(t,e){const n=t.length,i=this.i._malloc(n);this.i.HEAPU8.set(t,i),e?this.i._changeBinaryGraph(n,i):this.i._changeTextGraph(n,i),this.i._free(i)}configureAudio(t,e,n,i,r){this.i._configureAudio||console.warn('Attempting to use configureAudio without support for input audio. Is build dep ":gl_graph_runner_audio" missing?'),Ae(this,i||"input_audio",s=>{Ae(this,r=r||"audio_header",a=>{this.i._configureAudio(s,a,t,e??0,n)})})}setAutoResizeCanvas(t){this.l=t}setAutoRenderToScreen(t){this.i._setAutoRenderToScreen(t)}setGpuBufferVerticalFlip(t){this.i.gpuOriginForWebTexturesIsBottomLeft=t}ca(t){ei(this,"__graph_config__",e=>{t(e)}),Ae(this,"__graph_config__",e=>{this.i._getGraphConfig(e,void 0)}),delete this.i.simpleListeners.__graph_config__}attachErrorListener(t){this.i.errorListener=t}attachEmptyPacketListener(t,e){this.i.emptyPacketListeners=this.i.emptyPacketListeners||{},this.i.emptyPacketListeners[t]=e}addAudioToStream(t,e,n){this.addAudioToStreamWithShape(t,0,0,e,n)}addAudioToStreamWithShape(t,e,n,i,r){const s=4*t.length;this.h!==s&&(this.g&&this.i._free(this.g),this.g=this.i._malloc(s),this.h=s),this.i.HEAPF32.set(t,this.g/4),Ae(this,i,a=>{this.i._addAudioToInputStream(this.g,e,n,a,r)})}addGpuBufferToStream(t,e,n){Ae(this,e,i=>{const[r,s]=bd(this,t,i);this.i._addBoundTextureToStream(i,r,s,n)})}addBoolToStream(t,e,n){Ae(this,e,i=>{this.i._addBoolToInputStream(t,i,n)})}addDoubleToStream(t,e,n){Ae(this,e,i=>{this.i._addDoubleToInputStream(t,i,n)})}addFloatToStream(t,e,n){Ae(this,e,i=>{this.i._addFloatToInputStream(t,i,n)})}addIntToStream(t,e,n){Ae(this,e,i=>{this.i._addIntToInputStream(t,i,n)})}addUintToStream(t,e,n){Ae(this,e,i=>{this.i._addUintToInputStream(t,i,n)})}addStringToStream(t,e,n){Ae(this,e,i=>{Ae(this,t,r=>{this.i._addStringToInputStream(r,i,n)})})}addStringRecordToStream(t,e,n){Ae(this,e,i=>{Ad(this,Object.keys(t),r=>{Ad(this,Object.values(t),s=>{this.i._addFlatHashMapToInputStream(r,s,Object.keys(t).length,i,n)})})})}addProtoToStream(t,e,n,i){Ae(this,n,r=>{Ae(this,e,s=>{const a=this.i._malloc(t.length);this.i.HEAPU8.set(t,a),this.i._addProtoToInputStream(a,t.length,s,r,i),this.i._free(a)})})}addEmptyPacketToStream(t,e){Ae(this,t,n=>{this.i._addEmptyPacketToInputStream(n,e)})}addBoolVectorToStream(t,e,n){Ae(this,e,i=>{const r=this.i._allocateBoolVector(t.length);if(!r)throw Error("Unable to allocate new bool vector on heap.");for(const s of t)this.i._addBoolVectorEntry(r,s);this.i._addBoolVectorToInputStream(r,i,n)})}addDoubleVectorToStream(t,e,n){Ae(this,e,i=>{const r=this.i._allocateDoubleVector(t.length);if(!r)throw Error("Unable to allocate new double vector on heap.");for(const s of t)this.i._addDoubleVectorEntry(r,s);this.i._addDoubleVectorToInputStream(r,i,n)})}addFloatVectorToStream(t,e,n){Ae(this,e,i=>{const r=this.i._allocateFloatVector(t.length);if(!r)throw Error("Unable to allocate new float vector on heap.");for(const s of t)this.i._addFloatVectorEntry(r,s);this.i._addFloatVectorToInputStream(r,i,n)})}addIntVectorToStream(t,e,n){Ae(this,e,i=>{const r=this.i._allocateIntVector(t.length);if(!r)throw Error("Unable to allocate new int vector on heap.");for(const s of t)this.i._addIntVectorEntry(r,s);this.i._addIntVectorToInputStream(r,i,n)})}addUintVectorToStream(t,e,n){Ae(this,e,i=>{const r=this.i._allocateUintVector(t.length);if(!r)throw Error("Unable to allocate new unsigned int vector on heap.");for(const s of t)this.i._addUintVectorEntry(r,s);this.i._addUintVectorToInputStream(r,i,n)})}addStringVectorToStream(t,e,n){Ae(this,e,i=>{const r=this.i._allocateStringVector(t.length);if(!r)throw Error("Unable to allocate new string vector on heap.");for(const s of t)Ae(this,s,a=>{this.i._addStringVectorEntry(r,a)});this.i._addStringVectorToInputStream(r,i,n)})}addBoolToInputSidePacket(t,e){Ae(this,e,n=>{this.i._addBoolToInputSidePacket(t,n)})}addDoubleToInputSidePacket(t,e){Ae(this,e,n=>{this.i._addDoubleToInputSidePacket(t,n)})}addFloatToInputSidePacket(t,e){Ae(this,e,n=>{this.i._addFloatToInputSidePacket(t,n)})}addIntToInputSidePacket(t,e){Ae(this,e,n=>{this.i._addIntToInputSidePacket(t,n)})}addUintToInputSidePacket(t,e){Ae(this,e,n=>{this.i._addUintToInputSidePacket(t,n)})}addStringToInputSidePacket(t,e){Ae(this,e,n=>{Ae(this,t,i=>{this.i._addStringToInputSidePacket(i,n)})})}addProtoToInputSidePacket(t,e,n){Ae(this,n,i=>{Ae(this,e,r=>{const s=this.i._malloc(t.length);this.i.HEAPU8.set(t,s),this.i._addProtoToInputSidePacket(s,t.length,r,i),this.i._free(s)})})}addBoolVectorToInputSidePacket(t,e){Ae(this,e,n=>{const i=this.i._allocateBoolVector(t.length);if(!i)throw Error("Unable to allocate new bool vector on heap.");for(const r of t)this.i._addBoolVectorEntry(i,r);this.i._addBoolVectorToInputSidePacket(i,n)})}addDoubleVectorToInputSidePacket(t,e){Ae(this,e,n=>{const i=this.i._allocateDoubleVector(t.length);if(!i)throw Error("Unable to allocate new double vector on heap.");for(const r of t)this.i._addDoubleVectorEntry(i,r);this.i._addDoubleVectorToInputSidePacket(i,n)})}addFloatVectorToInputSidePacket(t,e){Ae(this,e,n=>{const i=this.i._allocateFloatVector(t.length);if(!i)throw Error("Unable to allocate new float vector on heap.");for(const r of t)this.i._addFloatVectorEntry(i,r);this.i._addFloatVectorToInputSidePacket(i,n)})}addIntVectorToInputSidePacket(t,e){Ae(this,e,n=>{const i=this.i._allocateIntVector(t.length);if(!i)throw Error("Unable to allocate new int vector on heap.");for(const r of t)this.i._addIntVectorEntry(i,r);this.i._addIntVectorToInputSidePacket(i,n)})}addUintVectorToInputSidePacket(t,e){Ae(this,e,n=>{const i=this.i._allocateUintVector(t.length);if(!i)throw Error("Unable to allocate new unsigned int vector on heap.");for(const r of t)this.i._addUintVectorEntry(i,r);this.i._addUintVectorToInputSidePacket(i,n)})}addStringVectorToInputSidePacket(t,e){Ae(this,e,n=>{const i=this.i._allocateStringVector(t.length);if(!i)throw Error("Unable to allocate new string vector on heap.");for(const r of t)Ae(this,r,s=>{this.i._addStringVectorEntry(i,s)});this.i._addStringVectorToInputSidePacket(i,n)})}attachBoolListener(t,e){ei(this,t,e),Ae(this,t,n=>{this.i._attachBoolListener(n)})}attachBoolVectorListener(t,e){Yi(this,t,e),Ae(this,t,n=>{this.i._attachBoolVectorListener(n)})}attachIntListener(t,e){ei(this,t,e),Ae(this,t,n=>{this.i._attachIntListener(n)})}attachIntVectorListener(t,e){Yi(this,t,e),Ae(this,t,n=>{this.i._attachIntVectorListener(n)})}attachUintListener(t,e){ei(this,t,e),Ae(this,t,n=>{this.i._attachUintListener(n)})}attachUintVectorListener(t,e){Yi(this,t,e),Ae(this,t,n=>{this.i._attachUintVectorListener(n)})}attachDoubleListener(t,e){ei(this,t,e),Ae(this,t,n=>{this.i._attachDoubleListener(n)})}attachDoubleVectorListener(t,e){Yi(this,t,e),Ae(this,t,n=>{this.i._attachDoubleVectorListener(n)})}attachFloatListener(t,e){ei(this,t,e),Ae(this,t,n=>{this.i._attachFloatListener(n)})}attachFloatVectorListener(t,e){Yi(this,t,e),Ae(this,t,n=>{this.i._attachFloatVectorListener(n)})}attachStringListener(t,e){ei(this,t,e),Ae(this,t,n=>{this.i._attachStringListener(n)})}attachStringVectorListener(t,e){Yi(this,t,e),Ae(this,t,n=>{this.i._attachStringVectorListener(n)})}attachProtoListener(t,e,n){ei(this,t,e),Ae(this,t,i=>{this.i._attachProtoListener(i,n||!1)})}attachProtoVectorListener(t,e,n){Yi(this,t,e),Ae(this,t,i=>{this.i._attachProtoVectorListener(i,n||!1)})}attachAudioListener(t,e,n){this.i._attachAudioListener||console.warn('Attempting to use attachAudioListener without support for output audio. Is build dep ":gl_graph_runner_audio_out" missing?'),ei(this,t,(i,r)=>{i=new Float32Array(i.buffer,i.byteOffset,i.length/4),e(i,r)}),Ae(this,t,i=>{this.i._attachAudioListener(i,n||!1)})}finishProcessing(){this.i._waitUntilIdle()}closeGraph(){this.i._closeGraph(),this.i.simpleListeners=void 0,this.i.emptyPacketListeners=void 0}},class extends Ld{get ga(){return this.i}pa(t,e,n){Ae(this,e,i=>{const[r,s]=bd(this,t,i);this.ga._addBoundTextureAsImageToStream(i,r,s,n)})}Z(t,e){ei(this,t,e),Ae(this,t,n=>{this.ga._attachImageListener(n)})}aa(t,e){Yi(this,t,e),Ae(this,t,n=>{this.ga._attachImageVectorListener(n)})}}));var Ld,Kn=class extends $M{};async function $e(t,e,n){return async function(i,r,s,a){return qM(i,r,s,a)}(t,n.canvas??(E0()?void 0:document.createElement("canvas")),e,n)}function P0(t,e,n,i){if(t.U){const s=new Zm;if(n!=null&&n.regionOfInterest){if(!t.oa)throw Error("This task doesn't support region-of-interest.");var r=n.regionOfInterest;if(r.left>=r.right||r.top>=r.bottom)throw Error("Expected RectF with left < right and top < bottom.");if(r.left<0||r.top<0||r.right>1||r.bottom>1)throw Error("Expected RectF values to be in [0,1].");Re(s,1,(r.left+r.right)/2),Re(s,2,(r.top+r.bottom)/2),Re(s,4,r.right-r.left),Re(s,3,r.bottom-r.top)}else Re(s,1,.5),Re(s,2,.5),Re(s,4,1),Re(s,3,1);if(n!=null&&n.rotationDegrees){if((n==null?void 0:n.rotationDegrees)%90!=0)throw Error("Expected rotation to be a multiple of 90°.");if(Re(s,5,-Math.PI*n.rotationDegrees/180),(n==null?void 0:n.rotationDegrees)%180!=0){const[a,o]=y0(e);n=Ct(s,3)*o/a,r=Ct(s,4)*a/o,Re(s,4,n),Re(s,3,r)}}t.g.addProtoToStream(s.g(),"mediapipe.NormalizedRect",t.U,i)}t.g.pa(e,t.X,i??performance.now()),t.finishProcessing()}function $n(t,e,n){var i;if((i=t.baseOptions)!=null&&i.g())throw Error("Task is not initialized with image mode. 'runningMode' must be set to 'IMAGE'.");P0(t,e,n,t.C+1)}function _i(t,e,n,i){var r;if(!((r=t.baseOptions)!=null&&r.g()))throw Error("Task is not initialized with video mode. 'runningMode' must be set to 'VIDEO'.");P0(t,e,n,i)}function vs(t,e,n,i){var r=e.data;const s=e.width,a=s*(e=e.height);if((r instanceof Uint8Array||r instanceof Float32Array)&&r.length!==a)throw Error("Unsupported channel count: "+r.length/a);return t=new Wt([r],n,!1,t.g.i.canvas,t.P,s,e),i?t.clone():t}var Cn=class extends lu{constructor(t,e,n,i){super(t),this.g=t,this.X=e,this.U=n,this.oa=i,this.P=new A0}l(t,e=!0){if("runningMode"in t&&ot(this.baseOptions,2,la(!!t.runningMode&&t.runningMode!=="IMAGE")),t.canvas!==void 0&&this.g.i.canvas!==t.canvas)throw Error("You must create a new task to reset the canvas.");return super.l(t,e)}close(){this.P.close(),super.close()}};Cn.prototype.close=Cn.prototype.close;var Dn=class extends Cn{constructor(t,e){super(new Kn(t,e),"image_in","norm_rect_in",!1),this.j={detections:[]},Pe(t=this.h=new ec,0,1,e=new At),Re(this.h,2,.5),Re(this.h,3,.3)}get baseOptions(){return Qe(this.h,At,1)}set baseOptions(t){Pe(this.h,0,1,t)}o(t){return"minDetectionConfidence"in t&&Re(this.h,2,t.minDetectionConfidence??.5),"minSuppressionThreshold"in t&&Re(this.h,3,t.minSuppressionThreshold??.3),this.l(t)}F(t,e){return this.j={detections:[]},$n(this,t,e),this.j}G(t,e,n){return this.j={detections:[]},_i(this,t,n,e),this.j}m(){var t=new Ln;Et(t,"image_in"),Et(t,"norm_rect_in"),et(t,"detections");const e=new Pn;mi(e,LM,this.h);const n=new mn;Rn(n,2,"mediapipe.tasks.vision.face_detector.FaceDetectorGraph"),_t(n,"IMAGE:image_in"),_t(n,"NORM_RECT:norm_rect_in"),qe(n,"DETECTIONS:detections"),n.o(e),zn(t,n),this.g.attachProtoVectorListener("detections",(i,r)=>{for(const s of i)i=jm(s),this.j.detections.push(M0(i));pe(this,r)}),this.g.attachEmptyPacketListener("detections",i=>{pe(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};Dn.prototype.detectForVideo=Dn.prototype.G,Dn.prototype.detect=Dn.prototype.F,Dn.prototype.setOptions=Dn.prototype.o,Dn.createFromModelPath=async function(t,e){return $e(Dn,t,{baseOptions:{modelAssetPath:e}})},Dn.createFromModelBuffer=function(t,e){return $e(Dn,t,{baseOptions:{modelAssetBuffer:e}})},Dn.createFromOptions=function(t,e){return $e(Dn,t,e)};var Eh=jn([61,146],[146,91],[91,181],[181,84],[84,17],[17,314],[314,405],[405,321],[321,375],[375,291],[61,185],[185,40],[40,39],[39,37],[37,0],[0,267],[267,269],[269,270],[270,409],[409,291],[78,95],[95,88],[88,178],[178,87],[87,14],[14,317],[317,402],[402,318],[318,324],[324,308],[78,191],[191,80],[80,81],[81,82],[82,13],[13,312],[312,311],[311,310],[310,415],[415,308]),yh=jn([263,249],[249,390],[390,373],[373,374],[374,380],[380,381],[381,382],[382,362],[263,466],[466,388],[388,387],[387,386],[386,385],[385,384],[384,398],[398,362]),Th=jn([276,283],[283,282],[282,295],[295,285],[300,293],[293,334],[334,296],[296,336]),L0=jn([474,475],[475,476],[476,477],[477,474]),bh=jn([33,7],[7,163],[163,144],[144,145],[145,153],[153,154],[154,155],[155,133],[33,246],[246,161],[161,160],[160,159],[159,158],[158,157],[157,173],[173,133]),Ah=jn([46,53],[53,52],[52,65],[65,55],[70,63],[63,105],[105,66],[66,107]),I0=jn([469,470],[470,471],[471,472],[472,469]),wh=jn([10,338],[338,297],[297,332],[332,284],[284,251],[251,389],[389,356],[356,454],[454,323],[323,361],[361,288],[288,397],[397,365],[365,379],[379,378],[378,400],[400,377],[377,152],[152,148],[148,176],[176,149],[149,150],[150,136],[136,172],[172,58],[58,132],[132,93],[93,234],[234,127],[127,162],[162,21],[21,54],[54,103],[103,67],[67,109],[109,10]),D0=[...Eh,...yh,...Th,...bh,...Ah,...wh],U0=jn([127,34],[34,139],[139,127],[11,0],[0,37],[37,11],[232,231],[231,120],[120,232],[72,37],[37,39],[39,72],[128,121],[121,47],[47,128],[232,121],[121,128],[128,232],[104,69],[69,67],[67,104],[175,171],[171,148],[148,175],[118,50],[50,101],[101,118],[73,39],[39,40],[40,73],[9,151],[151,108],[108,9],[48,115],[115,131],[131,48],[194,204],[204,211],[211,194],[74,40],[40,185],[185,74],[80,42],[42,183],[183,80],[40,92],[92,186],[186,40],[230,229],[229,118],[118,230],[202,212],[212,214],[214,202],[83,18],[18,17],[17,83],[76,61],[61,146],[146,76],[160,29],[29,30],[30,160],[56,157],[157,173],[173,56],[106,204],[204,194],[194,106],[135,214],[214,192],[192,135],[203,165],[165,98],[98,203],[21,71],[71,68],[68,21],[51,45],[45,4],[4,51],[144,24],[24,23],[23,144],[77,146],[146,91],[91,77],[205,50],[50,187],[187,205],[201,200],[200,18],[18,201],[91,106],[106,182],[182,91],[90,91],[91,181],[181,90],[85,84],[84,17],[17,85],[206,203],[203,36],[36,206],[148,171],[171,140],[140,148],[92,40],[40,39],[39,92],[193,189],[189,244],[244,193],[159,158],[158,28],[28,159],[247,246],[246,161],[161,247],[236,3],[3,196],[196,236],[54,68],[68,104],[104,54],[193,168],[168,8],[8,193],[117,228],[228,31],[31,117],[189,193],[193,55],[55,189],[98,97],[97,99],[99,98],[126,47],[47,100],[100,126],[166,79],[79,218],[218,166],[155,154],[154,26],[26,155],[209,49],[49,131],[131,209],[135,136],[136,150],[150,135],[47,126],[126,217],[217,47],[223,52],[52,53],[53,223],[45,51],[51,134],[134,45],[211,170],[170,140],[140,211],[67,69],[69,108],[108,67],[43,106],[106,91],[91,43],[230,119],[119,120],[120,230],[226,130],[130,247],[247,226],[63,53],[53,52],[52,63],[238,20],[20,242],[242,238],[46,70],[70,156],[156,46],[78,62],[62,96],[96,78],[46,53],[53,63],[63,46],[143,34],[34,227],[227,143],[123,117],[117,111],[111,123],[44,125],[125,19],[19,44],[236,134],[134,51],[51,236],[216,206],[206,205],[205,216],[154,153],[153,22],[22,154],[39,37],[37,167],[167,39],[200,201],[201,208],[208,200],[36,142],[142,100],[100,36],[57,212],[212,202],[202,57],[20,60],[60,99],[99,20],[28,158],[158,157],[157,28],[35,226],[226,113],[113,35],[160,159],[159,27],[27,160],[204,202],[202,210],[210,204],[113,225],[225,46],[46,113],[43,202],[202,204],[204,43],[62,76],[76,77],[77,62],[137,123],[123,116],[116,137],[41,38],[38,72],[72,41],[203,129],[129,142],[142,203],[64,98],[98,240],[240,64],[49,102],[102,64],[64,49],[41,73],[73,74],[74,41],[212,216],[216,207],[207,212],[42,74],[74,184],[184,42],[169,170],[170,211],[211,169],[170,149],[149,176],[176,170],[105,66],[66,69],[69,105],[122,6],[6,168],[168,122],[123,147],[147,187],[187,123],[96,77],[77,90],[90,96],[65,55],[55,107],[107,65],[89,90],[90,180],[180,89],[101,100],[100,120],[120,101],[63,105],[105,104],[104,63],[93,137],[137,227],[227,93],[15,86],[86,85],[85,15],[129,102],[102,49],[49,129],[14,87],[87,86],[86,14],[55,8],[8,9],[9,55],[100,47],[47,121],[121,100],[145,23],[23,22],[22,145],[88,89],[89,179],[179,88],[6,122],[122,196],[196,6],[88,95],[95,96],[96,88],[138,172],[172,136],[136,138],[215,58],[58,172],[172,215],[115,48],[48,219],[219,115],[42,80],[80,81],[81,42],[195,3],[3,51],[51,195],[43,146],[146,61],[61,43],[171,175],[175,199],[199,171],[81,82],[82,38],[38,81],[53,46],[46,225],[225,53],[144,163],[163,110],[110,144],[52,65],[65,66],[66,52],[229,228],[228,117],[117,229],[34,127],[127,234],[234,34],[107,108],[108,69],[69,107],[109,108],[108,151],[151,109],[48,64],[64,235],[235,48],[62,78],[78,191],[191,62],[129,209],[209,126],[126,129],[111,35],[35,143],[143,111],[117,123],[123,50],[50,117],[222,65],[65,52],[52,222],[19,125],[125,141],[141,19],[221,55],[55,65],[65,221],[3,195],[195,197],[197,3],[25,7],[7,33],[33,25],[220,237],[237,44],[44,220],[70,71],[71,139],[139,70],[122,193],[193,245],[245,122],[247,130],[130,33],[33,247],[71,21],[21,162],[162,71],[170,169],[169,150],[150,170],[188,174],[174,196],[196,188],[216,186],[186,92],[92,216],[2,97],[97,167],[167,2],[141,125],[125,241],[241,141],[164,167],[167,37],[37,164],[72,38],[38,12],[12,72],[38,82],[82,13],[13,38],[63,68],[68,71],[71,63],[226,35],[35,111],[111,226],[101,50],[50,205],[205,101],[206,92],[92,165],[165,206],[209,198],[198,217],[217,209],[165,167],[167,97],[97,165],[220,115],[115,218],[218,220],[133,112],[112,243],[243,133],[239,238],[238,241],[241,239],[214,135],[135,169],[169,214],[190,173],[173,133],[133,190],[171,208],[208,32],[32,171],[125,44],[44,237],[237,125],[86,87],[87,178],[178,86],[85,86],[86,179],[179,85],[84,85],[85,180],[180,84],[83,84],[84,181],[181,83],[201,83],[83,182],[182,201],[137,93],[93,132],[132,137],[76,62],[62,183],[183,76],[61,76],[76,184],[184,61],[57,61],[61,185],[185,57],[212,57],[57,186],[186,212],[214,207],[207,187],[187,214],[34,143],[143,156],[156,34],[79,239],[239,237],[237,79],[123,137],[137,177],[177,123],[44,1],[1,4],[4,44],[201,194],[194,32],[32,201],[64,102],[102,129],[129,64],[213,215],[215,138],[138,213],[59,166],[166,219],[219,59],[242,99],[99,97],[97,242],[2,94],[94,141],[141,2],[75,59],[59,235],[235,75],[24,110],[110,228],[228,24],[25,130],[130,226],[226,25],[23,24],[24,229],[229,23],[22,23],[23,230],[230,22],[26,22],[22,231],[231,26],[112,26],[26,232],[232,112],[189,190],[190,243],[243,189],[221,56],[56,190],[190,221],[28,56],[56,221],[221,28],[27,28],[28,222],[222,27],[29,27],[27,223],[223,29],[30,29],[29,224],[224,30],[247,30],[30,225],[225,247],[238,79],[79,20],[20,238],[166,59],[59,75],[75,166],[60,75],[75,240],[240,60],[147,177],[177,215],[215,147],[20,79],[79,166],[166,20],[187,147],[147,213],[213,187],[112,233],[233,244],[244,112],[233,128],[128,245],[245,233],[128,114],[114,188],[188,128],[114,217],[217,174],[174,114],[131,115],[115,220],[220,131],[217,198],[198,236],[236,217],[198,131],[131,134],[134,198],[177,132],[132,58],[58,177],[143,35],[35,124],[124,143],[110,163],[163,7],[7,110],[228,110],[110,25],[25,228],[356,389],[389,368],[368,356],[11,302],[302,267],[267,11],[452,350],[350,349],[349,452],[302,303],[303,269],[269,302],[357,343],[343,277],[277,357],[452,453],[453,357],[357,452],[333,332],[332,297],[297,333],[175,152],[152,377],[377,175],[347,348],[348,330],[330,347],[303,304],[304,270],[270,303],[9,336],[336,337],[337,9],[278,279],[279,360],[360,278],[418,262],[262,431],[431,418],[304,408],[408,409],[409,304],[310,415],[415,407],[407,310],[270,409],[409,410],[410,270],[450,348],[348,347],[347,450],[422,430],[430,434],[434,422],[313,314],[314,17],[17,313],[306,307],[307,375],[375,306],[387,388],[388,260],[260,387],[286,414],[414,398],[398,286],[335,406],[406,418],[418,335],[364,367],[367,416],[416,364],[423,358],[358,327],[327,423],[251,284],[284,298],[298,251],[281,5],[5,4],[4,281],[373,374],[374,253],[253,373],[307,320],[320,321],[321,307],[425,427],[427,411],[411,425],[421,313],[313,18],[18,421],[321,405],[405,406],[406,321],[320,404],[404,405],[405,320],[315,16],[16,17],[17,315],[426,425],[425,266],[266,426],[377,400],[400,369],[369,377],[322,391],[391,269],[269,322],[417,465],[465,464],[464,417],[386,257],[257,258],[258,386],[466,260],[260,388],[388,466],[456,399],[399,419],[419,456],[284,332],[332,333],[333,284],[417,285],[285,8],[8,417],[346,340],[340,261],[261,346],[413,441],[441,285],[285,413],[327,460],[460,328],[328,327],[355,371],[371,329],[329,355],[392,439],[439,438],[438,392],[382,341],[341,256],[256,382],[429,420],[420,360],[360,429],[364,394],[394,379],[379,364],[277,343],[343,437],[437,277],[443,444],[444,283],[283,443],[275,440],[440,363],[363,275],[431,262],[262,369],[369,431],[297,338],[338,337],[337,297],[273,375],[375,321],[321,273],[450,451],[451,349],[349,450],[446,342],[342,467],[467,446],[293,334],[334,282],[282,293],[458,461],[461,462],[462,458],[276,353],[353,383],[383,276],[308,324],[324,325],[325,308],[276,300],[300,293],[293,276],[372,345],[345,447],[447,372],[352,345],[345,340],[340,352],[274,1],[1,19],[19,274],[456,248],[248,281],[281,456],[436,427],[427,425],[425,436],[381,256],[256,252],[252,381],[269,391],[391,393],[393,269],[200,199],[199,428],[428,200],[266,330],[330,329],[329,266],[287,273],[273,422],[422,287],[250,462],[462,328],[328,250],[258,286],[286,384],[384,258],[265,353],[353,342],[342,265],[387,259],[259,257],[257,387],[424,431],[431,430],[430,424],[342,353],[353,276],[276,342],[273,335],[335,424],[424,273],[292,325],[325,307],[307,292],[366,447],[447,345],[345,366],[271,303],[303,302],[302,271],[423,266],[266,371],[371,423],[294,455],[455,460],[460,294],[279,278],[278,294],[294,279],[271,272],[272,304],[304,271],[432,434],[434,427],[427,432],[272,407],[407,408],[408,272],[394,430],[430,431],[431,394],[395,369],[369,400],[400,395],[334,333],[333,299],[299,334],[351,417],[417,168],[168,351],[352,280],[280,411],[411,352],[325,319],[319,320],[320,325],[295,296],[296,336],[336,295],[319,403],[403,404],[404,319],[330,348],[348,349],[349,330],[293,298],[298,333],[333,293],[323,454],[454,447],[447,323],[15,16],[16,315],[315,15],[358,429],[429,279],[279,358],[14,15],[15,316],[316,14],[285,336],[336,9],[9,285],[329,349],[349,350],[350,329],[374,380],[380,252],[252,374],[318,402],[402,403],[403,318],[6,197],[197,419],[419,6],[318,319],[319,325],[325,318],[367,364],[364,365],[365,367],[435,367],[367,397],[397,435],[344,438],[438,439],[439,344],[272,271],[271,311],[311,272],[195,5],[5,281],[281,195],[273,287],[287,291],[291,273],[396,428],[428,199],[199,396],[311,271],[271,268],[268,311],[283,444],[444,445],[445,283],[373,254],[254,339],[339,373],[282,334],[334,296],[296,282],[449,347],[347,346],[346,449],[264,447],[447,454],[454,264],[336,296],[296,299],[299,336],[338,10],[10,151],[151,338],[278,439],[439,455],[455,278],[292,407],[407,415],[415,292],[358,371],[371,355],[355,358],[340,345],[345,372],[372,340],[346,347],[347,280],[280,346],[442,443],[443,282],[282,442],[19,94],[94,370],[370,19],[441,442],[442,295],[295,441],[248,419],[419,197],[197,248],[263,255],[255,359],[359,263],[440,275],[275,274],[274,440],[300,383],[383,368],[368,300],[351,412],[412,465],[465,351],[263,467],[467,466],[466,263],[301,368],[368,389],[389,301],[395,378],[378,379],[379,395],[412,351],[351,419],[419,412],[436,426],[426,322],[322,436],[2,164],[164,393],[393,2],[370,462],[462,461],[461,370],[164,0],[0,267],[267,164],[302,11],[11,12],[12,302],[268,12],[12,13],[13,268],[293,300],[300,301],[301,293],[446,261],[261,340],[340,446],[330,266],[266,425],[425,330],[426,423],[423,391],[391,426],[429,355],[355,437],[437,429],[391,327],[327,326],[326,391],[440,457],[457,438],[438,440],[341,382],[382,362],[362,341],[459,457],[457,461],[461,459],[434,430],[430,394],[394,434],[414,463],[463,362],[362,414],[396,369],[369,262],[262,396],[354,461],[461,457],[457,354],[316,403],[403,402],[402,316],[315,404],[404,403],[403,315],[314,405],[405,404],[404,314],[313,406],[406,405],[405,313],[421,418],[418,406],[406,421],[366,401],[401,361],[361,366],[306,408],[408,407],[407,306],[291,409],[409,408],[408,291],[287,410],[410,409],[409,287],[432,436],[436,410],[410,432],[434,416],[416,411],[411,434],[264,368],[368,383],[383,264],[309,438],[438,457],[457,309],[352,376],[376,401],[401,352],[274,275],[275,4],[4,274],[421,428],[428,262],[262,421],[294,327],[327,358],[358,294],[433,416],[416,367],[367,433],[289,455],[455,439],[439,289],[462,370],[370,326],[326,462],[2,326],[326,370],[370,2],[305,460],[460,455],[455,305],[254,449],[449,448],[448,254],[255,261],[261,446],[446,255],[253,450],[450,449],[449,253],[252,451],[451,450],[450,252],[256,452],[452,451],[451,256],[341,453],[453,452],[452,341],[413,464],[464,463],[463,413],[441,413],[413,414],[414,441],[258,442],[442,441],[441,258],[257,443],[443,442],[442,257],[259,444],[444,443],[443,259],[260,445],[445,444],[444,260],[467,342],[342,445],[445,467],[459,458],[458,250],[250,459],[289,392],[392,290],[290,289],[290,328],[328,460],[460,290],[376,433],[433,435],[435,376],[250,290],[290,392],[392,250],[411,416],[416,433],[433,411],[341,463],[463,464],[464,341],[453,464],[464,465],[465,453],[357,465],[465,412],[412,357],[343,412],[412,399],[399,343],[360,363],[363,440],[440,360],[437,399],[399,456],[456,437],[420,456],[456,363],[363,420],[401,435],[435,288],[288,401],[372,383],[383,353],[353,372],[339,255],[255,249],[249,339],[448,261],[261,255],[255,448],[133,243],[243,190],[190,133],[133,155],[155,112],[112,133],[33,246],[246,247],[247,33],[33,130],[130,25],[25,33],[398,384],[384,286],[286,398],[362,398],[398,414],[414,362],[362,463],[463,341],[341,362],[263,359],[359,467],[467,263],[263,249],[249,255],[255,263],[466,467],[467,260],[260,466],[75,60],[60,166],[166,75],[238,239],[239,79],[79,238],[162,127],[127,139],[139,162],[72,11],[11,37],[37,72],[121,232],[232,120],[120,121],[73,72],[72,39],[39,73],[114,128],[128,47],[47,114],[233,232],[232,128],[128,233],[103,104],[104,67],[67,103],[152,175],[175,148],[148,152],[119,118],[118,101],[101,119],[74,73],[73,40],[40,74],[107,9],[9,108],[108,107],[49,48],[48,131],[131,49],[32,194],[194,211],[211,32],[184,74],[74,185],[185,184],[191,80],[80,183],[183,191],[185,40],[40,186],[186,185],[119,230],[230,118],[118,119],[210,202],[202,214],[214,210],[84,83],[83,17],[17,84],[77,76],[76,146],[146,77],[161,160],[160,30],[30,161],[190,56],[56,173],[173,190],[182,106],[106,194],[194,182],[138,135],[135,192],[192,138],[129,203],[203,98],[98,129],[54,21],[21,68],[68,54],[5,51],[51,4],[4,5],[145,144],[144,23],[23,145],[90,77],[77,91],[91,90],[207,205],[205,187],[187,207],[83,201],[201,18],[18,83],[181,91],[91,182],[182,181],[180,90],[90,181],[181,180],[16,85],[85,17],[17,16],[205,206],[206,36],[36,205],[176,148],[148,140],[140,176],[165,92],[92,39],[39,165],[245,193],[193,244],[244,245],[27,159],[159,28],[28,27],[30,247],[247,161],[161,30],[174,236],[236,196],[196,174],[103,54],[54,104],[104,103],[55,193],[193,8],[8,55],[111,117],[117,31],[31,111],[221,189],[189,55],[55,221],[240,98],[98,99],[99,240],[142,126],[126,100],[100,142],[219,166],[166,218],[218,219],[112,155],[155,26],[26,112],[198,209],[209,131],[131,198],[169,135],[135,150],[150,169],[114,47],[47,217],[217,114],[224,223],[223,53],[53,224],[220,45],[45,134],[134,220],[32,211],[211,140],[140,32],[109,67],[67,108],[108,109],[146,43],[43,91],[91,146],[231,230],[230,120],[120,231],[113,226],[226,247],[247,113],[105,63],[63,52],[52,105],[241,238],[238,242],[242,241],[124,46],[46,156],[156,124],[95,78],[78,96],[96,95],[70,46],[46,63],[63,70],[116,143],[143,227],[227,116],[116,123],[123,111],[111,116],[1,44],[44,19],[19,1],[3,236],[236,51],[51,3],[207,216],[216,205],[205,207],[26,154],[154,22],[22,26],[165,39],[39,167],[167,165],[199,200],[200,208],[208,199],[101,36],[36,100],[100,101],[43,57],[57,202],[202,43],[242,20],[20,99],[99,242],[56,28],[28,157],[157,56],[124,35],[35,113],[113,124],[29,160],[160,27],[27,29],[211,204],[204,210],[210,211],[124,113],[113,46],[46,124],[106,43],[43,204],[204,106],[96,62],[62,77],[77,96],[227,137],[137,116],[116,227],[73,41],[41,72],[72,73],[36,203],[203,142],[142,36],[235,64],[64,240],[240,235],[48,49],[49,64],[64,48],[42,41],[41,74],[74,42],[214,212],[212,207],[207,214],[183,42],[42,184],[184,183],[210,169],[169,211],[211,210],[140,170],[170,176],[176,140],[104,105],[105,69],[69,104],[193,122],[122,168],[168,193],[50,123],[123,187],[187,50],[89,96],[96,90],[90,89],[66,65],[65,107],[107,66],[179,89],[89,180],[180,179],[119,101],[101,120],[120,119],[68,63],[63,104],[104,68],[234,93],[93,227],[227,234],[16,15],[15,85],[85,16],[209,129],[129,49],[49,209],[15,14],[14,86],[86,15],[107,55],[55,9],[9,107],[120,100],[100,121],[121,120],[153,145],[145,22],[22,153],[178,88],[88,179],[179,178],[197,6],[6,196],[196,197],[89,88],[88,96],[96,89],[135,138],[138,136],[136,135],[138,215],[215,172],[172,138],[218,115],[115,219],[219,218],[41,42],[42,81],[81,41],[5,195],[195,51],[51,5],[57,43],[43,61],[61,57],[208,171],[171,199],[199,208],[41,81],[81,38],[38,41],[224,53],[53,225],[225,224],[24,144],[144,110],[110,24],[105,52],[52,66],[66,105],[118,229],[229,117],[117,118],[227,34],[34,234],[234,227],[66,107],[107,69],[69,66],[10,109],[109,151],[151,10],[219,48],[48,235],[235,219],[183,62],[62,191],[191,183],[142,129],[129,126],[126,142],[116,111],[111,143],[143,116],[118,117],[117,50],[50,118],[223,222],[222,52],[52,223],[94,19],[19,141],[141,94],[222,221],[221,65],[65,222],[196,3],[3,197],[197,196],[45,220],[220,44],[44,45],[156,70],[70,139],[139,156],[188,122],[122,245],[245,188],[139,71],[71,162],[162,139],[149,170],[170,150],[150,149],[122,188],[188,196],[196,122],[206,216],[216,92],[92,206],[164,2],[2,167],[167,164],[242,141],[141,241],[241,242],[0,164],[164,37],[37,0],[11,72],[72,12],[12,11],[12,38],[38,13],[13,12],[70,63],[63,71],[71,70],[31,226],[226,111],[111,31],[36,101],[101,205],[205,36],[203,206],[206,165],[165,203],[126,209],[209,217],[217,126],[98,165],[165,97],[97,98],[237,220],[220,218],[218,237],[237,239],[239,241],[241,237],[210,214],[214,169],[169,210],[140,171],[171,32],[32,140],[241,125],[125,237],[237,241],[179,86],[86,178],[178,179],[180,85],[85,179],[179,180],[181,84],[84,180],[180,181],[182,83],[83,181],[181,182],[194,201],[201,182],[182,194],[177,137],[137,132],[132,177],[184,76],[76,183],[183,184],[185,61],[61,184],[184,185],[186,57],[57,185],[185,186],[216,212],[212,186],[186,216],[192,214],[214,187],[187,192],[139,34],[34,156],[156,139],[218,79],[79,237],[237,218],[147,123],[123,177],[177,147],[45,44],[44,4],[4,45],[208,201],[201,32],[32,208],[98,64],[64,129],[129,98],[192,213],[213,138],[138,192],[235,59],[59,219],[219,235],[141,242],[242,97],[97,141],[97,2],[2,141],[141,97],[240,75],[75,235],[235,240],[229,24],[24,228],[228,229],[31,25],[25,226],[226,31],[230,23],[23,229],[229,230],[231,22],[22,230],[230,231],[232,26],[26,231],[231,232],[233,112],[112,232],[232,233],[244,189],[189,243],[243,244],[189,221],[221,190],[190,189],[222,28],[28,221],[221,222],[223,27],[27,222],[222,223],[224,29],[29,223],[223,224],[225,30],[30,224],[224,225],[113,247],[247,225],[225,113],[99,60],[60,240],[240,99],[213,147],[147,215],[215,213],[60,20],[20,166],[166,60],[192,187],[187,213],[213,192],[243,112],[112,244],[244,243],[244,233],[233,245],[245,244],[245,128],[128,188],[188,245],[188,114],[114,174],[174,188],[134,131],[131,220],[220,134],[174,217],[217,236],[236,174],[236,198],[198,134],[134,236],[215,177],[177,58],[58,215],[156,143],[143,124],[124,156],[25,110],[110,7],[7,25],[31,228],[228,25],[25,31],[264,356],[356,368],[368,264],[0,11],[11,267],[267,0],[451,452],[452,349],[349,451],[267,302],[302,269],[269,267],[350,357],[357,277],[277,350],[350,452],[452,357],[357,350],[299,333],[333,297],[297,299],[396,175],[175,377],[377,396],[280,347],[347,330],[330,280],[269,303],[303,270],[270,269],[151,9],[9,337],[337,151],[344,278],[278,360],[360,344],[424,418],[418,431],[431,424],[270,304],[304,409],[409,270],[272,310],[310,407],[407,272],[322,270],[270,410],[410,322],[449,450],[450,347],[347,449],[432,422],[422,434],[434,432],[18,313],[313,17],[17,18],[291,306],[306,375],[375,291],[259,387],[387,260],[260,259],[424,335],[335,418],[418,424],[434,364],[364,416],[416,434],[391,423],[423,327],[327,391],[301,251],[251,298],[298,301],[275,281],[281,4],[4,275],[254,373],[373,253],[253,254],[375,307],[307,321],[321,375],[280,425],[425,411],[411,280],[200,421],[421,18],[18,200],[335,321],[321,406],[406,335],[321,320],[320,405],[405,321],[314,315],[315,17],[17,314],[423,426],[426,266],[266,423],[396,377],[377,369],[369,396],[270,322],[322,269],[269,270],[413,417],[417,464],[464,413],[385,386],[386,258],[258,385],[248,456],[456,419],[419,248],[298,284],[284,333],[333,298],[168,417],[417,8],[8,168],[448,346],[346,261],[261,448],[417,413],[413,285],[285,417],[326,327],[327,328],[328,326],[277,355],[355,329],[329,277],[309,392],[392,438],[438,309],[381,382],[382,256],[256,381],[279,429],[429,360],[360,279],[365,364],[364,379],[379,365],[355,277],[277,437],[437,355],[282,443],[443,283],[283,282],[281,275],[275,363],[363,281],[395,431],[431,369],[369,395],[299,297],[297,337],[337,299],[335,273],[273,321],[321,335],[348,450],[450,349],[349,348],[359,446],[446,467],[467,359],[283,293],[293,282],[282,283],[250,458],[458,462],[462,250],[300,276],[276,383],[383,300],[292,308],[308,325],[325,292],[283,276],[276,293],[293,283],[264,372],[372,447],[447,264],[346,352],[352,340],[340,346],[354,274],[274,19],[19,354],[363,456],[456,281],[281,363],[426,436],[436,425],[425,426],[380,381],[381,252],[252,380],[267,269],[269,393],[393,267],[421,200],[200,428],[428,421],[371,266],[266,329],[329,371],[432,287],[287,422],[422,432],[290,250],[250,328],[328,290],[385,258],[258,384],[384,385],[446,265],[265,342],[342,446],[386,387],[387,257],[257,386],[422,424],[424,430],[430,422],[445,342],[342,276],[276,445],[422,273],[273,424],[424,422],[306,292],[292,307],[307,306],[352,366],[366,345],[345,352],[268,271],[271,302],[302,268],[358,423],[423,371],[371,358],[327,294],[294,460],[460,327],[331,279],[279,294],[294,331],[303,271],[271,304],[304,303],[436,432],[432,427],[427,436],[304,272],[272,408],[408,304],[395,394],[394,431],[431,395],[378,395],[395,400],[400,378],[296,334],[334,299],[299,296],[6,351],[351,168],[168,6],[376,352],[352,411],[411,376],[307,325],[325,320],[320,307],[285,295],[295,336],[336,285],[320,319],[319,404],[404,320],[329,330],[330,349],[349,329],[334,293],[293,333],[333,334],[366,323],[323,447],[447,366],[316,15],[15,315],[315,316],[331,358],[358,279],[279,331],[317,14],[14,316],[316,317],[8,285],[285,9],[9,8],[277,329],[329,350],[350,277],[253,374],[374,252],[252,253],[319,318],[318,403],[403,319],[351,6],[6,419],[419,351],[324,318],[318,325],[325,324],[397,367],[367,365],[365,397],[288,435],[435,397],[397,288],[278,344],[344,439],[439,278],[310,272],[272,311],[311,310],[248,195],[195,281],[281,248],[375,273],[273,291],[291,375],[175,396],[396,199],[199,175],[312,311],[311,268],[268,312],[276,283],[283,445],[445,276],[390,373],[373,339],[339,390],[295,282],[282,296],[296,295],[448,449],[449,346],[346,448],[356,264],[264,454],[454,356],[337,336],[336,299],[299,337],[337,338],[338,151],[151,337],[294,278],[278,455],[455,294],[308,292],[292,415],[415,308],[429,358],[358,355],[355,429],[265,340],[340,372],[372,265],[352,346],[346,280],[280,352],[295,442],[442,282],[282,295],[354,19],[19,370],[370,354],[285,441],[441,295],[295,285],[195,248],[248,197],[197,195],[457,440],[440,274],[274,457],[301,300],[300,368],[368,301],[417,351],[351,465],[465,417],[251,301],[301,389],[389,251],[394,395],[395,379],[379,394],[399,412],[412,419],[419,399],[410,436],[436,322],[322,410],[326,2],[2,393],[393,326],[354,370],[370,461],[461,354],[393,164],[164,267],[267,393],[268,302],[302,12],[12,268],[312,268],[268,13],[13,312],[298,293],[293,301],[301,298],[265,446],[446,340],[340,265],[280,330],[330,425],[425,280],[322,426],[426,391],[391,322],[420,429],[429,437],[437,420],[393,391],[391,326],[326,393],[344,440],[440,438],[438,344],[458,459],[459,461],[461,458],[364,434],[434,394],[394,364],[428,396],[396,262],[262,428],[274,354],[354,457],[457,274],[317,316],[316,402],[402,317],[316,315],[315,403],[403,316],[315,314],[314,404],[404,315],[314,313],[313,405],[405,314],[313,421],[421,406],[406,313],[323,366],[366,361],[361,323],[292,306],[306,407],[407,292],[306,291],[291,408],[408,306],[291,287],[287,409],[409,291],[287,432],[432,410],[410,287],[427,434],[434,411],[411,427],[372,264],[264,383],[383,372],[459,309],[309,457],[457,459],[366,352],[352,401],[401,366],[1,274],[274,4],[4,1],[418,421],[421,262],[262,418],[331,294],[294,358],[358,331],[435,433],[433,367],[367,435],[392,289],[289,439],[439,392],[328,462],[462,326],[326,328],[94,2],[2,370],[370,94],[289,305],[305,455],[455,289],[339,254],[254,448],[448,339],[359,255],[255,446],[446,359],[254,253],[253,449],[449,254],[253,252],[252,450],[450,253],[252,256],[256,451],[451,252],[256,341],[341,452],[452,256],[414,413],[413,463],[463,414],[286,441],[441,414],[414,286],[286,258],[258,441],[441,286],[258,257],[257,442],[442,258],[257,259],[259,443],[443,257],[259,260],[260,444],[444,259],[260,467],[467,445],[445,260],[309,459],[459,250],[250,309],[305,289],[289,290],[290,305],[305,290],[290,460],[460,305],[401,376],[376,435],[435,401],[309,250],[250,392],[392,309],[376,411],[411,433],[433,376],[453,341],[341,464],[464,453],[357,453],[453,465],[465,357],[343,357],[357,412],[412,343],[437,343],[343,399],[399,437],[344,360],[360,440],[440,344],[420,437],[437,456],[456,420],[360,420],[420,363],[363,360],[361,401],[401,288],[288,361],[265,372],[372,353],[353,265],[390,339],[339,249],[249,390],[339,448],[448,255],[255,339]);function Id(t){t.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]}}var Tt=class extends Cn{constructor(t,e){super(new Kn(t,e),"image_in","norm_rect",!1),this.j={faceLandmarks:[],faceBlendshapes:[],facialTransformationMatrixes:[]},this.outputFacialTransformationMatrixes=this.outputFaceBlendshapes=!1,Pe(t=this.h=new n0,0,1,e=new At),this.A=new t0,Pe(this.h,0,3,this.A),this.u=new ec,Pe(this.h,0,2,this.u),Fi(this.u,4,1),Re(this.u,2,.5),Re(this.A,2,.5),Re(this.h,4,.5)}get baseOptions(){return Qe(this.h,At,1)}set baseOptions(t){Pe(this.h,0,1,t)}o(t){return"numFaces"in t&&Fi(this.u,4,t.numFaces??1),"minFaceDetectionConfidence"in t&&Re(this.u,2,t.minFaceDetectionConfidence??.5),"minTrackingConfidence"in t&&Re(this.h,4,t.minTrackingConfidence??.5),"minFacePresenceConfidence"in t&&Re(this.A,2,t.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in t&&(this.outputFaceBlendshapes=!!t.outputFaceBlendshapes),"outputFacialTransformationMatrixes"in t&&(this.outputFacialTransformationMatrixes=!!t.outputFacialTransformationMatrixes),this.l(t)}F(t,e){return Id(this),$n(this,t,e),this.j}G(t,e,n){return Id(this),_i(this,t,n,e),this.j}m(){var t=new Ln;Et(t,"image_in"),Et(t,"norm_rect"),et(t,"face_landmarks");const e=new Pn;mi(e,DM,this.h);const n=new mn;Rn(n,2,"mediapipe.tasks.vision.face_landmarker.FaceLandmarkerGraph"),_t(n,"IMAGE:image_in"),_t(n,"NORM_RECT:norm_rect"),qe(n,"NORM_LANDMARKS:face_landmarks"),n.o(e),zn(t,n),this.g.attachProtoVectorListener("face_landmarks",(i,r)=>{for(const s of i)i=Ea(s),this.j.faceLandmarks.push(tc(i));pe(this,r)}),this.g.attachEmptyPacketListener("face_landmarks",i=>{pe(this,i)}),this.outputFaceBlendshapes&&(et(t,"blendshapes"),qe(n,"BLENDSHAPES:blendshapes"),this.g.attachProtoVectorListener("blendshapes",(i,r)=>{if(this.outputFaceBlendshapes)for(const s of i)i=Qo(s),this.j.faceBlendshapes.push(xh(i.g()??[]));pe(this,r)}),this.g.attachEmptyPacketListener("blendshapes",i=>{pe(this,i)})),this.outputFacialTransformationMatrixes&&(et(t,"face_geometry"),qe(n,"FACE_GEOMETRY:face_geometry"),this.g.attachProtoVectorListener("face_geometry",(i,r)=>{if(this.outputFacialTransformationMatrixes)for(const s of i)(i=Qe(i=IM(s),yM,2))&&this.j.facialTransformationMatrixes.push({rows:On(i,1)??0??0,columns:On(i,2)??0??0,data:xr(i,3,si,vr()).slice()??[]});pe(this,r)}),this.g.attachEmptyPacketListener("face_geometry",i=>{pe(this,i)})),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};Tt.prototype.detectForVideo=Tt.prototype.G,Tt.prototype.detect=Tt.prototype.F,Tt.prototype.setOptions=Tt.prototype.o,Tt.createFromModelPath=function(t,e){return $e(Tt,t,{baseOptions:{modelAssetPath:e}})},Tt.createFromModelBuffer=function(t,e){return $e(Tt,t,{baseOptions:{modelAssetBuffer:e}})},Tt.createFromOptions=function(t,e){return $e(Tt,t,e)},Tt.FACE_LANDMARKS_LIPS=Eh,Tt.FACE_LANDMARKS_LEFT_EYE=yh,Tt.FACE_LANDMARKS_LEFT_EYEBROW=Th,Tt.FACE_LANDMARKS_LEFT_IRIS=L0,Tt.FACE_LANDMARKS_RIGHT_EYE=bh,Tt.FACE_LANDMARKS_RIGHT_EYEBROW=Ah,Tt.FACE_LANDMARKS_RIGHT_IRIS=I0,Tt.FACE_LANDMARKS_FACE_OVAL=wh,Tt.FACE_LANDMARKS_CONTOURS=D0,Tt.FACE_LANDMARKS_TESSELATION=U0;var Rh=jn([0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[0,17],[17,18],[18,19],[19,20]);function Dd(t){t.gestures=[],t.landmarks=[],t.worldLandmarks=[],t.handedness=[]}function Ud(t){return t.gestures.length===0?{gestures:[],landmarks:[],worldLandmarks:[],handedness:[],handednesses:[]}:{gestures:t.gestures,landmarks:t.landmarks,worldLandmarks:t.worldLandmarks,handedness:t.handedness,handednesses:t.handedness}}function Nd(t,e=!0){const n=[];for(const r of t){var i=Qo(r);t=[];for(const s of i.g())i=e&&On(s,1)!=null?On(s,1)??0:-1,t.push({score:Ct(s,2)??0,index:i,categoryName:Kt(xt(s,3))??""??"",displayName:Kt(xt(s,4))??""??""});n.push(t)}return n}var xn=class extends Cn{constructor(t,e){super(new Kn(t,e),"image_in","norm_rect",!1),this.gestures=[],this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Pe(t=this.j=new s0,0,1,e=new At),this.u=new mh,Pe(this.j,0,2,this.u),this.D=new ph,Pe(this.u,0,3,this.D),this.A=new r0,Pe(this.u,0,2,this.A),this.h=new UM,Pe(this.j,0,3,this.h),Re(this.A,2,.5),Re(this.u,4,.5),Re(this.D,2,.5)}get baseOptions(){return Qe(this.j,At,1)}set baseOptions(t){Pe(this.j,0,1,t)}o(t){var r,s,a,o;if(Fi(this.A,3,t.numHands??1),"minHandDetectionConfidence"in t&&Re(this.A,2,t.minHandDetectionConfidence??.5),"minTrackingConfidence"in t&&Re(this.u,4,t.minTrackingConfidence??.5),"minHandPresenceConfidence"in t&&Re(this.D,2,t.minHandPresenceConfidence??.5),t.cannedGesturesClassifierOptions){var e=new Kr,n=e,i=cu(t.cannedGesturesClassifierOptions,(r=Qe(this.h,Kr,3))==null?void 0:r.l());Pe(n,0,2,i),Pe(this.h,0,3,e)}else t.cannedGesturesClassifierOptions===void 0&&((s=Qe(this.h,Kr,3))==null||s.g());return t.customGesturesClassifierOptions?(Pe(n=e=new Kr,0,2,i=cu(t.customGesturesClassifierOptions,(a=Qe(this.h,Kr,4))==null?void 0:a.l())),Pe(this.h,0,4,e)):t.customGesturesClassifierOptions===void 0&&((o=Qe(this.h,Kr,4))==null||o.g()),this.l(t)}Ha(t,e){return Dd(this),$n(this,t,e),Ud(this)}Ia(t,e,n){return Dd(this),_i(this,t,n,e),Ud(this)}m(){var t=new Ln;Et(t,"image_in"),Et(t,"norm_rect"),et(t,"hand_gestures"),et(t,"hand_landmarks"),et(t,"world_hand_landmarks"),et(t,"handedness");const e=new Pn;mi(e,NM,this.j);const n=new mn;Rn(n,2,"mediapipe.tasks.vision.gesture_recognizer.GestureRecognizerGraph"),_t(n,"IMAGE:image_in"),_t(n,"NORM_RECT:norm_rect"),qe(n,"HAND_GESTURES:hand_gestures"),qe(n,"LANDMARKS:hand_landmarks"),qe(n,"WORLD_LANDMARKS:world_hand_landmarks"),qe(n,"HANDEDNESS:handedness"),n.o(e),zn(t,n),this.g.attachProtoVectorListener("hand_landmarks",(i,r)=>{for(const s of i){i=Ea(s);const a=[];for(const o of Ni(i,$m,1))a.push({x:Ct(o,1)??0,y:Ct(o,2)??0,z:Ct(o,3)??0,visibility:Ct(o,4)??0});this.landmarks.push(a)}pe(this,r)}),this.g.attachEmptyPacketListener("hand_landmarks",i=>{pe(this,i)}),this.g.attachProtoVectorListener("world_hand_landmarks",(i,r)=>{for(const s of i){i=ts(s);const a=[];for(const o of Ni(i,Km,1))a.push({x:Ct(o,1)??0,y:Ct(o,2)??0,z:Ct(o,3)??0,visibility:Ct(o,4)??0});this.worldLandmarks.push(a)}pe(this,r)}),this.g.attachEmptyPacketListener("world_hand_landmarks",i=>{pe(this,i)}),this.g.attachProtoVectorListener("hand_gestures",(i,r)=>{this.gestures.push(...Nd(i,!1)),pe(this,r)}),this.g.attachEmptyPacketListener("hand_gestures",i=>{pe(this,i)}),this.g.attachProtoVectorListener("handedness",(i,r)=>{this.handedness.push(...Nd(i)),pe(this,r)}),this.g.attachEmptyPacketListener("handedness",i=>{pe(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};function Fd(t){return{landmarks:t.landmarks,worldLandmarks:t.worldLandmarks,handednesses:t.handedness,handedness:t.handedness}}xn.prototype.recognizeForVideo=xn.prototype.Ia,xn.prototype.recognize=xn.prototype.Ha,xn.prototype.setOptions=xn.prototype.o,xn.createFromModelPath=function(t,e){return $e(xn,t,{baseOptions:{modelAssetPath:e}})},xn.createFromModelBuffer=function(t,e){return $e(xn,t,{baseOptions:{modelAssetBuffer:e}})},xn.createFromOptions=function(t,e){return $e(xn,t,e)},xn.HAND_CONNECTIONS=Rh;var fn=class extends Cn{constructor(t,e){super(new Kn(t,e),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.handedness=[],Pe(t=this.h=new mh,0,1,e=new At),this.u=new ph,Pe(this.h,0,3,this.u),this.j=new r0,Pe(this.h,0,2,this.j),Fi(this.j,3,1),Re(this.j,2,.5),Re(this.u,2,.5),Re(this.h,4,.5)}get baseOptions(){return Qe(this.h,At,1)}set baseOptions(t){Pe(this.h,0,1,t)}o(t){return"numHands"in t&&Fi(this.j,3,t.numHands??1),"minHandDetectionConfidence"in t&&Re(this.j,2,t.minHandDetectionConfidence??.5),"minTrackingConfidence"in t&&Re(this.h,4,t.minTrackingConfidence??.5),"minHandPresenceConfidence"in t&&Re(this.u,2,t.minHandPresenceConfidence??.5),this.l(t)}F(t,e){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],$n(this,t,e),Fd(this)}G(t,e,n){return this.landmarks=[],this.worldLandmarks=[],this.handedness=[],_i(this,t,n,e),Fd(this)}m(){var t=new Ln;Et(t,"image_in"),Et(t,"norm_rect"),et(t,"hand_landmarks"),et(t,"world_hand_landmarks"),et(t,"handedness");const e=new Pn;mi(e,FM,this.h);const n=new mn;Rn(n,2,"mediapipe.tasks.vision.hand_landmarker.HandLandmarkerGraph"),_t(n,"IMAGE:image_in"),_t(n,"NORM_RECT:norm_rect"),qe(n,"LANDMARKS:hand_landmarks"),qe(n,"WORLD_LANDMARKS:world_hand_landmarks"),qe(n,"HANDEDNESS:handedness"),n.o(e),zn(t,n),this.g.attachProtoVectorListener("hand_landmarks",(i,r)=>{for(const s of i)i=Ea(s),this.landmarks.push(tc(i));pe(this,r)}),this.g.attachEmptyPacketListener("hand_landmarks",i=>{pe(this,i)}),this.g.attachProtoVectorListener("world_hand_landmarks",(i,r)=>{for(const s of i)i=ts(s),this.worldLandmarks.push(Qs(i));pe(this,r)}),this.g.attachEmptyPacketListener("world_hand_landmarks",i=>{pe(this,i)}),this.g.attachProtoVectorListener("handedness",(i,r)=>{var s=this.handedness,a=s.push;const o=[];for(const c of i){i=Qo(c);const l=[];for(const h of i.g())l.push({score:Ct(h,2)??0,index:On(h,1)??0??-1,categoryName:Kt(xt(h,3))??""??"",displayName:Kt(xt(h,4))??""??""});o.push(l)}a.call(s,...o),pe(this,r)}),this.g.attachEmptyPacketListener("handedness",i=>{pe(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};fn.prototype.detectForVideo=fn.prototype.G,fn.prototype.detect=fn.prototype.F,fn.prototype.setOptions=fn.prototype.o,fn.createFromModelPath=function(t,e){return $e(fn,t,{baseOptions:{modelAssetPath:e}})},fn.createFromModelBuffer=function(t,e){return $e(fn,t,{baseOptions:{modelAssetBuffer:e}})},fn.createFromOptions=function(t,e){return $e(fn,t,e)},fn.HAND_CONNECTIONS=Rh;var N0=jn([0,1],[1,2],[2,3],[3,7],[0,4],[4,5],[5,6],[6,8],[9,10],[11,12],[11,13],[13,15],[15,17],[15,19],[15,21],[17,19],[12,14],[14,16],[16,18],[16,20],[16,22],[18,20],[11,23],[12,24],[23,24],[23,25],[24,26],[25,27],[26,28],[27,29],[28,30],[29,31],[30,32],[27,31],[28,32]);function Od(t){t.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]}}function Bd(t){try{if(!t.D)return t.h;t.D(t.h)}finally{ic(t)}}function to(t,e){t=Ea(t),e.push(tc(t))}var mt=class extends Cn{constructor(t,e){super(new Kn(t,e),"input_frames_image",null,!1),this.h={faceLandmarks:[],faceBlendshapes:[],poseLandmarks:[],poseWorldLandmarks:[],poseSegmentationMasks:[],leftHandLandmarks:[],leftHandWorldLandmarks:[],rightHandLandmarks:[],rightHandWorldLandmarks:[]},this.outputPoseSegmentationMasks=this.outputFaceBlendshapes=!1,Pe(t=this.j=new u0,0,1,e=new At),this.I=new ph,Pe(this.j,0,2,this.I),this.W=new OM,Pe(this.j,0,3,this.W),this.u=new ec,Pe(this.j,0,4,this.u),this.O=new t0,Pe(this.j,0,5,this.O),this.A=new c0,Pe(this.j,0,6,this.A),this.M=new l0,Pe(this.j,0,7,this.M),Re(this.u,2,.5),Re(this.u,3,.3),Re(this.O,2,.5),Re(this.A,2,.5),Re(this.A,3,.3),Re(this.M,2,.5),Re(this.I,2,.5)}get baseOptions(){return Qe(this.j,At,1)}set baseOptions(t){Pe(this.j,0,1,t)}o(t){return"minFaceDetectionConfidence"in t&&Re(this.u,2,t.minFaceDetectionConfidence??.5),"minFaceSuppressionThreshold"in t&&Re(this.u,3,t.minFaceSuppressionThreshold??.3),"minFacePresenceConfidence"in t&&Re(this.O,2,t.minFacePresenceConfidence??.5),"outputFaceBlendshapes"in t&&(this.outputFaceBlendshapes=!!t.outputFaceBlendshapes),"minPoseDetectionConfidence"in t&&Re(this.A,2,t.minPoseDetectionConfidence??.5),"minPoseSuppressionThreshold"in t&&Re(this.A,3,t.minPoseSuppressionThreshold??.3),"minPosePresenceConfidence"in t&&Re(this.M,2,t.minPosePresenceConfidence??.5),"outputPoseSegmentationMasks"in t&&(this.outputPoseSegmentationMasks=!!t.outputPoseSegmentationMasks),"minHandLandmarksConfidence"in t&&Re(this.I,2,t.minHandLandmarksConfidence??.5),this.l(t)}F(t,e,n){const i=typeof e!="function"?e:{};return this.D=typeof e=="function"?e:n,Od(this),$n(this,t,i),Bd(this)}G(t,e,n,i){const r=typeof n!="function"?n:{};return this.D=typeof n=="function"?n:i,Od(this),_i(this,t,r,e),Bd(this)}m(){var t=new Ln;Et(t,"input_frames_image"),et(t,"pose_landmarks"),et(t,"pose_world_landmarks"),et(t,"face_landmarks"),et(t,"left_hand_landmarks"),et(t,"left_hand_world_landmarks"),et(t,"right_hand_landmarks"),et(t,"right_hand_world_landmarks");const e=new Pn,n=new cd;Rn(n,1,"type.googleapis.com/mediapipe.tasks.vision.holistic_landmarker.proto.HolisticLandmarkerGraphOptions"),function(r,s){if(s!=null)if(Array.isArray(s))ot(r,2,Vo(s,0,ua));else{if(!(typeof s=="string"||s instanceof ci||Uu(s)))throw Error("invalid value in Any.value field: "+s+" expected a ByteString, a base64 encoded string, a Uint8Array or a jspb array");ji(r,2,Fu(s,!1),Ar())}}(n,this.j.g());const i=new mn;Rn(i,2,"mediapipe.tasks.vision.holistic_landmarker.HolisticLandmarkerGraph"),$u(i,8,cd,n),_t(i,"IMAGE:input_frames_image"),qe(i,"POSE_LANDMARKS:pose_landmarks"),qe(i,"POSE_WORLD_LANDMARKS:pose_world_landmarks"),qe(i,"FACE_LANDMARKS:face_landmarks"),qe(i,"LEFT_HAND_LANDMARKS:left_hand_landmarks"),qe(i,"LEFT_HAND_WORLD_LANDMARKS:left_hand_world_landmarks"),qe(i,"RIGHT_HAND_LANDMARKS:right_hand_landmarks"),qe(i,"RIGHT_HAND_WORLD_LANDMARKS:right_hand_world_landmarks"),i.o(e),zn(t,i),nc(this,t),this.g.attachProtoListener("pose_landmarks",(r,s)=>{to(r,this.h.poseLandmarks),pe(this,s)}),this.g.attachEmptyPacketListener("pose_landmarks",r=>{pe(this,r)}),this.g.attachProtoListener("pose_world_landmarks",(r,s)=>{var a=this.h.poseWorldLandmarks;r=ts(r),a.push(Qs(r)),pe(this,s)}),this.g.attachEmptyPacketListener("pose_world_landmarks",r=>{pe(this,r)}),this.outputPoseSegmentationMasks&&(qe(i,"POSE_SEGMENTATION_MASK:pose_segmentation_mask"),gs(this,"pose_segmentation_mask"),this.g.Z("pose_segmentation_mask",(r,s)=>{this.h.poseSegmentationMasks=[vs(this,r,!0,!this.D)],pe(this,s)}),this.g.attachEmptyPacketListener("pose_segmentation_mask",r=>{this.h.poseSegmentationMasks=[],pe(this,r)})),this.g.attachProtoListener("face_landmarks",(r,s)=>{to(r,this.h.faceLandmarks),pe(this,s)}),this.g.attachEmptyPacketListener("face_landmarks",r=>{pe(this,r)}),this.outputFaceBlendshapes&&(et(t,"extra_blendshapes"),qe(i,"FACE_BLENDSHAPES:extra_blendshapes"),this.g.attachProtoListener("extra_blendshapes",(r,s)=>{var a=this.h.faceBlendshapes;this.outputFaceBlendshapes&&(r=Qo(r),a.push(xh(r.g()??[]))),pe(this,s)}),this.g.attachEmptyPacketListener("extra_blendshapes",r=>{pe(this,r)})),this.g.attachProtoListener("left_hand_landmarks",(r,s)=>{to(r,this.h.leftHandLandmarks),pe(this,s)}),this.g.attachEmptyPacketListener("left_hand_landmarks",r=>{pe(this,r)}),this.g.attachProtoListener("left_hand_world_landmarks",(r,s)=>{var a=this.h.leftHandWorldLandmarks;r=ts(r),a.push(Qs(r)),pe(this,s)}),this.g.attachEmptyPacketListener("left_hand_world_landmarks",r=>{pe(this,r)}),this.g.attachProtoListener("right_hand_landmarks",(r,s)=>{to(r,this.h.rightHandLandmarks),pe(this,s)}),this.g.attachEmptyPacketListener("right_hand_landmarks",r=>{pe(this,r)}),this.g.attachProtoListener("right_hand_world_landmarks",(r,s)=>{var a=this.h.rightHandWorldLandmarks;r=ts(r),a.push(Qs(r)),pe(this,s)}),this.g.attachEmptyPacketListener("right_hand_world_landmarks",r=>{pe(this,r)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};mt.prototype.detectForVideo=mt.prototype.G,mt.prototype.detect=mt.prototype.F,mt.prototype.setOptions=mt.prototype.o,mt.createFromModelPath=function(t,e){return $e(mt,t,{baseOptions:{modelAssetPath:e}})},mt.createFromModelBuffer=function(t,e){return $e(mt,t,{baseOptions:{modelAssetBuffer:e}})},mt.createFromOptions=function(t,e){return $e(mt,t,e)},mt.HAND_CONNECTIONS=Rh,mt.POSE_CONNECTIONS=N0,mt.FACE_LANDMARKS_LIPS=Eh,mt.FACE_LANDMARKS_LEFT_EYE=yh,mt.FACE_LANDMARKS_LEFT_EYEBROW=Th,mt.FACE_LANDMARKS_LEFT_IRIS=L0,mt.FACE_LANDMARKS_RIGHT_EYE=bh,mt.FACE_LANDMARKS_RIGHT_EYEBROW=Ah,mt.FACE_LANDMARKS_RIGHT_IRIS=I0,mt.FACE_LANDMARKS_FACE_OVAL=wh,mt.FACE_LANDMARKS_CONTOURS=D0,mt.FACE_LANDMARKS_TESSELATION=U0;var Un=class extends Cn{constructor(t,e){super(new Kn(t,e),"input_image","norm_rect",!0),this.j={classifications:[]},Pe(t=this.h=new h0,0,1,e=new At)}get baseOptions(){return Qe(this.h,At,1)}set baseOptions(t){Pe(this.h,0,1,t)}o(t){return Pe(this.h,0,2,cu(t,Qe(this.h,fh,2))),this.l(t)}sa(t,e){return this.j={classifications:[]},$n(this,t,e),this.j}ta(t,e,n){return this.j={classifications:[]},_i(this,t,n,e),this.j}m(){var t=new Ln;Et(t,"input_image"),Et(t,"norm_rect"),et(t,"classifications");const e=new Pn;mi(e,BM,this.h);const n=new mn;Rn(n,2,"mediapipe.tasks.vision.image_classifier.ImageClassifierGraph"),_t(n,"IMAGE:input_image"),_t(n,"NORM_RECT:norm_rect"),qe(n,"CLASSIFICATIONS:classifications"),n.o(e),zn(t,n),this.g.attachProtoListener("classifications",(i,r)=>{this.j=WM(AM(i)),pe(this,r)}),this.g.attachEmptyPacketListener("classifications",i=>{pe(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};Un.prototype.classifyForVideo=Un.prototype.ta,Un.prototype.classify=Un.prototype.sa,Un.prototype.setOptions=Un.prototype.o,Un.createFromModelPath=function(t,e){return $e(Un,t,{baseOptions:{modelAssetPath:e}})},Un.createFromModelBuffer=function(t,e){return $e(Un,t,{baseOptions:{modelAssetBuffer:e}})},Un.createFromOptions=function(t,e){return $e(Un,t,e)};var Mn=class extends Cn{constructor(t,e){super(new Kn(t,e),"image_in","norm_rect",!0),this.h=new f0,this.embeddings={embeddings:[]},Pe(t=this.h,0,1,e=new At)}get baseOptions(){return Qe(this.h,At,1)}set baseOptions(t){Pe(this.h,0,1,t)}o(t){var e=this.h,n=Qe(this.h,_d,2);return n=n?n.clone():new _d,t.l2Normalize!==void 0?ot(n,1,la(t.l2Normalize)):"l2Normalize"in t&&ot(n,1),t.quantize!==void 0?ot(n,2,la(t.quantize)):"quantize"in t&&ot(n,2),Pe(e,0,2,n),this.l(t)}za(t,e){return $n(this,t,e),this.embeddings}Aa(t,e,n){return _i(this,t,n,e),this.embeddings}m(){var t=new Ln;Et(t,"image_in"),Et(t,"norm_rect"),et(t,"embeddings_out");const e=new Pn;mi(e,kM,this.h);const n=new mn;Rn(n,2,"mediapipe.tasks.vision.image_embedder.ImageEmbedderGraph"),_t(n,"IMAGE:image_in"),_t(n,"NORM_RECT:norm_rect"),qe(n,"EMBEDDINGS:embeddings_out"),n.o(e),zn(t,n),this.g.attachProtoListener("embeddings_out",(i,r)=>{i=CM(i),this.embeddings=function(s){return{embeddings:Ni(s,RM,1).map(a=>{var l,h;const o={headIndex:On(a,3)??0??-1,headName:Kt(xt(a,4))??""??""};var c=a.v;return lm(c,0|c[ye],gd,Xc(a,1))!==void 0?(a=xr(a=Qe(a,gd,Xc(a,1),void 0),1,si,vr()),o.floatEmbedding=a.slice()):(c=new Uint8Array(0),o.quantizedEmbedding=((h=(l=Qe(a,wM,Xc(a,2),void 0))==null?void 0:l.na())==null?void 0:h.h())??c),o}),timestampMs:x0(xt(s,2,void 0,void 0,_o)??rm)}}(i),pe(this,r)}),this.g.attachEmptyPacketListener("embeddings_out",i=>{pe(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};Mn.cosineSimilarity=function(t,e){if(t.floatEmbedding&&e.floatEmbedding)t=yd(t.floatEmbedding,e.floatEmbedding);else{if(!t.quantizedEmbedding||!e.quantizedEmbedding)throw Error("Cannot compute cosine similarity between quantized and float embeddings.");t=yd(Ed(t.quantizedEmbedding),Ed(e.quantizedEmbedding))}return t},Mn.prototype.embedForVideo=Mn.prototype.Aa,Mn.prototype.embed=Mn.prototype.za,Mn.prototype.setOptions=Mn.prototype.o,Mn.createFromModelPath=function(t,e){return $e(Mn,t,{baseOptions:{modelAssetPath:e}})},Mn.createFromModelBuffer=function(t,e){return $e(Mn,t,{baseOptions:{modelAssetBuffer:e}})},Mn.createFromOptions=function(t,e){return $e(Mn,t,e)};var fu=class{constructor(t,e,n){this.confidenceMasks=t,this.categoryMask=e,this.qualityScores=n}close(){var t,e;(t=this.confidenceMasks)==null||t.forEach(n=>{n.close()}),(e=this.categoryMask)==null||e.close()}};function ZM(t){var n,i;const e=function(r){return Ni(r,mn,1)}(t.ca()).filter(r=>(Kt(xt(r,1))??"").includes("mediapipe.tasks.TensorsToSegmentationCalculator"));if(t.u=[],e.length>1)throw Error("The graph has more than one mediapipe.tasks.TensorsToSegmentationCalculator.");e.length===1&&(((i=(n=Qe(e[0],Pn,7))==null?void 0:n.j())==null?void 0:i.g())??new Map).forEach((r,s)=>{t.u[Number(s)]=Kt(xt(r,1))??""})}function kd(t){t.categoryMask=void 0,t.confidenceMasks=void 0,t.qualityScores=void 0}function zd(t){try{const e=new fu(t.confidenceMasks,t.categoryMask,t.qualityScores);if(!t.j)return e;t.j(e)}finally{ic(t)}}fu.prototype.close=fu.prototype.close;var hn=class extends Cn{constructor(t,e){super(new Kn(t,e),"image_in","norm_rect",!1),this.u=[],this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new vh,this.A=new d0,Pe(this.h,0,3,this.A),Pe(t=this.h,0,1,e=new At)}get baseOptions(){return Qe(this.h,At,1)}set baseOptions(t){Pe(this.h,0,1,t)}o(t){return t.displayNamesLocale!==void 0?ot(this.h,2,xa(t.displayNamesLocale)):"displayNamesLocale"in t&&ot(this.h,2),"outputCategoryMask"in t&&(this.outputCategoryMask=t.outputCategoryMask??!1),"outputConfidenceMasks"in t&&(this.outputConfidenceMasks=t.outputConfidenceMasks??!0),super.l(t)}L(){ZM(this)}segment(t,e,n){const i=typeof e!="function"?e:{};return this.j=typeof e=="function"?e:n,kd(this),$n(this,t,i),zd(this)}La(t,e,n,i){const r=typeof n!="function"?n:{};return this.j=typeof n=="function"?n:i,kd(this),_i(this,t,r,e),zd(this)}Da(){return this.u}m(){var t=new Ln;Et(t,"image_in"),Et(t,"norm_rect");const e=new Pn;mi(e,m0,this.h);const n=new mn;Rn(n,2,"mediapipe.tasks.vision.image_segmenter.ImageSegmenterGraph"),_t(n,"IMAGE:image_in"),_t(n,"NORM_RECT:norm_rect"),n.o(e),zn(t,n),nc(this,t),this.outputConfidenceMasks&&(et(t,"confidence_masks"),qe(n,"CONFIDENCE_MASKS:confidence_masks"),gs(this,"confidence_masks"),this.g.aa("confidence_masks",(i,r)=>{this.confidenceMasks=i.map(s=>vs(this,s,!0,!this.j)),pe(this,r)}),this.g.attachEmptyPacketListener("confidence_masks",i=>{this.confidenceMasks=[],pe(this,i)})),this.outputCategoryMask&&(et(t,"category_mask"),qe(n,"CATEGORY_MASK:category_mask"),gs(this,"category_mask"),this.g.Z("category_mask",(i,r)=>{this.categoryMask=vs(this,i,!1,!this.j),pe(this,r)}),this.g.attachEmptyPacketListener("category_mask",i=>{this.categoryMask=void 0,pe(this,i)})),et(t,"quality_scores"),qe(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",(i,r)=>{this.qualityScores=i,pe(this,r)}),this.g.attachEmptyPacketListener("quality_scores",i=>{this.categoryMask=void 0,pe(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};hn.prototype.getLabels=hn.prototype.Da,hn.prototype.segmentForVideo=hn.prototype.La,hn.prototype.segment=hn.prototype.segment,hn.prototype.setOptions=hn.prototype.o,hn.createFromModelPath=function(t,e){return $e(hn,t,{baseOptions:{modelAssetPath:e}})},hn.createFromModelBuffer=function(t,e){return $e(hn,t,{baseOptions:{modelAssetBuffer:e}})},hn.createFromOptions=function(t,e){return $e(hn,t,e)};var du=class{constructor(t,e,n){this.confidenceMasks=t,this.categoryMask=e,this.qualityScores=n}close(){var t,e;(t=this.confidenceMasks)==null||t.forEach(n=>{n.close()}),(e=this.categoryMask)==null||e.close()}};du.prototype.close=du.prototype.close;var ti=class extends Cn{constructor(t,e){super(new Kn(t,e),"image_in","norm_rect_in",!1),this.outputCategoryMask=!1,this.outputConfidenceMasks=!0,this.h=new vh,this.u=new d0,Pe(this.h,0,3,this.u),Pe(t=this.h,0,1,e=new At)}get baseOptions(){return Qe(this.h,At,1)}set baseOptions(t){Pe(this.h,0,1,t)}o(t){return"outputCategoryMask"in t&&(this.outputCategoryMask=t.outputCategoryMask??!1),"outputConfidenceMasks"in t&&(this.outputConfidenceMasks=t.outputConfidenceMasks??!0),super.l(t)}segment(t,e,n,i){const r=typeof n!="function"?n:{};if(this.j=typeof n=="function"?n:i,this.qualityScores=this.categoryMask=this.confidenceMasks=void 0,n=this.C+1,i=new g0,e.keypoint&&e.scribble)throw Error("Cannot provide both keypoint and scribble.");if(e.keypoint){var s=new Kc;ji(s,3,la(!0),!1),ji(s,1,Ks(e.keypoint.x),0),ji(s,2,Ks(e.keypoint.y),0),Zs(i,1,ou,s)}else{if(!e.scribble)throw Error("Must provide either a keypoint or a scribble.");{const o=new VM;for(s of e.scribble)ji(e=new Kc,3,la(!0),!1),ji(e,1,Ks(s.x),0),ji(e,2,Ks(s.y),0),$u(o,1,Kc,e);Zs(i,2,ou,o)}}this.g.addProtoToStream(i.g(),"mediapipe.tasks.vision.interactive_segmenter.proto.RegionOfInterest","roi_in",n),$n(this,t,r);e:{try{const o=new du(this.confidenceMasks,this.categoryMask,this.qualityScores);if(!this.j){var a=o;break e}this.j(o)}finally{ic(this)}a=void 0}return a}m(){var t=new Ln;Et(t,"image_in"),Et(t,"roi_in"),Et(t,"norm_rect_in");const e=new Pn;mi(e,m0,this.h);const n=new mn;Rn(n,2,"mediapipe.tasks.vision.interactive_segmenter.InteractiveSegmenterGraphV2"),_t(n,"IMAGE:image_in"),_t(n,"ROI:roi_in"),_t(n,"NORM_RECT:norm_rect_in"),n.o(e),zn(t,n),nc(this,t),this.outputConfidenceMasks&&(et(t,"confidence_masks"),qe(n,"CONFIDENCE_MASKS:confidence_masks"),gs(this,"confidence_masks"),this.g.aa("confidence_masks",(i,r)=>{this.confidenceMasks=i.map(s=>vs(this,s,!0,!this.j)),pe(this,r)}),this.g.attachEmptyPacketListener("confidence_masks",i=>{this.confidenceMasks=[],pe(this,i)})),this.outputCategoryMask&&(et(t,"category_mask"),qe(n,"CATEGORY_MASK:category_mask"),gs(this,"category_mask"),this.g.Z("category_mask",(i,r)=>{this.categoryMask=vs(this,i,!1,!this.j),pe(this,r)}),this.g.attachEmptyPacketListener("category_mask",i=>{this.categoryMask=void 0,pe(this,i)})),et(t,"quality_scores"),qe(n,"QUALITY_SCORES:quality_scores"),this.g.attachFloatVectorListener("quality_scores",(i,r)=>{this.qualityScores=i,pe(this,r)}),this.g.attachEmptyPacketListener("quality_scores",i=>{this.categoryMask=void 0,pe(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};ti.prototype.segment=ti.prototype.segment,ti.prototype.setOptions=ti.prototype.o,ti.createFromModelPath=function(t,e){return $e(ti,t,{baseOptions:{modelAssetPath:e}})},ti.createFromModelBuffer=function(t,e){return $e(ti,t,{baseOptions:{modelAssetBuffer:e}})},ti.createFromOptions=function(t,e){return $e(ti,t,e)};var Nn=class extends Cn{constructor(t,e){super(new Kn(t,e),"input_frame_gpu","norm_rect",!1),this.j={detections:[]},Pe(t=this.h=new _0,0,1,e=new At)}get baseOptions(){return Qe(this.h,At,1)}set baseOptions(t){Pe(this.h,0,1,t)}o(t){return t.displayNamesLocale!==void 0?ot(this.h,2,xa(t.displayNamesLocale)):"displayNamesLocale"in t&&ot(this.h,2),t.maxResults!==void 0?Fi(this.h,3,t.maxResults):"maxResults"in t&&ot(this.h,3),t.scoreThreshold!==void 0?Re(this.h,4,t.scoreThreshold):"scoreThreshold"in t&&ot(this.h,4),t.categoryAllowlist!==void 0?xo(this.h,5,t.categoryAllowlist):"categoryAllowlist"in t&&ot(this.h,5),t.categoryDenylist!==void 0?xo(this.h,6,t.categoryDenylist):"categoryDenylist"in t&&ot(this.h,6),this.l(t)}F(t,e){return this.j={detections:[]},$n(this,t,e),this.j}G(t,e,n){return this.j={detections:[]},_i(this,t,n,e),this.j}m(){var t=new Ln;Et(t,"input_frame_gpu"),Et(t,"norm_rect"),et(t,"detections");const e=new Pn;mi(e,GM,this.h);const n=new mn;Rn(n,2,"mediapipe.tasks.vision.ObjectDetectorGraph"),_t(n,"IMAGE:input_frame_gpu"),_t(n,"NORM_RECT:norm_rect"),qe(n,"DETECTIONS:detections"),n.o(e),zn(t,n),this.g.attachProtoVectorListener("detections",(i,r)=>{for(const s of i)i=jm(s),this.j.detections.push(M0(i));pe(this,r)}),this.g.attachEmptyPacketListener("detections",i=>{pe(this,i)}),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};Nn.prototype.detectForVideo=Nn.prototype.G,Nn.prototype.detect=Nn.prototype.F,Nn.prototype.setOptions=Nn.prototype.o,Nn.createFromModelPath=async function(t,e){return $e(Nn,t,{baseOptions:{modelAssetPath:e}})},Nn.createFromModelBuffer=function(t,e){return $e(Nn,t,{baseOptions:{modelAssetBuffer:e}})},Nn.createFromOptions=function(t,e){return $e(Nn,t,e)};var pu=class{constructor(t,e,n){this.landmarks=t,this.worldLandmarks=e,this.segmentationMasks=n}close(){var t;(t=this.segmentationMasks)==null||t.forEach(e=>{e.close()})}};function Vd(t){t.landmarks=[],t.worldLandmarks=[],t.segmentationMasks=void 0}function Gd(t){try{const e=new pu(t.landmarks,t.worldLandmarks,t.segmentationMasks);if(!t.u)return e;t.u(e)}finally{ic(t)}}pu.prototype.close=pu.prototype.close;var Sn=class extends Cn{constructor(t,e){super(new Kn(t,e),"image_in","norm_rect",!1),this.landmarks=[],this.worldLandmarks=[],this.outputSegmentationMasks=!1,Pe(t=this.h=new v0,0,1,e=new At),this.A=new l0,Pe(this.h,0,3,this.A),this.j=new c0,Pe(this.h,0,2,this.j),Fi(this.j,4,1),Re(this.j,2,.5),Re(this.A,2,.5),Re(this.h,4,.5)}get baseOptions(){return Qe(this.h,At,1)}set baseOptions(t){Pe(this.h,0,1,t)}o(t){return"numPoses"in t&&Fi(this.j,4,t.numPoses??1),"minPoseDetectionConfidence"in t&&Re(this.j,2,t.minPoseDetectionConfidence??.5),"minTrackingConfidence"in t&&Re(this.h,4,t.minTrackingConfidence??.5),"minPosePresenceConfidence"in t&&Re(this.A,2,t.minPosePresenceConfidence??.5),"outputSegmentationMasks"in t&&(this.outputSegmentationMasks=t.outputSegmentationMasks??!1),this.l(t)}F(t,e,n){const i=typeof e!="function"?e:{};return this.u=typeof e=="function"?e:n,Vd(this),$n(this,t,i),Gd(this)}G(t,e,n,i){const r=typeof n!="function"?n:{};return this.u=typeof n=="function"?n:i,Vd(this),_i(this,t,r,e),Gd(this)}m(){var t=new Ln;Et(t,"image_in"),Et(t,"norm_rect"),et(t,"normalized_landmarks"),et(t,"world_landmarks"),et(t,"segmentation_masks");const e=new Pn;mi(e,HM,this.h);const n=new mn;Rn(n,2,"mediapipe.tasks.vision.pose_landmarker.PoseLandmarkerGraph"),_t(n,"IMAGE:image_in"),_t(n,"NORM_RECT:norm_rect"),qe(n,"NORM_LANDMARKS:normalized_landmarks"),qe(n,"WORLD_LANDMARKS:world_landmarks"),n.o(e),zn(t,n),nc(this,t),this.g.attachProtoVectorListener("normalized_landmarks",(i,r)=>{this.landmarks=[];for(const s of i)i=Ea(s),this.landmarks.push(tc(i));pe(this,r)}),this.g.attachEmptyPacketListener("normalized_landmarks",i=>{this.landmarks=[],pe(this,i)}),this.g.attachProtoVectorListener("world_landmarks",(i,r)=>{this.worldLandmarks=[];for(const s of i)i=ts(s),this.worldLandmarks.push(Qs(i));pe(this,r)}),this.g.attachEmptyPacketListener("world_landmarks",i=>{this.worldLandmarks=[],pe(this,i)}),this.outputSegmentationMasks&&(qe(n,"SEGMENTATION_MASK:segmentation_masks"),gs(this,"segmentation_masks"),this.g.aa("segmentation_masks",(i,r)=>{this.segmentationMasks=i.map(s=>vs(this,s,!0,!this.u)),pe(this,r)}),this.g.attachEmptyPacketListener("segmentation_masks",i=>{this.segmentationMasks=[],pe(this,i)})),t=t.g(),this.setGraph(new Uint8Array(t),!0)}};Sn.prototype.detectForVideo=Sn.prototype.G,Sn.prototype.detect=Sn.prototype.F,Sn.prototype.setOptions=Sn.prototype.o,Sn.createFromModelPath=function(t,e){return $e(Sn,t,{baseOptions:{modelAssetPath:e}})},Sn.createFromModelBuffer=function(t,e){return $e(Sn,t,{baseOptions:{modelAssetBuffer:e}})},Sn.createFromOptions=function(t,e){return $e(Sn,t,e)},Sn.POSE_CONNECTIONS=N0;function JM(t,e){return Math.sqrt((t.x-e.x)**2+(t.y-e.y)**2)}function Hd(t,e,n){return t+n*(e-t)}const bi={THUMB_TIP:4,INDEX_MCP:5,INDEX_TIP:8,MIDDLE_MCP:9,MIDDLE_TIP:12,RING_MCP:13,RING_TIP:16,PINKY_MCP:17,PINKY_TIP:20},QM="https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.14/wasm",eS="https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task";class tS{constructor(e=QM,n=.06){sn(this,"landmarker",null);this.wasmPath=e,this.clickThreshold=n}async init(){const e=await $r.forVisionTasks(this.wasmPath);this.landmarker=await fn.createFromOptions(e,{baseOptions:{modelAssetPath:eS,delegate:"GPU"},numHands:1,runningMode:"VIDEO"})}detect(e,n){if(!this.landmarker)return null;const{landmarks:i}=this.landmarker.detectForVideo(e,n);return!i||i.length===0?null:this.analyze(i[0])}analyze(e){const n=e[bi.THUMB_TIP],i=e[bi.INDEX_TIP],r=e[bi.INDEX_MCP],s=e[bi.MIDDLE_TIP],a=e[bi.MIDDLE_MCP],o=e[bi.RING_TIP],c=e[bi.RING_MCP],l=e[bi.PINKY_TIP],h=e[bi.PINKY_MCP],f=JM(n,s),u=f>this.clickThreshold*2.5,m=i.y<r.y,_=s.y<a.y,S=o.y<c.y,p=l.y<h.y,d=!m&&!_&&!S&&!p,x=m&&_&&S&&p;let y;return f<this.clickThreshold?y="click":d?y="fist":x&&u?y="open-palm":m?y="point":y="open",{gesture:y,clickPinchDistance:f,indexTip:{x:i.x,y:i.y}}}destroy(){var e;(e=this.landmarker)==null||e.close(),this.landmarker=null}}const nS=.09,iS=600,Wd=12;class rS extends p3{constructor(n={}){super();sn(this,"video");sn(this,"detector");sn(this,"rafId",null);sn(this,"stream",null);sn(this,"isClicking",!1);sn(this,"lastClickMs",0);sn(this,"smoothX",.5);sn(this,"smoothY",.5);sn(this,"threshold");sn(this,"smoothing");sn(this,"flipHorizontal");sn(this,"ownedVideo");this.threshold=n.threshold??.05,this.smoothing=n.smoothing??.6,this.flipHorizontal=n.flipHorizontal??!0,n.video?(this.video=n.video,this.ownedVideo=!1):(this.video=this.createHiddenVideo(),this.ownedVideo=!0),this.detector=new tS(n.wasmPath,this.threshold)}async start(){await this.detector.init(),this.stream=await navigator.mediaDevices.getUserMedia({video:!0}),this.video.srcObject=this.stream,await new Promise(n=>{this.video.onloadedmetadata=()=>{this.video.play(),n()}}),this.loop()}stop(){var n;this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),(n=this.stream)==null||n.getTracks().forEach(i=>i.stop()),this.stream=null,this.detector.destroy(),this.ownedVideo&&this.video.remove(),this.removeAllListeners()}createHiddenVideo(){const n=document.createElement("video");return n.style.cssText="position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;",document.body.appendChild(n),n}loop(){this.rafId=requestAnimationFrame(()=>{this.tick(),this.rafId!==null&&this.loop()})}tick(){const n=performance.now(),i=this.detector.detect(this.video,n);if(!i)return;const r=this.flipHorizontal?1-i.indexTip.x:i.indexTip.x,s=i.indexTip.y;this.smoothX=Hd(this.smoothX,r,1-this.smoothing),this.smoothY=Hd(this.smoothY,s,1-this.smoothing);const a=Math.round(this.smoothX*window.innerWidth),o=Math.round(this.smoothY*window.innerHeight),c={x:this.smoothX,y:this.smoothY,screenX:a,screenY:o};if(this.emit("move",c),i.gesture==="click"){if(!this.isClicking){this.isClicking=!0;const l=Date.now();l-this.lastClickMs>iS&&(this.lastClickMs=l,this.emit("click",c))}}else i.clickPinchDistance>nS&&(this.isClicking=!1);this.isClicking||(i.gesture==="fist"?this.emit("scroll",{deltaY:Wd}):i.gesture==="open-palm"&&this.emit("scroll",{deltaY:-Wd}))}}const Fs=new d3({antialias:!0});Fs.setSize(window.innerWidth,window.innerHeight);Fs.setPixelRatio(Math.min(window.devicePixelRatio,2));Fs.setClearColor(460559);document.getElementById("canvas-container").appendChild(Fs.domElement);const Bn=new $g;Bn.fog=new wu(460559,.016);const ha=new En(55,window.innerWidth/window.innerHeight,.1,500);ha.position.z=6;const F0=new Lu(1.5,1),$s=new f_({color:5583837,emissive:1574984,specular:16777215,shininess:160,transparent:!0,opacity:.72}),ns=new pn(F0,$s);Bn.add(ns);const sS=new Es({color:10325503,wireframe:!0,transparent:!0,opacity:.32});ns.add(new pn(F0,sS));const To=new Es({color:6702318,transparent:!0,opacity:.28}),aS=new pn(new Iu(.85,16,16),To);ns.add(aS);function Ch(t,e,n,i,r,s,a){const o=new pn(new Io(t,e,6,120),new Es({color:n,transparent:!0,opacity:i}));return o.rotation.set(r,s,a),Bn.add(o),o}const oS=Ch(2.4,.012,8153847,.7,Math.PI/3,0,0),Xd=Ch(3.1,.008,5164484,.5,-Math.PI/5,0,Math.PI/6),qd=Ch(3.8,.005,16739229,.35,Math.PI/7,Math.PI/4,-Math.PI/3),Oi=280,cS=new Float32Array(Oi*3),uo=new Float32Array(Oi*3),ea=new Float32Array(Oi),ta=new Float32Array(Oi),na=new Float32Array(Oi),O0=new Float32Array(Oi),Yd=[new We(8153847),new We(5164484),new We(16739229),new We(16765286)];for(let t=0;t<Oi;t++){ea[t]=2.3+Math.random()*2.6,ta[t]=Math.random()*Math.PI*2,na[t]=Math.acos(2*Math.random()-1),O0[t]=(Math.random()-.5)*.009;const e=Yd[t%Yd.length];uo[t*3]=e.r,uo[t*3+1]=e.g,uo[t*3+2]=e.b}const rc=new ln;rc.setAttribute("position",new Tn(cS,3));rc.setAttribute("color",new Tn(uo,3));const B0=new Sp(rc,new Cu({size:.065,vertexColors:!0,transparent:!0,opacity:.9,sizeAttenuation:!0}));Bn.add(B0);const k0=1800,ho=new Float32Array(k0*3);for(let t=0;t<k0;t++)ho[t*3]=(Math.random()-.5)*300,ho[t*3+1]=(Math.random()-.5)*300,ho[t*3+2]=(Math.random()-.5)*300;const z0=new ln;z0.setAttribute("position",new Tn(ho,3));const V0=new Sp(z0,new Cu({color:16777215,size:.14,transparent:!0,opacity:.45,sizeAttenuation:!0}));Bn.add(V0);Bn.add(new __(1710654,2.5));const bo=new Du(8153847,5,14);bo.position.set(4,3,4);Bn.add(bo);const Ao=new Du(5164484,3,14);Ao.position.set(-4,-2,-3);Bn.add(Ao);const wo=new Du(16739229,2,12);wo.position.set(0,5,-4);Bn.add(wo);function Zc(){const t=new Es({color:10325503,transparent:!0,opacity:.75,wireframe:!0}),e=new pn(new Io(.3,.018,8,64),t);e.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,0),Bn.add(e);let n=.3,i=.75;function r(){n+=.18,i-=.045,e.scale.setScalar(n),t.opacity=Math.max(0,i),i>0?requestAnimationFrame(r):Bn.remove(e)}r()}let G0=0,H0=0,Jc=0,Qc=0,fo=6,el=6,tl=1,mu=1,jd=0,fr=0;const Ro=document.getElementById("cursor"),Kd=document.getElementById("flash"),nl=document.getElementById("s-status"),lS=document.getElementById("s-pos"),uS=document.getElementById("s-clicks"),hS=document.getElementById("s-zoom"),il=document.getElementById("log");function Ph(t,e){const n=document.createElement("div");n.className="log-item"+(t?` ev-${t}`:"");const i=new Date().toLocaleTimeString("ko-KR",{hour12:!1});for(n.textContent=`[${i}] ${e}`,il.appendChild(n);il.children.length>9;)il.children[1].remove()}function fS(t,e){jd++,uS.textContent=jd,Ph("click",`클릭  ${Math.round(t*100)}% · ${Math.round(e*100)}%`),mu=1.38,setTimeout(()=>{mu=1},220),$s.emissive.setHex(6702335),$s.color.setHex(12307711),To.opacity=.65,setTimeout(()=>{$s.emissive.setHex(1574984),$s.color.setHex(5583837),To.opacity=.28},280),Kd.classList.add("on"),setTimeout(()=>Kd.classList.remove("on"),60),Ro.classList.add("clicking"),setTimeout(()=>Ro.classList.remove("clicking"),200),Zc(),setTimeout(Zc,80),setTimeout(Zc,180);for(let n=0;n<Oi;n++)ea[n]=2.3+Math.random()*4.8,na[n]=Math.random()*Math.PI,ta[n]=Math.random()*Math.PI*2}const sc=new rS({smoothing:.65});sc.on("move",t=>{Ro.style.left=`${t.screenX}px`,Ro.style.top=`${t.screenY}px`,lS.textContent=`${t.screenX} · ${t.screenY}`,H0=(t.x-.5)*Math.PI*1.6,G0=(t.y-.5)*Math.PI*.8,bo.position.x=(t.x-.5)*11,bo.position.y=-(t.y-.5)*11});sc.on("click",t=>fS(t.x,t.y));sc.on("scroll",t=>{fo=Math.max(2.5,Math.min(13,fo+t.deltaY*.0035));const e=Math.round(6/fo*100);hS.textContent=`${e}%`,Ph("scroll",`줌 ${t.deltaY>0?"✊ In":"🖐 Out"}  ${e}%`)});function W0(){requestAnimationFrame(W0),fr+=.01,Jc+=(G0-Jc)*.04,Qc+=(H0-Qc)*.04,ns.rotation.x=Jc,ns.rotation.y=Qc+fr*.14,tl+=(mu-tl)*.11,ns.scale.setScalar(tl),To.opacity=.28+Math.sin(fr*1.4)*.06,el+=(fo-el)*.055,ha.position.z=el,oS.rotation.z+=.003,Xd.rotation.z-=.002,Xd.rotation.x-=.001,qd.rotation.y+=.0015,qd.rotation.z+=.001,Ao.position.x=Math.sin(fr*.38)*5,Ao.position.y=Math.cos(fr*.55)*4,wo.position.x=Math.cos(fr*.29)*5,wo.position.z=Math.sin(fr*.47)*5;const t=rc.attributes.position;for(let e=0;e<Oi;e++)ta[e]+=O0[e],t.setXYZ(e,ea[e]*Math.sin(na[e])*Math.cos(ta[e]),ea[e]*Math.sin(na[e])*Math.sin(ta[e]),ea[e]*Math.cos(na[e]));t.needsUpdate=!0,B0.rotation.y+=8e-4,V0.rotation.y+=8e-5,Fs.render(Bn,ha)}W0();const Xs=document.getElementById("start-btn"),$d=document.getElementById("overlay"),Zd=document.getElementById("load-msg");Xs.addEventListener("click",async()=>{Xs.disabled=!0,Xs.textContent="초기화 중...",Zd.textContent="MediaPipe 모델 로딩 중 (3~5초)",nl.textContent="초기화중";try{await sc.start(),nl.textContent="감지중",$d.classList.add("fade-out"),setTimeout(()=>{$d.style.display="none"},650),Ph("","핸드 트래킹 시작")}catch(t){nl.textContent="오류",Zd.textContent=`오류: ${t.message}`,Xs.disabled=!1,Xs.textContent="다시 시도",console.error(t)}});window.addEventListener("resize",()=>{ha.aspect=window.innerWidth/window.innerHeight,ha.updateProjectionMatrix(),Fs.setSize(window.innerWidth,window.innerHeight)});
