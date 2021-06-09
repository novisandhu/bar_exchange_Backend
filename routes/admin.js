var express = require('express');
var router = express.Router();

const session = require('express-session');
const conn = require('../connection');
const save_file_on_server = require('../uploadFile');
const delete_file_from_server = require('../deleteFile');


/* GET admins listing. */

router.get('/', function (req, res, next) {

    let response = '';
    if (session.adminUsername !== undefined && session.adminUsername !== null) {

        response = {msg: true};
    } else {
        response = {msg: false};
    }
    res.send(response);
});

router.post('/adminChangePassword', function (req, res, next) {

    let newPassword = req.body.newPass;
    let updateQuery = "UPDATE `admin` SET `password`='" + newPassword + "' WHERE `username`='" + session.adminUsername + "'";
    let response = '';
    //console.log(selectQuery);
    conn.query(updateQuery, function (error) {
        //if (error) throw error;
        if (error) {
            response = {msg: 'failed'};
        } else {

            response = {msg: 'success'};

        }
        res.send(response);
    })


});
router.post('/checkCurrentPassword', function (req, res, next) {

    let password = req.body.currentPass;

    let selectQuery = "SELECT * FROM admin WHERE username='" + session.adminUsername + "'and password='" + password + "'";
    let response = '';
    //console.log(selectQuery);
    conn.query(selectQuery, function (error, rows) {
        //if (error) throw error;
        if (rows.length === 0) {
            response = {msg: false};
        } else {

            response = {msg: true};

        }
        res.send(response);
    })


});

router.post('/adminLogin', function (req, res, next) {

    let username = req.body.username;
    let password = req.body.password;

    let selectQuery = "SELECT * FROM admin WHERE username='" + username + "'and password='" + password + "'";
    let response = '';
    console.log(selectQuery);
    conn.query(selectQuery, function (error, rows) {
        //if (error) throw error;
        if (rows.length === 0) {
            response = {msg: 'failed'};
        } else {

            session.adminUsername = username;
            response = {msg: 'success'};

        }
        res.send(response);
    })


});


router.get('/adminLogout', function (req, res, next) {

    session.adminUsername = undefined;
    res.send({msg: 'Logout'});
});

router.post('/getCategory', function (req, res, next) {

    let selectQuery = "";
    if (req.body.msg === 'onlyCategory') {
        selectQuery = "SELECT categoryname FROM `category`";
    } else if (req.body.msg === 'categoryCount') {
        selectQuery = "SELECT COUNT(categoryname) AS 'catTotal' FROM `category` ";
    } else {
        selectQuery = "SELECT * FROM `category`";
    }

    conn.query(selectQuery, function (error, rows) {
        //if (error) throw error;
        if (rows.length === 0) {
            res.send("");
        } else {
            res.send(rows);
        }
        //console.log(rows);

    })

});

router.post('/addCategory', function (req, res, next) {

    let categoryname = req.body.categoryname;
    let categorydescription = req.body.categorydescription;
    let supercategory = req.body.supercategory;

    let insertQuery = "INSERT INTO `category`(`categoryname`, `categorydescription`, `supercategory`) VALUES ('" + categoryname + "','" + categorydescription + "','" + supercategory + "')";
    let response = '';
    //console.log(selectQuery);
    conn.query(insertQuery, function (error) {
        //if (error) throw error;
        if (error) {
            response = {msg: 'failed'};
        } else {

            response = {msg: 'success'};

        }
        res.send(response);
    })


});
router.post('/deleteCategory', function (req, res, next) {

    let categoryname = req.body.categoryName;
    let deleteQuery = "DELETE FROM `category` WHERE `categoryname`='" + categoryname + "'";
    let response = '';
    //console.log(selectQuery);
    conn.query(deleteQuery, function (error) {
        //if (error) throw error;
        if (error) {
            response = {msg: 'failed'};
        } else {

            response = {msg: 'success'};

        }
        res.send(response);
    })
});

router.post('/updateCategory', function (req, res, next) {

    let categoryname = req.body.categoryname;
    let categoryOldName = req.body.categoryOldName;
    let categorydescription = req.body.categorydescription;
    let supercategory = req.body.supercategory;


    let updateQuery = "UPDATE `category` SET `categoryname`='" + categoryname + "',`categorydescription`='" + categorydescription + "',`supercategory`='" + supercategory + "' WHERE `categoryname`='" + categoryOldName + "'";
    let response = '';
    console.log(updateQuery);
    conn.query(updateQuery, function (error) {
        //if (error) throw error;
        if (error) {
            response = {msg: 'failed'};
        } else {

            response = {msg: 'success'};

        }
        res.send(response);
    })


});


router.post('/getSubCategory', function (req, res, next) {

    let categoryname = req.body.categoryname;

    let selectQuery = "";
    if (req.body.msg === 'onlySubCategory') {
        selectQuery = "SELECT subcategoryid,subcategoryname FROM `subcategory` where categoryname='" + categoryname + "'";
    } else if (req.body.msg === 'subCategoryCount') {
        selectQuery = "SELECT  COUNT(subcategoryid) AS 'subcatTotal' FROM `subcategory`";
    } else {
        selectQuery = "SELECT * FROM `subcategory`";
    }

    conn.query(selectQuery, function (error, rows) {
        //if (error) throw error;
        if (rows.length === 0) {
            res.send('');
        } else {
            res.send(rows);
        }
        //console.log(rows);

    })

});

