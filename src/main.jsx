import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowLeft, ArrowRight, BookOpen, Building2, Check, ChevronRight,
  CircleDollarSign, Expand, FileText, GraduationCap, HandCoins,
  Landmark, Layers3, Menu, MessageSquare, Network, PanelTop,
  Presentation, ShieldCheck, UserRound, Users, X,
} from 'lucide-react'
import './styles.css'

const A = `${import.meta.env.BASE_URL}assets/v2/`

const productSlides = [
  { id: 'invoice', number: '01', name: 'Invoice Financing', icon: 'invoice.svg', accent: 'blue', phrase: 'Turn completed work into working cash.', scenario: 'A company has delivered to its customer and issued an invoice—but payment is still weeks away.', outcome: 'Manafa finances the eligible invoice so the company can keep operating instead of waiting.' },
  { id: 'lg', number: '02', name: 'Letter of Guarantee Financing', icon: 'lg.svg', accent: 'purple', phrase: 'Unlock an opportunity without freezing liquidity.', scenario: 'A business needs a guarantee to bid, perform or fulfil a contractual obligation.', outcome: 'Financing helps the company secure the required guarantee while protecting its working capital.' },
  { id: 'po', number: '03', name: 'Purchase Order Financing', icon: 'po.svg', accent: 'orange', phrase: 'Finance the order before revenue arrives.', scenario: 'A company has won an order but needs funds to buy inventory, materials or services before delivery.', outcome: 'Manafa supports the cost of fulfilling the purchase order and reaching the next commercial milestone.' },
  { id: 'working-capital', number: '04', name: 'Working Capital Financing', icon: 'working-capital.svg', accent: 'green', phrase: 'Keep the business moving through the cash cycle.', scenario: 'Growth creates a gap between today’s operating costs and tomorrow’s collections.', outcome: 'Flexible financing supports inventory, suppliers and daily operating needs.' },
  { id: 'payroll', number: '05', name: 'Payroll Financing', icon: 'payroll.svg', accent: 'cyan', phrase: 'Protect the most important monthly commitment.', scenario: 'A temporary cash-flow delay should not become a delayed salary for employees.', outcome: 'Short-term financing helps an eligible company meet payroll on time.' },
  { id: 'real-estate', number: '06', name: 'Real Estate Financing', icon: 'real-estate.svg', accent: 'red', phrase: 'Fund opportunities backed by real assets.', scenario: 'A business has a real-estate financing need with a defined asset, purpose and repayment path.', outcome: 'The journey brings asset information, assessment, approval and funding into one controlled flow.' },
  { id: 'scf-product', number: '07', name: 'Supply Chain Financing', icon: 'scf.svg', accent: 'navy', phrase: 'Make approved invoices work for the whole ecosystem.', scenario: 'A buyer has approved a supplier invoice, but the supplier wants payment before the contractual due date.', outcome: 'Funders provide early payment; the buyer pays later according to the agreed schedule.' },
]

