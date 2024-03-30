const GENERATOR_CONSTANTS = require("./constants");
const dataTypes = require("./constants")

const transformForSequelizeModel = (schemaDefinition) => {
    for (const key in schemaDefinition.properties) {
        
        const obj = schemaDefinition.properties[key];

    
        if(obj.type === 'string') {
            obj.dataType = dataTypes.STRING
        }else if(obj.type === 'boolean') {
            obj.dataType = dataTypes.BOOLEAN
        }else if(obj.type === 'number') {
            obj.dataType = dataTypes.INTEGER
        }

        if(obj.enum && obj.enum.length) {
            obj.enumValues = JSON.stringify(obj.enum);
            obj.dataType = dataTypes.ENUM;
        }
        

        // check for required flag
        if(schemaDefinition.required.length) {
            obj.required = schemaDefinition.required.includes(key);
        }
        if(obj.minLength > 0) {
            obj.required = true
        }

        if(obj.description) {
            const parsedQuery = queryStringToObject(obj.description);
            if(parsedQuery.sequelize.length) {
                    obj.unique = parsedQuery.sequelize.includes(GENERATOR_CONSTANTS.UNIQ)
                    obj.primary = parsedQuery.sequelize.includes(GENERATOR_CONSTANTS.PRIMARY);

                    //check for default values
                    const def = parsedQuery.sequelize.find(val => val.includes(GENERATOR_CONSTANTS.DEFAULT_VALUE))
                    if(def) {
                        obj.defaultValue = def.split(":")[1]
                    }
            }
        }
    }
    return schemaDefinition
}


module.exports = transformForSequelizeModel;


function queryStringToObject(queryString) {
    const pairs = queryString.split('&');
    const result = {};

    pairs.forEach(pair => {
        const [key, value] = pair.split('=');
        result[key] = value.split(',');
    });

    return result;
}

