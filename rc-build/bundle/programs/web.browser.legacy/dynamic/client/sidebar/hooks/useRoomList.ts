function module(e,n,t){var i,s,a,u,r,o,c,d,l;t.link("@babel/runtime/helpers/toConsumableArray",{default:function(e){i=e}},0),t.link("@babel/runtime/helpers/slicedToArray",{default:function(e){s=e}},1),t.export({useRoomList:function(){return b}}),t.link("react",{useEffect:function(e){a=e}},0),t.link("@rocket.chat/fuselage-hooks",{useDebouncedState:function(e){u=e}},1),t.link("../../contexts/OmnichannelContext",{useQueuedInquiries:function(e){r=e},useOmnichannelEnabled:function(e){o=e}},2),t.link("../../contexts/UserContext",{useUserPreference:function(e){c=e},useUserSubscriptions:function(e){d=e}},3),t.link("./useQueryOptions",{useQueryOptions:function(e){l=e}},4);var f={open:{$ne:!1}},b=function(){var e=u([],150),n=s(e,2),t=n[0],b=n[1],h=o(),p=c("sidebarGroupByType"),S=c("sidebarShowFavorites"),v=c("sidebarShowDiscussion"),w=c("sidebarShowUnread"),m=l(),k=d(f,m),z=r();return a((function(){b((function(){var e=new Set,n=new Set,t=new Set,a=new Set,u=new Set,r=new Set,o=new Set,c=new Set;k.forEach((function(i){return w&&(i.alert||i.unread)&&!i.hideUnreadStatus?t.add(i):S&&i.f?e.add(i):v&&i.prid?o.add(i):("c"===i.t&&u.add(i),"p"===i.t&&a.add(i),"l"===i.t?h&&n.add(i):("d"===i.t&&r.add(i),void c.add(i)))}));var d=new Map;return h&&z.enabled&&d.set("Omnichannel",[]),h&&!z.enabled&&d.set("Omnichannel",n),h&&z.enabled&&z.queue.length&&d.set("Incoming_Livechats",z.queue),h&&z.enabled&&n.size&&d.set("Open_Livechats",n),w&&t.size&&d.set("Unread",t),S&&e.size&&d.set("Favorites",e),v&&o.size&&d.set("Discussions",o),p&&a.size&&d.set("Private",a),p&&u.size&&d.set("Public",u),p&&r.size&&d.set("Direct",r),!p&&d.set("Conversations",c),i(d.entries()).flatMap((function(e){var n=s(e,2),t=n[0],a=n[1];return[t].concat(i(a))}))}))}),[k,h,z.enabled,z.enabled&&z.queue,w,S,v,p]),t}}
