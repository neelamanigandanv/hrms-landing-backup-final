import { FormEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";

type IconName =
  | "arrow"
  | "asset"
  | "attendance"
  | "branch"
  | "calendar"
  | "check"
  | "chevron"
  | "clock"
  | "document"
  | "download"
  | "employee"
  | "finance"
  | "globe"
  | "leave"
  | "loan"
  | "menu"
  | "payroll"
  | "reports"
  | "role"
  | "search"
  | "setup"
  | "shield"
  | "sparkle"
  | "upload"
  | "wallet"
  | "whatsapp"
  | "x";

const iconPaths: Record<IconName, ReactNode> = {
  arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
  asset: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M8 19v2m8-2v2M8 9h8" /></>,
  attendance: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  branch: <><path d="M4 20V9l8-5 8 5v11M8 20v-6h8v6M9 10h.01M15 10h.01" /></>,
  calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  chevron: <path d="m9 18 6-6-6-6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l4 2" /></>,
  document: <><path d="M6 3h8l4 4v14H6z" /><path d="M14 3v5h4M9 13h6M9 17h6" /></>,
  download: <><path d="M12 3v12m0 0 4-4m-4 4-4-4M5 21h14" /></>,
  employee: <><circle cx="9" cy="8" r="3" /><path d="M3 20c0-4 2-7 6-7s6 3 6 7M16 7h5M18.5 4.5v5" /></>,
  finance: <><rect x="3" y="5" width="18" height="15" rx="2" /><path d="M3 10h18M7 15h2" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></>,
  leave: <><path d="M5 20c8 0 14-5 14-14-9 0-14 5-14 14Z" /><path d="M5 20c3-5 6-7 10-10" /></>,
  loan: <><path d="M3 9h18M5 9v9m4-9v9m6-9v9m4-9v9M3 21h18M12 3l9 4H3z" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  payroll: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 7h8M8 11h2m4 0h2M8 15h2m4 0h2" /></>,
  reports: <><path d="M4 20V10m5 10V4m6 16v-7m5 7V7" /></>,
  role: <><circle cx="8" cy="8" r="3" /><circle cx="17" cy="9" r="2" /><path d="M2 20c0-4 2-7 6-7s6 3 6 7M15 14c4 0 6 2 6 6" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  setup: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.8 1.8 0 0 0 .4 2l.1.1-2.8 2.8-.1-.1a1.8 1.8 0 0 0-2-.4 1.8 1.8 0 0 0-1.1 1.6v.2h-4V21A1.8 1.8 0 0 0 9 19.4a1.8 1.8 0 0 0-2 .4l-.1.1-2.8-2.8.1-.1a1.8 1.8 0 0 0 .4-2A1.8 1.8 0 0 0 3 13.9h-.2v-4H3A1.8 1.8 0 0 0 4.6 9a1.8 1.8 0 0 0-.4-2l-.1-.1 2.8-2.8.1.1a1.8 1.8 0 0 0 2 .4A1.8 1.8 0 0 0 10.1 3v-.2h4V3a1.8 1.8 0 0 0 .9 1.6 1.8 1.8 0 0 0 2-.4l.1-.1 2.8 2.8-.1.1a1.8 1.8 0 0 0-.4 2 1.8 1.8 0 0 0 1.6 1.1h.2v4H21a1.8 1.8 0 0 0-1.6.9Z" /></>,
  shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-5" /></>,
  sparkle: <><path d="m12 3 1.3 3.7L17 8l-3.7 1.3L12 13l-1.3-3.7L7 8l3.7-1.3L12 3ZM5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8L5 15ZM19 13l.8 2.2L22 16l-2.2.8L19 19l-.8-2.2L16 16l2.2-.8L19 13Z" /></>,
  upload: <><path d="M12 16V4m0 0L8 8m4-4 4 4M4 20h16" /></>,
  wallet: <><path d="M4 6h14a2 2 0 0 1 2 2v11H4a2 2 0 0 1-2-2V7a3 3 0 0 1 3-3h12" /><path d="M16 12h4v4h-4a2 2 0 0 1 0-4Z" /></>,
  whatsapp: <><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4.1Z" /><path d="M8.2 7.7c.2-.4.4-.4.7-.4h.4l1 2.3c.1.3 0 .5-.2.7l-.7.8c.8 1.6 2 2.7 3.7 3.5l.8-1c.2-.2.4-.3.7-.2l2.2 1c.3.1.4.3.4.6 0 .8-.4 1.5-1.1 1.8-.7.4-1.7.5-2.8.2-1.7-.5-3.5-1.6-5-3.2-1.4-1.5-2.3-3.1-2.5-4.3-.2-.8.1-1.4.4-1.8Z" /></>,
  x: <path d="m6 6 12 12M18 6 6 18" />,
};

function Icon({ name, size = 20, className = "" }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {iconPaths[name]}
    </svg>
  );
}

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#" className={`logo ${light ? "logo-light" : ""}`} aria-label="LattiumHR home">
      <span className="logo-mark">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="6.5" fill="var(--indigo)" />
          <rect x="5.5" y="5.5" width="5" height="5" rx="1.5" fill="white" />
          <rect x="13.5" y="5.5" width="5" height="5" rx="1.5" fill="white" fillOpacity="0.8" />
          <rect x="5.5" y="13.5" width="5" height="5" rx="1.5" fill="white" fillOpacity="0.8" />
          <rect x="13.5" y="13.5" width="5" height="5" rx="1.5" fill="white" />
        </svg>
      </span>
      <span className="logo-text">
        Lattium<span>HR</span>
      </span>
    </a>
  );
}

