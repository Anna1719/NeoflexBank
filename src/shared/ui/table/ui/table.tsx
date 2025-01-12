import style from "./table.module.scss";

interface Column<T> {
  key: keyof T;
  label: string;
}

interface SortBy<T> {
  key: keyof T;
  direction: "asc" | "desc";
}

interface TableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  onSort: (key: keyof T, direction: "asc" | "desc") => void;
  sortBy: SortBy<T>;
}

export const Table = <T extends Record<string, unknown>>({
  data,
  columns,
  onSort,
  sortBy,
}: TableProps<T>) => {
  const handleSort = (key: keyof T) => {
    const newDirection =
      sortBy.key === key && sortBy.direction === "asc" ? "desc" : "asc";
    onSort(key, newDirection);
  };

  const getArrow = (key: keyof T) => {
    if (sortBy.key === key) {
      return sortBy.direction === "asc" ? "▲" : "▼";
    }
    return "▲";
  };

  return (
    <table className={style.table}>
      <thead className={style.table__head}>
        <tr className={style.table__columnsHead}>
          {columns.map((column) => (
            <th
              key={String(column.key)}
              onClick={() => handleSort(column.key)}
              className={style.table__header}
            >
              {column.label} {getArrow(column.key)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={style.table__body}>
        {data.map((row, index) => (
          <tr key={index} className={style.table__rowsBody}>
            {columns.map((column) => (
              <td  className={style.table__bodyItem} key={String(column.key)}>
                {row[column.key] as React.ReactNode}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