const slides = [
  { id: 'welcome', type: 'cover', title: 'Welcome to Manafa', subtitle: 'Meet the company. Understand the business. Know the people. See how work moves.', meta: 'Digital Business · New Joiner Onboarding' },
  { id: 'meet-manafa', type: 'section-break', chapter: '01', eyebrow: 'MEET MANAFA', title: 'Start with the company behind the products', body: 'Why Manafa exists, how it grew and the people leading its next chapter.' },

  { id: 'who-we-are', type: 'brand-hero', eyebrow: 'WHO WE ARE', title: 'Manafa is a Saudi fintech built to be a growth partner.', body: 'We connect businesses seeking financing with funders and investors through regulated, technology-enabled journeys.', logo: 'manafa-logo.svg' },
  { id: 'why-we-exist', type: 'scene-triptych', eyebrow: 'WHY WE EXIST', title: 'Growth should not stop because cash arrives later than opportunity.', scenes: [['borrower-scene.webp','Supplier','Needs cash before an approved invoice is paid.'],['buyer-scene.webp','Buyer','Wants a stronger, more resilient supply chain.'],['funder-scene.webp','Funder','Wants structured opportunities and efficient deployment.']] },
  { id: 'orchestrator', type: 'ecosystem', eyebrow: 'THE ROLE MANAFA PLAYS', title: 'One platform coordinates many parties and decisions', actors: [['Businesses',Building2],['Buyers',Network],['Funders',Landmark],['Investors',CircleDollarSign]], center: 'Manafa', footer: 'The visible digital journey is supported by credit, compliance, operations, finance, technology and servicing.' },
  { id: 'timeline', type: 'timeline', eyebrow: 'OUR STORY', title: 'Trust expanded what Manafa could make possible', points: [['2018','Manafa begins','A technology-led approach to financing and investment.'],['2022','SAMA licence','Full debt-based crowdfunding licence.'],['2022','Series A','SAR 106M led by STV and Wa’ed Ventures.'],['2023','Saudi Unicorns','Selected for the national scale-up program.'],['2024–25','Enterprise SCF','Aramco, SEC and the SAMA Sandbox.']] },
  { id: 'regulation', type: 'media-proof', eyebrow: 'REGULATION BUILDS TRUST', title: 'Innovation moves inside clear regulatory boundaries', image: 'regulation.png', body: 'Manafa received its full debt-based crowdfunding licence in 2022. In 2025, SAMA permitted Manafa to test supply-chain financing solutions within the Regulatory Sandbox.', fit: 'contain', sources: [['SAMA — Debt crowdfunding licence','https://www.sama.gov.sa/en-us/mediacenter/news/pages/news-801.aspx'],['SAMA — SCF Regulatory Sandbox','https://www.sama.gov.sa/en-us/mediacenter/news/pages/news-1104.aspx']] },
  { id: 'series-a', type: 'photo-moment', eyebrow: 'DECEMBER 2022', title: 'SAR 106M to scale the next chapter', body: 'The Series A round, approximately USD 28M, was led by STV and Wa’ed Ventures—supporting new products, wider reach and continued growth.', image: 'series-a.jpg', stat: 'SAR 106M', sources: [['STV — Investing in Manafa','https://stv.vc/blog/en/2022/12/28/investing-in-manafa-enabling-sme-financing-and-unlocking-new-asset-classes-to-retail-and-institutional-investors'],['The National — Manafa Series A','https://www.thenationalnews.com/business/start-ups/2022/12/28/saudi-start-up-manafa-raises-28-million-to-fund-expansion/']] },
  { id: 'unicorn', type: 'photo-moment', eyebrow: 'SAUDI UNICORNS PROGRAM', title: 'Selected among Saudi Arabia’s high-potential technology companies', body: 'The program connects promising scale-ups with investors, mentors, talent and expansion support on the path toward billion-dollar scale.', image: 'unicorn.jpg', stat: '2023', sources: [['Saudi Unicorns Program','https://ntdp.gov.sa/saudi-unicorn']] },
  { id: 'aramco', type: 'photo-full', eyebrow: 'FII8 · OCTOBER 2024', title: 'A landmark enterprise SCF collaboration', body: 'Aramco, SIDF, Taulia and Manafa announced one of the world’s largest supply-chain financing programs—designed to unlock liquidity for thousands of suppliers.', image: 'aramco-signing.webp', sources: [['Aramco — SCF announcement','https://www.aramco.com/en/news-media/news/2024/aramco-sidf-and-taulia-announce-supply-chain-financing-solution']] },
  { id: 'sec', type: 'poster-moment', eyebrow: 'FII9 · 2025', title: 'The model expanded to Saudi Electricity Company', body: 'A second national-scale buyer demonstrated that Manafa’s SCF capability could become a repeatable platform—not a one-off project.', image: 'sec-signing.jpg', sources: [['Manafa — SEC SCF announcement','https://www.linkedin.com/posts/manafa-co_fii9-activity-7389028836077678592-D87w']] },
  { id: 'scale', type: 'metrics', eyebrow: 'MANAFA TODAY', title: 'The story now has real scale behind it', metrics: [['SAR 3.2B+','Total financing'],['200K+','Users'],['190+','Team members'],['12+','Partnerships']], note: 'Public figures should be verified on manafa.sa before each cohort.', sources: [['Manafa — About','https://manafa.sa/about'],['Manafa — Achievements','https://manafa.sa/achievement']] },
  { id: 'executives', type: 'portraits', eyebrow: 'EXECUTIVE LEADERSHIP', title: 'The people leading Manafa’s next chapter', people: [['Abdulaziz Aladwani','Founder & CEO','ceo.webp'],['Mohammed Shahram Javid','Chief Technology Officer','shahram.webp'],['Rayan Al-Duhaiman','Chief Business Officer','rayan-business.webp'],['Abdulrahman Al-Sayari','Chief Growth Officer','abdulrahman.webp'],['Daniyal Alvi','Chief Financial Officer','daniyal.webp'],['Samer Samara','Chief Control Officer','samer.webp'],['Reem Murad','Chief Legal & Governance Officer',null],['Rayan Al-Suhaibani','Chief Information Security Officer','rayan-ciso.webp']] },

  { id: 'group-map', type: 'group-map', eyebrow: 'THE WIDER STORY', title: 'Manafa grew alongside a broader financial and technology ecosystem', companies: [['Manafa','Business financing & investment','manafa-logo.svg'],['Sukuk Capital','Debt instruments & capital markets','sukuk.svg'],['Abyan Capital','Digital asset management','abyan.svg'],['Manafa Technologies','Technology delivery · Pakistan',null]] },
  { id: 'sister-companies', type: 'company-pair', eyebrow: 'SISTER COMPANIES', title: 'Different propositions, a shared ambition to widen access', companies: [{name:'Sukuk Capital',logo:'sukuk.svg',body:'Makes issuing and investing in sukuk and debt instruments more accessible.'},{name:'Abyan Capital',logo:'abyan.svg',body:'Provides digital, Sharia-compliant investment and portfolio-management experiences.'}], sources: [['Sukuk Capital','https://sukuk.sa/'],['Abyan Capital','https://www.abyancapital.sa/']] },
  { id: 'manafa-tech', type: 'tech-bridge', eyebrow: 'MANAFA TECHNOLOGIES', title: 'Our technology kitchen extends from Riyadh to Pakistan', body: 'Product, engineering and data work across one delivery system. New joiners should learn how context, decisions and handoffs travel across locations—not treat technology as a remote black box.', places: ['Riyadh','Pakistan'] },
  { id: 'partners', type: 'partner-wall', eyebrow: 'THE ECOSYSTEM AROUND US', title: 'Investors, public institutions and strategic partners help Manafa scale', image: 'partners.png', body: 'STV and Wa’ed Ventures back the company. Government funds, enablement programs and strategic institutions extend reach, trust and financing capacity.' },

  { id: 'understand-business', type: 'section-break', chapter: '02', eyebrow: 'UNDERSTAND THE BUSINESS', title: 'Follow value from a financing need to repayment', body: 'The customers, products and decisions that make the marketplace work.' },
  { id: 'marketplace', type: 'ecosystem', eyebrow: 'THE FINANCING MARKETPLACE', title: 'Value moves when every side understands its role', actors: [['Company',Building2],['Credit & control',ShieldCheck],['Funder',Landmark],['Investor',CircleDollarSign]], center: 'Opportunity', footer: 'Manafa turns a financing need into a structured, assessed and serviceable opportunity.' },
  { id: 'borrower-journey', type: 'journey-photo', eyebrow: 'THE BUSINESS SIDE', title: 'A company journey begins with a need—not a system', image: 'borrower-scene.webp', steps: ['Discover a suitable product','Submit the business and financing request','Provide evidence and respond to questions','Receive an offer and complete conditions','Get funded and service the facility'] },
  { id: 'investor-journey', type: 'journey-photo', eyebrow: 'THE FUNDING SIDE', title: 'Funders and investors need confidence before capital moves', image: 'funder-scene.webp', steps: ['Understand the opportunity','Review risk and expected return','Commit capital','Track performance and repayments','Build trust through transparent servicing'] },
  { id: 'products', type: 'product-overview', eyebrow: 'SEVEN FINANCING PRODUCTS', title: 'Different business moments require different structures', products: productSlides.map(p => [p.number,p.name,p.icon]), note: 'Embedded lending is a distribution model—not an eighth financing product.' },
  ...productSlides.map(p => ({ ...p, title: p.name, type: 'product-feature', eyebrow: `FINANCING PRODUCT ${p.number}` })),
  { id: 'lifecycle', type: 'process', eyebrow: 'THE GOLDEN FINANCING LIFECYCLE', title: 'Every product moves through connected decisions', steps: [['01','Onboard','Know the company'],['02','Request','Capture the need'],['03','Assess','Operations, credit & compliance'],['04','Approve','Offer, conditions & agreements'],['05','Fund','Investor or funder participation'],['06','Service','Disburse, repay & close']] },

  { id: 'how-work-moves', type: 'section-break', chapter: '03', eyebrow: 'SEE HOW WORK GETS DONE', title: 'Products move through an organization—not a single team', body: 'The departments, platforms and delivery workflow behind each customer experience.' },
  { id: 'stakeholders', type: 'stakeholders', eyebrow: 'MANAFA DEPARTMENTS', title: 'Every financing journey depends on specialists across Manafa', groups: [['Decide','Credit','Compliance, Risk & BCM','Legal & Governance'],['Operate','Business Operations','Portfolio Management','Collections','Customer Care'],['Enable','Technology & Engineering','Cybersecurity','Finance & Treasury','Human Resources'],['Grow','Business Development & Partnership','Marketing & Branding Communication','Digital Investors & Experience','Internal Audit']] },
  { id: 'product-org', type: 'org', eyebrow: 'DIGITAL PRODUCT LEADERSHIP', title: 'Three departments shape complementary digital experiences', leaders: [['Abdullah Almazyad','Digital Business','Borrower and business journeys · back-office platforms','abdullah.webp'],['Raghad','Digital Investors','Investor web and mobile experiences',null],['Raghad','Digital Experience','Cross-channel experience and design',null]], note: 'The three departments operate under CTO Shahram. Digital Investors and Digital Experience currently share employees.' },
  { id: 'digital-business', type: 'scope', eyebrow: 'DIGITAL BUSINESS', title: 'We own the business journeys and the platforms behind them', channels: ['Business web & mobile','Buyer and supplier channels','Embedded distribution'], platforms: ['CRM','CLM','LOS','LMS','Admin & back office'], owner: 'Abdullah Almazyad · Product Director' },
  { id: 'platforms', type: 'platform-map', eyebrow: 'THE DIGITAL LANDSCAPE', title: 'A customer experience is only as strong as the platforms behind it', layers: [['Experience','Business web · mobile · embedded · buyer · supplier'],['Decisioning','CRM · CLM · credit assessment · documentation'],['Origination','LOS · workflows · approvals · agreements'],['Servicing','LMS · disbursement · repayment · collections'],['Operations','Admin · reporting · audit trails · integrations']] },
  { id: 'delivery', type: 'delivery', eyebrow: 'FROM NEED TO PRODUCTION', title: 'Trace every delivery item back to the original demand', steps: [['Digital Factory','The business need enters as a demand.'],['Discover','Clarify the outcome, scope, users and dependencies.'],['Define','Use a BRD when the solution needs structured depth.'],['Deliver','Create linked Jira work in Borrower, Embedded, Admin or Investor projects.'],['Validate','Review, test, release and learn from the result.']] },

  { id: 'meet-team', type: 'section-break', chapter: '04', eyebrow: 'MEET YOUR TEAM', title: 'Digital Business is your home inside the wider organization', body: 'The people and complementary crafts shaping business journeys and internal platforms.' },
  { id: 'team-one', type: 'team-portraits', eyebrow: 'DIGITAL BUSINESS TEAM · 1 OF 2', title: 'Know the person—and the context they carry', people: [['Abdullah Almazyad','Product Director','abdullah.webp','m'],['Mohammed Alghofaily','Product Lead / UX',null,'m'],['Fahad Aldossari','Product Lead',null,'m'],['Bandar Alarifi','Product Lead',null,'m'],['Alma Alfowzan','Business Analyst',null,'f'],['Mohammed Alasaker','Business Analyst',null,'m']] },
  { id: 'team-two', type: 'team-portraits', eyebrow: 'DIGITAL BUSINESS TEAM · 2 OF 2', title: 'Every name is a door to a different kind of knowledge', people: [['Noura Aljmhoor','Business Analyst',null,'f'],['Danah Alsuhaibani','Business Analyst',null,'f'],['Norah Alahmed','Business Analyst',null,'f'],['Abdulwahab Alghamdi','Business Analyst',null,'m'],['Najla Alharthi','UX/UI Designer',null,'f'],['Nouf Alkernass','UX/UI Designer',null,'f']] },
  { id: 'craft', type: 'craft', eyebrow: 'ONE TEAM · COMPLEMENTARY CRAFTS', title: 'Business analysis and design connect business intent to a usable outcome', ba: ['Frame the problem and business rules','Make data, exceptions and acceptance testable','Maintain traceability through delivery'], ux: ['Represent user needs and usability','Create flows, prototypes and interface designs','Review the implemented experience'], shared: 'Understand → explore → align → deliver → learn' },
]

