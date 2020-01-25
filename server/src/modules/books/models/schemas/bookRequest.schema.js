const bookCatSchema = (dataTypes) => { 
    return {request_id: {type: dataTypes.INTEGER,autoIncrement: true,primaryKey: true},
    user_id: {type: dataTypes.INTEGER,allowNull:false},
    book_id: {type: dataTypes.INTEGER,allowNull:false}};
};
 
 module.exports = bookCatSchema;