
export const getLocalStore = ()=>JSON.parse(localSorage.getItem('state')) || undefined;