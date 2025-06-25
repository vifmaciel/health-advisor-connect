
import React from 'react';
import QuotationGenerator from '@/components/quotation/QuotationGenerator';

const Cotacoes: React.FC = () => {
  const mockClientInfo = {
    name: 'João Silva',
    age: 35,
    email: 'joao@email.com',
    phone: '(11) 99999-9999',
    healthPlan: '',
    dependents: 2,
    location: 'São Paulo, SP'
  };

  return (
    <div className="h-full">
      <QuotationGenerator clientInfo={mockClientInfo} />
    </div>
  );
};

export default Cotacoes;