const accentClass = value => value ? ` accent-${value}` : ''

function Logo({ inverse = false }) {
  return <img className={`logo${inverse ? ' logo--inverse' : ''}`} src={`${A}manafa-logo.svg`} alt="Manafa" />
}

function SlideChrome({ slide, index, total, dark = false }) {
  return <>
    <div className="slide-kicker">{slide.eyebrow}</div>
    <Logo inverse={dark} />
    <div className="slide-number">{String(index + 1).padStart(2,'0')} / {total}</div>
  </>
}

function Header({ slide }) {
  return <header className="slide-header"><h1>{slide.title}</h1>{slide.subtitle && <p>{slide.subtitle}</p>}</header>
}

function SourceButton({ slide, onOpen }) {
  if (!slide.sources?.length) return null
  return <button className="source-button" onClick={onOpen}>Sources</button>
}

function PersonPlaceholder({ gender = 'm' }) {
  return <div className={`person-placeholder person-placeholder--${gender}`}><UserRound /></div>
}

function PersonImage({ src, name, gender }) {
  return src ? <img src={`${A}${src}`} alt={name} /> : <PersonPlaceholder gender={gender} />
}

function RenderSlide({ slide, index, total, onSources }) {
  if (slide.type === 'cover') return <section className="slide slide--cover"><Logo /><div className="cover-copy"><h1>{slide.title}</h1><div className="title-rule" /><p>{slide.subtitle}</p></div><div className="cover-meta">{slide.meta}</div><div className="slide-number">01 / {total}</div></section>

  if (slide.type === 'section-break') return <section className="slide slide--section-break slide--dark"><Logo inverse/><div className="section-break-number">{slide.chapter}</div><div className="section-break-copy"><span>{slide.eyebrow}</span><h1>{slide.title}</h1><p>{slide.body}</p></div><div className="slide-number">{String(index + 1).padStart(2,'0')} / {total}</div></section>

  const dark = slide.dark || ['photo-full','tech-bridge'].includes(slide.type)
  return <section className={`slide slide--${slide.type}${dark ? ' slide--dark' : ''}${accentClass(slide.accent)}`}>
    <SlideChrome slide={slide} index={index} total={total} dark={dark} />
    {slide.type !== 'photo-full' && <Header slide={slide} />}

    {slide.type === 'statement' && <div className="statement-copy"><p>{slide.body}</p><div className="statement-line" /></div>}

    {slide.type === 'journey-map' && <div className="journey-map">{slide.items.map(([n,t,b])=><article key={n}><span>{n}</span><h2>{t}</h2><p>{b}</p></article>)}</div>}

    {slide.type === 'brand-hero' && <div className="brand-hero"><div><img src={`${A}${slide.logo}`} alt="Manafa" /><p>{slide.body}</p></div><div className="brand-orbit"><span>Companies</span><span>Funders</span><span>Investors</span><strong>Growth</strong></div></div>}

    {slide.type === 'scene-triptych' && <div className="scene-triptych">{slide.scenes.map(([img,t,b])=><figure key={t}><img src={`${A}${img}`} alt="" /><figcaption><h2>{t}</h2><p>{b}</p></figcaption></figure>)}</div>}

    {slide.type === 'ecosystem' && <div className="ecosystem"><div className="ecosystem-center">{slide.center}</div>{slide.actors.map(([name,Icon],i)=><article key={name} style={{'--i':i}}><Icon/><span>{name}</span></article>)}<p>{slide.footer}</p></div>}

    {slide.type === 'timeline' && <div className="timeline">{slide.points.map(([year,t,b],i)=><article key={`${year}-${t}`}><span>0{i+1}</span><strong>{year}</strong><h2>{t}</h2><p>{b}</p></article>)}</div>}

    {slide.type === 'media-proof' && <div className="media-proof"><img src={`${A}${slide.image}`} alt="Manafa regulatory milestones" style={{objectFit:slide.fit}}/><p>{slide.body}</p></div>}

    {slide.type === 'photo-moment' && <div className="photo-moment"><figure><img src={`${A}${slide.image}`} alt="" /></figure><div><strong>{slide.stat}</strong><p>{slide.body}</p></div></div>}

    {slide.type === 'photo-full' && <><img className="photo-full-bg" src={`${A}${slide.image}`} alt="Aramco SCF signing ceremony"/><div className="photo-full-shade"/><div className="photo-full-copy"><h1>{slide.title}</h1><p>{slide.body}</p></div></>}

    {slide.type === 'poster-moment' && <div className="poster-moment"><figure><img src={`${A}${slide.image}`} alt="Manafa SEC SCF announcement" /></figure><p>{slide.body}</p></div>}

    {slide.type === 'metrics' && <div className="metrics">{slide.metrics.map(([v,l])=><article key={l}><strong>{v}</strong><span>{l}</span></article>)}<p>{slide.note}</p></div>}

    {slide.type === 'group-map' && <div className="group-map">{slide.companies.map(([name,body,logo],i)=><article key={name} className={i===0?'core':''}>{logo?<img src={`${A}${logo}`} alt={name}/>:<div className="tech-wordmark">MT</div>}<h2>{name}</h2><p>{body}</p></article>)}</div>}

    {slide.type === 'company-pair' && <div className="company-pair">{slide.companies.map(c=><article key={c.name}><img src={`${A}${c.logo}`} alt={c.name}/><p>{c.body}</p></article>)}</div>}

    {slide.type === 'tech-bridge' && <div className="tech-bridge"><div><span>{slide.places[0]}</span><strong>Product decisions<br/>move with context</strong><span>{slide.places[1]}</span></div><p>{slide.body}</p></div>}

    {slide.type === 'partner-wall' && <div className="partner-wall"><figure><img src={`${A}${slide.image}`} alt="Manafa investors and institutional partners"/></figure><p>{slide.body}</p></div>}

    {slide.type === 'journey-photo' && <div className="journey-photo"><figure><img src={`${A}${slide.image}`} alt=""/></figure><ol>{slide.steps.map((s,i)=><li key={s}><span>0{i+1}</span>{s}</li>)}</ol></div>}

    {slide.type === 'product-overview' && <div className="product-overview">{slide.products.map(([n,name,icon])=><article key={name}><span>{n}</span><img src={`${A}${icon}`} alt=""/><h2>{name}</h2></article>)}<p>{slide.note}</p></div>}

    {slide.type === 'product-feature' && <div className="product-feature"><div className="product-icon"><span>{slide.number}</span><img src={`${A}${slide.icon}`} alt="" /></div><div className="product-copy"><h2>{slide.phrase}</h2><div><small>THE MOMENT</small><p>{slide.scenario}</p></div><div><small>WHAT THE PRODUCT ENABLES</small><p>{slide.outcome}</p></div></div></div>}

    {slide.type === 'process' && <div className="process">{slide.steps.map(([n,t,b])=><article key={n}><span>{n}</span><h2>{t}</h2><p>{b}</p></article>)}</div>}

    {slide.type === 'org' && <div className="org">{slide.leaders.map(([name,dept,body,img],i)=><article key={`${name}-${dept}`}><PersonImage src={img} name={name} gender={i?'f':'m'}/><div><span>{dept}</span><h2>{name}</h2><p>{body}</p></div></article>)}<p>{slide.note}</p></div>}

    {slide.type === 'scope' && <div className="scope"><div className="scope-owner"><PersonImage src="abdullah.webp" name="Abdullah Almazyad"/><div><strong>{slide.owner}</strong><p>Business and borrower experiences · products and platforms serving every financing line</p></div></div><div className="scope-columns"><article><span>CHANNELS</span>{slide.channels.map(x=><p key={x}>{x}</p>)}</article><article><span>PLATFORMS</span>{slide.platforms.map(x=><p key={x}>{x}</p>)}</article></div></div>}

    {slide.type === 'platform-map' && <div className="platform-map">{slide.layers.map(([name,body],i)=><article key={name}><span>0{i+1}</span><h2>{name}</h2><p>{body}</p></article>)}</div>}

    {slide.type === 'stakeholders' && <div className="stakeholders">{slide.groups.map(([verb,...names],i)=><article key={verb}><span>0{i+1}</span><h2>{verb}</h2><div>{names.map(n=><p key={n}>{n}</p>)}</div></article>)}</div>}

    {slide.type === 'portraits' && <div className="portraits">{slide.people.map(([name,role,img])=><article key={name}><PersonImage src={img} name={name}/><h2>{name}</h2><p>{role}</p></article>)}</div>}

    {slide.type === 'team-portraits' && <div className="team-portraits">{slide.people.map(([name,role,img,gender])=><article key={name}><PersonImage src={img} name={name} gender={gender}/><div><h2>{name}</h2><p>{role}</p></div></article>)}</div>}

    {slide.type === 'delivery' && <div className="delivery">{slide.steps.map(([name,body],i)=><article key={name}><span>0{i+1}</span><h2>{name}</h2><p>{body}</p>{i<slide.steps.length-1&&<ChevronRight/>}</article>)}</div>}

    {slide.type === 'craft' && <div className="craft"><article><FileText/><h2>Business Analysis</h2>{slide.ba.map(x=><p key={x}><Check/>{x}</p>)}</article><article><PanelTop/><h2>UX/UI Design</h2>{slide.ux.map(x=><p key={x}><Check/>{x}</p>)}</article><strong>{slide.shared}</strong></div>}

    <SourceButton slide={slide} onOpen={onSources}/>
  </section>
}

