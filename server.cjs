var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_genai = require("@google/genai");
var import_vite = require("vite");
var DATA_FILE = import_path.default.join(process.cwd(), "data-store.json");
var defaultServices = [
  {
    id: "plumbing",
    name: "\u0633\u0628\u0627\u0643\u0629 \u0648\u0635\u064A\u0627\u0646\u0629 \u0635\u062D\u064A\u0629",
    icon: "Droplets",
    description: "\u062A\u0623\u0633\u064A\u0633 \u0648\u062A\u0645\u062F\u064A\u062F \u0634\u0628\u0643\u0627\u062A \u0627\u0644\u0645\u064A\u0627\u0647\u060C \u0635\u064A\u0627\u0646\u0629 \u0641\u0644\u0627\u062A\u0631\u060C \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u062A\u0633\u0631\u064A\u0628\u0627\u062A\u060C \u062A\u0631\u0643\u064A\u0628 \u0645\u063A\u0627\u0633\u0644 \u0648\u062E\u0644\u0627\u0637\u0627\u062A \u0648\u0628\u0627\u0646\u064A\u0648.",
    basePrice: 150,
    isActive: true,
    subServices: [
      { id: "p1", name: "\u062A\u0635\u0644\u064A\u062D \u062A\u0633\u0631\u064A\u0628 \u0645\u064A\u0627\u0647 \u0623\u0648 \u0645\u062D\u0628\u0633", price: 120 },
      { id: "p2", name: "\u062A\u0631\u0643\u064A\u0628 \u062E\u0644\u0627\u0637 \u0645\u064A\u0627\u0647 \u062C\u062F\u064A\u062F", price: 200 },
      { id: "p3", name: "\u062A\u0633\u0644\u064A\u0643 \u0628\u0627\u0644\u0648\u0639\u0627\u062A \u0648\u0635\u0631\u0641 \u0635\u062D\u064A", price: 150 },
      { id: "p4", name: "\u062A\u0631\u0643\u064A\u0628 \u0641\u0644\u062A\u0631 \u0645\u064A\u0627\u0647 5 \u0623\u0648 7 \u0645\u0631\u0627\u062D\u0644", price: 250 },
      { id: "p5", name: "\u0635\u064A\u0627\u0646\u0629 \u0648\u062A\u063A\u064A\u064A\u0631 \u0642\u0644\u0628 \u062E\u0644\u0627\u0637", price: 80 }
    ]
  },
  {
    id: "electricity",
    name: "\u0643\u0647\u0631\u0628\u0627\u0621 \u0648\u0625\u0646\u0627\u0631\u0629 \u0645\u0646\u0632\u0644\u064A\u0629",
    icon: "Zap",
    description: "\u062A\u0631\u0643\u064A\u0628 \u0646\u062C\u0641 \u0648\u0645\u0631\u0627\u0648\u062D\u060C \u062A\u0635\u0644\u064A\u062D \u0634\u0648\u0631\u062A \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u060C \u062A\u0631\u0643\u064A\u0628 \u0648\u062A\u063A\u064A\u064A\u0631 \u0627\u0644\u0643\u0648\u0627\u0628\u0644 \u0648\u0627\u0644\u0645\u0641\u0627\u062A\u064A\u062D \u0648\u062A\u0634\u064A\u064A\u0643 \u0643\u0627\u0645\u0644 \u0639\u0644\u0649 \u0644\u0648\u062D\u0629 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621.",
    basePrice: 100,
    isActive: true,
    subServices: [
      { id: "e1", name: "\u062A\u062D\u062F\u064A\u062F \u0648\u062A\u0635\u0644\u064A\u062D \u0642\u0641\u0644\u0629 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629", price: 250 },
      { id: "e2", name: "\u062A\u0631\u0643\u064A\u0628 \u0646\u062C\u0641\u0629 \u0623\u0648 \u0645\u0631\u0648\u062D\u0629 \u0633\u0642\u0641", price: 150 },
      { id: "e3", name: "\u062A\u0631\u0643\u064A\u0628 \u0623\u0648 \u062A\u063A\u064A\u064A\u0631 \u0645\u0641\u062A\u0627\u062D/\u0628\u0631\u064A\u0632\u0629 \u0643\u0647\u0631\u0628\u0627\u0621", price: 50 },
      { id: "e4", name: "\u062A\u0631\u0643\u064A\u0628 \u0633\u0628\u0648\u062A\u0627\u062A \u0625\u0636\u0627\u0621\u0629 \u0644\u064A\u062F (\u0627\u0644\u0642\u0637\u0639\u0629)", price: 30 },
      { id: "e5", name: "\u062A\u063A\u064A\u064A\u0631 \u0644\u0648\u062D\u0629 \u0627\u0644\u0645\u0641\u0627\u062A\u064A\u062D \u0627\u0644\u0623\u0648\u062A\u0648\u0645\u0627\u062A\u064A\u0643\u064A\u0629 \u0628\u0627\u0644\u0643\u0627\u0645\u0644", price: 600 }
    ]
  },
  {
    id: "carpentry",
    name: "\u0646\u062C\u0627\u0631\u0629 \u0648\u0623\u062B\u0627\u062B \u0648\u062F\u064A\u0643\u0648\u0631",
    icon: "Hammer",
    description: "\u0641\u0643 \u0648\u062A\u0631\u0643\u064A\u0628 \u063A\u0631\u0641 \u0646\u0648\u0645\u060C \u062A\u0635\u0644\u064A\u062D \u0623\u0628\u0648\u0627\u0628 \u0648\u0646\u0648\u0627\u0641\u0630 \u062E\u0634\u0628\u064A\u0629\u060C \u0635\u064A\u0627\u0646\u0629 \u0645\u0641\u0635\u0644\u0627\u062A \u0648\u0645\u0642\u0627\u0628\u0636\u060C \u063A\u0631\u0641 \u0627\u064A\u0643\u064A\u0627 \u0648\u0633\u0631\u0627\u064A\u0631.",
    basePrice: 120,
    isActive: true,
    subServices: [
      { id: "c1", name: "\u0635\u064A\u0627\u0646\u0629 \u0642\u0641\u0644 \u0628\u0627\u0628 \u0623\u0648 \u062A\u0631\u0643\u064A\u0628 \u0643\u0627\u0644\u0648\u0646 \u062C\u062F\u064A\u062F", price: 100 },
      { id: "c2", name: "\u062A\u0635\u0644\u064A\u062D \u0628\u0627\u0628 \u062E\u0634\u0628 \u064A\u062D\u0643 \u0628\u0627\u0644\u0623\u0631\u0636", price: 120 },
      { id: "c3", name: "\u0641\u0643 \u0648\u062A\u0631\u0643\u064A\u0628 \u0633\u0631\u064A\u0631 \u0623\u0648 \u0643\u0645\u062F\u064A\u0646\u0629 \u0648\u0627\u062D\u062F\u0629", price: 150 },
      { id: "c4", name: "\u0641\u0643 \u0648\u062A\u0631\u0643\u064A\u0628 \u062F\u0648\u0644\u0627\u0628 \u0645\u0644\u0627\u0628\u0633 \u0643\u0628\u064A\u0631", price: 400 },
      { id: "c5", name: "\u062A\u0631\u0643\u064A\u0628 \u0631\u0641\u0648\u0641 \u062F\u064A\u0643\u0648\u0631 \u0623\u0648 \u0628\u0631\u0627\u0648\u064A\u0632 (\u0627\u0644\u0628\u0631\u0648\u0627\u0632)", price: 40 }
    ]
  },
  {
    id: "ac",
    name: "\u062A\u0643\u064A\u064A\u0641 \u0648\u062A\u0628\u0631\u064A\u062F",
    icon: "Wind",
    description: "\u0641\u0643 \u0648\u062A\u0631\u0643\u064A\u0628 \u0623\u062C\u0647\u0632\u0629 \u062A\u0643\u064A\u064A\u0641\u060C \u0634\u062D\u0646 \u0641\u0631\u064A\u0648\u0646\u060C \u0645\u0639\u0627\u0644\u062C\u0629 \u0645\u0634\u0627\u0643\u0644 \u062A\u0646\u0642\u064A\u0637 \u0627\u0644\u0645\u064A\u0627\u0647\u060C \u063A\u0633\u064A\u0644 \u0634\u0627\u0645\u0644 \u0644\u0644\u0648\u062D\u062F\u0627\u062A \u0627\u0644\u062F\u0627\u062E\u0644\u064A\u0629 \u0648\u0627\u0644\u062E\u0627\u0631\u062C\u064A\u0629.",
    basePrice: 200,
    isActive: true,
    subServices: [
      { id: "ac1", name: "\u0634\u062D\u0646 \u063A\u0627\u0632 \u0641\u0631\u064A\u0648\u0646 R22 / R410 (\u0644\u0643\u0644 \u062C\u0647\u0627\u0632)", price: 850 },
      { id: "ac2", name: "\u063A\u0633\u064A\u0644 \u0648\u062A\u0646\u0638\u064A\u0641 \u0627\u0644\u062A\u0643\u064A\u064A\u0641 \u0628\u0627\u0644\u0645\u0648\u0627\u062F \u0627\u0644\u0643\u064A\u0645\u064A\u0627\u0626\u064A\u0629", price: 200 },
      { id: "ac3", name: "\u0641\u0643 \u0648\u0646\u0642\u0644 \u062A\u0643\u064A\u064A\u0641 \u0645\u0646 \u0645\u0643\u0627\u0646 \u0644\u0622\u062E\u0631", price: 500 },
      { id: "ac4", name: "\u062D\u0644 \u0645\u0634\u0643\u0644\u0629 \u062A\u0646\u0642\u064A\u0637 \u0627\u0644\u0645\u064A\u0627\u0647 \u0645\u0646 \u0627\u0644\u0648\u062D\u062F\u0629 \u0627\u0644\u062F\u0627\u062E\u0644\u064A\u0629", price: 150 },
      { id: "ac5", name: "\u062A\u0635\u0644\u064A\u062D \u0643\u0627\u0631\u062A\u0629 \u0623\u0648 \u062A\u063A\u064A\u064A\u0631 \u0645\u0643\u062B\u0641 \u0627\u0644\u062A\u0643\u064A\u064A\u0641", price: 450 }
    ]
  }
];
var defaultTechnicians = [
  {
    id: "tech-1",
    name: "\u0627\u0644\u0623\u0633\u0637\u0649 \u0623\u062D\u0645\u062F \u0627\u0644\u0646\u062C\u0627\u0631",
    role: "carpentry",
    phone: "01012345678",
    rating: 4.9,
    avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&h=150&fit=crop",
    status: "available"
  },
  {
    id: "tech-2",
    name: "\u0627\u0644\u0645\u0647\u0646\u062F\u0633 \u0643\u0631\u064A\u0645 \u0627\u0644\u062A\u0643\u064A\u064A\u0641",
    role: "ac",
    phone: "01233445566",
    rating: 4.8,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    status: "available"
  },
  {
    id: "tech-3",
    name: "\u0627\u0644\u0623\u0633\u0637\u0649 \u0645\u062D\u0645\u0648\u062F \u0627\u0644\u0633\u0628\u0627\u0643",
    role: "plumbing",
    phone: "01122334455",
    rating: 4.7,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    status: "busy"
  },
  {
    id: "tech-4",
    name: "\u0627\u0644\u0623\u0633\u0637\u0649 \u0639\u0627\u062F\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A",
    role: "electricity",
    phone: "01555667788",
    rating: 4.9,
    avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&h=150&fit=crop",
    status: "available"
  }
];
var defaultSettings = {
  siteName: "AG Group \u0644\u0644\u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u0645\u062D\u0644\u064A\u0629",
  subtitle: "\u0623\u0633\u0631\u0639 \u0648\u0623\u0636\u0645\u0646 \u0645\u0646\u0635\u0629 \u0644\u062D\u062C\u0632 \u0641\u0646\u064A\u064A \u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u0645\u0646\u0632\u0644\u064A\u0629 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0628\u0623\u0633\u0639\u0627\u0631 \u0645\u062D\u062F\u062F\u0629 \u0648\u0636\u0645\u0627\u0646 \u062D\u0642\u064A\u0642\u064A.",
  contactPhone: "19600",
  workingHours: "\u0637\u0648\u0627\u0644 \u0623\u064A\u0627\u0645 \u0627\u0644\u0623\u0633\u0628\u0648\u0639 \u0645\u0646 \u0627\u0644\u0633\u0627\u0639\u0629 8 \u0635\u0628\u0627\u062D\u0627\u064B \u062D\u062A\u0649 11 \u0645\u0633\u0627\u0621\u064B",
  promoBanner: "\u062E\u0635\u0645 20% \u0639\u0644\u0649 \u062E\u062F\u0645\u0627\u062A \u063A\u0633\u064A\u0644 \u0627\u0644\u062A\u0643\u064A\u064A\u0641 \u0648\u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0641\u0631\u064A\u0648\u0646 \u0644\u0641\u062A\u0631\u0629 \u0645\u062D\u062F\u0648\u062F\u0629!",
  isPromoActive: true,
  adminUsername: "admin",
  adminPassword: "admin123",
  subSilverPrice: 150,
  subGoldPrice: 300,
  subPlatinumPrice: 500,
  whatsappNumber: "01271762299"
};
var defaultBookings = [
  {
    id: "bk-101",
    customerName: "\u0645\u062D\u0645\u062F \u0639\u0628\u062F \u0627\u0644\u0644\u0647",
    customerPhone: "01009876543",
    customerAddress: "\u0634\u0627\u0631\u0639 \u0627\u0644\u062A\u0633\u0639\u064A\u0646\u060C \u0627\u0644\u062A\u062C\u0645\u0639 \u0627\u0644\u062E\u0627\u0645\u0633\u060C \u0634\u0642\u0629 4",
    serviceId: "plumbing",
    subServiceId: "p2",
    technicianId: "tech-3",
    date: "2026-06-15",
    timeSlot: "12:00 \u0645 - 02:00 \u0645",
    problemDescription: "\u0645\u062D\u062A\u0627\u062C \u0641\u0646\u064A \u064A\u0631\u0643\u0628 \u062E\u0644\u0627\u0637 \u0645\u064A\u0627\u0647 \u0645\u0633\u062A\u0648\u0631\u062F \u0644\u0644\u0645\u0637\u0628\u062E\u060C \u0648\u062E\u0644\u0627\u0637 \u062D\u0648\u0636 \u0627\u0644\u062D\u0645\u0627\u0645 \u064A\u0642\u0637\u0631 \u0645\u064A\u0627\u0647 \u0648\u0645\u062D\u062A\u0627\u062C \u0635\u064A\u0627\u0646\u0629.",
    estimatedPrice: 280,
    status: "assigned",
    createdAt: "2026-06-12T15:30:00Z",
    notes: "\u062A\u0645 \u0627\u0644\u062A\u0648\u0627\u0635\u0644 \u0648\u062A\u0623\u0643\u064A\u062F \u0627\u0644\u0645\u0648\u0639\u062F \u0645\u0639 \u0627\u0644\u0639\u0645\u064A\u0644."
  },
  {
    id: "bk-102",
    customerName: "\u0633\u0627\u0631\u0629 \u0623\u062D\u0645\u062F",
    customerPhone: "01223554411",
    customerAddress: "\u062D\u064A \u0627\u0644\u0645\u0639\u0627\u062F\u064A\u060C \u0623\u0628\u0631\u0627\u062C \u0639\u062B\u0645\u0627\u0646\u060C \u0627\u0644\u062F\u0648\u0631 \u0627\u0644\u0633\u0627\u062F\u0633",
    serviceId: "ac",
    subServiceId: "ac2",
    technicianId: "tech-2",
    date: "2026-06-14",
    timeSlot: "10:00 \u0635 - 12:00 \u0645",
    problemDescription: "\u062A\u0643\u064A\u064A\u0641 \u063A\u0631\u0641\u0629 \u0627\u0644\u0646\u0648\u0645 \u0635\u0648\u062A\u0647 \u0639\u0627\u0644\u064A \u0648\u0645\u0627 \u064A\u0628\u0631\u062F \u0628\u0627\u0646\u062A\u0638\u0627\u0645\u060C \u0645\u062D\u062A\u0627\u062C\u0629 \u062A\u0646\u0638\u064A\u0641 \u0643\u0627\u0645\u0644 \u0648\u0641\u062D\u0635 \u063A\u0627\u0632 \u0627\u0644\u0641\u0631\u064A\u0648\u0646.",
    estimatedPrice: 200,
    status: "accepted",
    createdAt: "2026-06-13T08:15:00Z"
  }
];
function loadData() {
  try {
    if (import_fs.default.existsSync(DATA_FILE)) {
      const parsed = JSON.parse(import_fs.default.readFileSync(DATA_FILE, "utf-8"));
      const loadedSettings = parsed.settings || defaultSettings;
      if (!loadedSettings.adminUsername) {
        loadedSettings.adminUsername = "admin";
      }
      if (!loadedSettings.adminPassword) {
        loadedSettings.adminPassword = "admin123";
      }
      if (loadedSettings.subSilverPrice === void 0) {
        loadedSettings.subSilverPrice = 150;
      }
      if (loadedSettings.subGoldPrice === void 0) {
        loadedSettings.subGoldPrice = 300;
      }
      if (loadedSettings.subPlatinumPrice === void 0) {
        loadedSettings.subPlatinumPrice = 500;
      }
      if (!loadedSettings.whatsappNumber) {
        loadedSettings.whatsappNumber = "01271762299";
      }
      loadedSettings.isFreshServerBoot = false;
      return {
        services: parsed.services || defaultServices,
        technicians: parsed.technicians || defaultTechnicians,
        bookings: parsed.bookings || defaultBookings,
        settings: loadedSettings,
        subscriptions: parsed.subscriptions || []
      };
    }
  } catch (error) {
    console.error("Error reading data store, reverting to defaults:", error);
  }
  const freshSettings = { ...defaultSettings, isFreshServerBoot: true };
  return {
    services: defaultServices,
    technicians: defaultTechnicians,
    bookings: defaultBookings,
    settings: freshSettings,
    subscriptions: []
  };
}
function saveData(data, preserveTimestamp = false) {
  try {
    if (!data.settings) {
      data.settings = { ...defaultSettings };
    }
    delete data.settings.isFreshServerBoot;
    if (!preserveTimestamp || !data.settings.lastUpdatedAt) {
      data.settings.lastUpdatedAt = Date.now();
    }
    import_fs.default.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing to data store:", err);
  }
}
var aiClient = null;
function getAIClient() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      aiClient = new import_genai.GoogleGenAI({ apiKey });
      console.log("Initialized GoogleGenAI client successfully.");
    } else {
      console.warn("GEMINI_API_KEY remains unset. Operating in descriptive fallback rule mode.");
    }
  }
  return aiClient;
}
function setupFavicons() {
  try {
    const imagesDir = import_path.default.join(process.cwd(), "src", "assets", "images");
    const publicDir = import_path.default.join(process.cwd(), "public");
    if (!import_fs.default.existsSync(publicDir)) {
      import_fs.default.mkdirSync(publicDir, { recursive: true });
    }
    if (import_fs.default.existsSync(imagesDir)) {
      const files = import_fs.default.readdirSync(imagesDir);
      const masterFavicon = files.find((f) => f.startsWith("favicon_master_") && (f.endsWith(".jpg") || f.endsWith(".png") || f.endsWith(".jpeg")));
      if (masterFavicon) {
        const srcPath = import_path.default.join(imagesDir, masterFavicon);
        const targets = [
          "favicon.png",
          "favicon-16x16.png",
          "favicon-32x32.png",
          "favicon-48x48.png",
          "apple-touch-icon.png"
        ];
        for (const target of targets) {
          const destPath = import_path.default.join(publicDir, target);
          import_fs.default.copyFileSync(srcPath, destPath);
        }
        console.log(`[Favicon Setup] Copying ${masterFavicon} to public targets successfully.`);
      } else {
        console.log("[Favicon Setup] Warning: No favicon_master file found in src/assets/images");
      }
    } else {
      console.log("[Favicon Setup] Warning: src/assets/images directory does not exist.");
    }
  } catch (err) {
    console.error("[Favicon Setup] Error copying favicon files:", err);
  }
}
async function startServer() {
  setupFavicons();
  const app = (0, import_express.default)();
  const PORT = 3e3;
  app.use(import_express.default.json({ limit: "50mb" }));
  app.use(import_express.default.urlencoded({ limit: "50mb", extended: true }));
  app.post("/api/restore", (req, res) => {
    const backupData = req.body;
    if (!backupData || !backupData.settings) {
      return res.status(400).json({ error: "\u0628\u064A\u0627\u0646\u0627\u062A \u0627\u0644\u0646\u0633\u062E\u0629 \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629 \u063A\u064A\u0631 \u0635\u0627\u0644\u062D\u0629" });
    }
    saveData(backupData, true);
    console.log(`[Self-Healing] State restored from browser with timestamp: ${backupData.settings.lastUpdatedAt}`);
    res.json({ success: true, message: "\u062A\u0645\u062A \u0627\u0633\u062A\u0639\u0627\u062F\u0629 \u062D\u0627\u0644\u0629 \u0627\u0644\u0645\u0646\u0635\u0629 \u0628\u0646\u062C\u0627\u062D \u0645\u0646 \u0627\u0644\u0646\u0633\u062E\u0629 \u0627\u0644\u0627\u062D\u062A\u064A\u0627\u0637\u064A\u0629 \u0644\u0644\u0645\u062A\u0635\u0641\u062D" });
  });
  app.get("/api/data", (req, res) => {
    const data = loadData();
    res.json(data);
  });
  app.post("/api/bookings", (req, res) => {
    const data = loadData();
    const newBooking = {
      id: "bk-" + Math.floor(1e3 + Math.random() * 9e3),
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      status: "pending",
      ...req.body
    };
    data.bookings.unshift(newBooking);
    saveData(data);
    res.status(201).json(newBooking);
  });
  app.post("/api/subscriptions", (req, res) => {
    const data = loadData();
    if (!data.subscriptions) {
      data.subscriptions = [];
    }
    const newSub = {
      id: "sub-" + Math.floor(1e3 + Math.random() * 9e3),
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      status: "pending",
      paymentMethod: "wallet",
      systemWalletNumber: data.settings?.whatsappNumber || "01271762299",
      ...req.body
    };
    data.subscriptions.unshift(newSub);
    saveData(data);
    res.status(201).json(newSub);
  });
  app.post("/api/subscriptions/:id/approve", (req, res) => {
    const { id } = req.params;
    const data = loadData();
    if (!data.subscriptions) data.subscriptions = [];
    const subIdx = data.subscriptions.findIndex((s) => s.id === id);
    if (subIdx === -1) {
      return res.status(404).json({ error: "Subscription request not found" });
    }
    const sub = data.subscriptions[subIdx];
    sub.status = "approved";
    const newWorker = {
      id: "tech-" + Math.floor(1e3 + Math.random() * 9e3),
      name: sub.name,
      role: sub.role,
      phone: sub.phone || sub.customerWalletNumber || "01000000000",
      rating: 5,
      avatar: sub.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
      status: "available"
    };
    if (!data.technicians) data.technicians = [];
    data.technicians.push(newWorker);
    saveData(data);
    res.json({ success: true, subscription: sub, worker: newWorker });
  });
  app.post("/api/subscriptions/:id/reject", (req, res) => {
    const { id } = req.params;
    const data = loadData();
    if (!data.subscriptions) data.subscriptions = [];
    const subIdx = data.subscriptions.findIndex((s) => s.id === id);
    if (subIdx === -1) {
      return res.status(404).json({ error: "Subscription request not found" });
    }
    data.subscriptions[subIdx].status = "rejected";
    saveData(data);
    res.json({ success: true, subscription: data.subscriptions[subIdx] });
  });
  app.delete("/api/subscriptions/:id", (req, res) => {
    const { id } = req.params;
    const data = loadData();
    if (!data.subscriptions) data.subscriptions = [];
    const subIdx = data.subscriptions.findIndex((s) => s.id === id);
    if (subIdx === -1) {
      return res.status(404).json({ error: "Subscription request not found" });
    }
    data.subscriptions.splice(subIdx, 1);
    saveData(data);
    res.json({ success: true, message: "Subscription request deleted successfully" });
  });
  app.put("/api/bookings/:id", (req, res) => {
    const { id } = req.params;
    const data = loadData();
    const index = data.bookings.findIndex((b) => b.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Booking not found" });
    }
    data.bookings[index] = {
      ...data.bookings[index],
      ...req.body
    };
    saveData(data);
    res.json(data.bookings[index]);
  });
  app.put("/api/services", (req, res) => {
    const data = loadData();
    data.services = req.body;
    saveData(data);
    res.json({ success: true, services: data.services });
  });
  app.put("/api/workers", (req, res) => {
    const data = loadData();
    data.technicians = req.body;
    saveData(data);
    res.json({ success: true, technicians: data.technicians });
  });
  app.put("/api/settings", (req, res) => {
    const data = loadData();
    data.settings = req.body;
    saveData(data);
    res.json({ success: true, settings: data.settings });
  });
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;
    const data = loadData();
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }
    const ai = getAIClient();
    const serviceContext = data.services.map((s) => {
      const subList = s.subServices.map((sub) => `- ${sub.name} (\u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0645\u062A\u0648\u0642\u0639: ${sub.price} \u062C\u0646\u064A\u0647)`).join("\n");
      return `\u0645\u062C\u0645\u0648\u0639\u0629: ${s.name} (${s.id})
\u0627\u0644\u0648\u0635\u0641: ${s.description}
\u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u062A\u0634\u062E\u064A\u0635\u064A\u0629 \u0627\u0644\u0641\u0631\u0639\u064A\u0629:
${subList}`;
    }).join("\n\n");
    const technicianContext = data.technicians.map((t) => `${t.name} (${t.role}) - \u062A\u0642\u064A\u064A\u0645 ${t.rating} - \u0627\u0644\u062D\u0627\u0644\u0629 ${t.status}`).join("\n");
    const systemPrompt = `\u0623\u0646\u062A \u0645\u0633\u0627\u0639\u062F \u0630\u0643\u064A \u0645\u062E\u0635\u0635 \u0644\u0645\u0646\u0635\u0629 \u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u0645\u0646\u0632\u0644\u064A\u0629 "${data.settings.siteName}".
\u0645\u0647\u0645\u062A\u0643 \u0647\u064A \u0645\u0633\u0627\u0639\u062F\u0629 \u0627\u0644\u0639\u0645\u064A\u0644 \u0627\u0644\u0639\u0631\u0628\u064A \u0641\u064A \u062A\u0634\u062E\u064A\u0635 \u0645\u0634\u0643\u0644\u062A\u0647 \u0627\u0644\u0645\u0646\u0632\u0644\u064A\u0629 \u0628\u0644\u0637\u0641 \u0648\u0627\u062D\u062A\u0631\u0627\u0641\u064A\u0629 \u0648\u0628\u0637\u0631\u064A\u0642\u0629 \u0645\u0634\u062C\u0639\u0629 \u0648\u062A\u0641\u0627\u0639\u0644\u064A\u0629 \u062C\u062F\u0627\u064B.
\u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0645\u062A\u0627\u062D\u0629 \u0644\u062F\u064A\u0646\u0627 \u0641\u064A \u0627\u0644\u0646\u0638\u0627\u0645 \u062D\u0627\u0644\u064A\u0627\u064B \u0648\u0623\u0633\u0639\u0627\u0631\u0647\u0627 \u0647\u064A \u0628\u0627\u0644\u062A\u0641\u0635\u064A\u0644:
${serviceContext}

\u0627\u0644\u0641\u0646\u064A\u064A\u0646 \u0627\u0644\u0645\u062A\u0627\u062D\u064A\u0646 \u062D\u0627\u0644\u064A\u0627\u064B:
${technicianContext}

\u0633\u0627\u0639\u0627\u062A \u0627\u0644\u0639\u0645\u0644 \u0648\u0627\u0644\u0633\u064A\u0627\u0633\u0629: ${data.settings.workingHours}\u060C \u0647\u0627\u062A\u0641 \u0627\u0644\u0627\u062A\u0635\u0627\u0644: ${data.settings.contactPhone}.

\u0627\u0644\u062A\u0639\u0644\u064A\u0645\u0627\u062A \u0627\u0644\u0647\u0627\u0645\u0629 \u0644\u0625\u062C\u0627\u0628\u062A\u0643:
1. \u062A\u062D\u062F\u062B \u0628\u0627\u0644\u0644\u063A\u0629 \u0627\u0644\u0639\u0631\u0628\u064A\u0629 \u0627\u0644\u0645\u062D\u0643\u064A\u0629 \u0627\u0644\u0644\u0637\u064A\u0641\u0629 \u0627\u0644\u0645\u0645\u0632\u0648\u062C\u0629 \u0628\u0644\u0647\u062C\u0629 \u0645\u0635\u0631\u064A\u0629 \u0623\u0648 \u0645\u0628\u0633\u0637\u0629 \u064A\u0641\u0647\u0645\u0647\u0627 \u0627\u0644\u0639\u0645\u064A\u0644 \u0627\u0644\u0639\u0631\u0628\u064A \u0628\u0633\u0647\u0648\u0644\u0629.
2. \u0648\u062C\u0647 \u0627\u0644\u0639\u0645\u064A\u0644 \u0645\u0646 \u062E\u0644\u0627\u0644 \u0645\u062D\u0627\u062F\u062B\u062A\u0647 \u0644\u0645\u0639\u0631\u0641\u0629 \u062A\u0641\u0627\u0635\u064A\u0644 \u0627\u0644\u0645\u0634\u0643\u0644\u0629 (\u0645\u062B\u0644\u0627\u064B: \u0644\u0648 \u062A\u0633\u0631\u064A\u0628 \u0645\u064A\u0627\u0647\u060C \u0627\u0633\u0623\u0644\u0647 \u0639\u0646 \u0645\u0643\u0627\u0646 \u0627\u0644\u062A\u0633\u0631\u064A\u0628 \u0648\u0633\u0631\u0639\u062A\u0647\u060C \u0644\u0648 \u062A\u0643\u064A\u064A\u0641 \u0627\u0633\u0623\u0644\u0647 \u062A\u0628\u0631\u064A\u062F \u0648\u0644\u0627 \u0635\u0648\u062A.. \u0625\u0644\u062E).
3. \u0628\u0639\u062F \u062A\u0634\u062E\u064A\u0635 \u0627\u0644\u0645\u0634\u0643\u0644\u0629 \u0628\u0646\u0633\u0628\u0629 \u0645\u0639\u0642\u0648\u0644\u0629\u060C \u0631\u0634\u062D \u0644\u0647 \u0627\u0644\u062E\u062F\u0645\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0648\u0627\u0644\u0641\u0631\u0639\u064A\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629 \u0648\u0633\u0639\u0631\u0647\u0627 \u0645\u0646 \u0627\u0644\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u0633\u0627\u0628\u0642\u0629 \u0645\u0628\u0627\u0634\u0631\u0629\u060C \u0648\u0627\u0642\u062A\u0631\u062D \u0639\u0644\u064A\u0647 \u062D\u062C\u0632 \u0645\u0648\u0639\u062F.
4. \u0625\u062C\u0627\u0628\u062A\u0643 \u064A\u062C\u0628 \u0623\u0646 \u062A\u0643\u0648\u0646 \u0645\u0646\u0633\u0642\u0629 \u0648\u0645\u0646\u0638\u0645\u0629 \u0628\u0634\u0643\u0644 \u0631\u0627\u0626\u0639 \u0639\u0628\u0631 \u0646\u0642\u0627\u0637 \u0643\u0627\u0644\u0646\u062C\u0645 \u0648\u0627\u0644\u0641\u0642\u0631\u0627\u062A \u0627\u0644\u0642\u0635\u064A\u0631\u0629.
5. \u0641\u064A \u0646\u0647\u0627\u064A\u0629 \u0627\u0644\u062A\u0634\u062E\u064A\u0635\u060C \u0630\u0643\u0631\u0647 \u0628\u0643\u062A\u0627\u0628\u0629 \u0637\u0644\u0628\u0647 \u0641\u064A \u0627\u0644\u0627\u0633\u062A\u0645\u0627\u0631\u0629 \u0644\u062D\u062C\u0632 \u0641\u0646\u064A \u0645\u062E\u062A\u0635\u060C \u0623\u0648 \u0627\u0639\u0631\u0636 \u0639\u0644\u064A\u0647 \u0623\u0646 \u064A\u0642\u0648\u0645 \u0628\u0643\u062A\u0627\u0628\u0629 \u0627\u0644\u0627\u0633\u0645 \u0644\u0637\u0644\u0628 \u0641\u0646\u064A \u0641\u0648\u0631\u0627\u064B.
6. \u0625\u0630\u0627 \u0644\u0645 \u062A\u062A\u0648\u0641\u0631 \u0644\u062F\u064A\u0646\u0627 \u0627\u0644\u062E\u062F\u0645\u0629 \u0627\u0644\u0645\u0646\u0627\u0633\u0628\u0629 \u0644\u0645\u0634\u0643\u0644\u062A\u0647 (\u0645\u062B\u0644 \u062A\u0643\u0633\u064A\u0631 \u062C\u062F\u0631\u0627\u0646 \u0636\u062E\u0645 \u0623\u0648 \u0628\u0646\u0627\u0621 \u062E\u0631\u0633\u0627\u0646\u064A)\u060C \u0648\u0636\u062D \u0644\u0647 \u0630\u0644\u0643 \u0628\u0644\u0628\u0627\u0642\u0629.`;
    if (ai) {
      try {
        const formattedHistory = (history || []).map((msg) => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        }));
        const chat = ai.chats.create({
          model: "gemini-3.5-flash",
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7
          },
          history: formattedHistory
        });
        const response = await chat.sendMessage({ message });
        const text = response.text || "\u0639\u0630\u0631\u0627\u064B\u060C \u0644\u0645 \u0623\u0633\u062A\u0637\u0639 \u062A\u062D\u0644\u064A\u0644 \u0637\u0644\u0628\u0643 \u0628\u062F\u0642\u0629. \u064A\u0631\u062C\u0649 \u062A\u0648\u0636\u064A\u062D \u0627\u0644\u0645\u0634\u0643\u0644\u0629 \u0644\u0645\u0633\u0627\u0639\u062F\u062A\u0643!";
        res.json({ reply: text });
      } catch (err) {
        console.error("Gemini API Error:", err);
        res.json({
          reply: "\u0623\u0647\u0644\u0627\u064B \u0628\u0643! \u0644\u0642\u062F \u0648\u0627\u062C\u0647\u062A \u0635\u0639\u0648\u0628\u0629 \u0645\u0624\u0642\u062A\u0629 \u0641\u064A \u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0630\u0643\u0627\u0621 \u0627\u0644\u0627\u0635\u0637\u0646\u0627\u0639\u064A \u0644\u062A\u0634\u062E\u064A\u0635 \u0645\u0634\u0643\u0644\u062A\u0643 \u0627\u0644\u0630\u0643\u064A\u0629 \u0628\u0633\u0628\u0628 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u062E\u0627\u062F\u0645\u060C \u0648\u0644\u0643\u0646\u0646\u064A \u0645\u062A\u0627\u062D \u0644\u0645\u0633\u0627\u0639\u062F\u062A\u0643 \u064A\u062F\u0648\u064A\u0627\u064B! \u064A\u0633\u0639\u062F\u0646\u064A \u062C\u062F\u0627\u064B \u062A\u0648\u062C\u064A\u0647\u0643 \u0644\u062D\u062C\u0632 \u0625\u062D\u062F\u0649 \u062E\u062F\u0645\u0627\u062A\u0646\u0627 \u0627\u0644\u0645\u0645\u064A\u0632\u0629 \u0645\u062B\u0644 \u0627\u0644\u0633\u0628\u0627\u0643\u0629\u060C \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621\u060C \u0627\u0644\u0646\u062C\u0627\u0631\u0629\u060C \u0623\u0648 \u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u062A\u0643\u064A\u064A\u0641 \u0628\u0623\u0633\u0639\u0627\u0631 \u0645\u0648\u062D\u062F\u0629 \u062A\u0628\u062F\u0623 \u0645\u0646 " + Math.min(...data.services.map((s) => s.basePrice)) + " \u062C\u0646\u064A\u0647 \u0641\u0642\u0637."
        });
      }
    } else {
      let replyText = "\u0645\u0631\u062D\u0628\u0627\u064B \u0628\u0643! \u064A\u0633\u0639\u062F\u0646\u064A \u062C\u062F\u0627\u064B \u0645\u0633\u0627\u0639\u062F\u062A\u0643. ";
      const cleanMsg = message.toLowerCase();
      if (cleanMsg.includes("\u0633\u0628\u0627\u0643") || cleanMsg.includes("\u062D\u0645\u0627\u0645") || cleanMsg.includes("\u062A\u0633\u0631\u064A\u0628") || cleanMsg.includes("\u062D\u0646\u0641\u064A\u0629") || cleanMsg.includes("\u0645\u0648\u0627\u0633\u064A\u0631") || cleanMsg.includes("\u0641\u0644\u062A\u0631")) {
        replyText += `\u064A\u0628\u062F\u0648 \u0623\u0646\u0643 \u062A\u0639\u0627\u0646\u064A \u0645\u0646 \u0645\u0634\u0643\u0644\u0629 \u0645\u062A\u0639\u0644\u0642\u0629 \u0628\u0627\u0644\u0633\u0628\u0627\u0643\u0629 \u{1F4A7}. 
\u0644\u062F\u064A\u0646\u0627 \u0645\u062C\u0645\u0648\u0639\u0629 \u0645\u0646 \u0623\u0641\u0636\u0644 \u0627\u0644\u0633\u0628\u0627\u0643\u064A\u0646 \u0627\u0644\u0645\u0639\u062A\u0645\u062F\u064A\u0646 \u0645\u062B\u0644 \u0627\u0644\u0640 "\u0627\u0644\u0623\u0633\u0637\u0649 \u0645\u062D\u0645\u0648\u062F \u0627\u0644\u0633\u0628\u0627\u0643". 
\u0623\u0647\u0645 \u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0645\u062A\u0648\u0641\u0631\u0629:
- \u062A\u0631\u0643\u064A\u0628 \u062E\u0644\u0627\u0637 \u0645\u064A\u0627\u0647 \u062C\u062F\u064A\u062F \u0628\u0640 200 \u062C\u0646\u064A\u0647.
- \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u062A\u0633\u0631\u064A\u0628\u0627\u062A \u0628\u0640 120 \u062C\u0646\u064A\u0647.
- \u062A\u0633\u0644\u064A\u0643 \u0627\u0644\u0635\u0631\u0641 \u0628\u0640 150 \u062C\u0646\u064A\u0647.

\u0647\u0644 \u062A\u062D\u0628 \u062D\u062C\u0632 \u0641\u0646\u064A \u0633\u0628\u0627\u0643\u0629 \u0627\u0644\u0622\u0646\u061F \u064A\u0645\u0643\u0646\u0643 \u0643\u062A\u0627\u0628\u0629 \u0627\u0644\u0627\u0633\u0645 \u0648\u0627\u0644\u0628\u064A\u0627\u0646\u0627\u062A \u0641\u064A \u0627\u0633\u062A\u0645\u0627\u0631\u0629 \u0627\u0644\u062D\u062C\u0632 \u0628\u0627\u0644\u0623\u0633\u0641\u0644 \u0648\u0633\u064A\u0642\u0648\u0645 \u0627\u0644\u0641\u0646\u064A \u0628\u0627\u0644\u0627\u0646\u062A\u0642\u0627\u0644 \u0625\u0644\u064A\u0643 \u0641\u0648\u0631\u0627\u064B!`;
      } else if (cleanMsg.includes("\u062A\u0643\u064A\u064A\u0641") || cleanMsg.includes("\u062A\u0628\u0631\u064A\u062F") || cleanMsg.includes("\u062D\u0631") || cleanMsg.includes("\u0641\u0631\u064A\u0648\u0646") || cleanMsg.includes("\u062A\u0643\u064A\u064A\u0641\u0627\u062A")) {
        replyText += `\u064A\u0628\u062F\u0648 \u0623\u0646\u0643 \u062A\u0628\u062D\u062B \u0639\u0646 \u062E\u062F\u0645\u0627\u062A \u0627\u0644\u062A\u0643\u064A\u064A\u0641 \u0648\u0627\u0644\u062A\u0628\u0631\u064A\u062F \u2744\uFE0F. 
\u064A\u0645\u0643\u0646\u0646\u0627 \u0645\u0633\u0627\u0639\u062F\u062A\u0643 \u0641\u064A \u062A\u0646\u0638\u064A\u0641 \u0627\u0644\u062A\u0643\u064A\u0641 \u063A\u0633\u064A\u0644 \u0643\u064A\u0645\u064A\u0627\u0626\u064A\u060C \u0623\u0648 \u062A\u0639\u0628\u0626\u0629 \u0627\u0644\u0641\u0631\u064A\u0648\u0646.
\u062E\u062F\u0645\u0627\u062A\u0646\u0627 \u0627\u0644\u0645\u062A\u0648\u0641\u0631\u0629:
- \u0634\u062D\u0646 \u063A\u0627\u0632 \u0627\u0644\u0641\u0631\u064A\u0648\u0646 \u0628\u0640 850 \u062C\u0646\u064A\u0647.
- \u063A\u0633\u064A\u0644 \u0648\u062A\u0646\u0638\u064A\u0641 \u0634\u0627\u0645\u0644 \u0644\u0644\u062A\u0643\u064A\u064A\u0641 \u0628\u0640 200 \u062C\u0646\u064A\u0647.
- \u062A\u0635\u0644\u064A\u062D \u0645\u0634\u0627\u0643\u0644 \u062A\u0646\u0642\u064A\u0637 \u0627\u0644\u0645\u064A\u0627\u0647 \u0628\u0640 150 \u062C\u0646\u064A\u0647.

\u0646\u0631\u062D\u0628 \u0628\u062D\u062C\u0632\u0643 \u0648\u0633\u064A\u0642\u0648\u0645 "\u0627\u0644\u0645\u0647\u0646\u062F\u0633 \u0643\u0631\u064A\u0645 \u0627\u0644\u062A\u0643\u064A\u064A\u0641" \u0623\u0648 \u0627\u0644\u0641\u0646\u064A \u0627\u0644\u0645\u062E\u062A\u0635 \u0628\u0627\u0644\u0645\u062A\u0627\u0628\u0639\u0629 \u0645\u0639\u0643!`;
      } else if (cleanMsg.includes("\u0643\u0647\u0631\u0628\u0627") || cleanMsg.includes("\u0646\u0648\u0631") || cleanMsg.includes("\u0634\u0648\u0631\u062A") || cleanMsg.includes("\u0642\u0641\u0644\u0629") || cleanMsg.includes("\u0645\u0631\u0648\u062D\u0629") || cleanMsg.includes("\u0646\u062C\u0641")) {
        replyText += `\u064A\u0628\u062F\u0648 \u0623\u0646 \u0627\u0644\u0623\u0645\u0631 \u064A\u062A\u0639\u0644\u0642 \u0628\u0623\u0639\u0637\u0627\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621 \u0648\u0627\u0644\u0625\u0646\u0627\u0631\u0629 \u26A1.
\u0644\u062F\u064A\u0646\u0627 \u0641\u0646\u064A\u0648\u0646 \u0645\u0647\u0631\u0629 \u0645\u062B\u0644 "\u0627\u0644\u0623\u0633\u0637\u0649 \u0639\u0627\u062F\u0644 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0626\u064A".
\u0623\u0647\u0645 \u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0633\u0631\u064A\u0639\u0629:
- \u062A\u0635\u0644\u064A\u062D \u0642\u0641\u0644\u0629 \u0643\u0647\u0631\u0628\u0627\u0626\u064A\u0629 \u0628\u0640 250 \u062C\u0646\u064A\u0647.
- \u062A\u0631\u0643\u064A\u0628 \u0646\u062C\u0641\u0629 \u0623\u0648 \u0645\u0631\u0648\u062D\u0629 \u0628\u0640 150 \u062C\u0646\u064A\u0647.
- \u062A\u0631\u0643\u064A\u0628 \u0645\u0641\u0627\u062A\u064A\u062D \u0648\u0645\u0643\u0627\u0628\u0633 \u0628\u0640 50 \u062C\u0646\u064A\u0647.

\u0648\u0641\u0631\u0646\u0627 \u0644\u0643 \u0636\u0645\u0627\u0646\u0627\u064B \u062D\u0642\u064A\u0642\u064A\u0627\u064B \u0644\u0633\u0644\u0627\u0645\u062A\u0643. \u064A\u0631\u062C\u0649 \u0645\u0644\u0621 \u0627\u0633\u062A\u0645\u0627\u0631\u0629 \u0637\u0644\u0628 \u0627\u0644\u062E\u062F\u0645\u0629 \u0644\u0646\u0631\u0633\u0644 \u0644\u0643 \u0627\u0644\u0641\u0646\u064A \u0641\u0648\u0631\u0627\u064B!`;
      } else if (cleanMsg.includes("\u0646\u062C\u0627\u0631") || cleanMsg.includes("\u062E\u0634\u0628") || cleanMsg.includes("\u0628\u0627\u0628") || cleanMsg.includes("\u062F\u0648\u0644\u0627\u0628") || cleanMsg.includes("\u0643\u0627\u0644\u0648\u0646") || cleanMsg.includes("\u0633\u0631\u064A\u0631")) {
        replyText += `\u0623\u0647\u0644\u0627\u064B \u0628\u0643! \u062A\u0628\u062D\u062B \u0639\u0646 \u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0646\u062C\u0627\u0631\u0629 \u0648\u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u0623\u062B\u0627\u062B \u{1F528}.
\u064A\u0645\u0643\u0646\u0646\u0627 \u0645\u0639\u0627\u0644\u062C\u0629 \u0627\u0644\u0623\u0628\u0648\u0627\u0628 \u0627\u0644\u062A\u064A \u062A\u062D\u062A\u0643\u060C \u0623\u0648 \u062A\u0631\u0643\u064A\u0628 \u0643\u0648\u0627\u0644\u064A\u0646 \u062C\u062F\u064A\u062F\u0629\u060C \u0648\u0641\u0643 \u0648\u062A\u0631\u0643\u064A\u0628 \u0627\u0644\u0645\u0637\u0627\u0628\u062E \u0648\u063A\u0631\u0641 \u0627\u064A\u0643\u064A\u0627.
\u0645\u0646 \u0623\u0647\u0645 \u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0645\u062A\u0627\u062D\u0629:
- \u0635\u064A\u0627\u0646\u0629 \u0642\u0641\u0644 \u0628\u0627\u0628 \u0623\u0648 \u062A\u0631\u0643\u064A\u0628 \u0643\u0627\u0644\u0648\u0646 \u0628\u0640 100 \u062C\u0646\u064A\u0647.
- \u0641\u0643 \u0648\u062A\u0631\u0643\u064A\u0628 \u062F\u0648\u0644\u0627\u0628 \u0645\u0644\u0627\u0628\u0633 \u0628\u0640 400 \u062C\u0646\u064A\u0647.
- \u062A\u0635\u0644\u064A\u062D \u0628\u0627\u0628 \u062E\u0634\u0628\u064A \u0628\u0640 120 \u062C\u0646\u064A\u0647.

\u064A\u0645\u0643\u0646\u0643 \u062A\u062D\u062F\u064A\u062F \u0641\u0646\u064A \u0646\u062C\u0627\u0631\u0629 \u0645\u0646 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062E\u062F\u0645\u0627\u062A \u0648\u062D\u062C\u0632 \u0645\u0648\u0639\u062F \u064A\u0646\u0627\u0633\u0628\u0643 \u0628\u0627\u0644\u0623\u0633\u0641\u0644!`;
      } else {
        replyText += `\u064A\u0633\u0639\u062F\u0646\u0627 \u062C\u062F\u0627\u064B \u062A\u0642\u062F\u064A\u0645 \u062E\u062F\u0645\u0627\u062A \u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u0645\u0646\u0632\u0644\u064A\u0629 \u0627\u0644\u0645\u062A\u0643\u0627\u0645\u0644\u0629 \u0644\u0643! 
\u0646\u0648\u0641\u0631 \u062D\u0627\u0644\u064A\u0627\u064B \u062E\u062F\u0645\u0627\u062A:
1. \u{1F4A7} \u0627\u0644\u0633\u0628\u0627\u0643\u0629 \u0648\u0627\u0644\u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u0635\u062D\u064A\u0629
2. \u26A1 \u0627\u0644\u0643\u0647\u0631\u0628\u0627\u0621 \u0648\u0627\u0644\u0625\u0646\u0627\u0631\u0629
3. \u{1F528} \u0627\u0644\u0646\u062C\u0627\u0631\u0629 \u0648\u0635\u064A\u0627\u0646\u0629 \u0627\u0644\u0623\u062B\u0627\u062B
4. \u2744\uFE0F \u0635\u064A\u0627\u0646\u0629 \u0648\u063A\u0633\u064A\u0644 \u0627\u0644\u062A\u0643\u064A\u064A\u0641

\u0645\u0627 \u0647\u064A \u0627\u0644\u0645\u0634\u0643\u0644\u0629 \u0627\u0644\u0645\u062D\u062F\u062F\u0629 \u0627\u0644\u062A\u064A \u062A\u0648\u0627\u062C\u0647\u0643 \u0627\u0644\u064A\u0648\u0645 \u0644\u064A\u0642\u0648\u0645 \u0645\u0633\u0627\u0639\u062F\u0646\u0627 \u0627\u0644\u0630\u0643\u064A \u0628\u062A\u0635\u0646\u064A\u0641\u0647\u0627 \u0648\u0639\u0631\u0636 \u0627\u0644\u0633\u0639\u0631 \u0627\u0644\u0645\u0642\u062F\u0631 \u0644\u0647\u0627\u061F`;
      }
      res.json({ reply: replyText });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
