(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{59:function(e,n,t){e.exports=t(81)},72:function(e,n,t){e.exports=t.p+"static/media/click.b48ed3e5.wav"},80:function(e,n,t){},81:function(e,n,t){"use strict";t.r(n);var a,r,i,c=t(42),o=t(43),u=t(56),s=t(44),l=t(58),f=t(0),m=t.n(f),d=t(25),b=t.n(d),v=t(1),g=t(5),p=t(6),h=[{name:"Larghissimo",range:[0,24]},{name:"Grave",range:[25,45]},{name:"Largo",range:[40,60]},{name:"Lento",range:[45,60]},{name:"Larghetto",range:[60,66]},{name:"Adagio",range:[66,76]},{name:"Andante",range:[76,108]},{name:"Marcia moderato",range:[83,85]},{name:"Andante moderato",range:[92,112]},{name:"Moderato",range:[108,120]},{name:"Allegro",range:[120,156]},{name:"Vivace",range:[156,176]},{name:"Vivacissimo",range:[172,176]},{name:"Allegrissimo",range:[172,176]},{name:"Presto",range:[168,200]},{name:"Prestissimo",range:[200,250]}],j=function(e){return h.filter(function(n){return function(e,n){var t=Object(v.a)(e,2),a=t[0],r=t[1];return n>=a&&n<=r}(n.range,e)})},O=function(e){var n=e.bpm,t=j(n);return m.a.createElement("div",{style:{minHeight:"6.5em"}},t.map(function(e,n){var t=e.name,a=e.range;return m.a.createElement("div",{key:n,className:"has-text-centered"},t," - ",a[0]," - ",a[1])}))},E=t(11),k=t(94),w=t(49),y=t(84),S=t(90),x=t(82),C=t(45);!function(e){e.AppSettings="@mjh/k/app-settings-0",e.SignatureDivisions="@mjh/k/signature-divisions-3",e.ShowKnown="@mjh/k/show-known-2",e.ScalesDB="@mjh/k/scales-db-1",e.ActiveBeats="@mjh/k/active-beats-2",e.TimeSignature="@mjh/k/signature-2",e.BPM="@mjh/k/bpm-0",e.KnownScales="@mjh/k/known-scales-0",e.ShowScales="@mjh/k/show-scales-0",e.ShowTuner="@mjh/k/show-tuner-0",e.ShowDial="@mjh/k/show-dial-0",e.Radians="@mjh/k/radians-0",e.WakeLock="@mjh/k/wake-lock-0"}(a||(a={})),function(e){e.Major="Major",e.Minor="Minor"}(r||(r={})),function(e){e.A="A",e.B="B",e.C="C",e.D="D",e.E="E",e.F="F",e.G="G",e.A_Flat="Ab",e.B_Flat="Bb",e.C_Flat="Cb",e.D_Flat="Db",e.E_Flat="Eb",e.F_Flat="Fb",e.G_Flat="Gb",e.A_Sharp="A#",e.B_Sharp="B#",e.C_Sharp="C#",e.D_Sharp="D#",e.E_Sharp="E#",e.F_Sharp="F#",e.G_Sharp="G#"}(i||(i={}));var M=[[i.A,r.Major],[i.B,r.Major],[i.C,r.Major],[i.D,r.Major],[i.E,r.Major],[i.F,r.Major],[i.G,r.Major],[i.A_Flat,r.Major],[i.B_Flat,r.Major],[i.C_Flat,r.Major],[i.D_Flat,r.Major],[i.E_Flat,r.Major],[i.G_Flat,r.Major],[i.C_Sharp,r.Major],[i.F_Sharp,r.Major],[i.A,r.Minor],[i.B,r.Minor],[i.C,r.Minor],[i.D,r.Minor],[i.E,r.Minor],[i.F,r.Minor],[i.G,r.Minor],[i.A_Flat,r.Minor],[i.B_Flat,r.Minor],[i.E_Flat,r.Minor],[i.A_Sharp,r.Minor],[i.C_Sharp,r.Minor],[i.D_Sharp,r.Minor],[i.F_Sharp,r.Minor],[i.G_Sharp,r.Minor]],N=t(46),A=t.n(N),I=function(e,n){var t=arguments.length>2&&void 0!==arguments[2]&&arguments[2],a=Object(f.useState)(function(){var a,r=localStorage.getItem(e);return a=null===r||void 0===r||t?n instanceof Function?n():n:JSON.parse(r),window.localStorage.setItem(e,JSON.stringify(a)),a}),r=Object(v.a)(a,2),i=r[0],c=r[1];return[i,Object(f.useCallback)(function(n){c(function(t){var a=n instanceof Function?n(t):n;return window.localStorage.setItem(e,JSON.stringify(a)),a})},[e])]},D=function(e,n){var t=I(e,n),a=Object(v.a)(t,2),r=a[0],i=a[1];return[r,Object(f.useCallback)(function(){i(x.a)},[i])]},F=function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(e){},t=Object(f.useState)(e),a=Object(v.a)(t,2),r=a[0],i=a[1];return[r,Object(f.useCallback)(function(){return i(function(e){var t=!e;return n(t),t})},[n])]},B=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];var a=Object(f.useRef)(n);Object(f.useEffect)(function(){var e=a.current,t=n;e.forEach(function(e,n){var a=t[n];if(a!==e){var r=C.detailedDiff(e,a);console.log("Change at argument index: ".concat(n),r)}}),a.current=n},[n])},T=t(30),_=t(83);function P(){var e=Object(g.a)(["\n  &:not(:last-child) {\n    margin-bottom: 0 !important;\n  }\n"]);return P=function(){return e},e}var L=function(e){var n=Object(f.useState)(e),t=Object(v.a)(n,2),a=t[0],r=t[1],i=e.on,c=e.children,o=e.className,u=void 0===o?"":o;Object(f.useEffect)(function(){var n=e;e.on?(n=_.a("offIsPrimary",n),n=_.a("offIsLink",n),n=_.a("offIsDanger",n),n=_.a("offIsInfo",n),n=_.a("offIsSuccess",n),n=_.a("offIsOutlined",n)):(n=_.a("isPrimary",n),n=_.a("isLink",n),n=_.a("isDanger",n),n=_.a("isInfo",n),n=_.a("isSuccess",n),n=_.a("isOutlined",n)),r(n)},[u,e]);a.on;var s=Object(T.a)(a,["on"]),l=c instanceof Array&&2===c.length?i?c[0]:c[1]:c;return m.a.createElement(R,s,l)},R=function(e){var n=e.isPrimary,t=e.isDanger,a=e.isLink,r=e.isInfo,i=e.isSuccess,c=e.isOutlined,o=e.offIsPrimary,u=e.offIsDanger,s=e.offIsLink,l=e.offIsInfo,f=e.offIsSuccess,d=e.offIsOutlined,b=e.grow,v=Object(T.a)(e,["isPrimary","isDanger","isLink","isInfo","isSuccess","isOutlined","offIsPrimary","offIsDanger","offIsLink","offIsInfo","offIsSuccess","offIsOutlined","grow"]),g=n?"is-primary":"",p=a?"is-link":"",h=t?"is-danger":"",j=r?"is-info":"",O=i?"is-success":"",k=c?"is-outlined":"",w=o?"is-primary":"",y=s?"is-link":"",S=u?"is-danger":"",x=l?"is-info":"",C=f?"is-success":"",M=d?"is-outlined":"",N=v.className?v.className:"",A="".concat(N," button ").concat(g," ").concat(p," ").concat(k," ").concat(h," ").concat(j," ").concat(O," ").concat(w," ").concat(S," ").concat(S," ").concat(x," ").concat(y," ").concat(C," ").concat(M),I=b?{flexGrow:1}:{};return m.a.createElement("button",Object.assign({style:I},Object(E.a)({},v,{className:A})),v.children)},G=p.a.div(P()),K=function(e){var n=e.children,t=e.hasAddons,a=e.className,r=void 0===a?"":a,i=(e.ref,e.style),c=void 0===i?{}:i,o=e.grow,u=Object(T.a)(e,["children","hasAddons","className","ref","style","grow"]),s=t?"has-addons":"",l="".concat(r," buttons ").concat(s);return m.a.createElement(G,Object.assign({style:Object.assign(c,{flexGrow:o?1:"unset"})},u,{className:l}),n)};function z(){var e=Object(g.a)(["\n  display: flex;\n"]);return z=function(){return e},e}function W(){var e=Object(g.a)(["\n  display: flex;\n  flex-grow: 1;\n"]);return W=function(){return e},e}var q=p.a.div(W()),J=p.a.div(z()),U=function(e){var n=e.playing,t=e.activeBeats,a=e.beatIdx,r=e.division,i=e.divisionIdx,c=e.enabledDivisions,o=parseInt(r,10);return m.a.createElement(J,{key:"d".concat(o)},k.a(0,o).map(function(e){var r=n&&t[a]&&t[a][o]===e?0===a?"has-background-info":"has-background-primary":"has-background-light",u=1===o?0:5,s=0===e?0:10/o,l=e===o-1?0:10/o;return m.a.createElement(q,{key:"d".concat(o,"-").concat(e),className:"".concat(r," has-text-centered"),style:{justifyContent:"center",height:70/Object.keys(c).filter(function(e){return c[e]}).length-u,marginLeft:s,marginRight:l,marginTop:u}},0===i&&a+1)}))},V=function(e){return m.a.createElement("div",{className:"column has-text-centered"},Object.keys(e.enabledDivisions).filter(function(n){return e.enabledDivisions[n]}).map(function(n,t){return m.a.createElement(U,Object.assign({key:"".concat(e.beatIdx,"-").concat(t)},Object(E.a)({},e,{division:n,divisionIdx:t})))}))},H=function(e){var n=e.playing,t=e.signature.numerator,r=e.setSignature,i=e.activeBeats,c=Object(f.useState)(!1),o=Object(v.a)(c,2),u=o[0],s=o[1],l=I(a.SignatureDivisions,{1:!0}),d=Object(v.a)(l,2),b=d[0],g=d[1],p=Object(f.useCallback)(function(e){s(!0),r(function(n){return w.a("numerator",k.a(0,e).map(function(){return b}),n)})},[b,r]);Object(f.useEffect)(function(){u&&r(function(e){return Object(E.a)({},e,{numerator:k.a(0,e.numerator.length).map(function(){return b})})})},[b,u,r]);var h=Object(f.useCallback)(function(e){s(!0),g(function(n){return y.a(S.a([e]),x.a,n)})},[g]),j=Object(f.useCallback)(function(){g({1:!0})},[g]);return m.a.createElement(m.a.Fragment,null,m.a.createElement("h3",{className:"subtitle is-5",style:{paddingLeft:"10px",marginBottom:"0"}},"Divisions"),m.a.createElement("section",{style:{marginTop:"10px"},className:"section buttons is-centered"},m.a.createElement(K,{hasAddons:!0,grow:!0,style:{marginRight:"5px"}},[2,3,4,5,6].map(function(e){var n=b[e];return m.a.createElement(L,{grow:!0,on:n,isPrimary:!0,key:"division-options-".concat(e),onClick:function(){return h(e)}},e)})),m.a.createElement(R,{grow:!0,isDanger:!0,isOutlined:!0,onClick:j},"Clear")),m.a.createElement("section",{className:"section is-mobile columns"},t.map(function(e,t){return m.a.createElement(V,Object.assign({key:"".concat(t,"-enabledDivisionColumn")},{playing:n,beatIdx:t,enabledDivisions:e,activeBeats:i}))})),m.a.createElement("section",{className:"section buttons is-centered"},[1,2,3,4,5].map(function(e){var n=t.length===e;return m.a.createElement(L,{key:"numerator-button-".concat(e),on:n,isPrimary:!0,isOutlined:!0,grow:!0,onClick:n?function(){}:function(){return p(e)}},m.a.createElement(m.a.Fragment,null,e,"/4"))})))},Y=t(91),X=t(92),$=t(54),Q=t(93),Z=t(85),ee=t(86),ne=Y.a(function(e){return X.a(2,e)},$.a(function(e){var n=Object(v.a)(e,2),t=n[0];return n[1]-t}),Q.a,Z.a(6e4),Math.trunc),te=function(e){var n=e.setBPM,t=Object(f.useState)([]),a=Object(v.a)(t,2),r=a[0],i=a[1];return m.a.createElement(R,{isLink:!0,isOutlined:!0,onClick:function(){var e=performance.now(),t=ee.a(e,r).filter(function(n){return e-n<3e3});if(t.length>1){var a=ne(t);n(a)}i(t)}},"Tap In")};function ae(){var e=Object(g.a)(["\n  margin-top: 10px;\n"]);return ae=function(){return e},e}for(var re={0:"A",1:"Bb",2:"B",3:"C",4:"Db",5:"D",6:"Eb",7:"E",8:"F",9:"Gb",10:"G",11:"Ab"},ie=[],ce=-4;ce<4;ce++)for(var oe=0;oe<12;oe++){var ue=440*Math.pow(2,ce),se=ue/1200,le=ue*Math.pow(2,oe/12),fe=ce+4,me=re[oe];ie.push({octave:fe,note:me,frequency:le,centsPerOctave:se})}var de=p.a.section(ae()),be=function(){var e=F(!1),n=Object(v.a)(e,2),t=n[0],a=n[1],r=Object(f.useState)(),i=Object(v.a)(r,2),c=i[0],o=i[1],u=Object(f.useState)(),s=Object(v.a)(u,2),l=s[0],d=s[1],b=Object(f.useState)(440),g=Object(v.a)(b,2),p=g[0],h=g[1],j=Object(f.useState)(),O=Object(v.a)(j,2),E=O[0],k=O[1];Object(f.useEffect)(function(){E||k(new AudioContext)},[t,E]),Object(f.useEffect)(function(){if(t&&E){d(E.sampleRate);var e,n=navigator.mediaDevices;if(n)return n.getUserMedia({audio:!0}).then(function(n){e=n;var t=E.createAnalyser();t.fftSize=8192,E.createMediaStreamSource(n).connect(t),o(t)}),function(){e.getAudioTracks().forEach(function(e){return e.stop()})}}},[t,E]),Object(f.useEffect)(function(){if(t&&c&&l){var e=function(){var e=c.frequencyBinCount,n=new Float32Array(e);c.getFloatFrequencyData(n);var t=n.reduce(function(e,n,t){return e[0]<n?[n,t]:e},[-1/0,-1]),a=Object(v.a)(t,2)[1],r=l/c.fftSize;h(r*a)};e();var n=setInterval(e,50);return function(){clearInterval(n)}}},[t,c,l]);var w=function(e){for(var n=0,t=0;t<ie.length;t++)if(ie[t].frequency>=e){n=t;break}var a=n+1,r=ie[n],i=ie[a],c=(r.frequency+i.frequency)/2,o=ie[a],u=o.frequency-e;e<c&&(o=ie[n]);var s=o.centsPerOctave*u;return Object.assign(o,{originalFrequency:e,difference:u,cents:s})}(p||0),y=w.octave,S=w.note,x=w.cents;return m.a.createElement(de,{className:"box has-text-centered"},m.a.createElement("div",{className:"is-size-1"},t?S+y:"Stopped"),m.a.createElement("div",null,t?m.a.createElement(m.a.Fragment,null,x.toFixed(2)," Cents ",x<0?"flat":"sharp"):"press start to tune"),m.a.createElement(K,{className:"is-right"},m.a.createElement(L,{on:t,isDanger:!0,offIsPrimary:!0,onClick:a},m.a.createElement(m.a.Fragment,null,"Stop"),m.a.createElement(m.a.Fragment,null,"Start"))))};function ve(){var e=Object(g.a)(["\n  align-self: center;\n  margin: auto;\n  z-index: 1;\n  pointer-events: none;\n"]);return ve=function(){return e},e}function ge(){var e=Object(g.a)(["\n  width: 100px;\n  height: 100px;\n  border-radius: 100px;\n  position: absolute;\n  touch-action: none;\n"]);return ge=function(){return e},e}function pe(){var e=Object(g.a)(["\n  margin: auto;\n  position: relative;\n  height: 300px;\n  width: 300px;\n  border-radius: 300px;\n  display: flex;\n  margin-bottom: 10px;\n"]);return pe=function(){return e},e}var he=p.a.div(pe()),je=p.a.div(ge()),Oe=p.a.div(ve()),Ee=function(e){var n=e.size,t=void 0===n?300:n,r=e.initialValue,i=e.addDiff,c=e.children,o=I(a.Radians,r*(3*Math.PI)/2),u=Object(v.a)(o,2),s=u[0],l=u[1],d=Object(f.useRef)(Math.PI);Object(f.useEffect)(function(){d.current=s},[s]);var b=Object(f.useState)(!1),g=Object(v.a)(b,2),p=g[0],h=g[1],j=Object(f.useRef)(!1);Object(f.useEffect)(function(){j.current=p},[p]);var O=Object(f.useState)(0),E=Object(v.a)(O,2),k=E[0],w=E[1],y=Object(f.useRef)(0);Object(f.useEffect)(function(){y.current=k},[k]);var S=Object(f.useRef)(null),x=Object(f.useCallback)(function(e){h(!1)},[]),C=Object(f.useCallback)(function(e){Math.abs(y.current)<.2?w(function(n){return n+e}):(i(y.current>0?-1:1),w(0))},[i]),M=Object(f.useCallback)(function(e){var n=e.clientX,t=e.clientY,a=S.current.getBoundingClientRect(),r=a.left+a.width/2,i=-(a.top+a.height/2-t),c=-(r-n),o=Math.atan2(i,c),u=d.current-o;u<-Math.PI?u=-d.current-o:u>Math.PI&&(u=d.current- -o),0!==u&&C(u),o===d.current||l(o)},[C,l]),N=Object(f.useCallback)(function(e){j.current&&M(e)},[M]);Object(f.useEffect)(function(){return window.addEventListener("mouseup",x),window.addEventListener("mousemove",N),function(){window.removeEventListener("mouseup",x),window.removeEventListener("mousemove",N)}},[N,x]);var A=t/2+Math.sin(s)*(t/4)+Math.sin(s)*t/16-t/6,D=t/2+Math.cos(s)*(t/4)+Math.cos(s)*t/16-t/6;return m.a.createElement(he,{ref:S,className:"has-background-primary"},m.a.createElement(je,{className:"has-background-info",onMouseDown:function(e){h(!0),e.preventDefault()},onTouchMove:function(e){var n=e.changedTouches[0];M(n)},style:{top:A,left:D}}),m.a.createElement(Oe,null,c))};function ke(){var e=Object(g.a)([""]);return ke=function(){return e},e}var we=function(e){var n=e.appSettings,t=e.metronome,r=n.state.keepAwake,i=D(a.ShowTuner,!1),c=Object(v.a)(i,2),o=c[0],u=c[1],s=function(){var e=Object(f.useState)(new A.a),n=Object(v.a)(e,1)[0];return{lock:Object(f.useCallback)(function(){n.enable()},[n]),release:Object(f.useCallback)(function(){n.disable()},[n])}}(),l=s.lock,d=s.release,b=t.state,g=b.playing,p=b.signature,h=b.bpm,j=b.activeDivisions,E=t.toggleStart,k=t.setSignature,w=t.setBPM,y=t.addBPM;return Object(f.useEffect)(function(){r&&g?l():d()},[g,r,l,d]),m.a.createElement(ye,null,o&&m.a.createElement(be,null),m.a.createElement("section",{className:"section"},m.a.createElement(Ee,{initialValue:h,addDiff:y},m.a.createElement("div",{className:"has-text-centered is-size-1"},h),m.a.createElement(O,{bpm:h}))),m.a.createElement(H,{playing:g,signature:p,setSignature:k,activeBeats:j}),m.a.createElement("section",{className:"section"},m.a.createElement(K,{hasAddons:!0},m.a.createElement(L,{isLink:!0,offIsOutlined:!0,offIsLink:!0,on:o,onClick:u},"Tuner"),m.a.createElement(te,{setBPM:w}),m.a.createElement(L,{on:g,offIsPrimary:!0,grow:!0,isOutlined:!0,isDanger:!0,onClick:E},m.a.createElement(m.a.Fragment,null,"Stop"),m.a.createElement(m.a.Fragment,null,"Start")))))},ye=p.a.div(ke());function Se(){var e=Object(g.a)([""]);return Se=function(){return e},e}var xe,Ce=p.a.section(Se()),Me=function(e){var n=e.appSettings,t=n.state.keepAwake,a=n.toggleKeepAwake;return m.a.createElement(Ce,null,m.a.createElement("h2",{className:"is-size-4"},"Settings"),m.a.createElement("div",{className:"field"},m.a.createElement("div",{className:"control"},m.a.createElement("label",{className:"checkbox"},m.a.createElement("input",{style:{marginRight:"5px"},type:"checkbox",checked:t,onChange:a}),"Keep screen on while metronome is running."))))},Ne=window.AudioContext||window.webkitAudioContext||void 0,Ae=t(50);!function(e){e.NOT_STARTED="Not Started",e.LEARNING="Learning",e.KNOWN="Known"}(xe||(xe={}));var Ie=function(e,n){return De(e,n)[0]},De=function(e,n){var t=[];return Object.entries(e).forEach(function(e){var a=Object(v.a)(e,2)[1];Object.entries(a).forEach(function(e){var a=Object(v.a)(e,2)[1];n(a)&&t.push(a)})}),t},Fe=function(){var e={},n=function(n){var t,a=Object(v.a)(n,2),r=a[0],i=a[1],c=e[r];void 0===c&&(c={},e[r]=c),c[i]={scaleKey:t=n,pitch:t[0],mode:t[1],known:!1,learning:!1,bpm:60}},t=!0,a=!1,r=void 0;try{for(var i,c=M[Symbol.iterator]();!(t=(i=c.next()).done);t=!0){n(i.value)}}catch(o){a=!0,r=o}finally{try{t||null==c.return||c.return()}finally{if(a)throw r}}return e},Be=function(e){var n=Object(v.a)(e.scaleKey,2),t=n[0],a=n[1],r=e.learning,i=e.known,c=e.toggleLearning,o=e.toggleKnown;return m.a.createElement("div",{className:"is-grouped field has-addons"},m.a.createElement("div",{className:"is-size-5 control is-expanded"},t," ",a),m.a.createElement(K,null,m.a.createElement(L,{on:i,isInfo:!0,onClick:o},"Known"),m.a.createElement(L,{on:r,isLink:!0,onClick:c},"Learning")))};var Te=function(e){var n=e.scalesDB,t=e.addBPM,a=e.reset,r=e.scaleMode,i=e.startMetronome,c=Object(f.useState)(function(){return function(e){var n,t,a;for(a=e.length-1;a>0;a--)n=Math.floor(Math.random()*(a+1)),t=e[a],e[a]=e[n],e[n]=t;return e}(De(n,function(e){return r===xe.LEARNING?e.learning:r===xe.KNOWN&&e.known}).map(function(e){return e.scaleKey}))}),o=Object(v.a)(c,2),u=o[0],s=o[1],l=u[0]||[],d=Ie(n,function(e){return e.mode===l[1]&&e.pitch===l[0]});Object(f.useEffect)(function(){void 0!==d&&i(d.bpm)},[d,i]);var b=u.length>1?"Next Scale":"Finish";if(0===u.length)return m.a.createElement("div",null,"No more scales");var g=d,p=g,h=p.mode,j=p.pitch,O=p.bpm;return m.a.createElement("div",null,m.a.createElement("div",{style:{alignSelf:"center",fontWeight:"bold"},className:"control is-expanded is-size-5"},r),m.a.createElement("div",{style:{display:"flex",marginBottom:"5px"}},m.a.createElement("div",{style:{alignSelf:"center",marginRight:"10px"}},j," ",h," @ ",O,"bpm"),m.a.createElement(K,{style:{flexGrow:1}},m.a.createElement(R,{isDanger:!0,isOutlined:!0,grow:!0,onClick:t(g,-10)},"-10"),m.a.createElement(R,{isDanger:!0,isOutlined:!0,grow:!0,onClick:t(g,-1)},"-"),m.a.createElement(R,{isPrimary:!0,isOutlined:!0,grow:!0,onClick:t(g,1)},"+"),m.a.createElement(R,{isPrimary:!0,isOutlined:!0,grow:!0,onClick:t(g,10)},"+10"))),m.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},m.a.createElement(R,{isDanger:!0,isOutlined:!0,onClick:a},"Stop"),m.a.createElement(R,{isPrimary:!0,onClick:function(){s(function(e){var n=e.slice(1);return 0===n.length&&a(),n})}},b)))},_e=function(e){var n=e.metronome,t=n.stop,i=n.start,c=I(a.ScalesDB,Fe),o=Object(v.a)(c,2),u=o[0],s=o[1],l=Object(f.useState)(xe.NOT_STARTED),d=Object(v.a)(l,2),b=d[0],g=d[1];Object(f.useEffect)(function(){b===xe.NOT_STARTED&&t()},[b,t]);var p=function(e){var n=e.pitch,t=e.mode;return function(){s(y.a(S.a([n,t,"learning"]),x.a))}},h=function(e){var n=e.pitch,t=e.mode;return function(){s(y.a(S.a([n,t,"known"]),x.a))}},j=D(a.ShowKnown,!1),O=Object(v.a)(j,2),E=O[0],k=O[1];return m.a.createElement("div",{className:"box",style:{marginTop:"10px"}},b===xe.NOT_STARTED?m.a.createElement("div",{style:{marginBottom:"5px"}},m.a.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},m.a.createElement("div",{style:{alignSelf:"center",fontWeight:"bold"},className:"control is-expanded is-size-5"},"Scales"),m.a.createElement(K,null,m.a.createElement(R,{onClick:function(){return g(xe.KNOWN)},disabled:void 0===Ie(u,function(e){return e.known}),className:"is-info is-outlined"},"Start Known"),m.a.createElement(R,{onClick:function(){return g(xe.LEARNING)},disabled:void 0===Ie(u,function(e){return e.learning}),className:"is-link is-outlined"},"Start Learning"))),m.a.createElement("hr",null),m.a.createElement(K,null,m.a.createElement(R,{onClick:k,className:"".concat(E?"is-primary is-outlined":"is-danger")},E?"Hide Known":"Show Known")),De(u,function(e){return e.mode===r.Major&&(!!E||!1===e.known)}).map(function(e){return m.a.createElement(Be,Object.assign({key:"".concat(e.pitch,"-").concat(e.mode)},e,{toggleLearning:p(e),toggleKnown:h(e)}))}),m.a.createElement("hr",null),De(u,function(e){return e.mode===r.Minor&&(!!E||!1===e.known)}).map(function(e){return m.a.createElement(Be,Object.assign({key:"".concat(e.pitch,"-").concat(e.mode)},e,{toggleLearning:p(e),toggleKnown:h(e)}))})):m.a.createElement(Te,{scaleMode:b,startMetronome:i,addBPM:function(e,n){var t=e.pitch,a=e.mode;return function(){s(y.a(S.a([t,a,"bpm"]),Ae.a(n)))}},scalesDB:u,reset:function(){return g(xe.NOT_STARTED)}}))},Pe=t(29),Le=t(15),Re=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function Ge(e){if("serviceWorker"in navigator){if(new URL("/metronome",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",function(){var n="".concat("/metronome","/service-worker.js");Re?(!function(e,n){fetch(e).then(function(t){var a=t.headers.get("content-type");404===t.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then(function(e){e.unregister().then(function(){window.location.reload()})}):Ke(e,n)}).catch(function(){console.log("No internet connection found. App is running in offline mode.")})}(n,e),navigator.serviceWorker.ready.then(function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")})):Ke(n,e)})}}function Ke(e,n){navigator.serviceWorker.register(e).then(function(e){e.onupdatefound=function(){var t=e.installing;null!=t&&(t.onstatechange=function(){"installed"===t.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),n&&n.onUpdate&&n.onUpdate(e)):(console.log("Content is cached for offline use."),n&&n.onSuccess&&n.onSuccess(e)))})}}).catch(function(e){console.error("Error during service worker registration:",e)})}function ze(){var e=Object(g.a)(["\n  position: absolute;\n  max-width: ",";\n  width: 95%;\n  margin-top: 10px;\n  left: 0;\n  right: 0;\n  margin-left: auto;\n  margin-right: auto;\n  z-index: 10;\n  display: flex !important;\n  justify-content: space-between;\n  animation: ease-in 1s ",";\n"]);return ze=function(){return e},e}function We(){var e=Object(g.a)(["\n    from {\n      opacity: 0;\n    }\n    to {\n      opacity: 1;\n    }\n"]);return We=function(){return e},e}var qe=Object(p.b)(We()),Je=p.a.section(ze(),"40em",qe),Ue=function(){var e=Object(f.useState)(!1),n=Object(v.a)(e,2),t=n[0],a=n[1],r=m.a.useCallback(function(){window.location.reload()},[]),i=m.a.useCallback(function(){a(!1)},[]);return Object(f.useEffect)(function(){Ge({onUpdate:function(){a(!0)}})}),m.a.createElement(m.a.Fragment,null,t&&m.a.createElement(Je,{className:"box"},m.a.createElement("span",null,"An Update is Available!"),m.a.createElement(K,null,m.a.createElement(R,{isPrimary:!0,isOutlined:!0,onClick:r},"Refresh"),m.a.createElement(R,{isDanger:!0,isOutlined:!0,onClick:i},"x"))))},Ve=function(){return{keepAwake:!1}},He=t(21),Ye=t(55),Xe=t(87),$e=t(88),Qe=t(89),Ze=t(51),en=t.n(Ze);var nn=t(72),tn=function(e,n){var t=n.time,a=n.gain,r=n.buffer,i=n.pitch,c=n.currentBeat,o=n.divisionIndex,u=0===c&&0===o,s=e.createBufferSource();s.buffer=r,s.detune.value=u?0:-i;var l=e.createGain();l.gain.value=u?1:a,s.connect(l),l.connect(e.destination),s.start(t)},an=function(e,n,t,a,r,i,c,o,u){var s=60/e.bpm,l=t;if(n.current<r+i){var f=function(e,n,t,a,r){var i=[];for(var c in t)if(t[c])for(var o=parseInt(c,10),u=n/o,s=0;s<o;s++){var l={time:e+s*u,pitch:220,gain:.5,buffer:a,divisions:o,divisionIndex:s,currentBeat:r};i.push(l)}return i.sort(function(e,n){return e.time-n.time}),i}(n.current,s,l,c,a);o.push.apply(o,Object(Ye.a)(f)),n.current+=s,u()}},rn=.1,cn=function(e,n,t){var a=n.playing,r=function(e,n){var t=Object(f.useState)(),a=Object(v.a)(t,2),r=a[0],i=a[1];return Object(f.useEffect)(function(){void 0!==e&&fetch(n).then(function(e){return e.arrayBuffer()}).then(function(n){return e.decodeAudioData(n)}).then(i)},[n,e]),r}(e,nn),i=Object(f.useRef)(0),c=a?150:void 0,o=Object(f.useRef)(n);Object(f.useEffect)(function(){o.current=n},[n]);var u=Object(f.useState)(0),s=Object(v.a)(u,2),l=s[0],m=s[1];Object(f.useEffect)(function(){n.playing||m(0)},[n.playing]);var d=Object(f.useRef)(l);Object(f.useEffect)(function(){d.current=l},[l]);var b=function(){m(function(e){return(e+1)%o.current.signature.numerator.length})},g=Object(f.useCallback)(function(e){t(function(n){var t=Xe.a(e.currentBeat,function(n){return Object(E.a)({},n,Object(He.a)({},e.divisions,e.divisionIndex))},n),a=e.currentBeat-1;if(a<0){if(1===n.length)return t;a=o.current.signature.numerator.length-1}return Xe.a(a,function(e){return Object.keys(e).reduce(function(e,n){return Object(E.a)({},e,Object(He.a)({},n,void 0))},{})},t)})},[t]),p=Object(f.useCallback)(function(e,n){!function e(n,t,a){var r=n.currentTime;t<=r?a():setTimeout(function(){return e(n,t,a)},(t-r)/2*1e3)}(e,n.time,function(){o.current.playing&&g(n)})},[g]);Object(f.useEffect)(function(){if(void 0!==c&&void 0!==e&&void 0!==r){var n=new en.a,t=e.currentTime+.3;i.current=t;var a=function(){var t=o.current.signature.numerator,a=t[Math.min(d.current,t.length-1)];an(o.current,i,a,d.current,e.currentTime,.3,r,n,b),function(e,n,t,a){for(var r=t.currentTime+n+rn;e.peekFront()&&e.peekFront().time<r;){var i=e.shift();0===i.divisionIndex&&1!==i.divisions||tn(t,i),a(t,i)}}(n,c/1e3,e,p)};a();var u=setInterval(a,c);return function(){clearInterval(u)}}},[c,r,e,t,g,p])},on=function(e){return e.map(function(e){return $e.a(function(){},e)})},un=function(e){return Qe.a(10,250,e)},sn=function(e){var n=Object(f.useState)(!1),t=Object(v.a)(n,2),r=t[0],i=t[1],c=function(e,n){var t=Object(v.a)(e,2),a=t[0],r=t[1],i=Object(f.useCallback)(function(e){r(function(t){return n(e instanceof Function?e(t):e)})},[n,r]);return B(n,r),[a,i]}(I(a.BPM,90),un),o=Object(v.a)(c,2),u=o[0],s=o[1],l=I(a.TimeSignature,{denominator:4,numerator:[{1:!0},{1:!0},{1:!0}]}),m=Object(v.a)(l,2),d=m[0],b=m[1],g=I(a.ActiveBeats,on(d.numerator)),p=Object(v.a)(g,2),h=p[0],j=p[1],O={bpm:u,playing:r,signature:d,activeDivisions:h},E=d.numerator,k=Object(f.useRef)(u);Object(f.useEffect)(function(){k.current=u},[u]),Object(f.useEffect)(function(){j(on(E))},[E,d,j]),Object(f.useEffect)(function(){r||(j(on(E)),setTimeout(function(){j(on(E))},300))},[r,E,j]),cn(e,O,j);return{toggleStart:function(){return i(x.a)},setSignature:b,start:Object(f.useCallback)(function(e){void 0!==e&&s(e),i(!0)},[i,s]),stop:Object(f.useCallback)(function(){i(!1)},[i]),setBPM:s,addBPM:function(e){s(Ae.a(e))},state:O}},ln=t(33),fn=t(23);function mn(){var e=Object(g.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  justify-content: flex-end;\n  margin-top: 5px;\n"]);return mn=function(){return e},e}function dn(){var e=Object(g.a)(["\n  max-width: ",";\n  margin: 0 auto;\n  display: flex;\n  flex-direction: column;\n  > * {\n    margin-left: 10px;\n    margin-right: 10px;\n  }\n"]);return dn=function(){return e},e}function bn(){var e=Object(g.a)(["\n  margin-left: 5px;\n"]);return bn=function(){return e},e}function vn(){var e=Object(g.a)([""]);return vn=function(){return e},e}function gn(){var e=Object(g.a)(["\n  display: flex;\n  flex-direction: column;\n  align-items: flex-end;\n  padding-right: 10px;\n  align-self: flex-end;\n  > a {\n    animation: ease-in 0.3s ",";\n    font-size: 1.5rem;\n  }\n"]);return gn=function(){return e},e}function pn(){var e=Object(g.a)(["\n  from {\nfont-size: 0px;\n  }\n"]);return pn=function(){return e},e}function hn(){var e=Object(g.a)(["\n  display: flex;\n  padding-top: 5px;\n  padding-bottom: 5px;\n  padding-left: 10px;\n  padding-right: 10px;\n  justify-content: space-between;\n  > h2 {\n    margin: 0 !important;\n  }\n"]);return hn=function(){return e},e}function jn(){var e=Object(g.a)(["\n  align-self: center;\n"]);return jn=function(){return e},e}function On(){var e=Object(g.a)(["\n  margin-bottom: 10px;\n  margin-left: 0px !important;\n  margin-right: 0px !important;\n  display: flex;\n  flex-direction: column;\n"]);return On=function(){return e},e}var En=p.a.section(On()),kn=p.a.span(jn()),wn=p.a.section(hn()),yn=Object(p.b)(pn()),Sn=p.a.nav(gn(),yn),xn=Object(p.a)(Pe.b)(vn()),Cn=Object(p.a)(ln.a)(bn()),Mn=function(){var e=F(!1),n=Object(v.a)(e,2),t=n[0],a=n[1];return m.a.createElement(En,null,m.a.createElement(wn,{className:"has-background-primary has-text-light"},m.a.createElement(Pe.b,{to:"/",className:"has-text-white"},m.a.createElement("h2",{className:"is-size-4 is-bold"},"(mjh)tronome")),m.a.createElement(kn,{onClick:a},m.a.createElement(ln.a,{icon:fn.a,size:"2x"}))),t&&m.a.createElement(Sn,{onClick:a},m.a.createElement(xn,{to:"/"},"Home",m.a.createElement(Cn,{icon:fn.c})),m.a.createElement(xn,{to:"/scales"},"Scales",m.a.createElement(Cn,{icon:fn.d})),m.a.createElement(xn,{to:"/settings"},"Settings",m.a.createElement(Cn,{icon:fn.b}))))},Nn=p.a.div(dn(),"40em"),An=p.a.div(mn()),In=function(e){var n=e.children;return m.a.createElement(Nn,null,m.a.createElement(Ue,null),m.a.createElement(Mn,null),n,m.a.createElement(An,null,"v".concat("1.0.12")))},Dn=function(){var e=function(){var e=I(a.AppSettings,Ve),n=Object(v.a)(e,2),t=n[0],r=n[1];return{state:t,toggleKeepAwake:m.a.useCallback(function(){r(function(e){return Object(E.a)({},e,{keepAwake:!e.keepAwake})})},[r])}}(),n=function(e){var n=Object(f.useState)(e),t=Object(v.a)(n,2),a=t[0],r=t[1],i=Object(f.useCallback)(function(e){a||r(e)},[a]);return{value:a,init:i}}(),t=n.value,r=n.init,i=m.a.useState(!0),c=Object(v.a)(i,2),o=c[0],u=c[1],s=sn(t),l=s.state.playing;return m.a.useEffect(function(){void 0===Ne?u(!1):l&&r(new Ne)},[l]),m.a.createElement(Pe.a,{basename:"/metronome"},m.a.createElement(In,null,!o&&m.a.createElement("div",null,"Your browser doesn't support the audioContext api, so this will not work. Sorry :("),m.a.createElement(Le.a,{exact:!0,path:"/",render:function(){return m.a.createElement(we,{metronome:s,appSettings:e})}}),m.a.createElement(Le.a,{exact:!0,path:"/scales",render:function(){return m.a.createElement(_e,{metronome:s})}}),m.a.createElement(Le.a,{exact:!0,path:"/settings",render:function(){return m.a.createElement(Me,{appSettings:e})}})))},Fn=(t(80),function(e){function n(e){var t;return Object(c.a)(this,n),(t=Object(u.a)(this,Object(s.a)(n).call(this,e))).state={error:void 0},t}return Object(l.a)(n,e),Object(o.a)(n,[{key:"render",value:function(){return this.state.error?m.a.createElement("div",null,m.a.createElement("h1",null,"Something went wrong"),m.a.createElement("hr",null),m.a.createElement("code",null,this.state.error instanceof Error&&this.state.error.name),m.a.createElement("hr",null),m.a.createElement("code",null,this.state.error instanceof Error&&this.state.error.message),m.a.createElement("hr",null),m.a.createElement("code",null,this.state.error instanceof Error&&this.state.error.stack),m.a.createElement("hr",null),m.a.createElement("code",null,JSON.stringify(this.state.error,void 0,"  "))):this.props.children}}],[{key:"getDerivedStateFromError",value:function(e){return{error:e}}}]),n}(m.a.Component));b.a.render(m.a.createElement(Fn,null,m.a.createElement(Dn,null)),document.getElementById("root"))}},[[59,1,2]]]);
//# sourceMappingURL=main.e2e98ecc.chunk.js.map