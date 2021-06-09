

function save_file_on_server(file1, foldername) {
    let filename = file1.name;
    var pathOfFileUpload = foldername + "/" + filename;
    var realPath = "public/" + pathOfFileUpload;
    file1.mv(realPath, function (err) {
        if (err) throw err;
            //res.status(500).send(err);

    })

}

module.exports = save_file_on_server;
