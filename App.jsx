import { View, Text, Button, TextInput, StyleSheet, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'

const App = () => {
    const [data,setData]=useState([])
    const [showModal,setShowModal]=useState(false)
    const [selectedUser,setselectedUser]=useState(undefined)
    const getAPIData = async ()=>{
      const url = "http://192.168.1.18:3000/user";
      let result = await fetch(url);
      result = await result.json();
      // console.warn(result);
      if (result) {
        setData(result)
      }
    }

    const deleteUser = async(id)=>{
      const url = "http://192.168.1.14:3000/user";
      console.warn(`${url}/${id}`);
      
      let result = await fetch(`${url}/${id}`,{
        method:"delete"
      });
      result = await result.json();
      if (result) {
        console.warn("User Deleted");
        getAPIData();
                
      }
   }

    useEffect(()=>{getAPIData();},[])

    const updateUser=(data)=>{
      setShowModal(true)
      setselectedUser(data)
    }




  return (
    <View style={styles.container}>

      <View style={styles.DataContainer}>
        <View style={{flex:0.6}}><Text>Name</Text></View>
        <View style={{flex:1}}><Text>Age</Text></View>
        <View style={{flex:1}}><Text>Operations</Text></View>
      </View>
          
      {
        data.length?
        data.map((item)=>
        <View style={styles.DataContainer}>
          <View style={{flex:1}}><Text>{item.name}</Text></View>
          <View style={{flex:1}}><Text>{item.age}</Text></View>
          {/* <View style={{flex:1}}><Text>{item.email}</Text></View> */}
          <View style={{flex:1}}><Button onPress={()=>deleteUser(item.id)} title='Delete' /></View>
          <View style={{flex:1}}><Button onPress={()=>updateUser(item)} title='Update' /></View>

        </View>
        )
        :null

      }
      <Modal visible={showModal} transparent={true}>
        <UserModal setShowModal={setShowModal} selectedUser={selectedUser} />        
      </Modal>
      
    </View>
  )
}

const UserModal =(props)=>{
  // console.warn(props.selectedUser);
  return(
    
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text>{props.selectedUser.name}</Text>
        <Text>{props.selectedUser.email}</Text>
        <Button title='close' onPress={()=>props.setShowModal(false)}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  DataContainer:{
    flexDirection:'row',
    alignItems : 'flex-start',
    justifyContent : 'flex-start',
    backgroundColor:'gray',
    margin:5,
    padding : 8
  },
  centeredView:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  modalView:{
    backgroundColor:"#fff",
    padding:40,
    borderRadius:10,
    shadowColor:"#000",
    shadowOpacity:0.60,
    elevation:5
  }
})

export default App