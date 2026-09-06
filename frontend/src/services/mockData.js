export const mockBeekeepers = [
  { id: "bk1", name: "Murugan S", place: "Valparai, Coimbatore", phone: "9876543210", batchCount: 4 },
  { id: "bk2", name: "Lakshmi R", place: "Kotagiri, Nilgiris", phone: "9876500000", batchCount: 2 },
];

export const mockBatches = [
  { id: "b1", beekeeperId: "bk1", quantityKg: 12, dateCreated: "2026-08-20", qrCode: "HC-B1-2026", lat: 10.3269, lng: 76.9548 },
  { id: "b2", beekeeperId: "bk1", quantityKg: 8, dateCreated: "2026-08-28", qrCode: "HC-B2-2026", lat: 10.3269, lng: 76.9548 },
  { id: "b3", beekeeperId: "bk2", quantityKg: 15, dateCreated: "2026-08-15", qrCode: "HC-B3-2026", lat: 11.4197, lng: 76.8641 },
];

export const mockHiveReading = {
  connected: true,        // false => LCD-only, no live data
  lastSeen: "2026-09-05T08:30:00",
  temperature: 34.2,
  humidity: 61,
  weightKg: 22.4,
};