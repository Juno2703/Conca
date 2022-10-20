const  express = require("express");
const  router = express.Router();
const fs = require("fs");

////// - Model
const Product = require("../model/Product");
const Category = require("../model/Category");
const Admin = require("../model/Admin");

router.use( async function(req,res,next)
{
    if(req.session.AdminTenTK)
    {
        let data = await Admin.findOne({ TK : req.session.AdminTenTK})
        console.log(data);
        let CacSanPham = await Product.find({});
        console.log(CacSanPham);
        let temptestlogin = true;
        res.render("listpc", {CacSanPham,data,temptestlogin});
    }
    else
    {
        res.redirect("/Admin");
    }
    next();
});

router.get( "/" , PCHome);
async function PCHome(yeucau, trave) {
    try {
        let dssp = await Product.find({});
        console.log(dssp);
        trave.render("listpc", {CacSanPham: dssp});
    } catch (error) {
        console.log(error);
    }
}
router.get( "/newproduct" , async (yeucau, trave) => {
    let data = await Category.find({});
    trave.render("newproduct", {data : data});
});

router.post( "/newproduct" , (yeucau, trave) => {
    console.log("\n BODY: ", yeucau.body);
    console.log("\n Params: ", yeucau.params);
    console.log("\n Query: ", yeucau.query);

    oneproduct = new Product(yeucau.body,yeucau.body.Category); 
    oneproduct.save();

    trave.redirect("/PC");
    // trave.render("oneproduct",  {sanpham: yeucau.body});
});

router.get("/edit/:id", async (req, res, next) => {
    try{
    const id = req.params.id;
    let data = await Product.find({ _id : id})
    console.log(data);
    // const result = await Product.findByIdAndUpdate(id,
    //     {
    //         $set : 
    //         {
    //             MaSP : "D"
    //         }
    //     });
    res.render("editpc", {CacSanPham: data});
    } catch (erro)
    {
        console.log(erro);
    }

})

router.post( "/updatePC" , async (yeucau, trave) => {
    const id = yeucau.body.id;
    await Product.findByIdAndUpdate(id,yeucau.body);
    trave.redirect("/PC");
});

router.get("/delete/:id", function (req, res, next) {
    Product.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
        res.redirect('/PC')
      } else {
        console.log(err)
      }
    })
  })

exports.PCRouter = router;
