const mongoose = require('mongoose');

const optionInstrument = mongoose.Schema({
  assetType: String,
  cusip: String,
  description: String,
  symbol: String,
  underlying: String,
  positionEffect: String,
  quanitity: Number
})

const tradeSchema = mongoose.Schema({
  orderId: {type: String, required: true},
  orderLegId: Number,
  instruction: String,
  price: Number,
  quantity: Number,
  instrument: optionInstrument
})

const orderSchema = mongoose.Schema({
  orderId: {type: String, required: true},
  orderType: String,
  orderStrategy: String,
  closeTime: Date,
  orderType: String,
  quantity: Number,
  price: Number,
  status: String,
  trades: {type: Array[tradeSchema]}
})

module.exports = mongoose.model('Order', orderSchema);
module.exports = mongoose.model('Trade', tradeSchema);
module.exports = mongoose.model('OptionInstrument', optionInstrument);

// const orderSchema = mongoose.Schema({[
// //OrderGet:
//     {
//       "session": {
//         "type": "string",
//         "enum": [
//           "NORMAL",
//           "AM",
//           "PM",
//           "SEAMLESS"
//         ]
//       },
//       "duration": {
//         "type": "string",
//         "enum": [
//           "DAY",
//           "GOOD_TILL_CANCEL",
//           "FILL_OR_KILL"
//         ]
//       },
//       "orderType": {
//         "type": "string",
//         "enum": [
//           "MARKET",
//           "LIMIT",
//           "STOP",
//           "STOP_LIMIT",
//           "TRAILING_STOP",
//           "MARKET_ON_CLOSE",
//           "EXERCISE",
//           "TRAILING_STOP_LIMIT",
//           "NET_DEBIT",
//           "NET_CREDIT",
//           "NET_ZERO"
//         ]
//       },
//       "cancelTime": {
//         "type": "object",
//         "properties": {
//           "date": {
//             "type": "string"
//           },
//           "shortFormat": {
//             "type": "boolean",
//             "default": false
//           }
//         }
//       },
//       "complexOrderStrategyType": {
//         "type": "string",
//         "enum": [
//           "NONE",
//           "COVERED",
//           "VERTICAL",
//           "BACK_RATIO",
//           "CALENDAR",
//           "DIAGONAL",
//           "STRADDLE",
//           "STRANGLE",
//           "COLLAR_SYNTHETIC",
//           "BUTTERFLY",
//           "CONDOR",
//           "IRON_CONDOR",
//           "VERTICAL_ROLL",
//           "COLLAR_WITH_STOCK",
//           "DOUBLE_DIAGONAL",
//           "UNBALANCED_BUTTERFLY",
//           "UNBALANCED_CONDOR",
//           "UNBALANCED_IRON_CONDOR",
//           "UNBALANCED_VERTICAL_ROLL",
//           "CUSTOM"
//         ]
//       },
//       "quantity": {
//         "type": "number",
//         "format": "double"
//       },
//       "filledQuantity": {
//         "type": "number",
//         "format": "double"
//       },
//       "remainingQuantity": {
//         "type": "number",
//         "format": "double"
//       },
//       "requestedDestination": {
//         "type": "string",
//         "enum": [
//           "INET",
//           "ECN_ARCA",
//           "CBOE",
//           "AMEX",
//           "PHLX",
//           "ISE",
//           "BOX",
//           "NYSE",
//           "NASDAQ",
//           "BATS",
//           "C2",
//           "AUTO"
//         ]
//       },
//       "destinationLinkName": {
//         "type": "string"
//       },
//       "releaseTime": {
//         "type": "string",
//         "format": "date-time"
//       },
//       "stopPrice": {
//         "type": "number",
//         "format": "double"
//       },
//       "stopPriceLinkBasis": {
//         "type": "string",
//         "enum": [
//           "MANUAL",
//           "BASE",
//           "TRIGGER",
//           "LAST",
//           "BID",
//           "ASK",
//           "ASK_BID",
//           "MARK",
//           "AVERAGE"
//         ]
//       },
//       "stopPriceLinkType": {
//         "type": "string",
//         "enum": [
//           "VALUE",
//           "PERCENT",
//           "TICK"
//         ]
//       },
//       "stopPriceOffset": {
//         "type": "number",
//         "format": "double"
//       },
//       "stopType": {
//         "type": "string",
//         "enum": [
//           "STANDARD",
//           "BID",
//           "ASK",
//           "LAST",
//           "MARK"
//         ]
//       },
//       "priceLinkBasis": {
//         "type": "string",
//         "enum": [
//           "MANUAL",
//           "BASE",
//           "TRIGGER",
//           "LAST",
//           "BID",
//           "ASK",
//           "ASK_BID",
//           "MARK",
//           "AVERAGE"
//         ]
//       },
//       "priceLinkType": {
//         "type": "string",
//         "enum": [
//           "VALUE",
//           "PERCENT",
//           "TICK"
//         ]
//       },
//       "price": {
//         "type": "number",
//         "format": "double"
//       },
//       "taxLotMethod": {
//         "type": "string",
//         "enum": [
//           "FIFO",
//           "LIFO",
//           "HIGH_COST",
//           "LOW_COST",
//           "AVERAGE_COST",
//           "SPECIFIC_LOT"
//         ]
//       },
//       "orderLegCollection": {
//         "type": "array",
//         "xml": {
//           "name": "orderLeg",
//           "wrapped": true
//         },
//         "items": {
//           "type": "object",
//           "properties": {
//             "orderLegType": {
//               "type": "string",
//               "enum": [
//                 "EQUITY",
//                 "OPTION",
//                 "INDEX",
//                 "MUTUAL_FUND",
//                 "CASH_EQUIVALENT",
//                 "FIXED_INCOME",
//                 "CURRENCY"
//               ]
//             },
//             "legId": {
//               "type": "integer",
//               "format": "int64"
//             },
//             "instrument": {
//               "type": "object",
//               "discriminator": "assetType",
//               "properties": {
//                 "assetType": {
//                   "type": "string",
//                   "enum": [
//                     "EQUITY",
//                     "OPTION",
//                     "INDEX",
//                     "MUTUAL_FUND",
//                     "CASH_EQUIVALENT",
//                     "FIXED_INCOME",
//                     "CURRENCY"
//                   ]
//                 },
//                 "cusip": {
//                   "type": "string"
//                 },
//                 "symbol": {
//                   "type": "string"
//                 },
//                 "description": {
//                   "type": "string"
//                 }
//               }
//             },
//             "instruction": {
//               "type": "string",
//               "enum": [
//                 "BUY",
//                 "SELL",
//                 "BUY_TO_COVER",
//                 "SELL_SHORT",
//                 "BUY_TO_OPEN",
//                 "BUY_TO_CLOSE",
//                 "SELL_TO_OPEN",
//                 "SELL_TO_CLOSE",
//                 "EXCHANGE"
//               ]
//             },
//             "positionEffect": {
//               "type": "string",
//               "enum": [
//                 "OPENING",
//                 "CLOSING",
//                 "AUTOMATIC"
//               ]
//             },
//             "quantity": {
//               "type": "number",
//               "format": "double"
//             },
//             "quantityType": {
//               "type": "string",
//               "enum": [
//                 "ALL_SHARES",
//                 "DOLLARS",
//                 "SHARES"
//               ]
//             }
//           }
//         }
//       },
//       "activationPrice": {
//         "type": "number",
//         "format": "double"
//       },
//       "specialInstruction": {
//         "type": "string",
//         "enum": [
//           "ALL_OR_NONE",
//           "DO_NOT_REDUCE",
//           "ALL_OR_NONE_DO_NOT_REDUCE"
//         ]
//       },
//       "orderStrategyType": {
//         "type": "string",
//         "enum": [
//           "SINGLE",
//           "OCO",
//           "TRIGGER"
//         ]
//       },
//       "orderId": {
//         "type": "integer",
//         "format": "int64"
//       },
//       "cancelable": {
//         "type": "boolean",
//         "default": false
//       },
//       "editable": {
//         "type": "boolean",
//         "default": false
//       },
//       "status": {
//         "type": "string",
//         "enum": [
//           "AWAITING_PARENT_ORDER",
//           "AWAITING_CONDITION",
//           "AWAITING_MANUAL_REVIEW",
//           "ACCEPTED",
//           "AWAITING_UR_OUT",
//           "PENDING_ACTIVATION",
//           "QUEUED",
//           "WORKING",
//           "REJECTED",
//           "PENDING_CANCEL",
//           "CANCELED",
//           "PENDING_REPLACE",
//           "REPLACED",
//           "FILLED",
//           "EXPIRED"
//         ]
//       },
//       "enteredTime": {
//         "type": "string",
//         "format": "date-time"
//       },
//       "closeTime": {
//         "type": "string",
//         "format": "date-time"
//       },
//       "tag": {
//         "type": "string"
//       },
//       "accountId": {
//         "type": "integer",
//         "format": "int64"
//       },
//       "orderActivityCollection": {
//         "type": "array",
//         "xml": {
//           "name": "orderActivity",
//           "wrapped": true
//         },
//         "items": {
//           "type": "object",
//           "discriminator": "activityType",
//           "properties": {
//             "activityType": {
//               "type": "string",
//               "enum": [
//                 "EXECUTION",
//                 "ORDER_ACTION"
//               ]
//             }
//           }
//         }
//       },
//       "replacingOrderCollection": {
//         "type": "array",
//         "xml": {
//           "name": "replacingOrder",
//           "wrapped": true
//         }
//       },
//       "childOrderStrategies": {
//         "type": "array",
//         "xml": {
//           "name": "childOrder",
//           "wrapped": true
//         }
//       },
//       "statusDescription": {
//         "type": "string"
//       }
//     ]}
// );
