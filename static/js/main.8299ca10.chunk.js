(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{65:function(e,n,t){e.exports=t(89)},80:function(e,n,t){e.exports=t.p+"static/media/click.b48ed3e5.wav"},88:function(e,n,t){},89:function(e,n,t){"use strict";t.r(n);var a,r,i,o=t(51),c=t(52),u=t(62),l=t(53),s=t(63),m=t(0),f=t.n(m),d=t(23),g=t.n(d),v=t(1),h=t(4),p=t(10),b=t(92),E=t(9),j=t(30);!function(e){e.EnabledDivisions="@mjh/k/enabled-divisions-0",e.AppSettings="@mjh/k/app-settings-0",e.SignatureDivisions="@mjh/k/signature-divisions-3",e.ShowKnown="@mjh/k/show-known-2",e.ScalesDB="@mjh/k/scales-db-2",e.ActiveBeats="@mjh/k/active-beats-2",e.TimeSignature="@mjh/k/signature-3",e.BPM="@mjh/k/bpm-0",e.KnownScales="@mjh/k/known-scales-0",e.ShowScales="@mjh/k/show-scales-0",e.ShowTuner="@mjh/k/show-tuner-0",e.ShowDial="@mjh/k/show-dial-0",e.Radians="@mjh/k/radians-0",e.WakeLock="@mjh/k/wake-lock-0"}(a||(a={})),function(e){e.Major="Major",e.Minor="Minor"}(r||(r={})),function(e){e.A="A",e.B="B",e.C="C",e.D="D",e.E="E",e.F="F",e.G="G",e.A_Flat="Ab",e.B_Flat="Bb",e.C_Flat="Cb",e.D_Flat="Db",e.E_Flat="Eb",e.F_Flat="Fb",e.G_Flat="Gb",e.A_Sharp="A#",e.B_Sharp="B#",e.C_Sharp="C#",e.D_Sharp="D#",e.E_Sharp="E#",e.F_Sharp="F#",e.G_Sharp="G#"}(i||(i={}));var S=[[i.A,r.Major],[i.B,r.Major],[i.C,r.Major],[i.D,r.Major],[i.E,r.Major],[i.F,r.Major],[i.G,r.Major],[i.A_Flat,r.Major],[i.B_Flat,r.Major],[i.C_Flat,r.Major],[i.D_Flat,r.Major],[i.E_Flat,r.Major],[i.G_Flat,r.Major],[i.C_Sharp,r.Major],[i.F_Sharp,r.Major],[i.A,r.Minor],[i.B,r.Minor],[i.C,r.Minor],[i.D,r.Minor],[i.E,r.Minor],[i.F,r.Minor],[i.G,r.Minor],[i.A_Flat,r.Minor],[i.B_Flat,r.Minor],[i.E_Flat,r.Minor],[i.A_Sharp,r.Minor],[i.C_Sharp,r.Minor],[i.D_Sharp,r.Minor],[i.F_Sharp,r.Minor],[i.G_Sharp,r.Minor]],O=t(33),w=t(91),k=t(61),y=t(100),x=t(90),C=(t(55),window.AudioContext||window.webkitAudioContext||void 0),M=t(21),A=t(56),N=t.n(A),I=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=Object(m.useState)(function(){var a,r=localStorage.getItem(e);return a=null===r||void 0===r||t?n instanceof Function?n():n:M.fromJSON(r),window.localStorage.setItem(e,M.toJSON(a)),a}),r=Object(v.a)(a,2),i=r[0],o=r[1];return[i,Object(m.useCallback)(function(n){o(function(t){var a=n instanceof Function?n(t):n;return window.localStorage.setItem(e,M.toJSON(a)),a})},[e])]},F=function(e,n){var t=I(e,n),a=Object(v.a)(t,2),r=a[0],i=a[1];return[r,Object(m.useCallback)(function(){i(x.a)},[i])]},D=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(e){},t=Object(m.useState)(e),a=Object(v.a)(t,2),r=a[0],i=a[1];return[r,Object(m.useCallback)(function(){return i(function(e){var t=!e;return n(t),t})},[n])]},B=t(57),L=t.n(B);var T,P=function(e,n){var t=localStorage.getItem(e);return null===t?n:M.fromJSON(t)},_=function(e,n){localStorage.setItem(e,M.toJSON(n))},z=t(80),R=function(e,n){var t=n.time,a=n.gain,r=n.buffer,i=n.pitch,o=n.currentBeat,c=n.divisionIndex,u=0===o&&0===c,l=e.createBufferSource();l.buffer=r,l.detune.value=u?0:-i;var s=e.createGain();s.gain.value=u?1:a,l.connect(s),s.connect(e.destination),l.start(t)},K=-1,G=.1,W=function(e){var n=oe(function(e){return e.metronomeState.playing}),t=function(e,n){var t=Object(m.useState)(),a=Object(v.a)(t,2),r=a[0],i=a[1];return Object(m.useEffect)(function(){void 0!==e&&"not-supported"!==e&&"pending"!==e&&fetch(n).then(function(e){return e.arrayBuffer()}).then(function(n){return e.decodeAudioData(n)}).then(i)},[n,e]),r}(e,z),a=Object(m.useRef)(0),r=n?150:void 0,i=Object(m.useRef)(0);Object(m.useEffect)(function(){n||(i.current=0)},[n]);var o=f.a.useCallback(function(){var e=i.current;i.current=(e+1)%ie.getState().metronomeState.signature.numerator.size},[]),c=Object(m.useCallback)(function(e,n){!function(e,n,t){setTimeout(t,1e3*(n-e.currentTime))}(e,n.time,function(){ie.getState().metronomeState.playing&&$(n)})},[]);Object(m.useEffect)(function(){if(void 0!==r&&void 0!==e&&"not-supported"!==e&&"pending"!==e&&void 0!==t){var n=new L.a,u=e.currentTime+.3;a.current=u;var l=function(){var u=ie.getState().metronomeState.signature.numerator,l=Math.min(i.current,u.size-1),s=u.get(l);void 0!==s&&function(e,n,t,a,r,i,o,c,u){var l=60/e,s=t;if(n.current<r+i){var m=function(e,n,t,a,r){var i=[];return t.filter(function(e){return e}).forEach(function(t,o){for(var c=n/o,u=0;u<o;u++){var l={time:e+u*c,divisionLength:c,pitch:220,gain:.5,buffer:a,divisions:o,divisionIndex:u,currentBeat:r};i.push(l)}}),i.sort(function(e,n){return e.time-n.time}),i}(n.current,l,s,o,a);c.push.apply(c,Object(k.a)(m)),n.current+=l,u()}}(ie.getState().metronomeState.bpm,a,s,i.current,e.currentTime,.3,t,n,o),function(e,n,t,a){for(var r=t.currentTime+n+G;e.peekFront()&&e.peekFront().time<r;){var i=e.shift();i.time!==K&&R(t,i),K=i.time,a(t,i)}}(n,r/1e3,e,c)};l();var s=setInterval(l,r);return function(){clearInterval(s)}}},[r,t,e,c,o])},q=function(e){var n=oe(function(e){return e.metronomeState.playing});f.a.useEffect(function(){if(n)return function(){ee()}},[n]);var t=oe(function(e){return e.metronomeState.signature.numerator});Object(m.useEffect)(function(){X()},[t]),Object(m.useEffect)(function(){n||X()},[n]),f.a.useEffect(function(){"pending"!==e&&void 0!==e&&J(!1)},[e]),W(e)};!function(e){e[e.UpdateActiveBeats=0]="UpdateActiveBeats",e[e.SetActiveBeats=1]="SetActiveBeats",e[e.SetSignature=2]="SetSignature",e[e.SetPending=3]="SetPending",e[e.SetPlaying=4]="SetPlaying",e[e.SetBpm=5]="SetBpm"}(T||(T={}));var U=function(e){var n=e instanceof Function?e(ie.getState().metronomeState.signature):e;_(a.TimeSignature,n),ie.dispatch({type:T.SetSignature,action:n})},J=function(e){ie.dispatch({type:T.SetPending,action:e})},H=function(e){ie.dispatch({type:T.SetPlaying,action:e})},V=function(e){var n=re(e instanceof Function?e(ie.getState().metronomeState.bpm):e);_(a.BPM,n),ie.dispatch({type:T.SetBpm,action:n})},Y=function(e){V(function(n){return n+e})},X=function(){var e,n;n=ie.getState().metronomeState.signature.numerator,e=p.List(n.map(function(e){return e.reduce(function(e,n,t){return n?e.set(t,p.List(y.a(0,t).map(function(){return!0}))):e},p.Map())})),ie.dispatch({type:T.SetActiveBeats,value:e})},$=function(e){ie.dispatch({type:T.UpdateActiveBeats,value:e})},Q=function(){H(function(e){return!e})},Z=function(e){void 0!==e&&V(e),H(!0)},ee=function(){H(!1)},ne=p.Map().set(1,!0),te={denominator:4,numerator:p.List([ne,ne,ne,ne])},ae={activeBeats:p.List(),metronomeState:{ready:!1,pending:!0,bpm:P(a.BPM,60),playing:!1,signature:P(a.TimeSignature,te)}},re=function(e){return w.a(10,250,e)},ie=j.b(function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:ae,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case T.SetActiveBeats:return Object(E.a)({},e,{activeBeats:n.value});case T.UpdateActiveBeats:var t=n.value,a=e.activeBeats.getIn([t.currentBeat,t.divisions,t.divisionIndex]);return void 0===a?e:Object(E.a)({},e,{activeBeats:e.activeBeats.setIn([t.currentBeat,t.divisions,t.divisionIndex],!a)});case T.SetSignature:return Object(E.a)({},e,{metronomeState:Object(E.a)({},e.metronomeState,{signature:n.action instanceof Function?n.action(e.metronomeState.signature):n.action})});case T.SetPending:return Object(E.a)({},e,{metronomeState:Object(E.a)({},e.metronomeState,{pending:n.action instanceof Function?n.action(e.metronomeState.pending):n.action})});case T.SetPlaying:return Object(E.a)({},e,{metronomeState:Object(E.a)({},e.metronomeState,{playing:n.action instanceof Function?n.action(e.metronomeState.playing):n.action})});case T.SetBpm:return Object(E.a)({},e,{metronomeState:Object(E.a)({},e.metronomeState,{bpm:n.action instanceof Function?n.action(e.metronomeState.bpm):n.action})});default:return n.type.startsWith("@@redux")||console.log(n,"was not handled"),e}}),oe=function(e,n){return O.b(e,n)},ce=p.List([{name:"Larghissimo",low:0,high:24},{name:"Grave",low:25,high:45},{name:"Largo",low:40,high:60},{name:"Lento",low:45,high:60},{name:"Larghetto",low:60,high:66},{name:"Adagio",low:66,high:76},{name:"Andante",low:76,high:108},{name:"Marcia moderato",low:83,high:85},{name:"Andante moderato",low:92,high:112},{name:"Moderato",low:108,high:120},{name:"Allegro",low:120,high:156},{name:"Vivace",low:156,high:176},{name:"Vivacissimo",low:172,high:176},{name:"Allegrissimo",low:172,high:176},{name:"Presto",low:168,high:200},{name:"Prestissimo",low:200,high:250}]),ue=b.a(function(e){return""+e},function(e){return ce.filter(function(n){var t,a,r=n.high,i=n.low;return t=r,(a=e)>=i&&a<=t})}),le=f.a.memo(function(e){var n=e.name,t=e.low,a=e.high;return f.a.createElement("div",{className:"has-text-centered"},n," - ",t," - ",a)}),se=f.a.memo(function(e){var n=e.bpm,t=ue(n);return f.a.createElement("div",{style:{minHeight:"6.5em"}},t.map(function(e){var n=e.name,t=e.high,a=e.low;return f.a.createElement(le,{key:"marking-".concat(n),name:n,high:t,low:a})}))},function(e,n){var t=e.bpm,a=n.bpm;return ue(t).equals(ue(a))}),me=function(){var e=oe(function(e){return e.metronomeState.bpm});return f.a.createElement(se,{bpm:e})},fe=t(5),de=t(37),ge=t(93),ve=t(39),he=t.n(ve);function pe(){var e=Object(h.a)(["\n  &:not(:last-child) {\n    margin-bottom: 0 !important;\n  }\n"]);return pe=function(){return e},e}var be=["offIsPrimary","offIsLink","offIsDanger","offIsInfo","offIsSuccess","offIsOutlined"],Ee=["isPrimary","isLink","isDanger","isInfo","isSuccess","isOutlined"],je=function(e){var n=e.on,t=Object(de.a)(e,["on"]),a=f.a.useMemo(function(){var e=n?be:Ee;return ge.a(e,t)},[n,t]),r=f.a.useMemo(function(){return t.children instanceof Array&&2===t.children.length?n?t.children[0]:t.children[1]:t.children},[t,n]);return f.a.createElement(Se,a,r)},Se=function(e){var n=e.isPrimary,t=e.isDanger,a=e.isLink,r=e.isInfo,i=e.isSuccess,o=e.isOutlined,c=e.offIsPrimary,u=e.offIsDanger,l=e.offIsLink,s=e.offIsInfo,m=e.offIsSuccess,d=e.offIsOutlined,g=e.grow,v=e.className,h=Object(de.a)(e,["isPrimary","isDanger","isLink","isInfo","isSuccess","isOutlined","offIsPrimary","offIsDanger","offIsLink","offIsInfo","offIsSuccess","offIsOutlined","grow","className"]),p=f.a.useMemo(function(){return he()("button",v,{"is-primary":n||c,"is-link":a||l,"is-danger":t||u,"is-info":r||s,"is-success":i||m,"is-outlined":o||d,"is-grow":g})},[v,g,n,c,a,l,t,u,r,s,o,d,i,m]),b=f.a.useMemo(function(){return Object(E.a)({},h,{className:p})},[h,p]);return f.a.createElement("button",b,h.children)},Oe=fe.a.div(pe()),we=function(e){var n=e.children,t=e.hasAddons,a=e.ref,r=e.className,i=e.grow,o=Object(de.a)(e,["children","hasAddons","ref","className","grow"]),c=f.a.useMemo(function(){return he()(r,"buttons",{"has-addons":t,"is-grow":i})},[t,i,r]);return f.a.createElement(Oe,Object.assign({ref:a},o,{className:c}),n)};function ke(){var e=Object(h.a)(["\n  display: flex;\n  flex-grow: 1;\n  margin-bottom: 10px;\n"]);return ke=function(){return e},e}function ye(){var e=Object(h.a)(["\n  display: flex;\n  flex-grow: 1;\n  flex-direction: column;\n"]);return ye=function(){return e},e}function xe(){var e=Object(h.a)(["\n  display: flex;\n  flex-grow: 1;\n"]);return xe=function(){return e},e}function Ce(){var e=Object(h.a)(["\n  width: 1px;\n  margin-left: 1px;\n  margin-right: 1px;\n  flex-grow: 1;\n"]);return Ce=function(){return e},e}function Me(){var e=Object(h.a)(["\n  display: flex;\n  align-items: baseline;\n  > div {\n    margin-right: 10px;\n  }\n"]);return Me=function(){return e},e}var Ae=f.a.memo(fe.a.section(Me())),Ne=f.a.memo(function(e){var n=e.uiEnabledDivisions,t=e.toggleDivisionOption,a=e.clearDivisions;return f.a.createElement(Ae,null,f.a.createElement("div",{className:"is-size-5"},"Division"),f.a.createElement(we,{hasAddons:!0,grow:!0,style:{marginRight:"5px"}},[2,3,4,5,6].map(function(e){var a=n.get(e);return f.a.createElement(je,{grow:!0,on:a,isPrimary:!0,key:"division-options-".concat(e),onClick:function(){return t(e)}},e)})),f.a.createElement(Se,{grow:!0,isDanger:!0,isOutlined:!0,onClick:a},"Clear"))}),Ie=f.a.memo(function(e){var n=e.setCurrentNumerator,t=e.currentNumerator;return f.a.createElement("section",{className:"section buttons is-centered"},[1,2,3,4,5].map(function(e){var a=t===e;return f.a.createElement(je,{key:"numerator-button-".concat(e),on:a,isPrimary:!0,isOutlined:!0,grow:!0,onClick:a?function(){}:function(){return n(e)}},f.a.createElement(f.a.Fragment,null,e,"/4"))}))}),Fe=f.a.memo(fe.a.div(Ce())),De=f.a.memo(fe.a.div(xe())),Be=f.a.memo(fe.a.div(ye())),Le=f.a.memo(fe.a.div(ke())),Te=f.a.memo(function(e){var n=e.height,t=e.beatIndex,a=e.division,r=e.divisionIndex,i=oe(function(e){return e.activeBeats.get(t).get(a).get(r)}),o=f.a.useMemo(function(){return i?"has-background-primary":"has-background-link"},[i]);return f.a.createElement(Fe,{className:o,style:{height:n,marginTop:1}})}),Pe=f.a.memo(function(e){var n=e.height,t=e.beatIndex,a=e.division;return f.a.createElement(De,null,y.a(0,a).map(function(e){return f.a.createElement(Te,{key:"".concat(t,"-").concat(a,"-").concat(e),height:n,beatIndex:t,division:a,divisionIndex:e})}))}),_e=f.a.memo(function(e){var n=e.beatIndex,t=oe(function(e){return e.activeBeats.get(n).keySeq()},function(e,n){return e.equals(n)});return f.a.createElement(Be,{key:"".concat(n)},t.map(function(e){return f.a.createElement(Pe,{height:70/t.size,key:"".concat(n,"-").concat(e),beatIndex:n,division:e})}))}),ze=f.a.memo(function(){var e=oe(function(e){return e.activeBeats.size});return f.a.createElement(Le,null,y.a(0,e).map(function(e){return f.a.createElement(_e,{key:e,beatIndex:e})}))}),Re=function(){var e=U,n=oe(function(e){return e.metronomeState.signature.numerator}),t=Object(m.useState)(!1),r=Object(v.a)(t,2),i=r[0],o=r[1],c=I(a.EnabledDivisions,p.Map().set(1,!0)),u=Object(v.a)(c,2),l=u[0],s=u[1];Object(m.useEffect)(function(){i&&e(function(e){return Object(E.a)({},e,{numerator:p.List(y.a(0,e.numerator.size).map(function(){return l}))})})},[l,i,e]);var d=Object(m.useCallback)(function(e){o(!0),s(function(n){var t=n.get(e),a=void 0===t||!t;return n.set(e,a)})},[s]),g=Object(m.useCallback)(function(){s(p.Map().set(1,!0))},[s]),h=f.a.useState(n.size),b=Object(v.a)(h,2),j=b[0],S=b[1];return f.a.useEffect(function(){e(function(e){return Object(E.a)({},e,{numerator:p.List(y.a(0,j).map(function(){return l}))})})},[j,e,l]),f.a.createElement(f.a.Fragment,null,f.a.createElement(ze,null),f.a.createElement(Ne,{uiEnabledDivisions:l,toggleDivisionOption:d,clearDivisions:g}),f.a.createElement(Ie,{currentNumerator:n.size,setCurrentNumerator:S}))},Ke=t(97),Ge=t(99),We=t(96),qe=t(98),Ue=t(94),Je=t(95),He=Ke.a(function(e){return Ge.a(2,e)},We.a(function(e){var n=Object(v.a)(e,2),t=n[0];return n[1]-t}),qe.a,Ue.a(6e4),Math.trunc),Ve=function(){var e=Object(m.useState)([]),n=Object(v.a)(e,2),t=n[0],a=n[1];return f.a.createElement(Se,{isLink:!0,isOutlined:!0,onClick:function(){var e=performance.now(),n=Je.a(e,t).filter(function(n){return e-n<3e3});if(n.length>1){var r=He(n);V(r)}a(n)}},"Tap In")};function Ye(){var e=Object(h.a)(["\n  margin-top: 10px;\n"]);return Ye=function(){return e},e}for(var Xe={0:"A",1:"Bb",2:"B",3:"C",4:"Db",5:"D",6:"Eb",7:"E",8:"F",9:"Gb",10:"G",11:"Ab"},$e=[],Qe=-4;Qe<4;Qe++)for(var Ze=0;Ze<12;Ze++){var en=440*Math.pow(2,Qe),nn=en/1200,tn=en*Math.pow(2,Ze/12),an=Qe+4,rn=Xe[Ze];$e.push({octave:an,note:rn,frequency:tn,centsPerOctave:nn})}var on=f.a.memo(function(){var e=D(!1),n=Object(v.a)(e,2),t=n[0],a=n[1],r=Object(m.useState)(),i=Object(v.a)(r,2),o=i[0],c=i[1],u=Object(m.useState)(),l=Object(v.a)(u,2),s=l[0],d=l[1],g=Object(m.useState)(440),h=Object(v.a)(g,2),p=h[0],b=h[1],E=Object(m.useState)(),j=Object(v.a)(E,2),S=j[0],O=j[1];Object(m.useEffect)(function(){t&&!S&&void 0!==C&&O(new C)},[t,S]),Object(m.useEffect)(function(){if(t&&S){d(S.sampleRate);var e,n=navigator.mediaDevices;if(n)return n.getUserMedia({audio:!0}).then(function(n){e=n;var t=S.createAnalyser();t.fftSize=8192,S.createMediaStreamSource(n).connect(t),c(t)}),function(){e.getAudioTracks().forEach(function(e){return e.stop()})}}},[t,S]),Object(m.useEffect)(function(){if(t&&o&&s){var e=function(){var e=o.frequencyBinCount,n=new Float32Array(e);o.getFloatFrequencyData(n);var t=n.reduce(function(e,n,t){return e[0]<n?[n,t]:e},[-1/0,-1]),a=Object(v.a)(t,2)[1],r=s/o.fftSize;b(r*a)};e();var n=setInterval(e,50);return function(){clearInterval(n)}}},[t,o,s]);var w=function(e){for(var n=0,t=0;t<$e.length;t++)if($e[t].frequency>=e){n=t;break}var a=n+1,r=$e[n],i=$e[a],o=(r.frequency+i.frequency)/2,c=$e[a],u=c.frequency-e;e<o&&(c=$e[n]);var l=c.centsPerOctave*u;return Object.assign(c,{originalFrequency:e,difference:u,cents:l})}(p||0),k=w.octave,y=w.note,x=w.cents;return f.a.createElement(cn,{className:"box has-text-centered"},f.a.createElement("div",{className:"is-size-1"},t?y+k:"Stopped"),f.a.createElement("div",null,t?f.a.createElement(f.a.Fragment,null,x.toFixed(2)," Cents ",x<0?"flat":"sharp"):"press start to tune"),f.a.createElement(we,{className:"is-right"},f.a.createElement(je,{on:t,isDanger:!0,offIsPrimary:!0,onClick:a},f.a.createElement(f.a.Fragment,null,"Stop"),f.a.createElement(f.a.Fragment,null,"Start"))))}),cn=fe.a.section(Ye()),un=on;function ln(){var e=Object(h.a)(["\n  align-self: center;\n  margin: auto;\n  z-index: 1;\n  pointer-events: none;\n"]);return ln=function(){return e},e}function sn(){var e=Object(h.a)(["\n  width: 100px;\n  height: 100px;\n  border-radius: 100px;\n  position: absolute;\n  touch-action: none;\n"]);return sn=function(){return e},e}function mn(){var e=Object(h.a)(["\n  margin: auto;\n  position: relative;\n  height: 300px;\n  width: 300px;\n  border-radius: 300px;\n  display: flex;\n  margin-bottom: 10px;\n"]);return mn=function(){return e},e}var fn=fe.a.div(mn()),dn=fe.a.div(sn()),gn=function(e){var n=e.container,t=e.addDiff,r=e.size,i=I(a.Radians,3*Math.PI/2),o=Object(v.a)(i,2),c=o[0],u=o[1],l=Object(m.useRef)(Math.PI);Object(m.useEffect)(function(){l.current=c},[c]);var s=Object(m.useCallback)(function(e){p(!0),e.preventDefault()},[]),d=Object(m.useState)(!1),g=Object(v.a)(d,2),h=g[0],p=g[1],b=Object(m.useRef)(!1);Object(m.useEffect)(function(){b.current=h},[h]);var E=Object(m.useState)(0),j=Object(v.a)(E,2),S=j[0],O=j[1],w=Object(m.useRef)(0);Object(m.useEffect)(function(){w.current=S},[S]);var k=Object(m.useCallback)(function(e){p(!1)},[]),y=Object(m.useCallback)(function(e){Math.abs(w.current)<.2?O(function(n){return n+e}):(t(w.current>0?-1:1),O(0))},[t]),x=Object(m.useCallback)(function(e){if(null!==n){var t=e.clientX,a=e.clientY,r=n.getBoundingClientRect(),i={x:r.left+r.width/2,y:r.top+r.height/2},o=-(i.y-a),c=-(i.x-t),s=Math.atan2(o,c),m=l.current-s;m<-Math.PI?m=-l.current-s:m>Math.PI&&(m=l.current- -s),0!==m&&y(m),s===l.current||u(s)}},[y,u,n]),C=Object(m.useCallback)(function(e){var n=e.changedTouches[0];x(n)},[x]),M=Object(m.useCallback)(function(e){b.current&&x(e)},[x]),A=function(e){var n=f.a.useState(e),t=Object(v.a)(n,2),a=t[0],r=t[1],i=f.a.useRef(e);return f.a.useEffect(function(){i.current=e},[e]),f.a.useEffect(function(){var e=-1,n=function(){t(),r(i.current)},t=function(){e=requestAnimationFrame(n)};return t(),function(){cancelAnimationFrame(e)}},[]),a}(c),N=f.a.useMemo(function(){return r/2+Math.sin(A)*(r/4)+Math.sin(A)*r/16-r/6},[A,r]),F=f.a.useMemo(function(){return r/2+Math.cos(A)*(r/4)+Math.cos(A)*r/16-r/6},[A,r]);return Object(m.useEffect)(function(){return window.addEventListener("mouseup",k),window.addEventListener("mousemove",M),function(){window.removeEventListener("mouseup",k),window.removeEventListener("mousemove",M)}},[M,k]),f.a.createElement(dn,{className:"has-background-info",onMouseDown:s,onTouchMove:C,style:{top:N,left:F}})},vn=f.a.memo(fe.a.div(ln())),hn=function(e){var n=e.size,t=void 0===n?300:n,a=e.addDiff,r=e.children,i=Object(m.useState)(null),o=Object(v.a)(i,2),c=o[0],u=o[1];return f.a.createElement(fn,{ref:u,className:"has-background-primary"},f.a.createElement(gn,{addDiff:a,container:c,size:t}),f.a.createElement(vn,null,r))};function pn(){var e=Object(h.a)(["\n  margin: 0 !important;\n  height: 100%;\n  width: 100%;\n  position: fixed;\n  z-index: 1;\n  left: 0;\n  top: 0;\n  background-color: rgba(0, 0, 0, 0.8);\n  color: white;\n  text-align: center;\n"]);return pn=function(){return e},e}var bn=fe.a.div(pn()),En=function(){var e=oe(function(e){return e.metronomeState.bpm});return f.a.createElement("div",{className:"has-text-centered is-size-1"},e)},jn=f.a.memo(function(){return f.a.createElement("section",{className:"section"},f.a.createElement(hn,{addDiff:Y},f.a.createElement(En,null),f.a.createElement(me,null)))}),Sn=f.a.memo(function(e){var n=e.showTuner,t=e.toggleTuner,a=oe(function(e){return e.metronomeState.playing}),r=oe(function(e){return e.metronomeState.pending});return f.a.createElement("section",{className:"section"},f.a.createElement(we,{hasAddons:!0},f.a.createElement(je,{isLink:!0,offIsOutlined:!0,offIsLink:!0,on:n,onClick:t},"Tuner"),f.a.createElement(Ve,null),f.a.createElement(je,{on:a,offIsPrimary:!0,grow:!0,isOutlined:!0,isDanger:!0,disabled:r,onClick:Q},f.a.createElement(f.a.Fragment,null,"Stop"),f.a.createElement(f.a.Fragment,null,"Start"))))}),On=function(e){var n=e.appSettings,t=e.audioContext,r=oe(function(e){return e.metronomeState.playing}),i=oe(function(e){return e.metronomeState.pending}),o=n.state.keepAwake;q(t),function(e){var n=Object(m.useState)(new N.a),t=Object(v.a)(n,1)[0];f.a.useEffect(function(){e?t.enable():t.disable()},[e,t])}(o&&r);var c=F(a.ShowTuner,!1),u=Object(v.a)(c,2),l=u[0],s=u[1];return f.a.createElement(f.a.Fragment,null,i&&f.a.createElement(bn,null,"Tap to enable audio."),l&&f.a.createElement(un,null),f.a.createElement(jn,null),f.a.createElement(Re,null),f.a.createElement(Sn,{showTuner:l,toggleTuner:s}))};function wn(){var e=Object(h.a)([""]);return wn=function(){return e},e}var kn,yn=fe.a.section(wn()),xn=function(e){var n=e.appSettings,t=n.state.keepAwake,a=n.toggleKeepAwake;return f.a.createElement(yn,null,f.a.createElement("h2",{className:"is-size-4"},"Settings"),f.a.createElement("div",{className:"field"},f.a.createElement("div",{className:"control"},f.a.createElement("label",{className:"checkbox"},f.a.createElement("input",{style:{marginRight:"5px"},type:"checkbox",checked:t,onChange:a}),"Keep screen on while metronome is running."))))},Cn=function(){return S.reduce(function(e,n){return function(e,n){return e.add({scaleKey:t=n,pitch:t[0],mode:t[1],known:!1,learning:!1,bpm:60});var t}(e,n)},p.Set())},Mn=function(e,n){return e.filter(n)},An=function(){var e=I(a.ScalesDB,Cn),n=Object(v.a)(e,2),t=n[0],r=n[1],i=f.a.useCallback(function(){throw new Error("not implemented")},[]),o=f.a.useCallback(function(e){return function(e,n){return Mn(e,n).first()}(t,e)},[t]),c=f.a.useCallback(function(e){return Mn(t,e).sort(function(e,n){return e.scaleKey[0].localeCompare(n.scaleKey[0])})},[t]);return{addBPM:f.a.useCallback(function(e,n){var a=t.get(e);a&&r(t.remove(a).add(Object(E.a)({},a,{bpm:a.bpm+n})))},[t,r]),toggleLearning:f.a.useCallback(function(e){var n=t.get(e);n&&r(t.remove(n).add(Object(E.a)({},n,{learning:!n.learning})))},[t,r]),toggleKnown:f.a.useCallback(function(e){var n=t.get(e);n&&r(t.remove(n).add(Object(E.a)({},n,{known:!n.known})))},[t,r]),addScale:i,getScale:o,getScales:c}};!function(e){e.NOT_STARTED="not-started",e.KNOWN="known",e.LEARNING="learning"}(kn||(kn={}));var Nn=function(e){var n=Object(v.a)(e.scaleKey,2),t=n[0],a=n[1],r=e.learning,i=e.known,o=e.toggleLearning,c=e.toggleKnown;return f.a.createElement("div",{className:"is-grouped field has-addons"},f.a.createElement("div",{className:"is-size-5 control is-expanded"},t," ",a),f.a.createElement(we,null,f.a.createElement(je,{on:i,isInfo:!0,onClick:c},"Known"),f.a.createElement(je,{on:r,isLink:!0,onClick:o},"Learning")))},In=function(e){var n=e.scales,t=e.reset,a=e.scaleMode,r=n.getScales,i=n.getScale,o=n.addBPM,c=f.a.useState(function(){return function(e){var n,t,a;for(a=e.length-1;a>0;a--)n=Math.floor(Math.random()*(a+1)),t=e[a],e[a]=e[n],e[n]=t;return e}(r(function(e){return a===kn.LEARNING?e.learning:a===kn.KNOWN&&e.known}).valueSeq().map(function(e){return e.scaleKey}).toArray())}),u=Object(v.a)(c,2),l=u[0],s=u[1],m=Z(),d=l[0]||[],g=i(function(e){return e.mode===d[1]&&e.pitch===d[0]});f.a.useEffect(function(){void 0!==g&&Z(g.bpm)},[g,m]);var h=l.length>1?"Next Scale":"Finish";if(0===l.length)return f.a.createElement("div",null,"No more scales");var p=g,b=p,E=b.mode,j=b.pitch,S=b.bpm;return f.a.createElement(f.a.Fragment,null,f.a.createElement("div",{className:"box"},f.a.createElement("div",{style:{alignSelf:"center",fontWeight:"bold"},className:"control is-expanded is-size-5"},a),f.a.createElement("div",{style:{display:"flex",marginBottom:"5px"}},f.a.createElement("div",{style:{alignSelf:"center",marginRight:"10px"}},j," ",E," @ ",S,"bpm"),f.a.createElement(we,{grow:!0,hasAddons:!0},f.a.createElement(Se,{isDanger:!0,isOutlined:!0,grow:!0,onClick:function(){return o(p,-10)}},"-10"),f.a.createElement(Se,{isDanger:!0,isOutlined:!0,grow:!0,onClick:function(){return o(p,-1)}},"-"),f.a.createElement(Se,{isPrimary:!0,isOutlined:!0,grow:!0,onClick:function(){return o(p,1)}},"+"),f.a.createElement(Se,{isPrimary:!0,isOutlined:!0,grow:!0,onClick:function(){return o(p,10)}},"+10"))),f.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},f.a.createElement(Se,{isDanger:!0,isOutlined:!0,onClick:t},"Stop"),f.a.createElement(Se,{isPrimary:!0,onClick:function(){s(function(e){var n=e.slice(1);return 0===n.length&&t(),n})}},h))),f.a.createElement(Re,null))},Fn=function(e){var n=e.audioContext;q(n);var t=f.a.useState(kn.NOT_STARTED),i=Object(v.a)(t,2),o=i[0],c=i[1],u=F(a.ShowKnown,!1),l=Object(v.a)(u,2),s=l[0],m=l[1];f.a.useEffect(function(){o===kn.NOT_STARTED&&ee()},[o]);var d=An(),g=d.getScale,h=d.getScales,p=d.toggleLearning,b=d.toggleKnown;return f.a.createElement("div",{style:{marginTop:"10px"}},o===kn.NOT_STARTED?f.a.createElement("div",{style:{marginBottom:"5px"}},f.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},f.a.createElement("div",{style:{alignSelf:"center",fontWeight:"bold"},className:"control is-expanded is-size-5"},"Scales"),f.a.createElement(we,null,f.a.createElement(Se,{onClick:function(){return c(kn.KNOWN)},disabled:void 0===g(function(e){return e.known}),className:"is-info is-outlined"},"Start Known"),f.a.createElement(Se,{onClick:function(){return c(kn.LEARNING)},disabled:void 0===g(function(e){return e.learning}),className:"is-link is-outlined"},"Start Learning"))),f.a.createElement("hr",null),f.a.createElement(we,null,f.a.createElement(Se,{onClick:m,className:"".concat(s?"is-primary is-outlined":"is-danger")},s?"Hide Known":"Show Known")),h(function(e){return e.mode===r.Major&&(!!s||!1===e.known)}).map(function(e){return f.a.createElement(Nn,Object.assign({key:"".concat(e.pitch,"-").concat(e.mode)},e,{toggleLearning:function(){return p(e)},toggleKnown:function(){return b(e)}}))}),f.a.createElement("hr",null),h(function(e){return e.mode===r.Minor&&(!!s||!1===e.known)}).map(function(e){return f.a.createElement(Nn,Object.assign({key:"".concat(e.pitch,"-").concat(e.mode)},e,{toggleLearning:function(){return p(e)},toggleKnown:function(){return b(e)}}))})):f.a.createElement(In,{scaleMode:o,scales:d,reset:function(){return c(kn.NOT_STARTED)}}))},Dn=t(36),Bn=t(20),Ln=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Tn(e){if("serviceWorker"in navigator){if(new URL("/metronome",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var n="".concat("/metronome","/service-worker.js");Ln?(!function(e,n){fetch(e).then(function(t){var a=t.headers.get("content-type");404===t.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):Pn(e,n)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(n,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):Pn(n,e)})}}function Pn(e,n){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}function _n(){var e=Object(h.a)(["\n  position: absolute;\n  max-width: ",";\n  width: 95%;\n  margin-top: 10px;\n  left: 0;\n  right: 0;\n  margin-left: auto !important;\n  margin-right: auto !important;\n  z-index: 10;\n  display: flex !important;\n  justify-content: space-between;\n  animation: ease-in 1s ",";\n"]);return _n=function(){return e},e}function zn(){var e=Object(h.a)(["\n    from {\n      opacity: 0;\n    }\n    to {\n      opacity: 1;\n    }\n"]);return zn=function(){return e},e}var Rn=Object(fe.b)(zn()),Kn=fe.a.section(_n(),"40em",Rn),Gn=!1,Wn=function(){var e=Object(m.useState)(!1),n=Object(v.a)(e,2),t=n[0],a=n[1],r=f.a.useCallback(function(){window.location.reload()},[]),i=f.a.useCallback(function(){a(!1)},[]);return Object(m.useEffect)(function(){Gn||Tn({onUpdate:function(){a(!0)}}),Gn=!0},[]),f.a.createElement(f.a.Fragment,null,t&&f.a.createElement(Kn,{className:"box"},f.a.createElement("span",null,"An Update is Available!"),f.a.createElement(we,null,f.a.createElement(Se,{isPrimary:!0,isOutlined:!0,onClick:r},"Refresh"),f.a.createElement(Se,{isDanger:!0,isOutlined:!0,onClick:i},"x"))))},qn=function(){return{keepAwake:!1}},Un=t(42),Jn=t(28);function Hn(){var e=Object(h.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  justify-content: flex-end;\n  margin-top: 5px;\n"]);return Hn=function(){return e},e}function Vn(){var e=Object(h.a)(["\n  max-width: ",";\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  > * {\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n"]);return Vn=function(){return e},e}function Yn(){var e=Object(h.a)(["\n  margin-left: 5px;\n"]);return Yn=function(){return e},e}function Xn(){var e=Object(h.a)([""]);return Xn=function(){return e},e}function $n(){var e=Object(h.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  padding-right: 10px;\n  align-self: flex-end;\n  > a {\n    animation: ease-in 0.3s ",";\n    font-size: 1.5rem;\n  }\n"]);return $n=function(){return e},e}function Qn(){var e=Object(h.a)(["\n  from {\nfont-size: 0px;\n  }\n"]);return Qn=function(){return e},e}function Zn(){var e=Object(h.a)(["\n  display: flex;\n  padding-top: 5px;\n  padding-bottom: 5px;\n  padding-left: 10px;\n  padding-right: 10px;\n  justify-content: space-between;\n  > h2 {\n    margin: 0 !important;\n  }\n"]);return Zn=function(){return e},e}function et(){var e=Object(h.a)(["\n  align-self: center;\n"]);return et=function(){return e},e}function nt(){var e=Object(h.a)(["\n  margin-bottom: 10px;\n  margin-left: 0px !important;\n  margin-right: 0px !important;\n  display: flex;\n  flex-direction: column;\n"]);return nt=function(){return e},e}var tt=f.a.memo(fe.a.section(nt())),at=f.a.memo(fe.a.span(et())),rt=f.a.memo(fe.a.section(Zn())),it=Object(fe.b)(Qn()),ot=f.a.memo(fe.a.nav($n(),it)),ct=f.a.memo(Object(fe.a)(Dn.b)(Xn())),ut=f.a.memo(Object(fe.a)(Un.a)(Yn())),lt=f.a.memo(function(){var e=D(!1),n=Object(v.a)(e,2),t=n[0],a=n[1];return f.a.createElement(tt,null,f.a.createElement(rt,{className:"has-background-primary has-text-light"},f.a.createElement(Dn.b,{to:"/",className:"has-text-white"},f.a.createElement("h2",{className:"is-size-4 is-bold"},"(mjh)tronome")),f.a.createElement(at,{onClick:a},f.a.createElement(Un.a,{icon:Jn.a,size:"2x"}))),t&&f.a.createElement(ot,{onClick:a},f.a.createElement(ct,{to:"/"},"Home",f.a.createElement(ut,{icon:Jn.c})),f.a.createElement(ct,{to:"/scales"},"Scales",f.a.createElement(ut,{icon:Jn.d})),f.a.createElement(ct,{to:"/settings"},"Settings",f.a.createElement(ut,{icon:Jn.b}))))}),st=f.a.memo(fe.a.div(Vn(),"40em")),mt=f.a.memo(fe.a.div(Hn())),ft=f.a.memo(function(e){var n=e.children;return f.a.createElement(st,null,f.a.createElement(Wn,null),f.a.createElement(lt,null),n,f.a.createElement(mt,null,"v".concat("1.0.26")))}),dt=function(){var e=function(){var e=I(a.AppSettings,qn),n=Object(v.a)(e,2),t=n[0],r=n[1];return{state:t,toggleKeepAwake:f.a.useCallback(function(){r(function(e){return Object(E.a)({},e,{keepAwake:!e.keepAwake})})},[r])}}(),n=function(){var e=f.a.useState(),n=Object(v.a)(e,2),t=n[0],a=n[1],r=f.a.useRef(),i=f.a.useState(!1),o=Object(v.a)(i,2),c=o[0],u=o[1],l=Object(m.useCallback)(function(){c||void 0!==r.current&&(a("pending"),r.current.resume().then(function(){u(!0),a(r.current),document.removeEventListener("touchstart",l),document.removeEventListener("click",l),document.removeEventListener("touchend",l)}))},[c,u]);return f.a.useEffect(function(){if(void 0===C)a("not-supported");else{var e=new C;r.current=e,"suspended"===e.state?(document.addEventListener("touchstart",l),document.addEventListener("click",l),document.addEventListener("touchend",l)):a(e)}},[l]),t}();return f.a.createElement(Dn.a,{basename:"/metronome"},f.a.createElement(ft,null,"not-supported"===n&&f.a.createElement("div",null,"Your browser doesn't support the audioContext api, so this will not work. Sorry :("),f.a.createElement(Bn.a,{exact:!0,path:"/",render:function(){return f.a.createElement(On,{audioContext:n,appSettings:e})}}),f.a.createElement(Bn.a,{exact:!0,path:"/scales",render:function(){return f.a.createElement(Fn,{audioContext:n})}}),f.a.createElement(Bn.a,{exact:!0,path:"/settings",render:function(){return f.a.createElement(xn,{appSettings:e})}})))},gt=(t(88),function(e){function n(e){var t;return Object(o.a)(this,n),(t=Object(u.a)(this,Object(l.a)(n).call(this,e))).state={error:void 0},t}return Object(s.a)(n,e),Object(c.a)(n,[{key:"render",value:function(){return this.state.error?f.a.createElement("div",null,f.a.createElement("h1",null,"Something went wrong"),f.a.createElement("hr",null),f.a.createElement("code",null,this.state.error instanceof Error&&this.state.error.name),f.a.createElement("hr",null),f.a.createElement("code",null,this.state.error instanceof Error&&this.state.error.message),f.a.createElement("hr",null),f.a.createElement("code",null,this.state.error instanceof Error&&this.state.error.stack),f.a.createElement("hr",null),f.a.createElement("code",null,JSON.stringify(this.state.error,void 0,"  "))):this.props.children}}],[{key:"getDerivedStateFromError",value:function(e){return{error:e}}}]),n}(f.a.Component));g.a.render(f.a.createElement(O.a,{store:ie},f.a.createElement(gt,null,f.a.createElement(dt,null))),document.getElementById("root"))}},[[65,1,2]]]);
//# sourceMappingURL=main.8299ca10.chunk.js.map