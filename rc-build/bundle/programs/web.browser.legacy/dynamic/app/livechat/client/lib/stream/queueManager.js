function module(n,e,t){var r,u,a,i,c,o;t.link("@babel/runtime/regenerator",{default:function(n){r=n}},0),t.link("@babel/runtime/helpers/objectSpread2",{default:function(n){u=n}},1),t.export({initializeLivechatInquiryStream:function(){return g}}),t.link("../../../../utils/client",{APIClient:function(n){a=n}},0),t.link("../../collections/LivechatInquiry",{LivechatInquiry:function(n){i=n}},1),t.link("./inquiry",{inquiryDataStream:function(n){c=n}},2),t.link("../../../../ui-utils/client",{call:function(n){o=n}},3);var s=new Set,l={added:function(n){delete n.type,s.has(n.department)&&i.insert(u(u({},n),{},{alert:!0,_updatedAt:new Date(n._updatedAt)}))},changed:function(n){if("queued"!==n.status||n.department&&!s.has(n.department))return i.remove(n._id);delete n.type,i.upsert({_id:n._id},u(u({},n),{},{alert:!0,_updatedAt:new Date(n._updatedAt)}))},removed:function(n){return i.remove(n._id)}},f=function(n){l[n.type](n)},p=function(){function n(){var n,e;return r.async(function(){function t(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,r.awrap(a.v1.get('livechat/inquiries.queued?sort={"ts": 1}'));case 2:return n=t.sent,e=n.inquiries,t.abrupt("return",e);case 5:case"end":return t.stop()}}return t}(),null,null,null,Promise)}return n}(),d=function(n){c.removeListener("department/"+n,f),s.delete(n)},v=function(n){return s.add(n),c.on("department/"+n,f),function(){return d(n)}},m=function(){function n(){var n,e,t=arguments;return r.async(function(){function r(r){for(;;)switch(r.prev=r.next){case 0:return n=t.length>0&&void 0!==t[0]?t[0]:[],e=n.map((function(n){return v(n)})),r.abrupt("return",(function(){return e.forEach((function(n){return n()}))}));case 3:case"end":return r.stop()}}return r}(),null,null,null,Promise)}return n}(),h=function(){function n(){var n,e=arguments;return r.async(function(){function t(t){for(;;)switch(t.prev=t.next){case 0:return n=e.length>0&&void 0!==e[0]?e[0]:[],t.abrupt("return",n.forEach((function(n){return i.upsert({_id:n._id},u(u({},n),{},{_updatedAt:new Date(n._updatedAt)}))})));case 2:case"end":return t.stop()}}return t}(),null,null,null,Promise)}return n}(),b=function(){function n(n){var e,t;return r.async(function(){function u(u){for(;;)switch(u.prev=u.next){case 0:return u.next=2,r.awrap(a.v1.get("livechat/agents/"+n+"/departments?enabledDepartmentsOnly=true"));case 2:return e=u.sent,t=e.departments,u.abrupt("return",t);case 5:case"end":return u.stop()}}return u}(),null,null,null,Promise)}return n}(),w=function(){return c.removeListener("public",f)},x=function(){return c.on("public",f),w},y=function(){function n(n){var e,t,u;return r.async(function(){function a(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,r.awrap(o("livechat:getRoutingConfig"));case 2:if(!(e=a.sent)||!e.autoAssignAgent){a.next=5;break}return a.abrupt("return");case 5:return a.next=7,r.awrap(b(n));case 7:if(!(t=a.sent.map((function(n){return n.departmentId}))).length){a.next=14;break}return a.next=11,r.awrap(m(t));case 11:a.t0=a.sent,a.next=15;break;case 14:a.t0=x();case 15:return u=a.t0,a.t1=h,a.next=19,r.awrap(p());case 19:return a.t2=a.sent,(0,a.t1)(a.t2),a.abrupt("return",(function(){i.remove({}),w(),u&&u(),s.clear()}));case 22:case"end":return a.stop()}}return a}(),null,null,null,Promise)}return n}(),g=function(){function n(){var n=arguments;return r.async(function(){function e(e){for(;;)switch(e.prev=e.next){case 0:return _&&_(),e.next=3,r.awrap(y.apply(void 0,n));case 3:_=e.sent;case 4:case"end":return e.stop()}}return e}(),null,null,null,Promise)}return n}(),_}

