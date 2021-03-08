const mongoose = require('mongoose');
const { Schema } = mongoose;

const CookieSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  conn: {
    type: String,
    required: true
  },
  connTLD: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: false
  },
  value: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: false
  },
  id: {
    type: Number,
    required: true
  }
})

const CookieDataSchema = new Schema({
  domain: {
    type: String,
    required: true
  },
  domainTitle: {
    type: String,
    required: true
  },
  updatedDate: {
    type: String,
    required: true
  },
  updatedAt: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  cookie: {
    type: [CookieSchema]
  }
})

const DetailSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  domain: {
    type: Number,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
})

const PublisherDataSchema = new Schema({
  updatedMonth: {
    type: String,
    required: true
  },
  updatedAt: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  detail: [DetailSchema]
});

const DataSchema = new Schema({
  cookieData: [CookieDataSchema],
  publisherData: [PublisherDataSchema]
})

// const CookieData = mongoose.model('CookieData', CookieDataSchema)
// const PublisherData = mongoose.model('PublisherData', PublisherDataSchema)
// const Data = mongoose.model('Data', DataSchema)
// const Cookie = mongoose.model('Cookie', CookieSchema)
// const Detail = mongoose.model('Detail', DetailSchema)

// module.exports = {
//   CookieData,
//   PublisherData,
//   Data,
//   Cookie,
//   Detail
// }

module.exports = mongoose.model('Data', DataSchema)

// const mongoose = require('mongoose');
// const { Schema } = mongoose;
// const dataSchema = new Schema({
//   cookieData: [{
//     domain: {
//       type: String,
//       required: true
//     },
//     domainTitle: {
//       type: String,
//       required: true
//     },
//     updatedDate: {
//       type: String,
//       required: true
//     },
//     updatedAt: {
//       type: String,
//       required: true
//     },
//     url: {
//       type: String,
//       required: true
//     },
//     cookie: [{
//       name: {
//         type: String,
//         required: true
//       },
//       conn: {
//         type: String,
//         required: true
//       },
//       connTLD: {
//         type: String,
//         required: true
//       },
//       publisher: {
//         type: String,
//         required: false
//       },
//       value: {
//         type: String,
//         required: false
//       },
//       type: {
//         type: String,
//         required: false
//       },
//       id: {
//         type: Number,
//         required: true
//       }
//     }]
//   }],
//   publisherData: [{
//     updatedMonth: {
//       type: String,
//       required: true
//     },
//     updatedAt: {
//       type: String,
//       required: true
//     },
//     publisher: {
//       type: String,
//       required: true
//     },
//     detail: [{
//       id: {
//         type: Number,
//         required: true
//       },
//       domain: {
//         type: Number,
//         required: true
//       },
//       count: {
//         type: Number,
//         required: true
//       }
//     }]
//   }]
// });

// module.exports = mongoose.model('Data', dataSchema);