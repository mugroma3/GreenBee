
module.exports = {

    generate: function (req, res, anwser) {
        switch (anwser[0]){
            case 200: res.status(anwser[0]).json(anwser[1]);
            case 201: res.status(anwser[0]).json(anwser[1]);
            case 404: res.status(anwser[0]).json({message:anwser[1]});
            case 500: res.status(anwser[0]).json({message: anwser[1], error: anwser[2]});
        }
    }

};