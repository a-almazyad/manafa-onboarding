import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Building2,
  Check,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Code2,
  Expand,
  FileText,
  Landmark,
  Layers3,
  Lightbulb,
  Menu,
  Network,
  PanelTop,
  Presentation,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  X,
} from 'lucide-react'
import './styles.css'

const A = `${import.meta.env.BASE_URL}assets/`

const slides = [
  {
    id: 'welcome',
    type: 'cover',
    accent: 'blue',
    kicker: 'DIGITAL BUSINESS · CO-OP ONBOARDING',
    title: 'Welcome to Manafa',
    subtitle: 'Understand the business. Learn the craft. Contribute to real work.',
    meta: 'Business Analysis · UX/UI · Seven-month experience',
  },
  {
    id: 'outcomes',
    type: 'content',
    kicker: 'YOUR ONBOARDING MAP',
    title: 'Four things to understand before you begin',
    subtitle: 'The presentation gives you the map. Your work will provide the depth.',
    blocks: [
      ['01', 'The company', 'Why Manafa exists, whom it serves, and how it has grown.'],
      ['02', 'The business', 'How companies, funders, investors, products, and platforms connect.'],
      ['03', 'The organization', 'Who you will work with and what each department contributes.'],
      ['04', 'Your contribution', 'How BA and UX/UI turn needs into delivered outcomes.'],
    ],
  },
  {
    id: 'scale',
    type: 'metrics',
    kicker: 'MANAFA AT A GLANCE',
    title: 'A Saudi fintech built for business growth',
    subtitle: 'Manafa connects companies seeking financing with funders and investors through regulated digital experiences.',
    metrics: [
      ['SAR 3.2B+', 'Total financing'],
      ['200K+', 'Users'],
      ['190+', 'Team members'],
      ['12+', 'Partnerships'],
    ],
    footnote: 'Public company figures — verify on manafa.sa before each cohort.',
    sources: [
      ['Manafa — About', 'https://manafa.sa/about'],
      ['Manafa — Homepage', 'https://manafa.sa/'],
    ],
  },
  {
    id: 'story',
    type: 'timeline',
    kicker: 'OUR STORY',
    title: 'Manafa’s story is one of increasing trust and scale',
    subtitle: 'Each milestone expanded what the company could make possible for businesses and investors.',
    timeline: [
      ['2022', 'Full SAMA licence', 'Debt-based crowdfunding licence after Sandbox testing.'],
      ['2022', 'SAR 106M Series A', 'Co-led by STV and Wa’ed Ventures.'],
      ['2023', 'Saudi Unicorns Program', 'Selected for the first program cohort.'],
      ['2024', 'Aramco SCF', 'Landmark supply-chain financing collaboration announced at FII8.'],
      ['2025', 'SCF expands', 'Saudi Electricity Company program and SAMA Sandbox permission.'],
    ],
    sources: [
      ['SAMA — Debt crowdfunding licence', 'https://www.sama.gov.sa/en-us/mediacenter/news/pages/news-801.aspx'],
      ['STV — Manafa Series A', 'https://stv.vc/blog/en/2022/12/28/investing-in-manafa-enabling-sme-financing-and-unlocking-new-asset-classes-to-retail-and-institutional-investors'],
      ['Saudi Unicorns Program', 'https://ntdp.gov.sa/saudi-unicorn'],
      ['Aramco — SCF announcement', 'https://www.aramco.com/en/news-media/news/2024/aramco-sidf-and-taulia-announce-supply-chain-financing-solution'],
      ['SAMA — SCF Sandbox', 'https://www.sama.gov.sa/en-us/mediacenter/news/pages/news-1104.aspx'],
    ],
  },
  {
    id: 'marketplace',
    type: 'ecosystem',
    kicker: 'HOW MANAFA CREATES VALUE',
    title: 'Manafa orchestrates both sides of financing',
    subtitle: 'The customer-facing journey is supported by credit, compliance, operations, finance, technology, and servicing.',
    actors: [
      ['Companies', 'Seek suitable financing to operate and grow.', Building2],
      ['Suppliers', 'Need earlier payment and predictable cash flow.', ClipboardCheck],
      ['Buyers', 'Strengthen their supply chains and working capital.', Network],
      ['Funders', 'Deploy capital into structured opportunities.', Landmark],
      ['Investors', 'Access diversified financing opportunities.', CircleDollarSign],
    ],
  },
  {
    id: 'group',
    type: 'group',
    kicker: 'THE ECOSYSTEM AROUND US',
    title: 'Manafa is part of a wider entrepreneurial story',
    subtitle: 'Related companies extend the group’s reach across investment, asset management, and technology delivery.',
    companies: [
      ['Manafa', 'Debt crowdfunding and business financing', 'manafa.sa'],
      ['Sukuk Capital', 'Sukuk and capital-market solutions', 'sukuk.sa'],
      ['Abyan Capital', 'Digital investment and asset management', 'abyancapital.sa'],
      ['Manafa Technologies', 'Technology delivery team in Pakistan', 'Pakistan'],
    ],
    sources: [
      ['Manafa', 'https://manafa.sa/'],
      ['Sukuk Capital', 'https://sukuk.sa/'],
      ['Abyan Capital', 'https://www.abyancapital.sa/'],
      ['Manafa Technologies', 'https://www.linkedin.com/company/manafa-technologies/'],
    ],
  },
  {
    id: 'products',
    type: 'products',
    kicker: 'SEVEN FINANCING PRODUCTS',
    title: 'Different needs, one connected financing platform',
    subtitle: 'Embedded lending is a distribution model—not an eighth financing product.',
    products: [
      ['01', 'Invoice Financing'],
      ['02', 'Letter of Guarantee Financing'],
      ['03', 'Purchase Order Financing'],
      ['04', 'Working Capital Financing'],
      ['05', 'Payroll Financing'],
      ['06', 'Real Estate Financing'],
      ['07', 'Supply Chain Financing'],
    ],
    sources: [['Manafa — Business financing products', 'https://manafa.sa/']],
  },
  {
    id: 'scf',
    type: 'image-story',
    kicker: 'A PIVOTING BUSINESS MOMENT',
    title: 'SCF brought Manafa into larger, multi-party programs',
    subtitle: 'The model connects approved buyer obligations, supplier liquidity, and funder capital through one coordinated experience.',
    image: `${A}scf-milestones.png`,
    callouts: ['Aramco collaboration announced at FII8 in 2024', 'Saudi Electricity Company program announced in 2025'],
    sources: [
      ['Aramco — SCF announcement', 'https://www.aramco.com/en/news-media/news/2024/aramco-sidf-and-taulia-announce-supply-chain-financing-solution'],
      ['SAP Taulia — SEC program', 'https://taulia.com/company/news/press-releases/sap-taulia-delivers-landmark-supply-chain-finance-transformation-for-saudi-electricity-company-sec/'],
    ],
  },
  {
    id: 'lifecycle',
    type: 'process',
    kicker: 'THE GOLDEN FINANCING LIFECYCLE',
    title: 'Every financing journey passes through connected decisions',
    subtitle: 'Product rules differ, but the shared logic helps you understand where each platform and department contributes.',
    steps: [
      ['01', 'Company', 'Onboarding and business information'],
      ['02', 'Request', 'Financing need and evidence'],
      ['03', 'Assess', 'Operations, credit, compliance'],
      ['04', 'Approve', 'Offer, conditions, agreements'],
      ['05', 'Fund', 'Investor or funder participation'],
      ['06', 'Service', 'Disbursement, LMS, repayment, closure'],
    ],
  },
  {
    id: 'leadership',
    type: 'leadership',
    kicker: 'EXECUTIVE LEADERSHIP',
    title: 'The leaders you will hear about',
    subtitle: 'Titles below reflect the currently confirmed operating context—not older website or organization-chart labels.',
    leaders: [
      ['Abdulaziz Aladwani', 'Founder & CEO'],
      ['Mohammed Shahram Javid', 'Chief Technology Officer'],
      ['Rayan Al-Duhaiman', 'Chief Business Officer'],
      ['Abdulrahman Al-Sayari', 'Chief Growth Officer'],
      ['Daniyal Alvi', 'Chief Financial Officer'],
      ['Samer Samara', 'Chief Control Officer'],
      ['Reem Murad', 'Chief Legal & Governance Officer'],
      ['Rayan Al-Suhaibani', 'Chief Information Security Officer'],
    ],
  },
  {
    id: 'departments',
    type: 'departments',
    kicker: 'OUR DELIVERY PARTNERS',
    title: 'Digital Business works across the organization',
    subtitle: 'Learn what each department owns, when to involve it, and what a good handoff requires.',
    departments: [
      'Digital Investors', 'Digital Experience', 'Technology & Engineering', 'Cybersecurity',
      'Credit', 'Compliance, Risk & BCM', 'Business Operations', 'Portfolio Management',
      'Collections', 'Finance & Treasury', 'Legal & Governance', 'Business Development & Partnership',
      'Marketing & Branding Communication', 'Customer Care', 'Human Resources', 'Internal Audit',
    ],
  },
  {
    id: 'digital-product',
    type: 'three-columns',
    kicker: 'DIGITAL PRODUCT ORGANIZATION',
    title: 'Three departments shape complementary experiences',
    subtitle: 'Product leadership reports to the CTO. Raghad’s shared team currently works across two distinct departments.',
    columns: [
      ['Digital Business', 'Abdullah Almazyad', ['Business and borrower journeys', 'Buyer, supplier, funder and embedded channels', 'Back-office platforms']],
      ['Digital Investors', 'Raghad Aljuhani', ['Investor web and mobile', 'Investor platforms', 'Funding-side experience']],
      ['Digital Experience', 'Raghad Aljuhani', ['Design system', 'External websites', 'Customer Service and Engagement platforms']],
    ],
  },
  {
    id: 'scope',
    type: 'scope',
    kicker: 'DIGITAL BUSINESS',
    title: 'We own the journeys and the platforms behind them',
    subtitle: 'The department is broader than the borrower website.',
    channels: ['Borrower', 'Buyer', 'Supplier / Funder', 'Embedded'],
    hubs: [
      ['Customer Hub', 'CRM · Client Lifecycle · Transaction Management'],
      ['Lending Hub', 'Loan Origination · Loan Management · Collections'],
      ['Financial Hub', 'Ledger · Treasury · Invoicing & Tax'],
      ['Embedded Hub', 'Developer Platform · ERP Middleware'],
      ['Shared Foundations', 'Identity · Logs · Analytics · Knowledge'],
    ],
  },
  {
    id: 'team',
    type: 'team',
    kicker: 'YOUR DIGITAL BUSINESS TEAM',
    title: 'Know who carries which kind of context',
    subtitle: 'The team combines product leadership, business analysis, and experience design.',
    groups: [
      ['Leadership', ['Abdullah Almazyad — Director', 'Mohammed Alghofaily — Product Lead / UX', 'Fahad Aldossari — Product Lead', 'Bandar Alarifi — Product Lead']],
      ['Business Analysis', ['Alma Alfowzan', 'Mohammed Alasaker', 'Noura Aljmhoor', 'Danah Alsuhaibani', 'Norah Alahmed', 'Abdulwahab Alghamdi']],
      ['UX/UI Design', ['Najla Alharthi', 'Nouf Alkernass']],
    ],
  },
  {
    id: 'delivery',
    type: 'delivery',
    kicker: 'DIGITAL FACTORY TO PRODUCTION',
    title: 'Trace every delivery item back to the original need',
    subtitle: 'Use the smallest documentation route that makes the work clear and safe.',
    flow: [
      ['DF demand', 'Problem, outcome, users, stakeholders, evidence'],
      ['Scope', 'Clarify boundaries, dependencies, and ownership'],
      ['Document', 'Lean Jira work or a Confluence BRD for complex solutions'],
      ['Squad delivery', 'EMQ · ISQ · ASQ · BSQ — linked to DF'],
      ['Validate', 'Grooming, development, QA, UAT, release readiness'],
      ['Learn', 'Production outcome, monitoring, feedback, iteration'],
    ],
    sources: [
      ['DF Demand Standard', 'https://manafaco.atlassian.net/wiki/spaces/DFAE/pages/4555505729/02.1+DF+Demand+Standard'],
      ['Product Delivery Operating Model', 'https://manafaco.atlassian.net/wiki/spaces/DFAE/pages/4555767850/01+Product+Delivery+Operating+Model'],
      ['Digital Factory Lifecycle and Stage Gates', 'https://manafaco.atlassian.net/wiki/spaces/DFAE/pages/4555833419/01.1+Digital+Factory+Lifecycle+Stage+Gates'],
    ],
  },
  {
    id: 'roles',
    type: 'roles',
    kicker: 'YOUR CRAFT',
    title: 'BA and UX/UI solve the same problem from different angles',
    subtitle: 'The best work happens when analysis and design move together from discovery through release.',
    ba: ['Frame the problem and intended outcome', 'Discover rules, data, dependencies, and exceptions', 'Choose the right artifact and define testable acceptance', 'Support grooming, clarification, UAT, and traceability'],
    ux: ['Represent user needs and usability', 'Create flows, wireframes, prototypes, and interface designs', 'Design for accessibility, responsiveness, and edge cases', 'Support handoff and review the implemented experience'],
    shared: 'Understand → explore → align → deliver → learn',
  },
  {
    id: 'learning',
    type: 'learning',
    kicker: 'HOW YOU WILL LEARN',
    title: 'Courses build foundations; real work builds capability',
    subtitle: 'Learning resources are curated, flexible around delivery, and always connected to practical evidence.',
    tracks: [
      ['Shared foundation', ['Manafa business and products', 'Scrum and Agile basics', 'Jira, Confluence and communication', 'Responsible AI and information handling']],
      ['BA foundation', ['Business analysis mindset', 'Process modelling', 'Requirements and acceptance criteria', 'Grooming, UAT and traceability']],
      ['UX/UI foundation', ['User-centred design', 'Figma and prototyping', 'Accessibility and design systems', 'Handoff and implementation review']],
    ],
  },
  {
    id: 'close',
    type: 'close',
    accent: 'blue',
    kicker: 'YOUR FIRST COMMITMENT',
    title: 'Start with curiosity, ownership, and evidence',
    subtitle: 'Ask when context is missing. Explore before assuming. Show your reasoning. Request feedback early.',
    actions: ['Meet the team', 'Explore one complete journey', 'Understand where work and knowledge live'],
  },
]

