import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowLeft, ArrowRight, BookOpen, ChevronRight, Expand, Menu, Presentation, UserRound, X } from 'lucide-react'
import './styles.css'

const A2 = `${import.meta.env.BASE_URL}assets/v2/`
const A3 = `${import.meta.env.BASE_URL}assets/v3/`

const products = [
  ['01', 'Invoice Financing', 'invoice.svg'],
  ['02', 'Letter of Guarantee', 'lg.svg'],
  ['03', 'Purchase Order Financing', 'po.svg'],
  ['04', 'Working Capital', 'working-capital.svg'],
  ['05', 'Payroll Financing', 'payroll.svg'],
  ['06', 'Real Estate Financing', 'real-estate.svg'],
  ['07', 'Supply Chain Financing', 'scf.svg'],
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
  ['Mohammed Alghofaily', 'Product Lead / UX'],
  ['Fahad Aldossari', 'Product Lead'],
  ['Bandar Alarifi', 'Product Lead'],
  ['Alma Alfowzan', 'Business Analyst'],
  ['Mohammed Alasaker', 'Business Analyst'],
  ['Noura Aljmhoor', 'Business Analyst'],
  ['Danah Alsuhaibani', 'Business Analyst'],
  ['Norah Alahmed', 'Business Analyst'],
  ['Abdulwahab Alghamdi', 'Business Analyst'],
  ['Najla Alharthi', 'UX/UI Designer'],
  ['Nouf Alkernass', 'UX/UI Designer'],
]

const departments = [
  'Credit', 'Compliance, Risk & BCM', 'Legal & Governance', 'Business Operations',
  'Portfolio Management', 'Collections', 'Customer Care', 'Technology & Engineering',
  'Cybersecurity', 'Finance & Treasury', 'Human Resources', 'Business Development & Partnership',
  'Marketing & Branding Communication', 'Digital Investors', 'Digital Experience', 'Internal Audit',
]

