function module(t,n,i){var e,r,o,s;i.link("@babel/runtime/helpers/createClass",{default:function(t){e=t}},0),i.link("@babel/runtime/helpers/inheritsLoose",{default:function(t){r=t}},1),i.export({DiscussionsList:function(){return l}}),i.link("./MessageList",{MessageList:function(t){o=t}},0),i.link("../../../lib/escapeRegExp",{escapeRegExp:function(t){s=t}},1);var u=function(t,n){return t.rid===n&&"drid"in t},c=function(t,n){return n.test(t.msg)},l=function(t){function n(n){var i;return(i=t.call(this)||this)._options=n,i}r(n,t);var i=n.prototype;return i.updateFilters=function(){function t(t){this._options=t,this.clear()}return t}(),i.filter=function(){function t(t){var n=this._options.rid;if(!u(t,n))return!1;if(this._options.text){var i=new RegExp(this._options.text.split(/\s/g).map((function(t){return s(t)})).join("|"));if(!c(t,i))return!1}return!0}return t}(),i.compare=function(){function t(t,n){var i,e;return(null!==(i=n.tlm)&&void 0!==i?i:n.ts).getTime()-(null!==(e=t.tlm)&&void 0!==e?e:t.ts).getTime()}return t}(),e(n,[{key:"options",get:function(){return this._options}}]),n}(o)}

