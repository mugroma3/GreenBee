//kudos to @Kidel

module.exports = {

    generate: function (req, res, answer) {
        switch (answer[0]){
            case 200: res.status(answer[0]).json(answer[1]); break;
            case 201: res.status(answer[0]).json(answer[1]); break;
            case 204: res.status(answer[0]).json(); break;
            case 404: res.status(answer[0]).json({message:answer[1]}); break;
            case 500: res.status(answer[0]).json({message: answer[1], error: answer[2]}); break;
            case 506: res.status(answer[0]).json(answer[1]); break;
            default: res.status(answer[0]).json({message: answer[1], error: answer[2]});
        }
    }

};