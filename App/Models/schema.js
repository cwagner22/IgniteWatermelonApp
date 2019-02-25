import { appSchema, tableSchema } from "@nozbe/watermelondb";

export const mySchema = appSchema({
  version: 2,
  tables: [
    tableSchema({
      name: "blogs",
      columns: [{ name: "name", type: "string" }]
    })
  ]
});
