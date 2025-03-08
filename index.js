const fs = require("fs");
const express = require("express");
const app = express();
const articles = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/articles.json`)
);
app.use(express.json());
const getArticles= (req, res) => {
  res.status(200).json({
    status: "sucess",
    length: articles.length,
    data: {
      articles,
    },
  });
};

const createArticle=(req, res) => {
  // console.log(req.body)
  const newId = articles[articles.length - 1].id + 1;
  const newArticle = Object.assign({ id: newId }, req.body);
  articles.push(newArticle);
  fs.writeFile(
    `${__dirname}/dev-data/data/articles.json`,
    JSON.stringify(articles),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          article: newArticle,
        },
      });
    }
  );
};
const getArticle= (req, res) => {
  const id = req.params.id * 1;
  const articleId = articles.find((el) => el.id === id);
  if (!articleId) {
    res.status(400).json({
      status: "fail",
      message: "Invalid ID",
    });
  }
  res.status(200).json({
    status: "success",
    results: articleId.length,
    data: {
      articleId,
    },
  });
};


const updateArticle= (req, res) => {
    if (req.params.id *1  >articles.length) {
      return res.status(404).json({
        status: "fail",
        message: "Invalid ID",
      });
    }
    res.status(200).json({
      status:"success",
      data:{
          article:'<Updated tour here...'
      }
    })
  };
  
const deleteArticle=(req,res)=>{
      if(req.params.id *1>articles.length){
          return res.status(404).json({
              status:'Fail',
              message:'Invalid Id'
          })
      }
      res.status(204).json({
          status:"Success",
          data:null
      })
  }

//   app.get("/api/v1/articles",getArticles)
//   app.post("/api/v1/articles",createArticle)
//   app.get("/api/v1/articles/:id",getArticle),
//   app.patch("/api/v1/articles/:id",updateArticle)
//   app.delete("/api/v1/articles/:id",deleteArticle)

app.route("/api/v1/articles").get(getArticles).post(createArticle)
app.route("/api/v1/articles/:id").get(getArticle).patch(updateArticle).patch(updateArticle).delete(deleteArticle)

const port = 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
