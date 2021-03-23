function module(e,t,n){var a,i,o,r,s,l,u,c,d,f,m,h,y,p,g,b,k,v,S,x;n.link("@babel/runtime/helpers/createForOfIteratorHelperLoose",{default:function(e){a=e}},0),n.link("@babel/runtime/helpers/toConsumableArray",{default:function(e){i=e}},1),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){o=e}},2),n.export({NewUsersSection:function(){return w}}),n.link("@nivo/bar",{ResponsiveBar:function(e){r=e}},0),n.link("@rocket.chat/fuselage",{Box:function(e){s=e},Flex:function(e){l=e},Select:function(e){u=e},Skeleton:function(e){c=e},ActionButton:function(e){d=e}},1),n.link("@rocket.chat/fuselage-hooks",{useResizeObserver:function(e){f=e}},2),n.link("moment",{default:function(e){m=e}},3),n.link("react",{default:function(e){h=e},useMemo:function(e){y=e},useState:function(e){p=e}},4),n.link("../../../../../../client/contexts/TranslationContext",{useTranslation:function(e){g=e}},5),n.link("../../../../../../client/hooks/useEndpointData",{useEndpointData:function(e){b=e}},6),n.link("../../../../../../client/hooks/useFormatDate",{useFormatDate:function(e){k=e}},7),n.link("../../../../../../client/components/data/CounterSet",{default:function(e){v=e}},8),n.link("../Section",{Section:function(e){S=e}},9),n.link("../../../../../../client/lib/download",{downloadCsvAs:function(e){x=e}},10);var E=45;function w(){var e=g(),t=y((function(){return[["last 7 days",e("Last_7_days")],["last 30 days",e("Last_30_days")],["last 90 days",e("Last_90_days")]]}),[e]),n=p("last 7 days"),w=o(n,2),_=w[0],I=w[1],U=k(),A=y((function(){switch(_){case"last 7 days":return{start:m().set({hour:0,minute:0,second:0,millisecond:0}).subtract(7,"days"),end:m().set({hour:0,minute:0,second:0,millisecond:0}).subtract(1)};case"last 30 days":return{start:m().set({hour:0,minute:0,second:0,millisecond:0}).subtract(30,"days"),end:m().set({hour:0,minute:0,second:0,millisecond:0}).subtract(1)};case"last 90 days":return{start:m().set({hour:0,minute:0,second:0,millisecond:0}).subtract(90,"days"),end:m().set({hour:0,minute:0,second:0,millisecond:0}).subtract(1)}}}),[_]),C=function(e){return I(e)},D=y((function(){return{start:A.start.toISOString(),end:A.end.toISOString()}}),[A]),F,M=b("engagement-dashboard/users/new-users",D).value,O=f(),R=O.ref,z=O.contentBoxSize,B=(z=void 0===z?{}:z).inlineSize,L=void 0===B?600:B,N=Math.ceil(L/E),T=y((function(){var e=m(A.end).diff(A.start,"days")+1;if(e<=N||!N)return null;var t=Array.from({length:e},(function(e,t){return m(A.start).add(t,"days").toISOString()})),n=Math.ceil(t.length/N);return t.reduce((function(e,t,a){return(a+1)%n==0&&(e=[].concat(i(e),[t])),e}),[])}),[A,N]),H=y((function(){if(!M)return[];for(var e=Array.from({length:m(A.end).diff(A.start,"days")+1},(function(e,t){return{date:m(A.start).add(t,"days").toISOString(),newUsers:0}})),t=a(M.days),n;!(n=t()).done;){var i=n.value,o=i.day,r=i.users,s=m(o).diff(A.start,"days");s>=0&&(e[s].newUsers+=r)}return[M.period.count,M.period.variation,M.yesterday.count,M.yesterday.variation,e]}),[M,A]),V=o(H,5),j=V[0],P=V[1],Y=V[2],G=V[3],W=V[4],q=function(){var e=W.map((function(e){var t,n;return[e.data,e.newUsers]}));x(e,"NewUsersSection_start_"+D.start+"_end_"+D.end)};return h.createElement(S,{title:e("New_users"),filter:h.createElement(h.Fragment,null,h.createElement(u,{small:!0,options:t,value:_,onChange:C}),h.createElement(d,{small:!0,mis:"x16",disabled:!M,onClick:q,"aria-label":e("Download_Info"),icon:"download"}))},h.createElement(v,{counters:[{count:M?j:h.createElement(c,{variant:"rect",width:"3ex",height:"1em"}),variation:M?P:0,description:t.find((function(e){var t,n;return o(e,1)[0]===_}))[1]},{count:M?Y:h.createElement(c,{variant:"rect",width:"3ex",height:"1em"}),variation:M?G:0,description:e("Yesterday")}]}),h.createElement(l.Container,null,M?h.createElement(s,{style:{height:240}},h.createElement(l.Item,{align:"stretch",grow:1,shrink:0},h.createElement(s,{style:{position:"relative"},ref:R},h.createElement(s,{style:{position:"absolute",width:"100%",height:"100%"}},h.createElement(r,{data:W,indexBy:"date",keys:["newUsers"],groupMode:"grouped",padding:.25,margin:{bottom:20,left:20,top:20},colors:["#1d74f5"],enableLabel:!1,enableGridY:!1,axisTop:null,axisRight:null,axisBottom:{tickSize:0,tickPadding:4,tickRotation:0,tickValues:T,format:function(e){return m(e).format(7===W.length?"dddd":"DD/MM")}},axisLeft:{tickSize:0,tickPadding:4,tickRotation:0},animate:!0,motionStiffness:90,motionDamping:15,theme:{axis:{ticks:{text:{fill:"#9EA2A8",fontFamily:'Inter, -apple-system, system-ui, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Helvetica Neue", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Meiryo UI", Arial, sans-serif',fontSize:"10px",fontStyle:"normal",fontWeight:"600",letterSpacing:"0.2px",lineHeight:"12px"}}},tooltip:{container:{backgroundColor:"#1F2329",boxShadow:"0px 0px 12px rgba(47, 52, 61, 0.12), 0px 0px 2px rgba(47, 52, 61, 0.08)",borderRadius:2}}},tooltip:function(t){var n=t.value,a=t.indexValue;return(h.createElement(s,{fontScale:"p2",color:"alternative"},e("Value_users",{value:n}),", ",U(a)))}}))))):h.createElement(s,{ref:R},h.createElement(c,{variant:"rect",height:240}))))}}
