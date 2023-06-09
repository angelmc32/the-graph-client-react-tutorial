const SwapsComponent = ({ isLoading = false, swaps = [] }) => (
  <div className="table-container">
    {isLoading ? (
      <div className="loader-container">
        <div className="loader" />
        Loading...
      </div>
    ) : (
      <table className="table-swaps">
        <thead>
          <tr>
            <th>Pair 1</th>
            <th>Pair 2</th>
            <th>USD Value</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {!isLoading &&
            swaps.map((swap) => (
              <tr className="swaps-table-row" key={swap.id}>
                <td>{swap.pair.token0.symbol}</td>
                <td>{swap.pair.token1.symbol}</td>
                <td>$ {parseFloat(swap.amountUSD).toFixed(2)}</td>
                <td>{new Date(swap.timestamp * 1000).toLocaleString()}</td>
              </tr>
            ))}
        </tbody>
      </table>
    )}
  </div>
);

export default SwapsComponent;
