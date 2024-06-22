import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { View, StyleSheet, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { Card } from './card';
import { PaperProvider, Button, Portal, Dialog, TextInput } from 'react-native-paper';
import { findAll, remove, insert, update } from './BilhetesAPI';

export function BilhetesView() {
  const [bilhetes, setBilhetes] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBilheteId, setCurrentBilheteId] = useState(null);

  const [numero, setNumero] = useState('');
  const [assento, setAssento] = useState('');
  const [dataChegada, setDataChegada] = useState('');
  const [dataPartida, setDataPartida] = useState('');
  const [tipo, setTipo] = useState('');
  const [valor, setValor] = useState('');

  useEffect(() => {
    findBilhetes();
  }, []);

  const findBilhetes = async () => {
    try {
      const bilhetes = await findAll();
      console.log('Retorno da API:', JSON.stringify(bilhetes));
      setBilhetes(bilhetes);
    } catch (error) {
      console.error('Erro ao buscar bilhetes:', error);
      alert('Erro ao buscar bilhetes. Tente novamente mais tarde.');
    }
  };

  const onDelete = async (id) => {
    console.log('Excluindo o bilhete:', id);
    try {
      const bilheteOld = await remove(id);
      alert(`Bilhete ${bilheteOld.numero} excluído com sucesso!`);
      await findBilhetes();
    } catch (error) {
      console.error('Erro ao excluir bilhete:', error);
      alert('Erro ao excluir bilhete. Tente novamente mais tarde.');
    }
  };

  const onEdit = (bilhete) => {
    setIsEditing(true);
    setCurrentBilheteId(bilhete.id);
    setNumero(bilhete.numero);
    setAssento(bilhete.assento);
    setDataPartida(bilhete.dataPartida);
    setDataChegada(bilhete.dataChegada);
    setTipo(bilhete.tipo);
    setValor(bilhete.valor);
    setShowDialog(true);
  };

   const validarDados = () => {
    
    if (!numero || !assento || !dataPartida || !dataChegada || !tipo || !valor) {
      Alert.alert('Erro', 'Todos os campos devem ser preenchidos.');
      return false;
    }
    
    return true;
  };

  const salvar = async () => {
    if (!validarDados()) return;

    console.log(isEditing ? 'Editando bilhete' : 'Inserindo bilhete');
    try {
      const valorFormatado = parseFloat(valor).toFixed(2);
      if (isEditing) {
        const bilheteAtualizado = await update(currentBilheteId, numero, assento, dataPartida, dataChegada, tipo, valorFormatado);
        Alert.alert('Sucesso', 'Bilhete editado com sucesso!');
        setBilhetes(bilhetes.map(b => b.id === bilheteAtualizado.id ? bilheteAtualizado : b));
      } else {
        const novoBilhete = await insert(numero, assento, dataPartida, dataChegada, tipo, valorFormatado);
        Alert.alert('Sucesso', 'Bilhete cadastrado com sucesso!');
        setBilhetes([...bilhetes, novoBilhete]);
      }
      setShowDialog(false);
      limparCampos();
      await findBilhetes();
    } catch (error) {
      console.error('Falha ao inserir/editar bilhete', error.message);
      Alert.alert('Erro', 'Falha ao cadastrar/editar o bilhete. Verifique os dados e tente novamente.');
    }
  };



  const limparCampos = () => {
    setNumero('');
    setAssento('');
    setDataChegada('');
    setDataPartida('');
    setTipo('');
    setValor('');
    setIsEditing(false);
    setCurrentBilheteId(null);
  };

  return (
    <Container>
      <PaperProvider>
        <FlatList 
          data={bilhetes}
          renderItem={({ item }) => 
            item && item.id ? (
              <TouchableOpacity>
                <Card 
                  {...item} 
                  onDelete={() => onDelete(item.id)} 
                  onEdit={() => onEdit(item)}
                />
              </TouchableOpacity>
            ) : null
          }
          keyExtractor={item => (item && item.id ? item.id.toString() : Math.random().toString())}  
        />
        <View style={styles.container}>
          <Button onPress={findBilhetes} style={styles.button}> BUSCAR </Button> 
          <Button onPress={() => setShowDialog(true) } style={styles.button}> ADICIONAR </Button>
        </View>
        
        <Portal>
          <Dialog visible={showDialog} onDismiss={() => { setShowDialog(false); limparCampos(); }}>
            <Dialog.Title>{isEditing ? 'Editar Bilhete' : 'Adicionar Bilhete'}</Dialog.Title>
            <Dialog.Content>
              <TextInput 
                mode='flat' 
                label='Número' 
                value={numero} 
                onChangeText={setNumero} 
                keyboardType='numeric' 
              />
              <TextInput 
                mode='flat' 
                label='Assento' 
                value={assento} 
                onChangeText={setAssento} 
              />
              <TextInput 
                mode='flat' 
                label='Data Partida' 
                value={dataPartida} 
                onChangeText={setDataPartida} 
              />
              <TextInput 
                mode='flat' 
                label='Data Chegada' 
                value={dataChegada} 
                onChangeText={setDataChegada} 
              />
              <TextInput 
                mode='flat' 
                label='Tipo' 
                value={tipo} 
                onChangeText={setTipo} 
              />
              <TextInput 
                mode='flat' 
                label='Valor' 
                value={valor} 
                onChangeText={setValor} 
                keyboardType='numeric' 
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => { setShowDialog(false); limparCampos(); }}>CANCELAR</Button>
              <Button onPress={salvar}>SALVAR</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </PaperProvider>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
   
  }, 
  button:{
    backgroundColor:'#0097ff',
    borderRadius: 100,
    color: 'white'
  }
});


function Container({children}) {
  if(Platform.OS === 'ios') {
    return  <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
      {children}
    </KeyboardAvoidingView>
  } else {
    return <>
              {children} 
           </>
  }
}
