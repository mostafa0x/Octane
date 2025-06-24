import * as yup from 'yup'

export const UploadvalidationSchema = yup.object().shape({
  company_id: yup.number().min(1, 'Error!').required('Required!'),
  cards_submitted: yup
    .number()
    .typeError('Must be a number')
    .min(1, 'It must be more than zero')
    .required('Required!'),
  submission_type: yup
    .string()
    .oneOf(
      ['replacement', 'existing_customer', 'new_customer'],
      'It must be an option : replacement, test'
    )
    .required('Required!'),
  delivery_method: yup
    .string()
    .oneOf(['office_receival', 'octane_employee', 'aramex'])
    .required('Required!'),
  image: yup.string().required('Required!'),
  state_time: yup
    .string()
    .oneOf(['on_Time', 'Late'], 'It must be an option : onTime OR late')
    .required('Required!'),
})
