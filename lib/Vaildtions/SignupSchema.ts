import * as yup from 'yup'

export const SignUpvalidationSchema = yup.object().shape({
  name: yup.string().min(4, 'to Short !').max(50, 'Max 50').required('Required!'),
  email: yup.string().email('invaild Email!').required('Required!'),
  password: yup.string().min(7, 'to short!').required('Requird!'),
})
