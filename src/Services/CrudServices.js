import Configuration from "../Configuration/Configuration"
import Axios from "./AxiosService"

const axios=new Axios();
// const confi=new Configuration();  //create instance of a configuration class
export default class CrudServices{
  CreateRecord(data){
    console.log("data:",data,"url:",Configuration.CreateRecord);
    return axios.post(Configuration.CreateRecord,data,false);  //header means token we r not use token in project that y we write false
  }

  ReadRecord(){
    console.log("Url:",Configuration.GetRecord)
    return axios.get(Configuration.GetRecord,false)
  }

  UpdateRecord(data){
    console.log("Url:",Configuration.UpdateRecord)
    return axios.put(Configuration.UpdateRecord,data,false)
  }

  DeleteRecord(data){
    console.log("Url:",Configuration.DeleteRecord)
    return axios.delete(Configuration.DeleteRecord,
      {data:{id:data.id}},
      false
      )
  }

}
