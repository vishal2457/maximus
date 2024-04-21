import queryString from "query-string";

interface SequelizeOptions {
  primary?: boolean;
  unique?: boolean;
  defaultValue?: string | number;
  seedData?: any[];
}

interface FormOptions {
  type?:
    | "select"
    | "textarea"
    | "checkbox"
    | "radio"
    | "file"
    | "file-multi"
    | "date"
    | "";
  skip?: boolean;
}

export interface BaseDescribeOptions {
  sequelize?: SequelizeOptions;
  form?: FormOptions;
}

export const qs = (options: BaseDescribeOptions): string => {
  return queryString.stringify(options);
};
