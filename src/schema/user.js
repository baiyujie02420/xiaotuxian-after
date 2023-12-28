// 导入 Joi 来定义验证规则
const Joi = require('joi')
// 手机号规则
const phoneNumber = Joi.string()
    .pattern(/^1[3-9][0-9]{9}$/)
    .required()
// 定义 Joi 账号验证规则
const accountSchema = Joi.string()
    .alphanum()
    .min(6)
    .max(18)
    .regex(/^[a-zA-Z0-9]+$/)
    .required()

// 定义 Joi 密码验证规则
const passwordSchema = Joi.string()
    .alphanum()
    .min(6)
    .max(12)
    .regex(/^[a-zA-Z0-9]+$/)
    .required()


exports.phoneNumber_schema = {
    body: {
        phoneNumber
    }
}
exports.account_schema = {
    body: {
        account:accountSchema,
        password:passwordSchema
    }
}
