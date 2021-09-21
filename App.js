import React, {useState, useEffect} from 'react';
import { Text, View, FlatList, StyleSheet, Modal, Image, Pressable, SafeAreaView, ActivityIndicator } from 'react-native';
 //renderizar um item(objeto) do arquivo json

const receitaURL = "https://api.npoint.io/93ae09b9286316a9c1a2";



const CasaDoBaralho = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getReceitas = async () => {
    fetch(receitaURL)
    .then((response) => response.json())
    .then((json) => setData(json.receitas))
    .catch((error)=> alert(error))
    .finally(setLoading(false));
  }

  useEffect (()=>{
    getReceitas();
  },[])

    return (
      <SafeAreaView style={styles.fundo}>
      <Text  style={styles.title}>♦Receitas da Casa♣{'\n'}              Do{'\n'}        ♠Baralho♣</Text>
      {isLoading ? <ActivityIndicator/> : <FlatList
      data={data}
      keyExtractor={item => item}
      renderItem={renderItem}
      />} 
      </SafeAreaView>       
    );
  
}
  const renderItem = ({item}) => {
    return(
      <View>
      <Text style={styles.item}> {item.receita} </Text>
      <RenderModal
      ingredientes = {item.ingredientes}
      foto = {item.foto}
      />  
      </View>
 
    );
  }

  const RenderModal = ({ingredientes, foto}) => {
    const [visivel, setVisivel] = useState(false)    

    return(
      <View>
      <Pressable onPress={()=>{setVisivel(true)}}>
      <Image
      style={styles.tinyLogo}
      source={{uri:foto}}
      />
      </Pressable>
      <Modal
       onbackdoorpress={()=>setVisivel(false)}
       visible={visivel}
       animationType='slide'
       transparent={true}
       >
      <View style={styles.modalStyle}>
      <Text onPress={()=>{setVisivel(false)}}>{ingredientes}</Text>
      </View>
      </Modal>
      </View>

    )
  }


const styles = StyleSheet.create({
  fundo: {
    backgroundColor: 'lightblue',
    flex: 1,
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    marginTop: 35,
    marginBottom: 35,
    color: 'white',
  },
  item:{
    alignSelf: 'center',
    backgroundColor: 'white',
    borderColor: 'pink',
    borderWidth: 5,
    fontFamily: 'Arial',
    fontSize: 25,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

  },
    tinyLogo: {
    width: 100,
    height: 100,
    alignSelf: 'center'
  },
  modalStyle:{
    marginTop: '70%',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
        shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  }

  

})

export default CasaDoBaralho;
