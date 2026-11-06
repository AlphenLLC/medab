<template>
  <div class="event-detail-page foy-page">
    <header class="hero">
      <img 
        src="/branding/workshop-banner.webp" 
        alt="Meme Cerrahisi Ameliyathane Gözlemi" 
        class="hero-bg" 
        loading="eager"
        decoding="async"
      />
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>AMELİYATHANE GÖZLEMİ</h1>
        <p class="subtitle">Ameliyathane Pratik Bilgi ve Cerrahi Takip Rehberi</p>
        <div class="hero-actions">
          <router-link to="/foyler/" class="btn-pill-back">
            <AppIcon name="arrow-left" :size="15" /> Föylere Dön
          </router-link>
        </div>
      </div>
    </header>

    <nav class="quick-nav">
      <div class="nav-container">
        <button class="nav-arrow left" aria-label="Geri Kaydır" @click="scrollNav('left')">
          <AppIcon name="chevron-left" :size="16" />
        </button>

        <div ref="navScrollRef" class="nav-scroll">
          <button 
            v-for="item in quickNav" 
            :key="item.id" 
            class="nav-pill" 
            :class="item.theme"
            @click="scrollTo(item.id)"
          >
            <span class="pill-dot"></span>
            <span class="pill-index">{{ item.index }}</span>
            <span class="pill-title">{{ item.title }}</span>
          </button>
        </div>

        <button class="nav-arrow right" aria-label="İleri Kaydır" @click="scrollNav('right')">
          <AppIcon name="chevron-right" :size="16" />
        </button>
      </div>
    </nav>

    <!-- Ana İçerik Konteyneri -->
    <main class="content-container">
      <!-- Giriş Notu (Briefing Box) -->
      <div class="briefing-card">
        <p>
          Medeniyet Akademik ve Bilimsel Faaliyetler kulübüne hoş geldiniz. 1. Ameliyathane Gözlemi etkinliğimiz için hazırlanan bu sayfa, ameliyathanedeki sanatın icrası sırasında yapılan işlemleri adım adım takip edebilmeniz için danışabileceğiniz bir föydür. İyi ziyaretler dileriz.
        </p>
      </div>

      <a 
        href="https://dosyamerkez.saglik.gov.tr/Eklenti/54221/0/ekameliyathanelere-giris-cikis-kurallaripdf.pdf" 
        target="_blank" 
        rel="noopener noreferrer" 
        class="protocol-doc-card"
      >
        <div class="doc-icon-wrap">
          <AppIcon name="file-pdf" :size="24" />
        </div>
        <div class="doc-info">
          <h3>Ameliyathane Kuralları</h3>
          <p>Gözlem öncesi sterilizasyon, kıyafet değişimi ve ameliyathane içi hareket kurallarını içeren resmi rehberi inceleyebilirsiniz.</p>
        </div>
        <div class="doc-action">
          <span>PDF Aç</span>
          <AppIcon name="external-link" :size="14" />
        </div>
      </a>

      <!-- Bölüm 1: Temel Kavramlar -->
      <section id="kavramlar" class="section-block">
        <div class="section-header">
          <span class="section-tag neutral">BÖLÜM 01</span>
          <h2>Temel Kavramlar</h2>
        </div>
        <p class="section-lead">
          Ameliyathane masasında cerrahi ekibin sıkça kullanacağı ve vaka esnasında bilmeniz gereken temel cerrahi ve patolojik tanımlar:
        </p>

        <div class="grid-cards">
          <!-- Benign / Malign -->
          <div class="card-item border-split">
            <h3>Benign / Malign</h3>
            <p>
              <strong class="text-safe">Benign:</strong> İyi huylu (yayılım yapmayan).
            </p>
            <p>
              <strong class="text-danger">Malign:</strong> Kötü huylu (çevre dokuları işgal edebilen ve başka organlara sıçrayabilen, yani kanser) demektir.
            </p>
          </div>

          <!-- Biyopsi ve Patoloji -->
          <div class="card-item border-cyan">
            <h3>Biyopsi ve Patoloji</h3>
            <p>
              Şüpheli dokudan parça alınması işlemine <strong>biyopsi</strong>, bu parçanın mikroskop altında incelenerek kesin tanının konulması bilimine <strong>patoloji</strong> denir.
            </p>
          </div>

          <!-- Metastaz -->
          <div class="card-item border-danger">
            <h3>Metastaz</h3>
            <p>
              Kanser hücrelerinin başladığı organdan (göreceğiniz örnek meme olacak) kan veya lenf damarları yoluyla başka bölgelere (kemik, karaciğer, akciğer vb.) sıçramasıdır.
            </p>
          </div>

          <!-- Cerrahi Sınır -->
          <div class="card-item border-safe">
            <h3>Cerrahi Sınır (Marjin)</h3>
            <p>
              Cerrah tümörü çıkarırken sadece kitleyi değil, etrafındaki 1-2 milimetrelik sağlam dokuyu da birlikte çıkarır. Çıkarılan parçanın en dış yüzeyinde hiç kanser hücresi olmamasına <strong>temiz cerrahi sınır</strong> denir; bu sayede içeride tümör hücresi kalmadığından emin olunur.
            </p>
          </div>

          <!-- Frozen İnceleme -->
          <div class="card-item border-amber highlight-card">
            <h3>Frozen (Donuk Kesit) İnceleme</h3>
            <p>
              Ameliyat devam ederken çıkarılan parçanın hızlıca patoloji laboratuvarına gönderilip şoklanarak dondurulması ve 15-20 dakika içinde incelenmesidir. Cerrah, ameliyata nasıl devam edeceğine (örneğin koltuk altını tamamen temizleyip temizlemeyeceğine) patologdan gelecek cevaba göre ameliyat masasında karar verir.
            </p>
          </div>

          <!-- Koter -->
          <div class="card-item border-amber">
            <h3>Koter (Elektrokoter)</h3>
            <p>
              Ameliyatta en sık göreceğiniz kalem benzeri alettir. Dokuyu elektrik akımı yardımıyla keser ve aynı anda küçük damarları yakarak kanamayı durdurur (içerideki yanık kokusunun sebebi budur).
            </p>
          </div>
        </div>
      </section>

      <!-- Bölüm 2: Meme Anatomisi ve Kanser Türleri -->
      <section id="anatomi" class="section-block">
        <div class="section-header">
          <span class="section-tag danger">BÖLÜM 02</span>
          <h2>Meme Anatomisi ve Kanser Türleri</h2>
        </div>
        <p class="section-lead">
          Meme dokusu temel olarak üç yapıdan oluşur: Süt üreten bezler (<strong>lobüller</strong>), sütü meme başına taşıyan kanallar (<strong>duktuslar</strong>) ve bunların etrafını saran yağ ve bağ dokusu. Meme kanserlerinin büyük çoğunluğu bu süt kanallarının veya bezlerinin iç yüzeyini döşeyen hücrelerden başlar.
        </p>

        <div class="dual-cards">
          <!-- In Situ -->
          <div class="status-card safe-state">
            <div class="status-header">
              <h3>İnvaziv Olmayan (In Situ) Kanser</h3>
            </div>
            <p>
              Kanser hücreleri henüz doğduğu süt kanalının veya bezinin içindedir. Kanalın dış zarını (bazal membranı) delip memenin yağ dokusuna geçmemiştir. Damarlarla temas etmediği için başka yere sıçrama riski yok denecek kadar azdır.
            </p>
          </div>

          <!-- İnvaziv -->
          <div class="status-card danger-state">
            <div class="status-header">
              <h3>İnvaziv Kanser</h3>
            </div>
            <p>
              Kanser hücreleri kanal duvarını yıkmış ve memenin kendi yağ/destek dokusunun içine doğru yayılmaya başlamıştır. Buradaki kan ve lenf damarlarına ulaşıp vücuda yayılma potansiyeli taşır.
            </p>
          </div>
        </div>
      </section>

      <!-- Bölüm 3: Koltuk Altı (Aksilla) -->
      <section id="aksilla" class="section-block">
        <div class="section-header">
          <span class="section-tag cyan">BÖLÜM 03</span>
          <h2>Koltuk Altı (Aksilla) Neden Bu Kadar Önemli?</h2>
        </div>
        <p class="section-lead">
          Vücudumuzda kan dolaşımı dışında bir de dokulardaki fazla sıvıyı toplayıp bağışıklık sistemine taşıyan lenfatik sistem vardır.
        </p>

        <div class="feature-card border-cyan">
          <div class="feature-icon cyan">
            <AppIcon name="route" :size="22" />
          </div>
          <div class="feature-body">
            <h3>Lenf Noduna Yayılım Neden Sıkıntıdır?</h3>
            <p>
              Meme dokusunun lenf sıvısı doğrudan koltuk altı (aksiller) lenf bezlerine akar. Eğer tümör hücreleri memeden kopup lenf damarına girerse, gideceği ilk durak koltuk altıdır. Lenf bezinde kanser görülmesi, tümörün artık sadece memede durmadığını ve vücuda açılan "otobana" girdiğini gösterir. Bu durum hastalığın evresini yükseltir ve tedaviyi (kemoterapi/radyoterapi ihtiyacını) doğrudan değiştirir.
            </p>
          </div>
        </div>

        <div class="feature-card border-safe">
          <div class="feature-icon safe">
            <AppIcon name="shield" :size="22" />
          </div>
          <div class="feature-body">
            <h3>Sentinel (Bekçi) Lenf Nodu Biyopsisi (SLNB) Nedir?</h3>
            <p>
              Eskiden önlem olarak koltuk altındaki tüm lenf bezleri alınırdı; ancak bu durum koldaki sıvı akışını bozup hastanın kolunun ömür boyu şişmesine (<strong>lenfödem</strong>) neden olabiliyordu. Günümüzde ise sadece tümörden gelen sıvının uğradığı ilk 1 ila 3 adet bekçi lenf bezini (Sentinel Lenf Nodu) bulup çıkarmak tercih edilir.
            </p>
          </div>
        </div>

        <div class="procedure-grid">
          <div class="proc-card border-cyan">
            <h4>
              <AppIcon name="pipette" class="text-cyan" :size="16" />
              Bekçi Nod Ameliyatta Nasıl Bulunur?
            </h4>
            <p>
              Ameliyatın başında meme başı çevresine mavi boya (veya düşük doz radyoaktif madde) enjekte edilir. Boya lenf kanallarından akarak koltuk altındaki ilk lenf bezlerini maviye boyar. Cerrah koltuk altına küçük bir kesi yaparak maviye boyanmış bu 1-3 lenf nodunu bulur ve Frozen incelemeye gönderir.
            </p>
          </div>

          <div class="proc-card border-amber">
            <h4>
              <AppIcon name="scale" class="text-amber" :size="16" />
              Kaç Lenf Nodu Ne Zaman Alınır?
            </h4>
            <p>
              Eğer patolog <em>"bekçi nodlarda tümör yok"</em> derse, diğer lenf bezleri de temiz demektir; koltuk altına başka işlem yapılmaz. Ancak bekçi nodlarda tümör çıkarsa (veya ameliyat öncesinde koltuk altında zaten büyük tümörlü bezler varsa), <strong>Aksiller Lenf Nodu Diseksiyonu (ALND)</strong> yapılarak koltuk altındaki lenf bezleri (genellikle 10 ve üzeri lenf nodu) temizlenir.
            </p>
          </div>
        </div>
      </section>

      <!-- Bölüm 4: Evreleme ve Tedavi -->
      <section id="evreleme" class="section-block">
        <div class="section-header">
          <span class="section-tag amber">BÖLÜM 04</span>
          <h2>Evreleme ve Tedavi Zamanlaması</h2>
        </div>
        <p class="section-lead">
          Hastalığın evresini belirleyen <strong>TNM sistemi</strong> üç soruya yanıt arar:
        </p>

        <div class="tnm-grid">
          <div class="tnm-box">
            <span class="tnm-char">T</span>
            <div class="tnm-detail">
              <strong>Tümörün Boyutu</strong>
              <p>Tümörün boyutu ne kadar?</p>
            </div>
          </div>
          <div class="tnm-box">
            <span class="tnm-char">N</span>
            <div class="tnm-detail">
              <strong>Lenf Nodu Tutulumu</strong>
              <p>Lenf nodlarına sıçrama var mı?</p>
            </div>
          </div>
          <div class="tnm-box">
            <span class="tnm-char">M</span>
            <div class="tnm-detail">
              <strong>Uzak Metastaz</strong>
              <p>Uzak organlara metastaz var mı?</p>
            </div>
          </div>
        </div>

        <p class="section-lead" style="margin-top: 2rem;">Tedavi sırası buna göre planlanır:</p>

        <div class="dual-cards">
          <!-- Neoadjuvan -->
          <div class="therapy-card border-amber">
            <span class="therapy-badge amber">AMELİYAT ÖNCESİ İLAÇ TEDAVİSİ</span>
            <h3>Neoadjuvan Tedavi</h3>
            <p>
              <strong>"Neo"</strong> yeni/önce demektir. Eğer tümör ilk tanı anında çok büyükse veya koltuk altı lenf bezlerinde yayılım varsa, hasta hemen ameliyat edilmez; önce kemoterapi (veya akıllı ilaç) verilir.
            </p>
            <div class="therapy-goal">
              <strong>Amaç:</strong> Tümörü küçülterek memenin tamamını almaktan kurtarmak, koltuk altındaki tümörlü lenf bezlerini temizlemek ve ilacın tümör üzerindeki etkisini canlı olarak görmektir.
            </div>
          </div>

          <!-- Adjuvan -->
          <div class="therapy-card border-safe">
            <span class="therapy-badge safe">AMELİYAT SONRASI DESTEK TEDAVİSİ</span>
            <h3>Adjuvan Tedavi</h3>
            <p>
              <strong>"Adjuvan"</strong> yardımcı/destekleyici demektir. Ameliyatla gözle görülen tümör çıkarıldıktan sonra, kan veya lenf yoluyla vücuda dağılmış olabilecek mikroskobik (gözle görülmeyen) hücreleri yok etmek ve kanserin geri gelmesini (nüksü) önlemek için verilen kemoterapi, hormon tedavisi veya radyoterapidir.
            </p>
            <div class="therapy-goal">
              <strong>Uygulama:</strong> Mikroskobik hücreleri yok etmek ve nüksü önlemek için uygulanan sistemik ilaç ve lokal tedavilerdir.
            </div>
          </div>
        </div>

        <div class="note-box border-neutral">
          <div class="note-header">
            <AppIcon name="notes-medical" class="text-amber" :size="16" />
            Kemoterapi ve Radyoterapi Ne Zaman Verilir?
          </div>
          <p>
            <strong>Kemoterapi:</strong> Damardan verilen ve tüm vücuttaki kanser hücrelerini hedef alan sistemik ilaç tedavisidir; tümörün biyolojik tipine ve lenf nodu durumuna göre ameliyat öncesi veya sonrası verilir.
          </p>
          <p class="mb-0">
            <strong>Radyoterapi (Işın Tedavisi):</strong> Sadece meme ve koltuk altı bölgesine uygulanan bölgesel bir tedavidir; eğer memenin tamamı alınmayıp sadece tümörlü kısım alındıysa, geride kalan meme dokusunu güvenceye almak için ameliyat sonrasında <u>mutlaka</u> radyoterapi eklenir.
          </p>
        </div>
      </section>

      <!-- Bölüm 5: Cerrahi Yöntemler -->
      <section id="yontemler" class="section-block">
        <div class="section-header">
          <span class="section-tag safe">BÖLÜM 05</span>
          <h2>Cerrahi Yöntemler</h2>
        </div>
        <p class="section-lead">
          Ameliyathanede göreceğiniz vakalarda tümörün yapısına göre şu yöntemlerden biri uygulanır:
        </p>

        <div class="methods-grid">
          <div class="method-card border-safe">
            <h3>Meme Koruyucu Cerrahi (MKC/Lumpektomi)</h3>
            <p>
              Memenin tamamı alınmaz; yalnızca tümör ve etrafındaki ince bir sağlam doku halkası çıkarılır. Memenin doğal görünümü korunur.
            </p>
          </div>

          <div class="method-card border-danger">
            <h3>Basit (Total) Mastektomi</h3>
            <p>
              Meme içindeki tüm süt bezleri, yağ dokusu, meme başı ve bir miktar derinin tamamen çıkarılmasıdır.
            </p>
          </div>

          <div class="method-card border-cyan">
            <h3>Deri ve Meme Başı Koruyucu Mastektomi</h3>
            <p>
              Memenin dış derisi ve meme ucu olduğu gibi bırakılır; içerideki tüm meme dokusu boşaltılır ve oluşan boşluğa aynı ameliyatta silikon protez (implant) yerleştirilir.
            </p>
          </div>

          <div class="method-card border-amber">
            <h3>Koltuk Altı (Transaksiller / Endoskopik) Yaklaşım</h3>
            <p>
              Bu ileri teknikte, meme üzerinde hiçbir kesi izi yapılmaz. Doğrudan koltuk altındaki doğal katlantı çizgisinden yapılan tek bir kesiden girilerek hem bekçi lenf bezleri alınır hem de meme dokusu çıkarılıp protez yerleştirilir.
            </p>
          </div>
        </div>
      </section>

      <!-- Bölüm 6: Ameliyat Akışı (Adım Adım) -->
      <section id="adim-adim" class="section-block">
        <div class="section-header">
          <span class="section-tag amber">BÖLÜM 06</span>
          <h2>Ameliyathanede Adım Adım Ne İzleyeceksiniz?</h2>
        </div>
        <p class="section-lead">
          Ameliyat başladığında cerrahi ekibin sırasıyla yapacağı işlemler şunlardır:
        </p>

        <div class="steps-container">
          <!-- Adım 1 -->
          <div class="step-box">
            <div class="step-num-pill cyan">1</div>
            <div class="step-content">
              <h3>Hazırlık ve Boyama</h3>
              <p>
                Hasta genel anestezi ile uyutulduktan sonra meme bölgesi antiseptik solüsyonla (genellikle batikon veya klorheksidin) silinir ve steril örtülerle örtülür. Sentinel lenf nodunu bulmak için meme başına mavi boya yapılır ve koltuk altına gitmesi için memeye kısa süre masaj uygulanır.
              </p>
            </div>
          </div>

          <!-- Adım 2 -->
          <div class="step-box">
            <div class="step-num-pill neutral">2</div>
            <div class="step-content">
              <h3>İnsizyon (Deri Kesisi)</h3>
              <p>
                Cerrah bistüri ile planlanan bölgeden (tümör üzeri, meme başı çevresi veya koltuk altı) deriyi keser.
              </p>
            </div>
          </div>

          <!-- Adım 3 -->
          <div class="step-box">
            <div class="step-num-pill amber">3</div>
            <div class="step-content">
              <h3>Katmanların Ayrılması (Diseksiyon)</h3>
              <p>
                Derinin hemen altında sarı renkli yüzeyel yağ dokusu, onun altında ise beyazımsı-pembe renkli asıl meme (lobüler/bez) dokusu bulunur. Cerrah koter yardımıyla derinin beslenmesini bozmadan, bu ince yağ tabakası ile meme dokusu arasındaki doğal sınırdan ilerleyerek deriyi meme dokusundan ayırır (buna flep kaldırma denir).
              </p>
            </div>
          </div>

          <!-- Adım 4 -->
          <div class="step-box">
            <div class="step-num-pill danger">4</div>
            <div class="step-content">
              <h3>Tümörün veya Memenin Çıkarılması (Rezeksiyon)</h3>
              <p>
                Meme koruyucu cerrahide tümörlü bölge sağlam sınırlarla çıkarılır, patolog hangi yönün üst-alt-yan olduğunu anlasın diye parçanın kenarlarına farklı uzunlukta ipler bağlanır (işaretleme) ve patolojiye yollanır. Mastektomide ise meme dokusu en alttaki göğüs kasının (<strong>m. pectoralis major</strong>) üzerinden sıyrılarak tamamen alınır.
              </p>
            </div>
          </div>

          <!-- Adım 5 -->
          <div class="step-box">
            <div class="step-num-pill amber">5</div>
            <div class="step-content">
              <h3>Kanama Kontrolü (Hemostaz) ve Dren Konulması</h3>
              <p>
                İçeride kanayan küçük damarlar koterle yakılır. Ameliyat sonrasında içeride kan veya doku sıvısı birikip şişlik yapmasın diye <strong>dren</strong> adı verilen ince silikon bir hortum yerleştirilir (ucunda vakumlu küçük bir hazne vardır).
              </p>
            </div>
          </div>

          <!-- Adım 6 -->
          <div class="step-box">
            <div class="step-num-pill safe">6</div>
            <div class="step-content">
              <h3>Kapatma</h3>
              <p>
                Deri altı ve deri, iz bırakmayan ve sonradan alınması gerekmeyen gizli (<strong>subkütiküler</strong>) estetik dikişlerle kapatılır.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const navScrollRef = ref(null)

