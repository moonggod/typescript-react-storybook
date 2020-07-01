import { _spec } from './_spec'

export const en: typeof _spec = {
  _common: {
    phone_num: 'Phone number',
    email: 'Email',
    ver_code: {
      _seo: {
        title: 'Verification code | GFashion'
      },
      _self: 'Verification code',
      send: 'Send'
    },
    password: {
      _seo: {
        title: 'Password | GFashion'
      },
      _self: 'Password',
      at_least_8_chars: 'Should at least 8 characters'
    },
    account: 'Account',
    gclub_account: 'GClub ID'
  },
  find_pwd: {
    _seo: {
      title: 'Forgot password | GFashion'
    },
    _self: 'Forgot password',
    pls_enter_reg_phone: 'Please enter the phone number you used for register',
    submit: 'Submit'
  },
  account_security: {
    _seo: {
      title: 'Account security | GFashion'
    },
    _self: 'Account security',
    right_email: 'Please enter a valid email address',
    right_sms_code: 'Please enter 6-digit SMS verification code',
    reset_pwd: {
      _seo: {
        title: 'Reset password | GFashion'
      },
      _self: 'Reset password',
      currentAccount: 'Current login account',
      currentpassword: 'Current password',
      passwordLevel: 'password strength',
      newpassword: 'New password',
      confirmnewpassword: 'Confirm new password',
      pls_enter_reg_phone:
        'Please enter the phone number you used for register',
      submit: 'Save',
      diff_password: 'The two inputs are different'
    },
    bind_email: {
      _seo: {
        title: 'Bind email | GFashion'
      },
      _self: 'Bind email to receive notification messages',
      pleaseInputEmail: 'Please input your email',
      confirm: 'Confirm',
      bindnewemail: 'Bind new email'
    },
    checkcurrentemail: {
      _seo: {
        title: 'Modify bound email | GFashion'
      },
      _self: 'Modify bound email',
      currentBindEmail: 'Currently bound email',
      pleaseInputCurrentEmail: 'Please enter the currently bound email',
      confirm: 'Confirm',
      next: 'Next'
    }
  },
  login: {
    _seo: {
      title: 'Login | GFashion'
    },
    _self: 'Login',
    email_or_phone_num: 'Email or phone number'
  },
  reg: {
    _seo: {
      title: 'Register | GFashion'
    },
    _self: 'Register',
    create_acct: 'Register'
  },
  my_profile: {
    _seo: {
      title: 'Profile | GFashion'
    },
    _self: 'Account Information',
    // avatar: 'Avatar *',
    editprofile: 'Edit Profile',
    surname: 'Surname',
    ownname: 'Ownname',
    changepassword: 'Change Password',
    currentpassword: 'Current Password',
    newpassword: 'New Password',
    confirmpassword: 'Confirm Password',
    passwordStrength: 'Strength:',
    emptypassword: 'Empty',
    weakpassword: 'Weak',
    mediumpassword: 'Medium',
    strongpassword: 'Strong',
    save: 'Save',
    baseInfo: 'Base info',
    set: 'Set',
    contact_info: 'Contact Information',
  },
  my_account: {
    _self: 'My Account'
  },
  my_orders: {
    _self: 'My Orders'
  },
  my_favorites: {
    _self: 'My Favorites',
    add_to_cart: 'Add to cart',
    remove: 'Remove',
    watch: 'Watch',
    sold_out: 'Sold out',
    off_shelf: 'Off shelf',
    size: 'Size'
  },
  my_address: {
    index: {
      _seo: {
        title: 'Manage address'
      },
      no_addr: 'You do not have any address', // TODO: pick better wordings
      edit: 'Edit',
      default_billing_addr: 'Default billing address',
      default_shipping_addr: 'Default shipping address',
      delete_addr: 'Delete address'
    },
    add: {
      _seo: {
        title: 'Add a new address'
      },
      firstname: 'Firstname',
      lastname: 'Lastname',
      company: 'Company',
      street: 'Street',
      city: 'City',
      state_or_province: 'State / Province',
      postal_code: 'Postal code',
      country: 'Country',
      use_as_default_billing_addr: 'Use as default billing address',
      use_as_default_shipping_addr: 'Use as default shipping address',
      save: 'Save',
      cancel: 'Cancel',
      tel: 'TEL'
    }
  }
}
