import { DataTypes } from 'sequelize'
import sequelize from './sequelize'

let User = sequelize.define('admin_user',{
    user_id:{
        type:DataTypes.SMALLINT,
        primaryKey:true
    },
    account_name:{
        type:DataTypes.STRING
    },
    real_name:{
        type:DataTypes.STRING
    },
    passwd:{
        type:DataTypes.CHAR(32)
    },
    passwd_salt:{
        type:DataTypes.CHAR(32)
    },
    salt:{
        type:DataTypes.CHAR(32)
    },
    mobile:{
        type:DataTypes.STRING(15),
        defaultValue:'0'
    },
    create_by:{
        type:DataTypes.SMALLINT
    },
    create_time:{
        type:DataTypes.TIME
    },
}, {
  freezeTableName: true,
  timestamps: false,
})

export default User