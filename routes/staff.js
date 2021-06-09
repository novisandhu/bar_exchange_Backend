var express = require('express');
var router = express.Router();


const session = require('express-session');
const conn = require('../connection');


/* GET users listing. */
router.get('/', function (req, res, next) {
    let response = '';
    if (session.staffUsername !== undefined && session.staffUsername !== null) {

        response = {msg: true, type: session.staffType};
    } else {
        response = {msg: false};
    }
    res.send(response);
});


router.post('/staffChangePassword', function (req, res, next) {

    let newPassword = req.body.newPass;
    let updateQuery = "UPDATE `staff` SET `password`='" + newPassword + "' WHERE `staffusername`='" + session.staffUsername + "'";
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

    let selectQuery = "SELECT * FROM staff WHERE staffusername='" + session.staffUsername + "'and password='" + password + "'";
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

router.post('/staffLogin', function (req, res, next) {

    let username = req.body.username;
    let password = req.body.password;

    let selectQuery = "SELECT * FROM staff WHERE staffusername='" + username + "'and password='" + password + "'";
    let response = '';
    console.log(selectQuery);
    conn.query(selectQuery, function (error, rows) {
        //if (error) throw error;
        if (rows.length === 0) {
            response = {msg: 'Invalid Login credentials'};
        } else {
            if (rows[0].status === 'active') {
                session.staffUsername = username;
                session.staffType = rows[0].type;
                response = {msg: 'success'};
            } else {
                response = {msg: 'Inactive Account'};
            }


        }
        res.send(response);
    })


});


router.get('/staffLogout', function (req, res, next) {

    session.staffUsername = undefined;
    res.send({msg: 'Logout'});

});
router.get('/getcartProducts', function (req, res) {
    let cartArray = [];
    if (session.cart !== undefined) {
        cartArray = session.cart;
    }
    res.send(JSON.stringify(cartArray))
});

router.post('/addtoCart', function (req, res) {

    let productid = req.body.pid;
    let cartArray = [];

    if (session.cart !== undefined) {
        cartArray = session.cart;
    }

    if (req.body.action === 'new') {

        let qty = 1;

        // let selectQuery = "SELECT * FROM `products` where productid='" + productid + "'";
        let selectQuery = "SELECT p.*,s.qty FROM `products` AS p LEFT JOIN product_stock AS s on p.productid=s.productid WHERE p.productid='" + productid + "'";

        conn.query(selectQuery, function (err, rows) {

            if (err) throw err;
            let objProduct = {
                productid: productid,
                productname: rows[0].productname,
                photo: rows[0].photo,
                discount: rows[0].discount,
                price: rows[0].price,
                maxQty: rows[0].qty,
                qty: qty
            }
            cartArray.push(objProduct);

            session.cart = cartArray;
            res.send(JSON.stringify(cartArray))


        })
    } else if (req.body.action === 'remove') {
        let Temparray = [];
        for (let i = 0; i < cartArray.length; i++) {
            if (cartArray[i].productid !== productid) {
                Temparray.push(cartArray[i]);
            }
        }
        session.cart = Temparray;
        res.send(JSON.stringify(Temparray))
    } else if (req.body.action === 'plus') {

        for (let i = 0; i < cartArray.length; i++) {
            if (cartArray[i].productid === productid) {

                cartArray[i].qty += 1;
                break;
            }
        }
        session.cart = cartArray;
        res.send(JSON.stringify(cartArray))
    } else if (req.body.action === 'minus') {
        for (let i = 0; i < cartArray.length; i++) {
            if (cartArray[i].productid === productid) {

                cartArray[i].qty -= 1;
                break;
            }
        }
        session.cart = cartArray;
        res.send(JSON.stringify(cartArray))
    }
});

router.post('/addOrder', function (req, res) {

    // console.log(req.body.msg[0].amount);
    let msg = req.body.msg;


    // console.log(msg1[0].amount);
    let insertQuery = "INSERT INTO `orders`(`amount`, `paymentmode`, `mobileno`, `staffusername`) VALUES ('" + msg[0].amount + "','" + msg[0].paymentmode + "','" + msg[0].mobile + "','" + session.staffUsername + "')";
    let response = {msg: 'success'};
    //console.log(selectQuery);
    conn.query(insertQuery, function (error, result) {
        //if (error) throw error;
        if (error) {
            response = {msg: 'failed'};
            res.send(response);
        } else {
            let orderid = result.insertId;

            msg.shift();
            for (let i = 0; i < msg.length; i++) {
                let insertQuery = "INSERT INTO `orderdetail`(`productid`, `price`, `qty`, `discount`, `netprice`,`orderid`) VALUES ('" + msg[i].productid + "','" + msg[i].price + "','" + msg[i].qty + "','" + msg[i].discount + "','" + msg[i].netprice + "','" + orderid + "')";
                conn.query(insertQuery, function (error) {
                    //if (error) throw error;
                    if (error) {
                        response = {msg: 'failed'};
                        res.send(response);

                    } else {
                        response = {msg: 'success'};
                    }
                });

            }
            // console.log(response);
            res.send(response);

        }


    })


});

router.post('/getOrderDetails', function (req, res) {

    let msg = req.body.msg;
    let selectQuery;
    if (msg === '') {
        selectQuery = "SELECT p.productname,p.photo,o.*,od.* FROM `orderdetail` AS od INNER JOIN products AS p on od.productid=p.productid INNER JOIN orders AS o on od.orderid=o.orderid where o.staffusername='" + session.staffUsername + "'";

    } else if (msg === 'pending') {
        selectQuery = "SELECT p.productname,p.photo,o.datetime,od.detailid,od.qty,od.status FROM `orderdetail` AS od INNER JOIN products AS p on od.productid=p.productid INNER JOIN orders AS o on od.orderid=o.orderid where od.status='" + 'pending' + "'";
    } else if (msg === 'allserved') {
        selectQuery = "SELECT * FROM `orders` where orders.status='served'";
    } else if (msg === 'orderdetails') {
        let orderid = req.body.orderid;
        selectQuery = "SELECT * FROM `orderdetail` where orderid='" + orderid + "'";
    } else if (msg === 'cooked') {
        selectQuery = "SELECT p.productname,p.photo,o.datetime,o.mobileno,od.orderid,od.detailid,od.qty,od.status FROM `orderdetail` AS od INNER JOIN products AS p on od.productid=p.productid INNER JOIN orders AS o on od.orderid=o.orderid where od.status='" + 'cooked' + "'";
    } else if (msg === 'orderCount') {
        selectQuery = "SELECT COUNT(orderid) AS 'orderTotal' FROM `orders`";
    } else if (msg === 'dailyOrderCount') {
        selectQuery = "SELECT COUNT(orderid) AS 'dailyOrderTotal' FROM orders WHERE DATE(datetime) = DATE(NOW())";
    } else if (msg === 'monthlyOrderCount') {
        selectQuery = "SELECT COUNT(orderid) AS 'monthlyOrderTotal' FROM orders WHERE MONTH(datetime) = MONTH(CURRENT_DATE()) AND YEAR(datetime) = YEAR(CURRENT_DATE())";
    } else if (msg === 'yearlyOrderCount') {
        selectQuery = "SELECT COUNT(orderid) AS 'yearlyOrderTotal' FROM orders where YEAR(datetime) = YEAR(CURDATE())";
    } else if (msg === 'betweenOrderCount') {
        selectQuery = "SELECT * FROM orders where datetime BETWEEN '" + req.body.fromDate + "' AND '" + req.body.toDate + "'";
    } else if (msg === 'stafforderCount') {
        selectQuery = "SELECT COUNT(orderid) AS 'orderTotal' FROM `orders` where staffusername='" + session.staffUsername + "'";
    } else if (msg === 'staffdailyOrderCount') {
        selectQuery = "SELECT COUNT(orderid) AS 'dailyOrderTotal' FROM orders WHERE DATE(datetime) = DATE(NOW()) AND staffusername='" + session.staffUsername + "'";
    } else if (msg === 'staffmonthlyOrderCount') {
        selectQuery = "SELECT COUNT(orderid) AS 'monthlyOrderTotal' FROM orders WHERE MONTH(datetime) = MONTH(CURRENT_DATE()) AND YEAR(datetime) = YEAR(CURRENT_DATE()) AND staffusername='" + session.staffUsername + "'";
    } else if (msg === 'staffyearlyOrderCount') {
        selectQuery = "SELECT COUNT(orderid) AS 'yearlyOrderTotal' FROM orders where YEAR(datetime) = YEAR(CURDATE()) AND staffusername='" + session.staffUsername + "'";
    } else if (msg === 'staffbetweenOrderCount') {
        selectQuery = "SELECT p.productname,p.photo,o.*,od.* FROM `orderdetail` AS od INNER JOIN products AS p on od.productid=p.productid INNER JOIN orders AS o on od.orderid=o.orderid where o.datetime BETWEEN '" + req.body.fromDate + "' AND '" + req.body.toDate + "' AND o.staffusername='" + session.staffUsername + "'";
    } else {
        selectQuery = "SELECT p.productname,p.photo,o.*,od.* FROM `orderdetail` AS od INNER JOIN products AS p on od.productid=p.productid INNER JOIN orders AS o on od.orderid=o.orderid where o.mobileno='" + msg + "' AND o.status='" + 'served' + "'";

    }
console.log(selectQuery)
    conn.query(selectQuery, function (error, rows) {
        // if (error) throw error;
        if (error) {

            response = {msg: 'failed'};
            res.send(response);



        } else {
         if(msg==='allserved')
         {
             let allOrders = [];

             if( rows.length >0) {

                 count2Exit = 1;
                 for (let i = 0; i < rows.length; i++) {
                     let orderData = rows[i];
                     let billid = rows[i].orderid;

                     let Query = "SELECT * FROM `orderdetail` INNER JOIN products on orderdetail.productid=products.productid where orderid=" + billid + " ORDER BY orderid DESC";
                     // console.log(Query);
                     conn.query(Query, function (err, subrows) {
                         if (err) throw err;

                         orderData['details'] = subrows;
                         allOrders.push(orderData);
                         if (count2Exit == rows.length) {
                             res.send(allOrders);
                         }
                         count2Exit++;
                     })
                 }
             }else
             {
                 res.send(allOrders);
             }



         }else {
             res.send(rows);
         }
        }
    });
});

router.post('/changeOrderStatus', function (req, res) {

    let detailid = req.body.did;
    let orderid = req.body.oid;
    let status = req.body.msg;

    let updateQuery = "UPDATE `orderdetail` SET `status`='" + status + "' WHERE `detailid`='" + detailid + "'";
    let response = '';
    let allCooked = true;
    // console.log(updateQuery);
    conn.query(updateQuery, function (error) {
        //if (error) throw error;
        if (error) {
            response = {msg: 'failed'};
        } else {

            let selectQuery = "SELECT status FROM `orderdetail` WHERE `orderid`='" + orderid + "'";
            conn.query(selectQuery, function (error, rows) {

                // console.log(rows);
                for (let i = 0; i < rows.length; i++) {
                    if (rows[i].status === 'cooked') {
                        allCooked = false;
                        break;
                    }
                }

                if (allCooked) {
                    let updateQuery = "UPDATE `orders` SET `status`='" + status + "' WHERE `orderid`='" + orderid + "'";
                    conn.query(updateQuery, function (error) {
                        //if (error) throw error;
                        if (error) {
                            response = {msg: 'failed'};
                        } else {
                            response = {msg: 'success'};
                        }
                    })
                }

            })

        }
        res.send(response);
    })

});


router.post('/updateOrderPayment', function (req, res) {
    let oid = req.body.orderid;
    let mode = req.body.paymentmode;

    let updateQuery = "UPDATE `orders` SET `paymentmode`='" + mode + "',`status`='" + 'paid' + "' WHERE `orderid`='" + oid + "'";
    let response = '';
    // console.log(updateQuery);
    conn.query(updateQuery, function (error) {
        if (error) throw error;

        res.send({msg: 'success'});
    });
    session.cart = undefined;
});

module.exports = router;
