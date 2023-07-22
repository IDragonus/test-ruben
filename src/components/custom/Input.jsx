import TextField from '@mui/material/TextField'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'

export const Input = ({
  control,
  name,
  label,
  margin,
  required = false,
  fullWidth = false,
  autoComplete = false,
  autofocus,
  rules,
  errors,
  type,
  InputProps
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          margin={margin}
          type={type}
          required={required}
          fullWidth={fullWidth}
          label={label}
          autoComplete={autoComplete}
          autoFocus={autofocus}
          {...field}
          error={errors[name] && !!errors[name]}
          helperText={errors[name]?.message}
          InputProps={InputProps}
        />
      )}
      rules={rules}
    />
  )
}

Input.propTypes = {
  control: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  margin: PropTypes.string.isRequired,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  autoComplete: PropTypes.string,
  autofocus: PropTypes.bool,
  rules: PropTypes.object,
  errors: PropTypes.any,
  type: PropTypes.string.isRequired,
  InputProps: PropTypes.object
}
