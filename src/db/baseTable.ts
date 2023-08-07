import { createBaseTable } from "orchid-orm";
import { zodSchemaProvider } from "orchid-orm-schema-to-zod";

export const BaseTable = createBaseTable({
  schemaProvider: zodSchemaProvider,
  columnTypes: (t) => ({
    ...t,
    text: (min = 0, max = Infinity) => t.text(min, max),
  }),
});
