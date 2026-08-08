import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowLeft, ArrowRight, BadgeCheck, Banknote, BookOpen, BriefcaseBusiness,
  Building2, CalendarDays, CheckCircle2, ChevronRight, CircleDollarSign,
  ClipboardCheck, Code2, Expand, Factory, FileCheck2, GitBranch,
  GraduationCap, HandCoins, Handshake, Headphones, Landmark,
  LockKeyhole, Megaphone, Menu, MessageCircle, Network, Palette, Presentation,
  ReceiptText, Rocket, Scale, Search, ShieldCheck, Store, UserCheck, UserRound,
  Users, WalletCards, Waypoints, X,
} from 'lucide-react'
import './styles.css'

const A2 = `${import.meta.env.BASE_URL}assets/v2/`
const A3 = `${import.meta.env.BASE_URL}assets/v3/`
const A4 = `${import.meta.env.BASE_URL}assets/v4/`
const A5 = `${import.meta.env.BASE_URL}assets/v5/`
const A6 = `${import.meta.env.BASE_URL}assets/v6/`
const A7 = `${import.meta.env.BASE_URL}assets/v7/`

const products = [
  { name:'Invoice Financing', icon:'invoice.svg', copy:'Turn approved invoices into working cash before the customer pays.', tone:'blue' },
  { name:'Letter of Guarantee', icon:'lg.svg', copy:'Secure the guarantees required to win or execute a contract.', tone:'ice' },
  { name:'Purchase Order Financing', icon:'po.svg', copy:'Fund the fulfilment of a confirmed purchase order.', tone:'violet' },
  { name:'Working Capital', icon:'working-capital.svg', copy:'Cover day-to-day operating needs across the cash cycle.', tone:'sky' },
  { name:'Payroll Financing', icon:'payroll.svg', copy:'Bridge critical salary commitments when cash timing is tight.', tone:'lavender' },
  { name:'Real Estate Financing', icon:'real-estate.svg', copy:'Finance eligible property acquisition or development needs.', tone:'paper' },
  { name:'Supply Chain Financing', icon:'scf.svg', copy:'Enable early supplier payment inside buyer-led programs.', tone:'royal', wide:true },
]

const executives = [
  ['Mohammed Shahram Javid', 'Chief Technology Officer', 'shahram.webp'],
  ['Rayan Al-Duhaiman', 'Chief Business Officer', 'rayan-business.webp'],
  ['Abdulrahman Al-Sayari', 'Chief Growth Officer', 'abdulrahman.webp'],
  ['Daniyal Alvi', 'Chief Financial Officer', 'daniyal.webp'],
  ['Samer Samara', 'Chief Control Officer', 'samer.webp'],
  ['Reem Murad', 'Chief Legal & Governance Officer', null],
]

const team = [
  ['Mohammed Alghofaily', 'Product Lead / UX'], ['Fahad Aldossari', 'Product Lead'],
  ['Bandar Alarifi', 'Product Lead'], ['Alma Alfowzan', 'Business Analyst'],
  ['Mohammed Alasaker', 'Business Analyst'], ['Noura Aljmhoor', 'Business Analyst'],
  ['Danah Alsuhaibani', 'Business Analyst'], ['Norah Alahmed', 'Business Analyst'],
  ['Abdulwahab Alghamdi', 'Business Analyst'], ['Najla Alharthi', 'UX/UI Designer'],
  ['Nouf Alkernass', 'UX/UI Designer'],
]

const departments = [
  ['Credit', 'الائتمان', CircleDollarSign], ['Compliance, Risk & BCM', 'الالتزام والمخاطر واستمرارية الأعمال', ShieldCheck],
  ['Legal & Governance', 'الشؤون القانونية والحوكمة', Scale], ['Business Operations', 'عمليات الأعمال', BriefcaseBusiness],
  ['Portfolio Management', 'إدارة المحافظ', WalletCards], ['Collections', 'التحصيل', HandCoins],
  ['Customer Care', 'العناية بالعملاء', Headphones], ['Technology & Engineering', 'التقنية والهندسة', Code2],
  ['Cybersecurity', 'الأمن السيبراني', LockKeyhole], ['Finance & Treasury', 'المالية والخزينة', Banknote],
  ['Human Resources', 'الموارد البشرية', UserCheck], ['Business Development & Partnership', 'تطوير الأعمال والشراكات', Handshake],
  ['Marketing & Branding Communication', 'التسويق والعلامة التجارية والتواصل', Megaphone], ['Digital Investors', 'المستثمرون الرقميون', Users],
  ['Digital Experience', 'التجربة الرقمية', Palette], ['Internal Audit', 'المراجعة الداخلية', ClipboardCheck],
]

const milestones = [
  { year:'2018', title:'Manafa founded', icon:Rocket, copy:'The company begins building new ways for businesses to access financing.' },
  { year:'2022', title:'Debt crowdfunding licence', icon:FileCheck2, copy:'Manafa receives its full licence from the Saudi Central Bank.' },
  { year:'2022', title:'SAR 106M Series A', icon:CircleDollarSign, copy:'STV and Wa’ed Ventures back the next stage of growth.', image:'series-a.jpg' },
  { year:'2023', title:'Saudi Unicorns', icon:BadgeCheck, copy:'Manafa is selected among Saudi Arabia’s high-potential technology companies.', image:'saudi-unicorns.png', imageSet:'v3' },
  { year:'2024–25', title:'National SCF programs', icon:Handshake, copy:'Aramco and Saudi Electricity Company mark a new scale of supply-chain financing.', image:'aramco-signing.webp' },
  { year:'2025', title:'SCF Regulatory Sandbox', icon:ShieldCheck, copy:'SAMA permits Manafa to test supply-chain financing solutions.' },
]

