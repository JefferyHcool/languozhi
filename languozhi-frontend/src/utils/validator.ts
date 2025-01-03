// 大于0的正整数
export const ExceedZeroReg = /^\d*$/

//  电话号码正则
export const PhoneNumberReg = /^1[3456789]\d{9}$/

// 邮箱验证
export const MailReg =
	// eslint-disable-next-line
	/^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/

// 身份证验证
export const IdCardReg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/

// number验证
export const NumberReg = /^[0-9]*$/

// 座机规则
export const TelePhoneReg = /0\d{2,3}-[1-9]\d{6,7}/

// 座机和手机的校验
export const AllPhoneReg = /0\d{2,3}-[1-9]\d{6,7}|^1[3456789]\d{9}$/

// 钱校验（正数 两位小数） 整数6位
export const MoneyReg = /(^\d{1,6})$|(^\d{1,6}.\d{1,2}$)/

/**
 * 校验多正整数和小数的位数
 * @param { number } intNumber 整数长度
 * @param { number } pointNumber 小数长度
 * @return RegExp
 */

export const IntAndPointReg = (intNumber: number, pointNumber: number) => {
	return new RegExp(`(^[0-9]{1,${intNumber}})$|(^[0-9]{1,${intNumber}}.[0-9]{1,${pointNumber}})$`)
}
