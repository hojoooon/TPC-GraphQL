// const Data = require('../../models/data');
const getData = require('../../models/index')
const datas = getData


async function getCookieData(domain, updatedDate){
  let data = await datas
  let target = []
  console.log(data[0].cookieData)
  for(let i=0; i < data[0].cookieData.length; i++){
    if(data[0].cookieData[i].domain === domain && data[0].cookieData[i].updatedDate === updatedDate){
      target.push(data[0].cookieData[i])
    }
  }
  return target
}

async function getPubData(publisher, updatedMonth){
  let data = await datas
  let target = []
  console.log(data[0].publisherData.length)
  for(let i=0; i < data[0].publisherData.length; i++){
    if(data[0].publisherData[i].publisher === publisher && data[0].publisherData[i].updatedMonth === updatedMonth){
      target.push(data[0].publisherData[i])
    }
  }
  return target
}


const resolvers = {
  Query: {
    getData: () => datas,
    getCookieData: (_, {domain, updatedDate}) => getCookieData(domain, updatedDate),
    getPubData: (_, {publisher, updatedMonth}) => getPubData(publisher, updatedMonth)
  }
};

module.exports = resolvers; 