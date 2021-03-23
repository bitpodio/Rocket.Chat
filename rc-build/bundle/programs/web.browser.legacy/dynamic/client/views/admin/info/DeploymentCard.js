function module(e,n,t){var l,o,i,r,c,u,a,m,s,f;t.link("react",{default:function(e){l=e}},0),t.link("@rocket.chat/fuselage-hooks",{useMutableCallback:function(e){o=e}},1),t.link("@rocket.chat/fuselage",{Skeleton:function(e){i=e},ButtonGroup:function(e){r=e},Button:function(e){c=e}},2),t.link("../../../components/Card/Card",{default:function(e){u=e}},3),t.link("./InstancesModal",{default:function(e){a=e}},4),t.link("../../../contexts/ModalContext",{useSetModal:function(e){m=e}},5),t.link("../../../contexts/TranslationContext",{useTranslation:function(e){s=e}},6),t.link("../../../hooks/useFormatDateAndTime",{useFormatDateAndTime:function(e){f=e}},7);var E=l.memo(function(){function e(e){var n=e.info,t=e.statistics,E=e.instances,d=e.isLoading,C=s(),k=f(),g=m(),p=n.commit,T=void 0===p?{}:p,D=function(e){return d?l.createElement(i,{width:"50%"}):e()},S=n&&n.marketplaceApiVersion,h=o((function(){g(l.createElement(a,{instances:E,onClose:function(){return g()}}))}));return l.createElement(u,null,l.createElement(u.Title,null,C("Deployment")),l.createElement(u.Body,null,l.createElement(u.Col,null,l.createElement(u.Col.Section,null,l.createElement(u.Col.Title,null,C("Version")),D((function(){return t.version}))),l.createElement(u.Col.Section,null,l.createElement(u.Col.Title,null,C("Deployment_ID")),D((function(){return t.uniqueId}))),S&&l.createElement(u.Col.Section,null,l.createElement(u.Col.Title,null,C("Apps_Engine_Version")),S),l.createElement(u.Col.Section,null,l.createElement(u.Col.Title,null,C("Node_version")),D((function(){return t.process.nodeVersion}))),l.createElement(u.Col.Section,null,l.createElement(u.Col.Title,null,C("DB_Migration")),D((function(){return t.migration.version+" ("+k(t.migration.lockedAt)}))),l.createElement(u.Col.Section,null,l.createElement(u.Col.Title,null,C("MongoDB")),D((function(){return t.mongoVersion+" / "+t.mongoStorageEngine+" (oplog "+(t.oplogEnabled?C("Enabled"):C("Disabled"))+")"}))),l.createElement(u.Col.Section,null,l.createElement(u.Col.Title,null,C("Commit_details")),C("HEAD"),": (",D((function(){return T.hash.slice(0,9)})),") ",l.createElement("br",null),C("Branch"),": ",D((function(){return T.branch}))),l.createElement(u.Col.Section,null,l.createElement(u.Col.Title,null,C("PID")),D((function(){return t.process.pid}))))),!!E.length&&l.createElement(u.Footer,null,l.createElement(r,{align:"end"},l.createElement(c,{small:!0,onClick:h},C("Instances")))))}return e}());t.exportDefault(E)}

