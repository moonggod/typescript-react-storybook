import React from 'react'
import { ValidationError } from 'class-validator'
import { TextFieldProps } from '@material-ui/core'

/**
 * Tips: For functional components, please use `useFormValidation` instead
 * This helper function can still be used in legacy class components
 *
 * =======================================================================
 *
 * This helper function solved:
 * 1. ValidationError is too verbose to display
 * 2. https://material-ui.com/api/text-field requires props.{error|helperText}
 *
 * Example (user login):

  import React, { useState } from 'react'
  import { Button, TextField } from '@material-ui/core'
  import { IsNotEmpty, ValidationError } from 'class-validator'
  import { transformAndValidateSync } from 'class-transformer-validator'

  class UserLoginReqDTO {
    @IsNotEmpty()
    username: string = ''

    @IsNotEmpty()
    password: string = ''
  }

  const formInitData = new UserLoginReqDTO()

  export function Login () {
    const [formData, setFormData] = useState<UserLoginReqDTO>(formInitData)
    const [formErrors, setFormErrors] = useState<ValidationError[]>([])

    const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [evt.target.id]: evt.target.value })
    }
    const handleSubmit = (evt: React.FormEvent) => {
      evt.preventDefault()
      try {
        transformAndValidateSync(UserLoginReqDTO, formData)
        setFormErrors([])
      } catch (errors) {
        setFormErrors(errors)
        return
      }
      // formData is valid now!
    }

    return (
      <form onSubmit={handleSubmit}>
        <TextField
          id="username"
          label="Username"
          onChange={handleInput}
          value={formData.username}
          {...getFieldValidationProps('username', formErrors, setFormErrors)}
        />
        <TextField
          type="password"
          id="password"
          label="Password"
          onChange={handleInput}
          value={formData.password}
          {...getFieldValidationProps('password', formErrors, setFormErrors)}
        />
        <Button type="submit">
          Register
        </Button>
      </form>
    )
  }

 * Tips: If you need to customize props from `FieldValidationProps`, you can:
  <TextField
    id="fieldName"
    label="Field Label"
    {...(({ error, helperText, onFocus }) => ({
      error,
      helperText: helperText + 'XXX',
      onFocus () {
        onFocus()
        // ...
      }
    }))(getFieldValidationProps('fieldName', formErrors, setFormErrors))}
  />
 */
export function getFieldValidationProps(
  field: string,
  errors: ValidationError[],
  setErrors: React.Dispatch<React.SetStateAction<ValidationError[]>>
): FieldValidationProps {
  const error = errors.find(err => err.property === field)
  if (!error) {
    return {
      error: false,
      helperText: ''
    }
  }
  return {
    error: true,
    // @IsNotEmpty should have the highest priority
    helperText:
      error.constraints?.isNotEmpty || Object.values(error.constraints!)[0],
    onFocus: () => {
      setErrors(errors.filter(err => err !== error)) // remove err msg anyway on focus
    }
  }
}

export type FieldValidationProps = Required<
  Pick<TextFieldProps, 'error' | 'helperText'>
> &
  Pick<TextFieldProps, 'onFocus'>
