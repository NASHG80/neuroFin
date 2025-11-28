import { faker } from "@faker-js/faker";

const merchants = [
  "Amazon","Flipkart","Swiggy","Zomato","Myntra","Paytm","Google Pay","PhonePe",
  "Uber","Rapido","DMart","BigBazaar","Apple","Netflix","Hotstar","Ola",
  "Blinkit","Zepto","Starbucks","KFC"
];

const types = ["UPI", "Debit Card", "Credit Card"];
const statuses = ["SUCCESS", "FAILED", "PENDING"];

// Random date between Jan 2025 and now
function randomDate2025() {
  const start = new Date("2025-01-01");
  const end = new Date();
  return faker.date.between({ from: start, to: end });
}

export default function generateTransactions(cardNumber, count, bank) {
  const results = [];

  for (let i = 0; i < count; i++) {
    const timestamp = randomDate2025();
    const monthKey = timestamp.toISOString().slice(0, 7);

    const merchant = faker.helpers.arrayElement(merchants);
    const type = faker.helpers.arrayElement(types);

    results.push({
      monthKey,
      transaction: {
        id: faker.string.uuid(),
        cardNumber,
        timestamp,
        merchant,
        amount: faker.number.int({ min: 50, max: 5000 }),
        currency: "INR",
        status: faker.helpers.arrayElement(statuses),
        type,
        bank,
        description: `${merchant} - Payment via ${type}`,
      }
    });
  }

  return results;
}
