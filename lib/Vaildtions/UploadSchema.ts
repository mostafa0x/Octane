import * as yup from 'yup'

export const UploadvalidationSchema = yup.object().shape({
  company_id: yup.number().required('Required!'),
  cards_submitted: yup
    .number()
    .typeError('Must be a number')
    .min(1, 'It must be more than zero')
    .required('Required!'),
  submission_type: yup
    .string()
    .oneOf(['replacement', 'test'], 'It must be an option : replacement, test')
    .required('Required!'),
  delivery_method: yup.string().oneOf(['octane_employee', 'test']).required('Required!'),
  image: yup.string().required('Required!'),
  state_time: yup.string().oneOf(['onTime', 'late']).required('Required!'),
})
