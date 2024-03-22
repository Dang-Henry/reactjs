import React, { useState } from "react";
import { FormLayout, Form, TextField, Button, Card, Page, Icon } from "@shopify/polaris";
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import * as yup from "yup";
import ListOption from "../../ListOption";
import DataTableRule from "../../DataTable";
import { PlusCircleIcon } from '@shopify/polaris-icons';
import { defaultValues, initData } from "../../../constants";

import axios from 'axios';
import _ from 'lodash';

export interface Props {
  name: string;
  label: string;
}

export interface rule {
  title: string;
  subtitle?: string;
  label?: string;
  quantity: number;
  type: string;
  amount?: number;
}

const WrappedTextFiled: React.FC<Props> = ({ label, name }) => {
  const [data, setData] = useState<Array<rule>>([
    {
      title: "Single",
      subtitle: "Standard price",
      label: "",
      quantity: 1,
      type: "0",
      amount: 0
    },
    {
      title: "Dou",
      subtitle: "Save 10%",
      label: "Popular",
      quantity: 2,
      type: "1",
      amount: 0
    }
  ]);

  const SignupSchema = yup.object().shape({
    campaign: yup.string().required(),
  });

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  const { register, handleSubmit, errors, control, formState } = useForm({
    defaultValues,
    validationSchema: SignupSchema,
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    validateCriteriaMode: 'firstError'
  });

  const handleSave = (event: any) => {
    console.log(event);

    axios.get('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => {
        console.log(response.data);
        alert('Save successfully');
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
        alert('Save failed');
      });
  };

  const addOption = () => {
    setData([...data, {
      ...initData,
      quantity: parseInt(data[data.length - 1].quantity.toString()) + 1
    }])
  }

  const updateData = (index: number, key: keyof rule, value: any) => {
    const newData: rule[] = [...data];
    newData[index][key] = value;
    setData(newData);
  }

  const removeOption = (index: number) => {
    if (data.length === 1) return;

    const newData: rule[] = _.cloneDeep(data);
    newData.splice(index, 1);
    setData(newData);
  }

  console.log('form s', formState)

  return (
    <Page breadcrumbs={[{ url: "#" }]}
      title="Create volume discount"
      primaryAction={{
        content: "Save",
        disabled: false,
        onAction: handleSave
      }}>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: 16 }}>
          <Card sectioned>
            <Form
              onSubmit={handleSubmit(onSubmit)}
            >
              <FormLayout>
                <h2>
                  General
                </h2>
                <Controller
                  as={
                    <TextField
                      label={'Campaign'}
                      onChange={([value]) => value}
                      error={errors && errors.campaign && errors.campaign.message}
                    />
                  }
                  onChange={([value]) => {
                    console.log('in change', value, errors)
                    console.log('form state is', formState)
                    return value
                  }}
                  name={"campaign"}
                  control={control}
                />
                <Controller
                  as={
                    <TextField
                      label={'Title'}
                      onChange={([value]) => value}
                      error={errors && errors.title && errors.title.message}
                    />
                  }
                  onChange={([value]) => {
                    console.log('in change', value, errors)
                    return value
                  }}
                  name={"title"}
                  control={control}
                />
                <Controller
                  as={
                    <TextField
                      label={'Description'}
                      onChange={([value]) => value}
                      error={errors && errors.description && errors.description.message}
                    />
                  }
                  onChange={([value]) => {
                    console.log('in change', value, errors)
                    console.log('form state is', formState)
                    return value
                  }}
                  name={"description"}
                  control={control}
                />
              </FormLayout>

            </Form>
          </Card>

          <Card sectioned>
            <h2>
              Volume discount rule
            </h2>
            {
              data.map((item, index) => {
                return (
                  <ListOption updateData={updateData} removeOption={removeOption} data={item} index={index} key={'parent option rule ' + index} />
                )
              })
            }

            <div className="flexCenter">
              <Button primary onClick={addOption}>
                <Icon source={PlusCircleIcon} />
                Add option</Button>
            </div>
          </Card>
        </div>

        <div>
          <DataTableRule data={data} />
        </div>

      </div>
    </Page>
  );
};

export default WrappedTextFiled;
