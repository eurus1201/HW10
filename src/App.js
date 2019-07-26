import React, { Component } from 'react';
import "./App.css";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      firstName: '',
      lastName: '',
      sex: false,
      toDoList: [],
      doneList: []
    }
  }

  submitHandler = (event) => {
    event.preventDefault();
    const { toDoList, userName, firstName, lastName, sex } = this.state; // const toDoList = this.state.toDoList;
    this.setState({
      toDoList: [
        ...toDoList,
        {
          text: userName,
          textf: firstName,
          textl: lastName,
          texts: sex,
          id: new Date().getTime()
        }
      ],
      userName: '',
      firstName: '',
      lastName: '',
      sex: false
    })
  }

  changeHandler = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: name == 'sex' ? event.target.checked : value });
  }

  // deleteHandler = (id) =>{
  //   return ()=>{

  //   }
  // }

  deleteHandler = id => () => {
    const { toDoList } = this.state;
    const idx = toDoList.findIndex(userName => userName.id === id);
    toDoList.splice(idx, 1);
    this.setState({ toDoList });
  }

  checkBoxChange = (event) => {
    const { checked } = event.target;
    if (checked) {
      const check = checked;
      const id = event.target.getAttribute('data-id');
      const { toDoList, doneList } = this.state; // const toDoList = this.state.toDoList;
      const idx = toDoList.findIndex(userName => userName.id == id);
      const done = toDoList.splice(idx, 1);
      this.setState({
        toDoList,
        doneList: [...doneList, ...done]
      })
    } else {
      const id = event.target.getAttribute('data-id');
      const { toDoList, doneList } = this.state; // const toDoList = this.state.toDoList;
      const idx = doneList.findIndex(userName => userName.id == id);
      const done = doneList.splice(idx, 1);
      this.setState({
        doneList,
        toDoList: [...toDoList, ...done]
      })
    }
  }

  render() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', margin: 'auto', padding:'1rem' }}>
        <div className="labelHeader">
          <div className=" center">User Name</div>
          <div className=" center">First Name </div>
          <div className=" center">Last Name </div>
          <div className=" centers">Sex</div>
          <div className=" centers">Action</div>
        </div> 
        <form style={{ display: 'flex', width: '100%' }} onSubmit={this.submitHandler}>

          <input onChange={this.changeHandler} value={this.state.userName} type="text" name="userName" placeholder="userName" className="input" />
          <input onChange={this.changeHandler} value={this.state.firstName} type="text" name="firstName" placeholder="firstName" className="input" />
          <input onChange={this.changeHandler} value={this.state.lastName} type="text" name="lastName" placeholder="lastName" className="input" />
          <input onChange={this.changeHandler} checked={this.state.sex} type="checkbox" name="sex" placeholder="sex" className="input" />
          <button type="submit">Add</button>
        </form>
        <div className="toDo-list rowspan">
          {this.state.toDoList.map(toDo => <div className="toDo-item" key={toDo.id}>
            <span>{toDo.text}</span>
            <span>{toDo.textf}</span>
            <span>{toDo.textl}</span>
            <span>
              {toDo.texts}
              <input type="checkbox" defaultChecked={toDo.texts} disabled />
            </span>
            <button onClick={this.deleteHandler(toDo.id)} >X</button>
          </div>)}
        </div>
        <div className="toDo-list">
          {this.state.doneList.map(toDo => <div className="toDo-item" key={toDo.id}>
            <input type="checkbox" data-id={toDo.id} onChange={this.checkBoxChange} checked />
            <span>{toDo.text}</span>
          </div>)}
        </div>
      </div>
    )
  }
}