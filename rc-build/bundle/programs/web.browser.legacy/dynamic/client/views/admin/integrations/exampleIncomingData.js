function module(t,e,n){var a,i;function o(t){var e=t.additionalFields,n=t.url;return i((function(){var t=a(a({},e),{},{text:"Example message",attachments:[{title:"Rocket.Chat",title_link:"https://rocket.chat",text:"Rocket.Chat, the best open source chat",image_url:"/images/integration-attachment-example.png",color:"#764FA5"}]});return[t,"curl -X POST -H 'Content-Type: application/json' --data '"+JSON.stringify(t)+"' "+n]}),[e,n])}n.link("@babel/runtime/helpers/objectSpread2",{default:function(t){a=t}},0),n.export({useExampleData:function(){return o}}),n.link("react",{useMemo:function(t){i=t}},0)}

