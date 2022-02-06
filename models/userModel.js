module.exports = (sequelize, DataType) => {

    const user = sequelize.define('user', {
        uuid: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            unique: true
        },
        deleted: {
            type: DataType.DATE,
            allowNull: true,
        }
    });

    return user;
};