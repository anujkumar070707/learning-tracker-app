* {
  box-sizing: border-box;
}

:root {
  font-family: Inter, 'Segoe UI', sans-serif;
  line-height: 1.5;
  color: #e5eef9;
  background: #081426;
  font-weight: 400;
  color-scheme: dark;
}

body {
  margin: 0;
  min-height: 100vh;
  background:
    radial-gradient(circle at top, rgba(99, 102, 241, 0.22), transparent 30%),
    linear-gradient(135deg, #081426 0%, #111827 100%);
}

button,
input {
  font: inherit;
}

button {
  cursor: pointer;
}

#root {
  min-height: 100vh;
}

.app-shell {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
  padding: 32px 0 48px;
}

.topbar {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: flex-end;
  margin-bottom: 28px;
}

.eyebrow {
  margin: 0;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #8bb8ff;
}

h1 {
  margin: 8px 0 0;
  font-size: clamp(2rem, 4vw, 3rem);
}

.profile-box {
  background: rgba(17, 24, 39, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.22);
  border-radius: 16px;
  padding: 12px 14px;
  min-width: min(100%, 340px);
}

.profile-box label {
  display: block;
  margin-bottom: 8px;
  color: #c1d8ff;
  font-size: 12px;
}

.profile-row {
  display: flex;
  gap: 8px;
}

.profile-row input,
.language-form input,
.stats-grid input {
  width: 100%;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.25);
  border-radius: 10px;
  color: #edf6ff;
  padding: 10px 12px;
}

.profile-row button,
.primary-btn,
.delete-btn {
  border: 0;
  border-radius: 10px;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.profile-row button,
.primary-btn {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  color: white;
  padding: 10px 14px;
  font-weight: 600;
}

.profile-row button:hover,
.primary-btn:hover,
.delete-btn:hover {
  transform: translateY(-1px);
}

.summary-grid,
.content-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-bottom: 24px;
}

.metric-card,
.panel,
.language-card,
.empty-card {
  background: rgba(15, 23, 42, 0.68);
  border: 1px solid rgba(148, 163, 184, 0.18);
  border-radius: 18px;
  box-shadow: 0 18px 28px rgba(2, 6, 23, 0.18);
}

.metric-card {
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.metric-card span {
  color: #bfdcff;
  font-size: 13px;
}

.metric-card strong {
  font-size: 1.8rem;
}

.metric-card.accent {
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.3), rgba(124, 58, 237, 0.22));
}

.content-grid {
  grid-template-columns: 2fr 1fr;
}

.panel {
  padding: 22px;
}

.panel h2,
.language-header h3 {
  margin: 0;
}

.language-form {
  margin-top: 18px;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.language-form label,
.stats-grid label {
  display: block;
  color: #dceaff;
  font-size: 13px;
  margin-bottom: 6px;
}

.primary-btn {
  margin-top: 18px;
  width: 100%;
}

.overview-box {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
  margin-top: 18px;
}

.overview-box div {
  background: rgba(15, 23, 42, 0.9);
  border-radius: 14px;
  border: 1px solid rgba(148, 163, 184, 0.12);
  padding: 18px 14px;
}

.overview-box span {
  display: block;
  font-size: 12px;
  color: #bfdcff;
}

.overview-box strong {
  display: block;
  margin-top: 8px;
  font-size: 1.8rem;
}

.language-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.language-card {
  padding: 20px;
}

.language-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.language-name-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.language-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: inline-block;
}

.delete-btn {
  background: rgba(239, 68, 68, 0.12);
  color: #fca5a5;
  padding: 8px 10px;
}

.progress-ring {
  width: 110px;
  height: 110px;
  margin: 0 auto 18px;
  border-radius: 50%;
  background: conic-gradient(var(--ring-color, #4f46e5) 0 var(--progress, 0%), rgba(148, 163, 184, 0.18) 0 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-ring::before {
  content: '';
  position: absolute;
  inset: 12px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 1);
}

.progress-ring span {
  position: relative;
  z-index: 1;
  font-weight: 700;
  font-size: 1.1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.language-summary {
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(148, 163, 184, 0.15);
}

.language-summary div {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.language-summary span {
  color: #b7caed;
  font-size: 12px;
}

.language-summary strong {
  font-size: 1.2rem;
}

.empty-card {
  padding: 22px;
  color: #dceaff;
  text-align: center;
  grid-column: 1 / -1;
}

.alert {
  background: rgba(239, 68, 68, 0.13);
  border: 1px solid rgba(239, 68, 68, 0.28);
  color: #fca5a5;
  padding: 12px 14px;
  border-radius: 12px;
  margin-bottom: 16px;
}

.loading {
  text-align: center;
  color: #dfefff;
  padding: 40px 0;
}

@media (max-width: 900px) {
  .summary-grid,
  .content-grid,
  .language-grid {
    grid-template-columns: 1fr;
  }

  .topbar {
    flex-direction: column;
    align-items: stretch;
  }
}

@media (max-width: 560px) {
  .form-grid,
  .stats-grid,
  .overview-box {
    grid-template-columns: 1fr;
  }

  .profile-row {
    flex-direction: column;
  }
}
