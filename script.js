// IVSS website JavaScript

// Canvas-powered scroll story: daylight solar generation transitions into
// a moonlit scene with an illuminated storage battery as the visitor scrolls.
(() => {
  const canvas = document.getElementById("solarStoryCanvas");
  const label = document.getElementById("solarStoryLabel");
  if (!canvas || !canvas.getContext) return;
  const ctx = canvas.getContext("2d");
  const W = 680, H = 440;
  let scrollMix = 0, raf = 0, lastTime = 0;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const mix = (a,b,t) => a + (b-a)*t;
  const clamp = (n,a=0,b=1) => Math.max(a, Math.min(b,n));
  const smooth = t => { t=clamp(t); return t*t*(3-2*t); };

  function roundedRect(x,y,w,h,r,fill,stroke) {
    ctx.beginPath();
    ctx.roundRect(x,y,w,h,r);
    if (fill) { ctx.fillStyle=fill; ctx.fill(); }
    if (stroke) { ctx.strokeStyle=stroke; ctx.stroke(); }
  }
  function drawSun(x,y,r,alpha) {
    ctx.save(); ctx.globalAlpha=alpha;
    ctx.shadowColor="#ffd45b"; ctx.shadowBlur=30;
    ctx.fillStyle="#ffd45b"; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
    ctx.shadowBlur=0;
    ctx.strokeStyle="#ffd45b"; ctx.lineWidth=4; ctx.lineCap="round";
    for(let i=0;i<8;i++){
      const a=i*Math.PI/4;
      ctx.beginPath(); ctx.moveTo(x+Math.cos(a)*(r+8),y+Math.sin(a)*(r+8));
      ctx.lineTo(x+Math.cos(a)*(r+17),y+Math.sin(a)*(r+17)); ctx.stroke();
    }
    ctx.restore();
  }
  function drawMoon(x,y,r,alpha) {
    ctx.save(); ctx.globalAlpha=alpha;
    ctx.shadowColor="#d9eaff"; ctx.shadowBlur=22;
    ctx.fillStyle="#e6efff"; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
    ctx.shadowBlur=0; ctx.globalCompositeOperation="destination-out";
    ctx.beginPath(); ctx.arc(x+r*.42,y-r*.22,r*.88,0,Math.PI*2); ctx.fill();
    ctx.globalCompositeOperation="source-over";
    ctx.fillStyle="#e6efff";
    [[-.45,-.3,.09],[.1,.38,.07],[-.1,-.62,.05]].forEach(([dx,dy,rr])=>{
      ctx.beginPath();ctx.arc(x+dx*r,y+dy*r,rr*r,0,Math.PI*2);ctx.fill();
    });
    ctx.restore();
  }
  function drawPanel(x,y,w,h,glow) {
    ctx.save();
    ctx.shadowColor=glow?"#8bf0c0":"transparent"; ctx.shadowBlur=glow?20:0;
    ctx.beginPath(); ctx.moveTo(x,y);ctx.lineTo(x+w,y-24);ctx.lineTo(x+w+20,y+h-24);ctx.lineTo(x+20,y+h);ctx.closePath();
    const g=ctx.createLinearGradient(x,y,x+w,y+h);
    g.addColorStop(0,glow?"#1b6d70":"#173d58");g.addColorStop(1,glow?"#123b4b":"#102a40");
    ctx.fillStyle=g;ctx.fill();ctx.shadowBlur=0;
    ctx.strokeStyle=glow?"#a8f4d0":"#6e9cb0";ctx.lineWidth=2;ctx.stroke();
    ctx.beginPath();
    for(let i=1;i<4;i++){
      const xx=x+(w+20)*i/4;
      ctx.moveTo(xx,y-24*i/4);ctx.lineTo(xx+20,y+h-24+24*i/4);
    }
    for(let i=1;i<3;i++){
      const yy=y+(h-24)*i/3;
      ctx.moveTo(x+20*i/3,yy);ctx.lineTo(x+w+20*i/3,yy-24);
    }
    ctx.strokeStyle=glow?"#70cdb2":"#4c7991";ctx.lineWidth=1.5;ctx.stroke();
    ctx.restore();
  }
  function drawBattery(x,y,night,charge,t) {
    const alpha=smooth((night-.12)/.5);
    if(alpha<=0.01)return;
    ctx.save();ctx.globalAlpha=alpha;
    // soft glow around the battery signals stored energy being used at night
    ctx.shadowColor="#75f0ad";ctx.shadowBlur=18+Math.sin(t/500)*4;
    roundedRect(x,y,90,142,15,"#122a24","#82d9a7");
    ctx.shadowBlur=0;
    roundedRect(x+28,y-9,34,10,4,"#82d9a7",null);
    roundedRect(x+13,y+14,64,114,8,"#071a17","#315c4c");
    const fillH=94*charge;
    const grad=ctx.createLinearGradient(0,y+124-fillH,0,y+124);
    grad.addColorStop(0,"#c4ff85");grad.addColorStop(1,"#3ad28a");
    roundedRect(x+20,y+121-fillH,50,Math.max(3,fillH),5,grad,null);
    ctx.fillStyle="#d6ffeb";ctx.font="bold 14px sans-serif";ctx.textAlign="center";
    ctx.fillText("STORAGE",x+45,y+163);
    ctx.restore();
  }
  function draw(t) {
    const night=smooth((scrollMix-.18)/.48);
    const sky=ctx.createLinearGradient(0,0,0,H);
    sky.addColorStop(0,`rgb(${Math.round(mix(115,9,night))},${Math.round(mix(190,24,night))},${Math.round(mix(225,47,night))})`);
    sky.addColorStop(1,`rgb(${Math.round(mix(230,18,night))},${Math.round(mix(242,47,night))},${Math.round(mix(204,53,night))})`);
    ctx.clearRect(0,0,W,H);
    ctx.save();
    // compact rounded illustration card
    roundedRect(8,8,W-16,H-16,36,sky,"rgba(255,255,255,.4)");
    ctx.save();ctx.beginPath();ctx.roundRect(8,8,W-16,H-16,36);ctx.clip();
    // star field fades in as the page moves into night
    for(let i=0;i<34;i++){
      const sx=38+(i*79)%600, sy=26+(i*47)%190;
      ctx.globalAlpha=night*(.35+.45*(.5+.5*Math.sin(t/500+i)));
      ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(sx,sy,(i%3===0)?2:1.2,0,Math.PI*2);ctx.fill();
    }
    ctx.globalAlpha=1;
    // sun travels from right to the far left on a curved orbit; the moon takes over
    const orbitAngle=mix(-.25,Math.PI*1.18,scrollMix);
    const sunX=340+245*Math.cos(orbitAngle);
    const sunY=150+95*Math.sin(orbitAngle);
    drawSun(sunX,sunY,25,1-night);
    const moonX=mix(600,74,smooth((scrollMix-.12)/.78));
    const moonY=mix(72,76,smooth((scrollMix-.12)/.78));
    drawMoon(moonX,moonY,24,night);

    // subtle horizon / hills
    ctx.fillStyle=night?"#0d3a35":"#6ebc85";
    ctx.beginPath();ctx.moveTo(8,280);ctx.quadraticCurveTo(150,230,290,285);ctx.quadraticCurveTo(470,330,672,255);ctx.lineTo(672,440);ctx.lineTo(8,440);ctx.closePath();ctx.fill();
    ctx.fillStyle=night?"#092b2a":"#4c9d70";
    ctx.beginPath();ctx.moveTo(8,320);ctx.quadraticCurveTo(210,270,390,335);ctx.quadraticCurveTo(540,365,672,315);ctx.lineTo(672,440);ctx.lineTo(8,440);ctx.closePath();ctx.fill();

    // panels slide in and gently rotate with the sun/moon cycle
    const panelReveal=smooth((scrollMix+.06)/.25);
    ctx.save();
    ctx.translate(0,0);
    ctx.rotate(Math.sin(scrollMix*Math.PI*2)*.025);
    drawPanel(125,302,130,86,night>.25);
    drawPanel(274,302,130,86,night>.25);
    drawPanel(423,302,130,86,night>.25);
    ctx.restore();
    // energy-flow pulses travel from panels toward the battery after dusk
    if(night>.12){
      for(let i=0;i<5;i++){
        const p=((t/1300+i/5)%1);
        const px=545+p*48, py=300+p*42;
        ctx.globalAlpha=night*(.3+.7*Math.sin(p*Math.PI));
        ctx.fillStyle="#baffd4";ctx.beginPath();ctx.arc(px,py,3.5,0,Math.PI*2);ctx.fill();
      }
    }
    ctx.globalAlpha=1;
    drawBattery(566,240,night,clamp(.25+scrollMix*.75),t);
    // ground line
    ctx.strokeStyle=night?"#6ac9a3":"#e0f4d1";ctx.globalAlpha=.65;ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(28,405);ctx.lineTo(652,405);ctx.stroke();
    ctx.restore();ctx.restore();

    const isArabic=document.documentElement.lang==="ar";
    label.textContent = night>.55
      ? (isArabic ? "وضع الليل · البطارية تمدّ المحطة بالطاقة" : "NIGHT MODE · BATTERY POWERING THE SYSTEM")
      : (isArabic ? "وضع النهار · الألواح تشحن البطارية" : "DAY MODE · SOLAR PANELS CHARGING");
    label.classList.add("is-on");
  }
  function updateScroll() {
    const hero = document.getElementById("home");
    const heroHeight = hero ? hero.offsetHeight : window.innerHeight;
    // Progress through the hero's scroll window: daylight at the top, moonlight as it leaves view.
    scrollMix = clamp(window.scrollY / Math.max(1, heroHeight * 0.72));
    if(!raf) raf=requestAnimationFrame(tick);
  }
  function tick(time) {
    raf=0;
    draw(reduced ? 0 : time);
    if(!reduced && (Math.abs(scrollMix)>0 || window.scrollY>0)) {
      // animate orbit / stars while scrolling or while the story is visible
      raf=requestAnimationFrame(tick);
    }
  }
  // Always draw once; continue the gentle loop, but avoid motion when requested.
  updateScroll();
  window.addEventListener("scroll",updateScroll,{passive:true});
  window.addEventListener("resize",updateScroll);
})();

