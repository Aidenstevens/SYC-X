import eventBus from"../utils/eventBus";import rules from"../behaviors/rules";Component({externalClasses:["l-class","l-error-text","l-error-text-class"],behaviors:["wx://form-field",rules],relations:{"../radio/index":{type:"child",linked(){this.init()},linkChanged(){},unlinked(){this.init()}}},properties:{current:{type:String},noneChecked:{type:Boolean,value:!0},placement:{type:String,value:"column"}},data:{currentLength:0},methods:{checkedKeyRepeat(e){let t=e.map(e=>e.data.key);const r=this.isRepeat(t);if(!1!==r)throw new Error("keys有重复元素, radio的key属性不能重复："+r)},isRepeat(e){let t={};for(let r in e){if(t[e[r]])return e[r];t[e[r]]=!0}return!1},init(){const e=this.getRelationNodes("../radio/index");this.checkedKeyRepeat(e),this.onChangeHandle(e)},onChangeHandle(e){e.forEach(e=>{let t=this.properties.current==e.data.key;e.setChecked(t,e.data.key)})},onEmitEventHandle(e,t){this.properties.current=t?e.key:null;const r=this.getRelationNodes("../radio/index");this.onChangeHandle(r),Object.assign(e,{currentKey:this.properties.current}),this.validatorData({[this.data.name]:this.data.current}),this.triggerEvent("linchange",e,{bubbles:!0,composed:!0}),eventBus.emit("lin-form-change-"+this.id,this.id)},getValues(){return this.data.current},reset(){this.data.current=""}},observers:{current:function(){this.init()}}});