module.exports = function(sequelize, DataTypes){
    return sequelize.define('User', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        level: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: false,
            defaultValue: 1,
            comment: '0: Admin, 1: Usuari normal, 2: Altres drets no especificats..., etc.'
        }
    },{
        sequelize,
        tableName: 'User',
        timestamps: true,
        indexes: [
            {
              name: "PRIMARY",
              unique: true,
              using: "BTREE",
              fields: [{ name: "id" }]
            }
        ]
    });
}