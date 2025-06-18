import * as yup from 'yup'

export const LoginSchema = yup.object().shape({
  email: yup.string().email('Email address is invalid!').required('Required'),
  password: yup.string().min(6, 'Too Short!').required('Required'),
})
