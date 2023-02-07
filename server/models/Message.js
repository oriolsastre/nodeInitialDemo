module.exports = function(sequelize, DataTypes){
    return sequelize.define('Message', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'User',
                key: 'id'
            }
        },
        room: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Room',
                key: 'id'
            }
        }
    },{
        sequelize,
        tableName: 'Message',
        timestamps: true,
        indexes: [
            {
                name: "PRIMARY",
                unique: true,
                using: "BTREE",
                fields: [{ name: "id" }]
            },{
                name: "FK_User_Message",
                using: "BTREE",
                fields: [{name: "user"}]
            },{
                name: "FK_Room_Message",
                using: "BTREE",
                fields: [{name: "room"}]
            }
        ]
    });
}