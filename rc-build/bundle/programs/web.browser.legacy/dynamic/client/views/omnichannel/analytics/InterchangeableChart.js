function module(e,t,n){var a,r,i,l,u,c,o,s,f,d,h,b,p;n.link("@babel/runtime/helpers/extends",{default:function(e){a=e}},0),n.link("@babel/runtime/helpers/objectSpread2",{default:function(e){r=e}},1),n.link("@babel/runtime/regenerator",{default:function(e){i=e}},2),n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){l=e}},3),n.link("react",{default:function(e){u=e},useRef:function(e){c=e},useEffect:function(e){o=e}},0),n.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){s=e}},1),n.link("../realTimeMonitoring/charts/Chart",{default:function(e){f=e}},2),n.link("../../../contexts/TranslationContext",{useTranslation:function(e){d=e}},3),n.link("../../../contexts/ServerContext",{useMethod:function(e){h=e}},4),n.link("../../../contexts/ToastMessagesContext",{useToastMessageDispatch:function(e){b=e}},5),n.link("../../../../app/livechat/client/lib/chartHandler",{drawLineChart:function(e){p=e}},6);var k=function(e){var t=e.departmentId,n=e.dateRange,k=e.chartName,m=l(e,["departmentId","dateRange","chartName"]),g=d(),x=b(),v=c(),C=c(),w=n.start,D=n.end,M=h("livechat:getAnalyticsChartData"),L=s(function(){function e(e){var t,n,a;return i.async(function(){function r(r){for(;;)switch(r.prev=r.next){case 0:if(r.prev=0,null!=e&&null!==(t=e.daterange)&&void 0!==t&&t.from&&null!=e&&null!==(n=e.daterange)&&void 0!==n&&n.to){r.next=3;break}return r.abrupt("return");case 3:return r.next=5,i.awrap(M(e));case 5:if(null!=(a=r.sent)&&a.chartLabel&&null!=a&&a.dataLabels&&null!=a&&a.dataPoints){r.next=8;break}throw new Error("Error! fetching chart data. Details: livechat:getAnalyticsChartData => Missing Data");case 8:return r.next=10,i.awrap(p(v.current,C.current,[a.chartLabel],a.dataLabels,[a.dataPoints]));case 10:C.current=r.sent,r.next=16;break;case 13:r.prev=13,r.t0=r.catch(0),x({type:"error",message:r.t0});case 16:case"end":return r.stop()}}return r}(),null,null,[[0,13]],Promise)}return e}());return o((function(){L(r({daterange:{from:w,to:D},chartOptions:{name:k}},t&&{departmentId:t}))}),[k,t,L,D,w,g,M]),u.createElement(f,a({border:"none",pi:"none",ref:v},m))};n.exportDefault(k)}

