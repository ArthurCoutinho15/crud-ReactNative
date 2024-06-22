import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

import { FontAwesome } from '@expo/vector-icons';

import Filha from '../../assets/filme.jpg';

export function Card({tipo='leito', numero, assento, dataChegada, dataPartida,valor, onDelete, onEdit}) {
  return (
    <View style={styles.view}>
      <Image style={styles.image} source={Filha} />
      <View style={styles.viewText}>
        <Text style={styles.text}>Tipo: {tipo}</Text>
        <Text style={styles.text}>Numero: {numero}</Text>
        <Text style={styles.text}>Assento: {assento}</Text>
        <Text style={styles.text}>Check-in: {dataChegada}</Text>
        <Text style={styles.text}>Check-out: {dataPartida}</Text>
        <Text style={styles.text}>Valor: {valor}</Text>

        
      </View>
      <TouchableOpacity onPress={onDelete}>
        <FontAwesome name="remove" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity onPress={onEdit}>
        <FontAwesome name="edit" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    columnGap: 10,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 60,
    borderRadius: 8,
  },
  viewText: {
    flex: 1
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 12,
    fontWeight: 'bold' 
  },
});
