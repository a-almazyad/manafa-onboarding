import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowLeft, ArrowRight, BadgeCheck, Banknote, BookOpen, BriefcaseBusiness,
  Building2, CalendarDays, CheckCircle2, ChevronRight, CircleDollarSign,
  ClipboardCheck, Code2, Database, Expand, Factory, FileCheck2, GitBranch,
  GraduationCap, HandCoins, Handshake, Headphones, Landmark, Layers3,
  LockKeyhole, Megaphone, Menu, MessageCircle, Network, Palette, Presentation,
  ReceiptText, Rocket, Scale, Search, ShieldCheck, Store, UserCheck, UserRound,
  Users, WalletCards, Waypoints, X,
} from 'lucide-react'
import './styles.css'

const A2 = `${import.meta.env.BASE_URL}assets/v2/`
const A3 = `${import.meta.env.BASE_URL}assets/v3/`
const A4 = `${import.meta.env.BASE_URL}assets/v4/`

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
  ['Credit', CircleDollarSign], ['Compliance, Risk & BCM', ShieldCheck],
  ['Legal & Governance', Scale], ['Business Operations', BriefcaseBusiness],
  ['Portfolio Management', WalletCards], ['Collections', HandCoins],
  ['Customer Care', Headphones], ['Technology & Engineering', Code2],
  ['Cybersecurity', LockKeyhole], ['Finance & Treasury', Banknote],
  ['Human Resources', UserCheck], ['Business Development & Partnership', Handshake],
  ['Marketing & Branding Communication', Megaphone], ['Digital Investors', Users],
  ['Digital Experience', Palette], ['Internal Audit', ClipboardCheck],
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
  { id:'manafa-section', type:'section', chapter:'01', title:'Manafa', subtitle:'The company, its business and the people behind it' },
  { id:'at-a-glance', type:'at-glance', title:'Manafa at a glance', sources:[['Manafa — About','https://manafa.sa/about']] },
  { id:'business-model', type:'business-model', title:'How Manafa connects capital with business needs' },
  { id:'company-story', type:'milestones', title:'How Manafa grew into a national financing platform' },
  { id:'regulation', type:'regulation', title:'Two regulatory milestones shaped the business', sources:[['SAMA — debt crowdfunding licence','https://www.sama.gov.sa/en-us/mediacenter/news/pages/news-801.aspx'],['SAMA — SCF Regulatory Sandbox','https://www.sama.gov.sa/en-us/mediacenter/news/pages/news-1104.aspx']] },
  { id:'growth-milestones', type:'growth', title:'Investment and national recognition accelerated the journey', sources:[['STV — Investing in Manafa','https://stv.vc/blog/en/2022/12/28/investing-in-manafa-enabling-sme-financing-and-unlocking-new-asset-classes-to-retail-and-institutional-investors'],['Saudi Unicorns Program','https://hub.misk.org.sa/programs/entrepreneurship/saudi-unicorns/']] },
  { id:'national-programs', type:'programs', title:'SCF partnerships moved Manafa to national scale', sources:[['Aramco — SCF announcement','https://www.aramco.com/en/news-media/news/2024/aramco-sidf-and-taulia-announce-supply-chain-financing-solution'],['Manafa — SEC SCF announcement','https://www.linkedin.com/posts/manafa-co_fii9-activity-7389028836077678592-D87w']] },
  { id:'metrics', type:'metrics', title:'Manafa today', sources:[['Manafa — Achievements','https://manafa.sa/achievement']] },
  { id:'leadership', type:'leadership', title:'The executive team' },
  { id:'group', type:'group', title:'A growing group with shared roots' },
  { id:'partners', type:'partners', title:'The ecosystem around Manafa' },
  { id:'business-section', type:'section', chapter:'02', title:'Business and products', subtitle:'The financing portfolio and the journey behind every request', accent:'violet' },
  { id:'products', type:'products', title:'Seven ways Manafa finances businesses' },
  { id:'lifecycle', type:'lifecycle', title:'What happens from application to closure' },
  { id:'digital-section', type:'section', chapter:'03', title:'Digital Business', subtitle:'The stakeholders, team, platforms and delivery model', accent:'teal' },
  { id:'departments', type:'departments', title:'The departments we work with' },
  { id:'product-org', type:'product-org', title:'Where Digital Product sits' },
  { id:'team', type:'team', title:'Meet the Digital Business team' },
  { id:'digital-business', type:'digital-business', title:'What Digital Business owns' },
  { id:'strategy-problem', type:'strategy-problem', title:'Why the current product model must change' },
  { id:'strategy-method', type:'strategy-method', title:'How the target structure was developed' },
  { id:'platform-strategy', type:'platform-strategy', title:'From one Admin Portal to a modular product suite' },
  { id:'platform-progress', type:'platform-progress', title:'The transition is already underway' },
  { id:'delivery', type:'delivery', title:'How a demand becomes a production release' },
  { id:'ways-of-working', type:'ways', title:'How we work together' },
  { id:'tools', type:'tools', title:'Your daily toolkit and company essentials' },
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

