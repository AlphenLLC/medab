import { getMember } from "./teamData.js";

let tumGorseller = {};
try {
  tumGorseller = import.meta.glob(
    "/src/assets/etkinlikler/**/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}",
    { eager: true, import: "default" },
  );
} catch (e) {
  tumGorseller = {};
}

const getGorsel = (etkinlikId, isimOnEki, varsayilan = "") => {
  const bulunan = Object.entries(tumGorseller).find(([path]) => {
    const dosyaAdi = path.split("/").pop().toLowerCase();
    return (
      path.includes(`/${etkinlikId}/`) &&
      dosyaAdi.startsWith(isimOnEki.toLowerCase())
    );
  });

  return bulunan ? bulunan[1] : varsayilan;
};

const getGaleri = (etkinlikId) => {
  return Object.entries(tumGorseller)
    .filter(([path]) => {
      const dosyaAdi = path.split("/").pop().toLowerCase();
      const buEtkinlikMi = path.includes(`/${etkinlikId}/`);
      const ozelGorselMi =
        dosyaAdi.startsWith("kapak") ||
        dosyaAdi.startsWith("hero") ||
        dosyaAdi.startsWith("icerik");
      return buEtkinlikMi && !ozelGorselMi;
    })
    .sort(([pathA], [pathB]) =>
      pathA.localeCompare(pathB, undefined, {
        numeric: true,
        sensitivity: "base",
      }),
    )
    .map(([, url]) => url);
};

