import React, { useEffect, useState } from "react";
import {
  DataTable,
  Card,
} from "@shopify/polaris";
import { options } from "../../constants";

export interface Props {
  data: Array<object>;
}

const DataTableRule: React.FC<Props> = ({ data }) => {
  const [rows, setRows] = useState([])

  useEffect(() => {
    const formatData = data?.map((item: any) => {
      const { title, type, quantity, amount } = item;
      return [title, options[type].label, quantity, amount];
    })

    console.log('formatData', formatData);

    setRows(formatData)
  }, [data])

  return (
    <Card sectioned>

      <h2>
        Preview
      </h2>
      <h2>Buy more and save</h2>
      <p>Apply for all products store</p>
      <DataTable
        columnContentTypes={[
          'text',
          'text',
          'numeric',
          'numeric',
        ]}
        headings={[
          'Title',
          'Discount Type',
          'Quantity',
          'Amount',
        ]}
        rows={rows}
      />
    </Card>
  );
}

export default DataTableRule;
