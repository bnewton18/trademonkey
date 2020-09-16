//
// //The class <Instrument> has the following subclasses:
// //-Equity
// //-FixedIncome
// //-MutualFund
// //-CashEquivalent
// //-Option
// //schemas for each are listed below:
//
// //Equity:
// [{
//   "assetType": {
//     "type": "string",
//     "enum": [
//       "EQUITY",
//       "OPTION",
//       "INDEX",
//       "MUTUAL_FUND",
//       "CASH_EQUIVALENT",
//       "FIXED_INCOME",
//       "CURRENCY"
//     ]
//   },
//   "cusip": {
//     "type": "string"
//   },
//   "symbol": {
//     "type": "string"
//   },
//   "description": {
//     "type": "string"
//   }
// }]
//
// //OR
//
// //FixedIncome:
// {
//   "assetType": {
//   "type": "string",
//     "enum": [
//     "EQUITY",
//     "OPTION",
//     "INDEX",
//     "MUTUAL_FUND",
//     "CASH_EQUIVALENT",
//     "FIXED_INCOME",
//     "CURRENCY"
//   ]
// },
//   "cusip": {
//   "type": "string"
// },
//   "symbol": {
//   "type": "string"
// },
//   "description": {
//   "type": "string"
// },
//   "maturityDate": {
//   "type": "string",
//     "format": "date-time"
// },
//   "variableRate": {
//   "type": "number",
//     "format": "double"
// },
//   "factor": {
//   "type": "number",
//     "format": "double"
// }
// }
//
// //OR
//
// //MutualFund:
// {
//   "assetType": {
//   "type": "string",
//     "enum": [
//     "EQUITY",
//     "OPTION",
//     "INDEX",
//     "MUTUAL_FUND",
//     "CASH_EQUIVALENT",
//     "FIXED_INCOME",
//     "CURRENCY"
//   ]
// },
//   "cusip": {
//   "type": "string"
// },
//   "symbol": {
//   "type": "string"
// },
//   "description": {
//   "type": "string"
// },
//   "type": {
//   "type": "string",
//     "enum": [
//     "NOT_APPLICABLE",
//     "OPEN_END_NON_TAXABLE",
//     "OPEN_END_TAXABLE",
//     "NO_LOAD_NON_TAXABLE",
//     "NO_LOAD_TAXABLE"
//   ]
// }
// }
//
// //OR
//
// //CashEquivalent:
// {
//   "assetType": {
//   "type": "string",
//     "enum": [
//     "EQUITY",
//     "OPTION",
//     "INDEX",
//     "MUTUAL_FUND",
//     "CASH_EQUIVALENT",
//     "FIXED_INCOME",
//     "CURRENCY"
//   ]
// },
//   "cusip": {
//   "type": "string"
// },
//   "symbol": {
//   "type": "string"
// },
//   "description": {
//   "type": "string"
// },
//   "type": {
//   "type": "string",
//     "enum": [
//     "SAVINGS",
//     "MONEY_MARKET_FUND"
//   ]
// }
// }
//
// //OR
//
// //Option:
// {
//   "assetType": {
//   "type": "string",
//     "enum": [
//     "EQUITY",
//     "OPTION",
//     "INDEX",
//     "MUTUAL_FUND",
//     "CASH_EQUIVALENT",
//     "FIXED_INCOME",
//     "CURRENCY"
//   ]
// },
//   "cusip": {
//   "type": "string"
// },
//   "symbol": {
//   "type": "string"
// },
//   "description": {
//   "type": "string"
// },
//   "type": {
//   "type": "string",
//     "enum": [
//     "VANILLA",
//     "BINARY",
//     "BARRIER"
//   ]
// },
//   "putCall": {
//   "type": "string",
//     "enum": [
//     "PUT",
//     "CALL"
//   ]
// },
//   "underlyingSymbol": {
//   "type": "string"
// },
//   "optionMultiplier": {
//   "type": "integer",
//     "format": "int32"
// },
//   "optionDeliverables": {
//   "type": "array",
//     "xml": {
//     "name": "optionDeliverable",
//       "wrapped": true
//   },
//   "items": {
//     "type": "object",
//       "properties": {
//       "symbol": {
//         "type": "string"
//       },
//       "deliverableUnits": {
//         "type": "number",
//           "format": "double"
//       },
//       "currencyType": {
//         "type": "string",
//           "enum": [
//           "USD",
//           "CAD",
//           "EUR",
//           "JPY"
//         ]
//       },
//       "assetType": {
//         "type": "string",
//           "enum": [
//           "EQUITY",
//           "OPTION",
//           "INDEX",
//           "MUTUAL_FUND",
//           "CASH_EQUIVALENT",
//           "FIXED_INCOME",
//           "CURRENCY"
//         ]
//       }
//     }
//   }
// }
// }
//
// //The class <OrderActivity> has the following subclasses:
// //-Execution
// //schemas for each are listed below:
//
// //Execution:
// {
//   "activityType": {
//   "type": "string",
//     "enum": [
//     "EXECUTION",
//     "ORDER_ACTION"
//   ]
// },
//   "executionType": {
//   "type": "string",
//     "enum": [
//     "FILL"
//   ]
// },
//   "quantity": {
//   "type": "number",
//     "format": "double"
// },
//   "orderRemainingQuantity": {
//   "type": "number",
//     "format": "double"
// },
//   "executionLegs": {
//   "type": "array",
//     "xml": {
//     "name": "executionLeg",
//       "wrapped": true
//   },
//   "items": {
//     "type": "object",
//       "properties": {
//       "legId": {
//         "type": "integer",
//           "format": "int32"
//       },
//       "quantity": {
//         "type": "number",
//           "format": "double"
//       },
//       "mismarkedQuantity": {
//         "type": "number",
//           "format": "double"
//       },
//       "price": {
//         "type": "number",
//           "format": "double"
//       },
//       "time": {
//         "type": "string",
//           "format": "date-time"
//       }
//     }
//   }
// }
// }
