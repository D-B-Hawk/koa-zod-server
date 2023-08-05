import { BaseTable } from "../baseTable";

export class UserTable extends BaseTable {
  readonly table = "user";
  columns = this.setColumns((t) => ({
    id: t.identity().primaryKey(),
    username: t.text(3, 30).unique(),
    email: t.text(1, 254).unique().email(),
    password: t.text(8, 100),
    ...t.timestamps(),
  }));
}
