import {Image, View, Text, StyleSheet} from 'react-native'
import Constants from 'expo-constants'
import Imagem from '../../assets/sympla-logo-0.png'
import Ping from '../../assets/locato.png'
import List from '../../assets/suspense.png'

export function Header(){
  return(
    <View style={styles.main}>
      <Image style={styles.img} source={Imagem} />
      <View style={styles.list} >
        <Image style={styles.icon} source={Ping} />
        <Text style={styles.text} >Qualquer lugar</Text>
        <Text style={styles.text} > V</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f1f1f1',
    marginTop: Constants.statusBarHeight,
    paddingHorizontal: 10, 
    alignItems: 'center', 
  },
 
  img: {
    width: 100,
    height: 100,
  },
  icon:{
    width: 25,
    height: 25,
    color:'#0097ff'
  },
  list:{
    flexDirection: 'row', // Ensures the icon and text are in a row
    alignItems: 'center',
    color:'#0097ff'
  },
  text:{
    color:'#0097ff'
  }
})