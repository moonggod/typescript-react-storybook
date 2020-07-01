import { _spec } from './_spec'

export const zh: typeof _spec = {
  _common: {
    phone_num: '手机号码',
    email: '电子邮箱',
    ver_code: {
      _seo: {
        title: '验证码 | GFashion'
      },
      _self: '验证码',
      send: '获取验证码'
    },
    password: {
      _seo: {
        title: '密码 | GFashion'
      },
      _self: '密码',
      at_least_8_chars: '至少 8 位字符'
    },
    account: '账户',
    gclub_account: 'GClub账号'
  },
  find_pwd: {
    _seo: {
      title: '忘记密码 | GFashion'
    },
    _self: '忘记密码',
    pls_enter_reg_phone: '请输入您注册时所使用的手机号码',
    submit: '提交'
  },
  account_security: {
    _seo: {
      title: '账号安全 | GFashion'
    },
    _self: '账号安全',
    right_email: '请输入正确邮箱地址',
    right_sms_code: '请输入6位短信验证码',
    reset_pwd: {
      _seo: {
        title: '更改密码 | GFashion'
      },
      _self: '更改密码',
      currentAccount: '当前登录账户',
      currentpassword: '当前密码',
      passwordLevel: '密码强度',
      newpassword: '新密码',
      confirmnewpassword: '确认新密码',
      pls_enter_reg_phone: '请输入您注册时所使用的手机号码',
      submit: '保存',
      diff_password: '两次输入不一样'
    },
    bind_email: {
      _seo: {
        title: '绑定邮箱 | GFashion'
      },
      _self: '绑定邮箱接收通知消息',
      pleaseInputEmail: '请输入邮箱',
      confirm: '确认',
      bindnewemail: '绑定新的邮箱'
    },
    checkcurrentemail: {
      _seo: {
        title: '修改绑定邮箱 | GFashion'
      },
      _self: '修改绑定邮箱',
      currentBindEmail: '当前绑定的邮箱',
      pleaseInputCurrentEmail: '请输入当前绑定的邮箱',
      confirm: '确认',
      next: '下一步'
    }
  },
  login: {
    _seo: {
      title: '登录 | GFashion'
    },
    _self: '登录',
    email_or_phone_num: '电子邮箱或手机号码'
  },
  reg: {
    _seo: {
      title: '注册 | GFashion'
    },
    _self: '注册',
    create_acct: '创建账户'
  },
  my_profile: {
    _seo: {
      title: '账号信息 | GFashion'
    },
    _self: '账号信息',
    // avatar: '头像',
    editprofile: '编辑账户信息',
    surname: '姓',
    ownname: '名字',
    changepassword: '更改密码',
    currentpassword: '当前密码',
    newpassword: '新密码',
    confirmpassword: '确认新密码 ',
    passwordStrength: '密码强度：',
    emptypassword: '无密码',
    weakpassword: '弱',
    mediumpassword: '中等',
    strongpassword: '强',
    save: '保存',
    baseInfo: '基本信息',
    set: '设置',
    contact_info: '联系信息',
  },
  my_account: {
    _self: '个人中心'
  },
  my_orders: {
    _self: '我的订单'
  },
  my_favorites: {
    _self: '我的收藏',
    add_to_cart: '加入购物车',
    remove: '移除',
    watch: '查看',
    sold_out: '已售完',
    off_shelf: '已下架',
    size: '尺寸'
  },
  my_address: {
    index: {
      _seo: {
        title: '地址管理'
      },
      no_addr: '尚无地址',
      edit: '编辑',
      default_billing_addr: '默认账单地址',
      default_shipping_addr: '默认收货地址',
      delete_addr: '删除地址'
    },
    add: {
      _seo: {
        title: '添加新地址'
      },
      firstname: '名字',
      lastname: '姓',
      company: '公司',
      street: '街道地址',
      city: '市',
      state_or_province: '州 / 省',
      postal_code: '邮政编码',
      country: '国家',
      use_as_default_billing_addr: '用作默认账单地址',
      use_as_default_shipping_addr: '用作默认收货地址',
      save: '保存',
      cancel: '取消',
      tel: '电话'
    }
  }
}
