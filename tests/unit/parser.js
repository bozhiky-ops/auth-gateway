const Ajv = require('ajv');
const ajv = new Ajv();

const authGatewaySchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Auth Gateway Request",
  "type": "object",
  "properties": {
    "username": {"type": "string"},
    "password": {"type": "string"},
    "client_id": {"type": "string"},
    "client_secret": {"type": "string"},
    "grant_type": {"type": "string"}
  },
  "required": ["username", "password", "client_id", "client_secret", "grant_type"]
};

const validate = ajv.compile(authGatewaySchema);

module.exports.validateRequest = (req) => {
  const isValid = validate(req.body);
  if (!isValid) {
    throw new Error(ajv.errorsText(validate.errors));
  }
  return req.body;
};