const slides = [
  { id:'welcome', type:'cover', title:'Welcome to Manafa', subtitle:'Digital Business onboarding' },
  { id:'agenda', type:'agenda', title:'Today’s journey', lede:'A guided introduction to Manafa, its financing business, the digital organisation you are joining and the 2026 product direction.' },
  { id:'group', type:'group', title:'A growing group with shared roots', lede:'Manafa’s journey has produced specialised sister companies and a dedicated technology organisation, each with a distinct mandate.' },
  { id:'at-a-glance', type:'at-glance', title:'Manafa at a glance', lede:'Manafa is a Saudi fintech that connects businesses seeking finance with individuals and institutions seeking investment opportunities.', sources:[['Manafa — About','https://manafa.sa/about']] },
  { id:'leadership', type:'leadership', title:'The executive team', lede:'The executive team brings together business, technology, growth, finance, control and governance under the Founder and CEO.' },
  { id:'departments', type:'departments', title:'How Manafa is organized', lede:'These internal departments collectively run Manafa and work together across policy, risk, operations, customer outcomes, growth and delivery.' },
  { id:'business-model', type:'business-model', title:'How Manafa connects capital with business needs', lede:'Crowdlending and supply-chain financing involve different participants, while relying on one regulated digital and operational foundation.' },
  { id:'company-story', type:'milestones', title:'How Manafa grew into a national financing platform', lede:'The story moves from founding and licensing to institutional investment, national recognition and large-scale financing programs.' },
  { id:'regulation', type:'regulation', title:'Two regulatory milestones shaped the business', lede:'The debt-crowdfunding licence established Manafa’s core regulated activity; the SCF sandbox opened a controlled path for the next business line.', sources:[['SAMA — debt crowdfunding licence','https://www.sama.gov.sa/en-us/mediacenter/news/pages/news-801.aspx'],['SAMA — SCF Regulatory Sandbox','https://www.sama.gov.sa/en-us/mediacenter/news/pages/news-1104.aspx']] },
  { id:'growth-milestones', type:'growth', title:'Investment and national recognition accelerated the journey', lede:'External backing helped Manafa invest in technology and talent, while the Saudi Unicorns selection recognised its potential to scale beyond the local market.', sources:[['STV — Investing in Manafa','https://stv.vc/blog/en/2022/12/28/investing-in-manafa-enabling-sme-financing-and-unlocking-new-asset-classes-to-retail-and-institutional-investors'],['Saudi Unicorns Program','https://hub.misk.org.sa/programs/entrepreneurship/saudi-unicorns/']] },
  { id:'national-programs', type:'programs', title:'SCF partnerships moved Manafa to national scale', lede:'The Aramco and Saudi Electricity Company programs brought Manafa into complex buyer-led ecosystems serving large supplier networks.', sources:[['Aramco — SCF announcement','https://www.aramco.com/en/news-media/news/2024/aramco-sidf-and-taulia-announce-supply-chain-financing-solution'],['Manafa — SEC SCF announcement','https://www.linkedin.com/posts/manafa-co_fii9-activity-7389028836077678592-D87w']] },
  { id:'metrics', type:'metrics', title:'Manafa today', lede:'These public figures show the scale of activity the platform, operations and product teams support today.', sources:[['Manafa — Achievements','https://manafa.sa/achievement']] },
  { id:'partners', type:'partners', title:'The ecosystem around Manafa', lede:'Manafa scales through institutional investors and partnerships with public and private organisations across the SME-financing ecosystem.' },
  { id:'business-section', type:'section', chapter:'02', title:'Business and products', subtitle:'The financing portfolio and the journey behind every request', accent:'violet' },
  { id:'products', type:'products', title:'Seven ways Manafa finances businesses', lede:'Each product addresses a different cash-flow or contractual need, but all rely on the same disciplines of onboarding, assessment, funding and servicing.' },
  { id:'customer-channels', type:'customer-channels', title:'Two customer relationships, connected across web and mobile', lede:'Borrowers and investors use different journeys, but each relationship continues across Manafa’s web and mobile channels.', sources:[['Manafa Business — App Store','https://apps.apple.com/us/app/manafa-business/id6476872737'],['Manafa — App Store','https://apps.apple.com/us/app/manafa-%D9%85%D9%86%D8%A7%D9%81%D8%B9/id1555411095']] },
  { id:'back-office', type:'back-office', title:'The platforms behind our customer channels', lede:'Our customer channels connect to an internal platform landscape made up of the Admin Portal and three additional back-office platforms.', sources:[['Current Admin Coverage Matrix — Confluence','https://manafaco.atlassian.net/wiki/spaces/PTS/pages/4334354476/Current+Admin+Coverage+Matrix+per-feature+mapping'],['Invoice Management Platform — Confluence','https://manafaco.atlassian.net/wiki/spaces/PTS/pages/4303716362/Invoice+Management+Platform+Phase+1'],['SCF FinOps BRD — Confluence','https://manafaco.atlassian.net/wiki/spaces/EFD/pages/4387176460/SCF+FinOps+BRD']] },
  { id:'connected-journeys', type:'connected-journeys', title:'Two journeys complete the financing cycle', lede:'The company journey creates and services a financing opportunity; the investment journey provides the capital and follows its return.' },
  { id:'digital-section', type:'section', chapter:'03', title:'Digital Business', subtitle:'The stakeholders, team and delivery model', accent:'teal' },
  { id:'product-org', type:'product-org', title:'Where Digital Product sits', lede:'Product reports through Technology and is organised into two connected verticals. This onboarding focuses on Digital Business.' },
  { id:'team', type:'team', title:'Meet the Digital Business team', lede:'Product Leads, Business Analysts and UX/UI Designers work together from problem definition through production delivery.' },
  { id:'delivery', type:'delivery', title:'How a demand becomes a production release', lede:'Traceability connects the original business demand to discovery, analysis, delivery work, release decisions and post-launch learning.' },
  { id:'ways-of-working', type:'ways', title:'How we work together', lede:'Our workflow gives structure to delivery without removing ownership: discuss early, document decisions and refine the solution together.' },
  { id:'how-to-thrive', type:'thrive', title:'How to thrive at Manafa', lede:'You are not expected to know everything from day one. You are expected to participate, communicate and grow through real work.' },
  { id:'tools', type:'tools', title:'Your daily toolkit and company essentials', lede:'Each tool has a clear purpose—from communication and documentation to delivery tracking, HR requests and professional development.' },
  { id:'strategy-section', type:'section', chapter:'04', title:'2026 Product Strategy', subtitle:'How Manafa’s digital product model is evolving', accent:'violet' },
  { id:'strategy-problem', type:'strategy-problem', title:'Why the current product model must change', lede:'The 2026 strategy responds to a single expanding Admin Portal that concentrates unrelated domains, obscures ownership and makes every new product harder to scale safely.' },
  { id:'strategy-method', type:'strategy-method', title:'How we searched for the right product model', lede:'We mapped the current operating model, studied comparable financial platforms and tested alternative structures before choosing a direction.' },
  { id:'strategy-meaning', type:'strategy-meaning', title:'The model we chose follows four structural rules', lede:'These rules translate the research into a product model Manafa can own, evolve and measure consistently.' },
  { id:'platform-strategy', type:'platform-strategy', title:'The 2026 target product suite', lede:'Audience-facing channels sit above focused business hubs, supported by shared platform capabilities.' },
  { id:'platform-progress', type:'platform-progress', title:'How we are progressing toward the strategy', lede:'Some products are live, some are being built, and others remain in analysis or ideation; the target suite is a direction of travel, not a claim that everything is complete.' },
  { id:'thank-you', type:'thanks', title:'Welcome aboard', subtitle:'Questions?' },
]

