// src/data/lessons.ts
export type Language = 'en' | 'bem' | 'nya';

export interface QuizQuestion {
  id: string;
  question: { en: string; bem: string; nya: string };
  options: { en: string[]; bem: string[]; nya: string[] };
  correctIndex: number;
  explanation: { en: string; bem: string; nya: string };
  satsReward: number;
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: { en: string; bem: string; nya: string };
  subtitle: { en: string; bem: string; nya: string };
  content: { en: string[]; bem: string[]; nya: string[] };
  xpReward: number;
  satsReward: number;
  quiz: QuizQuestion[];
  icon: string;
  color: string;
}

export interface Module {
  id: string;
  title: { en: string; bem: string; nya: string };
  description: { en: string; bem: string; nya: string };
  icon: string;
  color: string;
  gradient: string;
  lessons: Lesson[];
  order: number;
}

export const MODULES: Module[] = [
  {
    id: 'module-1',
    title: { en: 'What is Bitcoin?', bem: 'Bitcoin Nshi?', nya: 'Bitcoin Ndi Chiyani?' },
    description: {
      en: 'Understand the basics of Bitcoin and why it matters for Zambia',
      bem: 'Umfwa ifyo Bitcoin ilebomba ne cifukwa ca nomba mu Zambia',
      nya: 'Zindikirani za Bitcoin ndi chifukwa chake ku Zambia',
    },
    icon: '₿',
    color: '#F7931A',
    gradient: 'from-orange-600 to-amber-500',
    order: 1,
    lessons: [
      {
        id: 'lesson-1-1',
        moduleId: 'module-1',
        title: { en: 'Money Has a Problem', bem: 'Ndalama Ili na Chibupupu', nya: 'Ndalama Ili ndi Vuto' },
        subtitle: {
          en: 'Why the Zambian Kwacha loses value over time',
          bem: 'Ifyo Kwacha ya Zambia ilefipika inshiku sha kufita',
          nya: 'Chifukwa chake Kwacha ya Zambia imatha mtengo nthawi iliyonse',
        },
        icon: '💸',
        color: '#F7931A',
        xpReward: 100,
        satsReward: 21,
        content: {
          en: [
            'Imagine you saved K1,000 under your mattress in 2010. Today, that same K1,000 cannot buy you what it could 14 years ago. A bag of mealie meal that cost K25 then now costs over K180. This is called INFLATION — money losing its value over time.',
            'The Bank of Zambia prints more Kwacha whenever the government needs money. When more money is printed but the same amount of goods exist, each Kwacha buys LESS. Your savings slowly become worthless.',
            'This is not unique to Zambia. Every country with a central bank has this problem. The US dollar, South African Rand, Kenyan Shilling — all lose value over time. But Bitcoin is different.',
            'Bitcoin has a fixed supply. Only 21 million Bitcoin will EVER exist. No president, no central bank, no government can create more. This is enforced by mathematics and thousands of computers around the world.',
          ],
          bem: [
            'Tekanya nga mwasungile K1,000 munsi ya lupanda mu 2010. Lelo, iyo K1,000 taingafika ukusumba ifintu ifi yalefika mukukusumba myaka 14 yapita. Umuseke wa ubunga uwalikosha K25 lelo ulakosha kupita K180. Ici cibizwa INFLATION — ndalama ilefipika inshiku sha kufita.',
            'Banka ya Zambia ilaanda ndalama ya Kwacha ena napo gavumenti yacindama ndalama. Napo ndalama ilandaandwa ifintu fine fili, Kwacha ili na maka ta. Insalamu shenu pashaba nshiku bashaba.',
            'Ici tacali cokwa Zambia. Yonse mitemwa iili na banka ya pakati ilikwata ici cipingulo. Dollar ya America, Rand ya Afrika ya Kusini, Shilling ya Kenya — yonse ifipika nshiku sha kufita. Lelo Bitcoin ili inabo.',
            'Bitcoin ilikwata ukufika kwa cintu. Fye Bitcoin 21 million ifikabako ILYO LYONSE. Tawapo president, banka ya pakati, napo gavumenti ingaandamwine. Ici calindilwa na mathematic na computer ifingi kwa calo yonse.',
          ],
          nya: [
            'Ganizani munasungako K1,000 pansi pa mafuta mu 2010. Lero, K1,000 imeneyo sangakuguleni chimodzi monga munagulira zaka 14 zapita. Thumba la ufa lomwe linali K25 tsopano limakosha kupitila K180. Izi zimatchedwa INFLATION — ndalama ikutha mtengo nthawi iliyonse.',
            'Banki ya Zambia imagamba ndalama zambiri nthawi iliyonse boma likafuna ndalama. Ndalama zikagambarika zambiri koma katundu wakhalanso womwewo, Kwacha imagulapo ZOCHEPA. Ndalama yanu yosungidwa imatsala ndi thamanga pang\'ono pang\'ono.',
            'Izi si za Zambia yokha. Dziko lililonse la banki ya pakati lili ndi vuto ili. Dollar ya America, Rand ya Africa ya Kum\'mwera, Shilling ya Kenya — zonse zimatha mtengo. Koma Bitcoin ndi yasiyana.',
            'Bitcoin ili ndi kuchuluka kogwirizana. Bitcoin 21 million zokha zidzakhalapo NTHAWI ZONSE. Palibe purezidenti, banki ya pakati, kapena boma limatha kuwonjezera. Izi zikutsimikiziridwa ndi masamu ndi makonpyuta ambiri padziko lonse.',
          ],
        },
        quiz: [
          {
            id: 'q-1-1-1',
            question: {
              en: 'A bag of mealie meal cost K25 in 2010. If inflation kept rising, what would you expect to pay today?',
              bem: 'Umuseke wa ubunga walikosha K25 mu 2010. Nga inflation yalicindama, nshi uletemwa ukusumba lelo?',
              nya: 'Thumba la ufa linali K25 mu 2010. Ngati inflation ikakhalabe ikukwera, muganiza mudzakosha chingati lero?',
            },
            options: {
              en: ['About K25 still', 'About K50', 'Over K150', 'It gets cheaper'],
              bem: ['Pali K25 fyabili', 'Pali K50', 'Kupita K150', 'Ilakosha mwe'],
              nya: ['Pafupifupi K25 mkali', 'Pafupifupi K50', 'Kupitila K150', 'Imachepa mtengo'],
            },
            correctIndex: 2,
            explanation: {
              en: "Correct! Inflation means prices rise over time. The Kwacha has lost significant value, making everyday goods much more expensive than they were a decade ago.",
              bem: 'Cali celine! Inflation icitila amapelesha acindame nshiku sha kufita. Kwacha yapotele maka yayikata, ifita ifintu sha nsiku sha nsiku ukukosha ukupita kufwa miku umunine.',
              nya: 'Zoona! Inflation imatanthauza mitengo ikukwera nthawi iliyonse. Kwacha yataya mtengo waukulu, zinthu za tsiku ndi tsiku zimakosha kwambiri kuposa zaka khumi zapita.',
            },
            satsReward: 5,
          },
          {
            id: 'q-1-1-2',
            question: {
              en: 'How many Bitcoin will EVER exist in total?',
              bem: 'Bitcoin ishinga ifikabako YONSE pali bonse?',
              nya: 'Bitcoin zingati zidzakhalapo ZONSE?',
            },
            options: {
              en: ['100 million', '21 million', '1 billion', 'Unlimited'],
              bem: ['Milioni 100', 'Milioni 21', 'Bilioni 1', 'Taili na cilo'],
              nya: ['Miliyoni 100', 'Miliyoni 21', 'Biliyoni 1', 'Palibe malire'],
            },
            correctIndex: 1,
            explanation: {
              en: "21 million Bitcoin is the hard cap — written into Bitcoin's code and enforced by math. This scarcity is what gives Bitcoin its value as a savings tool.",
              bem: 'Milioni 21 ya Bitcoin ndi icilo ca cintu — caleshibwa mu code ya Bitcoin ne cilindilwa na mathematic. Ici cukulima ndi ico citila Bitcoin ukwaba maka nga nsalamu.',
              nya: 'Miliyoni 21 ya Bitcoin ndi malire okhazikika — olembedwa mu code ya Bitcoin ndikutsimikiziridwa ndi masamu. Kuchuluka kochepa uku ndiko kumapanga Bitcoin mtengo ngati chida cha kusungira.',
            },
            satsReward: 5,
          },
          {
            id: 'q-1-1-3',
            question: {
              en: 'Who controls how many Bitcoin are created?',
              bem: 'Nani ulafwaya ishingi sha Bitcoin shilandaandwa?',
              nya: 'Ndani amalamulira kuchuluka kwa Bitcoin?',
            },
            options: {
              en: [
                'The Zambian government',
                'Bitcoin developers',
                'Mathematics and the network',
                'The US Federal Reserve',
              ],
              bem: [
                'Gavumenti ya Zambia',
                'Abalanda Bitcoin',
                'Mathematic ne network',
                'Federal Reserve ya America',
              ],
              nya: [
                'Boma la Zambia',
                'Olemba Bitcoin',
                'Masamu ndi network',
                'Federal Reserve ya America',
              ],
            },
            correctIndex: 2,
            explanation: {
              en: "No single person or government controls Bitcoin's supply. The rules are enforced by mathematics and thousands of computers (nodes) worldwide. That's the beauty of it.",
              bem: "Tawapo umuntu umo napo gavumenti iyafwaya ukubomba Bitcoin. Amitwalo alindilwa na mathematic ne computer ifingi (nodes) pali calo yonse. Uwo ndi ubwino bwayo.",
              nya: "Palibe munthu mmodzi kapena boma lolamulira kuchuluka kwa Bitcoin. Malamulo amatsimikiziridwa ndi masamu ndi makonpyuta ambiri (nodes) padziko lonse. Izi ndizo kukongola kwake.",
            },
            satsReward: 5,
          },
        ],
      },
      {
        id: 'lesson-1-2',
        moduleId: 'module-1',
        title: { en: 'Bitcoin is Digital Gold', bem: 'Bitcoin ndi Golidi ya Digital', nya: 'Bitcoin ndi Golide ya Digito' },
        subtitle: {
          en: 'Why Bitcoin stores value better than anything',
          bem: 'Ifyo Bitcoin ilasungisha maka ukupita icintu conse',
          nya: 'Chifukwa chake Bitcoin imasungira mtengo bwino kuposa chilichonse',
        },
        icon: '🥇',
        color: '#D4AF37',
        xpReward: 100,
        satsReward: 21,
        content: {
          en: [
            'For thousands of years, people used gold as money. Gold is valuable because: it is scarce (hard to mine), durable (does not rust), divisible (can be cut into pieces), and portable (you can carry it). Bitcoin has ALL these properties — plus superpowers gold does not have.',
            'Bitcoin is MORE scarce than gold. We know exactly how many Bitcoin exist (about 19.7 million mined so far) and exactly how many will ever exist (21 million). With gold, new deposits can always be discovered.',
            'Bitcoin is MORE divisible. One Bitcoin can be divided into 100 million pieces called Satoshis (sats). So even if one Bitcoin costs millions of Kwacha, you can still buy K50 worth of Bitcoin. You do NOT need to buy a whole Bitcoin.',
            "Bitcoin is MORE portable. Carrying K100,000 in cash across Zambia is risky. But you can carry 1 Bitcoin worth millions anywhere in the world using just a 12-word phrase in your head. No customs, no banks, no one can stop you.",
          ],
          bem: [
            'Imyaka ifingi, abantu balisumbapo golidi nga ndalama. Golidi ili na maka pantu: icula ukupanga (yakona ukulimba), ilikomilwa (itapola), ilinganya (ilingapwa mu ncende), ne ilicindama (ulingaikala nayo). Bitcoin ili na mikondo YONSE iyi — nati na maka ayo golidi tayakwata.',
            'Bitcoin icula UKUPITA golidi. Twiishibe ifingi sha Bitcoin ishi filipo (pali 19.7 million ifilandwa ubu) ne ifingi ifikabako (milioni 21). Ne golidi, incende iipya ingatangilwa.',
            'Bitcoin ILINGANYIKE UKUPITA. Bitcoin iyo imo ilinganyishiwa mu ncende 100 million zibizwa Satoshis (sats). Nomba napo Bitcoin iyo imo ilakosha Kwacha ifingi, ulashingula ukusumba K50 sha Bitcoin. TAUPANGA ukusumba Bitcoin yonse.',
            'Bitcoin ICINDAMA UKUPITA. Ukwikala na K100,000 mu ndalama ku Zambia yonse kuli mu cishinka. Lelo ulingaikala na Bitcoin iyo imo yakosha ifingi apo calo yonse unasumba na mafunde 12 ashibiwe mu mutwe. Taili na customs, banka, napo umuntu angaimye.',
          ],
          nya: [
            'Zaka zizinji, anthu anagwiritsa ntchito golide ngati ndalama. Golide ili ndi mtengo chifukwa: ndi yochepa (yokavuta kupeza), yokhala (siyola), yogawidwa (ingathedwe gagawidwa), ndipo yokhala nazo (mutha kunyamula). Bitcoin ili ndi ZONSE izi — ndiponso mphamvu zomwe golide ilibe.',
            'Bitcoin ndi YOCHEPA kuposa golide. Tidziwa bwinobwino Bitcoin zingati zilipo (pafupifupi 19.7 miliyoni zamingidwa mpaka hano) ndi zingati zidzakhalapo (21 miliyoni). Ndi golide, mapinda atsopano amatha kupezeka.',
            'Bitcoin INGATHEKEDWE GAGAWIDWA kuposa golide. Bitcoin imodzi ingathekedwe gagawidwa zigawo 100 miliyoni zotchedwa Satoshis (sats). Chifukwa chake ngakhale Bitcoin imodzi ikosha Kwacha zambiri, mutha kugula K50 ya Bitcoin. SIMUFUNIKA kugula Bitcoin yonse.',
            'Bitcoin INGATHE KUNYAMULIDWA kuposa golide. Kunyamula K100,000 ya ndalama ku Zambia yonse kuli ngozazo. Koma mutha kunyamula Bitcoin imodzi yolingana ndi miliyoni kulikonse padziko lonse pogwiritsa ntchito mawu 12 okha mu mutu wanu. Palibe kasitamo, banki, kapena munthu angakuzatani.',
          ],
        },
        quiz: [
          {
            id: 'q-1-2-1',
            question: {
              en: 'What is the smallest unit of Bitcoin called?',
              bem: 'Incende yono mwi ya Bitcoin ibizwa shani?',
              nya: 'Gawo laling\'ono kwambiri la Bitcoin limatchedwa chiyani?',
            },
            options: {
              en: ['A Bit', 'A Satoshi', 'A Wei', 'A Kwacha'],
              bem: ['Bit', 'Satoshi', 'Wei', 'Kwacha'],
              nya: ['Bit', 'Satoshi', 'Wei', 'Kwacha'],
            },
            correctIndex: 1,
            explanation: {
              en: 'A Satoshi (sat) is 1/100,000,000th of a Bitcoin — named after Bitcoin\'s mysterious creator, Satoshi Nakamoto. You can buy just a few sats with small amounts of Kwacha!',
              bem: "Satoshi (sat) ndi 1/100,000,000 ya Bitcoin iyo imo — ibizwa pa Satoshi Nakamoto, uwapanga Bitcoin. Ulingasumba sats inono na Kwacha ubupene!",
              nya: 'Satoshi (sat) ndi 1/100,000,000 ya Bitcoin imodzi — lotchedwa pa dzina la wolenga Bitcoin wachiseri, Satoshi Nakamoto. Mutha kugula ma sats ochepa ndi Kwacha yochepa!',
            },
            satsReward: 5,
          },
          {
            id: 'q-1-2-2',
            question: {
              en: 'You want to send K50,000 worth of Bitcoin from Lusaka to someone in Ndola. What do you need?',
              bem: 'Ufwaya ukutuma Bitcoin yakosha K50,000 ku Lusaka ukuya kuli umusebenza mu Ndola. Nshi ufwaya?',
              nya: 'Mufuna kutumiza Bitcoin yolingana ndi K50,000 kuchoka ku Lusaka kupita kwa munthu ku Ndola. Mufuna chiyani?',
            },
            options: {
              en: ['A bank account and ID', 'A Bitcoin wallet and internet', 'Permission from Bank of Zambia', 'A registered money transfer business'],
              bem: ['Account ya banka ne ID', 'Wallet ya Bitcoin ne internet', 'Ilabila ku Banka ya Zambia', 'Biznesi ya kutuma ndalama yalembwa'],
              nya: ['Akaunti ya banki ndi ID', 'Wallet ya Bitcoin ndi intaneti', 'Chilolezo cha Banki ya Zambia', 'Bizinesi yolembetsa yotumiza ndalama'],
            },
            correctIndex: 1,
            explanation: {
              en: 'With Bitcoin, all you need is a wallet app (like Phoenix or Wallet of Satoshi) and internet. No bank, no ID checks, no waiting 3 days for transfers.',
              bem: 'Na Bitcoin, ufwaya fye app ya wallet (nga Phoenix napo Wallet of Satoshi) ne internet. Tawapo banka, tawapo ukashibila ID, tawapo ukulindila inshiku 3 ukutuma.',
              nya: 'Ndi Bitcoin, chimene mufuna ndi app ya wallet (monga Phoenix kapena Wallet of Satoshi) ndi intaneti. Palibe banki, palibe kuyang\'anira ID, palibe kudikira masiku 3 kutumiza.',
            },
            satsReward: 5,
          },
          {
            id: 'q-1-2-3',
            question: {
              en: 'What property does Bitcoin have that gold does NOT have?',
              bem: 'Ubupali ki ubwa Bitcoin ubwabako ubwa golidi UBUSHABA?',
              nya: 'Cholinga chiti cha Bitcoin chomwe golide CHILIBE?',
            },
            options: {
              en: ['Scarcity', 'Divisibility', 'Can be sent anywhere in seconds via internet', 'Physical weight'],
              bem: ['Ukulaula', 'Ukulinganyishiwa', 'Ingashalwa apo calo yonse mu masekendi na internet', 'Ubufumo bwa cintu'],
              nya: ['Kuchepa', 'Kugawidwa', 'Ingatumizidwe kulikonse mu sekunde ndi intaneti', 'Kulemera kwa thupi'],
            },
            correctIndex: 2,
            explanation: {
              en: "Gold cannot be emailed. Bitcoin can be sent anywhere in the world in seconds, 24/7, without any bank or government permission. That's a superpower gold doesn't have.",
              bem: 'Golidi ingashingwa email te. Bitcoin ingashingwa apo calo yonse mu masekendi, masaa 24/inshiku 7, na cilabilo cila ca banka napo gavumenti. Uwo ndi umaka uwo golidi utakwata.',
              nya: 'Golide sangaitumizidwa pa imelo. Bitcoin ingatumizidwe kulikonse padziko lonse mu sekunde, 24/7, popanda chilolezo cha banki kapena boma. Ndi mphamvu imene golide ilibe.',
            },
            satsReward: 5,
          },
        ],
      },
    ],
  },
  {
    id: 'module-2',
    title: { en: 'The Lightning Network', bem: 'Network ya Lightning', nya: 'Network ya Lightning' },
    description: {
      en: 'Learn how to send Bitcoin instantly and cheaply',
      bem: 'Penda ukutemwa ukutuma Bitcoin mwansanga ne ku busha',
      nya: 'Phunzirani kutumiza Bitcoin mwachangu ndi mwamtengo wochepa',
    },
    icon: '⚡',
    color: '#FFB830',
    gradient: 'from-yellow-500 to-orange-400',
    order: 2,
    lessons: [
      {
        id: 'lesson-2-1',
        moduleId: 'module-2',
        title: { en: 'Bitcoin is Slow — Lightning is Fast', bem: 'Bitcoin Ili Butenga — Lightning Yapwa', nya: 'Bitcoin Imakawuka — Lightning Imadzuta' },
        subtitle: {
          en: 'How Lightning makes Bitcoin work for everyday payments',
          bem: 'Ifyo Lightning icita Bitcoin ukubomba ku mapelesha ya nsiku sha nsiku',
          nya: 'Momwe Lightning imapangira Bitcoin kugwira ntchito pa malipiro a tsiku ndi tsiku',
        },
        icon: '⚡',
        color: '#FFB830',
        xpReward: 100,
        satsReward: 21,
        content: {
          en: [
            'The main Bitcoin network (called the blockchain) is like a national road. It is very secure and trustworthy, but it takes 10-60 minutes to confirm a payment and fees can be expensive when the network is busy. You would not use a national road to walk to your neighbour\'s house.',
            'The Lightning Network is built ON TOP of Bitcoin. Think of it as a network of express lanes. When you open a Lightning channel with someone, you can send payments back and forth INSTANTLY — like an Airtel Money transfer but with no fees and no limits.',
            'Lightning is perfect for small everyday payments: buying food at the market, tipping a musician, paying for internet data, or sending K20 to a friend. Payments settle in milliseconds.',
            'Real example from Zambia: Barbershops in Lusaka are starting to accept Lightning payments. You get a haircut, the barber shows you a QR code, you scan it on your phone and — done. Payment confirmed before you even put your phone back in your pocket.',
          ],
          bem: [
            "Network ya Bitcoin ya pakati (ibizwa blockchain) ndi nga musebo wa calo. Uli na buchinshi bwakosa ne kwikala kwamaka, lelo icitela ifikusha 10-60 iminit ukupokelela ubutumbulusha bwa ndalama ne mipando ingaba mikata napo network ilitete. Taungasumba musebo wa calo ukuya ku munyumba wa ntangwa yako.",
            'Network ya Lightning yapangwa PA MUULU wa Bitcoin. Tekanya nga misebo ya kushantanta. Napo mushikile channel ya Lightning na mutende, mulingashala ndalama mukuya nakuza MWANSANGA — nga kutuma Airtel Money lelo ukwabako mipando ne ukwabako icilo.',
            'Lightning isuma ku mapelesha amabwe ya nsiku sha nsiku: ukusumba ifico ku maaketi, ukupa imipashi ku musebezi wa nyimbo, ukubomba internet, napo ukutuma K20 ku chibusa. Amatumbulusha alafika mu milliseconds.',
            'Cikwata ca Zambia: Amashopo ya kukesha umutwe mu Lusaka yalanda ukupokelela amatumbulusha ya Lightning. Ukekesha umutwe, uwa kukesha akalengapo QR code, ukashibila na telefoni yako ne — mwansanga. Ubutumbulusha buakilwa mwansanga napo ushibwa ukabika telefoni mu cipimo chako.',
          ],
          nya: [
            'Network yaikulu ya Bitcoin (yotchedwa blockchain) ili ngati msewu wadziko. Ndi wotetezeka kwambiri ndi wokhulupirika, koma imatenga mphindi 10-60 kutsimikizira malipiro ndipo mitengo ingakhale yotuwa network ikakhala yotakasika. Musagwiritse ntchito msewu wadziko kupita kunyumba kwa mnansi wanu.',
            'Lightning Network izimiwa PA NDENDEMEKO ya Bitcoin. Ganizani ngati network ya misewu yachangu. Mukatsegula channel ya Lightning ndi munthu, mutha kutumizana ndalama MWACHANGU — monga kutumiza kwa Airtel Money koma popanda mitengo ndi palibe malire.',
            'Lightning ndiyoyenera malipiro ochepa a tsiku ndi tsiku: kugula chakudya ku msika, kupatsa woimba nyimbo nsonga, kulipira data ya intaneti, kapena kutumiza K20 kwa mnzanu. Malipiro amakwaniritsidwa mu milliseconds.',
            'Chitsanzo chenicheni kuchoka Zambia: Masepa ozeta m\'tsogolo mu Lusaka akuyamba kulandira malipiro a Lightning. Muzeta, wozeta akukuletserani QR code, muisaka ndi foni yanu ndipo — zatha. Malipiro atsimikiziridwa musanathenso kuika foni yanu m\'thumba.',
          ],
        },
        quiz: [
          {
            id: 'q-2-1-1',
            question: {
              en: 'How long does a Lightning Network payment take to confirm?',
              bem: 'Ubutumbulusha bwa Network ya Lightning buitika inshiku ishinga ukukilwa?',
              nya: 'Malipiro a Lightning Network atenga nthawi yayimalire yingati kutsimikiziridwa?',
            },
            options: {
              en: ['10-60 minutes', '1-3 days', 'Less than 1 second', '24 hours'],
              bem: ['Iminit 10-60', 'Inshiku 1-3', 'Pansi ya sekendi iyo imo', 'Amasaa 24'],
              nya: ['Mphindi 10-60', 'Masiku 1-3', 'Zochepa kuposa sekunde 1', 'Maola 24'],
            },
            correctIndex: 2,
            explanation: {
              en: 'Lightning payments are nearly instant — milliseconds! This makes it perfect for everyday purchases like paying for a meal or buying airtime.',
              bem: 'Amatumbulusha ya Lightning yapwa mwansanga — milliseconds! Ici citila ukusuma ku mapelesha ya nsiku sha nsiku nga ukubomba ndalama ya cakurya napo ukusumba airtime.',
              nya: 'Malipiro a Lightning ndi achangu kwambiri — milliseconds! Izi zimapangitsa kukwanira kugula katundu wa tsiku ndi tsiku monga kulipira chakudya kapena kugula airtime.',
            },
            satsReward: 5,
          },
          {
            id: 'q-2-1-2',
            question: {
              en: 'What is Lightning built on top of?',
              bem: 'Lightning yapangwa pa muulu wa nshi?',
              nya: 'Lightning yazimidwa pa ndendemeko ya chiyani?',
            },
            options: {
              en: ['Airtel Money', 'Bitcoin', 'The US Dollar', 'MTN MoMo'],
              bem: ['Airtel Money', 'Bitcoin', 'Dollar ya America', 'MTN MoMo'],
              nya: ['Airtel Money', 'Bitcoin', 'Dollar ya America', 'MTN MoMo'],
            },
            correctIndex: 1,
            explanation: {
              en: 'Lightning is a Layer 2 built on top of Bitcoin. It uses Bitcoin as its money but adds speed and low fees. It is 100% Bitcoin — just faster.',
              bem: 'Lightning ndi Layer 2 yapangwa pa muulu wa Bitcoin. Isumbapo Bitcoin nga ndalama yayo lelo icindamisha umwansakata ne mipando imi. Ndi 100% Bitcoin — fye yapwa ukupita.',
              nya: 'Lightning ndi Layer 2 yozimidwa pa ndendemeko ya Bitcoin. Imagwiritsa ntchito Bitcoin ngati ndalama yake koma imaonjezera liwiro ndi mitengo yochepa. Ndi 100% Bitcoin — yodzuta chabe.',
            },
            satsReward: 5,
          },
          {
            id: 'q-2-1-3',
            question: {
              en: 'A barber in Lusaka shows you a QR code to pay for a haircut in sats. What do you need on your phone?',
              bem: 'Uwa kukesha umutwe mu Lusaka akulengela QR code ukubomba ndalama ya kesha mu sats. Nshi ufwaya pa telefoni yako?',
              nya: 'Wozeta ku Lusaka akukuletserani QR code kulipira kuzeta m\'tsogolo mu sats. Mufuna chiyani pa foni yanu?',
            },
            options: {
              en: ['An Airtel Money account', 'A Lightning wallet app', 'A bank account', 'A credit card'],
              bem: ['Account ya Airtel Money', 'App ya wallet ya Lightning', 'Account ya banka', 'Kaadi ya credit'],
              nya: ['Akaunti ya Airtel Money', 'App ya wallet ya Lightning', 'Akaunti ya banki', 'Kaadi ya credit'],
            },
            correctIndex: 1,
            explanation: {
              en: "A Lightning wallet like Phoenix Wallet, Wallet of Satoshi, or Breez lets you scan QR codes and pay in sats instantly. Download one for free — no bank account required!",
              bem: 'Wallet ya Lightning nga Phoenix Wallet, Wallet of Satoshi, napo Breez ikupelela ukushibila QR codes ne kubomba ndalama ya sats mwansanga. Ilanda ukuishita fye — taupanga account ya banka!',
              nya: 'Wallet ya Lightning monga Phoenix Wallet, Wallet of Satoshi, kapena Breez ikukupatsani kusaka QR codes ndi kulipira mu sats mwachangu. Tsitsani imodzi kwaulere — palibe akaunti ya banki yofunikira!',
            },
            satsReward: 5,
          },
        ],
      },
    ],
  },
  {
    id: 'module-3',
    title: { en: 'Your Own Keys', bem: 'Ifungulo Lyako', nya: 'Makiyi Anu Okha' },
    description: {
      en: 'How to truly own your Bitcoin — self custody explained',
      bem: 'Ukubomba ukwishika Bitcoin yako — self custody ilandululwa',
      nya: 'Momwe mungakhale ndi Bitcoin yanu weniweni — self custody ikufotokozedwa',
    },
    icon: '🔑',
    color: '#10B981',
    gradient: 'from-emerald-600 to-teal-500',
    order: 3,
    lessons: [
      {
        id: 'lesson-3-1',
        moduleId: 'module-3',
        title: { en: 'Not Your Keys, Not Your Coins', bem: 'Tali Fya Webo Ifungulo, Tali Fyobe Fyo Fya', nya: 'Si Makiyi Anu, Si Ndalama Zanu' },
        subtitle: {
          en: 'Why you must control your own Bitcoin wallet',
          bem: 'Ifyo upanga ukufwaya wallet yako ya Bitcoin',
          nya: 'Chifukwa chake muyenera kulamulidwa wallet yanu ya Bitcoin',
        },
        icon: '🔐',
        color: '#10B981',
        xpReward: 120,
        satsReward: 34,
        content: {
          en: [
            'In 2022, a crypto exchange called FTX collapsed. Over $8 billion of customer funds disappeared overnight. Millions of people lost their savings because they trusted a company to hold their Bitcoin. The Bitcoin was real — but it was not in their hands.',
            'Keeping Bitcoin on an exchange (like a crypto app) is like depositing your money in a bank that can go bankrupt. The exchange holds your Bitcoin — you just see a number on a screen. If the exchange closes or gets hacked, your Bitcoin is gone.',
            'Self-custody means YOU hold the actual keys to your Bitcoin. Your wallet generates a "seed phrase" — 12 or 24 random words. Anyone with those words can access your Bitcoin. You write them down on paper and keep them safe.',
            'With self-custody: no exchange can freeze your funds, no government can confiscate your Bitcoin without physical force, no hack on a company server affects you. Your Bitcoin is truly yours.',
          ],
          bem: [
            "Mu 2022, exchange ya crypto yibizwa FTX yaipoloka. Ndalama ya customers yapita ku $8 bilioni yaipotela ubushiku bwa milo. Abantu ifingi balipotele insalamu shabo pantu balesumina kampuni ukusungisha Bitcoin yabo. Bitcoin yali celine — lelo yali mu maboko yabo te.",
            'Ukusungisha Bitcoin ku exchange (nga app ya crypto) ndi nga ukuika ndalama yako mu banka ingapoloka. Exchange iyasungisha Bitcoin yako — iwe ulabona fye inomba pa cifungo. Napo exchange yakufunga napo yaibwa, Bitcoin yako yaipotela.',
            'Self-custody ifitila IWE ukwaba ifungulo lya cine lya Bitcoin yako. Wallet yako ilanda "seed phrase" — amafunde 12 napo 24 yafyafya. Uyo onse na ayo mafunde angafika ku Bitcoin yako. Uyashibapo pa pepa ne ukayasungisha bwino.',
            'Na self-custody: tawapo exchange ingafumye ndalama yako, tawapo gavumenti ingabe Bitcoin yako ukwabako amaka ya cintu, tawapo ibwato lya server ya kampuni likufikila iwe. Bitcoin yako ndi ya cine yako.',
          ],
          nya: [
            'Mu 2022, exchange ya crypto yotchedwa FTX inagwa. Ndalama ya ogula zopitilira $8 biliyoni zinatha usiku umodzi. Anthu ambiri anataya ndalama zawo chifukwa ankakhulupirira kampuni kusungira Bitcoin yawo. Bitcoin inali yeniyeni — koma sinali m\'manja mwawo.',
            'Kusungira Bitcoin pa exchange (monga app ya crypto) ndi ngati kusungira ndalama yanu ku banki yomwe ingathe kulephera. Exchange imasungira Bitcoin yanu — inu mumaona nambala yokha pa chiwindo. Exchange ikatsekeka kapena kuba, Bitcoin yanu imatha.',
            'Self-custody imatanthauza INU mukusunga makiyi enieni a Bitcoin yanu. Wallet yanu imapanga "seed phrase" — mawu 12 kapena 24 osankhidwa. Aliyense ndi mawu amenewa angathe kupeza Bitcoin yanu. Alemba pa pepala ndi kuisungira bwino.',
            'Ndi self-custody: palibe exchange imatha kugwidza ndalama zanu, palibe boma limatha kulanda Bitcoin yanu popanda mphamvu, palibe kubaya kwa seva ya kampuni kukukhudzani. Bitcoin yanu ndi yanu weniweni.',
          ],
        },
        quiz: [
          {
            id: 'q-3-1-1',
            question: {
              en: 'What happened to FTX customers\' Bitcoin in 2022?',
              bem: 'Nshi fyacitikile ku Bitcoin ya customers ya FTX mu 2022?',
              nya: 'Chiyani chinachitikira Bitcoin ya ogula a FTX mu 2022?',
            },
            options: {
              en: ['It doubled in value', 'They lost it when FTX collapsed', 'The government returned it', 'Nothing happened'],
              bem: ['Yaindile maka', 'Baipotele FTX naipo yakaipoloka', 'Gavumenti yaibweshako', 'Takwacitike cintu'],
              nya: ['Inadoubla mtengo', 'Anataya FTX itagwa', 'Boma linaibwezeretsa', 'Palibe chinachitika'],
            },
            correctIndex: 1,
            explanation: {
              en: "FTX was one of the largest crypto exchanges. When it collapsed in 2022, customers' funds were gone. This is why 'Not your keys, not your coins' is such an important rule.",
              bem: "FTX yali iyo imbi ya exchanges ishamba sha crypto. Naipo yakaipoloka mu 2022, ndalama ya customers yaipotela. Ici ndi ifyo 'Tali fya webo ifungulo, tali fyobe' ndi mulandu osa bwino.",
              nya: "FTX inali imodzi mwa ma exchange akulu kwambiri a crypto. Inagwa mu 2022, ndalama za ogula zinatayika. Ndi chifukwa chake 'Si makiyi anu, si ndalama zanu' ndi lamulo lofunikira kwambiri.",
            },
            satsReward: 8,
          },
          {
            id: 'q-3-1-2',
            question: {
              en: 'What is a "seed phrase"?',
              bem: '"Seed phrase" nshi?',
              nya: '"Seed phrase" ndi chiyani?',
            },
            options: {
              en: ['Your exchange password', '12-24 words that give access to your Bitcoin wallet', 'A Bitcoin address', 'A QR code'],
              bem: ['Password yako ya exchange', 'Amafunde 12-24 ayo apela ukufika ku wallet yako ya Bitcoin', 'Adiresi ya Bitcoin', 'QR code'],
              nya: ['Chinsinsi cha exchange yanu', 'Mawu 12-24 opatsidwa mwayi wa kupita ku wallet yanu ya Bitcoin', 'Adiresi ya Bitcoin', 'QR code'],
            },
            correctIndex: 1,
            explanation: {
              en: "Your seed phrase is the master key to your Bitcoin. Write it on paper, never take a photo of it, never store it digitally. If you lose it, you lose access to your Bitcoin forever.",
              bem: 'Seed phrase yako ndi ifungulo lyakosa lya Bitcoin yako. Ishibapo pa pepa, tausalayo ifoto yayo, tauyailekele pa digital. Napo wailupika, uyalupika ukufika ku Bitcoin yako lyonse.',
              nya: 'Seed phrase yanu ndi kiyi yaukulu ya Bitcoin yanu. Ilembeni pa pepala, musatenga chithunzi chake, musaisungire pa digito. Mutalosa, mutalosapo mwayi wa kupita ku Bitcoin yanu kwamuyaya.',
            },
            satsReward: 8,
          },
          {
            id: 'q-3-1-3',
            question: {
              en: 'Which is the SAFEST way to store Bitcoin long-term?',
              bem: 'Nshi ndi icendeshi BWINO ukusungisha Bitcoin inshiku iziinda?',
              nya: 'Njira YOTETEZEKA KWAMBIRI yosungira Bitcoin kwa nthawi yayitali ndi iti?',
            },
            options: {
              en: ['Leave it on an exchange app', 'Use a self-custody wallet with your seed phrase stored safely', 'Send it to a friend for safekeeping', 'Keep it in your email'],
              bem: ['Iyileke ku app ya exchange', 'Sumina wallet ya self-custody na seed phrase yako yasungiwa bwino', 'Itume ku chibusa ukuyisungisha', 'Iyileke mu email yako'],
              nya: ['Isiyeni pa app ya exchange', 'Gwiritsani ntchito wallet ya self-custody ndi seed phrase yanu yosungidwa bwino', 'Itumizeni kwa mnzanu kuyisunga', 'Isungeni mu imelo yanu'],
            },
            correctIndex: 1,
            explanation: {
              en: 'Self-custody wallets like Blue Wallet, Phoenix, or a hardware wallet (Coldcard, Trezor) keep YOU in control. Your seed phrase = your Bitcoin. Guard it with your life.',
              bem: 'Wallets sha self-custody nga Blue Wallet, Phoenix, napo hardware wallet (Coldcard, Trezor) icitila IWE ukwaba na maka. Seed phrase yako = Bitcoin yako. Iyisungisha bwino.',
              nya: 'Ma wallet a self-custody monga Blue Wallet, Phoenix, kapena hardware wallet (Coldcard, Trezor) amakusungani INU ndi lamulo. Seed phrase yanu = Bitcoin yanu. Ilondeoni ndi moyo wanu.',
            },
            satsReward: 8,
          },
        ],
      },
    ],
  },
  {
    id: 'module-4',
    title: { en: 'Sending & Receiving Bitcoin', bem: 'Ukutuma na Ukupokelela Bitcoin', nya: 'Kutumiza ndi Kulandira Bitcoin' },
    description: {
      en: 'Practice sending and receiving sats in real life',
      bem: 'Yezya ukutuma ne ukupokelela sats mu ubumi bwa cine',
      nya: 'Dziwa kutumiza ndi kulandira sats mu moyo weniweni',
    },
    icon: '📲',
    color: '#3B82F6',
    gradient: 'from-blue-600 to-indigo-500',
    order: 4,
    lessons: [
      {
        id: 'lesson-4-1',
        moduleId: 'module-4',
        title: { en: 'Your First Bitcoin Transaction', bem: 'Ubutumbulusha Bwako Bwa Kubalilapo Bwa Bitcoin', nya: 'Ntumizano Yanu Yoyamba ya Bitcoin' },
        subtitle: {
          en: 'Step by step: how to send and receive sats',
          bem: 'Intanshi pa intanshi: ukutuma ne ukupokelela sats',
          nya: 'Njira iliyonse: momwe mumatumizira ndi kulandira sats',
        },
        icon: '📲',
        color: '#3B82F6',
        xpReward: 150,
        satsReward: 50,
        content: {
          en: [
            'Every Bitcoin wallet has two things: a PUBLIC address (like your bank account number — share it freely to receive money) and a PRIVATE key (like your PIN — NEVER share this with anyone).',
            'To RECEIVE Bitcoin: Open your wallet app → tap "Receive" → share your QR code or address. Anyone can send sats to that address. For Lightning, you generate an "invoice" — a specific payment request for a specific amount.',
            'To SEND Bitcoin: Open your wallet → tap "Send" → scan the receiver\'s QR code or paste their address → enter the amount → confirm. Double-check the address before sending! Bitcoin transactions are irreversible.',
            'Good wallets for beginners in Zambia: Phoenix Wallet (Lightning, simple), Wallet of Satoshi (easiest Lightning wallet), Blue Wallet (on-chain + Lightning). All free, all available on Android.',
          ],
          bem: [
            "Wallet yonse ya Bitcoin ikwata ifyo fibili: Adiresi ya PACHILINDE (nga nomba ya account ya banka yako — ishilile bulubutu ukupokelela ndalama) na ifungulo lya PABUSHIKU (nga PIN yako — TAUYILE kulumfwisha uyu onse).",
            'Ukupokelela Bitcoin: Yashilile app ya wallet yako → kabula "Receive" → shilila QR code yako napo adiresi. Uyu onse alingutuma sats ku iyo adiresi. Ku Lightning, ulanda "invoice" — icipendo ca cintu ca ndalama ca cintu.',
            'Ukutuma Bitcoin: Yashilile wallet yako → kabula "Send" → shibila QR code ya uyo upokela napo paste adiresi yabo → ikamu cipimo → akilila. Kashibila adiresi libali ukutuma! Amatumbulusha ya Bitcoin takabwesha.',
            'Wallets iisuma ku batangila mu Zambia: Phoenix Wallet (Lightning, yafumilapo), Wallet of Satoshi (wallet ya Lightning yafumilapo ukupita yonse), Blue Wallet (on-chain + Lightning). Yonse ifye, yonse ili pa Android.',
          ],
          nya: [
            'Wallet iliyonse ya Bitcoin ili ndi zinthu ziwiri: Adiresi ya PAGULU (monga nambala ya akaunti ya banki yanu — igawaneni mwaulere kulandira ndalama) ndi kiyi YACHINSINSI (monga PIN yanu — MUSAIUDZE munthu aliyense).',
            'Kulandira Bitcoin: Tsegulanit app ya wallet yanu → dinani "Receive" → gawanani QR code yanu kapena adiresi. Aliyense atha kutumiza sats ku adiresi imeneyo. Ku Lightning, mupanga "invoice" — pempho lapadera la malipiro la kuchuluka kokhazikika.',
            'Kutumiza Bitcoin: Tsegulanit wallet yanu → dinani "Send" → sakani QR code ya wolandira kapena paste adiresi yawo → lowetsani kuchuluka → tsimikizirani. Onetsetsani adiresi musanatumize! Ntumizano za Bitcoin sizibwezeretseka.',
            'Ma wallet abwino kwa oyamba ku Zambia: Phoenix Wallet (Lightning, yosavuta), Wallet of Satoshi (wallet yosavuta kwambiri ya Lightning), Blue Wallet (on-chain + Lightning). Zonse zaulere, zonse zili pa Android.',
          ],
        },
        quiz: [
          {
            id: 'q-4-1-1',
            question: {
              en: 'A friend wants to send you sats. What do you share with them?',
              bem: 'Chibusa chalufuna ukutumako sats. Nshi ushilila nabo?',
              nya: 'Mnzanu akufuna kukutumizani sats. Mumagawana nawo chiyani?',
            },
            options: {
              en: ['Your private key', 'Your seed phrase', 'Your public address or QR code', 'Your wallet password'],
              bem: ['Ifungulo lyako lya pabushiku', 'Seed phrase yako', 'Adiresi yako ya pachilinde napo QR code', 'Password ya wallet yako'],
              nya: ['Kiyi yanu yachinsinsi', 'Seed phrase yanu', 'Adiresi yanu ya pagulu kapena QR code', 'Chinsinsi cha wallet yanu'],
            },
            correctIndex: 2,
            explanation: {
              en: "Share your PUBLIC address or QR code to receive. NEVER share your private key or seed phrase — these give complete control of your Bitcoin to whoever has them.",
              bem: 'Shilila adiresi yako ya PACHILINDE napo QR code ukupokelela. TAUYILE kulumfwisha ifungulo lyako lya pabushiku napo seed phrase — aya apela maka yonse ya Bitcoin yako kuli uyo uwayakwata.',
              nya: 'Gawanani adiresi yanu ya PAGULU kapena QR code kulandira. MUSAUDZE kiyi yanu yachinsinsi kapena seed phrase — izi zimapatsa lamulo lonse la Bitcoin yanu kwa aliyense ndi izo.',
            },
            satsReward: 10,
          },
          {
            id: 'q-4-1-2',
            question: {
              en: 'You accidentally sent Bitcoin to the wrong address. What happens?',
              bem: 'Watuma Bitcoin ku adiresi yabipa ukwabako amano. Nshi kucitika?',
              nya: 'Mwatumiza Bitcoin ku adiresi yolakwika mwangozi. Chiyani chichitika?',
            },
            options: {
              en: ['The network returns it automatically', 'You can cancel within 24 hours', 'The Bitcoin is gone — transactions are irreversible', 'Customer service can reverse it'],
              bem: ['Network yabweshako yekayeka', 'Ulingafuta mu masaa 24', 'Bitcoin yaipotela — amatumbulusha taabwesha', 'Balipelo balabweshako'],
              nya: ['Network imabwezeretsa yokha', 'Mutha kuletsa mu maola 24', 'Bitcoin yatayika — ntumizano sizibwezeretseka', 'Sevisi ya ogula ingathe kuibwezeretsa'],
            },
            correctIndex: 2,
            explanation: {
              en: "Bitcoin transactions are IRREVERSIBLE. Always double-check the address before sending. Copy-paste addresses, don't type them manually. This is why Bitcoin makes you responsible.",
              bem: 'Amatumbulusha ya Bitcoin TAABWESHA. Kashibila adiresi libali ukutuma. Copy-paste adiresi, taishibeko maboko yako. Ici ndi ifyo Bitcoin ikupela ubutekateka.',
              nya: 'Ntumizano za Bitcoin SIZIBWEZERETSEKA. Onetsetsani adiresi nthawi zonse musanatumize. Copy-paste adiresi, musazilembe modzimodzi. Ndi chifukwa chake Bitcoin ikukupatsani udindo.',
            },
            satsReward: 10,
          },
          {
            id: 'q-4-1-3',
            question: {
              en: 'Which Bitcoin wallet app is recommended for beginners in Zambia?',
              bem: 'App shinga sha wallet ya Bitcoin ilandulwa ku batangila mu Zambia?',
              nya: 'App iti ya wallet ya Bitcoin ilimbikizsidwa kwa oyamba ku Zambia?',
            },
            options: {
              en: ['Binance (exchange)', 'Phoenix Wallet or Wallet of Satoshi', 'A bank mobile app', 'WhatsApp'],
              bem: ['Binance (exchange)', 'Phoenix Wallet napo Wallet of Satoshi', 'App ya mobilephone ya banka', 'WhatsApp'],
              nya: ['Binance (exchange)', 'Phoenix Wallet kapena Wallet of Satoshi', 'App ya foni ya banki', 'WhatsApp'],
            },
            correctIndex: 1,
            explanation: {
              en: 'Phoenix and Wallet of Satoshi are simple Lightning wallets — download for free on Android, no ID required, no bank account needed. Perfect starting points for any Zambian.',
              bem: 'Phoenix na Wallet of Satoshi ndi wallets sha Lightning isfumilapo — shita fye pa Android, tapunga ID, tapunga account ya banka. Intanshi isuma ku Musambia uyo onse.',
              nya: 'Phoenix ndi Wallet of Satoshi ndi ma wallet osavuta a Lightning — tsitisani kwaulere pa Android, palibe ID yofunikira, palibe akaunti ya banki yokhalapo. Malo abwino oyambira kwa Muzambia aliyense.',
            },
            satsReward: 10,
          },
        ],
      },
    ],
  },
  {
    id: 'module-5',
    title: { en: 'Saving in Bitcoin', bem: 'Ukusunga mu Bitcoin', nya: 'Kusungira mu Bitcoin' },
    description: {
      en: 'Build generational wealth with sats — the Zambian way',
      bem: 'Manga ubuumi bwa ndalama ya cizazi na sats — mu njila ya Zambia',
      nya: 'Manga chuma cha mibadwo ndi sats — njira ya Zambia',
    },
    icon: '🌱',
    color: '#8B5CF6',
    gradient: 'from-purple-600 to-violet-500',
    order: 5,
    lessons: [
      {
        id: 'lesson-5-1',
        moduleId: 'module-5',
        title: { en: 'Stack Sats, Build Wealth', bem: 'Sunga Sats, Manga Ubuumi', nya: 'Sungirani Sats, Mangani Chuma' },
        subtitle: {
          en: 'How to save in Bitcoin even with a small income',
          bem: 'Ukusunga mu Bitcoin napo na ndalama ubupene',
          nya: 'Momwe musungirira mu Bitcoin ngakhale ndi ndalama yochepa',
        },
        icon: '🌱',
        color: '#8B5CF6',
        xpReward: 150,
        satsReward: 50,
        content: {
          en: [
            '"Stacking sats" means buying small amounts of Bitcoin regularly. You do not need K10,000 to start. You can buy K50 worth of sats today. The strategy is Dollar-Cost Averaging (DCA): buy a fixed amount every week or month, regardless of the price.',
            'Why DCA works: When Bitcoin price goes down, your K50 buys more sats. When price goes up, your sats are worth more. Over time, you accumulate sats regardless of short-term price movements. This removes the stress of trying to "time the market."',
            'A Zambian example: If you bought K200 of Bitcoin every month for the past 4 years — even through all the price crashes — your sats would be worth significantly more today than what you put in. Time in the market beats timing the market.',
            'Where to buy sats in Zambia: Peer-to-peer (P2P) platforms like Paxful or Bisq allow Zambian mobile money, even without a bank account. Alternatively, someone in the Bitcoin Zambia community can help you on-ramp safely.',
          ],
          bem: [
            '"Ukusunga sats" ifitila ukusumba Bitcoin ibupene mu nsiku sha kulondolola. Tapunga K10,000 ukutangila. Ulingasumba K50 sha sats lelo. Ukulungama ndi Dollar-Cost Averaging (DCA): sumba cipimo ca cine ilyo lyonse napo icalo ca ndalama.',
            'Ifyo DCA ilabomba: Napo ipelesha lya Bitcoin lilashikila pasi, K50 yako ilasumba sats iziinda. Napo ipelesha licindama, sats shako shasuma ukupita. Nshiku sha kufita, ulasunga sats ukwabako ukubona na kambalambal ka ipelesha. Ici icindula amabele ya kufwaya "inshita yabwinshi ya maaketi."',
            'Cikwata ca Zambia: Napo mwasumba K200 sha Bitcoin ilyo lyonse mu myezi 4 yapita — napo pali amapoloko yonse ya ipelesha — sats shenu shali ne maka ukupita ifintu mwaiika lelo. Inshiku sha maaketi ishinda inshita ya maaketi.',
            'Apo usumbila sats mu Zambia: Platforms sha Peer-to-peer (P2P) nga Paxful napo Bisq ilingano mobile money ya Zambia, napo ukwabako account ya banka. Napo wabula, umuntu mu cimindano ca Bitcoin Zambia alingakusambilisha ukutangila bucincile.',
          ],
          nya: [
            '"Kusungira sats" kumatanthauza kugula ndalama yochepa ya Bitcoin nthawi zonse. Simufunika K10,000 kuyamba. Mutha kugula K50 ya sats lero. Njira ndi Dollar-Cost Averaging (DCA): gulani kuchuluka kokhazikika sabata iliyonse kapena mwezi, mosayang\'ana ndi mtengo.',
            'Chifukwa chake DCA imagwira ntchito: Mtengo wa Bitcoin ukaobuka, K50 yanu imagula sats zochuluka. Mtengo ukakwera, sats zanu zili ndi mtengo waukulu. Nthawi yonse, mumagromesa sats mosayang\'ana ndi kusintha kwa mtengo. Izi zimachotsa nkhawa yokeysa "nthawi yabwino ya msika."',
            'Chitsanzo cha Zambia: Mutagula K200 ya Bitcoin mwezi uliwonse zaka 4 zapita — ngakhale kudzera m\'kugwa konse kwa mtengo — sats zanu zikhala ndi mtengo wochuluka kwambiri lero kuposa zimene munaikako. Nthawi yayitali ku msika imachepera nthawi yabwino ya msika.',
            'Kumene mugulira sats ku Zambia: Ma platform a Peer-to-peer (P2P) monga Paxful kapena Bisq alola mobile money ya Zambia, ngakhale popanda akaunti ya banki. Kapena kuti, munthu mu cimindano ca Bitcoin Zambia angathandizeni kuyamba bwino.',
          ],
        },
        quiz: [
          {
            id: 'q-5-1-1',
            question: {
              en: 'What does "DCA" (Dollar-Cost Averaging) mean in Bitcoin saving?',
              bem: '"DCA" (Dollar-Cost Averaging) icitila nshi mu kusunga Bitcoin?',
              nya: '"DCA" (Dollar-Cost Averaging) imatanthauza chiyani mu kusungira Bitcoin?',
            },
            options: {
              en: ['Buy all your Bitcoin at once at the best price', 'Buy a fixed small amount regularly, regardless of price', 'Only buy when Bitcoin price is low', 'Save in dollars instead of Bitcoin'],
              bem: ['Sumba Bitcoin yako yonse kwa kamo ku ipelesha libwinshi', 'Sumba cipimo cimo ubupene mu nsiku sha kulondolola, ukwabako ukubona na ipelesha', 'Sumba fye napo ipelesha lya Bitcoin lili pasi', 'Sunga mu dollars uko mu Bitcoin'],
              nya: ['Gulani Bitcoin yanu yonse kamodzi pa mtengo wabwino', 'Gulani kuchuluka kochepa kokhazikika nthawi zonse, mosayang\'ana ndi mtengo', 'Gulani chabe mtengo wa Bitcoin ukakhala woonetsa', 'Sungani mu dollars m\'malo mwa Bitcoin'],
            },
            correctIndex: 1,
            explanation: {
              en: "DCA is the most stress-free strategy. Buy K100 of Bitcoin every month no matter what the price is. Over years, this builds significant wealth without gambling on price movements.",
              bem: 'DCA ndi ukulungama ukulaula amabele ukupita yonse. Sumba K100 sha Bitcoin ilyo lyonse ukwabako ukubona na ipelesha. Mu myaka, ici manga ubuumi bwasuma ukwabako ukusuba na kambalambal ka ipelesha.',
              nya: 'DCA ndi njira yopanda nkhawa kwambiri. Gulani K100 ya Bitcoin mwezi uliwonse mtengo ukhale bwanji. Zaka zikadutsa, izi zimamanga chuma chachikulu popanda kusewera ndi kusintha kwa mtengo.',
            },
            satsReward: 10,
          },
          {
            id: 'q-5-1-2',
            question: {
              en: 'What is the minimum amount of Bitcoin you can buy?',
              bem: 'Cipimo cono mwi sha Bitcoin iyo ulingasumba nshi?',
              nya: 'Kuchuluka kochepa kwambiri kwa Bitcoin komwe mutha kugula ndi chiyani?',
            },
            options: {
              en: ['You must buy at least 1 full Bitcoin', 'Minimum is 0.1 Bitcoin', 'Any amount — even K20 worth of sats', 'You need at least $100'],
              bem: ['Upanga ukusumba cai nimba Bitcoin yomo yonse', 'Cipimo cono mwi ndi 0.1 Bitcoin', 'Cipimo cili conse — napo sats sha K20', 'Upanga cai nimba $100'],
              nya: ['Muyenera kugula Bitcoin yomwe imodzi', 'Ochepa ndi 0.1 Bitcoin', 'Kuchuluka kulikonse — ngakhale sats za K20', 'Mufunika pafupifupi $100'],
            },
            correctIndex: 2,
            explanation: {
              en: "Because 1 Bitcoin = 100 million satoshis, you can buy a fraction for any amount. K20, K50, K100 — it all buys you real Bitcoin (satoshis). You do not need to buy a whole coin!",
              bem: 'Pantu Bitcoin iyo imo = satoshis 100 milioni, ulingasumba cipande ku cipimo cili conse. K20, K50, K100 — yonse ilusumba Bitcoin ya cine (satoshis). Tapunga ukusumba peni yonse!',
              nya: 'Chifukwa Bitcoin imodzi = satoshis 100 miliyoni, mutha kugula gawo la kuchuluka kulikonse. K20, K50, K100 — zonse zimakugulani Bitcoin yeniyeni (satoshis). Simufunika kugula ndalama yonse!',
            },
            satsReward: 10,
          },
          {
            id: 'q-5-1-3',
            question: {
              en: 'Which P2P platform allows Zambians to buy Bitcoin using mobile money?',
              bem: 'Platform shinga sha P2P ishingilila Abasambia ukusumba Bitcoin na mobile money?',
              nya: 'Platform iti ya P2P ilolera Azambia kugula Bitcoin pogwiritsa ntchito mobile money?',
            },
            options: {
              en: ['Only US bank transfers work', 'Paxful or Bisq', 'You must use a credit card', 'BoZ approved apps only'],
              bem: ['Fye kutuma kwa banka ya America kukabomba', 'Paxful napo Bisq', 'Upanga ukusumba na kaadi ya credit', 'Fye apps isalilwe na BoZ'],
              nya: ['Zomangana za banki ya America zokha zimagwira ntchito', 'Paxful kapena Bisq', 'Muyenera kugwiritsa ntchito kaadi ya credit', 'Apps zotsimikiziridwa ndi BoZ zokha'],
            },
            correctIndex: 1,
            explanation: {
              en: "Paxful and Bisq support peer-to-peer trading with Airtel Money and MTN MoMo. The Bitcoin Zambia community also helps people buy their first sats safely through trusted members.",
              bem: 'Paxful na Bisq isamba ukutuminana kwa abantu na Airtel Money na MTN MoMo. Cimindano ca Bitcoin Zambia icikonso cisambilisha abantu ukusumba sats shabo sha kubalilapo bucincile kupitila abalongwe baaminwa.',
              nya: 'Paxful ndi Bisq amathandizira malonda a anthu ndi anthu ndi Airtel Money ndi MTN MoMo. Cimindano ca Bitcoin Zambia icithandiziranso anthu kugula sats zawo zoyamba mwachindunji kudzera mwa mamembala okulupirika.',
            },
            satsReward: 10,
          },
        ],
      },
    ],
  },
];

export const getAllLessons = (): Lesson[] => {
  return MODULES.flatMap((m) => m.lessons);
};

export const getLessonById = (id: string): Lesson | undefined => {
  return getAllLessons().find((l) => l.id === id);
};

export const getModuleById = (id: string): Module | undefined => {
  return MODULES.find((m) => m.id === id);
};
