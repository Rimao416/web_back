
const Article = require("../models/articleModel");



exports.getArticles =async (req, res) => {
  const articles=await Article.find();
  res.status(200).json({
    status: "success",
    results: articles.length,
    data: {
      articles,
    },
  });
};

exports.createArticle =async (req, res) => {
  // console.log(req.body)
  try{
// use save
const article=new Article(req.body)
await article.save();
res.status(201).json({
  status: "success",
  data: {
    article,
  },
})
  }catch(err){
    res.status(400).json({
      status: "fail",
      message: err
    })
  }
};
exports.getArticle =async (req, res) => {
 try{
  const article=await Article.findById(req.params.id);
  if(!article){
    return res.status(404).json({
      status: "fail",
      message: "Invalid Id"
    })
  }
  res.status(200).json({
    status: "success",
    data: {
      article,
    },
  })
 }catch(err){
  res.status(404).json({
    status: "fail",
    message: err
  })
 }
};

exports.updateArticle=async(req,res)=>{
  try{
    const article=await Article.findByIdAndUpdate(req.params.id,req.body,{new:true});
    if(!article){
      return res.status(404).json({
        status: "fail",
        message: "Invalid Id"
      })
    }
    res.status(200).json({
      status: "success",
      data: {
        article,
      },
    })
  }catch(err){
    res.status(404).json({
      status: "fail",
      message: err
    })
  } 
}

exports.deleteArticle=async(req,res)=>{
  try{
    const article=await Article.findByIdAndDelete(req.params.id);
    if(!article){
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