function Logo({ inverse=false }) {
  return <img className={`logo${inverse?' logo--inverse':''}`} src={`${A2}manafa-logo.svg`} alt="Manafa" />
}

function Person({ src, name }) {
  return src ? <img src={`${A2}${src}`} alt={name}/> : <div className="person-placeholder"><UserRound/></div>
}

function SourceButton({ slide, onOpen }) {
  return slide.sources?.length ? <button className="source-button" onClick={onOpen}>Sources</button> : null
}

function Chrome({ index, total, dark=false }) {
  return <><Logo inverse={dark}/><div className="counter">{String(index+1).padStart(2,'0')} / {total}</div></>
}

function IconBubble({ Icon, tone='blue' }) {
  return <span className={`icon-bubble icon-bubble--${tone}`}><Icon/></span>
}

function AnimatedNumber({ value, decimals=0, suffix='' }) {
  const [display,setDisplay] = useState(0)
  useEffect(()=>{
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setDisplay(value); return }
    const started=performance.now();const duration=1250
    const tick=now=>{const progress=Math.min(1,(now-started)/duration);const eased=1-Math.pow(1-progress,3);setDisplay(value*eased);if(progress<1)requestAnimationFrame(tick)}
    const frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame)
  },[value])
  return <>{display.toLocaleString('en-US',{minimumFractionDigits:decimals,maximumFractionDigits:decimals})}{suffix}</>
}