function RenderSlide({ slide, index, total, onSources }) {
  if (slide.type === 'cover') return <section className="slide cover"><Logo inverse/><div className="cover-rings"/><div className="cover-copy"><h1>{slide.title}</h1><p>{slide.subtitle}</p><span>For the people shaping Manafa’s digital products.</span></div><div className="counter">01 / {total}</div></section>

  if (slide.type === 'section') return <section className={`slide section ${slide.accent?`section--${slide.accent}`:''}`}><Logo inverse/><div className="section-rings"/><div className="section-index">{slide.chapter}</div><div className="section-copy"><h1>{slide.title}</h1><p>{slide.subtitle}</p></div><div className="counter">{String(index+1).padStart(2,'0')} / {total}</div></section>

  const dark = ['metrics','thanks'].includes(slide.type)
  return <section className={`slide content content--${slide.type}${dark?' dark':''}`}>
    <Chrome index={index} total={total} dark={dark}/>
    <header className="content-header"><h1>{slide.title}</h1><div/></header>

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
      {milestones.map((m,i)=>{const Icon=m.icon;const src=m.image?`${m.imageSet==='v3'?A3:A2}${m.image}`:null;return <article key={`${m.year}-${m.title}`} style={{'--i':i}} className={src?'has-image':''}>{src&&<img src={src} alt=""/>}<div className="milestone-year">{m.year}</div><IconBubble Icon={Icon} tone={i>3?'teal':i>1?'violet':'blue'}/><h2>{m.title}</h2><p>{m.copy}</p></article>})}
    </div>}

    {slide.type === 'regulation' && <div className="regulation">
      <div className="sama-mark"><img src={`${A3}sama.png`} alt="Saudi Central Bank"/><span>Saudi Central Bank</span></div>
      <div className="reg-cards">
        <article><div className="reg-year">2022</div><IconBubble Icon={FileCheck2}/><h2>Debt Crowdfunding Licence</h2><p>The full licence established Manafa’s regulated crowdlending activity.</p><footer>Licensed activity</footer></article>
        <div className="reg-bridge"><span>regulated growth</span><i/></div>
        <article><div className="reg-year">2025</div><IconBubble Icon={ShieldCheck} tone="teal"/><h2>SCF Regulatory Sandbox</h2><p>Permission to test supply-chain financing solutions created the next regulated path.</p><footer>Controlled experimentation</footer></article>
      </div>
    </div>}

    {slide.type === 'growth' && <div className="growth">
      <article className="growth-story growth-story--series"><img src={`${A2}series-a.jpg`} alt="Manafa Series A team"/><div className="growth-copy"><span>DECEMBER 2022</span><h2>SAR 106 million Series A</h2><p>Led by STV and Wa’ed Ventures, the round supported technology, talent and expansion.</p><div className="mini-logos"><span className="stv"><img src={`${A3}stv.png`} alt="STV"/></span><img src={`${A3}waed.jpg`} alt="Wa'ed Ventures"/></div></div></article>
      <article className="growth-story growth-story--unicorn"><img src={`${A3}saudi-unicorns.png`} alt="Saudi Unicorns Program"/><div className="growth-copy"><span>SELECTED IN 2023</span><h2>Saudi Unicorns Program</h2><p>Selection placed Manafa among companies with the potential to become globally significant Saudi technology businesses.</p></div></article>
    </div>}

    {slide.type === 'programs' && <div className="programs">
      <article><figure><img src={`${A2}aramco-signing.webp`} alt="Aramco SCF signing"/></figure><div><span>FII8 · 2024</span><h2>Aramco</h2><p>Manafa joined Aramco, SIDF and Taulia in a wide-reaching supply-chain financing solution designed to support Aramco suppliers.</p><strong>Landmark enterprise SCF program</strong></div></article>
      <article><figure><img src={`${A2}sec-signing.jpg`} alt="Saudi Electricity Company SCF signing"/></figure><div><span>FII9 · 2025</span><h2>Saudi Electricity Company</h2><p>The model expanded to a second national anchor, extending financing coverage across the electricity supply chain.</p><strong>Expansion of the national model</strong></div></article>
    </div>}

    {slide.type === 'metrics' && <div className="metrics-scene"><div className="metric-rings"/><div className="metric-primary"><strong>3.2B+</strong><span>SAR total financing</span></div><div className="metric-secondary"><article><Users/><strong>200K+</strong><span>users</span></article><article><BriefcaseBusiness/><strong>190+</strong><span>team members</span></article><article><Handshake/><strong>12+</strong><span>partnerships</span></article></div><p>Public figures shown on Manafa’s achievement page.</p></div>}

    {slide.type === 'leadership' && <div className="leadership"><div className="ceo"><Person src="ceo.webp" name="Abdulaziz Aladwani"/><div><span>FOUNDER & CEO</span><strong>Abdulaziz Aladwani</strong></div></div><div className="leadership-tree"/><div className="executive-row">{executives.map(([n,r,p])=><article key={n}><Person src={p} name={n}/><div><strong>{n}</strong><span>{r}</span></div></article>)}</div></div>}

    {slide.type === 'group' && <div className="group"><div className="group-origin"><div className="group-rings"/><Logo/><span>Shared roots</span></div><div className="group-line"/><article className="company company--manafa"><Logo/><strong>Manafa</strong><p>Business financing and investment</p></article><article className="company company--sukuk"><img src={`${A2}sukuk.svg`} alt="Sukuk Capital"/><strong>Sukuk Capital</strong><p>Debt instruments and capital markets</p></article><article className="company company--abyan"><img src={`${A2}abyan.svg`} alt="Abyan Capital"/><strong>Abyan Capital</strong><p>Digital asset management</p></article><article className="company company--tech"><Logo/><strong>Manafa Technologies</strong><p>Technology delivery from Pakistan</p></article></div>}

    {slide.type === 'partners' && <div className="partners"><div className="investor-band"><span>INVESTORS</span><div className="logo-tile logo-tile--dark"><img src={`${A3}stv.png`} alt="STV"/></div><div className="logo-tile"><img src={`${A3}waed.jpg`} alt="Wa'ed Ventures"/></div></div><div className="partner-field"><span>STRATEGIC PARTNERS</span>{[['kafalah.png','Kafalah'],['mudad.png','Mudad'],['sme-bank.png','SME Bank'],['cultural-fund.jpeg','Cultural Development Fund'],['tdf.png','Tourism Development Fund'],['sidf.jpg','SIDF']].map(([src,name],i)=><div className="logo-tile" key={name} style={{'--i':i}}><img src={`${A3}${src}`} alt={name}/></div>)}</div></div>}

    {slide.type === 'products' && <div className="products">{products.map((p,i)=><article key={p.name} className={`product product--${p.tone}${p.wide?' product--wide':''}`} style={{'--i':i}}><img src={`${A2}${p.icon}`} alt=""/><div><h2>{p.name}</h2><p>{p.copy}</p></div></article>)}<footer><span>Different business needs.</span><strong>One financing platform.</strong></footer></div>}

    {slide.type === 'lifecycle' && <div className="lifecycle"><div className="journey-rail"><span>BUSINESS</span><span>MANAFA</span><span>CAPITAL</span></div><div className="journey-stages">{[
      ['01','Company onboarding','Register the company and complete identity, ownership and eligibility information.',Building2,'business'],
      ['02','Financing request','Choose a product, enter the need and provide the required documents.',ReceiptText,'business'],
      ['03','Credit assessment','Review financials, eligibility, risk and the proposed financing structure.',Search,'manafa'],
      ['04','Offer and approval','Confirm the approved amount, pricing, conditions and acceptance.',FileCheck2,'manafa'],
      ['05','Funding and disbursement','Investors or funders allocate capital and the approved financing is disbursed.',HandCoins,'capital'],
      ['06','Servicing and closure','Track repayments, settlement, collections and final closure.',CheckCircle2,'manafa'],
    ].map(([n,t,c,Icon,lane])=><article key={n} className={`lane-${lane}`}><b>{n}</b><IconBubble Icon={Icon} tone={lane==='capital'?'teal':lane==='manafa'?'violet':'blue'}/><h2>{t}</h2><p>{c}</p></article>)}</div></div>}

    {slide.type === 'departments' && <div className="departments">{departments.map(([name,Icon],i)=><article key={name} style={{'--i':i}}><IconBubble Icon={Icon} tone={i%4===1?'violet':i%4===2?'teal':i%4===3?'coral':'blue'}/><strong>{name}</strong></article>)}</div>}

    {slide.type === 'product-org' && <div className="product-org"><div className="org-head"><Person src="shahram.webp" name="Mohammed Shahram Javid"/><div><span>CHIEF TECHNOLOGY OFFICER</span><strong>Mohammed Shahram Javid</strong></div></div><div className="org-connector"/><div className="org-branches"><article><Person src="abdullah.webp" name="Abdullah Almazyad"/><div><span>PRODUCT DIRECTOR</span><h2>Abdullah Almazyad</h2><strong>Digital Business</strong></div></article><article><div className="person-placeholder"><UserRound/></div><div><span>PRODUCT DIRECTOR</span><h2>Raghad</h2><strong>Digital Investors & Digital Experience</strong></div></article></div></div>}

    {slide.type === 'team' && <div className="team"><div className="team-lead"><Person src="abdullah.webp" name="Abdullah Almazyad"/><div><span>PRODUCT DIRECTOR</span><strong>Abdullah Almazyad</strong><p>Digital Business</p></div></div><div className="team-members">{team.map(([n,r],i)=><article key={n} style={{'--i':i}}><div className="initials">{n.split(' ').map(x=>x[0]).slice(0,2).join('')}</div><div><strong>{n}</strong><span>{r}</span></div></article>)}</div></div>}

    {slide.type === 'digital-business' && <div className="digital-business"><div className="scope-intro"><h2>We own the digital experience for Manafa’s business side.</h2><p>That includes the journeys customers use and the internal products that make financing possible.</p></div><div className="scope-map"><article className="scope-channel"><span>01 · BUSINESS CHANNELS</span><div><strong>Borrower</strong><strong>Buyer</strong><strong>Funder</strong><strong>Embedded</strong></div></article><div className="scope-bridge"><i/><i/><i/><i/></div><article className="scope-platform"><span>02 · BACK-OFFICE PRODUCTS</span><div><strong>Customer</strong><strong>Lending</strong><strong>Counterparty</strong><strong>Financial</strong></div></article></div></div>}

    {slide.type === 'strategy-problem' && <div className="strategy-problem"><div className="monolith"><div className="monolith-orbits"/><strong>ADMIN</strong><span>One growing portal</span><i>Customer</i><i>Lending</i><i>Counterparty</i><i>Finance</i><i>Permissions</i></div><div className="problem-list">{[
      ['Ownership','Most work sits under “Admin,” so domain outcomes are difficult to own.'],
      ['Delivery','Incoming demands compete inside one large shared application.'],
      ['Coupling','A change in one area can create dependencies and regression risk elsewhere.'],
      ['Scale','Every new product and partner adds more complexity to the same portal.'],
    ].map(([t,c],i)=><article key={t}><b>0{i+1}</b><div><h2>{t}</h2><p>{c}</p></div></article>)}</div><footer><strong>Direction</strong><span>Move from one broad Admin Portal to focused product domains with clear owners, roadmaps and measures.</span></footer></div>}

    {slide.type === 'strategy-method' && <div className="strategy-method">{[
      ['01','Internal discovery','Stakeholder workshops',Users,'Mapped operating problems, ownership gaps and dependencies.'],
      ['02','External view','Market benchmarking',Search,'Compared how financial platforms separate channels, domains and shared capabilities.'],
      ['03','Validation','Testing and refinement',Waypoints,'Tested alternative structures before defining the target suite.'],
    ].map(([n,k,t,Icon,c],i)=><article key={n} style={{'--i':i}}><b>{n}</b><IconBubble Icon={Icon} tone={i===1?'teal':i===2?'coral':'violet'}/><span>{k}</span><h2>{t}</h2><p>{c}</p><footer>{i===2?'Output: target product structure':'Input to the strategy'}</footer></article>)}<div className="method-output"><strong>Discovery output</strong><span>A domain-led suite with explicit ownership and clear separation between audience-facing channels and internal platforms.</span></div></div>}

    {slide.type === 'platform-strategy' && <div className="platform-strategy"><div className="current-mass"><div className="mass-lines"/><strong>ADMIN</strong><span>Current state</span></div><div className="separation"><Layers3/><strong>Separate by audience and domain</strong></div><div className="suite-stack"><div className="suite-layer channels-layer"><span>01 · CHANNELS</span><div><strong>Borrower</strong><strong>Investor</strong><strong>Funder</strong><strong>Buyer</strong></div></div><div className="suite-layer hubs-layer"><span>02 · CORE HUBS</span><div><strong>Customer</strong><strong>Lending</strong><strong>Counterparty</strong><strong>Financial</strong></div></div><div className="suite-layer shared-layer"><span>03 · SHARED LIBRARY</span><div><strong>Identity & Access</strong><strong>Data & Insights</strong><strong>Knowledge</strong><strong>Logs</strong></div></div></div><aside><span>EMBEDDED</span><strong>Embedded Channel</strong><i/><strong>Embedded Hub</strong></aside><footer><strong>Target model</strong><span>Transition in progress—not every platform is live today.</span></footer></div>}

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
