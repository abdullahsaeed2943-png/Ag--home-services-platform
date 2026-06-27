import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { AppData, Booking, Service, Technician, SiteSettings } from "./src/types";

// Setup storage file to persist data across dev server restarts
const DATA_FILE = path.join(process.cwd(), "data-store.json");

const defaultServices: Service[] = [
  {
    id: "plumbing",
    name: "سباكة وصيانة صحية",
    icon: "Droplets",
    description: "تأسيس وتمديد شبكات المياه، صيانة فلاتر، معالجة التسريبات، تركيب مغاسل وخلاطات وبانيو.",
    basePrice: 150,
    isActive: true,
    subServices: [
      { id: "p1", name: "تصليح تسريب مياه أو محبس", price: 120 },
      { id: "p2", name: "تركيب خلاط مياه جديد", price: 200 },
      { id: "p3", name: "تسليك بالوعات وصرف صحي", price: 150 },
      { id: "p4", name: "تركيب فلتر مياه 5 أو 7 مراحل", price: 250 },
      { id: "p5", name: "صيانة وتغيير قلب خلاط", price: 80 }
    ]
  },
  {
    id: "electricity",
    name: "كهرباء وإنارة منزلية",
    icon: "Zap",
    description: "تركيب نجف ومراوح، تصليح شورت كهربائي، تركيب وتغيير الكوابل والمفاتيح وتشييك كامل على لوحة الكهرباء.",
    basePrice: 100,
    isActive: true,
    subServices: [
      { id: "e1", name: "تحديد وتصليح قفلة كهربائية", price: 250 },
      { id: "e2", name: "تركيب نجفة أو مروحة سقف", price: 150 },
      { id: "e3", name: "تركيب أو تغيير مفتاح/بريزة كهرباء", price: 50 },
      { id: "e4", name: "تركيب سبوتات إضاءة ليد (القطعة)", price: 30 },
      { id: "e5", name: "تغيير لوحة المفاتيح الأوتوماتيكية بالكامل", price: 600 }
    ]
  },
  {
    id: "carpentry",
    name: "نجارة وأثاث وديكور",
    icon: "Hammer",
    description: "فك وتركيب غرف نوم، تصليح أبواب ونوافذ خشبية، صيانة مفصلات ومقابض، غرف ايكيا وسراير.",
    basePrice: 120,
    isActive: true,
    subServices: [
      { id: "c1", name: "صيانة قفل باب أو تركيب كالون جديد", price: 100 },
      { id: "c2", name: "تصليح باب خشب يحك بالأرض", price: 120 },
      { id: "c3", name: "فك وتركيب سرير أو كمدينة واحدة", price: 150 },
      { id: "c4", name: "فك وتركيب دولاب ملابس كبير", price: 400 },
      { id: "c5", name: "تركيب رفوف ديكور أو براويز (البرواز)", price: 40 }
    ]
  },
  {
    id: "ac",
    name: "تكييف وتبريد",
    icon: "Wind",
    description: "فك وتركيب أجهزة تكييف، شحن فريون، معالجة مشاكل تنقيط المياه، غسيل شامل للوحدات الداخلية والخارجية.",
    basePrice: 200,
    isActive: true,
    subServices: [
      { id: "ac1", name: "شحن غاز فريون R22 / R410 (لكل جهاز)", price: 850 },
      { id: "ac2", name: "غسيل وتنظيف التكييف بالمواد الكيميائية", price: 200 },
      { id: "ac3", name: "فك ونقل تكييف من مكان لآخر", price: 500 },
      { id: "ac4", name: "حل مشكلة تنقيط المياه من الوحدة الداخلية", price: 150 },
      { id: "ac5", name: "تصليح كارتة أو تغيير مكثف التكييف", price: 450 }
    ]
  }
];

const defaultTechnicians: Technician[] = [
  {
    id: "tech-1",
    name: "الأسطى أحمد النجار",
    role: "carpentry",
    phone: "01012345678",
    rating: 4.9,
    avatar: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&h=150&fit=crop",
    status: "available"
  },
  {
    id: "tech-2",
    name: "المهندس كريم التكييف",
    role: "ac",
    phone: "01233445566",
    rating: 4.8,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    status: "available"
  },
  {
    id: "tech-3",
    name: "الأسطى محمود السباك",
    role: "plumbing",
    phone: "01122334455",
    rating: 4.7,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    status: "busy"
  },
  {
    id: "tech-4",
    name: "الأسطى عادل الكهربائي",
    role: "electricity",
    phone: "01555667788",
    rating: 4.9,
    avatar: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&h=150&fit=crop",
    status: "available"
  }
];

