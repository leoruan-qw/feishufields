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
            'zh-CN': {
                'errorMessage': '错误信息',
                'output': '视频'
            },
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
            key: 'video_url_1',
            label: '视频1',
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Attachment]
            },
            validator: {
                required: true,
            },
            tooltips: [
                {
                    type: 'text',
                    content: '请严格按合并顺序选择'
                },
            ]
        },
        {
            key: 'video_url_2',
            label: '视频2',
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Attachment]
            },
            validator: {
                required: true,
            },
            tooltips: [
                {
                    type: 'text',
                    content: '请严格按合并顺序选择'
                },
            ]
        },
        {
            key: 'video_url_3',
            label: '视频3',
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Attachment]
            }
        },
        {
            key: 'video_url_4',
            label: '视频4',
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Attachment]
            }
        },
        {
            key: 'video_url_5',
            label: '视频5',
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Attachment]
            }
        },
        {
            key: 'video_url_6',
            label: '视频6',
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Attachment]
            }
        },
        {
            key: 'video_url_7',
            label: '视频7',
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Attachment]
            }
        },
        {
            key: 'video_url_8',
            label: '视频8',
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Attachment]
            }
        },
        {
            key: 'video_url_9',
            label: '视频9',
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Attachment]
            }
        },
        {
            key: 'video_url_10',
            label: '视频10',
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Attachment]
            }
        }
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
        const { token = '', video_url_1 = {}, video_url_2 = {}, video_url_3 = {}, video_url_4 = {}, video_url_5 = {}, video_url_6 = {}, video_url_7 = {}, video_url_8 = {}, video_url_9 = {}, video_url_10 = {} } = formItemParams;
        /** 为方便查看日志，使用此方法替代console.log */
        const debugLog = (arg) => {
            // @ts-ignore
        };
        try {
            if (!video_url_1 || !video_url_2) {
                return {
                    code: block_basekit_server_api_1.FieldCode.Success,
                    data: {
                        'id': '-',
                        'output': '',
                        'errorMessage': '视频链接不能为空'
                    }
                };
            }
            const body = JSON.stringify({
                "video_url": [video_url_1, video_url_2, video_url_3, video_url_4, video_url_5, video_url_6, video_url_7, video_url_8, video_url_9, video_url_10]
            });
            console.log('body', body);
            const resText = await context.fetch('https://wefly-lanyue.52tt.com/lanyue/api/video/merge', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtRkFBMkc7QUFHM0csTUFBTSxRQUFRLEdBQUcsQ0FBQyxXQUFXLEVBQUUsZUFBZSxFQUFFLGtCQUFrQixFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ3JGLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxnQ0FBSyxDQUFDO0FBQ3BCLHFEQUFxRDtBQUNyRCxrQ0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsUUFBUSxFQUFFLHFCQUFxQixFQUFFLDRCQUE0QixFQUFFLHVCQUF1QixFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7QUFFOUgsa0NBQU8sQ0FBQyxRQUFRLENBQUM7SUFDZixnQkFBZ0I7SUFDaEIsSUFBSSxFQUFFO1FBQ0osUUFBUSxFQUFFO1lBQ1IsT0FBTyxFQUFFO2dCQUNQLGNBQWMsRUFBQyxNQUFNO2dCQUNyQixRQUFRLEVBQUMsSUFBSTthQUNkO1lBQ0QsT0FBTyxFQUFFLEVBQ1I7WUFDRCxPQUFPLEVBQUUsRUFDUjtTQUNGO0tBQ0Y7SUFDRCxVQUFVO0lBQ1YsU0FBUyxFQUFFO1FBQ1Q7WUFDRSxHQUFHLEVBQUUsT0FBTztZQUNaLEtBQUssRUFBRSxTQUFTO1lBQ2hCLFNBQVMsRUFBRSx5Q0FBYyxDQUFDLEtBQUs7WUFDL0IsS0FBSyxFQUFFO2dCQUNMLFdBQVcsRUFBRSxDQUFDLG9DQUFTLENBQUMsSUFBSSxDQUFDO2FBQzlCO1lBQ0QsU0FBUyxFQUFFO2dCQUNULFFBQVEsRUFBRSxJQUFJO2FBQ2Y7U0FDRjtRQUNEO1lBQ0UsR0FBRyxFQUFFLGFBQWE7WUFDbEIsS0FBSyxFQUFFLEtBQUs7WUFDWixTQUFTLEVBQUUseUNBQWMsQ0FBQyxXQUFXO1lBQ3JDLEtBQUssRUFBRTtnQkFDTCxXQUFXLEVBQUUsQ0FBQyxvQ0FBUyxDQUFDLFVBQVUsQ0FBQzthQUNwQztZQUNELFNBQVMsRUFB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