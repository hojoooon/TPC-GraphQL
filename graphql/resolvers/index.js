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
    }else if(data[0].cookieData[i].domain === domain && updatedDate === undefined){
      target.push(data[0].cookieData[i])
      target.sort((a, b) => {
        if(parseInt(a.updatedDate) > parseInt(b.updatedDate)){
          return -1;
        }
        if(parseInt(a.updatedDate) < parseInt(b.updatedDate)){
          return 1;
        }
        return 0;
      });
    }
  }
  return target.slice(0)
}

async function getPubData(publisher, updatedMonth){
  let data = await datas
  let target = []
  console.log(data[0].publisherData.length)
  for(let i=0; i < data[0].publisherData.length; i++){
    if(data[0].publisherData[i].publisher === publisher && data[0].publisherData[i].updatedMonth === updatedMonth){
      target.push(data[0].publisherData[i])
    }else if(data[0].publisherData[i].publisher === publisher && updatedMonth === undefined){
      target.push(data[0].publisherData[i])
      target.sort((a, b) => {
        if(parseInt(a.updatedMonth) > parseInt(b.updatedMonth)){
          return -1;
        }
        if(parseInt(a.updatedMonth) < parseInt(b.updatedMonth)){
          return 1;
        }
        return 0;
      });
    }
  }
  return target.slice(0)
}


const resolvers = {
  Query: {
    getData: () => datas,
    getCookieData: (_, {domain, updatedDate}) => getCookieData(domain, updatedDate),
    getPubData: (_, {publisher, updatedMonth}) => getPubData(publisher, updatedMonth)
  }
};

module.exports = resolvers; 