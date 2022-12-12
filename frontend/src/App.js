import React, { useEffect, memo, useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Formik, Form, useField } from 'formik';
import './App.css';

const API_ENDPOINT = process.env.API_ENDPOINT || "http://localhost:3001";
const DEFAULT_CURRENCY = 'USD';

const useFetch = ({
  url,
  withDelay = false
}) => {
  const [ loading, setLoading ] = useState(true);
  const [ value, setValue ] = useState(null);
  const [error, setError] = useState(null);

  const makeRequest = async (params = {}) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/${url}`, params);
      const result = await response.json();
      setValue(result);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!withDelay) makeRequest();
  }, [withDelay]);

  return {
    loading,
    value,
    error,
    makeRequest
  }
}

const SelectField = ({ name, label, list = [] }) => {
  const [field, meta, helpers] = useField(name);
  return (
    <FormControl>
      <InputLabel id={name}>{label}</InputLabel>
      <Select
        labelId={name}
        name={name}
        value={field.value}
        onChange={(value) => {
          helpers.setValue(value);
        }}
      >
        {list.map(item => {
          return (<MenuItem value={item.value}>{item.label}</MenuItem>)
        })}
      </Select>
    </FormControl>
  )
}

const InputField = ({
  name,
  label,
  disabled,
}) => {
  const [field, meta, helpers] = useField(name);
  return (
    <TextField label={label} 
    value={field.value} 
    onChange={(e) => {
      helpers.setValue(e.target.value);
    }} 
    disabled={disabled} />  
  )
}

const FormGroupWrapper = ({ children }) => {
  return (
    <div className="form-group-wrapper">
      {children}
    </div>
  )
}

const FormContainer = memo(function FormContainer ({ resetForm }) {
  const [result, setResult] = useState(0);
  const { makeRequest } = useFetch({
    url: 'exchange',
    withDelay: true
  });
  const { value: currencyList = [] } = useFetch({
    url: 'currencies'
  });

  const handleClear = () => {
    setResult(0);
    resetForm();
  }
  
  const handleSubmit = async (values) => {
    const result = await makeRequest({
      method: "POST",
      body: JSON.stringify(values)
    });
    setResult(result.to);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroupWrapper>
        <SelectField label="From" list={currencyList || []} name="from" />
        <InputField name="amount" />
      </FormGroupWrapper>
      <FormGroupWrapper>
        <SelectField label="To" list={currencyList || []} name="to" />
        <TextField 
          value={result} 
          disabled
        /> 
      </FormGroupWrapper>
      <div className='form-btns'>
        <Button variant="contained" color="primary" onClick={handleClear}>Clear</Button>
        <Button variant="contained" color="primary" type='submit'>Exchange</Button>
      </div>
    </Form>
  )
}, () => {
  return true
})

const App = () => {
  return (
    <div className="app">
      <h1>Exchanger</h1>
      <Formik
        initialValues={{
          from: DEFAULT_CURRENCY,
          to: DEFAULT_CURRENCY,
          amount: 0
        }}
      >
        {(props) => {
          return <FormContainer resetForm={props.resetForm} />
        }}
      </Formik>
    </div>
  );
}

export default App;