export const eventCatalog = [
  /* MedAB Paintball Etkinliği 2026 */
  {
    id: "paintball-etkinligi-2026",
    baslik: "MEDAB PAINTBALL ETKİNLİĞİ",
    durum: "bitti",
    tarih: "24 Ekim 2026",
    yer: "Natural Paintball & Laser Tag, Maltepe",
    aciklama:
      "Medeniyet Akademik ve Bilimsel Faaliyetler Kulübü olarak üyelerimizle bir araya gelmek, sosyalleşmek ve takım ruhunu eğlenceli bir atmosferde yaşamak amacıyla Paintball Etkinliği düzenledik.",
    resim: getGorsel("paintball-etkinligi-2026", "kapak"),
    heroResim: getGorsel("paintball-etkinligi-2026", "hero"),
    basvuruLinki: "",

    icerik: [
      { tip: "baslik", metin: "MEDAB PAINTBALL ETKİNLİĞİ" },
      {
        tip: "paragraf",
        metin:
          "Medeniyet Akademik ve Bilimsel Faaliyetler Kulübü olarak üyelerimizle bir araya gelmek, sosyalleşmek ve takım ruhunu eğlenceli bir atmosferde yaşamak amacıyla Paintball Etkinliği düzenledik.",
      },
      {
        tip: "paragraf",
        metin:
          "24 Ekim Cumartesi günü Maltepe'de bulunan Natural Paintball & Laser Tag tesisinde gerçekleştirdiğimiz organizasyonda üyelerimiz heyecan ve hareket dolu bir gün geçirdi. Tatlı bir rekabetin yaşandığı sahada takımlarını kuran katılımcılarımız, hem kendi stratejilerini belirleyip birlikte hareket etmenin hem de doyasıya eğlenmenin keyfini çıkardı.",
      },
      {
        tip: "resim",
        url: getGorsel("paintball-etkinligi-2026", "icerik-1"),
        alt: "Paintball Etkinliği - Natural Paintball Maltepe",
      },
      {
        tip: "paragraf",
        metin:
          "Bol kahkaha ve güzel anılarla tamamladığımız bu etkinliğe katılan herkese teşekkür ediyor, MedAB çatısı altında yepyeni organizasyonlarda tekrar buluşmayı sabırsızlıkla bekliyoruz.",
      },
      {
        tip: "galeri",
        gorseller: getGaleri("paintball-etkinligi-2026"),
      },
    ],
  },

  /* Belgrad Ormanı Yürüyüşü 2026 */
  {
    id: "belgrad-ormani-yuruyusu-2026",
    baslik: "BELGRAD ORMANI YÜRÜYÜŞÜ",
    durum: "bitti",
    tarih: "10 Ekim 2026",
    yer: "Belgrad Ormanı, Sarıyer",
    aciklama:
      "Akademik ve Bilimsel Faaliyetler Kulübü (MedAB) olarak şehrin kalabalığından uzaklaşıp doğayla buluşmak ve üyelerimizle samimi bir ortamda sosyalleşmek amacıyla Belgrad Ormanı Yürüyüşü etkinliğimizi düzenledik.",
    resim: getGorsel("belgrad-ormani-yuruyusu-2026", "kapak"),
    heroResim: getGorsel("belgrad-ormani-yuruyusu-2026", "hero"),
    basvuruLinki: "",

    icerik: [
      { tip: "baslik", metin: "BELGRAD ORMANI YÜRÜYÜŞÜ" },
      {
        tip: "paragraf",
        metin:
          "Akademik ve Bilimsel Faaliyetler Kulübü (MedAB) olarak şehrin kalabalığından uzaklaşıp doğayla buluşmak ve üyelerimizle samimi bir ortamda sosyalleşmek amacıyla Belgrad Ormanı Yürüyüşü etkinliğimizi düzenledik.",
      },
      {
        tip: "paragraf",
        metin:
          "10 Ekim Cumartesi günü Belgrad Ormanı'nda gerçekleştirdiğimiz organizasyonda yaklaşık 5-6 kilometrelik parkurda yaptığımız yürüyüş boyunca hem doğanın ve temiz havanın tadını çıkardık, hem de sandviç ve meyve suyu ikramlarımız eşliğinde bol bol sohbet etme imkanı bulduk.",
      },
      {
        tip: "resim",
        url: getGorsel("belgrad-ormani-yuruyusu-2026", "icerik-1"),
        alt: "Belgrad Ormanı Yürüyüşü",
      },
      {
        tip: "paragraf",
        metin:
          "Yeşillikler içinde, huzurlu ve keyifli bir gün geçirdiğimiz bu etkinliğe katılan tüm üyelerimize teşekkür ediyor; MedAB’ın etkinliklerinde tekrardan görüşmek için sabırsızlıkla bekliyoruz.",
      },
      {
        tip: "galeri",
        gorseller: getGaleri("belgrad-ormani-yuruyusu-2026"),
      },
    ],
  },

  /* Yılın İlk Açık Hava Sineması 2026 */
  {
    id: "acik-hava-sinemasi-2026",
    baslik: "YILIN İLK AÇIK HAVA SİNEMASI",
    durum: "bitti",
    tarih: "9 Ekim 2026",
    yer: "Büyük Bahçe, Güney Kampüs",
    aciklama:
      "Akademik ve Bilimsel Faaliyetler Kulübü olarak yeni döneme keyifli bir başlangıç yapmak ve yoğun ders temposuna bir mola vermek amacıyla, İMÜ Sinema Kulübü iş birliğiyle “Yılın İlk Açık Hava Sineması” etkinliğini düzenledik.",
    resim: getGorsel("acik-hava-sinemasi-2026", "kapak"),
    heroResim: getGorsel("acik-hava-sinemasi-2026", "hero"),
    basvuruLinki: "",

    icerik: [
      { tip: "baslik", metin: "YILIN İLK AÇIK HAVA SİNEMASI" },
      {
        tip: "paragraf",
        metin:
          "Akademik ve Bilimsel Faaliyetler Kulübü olarak yeni döneme keyifli bir başlangıç yapmak ve yoğun ders temposuna bir mola vermek amacıyla, İMÜ Sinema Kulübü iş birliğiyle “Yılın İlk Açık Hava Sineması” etkinliğini düzenledik.",
      },
      {
        tip: "paragraf",
        metin:
          "9 Ekim Cuma günü Güney Kampüs’te gerçekleştirdiğimiz organizasyonda, sinema tarihinin unutulmaz yapımlarından Forrest Gump eşliğinde öğrencilerimizle bir araya geldik. Açık havanın keyfini çıkardığımız bu özel akşamda; patlamış mısır ve çiğ köfte ikramlarımız eşliğinde sadece bir film izlemekle kalmadık, edilen samimi sohbetler ve paylaşılan güzel anılarla günümüzü renklendirme fırsatı bulduk.",
      },
      {
        tip: "resim",
        url: getGorsel("acik-hava-sinemasi-2026", "icerik-1"),
        alt: "Açık Hava Sineması - Güney Kampüs Büyük Bahçe",
      },
      {
        tip: "paragraf",
        metin:
          "Bu güzel akşamı bizimle paylaşan tüm katılımcılarımıza teşekkür ediyor, MedAB çatısı altında bir araya geleceğimiz yeni etkinliklerde yeniden buluşmayı heyecanla bekliyoruz.",
      },
      {
        tip: "galeri",
        gorseller: getGaleri("acik-hava-sinemasi-2026"),
      },
    ],
  },

  /* Commonworks Propaganda 2026*/
  {
    id: "medab-tanisma-etkinligi-2026",
    baslik: "MEDAB TANIŞMA ETKİNLİĞİ",
    durum: "bitti",
    tarih: "26 Eylül 2026",
    yer: "İmesta Coffee & Roastery, Süreyya Plajı",
    aciklama:
      "Medeniyet Akademik ve Bilimsel Faaliyetler Kulübü olarak yeni döneme keyifli bir başlangıç yapmak ve yeni üyelerimizle bir araya gelmek amacıyla MedAB Tanışma Etkinliği’ni düzenledik.",
    resim: getGorsel("medab-tanisma-etkinligi-2026", "kapak"),
    heroResim: getGorsel("medab-tanisma-etkinligi-2026", "hero"),
    basvuruLinki: "",

    icerik: [
      { tip: "baslik", metin: "MEDAB TANIŞMA ETKİNLİĞİ" },
      {
        tip: "paragraf",
        metin:
          "Medeniyet Akademik ve Bilimsel Faaliyetler Kulübü olarak yeni döneme keyifli bir başlangıç yapmak ve yeni üyelerimizle bir araya gelmek amacıyla MedAB Tanışma Etkinliği’ni düzenledik.",
      },
      {
        tip: "paragraf",
        metin:
          "26 Eylül Cumartesi günü, İmesta Coffee & Roastery’de gerçekleştirdiğimiz bahar temalı etkinlikte MedAB üyeleri bir araya gelerek yeni insanlarla tanışma ve keyifli vakit geçirme fırsatı buldu.",
      },
      {
        tip: "resim",
        url: getGorsel("medab-tanisma-etkinligi-2026", "icerik-1"),
        alt: "Tanışma Etkinliği - İmesta Coffee",
      },
      {
        tip: "paragraf",
        metin:
          "Etkinlik boyunca düzenlenen masa oyunları ve tanışma aktiviteleri sayesinde üyeler birbirleriyle daha yakından tanışırken, fotoğraf köşesi ve ikramlarla keyifli anlar paylaşıldı. Gün boyunca gerçekleşen sohbetler ve samimi atmosfer, MedAB ekibinin yeni dönemine güzel bir başlangıç oluşturdu. Etkinliğimize katılan tüm üyelerimize teşekkür ediyor, yeni dönemde MedAB çatısı altında birlikte geçireceğimiz güzel anları sabırsızlıkla bekliyoruz.",
      },
      {
        tip: "galeri",
        gorseller: getGaleri("medab-tanisma-etkinligi-2026"),
      },
    ],
  },

  /* MedAB Tanıtım Haftası 2026 */
  {
    id: "medab-tanitim-haftasi-2026",
    baslik: "MEDAB TANITIM HAFTASI",
    durum: "bitti",
    tarih: "16-21-22 Eylül 2026",
    yer: "Tıp Fakültesi & Kuzey Kampüs",
    aciklama:
      "Kulübün tanıtılması ve öğrencilerle bir araya gelinmesi amacıyla düzenlenen MedAB Tanıtım Haftası kapsamında üç farklı tanıtım standı gerçekleştirildi.",
    resim: getGorsel("medab-tanitim-haftasi-2026", "kapak"),
    heroResim: getGorsel("medab-tanitim-haftasi-2026", "hero"),
    basvuruLinki: "",

    icerik: [
      { tip: "baslik", metin: "MEDAB TANITIM HAFTASI" },
      {
        tip: "paragraf",
        metin:
          "Medeniyet Akademik ve Bilimsel Faaliyetler Kulübü, yeni döneme yeni üyeleriyle birlikte başladı. Kulübün tanıtılması ve öğrencilerle bir araya gelinmesi amacıyla düzenlenen MedAB Tanıtım Haftası kapsamında üç farklı tanıtım standı gerçekleştirildi.",
      },
      {
        tip: "paragraf",
        metin:
          "Tanıtım faaliyetlerinin ilki Tıp Fakültesi binasında düzenlenirken, üniversitenin yeni öğrencilerine yönelik gerçekleştirilen oryantasyon haftası kapsamında da iki ayrı tanıtım standı açıldı. Standlarda öğrencilerle bir araya gelinerek MedAB’ın çalışma alanları, ekipleri ve yeni dönemde gerçekleştirilmesi planlanan çalışmalar hakkında bilgi paylaşıldı.",
      },
      {
        tip: "resim",
        url: getGorsel("medab-tanitim-haftasi-2026", "icerik-1"),
        alt: "MedAB Tanıtım Standı ve Oryantasyon",
      },
      {
        tip: "paragraf",
        metin:
          "Bilimsel merakı ve öğrenme kültürünü merkeze alan MedAB, tıp öğrencilerinin akademik ve sosyal gelişimlerini desteklemeyi; öğrencilerin farklı alanlarda bilgi ve deneyim kazanabilecekleri, birlikte üretebilecekleri ve kendilerini geliştirebilecekleri bir ekip ortamı oluşturmayı amaçlıyor.",
      },
      {
        tip: "paragraf",
        metin:
          "Tanıtım haftası boyunca MedAB’a gösterilen yoğun ilgiyle birlikte kulüp, yeni dönemde 103 yeni üyesiyle çalışmalarına devam ediyor. MedAB ailesine katılan tüm yeni üyelerimize hoş geldiniz diyor, yeni dönemde birlikte öğrenecek, üretecek ve gelişecek olmanın heyecanını taşıyoruz.",
      },
      {
        tip: "galeri",
        gorseller: getGaleri("medab-tanitim-haftasi-2026"),
      },
    ],
  },

  /*Adli Tip Sempozyumu 2026*/
  {
    id: "adli-tip-sempozyumu",
    baslik: "ADLİ TIP SEMPOZYUMU",
    durum: "bitti",
    tarih: "4 Nisan 2026",
    yer: "Aşık Paşa Konferans Salonu, Güney Kampüs",
    aciklama: "Medeniyet Tıp Fakültesi'nin ÜNİDES onaylı ilk etkinliği.",
    resim: getGorsel("adli-tip-sempozyumu", "kapak"),
    heroResim: getGorsel("adli-tip-sempozyumu", "hero"),
    basvuruLinki: "https://forms.gle/ornek",

    icerik: [
      { tip: "baslik", metin: "ADLİ TIP SEMPOZYUMU" },
      {
        tip: "paragraf",
        metin:
          "MedAB olarak 4 Nisan 2026 tarihinde Aşık Paşa Konferans Salonu’nda Adli Tıp Sempozyumu'muzu gerçekleştirdik. Fakültemizin Gençlik ve Spor Bakanlığı ÜNİDES (Üniversite Öğrenci Toplulukları İş Birliği ve Destek Programı) onaylı ilk etkinliğini gerçekleştirmiş olmak bizim için çok gurur vericiydi. Organizasyonumuz, Hukukçular Derneği’nin değerli destekleriyle düzenlendi. 28 farklı üniversiteden ve 7 ayrı bölümden toplam 310 katılımcıyı bir araya getiren bu sempozyum, tıp ile hukuk disiplinlerini aynı çatı altında buluşturdu.",
      },
      {
        tip: "resim",
        url: getGorsel("adli-tip-sempozyumu", "icerik-1"),
        alt: "Konferans salonu",
      },
      { tip: "baslik", metin: "İçerik" },
      {
        tip: "paragraf",
        metin:
          "Programımızın açılış konuşmalarını İMÜ Tıp Fakültesi Dekanı Prof. Dr. Sadrettin Pençe, Sempozyum Program Koordinatörü Dr. Öğr. Üyesi Ömer Turan ve Sempozyum Başkanı Güleda Kanarya gerçekleştirdi. Sempozyumumuz, adli tıp alanında uzman isimlerin katılımıyla gerçekleşen üç temel oturumdan oluştu. Sempozyumun ilk oturumunda Dr. Öğr. Üyesi Yusuf Atan, Prof. Dr. İbrahim Üzün ve Av. Esat Yılmaz; tıbbi uygulamalardaki hukuki sorumlulukları, malpraktis sınırlarını ve bilirkişilik mekanizmalarını ele aldı. Sempozyumun ikinci oturumunda ise Prof. Dr. İbrahim Üzün, Prof. Dr. Ahmet Yıldız ve Av. Esat Yılmaz; adli tıp alanında karşılaşılan etik ikilemleri, mesleki sorumlulukları ve etik kuralların uygulanabilirliğini tartıştı. Sempozyumun son oturumunda ise Prof. Dr. Ahmet Yıldız, Prof. Dr. İbrahim Üzün ve Av. Esat Yılmaz; adli tıp alanında güncel gelişmeleri, yeni teknolojilerin etkilerini ve gelecekteki yönelimleri ele aldı.",
      },
      {
        tip: "resim",
        url: getGorsel("adli-tip-sempozyumu", "icerik-2"),
        alt: "Konferans salonu",
      },
      {
        tip: "paragraf",
        metin:
          "Teorik anlatımların ve akademik paylaşımların yanı sıra katılımcılarımıza özel 8 bilimsel ve 7 sosyal atölye organize edildi. Bilimsel atölyeler kapsamında; Prof. Dr. Murat Nihat Arslan tarafından yürütülen Kan Lekesi Model Analizi Atölyesi’nde olay yeri bulgularının değerlendirilmesi ve kan lekelerinin oluşum mekanizmaları ayrıntılı olarak ele alındı. Doç. Dr. Hasan Turan Karatepe’nin Kabul ve Kararlılık Atölyesi’nde stres yönetimi, dikkat kontrolü ve bunların klinik karar alma süreçlerine etkileri aktarıldı. Dr. Öğr. Üyesi Ömer Turan tarafından yürütülen Adli Rapor Yazımı Atölyesi’nde doğru, anlaşılır ve standartlara uygun rapor hazırlama teknikleri öğretildi. Dr. Öğr. Üyesi Uğur Durmuş’un Acil Durum Enjeksiyonları Atölyesi’nde farklı enjeksiyon türleri ve klinik kullanım alanları anlatıldı. Dr. Öğr. Üyesi İsmail Altın tarafından gerçekleştirilen Çocuk İstismarını Tanıma ve Bildirme Atölyesi’nde vakaların erken fark edilmesi ve bildirim süreçleri detaylandırıldı. Grafolog Ali Öztürk’ün İmzadan Karakter Analizi Atölyesi’nde belge analizi süreçleri uygulamalı örneklerle açıklandı. Dr. Okan Sarıkaya’nın Akupunktur Atölyesi’nde ise akupunkturun temel prensipleri ve tıp alanındaki uygulamaları aktarıldı. “Olay Yeri İnceleme: Delilden Gerçeğe Atölyesi” için kurulan simülasyon sahnesinde delil toplama teknikleri birebir gösterilirken, fakülte bahçesinde yer alan gerçek olay yeri inceleme aracıyla yapılan uygulama sayesinde katılımcılara adli tıp alanındaki saha çalışmalarını yakından gözlemleme fırsatı sunuldu.",
      },
      {
        tip: "resim",
        url: getGorsel("adli-tip-sempozyumu", "icerik-3"),
        alt: "Konferans salonu",
      },
      {
        tip: "paragraf",
        metin:
          "Sosyal atölyelerde ise M. Emre Kaya ile Oyunculuk ve Doğaçlama Drama, Av. Semra Yıldız ile Malpraktis ve Komplikasyon Analizi, Dr. Bekir Cantemir ile Zeytinyağı Tadımı, Muhammet Noyan Açık ile Boks, Ryo Matcha ile Matcha Hazırlama ve kulüp ekibimiz tarafından yürütülen Adli Tıp Temalı Mum Yapımı atölyeleri gerçekleştirildi. Bu atölyelerle öğrenciler, yoğun bilimsel programın yanında keyifli vakit geçirip yeni deneyimler kazandı. Tıp ve hukuk disiplinlerini ortak bir paydada buluşturan bu büyük organizasyon, MedAB olarak bilimsel ve multidisipliner çalışmalara verdiğimiz değerin önemli bir göstergesi oldu. Adli Tıp Sempozyumu’muzun başarısında pay sahibi olan Sempozyum Danışmanımız Doç. Dr. Erman Öztürk’e, Sempozyum Bilimsel Program Koordinatörümüz Dr. Öğr. Üyesi Ömer Turan’a, Sempozyum Başkanımız Güleda Kanarya’ya, tecrübelerini bizlerle paylaşan tüm değerli hocalarımıza, konuşmacılarımıza ve heyecanımıza ortak olan katılımcılarımıza teşekkür ederiz.",
      },
      {
        tip: "galeri",
        gorseller: getGaleri("adli-tip-sempozyumu"),
      },
      {
        tip: "ekip",
        uyeler: [
          getMember(1, "Yönetim Kurulu / Sempozyum Başkanı"),
          getMember(2),
          getMember(3),
          getMember(4, "Etkinlik & Altyapı"),
          getMember(5),
          getMember(6),
          getMember(7),
          getMember(8),
          getMember(9),
          getMember(10),
          getMember(11),
          getMember(12),
          getMember(13),
          getMember(14),
          getMember(15),
          getMember(16),
          getMember(17),
          getMember(18),
          getMember(19),
          getMember(20),
          getMember(21),
          getMember(22),
          getMember(23),
          getMember(24),
          getMember(25),
          getMember(26),
          getMember(27),
          getMember(28),
          getMember(29),
          getMember(30),
        ],
      },
    ],
  },

  /*Kadın Hekim Olmak 2026*/
  {
    id: "kadin-hekim-olmak",
    baslik: "KADIN HEKİM OLMAK",
    durum: "bitti",
    tarih: "8 Mart 2026",
    yer: "Mavi Salon, Kuzey Kampüs",
    aciklama:
      "8 Mart Dünya Kadınlar Günü kapsamında MedAB ve TÖB iş birliğiyle “Kadın Hekim Olmak” etkinliğini düzenledik.",
    resim: getGorsel("kadin-hekim-olmak", "kapak"),
    heroResim: getGorsel("kadin-hekim-olmak", "hero"),
    basvuruLinki: "",

    icerik: [
      { tip: "baslik", metin: "KADIN HEKİM OLMAK" },
      {
        tip: "paragraf",
        metin:
          "8 Mart Dünya Kadınlar Günü kapsamında MedAB ve TÖB iş birliğiyle “Kadın Hekim Olmak” etkinliğini düzenledik. Farklı uzmanlık alanlarında değerli hocalarımız; hem mesleki yolculuklarını bizlerle paylaşmak hem de meslek hayatımıza dair farklı bakış açıları kazanmamızı sağlamak amacıyla bizimle bir araya geldi.",
      },
      {
        tip: "resim",
        url: getGorsel("kadin-hekim-olmak", "icerik-1"),
        alt: "Etkinlik fotoğrafı",
      },
      {
        tip: "paragraf",
        metin:
          "Etkinliğimizin ilk oturumu olan “Akademide Kadın Olmak” bölümünde Histoloji ve Embriyoloji Anabilim Dalı’ndan Prof. Dr. Şule Ayla ve Anatomi Anabilim Dalı’ndan Öğr. Gör. Dr. Medine Işık bizlerleydi. Oturumda; akademik kariyer sürecinde aile, meslek ve özel hayat arasındaki dengeyi nasıl kurduklarına dair deneyimlerini paylaştı.",
      },
      {
        tip: "resim",
        url: getGorsel("kadin-hekim-olmak", "icerik-2"),
        alt: "Etkinlik fotoğrafı",
      },
      {
        tip: "paragraf",
        metin:
          "“Dahili Bilimlerde Kadın Olmak” başlıklı ikinci oturumda ise İç Hastalıkları Anabilim Dalı’ndan Prof. Dr. Banu Mesçi, Fiziksel Tıp ve Rehabilitasyon Anabilim Dalı’ndan Prof. Dr. Yasemin Yumuşakhuylu, Radyoloji Anabilim Dalı’ndan Doç. Dr. Begümhan Baysal ve Kardiyoloji Anabilim Dalı’ndan Doç. Dr. Gönül Açıksarı hocalarımız konuğumuz oldu. Dahili branşlarda kadın hekim olmanın getirdiği tecrübeler, mesleki gelişim süreçleri ve çalışma hayatında karşılaşılan durumlar hakkında hocalarımızın deneyimlerini dinledik.",
      },
      {
        tip: "resim",
        url: getGorsel("kadin-hekim-olmak", "icerik-3"),
        alt: "Etkinlik fotoğrafı",
      },
      {
        tip: "paragraf",
        metin:
          "Üçüncü oturum olan “Cerrahide Kadın Olmak” bölümünde Kadın Hastalıkları ve Doğum Anabilim Dalı’ndan Öğr. Gör. Dr. Canan Satır Özel, Beyin ve Sinir Cerrahisi Anabilim Dalı’ndan Uzm. Dr. Nur Topyalın ve Ortopedi ve Travmatoloji Anabilim Dalı’ndan Dr. Zeynep Zülal Gümüş, cerrahi branşlarda kadın hekim olma deneyimlerini bizlerle paylaştı. Farklı cerrahi disiplinlerden gelen hocalarımızın aktardıkları, bu alanları hedefleyen arkadaşlarımız için yol gösterici oldu.",
      },
      {
        tip: "resim",
        url: getGorsel("kadin-hekim-olmak", "icerik-4"),
        alt: "Etkinlik fotoğrafı",
      },
      {
        tip: "paragraf",
        metin:
          "Etkinliğin akademik oturumlarının ardından kil ve kolaj atölyeleri gerçekleştirildi. Katılımcılar, sanatsal çalışmalar aracılığıyla yaratıcılıklarını ortaya koyma ve farklı dönemlerden öğrencilerle birlikte keyifli vakit geçirme imkanı buldu.",
      },
      {
        tip: "paragraf",
        metin:
          "Etkinliğimiz; gün boyunca farklı deneyimlerin ve bakış açılarının paylaşılmasına alan açtı. MedAB olarak bize yol gösterecek rol modellerle buluşmanın önemine inanıyoruz. Öğrencilerimizi bu tarz daha birçok nitelikli etkinlikle buluşturmaya devam edeceğiz.",
      },
      {
        tip: "galeri",
        gorseller: getGaleri("kadin-hekim-olmak"),
      },
    ],
  },

  /*Bağımlılığa Multidisipliner Yaklaşım 2026*/
  {
    id: "bagimliliga-multidisipliner-yaklasim",
    baslik: "BAĞIMLILIĞA MULTİDİSİPLİNER YAKLAŞIM",
    durum: "bitti",
    tarih: "3-5-6 Mart 2026",
    yer: "Mavi Salon, Kuzey Kampüs",
    aciklama:
      "1-7 Mart Yeşilay Haftası kapsamında İMÜ MedAB Kulübü, İMÜ Yeşilay Kulübü ve İMÜ Psikoloji Topluluğu iş birliğiyle “Bağımlılığa Multidisipliner Yaklaşım” başlıklı bir konferans serisi düzenledik.",
    resim: getGorsel("bagimliliga-multidisipliner-yaklasim", "kapak"),
    heroResim: getGorsel("bagimliliga-multidisipliner-yaklasim", "hero"),
    basvuruLinki: "",

    icerik: [
      { tip: "baslik", metin: "BAĞIMLILIĞA MULTİDİSİPLİNER YAKLAŞIM" },
      {
        tip: "paragraf",
        metin:
          "Bağımlılık; bireyin fiziksel ve psikolojik sağlığı ile sosyal yaşamını etkileyen önemli bir toplum sağlığı meselesidir. Bu konunun birden fazla disiplinin bakış açısı ile ele alınması gerektiğini düşünüyoruz. Bu düşünceden hareketle İMÜ MedAB Kulübü, İMÜ Yeşilay Kulübü ve İMÜ Psikoloji Topluluğu iş birliğiyle, 1-7 Mart Yeşilay Haftası kapsamında “Bağımlılığa Multidisipliner Yaklaşım” başlıklı bir konferans serisi düzenledik. Konferans serisinde bağımlılığı; teknoloji kullanımı, psikolojik süreçler, tütün bağımlılığı ve iyileşme dinamikleri gibi farklı başlıklar altında inceledik. Farklı alanlardan uzman hocalarımızın bilgi ve deneyimlerini bizlerle paylaştığı oturumlarda; bağımlılık faktörleri, insan üzerindeki etkileri ve iyileşme süreci üzerine kapsamlı değerlendirmeler yapıldı.",
      },
      {
        tip: "resim",
        url: getGorsel("bagimliliga-multidisipliner-yaklasim", "icerik-1"),
        alt: "Etkinlik fotoğrafı",
      },
      {
        tip: "paragraf",
        metin:
          "Konferans serimizin ilk gününde Doç. Dr. Hasan Turan Karatepe, “Dijital Çağın ‘Tatlı’ Salgını: Teknoloji Bağımlılığı” başlıklı sunumuyla bizlerleydi. Günümüzde teknolojinin hayatımızın ayrılmaz bir parçası haline gelmesiyle birlikte ortaya çıkan teknoloji bağımlılığı; bağımlılık davranışının oluşumu ve günlük yaşam üzerindeki etkileri çerçevesinde ele alındı. İkinci günde Doç. Dr. M. Emrah Karadere, “Bağımlılığın Psikolojik Anatomisi ve İyileşme Dinamikleri” başlıklı sunumunda bağımlılığın psikolojik tarafına ve iyileşme sürecine odaklandı. Bağımlılık davranışının altında yatan psikolojik etkenler ve iyileşmeyi sağlayan temel dinamikler katılımcılarımızın büyük ilgisini çekti. Konferans serisinin son gününde ise tütün bağımlılığı konusunu işledik. Prof. Dr. Esra Yazar ve Doç. Dr. Burcu Arpınar Yiğitbaş tarafından gerçekleştirilen “Tütün Bağımlılığına Karşı Farkındalık” başlıklı sunumda; tütün kullanımının sağlık üzerindeki zararları ve farkındalığın önemi üzerine bilgi ve değerlendirmeler paylaşıldı.",
      },
      {
        tip: "resim",
        url: getGorsel("bagimliliga-multidisipliner-yaklasim", "icerik-2"),
        alt: "Etkinlik fotoğrafı",
      },
      {
        tip: "paragraf",
        metin:
          "“Bağımlılığa Multidisipliner Yaklaşım” konferans serisiyle hem Yeşilay Haftası’nda bağımlılık konusuna dikkate çekmeyi hem de öğrencilerin bu önemli sorunu farklı yönleriyle kavramalarına fırsat sunmayı amaçladık. MedAB olarak geleceğin hekimlerinin multidisipliner bir bakış açısıyla geliştirmesinin son derece önemli olduğuna inanıyoruz. Bu doğrultuda bilgilendirici etkinlikler yapmaya devam ediyoruz. Tekrardan görüşmek üzere!",
      },
      {
        tip: "galeri",
        gorseller: getGaleri("bagimliliga-multidisipliner-yaklasim"),
      },
    ],
  },

  /*Patili Dostlarımız İçin Barınak Ziyareti 2026*/
  {
    id: "patili-dostlarimiz-icin-barinak-ziyareti",
    baslik: "PATİLİ DOSTLARIMIZ İÇİN BARINAK ZİYARETİ",
    durum: "bitti",
    tarih: "21 Şubat 2026",
    yer: "Yedikule Hayvan Barınağı",
    aciklama:
      "MedAB ekibi olarak 21 Şubat Cumartesi günü Yedikule Hayvan Barınağı’nı ziyaret ettik.",
    resim: getGorsel("patili-dostlarimiz-icin-barinak-ziyareti", "kapak"),
    heroResim: getGorsel("patili-dostlarimiz-icin-barinak-ziyareti", "hero"),
    basvuruLinki: "",

    icerik: [
      { tip: "baslik", metin: "PATİLİ DOSTLARIMIZ İÇİN BARINAK ZİYARETİ" },
      {
        tip: "paragraf",
        metin:
          "MedAB ekibi olarak 21 Şubat Cumartesi günü Yedikule Hayvan Barınağı’nı ziyaret ettik. Hem barınaktaki sevimli dostlarımızla oyunlar oynayıp keyifli vakit geçirdik hem de onların günlük ihtiyaçlarına ufak da olsa bir katkıda bulunduk.",
      },
      {
        tip: "resim",
        url: getGorsel("patili-dostlarimiz-icin-barinak-ziyareti", "icerik-1"),
        alt: "Etkinlik fotoğrafı",
      },
      {
        tip: "paragraf",
        metin:
          "Ziyaretimiz öncesinde barınağın ihtiyaçlarını belirleyerek 15 kg köpek maması, 10 kg kedi maması, 20 litre çamaşır suyu ve 10 adet minderi temin ettik ve barınağa ulaştırdık. Böylece sadece keyifli bir gün geçirmekle kalmayıp dostlarımızın ihtiyaçlarına da destek sağladık.",
      },
      {
        tip: "resim",
        url: getGorsel("patili-dostlarimiz-icin-barinak-ziyareti", "icerik-2"),
        alt: "Etkinlik fotoğrafı",
      },
      {
        tip: "paragraf",
        metin:
          "Bu etkinlik; canlılara karşı sorumluluk bilincimizi pekiştiren, barınakların ihtiyaçlarına dair farkındalığımızı artıran bir deneyim oldu. MedAB olarak doğaya ve canlılara destek olabileceğimiz projeler üretmeye devam edeceğiz. Yeni etkinliklerde görüşmek üzere!",
      },
      {
        tip: "galeri",
        gorseller: getGaleri("patili-dostlarimiz-icin-barinak-ziyareti"),
      },
    ],
  },

  /*Çocuk Onkoloji Servisine Ziyaret 2026*/
  {
    id: "cocuk-onkoloji-servisine-ziyaret",
    baslik: "ÇOCUK ONKOLOJİ SERVİSİNE ZİYARET",
    durum: "bitti",
    tarih: "16 Şubat 2026",
    yer: "Prof. Dr. Süleyman Yalçın Şehir Hastanesi",
    aciklama:
      "15 Şubat Çocukluk Çağı Kanseri Farkındalık Günü vesilesiyle MedAB ekibi olarak 16 Şubat 2026 tarihinde Prof. Dr. Süleyman Yalçın Şehir Hastanesi Çocuk Onkoloji Servisi’ni ziyaret ettik.",
    resim: getGorsel("cocuk-onkoloji-servisine-ziyaret", "kapak"),
    heroResim: getGorsel("cocuk-onkoloji-servisine-ziyaret", "hero"),
    basvuruLinki: "",

    icerik: [
      { tip: "baslik", metin: "ÇOCUK ONKOLOJİ SERVİSİNE ZİYARET" },
      {
        tip: "paragraf",
        metin:
          "15 Şubat Çocukluk Çağı Kanseri Farkındalık Günü vesilesiyle MedAB ekibi olarak 16 Şubat 2026 tarihinde Prof. Dr. Süleyman Yalçın Şehir Hastanesi Çocuk Onkoloji Servisi’ni ziyaret ettik. Tedavi gören miniklerimizle yaşlarına uygun oyunlar oynayıp sohbetler ederek hastane yaşantılarına bir mola verebilmelerini hedefledik. Aynı zamanda onlar için hazırladığımız hediyeleri ulaştırarak yüzlerinde küçük bir tebessüm oluşturmayı amaçladık. Bu buluşma bizlere; tedavi süreçlerinin yalnızca ilaçlardan ibaret olmadığını, moral ve sosyal desteğin de bu sürecin vazgeçilmez bir parçası olduğunu bir kez daha hatırlattı.",
      },
      {
        tip: "paragraf",
        metin:
          "Ziyaret esnasında çocukların sağlığını korumak adına tüm hijyen ve sterilizasyon kurallarına titizlikle uyduk. Gerçekleştirdiğimiz bu etkinlik; hem toplumsal farkındalık yaratmak hem de geleceğin hekimleri olarak mesleki ve insani sorumluluklarımızı pekiştirmek açısından oldukça anlamlı bir deneyim oldu.",
      },
      {
        tip: "paragraf",
        metin:
          "MedAB olarak empati, duyarlılık ve toplumsal sorumluluk bilincinin hekimlik mesleğinin en temel yapı taşlarından olduğuna inanıyoruz. Hem mesleki hem de insani yönlerimizi geliştiren sosyal sorumluluk projelerine önümüzdeki dönemlerde de devam edeceğiz.",
      },
      {
        tip: "galeri",
        gorseller: getGaleri("cocuk-onkoloji-servisine-ziyaret"),
      },
    ],
  },

  /*Mix&Match Tanışma Gecesi 2026*/
  {
    id: "mix-and-match-tanisma-gecesi",
    baslik: "MIX&MATCH TANIŞMA GECESİ",
    durum: "bitti",
    tarih: "17 Ocak 2026",
    yer: "Alfa&Glory Coffee Roastery, Erenköy",
    aciklama:
      "MedAB olarak farklı dönemlerden öğrencileri kaynaştırmak, çay-kahve eşliğinde tatlı bir sohbet havası oluşturmak için Mix&Match Tanışma Gecesi’ni düzenledik.",
    resim: getGorsel("mix-and-match-tanisma-gecesi", "kapak"),
    heroResim: getGorsel("mix-and-match-tanisma-gecesi", "hero"),
    basvuruLinki: "",

    icerik: [
      { tip: "baslik", metin: "MIX&MATCH TANIŞMA GECESİ" },
      {
        tip: "paragraf",
        metin:
          "MedAB olarak farklı dönemlerden öğrencileri kaynaştırmak, çay-kahve eşliğinde tatlı bir sohbet havası oluşturmak için Mix&Match Tanışma Gecesi’ni düzenledik. Masa değişimleri ve eğlenceli oyunlarla öğrenciler birbiriyle sohbet ederek keyifli vakit geçirdi. Etkinlik, kulüp üyelerimiz arasındaki dayanışmanın güçlenmesine ve dönemler arasında yeni bağların kurulmasına katkı sağladı. Gelecek etkinliklerde bu muhteşem ekiple yeniden bir araya gelmek için sabırsızlanıyoruz.",
      },
      {
        tip: "galeri",
        gorseller: getGaleri("mix-and-match-tanisma-gecesi"),
      },
    ],
  },

  /*Kliniğe Hazırlık Atölye Günleri 2025*/
  {
    id: "klinige-hazirlik-atolye-gunleri",
    baslik: "KLİNİĞE HAZIRLIK ATÖLYE GÜNLERİ",
    durum: "bitti",
    tarih: "27 Aralık 2025",
    yer: "Tıp Fakültesi, Kuzey Kampüs",
    aciklama:
      "MedAB olarak tıp fakültesindeki öğrencilerin klinik uygulamalara daha özgüvenli adımlar atabilmeleri için 27 Aralık 2025 tarihinde ilk kez “Kliniğe Hazırlık Atölye Günleri” düzenledik.",
    resim: getGorsel(
      "klinige-hazirlik-atolye-gunleri",
      "kapak",
      "/branding/etkinlikler/klinige-hazirlik-atolye-gunleri/kapak.webp",
    ),
    heroResim: getGorsel("klinige-hazirlik-atolye-gunleri", "hero"),
    basvuruLinki: "",

    icerik: [
      { tip: "baslik", metin: "KLİNİĞE HAZIRLIK ATÖLYE GÜNLERİ" },
      {
        tip: "paragraf",
        metin:
          "MedAB olarak tıp fakültesindeki öğrencilerin klinik uygulamalara daha özgüvenli adımlar atabilmeleri için 27 Aralık 2025 tarihinde ilk kez “Kliniğe Hazırlık Atölye Günleri” düzenledik. Bu atölye serisiyle öğrencilerin teorik eğitimde edindikleri bilgileri uygulama ortamında pekiştirmelerini ve klinik yaşama hazırlanma süreçlerine katkıda bulunulmasını amaçladık. İlki düzenlenen bu seride, klinik pratiğin en temel basamaklarından olan sütür atma ve damar yolu açma becerilerine odaklandık.",
      },
      {
        tip: "resim",
        url: getGorsel("klinige-hazirlik-atolye-gunleri", "icerik-1"),
        alt: "Etkinlik fotoğrafı",
      },
      {
        tip: "paragraf",
        metin:
          "Etkinliğimizde; Anestezi ve Reanimasyon Bölümü’nden Prof. Dr. Senem Geçer ve Dr. İlker Yalçın ile Genel Cerrahi Anabilim Dalı’ndan Op. Dr. Muhammet Ali Aydemir, Dr. Seren Kahreman ve Dr. Furkan Mutu bizlerleydi. Alanında deneyimli hocalarımızın tecrübelerini öğrencilerle paylaşması ve sorularımızı yanıtlaması atölyelerin öğretici bir şekilde ilerlemesine katkı sağladı.",
      },
      {
        tip: "resim",
        url: getGorsel("klinige-hazirlik-atolye-gunleri", "icerik-2"),
        alt: "Etkinlik fotoğrafı",
      },
      {
        tip: "paragraf",
        metin:
          "Hocalarımız, katılımcılara sütür atma ve damar yolu açma ile ilgili temel bilgiler ve farklı uygulama teknikleri aktardı. Teorik eğitimin ardından katılımcılar, eğitmenlerin yönlendirmeleri eşliğinde maketler üzerinde pratik yapma fırsatı buldu. Böylece öğrenciler, temel uygulamaları deneyimleme ve klinik uygulamalar sırasında dikkat edilmesi gereken noktaları öğrenme imkanı yakaladı.",
      },
      {
        tip: "paragraf",
        metin:
          "Atölye serisini, tıp fakültesi öğrencilerinde uygulamalı eğitimin önemini ortaya koyan verimli bir deneyim olarak gerçekleştirdik. Etkinlikte düzenlenen çekilişle bir katılımcımıza sütür seti hediye ettik. MedAB ekibine, desteklerini esirgemeyen hocalarımıza ve katılımcılarımıza teşekkür ederiz. Yeni etkinliklerde görüşmek üzere.",
      },
      {
        tip: "galeri",
        gorseller: getGaleri("klinige-hazirlik-atolye-gunleri"),
      },
    ],
  },

  /*Tanışma ve Eğlence: Quiz Night 2025*/
  {
    id: "tanisma-ve-eglence-quiz-night",
    baslik: "Tanışma ve Eğlence: Quiz Night",
    durum: "bitti",
    tarih: "14 Kasım 2025",
    yer: "Babil Kültür Merkezi, Maltepe",
    aciklama:
      "MedAB Kulübü olarak öğrencilerin tanıştığı, kaynaştığı ve birlikte keyifli vakit geçirdiği “Quiz Night” etkinliğini gerçekleştirdik.",
    resim: getGorsel("tanisma-ve-eglence-quiz-night", "kapak"),
    heroResim: getGorsel("tanisma-ve-eglence-quiz-night", "hero"),
    basvuruLinki: "",

    icerik: [
      { tip: "baslik", metin: "Tanışma ve Eğlence: Quiz Night" },
      {
        tip: "paragraf",
        metin:
          "MedAB Kulübü olarak öğrencilerin tanıştığı, kaynaştığı ve birlikte keyifli vakit geçirdiği “Quiz Night” etkinliğini gerçekleştirdik. Yoğun katılımın olduğu gecede; genel kültür soruları, yarışmalar ve sürpriz ödüller eşliğinde unutulmaz anlar yaşandı. Öğrenciler hem birbirlerini yakından tanıma hem de kulüp içerisindeki bağlarını güçlendirme fırsatı buldu. Tıp fakültesinin yoğun ders temposuna eğlenceli bir mola verdiğimiz bu akşam, tüm ekibe harika bir moral oldu. MedAB olarak, birlikte öğrenmenin ve üretmenin yanı sıra birlikte eğlenmeye en az akademik gelişim kadar önem veriyoruz. Gelecek etkinliklerimizde buluşmak üzere!",
      },
      {
        tip: "resim",
        url: getGorsel("tanisma-ve-eglence-quiz-night", "icerik-1"),
        alt: "Etkinlik fotoğrafı",
      },
      {
        tip: "galeri",
        gorseller: getGaleri("tanisma-ve-eglence-quiz-night"),
      },
    ],
  },
];
