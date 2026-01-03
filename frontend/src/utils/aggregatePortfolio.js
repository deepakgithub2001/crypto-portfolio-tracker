export const aggregateByCoin = (portfolio) => {
  const result = {};

  portfolio.forEach((item) => {
    const coin = item.coin;

    if (!result[coin]) {
      result[coin] = {
        coin,
        invested: 0,
        current: 0,
        profit_loss: 0,
      };
    }

    result[coin].invested += Number(item.invested_value);
    result[coin].current += Number(item.current_value);
    result[coin].profit_loss += Number(item.profit_loss);
  });

  return Object.values(result);
};
