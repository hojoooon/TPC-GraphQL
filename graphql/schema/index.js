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
    type: String
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

  input CookieDataInput {
    domain: String
    domainTitle: String
    updatedDate: String
    updatedAt: String
    url: String
    cookie: [CookieInput]
  }
  input CookieInput {
    id: Int
    name: String
    conn: String
    connTLD: String
    publisher: String
    value: String
    type: String
  }
  input PublisherInput{
    id: Int
    name: String
    connTLD: String
    publisher: String
    type: String
  }
  input PublisherDataInput {
    publisherData: [PublisherInput]
  }
  type Mutation {
    updateData(inputCookieData: CookieDataInput, inputPublisherData: PublisherDataInput): Data
  }
  type Query {
    getData: [Data]
    getCookieData(domain:String, updatedDate: String): [CookieData]
    getPubData(publisher: String, updatedMonth: String): [PublisherData]
    getCookieDatas(domain:String): [CookieData]
  }
`;
module.exports = typeDefs;