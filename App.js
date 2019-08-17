import React from 'react';
import { StyleSheet, Text, View,FlatList,AsyncStorage} from 'react-native';
import Header from './app/components/Header';
import Subtitle from './app/components/Subtitle';
import Input from './app/components/Input';
import Listitem from './app/components/Listitem';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      inputValue:'',
      todos:[]
    }
  }
  componentWillMount(){
    this._getData()
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
  _addTodoItem=() =>{
    if(this.state.inputValue !== ""){
      const prevTodo = this.state.todos

      const newTodo = {title : this.state.inputValue, iscomplete: false}

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
          addTodoItem = {this._addTodoItem}/>

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
