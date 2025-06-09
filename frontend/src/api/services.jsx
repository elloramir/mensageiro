import client from './client';

const resource = '/api/v1/pedidos/';

export const fetchPedidos = async () => {
  const { data } = await client.get(resource);
  return data;
};

export const createPedido = async (pedido) => {
  const { data } = await client.post(resource, pedido);
  return data;
};

export const updatePedido = async (id, pedido) => {
  const { data } = await client.put(`${resource}${id}/`, pedido);
  return data;
};

export const deletePedido = async (id) => {
  await client.delete(`${resource}${id}/`);
};

export const deleteForcedAll = async (id) => {
  await client.delete(`${resource}delete-forced-all`);
};
