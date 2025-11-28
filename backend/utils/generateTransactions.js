import { faker } from "@faker-js/faker";

const merchants = [
  "Amazon","Flipkart","Swiggy","Zomato","Myntra","Paytm","Google Pay","PhonePe",
  "Uber","Rapido","DMart","BigBazaar","Apple","Netflix","Hotstar","Ola",
  "Blinkit","Zepto","Starbucks","KFC"
];

const types = ["UPI", "Debit Card", "Credit Card"];
const statuses = ["SUCCESS", "FAILED", "PENDING"];

// Spread transactions across Jan 2025 → TODAY
function randomDate2025() {
  const start = new Date("2025-01-01");
  const end = new Date();
  return faker.date.between({ from: start, to: end });
}

export default function generateTransactions(cardNumber, count = 10, cardBank) {
  const data = [];

  for (let i = 0; i < count; i++) {
    const merchant = faker.helpers.arrayElement(merchants);
    const type = faker.helpers.arrayElement(types);

    data.push({
      id: faker.string.uuid(),
      cardNumber,
      timestamp: randomDate2025(),
      merchant,
      amount: faker.number.int({ min: 50, max: 5000 }),
      currency: "INR",
      status: faker.helpers.arrayElement(statuses),
      type,
      bank: cardBank, // ⭐ FIXED — NOW LINKED TO THE CARD
      description: `${merchant} - Payment via ${type}`,
    });
  }

  // newest first
  return data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
}
