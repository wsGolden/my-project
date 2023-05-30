"use strict";
exports.id = 27;
exports.ids = [27];
exports.modules = {

/***/ 27:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(893);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var leancloud_storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(457);
/* harmony import */ var leancloud_storage__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(leancloud_storage__WEBPACK_IMPORTED_MODULE_3__);




function EditModal({ onSubmit , onCancel , recordId  }) {
    const [form] = antd__WEBPACK_IMPORTED_MODULE_2__.Form.useForm();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (recordId) {
            const query = new (leancloud_storage__WEBPACK_IMPORTED_MODULE_3___default().Query)("TestObject");
            query.get(recordId).then((res)=>{
                console.log(res, 123);
                form.setFieldsValue({
                    ...res._serverData
                });
            });
        }
    }, [
        recordId
    ]);
    const handleSubmit = (values)=>{
        // 创建 TestObject 表对象，并设置 name 字段
        const TestObject = leancloud_storage__WEBPACK_IMPORTED_MODULE_3___default().Object.extend("TestObject");
        const testObject = new TestObject();
        form.validateFields().then(async ()=>{
            testObject.set("name", values.name);
            testObject.set("nick", values.nick);
            // 将对象保存到 LeanCloud
            if (recordId) {
                const todo = leancloud_storage__WEBPACK_IMPORTED_MODULE_3___default().Object.createWithoutData("TestObject", recordId);
                todo.set("name", values.name);
                todo.set("nick", values.nick);
                todo.save();
                form.resetFields();
                antd__WEBPACK_IMPORTED_MODULE_2__.message.success("编辑成功");
                return;
            }
            await testObject.save().then((testObject)=>{
                // 成功保存之后，执行其他逻辑
                console.log(`保存成功。objectId：${testObject.id}`);
                antd__WEBPACK_IMPORTED_MODULE_2__.message.success("新增成功");
                form.resetFields();
            }, (error)=>{
            // 异常处理
            });
        });
        onSubmit();
        onCancel?.();
    };
    const handleCancel = ()=>{
        form.resetFields();
        onCancel?.();
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Modal, {
        open: true,
        title: "新增数据",
        onOk: form.submit,
        onCancel: handleCancel,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_2__.Form, {
            form: form,
            onFinish: handleSubmit,
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                    name: "name",
                    label: "姓名",
                    rules: [
                        {
                            required: true
                        }
                    ],
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Input, {})
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                    name: "nick",
                    label: "昵称",
                    rules: [
                        {
                            required: true
                        }
                    ],
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Input, {})
                })
            ]
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EditModal);


/***/ })

};
;