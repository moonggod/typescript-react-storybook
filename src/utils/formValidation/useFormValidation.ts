import { useState, useCallback } from 'react'
import { ValidationError } from 'class-validator'
import {
  transformAndValidate,
  transformAndValidateSync,
  ClassType,
  TransformValidationOptions
} from 'class-transformer-validator'
import { getFieldValidationProps as _getFieldValidationProps } from './getFieldValidationProps'

/**
 * Example (user login):

  import React, { useState } from 'react'
  import { Button, TextField } from '@material-ui/core'
  import { IsNotEmpty } from 'class-validator'

  class UserLoginReqDTO {
    @IsNotEmpty()
    username: string = ''

    @IsNotEmpty()
    password: string = ''
  }

  const formInitData = new UserLoginReqDTO()

  export function Login () {
    const [formData, setFormData] = useState<UserLoginReqDTO>(formInitData)
    const { getFieldValidationProps, validateFormSync } = useFormValidation(UserLoginReqDTO)

    const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [evt.target.id]: evt.target.value })
    }
    const handleSubmit = (evt: React.FormEvent) => {
      evt.preventDefault()
      if (!validateFormSync(formData)) return
      // formData is valid now!
    }

    return (
      <form onSubmit={handleSubmit}>
        <TextField
          id="username"
          label="Username"
          onChange={handleInput}
          value={formData.username}
          {...getFieldValidationProps('username')}
        />
        <TextField
          type="password"
          id="password"
          label="Password"
          onChange={handleInput}
          value={formData.password}
          {...getFieldValidationProps('password')}
        />
        <Button type="submit">
          Register
        </Button>
      </form>
    )
  }
 */
export function useFormValidation<T extends object>(classType: ClassType<T>) {
  const [formErrors, setFormErrors] = useState<ValidationError[]>([])

  const getFieldValidationProps = useCallback(
    (field: keyof T) => {
      return _getFieldValidationProps(
        field as string,
        formErrors,
        setFormErrors
      )
    },
    [formErrors]
  )

  const validateFormSync = useCallback(
    (formData: T, options?: TransformValidationOptions): T | null => {
      try {
        return transformAndValidateSync(classType, formData, options)
      } catch (errs) {
        setFormErrors(errs)
        return null
      }
    },
    [classType]
  )

  const validateFormAsync = useCallback(
    async (
      formData: T,
      options?: TransformValidationOptions
    ): Promise<T | null> => {
      try {
        return await transformAndValidate(classType, formData, options)
      } catch (errs) {
        setFormErrors(errs)
        return null
      }
    },
    [classType]
  )

  return {
    getFieldValidationProps,
    validateFormSync,
    validateFormAsync
  }
}
