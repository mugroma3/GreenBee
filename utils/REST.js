
module.exports = {

    generate: function (req, res, anwser) {
        console.log(anwser);
        switch (anwser[0]){
            case 201: return res.status(anwser[0]).json(anwser[1]);
            case 200: return res.json(anwser[1]);
            case 404: return res.status(anwser[0]).json({message:anwser[1]});
            case 500: return res.status(anwser[0]).json({message: anwser[1], error: anwser[2]});
        }

    }

}