function RenderSlide({ slide, index, total, onSources }) {
  if (slide.type === 'cover') return <section className="slide cover"><Logo inverse/><div className="cover-rings"/><div className="cover-copy"><h1>{slide.title}</h1><p>{slide.subtitle}</p><span>For the people shaping Manafa’s digital products.</span></div><div className="counter">01 / {total}</div></section>

  if (slide.type === 'section') return <section className={`slide section ${slide.accent?`section--${slide.accent}`:''}`}><Logo inverse/><div className="section-rings"/><div className="section-index">{slide.chapter}</div><div className="section-copy"><h1>{slide.title}</h1><p>{slide.subtitle}</p></div><div className="counter">{String(index+1).padStart(2,'0')} / {total}</div></section>

  const dark = ['metrics','thanks'].includes(slide.type)
  return <section className={`slide content content--${slide.type}${dark?' dark':''}`}>
    <Chrome index={index} total={total} dark={dark}/>
    <header className="content-header"><h1>{slide.title}</h1><div/>{slide.lede&&<p className="slide-lede">{slide.lede}</p>}</header>

    {slide.type === 'agenda' && <div className="agenda-grid">{[
      ['01','Manafa group and company','The group, company story, regulation, scale and ecosystem.'],
      ['02','Business and products','Financing products, customer channels and the platforms behind them.'],
      ['03','Digital Business','Organisation, people, scope, delivery and daily tools.'],
      ['04','2026 Product Strategy','Why the model is evolving and how the transition is progressing.'],
    ].map(([n,t,c])=><article key={n}><b>{n}</b><div><h2>{t}</h2><p>{c}</p></div></article>)}</div>}

    {slide.type === 'at-glance' && <div className="at-glance">
      <div className="at-glance-hero"><div className="radar"><span/><span/><span/></div><Logo/><p>A Saudi fintech platform that brings business financing and investment together.</p></div>
      <div className="glance-facts">
        <article><IconBubble Icon={Building2}/><div><strong>Business financing</strong><p>Digital journeys for companies seeking finance across seven products.</p></div></article>
        <article><IconBubble Icon={Users} tone="violet"/><div><strong>Capital participation</strong><p>Individuals and institutions participate through investor and funder experiences.</p></div></article>
        <article><IconBubble Icon={Network} tone="teal"/><div><strong>One connected operation</strong><p>Credit, operations, controls and technology coordinate behind every journey.</p></div></article>
      </div>
    </div>}

    {slide.type === 'business-model' && <div className="business-model">
      <div className="model-orbit model-orbit--borrower"><IconBubble Icon={Building2}/><strong>Borrowers</strong><span>Businesses seeking financing</span></div>
      <div className="model-orbit model-orbit--investor"><IconBubble Icon={Users} tone="teal"/><strong>Investors</strong><span>Individuals and institutions providing capital</span></div>
      <div className="model-orbit model-orbit--buyer"><IconBubble Icon={Store} tone="violet"/><strong>Buyers</strong><span>Anchor companies running SCF programs</span></div>
      <div className="model-orbit model-orbit--funder"><IconBubble Icon={Landmark} tone="coral"/><strong>Funders</strong><span>Institutions funding SCF opportunities</span></div>
      <div className="model-core"><Logo inverse/><small>DIGITAL PLATFORM</small></div>
      <svg viewBox="0 0 1000 420" preserveAspectRatio="none" aria-hidden="true"><path d="M180 90 C360 70 360 200 500 210"/><path d="M820 90 C640 70 640 200 500 210"/><path d="M180 330 C350 350 360 230 500 210"/><path d="M820 330 C650 350 640 230 500 210"/></svg>
      <div className="model-note"><strong>One platform</strong><span>Crowdlending and supply-chain financing use different relationships, but share the same operating foundation.</span></div>
    </div>}

    {slide.type === 'milestones' && <div className="milestones">
      <div className="milestone-wave"/>
      {milestones.map((m,i)=>{const Icon=m.icon;const src=m.image?`${m.imageSet==='v3'?A3:A2}${m.image}`:null;return <article key={`${m.year}-${m.title}`} style={{'--i':i}} className={src?'has-image':''}><div className="milestone-node"/>{src?<img src={src} alt=""/>:<IconBubble Icon={Icon} tone={i>3?'teal':i>1?'violet':'blue'}/>}<div className="milestone-year">{m.year}</div><h2>{m.title}</h2><p>{m.copy}</p></article>})}
    </div>}

    {slide.type === 'regulation' && <div className="regulation">
      <div className="sama-mark"><img src={`${A7}sama-logo.svg`} alt="Saudi Central Bank"/></div>
      <div className="reg-cards">
        <article><div className="reg-year">2022</div><IconBubble Icon={FileCheck2}/><h2>Debt Crowdfunding Licence</h2><p>The full licence established Manafa’s regulated crowdlending activity.</p><footer>Licensed activity</footer></article>
        <div className="reg-bridge"><span>regulated growth</span><i/></div>
        <article><div className="reg-year">2025</div><IconBubble Icon={ShieldCheck} tone="teal"/><h2>SCF Regulatory Sandbox</h2><p>Permission to test supply-chain financing solutions created the next regulated path.</p><footer>Controlled experimentation</footer></article>
      </div>
    </div>}

    {slide.type === 'growth' && <div className="growth">
      <article className="growth-story growth-story--series"><img src={`${A2}series-a.jpg`} alt="Manafa Series A team"/><div className="growth-copy"><span>DECEMBER 2022</span><h2>SAR 106 million Series A</h2><p>Led by STV and Wa’ed Ventures, the round supported technology, talent and expansion.</p><div className="mini-logos"><span className="stv"><img src={`${A3}stv.png`} alt="STV"/></span><img src={`${A5}waed.png`} alt="Wa'ed Ventures"/></div></div></article>
      <article className="growth-story growth-story--unicorn"><img src={`${A3}saudi-unicorns.png`} alt="Saudi Unicorns Program and its operating partners"/><div className="growth-copy"><span>SELECTED IN 2023</span><h2>Saudi Unicorns Program</h2><p>Manafa joined a national program supporting high-potential Saudi technology companies on their path toward global scale and unicorn status.</p></div></article>
    </div>}

    {slide.type === 'programs' && <div className="programs">
      <article><figure><img src={`${A2}aramco-signing.webp`} alt="Aramco SCF signing"/></figure><div><span>FII8 · 2024</span><h2>Aramco</h2><p>Manafa joined Aramco, SIDF and Taulia in a wide-reaching supply-chain financing solution designed to support Aramco suppliers.</p><div className="program-outcome"><strong>Landmark enterprise SCF program</strong><div className="program-logos"><img src={`${A5}aramco.svg`} alt="Aramco"/><img src={`${A5}sidf.png`} alt="SIDF"/><Logo/></div></div></div></article>
      <article><figure><img src={`${A5}sec-signing.jpg`} alt="Manafa and Saudi Electricity Company announcing the SCF program at FII9"/></figure><div><span>FII9 · 2025</span><h2>Saudi Electricity Company</h2><p>The model expanded to a second national anchor, extending financing coverage across the electricity supply chain.</p><div className="program-outcome"><strong>Expansion of the national model</strong><div className="program-logos program-logos--sec"><img src={`${A5}sec.svg`} alt="Saudi Electricity Company"/><img src={`${A5}sidf.png`} alt="SIDF"/><Logo/></div></div></div></article>
    </div>}

    {slide.type === 'metrics' && <div className="metrics-scene"><div className="metric-rings"><i/><i/></div><div className="metric-primary"><span>TOTAL FINANCING</span><strong><AnimatedNumber value={3.2} decimals={1} suffix="B+"/></strong><small>SAR financed through Manafa</small></div><div className="metric-secondary"><article><Users/><div><strong><AnimatedNumber value={200} suffix="K+"/></strong><span>users</span></div></article><article><BriefcaseBusiness/><div><strong><AnimatedNumber value={190} suffix="+"/></strong><span>team members</span></div></article><article><Handshake/><div><strong><AnimatedNumber value={12} suffix="+"/></strong><span>partnerships</span></div></article></div><p>Public figures shown on Manafa’s achievement page.</p></div>}

    {slide.type === 'leadership' && <div className="leadership"><div className="ceo"><Person src="ceo.webp" name="Abdulaziz Aladwani"/><div><span>FOUNDER & CEO</span><strong>Abdulaziz Aladwani</strong></div></div><div className="leadership-tree"/><div className="executive-row">{executives.map(([n,r,p])=><article key={n}><Person src={p} name={n}/><div><strong>{n}</strong><span>{r}</span></div></article>)}</div></div>}

    {slide.type === 'group' && <div className="group"><div className="group-origin"><div className="group-rings"/><Logo/></div><div className="group-line"/><article className="company company--manafa"><Logo/><strong>Manafa</strong><p>The regulated platform for business financing and capital participation.</p></article><article className="company company--sukuk"><img src={`${A5}sukuk.svg`} alt="Sukuk Capital"/><strong>Sukuk Capital</strong><p>A sister company focused on debt instruments and capital-market opportunities.</p></article><article className="company company--abyan"><img src={`${A6}abyan-color.svg`} alt="Abyan Capital"/><strong>Abyan Capital</strong><p>A sister company providing digital investment and asset-management experiences.</p></article><article className="company company--tech"><Logo/><strong>Manafa Technologies</strong><p>The Pakistan-based engineering organisation extending Manafa’s technology capacity.</p></article></div>}

    {slide.type === 'partners' && <div className="partners"><div className="investor-band"><span>INSTITUTIONAL INVESTORS</span><div className="logo-tile logo-tile--dark"><img src={`${A3}stv.png`} alt="STV"/></div><div className="logo-tile"><img src={`${A5}waed.png`} alt="Wa'ed Ventures"/></div></div><div className="partner-field"><span>STRATEGIC PARTNERS</span>{[['kafalah.svg','Kafalah'],['mudad.png','Mudad'],['sme-bank.svg','SME Bank'],['cultural-fund.svg','Cultural Development Fund'],['tdf.svg','Tourism Development Fund'],['sidf.png','SIDF']].map(([src,name],i)=><div className="logo-tile" key={name} style={{'--i':i}}><img src={`${A5}${src}`} alt={name}/></div>)}</div></div>}

    {slide.type === 'products' && <div className="products">{products.map((p,i)=><article key={p.name} className={`product product--${p.tone}${p.wide?' product--wide':''}`} style={{'--i':i}}><img src={`${A2}${p.icon}`} alt=""/><div><h2>{p.name}</h2><p>{p.copy}</p></div></article>)}<footer><span>Different business needs.</span><strong>One financing platform.</strong></footer></div>}

    {slide.type === 'departments' && <div className="departments">{departments.map(([name,arabic,Icon],i)=><article key={name} style={{'--i':i}}><IconBubble Icon={Icon} tone={i%4===1?'violet':i%4===2?'teal':i%4===3?'coral':'blue'}/><div><strong>{name}</strong><span lang="ar" dir="rtl">{arabic}</span></div></article>)}</div>}

    {slide.type === 'product-org' && <div className="product-org"><div className="org-head"><Person src="shahram.webp" name="Mohammed Shahram Javid"/><div><span>CHIEF TECHNOLOGY OFFICER</span><strong>Mohammed Shahram Javid</strong></div></div><div className="org-connector"/><div className="org-branches"><article className="org-branch org-branch--focus"><em>YOUR ONBOARDING VERTICAL</em><Person src="abdullah.webp" name="Abdullah Almazyad"/><div><span>PRODUCT DIRECTOR</span><h2>Abdullah Almazyad</h2><strong>Digital Business</strong></div></article><article className="org-branch org-branch--context"><div className="person-placeholder"><UserRound/></div><div><span>PRODUCT DIRECTOR</span><h2>Raghad Aljuhani</h2><strong>Digital Investors & Digital Experience</strong></div></article></div></div>}

    {slide.type === 'team' && <div className="team"><div className="team-lead"><div><span>PRODUCT DIRECTOR</span><strong>Abdullah Almazyad</strong><p>Digital Business</p></div></div><div className="team-members">{team.map(([n,r],i)=><article key={n} style={{'--i':i}}><div className="initials">{n.split(' ').map(x=>x[0]).slice(0,2).join('')}</div><div><strong>{n}</strong><span>{r}</span></div></article>)}</div></div>}

    {slide.type === 'customer-channels' && <div className="customer-channels">
      <article className="channel-panel channel-panel--borrower"><div className="channel-copy"><img src={`${A5}manafa-business-icon.jpg`} alt="Manafa Business app icon"/><span>WEB · MOBILE</span><h2>Borrower relationship</h2><p>Businesses discover financing, apply and track requests through Manafa Business.</p></div><div className="channel-phones">{[1,2,3].map(n=><figure key={n}><img src={`${A5}manafa-business-0${n}.png`} alt={`Manafa Business App Store screen ${n}`}/></figure>)}</div></article>
      <article className="channel-panel channel-panel--investor"><div className="channel-phones">{[1,2,3].map(n=><figure key={n}><img src={`${A6}manafa-investor-0${n}.png`} alt={`Manafa investor App Store screen ${n}`}/></figure>)}</div><div className="channel-copy"><img src={`${A6}manafa-investor-icon.jpg`} alt="Manafa investor app icon"/><span>WEB · MOBILE</span><h2>Investor relationship</h2><p>Investors discover opportunities, invest and monitor their portfolios through Manafa.</p></div></article>
    </div>}

    {slide.type === 'back-office' && <div className="back-office platform-landscape"><article className="admin-platform"><div className="platform-heading"><IconBubble Icon={Network}/><div><span>CORE OPERATIONS PLATFORM</span><h2>Admin Portal</h2></div></div><p>The broad internal workspace used by Manafa teams to manage financing, customer and operational activity.</p><div className="admin-capabilities">{['Dashboards & analytics','Users, companies & investors','Financing requests & opportunities','Credit, committees & approvals','Loans, receivables & collateral','Compliance & risk controls','Transactions, wallets & treasury','Communications & platform utilities'].map(x=><span key={x}>{x}</span>)}</div></article><div className="focused-platforms">{[
      ['CRM','Customer relationship platform','Manages customer profiles, activities, interactions and servicing context.',Users,'blue'],
      ['Invoice Management','Invoice and tax operations','Creates and tracks borrower and customer invoices, including ZATCA-compliant invoicing controls.',ReceiptText,'violet'],
      ['SCF FinOps','Supply-chain finance operations','Manages SCF invoices, early payments, offers, loans and related settlement activity.',Waypoints,'teal'],
    ].map(([name,domain,copy,Icon,tone])=><article key={name}><IconBubble Icon={Icon} tone={tone}/><span>{domain}</span><h2>{name}</h2><p>{copy}</p></article>)}</div></div>}

    {slide.type === 'connected-journeys' && <div className="connected-journeys">{[
      ['COMPANY FINANCING JOURNEY','Borrower',['Onboard company','Apply for financing','Credit assessment','Approve offer','Publish opportunity','Disburse financing','Repay & close'],Building2,'blue'],
      ['INVESTMENT JOURNEY','Investor',['Onboard investor','Browse opportunities','Review disclosure','Invest capital','Track portfolio','Receive repayments','Complete investment'],WalletCards,'teal'],
    ].map(([label,actor,steps,Icon,tone])=><article className={`journey journey--${tone}`} key={label}><header><IconBubble Icon={Icon} tone={tone}/><div><span>{label}</span><h2>{actor}</h2></div></header><div className="journey-flow">{steps.map((step,i)=><div key={step}><b>{String(i+1).padStart(2,'0')}</b><strong>{step}</strong>{i<steps.length-1&&<ChevronRight/>}</div>)}</div></article>)}</div>}

    {slide.type === 'strategy-meaning' && <div className="strategy-decision"><div className="decision-rules">{[
      ['01','Keep customer logic in channels','Borrower, investor, funder and buyer experiences remain close to their audiences.'],
      ['02','Organise operations into domain products','Focused products own bounded operational capabilities instead of expanding one Admin Portal.'],
      ['03','Reuse shared foundations','Identity, data, knowledge and logs support the entire suite rather than being rebuilt repeatedly.'],
      ['04','Assign explicit ownership','Every product has one accountable lead, a lifecycle stage, a roadmap and measurable outcomes.'],
    ].map(([n,t,c])=><article key={n}><b>{n}</b><div><h2>{t}</h2><p>{c}</p></div></article>)}</div><aside className="decision-stack"><span>AUDIENCE</span><strong>Channels</strong><i/><span>OPERATIONS</span><strong>Domain products</strong><i/><span>FOUNDATION</span><strong>Shared capabilities</strong><footer>One accountable owner per product</footer></aside></div>}

    {slide.type === 'strategy-problem' && <div className="strategy-problem"><div className="monolith"><div className="monolith-orbits"/><strong>ADMIN</strong><span>One growing portal</span><i>Customer</i><i>Lending</i><i>Counterparty</i><i>Finance</i><i>Permissions</i></div><div className="problem-list">{[
      ['Ownership','Most work sits under “Admin,” so domain outcomes are difficult to own.'],
      ['Delivery','Incoming demands compete inside one large shared application.'],
      ['Coupling','A change in one area can create dependencies and regression risk elsewhere.'],
      ['Scale','Every new product and partner adds more complexity to the same portal.'],
    ].map(([t,c],i)=><article key={t}><b>0{i+1}</b><div><h2>{t}</h2><p>{c}</p></div></article>)}</div><footer><strong>The question</strong><span>How can the platform keep growing without concentrating more ownership, dependency and delivery risk inside Admin?</span></footer></div>}

    {slide.type === 'strategy-method' && <div className="strategy-method">{[
      ['01','Internal discovery','Stakeholder workshops',Users,'Mapped operating problems, ownership gaps and dependencies.'],
      ['02','External view','Market benchmarking',Search,'Compared how financial platforms separate channels, domains and shared capabilities.'],
      ['03','Validation','Testing and refinement',Waypoints,'Tested alternative structures before defining the target suite.'],
    ].map(([n,k,t,Icon,c],i)=><article key={n} style={{'--i':i}}><b>{n}</b><IconBubble Icon={Icon} tone={i===1?'teal':i===2?'coral':'violet'}/><span>{k}</span><h2>{t}</h2><p>{c}</p><footer>{i===2?'Ready to choose a model':'Input to the decision'}</footer></article>)}<div className="method-output"><strong>Decision criteria</strong><span>Clear ownership · bounded domains · reusable foundations · customer proximity</span></div></div>}

    {slide.type === 'platform-strategy' && <div className="strategy-ecosystem"><section className="ecosystem-suite"><header>MANAFA SUITE</header><div className="ecosystem-band ecosystem-channels"><label><b>01</b><strong>CHANNELS</strong><small>Audience-facing</small></label>{['Borrower Channel','Investor Channel','Funder Channel','Buyer Channel'].map(x=><span key={x}>{x}</span>)}</div><div className="ecosystem-band ecosystem-hubs"><label><b>02</b><strong>CORE HUBS</strong><small>Domain products</small></label>
      <article className="ecosystem-hub ecosystem-hub--customer"><h2>Customer Hub</h2>{['CRM','Client Lifecycle','Customer Service','Transaction Management','Engagement Management'].map(x=><span key={x}>{x}</span>)}</article>
      <article className="ecosystem-hub ecosystem-hub--lending"><h2>Lending Hub</h2>{['Loan Origination','Loan Management','Collections'].map(x=><span key={x}>{x}</span>)}</article>
      <article className="ecosystem-hub ecosystem-hub--counterparty"><h2>Counterparty Hub</h2>{['Funder Management','Buyer Management','SCF FinOps'].map(x=><span key={x}>{x}</span>)}</article>
      <article className="ecosystem-hub ecosystem-hub--financial"><h2>Financial Hub</h2>{['Ledger','Treasury','Invoice Management'].map(x=><span key={x}>{x}</span>)}</article>
    </div><div className="ecosystem-band ecosystem-shared"><label><b>03</b><strong>SHARED LIBRARY</strong><small>Cross-cutting</small></label>{['Identity & Access','Data & Insights','Knowledge Management','Logs Management'].map(x=><span key={x}>{x}</span>)}</div></section><aside className="ecosystem-embedded"><header>EMBEDDED</header><strong>Embedded Channel</strong><article><h2>Embedded Hub</h2>{['Developer Platform','API Gateway','API Middleware','ERP Middleware'].map(x=><span key={x}>{x}</span>)}</article></aside></div>}

    {slide.type === 'platform-progress' && <div className="platform-progress"><div className="live-platforms"><span>LIVE OR IN DELIVERY</span>{[
      ['CRM','Customer Hub','Live · enhancement roadmap active','live'],
      ['Invoice Management','Financial Hub','Requirements and UX complete · development in progress','build'],
      ['SCF FinOps','Counterparty Hub','Live baseline · next phase in preparation','live'],
    ].map(([n,h,s,state])=><article key={n}><div><small>{h}</small><h2>{n}</h2></div><strong className={state}>{s}</strong></article>)}</div><div className="progress-board"><div className="progress-head"><span>PLATFORM</span><span>IDEATION</span><span>BA</span><span>DESIGN</span><span>BUILD</span><span>TEST</span><span>LIVE</span></div>{[
      ['Client Lifecycle','design',2],['Buyer Management','analysis',1],['Funder Management','analysis',1],['Loan Origination (LOS)','ideation',0],['Loan Management & Collections','ideation',0],
    ].map(([n,state,pos])=><article key={n}><strong>{n}</strong>{[0,1,2,3,4,5].map(i=><i key={i} className={i<pos?'done':i===pos?'current':''}/>)}<span>{state}</span></article>)}</div></div>}

    {slide.type === 'delivery' && <div className="delivery"><div className="delivery-line"/>{[
      ['01','Digital Factory','Capture the business demand and route it for prioritisation',null,'df'],
      ['02','Discovery','Clarify the problem, outcome, users and solution scope',Search,'discovery'],
      ['03','BRD when needed','Use the Confluence template for large or complex solutions',null,'confluence'],
      ['04','Linked Jira delivery','Create work in Borrower, Embedded, Admin or Investor projects',null,'jira'],
      ['05','Release and validate','Deliver through the release cycle, validate and learn',Rocket,'release'],
    ].map(([n,t,c,Icon,kind])=><article key={n}><div className={`delivery-icon delivery-icon--${kind}`}>{kind==='df'?<b>DF</b>:kind==='confluence'?<img src={`${A3}confluence.svg`} alt="Confluence"/>:kind==='jira'?<img src={`${A3}jira.svg`} alt="Jira"/>:<Icon/>}</div><span>{n}</span><h2>{t}</h2><p>{c}</p></article>)}<footer><strong>Traceability matters</strong><span>The demand, analysis, BRD and delivery tasks should remain connected from idea to production.</span></footer></div>}

    {slide.type === 'ways' && <div className="ways"><div className="feature-workflow"><span>FEATURE WORKFLOW</span>{['Request or change request','Prioritisation and scoping','BA analysis, BRD and use cases','UX design, flows and hi-fi','BA and UX alignment','Grooming, development and QA','UAT and go-live'].map((x,i)=><article key={x}><b>0{i+1}</b><strong>{x}</strong></article>)}</div><div className="cadence"><span>RECURRING RHYTHM</span><article><IconBubble Icon={Users}/><div><h2>Team meeting</h2><p>Weekly priorities, updates and support across the team.</p></div></article><article><IconBubble Icon={CalendarDays} tone="violet"/><div><h2>Sprint grooming</h2><p>Align scope, estimates and acceptance before development.</p></div></article><article><IconBubble Icon={MessageCircle} tone="teal"/><div><h2>Direct feedback</h2><p>Ask early, document decisions and improve the work together.</p></div></article></div></div>}

    {slide.type === 'thrive' && <div className="thrive"><aside><div className="thrive-orbits"><i/><i/></div><span>THE MINDSET</span><h2>Real work.<br/>Early ownership.<br/>Supported learning.</h2><p>Independence does not mean working alone. Ownership includes knowing when to involve others.</p></aside><div className="thrive-principles">{[
      ['01','Ask questions early','Clarity is better than carrying a silent assumption.',MessageCircle,'blue'],
      ['02','Own the follow-through','Understand the task, communicate progress and close the loop.',UserCheck,'violet'],
      ['03','Be proactive','Research, explore and bring your own point of view.',Rocket,'teal'],
      ['04','Seek support when blocked','Raise blockers early and involve the right person.',Handshake,'coral'],
      ['05','Communicate honestly','Share what is moving, uncertain or at risk.',Presentation,'blue'],
      ['06','Learn through feedback','Use each review to strengthen the next iteration.',BadgeCheck,'violet'],
    ].map(([n,t,c,Icon,tone])=><article key={n}><b>{n}</b><IconBubble Icon={Icon} tone={tone}/><div><h2>{t}</h2><p>{c}</p></div></article>)}</div></div>}

    {slide.type === 'tools' && <div className="tools"><div className="tool-grid"><article><img className="brand-icon slack-icon" src={`${A3}slack.svg`} alt="Slack"/><h2>Slack</h2><p>Team communication</p></article><article><img className="brand-icon" src={`${A3}microsoftoutlook.svg`} alt="Microsoft 365"/><h2>Microsoft 365</h2><p>Email and calendar</p></article><article><img className="brand-icon jira-icon" src={`${A3}jira.svg`} alt="Jira"/><h2>Jira</h2><p>Delivery work</p></article><article><img className="brand-icon confluence-icon" src={`${A3}confluence.svg`} alt="Confluence"/><h2>Confluence</h2><p>Knowledge and BRDs</p></article><article><img className="jisr-logo" src={`${A4}jisr.webp`} alt="Jisr"/><h2>Jisr</h2><p>Leave, attendance and HR requests</p></article></div><div className="company-essentials"><div><GraduationCap/><span>PROFESSIONAL DEVELOPMENT</span></div><strong>Certificate-support policy</strong><p>Review the approved Product and UX/UI certificates and the reimbursement conditions before registering.</p><strong>Approved certificates list</strong><p>The official list is separate from the free or low-cost learning courses used in the training journey.</p></div></div>}

    {slide.type === 'thanks' && <div className="thanks"><h2>{slide.subtitle}</h2><p>You now know the company, the business, the team and the product direction you are joining.</p></div>}

    <SourceButton slide={slide} onOpen={onSources}/>
  </section>
}

