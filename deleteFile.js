function delete_file_from_server(file1) {

    var realPath = "public/" + file1;

    file1.mv(realPath, function (err) {
        if (err) throw err;
        //res.status(500).send(err);

    })


}

module.exports = delete_file_from_server;
