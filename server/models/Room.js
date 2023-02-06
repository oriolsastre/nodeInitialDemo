module.exports = function(sequelize, DataTypes){
    return sequelize.define('Room', {
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
        }
    },{
        sequelize,
        tableName: 'Room',
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