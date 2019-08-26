(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{25:function(e,t,n){"use strict";n.d(t,"f",function(){return a}),n.d(t,"c",function(){return i}),n.d(t,"b",function(){return u}),n.d(t,"d",function(){return p}),n.d(t,"a",function(){return l}),n.d(t,"e",function(){return m});var s=n(36),r=n(22),o=n.n(r),a=function(e){var t=e.session.expiresAt,n=new Date/1e3;return console.info("token will expire in",(t-n)/60,"minutes"),n>t};var c=function(e,t){return'"[object XMLHttpRequest]"'===JSON.stringify(e.request.toString())?(t.push("error"),console.log("error, probably 429")):console.log("error, probably NOT 429"),"error, probably 429"},i=function(e,t){var n={url:"https://api.meetup.com/members/self",params:{access_token:e}};return o()(n).then(function(e){return e}).catch(function(e){c(e,t)})},u=function(e,t,n){var s={url:"https://api.meetup.com/self/events",params:{page:1,status:"upcoming",access_token:e},headers:{Accept:"*/*"}};return o()(s).then(function(e){return console.log({data:e.data}),e.data}).catch(function(e){c(e,n)})},p=function(e,t,n,r){n=(n=n.replace(/(#+)|([!].+)/g,"")).replace(/[^0-9a-zA-Z]+/g,"-");var a={url:"https://api.meetup.com/2/events",params:{access_token:e,page:20,status:"upcoming"},headers:{Accept:"*/*"}};return t=Object(s.a)({},t,{group_urlname:n}),a.params=Object(s.a)({},t,a.params),o()(a).then(function(e){return console.log(e.data.results),e.data.results}).catch(function(e){c(e,r)})},l=function(e,t,n){var s={url:"https://api.meetup.com/self/groups",params:{page:20,access_token:e,only:"name"},headers:{Accept:"*/*"}};return o()(s).then(function(e){return e.data}).catch(function(e){c(e,n)})},m=function(e,t,n,s){var r={method:"POST",url:"https://api.meetup.com/2/rsvp",params:{rsvp:n,event_id:"".concat(t),access_token:e},headers:{Accept:"*/*"}};return o()(r).then(function(e){return e}).catch(function(e){c(e,s)})}},50:function(e,t,n){var s=n(51),r=s.compose,o=s.concat,a=s.join,c=s.map,i=s.toPairs,u=s.split,p=s.tail,l=s.fromPairs,m=r(o("?"),a("&"),c(a("=")),i),h=r(l,c(u("=")),u("&"),p);e.exports={toQs:m,parseQs:h}},58:function(e,t,n){e.exports=n(90)},90:function(e,t,n){"use strict";n.r(t);var s=n(3),r=n.n(s),o=n(53),a=n.n(o),c=n(26),i=n(52),u=n(48),p=n(33),l=n.n(p),m=n(54),h=n(25),d="REQUEST_MEETUPS",f="RECEIVE_MEETUPS",g="TO_MEETUP_DETAILS",b="TO_LOGIN",v="SAVE_SESSION",E="LOAD_DATA";function O(e,t){return function(){var n=Object(m.a)(l.a.mark(function n(s,r){var o,a,c;return l.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:if(!Object(h.f)(r())){n.next=6;break}console.info("need to renew token"),s({type:b}),t.push("login"),n.next=28;break;case 6:return console.info("token still good"),s({type:d}),t.push("rsvp"),n.prev=9,n.next=12,Object(h.c)(e,t);case 12:return o=n.sent.data.name,n.next=15,Object(h.b)(e,{},t);case 15:return a=n.sent,n.next=18,Object(h.a)(e,t);case 18:return c=n.sent,a.groups=c,a.name=o,n.abrupt("return",s({type:f,meetups:a}));case 24:n.prev=24,n.t0=n.catch(9),console.log(n.t0),t.push("error");case 28:case"end":return n.stop()}},n,this,[[9,24]])}));return function(e,t){return n.apply(this,arguments)}}()}var k={session:{accessToken:"",expiresAt:""},meetup:{},meetups:[],groups:[],isFetching:!1},j=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case E:return console.log("loading data from session storage"),Object.assign({},e,{session:{expiresAt:+sessionStorage.getItem("sessionExpiresAt"),accessToken:sessionStorage.getItem("sessionAccessToken")}});case v:var n=new Date/1e3+ +t.oauthResponse.expires_in;return sessionStorage.setItem("sessionExpiresAt",n),sessionStorage.setItem("sessionAccessToken",t.oauthResponse.access_token),Object.assign({},e,{session:{accessToken:t.oauthResponse.access_token,expiresAt:n}});case b:return console.info("clear session in session storage and state"),sessionStorage.clear(),Object.assign({},e,{session:{accessToken:"",expiresAt:""}});case g:return Object.assign({},e,{meetup:Object(i.a)(Object(u.a)("id",t.id),e.meetups)});case d:return Object.assign({},e,{isFetching:!0});case f:return Object.assign({},e,{isFetching:!1,meetups:t.meetups});default:return e}},y=n(55),x=(n(84),n(30)),w=n(100),A=n(102),S=n(37),_=n(38),T=n(41),I=n(39),P=n(40),D=n(24),F=n(103),L=n(101),R=n(23),M=n.n(R);function q(e){return e.isLoading?e.timedOut?r.a.createElement("div",null,"Loader timed out!"):e.pastDelay?r.a.createElement("div",null,"Loading..."):null:e.error?r.a.createElement("div",null,"Error! Component failed to load"):null}var N=M()({loader:function(){return n.e(2).then(n.bind(null,95))},loading:q}),Q=M()({loader:function(){return n.e(3).then(n.bind(null,96))},loading:q}),U=M()({loader:function(){return Promise.all([n.e(0),n.e(4)]).then(n.bind(null,97))},loading:q}),C=M()({loader:function(){return n.e(5).then(n.bind(null,98))},loading:q}),J=M()({loader:function(){return Promise.all([n.e(0),n.e(6)]).then(n.bind(null,99))},loading:q}),V=n(50),z=function(e){if("/error"===e.history.location.pathname)console.log("no request was made because error component was previous.");else{var t=sessionStorage.getItem("sessionExpiresAt"),n=sessionStorage.getItem("sessionAccessToken");if(n&&t)console.info("returning visitor - load data"),e.dispatch({type:E}),e.dispatch(O(n,e.history));else if(console.info("first time visitor",e.history),window.location.hash.length>0){console.info("redirect back from meetup &b have fragment");var s=Object(V.parseQs)(window.location.hash);console.info("save to session storage and state"),e.dispatch((r=s,console.info("save session",r),{type:v,oauthResponse:r})),e.dispatch(O(s.access_token,e.history))}}var r};var B=function(e){function t(e){var n;return Object(S.a)(this,t),(n=Object(T.a)(this,Object(I.a)(t).call(this,e))).checkOauth=z,n.show=n.show.bind(Object(D.a)(Object(D.a)(n))),n}return Object(P.a)(t,e),Object(_.a)(t,[{key:"show",value:function(e,t){this.props.dispatch(function(e){return{type:g,id:e}}(t)),this.props.history.push("meetupdetails")}},{key:"componentDidMount",value:function(){this.checkOauth(this.props)}},{key:"render",value:function(){var e=this,t=this.props,n=t.meetups,s=t.meetup,o=t.groups,a=t.isFetching,c=t.session,i=t.history;return r.a.createElement(F.a,null,r.a.createElement(A.a,{path:"/",exact:!0,component:Q}),r.a.createElement(A.a,{path:"/error",exact:!0,render:function(e){return r.a.createElement(N,{history:i})}}),r.a.createElement(A.a,{path:"/login",exact:!0,component:Q}),r.a.createElement(A.a,{path:"/meetups",exact:!0,render:function(t){return r.a.createElement(U,{meetups:n,onSelect:e.show,isFetching:a})}}),r.a.createElement(A.a,{path:"/meetupdetails",exact:!0,render:function(t){return r.a.createElement(C,{meetup:s,onBack:e.home})}}),r.a.createElement(A.a,{path:"/rsvp",exact:!0,render:function(t){return r.a.createElement(J,{groups:o,meetups:n,history:i,session:c,rsvp:e.rsvp})}}),r.a.createElement(A.a,{render:function(){return r.a.createElement(L.a,{to:"/"})}}))}}]),t}(s.Component),G=Object(x.b)(function(e){return console.info(e),{meetups:e.meetups,meetup:e.meetup,groups:e.groups,route:e.route,session:e.session,isFetching:e.isFetching}})(B),H=Object(c.c)(j,Object(c.a)(y.a));a.a.render(r.a.createElement(x.a,{store:H},r.a.createElement(w.a,null,r.a.createElement(A.a,{path:"/",component:G}))),document.querySelector("#root"))}},[[58,8,7]]]);
//# sourceMappingURL=main.4229fec4.chunk.js.map