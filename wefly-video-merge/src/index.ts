import { basekit, FieldType, FieldComponent, FieldCode, field} from '@lark-opdev/block-basekit-server-api';


const feishuDm = ['feishu.cn', 'feishucdn.com', 'larksuitecdn.com', 'larksuite.com'];
const { t } = field;
// 通过addDomainList添加请求接口的域名，不可写多个addDomainList，否则会被覆盖
basekit.addDomainList([...feishuDm, 'wefly-test.52tt.com', 'wefly-lanyue-test.52tt.com', 'wefly-lanyue.52tt.com', '0.0.0.0']);

basekit.addField({
  // 定义捷径的i18n语言资源
  i18n: {
    messages: {
      'zh-CN': {
        'errorMessage':'错误信息',
        'output':'视频' 
      },
      'en-US': {
      },
      'ja-JP': {
      },
    }
  },
  // 定义捷径的入参
  formItems: [
    {
      key: 'token',
      label: 'API KEY',
      component: FieldComponent.Input,
      props: {
        supportType: [FieldType.Text],
      },
      validator: {
        required: true,
      },
    },
    {
      key: 'video_url_1',
      label: '视频1',
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Attachment]
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
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Attachment]
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
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Attachment]
      }
    },
    {
      key: 'video_url_4',
      label: '视频4',
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Attachment]
      }
    },
    {
      key: 'video_url_5',
      label: '视频5',
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Attachment]
      }
    },
    {
      key: 'video_url_6',
      label: '视频6',
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Attachment]
      }
    },
    {
      key: 'video_url_7',
      label: '视频7',
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Attachment]
      }
    },
    {
      key: 'video_url_8',
      label: '视频8',
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Attachment]
      }
    },
    {
      key: 'video_url_9',
      label: '视频9',
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Attachment]
      }
    },
    {
      key: 'video_url_10',
      label: '视频10',
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Attachment]
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
    type: FieldType.Attachment
  },
  // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
  execute: async (formItemParams: { 
    token: string, 
    video_url_1: object,
    video_url_2: object,
    video_url_3: object,
    video_url_4: object,
    video_url_5: object,
    video_url_6: object,
    video_url_7: object,
    video_url_8: object,
    video_url_9: object,
    video_url_10: object,
  }, context) => {
    const { token = '', video_url_1 = {}, video_url_2 = {}, video_url_3 = {}, video_url_4 = {}, video_url_5 = {}, video_url_6 = {}, video_url_7 = {}, video_url_8 = {}, video_url_9 = {}, video_url_10 = {} } = formItemParams;
    /** 为方便查看日志，使用此方法替代console.log */
    const debugLog = (arg: any) => {
      // @ts-ignore
    }
    try {
      if (!video_url_1 || !video_url_2) {
        return {
          code: FieldCode.Success,
          data: {
            'id':'-',
            'output':'',
            'errorMessage':'视频链接不能为空'
          }
        }
      }
      const body = JSON.stringify({
        "video_url": [video_url_1, video_url_2, video_url_3, video_url_4, video_url_5, video_url_6, video_url_7, video_url_8, video_url_9, video_url_10]
      });
      console.log('body', body)
      const resText: any = await context.fetch('https://wefly-lanyue.52tt.com/lanyue/api/video/merge', { // 已经在addDomainList中添加为白名单的请求
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token,
        },
        body,
      }).then(res => res.text()); // 不要直接res.json()，这非常容易报错，且难以排查
      console.log(resText)
      const res = JSON.parse(resText);
      console.log("res", res)
      let message = ''
      if (res.code != 0 && res.code != 200) {
        message = res["message"]
        debugLog({
          '===1 解析后的结果': message
        })
        throw new Error(res.message || '接口异常');
      }
      const video_result_url = res["data"]['workflow_result']['output']
      const video_result_url_array = video_result_url.split('/')
      const name = video_result_url_array[video_result_url_array.length - 1]
      return {
        code: FieldCode.Success,
        data: [
          {
            "name": name, 
            "content": video_result_url, 
            "contentType": "attachment/url", 
          },
        ]
      }
    } catch (e) {
      debugLog({
        '===999 异常错误': String(e)
      });
      /** 
       * 返回非 Success 的错误码，将会在单元格上显示报错，请勿返回msg、message之类的字段，它们并不会起作用。
       * 对于未知错误，请直接返回 FieldCode.Error，然后通过查日志来排查错误原因。
       */
      return {
        code: FieldCode.Error,
      }
    }
  },
});
export default basekit;