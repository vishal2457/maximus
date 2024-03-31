import { DataTypes } from "sequelize";
import { G_Model } from "../../../types/shared";
import DbConnection from "../../../core/db/db";
import { TTest } from "tp-schema";

interface Test extends G_Model<Test>, TTest {}
export const Test = DbConnection.db.define<Test>(
  "Test",
  {
      id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          unique: true,
    },
      userName: {
          type: DataTypes.STRING,
          allowNull: false,
    },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
    },
      password: {
          type: DataTypes.STRING,
          allowNull: false,
    },
      device: {
         type: DataTypes.ENUM({ values: ["ios","android"] }),
          allowNull: false,
          defaultValue: ios,
    },
  }
);



