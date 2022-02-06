module.exports = (sequelize, DataType) => {

    const event = sequelize.define('event', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user: {
            type: DataType.INTEGER,
            onDelete: 'cascade',
            allowNull: false,
        },
        consent: {
            type: DataType.ENUM('email_notifications', 'sms_notifications'),
            allowNull: false,
        },
        enabled: {
            type: DataType.BOOLEAN,
            allowNull: false,
        },
    });

    return event;
};