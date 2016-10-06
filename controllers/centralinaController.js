var centralinaModel = require('../models/centralinaModel.js');
var sensoreModel = require('../models/sensoreModel.js');


/**
 * centralinaController.js
 *
 * @description :: Server-side logic for managing centralinas.
 */
module.exports = {

    /**
     * centralinaController.create()
     */
    create: function (centralina, callback) {
        var centralina = new centralinaModel(centralina);
        centralina.save(function (err, centralina) {
            if (err) {
                callback([500, "Error when creating centralina", err]);
            }
            else{
                callback([201, centralina]);
            }
        });
    },

    /**
     * centralinaController.list()
     */
    list: function (centralinaData, callback) {
        centralinaModel.find(function (err, centralinas) {
            if (err) {
                callback([500, "Error when getting letture.", err]);
                }
                else{
                callback([200, centralinas]);
            }
        });
    },


    /**
     * utenteController.show()
     */
    show: function (centralinaData, callback) {
        centralinaModel.findOne({_id: centralinaData.id}, function (err, centralina) {
                if (err) {
                    callback([500, "Error when getting lettura.", err]);
                }
                else{
                    if (!centralina) {
                        callback([404, 'No such lettura']);
                    }
                    else{
                        callback([200, centralina]);
                    }
                }

            });
    },

    /**
     * centralinaController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        centralinaModel.findOne({_id: id}, function (err, centralina) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting centralina',
                    error: err
                });
            }
            if (!centralina) {
                return res.status(404).json({
                    message: 'No such centralina'
                });
            }

            centralina.ph = req.body.ph ? req.body.ph : centralina.ph;
			centralina.irraggiamentoSolare = req.body.irraggiamentoSolare ? req.body.irraggiamentoSolare : centralina.irraggiamentoSolare;
			centralina.batteria = req.body.batteria ? req.body.batteria : centralina.batteria;
			centralina.temperatura = req.body.temperatura ? req.body.temperatura : centralina.temperatura;
			centralina.data = req.body.data ? req.body.data : centralina.data;
			
            centralina.save(function (err, centralina) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating centralina.',
                        error: err
                    });
                }

                return res.json(centralina);
            });
        });
    },

    /**
     * centralinaController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        centralinaModel.findByIdAndRemove(id, function (err, centralina) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the centralina.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