function Logo({ inverse = false }) {
  return <img className={`logo ${inverse ? 'logo--inverse' : ''}`} src={`${A}manafa-logo.png`} alt="Manafa" />
}

function SlideChrome({ slide, index, total, dark = false }) {
  return (
    <>
      <div className="slide-kicker">{slide.kicker}</div>
      <Logo inverse={dark} />
      <div className="slide-number">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</div>
    </>
  )
}

function Header({ slide }) {
  return (
    <header className="slide-header">
      <h1>{slide.title}</h1>
      {slide.subtitle && <p>{slide.subtitle}</p>}
    </header>
  )
}

function SourceButton({ slide, onOpen }) {
  if (!slide.sources?.length) return null
  return <button className="source-button" onClick={onOpen}>Sources</button>
}

function RenderSlide({ slide, index, total, onSources }) {
  if (slide.type === 'cover') {
    return <section className={`slide slide--cover accent-${slide.accent}`}>
      <SlideChrome slide={slide} index={index} total={total} />
      <div className="cover-copy">
        <h1>{slide.title}</h1>
        <div className="title-rule" />
        <p>{slide.subtitle}</p>
      </div>
      <div className="cover-meta">{slide.meta}</div>
    </section>
  }

  if (slide.type === 'divider') {
    return <section className={`slide slide--divider accent-${slide.accent}`}>
      <SlideChrome slide={slide} index={index} total={total} dark />
      <div className="divider-number">{slide.number}</div>
      <div className="divider-copy">
        <h1>{slide.title}</h1>
        <div className="title-rule" />
        <p>{slide.subtitle}</p>
      </div>
    </section>
  }

  return <section className={`slide slide--${slide.type}`}>
    <SlideChrome slide={slide} index={index} total={total} />
    <Header slide={slide} />

    {slide.type === 'content' && <div className="numbered-blocks">
      {slide.blocks.map(([n, title, body]) => <article key={n}>
        <span>{n}</span><div><h2>{title}</h2><p>{body}</p></div>
      </article>)}
    </div>}

    {slide.type === 'metrics' && <>
      <div className="metric-row">{slide.metrics.map(([value, label]) => <article key={label}><strong>{value}</strong><span>{label}</span></article>)}</div>
      <div className="wide-statement"><ShieldCheck /><p>SAMA-regulated debt-based crowdfunding company connecting financing and investment experiences.</p></div>
      <p className="footnote">{slide.footnote}</p>
    </>}

    {slide.type === 'timeline' && <div className="timeline">
      {slide.timeline.map(([year, title, body], i) => <article key={`${year}-${title}`}>
        <div className="timeline-index">0{i + 1}</div><div className="timeline-dot" /><strong>{year}</strong><h2>{title}</h2><p>{body}</p>
      </article>)}
    </div>}

    {slide.type === 'ecosystem' && <div className="ecosystem">
      <div className="ecosystem-core"><span>manafa</span><small>orchestrates</small></div>
      {slide.actors.map(([title, body, Icon]) => <article key={title}><Icon /><h2>{title}</h2><p>{body}</p></article>)}
    </div>}

    {slide.type === 'group' && <div className="company-list">
      {slide.companies.map(([name, role, url], i) => <article key={name}><span>0{i + 1}</span><div><h2>{name}</h2><p>{role}</p></div><small>{url}</small></article>)}
    </div>}

    {slide.type === 'products' && <div className="product-list">
      {slide.products.map(([n, name]) => <article key={name}><span>{n}</span><h2>{name}</h2><ChevronRight /></article>)}
    </div>}

    {slide.type === 'image-story' && <div className="image-story">
      <figure><img src={slide.image} alt="Manafa supply chain finance milestones" /></figure>
      <div>{slide.callouts.map((text, i) => <article key={text}><span>0{i + 1}</span><p>{text}</p></article>)}</div>
    </div>}

    {slide.type === 'process' && <div className="process-row">
      {slide.steps.map(([n, title, body]) => <article key={n}><span>{n}</span><h2>{title}</h2><p>{body}</p></article>)}
    </div>}

    {slide.type === 'leadership' && <div className="leadership-grid">
      {slide.leaders.map(([name, role], i) => <article key={name}><span>{String(i + 1).padStart(2, '0')}</span><div><h2>{name}</h2><p>{role}</p></div></article>)}
    </div>}

    {slide.type === 'departments' && <div className="department-list">
      {slide.departments.map((name, i) => <article key={name}><span>{String(i + 1).padStart(2, '0')}</span><p>{name}</p></article>)}
    </div>}

    {slide.type === 'three-columns' && <div className="three-columns">
      {slide.columns.map(([name, owner, items], i) => <article key={name} className={`column-${i + 1}`}><span>0{i + 1}</span><h2>{name}</h2><p className="owner">{owner}</p><ul>{items.map(item => <li key={item}>{item}</li>)}</ul></article>)}
    </div>}

    {slide.type === 'scope' && <div className="scope-layout">
      <div className="channel-strip">{slide.channels.map((x, i) => <article key={x}><span>0{i + 1}</span><p>{x}</p></article>)}</div>
      <div className="hub-list">{slide.hubs.map(([name, items]) => <article key={name}><h2>{name}</h2><p>{items}</p></article>)}</div>
    </div>}

    {slide.type === 'team' && <div className="team-groups">
      {slide.groups.map(([name, people], i) => <article key={name}><div className="team-title"><span>0{i + 1}</span><h2>{name}</h2></div><ul>{people.map(p => <li key={p}>{p}</li>)}</ul></article>)}
    </div>}

    {slide.type === 'delivery' && <div className="delivery-flow">
      {slide.flow.map(([title, body], i) => <article key={title}><span>0{i + 1}</span><h2>{title}</h2><p>{body}</p></article>)}
    </div>}

    {slide.type === 'roles' && <div className="roles-layout">
      <article><div className="role-title"><FileText /><h2>Business Analysis</h2></div><ul>{slide.ba.map(x => <li key={x}><Check />{x}</li>)}</ul></article>
      <article><div className="role-title"><PanelTop /><h2>UX/UI Design</h2></div><ul>{slide.ux.map(x => <li key={x}><Check />{x}</li>)}</ul></article>
      <div className="shared-role">{slide.shared}</div>
    </div>}

    {slide.type === 'learning' && <div className="learning-tracks">
      {slide.tracks.map(([name, items], i) => <article key={name}><span>0{i + 1}</span><h2>{name}</h2><ul>{items.map(x => <li key={x}>{x}</li>)}</ul></article>)}
    </div>}

    {slide.type === 'close' && <div className="close-layout">
      <div><Sparkles /><p>{slide.subtitle}</p></div>
      <ol>{slide.actions.map((x, i) => <li key={x}><span>0{i + 1}</span>{x}</li>)}</ol>
    </div>}

    <SourceButton slide={slide} onOpen={onSources} />
  </section>
}