function Button({ children, href = "#demo", secondary = false, className = "" }: { children: ReactNode; href?: string; secondary?: boolean; className?: string }) {
  return <a className={`btn ${secondary ? "btn-secondary" : ""} ${className}`} href={href}>{children}</a>;
}

function SectionHeading({ eyebrow, title, body, center = false }: { eyebrow: string; title: string; body?: string; center?: boolean }) {
  return (
    <div className={`section-heading ${center ? "center" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}

function DemoForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    employees: "",
  });
  const [errors, setErrors] = useState<{ [K in keyof typeof formData]?: string }>({});
  const [touched, setTouched] = useState<{ [K in keyof typeof formData]?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateField = (field: keyof typeof formData, value: string): string => {
    const trimmed = value.trim();
    switch (field) {
      case "name":
        if (!trimmed) return "Name is required";
        if (trimmed.length < 2) return "Enter your full name";
        if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) return "Letters only";
        return "";
      case "email":
        if (!trimmed) return "Work email is required";
        if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(trimmed)) return "Enter a valid email address";
        return "";
      case "phone": {
        const digits = trimmed.replace(/\D/g, "");
        if (!digits) return "Phone number is required";
        if (digits.length < 10) return "Min 10 digits required";
        return "";
      }
      case "employees":
        if (!value) return "Please select team size";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleBlur = (field: keyof typeof formData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newErrors: { [K in keyof typeof formData]?: string } = {};
    (Object.keys(formData) as (keyof typeof formData)[]).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    setTouched({ name: true, email: true, phone: true, employees: true });
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSent(true);
    }, 400);
  };

  const handleReset = () => {
    setFormData({ name: "", email: "", phone: "", employees: "" });
    setErrors({});
    setTouched({});
    setSent(false);
  };

  if (sent) {
    return (
      <div className={`demo-form ${compact ? "compact" : ""}`}>
        <div className="demo-success-panel">
          <div className="demo-success-icon">
            <Icon name="check" size={24} />
          </div>
          <h3>Demo Request Received!</h3>
          <p>
            Thank you <strong>{formData.name}</strong>. Our product specialist will call you at{" "}
            <strong>{formData.phone}</strong> for your personalised walkthrough.
          </p>
          <button type="button" className="demo-success-reset" onClick={handleReset}>
            Book another demo
          </button>
        </div>
      </div>
    );
  }

  return (
    <form className={`demo-form ${compact ? "compact" : ""} ${isSubmitting ? "form-submitting" : ""}`} onSubmit={handleSubmit} noValidate>
      {!compact && (
        <div className="form-title">
          <span><Icon name="sparkle" size={18} /></span>
          <div>
            <strong>See LattiumHR in action</strong>
            <small>Get a personalised 30-min walkthrough</small>
          </div>
        </div>
      )}
      <div className="form-grid">
        <label>
          <span>Name</span>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            className={errors.name && touched.name ? "has-error" : ""}
            placeholder="Your full name"
            aria-invalid={Boolean(errors.name && touched.name)}
          />
          {errors.name && touched.name && (
            <span className="field-error">
              <Icon name="x" size={11} /> {errors.name}
            </span>
          )}
        </label>
        <label>
          <span>Work email</span>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            className={errors.email && touched.email ? "has-error" : ""}
            placeholder="you@company.com"
            aria-invalid={Boolean(errors.email && touched.email)}
          />
          {errors.email && touched.email && (
            <span className="field-error">
              <Icon name="x" size={11} /> {errors.email}
            </span>
          )}
        </label>
        <label>
          <span>Phone</span>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            className={errors.phone && touched.phone ? "has-error" : ""}
            placeholder="+91 98765 43210"
            aria-invalid={Boolean(errors.phone && touched.phone)}
          />
          {errors.phone && touched.phone && (
            <span className="field-error">
              <Icon name="x" size={11} /> {errors.phone}
            </span>
          )}
        </label>
        <label>
          <span>Employees</span>
          <select
            value={formData.employees}
            onChange={(e) => handleChange("employees", e.target.value)}
            onBlur={() => handleBlur("employees")}
            className={errors.employees && touched.employees ? "has-error" : ""}
            aria-invalid={Boolean(errors.employees && touched.employees)}
          >
            <option value="" disabled>Select team size</option>
            <option value="1-50">1 – 50</option>
            <option value="51-200">51 – 200</option>
            <option value="201-500">201 – 500</option>
            <option value="500+">500+</option>
          </select>
          {errors.employees && touched.employees && (
            <span className="field-error">
              <Icon name="x" size={11} /> {errors.employees}
            </span>
          )}
        </label>
      </div>
      <button type="submit" className="btn form-submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Book a Demo"}
      </button>
      {!compact && (
        <small className="privacy">
          <Icon name="shield" size={14} /> Your details are safe with us. No spam.
        </small>
      )}
    </form>
  );
}

const people = [
  ["AK", "Ananya Kapoor", "Product Design", "Present"],
  ["RM", "Rohan Mehta", "Sales", "Present"],
  ["PS", "Priya Shah", "Finance", "On leave"],
  ["VN", "Vikram Nair", "Engineering", "Present"],
];

function PeopleMockup() {
  return (
    <div className="mockup people-mockup">
      <div className="mock-top"><div><small>Good morning, Kavya</small><strong>People overview</strong></div><span className="mock-avatar">KS</span></div>
      <div className="mock-stats">
        <div><span className="stat-icon purple"><Icon name="employee" /></span><small>Total employees</small><strong>248</strong><em>+12 this month</em></div>
        <div><span className="stat-icon orange"><Icon name="attendance" /></span><small>Present today</small><strong>221</strong><em>89% attendance</em></div>
        <div><span className="stat-icon green"><Icon name="leave" /></span><small>On leave</small><strong>08</strong><em>3 pending</em></div>
      </div>
      <div className="mock-table">
        <div className="table-head"><strong>Employee directory</strong><span><Icon name="search" size={15} /> Search people</span></div>
        {people.map((p, i) => <div className="person-row" key={p[1]}><span className={`person-avatar a${i}`}>{p[0]}</span><span><strong>{p[1]}</strong><small>{p[2]}</small></span><em className={p[3] === "On leave" ? "away" : ""}>{p[3]}</em><b>•••</b></div>)}
      </div>
    </div>
  );
}

function LeaveMockup() {
  return (
    <div className="mockup phone-stage">
      <div className="mobile-card">
        <div className="mobile-head"><Logo /><span className="person-avatar a0">AK</span></div>
        <small>Welcome back, Ananya</small><h3>What would you like to do?</h3>
        <div className="quick-actions">
          <span><b><Icon name="clock" /></b>Clock in</span><span><b><Icon name="leave" /></b>Apply leave</span><span><b><Icon name="wallet" /></b>Payslip</span><span><b><Icon name="finance" /></b>Claim</span>
        </div>
        <div className="location-card"><span><Icon name="attendance" /></span><div><small>Today’s attendance</small><strong>09:24 AM · Mumbai HQ</strong></div><em>On time</em></div>
        <div className="balance-row"><div><small>Casual leave</small><strong>8.0 days</strong><i><span /></i></div><div><small>Earned leave</small><strong>14.5 days</strong><i><span /></i></div></div>
      </div>
      <div className="float-note note-one"><span><Icon name="check" /></span><div><small>Attendance marked</small><strong>Within office location</strong></div></div>
      <div className="float-note note-two"><span><Icon name="document" /></span><div><small>March payslip</small><strong>Ready to download</strong></div></div>
    </div>
  );
}

function ManagerMockup() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  return (
    <div className="mockup manager-mockup">
      <div className="mock-top"><div><small>Team workspace</small><strong>Attendance & approvals</strong></div><span className="filter-pill">This week⌄</span></div>
      <div className="team-summary"><div><strong>92%</strong><small>Team attendance</small></div><div className="mini-bars">{[74, 90, 83, 96, 88, 42, 25].map((h, i) => <i key={i} style={{ height: `${h}%` }} className={i > 4 ? "weekend" : ""} />)}</div></div>
      <div className="week-row">{days.map((d, i) => <span key={i}>{d}<b className={i === 2 ? "current" : ""}>{12 + i}</b></span>)}</div>
      <div className="approval-card"><div><span className="person-avatar a2">PS</span><div><strong>Priya Shah</strong><small>Casual leave · 2 days</small></div><em>Pending</em></div><p>18 Mar – 19 Mar <span>•</span> Family event</p><div><button>Decline</button><button>Approve</button></div></div>
      <div className="approval-card small"><div><span className="person-avatar a1">RM</span><div><strong>Rohan Mehta</strong><small>Reimbursement · ₹2,450</small></div><em>Pending</em></div></div>
    </div>
  );
}

function PayrollMockup() {
  return (
    <div className="mockup payroll-mockup">
      <div className="mock-top"><div><small>Payroll</small><strong>March 2025</strong></div><span className="filter-pill"><Icon name="download" size={14} /> Export</span></div>
      <div className="payroll-total"><small>Net payroll</small><strong>₹28,42,650</strong><span><Icon name="check" size={14} /> Inputs verified</span></div>
      <div className="payroll-breakdown">
        <div><span>Gross pay</span><strong>₹34.8L</strong><i><b style={{ width: "86%" }} /></i></div>
        <div><span>Deductions</span><strong>₹6.4L</strong><i><b style={{ width: "35%" }} /></i></div>
        <div><span>Net pay</span><strong>₹28.4L</strong><i><b style={{ width: "72%" }} /></i></div>
      </div>
      <div className="payroll-progress"><div><span className="done"><Icon name="check" /></span><small>Inputs</small></div><i /><div><span className="done"><Icon name="check" /></span><small>Calculate</small></div><i /><div><span>3</span><small>Review</small></div><i /><div><span>4</span><small>Publish</small></div></div>
      <button className="run-payroll">Review & run payroll <Icon name="arrow" /></button>
    </div>
  );
}

function CEOMockup() {
  const branches = [["Mumbai HQ", "96%", "128"], ["Bengaluru", "93%", "72"], ["Delhi NCR", "88%", "48"]];
  return (
    <div className="mockup ceo-mockup">
      <div className="mock-top"><div><small>Company overview</small><strong>All branches</strong></div><span className="filter-pill">Last 30 days⌄</span></div>
      <div className="ceo-grid">
        <div className="growth-card"><small>Workforce growth</small><strong>248 <em>+8.4%</em></strong><div className="line-chart"><svg viewBox="0 0 300 85" preserveAspectRatio="none"><path d="M0 67 C40 58 55 70 88 48 S138 53 170 30 S235 42 300 8" /><path className="area" d="M0 67 C40 58 55 70 88 48 S138 53 170 30 S235 42 300 8 V85 H0Z" /></svg></div></div>
        <div className="donut-card"><small>Attendance</small><div className="donut"><strong>92%<small>Average</small></strong></div></div>
      </div>
      <div className="branch-list"><strong>Branch performance</strong>{branches.map((b, i) => <div key={b[0]}><span className={`branch-dot b${i}`}><Icon name="branch" size={15} /></span><span><b>{b[0]}</b><small>{b[2]} employees</small></span><em>{b[1]} <small>attendance</small></em></div>)}</div>
    </div>
  );
}

const roleSections = [
  { role: "FOR HR TEAMS", title: "Centralise Your Workforce", body: "One reliable place for every employee record, document, and lifecycle moment — from joining to exit.", bullets: ["Searchable employee directory", "Bulk upload employee records", "Guided digital onboarding", "Documents & asset tracking"], mock: <PeopleMockup /> },
  { role: "FOR EMPLOYEES", title: "Self-Service That Actually Works", body: "Give your people the freedom to handle everyday HR tasks from anywhere, on any device.", bullets: ["Apply and track leave", "Geo-fenced attendance", "Download payslips instantly", "Submit reimbursements"], mock: <LeaveMockup /> },
  { role: "FOR MANAGERS", title: "Approve Faster. Lead Better.", body: "Everything managers need to see, decide, and keep their teams moving — without chasing HR.", bullets: ["Live team attendance", "One-click leave approvals", "Smart approval workflows", "Team calendars & insights"], mock: <ManagerMockup /> },
  { role: "FOR FINANCE", title: "Run Payroll in Minutes", body: "Bring every payroll input together and eliminate spreadsheet errors with accurate, automated calculations.", bullets: ["Unified payroll inputs", "Automatic calculations", "Statutory-ready reports", "One-click digital payslips"], mock: <PayrollMockup /> },
  { role: "FOR FOUNDERS & EXECUTIVES", title: "Scale Across Every Branch", body: "Get a clear view of your entire workforce and the insights to make confident decisions as you grow.", bullets: ["Branch-level dashboards", "Custom holiday calendars", "Company-wide workforce view", "Decision-ready reports"], mock: <CEOMockup /> },
];

function RoleSection({ item, index }: { item: typeof roleSections[number]; index: number }) {
  const badges = [
    ["12 new profiles", "Records synced"],
    ["Clocked in", "Payslip ready"],
    ["3 approvals", "Team on track"],
    ["Inputs verified", "Payroll ready"],
    ["All branches", "Live insights"],
  ];
  return (
    <section className={`role-section ${index % 2 ? "reverse" : ""}`}>
      <div className="container role-grid">
        <div className="role-copy">
          <span className="role-label"><span><Icon name={["employee", "role", "shield", "finance", "reports"][index] as IconName} /></span>{item.role}</span>
          <h2>{item.title}</h2><p>{item.body}</p>
          <ul>{item.bullets.map(x => <li key={x}><span><Icon name="check" size={14} /></span>{x}</li>)}</ul>
          <a href="#demo" className="text-link">Explore this workspace <Icon name="arrow" size={17} /></a>
        </div>
        <div className="role-visual">
          {item.mock}
          <span className="visual-badge badge-primary"><i><Icon name="check" size={12} /></i>{badges[index][0]}</span>
          <span className="visual-badge badge-secondary"><i><Icon name="sparkle" size={12} /></i>{badges[index][1]}</span>
        </div>
      </div>
      {index === 2 && <div className="container workflow"><small>SMART APPROVAL WORKFLOW</small><div>{["Employee", "Manager", "HR", "Finance"].map((x, i) => <div key={x}><span><Icon name={["employee", "role", "shield", "finance"][i] as IconName} /></span><strong>{x}</strong>{i < 3 && <Icon name="chevron" className="workflow-arrow" />}</div>)}</div></div>}
      {index === 3 && <div className="container formula"><small>EVERY INPUT, AUTOMATICALLY CONNECTED</small><div className="formula-flow"><div>{["Attendance", "Leave", "Loans", "Reimbursements"].map((x, i) => <span key={x}><Icon name={["attendance", "leave", "loan", "wallet"][i] as IconName} />{x}</span>)}</div><Icon name="arrow" className="formula-arrow" /><strong><Icon name="sparkle" />Auto Calculation</strong><Icon name="arrow" className="formula-arrow" /><em><Icon name="document" />Payslips</em></div></div>}
    </section>
  );
}

type ModuleCategory = "all" | "people" | "time" | "finance" | "ops";

interface ModuleData {
  id: string;
  icon: IconName;
  num: string;
  title: string;
  category: string;
  catGroup: ModuleCategory;
  desc: string;
  artType: number;
  features: string[];
}

const modulesData: ModuleData[] = [
  {
    id: "core-hr",
    icon: "employee",
    num: "01",
    title: "Core HR & Directory",
    category: "Workforce",
    catGroup: "people",
    desc: "Centralised employee records, department structures, and guided digital onboarding.",
    artType: 0,
    features: ["Org Hierarchy", "Employee Records", "Digital Onboarding"],
  },
  {
    id: "attendance",
    icon: "attendance",
    num: "02",
    title: "Attendance & Shifts",
    category: "Time Tracking",
    catGroup: "time",
    desc: "Touchless geo-fenced mobile clock-in, biometric terminal sync, and shift rosters.",
    artType: 2,
    features: ["Geo-Fencing", "Shift Rosters", "Biometric Sync"],
  },
  {
    id: "payroll",
    icon: "payroll",
    num: "03",
    title: "Automated Payroll",
    category: "Compensation",
    catGroup: "finance",
    desc: "1-click salary runs with automated PF, ESI, TDS statutory compliance and payslips.",
    artType: 0,
    features: ["1-Click Run", "PF & TDS Deductions", "Digital Payslips"],
  },
  {
    id: "leave",
    icon: "leave",
    num: "04",
    title: "Leave & Holidays",
    category: "Time Off",
    catGroup: "time",
    desc: "Custom leave quotas, sandwich policy rules, regional holidays, and fast manager approvals.",
    artType: 2,
    features: ["Leave Balances", "Holiday Calendars", "Manager Approvals"],
  },
  {
    id: "documents",
    icon: "document",
    num: "05",
    title: "Document Vault",
    category: "File Vault",
    catGroup: "ops",
    desc: "Encrypted digital repository for employment contracts, offer letters, and e-signatures.",
    artType: 0,
    features: ["e-Signatures", "Encrypted Vault", "KYC Repository"],
  },
  {
    id: "assets",
    icon: "asset",
    num: "06",
    title: "Asset Tracker",
    category: "Hardware",
    catGroup: "ops",
    desc: "Assign laptops, monitors, and equipment to team members with digital handover slips.",
    artType: 1,
    features: ["Equipment Handover", "Serial Log", "Return Slips"],
  },
  {
    id: "timesheets",
    icon: "calendar",
    num: "07",
    title: "Timesheets & Hours",
    category: "Billable Time",
    catGroup: "time",
    desc: "Log client project hours, task milestones, and streamline manager sign-offs for billing.",
    artType: 2,
    features: ["Project Hours", "Client Billing", "Manager Sign-off"],
  },
  {
    id: "expenses",
    icon: "finance",
    num: "08",
    title: "Reimbursements",
    category: "Expense Claims",
    catGroup: "finance",
    desc: "Snap receipts on mobile, route to managers, and reimburse directly with monthly payroll.",
    artType: 0,
    features: ["Receipt Uploads", "Approval Flow", "Payroll Payout"],
  },
  {
    id: "analytics",
    icon: "reports",
    num: "09",
    title: "People Analytics",
    category: "Intelligence",
    catGroup: "ops",
    desc: "Real-time workforce retention trends, salary costs, and decision-ready reports.",
    artType: 1,
    features: ["Headcount Trends", "Attrition Reports", "Salary Analytics"],
  },
  {
    id: "recruitment",
    icon: "role",
    num: "10",
    title: "Recruitment Pipeline",
    category: "Hiring",
    catGroup: "people",
    desc: "Track candidate pipelines, interview scorecards, and automate offer letter dispatch.",
    artType: 1,
    features: ["Candidate Stages", "Scorecards", "1-Click Offers"],
  },
  {
    id: "performance",
    icon: "setup",
    num: "11",
    title: "Performance & OKRs",
    category: "Appraisals",
    catGroup: "people",
    desc: "Continuous peer feedback, quarterly OKRs, and transparent appraisal rating matrices.",
    artType: 0,
    features: ["Quarterly OKRs", "360° Feedback", "Rating Matrices"],
  },
  {
    id: "globe",
    icon: "globe",
    num: "12",
    title: "Multi-Branch Ops",
    category: "Global Sites",
    catGroup: "ops",
    desc: "Branch-specific shift policies, holiday calendars, and centralized company-wide oversight.",
    artType: 3,
    features: ["Branch Rules", "Regional Holidays", "Unified View"],
  },
];

function ModuleCarousel3D({ onOpenDemo }: { onOpenDemo?: () => void }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % modulesData.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + modulesData.length) % modulesData.length);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % modulesData.length);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragStartX(e.clientX);
    setDragOffset(0);
    isDraggingRef.current = true;
    setIsPaused(true);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || dragStartX === null) return;
    setDragOffset(e.clientX - dragStartX);
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    if (dragOffset > 45) {
      handlePrev();
    } else if (dragOffset < -45) {
      handleNext();
    }
    setDragStartX(null);
    setDragOffset(0);
    setIsPaused(false);
  };

  const total = modulesData.length;

  return (
    <div
      className="carousel-3d-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => { if (!isDraggingRef.current) setIsPaused(false); }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      <div className="carousel-3d-stage">
        <div className="carousel-ambient-glow" />

        <button
          type="button"
          className="carousel-nav-btn prev-btn"
          onClick={(e) => { e.stopPropagation(); handlePrev(); }}
          aria-label="Previous module"
        >
          <Icon name="chevron" size={20} className="rotate-180" />
        </button>

        <button
          type="button"
          className="carousel-nav-btn next-btn"
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          aria-label="Next module"
        >
          <Icon name="chevron" size={20} />
        </button>

        <div className="carousel-3d-cylinder">
          {modulesData.map((item, index) => {
            let offset = index - activeIndex;
            while (offset > total / 2) offset -= total;
            while (offset < -total / 2) offset += total;

            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 3;
            if (!isVisible) return null;

            return (
              <div
                key={item.id}
                className={`card-3d-item ${isCenter ? "is-center" : ""} offset-${offset}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (!isCenter) {
                    setActiveIndex(index);
                  }
                }}
              >
                <div className="card-3d-inner">
                  <div className="card-top-row">
                    <span className="card-module-icon">
                      <Icon name={item.icon} size={20} />
                    </span>
                    <span className="card-num-badge">{item.num}</span>
                  </div>

                  <div className="card-info">
                    <strong className="card-title">{item.title}</strong>
                    <p className="card-desc">{item.desc}</p>
                  </div>

                  <div className={`card-art art${item.artType}`}>
                    <i /><i /><i /><i />
                  </div>

                  <div className="card-tags-row">
                    {item.features.map((feat) => (
                      <span key={feat} className="card-tag">
                        <Icon name="check" size={11} /> {feat}
                      </span>
                    ))}
                  </div>

                  <div className="card-bottom-row">
                    <span className="card-explore-link">
                      Explore <Icon name="chevron" size={13} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="carousel-bottom-bar">
        <div className="carousel-counter">
          <span className="counter-current">{String(activeIndex + 1).padStart(2, "0")}</span>
          <span className="counter-sep">/</span>
          <span className="counter-total">12</span>
          <span className="counter-title">{modulesData[activeIndex].title}</span>
        </div>

        <div className="carousel-dots-list">
          {modulesData.map((m, idx) => (
            <button
              key={m.id}
              type="button"
              className={`carousel-dot ${idx === activeIndex ? "active" : ""}`}
              onClick={(e) => { e.stopPropagation(); setActiveIndex(idx); }}
              aria-label={`Jump to ${m.title}`}
            />
          ))}
        </div>

        <button
          type="button"
          className="carousel-pause-toggle"
          onClick={(e) => { e.stopPropagation(); setIsPaused(!isPaused); }}
          title={isPaused ? "Resume auto-rotation" : "Pause auto-rotation"}
        >
          {isPaused ? "▶ Resume" : "❚❚ Pause"}
        </button>
      </div>
    </div>
  );
}

