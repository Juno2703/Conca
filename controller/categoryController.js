const  express = require("express");
const  router = express.Router();
const fs = require("fs");
const Category = require("../model/Category");

router.get( "/" , CategoryHome);
async function CategoryHome(yeucau, trave) {
    try {
        let dssp = await Category.find({});
        console.log(dssp);
        trave.render("listcategory", {CacSanPham: dssp});
    } catch (error) {
        console.log(error);
    }
}
router.get( "/newcategory" , (yeucau, trave) => {
    trave.render("newcategory");
});

router.post( "/newcategory" , (yeucau, trave) => {
    console.log("\n BODY: ", yeucau.body);
    console.log("\n Params: ", yeucau.params);
    console.log("\n Query: ", yeucau.query);

    oneproduct = new Category(yeucau.body);
    oneproduct.save();

    trave.redirect("/Category");
});

router.get("/delete/:id", function (req, res, next) {
    Category.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
        res.redirect('/Category')
      } else {
        console.log(err)
      }
    })
  })

exports.CategoryRouter = router;