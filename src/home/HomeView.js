import {View, StyleSheet} from 'react-native'
import {Button} from 'react-native-paper'
import {Header} from './header'
import {Menu} from './Menu'

export function HomeView({navigation, route}){
  return(
    <View style={styles.viewMain}>
      <Header />
      <View style={styles.buttons}>
        <Menu 
          title='Seus Bilhetes' 
          color='#0097ff' 
          onPress={() => navigation.navigate('bilhetes')} 
        />
  
      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  viewMain: {
    flex: 1
  },
  buttons: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 20,
   

  }
})