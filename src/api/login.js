// 用于存放登录相关的接口请求
import request from '@/utils/request'

// 1. 获取图形验证码
export const getPicCode = () => {
  return request.get('/captcha/image')
}

// 2. 获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request({
    url: '/captcha/sendSmsCaptcha',
    method: 'post',
    headers: {
      platform: 'H5'
    },
    data: {
      form: {
        captchaCode,
        captchaKey,
        mobile
      }
    }
  })
}

// 3. 手机验证码登录
export const codeLogin = (mobile, smsCode) => {
  return request({
    url: '/passport/login',
    method: 'post',
    headers: {
      platform: 'H5'
    },
    data: {
      form: {
        isParty: false,
        mobile,
        partyData: {},
        smsCode
      }
    }
  })
}
