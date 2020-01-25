const categorySchema = (dataTypes) => { 
    return {cat_id: {type: dataTypes.INTEGER,autoIncrement: true,primaryKey: true},
    cat_name: {type: dataTypes.STRING,unique: true,allowNull:false}};
};

module.exports = categorySchema;