function module(e,t,o){let n,l,_,a,r,m,c,i,u;o.link("@babel/runtime/helpers/objectWithoutProperties",{default(e){n=e}},0),o.link("react",{default(e){l=e}},0),o.link("@rocket.chat/fuselage",{Box(e){_=e},Button(e){a=e},ButtonGroup(e){r=e},Icon(e){m=e},Modal(e){c=e}},1),o.link("./RawText",{default(e){i=e}},2),o.link("../contexts/TranslationContext",{useTranslation(e){u=e}},3);const s=e=>{let{onConfirm:t,onCancel:o,contentTitle:s="",confirmLabel:g="",shouldChangeOwner:h,shouldBeRemoved:d}=e,w=n(e,["onConfirm","onCancel","contentTitle","confirmLabel","shouldChangeOwner","shouldBeRemoved"]);const E=u();let p="";h.length>0&&(p=1===h.length?E("A_new_owner_will_be_assigned_automatically_to_the__roomName__room",{roomName:h.pop()}):h.length<=5?E("A_new_owner_will_be_assigned_automatically_to_those__count__rooms__rooms__",{count:h.length,rooms:h.join(", ")}):E("A_new_owner_will_be_assigned_automatically_to__count__rooms",{count:h.length}));let C="";return d.length>0&&(C=1===d.length?E("The_empty_room__roomName__will_be_removed_automatically",{roomName:d.pop()}):d.length<=5?E("__count__empty_rooms_will_be_removed_automatically__rooms__",{count:d.length,rooms:d.join(", ")}):E("__count__empty_rooms_will_be_removed_automatically",{count:d.length})),l.createElement(c,w,l.createElement(c.Header,null,l.createElement(m,{color:"danger",name:"modal-warning",size:20}),l.createElement(c.Title,null,E("Are_you_sure")),l.createElement(c.Close,{onClick:o})),l.createElement(c.Content,{fontScale:"p1"},s,p&&l.createElement(_,{marginBlock:"x16"},l.createElement(i,null,p)),C&&l.createElement(_,{marginBlock:"x16"},l.createElement(i,null,C))),l.createElement(c.Footer,null,l.createElement(r,{align:"end"},l.createElement(a,{ghost:!0,onClick:o},E("Cancel")),l.createElement(a,{primary:!0,danger:!0,onClick:t},g))))};o.exportDefault(s)}

