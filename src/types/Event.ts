export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  price: number; // in ADA
  availableTickets: number;
  image: string;
  location: string;
  category: string;
  policyId?: string; // NFT policy ID
}
