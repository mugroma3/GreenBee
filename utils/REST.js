
module.exports = {

    generate: function (req, res, anwser) {
        if(anwser[0]=='201'){
            return res.status(anwser[0]).json(anwser[1]);
        } else {
            return res.status(anwser[0]).json({
                message: anwser[1],
                error: err
            });
        }
    }

}