function PriceEstimator() {
  const [plan, setPlan] = useState<"standard" | "professional" | "enterprise">("standard");
  const [users, setUsers] = useState(75);
  const price = useMemo(() => plan === "standard" ? Math.max(5000, users * 99) : plan === "professional" ? Math.max(10000, users * 199) : 0, [plan, users]);
  const setup = plan === "standard" ? "₹25,000" : "₹50,000";
  return (
    <div className="estimator">
      <div className="plan-options">
        {([
          ["standard", "Standard", "Essential HR, attendance & payroll"],
          ["professional", "Professional", "Automation, expenses & insights"],
          ["enterprise", "Enterprise", "Advanced controls for complex teams"],
        ] as const).map(([id, name, desc]) => <button key={id} className={plan === id ? "active" : ""} onClick={() => setPlan(id)}><span>{plan === id && <Icon name="check" size={13} />}</span><strong>{name}{id === "professional" && <em>POPULAR</em>}</strong><small>{desc}</small></button>)}
      </div>
      <div className="estimator-panel">
        {plan === "enterprise" ? <div className="enterprise-price"><span><Icon name="branch" size={28} /></span><h3>Built around your business</h3><p>Let’s create a plan for your scale, structure, and security needs.</p><Button>Talk to Sales <Icon name="arrow" /></Button></div> : <>
          <div className="user-input"><label htmlFor="users">How many employees?</label><div><button onClick={() => setUsers(Math.max(1, users - 10))}>−</button><input id="users" type="number" min="1" value={users} onChange={e => setUsers(Math.max(1, Number(e.target.value)))} /><button onClick={() => setUsers(users + 10)}>+</button></div></div>
          <input aria-label="Number of employees" className="range" type="range" min="1" max="1000" value={users} onChange={e => setUsers(Number(e.target.value))} />
          <div className="range-labels"><span>1</span><span>250</span><span>500</span><span>750</span><span>1000+</span></div>
          <div className="estimate-result"><small>YOUR ESTIMATED MONTHLY PRICE</small><div><strong>₹{price.toLocaleString("en-IN")}</strong><span>/ month<br /><em>+ GST</em></span></div><p><Icon name="check" size={14} /> Minimum plan covers up to 50 users</p></div>
          <div className="setup-price"><span><Icon name="setup" /></span><div><small>ONE-TIME SETUP</small><strong>From {setup}</strong></div><em>Includes migration, configuration & training</em></div>
          <Button className="estimate-cta">Get an exact quote <Icon name="arrow" /></Button>
        </>}
      </div>
    </div>
  );
}