const translations = {
  en: {
    brandSub:"Infinity Vogt Solar Services",navAbout:"About",navServices:"Services",navProjects:"Projects",navSafety:"Safety",navContact:'Contact us <i class="bi bi-arrow-up-right ms-1"></i>',
    heroEyebrow:"Solar operations. Smarter performance.",heroTitle:'Powering a brighter future, <span class="text-gradient">naturally.</span>',heroCopy:"Reliable solar operations and maintenance that help keep your assets safe, efficient, and performing at their best.",heroCta:'Explore our services <i class="bi bi-arrow-up-right ms-1"></i>',heroSecondary:"Discover IVSS",heroTrust:"Focused on safe, dependable operations",heroTrustSub:"From daily monitoring to specialist field work",heroStat:"DC installed capacity stated in company profile",heroCaptionLabel:"Our focus",heroCaption:"Performance that lasts",
    statFounded:"Established",statDc:"DC installed capacity",statAc:"Active power delivered to grid*",statInverters:"Central inverter units",statsNote:"*Figures reported in the February 2026 company portfolio.",
    aboutKicker:"Who we are",aboutTitle:'Keeping solar assets <span class="text-gradient">safe and productive.</span>',aboutCopy:"Founded in December 2018, Infinity Vogt Solar Services focuses on the operation and maintenance of grid-connected solar power plants, supporting reliable generation and long-term asset care.",aboutCta:'Let’s work together <i class="bi bi-arrow-up-right ms-1"></i>',visionTitle:"Our vision",visionCopy:"Ensure proper and safe operation across the solar assets we support.",missionTitle:"Our mission",missionCopy:"Optimize energy generation, manage asset degradation, and sustain the forecast performance ratio.",principleTitle:"Built around responsible operations",principleCopy:"Technical quality, clear reporting, safety practices, and coordinated field teams work together to support plant performance.",
    servicesKicker:"What we do",servicesTitle:'Specialist services for <span class="text-gradient">solar performance.</span>',servicesCopy:"A practical, multidisciplinary approach to keeping solar plants running safely and reliably.",svc1Title:"Operations & monitoring",svc1Copy:"Monitor plant performance, review operating data, track inverter losses, and support consistent energy generation.",svc2Title:"Electrical maintenance",svc2Copy:"Preventive and corrective maintenance for inverters, grid delivery points, electrical equipment, and related systems.",svc3Title:"Mechanical maintenance",svc3Copy:"Maintenance of tracker systems, suspension components, and other mechanical parts across solar sites.",svc4Title:"PV module cleaning",svc4Copy:"Dry and wet cleaning solutions, including tractor-supported Sunbrush equipment, based on site needs.",svc5Title:"Testing & thermography",svc5Copy:"Specialist support including thermal inspection, inverter testing, commissioning, and module repair activities.",svc6Title:"HSE & reporting",svc6Copy:"Site safety training, work-permit coordination, risk monitoring, and daily, weekly, and monthly reporting.",learnMore:'Learn more <i class="bi bi-arrow-up-right ms-1"></i>',
    safetyBadge:"Safety first",safetyImageTitle:"Every task starts with responsibility.",safetyKicker:"Health, safety & environment",safetyTitle:'Protecting people, <span class="text-gradient">sites and assets.</span>',safetyCopy:"The company portfolio describes a structured HSE approach built around site induction, regular training, emergency drills, activity monitoring, and reporting.",safety1:"Safety induction for visitors and site teams",safety2:"Scheduled HSE training and emergency simulations",safety3:"Risk monitoring and permit-to-work coordination",safety4:"Daily, weekly and monthly HSE reports",
    projectsKicker:"Selected project experience",projectsTitle:'Experience across <span class="text-gradient">solar sites.</span>',projectsCopy:"Examples of sites and project opportunities mentioned in the company portfolio dated February 2026.",projectTagOandM:"O&M",projectTagPipeline:"Pipeline",project1Title:"Benban Solar Park",project1Copy:"The portfolio references multiple Infinity-related sites in Egypt’s Benban solar park.",project2Title:"Minya PV project",project2Copy:"A 1,000 MW project opportunity is listed in the February 2026 portfolio as execution support and O&M services.",project3Title:"Misrata PV project",project3Copy:"A 500 MW solar project in Misrata, Libya, is listed with O&M services in the portfolio pipeline.",projectNote:"Pipeline items reflect how they were described in the February 2026 portfolio and should not be interpreted as confirmation of completion or current contract status.",
    ctaKicker:"Let’s build dependable performance",ctaTitle:"Have a solar project in mind?",ctaCopy:"Talk to our team about operations, maintenance, and specialist solar field services.",ctaButton:'Start a conversation <i class="bi bi-arrow-up-right ms-1"></i>',
    contactKicker:"Get in touch",contactTitle:'Let’s talk <span class="text-gradient">solar.</span>',contactCopy:"Share a few details and outline what kind of solar operations or technical support you’re looking for.",contactEmailLabel:"Email",contactEmailNote:"Add the company’s verified contact email before publishing.",contactLocationLabel:"Location",contactLocation:"Egypt · Project locations as listed in the company portfolio",formName:"Full name",formEmail:"Work email",formService:"What can we help with?",formOption1:"Operations & maintenance",formOption2:"PV module cleaning",formOption3:"Testing & commissioning",formOption4:"HSE and site support",formOption5:"Other inquiry",formMessage:"Message",formSubmit:'Prepare inquiry <i class="bi bi-arrow-up-right ms-1"></i>',formNote:"Demo form — connect an email or CRM service before launch.",formNamePlaceholder:"Jane Smith",formEmailPlaceholder:"you@company.com",formMessagePlaceholder:"Tell us a little about your project...",formFeedback:"This demo form is not connected yet. Please connect a verified company email or CRM before publishing.",footerTag:"Powering with Nature",footerRights:"All rights reserved."
  },
  ar: {
    brandSub:"إنفينيتي فوغت لخدمات الطاقة الشمسية",navAbout:"من نحن",navServices:"خدماتنا",navProjects:"المشروعات",navSafety:"السلامة",navContact:'تواصل معنا <i class="bi bi-arrow-up-left me-1"></i>',
    heroEyebrow:"تشغيل شمسي. أداء أكثر ذكاءً.",heroTitle:'نُشغّل مستقبلًا أكثر إشراقًا، <span class="text-gradient">بطاقة الطبيعة.</span>',heroCopy:"خدمات موثوقة لتشغيل وصيانة محطات الطاقة الشمسية، تساعد على الحفاظ على أصولك آمنة وفعّالة وتعمل بأفضل أداء ممكن.",heroCta:'اكتشف خدماتنا <i class="bi bi-arrow-up-left me-1"></i>',heroSecondary:"اكتشف IVSS",heroTrust:"تركيز على تشغيل آمن وموثوق",heroTrustSub:"من المتابعة اليومية إلى الأعمال الفنية المتخصصة",heroStat:"القدرة المركبة DC وفق ملف الشركة",heroCaptionLabel:"تركيزنا",heroCaption:"أداء يدوم", 
    statFounded:"تأسست عام",statDc:"القدرة المركبة DC",statAc:"القدرة الفعالة الموصلة للشبكة*",statInverters:"وحدات العاكس المركزي",statsNote:"*الأرقام الواردة في الملف التعريفي للشركة الصادر في فبراير 2026.",
    aboutKicker:"من نحن",aboutTitle:'نحافظ على أصول الطاقة الشمسية <span class="text-gradient">آمنة ومنتجة.</span>',aboutCopy:"تأسست Infinity Vogt Solar Services في ديسمبر 2018، وتركز على تشغيل وصيانة محطات الطاقة الشمسية المتصلة بالشبكة، لدعم إنتاج موثوق والحفاظ على الأصول على المدى الطويل.",aboutCta:'لنعمل معًا <i class="bi bi-arrow-up-left me-1"></i>',visionTitle:"رؤيتنا",visionCopy:"ضمان التشغيل السليم والآمن لمحطات الطاقة الشمسية التي نقدم لها الدعم.",missionTitle:"رسالتنا",missionCopy:"تحسين إنتاج الطاقة، والتحكم في تدهور الأصول، والحفاظ على نسبة الأداء المتوقعة.",principleTitle:"تشغيل مسؤول في كل خطوة",principleCopy:"تتكامل الجودة الفنية والتقارير الواضحة وممارسات السلامة وتنسيق الفرق الميدانية لدعم أداء المحطات.",
    servicesKicker:"ماذا نقدم",servicesTitle:'خدمات متخصصة <span class="text-gradient">لأداء شمسي أفضل.</span>',servicesCopy:"نهج عملي متعدد التخصصات للحفاظ على تشغيل محطات الطاقة الشمسية بأمان وموثوقية.",svc1Title:"التشغيل والمتابعة",svc1Copy:"متابعة أداء المحطة وبيانات التشغيل وخسائر العواكس، ودعم استقرار إنتاج الطاقة.",svc2Title:"الصيانة الكهربائية",svc2Copy:"الصيانة الوقائية والتصحيحية للعواكس ومعدات الكهرباء ونقاط توصيل الشبكة والأنظمة المرتبطة بها.",svc3Title:"الصيانة الميكانيكية",svc3Copy:"صيانة أنظمة تتبع الشمس ووحدات التعليق والمكونات الميكانيكية الأخرى في المحطات.",svc4Title:"تنظيف الألواح الشمسية",svc4Copy:"حلول التنظيف الجاف والرطب، بما في ذلك معدات Sunbrush المدعومة بالجرارات وفق احتياجات الموقع.",svc5Title:"الاختبارات والتصوير الحراري",svc5Copy:"دعم متخصص يشمل الفحص الحراري واختبار العواكس والتشغيل الأولي وإصلاح الألواح.",svc6Title:"السلامة والتقارير",svc6Copy:"تدريب السلامة بالمواقع، وتنسيق تصاريح العمل، ومراقبة المخاطر، وإعداد التقارير الدورية.",learnMore:'اعرف المزيد <i class="bi bi-arrow-up-left me-1"></i>',
    safetyBadge:"السلامة أولًا",safetyImageTitle:"كل مهمة تبدأ بالمسؤولية.",safetyKicker:"الصحة والسلامة والبيئة",safetyTitle:'حماية الأفراد <span class="text-gradient">والمواقع والأصول.</span>',safetyCopy:"يوضح ملف الشركة نهجًا منظمًا للسلامة يشمل تعريف العاملين والزوار بالموقع، والتدريب المنتظم، وتدريبات الطوارئ، ومراقبة الأنشطة وإعداد التقارير.",safety1:"تعريف الزوار وفرق العمل بإجراءات السلامة",safety2:"تدريبات مجدولة ومحاكاة لحالات الطوارئ",safety3:"مراقبة المخاطر وتنسيق تصاريح العمل",safety4:"تقارير سلامة يومية وأسبوعية وشهرية",
    projectsKicker:"نماذج من خبرات المشروعات",projectsTitle:'خبرة عبر <span class="text-gradient">مواقع الطاقة الشمسية.</span>',projectsCopy:"أمثلة على مواقع وفرص مشروعات وردت في الملف التعريفي للشركة الصادر في فبراير 2026.",projectTagOandM:"تشغيل وصيانة",projectTagPipeline:"ضمن خط المشروعات",project1Title:"مجمع بنبان للطاقة الشمسية",project1Copy:"يشير الملف إلى عدة مواقع مرتبطة بإنفينيتي داخل مجمع بنبان للطاقة الشمسية في مصر.",project2Title:"مشروع الطاقة الشمسية بالمنيا",project2Copy:"وردت فرصة مشروع بقدرة 1000 ميجاوات في ملف فبراير 2026 ضمن دعم التنفيذ وخدمات التشغيل والصيانة.",project3Title:"مشروع مصراتة للطاقة الشمسية",project3Copy:"ورد مشروع شمسي بقدرة 500 ميجاوات في مصراتة بليبيا ضمن خط المشروعات مع خدمات التشغيل والصيانة.",projectNote:"تعكس مشروعات خط الأعمال ما ورد في ملف فبراير 2026، ولا تعني بالضرورة اكتمالها أو تأكيد استمرار العقود حاليًا.",
    ctaKicker:"لنبنِ أداءً موثوقًا",ctaTitle:"هل لديك مشروع للطاقة الشمسية؟",ctaCopy:"تواصل مع فريقنا لمناقشة التشغيل والصيانة والخدمات الفنية المتخصصة للمحطات الشمسية.",ctaButton:'ابدأ التواصل <i class="bi bi-arrow-up-left me-1"></i>',
    contactKicker:"تواصل معنا",contactTitle:'لنتحدث عن <span class="text-gradient">الطاقة الشمسية.</span>',contactCopy:"شاركنا بعض التفاصيل عن مشروعك ونوع خدمات التشغيل أو الدعم الفني الذي تحتاج إليه.",contactEmailLabel:"البريد الإلكتروني",contactEmailNote:"أضف بريد الشركة الرسمي الذي تم التحقق منه قبل نشر الموقع.",contactLocationLabel:"الموقع",contactLocation:"مصر · مواقع المشروعات وفق الملف التعريفي للشركة",formName:"الاسم بالكامل",formEmail:"البريد الإلكتروني للعمل",formService:"كيف يمكننا مساعدتك؟",formOption1:"التشغيل والصيانة",formOption2:"تنظيف الألواح الشمسية",formOption3:"الاختبارات والتشغيل الأولي",formOption4:"السلامة ودعم الموقع",formOption5:"استفسار آخر",formMessage:"الرسالة",formSubmit:'تجهيز الاستفسار <i class="bi bi-arrow-up-left me-1"></i>',formNote:"نموذج تجريبي — يجب ربطه بالبريد أو بنظام إدارة العملاء قبل الإطلاق.",formNamePlaceholder:"الاسم بالكامل",formEmailPlaceholder:"you@company.com",formMessagePlaceholder:"أخبرنا قليلًا عن مشروعك...",formFeedback:"هذا النموذج التجريبي غير متصل حاليًا. يرجى ربطه ببريد رسمي أو بنظام إدارة العملاء قبل النشر.",footerTag:"نستمد الطاقة من الطبيعة",footerRights:"جميع الحقوق محفوظة."
  }
};
const htmlKeys = new Set(["navContact","heroTitle","heroCta","aboutTitle","aboutCta","servicesTitle","learnMore","safetyTitle","projectsTitle","ctaButton","contactTitle","formSubmit"]);
const root = document.documentElement;
function setLanguage(lang) {
  const dict = translations[lang] || translations.en;
  root.lang = lang; root.dir = lang === "ar" ? "rtl" : "ltr";
  document.body.dir = root.dir;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (dict[key] !== undefined) el.innerHTML = htmlKeys.has(key) ? dict[key] : escapeHtml(dict[key]);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (dict[key] !== undefined) el.placeholder = dict[key];
  });
  document.getElementById("langToggle").innerHTML = lang === "en" ? '<span class="fw-bold small">ع</span>' : '<span class="fw-bold small">EN</span>';
  document.getElementById("langToggle").setAttribute("aria-label", lang === "en" ? "التبديل إلى العربية" : "Switch to English");
  document.title = lang === "ar" ? "IVSS — نستمد الطاقة من الطبيعة" : "IVSS — Powering with Nature";
  localStorage.setItem("ivss-language", lang);
}
function escapeHtml(s) { return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
document.getElementById("langToggle").addEventListener("click", () => setLanguage(root.lang === "en" ? "ar" : "en"));
function setTheme(theme) {
  root.setAttribute("data-bs-theme", theme);
  document.getElementById("themeToggle").innerHTML = theme === "dark" ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon-stars"></i>';
  document.getElementById("themeToggle").setAttribute("aria-label", theme === "dark" ? "Switch to light mode" : "Switch to dark mode");
  localStorage.setItem("ivss-theme", theme);
}
document.getElementById("themeToggle").addEventListener("click", () => setTheme(root.getAttribute("data-bs-theme") === "dark" ? "light" : "dark"));
const savedTheme = localStorage.getItem("ivss-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
setTheme(savedTheme);
setLanguage(localStorage.getItem("ivss-language") || "en");
document.getElementById("year").textContent = new Date().getFullYear();

// Scroll progress indicator
const progressBar = document.getElementById("scrollProgress");
function updateScrollProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${progress}%`;
}
window.addEventListener("scroll", updateScrollProgress, { passive: true });
updateScrollProgress();

// Count the portfolio figures up once when they enter the viewport.
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    countObserver.unobserve(el);
    const target = Number(el.dataset.count);
    if (reduceMotion || !Number.isFinite(target)) { el.textContent = String(target); return; }
    const duration = 1300;
    const start = performance.now();
    function tick(now) {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = Math.round(target * eased).toLocaleString(root.lang === "ar" ? "ar-EG" : "en-US");
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}, { threshold: .55 });
document.querySelectorAll("[data-count]").forEach(el => countObserver.observe(el));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: .12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const msg = translations[root.lang === "ar" ? "ar" : "en"].formFeedback;
  document.getElementById("formFeedback").textContent = msg;
});

// Close mobile navigation after choosing a section.
document.querySelectorAll("#mainNav .nav-link, #mainNav .btn").forEach(link => {
  link.addEventListener("click", () => {
    const nav = document.getElementById("mainNav");
    if (nav.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(nav).hide();
  });
});
