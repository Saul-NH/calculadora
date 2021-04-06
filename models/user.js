module.exports = (sequelize, types) =>{
    return sequelize.define('user', {
        id: {
            type: types.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        username : types.STRING,
        email : {type : types.STRING, unique : true},
        password : types.STRING,
    });

}
