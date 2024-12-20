import { DataTypes, Model } from "sequelize";
import connection from "../connection/connection.js";
import bcrypt from "bcrypt"

class User extends Model{
    compare = async(passwordTxtPlain)=>{
        const data =  await bcrypt.compareSync(passwordTxtPlain, this.password)
        return data
    }

}

User.init(
    {
        name:{
            type: DataTypes.STRING,
            allowNull:false
        },
        mail:{
            type: DataTypes.STRING,
            allowNull:false,
            unique: true,
            isEmail:true
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false,
            min:8
        }, 
        RoleId:{
            type:DataTypes.INTEGER,
            defaultValue:2
        },
        salt:{
            type: DataTypes.STRING
        },    
        phone: {
            type: DataTypes.STRING, 
            allowNull: true,
            max:10
        }
    },
    {
        sequelize:connection,
        modelName:"User"
    }
)

User.beforeCreate(async(user)=> {
const salt = await bcrypt.genSalt(10) 
user.salt = salt
const hash = await bcrypt.hash(user.password,salt)
user.password = hash
})

export default User