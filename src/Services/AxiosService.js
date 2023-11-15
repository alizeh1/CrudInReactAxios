import axios from 'axios';

// const Axios=require('axios').default;                                                  //implement axios service layer for get pot put api call
const Axios = require('axios');

export default class AxiosService{
  post(url,data,Header){
    return axios.post(url,data,Header);    //predefine structure parameter
  }

  get(Url,IsRequired=false,Header){
    return axios.get(Url,IsRequired&&Header);
  }

  put(Url,data,IsRequired=false,Header){
    return axios.put(Url,data,IsRequired&&Header)
  }

  delete(url,data,IsRequired=false,Header){
    return axios.delete(url,data,IsRequired&&Header)
  }
}
