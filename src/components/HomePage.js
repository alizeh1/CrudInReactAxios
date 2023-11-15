import React, { Component } from 'react'
import { TextField, Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// import Button from '@mui/material/Button';
// import {Button} from '@mui/material';
import "./HomePage.css"
import CrudServices from "../Services/CrudServices"
import { ReplayCircleFilled } from '@mui/icons-material';


const service = new CrudServices();


export default class HomePage extends Component {

  //for store value in list on frontend
  constructor() {
    super();
    this.state = {
      UserId: '',
      UserName: '',
      Age: '',
      DataRecord: [],
      UpdateFlag: false
    }
  }

  componentWillMount() {
    console.log("component will mount calling");
    this.ReadRecord();
  }

  //create funtion for read record
  ReadRecord() {
    service.ReadRecord().then((data) => {
      console.log(data)
      //console.log(data.data.readRecordData)
      this.setState({ DataRecord: data.data.readRecordData })
    }).catch((error) => {
      console.log(error)
    })

  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => { console.log(this.state) })
  }

  handleClick = () => {
    if (this.state.UserName === '' || this.state.Age === '') {
      console.log("Input Field Is Empty");
      return;
    }
    console.log("data:", this.state);

    if (this.state.UpdateFlag === false) {

      const data = {
        username: this.state.UserName,
        age: Number(this.state.Age),
      }
      service.CreateRecord(data).then((data) => {
        console.log(data)
        this.ReadRecord();
      }).catch((error) => {
        console.log(error)
      })
    } else {
      const data = {
        id: Number(this.state.UserId),
        username: this.state.UserName,
        age: Number(this.state.Age),
      }
      service.UpdateRecord(data).then((data) => {
        console.log(data)
        this.ReadRecord()
      }).catch((error) => {
        console.log(error)
      })

    }
    this.setState({ UpdateFlag: false, UserName: '', Age: '' })
  }

  handleEdit = (data) => {
    this.setState({ UserName: data.username, Age: data.age, UserId: data.id, UpdateFlag: true })
  }

  handleDelete = (data) => {
    // const datas = {
    //   id: Number(data.UserId)
    // }
    service.DeleteRecord(data).then((data) => {
      console.log(data)
      this.ReadRecord()
    }).catch((error) => {
      console.log(error)
    })
  }


  render() {
    let Valuee = this.state;
    let self = this;
    return (
      <div className='MainContainer'>
        <div className='SubContainer'>
          <div className='Box1'>
            <div className='Input-Container'>
              <div className='Flex-Container'>
                <TextField fullWidth label="User Name" name='UserName' size='small' placeholder='Enter User name' variant="outlined"
                  value={Valuee.UserName} onChange={this.handleChange} />
              </div>
              <div className='Flex-Container'>
                <TextField fullWidth label="Age" name='Age' size='small' placeholder='Enter Age' variant="outlined"
                  value={Valuee.Age} onChange={this.handleChange} />
              </div>
              <div className='Flex-Button'>
                <Button variant="contained" color="secondary" onClick={this.handleClick}>
                  Submit
                </Button>
              </div>
            </div>
          </div>
          <div className='Box2'>
            {
              Array.isArray(this.state.DataRecord) && this.state.DataRecord.length > 0 ?
                this.state.DataRecord.map(function (data, index) {
                  return (
                    <div key={index} className='data-Flex'>
                      <div className='UserId'>{data.id}</div>
                      <div className='Username'>{data.username}</div>
                      <div className='Age'>{data.age}</div>
                      <div className='Update'>
                        <Button variant="outlined" color="primary" onClick={() => self.handleEdit(data)}>
                          <EditIcon />
                        </Button>
                      </div>
                      <div className='Delete'>
                        <Button variant="outlined" onClick={() => self.handleDelete(data)}>
                          <DeleteIcon />
                        </Button>
                      </div>
                    </div>

                  )
                }) :
                <div></div>
            }
          </div>
        </div>
      </div>
    )
  }
}








