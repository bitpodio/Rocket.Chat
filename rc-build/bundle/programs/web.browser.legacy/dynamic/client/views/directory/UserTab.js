function module(e,t,n){var a,o,i,r,l,c,u,s,m,d,f,k,h,x,E,p,C,T,v,w,y,g,b;function A(e){var t=e.workspace,n=void 0===t?"local":t,C=c({current:0,itemsPerPage:25}),A=i(C,2),D=A[0],F=A[1],P=c(["name","asc"]),S=i(P,2),R=S[0],H=S[1],z=T("view-full-other-user-info"),B=w(),M="external"===n,_=b(D,R,"users",n),I=f("(min-width: 1024px)"),N=u((function(e){var t=i(R,2),n=t[0],a=t[1];H(n!==e?[e,"asc"]:[e,"asc"===a?"desc":"asc"])}),[R]),Q=l((function(){return[r.createElement(p.HeaderCell,{key:"name",direction:R[1],active:"name"===R[0],onClick:N,sort:"name"},B("Name")),I&&z&&r.createElement(p.HeaderCell,{key:"email",direction:R[1],active:"email"===R[0],onClick:N,sort:"email",style:{width:"200px"}},B("Email")),M&&r.createElement(p.HeaderCell,{key:"origin",direction:R[1],active:"origin"===R[0],onClick:N,sort:"origin",style:{width:"200px"}},B("Domain")),I&&r.createElement(p.HeaderCell,{key:"createdAt",direction:R[1],active:"createdAt"===R[0],onClick:N,sort:"createdAt",style:{width:"200px"}},B("Joined_at"))].filter(Boolean)}),[R,N,B,I,z,M]),U=v("direct"),j,G=y("directory",_).value,J=void 0===G?{}:G,K=u((function(e){return function(t){"click"!==t.type&&"Enter"!==t.key||U.push({rid:e})}}),[U]),W=g(),q=u((function(e){var t=e.createdAt,n=e.emails,a=e._id,o=e.username,i=e.name,l=e.domain,c=e.bio,u=e.avatarETag,f=e.nickname;return(r.createElement(m.Row,{key:a,onKeyDown:K(o),onClick:K(o),tabIndex:0,role:"link",action:!0},r.createElement(m.Cell,null,r.createElement(d.Container,null,r.createElement(s,null,r.createElement(d.Item,null,r.createElement(h,{size:"x40",title:o,username:o,etag:u})),r.createElement(s,{withTruncatedText:!0,grow:1,mi:"x8"},r.createElement(s,{display:"flex"},r.createElement(s,{fontScale:"p2",withTruncatedText:!0},i||o,f&&" ("+f+")")," ",r.createElement(s,{mi:"x4"})," ",r.createElement(s,{fontScale:"p1",color:"hint",withTruncatedText:!0},o)),r.createElement(x,{fontScale:"p1",color:"hint",content:c}))))),I&&z&&r.createElement(m.Cell,{withTruncatedText:!0},n&&n[0].address),M&&r.createElement(m.Cell,{withTruncatedText:!0},l),I&&r.createElement(m.Cell,{fontScale:"p1",color:"hint",withTruncatedText:!0},W(t))))}),[I,M,z,W,K]),L=k(!0);return r.createElement(p,{header:Q,renderFilter:function(e){var t=e.onChange,n=o(e,["onChange"]);return(r.createElement(E,a({placeholder:B("Search_Users"),inputRef:L,onChange:t},n)))},renderRow:q,results:J.result,setParams:F,total:J.total})}function D(e){var t=T("view-outside-room"),n=T("view-d-room");return t&&n?r.createElement(A,e):r.createElement(C,null)}n.link("@babel/runtime/helpers/extends",{default:function(e){a=e}},0),n.link("@babel/runtime/helpers/objectWithoutProperties",{default:function(e){o=e}},1),n.link("@babel/runtime/helpers/slicedToArray",{default:function(e){i=e}},2),n.export({default:function(){return D}}),n.link("react",{default:function(e){r=e},useMemo:function(e){l=e},useState:function(e){c=e},useCallback:function(e){u=e}},0),n.link("@rocket.chat/fuselage",{Box:function(e){s=e},Table:function(e){m=e},Flex:function(e){d=e}},1),n.link("@rocket.chat/fuselage-hooks",{useMediaQuery:function(e){f=e},useAutoFocus:function(e){k=e}},2),n.link("../../components/avatar/UserAvatar",{default:function(e){h=e}},3),n.link("../../components/MarkdownText",{default:function(e){x=e}},4),n.link("../../components/FilterByText",{default:function(e){E=e}},5),n.link("../../components/GenericTable",{default:function(e){p=e}},6),n.link("../../components/NotAuthorizedPage",{default:function(e){C=e}},7),n.link("../../contexts/AuthorizationContext",{usePermission:function(e){T=e}},8),n.link("../../contexts/RouterContext",{useRoute:function(e){v=e}},9),n.link("../../contexts/TranslationContext",{useTranslation:function(e){w=e}},10),n.link("../../hooks/useEndpointData",{useEndpointData:function(e){y=e}},11),n.link("../../hooks/useFormatDate",{useFormatDate:function(e){g=e}},12),n.link("./hooks",{useQuery:function(e){b=e}},13)}

