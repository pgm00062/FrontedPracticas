import exampleUseCases from './lib/example'
import clientUseCases from './lib/client'
import merchantUseCases from './lib/merchant'

const queries = {
  ...exampleUseCases,
  ...clientUseCases,
  ...merchantUseCases,
};

export default queries;