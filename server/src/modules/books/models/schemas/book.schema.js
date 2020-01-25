const bookSchema = (dataTypes) => { 
    return {book_id: {type: dataTypes.INTEGER,autoIncrement: true,primaryKey: true},
    book_name: {type: dataTypes.STRING,unique: true,allowNull: false},
    book_author: {type: dataTypes.STRING,allowNull: false},
    book_year: {type: dataTypes.INTEGER,allowNull: false},
    borrowed_user_name: {type: dataTypes.STRING,defaultValue: null}};
};

module.exports = bookSchema;