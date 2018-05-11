const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  accountBenefactor: {type: Schema.Types.ObjectId, ref:'account', required: true},
  accountBeneficiary: {type: Schema.Types.ObjectId, ref:'account', required: true},
  quantity: {type: Number, required: true}
});

module.exports = mongoose.model('transaction', transactionSchema);
