const Player = require('../models/Mongo/Player')
const getMongoRanking = async () => {
    return await Player.aggregate([
        {$match: {id: {$gt:0}}},
        {$addFields: {
            suma_vict: {
                $reduce: {initialValue:0,input:"$games",in:{
                    $sum: ["$$value", {$cond: ["$$this.victoria",1,0]}]
                }}
            },
            number_games: {$size:"$games"}
        }},
        {$addFields: {victory_rate:{
            $cond: [{$gt:["$number_games",0]},{"$divide":["$suma_vict","$number_games"]},null]
        }}},
        {$project: {_id:0,id:1,name:1,number_games:1,victory_rate: 1}},
        {$sort: {victory_rate: -1}}
    ])
}
module.exports=getMongoRanking;