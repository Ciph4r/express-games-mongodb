module.exports = {
    noentry: (req,res)=> {
       
        return res.status(200).json({comfirmation: 'success' , message: 'wrong secret'})
    }

}