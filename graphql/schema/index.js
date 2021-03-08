const {gql} = require('apollo-server');

const typeDefs = gql`
  type CookieData{
    domain: String
    domainTitle: String
    updatedDate: String
    updatedAt: String
    url: String
    cookie: [Cookie]
  }
  type Cookie {
    id: Int
    name: String
    conn: String
    connTLD: String
    publisher: String
    value: String
    type: String
  }
  type PublisherData {
    updatedMonth: String
    updatedAt: String
    publisher: String
    detail: [Detail]
  }
  type Detail {
    id: Int
    domain: String
    count: Int
  }

  type Data {
    _id: ID
    cookieData: [CookieData]
    publisherData: [PublisherData]
  }
  type Query {
    getData: [Data]
    getCookieData(domain:String, updatedDate: String): [CookieData]
    getPubData(publisher: String, updatedMonth: String): [PublisherData]
  }
`;
module.exports = typeDefs;