const slides = [
  { id:'welcome', type:'cover', title:'Welcome to Manafa', subtitle:'Digital Business onboarding' },
  { id:'manafa-section', type:'section', chapter:'01', title:'Manafa', subtitle:'Company, business model and people' },
  { id:'at-a-glance', type:'brand-flow', title:'Manafa at a glance', body:'Manafa is a Saudi fintech platform for debt crowdfunding and business financing.', sources:[['Manafa — About','https://manafa.sa/about']] },
  { id:'business-lines', type:'business-lines', title:'Two business lines, different participants' },
  { id:'company-story', type:'storyline', title:'Company milestones', points:[['2018','Manafa founded'],['2022','Full debt crowdfunding licence'],['2022','SAR 106M Series A'],['2023','Saudi Unicorns Program'],['2024–25','Aramco and SEC SCF programs'],['2025','SCF Regulatory Sandbox']] },
  { id:'regulation', type:'regulation', title:'Regulatory position', sources:[['SAMA — debt crowdfunding licence','https://www.sama.gov.sa/en-us/mediacenter/news/pages/news-801.aspx'],['SAMA — SCF Regulatory Sandbox','https://www.sama.gov.sa/en-us/mediacenter/news/pages/news-1104.aspx']] },
  { id:'growth-milestones', type:'growth', title:'Series A and Saudi Unicorns', sources:[['STV — Investing in Manafa','https://stv.vc/blog/en/2022/12/28/investing-in-manafa-enabling-sme-financing-and-unlocking-new-asset-classes-to-retail-and-institutional-investors'],['Saudi Unicorns Program','https://hub.misk.org.sa/programs/entrepreneurship/saudi-unicorns/']] },
  { id:'national-programs', type:'programs', title:'National-scale SCF programs', sources:[['Aramco — SCF announcement','https://www.aramco.com/en/news-media/news/2024/aramco-sidf-and-taulia-announce-supply-chain-financing-solution'],['Manafa — SEC SCF announcement','https://www.linkedin.com/posts/manafa-co_fii9-activity-7389028836077678592-D87w']] },
  { id:'metrics', type:'metrics', title:'Manafa today', metrics:[['3.2B+','SAR total financing'],['200K+','Users'],['190+','Team members'],['12+','Partnerships']], sources:[['Manafa — About','https://manafa.sa/about']] },
  { id:'leadership', type:'leadership', title:'Executive team' },
  { id:'group', type:'group', title:'Manafa companies and technology delivery' },
  { id:'partners', type:'partners', title:'Investors and strategic partners' },
  { id:'business-section', type:'section', chapter:'02', title:'Business and products', subtitle:'Products, lifecycle and digital channels', accent:'purple' },
  { id:'products', type:'products', title:'Financing products' },
  { id:'lifecycle', type:'lifecycle', title:'Financing lifecycle', steps:[['01','Onboard'],['02','Request'],['03','Assess'],['04','Approve'],['05','Fund'],['06','Service']] },
  { id:'channels', type:'channels', title:'Digital channels and users' },
  { id:'organization-section', type:'section', chapter:'03', title:'Organization and Digital Business', subtitle:'Departments, platforms, people and delivery', accent:'green' },
  { id:'departments', type:'departments', title:'Manafa departments' },
  { id:'product-org', type:'product-org', title:'Digital Product organization' },
  { id:'digital-business', type:'digital-business', title:'Digital Business scope' },
  { id:'platform-strategy', type:'platform-strategy', title:'Manafa Platform Strategy' },
  { id:'delivery', type:'delivery', title:'From demand to production' },
  { id:'team', type:'team', title:'Digital Business team' },
  { id:'ways-of-working', type:'ways', title:'How we work' },
  { id:'tools', type:'tools', title:'Tools and company essentials' },
  { id:'thank-you', type:'thanks', title:'Thank you', subtitle:'Questions?' },
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

function Chrome({ slide, index, total, dark=false }) {
  return <><Logo inverse={dark}/><div className="counter">{String(index+1).padStart(2,'0')} / {total}</div></>
}

function RenderSlide({ slide, index, total, onSources }) {
  if (slide.type === 'cover') return <section className="slide cover"><Logo/><div className="cover-wordmark" aria-hidden="true">MANAFA</div><div className="cover-copy"><h1>{slide.title}</h1><span/><p>{slide.subtitle}</p></div><div className="counter">01 / {total}</div></section>

  if (slide.type === 'section') return <section className={`slide section ${slide.accent?`section--${slide.accent}`:''}`}><Logo inverse/><div className="section-index">{slide.chapter}</div><div className="section-copy"><h1>{slide.title}</h1><span/><p>{slide.subtitle}</p></div><div className="counter">{String(index+1).padStart(2,'0')} / {total}</div></section>

  const dark = ['metrics','thanks'].includes(slide.type)
  return <section className={`slide content content--${slide.type}${dark?' dark':''}`}>
    <Chrome slide={slide} index={index} total={total} dark={dark}/>
    <header className="content-header"><h1>{slide.title}</h1><div/></header>

    {slide.type === 'brand-flow' && <div className="brand-flow">
      <div className="brand-copy"><img src={`${A2}manafa-logo.svg`} alt="Manafa"/><p>{slide.body}</p></div>
      <div className="flow-visual"><div className="flow-line"/><div className="flow-party flow-party--left"><strong>Borrowers</strong><span>Businesses seeking financing</span></div><div className="flow-core"><img src={`${A2}manafa-logo.svg`} alt=""/></div><div className="flow-party flow-party--right"><strong>Investors</strong><span>Individuals and institutions providing capital</span></div><i className="flow-dot flow-dot--one"/><i className="flow-dot flow-dot--two"/></div>
    </div>}

    {slide.type === 'business-lines' && <div className="business-lines">
      <article><div className="line-label">CROWDLENDING</div><div className="actor-row"><strong>Borrower</strong><span>→</span><img src={`${A2}manafa-logo.svg`} alt="Manafa"/><span>←</span><strong>Investor</strong></div><p>Businesses request financing. Investors participate in financing opportunities.</p></article>
      <article><div className="line-label">SUPPLY CHAIN FINANCING</div><div className="actor-row actor-row--scf"><strong>Buyer</strong><span>·</span><strong>Supplier <small>(Borrower)</small></strong><span>·</span><strong>Funder</strong></div><p>Buyer-led programs connect approved supplier invoices with institutional funding.</p></article>
    </div>}

    {slide.type === 'storyline' && <div className="storyline"><svg viewBox="0 0 1200 180" preserveAspectRatio="none"><path d="M20 130 C180 15 340 160 520 80 S900 20 1180 90"/><path className="story-path-active" d="M20 130 C180 15 340 160 520 80 S900 20 1180 90"/></svg>{slide.points.map(([y,t],i)=><article key={y+t} style={{'--i':i}}><strong>{y}</strong><span>{t}</span></article>)}</div>}

    {slide.type === 'regulation' && <div className="regulation"><div className="regulation-mark"><img src={`${A3}sama.png`} alt="Saudi Central Bank"/></div><div className="regulation-track"><article><strong>2022</strong><h2>Debt Crowdfunding Licence</h2><p>Full licence from the Saudi Central Bank.</p></article><div className="regulation-line"/><article><strong>2025</strong><h2>SCF Regulatory Sandbox</h2><p>Permission to test supply-chain financing solutions.</p></article></div></div>}

    {slide.type === 'growth' && <div className="growth"><figure><img src={`${A2}series-a.jpg`} alt="Manafa Series A team"/><figcaption><strong>SAR 106M</strong><span>Series A · December 2022</span><div className="investor-logos"><span className="stv"><img src={`${A3}stv.png`} alt="STV"/></span><img src={`${A3}waed.jpg`} alt="Wa'ed Ventures"/></div></figcaption></figure><figure><img src={`${A3}saudi-unicorns.png`} alt="Saudi Unicorns program and partners"/><figcaption><strong>Saudi Unicorns</strong><span>Selected in 2023</span></figcaption></figure></div>}

    {slide.type === 'programs' && <div className="programs"><figure><img src={`${A2}aramco-signing.webp`} alt="Aramco SCF signing"/><figcaption><strong>Aramco</strong><span>FII8 · 2024</span></figcaption></figure><figure><img src={`${A2}sec-signing.jpg`} alt="Saudi Electricity Company SCF signing"/><figcaption><strong>Saudi Electricity Company</strong><span>FII9 · 2025</span></figcaption></figure></div>}

    {slide.type === 'metrics' && <div className="metrics">{slide.metrics.map(([v,l])=><article key={l}><strong>{v}</strong><span>{l}</span></article>)}</div>}

    {slide.type === 'leadership' && <div className="leadership"><div className="ceo"><Person src="ceo.webp" name="Abdulaziz Aladwani"/><div><strong>Abdulaziz Aladwani</strong><span>Founder & CEO</span></div></div><div className="leadership-line"/><div className="executive-row">{executives.map(([n,r,p])=><article key={n}><Person src={p} name={n}/><strong>{n}</strong><span>{r}</span></article>)}</div></div>}

    {slide.type === 'group' && <div className="group"><div className="group-axis"><i/><i/><i/></div><article><img src={`${A2}manafa-logo.svg`} alt="Manafa"/><span>Business financing and investment</span></article><article className="group-dark"><img src={`${A2}sukuk.svg`} alt="Sukuk Capital"/><span>Debt instruments and capital markets</span></article><article><img src={`${A2}abyan.svg`} alt="Abyan Capital"/><span>Digital asset management</span></article><article className="group-tech"><img src={`${A3}manafa-technologies.jpg`} alt="Manafa Technologies team"/><div><strong>Manafa Technologies</strong><span>Technology delivery · Pakistan</span></div></article></div>}

    {slide.type === 'partners' && <div className="partners"><div className="partner-leads"><span className="stv"><img src={`${A3}stv.png`} alt="STV"/></span><img src={`${A3}waed.jpg`} alt="Wa'ed Ventures"/></div><div className="partner-divider"><span>Strategic partners</span></div><div className="partner-grid"><img src={`${A3}kafalah.png`} alt="Kafalah"/><img src={`${A3}mudad.png`} alt="Mudad"/><img src={`${A3}sme-bank.png`} alt="SME Bank"/><img src={`${A3}cultural-fund.jpeg`} alt="Cultural Development Fund"/><img src={`${A3}tdf.png`} alt="Tourism Development Fund"/><img src={`${A3}sidf.jpg`} alt="SIDF"/></div></div>}

    {slide.type === 'products' && <div className="products"><div className="product-line"/>{products.map(([n,name,icon],i)=><article key={name} style={{'--i':i}}><div><img src={`${A2}${icon}`} alt=""/></div><span>{n}</span><strong>{name}</strong></article>)}</div>}

    {slide.type === 'lifecycle' && <div className="lifecycle"><div className="lifecycle-line"><i/></div>{slide.steps.map(([n,name],i)=><article key={n} style={{'--i':i}}><strong>{n}</strong><span>{name}</span></article>)}</div>}

    {slide.type === 'channels' && <div className="channels"><div className="channel-main"><span>CORE MARKETPLACE</span><div><strong>Borrower Channel</strong><i>↔</i><img src={`${A2}manafa-logo.svg`} alt="Manafa"/><i>↔</i><strong>Investor Channel</strong></div></div><div className="channel-scf"><span>SCF PROGRAMS</span><div><strong>Buyer Channel</strong><i>→</i><strong>Supplier / Borrower</strong><i>←</i><strong>Funder Channel</strong></div></div><div className="channel-embedded"><strong>Embedded Channel</strong><span>API-based distribution and partner integrations</span></div></div>}

    {slide.type === 'departments' && <div className="departments">{departments.map((d,i)=><span key={d} style={{'--i':i}}>{d}</span>)}</div>}

    {slide.type === 'product-org' && <div className="product-org"><div className="org-head"><Person src="shahram.webp" name="Mohammed Shahram Javid"/><div><strong>Mohammed Shahram Javid</strong><span>Chief Technology Officer</span></div></div><div className="org-trunk"/><div className="org-branches"><article><Person src="abdullah.webp" name="Abdullah Almazyad"/><h2>Abdullah Almazyad</h2><p>Product Director</p><strong>Digital Business</strong></article><article><div className="person-placeholder"><UserRound/></div><h2>Raghad</h2><p>Product Director</p><strong>Digital Investors</strong><strong>Digital Experience</strong></article></div></div>}

    {slide.type === 'digital-business' && <div className="digital-business"><div className="db-lead"><Person src="abdullah.webp" name="Abdullah Almazyad"/><div><strong>Abdullah Almazyad</strong><span>Product Director · Digital Business</span></div></div><div className="db-scope"><article><span>CHANNELS</span><strong>Borrower</strong><strong>Buyer</strong><strong>Funder</strong><strong>Embedded</strong></article><article><span>RESPONSIBILITY</span><p>Business-facing journeys and the back-office products and platforms supporting Manafa’s financing lines.</p></article></div></div>}

    {slide.type === 'platform-strategy' && <div className="platform-strategy">{[
      ['Customer Hub',['CRM','Client Lifecycle Management','Customer Service','Engagement Management','Transaction Management']],
      ['Lending Hub',['Loan Origination','Loan Management & Collection']],
      ['Financial Hub',['Ledger','Treasury','Invoice Management & Tax']],
      ['Embedded Hub',['Developer Platform','ERP Middleware','API Platform']],
      ['Shared Foundations',['Identity & Access Management','Log Management','Knowledge Management']],
    ].map(([hub,items],i)=><article key={hub} style={{'--i':i}}><span>0{i+1}</span><h2>{hub}</h2>{items.map(x=><p key={x}>{x}</p>)}</article>)}</div>}

    {slide.type === 'delivery' && <div className="delivery"><div className="delivery-path"/><article className="df"><div>DF</div><strong>Digital Factory</strong><span>Demand</span></article><article><div className="discovery-mark">01</div><strong>Discovery</strong><span>Problem, outcome and scope</span></article><article><img src={`${A3}confluence.svg`} alt="Confluence"/><strong>Confluence</strong><span>BRD when structured depth is needed</span></article><article><img src={`${A3}jira.svg`} alt="Jira"/><strong>Jira delivery</strong><span>Borrower · Embedded · Admin · Investor</span></article><article><div className="production-mark">✓</div><strong>Production</strong><span>Validate, release and learn</span></article></div>}

    {slide.type === 'team' && <div className="team"><div className="team-lead"><Person src="abdullah.webp" name="Abdullah Almazyad"/><strong>Abdullah Almazyad</strong><span>Product Director</span><div className="team-line"/></div><div className="team-members">{team.map(([n,r])=><article key={n}><div className="initials">{n.split(' ').map(x=>x[0]).slice(0,2).join('')}</div><div><strong>{n}</strong><span>{r}</span></div></article>)}</div></div>}

    {slide.type === 'ways' && <div className="ways"><ol><li><span>01</span><strong>Direct communication</strong><p>Use the right channel and involve the relevant people early.</p></li><li><span>02</span><strong>Cross-functional delivery</strong><p>Product work moves with business, control and technology teams.</p></li><li><span>03</span><strong>Documented decisions</strong><p>Keep the demand, BRD and Jira delivery work connected.</p></li><li><span>04</span><strong>Early ownership</strong><p>Real work starts early, with guidance and feedback.</p></li></ol></div>}

    {slide.type === 'tools' && <div className="tools"><div className="tool-row"><article><img src={`${A3}slack.svg`} alt="Slack"/><strong>Slack</strong><span>Team communication</span></article><article><img src={`${A3}microsoftoutlook.svg`} alt="Microsoft"/><strong>Microsoft 365</strong><span>Email and calendar</span></article><article><img src={`${A3}jira.svg`} alt="Jira"/><strong>Jira</strong><span>Delivery work</span></article><article><img src={`${A3}confluence.svg`} alt="Confluence"/><strong>Confluence</strong><span>Knowledge and BRDs</span></article><article><div className="hr-mark">HR</div><strong>HR System</strong><span>Attendance and leave</span></article></div><div className="essentials"><span>COMPANY ESSENTIALS</span><p>Leave requests</p><p>Attendance</p><p>Professional certificate support policy</p><p>Approved certificates list</p></div></div>}

    {slide.type === 'thanks' && <div className="thanks"><h2>{slide.subtitle}</h2><div/><p>Welcome to Digital Business.</p></div>}

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
