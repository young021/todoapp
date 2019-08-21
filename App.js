import React from 'react';
import { StyleSheet, Text, View,FlatList,AsyncStorage,DatePickerAndroid} from 'react-native';
import Header from './app/components/Header';
import Subtitle from './app/components/Subtitle';
import Input from './app/components/Input';
import Listitem from './app/components/Listitem';
// import { Font } from 'expo';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      inputValue:'',
      todos:[]
    }
  }
  // async componentDidMount() {
  //   await Font.loadAsync({
  //     'UhBee mysen': require('./assets/fonts/UbBee-mysen.ttf'),
  //   });
  // }
  componentWillMount(){
    this._getData()
    // this._mydatepicker()
  }


  _addtimer = async() =>{
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        mode:'spinner',
        date: new Date(),
        
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        console.log(year,month+1,day)
        this._addTodoItem(year,month+1,day)
      }
    } catch ({ code, message }) {
      console.warn('Cannot open date picker', message);
    }

  }
  _storeData= async ()=>{
    try {
      await AsyncStorage.setItem('@todo:state',JSON.stringify(this.state));
    }catch(e){

    }
  } 


  _getData = async() =>{

    try{
      const mystate = await AsyncStorage.getItem('@todo:state');
      if (mystate !== null) {
        this.setState(JSON.parse(mystate));

      }
    }catch(e){

    }
  
  };
  _makeTodoItem =({item,index})=>{
    return (
      <Listitem 
      name = {item.title} 
      isComplete ={item.iscomplete}
      changeComplete={()=>{
        const newTodo = [...this.state.todos]
        newTodo[index].iscomplete = !newTodo[index].iscomplete
          this.setState({ todos: newTodo },this._storeData)
        }}
      deleteItem={() => {
        const newTodo = [...this.state.todos]
        newTodo.splice(index,1)
        this.setState({ todos: newTodo }, this._storeData)
      }}/>
    );
    }

  _changeText=(value)=>{
    this.setState({inputValue:value});
  }
  _addTodoItem=(year,month,day) =>{
    if(this.state.inputValue !== ""){
      const prevTodo = this.state.todos

      const newTodo = {title : this.state.inputValue, iscomplete: false, deadline: year,month,day}

      this.setState({
        inputValue:'',
        todos : prevTodo.concat(newTodo)
      }, this._storeData)
    }
  }
  render(){
  return (
    
    <View style={styles.container}>
      <View style={styles.headercenter}>
        <Header /> 
      </View>
      <View style={styles.subtitleposition}>
        <Subtitle title="해야 할 일"/>

        <Input
          value ={this.state.inputValue}
          changeText = {this._changeText}
          addTodoItem = {this._addTodoItem}
          addtimer = {this._addtimer}/>

      </View>
      <View style={styles.subtitleposition}>
        <Subtitle title="해야 할 일 목록" />

        <FlatList
          data ={this.state.todos}
          renderItem ={this._makeTodoItem}
          keyExtractor ={(item,index)=>{ return `$(index)`}}/>

      </View>

    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headercenter: {
    alignItems:"center",
  },
  subtitleposition:{
    marginLeft:30,
  },
});
