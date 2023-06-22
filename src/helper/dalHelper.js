module.exports = {
  whereQuery: (columns) => {
    if (!columns.length) {
      return ' ';
    }
    const whereClauses = columns.map((col, index) => `"${col}"=$${index + 1}`).join(' AND ');
    return `WHERE ${whereClauses}`;
  },
};
