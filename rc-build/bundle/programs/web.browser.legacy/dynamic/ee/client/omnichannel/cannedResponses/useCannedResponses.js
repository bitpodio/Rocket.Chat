function module(e,n,t){var o,i,c,r;t.link("@babel/runtime/helpers/objectSpread2",{default:function(e){o=e}},0),t.export({useCannedResponses:function(){return s}}),t.link("react",{useCallback:function(e){i=e}},0),t.link("../../../../client/hooks/useReactiveValue",{useReactiveValue:function(e){c=e}},1),t.link("../../../app/canned-responses/client/collections/CannedResponse",{CannedResponse:function(e){r=e}},2);var s=function(e,n,t){return c(i((function(){var i=o(o(o({},n&&{departmentId:n,scope:"department"}),t&&{_id:t}),!t&&{$or:[{shortcut:{$regex:e,$options:"i"}},{text:{$regex:e,$options:"i"}}]});return r.find(i).fetch()}),[n,e,t]))}}

