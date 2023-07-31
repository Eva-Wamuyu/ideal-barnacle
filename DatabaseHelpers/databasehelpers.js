const mssql = require("mssql");

const { sqlConfig } = require("../Config/config")


class DB{

    static async exec(storedProcedure, data={}){
        let request = await (await mssql.connect(sqlConfig)).request();
        request = this.addData(request,data);

        return request.execute(storedProcedure);
    }



    static addData(req, data={}){
        const keys = Object.keys(data);

        keys.forEach((keyName) => {
            req.input(keyName, data[keyName]);
          });

        return req;

    }

}

module.exports = {
    DB
}