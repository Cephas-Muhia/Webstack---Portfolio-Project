const mongoose = require('mongoose');

const customizationSchema = new mongoose.Schema({
    cakeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cake', required: true },
    flavor: { type: String },
    sizeInKgs: { type: Number, required: true },
    decorations: [{ type: String }],
    icingType: {
        type: String,
        enum: ['Hard icing', 'Soft icing', 'Fresh cream'],
        required: true
    },
    shape: {
        type: String,
        enum: ['Square', 'Round', 'Stacked'],
        required: true
    },
    photo: { type: String }
});

const Customization = mongoose.model('Customization', customizationSchema);
module.exports = Customization;