const quickNav = [
  { id: 'kavramlar', index: '01', title: 'Kavramlar', theme: 'theme-neutral' },
  { id: 'anatomi', index: '02', title: 'Meme Anatomisi', theme: 'theme-danger' },
  { id: 'aksilla', index: '03', title: 'Aksilla & SLNB', theme: 'theme-cyan' },
  { id: 'evreleme', index: '04', title: 'Evreleme (TNM)', theme: 'theme-amber' },
  { id: 'yontemler', index: '05', title: 'Cerrahi Yöntemler', theme: 'theme-safe' },
  { id: 'adim-adim', index: '06', title: 'Ameliyat Akışı', theme: 'theme-amber' }
]

const scrollNav = (direction) => {
  if (navScrollRef.value) {
    const scrollAmount = direction === 'left' ? -220 : 220
    navScrollRef.value.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }
}

const scrollTo = (id) => {
  const target = document.getElementById(id)
  if (target) {
    const yOffset = -90
    const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset
    window.scrollTo({ top: y, behavior: 'smooth' })
  }
}
</script>

<style lang="scss" scoped>
$bg-main: #000000;
$bg-card: #121215;
$border-subtle: rgba(255, 255, 255, 0.08);

/* TOK, EDİTÖRYAL & AKADEMİK RENK PALETİ */
$color-safe: #10b981;    /* Crisp Emerald / Güvenli Sınır */
$color-danger: #ef4444;  /* Ruby Crimson / Cerrahi Risk */
$color-cyan: #3b82f6;    /* Surgical Royal Blue / Prosedür & Girişim */
$color-amber: #f59e0b;   /* Warm Ochre / Altın Sarısı */
$color-neutral: #94a3b8; /* Slate Gray / Nötr */

