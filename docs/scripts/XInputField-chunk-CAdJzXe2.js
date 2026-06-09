import{Dt as t,K as e,Ot as i,V as s,Y as r,_ as o,g as n,h as a,nt as l,q as h,v as d,w as u,wt as c}from"./vue.esm-bundler-chunk-D9D9G-Dr.js";var p=globalThis,m=p.ShadowRoot&&(void 0===p.ShadyCSS||p.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,g=Symbol(),b=new WeakMap,f=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==g)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(m&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=b.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&b.set(e,t))}return t}toString(){return this.cssText}},_=m?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new f("string"==typeof t?t:t+"",void 0,g))(e)})(t):t,{is:$,defineProperty:v,getOwnPropertyDescriptor:y,getOwnPropertyNames:A,getOwnPropertySymbols:k,getPrototypeOf:w}=Object,S=globalThis,E=S.trustedTypes,C=E?E.emptyScript:"",x=S.reactiveElementPolyfillSupport,O=(t,e)=>t,P={toAttribute(t,e){switch(e){case Boolean:t=t?C:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},R=(t,e)=>!$(t,e),T={attribute:!0,type:String,converter:P,reflect:!1,useDefault:!1,hasChanged:R};Symbol.metadata??=Symbol("metadata"),S.litPropertyMetadata??=new WeakMap;var M=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=T){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&v(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=y(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??T}static _$Ei(){if(this.hasOwnProperty(O("elementProperties")))return;const t=w(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(O("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(O("properties"))){const t=this.properties,e=[...A(t),...k(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const t=this._$Eu(e,i);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(_(t))}else void 0!==t&&e.push(_(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(m)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of e){const e=document.createElement("style"),s=p.litNonce;void 0!==s&&e.setAttribute("nonce",s),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:P).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:P;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??R)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};M.elementStyles=[],M.shadowRootOptions={mode:"open"},M[O("elementProperties")]=new Map,M[O("finalized")]=new Map,x?.({ReactiveElement:M}),(S.reactiveElementVersions??=[]).push("2.1.2");var N=globalThis,U=t=>t,H=N.trustedTypes,B=H?H.createPolicy("lit-html",{createHTML:t=>t}):void 0,D="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,j="?"+z,I=`<${j}>`,L=document,q=()=>L.createComment(""),V=t=>null===t||"object"!=typeof t&&"function"!=typeof t,W=Array.isArray,G=t=>W(t)||"function"==typeof t?.[Symbol.iterator],F="[ \t\n\f\r]",X=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,K=/-->/g,Z=/>/g,J=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Y=/'/g,Q=/"/g,tt=/^(?:script|style|textarea|title)$/i,et=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),it=et(1),st=(et(2),et(3),Symbol.for("lit-noChange")),rt=Symbol.for("lit-nothing"),ot=new WeakMap,nt=L.createTreeWalker(L,129);function at(t,e){if(!W(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==B?B.createHTML(e):e}var lt=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=X;for(let a=0;a<i;a++){const e=t[a];let i,l,h=-1,d=0;for(;d<e.length&&(n.lastIndex=d,l=n.exec(e),null!==l);)d=n.lastIndex,n===X?"!--"===l[1]?n=K:void 0!==l[1]?n=Z:void 0!==l[2]?(tt.test(l[2])&&(r=RegExp("</"+l[2],"g")),n=J):void 0!==l[3]&&(n=J):n===J?">"===l[0]?(n=r??X,h=-1):void 0===l[1]?h=-2:(h=n.lastIndex-l[2].length,i=l[1],n=void 0===l[3]?J:'"'===l[3]?Q:Y):n===Q||n===Y?n=J:n===K||n===Z?n=X:(n=J,r=void 0);const u=n===J&&t[a+1].startsWith("/>")?" ":"";o+=n===X?e+I:h>=0?(s.push(i),e.slice(0,h)+D+e.slice(h)+z+u):e+z+(-2===h?a:u)}return[at(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]},ht=class t{constructor({strings:e,_$litType$:i},s){let r;this.parts=[];let o=0,n=0;const a=e.length-1,l=this.parts,[h,d]=lt(e,i);if(this.el=t.createElement(h,s),nt.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(r=nt.nextNode())&&l.length<a;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(D)){const e=d[n++],i=r.getAttribute(t).split(z),s=/([.?@])?(.*)/.exec(e);l.push({type:1,index:o,name:s[2],strings:i,ctor:"."===s[1]?mt:"?"===s[1]?gt:"@"===s[1]?bt:pt}),r.removeAttribute(t)}else t.startsWith(z)&&(l.push({type:6,index:o}),r.removeAttribute(t));if(tt.test(r.tagName)){const t=r.textContent.split(z),e=t.length-1;if(e>0){r.textContent=H?H.emptyScript:"";for(let i=0;i<e;i++)r.append(t[i],q()),nt.nextNode(),l.push({type:2,index:++o});r.append(t[e],q())}}}else if(8===r.nodeType)if(r.data===j)l.push({type:2,index:o});else{let t=-1;for(;-1!==(t=r.data.indexOf(z,t+1));)l.push({type:7,index:o}),t+=z.length-1}o++}}static createElement(t,e){const i=L.createElement("template");return i.innerHTML=t,i}};function dt(t,e,i=t,s){if(e===st)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=V(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=dt(t,r._$AS(t,e.values),r,s)),e}var ut=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??L).importNode(e,!0);nt.currentNode=s;let r=nt.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new ct(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new ft(r,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(r=nt.nextNode(),o++)}return nt.currentNode=L,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},ct=class t{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=rt,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=dt(this,t,e),V(t)?t===rt||null==t||""===t?(this._$AH!==rt&&this._$AR(),this._$AH=rt):t!==this._$AH&&t!==st&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):G(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==rt&&V(this._$AH)?this._$AA.nextSibling.data=t:this.T(L.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=ht.createElement(at(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new ut(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=ot.get(t.strings);return void 0===e&&ot.set(t.strings,e=new ht(t)),e}k(e){W(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,r=0;for(const o of e)r===i.length?i.push(s=new t(this.O(q()),this.O(q()),this,this.options)):s=i[r],s._$AI(o),r++;r<i.length&&(this._$AR(s&&s._$AB.nextSibling,r),i.length=r)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=U(t).nextSibling;U(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}},pt=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=rt,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=rt}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=dt(this,t,e,0),o=!V(t)||t!==this._$AH&&t!==st,o&&(this._$AH=t);else{const s=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=dt(this,s[i+n],e,n),a===st&&(a=this._$AH[n]),o||=!V(a)||a!==this._$AH[n],a===rt?t=rt:t!==rt&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===rt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},mt=class extends pt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===rt?void 0:t}},gt=class extends pt{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==rt)}},bt=class extends pt{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=dt(this,t,e,0)??rt)===st)return;const i=this._$AH,s=t===rt&&i!==rt||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==rt&&(i===rt||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ft=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){dt(this,t)}},_t=N.litHtmlPolyfillSupport;_t?.(ht,ct),(N.litHtmlVersions??=[]).push("3.3.3");var $t=globalThis,vt=class extends M{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new ct(e.insertBefore(q(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return st}};vt._$litElement$=!0,vt.finalized=!0,$t.litElementHydrateSupport?.({LitElement:vt});var yt=$t.litElementPolyfillSupport;yt?.({LitElement:vt}),($t.litElementVersions??=[]).push("4.2.2");var At={attribute:!0,type:String,converter:P,reflect:!1,hasChanged:R},kt=(t=At,e,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function wt(t){return(e,i)=>"object"==typeof i?kt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function St(t){return wt({...t,state:!0,attribute:!1})}var Et=1,Ct=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}},xt="important",Ot=" !"+xt,Pt=(t=>(...e)=>({_$litDirective$:t,values:e}))(class extends Ct{constructor(t){if(super(t),t.type!==Et||"style"!==t.name||t.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(t){return Object.keys(t).reduce((e,i)=>{const s=t[i];return null==s?e:e+`${i=i.includes("-")?i:i.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(t,[e]){const{style:i}=t.element;if(void 0===this.ft)return this.ft=new Set(Object.keys(e)),this.render(e);for(const s of this.ft)e[s]??(this.ft.delete(s),s.includes("-")?i.removeProperty(s):i[s]=null);for(const s in e){const t=e[s];if(null!=t){this.ft.add(s);const e="string"==typeof t&&t.endsWith(Ot);s.includes("-")||e?i.setProperty(s,e?t.slice(0,-11):t,e?xt:""):i[s]=t}}return st}}),Rt=Object.defineProperty,Tt=Object.getOwnPropertyDescriptor,Mt=(t,e,i,s)=>{for(var r,o=s>1?void 0:s?Tt(e,i):e,n=t.length-1;n>=0;n--)(r=t[n])&&(o=(s?r(e,i,o):r(o))||o);return s&&o&&Rt(e,i,o),o},Nt=new Set(["IMG","SVG","VIDEO","CANVAS","IFRAME","INPUT","TEXTAREA","BUTTON","HR"]),Ut=new Set(["BR","WBR"]);function Ht(t,e){let i=[];return function t(s){let r=s.getBoundingClientRect(),o=Number(s.getAttribute("data-shimmer-width"))||0,n=Number(s.getAttribute("data-shimmer-height"))||0,a=o>0||n>0,l=o||r.width,h=n||r.height;if((0!==l&&0!==h||a)&&!s.hasAttribute("data-shimmer-ignore")){if(s.hasAttribute("data-shimmer-no-children")||function(t){if(Nt.has(t.tagName))return!0;for(let e of t.children)if(!Ut.has(e.tagName))return!1;return!0}(s)){let t=getComputedStyle(s).borderRadius;if(("TD"===s.tagName||"TH"===s.tagName)&&function(t){for(let e of t.childNodes)if(e.nodeType===Node.TEXT_NODE&&e.textContent?.trim())return!0;return!1}(s)&&!o){let o=document.createElement("span");o.style.visibility="hidden",o.style.position="absolute",o.textContent=s.textContent,s.appendChild(o);let n=o.getBoundingClientRect();return s.removeChild(o),void i.push({x:r.left-e.left,y:r.top-e.top,width:Math.min(n.width,r.width),height:h,borderRadius:"0px"===t?"":t})}return void i.push({x:r.left-e.left,y:r.top-e.top,width:l,height:h,borderRadius:"0px"===t?"":t})}for(let e of s.children)t(e)}}(t),i}function Bt(t,e){let i=t.getBoundingClientRect();if(0===i.width||0===i.height)return null;let s=getComputedStyle(t),r=s.backgroundColor,o=s.borderWidth,n=s.borderStyle,a=s.borderColor,l=s.boxShadow,h=s.borderRadius,d="rgba(0, 0, 0, 0)"===r||"transparent"===r,u="none"!==n&&"0px"!==o,c="none"!==l&&""!==l;if(d&&!u&&!c)return null;let p=u?`${o} ${n} ${a}`:"";return{x:i.left-e.left,y:i.top-e.top,width:i.width,height:i.height,borderRadius:"0px"===h?"":h,backgroundColor:d?"":r,border:p,boxShadow:c?l:""}}var Dt="phantom-ui-loading-styles";var zt=((t,...e)=>new f(1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]),t,g))`
	:host {
		display: block;
		position: relative;
		overflow: hidden;
		--shimmer-color: rgba(128, 128, 128, 0.3);
		--shimmer-duration: 1.5s;
		--shimmer-bg: rgba(128, 128, 128, 0.2);
	}

	:host([loading]) ::slotted(*) {
		-webkit-text-fill-color: transparent !important;
		pointer-events: none;
		user-select: none;
	}

	:host([loading]) ::slotted(img),
	:host([loading]) ::slotted(svg),
	:host([loading]) ::slotted(video),
	:host([loading]) ::slotted(canvas),
	:host([loading]) ::slotted(button),
	:host([loading]) ::slotted([role="button"]) {
		opacity: 0 !important;
	}

	.shimmer-overlay {
		position: absolute;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
		transition: opacity var(--reveal-duration, 0s) ease-out;
	}

	.shimmer-overlay.revealing {
		opacity: 0;
	}

	.shimmer-block {
		position: absolute;
		overflow: hidden;
	}

	.shimmer-container-block {
		position: absolute;
		box-sizing: border-box;
	}

	/* Shimmer mode (default) — ltr */
	.shimmer-block::after {
		content: "";
		position: absolute;
		inset: 0;
		background: linear-gradient(
			90deg,
			var(--shimmer-bg) 30%,
			var(--shimmer-color) 50%,
			var(--shimmer-bg) 70%
		);
		background-size: 200% 100%;
		animation: shimmer-ltr var(--shimmer-duration, 1.5s) linear infinite;
	}

	@keyframes shimmer-ltr {
		0% { background-position: 200% 0; }
		100% { background-position: -200% 0; }
	}

	/* Shimmer rtl */
	:host([shimmer-direction="rtl"]) .shimmer-block::after {
		animation-name: shimmer-rtl;
	}

	@keyframes shimmer-rtl {
		0% { background-position: -200% 0; }
		100% { background-position: 200% 0; }
	}

	/* Shimmer ttb */
	:host([shimmer-direction="ttb"]) .shimmer-block::after {
		background: linear-gradient(
			180deg,
			var(--shimmer-bg) 30%,
			var(--shimmer-color) 50%,
			var(--shimmer-bg) 70%
		);
		background-size: 100% 200%;
		animation-name: shimmer-ttb;
	}

	@keyframes shimmer-ttb {
		0% { background-position: 0 200%; }
		100% { background-position: 0 -200%; }
	}

	/* Shimmer btt */
	:host([shimmer-direction="btt"]) .shimmer-block::after {
		background: linear-gradient(
			180deg,
			var(--shimmer-bg) 30%,
			var(--shimmer-color) 50%,
			var(--shimmer-bg) 70%
		);
		background-size: 100% 200%;
		animation-name: shimmer-btt;
	}

	@keyframes shimmer-btt {
		0% { background-position: 0 -200%; }
		100% { background-position: 0 200%; }
	}

	/* Pulse mode */
	:host([animation="pulse"]) .shimmer-block {
		animation: phantom-pulse var(--shimmer-duration, 1.5s) ease-in-out infinite;
	}

	:host([animation="pulse"]) .shimmer-block::after {
		display: none;
	}

	@keyframes phantom-pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.4;
		}
	}

	/* Breathe mode - subtle scale + fade */
	:host([animation="breathe"]) .shimmer-block {
		animation: phantom-breathe var(--shimmer-duration, 1.5s) ease-in-out infinite;
	}

	:host([animation="breathe"]) .shimmer-block::after {
		display: none;
	}

	@keyframes phantom-breathe {
		0%,
		100% {
			opacity: 0.6;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.02);
		}
	}

	/* Solid mode */
	:host([animation="solid"]) .shimmer-block::after {
		display: none;
	}

	/* Debug mode */
	:host([debug]) .shimmer-block {
		outline: 1px dashed rgba(247, 118, 142, 0.9);
		outline-offset: -1px;
	}

	:host([debug]) .shimmer-container-block {
		outline: 1px dashed rgba(122, 162, 247, 0.9);
		outline-offset: -1px;
	}

	.debug-label {
		position: absolute;
		top: 2px;
		left: 2px;
		font: 600 10px/1 ui-monospace, SFMono-Regular, Menlo, monospace;
		color: #fff;
		background: rgba(247, 118, 142, 0.95);
		padding: 2px 5px;
		border-radius: 3px;
		pointer-events: none;
		z-index: 1;
	}

	.debug-label[data-kind="container"] {
		background: rgba(122, 162, 247, 0.95);
	}
`,jt=class extends vt{constructor(){super(...arguments),this.loading=!1,this.shimmerDirection="ltr",this.shimmerColor="rgba(128, 128, 128, 0.3)",this.backgroundColor="rgba(128, 128, 128, 0.2)",this.duration=1.5,this.fallbackRadius=4,this.animation="shimmer",this.stagger=0,this.reveal=0,this.count=1,this.countGap=0,this.debug=!1,this._blocks=[],this._revealing=!1,this._resizeObserver=null,this._mutationObserver=null,this._loadHandler=null,this._measureScheduled=!1,this._revealTimeout=null}static{this.styles=zt}connectedCallback(){super.connectedCallback(),function(){if(document.getElementById(Dt))return;let t=document.createElement("style");t.id=Dt,t.textContent='\n\t\tphantom-ui[loading] * {\n\t\t\t-webkit-text-fill-color: transparent !important;\n\t\t\tpointer-events: none;\n\t\t\tuser-select: none;\n\t\t}\n\t\tphantom-ui[loading] img,\n\t\tphantom-ui[loading] svg,\n\t\tphantom-ui[loading] video,\n\t\tphantom-ui[loading] canvas,\n\t\tphantom-ui[loading] button,\n\t\tphantom-ui[loading] [role="button"] {\n\t\t\topacity: 0 !important;\n\t\t}\n\t\tphantom-ui[loading] [data-shimmer-ignore],\n\t\tphantom-ui[loading] [data-shimmer-ignore] * {\n\t\t\t-webkit-text-fill-color: initial !important;\n\t\t\tpointer-events: auto;\n\t\t\tuser-select: auto;\n\t\t}\n\t\tphantom-ui[loading] [data-shimmer-ignore] img,\n\t\tphantom-ui[loading] [data-shimmer-ignore] svg,\n\t\tphantom-ui[loading] [data-shimmer-ignore] video,\n\t\tphantom-ui[loading] [data-shimmer-ignore] canvas,\n\t\tphantom-ui[loading] [data-shimmer-ignore] button,\n\t\tphantom-ui[loading] [data-shimmer-ignore] [role="button"] {\n\t\t\topacity: 1 !important;\n\t\t}\n\t',document.head.appendChild(t)}()}disconnectedCallback(){super.disconnectedCallback(),this._teardownObservers(),this._clearRevealTimeout()}willUpdate(t){t.has("loading")&&!this.loading&&this.reveal>0&&this._blocks.length>0&&(this._revealing=!0)}updated(t){(t.has("count")||t.has("countGap"))&&this.loading&&this._scheduleMeasure(),t.has("loading")&&(this.setAttribute("aria-busy",String(this.loading)),this.loading?(this._revealing=!1,this._clearRevealTimeout(),this._scheduleMeasure(),this._setupObservers()):this._revealing?(this._teardownObservers(),this._revealTimeout=setTimeout(()=>{this._revealing=!1,this._blocks=[],this._revealTimeout=null,this.style.minHeight=""},1e3*this.reveal)):(this._blocks=[],this._teardownObservers(),this.style.minHeight=""))}render(){let t=Pt({"--shimmer-color":this.shimmerColor,"--shimmer-duration":`${this.duration}s`,"--shimmer-bg":this.backgroundColor,"--reveal-duration":`${this.reveal}s`,"--shimmer-direction":this.shimmerDirection});return it`
      <slot></slot>
      ${this.loading||this._revealing?it`
            <div
              class="shimmer-overlay ${this._revealing?"revealing":""}"
              style=${t}
              aria-hidden="true"
            >
              ${this._renderBlocks()}
            </div>
          `:""}
    `}_scheduleMeasure(){this._measureScheduled||(this._measureScheduled=!0,requestAnimationFrame(()=>{this._measureScheduled=!1,this._measure()}))}_measure(){if(!this.loading)return;let t=this.getBoundingClientRect();if(0===t.width||0===t.height)return;this._mutationObserver&&this._mutationObserver.disconnect();let e=this.shadowRoot?.querySelector("slot");if(!e)return;let i=e.assignedElements({flatten:!0}),s=[];for(let r of i){let e=Ht(r,t);s.push(...e)}if(this.count>1&&s.length>0){let e=0;for(let s of i){let i=s.getBoundingClientRect();e=Math.max(e,i.bottom-t.top)}let r=[];for(let s of i){let e=Bt(s,t);e&&r.push(e)}let o=[...s];for(let t=1;t<this.count;t++){let i=t*(e+this.countGap);for(let t of r)s.push({x:t.x,y:t.y+i,width:t.width,height:t.height,borderRadius:t.borderRadius,isContainer:!0,containerBg:t.backgroundColor,containerBorder:t.border,containerShadow:t.boxShadow});for(let t of o)s.push({...t,y:t.y+i})}let n=this.count*e+(this.count-1)*this.countGap;this.style.minHeight=`${n}px`}else this.style.minHeight="";this._blocks=s,this._mutationObserver&&this._mutationObserver.observe(this,{childList:!0,subtree:!0,attributes:!0})}_setupObservers(){this._teardownObservers(),this._resizeObserver=function(t,e){let i=null,s=new ResizeObserver(()=>{null!==i&&cancelAnimationFrame(i),i=requestAnimationFrame(()=>{i=null,e()})});return s.observe(t),s}(this,()=>{this._scheduleMeasure()}),this._mutationObserver=new MutationObserver(()=>{this._scheduleMeasure()}),this._mutationObserver.observe(this,{childList:!0,subtree:!0,attributes:!0}),this._loadHandler=()=>this._scheduleMeasure(),this.addEventListener("load",this._loadHandler,!0)}_teardownObservers(){this._resizeObserver&&(this._resizeObserver.disconnect(),this._resizeObserver=null),this._mutationObserver&&(this._mutationObserver.disconnect(),this._mutationObserver=null),this._loadHandler&&(this.removeEventListener("load",this._loadHandler,!0),this._loadHandler=null)}_clearRevealTimeout(){null!==this._revealTimeout&&(clearTimeout(this._revealTimeout),this._revealTimeout=null)}_renderBlocks(){return this._blocks.map((t,e)=>{let i=t.borderRadius||`${this.fallbackRadius}px`,s={left:`${t.x}px`,top:`${t.y}px`,width:`${t.width}px`,height:`${t.height}px`,"border-radius":i};if(t.isContainer){let i={...s};return t.containerBg&&(i.background=t.containerBg),t.containerBorder&&(i.border=t.containerBorder),t.containerShadow&&(i["box-shadow"]=t.containerShadow),it`<div
          class="shimmer-container-block"
          style=${Pt(i)}
        >${this.debug?it`<span class="debug-label" data-kind="container">C${e}</span>`:rt}</div>`}let r={...s,background:`var(--shimmer-bg, ${this.backgroundColor})`};return this.stagger>0&&(r["animation-delay"]=e*this.stagger+"s"),it`<div class="shimmer-block" style=${Pt(r)}>${this.debug?it`<span class="debug-label">${e}</span>`:rt}</div>`})}};Mt([wt({type:Boolean,reflect:!0,converter:{fromAttribute:t=>null!==t&&"false"!==t,toAttribute:t=>t?"":null}})],jt.prototype,"loading",2),Mt([wt({attribute:"shimmer-direction",reflect:!0})],jt.prototype,"shimmerDirection",2),Mt([wt({attribute:"shimmer-color"})],jt.prototype,"shimmerColor",2),Mt([wt({attribute:"background-color"})],jt.prototype,"backgroundColor",2),Mt([wt({type:Number})],jt.prototype,"duration",2),Mt([wt({type:Number,attribute:"fallback-radius"})],jt.prototype,"fallbackRadius",2),Mt([wt({reflect:!0})],jt.prototype,"animation",2),Mt([wt({type:Number})],jt.prototype,"stagger",2),Mt([wt({type:Number})],jt.prototype,"reveal",2),Mt([wt({type:Number,converter:t=>Math.max(1,Math.round(Number(t)||1))})],jt.prototype,"count",2),Mt([wt({type:Number,attribute:"count-gap",converter:t=>Math.max(0,Number(t)||0)})],jt.prototype,"countGap",2),Mt([wt({type:Boolean,reflect:!0})],jt.prototype,"debug",2),Mt([St()],jt.prototype,"_blocks",2),Mt([St()],jt.prototype,"_revealing",2),customElements.get("phantom-ui")||customElements.define("phantom-ui",jt);var It=u({__name:"XSkeleton",props:{loading:{type:Boolean,default:!1},animation:{default:"shimmer"},stagger:{default:0},reveal:{default:0},count:{default:1},countGap:{default:0},shimmerDirection:{default:"ltr"},shimmerColor:{default:"var(--color-neutral-100)"},backgroundColor:{default:"var(--color-neutral-200)"},duration:{default:1.5},fallbackRadius:{default:4},debug:{type:Boolean,default:!1}},setup:t=>(i,r)=>{const o=h("phantom-ui");return s(),n(o,{loading:t.loading,animation:t.animation,stagger:t.stagger,reveal:t.reveal,count:t.count,"count-gap":t.countGap,"shimmer-direction":t.shimmerDirection,"shimmer-color":t.shimmerColor,"background-color":t.backgroundColor,duration:t.duration,"fallback-radius":t.fallbackRadius,debug:t.debug,class:"skeleton"},{default:l(()=>[e(i.$slots,"default")]),_:3},8,["loading","animation","stagger","reveal","count","count-gap","shimmer-direction","shimmer-color","background-color","duration","fallback-radius","debug"])}}),Lt={class:"default-input__label-text"},qt={class:"default-input__input"},Vt={key:1,class:"default-input__errors"},Wt={class:"default-input__error"},Gt={key:2,class:"default-input__bottom"},Ft=u({__name:"XInputField",props:{id:{},label:{},required:{type:Boolean},loading:{type:Boolean},errors:{default:()=>[]},tag:{default:"label"}},setup:i=>(h,u)=>(s(),n(It,{loading:i.loading},{default:l(()=>[a("div",{class:c(["default-input",{required:i.required}])},[i.label?(s(),n(r(i.tag),{key:0,for:i.id,class:"default-input__label"},{default:l(()=>[e(h.$slots,"label",{labelValue:i.label},()=>[a("span",Lt,t(i.label),1)])]),_:3},8,["for"])):o("",!0),a("div",qt,[e(h.$slots,"default"),e(h.$slots,"action")]),i.errors?.[0]?(s(),d("ul",Vt,[a("li",Wt,t("string"==typeof i.errors[0]?i.errors[0]:i.errors[0].$message),1)])):o("",!0),h.$slots.underInput?(s(),d("div",Gt,[e(h.$slots,"underInput")])):o("",!0)],2)]),_:3},8,["loading"]))}),Xt=i({default:()=>Kt}),Kt=Ft;export{Xt as n,It as r,Kt as t};