function App() {
  const [current,setCurrent] = useState(()=>{const h=location.hash.replace('#','');const i=slides.findIndex(s=>s.id===h);return i>=0?i:0})
  const [overview,setOverview] = useState(false)
  const [sourceSlide,setSourceSlide] = useState(null)
  const touchStart = useRef(null)
  useLayoutEffect(()=>{
    const fitDeck=()=>{
      const horizontal=(window.innerWidth-44)/1280
      const vertical=(window.innerHeight-100)/720
      document.documentElement.style.setProperty('--deck-scale',String(Math.max(.1,Math.min(horizontal,vertical))))
    }
    fitDeck();addEventListener('resize',fitDeck)
    return()=>{removeEventListener('resize',fitDeck);document.documentElement.style.removeProperty('--deck-scale')}
  },[])
  const go = useCallback(next=>{const i=Math.max(0,Math.min(slides.length-1,next));setCurrent(i);history.replaceState(null,'',`#${slides[i].id}`)},[])
  useEffect(()=>{const onHash=()=>{const i=slides.findIndex(s=>s.id===location.hash.replace('#',''));if(i>=0)setCurrent(i)};const onKey=e=>{if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();go(current+1)}if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();go(current-1)}if(e.key==='Home')go(0);if(e.key==='End')go(slides.length-1);if(e.key.toLowerCase()==='o')setOverview(v=>!v);if(e.key==='Escape'){setOverview(false);setSourceSlide(null)}};addEventListener('hashchange',onHash);addEventListener('keydown',onKey);return()=>{removeEventListener('hashchange',onHash);removeEventListener('keydown',onKey)}},[current,go])
  const progress=useMemo(()=>((current+1)/slides.length)*100,[current])
  return <main className="deck" onTouchStart={e=>touchStart.current=e.changedTouches[0].clientX} onTouchEnd={e=>{if(touchStart.current==null)return;const d=e.changedTouches[0].clientX-touchStart.current;if(Math.abs(d)>50)go(current+(d<0?1:-1));touchStart.current=null}}>
    <div className="stage"><RenderSlide key={slides[current].id} slide={slides[current]} index={current} total={slides.length} onSources={()=>setSourceSlide(slides[current])}/></div>
    <nav className="controls"><button onClick={()=>setOverview(true)} aria-label="Open slide overview"><Menu/></button><button onClick={()=>go(current-1)} disabled={current===0} aria-label="Previous slide"><ArrowLeft/></button><div className="progress"><span style={{width:`${progress}%`}}/></div><button onClick={()=>go(current+1)} disabled={current===slides.length-1} aria-label="Next slide"><ArrowRight/></button><button onClick={()=>document.documentElement.requestFullscreen?.()} aria-label="Enter full screen"><Expand/></button></nav>
    {overview&&<div className="overlay" role="dialog" aria-modal="true"><div className="overlay-head"><div><Presentation/><h2>Onboarding overview</h2></div><button onClick={()=>setOverview(false)}><X/></button></div><div className="overview-grid">{slides.map((s,i)=><button key={s.id} className={i===current?'active':''} onClick={()=>{go(i);setOverview(false)}}><span>{String(i+1).padStart(2,'0')}</span><p>{s.title}</p></button>)}</div></div>}
    {sourceSlide&&<div className="overlay sources" role="dialog" aria-modal="true"><div className="overlay-head"><div><BookOpen/><h2>Sources — {sourceSlide.title}</h2></div><button onClick={()=>setSourceSlide(null)}><X/></button></div><div className="source-list">{sourceSlide.sources.map(([l,u])=><a key={u} href={u} target="_blank" rel="noreferrer"><span>{l}</span><ChevronRight/></a>)}</div></div>}
  </main>
}

createRoot(document.getElementById('root')).render(<App/>)
