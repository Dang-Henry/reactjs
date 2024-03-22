import React, { useState, useCallback, useEffect } from "react";
import { FormLayout, Form, TextField, Select, Button } from "@shopify/polaris";
import { useForm, Controller, ErrorMessage } from "react-hook-form";
import * as yup from "yup";
import {
  DeleteIcon
} from '@shopify/polaris-icons';
import { options } from "../../constants";

export interface Props {
  data: object;
  index: number;
  updateData: (index: number, key: keyof rule, value: any) => void;
  removeOption: (index: number) => void;
}

export interface rule {
  title: string;
  subtitle?: string;
  label?: string;
  quantity: number;
  type: string;
  amount?: number;
}

const ListOption: React.FC<Props> = ({ data, index, updateData, removeOption }) => {
  const [selected, setSelected] = useState('0');

  useEffect(() => {
    setSelected(data.type)

    reset(data)
  }, [data])

  const handleSelectChange = useCallback(
    (value: string) =>
      setSelected(value)
    ,
    [],
  );

  const updateDataHandler = (data: any, key: keyof rule) => {
    updateData(index, key, data);
  }

  const SignupSchema = yup.object().shape({
    quantity: yup.string().required(),
    amount: yup.string().required(),
    title: yup.string().required(),
  });

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };

  const defaultValues = {
    title: "",
    subtitle: "",
    label: "",
    quantity: "",
    type: "0",
    amount: ""
  };

  const { register, handleSubmit, errors, control, reset } = useForm({
    defaultValues: data || defaultValues,
    validationSchema: SignupSchema,
    mode: 'onChange',
    reValidateMode: 'onSubmit',
    validateCriteriaMode: 'firstError'
  });

  return (
    <div style={{ borderTop: '1px solid', padding: '16px 0' }} key={'option rule ' + index}>
      <Form
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormLayout>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ margin: 0, fontWeight: 700, fontSize: 18 }}>
              Option {index}
            </h2>
            <Button onClick={() => removeOption(index)} icon={DeleteIcon}></Button>
          </div>
          <FormLayout.Group>
            <Controller
              as={
                <TextField
                  key={'title ' + index}
                  label={'Title'}
                  onChange={([value]) => value}
                  error={errors && errors.title && errors.title.message}
                />
              }
              onChange={([value]) => {
                updateDataHandler(value, 'title')
                return value
              }}
              name={"title"}
              control={control}
            />
            <Controller
              as={
                <TextField
                  key={'Subtitle ' + index}
                  label={'Subtitle'}
                  onChange={([value]) => value}
                />
              }
              onChange={([value]) => {
                updateDataHandler(value, 'subtitle')
                return value
              }}
              name={"subtitle"}
              control={control}
            />
            <Controller
              as={
                <TextField
                  key={'Label ' + index}
                  label={'Label (optional)'}
                  onChange={([value]) => value}
                />
              }
              onChange={([value]) => {
                updateDataHandler(value, 'label')
                return value
              }}
              name={"label"}
              control={control}
            />
          </FormLayout.Group>

          <FormLayout.Group>
            <Controller
              as={
                <TextField
                  key={'Quantity ' + index}
                  label={'Quantity'}
                  type="number"
                  autoComplete="off"
                  onChange={([value]) => value}
                  error={errors && errors.quantity && errors.quantity.message}
                />
              }
              onChange={([value]) => {
                updateDataHandler(value, 'quantity')
                return value
              }}
              name={"quantity"}
              control={control}
            />
            <Controller
              as={
                <Select
                  key={'Type ' + index}
                  label='Discount Type'
                  options={options}
                  value={selected}
                />
              }
              onChange={([value]) => {
                updateDataHandler(value, 'type')
                handleSelectChange(value)
                return value
              }}
              name={"type"}
              control={control}
            />

            {
              selected != '0' ? (
                <Controller
                  as={
                    <TextField
                      key={'Amount ' + index}
                      label={'Amount'}
                      type="number"
                      autoComplete="off"
                      suffix={selected === '1' ? '%' : '$'}
                      onChange={([value]) => value}
                      error={errors && errors.amount && errors.amount.message}
                    />
                  }
                  onChange={([value]) => {
                    updateDataHandler(value, 'amount')
                    return value
                  }}
                  name={"amount"}
                  control={control}
                />
              ) : <></>
            }
          </FormLayout.Group>
        </FormLayout>
      </Form>
    </div>
  );
};

export default ListOption;