function App() {
  const [current, setCurrent] = useState(() => {
    const hash = window.location.hash.replace('#', '')
    const index = slides.findIndex(s => s.id === hash)
    return index >= 0 ? index : 0
  })
  const [overview, setOverview] = useState(false)
  const [sourceSlide, setSourceSlide] = useState(null)
  const touchStart = useRef(null)

  const go = useCallback((next) => {
    const bounded = Math.max(0, Math.min(slides.length - 1, next))
    setCurrent(bounded)
    window.history.replaceState(null, '', `#${slides[bounded].id}`)
  }, [])

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      const index = slides.findIndex(s => s.id === hash)
      if (index >= 0) setCurrent(index)
    }
    const onKey = (event) => {
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') { event.preventDefault(); go(current + 1) }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); go(current - 1) }
      if (event.key === 'Home') go(0)
      if (event.key === 'End') go(slides.length - 1)
      if (event.key.toLowerCase() === 'o') setOverview(v => !v)
      if (event.key === 'Escape') { setOverview(false); setSourceSlide(null) }
    }
    window.addEventListener('hashchange', onHashChange)
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener('keydown', onKey)
    }
  }, [current, go])

  const onTouchStart = (e) => { touchStart.current = e.changedTouches[0].clientX }
  const onTouchEnd = (e) => {
    if (touchStart.current == null) return
    const delta = e.changedTouches[0].clientX - touchStart.current
    if (Math.abs(delta) > 50) go(current + (delta < 0 ? 1 : -1))
    touchStart.current = null
  }

  const currentSlide = slides[current]
  const progress = useMemo(() => ((current + 1) / slides.length) * 100, [current])

  return <main className="deck" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
    <div className="stage">
      <RenderSlide slide={currentSlide} index={current} total={slides.length} onSources={() => setSourceSlide(currentSlide)} />
    </div>

    <nav className="deck-controls" aria-label="Presentation controls">
      <button onClick={() => setOverview(true)} aria-label="Open slide overview"><Menu /></button>
      <button onClick={() => go(current - 1)} disabled={current === 0} aria-label="Previous slide"><ArrowLeft /></button>
      <div className="progress" aria-label={`Slide ${current + 1} of ${slides.length}`}><span style={{ width: `${progress}%` }} /></div>
      <button onClick={() => go(current + 1)} disabled={current === slides.length - 1} aria-label="Next slide"><ArrowRight /></button>
      <button onClick={() => document.documentElement.requestFullscreen?.()} aria-label="Enter full screen"><Expand /></button>
    </nav>

    {overview && <div className="overlay" role="dialog" aria-modal="true" aria-label="Slide overview">
      <div className="overlay-header"><div><Presentation /><h2>Onboarding overview</h2></div><button onClick={() => setOverview(false)} aria-label="Close slide overview"><X /></button></div>
      <div className="overview-grid">{slides.map((slide, i) => <button key={slide.id} onClick={() => { go(i); setOverview(false) }} className={i === current ? 'active' : ''}>
        <span>{String(i + 1).padStart(2, '0')}</span><p>{slide.title}</p>
      </button>)}</div>
    </div>}

    {sourceSlide && <div className="overlay source-overlay" role="dialog" aria-modal="true" aria-label="Sources">
      <div className="overlay-header"><div><BookOpen /><h2>Sources — {sourceSlide.title}</h2></div><button onClick={() => setSourceSlide(null)} aria-label="Close sources"><X /></button></div>
      <div className="source-list">{sourceSlide.sources.map(([label, url]) => <a key={url} href={url} target="_blank" rel="noreferrer"><span>{label}</span><ChevronRight /></a>)}</div>
    </div>}
  </main>
}

createRoot(document.getElementById('root')).render(<App />)
