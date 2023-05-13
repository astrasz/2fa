const getUserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hasOTP: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        secretOTP: DataTypes.STRING
    })

    return User;
}

export default getUserModel;