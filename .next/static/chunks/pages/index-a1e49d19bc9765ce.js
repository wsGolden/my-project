(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(2603)}])},8027:function(e,t,n){"use strict";n.r(t);var s=n(5893),i=n(7294),l=n(3856),r=n(7790),a=n(9014),c=n(7917),u=n(7531),d=n.n(u);t.default=function(e){let{onSubmit:t,onCancel:n,recordId:u}=e,[o]=l.Z.useForm();(0,i.useEffect)(()=>{if(u){let e=new(d()).Query("TestObject");e.get(u).then(e=>{console.log(e,123),o.setFieldsValue({...e._serverData})})}},[u]);let m=e=>{let s=d().Object.extend("TestObject"),i=new s;o.validateFields().then(async()=>{if(i.set("name",e.name),i.set("nick",e.nick),u){let t=d().Object.createWithoutData("TestObject",u);t.set("name",e.name),t.set("nick",e.nick),t.save(),o.resetFields(),r.ZP.success("编辑成功");return}await i.save().then(e=>{console.log("保存成功。objectId：".concat(e.id)),r.ZP.success("新增成功"),o.resetFields()},e=>{})}),t(),null==n||n()},h=()=>{o.resetFields(),null==n||n()};return(0,s.jsx)(a.Z,{open:!0,title:"新增数据",onOk:o.submit,onCancel:h,children:(0,s.jsxs)(l.Z,{form:o,onFinish:m,children:[(0,s.jsx)(l.Z.Item,{name:"name",label:"姓名",rules:[{required:!0}],children:(0,s.jsx)(c.Z,{})}),(0,s.jsx)(l.Z.Item,{name:"nick",label:"昵称",rules:[{required:!0}],children:(0,s.jsx)(c.Z,{})})]})})}},2603:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return h}});var s=n(5893),i=n(7294),l=n(3856),r=n(1577),a=n(7790),c=n(7917),u=n(3416),d=n(7531),o=n.n(d),m=n(8027);function h(){let[e]=l.Z.useForm(),[t,n]=(0,i.useState)([]),[d,h]=(0,i.useState)(!1),[j,x]=(0,i.useState)(""),f=e=>{let t=o().Object.createWithoutData("TestObject",e);t.destroy(),a.ZP.success("删除成功"),k()},Z=e=>{h(!0),x(e)},k=()=>{setTimeout(()=>{let e=new(o()).Query("TestObject");e.find().then(e=>{n(b(e))})},0)};(0,i.useEffect)(()=>{k()},[]);let b=e=>{let t=e.map(e=>({...e._serverData,id:e.id}));return t},y=t=>{e.validateFields().then(()=>{let e=new(o()).Query("TestObject");t.name&&e.equalTo("name",t.name||""),t.nick&&e.equalTo("nick",t.nick||""),e.find().then(e=>{n(b(e)),console.log(e,123312)})})};return(0,s.jsxs)("div",{children:[(0,s.jsxs)(l.Z,{form:e,layout:"inline",onFinish:y,style:{margin:20},children:[(0,s.jsx)(l.Z.Item,{name:"name",label:"姓名",children:(0,s.jsx)(c.Z,{})}),(0,s.jsx)(l.Z.Item,{name:"nick",label:"昵称",children:(0,s.jsx)(c.Z,{})}),(0,s.jsx)(r.ZP,{type:"primary",htmlType:"submit",style:{marginRight:10},children:"搜索"}),(0,s.jsx)(r.ZP,{htmlType:"reset",style:{marginRight:10},children:"清除"}),(0,s.jsx)(r.ZP,{type:"primary",onClick:()=>h(!0),children:"新增"})]}),d&&(0,s.jsx)(m.default,{recordId:j,onSubmit:k,onCancel:()=>h(!1)}),(0,s.jsx)(u.Z,{rowKey:"id",columns:[{dataIndex:"id",title:"ID",width:90},{dataIndex:"name",title:"名字"},{dataIndex:"nick",title:"昵称"},{dataIndex:"opt",title:"操作",render:(e,t)=>{let{id:n}=t;return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(r.ZP,{type:"link",onClick:()=>Z(n),children:"编辑"}),(0,s.jsx)(r.ZP,{type:"link",danger:!0,onClick:()=>f(n),children:"删除"})]})}}],dataSource:t})]})}}},function(e){e.O(0,[500,416,774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);