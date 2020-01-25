const bookCatSchema = (dataTypes) => { 
    return {map_id: {type:dataTypes.INTEGER,autoIncrement: true,primaryKey: true},
    book_id: {type: dataTypes.INTEGER,allowNull:false},
    cat_id: {type: dataTypes.INTEGER,allowNull:false}};
};
 
 module.exports = bookCatSchema;