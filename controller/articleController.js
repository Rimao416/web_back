const fs = require("fs");
const articles = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/articles.json`)
);

exports.checkId = (req, res, next,val) => {
    console.log(val)
  if (val > articles.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid Id",
    });
  }
  next();
};

exports.getArticles = (req, res) => {
  res.status(200).json({
    status: "sucess",
    length: articles.length,
    data: {
      articles,
    },
  });
};

exports.createArticle = (req, res) => {
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
exports.getArticle = (req, res) => {
  const id = req.params.id * 1;
  const articleId = articles.find((el) => el.id === id);

  res.status(200).json({
    status: "success",
    results: articleId.length,
    data: {
      articleId,
    },
  });
};

exports.updateArticle = (req, res) => {
  res.status(200).json({
    status: "success",
    data: {
      article: "<Updated tour here...",
    },
  });
};

exports.deleteArticle = (req, res) => {
  if (req.params.id * 1 > articles.length) {
    return res.status(404).json({
      status: "Fail",
      message: "Invalid Id",
    });
  }
  res.status(204).json({
    status: "Success",
    data: null,
  });
};
