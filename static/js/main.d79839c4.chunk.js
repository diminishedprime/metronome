(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{50:function(e,n,t){e.exports=t(71)},64:function(e,n,t){e.exports=t.p+"static/media/click.b48ed3e5.wav"},70:function(e,n,t){},71:function(e,n,t){"use strict";t.r(n);var a,r,i,c=t(0),o=t.n(c),u=t(23),s=t.n(u),l=t(5),f=t(1),m=t(6),d=[{name:"Larghissimo",range:[0,24]},{name:"Grave",range:[25,45]},{name:"Largo",range:[40,60]},{name:"Lento",range:[45,60]},{name:"Larghetto",range:[60,66]},{name:"Adagio",range:[66,76]},{name:"Andante",range:[76,108]},{name:"Marcia moderato",range:[83,85]},{name:"Andante moderato",range:[92,112]},{name:"Moderato",range:[108,120]},{name:"Allegro",range:[120,156]},{name:"Vivace",range:[156,176]},{name:"Vivacissimo",range:[172,176]},{name:"Allegrissimo",range:[172,176]},{name:"Presto",range:[168,200]},{name:"Prestissimo",range:[200,250]}],b=function(e){return d.filter(function(n){return function(e,n){var t=Object(f.a)(e,2),a=t[0],r=t[1];return n>=a&&n<=r}(n.range,e)})},v=function(e){var n=e.bpm,t=b(n);return o.a.createElement("div",{style:{minHeight:"6.5em"}},t.map(function(e,n){var t=e.name,a=e.range;return o.a.createElement("div",{key:n,className:"has-text-centered"},t," - ",a[0]," - ",a[1])}))},g=t(12),h=t(84),j=t(40),p=t(74),O=t(80),E=t(72),w=t(38);!function(e){e.SignatureDivisions="@mjh/k/signature-divisions-3",e.ShowKnown="@mjh/k/show-known-2",e.ScalesDB="@mjh/k/scales-db-1",e.ActiveBeats="@mjh/k/active-beats-2",e.TimeSignature="@mjh/k/signature-2",e.BPM="@mjh/k/bpm-0",e.KnownScales="@mjh/k/known-scales-0",e.ShowScales="@mjh/k/show-scales-0",e.ShowTuner="@mjh/k/show-tuner-0",e.ShowDial="@mjh/k/show-dial-0",e.Radians="@mjh/k/radians-0",e.WakeLock="@mjh/k/wake-lock-0"}(a||(a={})),function(e){e.Major="Major",e.Minor="Minor"}(r||(r={})),function(e){e.A="A",e.B="B",e.C="C",e.D="D",e.E="E",e.F="F",e.G="G",e.A_Flat="Ab",e.B_Flat="Bb",e.C_Flat="Cb",e.D_Flat="Db",e.E_Flat="Eb",e.F_Flat="Fb",e.G_Flat="Gb",e.A_Sharp="A#",e.B_Sharp="B#",e.C_Sharp="C#",e.D_Sharp="D#",e.E_Sharp="E#",e.F_Sharp="F#",e.G_Sharp="G#"}(i||(i={}));var k=[[i.A,r.Major],[i.B,r.Major],[i.C,r.Major],[i.D,r.Major],[i.E,r.Major],[i.F,r.Major],[i.G,r.Major],[i.A_Flat,r.Major],[i.B_Flat,r.Major],[i.C_Flat,r.Major],[i.D_Flat,r.Major],[i.E_Flat,r.Major],[i.G_Flat,r.Major],[i.C_Sharp,r.Major],[i.F_Sharp,r.Major],[i.A,r.Minor],[i.B,r.Minor],[i.C,r.Minor],[i.D,r.Minor],[i.E,r.Minor],[i.F,r.Minor],[i.G,r.Minor],[i.A_Flat,r.Minor],[i.B_Flat,r.Minor],[i.E_Flat,r.Minor],[i.A_Sharp,r.Minor],[i.C_Sharp,r.Minor],[i.D_Sharp,r.Minor],[i.F_Sharp,r.Minor],[i.G_Sharp,r.Minor]],y=t(39),S=t.n(y),M=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=Object(c.useState)(function(){var a,r=localStorage.getItem(e);return a=null===r||void 0===r||t?n instanceof Function?n():n:JSON.parse(r),window.localStorage.setItem(e,JSON.stringify(a)),a}),r=Object(f.a)(a,2),i=r[0],o=r[1];return[i,Object(c.useCallback)(function(n){o(function(t){var a=n instanceof Function?n(t):n;return window.localStorage.setItem(e,JSON.stringify(a)),a})},[e])]},C=function(e,n){var t=M(e,n),a=Object(f.a)(t,2),r=a[0],i=a[1];return[r,Object(c.useCallback)(function(){i(E.a)},[i])]},x=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];var a=Object(c.useRef)(n);Object(c.useEffect)(function(){var e=a.current,t=n;e.forEach(function(e,n){var a=t[n];if(a!==e){var r=w.detailedDiff(e,a);console.log("Change at argument index: ".concat(n),r)}}),a.current=n},[n])},N=t(27),D=t(73),A=function(e){var n=Object(c.useState)(e),t=Object(f.a)(n,2),a=t[0],r=t[1],i=e.on,u=e.children,s=e.offClass,l=e.className,m=void 0===l?"":l;Object(c.useEffect)(function(){var n=e;e.on||(n=D.a("isPrimary",n),n=D.a("isLink",n),n=D.a("isDanger",n),n=D.a("isInfo",n),n=D.a("isSuccess",n),n=s?j.a("className","".concat(m," ").concat(s),n):n),r(n)},[m,s,e]);a.on,a.offClass;var d=Object(N.a)(a,["on","offClass"]),b=u instanceof Array&&2===u.length?i?u[0]:u[1]:u;return o.a.createElement(B,d,b)},B=function(e){var n=e.isPrimary,t=e.isDanger,a=e.isLink,r=e.isInfo,i=e.isSuccess,c=e.grow,u=e.isOutlined,s=Object(N.a)(e,["isPrimary","isDanger","isLink","isInfo","isSuccess","grow","isOutlined"]),l=n?"is-primary":"",f=a?"is-link":"",m=t?"is-danger":"",d=r?"is-info":"",b=i?"is-success":"",v=u?"is-outlined":"",h=s.className?s.className:"",j="".concat(h," button ").concat(l," ").concat(f," ").concat(v," ").concat(m," ").concat(d," ").concat(b),p=c?{flexGrow:1}:{};return o.a.createElement("button",Object.assign({style:p},Object(g.a)({},s,{className:j})),s.children)},F=function(e){var n=e.children,t=e.className,a=Object(N.a)(e,["children","className"]),r="".concat(t," buttons has-addons}"),i=Object.assign(a,{className:r});return o.a.createElement("div",i,n)};function _(){var e=Object(l.a)(["\n  display: flex;\n"]);return _=function(){return e},e}function P(){var e=Object(l.a)(["\n  display: flex;\n  flex-grow: 1;\n"]);return P=function(){return e},e}var T=m.a.div(P()),I=m.a.div(_()),L=function(e){var n=e.playing,t=e.activeBeats,a=e.beatIdx,r=e.division,i=e.divisionIdx,c=e.enabledDivisions,u=parseInt(r,10);return o.a.createElement(I,{key:"d".concat(u)},h.a(0,u).map(function(e){var r=n&&t[a]&&t[a][u]===e?0===a?"has-background-info":"has-background-primary":"has-background-light",s=1===u?0:5,l=0===e?0:10/u,f=e===u-1?0:10/u;return o.a.createElement(T,{key:"d".concat(u,"-").concat(e),className:"".concat(r," has-text-centered"),style:{justifyContent:"center",height:70/Object.keys(c).filter(function(e){return c[e]}).length-s,marginLeft:l,marginRight:f,marginTop:s}},0===i&&a+1)}))},R=function(e){return o.a.createElement("div",{className:"column has-text-centered"},Object.keys(e.enabledDivisions).filter(function(n){return e.enabledDivisions[n]}).map(function(n,t){return o.a.createElement(L,Object.assign({key:"".concat(e.beatIdx,"-").concat(t)},Object(g.a)({},e,{division:n,divisionIdx:t})))}))},G=function(e){var n=e.playing,t=e.signature.numerator,r=e.setSignature,i=e.activeBeats,u=Object(c.useState)(!1),s=Object(f.a)(u,2),l=s[0],m=s[1],d=M(a.SignatureDivisions,{1:!0}),b=Object(f.a)(d,2),v=b[0],w=b[1],k=Object(c.useCallback)(function(e){m(!0),r(function(n){return j.a("numerator",h.a(0,e).map(function(){return v}),n)})},[v,r]);Object(c.useEffect)(function(){l&&r(function(e){return Object(g.a)({},e,{numerator:h.a(0,e.numerator.length).map(function(){return v})})})},[v,l,r]);var y=Object(c.useCallback)(function(e){m(!0),w(function(n){return p.a(O.a([e]),E.a,n)})},[w]),S=Object(c.useCallback)(function(){w({1:!0})},[w]);return o.a.createElement(o.a.Fragment,null,o.a.createElement("h3",{className:"subtitle is-5",style:{paddingLeft:"10px",marginBottom:"0"}},"Divisions"),o.a.createElement("section",{style:{marginTop:"10px"},className:"section buttons is-centered"},[2,3,4,5,6].map(function(e){var n=v[e]||void 0;return o.a.createElement(B,{grow:!0,isPrimary:n,key:"division-options-".concat(e),onClick:function(){return y(e)}},e)}),o.a.createElement(B,{grow:!0,isDanger:!0,isOutlined:!0,onClick:S},"Clear")),o.a.createElement("section",{className:"section is-mobile columns"},t.map(function(e,t){return o.a.createElement(R,Object.assign({key:"".concat(t,"-enabledDivisionColumn")},{playing:n,beatIdx:t,enabledDivisions:e,activeBeats:i}))})),o.a.createElement("section",{className:"section buttons is-centered"},[1,2,3,4,5].map(function(e){var n=t.length===e||void 0;return o.a.createElement(B,{key:"numerator-button-".concat(e),isPrimary:n,grow:!0,onClick:n?function(){}:function(){return k(e)}},e,"/4")})))},K=t(19),W=t(48),z=t(75),q=t(76),U=t(77),J=t(44),V=t(43),H=t.n(V);for(var X=t(64),Y=function(e,n){var t=n.time,a=n.gain,r=n.buffer,i=n.pitch,c=n.currentBeat,o=n.divisionIndex,u=0===c&&0===o,s=e.createBufferSource();s.buffer=r,s.detune.value=u?0:-i;var l=e.createGain();l.gain.value=u?1:a,s.connect(l),l.connect(e.destination),s.start(t)},$=function(e,n,t,a,r,i,c,o,u){var s=60/e.bpm,l=t;if(n.current<r+i){var f=function(e,n,t,a,r){var i=[];for(var c in t)if(t[c])for(var o=parseInt(c,10),u=n/o,s=0;s<o;s++){var l={time:e+s*u,pitch:220,gain:.5,buffer:a,divisions:o,divisionIndex:s,currentBeat:r};i.push(l)}return i.sort(function(e,n){return e.time-n.time}),i}(n.current,s,l,c,a);o.push.apply(o,Object(W.a)(f)),n.current+=s,u()}},Q=.1,Z=function(e,n,t){var a=n.playing,r=function(e,n){var t=Object(c.useState)(),a=Object(f.a)(t,2),r=a[0],i=a[1];return Object(c.useEffect)(function(){void 0!==e&&fetch(n).then(function(e){return e.arrayBuffer()}).then(function(n){return e.decodeAudioData(n)}).then(i)},[n,e]),r}(e,X),i=Object(c.useRef)(0),o=a?150:void 0,u=Object(c.useRef)(n);Object(c.useEffect)(function(){u.current=n},[n]);var s=Object(c.useState)(0),l=Object(f.a)(s,2),m=l[0],d=l[1];Object(c.useEffect)(function(){n.playing||d(0)},[n.playing]);var b=Object(c.useRef)(m);Object(c.useEffect)(function(){b.current=m},[m]);var v=function(){d(function(e){return(e+1)%u.current.signature.numerator.length})},h=Object(c.useCallback)(function(e){t(function(n){var t=z.a(e.currentBeat,function(n){return Object(g.a)({},n,Object(K.a)({},e.divisions,e.divisionIndex))},n),a=e.currentBeat-1;if(a<0){if(1===n.length)return t;a=u.current.signature.numerator.length-1}return z.a(a,function(e){return Object.keys(e).reduce(function(e,n){return Object(g.a)({},e,Object(K.a)({},n,void 0))},{})},t)})},[t]),j=Object(c.useCallback)(function(e,n){!function e(n,t,a){var r=n.currentTime;t<=r?a():setTimeout(function(){return e(n,t,a)},(t-r)/2*1e3)}(e,n.time,function(){u.current.playing&&h(n)})},[h]);Object(c.useEffect)(function(){if(void 0!==o&&void 0!==e&&void 0!==r){var n=new H.a,t=e.currentTime+.3;i.current=t;var a=function(){var t=u.current.signature.numerator,a=t[Math.min(b.current,t.length-1)];$(u.current,i,a,b.current,e.currentTime,.3,r,n,v),function(e,n,t,a){for(var r=t.currentTime+n+Q;e.peekFront()&&e.peekFront().time<r;){var i=e.shift();0===i.divisionIndex&&1!==i.divisions||Y(t,i),a(t,i)}}(n,o/1e3,e,j)};a();var c=setInterval(a,o);return function(){clearInterval(c)}}},[o,r,e,t,h,j])},ee=function(e){return e.map(function(e){return q.a(function(){},e)})},ne=function(e){return U.a(10,250,e)},te=function(e){var n=Object(c.useState)(!1),t=Object(f.a)(n,2),r=t[0],i=t[1],o=function(e,n){var t=Object(f.a)(e,2),a=t[0],r=t[1],i=Object(c.useCallback)(function(e){r(function(t){return n(e instanceof Function?e(t):e)})},[n,r]);return x(n,r),[a,i]}(M(a.BPM,90),ne),u=Object(f.a)(o,2),s=u[0],l=u[1],m=M(a.TimeSignature,{denominator:4,numerator:[{1:!0},{1:!0},{1:!0}]}),d=Object(f.a)(m,2),b=d[0],v=d[1],g=M(a.ActiveBeats,ee(b.numerator)),h=Object(f.a)(g,2),j=h[0],p=h[1],O={bpm:s,playing:r,signature:b,activeDivisions:j},w=b.numerator,k=Object(c.useRef)(s);Object(c.useEffect)(function(){k.current=s},[s]),Object(c.useEffect)(function(){p(ee(w))},[w,b,p]),Object(c.useEffect)(function(){r||(p(ee(w)),setTimeout(function(){p(ee(w))},300))},[r,w,p]),Z(e,O,p);return{toggleStart:function(){return i(E.a)},setSignature:v,start:Object(c.useCallback)(function(e){void 0!==e&&l(e),i(!0)},[i,l]),stop:Object(c.useCallback)(function(){i(!1)},[i]),setBPM:l,addBPM:function(e){l(J.a(e))},state:O}},ae=t(81),re=t(82),ie=t(47),ce=t(83),oe=t(78),ue=t(79),se=ae.a(function(e){return re.a(2,e)},ie.a(function(e){var n=Object(f.a)(e,2),t=n[0];return n[1]-t}),ce.a,oe.a(6e4),Math.trunc),le=function(e){var n=e.setBPM,t=Object(c.useState)([]),a=Object(f.a)(t,2),r=a[0],i=a[1];return o.a.createElement(B,{isLink:!0,onClick:function(){var e=performance.now(),t=ue.a(e,r).filter(function(n){return e-n<3e3});if(t.length>1){var a=se(t);n(a)}i(t)}},"Tap In")},fe={0:"A",1:"Bb",2:"B",3:"C",4:"Db",5:"D",6:"Eb",7:"E",8:"F",9:"Gb",10:"G",11:"Ab"},me=[],de=-4;de<4;de++)for(var be=0;be<12;be++){var ve=440*Math.pow(2,de),ge=ve/1200,he=ve*Math.pow(2,be/12),je=de+4,pe=fe[be];me.push({octave:je,note:pe,frequency:he,centsPerOctave:ge})}var Oe=function(){var e=Object(c.useState)(),n=Object(f.a)(e,2),t=n[0],a=n[1],r=Object(c.useState)(),i=Object(f.a)(r,2)[1],u=Object(c.useState)(),s=Object(f.a)(u,2),l=s[0],m=s[1],d=Object(c.useState)(440),b=Object(f.a)(d,2),v=b[0],g=b[1];Object(c.useRef)(null);Object(c.useEffect)(function(){var e=new AudioContext;m(e.sampleRate);var n=navigator.mediaDevices;return n&&n.getUserMedia({audio:!0}).then(function(n){var t=e.createAnalyser();t.fftSize=8192,e.createMediaStreamSource(n).connect(t),a(t)}),function(){e.close()}},[]),Object(c.useLayoutEffect)(function(){var e,n=function(){var e=t.frequencyBinCount,n=new Float32Array(e);t.getFloatFrequencyData(n),i(n);var r=n.reduce(function(e,n,t){return e[0]<n?[n,t]:e},[-1/0,-1]),c=Object(f.a)(r,2)[1],o=l/t.fftSize;g(o*c),a()},a=function(){e=requestAnimationFrame(n)};if(void 0!==t)return a(),function(){cancelAnimationFrame(e)}},[t,l]);var h=function(e){for(var n=0,t=0;t<me.length;t++)if(me[t].frequency>=e){n=t;break}var a=n+1,r=me[n],i=me[a],c=(r.frequency+i.frequency)/2,o=me[a],u=o.frequency-e;e<c&&(o=me[n]);var s=o.centsPerOctave*u;return Object.assign(o,{originalFrequency:e,difference:u,cents:s})}(v||0),j=h.octave,p=h.note,O=h.cents;return o.a.createElement("div",{className:"box"},o.a.createElement("div",{className:"has-text-centered"},o.a.createElement("div",{className:"is-size-1"},p+j),o.a.createElement("div",null,O.toFixed(2)," Cents ",O<0?"flat":"sharp")),!1)};function Ee(){var e=Object(l.a)(["\n  align-self: center;\n  margin: auto;\n  z-index: 1;\n  pointer-events: none;\n"]);return Ee=function(){return e},e}function we(){var e=Object(l.a)(["\n  width: 100px;\n  height: 100px;\n  border-radius: 100px;\n  position: absolute;\n  touch-action: none;\n"]);return we=function(){return e},e}function ke(){var e=Object(l.a)(["\n  margin: auto;\n  position: relative;\n  height: 300px;\n  width: 300px;\n  border-radius: 300px;\n  display: flex;\n  margin-bottom: 10px;\n"]);return ke=function(){return e},e}var ye,Se=m.a.div(ke()),Me=m.a.div(we()),Ce=m.a.div(Ee()),xe=function(e){var n=e.size,t=void 0===n?300:n,r=e.initialValue,i=e.addDiff,u=e.children,s=M(a.Radians,r*(3*Math.PI)/2),l=Object(f.a)(s,2),m=l[0],d=l[1],b=Object(c.useRef)(Math.PI);Object(c.useEffect)(function(){b.current=m},[m]);var v=Object(c.useState)(!1),g=Object(f.a)(v,2),h=g[0],j=g[1],p=Object(c.useRef)(!1);Object(c.useEffect)(function(){p.current=h},[h]);var O=Object(c.useState)(0),E=Object(f.a)(O,2),w=E[0],k=E[1],y=Object(c.useRef)(0);Object(c.useEffect)(function(){y.current=w},[w]);var S=Object(c.useRef)(null),C=Object(c.useCallback)(function(e){j(!1)},[]),x=Object(c.useCallback)(function(e){Math.abs(y.current)<.2?k(function(n){return n+e}):(i(y.current>0?-1:1),k(0))},[i]),N=Object(c.useCallback)(function(e){var n=e.clientX,t=e.clientY,a=S.current.getBoundingClientRect(),r=a.left+a.width/2,i=-(a.top+a.height/2-t),c=-(r-n),o=Math.atan2(i,c),u=b.current-o;u<-Math.PI?u=-b.current-o:u>Math.PI&&(u=b.current- -o),0!==u&&x(u),o===b.current||d(o)},[x,d]),D=Object(c.useCallback)(function(e){p.current&&N(e)},[N]);Object(c.useEffect)(function(){return window.addEventListener("mouseup",C),window.addEventListener("mousemove",D),function(){window.removeEventListener("mouseup",C),window.removeEventListener("mousemove",D)}},[D,C]);var A=t/2+Math.sin(m)*(t/4)+Math.sin(m)*t/16-t/6,B=t/2+Math.cos(m)*(t/4)+Math.cos(m)*t/16-t/6;return o.a.createElement(Se,{ref:S,className:"has-background-primary"},o.a.createElement(Me,{className:"has-background-info",onMouseDown:function(e){j(!0),e.preventDefault()},onTouchMove:function(e){var n=e.changedTouches[0];N(n)},style:{top:A,left:B}}),o.a.createElement(Ce,null,u))};!function(e){e.NOT_STARTED="Not Started",e.LEARNING="Learning",e.KNOWN="Known"}(ye||(ye={}));var Ne=function(e,n){return De(e,n)[0]},De=function(e,n){var t=[];return Object.entries(e).forEach(function(e){var a=Object(f.a)(e,2)[1];Object.entries(a).forEach(function(e){var a=Object(f.a)(e,2)[1];n(a)&&t.push(a)})}),t},Ae=function(){var e={},n=function(n){var t,a=Object(f.a)(n,2),r=a[0],i=a[1],c=e[r];void 0===c&&(c={},e[r]=c),c[i]={scaleKey:t=n,pitch:t[0],mode:t[1],known:!1,learning:!1,bpm:60}},t=!0,a=!1,r=void 0;try{for(var i,c=k[Symbol.iterator]();!(t=(i=c.next()).done);t=!0){n(i.value)}}catch(o){a=!0,r=o}finally{try{t||null==c.return||c.return()}finally{if(a)throw r}}return e},Be=function(e){var n=Object(f.a)(e.scaleKey,2),t=n[0],a=n[1],r=e.learning,i=e.known,c=e.toggleLearning,u=e.toggleKnown;return o.a.createElement("div",{className:"is-grouped field has-addons"},o.a.createElement("div",{className:"is-size-5 control is-expanded"},t," ",a),o.a.createElement(F,null,o.a.createElement(A,{on:i,isInfo:!0,onClick:u},"Known"),o.a.createElement(A,{on:r,isLink:!0,onClick:c},"Learning")))};var Fe=function(e){var n=e.scalesDB,t=e.addBPM,a=e.reset,r=e.scaleMode,i=e.startMetronome,u=Object(c.useState)(function(){return function(e){var n,t,a;for(a=e.length-1;a>0;a--)n=Math.floor(Math.random()*(a+1)),t=e[a],e[a]=e[n],e[n]=t;return e}(De(n,function(e){return r===ye.LEARNING?e.learning:r===ye.KNOWN&&e.known}).map(function(e){return e.scaleKey}))}),s=Object(f.a)(u,2),l=s[0],m=s[1],d=l[0]||[],b=Ne(n,function(e){return e.mode===d[1]&&e.pitch===d[0]});Object(c.useEffect)(function(){void 0!==b&&i(b.bpm)},[b,i]);var v=l.length>1?"Next Scale":"Finish";if(0===l.length)return o.a.createElement("div",null,"No more scales");var g=b,h=g,j=h.mode,p=h.pitch,O=h.bpm;return o.a.createElement("div",null,o.a.createElement("div",{style:{alignSelf:"center",fontWeight:"bold"},className:"control is-expanded is-size-5"},r),o.a.createElement("div",{style:{display:"flex",marginBottom:"5px"}},o.a.createElement("div",{style:{alignSelf:"center",marginRight:"10px"}},p," ",j," @ ",O,"bpm"),o.a.createElement(F,{style:{flexGrow:1}},o.a.createElement(B,{isDanger:!0,isOutlined:!0,grow:!0,onClick:t(g,-10)},"-10"),o.a.createElement(B,{isDanger:!0,isOutlined:!0,grow:!0,onClick:t(g,-1)},"-"),o.a.createElement(B,{isPrimary:!0,isOutlined:!0,grow:!0,onClick:t(g,1)},"+"),o.a.createElement(B,{isPrimary:!0,isOutlined:!0,grow:!0,onClick:t(g,10)},"+10"))),o.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},o.a.createElement(B,{isDanger:!0,isOutlined:!0,onClick:a},"Stop"),o.a.createElement(B,{isPrimary:!0,onClick:function(){m(function(e){var n=e.slice(1);return 0===n.length&&a(),n})}},v)))},_e=function(e){var n=e.startMetronome,t=e.stopMetronome,i=M(a.ScalesDB,Ae),u=Object(f.a)(i,2),s=u[0],l=u[1],m=Object(c.useState)(ye.NOT_STARTED),d=Object(f.a)(m,2),b=d[0],v=d[1];Object(c.useEffect)(function(){b===ye.NOT_STARTED&&t()},[b,t]);var g=function(e){var n=e.pitch,t=e.mode;return function(){l(p.a(O.a([n,t,"learning"]),E.a))}},h=function(e){var n=e.pitch,t=e.mode;return function(){l(p.a(O.a([n,t,"known"]),E.a))}},j=C(a.ShowKnown,!1),w=Object(f.a)(j,2),k=w[0],y=w[1];return o.a.createElement("div",{className:"box",style:{marginTop:"10px"}},b===ye.NOT_STARTED?o.a.createElement("div",{style:{marginBottom:"5px"}},o.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},o.a.createElement("div",{style:{alignSelf:"center",fontWeight:"bold"},className:"control is-expanded is-size-5"},"Scales"),o.a.createElement(F,null,o.a.createElement(B,{onClick:function(){return v(ye.KNOWN)},disabled:void 0===Ne(s,function(e){return e.known}),className:"is-info is-outlined"},"Start Known"),o.a.createElement(B,{onClick:function(){return v(ye.LEARNING)},disabled:void 0===Ne(s,function(e){return e.learning}),className:"is-link is-outlined"},"Start Learning"))),o.a.createElement("hr",null),o.a.createElement(F,null,o.a.createElement(B,{onClick:y,className:"".concat(k?"is-primary is-outlined":"is-danger")},k?"Hide Known":"Show Known")),De(s,function(e){return e.mode===r.Major&&(!!k||!1===e.known)}).map(function(e){return o.a.createElement(Be,Object.assign({key:"".concat(e.pitch,"-").concat(e.mode)},e,{toggleLearning:g(e),toggleKnown:h(e)}))}),o.a.createElement("hr",null),De(s,function(e){return e.mode===r.Minor&&(!!k||!1===e.known)}).map(function(e){return o.a.createElement(Be,Object.assign({key:"".concat(e.pitch,"-").concat(e.mode)},e,{toggleLearning:g(e),toggleKnown:h(e)}))})):o.a.createElement(Fe,{scaleMode:b,startMetronome:n,addBPM:function(e,n){var t=e.pitch,a=e.mode;return function(){l(p.a(O.a([t,a,"bpm"]),J.a(n)))}},scalesDB:s,reset:function(){return v(ye.NOT_STARTED)}}))};function Pe(){var e=Object(l.a)([""]);return Pe=function(){return e},e}function Te(){var e=Object(l.a)(["\n  display: flex;\n"]);return Te=function(){return e},e}var Ie=m.a.section(Te()),Le=function(){var e=Object(c.useState)(),n=Object(f.a)(e,2),t=n[0],r=n[1],i=C(a.WakeLock,!1),u=Object(f.a)(i,2),s=u[0],l=u[1],m=C(a.ShowScales,!1),d=Object(f.a)(m,2),b=d[0],g=d[1],h=C(a.ShowTuner,!1),j=Object(f.a)(h,2),p=j[0],O=j[1],E=C(a.ShowDial,!0),w=Object(f.a)(E,2),k=w[0],y=w[1],M=function(){var e=Object(c.useState)(new S.a),n=Object(f.a)(e,1)[0];return{lock:Object(c.useCallback)(function(){n.enable()},[n]),release:Object(c.useCallback)(function(){n.disable()},[n])}}(),x=M.lock,N=M.release,D=te(t),B=D.state,_=B.playing,P=B.signature,T=B.bpm,I=B.activeDivisions,L=D.start,R=D.stop,K=D.toggleStart,W=D.setSignature,z=D.setBPM,q=D.addBPM;return Object(c.useEffect)(function(){s&&_?x():N()},[_,s,x,N]),Object(c.useEffect)(function(){_&&void 0===t&&r(new AudioContext)},[_,t]),o.a.createElement(Re,null,o.a.createElement(Ie,{className:"buttons"},o.a.createElement(A,{grow:!0,isPrimary:!0,on:s,onClick:l},"Keep Awake"),o.a.createElement(A,{grow:!0,isPrimary:!0,on:k,onClick:y},"Dial"),o.a.createElement(A,{grow:!0,isPrimary:!0,on:b,onClick:g},"Scales"),o.a.createElement(A,{grow:!0,isPrimary:!0,on:p,onClick:O},"Tuner")),k&&o.a.createElement("section",{className:"section"},o.a.createElement(xe,{initialValue:T,addDiff:q},o.a.createElement("div",{className:"has-text-centered is-size-1"},T),o.a.createElement(v,{bpm:T}))),o.a.createElement(G,{playing:_,signature:P,setSignature:W,activeBeats:I}),o.a.createElement("section",{className:"section"},o.a.createElement(F,null,o.a.createElement(le,{setBPM:z}),o.a.createElement(A,{on:!_,offClass:"is-danger",grow:!0,isOutlined:!0,isPrimary:!0,onClick:K},o.a.createElement(o.a.Fragment,null,"Start"),o.a.createElement(o.a.Fragment,null,"Stop")))),b&&o.a.createElement(_e,{startMetronome:L,stopMetronome:R}),p&&o.a.createElement(Oe,null))},Re=m.a.div(Pe()),Ge=t(31),Ke=t(14),We=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function ze(e){if("serviceWorker"in navigator){if(new URL("/metronome",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var n="".concat("/metronome","/service-worker.js");We?(!function(e,n){fetch(e).then(function(t){var a=t.headers.get("content-type");404===t.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):qe(e,n)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(n,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):qe(n,e)})}}function qe(e,n){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}function Ue(){var e=Object(l.a)(["\n  position: absolute;\n  max-width: ",";\n  width: 95%;\n  margin-top: 10px;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  z-index: 10;\n  display: flex !important;\n  justify-content: space-between;\n  animation: ease-in 1s ",";\n"]);return Ue=function(){return e},e}function Je(){var e=Object(l.a)(["\n    from {\n      opacity: 0;\n    }\n    to {\n      opacity: 1;\n    }\n"]);return Je=function(){return e},e}var Ve=Object(m.b)(Je()),He=m.a.section(Ue(),"40em",Ve),Xe=function(){var e=Object(c.useState)(!1),n=Object(f.a)(e,2),t=n[0],a=n[1],r=o.a.useCallback(function(){window.location.reload()},[]),i=o.a.useCallback(function(){a(!1)},[]);return Object(c.useEffect)(function(){ze({onUpdate:function(){a(!0)}})}),o.a.createElement(o.a.Fragment,null,t&&o.a.createElement(He,{className:"box"},o.a.createElement("span",null,"An Update is Available!"),o.a.createElement(F,null,o.a.createElement(B,{isPrimary:!0,isOutlined:!0,onClick:r},"Refresh"),o.a.createElement(B,{isDanger:!0,isOutlined:!0,onClick:i},"x"))))};function Ye(){var e=Object(l.a)(["\n  display: flex;\n  justify-content: flex-end;\n  margin-top: 5px;\n"]);return Ye=function(){return e},e}function $e(){var e=Object(l.a)(["\n  max-width: ",";\n  margin: 0 auto;\n  > * {\n    padding-left: 10px;\n    padding-right: 10px;\n  }\n"]);return $e=function(){return e},e}function Qe(){var e=Object(l.a)(["\n  padding-top: 10px;\n  padding-bottom: 10px;\n  margin-bottom: 10px;\n  > h2 {\n    margin: 0 !important;\n  }\n"]);return Qe=function(){return e},e}var Ze=m.a.section(Qe()),en=function(){return o.a.createElement(Ze,{className:"has-background-primary has-text-light"},o.a.createElement("h2",{className:"is-size-2"},"(mjh)tronome"),o.a.createElement(Ge.b,{style:{display:"none"},to:"/"},"Home"))},nn=m.a.div($e(),"40em"),tn=m.a.div(Ye()),an=function(e){var n=e.children;return o.a.createElement(nn,null,o.a.createElement(Xe,null),o.a.createElement(en,null),n,o.a.createElement(tn,null,"v".concat("1.0.7")))},rn=function(){return o.a.createElement(Ge.a,null,o.a.createElement(an,null,o.a.createElement(Ke.a,{exact:!0,path:"/",component:Le})))};t(70);s.a.render(o.a.createElement(rn,null),document.getElementById("root"))}},[[50,1,2]]]);
//# sourceMappingURL=main.d79839c4.chunk.js.map