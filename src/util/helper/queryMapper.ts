import type { dropDownItems } from "@/components/houseListReserve/filter/dropDownMenu";

export class QueryMapper {
  static map(name: string, key: string, list: dropDownItems[]) {
    const item = list.find((i) => i.name === name);

    if (!item) return {};

    if (item.query2) {
      return {
        [key]: item.query,
        order: item.query2
      };
    }

    return {
      [key]: item.query
    };
  }
}
