const deleteFieldsUpdate = (req, res, next) => {

    const fieldToDelete = ['email', 'password']
  
    fieldToDelete.forEach((field) => {
      return delete req.body[field]
    })
  
    next()
  
  }
  
module.exports = deleteFieldsUpdate