const defaultSettings: SiteSettings = {
  siteName: "AG Group للصيانة المحلية",
  subtitle: "أسرع وأضمن منصة لحجز فنيي الصيانة المنزلية المعتمدين بأسعار محددة وضمان حقيقي.",
  contactPhone: "19600",
  workingHours: "طوال أيام الأسبوع من الساعة 8 صباحاً حتى 11 مساءً",
  promoBanner: "خصم 20% على خدمات غسيل التكييف وتعبئة الفريون لفترة محدودة!",
  isPromoActive: true,
  adminUsername: "admin",
  adminPassword: "admin123",
  subSilverPrice: 150,
  subGoldPrice: 300,
  subPlatinumPrice: 500,
  whatsappNumber: "01271762299"
};

const defaultBookings: Booking[] = [
  {
    id: "bk-101",
    customerName: "محمد عبد الله",
    customerPhone: "01009876543",
    customerAddress: "شارع التسعين، التجمع الخامس، شقة 4",
    serviceId: "plumbing",
    subServiceId: "p2",
    technicianId: "tech-3",
    date: "2026-06-15",
    timeSlot: "12:00 م - 02:00 م",
    problemDescription: "محتاج فني يركب خلاط مياه مستورد للمطبخ، وخلاط حوض الحمام يقطر مياه ومحتاج صيانة.",
    estimatedPrice: 280,
    status: "assigned",
    createdAt: "2026-06-12T15:30:00Z",
    notes: "تم التواصل وتأكيد الموعد مع العميل."
  },
  {
    id: "bk-102",
    customerName: "سارة أحمد",
    customerPhone: "01223554411",
    customerAddress: "حي المعادي، أبراج عثمان، الدور السادس",
    serviceId: "ac",
    subServiceId: "ac2",
    technicianId: "tech-2",
    date: "2026-06-14",
    timeSlot: "10:00 ص - 12:00 م",
    problemDescription: "تكييف غرفة النوم صوته عالي وما يبرد بانتظام، محتاجة تنظيف كامل وفحص غاز الفريون.",
    estimatedPrice: 200,
    status: "accepted",
    createdAt: "2026-06-13T08:15:00Z"
  }
];

// Helper to load application state
function loadData(): AppData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
      // Ensure all keys exist
      const loadedSettings = parsed.settings || defaultSettings;
      if (!loadedSettings.adminUsername) {
        loadedSettings.adminUsername = "admin";
      }
      if (!loadedSettings.adminPassword) {
        loadedSettings.adminPassword = "admin123";
      }
      if (loadedSettings.subSilverPrice === undefined) {
        loadedSettings.subSilverPrice = 150;
      }
      if (loadedSettings.subGoldPrice === undefined) {
        loadedSettings.subGoldPrice = 300;
      }
      if (loadedSettings.subPlatinumPrice === undefined) {
        loadedSettings.subPlatinumPrice = 500;
      }
      if (!loadedSettings.whatsappNumber) {
        loadedSettings.whatsappNumber = "01271762299";
      }
      // Explicitly marked as NOT a fresh server boot because DATA_FILE exists.
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
  
  // DATA_FILE does not exist -> Stateless container was reset or this is first run.
  // We mark isFreshServerBoot = true so the client knows it is safe and necessary 
  // to restore its browser localStorage backup.
  const freshSettings = { ...defaultSettings, isFreshServerBoot: true };
  return {
    services: defaultServices,
    technicians: defaultTechnicians,
    bookings: defaultBookings,
    settings: freshSettings,
    subscriptions: []
  };
}

// Helper to save application state
function saveData(data: AppData, preserveTimestamp: boolean = false) {
  try {
    if (!data.settings) {
      data.settings = { ...defaultSettings };
    }
    // Remove the temporary runtime boot flag before storing
    delete data.settings.isFreshServerBoot;

    if (!preserveTimestamp || !data.settings.lastUpdatedAt) {
      data.settings.lastUpdatedAt = Date.now();
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing to data store:", err);
  }
}

// Lazy load Gemini AI Client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      aiClient = new GoogleGenAI({ apiKey });
      console.log("Initialized GoogleGenAI client successfully.");
    } else {
      console.warn("GEMINI_API_KEY remains unset. Operating in descriptive fallback rule mode.");
    }
  }
  return aiClient;
}

