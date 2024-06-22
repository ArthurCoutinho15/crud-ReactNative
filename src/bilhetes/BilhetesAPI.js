const URL = 'https://api-bilhete-dot-api-samples-423102.uc.r.appspot.com/api/bilhetes';

export async function findAll() {
  const requestInit = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer 12116681',
    },
  };

  const responseHttp = await fetch(URL, requestInit);

  if (responseHttp.ok) {
    return await responseHttp.json();
  } else {
    throw new Error('Falha ao tentar obter os bilhetes. Tente novamente em alguns minutos.');
  }
}

export async function remove(id) {
  const requestInit = {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer 12116681',
    },
  };

  console.log('Executando DELETE /bilhetes/' + id);
  const responseHttp = await fetch(`${URL}/${id}`, requestInit);

  if (responseHttp.ok) {
    console.log('Sucesso');
    return await responseHttp.json();
  } else {
    console.log('Erro');
    throw new Error('Falha ao tentar remover o bilhete. Tente novamente em alguns minutos.');
  }
}

export async function insert(numero, assento, dataPartida, dataChegada, tipo, valor) {
  numero = parseInt(numero, 10);
  valor = parseFloat(valor);

  const requestInit = {
    method: 'POST',
    headers: {
      Authorization: 'Bearer 12116681',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ numero, assento, dataPartida, dataChegada, tipo, valor: Number(valor.toFixed(2)) }),
  };

  
  console.log('Dados enviados para inserção:', JSON.stringify({ numero, assento, dataPartida, dataChegada, tipo, valor }));

  try {
    const responseHttp = await fetch(URL, requestInit);

    if (responseHttp.ok) {
      const responseData = await responseHttp.json();
      console.log('Resposta da API após inserção:', JSON.stringify(responseData));
      return responseData;
    } else {
      const errorResponse = await responseHttp.json();
      console.error('Erro na resposta da API:', errorResponse.message);
      throw new Error(errorResponse.message || 'Erro desconhecido ao inserir bilhete.');
    }
  } catch (error) {
    console.error('Erro durante a inserção:', error.message);
    throw error;
  }
}


export async function update(id, numero, assento, dataPartida, dataChegada, tipo, valor) {
  numero = parseInt(numero, 10);
  valor = Number(parseFloat(valor).toFixed(2)); 

  const requestInit = {
    method: 'PUT',
    headers: {
      Authorization: 'Bearer 12116681',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ numero, assento, dataPartida, dataChegada, tipo, valor }), 
  };

  
  console.log('Dados enviados para atualização:', JSON.stringify({ numero, assento, dataPartida, dataChegada, tipo, valor }));

  try {
    const responseHttp = await fetch(`${URL}/${id}`, requestInit);

    if (responseHttp.ok) {
      const responseData = await responseHttp.json();
      console.log('Resposta da API após atualização:', JSON.stringify(responseData));
      return responseData;
    } else {
      const errorResponse = await responseHttp.json();
      console.error('Erro na resposta da API:', responseHttp.statusText, errorResponse.message);
      throw new Error(errorResponse.message || 'Erro desconhecido ao atualizar bilhete.');
    }
  } catch (error) {
    console.error('Erro durante a atualização:', error.message);
    throw error;
  }
}


