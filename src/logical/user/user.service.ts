// src/logical/user/user.service.ts
import { Injectable } from '@nestjs/common';
import User from '../../database/user'
import { makeSalt, encryptPassword } from '../../utils/cryptogram'; // 引入加密函数

@Injectable()
export class UserService {
    //注册
    async register(requestBody: any): Promise<any | undefined> {
        const { accountName, realName, password, repassword, mobile } = requestBody;
        if (password !== repassword) {
            return {
                code: 400,
                msg: '两次密码输入不一致',
            };
        }
        const user = await this.findOne(accountName);
        if (user) {
            return {
                code: 400,
                msg: '用户已存在',
            };
        }
        const salt = makeSalt(); // 制作密码盐
        const hashPwd = encryptPassword(password, salt);  // 加密密码
        let res = await User.create({
            account_name: accountName,
            real_name: realName,
            passwd: password,
            passwd_salt: hashPwd,
            salt: salt,
            mobile: mobile,
            create_by: 1,
            create_time: '2020-11-04 11:03'
        })
        return res ? `新增${accountName}成功` : `新增失败`
    }
    //查找
    async findOne(username: string): Promise<any | undefined> {
        let res = await User.findOne({
            where: {
                real_name: username
            }
        })
        return res ? res : undefined
    }
    //创建新用户
    async createOne(account_name: string, passwd: string, mobile: number): Promise<any | undefined> {
        let finStatus = await this.findOne(account_name)
        if (finStatus) {
            return `${finStatus},用户已经存在了`
        }
        let salt = makeSalt()
        const hashPwd = encryptPassword(passwd, salt)
        let res = await User.create({
            account_name: account_name,
            real_name: account_name,
            passwd: passwd,
            passwd_salt: hashPwd,
            salt: salt,
            mobile: mobile,
            create_by: 1,
            create_time: '2020-11-04 11:03'
        })
        return res ? `新增${account_name}成功` : `新增失败`
    }
    //删除用户
    async delOne(name: string): Promise<any | undefined> {
        let finStatus = await this.findOne(name)
        if (!finStatus) {
            return `用户不存在的`
        }
        let res = await User.destroy({
            where: {
                account_name: name
            }
        })
        return res ? `删除${name}成功` : `删除失败或者用户不存在`
    }

    //更新用户信息
    async updateOne(name: string, passwd: string): Promise<any | undefined> {
        let finStatus = await this.findOne(name)
        if (!finStatus) {
            return `用户不存在的`
        }
        let res = await User.update({ passwd: passwd }, {
            where: {
                account_name: name
            }
        })
        return res ? `${name}信息密码成功` : `密码修改不成功`
    }
}