router.post('/addSubCategory', function (req, res, next) {

    let categoryname = req.body.categoryname;
    let subcategorydescription = req.body.subcategorydescription;
    let subcategoryname = req.body.subcategoryname;

    let insertQuery = "INSERT INTO `subcategory`(`subcategoryname`, `subcategorydescription`, `categoryname`) VALUES ('" + subcategoryname + "','" + subcategorydescription + "','" + categoryname + "')";
    let response = '';
    //console.log(selectQuery);
    conn.query(insertQuery, function (error) {
        //if (error) throw error;
        if (error) {
            response = {msg: 'failed'};
        } else {

            response = {msg: 'success'};

        }
        res.send(response);
    })


});

router.post('/deleteSubCategory', function (req, res, next) {

    let subcategoryid = req.body.subid;
    let deleteQuery = "DELETE FROM `subcategory` WHERE `subcategoryid`='" + subcategoryid + "'";
    let response = '';
    //console.log(selectQuery);
    conn.query(deleteQuery, function (error) {
        //if (error) throw error;
        if (error) {
            response = {msg: 'failed'};
        } else {

            response = {msg: 'success'};

        }
        res.send(response);
    })
});

router.post('/updateSubCategory', function (req, res, next) {

    let subcategoryid = req.body.subcategoryid;
    let categoryname = req.body.categoryname;
    let subcategorydescription = req.body.subcategorydescription;
    let subcategoryname = req.body.subcategoryname;

    let updateQuery = "UPDATE `subcategory` SET `subcategoryname`='" + subcategoryname + "',`subcategorydescription`='" + subcategorydescription + "',`categoryname`='" + categoryname + "' WHERE `subcategoryid`='" + subcategoryid + "'";
    let response = '';
    //console.log(selectQuery);
    conn.query(updateQuery, function (error) {
        //if (error) throw error;'"+subcategoryid+
        if (error) {
            response = {msg: 'failed'};
        } else {

            response = {msg: 'success'};

        }
        res.send(response);
    })
});

router.post('/getProducts', function (req, res, next) {
    let selectQuery = "";

    if (req.body.msg === '') {
        selectQuery = "SELECT p.*,s.subcategoryname,s.categoryname FROM `products` AS p INNER JOIN subcategory AS s on p.subcategoryid=s.subcategoryid ORDER BY p.`productid` DESC";
    } else if (req.body.msg === 'onlyProducts') {
        selectQuery = "SELECT productid,productname FROM `products`";
    } else if (req.body.msg === 'productCount') {
        selectQuery = "SELECT  COUNT(productid) AS 'productTotal' FROM `products`";
    } else {
        selectQuery = "SELECT * FROM `products` where `subcategoryid`='" + req.body.msg + "'";
    }

    conn.query(selectQuery, function (error, rows) {
        //if (error) throw error;
        if (rows.length === 0) {
            res.send("");
        } else {
            res.send(rows);
        }
    });
});

router.post('/addProductsData', function (req, res, next) {
    let categoryname = req.body.categoryname;
    let subcategoryid = req.body.subcategoryname;
    let productname = req.body.productname;
    let price = req.body.price;
    let discount = req.body.discount;
    let productdescription = req.body.productdescription;

    let photo = req.files.photo;
    let filename = 'images/' + photo.name;
    save_file_on_server(photo, 'images');

    // INSERT INTO `products`(`productid`, `productname`, `price`, `discount`, `photo`, `description`, `subcategoryid`)
    // VALUES ()
    let insertQuery = "INSERT INTO `products`(`productid`,`productname`, `price`, `discount`, `photo`, `description`, `subcategoryid`) VALUES (null,'" + productname + "','" + price + "','" + discount + "','" + filename + "','" + productdescription + "','" + subcategoryid + "')";
    let response = '';
    conn.query(insertQuery, function (error) {
        if (error) throw error;

        res.send({msg: 'success'});
    });
});

router.post('/deleteProduct', function (req, res, next) {

    let productid = req.body.pid;
    let deleteQuery = "DELETE FROM `products` WHERE `productid`='" + productid + "'";
    let response = '';
    //console.log(selectQuery);
    conn.query(deleteQuery, function (error) {
        //if (error) throw error;
        if (error) {
            response = {msg: 'failed'};
        } else {

            response = {msg: 'success'};

        }
        res.send(response);
    });
});