function App() {
  const [current,setCurrent] = useState(()=>{const hash=location.hash.replace('#','');const i=slides.findIndex(s=>s.id===hash);return i>=0?i:0})
  const [overview,setOverview] = useState(false)
  const [sourceSlide,setSourceSlide] = useState(null)
  const touchStart = useRef(null)
  const go = useCallback(next=>{const bounded=Math.max(0,Math.min(slides.length-1,next));setCurrent(bounded);history.replaceState(null,'',`#${slides[bounded].id}`)},[])

  useEffect(()=>{
    const hashChange=()=>{const i=slides.findIndex(s=>s.id===location.hash.replace('#',''));if(i>=0)setCurrent(i)}
    const key=e=>{if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();go(current+1)}if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();go(current-1)}if(e.key==='Home')go(0);if(e.key==='End')go(slides.length-1);if(e.key.toLowerCase()==='o')setOverview(v=>!v);if(e.key==='Escape'){setOverview(false);setSourceSlide(null)}}
    addEventListener('hashchange',hashChange);addEventListener('keydown',key)
    return()=>{removeEventListener('hashchange',hashChange);removeEventListener('keydown',key)}
  },[current,go])

  const onTouchStart=e=>{touchStart.current=e.changedTouches[0].clientX}
  const onTouchEnd=e=>{if(touchStart.current==null)return;const d=e.changedTouches[0].clientX-touchStart.current;if(Math.abs(d)>50)go(current+(d<0?1:-1));touchStart.current=null}
  const progress=useMemo(()=>((current+1)/slides.length)*100,[current])

  return <main className="deck" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
    <div className="stage"><RenderSlide slide={slides[current]} index={current} total={slides.length} onSources={()=>setSourceSlide(slides[current])}/></div>
    <nav className="deck-controls" aria-label="Presentation controls"><button onClick={()=>setOverview(true)} aria-label="Open slide overview"><Menu/></button><button onClick={()=>go(current-1)} disabled={current===0} aria-label="Previous slide"><ArrowLeft/></button><div className="progress" aria-label={`Slide ${current+1} of ${slides.length}`}><span style={{width:`${progress}%`}}/></div><button onClick={()=>go(current+1)} disabled={current===slides.length-1} aria-label="Next slide"><ArrowRight/></button><button onClick={()=>document.documentElement.requestFullscreen?.()} aria-label="Enter full screen"><Expand/></button></nav>
    {overview&&<div className="overlay" role="dialog" aria-modal="true" aria-label="Slide overview"><div className="overlay-header"><div><Presentation/><h2>Onboarding overview</h2></div><button onClick={()=>setOverview(false)} aria-label="Close slide overview"><X/></button></div><div className="overview-grid">{slides.map((s,i)=><button key={s.id} className={i===current?'active':''} onClick={()=>{go(i);setOverview(false)}}><span>{String(i+1).padStart(2,'0')}</span><p>{s.title}</p></button>)}</div></div>}
    {sourceSlide&&<div className="overlay source-overlay" role="dialog" aria-modal="true" aria-label="Sources"><div className="overlay-header"><div><BookOpen/><h2>Sources — {sourceSlide.title}</h2></div><button onClick={()=>setSourceSlide(null)} aria-label="Close sources"><X/></button></div><div className="source-list">{sourceSlide.sources.map(([label,url])=><a key={url} href={url} target="_blank" rel="noreferrer"><span>{label}</span><ChevronRight/></a>)}</div></div>}
  </main>
}

createRoot(document.getElementById('root')).render(<App/>)
