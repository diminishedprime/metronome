(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{40:function(e,n,t){e.exports=t(58)},56:function(e,n,t){e.exports=t.p+"static/media/click.b48ed3e5.wav"},57:function(e,n,t){},58:function(e,n,t){"use strict";t.r(n);var a,r,i,c=t(0),o=t.n(c),u=t(18),s=t.n(u),l=t(6),f=t(1),m=t(7),d=[{name:"Larghissimo",range:[0,24]},{name:"Grave",range:[25,45]},{name:"Largo",range:[40,60]},{name:"Lento",range:[45,60]},{name:"Larghetto",range:[60,66]},{name:"Adagio",range:[66,76]},{name:"Andante",range:[76,108]},{name:"Marcia moderato",range:[83,85]},{name:"Andante moderato",range:[92,112]},{name:"Moderato",range:[108,120]},{name:"Allegro",range:[120,156]},{name:"Vivace",range:[156,176]},{name:"Vivacissimo",range:[172,176]},{name:"Allegrissimo",range:[172,176]},{name:"Presto",range:[168,200]},{name:"Prestissimo",range:[200,250]}],v=function(e){return d.filter(function(n){return function(e,n){var t=Object(f.a)(e,2),a=t[0],r=t[1];return n>=a&&n<=r}(n.range,e)})},b=function(e){var n=e.bpm,t=v(n);return o.a.createElement("div",{style:{minHeight:"6.5em"}},t.map(function(e,n){var t=e.name,a=e.range;return o.a.createElement("div",{key:n,className:"has-text-centered"},t," - ",a[0]," - ",a[1])}))},g=t(10),h=t(71),j=t(32),O=t(61),p=t(67),E=t(59),w=t(30);!function(e){e.SignatureDivisions="@mjh/k/signature-divisions-3",e.ShowKnown="@mjh/k/show-known-2",e.ScalesDB="@mjh/k/scales-db-1",e.ActiveBeats="@mjh/k/active-beats-2",e.TimeSignature="@mjh/k/signature-2",e.BPM="@mjh/k/bpm-0",e.KnownScales="@mjh/k/known-scales-0",e.ShowScales="@mjh/k/show-scales-0",e.ShowTuner="@mjh/k/show-tuner-0",e.ShowDial="@mjh/k/show-dial-0",e.Radians="@mjh/k/radians-0"}(a||(a={})),function(e){e.Major="Major",e.Minor="Minor"}(r||(r={})),function(e){e.A="A",e.B="B",e.C="C",e.D="D",e.E="E",e.F="F",e.G="G",e.A_Flat="Ab",e.B_Flat="Bb",e.C_Flat="Cb",e.D_Flat="Db",e.E_Flat="Eb",e.F_Flat="Fb",e.G_Flat="Gb",e.A_Sharp="A#",e.B_Sharp="B#",e.C_Sharp="C#",e.D_Sharp="D#",e.E_Sharp="E#",e.F_Sharp="F#",e.G_Sharp="G#"}(i||(i={}));var k=[[i.A,r.Major],[i.B,r.Major],[i.C,r.Major],[i.D,r.Major],[i.E,r.Major],[i.F,r.Major],[i.G,r.Major],[i.A_Flat,r.Major],[i.B_Flat,r.Major],[i.C_Flat,r.Major],[i.D_Flat,r.Major],[i.E_Flat,r.Major],[i.G_Flat,r.Major],[i.C_Sharp,r.Major],[i.F_Sharp,r.Major],[i.A,r.Minor],[i.B,r.Minor],[i.C,r.Minor],[i.D,r.Minor],[i.E,r.Minor],[i.F,r.Minor],[i.G,r.Minor],[i.A_Flat,r.Minor],[i.B_Flat,r.Minor],[i.E_Flat,r.Minor],[i.A_Sharp,r.Minor],[i.C_Sharp,r.Minor],[i.D_Sharp,r.Minor],[i.F_Sharp,r.Minor],[i.G_Sharp,r.Minor]],y=t(31),S=t.n(y),M=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=Object(c.useState)(function(){var a,r=localStorage.getItem(e);return a=null===r||void 0===r||t?n instanceof Function?n():n:JSON.parse(r),window.localStorage.setItem(e,JSON.stringify(a)),a}),r=Object(f.a)(a,2),i=r[0],o=r[1];return[i,Object(c.useCallback)(function(n){o(function(t){var a=n instanceof Function?n(t):n;return window.localStorage.setItem(e,JSON.stringify(a)),a})},[e])]},C=function(e,n){var t=M(e,n),a=Object(f.a)(t,2),r=a[0],i=a[1];return[r,Object(c.useCallback)(function(){i(E.a)},[i])]},x=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(e){},t=Object(c.useState)(e),a=Object(f.a)(t,2),r=a[0],i=a[1];return[r,Object(c.useCallback)(function(){return i(function(e){var t=!e;return n(t),t})},[n])]},N=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];var a=Object(c.useRef)(n);Object(c.useEffect)(function(){var e=a.current,t=n;e.forEach(function(e,n){var a=t[n];if(a!==e){var r=w.detailedDiff(e,a);console.log("Change at argument index: ".concat(n),r)}}),a.current=n},[n])},D=t(22),B=t(60),A=function(e){var n=Object(c.useState)(e),t=Object(f.a)(n,2),a=t[0],r=t[1],i=e.on,u=e.children,s=e.offClass,l=e.className,m=void 0===l?"":l;Object(c.useEffect)(function(){var n=e;e.on||(n=B.a("isPrimary",n),n=B.a("isLink",n),n=B.a("isDanger",n),n=B.a("isInfo",n),n=B.a("isSuccess",n),n=s?j.a("className","".concat(m," ").concat(s),n):n),r(n)},[e.on]);a.on,a.offClass;var d=Object(D.a)(a,["on","offClass"]),v=u instanceof Array&&2===u.length?i?u[0]:u[1]:u;return o.a.createElement(F,d,v)},F=function(e){var n=e.isPrimary,t=e.isDanger,a=e.isLink,r=e.isInfo,i=e.isSuccess,c=e.grow,u=e.isOutlined,s=Object(D.a)(e,["isPrimary","isDanger","isLink","isInfo","isSuccess","grow","isOutlined"]),l=n?"is-primary":"",f=a?"is-link":"",m=t?"is-danger":"",d=r?"is-info":"",v=i?"is-success":"",b=u?"is-outlined":"",h=s.className?s.className:"",j="".concat(h," button ").concat(l," ").concat(f," ").concat(b," ").concat(m," ").concat(d," ").concat(v),O=c?{flexGrow:1}:{};return o.a.createElement("button",Object.assign({style:O},Object(g.a)({},s,{className:j})),s.children)},T=function(e){var n=e.children,t=e.className,a=Object(D.a)(e,["children","className"]),r="".concat(t," buttons has-addons}"),i=Object.assign(a,{className:r});return o.a.createElement("div",i,n)};function _(){var e=Object(l.a)(["\n  display: flex;\n"]);return _=function(){return e},e}function P(){var e=Object(l.a)(["\n  display: flex;\n  flex-grow: 1;\n"]);return P=function(){return e},e}var I=m.a.div(P()),R=m.a.div(_()),L=function(e){var n=e.playing,t=e.activeBeats,a=e.beatIdx,r=e.division,i=e.divisionIdx,c=e.enabledDivisions,u=parseInt(r,10);return o.a.createElement(R,{key:"d".concat(u)},h.a(0,u).map(function(e){var r=n&&t[a]&&t[a][u]===e?0===a?"has-background-info":"has-background-primary":"has-background-light",s=1===u?0:5,l=0===e?0:10/u,f=e===u-1?0:10/u;return o.a.createElement(I,{key:"d".concat(u,"-").concat(e),className:"".concat(r," has-text-centered"),style:{justifyContent:"center",height:70/Object.keys(c).filter(function(e){return c[e]}).length-s,marginLeft:l,marginRight:f,marginTop:s}},0===i&&a+1)}))},G=function(e){return o.a.createElement("div",{className:"column has-text-centered"},Object.keys(e.enabledDivisions).filter(function(n){return e.enabledDivisions[n]}).map(function(n,t){return o.a.createElement(L,Object.assign({key:"".concat(e.beatIdx,"-").concat(t)},Object(g.a)({},e,{division:n,divisionIdx:t})))}))},K=function(e){var n=e.playing,t=e.signature.numerator,r=e.setSignature,i=e.activeBeats,u=x(!1),s=Object(f.a)(u,2),l=s[0],m=s[1],d=Object(c.useState)(!1),v=Object(f.a)(d,2),b=v[0],w=v[1],k=M(a.SignatureDivisions,{1:!0}),y=Object(f.a)(k,2),S=y[0],C=y[1],N=Object(c.useCallback)(function(e){w(!0),r(function(n){return j.a("numerator",h.a(0,e).map(function(){return S}),n)})},[S,r]);Object(c.useEffect)(function(){b&&r(function(e){return Object(g.a)({},e,{numerator:h.a(0,e.numerator.length).map(function(){return S})})})},[S,b,r]);var D=Object(c.useCallback)(function(e){w(!0),C(function(n){return O.a(p.a([e]),E.a,n)})},[C]),B=Object(c.useCallback)(function(){C({1:!0})},[C]);return o.a.createElement(o.a.Fragment,null,o.a.createElement("h3",{className:"subtitle is-5",style:{paddingLeft:"10px",marginBottom:"0"}},"Divisions"),o.a.createElement("section",{style:{marginTop:"10px"},className:"section buttons is-centered"},[2,3,4,5,6].map(function(e){var n=S[e]||void 0;return o.a.createElement(F,{grow:!0,isPrimary:n,key:"division-options-".concat(e),onClick:function(){return D(e)}},e)}),o.a.createElement(F,{grow:!0,isDanger:!0,isOutlined:!0,onClick:B},"Clear")),o.a.createElement("section",{className:"section is-mobile columns",onClick:m},t.map(function(e,t){return o.a.createElement(G,Object.assign({key:"".concat(t,"-enabledDivisionColumn")},{playing:n,beatIdx:t,enabledDivisions:e,activeBeats:i}))})),l&&o.a.createElement("section",{className:"section buttons is-centered"},[1,2,3,4,5].map(function(e){var n=t.length===e||void 0;return o.a.createElement(F,{key:"numerator-button-".concat(e),isPrimary:n,grow:!0,onClick:n?function(){}:function(){return N(e)}},e,"/4")})))},W=t(15),q=t(38),z=t(62),U=t(63),J=t(64),V=t(36),H=t(35),X=t.n(H);for(var Y=t(56),$=function(e,n){var t=n.time,a=n.gain,r=n.buffer,i=n.pitch,c=n.currentBeat,o=n.divisionIndex,u=0===c&&0===o,s=e.createBufferSource();s.buffer=r,s.detune.value=u?0:-i;var l=e.createGain();l.gain.value=u?1:a,s.connect(l),l.connect(e.destination),s.start(t)},Q=function(e,n,t,a,r,i,c,o,u){var s=60/e.bpm,l=t;if(n.current<r+i){var f=function(e,n,t,a,r){var i=[];for(var c in t)if(t[c])for(var o=parseInt(c,10),u=n/o,s=0;s<o;s++){var l={time:e+s*u,pitch:220,gain:.5,buffer:a,divisions:o,divisionIndex:s,currentBeat:r};i.push(l)}return i.sort(function(e,n){return e.time-n.time}),i}(n.current,s,l,c,a);o.push.apply(o,Object(q.a)(f)),n.current+=s,u()}},Z=.1,ee=function(e,n,t){var a=n.playing,r=function(e,n){var t=Object(c.useState)(),a=Object(f.a)(t,2),r=a[0],i=a[1];return Object(c.useEffect)(function(){void 0!==e&&fetch(n).then(function(e){return e.arrayBuffer()}).then(function(n){return e.decodeAudioData(n)}).then(i)},[n,e]),r}(e,Y),i=Object(c.useRef)(0),o=a?150:void 0,u=Object(c.useRef)(n);Object(c.useEffect)(function(){u.current=n},[n]);var s=Object(c.useState)(0),l=Object(f.a)(s,2),m=l[0],d=l[1];Object(c.useEffect)(function(){n.playing||d(0)},[n.playing]);var v=Object(c.useRef)(m);Object(c.useEffect)(function(){v.current=m},[m]);var b=function(){d(function(e){return(e+1)%u.current.signature.numerator.length})},h=Object(c.useCallback)(function(e){t(function(n){var t=z.a(e.currentBeat,function(n){return Object(g.a)({},n,Object(W.a)({},e.divisions,e.divisionIndex))},n),a=e.currentBeat-1;if(a<0){if(1===n.length)return t;a=u.current.signature.numerator.length-1}return z.a(a,function(e){return Object.keys(e).reduce(function(e,n){return Object(g.a)({},e,Object(W.a)({},n,void 0))},{})},t)})},[t]),j=Object(c.useCallback)(function(e,n){!function e(n,t,a){var r=n.currentTime;t<=r?a():setTimeout(function(){return e(n,t,a)},(t-r)/2*1e3)}(e,n.time,function(){u.current.playing&&h(n)})},[h]);Object(c.useEffect)(function(){if(void 0!==o&&void 0!==e&&void 0!==r){var n=new X.a,t=e.currentTime+.3;i.current=t;var a=function(){var t=u.current.signature.numerator,a=t[Math.min(v.current,t.length-1)];Q(u.current,i,a,v.current,e.currentTime,.3,r,n,b),function(e,n,t,a){for(var r=t.currentTime+n+Z;e.peekFront()&&e.peekFront().time<r;){var i=e.shift();0===i.divisionIndex&&1!==i.divisions||$(t,i),a(t,i)}}(n,o/1e3,e,j)};a();var c=setInterval(a,o);return function(){clearInterval(c)}}},[o,r,e,t,h,j])},ne=function(e){return e.map(function(e){return U.a(function(){},e)})},te=function(e){return J.a(10,250,e)},ae=function(e){var n=Object(c.useState)(!1),t=Object(f.a)(n,2),r=t[0],i=t[1],o=function(e,n){var t=Object(f.a)(e,2),a=t[0],r=t[1],i=Object(c.useCallback)(function(e){r(function(t){return n(e instanceof Function?e(t):e)})},[n,r]);return N(n,r),[a,i]}(M(a.BPM,90),te),u=Object(f.a)(o,2),s=u[0],l=u[1],m=M(a.TimeSignature,{denominator:4,numerator:[{1:!0},{1:!0},{1:!0}]}),d=Object(f.a)(m,2),v=d[0],b=d[1],g=M(a.ActiveBeats,ne(v.numerator)),h=Object(f.a)(g,2),j=h[0],O=h[1],p={bpm:s,playing:r,signature:v,activeDivisions:j},w=v.numerator,k=Object(c.useRef)(s);Object(c.useEffect)(function(){k.current=s},[s]),Object(c.useEffect)(function(){O(ne(w))},[w,v,O]),Object(c.useEffect)(function(){r||(O(ne(w)),setTimeout(function(){O(ne(w))},300))},[r,w,O]),ee(e,p,O);return{toggleStart:function(){return i(E.a)},setSignature:b,start:Object(c.useCallback)(function(e){void 0!==e&&l(e),i(!0)},[i,l]),stop:Object(c.useCallback)(function(){i(!1)},[i]),setBPM:l,addBPM:function(e){l(V.a(e))},state:p}},re=t(68),ie=t(69),ce=t(37),oe=t(70),ue=t(65),se=t(66),le=re.a(function(e){return ie.a(2,e)},ce.a(function(e){var n=Object(f.a)(e,2),t=n[0];return n[1]-t}),oe.a,ue.a(6e4),Math.trunc),fe=function(e){var n=e.setBPM,t=Object(c.useState)([]),a=Object(f.a)(t,2),r=a[0],i=a[1];return o.a.createElement(F,{isLink:!0,onClick:function(){var e=performance.now(),t=se.a(e,r).filter(function(n){return e-n<3e3});if(t.length>1){var a=le(t);n(a)}i(t)}},"Tap In")},me={0:"A",1:"Bb",2:"B",3:"C",4:"Db",5:"D",6:"Eb",7:"E",8:"F",9:"Gb",10:"G",11:"Ab"},de=[],ve=-4;ve<4;ve++)for(var be=0;be<12;be++){var ge=440*Math.pow(2,ve),he=ge/1200,je=ge*Math.pow(2,be/12),Oe=ve+4,pe=me[be];de.push({octave:Oe,note:pe,frequency:je,centsPerOctave:he})}var Ee=function(){var e=Object(c.useState)(),n=Object(f.a)(e,2),t=n[0],a=n[1],r=Object(c.useState)(),i=Object(f.a)(r,2)[1],u=Object(c.useState)(),s=Object(f.a)(u,2),l=s[0],m=s[1],d=Object(c.useState)(440),v=Object(f.a)(d,2),b=v[0],g=v[1];Object(c.useRef)(null);Object(c.useEffect)(function(){var e=new AudioContext;m(e.sampleRate);var n=navigator.mediaDevices;return n&&n.getUserMedia({audio:!0}).then(function(n){var t=e.createAnalyser();t.fftSize=8192,e.createMediaStreamSource(n).connect(t),a(t)}),function(){e.close()}},[]),Object(c.useLayoutEffect)(function(){var e,n=function(){var e=t.frequencyBinCount,n=new Float32Array(e);t.getFloatFrequencyData(n),i(n);var r=n.reduce(function(e,n,t){return e[0]<n?[n,t]:e},[-1/0,-1]),c=Object(f.a)(r,2)[1],o=l/t.fftSize;g(o*c),a()},a=function(){e=requestAnimationFrame(n)};if(void 0!==t)return a(),function(){cancelAnimationFrame(e)}},[t,l]);var h=function(e){for(var n=0,t=0;t<de.length;t++)if(de[t].frequency>=e){n=t;break}var a=n+1,r=de[n],i=de[a],c=(r.frequency+i.frequency)/2,o=de[a],u=o.frequency-e;e<c&&(o=de[n]);var s=o.centsPerOctave*u;return Object.assign(o,{originalFrequency:e,difference:u,cents:s})}(b||0),j=h.octave,O=h.note,p=h.cents;return o.a.createElement("div",{className:"box"},o.a.createElement("div",{className:"has-text-centered"},o.a.createElement("div",{className:"is-size-1"},O+j),o.a.createElement("div",null,p.toFixed(2)," Cents ",p<0?"flat":"sharp")),!1)};function we(){var e=Object(l.a)(["\n  align-self: center;\n  margin: auto;\n  z-index: 1;\n  pointer-events: none;\n"]);return we=function(){return e},e}function ke(){var e=Object(l.a)(["\n  width: 100px;\n  height: 100px;\n  border-radius: 100px;\n  position: absolute;\n  touch-action: none;\n"]);return ke=function(){return e},e}function ye(){var e=Object(l.a)(["\n  margin: auto;\n  position: relative;\n  height: 300px;\n  width: 300px;\n  border-radius: 300px;\n  display: flex;\n  margin-bottom: 10px;\n"]);return ye=function(){return e},e}var Se,Me=m.a.div(ye()),Ce=m.a.div(ke()),xe=m.a.div(we()),Ne=function(e){var n=e.size,t=void 0===n?300:n,r=e.initialValue,i=e.addDiff,u=e.children,s=M(a.Radians,r*(3*Math.PI)/2),l=Object(f.a)(s,2),m=l[0],d=l[1],v=Object(c.useRef)(Math.PI);Object(c.useEffect)(function(){v.current=m},[m]);var b=Object(c.useState)(!1),g=Object(f.a)(b,2),h=g[0],j=g[1],O=Object(c.useRef)(!1);Object(c.useEffect)(function(){O.current=h},[h]);var p=Object(c.useState)(0),E=Object(f.a)(p,2),w=E[0],k=E[1],y=Object(c.useRef)(0);Object(c.useEffect)(function(){y.current=w},[w]);var S=Object(c.useRef)(null),C=Object(c.useCallback)(function(e){j(!1)},[]),x=Object(c.useCallback)(function(e){Math.abs(y.current)<.2?k(function(n){return n+e}):(i(y.current>0?-1:1),k(0))},[i]),N=Object(c.useCallback)(function(e){var n=e.clientX,t=e.clientY,a=S.current.getBoundingClientRect(),r=a.left+a.width/2,i=-(a.top+a.height/2-t),c=-(r-n),o=Math.atan2(i,c),u=v.current-o;u<-Math.PI?u=-v.current-o:u>Math.PI&&(u=v.current- -o),0!==u&&x(u),o===v.current||d(o)},[x,d]),D=Object(c.useCallback)(function(e){O.current&&N(e)},[N]);Object(c.useEffect)(function(){return window.addEventListener("mouseup",C),window.addEventListener("mousemove",D),function(){window.removeEventListener("mouseup",C),window.removeEventListener("mousemove",D)}},[D,C]);var B=t/2+Math.sin(m)*(t/4)+Math.sin(m)*t/16-t/6,A=t/2+Math.cos(m)*(t/4)+Math.cos(m)*t/16-t/6;return o.a.createElement(Me,{ref:S,className:"has-background-primary"},o.a.createElement(Ce,{className:"has-background-info",onMouseDown:function(e){j(!0),e.preventDefault()},onTouchMove:function(e){var n=e.changedTouches[0];N(n)},style:{top:B,left:A}}),o.a.createElement(xe,null,u))};!function(e){e.NOT_STARTED="Not Started",e.LEARNING="Learning",e.KNOWN="Known"}(Se||(Se={}));var De=function(e,n){return Be(e,n)[0]},Be=function(e,n){var t=[];return Object.entries(e).forEach(function(e){var a=Object(f.a)(e,2)[1];Object.entries(a).forEach(function(e){var a=Object(f.a)(e,2)[1];n(a)&&t.push(a)})}),t},Ae=function(){var e={},n=function(n){var t,a=Object(f.a)(n,2),r=a[0],i=a[1],c=e[r];void 0===c&&(c={},e[r]=c),c[i]={scaleKey:t=n,pitch:t[0],mode:t[1],known:!1,learning:!1,bpm:60}},t=!0,a=!1,r=void 0;try{for(var i,c=k[Symbol.iterator]();!(t=(i=c.next()).done);t=!0){n(i.value)}}catch(o){a=!0,r=o}finally{try{t||null==c.return||c.return()}finally{if(a)throw r}}return e},Fe=function(e){var n=Object(f.a)(e.scaleKey,2),t=n[0],a=n[1],r=e.learning,i=e.known,c=e.toggleLearning,u=e.toggleKnown;return o.a.createElement("div",{className:"is-grouped field has-addons"},o.a.createElement("div",{className:"is-size-5 control is-expanded"},t," ",a),o.a.createElement(T,null,o.a.createElement(A,{on:i,isInfo:!0,onClick:u},"Known"),o.a.createElement(A,{on:r,isLink:!0,onClick:c},"Learning")))};var Te=function(e){var n=e.scalesDB,t=e.addBPM,a=e.reset,r=e.scaleMode,i=e.startMetronome,u=Object(c.useState)(function(){return function(e){var n,t,a;for(a=e.length-1;a>0;a--)n=Math.floor(Math.random()*(a+1)),t=e[a],e[a]=e[n],e[n]=t;return e}(Be(n,function(e){return r===Se.LEARNING?e.learning:r===Se.KNOWN&&e.known}).map(function(e){return e.scaleKey}))}),s=Object(f.a)(u,2),l=s[0],m=s[1],d=l[0]||[],v=De(n,function(e){return e.mode===d[1]&&e.pitch===d[0]});Object(c.useEffect)(function(){void 0!==v&&i(v.bpm)},[v,i]);var b=l.length>1?"Next Scale":"Finish";if(0===l.length)return o.a.createElement("div",null,"No more scales");var g=v,h=g,j=h.mode,O=h.pitch,p=h.bpm;return o.a.createElement("div",null,o.a.createElement("div",{style:{alignSelf:"center",fontWeight:"bold"},className:"control is-expanded is-size-5"},r),o.a.createElement("div",{style:{display:"flex",marginBottom:"5px"}},o.a.createElement("div",{style:{alignSelf:"center",marginRight:"10px"}},O," ",j," @ ",p,"bpm"),o.a.createElement(T,{style:{flexGrow:1}},o.a.createElement(F,{isDanger:!0,isOutlined:!0,grow:!0,onClick:t(g,-10)},"-10"),o.a.createElement(F,{isDanger:!0,isOutlined:!0,grow:!0,onClick:t(g,-1)},"-"),o.a.createElement(F,{isPrimary:!0,isOutlined:!0,grow:!0,onClick:t(g,1)},"+"),o.a.createElement(F,{isPrimary:!0,isOutlined:!0,grow:!0,onClick:t(g,10)},"+10"))),o.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},o.a.createElement(F,{isDanger:!0,isOutlined:!0,onClick:a},"Stop"),o.a.createElement(F,{isPrimary:!0,onClick:function(){m(function(e){var n=e.slice(1);return 0===n.length&&a(),n})}},b)))},_e=function(e){var n=e.startMetronome,t=e.stopMetronome,i=M(a.ScalesDB,Ae),u=Object(f.a)(i,2),s=u[0],l=u[1],m=Object(c.useState)(Se.NOT_STARTED),d=Object(f.a)(m,2),v=d[0],b=d[1];Object(c.useEffect)(function(){v===Se.NOT_STARTED&&t()},[v,t]);var g=function(e){var n=e.pitch,t=e.mode;return function(){l(O.a(p.a([n,t,"learning"]),E.a))}},h=function(e){var n=e.pitch,t=e.mode;return function(){l(O.a(p.a([n,t,"known"]),E.a))}},j=C(a.ShowKnown,!1),w=Object(f.a)(j,2),k=w[0],y=w[1];return o.a.createElement("div",{className:"box",style:{marginTop:"10px"}},v===Se.NOT_STARTED?o.a.createElement("div",{style:{marginBottom:"5px"}},o.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},o.a.createElement("div",{style:{alignSelf:"center",fontWeight:"bold"},className:"control is-expanded is-size-5"},"Scales"),o.a.createElement(T,null,o.a.createElement(F,{onClick:function(){return b(Se.KNOWN)},disabled:void 0===De(s,function(e){return e.known}),className:"is-info is-outlined"},"Start Known"),o.a.createElement(F,{onClick:function(){return b(Se.LEARNING)},disabled:void 0===De(s,function(e){return e.learning}),className:"is-link is-outlined"},"Start Learning"))),o.a.createElement("hr",null),o.a.createElement(T,null,o.a.createElement(F,{onClick:y,className:"".concat(k?"is-primary is-outlined":"is-danger")},k?"Hide Known":"Show Known")),Be(s,function(e){return e.mode===r.Major&&(!!k||!1===e.known)}).map(function(e){return o.a.createElement(Fe,Object.assign({key:"".concat(e.pitch,"-").concat(e.mode)},e,{toggleLearning:g(e),toggleKnown:h(e)}))}),o.a.createElement("hr",null),Be(s,function(e){return e.mode===r.Minor&&(!!k||!1===e.known)}).map(function(e){return o.a.createElement(Fe,Object.assign({key:"".concat(e.pitch,"-").concat(e.mode)},e,{toggleLearning:g(e),toggleKnown:h(e)}))})):o.a.createElement(Te,{scaleMode:v,startMetronome:n,addBPM:function(e,n){var t=e.pitch,a=e.mode;return function(){l(O.a(p.a([t,a,"bpm"]),V.a(n)))}},scalesDB:s,reset:function(){return b(Se.NOT_STARTED)}}))},Pe=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Ie(e){if("serviceWorker"in navigator){if(new URL("/metronome",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var n="".concat("/metronome","/service-worker.js");Pe?(!function(e,n){fetch(e).then(function(t){var a=t.headers.get("content-type");404===t.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):Re(e,n)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(n,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):Re(n,e)})}}function Re(e,n){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}function Le(){var e=Object(l.a)(["\n  max-width: 500px;\n  margin: 0 auto;\n  padding-left: 10px;\n  padding-right: 10px;\n"]);return Le=function(){return e},e}var Ge=function(){var e=Object(c.useState)(),n=Object(f.a)(e,2),t=n[0],r=n[1],i=ae(t),u=i.state,s=u.playing,l=u.signature,m=u.bpm,d=u.activeDivisions,v=i.start,g=i.stop,h=i.toggleStart,j=i.setSignature,O=i.setBPM,p=i.addBPM;Object(c.useEffect)(function(){s&&void 0===t&&r(new AudioContext)},[s,t]);var E=x(!1),w=Object(f.a)(E,2),k=w[0],y=w[1],M=function(){var e=Object(c.useState)(new S.a),n=Object(f.a)(e,1)[0];return{lock:Object(c.useCallback)(function(){n.enable()},[n]),release:Object(c.useCallback)(function(){n.disable()},[n])}}(),N=M.lock,D=M.release;Object(c.useEffect)(function(){k&&s?N():D()},[s,k,N,D]);var B=C(a.ShowScales,!1),_=Object(f.a)(B,2),P=_[0],I=_[1],R=C(a.ShowTuner,!1),L=Object(f.a)(R,2),G=L[0],W=L[1],q=C(a.ShowDial,!0),z=Object(f.a)(q,2),U=z[0],J=z[1],V=Object(c.useState)(!1),H=Object(f.a)(V,2),X=H[0],Y=H[1];return Object(c.useEffect)(function(){Ie({onUpdate:function(){Y(!0)}})}),o.a.createElement(Ke,null,X&&o.a.createElement("section",{className:"box is-grouped field has-addons",style:{marginBottom:"10px"}},o.a.createElement("p",{style:{alignSelf:"center"},className:"control is-expanded"},"An Update is Available!"),o.a.createElement(F,{onClick:function(){return window.location.reload()}},"Refresh")),o.a.createElement("section",{className:"section",style:{marginTop:"10px",marginBottom:"10px"}},o.a.createElement("h2",{className:"title is-2 has-text-centered"},"(mjh)tronome")),U&&o.a.createElement("section",{className:"section"},o.a.createElement(Ne,{initialValue:m,addDiff:p},o.a.createElement("div",{className:"has-text-centered is-size-1"},m),o.a.createElement(b,{bpm:m}))),o.a.createElement(K,{playing:s,signature:l,setSignature:j,activeBeats:d}),o.a.createElement("section",{className:"section"},o.a.createElement(T,null,o.a.createElement(fe,{setBPM:O}),o.a.createElement(A,{on:!s,offClass:"is-danger",grow:!0,isOutlined:!0,isPrimary:!0,onClick:h},o.a.createElement(o.a.Fragment,null,"Start"),o.a.createElement(o.a.Fragment,null,"Stop")))),P&&o.a.createElement(_e,{startMetronome:v,stopMetronome:g}),G&&o.a.createElement(Ee,null),o.a.createElement("nav",{className:"navbar is-fixed-bottom has-background-light"},o.a.createElement(Ke,{className:" buttons is-right"},o.a.createElement(A,{isPrimary:!0,on:k,onClick:y},"Stay Awake"),o.a.createElement(A,{isPrimary:!0,on:U,onClick:J},"Dial"),o.a.createElement(A,{isPrimary:!0,on:P,onClick:I},"Scales"),o.a.createElement(A,{isPrimary:!0,on:G,onClick:W},"Tuner"),o.a.createElement("div",null,"v".concat("1.0.4")))))},Ke=m.a.div(Le()),We=function(){return o.a.createElement(Ge,null)};t(57);s.a.render(o.a.createElement(We,null),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.d2cb4a58.chunk.js.map