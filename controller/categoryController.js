const Category = require("../models/categoryModel");

exports.deleteCategory=async(req,res)=>{
    try{
        const category=await Category.findByIdAndDelete(req.params.id);
        if(!category){
            return res.status(404).json({
                status: "fail",
                message: "Invalid Id"
            })
        }
        res.status(204).json({
            status: "success",
            data: null,
        })
    }catch(err){
        res.status(404).json({
            status: "fail",
            message: err
        })
    } 
}

exports.getCategory =async (req, res) => {
    const category=await Category.findById(req.params.id);
    if(!category){
      return res.status(404).json({
        status: "fail",
        message: "Invalid Id"
      })
    }
    res.status(200).json({
      status: "success",
      data: {
        category,
      },
    });
  };    