import { useEffect, useState } from "react";
import { GetManySwapsDocument, subscribe } from "../../.graphclient/index";

const SwapsTable = ({ swaps = [] }) => {
  // useEffect(() => {
  //   subscribe(GetManySwapsDocument, {})
  //     .then((result) => {
  //       console.log(result);
  //       result
  //         .next()
  //         .then((res) => {
  //           if (res) {
  //             if (res.value) {
  //               console.log(res.value);
  //               setResult(res.value.data.swaps);
  //             }
  //           }
  //           if (res.value.isLive) {
  //             setTimeout(() => {
  //               fetchLiveQuery();
  //             }, 5000);
  //           } else {
  //             result.return();
  //           }
  //         })
  //         .catch((e) => console.log(e));
  //       if (!result) {
  //         return null;
  //       }
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  return (
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
        {swaps.map((swap) => (
          <tr className="swaps-table-row" key={swap.id}>
            <td>{swap.pair.token0.symbol}</td>
            <td>{swap.pair.token1.symbol}</td>
            <td>$ {parseFloat(swap.amountUSD).toFixed(2)}</td>
            <td>{new Date(swap.timestamp * 1000).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SwapsTable;
