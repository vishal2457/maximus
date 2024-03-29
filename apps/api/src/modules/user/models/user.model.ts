import { DataTypes } from "sequelize";
import { G_Model } from "../../../types/shared";
import DbConnection from "../../../core/db/db";
import { TUser } from "tp-schema";

interface User extends G_Model<User>, TUser {}

export const User = DbConnection.db.define<User>(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    deviceID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    premium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  },
  {
    timestamps: true,
    indexes: [{ fields: ["deviceID"], using: "BTREE" }],
  }
);