const faqs = [
  ["How long does setup take?", "Most teams go live in 2–4 weeks. Your dedicated implementation specialist handles configuration, data import, and team training."],
  ["Can LattiumHR handle multiple branches?", "Yes. Create branch-specific policies, holiday calendars, roles, and dashboards while keeping a unified company-wide view."],
  ["Is payroll compliant with Indian regulations?", "Yes. Payroll supports PF, ESI, PT, TDS, and other statutory requirements with ready-to-use reports."],
  ["Can employees use it on mobile?", "Absolutely. Employees can mark attendance, apply for leave, download payslips, and submit expenses from any device."],
  ["What support do we get after launch?", "Every plan includes guided onboarding and ongoing customer support. Professional and Enterprise plans include priority support."],
];

function FAQ() {
  const [open, setOpen] = useState(0);
  return <div className="faq-list">{faqs.map((f, i) => <div className={`faq-item ${open === i ? "open" : ""}`} key={f[0]}><button onClick={() => setOpen(open === i ? -1 : i)}><span>{f[0]}</span><i>{open === i ? "−" : "+"}</i></button>{open === i && <p>{f[1]}</p>}</div>)}</div>;
}

function CountUp({ target, suffix = "", decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const [value, setValue] = useState(0);
  const elementRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    let frame = 0;
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting || hasAnimated.current) return;
      hasAnimated.current = true;
      const startedAt = performance.now();
      const animate = (now: number) => {
        const progress = Math.min((now - startedAt) / 1100, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setValue(target * eased);
        if (progress < 1) frame = requestAnimationFrame(animate);
      };
      frame = requestAnimationFrame(animate);
      observer.disconnect();
    }, { threshold: 0.6 });
    if (elementRef.current) observer.observe(elementRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return <span ref={elementRef}>{value.toFixed(decimals)}{suffix}</span>;
}

