export const brand = {
  name: 'Smartech Synergys',
  short: 'Smartech',
  tagline: 'Professional IT Support & Tech Solutions for Your Business',
  phone: '+60 11-2313 0680',
  phoneRaw: '+601123130680',
  whatsapp: 'https://wa.me/601123130680',
  email: 'smartech.it.store@gmail.com',
  address: 'Suite 450, Level 3A, Sunway Visio Tower, Lingkaran SV, Sunway Velocity, 55100 Kuala Lumpur',
  base: 'Cheras, Kuala Lumpur',
}

export const nav = [
  { label: 'Home', href: '#top' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Maintenance', href: '#maintenance' },
  { label: 'Products', href: '#products' },
  { label: 'Process', href: '#process' },
  { label: 'Coverage', href: '#coverage' },
  { label: 'FAQ', href: '#faq' },
]

export const highlights = [
  { k: '24h', v: 'Response guaranteed' },
  { k: 'On-site', v: 'During & after hours' },
  { k: 'Clear', v: 'Competitive, upfront pricing' },
  { k: 'KL + SEL', v: 'Full Klang Valley coverage' },
]

export const marqueeA = ['PC Repair', 'Laptop Repair', 'Phone Repair', 'Custom Builds', 'On-Site Service', 'Office Setup', 'SSD & RAM Upgrades']
export const marqueeB = ['Fast Diagnosis', 'Quality Checked', 'Verified Suppliers', '24h Response', 'No Overhead', 'Klang Valley']

export const problems = [
  {
    id: 'slow-computers',
    n: '01',
    category: 'Performance',
    t: 'Slow or outdated PCs',
    symptom: 'Slow startup, freezing, noisy fans, or apps taking too long to open.',
    impact: 'Minutes are lost every day and simple work keeps getting interrupted.',
    solution: 'We identify the cause of the slowdown, then repair, tune or upgrade only what will improve performance.',
    d: 'Slow PCs turn routine work into waiting. We find the cause of the slowdown and fix only what improves performance.',
    image: '/problems-real/slow-outdated-pc.jpg?v=7',
    imagePosition: 'center 46%',
  },
  {
    id: 'hardware-breakdowns',
    n: '02',
    category: 'Hardware',
    t: 'Unexpected hardware breakdowns',
    symptom: 'Random shutdowns, overheating, charging problems, or unusual sounds.',
    impact: 'A small fault can become a sudden failure and stop the device completely.',
    solution: 'We diagnose the fault and recommend the most practical repair or replacement.',
    d: 'A failed device can stop essential work without warning. We diagnose it and recommend the practical next step.',
    image: '/problems-real/hardware-breakdown.jpg',
    imagePosition: 'center center',
  },
  {
    id: 'software-errors',
    n: '03',
    category: 'Software',
    t: 'Software issues & system errors',
    symptom: 'Repeated pop-ups, crashes, failed updates, or the same error returning.',
    impact: 'Unsaved work, repeated restarts, and less confidence in the device.',
    solution: 'We identify the root cause, stabilise the system and help prevent the issue from returning.',
    d: 'Recurring crashes create lost work and repeated interruptions. We fix the root cause, not only the symptom.',
    image: '/problems-real/software-errors.jpg',
    imagePosition: 'center 42%',
  },
  {
    id: 'device-supplier',
    n: '04',
    category: 'Device supply',
    t: 'No trusted device supplier',
    symptom: 'You are unsure which model, specification, or supplier you can trust.',
    impact: 'The wrong device can cost more, perform poorly, or need replacing too soon.',
    solution: 'We source tested devices matched to your needs, workload and budget.',
    d: 'The wrong equipment costs more and underperforms. We source tested devices that fit the work and the budget.',
    image: '/problems-real/device-supplier.jpg',
    imagePosition: 'center 48%',
  },
  {
    id: 'it-support',
    n: '05',
    category: 'IT assistance',
    t: 'No dedicated IT support',
    symptom: 'Small tech problems keep returning and there is no reliable person to call.',
    impact: 'Simple issues take longer to solve and repeatedly interrupt your day.',
    solution: 'We provide on-site troubleshooting, repairs and setup support when you need help.',
    d: 'Without dependable IT support, small issues become downtime. We provide practical on-site support when you need it.',
    image: '/problems-real/it-support.jpg?v=5',
    imagePosition: 'center center',
  },
]

export const services = [
  {
    n: '01',
    t: 'Hardware & Software Repair',
    d: 'Fast, accurate diagnosis and repair for PCs, laptops and smartphones from failed components to stubborn OS errors.',
    tags: ['PC', 'Laptop', 'Smartphone'],
    icon: 'repair',
    tone: 'sun',
  },
  {
    n: '02',
    t: 'PC Upgrades & Maintenance',
    d: 'RAM and SSD upgrades, deep system cleaning and performance tuning that breathe new life into ageing machines.',
    tags: ['RAM', 'SSD', 'Tune-up'],
    icon: 'upgrade',
    tone: 'volt',
  },
  {
    n: '03',
    t: 'Office PC & Device Setup',
    d: 'We supply, configure and deploy office-ready workstations so your team can log in and start working on day one.',
    tags: ['Supply', 'Configure', 'Deploy'],
    icon: 'office',
    tone: 'paper',
  },
  {
    n: '04',
    t: 'Custom PC Builds',
    d: 'Machines built precisely to spec for gaming, creative workstations or raw performance, tested before handover.',
    tags: ['Gaming', 'Workstation', 'Performance'],
    icon: 'build',
    tone: 'sun',
  },
  {
    n: '05',
    t: 'On-Site IT Support',
    d: 'Our technicians come to your office, home or business premises  during working hours and after.',
    tags: ['Office', 'Home', 'Business'],
    icon: 'onsite',
    tone: 'volt',
  },
]

export const maintenanceServices = [
  {
    n: '01',
    t: 'Annual PC servicing',
    d: 'Full internal dust cleaning, fan lubrication, thermal check, airflow testing and comprehensive hardware health diagnostics.',
    tag: 'Preventive Care',
    icon: 'repair',
  },
  {
    n: '02',
    t: 'SSD upgrades',
    d: 'High-speed NVMe and SATA SSD installations with seamless OS cloning and zero data loss for instant boot speeds.',
    tag: 'Storage Speed',
    icon: 'upgrade',
  },
  {
    n: '03',
    t: 'RAM upgrades',
    d: 'Memory capacity expansion to eliminate system lag and allow effortless multitasking across demanding office applications.',
    tag: 'Multitasking',
    icon: 'chip',
  },
  {
    n: '04',
    t: 'Thermal paste replacement',
    d: 'Application of premium high-conductivity thermal paste to stop CPU/GPU overheating, reduce fan noise, and prevent throttling.',
    tag: 'Thermal Control',
    icon: 'bolt',
  },
  {
    n: '05',
    t: 'Virus removal',
    d: 'Deep scanning and permanent eradication of malware, adware, spyware, and trojans with complete security hardening.',
    tag: 'Cyber Hygiene',
    icon: 'check',
  },
  {
    n: '06',
    t: 'Windows installation',
    d: 'Genuine, clean Windows OS installation with full chipset drivers, system security updates, and bloatware removal.',
    tag: 'OS Setup',
    icon: 'laptop',
  },
  {
    n: '07',
    t: 'Data backup',
    d: 'Secure automated local and cloud backup configurations safeguarding your vital business records, files, and accounting databases.',
    tag: 'Data Safety',
    icon: 'tower',
  },
  {
    n: '08',
    t: 'Software installation',
    d: 'Proper licensing deployment and configuration of essential business software, productivity suites, and specialized tools.',
    tag: 'App Deployment',
    icon: 'office',
  },
  {
    n: '09',
    t: 'Performance optimisation',
    d: 'System registry tuning, background service decluttering, startup app streamlining, and total responsiveness calibration.',
    tag: 'Peak Speed',
    icon: 'bolt',
  },
]

export const products = [
  { t: 'Laptops & Desktop PCs', icon: 'laptop' },
  { t: 'Monitors', icon: 'monitor' },
  { t: 'Smartphones', icon: 'phone' },
  { t: 'Custom-Built PCs', icon: 'tower' },
  { t: 'Keyboards, Mice & Accessories', icon: 'keyboard' },
  { t: 'Components & Peripherals', icon: 'chip' },
]

export const brands = ['Lenovo', 'Acer', 'Asus', 'HP', 'Dell', 'Samsung', 'Philips']

export const steps = [
  {
    t: 'Contact Us',
    before: 'Connect via phone, WhatsApp, or email — ',
    highlight: 'our technicians respond within 24 hours.',
    after: '',
  },
  {
    t: 'Free Consultation',
    before: 'We evaluate your setup and provide ',
    highlight: 'a clear, upfront recommendation',
    after: ' with zero obligation.',
  },
  {
    t: 'We Get It Done',
    before: 'We arrive on-site equipped to execute ',
    highlight: 'fast repairs, setups, or hardware delivery',
    after: ' without disruption.',
  },
  {
    t: 'Quality Check',
    before: 'Every device undergoes ',
    highlight: 'thorough diagnostics and testing',
    after: ' before we hand it over.',
  },
  {
    t: 'Follow Up',
    before: 'We follow through with ',
    highlight: 'dedicated post-service support',
    after: ' to ensure your office runs smoothly.',
  },
]

export const areas = ['Kuala Lumpur', 'Cheras', 'Petaling Jaya', 'Subang', 'Shah Alam', 'Ampang', 'Sunway', 'Puchong', 'Klang', 'Cyberjaya']

export const faqs = [
  {
    q: 'How do I arrange an on-site visit?',
    before: 'Contact us by WhatsApp or phone with your location and a brief description of the issue. We’ll ',
    highlight: 'confirm service availability and a suitable appointment',
    after: '.',
    tag: 'On-Site Visit',
  },
  {
    q: 'Can I arrange support outside office hours?',
    before: 'We offer ',
    highlight: 'on-site support during and after working hours',
    after: '. Contact us with your preferred timing so we can confirm availability.',
    tag: 'Flexible Hours',
  },
  {
    q: 'How much will my repair or service cost?',
    before: 'Costs depend on the issue, the work required and any replacement parts. Share your requirements so we can ',
    highlight: 'assess the scope and provide a quotation',
    after: '.',
    tag: 'Pricing & Quote',
  },
  {
    q: 'Do you supply both new and pre-owned computers?',
    before: 'Yes. We supply new and pre-owned laptops and desktops to suit different workloads and budgets. ',
    highlight: 'Every unit is tested and quality-checked before delivery',
    after: '.',
    tag: 'Device Supply',
  },
  {
    q: 'Can you set up computers for a new or expanding office?',
    before: 'Yes. We ',
    highlight: 'supply, configure and set up office computers and devices',
    after: '. Tell us your team size, software requirements and budget to discuss suitable options.',
    tag: 'Office Setup',
  },
  {
    q: 'Should I upgrade my computer or replace it?',
    before: 'That depends on its condition, specifications and the work you use it for. We ',
    highlight: 'assess your existing device and recommend whether maintenance, upgrades or replacement makes sense',
    after: '.',
    tag: 'Upgrade vs Replace',
  },
]
