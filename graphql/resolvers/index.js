// const Data = require('../../models/data');
const getData = require('../../models/index')
const datas = getData

const n = new Date();
const y = n.getFullYear();
const M = n.getMonth();
const d = n.getDate();
const h = n.getHours();
const m = n.getMinutes();
const s = n.getSeconds();

// const detailTime = `${y}-${M < 10 ? `0${M+1}` : M+1}-${d < 10 ? `0${d}` : d} ${h < 10 ? `0${h}` : h}:${m < 10 ? `0${m}` : m}:${s < 10 ? `0${s}` : s}`;
const YYYYMMDD = `${y}${M < 10 ? `0${M+1}` : M+1}${d < 10 ? `0${d}` : d}`;
// const YYYYMM = `${y}${M < 10 ? `0${M+1}` : M+1}`;

const detailTime =  '2021-04-01 11:01:16'
const YYYYMM = '202104';

async function getCookieData(domain, updatedDate){
  let data = await datas
  let target = []
  // console.log(data[0].cookieData)
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

async function getCookieDatas(domain){
  let data = await datas
  let target = []
  // console.log(data[0].cookieData)
  for(let i=0; i < data[0].cookieData.length; i++){
    if(data[0].cookieData[i].domain === domain){
      target.push(data[0].cookieData[i])
    }
  }
  return target
}

async function updateData(cookieData, pubData){
  let data = await datas
  data[0].cookieData.push(cookieData);
  console.log(cookieData)
  
  const publishers = []
  for(let i=0; i < cookieData.cookie.length; i++){
    publishers.push(cookieData.cookie[i].publisher)
  }
  console.log(publishers)

  for(let j=0; j < pubData.publisherData.length; j++){
    if(data[0].publisherData.find((item) => {
      return item.publisher === pubData.publisherData[j].publisher && item.updatedMonth === YYYYMM
    }) === undefined) {
      const k = Object.create({});
      const l = Object.create({});
      k.updatedMonth = YYYYMM;
      k.updatedAt = detailTime
      k.publisher = pubData.publisherData[j].publisher
      k.type = pubData.publisherData[j].type
      l.id = 1
      l.domain = cookieData.domain
      l.count = 0
      k.detail = Array.of(l)
      console.log(k)
      data[0].publisherData.push(k)
    }else {
      const idx = data[0].publisherData.findIndex((item, i) => {
        return item.publisher === pubData.publisherData[j].publisher && item.updatedMonth === YYYYMM
      })
      const o = Object.create({});
      o.id = data[0].publisherData[idx].detail.length + 1
      o.domain = cookieData.domain
      o.count = 0
      data[0].publisherData[idx].detail.push(o)
    }
  }

  for (let w = 0; w < publishers.length; w++) {
    const idx2 = data[0].publisherData.findIndex((item, i) => {
      return item.publisher === publishers[w] && item.updatedMonth === YYYYMM
    })
    const idx3 = data[0].publisherData[idx2].detail.findIndex((item, i) => {
      return item.domain === cookieData.domain
    })
    console.log(idx3);
    data[0].publisherData[idx2].detail[idx3].count++
  }
  console.log(pubData)
  return data[0]
}

const resolvers = {
  Query: {
    getData: () => datas,
    getCookieData: (_, {domain, updatedDate}) => getCookieData(domain, updatedDate),
    getPubData: (_, {publisher, updatedMonth}) => getPubData(publisher, updatedMonth),
    getCookieDatas: (_, {domain}) => getCookieDatas(domain)
  },
  Mutation:{
    updateData: (_, {inputCookieData, inputPublisherData}) => updateData(inputCookieData, inputPublisherData)
  }
};

module.exports = resolvers;