"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const feishuDm = ['feishu.cn', 'feishucdn.com', 'larksuitecdn.com', 'larksuite.com'];
const { t } = block_basekit_server_api_1.field;
// 通过addDomainList添加请求接口的域名，不可写多个addDomainList，否则会被覆盖
block_basekit_server_api_1.basekit.addDomainList([...feishuDm, 'wefly-test.52tt.com', 'wefly-lanyue-test.52tt.com', 'wefly-lanyue.52tt.com', '0.0.0.0']);
block_basekit_server_api_1.basekit.addField({
    // 定义捷径的i18n语言资源
    i18n: {
        messages: {
            'zh-CN': {},
            'en-US': {},
            'ja-JP': {},
        }
    },
    // 定义捷径的入参
    formItems: [
        {
            key: 'token',
            label: 'API KEY',
            component: block_basekit_server_api_1.FieldComponent.Input,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Text],
            },
            validator: {
                required: true,
            },
        },
        {
            key: 'video_file',
            label: '视频',
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Attachment]
            },
            validator: {
                required: true,
            }
        },
        {
            key: 'child_video_file',
            label: '子视频',
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Attachment]
            },
            validator: {
                required: true,
            }
        },
        {
            key: 'child_video_position',
            label: '子视频位置',
            component: block_basekit_server_api_1.FieldComponent.SingleSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Number],
                options: [
                    { label: '1', value: "152,82" },
                    { label: '2', value: "355,82" },
                    { label: '3', value: "558,82" },
                    { label: '4', value: "152,268" },
                    { label: '5', value: "355,268" },
                    { label: '6', value: "558,268" },
                    { label: '7', value: "152,609" },
                    { label: '8', value: "355,609" },
                    { label: '9', value: "558,609" },
                    { label: '10', value: "152,912" },
                    { label: '11', value: "355,912" },
                    { label: '12', value: "558,912" }
                ]
            },
            validator: {
                required: true,
            },
            tooltips: [
                {
                    type: 'link',
                    text: '子视频位置参考图示',
                    link: 'blob:https://q9jvw0u5f5.feishu.cn/94e82af0-2db3-488a-9422-6768f21e71bb',
                },
            ]
        },
        {
            key: 'copywriting',
            label: '文案',
            component: block_basekit_server_api_1.FieldComponent.Input,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Text]
            },
            validator: {
                required: false,
            }
        },
        {
            key: 'copywriting_position',
            label: '文案位置',
            component: block_basekit_server_api_1.FieldComponent.SingleSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Number],
                options: [
                    { label: '1', value: "152,82" },
                    { label: '2', value: "355,82" },
                    { label: '3', value: "558,82" },
                    { label: '4', value: "152,268" },
                    { label: '5', value: "355,268" },
                    { label: '6', value: "558,268" },
                    { label: '7', value: "152,609" },
                    { label: '8', value: "355,609" },
                    { label: '9', value: "558,609" },
                    { label: '10', value: "152,912" },
                    { label: '11', value: "355,912" },
                    { label: '12', value: "558,912" },
                    { label: '13', value: "355,1092" },
                ]
            },
            validator: {
                required: false,
            },
            tooltips: [
                {
                    type: 'link',
                    text: '文案位置参考图示',
                    link: 'blob:https://q9jvw0u5f5.feishu.cn/94e82af0-2db3-488a-9422-6768f21e71bb',
                },
            ]
        },
        {
            key: 'align',
            label: '对齐方式',
            component: block_basekit_server_api_1.FieldComponent.Radio,
            defaultValue: { label: '居中对齐', value: 'center' },
            props: {
                options: [
                    { label: '左对齐', value: 'left' },
                    { label: '居中对齐', value: 'center' },
                    { label: '右对齐', value: 'right' },
                ]
            },
            validator: {
                required: false,
            }
        }
    ],
    // 定义捷径的返回结果类型
    resultType: {
        type: block_basekit_server_api_1.FieldType.Attachment
    },
    // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
    execute: async (formItemParams, context) => {
        const { token = '', video_file = {}, child_video_file = {}, child_video_position = "152,82", copywriting = '', copywriting_position = "152,82", align = { label: '居中对齐', value: 'center' } } = formItemParams;
        /** 为方便查看日志，使用此方法替代console.log */
        const debugLog = (arg) => {
            // @ts-ignore
        };
        try {
            if (!video_file || !child_video_file) {
                return {
                    code: block_basekit_server_api_1.FieldCode.Success,
                    data: {
                        'id': '-',
                        'output': '',
                        'errorMessage': '图片字段不能为空'
                    }
                };
            }
            const body = JSON.stringify({
                "token": token,
                "video_url": video_file,
                "child_video_url": child_video_file,
                "child_video_position": child_video_position,
                "copywriting": copywriting,
                "copywriting_position": copywriting_position,
                "align": align
            });
            console.log('body', body);
            const resText = await context.fetch('https://wefly-lanyue.52tt.com/lanyue/api/video/superposition_video', {
                // const resText: any = await context.fetch('http://wefly-test.52tt.com/lanyue/push/video/superposition_video', { // 已经在addDomainList中添加为白名单的请求
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token,
                },
                body,
            }).then(res => res.text()); // 不要直接res.json()，这非常容易报错，且难以排查
            const res = JSON.parse(resText);
            console.log("res", res);
            let message = '';
            if (res.code != 0 && res.code != 200) {
                message = res["error_msg"];
                debugLog({
                    '===1 解析后的结果': message
                });
                throw new Error(res.message || '接口异常');
            }
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                data: [
                    {
                        "name": res["data"]['workflow_result']["task_id"] + ".mp4",
                        "content": res["data"]['workflow_result']['result'],
                        "contentType": "attachment/url",
                    },
                ],
            };
        }
        catch (e) {
            debugLog({
                '===999 异常错误': String(e)
            });
            /**
             * 返回非 Success 的错误码，将会在单元格上显示报错，请勿返回msg、message之类的字段，它们并不会起作用。
             * 对于未知错误，请直接返回 FieldCode.Error，然后通过查日志来排查错误原因。
             */
            return {
                code: block_basekit_server_api_1.FieldCode.Error,
            };
        }
    },
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBMkc7QUFHM0csTUFBTSxRQUFRLEdBQUcsQ0FBQyxXQUFXLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ3JGLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxnQ0FBSyxDQUFDO0FBQ3BCLHFEQUFxRDtBQUNyRCxrQ0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsUUFBUSxFQUFFLHFCQUFxQixFQUFFLDRCQUE0QixFQUFFLHVCQUF1QixFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFFOUgsa0NBQU8sQ0FBQyxRQUFRLENBQUM7SUFDZixnQkFBZ0I7SUFDaEIsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLEVBQ1I7WUFDRCxPQUFPLEVBQUUsRUFDUjtZQUNELE9BQU8sRUFBRSxFQUNSO1NBQ0Y7S0FDRjtJQUNELFVBQVU7SUFDVixTQUFTLEVBQUU7UUFDVDtZQUNFLEdBQUcsRUFBRSxPQUFPO1lBQ1osS0FBSyxFQUFFLFNBQVM7WUFDaEIsU0FBUyxFQUFFLHlDQUFjLENBQUMsS0FBSztZQUMvQixLQUFLLEVBQUU7Z0JBQ0wsV0FBVyxFQUFFLENBQUMsb0NBQVMsQ0FBQyxJQUFJLENBQUM7YUFDOUI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsUUFBUSxFQUFFLElBQUk7YUFDZjtTQUNGO1FBQ0Q7WUFDRSxHQUFHLEVBQUUsWUFBWTtZQUNqQixLQUFLLEVBQUUsSUFBSTtZQUNYLFNBQVMsRUFBRSx5Q0FBYyxDQUFDLFdBQVc7WUFDckMsS0FBSyxFQUFFO2dCQUNMLFdBQVcsRUFBRSxDQUFDLG9DQUFTLENBQUMsVUFBVSxDQUFDO2FBQ3BDO1lBQ0QsU0FBUyxFQUFFO2dCQUNULFFBQVEsRUFBRSxJQUFJO2FBQ2Y7U0FDRjtRQUNEO1lBQ0Us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