.foy-page {
  color: #e2e8f0;
  background-color: $bg-main;
  font-family: 'Montserrat', sans-serif;

  /* HERO */
  .hero {
    position: relative;
    height: 55vh;
    min-height: 440px;
    padding-top: 4.5rem;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .hero-bg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0.38;
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0.98) 100%);
    }

    .hero-content {
      position: relative;
      z-index: 1;
      text-align: center;
      max-width: 800px;
      padding: 0 1.5rem;

      h1 {
        font-family: 'Archivo Black', sans-serif;
        font-size: clamp(2rem, 4.4vw, 3.2rem);
        color: #ffffff;
        line-height: 1.15;
        letter-spacing: -0.5px;
        margin-bottom: 0.75rem;
        text-transform: uppercase;
      }

      .subtitle {
        font-size: 1.1rem;
        color: $color-neutral;
        font-weight: 500;
        margin-bottom: 2rem;
      }

      .hero-actions {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;

        .btn-pill-back {
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
          font-weight: 600;
          font-size: 0.88rem;
          padding: 12px 24px;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
      }
    }
  }

  /* QUICK NAV */
  .quick-nav {
    position: sticky;
    top: 0;
    z-index: 40;
    background: rgba(0, 0, 0, 0.92);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid $border-subtle;
    padding: 0.75rem 0;

    .nav-container {
      max-width: 960px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .nav-arrow {
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid $border-subtle;
        color: $color-neutral;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        flex-shrink: 0;
      }

      .nav-scroll {
        display: flex;
        gap: 0.6rem;
        overflow-x: auto;
        scroll-behavior: smooth;
        scrollbar-width: none;
        padding: 4px 2px;
        &::-webkit-scrollbar { display: none; }

        .nav-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          white-space: nowrap;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 8px 18px;
          border-radius: 9999px;
          cursor: pointer;
          color: #e2e8f0;
          font-size: 0.82rem;
          font-weight: 600;

          .pill-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: #64748b;
          }

          .pill-index {
            font-family: 'Archivo Black', sans-serif;
            font-size: 0.72rem;
            opacity: 0.6;
          }

          &.theme-safe .pill-dot { background-color: $color-safe; }
          &.theme-danger .pill-dot { background-color: $color-danger; }
          &.theme-cyan .pill-dot { background-color: $color-cyan; }
          &.theme-amber .pill-dot { background-color: $color-amber; }
        }
      }
    }
  }

  /* CONTENT CONTAINER */
  .content-container {
    max-width: 800px;
    margin: 4rem auto;
    padding: 0 2rem;

    .briefing-card {
      background: $bg-card;
      border: 1px solid $border-subtle;
      border-left: 4px solid $color-cyan;
      border-radius: 16px;
      padding: 1.5rem 1.75rem;
      margin-bottom: 1.25rem;

      p {
        margin: 0;
        color: #cbd5e1;
        font-size: 1rem;
        line-height: 1.7;
      }
    }

    .protocol-doc-card {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, $bg-card 65%);
      border: 1px solid rgba(245, 158, 11, 0.28);
      border-radius: 18px;
      padding: 1.35rem 1.5rem;
      margin-bottom: 4rem;
      text-decoration: none;

      .doc-icon-wrap {
        width: 52px;
        height: 52px;
        border-radius: 14px;
        background: rgba(245, 158, 11, 0.16);
        border: 1px solid rgba(245, 158, 11, 0.35);
        color: $color-amber;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }

      .doc-info {
        flex: 1;
        min-width: 0;

        h3 {
          font-family: 'Archivo Black', sans-serif;
          font-size: 1.08rem;
          color: #ffffff;
          margin: 0 0 0.3rem 0;
          line-height: 1.3;
        }

        p {
          font-size: 0.88rem;
          line-height: 1.5;
          color: #94a3b8;
          margin: 0;
        }
      }

      .doc-action {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        padding: 9px 16px;
        border-radius: 9999px;
        background: rgba(245, 158, 11, 0.15);
        border: 1px solid rgba(245, 158, 11, 0.3);
        color: #ffffff;
        font-size: 0.8rem;
        font-weight: 700;
        white-space: nowrap;
        flex-shrink: 0;
      }
    }

    .section-block {
      margin-bottom: 5rem;

      .section-header {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.55rem;
        margin-bottom: 1.25rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid $border-subtle;
        text-align: left;

        .section-tag {
          font-family: 'Archivo Black', sans-serif;
          font-size: 0.68rem;
          letter-spacing: 1.4px;
          padding: 5px 12px;
          border-radius: 9999px;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          line-height: 1;

          &.neutral { background: rgba(148, 163, 184, 0.14); color: $color-neutral; border: 1px solid rgba(148, 163, 184, 0.28); }
          &.cyan { background: rgba(59, 130, 246, 0.14); color: $color-cyan; border: 1px solid rgba(59, 130, 246, 0.28); }
          &.amber { background: rgba(245, 158, 11, 0.14); color: $color-amber; border: 1px solid rgba(245, 158, 11, 0.28); }
          &.safe { background: rgba(16, 185, 129, 0.14); color: $color-safe; border: 1px solid rgba(16, 185, 129, 0.28); }
          &.danger { background: rgba(239, 68, 68, 0.14); color: $color-danger; border: 1px solid rgba(239, 68, 68, 0.28); }
        }

        h2 {
          font-family: 'Archivo Black', sans-serif;
          font-size: clamp(1.45rem, 2.6vw, 1.95rem);
          color: #ffffff;
          letter-spacing: -0.4px;
          line-height: 1.25;
          margin: 0;
          text-align: left;
          text-transform: none;
        }
      }

      .section-lead {
        font-size: 1.05rem;
        line-height: 1.8;
        color: $color-neutral;
        margin-bottom: 1.75rem;
      }
    }

    .grid-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.25rem;

      .card-item {
        background: $bg-card;
        border: 1px solid $border-subtle;
        border-radius: 18px;
        padding: 1.5rem;

        &.border-split { border-top: 3px solid #64748b; }
        &.border-cyan { border-top: 3px solid $color-cyan; }
        &.border-danger { border-top: 3px solid $color-danger; }
        &.border-safe { border-top: 3px solid $color-safe; }
        &.border-amber { border-top: 3px solid $color-amber; }

        &.highlight-card {
          background: $bg-card;
          border-color: rgba(245, 158, 11, 0.25);
        }

        h3 {
          font-family: 'Archivo Black', sans-serif;
          font-size: 1.15rem;
          color: #ffffff;
          margin-bottom: 0.6rem;
        }

        p {
          font-size: 0.94rem;
          line-height: 1.6;
          color: #a1a1aa;
          margin-bottom: 0.5rem;

          &:last-child { margin-bottom: 0; }
        }
      }
    }

    .text-safe { color: $color-safe; }
    .text-danger { color: $color-danger; }
    .text-cyan { color: $color-cyan; }
    .text-amber { color: $color-amber; }

    .dual-cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;

      .status-card, .therapy-card {
        background: $bg-card;
        border: 1px solid $border-subtle;
        border-radius: 18px;
        padding: 1.75rem;

        &.safe-state { border-top: 3px solid $color-safe; }
        &.danger-state { border-top: 3px solid $color-danger; }
        &.border-amber { border-top: 3px solid $color-amber; }
        &.border-safe { border-top: 3px solid $color-safe; }

        .status-header {
          margin-bottom: 1rem;

          h3 {
            font-family: 'Archivo Black', sans-serif;
            font-size: 1.25rem;
            color: #ffffff;
            margin: 0;
          }
        }

        h3 {
          font-family: 'Archivo Black', sans-serif;
          font-size: 1.2rem;
          color: #ffffff;
          margin-bottom: 0.75rem;
        }

        p {
          font-size: 0.95rem;
          line-height: 1.65;
          color: #a1a1aa;
        }

        .therapy-goal {
          background: rgba(255, 255, 255, 0.03);
          border-radius: 12px;
          padding: 0.85rem 1.1rem;
          font-size: 0.88rem;
          line-height: 1.5;
          color: #cbd5e1;
          margin-top: 1rem;
          border-left: 3px solid $border-subtle;
        }
      }
    }

    .feature-card {
      background: $bg-card;
      border: 1px solid $border-subtle;
      border-radius: 18px;
      padding: 1.5rem;
      display: flex;
      gap: 1.25rem;
      margin-bottom: 1.25rem;

      &.border-cyan { border-left: 4px solid $color-cyan; }
      &.border-safe { border-left: 4px solid $color-safe; }

      .feature-icon {
        width: 46px;
        height: 46px;
        border-radius: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;

        &.cyan { background: rgba(59, 130, 246, 0.16); color: $color-cyan; }
        &.safe { background: rgba(16, 185, 129, 0.16); color: $color-safe; }
      }

      .feature-body {
        h3 {
          font-family: 'Archivo Black', sans-serif;
          font-size: 1.15rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        p {
          font-size: 0.95rem;
          line-height: 1.65;
          color: #a1a1aa;
          margin: 0;
        }
      }
    }

    .procedure-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
      margin-top: 1.25rem;

      .proc-card {
        background: $bg-card;
        border: 1px solid $border-subtle;
        border-radius: 18px;
        padding: 1.5rem;

        &.border-cyan { border-top: 3px solid $color-cyan; }
        &.border-amber { border-top: 3px solid $color-amber; }

        h4 {
          font-family: 'Archivo Black', sans-serif;
          font-size: 1rem;
          color: #ffffff;
          margin-bottom: 0.6rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        p {
          font-size: 0.93rem;
          line-height: 1.6;
          color: #a1a1aa;
          margin: 0;
        }
      }
    }

    .tnm-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1rem;

      .tnm-box {
        background: $bg-card;
        border: 1px solid $border-subtle;
        border-radius: 16px;
        padding: 1.25rem;
        display: flex;
        align-items: center;
        gap: 1rem;

        .tnm-char {
          font-family: 'Archivo Black', sans-serif;
          font-size: 2.2rem;
          color: $color-amber;
          line-height: 1;
        }

        .tnm-detail {
          strong {
            display: block;
            color: #ffffff;
            font-size: 0.9rem;
            margin-bottom: 0.2rem;
          }

          p {
            font-size: 0.85rem;
            color: $color-neutral;
            margin: 0;
            line-height: 1.4;
          }
        }
      }
    }

    .note-box {
      background: $bg-card;
      border: 1px solid $border-subtle;
      border-radius: 16px;
      padding: 1.5rem;
      margin-top: 1.5rem;

      .note-header {
        font-family: 'Archivo Black', sans-serif;
        font-size: 0.95rem;
        color: #ffffff;
        margin-bottom: 0.8rem;
        display: flex;
        align-items: center;
        gap: 0.6rem;
      }

      p {
        font-size: 0.94rem;
        line-height: 1.65;
        color: #a1a1aa;
        margin-bottom: 0.75rem;

        &.mb-0 { margin-bottom: 0; }
      }
    }

    .methods-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.25rem;

      .method-card {
        background: $bg-card;
        border: 1px solid $border-subtle;
        border-radius: 18px;
        padding: 1.5rem;

        &.border-safe { border-top: 3px solid $color-safe; }
        &.border-danger { border-top: 3px solid $color-danger; }
        &.border-cyan { border-top: 3px solid $color-cyan; }
        &.border-amber { border-top: 3px solid $color-amber; }

        h3 {
          font-family: 'Archivo Black', sans-serif;
          font-size: 1.15rem;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        p {
          font-size: 0.94rem;
          line-height: 1.6;
          color: #a1a1aa;
          margin: 0;
        }
      }
    }

    .steps-container {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .step-box {
        display: flex;
        gap: 1.25rem;
        background: $bg-card;
        border: 1px solid $border-subtle;
        border-radius: 18px;
        padding: 1.4rem;

        .step-num-pill {
          font-family: 'Archivo Black', sans-serif;
          font-size: 1.1rem;
          width: 44px;
          height: 44px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;

          &.cyan { background: rgba(59, 130, 246, 0.16); color: $color-cyan; }
          &.neutral { background: rgba(148, 163, 184, 0.16); color: $color-neutral; }
          &.amber { background: rgba(245, 158, 11, 0.16); color: $color-amber; }
          &.danger { background: rgba(239, 68, 68, 0.16); color: $color-danger; }
          &.safe { background: rgba(16, 185, 129, 0.16); color: $color-safe; }
        }

        .step-content {
          flex: 1;

          h3 {
            font-family: 'Archivo Black', sans-serif;
            font-size: 1.15rem;
            color: #ffffff;
            margin-bottom: 0.4rem;
          }

          p {
            font-size: 0.94rem;
            line-height: 1.65;
            color: #a1a1aa;
            margin: 0;
          }
        }
      }
    }
  }
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .foy-page {
    .hero {
      height: 52vh;
      min-height: 420px;
      padding-top: 5.5rem;
      padding-bottom: 1.5rem;

      .hero-content {
        padding: 0 1.25rem;

        h1 {
          font-size: 1.85rem;
        }

        .subtitle {
          font-size: 0.98rem;
          margin-bottom: 1.5rem;
        }
      }
    }

    .content-container {
      margin-top: 2.5rem;
      padding: 0 1.25rem;

      .protocol-doc-card {
        flex-direction: column;
        align-items: flex-start;
        padding: 1.25rem;
        margin-bottom: 3rem;

        .doc-action {
          width: 100%;
          justify-content: center;
          box-sizing: border-box;
          margin-top: 0.25rem;
        }
      }

      .dual-cards, .procedure-grid, .tnm-grid {
        grid-template-columns: 1fr;
      }

      .step-box {
        gap: 1rem;
        padding: 1.2rem;
      }
    }
  }
}
</style>