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
      key: 'video_file',
      label: '视频',
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Attachment]
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'child_video_file',
      label: '子视频',
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Attachment]
      },
      validator: {
        required: true,
      }
    },
    {
      key: 'child_video_position',
      label: '子视频位置',
      component: FieldComponent.SingleSelect,
      props: {
        supportType: [FieldType.Number],
        options: [
          { label: '1', value:"152,82"},
          { label: '2', value:"355,82"},
          { label: '3', value:"558,82"},
          { label: '4', value:"152,268"},
          { label: '5', value:"355,268"},
          { label: '6', value:"558,268"},
          { label: '7', value:"152,609"},
          { label: '8', value:"355,609"},
          { label: '9', value:"558,609"},
          { label: '10', value:"152,912"},
          { label: '11', value:"355,912"},
          { label: '12', value:"558,912"}
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
      component: FieldComponent.Input,
      props: {
        supportType: [FieldType.Text]
      },
      validator: {
        required: false,
      }
    },
    {
      key: 'copywriting_position',
      label: '文案位置',
      component: FieldComponent.SingleSelect,
      props: {
        supportType: [FieldType.Number],
        options: [
          { label: '1', value:"152,82"},
          { label: '2', value:"355,82"},
          { label: '3', value:"558,82"},
          { label: '4', value:"152,268"},
          { label: '5', value:"355,268"},
          { label: '6', value:"558,268"},
          { label: '7', value:"152,609"},
          { label: '8', value:"355,609"},
          { label: '9', value:"558,609"},
          { label: '10', value:"152,912"},
          { label: '11', value:"355,912"},
          { label: '12', value:"558,912"},
          { label: '13', value:"355,1092"},
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
      component: FieldComponent.Radio,
      defaultValue: { label: '居中对齐', value: 'center'},
      props: {
        options: [
          { label: '左对齐', value: 'left'},
          { label: '居中对齐', value: 'center'},
          { label: '右对齐', value: 'right'},
        ]
      },
      validator: {
        required: false,
      }
    }
  ],
  // 定义捷径的返回结果类型
  resultType: {
    type: FieldType.Attachment
  },
  
  // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
  execute: async (formItemParams: { 
    token: string, 
    video_file: object,
    child_video_file: object,
    child_video_position: string,
    copywriting: string
    copywriting_position: string
    align: { label: string, value: string }
  }, context) => {
    const { token = '', video_file = {}, child_video_file = {}, child_video_position = "152,82", copywriting = '', copywriting_position = "152,82", align = { label: '居中对齐', value: 'center' } } = formItemParams;
    /** 为方便查看日志，使用此方法替代console.log */
    const debugLog = (arg: any) => {
      // @ts-ignore
    }
    try {
      if (!video_file || !child_video_file) {
        return {
          code: FieldCode.Success,
          data: {
            'id':'-',
            'output':'',
            'errorMessage':'图片字段不能为空'
          }
        }
      }
      const body = JSON.stringify({
        "token":token,
        "video_url": video_file,
        "child_video_url": child_video_file,
        "child_video_position": child_video_position,
        "copywriting": copywriting,
        "copywriting_position": copywriting_position,
        "align": align
      });
      console.log('body', body)
      const resText: any = await context.fetch('https://wefly-lanyue.52tt.com/lanyue/api/video/superposition_video', { // 已经在addDomainList中添加为白名单的请求
      // const resText: any = await context.fetch('http://wefly-test.52tt.com/lanyue/push/video/superposition_video', { // 已经在addDomainList中添加为白名单的请求
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token,
        },
        body,
      }).then(res => res.text()); // 不要直接res.json()，这非常容易报错，且难以排查
      const res = JSON.parse(resText);
      console.log("res", res)
      let message = ''
      if (res.code != 0 && res.code != 200) {
        message = res["error_msg"]
        debugLog({
          '===1 解析后的结果': message
        })
        throw new Error(res.message || '接口异常');
      }
      return {
        code: FieldCode.Success,
        data: [
          {
            "name": res["data"]['workflow_result']["task_id"]+".mp4", 
            "content": res["data"]['workflow_result']['result'], 
            "contentType": "attachment/url", 
          },
        ],
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