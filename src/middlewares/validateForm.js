const validateForms = (req, resp, next) => (schema) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return resp.status(500).json({
      message: error?.details?.map((detail) =>
        detail.message.replace(/"/g, "")
      ),
    });
  }

  next();
};

export default validateForms;