router.post('/updateProducts', function (req, res, next) {
    console.log(req.body);
    let productid = req.body.productid;
    let categoryname = req.body.categoryname;
    let subcategoryid = req.body.subcategoryname;
    let productname = req.body.productname;
    let price = req.body.price;
    let discount = req.body.discount;
    let productdescription = req.body.productdescription;
    let updateQuery = "";

    if (req.body.photo === '') {
        updateQuery = "UPDATE `products` SET `productname`='" + productname + "',`price`='" + price + "',`discount`='" + discount + "',`description`='" + productdescription + "',`subcategoryid`='" + subcategoryid + "' WHERE `productid`='" + productid + "'";
    } else {
        let photo = req.files.photo;
        let filename = 'images/' + photo.name;
        save_file_on_server(photo, 'images');

        updateQuery = "UPDATE `products` SET `productname`='" + productname + "',`price`='" + price + "',`discount`='" + discount + "',`photo`='" + filename + "',`description`='" + productdescription + "',`subcategoryid`='" + subcategoryid + "' WHERE `productid`='" + productid + "'";
    }
    // console.log(updateQuery);
    conn.query(updateQuery, function (error) {
        if (error) throw error;

        res.send({msg: 'success'});
    })
});

router.post('/getStock', function (req, res, next) {

    let msg = req.body.msg;
    let selectQuery;
    if (msg === '') {
        selectQuery = "SELECT p.*,s.productname FROM `product_stock` AS p INNER JOIN products AS s on p.productid=s.productid";
    } else if (msg === 'dailyStockCount') {
        selectQuery = "SELECT COUNT(stockid) AS 'dailyStockTotal' FROM `product_stock`  WHERE DATE(stockdate) = DATE(NOW())";
    }
    conn.query(selectQuery, function (error, rows) {
        //if (error) throw error;
        if (rows.length === 0) {
            res.send("");
        } else {
            res.send(rows);
        }
        //console.log(rows);

    })
});

router.post('/addStockData', function (req, res, next) {

    let productid = req.body.productname;
    let qty = req.body.qty;
    let vendorname = req.body.vendorname;

    let insertQuery = "INSERT INTO `product_stock`(`productid`, `qty`, `vendorname`) VALUES ('" + productid + "','" + qty + "','" + vendorname + "')";

    let response = '';
    //console.log(selectQuery);'"++"'
    conn.query(insertQuery, function (error) {
        // if (error) throw error;
        if (error) {
            response = {msg: 'failed'};
        } else {

            response = {msg: 'success'};

        }
        res.send(response);
    })


});


router.post('/getStaff', function (req, res, next) {

    let msg = req.body.msg;
    let selectQuery;

    if (msg === '') {
        selectQuery = "SELECT * FROM `staff`";
    } else if (msg === 'staffCount') {
        selectQuery = "SELECT COUNT(staffusername) AS 'staffTotal' FROM `staff`";
    }


    conn.query(selectQuery, function (error, rows) {
        //if (error) throw error;
        if (rows.length === 0) {
            res.send("");
        } else {
            res.send(rows);
        }
        //console.log(rows);

    })

});

router.post('/addStaff', function (req, res, next) {

    let staffusername = req.body.staffusername;
    let password = req.body.password;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let type = req.body.type;

    let insertQuery = "INSERT INTO `staff`(`staffusername`, `password`, `email`, `mobile`, `type`) VALUES ('" + staffusername + "','" + password + "','" + email + "','" + mobile + "','" + type + "')";
    let response = '';
    //console.log(selectQuery);
    conn.query(insertQuery, function (error) {
        //if (error) throw error;
        if (error) {
            response = {msg: 'failed'};
        } else {

            response = {msg: 'success'};

        }
        res.send(response);
    })


});
router.post('/deleteStaff', function (req, res, next) {

    let staffusername = req.body.staffusername;
    let deleteQuery = "DELETE FROM `staff` WHERE `staffusername`='" + staffusername + "'";
    let response = '';
    //console.log(selectQuery);
    conn.query(deleteQuery, function (error) {
        //if (error) throw error;
        if (error) {
            response = {msg: 'failed'};
        } else {

            response = {msg: 'success'};

        }
        res.send(response);
    })
});

router.post('/updateStaff', function (req, res, next) {

    let staffusername = req.body.staffusername;
    let staffOldUserName = req.body.staffOldUserName;
    let password = req.body.password;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let type = req.body.type;


    let updateQuery = "UPDATE `staff` SET `staffusername`='" + staffusername + "',`password`='" + password + "',`email`='" + email + "',`mobile`='" + mobile + "',`type`='" + type + "' WHERE `staffusername`='" + staffOldUserName + "'";
    let response = '';
    console.log(updateQuery);
    conn.query(updateQuery, function (error) {
        //if (error) throw error;
        if (error) {
            response = {msg: 'failed'};
        } else {

            response = {msg: 'success'};

        }
        res.send(response);
    })


});

router.post('/changeStaffStatus', function (req, res, next) {

    let staffusername = req.body.staffusername;
    let status = req.body.status;
    if (status === 'active') {
        status = 'inactive'
    } else {
        status = 'active'
    }
    let updateQuery = "UPDATE `staff` SET `status`='" + status + "' WHERE `staffusername`='" + staffusername + "'";
    let response = '';
    //console.log(selectQuery);
    conn.query(updateQuery, function (error) {
        //if (error) throw error;
        if (error) {
            response = {msg: 'failed'};
        } else {

            response = {msg: 'success'};

        }
        res.send(response);
    })
});


module.exports = router;
