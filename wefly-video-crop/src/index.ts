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
      key: 'start_time',
      label: '开始时间',
      component: FieldComponent.Input,
      props: {
        supportType: [FieldType.Number],
      },
      validator: {
        required: true,
      },
    },
    {
      key: 'end_time',
      label: '结束时间',
      component: FieldComponent.Input,
      props: {
        supportType: [FieldType.Number],
      },
      validator: {
        required: true,
      },
    },
    {
      key: 'video_url',
      label: '视频',
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Attachment]
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
    type: FieldType.Attachment
  },
  // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
  execute: async (formItemParams: { 
    token: string, 
    start_time: number, 
    end_time: number, 
    video_url: string
  }, context) => {
    const { token = '', start_time = 0, end_time = 10, video_url = {} } = formItemParams;
    /** 为方便查看日志，使用此方法替代console.log */
    const debugLog = (arg: any) => {
      // @ts-ignore
    }
    try {
      if (!video_url ) {
        return {
          code: FieldCode.Success,
          data: {
            'id':'-',
            'output':'',
            'errorMessage':'视频字段不能为空'
          }
        }
      }
      const body = JSON.stringify({
        "start_time": start_time,
        "end_time": end_time,
        "video_url": video_url[0]["tmp_url"]
      });
      console.log('body', body)
      const resText: any = await context.fetch('https://wefly-lanyue.52tt.com/lanyue/api/video/clipping', { // 已经在addDomainList中添加为白名单的请求
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