function setupFavicons() {
  try {
    const imagesDir = path.join(process.cwd(), "src", "assets", "images");
    const publicDir = path.join(process.cwd(), "public");
    
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    if (fs.existsSync(imagesDir)) {
      const files = fs.readdirSync(imagesDir);
      const masterFavicon = files.find(f => f.startsWith("favicon_master_") && (f.endsWith(".jpg") || f.endsWith(".png") || f.endsWith(".jpeg")));
      
      if (masterFavicon) {
        const srcPath = path.join(imagesDir, masterFavicon);
        const targets = [
          "favicon.png",
          "favicon-16x16.png",
          "favicon-32x32.png",
          "favicon-48x48.png",
          "apple-touch-icon.png"
        ];
        
        for (const target of targets) {
          const destPath = path.join(publicDir, target);
          fs.copyFileSync(srcPath, destPath);
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
  // Setup Favicons before processing requests or middleware
  setupFavicons();

  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // API - Restore full backup state (Self-healing on Stateless platform resets)
  app.post("/api/restore", (req, res) => {
    const backupData = req.body;
    if (!backupData || !backupData.settings) {
      return res.status(400).json({ error: "بيانات النسخة الاحتياطية غير صالحة" });
    }
    // Update server state completely and preserve backup's timestamp
    saveData(backupData, true);
    console.log(`[Self-Healing] State restored from browser with timestamp: ${backupData.settings.lastUpdatedAt}`);
    res.json({ success: true, message: "تمت استعادة حالة المنصة بنجاح من النسخة الاحتياطية للمتصفح" });
  });

  // API - Get Active Layout data
  app.get("/api/data", (req, res) => {
    const data = loadData();
    res.json(data);
  });

  // API - Book Service
  app.post("/api/bookings", (req, res) => {
    const data = loadData();
    const newBooking: Booking = {
      id: "bk-" + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString(),
      status: "pending",
      ...req.body
    };

    data.bookings.unshift(newBooking);
    saveData(data);
    res.status(201).json(newBooking);
  });

  // API - Create Technician Subscription
  app.post("/api/subscriptions", (req, res) => {
    const data = loadData();
    if (!data.subscriptions) {
      data.subscriptions = [];
    }
    const newSub = {
      id: "sub-" + Math.floor(1000 + Math.random() * 9000),
      createdAt: new Date().toISOString(),
      status: "pending",
      paymentMethod: "wallet",
      systemWalletNumber: data.settings?.whatsappNumber || "01271762299",
      ...req.body
    };

    data.subscriptions.unshift(newSub);
    saveData(data);
    res.status(201).json(newSub);
  });

  // API - Approve Technician Subscription (Promote to active worker/technician with their Avatar!)
  app.post("/api/subscriptions/:id/approve", (req, res) => {
    const { id } = req.params;
    const data = loadData();
    if (!data.subscriptions) data.subscriptions = [];
    const subIdx = data.subscriptions.findIndex(s => s.id === id);
    if (subIdx === -1) {
      return res.status(404).json({ error: "Subscription request not found" });
    }

    const sub = data.subscriptions[subIdx];
    sub.status = "approved";

    // Build the corresponding active technician profile
    const newWorker: Technician = {
      id: "tech-" + Math.floor(1000 + Math.random() * 9000),
      name: sub.name,
      role: sub.role,
      phone: sub.phone || sub.customerWalletNumber || "01000000000",
      rating: 5.0,
      avatar: sub.avatarUrl || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop",
      status: "available"
    };

    if (!data.technicians) data.technicians = [];
    data.technicians.push(newWorker);
    
    saveData(data);
    res.json({ success: true, subscription: sub, worker: newWorker });
  });

  // API - Reject Technician Subscription (Decline / Reject client request)
  app.post("/api/subscriptions/:id/reject", (req, res) => {
    const { id } = req.params;
    const data = loadData();
    if (!data.subscriptions) data.subscriptions = [];
    const subIdx = data.subscriptions.findIndex(s => s.id === id);
    if (subIdx === -1) {
      return res.status(404).json({ error: "Subscription request not found" });
    }

    data.subscriptions[subIdx].status = "rejected";
    saveData(data);
    res.json({ success: true, subscription: data.subscriptions[subIdx] });
  });

  // API - Delete Technician Subscription (Admin action to delete rejected / cleanup)
  app.delete("/api/subscriptions/:id", (req, res) => {
    const { id } = req.params;
    const data = loadData();
    if (!data.subscriptions) data.subscriptions = [];
    const subIdx = data.subscriptions.findIndex(s => s.id === id);
    if (subIdx === -1) {
      return res.status(404).json({ error: "Subscription request not found" });
    }

    data.subscriptions.splice(subIdx, 1);
    saveData(data);
    res.json({ success: true, message: "Subscription request deleted successfully" });
  });

  // API - Update Booking Status / Edit (Admin action)
  app.put("/api/bookings/:id", (req, res) => {
    const { id } = req.params;
    const data = loadData();
    const index = data.bookings.findIndex(b => b.id === id);

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

  // API - Set Services list (Admin Action)
  app.put("/api/services", (req, res) => {
    const data = loadData();
    data.services = req.body;
    saveData(data);
    res.json({ success: true, services: data.services });
  });

  // API - Set Technicians (Admin Action)
  app.put("/api/workers", (req, res) => {
    const data = loadData();
    data.technicians = req.body;
    saveData(data);
    res.json({ success: true, technicians: data.technicians });
  });

  // API - Update Site Content settings (Admin Action)
  app.put("/api/settings", (req, res) => {
    const data = loadData();
    data.settings = req.body;
    saveData(data);
    res.json({ success: true, settings: data.settings });
  });

  // API - Gemini Smart Troubleshooter Assistant
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;
    const data = loadData();

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getAIClient();

    // Context setting for Arabic Maintenance Assistant
    const serviceContext = data.services.map(s => {
      const subList = s.subServices.map(sub => `- ${sub.name} (السعر المتوقع: ${sub.price} جنيه)`).join("\n");
      return `مجموعة: ${s.name} (${s.id})\nالوصف: ${s.description}\nالخدمات التشخيصية الفرعية:\n${subList}`;
    }).join("\n\n");

    const technicianContext = data.technicians.map(t => `${t.name} (${t.role}) - تقييم ${t.rating} - الحالة ${t.status}`).join("\n");

    const systemPrompt = `أنت مساعد ذكي مخصص لمنصة الصيانة المنزلية "${data.settings.siteName}".
مهمتك هي مساعدة العميل العربي في تشخيص مشكلته المنزلية بلطف واحترافية وبطريقة مشجعة وتفاعلية جداً.
الخدمات المتاحة لدينا في النظام حالياً وأسعارها هي بالتفصيل:
${serviceContext}

الفنيين المتاحين حالياً:
${technicianContext}

ساعات العمل والسياسة: ${data.settings.workingHours}، هاتف الاتصال: ${data.settings.contactPhone}.

التعليمات الهامة لإجابتك:
1. تحدث باللغة العربية المحكية اللطيفة الممزوجة بلهجة مصرية أو مبسطة يفهمها العميل العربي بسهولة.
2. وجه العميل من خلال محادثته لمعرفة تفاصيل المشكلة (مثلاً: لو تسريب مياه، اسأله عن مكان التسريب وسرعته، لو تكييف اسأله تبريد ولا صوت.. إلخ).
3. بعد تشخيص المشكلة بنسبة معقولة، رشح له الخدمة المناسبة والفرعية المحددة وسعرها من القائمة السابقة مباشرة، واقترح عليه حجز موعد.
4. إجابتك يجب أن تكون منسقة ومنظمة بشكل رائع عبر نقاط كالنجم والفقرات القصيرة.
5. في نهاية التشخيص، ذكره بكتابة طلبه في الاستمارة لحجز فني مختص، أو اعرض عليه أن يقوم بكتابة الاسم لطلب فني فوراً.
6. إذا لم تتوفر لدينا الخدمة المناسبة لمشكلته (مثل تكسير جدران ضخم أو بناء خرساني)، وضح له ذلك بلباقة.`;

    if (ai) {
      try {
        const formattedHistory = (history || []).map((msg: any) => ({
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
        const text = response.text || "عذراً، لم أستطع تحليل طلبك بدقة. يرجى توضيح المشكلة لمساعدتك!";
        res.json({ reply: text });
      } catch (err: any) {
        console.error("Gemini API Error:", err);
        res.json({ 
          reply: "أهلاً بك! لقد واجهت صعوبة مؤقتة في استخدام الذكاء الاصطناعي لتشخيص مشكلتك الذكية بسبب إعدادات الخادم، ولكنني متاح لمساعدتك يدوياً! يسعدني جداً توجيهك لحجز إحدى خدماتنا المميزة مثل السباكة، الكهرباء، النجارة، أو صيانة التكييف بأسعار موحدة تبدأ من " + Math.min(...data.services.map(s => s.basePrice)) + " جنيه فقط."
        });
      }
    } else {
      // Offline fallback rules-based smart chat
      let replyText = "مرحباً بك! يسعدني جداً مساعدتك. ";
      const cleanMsg = message.toLowerCase();

      if (cleanMsg.includes("سباك") || cleanMsg.includes("حمام") || cleanMsg.includes("تسريب") || cleanMsg.includes("حنفية") || cleanMsg.includes("مواسير") || cleanMsg.includes("فلتر")) {
        replyText += `يبدو أنك تعاني من مشكلة متعلقة بالسباكة 💧. 
لدينا مجموعة من أفضل السباكين المعتمدين مثل الـ "الأسطى محمود السباك". 
أهم الخدمات المتوفرة:
- تركيب خلاط مياه جديد بـ 200 جنيه.
- معالجة التسريبات بـ 120 جنيه.
- تسليك الصرف بـ 150 جنيه.

هل تحب حجز فني سباكة الآن؟ يمكنك كتابة الاسم والبيانات في استمارة الحجز بالأسفل وسيقوم الفني بالانتقال إليك فوراً!`;
      } else if (cleanMsg.includes("تكييف") || cleanMsg.includes("تبريد") || cleanMsg.includes("حر") || cleanMsg.includes("فريون") || cleanMsg.includes("تكييفات")) {
        replyText += `يبدو أنك تبحث عن خدمات التكييف والتبريد ❄️. 
يمكننا مساعدتك في تنظيف التكيف غسيل كيميائي، أو تعبئة الفريون.
خدماتنا المتوفرة:
- شحن غاز الفريون بـ 850 جنيه.
- غسيل وتنظيف شامل للتكييف بـ 200 جنيه.
- تصليح مشاكل تنقيط المياه بـ 150 جنيه.

نرحب بحجزك وسيقوم "المهندس كريم التكييف" أو الفني المختص بالمتابعة معك!`;
      } else if (cleanMsg.includes("كهربا") || cleanMsg.includes("نور") || cleanMsg.includes("شورت") || cleanMsg.includes("قفلة") || cleanMsg.includes("مروحة") || cleanMsg.includes("نجف")) {
        replyText += `يبدو أن الأمر يتعلق بأعطال الكهرباء والإنارة ⚡.
لدينا فنيون مهرة مثل "الأسطى عادل الكهربائي".
أهم الخدمات السريعة:
- تصليح قفلة كهربائية بـ 250 جنيه.
- تركيب نجفة أو مروحة بـ 150 جنيه.
- تركيب مفاتيح ومكابس بـ 50 جنيه.

وفرنا لك ضماناً حقيقياً لسلامتك. يرجى ملء استمارة طلب الخدمة لنرسل لك الفني فوراً!`;
      } else if (cleanMsg.includes("نجار") || cleanMsg.includes("خشب") || cleanMsg.includes("باب") || cleanMsg.includes("دولاب") || cleanMsg.includes("كالون") || cleanMsg.includes("سرير")) {
        replyText += `أهلاً بك! تبحث عن خدمات النجارة وصيانة الأثاث 🔨.
يمكننا معالجة الأبواب التي تحتك، أو تركيب كوالين جديدة، وفك وتركيب المطابخ وغرف ايكيا.
من أهم الخدمات المتاحة:
- صيانة قفل باب أو تركيب كالون بـ 100 جنيه.
- فك وتركيب دولاب ملابس بـ 400 جنيه.
- تصليح باب خشبي بـ 120 جنيه.

يمكنك تحديد فني نجارة من قائمة الخدمات وحجز موعد يناسبك بالأسفل!`;
      } else {
        replyText += `يسعدنا جداً تقديم خدمات الصيانة المنزلية المتكاملة لك! 
نوفر حالياً خدمات:
1. 💧 السباكة والصيانة الصحية
2. ⚡ الكهرباء والإنارة
3. 🔨 النجارة وصيانة الأثاث
4. ❄️ صيانة وغسيل التكييف

ما هي المشكلة المحددة التي تواجهك اليوم ليقوم مساعدنا الذكي بتصنيفها وعرض السعر المقدر لها؟`;
      }

      res.json({ reply: replyText });
    }
  });

  // Serve static assets in development & production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
