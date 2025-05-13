
import { QuotationData } from '@/components/chat/ChatInterface';

declare global {
  interface Window {
    sendQuotationToChat?: (quotation: QuotationData) => void;
  }
}

export {};
