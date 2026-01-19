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
            key: 'start_time',
            label: '开始时间',
            component: block_basekit_server_api_1.FieldComponent.Input,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Number],
            },
            validator: {
                required: true,
            },
        },
        {
            key: 'end_time',
            label: '结束时间',
            component: block_basekit_server_api_1.FieldComponent.Input,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Number],
            },
            validator: {
                required: true,
            },
        },
        {
            key: 'video_url',
            label: '视频',
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Attachment]
            },
            validator: {
                required: true,
            }
        },
    ],
    // 定义捷径的返回结果类型
    // resultType: {
    //   type: FieldType.Object,
    //   extra: {
    //     icon: {
    //       light: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/eqgeh7upeubqnulog/chatbot.svg',
    //     },
    //     properties: [
    //       {
    //         key: 'id',
    //         isGroupByKey: true,
    //         type: FieldType.Text,
    //         label: 'id',
    //         hidden: true,
    //       },
    //       {
    //         key: 'output',
    //         type: FieldType.Text,
    //         label: t('output'),
    //         primary: true
    //       },
    //       {
    //         key: 'errorMessage',
    //         type: FieldType.Text,
    //         label: t('errorMessage')
    //       },
    //     ],
    //   },
    // },
    resultType: {
        type: block_basekit_server_api_1.FieldType.Attachment
    },
    // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
    execute: async (formItemParams, context) => {
        const { token = '', start_time = 0, end_time = 10, video_url = {} } = formItemParams;
        /** 为方便查看日志，使用此方法替代console.log */
        const debugLog = (arg) => {
            // @ts-ignore
        };
        try {
            if (!video_url) {
                return {
                    code: block_basekit_server_api_1.FieldCode.Success,
                    data: {
                        'id': '-',
                        'output': '',
                        'errorMessage': '视频字段不能为空'
                    }
                };
            }
            const body = JSON.stringify({
                "start_time": start_time,
                "end_time": end_time,
                "video_url": video_url[0]["tmp_url"]
            });
            console.log('body', body);
            const resText = await context.fetch('https://wefly-lanyue.52tt.com/lanyue/api/video/clipping', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    token,
                },
                body,
            }).then(res => res.text()); // 不要直接res.json()，这非常容易报错，且难以排查
            console.log(resText);
            const res = JSON.parse(resText);
            console.log("res", res);
            let message = '';
            if (res.code != 0 && res.code != 200) {
                message = res["message"];
                debugLog({
                    '===1 解析后的结果': message
                });
                throw new Error(res.message || '接口异常');
            }
            const video_result_url = res["data"]['workflow_result']['output'];
            const video_result_url_array = video_result_url.split('/');
            const name = video_result_url_array[video_result_url_array.length - 1];
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                data: [
                    {
                        "name": name,
                        "content": video_result_url,
                        "contentType": "attachment/url",
                    },
                ]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBMkc7QUFHM0csTUFBTSxRQUFRLEdBQUcsQ0FBQyxXQUFXLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ3JGLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxnQ0FBSyxDQUFDO0FBQ3BCLHFEQUFxRDtBQUNyRCxrQ0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsUUFBUSxFQUFFLHFCQUFxQixFQUFFLDRCQUE0QixFQUFFLHVCQUF1QixFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFFOUgsa0NBQU8sQ0FBQyxRQUFRLENBQUM7SUFDZixnQkFBZ0I7SUFDaEIsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFLEVBQ1I7WUFDRCxPQUFPLEVBQUUsRUFDUjtZQUNELE9BQU8sRUFBRSxFQUNSO1NBQ0Y7S0FDRjtJQUNELFVBQVU7SUFDVixTQUFTLEVBQUU7UUFDVDtZQUNFLEdBQUcsRUFBRSxPQUFPO1lBQ1osS0FBSyxFQUFFLFNBQVM7WUFDaEIsU0FBUyxFQUFFLHlDQUFjLENBQUMsS0FBSztZQUMvQixLQUFLLEVBQUU7Z0JBQ0wsV0FBVyxFQUFFLENBQUMsb0NBQVMsQ0FBQyxJQUFJLENBQUM7YUFDOUI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1QsUUFBUSxFQUFFLElBQUk7YUFDZjtTQUNGO1FBQ0Q7WUFDRSxHQUFHLEVBQUUsWUFBWTtZQUNqQixLQUFLLEVBQUUsTUFBTTtZQUNiLFNBQVMsRUFBRSx5Q0FBYyxDQUFDLEtBQUs7WUFDL0IsS0FBSyxFQUFFO2dCQUNMLFdBQVcsRUFBRSxDQUFDLG9DQUFTLENBQUMsTUFBTSxDQUFDO2FBQ2hDO1lBQ0QsU0FBUyxFQUFFO2dCQUNULFFBQVEsRUFBRSxJQUFJO2FBQ2Y7U0FDRjtRQUNEO1lBQ0Us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