(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{58:function(e,n,t){e.exports=t(81)},72:function(e,n,t){e.exports=t.p+"static/media/click.b48ed3e5.wav"},80:function(e,n,t){},81:function(e,n,t){"use strict";t.r(n);var a=t(43),r=t(44),i=t(55),o=t(45),c=t(57),u=t(0),s=t.n(u),l=t(23),f=t.n(l),m=t(1),d=t(3),g=t(8),v=t(82),b=g.List([{name:"Larghissimo",low:0,high:24},{name:"Grave",low:25,high:45},{name:"Largo",low:40,high:60},{name:"Lento",low:45,high:60},{name:"Larghetto",low:60,high:66},{name:"Adagio",low:66,high:76},{name:"Andante",low:76,high:108},{name:"Marcia moderato",low:83,high:85},{name:"Andante moderato",low:92,high:112},{name:"Moderato",low:108,high:120},{name:"Allegro",low:120,high:156},{name:"Vivace",low:156,high:176},{name:"Vivacissimo",low:172,high:176},{name:"Allegrissimo",low:172,high:176},{name:"Presto",low:168,high:200},{name:"Prestissimo",low:200,high:250}]),h=v.a(function(e){return""+e},function(e){return b.filter(function(n){var t,a,r=n.high,i=n.low;return t=r,(a=e)>=i&&a<=t})}),p=s.a.memo(function(e){var n=e.name,t=e.low,a=e.high;return s.a.createElement("div",{className:"has-text-centered"},n," - ",t," - ",a)}),E=s.a.memo(function(e){var n=e.bpm,t=h(n);return s.a.createElement("div",{style:{minHeight:"6.5em"}},t.map(function(e){var n=e.name,t=e.high,a=e.low;return s.a.createElement(p,{key:"marking-".concat(n),name:n,high:t,low:a})}))},function(e,n){var t=e.bpm,a=n.bpm;return h(t).equals(h(a))}),j=t(9),O=t(92),w=t(4),k=t(30),S=t(83),x=t(31),y=t.n(x);function M(){var e=Object(d.a)(["\n  &:not(:last-child) {\n    margin-bottom: 0 !important;\n  }\n"]);return M=function(){return e},e}var C,N,A,I=["offIsPrimary","offIsLink","offIsDanger","offIsInfo","offIsSuccess","offIsOutlined"],D=["isPrimary","isLink","isDanger","isInfo","isSuccess","isOutlined"],F=function(e){var n=e.on,t=Object(k.a)(e,["on"]),a=s.a.useMemo(function(){var e=n?I:D;return S.a(e,t)},[n,t]),r=s.a.useMemo(function(){return t.children instanceof Array&&2===t.children.length?n?t.children[0]:t.children[1]:t.children},[t,n]);return s.a.createElement(B,a,r)},B=function(e){var n=e.isPrimary,t=e.isDanger,a=e.isLink,r=e.isInfo,i=e.isSuccess,o=e.isOutlined,c=e.offIsPrimary,u=e.offIsDanger,l=e.offIsLink,f=e.offIsInfo,m=e.offIsSuccess,d=e.offIsOutlined,g=e.grow,v=e.className,b=Object(k.a)(e,["isPrimary","isDanger","isLink","isInfo","isSuccess","isOutlined","offIsPrimary","offIsDanger","offIsLink","offIsInfo","offIsSuccess","offIsOutlined","grow","className"]),h=s.a.useMemo(function(){return y()("button",v,{"is-primary":n||c,"is-link":a||l,"is-danger":t||u,"is-info":r||f,"is-success":i||m,"is-outlined":o||d,"is-grow":g})},[v,g,n,c,a,l,t,u,r,f,o,d,i,m]),p=s.a.useMemo(function(){return Object(j.a)({},b,{className:h})},[b,h]);return s.a.createElement("button",p,b.children)},L=w.a.div(M()),T=function(e){var n=e.children,t=e.hasAddons,a=e.ref,r=e.className,i=e.grow,o=Object(k.a)(e,["children","hasAddons","ref","className","grow"]),c=s.a.useMemo(function(){return y()(r,"buttons",{"has-addons":t,"is-grow":i})},[t,i,r]);return s.a.createElement(L,Object.assign({ref:a},o,{className:c}),n)},P=t(84),_=t(48),R=window.AudioContext||window.webkitAudioContext||void 0;!function(e){e.EnabledDivisions="@mjh/k/enabled-divisions-0",e.AppSettings="@mjh/k/app-settings-0",e.SignatureDivisions="@mjh/k/signature-divisions-3",e.ShowKnown="@mjh/k/show-known-2",e.ScalesDB="@mjh/k/scales-db-2",e.ActiveBeats="@mjh/k/active-beats-2",e.TimeSignature="@mjh/k/signature-3",e.BPM="@mjh/k/bpm-0",e.KnownScales="@mjh/k/known-scales-0",e.ShowScales="@mjh/k/show-scales-0",e.ShowTuner="@mjh/k/show-tuner-0",e.ShowDial="@mjh/k/show-dial-0",e.Radians="@mjh/k/radians-0",e.WakeLock="@mjh/k/wake-lock-0"}(C||(C={})),function(e){e.Major="Major",e.Minor="Minor"}(N||(N={})),function(e){e.A="A",e.B="B",e.C="C",e.D="D",e.E="E",e.F="F",e.G="G",e.A_Flat="Ab",e.B_Flat="Bb",e.C_Flat="Cb",e.D_Flat="Db",e.E_Flat="Eb",e.F_Flat="Fb",e.G_Flat="Gb",e.A_Sharp="A#",e.B_Sharp="B#",e.C_Sharp="C#",e.D_Sharp="D#",e.E_Sharp="E#",e.F_Sharp="F#",e.G_Sharp="G#"}(A||(A={}));var z=[[A.A,N.Major],[A.B,N.Major],[A.C,N.Major],[A.D,N.Major],[A.E,N.Major],[A.F,N.Major],[A.G,N.Major],[A.A_Flat,N.Major],[A.B_Flat,N.Major],[A.C_Flat,N.Major],[A.D_Flat,N.Major],[A.E_Flat,N.Major],[A.G_Flat,N.Major],[A.C_Sharp,N.Major],[A.F_Sharp,N.Major],[A.A,N.Minor],[A.B,N.Minor],[A.C,N.Minor],[A.D,N.Minor],[A.E,N.Minor],[A.F,N.Minor],[A.G,N.Minor],[A.A_Flat,N.Minor],[A.B_Flat,N.Minor],[A.E_Flat,N.Minor],[A.A_Sharp,N.Minor],[A.C_Sharp,N.Minor],[A.D_Sharp,N.Minor],[A.F_Sharp,N.Minor],[A.G_Sharp,N.Minor]],K=t(28),G=t(49),W=t.n(G),q=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=Object(u.useState)(function(){var a,r=localStorage.getItem(e);return a=null===r||void 0===r||t?n instanceof Function?n():n:K.fromJSON(r),window.localStorage.setItem(e,K.toJSON(a)),a}),r=Object(m.a)(a,2),i=r[0],o=r[1];return[i,Object(u.useCallback)(function(n){o(function(t){var a=n instanceof Function?n(t):n;return window.localStorage.setItem(e,K.toJSON(a)),a})},[e])]},J=function(e,n){var t=q(e,n),a=Object(m.a)(t,2),r=a[0],i=a[1];return[r,Object(u.useCallback)(function(){i(P.a)},[i])]},U=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(e){},t=Object(u.useState)(e),a=Object(m.a)(t,2),r=a[0],i=a[1];return[r,Object(u.useCallback)(function(){return i(function(e){var t=!e;return n(t),t})},[n])]},V=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];var a=Object(u.useRef)(n);Object(u.useEffect)(function(){var e=a.current,t=n;e.forEach(function(e,n){var a=t[n];if(a!==e){var r=_.detailedDiff(e,a);console.log("Change at argument index: ".concat(n),r)}}),a.current=n},[n])};function H(){var e=Object(d.a)(["\n  display: flex;\n  flex-grow: 1;\n  margin-bottom: 10px;\n"]);return H=function(){return e},e}function Y(){var e=Object(d.a)(["\n  display: flex;\n  flex-grow: 1;\n  flex-direction: column;\n"]);return Y=function(){return e},e}function X(){var e=Object(d.a)(["\n  display: flex;\n  flex-grow: 1;\n"]);return X=function(){return e},e}function $(){var e=Object(d.a)(["\n  width: 1px;\n  margin-left: 1px;\n  margin-right: 1px;\n  flex-grow: 1;\n"]);return $=function(){return e},e}function Q(){var e=Object(d.a)(["\n  display: flex;\n  align-items: baseline;\n  > div {\n    margin-right: 10px;\n  }\n"]);return Q=function(){return e},e}var Z=s.a.memo(w.a.section(Q())),ee=s.a.memo(function(e){var n=e.uiEnabledDivisions,t=e.toggleDivisionOption,a=e.clearDivisions;return s.a.createElement(Z,null,s.a.createElement("div",{className:"is-size-5"},"Division"),s.a.createElement(T,{hasAddons:!0,grow:!0,style:{marginRight:"5px"}},[2,3,4,5,6].map(function(e){var a=n.get(e);return s.a.createElement(F,{grow:!0,on:a,isPrimary:!0,key:"division-options-".concat(e),onClick:function(){return t(e)}},e)})),s.a.createElement(B,{grow:!0,isDanger:!0,isOutlined:!0,onClick:a},"Clear"))}),ne=s.a.memo(function(e){var n=e.setCurrentNumerator,t=e.currentNumerator;return s.a.createElement("section",{className:"section buttons is-centered"},[1,2,3,4,5].map(function(e){var a=t===e;return s.a.createElement(F,{key:"numerator-button-".concat(e),on:a,isPrimary:!0,isOutlined:!0,grow:!0,onClick:a?function(){}:function(){return n(e)}},s.a.createElement(s.a.Fragment,null,e,"/4"))}))}),te=s.a.memo(w.a.div($())),ae=s.a.memo(w.a.div(X())),re=s.a.memo(w.a.div(Y())),ie=s.a.memo(w.a.div(H())),oe=s.a.memo(function(e){var n=e.on,t=e.beatRows,a=s.a.useMemo(function(){return n?"has-background-primary":"has-background-link"},[n]),r=s.a.useMemo(function(){return 70/t},[t]);return s.a.createElement(te,{className:a,style:{height:r,marginTop:1}})}),ce=s.a.memo(function(e){var n=e.bools,t=e.beatNumber,a=e.rowIndex,r=e.beatRows,i=a,o=t;return s.a.createElement(ae,{key:"".concat(o,"-").concat(i)},n.map(function(e,n){return s.a.createElement(oe,{beatRows:r,key:"".concat(o,"-").concat(a,"-").concat(n),on:e})}))}),ue=s.a.memo(function(e){var n=e.beat,t=e.index,a=n.entrySeq();return s.a.createElement(re,{key:"".concat(t)},a.map(function(e,n){var r=Object(m.a)(e,2),i=r[0],o=r[1];return s.a.createElement(ce,{beatRows:a.size||0,key:"".concat(t,"-").concat(n),divisions:i,bools:o,beatNumber:t,rowIndex:n})}))}),se=s.a.memo(function(e){var n=e.activeBeats;return s.a.createElement(ie,null,n.map(function(e,n){return s.a.createElement(ue,{key:n,beat:e,index:n})}))}),le=function(e){var n=e.metronome,t=s.a.useMemo(function(){return n.setSignature},[n.setSignature]),a=s.a.useMemo(function(){return n.state.activeBeats},[n.state.activeBeats]),r=s.a.useMemo(function(){return n.state.signature.numerator},[n.state.signature.numerator]),i=Object(u.useState)(!1),o=Object(m.a)(i,2),c=o[0],l=o[1],f=q(C.EnabledDivisions,g.Map().set(1,!0)),d=Object(m.a)(f,2),v=d[0],b=d[1];Object(u.useEffect)(function(){c&&t(function(e){return Object(j.a)({},e,{numerator:g.List(O.a(0,e.numerator.size).map(function(){return v}))})})},[v,c,t]);var h=Object(u.useCallback)(function(e){l(!0),b(function(n){var t=n.get(e),a=void 0===t||!t;return n.set(e,a)})},[b]),p=Object(u.useCallback)(function(){b(g.Map().set(1,!0))},[b]),E=s.a.useState(r.size),w=Object(m.a)(E,2),k=w[0],S=w[1];return s.a.useEffect(function(){t(function(e){return Object(j.a)({},e,{numerator:g.List(O.a(0,k).map(function(){return v}))})})},[k,t,v]),s.a.createElement(s.a.Fragment,null,s.a.createElement(se,{activeBeats:a}),s.a.createElement(ee,{uiEnabledDivisions:v,toggleDivisionOption:h,clearDivisions:p}),s.a.createElement(ne,{currentNumerator:r.size,setCurrentNumerator:S}))},fe=t(89),me=t(90),de=t(88),ge=t(91),ve=t(85),be=t(86),he=fe.a(function(e){return me.a(2,e)},de.a(function(e){var n=Object(m.a)(e,2),t=n[0];return n[1]-t}),ge.a,ve.a(6e4),Math.trunc),pe=function(e){var n=e.setBPM,t=Object(u.useState)([]),a=Object(m.a)(t,2),r=a[0],i=a[1];return s.a.createElement(B,{isLink:!0,isOutlined:!0,onClick:function(){var e=performance.now(),t=be.a(e,r).filter(function(n){return e-n<3e3});if(t.length>1){var a=he(t);n(a)}i(t)}},"Tap In")};function Ee(){var e=Object(d.a)(["\n  margin-top: 10px;\n"]);return Ee=function(){return e},e}for(var je={0:"A",1:"Bb",2:"B",3:"C",4:"Db",5:"D",6:"Eb",7:"E",8:"F",9:"Gb",10:"G",11:"Ab"},Oe=[],we=-4;we<4;we++)for(var ke=0;ke<12;ke++){var Se=440*Math.pow(2,we),xe=Se/1200,ye=Se*Math.pow(2,ke/12),Me=we+4,Ce=je[ke];Oe.push({octave:Me,note:Ce,frequency:ye,centsPerOctave:xe})}var Ne=s.a.memo(function(){var e=U(!1),n=Object(m.a)(e,2),t=n[0],a=n[1],r=Object(u.useState)(),i=Object(m.a)(r,2),o=i[0],c=i[1],l=Object(u.useState)(),f=Object(m.a)(l,2),d=f[0],g=f[1],v=Object(u.useState)(440),b=Object(m.a)(v,2),h=b[0],p=b[1],E=Object(u.useState)(),j=Object(m.a)(E,2),O=j[0],w=j[1];Object(u.useEffect)(function(){t&&!O&&void 0!==R&&w(new R)},[t,O]),Object(u.useEffect)(function(){if(t&&O){g(O.sampleRate);var e,n=navigator.mediaDevices;if(n)return n.getUserMedia({audio:!0}).then(function(n){e=n;var t=O.createAnalyser();t.fftSize=8192,O.createMediaStreamSource(n).connect(t),c(t)}),function(){e.getAudioTracks().forEach(function(e){return e.stop()})}}},[t,O]),Object(u.useEffect)(function(){if(t&&o&&d){var e=function(){var e=o.frequencyBinCount,n=new Float32Array(e);o.getFloatFrequencyData(n);var t=n.reduce(function(e,n,t){return e[0]<n?[n,t]:e},[-1/0,-1]),a=Object(m.a)(t,2)[1],r=d/o.fftSize;p(r*a)};e();var n=setInterval(e,50);return function(){clearInterval(n)}}},[t,o,d]);var k=function(e){for(var n=0,t=0;t<Oe.length;t++)if(Oe[t].frequency>=e){n=t;break}var a=n+1,r=Oe[n],i=Oe[a],o=(r.frequency+i.frequency)/2,c=Oe[a],u=c.frequency-e;e<o&&(c=Oe[n]);var s=c.centsPerOctave*u;return Object.assign(c,{originalFrequency:e,difference:u,cents:s})}(h||0),S=k.octave,x=k.note,y=k.cents;return s.a.createElement(Ae,{className:"box has-text-centered"},s.a.createElement("div",{className:"is-size-1"},t?x+S:"Stopped"),s.a.createElement("div",null,t?s.a.createElement(s.a.Fragment,null,y.toFixed(2)," Cents ",y<0?"flat":"sharp"):"press start to tune"),s.a.createElement(T,{className:"is-right"},s.a.createElement(F,{on:t,isDanger:!0,offIsPrimary:!0,onClick:a},s.a.createElement(s.a.Fragment,null,"Stop"),s.a.createElement(s.a.Fragment,null,"Start"))))}),Ae=w.a.section(Ee()),Ie=Ne;function De(){var e=Object(d.a)(["\n  align-self: center;\n  margin: auto;\n  z-index: 1;\n  pointer-events: none;\n"]);return De=function(){return e},e}function Fe(){var e=Object(d.a)(["\n  width: 100px;\n  height: 100px;\n  border-radius: 100px;\n  position: absolute;\n  touch-action: none;\n"]);return Fe=function(){return e},e}function Be(){var e=Object(d.a)(["\n  margin: auto;\n  position: relative;\n  height: 300px;\n  width: 300px;\n  border-radius: 300px;\n  display: flex;\n  margin-bottom: 10px;\n"]);return Be=function(){return e},e}var Le=w.a.div(Be()),Te=w.a.div(Fe()),Pe=s.a.memo(w.a.div(De())),_e=function(e){var n=e.size,t=void 0===n?300:n,a=e.initialValue,r=e.addDiff,i=e.children,o=q(C.Radians,a*(3*Math.PI)/2),c=Object(m.a)(o,2),l=c[0],f=c[1],d=Object(u.useRef)(Math.PI);Object(u.useEffect)(function(){d.current=l},[l]);var g=Object(u.useState)(!1),v=Object(m.a)(g,2),b=v[0],h=v[1],p=Object(u.useRef)(!1);Object(u.useEffect)(function(){p.current=b},[b]);var E=Object(u.useState)(0),j=Object(m.a)(E,2),O=j[0],w=j[1],k=Object(u.useRef)(0);Object(u.useEffect)(function(){k.current=O},[O]);var S=Object(u.useRef)(null),x=Object(u.useCallback)(function(e){h(!0),e.preventDefault()},[]),y=Object(u.useCallback)(function(e){h(!1)},[]),M=Object(u.useCallback)(function(e){Math.abs(k.current)<.2?w(function(n){return n+e}):(r(k.current>0?-1:1),w(0))},[r]),N=Object(u.useCallback)(function(e){var n=e.clientX,t=e.clientY,a=S.current.getBoundingClientRect(),r=a.left+a.width/2,i=-(a.top+a.height/2-t),o=-(r-n),c=Math.atan2(i,o),u=d.current-c;u<-Math.PI?u=-d.current-c:u>Math.PI&&(u=d.current- -c),0!==u&&M(u),c===d.current||f(c)},[M,f]),A=Object(u.useCallback)(function(e){p.current&&N(e)},[N]);Object(u.useEffect)(function(){return window.addEventListener("mouseup",y),window.addEventListener("mousemove",A),function(){window.removeEventListener("mouseup",y),window.removeEventListener("mousemove",A)}},[A,y]);var I=Object(u.useCallback)(function(e){var n=e.changedTouches[0];N(n)},[N]),D=s.a.useMemo(function(){return t/2+Math.sin(l)*(t/4)+Math.sin(l)*t/16-t/6},[l,t]),F=s.a.useMemo(function(){return t/2+Math.cos(l)*(t/4)+Math.cos(l)*t/16-t/6},[l,t]);return s.a.createElement(Le,{ref:S,className:"has-background-primary"},s.a.createElement(Te,{className:"has-background-info",onMouseDown:x,onTouchMove:I,style:{top:D,left:F}}),s.a.createElement(Pe,null,i))},Re=t(54),ze=t(87),Ke=t(50),Ge=t(51),We=t.n(Ge);var qe=t(72),Je=function(e,n){var t=n.time,a=n.gain,r=n.buffer,i=n.pitch,o=n.currentBeat,c=n.divisionIndex,u=0===o&&0===c,s=e.createBufferSource();s.buffer=r,s.detune.value=u?0:-i;var l=e.createGain();l.gain.value=u?1:a,s.connect(l),l.connect(e.destination),s.start(t)},Ue=.1,Ve=function(e,n,t){var a=n.playing,r=function(e,n){var t=Object(u.useState)(),a=Object(m.a)(t,2),r=a[0],i=a[1];return Object(u.useEffect)(function(){void 0!==e&&"not-supported"!==e&&"pending"!==e&&fetch(n).then(function(e){return e.arrayBuffer()}).then(function(n){return e.decodeAudioData(n)}).then(i)},[n,e]),r}(e,qe),i=Object(u.useRef)(0),o=a?150:void 0,c=Object(u.useRef)(n);Object(u.useEffect)(function(){c.current=n},[n]);var s=Object(u.useState)(0),l=Object(m.a)(s,2),f=l[0],d=l[1];Object(u.useEffect)(function(){n.playing||d(0)},[n.playing]);var g=Object(u.useRef)(f);Object(u.useEffect)(function(){g.current=f},[f]);var v=function(){d(function(e){return(e+1)%c.current.signature.numerator.size})},b=Object(u.useCallback)(function(e){t(function(n){var t=n.getIn([e.currentBeat,e.divisions,e.divisionIndex]);return void 0===t?n:n.setIn([e.currentBeat,e.divisions,e.divisionIndex],!t)})},[t]),h=Object(u.useCallback)(function(e,n){!function(e,n,t){setTimeout(t,1e3*(n-e.currentTime))}(e,n.time,function(){c.current.playing&&b(n)})},[b]);Object(u.useEffect)(function(){if(void 0!==o&&void 0!==e&&"not-supported"!==e&&"pending"!==e&&void 0!==r){var n=new We.a,t=e.currentTime+.3;i.current=t;var a=function(){var t=c.current.signature.numerator,a=Math.min(g.current,t.size-1),u=t.get(a);!function(e,n,t,a,r,i,o,c,u){var s=60/e.bpm,l=t;if(n.current<r+i){var f=function(e,n,t,a,r){var i=[];return t.filter(function(e){return e}).forEach(function(t,o){for(var c=n/o,u=0;u<o;u++){var s={time:e+u*c,divisionLength:c,pitch:220,gain:.5,buffer:a,divisions:o,divisionIndex:u,currentBeat:r};i.push(s)}}),i.sort(function(e,n){return e.time-n.time}),i}(n.current,s,l,o,a);c.push.apply(c,Object(Re.a)(f)),n.current+=s,u()}}(c.current,i,u,g.current,e.currentTime,.3,r,n,v),function(e,n,t,a){for(var r=t.currentTime+n+Ue;e.peekFront()&&e.peekFront().time<r;){var i=e.shift();0===i.divisionIndex&&1!==i.divisions||Je(t,i),a(t,i)}}(n,o/1e3,e,h)};a();var u=setInterval(a,o);return function(){clearInterval(u)}}},[o,r,e,t,b,h])},He=function(e){return g.List(e.map(function(e){return e.reduce(function(e,n,t){return n?e.set(t,g.List(O.a(0,t).map(function(){return!0}))):e},g.Map())}))},Ye=function(e){return ze.a(10,250,e)},Xe=g.Map().set(1,!0),$e=function(e){var n=Object(u.useState)(!1),t=Object(m.a)(n,2),a=t[0],r=t[1],i=function(e,n){var t=Object(m.a)(e,2),a=t[0],r=t[1],i=Object(u.useCallback)(function(e){r(function(t){return n(e instanceof Function?e(t):e)})},[n,r]);return V(n,r),[a,i]}(q(C.BPM,90),Ye),o=Object(m.a)(i,2),c=o[0],l=o[1],f=q(C.TimeSignature,{denominator:4,numerator:g.List([Xe,Xe,Xe,Xe])}),d=Object(m.a)(f,2),v=d[0],b=d[1],h=Object(u.useState)(He(v.numerator)),p=Object(m.a)(h,2),E=p[0],j=p[1],O={bpm:c,playing:a,pending:"pending"===e,ready:void 0!==e&&"pending"!==e&&"not-supported"!==e,signature:v,activeBeats:E},w=v.numerator,k=Object(u.useRef)(c);Object(u.useEffect)(function(){k.current=c},[c]),Object(u.useEffect)(function(){j(He(w))},[w,v,j]),Object(u.useEffect)(function(){a||(j(He(w)),setTimeout(function(){j(He(w))},300))},[a,w,j]),Ve(e,O,j);var S=s.a.useCallback(function(e){l(Ke.a(e))},[l]);return{toggleStart:s.a.useCallback(function(){return r(P.a)},[r]),setSignature:b,start:Object(u.useCallback)(function(e){void 0!==e&&l(e),r(!0)},[r,l]),stop:Object(u.useCallback)(function(){r(!1)},[r]),setBPM:l,addBPM:S,state:O}};function Qe(){var e=Object(d.a)(["\n  margin: 0 !important;\n  height: 100%;\n  width: 100%;\n  position: fixed;\n  z-index: 1;\n  left: 0;\n  top: 0;\n  background-color: rgba(0, 0, 0, 0.8);\n  color: white;\n  text-align: center;\n"]);return Qe=function(){return e},e}var Ze=w.a.div(Qe()),en=s.a.memo(function(e){var n=e.showTuner,t=e.toggleTuner,a=e.playing,r=e.toggleStart,i=e.setBPM,o=e.pending;return s.a.createElement("section",{className:"section"},s.a.createElement(T,{hasAddons:!0},s.a.createElement(F,{isLink:!0,offIsOutlined:!0,offIsLink:!0,on:n,onClick:t},"Tuner"),s.a.createElement(pe,{setBPM:i}),s.a.createElement(F,{on:a,offIsPrimary:!0,grow:!0,isOutlined:!0,isDanger:!0,disabled:o,onClick:r},s.a.createElement(s.a.Fragment,null,"Stop"),s.a.createElement(s.a.Fragment,null,"Start"))))}),nn=function(e){var n=e.appSettings,t=e.audioContext,a=$e(t),r=n.state.keepAwake,i=J(C.ShowTuner,!1),o=Object(m.a)(i,2),c=o[0],l=o[1],f=function(){var e=Object(u.useState)(new W.a),n=Object(m.a)(e,1)[0];return{lock:Object(u.useCallback)(function(){n.enable()},[n]),release:Object(u.useCallback)(function(){n.disable()},[n])}}(),d=f.lock,g=f.release,v=s.a.useMemo(function(){return a.state.playing},[a.state.playing]),b=s.a.useMemo(function(){return a.state.bpm},[a.state.bpm]),h=s.a.useMemo(function(){return a.state.pending},[a.state.pending]),p=s.a.useMemo(function(){return a.addBPM},[a.addBPM]),j=s.a.useMemo(function(){return a.setBPM},[a.setBPM]),O=s.a.useMemo(function(){return a.toggleStart},[a.toggleStart]);return Object(u.useEffect)(function(){r&&v?d():g()},[v,r,d,g]),s.a.createElement(s.a.Fragment,null,h&&s.a.createElement(Ze,null,"Tap to enable audio."),c&&s.a.createElement(Ie,null),s.a.createElement("section",{className:"section"},s.a.createElement(_e,{initialValue:b,addDiff:p},s.a.createElement("div",{className:"has-text-centered is-size-1"},b),s.a.createElement(E,{bpm:b}))),s.a.createElement(le,{metronome:a}),s.a.createElement(en,{showTuner:c,toggleTuner:l,toggleStart:O,playing:v,setBPM:j,pending:h}))};function tn(){var e=Object(d.a)([""]);return tn=function(){return e},e}var an,rn=w.a.section(tn()),on=function(e){var n=e.appSettings,t=n.state.keepAwake,a=n.toggleKeepAwake;return s.a.createElement(rn,null,s.a.createElement("h2",{className:"is-size-4"},"Settings"),s.a.createElement("div",{className:"field"},s.a.createElement("div",{className:"control"},s.a.createElement("label",{className:"checkbox"},s.a.createElement("input",{style:{marginRight:"5px"},type:"checkbox",checked:t,onChange:a}),"Keep screen on while metronome is running."))))},cn=function(){return z.reduce(function(e,n){return function(e,n){return e.add({scaleKey:t=n,pitch:t[0],mode:t[1],known:!1,learning:!1,bpm:60});var t}(e,n)},g.Set())},un=function(e,n){return e.filter(n)},sn=function(){var e=q(C.ScalesDB,cn),n=Object(m.a)(e,2),t=n[0],a=n[1],r=s.a.useCallback(function(){throw new Error("not implemented")},[]),i=s.a.useCallback(function(e){return function(e,n){return un(e,n).first()}(t,e)},[t]),o=s.a.useCallback(function(e){return un(t,e).sort(function(e,n){return e.scaleKey[0].localeCompare(n.scaleKey[0])})},[t]);return{addBPM:s.a.useCallback(function(e,n){var r=t.get(e);r&&a(t.remove(r).add(Object(j.a)({},r,{bpm:r.bpm+n})))},[t,a]),toggleLearning:s.a.useCallback(function(e){var n=t.get(e);n&&a(t.remove(n).add(Object(j.a)({},n,{learning:!n.learning})))},[t,a]),toggleKnown:s.a.useCallback(function(e){var n=t.get(e);n&&a(t.remove(n).add(Object(j.a)({},n,{known:!n.known})))},[t,a]),addScale:r,getScale:i,getScales:o}};!function(e){e.NOT_STARTED="not-started",e.KNOWN="known",e.LEARNING="learning"}(an||(an={}));var ln=function(e){var n=Object(m.a)(e.scaleKey,2),t=n[0],a=n[1],r=e.learning,i=e.known,o=e.toggleLearning,c=e.toggleKnown;return s.a.createElement("div",{className:"is-grouped field has-addons"},s.a.createElement("div",{className:"is-size-5 control is-expanded"},t," ",a),s.a.createElement(T,null,s.a.createElement(F,{on:i,isInfo:!0,onClick:c},"Known"),s.a.createElement(F,{on:r,isLink:!0,onClick:o},"Learning")))},fn=function(e){var n=e.scales,t=e.reset,a=e.scaleMode,r=e.metronome,i=n.getScales,o=n.getScale,c=n.addBPM,u=s.a.useState(function(){return function(e){var n,t,a;for(a=e.length-1;a>0;a--)n=Math.floor(Math.random()*(a+1)),t=e[a],e[a]=e[n],e[n]=t;return e}(i(function(e){return a===an.LEARNING?e.learning:a===an.KNOWN&&e.known}).valueSeq().map(function(e){return e.scaleKey}).toArray())}),l=Object(m.a)(u,2),f=l[0],d=l[1],g=s.a.useCallback(r.start,[r.start]),v=f[0]||[],b=o(function(e){return e.mode===v[1]&&e.pitch===v[0]});s.a.useEffect(function(){void 0!==b&&g(b.bpm)},[b,g]);var h=f.length>1?"Next Scale":"Finish";if(0===f.length)return s.a.createElement("div",null,"No more scales");var p=b,E=p,j=E.mode,O=E.pitch,w=E.bpm;return s.a.createElement(s.a.Fragment,null,s.a.createElement("div",{className:"box"},s.a.createElement("div",{style:{alignSelf:"center",fontWeight:"bold"},className:"control is-expanded is-size-5"},a),s.a.createElement("div",{style:{display:"flex",marginBottom:"5px"}},s.a.createElement("div",{style:{alignSelf:"center",marginRight:"10px"}},O," ",j," @ ",w,"bpm"),s.a.createElement(T,{grow:!0,hasAddons:!0},s.a.createElement(B,{isDanger:!0,isOutlined:!0,grow:!0,onClick:function(){return c(p,-10)}},"-10"),s.a.createElement(B,{isDanger:!0,isOutlined:!0,grow:!0,onClick:function(){return c(p,-1)}},"-"),s.a.createElement(B,{isPrimary:!0,isOutlined:!0,grow:!0,onClick:function(){return c(p,1)}},"+"),s.a.createElement(B,{isPrimary:!0,isOutlined:!0,grow:!0,onClick:function(){return c(p,10)}},"+10"))),s.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},s.a.createElement(B,{isDanger:!0,isOutlined:!0,onClick:t},"Stop"),s.a.createElement(B,{isPrimary:!0,onClick:function(){d(function(e){var n=e.slice(1);return 0===n.length&&t(),n})}},h))),s.a.createElement(le,{metronome:r}))},mn=function(e){var n=e.audioContext,t=$e(n),a=t.stop,r=s.a.useState(an.NOT_STARTED),i=Object(m.a)(r,2),o=i[0],c=i[1],u=J(C.ShowKnown,!1),l=Object(m.a)(u,2),f=l[0],d=l[1];s.a.useEffect(function(){o===an.NOT_STARTED&&a()},[o,a]);var g=sn(),v=g.getScale,b=g.getScales,h=g.toggleLearning,p=g.toggleKnown;return s.a.createElement("div",{style:{marginTop:"10px"}},o===an.NOT_STARTED?s.a.createElement("div",{style:{marginBottom:"5px"}},s.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},s.a.createElement("div",{style:{alignSelf:"center",fontWeight:"bold"},className:"control is-expanded is-size-5"},"Scales"),s.a.createElement(T,null,s.a.createElement(B,{onClick:function(){return c(an.KNOWN)},disabled:void 0===v(function(e){return e.known}),className:"is-info is-outlined"},"Start Known"),s.a.createElement(B,{onClick:function(){return c(an.LEARNING)},disabled:void 0===v(function(e){return e.learning}),className:"is-link is-outlined"},"Start Learning"))),s.a.createElement("hr",null),s.a.createElement(T,null,s.a.createElement(B,{onClick:d,className:"".concat(f?"is-primary is-outlined":"is-danger")},f?"Hide Known":"Show Known")),b(function(e){return e.mode===N.Major&&(!!f||!1===e.known)}).map(function(e){return s.a.createElement(ln,Object.assign({key:"".concat(e.pitch,"-").concat(e.mode)},e,{toggleLearning:function(){return h(e)},toggleKnown:function(){return p(e)}}))}),s.a.createElement("hr",null),b(function(e){return e.mode===N.Minor&&(!!f||!1===e.known)}).map(function(e){return s.a.createElement(ln,Object.assign({key:"".concat(e.pitch,"-").concat(e.mode)},e,{toggleLearning:function(){return h(e)},toggleKnown:function(){return p(e)}}))})):s.a.createElement(fn,{scaleMode:o,scales:g,reset:function(){return c(an.NOT_STARTED)},metronome:t}))},dn=t(29),gn=t(15),vn=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function bn(e){if("serviceWorker"in navigator){if(new URL("/metronome",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var n="".concat("/metronome","/service-worker.js");vn?(!function(e,n){fetch(e).then(function(t){var a=t.headers.get("content-type");404===t.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):hn(e,n)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(n,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):hn(n,e)})}}function hn(e,n){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}function pn(){var e=Object(d.a)(["\n  position: absolute;\n  max-width: ",";\n  width: 95%;\n  margin-top: 10px;\n  left: 0;\n  right: 0;\n  margin-left: auto !important;\n  margin-right: auto !important;\n  z-index: 10;\n  display: flex !important;\n  justify-content: space-between;\n  animation: ease-in 1s ",";\n"]);return pn=function(){return e},e}function En(){var e=Object(d.a)(["\n    from {\n      opacity: 0;\n    }\n    to {\n      opacity: 1;\n    }\n"]);return En=function(){return e},e}var jn=Object(w.b)(En()),On=w.a.section(pn(),"40em",jn),wn=!1,kn=function(){var e=Object(u.useState)(!1),n=Object(m.a)(e,2),t=n[0],a=n[1],r=s.a.useCallback(function(){window.location.reload()},[]),i=s.a.useCallback(function(){a(!1)},[]);return Object(u.useEffect)(function(){wn||bn({onUpdate:function(){a(!0)}}),wn=!0},[]),s.a.createElement(s.a.Fragment,null,t&&s.a.createElement(On,{className:"box"},s.a.createElement("span",null,"An Update is Available!"),s.a.createElement(T,null,s.a.createElement(B,{isPrimary:!0,isOutlined:!0,onClick:r},"Refresh"),s.a.createElement(B,{isDanger:!0,isOutlined:!0,onClick:i},"x"))))},Sn=function(){return{keepAwake:!1}},xn=t(34),yn=t(21);function Mn(){var e=Object(d.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  justify-content: flex-end;\n  margin-top: 5px;\n"]);return Mn=function(){return e},e}function Cn(){var e=Object(d.a)(["\n  max-width: ",";\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  > * {\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n"]);return Cn=function(){return e},e}function Nn(){var e=Object(d.a)(["\n  margin-left: 5px;\n"]);return Nn=function(){return e},e}function An(){var e=Object(d.a)([""]);return An=function(){return e},e}function In(){var e=Object(d.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  padding-right: 10px;\n  align-self: flex-end;\n  > a {\n    animation: ease-in 0.3s ",";\n    font-size: 1.5rem;\n  }\n"]);return In=function(){return e},e}function Dn(){var e=Object(d.a)(["\n  from {\nfont-size: 0px;\n  }\n"]);return Dn=function(){return e},e}function Fn(){var e=Object(d.a)(["\n  display: flex;\n  padding-top: 5px;\n  padding-bottom: 5px;\n  padding-left: 10px;\n  padding-right: 10px;\n  justify-content: space-between;\n  > h2 {\n    margin: 0 !important;\n  }\n"]);return Fn=function(){return e},e}function Bn(){var e=Object(d.a)(["\n  align-self: center;\n"]);return Bn=function(){return e},e}function Ln(){var e=Object(d.a)(["\n  margin-bottom: 10px;\n  margin-left: 0px !important;\n  margin-right: 0px !important;\n  display: flex;\n  flex-direction: column;\n"]);return Ln=function(){return e},e}var Tn=s.a.memo(w.a.section(Ln())),Pn=s.a.memo(w.a.span(Bn())),_n=s.a.memo(w.a.section(Fn())),Rn=Object(w.b)(Dn()),zn=s.a.memo(w.a.nav(In(),Rn)),Kn=s.a.memo(Object(w.a)(dn.b)(An())),Gn=s.a.memo(Object(w.a)(xn.a)(Nn())),Wn=s.a.memo(function(){var e=U(!1),n=Object(m.a)(e,2),t=n[0],a=n[1];return s.a.createElement(Tn,null,s.a.createElement(_n,{className:"has-background-primary has-text-light"},s.a.createElement(dn.b,{to:"/",className:"has-text-white"},s.a.createElement("h2",{className:"is-size-4 is-bold"},"(mjh)tronome")),s.a.createElement(Pn,{onClick:a},s.a.createElement(xn.a,{icon:yn.a,size:"2x"}))),t&&s.a.createElement(zn,{onClick:a},s.a.createElement(Kn,{to:"/"},"Home",s.a.createElement(Gn,{icon:yn.c})),s.a.createElement(Kn,{to:"/scales"},"Scales",s.a.createElement(Gn,{icon:yn.d})),s.a.createElement(Kn,{to:"/settings"},"Settings",s.a.createElement(Gn,{icon:yn.b}))))}),qn=s.a.memo(w.a.div(Cn(),"40em")),Jn=s.a.memo(w.a.div(Mn())),Un=s.a.memo(function(e){var n=e.children;return s.a.createElement(qn,null,s.a.createElement(kn,null),s.a.createElement(Wn,null),n,s.a.createElement(Jn,null,"v".concat("1.0.21")))}),Vn=function(){var e=function(){var e=q(C.AppSettings,Sn),n=Object(m.a)(e,2),t=n[0],a=n[1];return{state:t,toggleKeepAwake:s.a.useCallback(function(){a(function(e){return Object(j.a)({},e,{keepAwake:!e.keepAwake})})},[a])}}(),n=function(){var e=s.a.useState(),n=Object(m.a)(e,2),t=n[0],a=n[1],r=s.a.useRef(),i=s.a.useState(!1),o=Object(m.a)(i,2),c=o[0],l=o[1],f=Object(u.useCallback)(function(){c||void 0!==r.current&&(a("pending"),r.current.resume().then(function(){l(!0),a(r.current),document.removeEventListener("touchstart",f),document.removeEventListener("click",f),document.removeEventListener("touchend",f)}))},[c,l]);return s.a.useEffect(function(){if(void 0===R)a("not-supported");else{var e=new R;r.current=e,"suspended"===e.state?(document.addEventListener("touchstart",f),document.addEventListener("click",f),document.addEventListener("touchend",f)):a(e)}},[f]),t}();return s.a.createElement(dn.a,{basename:"/metronome"},s.a.createElement(Un,null,"not-supported"===n&&s.a.createElement("div",null,"Your browser doesn't support the audioContext api, so this will not work. Sorry :("),s.a.createElement(gn.a,{exact:!0,path:"/",render:function(){return s.a.createElement(nn,{audioContext:n,appSettings:e})}}),s.a.createElement(gn.a,{exact:!0,path:"/scales",render:function(){return s.a.createElement(mn,{audioContext:n})}}),s.a.createElement(gn.a,{exact:!0,path:"/settings",render:function(){return s.a.createElement(on,{appSettings:e})}})))},Hn=(t(80),function(e){function n(e){var t;return Object(a.a)(this,n),(t=Object(i.a)(this,Object(o.a)(n).call(this,e))).state={error:void 0},t}return Object(c.a)(n,e),Object(r.a)(n,[{key:"render",value:function(){return this.state.error?s.a.createElement("div",null,s.a.createElement("h1",null,"Something went wrong"),s.a.createElement("hr",null),s.a.createElement("code",null,this.state.error instanceof Error&&this.state.error.name),s.a.createElement("hr",null),s.a.createElement("code",null,this.state.error instanceof Error&&this.state.error.message),s.a.createElement("hr",null),s.a.createElement("code",null,this.state.error instanceof Error&&this.state.error.stack),s.a.createElement("hr",null),s.a.createElement("code",null,JSON.stringify(this.state.error,void 0,"  "))):this.props.children}}],[{key:"getDerivedStateFromError",value:function(e){return{error:e}}}]),n}(s.a.Component));f.a.render(s.a.createElement(Hn,null,s.a.createElement(Vn,null)),document.getElementById("root"))}},[[58,1,2]]]);
//# sourceMappingURL=main.0ef9d984.chunk.js.map