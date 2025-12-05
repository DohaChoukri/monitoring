import React from 'react';

export default ({ data }) => {
  const handleClick = () => {
    // exemple d'action : montre l'objet dans la console
    console.log('Client selected:', data);
    alert(data?.nom ? `Client: ${data.nom}` : 'Client sélectionné');
  };

  return (
    <button onClick={handleClick} className="ag-button px-2 py-1 rounded bg-blue-600 text-white">
      {data?.nom ? `Voir ${data.nom}` : 'Voir'}
    </button>
  );
};