function App() {
  const [demoOpen, setDemoOpen] = useState(false);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section");
    sections.forEach((section) => section.classList.add("reveal-section"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -50px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleDemoClick = (event: MouseEvent) => {
      const trigger = (event.target as Element).closest('a[href="#demo"]');
      if (!trigger) return;
      if (trigger.closest(".hero")) {
        event.preventDefault();
        const form = document.querySelector<HTMLElement>(".hero .demo-form");
        if (!form) return;
        form.classList.remove("form-highlight");
        void form.offsetWidth;
        form.classList.add("form-highlight");
        window.setTimeout(() => form.classList.remove("form-highlight"), 450);
        return;
      }
      event.preventDefault();
      setDemoOpen(true);
    };
    document.addEventListener("click", handleDemoClick);
    return () => document.removeEventListener("click", handleDemoClick);
  }, []);

  useEffect(() => {
    if (!demoOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setDemoOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [demoOpen]);

  return (
    <div className="app-shell">
      <header className="navbar">
        <div className="container-wide nav-inner">
          <Logo />
          <div className="nav-actions"><Button>Book a Demo <Icon name="arrow" size={16} /></Button></div>
        </div>
      </header>

      <main>
        <section className="hero" id="demo">
          <div className="hero-glow" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="hero-badge"><i><Icon name="sparkle" size={14} /></i>Built for ambitious businesses worldwide</span>
              <h1><span>HR, Payroll & Attendance</span><span>for <em>Every Branch,</em></span><span>in One System</span></h1>
              <p>Replace spreadsheets and scattered tools with one simple HRMS your entire team will love — from first clock-in to final payslip.</p>
              <div className="hero-actions"><Button>Book a Demo <Icon name="arrow" /></Button><Button href="#pricing" secondary>Estimate Price</Button></div>
              <div className="hero-benefits">
                <div className="hero-benefit-item">
                  <strong className="benefit-num benefit-num-2x">2×</strong>
                  <p><b>Faster</b><small>Employee onboarding</small></p>
                </div>
                <div className="hero-benefit-item">
                  <strong className="benefit-num benefit-num-pct">99%</strong>
                  <p><b>Faster</b><small>HR processes</small></p>
                </div>
                <div className="hero-benefit-item">
                  <strong className="benefit-num benefit-num-247">24/7</strong>
                  <p><b>Workforce</b><small>Anywhere, any time</small></p>
                </div>
              </div>
            </div>
            <DemoForm />
          </div>
          <div className="container company-strip"><span>POWERING PEOPLE AT</span><div><strong>northstar</strong><strong>Wakefit</strong><strong>orbit<span>works</span></strong><strong>UrbanBite</strong><strong>novus</strong></div></div>
        </section>

        <section className="before-after" id="platform">
          <div className="container">
            <SectionHeading eyebrow="THE DIFFERENCE" title="From HR chaos to total clarity" body="See what changes when your people operations finally work together." center />
            <div className="compare-grid">
              <div className="compare-card before"><div className="compare-title"><span><Icon name="x" /></span><div><small>BEFORE LATTIUMHR</small><strong>Scattered & manual</strong></div></div>{[["leave", "Leave on WhatsApp"], ["attendance", "Attendance in registers"], ["payroll", "Payroll in spreadsheets"], ["document", "Documents in email"], ["asset", "Assets… somewhere"]].map(x => <div className="compare-row" key={x[1]}><span><Icon name={x[0] as IconName} /></span><p>{x[1]}</p><em>!</em></div>)}</div>
              <div className="switch-arrow"><Icon name="arrow" /></div>
              <div className="compare-card after"><div className="compare-title"><span><Icon name="check" /></span><div><small>WITH LATTIUMHR</small><strong>Connected & automatic</strong></div></div>{[["leave", "Leave tracked & approved"], ["attendance", "Attendance in real time"], ["payroll", "Payroll auto-calculated"], ["document", "Documents in one place"], ["asset", "Assets assigned & visible"]].map(x => <div className="compare-row" key={x[1]}><span><Icon name={x[0] as IconName} /></span><p>{x[1]}</p><em><Icon name="check" size={14} /></em></div>)}</div>
            </div>
          </div>
        </section>

        <section className="setup-section">
          <div className="container">
            <SectionHeading eyebrow="BUILT AROUND YOUR BUSINESS" title="Your organization, your rules" body="Configure LattiumHR to match how your company actually works — not the other way around." center />
            <div className="setup-grid">{[
              ["branch", "Organization structure", "Map every branch, department and reporting line."],
              ["role", "Custom roles", "Give each person exactly the access they need."],
              ["calendar", "Work calendars", "Set shifts, weeks and holidays by location."],
              ["globe", "Multi-country ready", "Run policies and payroll across geographies."],
            ].map((x, i) => <div className="setup-card" key={x[1]}><span className={`setup-icon i${i}`}><Icon name={x[0] as IconName} /></span><strong>{x[1]}</strong><p>{x[2]}</p><div className={`setup-art art${i}`}><i /><i /><i /><i /></div></div>)}</div>
          </div>
        </section>

        <div id="solutions">{roleSections.map((item, index) => <RoleSection item={item} index={index} key={item.role} />)}</div>

        <section className="modules-section">
          <div className="container">
            <SectionHeading eyebrow="ONE COMPLETE PLATFORM" title="Everything your people team needs" body="Start with what you need today. Add more as your business grows." center />
            <ModuleCarousel3D onOpenDemo={() => setDemoOpen(true)} />
          </div>
        </section>

        <section className="pricing-section" id="pricing">
          <div className="container">
            <SectionHeading eyebrow="SIMPLE, TRANSPARENT PRICING" title="Estimate your investment" body="No hidden costs. Adjust the team size to see an instant estimate." center />
            <PriceEstimator />
          </div>
        </section>

        <section className="proof-section" id="customers">
          <div className="container">
            <div className="stats-row">
              <div><strong><CountUp target={500} suffix="+" /></strong><span>Businesses trust LattiumHR</span></div>
              <div><strong><CountUp target={98} suffix="%" /></strong><span>On-time payroll rate</span></div>
              <div><strong><CountUp target={2.4} decimals={1} suffix="M+" /></strong><span>Attendance logs monthly</span></div>
              <div><strong><CountUp target={4.8} decimals={1} suffix="/5" /></strong><span>Average customer rating</span></div>
            </div>
            <SectionHeading eyebrow="CUSTOMER STORIES" title="Loved by teams that are growing" center />
            <div className="testimonials">
              <article><div className="quote-mark">“</div><p>LattiumHR brought our five branches onto one system in under three weeks. Payroll that took us four days now takes a few hours.</p><div><span className="customer-avatar ca1">NS</span><div><strong>Neha Srinivasan</strong><small>Head of People, UrbanBite</small></div><em>★★★★★</em></div></article>
              <article><div className="quote-mark">“</div><p>Our employees actually use it. Attendance is transparent, leave approvals are quick, and our managers finally have the visibility they need.</p><div><span className="customer-avatar ca2">AM</span><div><strong>Arjun Malhotra</strong><small>COO, Northstar Logistics</small></div><em>★★★★★</em></div></article>
              <article><div className="quote-mark">“</div><p>The support during migration was exceptional. The team understood Indian payroll and helped us configure every policy correctly.</p><div><span className="customer-avatar ca3">RD</span><div><strong>Ria Desai</strong><small>Finance Director, OrbitWorks</small></div><em>★★★★★</em></div></article>
            </div>
          </div>
        </section>

        <section className="faq-section">
          <div className="container faq-grid">
            <div><SectionHeading eyebrow="QUESTIONS, ANSWERED" title="Everything you need to know" body="Can’t find what you’re looking for? Our team is happy to help." /><a className="text-link" href="#demo">Talk to our team <Icon name="arrow" size={17} /></a></div>
            <FAQ />
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-grid">
            <div><span className="eyebrow">READY TO SIMPLIFY HR?</span><h2>Your people deserve better than spreadsheets.</h2><p>Join 500+ growing businesses worldwide running HR, attendance, and payroll on LattiumHR.</p><div className="final-actions"><Button>Book a Free Demo <Icon name="arrow" /></Button><Button href="#pricing" secondary>Estimate Your Price</Button></div><div className="final-points"><span><Icon name="check" />Free personalised demo</span><span><Icon name="check" />No credit card required</span><span><Icon name="check" />Go live in 2–4 weeks</span></div></div>
          </div>
        </section>
      </main>

      <footer id="footer">
        <div className="container-wide footer-top">
          <div className="footer-brand"><Logo light /><p>Simple, powerful HR software built for growing businesses worldwide.</p><div className="socials"><span>in</span><span>f</span><span>▶</span></div></div>
          <div><strong>Platform</strong><a href="#solutions">Core HR</a><a href="#solutions">Attendance</a><a href="#solutions">Payroll</a><a href="#solutions">Expenses</a></div>
          <div><strong>Company</strong><a href="#customers">Customers</a><a href="#footer">About us</a><a href="#footer">Careers</a><a href="#footer">Contact</a></div>
          <div><strong>Resources</strong><a href="#footer">Help centre</a><a href="#footer">Payroll guides</a><a href="#footer">HR templates</a><a href="#footer">Blog</a></div>
          <div><strong>Contact</strong><a href="mailto:hello@lattiumhr.com">hello@lattiumhr.com</a><a href="tel:+918000123456">+91 80001 23456</a><p>Mumbai · Bengaluru · Delhi</p></div>
        </div>
        <div className="container-wide footer-bottom"><span>© 2025 LattiumHR Technologies Pvt. Ltd.</span><div><a href="#footer">Privacy</a><a href="#footer">Terms</a><a href="#footer">Security</a></div><em>Built for global teams</em></div>
      </footer>
      <div className="mobile-sticky"><a href="#demo">Book a Demo <Icon name="arrow" /></a></div>
      {demoOpen && (
        <div className="demo-modal" role="dialog" aria-modal="true" aria-label="Book a demo" onMouseDown={(event) => event.target === event.currentTarget && setDemoOpen(false)}>
          <div className="demo-modal-card">
            <button className="modal-close" type="button" onClick={() => setDemoOpen(false)} aria-label="Close demo form"><Icon name="x" size={19} /></button>
            <DemoForm />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
