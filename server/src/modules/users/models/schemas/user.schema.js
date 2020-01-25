const userSchema = (dataTypes) => {
    return {user_id: {type: dataTypes.INTEGER,autoIncrement: true,primaryKey: true},
    user_name: {type:dataTypes.STRING,unique: true,allowNull:false},
    user_password: {type: dataTypes.STRING,allowNull:false}, 
    user_role: {type: dataTypes.STRING,defaultValue: 'user',allowNull: false}};
};

module.exports = userSchema;